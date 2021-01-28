/* eslint-disable */
;(function(root, factory) {
  if (typeof define === 'function' && define.amd) { // AMD
    define(['./blocks_compressed'], factory);
  } else if (typeof exports === 'object') { // Node.js
    module.exports = factory(require('./blocks_compressed'));
  } else { // Browser
    root.Blockly.Blocks = factory(root.Blockly);
  }
}(this, function(Blockly) {
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Blockly Blocks module.
 */

/* eslint-disable */
'use strict';

Blockly.Blocks = {};

return Blockly.Blocks;
})); 
