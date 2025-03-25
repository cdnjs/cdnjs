import { B as U, H as F, u as Y, d as S, G as d, a as v, X as _, e as B, q as L, W as x, $ as I, n as m, p as w, L as Z, b as ee, w as b, a0 as te, K as G, a1 as K, a2 as P, E as R, r as W, F as q, a3 as z, g as A, l as se, _ as oe, c as T, S as ae } from "./base-component--xj9oMJ8.mjs";
import { d as ne } from "./dataBsToggle-B84TS15h.mjs";
import { d as ie } from "./dataBsDismiss-DdNPQYa-.mjs";
import { f as re } from "./fadeClass-CLIYI_zn.mjs";
import { s as i } from "./showClass-C8hdJfjQ.mjs";
import { h as le, m as r } from "./popupContainer-T6ricSTx.mjs";
import { m as X, g as D, a as de, t as ce, s as ge, h as N, b as he, c as me, o as h, d as fe, r as pe, i as ue, e as ve } from "./isVisible-D50RKO3x.mjs";
import { g as Q } from "./getTargetElement-B-Gw6dom.mjs";
import { i as be } from "./isDisabled-Dh1obUSx.mjs";
const Te = `.${r}`, Se = `[${ne}="${r}"]`, we = `[${ie}="${r}"]`, V = `${r}-static`, ye = {
  backdrop: !0,
  keyboard: !0
}, f = (s) => _(s, X), De = (s) => new ke(s), u = w(
  `show.bs.${r}`
), H = w(
  `shown.bs.${r}`
), y = w(
  `hide.bs.${r}`
), E = w(
  `hidden.bs.${r}`
), j = (s) => {
  const { element: e } = s, t = he(e), { clientHeight: o, scrollHeight: a } = Z(e), { clientHeight: l, scrollHeight: c } = e, n = l !== c;
  if (!n && t) {
    const p = { [ee(e) ? "paddingLeft" : "paddingRight"]: `${t}px` };
    b(e, p);
  }
  me(e, n || o !== a);
}, J = (s, e) => {
  const t = e ? R : W, { element: o } = s;
  t(o, A, Ee), t(S(o), se, He), e ? s._observer.observe(o) : s._observer.disconnect();
}, M = (s) => {
  const { triggers: e, element: t, relatedTarget: o } = s;
  pe(t), b(t, { paddingRight: "", display: "" }), J(s);
  const a = u.relatedTarget || e.find(ue);
  a && q(a), E.relatedTarget = o || void 0, v(t, E), z(t);
}, k = (s) => {
  const { element: e, relatedTarget: t } = s;
  q(e), J(s, !0), H.relatedTarget = t || void 0, v(e, H), z(e);
}, C = (s) => {
  const { element: e, hasFade: t } = s;
  b(e, { display: "block" }), j(s), D(e) || b(te(e), { overflow: "hidden" }), G(e, i), I(e, K), x(e, P, "true"), t ? m(e, () => k(s)) : k(s);
}, O = (s) => {
  const { element: e, options: t, hasFade: o } = s;
  t.backdrop && o && d(h, i) && !D(e) ? (N(), m(h, () => M(s))) : M(s);
};
function $e(s) {
  const e = Q(this), t = e && f(e);
  be(this) || t && (this.tagName === "A" && s.preventDefault(), t.relatedTarget = this, t.toggle());
}
const He = ({ code: s, target: e }) => {
  const t = F(ve, S(e)), o = t && f(t);
  if (!o) return;
  const { options: a } = o;
  a.keyboard && s === oe && d(t, i) && (o.relatedTarget = null, o.hide());
}, Ee = (s) => {
  const { currentTarget: e } = s, t = e && f(e);
  if (!t || !e || T.get(e)) return;
  const { options: o, isStatic: a, modalDialog: l } = t, { backdrop: c } = o, { target: n } = s, g = S(e)?.getSelection()?.toString().length, p = l.contains(n), $ = n && ae(n, we);
  a && !p ? T.set(
    e,
    () => {
      G(e, V), m(l, () => Me(t));
    },
    17
  ) : ($ || !g && !a && !p && c) && (t.relatedTarget = $ || null, t.hide(), s.preventDefault());
}, Me = (s) => {
  const { element: e, modalDialog: t } = s, o = (B(t) || 0) + 17;
  L(e, V), T.set(e, () => T.clear(e), o);
};
class ke extends U {
  static selector = Te;
  static init = De;
  static getInstance = f;
  constructor(e, t) {
    super(e, t);
    const { element: o } = this, a = F(
      `.${r}-dialog`,
      o
    );
    a && (this.modalDialog = a, this.triggers = [
      ...Y(
        Se,
        S(o)
      )
    ].filter(
      (l) => Q(l) === o
    ), this.isStatic = this.options.backdrop === "static", this.hasFade = d(o, re), this.relatedTarget = null, this._observer = new ResizeObserver(() => this.update()), this._toggleEventListeners(!0));
  }
  get name() {
    return X;
  }
  get defaults() {
    return ye;
  }
  toggle() {
    d(this.element, i) ? this.hide() : this.show();
  }
  show() {
    const { element: e, options: t, hasFade: o, relatedTarget: a } = this, { backdrop: l } = t;
    let c = 0;
    if (d(e, i) || (u.relatedTarget = a || void 0, v(e, u), u.defaultPrevented)) return;
    const n = D(e);
    if (n && n !== e) {
      const g = f(n) || _(
        n,
        fe
      );
      g && g.hide();
    }
    l ? (le(h) ? ce(!0) : de(e, o, !0), c = B(h), ge(), setTimeout(() => C(this), c)) : (C(this), n && d(h, i) && N());
  }
  hide() {
    const { element: e, hasFade: t, relatedTarget: o } = this;
    d(e, i) && (y.relatedTarget = o || void 0, v(e, y), !y.defaultPrevented && (L(e, i), x(e, K, "true"), I(e, P), t ? m(e, () => O(this)) : O(this)));
  }
  update = () => {
    d(this.element, i) && j(this);
  };
  _toggleEventListeners = (e) => {
    const t = e ? R : W, { triggers: o } = this;
    o.length && o.forEach((a) => {
      t(a, A, $e);
    });
  };
  dispose() {
    const e = { ...this }, { modalDialog: t, hasFade: o } = e, a = () => setTimeout(() => super.dispose(), 17);
    this.hide(), this._toggleEventListeners(), o ? m(t, a) : a();
  }
}
export {
  ke as default
};
//# sourceMappingURL=modal.mjs.map
