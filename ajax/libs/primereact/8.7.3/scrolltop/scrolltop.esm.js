import * as React from 'react';
import PrimeReact from 'primereact/api';
import { CSSTransition } from 'primereact/csstransition';
import { useEventListener, useMountEffect, useUnmountEffect } from 'primereact/hooks';
import { Ripple } from 'primereact/ripple';
import { DomHandler, ZIndexUtils, ObjectUtils, classNames, IconUtils } from 'primereact/utils';

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
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) {
        ;
      }
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
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
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

var ScrollTop = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    visibleState = _React$useState2[0],
    setVisibleState = _React$useState2[1];
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
      listener: function listener() {
        checkVisibility(DomHandler.getWindowScrollTop());
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
    ZIndexUtils.set('overlay', scrollElementRef.current, PrimeReact.autoZIndex, PrimeReact.zIndex['overlay']);
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
  useMountEffect(function () {
    if (props.target === 'window') bindDocumentScrollListener();else if (props.target === 'parent') bindParentScrollListener();
  });
  useUnmountEffect(function () {
    ZIndexUtils.clear(scrollElementRef.current);
  });
  var otherProps = ObjectUtils.findDiffKeys(props, ScrollTop.defaultProps);
  var className = classNames('p-scrolltop p-link p-component', {
    'p-scrolltop-sticky': props.target !== 'window'
  }, props.className);
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
  }, /*#__PURE__*/React.createElement("button", _extends({
    ref: scrollElementRef,
    type: "button",
    className: className,
    style: props.style
  }, otherProps, {
    onClick: onClick
  }), IconUtils.getJSXIcon(props.icon, {
    className: 'p-scrolltop-icon'
  }, {
    props: props
  }), /*#__PURE__*/React.createElement(Ripple, null))), isTargetParent && /*#__PURE__*/React.createElement("span", {
    ref: helperRef,
    className: "p-scrolltop-helper"
  }));
}));
ScrollTop.displayName = 'ScrollTop';
ScrollTop.defaultProps = {
  __TYPE: 'ScrollTop',
  target: 'window',
  threshold: 400,
  icon: 'pi pi-chevron-up',
  behavior: 'smooth',
  className: null,
  style: null,
  transitionOptions: null,
  onShow: null,
  onHide: null
};

export { ScrollTop };
