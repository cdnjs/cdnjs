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
var Card = /*#__PURE__*/function (_Component) {
  _inherits(Card, _Component);

  var _super = _createSuper(Card);

  function Card() {
    _classCallCheck(this, Card);

    return _super.apply(this, arguments);
  }

  _createClass(Card, [{
    key: "renderHeader",
    value: function renderHeader() {
      if (this.props.header) {
        return /*#__PURE__*/React.createElement("div", {
          className: "p-card-header"
        }, ObjectUtils.getJSXElement(this.props.header, this.props));
      }

      return null;
    }
  }, {
    key: "renderBody",
    value: function renderBody() {
      var title = this.props.title && /*#__PURE__*/React.createElement("div", {
        className: "p-card-title"
      }, ObjectUtils.getJSXElement(this.props.title, this.props));
      var subTitle = this.props.subTitle && /*#__PURE__*/React.createElement("div", {
        className: "p-card-subtitle"
      }, ObjectUtils.getJSXElement(this.props.subTitle, this.props));
      var children = this.props.children && /*#__PURE__*/React.createElement("div", {
        className: "p-card-content"
      }, this.props.children);
      var footer = this.props.footer && /*#__PURE__*/React.createElement("div", {
        className: "p-card-footer"
      }, ObjectUtils.getJSXElement(this.props.footer, this.props));
      return /*#__PURE__*/React.createElement("div", {
        className: "p-card-body"
      }, title, subTitle, children, footer);
    }
  }, {
    key: "render",
    value: function render() {
      var header = this.renderHeader();
      var body = this.renderBody();
      var className = classNames('p-card p-component', this.props.className);
      return /*#__PURE__*/React.createElement("div", {
        className: className,
        style: this.props.style,
        id: this.props.id
      }, header, body);
    }
  }]);

  return Card;
}(Component);

_defineProperty(Card, "defaultProps", {
  id: null,
  header: null,
  footer: null,
  title: null,
  subTitle: null,
  style: null,
  className: null
});

export { Card };
