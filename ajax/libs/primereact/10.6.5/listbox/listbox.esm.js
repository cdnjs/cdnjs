'use client';
import * as React from 'react';
import { PrimeReactContext, FilterService, localeOption } from 'primereact/api';
import { ComponentBase, useHandleStyle } from 'primereact/componentbase';
import { useMergeProps, useMountEffect } from 'primereact/hooks';
import { Tooltip } from 'primereact/tooltip';
import { classNames, IconUtils, ObjectUtils, DomHandler, UniqueComponentId } from 'primereact/utils';
import { VirtualScroller } from 'primereact/virtualscroller';
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

function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
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

function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray$1(arr, i) || _nonIterableRest();
}

var classes = {
  itemGroup: 'p-listbox-item-group',
  emptyMessage: 'p-listbox-empty-message',
  list: 'p-listbox-list',
  wrapper: function wrapper(_ref) {
    var props = _ref.props;
    return classNames('p-listbox-list-wrapper', props.listClassName);
  },
  root: function root(_ref2) {
    var props = _ref2.props;
    return classNames('p-listbox p-component', {
      'p-disabled': props.disabled,
      'p-invalid': props.invalid
    }, props.className);
  },
  item: function item(_ref3) {
    var props = _ref3.props;
    return classNames('p-listbox-item', {
      'p-highlight': props.selected,
      'p-focus': props.focusedOptionIndex === props.index,
      'p-disabled': props.disabled
    }, props.option.className);
  },
  filterContainer: 'p-listbox-filter-container',
  filterIcon: 'p-listbox-filter-icon',
  filterInput: 'p-listbox-filter',
  header: 'p-listbox-header'
};
var styles = "\n@layer primereact {\n    .p-listbox-list-wrapper {\n        overflow: auto;\n    }\n    \n    .p-listbox-list {\n        list-style-type: none;\n        margin: 0;\n        padding: 0;\n    }\n    \n    .p-listbox-item {\n        cursor: pointer;\n        position: relative;\n        overflow: hidden;\n        outline: none;\n    }\n    \n    .p-listbox-filter-container {\n        position: relative;\n    }\n    \n    .p-listbox-filter-icon {\n        position: absolute;\n        top: 50%;\n        margin-top: -.5rem;\n    }\n    \n    .p-listbox-filter {\n        width: 100%;\n    }\n}\n";
var inlineStyles = {
  itemGroup: function itemGroup(_ref4) {
    var scrollerOptions = _ref4.scrollerOptions;
    return {
      height: scrollerOptions.props ? scrollerOptions.props.itemSize : undefined
    };
  },
  list: function list(_ref5) {
    var options = _ref5.options,
      props = _ref5.props;
    return props.virtualScrollerOptions ? options.style : undefined;
  }
};
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
    focusOnHover: true,
    id: null,
    itemTemplate: null,
    invalid: false,
    listClassName: null,
    listStyle: null,
    metaKeySelection: false,
    selectOnFocus: false,
    autoOptionFocus: false,
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
  },
  css: {
    classes: classes,
    styles: styles,
    inlineStyles: inlineStyles
  }
});

