this.primereact = this.primereact || {};
this.primereact.sidebar = (function (exports, React, PrimeReact, csstransition, hooks, portal, ripple, utils) {
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

  var Sidebar = /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
    var _React$useState = React__namespace.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      maskVisibleState = _React$useState2[0],
      setMaskVisibleState = _React$useState2[1];
    var _React$useState3 = React__namespace.useState(false),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      visibleState = _React$useState4[0],
      setVisibleState = _React$useState4[1];
    var sidebarRef = React__namespace.useRef(null);
    var maskRef = React__namespace.useRef(null);
    var closeIconRef = React__namespace.useRef(null);
    var _useEventListener = hooks.useEventListener({
        type: 'keydown',
        listener: function listener(event) {
          if (event.which === 27) {
            if (utils.ZIndexUtils.get(maskRef.current) === utils.ZIndexUtils.getCurrent('modal', PrimeReact__default["default"].autoZIndex)) {
              onClose(event);
            }
          }
        }
      }),
      _useEventListener2 = _slicedToArray(_useEventListener, 2),
      bindDocumentEscapeListener = _useEventListener2[0],
      unbindDocumentEscapeListener = _useEventListener2[1];
    var _useEventListener3 = hooks.useEventListener({
        type: 'click',
        listener: function listener(event) {
          if (event.which === 2) {
            // left click
            return;
          }
          if (isOutsideClicked(event)) {
            onClose(event);
          }
        }
      }),
      _useEventListener4 = _slicedToArray(_useEventListener3, 2),
      bindDocumentClickListener = _useEventListener4[0],
      unbindDocumentClickListener = _useEventListener4[1];
    var isOutsideClicked = function isOutsideClicked(event) {
      return sidebarRef && sidebarRef.current && !sidebarRef.current.contains(event.target);
    };
    var getPositionClass = function getPositionClass() {
      var positions = ['left', 'right', 'top', 'bottom'];
      var pos = positions.find(function (item) {
        return item === props.position;
      });
      return pos ? "p-sidebar-".concat(pos) : '';
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
      if (props.closeOnEscape) {
        bindDocumentEscapeListener();
      }
      if (props.dismissable && !props.modal) {
        bindDocumentClickListener();
      }
      if (props.blockScroll) {
        utils.DomHandler.addClass(document.body, 'p-overflow-hidden');
      }
    };
    var disableDocumentSettings = function disableDocumentSettings() {
      unbindDocumentEscapeListener();
      unbindDocumentClickListener();
      if (props.blockScroll) {
        utils.DomHandler.removeClass(document.body, 'p-overflow-hidden');
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
        utils.ZIndexUtils.set('modal', maskRef.current, PrimeReact__default["default"].autoZIndex, props.baseZIndex || PrimeReact__default["default"].zIndex['modal']);
        setVisibleState(true);
      }
    }, [maskVisibleState]);
    hooks.useUnmountEffect(function () {
      disableDocumentSettings();
      maskRef.current && utils.ZIndexUtils.clear(maskRef.current);
    });
    var createCloseIcon = function createCloseIcon() {
      if (props.showCloseIcon) {
        var ariaLabel = props.ariaCloseLabel || PrimeReact.localeOption('close');
        return /*#__PURE__*/React__namespace.createElement("button", {
          type: "button",
          ref: closeIconRef,
          className: "p-sidebar-close p-sidebar-icon p-link",
          onClick: onClose,
          "aria-label": ariaLabel
        }, /*#__PURE__*/React__namespace.createElement("span", {
          className: "p-sidebar-close-icon pi pi-times",
          "aria-hidden": "true"
        }), /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null));
      }
      return null;
    };
    var createIcons = function createIcons() {
      return props.icons ? utils.ObjectUtils.getJSXElement(props.icons, props) : null;
    };
    var createElement = function createElement() {
      var otherProps = utils.ObjectUtils.findDiffKeys(props, Sidebar.defaultProps);
      var className = utils.classNames('p-sidebar p-component', props.className);
      var maskClassName = utils.classNames('p-sidebar-mask', {
        'p-component-overlay p-component-overlay-enter': props.modal,
        'p-sidebar-mask-scrollblocker': props.blockScroll,
        'p-sidebar-visible': maskVisibleState,
        'p-sidebar-full': props.fullScreen
      }, getPositionClass(), props.maskClassName);
      var closeIcon = createCloseIcon();
      var icons = createIcons();
      var transitionTimeout = {
        enter: props.fullScreen ? 150 : 300,
        exit: props.fullScreen ? 150 : 300
      };
      return /*#__PURE__*/React__namespace.createElement("div", {
        ref: maskRef,
        style: props.maskStyle,
        className: maskClassName,
        onMouseDown: onMaskClick
      }, /*#__PURE__*/React__namespace.createElement(csstransition.CSSTransition, {
        nodeRef: sidebarRef,
        classNames: "p-sidebar",
        "in": visibleState,
        timeout: transitionTimeout,
        options: props.transitionOptions,
        unmountOnExit: true,
        onEntered: onEntered,
        onExiting: onExiting,
        onExited: onExited
      }, /*#__PURE__*/React__namespace.createElement("div", _extends({
        ref: sidebarRef,
        id: props.id,
        className: className,
        style: props.style
      }, otherProps, {
        role: "complementary"
      }), /*#__PURE__*/React__namespace.createElement("div", {
        className: "p-sidebar-header"
      }, icons, closeIcon), /*#__PURE__*/React__namespace.createElement("div", {
        className: "p-sidebar-content"
      }, props.children))));
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
  Sidebar.defaultProps = {
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
    ariaCloseLabel: null,
    closeOnEscape: true,
    icons: null,
    modal: true,
    appendTo: null,
    transitionOptions: null,
    onShow: null,
    onHide: null
  };

  exports.Sidebar = Sidebar;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.api, primereact.csstransition, primereact.hooks, primereact.portal, primereact.ripple, primereact.utils);
