import { B as V, u as j, d as f, G as c, a as h, X as B, e as J, K as O, q as S, n as $, p as m, w as T, a0 as M, $ as w, a1 as L, W as y, a2 as _, F as A, a3 as G, E as I, r as K, L as R, l as U, g as P, H as C, S as Y, _ as Z } from "./base-component-LaJIjMhh.mjs";
import { d as ee } from "./dataBsDismiss-DdNPQYa-.mjs";
import { d as te } from "./dataBsToggle-B84TS15h.mjs";
import { s as o } from "./showClass-C8hdJfjQ.mjs";
import { h as se, o as i } from "./popupContainer-DSAMs3kR.mjs";
import { d as q, g as D, a as ae, t as ne, s as oe, h as x, o as l, i as ie, r as re, m as ce, c as le, f as N } from "./isVisible-BXnw5gXc.mjs";
import { g as W } from "./getTargetElement-D4ALSKV7.mjs";
import { i as fe } from "./isDisabled-DmmaKYeZ.mjs";
const ge = `.${i}`, X = `[${te}="${i}"]`, de = `[${ee}="${i}"]`, p = `${i}-toggling`, ve = {
  backdrop: !0,
  keyboard: !0,
  scroll: !1
}, g = (a) => B(a, q), he = (a) => new ye(a), v = m(`show.bs.${i}`), z = m(`shown.bs.${i}`), b = m(`hide.bs.${i}`), F = m(`hidden.bs.${i}`), me = (a) => {
  const { element: e } = a, { clientHeight: t, scrollHeight: s } = R(e);
  le(e, t !== s);
}, Q = (a, e) => {
  const t = e ? I : K, s = f(a.element);
  t(s, U, Oe), t(s, P, be);
}, H = (a) => {
  const { element: e, options: t } = a;
  t.scroll || (me(a), T(M(e), { overflow: "hidden" })), O(e, p), O(e, o), T(e, { visibility: "visible" }), $(e, () => Te(a));
}, pe = (a) => {
  const { element: e, options: t } = a, s = D(e);
  e.blur(), !s && t.backdrop && c(l, o) && x(), $(e, () => we(a));
};
function ue(a) {
  const e = W(this), t = e && g(e);
  fe(this) || t && (t.relatedTarget = this, t.toggle(), this.tagName === "A" && a.preventDefault());
}
const be = (a) => {
  const { target: e } = a, t = C(
    N,
    f(e)
  );
  if (!t) return;
  const s = C(
    de,
    t
  ), n = g(t);
  if (!n) return;
  const { options: r, triggers: d } = n, { backdrop: E } = r, u = Y(e, X), k = f(t).getSelection();
  l.contains(e) && E === "static" || (!(k && k.toString().length) && (!t.contains(e) && E && (!u || d.includes(e)) || s && s.contains(e)) && (n.relatedTarget = s && s.contains(e) ? s : void 0, n.hide()), u && u.tagName === "A" && a.preventDefault());
}, Oe = ({ code: a, target: e }) => {
  const t = C(
    N,
    f(e)
  ), s = t && g(t);
  s && s.options.keyboard && a === Z && (s.relatedTarget = void 0, s.hide());
}, Te = (a) => {
  const { element: e } = a;
  S(e, p), w(e, L), y(e, _, "true"), y(e, "role", "dialog"), h(e, z), Q(a, !0), A(e), G(e);
}, we = (a) => {
  const { element: e, triggers: t } = a;
  y(e, L, "true"), w(e, _), w(e, "role"), T(e, { visibility: "" });
  const s = v.relatedTarget || t.find(ie);
  s && A(s), re(e), h(e, F), S(e, p), G(e), D(e) || Q(a);
};
class ye extends V {
  static selector = ge;
  static init = he;
  static getInstance = g;
  constructor(e, t) {
    super(e, t);
    const { element: s } = this;
    this.triggers = [
      ...j(
        X,
        f(s)
      )
    ].filter(
      (n) => W(n) === s
    ), this.relatedTarget = void 0, this._toggleEventListeners(!0);
  }
  get name() {
    return q;
  }
  get defaults() {
    return ve;
  }
  toggle() {
    c(this.element, o) ? this.hide() : this.show();
  }
  show() {
    const { element: e, options: t, relatedTarget: s } = this;
    let n = 0;
    if (c(e, o) || (v.relatedTarget = s || void 0, z.relatedTarget = s || void 0, h(e, v), v.defaultPrevented)) return;
    const r = D(e);
    if (r && r !== e) {
      const d = g(r) || B(
        r,
        ce
      );
      d && d.hide();
    }
    t.backdrop ? (se(l) ? ne() : ae(e, !0), n = J(l), oe(), setTimeout(() => H(this), n)) : (H(this), r && c(l, o) && x());
  }
  hide() {
    const { element: e, relatedTarget: t } = this;
    c(e, o) && (b.relatedTarget = t || void 0, F.relatedTarget = t || void 0, h(e, b), !b.defaultPrevented && (O(e, p), S(e, o), pe(this)));
  }
  _toggleEventListeners = (e) => {
    const t = e ? I : K;
    this.triggers.forEach((s) => {
      t(s, P, ue);
    });
  };
  dispose() {
    const { element: e } = this, t = c(e, o), s = () => setTimeout(() => super.dispose(), 1);
    this.hide(), this._toggleEventListeners(), t ? $(e, s) : s();
  }
}
export {
  ye as default
};
//# sourceMappingURL=offcanvas.mjs.map
