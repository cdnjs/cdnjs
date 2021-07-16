import React, { createRef, Component } from 'react';
import { ObjectUtils, tip, classNames } from 'primereact/core';

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
var MultiStateCheckbox = /*#__PURE__*/function (_Component) {
  _inherits(MultiStateCheckbox, _Component);

  var _super = _createSuper(MultiStateCheckbox);

  function MultiStateCheckbox(props) {
    var _this;

    _classCallCheck(this, MultiStateCheckbox);

    _this = _super.call(this, props);
    _this.state = {
      focused: false
    };
    _this.onClick = _this.onClick.bind(_assertThisInitialized(_this));
    _this.onFocus = _this.onFocus.bind(_assertThisInitialized(_this));
    _this.onBlur = _this.onBlur.bind(_assertThisInitialized(_this));
    _this.inputRef = /*#__PURE__*/createRef(_this.props.inputRef);
    return _this;
  }

  _createClass(MultiStateCheckbox, [{
    key: "onClick",
    value: function onClick(event) {
      if (!this.props.disabled && !this.props.readOnly) {
        this.toggle(event);
        this.inputRef.current.focus();
      }
    }
  }, {
    key: "getOptionValue",
    value: function getOptionValue(option) {
      return this.props.optionValue ? ObjectUtils.resolveFieldData(option, this.props.optionValue) : option;
    }
  }, {
    key: "equalityKey",
    value: function equalityKey() {
      return this.props.optionValue ? null : this.props.dataKey;
    }
  }, {
    key: "findSelectedOptionMap",
    value: function findSelectedOptionMap() {
      var _this2 = this;

      var option, index;

      if (this.props.options) {
        var key = this.equalityKey();
        index = this.props.options.findIndex(function (option) {
          return ObjectUtils.equals(_this2.props.value, _this2.getOptionValue(option), key);
        });
        option = this.props.options[index];
      }

      return {
        option: option,
        index: index
      };
    }
  }, {
    key: "findNextOption",
    value: function findNextOption() {
      if (this.props.options) {
        var _this$findSelectedOpt = this.findSelectedOptionMap(),
            index = _this$findSelectedOpt.index;

        return index === this.props.options.length - 1 ? this.props.empty ? null : this.props.options[0] : this.props.options[index + 1];
      }

      return null;
    }
  }, {
    key: "toggle",
    value: function toggle(event) {
      var newValue = this.getOptionValue(this.findNextOption());

      if (this.props.onChange) {
        this.props.onChange({
          originalEvent: event,
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

      if (this.props.tooltip && !this.props.disabled) {
        this.renderTooltip();
      }

      if (!this.props.empty && this.props.value === null) {
        this.toggle();
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
      this.tooltip = tip({
        target: this.element,
        content: this.props.tooltip,
        options: this.props.tooltipOptions
      });
    }
  }, {
    key: "renderIcon",
    value: function renderIcon(option) {
      var icon = option && option.icon || '';
      var className = classNames('p-checkbox-icon p-c', _defineProperty({}, "".concat(icon), true));
      var content = /*#__PURE__*/React.createElement("span", {
        className: className
      });

      if (this.props.iconTemplate) {
        var defaultOptions = {
          option: option,
          className: className,
          element: content,
          props: this.props
        };
        return ObjectUtils.getJSXElement(this.props.iconTemplate, defaultOptions);
      }

      return content;
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$findSelectedOpt2 = this.findSelectedOptionMap(),
          option = _this$findSelectedOpt2.option;

      var containerClassName = classNames('p-multistatecheckbox p-checkbox p-component', this.props.className);
      var boxClassName = classNames('p-checkbox-box', {
        'p-highlight': !!option,
        'p-disabled': this.props.disabled,
        'p-focus': this.state.focused
      }, option && option.className);
      var icon = this.renderIcon(option);
      return /*#__PURE__*/React.createElement("div", {
        ref: function ref(el) {
          return _this3.element = el;
        },
        id: this.props.id,
        className: containerClassName,
        style: this.props.style,
        onClick: this.onClick
      }, /*#__PURE__*/React.createElement("div", {
        className: "p-hidden-accessible"
      }, /*#__PURE__*/React.createElement("input", {
        ref: this.inputRef,
        type: "checkbox",
        "aria-labelledby": this.props.ariaLabelledBy,
        id: this.props.inputId,
        name: this.props.name,
        onFocus: this.onFocus,
        onBlur: this.onBlur,
        disabled: this.props.disabled,
        readOnly: this.props.readOnly,
        defaultChecked: !!option
      })), /*#__PURE__*/React.createElement("div", {
        className: boxClassName,
        ref: function ref(el) {
          return _this3.box = el;
        },
        role: "checkbox",
        "aria-checked": !!option,
        style: option && option.style
      }, icon));
    }
  }]);

  return MultiStateCheckbox;
}(Component);

_defineProperty(MultiStateCheckbox, "defaultProps", {
  id: null,
  inputRef: null,
  inputId: null,
  value: null,
  options: null,
  optionValue: null,
  iconTemplate: null,
  dataKey: null,
  name: null,
  style: null,
  className: null,
  disabled: false,
  readOnly: false,
  empty: true,
  tooltip: null,
  tooltipOptions: null,
  ariaLabelledBy: null,
  onChange: null
});

export { MultiStateCheckbox };
