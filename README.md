# meteor-soap [![Build Status](https://travis-ci.org/zardak/meteor-soap.svg?branch=master)](https://travis-ci.org/zardak/meteor-soap)
[soap npm module](https://github.com/vpulim/node-soap) wrapped for meteor.
Currently only the SOAP client part is wrapped. The SOAP server part would require major changes either to `node-soap` or `meteor` itself, so it's not possible at the moment without hacking too deep.

API is mostly the same, but has no callback argument since it's synchronous and `throw`'s errors.

# Exposed API
> Please correspond to original documentation 

## Package
### Soap.createClient(url[, options]) - create a new SOAP client from a WSDL url. Also supports a local filesystem path.
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

### Soap.*SecurityProtocol*
Where *SecurityProtocol* is one of

* BasicAuthSecurity
* WSSecurity
* ClientSSLSecurity
* BearerSecurity

Used in calls to `Client.setSecurity`

[npm module documentation entry](https://github.com/vpulim/node-soap#clientsetsecuritysecurity---use-the-specified-security-protocol)

## SOAP Client
An instance of SOAP Client is returned from soap.createClient. It is used to execute methods on the soap service.

### Client.describe() - description of services, ports and methods as a JavaScript object

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

### Client.setSecurity(security) - use the specified security protocol
[npm module documentation entry](https://github.com/vpulim/node-soap#clientsetsecuritysecurity---use-the-specified-security-protocol)
``` javascript
  client.setSecurity(new Soap.BasicAuthSecurity('username', 'password'));
```

### Client.*method*(args) - call *method* on the SOAP service.
``` javascript
  var result = client.MyFunction({name: 'value'});
```
### Client.*service*.*port*.*method*(args, options) - call a *method* using a specific *service* and *port*
``` javascript
  var result = client.MyService.MyPort.MyFunction({name: 'value'});
```
