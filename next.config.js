const withSass      = require('@zeit/next-sass');
const webpackConfig = require('./config/webpack.config');
const workboxOpts   = require('./config/serviceWorker.config')
//@remove-on-eject-begin
const withTM        = require('next-transpile-modules');
//@remove-on-eject-end
const withOffline   = require('next-offline');
const regexEqual    = (x, y) => {
  return (
    x instanceof RegExp &&
    y instanceof RegExp &&
    x.source === y.source &&
    x.global === y.global &&
    x.ignoreCase === y.ignoreCase &&
    x.multiline === y.multiline
  );
};
const nextConfig = withSass(/*@add-on-eject-begin({@add-on-eject-end*/
  //@remove-on-eject-begin
  withTM(['@mooglee/core'])(
    {
      //@remove-on-eject-end
      cssModules: true,
      distDir: './build', // from client folder
      dontAutoRegisterSw: true,
      generateInDevMode: true,
      useFileSystemPublicRoutes: false,
      workboxOpts,
      cssLoaderOptions: {
        importLoaders: 1,
        localIdentName: '[local]',
      },

      webpack: (config, { dev, isServer, buildId, config: { distDir } }) => {
        return webpackConfig(config, { isServer, buildId, distDir, dev });
      },
    }));

// Fix a bug with transpile-modules
if (typeof nextConfig.webpack === 'function') {
  const prevWebpack  = nextConfig.webpack;
  nextConfig.webpack = (config, options) => {
    const nextCssLoaders = config.module.rules.find((rule) => typeof rule.oneOf === 'object');

    if (nextCssLoaders) {
      const nextCssLoader = nextCssLoaders.oneOf.find(
        (rule) => rule.sideEffects === false && regexEqual(rule.test, /\.module\.css$/),
      );

      nextCssLoader.issuer.include = [];
    }
    return prevWebpack(config, options);
  }
}

module.exports = process.env.NODE_ENV === 'production' ? withOffline(nextConfig) : nextConfig;
