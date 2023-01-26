this.primereact = this.primereact || {};
this.primereact.button = (function (exports, React, ripple, tooltip, utils) {
  'use strict';

  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () { return e[k]; }
          });
        }
      });
    }
    n["default"] = e;
    return Object.freeze(n);
  }

  var React__namespace = /*#__PURE__*/_interopNamespace(React);

  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function (target) {
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

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }

  function _toPrimitive(input, hint) {
    if (_typeof(input) !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (_typeof(res) !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }

  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return _typeof(key) === "symbol" ? key : String(key);
  }

  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
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

  var Button = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
    var elementRef = React__namespace.useRef(ref);
    React__namespace.useEffect(function () {
      utils.ObjectUtils.combinedRefs(elementRef, ref);
    }, [elementRef, ref]);
    if (props.visible === false) {
      return null;
    }
    var createIcon = function createIcon() {
      var icon = props.loading ? props.loadingIcon : props.icon;
      var className = utils.classNames('p-button-icon p-c', _defineProperty({
        'p-button-loading-icon': props.loading
      }, "p-button-icon-".concat(props.iconPos), props.label));
      return utils.IconUtils.getJSXIcon(icon, {
        className: className
      }, {
        props: props
      });
    };
    var createLabel = function createLabel() {
      if (props.label) {
        return /*#__PURE__*/React__namespace.createElement("span", {
          className: "p-button-label p-c"
        }, props.label);
      }
      return !props.children && !props.label && /*#__PURE__*/React__namespace.createElement("span", {
        className: "p-button-label p-c",
        dangerouslySetInnerHTML: {
          __html: '&nbsp;'
        }
      });
    };
    var createBadge = function createBadge() {
      if (props.badge) {
        var badgeClassName = utils.classNames('p-badge', props.badgeClassName);
        return /*#__PURE__*/React__namespace.createElement("span", {
          className: badgeClassName
        }, props.badge);
      }
      return null;
    };
    var disabled = props.disabled || props.loading;
    var showTooltip = !disabled || props.tooltipOptions && props.tooltipOptions.showOnDisabled;
    var hasTooltip = utils.ObjectUtils.isNotEmpty(props.tooltip) && showTooltip;
    var otherProps = utils.ObjectUtils.findDiffKeys(props, Button.defaultProps);
    var className = utils.classNames('p-button p-component', props.className, _defineProperty({
      'p-button-icon-only': (props.icon || props.loading && props.loadingIcon) && !props.label && !props.children,
      'p-button-vertical': (props.iconPos === 'top' || props.iconPos === 'bottom') && props.label,
      'p-disabled': disabled,
      'p-button-loading': props.loading,
      'p-button-loading-label-only': props.loading && !props.icon && props.label
    }, "p-button-loading-".concat(props.iconPos), props.loading && props.loadingIcon && props.label));
    var icon = createIcon();
    var label = createLabel();
    var badge = createBadge();
    var defaultAriaLabel = props.label ? props.label + (props.badge ? ' ' + props.badge : '') : props['aria-label'];
    return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("button", _extends({
      ref: elementRef,
      "aria-label": defaultAriaLabel
    }, otherProps, {
      className: className,
      disabled: disabled
    }), icon, label, props.children, badge, /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null)), hasTooltip && /*#__PURE__*/React__namespace.createElement(tooltip.Tooltip, _extends({
      target: elementRef,
      content: props.tooltip
    }, props.tooltipOptions)));
  }));
  Button.displayName = 'Button';
  Button.defaultProps = {
    __TYPE: 'Button',
    label: null,
    icon: null,
    iconPos: 'left',
    badge: null,
    badgeClassName: null,
    tooltip: null,
    tooltipOptions: null,
    disabled: false,
    loading: false,
    loadingIcon: 'pi pi-spinner pi-spin',
    visible: true
  };

  exports.Button = Button;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.ripple, primereact.tooltip, primereact.utils);
