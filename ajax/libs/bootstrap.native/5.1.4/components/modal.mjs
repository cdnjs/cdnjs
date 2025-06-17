import { B as j, t as _, W as F, c as q, d as S, _ as d, m as w, Z as v, u as x, a as B, Q as I, $ as L, s as m, E as P, r as A, a0 as N, a1 as R, v as W, x as b, a2 as U, G, M as ee, H as te, J as K, a3 as Q, k as se, h as T, N as oe, Y as ae } from "./base-component-BO-nCUu-.mjs";
import { d as ne } from "./dataBsToggle-B84TS15h.mjs";
import { d as ie } from "./dataBsDismiss-DdNPQYa-.mjs";
import { f as re } from "./fadeClass-CLIYI_zn.mjs";
import { s as i } from "./showClass-C8hdJfjQ.mjs";
import { m as r, h as le } from "./popupContainer-DjaIEtep.mjs";
import { m as Z, g as D, a as de, t as ce, s as ge, o as h, h as z, b as he, c as me, d as fe, r as pe, i as ue, e as ve } from "./isVisible-BU11xzXW.mjs";
import { g as J } from "./getTargetElement-CzuB6Lv6.mjs";
import { i as be } from "./isDisabled-BnHBewNm.mjs";
const Te = `.${r}`, Se = `[${ne}="${r}"]`, we = `[${ie}="${r}"]`, V = `${r}-static`, ye = {
  backdrop: !0,
  keyboard: !0
}, f = (s) => _(s, Z), De = (s) => new ke(s), u = w(
  `show.bs.${r}`
), H = w(
  `shown.bs.${r}`
), y = w(
  `hide.bs.${r}`
), M = w(
  `hidden.bs.${r}`
), X = (s) => {
  const { element: e } = s, t = me(e), { clientHeight: o, scrollHeight: a } = ee(e), { clientHeight: l, scrollHeight: c } = e, n = l !== c;
  if (!n && t) {
    const p = { [te(e) ? "paddingLeft" : "paddingRight"]: `${t}px` };
    b(e, p);
  }
  fe(e, n || o !== a);
}, Y = (s, e) => {
  const t = e ? P : A, { element: o } = s;
  t(o, W, Me), t(S(o), se, He), e ? s._observer.observe(o) : s._observer.disconnect();
}, $ = (s) => {
  const { triggers: e, element: t, relatedTarget: o } = s;
  pe(t), b(t, { paddingRight: "", display: "" }), Y(s);
  const a = u.relatedTarget || e.find(ue);
  a && K(a), M.relatedTarget = o || void 0, v(t, M), Q(t);
}, k = (s) => {
  const { element: e, relatedTarget: t } = s;
  K(e), Y(s, !0), H.relatedTarget = t || void 0, v(e, H), Q(e);
}, C = (s) => {
  const { element: e, hasFade: t } = s;
  b(e, { display: "block" }), X(s), D(e) || b(U(e), { overflow: "hidden" }), G(e, i), L(e, N), I(e, R, "true"), t ? m(e, () => k(s)) : k(s);
}, O = (s) => {
  const { element: e, options: t, hasFade: o } = s;
  t.backdrop && o && d(h, i) && !D(e) ? (z(), m(h, () => $(s))) : $(s);
};
function Ee(s) {
  const e = J(this), t = e && f(e);
  be(this) || t && (this.tagName === "A" && s.preventDefault(), t.relatedTarget = this, t.toggle());
}
const He = ({ code: s, target: e }) => {
  const t = F(ve, S(e)), o = t && f(t);
  if (!o) return;
  const { options: a } = o;
  a.keyboard && s === ae && d(t, i) && (o.relatedTarget = null, o.hide());
}, Me = (s) => {
  const { currentTarget: e } = s, t = e && f(e);
  if (!t || !e || T.get(e)) return;
  const { options: o, isStatic: a, modalDialog: l } = t, { backdrop: c } = o, { target: n } = s, g = S(e)?.getSelection()?.toString().length, p = l.contains(n), E = n && oe(n, we);
  a && !p ? T.set(
    e,
    () => {
      G(e, V), m(l, () => $e(t));
    },
    17
  ) : (E || !g && !a && !p && c) && (t.relatedTarget = E || null, t.hide(), s.preventDefault());
}, $e = (s) => {
  const { element: e, modalDialog: t } = s, o = (x(t) || 0) + 17;
  B(e, V), T.set(e, () => T.clear(e), o);
};
class ke extends j {
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
      ...q(
        Se,
        S(o)
      )
    ].filter(
      (l) => J(l) === o
    ), this.isStatic = this.options.backdrop === "static", this.hasFade = d(o, re), this.relatedTarget = null, this._observer = new ResizeObserver(() => this.update()), this._toggleEventListeners(!0));
  }
  get name() {
    return Z;
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
        he
      );
      g && g.hide();
    }
    l ? (le(h) ? ce(!0) : de(e, o, !0), c = x(h), ge(), setTimeout(() => C(this), c)) : (C(this), n && d(h, i) && z());
  }
  hide() {
    const { element: e, hasFade: t, relatedTarget: o } = this;
    d(e, i) && (y.relatedTarget = o || void 0, v(e, y), !y.defaultPrevented && (B(e, i), I(e, N, "true"), L(e, R), t ? m(e, () => O(this)) : O(this)));
  }
  update = () => {
    d(this.element, i) && X(this);
  };
  _toggleEventListeners = (e) => {
    const t = e ? P : A, { triggers: o } = this;
    o.length && o.forEach((a) => {
      t(a, W, Ee);
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
