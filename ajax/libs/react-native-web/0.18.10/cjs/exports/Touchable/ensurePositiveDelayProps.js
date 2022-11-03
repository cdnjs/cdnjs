"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

exports.__esModule = true;
exports.default = void 0;

var _invariant = _interopRequireDefault(require("fbjs/lib/invariant"));

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
var ensurePositiveDelayProps = props => {
  (0, _invariant.default)(!(props.delayPressIn < 0 || props.delayPressOut < 0 || props.delayLongPress < 0), 'Touchable components cannot have negative delay properties');
};

var _default = ensurePositiveDelayProps;
exports.default = _default;
module.exports = exports.default;