"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _styles = require("@material-ui/core/styles");

var _withTheme = _interopRequireDefault(require("@material-ui/styles/withTheme"));

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _recompose = require("recompose");

var _config = _interopRequireDefault(require("../config"));

var _i18n = require("../lib/i18n");

var _withPageData = _interopRequireDefault(require("../tools/withPageData"));

/**
 * This is a page wrapper that does the following things:
 * - connect the component to redux
 * - connect the component to i18next
 * - inject pageData after having fetching it from the API
 * - Add MUI styles
 * @param Component
 * @param {string} name: the slug name of the page (used by the api, etc)
 * @param {array} namespaces: additional locales that can be injected to the page
 * @param {function} mapStateToProps: you know what it is
 * @param {object} styles: custom component styles
 * @param {boolean} withTheme: define if the prop 'theme' containing the app theme should be injected into the component
 * @param {boolean} noPageData: true if no pageData is required by the page
 * @returns {*}
 */
var _default = function _default(Component, _ref) {
  var name = _ref.name,
      _ref$namespaces = _ref.namespaces,
      namespaces = _ref$namespaces === void 0 ? [] : _ref$namespaces,
      _ref$mapStateToProps = _ref.mapStateToProps,
      mapStateToProps = _ref$mapStateToProps === void 0 ? null : _ref$mapStateToProps,
      _ref$styles = _ref.styles,
      styles = _ref$styles === void 0 ? {} : _ref$styles,
      _ref$withTheme = _ref.withTheme,
      withTheme = _ref$withTheme === void 0 ? false : _ref$withTheme,
      _ref$noPageData = _ref.noPageData,
      noPageData = _ref$noPageData === void 0 ? false : _ref$noPageData;

  var _namespaces = _config["default"].lang.namespaces.includes(name) ? [name].concat((0, _toConsumableArray2["default"])(namespaces)) : namespaces;

  var args = [(0, _withPageData["default"])(name, {
    required: _config["default"].api.fetchPagesData ? !noPageData : false
  }), (0, _reactRedux.connect)(mapStateToProps), (0, _styles.withStyles)(styles)];

  if (_config["default"].lang.enabled) {
    args.push((0, _i18n.withTranslation)(_namespaces)); // This way we do not have to define namespacesRequired two times in every page components

    args.push(function (ComposedComponent) {
      var Extended = function Extended(props) {
        return _react["default"].createElement(ComposedComponent, props);
      };

      Extended.getInitialProps =
      /*#__PURE__*/
      (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee() {
        var props,
            initialProps,
            _args = arguments;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                props = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};

                if (!ComposedComponent.getInitialProps) {
                  _context.next = 7;
                  break;
                }

                _context.next = 4;
                return ComposedComponent.getInitialProps((0, _extends2["default"])({}, props, {
                  pageData: pageData
                }));

              case 4:
                _context.t0 = _context.sent;
                _context.next = 8;
                break;

              case 7:
                _context.t0 = {};

              case 8:
                initialProps = _context.t0;
                return _context.abrupt("return", (0, _extends2["default"])({}, initialProps, {
                  namespacesRequired: _namespaces
                }));

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
      return Extended;
    });
  }

  return (0, _withTheme["default"])(_recompose.compose.apply(void 0, args)(Component), withTheme);
};

exports["default"] = _default;