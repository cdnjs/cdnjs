'use strict';

var InputText = require('primevue/inputtext');
var BaseComponent = require('primevue/basecomponent');
var InputOtpStyle = require('primevue/inputotp/style');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var InputText__default = /*#__PURE__*/_interopDefaultLegacy(InputText);
var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
var InputOtpStyle__default = /*#__PURE__*/_interopDefaultLegacy(InputOtpStyle);

var script$1 = {
  name: 'BaseInputOtp',
  "extends": BaseComponent__default["default"],
  props: {
    modelValue: {
      type: null,
      "default": false
    },
    invalid: {
      type: Boolean,
      "default": false
    },
    disabled: {
      type: Boolean,
      "default": false
    },
    readonly: {
      type: Boolean,
      "default": false
    },
    variant: {
      type: String,
      "default": null
    },
    tabindex: {
      type: Number,
      "default": null
    },
    length: {
      type: Number,
      "default": 4
    },
    mask: {
      type: Boolean,
      "default": false
    },
    integerOnly: {
      type: Boolean,
      "default": false
    }
  },
  style: InputOtpStyle__default["default"],
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};

var script = {
  name: 'InputOtp',
  "extends": script$1,
  inheritAttrs: false,
  emits: ['update:modelValue', 'change', 'focus', 'blur'],
  data: function data() {
    return {
      tokens: []
    };
  },
  watch: {
    modelValue: {
      immediate: true,
      handler: function handler(newValue) {
        this.tokens = newValue ? newValue.split('') : new Array(this.length);
      }
    }
  },
  methods: {
    getTemplateAttrs: function getTemplateAttrs(index) {
      return {
        value: this.tokens[index]
      };
    },
    getTemplateEvents: function getTemplateEvents(index) {
      var _this = this;
      return {
        input: function input(event) {
          return _this.onInput(event, index);
        },
        keydown: function keydown(event) {
          return _this.onKeyDown(event);
        },
        focus: function focus(event) {
          return _this.onFocus(event);
        },
        blur: function blur(event) {
          return _this.onBlur(event);
        },
        paste: function paste(event) {
          return _this.onPaste(event);
        }
      };
    },
    getPTOptions: function getPTOptions(key) {
      var _ptm = key === 'root' ? this.ptmi : this.ptm;
      return _ptm(key, {
        context: {
          checked: this.checked,
          disabled: this.disabled
        }
      });
    },
    onInput: function onInput(event, index) {
      this.tokens[index] = event.target.value;
      this.updateModel(event);
      if (event.inputType === 'deleteContentBackward') {
        this.moveToPrev(event);
      } else if (event.inputType === 'insertText' || event.inputType === 'deleteContentForward') {
        this.moveToNext(event);
      }
    },
    updateModel: function updateModel(event) {
      var newValue = this.tokens.join('');
      this.$emit('update:modelValue', newValue);
      this.$emit('change', {
        originalEvent: event,
        value: newValue
      });
    },
    moveToPrev: function moveToPrev(event) {
      var prevInput = this.findPrevInput(event.target);
      if (prevInput) {
        prevInput.focus();
        prevInput.select();
      }
    },
    moveToNext: function moveToNext(event) {
      var nextInput = this.findNextInput(event.target);
      if (nextInput) {
        nextInput.focus();
        nextInput.select();
      }
    },
    findNextInput: function findNextInput(element) {
      var nextElement = element.nextElementSibling;
      if (!nextElement) return;
      return nextElement.nodeName === 'INPUT' ? nextElement : this.findNextInput(nextElement);
    },
    findPrevInput: function findPrevInput(element) {
      var prevElement = element.previousElementSibling;
      if (!prevElement) return;
      return prevElement.nodeName === 'INPUT' ? prevElement : this.findPrevInput(prevElement);
    },
    onFocus: function onFocus(event) {
      event.target.select();
      this.$emit('focus', event);
    },
    onBlur: function onBlur(event) {
      this.$emit('blur', event);
    },
    onKeyDown: function onKeyDown(event) {
      switch (event.code) {
        case 'ArrowLeft':
          this.moveToPrev(event);
          event.preventDefault();
          break;
        case 'ArrowUp':
        case 'ArrowDown':
          event.preventDefault();
          break;
        case 'Backspace':
          if (event.target.value.length === 0) {
            this.moveToPrev(event);
            event.preventDefault();
          }
          break;
        case 'ArrowRight':
          this.moveToNext(event);
          event.preventDefault();
          break;
        default:
          if (this.integerOnly && !(Number(event.key) >= 0 && Number(event.key) <= 9) || this.tokens.join('').length >= this.length && event.code !== 'Delete') {
            event.preventDefault();
          }
          break;
      }
    },
    onPaste: function onPaste(event) {
      var paste = event.clipboardData.getData('text');
      if (paste.length) {
        var pastedCode = paste.substring(0, this.length + 1);
        if (!this.integerOnly || !isNaN(pastedCode)) {
          this.tokens = pastedCode.split('');
          this.updateModel(event);
        }
      }
      event.preventDefault();
    }
  },
  computed: {
    inputMode: function inputMode() {
      return this.integerOnly ? 'numeric' : 'text';
    },
    inputType: function inputType() {
      return this.mask ? 'password' : 'text';
    }
  },
  components: {
    OtpInputText: InputText__default["default"]
  }
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_OtpInputText = vue.resolveComponent("OtpInputText");
  return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
    "class": _ctx.cx('root')
  }, _ctx.ptmi('root')), [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.length, function (i) {
    return vue.renderSlot(_ctx.$slots, "default", {
      key: i,
      events: $options.getTemplateEvents(i - 1),
      attrs: $options.getTemplateAttrs(i - 1),
      index: i
    }, function () {
      return [vue.createVNode(_component_OtpInputText, {
        value: $data.tokens[i - 1],
        type: $options.inputType,
        "class": vue.normalizeClass(_ctx.cx('input')),
        inputmode: $options.inputMode,
        variant: _ctx.variant,
        readonly: _ctx.readonly,
        disabled: _ctx.disabled,
        invalid: _ctx.invalid,
        tabindex: _ctx.tabindex,
        unstyled: _ctx.unstyled,
        onInput: function onInput($event) {
          return $options.onInput($event, i - 1);
        },
        onFocus: _cache[0] || (_cache[0] = function ($event) {
          return $options.onFocus($event);
        }),
        onBlur: _cache[1] || (_cache[1] = function ($event) {
          return $options.onBlur($event);
        }),
        onPaste: _cache[2] || (_cache[2] = function ($event) {
          return $options.onPaste($event);
        }),
        onKeydown: _cache[3] || (_cache[3] = function ($event) {
          return $options.onKeyDown($event);
        }),
        pt: _ctx.ptm('input')
      }, null, 8, ["value", "type", "class", "inputmode", "variant", "readonly", "disabled", "invalid", "tabindex", "unstyled", "onInput", "pt"])];
    });
  }), 128))], 16);
}

script.render = render;

module.exports = script;
