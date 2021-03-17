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
    global.svgToggleClass = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }
  /**
   * Copyright IBM Corp. 2016, 2018
   *
   * This source code is licensed under the Apache-2.0 license found in the
   * LICENSE file in the root directory of this source tree.
   */


  function svgToggleClass(svg, name, forceAdd) {
    var list = svg.getAttribute('class').trim().split(/\s+/);
    var uniqueList = Object.keys(list.reduce(function (o, item) {
      return Object.assign(o, _defineProperty({}, item, 1));
    }, {}));
    var index = uniqueList.indexOf(name);
    var found = index >= 0;
    var add = forceAdd === undefined ? !found : forceAdd;

    if (found === !add) {
      if (add) {
        uniqueList.push(name);
      } else {
        uniqueList.splice(index, 1);
      }

      svg.setAttribute('class', uniqueList.join(' '));
    }
  }

  var _default = svgToggleClass;
  _exports.default = _default;
});