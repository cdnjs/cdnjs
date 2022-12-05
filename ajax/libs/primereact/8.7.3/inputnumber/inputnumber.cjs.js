'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var hooks = require('primereact/hooks');
var inputtext = require('primereact/inputtext');
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

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
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
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) {
        ;
      }
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

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var InputNumber = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
  var _React$useState = React__namespace.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    focusedState = _React$useState2[0],
    setFocusedState = _React$useState2[1];
  var elementRef = React__namespace.useRef(null);
  var inputRef = React__namespace.useRef(null);
  var timer = React__namespace.useRef(null);
  var lastValue = React__namespace.useRef(null);
  var numberFormat = React__namespace.useRef(null);
  var groupChar = React__namespace.useRef(null);
  var prefixChar = React__namespace.useRef(null);
  var suffixChar = React__namespace.useRef(null);
  var isSpecialChar = React__namespace.useRef(null);
  var _numeral = React__namespace.useRef(null);
  var _group = React__namespace.useRef(null);
  var _minusSign = React__namespace.useRef(null);
  var _currency = React__namespace.useRef(null);
  var _decimal = React__namespace.useRef(null);
  var _suffix = React__namespace.useRef(null);
  var _prefix = React__namespace.useRef(null);
  var _index = React__namespace.useRef(null);
  var stacked = props.showButtons && props.buttonLayout === 'stacked';
  var horizontal = props.showButtons && props.buttonLayout === 'horizontal';
  var vertical = props.showButtons && props.buttonLayout === 'vertical';
  var inputMode = props.inputMode || (props.mode === 'decimal' && !props.minFractionDigits ? 'numeric' : 'decimal');
  var getOptions = function getOptions() {
    return {
      localeMatcher: props.localeMatcher,
      style: props.mode,
      currency: props.currency,
      currencyDisplay: props.currencyDisplay,
      useGrouping: props.useGrouping,
      minimumFractionDigits: props.minFractionDigits,
      maximumFractionDigits: props.maxFractionDigits
    };
  };
  var constructParser = function constructParser() {
    numberFormat.current = new Intl.NumberFormat(props.locale, getOptions());
    var numerals = _toConsumableArray(new Intl.NumberFormat(props.locale, {
      useGrouping: false
    }).format(9876543210)).reverse();
    var index = new Map(numerals.map(function (d, i) {
      return [d, i];
    }));
    _numeral.current = new RegExp("[".concat(numerals.join(''), "]"), 'g');
    _group.current = getGroupingExpression();
    _minusSign.current = getMinusSignExpression();
    _currency.current = getCurrencyExpression();
    _decimal.current = getDecimalExpression();
    _suffix.current = getSuffixExpression();
    _prefix.current = getPrefixExpression();
    _index.current = function (d) {
      return index.get(d);
    };
  };
  var escapeRegExp = function escapeRegExp(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  };
  var getDecimalExpression = function getDecimalExpression() {
    var formatter = new Intl.NumberFormat(props.locale, _objectSpread(_objectSpread({}, getOptions()), {}, {
      useGrouping: false
    }));
    return new RegExp("[".concat(formatter.format(1.1).replace(_currency.current, '').trim().replace(_numeral.current, ''), "]"), 'g');
  };
  var getGroupingExpression = function getGroupingExpression() {
    var formatter = new Intl.NumberFormat(props.locale, {
      useGrouping: true
    });
    groupChar.current = formatter.format(1000000).trim().replace(_numeral.current, '').charAt(0);
    return new RegExp("[".concat(groupChar.current, "]"), 'g');
  };
  var getMinusSignExpression = function getMinusSignExpression() {
    var formatter = new Intl.NumberFormat(props.locale, {
      useGrouping: false
    });
    return new RegExp("[".concat(formatter.format(-1).trim().replace(_numeral.current, ''), "]"), 'g');
  };
  var getCurrencyExpression = function getCurrencyExpression() {
    if (props.currency) {
      var formatter = new Intl.NumberFormat(props.locale, {
        style: 'currency',
        currency: props.currency,
        currencyDisplay: props.currencyDisplay,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
      return new RegExp("[".concat(formatter.format(1).replace(/\s/g, '').replace(_numeral.current, '').replace(_group.current, ''), "]"), 'g');
    }
    return new RegExp("[]", 'g');
  };
  var getPrefixExpression = function getPrefixExpression() {
    if (props.prefix) {
      prefixChar.current = props.prefix;
    } else {
      var formatter = new Intl.NumberFormat(props.locale, {
        style: props.mode,
        currency: props.currency,
        currencyDisplay: props.currencyDisplay
      });
      prefixChar.current = formatter.format(1).split('1')[0];
    }
    return new RegExp("".concat(escapeRegExp(prefixChar.current || '')), 'g');
  };
  var getSuffixExpression = function getSuffixExpression() {
    if (props.suffix) {
      suffixChar.current = props.suffix;
    } else {
      var formatter = new Intl.NumberFormat(props.locale, {
        style: props.mode,
        currency: props.currency,
        currencyDisplay: props.currencyDisplay,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
      suffixChar.current = formatter.format(1).split('1')[1];
    }
    return new RegExp("".concat(escapeRegExp(suffixChar.current || '')), 'g');
  };
  var formatValue = function formatValue(value) {
    if (value != null) {
      if (value === '-') {
        // Minus sign
        return value;
      }
      if (props.format) {
        var formatter = new Intl.NumberFormat(props.locale, getOptions());
        var _formattedValue = formatter.format(value);
        if (props.prefix) {
          _formattedValue = props.prefix + _formattedValue;
        }
        if (props.suffix) {
          _formattedValue = _formattedValue + props.suffix;
        }
        return _formattedValue;
      }
      return value.toString();
    }
    return '';
  };
  var parseValue = function parseValue(text) {
    var filteredText = text.replace(_suffix.current, '').replace(_prefix.current, '').trim().replace(/\s/g, '').replace(_currency.current, '').replace(_group.current, '').replace(_minusSign.current, '-').replace(_decimal.current, '.').replace(_numeral.current, _index.current);
    if (filteredText) {
      if (filteredText === '-')
        // Minus sign
        return filteredText;
      var parsedValue = +filteredText;
      return isNaN(parsedValue) ? null : parsedValue;
    }
    return null;
  };
  var repeat = function repeat(event, interval, dir) {
    var i = interval || 500;
    clearTimer();
    timer.current = setTimeout(function () {
      repeat(event, 40, dir);
    }, i);
    spin(event, dir);
  };
  var spin = function spin(event, dir) {
    if (inputRef.current) {
      var step = props.step * dir;
      var currentValue = parseValue(inputRef.current.value) || 0;
      var newValue = validateValue(currentValue + step);
      if (props.maxLength && props.maxLength < formatValue(newValue).length) {
        return;
      }

      // touch devices trigger the keyboard to display because of setSelectionRange
      !utils.DomHandler.isTouchDevice() && updateInput(newValue, null, 'spin');
      updateModel(event, newValue);
      handleOnChange(event, currentValue, newValue);
    }
  };
  var onUpButtonTouchStart = function onUpButtonTouchStart(event) {
    if (!props.disabled && !props.readOnly) {
      repeat(event, null, 1);
      event.preventDefault();
    }
  };
  var onUpButtonMouseDown = function onUpButtonMouseDown(event) {
    if (!props.disabled && !props.readOnly) {
      props.autoFocus && utils.DomHandler.focus(inputRef.current, props.autoFocus);
      repeat(event, null, 1);
      event.preventDefault();
    }
  };
  var onUpButtonTouchEnd = function onUpButtonTouchEnd() {
    if (!props.disabled && !props.readOnly) {
      clearTimer();
    }
  };
  var onUpButtonMouseUp = function onUpButtonMouseUp() {
    if (!props.disabled && !props.readOnly) {
      clearTimer();
    }
  };
  var onUpButtonMouseLeave = function onUpButtonMouseLeave() {
    if (!props.disabled && !props.readOnly) {
      clearTimer();
    }
  };
  var onUpButtonKeyUp = function onUpButtonKeyUp() {
    if (!props.disabled && !props.readOnly) {
      clearTimer();
    }
  };
  var onUpButtonKeyDown = function onUpButtonKeyDown(event) {
    if (!props.disabled && !props.readOnly && (event.keyCode === 32 || event.keyCode === 13)) {
      repeat(event, null, 1);
    }
  };
  var onDownButtonTouchStart = function onDownButtonTouchStart(event) {
    if (!props.disabled && !props.readOnly) {
      repeat(event, null, -1);
      event.preventDefault();
    }
  };
  var onDownButtonTouchEnd = function onDownButtonTouchEnd() {
    if (!props.disabled && !props.readOnly) {
      clearTimer();
    }
  };
  var onDownButtonMouseDown = function onDownButtonMouseDown(event) {
    if (!props.disabled && !props.readOnly) {
      props.autoFocus && utils.DomHandler.focus(inputRef.current, props.autoFocus);
      repeat(event, null, -1);
      event.preventDefault();
    }
  };
  var onDownButtonMouseUp = function onDownButtonMouseUp() {
    if (!props.disabled && !props.readOnly) {
      clearTimer();
    }
  };
  var onDownButtonMouseLeave = function onDownButtonMouseLeave() {
    if (!props.disabled && !props.readOnly) {
      clearTimer();
    }
  };
  var onDownButtonKeyUp = function onDownButtonKeyUp() {
    if (!props.disabled && !props.readOnly) {
      clearTimer();
    }
  };
  var onDownButtonKeyDown = function onDownButtonKeyDown(event) {
    if (!props.disabled && !props.readOnly && (event.keyCode === 32 || event.keyCode === 13)) {
      repeat(event, null, -1);
    }
  };
  var onInput = function onInput(event) {
    if (props.disabled || props.readOnly) {
      return;
    }
    if (isSpecialChar.current) {
      event.target.value = lastValue.current;
    }
    isSpecialChar.current = false;
  };
  var onInputKeyDown = function onInputKeyDown(event) {
    if (props.disabled || props.readOnly) {
      return;
    }
    lastValue.current = event.target.value;
    if (event.shiftKey || event.altKey) {
      isSpecialChar.current = true;
      return;
    }
    var selectionStart = event.target.selectionStart;
    var selectionEnd = event.target.selectionEnd;
    var inputValue = event.target.value;
    var newValueStr = null;
    if (event.altKey) {
      event.preventDefault();
    }
    switch (event.which) {
      //up
      case 38:
        spin(event, 1);
        event.preventDefault();
        break;

      //down
      case 40:
        spin(event, -1);
        event.preventDefault();
        break;

      //left
      case 37:
        if (!isNumeralChar(inputValue.charAt(selectionStart - 1))) {
          event.preventDefault();
        }
        break;

      //right
      case 39:
        if (!isNumeralChar(inputValue.charAt(selectionStart))) {
          event.preventDefault();
        }
        break;

      //enter and tab
      case 13:
      case 9:
        newValueStr = validateValue(parseValue(inputValue));
        inputRef.current.value = formatValue(newValueStr);
        inputRef.current.setAttribute('aria-valuenow', newValueStr);
        updateModel(event, newValueStr);
        break;

      //backspace
      case 8:
        event.preventDefault();
        if (selectionStart === selectionEnd) {
          var deleteChar = inputValue.charAt(selectionStart - 1);
          var _getDecimalCharIndexe = getDecimalCharIndexes(inputValue),
            decimalCharIndex = _getDecimalCharIndexe.decimalCharIndex,
            decimalCharIndexWithoutPrefix = _getDecimalCharIndexe.decimalCharIndexWithoutPrefix;
          if (isNumeralChar(deleteChar)) {
            var decimalLength = getDecimalLength(inputValue);
            if (_group.current.test(deleteChar)) {
              _group.current.lastIndex = 0;
              newValueStr = inputValue.slice(0, selectionStart - 2) + inputValue.slice(selectionStart - 1);
            } else if (_decimal.current.test(deleteChar)) {
              _decimal.current.lastIndex = 0;
              if (decimalLength) {
                inputRef.current.setSelectionRange(selectionStart - 1, selectionStart - 1);
              } else {
                newValueStr = inputValue.slice(0, selectionStart - 1) + inputValue.slice(selectionStart);
              }
            } else if (decimalCharIndex > 0 && selectionStart > decimalCharIndex) {
              var insertedText = isDecimalMode() && (props.minFractionDigits || 0) < decimalLength ? '' : '0';
              newValueStr = inputValue.slice(0, selectionStart - 1) + insertedText + inputValue.slice(selectionStart);
            } else if (decimalCharIndexWithoutPrefix === 1) {
              newValueStr = inputValue.slice(0, selectionStart - 1) + '0' + inputValue.slice(selectionStart);
              newValueStr = parseValue(newValueStr) > 0 ? newValueStr : '';
            } else {
              newValueStr = inputValue.slice(0, selectionStart - 1) + inputValue.slice(selectionStart);
            }
          }
          updateValue(event, newValueStr, null, 'delete-single');
        } else {
          newValueStr = deleteRange(inputValue, selectionStart, selectionEnd);
          updateValue(event, newValueStr, null, 'delete-range');
        }
        break;

      // del
      case 46:
        event.preventDefault();
        if (selectionStart === selectionEnd) {
          var _deleteChar = inputValue.charAt(selectionStart);
          var _getDecimalCharIndexe2 = getDecimalCharIndexes(inputValue),
            _decimalCharIndex = _getDecimalCharIndexe2.decimalCharIndex,
            _decimalCharIndexWithoutPrefix = _getDecimalCharIndexe2.decimalCharIndexWithoutPrefix;
          if (isNumeralChar(_deleteChar)) {
            var _decimalLength = getDecimalLength(inputValue);
            if (_group.current.test(_deleteChar)) {
              _group.current.lastIndex = 0;
              newValueStr = inputValue.slice(0, selectionStart) + inputValue.slice(selectionStart + 2);
            } else if (_decimal.current.test(_deleteChar)) {
              _decimal.current.lastIndex = 0;
              if (_decimalLength) {
                inputRef.current.setSelectionRange(selectionStart + 1, selectionStart + 1);
              } else {
                newValueStr = inputValue.slice(0, selectionStart) + inputValue.slice(selectionStart + 1);
              }
            } else if (_decimalCharIndex > 0 && selectionStart > _decimalCharIndex) {
              var _insertedText = isDecimalMode() && (props.minFractionDigits || 0) < _decimalLength ? '' : '0';
              newValueStr = inputValue.slice(0, selectionStart) + _insertedText + inputValue.slice(selectionStart + 1);
            } else if (_decimalCharIndexWithoutPrefix === 1) {
              newValueStr = inputValue.slice(0, selectionStart) + '0' + inputValue.slice(selectionStart + 1);
              newValueStr = parseValue(newValueStr) > 0 ? newValueStr : '';
            } else {
              newValueStr = inputValue.slice(0, selectionStart) + inputValue.slice(selectionStart + 1);
            }
          }
          updateValue(event, newValueStr, null, 'delete-back-single');
        } else {
          newValueStr = deleteRange(inputValue, selectionStart, selectionEnd);
          updateValue(event, newValueStr, null, 'delete-range');
        }
        break;
    }
    if (props.onKeyDown) {
      props.onKeyDown(event);
    }
  };
  var onInputKeyPress = function onInputKeyPress(event) {
    if (props.disabled || props.readOnly) {
      return;
    }
    var code = event.which || event.keyCode;
    if (code !== 13) {
      // to submit a form
      event.preventDefault();
    }
    var _char = String.fromCharCode(code);
    var _isDecimalSign = isDecimalSign(_char);
    var _isMinusSign = isMinusSign(_char);
    if (48 <= code && code <= 57 || _isMinusSign || _isDecimalSign) {
      insert(event, _char, {
        isDecimalSign: _isDecimalSign,
        isMinusSign: _isMinusSign
      });
    }
  };
  var onPaste = function onPaste(event) {
    event.preventDefault();
    if (props.disabled || props.readOnly) {
      return;
    }
    var data = (event.clipboardData || window['clipboardData']).getData('Text');
    if (data) {
      var filteredData = parseValue(data);
      if (filteredData != null) {
        insert(event, filteredData.toString());
      }
    }
  };
  var allowMinusSign = function allowMinusSign() {
    return props.min === null || props.min < 0;
  };
  var isMinusSign = function isMinusSign(_char2) {
    if (_minusSign.current.test(_char2) || _char2 === '-') {
      _minusSign.current.lastIndex = 0;
      return true;
    }
    return false;
  };
  var isDecimalSign = function isDecimalSign(_char3) {
    if (_decimal.current.test(_char3)) {
      _decimal.current.lastIndex = 0;
      return true;
    }
    return false;
  };
  var isDecimalMode = function isDecimalMode() {
    return props.mode === 'decimal';
  };
  var getDecimalCharIndexes = function getDecimalCharIndexes(val) {
    var decimalCharIndex = val.search(_decimal.current);
    _decimal.current.lastIndex = 0;
    var filteredVal = val.replace(_prefix.current, '').trim().replace(/\s/g, '').replace(_currency.current, '');
    var decimalCharIndexWithoutPrefix = filteredVal.search(_decimal.current);
    _decimal.current.lastIndex = 0;
    return {
      decimalCharIndex: decimalCharIndex,
      decimalCharIndexWithoutPrefix: decimalCharIndexWithoutPrefix
    };
  };
  var getCharIndexes = function getCharIndexes(val) {
    var decimalCharIndex = val.search(_decimal.current);
    _decimal.current.lastIndex = 0;
    var minusCharIndex = val.search(_minusSign.current);
    _minusSign.current.lastIndex = 0;
    var suffixCharIndex = val.search(_suffix.current);
    _suffix.current.lastIndex = 0;
    var currencyCharIndex = val.search(_currency.current);
    _currency.current.lastIndex = 0;
    return {
      decimalCharIndex: decimalCharIndex,
      minusCharIndex: minusCharIndex,
      suffixCharIndex: suffixCharIndex,
      currencyCharIndex: currencyCharIndex
    };
  };
  var insert = function insert(event, text) {
    var sign = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
      isDecimalSign: false,
      isMinusSign: false
    };
    var minusCharIndexOnText = text.search(_minusSign.current);
    _minusSign.current.lastIndex = 0;
    if (!allowMinusSign() && minusCharIndexOnText !== -1) {
      return;
    }
    var selectionStart = inputRef.current.selectionStart;
    var selectionEnd = inputRef.current.selectionEnd;
    var inputValue = inputRef.current.value.trim();
    var _getCharIndexes = getCharIndexes(inputValue),
      decimalCharIndex = _getCharIndexes.decimalCharIndex,
      minusCharIndex = _getCharIndexes.minusCharIndex,
      suffixCharIndex = _getCharIndexes.suffixCharIndex,
      currencyCharIndex = _getCharIndexes.currencyCharIndex;
    var newValueStr;
    if (sign.isMinusSign) {
      if (selectionStart === 0) {
        newValueStr = inputValue;
        if (minusCharIndex === -1 || selectionEnd !== 0) {
          newValueStr = insertText(inputValue, text, 0, selectionEnd);
        }
        updateValue(event, newValueStr, text, 'insert');
      }
    } else if (sign.isDecimalSign) {
      if (decimalCharIndex > 0 && selectionStart === decimalCharIndex) {
        updateValue(event, inputValue, text, 'insert');
      } else if (decimalCharIndex > selectionStart && decimalCharIndex < selectionEnd) {
        newValueStr = insertText(inputValue, text, selectionStart, selectionEnd);
        updateValue(event, newValueStr, text, 'insert');
      } else if (decimalCharIndex === -1 && props.maxFractionDigits) {
        newValueStr = insertText(inputValue, text, selectionStart, selectionEnd);
        updateValue(event, newValueStr, text, 'insert');
      }
    } else {
      var maxFractionDigits = numberFormat.current.resolvedOptions().maximumFractionDigits;
      var operation = selectionStart !== selectionEnd ? 'range-insert' : 'insert';
      if (decimalCharIndex > 0 && selectionStart > decimalCharIndex) {
        if (selectionStart + text.length - (decimalCharIndex + 1) <= maxFractionDigits) {
          var charIndex = currencyCharIndex >= selectionStart ? currencyCharIndex - 1 : suffixCharIndex >= selectionStart ? suffixCharIndex : inputValue.length;
          newValueStr = inputValue.slice(0, selectionStart) + text + inputValue.slice(selectionStart + text.length, charIndex) + inputValue.slice(charIndex);
          updateValue(event, newValueStr, text, operation);
        }
      } else {
        newValueStr = insertText(inputValue, text, selectionStart, selectionEnd);
        updateValue(event, newValueStr, text, operation);
      }
    }
  };
  var insertText = function insertText(value, text, start, end) {
    var textSplit = text === '.' ? text : text.split('.');
    if (textSplit.length === 2) {
      var decimalCharIndex = value.slice(start, end).search(_decimal.current);
      _decimal.current.lastIndex = 0;
      return decimalCharIndex > 0 ? value.slice(0, start) + formatValue(text) + value.slice(end) : value || formatValue(text);
    } else if (end - start === value.length) {
      return formatValue(text);
    } else if (start === 0) {
      var suffix = utils.ObjectUtils.isLetter(value[end]) ? end - 1 : end;
      return text + value.slice(suffix);
    } else if (end === value.length) {
      return value.slice(0, start) + text;
    } else {
      return value.slice(0, start) + text + value.slice(end);
    }
  };
  var deleteRange = function deleteRange(value, start, end) {
    var newValueStr;
    if (end - start === value.length) newValueStr = '';else if (start === 0) newValueStr = value.slice(end);else if (end === value.length) newValueStr = value.slice(0, start);else newValueStr = value.slice(0, start) + value.slice(end);
    return newValueStr;
  };
  var initCursor = function initCursor() {
    var selectionStart = inputRef.current.selectionStart;
    var inputValue = inputRef.current.value;
    var valueLength = inputValue.length;
    var index = null;

    // remove prefix
    var prefixLength = (prefixChar.current || '').length;
    inputValue = inputValue.replace(_prefix.current, '');
    selectionStart = selectionStart - prefixLength;
    var _char4 = inputValue.charAt(selectionStart);
    if (isNumeralChar(_char4)) {
      return selectionStart + prefixLength;
    }

    //left
    var i = selectionStart - 1;
    while (i >= 0) {
      _char4 = inputValue.charAt(i);
      if (isNumeralChar(_char4)) {
        index = i + prefixLength;
        break;
      } else {
        i--;
      }
    }
    if (index !== null) {
      inputRef.current.setSelectionRange(index + 1, index + 1);
    } else {
      i = selectionStart;
      while (i < valueLength) {
        _char4 = inputValue.charAt(i);
        if (isNumeralChar(_char4)) {
          index = i + prefixLength;
          break;
        } else {
          i++;
        }
      }
      if (index !== null) {
        inputRef.current.setSelectionRange(index, index);
      }
    }
    return index || 0;
  };
  var onInputClick = function onInputClick() {
    initCursor();
  };
  var isNumeralChar = function isNumeralChar(_char5) {
    if (_char5.length === 1 && (_numeral.current.test(_char5) || _decimal.current.test(_char5) || _group.current.test(_char5) || _minusSign.current.test(_char5))) {
      resetRegex();
      return true;
    } else {
      return false;
    }
  };
  var resetRegex = function resetRegex() {
    _numeral.current.lastIndex = 0;
    _decimal.current.lastIndex = 0;
    _group.current.lastIndex = 0;
    _minusSign.current.lastIndex = 0;
  };
  var updateValue = function updateValue(event, valueStr, insertedValueStr, operation) {
    var currentValue = inputRef.current.value;
    var newValue = null;
    if (valueStr != null) {
      newValue = evaluateEmpty(parseValue(valueStr));
      updateInput(newValue, insertedValueStr, operation, valueStr);
      handleOnChange(event, currentValue, newValue);
    }
  };
  var evaluateEmpty = function evaluateEmpty(newValue) {
    return !newValue && !props.allowEmpty ? props.min || 0 : newValue;
  };
  var handleOnChange = function handleOnChange(event, currentValue, newValue) {
    if (props.onChange && isValueChanged(currentValue, newValue)) {
      props.onChange({
        originalEvent: event,
        value: newValue
      });
    }
  };
  var isValueChanged = function isValueChanged(currentValue, newValue) {
    if (newValue === null && currentValue !== null) {
      return true;
    }
    if (newValue != null) {
      var parsedCurrentValue = typeof currentValue === 'string' ? parseValue(currentValue) : currentValue;
      return newValue !== parsedCurrentValue;
    }
    return false;
  };
  var validateValue = function validateValue(value) {
    if (value === '-') {
      return null;
    }
    return validateValueByLimit(value);
  };
  var validateValueByLimit = function validateValueByLimit(value) {
    if (utils.ObjectUtils.isEmpty(value)) {
      return null;
    }
    if (props.min !== null && value < props.min) {
      return props.min;
    }
    if (props.max !== null && value > props.max) {
      return props.max;
    }
    return value;
  };
  var updateInput = function updateInput(value, insertedValueStr, operation, valueStr) {
    insertedValueStr = insertedValueStr || '';
    var inputEl = inputRef.current;
    var inputValue = inputEl.value;
    var newValue = formatValue(value);
    var currentLength = inputValue.length;
    if (newValue !== valueStr) {
      newValue = concatValues(newValue, valueStr);
    }
    if (currentLength === 0) {
      inputEl.value = newValue;
      inputEl.setSelectionRange(0, 0);
      var index = initCursor();
      var selectionEnd = index + insertedValueStr.length;
      inputEl.setSelectionRange(selectionEnd, selectionEnd);
    } else {
      var selectionStart = inputEl.selectionStart;
      var _selectionEnd = inputEl.selectionEnd;
      if (props.maxLength && props.maxLength < newValue.length) {
        return;
      }
      inputEl.value = newValue;
      var newLength = newValue.length;
      if (operation === 'range-insert') {
        var startValue = parseValue((inputValue || '').slice(0, selectionStart));
        var startValueStr = startValue !== null ? startValue.toString() : '';
        var startExpr = startValueStr.split('').join("(".concat(groupChar.current, ")?"));
        var sRegex = new RegExp(startExpr, 'g');
        sRegex.test(newValue);
        var tExpr = insertedValueStr.split('').join("(".concat(groupChar.current, ")?"));
        var tRegex = new RegExp(tExpr, 'g');
        tRegex.test(newValue.slice(sRegex.lastIndex));
        _selectionEnd = sRegex.lastIndex + tRegex.lastIndex;
        inputEl.setSelectionRange(_selectionEnd, _selectionEnd);
      } else if (newLength === currentLength) {
        if (operation === 'insert' || operation === 'delete-back-single') inputEl.setSelectionRange(_selectionEnd + 1, _selectionEnd + 1);else if (operation === 'delete-single') inputEl.setSelectionRange(_selectionEnd - 1, _selectionEnd - 1);else if (operation === 'delete-range' || operation === 'spin') inputEl.setSelectionRange(_selectionEnd, _selectionEnd);
      } else if (operation === 'delete-back-single') {
        var prevChar = inputValue.charAt(_selectionEnd - 1);
        var nextChar = inputValue.charAt(_selectionEnd);
        var diff = currentLength - newLength;
        var isGroupChar = _group.current.test(nextChar);
        if (isGroupChar && diff === 1) {
          _selectionEnd += 1;
        } else if (!isGroupChar && isNumeralChar(prevChar)) {
          _selectionEnd += -1 * diff + 1;
        }
        _group.current.lastIndex = 0;
        inputEl.setSelectionRange(_selectionEnd, _selectionEnd);
      } else if (inputValue === '-' && operation === 'insert') {
        inputEl.setSelectionRange(0, 0);
        var _index2 = initCursor();
        var _selectionEnd2 = _index2 + insertedValueStr.length + 1;
        inputEl.setSelectionRange(_selectionEnd2, _selectionEnd2);
      } else {
        _selectionEnd = _selectionEnd + (newLength - currentLength);
        inputEl.setSelectionRange(_selectionEnd, _selectionEnd);
      }
    }
    inputEl.setAttribute('aria-valuenow', value);
  };
  var updateInputValue = function updateInputValue(newValue) {
    newValue = evaluateEmpty(newValue);
    var inputEl = inputRef.current;
    var value = inputEl.value;
    var _formattedValue = formattedValue(newValue);
    if (value !== _formattedValue) {
      inputEl.value = _formattedValue;
      inputEl.setAttribute('aria-valuenow', newValue);
    }
  };
  var formattedValue = function formattedValue(val) {
    return formatValue(evaluateEmpty(val));
  };
  var concatValues = function concatValues(val1, val2) {
    if (val1 && val2) {
      var decimalCharIndex = val2.search(_decimal.current);
      _decimal.current.lastIndex = 0;
      return decimalCharIndex !== -1 ? val1.split(_decimal.current)[0] + val2.slice(decimalCharIndex) : val1;
    }
    return val1;
  };
  var getDecimalLength = function getDecimalLength(value) {
    if (value) {
      var valueSplit = value.split(_decimal.current);
      if (valueSplit.length === 2) {
        return valueSplit[1].replace(_suffix.current, '').trim().replace(/\s/g, '').replace(_currency.current, '').length;
      }
    }
    return 0;
  };
  var updateModel = function updateModel(event, value) {
    if (props.onValueChange) {
      props.onValueChange({
        originalEvent: event,
        value: value,
        stopPropagation: function stopPropagation() {},
        preventDefault: function preventDefault() {},
        target: {
          name: props.name,
          id: props.id,
          value: value
        }
      });
    }
  };
  var onInputFocus = function onInputFocus(event) {
    setFocusedState(true);
    props.onFocus && props.onFocus(event);
    if ((props.suffix || props.currency || props.prefix) && inputRef.current) {
      // GitHub #1866 Cursor must be placed before/after symbol or arrow keys don't work
      var selectionEnd = initCursor();
      inputRef.current.setSelectionRange(selectionEnd, selectionEnd);
    }
  };
  var onInputBlur = function onInputBlur(event) {
    setFocusedState(false);
    if (inputRef.current) {
      var currentValue = inputRef.current.value;
      if (isValueChanged(currentValue, props.value)) {
        var newValue = validateValue(parseValue(currentValue));
        updateInputValue(newValue);
        updateModel(event, newValue);
      }
    }
    props.onBlur && props.onBlur(event);
  };
  var clearTimer = function clearTimer() {
    if (timer.current) {
      clearInterval(timer.current);
    }
  };
  var changeValue = function changeValue() {
    updateInputValue(validateValueByLimit(props.value));
    var newValue = validateValue(props.value);
    if (props.value !== null && props.value !== newValue) {
      updateModel(null, newValue);
    }
  };
  var getFormatter = function getFormatter() {
    return numberFormat.current;
  };
  React__namespace.useImperativeHandle(ref, function () {
    return {
      props: props,
      getFormatter: getFormatter,
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
  hooks.useMountEffect(function () {
    constructParser();
    var newValue = validateValue(props.value);
    if (props.value !== null && props.value !== newValue) {
      updateModel(null, newValue);
    }
  });
  hooks.useUpdateEffect(function () {
    constructParser();
    changeValue();
  }, [props.locale, props.localeMatcher, props.mode, props.currency, props.currencyDisplay, props.useGrouping, props.minFractionDigits, props.maxFractionDigits, props.suffix, props.prefix]);
  hooks.useUpdateEffect(function () {
    changeValue();
  }, [props.value]);
  var createInputElement = function createInputElement() {
    var className = utils.classNames('p-inputnumber-input', props.inputClassName);
    var valueToRender = formattedValue(props.value);
    return /*#__PURE__*/React__namespace.createElement(inputtext.InputText, _extends({
      ref: inputRef,
      id: props.inputId,
      style: props.inputStyle,
      role: "spinbutton",
      className: className,
      defaultValue: valueToRender,
      type: props.type,
      size: props.size,
      tabIndex: props.tabIndex,
      inputMode: inputMode,
      maxLength: props.maxLength,
      disabled: props.disabled,
      required: props.required,
      pattern: props.pattern,
      placeholder: props.placeholder,
      readOnly: props.readOnly,
      name: props.name,
      autoFocus: props.autoFocus,
      onKeyDown: onInputKeyDown,
      onKeyPress: onInputKeyPress,
      onInput: onInput,
      onClick: onInputClick,
      onBlur: onInputBlur,
      onFocus: onInputFocus,
      onPaste: onPaste,
      min: props.min,
      max: props.max,
      "aria-valuemin": props.min,
      "aria-valuemax": props.max,
      "aria-valuenow": props.value
    }, ariaProps, dataProps));
  };
  var createUpButton = function createUpButton() {
    var className = utils.classNames('p-inputnumber-button p-inputnumber-button-up p-button p-button-icon-only p-component', {
      'p-disabled': props.disabled
    }, props.incrementButtonClassName);
    var icon = utils.classNames('p-button-icon', props.incrementButtonIcon);
    return /*#__PURE__*/React__namespace.createElement("button", {
      type: "button",
      className: className,
      onMouseLeave: onUpButtonMouseLeave,
      onMouseDown: onUpButtonMouseDown,
      onMouseUp: onUpButtonMouseUp,
      onKeyDown: onUpButtonKeyDown,
      onKeyUp: onUpButtonKeyUp,
      onTouchStart: onUpButtonTouchStart,
      onTouchEnd: onUpButtonTouchEnd,
      disabled: props.disabled,
      tabIndex: -1
    }, /*#__PURE__*/React__namespace.createElement("span", {
      className: icon
    }), /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null));
  };
  var createDownButton = function createDownButton() {
    var className = utils.classNames('p-inputnumber-button p-inputnumber-button-down p-button p-button-icon-only p-component', {
      'p-disabled': props.disabled
    }, props.decrementButtonClassName);
    var icon = utils.classNames('p-button-icon', props.decrementButtonIcon);
    return /*#__PURE__*/React__namespace.createElement("button", {
      type: "button",
      className: className,
      onMouseLeave: onDownButtonMouseLeave,
      onMouseDown: onDownButtonMouseDown,
      onMouseUp: onDownButtonMouseUp,
      onKeyDown: onDownButtonKeyDown,
      onKeyUp: onDownButtonKeyUp,
      onTouchStart: onDownButtonTouchStart,
      onTouchEnd: onDownButtonTouchEnd,
      disabled: props.disabled,
      tabIndex: -1
    }, /*#__PURE__*/React__namespace.createElement("span", {
      className: icon
    }), /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null));
  };
  var createButtonGroup = function createButtonGroup() {
    var upButton = props.showButtons && createUpButton();
    var downButton = props.showButtons && createDownButton();
    if (stacked) {
      return /*#__PURE__*/React__namespace.createElement("span", {
        className: "p-inputnumber-button-group"
      }, upButton, downButton);
    }
    return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, upButton, downButton);
  };
  var hasTooltip = utils.ObjectUtils.isNotEmpty(props.tooltip);
  var otherProps = utils.ObjectUtils.findDiffKeys(props, InputNumber.defaultProps);
  var dataProps = utils.ObjectUtils.reduceKeys(otherProps, utils.DomHandler.DATA_PROPS);
  var ariaProps = utils.ObjectUtils.reduceKeys(otherProps, utils.DomHandler.ARIA_PROPS);
  var className = utils.classNames('p-inputnumber p-component p-inputwrapper', {
    'p-inputwrapper-filled': props.value != null && props.value.toString().length > 0,
    'p-inputwrapper-focus': focusedState,
    'p-inputnumber-buttons-stacked': stacked,
    'p-inputnumber-buttons-horizontal': horizontal,
    'p-inputnumber-buttons-vertical': vertical
  }, props.className);
  var inputElement = createInputElement();
  var buttonGroup = createButtonGroup();
  return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("span", _extends({
    ref: elementRef,
    id: props.id,
    className: className,
    style: props.style
  }, otherProps), inputElement, buttonGroup), hasTooltip && /*#__PURE__*/React__namespace.createElement(tooltip.Tooltip, _extends({
    target: elementRef,
    content: props.tooltip
  }, props.tooltipOptions)));
}));
InputNumber.displayName = 'InputNumber';
InputNumber.defaultProps = {
  __TYPE: 'InputNumber',
  allowEmpty: true,
  ariaLabelledBy: null,
  autoFocus: false,
  buttonLayout: 'stacked',
  className: null,
  currency: undefined,
  currencyDisplay: undefined,
  decrementButtonClassName: null,
  decrementButtonIcon: 'pi pi-angle-down',
  disabled: false,
  format: true,
  id: null,
  incrementButtonClassName: null,
  incrementButtonIcon: 'pi pi-angle-up',
  inputClassName: null,
  inputId: null,
  inputMode: null,
  inputRef: null,
  inputStyle: null,
  locale: undefined,
  localeMatcher: undefined,
  max: null,
  maxFractionDigits: undefined,
  maxLength: null,
  min: null,
  minFractionDigits: undefined,
  mode: 'decimal',
  name: null,
  onBlur: null,
  onChange: null,
  onFocus: null,
  onKeyDown: null,
  onValueChange: null,
  pattern: null,
  placeholder: null,
  prefix: null,
  readOnly: false,
  required: false,
  showButtons: false,
  size: null,
  step: 1,
  style: null,
  suffix: null,
  tabIndex: null,
  tooltip: null,
  tooltipOptions: null,
  type: 'text',
  useGrouping: true,
  value: null
};

exports.InputNumber = InputNumber;
