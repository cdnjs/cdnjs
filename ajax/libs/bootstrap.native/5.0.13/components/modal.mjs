var se = Object.defineProperty;
var oe = (s, t, e) => t in s ? se(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[t] = e;
var h = (s, t, e) => (oe(s, typeof t != "symbol" ? t + "" : t, e), e);
import { createCustomEvent as S, querySelector as F, querySelectorAll as ae, getDocument as D, hasClass as r, dispatchEvent as b, getInstance as I, getElementTransitionDuration as x, removeClass as P, setAttribute as R, ariaHidden as _, removeAttribute as q, ariaModal as W, emulateTransitionEnd as p, mouseclickEvent as z, getDocumentElement as ne, isRTL as ie, setElementStyle as y, getDocumentBody as le, addClass as K, closest as N, focus as V, getWindow as re, resizeEvent as ce, passiveHandler as de, keydownEvent as me, keyEscape as ge, Timer as E } from "@thednp/shorty";
import { addListener as j, removeListener as G } from "@thednp/event-listener";
import { d as he } from "./dataBsToggle-330f300b.mjs";
import { d as fe } from "./dataBsDismiss-afbfbc79.mjs";
import { f as pe } from "./fadeClass-0d50d035.mjs";
import { s as c } from "./showClass-f6a4d601.mjs";
import { m as d, h as ue } from "./popupContainer-82392867.mjs";
import { m as J, g as k, o as ve, a as Te, t as be, b as f, s as ye, h as Q, c as Ee, d as Se, r as De, i as we, e as ke } from "./isVisible-19f1341e.mjs";
import { g as U } from "./getTargetElement-17dc71b9.mjs";
import { B as Ce } from "./base-component-a56d44ba.mjs";
const He = `.${d}`, X = `[${he}="${d}"]`, $e = `[${fe}="${d}"]`, Y = `${d}-static`, Me = {
  backdrop: !0,
  keyboard: !0
}, u = (s) => I(s, J), Oe = (s) => new T(s), v = S(`show.bs.${d}`), $ = S(`shown.bs.${d}`), w = S(`hide.bs.${d}`), M = S(`hidden.bs.${d}`), Z = (s) => {
  const { element: t } = s, e = Ee(t), { clientHeight: o, scrollHeight: a } = ne(t), { clientHeight: n, scrollHeight: m } = t, g = n !== m;
  if (!g && e) {
    const i = ie(t) ? (
      /* istanbul ignore next */
      "paddingLeft"
    ) : "paddingRight", l = {};
    l[i] = `${e}px`, y(t, l);
  }
  Se(t, g || o !== a);
}, ee = (s, t) => {
  const e = t ? j : G, { element: o, update: a } = s;
  e(o, z, Be), e(re(o), ce, a, de), e(D(o), me, Ae);
}, O = (s) => {
  const { triggers: t, element: e, relatedTarget: o } = s;
  De(e), y(e, { paddingRight: "", display: "" }), ee(s);
  const a = v.relatedTarget || t.find(we);
  a && V(a), M.relatedTarget = o, b(e, M);
}, L = (s) => {
  const { element: t, relatedTarget: e } = s;
  V(t), ee(s, !0), $.relatedTarget = e, b(t, $);
}, A = (s) => {
  const { element: t, hasFade: e } = s;
  y(t, { display: "block" }), Z(s), k(t) || y(le(t), { overflow: "hidden" }), K(t, c), q(t, _), R(t, W, "true"), e ? p(t, () => L(s)) : L(s);
}, B = (s) => {
  const { element: t, options: e, hasFade: o } = s;
  e.backdrop && o && r(f, c) && !k(t) ? (Q(), p(f, () => O(s))) : O(s);
}, Le = (s) => {
  const { target: t } = s, e = t && N(t, X), o = e && U(e), a = o && u(o);
  a && (e && e.tagName === "A" && s.preventDefault(), a.relatedTarget = e, a.toggle());
}, Ae = ({ code: s, target: t }) => {
  const e = F(ke, D(t)), o = e && u(e);
  if (o) {
    const { options: a } = o;
    a.keyboard && s === ge && // the keyboard option is enabled and the key is 27
    r(e, c) && (o.relatedTarget = null, o.hide());
  }
}, Be = (s) => {
  var o, a;
  const { currentTarget: t } = s, e = t ? u(t) : null;
  if (e && t && !E.get(t)) {
    const { options: n, isStatic: m, modalDialog: g } = e, { backdrop: i } = n, { target: l } = s, te = (a = (o = D(t)) == null ? void 0 : o.getSelection()) == null ? void 0 : a.toString().length, C = g.contains(l), H = l && N(l, $e);
    m && !C ? E.set(
      t,
      () => {
        K(t, Y), p(g, () => Fe(e));
      },
      17
    ) : (H || !te && !m && !C && i) && (e.relatedTarget = H || null, e.hide(), s.preventDefault());
  }
}, Fe = (s) => {
  const { element: t, modalDialog: e } = s, o = (x(e) || 0) + 17;
  P(t, Y), E.set(t, () => E.clear(t), o);
};
class T extends Ce {
  /**
   * @param target usually the `.modal` element
   * @param config instance options
   */
  constructor(e, o) {
    super(e, o);
    /**
     * Updates the modal layout.
     */
    h(this, "update", () => {
      r(this.element, c) && Z(this);
    });
    /**
     * Toggles on/off the `click` event listener of the `Modal` instance.
     *
     * @param add when `true`, event listener(s) is/are added
     */
    h(this, "_toggleEventListeners", (e) => {
      const o = e ? j : G, { triggers: a } = this;
      a.length && a.forEach((n) => o(n, z, Le));
    });
    const { element: a } = this, n = F(`.${d}-dialog`, a);
    n && (this.modalDialog = n, this.triggers = [...ae(X, D(a))].filter(
      (m) => U(m) === a
    ), this.isStatic = this.options.backdrop === "static", this.hasFade = r(a, pe), this.relatedTarget = null, this._toggleEventListeners(!0));
  }
  /**
   * Returns component name string.
   */
  get name() {
    return J;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return Me;
  }
  // MODAL PUBLIC METHODS
  // ====================
  /** Toggles the visibility of the modal. */
  toggle() {
    r(this.element, c) ? this.hide() : this.show();
  }
  /** Shows the modal to the user. */
  show() {
    const { element: e, options: o, hasFade: a, relatedTarget: n } = this, { backdrop: m } = o;
    let g = 0;
    if (!r(e, c) && (v.relatedTarget = n || void 0, b(e, v), !v.defaultPrevented)) {
      const i = k(e);
      if (i && i !== e) {
        const l = u(i) || /* istanbul ignore next */
        I(i, ve);
        l && l.hide();
      }
      m ? (ue(f) ? be(!0) : Te(e, a, !0), g = x(f), ye(), setTimeout(() => A(this), g)) : (A(this), i && r(f, c) && Q());
    }
  }
  /** Hide the modal from the user. */
  hide() {
    const { element: e, hasFade: o, relatedTarget: a } = this;
    r(e, c) && (w.relatedTarget = a || void 0, b(e, w), w.defaultPrevented || (P(e, c), R(e, _, "true"), q(e, W), o ? p(e, () => B(this)) : B(this)));
  }
  /** Removes the `Modal` component from target element. */
  dispose() {
    const e = { ...this }, { element: o, modalDialog: a } = e, n = () => super.dispose();
    this._toggleEventListeners(), this.hide(), r(o, "fade") ? p(a, n) : n();
  }
}
h(T, "selector", He), h(T, "init", Oe), h(T, "getInstance", u);
export {
  T as default
};
//# sourceMappingURL=modal.mjs.map
