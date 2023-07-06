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
    global.listBoxConfig = mod.exports;
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

  var items = [{
    id: 'downshift-1-item-0',
    label: 'Option 1',
    selected: true
  }, {
    id: 'downshift-1-item-1',
    label: 'Option 2'
  }, {
    id: 'downshift-1-item-2',
    label: 'Option 3'
  }, {
    id: 'downshift-1-item-3',
    label: 'Option 4'
  }, {
    id: 'downshift-1-item-4',
    label: 'An example option that is really long to show what should be done to handle long text'
  }];
  module.exports = {
    context: {
      prefix: prefix
    },
    variants: [{
      name: 'default',
      label: 'List Box',
      context: {
        items: items
      }
    }, {
      name: 'light',
      label: 'Light',
      context: {
        light: true,
        items: items
      }
    }, {
      name: 'inline',
      label: 'Inline',
      context: {
        inline: true,
        items: items
      }
    }]
  };
});