'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var MessageMixin = require('./MessageMixin-bGuuzfev.js');
var Icon = require('./Icon-lsDKE2wQ.js');
var Progress = require('./Progress-DT9Qc8Id.js');
var _pluginVue_exportHelper = require('./_plugin-vue_export-helper-Die8u8yB.js');
var plugins = require('./plugins-DbyYGVpp.js');
require('./config-DR826Ki2.js');
require('./helpers.js');

const Message$1 = vue.defineComponent({
  name: "BMessage",
  components: {
    BIcon: Icon.BIcon,
    BProgress: Progress.Progress
  },
  mixins: [MessageMixin.MessageMixin],
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
  const _component_b_icon = vue.resolveComponent("b-icon");
  const _component_b_progress = vue.resolveComponent("b-progress");
  return vue.openBlock(), vue.createBlock(vue.Transition, {
    name: "fade",
    persisted: ""
  }, {
    default: vue.withCtx(() => [
      vue.withDirectives(vue.createElementVNode(
        "article",
        {
          class: vue.normalizeClass(["message", [_ctx.type, _ctx.size]])
        },
        [
          _ctx.$slots.header || _ctx.title ? (vue.openBlock(), vue.createElementBlock("header", _hoisted_1, [
            _ctx.$slots.header ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_2, [
              vue.renderSlot(_ctx.$slots, "header")
            ])) : _ctx.title ? (vue.openBlock(), vue.createElementBlock(
              "p",
              _hoisted_3,
              vue.toDisplayString(_ctx.title),
              1
              /* TEXT */
            )) : vue.createCommentVNode("v-if", true),
            _ctx.closable ? (vue.openBlock(), vue.createElementBlock("button", {
              key: 2,
              type: "button",
              class: "delete",
              onClick: _cache[0] || (_cache[0] = (...args) => _ctx.close && _ctx.close(...args)),
              "aria-label": _ctx.ariaCloseLabel
            }, null, 8, _hoisted_4)) : vue.createCommentVNode("v-if", true)
          ])) : vue.createCommentVNode("v-if", true),
          _ctx.$slots.default ? (vue.openBlock(), vue.createElementBlock("section", _hoisted_5, [
            vue.createElementVNode("div", _hoisted_6, [
              _ctx.computedIcon && _ctx.hasIcon ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_7, [
                vue.createVNode(_component_b_icon, {
                  icon: _ctx.computedIcon,
                  pack: _ctx.iconPack,
                  class: vue.normalizeClass(_ctx.type),
                  both: "",
                  size: _ctx.newIconSize
                }, null, 8, ["icon", "pack", "class", "size"])
              ])) : vue.createCommentVNode("v-if", true),
              vue.createElementVNode("div", _hoisted_8, [
                vue.renderSlot(_ctx.$slots, "default")
              ])
            ])
          ])) : vue.createCommentVNode("v-if", true),
          _ctx.progressBar ? (vue.openBlock(), vue.createBlock(_component_b_progress, {
            key: 2,
            class: "auto-close-progress",
            value: _ctx.remainingTime - 1,
            max: _ctx.duration / 1e3 - 1,
            type: _ctx.type,
            rounded: false
          }, null, 8, ["value", "max", "type"])) : vue.createCommentVNode("v-if", true)
        ],
        2
        /* CLASS */
      ), [
        [vue.vShow, _ctx.isActive]
      ])
    ]),
    _: 3
    /* FORWARDED */
  });
}
var Message = /* @__PURE__ */ _pluginVue_exportHelper._export_sfc(Message$1, [["render", _sfc_render]]);

const Plugin = {
  install(Vue) {
    plugins.registerComponent(Vue, Message);
  }
};

exports.BMessage = Message;
exports.default = Plugin;
