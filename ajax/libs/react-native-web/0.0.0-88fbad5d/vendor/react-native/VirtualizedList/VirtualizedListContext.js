import _objectSpread from "@babel/runtime/helpers/objectSpread2";

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
import * as React from 'react';
import { useMemo, useContext } from 'react';

var __DEV__ = process.env.NODE_ENV !== 'production';

export var VirtualizedListContext = /*#__PURE__*/React.createContext(null);

if (__DEV__) {
  VirtualizedListContext.displayName = 'VirtualizedListContext';
}
/**
 * Resets the context. Intended for use by portal-like components (e.g. Modal).
 */


export function VirtualizedListContextResetter(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/React.createElement(VirtualizedListContext.Provider, {
    value: null
  }, children);
}
/**
 * Sets the context with memoization. Intended to be used by `VirtualizedList`.
 */

export function VirtualizedListContextProvider(_ref2) {
  var children = _ref2.children,
      value = _ref2.value;
  // Avoid setting a newly created context object if the values are identical.
  var context = useMemo(() => ({
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

export function VirtualizedListCellContextProvider(_ref3) {
  var cellKey = _ref3.cellKey,
      children = _ref3.children;
  var context = useContext(VirtualizedListContext);
  return /*#__PURE__*/React.createElement(VirtualizedListContext.Provider, {
    value: context == null ? null : _objectSpread(_objectSpread({}, context), {}, {
      cellKey
    })
  }, children);
}