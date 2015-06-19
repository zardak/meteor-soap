Tinytest.add 'Package exposes things correctly', (test) ->
  for exposed in testData.packageExposes
    test.isTrue Soap[exposed], "Soap must expose #{exposed}"


Tinytest.addAsync 'Package has correct behaviour', (test, next) ->
  soapServer = Soap.listen '/soap', testData.serviceDefinition,
    testData.wsdlDefinition

  Meteor.setTimeout ->
    try
      soapClient = Soap.createClient Meteor.absoluteUrl 'soap?wsdl'
    catch err
    test.isUndefined err, 'Soap client creation failed'

    try
      response = soapClient.MyOperation testData.requestData
      test.equal response, testData.responseData, 'Soap method call failed'
    catch err
    test.isUndefined err, 'Soap method call failed'

    try
      soapClient.MyOperation {}
    catch err
    test.equal err.reason, testData.methodCallFailedReason,
      'Incorrectly invoked soap method must throw'

    try
      Soap.createClient ''
    catch err
    test.equal err.reason, testData.clientCreationFailedReason,
      'createClient must throw on error'

    next()
  , 0
