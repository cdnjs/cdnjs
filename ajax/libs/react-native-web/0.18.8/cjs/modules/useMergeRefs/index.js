"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = useMergeRefs;

var React = _interopRequireWildcard(require("react"));

var _mergeRefs = _interopRequireDefault(require("../mergeRefs"));

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
function useMergeRefs() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return React.useMemo(() => (0, _mergeRefs.default)(...args), // eslint-disable-next-line
  [...args]);
}

module.exports = exports.default;