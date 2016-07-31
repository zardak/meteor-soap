soap = Npm.require 'soap'

wrapMethod = (method, client) ->
  ->
    try
      methodResult = Meteor.wrapAsync(method, client)(arguments...)
    catch e
      throw new Meteor.Error 'soap-method', 'Soap method call failed', e

    methodResult


@Soap =
  createClient: (url, options) ->
    try
      client = Meteor.wrapAsync(soap.createClient, soap)(arguments...)
    catch e
      throw new Meteor.Error 'soap-creation', 'Soap client creation failed', e

    wrappedMethods = {}

    for serviceName, service of client.describe()
      for portName, port of service
        for methodName, method of port
          client[serviceName][portName][methodName] =
            wrapMethod client[serviceName][portName][methodName], client

          unless wrappedMethods[methodName]
            client[methodName] = wrapMethod client[methodName], client
            wrappedMethods[methodName] = true

    client

for item in ['BasicAuthSecurity', 'WSSecurity', 'WSSecurityCert', 'ClientSSLSecurity', 'BearerSecurity']
  @Soap[item] = soap[item]
