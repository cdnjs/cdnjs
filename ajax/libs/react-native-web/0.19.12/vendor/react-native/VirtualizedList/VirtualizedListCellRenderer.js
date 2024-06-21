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

import View from '../../../exports/View';
import StyleSheet from '../../../exports/StyleSheet';
import { VirtualizedListCellContextProvider } from './VirtualizedListContext.js';
import invariant from 'fbjs/lib/invariant';
import * as React from 'react';
export default class CellRenderer extends React.Component {
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
        var _this$props = this.props,
          cellKey = _this$props.cellKey,
          prevCellKey = _this$props.prevCellKey;
        this.props.onUpdateSeparators([cellKey, prevCellKey], {
          highlighted: true
        });
      },
      unhighlight: () => {
        var _this$props2 = this.props,
          cellKey = _this$props2.cellKey,
          prevCellKey = _this$props2.prevCellKey;
        this.props.onUpdateSeparators([cellKey, prevCellKey], {
          highlighted: false
        });
      },
      updateProps: (select, newProps) => {
        var _this$props3 = this.props,
          cellKey = _this$props3.cellKey,
          prevCellKey = _this$props3.prevCellKey;
        this.props.onUpdateSeparators([select === 'leading' ? prevCellKey : cellKey], newProps);
      }
    };
    this._onLayout = nativeEvent => {
      this.props.onCellLayout && this.props.onCellLayout(nativeEvent, this.props.cellKey, this.props.index);
    };
  }
  static getDerivedStateFromProps(props, prevState) {
    return {
      separatorProps: _objectSpread(_objectSpread({}, prevState.separatorProps), {}, {
        leadingItem: props.item
      })
    };
  }

  // TODO: consider factoring separator stuff out of VirtualizedList into FlatList since it's not
  // reused by SectionList and we can keep VirtualizedList simpler.
  // $FlowFixMe[missing-local-annot]
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
    var _this$props4 = this.props,
      CellRendererComponent = _this$props4.CellRendererComponent,
      ItemSeparatorComponent = _this$props4.ItemSeparatorComponent,
      ListItemComponent = _this$props4.ListItemComponent,
      cellKey = _this$props4.cellKey,
      horizontal = _this$props4.horizontal,
      item = _this$props4.item,
      index = _this$props4.index,
      inversionStyle = _this$props4.inversionStyle,
      onCellFocusCapture = _this$props4.onCellFocusCapture,
      onCellLayout = _this$props4.onCellLayout,
      renderItem = _this$props4.renderItem;
    var element = this._renderElement(renderItem, ListItemComponent, item, index);

    // NOTE: that when this is a sticky header, `onLayout` will get automatically extracted and
    // called explicitly by `ScrollViewStickyHeader`.
    var itemSeparator = /*#__PURE__*/React.isValidElement(ItemSeparatorComponent) ?
    // $FlowFixMe[incompatible-type]
    ItemSeparatorComponent :
    // $FlowFixMe[incompatible-type]
    ItemSeparatorComponent && /*#__PURE__*/React.createElement(ItemSeparatorComponent, this.state.separatorProps);
    var cellStyle = inversionStyle ? horizontal ? [styles.rowReverse, inversionStyle] : [styles.columnReverse, inversionStyle] : horizontal ? [styles.row, inversionStyle] : inversionStyle;
    var result = !CellRendererComponent ? /*#__PURE__*/React.createElement(View, _extends({
      style: cellStyle,
      onFocusCapture: onCellFocusCapture
    }, onCellLayout && {
      onLayout: this._onLayout
    }), element, itemSeparator) : /*#__PURE__*/React.createElement(CellRendererComponent, _extends({
      cellKey: cellKey,
      index: index,
      item: item,
      style: cellStyle,
      onFocusCapture: onCellFocusCapture
    }, onCellLayout && {
      onLayout: this._onLayout
    }), element, itemSeparator);
    return /*#__PURE__*/React.createElement(VirtualizedListCellContextProvider, {
      cellKey: this.props.cellKey
    }, result);
  }
}
var styles = StyleSheet.create({
  row: {
    flexDirection: 'row'
  },
  rowReverse: {
    flexDirection: 'row-reverse'
  },
  columnReverse: {
    flexDirection: 'column-reverse'
  }
});