/* eslint-disable */
;(function(root, factory) {
  if (typeof define === 'function' && define.amd) { // AMD
    define(['./core', './javascript_compressed.js'], factory);
  } else if (typeof exports === 'object') { // Node.js
    module.exports = factory(require('./core'), require('./javascript_compressed.js'));
  } else { // Browser
    root.BlocklyJavaScript = factory(root.Blockly, root.BlocklyJavaScript);
  }
}(this, function(Blockly, BlocklyJavaScript) {
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview JavaScript Generator module.
 */

/* eslint-disable */
'use strict';

Blockly.JavaScript = BlocklyJavaScript;

return BlocklyJavaScript;
})); 
