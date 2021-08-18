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

function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var UIMessageComponent = /*#__PURE__*/function (_Component) {
  _inherits(UIMessageComponent, _Component);

  var _super = _createSuper$1(UIMessageComponent);

  function UIMessageComponent(props) {
    var _this;

    _classCallCheck(this, UIMessageComponent);

    _this = _super.call(this, props);
    _this.onClick = _this.onClick.bind(_assertThisInitialized(_this));
    _this.onClose = _this.onClose.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(UIMessageComponent, [{
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
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
    }
  }, {
    key: "onClose",
    value: function onClose(event) {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }

      if (this.props.onClose) {
        this.props.onClose(this.props.message);
      }

      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }
    }
  }, {
    key: "onClick",
    value: function onClick() {
      if (this.props.onClick) {
        this.props.onClick(this.props.message);
      }
    }
  }, {
    key: "renderCloseIcon",
    value: function renderCloseIcon() {
      if (this.props.message.closable !== false) {
        return /*#__PURE__*/React__default['default'].createElement("button", {
          type: "button",
          className: "p-message-close p-link",
          onClick: this.onClose
        }, /*#__PURE__*/React__default['default'].createElement("i", {
          className: "p-message-close-icon pi pi-times"
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
        var icon = core.classNames('p-message-icon pi ', {
          'pi-info-circle': severity === 'info',
          'pi-check': severity === 'success',
          'pi-exclamation-triangle': severity === 'warn',
          'pi-times-circle': severity === 'error'
        });
        return content || /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, /*#__PURE__*/React__default['default'].createElement("span", {
          className: icon
        }), /*#__PURE__*/React__default['default'].createElement("span", {
          className: "p-message-summary"
        }, summary), /*#__PURE__*/React__default['default'].createElement("span", {
          className: "p-message-detail"
        }, detail));
      }

      return null;
    }
  }, {
    key: "render",
    value: function render() {
      var severity = this.props.message.severity;
      var className = 'p-message p-component p-message-' + severity;
      var closeIcon = this.renderCloseIcon();
      var message = this.renderMessage();
      return /*#__PURE__*/React__default['default'].createElement("div", {
        ref: this.props.forwardRef,
        className: className,
        onClick: this.onClick
      }, /*#__PURE__*/React__default['default'].createElement("div", {
        className: "p-message-wrapper"
      }, message, closeIcon));
    }
  }]);

  return UIMessageComponent;
}(React.Component);

_defineProperty(UIMessageComponent, "defaultProps", {
  message: null,
  onClose: null,
  onClick: null
});

var UIMessage = /*#__PURE__*/React__default['default'].forwardRef(function (props, ref) {
  return /*#__PURE__*/React__default['default'].createElement(UIMessageComponent, _extends({
    forwardRef: ref
  }, props));
});

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var messageIdx = 0;
var Messages = /*#__PURE__*/function (_Component) {
  _inherits(Messages, _Component);

  var _super = _createSuper(Messages);

  function Messages(props) {
    var _this;

    _classCallCheck(this, Messages);

    _this = _super.call(this, props);
    _this.state = {
      messages: []
    };
    _this.onClose = _this.onClose.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Messages, [{
    key: "show",
    value: function show(value) {
      if (value) {
        var newMessages = [];

        if (Array.isArray(value)) {
          for (var i = 0; i < value.length; i++) {
            value[i].id = messageIdx++;
            newMessages = [].concat(_toConsumableArray(this.state.messages), _toConsumableArray(value));
          }
        } else {
          value.id = messageIdx++;
          newMessages = this.state.messages ? [].concat(_toConsumableArray(this.state.messages), [value]) : [value];
        }

        this.setState({
          messages: newMessages
        });
      }
    }
  }, {
    key: "clear",
    value: function clear() {
      this.setState({
        messages: []
      });
    }
  }, {
    key: "replace",
    value: function replace(value) {
      var _this2 = this;

      this.setState({
        messages: []
      }, function () {
        return _this2.show(value);
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
    key: "render",
    value: function render() {
      var _this3 = this;

      return /*#__PURE__*/React__default['default'].createElement("div", {
        id: this.props.id,
        className: this.props.className,
        style: this.props.style
      }, /*#__PURE__*/React__default['default'].createElement(reactTransitionGroup.TransitionGroup, null, this.state.messages.map(function (message) {
        var messageRef = /*#__PURE__*/React__default['default'].createRef();
        return /*#__PURE__*/React__default['default'].createElement(core.CSSTransition, {
          nodeRef: messageRef,
          key: message.id,
          classNames: "p-message",
          unmountOnExit: true,
          timeout: {
            enter: 300,
            exit: 300
          },
          options: _this3.props.transitionOptions
        }, /*#__PURE__*/React__default['default'].createElement(UIMessage, {
          ref: messageRef,
          message: message,
          onClick: _this3.props.onClick,
          onClose: _this3.onClose
        }));
      })));
    }
  }]);

  return Messages;
}(React.Component);

_defineProperty(Messages, "defaultProps", {
  id: null,
  className: null,
  style: null,
  transitionOptions: null,
  onRemove: null,
  onClick: null
});

exports.Messages = Messages;
