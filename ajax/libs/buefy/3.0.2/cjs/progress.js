'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Progress = require('./Progress-DT9Qc8Id.js');
var vue = require('vue');
var _pluginVue_exportHelper = require('./_plugin-vue_export-helper-Die8u8yB.js');
var plugins = require('./plugins-DbyYGVpp.js');
require('./config-DR826Ki2.js');

const ProgressBar$1 = vue.defineComponent({
  name: "BProgressBar",
  inject: {
    parent: {
      from: Progress.PROGRESS_INJECTION_KEY,
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
var ProgressBar = /* @__PURE__ */ _pluginVue_exportHelper._export_sfc(ProgressBar$1, [["render", _sfc_render]]);

const Plugin = {
  install(Vue) {
    plugins.registerComponent(Vue, Progress.Progress);
    plugins.registerComponent(Vue, ProgressBar);
  }
};

exports.BProgress = Progress.Progress;
exports.BProgressBar = ProgressBar;
exports.default = Plugin;
