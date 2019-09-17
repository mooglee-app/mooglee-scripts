import deepmerge                        from 'deepmerge';
import { applyMiddleware, createStore } from 'redux';
import { createLogger }                 from 'redux-logger';
import thunk                            from 'redux-thunk';
import config                           from '../../config';
import paths                            from '../lib/paths';

const packageJson  = require(`${paths.appPackageJson}`);
const Socket       = require(`${paths.socket}`);
const routes       = require(`${paths.routes}`);
const reducers     = require(`${paths.appStoreReducers}`);
const defaultStore = require(`${paths.appDefaultStore}`);

// Items that be stored in the localStorage
const { localStorageStates } = config.redux;

const isServer = !process.browser;
const logger   = process.env.NODE_ENV === 'production'
  ? _store => _next => _action => _next(_action)
  : createLogger({
    collapsed: true,
    duration: true,
  });

// The socket will be used in thunk actions to simplify the connection
// with an external API. You can learn more about how it works in the readme
// or directly in the Class source file

const socket = new Socket();

// This is used by the server has a default state structure. This is very helpful while
// it allow us to be sure that some default attributes while always be defined. It is also a
// go place to inject other data, settings, etc

const DEFAULT_STATE = {
  app: {
    lang: config.lang.default,
    routes,
  },
  ...defaultStore,
};


export default (initialState = DEFAULT_STATE, storageHandler) => {

  const { load, save } = storageHandler;

  // We do not want middlewares like redux-logger to get
  // fired on the server side

  if (isServer) {
    return createStore(reducers, initialState, applyMiddleware(thunk.withExtraArgument(socket)));
  } else {
    initialState = deepmerge(
      load({ states: localStorageStates, namespace: packageJson.name }),
      initialState,
    );
    return createStore(
      reducers,
      initialState,
      applyMiddleware(
        save({ states: localStorageStates, namespace: packageJson.name }),
        thunk.withExtraArgument(socket),
        logger,
      ),
    );
  }

};
