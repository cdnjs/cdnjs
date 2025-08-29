/*! Buefy v3.0.2 | MIT License | github.com/buefy/buefy */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
    typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Toast = {}, global.Vue));
})(this, (function (exports, vue) { 'use strict';

    const NOTICE_POSITIONS = [
      "is-top-right",
      "is-top",
      "is-top-left",
      "is-bottom-right",
      "is-bottom",
      "is-bottom-left"
    ];
    let config = {
      defaultContainerElement: null,
      defaultToastDuration: 2e3,
      defaultNoticeQueue: true};

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

    var NoticeMixin = vue.defineComponent({
      props: {
        type: {
          type: String,
          default: "is-dark"
        },
        message: [String, Array],
        duration: Number,
        queue: {
          type: Boolean,
          default: void 0
        },
        indefinite: {
          type: Boolean,
          default: false
        },
        pauseOnHover: {
          type: Boolean,
          default: false
        },
        position: {
          type: String,
          default: "is-top",
          validator(value) {
            return NOTICE_POSITIONS.indexOf(value) > -1;
          }
        },
        container: String
      },
      emits: {
        click: () => true,
        close: () => true
      },
      data() {
        return {
          isActive: false,
          isPaused: false,
          parentTop: null,
          parentBottom: null,
          newContainer: this.container || config.defaultContainerElement,
          timer: void 0,
          // host container should override `newDuration`
          newDuration: this.duration || 0
        };
      },
      computed: {
        correctParent() {
          switch (this.position) {
            case "is-top-right":
            case "is-top":
            case "is-top-left":
              return this.parentTop;
            case "is-bottom-right":
            case "is-bottom":
            case "is-bottom-left":
              return this.parentBottom;
            default: {
              const exhaustiveCheck = this.position;
              throw new RangeError(`invalid position: ${exhaustiveCheck}`);
            }
          }
        },
        transition() {
          switch (this.position) {
            case "is-top-right":
            case "is-top":
            case "is-top-left":
              return {
                enter: "fadeInDown",
                leave: "fadeOut"
              };
            case "is-bottom-right":
            case "is-bottom":
            case "is-bottom-left":
              return {
                enter: "fadeInUp",
                leave: "fadeOut"
              };
            default: {
              const exhaustiveCheck = this.position;
              throw new RangeError(`invalid position: ${exhaustiveCheck}`);
            }
          }
        }
      },
      methods: {
        pause() {
          if (this.pauseOnHover && !this.indefinite) {
            this.isPaused = true;
            clearInterval(this.$buefy.globalNoticeInterval);
          }
        },
        removePause() {
          if (this.pauseOnHover && !this.indefinite) {
            this.isPaused = false;
            this.close();
          }
        },
        shouldQueue() {
          const queue = this.queue !== void 0 ? this.queue : config.defaultNoticeQueue;
          if (!queue) return false;
          return this.parentTop.childElementCount > 0 || this.parentBottom.childElementCount > 0;
        },
        click() {
          this.$emit("click");
        },
        close() {
          if (!this.isPaused) {
            clearTimeout(this.timer);
            this.isActive = false;
            this.$emit("close");
            setTimeout(() => {
              removeElement(this.$el);
            }, 150);
          }
        },
        timeoutCallback() {
          return this.close();
        },
        showNotice() {
          if (this.shouldQueue()) this.correctParent.innerHTML = "";
          this.correctParent.insertAdjacentElement("afterbegin", this.$el);
          this.isActive = true;
          if (!this.indefinite) {
            this.timer = setTimeout(() => this.timeoutCallback(), this.newDuration);
          }
        },
        setupContainer() {
          this.parentTop = document.querySelector((this.newContainer ? this.newContainer : "body") + ">.notices.is-top");
          this.parentBottom = document.querySelector((this.newContainer ? this.newContainer : "body") + ">.notices.is-bottom");
          if (this.parentTop && this.parentBottom) return;
          if (!this.parentTop) {
            this.parentTop = document.createElement("div");
            this.parentTop.className = "notices is-top";
          }
          if (!this.parentBottom) {
            this.parentBottom = document.createElement("div");
            this.parentBottom.className = "notices is-bottom";
          }
          const container = document.querySelector(this.newContainer) || document.body;
          container.appendChild(this.parentTop);
          container.appendChild(this.parentBottom);
          if (this.newContainer) {
            this.parentTop.classList.add("has-custom-container");
            this.parentBottom.classList.add("has-custom-container");
          }
        }
      },
      beforeMount() {
        this.setupContainer();
      },
      mounted() {
        this.showNotice();
      }
    });

    const Toast$1 = vue.defineComponent({
      name: "BToast",
      mixins: [NoticeMixin],
      data() {
        return {
          newDuration: this.duration || config.defaultToastDuration
        };
      }
    });

    var _export_sfc = (sfc, props) => {
      const target = sfc.__vccOpts || sfc;
      for (const [key, val] of props) {
        target[key] = val;
      }
      return target;
    };

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
    var Toast = /* @__PURE__ */ _export_sfc(Toast$1, [["render", _sfc_render]]);

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
          position: "is-top",
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
              const toast = getComponentFromVNode(this.toastVNode);
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

    exports.BToast = Toast;
    exports.ToastProgrammatic = ToastProgrammatic;
    exports.default = Plugin;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
