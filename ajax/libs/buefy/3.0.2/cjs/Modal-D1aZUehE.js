'use strict';

var vue = require('vue');
var trapFocus = require('./trapFocus-BlX6xykt.js');
var helpers = require('./helpers.js');
var config = require('./config-DR826Ki2.js');
var _pluginVue_exportHelper = require('./_plugin-vue_export-helper-Die8u8yB.js');

const MODAL_SCROLLS = ["clip", "keep"];
const MODAL_ARIA_ROLES = ["dialog", "alertdialog"];
const Modal$1 = vue.defineComponent({
  name: "BModal",
  directives: {
    trapFocus: trapFocus.directive
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
        return config.config.defaultModalCanCancel;
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
        return config.config.defaultModalScroll ? config.config.defaultModalScroll : "clip";
      },
      validator: (value) => {
        return MODAL_SCROLLS.indexOf(value) >= 0;
      }
    },
    fullScreen: Boolean,
    trapFocus: {
      type: Boolean,
      default: () => {
        return config.config.defaultTrapFocus;
      }
    },
    autoFocus: {
      type: Boolean,
      default: () => {
        return config.config.defaultAutoFocus;
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
      return typeof this.canCancel === "boolean" ? this.canCancel ? config.config.defaultModalCanCancel : [] : this.canCancel;
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
          helpers.removeElement(this.$el);
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
var Modal = /* @__PURE__ */ _pluginVue_exportHelper._export_sfc(Modal$1, [["render", _sfc_render]]);

exports.Modal = Modal;
