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
    global.textInputConfig = mod.exports;
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
      label: 'Text Input',
      notes: "\n        Text fields enable the user to interact with and input data. A single line\n        field is used when the input anticipated by the user is a single line of\n        text as opposed to a paragraph.\n      "
    }, {
      name: 'light',
      label: 'Text Input (Light)',
      context: {
        light: true
      }
    }, {
      name: 'password',
      label: 'Password Input',
      context: {
        password: true
      }
    }, {
      name: 'password--light',
      label: 'Password Input (Light)',
      context: {
        light: true,
        password: true
      }
    }]
  };
});