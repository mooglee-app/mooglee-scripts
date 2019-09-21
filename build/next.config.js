const withSass      = require('@zeit/next-sass');
const webpackConfig = require('./server/webpack.config');
const workboxOpts   = require('./server/serviceWorker.config');

module.exports      =/* withOffline(*/withSass({
  cssModules: true,
  distDir: './build', // from client folder
  workboxOpts,
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
})/*)*/;