import * as React from 'react';
import { PrimeReactContext, FilterService, localeOption } from 'primereact/api';
import { useMountEffect } from 'primereact/hooks';
import { Tooltip } from 'primereact/tooltip';
import { mergeProps, IconUtils, ObjectUtils, classNames, DomHandler } from 'primereact/utils';
import { VirtualScroller } from 'primereact/virtualscroller';
import { ComponentBase } from 'primereact/componentbase';
import { SearchIcon } from 'primereact/icons/search';
import { InputText } from 'primereact/inputtext';
import { Ripple } from 'primereact/ripple';

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}

function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}

function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

function _arrayLikeToArray$1(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray$1(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _unsupportedIterableToArray$1(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$1(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray$1(arr) || _nonIterableSpread();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray$1(arr, i) || _nonIterableRest();
}

var ListBoxBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'ListBox',
    className: null,
    dataKey: null,
    disabled: null,
    emptyFilterMessage: null,
    emptyMessage: null,
    filter: false,
    filterIcon: null,
    filterBy: null,
    filterInputProps: null,
    filterLocale: undefined,
    filterMatchMode: 'contains',
    filterPlaceholder: null,
    filterTemplate: null,
    filterValue: null,
    id: null,
    itemTemplate: null,
    listClassName: null,
    listStyle: null,
    metaKeySelection: false,
    multiple: false,
    onChange: null,
    onFilterValueChange: null,
    optionDisabled: null,
    optionGroupChildren: null,
    optionGroupLabel: null,
    optionGroupTemplate: null,
    optionLabel: null,
    optionValue: null,
    options: null,
    style: null,
    tabIndex: 0,
    tooltip: null,
    tooltipOptions: null,
    value: null,
    virtualScrollerOptions: null,
    children: undefined
  }
});

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var ListBoxHeader = /*#__PURE__*/React.memo(function (props) {
  var filterOptions = {
    filter: function filter(e) {
      return onFilter(e);
    },
    reset: function reset() {
      return props.resetFilter();
    }
  };
  var onFilter = function onFilter(event) {
    if (props.onFilter) {
      props.onFilter({
        originalEvent: event,
        value: event.target.value
      });
    }
  };
  var createHeader = function createHeader() {
    var iconClassName = 'p-listbox-filter-icon';
    var filterIconProps = mergeProps({
      className: iconClassName
    }, props.ptm('filterIcon'));
    var icon = props.filterIcon || /*#__PURE__*/React.createElement(SearchIcon, filterIconProps);
    var filterIcon = IconUtils.getJSXIcon(icon, _objectSpread$1({}, filterIconProps), {
      props: props
    });
    var headerProps = mergeProps({
      className: 'p-listbox-header'
    }, props.ptm('header'));
    var filterContainerProps = mergeProps({
      className: 'p-listbox-filter-container'
    }, props.ptm('filterContainer'));
    var content = /*#__PURE__*/React.createElement("div", filterContainerProps, /*#__PURE__*/React.createElement(InputText, _extends({
      type: "text",
      value: props.filter,
      onChange: onFilter,
      className: "p-listbox-filter",
      disabled: props.disabled,
      placeholder: props.filterPlaceholder
    }, props.filterInputProps, {
      pt: props.ptm('filterInput')
    })), filterIcon);
    if (props.filterTemplate) {
      var defaultContentOptions = {
        className: 'p-listbox-filter-container',
        element: content,
        filterOptions: filterOptions,
        filterInputChange: onFilter,
        filterIconClassName: 'p-dropdown-filter-icon',
        props: props
      };
      content = ObjectUtils.getJSXElement(props.filterTemplate, defaultContentOptions);
    }
    return /*#__PURE__*/React.createElement("div", headerProps, content);
  };
  var content = createHeader();
  return /*#__PURE__*/React.createElement(React.Fragment, null, content);
});
ListBoxHeader.displayName = 'ListBoxHeader';

