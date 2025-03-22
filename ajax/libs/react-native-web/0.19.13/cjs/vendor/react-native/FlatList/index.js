"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));
var _View = _interopRequireDefault(require("../../../exports/View"));
var _StyleSheet = _interopRequireDefault(require("../../../exports/StyleSheet"));
var _deepDiffer = _interopRequireDefault(require("../deepDiffer"));
var _Platform = _interopRequireDefault(require("../../../exports/Platform"));
var _invariant = _interopRequireDefault(require("fbjs/lib/invariant"));
var React = _interopRequireWildcard(require("react"));
var _VirtualizedList = _interopRequireDefault(require("../VirtualizedList"));
var _VirtualizeUtils = require("../VirtualizeUtils");
var _memoizeOne = _interopRequireDefault(require("memoize-one"));
var _excluded = ["numColumns", "columnWrapperStyle", "removeClippedSubviews", "strictMode"];
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
/**
 * Default Props Helper Functions
 * Use the following helper functions for default values
 */

// removeClippedSubviewsOrDefault(this.props.removeClippedSubviews)
function removeClippedSubviewsOrDefault(removeClippedSubviews) {
  return removeClippedSubviews !== null && removeClippedSubviews !== void 0 ? removeClippedSubviews : _Platform.default.OS === 'android';
}

// numColumnsOrDefault(this.props.numColumns)
function numColumnsOrDefault(numColumns) {
  return numColumns !== null && numColumns !== void 0 ? numColumns : 1;
}
function isArrayLike(data) {
  // $FlowExpectedError[incompatible-use]
  return typeof Object(data).length === 'number';
}
/**
 * A performant interface for rendering simple, flat lists, supporting the most handy features:
 *
 *  - Fully cross-platform.
 *  - Optional horizontal mode.
 *  - Configurable viewability callbacks.
 *  - Header support.
 *  - Footer support.
 *  - Separator support.
 *  - Pull to Refresh.
 *  - Scroll loading.
 *  - ScrollToIndex support.
 *
 * If you need section support, use [`<SectionList>`](docs/sectionlist.html).
 *
 * Minimal Example:
 *
 *     <FlatList
 *       data={[{key: 'a'}, {key: 'b'}]}
 *       renderItem={({item}) => <Text>{item.key}</Text>}
 *     />
 *
 * More complex, multi-select example demonstrating `PureComponent` usage for perf optimization and avoiding bugs.
 *
 * - By binding the `onPressItem` handler, the props will remain `===` and `PureComponent` will
 *   prevent wasteful re-renders unless the actual `id`, `selected`, or `title` props change, even
 *   if the components rendered in `MyListItem` did not have such optimizations.
 * - By passing `extraData={this.state}` to `FlatList` we make sure `FlatList` itself will re-render
 *   when the `state.selected` changes. Without setting this prop, `FlatList` would not know it
 *   needs to re-render any items because it is also a `PureComponent` and the prop comparison will
 *   not show any changes.
 * - `keyExtractor` tells the list to use the `id`s for the react keys instead of the default `key` property.
 *
 *
 *     class MyListItem extends React.PureComponent {
 *       _onPress = () => {
 *         this.props.onPressItem(this.props.id);
 *       };
 *
 *       render() {
 *         const textColor = this.props.selected ? "red" : "black";
 *         return (
 *           <TouchableOpacity onPress={this._onPress}>
 *             <View>
 *               <Text style={{ color: textColor }}>
 *                 {this.props.title}
 *               </Text>
 *             </View>
 *           </TouchableOpacity>
 *         );
 *       }
 *     }
 *
 *     class MultiSelectList extends React.PureComponent {
 *       state = {selected: (new Map(): Map<string, boolean>)};
 *
 *       _keyExtractor = (item, index) => item.id;
 *
 *       _onPressItem = (id: string) => {
 *         // updater functions are preferred for transactional updates
 *         this.setState((state) => {
 *           // copy the map rather than modifying state.
 *           const selected = new Map(state.selected);
 *           selected.set(id, !selected.get(id)); // toggle
 *           return {selected};
 *         });
 *       };
 *
 *       _renderItem = ({item}) => (
 *         <MyListItem
 *           id={item.id}
 *           onPressItem={this._onPressItem}
 *           selected={!!this.state.selected.get(item.id)}
 *           title={item.title}
 *         />
 *       );
 *
 *       render() {
 *         return (
 *           <FlatList
 *             data={this.props.data}
 *             extraData={this.state}
 *             keyExtractor={this._keyExtractor}
 *             renderItem={this._renderItem}
 *           />
 *         );
 *       }
 *     }
 *
 * This is a convenience wrapper around [`<VirtualizedList>`](docs/virtualizedlist.html),
 * and thus inherits its props (as well as those of `ScrollView`) that aren't explicitly listed
 * here, along with the following caveats:
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
 * - By default, the list looks for a `key` prop on each item and uses that for the React key.
 *   Alternatively, you can provide a custom `keyExtractor` prop.
 *
 * Also inherits [ScrollView Props](docs/scrollview.html#props), unless it is nested in another FlatList of same orientation.
 */
