import { b as Ht, ab as jt, w as ct, L as Dt, J as I, M as qt, ac as Gt, t as C, p as z, ad as K, a as X, N as It, ae as zt, af as Kt, ag as Xt, ah as Jt, a5 as D, W as st, H as et, K as N, G, ai as Qt, aj as Ut, ak as Yt, d as ft, B as Vt, X as xt, al as Zt, C as te, A as St, a4 as ee, F as oe, c as W, n as ht, q as se, am as ie, U as ne, h as ae, y as le, i as Nt, g as dt, P as re, a9 as ce, aa as he, an as de, S as gt, k as pe, $ as Wt, ao as Lt, E as mt, r as ut, f as Bt } from "./base-component-LaJIjMhh.mjs";
import { v as fe } from "./index-DXF8ibvt.mjs";
import { d as me } from "./dataBsToggle-B84TS15h.mjs";
import { s as pt } from "./showClass-C8hdJfjQ.mjs";
import { a as ue, h as ge, m as bt, o as vt, r as be } from "./popupContainer-DSAMs3kR.mjs";
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
    const p = Ht(e), { x: $, y: c } = jt(a);
    ct(o, {
      top: "",
      left: "",
      right: "",
      bottom: ""
    });
    const { offsetWidth: m, offsetHeight: f } = o, { clientWidth: u, clientHeight: E, offsetWidth: A } = Dt(e);
    let { placement: i } = h;
    const { clientWidth: g, offsetWidth: J } = n, d = I(
      n,
      "position"
    ) === "fixed", Q = Math.abs(d ? g - J : u - A), H = p && d ? Q : 0, w = u - (p ? 0 : Q) - 1, it = s._observer.getEntry(e), {
      width: l,
      height: b,
      left: U,
      right: Ft,
      top: Y
    } = it?.boundingClientRect || qt(e, !0), {
      x: V,
      y: B
    } = Gt(
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
    let x = 0, M = "", T = 0, nt = "", O = "", Z = "", at = "";
    const S = r.offsetWidth || 0, y = r.offsetHeight || 0, lt = S / 2;
    let k = Y - f - y < 0, F = Y + f + b + y >= E, R = U - m - S < H, j = U + m + l + S >= w;
    const tt = ["left", "right"], rt = ["top", "bottom"];
    k = tt.includes(i) ? Y + b / 2 - f / 2 - y < 0 : k, F = tt.includes(i) ? Y + f / 2 + b / 2 + y >= E : F, R = rt.includes(i) ? U + l / 2 - m / 2 < H : R, j = rt.includes(i) ? U + m / 2 + l / 2 >= w : j, i = tt.includes(i) && R && j ? "top" : i, i = i === "top" && k ? "bottom" : i, i = i === "bottom" && F ? "top" : i, i = i === "left" && R ? "right" : i, i = i === "right" && j ? "left" : i, o.className.includes(i) || (o.className = o.className.replace(
      t,
      Ot[i]
    )), tt.includes(i) ? (i === "left" ? T = V - m - S : T = V + l + S, k && F ? (x = 0, M = 0, O = B + b / 2 - y / 2) : k ? (x = B, M = "", O = b / 2 - S) : F ? (x = B - f + b, M = "", O = f - b / 2 - S) : (x = B - f / 2 + b / 2, O = f / 2 - y / 2)) : rt.includes(i) && (i === "top" ? x = B - f - y : x = B + b + y, R ? (T = 0, Z = V + l / 2 - lt) : j ? (T = "auto", nt = 0, at = l / 2 + w - Ft - lt) : (T = V - m / 2 + l / 2, Z = m / 2 - lt)), ct(o, {
      top: `${x}px`,
      bottom: M === "" ? "" : `${M}px`,
      left: T === "auto" ? T : `${T}px`,
      right: nt !== "" ? `${nt}px` : ""
    }), C(r) && (O !== "" && (r.style.top = `${O}px`), Z !== "" ? r.style.left = `${Z}px` : at !== "" && (r.style.right = `${at}px`));
    const Rt = z(
      `updated.bs.${K(s.name)}`
    );
    X(e, Rt);
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
}, At = "data-original-title", L = "Tooltip", P = (s, t, e) => {
  if (It(t) && t.length) {
    let o = t.trim();
    zt(e) && (o = e(o));
    const a = new DOMParser().parseFromString(o, "text/html");
    s.append(...a.body.childNodes);
  } else C(t) ? s.append(t) : (Kt(t) || Xt(t) && t.every(Jt)) && s.append(...t);
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
  } = n, E = t ? v : ot, A = { ...Ot };
  let i = [], g = [];
  Ht(o) && (A.left = "end", A.right = "start");
  const J = `bs-${E}-${A[h]}`;
  let _;
  if (C(r))
    _ = r;
  else {
    const l = D("div");
    P(l, r, c), _ = l.firstChild;
  }
  if (!C(_)) return;
  s.tooltip = _.cloneNode(!0);
  const { tooltip: d } = s;
  st(d, "id", e), st(d, "role", v);
  const Q = t ? `${v}-inner` : `${ot}-body`, H = t ? null : et(`.${ot}-header`, d), w = et(`.${Q}`, d);
  s.arrow = et(
    `.${E}-arrow`,
    d
  );
  const { arrow: it } = s;
  if (C(a)) i = [a.cloneNode(!0)];
  else {
    const l = D("div");
    P(l, a, c), i = [...l.childNodes];
  }
  if (C(f)) g = [f.cloneNode(!0)];
  else {
    const l = D("div");
    P(l, f, c), g = [...l.childNodes];
  }
  if (m)
    if (a)
      if (C(u))
        i = [...i, u.cloneNode(!0)];
      else {
        const l = D("div");
        P(l, u, c), i = [...i, l.firstChild];
      }
    else if (H && H.remove(), C(u))
      g = [...g, u.cloneNode(!0)];
    else {
      const l = D("div");
      P(l, u, c), g = [...g, l.firstChild];
    }
  t ? a && w && P(w, a, c) : (a && H && P(H, i, c), f && w && P(w, g, c), s.btn = et(".btn-close", d) || void 0), N(d, "position-absolute"), N(it, "position-absolute"), G(d, E) || N(d, E), p && !G(d, $t) && N(d, $t), $ && !G(d, $) && N(d, $), G(d, J) || N(d, J);
}, Te = (s) => {
  const t = ["HTML", "BODY"], e = [];
  let { parentNode: o } = s;
  for (; o && !t.includes(o.nodeName); )
    o = Qt(o), Ut(o) || Yt(o) || e.push(o);
  return e.find((n, a) => (I(n, "position") !== "relative" || I(n, "position") === "relative" && n.offsetHeight !== n.scrollHeight) && e.slice(a + 1).every(
    (h) => I(h, "position") === "static"
  ) ? n : null) || ft(s).body;
}, ye = `[${me}="${v}"],[data-tip="${v}"]`, _t = "title";
let yt = (s) => xt(s, L);
const Pe = (s) => new He(s), Ce = (s) => {
  const { element: t, tooltip: e, container: o } = s;
  Wt(t, Lt), be(
    e,
    o
  );
}, q = (s) => {
  const { tooltip: t, container: e } = s;
  return t && ge(t, e);
}, Ee = (s, t) => {
  const { element: e } = s;
  s._toggleEventListeners(), St(e, At) && s.name === L && kt(s), t && t();
}, Mt = (s, t) => {
  const e = t ? mt : ut, { element: o } = s;
  e(
    ft(o),
    Nt,
    s.handleTouch,
    Bt
  );
}, Pt = (s) => {
  const { element: t } = s, e = z(
    `shown.bs.${K(s.name)}`
  );
  Mt(s, !0), X(t, e), W.clear(t, "in");
}, Ct = (s) => {
  const { element: t } = s, e = z(
    `hidden.bs.${K(s.name)}`
  );
  Mt(s), Ce(s), X(t, e), W.clear(t, "out");
}, Et = (s, t) => {
  const e = t ? mt : ut, { element: o, tooltip: n } = s, a = gt(o, `.${bt}`), h = gt(o, `.${vt}`);
  t ? [o, n].forEach((r) => s._observer.observe(r)) : s._observer.disconnect(), a && e(a, `hide.bs.${bt}`, s.handleHide), h && e(h, `hide.bs.${vt}`, s.handleHide);
}, kt = (s, t) => {
  const e = [At, _t], { element: o } = s;
  st(
    o,
    e[t ? 0 : 1],
    t || pe(o, e[0]) || ""
  ), Wt(o, e[t ? 1 : 0]);
};
class He extends Vt {
  static selector = ye;
  static init = Pe;
  static getInstance = yt;
  static styleTip = wt;
  constructor(t, e) {
    super(t, e);
    const { element: o } = this, n = this.name === L, a = n ? v : ot, h = n ? L : ve;
    yt = (c) => xt(c, h), this.enabled = !0, this.id = `${a}-${Zt(o, a)}`;
    const { options: r } = this;
    if (!r.title && n || !n && !r.content)
      return;
    te(Tt, { titleAttr: "" }), St(o, _t) && n && typeof r.title == "string" && kt(this, r.title);
    const p = Te(o), $ = ["sticky", "fixed", "relative"].some(
      (c) => I(p, "position") === c
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
    W.clear(o, "out"), e && !r && !q(this) && W.set(
      o,
      () => {
        const p = z(
          `show.bs.${K(this.name)}`
        );
        X(o, p), p.defaultPrevented || (ue(e, n), st(o, Lt, `#${a}`), this.update(), Et(this, !0), G(e, pt) || N(e, pt), h ? ht(e, () => Pt(this)) : Pt(this));
      },
      17,
      "in"
    );
  }
  handleHide = () => this.hide();
  hide() {
    const { options: t, tooltip: e, element: o } = this, { animation: n, delay: a } = t;
    W.clear(o, "in"), e && q(this) && W.set(
      o,
      () => {
        const h = z(
          `hide.bs.${K(this.name)}`
        );
        X(o, h), h.defaultPrevented || (this.update(), se(e, pt), Et(this), n ? ht(e, () => Ct(this)) : Ct(this));
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
    t && !q(this) ? this.show() : this.hide();
  };
  enable() {
    const { enabled: t } = this;
    t || (this._toggleEventListeners(!0), this.enabled = !t);
  }
  disable() {
    const { tooltip: t, enabled: e } = this;
    e && (t && q(this) && this.hide(), this._toggleEventListeners(), this.enabled = !e);
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
        Nt,
        this.handleTouch,
        Bt
      ))) : c === dt ? e(o, c, p ? this.handleShow : this.toggle) : c === re && (e(o, ce, this.handleShow), p || e(o, he, this.handleHide), de() && e(o, dt, this.handleFocus)), p && a && e(a, dt, this.handleHide);
    }));
  };
  dispose() {
    const { tooltip: t, options: e } = this, o = { ...this, name: this.name }, n = () => setTimeout(
      () => Ee(o, () => super.dispose()),
      17
    );
    e.animation && q(o) ? (this.options.delay = 0, this.hide(), ht(t, n)) : n();
  }
}
export {
  He as T,
  ot as a,
  $e as g,
  ve as p,
  wt as s,
  Tt as t
};
//# sourceMappingURL=tooltip-CflbER55.mjs.map