var ListBoxItem = /*#__PURE__*/React.memo(function (props) {
  var getPTOptions = function getPTOptions(key) {
    return props.ptm(key, {
      context: {
        selected: props.selected,
        disabled: props.disabled
      }
    });
  };
  var onClick = function onClick(event) {
    if (props.onClick) {
      props.onClick({
        originalEvent: event,
        option: props.option
      });
    }
    event.preventDefault();
  };
  var onTouchEnd = function onTouchEnd(event) {
    if (props.onTouchEnd) {
      props.onTouchEnd({
        originalEvent: event,
        option: props.option
      });
    }
  };
  var onKeyDown = function onKeyDown(event) {
    var item = event.currentTarget;
    switch (event.which) {
      //down
      case 40:
        var nextItem = findNextItem(item);
        nextItem && nextItem.focus();
        event.preventDefault();
        break;

      //up
      case 38:
        var prevItem = findPrevItem(item);
        prevItem && prevItem.focus();
        event.preventDefault();
        break;

      //enter
      case 13:
        onClick(event);
        event.preventDefault();
        break;
    }
  };
  var findNextItem = function findNextItem(item) {
    var nextItem = item.nextElementSibling;
    return nextItem ? DomHandler.hasClass(nextItem, 'p-disabled') || DomHandler.hasClass(nextItem, 'p-listbox-item-group') ? findNextItem(nextItem) : nextItem : null;
  };
  var findPrevItem = function findPrevItem(item) {
    var prevItem = item.previousElementSibling;
    return prevItem ? DomHandler.hasClass(prevItem, 'p-disabled') || DomHandler.hasClass(prevItem, 'p-listbox-item-group') ? findPrevItem(prevItem) : prevItem : null;
  };
  var className = classNames('p-listbox-item', {
    'p-highlight': props.selected,
    'p-disabled': props.disabled
  }, props.option.className);
  var content = props.template ? ObjectUtils.getJSXElement(props.template, props.option) : props.label;
  var itemProps = mergeProps({
    className: className,
    style: props.style,
    onClick: onClick,
    onTouchEnd: onTouchEnd,
    onKeyDown: onKeyDown,
    tabIndex: '-1',
    'aria-label': props.label,
    key: props.label,
    role: 'option',
    'aria-selected': props.selected,
    'aria-disabled': props.disabled
  }, getPTOptions('item'));
  return /*#__PURE__*/React.createElement("li", itemProps, content, /*#__PURE__*/React.createElement(Ripple, null));
});
ListBoxItem.displayName = 'ListBoxItem';

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var ListBox = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var context = React.useContext(PrimeReactContext);
  var props = ListBoxBase.getProps(inProps, context);
  var _React$useState = React.useState(''),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    filterValueState = _React$useState2[0],
    setFilterValueState = _React$useState2[1];
  var elementRef = React.useRef(null);
  var virtualScrollerRef = React.useRef(null);
  var optionTouched = React.useRef(false);
  var filteredValue = (props.onFilterValueChange ? props.filterValue : filterValueState) || '';
  var hasFilter = filteredValue && filteredValue.trim().length > 0;
  var _ListBoxBase$setMetaD = ListBoxBase.setMetaData({
      props: props,
      state: {
        filterValue: filteredValue
      }
    }),
    ptm = _ListBoxBase$setMetaD.ptm;
  var onOptionSelect = function onOptionSelect(event) {
    var option = event.option;
    if (props.disabled || isOptionDisabled(option)) {
      return;
    }
    props.multiple ? onOptionSelectMultiple(event.originalEvent, option) : onOptionSelectSingle(event.originalEvent, option);
    optionTouched.current = false;
  };
  var onOptionTouchEnd = function onOptionTouchEnd() {
    if (props.disabled) {
      return;
    }
    optionTouched.current = true;
  };
  var onOptionSelectSingle = function onOptionSelectSingle(event, option) {
    var selected = isSelected(option);
    var valueChanged = false;
    var value = null;
    var metaSelection = optionTouched.current ? false : props.metaKeySelection;
    if (metaSelection) {
      var metaKey = event.metaKey || event.ctrlKey;
      if (selected) {
        if (metaKey) {
          value = null;
          valueChanged = true;
        }
      } else {
        value = getOptionValue(option);
        valueChanged = true;
      }
    } else {
      value = selected ? null : getOptionValue(option);
      valueChanged = true;
    }
    if (valueChanged) {
      updateModel(event, value);
    }
  };
  var onOptionSelectMultiple = function onOptionSelectMultiple(event, option) {
    var selected = isSelected(option);
    var valueChanged = false;
    var value = null;
    var metaSelection = optionTouched ? false : props.metaKeySelection;
    if (metaSelection) {
      var metaKey = event.metaKey || event.ctrlKey;
      if (selected) {
        if (metaKey) value = removeOption(option);else value = [getOptionValue(option)];
        valueChanged = true;
      } else {
        value = metaKey ? props.value || [] : [];
        value = [].concat(_toConsumableArray(value), [getOptionValue(option)]);
        valueChanged = true;
      }
    } else {
      if (selected) value = removeOption(option);else value = [].concat(_toConsumableArray(props.value || []), [getOptionValue(option)]);
      valueChanged = true;
    }
    if (valueChanged) {
      props.onChange({
        originalEvent: event,
        value: value,
        stopPropagation: function stopPropagation() {
          event.stopPropagation();
        },
        preventDefault: function preventDefault() {
          event.preventDefault();
        },
        target: {
          name: props.name,
          id: props.id,
          value: value
        }
      });
    }
  };
  var onFilter = function onFilter(event) {
    virtualScrollerRef.current && virtualScrollerRef.current.scrollToIndex(0);
    var originalEvent = event.originalEvent,
      value = event.value;
    if (props.onFilterValueChange) {
      props.onFilterValueChange({
        originalEvent: originalEvent,
        value: value
      });
    } else {
      setFilterValueState(value);
    }
  };
  var resetFilter = function resetFilter() {
    setFilterValueState('');
    props.onFilter && props.onFilter({
      filter: ''
    });
  };
  var updateModel = function updateModel(event, value) {
    if (props.onChange) {
      props.onChange({
        originalEvent: event,
        value: value,
        stopPropagation: function stopPropagation() {
          event.stopPropagation();
        },
        preventDefault: function preventDefault() {
          event.preventDefault();
        },
        target: {
          name: props.name,
          id: props.id,
          value: value
        }
      });
    }
  };
  var removeOption = function removeOption(option) {
    return props.value.filter(function (val) {
      return !ObjectUtils.equals(val, getOptionValue(option), props.dataKey);
    });
  };
  var getSelectedOptionIndex = function getSelectedOptionIndex() {
    if (props.value != null && visibleOptions) {
      if (props.optionGroupLabel) {
        for (var i = 0; i < visibleOptions.length; i++) {
          var selectedOptionIndex = findOptionIndexInList(props.value, getOptionGroupChildren(visibleOptions[i]));
          if (selectedOptionIndex !== -1) {
            return {
              group: i,
              option: selectedOptionIndex
            };
          }
        }
      } else {
        return findOptionIndexInList(props.value, visibleOptions);
      }
    }
    return -1;
  };
  var equalityKey = function equalityKey() {
    return props.optionValue ? null : props.dataKey;
  };
  var findOptionIndexInList = function findOptionIndexInList(value, list) {
    var key = equalityKey();
    return list.findIndex(function (item) {
      return ObjectUtils.equals(value, getOptionValue(item), key);
    });
  };
  var isSelected = function isSelected(option) {
    var optionValue = getOptionValue(option);
    var key = equalityKey();
    return props.multiple && props.value ? props.value.some(function (val) {
      return ObjectUtils.equals(val, optionValue, key);
    }) : ObjectUtils.equals(props.value, optionValue, key);
  };
  var getOptionLabel = function getOptionLabel(option) {
    return props.optionLabel ? ObjectUtils.resolveFieldData(option, props.optionLabel) : option && option['label'] !== undefined ? option['label'] : option;
  };
  var getOptionValue = function getOptionValue(option) {
    return props.optionValue ? ObjectUtils.resolveFieldData(option, props.optionValue) : option && option['value'] !== undefined ? option['value'] : option;
  };
  var getOptionRenderKey = function getOptionRenderKey(option) {
    return props.dataKey ? ObjectUtils.resolveFieldData(option, props.dataKey) : getOptionLabel(option);
  };
  var isOptionDisabled = function isOptionDisabled(option) {
    if (props.optionDisabled) {
      return ObjectUtils.isFunction(props.optionDisabled) ? props.optionDisabled(option) : ObjectUtils.resolveFieldData(option, props.optionDisabled);
    }
    return option && option['disabled'] !== undefined ? option['disabled'] : false;
  };
  var getOptionGroupRenderKey = function getOptionGroupRenderKey(optionGroup) {
    return ObjectUtils.resolveFieldData(optionGroup, props.optionGroupLabel);
  };
  var getOptionGroupLabel = function getOptionGroupLabel(optionGroup) {
    return ObjectUtils.resolveFieldData(optionGroup, props.optionGroupLabel);
  };
  var getOptionGroupChildren = function getOptionGroupChildren(optionGroup) {
    return ObjectUtils.resolveFieldData(optionGroup, props.optionGroupChildren);
  };
  var getVisibleOptions = function getVisibleOptions() {
    if (hasFilter) {
      var filterValue = filteredValue.trim().toLocaleLowerCase(props.filterLocale);
      var searchFields = props.filterBy ? props.filterBy.split(',') : [props.optionLabel || 'label'];
      if (props.optionGroupLabel) {
        var filteredGroups = [];
        var _iterator = _createForOfIteratorHelper(props.options),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var optgroup = _step.value;
            var filteredSubOptions = FilterService.filter(getOptionGroupChildren(optgroup), searchFields, filterValue, props.filterMatchMode, props.filterLocale);
            if (filteredSubOptions && filteredSubOptions.length) {
              filteredGroups.push(_objectSpread(_objectSpread({}, optgroup), {
                items: filteredSubOptions
              }));
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        return filteredGroups;
      } else {
        return FilterService.filter(props.options, searchFields, filterValue, props.filterMatchMode, props.filterLocale);
      }
    } else {
      return props.options;
    }
  };
  var scrollToSelectedIndex = function scrollToSelectedIndex() {
    if (virtualScrollerRef.current) {
      var selectedIndex = getSelectedOptionIndex();
      if (selectedIndex !== -1) {
        setTimeout(function () {
          return virtualScrollerRef.current.scrollToIndex(selectedIndex);
        }, 0);
      }
    }
  };
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      focus: function focus() {
        return DomHandler.focusFirstElement(elementRef.current);
      },
      getElement: function getElement() {
        return elementRef.current;
      },
      getVirtualScroller: function getVirtualScroller() {
        return virtualScrollerRef.current;
      }
    };
  });
  useMountEffect(function () {
    scrollToSelectedIndex();
  });
  var createHeader = function createHeader() {
    return props.filter ? /*#__PURE__*/React.createElement(ListBoxHeader, {
      filter: filteredValue,
      filterIcon: props.filterIcon,
      onFilter: onFilter,
      resetFilter: resetFilter,
      filterTemplate: props.filterTemplate,
      disabled: props.disabled,
      filterPlaceholder: props.filterPlaceholder,
      filterInputProps: props.filterInputProps,
      ptm: ptm
    }) : null;
  };
  var createGroupChildren = function createGroupChildren(optionGroup, style) {
    var groupChildren = getOptionGroupChildren(optionGroup);
    return groupChildren.map(function (option, j) {
      var optionLabel = getOptionLabel(option);
      var optionKey = j + '_' + getOptionRenderKey(option);
      var disabled = isOptionDisabled(option);
      var tabIndex = disabled ? null : props.tabIndex || 0;
      return /*#__PURE__*/React.createElement(ListBoxItem, {
        key: optionKey,
        label: optionLabel,
        option: option,
        style: style,
        template: props.itemTemplate,
        selected: isSelected(option),
        onClick: onOptionSelect,
        onTouchEnd: onOptionTouchEnd,
        tabIndex: tabIndex,
        disabled: disabled,
        ptm: ptm
      });
    });
  };
  var createItem = function createItem(option, index) {
    var scrollerOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var style = {
      height: scrollerOptions.props ? scrollerOptions.props.itemSize : undefined
    };
    if (props.optionGroupLabel) {
      var groupContent = props.optionGroupTemplate ? ObjectUtils.getJSXElement(props.optionGroupTemplate, option, index) : getOptionGroupLabel(option);
      var groupChildrenContent = createGroupChildren(option, style);
      var key = index + '_' + getOptionGroupRenderKey(option);
      var itemGroupProps = mergeProps({
        className: 'p-listbox-item-group',
        style: style,
        role: 'group'
      }, ptm('itemGroup'));
      return /*#__PURE__*/React.createElement(React.Fragment, {
        key: key
      }, /*#__PURE__*/React.createElement("li", itemGroupProps, groupContent), groupChildrenContent);
    } else {
      var optionLabel = getOptionLabel(option);
      var optionKey = index + '_' + getOptionRenderKey(option);
      var disabled = isOptionDisabled(option);
      var tabIndex = disabled ? null : props.tabIndex || 0;
      return /*#__PURE__*/React.createElement(ListBoxItem, {
        key: optionKey,
        label: optionLabel,
        option: option,
        style: style,
        template: props.itemTemplate,
        selected: isSelected(option),
        onClick: onOptionSelect,
        onTouchEnd: onOptionTouchEnd,
        tabIndex: tabIndex,
        disabled: disabled,
        ptm: ptm
      });
    }
  };
  var createItems = function createItems() {
    if (ObjectUtils.isNotEmpty(visibleOptions)) {
      return visibleOptions.map(createItem);
    } else if (hasFilter) {
      return createEmptyMessage(props.emptyFilterMessage, true);
    }
    return createEmptyMessage(props.emptyMessage);
  };
  var createEmptyMessage = function createEmptyMessage(emptyMessage, isFilter) {
    var emptyMessageProps = mergeProps({
      className: 'p-listbox-empty-message'
    }, ptm('emptyMessage'));
    var message = ObjectUtils.getJSXElement(emptyMessage, props) || localeOption(isFilter ? 'emptyFilterMessage' : 'emptyMessage');
    return /*#__PURE__*/React.createElement("li", emptyMessageProps, message);
  };
  var createList = function createList() {
    if (props.virtualScrollerOptions) {
      var virtualScrollerProps = _objectSpread(_objectSpread({}, props.virtualScrollerOptions), {
        items: visibleOptions,
        onLazyLoad: function onLazyLoad(event) {
          return props.virtualScrollerOptions.onLazyLoad(_objectSpread(_objectSpread({}, event), {
            filter: visibleOptions
          }));
        },
        itemTemplate: function itemTemplate(item, options) {
          return item && createItem(item, options.index, options);
        },
        contentTemplate: function contentTemplate(options) {
          var className = classNames('p-listbox-list', options.className);
          var listProps = mergeProps(_objectSpread({
            ref: options.contentRef,
            style: options.style,
            className: className,
            role: 'listbox',
            'aria-multiselectable': props.multiple
          }, ariaProps), ptm('list'));
          return /*#__PURE__*/React.createElement("ul", listProps, options.children);
        }
      });
      return /*#__PURE__*/React.createElement(VirtualScroller, _extends({
        ref: virtualScrollerRef
      }, virtualScrollerProps, {
        pt: ptm('virtualScroller')
      }));
    } else {
      var items = createItems();
      var listProps = mergeProps(_objectSpread({
        className: 'p-listbox-list',
        role: 'listbox',
        'aria-multiselectable': props.multiple
      }, ariaProps), ptm('list'));
      return /*#__PURE__*/React.createElement("ul", listProps, items);
    }
  };
  var visibleOptions = getVisibleOptions();
  var hasTooltip = ObjectUtils.isNotEmpty(props.tooltip);
  var otherProps = ListBoxBase.getOtherProps(props);
  var ariaProps = ObjectUtils.reduceKeys(otherProps, DomHandler.ARIA_PROPS);
  var className = classNames('p-listbox p-component', {
    'p-disabled': props.disabled
  }, props.className);
  var listClassName = classNames('p-listbox-list-wrapper', props.listClassName);
  var list = createList();
  var header = createHeader();
  var wrapperProps = mergeProps({
    className: listClassName,
    style: props.listStyle
  }, ptm('wrapper'));
  var rootProps = mergeProps({
    ref: elementRef,
    id: props.id,
    className: className,
    style: props.style
  }, ListBoxBase.getOtherProps(props), ptm('root'));
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", rootProps, header, /*#__PURE__*/React.createElement("div", wrapperProps, list)), hasTooltip && /*#__PURE__*/React.createElement(Tooltip, _extends({
    target: elementRef,
    content: props.tooltip
  }, props.tooltipOptions, {
    pt: ptm('tooltip')
  })));
}));
ListBox.displayName = 'ListBox';

export { ListBox };
