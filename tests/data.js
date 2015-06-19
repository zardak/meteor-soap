testData = {
  packageExposes: [
    'BasicAuthSecurity',
    'WSSecurity',
    'ClientSSLSecurity',
    'BearerSecurity',
    'createClient'
  ],

  wsdlUrl: 'http://www.webservicex.net/geoipservice.asmx?WSDL',
  methodName: 'GetGeoIP',
  methodArgs: {
    IPAddress: '8.8.8.8'
  },

  serviceDescription: {
    "GeoIPService": {
      "GeoIPServiceSoap": {
        "GetGeoIP": {
          "input": {
            "IPAddress": "s:string"
          },
          "output": {
            "GetGeoIPResult": {
              "ReturnCode": "s:int",
              "IP": "s:string",
              "ReturnCodeDetails": "s:string",
              "CountryName": "s:string",
              "CountryCode": "s:string",
              "targetNSAlias": "tns",
              "targetNamespace": "http://www.webservicex.net/"
            }
          }
        },
        "GetGeoIPContext": {
          "input": {},
          "output": {
            "GetGeoIPContextResult": {
              "ReturnCode": "s:int",
              "IP": "s:string",
              "ReturnCodeDetails": "s:string",
              "CountryName": "s:string",
              "CountryCode": "s:string",
              "targetNSAlias": "tns",
              "targetNamespace": "http://www.webservicex.net/"
            }
          }
        }
      },
      "GeoIPServiceSoap12": {
        "GetGeoIP": {
          "input": {
            "IPAddress": "s:string"
          },
          "output": {
            "GetGeoIPResult": {
              "ReturnCode": "s:int",
              "IP": "s:string",
              "ReturnCodeDetails": "s:string",
              "CountryName": "s:string",
              "CountryCode": "s:string",
              "targetNSAlias": "tns",
              "targetNamespace": "http://www.webservicex.net/"
            }
          }
        },
        "GetGeoIPContext": {
          "input": {},
          "output": {
            "GetGeoIPContextResult": {
              "ReturnCode": "s:int",
              "IP": "s:string",
              "ReturnCodeDetails": "s:string",
              "CountryName": "s:string",
              "CountryCode": "s:string",
              "targetNSAlias": "tns",
              "targetNamespace": "http://www.webservicex.net/"
            }
          }
        }
      }
    }
  },

  methodResponse: {
    GetGeoIPResult: {
      ReturnCode: 1,
      IP: '8.8.8.8',
      ReturnCodeDetails: 'Success',
      CountryName: 'United States',
      CountryCode: 'USA'
    }
  },

  clientCreationFailedReason: 'Soap client creation failed',
  methodCallFailedReason: 'Soap method call failed'
};
