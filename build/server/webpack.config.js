"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var getClientEnvironment = require('./env');

var webpack = require('webpack');

var config = require('../config');

var env = getClientEnvironment(config.server.getUrl());

var Visualizer = require('webpack-visualizer-plugin');

var path = require('path');

var envBoolean = require('../tools/envBoolean');

var paths = require('../lib/paths');
/**
 * This is not a real webpack configuration file but a function that performs changes to
 * the Next's webpack config. It takes the original config as parameter and returns a
 * final config object. You can easily perform any needed changes to the original webpack
 * config here, but keep in mind that you may break the app or produce unexpected behaviors
 */


module.exports = function (nextWebpackConfig, _ref) {
  var isServer = _ref.isServer,
      buildId = _ref.buildId,
      distDir = _ref.distDir,
      dev = _ref.dev;
  nextWebpackConfig.node = {
    fs: 'empty'
  };

  if (nextWebpackConfig.resolve.alias) {
    delete nextWebpackConfig.resolve.alias.react;
    delete nextWebpackConfig.resolve.alias['react-dom'];
  } // Add source map for prod


  if (!dev && !isServer && nextWebpackConfig.devtool === false && envBoolean(process.env.ENABLE_SOURCE_MAP)) {
    nextWebpackConfig.devtool = 'source-map';
    nextWebpackConfig.plugins.map(function (p) {
      if (p.constructor.name === 'UglifyJsPlugin') {
        p.options.sourceMap = true;
      }

      return p;
    });
  } //Ask babel to compile all route files instead of just "client"


  nextWebpackConfig.module.rules.forEach(function (r) {
    if (r.use && r.use.loader === 'next-babel-loader') {
      r.include = [].concat((0, _toConsumableArray2["default"])(r.include), [paths.app]);
    }
  });
  nextWebpackConfig.plugins = nextWebpackConfig.plugins.map(function (plugin) {
    if (plugin.constructor.name === 'CommonsChunkPlugin' && plugin.minChunks != null) {
      var defaultMinChunks = plugin.minChunks;

      plugin.minChunks = function (module, count) {
        if (module.resource && module.resource.match(/\.(sass|scss|css)$/)) {
          return true;
        }

        return defaultMinChunks(module, count);
      };
    }

    return plugin;
  });
  return (0, _extends2["default"])({}, nextWebpackConfig, {
    devServer: {
      quiet: true,
      noInfo: true,
      stats: 'errors-only'
    },
    module: {
      rules: [].concat((0, _toConsumableArray2["default"])(nextWebpackConfig.module.rules), [{
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      }])
    },
    plugins: [].concat((0, _toConsumableArray2["default"])(nextWebpackConfig.plugins), [new webpack.DefinePlugin(env.stringified), new Visualizer()])
  });
};