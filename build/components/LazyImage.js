"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _componentWrapper = _interopRequireDefault(require("../helpers/componentWrapper"));

var _NoScript = _interopRequireDefault(require("./NoScript"));

var _Skeleton = _interopRequireDefault(require("./Skeleton"));

var styles = function styles(theme) {
  return {
    backgroundImage: {
      height: '100%',
      width: '100%',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }
  };
};
/**
 * This component allows you to very easily add an async image that will display
 * a skeleton screen while loading. It can be both an image or a background-image.
 * Checkout the prop types to see how you can customize it :).
 */


var LazyImage =
/*#__PURE__*/
function (_React$PureComponent) {
  (0, _inherits2["default"])(LazyImage, _React$PureComponent);

  function LazyImage() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, LazyImage);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(LazyImage)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.imageObject = null;
    _this._mounted = false;
    _this.state = {
      isReady: false,
      src: null
    };
    return _this;
  }

  (0, _createClass2["default"])(LazyImage, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._mounted = true;
      this.getCover();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._mounted = false;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.src && prevProps.src !== this.props.src) {
        this.getCover();
      }
    }
    /**
     * Here we are fetching the image silently and handling the load result
     */

  }, {
    key: "getCover",
    value: function getCover() {
      var _this2 = this;

      if (!this.props.src) return;
      this.imageObject = new Image();

      var success = function success() {
        _this2._mounted === true && _this2.setState({
          isReady: true,
          src: _this2.props.src
        });
      };

      var error = function error() {
        _this2._mounted === true && _this2.setState({
          isReady: true,
          src: '/static/imgs/fallback_image.png'
        });
      };

      this.imageObject.onload = success;
      this.imageObject.onerror = error;
      this.imageObject.onabort = error;
      this.imageObject.src = this.props.src;
    }
  }, {
    key: "render",
    value: function render() {
      var height = this.props.height ? this.props.height : '100%';
      var width = this.props.width ? this.props.width : '100%';
      /** LOADING STATE **/

      if (this.state.isReady === false || typeof this.state.src !== 'string' || this.props.isLoaded === false) {
        return _react["default"].createElement("div", null, _react["default"].createElement("div", {
          className: "hidden-no-script"
        }, this.props.noSkeleton === true ? _react["default"].createElement("div", {
          style: {
            height: height,
            width: width
          },
          className: this.props.className
        }) : _react["default"].createElement(_Skeleton["default"], {
          height: height,
          width: width,
          isCover: true,
          className: this.props.className
        })), _react["default"].createElement(_NoScript["default"], null, this.props.useBackgroundImage === true && _react["default"].createElement("div", {
          className: (0, _classnames["default"])(this.props.className, this.props.classes.backgroundImage, 'async-image-ready'),
          style: (0, _extends2["default"])({
            backgroundImage: "url(".concat(this.props.src, ")"),
            height: height,
            width: width
          }, this.props.style)
        }), this.props.useBackgroundImage !== true && _react["default"].createElement("img", {
          className: (0, _classnames["default"])(this.props.className, 'async-image-ready'),
          src: this.props.src,
          style: (0, _extends2["default"])({
            height: height,
            width: width
          }, this.props.style)
        })));
      }
      /** LOADED BACKGROUND IMAGE **/


      if (this.props.useBackgroundImage === true) {
        return _react["default"].createElement("div", {
          className: (0, _classnames["default"])(this.props.className, this.props.classes.backgroundImage, 'async-image-ready'),
          style: (0, _extends2["default"])({
            backgroundImage: "url(".concat(this.state.src, ")"),
            height: height,
            width: width
          }, this.props.style)
        });
      }
      /** LOADED IMAGE **/


      return _react["default"].createElement("img", {
        className: (0, _classnames["default"])(this.props.className, 'async-image-ready'),
        src: this.state.src,
        style: (0, _extends2["default"])({
          height: height,
          width: width
        }, this.props.style)
      });
    }
  }]);
  return LazyImage;
}(_react["default"].PureComponent);

LazyImage.propTypes = {
  src: _propTypes["default"].string,
  width: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
  height: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
  useBackgroundImage: _propTypes["default"].bool,
  noSkeleton: _propTypes["default"].bool,
  className: _propTypes["default"].string
};
LazyImage.defaultProps = {
  style: {}
};

var _default = (0, _componentWrapper["default"])(LazyImage, {
  styles: styles
});

exports["default"] = _default;