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
    global.formConfig = mod.exports;
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

  var selectItems = [{
    label: 'Choose an option',
    disabled: true,
    selected: true,
    hidden: true
  }, {
    label: 'A much longer option that is worth having around to check how text flows',
    value: 'solong'
  }, {
    label: 'Category 1',
    items: [{
      label: 'Option 1',
      value: 'option1'
    }, {
      label: 'Option 2',
      value: 'option2'
    }]
  }, {
    label: 'Category 2',
    items: [{
      label: 'Option 1',
      value: 'option1'
    }, {
      label: 'Option 2',
      value: 'option2'
    }]
  }];
  module.exports = {
    context: {
      prefix: prefix
    },
    variants: [{
      name: 'default',
      label: 'Form',
      notes: 'Forms are widely used to collect user input.',
      context: {
        selectItems: selectItems
      }
    }, {
      name: 'light',
      label: 'Form (Light)',
      context: {
        light: true,
        selectItems: selectItems
      }
    }]
  };
});