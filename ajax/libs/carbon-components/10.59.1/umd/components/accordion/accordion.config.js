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
    global.accordionConfig = mod.exports;
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
      label: 'Accordion',
      notes: 'Accordions allow users to expand and collapse sections of content.',
      context: {
        sections: [{
          title: 'Section 1 title',
          paneId: 'pane1'
        }, {
          title: 'Section 2 title',
          paneId: 'pane2'
        }, {
          title: 'Section 3 title',
          paneId: 'pane3'
        }, {
          title: 'Section 4 title',
          paneId: 'pane4'
        }]
      }
    }, {
      name: 'legacy',
      label: 'Legacy',
      context: {
        sections: [{
          title: 'Section 1 title'
        }, {
          title: 'Section 2 title'
        }, {
          title: 'Section 3 title'
        }, {
          title: 'Section 4 title'
        }]
      }
    }]
  };
});