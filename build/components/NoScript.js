"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _server = _interopRequireDefault(require("react-dom/server"));

// This is a simple wrapper that will display its children into a <noscript> tag
// and never render again. This is useful for SRR when you want to display a fallback
// content in case JavaScript has been disabled on the client side
var _default = _react["default"].memo(function (_ref) {
  var children = _ref.children;
  return _react["default"].createElement("noscript", {
    dangerouslySetInnerHTML: {
      __html: _server["default"].renderToStaticMarkup(children)
    }
  });
});

exports["default"] = _default;