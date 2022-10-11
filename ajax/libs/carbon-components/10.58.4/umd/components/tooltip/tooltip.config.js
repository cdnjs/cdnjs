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
    global.tooltipConfig = mod.exports;
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
      label: 'Interactive Tooltip',
      notes: "\n        Interactive tooltip should be used if there are actions a user can take in the tooltip (e.g. a link or a button).\n        For more regular use case, e.g. giving the user more text information about something,\n        use definition tooltip or icon tooltip.\n      ",
      context: {
        noHeading: {
          idSuffix: "example-".concat(Math.random().toString(36).substr(2))
        },
        heading: {
          idSuffix: "example-".concat(Math.random().toString(36).substr(2))
        },
        label: {
          idSuffix: "example-".concat(Math.random().toString(36).substr(2))
        }
      }
    }, {
      name: 'definition',
      label: 'Definition Tooltip',
      notes: "\n        Definition tooltip is for regular use case of tooltip,\n        e.g. giving the user more text information about something, like defining a word.\n        This works better than the interactive tooltip in regular use cases\n        because the info icon used in interactive tooltip can be repetitive when it\u2019s shown several times on a page.\n        Definition tooltip does not use any JavaScript.\n        If there are actions a user can take in the tooltip (e.g. a link or a button), use interactive tooltip.\n\n        For top positioning, replace bx--tooltip--definition__bottom class with bx--tooltip--definition__top.\n        For center/right alignment, add bx--tooltip--definition__align-center/bx--tooltip--definition__align-end class\n        to the DOM element with bx--tooltip--definition__bottom/bx--tooltip--definition__top.\n      "
    }, {
      name: 'icon',
      label: 'Icon Tooltip',
      notes: "\n        Icon tooltip is for short single line of text describing an icon.\n        Icon tooltip does not use any JavaScript. No label should be added to this variation.\n        If there are actions a user can take in the tooltip (e.g. a link or a button), use interactive tooltip.\n      "
    }]
  };
});