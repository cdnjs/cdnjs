"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
exports.__esModule = true;
exports.default = void 0;
var _createForOfIteratorHelperLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/createForOfIteratorHelperLoose"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));
var _RefreshControl = _interopRequireDefault(require("../../../exports/RefreshControl"));
var _ScrollView = _interopRequireDefault(require("../../../exports/ScrollView"));
var _View = _interopRequireDefault(require("../../../exports/View"));
var _StyleSheet = _interopRequireDefault(require("../../../exports/StyleSheet"));
var _Batchinator = _interopRequireDefault(require("../Batchinator"));
var _clamp = _interopRequireDefault(require("../Utilities/clamp"));
var _infoLog = _interopRequireDefault(require("../infoLog"));
var _CellRenderMask = require("./CellRenderMask");
var _ChildListCollection = _interopRequireDefault(require("./ChildListCollection"));
var _FillRateHelper = _interopRequireDefault(require("../FillRateHelper"));
var _StateSafePureComponent = _interopRequireDefault(require("./StateSafePureComponent"));
var _ViewabilityHelper = _interopRequireDefault(require("../ViewabilityHelper"));
var _VirtualizedListCellRenderer = _interopRequireDefault(require("./VirtualizedListCellRenderer"));
var _VirtualizedListContext = require("./VirtualizedListContext.js");
var _VirtualizeUtils = require("../VirtualizeUtils");
var _invariant = _interopRequireDefault(require("fbjs/lib/invariant"));
var _nullthrows = _interopRequireDefault(require("nullthrows"));
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

var __DEV__ = process.env.NODE_ENV !== 'production';
var ON_EDGE_REACHED_EPSILON = 0.001;
var _usedIndexForKey = false;
var _keylessItemComponentName = '';
/**
 * Default Props Helper Functions
 * Use the following helper functions for default values
 */

// horizontalOrDefault(this.props.horizontal)
function horizontalOrDefault(horizontal) {
  return horizontal !== null && horizontal !== void 0 ? horizontal : false;
}

// initialNumToRenderOrDefault(this.props.initialNumToRender)
function initialNumToRenderOrDefault(initialNumToRender) {
  return initialNumToRender !== null && initialNumToRender !== void 0 ? initialNumToRender : 10;
}

// maxToRenderPerBatchOrDefault(this.props.maxToRenderPerBatch)
function maxToRenderPerBatchOrDefault(maxToRenderPerBatch) {
  return maxToRenderPerBatch !== null && maxToRenderPerBatch !== void 0 ? maxToRenderPerBatch : 10;
}

// onStartReachedThresholdOrDefault(this.props.onStartReachedThreshold)
function onStartReachedThresholdOrDefault(onStartReachedThreshold) {
  return onStartReachedThreshold !== null && onStartReachedThreshold !== void 0 ? onStartReachedThreshold : 2;
}

// onEndReachedThresholdOrDefault(this.props.onEndReachedThreshold)
function onEndReachedThresholdOrDefault(onEndReachedThreshold) {
  return onEndReachedThreshold !== null && onEndReachedThreshold !== void 0 ? onEndReachedThreshold : 2;
}

// getScrollingThreshold(visibleLength, onEndReachedThreshold)
function getScrollingThreshold(threshold, visibleLength) {
  return threshold * visibleLength / 2;
}

// scrollEventThrottleOrDefault(this.props.scrollEventThrottle)
function scrollEventThrottleOrDefault(scrollEventThrottle) {
  return scrollEventThrottle !== null && scrollEventThrottle !== void 0 ? scrollEventThrottle : 50;
}

// windowSizeOrDefault(this.props.windowSize)
function windowSizeOrDefault(windowSize) {
  return windowSize !== null && windowSize !== void 0 ? windowSize : 21;
}
function findLastWhere(arr, predicate) {
  for (var i = arr.length - 1; i >= 0; i--) {
    if (predicate(arr[i])) {
      return arr[i];
    }
  }
  return null;
}

/**
 * Base implementation for the more convenient [`<FlatList>`](https://reactnative.dev/docs/flatlist)
 * and [`<SectionList>`](https://reactnative.dev/docs/sectionlist) components, which are also better
 * documented. In general, this should only really be used if you need more flexibility than
 * `FlatList` provides, e.g. for use with immutable data instead of plain arrays.
 *
 * Virtualization massively improves memory consumption and performance of large lists by
 * maintaining a finite render window of active items and replacing all items outside of the render
 * window with appropriately sized blank space. The window adapts to scrolling behavior, and items
 * are rendered incrementally with low-pri (after any running interactions) if they are far from the
 * visible area, or with hi-pri otherwise to minimize the potential of seeing blank space.
 *
 * Some caveats:
 *
 * - Internal state is not preserved when content scrolls out of the render window. Make sure all
 *   your data is captured in the item data or external stores like Flux, Redux, or Relay.
 * - This is a `PureComponent` which means that it will not re-render if `props` remain shallow-
 *   equal. Make sure that everything your `renderItem` function depends on is passed as a prop
 *   (e.g. `extraData`) that is not `===` after updates, otherwise your UI may not update on
 *   changes. This includes the `data` prop and parent component state.
 * - In order to constrain memory and enable smooth scrolling, content is rendered asynchronously
 *   offscreen. This means it's possible to scroll faster than the fill rate ands momentarily see
 *   blank content. This is a tradeoff that can be adjusted to suit the needs of each application,
 *   and we are working on improving it behind the scenes.
 * - By default, the list looks for a `key` or `id` prop on each item and uses that for the React key.
 *   Alternatively, you can provide a custom `keyExtractor` prop.
 * - As an effort to remove defaultProps, use helper functions when referencing certain props
 *
 */
class VirtualizedList extends _StateSafePureComponent.default {
  // scrollToEnd may be janky without getItemLayout prop
  scrollToEnd(params) {
    var animated = params ? params.animated : true;
    var veryLast = this.props.getItemCount(this.props.data) - 1;
    if (veryLast < 0) {
      return;
    }
    var frame = this.__getFrameMetricsApprox(veryLast, this.props);
    var offset = Math.max(0, frame.offset + frame.length + this._footerLength - this._scrollMetrics.visibleLength);
    if (this._scrollRef == null) {
      return;
    }
    if (this._scrollRef.scrollTo == null) {
      console.warn('No scrollTo method provided. This may be because you have two nested ' + 'VirtualizedLists with the same orientation, or because you are ' + 'using a custom component that does not implement scrollTo.');
      return;
    }
    this._scrollRef.scrollTo(horizontalOrDefault(this.props.horizontal) ? {
      x: offset,
      animated
    } : {
      y: offset,
      animated
    });
  }

  // scrollToIndex may be janky without getItemLayout prop
  scrollToIndex(params) {
    var _this$props = this.props,
      data = _this$props.data,
      horizontal = _this$props.horizontal,
      getItemCount = _this$props.getItemCount,
      getItemLayout = _this$props.getItemLayout,
      onScrollToIndexFailed = _this$props.onScrollToIndexFailed;
    var animated = params.animated,
      index = params.index,
      viewOffset = params.viewOffset,
      viewPosition = params.viewPosition;
    (0, _invariant.default)(index >= 0, "scrollToIndex out of range: requested index " + index + " but minimum is 0");
    (0, _invariant.default)(getItemCount(data) >= 1, "scrollToIndex out of range: item length " + getItemCount(data) + " but minimum is 1");
    (0, _invariant.default)(index < getItemCount(data), "scrollToIndex out of range: requested index " + index + " is out of 0 to " + (getItemCount(data) - 1));
    if (!getItemLayout && index > this._highestMeasuredFrameIndex) {
      (0, _invariant.default)(!!onScrollToIndexFailed, 'scrollToIndex should be used in conjunction with getItemLayout or onScrollToIndexFailed, ' + 'otherwise there is no way to know the location of offscreen indices or handle failures.');
      onScrollToIndexFailed({
        averageItemLength: this._averageCellLength,
        highestMeasuredFrameIndex: this._highestMeasuredFrameIndex,
        index
      });
      return;
    }
    var frame = this.__getFrameMetricsApprox(Math.floor(index), this.props);
    var offset = Math.max(0, this._getOffsetApprox(index, this.props) - (viewPosition || 0) * (this._scrollMetrics.visibleLength - frame.length)) - (viewOffset || 0);
    if (this._scrollRef == null) {
      return;
    }
    if (this._scrollRef.scrollTo == null) {
      console.warn('No scrollTo method provided. This may be because you have two nested ' + 'VirtualizedLists with the same orientation, or because you are ' + 'using a custom component that does not implement scrollTo.');
      return;
    }
    this._scrollRef.scrollTo(horizontal ? {
      x: offset,
      animated
    } : {
      y: offset,
      animated
    });
  }

