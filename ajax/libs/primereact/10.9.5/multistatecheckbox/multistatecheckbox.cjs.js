'use client';
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var api = require('primereact/api');
var componentbase = require('primereact/componentbase');
var hooks = require('primereact/hooks');
var check = require('primereact/icons/check');
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

function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}

function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}

function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}

function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}

var classes$1 = {
  box: 'p-checkbox-box',
  input: 'p-checkbox-input',
  icon: 'p-checkbox-icon',
  root: function root(_ref) {
    var props = _ref.props,
      checked = _ref.checked,
      context = _ref.context;
    return utils.classNames('p-checkbox p-component', {
      'p-highlight': checked,
      'p-disabled': props.disabled,
      'p-invalid': props.invalid,
      'p-variant-filled': props.variant ? props.variant === 'filled' : context && context.inputStyle === 'filled'
    });
  }
};
var CheckboxBase = componentbase.ComponentBase.extend({
  defaultProps: {
    __TYPE: 'Checkbox',
    autoFocus: false,
    checked: false,
    className: null,
    disabled: false,
    falseValue: false,
    icon: null,
    id: null,
    inputId: null,
    inputRef: null,
    invalid: false,
    variant: null,
    name: null,
    onChange: null,
    onContextMenu: null,
    onMouseDown: null,
    readOnly: false,
    required: false,
    style: null,
    tabIndex: null,
    tooltip: null,
    tooltipOptions: null,
    trueValue: true,
    value: null,
    children: undefined
  },
  css: {
    classes: classes$1
  }
});

function ownKeys$1(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$1(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$1(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var Checkbox = /*#__PURE__*/React__namespace.memo(/*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
  var mergeProps = hooks.useMergeProps();
  var context = React__namespace.useContext(api.PrimeReactContext);
  var props = CheckboxBase.getProps(inProps, context);
  var _React$useState = React__namespace.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    focusedState = _React$useState2[0],
    setFocusedState = _React$useState2[1];
  var _CheckboxBase$setMeta = CheckboxBase.setMetaData({
      props: props,
      state: {
        focused: focusedState
      },
      context: {
        checked: props.checked === props.trueValue,
        disabled: props.disabled
      }
    }),
    ptm = _CheckboxBase$setMeta.ptm,
    cx = _CheckboxBase$setMeta.cx,
    isUnstyled = _CheckboxBase$setMeta.isUnstyled;
  componentbase.useHandleStyle(CheckboxBase.css.styles, isUnstyled, {
    name: 'checkbox'
  });
  var elementRef = React__namespace.useRef(null);
  var inputRef = React__namespace.useRef(props.inputRef);
  var isChecked = function isChecked() {
    return props.checked === props.trueValue;
  };
  var _onChange = function onChange(event) {
    if (props.disabled || props.readOnly) {
      return;
    }
    if (props.onChange) {
      var _props$onChange;
      var _checked = isChecked();
      var value = _checked ? props.falseValue : props.trueValue;
      var eventData = {
        originalEvent: event,
        value: props.value,
        checked: value,
        stopPropagation: function stopPropagation() {
          event === null || event === void 0 || event.stopPropagation();
        },
        preventDefault: function preventDefault() {
          event === null || event === void 0 || event.preventDefault();
        },
        target: {
          type: 'checkbox',
          name: props.name,
          id: props.id,
          value: props.value,
          checked: value
        }
      };
      props === null || props === void 0 || (_props$onChange = props.onChange) === null || _props$onChange === void 0 || _props$onChange.call(props, eventData);

      // do not continue if the user defined click wants to prevent
      if (event.defaultPrevented) {
        return;
      }
      utils.DomHandler.focus(inputRef.current);
    }
  };
  var _onFocus = function onFocus(event) {
    var _props$onFocus;
    setFocusedState(true);
    props === null || props === void 0 || (_props$onFocus = props.onFocus) === null || _props$onFocus === void 0 || _props$onFocus.call(props, event);
  };
  var _onBlur = function onBlur(event) {
    var _props$onBlur;
    setFocusedState(false);
    props === null || props === void 0 || (_props$onBlur = props.onBlur) === null || _props$onBlur === void 0 || _props$onBlur.call(props, event);
  };
  React__namespace.useImperativeHandle(ref, function () {
    return {
      props: props,
      focus: function focus() {
        return utils.DomHandler.focus(inputRef.current);
      },
      getElement: function getElement() {
        return elementRef.current;
      },
      getInput: function getInput() {
        return inputRef.current;
      }
    };
  });
  React__namespace.useEffect(function () {
    utils.ObjectUtils.combinedRefs(inputRef, props.inputRef);
  }, [inputRef, props.inputRef]);
  hooks.useUpdateEffect(function () {
    inputRef.current.checked = isChecked();
  }, [props.checked, props.trueValue]);
  hooks.useMountEffect(function () {
    if (props.autoFocus) {
      utils.DomHandler.focus(inputRef.current, props.autoFocus);
    }
  });
  var checked = isChecked();
  var hasTooltip = utils.ObjectUtils.isNotEmpty(props.tooltip);
  var otherProps = CheckboxBase.getOtherProps(props);
  var rootProps = mergeProps({
    id: props.id,
    className: utils.classNames(props.className, cx('root', {
      checked: checked,
      context: context
    })),
    style: props.style,
    'data-p-highlight': checked,
    'data-p-disabled': props.disabled,
    onContextMenu: props.onContextMenu,
    onMouseDown: props.onMouseDown
  }, otherProps, ptm('root'));
  var createInputElement = function createInputElement() {
    var ariaProps = utils.ObjectUtils.reduceKeys(otherProps, utils.DomHandler.ARIA_PROPS);
    var inputProps = mergeProps(_objectSpread$1({
      id: props.inputId,
      type: 'checkbox',
      className: cx('input'),
      name: props.name,
      tabIndex: props.tabIndex,
      onFocus: function onFocus(e) {
        return _onFocus(e);
      },
      onBlur: function onBlur(e) {
        return _onBlur(e);
      },
      onChange: function onChange(e) {
        return _onChange(e);
      },
      disabled: props.disabled,
      readOnly: props.readOnly,
      required: props.required,
      'aria-invalid': props.invalid,
      checked: checked
    }, ariaProps), ptm('input'));
    return /*#__PURE__*/React__namespace.createElement("input", _extends({
      ref: inputRef
    }, inputProps));
  };
  var createBoxElement = function createBoxElement() {
    var iconProps = mergeProps({
      className: cx('icon')
    }, ptm('icon'));
    var boxProps = mergeProps({
      className: cx('box', {
        checked: checked
      }),
      'data-p-highlight': checked,
      'data-p-disabled': props.disabled
    }, ptm('box'));
    var icon = checked ? props.icon || /*#__PURE__*/React__namespace.createElement(check.CheckIcon, iconProps) : null;
    var checkboxIcon = utils.IconUtils.getJSXIcon(icon, _objectSpread$1({}, iconProps), {
      props: props,
      checked: checked
    });
    return /*#__PURE__*/React__namespace.createElement("div", boxProps, checkboxIcon);
  };
  return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("div", _extends({
    ref: elementRef
  }, rootProps), createInputElement(), createBoxElement()), hasTooltip && /*#__PURE__*/React__namespace.createElement(tooltip.Tooltip, _extends({
    target: elementRef,
    content: props.tooltip,
    pt: ptm('tooltip')
  }, props.tooltipOptions)));
}));
Checkbox.displayName = 'Checkbox';

