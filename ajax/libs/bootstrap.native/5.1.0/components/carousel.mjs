import { B as it, b as H, R as nt, v as ot, d as T, u as y, H as X, K as u, G as w, c as d, q as $, T as z, C as O, a as K, e as at, m as rt, n as k, X as ct, p as F, E as J, r as Q, h as lt, y as dt, f as R, D as ht, i as ft, j as ut, g as G, l as gt, S as V, k as Y, O as mt, x as pt, s as _, o as j } from "./base-component-LaJIjMhh.mjs";
import { a as g } from "./activeClass-iqaD75Su.mjs";
import { d as q, g as Z } from "./getTargetElement-D4ALSKV7.mjs";
import { i as tt } from "./isDisabled-DmmaKYeZ.mjs";
const P = "carousel", et = "Carousel", I = `[data-bs-ride="${P}"]`, h = `${P}-item`, B = "data-bs-slide-to", v = "data-bs-slide", x = "paused", M = {
  pause: "hover",
  keyboard: !1,
  touch: !0,
  interval: 5e3
}, m = (i) => ct(i, et), vt = (i) => new Ht(i);
let C = 0, b = 0, E = 0;
const S = F(`slide.bs.${P}`), L = F(`slid.bs.${P}`), U = (i) => {
  const { index: s, direction: t, element: e, slides: o, options: a } = i;
  if (i.isAnimating) {
    const r = N(i), n = t === "left" ? "next" : "prev", l = t === "left" ? "start" : "end";
    u(o[s], g), $(o[s], `${h}-${n}`), $(o[s], `${h}-${l}`), $(o[r], g), $(o[r], `${h}-${l}`), K(e, L), d.clear(e, v), i.cycle && !T(e).hidden && a.interval && !i.isPaused && i.cycle();
  }
};
function xt() {
  const i = m(this);
  i && !i.isPaused && !d.get(this, x) && u(this, x);
}
function $t() {
  const i = m(this);
  i && i.isPaused && !d.get(this, x) && i.cycle();
}
function Pt(i) {
  i.preventDefault();
  const s = V(this, I) || Z(this), t = s && m(s);
  if (tt(this) || !t || t.isAnimating) return;
  const e = +(Y(this, B) || 0);
  this && !w(this, g) && !Number.isNaN(e) && t.to(e);
}
function Tt(i) {
  i.preventDefault();
  const s = V(this, I) || Z(this), t = s && m(s);
  if (tt(this) || !t || t.isAnimating) return;
  const e = Y(this, v);
  e === "next" ? t.next() : e === "prev" && t.prev();
}
const yt = ({ code: i, target: s }) => {
  const t = T(s), [e] = [...y(I, t)].filter((l) => z(l)), o = m(e);
  if (!o || o.isAnimating || /textarea|input|select/i.test(s.nodeName)) return;
  const a = H(e);
  i === (a ? _ : j) ? o.prev() : i === (a ? j : _) && o.next();
};
function W(i) {
  const { target: s } = i, t = m(this);
  t && t.isTouch && (t.indicator && !t.indicator.contains(s) || !t.controls.includes(s)) && (i.stopImmediatePropagation(), i.stopPropagation(), i.preventDefault());
}
function Ct(i) {
  const { target: s } = i, t = m(this);
  if (!t || t.isAnimating || t.isTouch) return;
  const { controls: e, indicators: o } = t;
  [...e, ...o].every(
    (a) => a === s || a.contains(s)
  ) || (C = i.pageX, this.contains(s) && (t.isTouch = !0, st(t, !0)));
}
const It = (i) => {
  b = i.pageX;
}, bt = (i) => {
  const { target: s } = i, t = T(s), e = [...y(I, t)].map((n) => m(n)).find((n) => n.isTouch);
  if (!e) return;
  const { element: o, index: a } = e, r = H(o);
  E = i.pageX, e.isTouch = !1, st(e), !t.getSelection()?.toString().length && o.contains(s) && Math.abs(C - E) > 120 && (b < C ? e.to(a + (r ? -1 : 1)) : b > C && e.to(a + (r ? 1 : -1))), C = 0, b = 0, E = 0;
}, D = (i, s) => {
  const { indicators: t } = i;
  [...t].forEach((e) => $(e, g)), i.indicators[s] && u(t[s], g);
}, st = (i, s) => {
  const { element: t } = i, e = s ? J : Q;
  e(
    T(t),
    mt,
    It,
    R
  ), e(
    T(t),
    pt,
    bt,
    R
  );
}, N = (i) => {
  const { slides: s, element: t } = i, e = X(
    `.${h}.${g}`,
    t
  );
  return e ? [...s].indexOf(e) : -1;
};
class Ht extends it {
  static selector = I;
  static init = vt;
  static getInstance = m;
  constructor(s, t) {
    super(s, t);
    const { element: e } = this;
    this.direction = H(e) ? "right" : "left", this.isTouch = !1, this.slides = nt(h, e);
    const { slides: o } = this;
    if (o.length < 2) return;
    const a = N(this), r = [...o].find(
      (f) => ot(f, `.${h}-next`)
    );
    this.index = a;
    const n = T(e);
    this.controls = [
      ...y(`[${v}]`, e),
      ...y(
        `[${v}][${q}="#${e.id}"]`,
        n
      )
    ].filter((f, p, c) => p === c.indexOf(f)), this.indicator = X(
      `.${P}-indicators`,
      e
    ), this.indicators = [
      ...this.indicator ? y(`[${B}]`, this.indicator) : [],
      ...y(
        `[${B}][${q}="#${e.id}"]`,
        n
      )
    ].filter((f, p, c) => p === c.indexOf(f));
    const { options: l } = this;
    this.options.interval = l.interval === !0 ? M.interval : l.interval, r ? this.index = [...o].indexOf(r) : a < 0 && (this.index = 0, u(o[0], g), this.indicators.length && D(this, 0)), this.indicators.length && D(this, this.index), this._toggleEventListeners(!0), l.interval && this.cycle();
  }
  get name() {
    return et;
  }
  get defaults() {
    return M;
  }
  get isPaused() {
    return w(this.element, x);
  }
  get isAnimating() {
    return X(
      `.${h}-next,.${h}-prev`,
      this.element
    ) !== null;
  }
  cycle() {
    const { element: s, options: t, isPaused: e, index: o } = this;
    d.clear(s, P), e && (d.clear(s, x), $(s, x)), d.set(
      s,
      () => {
        this.element && !this.isPaused && !this.isTouch && z(s) && this.to(o + 1);
      },
      t.interval,
      P
    );
  }
  pause() {
    const { element: s, options: t } = this;
    this.isPaused || !t.interval || (u(s, x), d.set(
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
    const { element: t, slides: e, options: o } = this, a = N(this), r = H(t);
    let n = s;
    if (this.isAnimating || a === n || d.get(t, v)) return;
    a < n || a === 0 && n === e.length - 1 ? this.direction = r ? "right" : "left" : (a > n || a === e.length - 1 && n === 0) && (this.direction = r ? "left" : "right");
    const { direction: l } = this;
    n < 0 ? n = e.length - 1 : n >= e.length && (n = 0);
    const f = l === "left" ? "next" : "prev", p = l === "left" ? "start" : "end", c = {
      relatedTarget: e[n],
      from: a,
      to: n,
      direction: l
    };
    O(S, c), O(L, c), K(t, S), !S.defaultPrevented && (this.index = n, D(this, n), at(e[n]) && w(t, "slide") ? d.set(
      t,
      () => {
        u(e[n], `${h}-${f}`), rt(e[n]), u(e[n], `${h}-${p}`), u(e[a], `${h}-${p}`), k(
          e[n],
          () => this.slides && this.slides.length && U(this)
        );
      },
      0,
      v
    ) : (u(e[n], g), $(e[a], g), d.set(
      t,
      () => {
        d.clear(t, v), t && o.interval && !this.isPaused && this.cycle(), K(t, L);
      },
      0,
      v
    )));
  }
  _toggleEventListeners = (s) => {
    const { element: t, options: e, slides: o, controls: a, indicators: r } = this, { touch: n, pause: l, interval: f, keyboard: p } = e, c = s ? J : Q;
    l && f && (c(t, lt, xt), c(t, dt, $t)), n && o.length > 2 && (c(
      t,
      ht,
      Ct,
      R
    ), c(t, ft, W, { passive: !1 }), c(t, ut, W, { passive: !1 })), a.length && a.forEach((A) => {
      c(A, G, Tt);
    }), r.length && r.forEach((A) => {
      c(A, G, Pt);
    }), p && c(T(t), gt, yt);
  };
  dispose() {
    const { isAnimating: s } = this, t = {
      ...this,
      isAnimating: s
    };
    this._toggleEventListeners(), super.dispose(), t.isAnimating && k(t.slides[t.index], () => {
      U(t);
    });
  }
}
export {
  Ht as default
};
//# sourceMappingURL=carousel.mjs.map
