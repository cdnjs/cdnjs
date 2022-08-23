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
    global.tagConfig = mod.exports;
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

  var tags = [{
    type: 'red',
    label: 'Red'
  }, {
    type: 'magenta',
    label: 'Magenta'
  }, {
    type: 'purple',
    label: 'Purple'
  }, {
    type: 'blue',
    label: 'Blue'
  }, {
    type: 'cyan',
    label: 'Cyan'
  }, {
    type: 'teal',
    label: 'Teal'
  }, {
    type: 'green',
    label: 'Green'
  }, {
    type: 'gray',
    label: 'Gray'
  }, {
    type: 'cool-gray',
    label: 'Cool-Gray'
  }, {
    type: 'warm-gray',
    label: 'Warm-Gray'
  }];
  module.exports = {
    context: {
      prefix: prefix
    },
    variants: [{
      name: 'default',
      label: 'Tag',
      context: {
        tags: tags
      }
    }, {
      name: 'filter',
      label: 'Tag (filter)',
      context: {
        filter: true
      }
    }]
  };
});