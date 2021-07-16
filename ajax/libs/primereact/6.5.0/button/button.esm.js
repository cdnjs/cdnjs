import React, { createRef, Component } from 'react';
import { tip, classNames, ObjectUtils, Ripple } from 'primereact/core';

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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var ButtonComponent = /*#__PURE__*/function (_Component) {
  _inherits(ButtonComponent, _Component);

  var _super = _createSuper(ButtonComponent);

  function ButtonComponent(props) {
    var _this;

    _classCallCheck(this, ButtonComponent);

    _this = _super.call(this, props);
    _this.elementRef = /*#__PURE__*/createRef(_this.props.forwardRef);
    return _this;
  }

  _createClass(ButtonComponent, [{
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
    key: "isDisabled",
    value: function isDisabled() {
      return this.props.disabled || this.props.loading;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.updateForwardRef();

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
      this.tooltip = tip({
        target: this.elementRef.current,
        content: this.props.tooltip,
        options: this.props.tooltipOptions
      });
    }
  }, {
    key: "renderIcon",
    value: function renderIcon() {
      var icon = this.props.loading ? this.props.loadingIcon : this.props.icon;
      var content = null;

      if (icon) {
        var _classNames;

        var iconType = _typeof(icon);

        var className = classNames('p-button-icon p-c', (_classNames = {
          'p-button-loading-icon': this.props.loading
        }, _defineProperty(_classNames, "".concat(icon), iconType === 'string'), _defineProperty(_classNames, 'p-button-icon-left', this.props.iconPos === 'left' && this.props.label), _defineProperty(_classNames, 'p-button-icon-right', this.props.iconPos === 'right' && this.props.label), _defineProperty(_classNames, 'p-button-icon-top', this.props.iconPos === 'top' && this.props.label), _defineProperty(_classNames, 'p-button-icon-bottom', this.props.iconPos === 'bottom' && this.props.label), _classNames));
        content = /*#__PURE__*/React.createElement("span", {
          className: className
        });

        if (iconType !== 'string') {
          var defaultContentOptions = {
            className: className,
            element: content,
            props: this.props
          };
          content = ObjectUtils.getJSXElement(icon, defaultContentOptions);
        }
      }

      return content;
    }
  }, {
    key: "renderLabel",
    value: function renderLabel() {
      if (this.props.label) {
        return /*#__PURE__*/React.createElement("span", {
          className: "p-button-label p-c"
        }, this.props.label);
      }

      return !this.props.children && !this.props.label && /*#__PURE__*/React.createElement("span", {
        className: "p-button-label p-c",
        dangerouslySetInnerHTML: {
          __html: "&nbsp;"
        }
      });
    }
  }, {
    key: "renderBadge",
    value: function renderBadge() {
      if (this.props.badge) {
        var badgeClassName = classNames('p-badge', this.props.badgeClassName);
        return /*#__PURE__*/React.createElement("span", {
          className: badgeClassName
        }, this.props.badge);
      }

      return null;
    }
  }, {
    key: "render",
    value: function render() {
      var disabled = this.isDisabled();
      var className = classNames('p-button p-component', this.props.className, _defineProperty({
        'p-button-icon-only': (this.props.icon || this.props.loading && this.props.loadingIcon) && !this.props.label,
        'p-button-vertical': (this.props.iconPos === 'top' || this.props.iconPos === 'bottom') && this.props.label,
        'p-disabled': disabled,
        'p-button-loading': this.props.loading,
        'p-button-loading-label-only': this.props.loading && !this.props.icon && this.props.label
      }, "p-button-loading-".concat(this.props.iconPos), this.props.loading && this.props.loadingIcon && this.props.label));
      var icon = this.renderIcon();
      var label = this.renderLabel();
      var badge = this.renderBadge();
      var buttonProps = ObjectUtils.findDiffKeys(this.props, ButtonComponent.defaultProps);
      return /*#__PURE__*/React.createElement("button", _extends({
        ref: this.elementRef
      }, buttonProps, {
        className: className,
        disabled: disabled
      }), icon, label, this.props.children, badge, /*#__PURE__*/React.createElement(Ripple, null));
    }
  }]);

  return ButtonComponent;
}(Component);

_defineProperty(ButtonComponent, "defaultProps", {
  label: null,
  icon: null,
  iconPos: 'left',
  badge: null,
  badgeClassName: null,
  tooltip: null,
  tooltipOptions: null,
  forwardRef: null,
  disabled: false,
  loading: false,
  loadingIcon: 'pi pi-spinner pi-spin'
});

var Button = /*#__PURE__*/React.forwardRef(function (props, ref) {
  return /*#__PURE__*/React.createElement(ButtonComponent, _extends({
    forwardRef: ref
  }, props));
});

export { Button, ButtonComponent };
