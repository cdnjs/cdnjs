import _extends from "@babel/runtime/helpers/extends";
import _createForOfIteratorHelperLoose from "@babel/runtime/helpers/createForOfIteratorHelperLoose";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _objectSpread from "@babel/runtime/helpers/objectSpread2";
var _excluded = ["ItemSeparatorComponent", "SectionSeparatorComponent", "renderItem", "renderSectionFooter", "renderSectionHeader", "sections", "stickySectionHeadersEnabled"];
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
import VirtualizedList from '../VirtualizedList';
import { keyExtractor as defaultKeyExtractor } from '../VirtualizeUtils';
import invariant from 'fbjs/lib/invariant';
import * as React from 'react';
/**
 * Right now this just flattens everything into one list and uses VirtualizedList under the
 * hood. The only operation that might not scale well is concatting the data arrays of all the
 * sections when new props are received, which should be plenty fast for up to ~10,000 items.
 */
class VirtualizedSectionList extends React.PureComponent {
  constructor() {
    super(...arguments);
    this._keyExtractor = (item, index) => {
      var info = this._subExtractor(index);
      return info && info.key || String(index);
    };
    this._convertViewable = viewable => {
      var _info$index;
      invariant(viewable.index != null, 'Received a broken ViewToken');
      var info = this._subExtractor(viewable.index);
      if (!info) {
        return null;
      }
      var keyExtractorWithNullableIndex = info.section.keyExtractor;
      var keyExtractorWithNonNullableIndex = this.props.keyExtractor || defaultKeyExtractor;
      var key = keyExtractorWithNullableIndex != null ? keyExtractorWithNullableIndex(viewable.item, info.index) : keyExtractorWithNonNullableIndex(viewable.item, (_info$index = info.index) !== null && _info$index !== void 0 ? _info$index : 0);
      return _objectSpread(_objectSpread({}, viewable), {}, {
        index: info.index,
        key,
        section: info.section
      });
    };
    this._onViewableItemsChanged = _ref => {
      var viewableItems = _ref.viewableItems,
        changed = _ref.changed;
      var onViewableItemsChanged = this.props.onViewableItemsChanged;
      if (onViewableItemsChanged != null) {
        onViewableItemsChanged({
          viewableItems: viewableItems.map(this._convertViewable, this).filter(Boolean),
          changed: changed.map(this._convertViewable, this).filter(Boolean)
        });
      }
    };
    this._renderItem = listItemCount =>
    // eslint-disable-next-line react/no-unstable-nested-components
    _ref2 => {
      var item = _ref2.item,
        index = _ref2.index;
      var info = this._subExtractor(index);
      if (!info) {
        return null;
      }
      var infoIndex = info.index;
      if (infoIndex == null) {
        var section = info.section;
        if (info.header === true) {
          var renderSectionHeader = this.props.renderSectionHeader;
          return renderSectionHeader ? renderSectionHeader({
            section
          }) : null;
        } else {
          var renderSectionFooter = this.props.renderSectionFooter;
          return renderSectionFooter ? renderSectionFooter({
            section
          }) : null;
        }
      } else {
        var renderItem = info.section.renderItem || this.props.renderItem;
        var SeparatorComponent = this._getSeparatorComponent(index, info, listItemCount);
        invariant(renderItem, 'no renderItem!');
        return /*#__PURE__*/React.createElement(ItemWithSeparator, {
          SeparatorComponent: SeparatorComponent,
          LeadingSeparatorComponent: infoIndex === 0 ? this.props.SectionSeparatorComponent : undefined,
          cellKey: info.key,
          index: infoIndex,
          item: item,
          leadingItem: info.leadingItem,
          leadingSection: info.leadingSection,
          prevCellKey: (this._subExtractor(index - 1) || {}).key
          // Callback to provide updateHighlight for this item
          ,
          setSelfHighlightCallback: this._setUpdateHighlightFor,
          setSelfUpdatePropsCallback: this._setUpdatePropsFor
          // Provide child ability to set highlight/updateProps for previous item using prevCellKey
          ,
          updateHighlightFor: this._updateHighlightFor,
          updatePropsFor: this._updatePropsFor,
          renderItem: renderItem,
          section: info.section,
          trailingItem: info.trailingItem,
          trailingSection: info.trailingSection,
          inverted: !!this.props.inverted
        });
      }
    };
    this._updatePropsFor = (cellKey, value) => {
      var updateProps = this._updatePropsMap[cellKey];
      if (updateProps != null) {
        updateProps(value);
      }
    };
    this._updateHighlightFor = (cellKey, value) => {
      var updateHighlight = this._updateHighlightMap[cellKey];
      if (updateHighlight != null) {
        updateHighlight(value);
      }
    };
    this._setUpdateHighlightFor = (cellKey, updateHighlightFn) => {
      if (updateHighlightFn != null) {
        this._updateHighlightMap[cellKey] = updateHighlightFn;
      } else {
        // $FlowFixMe[prop-missing]
        delete this._updateHighlightFor[cellKey];
      }
    };
    this._setUpdatePropsFor = (cellKey, updatePropsFn) => {
      if (updatePropsFn != null) {
        this._updatePropsMap[cellKey] = updatePropsFn;
      } else {
        delete this._updatePropsMap[cellKey];
      }
    };
    this._updateHighlightMap = {};
    this._updatePropsMap = {};
    this._captureRef = ref => {
      this._listRef = ref;
    };
  }
  scrollToLocation(params) {
    var index = params.itemIndex;
    for (var i = 0; i < params.sectionIndex; i++) {
      index += this.props.getItemCount(this.props.sections[i].data) + 2;
    }
    var viewOffset = params.viewOffset || 0;
    if (this._listRef == null) {
      return;
    }
    if (params.itemIndex > 0 && this.props.stickySectionHeadersEnabled) {
      var frame = this._listRef.__getFrameMetricsApprox(index - params.itemIndex, this._listRef.props);
      viewOffset += frame.length;
    }
    var toIndexParams = _objectSpread(_objectSpread({}, params), {}, {
      viewOffset,
      index
    });
    // $FlowFixMe[incompatible-use]
    this._listRef.scrollToIndex(toIndexParams);
  }
  getListRef() {
    return this._listRef;
  }
  render() {
    var _this$props = this.props,
      ItemSeparatorComponent = _this$props.ItemSeparatorComponent,
      SectionSeparatorComponent = _this$props.SectionSeparatorComponent,
      _renderItem = _this$props.renderItem,
      renderSectionFooter = _this$props.renderSectionFooter,
      renderSectionHeader = _this$props.renderSectionHeader,
      _sections = _this$props.sections,
      stickySectionHeadersEnabled = _this$props.stickySectionHeadersEnabled,
      passThroughProps = _objectWithoutPropertiesLoose(_this$props, _excluded);
    var listHeaderOffset = this.props.ListHeaderComponent ? 1 : 0;
    var stickyHeaderIndices = this.props.stickySectionHeadersEnabled ? [] : undefined;
    var itemCount = 0;
    for (var _iterator = _createForOfIteratorHelperLoose(this.props.sections), _step; !(_step = _iterator()).done;) {
      var section = _step.value;
      // Track the section header indices
      if (stickyHeaderIndices != null) {
        stickyHeaderIndices.push(itemCount + listHeaderOffset);
      }

      // Add two for the section header and footer.
      itemCount += 2;
      itemCount += this.props.getItemCount(section.data);
    }
    var renderItem = this._renderItem(itemCount);
    return /*#__PURE__*/React.createElement(VirtualizedList, _extends({}, passThroughProps, {
      keyExtractor: this._keyExtractor,
      stickyHeaderIndices: stickyHeaderIndices,
      renderItem: renderItem,
      data: this.props.sections,
      getItem: (sections, index) => this._getItem(this.props, sections, index),
      getItemCount: () => itemCount,
      onViewableItemsChanged: this.props.onViewableItemsChanged ? this._onViewableItemsChanged : undefined,
      ref: this._captureRef
    }));
  }
  _getItem(props, sections, index) {
    if (!sections) {
      return null;
    }
    var itemIdx = index - 1;
    for (var i = 0; i < sections.length; i++) {
      var section = sections[i];
      var sectionData = section.data;
      var itemCount = props.getItemCount(sectionData);
      if (itemIdx === -1 || itemIdx === itemCount) {
        // We intend for there to be overflow by one on both ends of the list.
        // This will be for headers and footers. When returning a header or footer
        // item the section itself is the item.
        return section;
      } else if (itemIdx < itemCount) {
        // If we are in the bounds of the list's data then return the item.
        return props.getItem(sectionData, itemIdx);
      } else {
        itemIdx -= itemCount + 2; // Add two for the header and footer
      }
    }

    return null;
  }

