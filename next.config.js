const withSass      = require('@zeit/next-sass');
const webpackConfig = require('./config/webpack.config');
const withTM        = require('next-transpile-modules');

module.exports = withTM(withSass({
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