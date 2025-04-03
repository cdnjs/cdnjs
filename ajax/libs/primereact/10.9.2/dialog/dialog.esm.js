'use client';
import * as React from 'react';
import React__default from 'react';
import PrimeReact, { PrimeReactContext, ariaLabel } from 'primereact/api';
import { ComponentBase, useHandleStyle } from 'primereact/componentbase';
import { CSSTransition } from 'primereact/csstransition';
import { useStyle, useMountEffect, useMergeProps, useDisplayOrder, useGlobalOnEscapeKey, ESC_KEY_HANDLING_PRIORITIES, useEventListener, useUpdateEffect, useUnmountEffect } from 'primereact/hooks';
import { ObjectUtils, DomHandler, classNames, UniqueComponentId, ZIndexUtils, IconUtils } from 'primereact/utils';
import { TimesIcon } from 'primereact/icons/times';
import { WindowMaximizeIcon } from 'primereact/icons/windowmaximize';
import { WindowMinimizeIcon } from 'primereact/icons/windowminimize';
import { Portal } from 'primereact/portal';
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

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
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
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

var styles$1 = '';
var FocusTrapBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'FocusTrap',
    children: undefined
  },
  css: {
    styles: styles$1
  },
  getProps: function getProps(props) {
    return ObjectUtils.getMergedProps(props, FocusTrapBase.defaultProps);
  },
  getOtherProps: function getOtherProps(props) {
    return ObjectUtils.getDiffProps(props, FocusTrapBase.defaultProps);
  }
});

