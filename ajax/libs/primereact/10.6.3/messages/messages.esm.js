'use client';
import * as React from 'react';
import { TransitionGroup } from 'react-transition-group';
import { localeOption, PrimeReactContext } from 'primereact/api';
import { ComponentBase, useHandleStyle } from 'primereact/componentbase';
import { CSSTransition } from 'primereact/csstransition';
import { useMergeProps, useTimeout } from 'primereact/hooks';
import { classNames, IconUtils, ObjectUtils } from 'primereact/utils';
import { CheckIcon } from 'primereact/icons/check';
import { ExclamationTriangleIcon } from 'primereact/icons/exclamationtriangle';
import { InfoCircleIcon } from 'primereact/icons/infocircle';
import { TimesIcon } from 'primereact/icons/times';
import { TimesCircleIcon } from 'primereact/icons/timescircle';
import { Ripple } from 'primereact/ripple';

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

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
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

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

var styles = "\n@layer primereact {\n    .p-message-wrapper {\n        display: flex;\n        align-items: center;\n    }\n\n    .p-message-icon {\n        flex-shrink: 0;\n    }\n    \n    .p-message-close {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n    }\n    \n    .p-message-close.p-link {\n        margin-left: auto;\n        overflow: hidden;\n        position: relative;\n    }\n    \n    .p-message-enter {\n        opacity: 0;\n    }\n    \n    .p-message-enter-active {\n        opacity: 1;\n        transition: opacity .3s;\n    }\n    \n    .p-message-exit {\n        opacity: 1;\n        max-height: 1000px;\n    }\n    \n    .p-message-exit-active {\n        opacity: 0;\n        max-height: 0;\n        margin: 0;\n        overflow: hidden;\n        transition: max-height .3s cubic-bezier(0, 1, 0, 1), opacity .3s, margin .3s;\n    }\n    \n    .p-message-exit-active .p-message-close {\n        display: none;\n    }\n}\n";
var classes = {
  uimessage: {
    root: function root(_ref) {
      var severity = _ref.severity;
      return classNames('p-message p-component', _defineProperty({}, "p-message-".concat(severity), severity));
    },
    wrapper: 'p-message-wrapper',
    detail: 'p-message-detail',
    summary: 'p-message-summary',
    icon: 'p-message-icon',
    buttonicon: 'p-message-close-icon',
    button: 'p-message-close p-link',
    transition: 'p-message'
  }
};
var MessagesBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'Messages',
    __parentMetadata: null,
    id: null,
    className: null,
    style: null,
    transitionOptions: null,
    onRemove: null,
    onClick: null,
    children: undefined
  },
  css: {
    classes: classes,
    styles: styles
  }
});

