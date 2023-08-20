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
    global.toolbarConfig = mod.exports;
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

  var filterOptions = [{
    id: 'filter-option-1',
    value: 'filter-option-1',
    label: 'Filter option 1',
    primaryFocus: true
  }, {
    id: 'filter-option-2',
    value: 'filter-option-2',
    label: 'Filter option 2'
  }, {
    id: 'filter-option-3',
    value: 'filter-option-3',
    label: 'Filter option 3'
  }];
  var rowHeightOptions = [{
    id: 'short-rows',
    value: 'short',
    label: 'Short',
    selected: true,
    primaryFocus: true
  }, {
    id: 'tall-rows',
    value: 'tall',
    label: 'Tall'
  }];
  module.exports = {
    context: {
      prefix: prefix
    },
    variants: [{
      name: 'default',
      label: 'Toolbar',
      context: {
        filterOptions: filterOptions,
        rowHeightOptions: rowHeightOptions
      }
    }]
  };
});