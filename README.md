# meteor-soap [![Build Status](https://travis-ci.org/zardak/meteor-soap.svg?branch=master)](https://travis-ci.org/zardak/meteor-soap)
[soap npm module](https://github.com/vpulim/node-soap) wrapped for meteor.
Both client and server are usable, although server is not thoroughly tested.

# Exposed API
> API is mostly the same, but has no callback argument since it's synchronous and `throw`'s errors.
> Please correspond to original documentation

## Package
### `Soap.createClient(url[, options])` - create a new SOAP client from a WSDL url. Also supports a local filesystem path.
Returns SOAP Client instance

``` javascript
var url = 'http://example.com/wsdl?wsdl';
var args = {name: 'value'};

try {
  var client = Soap.createClient(url);
  var result = client.MyFunction(args);

  console.log(result);
}
catch (err) {
  if(err.error === 'soap-creation') {
    console.log('SOAP Client creation failed');
  }
  else if (err.error === 'soap-method') {
    console.log('SOAP Method call failed');
  }

}
```

### `Soap.listen(path, services, wsdl)` - create a new SOAP server that listens on *path* and provides services.
:warning: New feature, use at your own risk.

Returns SOAP server instance.

``` javascript
var service = {
    MyService: {
      MyServicePort: {
        MyOperation: function(args) {
          if(!args.Request) {
            throw { Fault: {
                Code: {
                  Value: "soap:Sender",
                  Subcode: { value: "rpc:BadArguments" }
                },
                Reason: { Text: "Processing Error" }
              } };
          }

          return { Response: args.Request };
        }
      }
    }
  };

var wsdl = Assets.getText('wsdl.xml');
var soapServer = Soap.listen('/soap', service, wsdl);
```

### `Soap.SecurityProtocol`
Where *SecurityProtocol* is one of
* BasicAuthSecurity
* WSSecurity
* ClientSSLSecurity
* BearerSecurity

Used in calls to `Client.setSecurity`

## SOAP Client
An instance of `SOAP Client` is returned from `Soap.createClient`. It is used to execute methods on the soap service.

### `Client.describe()` - description of services, ports and methods as a JavaScript object
``` javascript
  client.describe() // returns
    {
      MyService: {
        MyPort: {
          MyFunction: {
            input: {
              name: 'string'
            }
          }
        }
      }
    }
```

### `Client.setSecurity(security)` - use the specified security protocol
``` javascript
  client.setSecurity(new Soap.BasicAuthSecurity('username', 'password'));
```

### `Client.method(args)` - call *method* on the SOAP service.
``` javascript
  var result = client.MyFunction({name: 'value'});
```

### `Client.service.port.method(args, options)` - call a *method* using a specific *service* and *port*
``` javascript
  var result = client.MyService.MyPort.MyFunction({name: 'value'});
```

## SOAP Server
An instance of `SOAP Server` is returned from `Soap.listen`.

### Server logging
If the log method is defined it will be called with 'received' and 'replied'
along with data.
``` javascript
  server.log = function(type, data) {
    // type is 'received' or 'replied'
  };
```

### Server Events
Server instances emit the following events:

* request - Emitted for every received messages.
  The signature of the callback is `function(request, methodName)`.
* headers - Emitted when the SOAP Headers are not empty.
  The signature of the callback is `function(headers, methodName)`.

The sequence order of the calls is `request`, `headers` and then the dedicated
service method.

### SOAP Fault
A service method can reply with a SOAP Fault to a client by `throw`ing an
object with a `Fault` property.
``` javascript
  throw {
    Fault: {
      Code: {
        Value: "soap:Sender",
        Subcode: { value: "rpc:BadArguments" }
      },
      Reason: { Text: "Processing Error" }
    }
  };
```

### SOAP Headers
A service method can look at the SOAP headers by providing a 3rd arguments.
``` javascript
  {
      HeadersAwareFunction: function(args, cb, headers) {
          return {
              name: headers.Token
          };
      }
  }
```

It is also possible to subscribe to the 'headers' event.
The event is triggered before the service method is called, and only when the
SOAP Headers are not empty.
``` javascript
  server.on('headers', function(headers, methodName) {
    // It is possible to change the value of the headers
    // before they are handed to the service method.
    // It is also possible to throw a SOAP Fault
  });
```

First parameter is the Headers object;
second parameter is the name of the SOAP method that will called
(in case you need to handle the headers differently based on the method).

### server security example using PasswordDigest
If server.authenticate is not defined no authentation will take place.
``` javascript
  server.authenticate = function(security) {
    var created, nonce, password, user, token;
    token = security.UsernameToken, user = token.Username,
            password = token.Password, nonce = token.Nonce, created = token.Created;
    return user === 'user' && password === soap.passwordDigest(nonce, created, 'password');
  };
```

### server connection authorization
This is called prior to soap service method
If the method is defined and returns false the incoming connection is
terminated.

``` javascript
  server.authorizeConnection = function(req) {
    return true; // or false
  };
```
