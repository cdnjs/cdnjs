this.primereact = this.primereact || {};
this.primereact.scrolltop = (function (exports, React, PrimeReact, componentbase, csstransition, hooks, chevronup, ripple, utils) {
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
    root: function root(_ref) {
      var props = _ref.props;
      return utils.classNames('p-scrolltop p-link p-component', {
        'p-scrolltop-sticky': props.target !== 'window'
      });
    },
    icon: 'p-scrolltop-icon',
    transition: 'p-scrolltop'
  };
  var styles = "\n@layer primereact {\n    .p-scrolltop {\n        position: fixed;\n        bottom: 20px;\n        right: 20px;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n    }\n    \n    .p-scrolltop-sticky {\n        position: sticky;\n    }\n    \n    .p-scrolltop-sticky.p-link {\n        margin-left: auto;\n    }\n    \n    .p-scrolltop-helper {\n        display: none;\n    }\n    \n    .p-scrolltop-enter {\n        opacity: 0;\n    }\n    \n    .p-scrolltop-enter-active {\n        opacity: 1;\n        transition: opacity .15s;\n    }\n    \n    .p-scrolltop-exit {\n        opacity: 1;\n    }\n    \n    .p-scrolltop-exit-active {\n        opacity: 0;\n        transition: opacity .15s;\n    }\n}\n";
  var ScrollTopBase = componentbase.ComponentBase.extend({
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
    },
    css: {
      classes: classes,
      styles: styles
    }
  });

  function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
  function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
  var ScrollTop = /*#__PURE__*/React__namespace.memo(/*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
    var _React$useState = React__namespace.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      visibleState = _React$useState2[0],
      setVisibleState = _React$useState2[1];
    var mergeProps = hooks.useMergeProps();
    var context = React__namespace.useContext(PrimeReact.PrimeReactContext);
    var props = ScrollTopBase.getProps(inProps, context);
    var _ScrollTopBase$setMet = ScrollTopBase.setMetaData({
        props: props,
        state: {
          visible: visibleState
        }
      }),
      ptm = _ScrollTopBase$setMet.ptm,
      cx = _ScrollTopBase$setMet.cx,
      isUnstyled = _ScrollTopBase$setMet.isUnstyled;
    componentbase.useHandleStyle(ScrollTopBase.css.styles, isUnstyled, {
      name: 'scrolltop'
    });
    var scrollElementRef = React__namespace.useRef(null);
    var helperRef = React__namespace.useRef(null);
    var isTargetParent = props.target === 'parent';
    var _useEventListener = hooks.useEventListener({
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
    var _useEventListener3 = hooks.useEventListener({
        target: 'window',
        type: 'scroll',
        listener: function listener(event) {
          event && checkVisibility(utils.DomHandler.getWindowScrollTop());
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
      utils.ZIndexUtils.set('overlay', scrollElementRef.current, context && context.autoZIndex || PrimeReact__default["default"].autoZIndex, context && context.zIndex.overlay || PrimeReact__default["default"].zIndex.overlay);
    };
    var onEntered = function onEntered() {
      props.onShow && props.onShow();
    };
    var onExited = function onExited() {
      utils.ZIndexUtils.clear(scrollElementRef.current);
      props.onHide && props.onHide();
    };
    React__namespace.useImperativeHandle(ref, function () {
      return {
        props: props,
        getElement: function getElement() {
          return elementRef.current;
        }
      };
    });
    React__namespace.useEffect(function () {
      if (props.target === 'window') {
        bindDocumentScrollListener();
      } else if (props.target === 'parent') {
        bindParentScrollListener();
      }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    hooks.useUnmountEffect(function () {
      utils.ZIndexUtils.clear(scrollElementRef.current);
    });
    var iconProps = mergeProps({
      className: cx('icon')
    }, ptm('icon'));
    var icon = props.icon || /*#__PURE__*/React__namespace.createElement(chevronup.ChevronUpIcon, iconProps);
    var scrollIcon = utils.IconUtils.getJSXIcon(icon, _objectSpread({}, iconProps), {
      props: props
    });
    var scrollTopAriaLabel = PrimeReact.localeOption('aria') ? PrimeReact.localeOption('aria').scrollTop : undefined;
    var rootProps = mergeProps({
      ref: scrollElementRef,
      type: 'button',
      className: utils.classNames(props.className, cx('root')),
      style: props.style,
      onClick: onClick,
      'aria-label': scrollTopAriaLabel
    }, ScrollTopBase.getOtherProps(props), ptm('root'));
    var transitionProps = mergeProps({
      classNames: cx('transition'),
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
    }, ptm('transition'));
    return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement(csstransition.CSSTransition, _extends({
      nodeRef: scrollElementRef
    }, transitionProps), /*#__PURE__*/React__namespace.createElement("button", rootProps, scrollIcon, /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null))), isTargetParent && /*#__PURE__*/React__namespace.createElement("span", {
      ref: helperRef,
      className: "p-scrolltop-helper"
    }));
  }));
  ScrollTop.displayName = 'ScrollTop';

  exports.ScrollTop = ScrollTop;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.api, primereact.componentbase, primereact.csstransition, primereact.hooks, primereact.icons.chevronup, primereact.ripple, primereact.utils);
