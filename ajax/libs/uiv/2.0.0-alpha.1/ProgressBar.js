import { openBlock, createElementBlock, normalizeClass, normalizeStyle, toDisplayString, resolveComponent, renderSlot, createBlock, normalizeProps, mergeProps } from "vue";
var _export_sfc = (sfc, props) => {
  for (const [key, val] of props) {
    sfc[key] = val;
  }
  return sfc;
};
const _sfc_main$1 = {
  props: {
    modelValue: {
      type: Number,
      required: true,
      validator(value) {
        return value >= 0 && value <= 100;
      }
    },
    labelText: { type: String, default: void 0 },
    type: { type: String, default: void 0 },
    label: {
      type: Boolean,
      default: false
    },
    minWidth: {
      type: Boolean,
      default: false
    },
    striped: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: false
    }
  }
};
const _hoisted_1$1 = ["aria-valuenow"];
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass({
      "progress-bar": true,
      "progress-bar-striped": $props.striped,
      active: $props.striped && $props.active,
      [`progress-bar-${$props.type}`]: Boolean($props.type)
    }),
    style: normalizeStyle({
      minWidth: $props.minWidth ? "2em" : null,
      width: `${$props.modelValue}%`
    }),
    role: "progressbar",
    "aria-valuemin": "0",
    "aria-valuenow": $props.modelValue,
    "aria-valuemax": "100"
  }, toDisplayString($props.label ? $props.labelText ? $props.labelText : `${$props.modelValue}%` : null), 15, _hoisted_1$1);
}
var ProgressBarStack = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);
const _sfc_main = {
  components: { ProgressBarStack },
  props: {
    modelValue: {
      type: Number,
      validator(value) {
        return value >= 0 && value <= 100;
      },
      default: 0
    },
    labelText: { type: String, default: void 0 },
    type: { type: String, default: void 0 },
    label: {
      type: Boolean,
      default: false
    },
    minWidth: {
      type: Boolean,
      default: false
    },
    striped: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: false
    }
  }
};
const _hoisted_1 = { class: "progress" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ProgressBarStack = resolveComponent("ProgressBarStack");
  return openBlock(), createElementBlock("div", _hoisted_1, [
    _ctx.$slots.default ? renderSlot(_ctx.$slots, "default", { key: 0 }) : (openBlock(), createBlock(_component_ProgressBarStack, normalizeProps(mergeProps({ key: 1 }, _ctx.$props)), null, 16))
  ]);
}
var ProgressBar = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { ProgressBar as default };
