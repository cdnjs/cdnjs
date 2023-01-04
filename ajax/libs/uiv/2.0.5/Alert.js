import { computed as d, onMounted as u, onUnmounted as m, openBlock as l, createElementBlock as i, normalizeClass as c, unref as p, createCommentVNode as f, renderSlot as b, createElementVNode as y } from "vue";
const _ = /* @__PURE__ */ y("span", { "aria-hidden": "true" }, "×", -1), C = [
  _
], B = {
  __name: "Alert",
  props: {
    dismissible: { type: Boolean, default: !1 },
    duration: { type: Number, default: 0 },
    type: { type: String, default: "info" }
  },
  emits: ["dismissed"],
  setup(s, { emit: a }) {
    const e = s;
    let t = 0;
    const r = d(() => ({
      alert: !0,
      [`alert-${e.type}`]: !!e.type,
      "alert-dismissible": e.dismissible
    }));
    function o() {
      clearTimeout(t), a("dismissed");
    }
    return u(() => {
      e.duration > 0 && (t = setTimeout(o, e.duration));
    }), m(() => {
      clearTimeout(t);
    }), (n, h) => (l(), i("div", {
      role: "alert",
      class: c(p(r))
    }, [
      s.dismissible ? (l(), i("button", {
        key: 0,
        type: "button",
        class: "close",
        "aria-label": "Close",
        onClick: o
      }, C)) : f("", !0),
      b(n.$slots, "default")
    ], 2));
  }
};
export {
  B as default
};
