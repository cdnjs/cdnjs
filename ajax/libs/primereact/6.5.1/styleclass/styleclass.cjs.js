'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var core = require('primereact/core');

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
var StyleClass = /*#__PURE__*/function (_Component) {
  _inherits(StyleClass, _Component);

  var _super = _createSuper(StyleClass);

  function StyleClass() {
    _classCallCheck(this, StyleClass);

    return _super.apply(this, arguments);
  }

  _createClass(StyleClass, [{
    key: "enter",
    value: function enter() {
      var _this = this;

      if (this.props.enterActiveClassName) {
        if (!this.animating) {
          this.animating = true;

          if (this.props.enterActiveClassName === 'slidedown') {
            this.target.style.height = '0px';
            core.DomHandler.removeClass(this.target, 'hidden');
            this.target.style.maxHeight = this.target.scrollHeight + 'px';
            core.DomHandler.addClass(this.target, 'hidden');
            this.target.style.height = '';
          }

          core.DomHandler.addClass(this.target, this.props.enterActiveClassName);

          if (this.props.enterClassName) {
            core.DomHandler.removeClass(this.target, this.props.enterClassName);
          }

          this.enterListener = function () {
            core.DomHandler.removeClass(_this.target, _this.props.enterActiveClassName);

            if (_this.props.enterToClassName) {
              core.DomHandler.addClass(_this.target, _this.props.enterToClassName);
            }

            _this.target.removeEventListener('animationend', _this.enterListener);

            if (_this.props.enterActiveClassName === 'slidedown') {
              _this.target.style.maxHeight = '';
            }

            _this.animating = false;
          };

          this.target.addEventListener('animationend', this.enterListener);
        }
      } else {
        if (this.props.enterClassName) {
          core.DomHandler.removeClass(this.target, this.props.enterClassName);
        }

        if (this.props.enterToClassName) {
          core.DomHandler.addClass(this.target, this.props.enterToClassName);
        }
      }

      if (this.props.hideOnOutsideClick) {
        this.bindDocumentListener();
      }
    }
  }, {
    key: "leave",
    value: function leave() {
      var _this2 = this;

      if (this.props.leaveActiveClassName) {
        if (!this.animating) {
          this.animating = true;
          core.DomHandler.addClass(this.target, this.props.leaveActiveClassName);

          if (this.props.leaveClassName) {
            core.DomHandler.removeClass(this.target, this.props.leaveClassName);
          }

          this.leaveListener = function () {
            core.DomHandler.removeClass(_this2.target, _this2.props.leaveActiveClassName);

            if (_this2.props.leaveToClassName) {
              core.DomHandler.addClass(_this2.target, _this2.props.leaveToClassName);
            }

            _this2.target.removeEventListener('animationend', _this2.leaveListener);

            _this2.animating = false;
          };

          this.target.addEventListener('animationend', this.leaveListener);
        }
      } else {
        if (this.props.leaveClassName) {
          core.DomHandler.removeClass(this.target, this.props.leaveClassName);
        }

        if (this.props.leaveToClassName) {
          core.DomHandler.addClass(this.target, this.props.leaveToClassName);
        }
      }

      if (this.props.hideOnOutsideClick) {
        this.unbindDocumentListener();
      }
    }
  }, {
    key: "resolveTarget",
    value: function resolveTarget() {
      if (this.target) {
        return this.target;
      }

      switch (this.props.selector) {
        case '@next':
          return this.el.nextElementSibling;

        case '@prev':
          return this.el.previousElementSibling;

        case '@parent':
          return this.el.parentElement;

        case '@grandparent':
          return this.el.parentElement.parentElement;

        default:
          return document.querySelector(this.props.selector);
      }
    }
  }, {
    key: "bindDocumentListener",
    value: function bindDocumentListener() {
      var _this3 = this;

      if (!this.documentListener) {
        this.documentListener = function (event) {
          if (getComputedStyle(_this3.target).getPropertyValue('position') === 'static') {
            _this3.unbindDocumentListener();
          } else if (!_this3.el.isSameNode(event.target) && !_this3.el.contains(event.target) && !_this3.target.contains(event.target)) {
            _this3.leave();
          }
        };

        this.el.ownerDocument.addEventListener('click', this.documentListener);
      }
    }
  }, {
    key: "unbindDocumentListener",
    value: function unbindDocumentListener() {
      if (this.documentListener) {
        this.el.ownerDocument.removeEventListener('click', this.documentListener);
        this.documentListener = null;
      }
    }
  }, {
    key: "bindEvents",
    value: function bindEvents() {
      var _this4 = this;

      this.clickListener = function () {
        _this4.target = _this4.resolveTarget();

        if (_this4.props.toggleClassName) {
          if (core.DomHandler.hasClass(_this4.target, _this4.props.toggleClassName)) core.DomHandler.removeClass(_this4.target, _this4.props.toggleClassName);else core.DomHandler.addClass(_this4.target, _this4.props.toggleClassName);
        } else {
          if (_this4.target.offsetParent === null) _this4.enter();else _this4.leave();
        }
      };

      this.el.addEventListener('click', this.clickListener);
    }
  }, {
    key: "unbindEvents",
    value: function unbindEvents() {
      if (this.clickListener) {
        this.el.removeEventListener('click', this.clickListener);
        this.clickListener = null;
      }
    }
  }, {
    key: "el",
    get: function get() {
      var ref = this.props.nodeRef;

      if (ref) {
        return _typeof(ref) === 'object' && ref.hasOwnProperty('current') ? ref.current : ref;
      }

      return null;
    }
  }, {
    key: "init",
    value: function init() {
      if (this.el) {
        this.bindEvents();
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.unbindEvents();
      this.unbindDocumentListener();
      this.target = null;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.init();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevProps.nodeRef !== this.props.nodeRef) {
        this.destroy();
        this.init();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.destroy();
    }
  }, {
    key: "render",
    value: function render() {
      return this.props.children;
    }
  }]);

  return StyleClass;
}(react.Component);

_defineProperty(StyleClass, "defaultProps", {
  nodeRef: null,
  selector: null,
  enterClassName: null,
  enterActiveClassName: null,
  enterToClassName: null,
  leaveClassName: null,
  leaveActiveClassName: null,
  leaveToClassName: null,
  hideOnOutsideClick: false,
  toggleClassName: null
});

exports.StyleClass = StyleClass;
