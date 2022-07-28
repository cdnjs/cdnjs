import { ref as V, computed as h, watch as z, openBlock as s, createElementBlock as d, normalizeClass as u, unref as g, createElementVNode as o, withModifiers as r, createCommentVNode as b, Fragment as x, renderList as $, toDisplayString as L } from "vue";
function N(e, k = 0, a = 1) {
  const l = [];
  for (let v = k; v < e; v += a)
    l.push(v);
  return l;
}
const B = /* @__PURE__ */ o("span", { "aria-hidden": "true" }, "\xAB", -1), E = [
  B
], q = /* @__PURE__ */ o("span", { "aria-hidden": "true" }, "\u2039", -1), w = [
  q
], F = /* @__PURE__ */ o("span", { "aria-hidden": "true" }, "\u2026", -1), A = [
  F
], D = ["onClick"], M = /* @__PURE__ */ o("span", { "aria-hidden": "true" }, "\u2026", -1), j = [
  M
], G = /* @__PURE__ */ o("span", { "aria-hidden": "true" }, "\u203A", -1), H = [
  G
], I = /* @__PURE__ */ o("span", { "aria-hidden": "true" }, "\xBB", -1), J = [
  I
], O = {
  __name: "Pagination",
  props: {
    modelValue: { type: Number, required: !0, validator: (e) => e >= 1 },
    boundaryLinks: { type: Boolean, default: !1 },
    directionLinks: { type: Boolean, default: !0 },
    size: { type: String, default: void 0 },
    align: { type: String, default: void 0 },
    totalPage: { type: Number, required: !0, validator: (e) => e >= 0 },
    maxSize: { type: Number, default: 5, validator: (e) => e >= 0 },
    disabled: Boolean
  },
  emits: ["update:modelValue", "change"],
  setup(e, { emit: k }) {
    const a = e, l = V(0), v = h(() => ({
      [`text-${a.align}`]: !!a.align
    })), S = h(() => ({
      [`pagination-${a.size}`]: !!a.size
    })), C = h(
      () => N(a.totalPage).slice(
        l.value,
        l.value + a.maxSize
      )
    );
    z(
      () => [a.modelValue, a.maxSize, a.totalPage],
      () => {
        P();
      },
      {
        immediate: !0
      }
    );
    function P() {
      const i = a.modelValue, t = a.maxSize, n = l.value, m = n + t;
      if (i > m) {
        const c = a.totalPage - t;
        i > c ? l.value = c : l.value = i - 1;
      } else
        i < n + 1 && (i > t ? l.value = i - t : l.value = 0);
    }
    function f(i) {
      !a.disabled && i > 0 && i <= a.totalPage && i !== a.modelValue && (k("update:modelValue", i), k("change", i));
    }
    function y(i) {
      if (a.disabled)
        return;
      const t = a.maxSize, n = l.value, m = a.totalPage - t, c = i ? n - t : n + t;
      c < 0 ? l.value = 0 : c > m ? l.value = m : l.value = c;
    }
    return (i, t) => (s(), d("nav", {
      "aria-label": "Page navigation",
      class: u(g(v))
    }, [
      o("ul", {
        class: u(["pagination", g(S)])
      }, [
        e.boundaryLinks ? (s(), d("li", {
          key: 0,
          class: u({ disabled: e.modelValue <= 1 || e.disabled })
        }, [
          o("a", {
            href: "#",
            role: "button",
            "aria-label": "First",
            onClick: t[0] || (t[0] = r((n) => f(1), ["prevent"]))
          }, E)
        ], 2)) : b("", !0),
        e.directionLinks ? (s(), d("li", {
          key: 1,
          class: u({ disabled: e.modelValue <= 1 || e.disabled })
        }, [
          o("a", {
            href: "#",
            role: "button",
            "aria-label": "Previous",
            onClick: t[1] || (t[1] = r((n) => f(e.modelValue - 1), ["prevent"]))
          }, w)
        ], 2)) : b("", !0),
        l.value > 0 ? (s(), d("li", {
          key: 2,
          class: u({ disabled: e.disabled })
        }, [
          o("a", {
            href: "#",
            role: "button",
            "aria-label": "Previous group",
            onClick: t[2] || (t[2] = r((n) => y(1), ["prevent"]))
          }, A)
        ], 2)) : b("", !0),
        (s(!0), d(x, null, $(g(C), (n) => (s(), d("li", {
          key: n,
          class: u({ active: e.modelValue === n + 1, disabled: e.disabled })
        }, [
          o("a", {
            href: "#",
            role: "button",
            onClick: r((m) => f(n + 1), ["prevent"])
          }, L(n + 1), 9, D)
        ], 2))), 128)),
        l.value < e.totalPage - e.maxSize ? (s(), d("li", {
          key: 3,
          class: u({ disabled: e.disabled })
        }, [
          o("a", {
            href: "#",
            role: "button",
            "aria-label": "Next group",
            onClick: t[3] || (t[3] = r((n) => y(0), ["prevent"]))
          }, j)
        ], 2)) : b("", !0),
        e.directionLinks ? (s(), d("li", {
          key: 4,
          class: u({ disabled: e.modelValue >= e.totalPage || e.disabled })
        }, [
          o("a", {
            href: "#",
            role: "button",
            "aria-label": "Next",
            onClick: t[4] || (t[4] = r((n) => f(e.modelValue + 1), ["prevent"]))
          }, H)
        ], 2)) : b("", !0),
        e.boundaryLinks ? (s(), d("li", {
          key: 5,
          class: u({ disabled: e.modelValue >= e.totalPage || e.disabled })
        }, [
          o("a", {
            href: "#",
            role: "button",
            "aria-label": "Last",
            onClick: t[5] || (t[5] = r((n) => f(e.totalPage), ["prevent"]))
          }, J)
        ], 2)) : b("", !0)
      ], 2)
    ], 2));
  }
};
export {
  O as default
};
