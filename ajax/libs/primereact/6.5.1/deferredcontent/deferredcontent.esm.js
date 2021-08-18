import React, { Component } from 'react';

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
var DeferredContent = /*#__PURE__*/function (_Component) {
  _inherits(DeferredContent, _Component);

  var _super = _createSuper(DeferredContent);

  function DeferredContent(props) {
    var _this;

    _classCallCheck(this, DeferredContent);

    _this = _super.call(this, props);
    _this.state = {
      loaded: false
    };
    return _this;
  }

  _createClass(DeferredContent, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (!this.state.loaded) {
        if (this.shouldLoad()) this.load();else this.bindScrollListener();
      }
    }
  }, {
    key: "bindScrollListener",
    value: function bindScrollListener() {
      var _this2 = this;

      this.documentScrollListener = function () {
        if (_this2.shouldLoad()) {
          _this2.load();

          _this2.unbindScrollListener();
        }
      };

      window.addEventListener('scroll', this.documentScrollListener);
    }
  }, {
    key: "unbindScrollListener",
    value: function unbindScrollListener() {
      if (this.documentScrollListener) {
        window.removeEventListener('scroll', this.documentScrollListener);
        this.documentScrollListener = null;
      }
    }
  }, {
    key: "shouldLoad",
    value: function shouldLoad() {
      if (this.state.loaded) {
        return false;
      } else {
        var rect = this.container.getBoundingClientRect();
        var docElement = document.documentElement;
        var winHeight = docElement.clientHeight;
        return winHeight >= rect.top;
      }
    }
  }, {
    key: "load",
    value: function load(event) {
      this.setState({
        loaded: true
      });

      if (this.props.onLoad) {
        this.props.onLoad(event);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.unbindScrollListener();
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return /*#__PURE__*/React.createElement("div", {
        ref: function ref(el) {
          return _this3.container = el;
        }
      }, this.state.loaded ? this.props.children : null);
    }
  }]);

  return DeferredContent;
}(Component);

_defineProperty(DeferredContent, "defaultProps", {
  onload: null
});

export { DeferredContent };
