const withSass      = require('@zeit/next-sass');
const webpackConfig = require('./config/webpack.config');
//@remove-on-eject-begin
const withTM        = require('next-transpile-modules');
//@remove-on-eject-end
const withOffline   = require('next-offline');

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
      cssLoaderOptions: {
        importLoaders: 1,
        localIdentName: '[local]',
      },

      webpack: (config, { dev, isServer, buildId, config: { distDir } }) => {
        return webpackConfig(config, { isServer, buildId, distDir, dev });
      },
    }));

module.exports = process.env.NODE_ENV === 'production' ? withOffline(nextConfig) : nextConfig;
