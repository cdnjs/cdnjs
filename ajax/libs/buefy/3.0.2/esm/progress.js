import { a as PROGRESS_INJECTION_KEY, P as Progress } from './Progress-BPGTVZgr.js';
import { defineComponent, createElementBlock, openBlock, normalizeStyle, normalizeClass, createCommentVNode, renderSlot, createTextVNode, toDisplayString } from 'vue';
import { _ as _export_sfc } from './_plugin-vue_export-helper-OJRSZE6i.js';
import { a as registerComponent } from './plugins-B172kuKE.js';
import './config-CKuo-p6e.js';

const ProgressBar$1 = defineComponent({
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
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["progress-bar", _ctx.newType]),
    role: "progressbar",
    "aria-valuenow": _ctx.value,
    "aria-valuemax": _ctx.parentProgress.max,
    "aria-valuemin": "0",
    style: normalizeStyle({ width: _ctx.barWidth })
  }, [
    _ctx.newShowValue ? (openBlock(), createElementBlock("p", _hoisted_2, [
      renderSlot(_ctx.$slots, "default", {}, () => [
        createTextVNode(
          toDisplayString(_ctx.newValue),
          1
          /* TEXT */
        )
      ])
    ])) : createCommentVNode("v-if", true)
  ], 14, _hoisted_1);
}
var ProgressBar = /* @__PURE__ */ _export_sfc(ProgressBar$1, [["render", _sfc_render]]);

const Plugin = {
  install(Vue) {
    registerComponent(Vue, Progress);
    registerComponent(Vue, ProgressBar);
  }
};

export { Progress as BProgress, ProgressBar as BProgressBar, Plugin as default };
