const webpackConfig = require('./config/webpack.config');
const workboxOpts   = require('./config/serviceWorker.config')
const paths         = require('./lib/paths');
//@remove-on-eject-begin
const withTM        = require('next-transpile-modules');
//@remove-on-eject-end
const withOffline   = require('next-offline');

const nextConfig = /*@add-on-eject-begin({@add-on-eject-end*/
  //@remove-on-eject-begin
  withTM(['@mooglee/core'])(
    {
      //@remove-on-eject-end
      distDir: './build', // from client folder
      dontAutoRegisterSw: true,
      generateInDevMode: true,
      useFileSystemPublicRoutes: false,
      workboxOpts,
      sassOptions: {
        includePaths: [paths.app + 'styles'],
      },

      webpack: (config, { dev, isServer, buildId, config: { distDir } }) => {
        return webpackConfig(config, { isServer, buildId, distDir, dev });
      },
    })


module.exports = process.env.NODE_ENV === 'production' ? withOffline(nextConfig) : nextConfig;
