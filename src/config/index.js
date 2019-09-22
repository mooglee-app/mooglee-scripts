const deepmerge = require('deepmerge');
const getAppExports    = require('../appExports');

module.exports = deepmerge(
  getAppExports(true).config,
  {
    env: require('./env.config.js'),
  },
);