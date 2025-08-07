import { defineComponent, resolveDirective, createBlock, openBlock, Transition, withCtx, withDirectives, createCommentVNode, createElementBlock, normalizeClass, createElementVNode, normalizeStyle, renderSlot, resolveDynamicComponent, mergeProps, toHandlers, Fragment, vShow } from 'vue';
import { d as directive } from './trapFocus-KHP_kCNE.js';
import { removeElement } from './helpers.js';
import { c as config } from './config-CKuo-p6e.js';
import { _ as _export_sfc } from './_plugin-vue_export-helper-OJRSZE6i.js';

const MODAL_SCROLLS = ["clip", "keep"];
const MODAL_ARIA_ROLES = ["dialog", "alertdialog"];
const Modal$1 = defineComponent({
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
        return config.defaultModalScroll ? config.defaultModalScroll : "clip";
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

const _hoisted_1 = ["role", "aria-label", "aria-modal"];
const _hoisted_2 = ["innerHTML"];
const _hoisted_3 = ["aria-label"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_trap_focus = resolveDirective("trap-focus");
  return openBlock(), createBlock(Transition, {
    name: _ctx.animation,
    onAfterEnter: _ctx.afterEnter,
    onBeforeLeave: _ctx.beforeLeave,
    onAfterLeave: _ctx.afterLeave
  }, {
    default: withCtx(() => [
      !_ctx.destroyed ? withDirectives((openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass(["modal is-active", [{ "is-full-screen": _ctx.fullScreen }, _ctx.customClass]]),
        tabindex: "-1",
        role: _ctx.ariaRole,
        "aria-label": _ctx.ariaLabel,
        "aria-modal": _ctx.ariaModal || void 0
      }, [
        createElementVNode("div", {
          class: "modal-background",
          onClick: _cache[0] || (_cache[0] = ($event) => _ctx.cancel("outside"))
        }),
        createElementVNode(
          "div",
          {
            class: normalizeClass(["animation-content", [{ "modal-content": !_ctx.hasModalCard }, _ctx.customContentClass]]),
            style: normalizeStyle(_ctx.customStyle)
          },
          [
            _ctx.component ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.component), mergeProps({ key: 0 }, _ctx.props, toHandlers(_ctx.events), {
              "can-cancel": _ctx.canCancel,
              onClose: _ctx.close
            }), null, 16, ["can-cancel", "onClose"])) : _ctx.content ? (openBlock(), createElementBlock(
              Fragment,
              { key: 1 },
              [
                createCommentVNode(" eslint-disable-next-line vue/no-v-html "),
                createElementVNode("div", { innerHTML: _ctx.content }, null, 8, _hoisted_2)
              ],
              64
              /* STABLE_FRAGMENT */
            )) : renderSlot(_ctx.$slots, "default", {
              key: 2,
              canCancel: _ctx.canCancel,
              close: _ctx.close
            })
          ],
          6
          /* CLASS, STYLE */
        ),
        _ctx.showX ? withDirectives((openBlock(), createElementBlock("button", {
          key: 0,
          class: "modal-close is-large",
          "aria-label": _ctx.closeButtonAriaLabel,
          onClick: _cache[1] || (_cache[1] = ($event) => _ctx.cancel("x"))
        }, null, 8, _hoisted_3)), [
          [vShow, !_ctx.animating]
        ]) : createCommentVNode("v-if", true)
      ], 10, _hoisted_1)), [
        [vShow, _ctx.isActive],
        [_directive_trap_focus, _ctx.trapFocus]
      ]) : createCommentVNode("v-if", true)
    ]),
    _: 3
    /* FORWARDED */
  }, 8, ["name", "onAfterEnter", "onBeforeLeave", "onAfterLeave"]);
}
var Modal = /* @__PURE__ */ _export_sfc(Modal$1, [["render", _sfc_render]]);

export { Modal as M };
