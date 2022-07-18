this.primereact = this.primereact || {};
this.primereact.toast = (function (exports, React, reactTransitionGroup, PrimeReact, csstransition, hooks, portal, utils, ripple) {
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

  function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
  var ToastMessage = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
    var _props$message = props.message,
        severity = _props$message.severity,
        content = _props$message.content,
        summary = _props$message.summary,
        detail = _props$message.detail,
        closable = _props$message.closable,
        life = _props$message.life,
        sticky = _props$message.sticky,
        _className = _props$message.className,
        style = _props$message.style,
        _contentClassName = _props$message.contentClassName,
        contentStyle = _props$message.contentStyle;

    var _useTimeout = hooks.useTimeout(function () {
      onClose();
    }, life || 3000, !sticky),
        _useTimeout2 = _slicedToArray(_useTimeout, 1),
        clearTimer = _useTimeout2[0];

    var onClose = function onClose() {
      clearTimer();
      props.onClose && props.onClose(props.message);
    };

    var onClick = function onClick(event) {
      if (props.onClick && !(utils.DomHandler.hasClass(event.target, 'p-toast-icon-close') || utils.DomHandler.hasClass(event.target, 'p-toast-icon-close-icon'))) {
        props.onClick(props.message);
      }
    };

    var createCloseIcon = function createCloseIcon() {
      if (closable !== false) {
        return /*#__PURE__*/React__namespace.createElement("button", {
          type: "button",
          className: "p-toast-icon-close p-link",
          onClick: onClose
        }, /*#__PURE__*/React__namespace.createElement("span", {
          className: "p-toast-icon-close-icon pi pi-times"
        }), /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null));
      }

      return null;
    };

    var createMessage = function createMessage() {
      if (props.message) {
        var contentEl = utils.ObjectUtils.getJSXElement(content, _objectSpread$1(_objectSpread$1({}, props), {}, {
          onClose: onClose
        }));
        var iconClassName = utils.classNames('p-toast-message-icon pi', {
          'pi-info-circle': severity === 'info',
          'pi-exclamation-triangle': severity === 'warn',
          'pi-times': severity === 'error',
          'pi-check': severity === 'success'
        });
        return contentEl || /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("span", {
          className: iconClassName
        }), /*#__PURE__*/React__namespace.createElement("div", {
          className: "p-toast-message-text"
        }, /*#__PURE__*/React__namespace.createElement("span", {
          className: "p-toast-summary"
        }, summary), detail && /*#__PURE__*/React__namespace.createElement("div", {
          className: "p-toast-detail"
        }, detail)));
      }

      return null;
    };

    var className = utils.classNames('p-toast-message', _defineProperty({}, "p-toast-message-".concat(severity), severity), _className);
    var contentClassName = utils.classNames('p-toast-message-content', _contentClassName);
    var message = createMessage();
    var closeIcon = createCloseIcon();
    return /*#__PURE__*/React__namespace.createElement("div", {
      ref: ref,
      className: className,
      style: style,
      role: "alert",
      "aria-live": "assertive",
      "aria-atomic": "true",
      onClick: onClick
    }, /*#__PURE__*/React__namespace.createElement("div", {
      className: contentClassName,
      style: contentStyle
    }, message, closeIcon));
  }));
  ToastMessage.displayName = 'ToastMessage';

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
  var messageIdx = 0;
  var Toast = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
    var _React$useState = React__namespace.useState([]),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        messagesState = _React$useState2[0],
        setMessagesState = _React$useState2[1];

    var containerRef = React__namespace.useRef(null);

    var show = function show(value) {
      if (value) {
        var messages;

        if (Array.isArray(value)) {
          for (var i = 0; i < value.length; i++) {
            value[i].id = messageIdx++;
            messages = [].concat(_toConsumableArray(messagesState), _toConsumableArray(value));
          }
        } else {
          value.id = messageIdx++;
          messages = messagesState ? [].concat(_toConsumableArray(messagesState), [value]) : [value];
        }

        messagesState.length === 0 && utils.ZIndexUtils.set('toast', containerRef.current, PrimeReact__default["default"].autoZIndex, props.baseZIndex || PrimeReact__default["default"].zIndex['toast']);
        setMessagesState(messages);
      }
    };

    var clear = function clear() {
      utils.ZIndexUtils.clear(containerRef.current);
      setMessagesState([]);
    };

    var replace = function replace(value) {
      var replaced = Array.isArray(value) ? value : [value];
      setMessagesState(replaced);
    };

    var onClose = function onClose(message) {
      var messages = messagesState.filter(function (msg) {
        return msg.id !== message.id;
      });
      setMessagesState(messages);
      props.onRemove && props.onRemove(message);
    };

    var onEntered = function onEntered() {
      props.onShow && props.onShow();
    };

    var onExited = function onExited() {
      messagesState.length === 1 && utils.ZIndexUtils.clear(containerRef.current);
      props.onHide && props.onHide();
    };

    hooks.useUnmountEffect(function () {
      utils.ZIndexUtils.clear(containerRef.current);
    });
    React__namespace.useImperativeHandle(ref, function () {
      return _objectSpread({
        show: show,
        replace: replace,
        clear: clear,
        getElement: function getElement() {
          return containerRef.current;
        }
      }, props);
    });

    var createElement = function createElement() {
      var otherProps = utils.ObjectUtils.findDiffKeys(props, Toast.defaultProps);
      var className = utils.classNames('p-toast p-component p-toast-' + props.position, props.className);
      return /*#__PURE__*/React__namespace.createElement("div", _extends({
        ref: containerRef,
        id: props.id,
        className: className,
        style: props.style
      }, otherProps), /*#__PURE__*/React__namespace.createElement(reactTransitionGroup.TransitionGroup, null, messagesState.map(function (message) {
        var messageRef = /*#__PURE__*/React__namespace.createRef();
        return /*#__PURE__*/React__namespace.createElement(csstransition.CSSTransition, {
          nodeRef: messageRef,
          key: message.id,
          classNames: "p-toast-message",
          unmountOnExit: true,
          timeout: {
            enter: 300,
            exit: 300
          },
          onEntered: onEntered,
          onExited: onExited,
          options: props.transitionOptions
        }, /*#__PURE__*/React__namespace.createElement(ToastMessage, {
          ref: messageRef,
          message: message,
          onClick: props.onClick,
          onClose: onClose
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

  exports.Toast = Toast;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, ReactTransitionGroup, primereact.api, primereact.csstransition, primereact.hooks, primereact.portal, primereact.utils, primereact.ripple);
