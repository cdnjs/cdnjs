import { defineComponent as _, ref as p, watch as g, onMounted as b, h as w, computed as B, openBlock as C, createElementBlock as T, normalizeClass as v, unref as N, createElementVNode as s, renderSlot as h, createVNode as E, withCtx as L } from "vue";
function y(t) {
  return t && t.nodeType === Node.ELEMENT_NODE;
}
function d(t, n) {
  !y(t) || t.classList.add(n);
}
function r(t, n) {
  !y(t) || t.classList.remove(n);
}
const S = _({
  props: {
    tag: { type: String, default: "div" },
    modelValue: { type: Boolean, default: !1 },
    transition: { type: Number, default: 350 }
  },
  emits: ["show", "shown", "hide", "hidden"],
  setup(t, { emit: n, slots: a }) {
    const o = "collapse", c = "in", i = "collapsing";
    let l = 0;
    const u = p(null);
    function m() {
      const f = t.modelValue, e = u.value;
      if (clearTimeout(l), !!e)
        if (f) {
          n("show"), r(e, o), e.style.height = "auto";
          const V = window.getComputedStyle(e).height;
          e.style.height = null, d(e, i), e.offsetHeight, e.style.height = V, l = setTimeout(() => {
            r(e, i), d(e, o), d(e, c), e.style.height = null, l = 0, n("shown");
          }, t.transition);
        } else
          n("hide"), e.style.height = window.getComputedStyle(e).height, r(e, c), r(e, o), e.offsetHeight, e.style.height = null, d(e, i), l = setTimeout(() => {
            d(e, o), r(e, i), e.style.height = null, l = 0, n("hidden");
          }, t.transition);
    }
    return g(
      () => t.modelValue,
      () => {
        m();
      }
    ), b(() => {
      t.modelValue && d(u.value, c);
    }), () => {
      var f;
      return w(t.tag, { ref: u, class: o }, (f = a.default) == null ? void 0 : f.call(a));
    };
  }
}), x = { class: "navbar-header" }, $ = /* @__PURE__ */ s("span", { class: "sr-only" }, "Toggle navigation", -1), k = /* @__PURE__ */ s("span", { class: "icon-bar" }, null, -1), I = /* @__PURE__ */ s("span", { class: "icon-bar" }, null, -1), O = /* @__PURE__ */ s("span", { class: "icon-bar" }, null, -1), A = [
  $,
  k,
  I,
  O
], M = {
  __name: "Navbar",
  props: {
    modelValue: Boolean,
    fluid: { type: Boolean, default: !0 },
    fixedTop: Boolean,
    fixedBottom: Boolean,
    staticTop: Boolean,
    inverse: Boolean
  },
  emits: ["update:modalValue"],
  setup(t, { emit: n }) {
    const a = t, o = p(!1), c = B(() => ({
      navbar: !0,
      "navbar-default": !a.inverse,
      "navbar-inverse": a.inverse,
      "navbar-static-top": a.staticTop,
      "navbar-fixed-bottom": a.fixedBottom,
      "navbar-fixed-top": a.fixedTop
    }));
    g(
      () => a.modelValue,
      (l) => {
        o.value = l;
      }
    ), b(() => {
      o.value = !!a.modelValue;
    });
    function i() {
      o.value = !o.value, n("update:modalValue", o.value);
    }
    return (l, u) => (C(), T("nav", {
      class: v(N(c))
    }, [
      s("div", {
        class: v(t.fluid ? "container-fluid" : "container")
      }, [
        s("div", x, [
          h(l.$slots, "collapse-btn", {}, () => [
            s("button", {
              type: "button",
              class: "navbar-toggle collapsed",
              onClick: i
            }, A)
          ]),
          h(l.$slots, "brand")
        ]),
        h(l.$slots, "default"),
        E(S, {
          modelValue: o.value,
          "onUpdate:modelValue": u[0] || (u[0] = (m) => o.value = m),
          class: "navbar-collapse"
        }, {
          default: L(() => [
            h(l.$slots, "collapse")
          ]),
          _: 3
        }, 8, ["modelValue"])
      ], 2)
    ], 2));
  }
};
export {
  M as default
};
