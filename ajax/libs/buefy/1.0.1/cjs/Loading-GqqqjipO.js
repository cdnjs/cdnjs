'use strict';

var vue = require('vue');
var helpers = require('./helpers.js');
var ssr = require('./ssr-DVRFTu_P.js');
var _pluginVue_exportHelper = require('./_plugin-vue_export-helper-Die8u8yB.js');

const Loading = vue.defineComponent({
  name: "BLoading",
  props: {
    modelValue: Boolean,
    programmatic: Boolean,
    container: [Object, Function, ssr.HTMLElement],
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
          helpers.removeElement(this.$el);
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
var BLoading = /* @__PURE__ */ _pluginVue_exportHelper._export_sfc(Loading, [["render", _sfc_render]]);

exports.BLoading = BLoading;
