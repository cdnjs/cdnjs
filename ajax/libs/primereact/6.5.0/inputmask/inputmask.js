this.primereact = this.primereact || {};
this.primereact.inputmask = (function (exports, React, core, inputtext) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

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
      _this.inputRef = /*#__PURE__*/React.createRef(_this.props.inputRef);
      return _this;
    }

    _createClass(InputMask, [{
      key: "caret",
      value: function caret(first, last) {
        var range, begin, end;
        var inputEl = this.inputRef && this.inputRef.current;

        if (!inputEl || !inputEl.offsetParent || inputEl !== document.activeElement) {
          return;
        }

        if (typeof first === 'number') {
          begin = first;
          end = typeof last === 'number' ? last : begin;

          if (inputEl.setSelectionRange) {
            inputEl.setSelectionRange(begin, end);
          } else if (inputEl['createTextRange']) {
            range = inputEl['createTextRange']();
            range.collapse(true);
            range.moveEnd('character', end);
            range.moveStart('character', begin);
            range.select();
          }
        } else {
          if (inputEl.setSelectionRange) {
            begin = inputEl.selectionStart;
            end = inputEl.selectionEnd;
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
        return this.props.unmask ? this.getUnmaskedValue() : this.inputRef && this.inputRef.current && this.inputRef.current.value;
      }
    }, {
      key: "seekNext",
      value: function seekNext(pos) {
        while (++pos < this.len && !this.tests[pos]) {
        }

        return pos;
      }
    }, {
      key: "seekPrev",
      value: function seekPrev(pos) {
        while (--pos >= 0 && !this.tests[pos]) {
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
        var curVal = this.inputRef.current.value;
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

        if (this.inputRef.current.value !== this.focusText) {
          var event = document.createEvent('HTMLEvents');
          event.initEvent('change', true, false);
          this.inputRef.current.dispatchEvent(event);
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
        var iPhone = /iphone/i.test(core.DomHandler.getUserAgent());
        this.oldVal = this.inputRef.current.value; //backspace, delete, and escape get special treatment

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
          this.inputRef.current.value = this.focusText;
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

              if (/android/i.test(core.DomHandler.getUserAgent())) {
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
        this.inputRef.current.value = this.buffer.join('');
      }
    }, {
      key: "checkVal",
      value: function checkVal(allow) {
        this.isValueChecked = true; //try to place characters where they belong

        var test = this.inputRef.current.value,
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
            if (this.inputRef.current.value) this.inputRef.current.value = '';
            this.clearBuffer(0, this.len);
          } else {
            // Invalid value, but we opt to show the value to the
            // user and allow them to correct their mistake.
            this.writeBuffer();
          }
        } else {
          this.writeBuffer();
          this.inputRef.current.value = this.inputRef.current.value.substring(0, lastMatch + 1);
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
        this.focusText = this.inputRef.current.value;
        pos = this.checkVal();
        this.caretTimeoutId = setTimeout(function () {
          if (_this3.inputRef.current !== document.activeElement) {
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
        if (this.inputRef && this.inputRef.current && this.inputRef.current.value && this.inputRef.current.value.length > 0) core.DomHandler.addClass(this.inputRef.current, 'p-filled');else core.DomHandler.removeClass(this.inputRef.current, 'p-filled');
      }
    }, {
      key: "updateValue",
      value: function updateValue(allow) {
        var _this4 = this;

        var pos;

        if (this.inputRef && this.inputRef.current) {
          if (this.props.value == null) {
            this.inputRef.current.value = '';
          } else {
            this.inputRef.current.value = this.props.value;
            pos = this.checkVal(allow);
            setTimeout(function () {
              if (_this4.inputRef && _this4.inputRef.current) {
                _this4.writeBuffer();

                return _this4.checkVal(allow);
              }
            }, 10);
          }

          this.focusText = this.inputRef.current.value;
        }

        this.updateFilledState();
        return pos;
      }
    }, {
      key: "isValueUpdated",
      value: function isValueUpdated() {
        return this.props.unmask ? this.props.value !== this.getUnmaskedValue() : this.defaultBuffer !== this.inputRef.current.value && this.inputRef.current.value !== this.props.value;
      }
    }, {
      key: "init",
      value: function init() {
        if (this.props.mask) {
          this.tests = [];
          this.partialPosition = this.props.mask.length;
          this.len = this.props.mask.length;
          this.firstNonMaskPos = null;
          this.defs = {
            '9': '[0-9]',
            'a': '[A-Za-z]',
            '*': '[A-Za-z0-9]'
          };
          var ua = core.DomHandler.getUserAgent();
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
        this.tooltip = core.tip({
          target: this.inputRef.current,
          content: this.props.tooltip,
          options: this.props.tooltipOptions
        });
      }
    }, {
      key: "render",
      value: function render() {
        var inputMaskClassName = core.classNames('p-inputmask', this.props.className);
        return /*#__PURE__*/React__default['default'].createElement(inputtext.InputText, {
          id: this.props.id,
          ref: this.inputRef,
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
  }(React.Component);

  _defineProperty(InputMask, "defaultProps", {
    id: null,
    inputRef: null,
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

  exports.InputMask = InputMask;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

}({}, React, primereact.core, primereact.inputtext));
