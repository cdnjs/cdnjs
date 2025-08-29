/*! Buefy v3.0.2 | MIT License | github.com/buefy/buefy */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
    typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Modal = {}, global.Vue));
})(this, (function (exports, vue) { 'use strict';

    const findFocusable = (element, programmatic = false) => {
      if (!element) {
        return null;
      }
      if (programmatic) {
        return element.querySelectorAll('*[tabindex="-1"]');
      }
      return element.querySelectorAll(`a[href]:not([tabindex="-1"]),
                                     area[href],
                                     input:not([disabled]),
                                     select:not([disabled]),
                                     textarea:not([disabled]),
                                     button:not([disabled]),
                                     iframe,
                                     object,
                                     embed,
                                     *[tabindex]:not([tabindex="-1"]),
                                     *[contenteditable]`);
    };
    let onKeyDown;
    const beforeMount = (el, { value = true }) => {
      if (value) {
        let focusable = findFocusable(el);
        let focusableProg = findFocusable(el, true);
        if (focusable && focusable.length > 0) {
          onKeyDown = (event) => {
            focusable = findFocusable(el);
            focusableProg = findFocusable(el, true);
            const firstFocusable = focusable[0];
            const lastFocusable = focusable[focusable.length - 1];
            if (event.target === firstFocusable && event.shiftKey && event.key === "Tab") {
              event.preventDefault();
              lastFocusable.focus();
            } else if ((event.target === lastFocusable || Array.from(focusableProg).indexOf(event.target) >= 0) && !event.shiftKey && event.key === "Tab") {
              event.preventDefault();
              firstFocusable.focus();
            }
          };
          el.addEventListener("keydown", onKeyDown);
        }
      }
    };
    const unmounted = (el) => {
      el.removeEventListener("keydown", onKeyDown);
    };
    const directive = {
      beforeMount,
      unmounted
    };

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

    let config = {
      defaultModalCanCancel: ["escape", "x", "outside", "button"],
      defaultTrapFocus: true,
      defaultAutoFocus: true};

    const MODAL_SCROLLS = ["clip", "keep"];
    const MODAL_ARIA_ROLES = ["dialog", "alertdialog"];
    const Modal$1 = vue.defineComponent({
      name: "BModal",
      directives: {
        trapFocus: directive
      },
      props: {
        modelValue: Boolean,
        component: [Object, Function, String],
        content: {
          type: [String, Object, Array]
        },
        programmatic: Boolean,
        props: Object,
        events: {
          type: Object,
          default() {
            return {};
          }
        },
        width: {
          type: [String, Number],
          default: 960
        },
        hasModalCard: Boolean,
        animation: {
          type: String,
          default: "zoom-out"
        },
        canCancel: {
          type: [Array, Boolean],
          default: () => {
            return config.defaultModalCanCancel;
          }
        },
        cancelCallback: {
          type: Function,
          default: () => {
          }
        },
        scroll: {
          type: String,
          default: () => {
            return "clip";
          },
          validator: (value) => {
            return MODAL_SCROLLS.indexOf(value) >= 0;
          }
        },
        fullScreen: Boolean,
        trapFocus: {
          type: Boolean,
          default: () => {
            return config.defaultTrapFocus;
          }
        },
        autoFocus: {
          type: Boolean,
          default: () => {
            return config.defaultAutoFocus;
          }
        },
        customClass: String,
        customContentClass: [String, Array, Object],
        ariaRole: {
          type: String,
          validator: (value) => {
            return MODAL_ARIA_ROLES.indexOf(value) >= 0;
          }
        },
        ariaModal: Boolean,
        ariaLabel: {
          type: String,
          validator: (value) => {
            return Boolean(value);
          }
        },
        closeButtonAriaLabel: {
          type: String,
          default: "close"
        },
        destroyOnHide: {
          type: Boolean,
          default: true
        },
        renderOnMounted: {
          type: Boolean,
          default: false
        }
      },
      emits: {
        "after-enter": () => true,
        "after-leave": () => true,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        cancel: (method) => true,
        close: () => true,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        "update:modelValue": (active) => true
      },
      data() {
        return {
          isActive: this.modelValue || false,
          savedScrollTop: null,
          newWidth: typeof this.width === "number" ? this.width + "px" : this.width,
          animating: !this.modelValue,
          destroyed: !(this.modelValue || this.renderOnMounted)
        };
      },
      computed: {
        cancelOptions() {
          return typeof this.canCancel === "boolean" ? this.canCancel ? config.defaultModalCanCancel : [] : this.canCancel;
        },
        showX() {
          return this.cancelOptions.indexOf("x") >= 0;
        },
        customStyle() {
          if (!this.fullScreen) {
            return { maxWidth: this.newWidth };
          }
          return null;
        }
      },
      watch: {
        modelValue(value) {
          this.isActive = value;
        },
        isActive(value) {
          if (value) this.destroyed = false;
          this.handleScroll();
          this.$nextTick(() => {
            if (value && this.$el && this.$el.focus && this.autoFocus) {
              this.$el.focus();
            }
          });
        }
      },
      methods: {
        handleScroll() {
          if (typeof window === "undefined") return;
          if (this.scroll === "clip") {
            if (this.isActive) {
              document.documentElement.classList.add("is-clipped");
            } else {
              document.documentElement.classList.remove("is-clipped");
            }
            return;
          }
          this.savedScrollTop = !this.savedScrollTop ? document.documentElement.scrollTop : this.savedScrollTop;
          if (this.isActive) {
            document.body.classList.add("is-noscroll");
          } else {
            document.body.classList.remove("is-noscroll");
          }
          if (this.isActive) {
            document.body.style.top = `-${this.savedScrollTop}px`;
            return;
          }
          document.documentElement.scrollTop = this.savedScrollTop;
          document.body.style.top = "";
          this.savedScrollTop = null;
        },
        /*
        * Close the Modal if canCancel and call the cancelCallback prop (function).
        */
        cancel(method) {
          if (this.cancelOptions.indexOf(method) < 0) return;
          this.$emit("cancel", method);
          this.cancelCallback.apply(null, [method]);
          this.close();
        },
        /*
        * Call the cancelCallback prop (function).
        * Emit events, and destroy modal if it's programmatic.
        */
        close() {
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
          if (this.isActive && (key === "Escape" || key === "Esc")) this.cancel("escape");
        },
        /*
        * Transition after-enter hook
        */
        afterEnter() {
          this.animating = false;
          this.$emit("after-enter");
        },
        /*
        * Transition before-leave hook
        */
        beforeLeave() {
          this.animating = true;
        },
        /*
        * Transition after-leave hook
        */
        afterLeave() {
          if (this.destroyOnHide) {
            this.destroyed = true;
          }
          this.$emit("after-leave");
        }
      },
      created() {
        if (typeof window !== "undefined") {
          document.addEventListener("keyup", this.keyPress);
        }
      },
      mounted() {
        if (this.programmatic) {
          document.body.appendChild(this.$el);
          this.isActive = true;
        } else if (this.isActive) this.handleScroll();
      },
      beforeUnmount() {
        if (typeof window !== "undefined") {
          document.removeEventListener("keyup", this.keyPress);
          document.documentElement.classList.remove("is-clipped");
          const savedScrollTop = !this.savedScrollTop ? document.documentElement.scrollTop : this.savedScrollTop;
          document.body.classList.remove("is-noscroll");
          document.documentElement.scrollTop = savedScrollTop;
          document.body.style.top = "";
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

    const _hoisted_1 = ["role", "aria-label", "aria-modal"];
    const _hoisted_2 = ["innerHTML"];
    const _hoisted_3 = ["aria-label"];
    function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
      const _directive_trap_focus = vue.resolveDirective("trap-focus");
      return vue.openBlock(), vue.createBlock(vue.Transition, {
        name: _ctx.animation,
        onAfterEnter: _ctx.afterEnter,
        onBeforeLeave: _ctx.beforeLeave,
        onAfterLeave: _ctx.afterLeave
      }, {
        default: vue.withCtx(() => [
          !_ctx.destroyed ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", {
            key: 0,
            class: vue.normalizeClass(["modal is-active", [{ "is-full-screen": _ctx.fullScreen }, _ctx.customClass]]),
            tabindex: "-1",
            role: _ctx.ariaRole,
            "aria-label": _ctx.ariaLabel,
            "aria-modal": _ctx.ariaModal || void 0
          }, [
            vue.createElementVNode("div", {
              class: "modal-background",
              onClick: _cache[0] || (_cache[0] = ($event) => _ctx.cancel("outside"))
            }),
            vue.createElementVNode(
              "div",
              {
                class: vue.normalizeClass(["animation-content", [{ "modal-content": !_ctx.hasModalCard }, _ctx.customContentClass]]),
                style: vue.normalizeStyle(_ctx.customStyle)
              },
              [
                _ctx.component ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.component), vue.mergeProps({ key: 0 }, _ctx.props, vue.toHandlers(_ctx.events), {
                  "can-cancel": _ctx.canCancel,
                  onClose: _ctx.close
                }), null, 16, ["can-cancel", "onClose"])) : _ctx.content ? (vue.openBlock(), vue.createElementBlock(
                  vue.Fragment,
                  { key: 1 },
                  [
                    vue.createCommentVNode(" eslint-disable-next-line vue/no-v-html "),
                    vue.createElementVNode("div", { innerHTML: _ctx.content }, null, 8, _hoisted_2)
                  ],
                  64
                  /* STABLE_FRAGMENT */
                )) : vue.renderSlot(_ctx.$slots, "default", {
                  key: 2,
                  canCancel: _ctx.canCancel,
                  close: _ctx.close
                })
              ],
              6
              /* CLASS, STYLE */
            ),
            _ctx.showX ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("button", {
              key: 0,
              class: "modal-close is-large",
              "aria-label": _ctx.closeButtonAriaLabel,
              onClick: _cache[1] || (_cache[1] = ($event) => _ctx.cancel("x"))
            }, null, 8, _hoisted_3)), [
              [vue.vShow, !_ctx.animating]
            ]) : vue.createCommentVNode("v-if", true)
          ], 10, _hoisted_1)), [
            [vue.vShow, _ctx.isActive],
            [_directive_trap_focus, _ctx.trapFocus]
          ]) : vue.createCommentVNode("v-if", true)
        ]),
        _: 3
        /* FORWARDED */
      }, 8, ["name", "onAfterEnter", "onBeforeLeave", "onAfterLeave"]);
    }
    var Modal = /* @__PURE__ */ _export_sfc(Modal$1, [["render", _sfc_render]]);

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
              const modal = getComponentFromVNode(this.modalVNode);
              if (modal) {
                modal.close();
              }
            }
          },
          render() {
            this.modalVNode = vue.h(
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

    exports.BModal = Modal;
    exports.ModalProgrammatic = ModalProgrammatic;
    exports.default = Plugin;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
