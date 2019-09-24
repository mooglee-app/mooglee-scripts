const withSass      = require('@zeit/next-sass');
const webpackConfig = require('./server/webpack.config');
const withOffline   = require('next-offline');
const workboxOpts   = require('./server/serviceWorker.config');
const withTM        = require('next-transpile-modules');
const withPlugins   = require('next-compose-plugins');


module.exports = withPlugins([
  [withSass, {
    cssModules: true,
    cssLoaderOptions: {
      importLoaders: 1,
      localIdentName: '[local]',
    },
  }],
  [withOffline, {
    workboxOpts,
    dontAutoRegisterSw: true,
    generateInDevMode: true,
  }],
  [withTM, {
    transpileModules: ['@mooglee', '@mooglee/core'],
  }],
], {
  distDir: './build', // from client folder
  useFileSystemPublicRoutes: false,

  webpack: (config, { dev, isServer, buildId, config: { distDir } }) => {
    return webpackConfig(config, { isServer, buildId, distDir, dev });
  },
});
