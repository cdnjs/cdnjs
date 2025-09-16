import { defineComponent, resolveComponent, createBlock, openBlock, resolveDynamicComponent, mergeProps, withCtx, createCommentVNode, createElementBlock, toDisplayString, renderSlot } from 'vue';
import { B as BIcon } from './Icon-DPyGDeRK.js';
import { c as config } from './config-CKuo-p6e.js';
import { _ as _export_sfc } from './_plugin-vue_export-helper-OJRSZE6i.js';

const NATIVE_TYPES = [
  "button",
  "submit",
  "reset"
];
var _sfc_main = defineComponent({
  name: "BButton",
  components: { BIcon },
  inheritAttrs: false,
  props: {
    type: [String, Object],
    size: String,
    label: String,
    iconPack: String,
    iconLeft: String,
    iconRight: String,
    rounded: {
      type: Boolean,
      default: () => {
        return config.defaultButtonRounded;
      }
    },
    loading: Boolean,
    outlined: Boolean,
    expanded: Boolean,
    inverted: Boolean,
    focused: Boolean,
    active: Boolean,
    hovered: Boolean,
    selected: Boolean,
    nativeType: {
      type: String,
      default: "button",
      validator: (value) => {
        return NATIVE_TYPES.indexOf(value) >= 0;
      }
    },
    tag: {
      type: [String, Object],
      default: "button",
      validator: (value) => {
        return typeof value === "object" || config.defaultLinkTags.indexOf(value) >= 0;
      }
    }
  },
  computed: {
    computedTag() {
      if (this.$attrs.disabled !== void 0 && this.$attrs.disabled !== false) {
        return "button";
      }
      return this.tag;
    },
    iconSize() {
      if (!this.size || this.size === "is-medium") {
        return "is-small";
      } else if (this.size === "is-large") {
        return "is-medium";
      }
      return this.size;
    }
  }
});

const _hoisted_1 = { key: 1 };
const _hoisted_2 = { key: 2 };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_icon = resolveComponent("b-icon");
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.computedTag), mergeProps({ class: "button" }, _ctx.$attrs, {
    type: typeof _ctx.computedTag === "string" && ["button", "input"].includes(_ctx.computedTag) ? _ctx.nativeType : void 0,
    class: [_ctx.size, _ctx.type, {
      "is-rounded": _ctx.rounded,
      "is-loading": _ctx.loading,
      "is-outlined": _ctx.outlined,
      "is-fullwidth": _ctx.expanded,
      "is-inverted": _ctx.inverted,
      "is-focused": _ctx.focused,
      "is-active": _ctx.active,
      "is-hovered": _ctx.hovered,
      "is-selected": _ctx.selected
    }]
  }), {
    default: withCtx(() => [
      _ctx.iconLeft ? (openBlock(), createBlock(_component_b_icon, {
        key: 0,
        pack: _ctx.iconPack,
        icon: _ctx.iconLeft,
        size: _ctx.iconSize
      }, null, 8, ["pack", "icon", "size"])) : createCommentVNode("v-if", true),
      _ctx.label ? (openBlock(), createElementBlock(
        "span",
        _hoisted_1,
        toDisplayString(_ctx.label),
        1
        /* TEXT */
      )) : _ctx.$slots.default ? (openBlock(), createElementBlock("span", _hoisted_2, [
        renderSlot(_ctx.$slots, "default")
      ])) : createCommentVNode("v-if", true),
      _ctx.iconRight ? (openBlock(), createBlock(_component_b_icon, {
        key: 3,
        pack: _ctx.iconPack,
        icon: _ctx.iconRight,
        size: _ctx.iconSize
      }, null, 8, ["pack", "icon", "size"])) : createCommentVNode("v-if", true)
    ]),
    _: 3
    /* FORWARDED */
  }, 16, ["type", "class"]);
}
var BButton = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);

export { BButton as B };
