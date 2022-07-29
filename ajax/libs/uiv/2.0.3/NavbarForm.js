import { openBlock as a, createElementBlock as t, normalizeClass as o, renderSlot as l } from "vue";
const f = {
  __name: "NavbarForm",
  props: {
    left: Boolean,
    right: Boolean
  },
  setup(e) {
    return (r, n) => (a(), t("form", {
      class: o({
        "navbar-form": !0,
        "navbar-left": e.left,
        "navbar-right": e.right
      })
    }, [
      l(r.$slots, "default")
    ], 2));
  }
};
export {
  f as default
};
