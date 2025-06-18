"use strict";

exports.__esModule = true;
exports.default = void 0;
/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

var isDisabled = props => props.disabled || Array.isArray(props.accessibilityStates) && props.accessibilityStates.indexOf('disabled') > -1;
var _default = exports.default = isDisabled;
module.exports = exports.default;