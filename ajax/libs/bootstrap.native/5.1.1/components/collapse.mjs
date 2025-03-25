import { B, d as G, u as $, t as L, N as T, H as _, c as l, K as c, q as g, G as k, X as q, p as C, a as f, Y as d, w as p, n as x, W as H, z as S, m as K, E as N, r as P, g as W, S as X } from "./base-component--xj9oMJ8.mjs";
import { d as Y } from "./dataBsToggle-B84TS15h.mjs";
import { c as m } from "./collapsingClass-BxKtDBMH.mjs";
import { s as u } from "./showClass-C8hdJfjQ.mjs";
import { g as E } from "./getTargetElement-B-Gw6dom.mjs";
import { i as z } from "./isDisabled-Dh1obUSx.mjs";
const n = "collapse", D = "Collapse", A = `.${n}`, I = `[${Y}="${n}"]`, j = { parent: null }, h = (a) => q(a, D), y = (a) => new Q(a), v = C(`show.bs.${n}`), F = C(`shown.bs.${n}`), w = C(`hide.bs.${n}`), J = C(`hidden.bs.${n}`), M = (a) => {
  const { element: e, parent: t, triggers: s } = a;
  f(e, v), v.defaultPrevented || (l.set(e, d, 17), t && l.set(t, d, 17), c(e, m), g(e, n), p(e, { height: `${e.scrollHeight}px` }), x(e, () => {
    l.clear(e), t && l.clear(t), s.forEach((o) => H(o, S, "true")), g(e, m), c(e, n), c(e, u), p(e, { height: "" }), f(e, F);
  }));
}, b = (a) => {
  const { element: e, parent: t, triggers: s } = a;
  f(e, w), w.defaultPrevented || (l.set(e, d, 17), t && l.set(t, d, 17), p(e, { height: `${e.scrollHeight}px` }), g(e, n), g(e, u), c(e, m), K(e), p(e, { height: "0px" }), x(e, () => {
    l.clear(e), t && l.clear(t), s.forEach((o) => H(o, S, "false")), g(e, m), c(e, n), p(e, { height: "" }), f(e, J);
  }));
}, O = (a) => {
  const { target: e } = a, t = e && X(e, I), s = t && E(t), o = s && h(s);
  t && z(t) || o && (o.toggle(), t?.tagName === "A" && a.preventDefault());
};
class Q extends B {
  static selector = A;
  static init = y;
  static getInstance = h;
  constructor(e, t) {
    super(e, t);
    const { element: s, options: o } = this, i = G(s);
    this.triggers = [...$(I, i)].filter(
      (r) => E(r) === s
    ), this.parent = L(o.parent) ? o.parent : T(o.parent) ? E(s) || _(o.parent, i) : null, this._toggleEventListeners(!0);
  }
  get name() {
    return D;
  }
  get defaults() {
    return j;
  }
  hide() {
    const { triggers: e, element: t } = this;
    l.get(t) || (b(this), e.length && e.forEach((s) => c(s, `${n}d`)));
  }
  show() {
    const { element: e, parent: t, triggers: s } = this;
    let o, i;
    t && (o = [
      ...$(`.${n}.${u}`, t)
    ].find((r) => h(r)), i = o && h(o)), (!t || !l.get(t)) && !l.get(e) && (i && o !== e && (b(i), i.triggers.forEach((r) => {
      c(r, `${n}d`);
    })), M(this), s.length && s.forEach((r) => g(r, `${n}d`)));
  }
  toggle() {
    k(this.element, u) ? this.hide() : this.show();
  }
  _toggleEventListeners = (e) => {
    const t = e ? N : P, { triggers: s } = this;
    s.length && s.forEach((o) => {
      t(o, W, O);
    });
  };
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
export {
  Q as default
};
//# sourceMappingURL=collapse.mjs.map
