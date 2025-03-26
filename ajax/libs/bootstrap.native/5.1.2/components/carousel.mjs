import { B as it, H as C, j as nt, b as ot, d as T, c as I, W as N, G as u, _ as S, h as d, a as $, D as Q, T as _, Z as K, u as at, e as rt, s as k, t as ct, m as U, E as q, r as F, w as lt, A as dt, f as L, O as ht, g as ft, i as ut, v as R, k as gt, N as J, K as V, z as mt, I as pt, l as j, n as z } from "./base-component-BMXjNJAi.mjs";
import { a as g } from "./activeClass-iqaD75Su.mjs";
import { d as G, g as Y } from "./getTargetElement-px782XHx.mjs";
import { i as tt } from "./isDisabled-BG5MoQVt.mjs";
const P = "carousel", et = "Carousel", A = `[data-bs-ride="${P}"]`, h = `${P}-item`, O = "data-bs-slide-to", v = "data-bs-slide", x = "paused", M = {
  pause: "hover",
  keyboard: !1,
  touch: !0,
  interval: 5e3
}, m = (i) => ct(i, et), vt = (i) => new Ct(i);
let y = 0, b = 0, E = 0;
const w = U(`slide.bs.${P}`), X = U(`slid.bs.${P}`), W = (i) => {
  const { index: s, direction: t, element: e, slides: o, options: a } = i;
  if (i.isAnimating) {
    const r = B(i), n = t === "left" ? "next" : "prev", l = t === "left" ? "start" : "end";
    u(o[s], g), $(o[s], `${h}-${n}`), $(o[s], `${h}-${l}`), $(o[r], g), $(o[r], `${h}-${l}`), K(e, X), d.clear(e, v), i.cycle && !T(e).hidden && a.interval && !i.isPaused && i.cycle();
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
  const s = J(this, A) || Y(this), t = s && m(s);
  if (tt(this) || !t || t.isAnimating) return;
  const e = +(V(this, O) || 0);
  this && !S(this, g) && !Number.isNaN(e) && t.to(e);
}
function Tt(i) {
  i.preventDefault();
  const s = J(this, A) || Y(this), t = s && m(s);
  if (tt(this) || !t || t.isAnimating) return;
  const e = V(this, v);
  e === "next" ? t.next() : e === "prev" && t.prev();
}
const It = ({ code: i, target: s }) => {
  const t = T(s), [e] = [...I(A, t)].filter((l) => Q(l)), o = m(e);
  if (!o || o.isAnimating || /textarea|input|select/i.test(s.nodeName)) return;
  const a = C(e);
  i === (a ? j : z) ? o.prev() : i === (a ? z : j) && o.next();
};
function Z(i) {
  const { target: s } = i, t = m(this);
  t && t.isTouch && (t.indicator && !t.indicator.contains(s) || !t.controls.includes(s)) && (i.stopImmediatePropagation(), i.stopPropagation(), i.preventDefault());
}
function yt(i) {
  const { target: s } = i, t = m(this);
  if (!t || t.isAnimating || t.isTouch) return;
  const { controls: e, indicators: o } = t;
  [...e, ...o].every(
    (a) => a === s || a.contains(s)
  ) || (y = i.pageX, this.contains(s) && (t.isTouch = !0, st(t, !0)));
}
const At = (i) => {
  b = i.pageX;
}, bt = (i) => {
  const { target: s } = i, t = T(s), e = [...I(A, t)].map((n) => m(n)).find((n) => n.isTouch);
  if (!e) return;
  const { element: o, index: a } = e, r = C(o);
  E = i.pageX, e.isTouch = !1, st(e), !t.getSelection()?.toString().length && o.contains(s) && Math.abs(y - E) > 120 && (b < y ? e.to(a + (r ? -1 : 1)) : b > y && e.to(a + (r ? 1 : -1))), y = 0, b = 0, E = 0;
}, D = (i, s) => {
  const { indicators: t } = i;
  [...t].forEach((e) => $(e, g)), i.indicators[s] && u(t[s], g);
}, st = (i, s) => {
  const { element: t } = i, e = s ? q : F;
  e(
    T(t),
    mt,
    At,
    L
  ), e(
    T(t),
    pt,
    bt,
    L
  );
}, B = (i) => {
  const { slides: s, element: t } = i, e = N(
    `.${h}.${g}`,
    t
  );
  return e ? [...s].indexOf(e) : -1;
};
class Ct extends it {
  static selector = A;
  static init = vt;
  static getInstance = m;
  constructor(s, t) {
    super(s, t);
    const { element: e } = this;
    this.direction = C(e) ? "right" : "left", this.isTouch = !1, this.slides = nt(h, e);
    const { slides: o } = this;
    if (o.length < 2) return;
    const a = B(this), r = [...o].find(
      (f) => ot(f, `.${h}-next`)
    );
    this.index = a;
    const n = T(e);
    this.controls = [
      ...I(`[${v}]`, e),
      ...I(
        `[${v}][${G}="#${e.id}"]`,
        n
      )
    ].filter((f, p, c) => p === c.indexOf(f)), this.indicator = N(
      `.${P}-indicators`,
      e
    ), this.indicators = [
      ...this.indicator ? I(`[${O}]`, this.indicator) : [],
      ...I(
        `[${O}][${G}="#${e.id}"]`,
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
    d.clear(s, P), e && (d.clear(s, x), $(s, x)), d.set(
      s,
      () => {
        this.element && !this.isPaused && !this.isTouch && Q(s) && this.to(o + 1);
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
    const { element: t, slides: e, options: o } = this, a = B(this), r = C(t);
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
    _(w, c), _(X, c), K(t, w), !w.defaultPrevented && (this.index = n, D(this, n), at(e[n]) && S(t, "slide") ? d.set(
      t,
      () => {
        u(e[n], `${h}-${f}`), rt(e[n]), u(e[n], `${h}-${p}`), u(e[a], `${h}-${p}`), k(
          e[n],
          () => this.slides && this.slides.length && W(this)
        );
      },
      0,
      v
    ) : (u(e[n], g), $(e[a], g), d.set(
      t,
      () => {
        d.clear(t, v), t && o.interval && !this.isPaused && this.cycle(), K(t, X);
      },
      0,
      v
    )));
  }
  _toggleEventListeners = (s) => {
    const { element: t, options: e, slides: o, controls: a, indicators: r } = this, { touch: n, pause: l, interval: f, keyboard: p } = e, c = s ? q : F;
    l && f && (c(t, lt, xt), c(t, dt, $t)), n && o.length > 2 && (c(
      t,
      ht,
      yt,
      L
    ), c(t, ft, Z, { passive: !1 }), c(t, ut, Z, { passive: !1 })), a.length && a.forEach((H) => {
      c(H, R, Tt);
    }), r.length && r.forEach((H) => {
      c(H, R, Pt);
    }), p && c(T(t), gt, It);
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
  Ct as default
};
//# sourceMappingURL=carousel.mjs.map
