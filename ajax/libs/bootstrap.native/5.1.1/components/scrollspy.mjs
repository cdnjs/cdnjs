import { B as H, H as k, d as T, L as x, S as C, k as S, a6 as q, X as B, p as D, a7 as d, G as p, q as G, K as b, a as O, M as z, E as K, r as M, g as X } from "./base-component--xj9oMJ8.mjs";
import { v as j } from "./index-ClQArkrm.mjs";
import { a as f } from "./activeClass-iqaD75Su.mjs";
import { i as F } from "./isDisabled-Dh1obUSx.mjs";
const W = "scrollspy", I = "ScrollSpy", $ = '[data-bs-spy="scroll"]', J = "[href]", N = {
  offset: 10,
  target: void 0
}, P = (o) => B(o, I), Q = (o) => new U(o), _ = D(`activate.bs.${W}`), R = (o) => {
  const {
    target: t,
    _itemsLength: r,
    _observables: e
  } = o, s = d("A", t), n = T(t);
  !s.length || r === e.size || (e.clear(), Array.from(s).forEach((a) => {
    const l = S(a, "href")?.slice(1), i = l?.length ? n.getElementById(l) : null;
    i && !F(a) && o._observables.set(i, a);
  }), o._itemsLength = o._observables.size);
}, E = (o) => {
  Array.from(d("A", o)).forEach(
    (t) => {
      p(t, f) && G(t, f);
    }
  );
}, y = (o, t) => {
  const { target: r, element: e } = o;
  E(r), o._activeItem = t, b(t, f);
  let s = t;
  for (; s !== r; )
    if (s = s.parentElement, ["nav", "dropdown-menu", "list-group"].some(
      (n) => p(s, n)
    )) {
      const n = s.previousElementSibling;
      n && !p(n, f) && b(n, f);
    }
  _.relatedTarget = t, O(e, _);
}, g = (o, t) => {
  const { scrollTarget: r, element: e, options: s } = o;
  return (r !== e ? z(t).top + r.scrollTop : t.offsetTop) - (s.offset || 10);
};
class U extends H {
  static selector = $;
  static init = Q;
  static getInstance = P;
  constructor(t, r) {
    super(t, r);
    const { element: e, options: s } = this, n = k(
      s.target,
      T(e)
    );
    n && (this.target = n, this.scrollTarget = e.clientHeight < e.scrollHeight ? e : x(e), this._observables = /* @__PURE__ */ new Map(), this.refresh(), this._observer = new j(() => {
      requestAnimationFrame(() => this.refresh());
    }, {
      root: this.scrollTarget
    }), this._toggleEventListeners(!0));
  }
  get name() {
    return I;
  }
  get defaults() {
    return N;
  }
  refresh = () => {
    const { target: t, scrollTarget: r } = this;
    if (!t || t.offsetHeight === 0) return;
    R(this);
    const { _itemsLength: e, _observables: s, _activeItem: n } = this;
    if (!e) return;
    const a = s.entries().toArray(), { scrollTop: l, scrollHeight: i, clientHeight: A } = r;
    if (l >= i - A) {
      const c = a[e - 1]?.[1];
      n !== c && y(this, c);
      return;
    }
    const h = a[0]?.[0] ? g(this, a[0][0]) : null;
    if (h !== null && l < h && h > 0) {
      this._activeItem = null, E(t);
      return;
    }
    for (let c = 0; c < e; c += 1) {
      const [L, m] = a[c], w = g(this, L), u = a[c + 1]?.[0], v = u ? g(this, u) : null;
      if (n !== m && l >= w && (v === null || l < v)) {
        y(this, m);
        break;
      }
    }
  };
  _scrollTo = (t) => {
    const r = C(t.target, J), e = r && S(r, "href")?.slice(1), s = e && q(e, this.target);
    s && (this.scrollTarget.scrollTo({
      top: s.offsetTop,
      behavior: "smooth"
    }), t.preventDefault());
  };
  _toggleEventListeners = (t) => {
    const { target: r, _observables: e, _observer: s, _scrollTo: n } = this;
    (t ? K : M)(r, X, n), t ? e?.forEach((l, i) => s.observe(i)) : s.disconnect();
  };
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
export {
  U as default
};
//# sourceMappingURL=scrollspy.mjs.map
