import { defineComponent, createElementBlock, openBlock, withKeys, normalizeClass, withModifiers, createCommentVNode, withDirectives, createElementVNode, vModelCheckbox, renderSlot } from 'vue';
import { C as CheckRadioMixin } from './CheckRadioMixin-DSD_rjC8.js';
import { _ as _export_sfc } from './_plugin-vue_export-helper-OJRSZE6i.js';

var _sfc_main = defineComponent({
  name: "BCheckbox",
  mixins: [CheckRadioMixin],
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
  return openBlock(), createElementBlock("label", {
    class: normalizeClass(["b-checkbox checkbox", [_ctx.size, { "is-disabled": _ctx.disabled }]]),
    ref: "label",
    disabled: _ctx.disabledOrUndefined,
    onClick: _cache[2] || (_cache[2] = (...args) => _ctx.focus && _ctx.focus(...args)),
    onKeydown: [
      _cache[3] || (_cache[3] = withKeys(withModifiers(($event) => _ctx.$refs.label.click(), ["prevent"]), ["enter"])),
      _cache[4] || (_cache[4] = withKeys(withModifiers(($event) => _ctx.$refs.label.click(), ["prevent"]), ["space"]))
    ]
  }, [
    createCommentVNode(" Checkbox needs to listen for a space event instead of a just a\n             click and enter event so that that using the keyboard spacebar will also\n             trigger the checkbox change in the b-table "),
    withDirectives(createElementVNode("input", {
      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.computedValue = $event),
      id: _ctx.inputId,
      ".indeterminate": _ctx.indeterminate,
      type: "checkbox",
      ref: "input",
      onClick: _cache[1] || (_cache[1] = withModifiers(() => {
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
      [vModelCheckbox, _ctx.computedValue]
    ]),
    createElementVNode(
      "span",
      {
        class: normalizeClass(["check", _ctx.type])
      },
      null,
      2
      /* CLASS */
    ),
    createElementVNode("span", {
      id: _ctx.ariaLabelledby,
      class: "control-label"
    }, [
      renderSlot(_ctx.$slots, "default")
    ], 8, _hoisted_3)
  ], 42, _hoisted_1);
}
var BCheckbox = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);

export { BCheckbox as B };
