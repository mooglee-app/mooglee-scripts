import deepmerge                                         from 'deepmerge';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { load, save }                                    from 'redux-localstorage-simple';
import { createLogger }                                  from 'redux-logger';
import thunk                                             from 'redux-thunk';
import getAppExports                                     from '../appExports';
import config                                            from '../config';
import Socket                                            from '../lib/socket';
import coreReducers                                      from './core.reducers';

// Items that be stored in the localStorage
const { localStorageStates, customMiddleware = [], logger = false } = config.redux;

const { defaultStore, packageJson, reducers, routes } = getAppExports();


const combinedReducers = combineReducers({
  ...reducers,
  core: coreReducers,
});

const isServer = !process.browser;
const logger   = (process.env.NODE_ENV === 'production' || !logger)
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
  core: {
    lang: config.lang.default,
    routes,
    pages: {},
  },
  ...defaultStore,
};

export default (initialState = DEFAULT_STATE) => {

  // We do not want middlewares like redux-logger to get
  // fired on the server side

  if (isServer) {
    return createStore(combinedReducers, initialState, applyMiddleware(thunk.withExtraArgument(socket)));
  } else {
    initialState = deepmerge(
      load({ states: localStorageStates, namespace: packageJson.name }),
      initialState,
    );
    return createStore(
      combinedReducers,
      initialState,
      applyMiddleware(
        save({ states: localStorageStates, namespace: packageJson.name }),
        thunk.withExtraArgument(socket),
        logger,
        ...customMiddleware
      ),
    );
  }
};
