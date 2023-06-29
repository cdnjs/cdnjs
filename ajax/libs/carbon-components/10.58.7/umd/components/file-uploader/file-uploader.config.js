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
    global.fileUploaderConfig = mod.exports;
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
      label: 'File uploader',
      context: {
        id: 'file-uploader'
      }
    }, {
      name: 'example upload states',
      label: 'File uploader with example upload states',
      context: {
        id: 'prepopulated-file-uploader',
        exampleUploadStates: true
      }
    }, {
      name: 'legacy',
      label: 'Legacy file uploader',
      context: {
        id: 'legacy-file-uploader',
        legacy: true
      }
    }, {
      name: 'legacy with example upload states',
      label: 'Legacy file uploader with example upload states',
      context: {
        id: 'legacy-file-uploader-states',
        legacy: true,
        exampleUploadStates: true
      }
    }]
  };
});