'use strict';

var vue = require('vue');
var Icon = require('./Icon-lsDKE2wQ.js');
var config = require('./config-DR826Ki2.js');
var _pluginVue_exportHelper = require('./_plugin-vue_export-helper-Die8u8yB.js');

const NATIVE_TYPES = [
  "button",
  "submit",
  "reset"
];
var _sfc_main = vue.defineComponent({
  name: "BButton",
  components: { BIcon: Icon.BIcon },
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
        return config.config.defaultButtonRounded;
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
        return typeof value === "object" || config.config.defaultLinkTags.indexOf(value) >= 0;
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
  const _component_b_icon = vue.resolveComponent("b-icon");
  return vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.computedTag), vue.mergeProps({ class: "button" }, _ctx.$attrs, {
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
    default: vue.withCtx(() => [
      _ctx.iconLeft ? (vue.openBlock(), vue.createBlock(_component_b_icon, {
        key: 0,
        pack: _ctx.iconPack,
        icon: _ctx.iconLeft,
        size: _ctx.iconSize
      }, null, 8, ["pack", "icon", "size"])) : vue.createCommentVNode("v-if", true),
      _ctx.label ? (vue.openBlock(), vue.createElementBlock(
        "span",
        _hoisted_1,
        vue.toDisplayString(_ctx.label),
        1
        /* TEXT */
      )) : _ctx.$slots.default ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_2, [
        vue.renderSlot(_ctx.$slots, "default")
      ])) : vue.createCommentVNode("v-if", true),
      _ctx.iconRight ? (vue.openBlock(), vue.createBlock(_component_b_icon, {
        key: 3,
        pack: _ctx.iconPack,
        icon: _ctx.iconRight,
        size: _ctx.iconSize
      }, null, 8, ["pack", "icon", "size"])) : vue.createCommentVNode("v-if", true)
    ]),
    _: 3
    /* FORWARDED */
  }, 16, ["type", "class"]);
}
var BButton = /* @__PURE__ */ _pluginVue_exportHelper._export_sfc(_sfc_main, [["render", _sfc_render]]);

exports.BButton = BButton;
