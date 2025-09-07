import { B as H, t as x, W as C, d as T, P as O, N as B, K as d, a7 as D, E as P, r as k, v as z, a8 as S, G as b, _ as p, m as G, Z as N, R as W, a as Z } from "./base-component-BazRqYWL.mjs";
import { P as q } from "./index-K6w9MeGG.mjs";
import { a as f } from "./activeClass-iqaD75Su.mjs";
import { i as F } from "./isDisabled-CipSDrHr.mjs";
const K = "scrollspy", I = "ScrollSpy", M = '[data-bs-spy="scroll"]', Q = "[href]", R = {
  offset: 10,
  target: void 0
}, $ = (o) => x(o, I), j = (o) => new U(o), _ = G(`activate.bs.${K}`), J = (o) => {
  const {
    target: t,
    _itemsLength: r,
    _observables: e
  } = o, s = S("A", t), n = T(t);
  !s.length || r === e.size || (e.clear(), Array.from(s).forEach((a) => {
    const l = d(a, "href")?.slice(1), i = l?.length ? n.getElementById(l) : null;
    i && !F(a) && o._observables.set(i, a);
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
  static selector = M;
  static init = j;
  static getInstance = $;
  constructor(t, r) {
    super(t, r);
    const { element: e, options: s } = this, n = C(
      s.target,
      T(e)
    );
    n && (this.target = n, this.scrollTarget = e.clientHeight < e.scrollHeight ? e : O(e), this._observables = /* @__PURE__ */ new Map(), this.refresh(), this._observer = new q(() => {
      requestAnimationFrame(() => this.refresh());
    }, {
      root: this.scrollTarget
    }), this._toggleEventListeners(!0));
  }
  get name() {
    return I;
  }
  get defaults() {
    return R;
  }
  refresh = () => {
    const { target: t, scrollTarget: r } = this;
    if (!t || t.offsetHeight === 0) return;
    J(this);
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
      const [w, m] = a[c], L = g(this, w), u = a[c + 1]?.[0], v = u ? g(this, u) : null;
      if (n !== m && l >= L && (v === null || l < v)) {
        y(this, m);
        break;
      }
    }
  };
  _scrollTo = (t) => {
    const r = B(t.target, Q), e = r && d(r, "href")?.slice(1), s = e && D(e, this.target);
    s && (this.scrollTarget.scrollTo({
      top: s.offsetTop,
      behavior: "smooth"
    }), t.preventDefault());
  };
  _toggleEventListeners = (t) => {
    const { target: r, _observables: e, _observer: s, _scrollTo: n } = this;
    (t ? P : k)(r, z, n), t ? e?.forEach((l, i) => s.observe(i)) : s.disconnect();
  };
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
export {
  U as default
};
//# sourceMappingURL=scrollspy.mjs.map
