import * as React from 'react';
import { TransitionGroup } from 'react-transition-group';
import { CSSTransition } from 'primereact/csstransition';
import { ComponentBase } from 'primereact/componentbase';
import { localeOption, PrimeReactContext } from 'primereact/api';
import { useTimeout } from 'primereact/hooks';
import { CheckIcon } from 'primereact/icons/check';
import { ExclamationTriangleIcon } from 'primereact/icons/exclamationtriangle';
import { InfoCircleIcon } from 'primereact/icons/infocircle';
import { TimesIcon } from 'primereact/icons/times';
import { TimesCircleIcon } from 'primereact/icons/timescircle';
import { Ripple } from 'primereact/ripple';
import { classNames, mergeProps, IconUtils } from 'primereact/utils';

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

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

var MessagesBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'Messages',
    id: null,
    className: null,
    style: null,
    transitionOptions: null,
    onRemove: null,
    onClick: null,
    children: undefined
  }
});

function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var UIMessage = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (props, ref) {
  var messageInfo = props.message,
    parentMetaData = props.metaData,
    _props$ptCallbacks = props.ptCallbacks,
    ptm = _props$ptCallbacks.ptm,
    ptmo = _props$ptCallbacks.ptmo,
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
  var _useTimeout = useTimeout(function () {
      onClose(null);
    }, life || 3000, !sticky),
    _useTimeout2 = _slicedToArray(_useTimeout, 1),
    clearTimer = _useTimeout2[0];
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
      var iconProps = {
        className: 'p-message-close-icon',
        'aria-hidden': true
      };
      var buttonIconProps = mergeProps({
        className: iconProps
      }, ptm('buttonicon', parentParams), ptmo(pt, 'buttonicon', params));
      var icon = _closeIcon || /*#__PURE__*/React.createElement(TimesIcon, buttonIconProps);
      var _closeIcon2 = IconUtils.getJSXIcon(icon, _objectSpread({}, buttonIconProps), {
        props: props
      });
      var buttonProps = mergeProps({
        type: 'button',
        className: 'p-message-close p-link',
        'aria-label': ariaLabel,
        onClick: onClose
      }, ptm('button', parentParams), ptmo(pt, 'button', params));
      return /*#__PURE__*/React.createElement("button", buttonProps, _closeIcon2, /*#__PURE__*/React.createElement(Ripple, null));
    }
    return null;
  };
  var createMessage = function createMessage() {
    if (props.message) {
      var iconClassName = 'p-message-icon';
      var iconProps = mergeProps({
        className: iconClassName
      }, ptm('icon', parentParams), ptmo(pt, 'icon', params));
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
      var iconContent = IconUtils.getJSXIcon(icon, _objectSpread({}, iconProps), {
        props: props
      });
      var summaryProps = mergeProps({
        className: 'p-message-summary'
      }, ptm('summary', parentParams), ptmo(pt, 'summary', params));
      var detailProps = mergeProps({
        className: 'p-message-detail'
      }, ptm('detail', parentParams), ptmo(pt, 'detail', params));
      return content || /*#__PURE__*/React.createElement(React.Fragment, null, iconContent, /*#__PURE__*/React.createElement("span", summaryProps, summary), /*#__PURE__*/React.createElement("span", detailProps, detail));
    }
    return null;
  };
  var className = classNames('p-message p-component', _defineProperty({}, "p-message-".concat(severity), severity), _className);
  var contentClassName = classNames('p-message-wrapper', _contentClassName);
  var closeIcon = createCloseIcon();
  var message = createMessage();
  var wrapperProps = mergeProps({
    className: contentClassName,
    style: contentStyle
  }, ptm('wrapper', parentParams), ptmo(pt, 'wrapper', params));
  var rootProps = mergeProps({
    ref: ref,
    className: className,
    style: style,
    onClick: onClick
  }, ptm('root', parentParams), ptmo(pt, 'root', params));
  return /*#__PURE__*/React.createElement("div", rootProps, /*#__PURE__*/React.createElement("div", wrapperProps, message, closeIcon));
}));
UIMessage.displayName = 'UIMessage';

var messageIdx = 0;
var Messages = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var context = React.useContext(PrimeReactContext);
  var props = MessagesBase.getProps(inProps, context);
  var _React$useState = React.useState([]),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    messagesState = _React$useState2[0],
    setMessagesState = _React$useState2[1];
  var elementRef = React.useRef(null);
  var metaData = {
    props: props,
    state: {
      messages: messagesState
    }
  };
  var ptCallbacks = MessagesBase.setMetaData(metaData);
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
    setMessagesState(function (prev) {
      return prev.filter(function (msg) {
        return msg._pId !== messageInfo._pId;
      });
    });
    props.onRemove && props.onRemove(messageInfo.message);
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
    ref: elementRef,
    className: props.className,
    style: props.style
  }, MessagesBase.getOtherProps(props), ptCallbacks.ptm('root'));
  return /*#__PURE__*/React.createElement("div", rootProps, /*#__PURE__*/React.createElement(TransitionGroup, null, messagesState && messagesState.map(function (message, index) {
    var messageRef = /*#__PURE__*/React.createRef();
    return /*#__PURE__*/React.createElement(CSSTransition, {
      nodeRef: messageRef,
      key: message._pId,
      classNames: "p-message",
      unmountOnExit: true,
      timeout: {
        enter: 300,
        exit: 300
      },
      options: props.transitionOptions
    }, /*#__PURE__*/React.createElement(UIMessage, {
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
