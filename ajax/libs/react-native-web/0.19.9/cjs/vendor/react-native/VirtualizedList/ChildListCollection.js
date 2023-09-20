"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
exports.__esModule = true;
exports.default = void 0;
var _createForOfIteratorHelperLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/createForOfIteratorHelperLoose"));
var _invariant = _interopRequireDefault(require("fbjs/lib/invariant"));
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */

class ChildListCollection {
  constructor() {
    this._cellKeyToChildren = new Map();
    this._childrenToCellKey = new Map();
  }
  add(list, cellKey) {
    var _this$_cellKeyToChild;
    (0, _invariant.default)(!this._childrenToCellKey.has(list), 'Trying to add already present child list');
    var cellLists = (_this$_cellKeyToChild = this._cellKeyToChildren.get(cellKey)) !== null && _this$_cellKeyToChild !== void 0 ? _this$_cellKeyToChild : new Set();
    cellLists.add(list);
    this._cellKeyToChildren.set(cellKey, cellLists);
    this._childrenToCellKey.set(list, cellKey);
  }
  remove(list) {
    var cellKey = this._childrenToCellKey.get(list);
    (0, _invariant.default)(cellKey != null, 'Trying to remove non-present child list');
    this._childrenToCellKey.delete(list);
    var cellLists = this._cellKeyToChildren.get(cellKey);
    (0, _invariant.default)(cellLists, '_cellKeyToChildren should contain cellKey');
    cellLists.delete(list);
    if (cellLists.size === 0) {
      this._cellKeyToChildren.delete(cellKey);
    }
  }
  forEach(fn) {
    for (var _iterator = (0, _createForOfIteratorHelperLoose2.default)(this._cellKeyToChildren.values()), _step; !(_step = _iterator()).done;) {
      var listSet = _step.value;
      for (var _iterator2 = (0, _createForOfIteratorHelperLoose2.default)(listSet), _step2; !(_step2 = _iterator2()).done;) {
        var list = _step2.value;
        fn(list);
      }
    }
  }
  forEachInCell(cellKey, fn) {
    var _this$_cellKeyToChild2;
    var listSet = (_this$_cellKeyToChild2 = this._cellKeyToChildren.get(cellKey)) !== null && _this$_cellKeyToChild2 !== void 0 ? _this$_cellKeyToChild2 : [];
    for (var _iterator3 = (0, _createForOfIteratorHelperLoose2.default)(listSet), _step3; !(_step3 = _iterator3()).done;) {
      var list = _step3.value;
      fn(list);
    }
  }
  anyInCell(cellKey, fn) {
    var _this$_cellKeyToChild3;
    var listSet = (_this$_cellKeyToChild3 = this._cellKeyToChildren.get(cellKey)) !== null && _this$_cellKeyToChild3 !== void 0 ? _this$_cellKeyToChild3 : [];
    for (var _iterator4 = (0, _createForOfIteratorHelperLoose2.default)(listSet), _step4; !(_step4 = _iterator4()).done;) {
      var list = _step4.value;
      if (fn(list)) {
        return true;
      }
    }
    return false;
  }
  size() {
    return this._childrenToCellKey.size;
  }
}
exports.default = ChildListCollection;
module.exports = exports.default;