class FlatList extends React.PureComponent {
  /**
   * Scrolls to the end of the content. May be janky without `getItemLayout` prop.
   */
  scrollToEnd(params) {
    if (this._listRef) {
      this._listRef.scrollToEnd(params);
    }
  }

  /**
   * Scrolls to the item at the specified index such that it is positioned in the viewable area
   * such that `viewPosition` 0 places it at the top, 1 at the bottom, and 0.5 centered in the
   * middle. `viewOffset` is a fixed number of pixels to offset the final target position.
   *
   * Note: cannot scroll to locations outside the render window without specifying the
   * `getItemLayout` prop.
   */
  scrollToIndex(params) {
    if (this._listRef) {
      this._listRef.scrollToIndex(params);
    }
  }

  /**
   * Requires linear scan through data - use `scrollToIndex` instead if possible.
   *
   * Note: cannot scroll to locations outside the render window without specifying the
   * `getItemLayout` prop.
   */
  scrollToItem(params) {
    if (this._listRef) {
      this._listRef.scrollToItem(params);
    }
  }

  /**
   * Scroll to a specific content pixel offset in the list.
   *
   * Check out [scrollToOffset](docs/virtualizedlist.html#scrolltooffset) of VirtualizedList
   */
  scrollToOffset(params) {
    if (this._listRef) {
      this._listRef.scrollToOffset(params);
    }
  }

  /**
   * Tells the list an interaction has occurred, which should trigger viewability calculations, e.g.
   * if `waitForInteractions` is true and the user has not scrolled. This is typically called by
   * taps on items or by navigation actions.
   */
  recordInteraction() {
    if (this._listRef) {
      this._listRef.recordInteraction();
    }
  }

  /**
   * Displays the scroll indicators momentarily.
   *
   * @platform ios
   */
  flashScrollIndicators() {
    if (this._listRef) {
      this._listRef.flashScrollIndicators();
    }
  }

  /**
   * Provides a handle to the underlying scroll responder.
   */
  getScrollResponder() {
    if (this._listRef) {
      return this._listRef.getScrollResponder();
    }
  }

