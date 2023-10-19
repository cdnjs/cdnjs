import * as React from 'react';
import { PrimeReactContext, ariaLabel } from 'primereact/api';
import { useMountEffect } from 'primereact/hooks';
import { CheckIcon } from 'primereact/icons/check';
import { TimesIcon } from 'primereact/icons/times';
import { Tooltip } from 'primereact/tooltip';
import { DomHandler, ObjectUtils, classNames, mergeProps, IconUtils } from 'primereact/utils';
import { ComponentBase } from 'primereact/componentbase';

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

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

var TriStateCheckboxBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'TriStateCheckbox',
    autoFocus: false,
    checkIcon: null,
    className: null,
    disabled: false,
    id: null,
    onChange: null,
    readOnly: false,
    style: null,
    tabIndex: '0',
    tooltip: null,
    tooltipOptions: null,
    uncheckIcon: null,
    value: null,
    children: undefined
  }
});

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var TriStateCheckbox = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var context = React.useContext(PrimeReactContext);
  var props = TriStateCheckboxBase.getProps(inProps, context);
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    focusedState = _React$useState2[0],
    setFocusedState = _React$useState2[1];
  var elementRef = React.useRef(null);
  var _TriStateCheckboxBase = TriStateCheckboxBase.setMetaData({
      props: props,
      state: {
        focused: focusedState
      }
    }),
    ptm = _TriStateCheckboxBase.ptm;
  var onClick = function onClick(event) {
    if (!props.disabled && !props.readOnly) {
      toggle(event);
    }
  };
  var toggle = function toggle(event) {
    var newValue;
    if (props.value === null || props.value === undefined) newValue = true;else if (props.value === true) newValue = false;else if (props.value === false) newValue = null;
    if (props.onChange) {
      props.onChange({
        originalEvent: event,
        value: newValue,
        stopPropagation: function stopPropagation() {
          event.stopPropagation();
        },
        preventDefault: function preventDefault() {
          event.preventDefault();
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
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      focus: function focus() {
        return DomHandler.focusFirstElement(elementRef.current);
      },
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  });
  useMountEffect(function () {
    if (props.autoFocus) {
      DomHandler.focusFirstElement(elementRef.current);
    }
  });
  var hasTooltip = ObjectUtils.isNotEmpty(props.tooltip);
  var otherProps = TriStateCheckboxBase.getOtherProps(props);
  var ariaProps = ObjectUtils.reduceKeys(otherProps, DomHandler.ARIA_PROPS);
  var className = classNames('p-tristatecheckbox p-checkbox p-component', props.className, {
    'p-checkbox-disabled': props.disabled
  });
  var boxClassName = classNames('p-checkbox-box', {
    'p-highlight': ObjectUtils.isNotEmpty(props.value),
    'p-disabled': props.disabled,
    'p-focus': focusedState
  });
  var iconClassName = 'p-checkbox-icon p-c';
  var checkIconProps = mergeProps({
    className: iconClassName
  }, ptm('checkIcon'));
  var uncheckIconProps = mergeProps({
    className: iconClassName
  }, ptm('uncheckIcon'));
  var icon;
  if (props.value === false) {
    icon = props.uncheckIcon || /*#__PURE__*/React.createElement(TimesIcon, uncheckIconProps);
  } else if (props.value === true) {
    icon = props.checkIcon || /*#__PURE__*/React.createElement(CheckIcon, checkIconProps);
  }
  var checkIcon = IconUtils.getJSXIcon(icon, _objectSpread({}, checkIconProps), {
    props: props
  });
  var ariaValueLabel = props.value ? ariaLabel('trueLabel') : props.value === false ? ariaLabel('falseLabel') : ariaLabel('nullLabel');
  var ariaChecked = props.value ? 'true' : 'false';
  var checkboxProps = mergeProps(_objectSpread({
    className: boxClassName,
    tabIndex: props.tabIndex,
    onFocus: onFocus,
    onBlur: onBlur,
    onKeyDown: onKeyDown,
    role: 'checkbox',
    'aria-checked': ariaChecked
  }, ariaProps), ptm('checkbox'));
  var srOnlyAriaProps = mergeProps({
    className: 'p-sr-only',
    'aria-live': 'polite'
  }, ptm('srOnlyAria'));
  var rootProps = mergeProps({
    ref: elementRef,
    id: props.id,
    className: className,
    style: props.style,
    onClick: onClick
  }, TriStateCheckboxBase.getOtherProps(props), ptm('root'));
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", rootProps, /*#__PURE__*/React.createElement("div", checkboxProps, checkIcon), focusedState && /*#__PURE__*/React.createElement("span", srOnlyAriaProps, ariaValueLabel)), hasTooltip && /*#__PURE__*/React.createElement(Tooltip, _extends({
    target: elementRef,
    content: props.tooltip
  }, props.tooltipOptions, {
    pt: ptm('tooltip')
  })));
}));
TriStateCheckbox.displayName = 'TriStateCheckbox';

export { TriStateCheckbox };
