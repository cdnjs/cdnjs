"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputNumber = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _InputText = require("../inputtext/InputText");

var _ClassNames = require("../utils/ClassNames");

var _Tooltip = require("../tooltip/Tooltip");

var _Ripple = require("../ripple/Ripple");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var InputNumber = /*#__PURE__*/function (_Component) {
  _inherits(InputNumber, _Component);

  var _super = _createSuper(InputNumber);

  function InputNumber(props) {
    var _this;

    _classCallCheck(this, InputNumber);

    _this = _super.call(this, props);
    _this.state = {
      focused: false
    };

    _this.constructParser();

    _this.onInput = _this.onInput.bind(_assertThisInitialized(_this));
    _this.onInputKeyDown = _this.onInputKeyDown.bind(_assertThisInitialized(_this));
    _this.onInputKeyPress = _this.onInputKeyPress.bind(_assertThisInitialized(_this));
    _this.onInputClick = _this.onInputClick.bind(_assertThisInitialized(_this));
    _this.onInputBlur = _this.onInputBlur.bind(_assertThisInitialized(_this));
    _this.onInputFocus = _this.onInputFocus.bind(_assertThisInitialized(_this));
    _this.onPaste = _this.onPaste.bind(_assertThisInitialized(_this));
    _this.onUpButtonMouseLeave = _this.onUpButtonMouseLeave.bind(_assertThisInitialized(_this));
    _this.onUpButtonMouseDown = _this.onUpButtonMouseDown.bind(_assertThisInitialized(_this));
    _this.onUpButtonMouseUp = _this.onUpButtonMouseUp.bind(_assertThisInitialized(_this));
    _this.onUpButtonKeyDown = _this.onUpButtonKeyDown.bind(_assertThisInitialized(_this));
    _this.onUpButtonKeyUp = _this.onUpButtonKeyUp.bind(_assertThisInitialized(_this));
    _this.onDownButtonMouseLeave = _this.onDownButtonMouseLeave.bind(_assertThisInitialized(_this));
    _this.onDownButtonMouseDown = _this.onDownButtonMouseDown.bind(_assertThisInitialized(_this));
    _this.onDownButtonMouseUp = _this.onDownButtonMouseUp.bind(_assertThisInitialized(_this));
    _this.onDownButtonKeyDown = _this.onDownButtonKeyDown.bind(_assertThisInitialized(_this));
    _this.onDownButtonKeyUp = _this.onDownButtonKeyUp.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(InputNumber, [{
    key: "getOptions",
    value: function getOptions() {
      return {
        localeMatcher: this.props.localeMatcher,
        style: this.props.mode,
        currency: this.props.currency,
        currencyDisplay: this.props.currencyDisplay,
        useGrouping: this.props.useGrouping,
        minimumFractionDigits: this.props.minFractionDigits,
        maximumFractionDigits: this.props.maxFractionDigits
      };
    }
  }, {
    key: "constructParser",
    value: function constructParser() {
      this.numberFormat = new Intl.NumberFormat(this.props.locale, this.getOptions());

      var numerals = _toConsumableArray(new Intl.NumberFormat(this.props.locale, {
        useGrouping: false
      }).format(9876543210)).reverse();

      var index = new Map(numerals.map(function (d, i) {
        return [d, i];
      }));
      this._numeral = new RegExp("[".concat(numerals.join(''), "]"), 'g');
      this._decimal = this.getDecimalExpression();
      this._group = this.getGroupingExpression();
      this._minusSign = this.getMinusSignExpression();
      this._currency = this.getCurrencyExpression();
      this._suffix = this.getSuffixExpression();
      this._prefix = this.getPrefixExpression();

      this._index = function (d) {
        return index.get(d);
      };
    }
  }, {
    key: "escapeRegExp",
    value: function escapeRegExp(text) {
      return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    }
  }, {
    key: "getDecimalExpression",
    value: function getDecimalExpression() {
      var formatter = new Intl.NumberFormat(this.props.locale, {
        useGrouping: false
      });
      return new RegExp("[".concat(formatter.format(1.1).trim().replace(this._numeral, ''), "]"), 'g');
    }
  }, {
    key: "getGroupingExpression",
    value: function getGroupingExpression() {
      var formatter = new Intl.NumberFormat(this.props.locale, {
        useGrouping: true
      });
      this.groupChar = formatter.format(1000000).trim().replace(this._numeral, '').charAt(0);
      return new RegExp("[".concat(this.groupChar, "]"), 'g');
    }
  }, {
    key: "getMinusSignExpression",
    value: function getMinusSignExpression() {
      var formatter = new Intl.NumberFormat(this.props.locale, {
        useGrouping: false
      });
      return new RegExp("[".concat(formatter.format(-1).trim().replace(this._numeral, ''), "]"), 'g');
    }
  }, {
    key: "getCurrencyExpression",
    value: function getCurrencyExpression() {
      if (this.props.currency) {
        var formatter = new Intl.NumberFormat(this.props.locale, {
          style: 'currency',
          currency: this.props.currency,
          currencyDisplay: this.props.currencyDisplay
        });
        return new RegExp("[".concat(formatter.format(1).replace(/\s/g, '').replace(this._numeral, '').replace(this._decimal, '').replace(this._group, ''), "]"), 'g');
      } else {
        return new RegExp("[]", 'g');
      }
    }
  }, {
    key: "getPrefixExpression",
    value: function getPrefixExpression() {
      if (this.props.prefix) {
        this.prefixChar = this.props.prefix;
      } else {
        var formatter = new Intl.NumberFormat(this.props.locale, {
          style: this.props.mode,
          currency: this.props.currency,
          currencyDisplay: this.props.currencyDisplay
        });
        this.prefixChar = formatter.format(1).split('1')[0];
      }

      return new RegExp("".concat(this.escapeRegExp(this.prefixChar || '')), 'g');
    }
  }, {
    key: "getSuffixExpression",
    value: function getSuffixExpression() {
      if (this.props.suffix) {
        this.suffixChar = this.props.suffix;
      } else {
        var formatter = new Intl.NumberFormat(this.props.locale, {
          style: this.props.mode,
          currency: this.props.currency,
          currencyDisplay: this.props.currencyDisplay,
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        });
        this.suffixChar = formatter.format(1).split('1')[1];
      }

      return new RegExp("".concat(this.escapeRegExp(this.suffixChar || '')), 'g');
    }
  }, {
    key: "formatValue",
    value: function formatValue(value) {
      if (value != null) {
        if (value === '-') {
          // Minus sign
          return value;
        }

        if (this.props.format) {
          var formatter = new Intl.NumberFormat(this.props.locale, this.getOptions());
          var formattedValue = formatter.format(value);

          if (this.props.prefix) {
            formattedValue = this.props.prefix + formattedValue;
          }

          if (this.props.suffix) {
            formattedValue = formattedValue + this.props.suffix;
          }

          return formattedValue;
        }

        return value.toString();
      }

      return '';
    }
  }, {
    key: "parseValue",
    value: function parseValue(text) {
      var filteredText = text.replace(this._suffix, '').replace(this._prefix, '').trim().replace(/\s/g, '').replace(this._currency, '').replace(this._group, '').replace(this._minusSign, '-').replace(this._decimal, '.').replace(this._numeral, this._index);

      if (filteredText) {
        if (filteredText === '-') // Minus sign
          return filteredText;
        var parsedValue = +filteredText;
        return isNaN(parsedValue) ? null : parsedValue;
      }

      return null;
    }
  }, {
    key: "repeat",
    value: function repeat(event, interval, dir) {
      var _this2 = this;

      var i = interval || 500;
      this.clearTimer();
      this.timer = setTimeout(function () {
        _this2.repeat(event, 40, dir);
      }, i);
      this.spin(event, dir);
    }
  }, {
    key: "spin",
    value: function spin(event, dir) {
      var step = this.props.step * dir;
      var currentValue = this.parseValue(this.inputEl.value) || 0;
      var newValue = this.validateValue(currentValue + step);
      this.updateInput(newValue, null, 'spin');
      this.updateModel(event, newValue);
      this.handleOnChange(event, currentValue, newValue);
    }
  }, {
    key: "onUpButtonMouseDown",
    value: function onUpButtonMouseDown(event) {
      if (!this.props.disabled) {
        this.inputEl.focus();
        this.repeat(event, null, 1);
        event.preventDefault();
      }
    }
  }, {
    key: "onUpButtonMouseUp",
    value: function onUpButtonMouseUp() {
      if (!this.props.disabled) {
        this.clearTimer();
      }
    }
  }, {
    key: "onUpButtonMouseLeave",
    value: function onUpButtonMouseLeave() {
      if (!this.props.disabled) {
        this.clearTimer();
      }
    }
  }, {
    key: "onUpButtonKeyUp",
    value: function onUpButtonKeyUp() {
      if (!this.props.disabled) {
        this.clearTimer();
      }
    }
  }, {
    key: "onUpButtonKeyDown",
    value: function onUpButtonKeyDown(event) {
      if (event.keyCode === 32 || event.keyCode === 13) {
        this.repeat(event, null, 1);
      }
    }
  }, {
    key: "onDownButtonMouseDown",
    value: function onDownButtonMouseDown(event, focusInput) {
      if (!this.props.disabled) {
        this.inputEl.focus();
        this.repeat(event, null, -1);
        event.preventDefault();
      }
    }
  }, {
    key: "onDownButtonMouseUp",
    value: function onDownButtonMouseUp() {
      if (!this.props.disabled) {
        this.clearTimer();
      }
    }
  }, {
    key: "onDownButtonMouseLeave",
    value: function onDownButtonMouseLeave() {
      if (!this.props.disabled) {
        this.clearTimer();
      }
    }
  }, {
    key: "onDownButtonKeyUp",
    value: function onDownButtonKeyUp() {
      if (!this.props.disabled) {
        this.clearTimer();
      }
    }
  }, {
    key: "onDownButtonKeyDown",
    value: function onDownButtonKeyDown(event) {
      if (event.keyCode === 32 || event.keyCode === 13) {
        this.repeat(event, null, -1);
      }
    }
  }, {
    key: "onInput",
    value: function onInput(event) {
      if (this.isSpecialChar) {
        event.target.value = this.lastValue;
      }

      this.isSpecialChar = false;
    }
  }, {
    key: "onInputKeyDown",
    value: function onInputKeyDown(event) {
      this.lastValue = event.target.value;

      if (event.shiftKey || event.altKey) {
        this.isSpecialChar = true;
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
          this.spin(event, 1);
          event.preventDefault();
          break;
        //down

        case 40:
          this.spin(event, -1);
          event.preventDefault();
          break;
        //left

        case 37:
          var prevChar = inputValue.charAt(selectionStart - 1);

          if (!this.isNumeralChar(prevChar)) {
            event.preventDefault();
          }

          break;
        //right

        case 39:
          var currentChar = inputValue.charAt(selectionStart);

          if (!this.isNumeralChar(currentChar)) {
            event.preventDefault();
          }

          break;
        //enter

        case 13:
          newValueStr = this.validateValue(this.parseValue(inputValue));
          this.inputEl.value = this.formatValue(newValueStr);
          this.inputEl.setAttribute('aria-valuenow', newValueStr);
          this.updateModel(event, newValueStr);
          break;
        //backspace

        case 8:
          event.preventDefault();

          if (selectionStart === selectionEnd) {
            var deleteChar = inputValue.charAt(selectionStart - 1);
            var decimalCharIndex = inputValue.search(this._decimal);
            this._decimal.lastIndex = 0;

            if (this.isNumeralChar(deleteChar)) {
              if (this._group.test(deleteChar)) {
                this._group.lastIndex = 0;
                newValueStr = inputValue.slice(0, selectionStart - 2) + inputValue.slice(selectionStart - 1);
              } else if (this._decimal.test(deleteChar)) {
                this._decimal.lastIndex = 0;
                this.inputEl.setSelectionRange(selectionStart - 1, selectionStart - 1);
              } else if (decimalCharIndex > 0 && selectionStart > decimalCharIndex) {
                newValueStr = inputValue.slice(0, selectionStart - 1) + '0' + inputValue.slice(selectionStart);
              } else if (decimalCharIndex > 0 && decimalCharIndex === 1) {
                newValueStr = inputValue.slice(0, selectionStart - 1) + '0' + inputValue.slice(selectionStart);
                newValueStr = this.parseValue(newValueStr) > 0 ? newValueStr : '';
              } else {
                newValueStr = inputValue.slice(0, selectionStart - 1) + inputValue.slice(selectionStart);
              }
            }

            this.updateValue(event, newValueStr, null, 'delete-single');
          } else {
            newValueStr = this.deleteRange(inputValue, selectionStart, selectionEnd);
            this.updateValue(event, newValueStr, null, 'delete-range');
          }

          break;
        // del

        case 46:
          event.preventDefault();

          if (selectionStart === selectionEnd) {
            var _deleteChar = inputValue.charAt(selectionStart);

            var _decimalCharIndex = inputValue.search(this._decimal);

            this._decimal.lastIndex = 0;

            if (this.isNumeralChar(_deleteChar)) {
              if (this._group.test(_deleteChar)) {
                this._group.lastIndex = 0;
                newValueStr = inputValue.slice(0, selectionStart) + inputValue.slice(selectionStart + 2);
              } else if (this._decimal.test(_deleteChar)) {
                this._decimal.lastIndex = 0;
                this.inputEl.setSelectionRange(selectionStart + 1, selectionStart + 1);
              } else if (_decimalCharIndex > 0 && selectionStart > _decimalCharIndex) {
                newValueStr = inputValue.slice(0, selectionStart) + '0' + inputValue.slice(selectionStart + 1);
              } else if (_decimalCharIndex > 0 && _decimalCharIndex === 1) {
                newValueStr = inputValue.slice(0, selectionStart) + '0' + inputValue.slice(selectionStart + 1);
                newValueStr = this.parseValue(newValueStr) > 0 ? newValueStr : '';
              } else {
                newValueStr = inputValue.slice(0, selectionStart) + inputValue.slice(selectionStart + 1);
              }
            }

            this.updateValue(event, newValueStr, null, 'delete-back-single');
          } else {
            newValueStr = this.deleteRange(inputValue, selectionStart, selectionEnd);
            this.updateValue(event, newValueStr, null, 'delete-range');
          }

          break;

        default:
          break;
      }

      if (this.props.onKeyDown) {
        this.props.onKeyDown(event);
      }
    }
  }, {
    key: "onInputKeyPress",
    value: function onInputKeyPress(event) {
      event.preventDefault();
      var code = event.which || event.keyCode;
      var char = String.fromCharCode(code);
      var isDecimalSign = this.isDecimalSign(char);
      var isMinusSign = this.isMinusSign(char);

      if (48 <= code && code <= 57 || isMinusSign || isDecimalSign) {
        this.insert(event, char, {
          isDecimalSign: isDecimalSign,
          isMinusSign: isMinusSign
        });
      }
    }
  }, {
    key: "onPaste",
    value: function onPaste(event) {
      event.preventDefault();
      var data = (event.clipboardData || window['clipboardData']).getData('Text');

      if (data) {
        var filteredData = this.parseValue(data);

        if (filteredData != null) {
          this.insert(event, filteredData.toString());
        }
      }
    }
  }, {
    key: "allowMinusSign",
    value: function allowMinusSign() {
      return this.props.min === null || this.props.min < 0;
    }
  }, {
    key: "isMinusSign",
    value: function isMinusSign(char) {
      if (this._minusSign.test(char)) {
        this._minusSign.lastIndex = 0;
        return true;
      }

      return false;
    }
  }, {
    key: "isDecimalSign",
    value: function isDecimalSign(char) {
      if (this._decimal.test(char)) {
        this._decimal.lastIndex = 0;
        return true;
      }

      return false;
    }
  }, {
    key: "insert",
    value: function insert(event, text) {
      var sign = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
        isDecimalSign: false,
        isMinusSign: false
      };
      var minusCharIndexOnText = text.search(this._minusSign);
      this._minusSign.lastIndex = 0;

      if (!this.allowMinusSign() && minusCharIndexOnText !== -1) {
        return;
      }

      var selectionStart = this.inputEl.selectionStart;
      var selectionEnd = this.inputEl.selectionEnd;
      var inputValue = this.inputEl.value.trim();
      var decimalCharIndex = inputValue.search(this._decimal);
      this._decimal.lastIndex = 0;
      var minusCharIndex = inputValue.search(this._minusSign);
      this._minusSign.lastIndex = 0;
      var newValueStr;

      if (sign.isMinusSign) {
        if (selectionStart === 0) {
          newValueStr = inputValue;

          if (minusCharIndex === -1 || selectionEnd !== 0) {
            newValueStr = this.insertText(inputValue, text, 0, selectionEnd);
          }

          this.updateValue(event, newValueStr, text, 'insert');
        }
      } else if (sign.isDecimalSign) {
        if (decimalCharIndex > 0 && selectionStart === decimalCharIndex) {
          this.updateValue(event, inputValue, text, 'insert');
        } else if (decimalCharIndex > selectionStart && decimalCharIndex < selectionEnd) {
          newValueStr = this.insertText(inputValue, text, selectionStart, selectionEnd);
          this.updateValue(event, newValueStr, text, 'insert');
        }
      } else {
        var maxFractionDigits = this.numberFormat.resolvedOptions().maximumFractionDigits;
        var operation = selectionStart !== selectionEnd ? 'range-insert' : 'insert';

        if (decimalCharIndex > 0 && selectionStart > decimalCharIndex) {
          if (selectionStart + text.length - (decimalCharIndex + 1) <= maxFractionDigits) {
            newValueStr = inputValue.slice(0, selectionStart) + text + inputValue.slice(selectionStart + text.length);
            this.updateValue(event, newValueStr, text, operation);
          }
        } else {
          newValueStr = this.insertText(inputValue, text, selectionStart, selectionEnd);
          this.updateValue(event, newValueStr, text, operation);
        }
      }
    }
  }, {
    key: "insertText",
    value: function insertText(value, text, start, end) {
      var textSplit = text.split('.');

      if (textSplit.length === 2) {
        var decimalCharIndex = value.slice(start, end).search(this._decimal);
        this._decimal.lastIndex = 0;
        return decimalCharIndex > 0 ? value.slice(0, start) + this.formatValue(text) + value.slice(end) : value || this.formatValue(text);
      } else if (end - start === value.length) {
        return this.formatValue(text);
      } else if (start === 0) {
        return text + value.slice(end);
      } else if (end === value.length) {
        return value.slice(0, start) + text;
      } else {
        return value.slice(0, start) + text + value.slice(end);
      }
    }
  }, {
    key: "deleteRange",
    value: function deleteRange(value, start, end) {
      var newValueStr;
      if (end - start === value.length) newValueStr = '';else if (start === 0) newValueStr = value.slice(end);else if (end === value.length) newValueStr = value.slice(0, start);else newValueStr = value.slice(0, start) + value.slice(end);
      return newValueStr;
    }
  }, {
    key: "initCursor",
    value: function initCursor() {
      var selectionStart = this.inputEl.selectionStart;
      var inputValue = this.inputEl.value;
      var valueLength = inputValue.length;
      var index = null;
      var char = inputValue.charAt(selectionStart);

      if (this.isNumeralChar(char)) {
        return;
      } //left


      var i = selectionStart - 1;

      while (i >= 0) {
        char = inputValue.charAt(i);

        if (this.isNumeralChar(char)) {
          index = i;
          break;
        } else {
          i--;
        }
      }

      if (index !== null) {
        this.inputEl.setSelectionRange(index + 1, index + 1);
      } else {
        i = selectionStart + 1;

        while (i < valueLength) {
          char = inputValue.charAt(i);

          if (this.isNumeralChar(char)) {
            index = i;
            break;
          } else {
            i++;
          }
        }

        if (index !== null) {
          this.inputEl.setSelectionRange(index, index);
        }
      }
    }
  }, {
    key: "onInputClick",
    value: function onInputClick() {
      this.initCursor();
    }
  }, {
    key: "isNumeralChar",
    value: function isNumeralChar(char) {
      if (char.length === 1 && (this._numeral.test(char) || this._decimal.test(char) || this._group.test(char) || this._minusSign.test(char))) {
        this.resetRegex();
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: "resetRegex",
    value: function resetRegex() {
      this._numeral.lastIndex = 0;
      this._decimal.lastIndex = 0;
      this._group.lastIndex = 0;
      this._minusSign.lastIndex = 0;
    }
  }, {
    key: "updateValue",
    value: function updateValue(event, valueStr, insertedValueStr, operation) {
      var currentValue = this.inputEl.value;
      var newValue = null;

      if (valueStr != null) {
        newValue = this.parseValue(valueStr);
        this.updateInput(newValue, insertedValueStr, operation);
      }

      this.handleOnChange(event, currentValue, newValue);
    }
  }, {
    key: "handleOnChange",
    value: function handleOnChange(event, currentValue, newValue) {
      if (this.props.onChange && this.isValueChanged(currentValue, newValue)) {
        this.props.onChange({
          originalEvent: event,
          value: newValue
        });
      }
    }
  }, {
    key: "isValueChanged",
    value: function isValueChanged(currentValue, newValue) {
      if (newValue === null && currentValue !== null) {
        return true;
      }

      if (newValue != null) {
        var parsedCurrentValue = typeof currentValue === 'string' ? this.parseValue(currentValue) : currentValue;
        return newValue !== parsedCurrentValue;
      }

      return false;
    }
  }, {
    key: "validateValue",
    value: function validateValue(value) {
      if (this.props.min !== null && value < this.props.min) {
        return this.props.min;
      }

      if (this.props.max !== null && value > this.props.max) {
        return this.props.max;
      }

      if (value === '-') {
        // Minus sign
        return null;
      }

      return value;
    }
  }, {
    key: "updateInput",
    value: function updateInput(value, insertedValueStr, operation) {
      insertedValueStr = insertedValueStr || '';
      var inputValue = this.inputEl.value;
      var newValue = this.formatValue(value);
      var currentLength = inputValue.length;

      if (currentLength === 0) {
        this.inputEl.value = newValue;
        this.inputEl.setSelectionRange(0, 0);
        this.initCursor();
        var prefixLength = (this.prefixChar || '').length;
        var selectionEnd = prefixLength + insertedValueStr.length;
        this.inputEl.setSelectionRange(selectionEnd, selectionEnd);
      } else {
        var selectionStart = this.inputEl.selectionStart;
        var _selectionEnd = this.inputEl.selectionEnd;
        this.inputEl.value = newValue;
        var newLength = newValue.length;

        if (operation === 'range-insert') {
          var startValue = this.parseValue((inputValue || '').slice(0, selectionStart));
          var startValueStr = startValue !== null ? startValue.toString() : '';
          var startExpr = startValueStr.split('').join("(".concat(this.groupChar, ")?"));
          var sRegex = new RegExp(startExpr, 'g');
          sRegex.test(newValue);
          var tExpr = insertedValueStr.split('').join("(".concat(this.groupChar, ")?"));
          var tRegex = new RegExp(tExpr, 'g');
          tRegex.test(newValue.slice(sRegex.lastIndex));
          _selectionEnd = sRegex.lastIndex + tRegex.lastIndex;
          this.inputEl.setSelectionRange(_selectionEnd, _selectionEnd);
        } else if (newLength === currentLength) {
          if (operation === 'insert' || operation === 'delete-back-single') this.inputEl.setSelectionRange(_selectionEnd + 1, _selectionEnd + 1);else if (operation === 'delete-single') this.inputEl.setSelectionRange(_selectionEnd - 1, _selectionEnd - 1);else if (operation === 'delete-range' || operation === 'spin') this.inputEl.setSelectionRange(_selectionEnd, _selectionEnd);
        } else if (operation === 'delete-back-single') {
          var prevChar = inputValue.charAt(_selectionEnd - 1);
          var nextChar = inputValue.charAt(_selectionEnd);
          var diff = currentLength - newLength;

          var isGroupChar = this._group.test(nextChar);

          if (isGroupChar && diff === 1) {
            _selectionEnd += 1;
          } else if (!isGroupChar && this.isNumeralChar(prevChar)) {
            _selectionEnd += -1 * diff + 1;
          }

          this._group.lastIndex = 0;
          this.inputEl.setSelectionRange(_selectionEnd, _selectionEnd);
        } else if (inputValue === '-' && operation === 'insert') {
          this.inputEl.setSelectionRange(_selectionEnd + 1, _selectionEnd + 1);
        } else {
          _selectionEnd = _selectionEnd + (newLength - currentLength);
          this.inputEl.setSelectionRange(_selectionEnd, _selectionEnd);
        }
      }

      this.inputEl.setAttribute('aria-valuenow', value);
    }
  }, {
    key: "updateInputValue",
    value: function updateInputValue(newValue) {
      this.inputEl.value = this.formatValue(newValue);
      this.inputEl.setAttribute('aria-valuenow', newValue);
    }
  }, {
    key: "updateModel",
    value: function updateModel(event, value) {
      if (this.props.onValueChange) {
        this.props.onValueChange({
          originalEvent: event,
          value: value,
          stopPropagation: function stopPropagation() {},
          preventDefault: function preventDefault() {},
          target: {
            name: this.props.name,
            id: this.props.id,
            value: value
          }
        });
      }
    }
  }, {
    key: "onInputFocus",
    value: function onInputFocus(event) {
      var _this3 = this;

      event.persist();
      this.setState({
        focused: true
      }, function () {
        if (_this3.props.onFocus) {
          _this3.props.onFocus(event);
        }
      });
    }
  }, {
    key: "onInputBlur",
    value: function onInputBlur(event) {
      var _this4 = this;

      event.persist();
      this.setState({
        focused: false
      }, function () {
        var newValue = _this4.validateValue(_this4.parseValue(_this4.inputEl.value));

        _this4.updateInputValue(newValue);

        _this4.updateModel(event, newValue);

        if (_this4.props.onBlur) {
          _this4.props.onBlur(event);
        }
      });
    }
  }, {
    key: "clearTimer",
    value: function clearTimer() {
      if (this.timer) {
        clearInterval(this.timer);
      }
    }
  }, {
    key: "isStacked",
    value: function isStacked() {
      return this.props.showButtons && this.props.buttonLayout === 'stacked';
    }
  }, {
    key: "isHorizontal",
    value: function isHorizontal() {
      return this.props.showButtons && this.props.buttonLayout === 'horizontal';
    }
  }, {
    key: "isVertical",
    value: function isVertical() {
      return this.props.showButtons && this.props.buttonLayout === 'vertical';
    }
  }, {
    key: "getInputMode",
    value: function getInputMode() {
      return this.props.inputMode || (this.props.mode === 'decimal' && !this.props.minFractionDigits ? 'numeric' : 'decimal');
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.tooltip) {
        this.renderTooltip();
      }

      var newValue = this.validateValue(this.props.value);

      if (this.props.value !== newValue) {
        this.updateModel(null, newValue);
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.tooltip !== this.props.tooltip || prevProps.tooltipOptions !== this.props.tooltipOptions) {
        if (this.tooltip) this.tooltip.update(_objectSpread({
          content: this.props.tooltip
        }, this.props.tooltipOptions || {}));else this.renderTooltip();
      }

      var isOptionChanged = this.isOptionChanged(prevProps);

      if (isOptionChanged) {
        this.constructParser();
      }

      if (prevProps.value !== this.props.value || isOptionChanged) {
        var newValue = this.validateValue(this.props.value);
        this.updateInputValue(newValue);

        if (this.props.value !== newValue) {
          this.updateModel(null, newValue);
        }
      }
    }
  }, {
    key: "isOptionChanged",
    value: function isOptionChanged(prevProps) {
      var _this5 = this;

      var optionProps = ['locale', 'localeMatcher', 'mode', 'currency', 'currencyDisplay', 'useGrouping', 'minFractionDigits', 'maxFractionDigits', 'suffix', 'prefix'];
      return optionProps.some(function (option) {
        return prevProps[option] !== _this5.props[option];
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.tooltip) {
        this.tooltip.destroy();
        this.tooltip = null;
      }
    }
  }, {
    key: "renderTooltip",
    value: function renderTooltip() {
      this.tooltip = (0, _Tooltip.tip)({
        target: this.element,
        content: this.props.tooltip,
        options: this.props.tooltipOptions
      });
    }
  }, {
    key: "renderInputElement",
    value: function renderInputElement() {
      var _this6 = this;

      var className = (0, _ClassNames.classNames)('p-inputnumber-input', this.props.inputClassName);
      var valueToRender = this.formatValue(this.props.value);
      return /*#__PURE__*/_react.default.createElement(_InputText.InputText, {
        ref: function ref(el) {
          return _this6.inputEl = el;
        },
        id: this.props.inputId,
        style: this.props.inputStyle,
        role: "spinbutton",
        className: className,
        defaultValue: valueToRender,
        type: this.props.type,
        size: this.props.size,
        tabIndex: this.props.tabIndex,
        inputMode: this.getInputMode(),
        maxLength: this.props.maxlength,
        disabled: this.props.disabled,
        required: this.props.required,
        pattern: this.props.pattern,
        placeholder: this.props.placeholder,
        readOnly: this.props.readOnly,
        name: this.props.name,
        autoFocus: this.props.autoFocus,
        onKeyDown: this.onInputKeyDown,
        onKeyPress: this.onInputKeyPress,
        onInput: this.onInput,
        onClick: this.onInputClick,
        onBlur: this.onInputBlur,
        onFocus: this.onInputFocus,
        onPaste: this.onPaste,
        min: this.props.min,
        max: this.props.max,
        "aria-valuemin": this.props.min,
        "aria-valuemax": this.props.max,
        "aria-valuenow": this.props.value,
        "aria-labelledby": this.props.ariaLabelledBy
      });
    }
  }, {
    key: "renderUpButton",
    value: function renderUpButton() {
      var className = (0, _ClassNames.classNames)('p-inputnumber-button p-inputnumber-button-up p-button p-button-icon-only p-component', {
        'p-disabled': this.props.disabled
      }, this.props.incrementButtonClassName);
      var icon = (0, _ClassNames.classNames)('p-button-icon', this.props.incrementButtonIcon);
      return /*#__PURE__*/_react.default.createElement("button", {
        type: "button",
        className: className,
        onMouseLeave: this.onUpButtonMouseLeave,
        onMouseDown: this.onUpButtonMouseDown,
        onMouseUp: this.onUpButtonMouseUp,
        onKeyDown: this.onUpButtonKeyDown,
        onKeyUp: this.onUpButtonKeyUp,
        disabled: this.props.disabled,
        tabIndex: -1
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: icon
      }), /*#__PURE__*/_react.default.createElement(_Ripple.Ripple, null));
    }
  }, {
    key: "renderDownButton",
    value: function renderDownButton() {
      var className = (0, _ClassNames.classNames)('p-inputnumber-button p-inputnumber-button-down p-button p-button-icon-only p-component', {
        'p-disabled': this.props.disabled
      }, this.props.decrementButtonClassName);
      var icon = (0, _ClassNames.classNames)('p-button-icon', this.props.decrementButtonIcon);
      return /*#__PURE__*/_react.default.createElement("button", {
        type: "button",
        className: className,
        onMouseLeave: this.onDownButtonMouseLeave,
        onMouseDown: this.onDownButtonMouseDown,
        onMouseUp: this.onDownButtonMouseUp,
        onKeyDown: this.onDownButtonKeyDown,
        onKeyUp: this.onDownButtonKeyUp,
        disabled: this.props.disabled,
        tabIndex: -1
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: icon
      }), /*#__PURE__*/_react.default.createElement(_Ripple.Ripple, null));
    }
  }, {
    key: "renderButtonGroup",
    value: function renderButtonGroup() {
      var upButton = this.props.showButtons && this.renderUpButton();
      var downButton = this.props.showButtons && this.renderDownButton();

      if (this.isStacked()) {
        return /*#__PURE__*/_react.default.createElement("span", {
          className: "p-inputnumber-button-group"
        }, upButton, downButton);
      }

      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, upButton, downButton);
    }
  }, {
    key: "render",
    value: function render() {
      var _this7 = this;

      var className = (0, _ClassNames.classNames)('p-inputnumber p-component', this.props.className, {
        'p-inputwrapper-filled': this.props.value != null && this.props.value.toString().length > 0,
        'p-inputwrapper-focus': this.state.focused,
        'p-inputnumber-buttons-stacked': this.isStacked(),
        'p-inputnumber-buttons-horizontal': this.isHorizontal(),
        'p-inputnumber-buttons-vertical': this.isVertical()
      });
      var inputElement = this.renderInputElement();
      var buttonGroup = this.renderButtonGroup();
      return /*#__PURE__*/_react.default.createElement("span", {
        ref: function ref(el) {
          return _this7.element = el;
        },
        id: this.props.id,
        className: className,
        style: this.props.style
      }, inputElement, buttonGroup);
    }
  }]);

  return InputNumber;
}(_react.Component);

