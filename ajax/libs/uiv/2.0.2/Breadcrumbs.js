import { resolveComponent as f, openBlock as a, createElementBlock as n, normalizeClass as i, renderSlot as l, createBlock as c, withCtx as d, Fragment as y, renderList as h, createTextVNode as k, toDisplayString as m } from "vue";
const g = {
  href: { type: String, default: void 0 },
  target: { type: String, default: void 0 },
  to: { type: null, default: void 0 },
  replace: { type: Boolean, default: !1 },
  append: { type: Boolean, default: !1 },
  exact: { type: Boolean, default: !1 }
}, B = ["href", "target"], v = {
  __name: "BreadcrumbItem",
  props: {
    ...g,
    active: { type: Boolean, default: !1 }
  },
  setup(r) {
    return (e, u) => {
      const t = f("RouterLink");
      return a(), n("li", {
        class: i({ active: r.active })
      }, [
        r.active ? l(e.$slots, "default", { key: 0 }) : e.to ? (a(), c(t, {
          key: 1,
          to: e.to,
          replace: e.replace,
          append: e.append,
          exact: e.exact
        }, {
          default: d(() => [
            l(e.$slots, "default")
          ]),
          _: 3
        }, 8, ["to", "replace", "append", "exact"])) : (a(), n("a", {
          key: 2,
          href: e.href,
          target: e.target
        }, [
          l(e.$slots, "default")
        ], 8, B))
      ], 2);
    };
  }
}, $ = { class: "breadcrumb" }, b = {
  __name: "Breadcrumbs",
  props: {
    items: { type: Array, default: () => [] }
  },
  setup(r) {
    return (e, u) => (a(), n("ol", $, [
      l(e.$slots, "default"),
      (a(!0), n(y, null, h(r.items, (t, o) => {
        var s, p;
        return a(), c(v, {
          key: (s = t.key) != null ? s : o,
          active: (p = t.active) != null ? p : o === r.items.length - 1,
          href: t.href,
          to: t.to,
          replace: t.replace,
          append: t.append,
          exact: t.exact
        }, {
          default: d(() => [
            k(m(t.text), 1)
          ]),
          _: 2
        }, 1032, ["active", "href", "to", "replace", "append", "exact"]);
      }), 128))
    ]));
  }
};
export {
  b as default
};
