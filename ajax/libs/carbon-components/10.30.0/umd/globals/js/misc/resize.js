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
    global.resize = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  /**
   * Copyright IBM Corp. 2016, 2018
   *
   * This source code is licensed under the Apache-2.0 license found in the
   * LICENSE file in the root directory of this source tree.
   */
  // mdn resize function

  var optimizedResize = /* #__PURE__ */function optimizedResize() {
    var callbacks = [];
    var running = false; // run the actual callbacks

    function runCallbacks() {
      callbacks.forEach(function (callback) {
        callback();
      });
      running = false;
    } // fired on resize event


    function resize() {
      if (!running) {
        running = true;
        window.requestAnimationFrame(runCallbacks);
      }
    } // adds callback to loop


    function addCallback(callback) {
      if (callback) {
        var index = callbacks.indexOf(callback);

        if (index < 0) {
          callbacks.push(callback);
        }
      }
    }

    return {
      // public method to add additional callback
      add: function add(callback) {
        if (!callbacks.length) {
          window.addEventListener('resize', resize);
        }

        addCallback(callback);
        return {
          release: function release() {
            var index = callbacks.indexOf(callback);

            if (index >= 0) {
              callbacks.splice(index, 1);
            }
          }
        };
      }
    };
  }();

  var _default = optimizedResize;
  _exports.default = _default;
});