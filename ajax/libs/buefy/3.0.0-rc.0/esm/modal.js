import { createApp, h } from 'vue';
import { M as Modal } from './Modal-EiR_KNGZ.js';
import { getComponentFromVNode, copyAppContext } from './helpers.js';
import { a as registerComponent, r as registerComponentProgrammatic } from './plugins-B172kuKE.js';
import './trapFocus-KHP_kCNE.js';
import './config-CKuo-p6e.js';
import './_plugin-vue_export-helper-OJRSZE6i.js';

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
var __publicField = (obj, key, value) => __defNormalProp(obj, key + "" , value);
class ModalProgrammatic {
  constructor(app) {
    __publicField(this, "app");
    this.app = app;
  }
  open(params) {
    if (typeof params === "string") {
      params = {
        content: params
      };
    }
    let slot;
    if (Array.isArray(params.content)) {
      slot = params.content;
      delete params.content;
    }
    const propsData = params;
    const container = document.createElement("div");
    const vueInstance = createApp({
      data() {
        return {
          modalVNode: null
        };
      },
      methods: {
        close() {
          const modal = getComponentFromVNode(this.modalVNode);
          if (modal) {
            modal.close();
          }
        }
      },
      render() {
        this.modalVNode = h(
          Modal,
          __spreadProps(__spreadValues({}, propsData), {
            programmatic: true,
            onClose: () => {
              vueInstance.unmount();
            },
            // intentionally overrides propsData.onCancel
            // to prevent propsData.onCancel from receiving a "cancel" event
            onCancel: () => {
            },
            cancelCallback: (method) => {
              if (propsData.onCancel != null) {
                propsData.onCancel(method);
              }
            }
          }),
          slot ? { default: () => slot } : void 0
        );
        return this.modalVNode;
      }
    });
    if (this.app) {
      copyAppContext(this.app, vueInstance);
    }
    return vueInstance.mount(container);
  }
}
const Plugin = {
  install(Vue) {
    registerComponent(Vue, Modal);
    registerComponentProgrammatic(Vue, "modal", new ModalProgrammatic(Vue));
  }
};

export { Modal as BModal, ModalProgrammatic, Plugin as default };
