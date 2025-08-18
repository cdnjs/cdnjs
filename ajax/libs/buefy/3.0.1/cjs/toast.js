'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var config = require('./config-DR826Ki2.js');
var NoticeMixin = require('./NoticeMixin--3RjH43z.js');
var _pluginVue_exportHelper = require('./_plugin-vue_export-helper-Die8u8yB.js');
var helpers = require('./helpers.js');
var plugins = require('./plugins-DbyYGVpp.js');

const Toast$1 = vue.defineComponent({
  name: "BToast",
  mixins: [NoticeMixin.NoticeMixin],
  data() {
    return {
      newDuration: this.duration || config.config.defaultToastDuration
    };
  }
});

const _hoisted_1 = ["aria-hidden"];
const _hoisted_2 = ["innerHTML"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createBlock(vue.Transition, {
    "enter-active-class": _ctx.transition.enter,
    "leave-active-class": _ctx.transition.leave,
    persisted: ""
  }, {
    default: vue.withCtx(() => [
      vue.withDirectives(vue.createElementVNode("div", {
        onMouseenter: _cache[0] || (_cache[0] = (...args) => _ctx.pause && _ctx.pause(...args)),
        onMouseleave: _cache[1] || (_cache[1] = (...args) => _ctx.removePause && _ctx.removePause(...args)),
        class: vue.normalizeClass(["toast", [_ctx.type, _ctx.position]]),
        "aria-hidden": !_ctx.isActive,
        role: "alert"
      }, [
        _ctx.$slots.default ? vue.renderSlot(_ctx.$slots, "default", { key: 0 }) : (vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          { key: 1 },
          [
            vue.createCommentVNode(" eslint-disable-next-line vue/no-v-html "),
            vue.createElementVNode("div", { innerHTML: _ctx.message }, null, 8, _hoisted_2)
          ],
          64
          /* STABLE_FRAGMENT */
        ))
      ], 42, _hoisted_1), [
        [vue.vShow, _ctx.isActive]
      ])
    ]),
    _: 3
    /* FORWARDED */
  }, 8, ["enter-active-class", "leave-active-class"]);
}
var Toast = /* @__PURE__ */ _pluginVue_exportHelper._export_sfc(Toast$1, [["render", _sfc_render]]);

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
      position: config.config.defaultToastPosition || "is-top",
      message
    }, restParams);
    const container = document.createElement("div");
    const vueInstance = vue.createApp({
      data() {
        return {
          toastVNode: null
        };
      },
      methods: {
        close() {
          const toast = helpers.getComponentFromVNode(this.toastVNode);
          if (toast) {
            toast.close();
          }
        }
      },
      render() {
        this.toastVNode = vue.h(
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
      helpers.copyAppContext(this.app, vueInstance);
    } else {
      vueInstance.config.globalProperties.$buefy = {};
    }
    return vueInstance.mount(container);
  }
}
const Plugin = {
  install(Vue) {
    plugins.registerComponentProgrammatic(Vue, "toast", new ToastProgrammatic(Vue));
  }
};

exports.BToast = Toast;
exports.ToastProgrammatic = ToastProgrammatic;
exports.default = Plugin;
