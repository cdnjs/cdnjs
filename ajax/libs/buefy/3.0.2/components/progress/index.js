/*! Buefy v3.0.2 | MIT License | github.com/buefy/buefy */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
    typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Progress = {}, global.Vue));
})(this, (function (exports, vue) { 'use strict';

    let config = {
      defaultLocale: void 0};

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
            return config.defaultLocale;
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

    var _export_sfc = (sfc, props) => {
      const target = sfc.__vccOpts || sfc;
      for (const [key, val] of props) {
        target[key] = val;
      }
      return target;
    };

    const _hoisted_1$1 = ["max", "value"];
    const _hoisted_2$1 = {
      key: 2,
      class: "progress-value"
    };
    function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
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
          }, vue.toDisplayString(_ctx.newValue), 11, _hoisted_1$1)) : vue.renderSlot(_ctx.$slots, "bar", { key: 1 }),
          _ctx.isNative && _ctx.showValue ? (vue.openBlock(), vue.createElementBlock("p", _hoisted_2$1, [
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
    var Progress = /* @__PURE__ */ _export_sfc(Progress$1, [["render", _sfc_render$1]]);

    const ProgressBar$1 = vue.defineComponent({
      name: "BProgressBar",
      inject: {
        parent: {
          from: PROGRESS_INJECTION_KEY,
          default: void 0
        }
      },
      props: {
        type: {
          type: [String],
          default: void 0
        },
        value: {
          type: Number,
          default: void 0
        },
        showValue: {
          type: Boolean,
          default: false
        }
      },
      computed: {
        parentProgress() {
          return this.parent;
        },
        newType() {
          return [
            this.parentProgress.size,
            this.type || this.parentProgress.type
          ];
        },
        newShowValue() {
          return this.showValue || this.parentProgress.showValue;
        },
        newValue() {
          return this.parentProgress.calculateValue(this.value);
        },
        barWidth() {
          return `${(this.value === void 0 ? 0 : this.value) * 100 / this.parentProgress.max}%`;
        }
      }
    });

    const _hoisted_1 = ["aria-valuenow", "aria-valuemax"];
    const _hoisted_2 = {
      key: 0,
      class: "progress-value"
    };
    function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
      return vue.openBlock(), vue.createElementBlock("div", {
        class: vue.normalizeClass(["progress-bar", _ctx.newType]),
        role: "progressbar",
        "aria-valuenow": _ctx.value,
        "aria-valuemax": _ctx.parentProgress.max,
        "aria-valuemin": "0",
        style: vue.normalizeStyle({ width: _ctx.barWidth })
      }, [
        _ctx.newShowValue ? (vue.openBlock(), vue.createElementBlock("p", _hoisted_2, [
          vue.renderSlot(_ctx.$slots, "default", {}, () => [
            vue.createTextVNode(
              vue.toDisplayString(_ctx.newValue),
              1
              /* TEXT */
            )
          ])
        ])) : vue.createCommentVNode("v-if", true)
      ], 14, _hoisted_1);
    }
    var ProgressBar = /* @__PURE__ */ _export_sfc(ProgressBar$1, [["render", _sfc_render]]);

    const registerComponent = (Vue, component, name) => {
      const componentName = component.name;
      if (componentName == null) {
        throw new Error("Buefy.registerComponent: missing component name");
      }
      Vue.component(componentName, component);
    };

    const Plugin = {
      install(Vue) {
        registerComponent(Vue, Progress);
        registerComponent(Vue, ProgressBar);
      }
    };

    exports.BProgress = Progress;
    exports.BProgressBar = ProgressBar;
    exports.default = Plugin;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
