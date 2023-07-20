'use strict';

var utils = require('primevue/utils');
var BaseComponent = require('primevue/basecomponent');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

var classes = {
  root: function root(_ref) {
    var instance = _ref.instance;
    return ['p-inputmask p-inputtext p-component', {
      'p-filled': instance.filled
    }];
  }
};
var script$1 = {
  name: 'BaseInputMask',
  "extends": BaseComponent__default["default"],
  props: {
    modelValue: null,
    slotChar: {
      type: String,
      "default": '_'
    },
    mask: {
      type: String,
      "default": null
    },
    autoClear: {
      type: Boolean,
      "default": true
    },
    unmask: {
      type: Boolean,
      "default": false
    },
    readonly: {
      type: Boolean,
      "default": false
    }
  },
  css: {
    classes: classes
  }
};

var script = {
  name: 'InputMask',
  "extends": script$1,
  emits: ['update:modelValue', 'focus', 'blur', 'keydown', 'complete', 'keypress', 'paste'],
  watch: {
    mask: function mask(newMask, oldMask) {
      if (oldMask !== newMask) {
        this.initMask();
      }
    }
  },
  mounted: function mounted() {
    this.initMask();
  },
  updated: function updated() {
    if (this.isValueUpdated()) {
      this.updateValue();
    }
  },
  methods: {
    onInput: function onInput(event) {
      if (this.androidChrome) this.handleAndroidInput(event);else this.handleInputChange(event);
      this.$emit('update:modelValue', event.target.value);
    },
    onFocus: function onFocus(event) {
      var _this = this;
      if (this.readonly) {
        return;
      }
      this.focus = true;
      clearTimeout(this.caretTimeoutId);
      var pos;
      this.focusText = this.$el.value;
      pos = this.checkVal();
      this.caretTimeoutId = setTimeout(function () {
        if (_this.$el !== document.activeElement) {
          return;
        }
        _this.writeBuffer();
        if (pos === _this.mask.replace('?', '').length) {
          _this.caret(0, pos);
        } else {
          _this.caret(pos);
        }
      }, 10);
      this.$emit('focus', event);
    },
    onBlur: function onBlur(event) {
      this.focus = false;
      this.checkVal();
      this.updateModel(event);
      if (this.$el.value !== this.focusText) {
        var e = document.createEvent('HTMLEvents');
        e.initEvent('change', true, false);
        this.$el.dispatchEvent(e);
      }
      this.$emit('blur', event);
    },
    onKeyDown: function onKeyDown(event) {
      if (this.readonly) {
        return;
      }
      var k = event.which || event.keyCode,
        pos,
        begin,
        end;
      var iPhone = /iphone/i.test(utils.DomHandler.getUserAgent());
      this.oldVal = this.$el.value;

      //backspace, delete, and escape get special treatment
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
        this.updateModel(event);
        event.preventDefault();
      } else if (k === 13) {
        // enter
        this.$el.blur();
        this.updateModel(event);
      } else if (k === 27) {
        // escape
        this.$el.value = this.focusText;
        this.caret(0, this.checkVal());
        this.updateModel(event);
        event.preventDefault();
      }
      this.$emit('keydown', event);
    },
    onKeyPress: function onKeyPress(event) {
      var _this2 = this;
      if (this.readonly) {
        return;
      }
      var k = event.which || event.keyCode,
        pos = this.caret(),
        p,
        c,
        next,
        completed;
      if (event.ctrlKey || event.altKey || event.metaKey || k < 32) {
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
            if (/android/i.test(utils.DomHandler.getUserAgent())) {
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
        event.preventDefault();
      }
      this.updateModel(event);
      if (completed) {
        this.$emit('complete', event);
      }
      this.$emit('keypress', event);
    },
    onPaste: function onPaste(event) {
      this.handleInputChange(event);
      this.$emit('paste', event);
    },
    caret: function caret(first, last) {
      var range, begin, end;
      if (!this.$el.offsetParent || this.$el !== document.activeElement) {
        return;
      }
      if (typeof first === 'number') {
        begin = first;
        end = typeof last === 'number' ? last : begin;
        if (this.$el.setSelectionRange) {
          this.$el.setSelectionRange(begin, end);
        } else if (this.$el['createTextRange']) {
          range = this.$el['createTextRange']();
          range.collapse(true);
          range.moveEnd('character', end);
          range.moveStart('character', begin);
          range.select();
        }
      } else {
        if (this.$el.setSelectionRange) {
          begin = this.$el.selectionStart;
          end = this.$el.selectionEnd;
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
    },
    isCompleted: function isCompleted() {
      for (var i = this.firstNonMaskPos; i <= this.lastRequiredNonMaskPos; i++) {
        if (this.tests[i] && this.buffer[i] === this.getPlaceholder(i)) {
          return false;
        }
      }
      return true;
    },
    getPlaceholder: function getPlaceholder(i) {
      if (i < this.slotChar.length) {
        return this.slotChar.charAt(i);
      }
      return this.slotChar.charAt(0);
    },
    seekNext: function seekNext(pos) {
      while (++pos < this.len && !this.tests[pos]);
      return pos;
    },
    seekPrev: function seekPrev(pos) {
      while (--pos >= 0 && !this.tests[pos]);
      return pos;
    },
    shiftL: function shiftL(begin, end) {
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
    },
    shiftR: function shiftR(pos) {
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
    },
    handleAndroidInput: function handleAndroidInput(event) {
      var curVal = this.$el.value;
      var pos = this.caret();
      if (this.oldVal && this.oldVal.length && this.oldVal.length > curVal.length) {
        // a deletion or backspace happened
        this.checkVal(true);
        while (pos.begin > 0 && !this.tests[pos.begin - 1]) pos.begin--;
        if (pos.begin === 0) {
          while (pos.begin < this.firstNonMaskPos && !this.tests[pos.begin]) pos.begin++;
        }
        this.caret(pos.begin, pos.begin);
      } else {
        this.checkVal(true);
        while (pos.begin < this.len && !this.tests[pos.begin]) pos.begin++;
        this.caret(pos.begin, pos.begin);
      }
      if (this.isCompleted()) {
        this.$emit('complete', event);
      }
    },
    clearBuffer: function clearBuffer(start, end) {
      var i;
      for (i = start; i < end && i < this.len; i++) {
        if (this.tests[i]) {
          this.buffer[i] = this.getPlaceholder(i);
        }
      }
    },
    writeBuffer: function writeBuffer() {
      this.$el.value = this.buffer.join('');
    },
    checkVal: function checkVal(allow) {
      this.isValueChecked = true;
      //try to place characters where they belong
      var test = this.$el.value,
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
        if (this.autoClear || this.buffer.join('') === this.defaultBuffer) {
          // Invalid value. Remove it and replace it with the
          // mask, which is the default behavior.
          if (this.$el.value) this.$el.value = '';
          this.clearBuffer(0, this.len);
        } else {
          // Invalid value, but we opt to show the value to the
          // user and allow them to correct their mistake.
          this.writeBuffer();
        }
      } else {
        this.writeBuffer();
        this.$el.value = this.$el.value.substring(0, lastMatch + 1);
      }
      return this.partialPosition ? i : this.firstNonMaskPos;
    },
    handleInputChange: function handleInputChange(event) {
      if (this.readonly) {
        return;
      }
      var pos = this.checkVal(true);
      this.caret(pos);
      this.updateModel(event);
      if (this.isCompleted()) {
        this.$emit('complete', event);
      }
    },
    getUnmaskedValue: function getUnmaskedValue() {
      var unmaskedBuffer = [];
      for (var i = 0; i < this.buffer.length; i++) {
        var c = this.buffer[i];
        if (this.tests[i] && c !== this.getPlaceholder(i)) {
          unmaskedBuffer.push(c);
        }
      }
      return unmaskedBuffer.join('');
    },
    updateModel: function updateModel(e) {
      var val = this.unmask ? this.getUnmaskedValue() : e.target.value;
      this.$emit('update:modelValue', this.defaultBuffer !== val ? val : '');
    },
    updateValue: function updateValue() {
      var _this3 = this;
      var updateModel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      if (this.$el) {
        if (this.modelValue == null) {
          this.$el.value = '';
          updateModel && this.$emit('update:modelValue', '');
        } else {
          this.$el.value = this.modelValue;
          this.checkVal();
          setTimeout(function () {
            if (_this3.$el) {
              _this3.writeBuffer();
              _this3.checkVal();
              if (updateModel) {
                var val = _this3.unmask ? _this3.getUnmaskedValue() : _this3.$el.value;
                _this3.$emit('update:modelValue', _this3.defaultBuffer !== val ? val : '');
              }
            }
          }, 10);
        }
        this.focusText = this.$el.value;
      }
    },
    initMask: function initMask() {
      this.tests = [];
      this.partialPosition = this.mask.length;
      this.len = this.mask.length;
      this.firstNonMaskPos = null;
      this.defs = {
        9: '[0-9]',
        a: '[A-Za-z]',
        '*': '[A-Za-z0-9]'
      };
      var ua = utils.DomHandler.getUserAgent();
      this.androidChrome = /chrome/i.test(ua) && /android/i.test(ua);
      var maskTokens = this.mask.split('');
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
      this.updateValue(false);
    },
    isValueUpdated: function isValueUpdated() {
      return this.unmask ? this.modelValue != this.getUnmaskedValue() : this.defaultBuffer !== this.$el.value && this.$el.value !== this.modelValue;
    }
  },
  computed: {
    filled: function filled() {
      return this.modelValue != null && this.modelValue.toString().length > 0;
    }
  }
};

var _hoisted_1 = ["readonly"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("input", vue.mergeProps({
    "class": _ctx.cx('root'),
    readonly: _ctx.readonly,
    onInput: _cache[0] || (_cache[0] = function () {
      return $options.onInput && $options.onInput.apply($options, arguments);
    }),
    onFocus: _cache[1] || (_cache[1] = function () {
      return $options.onFocus && $options.onFocus.apply($options, arguments);
    }),
    onBlur: _cache[2] || (_cache[2] = function () {
      return $options.onBlur && $options.onBlur.apply($options, arguments);
    }),
    onKeydown: _cache[3] || (_cache[3] = function () {
      return $options.onKeyDown && $options.onKeyDown.apply($options, arguments);
    }),
    onKeypress: _cache[4] || (_cache[4] = function () {
      return $options.onKeyPress && $options.onKeyPress.apply($options, arguments);
    }),
    onPaste: _cache[5] || (_cache[5] = function () {
      return $options.onPaste && $options.onPaste.apply($options, arguments);
    })
  }, _ctx.ptm('root'), {
    "data-pc-name": "inputmask"
  }), null, 16, _hoisted_1);
}

script.render = render;

module.exports = script;
