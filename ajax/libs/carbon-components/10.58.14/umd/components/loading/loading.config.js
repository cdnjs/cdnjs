(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.loadingConfig = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function () {
  /**
   * Copyright IBM Corp. 2016, 2018
   *
   * This source code is licensed under the Apache-2.0 license found in the
   * LICENSE file in the root directory of this source tree.
   */
  'use strict';

  var _require = require('../../globals/js/settings'),
      prefix = _require.prefix;

  module.exports = {
    context: {
      prefix: prefix
    },
    variants: [{
      name: 'default',
      label: 'Loading',
      notes: "\n        Loading spinners are used when retrieving data or performing slow computations,\n        and help to notify users that loading is underway.\n      ",
      context: {
        overlay: true
      }
    }, {
      name: 'without-overlay',
      label: 'Without overlay',
      context: {
        overlay: false
      }
    }, {
      name: 'small',
      label: 'Small',
      context: {
        overlay: false,
        small: true
      }
    }]
  };
});