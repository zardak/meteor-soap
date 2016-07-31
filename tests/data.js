testData = {
  packageExposes: [
    'BasicAuthSecurity',
    'WSSecurity',
    'WSSecurityCert',
    'ClientSSLSecurity',
    'BearerSecurity',
    'createClient',
    'listen'
  ],

  wsdlDefinition: '<?xml version="1.0" encoding="UTF-8"?>\
  <wsdl:definitions name="MyService" targetNamespace="http://www.example.com/v1" xmlns="http://www.example.com/v1" xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/" xmlns:http="http://schemas.xmlsoap.org/wsdl/http/" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/">\
    <wsdl:types>\
      <xs:schema attributeFormDefault="qualified" elementFormDefault="qualified" targetNamespace="http://www.example.com/v1" xmlns="http://www.example.com/v1">\
  		<xs:element name="Request">\
  		</xs:element>\
  		<xs:element name="Response">\
  		</xs:element>\
      </xs:schema>\
      </wsdl:types>\
      <wsdl:message name="InputMessage">\
      <wsdl:part name="parameter" element="Request">\
      </wsdl:part>\
    </wsdl:message>\
    <wsdl:message name="OutputMessage">\
      <wsdl:part name="parameter" element="Response">\
      </wsdl:part>\
    </wsdl:message>\
    <wsdl:portType name="MyServicePortType">\
      <wsdl:operation name="MyOperation">\
        <wsdl:input message="InputMessage">\
      </wsdl:input>\
        <wsdl:output message="OutputMessage">\
      </wsdl:output>\
      </wsdl:operation>\
    </wsdl:portType>\
    <wsdl:binding name="MyServiceBinding" type="MyServicePortType">\
      <soap:binding style="document" transport="http://schemas.xmlsoap.org/soap/http"/>\
      <wsdl:operation name="MyOperation">\
        <soap:operation soapAction="MyOperation"/>\
        <wsdl:input>\
          <soap:body use="literal" encodingStyle="http://schemas.xmlsoap.org/soap/encoding/"/>\
        </wsdl:input>\
        <wsdl:output>\
          <soap:body use="literal" encodingStyle="http://schemas.xmlsoap.org/soap/encoding/"/>\
        </wsdl:output>\
      </wsdl:operation>\
    </wsdl:binding>\
    <wsdl:service name="MyService">\
      <wsdl:port name="MyServicePort" binding="MyServiceBinding">\
        <soap:address location="' + Meteor.absoluteUrl('soap') + '"/>\
      </wsdl:port>\
    </wsdl:service>\
  </wsdl:definitions>',

  serviceDefinition: {
    MyService: {
      MyServicePort: {
        MyOperation: function(args) {
          if(!args.Request) {
            throw {
              Fault: {
                Code: {
                  Value: "soap:Sender",
                  Subcode: { value: "rpc:BadArguments" }
                },
                Reason: { Text: "Processing Error" }
              }
            };
          }

          return {
            Response: args.Request
          };
        }
      }
    }
  },

  expectedDescription: {
    MyService: {
      MyServicePort: {
        MyOperation: {
          input: {},
          output: {}
        }
      }
    }
  },

  requestData: { Request: '1337' },
  responseData: { Response: '1337' },

  clientCreationFailed: 'soap-creation',
  methodCallFailed: 'soap-method'
};
