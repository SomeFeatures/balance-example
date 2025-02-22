const env = process.env.NODE_ENV || 'development';

const devConfig = require('./development');
const testConfig = require('./test');
const prodConfig = require('./production');

const configs = {
  development: devConfig,
  test: testConfig,
  production: prodConfig,
};

module.exports = configs[env];
