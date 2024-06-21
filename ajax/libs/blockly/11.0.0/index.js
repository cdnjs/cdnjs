/* eslint-disable */
;(function(root, factory) {
  if (typeof define === 'function' && define.amd) { // AMD
    define(['blockly/core', 'blockly/msg/en', 'blockly/blocks'], factory);
  } else if (typeof exports === 'object') { // Node.js
    module.exports = factory(require('blockly/core'), require('blockly/msg/en'), require('blockly/blocks'));
  } else { // Browser
    root.Blockly = factory(root.Blockly, root.Blockly.Msg, root.Blockly.Blocks);
  }
}(this, function(Blockly, en, blocks) {
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @file Main entrypoint for blockly package.  Via its UMD wrapper,
 * this module loads blockly/core, blockly/blocks and blockly/msg/en
 * and then calls setLocale(en).
 *
 * This entrypoint previously also loaded one or more generators
 * (JavaScript in browser, all five in node.js environments) but it no
 * longer makes sense to do so because of changes to generators
 * exports (they no longer have the side effect of defining
 * Blockly.JavaScript, etc., when loaded as modules).
 */

/* eslint-disable */
'use strict';

// Include the EN Locale by default.
Blockly.setLocale(en);

return Blockly;
}));
