'use strict';

var vue = require('vue');
var config = require('./config-DR826Ki2.js');
var _pluginVue_exportHelper = require('./_plugin-vue_export-helper-Die8u8yB.js');

const PROGRESS_INJECTION_KEY = Symbol("bprogress");
const Progress$1 = vue.defineComponent({
  name: "BProgress",
  provide() {
    return {
      [PROGRESS_INJECTION_KEY]: this
    };
  },
  props: {
    type: {
      type: [String, Object],
      default: "is-darkgrey"
    },
    size: {
      type: String
    },
    rounded: {
      type: Boolean,
      default: true
    },
    value: {
      type: Number,
      default: void 0
    },
    max: {
      type: Number,
      default: 100
    },
    showValue: {
      type: Boolean,
      default: false
    },
    format: {
      type: String,
      default: "raw",
      validator: (value) => {
        return [
          "raw",
          "percent"
        ].indexOf(value) >= 0;
      }
    },
    precision: {
      type: Number,
      default: 2
    },
    keepTrailingZeroes: {
      type: Boolean,
      default: false
    },
    locale: {
      type: [String, Array],
      default: () => {
        return config.config.defaultLocale;
      },
      validator: (value) => {
        if (Array.isArray(value)) {
          return value.every((item) => typeof item === "string");
        }
        return typeof value === "string";
      }
    }
  },
  computed: {
    isIndeterminate() {
      return this.value === void 0 || this.value === null;
    },
    newType() {
      return [
        this.size,
        this.type,
        {
          "is-more-than-half": this.value && this.value > this.max / 2
        }
      ];
    },
    newValue() {
      return this.calculateValue(this.value);
    },
    isNative() {
      return this.$slots.bar === void 0;
    },
    wrapperClasses() {
      return {
        "is-not-native": !this.isNative,
        [this.size === void 0 ? "" : this.size]: typeof this.size === "string" && !this.isNative
      };
    }
  },
  watch: {
    /*
     * When value is changed back to undefined, value of native progress get reset to 0.
     * Need to add and remove the value attribute to have the indeterminate or not.
     */
    isIndeterminate(indeterminate) {
      this.$nextTick(() => {
        if (this.$refs.progress) {
          if (indeterminate) {
            this.$refs.progress.removeAttribute("value");
          } else {
            this.$refs.progress.setAttribute("value", this.value.toString());
          }
        }
      });
    }
  },
  methods: {
    calculateValue(value) {
      if (value === void 0 || value === null || isNaN(value)) {
        return void 0;
      }
      const minimumFractionDigits = this.keepTrailingZeroes ? this.precision : 0;
      const maximumFractionDigits = this.precision;
      if (this.format === "percent") {
        return new Intl.NumberFormat(
          this.locale,
          {
            style: "percent",
            minimumFractionDigits,
            maximumFractionDigits
          }
        ).format(value / this.max);
      }
      return new Intl.NumberFormat(
        this.locale,
        {
          minimumFractionDigits,
          maximumFractionDigits
        }
      ).format(value);
    }
  }
});

const _hoisted_1 = ["max", "value"];
const _hoisted_2 = {
  key: 2,
  class: "progress-value"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock(
    "div",
    {
      class: vue.normalizeClass(["progress-wrapper", [_ctx.wrapperClasses, { "is-squared": !_ctx.rounded }]])
    },
    [
      _ctx.isNative ? (vue.openBlock(), vue.createElementBlock("progress", {
        key: 0,
        ref: "progress",
        class: vue.normalizeClass(["progress", [_ctx.newType, { "is-squared": !_ctx.rounded }]]),
        max: _ctx.max,
        value: _ctx.value
      }, vue.toDisplayString(_ctx.newValue), 11, _hoisted_1)) : vue.renderSlot(_ctx.$slots, "bar", { key: 1 }),
      _ctx.isNative && _ctx.showValue ? (vue.openBlock(), vue.createElementBlock("p", _hoisted_2, [
        vue.renderSlot(_ctx.$slots, "default", {}, () => [
          vue.createTextVNode(
            vue.toDisplayString(_ctx.newValue),
            1
            /* TEXT */
          )
        ])
      ])) : vue.createCommentVNode("v-if", true)
    ],
    2
    /* CLASS */
  );
}
var Progress = /* @__PURE__ */ _pluginVue_exportHelper._export_sfc(Progress$1, [["render", _sfc_render]]);

exports.PROGRESS_INJECTION_KEY = PROGRESS_INJECTION_KEY;
exports.Progress = Progress;
