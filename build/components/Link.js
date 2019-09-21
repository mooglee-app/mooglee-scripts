"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _config = _interopRequireDefault(require("../config"));

var _removeUrlLastSlash = _interopRequireDefault(require("../tools/removeUrlLastSlash"));

var _i18n = require("../lib/i18n");

var _componentWrapper = _interopRequireDefault(require("../helpers/componentWrapper"));

var _routes = _interopRequireDefault(require("../../../../routes"));

/**
 * This component can be used to build links that works properly with NextJs
 * and the custom router.
 *
 * This is an example of how it should be used :
 * <Link to="/products/:id" query="my-product">Some link text</Link>
 *
 * Take a look at the documentation if you want to know more about this component
 *
 * @param props
 * @returns {*}
 * @constructor
 */
var Link =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2["default"])(Link, _React$Component);

  function Link(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, Link);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(Link).call(this, props));

    _this._isActive = function () {
      if (_this.props.router.route === '/index' && _this.props.to === '/') {
        return true;
      } else if (_this.props.checkSubActive) {
        var segment = _this.props.to.slice(1).split('/')[0];

        return _this.props.router.route.indexOf("/".concat(segment)) === 0;
      } else {
        return _this.props.to !== '/' && _this.props.router.route.indexOf(_this.props.to) === 0;
      }
    };

    _this.state = {
      isActive: false,
      page: null,
      pathname: null,
      isHidden: false,
      isExternal: false // Define if the provided route is an external link

    };
    var _this$props = _this.props,
        to = _this$props.to,
        query = _this$props.query,
        target = _this$props.target;
    var isHidden = false;

    if (!to) {
      _this.state.isHidden = true;
      return (0, _possibleConstructorReturn2["default"])(_this);
    } // If the 'to' prop contains a dot, it cannot be a valid route
    // and is probably be an url. In this case, all we need to
    // do is to save the url into the 'pathname' state of the component
    // and display a native link instead of the Next Link component


    if (to.includes('.') || to.includes('://')) {
      _this.state.isExternal = true;
      _this.state.pathname = to;
      return (0, _possibleConstructorReturn2["default"])(_this);
    } // Find a matching route in the route.js config file


    var _ref = _routes["default"][to] || {},
        page = _ref.page; // Check if a matching route has been found
    // if not, only show an error log on dev env


    if (typeof to !== 'string') {
      if (process.env.NODE_ENV !== 'production') {
        console.error("Link.js: No matching route has been found for '".concat(to, "'"));
      }
    }

    if ((0, _typeof2["default"])(query) === 'object') {
      Object.entries(query).forEach(function (_ref2) {
        var _ref3 = (0, _slicedToArray2["default"])(_ref2, 2),
            queryName = _ref3[0],
            queryValue = _ref3[1];

        return queryValue && queryName ? to = to.replace(":".concat(queryName), queryValue) : null;
      });
    } // If the 'target' is _blank, we must generate an absolute url from the
    // route pathname. This way we can open an internal page in a new tab/window.


    if (target === '_blank') {
      _this.state.isExternal = true;
      _this.state.page = (0, _removeUrlLastSlash["default"])(page);
      _this.state.pathname = (0, _removeUrlLastSlash["default"])(_config["default"].server.getUrl(to));
      _this.state.isHidden = isHidden;
    } else {
      _this.state.page = (0, _removeUrlLastSlash["default"])(page);
      _this.state.pathname = (0, _removeUrlLastSlash["default"])(to);
      _this.state.isHidden = isHidden;
    }

    return _this;
  }

  (0, _createClass2["default"])(Link, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (process.browser && this._isActive() === true) {
        this.setState({
          isActive: true
        });
      }
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return nextState !== this.state || nextProps.children !== this.props.children;
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.isHidden === true) return null;
      if (this.props.disabled === true) return this.props.children;
      var _this$props2 = this.props,
          className = _this$props2.className,
          style = _this$props2.style,
          activeStyle = _this$props2.activeStyle,
          activeClassName = _this$props2.activeClassName,
          linkStyle = _this$props2.linkStyle,
          linkClassName = _this$props2.linkClassName,
          linkAttributes = _this$props2.linkAttributes,
          prefetch = _this$props2.prefetch,
          variant = _this$props2.variant,
          name = _this$props2.name,
          component = _this$props2.component,
          noTypo = _this$props2.noTypo,
          target = _this$props2.target,
          children = _this$props2.children,
          color = _this$props2.color;
      style = this.state.isActive === true && activeClassName !== undefined ? (0, _extends2["default"])({}, style, activeStyle) : style;
      className = this.state.isActive === true && activeClassName !== undefined ? (0, _classnames["default"])(className, activeClassName) : className; // This is the native link component

      var NativeLinkComponent = _react["default"].createElement("a", (0, _extends2["default"])({
        href: this.state.pathname,
        name: name || typeof children === 'string' ? children : '',
        target: target,
        rel: target === '_blank' ? 'noopener' : '',
        style: linkStyle,
        className: linkClassName
      }, linkAttributes), noTypo === true ? this.props.children : _react["default"].createElement(_Typography["default"], {
        className: "".concat(className),
        style: style,
        variant: variant,
        component: component,
        color: color
      }, children)); // Return a native external link if 'to' is not a route but an url


      if (this.state.isExternal === true) {
        return NativeLinkComponent;
      } else {
        return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement(_i18n.Link, {
          href: {
            pathname: this.state.page,
            query: this.props.query
          },
          as: this.state.pathname + this.props.urlQuery,
          prefetch: prefetch
        }, NativeLinkComponent));
      }
    }
  }]);
  return Link;
}(_react["default"].Component);

