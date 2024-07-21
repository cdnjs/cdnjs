var qt = Object.defineProperty;
var Ut = (o, i, e) => i in o ? qt(o, i, { enumerable: !0, configurable: !0, writable: !0, value: e }) : o[i] = e;
var g = (o, i, e) => (Ut(o, typeof i != "symbol" ? i + "" : i, e), e);
import { isRTL as xt, setElementStyle as pt, getDocumentElement as Yt, getElementStyle as st, getBoundingClientRect as Gt, isHTMLElement as x, createCustomEvent as J, toLowerCase as K, dispatchEvent as Q, isString as Jt, isFunction as Kt, isNodeList as Qt, isArray as Vt, isNode as Xt, createElement as q, setAttribute as nt, querySelector as et, addClass as W, hasClass as Y, getParentNode as Zt, isShadowRoot as te, isTableElement as ee, getDocument as lt, getInstance as St, getUID as oe, ObjectAssign as ie, hasAttribute as Lt, focus as se, Timer as B, ariaDescribedBy as Nt, emulateTransitionEnd as ot, removeClass as ne, mousehoverEvent as le, mousedownEvent as ae, mouseenterEvent as ce, mouseleaveEvent as re, touchstartEvent as At, passiveHandler as V, mouseclickEvent as mt, focusEvent as de, focusinEvent as he, focusoutEvent as pe, isApple as me, closest as vt, getWindow as Wt, resizeEvent as Bt, scrollEvent as Ot, getAttribute as fe, removeAttribute as Rt } from "@thednp/shorty";
import { addListener as ut, removeListener as gt } from "@thednp/event-listener";
import { d as ue } from "./dataBsToggle-330f300b.mjs";
import { s as ft } from "./showClass-f6a4d601.mjs";
import { a as ge, h as ve, m as bt, o as wt, r as be } from "./popupContainer-82392867.mjs";
import { f as Et } from "./fadeClass-0d50d035.mjs";
import { B as we } from "./base-component-a56d44ba.mjs";
const it = "popover", Dt = "Popover", T = "tooltip", Ee = (o) => {
  const i = o === T, e = i ? `${o}-inner` : `${o}-body`, t = i ? "" : `<h3 class="${o}-header"></h3>`, s = `<div class="${o}-arrow"></div>`, n = `<div class="${e}"></div>`;
  return `<div class="${o}" role="${T}">${t + s + n}</div>`;
}, Mt = {
  top: "top",
  bottom: "bottom",
  left: "start",
  right: "end"
}, $t = (o) => {
  const i = /\b(top|bottom|start|end)+/, { element: e, tooltip: t, container: s, options: n, arrow: a } = o;
  if (t) {
    const p = { ...Mt }, f = xt(e);
    pt(t, {
      // top: '0px', left: '0px', right: '', bottom: '',
      top: "",
      left: "",
      right: "",
      bottom: ""
    });
    const c = o.name === Dt, { offsetWidth: r, offsetHeight: d } = t, { clientWidth: b, clientHeight: w, offsetWidth: R } = Yt(e);
    let { placement: l } = n;
    const { clientWidth: E, offsetWidth: $ } = s, S = st(s, "position") === "fixed", h = Math.abs(S ? E - $ : b - R), L = f && S ? (
      /* istanbul ignore next */
      h
    ) : 0, C = b - (f ? 0 : h) - 1, {
      width: u,
      height: v,
      left: m,
      right: jt,
      top: D
    } = Gt(e, !0), { x: X, y: _ } = {
      x: m,
      y: D
    };
    pt(a, {
      top: "",
      left: "",
      right: "",
      bottom: ""
    });
    let N = 0, k = "", P = 0, ct = "", M = "", Z = "", rt = "";
    const A = a.offsetWidth || 0, y = a.offsetHeight || 0, dt = A / 2;
    let F = D - d - y < 0, I = D + d + v + y >= w, j = m - r - A < L, z = m + r + u + A >= C;
    const tt = ["left", "right"], ht = ["top", "bottom"];
    F = tt.includes(l) ? D + v / 2 - d / 2 - y < 0 : F, I = tt.includes(l) ? D + d / 2 + v / 2 + y >= w : I, j = ht.includes(l) ? m + u / 2 - r / 2 < L : j, z = ht.includes(l) ? m + r / 2 + u / 2 >= C : z, l = tt.includes(l) && j && z ? "top" : l, l = l === "top" && F ? "bottom" : l, l = l === "bottom" && I ? "top" : l, l = l === "left" && j ? "right" : l, l = l === "right" && z ? (
      /* istanbul ignore next */
      "left"
    ) : l, t.className.includes(l) || (t.className = t.className.replace(i, p[l])), tt.includes(l) ? (l === "left" ? P = X - r - (c ? A : 0) : P = X + u + (c ? A : 0), F && I ? (N = 0, k = 0, M = D + v / 2 - y / 2) : F ? (N = _, k = "", M = v / 2 - A) : I ? (N = _ - d + v, k = "", M = d - v / 2 - A) : (N = _ - d / 2 + v / 2, M = d / 2 - y / 2)) : ht.includes(l) && (l === "top" ? N = _ - d - (c ? y : 0) : N = _ + v + (c ? y : 0), j ? (P = 0, Z = X + u / 2 - dt) : z ? (P = "auto", ct = 0, rt = u / 2 + C - jt - dt) : (P = X - r / 2 + u / 2, Z = r / 2 - dt)), pt(t, {
      top: `${N}px`,
      bottom: k === "" ? "" : `${k}px`,
      left: P === "auto" ? P : `${P}px`,
      right: ct !== "" ? `${ct}px` : ""
    }), x(a) && (M !== "" && (a.style.top = `${M}px`), Z !== "" ? a.style.left = `${Z}px` : rt !== "" && (a.style.right = `${rt}px`));
    const zt = J(`updated.bs.${K(o.name)}`);
    Q(e, zt);
  }
}, Tt = {
  template: Ee(T),
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
}, _t = "data-original-title", O = "Tooltip", H = (o, i, e) => {
  if (Jt(i) && i.length) {
    let t = i.trim();
    Kt(e) && (t = e(t));
    const n = new DOMParser().parseFromString(t, "text/html");
    o.append(...n.body.childNodes);
  } else
    x(i) ? o.append(i) : (Qt(i) || Vt(i) && i.every(Xt)) && o.append(...i);
}, $e = (o) => {
  const i = o.name === O, { id: e, element: t, options: s } = o, { title: n, placement: a, template: p, animation: f, customClass: c, sanitizeFn: r, dismissible: d, content: b, btnClose: w } = s, R = i ? T : it, l = { ...Mt };
  let E = [], $ = [];
  xt(t) && (l.left = "end", l.right = "start");
  const at = `bs-${R}-${l[a]}`;
  let S;
  if (x(p))
    S = p;
  else {
    const L = q("div");
    H(L, p, r), S = L.firstChild;
  }
  o.tooltip = x(S) ? S.cloneNode(!0) : (
    /* istanbul ignore next */
    void 0
  );
  const { tooltip: h } = o;
  if (h) {
    nt(h, "id", e), nt(h, "role", T);
    const L = i ? `${T}-inner` : `${it}-body`, C = i ? null : et(`.${it}-header`, h), u = et(`.${L}`, h);
    o.arrow = et(`.${R}-arrow`, h);
    const { arrow: v } = o;
    if (x(n))
      E = [n.cloneNode(!0)];
    else {
      const m = q("div");
      H(m, n, r), E = [...m.childNodes];
    }
    if (x(b))
      $ = [b.cloneNode(!0)];
    else {
      const m = q("div");
      H(m, b, r), $ = [...m.childNodes];
    }
    if (d)
      if (n)
        if (x(w))
          E = [...E, w.cloneNode(!0)];
        else {
          const m = q("div");
          H(m, w, r), E = [...E, m.firstChild];
        }
      else if (C && C.remove(), x(w))
        $ = [...$, w.cloneNode(!0)];
      else {
        const m = q("div");
        H(m, w, r), $ = [...$, m.firstChild];
      }
    i ? n && u && H(u, n, r) : (n && C && H(C, E, r), b && u && H(u, $, r), o.btn = et(".btn-close", h) || void 0), W(h, "position-fixed"), W(v, "position-absolute"), Y(h, R) || W(h, R), f && !Y(h, Et) && W(h, Et), c && !Y(h, c) && W(h, c), Y(h, at) || W(h, at);
  }
}, Te = (o) => {
  const i = ["HTML", "BODY"], e = [];
  let { parentNode: t } = o;
  for (; t && !i.includes(t.nodeName); )
    t = Zt(t), te(t) || ee(t) || e.push(t);
  return e.find((s, n) => st(s, "position") !== "relative" && e.slice(n + 1).every((a) => st(a, "position") === "static") ? s : null) || /* istanbul ignore next: optional guard */
  lt(o).body;
}, Ce = `[${ue}="${T}"],[data-tip="${T}"]`, kt = "title";
let Ct = (o) => St(o, O);
const Pe = (o) => new G(o), ye = (o) => {
  const { element: i, tooltip: e, container: t, offsetParent: s } = o;
  Rt(i, Nt), be(e, t === s ? t : s);
}, U = (o) => {
  const { tooltip: i, container: e, offsetParent: t } = o;
  return i && ve(i, e === t ? e : t);
}, He = (o, i) => {
  const { element: e } = o;
  o._toggleEventListeners(), Lt(e, _t) && o.name === O && It(o), i && i();
}, Ft = (o, i) => {
  const e = i ? ut : gt, { element: t } = o;
  e(lt(t), At, o.handleTouch, V), [Ot, Bt].forEach((s) => {
    e(Wt(t), s, o.update, V);
  });
}, Pt = (o) => {
  const { element: i } = o, e = J(`shown.bs.${K(o.name)}`);
  Ft(o, !0), Q(i, e), B.clear(i, "in");
}, yt = (o) => {
  const { element: i } = o, e = J(`hidden.bs.${K(o.name)}`);
  Ft(o), ye(o), Q(i, e), B.clear(i, "out");
}, Ht = (o, i) => {
  const e = i ? ut : gt, { element: t, container: s, offsetParent: n } = o, { offsetHeight: a, scrollHeight: p } = s, f = vt(t, `.${bt}`), c = vt(t, `.${wt}`), r = Wt(t), b = s === n && a !== p ? s : r;
  e(b, Bt, o.update, V), e(b, Ot, o.update, V), f && e(f, `hide.bs.${bt}`, o.handleHide), c && e(c, `hide.bs.${wt}`, o.handleHide);
}, It = (o, i) => {
  const e = [_t, kt], { element: t } = o;
  nt(
    t,
    e[i ? 0 : 1],
    i || fe(t, e[0]) || /* istanbul ignore next */
    ""
  ), Rt(t, e[i ? 1 : 0]);
};
class G extends we {
  /**
   * @param target the target element
   * @param config the instance options
   */
  constructor(e, t) {
    super(e, t);
    // TOOLTIP PUBLIC METHODS
    // ======================
    /** Handles the focus event on iOS. */
    g(this, "handleFocus", () => se(this.element));
    /** Shows the tooltip. */
    g(this, "handleShow", () => this.show());
    /** Hides the tooltip. */
    g(this, "handleHide", () => this.hide());
    /** Updates the tooltip position. */
    g(this, "update", () => {
      $t(this);
    });
    /** Toggles the tooltip visibility. */
    g(this, "toggle", () => {
      const { tooltip: e } = this;
      e && !U(this) ? this.show() : this.hide();
    });
    /**
     * Handles the `touchstart` event listener for `Tooltip`
     *
     * @this {Tooltip}
     * @param {TouchEvent} e the `Event` object
     */
    g(this, "handleTouch", ({ target: e }) => {
      const { tooltip: t, element: s } = this;
      t && t.contains(e) || e === s || e && s.contains(e) || this.hide();
    });
    /**
     * Toggles on/off the `Tooltip` event listeners.
     *
     * @param add when `true`, event listeners are added
     */
    g(this, "_toggleEventListeners", (e) => {
      const t = e ? ut : gt, { element: s, options: n, btn: a } = this, { trigger: p } = n, c = !!(this.name !== O && n.dismissible);
      p.includes("manual") || (this.enabled = !!e, p.split(" ").forEach((d) => {
        d === le ? (t(s, ae, this.handleShow), t(s, ce, this.handleShow), c || (t(s, re, this.handleHide), t(lt(s), At, this.handleTouch, V))) : d === mt ? t(s, d, c ? this.handleShow : this.toggle) : d === de && (t(s, he, this.handleShow), c || t(s, pe, this.handleHide), me && t(s, mt, this.handleFocus)), c && a && t(a, mt, this.handleHide);
      }));
    });
    const { element: s } = this, n = this.name === O, a = n ? T : it, p = n ? O : Dt;
    Ct = (c) => St(c, p), this.enabled = !0, this.id = `${a}-${oe(s, a)}`;
    const { options: f } = this;
    !f.title && n || !n && !f.content || (ie(Tt, { titleAttr: "" }), Lt(s, kt) && n && typeof f.title == "string" && It(this, f.title), this.container = Te(s), this.offsetParent = ["sticky", "fixed"].some(
      (c) => st(this.container, "position") === c
    ) ? this.container : lt(this.element).body, $e(this), this._toggleEventListeners(!0));
  }
  /**
   * Returns component name string.
   */
  get name() {
    return O;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return Tt;
  }
  show() {
    const { options: e, tooltip: t, element: s, container: n, offsetParent: a, id: p } = this, { animation: f } = e, c = B.get(s, "out"), r = n === a ? n : a;
    B.clear(s, "out"), t && !c && !U(this) && B.set(
      s,
      () => {
        const d = J(`show.bs.${K(this.name)}`);
        Q(s, d), d.defaultPrevented || (ge(t, r), nt(s, Nt, `#${p}`), this.update(), Ht(this, !0), Y(t, ft) || W(t, ft), f ? ot(t, () => Pt(this)) : Pt(this));
      },
      17,
      "in"
    );
  }
  hide() {
    const { options: e, tooltip: t, element: s } = this, { animation: n, delay: a } = e;
    B.clear(s, "in"), t && U(this) && B.set(
      s,
      () => {
        const p = J(`hide.bs.${K(this.name)}`);
        Q(s, p), p.defaultPrevented || (this.update(), ne(t, ft), Ht(this), n ? ot(t, () => yt(this)) : yt(this));
      },
      a + 17,
      "out"
    );
  }
  /** Enables the tooltip. */
  enable() {
    const { enabled: e } = this;
    e || (this._toggleEventListeners(!0), this.enabled = !e);
  }
  /** Disables the tooltip. */
  disable() {
    const { tooltip: e, options: t, enabled: s } = this, { animation: n } = t;
    s && (e && U(this) && n ? (this.hide(), ot(e, () => this._toggleEventListeners())) : this._toggleEventListeners(), this.enabled = !s);
  }
  /** Toggles the `disabled` property. */
  toggleEnabled() {
    this.enabled ? this.disable() : this.enable();
  }
  /** Removes the `Tooltip` from the target element. */
  dispose() {
    const { tooltip: e, options: t } = this, s = { ...this, name: this.name }, n = () => setTimeout(() => He(s, () => super.dispose()), 17);
    t.animation && U(s) ? (this.options.delay = 0, this.hide(), ot(e, n)) : n();
  }
}
g(G, "selector", Ce), g(G, "init", Pe), g(G, "getInstance", Ct), g(G, "styleTip", $t);
export {
  G as T,
  it as a,
  Ee as g,
  Dt as p,
  $t as s,
  Tt as t
};
//# sourceMappingURL=tooltip-4ba42f84.mjs.map
