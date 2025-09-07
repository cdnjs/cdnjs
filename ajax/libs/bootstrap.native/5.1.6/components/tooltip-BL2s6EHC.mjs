import { H as xt, ac as Dt, y as ct, P as jt, M as Q, R as zt, ad as It, o as C, m as G, ae as K, Z as V, p as Qt, af as Gt, ag as Kt, ah as Vt, ai as Zt, a6 as j, Q as st, W as et, G as S, _ as I, aj as qt, ak as Jt, al as Yt, d as ft, B as Ut, t as Ht, am as Xt, T as te, J as Nt, a5 as ee, L as oe, h as W, s as ht, a as se, an as ie, E as mt, r as ut, V as ne, w as ae, A as le, b as St, v as dt, S as re, aa as ce, ab as he, ao as de, ap as Wt, g as Lt, K as pe, a0 as At, N as gt } from "./base-component-BazRqYWL.mjs";
import { P as fe } from "./index-K6w9MeGG.mjs";
import { d as me } from "./dataBsToggle-B84TS15h.mjs";
import { s as pt } from "./showClass-C8hdJfjQ.mjs";
import { a as ue, h as ge, m as bt, o as vt, r as be } from "./popupContainer-Dhe1NpFt.mjs";
import { f as $t } from "./fadeClass-CLIYI_zn.mjs";
const ot = "popover", ve = "Popover", v = "tooltip", $e = (s) => {
  const t = s === v, e = t ? `${s}-inner` : `${s}-body`, o = t ? "" : `<h3 class="${s}-header"></h3>`, n = `<div class="${s}-arrow"></div>`, a = `<div class="${e}"></div>`;
  return `<div class="${s}" role="${v}">${o + n + a}</div>`;
}, Ot = {
  top: "top",
  bottom: "bottom",
  left: "start",
  right: "end"
}, wt = (s) => {
  requestAnimationFrame(() => {
    const t = /\b(top|bottom|start|end)+/, { element: e, tooltip: o, container: n, offsetParent: a, options: h, arrow: r } = s;
    if (!o) return;
    const p = xt(e), { x: $, y: c } = Dt(a);
    ct(o, {
      top: "",
      left: "",
      right: "",
      bottom: ""
    });
    const { offsetWidth: m, offsetHeight: f } = o, { clientWidth: u, clientHeight: E, offsetWidth: _ } = jt(e);
    let { placement: i } = h;
    const { clientWidth: g, offsetWidth: Z } = n, d = Q(
      n,
      "position"
    ) === "fixed", q = Math.abs(d ? g - Z : u - _), x = p && d ? q : 0, w = u - (p ? 0 : q) - 1, it = s._observer.getEntry(e), {
      width: l,
      height: b,
      left: J,
      right: kt,
      top: Y
    } = it?.boundingClientRect || zt(e, !0), {
      x: U,
      y: A
    } = It(
      e,
      a,
      { x: $, y: c }
    );
    ct(r, {
      top: "",
      left: "",
      right: "",
      bottom: ""
    });
    let H = 0, R = "", T = 0, nt = "", O = "", X = "", at = "";
    const N = r.offsetWidth || 0, y = r.offsetHeight || 0, lt = N / 2;
    let M = Y - f - y < 0, k = Y + f + b + y >= E, F = J - m - N < x, D = J + m + l + N >= w;
    const tt = ["left", "right"], rt = ["top", "bottom"];
    M = tt.includes(i) ? Y + b / 2 - f / 2 - y < 0 : M, k = tt.includes(i) ? Y + f / 2 + b / 2 + y >= E : k, F = rt.includes(i) ? J + l / 2 - m / 2 < x : F, D = rt.includes(i) ? J + m / 2 + l / 2 >= w : D, i = tt.includes(i) && F && D ? "top" : i, i = i === "top" && M ? "bottom" : i, i = i === "bottom" && k ? "top" : i, i = i === "left" && F ? "right" : i, i = i === "right" && D ? "left" : i, o.className.includes(i) || (o.className = o.className.replace(
      t,
      Ot[i]
    )), tt.includes(i) ? (i === "left" ? T = U - m - N : T = U + l + N, M && k ? (H = 0, R = 0, O = A + b / 2 - y / 2) : M ? (H = A, R = "", O = b / 2 - N) : k ? (H = A - f + b, R = "", O = f - b / 2 - N) : (H = A - f / 2 + b / 2, O = f / 2 - y / 2)) : rt.includes(i) && (i === "top" ? H = A - f - y : H = A + b + y, F ? (T = 0, X = U + l / 2 - lt) : D ? (T = "auto", nt = 0, at = l / 2 + w - kt - lt) : (T = U - m / 2 + l / 2, X = m / 2 - lt)), ct(o, {
      top: `${H}px`,
      bottom: R === "" ? "" : `${R}px`,
      left: T === "auto" ? T : `${T}px`,
      right: nt !== "" ? `${nt}px` : ""
    }), C(r) && (O !== "" && (r.style.top = `${O}px`), X !== "" ? r.style.left = `${X}px` : at !== "" && (r.style.right = `${at}px`));
    const Ft = G(
      `updated.bs.${K(s.name)}`
    );
    V(e, Ft);
  });
}, Tt = {
  template: $e(v),
  title: "",
  customClass: "",
  trigger: "hover focus",
  placement: "top",
  sanitizeFn: void 0,
  animation: !0,
  delay: 200,
  container: document.body,
  content: "",
  dismissible: !1,
  btnClose: ""
}, _t = "data-original-title", L = "Tooltip", P = (s, t, e) => {
  if (Qt(t) && t.length) {
    let o = t.trim();
    Gt(e) && (o = e(o));
    const a = new DOMParser().parseFromString(o, "text/html");
    s.append(...a.body.childNodes);
  } else C(t) ? s.append(t) : (Kt(t) || Vt(t) && t.every(Zt)) && s.append(...t);
}, we = (s) => {
  const t = s.name === L, { id: e, element: o, options: n } = s, {
    title: a,
    placement: h,
    template: r,
    animation: p,
    customClass: $,
    sanitizeFn: c,
    dismissible: m,
    content: f,
    btnClose: u
  } = n, E = t ? v : ot, _ = { ...Ot };
  let i = [], g = [];
  xt(o) && (_.left = "end", _.right = "start");
  const Z = `bs-${E}-${_[h]}`;
  let B;
  if (C(r))
    B = r;
  else {
    const l = j("div");
    P(l, r, c), B = l.firstChild;
  }
  if (!C(B)) return;
  s.tooltip = B.cloneNode(!0);
  const { tooltip: d } = s;
  st(d, "id", e), st(d, "role", v);
  const q = t ? `${v}-inner` : `${ot}-body`, x = t ? null : et(`.${ot}-header`, d), w = et(`.${q}`, d);
  s.arrow = et(
    `.${E}-arrow`,
    d
  );
  const { arrow: it } = s;
  if (C(a)) i = [a.cloneNode(!0)];
  else {
    const l = j("div");
    P(l, a, c), i = [...l.childNodes];
  }
  if (C(f)) g = [f.cloneNode(!0)];
  else {
    const l = j("div");
    P(l, f, c), g = [...l.childNodes];
  }
  if (m)
    if (a)
      if (C(u))
        i = [...i, u.cloneNode(!0)];
      else {
        const l = j("div");
        P(l, u, c), i = [...i, l.firstChild];
      }
    else if (x && x.remove(), C(u))
      g = [...g, u.cloneNode(!0)];
    else {
      const l = j("div");
      P(l, u, c), g = [...g, l.firstChild];
    }
  t ? a && w && P(w, a, c) : (a && x && P(x, i, c), f && w && P(w, g, c), s.btn = et(".btn-close", d) || void 0), S(d, "position-absolute"), S(it, "position-absolute"), I(d, E) || S(d, E), p && !I(d, $t) && S(d, $t), $ && !I(d, $) && S(d, $), I(d, Z) || S(d, Z);
}, Te = (s) => {
  const t = ["HTML", "BODY"], e = [];
  let { parentNode: o } = s;
  for (; o && !t.includes(o.nodeName); )
    o = qt(o), Jt(o) || Yt(o) || e.push(o);
  return e.find((n, a) => (Q(n, "position") !== "relative" || Q(n, "position") === "relative" && n.offsetHeight !== n.scrollHeight) && e.slice(a + 1).every(
    (h) => Q(h, "position") === "static"
  ) ? n : null) || ft(s).body;
}, ye = `[${me}="${v}"],[data-tip="${v}"]`, Bt = "title";
let yt = (s) => Ht(s, L);
const Pe = (s) => new xe(s), Ce = (s) => {
  const { element: t, tooltip: e, container: o } = s;
  At(t, Wt), be(
    e,
    o
  );
}, z = (s) => {
  const { tooltip: t, container: e } = s;
  return t && ge(t, e);
}, Ee = (s, t) => {
  const { element: e } = s;
  s._toggleEventListeners(), Nt(e, _t) && s.name === L && Mt(s), t && t();
}, Rt = (s, t) => {
  const e = t ? mt : ut, { element: o } = s;
  e(
    ft(o),
    St,
    s.handleTouch,
    Lt
  );
}, Pt = (s) => {
  const { element: t } = s, e = G(
    `shown.bs.${K(s.name)}`
  );
  Rt(s, !0), V(t, e), W.clear(t, "in");
}, Ct = (s) => {
  const { element: t } = s, e = G(
    `hidden.bs.${K(s.name)}`
  );
  Rt(s), Ce(s), V(t, e), W.clear(t, "out");
}, Et = (s, t) => {
  const e = t ? mt : ut, { element: o, tooltip: n } = s, a = gt(o, `.${bt}`), h = gt(o, `.${vt}`);
  t ? [o, n].forEach((r) => s._observer.observe(r)) : s._observer.disconnect(), a && e(a, `hide.bs.${bt}`, s.handleHide), h && e(h, `hide.bs.${vt}`, s.handleHide);
}, Mt = (s, t) => {
  const e = [_t, Bt], { element: o } = s;
  st(
    o,
    e[t ? 0 : 1],
    t || pe(o, e[0]) || ""
  ), At(o, e[t ? 1 : 0]);
};
class xe extends Ut {
  static selector = ye;
  static init = Pe;
  static getInstance = yt;
  static styleTip = wt;
  constructor(t, e) {
    super(t, e);
    const { element: o } = this, n = this.name === L, a = n ? v : ot, h = n ? L : ve;
    yt = (c) => Ht(c, h), this.enabled = !0, this.id = `${a}-${Xt(o, a)}`;
    const { options: r } = this;
    if (!r.title && n || !n && !r.content)
      return;
    te(Tt, { titleAttr: "" }), Nt(o, Bt) && n && typeof r.title == "string" && Mt(this, r.title);
    const p = Te(o), $ = ["sticky", "fixed", "relative"].some(
      (c) => Q(p, "position") === c
    ) ? p : ee(o);
    this.container = p, this.offsetParent = $, we(this), this.tooltip && (this._observer = new fe(() => this.update()), this._toggleEventListeners(!0));
  }
  get name() {
    return L;
  }
  get defaults() {
    return Tt;
  }
  handleFocus = () => oe(this.element);
  handleShow = () => this.show();
  show() {
    const { options: t, tooltip: e, element: o, container: n, id: a } = this, { animation: h } = t, r = W.get(o, "out");
    W.clear(o, "out"), e && !r && !z(this) && W.set(
      o,
      () => {
        const p = G(
          `show.bs.${K(this.name)}`
        );
        V(o, p), p.defaultPrevented || (ue(e, n), st(o, Wt, `#${a}`), this.update(), Et(this, !0), I(e, pt) || S(e, pt), h ? ht(e, () => Pt(this)) : Pt(this));
      },
      17,
      "in"
    );
  }
  handleHide = () => this.hide();
  hide() {
    const { options: t, tooltip: e, element: o } = this, { animation: n, delay: a } = t;
    W.clear(o, "in"), e && z(this) && W.set(
      o,
      () => {
        const h = G(
          `hide.bs.${K(this.name)}`
        );
        V(o, h), h.defaultPrevented || (this.update(), se(e, pt), Et(this), n ? ht(e, () => Ct(this)) : Ct(this));
      },
      a + 17,
      "out"
    );
  }
  update = () => {
    wt(this);
  };
  toggle = () => {
    const { tooltip: t } = this;
    t && !z(this) ? this.show() : this.hide();
  };
  enable() {
    const { enabled: t } = this;
    t || (this._toggleEventListeners(!0), this.enabled = !t);
  }
  disable() {
    const { tooltip: t, enabled: e } = this;
    e && (t && z(this) && this.hide(), this._toggleEventListeners(), this.enabled = !e);
  }
  toggleEnabled() {
    this.enabled ? this.disable() : this.enable();
  }
  handleTouch = ({ target: t }) => {
    const { tooltip: e, element: o } = this;
    e && e.contains(t) || t === o || t && o.contains(t) || this.hide();
  };
  _toggleEventListeners = (t) => {
    const e = t ? mt : ut, { element: o, options: n, btn: a } = this, { trigger: h } = n, p = !!(this.name !== L && n.dismissible);
    h.includes("manual") || (this.enabled = !!t, h.split(" ").forEach((c) => {
      c === ie ? (e(o, ne, this.handleShow), e(o, ae, this.handleShow), p || (e(o, le, this.handleHide), e(
        ft(o),
        St,
        this.handleTouch,
        Lt
      ))) : c === dt ? e(o, c, p ? this.handleShow : this.toggle) : c === re && (e(o, ce, this.handleShow), p || e(o, he, this.handleHide), de() && e(o, dt, this.handleFocus)), p && a && e(a, dt, this.handleHide);
    }));
  };
  dispose() {
    const { tooltip: t, options: e } = this, o = { ...this, name: this.name }, n = () => setTimeout(
      () => Ee(o, () => super.dispose()),
      17
    );
    e.animation && z(o) ? (this.options.delay = 0, this.hide(), ht(t, n)) : n();
  }
}
export {
  xe as T,
  ve as a,
  $e as g,
  ot as p,
  wt as s,
  Tt as t
};
//# sourceMappingURL=tooltip-BL2s6EHC.mjs.map
