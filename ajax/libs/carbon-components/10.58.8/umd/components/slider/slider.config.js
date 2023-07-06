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
    global.sliderConfig = mod.exports;
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
      label: 'Slider',
      notes: "\n        A slider enables the user to specify a numeric value which must be no less than a given value,\n        and no more than another given value.\n      ",
      context: {
        value: 25,
        inputId: 'slider-input-box'
      }
    }, {
      name: 'light',
      label: 'Light',
      context: {
        light: true,
        value: 75,
        inputId: 'slider-input-box-light'
      }
    }, {
      name: 'disabled',
      label: 'Disabled',
      context: {
        disabled: true,
        value: 50,
        inputId: 'slider-input-box'
      }
    }]
  };
});