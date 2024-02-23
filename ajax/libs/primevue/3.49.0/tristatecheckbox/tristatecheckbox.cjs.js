'use strict';

var CheckIcon = require('primevue/icons/check');
var TimesIcon = require('primevue/icons/times');
var BaseComponent = require('primevue/basecomponent');
var TriStateCheckboxStyle = require('primevue/tristatecheckbox/style');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var CheckIcon__default = /*#__PURE__*/_interopDefaultLegacy(CheckIcon);
var TimesIcon__default = /*#__PURE__*/_interopDefaultLegacy(TimesIcon);
var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
var TriStateCheckboxStyle__default = /*#__PURE__*/_interopDefaultLegacy(TriStateCheckboxStyle);

var script$1 = {
  name: 'BaseTriStateCheckbox',
  "extends": BaseComponent__default["default"],
  props: {
    modelValue: null,
    variant: {
      type: String,
      "default": null
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
    tabindex: {
      type: Number,
      "default": null
    },
    inputId: {
      type: String,
      "default": null
    },
    inputClass: {
      type: [String, Object],
      "default": null
    },
    inputStyle: {
      type: Object,
      "default": null
    },
    ariaLabelledby: {
      type: String,
      "default": null
    },
    ariaLabel: {
      type: String,
      "default": null
    }
  },
  style: TriStateCheckboxStyle__default["default"],
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};

var script = {
  name: 'TriStateCheckbox',
  "extends": script$1,
  inheritAttrs: false,
  emits: ['update:modelValue', 'change', 'focus', 'blur'],
  methods: {
    getPTOptions: function getPTOptions(key) {
      var _ptm = key === 'root' ? this.ptmi : this.ptm;
      return _ptm(key, {
        context: {
          active: this.active,
          disabled: this.disabled
        }
      });
    },
    updateModel: function updateModel() {
      var newValue;
      switch (this.modelValue) {
        case true:
          newValue = false;
          break;
        case false:
          newValue = null;
          break;
        default:
          newValue = true;
          break;
      }
      this.$emit('update:modelValue', newValue);
    },
    onChange: function onChange(event) {
      if (!this.disabled && !this.readonly) {
        this.updateModel();
        this.$emit('change', event);
      }
    },
    onFocus: function onFocus(event) {
      this.$emit('focus', event);
    },
    onBlur: function onBlur(event) {
      this.$emit('blur', event);
    }
  },
  computed: {
    active: function active() {
      return this.modelValue != null;
    },
    checked: function checked() {
      return this.modelValue === true;
    },
    ariaValueLabel: function ariaValueLabel() {
      return this.modelValue ? this.$primevue.config.locale.aria.trueLabel : this.modelValue === false ? this.$primevue.config.locale.aria.falseLabel : this.$primevue.config.locale.aria.nullLabel;
    }
  },
  components: {
    CheckIcon: CheckIcon__default["default"],
    TimesIcon: TimesIcon__default["default"]
  }
};

var _hoisted_1 = ["data-p-highlight", "data-p-disabled"];
var _hoisted_2 = ["id", "value", "checked", "tabindex", "disabled", "readonly", "aria-labelledby", "aria-label", "aria-invalid"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_CheckIcon = vue.resolveComponent("CheckIcon");
  var _component_TimesIcon = vue.resolveComponent("TimesIcon");
  return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
    "class": _ctx.cx('root')
  }, $options.getPTOptions('root'), {
    "data-p-highlight": $options.active,
    "data-p-disabled": _ctx.disabled
  }), [vue.createElementVNode("input", vue.mergeProps({
    id: _ctx.inputId,
    type: "checkbox",
    "class": [_ctx.cx('input'), _ctx.inputClass],
    style: _ctx.inputStyle,
    value: _ctx.modelValue,
    checked: $options.checked,
    tabindex: _ctx.tabindex,
    disabled: _ctx.disabled,
    readonly: _ctx.readonly,
    "aria-labelledby": _ctx.ariaLabelledby,
    "aria-label": _ctx.ariaLabel,
    "aria-invalid": _ctx.invalid || undefined,
    onFocus: _cache[0] || (_cache[0] = function () {
      return $options.onFocus && $options.onFocus.apply($options, arguments);
    }),
    onBlur: _cache[1] || (_cache[1] = function () {
      return $options.onBlur && $options.onBlur.apply($options, arguments);
    }),
    onChange: _cache[2] || (_cache[2] = function () {
      return $options.onChange && $options.onChange.apply($options, arguments);
    })
  }, $options.getPTOptions('input')), null, 16, _hoisted_2), vue.createElementVNode("span", vue.mergeProps({
    role: "status",
    "class": "p-hidden-accessible",
    "aria-live": "polite"
  }, $options.getPTOptions('hiddenValueLabel'), {
    "data-p-hidden-accessible": true
  }), vue.toDisplayString($options.ariaValueLabel), 17), vue.createElementVNode("div", vue.mergeProps({
    "class": _ctx.cx('box')
  }, $options.getPTOptions('box')), [_ctx.modelValue === true ? vue.renderSlot(_ctx.$slots, "checkicon", {
    key: 0,
    "class": vue.normalizeClass(_ctx.cx('checkIcon'))
  }, function () {
    return [vue.createVNode(_component_CheckIcon, vue.mergeProps({
      "class": _ctx.cx('checkIcon')
    }, $options.getPTOptions('checkIcon')), null, 16, ["class"])];
  }) : _ctx.modelValue === false ? vue.renderSlot(_ctx.$slots, "uncheckicon", {
    key: 1,
    "class": vue.normalizeClass(_ctx.cx('uncheckIcon'))
  }, function () {
    return [vue.createVNode(_component_TimesIcon, vue.mergeProps({
      "class": _ctx.cx('uncheckIcon')
    }, $options.getPTOptions('uncheckIcon')), null, 16, ["class"])];
  }) : vue.renderSlot(_ctx.$slots, "nullableicon", {
    key: 2,
    "class": vue.normalizeClass(_ctx.cx('nullableIcon'))
  })], 16)], 16, _hoisted_1);
}

script.render = render;

module.exports = script;
