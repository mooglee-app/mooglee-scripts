const withSass      = require('@zeit/next-sass');
const webpackConfig = require('./config/webpack.config');
//@remove-on-eject-begin
const withTM        = require('next-transpile-modules');
//@remove-on-eject-end
/*@add-on-eject-begin@const withOffline = require('next-offline');@add-on-eject-end@*/

module.exports = /*@add-on-eject-begin@withOffline(@add-on-eject-end@**/withSass(
  //@remove-on-eject-begin
  withTM(
    //@remove-on-eject-end
    {
      transpileModules: ['@mooglee', '@mooglee/core'],
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