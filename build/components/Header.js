"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _AppBar = _interopRequireDefault(require("@material-ui/core/AppBar"));

var _Grid = _interopRequireDefault(require("@material-ui/core/Grid"));

var _Toolbar = _interopRequireDefault(require("@material-ui/core/Toolbar"));

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _envBoolean = _interopRequireDefault(require("../tools/envBoolean"));

var _paths = _interopRequireDefault(require("../lib/paths"));

var _componentWrapper = _interopRequireDefault(require("../helpers/componentWrapper"));

var _LangSwitch = _interopRequireDefault(require("./LangSwitch"));

var _Link = _interopRequireDefault(require("./Link"));

var packageJson = require('../../../../package');

var styles = function styles(theme) {
  return {
    container: (0, _defineProperty2["default"])({}, theme.breakpoints.down('xs'), {
      padding: theme.spacing(2)
    }),
    title: {},
    link: (0, _defineProperty2["default"])({
      color: theme.palette.error.main,
      paddingRight: theme.spacing(4)
    }, theme.breakpoints.down('xs'), {
      marginBottom: theme.spacing(2)
    }),
    link__active: {
      color: theme.palette.secondary.main
    },
    langSwitchSelect: {
      color: theme.palette.error.main
    },
    langSwitchText: {
      fontSize: theme.typography.body1.fontSize
    },
    githubLink: {
      marginLeft: theme.spacing(2),
      '& svg': (0, _defineProperty2["default"])({
        width: 30
      }, theme.breakpoints.down('xs'), {
        width: 20
      })
    },
    miscContainer: (0, _defineProperty2["default"])({}, theme.breakpoints.down('xs'), {
      marginTop: theme.spacing(1)
    })
  };
};
/**
 * Header component of the App
 * You can keep and customize this component or remove it depending on your needs
 * @param props
 * @returns {*}
 * @constructor
 */


var _ref = _react["default"].createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 120.8 117.8"
}, _react["default"].createElement("path", {
  d: "M60.4 0C27 0 0 27 0 60.4c0 26.7 17.3 49.3 41.3 57.3 3 .6 4.1-1.3 4.1-2.9 0-1.4-.1-6.2-.1-11.2-16.8 3.6-20.3-7.2-20.3-7.2-2.7-7-6.7-8.8-6.7-8.8-5.5-3.7.4-3.7.4-3.7 6.1.4 9.3 6.2 9.3 6.2 5.4 9.2 14.1 6.6 17.6 5 .5-3.9 2.1-6.6 3.8-8.1-13.4-1.4-27.5-6.6-27.5-29.8 0-6.6 2.4-12 6.2-16.2-.6-1.5-2.7-7.7.6-16 0 0 5.1-1.6 16.6 6.2 4.8-1.3 10-2 15.1-2s10.3.7 15.1 2C87 23.4 92.1 25 92.1 25c3.3 8.3 1.2 14.5.6 16 3.9 4.2 6.2 9.6 6.2 16.2 0 23.2-14.1 28.3-27.6 29.8 2.2 1.9 4.1 5.5 4.1 11.2 0 8.1-.1 14.6-.1 16.6 0 1.6 1.1 3.5 4.1 2.9 24-8 41.3-30.6 41.3-57.3C120.8 27 93.7 0 60.4 0z",
  fillRule: "evenodd",
  clipRule: "evenodd",
  fill: "#fff"
}), _react["default"].createElement("path", {
  className: "st1",
  d: "M22.9 86.7c-.1.3-.6.4-1 .2s-.7-.6-.5-.9c.1-.3.6-.4 1-.2s.6.6.5.9zm-.8-.5M25.3 89.4c-.3.3-.9.1-1.2-.3-.4-.4-.5-1-.2-1.3.3-.3.8-.1 1.2.3.4.5.5 1.1.2 1.3zm-.6-.6M27.7 92.9c-.4.3-1 0-1.3-.5-.4-.5-.4-1.2 0-1.4.4-.3 1 0 1.3.5.4.5.4 1.1 0 1.4zm0 0M31 96.3c-.3.4-1 .3-1.6-.2-.5-.5-.7-1.2-.3-1.5.3-.4 1-.3 1.6.2.5.4.6 1.1.3 1.5zm0 0M35.5 98.2c-.1.5-.8.7-1.5.5-.7-.2-1.1-.8-1-1.2.1-.5.8-.7 1.5-.5.7.2 1.1.7 1 1.2zm0 0M40.4 98.6c0 .5-.6.9-1.3.9-.7 0-1.3-.4-1.3-.9s.6-.9 1.3-.9c.7 0 1.3.4 1.3.9zm0 0M45 97.8c.1.5-.4 1-1.1 1.1-.7.1-1.3-.2-1.4-.7-.1-.5.4-1 1.1-1.1.7-.1 1.3.2 1.4.7zm0 0"
}));

var Header = _react["default"].memo(function Header(props) {
  var classes = props.classes,
      _props$t = props.t,
      t = _props$t === void 0 ? function (e) {
    return e;
  } : _props$t;
  var showDevToolsLinks = (0, _envBoolean["default"])(process.env.KEEP_DEV_TOOLS_ON_PRODUCTION) || process.env.NODE_ENV !== 'production';
  return _react["default"].createElement(_AppBar["default"], {
    position: "static",
    color: "primary"
  }, _react["default"].createElement(_Toolbar["default"], {
    className: classes.container
  }, _react["default"].createElement(_Grid["default"], {
    container: true,
    alignItems: "center",
    justify: "space-between"
  }, _react["default"].createElement(_Grid["default"], {
    item: true
  }, _react["default"].createElement(_Grid["default"], {
    container: true,
    alignItems: "center",
    justify: "flex-start"
  }, _react["default"].createElement(_Grid["default"], {
    item: true,
    xs: 12,
    md: "auto"
  }, _react["default"].createElement(_Link["default"], {
    to: '/',
    className: (0, _classnames["default"])(classes.title, classes.link),
    activeClassName: classes.link__active,
    variant: "h5"
  }, packageJson.name, _react["default"].createElement("small", null, " v", packageJson.version))), _react["default"].createElement(_Grid["default"], {
    item: true,
    xs: "auto"
  }, _react["default"].createElement(_Link["default"], {
    to: '/readme',
    className: classes.link,
    activeClassName: classes.link__active
  }, t('menu_links.readme'))), showDevToolsLinks === true && _react["default"].createElement(_Grid["default"], {
    item: true,
    xs: "auto"
  }, _react["default"].createElement(_Link["default"], {
    to: '/_sandbox',
    className: classes.link,
    activeClassName: classes.link__active,
    color: "error"
  }, t('menu_links.sandbox'))), showDevToolsLinks === true && _react["default"].createElement(_Grid["default"], {
    item: true
  }, _react["default"].createElement(_Link["default"], {
    to: '/_doc/intro',
    className: classes.link,
    activeClassName: classes.link__active,
    color: "error",
    checkSubActive: true
  }, t('menu_links.doc'))))), _react["default"].createElement(_Grid["default"], {
    item: true,
    className: classes.miscContainer
  }, _react["default"].createElement(_Grid["default"], {
    container: true,
    alignItems: "center"
  }, _react["default"].createElement(_LangSwitch["default"], {
    classes: {
      select: classes.langSwitchSelect,
      text: classes.langSwitchText
    }
  }), _react["default"].createElement("a", {
    className: classes.githubLink,
    href: "https://github.com/studiometa/react-next-starter",
    target: "_blank",
    name: "Go to the github page"
  }, _ref))))));
});

var _default = (0, _componentWrapper["default"])(Header, {
  styles: styles
});

exports["default"] = _default;