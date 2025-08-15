this.primereact = this.primereact || {};
this.primereact.skeleton = (function (exports, React, api, componentbase, hooks, utils) {
  'use strict';

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

  var classes = {
    root: function root(_ref) {
      var props = _ref.props;
      return utils.classNames('p-skeleton p-component', {
        'p-skeleton-circle': props.shape === 'circle',
        'p-skeleton-none': props.animation === 'none'
      });
    }
  };
  var styles = "\n@layer primereact {\n    .p-skeleton {\n        position: relative;\n        overflow: hidden;\n    }\n    \n    .p-skeleton::after {\n        content: \"\";\n        animation: p-skeleton-animation 1.2s infinite;\n        height: 100%;\n        left: 0;\n        position: absolute;\n        right: 0;\n        top: 0;\n        transform: translateX(-100%);\n        z-index: 1;\n    }\n    \n    .p-skeleton-circle {\n        border-radius: 50%;\n    }\n    \n    .p-skeleton-none::after {\n        animation: none;\n    }\n}\n\n@keyframes p-skeleton-animation {\n    from {\n        transform: translateX(-100%);\n    }\n    to {\n        transform: translateX(100%);\n    }\n}\n";
  var inlineStyles = {
    root: {
      position: 'relative'
    }
  };
  var SkeletonBase = componentbase.ComponentBase.extend({
    defaultProps: {
      __TYPE: 'Skeleton',
      shape: 'rectangle',
      size: null,
      width: '100%',
      height: '1rem',
      borderRadius: null,
      animation: 'wave',
      style: null,
      className: null
    },
    css: {
      classes: classes,
      inlineStyles: inlineStyles,
      styles: styles
    }
  });

  function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
  function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
  var Skeleton = /*#__PURE__*/React__namespace.memo(/*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
    var mergeProps = hooks.useMergeProps();
    var context = React__namespace.useContext(api.PrimeReactContext);
    var props = SkeletonBase.getProps(inProps, context);
    var _SkeletonBase$setMeta = SkeletonBase.setMetaData({
        props: props
      }),
      ptm = _SkeletonBase$setMeta.ptm,
      cx = _SkeletonBase$setMeta.cx,
      sx = _SkeletonBase$setMeta.sx,
      isUnstyled = _SkeletonBase$setMeta.isUnstyled;
    componentbase.useHandleStyle(SkeletonBase.css.styles, isUnstyled, {
      name: 'skeleton'
    });
    var elementRef = React__namespace.useRef(null);
    React__namespace.useImperativeHandle(ref, function () {
      return {
        props: props,
        getElement: function getElement() {
          return elementRef.current;
        }
      };
    });
    var style = props.size ? {
      width: props.size,
      height: props.size,
      borderRadius: props.borderRadius
    } : {
      width: props.width,
      height: props.height,
      borderRadius: props.borderRadius
    };
    var rootProps = mergeProps({
      ref: elementRef,
      className: utils.classNames(props.className, cx('root')),
      style: _objectSpread(_objectSpread({}, style), sx('root')),
      'aria-hidden': true
    }, SkeletonBase.getOtherProps(props), ptm('root'));
    return /*#__PURE__*/React__namespace.createElement("div", rootProps);
  }));
  Skeleton.displayName = 'Skeleton';

  exports.Skeleton = Skeleton;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.api, primereact.componentbase, primereact.hooks, primereact.utils);
