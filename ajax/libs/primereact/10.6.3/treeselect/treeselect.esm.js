'use client';
import * as React from 'react';
import PrimeReact, { PrimeReactContext, localeOption } from 'primereact/api';
import { ComponentBase, useHandleStyle } from 'primereact/componentbase';
import { useMergeProps, useOverlayListener, useMountEffect, useUpdateEffect, useUnmountEffect } from 'primereact/hooks';
import { ChevronDownIcon } from 'primereact/icons/chevrondown';
import { SearchIcon } from 'primereact/icons/search';
import { TimesIcon } from 'primereact/icons/times';
import { OverlayService } from 'primereact/overlayservice';
import { Ripple } from 'primereact/ripple';
import { Tooltip } from 'primereact/tooltip';
import { Tree } from 'primereact/tree';
import { classNames, ObjectUtils, DomHandler, UniqueComponentId, ZIndexUtils, IconUtils } from 'primereact/utils';
import { CSSTransition } from 'primereact/csstransition';
import { Portal } from 'primereact/portal';

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

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray$1(arr, i) || _nonIterableRest();
}

var classes = {
  root: function root(_ref) {
    var props = _ref.props,
      focusedState = _ref.focusedState,
      context = _ref.context,
      overlayVisibleState = _ref.overlayVisibleState,
      isValueEmpty = _ref.isValueEmpty;
    return classNames('p-treeselect p-component p-inputwrapper', {
      'p-treeselect-chip': props.display === 'chip',
      'p-treeselect-clearable': props.showClear && !props.disabled,
      'p-disabled': props.disabled,
      'p-invalid': props.invalid,
      'p-focus': focusedState,
      'p-variant-filled': props.variant ? props.variant === 'filled' : context && context.inputStyle === 'filled',
      'p-inputwrapper-filled': !isValueEmpty,
      'p-inputwrapper-focus': focusedState || overlayVisibleState
    });
  },
  label: function label(_ref2) {
    var props = _ref2.props,
      isValueEmpty = _ref2.isValueEmpty,
      getLabel = _ref2.getLabel;
    return classNames('p-treeselect-label', {
      'p-placeholder': getLabel() === props.placeholder,
      'p-treeselect-label-empty': !props.placeholder && isValueEmpty
    });
  },
  panel: function panel(_ref3) {
    var props = _ref3.panelProps,
      context = _ref3.context;
    return classNames('p-treeselect-panel p-component', props.panelClassName, {
      'p-input-filled': context && context.inputStyle === 'filled' || PrimeReact.inputStyle === 'filled',
      'p-ripple-disabled': context && context.ripple === false || PrimeReact.ripple === false
    });
  },
  labelContainer: 'p-treeselect-label-container',
  tokenLabel: 'p-treeselect-token-label',
  token: 'p-treeselect-token',
  trigger: 'p-treeselect-trigger',
  triggerIcon: 'p-treeselect-trigger-icon p-clickable',
  emptyMessage: 'p-treeselect-empty-message',
  filterContainer: 'p-treeselect-filter-container',
  filter: 'p-treeselect-filter p-inputtext p-component',
  filterIcon: 'p-treeselect-filter-icon',
  closeIcon: 'p-treeselect-close-icon',
  clearIcon: 'p-treeselect-clear-icon p-clickable',
  closeButton: 'p-treeselect-close p-link',
  header: 'p-treeselect-header',
  wrapper: 'p-treeselect-items-wrapper',
  transition: 'p-connected-overlay'
};
var styles = "\n@layer primereact {\n    .p-treeselect {\n        display: inline-flex;\n        cursor: pointer;\n        position: relative;\n        user-select: none;\n    }\n\n    .p-treeselect-trigger {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        flex-shrink: 0;\n    }\n\n    .p-treeselect-label-container {\n        overflow: hidden;\n        flex: 1 1 auto;\n        cursor: pointer;\n    }\n\n    .p-treeselect-label  {\n        display: block;\n        white-space: nowrap;\n        cursor: pointer;\n        overflow: hidden;\n        text-overflow: ellipsis;\n    }\n\n    .p-treeselect-label-empty {\n        overflow: hidden;\n        visibility: hidden;\n    }\n\n    .p-treeselect-token {\n        cursor: default;\n        display: inline-flex;\n        align-items: center;\n        flex: 0 0 auto;\n    }\n\n    .p-treeselect .p-treeselect-panel {\n        min-width: 100%;\n    }\n\n    .p-treeselect-items-wrapper {\n        overflow: auto;\n    }\n\n    .p-treeselect-header {\n        display: flex;\n        align-items: center;\n        justify-content: space-between;\n    }\n\n    .p-treeselect-filter-container {\n        position: relative;\n        flex: 1 1 auto;\n    }\n\n    .p-treeselect-filter-icon {\n        position: absolute;\n        top: 50%;\n        margin-top: -.5rem;\n    }\n\n    .p-treeselect-filter-container .p-inputtext {\n        width: 100%;\n    }\n\n    .p-treeselect-close {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        flex-shrink: 0;\n        overflow: hidden;\n        position: relative;\n        margin-left: auto;\n    }\n\n    .p-treeselect-clear-icon {\n        position: absolute;\n        top: 50%;\n        margin-top: -.5rem;\n    }\n\n    .p-fluid .p-treeselect {\n        display: flex;\n}\n}\n";
var TreeSelectBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'TreeSelect',
    appendTo: null,
    ariaLabel: null,
    ariaLabelledBy: null,
    className: null,
    closeIcon: null,
    clearIcon: null,
    disabled: false,
    display: 'comma',
    dropdownIcon: null,
    emptyMessage: null,
    expandedKeys: null,
    filter: false,
    filterBy: 'label',
    filterIcon: null,
    filterInputAutoFocus: true,
    filterLocale: undefined,
    filterMode: 'lenient',
    filterPlaceholder: null,
    filterTemplate: null,
    filterValue: null,
    inputId: null,
    inputRef: null,
    invalid: false,
    variant: null,
    metaKeySelection: false,
    name: null,
    nodeTemplate: null,
    onChange: null,
    onFocus: null,
    onBlur: null,
    onFilterValueChange: null,
    onHide: null,
    onNodeCollapse: null,
    onNodeExpand: null,
    onNodeSelect: null,
    onNodeUnselect: null,
    onShow: null,
    options: null,
    panelClassName: null,
    panelFooterTemplate: null,
    panelHeaderTemplate: null,
    panelStyle: null,
    placeholder: null,
    resetFilterOnHide: false,
    scrollHeight: '400px',
    selectionMode: 'single',
    showClear: false,
    style: null,
    tabIndex: null,
    togglerTemplate: null,
    transitionOptions: null,
    value: null,
    valueTemplate: null,
    children: undefined
  },
  css: {
    classes: classes,
    styles: styles
  }
});

