import { B as k, t as x, _ as p, G as l, a as r, W as G, e as H, d as P, Z as m, m as g, E as W, r as Z, aa as b, ab as N, w as S, A as j, h as a, v as T, f as D, s as _ } from "./base-component-BazRqYWL.mjs";
import { f as d } from "./fadeClass-CLIYI_zn.mjs";
import { s as f } from "./showClass-C8hdJfjQ.mjs";
import { d as q } from "./dataBsDismiss-DdNPQYa-.mjs";
import { d as z } from "./dataBsToggle-B84TS15h.mjs";
import { g as y } from "./getTargetElement-DX_B2QXD.mjs";
import { i as F } from "./isDisabled-CipSDrHr.mjs";
const o = "toast", B = "Toast", J = `.${o}`, K = `[${q}="${o}"]`, M = `[${z}="${o}"]`, c = "showing", A = "hide", O = {
  animation: !0,
  autohide: !0,
  delay: 5e3
}, w = (e) => x(e, B), Q = (e) => new st(e), v = g(
  `show.bs.${o}`
), R = g(
  `shown.bs.${o}`
), E = g(
  `hide.bs.${o}`
), U = g(
  `hidden.bs.${o}`
), C = (e) => {
  const { element: t, options: s } = e;
  r(t, c), a.clear(t, c), m(t, R), s.autohide && a.set(t, () => e.hide(), s.delay, o);
}, $ = (e) => {
  const { element: t } = e;
  r(t, c), r(t, f), l(t, A), a.clear(t, o), m(t, U);
}, V = (e) => {
  const { element: t, options: s } = e;
  l(t, c), s.animation ? (D(t), _(t, () => $(e))) : $(e);
}, X = (e) => {
  const { element: t, options: s } = e;
  a.set(
    t,
    () => {
      r(t, A), D(t), l(t, f), l(t, c), s.animation ? _(t, () => C(e)) : C(e);
    },
    17,
    c
  );
};
function Y(e) {
  const t = y(this), s = t && w(t);
  F(this) || s && (this.tagName === "A" && e.preventDefault(), s.relatedTarget = this, s.show());
}
const tt = (e) => {
  const t = e.target, s = w(t), { type: n, relatedTarget: i } = e;
  !s || t === i || t.contains(i) || ([S, b].includes(n) ? a.clear(t, o) : a.set(t, () => s.hide(), s.options.delay, o));
};
class st extends k {
  static selector = J;
  static init = Q;
  static getInstance = w;
  constructor(t, s) {
    super(t, s);
    const { element: n, options: i } = this;
    i.animation && !p(n, d) ? l(n, d) : !i.animation && p(n, d) && r(n, d), this.dismiss = G(K, n), this.triggers = [
      ...H(
        M,
        P(n)
      )
    ].filter(
      (h) => y(h) === n
    ), this._toggleEventListeners(!0);
  }
  get name() {
    return B;
  }
  get defaults() {
    return O;
  }
  get isShown() {
    return p(this.element, f);
  }
  show = () => {
    const { element: t, isShown: s } = this;
    !t || s || (m(t, v), v.defaultPrevented || X(this));
  };
  hide = () => {
    const { element: t, isShown: s } = this;
    !t || !s || (m(t, E), E.defaultPrevented || V(this));
  };
  _toggleEventListeners = (t) => {
    const s = t ? W : Z, { element: n, triggers: i, dismiss: h, options: I, hide: L } = this;
    h && s(h, T, L), I.autohide && [b, N, S, j].forEach(
      (u) => s(n, u, tt)
    ), i.length && i.forEach((u) => {
      s(u, T, Y);
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
