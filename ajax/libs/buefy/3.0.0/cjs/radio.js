'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var CheckRadioMixin = require('./CheckRadioMixin-CDu0SN3g.js');
var _pluginVue_exportHelper = require('./_plugin-vue_export-helper-Die8u8yB.js');
var plugins = require('./plugins-DbyYGVpp.js');

const Radio$1 = vue.defineComponent({
  name: "BRadio",
  mixins: [CheckRadioMixin.CheckRadioMixin]
});

const _hoisted_1$1 = ["disabled"];
const _hoisted_2$1 = ["disabled", "required", "name", "value"];
const _hoisted_3 = { class: "control-label" };
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("label", {
    class: vue.normalizeClass(["b-radio radio", [_ctx.size, { "is-disabled": _ctx.disabled }]]),
    ref: "label",
    disabled: _ctx.disabledOrUndefined,
    onClick: _cache[2] || (_cache[2] = (...args) => _ctx.focus && _ctx.focus(...args)),
    onKeydown: _cache[3] || (_cache[3] = vue.withKeys(vue.withModifiers(($event) => _ctx.$refs.label.click(), ["prevent"]), ["enter"]))
  }, [
    vue.withDirectives(vue.createElementVNode("input", {
      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.computedValue = $event),
      type: "radio",
      ref: "input",
      onClick: _cache[1] || (_cache[1] = vue.withModifiers(() => {
      }, ["stop"])),
      disabled: _ctx.disabledOrUndefined,
      required: _ctx.requiredOrUndefined,
      name: _ctx.name,
      value: _ctx.nativeValue
    }, null, 8, _hoisted_2$1), [
      [vue.vModelRadio, _ctx.computedValue]
    ]),
    vue.createElementVNode(
      "span",
      {
        class: vue.normalizeClass(["check", _ctx.type])
      },
      null,
      2
      /* CLASS */
    ),
    vue.createElementVNode("span", _hoisted_3, [
      vue.renderSlot(_ctx.$slots, "default")
    ])
  ], 42, _hoisted_1$1);
}
var Radio = /* @__PURE__ */ _pluginVue_exportHelper._export_sfc(Radio$1, [["render", _sfc_render$1]]);

const RadioButon = vue.defineComponent({
  name: "BRadioButton",
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
    isSelected() {
      return this.newValue === this.nativeValue;
    },
    labelClass() {
      return [
        this.isSelected ? this.type : null,
        this.size,
        {
          "is-selected": this.isSelected,
          "is-disabled": this.disabled,
          "is-focused": this.isFocused
        }
      ];
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
        class: vue.normalizeClass(["b-radio radio button", _ctx.labelClass]),
        ref: "label",
        disabled: _ctx.disabledOrUndefined,
        onClick: _cache[4] || (_cache[4] = (...args) => _ctx.focus && _ctx.focus(...args)),
        onKeydown: _cache[5] || (_cache[5] = vue.withKeys(vue.withModifiers(($event) => _ctx.$refs.label.click(), ["prevent"]), ["enter"]))
      }, [
        vue.renderSlot(_ctx.$slots, "default"),
        vue.withDirectives(vue.createElementVNode("input", {
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.computedValue = $event),
          type: "radio",
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
          [vue.vModelRadio, _ctx.computedValue]
        ])
      ], 42, _hoisted_1)
    ],
    2
    /* CLASS */
  );
}
var RadioButton = /* @__PURE__ */ _pluginVue_exportHelper._export_sfc(RadioButon, [["render", _sfc_render]]);

const Plugin = {
  install(Vue) {
    plugins.registerComponent(Vue, Radio);
    plugins.registerComponent(Vue, RadioButton);
  }
};

exports.BRadio = Radio;
exports.BRadioButton = RadioButton;
exports.default = Plugin;
