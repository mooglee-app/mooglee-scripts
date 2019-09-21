"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _axios = _interopRequireDefault(require("axios"));

var _urlJoin = _interopRequireDefault(require("url-join"));

var _config = _interopRequireDefault(require("../config"));

var Socket =
/*#__PURE__*/
function () {
  function Socket() {
    (0, _classCallCheck2["default"])(this, Socket);
    this.getPage = this.getPage.bind(this);
    this.lang = '';
  }

  (0, _createClass2["default"])(Socket, [{
    key: "setLang",
    value: function setLang(lang) {
      if (_config["default"].lang.enabled !== true) return;
      this.lang = lang;
    }
    /**
     * Get global settings
     * @returns {Promise<any>}
     */

  }, {
    key: "getSettings",
    value: function () {
      var _getSettings = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee() {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return this.get(this.resolveUrl(_config["default"].api.endpoints.settings));

              case 3:
                return _context.abrupt("return", _context.sent);

              case 6:
                _context.prev = 6;
                _context.t0 = _context["catch"](0);
                throw _context.t0;

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 6]]);
      }));

      function getSettings() {
        return _getSettings.apply(this, arguments);
      }

      return getSettings;
    }()
  }, {
    key: "getPage",

    /**
     * Get data and meta-data for a defined page.
     * @param pageId
     * @returns {Promise<any>}
     */
    value: function () {
      var _getPage = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(pageId) {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return this.get(this.resolveUrl(_config["default"].api.endpoints.pages, pageId));

              case 3:
                return _context2.abrupt("return", _context2.sent);

              case 6:
                _context2.prev = 6;
                _context2.t0 = _context2["catch"](0);
                throw _context2.t0;

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 6]]);
      }));

      function getPage(_x) {
        return _getPage.apply(this, arguments);
      }

      return getPage;
    }()
  }, {
    key: "get",

    /**
     * Simply making a get request on a defined endpoint.
     * It is possible to set some parameters to the request as well.
     * @param url
     * @param params
     * @returns {Promise<any>}
     */
    value: function () {
      var _get = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3() {
        var url,
            params,
            result,
            _args3 = arguments;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                url = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : '';
                params = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
                _context3.prev = 2;
                _context3.next = 5;
                return _axios["default"].get(url, params);

              case 5:
                result = _context3.sent;

                if (result.data) {
                  _context3.next = 8;
                  break;
                }

                throw {
                  status: 404,
                  message: 'Not found'
                };

              case 8:
                return _context3.abrupt("return", result.data);

              case 11:
                _context3.prev = 11;
                _context3.t0 = _context3["catch"](2);
                throw this._computeError(_context3.t0);

              case 14:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[2, 11]]);
      }));

      function get() {
        return _get.apply(this, arguments);
      }

      return get;
    }()
    /**
     * Makes it more easy to build
     * urls for the requests by adding the
     * base url defined in the config property of
     * the class
     * @param segments
     * @returns {*}
     */

  }, {
    key: "resolveUrl",
    value: function resolveUrl() {
      for (var _len = arguments.length, segments = new Array(_len), _key = 0; _key < _len; _key++) {
        segments[_key] = arguments[_key];
      }

      return _urlJoin["default"].apply(void 0, [_config["default"].api.getUrl()].concat(segments)).replace(/{{lang}}\//, _config["default"].lang.enabled ? "".concat(this.lang, "/") : '');
    }
    /**
     * Computes axios errors to make them
     * more reusable. It is also possible to define
     * a custom message if needed.
     * @param error
     * @param message
     * @returns {{}}
     * @private
     */

  }, {
    key: "_computeError",
    value: function _computeError() {
      var error = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var message = arguments.length > 1 ? arguments[1] : undefined;
      var _result = {
        message: message
      };

      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        _result.status = error.response.status;
      }

      if (error.message && !message) {
        _result.message = error.message;
      }

      return _result;
    }
  }]);
  return Socket;
}();

exports["default"] = Socket;