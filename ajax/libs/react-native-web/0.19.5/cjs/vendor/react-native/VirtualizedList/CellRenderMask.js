"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
exports.__esModule = true;
exports.CellRenderMask = void 0;
var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));
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

class CellRenderMask {
  constructor(numCells) {
    (0, _invariant.default)(numCells >= 0, 'CellRenderMask must contain a non-negative number os cells');
    this._numCells = numCells;
    if (numCells === 0) {
      this._regions = [];
    } else {
      this._regions = [{
        first: 0,
        last: numCells - 1,
        isSpacer: true
      }];
    }
  }
  enumerateRegions() {
    return this._regions;
  }
  addCells(cells) {
    (0, _invariant.default)(cells.first >= 0 && cells.first < this._numCells && cells.last >= -1 && cells.last < this._numCells && cells.last >= cells.first - 1, 'CellRenderMask.addCells called with invalid cell range');

    // VirtualizedList uses inclusive ranges, where zero-count states are
    // possible. E.g. [0, -1] for no cells, starting at 0.
    if (cells.last < cells.first) {
      return;
    }
    var _this$_findRegion = this._findRegion(cells.first),
      firstIntersect = _this$_findRegion[0],
      firstIntersectIdx = _this$_findRegion[1];
    var _this$_findRegion2 = this._findRegion(cells.last),
      lastIntersect = _this$_findRegion2[0],
      lastIntersectIdx = _this$_findRegion2[1];

    // Fast-path if the cells to add are already all present in the mask. We
    // will otherwise need to do some mutation.
    if (firstIntersectIdx === lastIntersectIdx && !firstIntersect.isSpacer) {
      return;
    }

    // We need to replace the existing covered regions with 1-3 new regions
    // depending whether we need to split spacers out of overlapping regions.
    var newLeadRegion = [];
    var newTailRegion = [];
    var newMainRegion = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, cells), {}, {
      isSpacer: false
    });
    if (firstIntersect.first < newMainRegion.first) {
      if (firstIntersect.isSpacer) {
        newLeadRegion.push({
          first: firstIntersect.first,
          last: newMainRegion.first - 1,
          isSpacer: true
        });
      } else {
        newMainRegion.first = firstIntersect.first;
      }
    }
    if (lastIntersect.last > newMainRegion.last) {
      if (lastIntersect.isSpacer) {
        newTailRegion.push({
          first: newMainRegion.last + 1,
          last: lastIntersect.last,
          isSpacer: true
        });
      } else {
        newMainRegion.last = lastIntersect.last;
      }
    }
    var replacementRegions = [...newLeadRegion, newMainRegion, ...newTailRegion];
    var numRegionsToDelete = lastIntersectIdx - firstIntersectIdx + 1;
    this._regions.splice(firstIntersectIdx, numRegionsToDelete, ...replacementRegions);
  }
  numCells() {
    return this._numCells;
  }
  equals(other) {
    return this._numCells === other._numCells && this._regions.length === other._regions.length && this._regions.every((region, i) => region.first === other._regions[i].first && region.last === other._regions[i].last && region.isSpacer === other._regions[i].isSpacer);
  }
  _findRegion(cellIdx) {
    var firstIdx = 0;
    var lastIdx = this._regions.length - 1;
    while (firstIdx <= lastIdx) {
      var middleIdx = Math.floor((firstIdx + lastIdx) / 2);
      var middleRegion = this._regions[middleIdx];
      if (cellIdx >= middleRegion.first && cellIdx <= middleRegion.last) {
        return [middleRegion, middleIdx];
      } else if (cellIdx < middleRegion.first) {
        lastIdx = middleIdx - 1;
      } else if (cellIdx > middleRegion.last) {
        firstIdx = middleIdx + 1;
      }
    }
    (0, _invariant.default)(false, "A region was not found containing cellIdx " + cellIdx);
  }
}
exports.CellRenderMask = CellRenderMask;