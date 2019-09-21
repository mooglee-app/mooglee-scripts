"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var express = require('express');

var next = require('next');

var compression = require('compression');

var cors = require('cors');

var _require = require('url'),
    parse = _require.parse;

var _checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');

var paths = require('../lib/paths');

var _require2 = require('react-dev-utils/WebpackDevServerUtils'),
    choosePort = _require2.choosePort;

var auth = require('basic-auth');

var path = require('path');

var LRUCache = require('lru-cache');

var removeUrlLastSlash = require('../tools/removeUrlLastSlash');

var chalk = require('chalk');

var envBoolean = require('../tools/envBoolean');

var nextI18NextMiddleware = require('next-i18next/middleware')["default"];

var nextI18next = require('../lib/i18n');

var config = require('../config');

var routes = require('../../../../routes');

var germaine = require('germaine');

var nextConfig = require('../next.config');

var App =
/*#__PURE__*/
function () {
  function App(props) {
    (0, _classCallCheck2["default"])(this, App);
    this.config = props.config;
    this.dev = process.env.NODE_ENV !== 'production';
    this.nextApp = next({
      dev: this.dev,
      dir: paths.app,
      conf: nextConfig
    });
    this.enableFakeApi = envBoolean(process.env.ENABLE_FAKE_API);
    this.enableHtpasswd = envBoolean(process.env.ENABLE_HTPASSWD);
    this.protocol = process.env.PROTOCOL || 'http';
    this.host = process.env.HOST || this.config.server.baseUrl || 'localhost';
    this.port = parseInt(process.env.PORT || this.config.server.port || 3000);
    this.routes = routes;
    this.url = "".concat(this.protocol, "://").concat(this.host, ":").concat(this.port);
    this.server = null;
    this.enableSSRCaching = envBoolean(process.env.ENABLE_SSR_CACHING);
    this.ssrCache = new LRUCache({
      max: process.env.SRR_CACHE_MAX_SIZE ? parseInt(process.env.SRR_CACHE_MAX_SIZE) : 100,
      maxAge: process.env.SSR_CACHE_MAX_AGE ? parseInt(process.env.SSR_CACHE_MAX_AGE) : 1000 * 60 * 60 // 1hour

    });
    this._routesCheckUnique = [];
  }
  /**
   * Launch the app
   *
   * Also checks if the requested port is free, otherwise
   * ask the user to use another one.
   * @param port
   * @returns {Promise<any>}
   */


  (0, _createClass2["default"])(App, [{
    key: "start",
    value: function () {
      var _start = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee() {
        var port,
            resolvedPort,
            _args = arguments;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                port = _args.length > 0 && _args[0] !== undefined ? _args[0] : this.port;

                if (!(process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test')) {
                  _context.next = 14;
                  break;
                }

                process.env.PORT = port + '';
                _context.prev = 3;
                _context.next = 6;
                return this._launchServer(port);

              case 6:
                return _context.abrupt("return", _context.sent);

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](3);
                throw _context.t0;

              case 12:
                _context.next = 28;
                break;

              case 14:
                _context.prev = 14;
                _context.next = 17;
                return choosePort(this.host, port);

              case 17:
                resolvedPort = _context.sent;

                if (!(resolvedPort !== null)) {
                  _context.next = 23;
                  break;
                }

                process.env.PORT = resolvedPort;
                _context.next = 22;
                return this._launchServer(resolvedPort);

              case 22:
                return _context.abrupt("return", _context.sent);

              case 23:
                _context.next = 28;
                break;

              case 25:
                _context.prev = 25;
                _context.t1 = _context["catch"](14);
                throw _context.t1;

              case 28:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[3, 9], [14, 25]]);
      }));

      function start() {
        return _start.apply(this, arguments);
      }

      return start;
    }()
    /**
     * Stop the server properly
     * @returns {Promise<*|_.default>}
     */

  }, {
    key: "stop",
    value: function () {
      var _stop = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2() {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.nextApp.server.close();

              case 2:
                _context2.next = 4;
                return this.nextApp.close();

              case 4:
                return _context2.abrupt("return", this.nextApp);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function stop() {
        return _stop.apply(this, arguments);
      }

      return stop;
    }()
  }, {
    key: "areRoutesValid",

    /**
     * Return true if all the routes pass the validity check
     * @returns {boolean}
     */
    value: function areRoutesValid() {
      var _this = this;

      try {
        this._routesCheckUnique = [];
        Object.entries(this.routes).forEach(function (_ref) {
          var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
              routeName = _ref2[0],
              routeConfig = _ref2[1];

          _this._checkRouteConfigValidity(routeConfig, routeName);
        });
        this._routesCheckUnique = [];
        return true;
      } catch (err) {
        return false;
      }
    }
    /**
     * Run the server
     * This method can only be called after the app has been prepared
     * @param port
     * @returns {*|Function}
     */

  }, {
    key: "_launchServer",
    value: function () {
      var _launchServer2 = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3() {
        var port,
            _args3 = arguments;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                port = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : this.port;
                this.checkRequiredFiles();
                _context3.prev = 2;
                _context3.next = 5;
                return this.nextApp.prepare();

              case 5:
                _context3.next = 10;
                break;

              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3["catch"](2);
                throw _context3.t0;

              case 10:
                // Init server
                this.server = express(); // Enable cors and compression on production mode

                if (this.dev === false) {
                  this.server.use(cors());
                  this.server.use(compression());
                }

                if (envBoolean(process.env.FORCE_SSL)) {
                  this.server.use(this._forceSSLMiddleware);
                } // Enable cors on production


                this._enableCORS(); // Initialize fake-API


                this._initFakeApi(); // Listen to the public folder


                this.server.use('/', express["static"](paths.appPublic));

                if (config.lang.enabled) {
                  this.server.use(nextI18NextMiddleware(nextI18next));
                  this.server.use('/locales', express["static"](path.join(__dirname, '../', this.config.lang.localesPath)));
                } // Here we are adding new server listeners for the custom routes of the application. We are making this
                // differently depending on if the route translation has been enable or not


                this._initMainListeners(); // Fallback server entry for requests that do not match any defined route


                this._initFallbackListener();

                _context3.prev = 19;
                _context3.next = 22;
                return this.server.listen(port);

              case 22:
                this.nextApp.server = _context3.sent;

                if (process.env.NODE_ENV !== 'test') {
                  console.log('> Ready on ' + "".concat(this.protocol, "://").concat(this.host, ":").concat(port));
                }

                _context3.next = 29;
                break;

              case 26:
                _context3.prev = 26;
                _context3.t1 = _context3["catch"](19);
                throw _context3.t1;

              case 29:
                return _context3.abrupt("return", this.nextApp);

              case 30:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[2, 7], [19, 26]]);
      }));

      function _launchServer() {
        return _launchServer2.apply(this, arguments);
      }

      return _launchServer;
    }()
    /**
     * Warn and crash if required files are missing
     * On test env, it should only return false if a path is missing
     */

  }, {
    key: "checkRequiredFiles",
    value: function checkRequiredFiles() {
      if (!_checkRequiredFiles([paths.appPublic, paths.appPages, paths.appNodeModules, paths.appLocales, paths.appConfig])) {
        if (process.env.NODE_ENV === 'test') return false;
        process.exit(1);
      }

      return true;
    }
    /**
     * Enable CORS protection on production
     * @private
     */

  }, {
    key: "_enableCORS",
    value: function _enableCORS() {
      var _this2 = this;

      if (this.server !== null) {
        this.server.use(function (req, res, next) {
          res.header('Access-Control-Allow-Origin', _this2.dev ? '*' : _this2.url);
          res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
          next();
        });
      }
    }
    /**
     * Initialize fake API
     * @private
     */

  }, {
    key: "_initFakeApi",
    value: function _initFakeApi() {
      if (this.enableFakeApi !== false && this.server !== null) {
        this.server.get('/fake-api', germaine(path.resolve(paths.app, './database.json')));
        this.server.get('/fake-api/*', germaine(path.resolve(paths.app, './database.json')));
      }
    }
    /**
     * push a listener for a given route
     * @param routePath
     * @param routeConfig
     * @param routeName
     */

  }, {
    key: "_pushRouteListener",
    value: function _pushRouteListener(routePath, routeConfig, routeName) {
      var _this3 = this;

      // Remove the sandbox page in production
      if (process.env.NODE_ENV === 'production' && !envBoolean(process.env.KEEP_DEV_TOOLS_ON_PRODUCTION) && (routeName.indexOf('/_sandbox') === 0 || routeName.indexOf('/_doc') === 0)) {
        return;
      }

      if (process.env.NODE_ENV !== 'production') {
        console.log(chalk.cyan('>', routePath));
      }

      this.server.get(routePath,
      /*#__PURE__*/
      function () {
        var _ref3 = (0, _asyncToGenerator2["default"])(
        /*#__PURE__*/
        _regenerator["default"].mark(function _callee4(req, res) {
          var cacheKey, queryParams, shouldBeCached, html;
          return _regenerator["default"].wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  cacheKey = _this3._getCacheKey(req);
                  queryParams = {};
                  shouldBeCached = _this3.enableSSRCaching === true && routeConfig.neverCache !== true;

                  if (req.url && req.url.length > 1 && req.url.substr(req.url.length - 1) === '/') {
                    res.redirect(301, removeUrlLastSlash(req.url));
                  }

                  _this3._htpasswdMiddleware(req, res); // Add needed parameters to the response


                  routePath.split('/').forEach(function (routeSeg) {
                    if (routeSeg.indexOf(':') === 0) {
                      var param = routeSeg.slice(1);
                      queryParams[param] = req.params[param];
                    }
                  }); // If we have a page in the cache, let's serve it

                  if (!(shouldBeCached && _this3.ssrCache.has(cacheKey))) {
                    _context4.next = 10;
                    break;
                  }

                  res.setHeader('x-cache', 'HIT');
                  res.send(_this3.ssrCache.get(cacheKey));
                  return _context4.abrupt("return");

                case 10:
                  _context4.prev = 10;
                  _context4.next = 13;
                  return _this3.nextApp.renderToHTML(req, res, routeConfig.page, queryParams);

                case 13:
                  html = _context4.sent;

                  if (!(!shouldBeCached || res.statusCode !== 200)) {
                    _context4.next = 17;
                    break;
                  }

                  res.send(html);
                  return _context4.abrupt("return");

                case 17:
                  // Let's cache this page
                  _this3.ssrCache.set(cacheKey, html);

                  res.setHeader('x-cache', 'MISS');
                  res.send(html);
                  _context4.next = 25;
                  break;

                case 22:
                  _context4.prev = 22;
                  _context4.t0 = _context4["catch"](10);

                  _this3.nextApp.renderError(_context4.t0, req, res, routeConfig.page, queryParams);

                case 25:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4, null, [[10, 22]]);
        }));

        return function (_x, _x2) {
          return _ref3.apply(this, arguments);
        };
      }());
    }
    /**
     * Initialize express routes listeners for each route defined in the
     * routing files
     * @private
     */

  }, {
    key: "_initMainListeners",
    value: function _initMainListeners() {
      var _this4 = this;

      if (process.env.NODE_ENV !== 'production') {
        console.log(chalk.cyan.bold('\nExpress is now listening to the following routes :'));
      }

      Object.entries(this.routes).forEach(function (_ref4) {
        var _ref5 = (0, _slicedToArray2["default"])(_ref4, 2),
            routeName = _ref5[0],
            routeConfig = _ref5[1];

        _this4._pushRouteListener(removeUrlLastSlash(routeName), routeConfig, routeName);
      });

      if (process.env.NODE_ENV !== 'production') {
        console.log('\n');
      }
    }
    /**
     * Listen to any not-handled requests
     * @private
     */

  }, {
    key: "_initFallbackListener",
    value: function _initFallbackListener() {
      var _this5 = this;

      this.server.get('*', function (req, res) {
        _this5._htpasswdMiddleware(req, res); // Serve the service-worker


        if (req.url === '/service-worker.js') {
          _this5.nextApp.serveStatic(req, res, paths.appStatic + req.url); // If no language has been defined in the request, we should try to find a route that matches the request.
          // If a route has been founded, we must trigger a redirection to add the language segment to the url.
          // For example, /products should probably be resolved to /en/products.

        } else {
          return _this5.nextApp.getRequestHandler()(req, res);
        }
      });
    }
    /**
     * Express middleware that adds an htpasswd form before serving anything from the server
     * @param request
     * @param response
     * @param next
     * @returns {*}
     * @private
     */

  }, {
    key: "_htpasswdMiddleware",
    value: function _htpasswdMiddleware(request, response, next) {
      if (this.enableHtpasswd === true) {
        var user = auth(request);

        if (!user || user.name !== process.env.HTPASSWD_USER || user.pass !== process.env.HTPASSWD_PASSWORD) {
          response.set('WWW-Authenticate', 'Basic realm="No access"');
          return response.status(401).send();
        }
      }
    }
    /**
     * make sure to modify this to take into account anything that should trigger
     * an immediate page change (e.g a locale stored in req.session)
     * @param req
     * @returns {string}
     * @private
     */

  }, {
    key: "_getCacheKey",
    value: function _getCacheKey(req) {
      return "".concat(req.url);
    }
    /**
     * Check the validity of a given 'routeConfig' object
     * @param routeConfig
     * @param routeName
     * @private
     */

  }, {
    key: "_checkRouteConfigValidity",
    value: function _checkRouteConfigValidity(routeConfig, routeName) {
      if ((0, _typeof2["default"])(routeConfig) !== 'object') {
        throw new Error("Route error : the route \"".concat(routeName, "\" should be and object, ").concat((0, _typeof2["default"])(routeConfig), " given."));
      }

      if (typeof routeConfig.page !== 'string' || routeConfig.page.length < 1) {
        throw new Error("Route error : the route \"".concat(routeName, "\" should have a valid 'page' attribute but none was given."));
      }

      if (this._routesCheckUnique.includes(routeName)) {
        throw new Error("Route error : the route \"".concat(routeName, "\" is already defined."));
      }

      this._routesCheckUnique.push(routeName);
    }
    /**
     * This express middleware can be used to ensure the use of HTTPS for any request
     * @param req
     * @param res
     * @param next
     * @returns {void|*|Response}
     * @private
     */

  }, {
    key: "_forceSSLMiddleware",
    value: function _forceSSLMiddleware(req, res, next) {
      // The 'x-forwarded-proto' check is for Heroku
      if (!req.secure && req.get('x-forwarded-proto') !== 'https' && process.env.NODE_ENV !== 'development') {
        return res.redirect('https://' + req.get('host') + req.url);
      }

      next();
    }
  }]);
  return App;
}(); // Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.


if (process.env.NODE_ENV === 'development') {
  process.on('unhandledRejection', function (err) {
    console.error(chalk.red('unhandled promise rejection error', err));
    console.trace(err);
    return null;
  });
}

module.exports = new App({
  config: config
});