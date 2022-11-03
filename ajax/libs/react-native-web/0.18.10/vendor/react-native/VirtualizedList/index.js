import _createForOfIteratorHelperLoose from "@babel/runtime/helpers/createForOfIteratorHelperLoose";
import _extends from "@babel/runtime/helpers/extends";
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
import Batchinator from '../Batchinator';
import FillRateHelper from '../FillRateHelper';
import findNodeHandle from '../../../exports/findNodeHandle';
import RefreshControl from '../../../exports/RefreshControl';
import ScrollView from '../../../exports/ScrollView';
import StyleSheet from '../../../exports/StyleSheet';
import View from '../../../exports/View';
import ViewabilityHelper from '../ViewabilityHelper';
var flattenStyle = StyleSheet.flatten;
import infoLog from '../infoLog';
import invariant from 'fbjs/lib/invariant';
import { keyExtractor as defaultKeyExtractor, computeWindowedRenderLimits } from '../VirtualizeUtils';
import * as React from 'react';
import { VirtualizedListCellContextProvider, VirtualizedListContext, VirtualizedListContextProvider } from './VirtualizedListContext.js';

var __DEV__ = process.env.NODE_ENV !== 'production';

var _usedIndexForKey = false;
var _keylessItemComponentName = '';

/**
 * Default Props Helper Functions
 * Use the following helper functions for default values
 */
// horizontalOrDefault(this.props.horizontal)
function horizontalOrDefault(horizontal) {
  return horizontal !== null && horizontal !== void 0 ? horizontal : false;
} // initialNumToRenderOrDefault(this.props.initialNumToRenderOrDefault)


function initialNumToRenderOrDefault(initialNumToRender) {
  return initialNumToRender !== null && initialNumToRender !== void 0 ? initialNumToRender : 10;
} // maxToRenderPerBatchOrDefault(this.props.maxToRenderPerBatch)


function maxToRenderPerBatchOrDefault(maxToRenderPerBatch) {
  return maxToRenderPerBatch !== null && maxToRenderPerBatch !== void 0 ? maxToRenderPerBatch : 10;
} // onEndReachedThresholdOrDefault(this.props.onEndReachedThreshold)


function onEndReachedThresholdOrDefault(onEndReachedThreshold) {
  return onEndReachedThreshold !== null && onEndReachedThreshold !== void 0 ? onEndReachedThreshold : 2;
} // scrollEventThrottleOrDefault(this.props.scrollEventThrottle)


function scrollEventThrottleOrDefault(scrollEventThrottle) {
  return scrollEventThrottle !== null && scrollEventThrottle !== void 0 ? scrollEventThrottle : 50;
} // windowSizeOrDefault(this.props.windowSize)


