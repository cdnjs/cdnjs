'use client';
import * as React from 'react';
import ReactDOM from 'react-dom';
import PrimeReact, { PrimeReactContext } from 'primereact/api';
import { useMountEffect, useUpdateEffect, useUnmountEffect } from 'primereact/hooks';
import { ObjectUtils, DomHandler } from 'primereact/utils';

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

var PortalBase = {
  defaultProps: {
    __TYPE: 'Portal',
    element: null,
    appendTo: null,
    visible: false,
    onMounted: null,
    onUnmounted: null,
    children: undefined
  },
  getProps: function getProps(props) {
    return ObjectUtils.getMergedProps(props, PortalBase.defaultProps);
  },
  getOtherProps: function getOtherProps(props) {
    return ObjectUtils.getDiffProps(props, PortalBase.defaultProps);
  }
};

var Portal = /*#__PURE__*/React.memo(function (inProps) {
  var props = PortalBase.getProps(inProps);
  var context = React.useContext(PrimeReactContext);
  var _React$useState = React.useState(props.visible && DomHandler.isClient()),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    mountedState = _React$useState2[0],
    setMountedState = _React$useState2[1];
  useMountEffect(function () {
    if (DomHandler.isClient() && !mountedState) {
      setMountedState(true);
      props.onMounted && props.onMounted();
    }
  });
  useUpdateEffect(function () {
    props.onMounted && props.onMounted();
  }, [mountedState]);
  useUnmountEffect(function () {
    props.onUnmounted && props.onUnmounted();
  });
  var element = props.element || props.children;
  if (element && mountedState) {
    var appendTo = props.appendTo || context && context.appendTo || PrimeReact.appendTo;
    if (ObjectUtils.isFunction(appendTo)) {
      appendTo = appendTo();
    }
    if (!appendTo) {
      appendTo = document.body;
    }
    return appendTo === 'self' ? element : /*#__PURE__*/ReactDOM.createPortal(element, appendTo);
  }
  return null;
});
Portal.displayName = 'Portal';

export { Portal };
