import * as React from 'react';
import PrimeReact, { PrimeReactContext } from 'primereact/api';
import { CSSTransition } from 'primereact/csstransition';
import { useEventListener, useUnmountEffect } from 'primereact/hooks';
import { ChevronUpIcon } from 'primereact/icons/chevronup';
import { Ripple } from 'primereact/ripple';
import { DomHandler, ZIndexUtils, classNames, mergeProps, IconUtils } from 'primereact/utils';
import { ComponentBase } from 'primereact/componentbase';

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

var ScrollTopBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'ScrollTop',
    target: 'window',
    threshold: 400,
    icon: null,
    behavior: 'smooth',
    className: null,
    style: null,
    transitionOptions: null,
    onShow: null,
    onHide: null,
    children: undefined
  }
});

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var ScrollTop = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    visibleState = _React$useState2[0],
    setVisibleState = _React$useState2[1];
  var context = React.useContext(PrimeReactContext);
  var props = ScrollTopBase.getProps(inProps, context);
  var _ScrollTopBase$setMet = ScrollTopBase.setMetaData({
      props: props,
      state: {
        visible: visibleState
      }
    }),
    ptm = _ScrollTopBase$setMet.ptm;
  var scrollElementRef = React.useRef(null);
  var helperRef = React.useRef(null);
  var isTargetParent = props.target === 'parent';
  var _useEventListener = useEventListener({
      target: function target() {
        return helperRef.current && helperRef.current.parentElement;
      },
      type: 'scroll',
      listener: function listener(event) {
        checkVisibility(event.currentTarget.scrollTop);
      }
    }),
    _useEventListener2 = _slicedToArray(_useEventListener, 1),
    bindParentScrollListener = _useEventListener2[0];
  var _useEventListener3 = useEventListener({
      target: 'window',
      type: 'scroll',
      listener: function listener(event) {
        event && checkVisibility(DomHandler.getWindowScrollTop());
      }
    }),
    _useEventListener4 = _slicedToArray(_useEventListener3, 1),
    bindDocumentScrollListener = _useEventListener4[0];
  var onClick = function onClick() {
    var scrollElement = props.target === 'window' ? window : helperRef.current.parentElement;
    scrollElement.scroll({
      top: 0,
      behavior: props.behavior
    });
  };
  var checkVisibility = function checkVisibility(scrollY) {
    setVisibleState(scrollY > props.threshold);
  };
  var onEnter = function onEnter() {
    ZIndexUtils.set('overlay', scrollElementRef.current, context && context.autoZIndex || PrimeReact.autoZIndex, context && context.zIndex['overlay'] || PrimeReact.zIndex['overlay']);
  };
  var onEntered = function onEntered() {
    props.onShow && props.onShow();
  };
  var onExited = function onExited() {
    ZIndexUtils.clear(scrollElementRef.current);
    props.onHide && props.onHide();
  };
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  });
  React.useEffect(function () {
    if (props.target === 'window') bindDocumentScrollListener();else if (props.target === 'parent') bindParentScrollListener();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useUnmountEffect(function () {
    ZIndexUtils.clear(scrollElementRef.current);
  });
  var className = classNames('p-scrolltop p-link p-component', {
    'p-scrolltop-sticky': props.target !== 'window'
  }, props.className);
  var iconClassName = 'p-scrolltop-icon';
  var iconProps = mergeProps({
    className: iconClassName
  }, ptm('icon'));
  var icon = props.icon || /*#__PURE__*/React.createElement(ChevronUpIcon, iconProps);
  var scrollIcon = IconUtils.getJSXIcon(icon, _objectSpread({}, iconProps), {
    props: props
  });
  var rootProps = mergeProps({
    ref: scrollElementRef,
    type: 'button',
    className: className,
    style: props.style,
    onClick: onClick
  }, ScrollTopBase.getOtherProps(props), ptm('root'));
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(CSSTransition, {
    nodeRef: scrollElementRef,
    classNames: "p-scrolltop",
    "in": visibleState,
    timeout: {
      enter: 150,
      exit: 150
    },
    options: props.transitionOptions,
    unmountOnExit: true,
    onEnter: onEnter,
    onEntered: onEntered,
    onExited: onExited
  }, /*#__PURE__*/React.createElement("button", rootProps, scrollIcon, /*#__PURE__*/React.createElement(Ripple, null))), isTargetParent && /*#__PURE__*/React.createElement("span", {
    ref: helperRef,
    className: "p-scrolltop-helper"
  }));
}));
ScrollTop.displayName = 'ScrollTop';

export { ScrollTop };