function ownKeys$1(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$1(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$1(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var ListBoxHeader = /*#__PURE__*/React.memo(function (props) {
  var mergeProps = useMergeProps();
  var _props$ptCallbacks = props.ptCallbacks,
    ptm = _props$ptCallbacks.ptm,
    cx = _props$ptCallbacks.cx;
  var getPTOptions = function getPTOptions(key, options) {
    return ptm(key, _objectSpread$1({
      hostName: props.hostName
    }, options));
  };
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
    var filterIconProps = mergeProps({
      className: cx('filterIcon')
    }, getPTOptions('filterIcon'));
    var icon = props.filterIcon || /*#__PURE__*/React.createElement(SearchIcon, filterIconProps);
    var filterIcon = IconUtils.getJSXIcon(icon, _objectSpread$1({}, filterIconProps), {
      props: props
    });
    var headerProps = mergeProps({
      className: cx('header')
    }, getPTOptions('header'));
    var filterContainerProps = mergeProps({
      className: cx('filterContainer')
    }, getPTOptions('filterContainer'));
    var content = /*#__PURE__*/React.createElement("div", filterContainerProps, /*#__PURE__*/React.createElement(InputText, _extends({
      type: "text",
      value: props.filter,
      onChange: onFilter,
      className: cx('filterInput'),
      disabled: props.disabled,
      placeholder: props.filterPlaceholder
    }, props.filterInputProps, {
      pt: ptm('filterInput'),
      unstyled: props.unstyled,
      __parentMetadata: {
        parent: props.metaData
      }
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
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    focusedState = _React$useState2[0],
    setFocusedState = _React$useState2[1];
  var mergeProps = useMergeProps();
  var _props$ptCallbacks = props.ptCallbacks,
    ptm = _props$ptCallbacks.ptm,
    cx = _props$ptCallbacks.cx;
  var getPTOptions = function getPTOptions(key) {
    return ptm(key, {
      hostName: props.hostName,
      context: {
        selected: props.selected,
        disabled: props.disabled,
        focused: focusedState,
        focusedOptionIndex: props.focusedOptionIndex
      }
    });
  };
  var onFocus = function onFocus(event) {
    setFocusedState(true);
  };
  var onBlur = function onBlur(event) {
    setFocusedState(false);
  };
  var onTouchEnd = function onTouchEnd(event) {
    if (props.onTouchEnd) {
      props.onTouchEnd({
        originalEvent: event,
        option: props.option
      });
    }
  };
  var content = props.template ? ObjectUtils.getJSXElement(props.template, props.option) : props.label;
  var itemProps = mergeProps({
    id: props.id,
    className: cx('item', {
      props: props
    }),
    style: props.style,
    onClick: function onClick(event) {
      return props.onClick(event, props.option, props.index);
    },
    onTouchEnd: onTouchEnd,
    onFocus: onFocus,
    onBlur: onBlur,
    tabIndex: '-1',
    onMouseDown: function onMouseDown(event) {
      return props.onOptionMouseDown(event, props.index);
    },
    onMouseMove: function onMouseMove(event) {
      return props.onOptionMouseMove(event, props.index);
    },
    'aria-label': props.label,
    key: props.optionKey,
    role: 'option',
    'aria-selected': props.selected,
    'aria-disabled': props.disabled,
    'data-p-disabled': props.disabled
  }, getPTOptions('item'));
  return /*#__PURE__*/React.createElement("li", itemProps, content, /*#__PURE__*/React.createElement(Ripple, null));
});
ListBoxItem.displayName = 'ListBoxItem';

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var ListBox = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var mergeProps = useMergeProps();
  var context = React.useContext(PrimeReactContext);
  var props = ListBoxBase.getProps(inProps, context);
  var _React$useState = React.useState(null),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    focusedOptionIndex = _React$useState2[0],
    setFocusedOptionIndex = _React$useState2[1];
  var searchTimeout = React.useRef(null);
  var firstHiddenFocusableElement = React.useRef(null);
  var lastHiddenFocusableElement = React.useRef(null);
  var _React$useState3 = React.useState(-1),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    startRangeIndex = _React$useState4[0],
    setStartRangeIndex = _React$useState4[1];
  var _React$useState5 = React.useState(false),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    focused = _React$useState6[0],
    setFocused = _React$useState6[1];
  var _React$useState7 = React.useState(''),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    filterValueState = _React$useState8[0],
    setFilterValueState = _React$useState8[1];
  var _React$useState9 = React.useState(''),
    _React$useState10 = _slicedToArray(_React$useState9, 2),
    searchValue = _React$useState10[0],
    setSearchValue = _React$useState10[1];
  var elementRef = React.useRef(null);
  var virtualScrollerRef = React.useRef(null);
  var id = React.useRef(null);
  var listRef = React.useRef(null);
  var optionTouched = React.useRef(false);
  var filteredValue = (props.onFilterValueChange ? props.filterValue : filterValueState) || '';
  var hasFilter = filteredValue && filteredValue.trim().length > 0;
  var metaData = {
    props: props,
    state: {
      filterValue: filteredValue
    }
  };
  var ptCallbacks = ListBoxBase.setMetaData(metaData);
  useHandleStyle(ListBoxBase.css.styles, ptCallbacks.isUnstyled, {
    name: 'listbox'
  });
  var onOptionSelect = function onOptionSelect(event, option) {
    var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;
    if (props.disabled || isOptionDisabled(option)) {
      return;
    }
    props.multiple ? onOptionSelectMultiple(event.originalEvent, option) : onOptionSelectSingle(event.originalEvent, option);
    optionTouched.current = false;
    index !== -1 && setFocusedOptionIndex(index);
  };
  var onOptionMouseDown = function onOptionMouseDown(event, index) {
    changeFocusedOptionIndex(event, index);
  };
  var onOptionMouseMove = function onOptionMouseMove(event, index) {
    if (props.focusOnHover && focused) {
      changeFocusedOptionIndex(event, index);
    }
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
        if (metaKey) {
          value = removeOption(option);
        } else {
          value = [getOptionValue(option)];
        }
        valueChanged = true;
      } else {
        value = metaKey ? props.value || [] : [];
        value = [].concat(_toConsumableArray(value), [getOptionValue(option)]);
        valueChanged = true;
      }
    } else {
      if (selected) {
        value = removeOption(option);
      } else {
        value = [].concat(_toConsumableArray(props.value || []), [getOptionValue(option)]);
      }
      valueChanged = true;
    }
    if (valueChanged) {
      props.onChange({
        originalEvent: event,
        value: value,
        stopPropagation: function stopPropagation() {
          event === null || event === void 0 || event.stopPropagation();
        },
        preventDefault: function preventDefault() {
          event === null || event === void 0 || event.preventDefault();
        },
        target: {
          name: props.name,
          id: props.id,
          value: value
        }
      });
    }
  };
  var hasSelectedOption = function hasSelectedOption() {
    return ObjectUtils.isNotEmpty(props.value);
  };
  var isOptionGroup = function isOptionGroup(option) {
    return props.optionGroupLabel && option.optionGroup && option.group;
  };
  var isValidOption = function isValidOption(option) {
    return ObjectUtils.isNotEmpty(option) && !(isOptionDisabled(option) || isOptionGroup(option));
  };
  var isValidSelectedOption = function isValidSelectedOption(option) {
    return isValidOption(option) && isSelected(option);
  };
  var findFirstOptionIndex = function findFirstOptionIndex() {
    return visibleOptions.findIndex(function (option) {
      return isValidOption(option);
    });
  };
  var findLastSelectedOptionIndex = function findLastSelectedOptionIndex() {
    return hasSelectedOption() ? ObjectUtils.findLastIndex(visibleOptions, function (option) {
      return isValidSelectedOption(option);
    }) : -1;
  };
  var findSelectedOptionIndex = function findSelectedOptionIndex() {
    if (hasSelectedOption()) {
      if (props.multiple) {
        var _loop = function _loop() {
            var value = props.value[index];
            var matchedOptionIndex = visibleOptions.findIndex(function (option) {
              return isValidSelectedOption(option) && isEquals(value, getOptionValue(option));
            });
            if (matchedOptionIndex > -1) {
              return {
                v: matchedOptionIndex
              };
            }
          },
          _ret;
        for (var index = props.value.length - 1; index >= 0; index--) {
          _ret = _loop();
          if (_ret) return _ret.v;
        }
      } else {
        return visibleOptions.findIndex(function (option) {
          return isValidSelectedOption(option);
        });
      }
    }
    return -1;
  };
  var findFirstSelectedOptionIndex = function findFirstSelectedOptionIndex() {
    return hasSelectedOption() ? visibleOptions.findIndex(function (option) {
      return isValidSelectedOption(option);
    }) : -1;
  };
  var findLastOptionIndex = function findLastOptionIndex() {
    return ObjectUtils.findLastIndex(visibleOptions, function (option) {
      return isValidOption(option);
    });
  };
  var findNextOptionIndex = function findNextOptionIndex(index) {
    var matchedOptionIndex = index < visibleOptions.length - 1 ? visibleOptions.slice(index + 1).findIndex(function (option) {
      return isValidOption(option);
    }) : -1;
    return matchedOptionIndex > -1 ? matchedOptionIndex + index + 1 : index;
  };
  var findPrevOptionIndex = function findPrevOptionIndex(index) {
    var matchedOptionIndex = index > 0 ? ObjectUtils.findLastIndex(visibleOptions.slice(0, index), function (option) {
      return isValidOption(option);
    }) : -1;
    return matchedOptionIndex > -1 ? matchedOptionIndex : index;
  };
  var focusedOptionId = function focusedOptionId() {
    return focusedOptionIndex !== -1 ? "".concat(id.current, "_").concat(focusedOptionIndex) : null;
  };
  var findNearestSelectedOptionIndex = function findNearestSelectedOptionIndex(index) {
    var firstCheckUp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var matchedOptionIndex = -1;
    if (hasSelectedOption()) {
      if (firstCheckUp) {
        matchedOptionIndex = findPrevSelectedOptionIndex(index);
        matchedOptionIndex = matchedOptionIndex === -1 ? findNextSelectedOptionIndex(index) : matchedOptionIndex;
      } else {
        matchedOptionIndex = findNextSelectedOptionIndex(index);
        matchedOptionIndex = matchedOptionIndex === -1 ? findPrevSelectedOptionIndex(index) : matchedOptionIndex;
      }
    }
    return matchedOptionIndex > -1 ? matchedOptionIndex : index;
  };
  var isOptionMatched = function isOptionMatched(option) {
    var _getOptionLabel;
    return isValidOption(option) && ((_getOptionLabel = getOptionLabel(option)) === null || _getOptionLabel === void 0 ? void 0 : _getOptionLabel.toLocaleLowerCase(props.filterLocale).startsWith(searchValue.toLocaleLowerCase(props.filterLocale)));
  };
  var searchOptions = function searchOptions(event, _char) {
    setSearchValue((searchValue || '') + _char);
    var optionIndex = -1;
    if (ObjectUtils.isNotEmpty(searchValue)) {
      if (focusedOptionIndex !== -1) {
        optionIndex = visibleOptions.slice(focusedOptionIndex).findIndex(function (option) {
          return isOptionMatched(option);
        });
        optionIndex = optionIndex === -1 ? visibleOptions.slice(0, focusedOptionIndex).findIndex(function (option) {
          return isOptionMatched(option);
        }) : optionIndex + focusedOptionIndex;
      } else {
        optionIndex = visibleOptions.findIndex(function (option) {
          return isOptionMatched(option);
        });
      }
      if (optionIndex === -1 && focusedOptionIndex === -1) {
        optionIndex = findFirstFocusedOptionIndex();
      }
      if (optionIndex !== -1) {
        changeFocusedOptionIndex(event, optionIndex);
      }
    }
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }
    searchTimeout.current = setTimeout(function () {
      setSearchValue('');
      searchTimeout.current = null;
    }, 500);
  };
  var findNextSelectedOptionIndex = function findNextSelectedOptionIndex(index) {
    var matchedOptionIndex = hasSelectedOption() && index < visibleOptions.length - 1 ? visibleOptions.slice(index + 1).findIndex(function (option) {
      return isValidSelectedOption(option);
    }) : -1;
    return matchedOptionIndex > -1 ? matchedOptionIndex + index + 1 : -1;
  };
  var findPrevSelectedOptionIndex = function findPrevSelectedOptionIndex(index) {
    var matchedOptionIndex = hasSelectedOption() && index > 0 ? ObjectUtils.findLastIndex(visibleOptions.slice(0, index), function (option) {
      return isValidSelectedOption(option);
    }) : -1;
    return matchedOptionIndex > -1 ? matchedOptionIndex : -1;
  };
  var onOptionSelectRange = function onOptionSelectRange(event) {
    var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;
    var end = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;
    start === -1 && (start = findNearestSelectedOptionIndex(end, true));
    end === -1 && (end = findNearestSelectedOptionIndex(start));
    if (start !== -1 && end !== -1) {
      var rangeStart = Math.min(start, end);
      var rangeEnd = Math.max(start, end);
      var value = visibleOptions.slice(rangeStart, rangeEnd + 1).filter(function (option) {
        return isValidOption(option);
      }).map(function (option) {
        return getOptionValue(option);
      });
      updateModel(event, value);
    }
  };
  var findFirstFocusedOptionIndex = function findFirstFocusedOptionIndex() {
    var selectedIndex = findFirstSelectedOptionIndex();
    return selectedIndex < 0 ? findFirstOptionIndex() : selectedIndex;
  };
  var findLastFocusedOptionIndex = function findLastFocusedOptionIndex() {
    var selectedIndex = findLastSelectedOptionIndex();
    return selectedIndex < 0 ? findLastOptionIndex() : selectedIndex;
  };
  var changeFocusedOptionIndex = function changeFocusedOptionIndex(event, index) {
    if (focusedOptionIndex !== index) {
      setFocusedOptionIndex(index);
      scrollInView();
      if (event && props.selectOnFocus && !props.multiple) {
        onOptionSelect(event, visibleOptions[index]);
      }
    }
  };
  var onArrowDownKey = function onArrowDownKey(event) {
    var optionIndex = focusedOptionIndex !== -1 ? findNextOptionIndex(focusedOptionIndex) : findFirstFocusedOptionIndex();
    if (props.multiple && event.shiftKey) {
      onOptionSelectRange(event, startRangeIndex, optionIndex);
    }
    changeFocusedOptionIndex(event, optionIndex);
    event.preventDefault();
  };
  var onArrowUpKey = function onArrowUpKey(event) {
    var optionIndex = focusedOptionIndex !== -1 ? findPrevOptionIndex(focusedOptionIndex) : findLastFocusedOptionIndex();
    if (props.multiple && event.shiftKey) {
      onOptionSelectRange(event, optionIndex, startRangeIndex);
    }
    changeFocusedOptionIndex(event, optionIndex);
    event.preventDefault();
  };
  var onEnterKey = function onEnterKey(event) {
    if (focusedOptionIndex !== -1) {
      if (props.multiple && event.shiftKey) {
        onOptionSelectRange(event, focusedOptionIndex);
      } else {
        onOptionSelect(event, visibleOptions[focusedOptionIndex]);
      }
    }
    event.preventDefault();
  };
  var onSpaceKey = function onSpaceKey(event) {
    onEnterKey(event);
  };
  var onShiftKey = function onShiftKey() {
    setStartRangeIndex(focusedOptionIndex);
  };
  var onHomeKey = function onHomeKey(event) {
    var pressedInInputText = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    if (pressedInInputText) {
      event.currentTarget.setSelectionRange(0, 0);
      setFocusedOptionIndex(-1);
    } else {
      var metaKey = event.metaKey || event.ctrlKey;
      var optionIndex = findFirstOptionIndex();
      if (props.multiple && event.shiftKey && metaKey) {
        onOptionSelectRange(event, optionIndex, startRangeIndex);
      }
      changeFocusedOptionIndex(event, optionIndex);
    }
    event.preventDefault();
  };
  var onEndKey = function onEndKey(event) {
    var pressedInInputText = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    if (pressedInInputText) {
      var target = event.currentTarget;
      var len = target.value.length;
      target.setSelectionRange(len, len);
      setFocusedOptionIndex(-1);
    } else {
      var metaKey = event.metaKey || event.ctrlKey;
      var optionIndex = findLastOptionIndex();
      if (props.multiple && event.shiftKey && metaKey) {
        onOptionSelectRange(event, startRangeIndex, optionIndex);
      }
      changeFocusedOptionIndex(event, optionIndex);
    }
    event.preventDefault();
  };
  var onPageUpKey = function onPageUpKey(event) {
    scrollInView(0);
    event.preventDefault();
  };
  var onPageDownKey = function onPageDownKey(event) {
    scrollInView(visibleOptions.length - 1);
    event.preventDefault();
  };
  var onListKeyDown = function onListKeyDown(event) {
    var metaKey = event.metaKey || event.ctrlKey;
    switch (event.code) {
      case 'ArrowDown':
        onArrowDownKey(event);
        break;
      case 'ArrowUp':
        onArrowUpKey(event);
        break;
      case 'Home':
        onHomeKey(event);
        break;
      case 'End':
        onEndKey(event);
        break;
      case 'PageDown':
        onPageDownKey(event);
        break;
      case 'PageUp':
        onPageUpKey(event);
        break;
      case 'Enter':
      case 'NumpadEnter':
      case 'Space':
        onSpaceKey(event);
        event.preventDefault();
        break;
      case 'Tab':
        // NOOP
        break;
      case 'ShiftLeft':
      case 'ShiftRight':
        onShiftKey();
        break;
      default:
        if (props.multiple && event.code === 'KeyA' && metaKey) {
          var value = visibleOptions.filter(function (option) {
            return isValidOption(option);
          }).map(function (option) {
            return getOptionValue(option);
          });
          updateModel(event, value);
          event.preventDefault();
          break;
        }
        if (!metaKey && ObjectUtils.isPrintableCharacter(event.key)) {
          searchOptions(event, event.key);
          event.preventDefault();
        }
        break;
    }
  };
  var scrollInView = function scrollInView() {
    var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;
    setTimeout(function () {
      var idx = index !== -1 ? "".concat(id.current, "_").concat(index) : focusedOptionId();
      var element = listRef.current.querySelector("li[id=\"".concat(idx, "\"]"));
      if (element) {
        element.scrollIntoView({
          block: 'nearest',
          inline: 'nearest',
          behavior: 'smooth'
        });
      } else if (props.virtualScrollerOptions) {
        virtualScrollerRef.current && virtualScrollerRef.current.scrollToIndex(index !== -1 ? index : focusedOptionIndex);
      }
    }, 0);
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
  var autoUpdateModel = function autoUpdateModel() {
    var isFocus = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : focused;
    if (props.selectOnFocus && props.autoOptionFocus && !hasSelectedOption() && !props.multiple && isFocus) {
      var currentFocusOptionIndex = findFirstFocusedOptionIndex();
      onOptionSelect(null, visibleOptions[currentFocusOptionIndex]);
      setFocusedOptionIndex(currentFocusOptionIndex);
    }
  };
  var updateModel = function updateModel(event, value) {
    if (props.onChange) {
      props.onChange({
        originalEvent: event,
        value: value,
        stopPropagation: function stopPropagation() {
          event === null || event === void 0 || event.stopPropagation();
        },
        preventDefault: function preventDefault() {
          event === null || event === void 0 || event.preventDefault();
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
  var isEquals = function isEquals(value1, value2) {
    return ObjectUtils.equals(value1, value2, equalityKey());
  };
  var isSelected = function isSelected(option) {
    var optionValue = getOptionValue(option);
    if (props.multiple) {
      return (props.value || []).some(function (value) {
        return isEquals(value, optionValue);
      });
    }
    return isEquals(props.value, optionValue);
  };
  var getOptionLabel = function getOptionLabel(option) {
    return props.optionLabel ? ObjectUtils.resolveFieldData(option, props.optionLabel) : option && option.label !== undefined ? option.label : option;
  };
  var getOptionValue = function getOptionValue(option) {
    return props.optionValue ? ObjectUtils.resolveFieldData(option, props.optionValue) : option && option.value !== undefined ? option.value : option;
  };
  var getOptionRenderKey = function getOptionRenderKey(option) {
    return props.dataKey ? ObjectUtils.resolveFieldData(option, props.dataKey) : getOptionLabel(option);
  };
  var isOptionDisabled = function isOptionDisabled(option) {
    if (props.optionDisabled) {
      return ObjectUtils.isFunction(props.optionDisabled) ? props.optionDisabled(option) : ObjectUtils.resolveFieldData(option, props.optionDisabled);
    }
    return option && option.disabled !== undefined ? option.disabled : false;
  };
  var onFirstHiddenFocus = function onFirstHiddenFocus() {
    DomHandler.focus(listRef.current);
    var firstFocusableEl = DomHandler.getFirstFocusableElement(elementRef.current, ':not([data-p-hidden-focusable="true"])');
    lastHiddenFocusableElement.current.tabIndex = DomHandler.isElement(firstFocusableEl) ? undefined : -1;
    firstHiddenFocusableElement.current.tabIndex = -1;
    changeFocusedOptionIndex(null, 0);
  };
  var onLastHiddenFocus = function onLastHiddenFocus(event) {
    var relatedTarget = event.relatedTarget;
    if (relatedTarget === listRef.current) {
      var firstFocusableEl = DomHandler.getFirstFocusableElement(elementRef.current, ':not([data-p-hidden-focusable="true"])');
      DomHandler.focus(firstFocusableEl);
      firstHiddenFocusableElement.current.tabIndex = undefined;
    } else {
      DomHandler.focus(firstHiddenFocusableElement.current);
    }
    lastHiddenFocusableElement.current.tabIndex = -1;
  };
  var onListFocus = function onListFocus() {
    setFocused(true);
    setFocusedOptionIndex(focusedOptionIndex !== -1 ? focusedOptionIndex : props.autoOptionFocus ? findFirstFocusedOptionIndex() : findSelectedOptionIndex());
    autoUpdateModel(true);
  };
  var onListBlur = function onListBlur() {
    setFocused(false);
    setFocusedOptionIndex(-1);
    setStartRangeIndex(-1);
    setSearchValue('');
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
      }
      return FilterService.filter(props.options, searchFields, filterValue, props.filterMatchMode, props.filterLocale);
    }
    return props.options;
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
    id.current = UniqueComponentId();
  });
  var createHeader = function createHeader() {
    return props.filter ? /*#__PURE__*/React.createElement(ListBoxHeader, {
      hostName: "ListBox",
      filter: filteredValue,
      filterIcon: props.filterIcon,
      onFilter: onFilter,
      resetFilter: resetFilter,
      filterTemplate: props.filterTemplate,
      disabled: props.disabled,
      filterPlaceholder: props.filterPlaceholder,
      filterInputProps: props.filterInputProps,
      ptCallbacks: ptCallbacks,
      metaData: metaData
    }) : null;
  };
  var createGroupChildren = function createGroupChildren(optionGroup, style) {
    var groupChildren = getOptionGroupChildren(optionGroup);
    return groupChildren.map(function (option, j) {
      var optionLabel = getOptionLabel(option);
      var optionKey = j + '_' + getOptionRenderKey(option);
      var disabled = isOptionDisabled(option);
      return /*#__PURE__*/React.createElement(ListBoxItem, {
        id: id.current + '_' + j,
        hostName: "ListBox",
        optionKey: optionKey,
        key: optionKey,
        label: optionLabel,
        option: option,
        style: style,
        template: props.itemTemplate,
        selected: isSelected(option),
        onOptionMouseDown: onOptionMouseDown,
        onOptionMouseMove: onOptionMouseMove,
        onClick: onOptionSelect,
        index: j,
        focusedOptionIndex: focusedOptionIndex,
        onTouchEnd: onOptionTouchEnd,
        disabled: disabled,
        ptCallbacks: ptCallbacks,
        metaData: metaData
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
        className: ptCallbacks.cx('itemGroup'),
        style: ptCallbacks.sx('itemGroup', {
          scrollerOptions: scrollerOptions
        }),
        role: 'group'
      }, ptCallbacks.ptm('itemGroup'));
      return /*#__PURE__*/React.createElement(React.Fragment, {
        key: key
      }, /*#__PURE__*/React.createElement("li", itemGroupProps, groupContent), groupChildrenContent);
    }
    var optionLabel = getOptionLabel(option);
    var optionKey = index + '_' + getOptionRenderKey(option);
    var disabled = isOptionDisabled(option);
    return /*#__PURE__*/React.createElement(ListBoxItem, {
      id: id.current + '_' + index,
      hostName: "ListBox",
      optionKey: optionKey,
      key: optionKey,
      label: optionLabel,
      index: index,
      onOptionMouseDown: onOptionMouseDown,
      onOptionMouseMove: onOptionMouseMove,
      focusedOptionIndex: focusedOptionIndex,
      option: option,
      style: style,
      template: props.itemTemplate,
      selected: isSelected(option),
      onClick: onOptionSelect,
      onTouchEnd: onOptionTouchEnd,
      disabled: disabled,
      ptCallbacks: ptCallbacks,
      metaData: metaData
    });
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
      className: ptCallbacks.cx('emptyMessage')
    }, ptCallbacks.ptm('emptyMessage'));
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
          var listProps = mergeProps(_objectSpread({
            ref: listRef,
            style: ptCallbacks.sx('list', {
              options: options
            }),
            className: ptCallbacks.cx('list', {
              options: options
            }),
            role: 'listbox',
            tabIndex: '-1',
            'aria-multiselectable': props.multiple,
            onFocus: onListFocus,
            onBlur: onListBlur,
            onKeyDown: onListKeyDown
          }, ariaProps), ptCallbacks.ptm('list'));
          return /*#__PURE__*/React.createElement("ul", listProps, options.children);
        }
      });
      return /*#__PURE__*/React.createElement(VirtualScroller, _extends({
        ref: virtualScrollerRef
      }, virtualScrollerProps, {
        pt: ptCallbacks.ptm('virtualScroller')
      }));
    }
    var items = createItems();
    var listProps = mergeProps(_objectSpread({
      ref: listRef,
      className: ptCallbacks.cx('list'),
      role: 'listbox',
      'aria-multiselectable': props.multiple,
      tabIndex: '-1',
      onFocus: onListFocus,
      onBlur: onListBlur,
      onKeyDown: onListKeyDown
    }, ariaProps), ptCallbacks.ptm('list'));
    return /*#__PURE__*/React.createElement("ul", listProps, items);
  };
  var visibleOptions = getVisibleOptions();
  var hasTooltip = ObjectUtils.isNotEmpty(props.tooltip);
  var otherProps = ListBoxBase.getOtherProps(props);
  var ariaProps = ObjectUtils.reduceKeys(otherProps, DomHandler.ARIA_PROPS);
  var list = createList();
  var header = createHeader();
  var wrapperProps = mergeProps({
    className: ptCallbacks.cx('wrapper'),
    style: props.listStyle
  }, ptCallbacks.ptm('wrapper'));
  var rootProps = mergeProps({
    ref: elementRef,
    id: props.id,
    className: ptCallbacks.cx('root'),
    style: props.style
  }, ListBoxBase.getOtherProps(props), ptCallbacks.ptm('root'));
  var hiddenFirstElement = mergeProps({
    ref: firstHiddenFocusableElement,
    role: 'presentation',
    'aria-hidden': 'true',
    className: 'p-hidden-accessible p-hidden-focusable',
    tabIndex: !props.disabled ? props.tabIndex : -1,
    onFocus: onFirstHiddenFocus,
    'data-p-hidden-accessible': true,
    'data-p-hidden-focusable': true
  }, ptCallbacks.ptm('hiddenFirstFocusableEl'));
  var hiddenLastElement = mergeProps({
    ref: lastHiddenFocusableElement,
    role: 'presentation',
    'aria-hidden': 'true',
    className: 'p-hidden-accessible p-hidden-focusable',
    tabIndex: !props.disabled ? props.tabIndex : -1,
    onFocus: onLastHiddenFocus,
    'data-p-hidden-accessible': true,
    'data-p-hidden-focusable': true
  }, ptCallbacks.ptm('hiddenLastFocusableEl'));
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", rootProps, /*#__PURE__*/React.createElement("span", hiddenFirstElement), header, /*#__PURE__*/React.createElement("div", wrapperProps, list), /*#__PURE__*/React.createElement("span", hiddenLastElement)), hasTooltip && /*#__PURE__*/React.createElement(Tooltip, _extends({
    target: elementRef,
    content: props.tooltip,
    pt: ptCallbacks.ptm('tooltip')
  }, props.tooltipOptions)));
}));
ListBox.displayName = 'ListBox';

export { ListBox };
