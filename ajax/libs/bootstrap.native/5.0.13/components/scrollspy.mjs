var D = Object.defineProperty;
var W = (t, s, e) => s in t ? D(t, s, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[s] = e;
var h = (t, s, e) => (W(t, typeof s != "symbol" ? s + "" : s, e), e);
import { createCustomEvent as _, querySelector as L, getDocument as S, getWindow as k, isHTMLElement as v, scrollEvent as q, passiveHandler as G, getInstance as M, isWindow as C, getElementsByTagName as w, getAttribute as N, getBoundingClientRect as b, getDocumentElement as O, hasClass as u, removeClass as R, addClass as y, getDocumentBody as Y, dispatchEvent as $ } from "@thednp/shorty";
import { addListener as j, removeListener as z } from "@thednp/event-listener";
import { a as m } from "./activeClass-b231b21b.mjs";
import { B as F } from "./base-component-a56d44ba.mjs";
const J = "scrollspy", A = "ScrollSpy", K = '[data-bs-spy="scroll"]', P = {
  offset: 10,
  target: null
}, Q = (t) => M(t, A), U = (t) => new d(t), I = _(`activate.bs.${J}`), V = (t) => {
  const { target: s, scrollTarget: e, options: n, itemsLength: r, scrollHeight: o, element: a } = t, { offset: i } = n, l = C(e), c = s && w("A", s), g = e ? B(e) : (
    /* istanbul ignore next */
    o
  );
  if (t.scrollTop = l ? e.scrollY : e.scrollTop, c && (g !== o || r !== c.length)) {
    let p, f, E;
    t.items = [], t.offsets = [], t.scrollHeight = g, t.maxScroll = t.scrollHeight - X(t), [...c].forEach((H) => {
      p = N(H, "href"), f = p && p.charAt(0) === "#" && p.slice(-1) !== "#" && L(p, S(a)), f && (t.items.push(H), E = b(f), t.offsets.push((l ? E.top + t.scrollTop : f.offsetTop) - i));
    }), t.itemsLength = t.items.length;
  }
}, B = (t) => v(t) ? t.scrollHeight : O(t).scrollHeight, X = ({ element: t, scrollTarget: s }) => C(s) ? s.innerHeight : b(t).height, x = (t) => {
  [...w("A", t)].forEach((s) => {
    u(s, m) && R(s, m);
  });
}, T = (t, s) => {
  const { target: e, element: n } = t;
  v(e) && x(e), t.activeItem = s, y(s, m);
  const r = [];
  let o = s;
  for (; o !== Y(n); )
    o = o.parentElement, (u(o, "nav") || u(o, "dropdown-menu")) && r.push(o);
  r.forEach((a) => {
    const i = a.previousElementSibling;
    i && !u(i, m) && y(i, m);
  }), I.relatedTarget = s, $(n, I);
};
class d extends F {
  /**
   * @param target the target element
   * @param config the instance options
   */
  constructor(e, n) {
    super(e, n);
    /* eslint-enable */
    // SCROLLSPY PUBLIC METHODS
    // ========================
    /** Updates all items. */
    h(this, "refresh", () => {
      const { target: e } = this;
      if (v(e) && e.offsetHeight > 0) {
        V(this);
        const { scrollTop: n, maxScroll: r, itemsLength: o, items: a, activeItem: i } = this;
        if (n >= r) {
          const c = a[o - 1];
          i !== c && T(this, c);
          return;
        }
        const { offsets: l } = this;
        if (i && n < l[0] && l[0] > 0) {
          this.activeItem = null, e && x(e);
          return;
        }
        a.forEach((c, g) => {
          i !== c && n >= l[g] && (typeof l[g + 1] > "u" || n < l[g + 1]) && T(this, c);
        });
      }
    });
    /**
     * Toggles on/off the component event listener.
     *
     * @param add when `true`, listener is added
     */
    h(this, "_toggleEventListeners", (e) => {
      (e ? j : z)(this.scrollTarget, q, this.refresh, G);
    });
    const { element: r, options: o } = this;
    this.target = L(o.target, S(r)), this.target && (this.scrollTarget = r.clientHeight < r.scrollHeight ? r : k(r), this.scrollHeight = B(this.scrollTarget), this._toggleEventListeners(!0), this.refresh());
  }
  /* eslint-disable */
  /**
   * Returns component name string.
   */
  get name() {
    return A;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return P;
  }
  /** Removes `ScrollSpy` from the target element. */
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
h(d, "selector", K), h(d, "init", U), h(d, "getInstance", Q);
export {
  d as default
};
//# sourceMappingURL=scrollspy.mjs.map