  /**
   * Provides a reference to the underlying host component
   */
  getNativeScrollRef() {
    if (this._listRef) {
      /* $FlowFixMe[incompatible-return] Suppresses errors found when fixing
       * TextInput typing */
      return this._listRef.getScrollRef();
    }
  }
  getScrollableNode() {
    if (this._listRef) {
      return this._listRef.getScrollableNode();
    }
  }
  constructor(_props) {
    super(_props);
    this._virtualizedListPairs = [];
    this._captureRef = ref => {
      this._listRef = ref;
    };
    this._getItem = (data, index) => {
      var numColumns = numColumnsOrDefault(this.props.numColumns);
      if (numColumns > 1) {
        var ret = [];
        for (var kk = 0; kk < numColumns; kk++) {
          var itemIndex = index * numColumns + kk;
          if (itemIndex < data.length) {
            var _item = data[itemIndex];
            ret.push(_item);
          }
        }
        return ret;
      } else {
        return data[index];
      }
    };
    this._getItemCount = data => {
      // Legacy behavior of FlatList was to forward "undefined" length if invalid
      // data like a non-arraylike object is passed. VirtualizedList would then
      // coerce this, and the math would work out to no-op. For compatibility, if
      // invalid data is passed, we tell VirtualizedList there are zero items
      // available to prevent it from trying to read from the invalid data
      // (without propagating invalidly typed data).
      if (data != null && isArrayLike(data)) {
        var numColumns = numColumnsOrDefault(this.props.numColumns);
        return numColumns > 1 ? Math.ceil(data.length / numColumns) : data.length;
      } else {
        return 0;
      }
    };
    this._keyExtractor = (items, index) => {
      var _this$props$keyExtrac;
      var numColumns = numColumnsOrDefault(this.props.numColumns);
      var keyExtractor = (_this$props$keyExtrac = this.props.keyExtractor) !== null && _this$props$keyExtrac !== void 0 ? _this$props$keyExtrac : _VirtualizeUtils.keyExtractor;
      if (numColumns > 1) {
        (0, _invariant.default)(Array.isArray(items), 'FlatList: Encountered internal consistency error, expected each item to consist of an ' + 'array with 1-%s columns; instead, received a single item.', numColumns);
        return items.map((item, kk) => keyExtractor(item, index * numColumns + kk)).join(':');
      }

      // $FlowFixMe[incompatible-call] Can't call keyExtractor with an array
      return keyExtractor(items, index);
    };
    this._renderer = (ListItemComponent, renderItem, columnWrapperStyle, numColumns, extraData
    // $FlowFixMe[missing-local-annot]
    ) => {
      var cols = numColumnsOrDefault(numColumns);
      var render = props => {
        if (ListItemComponent) {
          // $FlowFixMe[not-a-component] Component isn't valid
          // $FlowFixMe[incompatible-type-arg] Component isn't valid
          // $FlowFixMe[incompatible-return] Component isn't valid
          return /*#__PURE__*/React.createElement(ListItemComponent, props);
        } else if (renderItem) {
          // $FlowFixMe[incompatible-call]
          return renderItem(props);
        } else {
          return null;
        }
      };
      var renderProp = info => {
        if (cols > 1) {
          var _item2 = info.item,
            _index = info.index;
          (0, _invariant.default)(Array.isArray(_item2), 'Expected array of items with numColumns > 1');
          return /*#__PURE__*/React.createElement(_View.default, {
            style: [styles.row, columnWrapperStyle]
          }, _item2.map((it, kk) => {
            var element = render({
              // $FlowFixMe[incompatible-call]
              item: it,
              index: _index * cols + kk,
              separators: info.separators
            });
            return element != null ? /*#__PURE__*/React.createElement(React.Fragment, {
              key: kk
            }, element) : null;
          }));
        } else {
          return render(info);
        }
      };
      return ListItemComponent ? {
        ListItemComponent: renderProp
      } : {
        renderItem: renderProp
      };
    };
    this._memoizedRenderer = (0, _memoizeOne.default)(this._renderer);
    this._checkProps(this.props);
    if (this.props.viewabilityConfigCallbackPairs) {
      this._virtualizedListPairs = this.props.viewabilityConfigCallbackPairs.map(pair => ({
        viewabilityConfig: pair.viewabilityConfig,
        onViewableItemsChanged: this._createOnViewableItemsChanged(pair.onViewableItemsChanged)
      }));
    } else if (this.props.onViewableItemsChanged) {
      this._virtualizedListPairs.push({
        /* $FlowFixMe[incompatible-call] (>=0.63.0 site=react_native_fb) This
         * comment suppresses an error found when Flow v0.63 was deployed. To
         * see the error delete this comment and run Flow. */
        viewabilityConfig: this.props.viewabilityConfig,
        onViewableItemsChanged: this._createOnViewableItemsChanged(this.props.onViewableItemsChanged)
      });
    }
  }

