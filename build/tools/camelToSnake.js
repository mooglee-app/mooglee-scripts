"use strict";

module.exports = function () {
  var string = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var upperChars = string.match(/([A-Z])/g);

  if (!upperChars) {
    return string;
  }

  var str = string.toString();

  for (var i = 0, n = upperChars.length; i < n; i++) {
    str = str.replace(new RegExp(upperChars[i]), '_' + upperChars[i].toLowerCase());
  }

  if (str.slice(0, 1) === '_') {
    str = str.slice(1);
  }

  return str;
};