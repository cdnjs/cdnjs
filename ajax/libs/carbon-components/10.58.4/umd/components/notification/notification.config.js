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
    global.notificationConfig = mod.exports;
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
  /* eslint-disable max-len */


  var items = [{
    type: 'info',
    title: 'Notification title',
    subtitle: 'Subtitle text goes here.',
    timestamp: 'Time stamp [00:00:00]'
  }, {
    type: 'error',
    title: 'Notification title',
    subtitle: 'Subtitle text goes here.',
    timestamp: 'Time stamp [00:00:00]'
  }, {
    type: 'success',
    title: 'Notification title',
    subtitle: 'Our goal is to become better at our craft and raise our collective knowledge by sharing experiences, best practices, what we have recently learned or what we are working on.',
    timestamp: 'Time stamp [00:00:00]'
  }, {
    type: 'warning',
    title: 'Notification title',
    subtitle: 'Subtitle text goes here.',
    timestamp: 'Time stamp [00:00:00]'
  }];
  /* eslint-enable max-len */

  module.exports = {
    context: {
      prefix: prefix
    },
    variants: [{
      name: 'default',
      label: 'Inline Notification',
      context: {
        variant: 'inline',
        items: items
      }
    }, {
      name: 'inline-low-contrast',
      label: 'Inline Notification (Low contrast)',
      context: {
        variant: 'inline',
        lowContrast: true,
        items: items
      }
    }, {
      name: 'toast',
      label: 'Toast Notification',
      notes: "\n        Toast notifications are typically passive, meaning they won't affect the user's workflow if not addressed.\n        Toast Notifications use 'kind' props to specify the kind of notification that should render\n        (error, info, success, warning).\n      ",
      context: {
        variant: 'toast',
        items: items
      }
    }, {
      name: 'toast-low-contrast',
      label: 'Toast Notification (Low contrast)',
      notes: "\n        Toast notifications are typically passive, meaning they won't affect the user's workflow if not addressed.\n        Toast Notifications use 'kind' props to specify the kind of notification that should render\n        (error, info, success, warning).\n      ",
      context: {
        variant: 'toast',
        lowContrast: true,
        items: items
      }
    }]
  };
});