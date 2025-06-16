'use client';
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var api = require('primereact/api');
var componentbase = require('primereact/componentbase');
var hooks = require('primereact/hooks');
var ripple = require('primereact/ripple');
var tooltip = require('primereact/tooltip');
var utils = require('primereact/utils');

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
  return _extends = Object.assign ? Object.assign.bind() : function (n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}

function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}

function toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}

function toPropertyKey(t) {
  var i = toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}

function _defineProperty(e, r, t) {
  return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}

var classes = {
  root: function root(_ref) {
    var props = _ref.props;
    return utils.classNames('p-togglebutton p-component', {
      'p-disabled': props.disabled,
      'p-highlight': props.checked,
      'p-invalid': props.invalid
    });
  },
  input: 'p-togglebutton-input',
  box: function box(_ref2) {
    var hasIcon = _ref2.hasIcon,
      hasLabel = _ref2.hasLabel;
    return utils.classNames('p-button p-component', {
      'p-button-icon-only': hasIcon && !hasLabel
    });
  },
  icon: function icon(_ref3) {
    var props = _ref3.props,
      label = _ref3.label;
    return utils.classNames('p-button-icon', {
      'p-button-icon-left': props.iconPos === 'left' && label,
      'p-button-icon-right': props.iconPos === 'right' && label
    });
  },
  label: 'p-button-label'
};
var ToggleButtonBase = componentbase.ComponentBase.extend({
  defaultProps: {
    __TYPE: 'ToggleButton',
    id: null,
    onIcon: null,
    offIcon: null,
    onLabel: 'Yes',
    offLabel: 'No',
    iconPos: 'left',
    invalid: false,
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
  },
  css: {
    classes: classes
  }
});

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var ToggleButton = /*#__PURE__*/React__namespace.memo(/*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
  var mergeProps = hooks.useMergeProps();
  var context = React__namespace.useContext(api.PrimeReactContext);
  var props = ToggleButtonBase.getProps(inProps, context);
  var elementRef = React__namespace.useRef(null);
  var _ToggleButtonBase$set = ToggleButtonBase.setMetaData({
      props: props
    }),
    ptm = _ToggleButtonBase$set.ptm,
    cx = _ToggleButtonBase$set.cx,
    isUnstyled = _ToggleButtonBase$set.isUnstyled;
  componentbase.useHandleStyle(ToggleButtonBase.css.styles, isUnstyled, {
    name: 'togglebutton'
  });
  var hasLabel = props.onLabel && props.onLabel.length > 0 && props.offLabel && props.offLabel.length > 0;
  var hasIcon = props.onIcon && props.offIcon;
  var label = hasLabel ? props.checked ? props.onLabel : props.offLabel : "\xA0";
  var icon = props.checked ? props.onIcon : props.offIcon;
  var toggle = function toggle(e) {
    if (!props.disabled && props.onChange && !props.readonly) {
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
  var onFocus = function onFocus(event) {
    var _props$onFocus;
    props === null || props === void 0 || (_props$onFocus = props.onFocus) === null || _props$onFocus === void 0 || _props$onFocus.call(props, event);
  };
  var onBlur = function onBlur(event) {
    var _props$onBlur;
    props === null || props === void 0 || (_props$onBlur = props.onBlur) === null || _props$onBlur === void 0 || _props$onBlur.call(props, event);
  };
  var createIcon = function createIcon() {
    if (hasIcon) {
      var iconProps = mergeProps({
        className: cx('icon', {
          label: label
        })
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
  var iconElement = createIcon();
  var labelProps = mergeProps({
    className: cx('label')
  }, ptm('label'));
  var rootProps = mergeProps({
    ref: elementRef,
    id: props.id,
    className: utils.classNames(props.className, cx('root', {
      hasIcon: hasIcon,
      hasLabel: hasLabel
    })),
    'data-p-highlight': props.checked,
    'data-p-disabled': props.disabled
  }, ToggleButtonBase.getOtherProps(props), ptm('root'));
  var inputProps = mergeProps({
    id: props.inputId,
    className: cx('input'),
    style: props.style,
    onChange: toggle,
    onFocus: onFocus,
    onBlur: onBlur,
    onKeyDown: onKeyDown,
    tabIndex: tabIndex,
    role: 'switch',
    type: 'checkbox',
    'aria-pressed': props.checked,
    'aria-invalid': props.invalid,
    disabled: props.disabled,
    readOnly: props.readonly,
    value: props.checked,
    checked: props.checked
  }, ptm('input'));
  var boxProps = mergeProps({
    className: utils.classNames(props.className, cx('box', {
      hasIcon: hasIcon,
      hasLabel: hasLabel
    }))
  }, ptm('box'));
  return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("div", rootProps, /*#__PURE__*/React__namespace.createElement("input", inputProps), /*#__PURE__*/React__namespace.createElement("div", boxProps, iconElement, /*#__PURE__*/React__namespace.createElement("span", labelProps, label), /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null))), hasTooltip && /*#__PURE__*/React__namespace.createElement(tooltip.Tooltip, _extends({
    target: elementRef,
    content: props.tooltip,
    pt: ptm('tooltip')
  }, props.tooltipOptions)));
}));
ToggleButton.displayName = 'ToggleButton';

exports.ToggleButton = ToggleButton;
