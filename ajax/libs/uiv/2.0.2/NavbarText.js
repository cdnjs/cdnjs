import { openBlock as a, createElementBlock as r, normalizeClass as l, renderSlot as n } from "vue";
const c = {
  __name: "NavbarText",
  props: {
    left: Boolean,
    right: Boolean
  },
  setup(e) {
    return (t, o) => (a(), r("p", {
      class: l({
        "navbar-text": !0,
        "navbar-left": e.left,
        "navbar-right": e.right
      })
    }, [
      n(t.$slots, "default")
    ], 2));
  }
};
export {
  c as default
};
