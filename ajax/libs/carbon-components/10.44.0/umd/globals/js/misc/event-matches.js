(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.eventMatches = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = eventMatches;
  /**
   * Copyright IBM Corp. 2016, 2018
   *
   * This source code is licensed under the Apache-2.0 license found in the
   * LICENSE file in the root directory of this source tree.
   */

  /**
   * @param {Event} event The event.
   * @param {string} selector The selector.
   * @returns {Element}
   *   The closest ancestor of the event target (or the event target itself) which matches the selectors given in parameter.
   */

  function eventMatches(event, selector) {
    // <svg> in IE does not have `Element#msMatchesSelector()` (that should be copied to `Element#matches()` by a polyfill).
    // Also a weird behavior is seen in IE where DOM tree seems broken when `event.target` is on <svg>.
    // Therefore this function simply returns `undefined` when `event.target` is on <svg>.
    var target = event.target,
        currentTarget = event.currentTarget;

    if (typeof target.matches === 'function') {
      if (target.matches(selector)) {
        // If event target itself matches the given selector, return it
        return target;
      }

      if (target.matches("".concat(selector, " *"))) {
        var closest = target.closest(selector);

        if ((currentTarget.nodeType === Node.DOCUMENT_NODE ? currentTarget.documentElement : currentTarget).contains(closest)) {
          return closest;
        }
      }
    }

    return undefined;
  }
});