"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Avatar = _interopRequireDefault(require("@material-ui/core/Avatar"));

var _Hidden = _interopRequireDefault(require("@material-ui/core/Hidden"));

var _MenuItem = _interopRequireDefault(require("@material-ui/core/MenuItem"));

var _Select = _interopRequireDefault(require("@material-ui/core/Select"));

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _config = _interopRequireDefault(require("../config"));

var _i18n = require("../lib/i18n");

/**
 * This component displays a button to switch the current language
 * It can resolve a given url to any other language at the condition that
 * this url is not dynamic.
 */
var LangSwitch = function LangSwitch(_ref) {
  var lang = _ref.lang,
      _ref$classes = _ref.classes,
      classes = _ref$classes === void 0 ? {} : _ref$classes,
      callback = _ref.callback;
  if (_config["default"].lang.enabled !== true) return null;

  var onChange = function onChange(_ref2) {
    var target = _ref2.target;

    _i18n.i18n.changeLanguage(target.value, function () {
      callback(target.value); // TODO the store dispatch should be made outside of this component
    });
  };

  return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement(_Select["default"], {
    value: lang,
    onChange: onChange,
    className: (0, _classnames["default"])(classes.select, 'hidden-no-script')
  }, _config["default"].lang.available.map(function (_lang) {
    return _react["default"].createElement(_MenuItem["default"], {
      value: _lang.lang,
      key: _lang.name,
      className: classes.menuItem
    }, _react["default"].createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center'
      }
    }, _react["default"].createElement(_Avatar["default"], {
      src: "/static/imgs/flags/".concat(_lang.locale, ".png"),
      alt: _lang.name,
      className: classes.icon,
      style: {
        width: '16px',
        height: '16px',
        marginRight: '8px'
      }
    }), _react["default"].createElement(_Hidden["default"], {
      xsDown: true
    }, _react["default"].createElement("span", {
      className: classes.text
    }, _lang.name))));
  })));
};

var _default = (0, _reactRedux.connect)(function (state) {
  return {
    lang: state.app ? state.app.lang : undefined,
    routes: state.app ? state.app.routes : undefined
  };
})(LangSwitch);

exports["default"] = _default;