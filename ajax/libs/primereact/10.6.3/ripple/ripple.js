this.primereact = this.primereact || {};
this.primereact.ripple = (function (exports, React, PrimeReact, hooks, utils, componentbase) {
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

  var styles = "\n@layer primereact {\n    .p-ripple {\n        overflow: hidden;\n        position: relative;\n    }\n    \n    .p-ink {\n        display: block;\n        position: absolute;\n        background: rgba(255, 255, 255, 0.5);\n        border-radius: 100%;\n        transform: scale(0);\n    }\n    \n    .p-ink-active {\n        animation: ripple 0.4s linear;\n    }\n    \n    .p-ripple-disabled .p-ink {\n        display: none;\n    }\n}\n\n@keyframes ripple {\n    100% {\n        opacity: 0;\n        transform: scale(2.5);\n    }\n}\n\n";
  var classes = {
    root: 'p-ink'
  };
  var RippleBase = componentbase.ComponentBase.extend({
    defaultProps: {
      __TYPE: 'Ripple',
      children: undefined
    },
    css: {
      styles: styles,
      classes: classes
    },
    getProps: function getProps(props) {
      return utils.ObjectUtils.getMergedProps(props, RippleBase.defaultProps);
    },
    getOtherProps: function getOtherProps(props) {
      return utils.ObjectUtils.getDiffProps(props, RippleBase.defaultProps);
    }
  });

  function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
  function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
  var Ripple = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
    var _React$useState = React__namespace.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      isMounted = _React$useState2[0],
      setMounted = _React$useState2[1];
    var inkRef = React__namespace.useRef(null);
    var targetRef = React__namespace.useRef(null);
    var mergeProps = hooks.useMergeProps();
    var context = React__namespace.useContext(PrimeReact.PrimeReactContext);
    var props = RippleBase.getProps(inProps, context);
    var isRippleActive = context && context.ripple || PrimeReact__default["default"].ripple;
    var metaData = {
      props: props
    };
    hooks.useStyle(RippleBase.css.styles, {
      name: 'ripple',
      manual: !isRippleActive
    });
    var _RippleBase$setMetaDa = RippleBase.setMetaData(_objectSpread({}, metaData)),
      ptm = _RippleBase$setMetaDa.ptm,
      cx = _RippleBase$setMetaDa.cx;
    var getTarget = function getTarget() {
      return inkRef.current && inkRef.current.parentElement;
    };
    var bindEvents = function bindEvents() {
      if (targetRef.current) {
        targetRef.current.addEventListener('pointerdown', onPointerDown);
      }
    };
    var unbindEvents = function unbindEvents() {
      if (targetRef.current) {
        targetRef.current.removeEventListener('pointerdown', onPointerDown);
      }
    };
    var onPointerDown = function onPointerDown(event) {
      var offset = utils.DomHandler.getOffset(targetRef.current);
      var offsetX = event.pageX - offset.left + document.body.scrollTop - utils.DomHandler.getWidth(inkRef.current) / 2;
      var offsetY = event.pageY - offset.top + document.body.scrollLeft - utils.DomHandler.getHeight(inkRef.current) / 2;
      activateRipple(offsetX, offsetY);
    };
    var activateRipple = function activateRipple(offsetX, offsetY) {
      if (!inkRef.current || getComputedStyle(inkRef.current, null).display === 'none') {
        return;
      }
      utils.DomHandler.removeClass(inkRef.current, 'p-ink-active');
      setDimensions();
      inkRef.current.style.top = offsetY + 'px';
      inkRef.current.style.left = offsetX + 'px';
      utils.DomHandler.addClass(inkRef.current, 'p-ink-active');
    };
    var onAnimationEnd = function onAnimationEnd(event) {
      utils.DomHandler.removeClass(event.currentTarget, 'p-ink-active');
    };
    var setDimensions = function setDimensions() {
      if (inkRef.current && !utils.DomHandler.getHeight(inkRef.current) && !utils.DomHandler.getWidth(inkRef.current)) {
        var d = Math.max(utils.DomHandler.getOuterWidth(targetRef.current), utils.DomHandler.getOuterHeight(targetRef.current));
        inkRef.current.style.height = d + 'px';
        inkRef.current.style.width = d + 'px';
      }
    };
    React__namespace.useImperativeHandle(ref, function () {
      return {
        props: props,
        getInk: function getInk() {
          return inkRef.current;
        },
        getTarget: function getTarget() {
          return targetRef.current;
        }
      };
    });
    hooks.useMountEffect(function () {
      // for App Router in Next.js ^14
      setMounted(true);
    });
    hooks.useUpdateEffect(function () {
      if (isMounted && inkRef.current) {
        targetRef.current = getTarget();
        setDimensions();
        bindEvents();
      }
    }, [isMounted]);
    hooks.useUpdateEffect(function () {
      if (inkRef.current && !targetRef.current) {
        targetRef.current = getTarget();
        setDimensions();
        bindEvents();
      }
    });
    hooks.useUnmountEffect(function () {
      if (inkRef.current) {
        targetRef.current = null;
        unbindEvents();
      }
    });
    if (!isRippleActive) {
      return null;
    }
    var rootProps = mergeProps({
      'aria-hidden': true,
      className: utils.classNames(cx('root'))
    }, RippleBase.getOtherProps(props), ptm('root'));
    return /*#__PURE__*/React__namespace.createElement("span", _extends({
      role: "presentation",
      ref: inkRef
    }, rootProps, {
      onAnimationEnd: onAnimationEnd
    }));
  }));
  Ripple.displayName = 'Ripple';

  exports.Ripple = Ripple;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.api, primereact.hooks, primereact.utils, primereact.componentbase);