function windowSizeOrDefault(windowSize) {
  return windowSize !== null && windowSize !== void 0 ? windowSize : 21;
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


class VirtualizedList extends React.PureComponent {
  // scrollToEnd may be janky without getItemLayout prop
  scrollToEnd(params) {
    var animated = params ? params.animated : true;
    var veryLast = this.props.getItemCount(this.props.data) - 1;

    var frame = this._getFrameMetricsApprox(veryLast);

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
  } // scrollToIndex may be janky without getItemLayout prop


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
    invariant(index >= 0, "scrollToIndex out of range: requested index " + index + " but minimum is 0");
    invariant(getItemCount(data) >= 1, "scrollToIndex out of range: item length " + getItemCount(data) + " but minimum is 1");
    invariant(index < getItemCount(data), "scrollToIndex out of range: requested index " + index + " is out of 0 to " + (getItemCount(data) - 1));

    if (!getItemLayout && index > this._highestMeasuredFrameIndex) {
      invariant(!!onScrollToIndexFailed, 'scrollToIndex should be used in conjunction with getItemLayout or onScrollToIndexFailed, ' + 'otherwise there is no way to know the location of offscreen indices or handle failures.');
      onScrollToIndexFailed({
        averageItemLength: this._averageCellLength,
        highestMeasuredFrameIndex: this._highestMeasuredFrameIndex,
        index
      });
      return;
    }

    var frame = this._getFrameMetricsApprox(index);

    var offset = Math.max(0, frame.offset - (viewPosition || 0) * (this._scrollMetrics.visibleLength - frame.length)) - (viewOffset || 0);

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
  } // scrollToItem may be janky without getItemLayout prop. Required linear scan through items -
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
        this.scrollToIndex(_objectSpread(_objectSpread({}, params), {}, {
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
      childList.ref && childList.ref.recordInteraction();
    });

    this._viewabilityTuples.forEach(t => {
      t.viewabilityHelper.recordInteraction();
    });

    this._updateViewableItems(this.props.data);
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
      return findNodeHandle(this._scrollRef);
    }
  }

  getScrollRef() {
    if (this._scrollRef && this._scrollRef.getScrollRef) {
      return this._scrollRef.getScrollRef();
    } else {
      return this._scrollRef;
    }
  }

  setNativeProps(props) {
    if (this._scrollRef) {
      this._scrollRef.setNativeProps(props);
    }
  }

  _getCellKey() {
    var _this$context;

    return ((_this$context = this.context) == null ? void 0 : _this$context.cellKey) || 'rootList';
  }

  _getListKey() {
    return this.props.listKey || this._getCellKey();
  }

  _getDebugInfo() {
    var _this$context2;

    return {
      listKey: this._getListKey(),
      cellKey: this._getCellKey(),
      horizontal: horizontalOrDefault(this.props.horizontal),
      parent: (_this$context2 = this.context) == null ? void 0 : _this$context2.debugInfo
    };
  }

  hasMore() {
    return this._hasMore;
  }

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

    this._getNestedChildState = key => {
      var existingChildData = this._nestedChildLists.get(key);

      return existingChildData && existingChildData.state;
    };

    this._registerAsNestedChild = childList => {
      // Register the mapping between this child key and the cellKey for its cell
      var childListsInCell = this._cellKeysToChildListKeys.get(childList.cellKey) || new Set();
      childListsInCell.add(childList.key);

      this._cellKeysToChildListKeys.set(childList.cellKey, childListsInCell);

      var existingChildData = this._nestedChildLists.get(childList.key);

      if (existingChildData && existingChildData.ref !== null) {
        console.error('A VirtualizedList contains a cell which itself contains ' + 'more than one VirtualizedList of the same orientation as the parent ' + 'list. You must pass a unique listKey prop to each sibling list.\n\n' + describeNestedLists(_objectSpread(_objectSpread({}, childList), {}, {
          // We're called from the child's componentDidMount, so it's safe to
          // read the child's props here (albeit weird).
          horizontal: !!childList.ref.props.horizontal
        })));
      }

      this._nestedChildLists.set(childList.key, {
        ref: childList.ref,
        state: null
      });

      if (this._hasInteracted) {
        childList.ref.recordInteraction();
      }
    };

    this._unregisterAsNestedChild = childList => {
      this._nestedChildLists.set(childList.key, {
        ref: null,
        state: childList.state
      });
    };

    this._onUpdateSeparators = (keys, newProps) => {
      keys.forEach(key => {
        var ref = key != null && this._cellRefs[key];
        ref && ref.updateSeparatorProps(newProps);
      });
    };

    this._getSpacerKey = isVertical => isVertical ? 'height' : 'width';

    this._averageCellLength = 0;
    this._cellKeysToChildListKeys = new Map();
    this._cellRefs = {};
    this._frames = {};
    this._footerLength = 0;
    this._hasDoneInitialScroll = false;
    this._hasInteracted = false;
    this._hasMore = false;
    this._hasWarned = {};
    this._headerLength = 0;
    this._hiPriInProgress = false;
    this._highestMeasuredFrameIndex = 0;
    this._indicesToKeys = new Map();
    this._nestedChildLists = new Map();
    this._offsetFromParentVirtualizedList = 0;
    this._prevParentOffset = 0;
    this._scrollMetrics = {
      contentLength: 0,
      dOffset: 0,
      dt: 10,
      offset: 0,
      timestamp: 0,
      velocity: 0,
      visibleLength: 0
    };
    this._scrollRef = null;
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
        return /*#__PURE__*/React.createElement(View, props);
      } else if (onRefresh) {
        var _props$refreshing;

        invariant(typeof props.refreshing === 'boolean', '`refreshing` prop must be set as a boolean in order to use `onRefresh`, but got `' + JSON.stringify((_props$refreshing = props.refreshing) !== null && _props$refreshing !== void 0 ? _props$refreshing : 'undefined') + '`');
        return (
          /*#__PURE__*/
          // $FlowFixMe[prop-missing] Invalid prop usage
          React.createElement(ScrollView, _extends({}, props, {
            refreshControl: props.refreshControl == null ? /*#__PURE__*/React.createElement(RefreshControl, {
              refreshing: props.refreshing,
              onRefresh: onRefresh,
              progressViewOffset: props.progressViewOffset
            }) : props.refreshControl
          }))
        );
      } else {
        // $FlowFixMe[prop-missing] Invalid prop usage
        return /*#__PURE__*/React.createElement(ScrollView, props);
      }
    };

    this._onCellUnmount = cellKey => {
      var curr = this._frames[cellKey];

      if (curr) {
        this._frames[cellKey] = _objectSpread(_objectSpread({}, curr), {}, {
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

      this._maybeCallOnEndReached();
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
      if (width > 0 && height > 0 && this.props.initialScrollIndex != null && this.props.initialScrollIndex > 0 && !this._hasDoneInitialScroll) {
        if (this.props.contentOffset == null) {
          this.scrollToIndex({
            animated: false,
            index: this.props.initialScrollIndex
          });
        }

        this._hasDoneInitialScroll = true;
      }

      if (this.props.onContentSizeChange) {
        this.props.onContentSizeChange(width, height);
      }

      this._scrollMetrics.contentLength = this._selectLength({
        height,
        width
      });

      this._scheduleCellsToRenderUpdate();

      this._maybeCallOnEndReached();
    };

    this._convertParentScrollMetrics = metrics => {
      // Offset of the top of the nested list relative to the top of its parent's viewport
      var offset = metrics.offset - this._offsetFromParentVirtualizedList; // Child's visible length is the same as its parent's

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
        childList.ref && childList.ref._onScroll(e);
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
        infoLog('VirtualizedList: You have a large list that is slow to update - make sure your ' + 'renderItem function renders components that follow React performance best practices ' + 'like PureComponent, shouldComponentUpdate, etc.', {
          dt,
          prevDt: this._scrollMetrics.dt,
          contentLength
        });
        this._hasWarned.perf = true;
      }

      this._scrollMetrics = {
        contentLength,
        dt,
        dOffset,
        offset,
        timestamp,
        velocity,
        visibleLength
      };

      this._updateViewableItems(this.props.data);

      if (!this.props) {
        return;
      }

      this._maybeCallOnEndReached();

      if (velocity !== 0) {
        this._fillRateHelper.activate();
      }

      this._computeBlankness();

      this._scheduleCellsToRenderUpdate();
    };

    this._onScrollBeginDrag = e => {
      this._nestedChildLists.forEach(childList => {
        childList.ref && childList.ref._onScrollBeginDrag(e);
      });

      this._viewabilityTuples.forEach(tuple => {
        tuple.viewabilityHelper.recordInteraction();
      });

      this._hasInteracted = true;
      this.props.onScrollBeginDrag && this.props.onScrollBeginDrag(e);
    };

    this._onScrollEndDrag = e => {
      this._nestedChildLists.forEach(childList => {
        childList.ref && childList.ref._onScrollEndDrag(e);
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
        childList.ref && childList.ref._onMomentumScrollBegin(e);
      });

      this.props.onMomentumScrollBegin && this.props.onMomentumScrollBegin(e);
    };

    this._onMomentumScrollEnd = e => {
      this._nestedChildLists.forEach(childList => {
        childList.ref && childList.ref._onMomentumScrollEnd(e);
      });

      this._scrollMetrics.velocity = 0;

      this._computeBlankness();

      this.props.onMomentumScrollEnd && this.props.onMomentumScrollEnd(e);
    };

    this._updateCellsToRender = () => {
      var _this$props3 = this.props,
          data = _this$props3.data,
          getItemCount = _this$props3.getItemCount,
          _onEndReachedThreshold = _this$props3.onEndReachedThreshold;
      var onEndReachedThreshold = onEndReachedThresholdOrDefault(_onEndReachedThreshold);

      var isVirtualizationDisabled = this._isVirtualizationDisabled();

      this._updateViewableItems(data);

      if (!data) {
        return;
      }

      this.setState(state => {
        var newState;
        var _this$_scrollMetrics = this._scrollMetrics,
            contentLength = _this$_scrollMetrics.contentLength,
            offset = _this$_scrollMetrics.offset,
            visibleLength = _this$_scrollMetrics.visibleLength;

        if (!isVirtualizationDisabled) {
          // If we run this with bogus data, we'll force-render window {first: 0, last: 0},
          // and wipe out the initialNumToRender rendered elements.
          // So let's wait until the scroll view metrics have been set up. And until then,
          // we will trust the initialNumToRender suggestion
          if (visibleLength > 0 && contentLength > 0) {
            // If we have a non-zero initialScrollIndex and run this before we've scrolled,
            // we'll wipe out the initialNumToRender rendered elements starting at initialScrollIndex.
            // So let's wait until we've scrolled the view to the right place. And until then,
            // we will trust the initialScrollIndex suggestion.
            if (!this.props.initialScrollIndex || this._scrollMetrics.offset) {
              newState = computeWindowedRenderLimits(this.props.data, this.props.getItemCount, maxToRenderPerBatchOrDefault(this.props.maxToRenderPerBatch), windowSizeOrDefault(this.props.windowSize), state, this._getFrameMetricsApprox, this._scrollMetrics);
            }
          }
        } else {
          var distanceFromEnd = contentLength - visibleLength - offset;
          var renderAhead = distanceFromEnd < onEndReachedThreshold * visibleLength ? maxToRenderPerBatchOrDefault(this.props.maxToRenderPerBatch) : 0;
          newState = {
            first: 0,
            last: Math.min(state.last + renderAhead, getItemCount(data) - 1)
          };
        }

        if (newState && this._nestedChildLists.size > 0) {
          var newFirst = newState.first;
          var newLast = newState.last; // If some cell in the new state has a child list in it, we should only render
          // up through that item, so that we give that list a chance to render.
          // Otherwise there's churn from multiple child lists mounting and un-mounting
          // their items.

          for (var ii = newFirst; ii <= newLast; ii++) {
            var cellKeyForIndex = this._indicesToKeys.get(ii);

            var childListKeys = cellKeyForIndex && this._cellKeysToChildListKeys.get(cellKeyForIndex);

            if (!childListKeys) {
              continue;
            }

            var someChildHasMore = false; // For each cell, need to check whether any child list in it has more elements to render

            for (var _iterator = _createForOfIteratorHelperLoose(childListKeys), _step; !(_step = _iterator()).done;) {
              var childKey = _step.value;

              var childList = this._nestedChildLists.get(childKey);

              if (childList && childList.ref && childList.ref.hasMore()) {
                someChildHasMore = true;
                break;
              }
            }

            if (someChildHasMore) {
              // $FlowFixMe[incompatible-use] The newState definitely exists past "if (newState &&"
              newState.last = ii;
              break;
            }
          }
        }

        if (newState != null && newState.first === state.first && newState.last === state.last) {
          newState = null;
        }

        return newState;
      });
    };

    this._createViewToken = (index, isViewable) => {
      var _this$props4 = this.props,
          data = _this$props4.data,
          getItem = _this$props4.getItem;
      var item = getItem(data, index);
      return {
        index,
        item,
        key: this._keyExtractor(item, index),
        isViewable
      };
    };

    this._getFrameMetricsApprox = index => {
      var frame = this._getFrameMetrics(index);

      if (frame && frame.index === index) {
        // check for invalid frames due to row re-ordering
        return frame;
      } else {
        var getItemLayout = this.props.getItemLayout;
        invariant(!getItemLayout, 'Should not have to estimate frames when a measurement metrics function is provided');
        return {
          length: this._averageCellLength,
          offset: this._averageCellLength * index
        };
      }
    };

    this._getFrameMetrics = index => {
      var _this$props5 = this.props,
          data = _this$props5.data,
          getItem = _this$props5.getItem,
          getItemCount = _this$props5.getItemCount,
          getItemLayout = _this$props5.getItemLayout;
      invariant(getItemCount(data) > index, 'Tried to get frame for out of range index ' + index);
      var item = getItem(data, index);

      var frame = item && this._frames[this._keyExtractor(item, index)];

      if (!frame || frame.index !== index) {
        if (getItemLayout) {
          frame = getItemLayout(data, index);
        }
      }
      /* $FlowFixMe[prop-missing] (>=0.63.0 site=react_native_fb) This comment
       * suppresses an error found when Flow v0.63 was deployed. To see the error
       * delete this comment and run Flow. */


      return frame;
    };

    invariant( // $FlowFixMe[prop-missing]
    !_props.onScroll || !_props.onScroll.__isNative, 'Components based on VirtualizedList must be wrapped with Animated.createAnimatedComponent ' + 'to support native onScroll events with useNativeDriver');
    invariant(windowSizeOrDefault(_props.windowSize) > 0, 'VirtualizedList: The windowSize prop must be present and set to a value greater than 0.');
    this._fillRateHelper = new FillRateHelper(this._getFrameMetrics);
    this._updateCellsToRenderBatcher = new Batchinator(this._updateCellsToRender, (_this$props$updateCel = this.props.updateCellsBatchingPeriod) !== null && _this$props$updateCel !== void 0 ? _this$props$updateCel : 50);

    if (this.props.viewabilityConfigCallbackPairs) {
      this._viewabilityTuples = this.props.viewabilityConfigCallbackPairs.map(pair => ({
        viewabilityHelper: new ViewabilityHelper(pair.viewabilityConfig),
        onViewableItemsChanged: pair.onViewableItemsChanged
      }));
    } else if (this.props.onViewableItemsChanged) {
      this._viewabilityTuples.push({
        viewabilityHelper: new ViewabilityHelper(this.props.viewabilityConfig),
        // $FlowFixMe[incompatible-call]
        onViewableItemsChanged: this.props.onViewableItemsChanged
      });
    }

    var initialState = {
      first: this.props.initialScrollIndex || 0,
      last: Math.min(this.props.getItemCount(this.props.data), (this.props.initialScrollIndex || 0) + initialNumToRenderOrDefault(this.props.initialNumToRender)) - 1
    };

    if (this._isNestedWithSameOrientation()) {
      var storedState = this.context.getNestedChildState(this._getListKey());

      if (storedState) {
        initialState = storedState;
        this.state = storedState;
        this._frames = storedState.frames;
      }
    } // REACT-NATIVE-WEB patch to preserve during future RN merges: Support inverted wheel scroller.
    // For issue https://github.com/necolas/react-native-web/issues/995


    this.invertedWheelEventHandler = ev => {
      if (this.props.inverted && this._scrollRef && this._scrollRef.getScrollableNode) {
        var node = this._scrollRef.getScrollableNode();

        if (this.props.horizontal) {
          node.scrollLeft -= ev.deltaX || ev.wheelDeltaX;
        } else {
          node.scrollTop -= ev.deltaY || ev.wheelDeltaY;
        }

        ev.preventDefault();
      }
    };

    this.state = initialState;
  }

  componentDidMount() {
    if (this._isNestedWithSameOrientation()) {
      this.context.registerAsNestedChild({
        cellKey: this._getCellKey(),
        key: this._getListKey(),
        ref: this,
        // NOTE: When the child mounts (here) it's not necessarily safe to read
        // the parent's props. This is why we explicitly propagate debugInfo
        // "down" via context and "up" again via this method call on the
        // parent.
        parentDebugInfo: this.context.debugInfo
      });
    } // REACT-NATIVE-WEB patch to preserve during future RN merges: Support inverted wheel scroller.


    this.setupWebWheelHandler();
  }

  componentWillUnmount() {
    if (this._isNestedWithSameOrientation()) {
      this.context.unregisterAsNestedChild({
        key: this._getListKey(),
        state: {
          first: this.state.first,
          last: this.state.last,
          frames: this._frames
        }
      });
    }

    this._updateViewableItems(null);

    this._updateCellsToRenderBatcher.dispose({
      abort: true
    });

    this._viewabilityTuples.forEach(tuple => {
      tuple.viewabilityHelper.dispose();
    });

    this._fillRateHelper.deactivateAndFlush(); // REACT-NATIVE-WEB patch to preserve during future RN merges: Support inverted wheel scroller.


    this.teardownWebWheelHandler();
  } // REACT-NATIVE-WEB patch to preserve during future RN merges: Support inverted wheel scroller.


  setupWebWheelHandler() {
    if (this._scrollRef && this._scrollRef.getScrollableNode) {
      this._scrollRef.getScrollableNode().addEventListener('wheel', this.invertedWheelEventHandler);
    } else {
      setTimeout(() => this.setupWebWheelHandler(), 50);
      return;
    }
  } // REACT-NATIVE-WEB patch to preserve during future RN merges: Support inverted wheel scroller.


  teardownWebWheelHandler() {
    if (this._scrollRef && this._scrollRef.getScrollableNode) {
      this._scrollRef.getScrollableNode().removeEventListener('wheel', this.invertedWheelEventHandler);
    }
  }

  static getDerivedStateFromProps(newProps, prevState) {
    var data = newProps.data,
        getItemCount = newProps.getItemCount;
    var maxToRenderPerBatch = maxToRenderPerBatchOrDefault(newProps.maxToRenderPerBatch); // first and last could be stale (e.g. if a new, shorter items props is passed in), so we make
    // sure we're rendering a reasonable range here.

    return {
      first: Math.max(0, Math.min(prevState.first, getItemCount(data) - 1 - maxToRenderPerBatch)),
      last: Math.max(0, Math.min(prevState.last, getItemCount(data) - 1))
    };
  }

  _pushCells(cells, stickyHeaderIndices, stickyIndicesFromProps, first, last, inversionStyle) {
    var _this = this;

    var _this$props6 = this.props,
        CellRendererComponent = _this$props6.CellRendererComponent,
        ItemSeparatorComponent = _this$props6.ItemSeparatorComponent,
        data = _this$props6.data,
        getItem = _this$props6.getItem,
        getItemCount = _this$props6.getItemCount,
        horizontal = _this$props6.horizontal;
    var stickyOffset = this.props.ListHeaderComponent ? 1 : 0;
    var end = getItemCount(data) - 1;
    var prevCellKey;
    last = Math.min(end, last);

    var _loop = function _loop(ii) {
      var item = getItem(data, ii);

      var key = _this._keyExtractor(item, ii);

      _this._indicesToKeys.set(ii, key);

      if (stickyIndicesFromProps.has(ii + stickyOffset)) {
        stickyHeaderIndices.push(cells.length);
      }

      cells.push( /*#__PURE__*/React.createElement(CellRenderer, {
        CellRendererComponent: CellRendererComponent,
        ItemSeparatorComponent: ii < end ? ItemSeparatorComponent : undefined,
        cellKey: key,
        fillRateHelper: _this._fillRateHelper,
        horizontal: horizontal,
        index: ii,
        inversionStyle: inversionStyle,
        item: item,
        key: key,
        prevCellKey: prevCellKey,
        onUpdateSeparators: _this._onUpdateSeparators,
        onLayout: e => _this._onCellLayout(e, key, ii),
        onUnmount: _this._onCellUnmount,
        parentProps: _this.props,
        ref: _ref => {
          _this._cellRefs[key] = _ref;
        }
      }));
      prevCellKey = key;
    };

    for (var ii = first; ii <= last; ii++) {
      _loop(ii);
    }
  }

  _isVirtualizationDisabled() {
    return this.props.disableVirtualization || false;
  }

  _isNestedWithSameOrientation() {
    var nestedContext = this.context;
    return !!(nestedContext && !!nestedContext.horizontal === horizontalOrDefault(this.props.horizontal));
  }

  _keyExtractor(item, index) {
    if (this.props.keyExtractor != null) {
      return this.props.keyExtractor(item, index);
    }

    var key = defaultKeyExtractor(item, index);

    if (key === String(index)) {
      _usedIndexForKey = true;

      if (item.type && item.type.displayName) {
        _keylessItemComponentName = item.type.displayName;
      }
    }

    return key;
  }

  render() {
    if (__DEV__) {
      var flatStyles = flattenStyle(this.props.contentContainerStyle);

      if (flatStyles != null && flatStyles.flexWrap === 'wrap') {
        console.warn('`flexWrap: `wrap`` is not supported with the `VirtualizedList` components.' + 'Consider using `numColumns` with `FlatList` instead.');
      }
    }

    var _this$props7 = this.props,
        ListEmptyComponent = _this$props7.ListEmptyComponent,
        ListFooterComponent = _this$props7.ListFooterComponent,
        ListHeaderComponent = _this$props7.ListHeaderComponent;
    var _this$props8 = this.props,
        data = _this$props8.data,
        horizontal = _this$props8.horizontal;

    var isVirtualizationDisabled = this._isVirtualizationDisabled();

    var inversionStyle = this.props.inverted ? horizontalOrDefault(this.props.horizontal) ? styles.horizontallyInverted : styles.verticallyInverted : null;
    var cells = [];
    var stickyIndicesFromProps = new Set(this.props.stickyHeaderIndices);
    var stickyHeaderIndices = [];

    if (ListHeaderComponent) {
      if (stickyIndicesFromProps.has(0)) {
        stickyHeaderIndices.push(0);
      }

      var element = /*#__PURE__*/React.isValidElement(ListHeaderComponent) ? ListHeaderComponent :
      /*#__PURE__*/
      // $FlowFixMe[not-a-component]
      // $FlowFixMe[incompatible-type-arg]
      React.createElement(ListHeaderComponent, null);
      cells.push( /*#__PURE__*/React.createElement(VirtualizedListCellContextProvider, {
        cellKey: this._getCellKey() + '-header',
        key: "$header"
      }, /*#__PURE__*/React.createElement(View, {
        onLayout: this._onLayoutHeader,
        style: StyleSheet.compose(inversionStyle, this.props.ListHeaderComponentStyle)
      }, // $FlowFixMe[incompatible-type] - Typing ReactNativeComponent revealed errors
      element)));
    }

    var itemCount = this.props.getItemCount(data);

    if (itemCount > 0) {
      _usedIndexForKey = false;
      _keylessItemComponentName = '';

      var spacerKey = this._getSpacerKey(!horizontal);

      var lastInitialIndex = this.props.initialScrollIndex ? -1 : initialNumToRenderOrDefault(this.props.initialNumToRender) - 1;
      var _this$state = this.state,
          first = _this$state.first,
          last = _this$state.last;

      this._pushCells(cells, stickyHeaderIndices, stickyIndicesFromProps, 0, lastInitialIndex, inversionStyle);

      var firstAfterInitial = Math.max(lastInitialIndex + 1, first);

      if (!isVirtualizationDisabled && first > lastInitialIndex + 1) {
        var insertedStickySpacer = false;

        if (stickyIndicesFromProps.size > 0) {
          var stickyOffset = ListHeaderComponent ? 1 : 0; // See if there are any sticky headers in the virtualized space that we need to render.

          for (var ii = firstAfterInitial - 1; ii > lastInitialIndex; ii--) {
            if (stickyIndicesFromProps.has(ii + stickyOffset)) {
              var initBlock = this._getFrameMetricsApprox(lastInitialIndex);

              var stickyBlock = this._getFrameMetricsApprox(ii);

              var leadSpace = stickyBlock.offset - initBlock.offset - (this.props.initialScrollIndex ? 0 : initBlock.length);
              cells.push( /*#__PURE__*/React.createElement(View, {
                key: "$sticky_lead",
                style: {
                  [spacerKey]: leadSpace
                }
              }));

              this._pushCells(cells, stickyHeaderIndices, stickyIndicesFromProps, ii, ii, inversionStyle);

              var trailSpace = this._getFrameMetricsApprox(first).offset - (stickyBlock.offset + stickyBlock.length);
              cells.push( /*#__PURE__*/React.createElement(View, {
                key: "$sticky_trail",
                style: {
                  [spacerKey]: trailSpace
                }
              }));
              insertedStickySpacer = true;
              break;
            }
          }
        }

        if (!insertedStickySpacer) {
          var _initBlock = this._getFrameMetricsApprox(lastInitialIndex);

          var firstSpace = this._getFrameMetricsApprox(first).offset - (_initBlock.offset + _initBlock.length);

          cells.push( /*#__PURE__*/React.createElement(View, {
            key: "$lead_spacer",
            style: {
              [spacerKey]: firstSpace
            }
          }));
        }
      }

      this._pushCells(cells, stickyHeaderIndices, stickyIndicesFromProps, firstAfterInitial, last, inversionStyle);

      if (!this._hasWarned.keys && _usedIndexForKey) {
        console.warn('VirtualizedList: missing keys for items, make sure to specify a key or id property on each ' + 'item or provide a custom keyExtractor.', _keylessItemComponentName);
        this._hasWarned.keys = true;
      }

      if (!isVirtualizationDisabled && last < itemCount - 1) {
        var lastFrame = this._getFrameMetricsApprox(last); // Without getItemLayout, we limit our tail spacer to the _highestMeasuredFrameIndex to
        // prevent the user for hyperscrolling into un-measured area because otherwise content will
        // likely jump around as it renders in above the viewport.


        var end = this.props.getItemLayout ? itemCount - 1 : Math.min(itemCount - 1, this._highestMeasuredFrameIndex);

        var endFrame = this._getFrameMetricsApprox(end);

        var tailSpacerLength = endFrame.offset + endFrame.length - (lastFrame.offset + lastFrame.length);
        cells.push( /*#__PURE__*/React.createElement(View, {
          key: "$tail_spacer",
          style: {
            [spacerKey]: tailSpacerLength
          }
        }));
      }
    } else if (ListEmptyComponent) {
      var _element = /*#__PURE__*/React.isValidElement(ListEmptyComponent) ? ListEmptyComponent :
      /*#__PURE__*/
      // $FlowFixMe[not-a-component]
      // $FlowFixMe[incompatible-type-arg]
      React.createElement(ListEmptyComponent, null);

      cells.push( /*#__PURE__*/React.cloneElement(_element, {
        key: '$empty',
        onLayout: event => {
          this._onLayoutEmpty(event);

          if (_element.props.onLayout) {
            _element.props.onLayout(event);
          }
        },
        style: StyleSheet.compose(inversionStyle, _element.props.style)
      }));
    }

    if (ListFooterComponent) {
      var _element2 = /*#__PURE__*/React.isValidElement(ListFooterComponent) ? ListFooterComponent :
      /*#__PURE__*/
      // $FlowFixMe[not-a-component]
      // $FlowFixMe[incompatible-type-arg]
      React.createElement(ListFooterComponent, null);

      cells.push( /*#__PURE__*/React.createElement(VirtualizedListCellContextProvider, {
        cellKey: this._getFooterCellKey(),
        key: "$footer"
      }, /*#__PURE__*/React.createElement(View, {
        onLayout: this._onLayoutFooter,
        style: StyleSheet.compose(inversionStyle, this.props.ListFooterComponentStyle)
      }, // $FlowFixMe[incompatible-type] - Typing ReactNativeComponent revealed errors
      _element2)));
    }

    var scrollProps = _objectSpread(_objectSpread({}, this.props), {}, {
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

    this._hasMore = this.state.last < this.props.getItemCount(this.props.data) - 1;
    var innerRet = /*#__PURE__*/React.createElement(VirtualizedListContextProvider, {
      value: {
        cellKey: null,
        getScrollMetrics: this._getScrollMetrics,
        horizontal: horizontalOrDefault(this.props.horizontal),
        getOutermostParentListRef: this._getOutermostParentListRef,
        getNestedChildState: this._getNestedChildState,
        registerAsNestedChild: this._registerAsNestedChild,
        unregisterAsNestedChild: this._unregisterAsNestedChild,
        debugInfo: this._getDebugInfo()
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
              this.context == null
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
      return /*#__PURE__*/React.createElement(View, {
        style: styles.debug
      }, ret, this._renderDebugOverlay());
    } else {
      return ret;
    }
  }

  componentDidUpdate(prevProps) {
    var _this$props9 = this.props,
        data = _this$props9.data,
        extraData = _this$props9.extraData;

    if (data !== prevProps.data || extraData !== prevProps.extraData) {
      // clear the viewableIndices cache to also trigger
      // the onViewableItemsChanged callback with the new data
      this._viewabilityTuples.forEach(tuple => {
        tuple.viewabilityHelper.resetViewableIndices();
      });
    } // The `this._hiPriInProgress` is guaranteeing a hiPri cell update will only happen
    // once per fiber update. The `_scheduleCellsToRenderUpdate` will set it to true
    // if a hiPri update needs to perform. If `componentDidUpdate` is triggered with
    // `this._hiPriInProgress=true`, means it's triggered by the hiPri update. The
    // `_scheduleCellsToRenderUpdate` will check this condition and not perform
    // another hiPri update.


    var hiPriInProgress = this._hiPriInProgress;

    this._scheduleCellsToRenderUpdate(); // Make sure setting `this._hiPriInProgress` back to false after `componentDidUpdate`
    // is triggered with `this._hiPriInProgress = true`


    if (hiPriInProgress) {
      this._hiPriInProgress = false;
    }
  }

  _computeBlankness() {
    this._fillRateHelper.computeBlankness(this.props, this.state, this._scrollMetrics);
  }

  _onCellLayout(e, cellKey, index) {
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

    this._updateViewableItems(this.props.data);
  }

  _triggerRemeasureForChildListsInCell(cellKey) {
    var childListKeys = this._cellKeysToChildListKeys.get(cellKey);

    if (childListKeys) {
      for (var _iterator2 = _createForOfIteratorHelperLoose(childListKeys), _step2; !(_step2 = _iterator2()).done;) {
        var childKey = _step2.value;

        var childList = this._nestedChildLists.get(childKey);

        childList && childList.ref && childList.ref.measureLayoutRelativeToContainingList();
      }
    }
  }

  measureLayoutRelativeToContainingList() {
    // TODO (T35574538): findNodeHandle sometimes crashes with "Unable to find
    // node on an unmounted component" during scrolling
    try {
      if (!this._scrollRef) {
        return;
      } // We are assuming that getOutermostParentListRef().getScrollRef()
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
          this._scrollMetrics.offset = scrollMetrics.offset; // If metrics of the scrollView changed, then we triggered remeasure for child list
          // to ensure VirtualizedList has the right information.

          this._cellKeysToChildListKeys.forEach(childListKeys => {
            if (childListKeys) {
              for (var _iterator3 = _createForOfIteratorHelperLoose(childListKeys), _step3; !(_step3 = _iterator3()).done;) {
                var childKey = _step3.value;

                var childList = this._nestedChildLists.get(childKey);

                childList && childList.ref && childList.ref.measureLayoutRelativeToContainingList();
              }
            }
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

  _renderDebugOverlay() {
    var normalize = this._scrollMetrics.visibleLength / (this._scrollMetrics.contentLength || 1);
    var framesInLayout = [];
    var itemCount = this.props.getItemCount(this.props.data);

    for (var ii = 0; ii < itemCount; ii++) {
      var frame = this._getFrameMetricsApprox(ii);
      /* $FlowFixMe[prop-missing] (>=0.68.0 site=react_native_fb) This comment
       * suppresses an error found when Flow v0.68 was deployed. To see the
       * error delete this comment and run Flow. */


      if (frame.inLayout) {
        framesInLayout.push(frame);
      }
    }

    var windowTop = this._getFrameMetricsApprox(this.state.first).offset;

    var frameLast = this._getFrameMetricsApprox(this.state.last);

    var windowLen = frameLast.offset + frameLast.length - windowTop;
    var visTop = this._scrollMetrics.offset;
    var visLen = this._scrollMetrics.visibleLength;
    return /*#__PURE__*/React.createElement(View, {
      style: [styles.debugOverlayBase, styles.debugOverlay]
    }, framesInLayout.map((f, ii) => /*#__PURE__*/React.createElement(View, {
      key: 'f' + ii,
      style: [styles.debugOverlayBase, styles.debugOverlayFrame, {
        top: f.offset * normalize,
        height: f.length * normalize
      }]
    })), /*#__PURE__*/React.createElement(View, {
      style: [styles.debugOverlayBase, styles.debugOverlayFrameLast, {
        top: windowTop * normalize,
        height: windowLen * normalize
      }]
    }), /*#__PURE__*/React.createElement(View, {
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

  _maybeCallOnEndReached() {
    var _this$props10 = this.props,
        data = _this$props10.data,
        getItemCount = _this$props10.getItemCount,
        onEndReached = _this$props10.onEndReached,
        onEndReachedThreshold = _this$props10.onEndReachedThreshold;
    var _this$_scrollMetrics2 = this._scrollMetrics,
        contentLength = _this$_scrollMetrics2.contentLength,
        visibleLength = _this$_scrollMetrics2.visibleLength,
        offset = _this$_scrollMetrics2.offset;
    var distanceFromEnd = contentLength - visibleLength - offset;
    var threshold = onEndReachedThreshold != null ? onEndReachedThreshold * visibleLength : 2;

    if (onEndReached && this.state.last === getItemCount(data) - 1 && distanceFromEnd < threshold && this._scrollMetrics.contentLength !== this._sentEndForContentLength) {
      // Only call onEndReached once for a given content length
      this._sentEndForContentLength = this._scrollMetrics.contentLength;
      onEndReached({
        distanceFromEnd
      });
    } else if (distanceFromEnd > threshold) {
      // If the user scrolls away from the end and back again cause
      // an onEndReached to be triggered again
      this._sentEndForContentLength = 0;
    }
  }

  _scheduleCellsToRenderUpdate() {
    var _this$state2 = this.state,
        first = _this$state2.first,
        last = _this$state2.last;
    var _this$_scrollMetrics3 = this._scrollMetrics,
        offset = _this$_scrollMetrics3.offset,
        visibleLength = _this$_scrollMetrics3.visibleLength,
        velocity = _this$_scrollMetrics3.velocity;
    var itemCount = this.props.getItemCount(this.props.data);
    var hiPri = false;
    var onEndReachedThreshold = onEndReachedThresholdOrDefault(this.props.onEndReachedThreshold);
    var scrollingThreshold = onEndReachedThreshold * visibleLength / 2; // Mark as high priority if we're close to the start of the first item
    // But only if there are items before the first rendered item

    if (first > 0) {
      var distTop = offset - this._getFrameMetricsApprox(first).offset;

      hiPri = hiPri || distTop < 0 || velocity < -2 && distTop < scrollingThreshold;
    } // Mark as high priority if we're close to the end of the last item
    // But only if there are items after the last rendered item


    if (last < itemCount - 1) {
      var distBottom = this._getFrameMetricsApprox(last).offset - (offset + visibleLength);
      hiPri = hiPri || distBottom < 0 || velocity > 2 && distBottom < scrollingThreshold;
    } // Only trigger high-priority updates if we've actually rendered cells,
    // and with that size estimate, accurately compute how many cells we should render.
    // Otherwise, it would just render as many cells as it can (of zero dimension),
    // each time through attempting to render more (limited by maxToRenderPerBatch),
    // starving the renderer from actually laying out the objects and computing _averageCellLength.
    // If this is triggered in an `componentDidUpdate` followed by a hiPri cellToRenderUpdate
    // We shouldn't do another hipri cellToRenderUpdate


    if (hiPri && (this._averageCellLength || this.props.getItemLayout) && !this._hiPriInProgress) {
      this._hiPriInProgress = true; // Don't worry about interactions when scrolling quickly; focus on filling content as fast
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

  _updateViewableItems(data) {
    var getItemCount = this.props.getItemCount;

    this._viewabilityTuples.forEach(tuple => {
      tuple.viewabilityHelper.onUpdate(getItemCount(data), this._scrollMetrics.offset, this._scrollMetrics.visibleLength, this._getFrameMetrics, this._createViewToken, tuple.onViewableItemsChanged, this.state);
    });
  }

}

VirtualizedList.contextType = VirtualizedListContext;

class CellRenderer extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      separatorProps: {
        highlighted: false,
        leadingItem: this.props.item
      }
    };
    this._separators = {
      highlight: () => {
        var _this$props11 = this.props,
            cellKey = _this$props11.cellKey,
            prevCellKey = _this$props11.prevCellKey;
        this.props.onUpdateSeparators([cellKey, prevCellKey], {
          highlighted: true
        });
      },
      unhighlight: () => {
        var _this$props12 = this.props,
            cellKey = _this$props12.cellKey,
            prevCellKey = _this$props12.prevCellKey;
        this.props.onUpdateSeparators([cellKey, prevCellKey], {
          highlighted: false
        });
      },
      updateProps: (select, newProps) => {
        var _this$props13 = this.props,
            cellKey = _this$props13.cellKey,
            prevCellKey = _this$props13.prevCellKey;
        this.props.onUpdateSeparators([select === 'leading' ? prevCellKey : cellKey], newProps);
      }
    };
  }

  static getDerivedStateFromProps(props, prevState) {
    return {
      separatorProps: _objectSpread(_objectSpread({}, prevState.separatorProps), {}, {
        leadingItem: props.item
      })
    };
  } // TODO: consider factoring separator stuff out of VirtualizedList into FlatList since it's not
  // reused by SectionList and we can keep VirtualizedList simpler.


  updateSeparatorProps(newProps) {
    this.setState(state => ({
      separatorProps: _objectSpread(_objectSpread({}, state.separatorProps), newProps)
    }));
  }

  componentWillUnmount() {
    this.props.onUnmount(this.props.cellKey);
  }

  _renderElement(renderItem, ListItemComponent, item, index) {
    if (renderItem && ListItemComponent) {
      console.warn('VirtualizedList: Both ListItemComponent and renderItem props are present. ListItemComponent will take' + ' precedence over renderItem.');
    }

    if (ListItemComponent) {
      /* $FlowFixMe[not-a-component] (>=0.108.0 site=react_native_fb) This
       * comment suppresses an error found when Flow v0.108 was deployed. To
       * see the error, delete this comment and run Flow. */

      /* $FlowFixMe[incompatible-type-arg] (>=0.108.0 site=react_native_fb)
       * This comment suppresses an error found when Flow v0.108 was deployed.
       * To see the error, delete this comment and run Flow. */
      return /*#__PURE__*/React.createElement(ListItemComponent, {
        item,
        index,
        separators: this._separators
      });
    }

    if (renderItem) {
      return renderItem({
        item,
        index,
        separators: this._separators
      });
    }

    invariant(false, 'VirtualizedList: Either ListItemComponent or renderItem props are required but none were found.');
  }

  render() {
    var _this$props14 = this.props,
        CellRendererComponent = _this$props14.CellRendererComponent,
        ItemSeparatorComponent = _this$props14.ItemSeparatorComponent,
        fillRateHelper = _this$props14.fillRateHelper,
        horizontal = _this$props14.horizontal,
        item = _this$props14.item,
        index = _this$props14.index,
        inversionStyle = _this$props14.inversionStyle,
        parentProps = _this$props14.parentProps;
    var renderItem = parentProps.renderItem,
        getItemLayout = parentProps.getItemLayout,
        ListItemComponent = parentProps.ListItemComponent;

    var element = this._renderElement(renderItem, ListItemComponent, item, index);

    var onLayout =
    /* $FlowFixMe[prop-missing] (>=0.68.0 site=react_native_fb) This comment
     * suppresses an error found when Flow v0.68 was deployed. To see the
     * error delete this comment and run Flow. */
    getItemLayout && !parentProps.debug && !fillRateHelper.enabled() ? undefined : this.props.onLayout; // NOTE: that when this is a sticky header, `onLayout` will get automatically extracted and
    // called explicitly by `ScrollViewStickyHeader`.

    var itemSeparator = ItemSeparatorComponent && /*#__PURE__*/React.createElement(ItemSeparatorComponent, this.state.separatorProps);
    var cellStyle = inversionStyle ? horizontal ? [styles.rowReverse, inversionStyle] : [styles.columnReverse, inversionStyle] : horizontal ? [styles.row, inversionStyle] : inversionStyle;
    var result = !CellRendererComponent ?
    /*#__PURE__*/

    /* $FlowFixMe[incompatible-type-arg] (>=0.89.0 site=react_native_fb) *
      This comment suppresses an error found when Flow v0.89 was deployed. *
      To see the error, delete this comment and run Flow. */
    React.createElement(View, {
      style: cellStyle,
      onLayout: onLayout
    }, element, itemSeparator) : /*#__PURE__*/React.createElement(CellRendererComponent, _extends({}, this.props, {
      style: cellStyle,
      onLayout: onLayout
    }), element, itemSeparator);
    return /*#__PURE__*/React.createElement(VirtualizedListCellContextProvider, {
      cellKey: this.props.cellKey
    }, result);
  }

}

function describeNestedLists(childList) {
  var trace = 'VirtualizedList trace:\n' + ("  Child (" + (childList.horizontal ? 'horizontal' : 'vertical') + "):\n") + ("    listKey: " + childList.key + "\n") + ("    cellKey: " + childList.cellKey);
  var debugInfo = childList.parentDebugInfo;

  while (debugInfo) {
    trace += "\n  Parent (" + (debugInfo.horizontal ? 'horizontal' : 'vertical') + "):\n" + ("    listKey: " + debugInfo.listKey + "\n") + ("    cellKey: " + debugInfo.cellKey);
    debugInfo = debugInfo.parent;
  }

  return trace;
}

var styles = StyleSheet.create({
  verticallyInverted: {
    transform: [{
      scaleY: -1
    }]
  },
  horizontallyInverted: {
    transform: [{
      scaleX: -1
    }]
  },
  row: {
    flexDirection: 'row'
  },
  rowReverse: {
    flexDirection: 'row-reverse'
  },
  columnReverse: {
    flexDirection: 'column-reverse'
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
export default VirtualizedList;