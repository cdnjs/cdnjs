import { B as D, t as H, d as L, e as v, W as S, o as T, p as k, h as l, G as c, a as g, _ as G, E as P, r as Q, v as W, Z as f, m as u, q as d, y as h, f as Z, s as x, Q as _, C as I, N as q } from "./base-component-BazRqYWL.mjs";
import { d as y } from "./dataBsToggle-B84TS15h.mjs";
import { c as m } from "./collapsingClass-BxKtDBMH.mjs";
import { s as C } from "./showClass-C8hdJfjQ.mjs";
import { g as E } from "./getTargetElement-DX_B2QXD.mjs";
import { i as A } from "./isDisabled-CipSDrHr.mjs";
const n = "collapse", N = "Collapse", O = `.${n}`, B = `[${y}="${n}"]`, j = { parent: null }, p = (a) => H(a, N), z = (a) => new R(a), $ = u(`show.bs.${n}`), F = u(`shown.bs.${n}`), b = u(`hide.bs.${n}`), J = u(`hidden.bs.${n}`), K = (a) => {
  const { element: e, parent: t, triggers: s } = a;
  f(e, $), $.defaultPrevented || (l.set(e, d, 17), t && l.set(t, d, 17), c(e, m), g(e, n), h(e, { height: `${e.scrollHeight}px` }), x(e, () => {
    l.clear(e), t && l.clear(t), s.forEach((o) => _(o, I, "true")), g(e, m), c(e, n), c(e, C), h(e, { height: "" }), f(e, F);
  }));
}, w = (a) => {
  const { element: e, parent: t, triggers: s } = a;
  f(e, b), b.defaultPrevented || (l.set(e, d, 17), t && l.set(t, d, 17), h(e, { height: `${e.scrollHeight}px` }), g(e, n), g(e, C), c(e, m), Z(e), h(e, { height: "0px" }), x(e, () => {
    l.clear(e), t && l.clear(t), s.forEach((o) => _(o, I, "false")), g(e, m), c(e, n), h(e, { height: "" }), f(e, J);
  }));
}, M = (a) => {
  const { target: e } = a, t = e && q(e, B), s = t && E(t), o = s && p(s);
  t && A(t) || o && (o.toggle(), t?.tagName === "A" && a.preventDefault());
};
class R extends D {
  static selector = O;
  static init = z;
  static getInstance = p;
  constructor(e, t) {
    super(e, t);
    const { element: s, options: o } = this, i = L(s);
    this.triggers = [...v(B, i)].filter(
      (r) => E(r) === s
    ), this.parent = T(o.parent) ? o.parent : k(o.parent) ? E(s) || S(o.parent, i) : null, this._toggleEventListeners(!0);
  }
  get name() {
    return N;
  }
  get defaults() {
    return j;
  }
  hide() {
    const { triggers: e, element: t } = this;
    l.get(t) || (w(this), e.length && e.forEach((s) => c(s, `${n}d`)));
  }
  show() {
    const { element: e, parent: t, triggers: s } = this;
    let o, i;
    t && (o = [
      ...v(`.${n}.${C}`, t)
    ].find((r) => p(r)), i = o && p(o)), (!t || !l.get(t)) && !l.get(e) && (i && o !== e && (w(i), i.triggers.forEach((r) => {
      c(r, `${n}d`);
    })), K(this), s.length && s.forEach((r) => g(r, `${n}d`)));
  }
  toggle() {
    G(this.element, C) ? this.hide() : this.show();
  }
  _toggleEventListeners = (e) => {
    const t = e ? P : Q, { triggers: s } = this;
    s.length && s.forEach((o) => {
      t(o, W, M);
    });
  };
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
export {
  R as default
};
//# sourceMappingURL=collapse.mjs.map
