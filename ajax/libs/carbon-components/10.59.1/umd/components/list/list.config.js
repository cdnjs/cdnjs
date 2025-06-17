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
    global.listConfig = mod.exports;
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
      label: 'Unordered',
      context: {
        tag: 'ul',
        type: 'unordered',
        displayType: 'Unordered'
      }
    }, {
      name: 'ordered',
      label: 'Ordered',
      context: {
        tag: 'ol',
        type: 'ordered',
        displayType: 'Ordered'
      }
    }, {
      name: 'ordered-native',
      label: 'Ordered native',
      context: {
        tag: 'ol',
        type: 'ordered--native',
        displayType: 'Ordered'
      }
    }]
  };
});