import { defineComponent, createBlock, openBlock, Transition, withCtx, withDirectives, createElementVNode, normalizeClass, renderSlot, createElementBlock, Fragment, createCommentVNode, vShow, createApp, h } from 'vue';
import { c as config } from './config-CKuo-p6e.js';
import { N as NoticeMixin } from './NoticeMixin-ByNlva3T.js';
import { _ as _export_sfc } from './_plugin-vue_export-helper-OJRSZE6i.js';
import { getComponentFromVNode, copyAppContext } from './helpers.js';
import { r as registerComponentProgrammatic } from './plugins-B172kuKE.js';

const Toast$1 = defineComponent({
  name: "BToast",
  mixins: [NoticeMixin],
  data() {
    return {
      newDuration: this.duration || config.defaultToastDuration
    };
  }
});

const _hoisted_1 = ["aria-hidden"];
const _hoisted_2 = ["innerHTML"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(Transition, {
    "enter-active-class": _ctx.transition.enter,
    "leave-active-class": _ctx.transition.leave,
    persisted: ""
  }, {
    default: withCtx(() => [
      withDirectives(createElementVNode("div", {
        onMouseenter: _cache[0] || (_cache[0] = (...args) => _ctx.pause && _ctx.pause(...args)),
        onMouseleave: _cache[1] || (_cache[1] = (...args) => _ctx.removePause && _ctx.removePause(...args)),
        class: normalizeClass(["toast", [_ctx.type, _ctx.position]]),
        "aria-hidden": !_ctx.isActive,
        role: "alert"
      }, [
        _ctx.$slots.default ? renderSlot(_ctx.$slots, "default", { key: 0 }) : (openBlock(), createElementBlock(
          Fragment,
          { key: 1 },
          [
            createCommentVNode(" eslint-disable-next-line vue/no-v-html "),
            createElementVNode("div", { innerHTML: _ctx.message }, null, 8, _hoisted_2)
          ],
          64
          /* STABLE_FRAGMENT */
        ))
      ], 42, _hoisted_1), [
        [vShow, _ctx.isActive]
      ])
    ]),
    _: 3
    /* FORWARDED */
  }, 8, ["enter-active-class", "leave-active-class"]);
}
var Toast = /* @__PURE__ */ _export_sfc(Toast$1, [["render", _sfc_render]]);

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
class ToastProgrammatic {
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
      position: config.defaultToastPosition || "is-top",
      message
    }, restParams);
    const container = document.createElement("div");
    const vueInstance = createApp({
      data() {
        return {
          toastVNode: null
        };
      },
      methods: {
        close() {
          const toast = getComponentFromVNode(this.toastVNode);
          if (toast) {
            toast.close();
          }
        }
      },
      render() {
        this.toastVNode = h(
          Toast,
          __spreadProps(__spreadValues({}, propsData), {
            // On Vue 3, $destroy is no longer available.
            // A toast has to be unmounted manually.
            onClose: () => {
              if (typeof propsData.onClose === "function") {
                propsData.onClose();
              }
              setTimeout(() => {
                vueInstance.unmount();
              }, 150);
            }
          }),
          slot != null ? { default: () => slot } : void 0
        );
        return this.toastVNode;
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
    registerComponentProgrammatic(Vue, "toast", new ToastProgrammatic(Vue));
  }
};

export { Toast as BToast, ToastProgrammatic, Plugin as default };
