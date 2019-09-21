"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _deepmerge = _interopRequireDefault(require("deepmerge"));

var _redux = require("redux");

var _reduxLogger = require("redux-logger");

var _reduxThunk = _interopRequireDefault(require("redux-thunk"));

var _package = _interopRequireDefault(require("../../../../package"));

var _routes = _interopRequireDefault(require("../../../../routes"));

var _socket = _interopRequireDefault(require("../../../../socket"));

var _defaultStore = _interopRequireDefault(require("../../../../store/defaultStore"));

var _reducers = _interopRequireDefault(require("../../../../store/reducers"));

var _config = _interopRequireDefault(require("../config"));

// Items that be stored in the localStorage
var localStorageStates = _config["default"].redux.localStorageStates;
var isServer = !process.browser;
var logger = process.env.NODE_ENV === 'production' ? function (_store) {
  return function (_next) {
    return function (_action) {
      return _next(_action);
    };
  };
} : (0, _reduxLogger.createLogger)({
  collapsed: true,
  duration: true
}); // The socket will be used in thunk actions to simplify the connection
// with an external API. You can learn more about how it works in the readme
// or directly in the Class source file

var socket = new _socket["default"](); // This is used by the server has a default state structure. This is very helpful while
// it allow us to be sure that some default attributes while always be defined. It is also a
// go place to inject other data, settings, etc

var DEFAULT_STATE = (0, _extends2["default"])({
  app: {
    lang: _config["default"].lang["default"],
    routes: _routes["default"]
  }
}, _defaultStore["default"]);

var _default = function _default() {
  var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_STATE;
  var storageHandler = arguments.length > 1 ? arguments[1] : undefined;
  var load = storageHandler.load,
      save = storageHandler.save; // We do not want middlewares like redux-logger to get
  // fired on the server side

  if (isServer) {
    return (0, _redux.createStore)(_reducers["default"], initialState, (0, _redux.applyMiddleware)(_reduxThunk["default"].withExtraArgument(socket)));
  } else {
    initialState = (0, _deepmerge["default"])(load({
      states: localStorageStates,
      namespace: _package["default"].name
    }), initialState);
    return (0, _redux.createStore)(_reducers["default"], initialState, (0, _redux.applyMiddleware)(save({
      states: localStorageStates,
      namespace: _package["default"].name
    }), _reduxThunk["default"].withExtraArgument(socket), logger));
  }
};

exports["default"] = _default;