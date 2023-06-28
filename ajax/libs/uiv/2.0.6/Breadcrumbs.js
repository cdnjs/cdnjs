import { openBlock as a, createElementBlock as n, normalizeClass as d, renderSlot as l, createBlock as s, resolveDynamicComponent as f, withCtx as p, Fragment as u, renderList as i, createTextVNode as y, toDisplayString as h } from "vue";
const m = {
  // <a> props
  href: { type: String, default: void 0 },
  target: { type: String, default: void 0 },
  // <router-link> props
  to: { type: null, default: void 0 },
  replace: { type: Boolean, default: !1 },
  append: { type: Boolean, default: !1 },
  exact: { type: Boolean, default: !1 }
}, k = ["href", "target"], g = {
  __name: "BreadcrumbItem",
  props: {
    ...m,
    active: { type: Boolean, default: !1 }
  },
  setup(r) {
    return (e, c) => (a(), n("li", {
      class: d({ active: r.active })
    }, [
      r.active ? l(e.$slots, "default", { key: 0 }) : e.to ? (a(), s(f("RouterLink"), {
        key: 1,
        to: e.to,
        replace: e.replace,
        append: e.append,
        exact: e.exact
      }, {
        default: p(() => [
          l(e.$slots, "default")
        ]),
        _: 3
      }, 8, ["to", "replace", "append", "exact"])) : (a(), n("a", {
        key: 2,
        href: e.href,
        target: e.target
      }, [
        l(e.$slots, "default")
      ], 8, k))
    ], 2));
  }
}, B = { class: "breadcrumb" }, $ = {
  __name: "Breadcrumbs",
  props: {
    items: { type: Array, default: () => [] }
  },
  setup(r) {
    return (e, c) => (a(), n("ol", B, [
      l(e.$slots, "default"),
      (a(!0), n(u, null, i(r.items, (t, o) => (a(), s(g, {
        key: t.key ?? o,
        active: t.active ?? o === r.items.length - 1,
        href: t.href,
        to: t.to,
        replace: t.replace,
        append: t.append,
        exact: t.exact
      }, {
        default: p(() => [
          y(h(t.text), 1)
        ]),
        _: 2
      }, 1032, ["active", "href", "to", "replace", "append", "exact"]))), 128))
    ]));
  }
};
export {
  $ as default
};
