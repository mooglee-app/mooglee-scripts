"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _head = _interopRequireDefault(require("next/head"));

var _react = _interopRequireDefault(require("react"));

var _config = _interopRequireDefault(require("../config"));

var packageJson = require('../../../../package');
/**
 * This component generates the pages <head> tag
 * @see https://github.com/zeit/next.js#populating-head
 */


var _ref = _react["default"].createElement("link", {
  rel: "manifest",
  href: "/manifest.json"
});

var _default = _react["default"].memo(function (props) {
  var metaData = props.metaData;
  metaData = [].concat((0, _toConsumableArray2["default"])(_config["default"].seo.defaultMetaTags), (0, _toConsumableArray2["default"])(metaData || []));
  var title = props.title || _config["default"].seo.defaultPagesTitle || packageJson.name;
  return _react["default"].createElement(_head["default"], null, _react["default"].createElement("title", null, title), metaData.length > 0 && metaData.map(function (meta, key) {
    return _react["default"].createElement('meta', (0, _extends2["default"])({
      key: meta.name || key
    }, meta));
  }), process.env.NODE_ENV !== 'development' && _ref);
});

exports["default"] = _default;