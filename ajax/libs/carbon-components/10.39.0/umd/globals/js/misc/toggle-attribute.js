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
    global.toggleAttribute = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = toggleAttribute;
  /**
   * Copyright IBM Corp. 2016, 2018
   *
   * This source code is licensed under the Apache-2.0 license found in the
   * LICENSE file in the root directory of this source tree.
   */

  /**
   * Toggles the given attribute of the given element.
   * @param {Element} elem The element.
   * @param {string} name The attribute name.
   * @param {boolean} add `true` to set the attribute.
   */

  function toggleAttribute(elem, name, add) {
    if (add) {
      elem.setAttribute(name, '');
    } else {
      elem.removeAttribute(name);
    }
  }
});