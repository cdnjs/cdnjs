"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
exports.__esModule = true;
exports.VirtualizedListCellContextProvider = VirtualizedListCellContextProvider;
exports.VirtualizedListContext = void 0;
exports.VirtualizedListContextProvider = VirtualizedListContextProvider;
exports.VirtualizedListContextResetter = VirtualizedListContextResetter;
var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));
var _react = _interopRequireWildcard(require("react"));
var React = _react;
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */

var __DEV__ = process.env.NODE_ENV !== 'production';
var VirtualizedListContext = exports.VirtualizedListContext = /*#__PURE__*/React.createContext(null);
if (__DEV__) {
  VirtualizedListContext.displayName = 'VirtualizedListContext';
}

/**
 * Resets the context. Intended for use by portal-like components (e.g. Modal).
 */
function VirtualizedListContextResetter(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/React.createElement(VirtualizedListContext.Provider, {
    value: null
  }, children);
}

/**
 * Sets the context with memoization. Intended to be used by `VirtualizedList`.
 */
function VirtualizedListContextProvider(_ref2) {
  var children = _ref2.children,
    value = _ref2.value;
  // Avoid setting a newly created context object if the values are identical.
  var context = (0, _react.useMemo)(() => ({
    cellKey: null,
    getScrollMetrics: value.getScrollMetrics,
    horizontal: value.horizontal,
    getOutermostParentListRef: value.getOutermostParentListRef,
    registerAsNestedChild: value.registerAsNestedChild,
    unregisterAsNestedChild: value.unregisterAsNestedChild
  }), [value.getScrollMetrics, value.horizontal, value.getOutermostParentListRef, value.registerAsNestedChild, value.unregisterAsNestedChild]);
  return /*#__PURE__*/React.createElement(VirtualizedListContext.Provider, {
    value: context
  }, children);
}

/**
 * Sets the `cellKey`. Intended to be used by `VirtualizedList` for each cell.
 */
function VirtualizedListCellContextProvider(_ref3) {
  var cellKey = _ref3.cellKey,
    children = _ref3.children;
  // Avoid setting a newly created context object if the values are identical.
  var currContext = (0, _react.useContext)(VirtualizedListContext);
  var context = (0, _react.useMemo)(() => currContext == null ? null : (0, _objectSpread2.default)((0, _objectSpread2.default)({}, currContext), {}, {
    cellKey
  }), [currContext, cellKey]);
  return /*#__PURE__*/React.createElement(VirtualizedListContext.Provider, {
    value: context
  }, children);
}