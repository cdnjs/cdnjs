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
    global.getLaunchingDetails = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = getLaunchingDetails;
  /**
   * Copyright IBM Corp. 2016, 2018
   *
   * This source code is licensed under the Apache-2.0 license found in the
   * LICENSE file in the root directory of this source tree.
   */

  function getLaunchingDetails(evt) {
    if (!evt || typeof evt === 'function') {
      return {
        launchingElement: null,
        launchingEvent: null
      };
    }

    var launchingElement = evt.delegateTarget || evt.currentTarget || evt;
    var launchingEvent = evt.currentTarget && evt;

    if (launchingElement && !launchingElement.nodeType) {
      throw new TypeError('DOM Node should be given for launching element.');
    }

    if (launchingEvent && !launchingEvent.type) {
      throw new TypeError('DOM event should be given for launching event.');
    }

    return {
      launchingElement: launchingElement,
      launchingEvent: launchingEvent
    };
  }
});