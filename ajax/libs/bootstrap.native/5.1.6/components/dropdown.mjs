import { N as it, J as R, K as S, B as bt, t as Dt, j as at, m, Z as u, G as U, Q as Z, L as T, a as z, E as dt, r as ct, C as J, v as M, M as Ct, H as $t, _ as V, y as x, P as yt, R as Pt, T as X, d as F, S as lt, k as xt, U as At, o as Ht, V as St, X as _, Y as N, $ as Tt } from "./base-component-BazRqYWL.mjs";
import { P as _t } from "./index-K6w9MeGG.mjs";
import { s as f } from "./showClass-C8hdJfjQ.mjs";
import { d as pt } from "./dataBsToggle-B84TS15h.mjs";
import { d as D } from "./dropdownClasses-CdCdZ-PX.mjs";
import { i as Nt } from "./isDisabled-CipSDrHr.mjs";
const ut = "Dropdown", ft = "dropdown-menu", ht = (n) => {
  const t = it(n, "A");
  return n.tagName === "A" && R(n, "href") && S(n, "href")?.slice(-1) === "#" || t && R(t, "href") && S(t, "href")?.slice(-1) === "#";
}, [p, j, I, L] = D, jt = `[${pt}="${p}"]`, h = (n) => Dt(n, ut), It = (n) => new kt(n), Lt = `${ft}-end`, Y = [p, j], q = [I, L], tt = ["A", "BUTTON"], Mt = {
  offset: 5,
  display: "dynamic"
}, A = m(
  `show.bs.${p}`
), et = m(
  `shown.bs.${p}`
), H = m(
  `hide.bs.${p}`
), nt = m(`hidden.bs.${p}`), mt = m(`updated.bs.${p}`), ot = (n) => {
  const { element: t, menu: e, parentElement: i, options: s } = n, { offset: o } = s;
  if (Ct(e, "position") === "static") return;
  const r = $t(t), a = V(e, Lt);
  ["margin", "top", "bottom", "left", "right"].forEach((c) => {
    const Q = {};
    Q[c] = "", x(e, Q);
  });
  let d = D.find((c) => V(i, c)) || p;
  const gt = {
    dropdown: [o, 0, 0],
    dropup: [0, 0, o],
    dropstart: r ? [-1, 0, 0, o] : [-1, o, 0],
    dropend: r ? [-1, o, 0] : [-1, 0, 0, o]
  }, g = {
    dropdown: { top: "100%" },
    dropup: { top: "auto", bottom: "100%" },
    dropstart: r ? { left: "100%", right: "auto" } : { left: "auto", right: "100%" },
    dropend: r ? { left: "auto", right: "100%" } : { left: "100%", right: "auto" },
    menuStart: r ? { right: "0", left: "auto" } : { right: "auto", left: "0" },
    menuEnd: r ? { right: "auto", left: "0" } : { right: "0", left: "auto" }
  }, { offsetWidth: w, offsetHeight: C } = e, { clientWidth: B, clientHeight: W } = yt(t), {
    left: E,
    top: $,
    width: k,
    height: wt
  } = Pt(t), y = E - w - o < 0, P = E + w + k + o >= B, Et = $ + C + o >= W, G = $ + C + wt + o >= W, K = $ - C - o < 0, v = (!r && a || r && !a) && E + k - w < 0, b = (r && a || !r && !a) && E + w >= B;
  if (q.includes(d) && y && P && (d = p), d === I && (r ? P : y) && (d = L), d === L && (r ? y : P) && (d = I), d === j && K && !G && (d = p), d === p && G && !K && (d = j), q.includes(d) && Et && X(g[d], {
    top: "auto",
    bottom: 0
  }), Y.includes(d) && (v || b)) {
    let c = { left: "auto", right: "auto" };
    !v && b && !r && (c = { left: "auto", right: 0 }), v && !b && r && (c = { left: 0, right: "auto" }), c && X(g[d], c);
  }
  const vt = gt[d];
  x(e, {
    ...g[d],
    margin: `${vt.map((c) => c && `${c}px`).join(" ")}`
  }), Y.includes(d) && a && a && x(e, g[!r && v || r && b ? "menuStart" : "menuEnd"]), u(i, mt);
}, Ft = (n) => Array.from(n.children).map((t) => {
  if (t && tt.includes(t.tagName)) return t;
  const { firstElementChild: e } = t;
  return e && tt.includes(e.tagName) ? e : null;
}).filter((t) => t), st = (n) => {
  const { element: t, options: e, menu: i } = n, s = n.open ? dt : ct, o = F(t);
  s(o, M, rt), s(o, lt, rt), s(o, xt, Bt), s(o, At, Wt), e.display === "dynamic" && (n.open ? n._observer.observe(i) : n._observer.disconnect());
}, O = (n) => {
  const t = [...D, "btn-group", "input-group"].map(
    (e) => at(`${e} ${f}`, F(n))
  ).find((e) => e.length);
  if (t && t.length)
    return [...t[0].children].find(
      (e) => D.some((i) => i === S(e, pt))
    );
}, rt = (n) => {
  const { target: t, type: e } = n;
  if (!Ht(t)) return;
  const i = O(t), s = i && h(i);
  if (!s) return;
  const { parentElement: o, menu: r } = s, a = o && o.contains(t) && (t.tagName === "form" || it(t, "form") !== null);
  [M, St].includes(e) && ht(t) && n.preventDefault(), !a && e !== lt && t !== i && t !== r && s.hide();
};
function Ot(n) {
  const t = h(this);
  Nt(this) || t && (n.stopPropagation(), t.toggle(), ht(this) && n.preventDefault());
}
const Bt = (n) => {
  [_, N].includes(n.code) && n.preventDefault();
};
function Wt(n) {
  const { code: t } = n, e = O(this);
  if (!e) return;
  const i = h(e), { activeElement: s } = F(e);
  if (!i || !s) return;
  const { menu: o, open: r } = i, a = Ft(o);
  if (a && a.length && [_, N].includes(t)) {
    let l = a.indexOf(s);
    s === e ? l = 0 : t === N ? l = l > 1 ? l - 1 : 0 : t === _ && (l = l < a.length - 1 ? l + 1 : l), a[l] && T(a[l]);
  }
  Tt === t && r && (i.toggle(), T(e));
}
class kt extends bt {
  static selector = jt;
  static init = It;
  static getInstance = h;
  constructor(t, e) {
    super(t, e);
    const { parentElement: i } = this.element, [s] = at(
      ft,
      i
    );
    s && (this.parentElement = i, this.menu = s, this._observer = new _t(
      () => ot(this)
    ), this._toggleEventListeners(!0));
  }
  get name() {
    return ut;
  }
  get defaults() {
    return Mt;
  }
  toggle() {
    this.open ? this.hide() : this.show();
  }
  show() {
    const { element: t, open: e, menu: i, parentElement: s } = this;
    if (e) return;
    const o = O(t), r = o && h(o);
    r && r.hide(), [A, et, mt].forEach(
      (a) => {
        a.relatedTarget = t;
      }
    ), u(s, A), !A.defaultPrevented && (U(i, f), U(s, f), Z(t, J, "true"), ot(this), this.open = !e, T(t), st(this), u(s, et));
  }
  hide() {
    const { element: t, open: e, menu: i, parentElement: s } = this;
    e && ([H, nt].forEach((o) => {
      o.relatedTarget = t;
    }), u(s, H), !H.defaultPrevented && (z(i, f), z(s, f), Z(t, J, "false"), this.open = !e, st(this), u(s, nt)));
  }
  _toggleEventListeners = (t) => {
    (t ? dt : ct)(this.element, M, Ot);
  };
  dispose() {
    this.open && this.hide(), this._toggleEventListeners(), super.dispose();
  }
}
export {
  kt as default
};
//# sourceMappingURL=dropdown.mjs.map
