this.primereact = this.primereact || {};
this.primereact.selectbutton = (function (exports, React, core) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

  function _arrayLikeToArray$1(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray$1(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _unsupportedIterableToArray$1(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray$1(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray$1(arr) || _nonIterableSpread();
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

  function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
  var SelectButtonItem = /*#__PURE__*/function (_Component) {
    _inherits(SelectButtonItem, _Component);

    var _super = _createSuper$1(SelectButtonItem);

    function SelectButtonItem(props) {
      var _this;

      _classCallCheck(this, SelectButtonItem);

      _this = _super.call(this, props);
      _this.state = {
        focused: false
      };
      _this.onClick = _this.onClick.bind(_assertThisInitialized(_this));
      _this.onFocus = _this.onFocus.bind(_assertThisInitialized(_this));
      _this.onBlur = _this.onBlur.bind(_assertThisInitialized(_this));
      _this.onKeyDown = _this.onKeyDown.bind(_assertThisInitialized(_this));
      return _this;
    }

    _createClass(SelectButtonItem, [{
      key: "onClick",
      value: function onClick(event) {
        if (this.props.onClick) {
          this.props.onClick({
            originalEvent: event,
            option: this.props.option
          });
        }
      }
    }, {
      key: "onFocus",
      value: function onFocus() {
        this.setState({
          focused: true
        });
      }
    }, {
      key: "onBlur",
      value: function onBlur() {
        this.setState({
          focused: false
        });
      }
    }, {
      key: "onKeyDown",
      value: function onKeyDown(event) {
        var keyCode = event.which;

        if (keyCode === 32 || keyCode === 13) {
          //space and enter
          this.onClick(event);
          event.preventDefault();
        }
      }
    }, {
      key: "renderContent",
      value: function renderContent() {
        if (this.props.template) {
          return this.props.template(this.props.option);
        } else {
          return /*#__PURE__*/React__default['default'].createElement("span", {
            className: "p-button-label p-c"
          }, this.props.label);
        }
      }
    }, {
      key: "render",
      value: function render() {
        var className = core.classNames('p-button p-component', {
          'p-highlight': this.props.selected,
          'p-disabled': this.props.disabled,
          'p-focus': this.state.focused
        }, this.props.className);
        var content = this.renderContent();
        return /*#__PURE__*/React__default['default'].createElement("div", {
          className: className,
          role: "button",
          "aria-label": this.props.label,
          "aria-pressed": this.props.selected,
          "aria-labelledby": this.props.ariaLabelledBy,
          onClick: this.onClick,
          onKeyDown: this.onKeyDown,
          tabIndex: this.props.tabIndex,
          onFocus: this.onFocus,
          onBlur: this.onBlur
        }, content, !this.props.disabled && /*#__PURE__*/React__default['default'].createElement(core.Ripple, null));
      }
    }]);

    return SelectButtonItem;
  }(React.Component);

  _defineProperty(SelectButtonItem, "defaultProps", {
    option: null,
    label: null,
    className: null,
    selected: null,
    tabIndex: null,
    ariaLabelledBy: null,
    template: null,
    onClick: null
  });

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
  var SelectButton = /*#__PURE__*/function (_Component) {
    _inherits(SelectButton, _Component);

    var _super = _createSuper(SelectButton);

    function SelectButton(props) {
      var _this;

      _classCallCheck(this, SelectButton);

      _this = _super.call(this, props);
      _this.onOptionClick = _this.onOptionClick.bind(_assertThisInitialized(_this));
      return _this;
    }

    _createClass(SelectButton, [{
      key: "onOptionClick",
      value: function onOptionClick(event) {
        var _this2 = this;

        if (this.props.disabled || this.isOptionDisabled(event.option)) {
          return;
        }

        var selected = this.isSelected(event.option);

        if (selected && !this.props.unselectable) {
          return;
        }

        var optionValue = this.getOptionValue(event.option);
        var newValue;

        if (this.props.multiple) {
          var currentValue = this.props.value ? _toConsumableArray(this.props.value) : [];
          if (selected) newValue = currentValue.filter(function (val) {
            return !core.ObjectUtils.equals(val, optionValue, _this2.props.dataKey);
          });else newValue = [].concat(_toConsumableArray(currentValue), [optionValue]);
        } else {
          if (selected) newValue = null;else newValue = optionValue;
        }

        if (this.props.onChange) {
          this.props.onChange({
            originalEvent: event.originalEvent,
            value: newValue,
            stopPropagation: function stopPropagation() {},
            preventDefault: function preventDefault() {},
            target: {
              name: this.props.name,
              id: this.props.id,
              value: newValue
            }
          });
        }
      }
    }, {
      key: "getOptionLabel",
      value: function getOptionLabel(option) {
        return this.props.optionLabel ? core.ObjectUtils.resolveFieldData(option, this.props.optionLabel) : option && option['label'] !== undefined ? option['label'] : option;
      }
    }, {
      key: "getOptionValue",
      value: function getOptionValue(option) {
        return this.props.optionValue ? core.ObjectUtils.resolveFieldData(option, this.props.optionValue) : option && option['value'] !== undefined ? option['value'] : option;
      }
    }, {
      key: "isOptionDisabled",
      value: function isOptionDisabled(option) {
        if (this.props.optionDisabled) {
          return core.ObjectUtils.isFunction(this.props.optionDisabled) ? this.props.optionDisabled(option) : core.ObjectUtils.resolveFieldData(option, this.props.optionDisabled);
        }

        return option && option['disabled'] !== undefined ? option['disabled'] : false;
      }
    }, {
      key: "isSelected",
      value: function isSelected(option) {
        var selected = false;
        var optionValue = this.getOptionValue(option);

        if (this.props.multiple) {
          if (this.props.value && this.props.value.length) {
            var _iterator = _createForOfIteratorHelper(this.props.value),
                _step;

            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                var val = _step.value;

                if (core.ObjectUtils.equals(val, optionValue, this.props.dataKey)) {
                  selected = true;
                  break;
                }
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }
          }
        } else {
          selected = core.ObjectUtils.equals(this.props.value, optionValue, this.props.dataKey);
        }

        return selected;
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
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
          target: this.element,
          content: this.props.tooltip,
          options: this.props.tooltipOptions
        });
      }
    }, {
      key: "renderItems",
      value: function renderItems() {
        var _this3 = this;

        if (this.props.options && this.props.options.length) {
          return this.props.options.map(function (option, index) {
            var isDisabled = _this3.props.disabled || _this3.isOptionDisabled(option);

            var optionLabel = _this3.getOptionLabel(option);

            var tabIndex = isDisabled ? null : 0;
            return /*#__PURE__*/React__default['default'].createElement(SelectButtonItem, {
              key: "".concat(optionLabel, "_").concat(index),
              label: optionLabel,
              className: option.className,
              option: option,
              onClick: _this3.onOptionClick,
              template: _this3.props.itemTemplate,
              selected: _this3.isSelected(option),
              tabIndex: tabIndex,
              disabled: isDisabled,
              ariaLabelledBy: _this3.props.ariaLabelledBy
            });
          });
        }

        return null;
      }
    }, {
      key: "render",
      value: function render() {
        var _this4 = this;

        var className = core.classNames('p-selectbutton p-buttonset p-component', this.props.className);
        var items = this.renderItems();
        return /*#__PURE__*/React__default['default'].createElement("div", {
          id: this.props.id,
          ref: function ref(el) {
            return _this4.element = el;
          },
          className: className,
          style: this.props.style,
          role: "group"
        }, items);
      }
    }]);

    return SelectButton;
  }(React.Component);

  _defineProperty(SelectButton, "defaultProps", {
    id: null,
    value: null,
    options: null,
    optionLabel: null,
    optionValue: null,
    optionDisabled: null,
    tabIndex: null,
    multiple: false,
    unselectable: true,
    disabled: false,
    style: null,
    className: null,
    dataKey: null,
    tooltip: null,
    tooltipOptions: null,
    ariaLabelledBy: null,
    itemTemplate: null,
    onChange: null
  });

  exports.SelectButton = SelectButton;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

}({}, React, primereact.core));
