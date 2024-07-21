var O = Object.defineProperty;
var Q = (n, e, t) => e in n ? O(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var u = (n, e, t) => (Q(n, typeof e != "symbol" ? e + "" : e, t), t);
import { createCustomEvent as H, closest as S, querySelector as F, addClass as g, setAttribute as x, ariaSelected as $, Timer as C, hasClass as f, isHTMLElement as d, dispatchEvent as w, removeClass as b, emulateTransitionEnd as k, mouseclickEvent as R, getInstance as U, reflow as G, getElementsByClassName as V } from "@thednp/shorty";
import { addListener as W, removeListener as X } from "@thednp/event-listener";
import { c as B } from "./collapsingClass-dc1ed922.mjs";
import { a as l } from "./activeClass-b231b21b.mjs";
import { f as m } from "./fadeClass-0d50d035.mjs";
import { s as E } from "./showClass-f6a4d601.mjs";
import { d as I } from "./dropdownClasses-66be00d3.mjs";
import { d as Y } from "./dataBsToggle-330f300b.mjs";
import { g as P } from "./getTargetElement-17dc71b9.mjs";
import { B as Z } from "./base-component-a56d44ba.mjs";
const v = "tab", J = "Tab", D = `[${Y}="${v}"]`, K = (n) => U(n, J), tt = (n) => new T(n), L = H(`show.bs.${v}`), M = H(`shown.bs.${v}`), y = H(`hide.bs.${v}`), _ = H(`hidden.bs.${v}`), p = /* @__PURE__ */ new Map(), A = (n) => {
  const { tabContent: e, nav: t } = n;
  e && f(e, B) && (e.style.height = "", b(e, B)), t && C.clear(t);
}, j = (n) => {
  const { element: e, tabContent: t, content: s, nav: o } = n, { tab: r } = d(o) && p.get(o) || /* istanbul ignore next */
  { tab: null };
  if (t && s && f(s, m)) {
    const { currentHeight: i, nextHeight: a } = p.get(e) || /* istanbul ignore next */
    {
      currentHeight: 0,
      nextHeight: 0
    };
    i === a ? A(n) : setTimeout(() => {
      t.style.height = `${a}px`, G(t), k(t, () => A(n));
    }, 50);
  } else
    o && C.clear(o);
  M.relatedTarget = r, w(e, M);
}, q = (n) => {
  const { element: e, content: t, tabContent: s, nav: o } = n, { tab: r, content: i } = o && p.get(o) || /* istanbul ignore next */
  { tab: null, content: null };
  let a = 0;
  if (s && t && f(t, m) && ([i, t].forEach((c) => {
    d(c) && g(c, "overflow-hidden");
  }), a = d(i) ? i.scrollHeight : (
    /* istanbul ignore next */
    0
  )), L.relatedTarget = r, _.relatedTarget = e, w(e, L), !L.defaultPrevented) {
    if (t && g(t, l), i && b(i, l), s && t && f(t, m)) {
      const c = t.scrollHeight;
      p.set(e, { currentHeight: a, nextHeight: c, tab: null, content: null }), g(s, B), s.style.height = `${a}px`, G(s), [i, t].forEach((h) => {
        h && b(h, "overflow-hidden");
      });
    }
    t && t && f(t, m) ? setTimeout(() => {
      g(t, E), k(t, () => {
        j(n);
      });
    }, 1) : (t && g(t, E), j(n)), r && w(r, _);
  }
}, N = (n) => {
  const { nav: e } = n;
  if (!d(e))
    return { tab: null, content: null };
  const t = V(l, e);
  let s = null;
  t.length === 1 && !I.some((r) => f(t[0].parentElement, r)) ? [s] = t : t.length > 1 && (s = t[t.length - 1]);
  const o = d(s) ? P(s) : null;
  return { tab: s, content: o };
}, z = (n) => {
  if (!d(n))
    return null;
  const e = S(n, `.${I.join(",.")}`);
  return e ? F(`.${I[0]}-toggle`, e) : null;
}, et = (n) => {
  const e = K(n.target);
  e && (n.preventDefault(), e.show());
};
class T extends Z {
  /** @param target the target element */
  constructor(t) {
    super(t);
    /**
     * Toggles on/off the `click` event listener.
     *
     * @param add when `true`, event listener is added
     */
    u(this, "_toggleEventListeners", (t) => {
      (t ? W : X)(this.element, R, et);
    });
    const { element: s } = this, o = P(s);
    if (o) {
      const r = S(s, ".nav"), i = S(o, ".tab-content");
      this.nav = r, this.content = o, this.tabContent = i, this.dropdown = z(s);
      const { tab: a } = N(this);
      if (r && !a) {
        const c = F(D, r), h = c && P(c);
        h && (g(c, l), g(h, E), g(h, l), x(s, $, "true"));
      }
      this._toggleEventListeners(!0);
    }
  }
  /**
   * Returns component name string.
   */
  get name() {
    return J;
  }
  // TAB PUBLIC METHODS
  // ==================
  /** Shows the tab to the user. */
  show() {
    const { element: t, content: s, nav: o, dropdown: r } = this;
    if (!(o && C.get(o)) && !f(t, l)) {
      const { tab: i, content: a } = N(this);
      if (o && p.set(o, { tab: i, content: a, currentHeight: 0, nextHeight: 0 }), y.relatedTarget = t, d(i) && (w(i, y), !y.defaultPrevented)) {
        g(t, l), x(t, $, "true");
        const c = d(i) && z(i);
        if (c && f(c, l) && b(c, l), o) {
          const h = () => {
            i && (b(i, l), x(i, $, "false")), r && !f(r, l) && g(r, l);
          };
          a && (f(a, m) || s && f(s, m)) ? C.set(o, h, 1) : h();
        }
        a && (b(a, E), f(a, m) ? k(a, () => q(this)) : q(this));
      }
    }
  }
  /** Removes the `Tab` component from the target element. */
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
u(T, "selector", D), u(T, "init", tt), u(T, "getInstance", K);
export {
  T as default
};
//# sourceMappingURL=tab.mjs.map
