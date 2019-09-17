const paths     = require('../src/lib/paths');
const deepMerge = require('deepmerge');

const appConfig = require(`${paths.appConfig}`);


// Build the final config object
const masteredConfig = deepMerge({
    server: require('./server.config'),
    env: require('./env.config'),
  },
  appConfig,
);


module.exports = masteredConfig;