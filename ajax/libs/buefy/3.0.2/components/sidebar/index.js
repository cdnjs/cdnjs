/*! Buefy v3.0.2 | MIT License | github.com/buefy/buefy */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
    typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Sidebar = {}, global.Vue));
})(this, (function (exports, vue) { 'use strict';

    let config = {
      defaultSidebarDelay: null};

    function removeElement(el) {
      if (typeof el.remove !== "undefined") {
        el.remove();
      } else if (typeof el.parentNode !== "undefined" && el.parentNode !== null) {
        el.parentNode.removeChild(el);
      }
    }

    const SIDEBAR_POSITIONS = ["fixed", "absolute", "static"];
    const SCROLL_BEHAVIORS = ["clip", "keep"];
    var _sfc_main = vue.defineComponent({
      name: "BSidebar",
      props: {
        modelValue: Boolean,
        type: [String, Object],
        overlay: Boolean,
        position: {
          type: String,
          default: "fixed",
          validator: (value) => {
            return SIDEBAR_POSITIONS.indexOf(value) >= 0;
          }
        },
        fullheight: Boolean,
        fullwidth: Boolean,
        right: Boolean,
        mobile: {
          type: String
        },
        reduce: Boolean,
        expandOnHover: Boolean,
        expandOnHoverFixed: Boolean,
        delay: {
          type: [Number, null],
          default: () => config.defaultSidebarDelay
        },
        canCancel: {
          type: [Array, Boolean],
          default: () => ["escape", "outside"]
        },
        onCancel: {
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
            return SCROLL_BEHAVIORS.indexOf(value) >= 0;
          }
        }
      },
      emits: {
        close: () => true,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        "update:modelValue": (_value) => true
      },
      data() {
        return {
          isOpen: this.modelValue,
          isDelayOver: false,
          transitionName: void 0,
          animating: true,
          savedScrollTop: null,
          hasLeaved: false,
          timer: void 0
        };
      },
      computed: {
        rootClasses() {
          return [this.type, {
            "is-fixed": this.isFixed,
            "is-static": this.isStatic,
            "is-absolute": this.isAbsolute,
            "is-fullheight": this.fullheight,
            "is-fullwidth": this.fullwidth,
            "is-right": this.right,
            "is-mini": this.reduce && !this.isDelayOver,
            "is-mini-expand": this.expandOnHover || this.isDelayOver,
            "is-mini-expand-fixed": this.expandOnHover && this.expandOnHoverFixed || this.isDelayOver,
            "is-mini-delayed": this.delay !== null,
            "is-mini-mobile": this.mobile === "reduce",
            "is-hidden-mobile": this.mobile === "hide",
            "is-fullwidth-mobile": this.mobile === "fullwidth"
          }];
        },
        cancelOptions() {
          return typeof this.canCancel === "boolean" ? this.canCancel ? ["escape", "outside"] : [] : this.canCancel;
        },
        isStatic() {
          return this.position === "static";
        },
        isFixed() {
          return this.position === "fixed";
        },
        isAbsolute() {
          return this.position === "absolute";
        }
      },
      watch: {
        modelValue: {
          handler(value) {
            this.isOpen = value;
            if (this.overlay) {
              this.handleScroll();
            }
            const open = this.right ? !value : value;
            this.transitionName = !open ? "slide-prev" : "slide-next";
          },
          immediate: true
        }
      },
      methods: {
        /*
        * Keypress event that is bound to the document.
        */
        keyPress({ key }) {
          if (this.isFixed) {
            if (this.isOpen && (key === "Escape" || key === "Esc")) this.cancel("escape");
          }
        },
        /*
        * Close the Sidebar if canCancel and call the onCancel prop (function).
        */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        cancel(method, ...args) {
          if (this.cancelOptions.indexOf(method) < 0) return;
          if (this.isStatic) return;
          this.onCancel.call(null, method, ...args);
          this.close();
        },
        /*
        * Call the onCancel prop (function) and emit events
        */
        close() {
          this.isOpen = false;
          this.$emit("close");
          this.$emit("update:modelValue", false);
        },
        /*
         * Close fixed sidebar if clicked outside.
         */
        clickedOutside(event) {
          if (!this.isFixed || !this.isOpen || this.animating) {
            return;
          }
          if (!event.composedPath().includes(this.$refs.sidebarContent)) {
            this.cancel("outside");
          }
        },
        /*
        * Transition before-enter hook
        */
        beforeEnter() {
          this.animating = true;
        },
        /*
        * Transition after-leave hook
        */
        afterEnter() {
          this.animating = false;
        },
        handleScroll() {
          if (typeof window === "undefined") return;
          if (this.scroll === "clip") {
            if (this.modelValue) {
              document.documentElement.classList.add("is-clipped");
            } else {
              document.documentElement.classList.remove("is-clipped");
            }
            return;
          }
          this.savedScrollTop = !this.savedScrollTop ? document.documentElement.scrollTop : this.savedScrollTop;
          if (this.modelValue) {
            document.body.classList.add("is-noscroll");
          } else {
            document.body.classList.remove("is-noscroll");
          }
          if (this.modelValue) {
            document.body.style.top = `-${this.savedScrollTop}px`;
            return;
          }
          document.documentElement.scrollTop = this.savedScrollTop;
          document.body.style.top = "";
          this.savedScrollTop = null;
        },
        onHover() {
          if (this.delay) {
            this.hasLeaved = false;
            this.timer = setTimeout(() => {
              if (!this.hasLeaved) {
                this.isDelayOver = true;
              }
              this.timer = void 0;
            }, this.delay);
          } else {
            this.isDelayOver = false;
          }
        },
        onHoverLeave() {
          this.hasLeaved = true;
          this.timer = void 0;
          this.isDelayOver = false;
        },
        /*
         * Close sidebar if close button is clicked.
         */
        clickedCloseButton() {
          if (this.isFixed) {
            if (this.isOpen && this.fullwidth) {
              this.cancel("outside");
            }
          }
        }
      },
      created() {
        if (typeof window !== "undefined") {
          document.addEventListener("keyup", this.keyPress);
          document.addEventListener("click", this.clickedOutside);
        }
      },
      mounted() {
        if (typeof window !== "undefined") {
          if (this.isFixed) {
            document.body.appendChild(this.$el);
          }
        }
        if (this.overlay && this.modelValue) {
          this.handleScroll();
        }
      },
      beforeUnmount() {
        if (typeof window !== "undefined") {
          document.removeEventListener("keyup", this.keyPress);
          document.removeEventListener("click", this.clickedOutside);
          if (this.overlay) {
            document.documentElement.classList.remove("is-clipped");
            const savedScrollTop = !this.savedScrollTop ? document.documentElement.scrollTop : this.savedScrollTop;
            document.body.classList.remove("is-noscroll");
            document.documentElement.scrollTop = savedScrollTop;
            document.body.style.top = "";
          }
        }
        if (this.isFixed) {
          removeElement(this.$el);
        }
        clearTimeout(this.timer);
      }
    });

    var _export_sfc = (sfc, props) => {
      const target = sfc.__vccOpts || sfc;
      for (const [key, val] of props) {
        target[key] = val;
      }
      return target;
    };

    const _hoisted_1 = { class: "b-sidebar" };
    const _hoisted_2 = {
      key: 0,
      class: "sidebar-background"
    };
    function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
      return vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [
        _ctx.overlay && _ctx.isOpen ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_2)) : vue.createCommentVNode("v-if", true),
        vue.createVNode(vue.Transition, {
          name: _ctx.transitionName,
          onBeforeEnter: _ctx.beforeEnter,
          onAfterEnter: _ctx.afterEnter,
          persisted: ""
        }, {
          default: vue.withCtx(() => [
            vue.withDirectives(vue.createElementVNode(
              "div",
              {
                ref: "sidebarContent",
                class: vue.normalizeClass(["sidebar-content navbar", _ctx.rootClasses]),
                onMouseenter: _cache[1] || (_cache[1] = (...args) => _ctx.onHover && _ctx.onHover(...args)),
                onMouseleave: _cache[2] || (_cache[2] = (...args) => _ctx.onHoverLeave && _ctx.onHoverLeave(...args))
              },
              [
                _ctx.fullwidth ? (vue.openBlock(), vue.createElementBlock("button", {
                  key: 0,
                  type: "button",
                  onClick: _cache[0] || (_cache[0] = (...args) => _ctx.clickedCloseButton && _ctx.clickedCloseButton(...args)),
                  class: "modal-close is-large sidebar-close",
                  "aria-label": "Close"
                })) : vue.createCommentVNode("v-if", true),
                vue.renderSlot(_ctx.$slots, "default")
              ],
              34
              /* CLASS, NEED_HYDRATION */
            ), [
              [vue.vShow, _ctx.isOpen]
            ])
          ]),
          _: 3
          /* FORWARDED */
        }, 8, ["name", "onBeforeEnter", "onAfterEnter"])
      ]);
    }
    var Sidebar = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);

    const registerComponent = (Vue, component, name) => {
      const componentName = component.name;
      if (componentName == null) {
        throw new Error("Buefy.registerComponent: missing component name");
      }
      Vue.component(componentName, component);
    };

    const Plugin = {
      install(Vue) {
        registerComponent(Vue, Sidebar);
      }
    };

    exports.BSidebar = Sidebar;
    exports.default = Plugin;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
