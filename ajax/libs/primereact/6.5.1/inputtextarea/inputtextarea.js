this.primereact = this.primereact || {};
this.primereact.inputtextarea = (function (exports, React, core) {
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

  var InputTextareaComponent = /*#__PURE__*/function (_Component) {
    _inherits(InputTextareaComponent, _Component);

    var _super = _createSuper(InputTextareaComponent);

    function InputTextareaComponent(props) {
      var _this;

      _classCallCheck(this, InputTextareaComponent);

      _this = _super.call(this, props);
      _this.onFocus = _this.onFocus.bind(_assertThisInitialized(_this));
      _this.onBlur = _this.onBlur.bind(_assertThisInitialized(_this));
      _this.onKeyUp = _this.onKeyUp.bind(_assertThisInitialized(_this));
      _this.onInput = _this.onInput.bind(_assertThisInitialized(_this));
      _this.elementRef = /*#__PURE__*/React.createRef(_this.props.forwardRef);
      return _this;
    }

    _createClass(InputTextareaComponent, [{
      key: "onFocus",
      value: function onFocus(e) {
        if (this.props.autoResize) {
          this.resize();
        }

        if (this.props.onFocus) {
          this.props.onFocus(e);
        }
      }
    }, {
      key: "onBlur",
      value: function onBlur(e) {
        if (this.props.autoResize) {
          this.resize();
        }

        if (this.props.onBlur) {
          this.props.onBlur(e);
        }
      }
    }, {
      key: "onKeyUp",
      value: function onKeyUp(e) {
        if (this.props.autoResize) {
          this.resize();
        }

        if (this.props.onKeyUp) {
          this.props.onKeyUp(e);
        }
      }
    }, {
      key: "onInput",
      value: function onInput(e) {
        if (this.props.autoResize) {
          this.resize();
        }

        if (e.target.value.length > 0) core.DomHandler.addClass(e.target, 'p-filled');else core.DomHandler.removeClass(e.target, 'p-filled');

        if (this.props.onInput) {
          this.props.onInput(e);
        }
      }
    }, {
      key: "resize",
      value: function resize(initial) {
        var inputEl = this.elementRef && this.elementRef.current;

        if (inputEl && core.DomHandler.isVisible(inputEl)) {
          if (!this.cachedScrollHeight) {
            this.cachedScrollHeight = inputEl.scrollHeight;
            inputEl.style.overflow = "hidden";
          }

          if (this.cachedScrollHeight !== inputEl.scrollHeight || initial) {
            inputEl.style.height = '';
            inputEl.style.height = inputEl.scrollHeight + 'px';

            if (parseFloat(inputEl.style.height) >= parseFloat(inputEl.style.maxHeight)) {
              inputEl.style.overflowY = "scroll";
              inputEl.style.height = inputEl.style.maxHeight;
            } else {
              inputEl.style.overflow = "hidden";
            }

            this.cachedScrollHeight = inputEl.scrollHeight;
          }
        }
      }
    }, {
      key: "isFilled",
      value: function isFilled() {
        return this.props.value != null && this.props.value.toString().length > 0 || this.props.defaultValue != null && this.props.defaultValue.toString().length > 0 || this.elementRef && this.elementRef.current && this.elementRef.current.value.toString().length > 0;
      }
    }, {
      key: "updateForwardRef",
      value: function updateForwardRef() {
        var ref = this.props.forwardRef;

        if (ref) {
          if (typeof ref === 'function') {
            ref(this.elementRef.current);
          } else {
            ref.current = this.elementRef.current;
          }
        }
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        this.updateForwardRef();

        if (this.props.tooltip) {
          this.renderTooltip();
        }

        if (this.props.autoResize) {
          this.resize(true);
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

        if (this.props.autoResize) {
          this.resize(true);
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
          target: this.elementRef.current,
          content: this.props.tooltip,
          options: this.props.tooltipOptions
        });
      }
    }, {
      key: "render",
      value: function render() {
        var className = core.classNames('p-inputtextarea p-inputtext p-component', {
          'p-disabled': this.props.disabled,
          'p-filled': this.isFilled(),
          'p-inputtextarea-resizable': this.props.autoResize
        }, this.props.className);
        var textareaProps = core.ObjectUtils.findDiffKeys(this.props, InputTextareaComponent.defaultProps);
        return /*#__PURE__*/React__default['default'].createElement("textarea", _extends({
          ref: this.elementRef
        }, textareaProps, {
          className: className,
          onFocus: this.onFocus,
          onBlur: this.onBlur,
          onKeyUp: this.onKeyUp,
          onInput: this.onInput
        }));
      }
    }]);

    return InputTextareaComponent;
  }(React.Component);

  _defineProperty(InputTextareaComponent, "defaultProps", {
    autoResize: false,
    tooltip: null,
    tooltipOptions: null,
    onInput: null,
    forwardRef: null
  });

  var InputTextarea = /*#__PURE__*/React__default['default'].forwardRef(function (props, ref) {
    return /*#__PURE__*/React__default['default'].createElement(InputTextareaComponent, _extends({
      forwardRef: ref
    }, props));
  });

  exports.InputTextarea = InputTextarea;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

}({}, React, primereact.core));
