import { defineComponent, createBlock, openBlock, Transition, withCtx, withDirectives, createElementVNode, normalizeClass, renderSlot, createElementBlock, createCommentVNode, Fragment, toDisplayString, vShow, createApp, h } from 'vue';
import { c as config } from './config-CKuo-p6e.js';
import { N as NoticeMixin } from './NoticeMixin-ByNlva3T.js';
import { _ as _export_sfc } from './_plugin-vue_export-helper-OJRSZE6i.js';
import { getComponentFromVNode, copyAppContext } from './helpers.js';
import { r as registerComponentProgrammatic } from './plugins-B172kuKE.js';

const Snackbar$1 = defineComponent({
  name: "BSnackbar",
  mixins: [NoticeMixin],
  props: {
    actionText: {
      type: String,
      default: "OK"
    },
    onAction: {
      type: Function,
      default: () => {
      }
    },
    cancelText: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      newDuration: this.duration || config.defaultSnackbarDuration
    };
  },
  methods: {
    /*
    * Click listener.
    * Call action prop before closing (from Mixin).
    */
    action() {
      this.onAction();
      this.close();
    }
  }
});

const _hoisted_1 = ["role"];
const _hoisted_2 = ["innerHTML"];
const _hoisted_3 = { class: "button" };
const _hoisted_4 = { class: "button" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(Transition, {
    "enter-active-class": _ctx.transition.enter,
    "leave-active-class": _ctx.transition.leave,
    persisted: ""
  }, {
    default: withCtx(() => [
      withDirectives(createElementVNode("div", {
        class: normalizeClass(["snackbar", [_ctx.type, _ctx.position]]),
        onMouseenter: _cache[2] || (_cache[2] = (...args) => _ctx.pause && _ctx.pause(...args)),
        onMouseleave: _cache[3] || (_cache[3] = (...args) => _ctx.removePause && _ctx.removePause(...args)),
        role: _ctx.actionText ? "alertdialog" : "alert"
      }, [
        _ctx.$slots.default ? renderSlot(_ctx.$slots, "default", { key: 0 }) : (openBlock(), createElementBlock(
          Fragment,
          { key: 1 },
          [
            createCommentVNode(" eslint-disable-next-line vue/no-v-html "),
            createElementVNode("div", {
              class: "text",
              innerHTML: _ctx.message
            }, null, 8, _hoisted_2)
          ],
          64
          /* STABLE_FRAGMENT */
        )),
        _ctx.cancelText ? (openBlock(), createElementBlock("div", {
          key: 2,
          class: "action is-light is-cancel",
          onClick: _cache[0] || (_cache[0] = (...args) => _ctx.close && _ctx.close(...args))
        }, [
          createElementVNode(
            "button",
            _hoisted_3,
            toDisplayString(_ctx.cancelText),
            1
            /* TEXT */
          )
        ])) : createCommentVNode("v-if", true),
        _ctx.actionText ? (openBlock(), createElementBlock(
          "div",
          {
            key: 3,
            class: normalizeClass(["action", _ctx.type]),
            onClick: _cache[1] || (_cache[1] = (...args) => _ctx.action && _ctx.action(...args))
          },
          [
            createElementVNode(
              "button",
              _hoisted_4,
              toDisplayString(_ctx.actionText),
              1
              /* TEXT */
            )
          ],
          2
          /* CLASS */
        )) : createCommentVNode("v-if", true)
      ], 42, _hoisted_1), [
        [vShow, _ctx.isActive]
      ])
    ]),
    _: 3
    /* FORWARDED */
  }, 8, ["enter-active-class", "leave-active-class"]);
}
var Snackbar = /* @__PURE__ */ _export_sfc(Snackbar$1, [["render", _sfc_render]]);

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
class SnackbarProgrammatic {
  // may be undefined in the testing environment
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
      type: "is-success",
      position: config.defaultSnackbarPosition || "is-bottom-right",
      queue: true,
      message
    }, restParams);
    const container = document.createElement("div");
    const vueInstance = createApp({
      data() {
        return {
          snackbarVNode: null
        };
      },
      methods: {
        close() {
          const snackbar = getComponentFromVNode(this.snackbarVNode);
          if (snackbar) {
            snackbar.close();
          }
        }
      },
      render() {
        this.snackbarVNode = h(
          Snackbar,
          __spreadProps(__spreadValues({}, propsData), {
            onClose() {
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
        return this.snackbarVNode;
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
    registerComponentProgrammatic(Vue, "snackbar", new SnackbarProgrammatic(Vue));
  }
};

export { Snackbar as BSnackbar, SnackbarProgrammatic, Plugin as default };
