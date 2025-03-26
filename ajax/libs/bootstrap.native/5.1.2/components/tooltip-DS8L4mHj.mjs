import { H as xt, ab as Dt, x as ct, M as jt, L as Q, P as zt, ac as It, o as P, m as G, ad as K, Z, p as Qt, ae as Gt, af as Kt, ag as Zt, ah as qt, a5 as j, Q as st, W as et, G as S, _ as I, ai as Jt, aj as Ut, ak as Vt, d as ft, B as Yt, t as Ht, al as Xt, T as te, C as Nt, a4 as ee, J as oe, h as W, s as ht, a as se, am as ie, U as ne, w as ae, A as le, g as St, v as dt, R as re, a9 as ce, aa as he, an as de, N as gt, K as pe, $ as Wt, ao as Lt, E as mt, r as ut, f as At } from "./base-component-BMXjNJAi.mjs";
import { y as fe } from "./index-CnhA8i0D.mjs";
import { d as me } from "./dataBsToggle-B84TS15h.mjs";
import { s as pt } from "./showClass-C8hdJfjQ.mjs";
import { a as ue, h as ge, m as bt, o as vt, r as be } from "./popupContainer-BY58HXTH.mjs";
import { f as $t } from "./fadeClass-CLIYI_zn.mjs";
const ot = "popover", ve = "Popover", v = "tooltip", $e = (s) => {
  const t = s === v, e = t ? `${s}-inner` : `${s}-body`, o = t ? "" : `<h3 class="${s}-header"></h3>`, n = `<div class="${s}-arrow"></div>`, a = `<div class="${e}"></div>`;
  return `<div class="${s}" role="${v}">${o + n + a}</div>`;
}, _t = {
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
    const { offsetWidth: m, offsetHeight: f } = o, { clientWidth: u, clientHeight: E, offsetWidth: B } = jt(e);
    let { placement: i } = h;
    const { clientWidth: g, offsetWidth: q } = n, d = Q(
      n,
      "position"
    ) === "fixed", J = Math.abs(d ? g - q : u - B), x = p && d ? J : 0, w = u - (p ? 0 : J) - 1, it = s._observer.getEntry(e), {
      width: l,
      height: b,
      left: U,
      right: kt,
      top: V
    } = it?.boundingClientRect || zt(e, !0), {
      x: Y,
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
    let H = 0, R = "", T = 0, nt = "", _ = "", X = "", at = "";
    const N = r.offsetWidth || 0, y = r.offsetHeight || 0, lt = N / 2;
    let M = V - f - y < 0, k = V + f + b + y >= E, F = U - m - N < x, D = U + m + l + N >= w;
    const tt = ["left", "right"], rt = ["top", "bottom"];
    M = tt.includes(i) ? V + b / 2 - f / 2 - y < 0 : M, k = tt.includes(i) ? V + f / 2 + b / 2 + y >= E : k, F = rt.includes(i) ? U + l / 2 - m / 2 < x : F, D = rt.includes(i) ? U + m / 2 + l / 2 >= w : D, i = tt.includes(i) && F && D ? "top" : i, i = i === "top" && M ? "bottom" : i, i = i === "bottom" && k ? "top" : i, i = i === "left" && F ? "right" : i, i = i === "right" && D ? "left" : i, o.className.includes(i) || (o.className = o.className.replace(
      t,
      _t[i]
    )), tt.includes(i) ? (i === "left" ? T = Y - m - N : T = Y + l + N, M && k ? (H = 0, R = 0, _ = A + b / 2 - y / 2) : M ? (H = A, R = "", _ = b / 2 - N) : k ? (H = A - f + b, R = "", _ = f - b / 2 - N) : (H = A - f / 2 + b / 2, _ = f / 2 - y / 2)) : rt.includes(i) && (i === "top" ? H = A - f - y : H = A + b + y, F ? (T = 0, X = Y + l / 2 - lt) : D ? (T = "auto", nt = 0, at = l / 2 + w - kt - lt) : (T = Y - m / 2 + l / 2, X = m / 2 - lt)), ct(o, {
      top: `${H}px`,
      bottom: R === "" ? "" : `${R}px`,
      left: T === "auto" ? T : `${T}px`,
      right: nt !== "" ? `${nt}px` : ""
    }), P(r) && (_ !== "" && (r.style.top = `${_}px`), X !== "" ? r.style.left = `${X}px` : at !== "" && (r.style.right = `${at}px`));
    const Ft = G(
      `updated.bs.${K(s.name)}`
    );
    Z(e, Ft);
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
}, Bt = "data-original-title", L = "Tooltip", C = (s, t, e) => {
  if (Qt(t) && t.length) {
    let o = t.trim();
    Gt(e) && (o = e(o));
    const a = new DOMParser().parseFromString(o, "text/html");
    s.append(...a.body.childNodes);
  } else P(t) ? s.append(t) : (Kt(t) || Zt(t) && t.every(qt)) && s.append(...t);
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
  } = n, E = t ? v : ot, B = { ..._t };
  let i = [], g = [];
  xt(o) && (B.left = "end", B.right = "start");
  const q = `bs-${E}-${B[h]}`;
  let O;
  if (P(r))
    O = r;
  else {
    const l = j("div");
    C(l, r, c), O = l.firstChild;
  }
  if (!P(O)) return;
  s.tooltip = O.cloneNode(!0);
  const { tooltip: d } = s;
  st(d, "id", e), st(d, "role", v);
  const J = t ? `${v}-inner` : `${ot}-body`, x = t ? null : et(`.${ot}-header`, d), w = et(`.${J}`, d);
  s.arrow = et(
    `.${E}-arrow`,
    d
  );
  const { arrow: it } = s;
  if (P(a)) i = [a.cloneNode(!0)];
  else {
    const l = j("div");
    C(l, a, c), i = [...l.childNodes];
  }
  if (P(f)) g = [f.cloneNode(!0)];
  else {
    const l = j("div");
    C(l, f, c), g = [...l.childNodes];
  }
  if (m)
    if (a)
      if (P(u))
        i = [...i, u.cloneNode(!0)];
      else {
        const l = j("div");
        C(l, u, c), i = [...i, l.firstChild];
      }
    else if (x && x.remove(), P(u))
      g = [...g, u.cloneNode(!0)];
    else {
      const l = j("div");
      C(l, u, c), g = [...g, l.firstChild];
    }
  t ? a && w && C(w, a, c) : (a && x && C(x, i, c), f && w && C(w, g, c), s.btn = et(".btn-close", d) || void 0), S(d, "position-absolute"), S(it, "position-absolute"), I(d, E) || S(d, E), p && !I(d, $t) && S(d, $t), $ && !I(d, $) && S(d, $), I(d, q) || S(d, q);
}, Te = (s) => {
  const t = ["HTML", "BODY"], e = [];
  let { parentNode: o } = s;
  for (; o && !t.includes(o.nodeName); )
    o = Jt(o), Ut(o) || Vt(o) || e.push(o);
  return e.find((n, a) => (Q(n, "position") !== "relative" || Q(n, "position") === "relative" && n.offsetHeight !== n.scrollHeight) && e.slice(a + 1).every(
    (h) => Q(h, "position") === "static"
  ) ? n : null) || ft(s).body;
}, ye = `[${me}="${v}"],[data-tip="${v}"]`, Ot = "title";
let yt = (s) => Ht(s, L);
const Ce = (s) => new xe(s), Pe = (s) => {
  const { element: t, tooltip: e, container: o } = s;
  Wt(t, Lt), be(
    e,
    o
  );
}, z = (s) => {
  const { tooltip: t, container: e } = s;
  return t && ge(t, e);
}, Ee = (s, t) => {
  const { element: e } = s;
  s._toggleEventListeners(), Nt(e, Bt) && s.name === L && Mt(s), t && t();
}, Rt = (s, t) => {
  const e = t ? mt : ut, { element: o } = s;
  e(
    ft(o),
    St,
    s.handleTouch,
    At
  );
}, Ct = (s) => {
  const { element: t } = s, e = G(
    `shown.bs.${K(s.name)}`
  );
  Rt(s, !0), Z(t, e), W.clear(t, "in");
}, Pt = (s) => {
  const { element: t } = s, e = G(
    `hidden.bs.${K(s.name)}`
  );
  Rt(s), Pe(s), Z(t, e), W.clear(t, "out");
}, Et = (s, t) => {
  const e = t ? mt : ut, { element: o, tooltip: n } = s, a = gt(o, `.${bt}`), h = gt(o, `.${vt}`);
  t ? [o, n].forEach((r) => s._observer.observe(r)) : s._observer.disconnect(), a && e(a, `hide.bs.${bt}`, s.handleHide), h && e(h, `hide.bs.${vt}`, s.handleHide);
}, Mt = (s, t) => {
  const e = [Bt, Ot], { element: o } = s;
  st(
    o,
    e[t ? 0 : 1],
    t || pe(o, e[0]) || ""
  ), Wt(o, e[t ? 1 : 0]);
};
class xe extends Yt {
  static selector = ye;
  static init = Ce;
  static getInstance = yt;
  static styleTip = wt;
  constructor(t, e) {
    super(t, e);
    const { element: o } = this, n = this.name === L, a = n ? v : ot, h = n ? L : ve;
    yt = (c) => Ht(c, h), this.enabled = !0, this.id = `${a}-${Xt(o, a)}`;
    const { options: r } = this;
    if (!r.title && n || !n && !r.content)
      return;
    te(Tt, { titleAttr: "" }), Nt(o, Ot) && n && typeof r.title == "string" && Mt(this, r.title);
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
        Z(o, p), p.defaultPrevented || (ue(e, n), st(o, Lt, `#${a}`), this.update(), Et(this, !0), I(e, pt) || S(e, pt), h ? ht(e, () => Ct(this)) : Ct(this));
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
        Z(o, h), h.defaultPrevented || (this.update(), se(e, pt), Et(this), n ? ht(e, () => Pt(this)) : Pt(this));
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
        At
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
  ot as a,
  $e as g,
  ve as p,
  wt as s,
  Tt as t
};
//# sourceMappingURL=tooltip-DS8L4mHj.mjs.map
