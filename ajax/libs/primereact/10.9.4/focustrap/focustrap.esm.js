'use client';
import React from 'react';
import { PrimeReactContext } from 'primereact/api';
import { useStyle, useMountEffect } from 'primereact/hooks';
import { ObjectUtils, DomHandler } from 'primereact/utils';
import { ComponentBase } from 'primereact/componentbase';

function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}

function toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}

function toPropertyKey(t) {
  var i = toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}

function _defineProperty(e, r, t) {
  return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}

var styles = '';
var FocusTrapBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'FocusTrap',
    children: undefined
  },
  css: {
    styles: styles
  },
  getProps: function getProps(props) {
    return ObjectUtils.getMergedProps(props, FocusTrapBase.defaultProps);
  },
  getOtherProps: function getOtherProps(props) {
    return ObjectUtils.getDiffProps(props, FocusTrapBase.defaultProps);
  }
});

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var FocusTrap = /*#__PURE__*/React.memo(/*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var targetRef = React.useRef(null);
  var firstFocusableElementRef = React.useRef(null);
  var lastFocusableElementRef = React.useRef(null);
  var context = React.useContext(PrimeReactContext);
  var props = FocusTrapBase.getProps(inProps, context);
  var metaData = {
    props: props
  };
  useStyle(FocusTrapBase.css.styles, {
    name: 'focustrap'
  });
  var _FocusTrapBase$setMet = FocusTrapBase.setMetaData(_objectSpread({}, metaData));
    _FocusTrapBase$setMet.ptm;
  React.useImperativeHandle(ref, function () {
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
      return /*#__PURE__*/React.createElement("span", {
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
    return /*#__PURE__*/React.createElement(React.Fragment, null, firstFocusableElement, props.children, lastFocusableElement);
  };
  return createHiddenFocusableElements();
}));

export { FocusTrap, FocusTrap as default };
