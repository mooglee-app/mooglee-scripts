const withSass      = require('@zeit/next-sass');
const webpackConfig = require('./server/webpack.config');
const withOffline   = require('next-offline');
const workboxOpts   = require('./server/serviceWorker.config');
const withTM = require('next-transpile-modules');

module.exports      =withTM(/* withOffline(withSass(*/{
  transpileModules: ['@mooglee', '@mooglee/core'],
  cssModules: true,
  distDir: './build', // from client folder
  workboxOpts,
  transpileModules: ['@mooglee/core'],
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
})/*))*/;