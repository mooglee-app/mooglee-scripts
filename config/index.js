const paths     = require('../lib/paths');
const deepMerge = require('deepmerge');

const appConfig = require(paths.appConfig);


// Build the final config object
const masteredConfig = deepMerge({
    server: require('./server.config'),
    env: require('./env.config'),
  serviceWorker : require('./serviceWorker.config')
  },
  appConfig,
);


module.exports = masteredConfig;