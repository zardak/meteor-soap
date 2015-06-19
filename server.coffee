soap = Npm.require 'soap'

@Soap.listen = (path, services, wsdl) ->
  serverStub =
    listeners: -> [
      (req, res) ->
        res.end();
    ]
    removeAllListeners: ->
    addListener: (placeholder, requestListener) ->
      WebApp.connectHandlers.use path, requestListener

  soap.listen serverStub, '/', services, wsdl
