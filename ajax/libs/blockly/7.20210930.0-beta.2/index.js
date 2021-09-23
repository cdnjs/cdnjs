/* eslint-disable */
;(function(root, factory) {
  if (typeof define === 'function' && define.amd) { // AMD
    define(['./browser'], factory);
  } else if (typeof exports === 'object') { // Node.js
    module.exports = factory(require('./node'));
  } else { // Browser
    root.Blockly = factory(root.Blockly);
  }
}(this, function(Blockly) {
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Blockly module.
 */

/* eslint-disable */
'use strict';
return Blockly;
})); 
