var bt = Object.defineProperty;
var At = (n, t, e) => t in n ? bt(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[t] = e;
var u = (n, t, e) => (At(n, typeof t != "symbol" ? t + "" : t, e), e);
import { closest as W, hasAttribute as J, getAttribute as P, createCustomEvent as g, getElementsByClassName as ct, dispatchEvent as m, addClass as Q, setAttribute as V, ariaExpanded as X, focus as I, removeClass as Y, mouseclickEvent as O, getInstance as $t, getElementStyle as xt, isRTL as Ht, hasClass as Z, setElementStyle as S, getDocumentElement as Lt, getBoundingClientRect as St, ObjectAssign as tt, getDocument as R, focusEvent as lt, keydownEvent as Tt, keyupEvent as kt, scrollEvent as Pt, resizeEvent as It, getWindow as Bt, passiveHandler as Mt, isHTMLElement as Nt, mousedownEvent as jt, keyArrowDown as B, keyArrowUp as M, keyEscape as Ft } from "@thednp/shorty";
import { addListener as at, removeListener as pt } from "@thednp/event-listener";
import { s as h } from "./showClass-f6a4d601.mjs";
import { d as ft } from "./dataBsToggle-330f300b.mjs";
import { d as b } from "./dropdownClasses-66be00d3.mjs";
import { B as Wt } from "./base-component-a56d44ba.mjs";
const ut = "Dropdown", mt = "dropdown-menu", ht = (n) => {
  const t = W(n, "A");
  return n.tagName === "A" && // anchor href starts with #
  J(n, "href") && P(n, "href").slice(-1) === "#" || // OR a child of an anchor with href starts with #
  t && J(t, "href") && P(t, "href").slice(-1) === "#";
}, [p, N, j, F] = b, gt = `[${ft}="${p}"]`, f = (n) => $t(n, ut), Ot = (n) => new D(n), Rt = `${mt}-end`, et = [p, N], nt = [j, F], ot = ["A", "BUTTON"], _t = {
  offset: 5,
  // [number] 5(px)
  display: "dynamic"
  // [dynamic|static]
}, T = g(`show.bs.${p}`), st = g(`shown.bs.${p}`), k = g(`hide.bs.${p}`), it = g(`hidden.bs.${p}`), Et = g(`updated.bs.${p}`), wt = (n) => {
  const { element: t, menu: e, parentElement: o, options: r } = n, { offset: s } = r;
  if (xt(e, "position") !== "static") {
    const i = Ht(t), d = Z(e, Rt);
    ["margin", "top", "bottom", "left", "right"].forEach((a) => {
      const G = {};
      G[a] = "", S(e, G);
    });
    let c = b.find((a) => Z(o, a)) || /* istanbul ignore next: fallback position */
    p;
    const vt = {
      dropdown: [s, 0, 0],
      dropup: [0, 0, s],
      dropstart: i ? [-1, 0, 0, s] : [-1, s, 0],
      dropend: i ? [-1, s, 0] : [-1, 0, 0, s]
    }, E = {
      dropdown: { top: "100%" },
      dropup: { top: "auto", bottom: "100%" },
      dropstart: i ? { left: "100%", right: "auto" } : { left: "auto", right: "100%" },
      dropend: i ? { left: "auto", right: "100%" } : { left: "100%", right: "auto" },
      menuStart: i ? { right: "0", left: "auto" } : { right: "auto", left: "0" },
      menuEnd: i ? { right: "auto", left: "0" } : { right: "0", left: "auto" }
    }, { offsetWidth: w, offsetHeight: $ } = e, { clientWidth: _, clientHeight: z } = Lt(t), {
      left: v,
      top: x,
      width: U,
      height: Ct
    } = St(t), H = v - w - s < 0, L = v + w + U + s >= _, yt = x + $ + s >= z, K = x + $ + Ct + s >= z, q = x - $ - s < 0, C = (!i && d || i && !d) && v + U - w < 0, y = (i && d || !i && !d) && v + w >= _;
    if (nt.includes(c) && H && L && (c = p), c === j && (i ? L : H) && (c = F), c === F && (i ? H : L) && (c = j), c === N && q && !K && (c = p), c === p && K && !q && (c = N), nt.includes(c) && yt && tt(E[c], {
      top: "auto",
      bottom: 0
    }), et.includes(c) && (C || y)) {
      let a = { left: "auto", right: "auto" };
      !C && y && !i && (a = { left: "auto", right: 0 }), C && !y && i && (a = { left: 0, right: "auto" }), a && tt(E[c], a);
    }
    const Dt = vt[c];
    S(e, {
      ...E[c],
      margin: `${Dt.map((a) => a && `${a}px`).join(" ")}`
    }), et.includes(c) && d && d && S(e, E[!i && C || i && y ? "menuStart" : (
      /* istanbul ignore next */
      "menuEnd"
    )]), m(o, Et);
  }
}, zt = (n) => [...n.children].map((t) => {
  if (t && ot.includes(t.tagName))
    return t;
  const { firstElementChild: e } = t;
  return e && ot.includes(e.tagName) ? e : null;
}).filter((t) => t), rt = (n) => {
  const { element: t, options: e } = n, o = n.open ? at : pt, r = R(t);
  o(r, O, dt), o(r, lt, dt), o(r, Tt, Kt), o(r, kt, qt), e.display === "dynamic" && [Pt, It].forEach((s) => {
    o(Bt(t), s, Gt, Mt);
  });
}, A = (n) => {
  const t = [...b, "btn-group", "input-group"].map((e) => ct(`${e} ${h}`, R(n))).find((e) => e.length);
  if (t && t.length)
    return [...t[0].children].find(
      (e) => b.some((o) => o === P(e, ft))
    );
}, dt = (n) => {
  const { target: t, type: e } = n;
  if (t && Nt(t)) {
    const o = A(t), r = o && f(o);
    if (r) {
      const { parentElement: s, menu: i } = r, d = s && s.contains(t) && (t.tagName === "form" || W(t, "form") !== null);
      [O, jt].includes(e) && ht(t) && n.preventDefault(), !d && e !== lt && t !== o && t !== i && r.hide();
    }
  }
}, Ut = (n) => {
  const { target: t } = n, e = t && W(t, gt), o = e && f(e);
  o && (n.stopPropagation(), o.toggle(), e && ht(e) && n.preventDefault());
}, Kt = (n) => {
  [B, M].includes(n.code) && n.preventDefault();
};
function qt(n) {
  const { code: t } = n, e = A(this), o = e && f(e), { activeElement: r } = e && R(e);
  if (o && r) {
    const { menu: s, open: i } = o, d = zt(s);
    if (d && d.length && [B, M].includes(t)) {
      let l = d.indexOf(r);
      r === e ? l = 0 : t === M ? l = l > 1 ? l - 1 : 0 : t === B && (l = l < d.length - 1 ? l + 1 : l), d[l] && I(d[l]);
    }
    Ft === t && i && (o.toggle(), I(e));
  }
}
function Gt() {
  const n = A(this), t = n && f(n);
  t && t.open && wt(t);
}
class D extends Wt {
  /**
   * @param target Element or string selector
   * @param config the instance options
   */
  constructor(e, o) {
    super(e, o);
    /**
     * Toggles on/off the `click` event listener of the `Dropdown`.
     *
     * @param add when `true`, it will add the event listener
     */
    u(this, "_toggleEventListeners", (e) => {
      (e ? at : pt)(this.element, O, Ut);
    });
    const { parentElement: r } = this.element, [s] = ct(mt, r);
    s && (this.parentElement = r, this.menu = s, this._toggleEventListeners(!0));
  }
  /**
   * Returns component name string.
   */
  get name() {
    return ut;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return _t;
  }
  // DROPDOWN PUBLIC METHODS
  // =======================
  /** Shows/hides the dropdown menu to the user. */
  toggle() {
    this.open ? this.hide() : this.show();
  }
  /** Shows the dropdown menu to the user. */
  show() {
    const { element: e, open: o, menu: r, parentElement: s } = this;
    if (!o) {
      const i = A(e), d = i && f(i);
      d && d.hide(), [T, st, Et].forEach((l) => {
        l.relatedTarget = e;
      }), m(s, T), T.defaultPrevented || (Q(r, h), Q(s, h), V(e, X, "true"), wt(this), this.open = !o, I(e), rt(this), m(s, st));
    }
  }
  /** Hides the dropdown menu from the user. */
  hide() {
    const { element: e, open: o, menu: r, parentElement: s } = this;
    o && ([k, it].forEach((i) => {
      i.relatedTarget = e;
    }), m(s, k), k.defaultPrevented || (Y(r, h), Y(s, h), V(e, X, "false"), this.open = !o, rt(this), m(s, it)));
  }
  /** Removes the `Dropdown` component from the target element. */
  dispose() {
    this.open && this.hide(), this._toggleEventListeners(), super.dispose();
  }
}
u(D, "selector", gt), u(D, "init", Ot), u(D, "getInstance", f);
export {
  D as default
};
//# sourceMappingURL=dropdown.mjs.map
