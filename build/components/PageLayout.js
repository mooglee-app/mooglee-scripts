"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _Container = _interopRequireDefault(require("@material-ui/core/Container"));

var _styles = require("@material-ui/core/styles");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _reactInspector = _interopRequireDefault(require("react-inspector"));

var _config = _interopRequireDefault(require("../config"));

var _Head = _interopRequireDefault(require("./Head"));

var _Header = _interopRequireDefault(require("./Header"));

var Error = require('../../../../pages/_error');

var styles = function styles(theme) {
  var _container;

  return {
    root: {
      background: theme.palette.background.primary
    },
    container: (_container = {
      minHeight: '100vh',
      margin: 'auto',
      overflow: 'hidden',
      paddingTop: "".concat(theme.spacing(8), "px"),
      paddingBottom: "".concat(theme.spacing(8), "px")
    }, (0, _defineProperty2["default"])(_container, theme.breakpoints.down('md'), {
      paddingTop: "".concat(theme.spacing(8), "px"),
      paddingBottom: "".concat(theme.spacing(8), "px")
    }), (0, _defineProperty2["default"])(_container, theme.breakpoints.down('sm'), {
      paddingTop: "".concat(theme.spacing(6), "px"),
      paddingBottom: "".concat(theme.spacing(6), "px")
    }), (0, _defineProperty2["default"])(_container, theme.breakpoints.down('xs'), {
      paddingTop: "".concat(theme.spacing(6), "px"),
      paddingBottom: "".concat(theme.spacing(6), "px")
    }), _container)
  };
};
/**
 *  This component is a simple page layout that must be added to every page of the app.
 *  Note that in order to work properly, it needs a 'pageData' prop that contains
 *  all the information about the current page (those information have generally been fetched from an API but it can also
 *  be a simple config file or anything else). This prop will principally be used for SEO purpose, like generating the page <head>
 *  tag with some metas, title, etc.
 *
 *  Note that all other props passed to this component (except 'children' of course) will be passed
 *  to the Head component. It means that you can easily override some pageData properties like title for example.
 * @param props
 * @returns {*}
 */


var _ref = _react["default"].createElement(_Header["default"], null);

var PageLayout = (0, _styles.withStyles)(styles)(function Layout(props) {
  var pageData = props.pageData,
      children = props.children,
      classes = props.classes,
      backgroundColor = props.backgroundColor,
      debug = props.debug,
      rest = (0, _objectWithoutProperties2["default"])(props, ["pageData", "children", "classes", "backgroundColor", "debug"]); // Display an error if pageData is not defined or if it contains an error

  if (!pageData || pageData.error === 404 || pageData.error && pageData.error !== 404) {
    var statusCode = pageData && pageData.statusCode ? pageData.statusCode : 404;
    return _react["default"].createElement(Error, {
      statusCode: statusCode
    });
  }

  (0, _extends2["default"])(pageData || {}, rest);
  return _react["default"].createElement("div", {
    className: "".concat(classes.root, " page-").concat(pageData.title),
    style: backgroundColor ? {
      backgroundColor: backgroundColor
    } : {}
  }, _react["default"].createElement(_Head["default"], pageData), _ref, _react["default"].createElement(_Container["default"], {
    className: classes.container,
    fixed: true
  }, _react["default"].createElement("div", {
    className: classes.content
  }, children)), // Optional inspector tool displayed at the bottom of the page
  process.env.NODE_ENV === 'development' && (0, _typeof2["default"])(debug) === 'object' && _react["default"].createElement("div", {
    style: {
      position: 'fixed',
      bottom: 0,
      left: 0,
      width: '100%',
      zIndex: 1000
    }
  }, _react["default"].createElement(_reactInspector["default"], {
    theme: "chromeDark",
    data: debug,
    expandLevel: 0
  })));
});
PageLayout.defaultProps = {
  pageData: _config["default"].api.fetchPagesData ? undefined : {}
};
PageLayout.propTypes = {
  pageData: _propTypes["default"].object,
  children: _propTypes["default"].any,
  classes: _propTypes["default"].object,
  backgroundColor: _propTypes["default"].string,
  debug: _propTypes["default"].object
};
var _default = PageLayout;
exports["default"] = _default;