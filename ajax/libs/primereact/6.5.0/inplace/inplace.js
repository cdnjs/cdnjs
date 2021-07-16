this.primereact = this.primereact || {};
this.primereact.inplace = (function (exports, React, core, button) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
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
  var InplaceDisplay = /*#__PURE__*/function (_Component) {
    _inherits(InplaceDisplay, _Component);

    var _super = _createSuper(InplaceDisplay);

    function InplaceDisplay() {
      _classCallCheck(this, InplaceDisplay);

      return _super.apply(this, arguments);
    }

    _createClass(InplaceDisplay, [{
      key: "render",
      value: function render() {
        return this.props.children;
      }
    }]);

    return InplaceDisplay;
  }(React.Component);
  var InplaceContent = /*#__PURE__*/function (_Component2) {
    _inherits(InplaceContent, _Component2);

    var _super2 = _createSuper(InplaceContent);

    function InplaceContent() {
      _classCallCheck(this, InplaceContent);

      return _super2.apply(this, arguments);
    }

    _createClass(InplaceContent, [{
      key: "render",
      value: function render() {
        return this.props.children;
      }
    }]);

    return InplaceContent;
  }(React.Component);
  var Inplace = /*#__PURE__*/function (_Component3) {
    _inherits(Inplace, _Component3);

    var _super3 = _createSuper(Inplace);

    function Inplace(props) {
      var _this;

      _classCallCheck(this, Inplace);

      _this = _super3.call(this, props);

      if (!_this.props.onToggle) {
        _this.state = {
          active: false
        };
      }

      _this.open = _this.open.bind(_assertThisInitialized(_this));
      _this.close = _this.close.bind(_assertThisInitialized(_this));
      _this.onDisplayKeyDown = _this.onDisplayKeyDown.bind(_assertThisInitialized(_this));
      return _this;
    }

    _createClass(Inplace, [{
      key: "open",
      value: function open(event) {
        if (this.props.disabled) {
          return;
        }

        if (this.props.onOpen) {
          this.props.onOpen(event);
        }

        if (this.props.onToggle) {
          this.props.onToggle({
            originalEvent: event,
            value: true
          });
        } else {
          this.setState({
            active: true
          });
        }
      }
    }, {
      key: "close",
      value: function close(event) {
        if (this.props.onClose) {
          this.props.onClose(event);
        }

        if (this.props.onToggle) {
          this.props.onToggle({
            originalEvent: event,
            value: false
          });
        } else {
          this.setState({
            active: false
          });
        }
      }
    }, {
      key: "onDisplayKeyDown",
      value: function onDisplayKeyDown(event) {
        if (event.key === 'Enter') {
          this.open(event);
          event.preventDefault();
        }
      }
    }, {
      key: "isActive",
      value: function isActive() {
        return this.props.onToggle ? this.props.active : this.state.active;
      }
    }, {
      key: "renderDisplay",
      value: function renderDisplay(content) {
        var className = core.classNames('p-inplace-display', {
          'p-disabled': this.props.disabled
        });
        return /*#__PURE__*/React__default['default'].createElement("div", {
          className: className,
          onClick: this.open,
          onKeyDown: this.onDisplayKeyDown,
          tabIndex: this.props.tabIndex,
          "aria-label": this.props.ariaLabel
        }, content);
      }
    }, {
      key: "renderCloseButton",
      value: function renderCloseButton() {
        if (this.props.closable) {
          return /*#__PURE__*/React__default['default'].createElement(button.Button, {
            type: "button",
            className: "p-inplace-content-close",
            icon: "pi pi-times",
            onClick: this.close
          });
        }

        return null;
      }
    }, {
      key: "renderContent",
      value: function renderContent(content) {
        var closeButton = this.renderCloseButton();
        return /*#__PURE__*/React__default['default'].createElement("div", {
          className: "p-inplace-content"
        }, content, closeButton);
      }
    }, {
      key: "renderChildren",
      value: function renderChildren() {
        var _this2 = this;

        var active = this.isActive();
        return React__default['default'].Children.map(this.props.children, function (child, i) {
          if (active && child.type === InplaceContent) {
            return _this2.renderContent(child);
          } else if (!active && child.type === InplaceDisplay) {
            return _this2.renderDisplay(child);
          }
        });
      }
    }, {
      key: "render",
      value: function render() {
        var className = core.classNames('p-inplace p-component', {
          'p-inplace-closable': this.props.closable
        }, this.props.className);
        return /*#__PURE__*/React__default['default'].createElement("div", {
          className: className
        }, this.renderChildren());
      }
    }]);

    return Inplace;
  }(React.Component);

  _defineProperty(Inplace, "defaultProps", {
    style: null,
    className: null,
    active: false,
    closable: false,
    disabled: false,
    tabIndex: 0,
    ariaLabel: null,
    onOpen: null,
    onClose: null,
    onToggle: null
  });

  exports.Inplace = Inplace;
  exports.InplaceContent = InplaceContent;
  exports.InplaceDisplay = InplaceDisplay;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

}({}, React, primereact.core, primereact.button));
