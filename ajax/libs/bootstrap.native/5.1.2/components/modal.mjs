import { B as j, W as _, c as q, d as S, _ as d, Z as v, t as F, u as x, a as B, Q as I, $ as L, s as m, m as w, M as U, H as ee, x as b, a0 as te, G as P, a1 as A, a2 as N, E as R, r as W, J as G, a3 as K, v as Q, k as se, Y as oe, h as T, N as ae } from "./base-component-BMXjNJAi.mjs";
import { d as ne } from "./dataBsToggle-B84TS15h.mjs";
import { d as ie } from "./dataBsDismiss-DdNPQYa-.mjs";
import { f as re } from "./fadeClass-CLIYI_zn.mjs";
import { s as i } from "./showClass-C8hdJfjQ.mjs";
import { h as le, m as r } from "./popupContainer-BY58HXTH.mjs";
import { m as Z, g as D, a as de, t as ce, s as ge, h as z, b as he, c as me, o as h, d as fe, r as pe, i as ue, e as ve } from "./isVisible-8OcOPiZa.mjs";
import { g as J } from "./getTargetElement-px782XHx.mjs";
import { i as be } from "./isDisabled-BG5MoQVt.mjs";
const Te = `.${r}`, Se = `[${ne}="${r}"]`, we = `[${ie}="${r}"]`, V = `${r}-static`, ye = {
  backdrop: !0,
  keyboard: !0
}, f = (s) => F(s, Z), De = (s) => new ke(s), u = w(
  `show.bs.${r}`
), H = w(
  `shown.bs.${r}`
), y = w(
  `hide.bs.${r}`
), M = w(
  `hidden.bs.${r}`
), X = (s) => {
  const { element: e } = s, t = he(e), { clientHeight: o, scrollHeight: a } = U(e), { clientHeight: l, scrollHeight: c } = e, n = l !== c;
  if (!n && t) {
    const p = { [ee(e) ? "paddingLeft" : "paddingRight"]: `${t}px` };
    b(e, p);
  }
  me(e, n || o !== a);
}, Y = (s, e) => {
  const t = e ? R : W, { element: o } = s;
  t(o, Q, Me), t(S(o), se, He), e ? s._observer.observe(o) : s._observer.disconnect();
}, $ = (s) => {
  const { triggers: e, element: t, relatedTarget: o } = s;
  pe(t), b(t, { paddingRight: "", display: "" }), Y(s);
  const a = u.relatedTarget || e.find(ue);
  a && G(a), M.relatedTarget = o || void 0, v(t, M), K(t);
}, k = (s) => {
  const { element: e, relatedTarget: t } = s;
  G(e), Y(s, !0), H.relatedTarget = t || void 0, v(e, H), K(e);
}, C = (s) => {
  const { element: e, hasFade: t } = s;
  b(e, { display: "block" }), X(s), D(e) || b(te(e), { overflow: "hidden" }), P(e, i), L(e, A), I(e, N, "true"), t ? m(e, () => k(s)) : k(s);
}, O = (s) => {
  const { element: e, options: t, hasFade: o } = s;
  t.backdrop && o && d(h, i) && !D(e) ? (z(), m(h, () => $(s))) : $(s);
};
function Ee(s) {
  const e = J(this), t = e && f(e);
  be(this) || t && (this.tagName === "A" && s.preventDefault(), t.relatedTarget = this, t.toggle());
}
const He = ({ code: s, target: e }) => {
  const t = _(ve, S(e)), o = t && f(t);
  if (!o) return;
  const { options: a } = o;
  a.keyboard && s === oe && d(t, i) && (o.relatedTarget = null, o.hide());
}, Me = (s) => {
  const { currentTarget: e } = s, t = e && f(e);
  if (!t || !e || T.get(e)) return;
  const { options: o, isStatic: a, modalDialog: l } = t, { backdrop: c } = o, { target: n } = s, g = S(e)?.getSelection()?.toString().length, p = l.contains(n), E = n && ae(n, we);
  a && !p ? T.set(
    e,
    () => {
      P(e, V), m(l, () => $e(t));
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
    const { element: o } = this, a = _(
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
      const g = f(n) || F(
        n,
        fe
      );
      g && g.hide();
    }
    l ? (le(h) ? ce(!0) : de(e, o, !0), c = x(h), ge(), setTimeout(() => C(this), c)) : (C(this), n && d(h, i) && z());
  }
  hide() {
    const { element: e, hasFade: t, relatedTarget: o } = this;
    d(e, i) && (y.relatedTarget = o || void 0, v(e, y), !y.defaultPrevented && (B(e, i), I(e, A, "true"), L(e, N), t ? m(e, () => O(this)) : O(this)));
  }
  update = () => {
    d(this.element, i) && X(this);
  };
  _toggleEventListeners = (e) => {
    const t = e ? R : W, { triggers: o } = this;
    o.length && o.forEach((a) => {
      t(a, Q, Ee);
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
