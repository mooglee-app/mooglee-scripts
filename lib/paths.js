const path = require('path');

const appDirectory = process.env.PWD + '/';
const resolveApp   = relativePath => path.resolve(appDirectory, (relativePath === '.' ? '' : relativePath));
const resolveOwn   = relativePath => path.resolve(__dirname, '..', relativePath);


const envPublicUrl = process.env.PUBLIC_URL;

const getPublicUrl = appPackageJson =>
  envPublicUrl || require(appPackageJson).homepage;

module.exports = {
  app: resolveApp('.'),
  appBuild: resolveApp('build'),
  appPublic: resolveApp('public'),
  appStatic: resolveApp('static'),
  appPackageJson: resolveApp('package.json'),
  appPages: resolveApp('pages'),
  appErrorPage: resolveApp('pages/_error.js'),
  appStoreReducers: resolveApp('store/reducers'),
  appDefaultStore: resolveApp('store/defaultStore.js'),
  testsSetup: resolveApp('config/jest.setup.js'),
  appNodeModules: resolveApp('node_modules'),
  publicUrl: getPublicUrl(resolveApp('package.json')),
  appLocales: resolveApp('locales'),
  appConfig: resolveApp('config/index.js'),
  routes: resolveApp('routes.js'),
  socket: resolveApp('socket.js'),
  ownPath: resolveOwn('.'),
  ownNodeModules: resolveOwn('node_modules'), // This is empty on npm 3
};
