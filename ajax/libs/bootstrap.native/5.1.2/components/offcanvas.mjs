import { B as X, c as Y, d as f, _ as c, Z as m, t as _, u as j, G as O, a as D, s as E, m as h, x as T, a0 as q, $ as y, a1 as A, Q as w, a2 as B, J as N, a3 as P, E as x, r as I, M as z, k as F, v as L, W as C, N as R, Y as U } from "./base-component-BMXjNJAi.mjs";
import { d as ee } from "./dataBsDismiss-DdNPQYa-.mjs";
import { d as te } from "./dataBsToggle-B84TS15h.mjs";
import { s as n } from "./showClass-C8hdJfjQ.mjs";
import { h as se, o as i } from "./popupContainer-BY58HXTH.mjs";
import { d as G, g as S, a as ae, t as oe, s as ne, h as K, o as l, i as ie, r as re, m as ce, c as le, f as Q } from "./isVisible-8OcOPiZa.mjs";
import { g as W } from "./getTargetElement-px782XHx.mjs";
import { i as fe } from "./isDisabled-BG5MoQVt.mjs";
const ge = `.${i}`, Z = `[${te}="${i}"]`, de = `[${ee}="${i}"]`, u = `${i}-toggling`, ve = {
  backdrop: !0,
  keyboard: !0,
  scroll: !1
}, g = (a) => _(a, G), me = (a) => new we(a), v = h(`show.bs.${i}`), J = h(`shown.bs.${i}`), b = h(`hide.bs.${i}`), M = h(`hidden.bs.${i}`), he = (a) => {
  const { element: e } = a, { clientHeight: t, scrollHeight: s } = z(e);
  le(e, t !== s);
}, V = (a, e) => {
  const t = e ? x : I, s = f(a.element);
  t(s, F, Oe), t(s, L, be);
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
  const { options: r, triggers: d } = o, { backdrop: $ } = r, p = R(e, Z), k = f(t).getSelection();
  l.contains(e) && $ === "static" || (!(k && k.toString().length) && (!t.contains(e) && $ && (!p || d.includes(e)) || s && s.contains(e)) && (o.relatedTarget = s && s.contains(e) ? s : void 0, o.hide()), p && p.tagName === "A" && a.preventDefault());
}, Oe = ({ code: a, target: e }) => {
  const t = C(
    Q,
    f(e)
  ), s = t && g(t);
  s && s.options.keyboard && a === U && (s.relatedTarget = void 0, s.hide());
}, Te = (a) => {
  const { element: e } = a;
  D(e, u), y(e, A), w(e, B, "true"), w(e, "role", "dialog"), m(e, J), V(a, !0), N(e), P(e);
}, ye = (a) => {
  const { element: e, triggers: t } = a;
  w(e, A, "true"), y(e, B), y(e, "role"), T(e, { visibility: "" });
  const s = v.relatedTarget || t.find(ie);
  s && N(s), re(e), m(e, M), D(e, u), P(e), S(e) || V(a);
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
        ce
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
    const t = e ? x : I;
    this.triggers.forEach((s) => {
      t(s, L, pe);
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
