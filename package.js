Package.describe({
  name: 'zardak:soap',
  version: '0.2.5',
  summary: 'Wrapped npm soap package',
  git: 'https://github.com/zardak/meteor-soap',
  documentation: 'README.md'
});

Npm.depends({
  soap: '0.11.1'
});

Package.onUse(function(api) {
  api.versionsFrom('0.9.3');
  api.use(['coffeescript', 'webapp']);
  api.addFiles('client.coffee', 'server');
  api.addFiles('server.coffee', 'server');
});

Package.onTest(function(api) {
  api.use(['coffeescript', 'tinytest', 'zardak:soap']);
  api.addFiles('tests/data.js', 'server');
  api.addFiles('tests/tests.coffee', 'server');
});
