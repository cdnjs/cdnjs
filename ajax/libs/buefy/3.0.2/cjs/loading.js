'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var Loading = require('./Loading-GqqqjipO.js');
var helpers = require('./helpers.js');
var plugins = require('./plugins-DbyYGVpp.js');
require('./ssr-DVRFTu_P.js');
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
class LoadingProgrammatic {
  constructor(app) {
    __publicField(this, "app");
    this.app = app;
  }
  open(params) {
    const propsData = params;
    const container = document.createElement("div");
    const vueInstance = vue.createApp({
      data() {
        return {
          loadingVNode: null
        };
      },
      methods: {
        close() {
          const loading = helpers.getComponentFromVNode(this.loadingVNode);
          if (loading) {
            loading.close();
          }
        }
      },
      render() {
        this.loadingVNode = vue.h(
          Loading.BLoading,
          __spreadProps(__spreadValues({}, propsData), {
            programmatic: true,
            onClose(...args) {
              if (propsData.onClose) {
                propsData.onClose(...args);
              }
              setTimeout(() => {
                vueInstance.unmount();
              }, 150);
            }
          })
        );
        return this.loadingVNode;
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
    plugins.registerComponent(Vue, Loading.BLoading);
    plugins.registerComponentProgrammatic(Vue, "loading", new LoadingProgrammatic(Vue));
  }
};

exports.BLoading = Loading.BLoading;
exports.LoadingProgrammatic = LoadingProgrammatic;
exports.default = Plugin;
