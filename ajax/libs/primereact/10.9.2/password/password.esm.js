'use client';
import * as React from 'react';
import React__default, { useRef, useContext, Children, cloneElement } from 'react';
import PrimeReact, { PrimeReactContext, localeOption, ariaLabel } from 'primereact/api';
import { ComponentBase, useHandleStyle } from 'primereact/componentbase';
import { CSSTransition } from 'primereact/csstransition';
import { useMergeProps, useDisplayOrder, useGlobalOnEscapeKey, ESC_KEY_HANDLING_PRIORITIES, useOverlayListener, useUpdateEffect, useMountEffect, useUnmountEffect } from 'primereact/hooks';
import { classNames, ObjectUtils, DomHandler, ZIndexUtils, IconUtils } from 'primereact/utils';
import { EyeIcon } from 'primereact/icons/eye';
import { EyeSlashIcon } from 'primereact/icons/eyeslash';
import { InputText } from 'primereact/inputtext';
import { OverlayService } from 'primereact/overlayservice';
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

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

var classes$2 = {
  root: function root(_ref) {
    var props = _ref.props;
    return classNames('p-icon-field', {
      'p-icon-field-right': props.iconPosition === 'right',
      'p-icon-field-left': props.iconPosition === 'left'
    });
  }
};
var IconFieldBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'IconField',
    __parentMetadata: null,
    children: undefined,
    className: null,
    iconPosition: 'right'
  },
  css: {
    classes: classes$2
  }
});

