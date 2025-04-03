'use client';
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var PrimeReact = require('primereact/api');
var componentbase = require('primereact/componentbase');
var hooks = require('primereact/hooks');
var chevrondown = require('primereact/icons/chevrondown');
var chevronup = require('primereact/icons/chevronup');
var spinner = require('primereact/icons/spinner');
var times = require('primereact/icons/times');
var overlayservice = require('primereact/overlayservice');
var tooltip = require('primereact/tooltip');
var utils = require('primereact/utils');
var csstransition = require('primereact/csstransition');
var search = require('primereact/icons/search');
var portal = require('primereact/portal');
var virtualscroller = require('primereact/virtualscroller');
var ripple = require('primereact/ripple');
var check = require('primereact/icons/check');
var iconbase = require('primereact/iconbase');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespace(React);
var PrimeReact__default = /*#__PURE__*/_interopDefaultLegacy(PrimeReact);

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

function _arrayLikeToArray$1(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}

function _unsupportedIterableToArray$1(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$1(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen);
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray$1(arr, i) || _nonIterableRest();
}

function ownKeys$2(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$2(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$2(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$2(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var classes = {
  root: function root(_ref) {
    var props = _ref.props,
      focusedState = _ref.focusedState,
      overlayVisibleState = _ref.overlayVisibleState,
      context = _ref.context;
    return utils.classNames('p-dropdown p-component p-inputwrapper', {
      'p-disabled': props.disabled,
      'p-invalid': props.invalid,
      'p-focus': focusedState,
      'p-variant-filled': props.variant ? props.variant === 'filled' : context && context.inputStyle === 'filled',
      'p-dropdown-clearable': props.showClear && !props.disabled,
      'p-inputwrapper-filled': props.value !== undefined,
      'p-inputwrapper-focus': focusedState || overlayVisibleState
    });
  },
  input: function input(_ref2) {
    var props = _ref2.props,
      label = _ref2.label;
    return props.editable ? 'p-dropdown-label p-inputtext' : utils.classNames('p-dropdown-label p-inputtext', {
      'p-placeholder': label === null && props.placeholder,
      'p-dropdown-label-empty': label === null && !props.placeholder
    });
  },
  trigger: 'p-dropdown-trigger',
  emptyMessage: 'p-dropdown-empty-message',
  itemGroup: function itemGroup(_ref3) {
    var optionGroupLabel = _ref3.optionGroupLabel;
    return utils.classNames('p-dropdown-item-group', {
      'p-dropdown-item-empty': !optionGroupLabel || optionGroupLabel.length === 0
    });
  },
  itemGroupLabel: 'p-dropdown-item-group-label',
  dropdownIcon: 'p-dropdown-trigger-icon p-clickable',
  loadingIcon: 'p-dropdown-trigger-icon p-clickable',
  clearIcon: 'p-dropdown-clear-icon p-clickable',
  filterIcon: 'p-dropdown-filter-icon',
  filterClearIcon: 'p-dropdown-filter-clear-icon',
  filterContainer: function filterContainer(_ref4) {
    var clearIcon = _ref4.clearIcon;
    return utils.classNames('p-dropdown-filter-container', {
      'p-dropdown-clearable-filter': !!clearIcon
    });
  },
  filterInput: function filterInput(_ref5) {
    var props = _ref5.props,
      context = _ref5.context;
    return utils.classNames('p-dropdown-filter p-inputtext p-component', {
      'p-variant-filled': props.variant ? props.variant === 'filled' : context && context.inputStyle === 'filled'
    });
  },
  list: function list(_ref6) {
    var virtualScrollerOptions = _ref6.virtualScrollerOptions;
    return virtualScrollerOptions ? 'p-dropdown-items' : 'p-dropdown-items';
  },
  panel: function panel(_ref7) {
    var context = _ref7.context;
    return utils.classNames('p-dropdown-panel p-component', {
      'p-input-filled': context && context.inputStyle === 'filled' || PrimeReact__default["default"].inputStyle === 'filled',
      'p-ripple-disabled': context && context.ripple === false || PrimeReact__default["default"].ripple === false
    });
  },
  item: function item(_ref8) {
    var selected = _ref8.selected,
      disabled = _ref8.disabled,
      label = _ref8.label,
      index = _ref8.index,
      focusedOptionIndex = _ref8.focusedOptionIndex,
      highlightOnSelect = _ref8.highlightOnSelect;
    return utils.classNames('p-dropdown-item', {
      'p-highlight': selected && highlightOnSelect,
      'p-disabled': disabled,
      'p-focus': index === focusedOptionIndex,
      'p-dropdown-item-empty': !label || label.length === 0
    });
  },
  itemLabel: 'p-dropdown-item-label',
  checkIcon: 'p-dropdown-check-icon',
  blankIcon: 'p-dropdown-blank-icon',
  wrapper: 'p-dropdown-items-wrapper',
  header: 'p-dropdown-header',
  footer: 'p-dropdown-footer',
  transition: 'p-connected-overlay'
};
var styles = "\n@layer primereact {\n    .p-dropdown {\n        display: inline-flex;\n        cursor: pointer;\n        position: relative;\n        user-select: none;\n    }\n    \n    .p-dropdown-trigger {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        flex-shrink: 0;\n    }\n    \n    .p-dropdown-label {\n        display: block;\n        white-space: nowrap;\n        overflow: hidden;\n        flex: 1 1 auto;\n        width: 1%;\n        text-overflow: ellipsis;\n        cursor: pointer;\n    }\n    \n    .p-dropdown-label-empty {\n        overflow: hidden;\n        visibility: hidden;\n    }\n    \n    input.p-dropdown-label  {\n        cursor: default;\n    }\n    \n    .p-dropdown .p-dropdown-panel {\n        min-width: 100%;\n    }\n    \n    .p-dropdown-panel {\n        position: absolute;\n        top: 0;\n        left: 0;\n    }\n    \n    .p-dropdown-items-wrapper {\n        overflow: auto;\n    }\n    \n    .p-dropdown-item {\n        cursor: pointer;\n        font-weight: normal;\n        white-space: nowrap;\n        position: relative;\n        overflow: hidden;\n    }\n    \n    .p-dropdown-items {\n        margin: 0;\n        padding: 0;\n        list-style-type: none;\n    }\n    \n    .p-dropdown-filter {\n        width: 100%;\n    }\n    \n    .p-dropdown-filter-container {\n        position: relative;\n    }\n    \n    .p-dropdown-clear-icon,\n    .p-dropdown-filter-icon,\n    .p-dropdown-filter-clear-icon {\n        position: absolute;\n        top: 50%;\n        margin-top: -.5rem;\n        right: 2rem;\n    }\n    \n    .p-fluid .p-dropdown {\n        display: flex;\n    }\n    \n    .p-fluid .p-dropdown .p-dropdown-label {\n        width: 1%;\n    }\n}\n";
var inlineStyles = {
  wrapper: function wrapper(_ref9) {
    var props = _ref9.props;
    return {
      maxHeight: props.scrollHeight || 'auto'
    };
  },
  panel: function panel(_ref10) {
    var props = _ref10.props;
    return _objectSpread$2({}, props.panelStyle);
  }
};
var DropdownBase = componentbase.ComponentBase.extend({
  defaultProps: {
    __TYPE: 'Dropdown',
    __parentMetadata: null,
    appendTo: null,
    ariaLabel: null,
    ariaLabelledBy: null,
    autoFocus: false,
    autoOptionFocus: false,
    checkmark: false,
    children: undefined,
    className: null,
    clearIcon: null,
    collapseIcon: null,
    dataKey: null,
    disabled: false,
    dropdownIcon: null,
    editable: false,
    emptyFilterMessage: null,
    emptyMessage: null,
    filter: false,
    filterBy: null,
    filterClearIcon: null,
    filterDelay: 300,
    filterIcon: null,
    filterInputAutoFocus: false,
    filterLocale: undefined,
    filterMatchMode: 'contains',
    filterPlaceholder: null,
    filterTemplate: null,
    focusInputRef: null,
    focusOnHover: true,
    highlightOnSelect: true,
    id: null,
    inputId: null,
    inputRef: null,
    invalid: false,
    itemTemplate: null,
    loading: false,
    loadingIcon: null,
    maxLength: null,
    name: null,
    onBlur: null,
    onChange: null,
    onContextMenu: null,
    onFilter: null,
    onFocus: null,
    onHide: null,
    onMouseDown: null,
    onShow: null,
    optionDisabled: null,
    optionGroupChildren: 'items',
    optionGroupLabel: null,
    optionGroupTemplate: null,
    optionLabel: null,
    options: null,
    optionValue: null,
    panelClassName: null,
    panelFooterTemplate: null,
    panelStyle: null,
    placeholder: null,
    required: false,
    resetFilterOnHide: false,
    scrollHeight: '200px',
    selectOnFocus: false,
    showClear: false,
    showFilterClear: false,
    showOnFocus: false,
    style: null,
    tabIndex: null,
    tooltip: null,
    tooltipOptions: null,
    transitionOptions: null,
    useOptionAsValue: false,
    value: null,
    valueTemplate: null,
    variant: null,
    virtualScrollerOptions: null
  },
  css: {
    classes: classes,
    styles: styles,
    inlineStyles: inlineStyles
  }
});

var BlankIcon = /*#__PURE__*/React__namespace.memo(/*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
  var pti = iconbase.IconBase.getPTI(inProps);
  return /*#__PURE__*/React__namespace.createElement("svg", _extends({
    ref: ref,
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, pti), /*#__PURE__*/React__namespace.createElement("rect", {
    width: "1",
    height: "1",
    fill: "currentColor",
    fillOpacity: "0"
  }));
}));
BlankIcon.displayName = 'BlankIcon';

var DropdownItem = /*#__PURE__*/React__namespace.memo(function (props) {
  var mergeProps = hooks.useMergeProps();
  var ptm = props.ptm,
    cx = props.cx,
    selected = props.selected,
    disabled = props.disabled,
    option = props.option,
    label = props.label,
    index = props.index,
    focusedOptionIndex = props.focusedOptionIndex,
    ariaSetSize = props.ariaSetSize,
    checkmark = props.checkmark,
    highlightOnSelect = props.highlightOnSelect,
    onInputKeyDown = props.onInputKeyDown;
  var getPTOptions = function getPTOptions(key) {
    return ptm(key, {
      context: {
        selected: selected,
        disabled: disabled,
        focused: index === focusedOptionIndex
      }
    });
  };
  var _onClick = function onClick(event, i) {
    if (props.onClick) {
      props.onClick({
        originalEvent: event,
        option: option
      });
    }
  };
  var content = props.template ? utils.ObjectUtils.getJSXElement(props.template, props.option) : props.label;
  var itemProps = mergeProps({
    id: "dropdownItem_".concat(index),
    role: 'option',
    className: utils.classNames(option.className, cx('item', {
      selected: selected,
      disabled: disabled,
      label: label,
      index: index,
      focusedOptionIndex: focusedOptionIndex,
      highlightOnSelect: highlightOnSelect
    })),
    style: props.style,
    tabIndex: 0,
    onClick: function onClick(e) {
      return _onClick(e);
    },
    onKeyDown: function onKeyDown(e) {
      return onInputKeyDown(e);
    },
    onMouseMove: function onMouseMove(e) {
      return props === null || props === void 0 ? void 0 : props.onMouseMove(e, index);
    },
    'aria-setsize': ariaSetSize,
    'aria-posinset': index + 1,
    'aria-label': label,
    'aria-selected': selected,
    'data-p-highlight': selected,
    'data-p-focused': focusedOptionIndex === index,
    'data-p-disabled': disabled
  }, getPTOptions('item'));
  var itemGroupLabelProps = mergeProps({
    className: cx('itemLabel')
  }, getPTOptions('itemLabel'));
  var iconRenderer = function iconRenderer() {
    if (selected) {
      var checkIconProps = mergeProps({
        className: cx('checkIcon')
      }, getPTOptions('checkIcon'));
      return /*#__PURE__*/React__namespace.createElement(check.CheckIcon, checkIconProps);
    }
    var blankIconProps = mergeProps({
      className: cx('blankIcon')
    }, getPTOptions('blankIcon'));
    return /*#__PURE__*/React__namespace.createElement(BlankIcon, blankIconProps);
  };
  return /*#__PURE__*/React__namespace.createElement("li", _extends({
    key: props.label
  }, itemProps), checkmark && iconRenderer(), /*#__PURE__*/React__namespace.createElement("span", itemGroupLabelProps, content), /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null));
});
DropdownItem.displayName = 'DropdownItem';

function ownKeys$1(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$1(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$1(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var DropdownPanel = /*#__PURE__*/React__namespace.memo(/*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
  var mergeProps = hooks.useMergeProps();
  var ptm = props.ptm,
    cx = props.cx,
    sx = props.sx;
  var context = React__namespace.useContext(PrimeReact.PrimeReactContext);
  var filterInputRef = React__namespace.useRef(null);
  var isEmptyFilter = !(props.visibleOptions && props.visibleOptions.length) && props.hasFilter;
  var ariaSetSize = props.visibleOptions ? props.visibleOptions.length : 0;
  var filterOptions = {
    filter: function filter(e) {
      return onFilterInputChange(e);
    },
    reset: function reset() {
      return props.resetFilter();
    }
  };
  var getPTOptions = function getPTOptions(key, options) {
    return ptm(key, _objectSpread$1({
      hostName: props.hostName
    }, options));
  };
  var onEnter = function onEnter() {
    props.onEnter(function () {
      if (props.virtualScrollerRef.current) {
        var selectedIndex = props.getSelectedOptionIndex();
        if (selectedIndex !== -1) {
          setTimeout(function () {
            return props.virtualScrollerRef.current.scrollToIndex(selectedIndex);
          }, 0);
        }
      }
    });
  };
  var onEntered = function onEntered() {
    props.onEntered(function () {
      if (props.filter && props.filterInputAutoFocus) {
        utils.DomHandler.focus(filterInputRef.current, false);
      }
    });
  };
  var onFilterInputChange = function onFilterInputChange(event) {
    props.onFilterInputChange && props.onFilterInputChange(event);
  };
  var createFooter = function createFooter() {
    if (props.panelFooterTemplate) {
      var content = utils.ObjectUtils.getJSXElement(props.panelFooterTemplate, props, props.onOverlayHide);
      var footerProps = mergeProps({
        className: cx('footer')
      }, getPTOptions('footer'));
      return /*#__PURE__*/React__namespace.createElement("div", footerProps, content);
    }
    return null;
  };
  var changeFocusedItemOnHover = function changeFocusedItemOnHover(event, index) {
    if (props.focusOnHover) {
      var _props$changeFocusedO;
      props === null || props === void 0 || (_props$changeFocusedO = props.changeFocusedOptionIndex) === null || _props$changeFocusedO === void 0 || _props$changeFocusedO.call(props, event, index);
    }
  };
  var createEmptyMessage = function createEmptyMessage(emptyMessage, isFilter) {
    var message = utils.ObjectUtils.getJSXElement(emptyMessage, props) || PrimeReact.localeOption(isFilter ? 'emptyFilterMessage' : 'emptyMessage');
    var emptyMessageProps = mergeProps({
      className: cx('emptyMessage')
    }, getPTOptions('emptyMessage'));
    return /*#__PURE__*/React__namespace.createElement("li", emptyMessageProps, message);
  };
  var createItem = function createItem(option, index) {
    var scrollerOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var style = {
      height: scrollerOptions.props ? scrollerOptions.props.itemSize : undefined
    };
    style = _objectSpread$1(_objectSpread$1({}, style), option.style);
    if (option.group && props.optionGroupLabel) {
      var optionGroupLabel = props.optionGroupLabel;
      var groupContent = props.optionGroupTemplate ? utils.ObjectUtils.getJSXElement(props.optionGroupTemplate, option, index) : props.getOptionGroupLabel(option);
      var key = index + '_' + props.getOptionGroupRenderKey(option);
      var itemGroupProps = mergeProps({
        className: cx('itemGroup', {
          optionGroupLabel: optionGroupLabel
        }),
        style: style,
        'data-p-highlight': props.selected
      }, getPTOptions('itemGroup'));
      var itemGroupLabelProps = mergeProps({
        className: cx('itemGroupLabel')
      }, getPTOptions('itemGroupLabel'));
      return /*#__PURE__*/React__namespace.createElement("li", _extends({
        key: key
      }, itemGroupProps), /*#__PURE__*/React__namespace.createElement("span", itemGroupLabelProps, groupContent));
    }
    var optionKey = props.getOptionRenderKey(option) + '_' + index;
    var optionLabel = props.getOptionLabel(option);
    var disabled = props.isOptionDisabled(option);
    return /*#__PURE__*/React__namespace.createElement(DropdownItem, {
      key: optionKey,
      label: optionLabel,
      index: index,
      focusedOptionIndex: props.focusedOptionIndex,
      option: option,
      ariaSetSize: ariaSetSize,
      onInputKeyDown: props.onInputKeyDown,
      style: style,
      template: props.itemTemplate,
      selected: props.isSelected(option),
      highlightOnSelect: props.highlightOnSelect,
      disabled: disabled,
      onClick: props.onOptionClick,
      onMouseMove: changeFocusedItemOnHover,
      ptm: ptm,
      cx: cx,
      checkmark: props.checkmark
    });
  };
  var createItems = function createItems() {
    if (utils.ObjectUtils.isNotEmpty(props.visibleOptions)) {
      return props.visibleOptions.map(createItem);
    } else if (props.hasFilter) {
      return createEmptyMessage(props.emptyFilterMessage, true);
    }
    return createEmptyMessage(props.emptyMessage);
  };
  var createFilterClearIcon = function createFilterClearIcon() {
    if (props.showFilterClear && props.filterValue) {
      var ariaLabel = PrimeReact.localeOption('clear');
      var clearIconProps = mergeProps({
        className: cx('filterClearIcon'),
        'aria-label': ariaLabel,
        onClick: function onClick() {
          return props.onFilterClearIconClick(function () {
            return utils.DomHandler.focus(filterInputRef.current);
          });
        }
      }, getPTOptions('filterClearIcon'));
      var icon = props.filterClearIcon || /*#__PURE__*/React__namespace.createElement(times.TimesIcon, clearIconProps);
      var filterClearIcon = utils.IconUtils.getJSXIcon(icon, _objectSpread$1({}, clearIconProps), {
        props: props
      });
      return filterClearIcon;
    }
    return null;
  };
  var createFilter = function createFilter() {
    if (props.filter) {
      var clearIcon = createFilterClearIcon();
      var filterIconProps = mergeProps({
        className: cx('filterIcon')
      }, getPTOptions('filterIcon'));
      var icon = props.filterIcon || /*#__PURE__*/React__namespace.createElement(search.SearchIcon, filterIconProps);
      var filterIcon = utils.IconUtils.getJSXIcon(icon, _objectSpread$1({}, filterIconProps), {
        props: props
      });
      var filterContainerProps = mergeProps({
        className: cx('filterContainer', {
          clearIcon: clearIcon
        })
      }, getPTOptions('filterContainer'));
      var filterInputProps = mergeProps({
        ref: filterInputRef,
        type: 'text',
        autoComplete: 'off',
        className: cx('filterInput', {
          context: context
        }),
        placeholder: props.filterPlaceholder,
        onKeyDown: props.onFilterInputKeyDown,
        onChange: function onChange(e) {
          return onFilterInputChange(e);
        },
        value: props.filterValue
      }, getPTOptions('filterInput'));
      var content = /*#__PURE__*/React__namespace.createElement("div", filterContainerProps, /*#__PURE__*/React__namespace.createElement("input", filterInputProps), clearIcon, filterIcon);
      if (props.filterTemplate) {
        var defaultContentOptions = {
          className: utils.classNames('p-dropdown-filter-container', {
            'p-dropdown-clearable-filter': !!clearIcon
          }),
          element: content,
          filterOptions: filterOptions,
          filterInputKeyDown: props.onFilterInputKeyDown,
          filterInputChange: onFilterInputChange,
          filterIconClassName: 'p-dropdown-filter-icon',
          clearIcon: clearIcon,
          props: props
        };
        content = utils.ObjectUtils.getJSXElement(props.filterTemplate, defaultContentOptions);
      }
      var headerProps = mergeProps({
        className: cx('header')
      }, getPTOptions('header'));
      return /*#__PURE__*/React__namespace.createElement("div", headerProps, content);
    }
    return null;
  };
  var createContent = function createContent() {
    if (props.virtualScrollerOptions) {
      var virtualScrollerProps = _objectSpread$1(_objectSpread$1({}, props.virtualScrollerOptions), {
        style: _objectSpread$1(_objectSpread$1({}, props.virtualScrollerOptions.style), {
          height: props.scrollHeight
        }),
        className: utils.classNames('p-dropdown-items-wrapper', props.virtualScrollerOptions.className),
        items: props.visibleOptions,
        autoSize: true,
        onLazyLoad: function onLazyLoad(event) {
          return props.virtualScrollerOptions.onLazyLoad(_objectSpread$1(_objectSpread$1({}, event), {
            filter: props.filterValue
          }));
        },
        itemTemplate: function itemTemplate(item, options) {
          return item && createItem(item, options.index, options);
        },
        contentTemplate: function contentTemplate(options) {
          var emptyMessage = props.hasFilter ? props.emptyFilterMessage : props.emptyMessage;
          var content = isEmptyFilter ? createEmptyMessage(emptyMessage) : options.children;
          var listProps = mergeProps({
            ref: options.contentRef,
            style: options.style,
            className: utils.classNames(options.className, cx('list', {
              virtualScrollerProps: props.virtualScrollerOptions
            })),
            role: 'listbox'
          }, getPTOptions('list'));
          return /*#__PURE__*/React__namespace.createElement("ul", listProps, content);
        }
      });
      return /*#__PURE__*/React__namespace.createElement(virtualscroller.VirtualScroller, _extends({
        ref: props.virtualScrollerRef
      }, virtualScrollerProps, {
        pt: ptm('virtualScroller')
      }));
    }
    var items = createItems();
    var wrapperProps = mergeProps({
      className: cx('wrapper'),
      style: sx('wrapper')
    }, getPTOptions('wrapper'));
    var listProps = mergeProps({
      className: cx('list'),
      role: 'listbox'
    }, getPTOptions('list'));
    return /*#__PURE__*/React__namespace.createElement("div", wrapperProps, /*#__PURE__*/React__namespace.createElement("ul", listProps, items));
  };
  var createElement = function createElement() {
    var filter = createFilter();
    var content = createContent();
    var footer = createFooter();
    var panelProps = mergeProps({
      className: utils.classNames(props.panelClassName, cx('panel', {
        context: context
      })),
      style: sx('panel'),
      onClick: props.onClick
    }, getPTOptions('panel'));
    var transitionProps = mergeProps({
      classNames: cx('transition'),
      "in": props["in"],
      timeout: {
        enter: 120,
        exit: 100
      },
      options: props.transitionOptions,
      unmountOnExit: true,
      onEnter: onEnter,
      onEntered: onEntered,
      onExit: props.onExit,
      onExited: props.onExited
    }, getPTOptions('transition'));
    return /*#__PURE__*/React__namespace.createElement(csstransition.CSSTransition, _extends({
      nodeRef: ref
    }, transitionProps), /*#__PURE__*/React__namespace.createElement("div", _extends({
      ref: ref
    }, panelProps), props.firstFocusableElement, filter, content, footer, props.lastFocusableElement));
  };
  var element = createElement();
  return /*#__PURE__*/React__namespace.createElement(portal.Portal, {
    element: element,
    appendTo: props.appendTo
  });
}));
DropdownPanel.displayName = 'DropdownPanel';

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var Dropdown = /*#__PURE__*/React__namespace.memo(/*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
  var mergeProps = hooks.useMergeProps();
  var context = React__namespace.useContext(PrimeReact.PrimeReactContext);
  var props = DropdownBase.getProps(inProps, context);
  var _useDebounce = hooks.useDebounce('', props.filterDelay || 0),
    _useDebounce2 = _slicedToArray(_useDebounce, 3),
    filterValue = _useDebounce2[0],
    filterState = _useDebounce2[1],
    setFilterState = _useDebounce2[2];
  var _React$useState = React__namespace.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    focusedState = _React$useState2[0],
    setFocusedState = _React$useState2[1];
  var _React$useState3 = React__namespace.useState(-1),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    focusedOptionIndex = _React$useState4[0],
    setFocusedOptionIndex = _React$useState4[1];
  var _React$useState5 = React__namespace.useState(false),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    overlayVisibleState = _React$useState6[0],
    setOverlayVisibleState = _React$useState6[1];
  var clickedRef = React__namespace.useRef(false);
  var elementRef = React__namespace.useRef(null);
  var overlayRef = React__namespace.useRef(null);
  var firstHiddenFocusableElementOnOverlay = React__namespace.useRef(null);
  var lastHiddenFocusableElementOnOverlay = React__namespace.useRef(null);
  var inputRef = React__namespace.useRef(props.inputRef);
  var focusInputRef = React__namespace.useRef(props.focusInputRef);
  var virtualScrollerRef = React__namespace.useRef(null);
  var searchTimeout = React__namespace.useRef(null);
  var searchValue = React__namespace.useRef(null);
  var isLazy = props.virtualScrollerOptions && props.virtualScrollerOptions.lazy;
  var hasFilter = utils.ObjectUtils.isNotEmpty(filterState);
  var appendTo = props.appendTo || context && context.appendTo || PrimeReact__default["default"].appendTo;
  var _DropdownBase$setMeta = DropdownBase.setMetaData(_objectSpread(_objectSpread({
      props: props
    }, props.__parentMetadata), {}, {
      state: {
        filter: filterState,
        focused: focusedState,
        overlayVisible: overlayVisibleState
      }
    })),
    ptm = _DropdownBase$setMeta.ptm,
    cx = _DropdownBase$setMeta.cx,
    sx = _DropdownBase$setMeta.sx,
    isUnstyled = _DropdownBase$setMeta.isUnstyled;
  componentbase.useHandleStyle(DropdownBase.css.styles, isUnstyled, {
    name: 'dropdown'
  });
  var _useOverlayListener = hooks.useOverlayListener({
      target: elementRef,
      overlay: overlayRef,
      listener: function listener(event, _ref) {
        var type = _ref.type,
          valid = _ref.valid;
        if (valid) {
          type === 'outside' ? !isClearClicked(event) && hide() : hide();
        }
      },
      when: overlayVisibleState
    }),
    _useOverlayListener2 = _slicedToArray(_useOverlayListener, 2),
    bindOverlayListener = _useOverlayListener2[0],
    unbindOverlayListener = _useOverlayListener2[1];
  var flatOptions = function flatOptions(options) {
    return (options || []).reduce(function (result, option, index) {
      result.push(_objectSpread(_objectSpread({}, option), {}, {
        group: true,
        index: index
      }));
      var optionGroupChildren = getOptionGroupChildren(option);
      optionGroupChildren && optionGroupChildren.forEach(function (o) {
        return result.push(o);
      });
      return result;
    }, []);
  };
  var getVisibleOptions = function getVisibleOptions() {
    var options = props.optionGroupLabel ? flatOptions(props.options) : props.options;
    if (hasFilter && !isLazy) {
      var _filterValue = filterState.trim().toLocaleLowerCase(props.filterLocale);
      var searchFields = props.filterBy ? props.filterBy.split(',') : [props.optionLabel || 'label'];
      if (props.optionGroupLabel) {
        var filteredGroups = [];
        var _iterator = _createForOfIteratorHelper(props.options),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var optgroup = _step.value;
            var filteredSubOptions = PrimeReact.FilterService.filter(getOptionGroupChildren(optgroup), searchFields, _filterValue, props.filterMatchMode, props.filterLocale);
            if (filteredSubOptions && filteredSubOptions.length) {
              filteredGroups.push(_objectSpread(_objectSpread({}, optgroup), _defineProperty({}, "".concat(props.optionGroupChildren), filteredSubOptions)));
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        return flatOptions(filteredGroups);
      }
      return PrimeReact.FilterService.filter(options, searchFields, _filterValue, props.filterMatchMode, props.filterLocale);
    }
    return options;
  };
  var onFirstHiddenFocus = function onFirstHiddenFocus(event) {
    var focusableEl = event.relatedTarget === focusInputRef.current ? utils.DomHandler.getFirstFocusableElement(overlayRef.current, ':not([data-p-hidden-focusable="true"])') : focusInputRef.current;
    utils.DomHandler.focus(focusableEl);
  };
  var onLastHiddenFocus = function onLastHiddenFocus(event) {
    var focusableEl = event.relatedTarget === focusInputRef.current ? utils.DomHandler.getLastFocusableElement(overlayRef.current, ':not([data-p-hidden-focusable="true"])') : focusInputRef.current;
    utils.DomHandler.focus(focusableEl);
  };
  var isClearClicked = function isClearClicked(event) {
    return utils.DomHandler.isAttributeEquals(event.target, 'data-pc-section', 'clearicon') || utils.DomHandler.isAttributeEquals(event.target.parentElement || event.target, 'data-pc-section', 'filterclearicon');
  };
  var _onClick = function onClick(event) {
    if (props.disabled || props.loading) {
      return;
    }
    props.onClick && props.onClick(event);

    // do not continue if the user defined click wants to prevent it
    if (event.defaultPrevented) {
      return;
    }
    if (isClearClicked(event) || event.target.tagName === 'INPUT') {
      return;
    } else if (!overlayRef.current || !(overlayRef.current && overlayRef.current.contains(event.target))) {
      utils.DomHandler.focus(focusInputRef.current);
      overlayVisibleState ? hide() : show();
    }
    event.preventDefault();
    clickedRef.current = true;
  };
  var onInputFocus = function onInputFocus(event) {
    if (props.showOnFocus && !overlayVisibleState) {
      show();
    }
    setFocusedState(true);
    props.onFocus && props.onFocus(event);
  };
  var onInputBlur = function onInputBlur(event) {
    setFocusedState(false);
    if (props.onBlur) {
      setTimeout(function () {
        var currentValue = inputRef.current ? inputRef.current.value : undefined;
        props.onBlur({
          originalEvent: event.originalEvent,
          value: currentValue,
          stopPropagation: function stopPropagation() {
            event.originalEvent.stopPropagation();
          },
          preventDefault: function preventDefault() {
            event.originalEvent.preventDefault();
          },
          target: {
            name: props.name,
            id: props.id,
            value: currentValue
          }
        });
      }, 200);
    }
  };
  var onOptionSelect = function onOptionSelect(event, option) {
    var isHide = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    selectItem({
      originalEvent: event,
      option: option
    });
    isHide && hide();
  };
  var onPanelClick = function onPanelClick(event) {
    overlayservice.OverlayService.emit('overlay-click', {
      originalEvent: event,
      target: elementRef.current
    });
  };
  var onInputKeyDown = function onInputKeyDown(event) {
    if (props.disabled) {
      event.preventDefault();
      return;
    }
    var code = utils.DomHandler.isAndroid() ? event.key : event.code;
    switch (code) {
      case 'ArrowDown':
        onArrowDownKey(event);
        break;
      case 'ArrowUp':
        onArrowUpKey(event);
        break;
      case 'ArrowLeft':
      case 'ArrowRight':
        onArrowLeftKey(event, props.editable);
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
      case 'Space':
        onSpaceKey(event, props.editable);
        break;
      case 'NumpadEnter':
      case 'Enter':
        onEnterKey(event);
        break;
      case 'Escape':
        onEscapeKey(event);
        break;
      case 'Tab':
        onTabKey(event);
        break;
      case 'Backspace':
        onBackspaceKey(event, props.editable);
        break;
      case 'ShiftLeft':
      case 'ShiftRight':
        //NOOP
        break;
      default:
        var metaKey = event.metaKey || event.ctrlKey || event.altKey;

        // Only handle printable characters when no meta keys are pressed
        if (!metaKey && utils.ObjectUtils.isPrintableCharacter(event.key)) {
          !overlayVisibleState && !props.editable && show();
          !props.editable && searchOptions(event, event.key);
        }
        break;
    }
    clickedRef.current = false;
  };
  var onFilterInputKeyDown = function onFilterInputKeyDown(event) {
    switch (event.code) {
      case 'ArrowDown':
        onArrowDownKey(event);
        break;
      case 'ArrowUp':
        onArrowUpKey(event);
        break;
      case 'ArrowLeft':
      case 'ArrowRight':
        onArrowLeftKey(event, true);
        break;
      case 'Escape':
      case 'Enter':
      case 'NumpadEnter':
        onEnterKey(event);
        event.preventDefault();
        break;
    }
  };
  var hasFocusableElements = function hasFocusableElements() {
    return utils.DomHandler.getFocusableElements(overlayRef.current, ':not([data-p-hidden-focusable="true"])').length > 0;
  };
  var isOptionMatched = function isOptionMatched(option) {
    var _getOptionLabel;
    return isValidOption(option) && ((_getOptionLabel = getOptionLabel(option)) === null || _getOptionLabel === void 0 ? void 0 : _getOptionLabel.toLocaleLowerCase(props.filterLocale).startsWith(searchValue.current.toLocaleLowerCase(props.filterLocale)));
  };
  var isValidOption = function isValidOption(option) {
    return utils.ObjectUtils.isNotEmpty(option) && !(isOptionDisabled(option) || isOptionGroup(option));
  };
  var hasSelectedOption = function hasSelectedOption() {
    return utils.ObjectUtils.isNotEmpty(props.value);
  };
  var isValidSelectedOption = function isValidSelectedOption(option) {
    return isValidOption(option) && isSelected(option);
  };
  var findSelectedOptionIndex = function findSelectedOptionIndex() {
    return hasSelectedOption ? visibleOptions.findIndex(function (option) {
      return isValidSelectedOption(option);
    }) : -1;
  };
  var findFirstFocusedOptionIndex = function findFirstFocusedOptionIndex() {
    var selectedIndex = findSelectedOptionIndex();
    return selectedIndex < 0 ? findFirstOptionIndex() : selectedIndex;
  };
  var searchOptions = function searchOptions(event, _char) {
    searchValue.current = (searchValue.current || '') + _char;
    var optionIndex = -1;
    var matched = false;
    if (utils.ObjectUtils.isNotEmpty(searchValue.current)) {
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
      if (optionIndex !== -1) {
        matched = true;
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
      searchValue.current = '';
      searchTimeout.current = null;
    }, 500);
    return matched;
  };
  var findLastFocusedOptionIndex = function findLastFocusedOptionIndex() {
    var selectedIndex = findSelectedOptionIndex();
    return selectedIndex < 0 ? findLastOptionIndex() : selectedIndex;
  };
  var findFirstOptionIndex = function findFirstOptionIndex() {
    return visibleOptions.findIndex(function (option) {
      return isValidOption(option);
    });
  };
  var findLastOptionIndex = function findLastOptionIndex() {
    return utils.ObjectUtils.findLastIndex(visibleOptions, function (option) {
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
    var matchedOptionIndex = index > 0 ? utils.ObjectUtils.findLastIndex(visibleOptions.slice(0, index), function (option) {
      return isValidOption(option);
    }) : -1;
    return matchedOptionIndex > -1 ? matchedOptionIndex : index;
  };
  var changeFocusedOptionIndex = function changeFocusedOptionIndex(event, index) {
    if (focusedOptionIndex !== index) {
      setFocusedOptionIndex(index);
      focusOnItem(index);
      if (props.selectOnFocus) {
        onOptionSelect(event, visibleOptions[index], false);
      }
    }
  };
  var focusOnItem = function focusOnItem(index) {
    var focusedItem = utils.DomHandler.findSingle(overlayRef.current, "li[id=\"dropdownItem_".concat(index, "\"]"));
    focusedItem && focusedItem.focus();
  };
  var onArrowDownKey = function onArrowDownKey(event) {
    if (!overlayVisibleState) {
      show();
      props.editable && changeFocusedOptionIndex(event, findSelectedOptionIndex());
    } else {
      var optionIndex = focusedOptionIndex !== -1 ? findNextOptionIndex(focusedOptionIndex) : clickedRef.current ? findFirstOptionIndex() : findFirstFocusedOptionIndex();
      changeFocusedOptionIndex(event, optionIndex);
    }
    event.preventDefault();
  };
  var onArrowUpKey = function onArrowUpKey(event) {
    var pressedInInputText = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    if (event.altKey && !pressedInInputText) {
      if (focusedOptionIndex !== -1) {
        onOptionSelect(event, visibleOptions[focusedOptionIndex]);
      }
      state.overlayVisible && hide();
      event.preventDefault();
    } else {
      var optionIndex = focusedOptionIndex !== -1 ? findPrevOptionIndex(focusedOptionIndex) : clickedRef.current ? findLastOptionIndex() : findLastFocusedOptionIndex();
      changeFocusedOptionIndex(event, optionIndex);
      !overlayVisibleState && show();
      event.preventDefault();
    }
  };
  var onArrowLeftKey = function onArrowLeftKey(event) {
    var pressedInInputText = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    pressedInInputText && setFocusedOptionIndex(-1);
  };
  var onHomeKey = function onHomeKey(event) {
    var pressedInInputText = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    if (pressedInInputText) {
      event.currentTarget.setSelectionRange(0, 0);
      setFocusedOptionIndex(-1);
    } else {
      changeFocusedOptionIndex(event, findFirstOptionIndex());
      !overlayVisibleState && show();
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
      changeFocusedOptionIndex(event, findLastOptionIndex());
      !overlayVisibleState && show();
    }
    event.preventDefault();
  };
  var onPageUpKey = function onPageUpKey(event) {
    event.preventDefault();
  };
  var onPageDownKey = function onPageDownKey(event) {
    event.preventDefault();
  };
  var onSpaceKey = function onSpaceKey(event) {
    var pressedInInputText = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    !pressedInInputText && onEnterKey(event);
  };
  var onEnterKey = function onEnterKey(event) {
    if (!overlayVisibleState) {
      setFocusedOptionIndex(-1);
      onArrowDownKey(event);
    } else {
      if (focusedOptionIndex !== -1) {
        onOptionSelect(event, visibleOptions[focusedOptionIndex]);
      }
      hide();
    }
    event.preventDefault();
  };
  var onEscapeKey = function onEscapeKey(event) {
    overlayVisibleState && hide();
    event.preventDefault();
  };
  var onTabKey = function onTabKey(event) {
    var pressedInInputText = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    if (!pressedInInputText) {
      if (overlayVisibleState && !hasFocusableElements()) {
        utils.DomHandler.focus(firstHiddenFocusableElementOnOverlay.current);
        event.preventDefault();
      } else {
        if (focusedOptionIndex !== -1) {
          onOptionSelect(event, visibleOptions[focusedOptionIndex]);
        }
        overlayVisibleState && hide();
      }
    }
  };
  var onBackspaceKey = function onBackspaceKey(event) {
    var pressedInInputText = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    if (event && pressedInInputText) {
      !overlayVisibleState && show();
    }
  };
  var findInArray = function findInArray(visibleOptions, searchText) {
    if (!searchText || !(visibleOptions !== null && visibleOptions !== void 0 && visibleOptions.length)) return -1;
    var normalizedSearch = searchText.toLocaleLowerCase();
    var exactMatch = visibleOptions.findIndex(function (item) {
      return getOptionLabel(item).toLocaleLowerCase() === normalizedSearch;
    });
    if (exactMatch !== -1) return exactMatch;
    return visibleOptions.findIndex(function (item) {
      return getOptionLabel(item).toLocaleLowerCase().startsWith(normalizedSearch);
    });
  };
  var onEditableInputChange = function onEditableInputChange(event) {
    !overlayVisibleState && show();
    var searchIndex = null;
    if (event.target.value && visibleOptions) {
      searchIndex = findInArray(visibleOptions, event.target.value);
    }
    setFocusedOptionIndex(searchIndex);
    if (props.onChange) {
      props.onChange({
        originalEvent: event.originalEvent,
        value: event.target.value,
        stopPropagation: function stopPropagation() {
          event.originalEvent.stopPropagation();
        },
        preventDefault: function preventDefault() {
          event.originalEvent.preventDefault();
        },
        target: {
          name: props.name,
          id: props.id,
          value: event.target.value
        }
      });
    }
  };
  var onEditableInputFocus = function onEditableInputFocus(event) {
    setFocusedState(true);
    hide();
    props.onFocus && props.onFocus(event);
  };
  var onOptionClick = function onOptionClick(event) {
    var option = event.option;
    if (!option.disabled) {
      selectItem(event);
      utils.DomHandler.focus(focusInputRef.current);
    }
    hide();
  };
  var onFilterInputChange = function onFilterInputChange(event) {
    var filter = event.target.value;
    setFilterState(filter);
    if (props.onFilter) {
      props.onFilter({
        originalEvent: event,
        filter: filter
      });
    }
  };
  var onFilterClearIconClick = function onFilterClearIconClick(callback) {
    resetFilter(callback);
  };
  var resetFilter = function resetFilter(callback) {
    setFilterState('');
    props.onFilter && props.onFilter({
      filter: ''
    });
    callback && callback();
  };
  var clear = function clear(event) {
    if (props.onChange) {
      props.onChange({
        originalEvent: event,
        value: undefined,
        stopPropagation: function stopPropagation() {
          event === null || event === void 0 || event.stopPropagation();
        },
        preventDefault: function preventDefault() {
          event === null || event === void 0 || event.preventDefault();
        },
        target: {
          name: props.name,
          id: props.id,
          value: undefined
        }
      });
    }
    if (props.filter) {
      resetFilter();
    }
    updateEditableLabel();
    setFocusedOptionIndex(-1);
  };
  var selectItem = function selectItem(event) {
    if (selectedOption !== event.option) {
      updateEditableLabel(event.option);
      setFocusedOptionIndex(-1);
      var optionValue = getOptionValue(event.option);
      var selectedOptionIndex = findOptionIndexInList(event.option, visibleOptions);
      if (props.onChange) {
        props.onChange({
          originalEvent: event.originalEvent,
          value: optionValue,
          stopPropagation: function stopPropagation() {
            event.originalEvent.stopPropagation();
          },
          preventDefault: function preventDefault() {
            event.originalEvent.preventDefault();
          },
          target: {
            name: props.name,
            id: props.id,
            value: optionValue
          }
        });
      }
      changeFocusedOptionIndex(event.originalEvent, selectedOptionIndex);
    }
  };
  var getSelectedOptionIndex = function getSelectedOptionIndex(options) {
    options = options || visibleOptions;
    if (options) {
      if (props.optionGroupLabel) {
        for (var i = 0; i < options.length; i++) {
          var selectedOptionIndex = findOptionIndexInList(props.value, getOptionGroupChildren(options[i]));
          if (selectedOptionIndex !== -1) {
            return {
              group: i,
              option: selectedOptionIndex
            };
          }
        }
      } else {
        return findOptionIndexInList(props.value, options);
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
      return utils.ObjectUtils.equals(value, getOptionValue(item), key);
    });
  };
  var isSelected = function isSelected(option) {
    return utils.ObjectUtils.equals(props.value, getOptionValue(option), equalityKey());
  };
  var show = function show() {
    setFocusedOptionIndex(focusedOptionIndex !== -1 ? focusedOptionIndex : props.autoOptionFocus ? findFirstFocusedOptionIndex() : props.editable ? -1 : findSelectedOptionIndex());
    setOverlayVisibleState(true);
  };
  var hide = function hide() {
    setOverlayVisibleState(false);
    clickedRef.current = false;
  };
  var onFocus = function onFocus() {
    if (props.editable && !overlayVisibleState && clickedRef.current === false) {
      utils.DomHandler.focus(inputRef.current);
    }
  };
  var onOverlayEnter = function onOverlayEnter(callback) {
    utils.ZIndexUtils.set('overlay', overlayRef.current, context && context.autoZIndex || PrimeReact__default["default"].autoZIndex, context && context.zIndex.overlay || PrimeReact__default["default"].zIndex.overlay);
    utils.DomHandler.addStyles(overlayRef.current, {
      position: 'absolute',
      top: '0',
      left: '0'
    });
    alignOverlay();
    callback && callback();
  };
  var onOverlayEntered = function onOverlayEntered(callback) {
    callback && callback();
    bindOverlayListener();
    props.onShow && props.onShow();
  };
  var onOverlayExit = function onOverlayExit() {
    unbindOverlayListener();
  };
  var onOverlayExited = function onOverlayExited() {
    if (props.filter && props.resetFilterOnHide) {
      resetFilter();
    }
    utils.ZIndexUtils.clear(overlayRef.current);
    props.onHide && props.onHide();
  };
  var alignOverlay = function alignOverlay() {
    utils.DomHandler.alignOverlay(overlayRef.current, inputRef.current.parentElement, props.appendTo || context && context.appendTo || PrimeReact__default["default"].appendTo);
  };
  var scrollInView = function scrollInView() {
    var focusedItem = utils.DomHandler.findSingle(overlayRef.current, 'li[data-p-focused="true"]');
    if (focusedItem && focusedItem.scrollIntoView) {
      focusedItem.scrollIntoView({
        block: 'nearest',
        inline: 'nearest'
      });
    } else {
      var highlightItem = utils.DomHandler.findSingle(overlayRef.current, 'li[data-p-highlight="true"]');
      if (highlightItem && highlightItem.scrollIntoView) {
        highlightItem.scrollIntoView({
          block: 'nearest',
          inline: 'nearest'
        });
      }
    }
  };
  var updateEditableLabel = function updateEditableLabel(option) {
    if (inputRef.current) {
      inputRef.current.value = option ? getOptionLabel(option) : props.value || '';

      // #1413 NVDA screenreader
      if (focusInputRef.current) {
        focusInputRef.current.value = inputRef.current.value;
      }
    }
  };
  var getOptionLabel = function getOptionLabel(option) {
    if (utils.ObjectUtils.isScalar(option)) {
      return "".concat(option);
    }
    var optionLabel = props.optionLabel ? utils.ObjectUtils.resolveFieldData(option, props.optionLabel) : option['label'];
    return "".concat(optionLabel);
  };
  var getOptionValue = function getOptionValue(option) {
    if (props.useOptionAsValue) {
      return option;
    }
    var optionValue = props.optionValue ? utils.ObjectUtils.resolveFieldData(option, props.optionValue) : option ? option['value'] : utils.ObjectUtils.resolveFieldData(option, 'value');
    return props.optionValue || utils.ObjectUtils.isNotEmpty(optionValue) ? optionValue : option;
  };
  var getOptionRenderKey = function getOptionRenderKey(option) {
    return props.dataKey ? utils.ObjectUtils.resolveFieldData(option, props.dataKey) : getOptionLabel(option);
  };
  var isOptionGroup = function isOptionGroup(option) {
    return props.optionGroupLabel && option.group;
  };
  var isOptionDisabled = function isOptionDisabled(option) {
    if (props.optionDisabled) {
      return utils.ObjectUtils.isFunction(props.optionDisabled) ? props.optionDisabled(option) : utils.ObjectUtils.resolveFieldData(option, props.optionDisabled);
    }
    return option && option.disabled !== undefined ? option.disabled : false;
  };
  var getOptionGroupRenderKey = function getOptionGroupRenderKey(optionGroup) {
    return utils.ObjectUtils.resolveFieldData(optionGroup, props.optionGroupLabel);
  };
  var getOptionGroupLabel = function getOptionGroupLabel(optionGroup) {
    return utils.ObjectUtils.resolveFieldData(optionGroup, props.optionGroupLabel);
  };
  var getOptionGroupChildren = function getOptionGroupChildren(optionGroup) {
    return utils.ObjectUtils.resolveFieldData(optionGroup, props.optionGroupChildren);
  };
  var updateInputField = function updateInputField() {
    if (props.editable && inputRef.current) {
      var label = selectedOption ? getOptionLabel(selectedOption) : null;
      var value = label || props.value || '';
      inputRef.current.value = value;

      // #1413 NVDA screenreader
      if (focusInputRef.current) {
        focusInputRef.current.value = value;
      }
    }
  };
  var getSelectedOption = function getSelectedOption() {
    var index = getSelectedOptionIndex(props.options);
    return index !== -1 ? props.optionGroupLabel ? getOptionGroupChildren(props.options[index.group])[index.option] : props.options[index] : null;
  };
  React__namespace.useImperativeHandle(ref, function () {
    return {
      props: props,
      show: show,
      hide: hide,
      clear: clear,
      focus: function focus() {
        return utils.DomHandler.focus(focusInputRef.current);
      },
      getElement: function getElement() {
        return elementRef.current;
      },
      getOverlay: function getOverlay() {
        return overlayRef.current;
      },
      getInput: function getInput() {
        return inputRef.current;
      },
      getFocusInput: function getFocusInput() {
        return focusInputRef.current;
      },
      getVirtualScroller: function getVirtualScroller() {
        return virtualScrollerRef.current;
      }
    };
  });
  React__namespace.useEffect(function () {
    utils.ObjectUtils.combinedRefs(inputRef, props.inputRef);
    utils.ObjectUtils.combinedRefs(focusInputRef, props.focusInputRef);
  }, [inputRef, props.inputRef, focusInputRef, props.focusInputRef]);
  hooks.useMountEffect(function () {
    if (props.autoFocus) {
      utils.DomHandler.focus(focusInputRef.current, props.autoFocus);
    }
    alignOverlay();
  });
  hooks.useUpdateEffect(function () {
    if (overlayVisibleState && (props.value || focusedOptionIndex >= 0)) {
      scrollInView();
    }
  }, [overlayVisibleState, props.value, focusedOptionIndex]);
  hooks.useUpdateEffect(function () {
    if (overlayVisibleState && filterState && props.filter) {
      alignOverlay();
    }
  }, [overlayVisibleState, filterState, props.filter]);
  hooks.useUpdateEffect(function () {
    virtualScrollerRef.current && virtualScrollerRef.current.scrollInView(0);
  }, [filterState]);
  hooks.useUpdateEffect(function () {
    if (filterState && (!props.options || props.options.length === 0)) {
      setFilterState('');
    }
    updateInputField();
    if (inputRef.current) {
      inputRef.current.selectedIndex = 1;
    }
  });
  hooks.useUnmountEffect(function () {
    utils.ZIndexUtils.clear(overlayRef.current);
  });
  var createHiddenSelect = function createHiddenSelect() {
    var option = {
      value: '',
      label: props.placeholder
    };
    if (selectedOption) {
      var optionValue = getOptionValue(selectedOption);
      option = {
        value: _typeof(optionValue) === 'object' ? props.options.findIndex(function (o) {
          return o === optionValue;
        }) : optionValue,
        label: getOptionLabel(selectedOption)
      };
    }
    var hiddenSelectedMessageProps = mergeProps({
      className: 'p-hidden-accessible p-dropdown-hidden-select'
    }, ptm('hiddenSelectedMessage'));
    var selectProps = mergeProps({
      ref: inputRef,
      required: props.required,
      defaultValue: option.value,
      name: props.name,
      tabIndex: -1
    }, ptm('select'));
    var optionProps = mergeProps({
      value: option.value
    }, ptm('option'));
    return /*#__PURE__*/React__namespace.createElement("div", hiddenSelectedMessageProps, /*#__PURE__*/React__namespace.createElement("select", selectProps, /*#__PURE__*/React__namespace.createElement("option", optionProps, option.label)));
  };
  var createKeyboardHelper = function createKeyboardHelper() {
    var value = utils.ObjectUtils.isNotEmpty(selectedOption) ? getOptionLabel(selectedOption) : null;
    if (props.editable) {
      value = value || props.value || '';
    }
    var hiddenSelectedMessageProps = mergeProps({
      className: 'p-hidden-accessible'
    }, ptm('hiddenSelectedMessage'));
    var inputProps = mergeProps(_objectSpread({
      ref: focusInputRef,
      id: props.inputId,
      defaultValue: value,
      type: 'text',
      readOnly: true,
      'aria-haspopup': 'listbox',
      onFocus: onInputFocus,
      onBlur: onInputBlur,
      onKeyDown: onInputKeyDown,
      disabled: props.disabled,
      tabIndex: !props.disabled ? props.tabIndex || 0 : -1
    }, ariaProps), ptm('input'));
    return /*#__PURE__*/React__namespace.createElement("div", hiddenSelectedMessageProps, /*#__PURE__*/React__namespace.createElement("input", inputProps));
  };
  var createLabel = function createLabel() {
    var label = utils.ObjectUtils.isNotEmpty(selectedOption) ? getOptionLabel(selectedOption) : null;
    if (props.editable) {
      var value = label || props.value || '';
      var _inputProps = mergeProps(_objectSpread({
        ref: inputRef,
        type: 'text',
        defaultValue: value,
        className: cx('input', {
          label: label
        }),
        disabled: props.disabled,
        placeholder: props.placeholder,
        maxLength: props.maxLength,
        onInput: onEditableInputChange,
        onFocus: onEditableInputFocus,
        onKeyDown: onInputKeyDown,
        onBlur: onInputBlur,
        tabIndex: !props.disabled ? props.tabIndex || 0 : -1,
        'aria-haspopup': 'listbox'
      }, ariaProps), ptm('input'));
      return /*#__PURE__*/React__namespace.createElement("input", _inputProps);
    }
    var content = props.valueTemplate ? utils.ObjectUtils.getJSXElement(props.valueTemplate, selectedOption, props) : label || props.placeholder || props.emptyMessage || /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, "\xA0");
    var inputProps = mergeProps({
      ref: inputRef,
      className: cx('input', {
        label: label
      }),
      tabIndex: '-1'
    }, ptm('input'));
    return /*#__PURE__*/React__namespace.createElement("span", inputProps, content);
  };
  var onClearIconKeyDown = function onClearIconKeyDown(event) {
    if (event.key === 'Enter' || event.code === 'Space') {
      clear(event);
      event.preventDefault();
    }
  };
  var createClearIcon = function createClearIcon() {
    if (props.value != null && props.showClear && !props.disabled && !utils.ObjectUtils.isEmpty(props.options)) {
      var clearIconProps = mergeProps({
        className: cx('clearIcon'),
        onPointerUp: clear,
        tabIndex: props.tabIndex || '0',
        onKeyDown: onClearIconKeyDown,
        'aria-label': PrimeReact.localeOption('clear')
      }, ptm('clearIcon'));
      var icon = props.clearIcon || /*#__PURE__*/React__namespace.createElement(times.TimesIcon, clearIconProps);
      return utils.IconUtils.getJSXIcon(icon, _objectSpread({}, clearIconProps), {
        props: props
      });
    }
    return null;
  };
  var createLoadingIcon = function createLoadingIcon() {
    var loadingIconProps = mergeProps({
      className: cx('loadingIcon'),
      'data-pr-overlay-visible': overlayVisibleState
    }, ptm('loadingIcon'));
    var icon = props.loadingIcon || /*#__PURE__*/React__namespace.createElement(spinner.SpinnerIcon, {
      spin: true
    });
    var loadingIcon = utils.IconUtils.getJSXIcon(icon, _objectSpread({}, loadingIconProps), {
      props: props
    });
    var ariaLabel = props.placeholder || props.ariaLabel;
    var loadingButtonProps = mergeProps({
      className: cx('trigger'),
      role: 'button',
      'aria-haspopup': 'listbox',
      'aria-expanded': overlayVisibleState,
      'aria-label': ariaLabel
    }, ptm('trigger'));
    return /*#__PURE__*/React__namespace.createElement("div", loadingButtonProps, loadingIcon);
  };
  var createDropdownIcon = function createDropdownIcon() {
    var dropdownIconProps = mergeProps({
      className: cx('dropdownIcon'),
      'data-pr-overlay-visible': overlayVisibleState
    }, ptm('dropdownIcon'));
    var icon = !overlayVisibleState ? props.dropdownIcon || /*#__PURE__*/React__namespace.createElement(chevrondown.ChevronDownIcon, dropdownIconProps) : props.collapseIcon || /*#__PURE__*/React__namespace.createElement(chevronup.ChevronUpIcon, dropdownIconProps);
    var dropdownIcon = utils.IconUtils.getJSXIcon(icon, _objectSpread({}, dropdownIconProps), {
      props: props
    });
    var ariaLabel = props.placeholder || props.ariaLabel;
    var triggerProps = mergeProps({
      className: cx('trigger'),
      role: 'button',
      'aria-haspopup': 'listbox',
      'aria-expanded': overlayVisibleState,
      'aria-label': ariaLabel
    }, ptm('trigger'));
    return /*#__PURE__*/React__namespace.createElement("div", triggerProps, dropdownIcon);
  };
  var visibleOptions = getVisibleOptions();
  var selectedOption = getSelectedOption();
  var hasTooltip = utils.ObjectUtils.isNotEmpty(props.tooltip);
  var otherProps = DropdownBase.getOtherProps(props);
  var ariaProps = utils.ObjectUtils.reduceKeys(otherProps, utils.DomHandler.ARIA_PROPS);
  var hiddenSelect = createHiddenSelect();
  var keyboardHelper = createKeyboardHelper();
  var labelElement = createLabel();
  var dropdownIcon = props.loading ? createLoadingIcon() : createDropdownIcon();
  var clearIcon = createClearIcon();
  var rootProps = mergeProps({
    id: props.id,
    ref: elementRef,
    className: utils.classNames(props.className, cx('root', {
      context: context,
      focusedState: focusedState,
      overlayVisibleState: overlayVisibleState
    })),
    style: props.style,
    onClick: function onClick(e) {
      return _onClick(e);
    },
    onMouseDown: props.onMouseDown,
    onContextMenu: props.onContextMenu,
    onFocus: onFocus,
    'data-p-disabled': props.disabled,
    'data-p-focus': focusedState,
    'aria-activedescendant': focusedState ? "dropdownItem_".concat(focusedOptionIndex) : undefined
  }, otherProps, ptm('root'));
  var firstHiddenFocusableElementProps = mergeProps({
    ref: firstHiddenFocusableElementOnOverlay,
    role: 'presentation',
    className: 'p-hidden-accessible p-hidden-focusable',
    tabIndex: '0',
    onFocus: onFirstHiddenFocus,
    'data-p-hidden-accessible': true,
    'data-p-hidden-focusable': true
  }, ptm('hiddenFirstFocusableEl'));
  var lastHiddenFocusableElementProps = mergeProps({
    ref: lastHiddenFocusableElementOnOverlay,
    role: 'presentation',
    className: 'p-hidden-accessible p-hidden-focusable',
    tabIndex: '0',
    onFocus: onLastHiddenFocus,
    'data-p-hidden-accessible': true,
    'data-p-hidden-focusable': true
  }, ptm('hiddenLastFocusableEl'));
  return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("div", rootProps, keyboardHelper, hiddenSelect, labelElement, clearIcon, dropdownIcon, /*#__PURE__*/React__namespace.createElement(DropdownPanel, _extends({
    hostName: "Dropdown",
    ref: overlayRef,
    visibleOptions: visibleOptions,
    virtualScrollerRef: virtualScrollerRef
  }, props, {
    appendTo: appendTo,
    cx: cx,
    filterValue: filterValue,
    focusedOptionIndex: focusedOptionIndex,
    getOptionGroupChildren: getOptionGroupChildren,
    getOptionGroupLabel: getOptionGroupLabel,
    getOptionGroupRenderKey: getOptionGroupRenderKey,
    getOptionLabel: getOptionLabel,
    getOptionRenderKey: getOptionRenderKey,
    getSelectedOptionIndex: getSelectedOptionIndex,
    hasFilter: hasFilter,
    "in": overlayVisibleState,
    isOptionDisabled: isOptionDisabled,
    isSelected: isSelected,
    onClick: onPanelClick,
    onEnter: onOverlayEnter,
    onEntered: onOverlayEntered,
    onExit: onOverlayExit,
    onExited: onOverlayExited,
    onFilterClearIconClick: onFilterClearIconClick,
    onFilterInputChange: onFilterInputChange,
    onFilterInputKeyDown: onFilterInputKeyDown,
    onOptionClick: onOptionClick,
    onInputKeyDown: onInputKeyDown,
    ptm: ptm,
    resetFilter: resetFilter,
    changeFocusedOptionIndex: changeFocusedOptionIndex,
    firstFocusableElement: /*#__PURE__*/React__namespace.createElement("span", firstHiddenFocusableElementProps),
    lastFocusableElement: /*#__PURE__*/React__namespace.createElement("span", lastHiddenFocusableElementProps),
    sx: sx
  }))), hasTooltip && /*#__PURE__*/React__namespace.createElement(tooltip.Tooltip, _extends({
    target: elementRef,
    content: props.tooltip,
    pt: ptm('tooltip')
  }, props.tooltipOptions)));
}));
Dropdown.displayName = 'Dropdown';

exports.Dropdown = Dropdown;
