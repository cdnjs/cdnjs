'use client';
import React, { useRef, useContext, useState } from 'react';
import { PrimeReactContext, ariaLabel } from 'primereact/api';
import { ComponentBase, useHandleStyle } from 'primereact/componentbase';
import { useMergeProps, useUpdateEffect } from 'primereact/hooks';
import { InputText } from 'primereact/inputtext';
import { ObjectUtils } from 'primereact/utils';

function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function (n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}

function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}

function _arrayWithoutHoles(r) {
  if (Array.isArray(r)) return _arrayLikeToArray(r);
}

function _iterableToArray(r) {
  if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}

function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(r) {
  return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
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

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
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
  root: 'p-inputotp p-component',
  input: 'p-inputotp-input'
};
var InputOtpBase = ComponentBase.extend({
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
var InputOtp = /*#__PURE__*/React.memo(/*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var _props$value, _props$value$split;
  var elementRef = useRef(ref);
  var mergeProps = useMergeProps();
  var context = useContext(PrimeReactContext);
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
  useHandleStyle(InputOtpBase.css.styles, isUnstyled, {
    name: 'inputotp'
  });
  var defaultValue = props.value ? (_props$value = props.value) === null || _props$value === void 0 || (_props$value = _props$value.toString()) === null || _props$value === void 0 || (_props$value$split = _props$value.split) === null || _props$value$split === void 0 ? void 0 : _props$value$split.call(_props$value, '') : new Array(props.length);
  var _useState = useState(defaultValue),
    _useState2 = _slicedToArray(_useState, 2),
    tokens = _useState2[0],
    setTokens = _useState2[1];
  var _findNextInput = function findNextInput(element) {
    var nextInput = element.nextElementSibling;
    if (!nextInput) return;
    return nextInput.nodeName === 'INPUT' ? nextInput : _findNextInput(nextInput);
  };
  var _findPrevInput = function findPrevInput(element) {
    var prevInput = element.previousElementSibling;
    if (!prevInput) return;
    return prevInput.nodeName === 'INPUT' ? prevInput : _findPrevInput(prevInput);
  };
  var moveToNextInput = function moveToNextInput(event) {
    var nextInput = _findNextInput(event.target);
    if (nextInput) {
      nextInput.focus();
      nextInput.select();
    }
  };
  var moveToPrevInput = function moveToPrevInput(event) {
    var prevInput = _findPrevInput(event.target);
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
    newTokens = newTokens.join('');
    newTokens = newTokens ? newTokens.split('') : new Array(props.length);
    setTokens(newTokens);
    onChange(event, newTokens);
  };
  var _onInput = function onInput(event, index) {
    if (props.disabled || props.readOnly) {
      return;
    }
    if (event.nativeEvent.inputType === 'insertFromPaste') {
      return; // handled in onPaste
    }
    updateTokens(event, index);
    if (event.nativeEvent.inputType === 'deleteContentBackward') {
      moveToPrevInput(event);
    } else if (event.nativeEvent.inputType === 'insertText') {
      moveToNextInput(event);
    }
  };
  var onPaste = function onPaste(event) {
    if (props.disabled || props.readOnly) {
      return;
    }
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
    if (props.disabled || props.readOnly) {
      return;
    }

    // special keys should be ignored, if it is CTRL+V is handled in onPaste
    if (event.altKey || event.ctrlKey || event.metaKey) {
      return;
    }
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
      case 'Delete':
        {
          event.preventDefault();
          var idx = Number(event.target.id);
          if (!Number.isNaN(idx) && !isAllEmpty(tokens, props.length)) {
            updateTokens(_objectSpread(_objectSpread({}, event), {}, {
              target: _objectSpread(_objectSpread({}, event.target), {}, {
                value: ''
              })
            }), idx);
            moveToNextInput(event);
          }
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
      case 'Tab':
      case 'NumpadEnter':
      case 'Enter':
        {
          break;
        }
      default:
        {
          //Prevent non-numeric characters from being entered if integerOnly is true or if the length of the input is greater than the specified length
          if (props !== null && props !== void 0 && props.integerOnly && !(event.code !== 'Space' && Number(event.key) >= 0 && Number(event.key) <= 9) || tokens.join('').length >= props.length && event.code !== 'Delete') {
            event.preventDefault();
          }
          break;
        }
    }
  };
  var isAllEmpty = function isAllEmpty(arr, n) {
    return arr.length === n && arr.every(function (item) {
      return item === '' || item == null;
    });
  };
  useUpdateEffect(function () {
    var _props$value2, _props$value2$split;
    var value = props.value ? (_props$value2 = props.value) === null || _props$value2 === void 0 || (_props$value2 = _props$value2.toString()) === null || _props$value2 === void 0 || (_props$value2$split = _props$value2.split) === null || _props$value2$split === void 0 ? void 0 : _props$value2$split.call(_props$value2, '') : new Array(props.length);
    setTokens(value);
  }, [props.value]);
  var _createInputElements = function createInputElements(remainingInputs) {
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
    var inputElementProps = {
      value: tokens[inputElementIndex] || '',
      type: props !== null && props !== void 0 && props.mask ? 'password' : 'text',
      variant: props === null || props === void 0 ? void 0 : props.variant,
      readOnly: props === null || props === void 0 ? void 0 : props.readOnly,
      disabled: props === null || props === void 0 ? void 0 : props.disabled,
      tabIndex: props === null || props === void 0 ? void 0 : props.tabIndex,
      autoFocus: (props === null || props === void 0 ? void 0 : props.autoFocus) && inputElementIndex === 0,
      'aria-label': ariaLabel('otpLabel', {
        0: inputElementIndex + 1
      }),
      'data-index': inputElementIndex,
      className: cx('input')
    };
    var inputElement = props !== null && props !== void 0 && props.inputTemplate ? ObjectUtils.getJSXElement(props === null || props === void 0 ? void 0 : props.inputTemplate, {
      events: inputElementEvents,
      props: inputElementProps
    }) : /*#__PURE__*/React.createElement(InputText, _extends({}, inputElementProps, inputElementEvents, {
      invalid: props === null || props === void 0 ? void 0 : props.invalid,
      unstyled: props === null || props === void 0 ? void 0 : props.unstyled,
      pt: ptm('input'),
      inputMode: props !== null && props !== void 0 && props.integerOnly ? 'numeric' : 'text',
      key: inputElementIndex
    }));
    var inputElements = [inputElement].concat(_toConsumableArray(_createInputElements(remainingInputs - 1)));
    return inputElements.map(function (input, index) {
      return /*#__PURE__*/React.createElement(React.Fragment, {
        key: index
      }, input);
    });
  };
  var rootElementProps = mergeProps({
    className: cx('root'),
    ref: elementRef,
    style: props === null || props === void 0 ? void 0 : props.style
  }, ptm('root'));
  return /*#__PURE__*/React.createElement("div", rootElementProps, _createInputElements(props.length));
}));
InputOtp.displayName = 'InputOtp';

export { InputOtp };