function ownKeys$1(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$1(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$1(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var UIMessage = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (props, ref) {
  var mergeProps = useMergeProps();
  var messageInfo = props.message,
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
  var parentParams = _objectSpread$1(_objectSpread$1({}, parentMetaData), params);
  var _useTimeout = useTimeout(function () {
      onClose(null);
    }, life || 3000, !sticky),
    _useTimeout2 = _slicedToArray(_useTimeout, 1),
    clearTimer = _useTimeout2[0];
  var getPTOptions = function getPTOptions(key, options) {
    return ptm(key, _objectSpread$1({
      hostName: props.hostName
    }, options));
  };
  var onClose = function onClose(event) {
    clearTimer();
    props.onClose && props.onClose(props.message);
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
  };
  var onClick = function onClick() {
    props.onClick && props.onClick(props.message);
  };
  var createCloseIcon = function createCloseIcon() {
    if (closable !== false) {
      var ariaLabel = localeOption('close');
      var buttonIconProps = mergeProps({
        className: cx('uimessage.buttonicon')
      }, getPTOptions('buttonicon', parentParams), ptmo(pt, 'buttonicon', _objectSpread$1(_objectSpread$1({}, params), {}, {
        hostName: props.hostName
      })));
      var icon = _closeIcon || /*#__PURE__*/React.createElement(TimesIcon, buttonIconProps);
      var _closeIcon2 = IconUtils.getJSXIcon(icon, _objectSpread$1({}, buttonIconProps), {
        props: props
      });
      var buttonProps = mergeProps({
        type: 'button',
        className: cx('uimessage.button'),
        'aria-label': ariaLabel,
        onClick: onClose
      }, getPTOptions('button', parentParams), ptmo(pt, 'button', _objectSpread$1(_objectSpread$1({}, params), {}, {
        hostName: props.hostName
      })));
      return /*#__PURE__*/React.createElement("button", buttonProps, _closeIcon2, /*#__PURE__*/React.createElement(Ripple, null));
    }
    return null;
  };
  var createMessage = function createMessage() {
    if (props.message) {
      var iconProps = mergeProps({
        className: cx('uimessage.icon')
      }, getPTOptions('icon', parentParams), ptmo(pt, 'icon', _objectSpread$1(_objectSpread$1({}, params), {}, {
        hostName: props.hostName
      })));
      var icon = _icon;
      if (!_icon) {
        switch (severity) {
          case 'info':
            icon = /*#__PURE__*/React.createElement(InfoCircleIcon, iconProps);
            break;
          case 'warn':
            icon = /*#__PURE__*/React.createElement(ExclamationTriangleIcon, iconProps);
            break;
          case 'error':
            icon = /*#__PURE__*/React.createElement(TimesCircleIcon, iconProps);
            break;
          case 'success':
            icon = /*#__PURE__*/React.createElement(CheckIcon, iconProps);
            break;
        }
      }
      var iconContent = IconUtils.getJSXIcon(icon, _objectSpread$1({}, iconProps), {
        props: props
      });
      var summaryProps = mergeProps({
        className: cx('uimessage.summary')
      }, getPTOptions('summary', parentParams), ptmo(pt, 'summary', _objectSpread$1(_objectSpread$1({}, params), {}, {
        hostName: props.hostName
      })));
      var detailProps = mergeProps({
        className: cx('uimessage.detail')
      }, getPTOptions('detail', parentParams), ptmo(pt, 'detail', _objectSpread$1(_objectSpread$1({}, params), {}, {
        hostName: props.hostName
      })));
      return content || /*#__PURE__*/React.createElement(React.Fragment, null, iconContent, /*#__PURE__*/React.createElement("span", summaryProps, summary), /*#__PURE__*/React.createElement("span", detailProps, detail));
    }
    return null;
  };
  var closeIcon = createCloseIcon();
  var message = createMessage();
  var wrapperProps = mergeProps({
    className: classNames(_contentClassName, cx('uimessage.wrapper')),
    style: contentStyle
  }, getPTOptions('wrapper', parentParams), ptmo(pt, 'wrapper', _objectSpread$1(_objectSpread$1({}, params), {}, {
    hostName: props.hostName
  })));
  var rootProps = mergeProps({
    ref: ref,
    className: classNames(_className, cx('uimessage.root', {
      severity: severity
    })),
    style: style,
    role: 'alert',
    'aria-live': 'assertive',
    'aria-atomic': 'true',
    onClick: onClick
  }, getPTOptions('root', parentParams), ptmo(pt, 'root', _objectSpread$1(_objectSpread$1({}, params), {}, {
    hostName: props.hostName
  })));
  return /*#__PURE__*/React.createElement("div", rootProps, /*#__PURE__*/React.createElement("div", wrapperProps, message, closeIcon));
}));
UIMessage.displayName = 'UIMessage';

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var messageIdx = 0;
var Messages = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var mergeProps = useMergeProps();
  var context = React.useContext(PrimeReactContext);
  var props = MessagesBase.getProps(inProps, context);
  var _React$useState = React.useState([]),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    messagesState = _React$useState2[0],
    setMessagesState = _React$useState2[1];
  var elementRef = React.useRef(null);
  var metaData = _objectSpread(_objectSpread({
    props: props
  }, props.__parentMetadata), {}, {
    state: {
      messages: messagesState
    }
  });
  var ptCallbacks = MessagesBase.setMetaData(metaData);
  useHandleStyle(MessagesBase.css.styles, ptCallbacks.isUnstyled, {
    name: 'messages'
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
    setMessagesState([]);
  };
  var replace = function replace(messageInfo) {
    setMessagesState(function (prev) {
      return assignIdentifiers(prev, messageInfo, false);
    });
  };
  var remove = function remove(messageInfo) {
    // allow removal by ID or by message equality
    var removeMessage = messageInfo._pId ? messageInfo.message : messageInfo;
    setMessagesState(function (prev) {
      return prev.filter(function (msg) {
        return msg._pId !== messageInfo._pId && !ObjectUtils.deepEquals(msg.message, removeMessage);
      });
    });
    props.onRemove && props.onRemove(removeMessage.message || removeMessage);
  };
  var onClose = function onClose(messageInfo) {
    remove(messageInfo);
  };
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      show: show,
      replace: replace,
      remove: remove,
      clear: clear,
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  });
  var rootProps = mergeProps({
    id: props.id,
    className: props.className,
    style: props.style
  }, MessagesBase.getOtherProps(props), ptCallbacks.ptm('root'));
  var transitionProps = mergeProps({
    classNames: ptCallbacks.cx('uimessage.transition'),
    unmountOnExit: true,
    timeout: {
      enter: 300,
      exit: 300
    },
    options: props.transitionOptions
  }, ptCallbacks.ptm('transition'));
  return /*#__PURE__*/React.createElement("div", _extends({
    ref: elementRef
  }, rootProps), /*#__PURE__*/React.createElement(TransitionGroup, null, messagesState && messagesState.map(function (message, index) {
    var messageRef = /*#__PURE__*/React.createRef();
    return /*#__PURE__*/React.createElement(CSSTransition, _extends({
      nodeRef: messageRef,
      key: message._pId
    }, transitionProps), /*#__PURE__*/React.createElement(UIMessage, {
      hostName: "Messages",
      ref: messageRef,
      message: message,
      onClick: props.onClick,
      onClose: onClose,
      ptCallbacks: ptCallbacks,
      metaData: metaData,
      index: index
    }));
  })));
}));
Messages.displayName = 'Messages';

export { Messages };
