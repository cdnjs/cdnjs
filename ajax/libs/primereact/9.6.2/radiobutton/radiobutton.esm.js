import * as React from 'react';
import { useMountEffect } from 'primereact/hooks';
import { Tooltip } from 'primereact/tooltip';
import { ObjectUtils, DomHandler, classNames, mergeProps } from 'primereact/utils';
import { ComponentBase } from 'primereact/componentbase';
import { PrimeReactContext } from 'primereact/api';

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

var RadioButtonBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'RadioButton',
    autoFocus: false,
    checked: false,
    className: null,
    disabled: false,
    id: null,
    inputId: null,
    inputRef: null,
    name: null,
    onChange: null,
    onClick: null,
    required: false,
    style: null,
    tabIndex: null,
    tooltip: null,
    tooltipOptions: null,
    value: null,
    children: undefined
  }
});

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var RadioButton = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var context = React.useContext(PrimeReactContext);
  var props = RadioButtonBase.getProps(inProps, context);
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    focusedState = _React$useState2[0],
    setFocusedState = _React$useState2[1];
  var elementRef = React.useRef(null);
  var inputRef = React.useRef(props.inputRef);
  var _RadioButtonBase$setM = RadioButtonBase.setMetaData({
      props: props,
      state: {
        focused: focusedState
      }
    }),
    ptm = _RadioButtonBase$setM.ptm;
  var select = function select(event) {
    onClick(event);
  };
  var onClick = function onClick(event) {
    if (props.disabled) {
      return;
    }
    if (props.onChange || props.onClick) {
      var checked = props.checked;
      var radioClicked = event.target instanceof HTMLDivElement;
      var inputClicked = event.target === inputRef.current;
      var isInputToggled = inputClicked && event.target.checked !== checked;
      var isRadioToggled = radioClicked && (DomHandler.hasClass(elementRef.current, 'p-radiobutton-checked') === checked ? !checked : false);
      if (isInputToggled || isRadioToggled) {
        var value = !checked;
        var eventData = {
          originalEvent: event,
          value: props.value,
          checked: value,
          stopPropagation: function stopPropagation() {
            event.stopPropagation();
          },
          preventDefault: function preventDefault() {
            event.preventDefault();
          },
          target: {
            type: 'radio',
            name: props.name,
            id: props.id,
            value: props.value,
            checked: value
          }
        };
        props.onClick && props.onClick(eventData);

        // do not continue if the user defined click wants to prevent
        if (event.defaultPrevented) {
          return;
        }
        props.onChange && props.onChange(eventData);
        if (isRadioToggled) {
          inputRef.current.checked = value;
        }
      }
      DomHandler.focus(inputRef.current);
      event.preventDefault();
    }
  };
  var onFocus = function onFocus() {
    setFocusedState(true);
  };
  var onBlur = function onBlur() {
    setFocusedState(false);
  };
  var onKeyDown = function onKeyDown(event) {
    if (event.code === 'Space' || event.key === ' ') {
      // event.key is for Android support
      onClick(event);
    }
  };
  React.useEffect(function () {
    if (inputRef.current) {
      inputRef.current.checked = props.checked;
    }
  }, [props.checked]);
  React.useEffect(function () {
    ObjectUtils.combinedRefs(inputRef, props.inputRef);
  }, [inputRef, props.inputRef]);
  useMountEffect(function () {
    if (props.autoFocus) {
      DomHandler.focus(inputRef.current, props.autoFocus);
    }
  });
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      select: select,
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
  var hasTooltip = ObjectUtils.isNotEmpty(props.tooltip);
  var otherProps = RadioButtonBase.getOtherProps(props);
  var ariaProps = ObjectUtils.reduceKeys(otherProps, DomHandler.ARIA_PROPS);
  var className = classNames('p-radiobutton p-component', {
    'p-radiobutton-checked': props.checked,
    'p-radiobutton-disabled': props.disabled,
    'p-radiobutton-focused': focusedState
  }, props.className);
  var boxClassName = classNames('p-radiobutton-box', {
    'p-highlight': props.checked,
    'p-disabled': props.disabled,
    'p-focus': focusedState
  });
  var rootProps = mergeProps({
    ref: elementRef,
    id: props.id,
    className: className,
    style: props.style,
    onClick: onClick
  }, RadioButtonBase.getOtherProps(props), ptm('root'));
  var hiddenInputWrapperProps = mergeProps({
    className: 'p-hidden-accessible'
  }, ptm('hiddenInputWrapper'));
  var hiddenInputProps = mergeProps(_objectSpread({
    ref: inputRef,
    id: props.inputId,
    type: 'radio',
    name: props.name,
    defaultChecked: props.checked,
    onFocus: onFocus,
    onBlur: onBlur,
    onKeyDown: onKeyDown,
    disabled: props.disabled,
    required: props.required,
    tabIndex: props.tabIndex
  }, ariaProps), ptm('hiddenInput'));
  var inputProps = mergeProps({
    className: boxClassName
  }, ptm('input'));
  var iconProps = mergeProps({
    className: 'p-radiobutton-icon'
  }, ptm('icon'));
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", rootProps, /*#__PURE__*/React.createElement("div", hiddenInputWrapperProps, /*#__PURE__*/React.createElement("input", hiddenInputProps)), /*#__PURE__*/React.createElement("div", inputProps, /*#__PURE__*/React.createElement("div", iconProps))), hasTooltip && /*#__PURE__*/React.createElement(Tooltip, _extends({
    target: elementRef,
    content: props.tooltip
  }, props.tooltipOptions, {
    pt: ptm('tooltip')
  })));
}));
RadioButton.displayName = 'RadioButton';

export { RadioButton };
