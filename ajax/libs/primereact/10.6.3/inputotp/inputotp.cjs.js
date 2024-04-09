'use client';
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var hooks = require('primereact/hooks');
var api = require('primereact/api');
var componentbase = require('primereact/componentbase');
var InputText = require('@/components/lib/inputtext/InputText');
var utils = require('primereact/utils');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

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

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _readOnlyError(name) {
  throw new TypeError("\"" + name + "\" is read-only");
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
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

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
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

var classes = {
  root: 'p-inputotp p-component',
  input: 'p-inputotp-input'
};
var InputOtpBase = componentbase.ComponentBase.extend({
  defaultProps: {
    __TYPE: 'InputOtp',
    __parentMetadata: null,
    className: null,
    modelValue: false,
    invalid: false,
    disabled: false,
    readOnly: false,
    variant: null,
    tabIndex: null,
    length: 4,
    mask: false,
    integerOnly: false
  },
  css: {
    classes: classes
  }
});

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var InputOtp = /*#__PURE__*/React__default["default"].memo( /*#__PURE__*/React__default["default"].forwardRef(function (inProps, ref) {
  var _props$value, _props$value$split;
  var elementRef = React.useRef(ref);
  var mergeProps = hooks.useMergeProps();
  var context = React.useContext(api.PrimeReactContext);
  var props = InputOtpBase.getProps(inProps, context);
  var _InputOtpBase$setMeta = InputOtpBase.setMetaData(_objectSpread(_objectSpread({
      props: props
    }, props.__parentMetadata), {}, {
      context: {
        disabled: props.disabled
      }
    })),
    ptm = _InputOtpBase$setMeta.ptm,
    cx = _InputOtpBase$setMeta.cx,
    isUnstyled = _InputOtpBase$setMeta.isUnstyled;
  componentbase.useHandleStyle(InputOtpBase.css.styles, isUnstyled, {
    name: 'inputotp'
  });
  var defaultValue = props.value ? (_props$value = props.value) === null || _props$value === void 0 || (_props$value = _props$value.toString()) === null || _props$value === void 0 || (_props$value$split = _props$value.split) === null || _props$value$split === void 0 ? void 0 : _props$value$split.call(_props$value, '') : new Array(props.length);
  var _useState = React.useState(defaultValue),
    _useState2 = _slicedToArray(_useState, 2),
    tokens = _useState2[0],
    setTokens = _useState2[1];
  var findNextInput = function findNextInput(element) {
    var nextInput = element.nextElementSibling;
    if (!nextInput) return;
    return nextInput.nodeName === 'INPUT' ? nextInput : findNextInput(nextInput);
  };
  var findPrevInput = function findPrevInput(element) {
    var prevInput = element.previousElementSibling;
    if (!prevInput) return;
    return prevInput.nodeName === 'INPUT' ? prevInput : findPrevInput(prevInput);
  };
  var moveToNextInput = function moveToNextInput(event) {
    var nextInput = findNextInput(event.target);
    if (nextInput) {
      nextInput.focus();
      nextInput.select();
    }
  };
  var moveToPrevInput = function moveToPrevInput(event) {
    var prevInput = findPrevInput(event.target);
    if (prevInput) {
      prevInput.focus();
      prevInput.select();
    }
  };
  var onChange = function onChange(event, value) {
    var _props$onChange;
    props === null || props === void 0 || (_props$onChange = props.onChange) === null || _props$onChange === void 0 || _props$onChange.call(props, {
      originalEvent: event,
      value: value.join('')
    });
  };
  var updateTokens = function updateTokens(event, index) {
    var inputValue = event.target.value;
    var newTokens = _toConsumableArray(tokens);
    newTokens[index] = inputValue;
    newTokens.join(''), _readOnlyError("newTokens");
    newTokens ? newTokens.split('') : new Array(props.length), _readOnlyError("newTokens");
    setTokens(newTokens);
    onChange(event, newTokens);
  };
  var _onInput = function onInput(event, index) {
    updateTokens(event, index);
    if (event.nativeEvent.inputType === 'deleteContentBackward') {
      moveToPrevInput(event);
    } else if (event.nativeEvent.inputType === 'insertText' || event.nativeEvent.inputType === 'deleteContentForward') {
      moveToNextInput(event);
    }
  };
  var onPaste = function onPaste(event) {
    var paste = event.clipboardData.getData('text');
    if (paste.length) {
      var pastedCode = paste.substring(0, props.length + 1);
      if (!props.integerOnly || !isNaN(pastedCode)) {
        var newTokens = pastedCode.split('');
        setTokens(newTokens);
        onChange(event, newTokens);
      }
    }
  };
  var onFocus = function onFocus(event) {
    var _props$focus;
    event.target.select();
    props === null || props === void 0 || (_props$focus = props.focus) === null || _props$focus === void 0 || _props$focus.call(props, event);
  };
  var onBlur = function onBlur(event) {
    var _props$blur;
    props === null || props === void 0 || (_props$blur = props.blur) === null || _props$blur === void 0 || _props$blur.call(props, event);
  };
  var onKeydown = function onKeydown(event) {
    switch (event.code) {
      case 'ArrowLeft':
        {
          moveToPrevInput(event);
          event.preventDefault();
          break;
        }
      case 'ArrowRight':
        {
          moveToNextInput(event);
          event.preventDefault();
          break;
        }
      case 'Backspace':
        {
          var _event$target;
          if (((_event$target = event.target) === null || _event$target === void 0 || (_event$target = _event$target.value) === null || _event$target === void 0 ? void 0 : _event$target.length) === 0) {
            moveToPrevInput(event);
            event.preventDefault();
          }
          break;
        }
      case 'ArrowUp':
      case 'ArrowDown':
        {
          event.preventDefault();
          break;
        }
      default:
        {
          // Prevent non-numeric characters from being entered if integerOnly is true or if the length of the input is greater than the specified length
          if (props !== null && props !== void 0 && props.integerOnly && !((event.code.startsWith('Digit') || event.code.startsWith('Numpad')) && Number(event.key) >= 0 && Number(event.key) <= 9) || tokens.join('').length >= props.length && event.code !== 'Delete') {
            event.preventDefault();
          }
          break;
        }
    }
  };
  var createInputElements = function createInputElements(remainingInputs) {
    if (remainingInputs <= 0) {
      return [];
    }
    var inputElementIndex = props.length - remainingInputs;
    var inputElementEvents = {
      onInput: function onInput(event) {
        return _onInput(event, inputElementIndex);
      },
      onKeyDown: onKeydown,
      onFocus: onFocus,
      onBlur: onBlur,
      onPaste: onPaste
    };
    var inputElementProps = mergeProps({
      id: inputElementIndex,
      key: inputElementIndex,
      value: tokens[inputElementIndex] || '',
      inputMode: props !== null && props !== void 0 && props.integerOnly ? 'numeric' : 'text',
      type: props !== null && props !== void 0 && props.mask ? 'password' : 'text',
      variant: props === null || props === void 0 ? void 0 : props.variant,
      readOnly: props === null || props === void 0 ? void 0 : props.readOnly,
      disabled: props === null || props === void 0 ? void 0 : props.disabled,
      invalid: props === null || props === void 0 ? void 0 : props.invalid,
      tabIndex: props === null || props === void 0 ? void 0 : props.tabIndex,
      unstyled: props === null || props === void 0 ? void 0 : props.unstyled,
      className: cx('input')
    }, ptm('input'));
    var inputElement = props !== null && props !== void 0 && props.inputTemplate ? utils.ObjectUtils.getJSXElement(props === null || props === void 0 ? void 0 : props.inputTemplate, {
      events: inputElementEvents,
      props: inputElementProps
    }) : /*#__PURE__*/React__default["default"].createElement(InputText.InputText, _extends({}, inputElementProps, inputElementEvents));
    var inputElements = [inputElement].concat(_toConsumableArray(createInputElements(remainingInputs - 1)));
    return inputElements;
  };
  var rootElementProps = mergeProps({
    className: cx('root'),
    ref: elementRef,
    style: props === null || props === void 0 ? void 0 : props.style
  }, ptm('root'));
  return /*#__PURE__*/React__default["default"].createElement("div", rootElementProps, createInputElements(props.length));
}));

exports.InputOtp = InputOtp;
