this.primereact = this.primereact || {};
this.primereact.sidebar = (function (exports, React, utils, PrimeReact, componentbase, csstransition, hooks, times, portal, ripple) {
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

  var usePrevious = function usePrevious(newValue) {
    var ref = React__namespace.useRef(undefined);
    React__namespace.useEffect(function () {
      ref.current = newValue;
    });
    return ref.current;
  };

  /* eslint-disable */
  var useUnmountEffect = function useUnmountEffect(fn) {
    return React__namespace.useEffect(function () {
      return fn;
    }, []);
  };
  /* eslint-enable */

  /* eslint-disable */
  var useEventListener = function useEventListener(_ref) {
    var _ref$target = _ref.target,
      target = _ref$target === void 0 ? 'document' : _ref$target,
      type = _ref.type,
      listener = _ref.listener,
      options = _ref.options,
      _ref$when = _ref.when,
      when = _ref$when === void 0 ? true : _ref$when;
    var targetRef = React__namespace.useRef(null);
    var listenerRef = React__namespace.useRef(null);
    var prevListener = usePrevious(listener);
    var prevOptions = usePrevious(options);
    var bind = function bind() {
      var bindOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      if (utils.ObjectUtils.isNotEmpty(bindOptions.target)) {
        unbind();
        (bindOptions.when || when) && (targetRef.current = utils.DomHandler.getTargetElement(bindOptions.target));
      }
      if (!listenerRef.current && targetRef.current) {
        listenerRef.current = function (event) {
          return listener && listener(event);
        };
        targetRef.current.addEventListener(type, listenerRef.current, options);
      }
    };
    var unbind = function unbind() {
      if (listenerRef.current) {
        targetRef.current.removeEventListener(type, listenerRef.current, options);
        listenerRef.current = null;
      }
    };
    React__namespace.useEffect(function () {
      if (when) {
        targetRef.current = utils.DomHandler.getTargetElement(target);
      } else {
        unbind();
        targetRef.current = null;
      }
    }, [target, when]);
    React__namespace.useEffect(function () {
      // to properly compare functions we can implicitly converting the function to it's body's text as a String
      if (listenerRef.current && ('' + prevListener !== '' + listener || prevOptions !== options)) {
        unbind();
        when && bind();
      }
    }, [listener, options, when]);
    useUnmountEffect(function () {
      unbind();
    });
    return [bind, unbind];
  };
  /* eslint-enable */

  var useOnEscapeKey = function useOnEscapeKey(ref, condition, callback) {
    var handleEsc = function handleEsc(event) {
      if (event.key === 'Esc' || event.key === 'Escape') {
        event.stopImmediatePropagation();
        callback(event);
      }
      return;
    };
    var _useEventListener = useEventListener({
        type: 'keydown',
        listener: handleEsc
      }),
      _useEventListener2 = _slicedToArray(_useEventListener, 2),
      bindKeyDownListener = _useEventListener2[0],
      unbindKeyDownListener = _useEventListener2[1];
    React__namespace.useEffect(function () {
      if (!condition) {
        return;
      }
      if (!ref.current) {
        return;
      }
      bindKeyDownListener();
      return function () {
        unbindKeyDownListener();
      };
    });
    return [ref, callback];
  };

  var classes = {
    closeButton: 'p-sidebar-close p-sidebar-icon p-link',
    closeIcon: 'p-sidebar-close-icon',
    mask: function mask(_ref) {
      var props = _ref.props,
        maskVisibleState = _ref.maskVisibleState;
      var positions = ['left', 'right', 'top', 'bottom'];
      var pos = positions.find(function (item) {
        return item === props.position;
      });
      return utils.classNames('p-sidebar-mask', pos ? "p-sidebar-".concat(pos) : '', {
        'p-component-overlay p-component-overlay-enter': props.modal,
        'p-sidebar-mask-scrollblocker': props.blockScroll,
        'p-sidebar-visible': maskVisibleState,
        'p-sidebar-full': props.fullScreen
      }, props.maskClassName);
    },
    header: function header(_ref2) {
      var props = _ref2.props;
      return utils.classNames('p-sidebar-header', {
        'p-sidebar-custom-header': props.header
      });
    },
    content: 'p-sidebar-content',
    icons: 'p-sidebar-icons',
    root: function root(_ref3) {
      var props = _ref3.props,
        context = _ref3.context;
      return utils.classNames('p-sidebar p-component', props.className, {
        'p-input-filled': context && context.inputStyle === 'filled' || PrimeReact__default["default"].inputStyle === 'filled',
        'p-ripple-disabled': context && context.ripple === false || PrimeReact__default["default"].ripple === false
      });
    },
    transition: 'p-sidebar'
  };
  var styles = "\n@layer primereact {\n    .p-sidebar-mask {\n        display: none;\n        justify-content: center;\n        align-items: center;\n        pointer-events: none;\n        background-color: transparent;\n        transition-property: background-color;\n    }\n    \n    .p-sidebar-visible {\n        display: flex;\n    }\n    \n    .p-sidebar-mask.p-component-overlay {\n        pointer-events: auto;\n    }\n    \n    .p-sidebar {\n        display: flex;\n        flex-direction: column;\n        pointer-events: auto;\n        transform: translate3d(0px, 0px, 0px);\n        position: relative;\n    }\n    \n    .p-sidebar-content {\n        overflow-y: auto;\n        flex-grow: 1;\n    }\n    \n    .p-sidebar-header {\n        display: flex;\n        align-items: center;\n        justify-content: flex-end;\n    }\n    \n    .p-sidebar-custom-header {\n        justify-content: space-between;\n    }\n    \n    .p-sidebar-icons {\n        display: flex;\n        align-items: center;\n        flex-shrink: 0;\n    }\n    \n    .p-sidebar-icon {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        overflow: hidden;\n        position: relative;\n    }\n    \n    .p-sidebar-full .p-sidebar {\n        transition: none;\n        transform: none;\n        width: 100vw !important;\n        height: 100vh !important;\n        max-height: 100%;\n        top: 0px !important;\n        left: 0px !important;\n    }\n    \n    /* Animation */\n    /* Top, Bottom, Left and Right */\n    .p-sidebar-top .p-sidebar-enter,\n    .p-sidebar-top .p-sidebar-exit-active {\n        transform: translate3d(0px, -100%, 0px);\n    }\n    \n    .p-sidebar-bottom .p-sidebar-enter,\n    .p-sidebar-bottom .p-sidebar-exit-active {\n        transform: translate3d(0px, 100%, 0px);\n    }\n    \n    .p-sidebar-left .p-sidebar-enter,\n    .p-sidebar-left .p-sidebar-exit-active {\n        transform: translate3d(-100%, 0px, 0px);\n    }\n    \n    .p-sidebar-right .p-sidebar-enter,\n    .p-sidebar-right .p-sidebar-exit-active {\n        transform: translate3d(100%, 0px, 0px);\n    }\n    \n    .p-sidebar-top .p-sidebar-enter-active,\n    .p-sidebar-bottom .p-sidebar-enter-active,\n    .p-sidebar-left .p-sidebar-enter-active,\n    .p-sidebar-right .p-sidebar-enter-active {\n        transform: translate3d(0px, 0px, 0px);\n        transition: all 0.3s;\n    }\n    \n    .p-sidebar-top .p-sidebar-enter-done,\n    .p-sidebar-bottom .p-sidebar-enter-done,\n    .p-sidebar-left .p-sidebar-enter-done,\n    .p-sidebar-right .p-sidebar-enter-done {\n        transform: none;\n    }\n    \n    .p-sidebar-top .p-sidebar-exit-active,\n    .p-sidebar-bottom .p-sidebar-exit-active,\n    .p-sidebar-left .p-sidebar-exit-active,\n    .p-sidebar-right .p-sidebar-exit-active {\n        transition: all 0.3s;\n    }\n    \n    /* Full */\n    .p-sidebar-full .p-sidebar-enter {\n        opacity: 0;\n        transform: scale(0.5);\n    }\n    \n    .p-sidebar-full .p-sidebar-enter-active {\n        opacity: 1;\n        transform: scale(1);\n        transition: all 0.15s cubic-bezier(0, 0, 0.2, 1);\n    }\n    \n    .p-sidebar-full .p-sidebar-enter-done {\n        transform: none;\n    }\n    \n    .p-sidebar-full .p-sidebar-exit-active {\n        opacity: 0;\n        transform: scale(0.5);\n        transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);\n    }\n    \n    /* Size */\n    .p-sidebar-left .p-sidebar {\n        width: 20rem;\n        height: 100%;\n    }\n    \n    .p-sidebar-right .p-sidebar {\n        width: 20rem;\n        height: 100%;\n    }\n    \n    .p-sidebar-top .p-sidebar {\n        height: 10rem;\n        width: 100%;\n    }\n    \n    .p-sidebar-bottom .p-sidebar {\n        height: 10rem;\n        width: 100%;\n    }\n    \n    .p-sidebar-left .p-sidebar-sm,\n    .p-sidebar-right .p-sidebar-sm {\n        width: 20rem;\n    }\n    \n    .p-sidebar-left .p-sidebar-md,\n    .p-sidebar-right .p-sidebar-md {\n        width: 40rem;\n    }\n    \n    .p-sidebar-left .p-sidebar-lg,\n    .p-sidebar-right .p-sidebar-lg {\n        width: 60rem;\n    }\n    \n    .p-sidebar-top .p-sidebar-sm,\n    .p-sidebar-bottom .p-sidebar-sm {\n        height: 10rem;\n    }\n    \n    .p-sidebar-top .p-sidebar-md,\n    .p-sidebar-bottom .p-sidebar-md {\n        height: 20rem;\n    }\n    \n    .p-sidebar-top .p-sidebar-lg,\n    .p-sidebar-bottom .p-sidebar-lg {\n        height: 30rem;\n    }\n    \n    .p-sidebar-left .p-sidebar-view,\n    .p-sidebar-right .p-sidebar-view,\n    .p-sidebar-top .p-sidebar-view,\n    .p-sidebar-bottom .p-sidebar-view {\n        width: 100%;\n        height: 100%;\n    }\n    \n    .p-sidebar-left .p-sidebar-content,\n    .p-sidebar-right .p-sidebar-content,\n    .p-sidebar-top .p-sidebar-content,\n    .p-sidebar-bottom .p-sidebar-content {\n        width: 100%;\n        height: 100%;\n    }\n    \n    @media screen and (max-width: 64em) {\n        .p-sidebar-left .p-sidebar-lg,\n        .p-sidebar-left .p-sidebar-md,\n        .p-sidebar-right .p-sidebar-lg,\n        .p-sidebar-right .p-sidebar-md {\n            width: 20rem;\n        }\n    }        \n}\n";
  var inlineStyles = {
    mask: function mask(_ref4) {
      var props = _ref4.props;
      return {
        position: 'fixed',
        height: '100%',
        width: '100%',
        left: 0,
        top: 0,
        display: 'flex',
        justifyContent: props.position === 'left' ? 'flex-start' : props.position === 'right' ? 'flex-end' : 'center',
        alignItems: props.position === 'top' ? 'flex-start' : props.position === 'bottom' ? 'flex-end' : 'center'
      };
    }
  };
  var SidebarBase = componentbase.ComponentBase.extend({
    defaultProps: {
      __TYPE: 'Sidebar',
      id: null,
      style: null,
      className: null,
      maskStyle: null,
      maskClassName: null,
      visible: false,
      position: 'left',
      fullScreen: false,
      blockScroll: false,
      baseZIndex: 0,
      dismissable: true,
      showCloseIcon: true,
      closeIcon: null,
      ariaCloseLabel: null,
      closeOnEscape: true,
      icons: null,
      modal: true,
      appendTo: null,
      transitionOptions: null,
      onShow: null,
      onHide: null,
      children: undefined
    },
    css: {
      classes: classes,
      styles: styles,
      inlineStyles: inlineStyles
    }
  });

  function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
  function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
  var Sidebar = /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
    var context = React__namespace.useContext(PrimeReact.PrimeReactContext);
    var props = SidebarBase.getProps(inProps, context);
    var _React$useState = React__namespace.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      maskVisibleState = _React$useState2[0],
      setMaskVisibleState = _React$useState2[1];
    var _React$useState3 = React__namespace.useState(false),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      visibleState = _React$useState4[0],
      setVisibleState = _React$useState4[1];
    var _SidebarBase$setMetaD = SidebarBase.setMetaData({
        props: props,
        state: {
          containerVisible: maskVisibleState
        }
      }),
      ptm = _SidebarBase$setMetaD.ptm,
      cx = _SidebarBase$setMetaD.cx,
      sx = _SidebarBase$setMetaD.sx,
      isUnstyled = _SidebarBase$setMetaD.isUnstyled;
    componentbase.useHandleStyle(SidebarBase.css.styles, isUnstyled, {
      name: 'sidebar'
    });
    var sidebarRef = React__namespace.useRef(null);
    var maskRef = React__namespace.useRef(null);
    var closeIconRef = React__namespace.useRef(null);
    useOnEscapeKey(maskRef, props.closeOnEscape, function (event) {
      if (utils.ZIndexUtils.get(maskRef.current) === utils.ZIndexUtils.getCurrent('modal', context && context.autoZIndex || PrimeReact__default["default"].autoZIndex)) {
        onClose(event);
      }
    });
    var _useEventListener = hooks.useEventListener({
        type: 'click',
        listener: function listener(event) {
          if (event.button !== 0) {
            // ignore anything other than left click
            return;
          }
          if (isOutsideClicked(event)) {
            onClose(event);
          }
        }
      }),
      _useEventListener2 = _slicedToArray(_useEventListener, 2),
      bindDocumentClickListener = _useEventListener2[0],
      unbindDocumentClickListener = _useEventListener2[1];
    var isOutsideClicked = function isOutsideClicked(event) {
      return sidebarRef && sidebarRef.current && !sidebarRef.current.contains(event.target);
    };
    var focus = function focus() {
      var activeElement = document.activeElement;
      var isActiveElementInDialog = activeElement && sidebarRef && sidebarRef.current.contains(activeElement);
      if (!isActiveElementInDialog && props.showCloseIcon) {
        closeIconRef.current.focus();
      }
    };
    var onMaskClick = function onMaskClick(event) {
      if (props.dismissable && props.modal && maskRef.current === event.target) {
        onClose(event);
      }
    };
    var onClose = function onClose(event) {
      props.onHide();
      event.preventDefault();
    };
    var onEntered = function onEntered() {
      props.onShow && props.onShow();
      focus();
      enableDocumentSettings();
    };
    var onExiting = function onExiting() {
      if (props.modal) {
        utils.DomHandler.addClass(maskRef.current, 'p-component-overlay-leave');
      }
    };
    var onExited = function onExited() {
      utils.ZIndexUtils.clear(maskRef.current);
      setMaskVisibleState(false);
      disableDocumentSettings();
    };
    var enableDocumentSettings = function enableDocumentSettings() {
      if (props.dismissable && !props.modal) {
        bindDocumentClickListener();
      }
      if (props.blockScroll) {
        utils.DomHandler.blockBodyScroll();
      }
    };
    var disableDocumentSettings = function disableDocumentSettings() {
      unbindDocumentClickListener();
      if (props.blockScroll) {
        utils.DomHandler.unblockBodyScroll();
      }
    };
    React__namespace.useImperativeHandle(ref, function () {
      return {
        props: props,
        getElement: function getElement() {
          return sidebarRef.current;
        },
        gteMask: function gteMask() {
          return maskRef.current;
        },
        getCloseIcon: function getCloseIcon() {
          return closeIconRef.current;
        }
      };
    });
    hooks.useMountEffect(function () {
      if (props.visible) {
        setMaskVisibleState(true);
      }
    });
    hooks.useUpdateEffect(function () {
      if (props.visible && !maskVisibleState) {
        setMaskVisibleState(true);
      }
      if (props.visible !== visibleState && maskVisibleState) {
        setVisibleState(props.visible);
      }
    });
    hooks.useUpdateEffect(function () {
      if (maskVisibleState) {
        utils.ZIndexUtils.set('modal', maskRef.current, context && context.autoZIndex || PrimeReact__default["default"].autoZIndex, props.baseZIndex || context && context.zIndex['modal'] || PrimeReact__default["default"].zIndex['modal']);
        setVisibleState(true);
      }
    }, [maskVisibleState]);
    hooks.useUpdateEffect(function () {
      // #3811 if dismissible state is toggled while open we must unregister and re-regisetr
      if (visibleState) {
        unbindDocumentClickListener();
        if (props.dismissable && !props.modal) {
          bindDocumentClickListener();
        }
      }
    }, [props.dismissable, props.modal, visibleState]);
    hooks.useUnmountEffect(function () {
      disableDocumentSettings();
      maskRef.current && utils.ZIndexUtils.clear(maskRef.current);
    });
    var createCloseIcon = function createCloseIcon() {
      var closeButtonProps = utils.mergeProps({
        type: 'button',
        ref: closeIconRef,
        className: cx('closeButton'),
        onClick: function onClick(e) {
          return onClose(e);
        },
        'aria-label': ariaLabel
      }, ptm('closeButton'));
      var closeIconProps = utils.mergeProps({
        className: cx('closeIcon')
      }, ptm('closeIcon'));
      var icon = props.closeIcon || /*#__PURE__*/React__namespace.createElement(times.TimesIcon, closeIconProps);
      var closeIcon = utils.IconUtils.getJSXIcon(icon, _objectSpread({}, closeIconProps), {
        props: props
      });
      var ariaLabel = props.ariaCloseLabel || PrimeReact.localeOption('close');
      if (props.showCloseIcon) {
        return /*#__PURE__*/React__namespace.createElement("button", closeButtonProps, closeIcon, /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null));
      }
      return null;
    };
    var createHeader = function createHeader() {
      return props.header ? utils.ObjectUtils.getJSXElement(props.header, props) : null;
    };
    var createIcons = function createIcons() {
      return props.icons ? utils.ObjectUtils.getJSXElement(props.icons, props) : null;
    };
    var createElement = function createElement() {
      var closeIcon = createCloseIcon();
      var icons = createIcons();
      var header = createHeader();
      var transitionTimeout = {
        enter: props.fullScreen ? 150 : 300,
        exit: props.fullScreen ? 150 : 300
      };
      var maskProps = utils.mergeProps({
        ref: maskRef,
        style: sx('mask'),
        className: cx('mask', {
          maskVisibleState: maskVisibleState
        }),
        onMouseDown: function onMouseDown(e) {
          return onMaskClick(e);
        }
      }, ptm('mask'));
      var rootProps = utils.mergeProps({
        id: props.id,
        className: cx('root', {
          context: context
        }),
        style: props.style,
        role: 'complementary'
      }, SidebarBase.getOtherProps(props), ptm('root'));
      var headerProps = utils.mergeProps({
        className: cx('header')
      }, ptm('header'));
      var contentProps = utils.mergeProps({
        className: cx('content')
      }, ptm('content'));
      var iconsProps = utils.mergeProps({
        className: cx('icons')
      }, ptm('icons'));
      var transitionProps = utils.mergeProps({
        classNames: cx('transition'),
        "in": visibleState,
        timeout: transitionTimeout,
        options: props.transitionOptions,
        unmountOnExit: true,
        onEntered: onEntered,
        onExiting: onExiting,
        onExited: onExited
      }, ptm('transition'));
      return /*#__PURE__*/React__namespace.createElement("div", maskProps, /*#__PURE__*/React__namespace.createElement(csstransition.CSSTransition, _extends({
        nodeRef: sidebarRef
      }, transitionProps), /*#__PURE__*/React__namespace.createElement("div", _extends({
        ref: sidebarRef
      }, rootProps), /*#__PURE__*/React__namespace.createElement("div", headerProps, header, /*#__PURE__*/React__namespace.createElement("div", iconsProps, icons, closeIcon)), /*#__PURE__*/React__namespace.createElement("div", contentProps, props.children))));
    };
    var createSidebar = function createSidebar() {
      var element = createElement();
      return /*#__PURE__*/React__namespace.createElement(portal.Portal, {
        element: element,
        appendTo: props.appendTo,
        visible: true
      });
    };
    return maskVisibleState && createSidebar();
  });
  Sidebar.displayName = 'Sidebar';

  exports.Sidebar = Sidebar;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.utils, primereact.api, primereact.componentbase, primereact.csstransition, primereact.hooks, primereact.icons.times, primereact.portal, primereact.ripple);
