import { B as X, t as _, c as Y, d as f, _ as c, m as h, Z as m, u as j, G as O, a as D, E as A, r as B, s as E, v as N, x as T, a2 as q, M as z, $ as y, a0 as P, Q as w, a1 as x, J as I, a3 as L, k as F, W as C, Y as R, N as U } from "./base-component-BO-nCUu-.mjs";
import { d as ee } from "./dataBsDismiss-DdNPQYa-.mjs";
import { d as te } from "./dataBsToggle-B84TS15h.mjs";
import { s as n } from "./showClass-C8hdJfjQ.mjs";
import { o as i, h as se } from "./popupContainer-DjaIEtep.mjs";
import { b as G, g as S, a as ae, t as oe, s as ne, o as l, h as K, m as ie, d as re, i as ce, r as le, f as Q } from "./isVisible-BU11xzXW.mjs";
import { g as W } from "./getTargetElement-CzuB6Lv6.mjs";
import { i as fe } from "./isDisabled-BnHBewNm.mjs";
const ge = `.${i}`, Z = `[${te}="${i}"]`, de = `[${ee}="${i}"]`, u = `${i}-toggling`, ve = {
  backdrop: !0,
  keyboard: !0,
  scroll: !1
}, g = (a) => _(a, G), me = (a) => new we(a), v = h(`show.bs.${i}`), J = h(`shown.bs.${i}`), b = h(`hide.bs.${i}`), M = h(`hidden.bs.${i}`), he = (a) => {
  const { element: e } = a, { clientHeight: t, scrollHeight: s } = z(e);
  re(e, t !== s);
}, V = (a, e) => {
  const t = e ? A : B, s = f(a.element);
  t(s, F, Oe), t(s, N, be);
}, H = (a) => {
  const { element: e, options: t } = a;
  t.scroll || (he(a), T(q(e), { overflow: "hidden" })), O(e, u), O(e, n), T(e, { visibility: "visible" }), E(e, () => Te(a));
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
  const { options: r, triggers: d } = o, { backdrop: $ } = r, p = U(e, Z), k = f(t).getSelection();
  l.contains(e) && $ === "static" || (!(k && k.toString().length) && (!t.contains(e) && $ && (!p || d.includes(e)) || s && s.contains(e)) && (o.relatedTarget = s && s.contains(e) ? s : void 0, o.hide()), p && p.tagName === "A" && a.preventDefault());
}, Oe = ({ code: a, target: e }) => {
  const t = C(
    Q,
    f(e)
  ), s = t && g(t);
  s && s.options.keyboard && a === R && (s.relatedTarget = void 0, s.hide());
}, Te = (a) => {
  const { element: e } = a;
  D(e, u), y(e, P), w(e, x, "true"), w(e, "role", "dialog"), m(e, J), V(a, !0), I(e), L(e);
}, ye = (a) => {
  const { element: e, triggers: t } = a;
  w(e, P, "true"), y(e, x), y(e, "role"), T(e, { visibility: "" });
  const s = v.relatedTarget || t.find(ce);
  s && I(s), le(e), m(e, M), D(e, u), L(e), S(e) || V(a);
};
class we extends X {
  static selector = ge;
  static init = me;
  static getInstance = g;
  constructor(e, t) {
    super(e, t);
    const { element: s } = this;
    this.triggers = [
      ...Y(
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
    if (c(e, n) || (v.relatedTarget = s || void 0, J.relatedTarget = s || void 0, m(e, v), v.defaultPrevented)) return;
    const r = S(e);
    if (r && r !== e) {
      const d = g(r) || _(
        r,
        ie
      );
      d && d.hide();
    }
    t.backdrop ? (se(l) ? oe() : ae(e, !0), o = j(l), ne(), setTimeout(() => H(this), o)) : (H(this), r && c(l, n) && K());
  }
  hide() {
    const { element: e, relatedTarget: t } = this;
    c(e, n) && (b.relatedTarget = t || void 0, M.relatedTarget = t || void 0, m(e, b), !b.defaultPrevented && (O(e, u), D(e, n), ue(this)));
  }
  _toggleEventListeners = (e) => {
    const t = e ? A : B;
    this.triggers.forEach((s) => {
      t(s, N, pe);
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
