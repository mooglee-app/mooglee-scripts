"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _react = _interopRequireDefault(require("react"));

var _paths = _interopRequireDefault(require("../lib/paths"));

var fetchPage = require("../../../../store/actions/pages.actions.js").fetchPage;

function getErrorStatus() {
  var error = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var statusCode = undefined;

  for (var _i = 0, _arr = ['status', 'code', 'statusCode', 'status', 'code', 'statusCode']; _i < _arr.length; _i++) {
    var _code = _arr[_i];

    if (!!error[_code]) {
      statusCode = error[_code];
      break;
    }
  }

  return statusCode;
}

var lazyGetPageData = function lazyGetPageData(pageName, dispatch) {
  return new Promise(function (resolve, reject) {
    dispatch(fetchPage(pageName, false, function (res, err) {
      if (res && !err) return resolve(res);else {
        reject(err);
      }
    }));
  });
}; // This is a HOC that can be used with all the app pages.
// Its goal is simply to make a request to the API when the Component getInitialProps is called
// an retrieve specific data for the page. these data will be accessible under the page prop 'pageData'


var _default = function _default() {
  var pageName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return function (ComposedComponent) {
    var required = Boolean(opts.required);

    var Extended = function Extended(props) {
      return _react["default"].createElement(ComposedComponent, props);
    };

    Extended.getInitialProps =
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee() {
      var props,
          pageData,
          currentStore,
          initialProps,
          _args = arguments;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              props = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
              // Resolve page data
              pageData = {};
              currentStore = props.store.getState();

              if (!(currentStore && currentStore.pages && currentStore.pages[pageName])) {
                _context.next = 7;
                break;
              }

              pageData = currentStore.pages[pageName];
              _context.next = 17;
              break;

            case 7:
              if (!required) {
                _context.next = 17;
                break;
              }

              _context.prev = 8;
              _context.next = 11;
              return lazyGetPageData(pageName, props.store.dispatch);

            case 11:
              pageData = _context.sent;
              _context.next = 17;
              break;

            case 14:
              _context.prev = 14;
              _context.t0 = _context["catch"](8);
              pageData = {
                error: getErrorStatus(_context.t0) || 404
              }; // Store the status of the error somewhere

            case 17:
              if (!ComposedComponent.getInitialProps) {
                _context.next = 23;
                break;
              }

              _context.next = 20;
              return ComposedComponent.getInitialProps((0, _extends2["default"])({}, props, {
                pageData: pageData
              }));

            case 20:
              _context.t1 = _context.sent;
              _context.next = 24;
              break;

            case 23:
              _context.t1 = {};

            case 24:
              initialProps = _context.t1;
              return _context.abrupt("return", (0, _extends2["default"])({}, initialProps, {
                pageData: pageData,
                pageName: pageName
              }));

            case 26:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[8, 14]]);
    }));
    return Extended;
  };
};

exports["default"] = _default;