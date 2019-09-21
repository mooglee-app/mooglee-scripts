"use strict";

/**
 * Returns a string computed like this : 3h42
 * @param minutes
 * @returns {string}
 */
module.exports = function () {
  var minutes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  return "".concat(Math.floor(minutes / 60), "h").concat(minutes % 60 === 0 ? '' : minutes % 60);
};