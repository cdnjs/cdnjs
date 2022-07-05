"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

exports.__esModule = true;
exports.VirtualizedListCellContextProvider = VirtualizedListCellContextProvider;
exports.VirtualizedListContext = void 0;
exports.VirtualizedListContextProvider = VirtualizedListContextProvider;
exports.VirtualizedListContextResetter = VirtualizedListContextResetter;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var React = _interopRequireWildcard(require("react"));

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
const __DEV__ = process.env.NODE_ENV !== 'production';

const VirtualizedListContext = /*#__PURE__*/React.createContext(null);
exports.VirtualizedListContext = VirtualizedListContext;

if (__DEV__) {
  VirtualizedListContext.displayName = 'VirtualizedListContext';
}
/**
 * Resets the context. Intended for use by portal-like components (e.g. Modal).
 */


function VirtualizedListContextResetter(_ref) {
  let children = _ref.children;
  return /*#__PURE__*/React.createElement(VirtualizedListContext.Provider, {
    value: null
  }, children);
}
/**
 * Sets the context with memoization. Intended to be used by `VirtualizedList`.
 */


function VirtualizedListContextProvider(_ref2) {
  let children = _ref2.children,
      value = _ref2.value;
  // Avoid setting a newly created context object if the values are identical.
  const context = (0, React.useMemo)(() => ({
    cellKey: null,
    getScrollMetrics: value.getScrollMetrics,
    horizontal: value.horizontal,
    getOutermostParentListRef: value.getOutermostParentListRef,
    getNestedChildState: value.getNestedChildState,
    registerAsNestedChild: value.registerAsNestedChild,
    unregisterAsNestedChild: value.unregisterAsNestedChild,
    debugInfo: {
      cellKey: value.debugInfo.cellKey,
      horizontal: value.debugInfo.horizontal,
      listKey: value.debugInfo.listKey,
      parent: value.debugInfo.parent
    }
  }), [value.getScrollMetrics, value.horizontal, value.getOutermostParentListRef, value.getNestedChildState, value.registerAsNestedChild, value.unregisterAsNestedChild, value.debugInfo.cellKey, value.debugInfo.horizontal, value.debugInfo.listKey, value.debugInfo.parent]);
  return /*#__PURE__*/React.createElement(VirtualizedListContext.Provider, {
    value: context
  }, children);
}
/**
 * Sets the `cellKey`. Intended to be used by `VirtualizedList` for each cell.
 */


function VirtualizedListCellContextProvider(_ref3) {
  let cellKey = _ref3.cellKey,
      children = _ref3.children;
  const context = (0, React.useContext)(VirtualizedListContext);
  return /*#__PURE__*/React.createElement(VirtualizedListContext.Provider, {
    value: context == null ? null : (0, _objectSpread2.default)((0, _objectSpread2.default)({}, context), {}, {
      cellKey
    })
  }, children);
}