import { defineComponent, resolveComponent, createBlock, openBlock, Transition, withCtx, withDirectives, createElementVNode, normalizeClass, createElementBlock, createCommentVNode, createVNode, renderSlot, Fragment, vShow, mergeProps, createApp, h } from 'vue';
import { B as BIcon } from './Icon-DPyGDeRK.js';
import { P as Progress } from './Progress-BPGTVZgr.js';
import { M as MessageMixin } from './MessageMixin-CQ7LIdvq.js';
import { _ as _export_sfc } from './_plugin-vue_export-helper-OJRSZE6i.js';
import { c as config } from './config-CKuo-p6e.js';
import { removeElement, getComponentFromVNode, copyAppContext } from './helpers.js';
import { N as NoticeMixin } from './NoticeMixin-ByNlva3T.js';
import { a as registerComponent, r as registerComponentProgrammatic } from './plugins-B172kuKE.js';

const Notification$1 = defineComponent({
  name: "BNotification",
  components: {
    BIcon,
    // directly registers Progress
    // in case Notification is programmatically opened
    BProgress: Progress
  },
  mixins: [MessageMixin],
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
  const _component_b_icon = resolveComponent("b-icon");
  const _component_b_progress = resolveComponent("b-progress");
  return openBlock(), createBlock(Transition, {
    name: _ctx.animation,
    persisted: ""
  }, {
    default: withCtx(() => [
      withDirectives(createElementVNode(
        "article",
        {
          class: normalizeClass(["notification", [_ctx.type, _ctx.position]]),
          onClick: _cache[1] || (_cache[1] = (...args) => _ctx.click && _ctx.click(...args))
        },
        [
          _ctx.closable ? (openBlock(), createElementBlock("button", {
            key: 0,
            class: "delete",
            type: "button",
            onClick: _cache[0] || (_cache[0] = (...args) => _ctx.close && _ctx.close(...args)),
            "aria-label": _ctx.ariaCloseLabel
          }, null, 8, _hoisted_1)) : createCommentVNode("v-if", true),
          _ctx.$slots.default || _ctx.message ? (openBlock(), createElementBlock("div", _hoisted_2, [
            _ctx.computedIcon && _ctx.hasIcon ? (openBlock(), createElementBlock("div", _hoisted_3, [
              createVNode(_component_b_icon, {
                icon: _ctx.computedIcon,
                pack: _ctx.iconPack,
                size: _ctx.newIconSize,
                both: "",
                "aria-hidden": ""
              }, null, 8, ["icon", "pack", "size"])
            ])) : createCommentVNode("v-if", true),
            createElementVNode("div", _hoisted_4, [
              _ctx.$slots.default ? renderSlot(_ctx.$slots, "default", { key: 0 }) : (openBlock(), createElementBlock(
                Fragment,
                { key: 1 },
                [
                  createCommentVNode(" eslint-disable-next-line vue/no-v-html "),
                  createElementVNode("p", {
                    class: "text",
                    innerHTML: _ctx.message
                  }, null, 8, _hoisted_5)
                ],
                64
                /* STABLE_FRAGMENT */
              ))
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
  }, 8, ["name"]);
}
var Notification = /* @__PURE__ */ _export_sfc(Notification$1, [["render", _sfc_render$1]]);

const NotificationNotice$1 = defineComponent({
  name: "BNotificationNotice",
  components: { BNotification: Notification },
  mixins: [NoticeMixin],
  data() {
    return {
      newDuration: this.duration || config.defaultNotificationDuration
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
          removeElement(this.$el);
        }, 150);
      }
    }
  }
});

function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_notification = resolveComponent("b-notification");
  return _ctx.$slots.default != null ? (openBlock(), createBlock(_component_b_notification, mergeProps({
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
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
    /* FORWARDED */
  }, 16, ["position", "model-value", "type", "message", "duration", "onClick", "onClose", "onMouseenter", "onMouseleave"])) : (openBlock(), createBlock(_component_b_notification, mergeProps({
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
var NotificationNotice = /* @__PURE__ */ _export_sfc(NotificationNotice$1, [["render", _sfc_render]]);

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
      position: config.defaultNotificationPosition || "is-top-right",
      message
    }, restParams);
    const container = document.createElement("div");
    const vueInstance = createApp({
      data() {
        return {
          noticeVNode: null
        };
      },
      methods: {
        close() {
          const notice = getComponentFromVNode(this.noticeVNode);
          if (notice) {
            notice.close();
          }
        }
      },
      render() {
        this.noticeVNode = h(
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
      copyAppContext(this.app, vueInstance);
    } else {
      vueInstance.config.globalProperties.$buefy = {};
    }
    return vueInstance.mount(container);
  }
}
const Plugin = {
  install(Vue) {
    registerComponent(Vue, Notification);
    registerComponentProgrammatic(Vue, "notification", new NotificationProgrammatic(Vue));
  }
};

export { Notification as BNotification, NotificationProgrammatic, Plugin as default };
