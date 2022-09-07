import * as React from 'react';
import { TransitionGroup } from 'react-transition-group';
import PrimeReact from 'primereact/api';
import { CSSTransition } from 'primereact/csstransition';
import { useTimeout, useUnmountEffect } from 'primereact/hooks';
import { Portal } from 'primereact/portal';
import { classNames, DomHandler, ObjectUtils, ZIndexUtils } from 'primereact/utils';
import { Ripple } from 'primereact/ripple';

function _extends() {
  _extends = Object.assign || function (target) {
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

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

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

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _defineProperty(obj, key, value) {
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

var ToastMessage = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (props, ref) {
  var messageInfo = props.messageInfo;
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
      contentStyle = _messageInfo$message.contentStyle;

  var _useTimeout = useTimeout(function () {
    onClose();
  }, life || 3000, !sticky),
      _useTimeout2 = _slicedToArray(_useTimeout, 1),
      clearTimer = _useTimeout2[0];

  var onClose = function onClose() {
    clearTimer();
    props.onClose && props.onClose(messageInfo);
  };

  var onClick = function onClick(event) {
    if (props.onClick && !(DomHandler.hasClass(event.target, 'p-toast-icon-close') || DomHandler.hasClass(event.target, 'p-toast-icon-close-icon'))) {
      props.onClick(messageInfo.message);
    }
  };

  var createCloseIcon = function createCloseIcon() {
    if (closable !== false) {
      return /*#__PURE__*/React.createElement("button", {
        type: "button",
        className: "p-toast-icon-close p-link",
        onClick: onClose
      }, /*#__PURE__*/React.createElement("span", {
        className: "p-toast-icon-close-icon pi pi-times"
      }), /*#__PURE__*/React.createElement(Ripple, null));
    }

    return null;
  };

  var createMessage = function createMessage() {
    if (messageInfo) {
      var contentEl = ObjectUtils.getJSXElement(content, {
        message: messageInfo.message,
        onClick: onClick,
        onClose: onClose
      });
      var iconClassName = classNames('p-toast-message-icon pi', {
        'pi-info-circle': severity === 'info',
        'pi-exclamation-triangle': severity === 'warn',
        'pi-times': severity === 'error',
        'pi-check': severity === 'success'
      });
      return contentEl || /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
        className: iconClassName
      }), /*#__PURE__*/React.createElement("div", {
        className: "p-toast-message-text"
      }, /*#__PURE__*/React.createElement("span", {
        className: "p-toast-summary"
      }, summary), detail && /*#__PURE__*/React.createElement("div", {
        className: "p-toast-detail"
      }, detail)));
    }

    return null;
  };

  var className = classNames('p-toast-message', _defineProperty({}, "p-toast-message-".concat(severity), severity), _className);
  var contentClassName = classNames('p-toast-message-content', _contentClassName);
  var message = createMessage();
  var closeIcon = createCloseIcon();
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    className: className,
    style: style,
    role: "alert",
    "aria-live": "assertive",
    "aria-atomic": "true",
    onClick: onClick
  }, /*#__PURE__*/React.createElement("div", {
    className: contentClassName,
    style: contentStyle
  }, message, closeIcon));
}));
ToastMessage.displayName = 'ToastMessage';

var messageIdx = 0;
var Toast = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _React$useState = React.useState([]),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      messagesState = _React$useState2[0],
      setMessagesState = _React$useState2[1];

  var containerRef = React.useRef(null);

  var show = function show(value) {
    if (value) {
      var messages;

      if (Array.isArray(value)) {
        var multipleMessages = value.reduce(function (acc, message) {
          acc.push({
            _pId: messageIdx++,
            message: message
          });
          return acc;
        }, []);
        messages = messagesState ? [].concat(_toConsumableArray(messagesState), _toConsumableArray(multipleMessages)) : multipleMessages;
      } else {
        var message = {
          _pId: messageIdx++,
          message: value
        };
        messages = messagesState ? [].concat(_toConsumableArray(messagesState), [message]) : [message];
      }

      messagesState.length === 0 && ZIndexUtils.set('toast', containerRef.current, PrimeReact.autoZIndex, props.baseZIndex || PrimeReact.zIndex['toast']);
      setMessagesState(messages);
    }
  };

  var clear = function clear() {
    ZIndexUtils.clear(containerRef.current);
    setMessagesState([]);
  };

  var replace = function replace(value) {
    var replaced = Array.isArray(value) ? value : [value];
    setMessagesState(replaced);
  };

  var onClose = function onClose(messageInfo) {
    var messages = messagesState.filter(function (msg) {
      return msg._pId !== messageInfo._pId;
    });
    setMessagesState(messages);
    props.onRemove && props.onRemove(messageInfo.message);
  };

  var onEntered = function onEntered() {
    props.onShow && props.onShow();
  };

  var onExited = function onExited() {
    messagesState.length === 1 && ZIndexUtils.clear(containerRef.current);
    props.onHide && props.onHide();
  };

  useUnmountEffect(function () {
    ZIndexUtils.clear(containerRef.current);
  });
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      show: show,
      replace: replace,
      clear: clear,
      getElement: function getElement() {
        return containerRef.current;
      }
    };
  });

  var createElement = function createElement() {
    var otherProps = ObjectUtils.findDiffKeys(props, Toast.defaultProps);
    var className = classNames('p-toast p-component p-toast-' + props.position, props.className);
    return /*#__PURE__*/React.createElement("div", _extends({
      ref: containerRef,
      id: props.id,
      className: className,
      style: props.style
    }, otherProps), /*#__PURE__*/React.createElement(TransitionGroup, null, messagesState.map(function (messageInfo) {
      var messageRef = /*#__PURE__*/React.createRef();
      return /*#__PURE__*/React.createElement(CSSTransition, {
        nodeRef: messageRef,
        key: messageInfo._pId,
        classNames: "p-toast-message",
        unmountOnExit: true,
        timeout: {
          enter: 300,
          exit: 300
        },
        onEntered: onEntered,
        onExited: onExited,
        options: props.transitionOptions
      }, /*#__PURE__*/React.createElement(ToastMessage, {
        ref: messageRef,
        messageInfo: messageInfo,
        onClick: props.onClick,
        onClose: onClose
      }));
    })));
  };

  var element = createElement();
  return /*#__PURE__*/React.createElement(Portal, {
    element: element,
    appendTo: props.appendTo
  });
}));
Toast.displayName = 'Toast';
Toast.defaultProps = {
  __TYPE: 'Toast',
  id: null,
  className: null,
  style: null,
  baseZIndex: 0,
  position: 'top-right',
  transitionOptions: null,
  appendTo: 'self',
  onClick: null,
  onRemove: null,
  onShow: null,
  onHide: null
};

export { Toast };
