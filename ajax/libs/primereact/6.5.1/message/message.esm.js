import React, { Component } from 'react';
import { ObjectUtils, classNames } from 'primereact/core';

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

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
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

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var Message = /*#__PURE__*/function (_Component) {
  _inherits(Message, _Component);

  var _super = _createSuper(Message);

  function Message() {
    _classCallCheck(this, Message);

    return _super.apply(this, arguments);
  }

  _createClass(Message, [{
    key: "getContent",
    value: function getContent() {
      if (this.props.content) {
        return ObjectUtils.getJSXElement(this.props.content, this.props);
      }

      var icon = classNames('p-inline-message-icon pi', {
        'pi-info-circle': this.props.severity === 'info',
        'pi-exclamation-triangle': this.props.severity === 'warn',
        'pi-times-circle': this.props.severity === 'error',
        'pi-check': this.props.severity === 'success'
      });
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
        className: icon
      }), /*#__PURE__*/React.createElement("span", {
        className: "p-inline-message-text"
      }, this.props.text));
    }
  }, {
    key: "render",
    value: function render() {
      var className = classNames('p-inline-message p-component', {
        'p-inline-message-info': this.props.severity === 'info',
        'p-inline-message-warn': this.props.severity === 'warn',
        'p-inline-message-error': this.props.severity === 'error',
        'p-inline-message-success': this.props.severity === 'success',
        'p-inline-message-icon-only': !this.props.text
      }, this.props.className);
      var content = this.getContent();
      return /*#__PURE__*/React.createElement("div", {
        id: this.props.id,
        "aria-live": "polite",
        className: className,
        style: this.props.style,
        role: "alert"
      }, content);
    }
  }]);

  return Message;
}(Component);

_defineProperty(Message, "defaultProps", {
  id: null,
  className: null,
  style: null,
  text: null,
  severity: 'info',
  content: null
});

export { Message };
