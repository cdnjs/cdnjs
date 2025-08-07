import { defineComponent, createElementBlock, openBlock, withKeys, normalizeClass, withModifiers, withDirectives, createElementVNode, vModelRadio, renderSlot } from 'vue';
import { C as CheckRadioMixin } from './CheckRadioMixin-DSD_rjC8.js';
import { _ as _export_sfc } from './_plugin-vue_export-helper-OJRSZE6i.js';
import { a as registerComponent } from './plugins-B172kuKE.js';

const Radio$1 = defineComponent({
  name: "BRadio",
  mixins: [CheckRadioMixin]
});

const _hoisted_1$1 = ["disabled"];
const _hoisted_2$1 = ["disabled", "required", "name", "value"];
const _hoisted_3 = { class: "control-label" };
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("label", {
    class: normalizeClass(["b-radio radio", [_ctx.size, { "is-disabled": _ctx.disabled }]]),
    ref: "label",
    disabled: _ctx.disabledOrUndefined,
    onClick: _cache[2] || (_cache[2] = (...args) => _ctx.focus && _ctx.focus(...args)),
    onKeydown: _cache[3] || (_cache[3] = withKeys(withModifiers(($event) => _ctx.$refs.label.click(), ["prevent"]), ["enter"]))
  }, [
    withDirectives(createElementVNode("input", {
      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.computedValue = $event),
      type: "radio",
      ref: "input",
      onClick: _cache[1] || (_cache[1] = withModifiers(() => {
      }, ["stop"])),
      disabled: _ctx.disabledOrUndefined,
      required: _ctx.requiredOrUndefined,
      name: _ctx.name,
      value: _ctx.nativeValue
    }, null, 8, _hoisted_2$1), [
      [vModelRadio, _ctx.computedValue]
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
    createElementVNode("span", _hoisted_3, [
      renderSlot(_ctx.$slots, "default")
    ])
  ], 42, _hoisted_1$1);
}
var Radio = /* @__PURE__ */ _export_sfc(Radio$1, [["render", _sfc_render$1]]);

const RadioButon = defineComponent({
  name: "BRadioButton",
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
  return openBlock(), createElementBlock(
    "div",
    {
      class: normalizeClass(["control", { "is-expanded": _ctx.expanded }])
    },
    [
      createElementVNode("label", {
        class: normalizeClass(["b-radio radio button", _ctx.labelClass]),
        ref: "label",
        disabled: _ctx.disabledOrUndefined,
        onClick: _cache[4] || (_cache[4] = (...args) => _ctx.focus && _ctx.focus(...args)),
        onKeydown: _cache[5] || (_cache[5] = withKeys(withModifiers(($event) => _ctx.$refs.label.click(), ["prevent"]), ["enter"]))
      }, [
        renderSlot(_ctx.$slots, "default"),
        withDirectives(createElementVNode("input", {
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.computedValue = $event),
          type: "radio",
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
          [vModelRadio, _ctx.computedValue]
        ])
      ], 42, _hoisted_1)
    ],
    2
    /* CLASS */
  );
}
var RadioButton = /* @__PURE__ */ _export_sfc(RadioButon, [["render", _sfc_render]]);

const Plugin = {
  install(Vue) {
    registerComponent(Vue, Radio);
    registerComponent(Vue, RadioButton);
  }
};

export { Radio as BRadio, RadioButton as BRadioButton, Plugin as default };
