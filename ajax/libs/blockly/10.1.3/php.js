/* eslint-disable */
;(function(root, factory) {
  if (typeof define === 'function' && define.amd) { // AMD
    define(['./core', './php_compressed.js'], factory);
  } else if (typeof exports === 'object') { // Node.js
    module.exports = factory(require('./core'), require('./php_compressed.js'));
  } else { // Browser
    root.BlocklyPHP = factory(root.Blockly, root.BlocklyPHP);
  }
}(this, function(Blockly, BlocklyPHP) {
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview PHP generator module; just a wrapper for php_compressed.js.
 */

return BlocklyPHP;
}));
