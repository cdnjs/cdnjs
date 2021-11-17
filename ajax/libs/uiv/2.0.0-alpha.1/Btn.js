import { openBlock, createElementBlock, normalizeClass, renderSlot, resolveComponent, createBlock, withCtx, createElementVNode, withModifiers } from "vue";
var linkMixin = {
  props: {
    href: String,
    target: String,
    to: null,
    replace: {
      type: Boolean,
      default: false
    },
    append: {
      type: Boolean,
      default: false
    },
    exact: {
      type: Boolean,
      default: false
    }
  }
};
var _export_sfc = (sfc, props) => {
  for (const [key, val] of props) {
    sfc[key] = val;
  }
  return sfc;
};
const _sfc_main$1 = {
  props: {
    size: { type: String, default: void 0 },
    vertical: {
      type: Boolean,
      default: false
    },
    justified: {
      type: Boolean,
      default: false
    }
  }
};
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass({
      "btn-group": !$props.vertical,
      "btn-group-vertical": $props.vertical,
      "btn-group-justified": $props.justified,
      [`btn-group-${$props.size}`]: $props.size
    }),
    role: "group",
    "data-toggle": "buttons"
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 2);
}
var BtnGroup = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);
const INPUT_TYPE_CHECKBOX = "checkbox";
const INPUT_TYPE_RADIO = "radio";
const _sfc_main = {
  components: { BtnGroup },
  mixins: [linkMixin],
  props: {
    justified: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: "default"
    },
    nativeType: {
      type: String,
      default: "button"
    },
    size: {
      type: String,
      default: void 0
    },
    block: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: null,
      default: null
    },
    inputValue: {
      type: null,
      default: null
    },
    inputType: {
      type: String,
      validator(value) {
        return value === INPUT_TYPE_CHECKBOX || value === INPUT_TYPE_RADIO;
      },
      default: void 0
    }
  },
  emits: ["update:modelValue"],
  computed: {
    isInputActive() {
      return this.inputType === INPUT_TYPE_CHECKBOX ? this.modelValue.indexOf(this.inputValue) >= 0 : this.modelValue === this.inputValue;
    },
    classes() {
      return {
        btn: true,
        active: this.inputType ? this.isInputActive : this.active,
        disabled: this.disabled,
        "btn-block": this.block,
        [`btn-${this.type}`]: Boolean(this.type),
        [`btn-${this.size}`]: Boolean(this.size)
      };
    }
  },
  methods: {
    onClick(e) {
      if (this.disabled && e instanceof Event) {
        e.preventDefault();
        e.stopPropagation();
      }
    },
    onInputChange() {
      if (this.inputType === INPUT_TYPE_CHECKBOX) {
        const valueCopied = this.modelValue.slice();
        if (this.isInputActive) {
          valueCopied.splice(valueCopied.indexOf(this.inputValue), 1);
        } else {
          valueCopied.push(this.inputValue);
        }
        this.$emit("update:modelValue", valueCopied);
      } else {
        this.$emit("update:modelValue", this.inputValue);
      }
    }
  }
};
const _hoisted_1 = ["href", "target"];
const _hoisted_2 = ["type", "checked", "disabled"];
const _hoisted_3 = ["type", "disabled"];
const _hoisted_4 = ["type", "disabled"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_link = resolveComponent("router-link");
  const _component_BtnGroup = resolveComponent("BtnGroup");
  return _ctx.href ? (openBlock(), createElementBlock("a", {
    key: 0,
    href: _ctx.href,
    target: _ctx.target,
    role: "button",
    class: normalizeClass($options.classes),
    onClick: _cache[0] || (_cache[0] = (...args) => $options.onClick && $options.onClick(...args))
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 10, _hoisted_1)) : _ctx.to ? (openBlock(), createBlock(_component_router_link, {
    key: 1,
    to: _ctx.to,
    class: normalizeClass($options.classes),
    event: $props.disabled ? "" : "click",
    replace: _ctx.replace,
    append: _ctx.append,
    exact: _ctx.exact,
    role: "button",
    onClick: $options.onClick
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 8, ["to", "class", "event", "replace", "append", "exact", "onClick"])) : $props.inputType ? (openBlock(), createElementBlock("label", {
    key: 2,
    class: normalizeClass($options.classes),
    onClick: _cache[3] || (_cache[3] = (...args) => $options.onClick && $options.onClick(...args))
  }, [
    createElementVNode("input", {
      autocomplete: "off",
      type: $props.inputType,
      checked: $options.isInputActive,
      disabled: $props.disabled,
      onInput: _cache[1] || (_cache[1] = withModifiers(() => {
      }, ["stop"])),
      onChange: _cache[2] || (_cache[2] = (...args) => $options.onInputChange && $options.onInputChange(...args))
    }, null, 40, _hoisted_2),
    renderSlot(_ctx.$slots, "default")
  ], 2)) : $props.justified ? (openBlock(), createBlock(_component_BtnGroup, { key: 3 }, {
    default: withCtx(() => [
      createElementVNode("button", {
        class: normalizeClass($options.classes),
        type: $props.nativeType,
        disabled: $props.disabled,
        onClick: _cache[4] || (_cache[4] = (...args) => $options.onClick && $options.onClick(...args))
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 10, _hoisted_3)
    ]),
    _: 3
  })) : (openBlock(), createElementBlock("button", {
    key: 4,
    class: normalizeClass($options.classes),
    type: $props.nativeType,
    disabled: $props.disabled,
    onClick: _cache[5] || (_cache[5] = (...args) => $options.onClick && $options.onClick(...args))
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 10, _hoisted_4));
}
var Btn = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { Btn as default };
