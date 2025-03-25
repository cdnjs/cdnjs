import { B as _, G as p, K as l, q as r, H as k, u as q, d as x, a as d, a9 as S, aa as K, h as b, y as P, c as a, X, p as g, m as y, n as D, E as A, r as N, g as w } from "./base-component--xj9oMJ8.mjs";
import { f as m } from "./fadeClass-CLIYI_zn.mjs";
import { s as f } from "./showClass-C8hdJfjQ.mjs";
import { d as j } from "./dataBsDismiss-DdNPQYa-.mjs";
import { d as z } from "./dataBsToggle-B84TS15h.mjs";
import { g as B } from "./getTargetElement-B-Gw6dom.mjs";
import { i as F } from "./isDisabled-Dh1obUSx.mjs";
const o = "toast", H = "Toast", J = `.${o}`, M = `[${j}="${o}"]`, O = `[${z}="${o}"]`, c = "showing", G = "hide", Q = {
  animation: !0,
  autohide: !0,
  delay: 5e3
}, T = (e) => X(e, H), R = (e) => new st(e), v = g(
  `show.bs.${o}`
), U = g(
  `shown.bs.${o}`
), E = g(
  `hide.bs.${o}`
), V = g(
  `hidden.bs.${o}`
), C = (e) => {
  const { element: t, options: s } = e;
  r(t, c), a.clear(t, c), d(t, U), s.autohide && a.set(t, () => e.hide(), s.delay, o);
}, $ = (e) => {
  const { element: t } = e;
  r(t, c), r(t, f), l(t, G), a.clear(t, o), d(t, V);
}, W = (e) => {
  const { element: t, options: s } = e;
  l(t, c), s.animation ? (y(t), D(t, () => $(e))) : $(e);
}, Y = (e) => {
  const { element: t, options: s } = e;
  a.set(
    t,
    () => {
      r(t, G), y(t), l(t, f), l(t, c), s.animation ? D(t, () => C(e)) : C(e);
    },
    17,
    c
  );
};
function Z(e) {
  const t = B(this), s = t && T(t);
  F(this) || s && (this.tagName === "A" && e.preventDefault(), s.relatedTarget = this, s.show());
}
const tt = (e) => {
  const t = e.target, s = T(t), { type: n, relatedTarget: i } = e;
  !s || t === i || t.contains(i) || ([b, S].includes(n) ? a.clear(t, o) : a.set(t, () => s.hide(), s.options.delay, o));
};
class st extends _ {
  static selector = J;
  static init = R;
  static getInstance = T;
  constructor(t, s) {
    super(t, s);
    const { element: n, options: i } = this;
    i.animation && !p(n, m) ? l(n, m) : !i.animation && p(n, m) && r(n, m), this.dismiss = k(M, n), this.triggers = [
      ...q(
        O,
        x(n)
      )
    ].filter(
      (h) => B(h) === n
    ), this._toggleEventListeners(!0);
  }
  get name() {
    return H;
  }
  get defaults() {
    return Q;
  }
  get isShown() {
    return p(this.element, f);
  }
  show = () => {
    const { element: t, isShown: s } = this;
    !t || s || (d(t, v), v.defaultPrevented || Y(this));
  };
  hide = () => {
    const { element: t, isShown: s } = this;
    !t || !s || (d(t, E), E.defaultPrevented || W(this));
  };
  _toggleEventListeners = (t) => {
    const s = t ? A : N, { element: n, triggers: i, dismiss: h, options: I, hide: L } = this;
    h && s(h, w, L), I.autohide && [S, K, b, P].forEach(
      (u) => s(n, u, tt)
    ), i.length && i.forEach((u) => {
      s(u, w, Z);
    });
  };
  dispose() {
    const { element: t, isShown: s } = this;
    this._toggleEventListeners(), a.clear(t, o), s && r(t, f), super.dispose();
  }
}
export {
  st as default
};
//# sourceMappingURL=toast.mjs.map
