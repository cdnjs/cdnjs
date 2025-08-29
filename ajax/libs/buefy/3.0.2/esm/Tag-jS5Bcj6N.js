import { defineComponent, resolveComponent, createElementBlock, openBlock, createElementVNode, normalizeClass, createBlock, createCommentVNode, renderSlot, withKeys, withModifiers } from 'vue';
import { B as BIcon } from './Icon-DPyGDeRK.js';
import { _ as _export_sfc } from './_plugin-vue_export-helper-OJRSZE6i.js';

var _sfc_main = defineComponent({
  name: "BTag",
  components: { BIcon },
  props: {
    attached: Boolean,
    closable: Boolean,
    type: [String, Object],
    size: String,
    rounded: Boolean,
    disabled: Boolean,
    ellipsis: Boolean,
    tabstop: {
      type: Boolean,
      default: true
    },
    ariaCloseLabel: String,
    icon: String,
    iconType: String,
    iconPack: String,
    closeType: String,
    closeIcon: String,
    closeIconPack: String,
    closeIconType: String
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    click: (_) => true,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    close: (_) => true
  },
  computed: {
    // setting a boolean attribute `false` does not remove it on Vue 3.
    // `null` or `undefined` has to be given to remove it.
    disabledOrUndefined() {
      return this.disabled || void 0;
    }
  },
  methods: {
    /*
    * Emit close event when delete button is clicked
    * or delete key is pressed.
    */
    close(event) {
      if (this.disabled) return;
      this.$emit("close", event);
    },
    /*
    * Emit click event when tag is clicked.
    */
    click(event) {
      if (this.disabled) return;
      this.$emit("click", event);
    }
  }
});

const _hoisted_1 = {
  key: 0,
  class: "tags has-addons inline-tags"
};
const _hoisted_2 = ["aria-label", "tabindex", "disabled"];
const _hoisted_3 = ["aria-label", "disabled", "tabindex"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_icon = resolveComponent("b-icon");
  return _ctx.attached && _ctx.closable ? (openBlock(), createElementBlock("div", _hoisted_1, [
    createElementVNode(
      "span",
      {
        class: normalizeClass(["tag", [_ctx.type, _ctx.size, { "is-rounded": _ctx.rounded }]])
      },
      [
        _ctx.icon ? (openBlock(), createBlock(_component_b_icon, {
          key: 0,
          icon: _ctx.icon,
          size: _ctx.size,
          type: _ctx.iconType,
          pack: _ctx.iconPack
        }, null, 8, ["icon", "size", "type", "pack"])) : createCommentVNode("v-if", true),
        createElementVNode(
          "span",
          {
            class: normalizeClass({ "has-ellipsis": _ctx.ellipsis }),
            onClick: _cache[0] || (_cache[0] = (...args) => _ctx.click && _ctx.click(...args))
          },
          [
            renderSlot(_ctx.$slots, "default")
          ],
          2
          /* CLASS */
        )
      ],
      2
      /* CLASS */
    ),
    createElementVNode("a", {
      class: normalizeClass(["tag", [
        _ctx.size,
        _ctx.closeType,
        { "is-rounded": _ctx.rounded },
        _ctx.closeIcon ? "has-delete-icon" : "is-delete"
      ]]),
      role: "button",
      "aria-label": _ctx.ariaCloseLabel,
      tabindex: _ctx.tabstop ? 0 : void 0,
      disabled: _ctx.disabledOrUndefined,
      onClick: _cache[1] || (_cache[1] = (...args) => _ctx.close && _ctx.close(...args)),
      onKeyup: _cache[2] || (_cache[2] = withKeys(withModifiers((...args) => _ctx.close && _ctx.close(...args), ["prevent"]), ["delete"]))
    }, [
      _ctx.closeIcon ? (openBlock(), createBlock(_component_b_icon, {
        key: 0,
        "custom-class": "",
        icon: _ctx.closeIcon,
        size: _ctx.size,
        type: _ctx.closeIconType,
        pack: _ctx.closeIconPack
      }, null, 8, ["icon", "size", "type", "pack"])) : createCommentVNode("v-if", true)
    ], 42, _hoisted_2)
  ])) : (openBlock(), createElementBlock(
    "span",
    {
      key: 1,
      class: normalizeClass(["tag", [_ctx.type, _ctx.size, { "is-rounded": _ctx.rounded }]])
    },
    [
      _ctx.icon ? (openBlock(), createBlock(_component_b_icon, {
        key: 0,
        icon: _ctx.icon,
        size: _ctx.size,
        type: _ctx.iconType,
        pack: _ctx.iconPack
      }, null, 8, ["icon", "size", "type", "pack"])) : createCommentVNode("v-if", true),
      createElementVNode(
        "span",
        {
          class: normalizeClass({ "has-ellipsis": _ctx.ellipsis }),
          onClick: _cache[3] || (_cache[3] = (...args) => _ctx.click && _ctx.click(...args))
        },
        [
          renderSlot(_ctx.$slots, "default")
        ],
        2
        /* CLASS */
      ),
      _ctx.closable ? (openBlock(), createElementBlock("a", {
        key: 1,
        role: "button",
        "aria-label": _ctx.ariaCloseLabel,
        class: normalizeClass(["delete is-small", _ctx.closeType]),
        disabled: _ctx.disabledOrUndefined,
        tabindex: _ctx.tabstop ? 0 : void 0,
        onClick: _cache[4] || (_cache[4] = (...args) => _ctx.close && _ctx.close(...args)),
        onKeyup: _cache[5] || (_cache[5] = withKeys(withModifiers((...args) => _ctx.close && _ctx.close(...args), ["prevent"]), ["delete"]))
      }, null, 42, _hoisted_3)) : createCommentVNode("v-if", true)
    ],
    2
    /* CLASS */
  ));
}
var BTag = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);

export { BTag as B };
