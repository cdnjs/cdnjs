/* eslint-disable */
;(function(root, factory) {
  if (typeof define === 'function' && define.amd) { // AMD
    define(['./blocks_compressed'], factory);
  } else if (typeof exports === 'object') { // Node.js
    module.exports = factory(require('./blocks_compressed'));
  } else { // Browser
    root.BlocklyBlocks = factory(root.BlocklyBlocks);
  }
}(this, function(BlocklyBlocks) {
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Blockly blocks module; just a wrapper for blocks_compressed.js.
 */

return BlocklyBlocks;
}));
