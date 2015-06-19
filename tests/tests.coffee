Tinytest.add 'Soap client has correct behaviour', (test) ->

  for exposed in testData.packageExposes
    test.isTrue Soap[exposed], "Soap must expose #{exposed}"

  try
    soapClient = Soap.createClient testData.wsdlUrl
  catch err

  test.isUndefined err, 'Soap client creation failed'
  test.equal soapClient.describe(), testData.serviceDescription,
    'Service description isn\'t correct'

  try
    response = soapClient[testData.methodName](testData.methodArgs)
  catch err

  test.equal response, testData.methodResponse, 'Soap method call failed'

  try
    soapClient[testData.methodName]({})
  catch err

  test.equal err.reason, testData.methodCallFailedReason,
    'incorrectly invoked soap method must throw'

  try
    Soap.createClient ''
  catch err

  test.equal err.reason, testData.clientCreationFailedReason,
    'createClient must throw'