  // $FlowFixMe[missing-local-annot]

  _subExtractor(index) {
    var itemIndex = index;
    var _this$props2 = this.props,
      getItem = _this$props2.getItem,
      getItemCount = _this$props2.getItemCount,
      keyExtractor = _this$props2.keyExtractor,
      sections = _this$props2.sections;
    for (var i = 0; i < sections.length; i++) {
      var section = sections[i];
      var sectionData = section.data;
      var key = section.key || String(i);
      itemIndex -= 1; // The section adds an item for the header
      if (itemIndex >= getItemCount(sectionData) + 1) {
        itemIndex -= getItemCount(sectionData) + 1; // The section adds an item for the footer.
      } else if (itemIndex === -1) {
        return {
          section,
          key: key + ':header',
          index: null,
          header: true,
          trailingSection: sections[i + 1]
        };
      } else if (itemIndex === getItemCount(sectionData)) {
        return {
          section,
          key: key + ':footer',
          index: null,
          header: false,
          trailingSection: sections[i + 1]
        };
      } else {
        var extractor = section.keyExtractor || keyExtractor || defaultKeyExtractor;
        return {
          section,
          key: key + ':' + extractor(getItem(sectionData, itemIndex), itemIndex),
          index: itemIndex,
          leadingItem: getItem(sectionData, itemIndex - 1),
          leadingSection: sections[i - 1],
          trailingItem: getItem(sectionData, itemIndex + 1),
          trailingSection: sections[i + 1]
        };
      }
    }
  }
  _getSeparatorComponent(index, info, listItemCount) {
    info = info || this._subExtractor(index);
    if (!info) {
      return null;
    }
    var ItemSeparatorComponent = info.section.ItemSeparatorComponent || this.props.ItemSeparatorComponent;
    var SectionSeparatorComponent = this.props.SectionSeparatorComponent;
    var isLastItemInList = index === listItemCount - 1;
    var isLastItemInSection = info.index === this.props.getItemCount(info.section.data) - 1;
    if (SectionSeparatorComponent && isLastItemInSection) {
      return SectionSeparatorComponent;
    }
    if (ItemSeparatorComponent && !isLastItemInSection && !isLastItemInList) {
      return ItemSeparatorComponent;
    }
    return null;
  }
}
function ItemWithSeparator(props) {
  var LeadingSeparatorComponent = props.LeadingSeparatorComponent,
    SeparatorComponent = props.SeparatorComponent,
    cellKey = props.cellKey,
    prevCellKey = props.prevCellKey,
    setSelfHighlightCallback = props.setSelfHighlightCallback,
    updateHighlightFor = props.updateHighlightFor,
    setSelfUpdatePropsCallback = props.setSelfUpdatePropsCallback,
    updatePropsFor = props.updatePropsFor,
    item = props.item,
    index = props.index,
    section = props.section,
    inverted = props.inverted;
  var _React$useState = React.useState(false),
    leadingSeparatorHiglighted = _React$useState[0],
    setLeadingSeparatorHighlighted = _React$useState[1];
  var _React$useState2 = React.useState(false),
    separatorHighlighted = _React$useState2[0],
    setSeparatorHighlighted = _React$useState2[1];
  var _React$useState3 = React.useState({
      leadingItem: props.leadingItem,
      leadingSection: props.leadingSection,
      section: props.section,
      trailingItem: props.item,
      trailingSection: props.trailingSection
    }),
    leadingSeparatorProps = _React$useState3[0],
    setLeadingSeparatorProps = _React$useState3[1];
  var _React$useState4 = React.useState({
      leadingItem: props.item,
      leadingSection: props.leadingSection,
      section: props.section,
      trailingItem: props.trailingItem,
      trailingSection: props.trailingSection
    }),
    separatorProps = _React$useState4[0],
    setSeparatorProps = _React$useState4[1];
  React.useEffect(() => {
    setSelfHighlightCallback(cellKey, setSeparatorHighlighted);
    // $FlowFixMe[incompatible-call]
    setSelfUpdatePropsCallback(cellKey, setSeparatorProps);
    return () => {
      setSelfUpdatePropsCallback(cellKey, null);
      setSelfHighlightCallback(cellKey, null);
    };
  }, [cellKey, setSelfHighlightCallback, setSeparatorProps, setSelfUpdatePropsCallback]);
  var separators = {
    highlight: () => {
      setLeadingSeparatorHighlighted(true);
      setSeparatorHighlighted(true);
      if (prevCellKey != null) {
        updateHighlightFor(prevCellKey, true);
      }
    },
    unhighlight: () => {
      setLeadingSeparatorHighlighted(false);
      setSeparatorHighlighted(false);
      if (prevCellKey != null) {
        updateHighlightFor(prevCellKey, false);
      }
    },
    updateProps: (select, newProps) => {
      if (select === 'leading') {
        if (LeadingSeparatorComponent != null) {
          setLeadingSeparatorProps(_objectSpread(_objectSpread({}, leadingSeparatorProps), newProps));
        } else if (prevCellKey != null) {
          // update the previous item's separator
          updatePropsFor(prevCellKey, _objectSpread(_objectSpread({}, leadingSeparatorProps), newProps));
        }
      } else if (select === 'trailing' && SeparatorComponent != null) {
        setSeparatorProps(_objectSpread(_objectSpread({}, separatorProps), newProps));
      }
    }
  };
  var element = props.renderItem({
    item,
    index,
    section,
    separators
  });
  var leadingSeparator = LeadingSeparatorComponent != null && /*#__PURE__*/React.createElement(LeadingSeparatorComponent, _extends({
    highlighted: leadingSeparatorHiglighted
  }, leadingSeparatorProps));
  var separator = SeparatorComponent != null && /*#__PURE__*/React.createElement(SeparatorComponent, _extends({
    highlighted: separatorHighlighted
  }, separatorProps));
  return leadingSeparator || separator ? /*#__PURE__*/React.createElement(View, null, inverted === false ? leadingSeparator : separator, element, inverted === false ? separator : leadingSeparator) : element;
}

/* $FlowFixMe[class-object-subtyping] added when improving typing for this
 * parameters */
// $FlowFixMe[method-unbinding]
export default VirtualizedSectionList;