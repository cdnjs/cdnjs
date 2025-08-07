'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var Icon = require('./Icon-lsDKE2wQ.js');
var Progress = require('./Progress-DT9Qc8Id.js');
var MessageMixin = require('./MessageMixin-bGuuzfev.js');
var _pluginVue_exportHelper = require('./_plugin-vue_export-helper-Die8u8yB.js');
var config = require('./config-DR826Ki2.js');
var helpers = require('./helpers.js');
var NoticeMixin = require('./NoticeMixin--3RjH43z.js');
var plugins = require('./plugins-DbyYGVpp.js');

const Notification$1 = vue.defineComponent({
  name: "BNotification",
  components: {
    BIcon: Icon.BIcon,
    // directly registers Progress
    // in case Notification is programmatically opened
    BProgress: Progress.Progress
  },
  mixins: [MessageMixin.MessageMixin],
  props: {
    position: String,
    ariaCloseLabel: String,
    animation: {
      type: String,
      default: "fade"
    }
  }
});

const _hoisted_1 = ["aria-label"];
const _hoisted_2 = {
  key: 1,
  class: "media"
};
const _hoisted_3 = {
  key: 0,
  class: "media-left"
};
const _hoisted_4 = { class: "media-content" };
const _hoisted_5 = ["innerHTML"];
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_icon = vue.resolveComponent("b-icon");
  const _component_b_progress = vue.resolveComponent("b-progress");
  return vue.openBlock(), vue.createBlock(vue.Transition, {
    name: _ctx.animation,
    persisted: ""
  }, {
    default: vue.withCtx(() => [
      vue.withDirectives(vue.createElementVNode(
        "article",
        {
          class: vue.normalizeClass(["notification", [_ctx.type, _ctx.position]]),
          onClick: _cache[1] || (_cache[1] = (...args) => _ctx.click && _ctx.click(...args))
        },
        [
          _ctx.closable ? (vue.openBlock(), vue.createElementBlock("button", {
            key: 0,
            class: "delete",
            type: "button",
            onClick: _cache[0] || (_cache[0] = (...args) => _ctx.close && _ctx.close(...args)),
            "aria-label": _ctx.ariaCloseLabel
          }, null, 8, _hoisted_1)) : vue.createCommentVNode("v-if", true),
          _ctx.$slots.default || _ctx.message ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_2, [
            _ctx.computedIcon && _ctx.hasIcon ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_3, [
              vue.createVNode(_component_b_icon, {
                icon: _ctx.computedIcon,
                pack: _ctx.iconPack,
                size: _ctx.newIconSize,
                both: "",
                "aria-hidden": ""
              }, null, 8, ["icon", "pack", "size"])
            ])) : vue.createCommentVNode("v-if", true),
            vue.createElementVNode("div", _hoisted_4, [
              _ctx.$slots.default ? vue.renderSlot(_ctx.$slots, "default", { key: 0 }) : (vue.openBlock(), vue.createElementBlock(
                vue.Fragment,
                { key: 1 },
                [
                  vue.createCommentVNode(" eslint-disable-next-line vue/no-v-html "),
                  vue.createElementVNode("p", {
                    class: "text",
                    innerHTML: _ctx.message
                  }, null, 8, _hoisted_5)
                ],
                64
                /* STABLE_FRAGMENT */
              ))
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
  }, 8, ["name"]);
}
var Notification = /* @__PURE__ */ _pluginVue_exportHelper._export_sfc(Notification$1, [["render", _sfc_render$1]]);

const NotificationNotice$1 = vue.defineComponent({
  name: "BNotificationNotice",
  components: { BNotification: Notification },
  mixins: [NoticeMixin.NoticeMixin],
  data() {
    return {
      newDuration: this.duration || config.config.defaultNotificationDuration
    };
  },
  emits: {
    close: () => true
  },
  methods: {
    close() {
      if (!this.isPaused) {
        clearTimeout(this.timer);
        this.$refs.notification.isActive = false;
        this.$emit("close");
        setTimeout(() => {
          helpers.removeElement(this.$el);
        }, 150);
      }
    }
  }
});

function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_notification = vue.resolveComponent("b-notification");
  return _ctx.$slots.default != null ? (vue.openBlock(), vue.createBlock(_component_b_notification, vue.mergeProps({
    key: 0,
    ref: "notification",
    position: _ctx.position,
    "model-value": _ctx.isActive,
    type: _ctx.type,
    message: _ctx.message,
    duration: _ctx.duration
  }, _ctx.$attrs, {
    onClick: _ctx.click,
    onClose: _ctx.close,
    onMouseenter: _ctx.pause,
    onMouseleave: _ctx.removePause
  }), {
    default: vue.withCtx(() => [
      vue.renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
    /* FORWARDED */
  }, 16, ["position", "model-value", "type", "message", "duration", "onClick", "onClose", "onMouseenter", "onMouseleave"])) : (vue.openBlock(), vue.createBlock(_component_b_notification, vue.mergeProps({
    key: 1,
    ref: "notification",
    position: _ctx.position,
    "model-value": _ctx.isActive,
    type: _ctx.type,
    message: _ctx.message,
    duration: _ctx.duration
  }, _ctx.$attrs, {
    onClick: _ctx.click,
    onClose: _ctx.close,
    onMouseenter: _ctx.pause,
    onMouseleave: _ctx.removePause
  }), null, 16, ["position", "model-value", "type", "message", "duration", "onClick", "onClose", "onMouseenter", "onMouseleave"]));
}
var NotificationNotice = /* @__PURE__ */ _pluginVue_exportHelper._export_sfc(NotificationNotice$1, [["render", _sfc_render]]);

var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __publicField = (obj, key, value) => __defNormalProp(obj, key + "" , value);
class NotificationProgrammatic {
  constructor(app) {
    __publicField(this, "app");
    this.app = app;
  }
  open(params) {
    if (typeof params === "string") {
      params = {
        message: params
      };
    }
    let slot;
    let _a = params, { message } = _a, restParams = __objRest(_a, ["message"]);
    if (typeof message !== "string") {
      slot = message;
      message = void 0;
    }
    const propsData = __spreadValues({
      position: config.config.defaultNotificationPosition || "is-top-right",
      message
    }, restParams);
    const container = document.createElement("div");
    const vueInstance = vue.createApp({
      data() {
        return {
          noticeVNode: null
        };
      },
      methods: {
        close() {
          const notice = helpers.getComponentFromVNode(this.noticeVNode);
          if (notice) {
            notice.close();
          }
        }
      },
      render() {
        this.noticeVNode = vue.h(
          NotificationNotice,
          __spreadProps(__spreadValues({}, propsData), {
            onClose: () => {
              if (propsData.onClose != null) {
                propsData.onClose();
              }
              setTimeout(() => {
                vueInstance.unmount();
              }, 150);
            }
          }),
          slot != null ? { default: () => slot } : void 0
        );
        return this.noticeVNode;
      }
    });
    if (this.app) {
      helpers.copyAppContext(this.app, vueInstance);
    } else {
      vueInstance.config.globalProperties.$buefy = {};
    }
    return vueInstance.mount(container);
  }
}
const Plugin = {
  install(Vue) {
    plugins.registerComponent(Vue, Notification);
    plugins.registerComponentProgrammatic(Vue, "notification", new NotificationProgrammatic(Vue));
  }
};

exports.BNotification = Notification;
exports.NotificationProgrammatic = NotificationProgrammatic;
exports.default = Plugin;
