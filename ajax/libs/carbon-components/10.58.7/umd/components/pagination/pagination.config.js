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
    global.paginationConfig = mod.exports;
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

  var itemsPerPageChoices = [{
    value: '10',
    label: '10'
  }, {
    value: '20',
    label: '20'
  }, {
    value: '30',
    label: '30'
  }, {
    value: '40',
    label: '40'
  }, {
    value: '50',
    label: '50'
  }];
  var pageNumberChoices = [{
    value: '1',
    label: '1'
  }, {
    value: '2',
    label: '2'
  }, {
    value: '3',
    label: '3'
  }, {
    value: '4',
    label: '4'
  }, {
    value: '5',
    label: '5'
  }];
  var variants = [{
    name: 'default',
    label: 'Default',
    context: {
      version: 'x',
      itemsPerPageChoices: itemsPerPageChoices,
      pageNumberChoices: pageNumberChoices,
      totalPages: 5
    }
  }, {
    // `name`/`label`` here not supporting theme switcher
    name: 'Disabled Pagination Buttons',
    label: 'Disabled Pagination Buttons',
    context: {
      version: 'x',
      itemsPerPageChoices: [itemsPerPageChoices[0]],
      totalPages: 1,
      pageNumberChoices: [pageNumberChoices[0]],
      disabledPaginationButton: true
    },
    notes: "\n      Notify the user of their position in the page range by disabling the appropriate pagination buttons\n      at the start or end of the range.\n    "
  }];
  module.exports = {
    context: {
      prefix: prefix
    },
    variants: variants
  };
});