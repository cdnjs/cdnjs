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
    global.gridConfig = mod.exports;
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

  var featureFlags = require('../../globals/js/feature-flags');

  module.exports = {
    preview: 'grid-preview',
    meta: {
      useIframe: true
    },
    context: {
      featureFlags: featureFlags,
      prefix: prefix,
      rows: [{
        breakpoint: 'sm',
        columns: Array.from({
          length: 4
        }),
        title: 'Small (4 columns @ 320px)'
      }, {
        breakpoint: 'md',
        columns: Array.from({
          length: 8
        }),
        title: 'Medium (8 columns @ 672px)'
      }, {
        breakpoint: 'lg',
        columns: Array.from({
          length: 12
        }),
        title: 'Large (12 columns @ 1312px)'
      }, {
        breakpoint: 'xlg',
        columns: Array.from({
          length: 12
        }),
        title: 'X-Large (12 columns @ 1312px)'
      }, {
        breakpoint: 'max',
        columns: Array.from({
          length: 12
        }),
        title: 'Max (12 columns @ 1584px)'
      }]
    },
    variants: [{
      name: 'default',
      label: 'Grid'
    }, {
      name: '16',
      context: {
        rows: [{
          breakpoint: 'sm',
          columns: Array.from({
            length: 4
          }),
          title: 'Small (4 columns @ 320px)'
        }, {
          breakpoint: 'md',
          columns: Array.from({
            length: 8
          }),
          title: 'Medium (8 columns @ 672px)'
        }, {
          breakpoint: 'lg',
          columns: Array.from({
            length: 16
          }),
          title: 'Large (16 columns @ 1316px)'
        }, {
          breakpoint: 'xlg',
          columns: Array.from({
            length: 16
          }),
          title: 'X-Large (16 columns @ 1316px)'
        }, {
          breakpoint: 'max',
          columns: Array.from({
            length: 16
          }),
          title: 'Max (16 columns @ 1584px)'
        }]
      }
    }]
  };
});