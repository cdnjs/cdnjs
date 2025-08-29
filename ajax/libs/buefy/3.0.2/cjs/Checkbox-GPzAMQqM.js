'use strict';

var vue = require('vue');
var CheckRadioMixin = require('./CheckRadioMixin-CDu0SN3g.js');
var _pluginVue_exportHelper = require('./_plugin-vue_export-helper-Die8u8yB.js');

var _sfc_main = vue.defineComponent({
  name: "BCheckbox",
  mixins: [CheckRadioMixin.CheckRadioMixin],
  props: {
    indeterminate: Boolean,
    ariaLabelledby: String,
    trueValue: {
      type: [String, Number, Boolean, Function, Object, Array],
      default: true
    },
    falseValue: {
      type: [String, Number, Boolean, Function, Object, Array],
      default: false
    },
    autocomplete: {
      type: String,
      default: "on"
    },
    inputId: {
      type: String,
      default: ""
    }
  }
});

const _hoisted_1 = ["disabled"];
const _hoisted_2 = ["id", ".indeterminate", "autocomplete", "disabled", "required", "name", "value", "true-value", "false-value", "aria-labelledby"];
const _hoisted_3 = ["id"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("label", {
    class: vue.normalizeClass(["b-checkbox checkbox", [_ctx.size, { "is-disabled": _ctx.disabled }]]),
    ref: "label",
    disabled: _ctx.disabledOrUndefined,
    onClick: _cache[2] || (_cache[2] = (...args) => _ctx.focus && _ctx.focus(...args)),
    onKeydown: [
      _cache[3] || (_cache[3] = vue.withKeys(vue.withModifiers(($event) => _ctx.$refs.label.click(), ["prevent"]), ["enter"])),
      _cache[4] || (_cache[4] = vue.withKeys(vue.withModifiers(($event) => _ctx.$refs.label.click(), ["prevent"]), ["space"]))
    ]
  }, [
    vue.createCommentVNode(" Checkbox needs to listen for a space event instead of a just a\n             click and enter event so that that using the keyboard spacebar will also\n             trigger the checkbox change in the b-table "),
    vue.withDirectives(vue.createElementVNode("input", {
      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.computedValue = $event),
      id: _ctx.inputId,
      ".indeterminate": _ctx.indeterminate,
      type: "checkbox",
      ref: "input",
      onClick: _cache[1] || (_cache[1] = vue.withModifiers(() => {
      }, ["stop"])),
      autocomplete: _ctx.autocomplete,
      disabled: _ctx.disabledOrUndefined,
      required: _ctx.requiredOrUndefined,
      name: _ctx.name,
      value: _ctx.nativeValue,
      "true-value": _ctx.trueValue,
      "false-value": _ctx.falseValue,
      "aria-labelledby": _ctx.ariaLabelledby
    }, null, 40, _hoisted_2), [
      [vue.vModelCheckbox, _ctx.computedValue]
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
    vue.createElementVNode("span", {
      id: _ctx.ariaLabelledby,
      class: "control-label"
    }, [
      vue.renderSlot(_ctx.$slots, "default")
    ], 8, _hoisted_3)
  ], 42, _hoisted_1);
}
var BCheckbox = /* @__PURE__ */ _pluginVue_exportHelper._export_sfc(_sfc_main, [["render", _sfc_render]]);

exports.BCheckbox = BCheckbox;
