/* eslint-disable */
;(function(root, factory) {
  if (typeof define === 'function' && define.amd) { // AMD
    define(['./core', './python_compressed.js'], factory);
  } else if (typeof exports === 'object') { // Node.js
    module.exports = factory(require('./core'), require('./python_compressed.js'));
  } else { // Browser
    root.BlocklyPython = factory(root.Blockly, root.BlocklyPython);
  }
}(this, function(Blockly, BlocklyPython) {
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Python Generator module.
 */

/* eslint-disable */
'use strict';

Blockly.Python = BlocklyPython;

return BlocklyPython;
})); 
