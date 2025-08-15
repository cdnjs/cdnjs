this.primereact = this.primereact || {};
this.primereact.sidebar = (function (exports, React, PrimeReact, componentbase, csstransition, hooks, times, portal, ripple, utils) {
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
    closeButton: 'p-sidebar-close p-sidebar-icon p-link',
    closeIcon: 'p-sidebar-close-icon',
    mask: function mask(_ref) {
      var props = _ref.props,
        maskVisibleState = _ref.maskVisibleState;
      var positions = ['left', 'right', 'top', 'bottom'];
      var pos = positions.find(function (item) {
        return item === props.position;
      });
      return utils.classNames('p-sidebar-mask', pos && !props.fullScreen ? "p-sidebar-".concat(pos) : '', {
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
      _ref3.props;
        var context = _ref3.context;
      return utils.classNames('p-sidebar p-component', {
        'p-input-filled': context && context.inputStyle === 'filled' || PrimeReact__default["default"].inputStyle === 'filled',
        'p-ripple-disabled': context && context.ripple === false || PrimeReact__default["default"].ripple === false
      });
    },
    transition: 'p-sidebar'
  };
  var styles = "\n@layer primereact {\n    .p-sidebar-mask {\n        display: none;\n        justify-content: center;\n        align-items: center;\n        pointer-events: none;\n        background-color: transparent;\n        transition-property: background-color;\n    }\n    \n    .p-sidebar-visible {\n        display: flex;\n    }\n    \n    .p-sidebar-mask.p-component-overlay {\n        pointer-events: auto;\n    }\n    \n    .p-sidebar {\n        display: flex;\n        flex-direction: column;\n        pointer-events: auto;\n        transform: translate3d(0px, 0px, 0px);\n        position: relative;\n    }\n    \n    .p-sidebar-content {\n        overflow-y: auto;\n        flex-grow: 1;\n    }\n    \n    .p-sidebar-header {\n        display: flex;\n        align-items: center;\n        justify-content: flex-end;\n    }\n    \n    .p-sidebar-custom-header {\n        justify-content: space-between;\n    }\n    \n    .p-sidebar-icons {\n        display: flex;\n        align-items: center;\n        flex-shrink: 0;\n    }\n    \n    .p-sidebar-icon {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        overflow: hidden;\n        position: relative;\n    }\n    \n    .p-sidebar-full .p-sidebar {\n        transition: none;\n        transform: none;\n        width: 100vw;\n        height: 100vh;\n        max-height: 100%;\n        top: 0px;\n        left: 0px;\n    }\n    \n    /* Animation */\n    /* Top, Bottom, Left and Right */\n    .p-sidebar-top .p-sidebar-enter,\n    .p-sidebar-top .p-sidebar-exit-active {\n        transform: translate3d(0px, -100%, 0px);\n    }\n    \n    .p-sidebar-bottom .p-sidebar-enter,\n    .p-sidebar-bottom .p-sidebar-exit-active {\n        transform: translate3d(0px, 100%, 0px);\n    }\n    \n    .p-sidebar-left .p-sidebar-enter,\n    .p-sidebar-left .p-sidebar-exit-active {\n        transform: translate3d(-100%, 0px, 0px);\n    }\n    \n    .p-sidebar-right .p-sidebar-enter,\n    .p-sidebar-right .p-sidebar-exit-active {\n        transform: translate3d(100%, 0px, 0px);\n    }\n    \n    .p-sidebar-top .p-sidebar-enter-active,\n    .p-sidebar-bottom .p-sidebar-enter-active,\n    .p-sidebar-left .p-sidebar-enter-active,\n    .p-sidebar-right .p-sidebar-enter-active {\n        transform: translate3d(0px, 0px, 0px);\n        transition: all 0.3s;\n    }\n    \n    .p-sidebar-top .p-sidebar-enter-done,\n    .p-sidebar-bottom .p-sidebar-enter-done,\n    .p-sidebar-left .p-sidebar-enter-done,\n    .p-sidebar-right .p-sidebar-enter-done {\n        transform: none;\n    }\n    \n    .p-sidebar-top .p-sidebar-exit-active,\n    .p-sidebar-bottom .p-sidebar-exit-active,\n    .p-sidebar-left .p-sidebar-exit-active,\n    .p-sidebar-right .p-sidebar-exit-active {\n        transition: all 0.3s;\n    }\n    \n    /* Full */\n    .p-sidebar-full .p-sidebar-enter {\n        opacity: 0;\n        transform: scale(0.5);\n    }\n    \n    .p-sidebar-full .p-sidebar-enter-active {\n        opacity: 1;\n        transform: scale(1);\n        transition: all 0.15s cubic-bezier(0, 0, 0.2, 1);\n    }\n    \n    .p-sidebar-full .p-sidebar-enter-done {\n        transform: none;\n    }\n    \n    .p-sidebar-full .p-sidebar-exit-active {\n        opacity: 0;\n        transform: scale(0.5);\n        transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);\n    }\n    \n    /* Size */\n    .p-sidebar-left .p-sidebar {\n        width: 20rem;\n        height: 100%;\n    }\n    \n    .p-sidebar-right .p-sidebar {\n        width: 20rem;\n        height: 100%;\n    }\n    \n    .p-sidebar-top .p-sidebar {\n        height: 10rem;\n        width: 100%;\n    }\n    \n    .p-sidebar-bottom .p-sidebar {\n        height: 10rem;\n        width: 100%;\n    }\n    \n    .p-sidebar-left .p-sidebar-sm,\n    .p-sidebar-right .p-sidebar-sm {\n        width: 20rem;\n    }\n    \n    .p-sidebar-left .p-sidebar-md,\n    .p-sidebar-right .p-sidebar-md {\n        width: 40rem;\n    }\n    \n    .p-sidebar-left .p-sidebar-lg,\n    .p-sidebar-right .p-sidebar-lg {\n        width: 60rem;\n    }\n    \n    .p-sidebar-top .p-sidebar-sm,\n    .p-sidebar-bottom .p-sidebar-sm {\n        height: 10rem;\n    }\n    \n    .p-sidebar-top .p-sidebar-md,\n    .p-sidebar-bottom .p-sidebar-md {\n        height: 20rem;\n    }\n    \n    .p-sidebar-top .p-sidebar-lg,\n    .p-sidebar-bottom .p-sidebar-lg {\n        height: 30rem;\n    }\n    \n    .p-sidebar-left .p-sidebar-view,\n    .p-sidebar-right .p-sidebar-view,\n    .p-sidebar-top .p-sidebar-view,\n    .p-sidebar-bottom .p-sidebar-view {\n        width: 100%;\n        height: 100%;\n    }\n    \n    .p-sidebar-left .p-sidebar-content,\n    .p-sidebar-right .p-sidebar-content,\n    .p-sidebar-top .p-sidebar-content,\n    .p-sidebar-bottom .p-sidebar-content {\n        width: 100%;\n        height: 100%;\n    }\n    \n    @media screen and (max-width: 64em) {\n        .p-sidebar-left .p-sidebar-lg,\n        .p-sidebar-left .p-sidebar-md,\n        .p-sidebar-right .p-sidebar-lg,\n        .p-sidebar-right .p-sidebar-md {\n            width: 20rem;\n        }\n    }        \n}\n";
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
      appendTo: null,
      ariaCloseLabel: null,
      baseZIndex: 0,
      blockScroll: false,
      children: undefined,
      className: null,
      closeIcon: null,
      closeOnEscape: true,
      content: null,
      dismissable: true,
      fullScreen: false,
      header: null,
      icons: null,
      id: null,
      maskClassName: null,
      maskStyle: null,
      modal: true,
      onHide: null,
      onShow: null,
      position: 'left',
      showCloseIcon: true,
      style: null,
      transitionOptions: null,
      visible: false
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
    var mergeProps = hooks.useMergeProps();
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
    var isCloseOnEscape = visibleState && props.closeOnEscape;
    var sidebarDisplayOrder = hooks.useDisplayOrder('sidebar', isCloseOnEscape);
    hooks.useGlobalOnEscapeKey({
      callback: function callback(event) {
        onClose(event);
      },
      when: isCloseOnEscape && sidebarDisplayOrder,
      priority: [hooks.ESC_KEY_HANDLING_PRIORITIES.SIDEBAR, sidebarDisplayOrder]
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
      if (!isActiveElementInDialog && props.showCloseIcon && closeIconRef.current) {
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
        !isUnstyled() && utils.DomHandler.addClass(maskRef.current, 'p-component-overlay-leave');
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
        getMask: function getMask() {
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
    }, [props.visible, maskVisibleState, visibleState]);
    hooks.useUpdateEffect(function () {
      if (maskVisibleState) {
        utils.ZIndexUtils.set('modal', maskRef.current, context && context.autoZIndex || PrimeReact__default["default"].autoZIndex, props.baseZIndex || context && context.zIndex.modal || PrimeReact__default["default"].zIndex.modal);
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
      var closeButtonProps = mergeProps({
        type: 'button',
        ref: closeIconRef,
        className: cx('closeButton'),
        onClick: function onClick(e) {
          return onClose(e);
        },
        'aria-label': props.ariaCloseLabel || PrimeReact.ariaLabel('close')
      }, ptm('closeButton'));
      var closeIconProps = mergeProps({
        className: cx('closeIcon')
      }, ptm('closeIcon'));
      var icon = props.closeIcon || /*#__PURE__*/React__namespace.createElement(times.TimesIcon, closeIconProps);
      var closeIcon = utils.IconUtils.getJSXIcon(icon, _objectSpread({}, closeIconProps), {
        props: props
      });
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
    var maskProps = mergeProps({
      ref: maskRef,
      style: sx('mask'),
      className: cx('mask', {
        maskVisibleState: maskVisibleState
      }),
      onMouseDown: function onMouseDown(e) {
        return onMaskClick(e);
      }
    }, ptm('mask'));
    var rootProps = mergeProps({
      id: props.id,
      className: utils.classNames(props.className, cx('root', {
        context: context
      })),
      style: props.style,
      role: 'complementary'
    }, SidebarBase.getOtherProps(props), ptm('root'));
    var headerProps = mergeProps({
      className: cx('header')
    }, ptm('header'));
    var contentProps = mergeProps({
      className: cx('content')
    }, ptm('content'));
    var iconsProps = mergeProps({
      className: cx('icons')
    }, ptm('icons'));
    var transitionTimeout = {
      enter: props.fullScreen ? 150 : 300,
      exit: props.fullScreen ? 150 : 300
    };
    var transitionProps = mergeProps({
      classNames: cx('transition'),
      "in": visibleState,
      timeout: transitionTimeout,
      options: props.transitionOptions,
      unmountOnExit: true,
      onEntered: onEntered,
      onExiting: onExiting,
      onExited: onExited
    }, ptm('transition'));
    var createTemplateElement = function createTemplateElement() {
      var templateElementProps = {
        closeIconRef: closeIconRef,
        hide: onClose
      };
      return /*#__PURE__*/React__namespace.createElement("div", maskProps, /*#__PURE__*/React__namespace.createElement(csstransition.CSSTransition, _extends({
        nodeRef: sidebarRef
      }, transitionProps), /*#__PURE__*/React__namespace.createElement("div", _extends({
        ref: sidebarRef
      }, rootProps), utils.ObjectUtils.getJSXElement(inProps.content, templateElementProps))));
    };
    var createElement = function createElement() {
      var closeIcon = createCloseIcon();
      var icons = createIcons();
      var header = createHeader();
      return /*#__PURE__*/React__namespace.createElement("div", maskProps, /*#__PURE__*/React__namespace.createElement(csstransition.CSSTransition, _extends({
        nodeRef: sidebarRef
      }, transitionProps), /*#__PURE__*/React__namespace.createElement("div", _extends({
        ref: sidebarRef
      }, rootProps), /*#__PURE__*/React__namespace.createElement("div", headerProps, header, /*#__PURE__*/React__namespace.createElement("div", iconsProps, icons, closeIcon)), /*#__PURE__*/React__namespace.createElement("div", contentProps, props.children))));
    };
    var createSidebar = function createSidebar() {
      var element = inProps !== null && inProps !== void 0 && inProps.content ? createTemplateElement() : createElement();
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

})({}, React, primereact.api, primereact.componentbase, primereact.csstransition, primereact.hooks, primereact.icons.times, primereact.portal, primereact.ripple, primereact.utils);
