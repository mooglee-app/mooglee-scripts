"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

/**
 * get an element's parent using a query selector
 * @param el the targeted element
 * @param s a query selector that represent the parent to look for
 * @returns {*}
 */
function _default(el, s) {
  if (!document.documentElement.contains(el)) return null;

  do {
    if (el.matches(s)) return el;
    el = el.parentElement || el.parentNode;
  } while (el !== null);

  return null;
}

;