  // scrollToItem may be janky without getItemLayout prop. Required linear scan through items -
  // use scrollToIndex instead if possible.
  scrollToItem(params) {
    var item = params.item;
    var _this$props2 = this.props,
      data = _this$props2.data,
      getItem = _this$props2.getItem,
      getItemCount = _this$props2.getItemCount;
    var itemCount = getItemCount(data);
    for (var _index = 0; _index < itemCount; _index++) {
      if (getItem(data, _index) === item) {
        this.scrollToIndex((0, _objectSpread2.default)((0, _objectSpread2.default)({}, params), {}, {
          index: _index
        }));
        break;
      }
    }
  }

  /**
   * Scroll to a specific content pixel offset in the list.
   *
   * Param `offset` expects the offset to scroll to.
   * In case of `horizontal` is true, the offset is the x-value,
   * in any other case the offset is the y-value.
   *
   * Param `animated` (`true` by default) defines whether the list
   * should do an animation while scrolling.
   */
  scrollToOffset(params) {
    var animated = params.animated,
      offset = params.offset;
    if (this._scrollRef == null) {
      return;
    }
    if (this._scrollRef.scrollTo == null) {
      console.warn('No scrollTo method provided. This may be because you have two nested ' + 'VirtualizedLists with the same orientation, or because you are ' + 'using a custom component that does not implement scrollTo.');
      return;
    }
    this._scrollRef.scrollTo(horizontalOrDefault(this.props.horizontal) ? {
      x: offset,
      animated
    } : {
      y: offset,
      animated
    });
  }
  recordInteraction() {
    this._nestedChildLists.forEach(childList => {
      childList.recordInteraction();
    });
    this._viewabilityTuples.forEach(t => {
      t.viewabilityHelper.recordInteraction();
    });
    this._updateViewableItems(this.props, this.state.cellsAroundViewport);
  }
  flashScrollIndicators() {
    if (this._scrollRef == null) {
      return;
    }
    this._scrollRef.flashScrollIndicators();
  }

  /**
   * Provides a handle to the underlying scroll responder.
   * Note that `this._scrollRef` might not be a `ScrollView`, so we
   * need to check that it responds to `getScrollResponder` before calling it.
   */
  getScrollResponder() {
    if (this._scrollRef && this._scrollRef.getScrollResponder) {
      return this._scrollRef.getScrollResponder();
    }
  }
  getScrollableNode() {
    if (this._scrollRef && this._scrollRef.getScrollableNode) {
      return this._scrollRef.getScrollableNode();
    } else {
      return this._scrollRef;
    }
  }
  getScrollRef() {
    if (this._scrollRef && this._scrollRef.getScrollRef) {
      return this._scrollRef.getScrollRef();
    } else {
      return this._scrollRef;
    }
  }
  _getCellKey() {
    var _this$context;
    return ((_this$context = this.context) == null ? void 0 : _this$context.cellKey) || 'rootList';
  }

  // $FlowFixMe[missing-local-annot]

  hasMore() {
    return this._hasMore;
  }

  // $FlowFixMe[missing-local-annot]

  // REACT-NATIVE-WEB patch to preserve during future RN merges: Support inverted wheel scroller.

