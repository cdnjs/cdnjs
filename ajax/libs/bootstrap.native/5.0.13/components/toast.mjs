var P = Object.defineProperty;
var N = (s, t, e) => t in s ? P(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[t] = e;
var a = (s, t, e) => (N(s, typeof t != "symbol" ? t + "" : t, e), e);
import { createCustomEvent as v, hasClass as w, addClass as d, removeClass as c, querySelector as j, querySelectorAll as z, getDocument as F, dispatchEvent as u, mouseclickEvent as C, focusinEvent as b, focusoutEvent as G, mouseenterEvent as L, mouseleaveEvent as J, getInstance as K, reflow as B, emulateTransitionEnd as I, Timer as r, closest as M } from "@thednp/shorty";
import { addListener as O, removeListener as Q } from "@thednp/event-listener";
import { f } from "./fadeClass-0d50d035.mjs";
import { s as p } from "./showClass-f6a4d601.mjs";
import { d as R } from "./dataBsDismiss-afbfbc79.mjs";
import { d as U } from "./dataBsToggle-330f300b.mjs";
import { g as k } from "./getTargetElement-17dc71b9.mjs";
import { B as V } from "./base-component-a56d44ba.mjs";
const i = "toast", _ = "Toast", W = `.${i}`, X = `[${R}="${i}"]`, q = `[${U}="${i}"]`, l = "showing", x = "hide", Y = {
  animation: !0,
  autohide: !0,
  delay: 5e3
}, T = (s) => K(s, _), Z = (s) => new g(s), S = v(`show.bs.${i}`), tt = v(`shown.bs.${i}`), $ = v(`hide.bs.${i}`), et = v(`hidden.bs.${i}`), y = (s) => {
  const { element: t, options: e } = s;
  c(t, l), r.clear(t, l), u(t, tt), e.autohide && r.set(t, () => s.hide(), e.delay, i);
}, D = (s) => {
  const { element: t } = s;
  c(t, l), c(t, p), d(t, x), r.clear(t, i), u(t, et);
}, st = (s) => {
  const { element: t, options: e } = s;
  d(t, l), e.animation ? (B(t), I(t, () => D(s))) : D(s);
}, ot = (s) => {
  const { element: t, options: e } = s;
  r.set(
    t,
    () => {
      c(t, x), B(t), d(t, p), d(t, l), e.animation ? I(t, () => y(s)) : y(s);
    },
    17,
    l
  );
}, nt = (s) => {
  r.clear(s.element, i), s._toggleEventListeners();
}, it = (s) => {
  const { target: t } = s, e = t && M(t, q), o = e && k(e), n = o && T(o);
  n && (e && e.tagName === "A" && s.preventDefault(), n.relatedTarget = e, n.show());
}, at = (s) => {
  const t = s.target, e = T(t), { type: o, relatedTarget: n } = s;
  e && t !== n && !t.contains(n) && ([L, b].includes(o) ? r.clear(t, i) : r.set(t, () => e.hide(), e.options.delay, i));
};
class g extends V {
  /**
   * @param target the target `.toast` element
   * @param config the instance options
   */
  constructor(e, o) {
    super(e, o);
    // TOAST PUBLIC METHODS
    // ====================
    /** Shows the toast. */
    a(this, "show", () => {
      const { element: e, isShown: o } = this;
      e && !o && (u(e, S), S.defaultPrevented || ot(this));
    });
    /** Hides the toast. */
    a(this, "hide", () => {
      const { element: e, isShown: o } = this;
      e && o && (u(e, $), $.defaultPrevented || st(this));
    });
    /**
     * Toggles on/off the `click` event listener.
     *
     * @param add when `true`, it will add the listener
     */
    a(this, "_toggleEventListeners", (e) => {
      const o = e ? O : Q, { element: n, triggers: m, dismiss: h, options: A, hide: H } = this;
      h && o(h, C, H), A.autohide && [b, G, L, J].forEach(
        (E) => o(n, E, at)
      ), m.length && m.forEach((E) => o(E, C, it));
    });
    const { element: n, options: m } = this;
    m.animation && !w(n, f) ? d(n, f) : !m.animation && w(n, f) && c(n, f), this.dismiss = j(X, n), this.triggers = [...z(q, F(n))].filter(
      (h) => k(h) === n
    ), this._toggleEventListeners(!0);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return _;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return Y;
  }
  /**
   * Returns *true* when toast is visible.
   */
  get isShown() {
    return w(this.element, p);
  }
  /** Removes the `Toast` component from the target element. */
  dispose() {
    const { element: e, isShown: o } = this;
    o && c(e, p), nt(this), super.dispose();
  }
}
a(g, "selector", W), a(g, "init", Z), a(g, "getInstance", T);
export {
  g as default
};
//# sourceMappingURL=toast.mjs.map
