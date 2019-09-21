"use strict";

module.exports = function () {
  var string = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var splitChar = arguments.length > 1 ? arguments[1] : undefined;

  if (typeof splitChar === 'string') {
    return string.split(splitChar).map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(splitChar);
  }

  return typeof string === 'string' ? string.charAt(0).toUpperCase() + string.slice(1) : '';
};