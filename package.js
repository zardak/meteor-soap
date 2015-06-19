Package.describe({
  name: 'zardak:soap',
  version: '0.1.0',
  summary: 'Wrapped npm soap package',
  git: 'https://github.com/zardak/meteor-soap',
  documentation: 'README.md'
});

Npm.depends({
  soap: '0.9.1'
});

Package.onUse(function(api) {
  api.versionsFrom('0.9.3');
  api.use('coffeescript');
  api.addFiles('soap.coffee', 'server');
});

Package.onTest(function(api) {
  api.use(['coffeescript', 'tinytest', 'zardak:soap']);
  api.addFiles('tests/data.js', 'server');
  api.addFiles('tests/tests.coffee', 'server');
});
