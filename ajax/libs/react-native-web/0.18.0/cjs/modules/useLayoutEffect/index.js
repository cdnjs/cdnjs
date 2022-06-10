"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _ExecutionEnvironment = _interopRequireDefault(require("fbjs/lib/ExecutionEnvironment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * useLayoutEffect throws an error on the server. On the few occasions where is
 * problematic, use this hook.
 *
 * 
 */
var canUseDOM = _ExecutionEnvironment.default.canUseDOM;
var useLayoutEffectImpl = canUseDOM ? _react.useLayoutEffect : _react.useEffect;
var _default = useLayoutEffectImpl;
exports.default = _default;
module.exports = exports.default;