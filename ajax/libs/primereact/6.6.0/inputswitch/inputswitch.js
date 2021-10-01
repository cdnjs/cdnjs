this.primereact = this.primereact || {};
this.primereact.inputswitch = (function (exports, React, core) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

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

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
  var InputSwitch = /*#__PURE__*/function (_Component) {
    _inherits(InputSwitch, _Component);

    var _super = _createSuper(InputSwitch);

    function InputSwitch(props) {
      var _this;

      _classCallCheck(this, InputSwitch);

      _this = _super.call(this, props);
      _this.state = {
        focused: false
      };
      _this.onClick = _this.onClick.bind(_assertThisInitialized(_this));
      _this.toggle = _this.toggle.bind(_assertThisInitialized(_this));
      _this.onFocus = _this.onFocus.bind(_assertThisInitialized(_this));
      _this.onBlur = _this.onBlur.bind(_assertThisInitialized(_this));
      _this.onKeyDown = _this.onKeyDown.bind(_assertThisInitialized(_this));
      _this.inputRef = /*#__PURE__*/React.createRef(_this.props.inputRef);
      return _this;
    }

    _createClass(InputSwitch, [{
      key: "onClick",
      value: function onClick(event) {
        if (this.props.disabled) {
          return;
        }

        this.toggle(event);
        this.inputRef.current.focus();
      }
    }, {
      key: "toggle",
      value: function toggle(event) {
        if (this.props.onChange) {
          var value = this.isChecked() ? this.props.falseValue : this.props.trueValue;
          this.props.onChange({
            originalEvent: event,
            value: value,
            stopPropagation: function stopPropagation() {},
            preventDefault: function preventDefault() {},
            target: {
              name: this.props.name,
              id: this.props.id,
              value: value
            }
          });
        }
      }
    }, {
      key: "onFocus",
      value: function onFocus(event) {
        var _this2 = this;

        var currentEvent = event;
        this.setState({
          focused: true
        }, function () {
          if (_this2.props.onFocus) {
            _this2.props.onFocus(currentEvent);
          }
        });
      }
    }, {
      key: "onBlur",
      value: function onBlur(event) {
        var _this3 = this;

        var currentEvent = event;
        this.setState({
          focused: false
        }, function () {
          if (_this3.props.onBlur) {
            _this3.props.onBlur(currentEvent);
          }
        });
      }
    }, {
      key: "onKeyDown",
      value: function onKeyDown(event) {
        if (event.key === 'Enter') {
          this.onClick(event);
        }
      }
    }, {
      key: "updateInputRef",
      value: function updateInputRef() {
        var ref = this.props.inputRef;

        if (ref) {
          if (typeof ref === 'function') {
            ref(this.inputRef.current);
          } else {
            ref.current = this.inputRef.current;
          }
        }
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        this.updateInputRef();

        if (this.props.tooltip) {
          this.renderTooltip();
        }
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps) {
        if (prevProps.tooltip !== this.props.tooltip || prevProps.tooltipOptions !== this.props.tooltipOptions) {
          if (this.tooltip) this.tooltip.update(_objectSpread({
            content: this.props.tooltip
          }, this.props.tooltipOptions || {}));else this.renderTooltip();
        }
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        if (this.tooltip) {
          this.tooltip.destroy();
          this.tooltip = null;
        }
      }
    }, {
      key: "renderTooltip",
      value: function renderTooltip() {
        this.tooltip = core.tip({
          target: this.container,
          content: this.props.tooltip,
          options: this.props.tooltipOptions
        });
      }
    }, {
      key: "isChecked",
      value: function isChecked() {
        return this.props.checked === this.props.trueValue;
      }
    }, {
      key: "render",
      value: function render() {
        var _this4 = this;

        var className = core.classNames('p-inputswitch p-component', {
          'p-inputswitch-checked': this.isChecked(),
          'p-disabled': this.props.disabled,
          'p-inputswitch-focus': this.state.focused
        }, this.props.className);
        var inputSwitchProps = core.ObjectUtils.findDiffKeys(this.props, InputSwitch.defaultProps);
        return /*#__PURE__*/React__default['default'].createElement("div", _extends({
          ref: function ref(el) {
            return _this4.container = el;
          },
          id: this.props.id,
          className: className,
          style: this.props.style,
          onClick: this.onClick,
          role: "checkbox",
          "aria-checked": this.isChecked()
        }, inputSwitchProps), /*#__PURE__*/React__default['default'].createElement("div", {
          className: "p-hidden-accessible"
        }, /*#__PURE__*/React__default['default'].createElement("input", {
          ref: this.inputRef,
          type: "checkbox",
          id: this.props.inputId,
          name: this.props.name,
          checked: this.isChecked(),
          onChange: this.toggle,
          onFocus: this.onFocus,
          onBlur: this.onBlur,
          onKeyDown: this.onKeyDown,
          disabled: this.props.disabled,
          role: "switch",
          "aria-checked": this.isChecked(),
          "aria-labelledby": this.props.ariaLabelledBy
        })), /*#__PURE__*/React__default['default'].createElement("span", {
          className: "p-inputswitch-slider"
        }));
      }
    }]);

    return InputSwitch;
  }(React.Component);

  _defineProperty(InputSwitch, "defaultProps", {
    id: null,
    inputRef: null,
    style: null,
    className: null,
    inputId: null,
    name: null,
    checked: false,
    trueValue: true,
    falseValue: false,
    disabled: false,
    tooltip: null,
    tooltipOptions: null,
    ariaLabelledBy: null,
    onChange: null,
    onFocus: null,
    onBlur: null
  });

  exports.InputSwitch = InputSwitch;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

}({}, React, primereact.core));