var classes = {
  icon: function icon(_ref) {
    var _icon = _ref.icon;
    return utils.classNames('p-checkbox-icon p-c', _defineProperty({}, "".concat(_icon), true));
  },
  root: function root(_ref2) {
    var props = _ref2.props;
    return utils.classNames('p-multistatecheckbox p-checkbox p-component', props.classNames);
  }
};
var inlineStyles = {
  checkbox: function checkbox(_ref3) {
    var selectedOption = _ref3.selectedOption;
    return selectedOption && selectedOption.style;
  }
};
var MultiStateCheckboxBase = componentbase.ComponentBase.extend({
  defaultProps: {
    __TYPE: 'MultiStateCheckbox',
    autoFocus: false,
    className: null,
    dataKey: null,
    disabled: false,
    empty: true,
    iconTemplate: null,
    id: null,
    onChange: null,
    optionIcon: null,
    optionLabel: null,
    optionValue: null,
    options: null,
    readOnly: false,
    style: null,
    tabIndex: '0',
    tooltip: null,
    tooltipOptions: null,
    value: null,
    children: undefined
  },
  css: {
    classes: classes,
    inlineStyles: inlineStyles
  }
});

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var MultiStateCheckbox = /*#__PURE__*/React__namespace.memo(/*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
  var mergeProps = hooks.useMergeProps();
  var context = React__namespace.useContext(api.PrimeReactContext);
  var props = MultiStateCheckboxBase.getProps(inProps, context);
  var _React$useState = React__namespace.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    focusedState = _React$useState2[0],
    setFocusedState = _React$useState2[1];
  var elementRef = React__namespace.useRef(null);
  var equalityKey = props.optionValue ? null : props.dataKey;
  var _MultiStateCheckboxBa = MultiStateCheckboxBase.setMetaData({
      props: props,
      state: {
        focused: focusedState
      }
    }),
    ptm = _MultiStateCheckboxBa.ptm,
    cx = _MultiStateCheckboxBa.cx,
    sx = _MultiStateCheckboxBa.sx,
    isUnstyled = _MultiStateCheckboxBa.isUnstyled;
  componentbase.useHandleStyle(MultiStateCheckboxBase.css.styles, isUnstyled, {
    name: 'multistatecheckbox'
  });
  var onClick = function onClick(event) {
    if (!props.disabled && !props.readOnly) {
      toggle(event);
    }
  };
  var getOptionValue = function getOptionValue(option) {
    return props.optionValue ? utils.ObjectUtils.resolveFieldData(option, props.optionValue) : option;
  };
  var getOptionIcon = function getOptionIcon(option) {
    return utils.ObjectUtils.resolveFieldData(option, props.optionIcon || 'icon');
  };
  var getOptionAriaLabel = function getOptionAriaLabel(option) {
    var ariaField = props.optionLabel || props.optionValue;
    return ariaField ? utils.ObjectUtils.resolveFieldData(option, ariaField) : option;
  };
  var findNextOption = function findNextOption() {
    if (props.options) {
      return selectedOptionIndex === props.options.length - 1 ? props.empty ? null : props.options[0] : props.options[selectedOptionIndex + 1];
    }
    return null;
  };
  var toggle = function toggle(event) {
    if (props.onChange) {
      var newValue = getOptionValue(findNextOption());
      props.onChange({
        originalEvent: event,
        value: newValue,
        stopPropagation: function stopPropagation() {
          event === null || event === void 0 || event.stopPropagation();
        },
        preventDefault: function preventDefault() {
          event === null || event === void 0 || event.preventDefault();
        },
        target: {
          name: props.name,
          id: props.id,
          value: newValue
        }
      });
    }
  };
  var onFocus = function onFocus() {
    setFocusedState(true);
  };
  var onBlur = function onBlur() {
    setFocusedState(false);
  };
  var onKeyDown = function onKeyDown(e) {
    if (e.keyCode === 32) {
      toggle(e);
      e.preventDefault();
    }
  };
  var getSelectedOptionMap = function getSelectedOptionMap() {
    var option;
    var index;
    if (props.options) {
      index = props.options.findIndex(function (option) {
        return utils.ObjectUtils.equals(props.value, getOptionValue(option), equalityKey);
      });
      option = props.options[index];
    }
    return {
      option: option,
      index: index
    };
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
    if (!props.empty && props.value === null) {
      toggle();
    }
    if (props.autoFocus) {
      utils.DomHandler.focusFirstElement(elementRef.current);
    }
  });
  var createIcon = function createIcon() {
    var icon = selectedOption && getOptionIcon(selectedOption) || '';
    var className = utils.classNames('p-checkbox-icon p-c', _defineProperty({}, "".concat(icon), true));
    var iconProps = mergeProps({
      className: cx('icon', {
        icon: icon
      })
    }, ptm('icon'));
    var content = utils.IconUtils.getJSXIcon(icon, _objectSpread({}, iconProps), {
      props: props
    });
    if (props.iconTemplate) {
      var defaultOptions = {
        option: selectedOption,
        className: className,
        element: content,
        props: props
      };
      return utils.ObjectUtils.getJSXElement(props.iconTemplate, defaultOptions);
    }
    return content;
  };
  var _getSelectedOptionMap = getSelectedOptionMap(),
    selectedOption = _getSelectedOptionMap.option,
    selectedOptionIndex = _getSelectedOptionMap.index;
  var hasTooltip = utils.ObjectUtils.isNotEmpty(props.tooltip);
  var otherProps = MultiStateCheckboxBase.getOtherProps(props);
  var ariaProps = utils.ObjectUtils.reduceKeys(otherProps, utils.DomHandler.ARIA_PROPS);
  var icon = createIcon();
  var ariaValueLabel = selectedOption ? getOptionAriaLabel(selectedOption) : api.ariaLabel('nullLabel');
  var ariaChecked = selectedOption ? 'true' : 'false';
  var rootProps = mergeProps({
    ref: elementRef,
    id: props.id,
    className: utils.classNames(props.className, cx('root')),
    style: props.style,
    onClick: onClick
  }, MultiStateCheckboxBase.getOtherProps(props), ptm('root'));
  var checkboxProps = mergeProps(_objectSpread({
    className: utils.classNames(props.className),
    style: sx('checkbox', {
      selectedOption: selectedOption
    }),
    tabIndex: props.tabIndex,
    onFocus: onFocus,
    onBlur: onBlur,
    onKeyDown: onKeyDown,
    role: 'checkbox',
    'aria-checked': ariaChecked,
    onChange: onClick,
    checked: !!selectedOption,
    disabled: props === null || props === void 0 ? void 0 : props.disabled,
    icon: icon
  }, ariaProps), ptm('checkbox'));
  var srOnlyAriaProps = mergeProps({
    className: 'p-hidden-accessible',
    'aria-live': 'polite'
  }, ptm('srOnlyAria'));
  return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("div", rootProps, /*#__PURE__*/React__namespace.createElement(Checkbox, checkboxProps), focusedState && /*#__PURE__*/React__namespace.createElement("span", srOnlyAriaProps, ariaValueLabel)), hasTooltip && /*#__PURE__*/React__namespace.createElement(tooltip.Tooltip, _extends({
    target: elementRef,
    content: props.tooltip,
    pt: ptm('tooltip')
  }, props.tooltipOptions)));
}));
MultiStateCheckbox.displayName = 'MultiStateCheckbox';

exports.MultiStateCheckbox = MultiStateCheckbox;
