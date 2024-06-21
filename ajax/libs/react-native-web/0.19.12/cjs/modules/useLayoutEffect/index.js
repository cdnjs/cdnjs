"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
exports.__esModule = true;
exports.default = void 0;
var _react = require("react");
var _canUseDom = _interopRequireDefault(require("../canUseDom"));
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

var useLayoutEffectImpl = _canUseDom.default ? _react.useLayoutEffect : _react.useEffect;
var _default = useLayoutEffectImpl;
exports.default = _default;
module.exports = exports.default;