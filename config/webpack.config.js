const getClientEnvironment = require('../server/env');
const webpack              = require('webpack');
const env                  = getClientEnvironment();
const envBoolean           = require('../tools/envBoolean');
const paths                = require('../lib/paths');

/**
 * This is not a real webpack configuration file but a function that performs changes to
 * the Next's webpack config. It takes the original config as parameter and returns a
 * final config object. You can easily perform any needed changes to the original webpack
 * config here, but keep in mind that you may break the app or produce unexpected behaviors
 */
module.exports = (nextWebpackConfig, { isServer, buildId, distDir, dev }) => {
  nextWebpackConfig.node = {
    fs: 'empty',
  };

  if (nextWebpackConfig.resolve.alias) {
    delete nextWebpackConfig.resolve.alias.react;
    delete nextWebpackConfig.resolve.alias['react-dom'];
  }

  // Add source map for prod
  if (!dev && !isServer && nextWebpackConfig.devtool === false && envBoolean(process.env.ENABLE_SOURCE_MAP)) {
    nextWebpackConfig.devtool = 'source-map';
    nextWebpackConfig.plugins.map((p) => {
      if (p.constructor.name === 'UglifyJsPlugin') {
        p.options.sourceMap = true;
      }
      return p;
    });
  }

  //Ask babel to compile all route files instead of just "client"
  nextWebpackConfig.module.rules.forEach(r => {
    if (r.use && r.use.loader === 'next-babel-loader') {
      r.include = [...r.include, paths.app];
    }
  });


  return Object.assign({}, nextWebpackConfig, {
    devServer: { quiet: true, noInfo: true, stats: 'errors-only' },
    module: {
      rules: [
        ...nextWebpackConfig.module.rules,
      ],
    },
    plugins: [
      ...nextWebpackConfig.plugins,
      new webpack.DefinePlugin(env.stringified),
    ],
  });
};
