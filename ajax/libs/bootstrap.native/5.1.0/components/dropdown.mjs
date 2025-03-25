import { S as it, A as q, k as T, B as bt, R as at, a as u, K as z, W as U, F as H, q as X, X as Dt, p as m, J as Ct, b as $t, G as J, w as A, L as yt, M as xt, C as Q, E as dt, r as ct, d as W, z as V, g as j, P as lt, l as At, Q as St, t as Pt, U as Tt, V as _, Z as F, _ as Ht } from "./base-component-LaJIjMhh.mjs";
import { v as _t } from "./index-DXF8ibvt.mjs";
import { s as f } from "./showClass-C8hdJfjQ.mjs";
import { d as pt } from "./dataBsToggle-B84TS15h.mjs";
import { d as D } from "./dropdownClasses-CdCdZ-PX.mjs";
import { i as Ft } from "./isDisabled-DmmaKYeZ.mjs";
const ut = "Dropdown", ft = "dropdown-menu", ht = (n) => {
  const t = it(n, "A");
  return n.tagName === "A" && q(n, "href") && T(n, "href")?.slice(-1) === "#" || t && q(t, "href") && T(t, "href")?.slice(-1) === "#";
}, [p, I, L, M] = D, It = `[${pt}="${p}"]`, h = (n) => Dt(n, ut), Lt = (n) => new Gt(n), Mt = `${ft}-end`, Z = [p, I], Y = [L, M], tt = ["A", "BUTTON"], Wt = {
  offset: 5,
  display: "dynamic"
}, S = m(
  `show.bs.${p}`
), et = m(
  `shown.bs.${p}`
), P = m(
  `hide.bs.${p}`
), nt = m(`hidden.bs.${p}`), mt = m(`updated.bs.${p}`), ot = (n) => {
  const { element: t, menu: e, parentElement: i, options: s } = n, { offset: o } = s;
  if (Ct(e, "position") === "static") return;
  const r = $t(t), a = J(e, Mt);
  ["margin", "top", "bottom", "left", "right"].forEach((c) => {
    const R = {};
    R[c] = "", A(e, R);
  });
  let d = D.find((c) => J(i, c)) || p;
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
  }, { offsetWidth: w, offsetHeight: C } = e, { clientWidth: N, clientHeight: k } = yt(t), {
    left: E,
    top: $,
    width: G,
    height: wt
  } = xt(t), y = E - w - o < 0, x = E + w + G + o >= N, Et = $ + C + o >= k, K = $ + C + wt + o >= k, O = $ - C - o < 0, v = (!r && a || r && !a) && E + G - w < 0, b = (r && a || !r && !a) && E + w >= N;
  if (Y.includes(d) && y && x && (d = p), d === L && (r ? x : y) && (d = M), d === M && (r ? y : x) && (d = L), d === I && O && !K && (d = p), d === p && K && !O && (d = I), Y.includes(d) && Et && Q(g[d], {
    top: "auto",
    bottom: 0
  }), Z.includes(d) && (v || b)) {
    let c = { left: "auto", right: "auto" };
    !v && b && !r && (c = { left: "auto", right: 0 }), v && !b && r && (c = { left: 0, right: "auto" }), c && Q(g[d], c);
  }
  const vt = gt[d];
  A(e, {
    ...g[d],
    margin: `${vt.map((c) => c && `${c}px`).join(" ")}`
  }), Z.includes(d) && a && a && A(e, g[!r && v || r && b ? "menuStart" : "menuEnd"]), u(i, mt);
}, jt = (n) => Array.from(n.children).map((t) => {
  if (t && tt.includes(t.tagName)) return t;
  const { firstElementChild: e } = t;
  return e && tt.includes(e.tagName) ? e : null;
}).filter((t) => t), st = (n) => {
  const { element: t, options: e, menu: i } = n, s = n.open ? dt : ct, o = W(t);
  s(o, j, rt), s(o, lt, rt), s(o, At, Nt), s(o, St, kt), e.display === "dynamic" && (n.open ? n._observer.observe(i) : n._observer.disconnect());
}, B = (n) => {
  const t = [...D, "btn-group", "input-group"].map(
    (e) => at(`${e} ${f}`, W(n))
  ).find((e) => e.length);
  if (t && t.length)
    return [...t[0].children].find(
      (e) => D.some((i) => i === T(e, pt))
    );
}, rt = (n) => {
  const { target: t, type: e } = n;
  if (!Pt(t)) return;
  const i = B(t), s = i && h(i);
  if (!s) return;
  const { parentElement: o, menu: r } = s, a = o && o.contains(t) && (t.tagName === "form" || it(t, "form") !== null);
  [j, Tt].includes(e) && ht(t) && n.preventDefault(), !a && e !== lt && t !== i && t !== r && s.hide();
};
function Bt(n) {
  const t = h(this);
  Ft(this) || t && (n.stopPropagation(), t.toggle(), ht(this) && n.preventDefault());
}
const Nt = (n) => {
  [_, F].includes(n.code) && n.preventDefault();
};
function kt(n) {
  const { code: t } = n, e = B(this);
  if (!e) return;
  const i = h(e), { activeElement: s } = W(e);
  if (!i || !s) return;
  const { menu: o, open: r } = i, a = jt(o);
  if (a && a.length && [_, F].includes(t)) {
    let l = a.indexOf(s);
    s === e ? l = 0 : t === F ? l = l > 1 ? l - 1 : 0 : t === _ && (l = l < a.length - 1 ? l + 1 : l), a[l] && H(a[l]);
  }
  Ht === t && r && (i.toggle(), H(e));
}
class Gt extends bt {
  static selector = It;
  static init = Lt;
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
    return Wt;
  }
  toggle() {
    this.open ? this.hide() : this.show();
  }
  show() {
    const { element: t, open: e, menu: i, parentElement: s } = this;
    if (e) return;
    const o = B(t), r = o && h(o);
    r && r.hide(), [S, et, mt].forEach(
      (a) => {
        a.relatedTarget = t;
      }
    ), u(s, S), !S.defaultPrevented && (z(i, f), z(s, f), U(t, V, "true"), ot(this), this.open = !e, H(t), st(this), u(s, et));
  }
  hide() {
    const { element: t, open: e, menu: i, parentElement: s } = this;
    e && ([P, nt].forEach((o) => {
      o.relatedTarget = t;
    }), u(s, P), !P.defaultPrevented && (X(i, f), X(s, f), U(t, V, "false"), this.open = !e, st(this), u(s, nt)));
  }
  _toggleEventListeners = (t) => {
    (t ? dt : ct)(this.element, j, Bt);
  };
  dispose() {
    this.open && this.hide(), this._toggleEventListeners(), super.dispose();
  }
}
export {
  Gt as default
};
//# sourceMappingURL=dropdown.mjs.map
