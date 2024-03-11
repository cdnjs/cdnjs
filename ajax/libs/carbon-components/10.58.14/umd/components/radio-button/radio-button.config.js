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
    global.radioButtonConfig = mod.exports;
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

  var items = function items() {
    var groupId = Math.random().toString(36).substr(2);
    return [{
      id: "radio-button-".concat(groupId, "-1"),
      value: 'red',
      label: 'Radio button label'
    }, {
      id: "radio-button-".concat(groupId, "-2"),
      value: 'green',
      label: 'Radio button label'
    }, {
      id: "radio-button-".concat(groupId, "-3"),
      value: 'blue',
      label: 'Radio button label',
      disabled: true
    }];
  };

  module.exports = {
    context: {
      prefix: prefix
    },
    variants: [{
      name: 'default',
      label: 'Radio button group',
      context: {
        selectedValue: 'red',
        group: 'radio-button',
        items: items()
      }
    }, {
      name: 'horizontal-left',
      label: 'Radio button group (Label at left)',
      context: {
        direction: 'left',
        selectedValue: 'red',
        group: 'radio-button',
        items: items()
      }
    }, {
      name: 'vertical',
      label: 'Vertical radio button group',
      context: {
        selectedValue: 'red',
        group: 'radio-button--vertical',
        vertical: true,
        items: items()
      }
    }, {
      name: 'vertical-left',
      label: 'Vertical radio button group (Label at left)',
      context: {
        direction: 'left',
        selectedValue: 'red',
        group: 'radio-button--vertical',
        vertical: true,
        items: items()
      }
    }]
  };
});