/* eslint-disable */
;(function(root, factory) {
  if (typeof define === 'function' && define.amd) { // AMD
    define(['./core', './lua_compressed.js'], factory);
  } else if (typeof exports === 'object') { // Node.js
    module.exports = factory(require('./core'), require('./lua_compressed.js'));
  } else { // Browser
    root.BlocklyLua = factory(root.Blockly, root.BlocklyLua);
  }
}(this, function(Blockly, BlocklyLua) {
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Lua Generator module.
 */

/* eslint-disable */
'use strict';

Blockly.Lua = BlocklyLua;

return BlocklyLua;
})); 
