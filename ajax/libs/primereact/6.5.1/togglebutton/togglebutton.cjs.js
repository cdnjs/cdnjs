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
var ToggleButton = /*#__PURE__*/function (_Component) {
  _inherits(ToggleButton, _Component);

  var _super = _createSuper(ToggleButton);

  function ToggleButton(props) {
    var _this;

    _classCallCheck(this, ToggleButton);

    _this = _super.call(this, props);
    _this.toggle = _this.toggle.bind(_assertThisInitialized(_this));
    _this.onKeyDown = _this.onKeyDown.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ToggleButton, [{
    key: "toggle",
    value: function toggle(e) {
      if (!this.props.disabled && this.props.onChange) {
        this.props.onChange({
          originalEvent: e,
          value: !this.props.checked,
          stopPropagation: function stopPropagation() {},
          preventDefault: function preventDefault() {},
          target: {
            name: this.props.name,
            id: this.props.id,
            value: !this.props.checked
          }
        });
      }
    }
  }, {
    key: "onKeyDown",
    value: function onKeyDown(event) {
      if (event.key === 'Enter') {
        this.toggle(event);
        event.preventDefault();
      }
    }
  }, {
    key: "hasLabel",
    value: function hasLabel() {
      return this.props.onLabel && this.props.onLabel.length > 0 && this.props.offLabel && this.props.offLabel.length > 0;
    }
  }, {
    key: "hasIcon",
    value: function hasIcon() {
      return this.props.onIcon && this.props.onIcon.length > 0 && this.props.offIcon && this.props.offIcon.length > 0;
    }
  }, {
    key: "getLabel",
    value: function getLabel() {
      return this.hasLabel() ? this.props.checked ? this.props.onLabel : this.props.offLabel : '&nbsp;';
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
        target: this.container,
        content: this.props.tooltip,
        options: this.props.tooltipOptions
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var className = core.classNames('p-button p-togglebutton p-component', {
        'p-button-icon-only': this.hasIcon() && !this.hasLabel(),
        'p-highlight': this.props.checked,
        'p-disabled': this.props.disabled
      }, this.props.className),
          iconClassName = null;
      var hasIcon = this.hasIcon();
      var label = this.getLabel();

      if (hasIcon) {
        iconClassName = core.classNames('p-button-icon p-c', {
          'p-button-icon-left': this.props.iconPos === 'left' && label,
          'p-button-icon-right': this.props.iconPos === 'right' && label
        }, this.props.checked ? this.props.onIcon : this.props.offIcon);
      }

      return /*#__PURE__*/React__default['default'].createElement("div", {
        ref: function ref(el) {
          return _this2.container = el;
        },
        id: this.props.id,
        className: className,
        style: this.props.style,
        onClick: this.toggle,
        onFocus: this.props.onFocus,
        onBlur: this.props.onBlur,
        onKeyDown: this.onKeyDown,
        tabIndex: !this.props.disabled && this.props.tabIndex,
        "aria-labelledby": this.props.ariaLabelledBy
      }, hasIcon && /*#__PURE__*/React__default['default'].createElement("span", {
        className: iconClassName
      }), /*#__PURE__*/React__default['default'].createElement("span", {
        className: "p-button-label"
      }, label), /*#__PURE__*/React__default['default'].createElement(core.Ripple, null));
    }
  }]);

  return ToggleButton;
}(React.Component);

_defineProperty(ToggleButton, "defaultProps", {
  id: null,
  onIcon: null,
  offIcon: null,
  onLabel: 'Yes',
  offLabel: 'No',
  iconPos: 'left',
  style: null,
  className: null,
  checked: false,
  tabIndex: 0,
  tooltip: null,
  tooltipOptions: null,
  ariaLabelledBy: null,
  onChange: null,
  onFocus: null,
  onBlur: null
});

exports.ToggleButton = ToggleButton;
