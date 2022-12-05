this.primereact = this.primereact || {};
this.primereact.messages = (function (exports, React, reactTransitionGroup, csstransition, utils, api, hooks, ripple) {
  'use strict';

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

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  var UIMessage = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
    var _props$message = props.message,
      severity = _props$message.severity,
      content = _props$message.content,
      summary = _props$message.summary,
      detail = _props$message.detail,
      closable = _props$message.closable,
      life = _props$message.life,
      sticky = _props$message.sticky,
      icon = _props$message.icon;
    var _useTimeout = hooks.useTimeout(function () {
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
        var ariaLabel = api.localeOption('close');
        return /*#__PURE__*/React__namespace.createElement("button", {
          type: "button",
          className: "p-message-close p-link",
          "aria-label": ariaLabel,
          onClick: onClose
        }, /*#__PURE__*/React__namespace.createElement("i", {
          className: "p-message-close-icon pi pi-times",
          "aria-hidden": "true"
        }), /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null));
      }
      return null;
    };
    var createMessage = function createMessage() {
      if (props.message) {
        var iconValue = icon;
        if (!iconValue) {
          iconValue = utils.classNames('pi', {
            'pi-info-circle': severity === 'info',
            'pi-exclamation-triangle': severity === 'warn',
            'pi-times-circle': severity === 'error',
            'pi-check': severity === 'success'
          });
        }
        var iconContent = utils.IconUtils.getJSXIcon(iconValue, {
          className: 'p-message-icon'
        }, {
          props: props
        });
        return content || /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, iconContent, /*#__PURE__*/React__namespace.createElement("span", {
          className: "p-message-summary"
        }, summary), /*#__PURE__*/React__namespace.createElement("span", {
          className: "p-message-detail"
        }, detail));
      }
      return null;
    };
    var className = utils.classNames('p-message p-component p-message-' + severity);
    var closeIcon = createCloseIcon();
    var message = createMessage();
    return /*#__PURE__*/React__namespace.createElement("div", {
      ref: ref,
      className: className,
      onClick: onClick
    }, /*#__PURE__*/React__namespace.createElement("div", {
      className: "p-message-wrapper"
    }, message, closeIcon));
  }));
  UIMessage.displayName = 'UIMessage';

  var messageIdx = 0;
  var Messages = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
    var _React$useState = React__namespace.useState([]),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      messagesState = _React$useState2[0],
      setMessagesState = _React$useState2[1];
    var elementRef = React__namespace.useRef(null);
    var show = function show(value) {
      if (value) {
        var messages = assignIdentifiers(value, true);
        if (Array.isArray(value)) {
          for (var i = 0; i < value.length; i++) {
            value[i].id = messageIdx++;
            messages = [].concat(_toConsumableArray(messagesState), _toConsumableArray(value));
          }
        } else {
          value.id = messageIdx++;
          messages = messagesState ? [].concat(_toConsumableArray(messagesState), [value]) : [value];
        }
        setMessagesState(messages);
      }
    };
    var assignIdentifiers = function assignIdentifiers(value, copy) {
      var messages;
      if (Array.isArray(value)) {
        for (var i = 0; i < value.length; i++) {
          value[i].id = messageIdx++;
          if (copy) {
            messages = [].concat(_toConsumableArray(messagesState), _toConsumableArray(value));
          } else {
            messages = value;
          }
        }
      } else {
        value.id = messageIdx++;
        if (copy) {
          messages = messagesState ? [].concat(_toConsumableArray(messagesState), [value]) : [value];
        } else {
          messages = [value];
        }
      }
      return messages;
    };
    var clear = function clear() {
      setMessagesState([]);
    };
    var replace = function replace(value) {
      var replaced = assignIdentifiers(value, false);
      setMessagesState(replaced);
    };
    var onClose = function onClose(message) {
      setMessagesState(messagesState.filter(function (msg) {
        return msg.id !== message.id;
      }));
      props.onRemove && props.onRemove(message);
    };
    React__namespace.useImperativeHandle(ref, function () {
      return {
        props: props,
        show: show,
        replace: replace,
        clear: clear,
        getElement: function getElement() {
          return elementRef.current;
        }
      };
    });
    var otherProps = utils.ObjectUtils.findDiffKeys(props, Messages.defaultProps);
    return /*#__PURE__*/React__namespace.createElement("div", _extends({
      id: props.id,
      ref: elementRef,
      className: props.className,
      style: props.style
    }, otherProps), /*#__PURE__*/React__namespace.createElement(reactTransitionGroup.TransitionGroup, null, messagesState && messagesState.map(function (message) {
      var messageRef = /*#__PURE__*/React__namespace.createRef();
      return /*#__PURE__*/React__namespace.createElement(csstransition.CSSTransition, {
        nodeRef: messageRef,
        key: message.id,
        classNames: "p-message",
        unmountOnExit: true,
        timeout: {
          enter: 300,
          exit: 300
        },
        options: props.transitionOptions
      }, /*#__PURE__*/React__namespace.createElement(UIMessage, {
        ref: messageRef,
        message: message,
        onClick: props.onClick,
        onClose: onClose
      }));
    })));
  }));
  Messages.displayName = 'Messages';
  Messages.defaultProps = {
    __TYPE: 'Messages',
    id: null,
    className: null,
    style: null,
    transitionOptions: null,
    onRemove: null,
    onClick: null
  };

  exports.Messages = Messages;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, ReactTransitionGroup, primereact.csstransition, primereact.utils, primereact.api, primereact.hooks, primereact.ripple);
