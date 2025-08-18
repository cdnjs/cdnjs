import { defineComponent, createElementBlock, openBlock, createCommentVNode, createVNode, Transition, withCtx, withDirectives, createElementVNode, normalizeClass, renderSlot, vShow } from 'vue';
import { c as config } from './config-CKuo-p6e.js';
import { removeElement } from './helpers.js';
import { _ as _export_sfc } from './_plugin-vue_export-helper-OJRSZE6i.js';
import { a as registerComponent } from './plugins-B172kuKE.js';

const SIDEBAR_POSITIONS = ["fixed", "absolute", "static"];
const SCROLL_BEHAVIORS = ["clip", "keep"];
var _sfc_main = defineComponent({
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
        return config.defaultModalScroll ? config.defaultModalScroll : "clip";
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

const _hoisted_1 = { class: "b-sidebar" };
const _hoisted_2 = {
  key: 0,
  class: "sidebar-background"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1, [
    _ctx.overlay && _ctx.isOpen ? (openBlock(), createElementBlock("div", _hoisted_2)) : createCommentVNode("v-if", true),
    createVNode(Transition, {
      name: _ctx.transitionName,
      onBeforeEnter: _ctx.beforeEnter,
      onAfterEnter: _ctx.afterEnter,
      persisted: ""
    }, {
      default: withCtx(() => [
        withDirectives(createElementVNode(
          "div",
          {
            ref: "sidebarContent",
            class: normalizeClass(["sidebar-content navbar", _ctx.rootClasses]),
            onMouseenter: _cache[1] || (_cache[1] = (...args) => _ctx.onHover && _ctx.onHover(...args)),
            onMouseleave: _cache[2] || (_cache[2] = (...args) => _ctx.onHoverLeave && _ctx.onHoverLeave(...args))
          },
          [
            _ctx.fullwidth ? (openBlock(), createElementBlock("button", {
              key: 0,
              type: "button",
              onClick: _cache[0] || (_cache[0] = (...args) => _ctx.clickedCloseButton && _ctx.clickedCloseButton(...args)),
              class: "modal-close is-large sidebar-close",
              "aria-label": "Close"
            })) : createCommentVNode("v-if", true),
            renderSlot(_ctx.$slots, "default")
          ],
          34
          /* CLASS, NEED_HYDRATION */
        ), [
          [vShow, _ctx.isOpen]
        ])
      ]),
      _: 3
      /* FORWARDED */
    }, 8, ["name", "onBeforeEnter", "onAfterEnter"])
  ]);
}
var Sidebar = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);

const Plugin = {
  install(Vue) {
    registerComponent(Vue, Sidebar);
  }
};

export { Sidebar as BSidebar, Plugin as default };
