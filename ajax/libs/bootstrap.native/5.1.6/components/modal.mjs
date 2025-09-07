import { B as J, t as _, W as F, e as U, d as S, _ as d, m as y, Z as v, u as L, a as P, Q as x, a0 as B, s as m, E as I, r as A, a1 as N, a2 as R, v as W, y as b, a3 as Y, G, P as ee, H as te, L as K, a4 as Q, k as se, h as T, N as oe, $ as ae } from "./base-component-BazRqYWL.mjs";
import { d as ne } from "./dataBsToggle-B84TS15h.mjs";
import { d as ie } from "./dataBsDismiss-DdNPQYa-.mjs";
import { f as re } from "./fadeClass-CLIYI_zn.mjs";
import { s as i } from "./showClass-C8hdJfjQ.mjs";
import { m as r, h as le } from "./popupContainer-Dhe1NpFt.mjs";
import { m as Z, g as D, a as de, t as ce, s as ge, o as h, h as z, b as he, c as me, d as fe, r as pe, i as ue, e as ve } from "./isVisible-DPm_sCau.mjs";
import { g as V } from "./getTargetElement-DX_B2QXD.mjs";
import { i as be } from "./isDisabled-CipSDrHr.mjs";
const Te = `.${r}`, Se = `[${ne}="${r}"]`, ye = `[${ie}="${r}"]`, X = `${r}-static`, we = {
  backdrop: !0,
  keyboard: !0
}, f = (s) => _(s, Z), De = (s) => new Me(s), u = y(
  `show.bs.${r}`
), H = y(
  `shown.bs.${r}`
), w = y(
  `hide.bs.${r}`
), $ = y(
  `hidden.bs.${r}`
), j = (s) => {
  const { element: e } = s, t = me(e), { clientHeight: o, scrollHeight: a } = ee(e), { clientHeight: l, scrollHeight: c } = e, n = l !== c;
  if (!n && t) {
    const p = { [te(e) ? "paddingLeft" : "paddingRight"]: `${t}px` };
    b(e, p);
  }
  fe(e, n || o !== a);
}, q = (s, e) => {
  const t = e ? I : A, { element: o } = s;
  t(o, W, $e), t(S(o), se, He), e ? s._observer.observe(o) : s._observer.disconnect();
}, k = (s) => {
  const { triggers: e, element: t, relatedTarget: o } = s;
  pe(t), b(t, { paddingRight: "", display: "" }), q(s);
  const a = u.relatedTarget || e.find(ue);
  a && K(a), $.relatedTarget = o || void 0, v(t, $), Q(t);
}, M = (s) => {
  const { element: e, relatedTarget: t } = s;
  K(e), q(s, !0), H.relatedTarget = t || void 0, v(e, H), Q(e);
}, C = (s) => {
  const { element: e, hasFade: t } = s;
  b(e, { display: "block" }), j(s), D(e) || b(Y(e), { overflow: "hidden" }), G(e, i), B(e, N), x(e, R, "true"), t ? m(e, () => M(s)) : M(s);
}, O = (s) => {
  const { element: e, options: t, hasFade: o } = s;
  t.backdrop && o && d(h, i) && !D(e) ? (z(), m(h, () => k(s))) : k(s);
};
function Ee(s) {
  const e = V(this), t = e && f(e);
  be(this) || t && (this.tagName === "A" && s.preventDefault(), t.relatedTarget = this, t.toggle());
}
const He = ({ code: s, target: e }) => {
  const t = F(ve, S(e)), o = t && f(t);
  if (!o) return;
  const { options: a } = o;
  a.keyboard && s === ae && d(t, i) && (o.relatedTarget = null, o.hide());
}, $e = (s) => {
  const { currentTarget: e } = s, t = e && f(e);
  if (!t || !e || T.get(e)) return;
  const { options: o, isStatic: a, modalDialog: l } = t, { backdrop: c } = o, { target: n } = s, g = S(e)?.getSelection()?.toString().length, p = l.contains(n), E = n && oe(n, ye);
  a && !p ? T.set(
    e,
    () => {
      G(e, X), m(l, () => ke(t));
    },
    17
  ) : (E || !g && !a && !p && c) && (t.relatedTarget = E || null, t.hide(), s.preventDefault());
}, ke = (s) => {
  const { element: e, modalDialog: t } = s, o = (L(t) || 0) + 17;
  P(e, X), T.set(e, () => T.clear(e), o);
};
class Me extends J {
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
      ...U(
        Se,
        S(o)
      )
    ].filter(
      (l) => V(l) === o
    ), this.isStatic = this.options.backdrop === "static", this.hasFade = d(o, re), this.relatedTarget = null, this._observer = new ResizeObserver(() => this.update()), this._toggleEventListeners(!0));
  }
  get name() {
    return Z;
  }
  get defaults() {
    return we;
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
    l ? (le(h) ? ce(!0) : de(e, o, !0), c = L(h), ge(), setTimeout(() => C(this), c)) : (C(this), n && d(h, i) && z());
  }
  hide() {
    const { element: e, hasFade: t, relatedTarget: o } = this;
    d(e, i) && (w.relatedTarget = o || void 0, v(e, w), !w.defaultPrevented && (P(e, i), x(e, N, "true"), B(e, R), t ? m(e, () => O(this)) : O(this)));
  }
  update = () => {
    d(this.element, i) && j(this);
  };
  _toggleEventListeners = (e) => {
    const t = e ? I : A, { triggers: o } = this;
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
  Me as default
};
//# sourceMappingURL=modal.mjs.map
