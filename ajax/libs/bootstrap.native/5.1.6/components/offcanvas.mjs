import { B as q, t as P, e as z, d as f, _ as c, m as h, Z as m, u as F, G as O, a as D, E as _, r as A, s as E, v as B, y as T, a3 as J, P as M, a0 as y, a1 as L, Q as w, a2 as N, L as I, a4 as x, k as R, W as C, $ as U, N as Y } from "./base-component-BazRqYWL.mjs";
import { d as ee } from "./dataBsDismiss-DdNPQYa-.mjs";
import { d as te } from "./dataBsToggle-B84TS15h.mjs";
import { s as n } from "./showClass-C8hdJfjQ.mjs";
import { o as i, h as se } from "./popupContainer-Dhe1NpFt.mjs";
import { b as G, g as S, a as ae, t as oe, s as ne, o as l, h as K, m as ie, d as re, i as ce, r as le, f as Q } from "./isVisible-DPm_sCau.mjs";
import { g as W } from "./getTargetElement-DX_B2QXD.mjs";
import { i as fe } from "./isDisabled-CipSDrHr.mjs";
const ge = `.${i}`, Z = `[${te}="${i}"]`, de = `[${ee}="${i}"]`, u = `${i}-toggling`, ve = {
  backdrop: !0,
  keyboard: !0,
  scroll: !1
}, g = (a) => P(a, G), me = (a) => new we(a), v = h(`show.bs.${i}`), V = h(`shown.bs.${i}`), b = h(`hide.bs.${i}`), X = h(`hidden.bs.${i}`), he = (a) => {
  const { element: e } = a, { clientHeight: t, scrollHeight: s } = M(e);
  re(e, t !== s);
}, j = (a, e) => {
  const t = e ? _ : A, s = f(a.element);
  t(s, R, Oe), t(s, B, be);
}, H = (a) => {
  const { element: e, options: t } = a;
  t.scroll || (he(a), T(J(e), { overflow: "hidden" })), O(e, u), O(e, n), T(e, { visibility: "visible" }), E(e, () => Te(a));
}, ue = (a) => {
  const { element: e, options: t } = a, s = S(e);
  e.blur(), !s && t.backdrop && c(l, n) && K(), E(e, () => ye(a));
};
function pe(a) {
  const e = W(this), t = e && g(e);
  fe(this) || t && (t.relatedTarget = this, t.toggle(), this.tagName === "A" && a.preventDefault());
}
const be = (a) => {
  const { target: e } = a, t = C(
    Q,
    f(e)
  );
  if (!t) return;
  const s = C(
    de,
    t
  ), o = g(t);
  if (!o) return;
  const { options: r, triggers: d } = o, { backdrop: $ } = r, p = Y(e, Z), k = f(t).getSelection();
  l.contains(e) && $ === "static" || (!(k && k.toString().length) && (!t.contains(e) && $ && (!p || d.includes(e)) || s && s.contains(e)) && (o.relatedTarget = s && s.contains(e) ? s : void 0, o.hide()), p && p.tagName === "A" && a.preventDefault());
}, Oe = ({ code: a, target: e }) => {
  const t = C(
    Q,
    f(e)
  ), s = t && g(t);
  s && s.options.keyboard && a === U && (s.relatedTarget = void 0, s.hide());
}, Te = (a) => {
  const { element: e } = a;
  D(e, u), y(e, L), w(e, N, "true"), w(e, "role", "dialog"), m(e, V), j(a, !0), I(e), x(e);
}, ye = (a) => {
  const { element: e, triggers: t } = a;
  w(e, L, "true"), y(e, N), y(e, "role"), T(e, { visibility: "" });
  const s = v.relatedTarget || t.find(ce);
  s && I(s), le(e), m(e, X), D(e, u), x(e), S(e) || j(a);
};
class we extends q {
  static selector = ge;
  static init = me;
  static getInstance = g;
  constructor(e, t) {
    super(e, t);
    const { element: s } = this;
    this.triggers = [
      ...z(
        Z,
        f(s)
      )
    ].filter(
      (o) => W(o) === s
    ), this.relatedTarget = void 0, this._toggleEventListeners(!0);
  }
  get name() {
    return G;
  }
  get defaults() {
    return ve;
  }
  toggle() {
    c(this.element, n) ? this.hide() : this.show();
  }
  show() {
    const { element: e, options: t, relatedTarget: s } = this;
    let o = 0;
    if (c(e, n) || (v.relatedTarget = s || void 0, V.relatedTarget = s || void 0, m(e, v), v.defaultPrevented)) return;
    const r = S(e);
    if (r && r !== e) {
      const d = g(r) || P(
        r,
        ie
      );
      d && d.hide();
    }
    t.backdrop ? (se(l) ? oe() : ae(e, !0), o = F(l), ne(), setTimeout(() => H(this), o)) : (H(this), r && c(l, n) && K());
  }
  hide() {
    const { element: e, relatedTarget: t } = this;
    c(e, n) && (b.relatedTarget = t || void 0, X.relatedTarget = t || void 0, m(e, b), !b.defaultPrevented && (O(e, u), D(e, n), ue(this)));
  }
  _toggleEventListeners = (e) => {
    const t = e ? _ : A;
    this.triggers.forEach((s) => {
      t(s, B, pe);
    });
  };
  dispose() {
    const { element: e } = this, t = c(e, n), s = () => setTimeout(() => super.dispose(), 1);
    this.hide(), this._toggleEventListeners(), t ? E(e, s) : s();
  }
}
export {
  we as default
};
//# sourceMappingURL=offcanvas.mjs.map
