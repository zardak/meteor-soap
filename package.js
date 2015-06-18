Package.describe({
  name: 'zardak:soap',
  version: '0.1.0',
  summary: 'Wrapped npm soap package',
  git: 'https://github.com/zardak/meteor-soap',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('0.9.3');
  api.use('coffeescript');
  api.addFiles('soap.coffee', 'server');
});

Npm.depends({
  soap: '0.9.1'
});
