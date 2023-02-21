import * as React from 'react';
import { TransitionGroup } from 'react-transition-group';
import PrimeReact$1 from 'primereact/api';
import { CSSTransition } from 'primereact/csstransition';
import { useTimeout, useUpdateEffect, useUnmountEffect } from 'primereact/hooks';
import { Portal } from 'primereact/portal';
import { ObjectUtils, classNames, DomHandler, ZIndexUtils } from 'primereact/utils';
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

var ToastBase = {
  defaultProps: {
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
    onHide: null,
    onMouseEnter: null,
    onMouseLeave: null,
    children: undefined
  },
  getProps: function getProps(props) {
    return ObjectUtils.getMergedProps(props, ToastBase.defaultProps);
  },
  getOtherProps: function getOtherProps(props) {
    return ObjectUtils.getDiffProps(props, ToastBase.defaultProps);
  }
};

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

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var FilterMatchMode = Object.freeze({
  STARTS_WITH: 'startsWith',
  CONTAINS: 'contains',
  NOT_CONTAINS: 'notContains',
  ENDS_WITH: 'endsWith',
  EQUALS: 'equals',
  NOT_EQUALS: 'notEquals',
  IN: 'in',
  LESS_THAN: 'lt',
  LESS_THAN_OR_EQUAL_TO: 'lte',
  GREATER_THAN: 'gt',
  GREATER_THAN_OR_EQUAL_TO: 'gte',
  BETWEEN: 'between',
  DATE_IS: 'dateIs',
  DATE_IS_NOT: 'dateIsNot',
  DATE_BEFORE: 'dateBefore',
  DATE_AFTER: 'dateAfter',
  CUSTOM: 'custom'
});

var PrimeReact = /*#__PURE__*/_createClass(function PrimeReact() {
  _classCallCheck(this, PrimeReact);
});
_defineProperty(PrimeReact, "ripple", false);
_defineProperty(PrimeReact, "inputStyle", 'outlined');
_defineProperty(PrimeReact, "locale", 'en');
_defineProperty(PrimeReact, "appendTo", null);
_defineProperty(PrimeReact, "cssTransition", true);
_defineProperty(PrimeReact, "autoZIndex", true);
_defineProperty(PrimeReact, "nonce", null);
_defineProperty(PrimeReact, "nullSortOrder", 1);
_defineProperty(PrimeReact, "zIndex", {
  modal: 1100,
  overlay: 1000,
  menu: 1000,
  tooltip: 1100,
  toast: 1200
});
_defineProperty(PrimeReact, "filterMatchModeOptions", {
  text: [FilterMatchMode.STARTS_WITH, FilterMatchMode.CONTAINS, FilterMatchMode.NOT_CONTAINS, FilterMatchMode.ENDS_WITH, FilterMatchMode.EQUALS, FilterMatchMode.NOT_EQUALS],
  numeric: [FilterMatchMode.EQUALS, FilterMatchMode.NOT_EQUALS, FilterMatchMode.LESS_THAN, FilterMatchMode.LESS_THAN_OR_EQUAL_TO, FilterMatchMode.GREATER_THAN, FilterMatchMode.GREATER_THAN_OR_EQUAL_TO],
  date: [FilterMatchMode.DATE_IS, FilterMatchMode.DATE_IS_NOT, FilterMatchMode.DATE_BEFORE, FilterMatchMode.DATE_AFTER]
});

