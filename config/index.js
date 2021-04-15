const deepmerge     = require('deepmerge');
const getAppExports = require('../appExports');
const getEnvConfig  = require('./env.config');
const userConfig    = getAppExports(true).config;

module.exports = deepmerge(
  userConfig,
  {
    env: getEnvConfig(userConfig),
  },
);