function ownKeys$2(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$2(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$2(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$2(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var IconField = /*#__PURE__*/React__default.memo(/*#__PURE__*/React__default.forwardRef(function (inProps, ref) {
  var elementRef = useRef(ref);
  var mergeProps = useMergeProps();
  var context = useContext(PrimeReactContext);
  var props = IconFieldBase.getProps(inProps, context);
  var _IconFieldBase$setMet = IconFieldBase.setMetaData(_objectSpread$2(_objectSpread$2({
      props: props
    }, props.__parentMetadata), {}, {
      context: {
        iconPosition: props.iconPosition
      }
    })),
    ptm = _IconFieldBase$setMet.ptm,
    cx = _IconFieldBase$setMet.cx;
  var rootProps = mergeProps({
    className: classNames(props.className, cx('root', {
      iconPosition: props.iconPosition
    }))
  }, IconFieldBase.getOtherProps(props), ptm('root'));
  return /*#__PURE__*/React__default.createElement("div", _extends({}, rootProps, {
    ref: elementRef
  }), Children.map(props.children, function (child, index) {
    return /*#__PURE__*/cloneElement(child, {
      iconPosition: props.iconPosition
    });
  }));
}));
IconField.displayName = 'IconField';

var classes$1 = {
  root: 'p-input-icon'
};
var InputIconBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'InputIcon',
    __parentMetadata: null,
    className: null,
    iconPosition: null
  },
  css: {
    classes: classes$1
  }
});

function ownKeys$1(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$1(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$1(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var InputIcon = /*#__PURE__*/React__default.memo(/*#__PURE__*/React__default.forwardRef(function (inProps, ref) {
  var elementRef = useRef(ref);
  var mergeProps = useMergeProps();
  var context = useContext(PrimeReactContext);
  var props = InputIconBase.getProps(inProps, context);
  var _InputIconBase$setMet = InputIconBase.setMetaData(_objectSpread$1(_objectSpread$1({
      props: props
    }, props.__parentMetadata), {}, {
      context: {
        iconPosition: props.iconPosition
      }
    })),
    ptm = _InputIconBase$setMet.ptm,
    cx = _InputIconBase$setMet.cx;
  var rootProps = mergeProps({
    className: classNames(props.className, cx('root'))
  }, InputIconBase.getOtherProps(props), ptm('root'));
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement("span", _extends({}, rootProps, {
    ref: elementRef
  }), props.children));
}));
InputIcon.displayName = 'InputIcon';

var classes = {
  root: function root(_ref) {
    var props = _ref.props,
      isFilled = _ref.isFilled,
      focusedState = _ref.focusedState;
    return classNames('p-password p-component p-inputwrapper', {
      'p-inputwrapper-filled': isFilled,
      'p-inputwrapper-focus': focusedState,
      'p-input-icon-right': props.toggleMask
    });
  },
  input: function input(_ref2) {
    var props = _ref2.props;
    return classNames('p-password-input', props.inputClassName);
  },
  panel: function panel(_ref3) {
    var props = _ref3.props,
      context = _ref3.context;
    return classNames('p-password-panel p-component', props.panelClassName, {
      'p-input-filled': context && context.inputStyle === 'filled' || PrimeReact.inputStyle === 'filled',
      'p-ripple-disabled': context && context.ripple === false || PrimeReact.ripple === false
    });
  },
  meter: 'p-password-meter',
  meterLabel: function meterLabel(_ref4) {
    var strength = _ref4.strength;
    return classNames('p-password-strength', strength);
  },
  info: function info(_ref5) {
    var strength = _ref5.strength;
    return classNames('p-password-info', strength);
  },
  showIcon: 'p-password-show-icon',
  hideIcon: 'p-password-hide-icon',
  transition: 'p-connected-overlay'
};
var styles = "\n@layer primereact {\n    .p-password {\n        position: relative;\n        display: inline-flex;\n    }\n    \n    .p-password-panel {\n        position: absolute;\n        top: 0;\n        left: 0;\n    }\n    \n    .p-password .p-password-panel {\n        min-width: 100%;\n    }\n    \n    .p-password-meter {\n        height: 10px;\n    }\n    \n    .p-password-strength {\n        height: 100%;\n        width: 0%;\n        transition: width 1s ease-in-out;\n    }\n    \n    .p-fluid .p-password {\n        display: flex;\n    }\n    \n    .p-password-input::-ms-reveal,\n    .p-password-input::-ms-clear {\n        display: none;\n    }\n\n    .p-password .p-password-show-icon,\n    .p-password .p-password-hide-icon {\n        line-height: 1.5;\n        cursor: pointer;\n    }\n}\n";
var PasswordBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'Password',
    id: null,
    inputId: null,
    inputRef: null,
    promptLabel: null,
    weakLabel: null,
    mediumLabel: null,
    strongLabel: null,
    mediumRegex: '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})',
    strongRegex: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})',
    feedback: true,
    toggleMask: false,
    appendTo: null,
    header: null,
    content: null,
    footer: null,
    showIcon: null,
    hideIcon: null,
    icon: null,
    tooltip: null,
    tooltipOptions: null,
    style: null,
    className: null,
    inputStyle: null,
    inputClassName: null,
    invalid: false,
    variant: null,
    panelStyle: null,
    panelClassName: null,
    transitionOptions: null,
    tabIndex: null,
    value: undefined,
    onInput: null,
    onShow: null,
    onHide: null,
    children: undefined
  },
  css: {
    classes: classes,
    styles: styles
  }
});

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var Password = /*#__PURE__*/React.memo(/*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var mergeProps = useMergeProps();
  var context = React.useContext(PrimeReactContext);
  var props = PasswordBase.getProps(inProps, context);
  var promptLabel = props.promptLabel || localeOption('passwordPrompt');
  var weakLabel = props.weakLabel || localeOption('weak');
  var mediumLabel = props.mediumLabel || localeOption('medium');
  var strongLabel = props.strongLabel || localeOption('strong');
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    overlayVisibleState = _React$useState2[0],
    setOverlayVisibleState = _React$useState2[1];
  var _React$useState3 = React.useState(null),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    meterState = _React$useState4[0],
    setMeterState = _React$useState4[1];
  var _React$useState5 = React.useState(promptLabel),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    infoTextState = _React$useState6[0],
    setInfoTextState = _React$useState6[1];
  var _React$useState7 = React.useState(false),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    focusedState = _React$useState8[0],
    setFocusedState = _React$useState8[1];
  var _React$useState9 = React.useState(false),
    _React$useState10 = _slicedToArray(_React$useState9, 2),
    unmaskedState = _React$useState10[0],
    setUnmaskedState = _React$useState10[1];
  var elementRef = React.useRef(null);
  var overlayRef = React.useRef(null);
  var inputRef = React.useRef(props.inputRef);
  var mediumCheckRegExp = React.useRef(new RegExp(props.mediumRegex));
  var strongCheckRegExp = React.useRef(new RegExp(props.strongRegex));
  var type = unmaskedState ? 'text' : 'password';
  var metaData = {
    props: props,
    state: {
      overlayVisible: overlayVisibleState,
      meter: meterState,
      infoText: infoTextState,
      focused: focusedState,
      unmasked: unmaskedState
    }
  };
  var _PasswordBase$setMeta = PasswordBase.setMetaData(metaData),
    ptm = _PasswordBase$setMeta.ptm,
    cx = _PasswordBase$setMeta.cx,
    isUnstyled = _PasswordBase$setMeta.isUnstyled;
  useHandleStyle(PasswordBase.css.styles, isUnstyled, {
    name: 'password'
  });
  var passwordDisplayOrder = useDisplayOrder('password', overlayVisibleState);
  useGlobalOnEscapeKey({
    callback: function callback() {
      hide();
    },
    when: overlayVisibleState && props.feedback && passwordDisplayOrder,
    priority: [ESC_KEY_HANDLING_PRIORITIES.PASSWORD, passwordDisplayOrder]
  });
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
  var currentValue = inputRef.current && inputRef.current.value;
  var isFilled = React.useMemo(function () {
    return ObjectUtils.isNotEmpty(props.value) || ObjectUtils.isNotEmpty(props.defaultValue) || ObjectUtils.isNotEmpty(currentValue);
  }, [props.value, props.defaultValue, currentValue]);
  var updateLabels = function updateLabels() {
    if (meterState) {
      var label = null;
      switch (meterState.strength) {
        case 'weak':
          label = weakLabel;
          break;
        case 'medium':
          label = mediumLabel;
          break;
        case 'strong':
          label = strongLabel;
          break;
      }
      if (label && infoTextState !== label) {
        setInfoTextState(label);
      }
    } else if (infoTextState !== promptLabel) {
      setInfoTextState(promptLabel);
    }
  };
  var updateFeedback = function updateFeedback(value) {
    if (!props.feedback) {
      return false;
    }
    var label = null;
    var meter = null;
    switch (testStrength(value)) {
      case 1:
        label = weakLabel;
        meter = {
          strength: 'weak',
          width: '33.33%'
        };
        break;
      case 2:
        label = mediumLabel;
        meter = {
          strength: 'medium',
          width: '66.66%'
        };
        break;
      case 3:
        label = strongLabel;
        meter = {
          strength: 'strong',
          width: '100%'
        };
        break;
      default:
        label = promptLabel;
        meter = null;
        break;
    }
    setMeterState(meter);
    setInfoTextState(label);
    return true;
  };
  var onPanelClick = function onPanelClick(event) {
    if (props.feedback) {
      OverlayService.emit('overlay-click', {
        originalEvent: event,
        target: elementRef.current
      });
    }
  };
  var toggleMask = function toggleMask() {
    setUnmaskedState(function (prevUnmasked) {
      return !prevUnmasked;
    });
  };
  var show = function show() {
    updateLabels();
    setOverlayVisibleState(true);
  };
  var hide = function hide() {
    setOverlayVisibleState(false);
  };
  var alignOverlay = function alignOverlay() {
    if (inputRef.current) {
      DomHandler.alignOverlay(overlayRef.current, inputRef.current.parentElement, props.appendTo || context && context.appendTo || PrimeReact.appendTo);
    }
  };
  var onOverlayEnter = function onOverlayEnter() {
    ZIndexUtils.set('overlay', overlayRef.current, context && context.autoZIndex || PrimeReact.autoZIndex, context && context.zIndex.overlay || PrimeReact.zIndex.overlay);
    DomHandler.addStyles(overlayRef.current, {
      position: 'absolute',
      top: '0',
      left: '0'
    });
    alignOverlay();
  };
  var onOverlayEntered = function onOverlayEntered() {
    bindOverlayListener();
    props.onShow && props.onShow();
  };
  var onOverlayExit = function onOverlayExit() {
    unbindOverlayListener();
  };
  var onOverlayExited = function onOverlayExited() {
    ZIndexUtils.clear(overlayRef.current);
    props.onHide && props.onHide();
  };
  var onFocus = function onFocus(event) {
    setFocusedState(true);
    if (props.feedback) {
      show();
    }
    props.onFocus && props.onFocus(event);
  };
  var onBlur = function onBlur(event) {
    setFocusedState(false);
    if (props.feedback) {
      hide();
    }
    props.onBlur && props.onBlur(event);
  };
  var onKeyup = function onKeyup(e) {
    var keyCode = e.code;
    if (props.feedback) {
      if (!!keyCode && keyCode !== 'Escape' && !overlayVisibleState) {
        show();
      }
    }
    props.onKeyUp && props.onKeyUp(e);
  };
  var onInput = function onInput(event, validatePattern) {
    if (props.onInput) {
      props.onInput(event, validatePattern);
    }
    if (!props.onChange) {
      ObjectUtils.isNotEmpty(event.target.value) ? DomHandler.addClass(elementRef.current, 'p-inputwrapper-filled') : DomHandler.removeClass(elementRef.current, 'p-inputwrapper-filled');
    }
  };
  var testStrength = function testStrength(str) {
    if (!str || str.length === 0) {
      return 0;
    }
    if (strongCheckRegExp.current.test(str)) {
      return 3;
    } else if (mediumCheckRegExp.current.test(str)) {
      return 2;
    } else if (str.length > 0) {
      return 1;
    }
    return 0;
  };
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      toggleMask: toggleMask,
      focus: function focus() {
        return DomHandler.focus(inputRef.current);
      },
      getElement: function getElement() {
        return elementRef.current;
      },
      getOverlay: function getOverlay() {
        return overlayRef.current;
      },
      getInput: function getInput() {
        return inputRef.current;
      }
    };
  });
  React.useEffect(function () {
    ObjectUtils.combinedRefs(inputRef, props.inputRef);
  }, [inputRef, props.inputRef]);
  React.useEffect(function () {
    mediumCheckRegExp.current = new RegExp(props.mediumRegex);
  }, [props.mediumRegex]);
  React.useEffect(function () {
    strongCheckRegExp.current = new RegExp(props.strongRegex);
  }, [props.strongRegex]);
  React.useEffect(function () {
    if (!isFilled && DomHandler.hasClass(elementRef.current, 'p-inputwrapper-filled')) {
      DomHandler.removeClass(elementRef.current, 'p-inputwrapper-filled');
    }
  }, [isFilled]);
  useUpdateEffect(function () {
    updateFeedback(props.value);
  }, [props.value]);
  useMountEffect(function () {
    alignOverlay();
  });
  useUnmountEffect(function () {
    ZIndexUtils.clear(overlayRef.current);
  });
  var onToggleMaskKeyDown = function onToggleMaskKeyDown(event) {
    if (event.key === 'Enter' || event.code === 'Space') {
      toggleMask();
      event.preventDefault();
    }
  };
  var createIcon = function createIcon() {
    if (!props.toggleMask) {
      return null;
    }
    var icon;
    var hideIconProps = mergeProps({
      role: 'switch',
      tabIndex: props.tabIndex || '0',
      className: cx('hideIcon'),
      onClick: toggleMask,
      onKeyDown: onToggleMaskKeyDown,
      'aria-label': ariaLabel('passwordHide') || 'Hide Password',
      'aria-checked': 'false'
    }, ptm('hideIcon'));
    var showIconProps = mergeProps({
      role: 'switch',
      tabIndex: props.tabIndex || '0',
      className: cx('showIcon'),
      onClick: toggleMask,
      onKeyDown: onToggleMaskKeyDown,
      'aria-label': ariaLabel('passwordShow') || 'Show Password',
      'aria-checked': 'true'
    }, ptm('showIcon'));
    if (unmaskedState) {
      icon = props.hideIcon || /*#__PURE__*/React.createElement(EyeSlashIcon, hideIconProps);
    } else {
      icon = props.showIcon || /*#__PURE__*/React.createElement(EyeIcon, showIconProps);
    }
    var eyeIcon = IconUtils.getJSXIcon(icon, unmaskedState ? _objectSpread({}, hideIconProps) : _objectSpread({}, showIconProps), {
      props: props
    });
    var content = eyeIcon;
    if (props.icon) {
      var defaultIconOptions = {
        onClick: toggleMask,
        className: className,
        element: content,
        props: props
      };
      content = ObjectUtils.getJSXElement(props.icon, defaultIconOptions);
    }
    return content;
  };
  var createPanel = function createPanel() {
    var _ref2 = meterState || {
        strength: '',
        width: '0%'
      },
      strength = _ref2.strength,
      width = _ref2.width;
    var header = ObjectUtils.getJSXElement(props.header, props);
    var footer = ObjectUtils.getJSXElement(props.footer, props);
    var panelProps = mergeProps({
      className: cx('panel', {
        context: context
      }),
      style: props.panelStyle,
      onClick: onPanelClick
    }, ptm('panel'));
    var meterProps = mergeProps({
      className: cx('meter')
    }, ptm('meter'));
    var meterLabelProps = mergeProps({
      className: cx('meterLabel', {
        strength: strength
      }),
      style: {
        width: width
      }
    }, ptm('meterLabel'));
    var infoProps = mergeProps({
      className: cx('info', {
        strength: strength
      })
    }, ptm('info'));
    var content = props.content ? ObjectUtils.getJSXElement(props.content, props) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", meterProps, /*#__PURE__*/React.createElement("div", meterLabelProps)), /*#__PURE__*/React.createElement("div", infoProps, infoTextState));
    var transitionProps = mergeProps({
      classNames: cx('transition'),
      "in": overlayVisibleState,
      timeout: {
        enter: 120,
        exit: 100
      },
      options: props.transitionOptions,
      unmountOnExit: true,
      onEnter: onOverlayEnter,
      onEntered: onOverlayEntered,
      onExit: onOverlayExit,
      onExited: onOverlayExited
    }, ptm('transition'));
    var panel = /*#__PURE__*/React.createElement(CSSTransition, _extends({
      nodeRef: overlayRef
    }, transitionProps), /*#__PURE__*/React.createElement("div", _extends({
      ref: overlayRef
    }, panelProps), header, content, footer));
    return /*#__PURE__*/React.createElement(Portal, {
      element: panel,
      appendTo: props.appendTo
    });
  };
  var className = classNames('p-password p-component p-inputwrapper', {
    'p-inputwrapper-filled': isFilled,
    'p-inputwrapper-focus': focusedState,
    'p-input-icon-right': props.toggleMask
  }, props.className);
  var inputProps = PasswordBase.getOtherProps(props);
  var icon = createIcon();
  var panel = createPanel();
  var rootProps = mergeProps({
    ref: elementRef,
    id: props.id,
    className: classNames(props.className, cx('root', {
      isFilled: isFilled,
      focusedState: focusedState
    })),
    style: props.style
  }, ptm('root'));
  var inputTextProps = mergeProps(_objectSpread(_objectSpread({
    ref: inputRef,
    id: props.inputId
  }, inputProps), {}, {
    className: classNames(props.inputClassName, cx('input')),
    onBlur: onBlur,
    onFocus: onFocus,
    onInput: onInput,
    onKeyUp: onKeyup,
    invalid: props.invalid,
    variant: props.variant,
    style: props.inputStyle,
    unstyled: props.unstyled,
    tabIndex: props.tabIndex || '0',
    tooltip: props.tooltip,
    tooltipOptions: props.tooltipOptions,
    type: type,
    value: props.value,
    __parentMetadata: {
      parent: metaData
    }
  }), ptm('input'));
  var input = /*#__PURE__*/React.createElement(InputText, inputTextProps);
  if (icon) {
    input = /*#__PURE__*/React.createElement(IconField, {
      className: cx('iconField'),
      pt: ptm('iconField'),
      __parentMetadata: {
        parent: metaData
      }
    }, input, /*#__PURE__*/React.createElement(InputIcon, {
      className: cx('inputIcon'),
      pt: ptm('inputIcon'),
      __parentMetadata: {
        parent: metaData
      }
    }, icon));
  }
  return /*#__PURE__*/React.createElement("div", rootProps, input, panel);
}));
Password.displayName = 'Password';

export { Password };
