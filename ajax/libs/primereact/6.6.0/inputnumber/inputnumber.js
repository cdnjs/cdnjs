this.primereact = this.primereact || {};
this.primereact.inputnumber = (function (exports, React, inputtext, core) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

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

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _defineProperty(obj, key, value) {
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

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
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
      _this.inputRef = /*#__PURE__*/React.createRef(_this.props.inputRef);
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
        this._group = this.getGroupingExpression();
        this._minusSign = this.getMinusSignExpression();
        this._currency = this.getCurrencyExpression();
        this._decimal = this.getDecimalExpression();
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
        var formatter = new Intl.NumberFormat(this.props.locale, _objectSpread(_objectSpread({}, this.getOptions()), {}, {
          useGrouping: false
        }));
        return new RegExp("[".concat(formatter.format(1.1).replace(this._currency, '').trim().replace(this._numeral, ''), "]"), 'g');
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
            currencyDisplay: this.props.currencyDisplay,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
          });
          return new RegExp("[".concat(formatter.format(1).replace(/\s/g, '').replace(this._numeral, '').replace(this._group, ''), "]"), 'g');
        }

        return new RegExp("[]", 'g');
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
        if (this.inputRef && this.inputRef.current) {
          var step = this.props.step * dir;
          var currentValue = this.parseValue(this.inputRef.current.value) || 0;
          var newValue = this.validateValue(currentValue + step);
          this.updateInput(newValue, null, 'spin');
          this.updateModel(event, newValue);
          this.handleOnChange(event, currentValue, newValue);
        }
      }
    }, {
      key: "onUpButtonMouseDown",
      value: function onUpButtonMouseDown(event) {
        if (!this.props.disabled) {
          this.inputRef.current.focus();
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
      value: function onDownButtonMouseDown(event) {
        if (!this.props.disabled) {
          this.inputRef.current.focus();
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
            if (!this.isNumeralChar(inputValue.charAt(selectionStart - 1))) {
              event.preventDefault();
            }

            break;
          //right

          case 39:
            if (!this.isNumeralChar(inputValue.charAt(selectionStart))) {
              event.preventDefault();
            }

            break;
          //enter

          case 13:
            newValueStr = this.validateValue(this.parseValue(inputValue));
            this.inputRef.current.value = this.formatValue(newValueStr);
            this.inputRef.current.setAttribute('aria-valuenow', newValueStr);
            this.updateModel(event, newValueStr);
            break;
          //backspace

          case 8:
            event.preventDefault();

            if (selectionStart === selectionEnd) {
              var deleteChar = inputValue.charAt(selectionStart - 1);

              var _this$getDecimalCharI = this.getDecimalCharIndexes(inputValue),
                  decimalCharIndex = _this$getDecimalCharI.decimalCharIndex,
                  decimalCharIndexWithoutPrefix = _this$getDecimalCharI.decimalCharIndexWithoutPrefix;

              if (this.isNumeralChar(deleteChar)) {
                var decimalLength = this.getDecimalLength(inputValue);

                if (this._group.test(deleteChar)) {
                  this._group.lastIndex = 0;
                  newValueStr = inputValue.slice(0, selectionStart - 2) + inputValue.slice(selectionStart - 1);
                } else if (this._decimal.test(deleteChar)) {
                  this._decimal.lastIndex = 0;

                  if (decimalLength) {
                    this.inputRef.current.setSelectionRange(selectionStart - 1, selectionStart - 1);
                  } else {
                    newValueStr = inputValue.slice(0, selectionStart - 1) + inputValue.slice(selectionStart);
                  }
                } else if (decimalCharIndex > 0 && selectionStart > decimalCharIndex) {
                  var insertedText = this.isDecimalMode() && (this.props.minFractionDigits || 0) < decimalLength ? '' : '0';
                  newValueStr = inputValue.slice(0, selectionStart - 1) + insertedText + inputValue.slice(selectionStart);
                } else if (decimalCharIndexWithoutPrefix === 1) {
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

              var _this$getDecimalCharI2 = this.getDecimalCharIndexes(inputValue),
                  _decimalCharIndex = _this$getDecimalCharI2.decimalCharIndex,
                  _decimalCharIndexWithoutPrefix = _this$getDecimalCharI2.decimalCharIndexWithoutPrefix;

              if (this.isNumeralChar(_deleteChar)) {
                var _decimalLength = this.getDecimalLength(inputValue);

                if (this._group.test(_deleteChar)) {
                  this._group.lastIndex = 0;
                  newValueStr = inputValue.slice(0, selectionStart) + inputValue.slice(selectionStart + 2);
                } else if (this._decimal.test(_deleteChar)) {
                  this._decimal.lastIndex = 0;

                  if (_decimalLength) {
                    this.$refs.input.$el.setSelectionRange(selectionStart + 1, selectionStart + 1);
                  } else {
                    newValueStr = inputValue.slice(0, selectionStart) + inputValue.slice(selectionStart + 1);
                  }
                } else if (_decimalCharIndex > 0 && selectionStart > _decimalCharIndex) {
                  var _insertedText = this.isDecimalMode() && (this.props.minFractionDigits || 0) < _decimalLength ? '' : '0';

                  newValueStr = inputValue.slice(0, selectionStart) + _insertedText + inputValue.slice(selectionStart + 1);
                } else if (_decimalCharIndexWithoutPrefix === 1) {
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
        if (this._minusSign.test(char) || char === '-') {
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
      key: "isDecimalMode",
      value: function isDecimalMode() {
        return this.props.mode === 'decimal';
      }
    }, {
      key: "getDecimalCharIndexes",
      value: function getDecimalCharIndexes(val) {
        var decimalCharIndex = val.search(this._decimal);
        this._decimal.lastIndex = 0;
        var filteredVal = val.replace(this._prefix, '').trim().replace(/\s/g, '').replace(this._currency, '');
        var decimalCharIndexWithoutPrefix = filteredVal.search(this._decimal);
        this._decimal.lastIndex = 0;
        return {
          decimalCharIndex: decimalCharIndex,
          decimalCharIndexWithoutPrefix: decimalCharIndexWithoutPrefix
        };
      }
    }, {
      key: "getCharIndexes",
      value: function getCharIndexes(val) {
        var decimalCharIndex = val.search(this._decimal);
        this._decimal.lastIndex = 0;
        var minusCharIndex = val.search(this._minusSign);
        this._minusSign.lastIndex = 0;
        var suffixCharIndex = val.search(this._suffix);
        this._suffix.lastIndex = 0;
        var currencyCharIndex = val.search(this._currency);
        this._currency.lastIndex = 0;
        return {
          decimalCharIndex: decimalCharIndex,
          minusCharIndex: minusCharIndex,
          suffixCharIndex: suffixCharIndex,
          currencyCharIndex: currencyCharIndex
        };
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

        var selectionStart = this.inputRef.current.selectionStart;
        var selectionEnd = this.inputRef.current.selectionEnd;
        var inputValue = this.inputRef.current.value.trim();

        var _this$getCharIndexes = this.getCharIndexes(inputValue),
            decimalCharIndex = _this$getCharIndexes.decimalCharIndex,
            minusCharIndex = _this$getCharIndexes.minusCharIndex,
            suffixCharIndex = _this$getCharIndexes.suffixCharIndex,
            currencyCharIndex = _this$getCharIndexes.currencyCharIndex;

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
          } else if (decimalCharIndex === -1 && this.props.maxFractionDigits) {
            newValueStr = this.insertText(inputValue, text, selectionStart, selectionEnd);
            this.updateValue(event, newValueStr, text, 'insert');
          }
        } else {
          var maxFractionDigits = this.numberFormat.resolvedOptions().maximumFractionDigits;
          var operation = selectionStart !== selectionEnd ? 'range-insert' : 'insert';

          if (decimalCharIndex > 0 && selectionStart > decimalCharIndex) {
            if (selectionStart + text.length - (decimalCharIndex + 1) <= maxFractionDigits) {
              var charIndex = currencyCharIndex >= selectionStart ? currencyCharIndex - 1 : suffixCharIndex >= selectionStart ? suffixCharIndex : inputValue.length;
              newValueStr = inputValue.slice(0, selectionStart) + text + inputValue.slice(selectionStart + text.length, charIndex) + inputValue.slice(charIndex);
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
        var textSplit = text === '.' ? text : text.split('.');

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
        var selectionStart = this.inputRef.current.selectionStart;
        var inputValue = this.inputRef.current.value;
        var valueLength = inputValue.length;
        var index = null; // remove prefix

        var prefixLength = (this.prefixChar || '').length;
        inputValue = inputValue.replace(this._prefix, '');
        selectionStart = selectionStart - prefixLength;
        var char = inputValue.charAt(selectionStart);

        if (this.isNumeralChar(char)) {
          return selectionStart + prefixLength;
        } //left


        var i = selectionStart - 1;

        while (i >= 0) {
          char = inputValue.charAt(i);

          if (this.isNumeralChar(char)) {
            index = i + prefixLength;
            break;
          } else {
            i--;
          }
        }

        if (index !== null) {
          this.inputRef.current.setSelectionRange(index + 1, index + 1);
        } else {
          i = selectionStart;

          while (i < valueLength) {
            char = inputValue.charAt(i);

            if (this.isNumeralChar(char)) {
              index = i + prefixLength;
              break;
            } else {
              i++;
            }
          }

          if (index !== null) {
            this.inputRef.current.setSelectionRange(index, index);
          }
        }

        return index || 0;
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
        var currentValue = this.inputRef.current.value;
        var newValue = null;

        if (valueStr != null) {
          newValue = this.parseValue(valueStr);
          newValue = !newValue && !this.props.allowEmpty ? 0 : newValue;
          this.updateInput(newValue, insertedValueStr, operation, valueStr);
          this.handleOnChange(event, currentValue, newValue);
        }
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
        if (value === '-' || value == null) {
          return null;
        }

        if (this.props.min !== null && value < this.props.min) {
          return this.props.min;
        }

        if (this.props.max !== null && value > this.props.max) {
          return this.props.max;
        }

        return value;
      }
    }, {
      key: "updateInput",
      value: function updateInput(value, insertedValueStr, operation, valueStr) {
        insertedValueStr = insertedValueStr || '';
        var inputEl = this.inputRef.current;
        var inputValue = inputEl.value;
        var newValue = this.formatValue(value);
        var currentLength = inputValue.length;

        if (newValue !== valueStr) {
          newValue = this.concatValues(newValue, valueStr);
        }

        if (currentLength === 0) {
          inputEl.value = newValue;
          inputEl.setSelectionRange(0, 0);
          var index = this.initCursor();
          var selectionEnd = index + insertedValueStr.length;
          inputEl.setSelectionRange(selectionEnd, selectionEnd);
        } else {
          var selectionStart = inputEl.selectionStart;
          var _selectionEnd = inputEl.selectionEnd;
          inputEl.value = newValue;
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
            inputEl.setSelectionRange(_selectionEnd, _selectionEnd);
          } else if (newLength === currentLength) {
            if (operation === 'insert' || operation === 'delete-back-single') inputEl.setSelectionRange(_selectionEnd + 1, _selectionEnd + 1);else if (operation === 'delete-single') inputEl.setSelectionRange(_selectionEnd - 1, _selectionEnd - 1);else if (operation === 'delete-range' || operation === 'spin') inputEl.setSelectionRange(_selectionEnd, _selectionEnd);
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
            inputEl.setSelectionRange(_selectionEnd, _selectionEnd);
          } else if (inputValue === '-' && operation === 'insert') {
            inputEl.setSelectionRange(0, 0);

            var _index = this.initCursor();

            var _selectionEnd2 = _index + insertedValueStr.length + 1;

            inputEl.setSelectionRange(_selectionEnd2, _selectionEnd2);
          } else {
            _selectionEnd = _selectionEnd + (newLength - currentLength);
            inputEl.setSelectionRange(_selectionEnd, _selectionEnd);
          }
        }

        inputEl.setAttribute('aria-valuenow', value);
      }
    }, {
      key: "updateInputValue",
      value: function updateInputValue(newValue) {
        newValue = !newValue && !this.props.allowEmpty ? 0 : newValue;
        var inputEl = this.inputRef.current;
        var value = inputEl.value;
        var formattedValue = this.formattedValue(newValue);

        if (value !== formattedValue) {
          inputEl.value = formattedValue;
          inputEl.setAttribute('aria-valuenow', newValue);
        }
      }
    }, {
      key: "formattedValue",
      value: function formattedValue(val) {
        var newVal = !val && !this.props.allowEmpty ? 0 : val;
        return this.formatValue(newVal);
      }
    }, {
      key: "concatValues",
      value: function concatValues(val1, val2) {
        if (val1 && val2) {
          var decimalCharIndex = val2.search(this._decimal);
          this._decimal.lastIndex = 0;
          return decimalCharIndex !== -1 ? val1.split(this._decimal)[0] + val2.slice(decimalCharIndex) : val1;
        }

        return val1;
      }
    }, {
      key: "getDecimalLength",
      value: function getDecimalLength(value) {
        if (value) {
          var valueSplit = value.split(this._decimal);

          if (valueSplit.length === 2) {
            return valueSplit[1].replace(this._suffix, '').trim().replace(/\s/g, '').replace(this._currency, '').length;
          }
        }

        return 0;
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
          var currentValue = _this4.inputRef.current.value;

          if (_this4.isValueChanged(currentValue, _this4.props.value)) {
            var newValue = _this4.validateValue(_this4.parseValue(currentValue));

            _this4.updateInputValue(newValue);

            _this4.updateModel(event, newValue);
          }

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
      key: "getFormatter",
      value: function getFormatter() {
        return this.numberFormat;
      }
    }, {
      key: "updateInputRef",
      value: function updateInputRef() {
        var ref = this.props.inputRef;

        if (ref) {
          if (typeof ref === 'function') {
            ref(this.inputRef.current);
          } else {
            ref.current = this.inputRef.current;
          }
        }
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        this.updateInputRef();

        if (this.props.tooltip) {
          this.renderTooltip();
        }

        var newValue = this.validateValue(this.props.value);

        if (this.props.value !== null && this.props.value !== newValue) {
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

          if (this.props.value !== null && this.props.value !== newValue) {
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
        this.tooltip = core.tip({
          target: this.element,
          content: this.props.tooltip,
          options: this.props.tooltipOptions
        });
      }
    }, {
      key: "renderInputElement",
      value: function renderInputElement() {
        var className = core.classNames('p-inputnumber-input', this.props.inputClassName);
        var valueToRender = this.formattedValue(this.props.value);
        return /*#__PURE__*/React__default['default'].createElement(inputtext.InputText, {
          ref: this.inputRef,
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
        var className = core.classNames('p-inputnumber-button p-inputnumber-button-up p-button p-button-icon-only p-component', {
          'p-disabled': this.props.disabled
        }, this.props.incrementButtonClassName);
        var icon = core.classNames('p-button-icon', this.props.incrementButtonIcon);
        return /*#__PURE__*/React__default['default'].createElement("button", {
          type: "button",
          className: className,
          onMouseLeave: this.onUpButtonMouseLeave,
          onMouseDown: this.onUpButtonMouseDown,
          onMouseUp: this.onUpButtonMouseUp,
          onKeyDown: this.onUpButtonKeyDown,
          onKeyUp: this.onUpButtonKeyUp,
          disabled: this.props.disabled,
          tabIndex: -1
        }, /*#__PURE__*/React__default['default'].createElement("span", {
          className: icon
        }), /*#__PURE__*/React__default['default'].createElement(core.Ripple, null));
      }
    }, {
      key: "renderDownButton",
      value: function renderDownButton() {
        var className = core.classNames('p-inputnumber-button p-inputnumber-button-down p-button p-button-icon-only p-component', {
          'p-disabled': this.props.disabled
        }, this.props.decrementButtonClassName);
        var icon = core.classNames('p-button-icon', this.props.decrementButtonIcon);
        return /*#__PURE__*/React__default['default'].createElement("button", {
          type: "button",
          className: className,
          onMouseLeave: this.onDownButtonMouseLeave,
          onMouseDown: this.onDownButtonMouseDown,
          onMouseUp: this.onDownButtonMouseUp,
          onKeyDown: this.onDownButtonKeyDown,
          onKeyUp: this.onDownButtonKeyUp,
          disabled: this.props.disabled,
          tabIndex: -1
        }, /*#__PURE__*/React__default['default'].createElement("span", {
          className: icon
        }), /*#__PURE__*/React__default['default'].createElement(core.Ripple, null));
      }
    }, {
      key: "renderButtonGroup",
      value: function renderButtonGroup() {
        var upButton = this.props.showButtons && this.renderUpButton();
        var downButton = this.props.showButtons && this.renderDownButton();

        if (this.isStacked()) {
          return /*#__PURE__*/React__default['default'].createElement("span", {
            className: "p-inputnumber-button-group"
          }, upButton, downButton);
        }

        return /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, upButton, downButton);
      }
    }, {
      key: "render",
      value: function render() {
        var _this6 = this;

        var className = core.classNames('p-inputnumber p-component p-inputwrapper', this.props.className, {
          'p-inputwrapper-filled': this.props.value != null && this.props.value.toString().length > 0,
          'p-inputwrapper-focus': this.state.focused,
          'p-inputnumber-buttons-stacked': this.isStacked(),
          'p-inputnumber-buttons-horizontal': this.isHorizontal(),
          'p-inputnumber-buttons-vertical': this.isVertical()
        });
        var inputElement = this.renderInputElement();
        var buttonGroup = this.renderButtonGroup();
        return /*#__PURE__*/React__default['default'].createElement("span", {
          ref: function ref(el) {
            return _this6.element = el;
          },
          id: this.props.id,
          className: className,
          style: this.props.style
        }, inputElement, buttonGroup);
      }
    }]);

    return InputNumber;
  }(React.Component);

  _defineProperty(InputNumber, "defaultProps", {
    value: null,
    inputRef: null,
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
    allowEmpty: true,
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

  exports.InputNumber = InputNumber;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

}({}, React, primereact.inputtext, primereact.core));
