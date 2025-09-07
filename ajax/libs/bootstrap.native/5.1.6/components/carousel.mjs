import { x as Q, b as U, O as q, B as at, t as rt, H as E, j as ct, c as lt, d as P, e as I, W as N, G as f, _ as S, h as d, a as $, D as F, T as _, m as J, Z as K, u as dt, f as ht, s as k, E as V, r as Y, w as ut, A as ft, g as L, i as gt, v as R, k as mt, N as tt, K as et, z as vt, I as pt, l as j, n as M } from "./base-component-BazRqYWL.mjs";
import { a as g } from "./activeClass-iqaD75Su.mjs";
import { d as z, g as st } from "./getTargetElement-DX_B2QXD.mjs";
import { i as it } from "./isDisabled-CipSDrHr.mjs";
const T = "carousel", nt = "Carousel", y = `[data-bs-ride="${T}"]`, h = `${T}-item`, O = "data-bs-slide-to", p = "data-bs-slide", x = "paused", xt = Q() ? U : q;
console.log({ isMobile: Q(), touchEvent: xt });
const G = {
  pause: "hover",
  keyboard: !1,
  touch: !0,
  interval: 5e3
}, m = (i) => rt(i, nt), $t = (i) => new Ht(i);
let b = 0, A = 0, H = 0;
const w = J(`slide.bs.${T}`), X = J(`slid.bs.${T}`), W = (i) => {
  const { index: s, direction: t, element: e, slides: o, options: a } = i;
  if (i.isAnimating) {
    const r = B(i), n = t === "left" ? "next" : "prev", l = t === "left" ? "start" : "end";
    f(o[s], g), $(o[s], `${h}-${n}`), $(o[s], `${h}-${l}`), $(o[r], g), $(o[r], `${h}-${l}`), K(e, X), d.clear(e, p), i.cycle && !P(e).hidden && a.interval && !i.isPaused && i.cycle();
  }
};
function Tt() {
  const i = m(this);
  i && !i.isPaused && !d.get(this, x) && f(this, x);
}
function Pt() {
  const i = m(this);
  i && i.isPaused && !d.get(this, x) && i.cycle();
}
function It(i) {
  i.preventDefault();
  const s = tt(this, y) || st(this), t = s && m(s);
  if (it(this) || !t || t.isAnimating) return;
  const e = +(et(this, O) || 0);
  this && !S(this, g) && !Number.isNaN(e) && t.to(e);
}
function bt(i) {
  i.preventDefault();
  const s = tt(this, y) || st(this), t = s && m(s);
  if (it(this) || !t || t.isAnimating) return;
  const e = et(this, p);
  e === "next" ? t.next() : e === "prev" && t.prev();
}
const yt = ({ code: i, target: s }) => {
  const t = P(s), [e] = [...I(y, t)].filter((l) => F(l)), o = m(e);
  if (!o || o.isAnimating || /textarea|input|select/i.test(s.nodeName)) return;
  const a = E(e);
  i === (a ? M : j) ? o.prev() : i === (a ? j : M) && o.next();
};
function Z(i) {
  const { target: s } = i, t = m(this);
  t && t.isTouch && !t.controls.includes(s) && !t.controls.includes(s?.parentElement) && (!t.indicator || !t.indicator.contains(s)) && i.preventDefault();
}
function At(i) {
  const { target: s } = i, t = m(this);
  if (!t || t.isAnimating || t.isTouch) return;
  const { controls: e, indicator: o } = t;
  ![...e, o].every(
    (a) => a && (a === s || a.contains(s))
  ) && this.contains(s) && (b = i.pageX, t.isTouch = !0, ot(t, !0));
}
const Et = (i) => {
  A = i.pageX;
}, Ct = (i) => {
  const { target: s } = i, t = P(s), e = [...I(y, t)].map((n) => m(n)).find((n) => n.isTouch);
  if (!e) return;
  const { element: o, index: a } = e, r = E(o);
  H = i.pageX, e.isTouch = !1, ot(e), !t.getSelection()?.toString().length && o.contains(s) && Math.abs(b - H) > 120 && (A < b ? e.to(a + (r ? -1 : 1)) : A > b && e.to(a + (r ? 1 : -1))), b = 0, A = 0, H = 0;
}, D = (i, s) => {
  const { indicators: t } = i;
  [...t].forEach((e) => $(e, g)), i.indicators[s] && f(t[s], g);
}, ot = (i, s) => {
  const { element: t } = i, e = s ? V : Y;
  e(
    P(t),
    vt,
    Et,
    L
  ), e(
    P(t),
    pt,
    Ct,
    L
  );
}, B = (i) => {
  const { slides: s, element: t } = i, e = N(
    `.${h}.${g}`,
    t
  );
  return e ? [...s].indexOf(e) : -1;
};
class Ht extends at {
  static selector = y;
  static init = $t;
  static getInstance = m;
  constructor(s, t) {
    super(s, t);
    const { element: e } = this;
    this.direction = E(e) ? "right" : "left", this.isTouch = !1, this.slides = ct(h, e);
    const { slides: o } = this;
    if (o.length < 2) return;
    const a = B(this), r = [...o].find(
      (u) => lt(u, `.${h}-next`)
    );
    this.index = a;
    const n = P(e);
    this.controls = [
      ...I(`[${p}]`, e),
      ...I(
        `[${p}][${z}="#${e.id}"]`,
        n
      )
    ].filter((u, v, c) => v === c.indexOf(u)), this.indicator = N(
      `.${T}-indicators`,
      e
    ), this.indicators = [
      ...this.indicator ? I(`[${O}]`, this.indicator) : [],
      ...I(
        `[${O}][${z}="#${e.id}"]`,
        n
      )
    ].filter((u, v, c) => v === c.indexOf(u));
    const { options: l } = this;
    this.options.interval = l.interval === !0 ? G.interval : l.interval, r ? this.index = [...o].indexOf(r) : a < 0 && (this.index = 0, f(o[0], g), this.indicators.length && D(this, 0)), this.indicators.length && D(this, this.index), this._toggleEventListeners(!0), l.interval && this.cycle();
  }
  get name() {
    return nt;
  }
  get defaults() {
    return G;
  }
  get isPaused() {
    return S(this.element, x);
  }
  get isAnimating() {
    return N(
      `.${h}-next,.${h}-prev`,
      this.element
    ) !== null;
  }
  cycle() {
    const { element: s, options: t, isPaused: e, index: o } = this;
    d.clear(s, T), e && (d.clear(s, x), $(s, x)), d.set(
      s,
      () => {
        this.element && !this.isPaused && !this.isTouch && F(s) && this.to(o + 1);
      },
      t.interval,
      T
    );
  }
  pause() {
    const { element: s, options: t } = this;
    this.isPaused || !t.interval || (f(s, x), d.set(
      s,
      () => {
      },
      1,
      x
    ));
  }
  next() {
    this.isAnimating || this.to(this.index + 1);
  }
  prev() {
    this.isAnimating || this.to(this.index - 1);
  }
  to(s) {
    const { element: t, slides: e, options: o } = this, a = B(this), r = E(t);
    let n = s;
    if (this.isAnimating || a === n || d.get(t, p)) return;
    a < n || a === 0 && n === e.length - 1 ? this.direction = r ? "right" : "left" : (a > n || a === e.length - 1 && n === 0) && (this.direction = r ? "left" : "right");
    const { direction: l } = this;
    n < 0 ? n = e.length - 1 : n >= e.length && (n = 0);
    const u = l === "left" ? "next" : "prev", v = l === "left" ? "start" : "end", c = {
      relatedTarget: e[n],
      from: a,
      to: n,
      direction: l
    };
    _(w, c), _(X, c), K(t, w), !w.defaultPrevented && (this.index = n, D(this, n), dt(e[n]) && S(t, "slide") ? d.set(
      t,
      () => {
        f(e[n], `${h}-${u}`), ht(e[n]), f(e[n], `${h}-${v}`), f(e[a], `${h}-${v}`), k(
          e[n],
          () => this.slides && this.slides.length && W(this)
        );
      },
      0,
      p
    ) : (f(e[n], g), $(e[a], g), d.set(
      t,
      () => {
        d.clear(t, p), t && o.interval && !this.isPaused && this.cycle(), K(t, X);
      },
      0,
      p
    )));
  }
  _toggleEventListeners = (s) => {
    const { element: t, options: e, slides: o, controls: a, indicators: r } = this, { touch: n, pause: l, interval: u, keyboard: v } = e, c = s ? V : Y;
    l && u && (c(t, ut, Tt), c(t, ft, Pt)), n && o.length > 2 && (c(
      t,
      q,
      At,
      L
    ), c(t, U, Z, { passive: !1 }), c(t, gt, Z, { passive: !1 })), a.length && a.forEach((C) => {
      c(C, R, bt);
    }), r.length && r.forEach((C) => {
      c(C, R, It);
    }), v && c(P(t), mt, yt);
  };
  dispose() {
    const { isAnimating: s } = this, t = {
      ...this,
      isAnimating: s
    };
    this._toggleEventListeners(), super.dispose(), t.isAnimating && k(t.slides[t.index], () => {
      W(t);
    });
  }
}
export {
  Ht as default
};
//# sourceMappingURL=carousel.mjs.map
