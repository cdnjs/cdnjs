"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
exports.__esModule = true;
exports.default = void 0;
var TurboModuleRegistry = _interopRequireWildcard(require("../TurboModule/TurboModuleRegistry"));
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// The config has different keys depending on the type of the Node
// TODO(T54896888): Make these types strict
var _default = exports.default = TurboModuleRegistry.get('NativeAnimatedTurboModule');
module.exports = exports.default;