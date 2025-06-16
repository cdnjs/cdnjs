'use client';
import * as React from 'react';
import { PrimeReactContext } from 'primereact/api';
import { ComponentBase, useHandleStyle } from 'primereact/componentbase';
import { useMergeProps, useMountEffect } from 'primereact/hooks';
import { Tooltip } from 'primereact/tooltip';
import { classNames, DomHandler, ObjectUtils } from 'primereact/utils';

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
    var props = _ref.props,
      checked = _ref.checked;
    return classNames('p-inputswitch p-component', {
      'p-highlight': checked,
      'p-disabled': props.disabled,
      'p-invalid': props.invalid
    });
  },
  input: 'p-inputswitch-input',
  slider: 'p-inputswitch-slider'
};
var InputSwitchBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'InputSwitch',
    autoFocus: false,
    checked: false,
    className: null,
    disabled: false,
    falseValue: false,
    id: null,
    inputId: null,
    inputRef: null,
    invalid: false,
    name: null,
    onBlur: null,
    onChange: null,
    onFocus: null,
    style: null,
    tabIndex: null,
    tooltip: null,
    tooltipOptions: null,
    trueValue: true,
    children: undefined
  },
  css: {
    classes: classes
  }
});

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var InputSwitch = /*#__PURE__*/React.memo(/*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var mergeProps = useMergeProps();
  var context = React.useContext(PrimeReactContext);
  var props = InputSwitchBase.getProps(inProps, context);
  var _InputSwitchBase$setM = InputSwitchBase.setMetaData({
      props: props
    }),
    ptm = _InputSwitchBase$setM.ptm,
    cx = _InputSwitchBase$setM.cx,
    isUnstyled = _InputSwitchBase$setM.isUnstyled;
  useHandleStyle(InputSwitchBase.css.styles, isUnstyled, {
    name: 'inputswitch'
  });
  var elementRef = React.useRef(null);
  var inputRef = React.useRef(props.inputRef);
  var checked = props.checked === props.trueValue;
  var onChange = function onChange(event) {
    if (props.onChange) {
      var value = checked ? props.falseValue : props.trueValue;
      props.onChange({
        originalEvent: event,
        value: value,
        stopPropagation: function stopPropagation() {
          event === null || event === void 0 || event.stopPropagation();
        },
        preventDefault: function preventDefault() {
          event === null || event === void 0 || event.preventDefault();
        },
        target: {
          name: props.name,
          id: props.id,
          value: value
        }
      });
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
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      focus: function focus() {
        return DomHandler.focus(inputRef.current);
      },
      getElement: function getElement() {
        return elementRef.current;
      },
      getInput: function getInput() {
        return inputRef.current;
      }
    };
  });
  React.useEffect(function () {
    ObjectUtils.combinedRefs(inputRef, props.inputRef);
  }, [inputRef, props.inputRef]);
  useMountEffect(function () {
    if (props.autoFocus) {
      DomHandler.focus(inputRef.current, props.autoFocus);
    }
  });
  var hasTooltip = ObjectUtils.isNotEmpty(props.tooltip);
  var otherProps = InputSwitchBase.getOtherProps(props);
  var ariaProps = ObjectUtils.reduceKeys(otherProps, DomHandler.ARIA_PROPS);
  var rootProps = mergeProps({
    className: classNames(props.className, cx('root', {
      checked: checked
    })),
    style: props.style,
    role: 'checkbox',
    'aria-checked': checked,
    'data-p-highlight': checked,
    'data-p-disabled': props.disabled
  }, otherProps, ptm('root'));
  var inputProps = mergeProps(_objectSpread({
    type: 'checkbox',
    id: props.inputId,
    name: props.name,
    checked: checked,
    onChange: onChange,
    onFocus: onFocus,
    onBlur: onBlur,
    disabled: props.disabled,
    role: 'switch',
    tabIndex: props.tabIndex,
    'aria-checked': checked,
    className: cx('input')
  }, ariaProps), ptm('input'));
  var sliderProps = mergeProps({
    className: cx('slider')
  }, ptm('slider'));
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", _extends({
    id: props.id,
    ref: elementRef
  }, rootProps), /*#__PURE__*/React.createElement("input", _extends({
    ref: inputRef
  }, inputProps)), /*#__PURE__*/React.createElement("span", sliderProps)), hasTooltip && /*#__PURE__*/React.createElement(Tooltip, _extends({
    target: elementRef,
    content: props.tooltip,
    pt: ptm('tooltip')
  }, props.tooltipOptions)));
}));
InputSwitch.displayName = 'InputSwitch';

export { InputSwitch };
