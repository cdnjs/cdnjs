'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var Modal = require('./Modal-D1aZUehE.js');
var helpers = require('./helpers.js');
var plugins = require('./plugins-DbyYGVpp.js');
require('./trapFocus-BlX6xykt.js');
require('./config-DR826Ki2.js');
require('./_plugin-vue_export-helper-Die8u8yB.js');

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
    const vueInstance = vue.createApp({
      data() {
        return {
          modalVNode: null
        };
      },
      methods: {
        close() {
          const modal = helpers.getComponentFromVNode(this.modalVNode);
          if (modal) {
            modal.close();
          }
        }
      },
      render() {
        this.modalVNode = vue.h(
          Modal.Modal,
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
      helpers.copyAppContext(this.app, vueInstance);
    }
    return vueInstance.mount(container);
  }
}
const Plugin = {
  install(Vue) {
    plugins.registerComponent(Vue, Modal.Modal);
    plugins.registerComponentProgrammatic(Vue, "modal", new ModalProgrammatic(Vue));
  }
};

exports.BModal = Modal.Modal;
exports.ModalProgrammatic = ModalProgrammatic;
exports.default = Plugin;
