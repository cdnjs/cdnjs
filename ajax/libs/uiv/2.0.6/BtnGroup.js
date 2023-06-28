import { openBlock as a, createElementBlock as l, normalizeClass as n, renderSlot as o } from "vue";
const u = {
  __name: "BtnGroup",
  props: {
    size: { type: String, default: void 0 },
    vertical: { type: Boolean, default: !1 },
    justified: { type: Boolean, default: !1 }
  },
  setup(e) {
    return (t, r) => (a(), l("div", {
      class: n({
        "btn-group": !e.vertical,
        "btn-group-vertical": e.vertical,
        "btn-group-justified": e.justified,
        [`btn-group-${e.size}`]: e.size
      }),
      role: "group",
      "data-toggle": "buttons"
    }, [
      o(t.$slots, "default")
    ], 2));
  }
};
export {
  u as default
};
