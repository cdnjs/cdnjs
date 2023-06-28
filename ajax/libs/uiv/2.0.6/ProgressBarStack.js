import { openBlock as l, createElementBlock as r, normalizeClass as t, normalizeStyle as o, toDisplayString as s } from "vue";
const i = {
  modelValue: {
    type: Number,
    required: !0,
    validator(a) {
      return a >= 0 && a <= 100;
    }
  },
  labelText: { type: String, default: void 0 },
  type: { type: String, default: void 0 },
  label: { type: Boolean, default: !1 },
  minWidth: { type: Boolean, default: !1 },
  striped: { type: Boolean, default: !1 },
  active: { type: Boolean, default: !1 }
}, n = ["aria-valuenow"], u = {
  __name: "ProgressBarStack",
  props: {
    ...i
  },
  setup(a) {
    return (e, p) => (l(), r("div", {
      class: t({
        "progress-bar": !0,
        "progress-bar-striped": e.striped,
        active: e.striped && e.active,
        [`progress-bar-${e.type}`]: !!e.type
      }),
      style: o({
        minWidth: e.minWidth ? "2em" : null,
        width: `${e.modelValue}%`
      }),
      role: "progressbar",
      "aria-valuemin": "0",
      "aria-valuenow": e.modelValue,
      "aria-valuemax": "100"
    }, s(e.label ? e.labelText ? e.labelText : `${e.modelValue}%` : null), 15, n));
  }
};
export {
  u as default
};
