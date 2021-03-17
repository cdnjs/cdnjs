"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputMask = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _DomHandler = _interopRequireDefault(require("../utils/DomHandler"));

var _InputText = require("../inputtext/InputText");

var _ClassNames = require("../utils/ClassNames");

var _Tooltip = require("../tooltip/Tooltip");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

var InputMask = /*#__PURE__*/function (_Component) {
  _inherits(InputMask, _Component);

  var _super = _createSuper(InputMask);

  function InputMask(props) {
    var _this;

    _classCallCheck(this, InputMask);

    _this = _super.call(this, props);
    _this.onFocus = _this.onFocus.bind(_assertThisInitialized(_this));
    _this.onBlur = _this.onBlur.bind(_assertThisInitialized(_this));
    _this.onKeyDown = _this.onKeyDown.bind(_assertThisInitialized(_this));
    _this.onKeyPress = _this.onKeyPress.bind(_assertThisInitialized(_this));
    _this.onInput = _this.onInput.bind(_assertThisInitialized(_this));
    _this.handleInputChange = _this.handleInputChange.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(InputMask, [{
    key: "caret",
    value: function caret(first, last) {
      var range, begin, end;

      if (!this.input.offsetParent || this.input !== document.activeElement) {
        return;
      }

      if (typeof first === 'number') {
        begin = first;
        end = typeof last === 'number' ? last : begin;

        if (this.input.setSelectionRange) {
          this.input.setSelectionRange(begin, end);
        } else if (this.input['createTextRange']) {
          range = this.input['createTextRange']();
          range.collapse(true);
          range.moveEnd('character', end);
          range.moveStart('character', begin);
          range.select();
        }
      } else {
        if (this.input.setSelectionRange) {
          begin = this.input.selectionStart;
          end = this.input.selectionEnd;
        } else if (document['selection'] && document['selection'].createRange) {
          range = document['selection'].createRange();
          begin = 0 - range.duplicate().moveStart('character', -100000);
          end = begin + range.text.length;
        }

        return {
          begin: begin,
          end: end
        };
      }
    }
  }, {
    key: "isCompleted",
    value: function isCompleted() {
      for (var i = this.firstNonMaskPos; i <= this.lastRequiredNonMaskPos; i++) {
        if (this.tests[i] && this.buffer[i] === this.getPlaceholder(i)) {
          return false;
        }
      }

      return true;
    }
  }, {
    key: "getPlaceholder",
    value: function getPlaceholder(i) {
      if (i < this.props.slotChar.length) {
        return this.props.slotChar.charAt(i);
      }

      return this.props.slotChar.charAt(0);
    }
  }, {
    key: "getValue",
    value: function getValue() {
      return this.props.unmask ? this.getUnmaskedValue() : this.input && this.input.value;
    }
  }, {
    key: "seekNext",
    value: function seekNext(pos) {
      while (++pos < this.len && !this.tests[pos]) {
        ;
      }

      return pos;
    }
  }, {
    key: "seekPrev",
    value: function seekPrev(pos) {
      while (--pos >= 0 && !this.tests[pos]) {
        ;
      }

      return pos;
    }
  }, {
    key: "shiftL",
    value: function shiftL(begin, end) {
      var i, j;

      if (begin < 0) {
        return;
      }

      for (i = begin, j = this.seekNext(end); i < this.len; i++) {
        if (this.tests[i]) {
          if (j < this.len && this.tests[i].test(this.buffer[j])) {
            this.buffer[i] = this.buffer[j];
            this.buffer[j] = this.getPlaceholder(j);
          } else {
            break;
          }

          j = this.seekNext(j);
        }
      }

      this.writeBuffer();
      this.caret(Math.max(this.firstNonMaskPos, begin));
    }
  }, {
    key: "shiftR",
    value: function shiftR(pos) {
      var i, c, j, t;

      for (i = pos, c = this.getPlaceholder(pos); i < this.len; i++) {
        if (this.tests[i]) {
          j = this.seekNext(i);
          t = this.buffer[i];
          this.buffer[i] = c;

          if (j < this.len && this.tests[j].test(t)) {
            c = t;
          } else {
            break;
          }
        }
      }
    }
  }, {
    key: "handleAndroidInput",
    value: function handleAndroidInput(e) {
      var curVal = this.input.value;
      var pos = this.caret();

      if (this.oldVal && this.oldVal.length && this.oldVal.length > curVal.length) {
        // a deletion or backspace happened
        this.checkVal(true);

        while (pos.begin > 0 && !this.tests[pos.begin - 1]) {
          pos.begin--;
        }

        if (pos.begin === 0) {
          while (pos.begin < this.firstNonMaskPos && !this.tests[pos.begin]) {
            pos.begin++;
          }
        }

        this.caret(pos.begin, pos.begin);
      } else {
        this.checkVal(true);

        while (pos.begin < this.len && !this.tests[pos.begin]) {
          pos.begin++;
        }

        this.caret(pos.begin, pos.begin);
      }

      if (this.props.onComplete && this.isCompleted()) {
        this.props.onComplete({
          originalEvent: e,
          value: this.getValue()
        });
      }
    }
  }, {
    key: "onBlur",
    value: function onBlur(e) {
      this.focus = false;
      this.checkVal();
      this.updateModel(e);
      this.updateFilledState();

      if (this.props.onBlur) {
        this.props.onBlur(e);
      }

      if (this.input.value !== this.focusText) {
        var event = document.createEvent('HTMLEvents');
        event.initEvent('change', true, false);
        this.input.dispatchEvent(event);
      }
    }
  }, {
    key: "onKeyDown",
    value: function onKeyDown(e) {
      if (this.props.readOnly) {
        return;
      }

      var k = e.which || e.keyCode,
          pos,
          begin,
          end;
      var iPhone = /iphone/i.test(_DomHandler.default.getUserAgent());
      this.oldVal = this.input.value; //backspace, delete, and escape get special treatment

      if (k === 8 || k === 46 || iPhone && k === 127) {
        pos = this.caret();
        begin = pos.begin;
        end = pos.end;

        if (end - begin === 0) {
          begin = k !== 46 ? this.seekPrev(begin) : end = this.seekNext(begin - 1);
          end = k === 46 ? this.seekNext(end) : end;
        }

        this.clearBuffer(begin, end);
        this.shiftL(begin, end - 1);
        this.updateModel(e);
        e.preventDefault();
      } else if (k === 13) {
        // enter
        this.onBlur(e);
        this.updateModel(e);
      } else if (k === 27) {
        // escape
        this.input.value = this.focusText;
        this.caret(0, this.checkVal());
        this.updateModel(e);
        e.preventDefault();
      }
    }
  }, {
    key: "onKeyPress",
    value: function onKeyPress(e) {
      var _this2 = this;

      if (this.props.readOnly) {
        return;
      }

      var k = e.which || e.keyCode,
          pos = this.caret(),
          p,
          c,
          next,
          completed;

      if (e.ctrlKey || e.altKey || e.metaKey || k < 32) {
        //Ignore
        return;
      } else if (k && k !== 13) {
        if (pos.end - pos.begin !== 0) {
          this.clearBuffer(pos.begin, pos.end);
          this.shiftL(pos.begin, pos.end - 1);
        }

        p = this.seekNext(pos.begin - 1);

        if (p < this.len) {
          c = String.fromCharCode(k);

          if (this.tests[p].test(c)) {
            this.shiftR(p);
            this.buffer[p] = c;
            this.writeBuffer();
            next = this.seekNext(p);

            if (/android/i.test(_DomHandler.default.getUserAgent())) {
              //Path for CSP Violation on FireFox OS 1.1
              var proxy = function proxy() {
                _this2.caret(next);
              };

              setTimeout(proxy, 0);
            } else {
              this.caret(next);
            }

            if (pos.begin <= this.lastRequiredNonMaskPos) {
              completed = this.isCompleted();
            }
          }
        }

        e.preventDefault();
      }

      this.updateModel(e);

      if (this.props.onComplete && completed) {
        this.props.onComplete({
          originalEvent: e,
          value: this.getValue()
        });
      }
    }
  }, {
    key: "clearBuffer",
    value: function clearBuffer(start, end) {
      var i;

      for (i = start; i < end && i < this.len; i++) {
        if (this.tests[i]) {
          this.buffer[i] = this.getPlaceholder(i);
        }
      }
    }
  }, {
    key: "writeBuffer",
    value: function writeBuffer() {
      this.input.value = this.buffer.join('');
    }
  }, {
    key: "checkVal",
    value: function checkVal(allow) {
      this.isValueChecked = true; //try to place characters where they belong

      var test = this.input.value,
          lastMatch = -1,
          i,
          c,
          pos;

      for (i = 0, pos = 0; i < this.len; i++) {
        if (this.tests[i]) {
          this.buffer[i] = this.getPlaceholder(i);

          while (pos++ < test.length) {
            c = test.charAt(pos - 1);

            if (this.tests[i].test(c)) {
              this.buffer[i] = c;
              lastMatch = i;
              break;
            }
          }

          if (pos > test.length) {
            this.clearBuffer(i + 1, this.len);
            break;
          }
        } else {
          if (this.buffer[i] === test.charAt(pos)) {
            pos++;
          }

          if (i < this.partialPosition) {
            lastMatch = i;
          }
        }
      }

      if (allow) {
        this.writeBuffer();
      } else if (lastMatch + 1 < this.partialPosition) {
        if (this.props.autoClear || this.buffer.join('') === this.defaultBuffer) {
          // Invalid value. Remove it and replace it with the
          // mask, which is the default behavior.
          if (this.input.value) this.input.value = '';
          this.clearBuffer(0, this.len);
        } else {
          // Invalid value, but we opt to show the value to the
          // user and allow them to correct their mistake.
          this.writeBuffer();
        }
      } else {
        this.writeBuffer();
        this.input.value = this.input.value.substring(0, lastMatch + 1);
      }

      return this.partialPosition ? i : this.firstNonMaskPos;
    }
  }, {
    key: "onFocus",
    value: function onFocus(e) {
      var _this3 = this;

      if (this.props.readOnly) {
        return;
      }

      this.focus = true;
      clearTimeout(this.caretTimeoutId);
      var pos;
      this.focusText = this.input.value;
      pos = this.checkVal();
      this.caretTimeoutId = setTimeout(function () {
        if (_this3.input !== document.activeElement) {
          return;
        }

        _this3.writeBuffer();

        if (pos === _this3.props.mask.replace("?", "").length) {
          _this3.caret(0, pos);
        } else {
          _this3.caret(pos);
        }

        _this3.updateFilledState();
      }, 10);

      if (this.props.onFocus) {
        this.props.onFocus(e);
      }
    }
  }, {
    key: "onInput",
    value: function onInput(event) {
      if (this.androidChrome) this.handleAndroidInput(event);else this.handleInputChange(event);
    }
  }, {
    key: "handleInputChange",
    value: function handleInputChange(e) {
      if (this.props.readOnly) {
        return;
      }

      var pos = this.checkVal(true);
      this.caret(pos);
      this.updateModel(e);

      if (this.props.onComplete && this.isCompleted()) {
        this.props.onComplete({
          originalEvent: e,
          value: this.getValue()
        });
      }
    }
  }, {
    key: "getUnmaskedValue",
    value: function getUnmaskedValue() {
      var unmaskedBuffer = [];

      for (var i = 0; i < this.buffer.length; i++) {
        var c = this.buffer[i];

        if (this.tests[i] && c !== this.getPlaceholder(i)) {
          unmaskedBuffer.push(c);
        }
      }

      return unmaskedBuffer.join('');
    }
  }, {
    key: "updateModel",
    value: function updateModel(e) {
      if (this.props.onChange) {
        var val = this.props.unmask ? this.getUnmaskedValue() : e && e.target.value;
        this.props.onChange({
          originalEvent: e,
          value: this.defaultBuffer !== val ? val : '',
          stopPropagation: function stopPropagation() {},
          preventDefault: function preventDefault() {},
          target: {
            name: this.props.name,
            id: this.props.id,
            value: this.defaultBuffer !== val ? val : ''
          }
        });
      }
    }
  }, {
    key: "updateFilledState",
    value: function updateFilledState() {
      if (this.input && this.input.value && this.input.value.length > 0) _DomHandler.default.addClass(this.input, 'p-filled');else _DomHandler.default.removeClass(this.input, 'p-filled');
    }
  }, {
    key: "updateValue",
    value: function updateValue(allow) {
      var _this4 = this;

      var pos;

      if (this.input) {
        if (this.props.value == null) {
          this.input.value = '';
        } else {
          this.input.value = this.props.value;
          pos = this.checkVal(allow);
          setTimeout(function () {
            if (_this4.input) {
              _this4.writeBuffer();

              return _this4.checkVal(allow);
            }
          }, 10);
        }

        this.focusText = this.input.value;
      }

      this.updateFilledState();
      return pos;
    }
  }, {
    key: "isValueUpdated",
    value: function isValueUpdated() {
      return this.props.unmask ? this.props.value !== this.getUnmaskedValue() : this.defaultBuffer !== this.input.value && this.input.value !== this.props.value;
    }
  }, {
    key: "init",
    value: function init() {
      this.tests = [];
      this.partialPosition = this.props.mask.length;
      this.len = this.props.mask.length;
      this.firstNonMaskPos = null;
      this.defs = {
        '9': '[0-9]',
        'a': '[A-Za-z]',
        '*': '[A-Za-z0-9]'
      };

      var ua = _DomHandler.default.getUserAgent();

      this.androidChrome = /chrome/i.test(ua) && /android/i.test(ua);
      var maskTokens = this.props.mask.split('');

      for (var i = 0; i < maskTokens.length; i++) {
        var c = maskTokens[i];

        if (c === '?') {
          this.len--;
          this.partialPosition = i;
        } else if (this.defs[c]) {
          this.tests.push(new RegExp(this.defs[c]));

          if (this.firstNonMaskPos === null) {
            this.firstNonMaskPos = this.tests.length - 1;
          }

          if (i < this.partialPosition) {
            this.lastRequiredNonMaskPos = this.tests.length - 1;
          }
        } else {
          this.tests.push(null);
        }
      }

      this.buffer = [];

      for (var _i = 0; _i < maskTokens.length; _i++) {
        var _c = maskTokens[_i];

        if (_c !== '?') {
          if (this.defs[_c]) this.buffer.push(this.getPlaceholder(_i));else this.buffer.push(_c);
        }
      }

      this.defaultBuffer = this.buffer.join('');
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.init();
      this.updateValue();

      if (this.props.tooltip) {
        this.renderTooltip();
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

      if (this.isValueUpdated()) {
        this.updateValue();
      }

      if (prevProps.mask !== this.props.mask) {
        this.init();
        this.caret(this.updateValue(true));
        this.updateModel();
      }
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
        target: this.input,
        content: this.props.tooltip,
        options: this.props.tooltipOptions
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      var inputMaskClassName = (0, _ClassNames.classNames)('p-inputmask', this.props.className);
      return /*#__PURE__*/_react.default.createElement(_InputText.InputText, {
        id: this.props.id,
        ref: function ref(el) {
          return _this5.input = el;
        },
        type: this.props.type,
        name: this.props.name,
        style: this.props.style,
        className: inputMaskClassName,
        placeholder: this.props.placeholder,
        size: this.props.size,
        maxLength: this.props.maxlength,
        tabIndex: this.props.tabIndex,
        disabled: this.props.disabled,
        readOnly: this.props.readOnly,
        onFocus: this.onFocus,
        onBlur: this.onBlur,
        onKeyDown: this.onKeyDown,
        onKeyPress: this.onKeyPress,
        onInput: this.onInput,
        onPaste: this.handleInputChange,
        required: this.props.required,
        "aria-labelledby": this.props.ariaLabelledBy
      });
    }
  }]);

  return InputMask;
}(_react.Component);

exports.InputMask = InputMask;

_defineProperty(InputMask, "defaultProps", {
  id: null,
  value: null,
  type: 'text',
  mask: null,
  slotChar: '_',
  autoClear: true,
  unmask: false,
  style: null,
  className: null,
  placeholder: null,
  size: null,
  maxlength: null,
  tabIndex: null,
  disabled: false,
  readOnly: false,
  name: null,
  required: false,
  tooltip: null,
  tooltipOptions: null,
  ariaLabelledBy: null,
  onComplete: null,
  onChange: null,
  onFocus: null,
  onBlur: null
});

_defineProperty(InputMask, "propTypes", {
  id: _propTypes.default.string,
  value: _propTypes.default.string,
  type: _propTypes.default.string,
  mask: _propTypes.default.string,
  slotChar: _propTypes.default.string,
  autoClear: _propTypes.default.bool,
  unmask: _propTypes.default.bool,
  style: _propTypes.default.object,
  className: _propTypes.default.string,
  placeholder: _propTypes.default.string,
  size: _propTypes.default.number,
  maxlength: _propTypes.default.number,
  tabIndex: _propTypes.default.number,
  disabled: _propTypes.default.bool,
  readOnly: _propTypes.default.bool,
  name: _propTypes.default.string,
  required: _propTypes.default.bool,
  tooltip: _propTypes.default.string,
  tooltipOptions: _propTypes.default.object,
  ariaLabelledBy: _propTypes.default.string,
  onComplete: _propTypes.default.func,
  onChange: _propTypes.default.func,
  onFocus: _propTypes.default.func,
  onBlur: _propTypes.default.func
});