  constructor(_props) {
    var _this$props$updateCel;
    super(_props);
    this._getScrollMetrics = () => {
      return this._scrollMetrics;
    };
    this._getOutermostParentListRef = () => {
      if (this._isNestedWithSameOrientation()) {
        return this.context.getOutermostParentListRef();
      } else {
        return this;
      }
    };
    this._registerAsNestedChild = childList => {
      this._nestedChildLists.add(childList.ref, childList.cellKey);
      if (this._hasInteracted) {
        childList.ref.recordInteraction();
      }
    };
    this._unregisterAsNestedChild = childList => {
      this._nestedChildLists.remove(childList.ref);
    };
    this._onUpdateSeparators = (keys, newProps) => {
      keys.forEach(key => {
        var ref = key != null && this._cellRefs[key];
        ref && ref.updateSeparatorProps(newProps);
      });
    };
    this._getSpacerKey = isVertical => isVertical ? 'height' : 'width';
    this._averageCellLength = 0;
    this._cellRefs = {};
    this._frames = {};
    this._footerLength = 0;
    this._hasTriggeredInitialScrollToIndex = false;
    this._hasInteracted = false;
    this._hasMore = false;
    this._hasWarned = {};
    this._headerLength = 0;
    this._hiPriInProgress = false;
    this._highestMeasuredFrameIndex = 0;
    this._indicesToKeys = new Map();
    this._lastFocusedCellKey = null;
    this._nestedChildLists = new _ChildListCollection.default();
    this._offsetFromParentVirtualizedList = 0;
    this._prevParentOffset = 0;
    this._scrollMetrics = {
      contentLength: 0,
      dOffset: 0,
      dt: 10,
      offset: 0,
      timestamp: 0,
      velocity: 0,
      visibleLength: 0,
      zoomScale: 1
    };
    this._scrollRef = null;
    this._sentStartForContentLength = 0;
    this._sentEndForContentLength = 0;
    this._totalCellLength = 0;
    this._totalCellsMeasured = 0;
    this._viewabilityTuples = [];
    this._captureScrollRef = ref => {
      this._scrollRef = ref;
    };
    this._defaultRenderScrollComponent = props => {
      var onRefresh = props.onRefresh;
      if (this._isNestedWithSameOrientation()) {
        // $FlowFixMe[prop-missing] - Typing ReactNativeComponent revealed errors
        return /*#__PURE__*/React.createElement(_View.default, props);
      } else if (onRefresh) {
        var _props$refreshing;
        (0, _invariant.default)(typeof props.refreshing === 'boolean', '`refreshing` prop must be set as a boolean in order to use `onRefresh`, but got `' + JSON.stringify((_props$refreshing = props.refreshing) !== null && _props$refreshing !== void 0 ? _props$refreshing : 'undefined') + '`');
        return (
          /*#__PURE__*/
          // $FlowFixMe[prop-missing] Invalid prop usage
          // $FlowFixMe[incompatible-use]
          React.createElement(_ScrollView.default, (0, _extends2.default)({}, props, {
            refreshControl: props.refreshControl == null ? /*#__PURE__*/React.createElement(_RefreshControl.default
            // $FlowFixMe[incompatible-type]
            , {
              refreshing: props.refreshing,
              onRefresh: onRefresh,
              progressViewOffset: props.progressViewOffset
            }) : props.refreshControl
          }))
        );
      } else {
        // $FlowFixMe[prop-missing] Invalid prop usage
        // $FlowFixMe[incompatible-use]
        return /*#__PURE__*/React.createElement(_ScrollView.default, props);
      }
    };
    this._onCellLayout = (e, cellKey, index) => {
      var layout = e.nativeEvent.layout;
      var next = {
        offset: this._selectOffset(layout),
        length: this._selectLength(layout),
        index,
        inLayout: true
      };
      var curr = this._frames[cellKey];
      if (!curr || next.offset !== curr.offset || next.length !== curr.length || index !== curr.index) {
        this._totalCellLength += next.length - (curr ? curr.length : 0);
        this._totalCellsMeasured += curr ? 0 : 1;
        this._averageCellLength = this._totalCellLength / this._totalCellsMeasured;
        this._frames[cellKey] = next;
        this._highestMeasuredFrameIndex = Math.max(this._highestMeasuredFrameIndex, index);
        this._scheduleCellsToRenderUpdate();
      } else {
        this._frames[cellKey].inLayout = true;
      }
      this._triggerRemeasureForChildListsInCell(cellKey);
      this._computeBlankness();
      this._updateViewableItems(this.props, this.state.cellsAroundViewport);
    };
    this._onCellUnmount = cellKey => {
      delete this._cellRefs[cellKey];
      var curr = this._frames[cellKey];
      if (curr) {
        this._frames[cellKey] = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, curr), {}, {
          inLayout: false
        });
      }
    };
    this._onLayout = e => {
      if (this._isNestedWithSameOrientation()) {
        // Need to adjust our scroll metrics to be relative to our containing
        // VirtualizedList before we can make claims about list item viewability
        this.measureLayoutRelativeToContainingList();
      } else {
        this._scrollMetrics.visibleLength = this._selectLength(e.nativeEvent.layout);
      }
      this.props.onLayout && this.props.onLayout(e);
      this._scheduleCellsToRenderUpdate();
      this._maybeCallOnEdgeReached();
    };
    this._onLayoutEmpty = e => {
      this.props.onLayout && this.props.onLayout(e);
    };
    this._onLayoutFooter = e => {
      this._triggerRemeasureForChildListsInCell(this._getFooterCellKey());
      this._footerLength = this._selectLength(e.nativeEvent.layout);
    };
    this._onLayoutHeader = e => {
      this._headerLength = this._selectLength(e.nativeEvent.layout);
    };
    this._onContentSizeChange = (width, height) => {
      if (width > 0 && height > 0 && this.props.initialScrollIndex != null && this.props.initialScrollIndex > 0 && !this._hasTriggeredInitialScrollToIndex) {
        if (this.props.contentOffset == null) {
          if (this.props.initialScrollIndex < this.props.getItemCount(this.props.data)) {
            this.scrollToIndex({
              animated: false,
              index: (0, _nullthrows.default)(this.props.initialScrollIndex)
            });
          } else {
            this.scrollToEnd({
              animated: false
            });
          }
        }
        this._hasTriggeredInitialScrollToIndex = true;
      }
      if (this.props.onContentSizeChange) {
        this.props.onContentSizeChange(width, height);
      }
      this._scrollMetrics.contentLength = this._selectLength({
        height,
        width
      });
      this._scheduleCellsToRenderUpdate();
      this._maybeCallOnEdgeReached();
    };
    this._convertParentScrollMetrics = metrics => {
      // Offset of the top of the nested list relative to the top of its parent's viewport
      var offset = metrics.offset - this._offsetFromParentVirtualizedList;
      // Child's visible length is the same as its parent's
      var visibleLength = metrics.visibleLength;
      var dOffset = offset - this._scrollMetrics.offset;
      var contentLength = this._scrollMetrics.contentLength;
      return {
        visibleLength,
        contentLength,
        offset,
        dOffset
      };
    };
    this._onScroll = e => {
      this._nestedChildLists.forEach(childList => {
        childList._onScroll(e);
      });
      if (this.props.onScroll) {
        this.props.onScroll(e);
      }
      var timestamp = e.timeStamp;
      var visibleLength = this._selectLength(e.nativeEvent.layoutMeasurement);
      var contentLength = this._selectLength(e.nativeEvent.contentSize);
      var offset = this._selectOffset(e.nativeEvent.contentOffset);
      var dOffset = offset - this._scrollMetrics.offset;
      if (this._isNestedWithSameOrientation()) {
        if (this._scrollMetrics.contentLength === 0) {
          // Ignore scroll events until onLayout has been called and we
          // know our offset from our offset from our parent
          return;
        }
        var _this$_convertParentS = this._convertParentScrollMetrics({
          visibleLength,
          offset
        });
        visibleLength = _this$_convertParentS.visibleLength;
        contentLength = _this$_convertParentS.contentLength;
        offset = _this$_convertParentS.offset;
        dOffset = _this$_convertParentS.dOffset;
      }
      var dt = this._scrollMetrics.timestamp ? Math.max(1, timestamp - this._scrollMetrics.timestamp) : 1;
      var velocity = dOffset / dt;
      if (dt > 500 && this._scrollMetrics.dt > 500 && contentLength > 5 * visibleLength && !this._hasWarned.perf) {
        (0, _infoLog.default)('VirtualizedList: You have a large list that is slow to update - make sure your ' + 'renderItem function renders components that follow React performance best practices ' + 'like PureComponent, shouldComponentUpdate, etc.', {
          dt,
          prevDt: this._scrollMetrics.dt,
          contentLength
        });
        this._hasWarned.perf = true;
      }

      // For invalid negative values (w/ RTL), set this to 1.
      var zoomScale = e.nativeEvent.zoomScale < 0 ? 1 : e.nativeEvent.zoomScale;
      this._scrollMetrics = {
        contentLength,
        dt,
        dOffset,
        offset,
        timestamp,
        velocity,
        visibleLength,
        zoomScale
      };
      this._updateViewableItems(this.props, this.state.cellsAroundViewport);
      if (!this.props) {
        return;
      }
      this._maybeCallOnEdgeReached();
      if (velocity !== 0) {
        this._fillRateHelper.activate();
      }
      this._computeBlankness();
      this._scheduleCellsToRenderUpdate();
    };
    this._onScrollBeginDrag = e => {
      this._nestedChildLists.forEach(childList => {
        childList._onScrollBeginDrag(e);
      });
      this._viewabilityTuples.forEach(tuple => {
        tuple.viewabilityHelper.recordInteraction();
      });
      this._hasInteracted = true;
      this.props.onScrollBeginDrag && this.props.onScrollBeginDrag(e);
    };
    this._onScrollEndDrag = e => {
      this._nestedChildLists.forEach(childList => {
        childList._onScrollEndDrag(e);
      });
      var velocity = e.nativeEvent.velocity;
      if (velocity) {
        this._scrollMetrics.velocity = this._selectOffset(velocity);
      }
      this._computeBlankness();
      this.props.onScrollEndDrag && this.props.onScrollEndDrag(e);
    };
    this._onMomentumScrollBegin = e => {
      this._nestedChildLists.forEach(childList => {
        childList._onMomentumScrollBegin(e);
      });
      this.props.onMomentumScrollBegin && this.props.onMomentumScrollBegin(e);
    };
    this._onMomentumScrollEnd = e => {
      this._nestedChildLists.forEach(childList => {
        childList._onMomentumScrollEnd(e);
      });
      this._scrollMetrics.velocity = 0;
      this._computeBlankness();
      this.props.onMomentumScrollEnd && this.props.onMomentumScrollEnd(e);
    };
    this._updateCellsToRender = () => {
      this._updateViewableItems(this.props, this.state.cellsAroundViewport);
      this.setState((state, props) => {
        var cellsAroundViewport = this._adjustCellsAroundViewport(props, state.cellsAroundViewport);
        var renderMask = VirtualizedList._createRenderMask(props, cellsAroundViewport, this._getNonViewportRenderRegions(props));
        if (cellsAroundViewport.first === state.cellsAroundViewport.first && cellsAroundViewport.last === state.cellsAroundViewport.last && renderMask.equals(state.renderMask)) {
          return null;
        }
        return {
          cellsAroundViewport,
          renderMask
        };
      });
    };
    this._createViewToken = (index, isViewable, props
    // $FlowFixMe[missing-local-annot]
    ) => {
      var data = props.data,
        getItem = props.getItem;
      var item = getItem(data, index);
      return {
        index,
        item,
        key: this._keyExtractor(item, index, props),
        isViewable
      };
    };
    this._getOffsetApprox = (index, props) => {
      if (Number.isInteger(index)) {
        return this.__getFrameMetricsApprox(index, props).offset;
      } else {
        var frameMetrics = this.__getFrameMetricsApprox(Math.floor(index), props);
        var remainder = index - Math.floor(index);
        return frameMetrics.offset + remainder * frameMetrics.length;
      }
    };
    this.__getFrameMetricsApprox = (index, props) => {
      var frame = this._getFrameMetrics(index, props);
      if (frame && frame.index === index) {
        // check for invalid frames due to row re-ordering
        return frame;
      } else {
        var data = props.data,
          getItemCount = props.getItemCount,
          getItemLayout = props.getItemLayout;
        (0, _invariant.default)(index >= 0 && index < getItemCount(data), 'Tried to get frame for out of range index ' + index);
        (0, _invariant.default)(!getItemLayout, 'Should not have to estimate frames when a measurement metrics function is provided');
        return {
          length: this._averageCellLength,
          offset: this._averageCellLength * index
        };
      }
    };
    this._getFrameMetrics = (index, props) => {
      var data = props.data,
        getItem = props.getItem,
        getItemCount = props.getItemCount,
        getItemLayout = props.getItemLayout;
      (0, _invariant.default)(index >= 0 && index < getItemCount(data), 'Tried to get frame for out of range index ' + index);
      var item = getItem(data, index);
      var frame = this._frames[this._keyExtractor(item, index, props)];
      if (!frame || frame.index !== index) {
        if (getItemLayout) {
          /* $FlowFixMe[prop-missing] (>=0.63.0 site=react_native_fb) This comment
           * suppresses an error found when Flow v0.63 was deployed. To see the error
           * delete this comment and run Flow. */
          return getItemLayout(data, index);
        }
      }
      return frame;
    };
    this._getNonViewportRenderRegions = props => {
      // Keep a viewport's worth of content around the last focused cell to allow
      // random navigation around it without any blanking. E.g. tabbing from one
      // focused item out of viewport to another.
      if (!(this._lastFocusedCellKey && this._cellRefs[this._lastFocusedCellKey])) {
        return [];
      }
      var lastFocusedCellRenderer = this._cellRefs[this._lastFocusedCellKey];
      var focusedCellIndex = lastFocusedCellRenderer.props.index;
      var itemCount = props.getItemCount(props.data);

      // The last cell we rendered may be at a new index. Bail if we don't know
      // where it is.
      if (focusedCellIndex >= itemCount || this._keyExtractor(props.getItem(props.data, focusedCellIndex), focusedCellIndex, props) !== this._lastFocusedCellKey) {
        return [];
      }
      var first = focusedCellIndex;
      var heightOfCellsBeforeFocused = 0;
      for (var i = first - 1; i >= 0 && heightOfCellsBeforeFocused < this._scrollMetrics.visibleLength; i--) {
        first--;
        heightOfCellsBeforeFocused += this.__getFrameMetricsApprox(i, props).length;
      }
      var last = focusedCellIndex;
      var heightOfCellsAfterFocused = 0;
      for (var _i = last + 1; _i < itemCount && heightOfCellsAfterFocused < this._scrollMetrics.visibleLength; _i++) {
        last++;
        heightOfCellsAfterFocused += this.__getFrameMetricsApprox(_i, props).length;
      }
      return [{
        first,
        last
      }];
    };
    this._checkProps(_props);
    this._fillRateHelper = new _FillRateHelper.default(this._getFrameMetrics);
    this._updateCellsToRenderBatcher = new _Batchinator.default(this._updateCellsToRender, (_this$props$updateCel = this.props.updateCellsBatchingPeriod) !== null && _this$props$updateCel !== void 0 ? _this$props$updateCel : 50);
    if (this.props.viewabilityConfigCallbackPairs) {
      this._viewabilityTuples = this.props.viewabilityConfigCallbackPairs.map(pair => ({
        viewabilityHelper: new _ViewabilityHelper.default(pair.viewabilityConfig),
        onViewableItemsChanged: pair.onViewableItemsChanged
      }));
    } else {
      var _this$props3 = this.props,
        onViewableItemsChanged = _this$props3.onViewableItemsChanged,
        viewabilityConfig = _this$props3.viewabilityConfig;
      if (onViewableItemsChanged) {
        this._viewabilityTuples.push({
          viewabilityHelper: new _ViewabilityHelper.default(viewabilityConfig),
          onViewableItemsChanged: onViewableItemsChanged
        });
      }
    }
    var initialRenderRegion = VirtualizedList._initialRenderRegion(_props);
    this.state = {
      cellsAroundViewport: initialRenderRegion,
      renderMask: VirtualizedList._createRenderMask(_props, initialRenderRegion)
    };

    // REACT-NATIVE-WEB patch to preserve during future RN merges: Support inverted wheel scroller.
    // For issue https://github.com/necolas/react-native-web/issues/995
    this.invertedWheelEventHandler = ev => {
      var scrollOffset = this.props.horizontal ? ev.target.scrollLeft : ev.target.scrollTop;
      var scrollLength = this.props.horizontal ? ev.target.scrollWidth : ev.target.scrollHeight;
      var clientLength = this.props.horizontal ? ev.target.clientWidth : ev.target.clientHeight;
      var isEventTargetScrollable = scrollLength > clientLength;
      var delta = this.props.horizontal ? ev.deltaX || ev.wheelDeltaX : ev.deltaY || ev.wheelDeltaY;
      var leftoverDelta = delta;
      if (isEventTargetScrollable) {
        leftoverDelta = delta < 0 ? Math.min(delta + scrollOffset, 0) : Math.max(delta - (scrollLength - clientLength - scrollOffset), 0);
      }
      var targetDelta = delta - leftoverDelta;
      if (this.props.inverted && this._scrollRef && this._scrollRef.getScrollableNode) {
        var node = this._scrollRef.getScrollableNode();
        if (this.props.horizontal) {
          ev.target.scrollLeft += targetDelta;
          var nextScrollLeft = node.scrollLeft - leftoverDelta;
          node.scrollLeft = !this.props.getItemLayout ? Math.min(nextScrollLeft, this._totalCellLength) : nextScrollLeft;
        } else {
          ev.target.scrollTop += targetDelta;
          var nextScrollTop = node.scrollTop - leftoverDelta;
          node.scrollTop = !this.props.getItemLayout ? Math.min(nextScrollTop, this._totalCellLength) : nextScrollTop;
        }
        ev.preventDefault();
      }
    };
  }
  _checkProps(props) {
    var onScroll = props.onScroll,
      windowSize = props.windowSize,
      getItemCount = props.getItemCount,
      data = props.data,
      initialScrollIndex = props.initialScrollIndex;
    (0, _invariant.default)(
    // $FlowFixMe[prop-missing]
    !onScroll || !onScroll.__isNative, 'Components based on VirtualizedList must be wrapped with Animated.createAnimatedComponent ' + 'to support native onScroll events with useNativeDriver');
    (0, _invariant.default)(windowSizeOrDefault(windowSize) > 0, 'VirtualizedList: The windowSize prop must be present and set to a value greater than 0.');
    (0, _invariant.default)(getItemCount, 'VirtualizedList: The "getItemCount" prop must be provided');
    var itemCount = getItemCount(data);
    if (initialScrollIndex != null && !this._hasTriggeredInitialScrollToIndex && (initialScrollIndex < 0 || itemCount > 0 && initialScrollIndex >= itemCount) && !this._hasWarned.initialScrollIndex) {
      console.warn("initialScrollIndex \"" + initialScrollIndex + "\" is not valid (list has " + itemCount + " items)");
      this._hasWarned.initialScrollIndex = true;
    }
    if (__DEV__ && !this._hasWarned.flexWrap) {
      // $FlowFixMe[underconstrained-implicit-instantiation]
      var flatStyles = _StyleSheet.default.flatten(this.props.contentContainerStyle);
      if (flatStyles != null && flatStyles.flexWrap === 'wrap') {
        console.warn('`flexWrap: `wrap`` is not supported with the `VirtualizedList` components.' + 'Consider using `numColumns` with `FlatList` instead.');
        this._hasWarned.flexWrap = true;
      }
    }
  }
  static _createRenderMask(props, cellsAroundViewport, additionalRegions) {
    var itemCount = props.getItemCount(props.data);
    (0, _invariant.default)(cellsAroundViewport.first >= 0 && cellsAroundViewport.last >= cellsAroundViewport.first - 1 && cellsAroundViewport.last < itemCount, "Invalid cells around viewport \"[" + cellsAroundViewport.first + ", " + cellsAroundViewport.last + "]\" was passed to VirtualizedList._createRenderMask");
    var renderMask = new _CellRenderMask.CellRenderMask(itemCount);
    if (itemCount > 0) {
      var allRegions = [cellsAroundViewport, ...(additionalRegions !== null && additionalRegions !== void 0 ? additionalRegions : [])];
      for (var _i2 = 0, _allRegions = allRegions; _i2 < _allRegions.length; _i2++) {
        var region = _allRegions[_i2];
        renderMask.addCells(region);
      }

      // The initially rendered cells are retained as part of the
      // "scroll-to-top" optimization
      if (props.initialScrollIndex == null || props.initialScrollIndex <= 0) {
        var initialRegion = VirtualizedList._initialRenderRegion(props);
        renderMask.addCells(initialRegion);
      }

      // The layout coordinates of sticker headers may be off-screen while the
      // actual header is on-screen. Keep the most recent before the viewport
      // rendered, even if its layout coordinates are not in viewport.
      var stickyIndicesSet = new Set(props.stickyHeaderIndices);
      VirtualizedList._ensureClosestStickyHeader(props, stickyIndicesSet, renderMask, cellsAroundViewport.first);
    }
    return renderMask;
  }
  static _initialRenderRegion(props) {
    var _props$initialScrollI;
    var itemCount = props.getItemCount(props.data);
    var firstCellIndex = Math.max(0, Math.min(itemCount - 1, Math.floor((_props$initialScrollI = props.initialScrollIndex) !== null && _props$initialScrollI !== void 0 ? _props$initialScrollI : 0)));
    var lastCellIndex = Math.min(itemCount, firstCellIndex + initialNumToRenderOrDefault(props.initialNumToRender)) - 1;
    return {
      first: firstCellIndex,
      last: lastCellIndex
    };
  }
  static _ensureClosestStickyHeader(props, stickyIndicesSet, renderMask, cellIdx) {
    var stickyOffset = props.ListHeaderComponent ? 1 : 0;
    for (var itemIdx = cellIdx - 1; itemIdx >= 0; itemIdx--) {
      if (stickyIndicesSet.has(itemIdx + stickyOffset)) {
        renderMask.addCells({
          first: itemIdx,
          last: itemIdx
        });
        break;
      }
    }
  }
  _adjustCellsAroundViewport(props, cellsAroundViewport) {
    var data = props.data,
      getItemCount = props.getItemCount;
    var onEndReachedThreshold = onEndReachedThresholdOrDefault(props.onEndReachedThreshold);
    var _this$_scrollMetrics = this._scrollMetrics,
      contentLength = _this$_scrollMetrics.contentLength,
      offset = _this$_scrollMetrics.offset,
      visibleLength = _this$_scrollMetrics.visibleLength;
    var distanceFromEnd = contentLength - visibleLength - offset;

    // Wait until the scroll view metrics have been set up. And until then,
    // we will trust the initialNumToRender suggestion
    if (visibleLength <= 0 || contentLength <= 0) {
      return cellsAroundViewport.last >= getItemCount(data) ? VirtualizedList._constrainToItemCount(cellsAroundViewport, props) : cellsAroundViewport;
    }
    var newCellsAroundViewport;
    if (props.disableVirtualization) {
      var renderAhead = distanceFromEnd < onEndReachedThreshold * visibleLength ? maxToRenderPerBatchOrDefault(props.maxToRenderPerBatch) : 0;
      newCellsAroundViewport = {
        first: 0,
        last: Math.min(cellsAroundViewport.last + renderAhead, getItemCount(data) - 1)
      };
    } else {
      // If we have a non-zero initialScrollIndex and run this before we've scrolled,
      // we'll wipe out the initialNumToRender rendered elements starting at initialScrollIndex.
      // So let's wait until we've scrolled the view to the right place. And until then,
      // we will trust the initialScrollIndex suggestion.

      // Thus, we want to recalculate the windowed render limits if any of the following hold:
      // - initialScrollIndex is undefined or is 0
      // - initialScrollIndex > 0 AND scrolling is complete
      // - initialScrollIndex > 0 AND the end of the list is visible (this handles the case
      //   where the list is shorter than the visible area)
      if (props.initialScrollIndex && !this._scrollMetrics.offset && Math.abs(distanceFromEnd) >= Number.EPSILON) {
        return cellsAroundViewport.last >= getItemCount(data) ? VirtualizedList._constrainToItemCount(cellsAroundViewport, props) : cellsAroundViewport;
      }
      newCellsAroundViewport = (0, _VirtualizeUtils.computeWindowedRenderLimits)(props, maxToRenderPerBatchOrDefault(props.maxToRenderPerBatch), windowSizeOrDefault(props.windowSize), cellsAroundViewport, this.__getFrameMetricsApprox, this._scrollMetrics);
      (0, _invariant.default)(newCellsAroundViewport.last < getItemCount(data), 'computeWindowedRenderLimits() should return range in-bounds');
    }
    if (this._nestedChildLists.size() > 0) {
      // If some cell in the new state has a child list in it, we should only render
      // up through that item, so that we give that list a chance to render.
      // Otherwise there's churn from multiple child lists mounting and un-mounting
      // their items.

      // Will this prevent rendering if the nested list doesn't realize the end?
      var childIdx = this._findFirstChildWithMore(newCellsAroundViewport.first, newCellsAroundViewport.last);
      newCellsAroundViewport.last = childIdx !== null && childIdx !== void 0 ? childIdx : newCellsAroundViewport.last;
    }
    return newCellsAroundViewport;
  }
  _findFirstChildWithMore(first, last) {
    for (var ii = first; ii <= last; ii++) {
      var cellKeyForIndex = this._indicesToKeys.get(ii);
      if (cellKeyForIndex != null && this._nestedChildLists.anyInCell(cellKeyForIndex, childList => childList.hasMore())) {
        return ii;
      }
    }
    return null;
  }
  componentDidMount() {
    if (this._isNestedWithSameOrientation()) {
      this.context.registerAsNestedChild({
        ref: this,
        cellKey: this.context.cellKey
      });
    }

    // REACT-NATIVE-WEB patch to preserve during future RN merges: Support inverted wheel scroller.
    this.setupWebWheelHandler();
  }
  componentWillUnmount() {
    if (this._isNestedWithSameOrientation()) {
      this.context.unregisterAsNestedChild({
        ref: this
      });
    }
    this._updateCellsToRenderBatcher.dispose({
      abort: true
    });
    this._viewabilityTuples.forEach(tuple => {
      tuple.viewabilityHelper.dispose();
    });
    this._fillRateHelper.deactivateAndFlush();

    // REACT-NATIVE-WEB patch to preserve during future RN merges: Support inverted wheel scroller.
    this.teardownWebWheelHandler();
  }

  // REACT-NATIVE-WEB patch to preserve during future RN merges: Support inverted wheel scroller.
  setupWebWheelHandler() {
    if (this._scrollRef && this._scrollRef.getScrollableNode) {
      this._scrollRef.getScrollableNode().addEventListener('wheel', this.invertedWheelEventHandler);
    } else {
      setTimeout(() => this.setupWebWheelHandler(), 50);
      return;
    }
  }

  // REACT-NATIVE-WEB patch to preserve during future RN merges: Support inverted wheel scroller.
  teardownWebWheelHandler() {
    if (this._scrollRef && this._scrollRef.getScrollableNode) {
      this._scrollRef.getScrollableNode().removeEventListener('wheel', this.invertedWheelEventHandler);
    }
  }
  static getDerivedStateFromProps(newProps, prevState) {
    // first and last could be stale (e.g. if a new, shorter items props is passed in), so we make
    // sure we're rendering a reasonable range here.
    var itemCount = newProps.getItemCount(newProps.data);
    if (itemCount === prevState.renderMask.numCells()) {
      return prevState;
    }
    var constrainedCells = VirtualizedList._constrainToItemCount(prevState.cellsAroundViewport, newProps);
    return {
      cellsAroundViewport: constrainedCells,
      renderMask: VirtualizedList._createRenderMask(newProps, constrainedCells)
    };
  }
  _pushCells(cells, stickyHeaderIndices, stickyIndicesFromProps, first, last, inversionStyle) {
    var _this = this;
    var _this$props4 = this.props,
      CellRendererComponent = _this$props4.CellRendererComponent,
      ItemSeparatorComponent = _this$props4.ItemSeparatorComponent,
      ListHeaderComponent = _this$props4.ListHeaderComponent,
      ListItemComponent = _this$props4.ListItemComponent,
      data = _this$props4.data,
      debug = _this$props4.debug,
      getItem = _this$props4.getItem,
      getItemCount = _this$props4.getItemCount,
      getItemLayout = _this$props4.getItemLayout,
      horizontal = _this$props4.horizontal,
      renderItem = _this$props4.renderItem;
    var stickyOffset = ListHeaderComponent ? 1 : 0;
    var end = getItemCount(data) - 1;
    var prevCellKey;
    last = Math.min(end, last);
    var _loop = function _loop() {
      var item = getItem(data, ii);
      var key = _this._keyExtractor(item, ii, _this.props);
      _this._indicesToKeys.set(ii, key);
      if (stickyIndicesFromProps.has(ii + stickyOffset)) {
        stickyHeaderIndices.push(cells.length);
      }
      var shouldListenForLayout = getItemLayout == null || debug || _this._fillRateHelper.enabled();
      cells.push(/*#__PURE__*/React.createElement(_VirtualizedListCellRenderer.default, (0, _extends2.default)({
        CellRendererComponent: CellRendererComponent,
        ItemSeparatorComponent: ii < end ? ItemSeparatorComponent : undefined,
        ListItemComponent: ListItemComponent,
        cellKey: key,
        horizontal: horizontal,
        index: ii,
        inversionStyle: inversionStyle,
        item: item,
        key: key,
        prevCellKey: prevCellKey,
        onUpdateSeparators: _this._onUpdateSeparators,
        onCellFocusCapture: e => _this._onCellFocusCapture(key),
        onUnmount: _this._onCellUnmount,
        ref: _ref => {
          _this._cellRefs[key] = _ref;
        },
        renderItem: renderItem
      }, shouldListenForLayout && {
        onCellLayout: _this._onCellLayout
      })));
      prevCellKey = key;
    };
    for (var ii = first; ii <= last; ii++) {
      _loop();
    }
  }
  static _constrainToItemCount(cells, props) {
    var itemCount = props.getItemCount(props.data);
    var last = Math.min(itemCount - 1, cells.last);
    var maxToRenderPerBatch = maxToRenderPerBatchOrDefault(props.maxToRenderPerBatch);
    return {
      first: (0, _clamp.default)(0, itemCount - 1 - maxToRenderPerBatch, cells.first),
      last
    };
  }
  _isNestedWithSameOrientation() {
    var nestedContext = this.context;
    return !!(nestedContext && !!nestedContext.horizontal === horizontalOrDefault(this.props.horizontal));
  }
  _keyExtractor(item, index, props
  // $FlowFixMe[missing-local-annot]
  ) {
    if (props.keyExtractor != null) {
      return props.keyExtractor(item, index);
    }
    var key = (0, _VirtualizeUtils.keyExtractor)(item, index);
    if (key === String(index)) {
      _usedIndexForKey = true;
      if (item.type && item.type.displayName) {
        _keylessItemComponentName = item.type.displayName;
      }
    }
    return key;
  }
  render() {
    this._checkProps(this.props);
    var _this$props5 = this.props,
      ListEmptyComponent = _this$props5.ListEmptyComponent,
      ListFooterComponent = _this$props5.ListFooterComponent,
      ListHeaderComponent = _this$props5.ListHeaderComponent;
    var _this$props6 = this.props,
      data = _this$props6.data,
      horizontal = _this$props6.horizontal;
    var inversionStyle = this.props.inverted ? horizontalOrDefault(this.props.horizontal) ? styles.horizontallyInverted : styles.verticallyInverted : null;
    var cells = [];
    var stickyIndicesFromProps = new Set(this.props.stickyHeaderIndices);
    var stickyHeaderIndices = [];

    // 1. Add cell for ListHeaderComponent
    if (ListHeaderComponent) {
      if (stickyIndicesFromProps.has(0)) {
        stickyHeaderIndices.push(0);
      }
      var _element = /*#__PURE__*/React.isValidElement(ListHeaderComponent) ? ListHeaderComponent :
      /*#__PURE__*/
      // $FlowFixMe[not-a-component]
      // $FlowFixMe[incompatible-type-arg]
      React.createElement(ListHeaderComponent, null);
      cells.push(/*#__PURE__*/React.createElement(_VirtualizedListContext.VirtualizedListCellContextProvider, {
        cellKey: this._getCellKey() + '-header',
        key: "$header"
      }, /*#__PURE__*/React.createElement(_View.default, {
        onLayout: this._onLayoutHeader,
        style: [inversionStyle, this.props.ListHeaderComponentStyle]
      },
      // $FlowFixMe[incompatible-type] - Typing ReactNativeComponent revealed errors
      _element)));
    }

    // 2a. Add a cell for ListEmptyComponent if applicable
    var itemCount = this.props.getItemCount(data);
    if (itemCount === 0 && ListEmptyComponent) {
      var _element2 = /*#__PURE__*/React.isValidElement(ListEmptyComponent) ? ListEmptyComponent :
      /*#__PURE__*/
      // $FlowFixMe[not-a-component]
      // $FlowFixMe[incompatible-type-arg]
      React.createElement(ListEmptyComponent, null);
      cells.push(/*#__PURE__*/React.createElement(_VirtualizedListContext.VirtualizedListCellContextProvider, {
        cellKey: this._getCellKey() + '-empty',
        key: "$empty"
      }, /*#__PURE__*/React.cloneElement(_element2, {
        onLayout: event => {
          this._onLayoutEmpty(event);
          if (_element2.props.onLayout) {
            _element2.props.onLayout(event);
          }
        },
        style: [inversionStyle, _element2.props.style]
      })));
    }

    // 2b. Add cells and spacers for each item
    if (itemCount > 0) {
      _usedIndexForKey = false;
      _keylessItemComponentName = '';
      var spacerKey = this._getSpacerKey(!horizontal);
      var renderRegions = this.state.renderMask.enumerateRegions();
      var lastSpacer = findLastWhere(renderRegions, r => r.isSpacer);
      for (var _iterator = (0, _createForOfIteratorHelperLoose2.default)(renderRegions), _step; !(_step = _iterator()).done;) {
        var section = _step.value;
        if (section.isSpacer) {
          // Legacy behavior is to avoid spacers when virtualization is
          // disabled (including head spacers on initial render).
          if (this.props.disableVirtualization) {
            continue;
          }

          // Without getItemLayout, we limit our tail spacer to the _highestMeasuredFrameIndex to
          // prevent the user for hyperscrolling into un-measured area because otherwise content will
          // likely jump around as it renders in above the viewport.
          var isLastSpacer = section === lastSpacer;
          var constrainToMeasured = isLastSpacer && !this.props.getItemLayout;
          var last = constrainToMeasured ? (0, _clamp.default)(section.first - 1, section.last, this._highestMeasuredFrameIndex) : section.last;
          var firstMetrics = this.__getFrameMetricsApprox(section.first, this.props);
          var lastMetrics = this.__getFrameMetricsApprox(last, this.props);
          var spacerSize = lastMetrics.offset + lastMetrics.length - firstMetrics.offset;
          cells.push(/*#__PURE__*/React.createElement(_View.default, {
            key: "$spacer-" + section.first,
            style: {
              [spacerKey]: spacerSize
            }
          }));
        } else {
          this._pushCells(cells, stickyHeaderIndices, stickyIndicesFromProps, section.first, section.last, inversionStyle);
        }
      }
      if (!this._hasWarned.keys && _usedIndexForKey) {
        console.warn('VirtualizedList: missing keys for items, make sure to specify a key or id property on each ' + 'item or provide a custom keyExtractor.', _keylessItemComponentName);
        this._hasWarned.keys = true;
      }
    }

    // 3. Add cell for ListFooterComponent
    if (ListFooterComponent) {
      var _element3 = /*#__PURE__*/React.isValidElement(ListFooterComponent) ? ListFooterComponent :
      /*#__PURE__*/
      // $FlowFixMe[not-a-component]
      // $FlowFixMe[incompatible-type-arg]
      React.createElement(ListFooterComponent, null);
      cells.push(/*#__PURE__*/React.createElement(_VirtualizedListContext.VirtualizedListCellContextProvider, {
        cellKey: this._getFooterCellKey(),
        key: "$footer"
      }, /*#__PURE__*/React.createElement(_View.default, {
        onLayout: this._onLayoutFooter,
        style: [inversionStyle, this.props.ListFooterComponentStyle]
      },
      // $FlowFixMe[incompatible-type] - Typing ReactNativeComponent revealed errors
      _element3)));
    }

    // 4. Render the ScrollView
    var scrollProps = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, this.props), {}, {
      onContentSizeChange: this._onContentSizeChange,
      onLayout: this._onLayout,
      onScroll: this._onScroll,
      onScrollBeginDrag: this._onScrollBeginDrag,
      onScrollEndDrag: this._onScrollEndDrag,
      onMomentumScrollBegin: this._onMomentumScrollBegin,
      onMomentumScrollEnd: this._onMomentumScrollEnd,
      scrollEventThrottle: scrollEventThrottleOrDefault(this.props.scrollEventThrottle),
      // TODO: Android support
      invertStickyHeaders: this.props.invertStickyHeaders !== undefined ? this.props.invertStickyHeaders : this.props.inverted,
      stickyHeaderIndices,
      style: inversionStyle ? [inversionStyle, this.props.style] : this.props.style
    });
    this._hasMore = this.state.cellsAroundViewport.last < itemCount - 1;
    var innerRet = /*#__PURE__*/React.createElement(_VirtualizedListContext.VirtualizedListContextProvider, {
      value: {
        cellKey: null,
        getScrollMetrics: this._getScrollMetrics,
        horizontal: horizontalOrDefault(this.props.horizontal),
        getOutermostParentListRef: this._getOutermostParentListRef,
        registerAsNestedChild: this._registerAsNestedChild,
        unregisterAsNestedChild: this._unregisterAsNestedChild
      }
    }, /*#__PURE__*/React.cloneElement((this.props.renderScrollComponent || this._defaultRenderScrollComponent)(scrollProps), {
      ref: this._captureScrollRef
    }, cells));
    var ret = innerRet;
    /* https://github.com/necolas/react-native-web/issues/2239: Re-enable when ScrollView.Context.Consumer is available.
    if (__DEV__) {
      ret = (
        <ScrollView.Context.Consumer>
          {scrollContext => {
            if (
              scrollContext != null &&
              !scrollContext.horizontal ===
                !horizontalOrDefault(this.props.horizontal) &&
              !this._hasWarned.nesting &&
              this.context == null &&
              this.props.scrollEnabled !== false
            ) {
              // TODO (T46547044): use React.warn once 16.9 is sync'd: https://github.com/facebook/react/pull/15170
              console.error(
                'VirtualizedLists should never be nested inside plain ScrollViews with the same ' +
                  'orientation because it can break windowing and other functionality - use another ' +
                  'VirtualizedList-backed container instead.',
              );
              this._hasWarned.nesting = true;
            }
            return innerRet;
          }}
        </ScrollView.Context.Consumer>
      );
    }*/
    if (this.props.debug) {
      return /*#__PURE__*/React.createElement(_View.default, {
        style: styles.debug
      }, ret, this._renderDebugOverlay());
    } else {
      return ret;
    }
  }
  componentDidUpdate(prevProps) {
    var _this$props7 = this.props,
      data = _this$props7.data,
      extraData = _this$props7.extraData;
    if (data !== prevProps.data || extraData !== prevProps.extraData) {
      // clear the viewableIndices cache to also trigger
      // the onViewableItemsChanged callback with the new data
      this._viewabilityTuples.forEach(tuple => {
        tuple.viewabilityHelper.resetViewableIndices();
      });
    }
    // The `this._hiPriInProgress` is guaranteeing a hiPri cell update will only happen
    // once per fiber update. The `_scheduleCellsToRenderUpdate` will set it to true
    // if a hiPri update needs to perform. If `componentDidUpdate` is triggered with
    // `this._hiPriInProgress=true`, means it's triggered by the hiPri update. The
    // `_scheduleCellsToRenderUpdate` will check this condition and not perform
    // another hiPri update.
    var hiPriInProgress = this._hiPriInProgress;
    this._scheduleCellsToRenderUpdate();
    // Make sure setting `this._hiPriInProgress` back to false after `componentDidUpdate`
    // is triggered with `this._hiPriInProgress = true`
    if (hiPriInProgress) {
      this._hiPriInProgress = false;
    }
  }

  // Used for preventing scrollToIndex from being called multiple times for initialScrollIndex

  // flag to prevent infinite hiPri cell limit update

  // $FlowFixMe[missing-local-annot]

  /* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
   * LTI update could not be added via codemod */

  _computeBlankness() {
    this._fillRateHelper.computeBlankness(this.props, this.state.cellsAroundViewport, this._scrollMetrics);
  }

  /* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
   * LTI update could not be added via codemod */

  _onCellFocusCapture(cellKey) {
    this._lastFocusedCellKey = cellKey;
    this._updateCellsToRender();
  }
  _triggerRemeasureForChildListsInCell(cellKey) {
    this._nestedChildLists.forEachInCell(cellKey, childList => {
      childList.measureLayoutRelativeToContainingList();
    });
  }
  measureLayoutRelativeToContainingList() {
    // TODO (T35574538): findNodeHandle sometimes crashes with "Unable to find
    // node on an unmounted component" during scrolling
    try {
      if (!this._scrollRef) {
        return;
      }
      // We are assuming that getOutermostParentListRef().getScrollRef()
      // is a non-null reference to a ScrollView
      this._scrollRef.measureLayout(this.context.getOutermostParentListRef().getScrollRef(), (x, y, width, height) => {
        this._offsetFromParentVirtualizedList = this._selectOffset({
          x,
          y
        });
        this._scrollMetrics.contentLength = this._selectLength({
          width,
          height
        });
        var scrollMetrics = this._convertParentScrollMetrics(this.context.getScrollMetrics());
        var metricsChanged = this._scrollMetrics.visibleLength !== scrollMetrics.visibleLength || this._scrollMetrics.offset !== scrollMetrics.offset;
        if (metricsChanged) {
          this._scrollMetrics.visibleLength = scrollMetrics.visibleLength;
          this._scrollMetrics.offset = scrollMetrics.offset;

          // If metrics of the scrollView changed, then we triggered remeasure for child list
          // to ensure VirtualizedList has the right information.
          this._nestedChildLists.forEach(childList => {
            childList.measureLayoutRelativeToContainingList();
          });
        }
      }, error => {
        console.warn("VirtualizedList: Encountered an error while measuring a list's" + ' offset from its containing VirtualizedList.');
      });
    } catch (error) {
      console.warn('measureLayoutRelativeToContainingList threw an error', error.stack);
    }
  }
  _getFooterCellKey() {
    return this._getCellKey() + '-footer';
  }
  // $FlowFixMe[missing-local-annot]
  _renderDebugOverlay() {
    var normalize = this._scrollMetrics.visibleLength / (this._scrollMetrics.contentLength || 1);
    var framesInLayout = [];
    var itemCount = this.props.getItemCount(this.props.data);
    for (var ii = 0; ii < itemCount; ii++) {
      var frame = this.__getFrameMetricsApprox(ii, this.props);
      /* $FlowFixMe[prop-missing] (>=0.68.0 site=react_native_fb) This comment
       * suppresses an error found when Flow v0.68 was deployed. To see the
       * error delete this comment and run Flow. */
      if (frame.inLayout) {
        framesInLayout.push(frame);
      }
    }
    var windowTop = this.__getFrameMetricsApprox(this.state.cellsAroundViewport.first, this.props).offset;
    var frameLast = this.__getFrameMetricsApprox(this.state.cellsAroundViewport.last, this.props);
    var windowLen = frameLast.offset + frameLast.length - windowTop;
    var visTop = this._scrollMetrics.offset;
    var visLen = this._scrollMetrics.visibleLength;
    return /*#__PURE__*/React.createElement(_View.default, {
      style: [styles.debugOverlayBase, styles.debugOverlay]
    }, framesInLayout.map((f, ii) => /*#__PURE__*/React.createElement(_View.default, {
      key: 'f' + ii,
      style: [styles.debugOverlayBase, styles.debugOverlayFrame, {
        top: f.offset * normalize,
        height: f.length * normalize
      }]
    })), /*#__PURE__*/React.createElement(_View.default, {
      style: [styles.debugOverlayBase, styles.debugOverlayFrameLast, {
        top: windowTop * normalize,
        height: windowLen * normalize
      }]
    }), /*#__PURE__*/React.createElement(_View.default, {
      style: [styles.debugOverlayBase, styles.debugOverlayFrameVis, {
        top: visTop * normalize,
        height: visLen * normalize
      }]
    }));
  }
  _selectLength(metrics) {
    return !horizontalOrDefault(this.props.horizontal) ? metrics.height : metrics.width;
  }
  _selectOffset(metrics) {
    return !horizontalOrDefault(this.props.horizontal) ? metrics.y : metrics.x;
  }
  _maybeCallOnEdgeReached() {
    var _this$props8 = this.props,
      data = _this$props8.data,
      getItemCount = _this$props8.getItemCount,
      onStartReached = _this$props8.onStartReached,
      onStartReachedThreshold = _this$props8.onStartReachedThreshold,
      onEndReached = _this$props8.onEndReached,
      onEndReachedThreshold = _this$props8.onEndReachedThreshold,
      initialScrollIndex = _this$props8.initialScrollIndex;
    var _this$_scrollMetrics2 = this._scrollMetrics,
      contentLength = _this$_scrollMetrics2.contentLength,
      visibleLength = _this$_scrollMetrics2.visibleLength,
      offset = _this$_scrollMetrics2.offset;
    var distanceFromStart = offset;
    var distanceFromEnd = contentLength - visibleLength - offset;

    // Especially when oERT is zero it's necessary to 'floor' very small distance values to be 0
    // since debouncing causes us to not fire this event for every single "pixel" we scroll and can thus
    // be at the edge of the list with a distance approximating 0 but not quite there.
    if (distanceFromStart < ON_EDGE_REACHED_EPSILON) {
      distanceFromStart = 0;
    }
    if (distanceFromEnd < ON_EDGE_REACHED_EPSILON) {
      distanceFromEnd = 0;
    }

    // TODO: T121172172 Look into why we're "defaulting" to a threshold of 2px
    // when oERT is not present (different from 2 viewports used elsewhere)
    var DEFAULT_THRESHOLD_PX = 2;
    var startThreshold = onStartReachedThreshold != null ? onStartReachedThreshold * visibleLength : DEFAULT_THRESHOLD_PX;
    var endThreshold = onEndReachedThreshold != null ? onEndReachedThreshold * visibleLength : DEFAULT_THRESHOLD_PX;
    var isWithinStartThreshold = distanceFromStart <= startThreshold;
    var isWithinEndThreshold = distanceFromEnd <= endThreshold;

    // First check if the user just scrolled within the end threshold
    // and call onEndReached only once for a given content length,
    // and only if onStartReached is not being executed
    if (onEndReached && this.state.cellsAroundViewport.last === getItemCount(data) - 1 && isWithinEndThreshold && this._scrollMetrics.contentLength !== this._sentEndForContentLength) {
      this._sentEndForContentLength = this._scrollMetrics.contentLength;
      onEndReached({
        distanceFromEnd
      });
    }

    // Next check if the user just scrolled within the start threshold
    // and call onStartReached only once for a given content length,
    // and only if onEndReached is not being executed
    else if (onStartReached != null && this.state.cellsAroundViewport.first === 0 && isWithinStartThreshold && this._scrollMetrics.contentLength !== this._sentStartForContentLength) {
      // On initial mount when using initialScrollIndex the offset will be 0 initially
      // and will trigger an unexpected onStartReached. To avoid this we can use
      // timestamp to differentiate between the initial scroll metrics and when we actually
      // received the first scroll event.
      if (!initialScrollIndex || this._scrollMetrics.timestamp !== 0) {
        this._sentStartForContentLength = this._scrollMetrics.contentLength;
        onStartReached({
          distanceFromStart
        });
      }
    }

    // If the user scrolls away from the start or end and back again,
    // cause onStartReached or onEndReached to be triggered again
    else {
      this._sentStartForContentLength = isWithinStartThreshold ? this._sentStartForContentLength : 0;
      this._sentEndForContentLength = isWithinEndThreshold ? this._sentEndForContentLength : 0;
    }
  }

  /* Translates metrics from a scroll event in a parent VirtualizedList into
   * coordinates relative to the child list.
   */

  _scheduleCellsToRenderUpdate() {
    var _this$state$cellsArou = this.state.cellsAroundViewport,
      first = _this$state$cellsArou.first,
      last = _this$state$cellsArou.last;
    var _this$_scrollMetrics3 = this._scrollMetrics,
      offset = _this$_scrollMetrics3.offset,
      visibleLength = _this$_scrollMetrics3.visibleLength,
      velocity = _this$_scrollMetrics3.velocity;
    var itemCount = this.props.getItemCount(this.props.data);
    var hiPri = false;
    var onStartReachedThreshold = onStartReachedThresholdOrDefault(this.props.onStartReachedThreshold);
    var onEndReachedThreshold = onEndReachedThresholdOrDefault(this.props.onEndReachedThreshold);
    // Mark as high priority if we're close to the start of the first item
    // But only if there are items before the first rendered item
    if (first > 0) {
      var distTop = offset - this.__getFrameMetricsApprox(first, this.props).offset;
      hiPri = distTop < 0 || velocity < -2 && distTop < getScrollingThreshold(onStartReachedThreshold, visibleLength);
    }
    // Mark as high priority if we're close to the end of the last item
    // But only if there are items after the last rendered item
    if (!hiPri && last >= 0 && last < itemCount - 1) {
      var distBottom = this.__getFrameMetricsApprox(last, this.props).offset - (offset + visibleLength);
      hiPri = distBottom < 0 || velocity > 2 && distBottom < getScrollingThreshold(onEndReachedThreshold, visibleLength);
    }
    // Only trigger high-priority updates if we've actually rendered cells,
    // and with that size estimate, accurately compute how many cells we should render.
    // Otherwise, it would just render as many cells as it can (of zero dimension),
    // each time through attempting to render more (limited by maxToRenderPerBatch),
    // starving the renderer from actually laying out the objects and computing _averageCellLength.
    // If this is triggered in an `componentDidUpdate` followed by a hiPri cellToRenderUpdate
    // We shouldn't do another hipri cellToRenderUpdate
    if (hiPri && (this._averageCellLength || this.props.getItemLayout) && !this._hiPriInProgress) {
      this._hiPriInProgress = true;
      // Don't worry about interactions when scrolling quickly; focus on filling content as fast
      // as possible.
      this._updateCellsToRenderBatcher.dispose({
        abort: true
      });
      this._updateCellsToRender();
      return;
    } else {
      this._updateCellsToRenderBatcher.schedule();
    }
  }

  /**
   * Gets an approximate offset to an item at a given index. Supports
   * fractional indices.
   */

  _updateViewableItems(props, cellsAroundViewport) {
    this._viewabilityTuples.forEach(tuple => {
      tuple.viewabilityHelper.onUpdate(props, this._scrollMetrics.offset, this._scrollMetrics.visibleLength, this._getFrameMetrics, this._createViewToken, tuple.onViewableItemsChanged, cellsAroundViewport);
    });
  }
}
VirtualizedList.contextType = _VirtualizedListContext.VirtualizedListContext;
var styles = _StyleSheet.default.create({
  verticallyInverted: {
    transform: 'scaleY(-1)'
  },
  horizontallyInverted: {
    transform: 'scaleX(-1)'
  },
  debug: {
    flex: 1
  },
  debugOverlayBase: {
    position: 'absolute',
    top: 0,
    right: 0
  },
  debugOverlay: {
    bottom: 0,
    width: 20,
    borderColor: 'blue',
    borderWidth: 1
  },
  debugOverlayFrame: {
    left: 0,
    backgroundColor: 'orange'
  },
  debugOverlayFrameLast: {
    left: 0,
    borderColor: 'green',
    borderWidth: 2
  },
  debugOverlayFrameVis: {
    left: 0,
    borderColor: 'red',
    borderWidth: 2
  }
});
var _default = exports.default = VirtualizedList;
module.exports = exports.default;