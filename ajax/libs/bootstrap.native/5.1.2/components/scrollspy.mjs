import { B as H, W as x, d as T, M as C, N as B, K as d, a6 as D, t as O, m as k, a7 as S, _ as p, a as z, G as b, Z as G, P as M, E as N, r as W, v as Z } from "./base-component-BMXjNJAi.mjs";
import { y as $ } from "./index-CnhA8i0D.mjs";
import { a as f } from "./activeClass-iqaD75Su.mjs";
import { i as q } from "./isDisabled-BG5MoQVt.mjs";
const F = "scrollspy", I = "ScrollSpy", K = '[data-bs-spy="scroll"]', P = "[href]", Q = {
  offset: 10,
  target: void 0
}, j = (o) => O(o, I), J = (o) => new U(o), _ = k(`activate.bs.${F}`), R = (o) => {
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
      p(t, f) && z(t, f);
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
  _.relatedTarget = t, G(e, _);
}, g = (o, t) => {
  const { scrollTarget: r, element: e, options: s } = o;
  return (r !== e ? M(t).top + r.scrollTop : t.offsetTop) - (s.offset || 10);
};
class U extends H {
  static selector = K;
  static init = J;
  static getInstance = j;
  constructor(t, r) {
    super(t, r);
    const { element: e, options: s } = this, n = x(
      s.target,
      T(e)
    );
    n && (this.target = n, this.scrollTarget = e.clientHeight < e.scrollHeight ? e : C(e), this._observables = /* @__PURE__ */ new Map(), this.refresh(), this._observer = new $(() => {
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
    const r = B(t.target, P), e = r && d(r, "href")?.slice(1), s = e && D(e, this.target);
    s && (this.scrollTarget.scrollTo({
      top: s.offsetTop,
      behavior: "smooth"
    }), t.preventDefault());
  };
  _toggleEventListeners = (t) => {
    const { target: r, _observables: e, _observer: s, _scrollTo: n } = this;
    (t ? N : W)(r, Z, n), t ? e?.forEach((a, i) => s.observe(i)) : s.disconnect();
  };
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
export {
  U as default
};
//# sourceMappingURL=scrollspy.mjs.map
