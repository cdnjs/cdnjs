this.primereact = this.primereact || {};
this.primereact.togglebutton = (function (exports, React, hooks, ripple, tooltip, utils, componentbase, api) {
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

  var ToggleButtonBase = componentbase.ComponentBase.extend({
    defaultProps: {
      __TYPE: 'ToggleButton',
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
      onChange: null,
      onFocus: null,
      onBlur: null,
      children: undefined
    }
  });

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
  var ToggleButton = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
    var context = React__namespace.useContext(api.PrimeReactContext);
    var props = ToggleButtonBase.getProps(inProps, context);
    var elementRef = React__namespace.useRef(null);
    var _ToggleButtonBase$set = ToggleButtonBase.setMetaData({
        props: props
      }),
      ptm = _ToggleButtonBase$set.ptm;
    var hasLabel = props.onLabel && props.onLabel.length > 0 && props.offLabel && props.offLabel.length > 0;
    var hasIcon = props.onIcon && props.onIcon.length > 0 && props.offIcon && props.offIcon.length > 0;
    var label = hasLabel ? props.checked ? props.onLabel : props.offLabel : '&nbsp;';
    var icon = props.checked ? props.onIcon : props.offIcon;
    var toggle = function toggle(e) {
      if (!props.disabled && props.onChange) {
        props.onChange({
          originalEvent: e,
          value: !props.checked,
          stopPropagation: function stopPropagation() {
            e.stopPropagation();
          },
          preventDefault: function preventDefault() {
            e.preventDefault();
          },
          target: {
            name: props.name,
            id: props.id,
            value: !props.checked
          }
        });
      }
    };
    var onKeyDown = function onKeyDown(event) {
      if (event.keyCode === 32) {
        toggle(event);
        event.preventDefault();
      }
    };
    var createIcon = function createIcon() {
      if (hasIcon) {
        var iconClassName = utils.classNames('p-button-icon p-c', {
          'p-button-icon-left': props.iconPos === 'left' && label,
          'p-button-icon-right': props.iconPos === 'right' && label
        });
        var iconProps = utils.mergeProps({
          className: iconClassName
        }, ptm('icon'));
        return utils.IconUtils.getJSXIcon(icon, _objectSpread({}, iconProps), {
          props: props
        });
      }
      return null;
    };
    React__namespace.useImperativeHandle(ref, function () {
      return {
        props: props,
        focus: function focus() {
          return utils.DomHandler.focusFirstElement(elementRef.current);
        },
        getElement: function getElement() {
          return elementRef.current;
        }
      };
    });
    hooks.useMountEffect(function () {
      if (props.autoFocus) {
        utils.DomHandler.focusFirstElement(elementRef.current);
      }
    });
    var hasTooltip = utils.ObjectUtils.isNotEmpty(props.tooltip);
    var tabIndex = props.disabled ? -1 : props.tabIndex;
    var className = utils.classNames('p-button p-togglebutton p-component', {
      'p-button-icon-only': hasIcon && !hasLabel,
      'p-highlight': props.checked,
      'p-disabled': props.disabled
    }, props.className);
    var iconElement = createIcon();
    var labelProps = utils.mergeProps({
      className: 'p-button-label'
    }, ptm('label'));
    var rootProps = utils.mergeProps({
      ref: elementRef,
      id: props.id,
      className: className,
      style: props.style,
      onClick: toggle,
      onFocus: props.onFocus,
      onBlur: props.onBlur,
      onKeyDown: onKeyDown,
      tabIndex: tabIndex,
      role: 'button',
      'aria-pressed': props.checked
    }, ToggleButtonBase.getOtherProps(props), ptm('root'));
    return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("div", rootProps, iconElement, /*#__PURE__*/React__namespace.createElement("span", labelProps, label), /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null)), hasTooltip && /*#__PURE__*/React__namespace.createElement(tooltip.Tooltip, _extends({
      target: elementRef,
      content: props.tooltip
    }, props.tooltipOptions, {
      pt: ptm('tooltip')
    })));
  }));
  ToggleButton.displayName = 'ToggleButton';

  exports.ToggleButton = ToggleButton;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.hooks, primereact.ripple, primereact.tooltip, primereact.utils, primereact.componentbase, primereact.api);
