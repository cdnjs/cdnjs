/* eslint-disable */
;(function(root, factory) {
  if (typeof define === 'function' && define.amd) { // AMD
    define(['./blockly'], factory);
  } else if (typeof exports === 'object') { // Node.js
    module.exports = factory(require('./blockly'));
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
 * @fileoverview Blockly core module for the browser. It includes blockly.js
 *               and adds a helper method for setting the locale.
 */

/* eslint-disable */
'use strict';

return Blockly;
}));
