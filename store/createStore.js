import deepmerge                                                         from 'deepmerge';
import { applyMiddleware, combineReducers, createStore as _createStore } from 'redux';
import { load, save }                                                    from 'redux-localstorage-simple';
import { createLogger }                                                  from 'redux-logger';
import thunk                                                             from 'redux-thunk';
import getAppExports                                                     from '../appExports';
import config                                                            from '../config';
import coreReducers                                                      from './core.reducers';


const { localStorageStates, customMiddleware = [], logger: userLogger = false } = config.redux;

const { Socket, defaultStore, packageJson, reducers } = getAppExports();


const combinedReducers = combineReducers({
  ...reducers,
  core: coreReducers,
});

const isServer = !process.browser;
const logger   = (process.env.NODE_ENV === 'production' || !userLogger)
  ? _store => _next => _action => _next(_action)
  : createLogger({
    collapsed: true,
    duration: true,
  });

// The socket will be used in thunk actions to simplify the connection
// with an external API. You can learn more about how it works in the readme
// or directly in the Socket's Class source file

const socket = new Socket();

// This is used by the server has a default state structure. This is very helpful while
// it allows us to be sure that some default attributes will always be defined. It is also a
// good place to inject other data, settings, etc

const DEFAULT_STATE = {
  core: {
    lang: config.lang.default,
    pages: {},
  },
  ...defaultStore,
};


function createStore(initialState) {

  // We do not want middlewares like redux-logger to get
  // triggered on the server side

  if (isServer) {
    return _createStore(combinedReducers,
      initialState || DEFAULT_STATE,
      applyMiddleware(thunk.withExtraArgument(socket)));
  } else {
    const localState = load({ states: localStorageStates, namespace: packageJson.name });

    // We want to load the initialState or the DEFAULT_STATE in a different order depending on the situation
    initialState = typeof initialState === 'object'
      ? deepmerge(
        localState,
        initialState,
      )
      : deepmerge(
        DEFAULT_STATE,
        localState,
      );

    return _createStore(
      combinedReducers,
      initialState,
      applyMiddleware(
        save({ states: localStorageStates, namespace: packageJson.name }),
        thunk.withExtraArgument(socket),
        logger,
        ...customMiddleware,
      ),
    );
  }
}


export default createStore;
