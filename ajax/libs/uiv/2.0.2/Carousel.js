import { ref as A, reactive as R, watch as E, onMounted as T, onBeforeUnmount as z, openBlock as u, createElementBlock as c, renderSlot as N, unref as $, createElementVNode as r, Fragment as F, renderList as H, normalizeClass as C, createCommentVNode as g, withModifiers as b, nextTick as P } from "vue";
function I(s) {
  return typeof s < "u" && s !== null;
}
const U = { class: "carousel-indicators" }, _ = ["onClick"], q = {
  class: "carousel-inner",
  role: "listbox"
}, D = /* @__PURE__ */ r("span", { class: "sr-only" }, "Previous", -1), G = /* @__PURE__ */ r("span", { class: "sr-only" }, "Next", -1), K = {
  __name: "Carousel",
  props: {
    modelValue: { type: Number, default: void 0 },
    indicators: { type: Boolean, default: !0 },
    controls: { type: Boolean, default: !0 },
    interval: { type: Number, default: 5e3 },
    iconControlLeft: {
      type: String,
      default: "glyphicon glyphicon-chevron-left"
    },
    iconControlRight: {
      type: String,
      default: "glyphicon glyphicon-chevron-right"
    }
  },
  emits: ["update:modelValue", "change"],
  setup(s, { expose: M, emit: y }) {
    const a = s;
    let t = A(0), v = 0, p = 0;
    const l = R([]);
    function k(e, n) {
      const i = n || 0;
      let o;
      e > i ? o = ["next", "left"] : o = ["prev", "right"], l[e].exposed.slideClass[o[0]] = !0, P(() => {
        l[e].vnode.el.offsetHeight, l.forEach((f, B) => {
          B === i ? (f.exposed.slideClass.active = !0, f.exposed.slideClass[o[1]] = !0) : B === e && (f.exposed.slideClass[o[1]] = !0);
        }), v = setTimeout(() => {
          x(e), y("change", e), v = 0;
        }, 600);
      });
    }
    function h() {
      m(), a.interval > 0 && (p = setInterval(() => {
        V();
      }, a.interval));
    }
    function m() {
      clearInterval(p), p = 0;
    }
    function S() {
      l.forEach((e) => {
        e.exposed.slideClass.active = !1, e.exposed.slideClass.left = !1, e.exposed.slideClass.right = !1, e.exposed.slideClass.next = !1, e.exposed.slideClass.prev = !1;
      });
    }
    function x(e) {
      S(), l[e].exposed.slideClass.active = !0;
    }
    function d(e) {
      v !== 0 || e === t.value || (I(a.modelValue) ? y("update:modelValue", e) : (k(e, t.value), t.value = e));
    }
    function L() {
      d(t.value === 0 ? l.length - 1 : t.value - 1);
    }
    function V() {
      d(t.value === l.length - 1 ? 0 : t.value + 1);
    }
    return E(
      () => a.interval,
      () => {
        h();
      }
    ), E(
      () => a.modelValue,
      (e, n) => {
        k(e, n), t.value = e;
      }
    ), T(() => {
      I(a.modelValue) && (t.value = a.modelValue), l.length > 0 && x(t.value), h();
    }), z(() => {
      m();
    }), M({
      slides: l
    }), (e, n) => (u(), c("div", {
      class: "carousel slide",
      "data-ride": "carousel",
      onMouseenter: m,
      onMouseleave: h
    }, [
      s.indicators ? N(e.$slots, "indicators", {
        key: 0,
        select: d,
        activeIndex: $(t)
      }, () => [
        r("ol", U, [
          (u(!0), c(F, null, H(l, (i, o) => (u(), c("li", {
            key: o,
            class: C({ active: o === $(t) }),
            onClick: (f) => d(o)
          }, null, 10, _))), 128))
        ])
      ]) : g("", !0),
      r("div", q, [
        N(e.$slots, "default")
      ]),
      s.controls ? (u(), c("a", {
        key: 1,
        class: "left carousel-control",
        href: "#",
        role: "button",
        onClick: n[0] || (n[0] = b((i) => L(), ["prevent"]))
      }, [
        r("span", {
          class: C(s.iconControlLeft),
          "aria-hidden": "true"
        }, null, 2),
        D
      ])) : g("", !0),
      s.controls ? (u(), c("a", {
        key: 2,
        class: "right carousel-control",
        href: "#",
        role: "button",
        onClick: n[1] || (n[1] = b((i) => V(), ["prevent"]))
      }, [
        r("span", {
          class: C(s.iconControlRight),
          "aria-hidden": "true"
        }, null, 2),
        G
      ])) : g("", !0)
    ], 32));
  }
};
export {
  K as default
};
