this.primereact = this.primereact || {};
this.primereact.portal = (function (exports, React, ReactDOM, PrimeReact, hooks, utils) {
  'use strict';

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
  var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);
  var PrimeReact__default = /*#__PURE__*/_interopDefaultLegacy(PrimeReact);

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
      return utils.ObjectUtils.getMergedProps(props, PortalBase.defaultProps);
    },
    getOtherProps: function getOtherProps(props) {
      return utils.ObjectUtils.getDiffProps(props, PortalBase.defaultProps);
    }
  };

  var Portal = /*#__PURE__*/React__namespace.memo(function (inProps) {
    var props = PortalBase.getProps(inProps);
    var context = React__namespace.useContext(PrimeReact.PrimeReactContext);
    var _React$useState = React__namespace.useState(props.visible && utils.DomHandler.isClient()),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      mountedState = _React$useState2[0],
      setMountedState = _React$useState2[1];
    hooks.useMountEffect(function () {
      if (utils.DomHandler.isClient() && !mountedState) {
        setMountedState(true);
        props.onMounted && props.onMounted();
      }
    });
    hooks.useUpdateEffect(function () {
      props.onMounted && props.onMounted();
    }, [mountedState]);
    hooks.useUnmountEffect(function () {
      props.onUnmounted && props.onUnmounted();
    });
    var element = props.element || props.children;
    if (element && mountedState) {
      var appendTo = props.appendTo || context && context.appendTo || PrimeReact__default["default"].appendTo;
      if (utils.ObjectUtils.isFunction(appendTo)) {
        appendTo = appendTo();
      }
      if (!appendTo) {
        appendTo = document.body;
      }
      return appendTo === 'self' ? element : /*#__PURE__*/ReactDOM__default["default"].createPortal(element, appendTo);
    }
    return null;
  });
  Portal.displayName = 'Portal';

  exports.Portal = Portal;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, ReactDOM, primereact.api, primereact.hooks, primereact.utils);
