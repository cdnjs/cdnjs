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
    global.searchConfig = mod.exports;
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
    default: 'extra-large',
    context: {
      prefix: prefix
    },
    variants: [{
      name: 'extra-large',
      label: 'Normal search',
      notes: "\n        Search enables users to specify a word or a phrase to find particular relevant pieces of content\n        without the use of navigation. Search can be used as the primary means of discovering content,\n        or as a filter to aid the user in finding content.\n      ",
      context: {
        suffix: 'xl'
      }
    }, {
      name: 'large',
      label: 'Medium search',
      notes: "\n        Search enables users to specify a word or a phrase to find particular relevant pieces of content\n        without the use of navigation. Search can be used as the primary means of discovering content,\n        or as a filter to aid the user in finding content. With the medium version, the search field will be\n        slightly smaller.\n      ",
      context: {
        suffix: 'lg'
      }
    }, {
      name: 'small',
      label: 'Small search',
      notes: "\n        Search enables users to specify a word or a phrase to find particular relevant pieces of content\n        without the use of navigation. Search can be used as the primary means of discovering content,\n        or as a filter to aid the user in finding content. With the small version, the search field will be\n        more compact.\n      ",
      context: {
        suffix: 'sm'
      }
    }, {
      name: 'extra-large-light',
      label: 'Normal search (Light)',
      notes: "\n        Search enables users to specify a word or a phrase to find particular relevant pieces of content\n        without the use of navigation. Search can be used as the primary means of discovering content,\n        or as a filter to aid the user in finding content.\n      ",
      context: {
        suffix: 'xl',
        light: true
      }
    }, {
      name: 'large-light',
      label: 'Medium search (Light)',
      notes: "\n        Search enables users to specify a word or a phrase to find particular relevant pieces of content\n        without the use of navigation. Search can be used as the primary means of discovering content,\n        or as a filter to aid the user in finding content. With the medium version, the search field will be\n        slightly smaller.\n      ",
      context: {
        suffix: 'lg',
        light: true
      }
    }, {
      name: 'small-light',
      label: 'Small search (Light)',
      notes: "\n        Search enables users to specify a word or a phrase to find particular relevant pieces of content\n        without the use of navigation. Search can be used as the primary means of discovering content,\n        or as a filter to aid the user in finding content. With the small version, the search field will be\n        more compact.\n      ",
      context: {
        suffix: 'sm',
        light: true
      }
    }]
  };
});