"use strict";

var qs = require('qs');
/**
 * Get a pathname and searchState and
 * build an url that contains the search query
 * @param {string} pathname the pathname of the url
 * @param {object} searchState the search state has key->value object
 * @returns {string}
 */


module.exports = function () {
  var pathname = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var searchState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return searchState ? "".concat(pathname, "?").concat(qs.stringify(searchState)) : '';
};