var locales = {
  en: {
    startsWith: 'Starts with',
    contains: 'Contains',
    notContains: 'Not contains',
    endsWith: 'Ends with',
    equals: 'Equals',
    notEquals: 'Not equals',
    noFilter: 'No Filter',
    filter: 'Filter',
    lt: 'Less than',
    lte: 'Less than or equal to',
    gt: 'Greater than',
    gte: 'Greater than or equal to',
    dateIs: 'Date is',
    dateIsNot: 'Date is not',
    dateBefore: 'Date is before',
    dateAfter: 'Date is after',
    custom: 'Custom',
    clear: 'Clear',
    close: 'Close',
    apply: 'Apply',
    matchAll: 'Match All',
    matchAny: 'Match Any',
    addRule: 'Add Rule',
    removeRule: 'Remove Rule',
    accept: 'Yes',
    reject: 'No',
    choose: 'Choose',
    upload: 'Upload',
    cancel: 'Cancel',
    dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    today: 'Today',
    weekHeader: 'Wk',
    firstDayOfWeek: 0,
    dateFormat: 'mm/dd/yy',
    weak: 'Weak',
    medium: 'Medium',
    strong: 'Strong',
    passwordPrompt: 'Enter a password',
    emptyFilterMessage: 'No available options',
    emptyMessage: 'No results found',
    aria: {
      trueLabel: 'True',
      falseLabel: 'False',
      nullLabel: 'Not Selected',
      pageLabel: 'Page',
      firstPageLabel: 'First Page',
      lastPageLabel: 'Last Page',
      nextPageLabel: 'Next Page',
      previousPageLabel: 'Previous Page',
      selectLabel: 'Select',
      unselectLabel: 'Unselect',
      expandLabel: 'Expand',
      collapseLabel: 'Collapse'
    }
  }
};
function localeOption(key, locale) {
  var _locale = locale || PrimeReact.locale;
  try {
    return localeOptions(_locale)[key];
  } catch (error) {
    throw new Error("The ".concat(key, " option is not found in the current locale('").concat(_locale, "')."));
  }
}
function localeOptions(locale) {
  var _locale = locale || PrimeReact.locale;
  return locales[_locale];
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
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    focused = _React$useState2[0],
    setFocused = _React$useState2[1];
  var _useTimeout = useTimeout(function () {
      onClose();
    }, life || 3000, !sticky && !focused),
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
    if (closable !== false) {
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
        type: "button",
        className: "p-toast-icon-close p-link",
        onClick: onClose,
        "aria-label": localeOption('close')
      }, /*#__PURE__*/React.createElement("span", {
        className: "p-toast-icon-close-icon pi pi-times",
        "aria-hidden": "true"
      }), /*#__PURE__*/React.createElement(Ripple, null)));
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
    onClick: onClick,
    onMouseEnter: onMouseEnter,
    onMouseLeave: onMouseLeave
  }, /*#__PURE__*/React.createElement("div", {
    className: contentClassName,
    style: contentStyle
  }, message, closeIcon));
}));
ToastMessage.displayName = 'ToastMessage';

var messageIdx = 0;
var Toast = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var props = ToastBase.getProps(inProps);
  var _React$useState = React.useState([]),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    messagesState = _React$useState2[0],
    setMessagesState = _React$useState2[1];
  var containerRef = React.useRef(null);
  var show = function show(messageInfo) {
    if (messageInfo) {
      var messages = assignIdentifiers(messageInfo, true);
      setMessagesState(messages);
    }
  };
  var assignIdentifiers = function assignIdentifiers(messageInfo, copy) {
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
        messages = messagesState ? [].concat(_toConsumableArray(messagesState), _toConsumableArray(multipleMessages)) : multipleMessages;
      } else {
        messages = multipleMessages;
      }
    } else {
      var message = {
        _pId: messageIdx++,
        message: messageInfo
      };
      if (copy) {
        messages = messagesState ? [].concat(_toConsumableArray(messagesState), [message]) : [message];
      } else {
        messages = [message];
      }
    }
    return messages;
  };
  var clear = function clear() {
    ZIndexUtils.clear(containerRef.current);
    setMessagesState([]);
  };
  var replace = function replace(messageInfo) {
    var replaced = assignIdentifiers(messageInfo, false);
    setMessagesState(replaced);
  };
  var remove = function remove(messageInfo) {
    var messages = messagesState.filter(function (msg) {
      return msg._pId !== messageInfo._pId;
    });
    setMessagesState(messages);
    props.onRemove && props.onRemove(messageInfo.message);
  };
  var onClose = function onClose(messageInfo) {
    remove(messageInfo);
  };
  var onEntered = function onEntered() {
    props.onShow && props.onShow();
  };
  var onExited = function onExited() {
    messagesState.length === 1 && ZIndexUtils.clear(containerRef.current);
    props.onHide && props.onHide();
  };
  useUpdateEffect(function () {
    ZIndexUtils.set('toast', containerRef.current, PrimeReact$1.autoZIndex, props.baseZIndex || PrimeReact$1.zIndex['toast']);
  }, [messagesState, props.baseZIndex]);
  useUnmountEffect(function () {
    ZIndexUtils.clear(containerRef.current);
  });
  React.useImperativeHandle(ref, function () {
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
    var otherProps = ToastBase.getOtherProps(props);
    var className = classNames('p-toast p-component p-toast-' + props.position, props.className, {
      'p-input-filled': PrimeReact$1.inputStyle === 'filled',
      'p-ripple-disabled': PrimeReact$1.ripple === false
    });
    return /*#__PURE__*/React.createElement("div", _extends({
      ref: containerRef,
      id: props.id,
      className: className,
      style: props.style
    }, otherProps), /*#__PURE__*/React.createElement(TransitionGroup, null, messagesState && messagesState.map(function (messageInfo) {
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
        onClose: onClose,
        onMouseEnter: props.onMouseEnter,
        onMouseLeave: props.onMouseLeave
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

export { Toast };
