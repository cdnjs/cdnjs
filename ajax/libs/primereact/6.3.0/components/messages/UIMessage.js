"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UIMessage = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ClassNames = require("../utils/ClassNames");

var _Ripple = require("../ripple/Ripple");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var UIMessageComponent = /*#__PURE__*/function (_Component) {
  _inherits(UIMessageComponent, _Component);

  var _super = _createSuper(UIMessageComponent);

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
        return /*#__PURE__*/_react.default.createElement("button", {
          type: "button",
          className: "p-message-close p-link",
          onClick: this.onClose
        }, /*#__PURE__*/_react.default.createElement("i", {
          className: "p-message-close-icon pi pi-times"
        }), /*#__PURE__*/_react.default.createElement(_Ripple.Ripple, null));
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
        var icon = (0, _ClassNames.classNames)('p-message-icon pi ', {
          'pi-info-circle': severity === 'info',
          'pi-check': severity === 'success',
          'pi-exclamation-triangle': severity === 'warn',
          'pi-times-circle': severity === 'error'
        });
        return content || /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("span", {
          className: icon
        }), /*#__PURE__*/_react.default.createElement("span", {
          className: "p-message-summary"
        }, summary), /*#__PURE__*/_react.default.createElement("span", {
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
      return /*#__PURE__*/_react.default.createElement("div", {
        ref: this.props.forwardRef,
        className: className,
        onClick: this.onClick
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "p-message-wrapper"
      }, message, closeIcon));
    }
  }]);

  return UIMessageComponent;
}(_react.Component);

_defineProperty(UIMessageComponent, "defaultProps", {
  message: null,
  onClose: null,
  onClick: null
});

_defineProperty(UIMessageComponent, "propTypes", {
  message: _propTypes.default.object,
  onClose: _propTypes.default.func,
  onClick: _propTypes.default.func
});

var UIMessage = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  return /*#__PURE__*/_react.default.createElement(UIMessageComponent, _extends({
    forwardRef: ref
  }, props));
});

exports.UIMessage = UIMessage;