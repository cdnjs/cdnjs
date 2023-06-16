this.primereact = this.primereact || {};
this.primereact.scrolltop = (function (exports, React, PrimeReact, csstransition, hooks, ripple, utils) {
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

  var ScrollTopBase = {
    defaultProps: {
      __TYPE: 'ScrollTop',
      target: 'window',
      threshold: 400,
      icon: 'pi pi-chevron-up',
      behavior: 'smooth',
      className: null,
      style: null,
      transitionOptions: null,
      onShow: null,
      onHide: null,
      children: undefined
    },
    getProps: function getProps(props) {
      return utils.ObjectUtils.getMergedProps(props, ScrollTopBase.defaultProps);
    },
    getOtherProps: function getOtherProps(props) {
      return utils.ObjectUtils.getDiffProps(props, ScrollTopBase.defaultProps);
    }
  };

  var ScrollTop = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
    var props = ScrollTopBase.getProps(inProps);
    var _React$useState = React__namespace.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      visibleState = _React$useState2[0],
      setVisibleState = _React$useState2[1];
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
        listener: function listener() {
          checkVisibility(utils.DomHandler.getWindowScrollTop());
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
      utils.ZIndexUtils.set('overlay', scrollElementRef.current, PrimeReact__default["default"].autoZIndex, PrimeReact__default["default"].zIndex['overlay']);
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
    hooks.useMountEffect(function () {
      if (props.target === 'window') bindDocumentScrollListener();else if (props.target === 'parent') bindParentScrollListener();
    });
    hooks.useUnmountEffect(function () {
      utils.ZIndexUtils.clear(scrollElementRef.current);
    });
    var otherProps = ScrollTopBase.getOtherProps(props);
    var className = utils.classNames('p-scrolltop p-link p-component', {
      'p-scrolltop-sticky': props.target !== 'window'
    }, props.className);
    return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement(csstransition.CSSTransition, {
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
    }, /*#__PURE__*/React__namespace.createElement("button", _extends({
      ref: scrollElementRef,
      type: "button",
      className: className,
      style: props.style
    }, otherProps, {
      onClick: onClick
    }), utils.IconUtils.getJSXIcon(props.icon, {
      className: 'p-scrolltop-icon'
    }, {
      props: props
    }), /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null))), isTargetParent && /*#__PURE__*/React__namespace.createElement("span", {
      ref: helperRef,
      className: "p-scrolltop-helper"
    }));
  }));
  ScrollTop.displayName = 'ScrollTop';

  exports.ScrollTop = ScrollTop;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.api, primereact.csstransition, primereact.hooks, primereact.ripple, primereact.utils);
