import { B as BCheckbox } from './Checkbox-KUMz0sfA.js';
import { defineComponent, createElementBlock, openBlock, normalizeClass, createElementVNode, withKeys, withModifiers, renderSlot, withDirectives, vModelCheckbox } from 'vue';
import { C as CheckRadioMixin } from './CheckRadioMixin-DSD_rjC8.js';
import { _ as _export_sfc } from './_plugin-vue_export-helper-OJRSZE6i.js';
import { a as registerComponent } from './plugins-B172kuKE.js';

var _sfc_main = defineComponent({
  name: "BCheckboxButton",
  mixins: [CheckRadioMixin],
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
  return openBlock(), createElementBlock(
    "div",
    {
      class: normalizeClass(["control", { "is-expanded": _ctx.expanded }])
    },
    [
      createElementVNode("label", {
        class: normalizeClass(["b-checkbox checkbox button", [_ctx.checked ? _ctx.type : null, _ctx.size, {
          "is-disabled": _ctx.disabled,
          "is-focused": _ctx.isFocused
        }]]),
        ref: "label",
        disabled: _ctx.disabledOrUndefined,
        onClick: _cache[4] || (_cache[4] = (...args) => _ctx.focus && _ctx.focus(...args)),
        onKeydown: _cache[5] || (_cache[5] = withKeys(withModifiers(($event) => _ctx.$refs.label.click(), ["prevent"]), ["enter"]))
      }, [
        renderSlot(_ctx.$slots, "default"),
        withDirectives(createElementVNode("input", {
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.computedValue = $event),
          type: "checkbox",
          ref: "input",
          onClick: _cache[1] || (_cache[1] = withModifiers(() => {
          }, ["stop"])),
          disabled: _ctx.disabledOrUndefined,
          required: _ctx.requiredOrUndefined,
          name: _ctx.name,
          value: _ctx.nativeValue,
          onFocus: _cache[2] || (_cache[2] = ($event) => _ctx.isFocused = true),
          onBlur: _cache[3] || (_cache[3] = ($event) => _ctx.isFocused = false)
        }, null, 40, _hoisted_2), [
          [vModelCheckbox, _ctx.computedValue]
        ])
      ], 42, _hoisted_1)
    ],
    2
    /* CLASS */
  );
}
var CheckboxButton = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BCheckbox);
    registerComponent(Vue, CheckboxButton);
  }
};

export { BCheckbox, CheckboxButton as BCheckboxButton, Plugin as default };
