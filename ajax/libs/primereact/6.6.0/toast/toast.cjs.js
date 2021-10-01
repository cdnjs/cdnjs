'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var core = require('primereact/core');
var reactTransitionGroup = require('react-transition-group');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

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

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var ToastMessageComponent = /*#__PURE__*/function (_Component) {
  _inherits(ToastMessageComponent, _Component);

  var _super = _createSuper$1(ToastMessageComponent);

  function ToastMessageComponent(props) {
    var _this;

    _classCallCheck(this, ToastMessageComponent);

    _this = _super.call(this, props);
    _this.onClick = _this.onClick.bind(_assertThisInitialized(_this));
    _this.onClose = _this.onClose.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ToastMessageComponent, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      if (!this.props.message.sticky) {
        this.timeout = setTimeout(function () {
          _this2.onClose(null);
        }, this.props.message.life || 3000);
      }
    }
  }, {
    key: "onClose",
    value: function onClose() {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }

      if (this.props.onClose) {
        this.props.onClose(this.props.message);
      }
    }
  }, {
    key: "onClick",
    value: function onClick(event) {
      if (this.props.onClick && !(core.DomHandler.hasClass(event.target, 'p-toast-icon-close') || core.DomHandler.hasClass(event.target, 'p-toast-icon-close-icon'))) {
        this.props.onClick(this.props.message);
      }
    }
  }, {
    key: "renderCloseIcon",
    value: function renderCloseIcon() {
      if (this.props.message.closable !== false) {
        return /*#__PURE__*/React__default['default'].createElement("button", {
          type: "button",
          className: "p-toast-icon-close p-link",
          onClick: this.onClose
        }, /*#__PURE__*/React__default['default'].createElement("span", {
          className: "p-toast-icon-close-icon pi pi-times"
        }), /*#__PURE__*/React__default['default'].createElement(core.Ripple, null));
      }

      return null;
    }
  }, {
    key: "renderMessage",
    value: function renderMessage() {
      if (this.props.message) {
        var _this$props$message = this.props.message,
            severity = _this$props$message.severity,
            content = _this$props$message.content,
            summary = _this$props$message.summary,
            detail = _this$props$message.detail;
        var contentEl = core.ObjectUtils.getJSXElement(content, _objectSpread(_objectSpread({}, this.props), {}, {
          onClose: this.onClose
        }));
        var iconClassName = core.classNames('p-toast-message-icon pi', {
          'pi-info-circle': severity === 'info',
          'pi-exclamation-triangle': severity === 'warn',
          'pi-times': severity === 'error',
          'pi-check': severity === 'success'
        });
        return contentEl || /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, /*#__PURE__*/React__default['default'].createElement("span", {
          className: iconClassName
        }), /*#__PURE__*/React__default['default'].createElement("div", {
          className: "p-toast-message-text"
        }, /*#__PURE__*/React__default['default'].createElement("span", {
          className: "p-toast-summary"
        }, summary), detail && /*#__PURE__*/React__default['default'].createElement("div", {
          className: "p-toast-detail"
        }, detail)));
      }

      return null;
    }
  }, {
    key: "render",
    value: function render() {
      var severity = this.props.message.severity;
      var contentClassName = this.props.message.contentClassName;
      var contentStyle = this.props.message.contentStyle;
      var style = this.props.message.style;
      var className = core.classNames('p-toast-message', {
        'p-toast-message-info': severity === 'info',
        'p-toast-message-warn': severity === 'warn',
        'p-toast-message-error': severity === 'error',
        'p-toast-message-success': severity === 'success'
      }, this.props.message.className);
      var message = this.renderMessage();
      var closeIcon = this.renderCloseIcon();
      return /*#__PURE__*/React__default['default'].createElement("div", {
        ref: this.props.forwardRef,
        className: className,
        style: style,
        role: "alert",
        "aria-live": "assertive",
        "aria-atomic": "true",
        onClick: this.onClick
      }, /*#__PURE__*/React__default['default'].createElement("div", {
        className: core.classNames('p-toast-message-content', contentClassName),
        style: contentStyle
      }, message, closeIcon));
    }
  }]);

  return ToastMessageComponent;
}(React.Component);

