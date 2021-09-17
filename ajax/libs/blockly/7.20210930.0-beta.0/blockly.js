/* eslint-disable */
;(function(root, factory) {
  if (typeof define === 'function' && define.amd) { // AMD
    define(['./blockly_compressed'], factory);
  } else if (typeof exports === 'object') { // Node.js
    module.exports = factory(require('./blockly_compressed'));
  } else { // Browser
    root.Blockly = factory(root.Blockly);
  }
}(this, function(Blockly) {
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Blockly module.
 */

/* eslint-disable */
'use strict';

return Blockly;
})); 