  // $FlowFixMe[missing-local-annot]
  componentDidUpdate(prevProps) {
    (0, _invariant.default)(prevProps.numColumns === this.props.numColumns, 'Changing numColumns on the fly is not supported. Change the key prop on FlatList when ' + 'changing the number of columns to force a fresh render of the component.');
    (0, _invariant.default)(prevProps.onViewableItemsChanged === this.props.onViewableItemsChanged, 'Changing onViewableItemsChanged on the fly is not supported');
    (0, _invariant.default)(!(0, _deepDiffer.default)(prevProps.viewabilityConfig, this.props.viewabilityConfig), 'Changing viewabilityConfig on the fly is not supported');
    (0, _invariant.default)(prevProps.viewabilityConfigCallbackPairs === this.props.viewabilityConfigCallbackPairs, 'Changing viewabilityConfigCallbackPairs on the fly is not supported');
    this._checkProps(this.props);
  }
  // $FlowFixMe[missing-local-annot]
  _checkProps(props) {
    var getItem = props.getItem,
      getItemCount = props.getItemCount,
      horizontal = props.horizontal,
      columnWrapperStyle = props.columnWrapperStyle,
      onViewableItemsChanged = props.onViewableItemsChanged,
      viewabilityConfigCallbackPairs = props.viewabilityConfigCallbackPairs;
    var numColumns = numColumnsOrDefault(this.props.numColumns);
    (0, _invariant.default)(!getItem && !getItemCount, 'FlatList does not support custom data formats.');
    if (numColumns > 1) {
      (0, _invariant.default)(!horizontal, 'numColumns does not support horizontal.');
    } else {
      (0, _invariant.default)(!columnWrapperStyle, 'columnWrapperStyle not supported for single column lists');
    }
    (0, _invariant.default)(!(onViewableItemsChanged && viewabilityConfigCallbackPairs), 'FlatList does not support setting both onViewableItemsChanged and ' + 'viewabilityConfigCallbackPairs.');
  }
  _pushMultiColumnViewable(arr, v) {
    var _this$props$keyExtrac2;
    var numColumns = numColumnsOrDefault(this.props.numColumns);
    var keyExtractor = (_this$props$keyExtrac2 = this.props.keyExtractor) !== null && _this$props$keyExtrac2 !== void 0 ? _this$props$keyExtrac2 : _VirtualizeUtils.keyExtractor;
    v.item.forEach((item, ii) => {
      (0, _invariant.default)(v.index != null, 'Missing index!');
      var index = v.index * numColumns + ii;
      arr.push((0, _objectSpread2.default)((0, _objectSpread2.default)({}, v), {}, {
        item,
        key: keyExtractor(item, index),
        index
      }));
    });
  }
  _createOnViewableItemsChanged(onViewableItemsChanged
  // $FlowFixMe[missing-local-annot]
  ) {
    return info => {
      var numColumns = numColumnsOrDefault(this.props.numColumns);
      if (onViewableItemsChanged) {
        if (numColumns > 1) {
          var changed = [];
          var viewableItems = [];
          info.viewableItems.forEach(v => this._pushMultiColumnViewable(viewableItems, v));
          info.changed.forEach(v => this._pushMultiColumnViewable(changed, v));
          onViewableItemsChanged({
            viewableItems,
            changed
          });
        } else {
          onViewableItemsChanged(info);
        }
      }
    };
  }

  // $FlowFixMe[missing-local-annot]

  render() {
    var _this$props = this.props,
      numColumns = _this$props.numColumns,
      columnWrapperStyle = _this$props.columnWrapperStyle,
      _removeClippedSubviews = _this$props.removeClippedSubviews,
      _this$props$strictMod = _this$props.strictMode,
      strictMode = _this$props$strictMod === void 0 ? false : _this$props$strictMod,
      restProps = (0, _objectWithoutPropertiesLoose2.default)(_this$props, _excluded);
    var renderer = strictMode ? this._memoizedRenderer : this._renderer;
    return (
      /*#__PURE__*/
      // $FlowFixMe[incompatible-exact] - `restProps` (`Props`) is inexact.
      React.createElement(_VirtualizedList.default, (0, _extends2.default)({}, restProps, {
        getItem: this._getItem,
        getItemCount: this._getItemCount,
        keyExtractor: this._keyExtractor,
        ref: this._captureRef,
        viewabilityConfigCallbackPairs: this._virtualizedListPairs,
        removeClippedSubviews: removeClippedSubviewsOrDefault(_removeClippedSubviews)
      }, renderer(this.props.ListItemComponent, this.props.renderItem, columnWrapperStyle, numColumns, this.props.extraData)))
    );
  }
}
var styles = _StyleSheet.default.create({
  row: {
    flexDirection: 'row'
  }
});
var _default = exports.default = FlatList;
module.exports = exports.default;