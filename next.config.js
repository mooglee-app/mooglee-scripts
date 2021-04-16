const webpackConfig = require('./config/webpack.config');
const workboxOpts   = require('./config/serviceWorker.config')
//@remove-on-eject-begin
const withTM        = require('next-transpile-modules');
//@remove-on-eject-end
const withOffline   = require('next-offline');
const getAppExports = require('./appExports');
const { nextI18nextConfig, config }      = getAppExports(true);


const settings = {
  distDir: './build', // from client folder
  dontAutoRegisterSw: true,
  generateInDevMode: true,
  useFileSystemPublicRoutes: false,
  workboxOpts,

  webpack: (config, { dev, isServer, buildId, config: { distDir } }) => {
    return webpackConfig(config, { isServer, buildId, distDir, dev });
  },
};

if (config.lang.enabled && nextI18nextConfig && nextI18nextConfig.i18n) {
  settings.i18n = nextI18nextConfig.i18n;
}

const nextConfig = /*@add-on-eject-begin({@add-on-eject-end*/
  //@remove-on-eject-begin
  withTM(['@mooglee/core'])(
    {
      //@remove-on-eject-end
      ...settings,
    });

// Fix a bug with transpile-modules
if (typeof nextConfig.webpack === 'function') {
  const prevWebpack  = nextConfig.webpack;
  nextConfig.webpack = (config, options) => {
    return prevWebpack(config, options);
  }
}

module.exports = process.env.NODE_ENV === 'production' ? withOffline(nextConfig) : nextConfig;
