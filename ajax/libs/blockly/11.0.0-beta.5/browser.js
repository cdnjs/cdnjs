/* eslint-disable */
;(function(root, factory) {
  if (typeof define === 'function' && define.amd) { // AMD
    define(['./core-browser', './msg/en', './blocks', './javascript'], factory);
  } else if (typeof exports === 'object') { // Node.js
    module.exports = factory(require('./core-browser'), require('./msg/en'), require('./blocks'), require('./javascript'));
  } else { // Browser
    root.Blockly = factory(root.Blockly, root.En, root.BlocklyBlocks, root.BlocklyJS);
  }
}(this, function(Blockly, En, BlocklyBlocks, BlocklyJS) {
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Blockly module for the browser. This includes Blockly core
 * and built in blocks, the JavaScript code generator and the English block
 * localization files.
 */

/* eslint-disable */
'use strict';

// Include the EN Locale by default.
Blockly.setLocale(En);

return Blockly;
}));
