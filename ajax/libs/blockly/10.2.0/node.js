/* eslint-disable */
(function (Blockly, En, BlocklyBlocks, BlocklyJS, BlocklyPython, BlocklyPHP, BlocklyLua, BlocklyDart){
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Blockly module for Node. It includes Blockly core,
 *               built-in blocks, all the generators and the English locale.
 */

/* eslint-disable */
'use strict';

// Include the EN Locale by default.
Blockly.setLocale(En);

module.exports = Blockly;
})(require('./core'), require('./msg/en'), require('./blocks'), require('./javascript'), require('./python'), require('./php'), require('./lua'), require('./dart'));