Link.propTypes = {
  // The content of the link, it can be almost anything
  children: _propTypes["default"].any.isRequired,
  // The route path as defined in the routes.js file
  to: _propTypes["default"].string.isRequired,
  // The route query(ies)
  query: _propTypes["default"].any,
  // A className that is applied to the <a> tag of the link
  className: _propTypes["default"].string,
  // A style to be used when the link is active
  activeStyle: _propTypes["default"].object,
  // A className to be used when the link is active
  activeClassName: _propTypes["default"].string,
  // Do not use the M-ui Typography element in the link
  noTypo: _propTypes["default"].bool,
  // The name of the link (native)
  name: _propTypes["default"].string,
  // The target of the link (native)
  target: _propTypes["default"].string,
  // Define if the related page must be pre-fetched (only in prod)
  prefetch: _propTypes["default"].bool,
  // A query that can be passed to the link
  urlQuery: _propTypes["default"].string,
  // Style that can be applied to the link element (<a>)
  linkStyle: _propTypes["default"].object,
  // Class name that can be applied to the link element (<a>)
  linkClassName: _propTypes["default"].string,
  // Defines if the link is disabled
  disabled: _propTypes["default"].bool,
  // Contains custom jsx attributes that will be passed to the final link element
  // such as name, etc
  linkAttributes: _propTypes["default"].object,
  // Colors for the Typography component
  color: _propTypes["default"].oneOf(['initial', 'error', 'inherit', 'primary', 'secondary', 'textPrimary', 'textSecondary']),
  // if true, the component will consider the link active whenever its first segment matches the current route
  checkSubActive: _propTypes["default"].bool
};
Link.defaultProps = {
  variant: 'button',
  component: 'span',
  color: 'initial',
  noTypo: false,
  target: '_self',
  prefetch: false,
  urlQuery: '',
  linkStyle: {
    display: 'flex'
  },
  disabled: false,
  checkSubActive: false,
  linkAttributes: {}
};

var _default = (0, _componentWrapper["default"])(Link, {
  isTranslatable: false,
  hasStyles: false,
  withRouter: true
});

exports["default"] = _default;