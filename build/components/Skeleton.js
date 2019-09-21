"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var Skeleton = function Skeleton(props) {
  var elements = [];

  for (var i = 0; i < props.count; i++) {
    var style = {
      animation: 'sk-screen-progress ' + String(props.duration) + 's ease-in-out infinite'
    };

    if (props.width !== null) {
      style.width = props.width;
    }

    if (props.height !== null) {
      style.height = props.height;
    }

    if (props.isCover === true) {
      style.lineHeight = 'normal';
    }

    elements.push(_react["default"].createElement("span", {
      key: i,
      className: "react-loading-skeleton",
      style: style
    }, "\u200C"));
  }

  var Wrapper = props.wrapper;
  return _react["default"].createElement("span", {
    className: props.className,
    style: props.style
  }, Wrapper ? elements.map(function (element, i) {
    return _react["default"].createElement(Wrapper, {
      key: i
    }, element, "\u200C");
  }) : elements);
};

Skeleton.defaultProps = {
  count: 1,
  duration: 1.2,
  width: null,
  wrapper: null
};

var _default = _react["default"].memo(Skeleton);

exports["default"] = _default;