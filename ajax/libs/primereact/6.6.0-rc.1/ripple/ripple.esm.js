import React, { Component } from 'react';
import { DomHandler } from 'primereact/core';
import PrimeReact from 'primereact/api';

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

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var Ripple = /*#__PURE__*/function (_Component) {
  _inherits(Ripple, _Component);

  var _super = _createSuper(Ripple);

  function Ripple(props) {
    var _this;

    _classCallCheck(this, Ripple);

    _this = _super.call(this, props);
    _this.onMouseDown = _this.onMouseDown.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Ripple, [{
    key: "getTarget",
    value: function getTarget() {
      return this.ink && this.ink.parentElement;
    }
  }, {
    key: "bindEvents",
    value: function bindEvents() {
      if (this.target) {
        this.target.addEventListener('mousedown', this.onMouseDown);
      }
    }
  }, {
    key: "unbindEvents",
    value: function unbindEvents() {
      if (this.target) {
        this.target.removeEventListener('mousedown', this.onMouseDown);
      }
    }
  }, {
    key: "onMouseDown",
    value: function onMouseDown(event) {
      if (!this.ink || getComputedStyle(this.ink, null).display === 'none') {
        return;
      }

      DomHandler.removeClass(this.ink, 'p-ink-active');

      if (!DomHandler.getHeight(this.ink) && !DomHandler.getWidth(this.ink)) {
        var d = Math.max(DomHandler.getOuterWidth(this.target), DomHandler.getOuterHeight(this.target));
        this.ink.style.height = d + 'px';
        this.ink.style.width = d + 'px';
      }

      var offset = DomHandler.getOffset(this.target);
      var x = event.pageX - offset.left + document.body.scrollTop - DomHandler.getWidth(this.ink) / 2;
      var y = event.pageY - offset.top + document.body.scrollLeft - DomHandler.getHeight(this.ink) / 2;
      this.ink.style.top = y + 'px';
      this.ink.style.left = x + 'px';
      DomHandler.addClass(this.ink, 'p-ink-active');
    }
  }, {
    key: "onAnimationEnd",
    value: function onAnimationEnd(event) {
      DomHandler.removeClass(event.currentTarget, 'p-ink-active');
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.ink) {
        this.target = this.getTarget();
        this.bindEvents();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (this.ink && !this.target) {
        this.target = this.getTarget();
        this.bindEvents();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.ink) {
        this.target = null;
        this.unbindEvents();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return PrimeReact.ripple && /*#__PURE__*/React.createElement("span", {
        ref: function ref(el) {
          return _this2.ink = el;
        },
        className: "p-ink",
        onAnimationEnd: this.onAnimationEnd
      });
    }
  }]);

  return Ripple;
}(Component);

export { Ripple };
