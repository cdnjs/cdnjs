"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
exports.__esModule = true;
exports.default = useStable;
var React = _interopRequireWildcard(require("react"));
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

var UNINITIALIZED = typeof Symbol === 'function' && typeof Symbol() === 'symbol' ? Symbol() : Object.freeze({});
function useStable(getInitialValue) {
  var ref = React.useRef(UNINITIALIZED);
  if (ref.current === UNINITIALIZED) {
    ref.current = getInitialValue();
  }
  // $FlowFixMe (#64650789) Trouble refining types where `Symbol` is concerned.
  return ref.current;
}
module.exports = exports.default;