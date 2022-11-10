/* eslint-disable */
;(function(root, factory) {
  if (typeof define === 'function' && define.amd) { // AMD
    define(['./core', './dart_compressed.js'], factory);
  } else if (typeof exports === 'object') { // Node.js
    module.exports = factory(require('./core'), require('./dart_compressed.js'));
  } else { // Browser
    root.BlocklyDart = factory(root.Blockly, root.BlocklyDart);
  }
}(this, function(Blockly, BlocklyDart) {
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Dart generator module; just a wrapper for dart_compressed.js.
 */

return BlocklyDart;
}));