function ownKeys$1(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$1(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$1(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var TreeSelectPanel = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var mergeProps = useMergeProps();
  var context = React.useContext(PrimeReactContext);
  var ptm = props.ptm,
    cx = props.cx;
  var getPTOptions = function getPTOptions(key, options) {
    return ptm(key, _objectSpread$1({
      hostName: props.hostName
    }, options));
  };
  var onKeyDown = function onKeyDown(event) {
    if (event.key === 'Escape') {
      event.preventDefault();
      props.hide();
    }
  };
  var createElement = function createElement() {
    var wrapperStyle = {
      maxHeight: props.scrollHeight || 'auto'
    };
    var panelProps = mergeProps({
      className: cx('panel', {
        panelProps: props,
        context: context
      }),
      style: props.panelStyle,
      onKeyDown: onKeyDown,
      onClick: props.onClick
    }, getPTOptions('panel'));
    var wrapperProps = mergeProps({
      className: cx('wrapper'),
      style: wrapperStyle
    }, getPTOptions('wrapper'));
    var transitionProps = mergeProps({
      classNames: cx('transition'),
      "in": props["in"],
      timeout: {
        enter: 120,
        exit: 100
      },
      options: props.transitionOptions,
      unmountOnExit: true,
      onEnter: props.onEnter,
      onEntered: props.onEntered,
      onExit: props.onExit,
      onExited: props.onExited
    }, getPTOptions('transition'));
    return /*#__PURE__*/React.createElement(CSSTransition, _extends({
      nodeRef: ref
    }, transitionProps), /*#__PURE__*/React.createElement("div", _extends({
      ref: ref
    }, panelProps), props.firstHiddenFocusableElementOnOverlay, props.header, /*#__PURE__*/React.createElement("div", wrapperProps, props.children), props.footer, props.lastHiddenFocusableElementOnOverlay));
  };
  var element = createElement();
  return /*#__PURE__*/React.createElement(Portal, {
    element: element,
    appendTo: props.appendTo
  });
});
TreeSelectPanel.displayName = 'TreeSelectPanel';

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var TreeSelect = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var mergeProps = useMergeProps();
  var context = React.useContext(PrimeReactContext);
  var props = TreeSelectBase.getProps(inProps, context);
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    focusedState = _React$useState2[0],
    setFocusedState = _React$useState2[1];
  var _React$useState3 = React.useState(false),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    overlayVisibleState = _React$useState4[0],
    setOverlayVisibleState = _React$useState4[1];
  var _React$useState5 = React.useState(props.expandedKeys),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    expandedKeysState = _React$useState6[0],
    setExpandedKeysState = _React$useState6[1];
  var _React$useState7 = React.useState(''),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    filterValueState = _React$useState8[0],
    setFilterValueState = _React$useState8[1];
  var elementRef = React.useRef(null);
  var overlayRef = React.useRef(null);
  var filterInputRef = React.useRef(null);
  var focusInputRef = React.useRef(props.inputRef);
  var triggerRef = React.useRef(null);
  var selfChange = React.useRef(null);
  var treeRef = React.useRef(null);
  var firstHiddenFocusableElementOnOverlay = React.useRef(null);
  var lastHiddenFocusableElementOnOverlay = React.useRef(null);
  var focusToTree = React.useRef(false);
  var listId = React.useRef('');
  var expandedKeys = props.onToggle ? props.expandedKeys : expandedKeysState;
  var filteredValue = props.onFilterValueChange ? props.filterValue : filterValueState;
  var isValueEmpty = ObjectUtils.isEmpty(props.value);
  var hasNoOptions = ObjectUtils.isEmpty(props.options);
  var isSingleSelectionMode = props.selectionMode === 'single';
  var isCheckboxSelectionMode = props.selectionMode === 'checkbox';
  var hasTooltip = ObjectUtils.isNotEmpty(props.tooltip);
  var metaData = {
    props: props,
    state: {
      focused: focusedState,
      overlayVisible: overlayVisibleState,
      expandedKeys: expandedKeys,
      filterValue: filteredValue
    }
  };
  var _TreeSelectBase$setMe = TreeSelectBase.setMetaData(metaData),
    ptm = _TreeSelectBase$setMe.ptm,
    cx = _TreeSelectBase$setMe.cx,
    isUnstyled = _TreeSelectBase$setMe.isUnstyled;
  useHandleStyle(TreeSelectBase.css.styles, isUnstyled, {
    name: 'treeselect'
  });
  var filterOptions = {
    filter: function filter(e) {
      return onFilterInputChange(e);
    },
    reset: function reset() {
      return resetFilter();
    }
  };
  var _useOverlayListener = useOverlayListener({
      target: elementRef,
      overlay: overlayRef,
      listener: function listener(event, _ref) {
        var valid = _ref.valid;
        valid && hide();
      },
      when: overlayVisibleState
    }),
    _useOverlayListener2 = _slicedToArray(_useOverlayListener, 2),
    bindOverlayListener = _useOverlayListener2[0],
    unbindOverlayListener = _useOverlayListener2[1];
  var getLabel = function getLabel() {
    return selectedNodes.length ? selectedNodes.map(function (node) {
      return node.label;
    }).join(', ') : props.placeholder;
  };
  var show = function show() {
    setOverlayVisibleState(true);
  };
  var hide = function hide() {
    setOverlayVisibleState(false);
    focusInputRef.current && DomHandler.focus(focusInputRef.current);
  };
  var onInputFocus = function onInputFocus() {
    setFocusedState(true);
    props.onFocus && props.onFocus();
  };
  var onInputBlur = function onInputBlur() {
    setFocusedState(false);
    props.onBlur && props.onBlur();
  };
  var onClick = function onClick(event) {
    if (!props.disabled && (!overlayRef.current || !overlayRef.current.contains(event.target)) && !DomHandler.isAttributeEquals(event.target, 'data-pc-section', 'closebutton')) {
      DomHandler.focus(focusInputRef.current);
      overlayVisibleState ? hide() : show();
    }
  };
  var onSelectionChange = function onSelectionChange(event) {
    if (props.onChange) {
      selfChange.current = true;
      props.onChange({
        originalEvent: event.originalEvent,
        value: event.value,
        stopPropagation: function stopPropagation() {
          event.originalEvent.stopPropagation();
        },
        preventDefault: function preventDefault() {
          event.originalEvent.preventDefault();
        },
        target: {
          name: props.name,
          id: props.id,
          value: event.value
        }
      });
    }
  };
  var clear = function clear(event) {
    if (props.onChange) {
      selfChange.current = true;
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
  };
  var onNodeSelect = function onNodeSelect(node) {
    props.onNodeSelect && props.onNodeSelect(node);
    isSingleSelectionMode && hide();
  };
  var onNodeUnselect = function onNodeUnselect(node) {
    props.onNodeUnselect && props.onNodeUnselect(node);
    isCheckboxSelectionMode && node.originalEvent.stopPropagation();
  };
  var onNodeToggle = function onNodeToggle(e) {
    if (props.onToggle) {
      props.onToggle(e);
    } else {
      setExpandedKeysState(e.value);
    }
  };
  var onFilterValueChange = function onFilterValueChange(e) {
    setFilterValueState(e.value);
  };
  var onOverlayClick = function onOverlayClick(event) {
    OverlayService.emit('overlay-click', {
      originalEvent: event,
      target: elementRef.current
    });
  };
  var onFirstHiddenFocus = function onFirstHiddenFocus(event) {
    var focusableEl = event.relatedTarget === focusInputRef.current ? DomHandler.getFirstFocusableElement(overlayRef.current, ':not([data-p-hidden-focusable="true"])') : focusInputRef.current;
    DomHandler.focus(focusableEl);
  };
  var onLastHiddenFocus = function onLastHiddenFocus(event) {
    var focusableEl = event.relatedTarget === focusInputRef.current ? DomHandler.getLastFocusableElement(overlayRef.current, ':not([data-p-hidden-focusable="true"])') : focusInputRef.current;
    DomHandler.focus(focusableEl);
  };
  var onHeaderElementKeyDown = function onHeaderElementKeyDown(event, isHideButton) {
    switch (event.code) {
      case 'ArrowDown':
        event.preventDefault();
        setFocusToFocusableFirstNode();
        break;
      case 'ArrowUp':
        event.preventDefault();
        focusInputRef.current && DomHandler.focus(focusInputRef.current);
        break;
      case 'Space':
      case 'Enter':
      case 'NumpadEnter':
        event.preventDefault();
        if (isHideButton) {
          hide();
        }
        break;
      case 'Escape':
        onEscapeKey(event);
        break;
    }
  };
  var onKeyDown = function onKeyDown(event) {
    switch (event.code) {
      case 'ArrowDown':
        onArrowDownKey(event);
        break;
      case 'Space':
      case 'Enter':
      case 'NumpadEnter':
        onEnterKey(event);
        break;
      case 'Escape':
        onEscapeKey(event);
        break;
      case 'Tab':
        if (overlayVisibleState) {
          event.preventDefault();
          if (event.shiftKey) {
            setFocusToFocusableFirstNode();
          } else {
            onTabKey(event);
          }
        }
        break;
    }
  };
  var onArrowDownKey = function onArrowDownKey(event) {
    if (overlayVisibleState) {
      return;
    }
    focusToTree.current = true;
    show();
    event.preventDefault();
  };
  var onEnterKey = function onEnterKey(event) {
    if (overlayVisibleState) {
      hide();
    } else {
      onArrowDownKey(event);
    }
    event.preventDefault();
  };
  var onEscapeKey = function onEscapeKey(event) {
    if (overlayVisibleState) {
      hide();
      event.preventDefault();
    }
  };
  var onTabKey = function onTabKey(event) {
    var pressedInInputText = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    if (!pressedInInputText) {
      if (overlayVisibleState && hasFocusableElements()) {
        DomHandler.focus(firstHiddenFocusableElementOnOverlay.current);
        event.preventDefault();
      }
    }
  };
  var hasFocusableElements = function hasFocusableElements() {
    return DomHandler.getFocusableElements(overlayRef.current, ':not([data-p-hidden-focusable="true"])').length > 0;
  };
  var onFilterInputChange = function onFilterInputChange(event) {
    var value = event.target.value;
    if (props.onFilterValueChange) {
      props.onFilterValueChange({
        originalEvent: event,
        value: value
      });
    } else {
      setFilterValueState(value);
    }
  };
  var resetFilter = function resetFilter() {
    setFilterValueState('');
  };
  var onOverlayEnter = function onOverlayEnter() {
    ZIndexUtils.set('overlay', overlayRef.current, context && context.autoZIndex || PrimeReact.autoZIndex, context && context.zIndex.overlay || PrimeReact.zIndex.overlay);
    DomHandler.addStyles(overlayRef.current, {
      position: 'absolute',
      top: '0',
      left: '0'
    });
    setFocusToFocusableFirstNode();
    alignOverlay();
    scrollInView();
  };
  var onOverlayEntered = function onOverlayEntered() {
    bindOverlayListener();
    if (props.filter && props.filterInputAutoFocus) {
      DomHandler.focus(filterInputRef.current, props.filterInputAutoFocus);
    }
    props.onShow && props.onShow();
  };
  var onOverlayExit = function onOverlayExit() {
    unbindOverlayListener();
  };
  var onOverlayExited = function onOverlayExited() {
    if (props.filter && props.resetFilterOnHide) {
      resetFilter();
    }
    ZIndexUtils.clear(overlayRef.current);
    props.onHide && props.onHide();
  };
  var alignOverlay = function alignOverlay() {
    DomHandler.alignOverlay(overlayRef.current, triggerRef.current.parentElement, props.appendTo || context && context.appendTo || PrimeReact.appendTo);
  };
  var scrollInView = function scrollInView() {
    var highlightItem = DomHandler.findSingle(overlayRef.current, '[data-pc-section="content"][data-p-highlight="true"]');
    if (highlightItem && highlightItem.scrollIntoView) {
      highlightItem.scrollIntoView({
        block: 'nearest',
        inline: 'start'
      });
    }
  };
  var findSelectedNodes = function findSelectedNodes(node, keys, selectedNodes) {
    if (node) {
      if (isSelected(node, keys)) {
        selectedNodes.push(node);
        delete keys[node.key];
      }
      if (Object.keys(keys).length && node.children) {
        var _iterator = _createForOfIteratorHelper(node.children),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var childNode = _step.value;
            findSelectedNodes(childNode, keys, selectedNodes);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
    } else {
      var _iterator2 = _createForOfIteratorHelper(props.options),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _childNode = _step2.value;
          findSelectedNodes(_childNode, keys, selectedNodes);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  };
  var isSelected = function isSelected(node, keys) {
    return isCheckboxSelectionMode ? keys[node.key] && keys[node.key].checked : keys[node.key];
  };
  var updateTreeState = function updateTreeState() {
    var keys = isSingleSelectionMode ? _defineProperty({}, "".concat(props.value), true) : _objectSpread({}, props.value);
    setExpandedKeysState({});
    if (keys && props.options) {
      updateTreeBranchState(null, null, keys);
    }
  };
  var setFocusToFocusableFirstNode = function setFocusToFocusableFirstNode() {
    var treeNodeEl = DomHandler.find(treeRef.current.getElement(), '[data-pc-section="node"]');
    var focusedElement = _toConsumableArray(treeNodeEl).find(function (item) {
      return item.getAttribute('tabindex') === '0';
    });
    DomHandler.focus(focusedElement);
  };
  var updateTreeBranchState = function updateTreeBranchState(node, path, keys) {
    if (node) {
      if (isSelected(node, keys)) {
        expandPath(path);
        delete keys[node.key];
      }
      if (Object.keys(keys).length && node.children) {
        var _iterator3 = _createForOfIteratorHelper(node.children),
          _step3;
        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var childNode = _step3.value;
            path.push(node.key);
            updateTreeBranchState(childNode, path, keys);
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      }
    } else {
      var _iterator4 = _createForOfIteratorHelper(props.options),
        _step4;
      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var _childNode2 = _step4.value;
          updateTreeBranchState(_childNode2, [], keys);
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
    }
  };
  var expandPath = function expandPath(path) {
    if (path.length > 0) {
      var _expandedKeys = _objectSpread({}, expandedKeysState || {});
      var _iterator5 = _createForOfIteratorHelper(path),
        _step5;
      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var key = _step5.value;
          _expandedKeys[key] = true;
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
      setExpandedKeysState(_expandedKeys);
    }
  };
  var getSelectedNodes = function getSelectedNodes() {
    var selectedNodes = [];
    if (ObjectUtils.isNotEmpty(props.value) && props.options) {
      var keys = isSingleSelectionMode ? _defineProperty({}, "".concat(props.value), true) : _objectSpread({}, props.value);
      findSelectedNodes(null, keys, selectedNodes);
    }
    return selectedNodes;
  };
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      clear: clear,
      show: show,
      hide: hide,
      focus: function focus() {
        return DomHandler.focus(focusInputRef.current);
      },
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  });
  React.useEffect(function () {
    ObjectUtils.combinedRefs(focusInputRef, props.inputRef);
  }, [focusInputRef, props.inputRef]);
  useMountEffect(function () {
    updateTreeState();
    listId.current = UniqueComponentId() + '_list';
    if (props.autoFocus) {
      DomHandler.focus(focusInputRef.current, props.autoFocus);
    }
    alignOverlay();
  });
  useUpdateEffect(function () {
    if (overlayVisibleState && props.filter) {
      alignOverlay();
    }
  });
  useUpdateEffect(function () {
    updateTreeState();
  }, [props.options]);
  useUpdateEffect(function () {
    if (focusToTree.current && overlayVisibleState) {
      focusToTree.current = false;
      setFocusToFocusableFirstNode();
    }
  }, [overlayVisibleState]);
  useUpdateEffect(function () {
    if (overlayVisibleState && expandedKeysState) {
      alignOverlay();
    }
  }, [expandedKeysState]);
  useUpdateEffect(function () {
    if (overlayVisibleState) {
      if (!selfChange.current) {
        updateTreeState();
      }
      selfChange.current = false;
    }
  }, [props.value]);
  useUnmountEffect(function () {
    ZIndexUtils.clear(overlayRef.current);
  });
  var createKeyboardHelper = function createKeyboardHelper() {
    var hiddenInputWrapperProps = mergeProps({
      className: 'p-hidden-accessible'
    }, ptm('hiddenInputWrapper'));
    var hiddenInputProps = mergeProps(_objectSpread({
      ref: focusInputRef,
      role: 'listbox',
      id: props.inputId,
      type: 'text',
      'aria-expanded': overlayVisibleState,
      'aria-label': props.ariaLabel,
      'aria-labelledby': props.ariaLabelledBy,
      'aria-haspopup': 'tree',
      'aria-controls': listId.current,
      onFocus: onInputFocus,
      onBlur: onInputBlur,
      onKeyDown: onKeyDown,
      disabled: props.disabled,
      tabIndex: props.tabIndex
    }, ariaProps), ptm('hiddenInput'));
    return /*#__PURE__*/React.createElement("div", hiddenInputWrapperProps, /*#__PURE__*/React.createElement("input", _extends({}, hiddenInputProps, {
      readOnly: true
    })));
  };
  var createLabel = function createLabel() {
    var tokenProps = mergeProps({
      className: cx('token')
    }, ptm('token'));
    var tokenLabelProps = mergeProps({
      className: cx('tokenLabel')
    }, ptm('tokenLabel'));
    var labelContainerProps = mergeProps({
      className: cx('labelContainer')
    }, ptm('labelContainer'));
    var labelProps = mergeProps({
      className: cx('label', {
        isValueEmpty: isValueEmpty,
        getLabel: getLabel
      })
    }, ptm('label'));
    var content = null;
    if (props.valueTemplate) {
      content = ObjectUtils.getJSXElement(props.valueTemplate, selectedNodes, props);
    } else if (props.display === 'comma') {
      content = getLabel() || 'empty';
    } else if (props.display === 'chip') {
      content = /*#__PURE__*/React.createElement(React.Fragment, null, selectedNodes && selectedNodes.map(function (node, index) {
        return /*#__PURE__*/React.createElement("div", _extends({}, tokenProps, {
          key: "".concat(node.key, "_").concat(index)
        }), /*#__PURE__*/React.createElement("span", tokenLabelProps, node.label));
      }), isValueEmpty && (props.placeholder || 'empty'));
    }
    return /*#__PURE__*/React.createElement("div", labelContainerProps, /*#__PURE__*/React.createElement("div", labelProps, content));
  };
  var createDropdownIcon = function createDropdownIcon() {
    var triggerProps = mergeProps({
      ref: triggerRef,
      className: cx('trigger'),
      role: 'button',
      'aria-haspopup': 'tree',
      'aria-expanded': overlayVisibleState
    }, ptm('trigger'));
    var triggerIconProps = mergeProps({
      className: cx('triggerIcon')
    }, ptm('triggerIcon'));
    var icon = props.dropdownIcon || /*#__PURE__*/React.createElement(ChevronDownIcon, triggerIconProps);
    var dropdownIcon = IconUtils.getJSXIcon(icon, _objectSpread({}, triggerIconProps), {
      props: props
    });
    return /*#__PURE__*/React.createElement("div", triggerProps, dropdownIcon);
  };
  var createClearIcon = function createClearIcon() {
    if (props.value != null && props.showClear && !props.disabled) {
      var clearIconProps = mergeProps({
        className: cx('clearIcon'),
        onPointerUp: clear
      }, ptm('clearIcon'));
      var icon = props.clearIcon || /*#__PURE__*/React.createElement(TimesIcon, clearIconProps);
      return IconUtils.getJSXIcon(icon, _objectSpread({}, clearIconProps), {
        props: props
      });
    }
    return null;
  };
  var createContent = function createContent() {
    var message = ObjectUtils.getJSXElement(props.emptyMessage, props) || localeOption('emptyMessage');
    var emptyMessageProps = mergeProps({
      className: cx('emptyMessage')
    }, ptm('emptyMessage'));
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Tree, {
      ref: treeRef,
      id: listId.current,
      expandedKeys: expandedKeys,
      filter: props.filter,
      filterBy: props.filterBy,
      filterLocale: props.filterLocale,
      filterMode: props.filterMode,
      filterPlaceholder: props.filterPlaceholder,
      filterValue: filteredValue,
      metaKeySelection: props.metaKeySelection,
      nodeTemplate: props.nodeTemplate,
      onCollapse: props.onNodeCollapse,
      onExpand: props.onNodeExpand,
      onFilterValueChange: onFilterValueChange,
      onSelect: onNodeSelect,
      onSelectionChange: onSelectionChange,
      onToggle: onNodeToggle,
      onUnselect: onNodeUnselect,
      selectionKeys: props.value,
      selectionMode: props.selectionMode,
      showHeader: false,
      togglerTemplate: props.togglerTemplate,
      value: props.options,
      pt: ptm('tree'),
      __parentMetadata: {
        parent: metaData
      }
    }), hasNoOptions && /*#__PURE__*/React.createElement("div", emptyMessageProps, message));
  };
  var createFilterElement = function createFilterElement() {
    if (props.filter) {
      var filterValue = ObjectUtils.isNotEmpty(filteredValue) ? filteredValue : '';
      var filterContainerProps = mergeProps({
        className: cx('filterContainer')
      }, ptm('filterContainer'));
      var filterProps = mergeProps({
        ref: filterInputRef,
        type: 'text',
        value: filterValue,
        autoComplete: 'off',
        className: cx('filter'),
        placeholder: props.filterPlaceholder,
        onKeyDown: function onKeyDown(event) {
          return onHeaderElementKeyDown(event, false);
        },
        onChange: onFilterInputChange,
        disabled: props.disabled
      }, ptm('filter'));
      var filterIconProps = mergeProps({
        className: cx('filterIcon')
      }, ptm('filterIcon'));
      var icon = props.filterIcon || /*#__PURE__*/React.createElement(SearchIcon, filterIconProps);
      var filterIcon = IconUtils.getJSXIcon(icon, _objectSpread({}, filterIconProps), {
        props: props
      });
      var filterContent = /*#__PURE__*/React.createElement("div", filterContainerProps, /*#__PURE__*/React.createElement("input", filterProps), filterIcon);
      if (props.filterTemplate) {
        var defaultContentOptions = {
          className: 'p-treeselect-filter-container',
          element: filterContent,
          filterOptions: filterOptions,
          filterInputKeyDown: function filterInputKeyDown(event) {
            return onHeaderElementKeyDown(event, function () {});
          },
          filterInputChange: onFilterInputChange,
          filterIconClassName: 'p-dropdown-filter-icon',
          props: props
        };
        filterContent = ObjectUtils.getJSXElement(props.filterTemplate, defaultContentOptions);
      }
      return /*#__PURE__*/React.createElement(React.Fragment, null, filterContent);
    }
  };
  var createHeader = function createHeader() {
    var filterElement = createFilterElement();
    var closeIconProps = mergeProps({
      className: cx('closeIcon'),
      'aria-hidden': true
    }, ptm('closeIcon'));
    var icon = props.closeIcon || /*#__PURE__*/React.createElement(TimesIcon, closeIconProps);
    var closeIcon = IconUtils.getJSXIcon(icon, _objectSpread({}, closeIconProps), {
      props: props
    });
    var closeButtonProps = mergeProps({
      type: 'button',
      className: cx('closeButton'),
      onKeyDown: function onKeyDown(event) {
        return onHeaderElementKeyDown(event, true);
      },
      onClick: hide,
      'aria-label': localeOption('close')
    }, ptm('closeButton'));
    var headerProps = mergeProps({
      className: cx('header')
    }, ptm('header'));
    var closeElement = /*#__PURE__*/React.createElement("button", closeButtonProps, closeIcon, /*#__PURE__*/React.createElement(Ripple, null));
    var content = /*#__PURE__*/React.createElement("div", headerProps, filterElement, closeElement);
    if (props.panelHeaderTemplate) {
      var defaultOptions = {
        className: 'p-treeselect-header',
        filterElement: filterElement,
        closeElement: closeElement,
        closeElementClassName: 'p-treeselect-close p-link',
        closeIconClassName: 'p-treeselect-close-icon',
        onCloseClick: hide,
        element: content,
        props: props
      };
      return ObjectUtils.getJSXElement(props.panelHeaderTemplate, defaultOptions);
    }
    return content;
  };
  var createFooter = function createFooter() {
    return ObjectUtils.getJSXElement(props.panelFooterTemplate, props);
  };
  var selectedNodes = getSelectedNodes();
  var otherProps = TreeSelectBase.getOtherProps(props);
  var ariaProps = ObjectUtils.reduceKeys(otherProps, DomHandler.ARIA_PROPS);
  var firstHiddenFocusableElementOnOverlayProps = mergeProps({
    ref: firstHiddenFocusableElementOnOverlay,
    role: 'presentation',
    className: 'p-hidden-accessible p-hidden-focusable',
    tabIndex: 0,
    onFocus: onFirstHiddenFocus,
    'aria-hidden': true,
    'data-p-hidden-accessible': true,
    'data-p-hidden-focusable': true
  }, ptm('firstHiddenFocusableElementOnOverlay'));
  var lastHiddenFocusableElementOnOverlayProps = mergeProps({
    ref: lastHiddenFocusableElementOnOverlay,
    role: 'presentation',
    className: 'p-hidden-accessible p-hidden-focusable',
    tabIndex: 0,
    onFocus: onLastHiddenFocus,
    'aria-hidden': true,
    'data-p-hidden-accessible': true,
    'data-p-hidden-focusable': true
  }, ptm('lastHiddenFocusableElementOnOverlay'));
  var rootProps = mergeProps({
    ref: elementRef,
    className: classNames(props.className, cx('root', {
      context: context,
      focusedState: focusedState,
      overlayVisibleState: overlayVisibleState,
      isValueEmpty: isValueEmpty
    })),
    style: props.style,
    onClick: onClick
  }, TreeSelectBase.getOtherProps(props), ptm('root'));
  var keyboardHelper = createKeyboardHelper();
  var labelElement = createLabel();
  var dropdownIcon = createDropdownIcon();
  var clearIcon = createClearIcon();
  var content = createContent();
  var header = createHeader();
  var footer = createFooter();
  return /*#__PURE__*/React.createElement("div", rootProps, keyboardHelper, labelElement, clearIcon, dropdownIcon, /*#__PURE__*/React.createElement(TreeSelectPanel, {
    hostName: "TreeSelect",
    ref: overlayRef,
    appendTo: props.appendTo,
    panelStyle: props.panelStyle,
    panelClassName: props.panelClassName,
    scrollHeight: props.scrollHeight,
    onClick: onOverlayClick,
    header: header,
    hide: hide,
    footer: footer,
    firstHiddenFocusableElementOnOverlay: /*#__PURE__*/React.createElement("span", firstHiddenFocusableElementOnOverlayProps),
    lastHiddenFocusableElementOnOverlay: /*#__PURE__*/React.createElement("span", lastHiddenFocusableElementOnOverlayProps),
    transitionOptions: props.transitionOptions,
    "in": overlayVisibleState,
    onEnter: onOverlayEnter,
    onEntered: onOverlayEntered,
    onExit: onOverlayExit,
    onExited: onOverlayExited,
    ptm: ptm,
    cx: cx
  }, content), hasTooltip && /*#__PURE__*/React.createElement(Tooltip, _extends({
    target: elementRef,
    content: props.tooltip,
    pt: ptm('tooltip')
  }, props.tooltipOptions)));
}));
TreeSelect.displayName = 'TreeSelect';

export { TreeSelect };