exports.InputNumber = InputNumber;

_defineProperty(InputNumber, "defaultProps", {
  value: null,
  format: true,
  showButtons: false,
  buttonLayout: 'stacked',
  incrementButtonClassName: null,
  decrementButtonClassName: null,
  incrementButtonIcon: 'pi pi-angle-up',
  decrementButtonIcon: 'pi pi-angle-down',
  locale: undefined,
  localeMatcher: undefined,
  mode: 'decimal',
  suffix: null,
  prefix: null,
  currency: undefined,
  currencyDisplay: undefined,
  useGrouping: true,
  minFractionDigits: undefined,
  maxFractionDigits: undefined,
  id: null,
  name: null,
  type: 'text',
  step: 1,
  min: null,
  max: null,
  disabled: false,
  required: false,
  tabIndex: null,
  pattern: null,
  inputMode: null,
  placeholder: null,
  readOnly: false,
  size: null,
  style: null,
  className: null,
  inputId: null,
  autoFocus: false,
  inputStyle: null,
  inputClassName: null,
  tooltip: null,
  tooltipOptions: null,
  ariaLabelledBy: null,
  onValueChange: null,
  onChange: null,
  onBlur: null,
  onFocus: null,
  onKeyDown: null
});

_defineProperty(InputNumber, "propTypes", {
  value: _propTypes.default.number,
  format: _propTypes.default.bool,
  showButtons: _propTypes.default.bool,
  buttonLayout: _propTypes.default.string,
  incrementButtonClassName: _propTypes.default.string,
  decrementButtonClassName: _propTypes.default.string,
  incrementButtonIcon: _propTypes.default.string,
  decrementButtonIcon: _propTypes.default.string,
  locale: _propTypes.default.string,
  localeMatcher: _propTypes.default.string,
  mode: _propTypes.default.string,
  suffix: _propTypes.default.string,
  prefix: _propTypes.default.string,
  currency: _propTypes.default.string,
  currencyDisplay: _propTypes.default.string,
  useGrouping: _propTypes.default.bool,
  minFractionDigits: _propTypes.default.number,
  maxFractionDigits: _propTypes.default.number,
  id: _propTypes.default.string,
  name: _propTypes.default.string,
  type: _propTypes.default.string,
  step: _propTypes.default.number,
  min: _propTypes.default.number,
  max: _propTypes.default.number,
  disabled: _propTypes.default.bool,
  required: _propTypes.default.bool,
  tabIndex: _propTypes.default.number,
  pattern: _propTypes.default.string,
  inputMode: _propTypes.default.string,
  placeholder: _propTypes.default.string,
  readOnly: _propTypes.default.bool,
  size: _propTypes.default.number,
  style: _propTypes.default.object,
  className: _propTypes.default.string,
  inputId: _propTypes.default.string,
  autoFocus: _propTypes.default.bool,
  inputStyle: _propTypes.default.object,
  inputClassName: _propTypes.default.string,
  tooltip: _propTypes.default.string,
  tooltipOptions: _propTypes.default.object,
  ariaLabelledBy: _propTypes.default.string,
  onValueChange: _propTypes.default.func,
  onChange: _propTypes.default.func,
  onBlur: _propTypes.default.func,
  onFocus: _propTypes.default.func,
  onKeyDown: _propTypes.default.func
});