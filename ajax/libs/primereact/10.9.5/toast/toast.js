this.primereact = this.primereact || {};
this.primereact.toast = (function (exports, React, reactTransitionGroup, PrimeReact, componentbase, csstransition, hooks, portal, utils, check, exclamationtriangle, infocircle, times, timescircle, ripple) {
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

  function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
    return n;
  }

  function _arrayWithoutHoles(r) {
    if (Array.isArray(r)) return _arrayLikeToArray(r);
  }

  function _iterableToArray(r) {
    if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
  }

  function _unsupportedIterableToArray(r, a) {
    if (r) {
      if ("string" == typeof r) return _arrayLikeToArray(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
    }
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _toConsumableArray(r) {
    return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
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

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _slicedToArray(r, e) {
    return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
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

  var styles = "\n@layer primereact {\n    .p-toast {\n        width: calc(100% - var(--toast-indent, 0px));\n        max-width: 25rem;\n    }\n    \n    .p-toast-message-icon {\n        flex-shrink: 0;\n    }\n    \n    .p-toast-message-content {\n        display: flex;\n        align-items: flex-start;\n    }\n    \n    .p-toast-message-text {\n        flex: 1 1 auto;\n    }\n    \n    .p-toast-summary {\n        overflow-wrap: anywhere;\n    }\n    \n    .p-toast-detail {\n        overflow-wrap: anywhere;\n    }\n    \n    .p-toast-top-center {\n        transform: translateX(-50%);\n    }\n    \n    .p-toast-bottom-center {\n        transform: translateX(-50%);\n    }\n    \n    .p-toast-center {\n        min-width: 20vw;\n        transform: translate(-50%, -50%);\n    }\n    \n    .p-toast-icon-close {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        overflow: hidden;\n        position: relative;\n    }\n    \n    .p-toast-icon-close.p-link {\n        cursor: pointer;\n    }\n    \n    /* Animations */\n    .p-toast-message-enter {\n        opacity: 0;\n        transform: translateY(50%);\n    }\n    \n    .p-toast-message-enter-active {\n        opacity: 1;\n        transform: translateY(0);\n        transition: transform 0.3s, opacity 0.3s;\n    }\n    \n    .p-toast-message-enter-done {\n        transform: none;\n    }\n    \n    .p-toast-message-exit {\n        opacity: 1;\n        max-height: 1000px;\n    }\n    \n    .p-toast .p-toast-message.p-toast-message-exit-active {\n        opacity: 0;\n        max-height: 0;\n        margin-bottom: 0;\n        overflow: hidden;\n        transition: max-height 0.45s cubic-bezier(0, 1, 0, 1), opacity 0.3s, margin-bottom 0.3s;\n    }\n}\n";
  var classes = {
    root: function root(_ref) {
      var props = _ref.props,
        context = _ref.context;
      return utils.classNames('p-toast p-component p-toast-' + props.position, props.className, {
        'p-input-filled': context && context.inputStyle === 'filled' || PrimeReact__default["default"].inputStyle === 'filled',
        'p-ripple-disabled': context && context.ripple === false || PrimeReact__default["default"].ripple === false
      });
    },
    message: {
      message: function message(_ref2) {
        var severity = _ref2.severity;
        return utils.classNames('p-toast-message', _defineProperty({}, "p-toast-message-".concat(severity), severity));
      },
      content: 'p-toast-message-content',
      buttonicon: 'p-toast-icon-close-icon',
      closeButton: 'p-toast-icon-close p-link',
      icon: 'p-toast-message-icon',
      text: 'p-toast-message-text',
      summary: 'p-toast-summary',
      detail: 'p-toast-detail'
    },
    transition: 'p-toast-message'
  };
  var inlineStyles = {
    root: function root(_ref3) {
      var props = _ref3.props;
      return {
        position: 'fixed',
        top: props.position === 'top-right' || props.position === 'top-left' || props.position === 'top-center' ? '20px' : props.position === 'center' ? '50%' : null,
        right: (props.position === 'top-right' || props.position === 'bottom-right') && '20px',
        bottom: (props.position === 'bottom-left' || props.position === 'bottom-right' || props.position === 'bottom-center') && '20px',
        left: props.position === 'top-left' || props.position === 'bottom-left' ? '20px' : props.position === 'center' || props.position === 'top-center' || props.position === 'bottom-center' ? '50%' : null
      };
    }
  };
  var ToastBase = componentbase.ComponentBase.extend({
    defaultProps: {
      __TYPE: 'Toast',
      id: null,
      className: null,
      content: null,
      style: null,
      baseZIndex: 0,
      position: 'top-right',
      transitionOptions: null,
      appendTo: 'self',
      onClick: null,
      onRemove: null,
      onShow: null,
      onHide: null,
      onMouseEnter: null,
      onMouseLeave: null,
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
  var ToastMessage = /*#__PURE__*/React__namespace.memo(/*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
    var mergeProps = hooks.useMergeProps();
    var messageInfo = props.messageInfo,
      parentMetaData = props.metaData,
      _props$ptCallbacks = props.ptCallbacks,
      ptm = _props$ptCallbacks.ptm,
      ptmo = _props$ptCallbacks.ptmo,
      cx = _props$ptCallbacks.cx,
      index = props.index;
    var _messageInfo$message = messageInfo.message,
      severity = _messageInfo$message.severity,
      content = _messageInfo$message.content,
      summary = _messageInfo$message.summary,
      detail = _messageInfo$message.detail,
      closable = _messageInfo$message.closable,
      life = _messageInfo$message.life,
      sticky = _messageInfo$message.sticky,
      _className = _messageInfo$message.className,
      style = _messageInfo$message.style,
      _contentClassName = _messageInfo$message.contentClassName,
      contentStyle = _messageInfo$message.contentStyle,
      _icon = _messageInfo$message.icon,
      _closeIcon = _messageInfo$message.closeIcon,
      pt = _messageInfo$message.pt;
    var params = {
      index: index
    };
    var parentParams = _objectSpread(_objectSpread({}, parentMetaData), params);
    var _React$useState = React__namespace.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      focused = _React$useState2[0],
      setFocused = _React$useState2[1];
    var _useTimeout = hooks.useTimeout(function () {
        onClose();
      }, life || 3000, !sticky && !focused),
      _useTimeout2 = _slicedToArray(_useTimeout, 1),
      clearTimer = _useTimeout2[0];
    var getPTOptions = function getPTOptions(key, options) {
      return ptm(key, _objectSpread({
        hostName: props.hostName
      }, options));
    };
    var onClose = function onClose() {
      clearTimer();
      props.onClose && props.onClose(messageInfo);
    };
    var onClick = function onClick(event) {
      if (props.onClick && !(utils.DomHandler.hasClass(event.target, 'p-toast-icon-close') || utils.DomHandler.hasClass(event.target, 'p-toast-icon-close-icon'))) {
        props.onClick(messageInfo.message);
      }
    };
    var onMouseEnter = function onMouseEnter(event) {
      props.onMouseEnter && props.onMouseEnter(event);

      // do not continue if the user has canceled the event
      if (event.defaultPrevented) {
        return;
      }

      // stop timer while user has focused message
      if (!sticky) {
        clearTimer();
        setFocused(true);
      }
    };
    var onMouseLeave = function onMouseLeave(event) {
      props.onMouseLeave && props.onMouseLeave(event);

      // do not continue if the user has canceled the event
      if (event.defaultPrevented) {
        return;
      }

      // restart timer when user has left message
      if (!sticky) {
        setFocused(false);
      }
    };
    var createCloseIcon = function createCloseIcon() {
      var buttonIconProps = mergeProps({
        className: cx('message.buttonicon')
      }, getPTOptions('buttonicon', parentParams), ptmo(pt, 'buttonicon', _objectSpread(_objectSpread({}, params), {}, {
        hostName: props.hostName
      })));
      var icon = _closeIcon || /*#__PURE__*/React__namespace.createElement(times.TimesIcon, buttonIconProps);
      var closeIcon = utils.IconUtils.getJSXIcon(icon, _objectSpread({}, buttonIconProps), {
        props: props
      });
      var closeButtonProps = mergeProps({
        type: 'button',
        className: cx('message.closeButton'),
        onClick: onClose,
        'aria-label': props.ariaCloseLabel || PrimeReact.ariaLabel('close')
      }, getPTOptions('closeButton', parentParams), ptmo(pt, 'closeButton', _objectSpread(_objectSpread({}, params), {}, {
        hostName: props.hostName
      })));
      if (closable !== false) {
        return /*#__PURE__*/React__namespace.createElement("div", null, /*#__PURE__*/React__namespace.createElement("button", closeButtonProps, closeIcon, /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null)));
      }
      return null;
    };
    var createMessage = function createMessage() {
      if (messageInfo) {
        var contentEl = utils.ObjectUtils.getJSXElement(content, {
          message: messageInfo.message,
          onClick: onClick,
          onClose: onClose
        });
        var iconProps = mergeProps({
          className: cx('message.icon')
        }, getPTOptions('icon', parentParams), ptmo(pt, 'icon', _objectSpread(_objectSpread({}, params), {}, {
          hostName: props.hostName
        })));
        var icon = _icon;
        if (!_icon) {
          switch (severity) {
            case 'info':
              icon = /*#__PURE__*/React__namespace.createElement(infocircle.InfoCircleIcon, iconProps);
              break;
            case 'warn':
              icon = /*#__PURE__*/React__namespace.createElement(exclamationtriangle.ExclamationTriangleIcon, iconProps);
              break;
            case 'error':
              icon = /*#__PURE__*/React__namespace.createElement(timescircle.TimesCircleIcon, iconProps);
              break;
            case 'success':
              icon = /*#__PURE__*/React__namespace.createElement(check.CheckIcon, iconProps);
              break;
          }
        }
        var messageIcon = utils.IconUtils.getJSXIcon(icon, _objectSpread({}, iconProps), {
          props: props
        });
        var textProps = mergeProps({
          className: cx('message.text')
        }, getPTOptions('text', parentParams), ptmo(pt, 'text', _objectSpread(_objectSpread({}, params), {}, {
          hostName: props.hostName
        })));
        var summaryProps = mergeProps({
          className: cx('message.summary')
        }, getPTOptions('summary', parentParams), ptmo(pt, 'summary', _objectSpread(_objectSpread({}, params), {}, {
          hostName: props.hostName
        })));
        var detailProps = mergeProps({
          className: cx('message.detail')
        }, getPTOptions('detail', parentParams), ptmo(pt, 'detail', _objectSpread(_objectSpread({}, params), {}, {
          hostName: props.hostName
        })));
        return contentEl || /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, messageIcon, /*#__PURE__*/React__namespace.createElement("div", textProps, /*#__PURE__*/React__namespace.createElement("span", summaryProps, summary), detail && /*#__PURE__*/React__namespace.createElement("div", detailProps, detail)));
      }
      return null;
    };
    var message = createMessage();
    var closeIcon = createCloseIcon();
    var messageProps = mergeProps({
      ref: ref,
      className: utils.classNames(_className, cx('message.message', {
        severity: severity
      })),
      style: style,
      role: 'alert',
      'aria-live': 'assertive',
      'aria-atomic': 'true',
      onClick: onClick,
      onMouseEnter: onMouseEnter,
      onMouseLeave: onMouseLeave
    }, getPTOptions('message', parentParams), ptmo(pt, 'root', _objectSpread(_objectSpread({}, params), {}, {
      hostName: props.hostName
    })));
    var contentProps = mergeProps({
      className: utils.classNames(_contentClassName, cx('message.content')),
      style: contentStyle
    }, getPTOptions('content', parentParams), ptmo(pt, 'content', _objectSpread(_objectSpread({}, params), {}, {
      hostName: props.hostName
    })));
    return /*#__PURE__*/React__namespace.createElement("div", messageProps, /*#__PURE__*/React__namespace.createElement("div", contentProps, message, closeIcon));
  }));
  ToastMessage.displayName = 'ToastMessage';

  var messageIdx = 0;
  var Toast = /*#__PURE__*/React__namespace.memo(/*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
    var mergeProps = hooks.useMergeProps();
    var context = React__namespace.useContext(PrimeReact.PrimeReactContext);
    var props = ToastBase.getProps(inProps, context);
    var _React$useState = React__namespace.useState([]),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      messagesState = _React$useState2[0],
      setMessagesState = _React$useState2[1];
    var containerRef = React__namespace.useRef(null);
    var metaData = {
      props: props,
      state: {
        messages: messagesState
      }
    };
    var ptCallbacks = ToastBase.setMetaData(metaData);
    componentbase.useHandleStyle(ToastBase.css.styles, ptCallbacks.isUnstyled, {
      name: 'toast'
    });
    var show = function show(messageInfo) {
      if (messageInfo) {
        setMessagesState(function (prev) {
          return assignIdentifiers(prev, messageInfo, true);
        });
      }
    };
    var assignIdentifiers = function assignIdentifiers(currentState, messageInfo, copy) {
      var messages;
      if (Array.isArray(messageInfo)) {
        var multipleMessages = messageInfo.reduce(function (acc, message) {
          acc.push({
            _pId: messageIdx++,
            message: message
          });
          return acc;
        }, []);
        if (copy) {
          messages = currentState ? [].concat(_toConsumableArray(currentState), _toConsumableArray(multipleMessages)) : multipleMessages;
        } else {
          messages = multipleMessages;
        }
      } else {
        var message = {
          _pId: messageIdx++,
          message: messageInfo
        };
        if (copy) {
          messages = currentState ? [].concat(_toConsumableArray(currentState), [message]) : [message];
        } else {
          messages = [message];
        }
      }
      return messages;
    };
    var clear = function clear() {
      utils.ZIndexUtils.clear(containerRef.current);
      setMessagesState([]);
    };
    var replace = function replace(messageInfo) {
      setMessagesState(function (previousMessagesState) {
        return assignIdentifiers(previousMessagesState, messageInfo, false);
      });
    };
    var remove = function remove(messageInfo) {
      // allow removal by ID or by message equality
      var removeMessage = utils.ObjectUtils.isNotEmpty(messageInfo._pId) ? messageInfo._pId : messageInfo.message || messageInfo;
      setMessagesState(function (prev) {
        return prev.filter(function (msg) {
          return msg._pId !== messageInfo._pId && !utils.ObjectUtils.deepEquals(msg.message, removeMessage);
        });
      });
      props.onRemove && props.onRemove(messageInfo.message || removeMessage);
    };
    var onClose = function onClose(messageInfo) {
      remove(messageInfo);
    };
    var onEntered = function onEntered() {
      props.onShow && props.onShow();
    };
    var onExited = function onExited() {
      messagesState.length === 1 && utils.ZIndexUtils.clear(containerRef.current);
      props.onHide && props.onHide();
    };
    hooks.useUpdateEffect(function () {
      utils.ZIndexUtils.set('toast', containerRef.current, context && context.autoZIndex || PrimeReact__default["default"].autoZIndex, props.baseZIndex || context && context.zIndex.toast || PrimeReact__default["default"].zIndex.toast);
    }, [messagesState, props.baseZIndex]);
    hooks.useUnmountEffect(function () {
      utils.ZIndexUtils.clear(containerRef.current);
    });
    React__namespace.useImperativeHandle(ref, function () {
      return {
        props: props,
        show: show,
        replace: replace,
        remove: remove,
        clear: clear,
        getElement: function getElement() {
          return containerRef.current;
        }
      };
    });
    var createElement = function createElement() {
      var rootProps = mergeProps({
        ref: containerRef,
        id: props.id,
        className: ptCallbacks.cx('root', {
          context: context
        }),
        style: ptCallbacks.sx('root')
      }, ToastBase.getOtherProps(props), ptCallbacks.ptm('root'));
      var transitionProps = mergeProps({
        classNames: ptCallbacks.cx('transition'),
        timeout: {
          enter: 300,
          exit: 300
        },
        options: props.transitionOptions,
        unmountOnExit: true,
        onEntered: onEntered,
        onExited: onExited
      }, ptCallbacks.ptm('transition'));
      return /*#__PURE__*/React__namespace.createElement("div", rootProps, /*#__PURE__*/React__namespace.createElement(reactTransitionGroup.TransitionGroup, null, messagesState && messagesState.map(function (messageInfo, index) {
        var messageRef = /*#__PURE__*/React__namespace.createRef();
        return /*#__PURE__*/React__namespace.createElement(csstransition.CSSTransition, _extends({
          nodeRef: messageRef,
          key: messageInfo._pId
        }, transitionProps), inProps.content ? utils.ObjectUtils.getJSXElement(inProps.content, {
          message: messageInfo.message
        }) : /*#__PURE__*/React__namespace.createElement(ToastMessage, {
          hostName: "Toast",
          ref: messageRef,
          messageInfo: messageInfo,
          index: index,
          onClick: props.onClick,
          onClose: onClose,
          onMouseEnter: props.onMouseEnter,
          onMouseLeave: props.onMouseLeave,
          closeIcon: props.closeIcon,
          ptCallbacks: ptCallbacks,
          metaData: metaData
        }));
      })));
    };
    var element = createElement();
    return /*#__PURE__*/React__namespace.createElement(portal.Portal, {
      element: element,
      appendTo: props.appendTo
    });
  }));
  Toast.displayName = 'Toast';

  exports.Toast = Toast;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, ReactTransitionGroup, primereact.api, primereact.componentbase, primereact.csstransition, primereact.hooks, primereact.portal, primereact.utils, primereact.icons.check, primereact.icons.exclamationtriangle, primereact.icons.infocircle, primereact.icons.times, primereact.icons.timescircle, primereact.ripple);
