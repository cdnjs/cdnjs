'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var core = require('primereact/core');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

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
var Checkbox = /*#__PURE__*/function (_Component) {
  _inherits(Checkbox, _Component);

  var _super = _createSuper(Checkbox);

  function Checkbox(props) {
    var _this;

    _classCallCheck(this, Checkbox);

    _this = _super.call(this, props);
    _this.state = {
      focused: false
    };
    _this.onClick = _this.onClick.bind(_assertThisInitialized(_this));
    _this.onFocus = _this.onFocus.bind(_assertThisInitialized(_this));
    _this.onBlur = _this.onBlur.bind(_assertThisInitialized(_this));
    _this.onKeyDown = _this.onKeyDown.bind(_assertThisInitialized(_this));
    _this.inputRef = /*#__PURE__*/React.createRef(_this.props.inputRef);
    return _this;
  }

  _createClass(Checkbox, [{
    key: "onClick",
    value: function onClick(e) {
      if (!this.props.disabled && !this.props.readOnly && this.props.onChange) {
        var value = this.isChecked() ? this.props.falseValue : this.props.trueValue;
        this.props.onChange({
          originalEvent: e,
          value: this.props.value,
          checked: value,
          stopPropagation: function stopPropagation() {},
          preventDefault: function preventDefault() {},
          target: {
            type: 'checkbox',
            name: this.props.name,
            id: this.props.id,
            value: this.props.value,
            checked: value
          }
        });
        this.inputRef.current.checked = !this.isChecked();
        this.inputRef.current.focus();
        e.preventDefault();
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
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.tooltip) {
        this.tooltip.destroy();
        this.tooltip = null;
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      this.inputRef.current.checked = this.isChecked();

      if (prevProps.tooltip !== this.props.tooltip || prevProps.tooltipOptions !== this.props.tooltipOptions) {
        if (this.tooltip) this.tooltip.update(_objectSpread({
          content: this.props.tooltip
        }, this.props.tooltipOptions || {}));else this.renderTooltip();
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
      if (event.key === 'Enter') {
        this.onClick(event);
        event.preventDefault();
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
    key: "isChecked",
    value: function isChecked() {
      return this.props.checked === this.props.trueValue;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var containerClass = core.classNames('p-checkbox p-component', {
        'p-checkbox-checked': this.isChecked(),
        'p-checkbox-disabled': this.props.disabled,
        'p-checkbox-focused': this.state.focused
      }, this.props.className);
      var boxClass = core.classNames('p-checkbox-box', {
        'p-highlight': this.isChecked(),
        'p-disabled': this.props.disabled,
        'p-focus': this.state.focused
      });
      var iconClass = core.classNames('p-checkbox-icon p-c', _defineProperty({}, this.props.icon, this.isChecked()));
      return /*#__PURE__*/React__default['default'].createElement("div", {
        ref: function ref(el) {
          return _this2.element = el;
        },
        id: this.props.id,
        className: containerClass,
        style: this.props.style,
        onClick: this.onClick,
        onContextMenu: this.props.onContextMenu,
        onMouseDown: this.props.onMouseDown
      }, /*#__PURE__*/React__default['default'].createElement("div", {
        className: "p-hidden-accessible"
      }, /*#__PURE__*/React__default['default'].createElement("input", {
        ref: this.inputRef,
        type: "checkbox",
        "aria-labelledby": this.props.ariaLabelledBy,
        id: this.props.inputId,
        name: this.props.name,
        tabIndex: this.props.tabIndex,
        defaultChecked: this.isChecked(),
        onKeyDown: this.onKeyDown,
        onFocus: this.onFocus,
        onBlur: this.onBlur,
        disabled: this.props.disabled,
        readOnly: this.props.readOnly,
        required: this.props.required
      })), /*#__PURE__*/React__default['default'].createElement("div", {
        className: boxClass,
        ref: function ref(el) {
          return _this2.box = el;
        },
        role: "checkbox",
        "aria-checked": this.isChecked()
      }, /*#__PURE__*/React__default['default'].createElement("span", {
        className: iconClass
      })));
    }
  }]);

  return Checkbox;
}(React.Component);

_defineProperty(Checkbox, "defaultProps", {
  id: null,
  inputRef: null,
  inputId: null,
  value: null,
  name: null,
  checked: false,
  trueValue: true,
  falseValue: false,
  style: null,
  className: null,
  disabled: false,
  required: false,
  readOnly: false,
  tabIndex: null,
  icon: 'pi pi-check',
  tooltip: null,
  tooltipOptions: null,
  ariaLabelledBy: null,
  onChange: null,
  onMouseDown: null,
  onContextMenu: null
});

exports.Checkbox = Checkbox;
