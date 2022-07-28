import { defineComponent as m, ref as y, watch as w, onMounted as C, h as L } from "vue";
function c(t) {
  return t && t.nodeType === Node.ELEMENT_NODE;
}
function i(t, n) {
  !c(t) || t.classList.add(n);
}
function s(t, n) {
  !c(t) || t.classList.remove(n);
}
const N = m({
  props: {
    tag: { type: String, default: "div" },
    modelValue: { type: Boolean, default: !1 },
    transition: { type: Number, default: 350 }
  },
  emits: ["show", "shown", "hide", "hidden"],
  setup(t, { emit: n, slots: a }) {
    const l = "collapse", d = "in", u = "collapsing";
    let o = 0;
    const f = y(null);
    function g() {
      const h = t.modelValue, e = f.value;
      if (clearTimeout(o), !!e)
        if (h) {
          n("show"), s(e, l), e.style.height = "auto";
          const r = window.getComputedStyle(e).height;
          e.style.height = null, i(e, u), e.offsetHeight, e.style.height = r, o = setTimeout(() => {
            s(e, u), i(e, l), i(e, d), e.style.height = null, o = 0, n("shown");
          }, t.transition);
        } else
          n("hide"), e.style.height = window.getComputedStyle(e).height, s(e, d), s(e, l), e.offsetHeight, e.style.height = null, i(e, u), o = setTimeout(() => {
            i(e, l), s(e, u), e.style.height = null, o = 0, n("hidden");
          }, t.transition);
    }
    return w(
      () => t.modelValue,
      () => {
        g();
      }
    ), C(() => {
      t.modelValue && i(f.value, d);
    }), () => {
      var h;
      return L(t.tag, { ref: f, class: l }, (h = a.default) == null ? void 0 : h.call(a));
    };
  }
});
export {
  N as default
};
