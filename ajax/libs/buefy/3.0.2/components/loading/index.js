/*! Buefy v3.0.2 | MIT License | github.com/buefy/buefy */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
    typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Loading = {}, global.Vue));
})(this, (function (exports, vue) { 'use strict';

    function removeElement(el) {
      if (typeof el.remove !== "undefined") {
        el.remove();
      } else if (typeof el.parentNode !== "undefined" && el.parentNode !== null) {
        el.parentNode.removeChild(el);
      }
    }
    function getComponentFromVNode(vnode) {
      if (!vnode) {
        return void 0;
      }
      const { component } = vnode;
      if (!component) {
        return void 0;
      }
      return component.exposed && component.exposeProxy || component.proxy;
    }
    function copyAppContext(src, dest) {
      const { _context: srcContext } = src;
      const { _context: destContext } = dest;
      destContext.config = srcContext.config;
      destContext.mixins = srcContext.mixins;
      destContext.components = srcContext.components;
      destContext.directives = srcContext.directives;
      destContext.provides = srcContext.provides;
      destContext.optionsCache = srcContext.optionsCache;
      destContext.propsCache = srcContext.propsCache;
      destContext.emitsCache = srcContext.emitsCache;
      if ("__VUE_I18N_SYMBOL__" in src) {
        dest.__VUE_I18N_SYMBOL__ = src.__VUE_I18N_SYMBOL__;
      }
    }

    const isSSR = typeof window === "undefined";
    const HTMLElement = isSSR ? Object : window.HTMLElement;

    const Loading$1 = vue.defineComponent({
      name: "BLoading",
      props: {
        modelValue: Boolean,
        programmatic: Boolean,
        container: [Object, Function, HTMLElement],
        isFullPage: {
          type: Boolean,
          default: true
        },
        animation: {
          type: String,
          default: "fade"
        },
        canCancel: {
          type: Boolean,
          default: false
        },
        onCancel: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          type: Function,
          default: () => {
          }
        }
      },
      emits: {
        /* eslint-disable @typescript-eslint/no-unused-vars */
        close: () => true,
        "update:is-full-page": (_flag) => true,
        "update:modelValue": (_flag) => true
        /* eslint-enable @typescript-eslint/no-unused-vars */
      },
      data() {
        return {
          isActive: this.modelValue || false,
          displayInFullPage: this.isFullPage
        };
      },
      watch: {
        modelValue(value) {
          this.isActive = value;
        },
        isFullPage(value) {
          this.displayInFullPage = value;
        }
      },
      methods: {
        /*
        * Close the Modal if canCancel.
        */
        cancel() {
          if (!this.canCancel || !this.isActive) return;
          this.close();
        },
        /*
        * Emit events, and destroy modal if it's programmatic.
        */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        close(...args) {
          this.onCancel.apply(null, args);
          this.$emit("close");
          this.$emit("update:modelValue", false);
          if (this.programmatic) {
            this.isActive = false;
            setTimeout(() => {
              removeElement(this.$el);
            }, 150);
          }
        },
        /*
        * Keypress event that is bound to the document.
        */
        keyPress({ key }) {
          if (key === "Escape" || key === "Esc") this.cancel();
        }
      },
      created() {
        if (typeof window !== "undefined") {
          document.addEventListener("keyup", this.keyPress);
        }
      },
      mounted() {
        if (this.programmatic) {
          if (!this.container) {
            document.body.appendChild(this.$el);
          } else {
            this.displayInFullPage = false;
            this.$emit("update:is-full-page", false);
            this.container.appendChild(this.$el);
          }
          this.isActive = true;
        }
      },
      beforeUnmount() {
        if (typeof window !== "undefined") {
          document.removeEventListener("keyup", this.keyPress);
        }
      }
    });

    var _export_sfc = (sfc, props) => {
      const target = sfc.__vccOpts || sfc;
      for (const [key, val] of props) {
        target[key] = val;
      }
      return target;
    };

    const _hoisted_1 = /* @__PURE__ */ vue.createElementVNode(
      "div",
      { class: "loading-icon" },
      null,
      -1
      /* HOISTED */
    );
    function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
      return vue.openBlock(), vue.createBlock(vue.Transition, { name: _ctx.animation }, {
        default: vue.withCtx(() => [
          _ctx.isActive ? vue.withDirectives((vue.openBlock(), vue.createElementBlock(
            "div",
            {
              key: 0,
              class: vue.normalizeClass(["loading-overlay is-active", { "is-full-page": _ctx.displayInFullPage }])
            },
            [
              vue.createElementVNode("div", {
                class: "loading-background",
                onClick: _cache[0] || (_cache[0] = (...args) => _ctx.cancel && _ctx.cancel(...args))
              }),
              vue.renderSlot(_ctx.$slots, "default", {}, () => [
                _hoisted_1
              ])
            ],
            2
            /* CLASS */
          )), [
            [vue.vShow, _ctx.isActive]
          ]) : vue.createCommentVNode("v-if", true)
        ]),
        _: 3
        /* FORWARDED */
      }, 8, ["name"]);
    }
    var Loading = /* @__PURE__ */ _export_sfc(Loading$1, [["render", _sfc_render]]);

    const registerComponent = (Vue, component, name) => {
      const componentName = component.name;
      if (componentName == null) {
        throw new Error("Buefy.registerComponent: missing component name");
      }
      Vue.component(componentName, component);
    };
    const registerComponentProgrammatic = (Vue, property, component) => {
      if (!Vue.config.globalProperties.$buefy) Vue.config.globalProperties.$buefy = {};
      Vue.config.globalProperties.$buefy[property] = component;
    };

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
              const loading = getComponentFromVNode(this.loadingVNode);
              if (loading) {
                loading.close();
              }
            }
          },
          render() {
            this.loadingVNode = vue.h(
              Loading,
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
          copyAppContext(this.app, vueInstance);
        }
        return vueInstance.mount(container);
      }
    }
    const Plugin = {
      install(Vue) {
        registerComponent(Vue, Loading);
        registerComponentProgrammatic(Vue, "loading", new LoadingProgrammatic(Vue));
      }
    };

    exports.BLoading = Loading;
    exports.LoadingProgrammatic = LoadingProgrammatic;
    exports.default = Plugin;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
