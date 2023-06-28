import { openBlock as r, createElementBlock as t, normalizeClass as l, renderSlot as n } from "vue";
const c = {
  __name: "NavbarNav",
  props: {
    left: Boolean,
    right: Boolean
  },
  setup(a) {
    return (e, o) => (r(), t("ul", {
      class: l({
        nav: !0,
        "navbar-nav": !0,
        "navbar-left": a.left,
        "navbar-right": a.right
      })
    }, [
      n(e.$slots, "default")
    ], 2));
  }
};
export {
  c as default
};
