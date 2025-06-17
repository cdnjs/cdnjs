import { B as H, t as x, W as C, d as T, M as B, N as D, K as d, a6 as O, E as k, r as z, v as G, a7 as S, G as b, _ as p, m as M, Z as N, P as W, a as Z } from "./base-component-BO-nCUu-.mjs";
import { y as $ } from "./index-D1X0IOXl.mjs";
import { a as f } from "./activeClass-iqaD75Su.mjs";
import { i as q } from "./isDisabled-BnHBewNm.mjs";
const F = "scrollspy", I = "ScrollSpy", K = '[data-bs-spy="scroll"]', P = "[href]", Q = {
  offset: 10,
  target: void 0
}, j = (o) => x(o, I), J = (o) => new U(o), _ = M(`activate.bs.${F}`), R = (o) => {
  const {
    target: t,
    _itemsLength: r,
    _observables: e
  } = o, s = S("A", t), n = T(t);
  !s.length || r === e.size || (e.clear(), Array.from(s).forEach((l) => {
    const a = d(l, "href")?.slice(1), i = a?.length ? n.getElementById(a) : null;
    i && !q(l) && o._observables.set(i, l);
  }), o._itemsLength = o._observables.size);
}, E = (o) => {
  Array.from(S("A", o)).forEach(
    (t) => {
      p(t, f) && Z(t, f);
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
  _.relatedTarget = t, N(e, _);
}, g = (o, t) => {
  const { scrollTarget: r, element: e, options: s } = o;
  return (r !== e ? W(t).top + r.scrollTop : t.offsetTop) - (s.offset || 10);
};
class U extends H {
  static selector = K;
  static init = J;
  static getInstance = j;
  constructor(t, r) {
    super(t, r);
    const { element: e, options: s } = this, n = C(
      s.target,
      T(e)
    );
    n && (this.target = n, this.scrollTarget = e.clientHeight < e.scrollHeight ? e : B(e), this._observables = /* @__PURE__ */ new Map(), this.refresh(), this._observer = new $(() => {
      requestAnimationFrame(() => this.refresh());
    }, {
      root: this.scrollTarget
    }), this._toggleEventListeners(!0));
  }
  get name() {
    return I;
  }
  get defaults() {
    return Q;
  }
  refresh = () => {
    const { target: t, scrollTarget: r } = this;
    if (!t || t.offsetHeight === 0) return;
    R(this);
    const { _itemsLength: e, _observables: s, _activeItem: n } = this;
    if (!e) return;
    const l = s.entries().toArray(), { scrollTop: a, scrollHeight: i, clientHeight: A } = r;
    if (a >= i - A) {
      const c = l[e - 1]?.[1];
      n !== c && y(this, c);
      return;
    }
    const h = l[0]?.[0] ? g(this, l[0][0]) : null;
    if (h !== null && a < h && h > 0) {
      this._activeItem = null, E(t);
      return;
    }
    for (let c = 0; c < e; c += 1) {
      const [w, m] = l[c], L = g(this, w), u = l[c + 1]?.[0], v = u ? g(this, u) : null;
      if (n !== m && a >= L && (v === null || a < v)) {
        y(this, m);
        break;
      }
    }
  };
  _scrollTo = (t) => {
    const r = D(t.target, P), e = r && d(r, "href")?.slice(1), s = e && O(e, this.target);
    s && (this.scrollTarget.scrollTo({
      top: s.offsetTop,
      behavior: "smooth"
    }), t.preventDefault());
  };
  _toggleEventListeners = (t) => {
    const { target: r, _observables: e, _observer: s, _scrollTo: n } = this;
    (t ? k : z)(r, G, n), t ? e?.forEach((a, i) => s.observe(i)) : s.disconnect();
  };
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
export {
  U as default
};
//# sourceMappingURL=scrollspy.mjs.map