function ownKeys$2(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$2(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$2(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$2(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var FocusTrap = /*#__PURE__*/React__default.memo(/*#__PURE__*/React__default.forwardRef(function (inProps, ref) {
  var targetRef = React__default.useRef(null);
  var firstFocusableElementRef = React__default.useRef(null);
  var lastFocusableElementRef = React__default.useRef(null);
  var context = React__default.useContext(PrimeReactContext);
  var props = FocusTrapBase.getProps(inProps, context);
  var metaData = {
    props: props
  };
  useStyle(FocusTrapBase.css.styles, {
    name: 'focustrap'
  });
  var _FocusTrapBase$setMet = FocusTrapBase.setMetaData(_objectSpread$2({}, metaData));
    _FocusTrapBase$setMet.ptm;
  React__default.useImperativeHandle(ref, function () {
    return {
      props: props,
      getInk: function getInk() {
        return firstFocusableElementRef.current;
      },
      getTarget: function getTarget() {
        return targetRef.current;
      }
    };
  });
  useMountEffect(function () {
    if (!props.disabled) {
      targetRef.current = getTarget();
      setAutoFocus(targetRef.current);
    }
  });
  var getTarget = function getTarget() {
    return firstFocusableElementRef.current && firstFocusableElementRef.current.parentElement;
  };

  /**
   * This method sets the auto focus on the first focusable element within the target element.
   * It first tries to find a focusable element using the autoFocusSelector. If no such element is found,
   * it then tries to find a focusable element using the firstFocusableSelector.
   * If the autoFocus prop is set to true and a focusable element is found, it sets the focus on that element.
   *
   * @param {HTMLElement} target - The target element within which to find a focusable element.
   */
  var setAutoFocus = function setAutoFocus(target) {
    var _ref = props || {},
      _ref$autoFocusSelecto = _ref.autoFocusSelector,
      autoFocusSelector = _ref$autoFocusSelecto === void 0 ? '' : _ref$autoFocusSelecto,
      _ref$firstFocusableSe = _ref.firstFocusableSelector,
      firstFocusableSelector = _ref$firstFocusableSe === void 0 ? '' : _ref$firstFocusableSe,
      _ref$autoFocus = _ref.autoFocus,
      autoFocus = _ref$autoFocus === void 0 ? false : _ref$autoFocus;
    var defaultAutoFocusSelector = "".concat(getComputedSelector(autoFocusSelector));
    var computedAutoFocusSelector = "[autofocus]".concat(defaultAutoFocusSelector, ", [data-pc-autofocus='true']").concat(defaultAutoFocusSelector);
    var focusableElement = DomHandler.getFirstFocusableElement(target, computedAutoFocusSelector);
    autoFocus && !focusableElement && (focusableElement = DomHandler.getFirstFocusableElement(target, getComputedSelector(firstFocusableSelector)));
    DomHandler.focus(focusableElement);
  };
  var getComputedSelector = function getComputedSelector(selector) {
    return ":not(.p-hidden-focusable):not([data-p-hidden-focusable=\"true\"])".concat(selector !== null && selector !== void 0 ? selector : '');
  };
  var onFirstHiddenElementFocus = function onFirstHiddenElementFocus(event) {
    var _targetRef$current;
    var currentTarget = event.currentTarget,
      relatedTarget = event.relatedTarget;
    var focusableElement = relatedTarget === currentTarget.$_pfocustrap_lasthiddenfocusableelement || !((_targetRef$current = targetRef.current) !== null && _targetRef$current !== void 0 && _targetRef$current.contains(relatedTarget)) ? DomHandler.getFirstFocusableElement(currentTarget.parentElement, getComputedSelector(currentTarget.$_pfocustrap_focusableselector)) : currentTarget.$_pfocustrap_lasthiddenfocusableelement;
    DomHandler.focus(focusableElement);
  };
  var onLastHiddenElementFocus = function onLastHiddenElementFocus(event) {
    var _targetRef$current2;
    var currentTarget = event.currentTarget,
      relatedTarget = event.relatedTarget;
    var focusableElement = relatedTarget === currentTarget.$_pfocustrap_firsthiddenfocusableelement || !((_targetRef$current2 = targetRef.current) !== null && _targetRef$current2 !== void 0 && _targetRef$current2.contains(relatedTarget)) ? DomHandler.getLastFocusableElement(currentTarget.parentElement, getComputedSelector(currentTarget.$_pfocustrap_focusableselector)) : currentTarget.$_pfocustrap_firsthiddenfocusableelement;
    DomHandler.focus(focusableElement);
  };
  var createHiddenFocusableElements = function createHiddenFocusableElements() {
    var _ref2 = props || {},
      _ref2$tabIndex = _ref2.tabIndex,
      tabIndex = _ref2$tabIndex === void 0 ? 0 : _ref2$tabIndex;
    var createFocusableElement = function createFocusableElement(inRef, onFocus, section) {
      return /*#__PURE__*/React__default.createElement("span", {
        ref: inRef,
        className: 'p-hidden-accessible p-hidden-focusable',
        tabIndex: tabIndex,
        role: 'presentation',
        "aria-hidden": true,
        "data-p-hidden-accessible": true,
        "data-p-hidden-focusable": true,
        onFocus: onFocus,
        "data-pc-section": section
      });
    };
    var firstFocusableElement = createFocusableElement(firstFocusableElementRef, onFirstHiddenElementFocus, 'firstfocusableelement');
    var lastFocusableElement = createFocusableElement(lastFocusableElementRef, onLastHiddenElementFocus, 'lastfocusableelement');
    if (firstFocusableElementRef.current && lastFocusableElementRef.current) {
      firstFocusableElementRef.current.$_pfocustrap_lasthiddenfocusableelement = lastFocusableElementRef.current;
      lastFocusableElementRef.current.$_pfocustrap_firsthiddenfocusableelement = firstFocusableElementRef.current;
    }
    return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, firstFocusableElement, props.children, lastFocusableElement);
  };
  return createHiddenFocusableElements();
}));
var FocusTrap$1 = FocusTrap;

function ownKeys$1(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$1(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$1(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var classes = {
  closeButtonIcon: 'p-dialog-header-close-icon',
  closeButton: 'p-dialog-header-icon p-dialog-header-close p-link',
  maximizableIcon: 'p-dialog-header-maximize-icon',
  maximizableButton: 'p-dialog-header-icon p-dialog-header-maximize p-link',
  header: function header(_ref) {
    var props = _ref.props;
    return classNames('p-dialog-header', props.headerClassName);
  },
  headerTitle: 'p-dialog-title',
  headerIcons: 'p-dialog-header-icons',
  content: function content(_ref2) {
    var props = _ref2.props;
    return classNames('p-dialog-content', props.contentClassName);
  },
  footer: function footer(_ref3) {
    var props = _ref3.props;
    return classNames('p-dialog-footer', props.footerClassName);
  },
  mask: function mask(_ref4) {
    var props = _ref4.props,
      maskVisibleState = _ref4.maskVisibleState;
    var positions = ['center', 'left', 'right', 'top', 'top-left', 'top-right', 'bottom', 'bottom-left', 'bottom-right'];
    var pos = positions.find(function (item) {
      return item === props.position || item.replace('-', '') === props.position;
    });
    return classNames('p-dialog-mask', pos ? "p-dialog-".concat(pos) : '', {
      'p-component-overlay p-component-overlay-enter': props.modal,
      'p-dialog-visible': maskVisibleState,
      'p-dialog-draggable': props.draggable,
      'p-dialog-resizable': props.resizable
    }, props.maskClassName);
  },
  root: function root(_ref5) {
    var props = _ref5.props,
      maximized = _ref5.maximized,
      context = _ref5.context;
    return classNames('p-dialog p-component', {
      'p-dialog-rtl': props.rtl,
      'p-dialog-maximized': maximized,
      'p-dialog-default': !maximized,
      'p-input-filled': context && context.inputStyle === 'filled' || PrimeReact.inputStyle === 'filled',
      'p-ripple-disabled': context && context.ripple === false || PrimeReact.ripple === false
    });
  },
  transition: 'p-dialog'
};
var styles = "\n@layer primereact {\n    .p-dialog-mask {\n        background-color: transparent;\n        transition-property: background-color;\n    }\n\n    .p-dialog-visible {\n        display: flex;\n    }\n\n    .p-dialog-mask.p-component-overlay {\n        pointer-events: auto;\n    }\n\n    .p-dialog {\n        display: flex;\n        flex-direction: column;\n        pointer-events: auto;\n        max-height: 90%;\n        transform: scale(1);\n        position: relative;\n    }\n\n    .p-dialog-content {\n        overflow-y: auto;\n        flex-grow: 1;\n    }\n\n    .p-dialog-header {\n        display: flex;\n        align-items: center;\n        flex-shrink: 0;\n    }\n\n    .p-dialog-footer {\n        flex-shrink: 0;\n    }\n\n    .p-dialog .p-dialog-header-icons {\n        display: flex;\n        align-items: center;\n        align-self: flex-start;\n        flex-shrink: 0;\n    }\n\n    .p-dialog .p-dialog-header-icon {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        overflow: hidden;\n        position: relative;\n    }\n\n    .p-dialog .p-dialog-title {\n        flex-grow: 1;\n    }\n\n    /* Fluid */\n    .p-fluid .p-dialog-footer .p-button {\n        width: auto;\n    }\n\n    /* Animation */\n    /* Center */\n    .p-dialog-enter {\n        opacity: 0;\n        transform: scale(0.7);\n    }\n\n    .p-dialog-enter-active {\n        opacity: 1;\n        transform: scale(1);\n        transition: all 150ms cubic-bezier(0, 0, 0.2, 1);\n    }\n\n    .p-dialog-enter-done {\n        transform: none;\n    }\n\n    .p-dialog-exit-active {\n        opacity: 0;\n        transform: scale(0.7);\n        transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);\n    }\n\n    /* Top, Bottom, Left, Right, Top* and Bottom* */\n    .p-dialog-top .p-dialog,\n    .p-dialog-bottom .p-dialog,\n    .p-dialog-left .p-dialog,\n    .p-dialog-right .p-dialog,\n    .p-dialog-top-left .p-dialog,\n    .p-dialog-top-right .p-dialog,\n    .p-dialog-bottom-left .p-dialog,\n    .p-dialog-bottom-right .p-dialog {\n        margin: 0.75em;\n    }\n\n    .p-dialog-top .p-dialog-enter,\n    .p-dialog-top .p-dialog-exit-active {\n        transform: translate3d(0px, -100%, 0px);\n    }\n\n    .p-dialog-bottom .p-dialog-enter,\n    .p-dialog-bottom .p-dialog-exit-active {\n        transform: translate3d(0px, 100%, 0px);\n    }\n\n    .p-dialog-left .p-dialog-enter,\n    .p-dialog-left .p-dialog-exit-active,\n    .p-dialog-top-left .p-dialog-enter,\n    .p-dialog-top-left .p-dialog-exit-active,\n    .p-dialog-bottom-left .p-dialog-enter,\n    .p-dialog-bottom-left .p-dialog-exit-active {\n        transform: translate3d(-100%, 0px, 0px);\n    }\n\n    .p-dialog-right .p-dialog-enter,\n    .p-dialog-right .p-dialog-exit-active,\n    .p-dialog-top-right .p-dialog-enter,\n    .p-dialog-top-right .p-dialog-exit-active,\n    .p-dialog-bottom-right .p-dialog-enter,\n    .p-dialog-bottom-right .p-dialog-exit-active {\n        transform: translate3d(100%, 0px, 0px);\n    }\n\n    .p-dialog-top .p-dialog-enter-active,\n    .p-dialog-bottom .p-dialog-enter-active,\n    .p-dialog-left .p-dialog-enter-active,\n    .p-dialog-top-left .p-dialog-enter-active,\n    .p-dialog-bottom-left .p-dialog-enter-active,\n    .p-dialog-right .p-dialog-enter-active,\n    .p-dialog-top-right .p-dialog-enter-active,\n    .p-dialog-bottom-right .p-dialog-enter-active {\n        transform: translate3d(0px, 0px, 0px);\n        transition: all 0.3s ease-out;\n    }\n\n    .p-dialog-top .p-dialog-exit-active,\n    .p-dialog-bottom .p-dialog-exit-active,\n    .p-dialog-left .p-dialog-exit-active,\n    .p-dialog-top-left .p-dialog-exit-active,\n    .p-dialog-bottom-left .p-dialog-exit-active,\n    .p-dialog-right .p-dialog-exit-active,\n    .p-dialog-top-right .p-dialog-exit-active,\n    .p-dialog-bottom-right .p-dialog-exit-active {\n        transition: all 0.3s ease-out;\n    }\n\n    /* Maximize */\n    .p-dialog-maximized {\n        transition: none;\n        transform: none;\n        margin: 0;\n        width: 100vw !important;\n        height: 100vh !important;\n        max-height: 100%;\n        top: 0px !important;\n        left: 0px !important;\n    }\n\n    .p-dialog-maximized .p-dialog-content {\n        flex-grow: 1;\n    }\n\n    .p-confirm-dialog .p-dialog-content {\n        display: flex;\n        align-items: center;\n    }\n\n    /* Resizable */\n    .p-dialog .p-resizable-handle {\n        position: absolute;\n        font-size: 0.1px;\n        display: block;\n        cursor: se-resize;\n        width: 12px;\n        height: 12px;\n        right: 1px;\n        bottom: 1px;\n    }\n\n    .p-dialog-draggable .p-dialog-header {\n        cursor: move;\n    }\n}\n";
var inlineStyles = {
  mask: function mask(_ref6) {
    var props = _ref6.props;
    return _objectSpread$1({
      position: 'fixed',
      height: '100%',
      width: '100%',
      left: 0,
      top: 0,
      display: 'flex',
      justifyContent: props.position === 'left' || props.position === 'top-left' || props.position === 'bottom-left' ? 'flex-start' : props.position === 'right' || props.position === 'top-right' || props.position === 'bottom-right' ? 'flex-end' : 'center',
      alignItems: props.position === 'top' || props.position === 'top-left' || props.position === 'top-right' ? 'flex-start' : props.position === 'bottom' || props.position === 'bottom-left' || props.position === 'bottom-right' ? 'flex-end' : 'center',
      pointerEvents: !props.modal && 'none'
    }, props.maskStyle);
  }
};
var DialogBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'Dialog',
    __parentMetadata: null,
    appendTo: null,
    ariaCloseIconLabel: null,
    baseZIndex: 0,
    blockScroll: false,
    breakpoints: null,
    className: null,
    closable: true,
    closeIcon: null,
    closeOnEscape: true,
    content: null,
    contentClassName: null,
    contentStyle: null,
    dismissableMask: false,
    draggable: true,
    focusOnShow: true,
    footer: null,
    footerClassName: null,
    header: null,
    headerClassName: null,
    headerStyle: null,
    icons: null,
    id: null,
    keepInViewport: true,
    maskClassName: null,
    maskStyle: null,
    maximizable: false,
    maximizeIcon: null,
    maximized: false,
    minX: 0,
    minY: 0,
    minimizeIcon: null,
    modal: true,
    onClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragStart: null,
    onHide: null,
    onMaskClick: null,
    onMaximize: null,
    onResize: null,
    onResizeEnd: null,
    onResizeStart: null,
    onShow: null,
    position: 'center',
    resizable: true,
    rtl: false,
    showHeader: true,
    style: null,
    transitionOptions: null,
    visible: false,
    children: undefined
  },
  css: {
    classes: classes,
    styles: styles,
    inlineStyles: inlineStyles
  }
});

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var Dialog = /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var mergeProps = useMergeProps();
  var context = React.useContext(PrimeReactContext);
  var props = DialogBase.getProps(inProps, context);
  var uniqueId = props.id ? props.id : UniqueComponentId();
  var _React$useState = React.useState(uniqueId),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    idState = _React$useState2[0];
    _React$useState2[1];
  var _React$useState3 = React.useState(false),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    maskVisibleState = _React$useState4[0],
    setMaskVisibleState = _React$useState4[1];
  var _React$useState5 = React.useState(false),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    visibleState = _React$useState6[0],
    setVisibleState = _React$useState6[1];
  var _React$useState7 = React.useState(props.maximized),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    maximizedState = _React$useState8[0],
    setMaximizedState = _React$useState8[1];
  var dialogRef = React.useRef(null);
  var maskRef = React.useRef(null);
  var pointerRef = React.useRef(null);
  var contentRef = React.useRef(null);
  var headerRef = React.useRef(null);
  var footerRef = React.useRef(null);
  var closeRef = React.useRef(null);
  var dragging = React.useRef(false);
  var resizing = React.useRef(false);
  var lastPageX = React.useRef(null);
  var lastPageY = React.useRef(null);
  var styleElement = React.useRef(null);
  var attributeSelector = React.useRef(uniqueId);
  var focusElementOnHide = React.useRef(null);
  var maximized = props.onMaximize ? props.maximized : maximizedState;
  var shouldBlockScroll = visibleState && (props.blockScroll || props.maximizable && maximized);
  var isCloseOnEscape = props.closable && props.closeOnEscape && visibleState;
  var displayOrder = useDisplayOrder('dialog', isCloseOnEscape);
  var _DialogBase$setMetaDa = DialogBase.setMetaData(_objectSpread(_objectSpread({
      props: props
    }, props.__parentMetadata), {}, {
      state: {
        id: idState,
        maximized: maximized,
        containerVisible: maskVisibleState
      }
    })),
    ptm = _DialogBase$setMetaDa.ptm,
    cx = _DialogBase$setMetaDa.cx,
    sx = _DialogBase$setMetaDa.sx,
    isUnstyled = _DialogBase$setMetaDa.isUnstyled;
  useHandleStyle(DialogBase.css.styles, isUnstyled, {
    name: 'dialog'
  });
  useGlobalOnEscapeKey({
    callback: function callback(event) {
      onClose(event);
    },
    when: isCloseOnEscape && displayOrder,
    priority: [ESC_KEY_HANDLING_PRIORITIES.DIALOG, displayOrder]
  });
  var _useEventListener = useEventListener({
      type: 'mousemove',
      target: function target() {
        return window.document;
      },
      listener: function listener(event) {
        return onResize(event);
      }
    }),
    _useEventListener2 = _slicedToArray(_useEventListener, 2),
    bindDocumentResizeListener = _useEventListener2[0],
    unbindDocumentResizeListener = _useEventListener2[1];
  var _useEventListener3 = useEventListener({
      type: 'mouseup',
      target: function target() {
        return window.document;
      },
      listener: function listener(event) {
        return onResizeEnd(event);
      }
    }),
    _useEventListener4 = _slicedToArray(_useEventListener3, 2),
    bindDocumentResizeEndListener = _useEventListener4[0],
    unbindDocumentResizEndListener = _useEventListener4[1];
  var _useEventListener5 = useEventListener({
      type: 'mousemove',
      target: function target() {
        return window.document;
      },
      listener: function listener(event) {
        return onDrag(event);
      }
    }),
    _useEventListener6 = _slicedToArray(_useEventListener5, 2),
    bindDocumentDragListener = _useEventListener6[0],
    unbindDocumentDragListener = _useEventListener6[1];
  var _useEventListener7 = useEventListener({
      type: 'mouseup',
      target: function target() {
        return window.document;
      },
      listener: function listener(event) {
        return onDragEnd(event);
      }
    }),
    _useEventListener8 = _slicedToArray(_useEventListener7, 2),
    bindDocumentDragEndListener = _useEventListener8[0],
    unbindDocumentDragEndListener = _useEventListener8[1];
  var onClose = function onClose(event) {
    props.onHide(event);
    event.preventDefault();
  };
  var focus = function focus() {
    var activeElement = document.activeElement;
    var isActiveElementInDialog = activeElement && dialogRef.current && dialogRef.current.contains(activeElement);
    if (!isActiveElementInDialog && props.closable && props.showHeader && closeRef.current) {
      closeRef.current.focus();
    }
  };
  var onDialogPointerDown = function onDialogPointerDown(event) {
    pointerRef.current = event.target;
    props.onPointerDown && props.onPointerDown(event);
  };
  var onMaskPointerUp = function onMaskPointerUp(event) {
    if (props.dismissableMask && props.modal && maskRef.current === event.target && !pointerRef.current) {
      onClose(event);
    }
    props.onMaskClick && props.onMaskClick(event);
    pointerRef.current = null;
  };
  var toggleMaximize = function toggleMaximize(event) {
    if (props.onMaximize) {
      props.onMaximize({
        originalEvent: event,
        maximized: !maximized
      });
    } else {
      setMaximizedState(function (prevMaximized) {
        return !prevMaximized;
      });
    }
    event.preventDefault();
  };
  var onDragStart = function onDragStart(event) {
    if (DomHandler.hasClass(event.target, 'p-dialog-header-icon') || DomHandler.hasClass(event.target.parentElement, 'p-dialog-header-icon')) {
      return;
    }
    if (props.draggable) {
      dragging.current = true;
      lastPageX.current = event.pageX;
      lastPageY.current = event.pageY;
      dialogRef.current.style.margin = '0';
      DomHandler.addClass(document.body, 'p-unselectable-text');
      props.onDragStart && props.onDragStart(event);
    }
  };
  var onDrag = function onDrag(event) {
    if (dragging.current) {
      var width = DomHandler.getOuterWidth(dialogRef.current);
      var height = DomHandler.getOuterHeight(dialogRef.current);
      var deltaX = event.pageX - lastPageX.current;
      var deltaY = event.pageY - lastPageY.current;
      var offset = dialogRef.current.getBoundingClientRect();
      var leftPos = offset.left + deltaX;
      var topPos = offset.top + deltaY;
      var viewport = DomHandler.getViewport();
      var computedStyle = getComputedStyle(dialogRef.current);
      var leftMargin = parseFloat(computedStyle.marginLeft);
      var topMargin = parseFloat(computedStyle.marginTop);
      dialogRef.current.style.position = 'fixed';
      if (props.keepInViewport) {
        if (leftPos >= props.minX && leftPos + width < viewport.width) {
          lastPageX.current = event.pageX;
          dialogRef.current.style.left = leftPos - leftMargin + 'px';
        }
        if (topPos >= props.minY && topPos + height < viewport.height) {
          lastPageY.current = event.pageY;
          dialogRef.current.style.top = topPos - topMargin + 'px';
        }
      } else {
        lastPageX.current = event.pageX;
        dialogRef.current.style.left = leftPos - leftMargin + 'px';
        lastPageY.current = event.pageY;
        dialogRef.current.style.top = topPos - topMargin + 'px';
      }
      props.onDrag && props.onDrag(event);
    }
  };
  var onDragEnd = function onDragEnd(event) {
    if (dragging.current) {
      dragging.current = false;
      DomHandler.removeClass(document.body, 'p-unselectable-text');
      props.onDragEnd && props.onDragEnd(event);
    }
  };
  var onResizeStart = function onResizeStart(event) {
    if (props.resizable) {
      resizing.current = true;
      lastPageX.current = event.pageX;
      lastPageY.current = event.pageY;
      DomHandler.addClass(document.body, 'p-unselectable-text');
      props.onResizeStart && props.onResizeStart(event);
    }
  };
  var convertToPx = function convertToPx(value, property, viewport) {
    !viewport && (viewport = DomHandler.getViewport());
    var val = parseInt(value);
    if (/^(\d+|(\.\d+))(\.\d+)?%$/.test(value)) {
      return val * (viewport[property] / 100);
    }
    return val;
  };
  var onResize = function onResize(event) {
    if (resizing.current) {
      var deltaX = event.pageX - lastPageX.current;
      var deltaY = event.pageY - lastPageY.current;
      var width = DomHandler.getOuterWidth(dialogRef.current);
      var height = DomHandler.getOuterHeight(dialogRef.current);
      var offset = dialogRef.current.getBoundingClientRect();
      var viewport = DomHandler.getViewport();
      var hasBeenDragged = !parseInt(dialogRef.current.style.top) || !parseInt(dialogRef.current.style.left);
      var minWidth = convertToPx(dialogRef.current.style.minWidth, 'width', viewport);
      var minHeight = convertToPx(dialogRef.current.style.minHeight, 'height', viewport);
      var newWidth = width + deltaX;
      var newHeight = height + deltaY;
      if (hasBeenDragged) {
        newWidth = newWidth + deltaX;
        newHeight = newHeight + deltaY;
      }
      if ((!minWidth || newWidth > minWidth) && offset.left + newWidth < viewport.width) {
        dialogRef.current.style.width = newWidth + 'px';
      }
      if ((!minHeight || newHeight > minHeight) && offset.top + newHeight < viewport.height) {
        dialogRef.current.style.height = newHeight + 'px';
      }
      lastPageX.current = event.pageX;
      lastPageY.current = event.pageY;
      props.onResize && props.onResize(event);
    }
  };
  var onResizeEnd = function onResizeEnd(event) {
    if (resizing.current) {
      resizing.current = false;
      DomHandler.removeClass(document.body, 'p-unselectable-text');
      props.onResizeEnd && props.onResizeEnd(event);
    }
  };
  var resetPosition = function resetPosition() {
    dialogRef.current.style.position = '';
    dialogRef.current.style.left = '';
    dialogRef.current.style.top = '';
    dialogRef.current.style.margin = '';
  };
  var onEnter = function onEnter() {
    dialogRef.current.setAttribute(attributeSelector.current, '');
  };
  var onEntered = function onEntered() {
    props.onShow && props.onShow();
    if (props.focusOnShow) {
      focus();
    }
    enableDocumentSettings();
  };
  var onExiting = function onExiting() {
    if (props.modal) {
      !isUnstyled() && DomHandler.addClass(maskRef.current, 'p-component-overlay-leave');
    }
  };
  var onExited = function onExited() {
    dragging.current = false;
    ZIndexUtils.clear(maskRef.current);
    setMaskVisibleState(false);
    disableDocumentSettings();

    // return focus to element before dialog was open
    DomHandler.focus(focusElementOnHide.current);
    focusElementOnHide.current = null;
  };
  var enableDocumentSettings = function enableDocumentSettings() {
    bindGlobalListeners();
  };
  var disableDocumentSettings = function disableDocumentSettings() {
    unbindGlobalListeners();
  };
  var updateScrollBlocker = function updateScrollBlocker() {
    // Scroll should be unblocked if there is at least one dialog that blocks scrolling:
    var isThereAnyDialogThatBlocksScrolling = document.primeDialogParams && document.primeDialogParams.some(function (i) {
      return i.hasBlockScroll;
    });
    if (isThereAnyDialogThatBlocksScrolling) {
      DomHandler.blockBodyScroll();
    } else {
      DomHandler.unblockBodyScroll();
    }
  };
  var updateGlobalDialogsRegistry = function updateGlobalDialogsRegistry(isMounted) {
    // Update current dialog info in global registry if it is mounted and visible:
    if (isMounted && visibleState) {
      var newParam = {
        id: idState,
        hasBlockScroll: shouldBlockScroll
      };

      // Create registry if not yet created:
      if (!document.primeDialogParams) {
        document.primeDialogParams = [];
      }
      var currentDialogIndexInRegistry = document.primeDialogParams.findIndex(function (dialogInRegistry) {
        return dialogInRegistry.id === idState;
      });
      if (currentDialogIndexInRegistry === -1) {
        document.primeDialogParams = [].concat(_toConsumableArray(document.primeDialogParams), [newParam]);
      } else {
        document.primeDialogParams = document.primeDialogParams.toSpliced(currentDialogIndexInRegistry, 1, newParam);
      }
    }
    // Or remove it from global registry if unmounted or invisible:
    else {
      document.primeDialogParams = document.primeDialogParams && document.primeDialogParams.filter(function (param) {
        return param.id !== idState;
      });
    }

    // Always update scroll blocker after dialog registry - this way we ensure that
    // p-overflow-hidden class is properly added/removed:
    updateScrollBlocker();
  };
  var bindGlobalListeners = function bindGlobalListeners() {
    if (props.draggable) {
      bindDocumentDragListener();
      bindDocumentDragEndListener();
    }
    if (props.resizable) {
      bindDocumentResizeListener();
      bindDocumentResizeEndListener();
    }
  };
  var unbindGlobalListeners = function unbindGlobalListeners() {
    unbindDocumentDragListener();
    unbindDocumentDragEndListener();
    unbindDocumentResizeListener();
    unbindDocumentResizEndListener();
  };
  var createStyle = function createStyle() {
    styleElement.current = DomHandler.createInlineStyle(context && context.nonce || PrimeReact.nonce, context && context.styleContainer);
    var innerHTML = '';
    for (var breakpoint in props.breakpoints) {
      innerHTML = innerHTML + "\n                @media screen and (max-width: ".concat(breakpoint, ") {\n                     [data-pc-name=\"dialog\"][").concat(attributeSelector.current, "] {\n                        width: ").concat(props.breakpoints[breakpoint], " !important;\n                    }\n                }\n            ");
    }
    styleElement.current.innerHTML = innerHTML;
  };
  var destroyStyle = function destroyStyle() {
    styleElement.current = DomHandler.removeInlineStyle(styleElement.current);
  };
  useMountEffect(function () {
    updateGlobalDialogsRegistry(true);
    if (props.visible) {
      setMaskVisibleState(true);
    }
  });
  React.useEffect(function () {
    if (props.breakpoints) {
      createStyle();
    }
    return function () {
      destroyStyle();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.breakpoints]);
  useUpdateEffect(function () {
    if (props.visible && !maskVisibleState) {
      setMaskVisibleState(true);
    }
    if (props.visible !== visibleState && maskVisibleState) {
      setVisibleState(props.visible);
    }
    if (props.visible) {
      // Remember the focused element before we opened the dialog
      // so we can return focus to it once we close the dialog.
      focusElementOnHide.current = document.activeElement;
    }
  }, [props.visible, maskVisibleState]);
  useUpdateEffect(function () {
    if (maskVisibleState) {
      ZIndexUtils.set('modal', maskRef.current, context && context.autoZIndex || PrimeReact.autoZIndex, props.baseZIndex || context && context.zIndex.modal || PrimeReact.zIndex.modal);
      setVisibleState(true);
    }
  }, [maskVisibleState]);
  useUpdateEffect(function () {
    updateGlobalDialogsRegistry(true);
  }, [shouldBlockScroll, visibleState]);
  useUnmountEffect(function () {
    disableDocumentSettings();
    updateGlobalDialogsRegistry(false);
    DomHandler.removeInlineStyle(styleElement.current);
    ZIndexUtils.clear(maskRef.current);
  });
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      resetPosition: resetPosition,
      getElement: function getElement() {
        return dialogRef.current;
      },
      getMask: function getMask() {
        return maskRef.current;
      },
      getContent: function getContent() {
        return contentRef.current;
      },
      getHeader: function getHeader() {
        return headerRef.current;
      },
      getFooter: function getFooter() {
        return footerRef.current;
      },
      getCloseButton: function getCloseButton() {
        return closeRef.current;
      }
    };
  });
  var createCloseIcon = function createCloseIcon() {
    if (props.closable) {
      var labelAria = props.ariaCloseIconLabel || ariaLabel('close');
      var closeButtonIconProps = mergeProps({
        className: cx('closeButtonIcon'),
        'aria-hidden': true
      }, ptm('closeButtonIcon'));
      var icon = props.closeIcon || /*#__PURE__*/React.createElement(TimesIcon, closeButtonIconProps);
      var headerCloseIcon = IconUtils.getJSXIcon(icon, _objectSpread({}, closeButtonIconProps), {
        props: props
      });
      var closeButtonProps = mergeProps({
        ref: closeRef,
        type: 'button',
        className: cx('closeButton'),
        'aria-label': labelAria,
        onClick: onClose,
        onKeyDown: function onKeyDown(ev) {
          if (ev.key !== 'Escape') {
            ev.stopPropagation();
          }
        }
      }, ptm('closeButton'));
      return /*#__PURE__*/React.createElement("button", closeButtonProps, headerCloseIcon, /*#__PURE__*/React.createElement(Ripple, null));
    }
    return null;
  };
  var createMaximizeIcon = function createMaximizeIcon() {
    var icon;
    var maximizableIconProps = mergeProps({
      className: cx('maximizableIcon')
    }, ptm('maximizableIcon'));
    if (!maximized) {
      icon = props.maximizeIcon || /*#__PURE__*/React.createElement(WindowMaximizeIcon, maximizableIconProps);
    } else {
      icon = props.minimizeIcon || /*#__PURE__*/React.createElement(WindowMinimizeIcon, maximizableIconProps);
    }
    var toggleIcon = IconUtils.getJSXIcon(icon, maximizableIconProps, {
      props: props
    });
    if (props.maximizable) {
      var maximizableButtonProps = mergeProps({
        type: 'button',
        className: cx('maximizableButton'),
        onClick: toggleMaximize
      }, ptm('maximizableButton'));
      return /*#__PURE__*/React.createElement("button", maximizableButtonProps, toggleIcon, /*#__PURE__*/React.createElement(Ripple, null));
    }
    return null;
  };
  var createHeader = function createHeader() {
    if (props.showHeader) {
      var closeIcon = createCloseIcon();
      var maximizeIcon = createMaximizeIcon();
      var icons = ObjectUtils.getJSXElement(props.icons, props);
      var header = ObjectUtils.getJSXElement(props.header, props);
      var headerId = idState + '_header';
      var headerProps = mergeProps({
        ref: headerRef,
        style: props.headerStyle,
        className: cx('header'),
        onMouseDown: onDragStart
      }, ptm('header'));
      var headerTitleProps = mergeProps({
        id: headerId,
        className: cx('headerTitle')
      }, ptm('headerTitle'));
      var headerIconsProps = mergeProps({
        className: cx('headerIcons')
      }, ptm('headerIcons'));
      return /*#__PURE__*/React.createElement("div", headerProps, /*#__PURE__*/React.createElement("div", headerTitleProps, header), /*#__PURE__*/React.createElement("div", headerIconsProps, icons, maximizeIcon, closeIcon));
    }
    return null;
  };
  var createContent = function createContent() {
    var contentId = idState + '_content';
    var contentProps = mergeProps({
      id: contentId,
      ref: contentRef,
      style: props.contentStyle,
      className: cx('content')
    }, ptm('content'));
    return /*#__PURE__*/React.createElement("div", contentProps, props.children);
  };
  var createFooter = function createFooter() {
    var footer = ObjectUtils.getJSXElement(props.footer, props);
    var footerProps = mergeProps({
      ref: footerRef,
      className: cx('footer')
    }, ptm('footer'));
    return footer && /*#__PURE__*/React.createElement("div", footerProps, footer);
  };
  var createResizer = function createResizer() {
    if (props.resizable) {
      return /*#__PURE__*/React.createElement("span", {
        className: "p-resizable-handle",
        style: {
          zIndex: 90
        },
        onMouseDown: onResizeStart
      });
    }
    return null;
  };
  var createTemplateElement = function createTemplateElement() {
    var _props$children;
    var messageProps = {
      header: props.header,
      content: props.message,
      message: props === null || props === void 0 || (_props$children = props.children) === null || _props$children === void 0 || (_props$children = _props$children[1]) === null || _props$children === void 0 || (_props$children = _props$children.props) === null || _props$children === void 0 ? void 0 : _props$children.children
    };
    var templateElementProps = {
      headerRef: headerRef,
      contentRef: contentRef,
      footerRef: footerRef,
      closeRef: closeRef,
      hide: onClose,
      message: messageProps
    };
    return ObjectUtils.getJSXElement(inProps.content, templateElementProps);
  };
  var createElement = function createElement() {
    var header = createHeader();
    var content = createContent();
    var footer = createFooter();
    var resizer = createResizer();
    return /*#__PURE__*/React.createElement(React.Fragment, null, header, content, footer, resizer);
  };
  var createDialog = function createDialog() {
    var headerId = idState + '_header';
    var contentId = idState + '_content';
    var transitionTimeout = {
      enter: props.position === 'center' ? 150 : 300,
      exit: props.position === 'center' ? 150 : 300
    };
    var maskProps = mergeProps({
      ref: maskRef,
      style: sx('mask'),
      className: cx('mask'),
      onPointerUp: onMaskPointerUp
    }, ptm('mask'));
    var rootProps = mergeProps({
      ref: dialogRef,
      id: idState,
      className: classNames(props.className, cx('root', {
        props: props,
        maximized: maximized,
        context: context
      })),
      style: props.style,
      onClick: props.onClick,
      role: 'dialog',
      'aria-labelledby': headerId,
      'aria-describedby': contentId,
      'aria-modal': props.modal,
      onPointerDown: onDialogPointerDown
    }, DialogBase.getOtherProps(props), ptm('root'));
    var transitionProps = mergeProps({
      classNames: cx('transition'),
      timeout: transitionTimeout,
      "in": visibleState,
      options: props.transitionOptions,
      unmountOnExit: true,
      onEnter: onEnter,
      onEntered: onEntered,
      onExiting: onExiting,
      onExited: onExited
    }, ptm('transition'));
    var contentElement = null;
    if (inProps !== null && inProps !== void 0 && inProps.content) {
      contentElement = createTemplateElement();
    } else {
      contentElement = createElement();
    }
    var rootElement = /*#__PURE__*/React.createElement("div", maskProps, /*#__PURE__*/React.createElement(CSSTransition, _extends({
      nodeRef: dialogRef
    }, transitionProps), /*#__PURE__*/React.createElement("div", rootProps, /*#__PURE__*/React.createElement(FocusTrap$1, {
      autoFocus: props.focusOnShow
    }, contentElement))));
    return /*#__PURE__*/React.createElement(Portal, {
      element: rootElement,
      appendTo: props.appendTo,
      visible: true
    });
  };
  return maskVisibleState && createDialog();
});
Dialog.displayName = 'Dialog';

export { Dialog };
