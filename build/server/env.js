"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var fs = require('fs');

var path = require('path');

var envConfig = require('../config').env;

var NODE_ENV = process.env.NODE_ENV;

if (!NODE_ENV) {
  throw new Error('The NODE_ENV environment variable is required but was not specified.');
} // https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use


var dotenvFiles = [".env.".concat(NODE_ENV, ".local"), ".env.".concat(NODE_ENV), // Don't include `.env.local` for `test` environment
// since normally you expect tests to produce the same
// results for everyone
NODE_ENV !== 'test' && ".env.local", '.env'].filter(Boolean); // Load environment variables from .env* files. Suppress warnings using silent
// if this file is missing. dotenv will never modify any environment variables
// that have already been set.
// https://github.com/motdotla/dotenv

dotenvFiles.forEach(function (dotenvFile) {
  if (fs.existsSync(dotenvFile)) {
    require('dotenv').config({
      path: dotenvFile
    });
  }
}); // We support resolving modules according to `NODE_PATH`.
// This lets you use absolute paths in imports inside large monorepos:
// https://github.com/facebookincubator/create-react-app/issues/253.
// It works similar to `NODE_PATH` in Node itself:
// https://nodejs.org/api/modules.html#modules_loading_from_the_global_folders
// Note that unlike in Node, only *relative* paths from `NODE_PATH` are honored.
// Otherwise, we risk importing Node.js core modules into an app instead of Webpack shims.
// https://github.com/facebookincubator/create-react-app/issues/1023#issuecomment-265344421
// We also resolve them to make sure all tools using them work consistently.

var appDirectory = fs.realpathSync(process.cwd());
process.env.NODE_PATH = (process.env.NODE_PATH || '').split(path.delimiter).filter(function (folder) {
  return folder && !path.isAbsolute(folder);
}).map(function (folder) {
  return path.resolve(appDirectory, folder);
}).join(path.delimiter); // Grab NODE_ENV and REACT_APP_* environment variables and prepare them to be
// injected into the application via DefinePlugin in Webpack configuration.

var REACT_APP = /^REACT_APP_/i;

function getClientEnvironment() {
  var raw = Object.keys(process.env).filter(function (key) {
    return REACT_APP.test(key);
  }).reduce(function (env, key) {
    env[key] = process.env[key];
    return env;
  }, {
    // Useful for determining whether we’re running in production mode.
    // Most importantly, it switches React into the correct mode.
    NODE_ENV: process.env.NODE_ENV || 'development',
    // Useful for resolving the correct path to static assets in `public`.
    // For example, <img src={process.env.PUBLIC_URL + '/img/logo.png'} />.
    // This should only be used as an escape hatch. Normally you would put
    // images into the `src` and `import` them in code to get their paths.
    PUBLIC_URL: "".concat(process.env.PROTOCOL, "://").concat(process.env.HOST),
    PORT: process.env.PORT,
    PROTOCOL: process.env.PROTOCOL,
    HOST: process.env.HOST
  }); // Add custom env variables here

  var missingEnvs = [];
  Object.entries(envConfig.allowedVariables).forEach(function (_ref) {
    var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
        name = _ref2[0],
        params = _ref2[1];

    if (params.required && !process.env[name]) {
      missingEnvs.push(name);
    } else if (params.client) {
      raw[name] = process.env[name];
    }
  });

  if (missingEnvs.length > 0) {
    var errorMsg = "Some environment variables are missing. Please add them to a .env file or using you machine env system : \n";
    missingEnvs.forEach(function (e) {
      errorMsg += " '".concat(e, "'\n");
    });
    errorMsg += "\n You can edit this configuration in the env.config.js file";
    throw new Error(errorMsg);
  } // Stringify all values so we can feed into Webpack DefinePlugin


  var stringified = {
    'process.env': Object.keys(raw).reduce(function (env, key) {
      env[key] = JSON.stringify(raw[key]);
      return env;
    }, {})
  };
  return {
    raw: raw,
    stringified: stringified
  };
}

module.exports = getClientEnvironment;