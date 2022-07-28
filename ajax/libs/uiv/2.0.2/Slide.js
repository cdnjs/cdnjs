import { getCurrentInstance as i, reactive as r, onBeforeMount as c, onBeforeUnmount as f, openBlock as p, createElementBlock as d, normalizeClass as u, renderSlot as m } from "vue";
function x(n, l) {
  if (Array.isArray(n)) {
    const e = n.indexOf(l);
    e >= 0 && n.splice(e, 1);
  }
}
const v = {
  __name: "Slide",
  setup(n, { expose: l }) {
    const e = i(), o = r({
      active: !1,
      prev: !1,
      next: !1,
      left: !1,
      right: !1
    });
    return c(() => {
      var s, t, a;
      (a = (t = (s = e.parent) == null ? void 0 : s.exposed) == null ? void 0 : t.slides) == null || a.push(e);
    }), f(() => {
      var s, t;
      x((t = (s = e.parent) == null ? void 0 : s.exposed) == null ? void 0 : t.slides, e);
    }), l({
      slideClass: o
    }), (s, t) => (p(), d("div", {
      class: u(["item", o])
    }, [
      m(s.$slots, "default")
    ], 2));
  }
};
export {
  v as default
};