_defineProperty(ToastMessageComponent, "defaultProps", {
  message: null,
  onClose: null,
  onClick: null
});

var ToastMessage = /*#__PURE__*/React__default['default'].forwardRef(function (props, ref) {
  return /*#__PURE__*/React__default['default'].createElement(ToastMessageComponent, _extends({
    forwardRef: ref
  }, props));
});

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var messageIdx = 0;
var Toast = /*#__PURE__*/function (_Component) {
  _inherits(Toast, _Component);

  var _super = _createSuper(Toast);

  function Toast(props) {
    var _this;

    _classCallCheck(this, Toast);

    _this = _super.call(this, props);
    _this.state = {
      messages: []
    };
    _this.onClose = _this.onClose.bind(_assertThisInitialized(_this));
    _this.onEntered = _this.onEntered.bind(_assertThisInitialized(_this));
    _this.onExited = _this.onExited.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Toast, [{
    key: "show",
    value: function show(value) {
      if (value) {
        var newMessages;

        if (Array.isArray(value)) {
          for (var i = 0; i < value.length; i++) {
            value[i].id = messageIdx++;
            newMessages = [].concat(_toConsumableArray(this.state.messages), _toConsumableArray(value));
          }
        } else {
          value.id = messageIdx++;
          newMessages = this.state.messages ? [].concat(_toConsumableArray(this.state.messages), [value]) : [value];
        }

        this.state.messages.length === 0 && core.ZIndexUtils.set('toast', this.container, this.props.baseZIndex);
        this.setState({
          messages: newMessages
        });
      }
    }
  }, {
    key: "clear",
    value: function clear() {
      core.ZIndexUtils.clear(this.container);
      this.setState({
        messages: []
      });
    }
  }, {
    key: "onClose",
    value: function onClose(message) {
      var newMessages = this.state.messages.filter(function (msg) {
        return msg.id !== message.id;
      });
      this.setState({
        messages: newMessages
      });

      if (this.props.onRemove) {
        this.props.onRemove(message);
      }
    }
  }, {
    key: "onEntered",
    value: function onEntered() {
      this.props.onShow && this.props.onShow();
    }
  }, {
    key: "onExited",
    value: function onExited() {
      this.state.messages.length === 0 && core.ZIndexUtils.clear(this.container);
      this.props.onHide && this.props.onHide();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      core.ZIndexUtils.clear(this.container);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var className = core.classNames('p-toast p-component p-toast-' + this.props.position, this.props.className);
      return /*#__PURE__*/React__default['default'].createElement("div", {
        ref: function ref(el) {
          _this2.container = el;
        },
        id: this.props.id,
        className: className,
        style: this.props.style
      }, /*#__PURE__*/React__default['default'].createElement(reactTransitionGroup.TransitionGroup, null, this.state.messages.map(function (message) {
        var messageRef = /*#__PURE__*/React__default['default'].createRef();
        return /*#__PURE__*/React__default['default'].createElement(core.CSSTransition, {
          nodeRef: messageRef,
          key: message.id,
          classNames: "p-toast-message",
          unmountOnExit: true,
          timeout: {
            enter: 300,
            exit: 300
          },
          onEntered: _this2.onEntered,
          onExited: _this2.onExited,
          options: _this2.props.transitionOptions
        }, /*#__PURE__*/React__default['default'].createElement(ToastMessage, {
          ref: messageRef,
          message: message,
          onClick: _this2.props.onClick,
          onClose: _this2.onClose
        }));
      })));
    }
  }]);

  return Toast;
}(React.Component);

_defineProperty(Toast, "defaultProps", {
  id: null,
  className: null,
  style: null,
  baseZIndex: 0,
  position: 'top-right',
  transitionOptions: null,
  onClick: null,
  onRemove: null,
  onShow: null,
  onHide: null
});

exports.Toast = Toast;
