this.primereact = this.primereact || {};
this.primereact.blockui = (function (exports, React, PrimeReact, componentbase, hooks, portal, utils) {
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
  var PrimeReact__default = /*#__PURE__*/_interopDefaultLegacy(PrimeReact);

  function _extends() {
    return _extends = Object.assign ? Object.assign.bind() : function (n) {
      for (var e = 1; e < arguments.length; e++) {
        var t = arguments[e];
        for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
      }
      return n;
    }, _extends.apply(null, arguments);
  }

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

  function _arrayWithHoles(r) {
    if (Array.isArray(r)) return r;
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

  function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
    return n;
  }

  function _unsupportedIterableToArray(r, a) {
    if (r) {
      if ("string" == typeof r) return _arrayLikeToArray(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
    }
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _slicedToArray(r, e) {
    return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
  }

  var classes = {
    root: 'p-blockui-container',
    mask: function mask(_ref) {
      var props = _ref.props;
      return utils.classNames('p-blockui p-component-overlay p-component-overlay-enter', {
        'p-blockui-document': props.fullScreen
      });
    }
  };
  var styles = "\n@layer primereact {\n    .p-blockui-container {\n        position: relative;\n    }\n    \n    .p-blockui {\n        opacity: 1;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n    }\n    \n    .p-blockui.p-component-overlay {\n        position: absolute;\n    }\n    \n    .p-blockui-document.p-component-overlay {\n        position: fixed;\n    }\n}\n";
  var BlockUIBase = componentbase.ComponentBase.extend({
    defaultProps: {
      __TYPE: 'BlockUI',
      autoZIndex: true,
      baseZIndex: 0,
      blocked: false,
      className: null,
      containerClassName: null,
      containerStyle: null,
      fullScreen: false,
      id: null,
      onBlocked: null,
      onUnblocked: null,
      style: null,
      template: null,
      children: undefined
    },
    css: {
      classes: classes,
      styles: styles
    }
  });

  function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
  function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
  var BlockUI = /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
    var mergeProps = hooks.useMergeProps();
    var context = React__namespace.useContext(PrimeReact.PrimeReactContext);
    var props = BlockUIBase.getProps(inProps, context);
    var _React$useState = React__namespace.useState(props.blocked),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      visibleState = _React$useState2[0],
      setVisibleState = _React$useState2[1];
    var elementRef = React__namespace.useRef(null);
    var maskRef = React__namespace.useRef(null);
    var activeElementRef = React__namespace.useRef(null);
    var _BlockUIBase$setMetaD = BlockUIBase.setMetaData({
        props: props
      }),
      ptm = _BlockUIBase$setMetaD.ptm,
      cx = _BlockUIBase$setMetaD.cx,
      isUnstyled = _BlockUIBase$setMetaD.isUnstyled;
    componentbase.useHandleStyle(BlockUIBase.css.styles, isUnstyled, {
      name: 'blockui'
    });
    var block = function block() {
      setVisibleState(true);
      activeElementRef.current = document.activeElement;
    };
    var unblock = function unblock() {
      !isUnstyled() && utils.DomHandler.addClass(maskRef.current, 'p-component-overlay-leave');
      if (utils.DomHandler.hasCSSAnimation(maskRef.current) > 0) {
        maskRef.current.addEventListener('animationend', function () {
          removeMask();
        });
      } else {
        removeMask();
      }
    };
    var removeMask = function removeMask() {
      utils.ZIndexUtils.clear(maskRef.current);
      setVisibleState(false);
      if (props.fullScreen) {
        utils.DomHandler.unblockBodyScroll();
        activeElementRef.current && activeElementRef.current.focus();
      }
      props.onUnblocked && props.onUnblocked();
    };
    var onPortalMounted = function onPortalMounted() {
      if (props.fullScreen) {
        utils.DomHandler.blockBodyScroll();
        activeElementRef.current && activeElementRef.current.blur();
      }
      if (props.autoZIndex) {
        var key = props.fullScreen ? 'modal' : 'overlay';
        utils.ZIndexUtils.set(key, maskRef.current, context && context.autoZIndex || PrimeReact__default["default"].autoZIndex, props.baseZIndex || context && context.zIndex[key] || PrimeReact__default["default"].zIndex[key]);
      }
      props.onBlocked && props.onBlocked();
    };
    hooks.useMountEffect(function () {
      visibleState && block();
    });
    hooks.useUpdateEffect(function () {
      props.blocked ? block() : unblock();
    }, [props.blocked]);
    hooks.useUnmountEffect(function () {
      props.fullScreen && utils.DomHandler.unblockBodyScroll();
      utils.ZIndexUtils.clear(maskRef.current);
    });
    React__namespace.useImperativeHandle(ref, function () {
      return {
        props: props,
        block: block,
        unblock: unblock,
        getElement: function getElement() {
          return elementRef.current;
        }
      };
    });
    var createMask = function createMask() {
      if (visibleState) {
        var appendTo = props.fullScreen ? document.body : 'self';
        var maskProps = mergeProps({
          className: utils.classNames(props.className, cx('mask')),
          style: _objectSpread(_objectSpread({}, props.style), {}, {
            position: props.fullScreen ? 'fixed' : 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%'
          })
        }, ptm('mask'));
        var content = props.template ? utils.ObjectUtils.getJSXElement(props.template, props) : null;
        var _mask = /*#__PURE__*/React__namespace.createElement("div", _extends({
          ref: maskRef
        }, maskProps), content);
        return /*#__PURE__*/React__namespace.createElement(portal.Portal, {
          element: _mask,
          appendTo: appendTo,
          onMounted: onPortalMounted
        });
      }
      return null;
    };
    var mask = createMask();
    var rootProps = mergeProps({
      id: props.id,
      ref: elementRef,
      style: props.containerStyle,
      className: utils.classNames(props.containerClassName, cx('root')),
      'aria-busy': props.blocked
    }, BlockUIBase.getOtherProps(props), ptm('root'));
    return /*#__PURE__*/React__namespace.createElement("div", rootProps, props.children, mask);
  });
  BlockUI.displayName = 'BlockUI';

  exports.BlockUI = BlockUI;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.api, primereact.componentbase, primereact.hooks, primereact.portal, primereact.utils);
