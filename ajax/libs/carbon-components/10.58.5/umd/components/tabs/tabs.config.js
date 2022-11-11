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
    global.tabsConfig = mod.exports;
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

  var items = function items(idSuffix) {
    return [{
      linkId: "tab-link-1-".concat(idSuffix),
      panelId: "tab-panel-1-".concat(idSuffix),
      panelClass: "tab-1-".concat(idSuffix),
      label: 'Tab label 1',
      panelContent: 'Content for first tab goes here.',
      selected: true
    }, {
      linkId: "tab-link-2-".concat(idSuffix),
      panelId: "tab-panel-2-".concat(idSuffix),
      panelClass: "tab-2-".concat(idSuffix),
      label: 'Tab label 2',
      panelContent: 'Content for second tab goes here.'
    }, {
      linkId: "tab-link-3-".concat(idSuffix),
      panelId: "tab-panel-3-".concat(idSuffix),
      panelClass: "tab-3-".concat(idSuffix),
      label: 'Tab label 3',
      panelContent: 'Content for third tab goes here.'
    }, {
      linkId: "tab-link-4-".concat(idSuffix),
      panelId: "tab-panel-4-".concat(idSuffix),
      panelClass: "tab-4-".concat(idSuffix),
      label: 'Tab label 4',
      panelContent: 'Content for fourth tab goes here.',
      disabled: true
    }];
  };

  module.exports = {
    context: {
      prefix: prefix
    },
    variants: [{
      name: 'default',
      label: 'Tabs',
      context: {
        items: items('default')
      }
    }, {
      name: 'container',
      label: 'Tabs (container)',
      context: {
        container: true,
        items: items('container')
      }
    }]
  };
});