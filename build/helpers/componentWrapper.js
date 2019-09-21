"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _styles = require("@material-ui/core/styles");

var _withWidth = _interopRequireDefault(require("@material-ui/core/withWidth"));

var _router = require("next/router");

var _reactRedux = require("react-redux");

var _recompose = require("recompose");

var _config = _interopRequireDefault(require("../config"));

var _i18n = require("../lib/i18n");

var _this = void 0;

/**
 * This is a component wrapper that does the following things:
 * - connect the component to redux
 * - inject pageData after having fetching it from the API
 * - Add MUI styles
 * @param Component
 * @param {function} mapStateToProps: you know what it is
 * @param {object} styles: custom component styles
 * @param {boolean} isTranslatable: defines if the component should be translatable (will add the 't' function)
 * @param {boolean} isConnected: defines if the component should be connected to redux store
 * @param {boolean} hasStyles: defines if the component has MUI styles
 * @param {boolean} withTheme: defines if the theme should be injected to the component's props
 * @param {boolean} withWidth: defines if the current screen size breakpoint should be injected to the component's props
 * @param {boolean} withRouter: inject the pathname, query and asPath into the component
 * @param {array} namespaces: custom namespaces that can be added to i18next
 * @returns {*}
 */
var _default = function _default(Component, _ref) {
  var _ref$mapStateToProps = _ref.mapStateToProps,
      mapStateToProps = _ref$mapStateToProps === void 0 ? null : _ref$mapStateToProps,
      _ref$styles = _ref.styles,
      styles = _ref$styles === void 0 ? {} : _ref$styles,
      _ref$isTranslatable = _ref.isTranslatable,
      isTranslatable = _ref$isTranslatable === void 0 ? true : _ref$isTranslatable,
      _ref$isConnected = _ref.isConnected,
      isConnected = _ref$isConnected === void 0 ? false : _ref$isConnected,
      _ref$hasStyles = _ref.hasStyles,
      hasStyles = _ref$hasStyles === void 0 ? true : _ref$hasStyles,
      _ref$withTheme = _ref.withTheme,
      withTheme = _ref$withTheme === void 0 ? false : _ref$withTheme,
      _ref$withWidth = _ref.withWidth,
      withWidth = _ref$withWidth === void 0 ? false : _ref$withWidth,
      _ref$withRouter = _ref.withRouter,
      withRouter = _ref$withRouter === void 0 ? false : _ref$withRouter,
      _ref$namespaces = _ref.namespaces,
      namespaces = _ref$namespaces === void 0 ? [] : _ref$namespaces;
  var args = [];
  if (isConnected || typeof mapStateToProps === 'function') args.push((0, _reactRedux.connect)(mapStateToProps));
  if (hasStyles || (0, _typeof2["default"])(styles) === 'object') args.push((0, _styles.withStyles)(styles, {
    withTheme: withTheme && !withWidth
  }));
  if (withWidth) args.push((0, _withWidth["default"])({
    initialWidth: 'lg',
    withTheme: withTheme
  }));

  if (_config["default"].lang.enabled) {
    args.push((0, _i18n.withTranslation)([_config["default"].lang.defaultNamespace].concat((0, _toConsumableArray2["default"])(namespaces))));
  }

  if (withRouter) Component = (0, _router.withRouter)(Component);
  return _recompose.compose.apply(_this, args)(Component);
};

exports["default"] = _default;