import { defineComponent, resolveComponent, createBlock, openBlock, Transition, withCtx, withDirectives, createElementVNode, normalizeClass, createElementBlock, createCommentVNode, renderSlot, toDisplayString, createVNode, vShow } from 'vue';
import { M as MessageMixin } from './MessageMixin-CQ7LIdvq.js';
import { B as BIcon } from './Icon-DPyGDeRK.js';
import { P as Progress } from './Progress-BPGTVZgr.js';
import { _ as _export_sfc } from './_plugin-vue_export-helper-OJRSZE6i.js';
import { a as registerComponent } from './plugins-B172kuKE.js';
import './config-CKuo-p6e.js';
import './helpers.js';

const Message$1 = defineComponent({
  name: "BMessage",
  components: {
    BIcon,
    BProgress: Progress
  },
  mixins: [MessageMixin],
  props: {
    ariaCloseLabel: String
  }
});

const _hoisted_1 = {
  key: 0,
  class: "message-header"
};
const _hoisted_2 = { key: 0 };
const _hoisted_3 = { key: 1 };
const _hoisted_4 = ["aria-label"];
const _hoisted_5 = {
  key: 1,
  class: "message-body"
};
const _hoisted_6 = { class: "media" };
const _hoisted_7 = {
  key: 0,
  class: "media-left"
};
const _hoisted_8 = { class: "media-content" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_icon = resolveComponent("b-icon");
  const _component_b_progress = resolveComponent("b-progress");
  return openBlock(), createBlock(Transition, {
    name: "fade",
    persisted: ""
  }, {
    default: withCtx(() => [
      withDirectives(createElementVNode(
        "article",
        {
          class: normalizeClass(["message", [_ctx.type, _ctx.size]])
        },
        [
          _ctx.$slots.header || _ctx.title ? (openBlock(), createElementBlock("header", _hoisted_1, [
            _ctx.$slots.header ? (openBlock(), createElementBlock("div", _hoisted_2, [
              renderSlot(_ctx.$slots, "header")
            ])) : _ctx.title ? (openBlock(), createElementBlock(
              "p",
              _hoisted_3,
              toDisplayString(_ctx.title),
              1
              /* TEXT */
            )) : createCommentVNode("v-if", true),
            _ctx.closable ? (openBlock(), createElementBlock("button", {
              key: 2,
              type: "button",
              class: "delete",
              onClick: _cache[0] || (_cache[0] = (...args) => _ctx.close && _ctx.close(...args)),
              "aria-label": _ctx.ariaCloseLabel
            }, null, 8, _hoisted_4)) : createCommentVNode("v-if", true)
          ])) : createCommentVNode("v-if", true),
          _ctx.$slots.default ? (openBlock(), createElementBlock("section", _hoisted_5, [
            createElementVNode("div", _hoisted_6, [
              _ctx.computedIcon && _ctx.hasIcon ? (openBlock(), createElementBlock("div", _hoisted_7, [
                createVNode(_component_b_icon, {
                  icon: _ctx.computedIcon,
                  pack: _ctx.iconPack,
                  class: normalizeClass(_ctx.type),
                  both: "",
                  size: _ctx.newIconSize
                }, null, 8, ["icon", "pack", "class", "size"])
              ])) : createCommentVNode("v-if", true),
              createElementVNode("div", _hoisted_8, [
                renderSlot(_ctx.$slots, "default")
              ])
            ])
          ])) : createCommentVNode("v-if", true),
          _ctx.progressBar ? (openBlock(), createBlock(_component_b_progress, {
            key: 2,
            class: "auto-close-progress",
            value: _ctx.remainingTime - 1,
            max: _ctx.duration / 1e3 - 1,
            type: _ctx.type,
            rounded: false
          }, null, 8, ["value", "max", "type"])) : createCommentVNode("v-if", true)
        ],
        2
        /* CLASS */
      ), [
        [vShow, _ctx.isActive]
      ])
    ]),
    _: 3
    /* FORWARDED */
  });
}
var Message = /* @__PURE__ */ _export_sfc(Message$1, [["render", _sfc_render]]);

const Plugin = {
  install(Vue) {
    registerComponent(Vue, Message);
  }
};

export { Message as BMessage, Plugin as default };
