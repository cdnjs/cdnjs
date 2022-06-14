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

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import { keyExtractor as defaultKeyExtractor } from '../VirtualizeUtils';
import View from '../../../exports/View';
import VirtualizedList from '../VirtualizedList';
import * as React from 'react';
import invariant from 'fbjs/lib/invariant';

/**
 * Right now this just flattens everything into one list and uses VirtualizedList under the
 * hood. The only operation that might not scale well is concatting the data arrays of all the
 * sections when new props are received, which should be plenty fast for up to ~10,000 items.
 */
var VirtualizedSectionList = /*#__PURE__*/function (_React$PureComponent) {
  _inheritsLoose(VirtualizedSectionList, _React$PureComponent);

  function VirtualizedSectionList() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args)) || this;

    _this._keyExtractor = function (item, index) {
      var info = _this._subExtractor(index);

      return info && info.key || String(index);
    };

    _this._convertViewable = function (viewable) {
      var _info$index;

      invariant(viewable.index != null, 'Received a broken ViewToken');

      var info = _this._subExtractor(viewable.index);

      if (!info) {
        return null;
      }

      var keyExtractorWithNullableIndex = info.section.keyExtractor;
      var keyExtractorWithNonNullableIndex = _this.props.keyExtractor || defaultKeyExtractor;
      var key = keyExtractorWithNullableIndex != null ? keyExtractorWithNullableIndex(viewable.item, info.index) : keyExtractorWithNonNullableIndex(viewable.item, (_info$index = info.index) !== null && _info$index !== void 0 ? _info$index : 0);
      return _objectSpread(_objectSpread({}, viewable), {}, {
        index: info.index,
        key: key,
        section: info.section
      });
    };

    _this._onViewableItemsChanged = function (_ref) {
      var viewableItems = _ref.viewableItems,
          changed = _ref.changed;
      var onViewableItemsChanged = _this.props.onViewableItemsChanged;

      if (onViewableItemsChanged != null) {
        onViewableItemsChanged({
          viewableItems: viewableItems.map(_this._convertViewable, _assertThisInitialized(_this)).filter(Boolean),
          changed: changed.map(_this._convertViewable, _assertThisInitialized(_this)).filter(Boolean)
        });
      }
    };

    _this._renderItem = function (listItemCount) {
      return function (_ref2) {
        var item = _ref2.item,
            index = _ref2.index;

        var info = _this._subExtractor(index);

        if (!info) {
          return null;
        }

        var infoIndex = info.index;

        if (infoIndex == null) {
          var section = info.section;

          if (info.header === true) {
            var renderSectionHeader = _this.props.renderSectionHeader;
            return renderSectionHeader ? renderSectionHeader({
              section: section
            }) : null;
          } else {
            var renderSectionFooter = _this.props.renderSectionFooter;
            return renderSectionFooter ? renderSectionFooter({
              section: section
            }) : null;
          }
        } else {
          var renderItem = info.section.renderItem || _this.props.renderItem;

          var SeparatorComponent = _this._getSeparatorComponent(index, info, listItemCount);

          invariant(renderItem, 'no renderItem!');
          return /*#__PURE__*/React.createElement(ItemWithSeparator, {
            SeparatorComponent: SeparatorComponent,
            LeadingSeparatorComponent: infoIndex === 0 ? _this.props.SectionSeparatorComponent : undefined,
            cellKey: info.key,
            index: infoIndex,
            item: item,
            leadingItem: info.leadingItem,
            leadingSection: info.leadingSection,
            prevCellKey: (_this._subExtractor(index - 1) || {}).key // Callback to provide updateHighlight for this item
            ,
            setSelfHighlightCallback: _this._setUpdateHighlightFor,
            setSelfUpdatePropsCallback: _this._setUpdatePropsFor // Provide child ability to set highlight/updateProps for previous item using prevCellKey
            ,
            updateHighlightFor: _this._updateHighlightFor,
            updatePropsFor: _this._updatePropsFor,
            renderItem: renderItem,
            section: info.section,
            trailingItem: info.trailingItem,
            trailingSection: info.trailingSection,
            inverted: !!_this.props.inverted
          });
        }
      };
    };

    _this._updatePropsFor = function (cellKey, value) {
      var updateProps = _this._updatePropsMap[cellKey];

      if (updateProps != null) {
        updateProps(value);
      }
    };

    _this._updateHighlightFor = function (cellKey, value) {
      var updateHighlight = _this._updateHighlightMap[cellKey];

      if (updateHighlight != null) {
        updateHighlight(value);
      }
    };

    _this._setUpdateHighlightFor = function (cellKey, updateHighlightFn) {
      if (updateHighlightFn != null) {
        _this._updateHighlightMap[cellKey] = updateHighlightFn;
      } else {
        delete _this._updateHighlightFor[cellKey];
      }
    };

    _this._setUpdatePropsFor = function (cellKey, updatePropsFn) {
      if (updatePropsFn != null) {
        _this._updatePropsMap[cellKey] = updatePropsFn;
      } else {
        delete _this._updatePropsMap[cellKey];
      }
    };

    _this._updateHighlightMap = {};
    _this._updatePropsMap = {};

    _this._captureRef = function (ref) {
      _this._listRef = ref;
    };

    return _this;
  }

  var _proto = VirtualizedSectionList.prototype;

  _proto.scrollToLocation = function scrollToLocation(params) {
    var index = params.itemIndex;

    for (var i = 0; i < params.sectionIndex; i++) {
      index += this.props.getItemCount(this.props.sections[i].data) + 2;
    }

    var viewOffset = params.viewOffset || 0;

    if (this._listRef == null) {
      return;
    }

    if (params.itemIndex > 0 && this.props.stickySectionHeadersEnabled) {
      // $FlowFixMe[prop-missing] Cannot access private property
      var frame = this._listRef._getFrameMetricsApprox(index - params.itemIndex);

      viewOffset += frame.length;
    }

    var toIndexParams = _objectSpread(_objectSpread({}, params), {}, {
      viewOffset: viewOffset,
      index: index
    });

    this._listRef.scrollToIndex(toIndexParams);
  };

  _proto.getListRef = function getListRef() {
    return this._listRef;
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props = this.props,
        ItemSeparatorComponent = _this$props.ItemSeparatorComponent,
        SectionSeparatorComponent = _this$props.SectionSeparatorComponent,
        _renderItem = _this$props.renderItem,
        renderSectionFooter = _this$props.renderSectionFooter,
        renderSectionHeader = _this$props.renderSectionHeader,
        _sections = _this$props.sections,
        stickySectionHeadersEnabled = _this$props.stickySectionHeadersEnabled,
        passThroughProps = _objectWithoutPropertiesLoose(_this$props, ["ItemSeparatorComponent", "SectionSeparatorComponent", "renderItem", "renderSectionFooter", "renderSectionHeader", "sections", "stickySectionHeadersEnabled"]);

    var listHeaderOffset = this.props.ListHeaderComponent ? 1 : 0;
    var stickyHeaderIndices = this.props.stickySectionHeadersEnabled ? [] : undefined;
    var itemCount = 0;

    for (var _iterator = _createForOfIteratorHelperLoose(this.props.sections), _step; !(_step = _iterator()).done;) {
      var section = _step.value;

      // Track the section header indices
      if (stickyHeaderIndices != null) {
        stickyHeaderIndices.push(itemCount + listHeaderOffset);
      } // Add two for the section header and footer.


      itemCount += 2;
      itemCount += this.props.getItemCount(section.data);
    }

    var renderItem = this._renderItem(itemCount);

    return /*#__PURE__*/React.createElement(VirtualizedList, _extends({}, passThroughProps, {
      keyExtractor: this._keyExtractor,
      stickyHeaderIndices: stickyHeaderIndices,
      renderItem: renderItem,
      data: this.props.sections,
      getItem: function getItem(sections, index) {
        return _this2._getItem(_this2.props, sections, index);
      },
      getItemCount: function getItemCount() {
        return itemCount;
      },
      onViewableItemsChanged: this.props.onViewableItemsChanged ? this._onViewableItemsChanged : undefined,
      ref: this._captureRef
    }));
  };

  _proto._getItem = function _getItem(props, sections, index) {
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
  };

  _proto._subExtractor = function _subExtractor(index) {
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
          section: section,
          key: key + ':header',
          index: null,
          header: true,
          trailingSection: sections[i + 1]
        };
      } else if (itemIndex === getItemCount(sectionData)) {
        return {
          section: section,
          key: key + ':footer',
          index: null,
          header: false,
          trailingSection: sections[i + 1]
        };
      } else {
        var extractor = section.keyExtractor || keyExtractor || defaultKeyExtractor;
        return {
          section: section,
          key: key + ':' + extractor(getItem(sectionData, itemIndex), itemIndex),
          index: itemIndex,
          leadingItem: getItem(sectionData, itemIndex - 1),
          leadingSection: sections[i - 1],
          trailingItem: getItem(sectionData, itemIndex + 1),
          trailingSection: sections[i + 1]
        };
      }
    }
  };

  _proto._getSeparatorComponent = function _getSeparatorComponent(index, info, listItemCount) {
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
  };

  return VirtualizedSectionList;
}(React.PureComponent);

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

  React.useEffect(function () {
    setSelfHighlightCallback(cellKey, setSeparatorHighlighted);
    setSelfUpdatePropsCallback(cellKey, setSeparatorProps);
    return function () {
      setSelfUpdatePropsCallback(cellKey, null);
      setSelfHighlightCallback(cellKey, null);
    };
  }, [cellKey, setSelfHighlightCallback, setSeparatorProps, setSelfUpdatePropsCallback]);
  var separators = {
    highlight: function highlight() {
      setLeadingSeparatorHighlighted(true);
      setSeparatorHighlighted(true);

      if (prevCellKey != null) {
        updateHighlightFor(prevCellKey, true);
      }
    },
    unhighlight: function unhighlight() {
      setLeadingSeparatorHighlighted(false);
      setSeparatorHighlighted(false);

      if (prevCellKey != null) {
        updateHighlightFor(prevCellKey, false);
      }
    },
    updateProps: function updateProps(select, newProps) {
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
    item: item,
    index: index,
    section: section,
    separators: separators
  });
  var leadingSeparator = LeadingSeparatorComponent != null && /*#__PURE__*/React.createElement(LeadingSeparatorComponent, _extends({
    highlighted: leadingSeparatorHiglighted
  }, leadingSeparatorProps));
  var separator = SeparatorComponent != null && /*#__PURE__*/React.createElement(SeparatorComponent, _extends({
    highlighted: separatorHighlighted
  }, separatorProps));
  return leadingSeparator || separator ? /*#__PURE__*/React.createElement(View, null, inverted === false ? leadingSeparator : separator, element, inverted === false ? separator : leadingSeparator) : element;
}

export default VirtualizedSectionList;