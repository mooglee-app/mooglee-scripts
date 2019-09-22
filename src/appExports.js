const cjsExports = {
  packageJson: require('../../../package'),
  routes: require('../../../routes'),
  config: require('../../../config'),
};

/**
 * This is a list of modules imported from the main app and that can safely be
 * used into mooglee-scripts
 * @type {{routes: any, defaultStore: any, pagesActions: any, packageJson: any, reducers: any}}
 * @param safe {boolean} safe allow to avoid importing ES modules
 */
module.exports = function (safe = false) {
  return safe
    ? cjsExports
    : {
      pagesActions: require('../../../store/actions/pages.actions'),
      defaultStore: require('../../../store/defaultStore').default,
      reducers: require('../../../store/reducers').default,
      errorPage: require('../../../pages/_error').default,
      ...cjsExports,
    };

};



