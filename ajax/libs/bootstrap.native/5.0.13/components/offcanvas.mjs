var U = Object.defineProperty;
var W = (o, e, t) => e in o ? U(o, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : o[e] = t;
var d = (o, e, t) => (W(o, typeof e != "symbol" ? e + "" : e, t), t);
import { createCustomEvent as b, querySelectorAll as X, getDocument as m, hasClass as l, dispatchEvent as u, getInstance as P, getElementTransitionDuration as L, addClass as O, removeClass as k, mouseclickEvent as _, emulateTransitionEnd as $, setElementStyle as C, getDocumentBody as Y, closest as q, removeAttribute as D, ariaHidden as x, setAttribute as w, ariaModal as N, focus as K, getDocumentElement as Z, keydownEvent as ee, querySelector as S, keyEscape as te } from "@thednp/shorty";
import { addListener as M, removeListener as V } from "@thednp/event-listener";
import { d as se } from "./dataBsDismiss-afbfbc79.mjs";
import { d as oe } from "./dataBsToggle-330f300b.mjs";
import { s as r } from "./showClass-f6a4d601.mjs";
import { o as c, h as ne } from "./popupContainer-82392867.mjs";
import { o as j, g as H, m as ae, a as ie, t as re, b as f, s as ce, h as z, i as le, r as fe, d as ge, f as F } from "./isVisible-19f1341e.mjs";
import { g as G } from "./getTargetElement-17dc71b9.mjs";
import { B as de } from "./base-component-a56d44ba.mjs";
import "./fadeClass-0d50d035.mjs";
const me = `.${c}`, A = `[${oe}="${c}"]`, ve = `[${se}="${c}"]`, T = `${c}-toggling`, he = {
  backdrop: !0,
  // boolean
  keyboard: !0,
  // boolean
  scroll: !1
  // boolean
}, v = (o) => P(o, j), pe = (o) => new p(o), h = b(`show.bs.${c}`), J = b(`shown.bs.${c}`), E = b(`hide.bs.${c}`), Q = b(`hidden.bs.${c}`), ue = (o) => {
  const { element: e } = o, { clientHeight: t, scrollHeight: s } = Z(e);
  ge(e, t !== s);
}, R = (o, e) => {
  const t = e ? M : V, s = m(o.element);
  t(s, ee, Ee), t(s, _, ye);
}, I = (o) => {
  const { element: e, options: t } = o;
  t.scroll || (ue(o), C(Y(e), { overflow: "hidden" })), O(e, T), O(e, r), C(e, { visibility: "visible" }), $(e, () => Oe(o));
}, be = (o) => {
  const { element: e, options: t } = o, s = H(e);
  e.blur(), !s && t.backdrop && l(f, r) && z(), $(e, () => Ce(o));
}, Te = (o) => {
  const e = q(o.target, A), t = e && G(e), s = t && v(t);
  s && (s.relatedTarget = e, s.toggle(), e && e.tagName === "A" && o.preventDefault());
}, ye = (o) => {
  const { target: e } = o, t = S(F, m(e)), s = S(ve, t), n = t && v(t);
  if (n) {
    const { options: i, triggers: a } = n, { backdrop: g } = i, y = q(e, A), B = m(t).getSelection();
    (!f.contains(e) || g !== "static") && (!(B && B.toString().length) && (!t.contains(e) && g && /* istanbul ignore next */
    (!y || a.includes(e)) || s && s.contains(e)) && (n.relatedTarget = s && s.contains(e) ? s : null, n.hide()), y && y.tagName === "A" && o.preventDefault());
  }
}, Ee = ({ code: o, target: e }) => {
  const t = S(F, m(e)), s = t && v(t);
  s && s.options.keyboard && o === te && (s.relatedTarget = null, s.hide());
}, Oe = (o) => {
  const { element: e } = o;
  k(e, T), D(e, x), w(e, N, "true"), w(e, "role", "dialog"), u(e, J), R(o, !0), K(e);
}, Ce = (o) => {
  const { element: e, triggers: t } = o;
  w(e, x, "true"), D(e, N), D(e, "role"), C(e, { visibility: "" });
  const s = h.relatedTarget || t.find(le);
  s && K(s), fe(e), u(e, Q), k(e, T), H(e) || R(o);
};
class p extends de {
  /**
   * @param target usually an `.offcanvas` element
   * @param config instance options
   */
  constructor(t, s) {
    super(t, s);
    /**
     * Toggles on/off the `click` event listeners.
     *
     * @param self the `Offcanvas` instance
     * @param add when *true*, listeners are added
     */
    d(this, "_toggleEventListeners", (t) => {
      const s = t ? M : V;
      this.triggers.forEach((n) => s(n, _, Te));
    });
    const { element: n } = this;
    this.triggers = [...X(A, m(n))].filter(
      (i) => G(i) === n
    ), this.relatedTarget = null, this._toggleEventListeners(!0);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return j;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return he;
  }
  // OFFCANVAS PUBLIC METHODS
  // ========================
  /** Shows or hides the offcanvas from the user. */
  toggle() {
    l(this.element, r) ? this.hide() : this.show();
  }
  /** Shows the offcanvas to the user. */
  show() {
    const { element: t, options: s, relatedTarget: n } = this;
    let i = 0;
    if (!l(t, r) && (h.relatedTarget = n || void 0, J.relatedTarget = n || void 0, u(t, h), !h.defaultPrevented)) {
      const a = H(t);
      if (a && a !== t) {
        const g = v(a) || /* istanbul ignore next */
        P(a, ae);
        g && g.hide();
      }
      s.backdrop ? (ne(f) ? re() : ie(t, !0), i = L(f), ce(), setTimeout(() => I(this), i)) : (I(this), a && l(f, r) && z());
    }
  }
  /** Hides the offcanvas from the user. */
  hide() {
    const { element: t, relatedTarget: s } = this;
    l(t, r) && (E.relatedTarget = s || void 0, Q.relatedTarget = s || void 0, u(t, E), E.defaultPrevented || (O(t, T), k(t, r), be(this)));
  }
  /** Removes the `Offcanvas` from the target element. */
  dispose() {
    const t = { ...this }, { element: s, options: n } = t, i = n.backdrop ? L(f) : (
      /* istanbul ignore next */
      0
    ), a = () => setTimeout(() => super.dispose(), i + 17);
    this._toggleEventListeners(), this.hide(), l(s, r) ? $(s, a) : a();
  }
}
d(p, "selector", me), d(p, "init", pe), d(p, "getInstance", v);
export {
  p as default
};
//# sourceMappingURL=offcanvas.mjs.map
