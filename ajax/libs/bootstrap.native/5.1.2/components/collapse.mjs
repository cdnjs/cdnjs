import { B as D, d as H, c as v, o as L, p as S, W as T, h as l, G as c, a as g, _ as k, t as G, m as C, Z as f, q as d, x as h, s as x, Q as _, y as I, e as P, E as Q, r as W, v as Z, N as q } from "./base-component-BMXjNJAi.mjs";
import { d as y } from "./dataBsToggle-B84TS15h.mjs";
import { c as m } from "./collapsingClass-BxKtDBMH.mjs";
import { s as u } from "./showClass-C8hdJfjQ.mjs";
import { g as E } from "./getTargetElement-px782XHx.mjs";
import { i as A } from "./isDisabled-BG5MoQVt.mjs";
const n = "collapse", N = "Collapse", O = `.${n}`, B = `[${y}="${n}"]`, j = { parent: null }, p = (a) => G(a, N), z = (a) => new R(a), $ = C(`show.bs.${n}`), F = C(`shown.bs.${n}`), b = C(`hide.bs.${n}`), J = C(`hidden.bs.${n}`), K = (a) => {
  const { element: e, parent: t, triggers: s } = a;
  f(e, $), $.defaultPrevented || (l.set(e, d, 17), t && l.set(t, d, 17), c(e, m), g(e, n), h(e, { height: `${e.scrollHeight}px` }), x(e, () => {
    l.clear(e), t && l.clear(t), s.forEach((o) => _(o, I, "true")), g(e, m), c(e, n), c(e, u), h(e, { height: "" }), f(e, F);
  }));
}, w = (a) => {
  const { element: e, parent: t, triggers: s } = a;
  f(e, b), b.defaultPrevented || (l.set(e, d, 17), t && l.set(t, d, 17), h(e, { height: `${e.scrollHeight}px` }), g(e, n), g(e, u), c(e, m), P(e), h(e, { height: "0px" }), x(e, () => {
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
    const { element: s, options: o } = this, i = H(s);
    this.triggers = [...v(B, i)].filter(
      (r) => E(r) === s
    ), this.parent = L(o.parent) ? o.parent : S(o.parent) ? E(s) || T(o.parent, i) : null, this._toggleEventListeners(!0);
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
      ...v(`.${n}.${u}`, t)
    ].find((r) => p(r)), i = o && p(o)), (!t || !l.get(t)) && !l.get(e) && (i && o !== e && (w(i), i.triggers.forEach((r) => {
      c(r, `${n}d`);
    })), K(this), s.length && s.forEach((r) => g(r, `${n}d`)));
  }
  toggle() {
    k(this.element, u) ? this.hide() : this.show();
  }
  _toggleEventListeners = (e) => {
    const t = e ? Q : W, { triggers: s } = this;
    s.length && s.forEach((o) => {
      t(o, Z, M);
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
