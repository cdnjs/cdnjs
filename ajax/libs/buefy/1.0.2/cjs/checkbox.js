'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Checkbox = require('./Checkbox-GPzAMQqM.js');
var vue = require('vue');
var CheckRadioMixin = require('./CheckRadioMixin-CDu0SN3g.js');
var _pluginVue_exportHelper = require('./_plugin-vue_export-helper-Die8u8yB.js');
var plugins = require('./plugins-DbyYGVpp.js');

var _sfc_main = vue.defineComponent({
  name: "BCheckboxButton",
  mixins: [CheckRadioMixin.CheckRadioMixin],
  props: {
    type: {
      type: String,
      default: "is-primary"
    },
    expanded: Boolean
  },
  data() {
    return {
      isFocused: false
    };
  },
  computed: {
    checked() {
      if (Array.isArray(this.newValue)) {
        return this.newValue.indexOf(this.nativeValue) >= 0;
      }
      return this.newValue === this.nativeValue;
    }
  }
});

const _hoisted_1 = ["disabled"];
const _hoisted_2 = ["disabled", "required", "name", "value"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock(
    "div",
    {
      class: vue.normalizeClass(["control", { "is-expanded": _ctx.expanded }])
    },
    [
      vue.createElementVNode("label", {
        class: vue.normalizeClass(["b-checkbox checkbox button", [_ctx.checked ? _ctx.type : null, _ctx.size, {
          "is-disabled": _ctx.disabled,
          "is-focused": _ctx.isFocused
        }]]),
        ref: "label",
        disabled: _ctx.disabledOrUndefined,
        onClick: _cache[4] || (_cache[4] = (...args) => _ctx.focus && _ctx.focus(...args)),
        onKeydown: _cache[5] || (_cache[5] = vue.withKeys(vue.withModifiers(($event) => _ctx.$refs.label.click(), ["prevent"]), ["enter"]))
      }, [
        vue.renderSlot(_ctx.$slots, "default"),
        vue.withDirectives(vue.createElementVNode("input", {
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.computedValue = $event),
          type: "checkbox",
          ref: "input",
          onClick: _cache[1] || (_cache[1] = vue.withModifiers(() => {
          }, ["stop"])),
          disabled: _ctx.disabledOrUndefined,
          required: _ctx.requiredOrUndefined,
          name: _ctx.name,
          value: _ctx.nativeValue,
          onFocus: _cache[2] || (_cache[2] = ($event) => _ctx.isFocused = true),
          onBlur: _cache[3] || (_cache[3] = ($event) => _ctx.isFocused = false)
        }, null, 40, _hoisted_2), [
          [vue.vModelCheckbox, _ctx.computedValue]
        ])
      ], 42, _hoisted_1)
    ],
    2
    /* CLASS */
  );
}
var CheckboxButton = /* @__PURE__ */ _pluginVue_exportHelper._export_sfc(_sfc_main, [["render", _sfc_render]]);

const Plugin = {
  install(Vue) {
    plugins.registerComponent(Vue, Checkbox.BCheckbox);
    plugins.registerComponent(Vue, CheckboxButton);
  }
};

exports.BCheckbox = Checkbox.BCheckbox;
exports.BCheckboxButton = CheckboxButton;
exports.default = Plugin;
