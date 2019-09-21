"use strict";

module.exports = function () {
  var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return url.length > 1 ? url.replace(/\/$/, '') : '/';
};