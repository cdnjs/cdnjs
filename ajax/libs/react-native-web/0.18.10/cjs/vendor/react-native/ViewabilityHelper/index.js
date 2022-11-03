/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

exports.__esModule = true;
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _createForOfIteratorHelperLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/createForOfIteratorHelperLoose"));

var _invariant = _interopRequireDefault(require("fbjs/lib/invariant"));

/**
 * A Utility class for calculating viewable items based on current metrics like scroll position and
 * layout.
 *
 * An item is said to be in a "viewable" state when any of the following
 * is true for longer than `minimumViewTime` milliseconds (after an interaction if `waitForInteraction`
 * is true):
 *
 * - Occupying >= `viewAreaCoveragePercentThreshold` of the view area XOR fraction of the item
 *   visible in the view area >= `itemVisiblePercentThreshold`.
 * - Entirely visible on screen
 */
class ViewabilityHelper {
  constructor(config) {
    if (config === void 0) {
      config = {
        viewAreaCoveragePercentThreshold: 0
      };
    }

    this._hasInteracted = false;
    this._timers = new Set();
    this._viewableIndices = [];
    this._viewableItems = new Map();
    this._config = config;
  }
  /**
   * Cleanup, e.g. on unmount. Clears any pending timers.
   */


  dispose() {
    this._timers.forEach(clearTimeout);
  }
  /**
   * Determines which items are viewable based on the current metrics and config.
   */


  computeViewableItems(itemCount, scrollOffset, viewportHeight, getFrameMetrics, renderRange // Optional optimization to reduce the scan size
  ) {
    var _this$_config = this._config,
        itemVisiblePercentThreshold = _this$_config.itemVisiblePercentThreshold,
        viewAreaCoveragePercentThreshold = _this$_config.viewAreaCoveragePercentThreshold;
    var viewAreaMode = viewAreaCoveragePercentThreshold != null;
    var viewablePercentThreshold = viewAreaMode ? viewAreaCoveragePercentThreshold : itemVisiblePercentThreshold;
    (0, _invariant.default)(viewablePercentThreshold != null && itemVisiblePercentThreshold != null !== (viewAreaCoveragePercentThreshold != null), 'Must set exactly one of itemVisiblePercentThreshold or viewAreaCoveragePercentThreshold');
    var viewableIndices = [];

    if (itemCount === 0) {
      return viewableIndices;
    }

    var firstVisible = -1;

    var _ref = renderRange || {
      first: 0,
      last: itemCount - 1
    },
        first = _ref.first,
        last = _ref.last;

    if (last >= itemCount) {
      console.warn('Invalid render range computing viewability ' + JSON.stringify({
        renderRange,
        itemCount
      }));
      return [];
    }

    for (var idx = first; idx <= last; idx++) {
      var metrics = getFrameMetrics(idx);

      if (!metrics) {
        continue;
      }

      var top = metrics.offset - scrollOffset;
      var bottom = top + metrics.length;

      if (top < viewportHeight && bottom > 0) {
        firstVisible = idx;

        if (_isViewable(viewAreaMode, viewablePercentThreshold, top, bottom, viewportHeight, metrics.length)) {
          viewableIndices.push(idx);
        }
      } else if (firstVisible >= 0) {
        break;
      }
    }

    return viewableIndices;
  }
  /**
   * Figures out which items are viewable and how that has changed from before and calls
   * `onViewableItemsChanged` as appropriate.
   */


  onUpdate(itemCount, scrollOffset, viewportHeight, getFrameMetrics, createViewToken, onViewableItemsChanged, renderRange // Optional optimization to reduce the scan size
  ) {
    if (this._config.waitForInteraction && !this._hasInteracted || itemCount === 0 || !getFrameMetrics(0)) {
      return;
    }

    var viewableIndices = [];

    if (itemCount) {
      viewableIndices = this.computeViewableItems(itemCount, scrollOffset, viewportHeight, getFrameMetrics, renderRange);
    }

    if (this._viewableIndices.length === viewableIndices.length && this._viewableIndices.every((v, ii) => v === viewableIndices[ii])) {
      // We might get a lot of scroll events where visibility doesn't change and we don't want to do
      // extra work in those cases.
      return;
    }

    this._viewableIndices = viewableIndices;

    if (this._config.minimumViewTime) {
      var handle = setTimeout(() => {
        this._timers.delete(handle);

        this._onUpdateSync(viewableIndices, onViewableItemsChanged, createViewToken);
      }, this._config.minimumViewTime);

      this._timers.add(handle);
    } else {
      this._onUpdateSync(viewableIndices, onViewableItemsChanged, createViewToken);
    }
  }
  /**
   * clean-up cached _viewableIndices to evaluate changed items on next update
   */


  resetViewableIndices() {
    this._viewableIndices = [];
  }
  /**
   * Records that an interaction has happened even if there has been no scroll.
   */


  recordInteraction() {
    this._hasInteracted = true;
  }

  _onUpdateSync( // $FlowFixMe
  viewableIndicesToCheck, // $FlowFixMe
  onViewableItemsChanged, // $FlowFixMe
  createViewToken) {
    // Filter out indices that have gone out of view since this call was scheduled.
    viewableIndicesToCheck = viewableIndicesToCheck.filter(ii => this._viewableIndices.includes(ii));
    var prevItems = this._viewableItems;
    var nextItems = new Map(viewableIndicesToCheck.map(ii => {
      var viewable = createViewToken(ii, true);
      return [viewable.key, viewable];
    }));
    var changed = [];

    for (var _iterator = (0, _createForOfIteratorHelperLoose2.default)(nextItems), _step; !(_step = _iterator()).done;) {
      var _step$value = _step.value,
          key = _step$value[0],
          viewable = _step$value[1];

      if (!prevItems.has(key)) {
        changed.push(viewable);
      }
    }

    for (var _iterator2 = (0, _createForOfIteratorHelperLoose2.default)(prevItems), _step2; !(_step2 = _iterator2()).done;) {
      var _step2$value = _step2.value,
          _key = _step2$value[0],
          _viewable = _step2$value[1];

      if (!nextItems.has(_key)) {
        changed.push((0, _objectSpread2.default)((0, _objectSpread2.default)({}, _viewable), {}, {
          isViewable: false
        }));
      }
    }

    if (changed.length > 0) {
      this._viewableItems = nextItems;
      onViewableItemsChanged({
        viewableItems: Array.from(nextItems.values()),
        changed,
        viewabilityConfig: this._config
      });
    }
  }

}

function _isViewable(viewAreaMode, viewablePercentThreshold, top, bottom, viewportHeight, itemLength) {
  if (_isEntirelyVisible(top, bottom, viewportHeight)) {
    return true;
  } else {
    var pixels = _getPixelsVisible(top, bottom, viewportHeight);

    var percent = 100 * (viewAreaMode ? pixels / viewportHeight : pixels / itemLength);
    return percent >= viewablePercentThreshold;
  }
}

function _getPixelsVisible(top, bottom, viewportHeight) {
  var visibleHeight = Math.min(bottom, viewportHeight) - Math.max(top, 0);
  return Math.max(0, visibleHeight);
}

function _isEntirelyVisible(top, bottom, viewportHeight) {
  return top >= 0 && bottom <= viewportHeight && bottom > top;
}

var _default = ViewabilityHelper;
exports.default = _default;
module.exports = exports.default;