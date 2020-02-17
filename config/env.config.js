const envBoolean = require('../tools/envBoolean');

module.exports = function (userConfig) {

  const envConfig = {
    allowedVariables: {}
  };

  if (userConfig.api.fetchAppSettings === true
    || userConfig.api.fetchPagesData === true) {
    envConfig.allowedVariables = {
      ...envConfig.allowedVariables,
      'API_HOST': { client: true, required: true },
      'API_PROTOCOL': { client: true, required: true },
      'API_PATHNAME': { client: true, required: true },
    }
  }
  return envConfig;
};
