import { openBlock, createElementBlock, normalizeClass, normalizeStyle, toDisplayString, resolveComponent, renderSlot, createBlock, normalizeProps, mergeProps } from 'vue';

var script$1 = {
  props: {
    modelValue: {
      type: Number,
      required: true,
      validator: function validator(value) {
        return value >= 0 && value <= 100
      },
    },
    labelText: { type: String, default: undefined },
    type: { type: String, default: undefined },
    label: {
      type: Boolean,
      default: false,
    },
    minWidth: {
      type: Boolean,
      default: false,
    },
    striped: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
};

var _hoisted_1$1 = ["aria-valuenow"];

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  var obj;

  return (openBlock(), createElementBlock("div", {
    class: normalizeClass(( obj = {
      'progress-bar': true,
      'progress-bar-striped': $props.striped,
      active: $props.striped && $props.active
    }, obj[("progress-bar-" + ($props.type))] = Boolean($props.type), obj )),
    style: normalizeStyle({
      minWidth: $props.minWidth ? '2em' : null,
      width: (($props.modelValue) + "%"),
    }),
    role: "progressbar",
    "aria-valuemin": "0",
    "aria-valuenow": $props.modelValue,
    "aria-valuemax": "100"
  }, toDisplayString($props.label ? ($props.labelText ? $props.labelText : (($props.modelValue) + "%")) : null), 15 /* TEXT, CLASS, STYLE, PROPS */, _hoisted_1$1))
}

script$1.render = render$1;
script$1.__file = "src/components/progressbar/ProgressBarStack.vue";

var script = {
  components: { ProgressBarStack: script$1 },
  props: {
    modelValue: {
      type: Number,
      validator: function validator(value) {
        return value >= 0 && value <= 100
      },
      default: 0,
    },
    labelText: { type: String, default: undefined },
    type: { type: String, default: undefined },
    label: {
      type: Boolean,
      default: false,
    },
    minWidth: {
      type: Boolean,
      default: false,
    },
    striped: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
};

var _hoisted_1 = { class: "progress" };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_ProgressBarStack = resolveComponent("ProgressBarStack");

  return (openBlock(), createElementBlock("div", _hoisted_1, [
    (_ctx.$slots.default)
      ? renderSlot(_ctx.$slots, "default", { key: 0 })
      : (openBlock(), createBlock(_component_ProgressBarStack, normalizeProps(mergeProps({ key: 1 }, _ctx.$props)), null, 16 /* FULL_PROPS */))
  ]))
}

script.render = render;
script.__file = "src/components/progressbar/ProgressBar.vue";

export { script as default };
//# sourceMappingURL=ProgressBar.js.map
