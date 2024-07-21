var ot = Object.defineProperty;
var at = (s, n, t) => n in s ? ot(s, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[n] = t;
var A = (s, n, t) => (at(s, typeof n != "symbol" ? n + "" : n, t), t);
import { createCustomEvent as V, isRTL as L, getElementsByClassName as rt, matches as ct, getDocument as y, querySelectorAll as P, querySelector as N, addClass as g, hasClass as R, Timer as h, removeClass as E, isElementInScrollRange as W, ObjectAssign as _, dispatchEvent as B, getElementTransitionDuration as lt, reflow as dt, emulateTransitionEnd as q, mouseenterEvent as ht, mouseleaveEvent as ft, pointerdownEvent as ut, passiveHandler as X, touchstartEvent as gt, dragstartEvent as mt, mouseclickEvent as j, keydownEvent as vt, getInstance as pt, closest as Y, getAttribute as Z, pointermoveEvent as xt, pointerupEvent as $t, isHTMLElement as Et, keyArrowRight as U, keyArrowLeft as z } from "@thednp/shorty";
import { addListener as tt, removeListener as et } from "@thednp/event-listener";
import { a as m } from "./activeClass-b231b21b.mjs";
import { d as F, g as st } from "./getTargetElement-17dc71b9.mjs";
import { B as Tt } from "./base-component-a56d44ba.mjs";
const T = "carousel", it = "Carousel", C = `[data-bs-ride="${T}"]`, d = `${T}-item`, K = "data-bs-slide-to", x = "data-bs-slide", $ = "paused", G = {
  pause: "hover",
  keyboard: !1,
  touch: !0,
  interval: 5e3
}, v = (s) => pt(s, it), yt = (s) => new w(s);
let I = 0, b = 0, S = 0;
const D = V(`slide.bs.${T}`), O = V(`slid.bs.${T}`), J = (s) => {
  const { index: n, direction: t, element: e, slides: i, options: o } = s;
  if (s.isAnimating) {
    const r = M(s), l = t === "left" ? "next" : "prev", a = t === "left" ? "start" : "end";
    g(i[n], m), E(i[n], `${d}-${l}`), E(i[n], `${d}-${a}`), E(i[r], m), E(i[r], `${d}-${a}`), B(e, O), h.clear(e, x), s.cycle && !y(e).hidden && o.interval && !s.isPaused && s.cycle();
  }
};
function Pt() {
  const s = v(this);
  s && !s.isPaused && !h.get(this, $) && g(this, $);
}
function At() {
  const s = v(this);
  s && s.isPaused && !h.get(this, $) && s.cycle();
}
function It(s) {
  s.preventDefault();
  const n = Y(this, C) || st(this), t = v(n);
  if (t && !t.isAnimating) {
    const e = +(Z(this, K) || /* istanbul ignore next */
    0);
    this && !R(this, m) && // event target is not active
    !Number.isNaN(e) && t.to(e);
  }
}
function Ct(s) {
  s.preventDefault();
  const n = Y(this, C) || st(this), t = v(n);
  if (t && !t.isAnimating) {
    const e = Z(this, x);
    e === "next" ? t.next() : e === "prev" && t.prev();
  }
}
const Ht = ({ code: s, target: n }) => {
  const t = y(n), [e] = [...P(C, t)].filter((o) => W(o)), i = v(e);
  if (i && !i.isAnimating && !/textarea|input/i.test(n.nodeName)) {
    const o = L(e);
    s === (o ? U : z) ? i.prev() : s === (o ? z : U) && i.next();
  }
};
function Q(s) {
  const { target: n } = s, t = v(this);
  t && t.isTouch && (t.indicator && !t.indicator.contains(n) || !t.controls.includes(n)) && (s.stopImmediatePropagation(), s.stopPropagation(), s.preventDefault());
}
function bt(s) {
  const { target: n } = s, t = v(this);
  if (t && !t.isAnimating && !t.isTouch) {
    const { controls: e, indicators: i } = t;
    [...e, ...i].every((o) => o === n || o.contains(n)) || (I = s.pageX, this.contains(n) && (t.isTouch = !0, nt(t, !0)));
  }
}
const wt = (s) => {
  b = s.pageX;
}, Lt = (s) => {
  var i;
  const { target: n } = s, t = y(n), e = [...P(C, t)].map((o) => v(o)).find((o) => o.isTouch);
  if (e) {
    const { element: o, index: r } = e, l = L(o);
    S = s.pageX, e.isTouch = !1, nt(e), !((i = t.getSelection()) != null && i.toString().length) && o.contains(n) && Math.abs(I - S) > 120 && (b < I ? e.to(r + (l ? -1 : 1)) : b > I && e.to(r + (l ? 1 : -1))), I = 0, b = 0, S = 0;
  }
}, k = (s, n) => {
  const { indicators: t } = s;
  [...t].forEach((e) => E(e, m)), s.indicators[n] && g(t[n], m);
}, nt = (s, n) => {
  const { element: t } = s, e = n ? tt : et;
  e(y(t), xt, wt, X), e(y(t), $t, Lt, X);
}, M = (s) => {
  const { slides: n, element: t } = s, e = N(`.${d}.${m}`, t);
  return Et(e) ? [...n].indexOf(e) : -1;
};
class w extends Tt {
  /**
   * @param target mostly a `.carousel` element
   * @param config instance options
   */
  constructor(t, e) {
    super(t, e);
    /**
     * Toggles all event listeners for the `Carousel` instance.
     *
     * @param add when `TRUE` event listeners are added
     */
    A(this, "_toggleEventListeners", (t) => {
      const { element: e, options: i, slides: o, controls: r, indicators: l } = this, { touch: a, pause: f, interval: u, keyboard: p } = i, c = t ? tt : et;
      f && u && (c(e, ht, Pt), c(e, ft, At)), a && o.length > 2 && (c(e, ut, bt, X), c(e, gt, Q, { passive: !1 }), c(e, mt, Q, { passive: !1 })), r.length && r.forEach((H) => {
        H && c(H, j, Ct);
      }), l.length && l.forEach((H) => {
        c(H, j, It);
      }), p && c(y(e), vt, Ht);
    });
    const { element: i } = this;
    this.direction = L(i) ? "right" : "left", this.isTouch = !1, this.slides = rt(d, i);
    const { slides: o } = this;
    if (o.length >= 2) {
      const r = M(this), l = [...o].find((u) => ct(u, `.${d}-next,.${d}-next`));
      this.index = r;
      const a = y(i);
      this.controls = [
        ...P(`[${x}]`, i),
        ...P(`[${x}][${F}="#${i.id}"]`, a)
      ].filter((u, p, c) => p === c.indexOf(u)), this.indicator = N(`.${T}-indicators`, i), this.indicators = [
        ...this.indicator ? P(`[${K}]`, this.indicator) : [],
        ...P(`[${K}][${F}="#${i.id}"]`, a)
      ].filter((u, p, c) => p === c.indexOf(u));
      const { options: f } = this;
      this.options.interval = f.interval === !0 ? G.interval : f.interval, l ? this.index = [...o].indexOf(l) : r < 0 && (this.index = 0, g(o[0], m), this.indicators.length && k(this, 0)), this.indicators.length && k(this, this.index), this._toggleEventListeners(!0), f.interval && this.cycle();
    }
  }
  /**
   * Returns component name string.
   */
  get name() {
    return it;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return G;
  }
  /**
   * Check if instance is paused.
   */
  get isPaused() {
    return R(this.element, $);
  }
  /**
   * Check if instance is animating.
   */
  get isAnimating() {
    return N(`.${d}-next,.${d}-prev`, this.element) !== null;
  }
  // CAROUSEL PUBLIC METHODS
  // =======================
  /** Slide automatically through items. */
  cycle() {
    const { element: t, options: e, isPaused: i, index: o } = this;
    h.clear(t, T), i && (h.clear(t, $), E(t, $)), h.set(
      t,
      () => {
        this.element && !this.isPaused && !this.isTouch && W(t) && this.to(o + 1);
      },
      e.interval,
      T
    );
  }
  /** Pause the automatic cycle. */
  pause() {
    const { element: t, options: e } = this;
    !this.isPaused && e.interval && (g(t, $), h.set(
      t,
      () => {
      },
      1,
      $
    ));
  }
  /** Slide to the next item. */
  next() {
    this.isAnimating || this.to(this.index + 1);
  }
  /** Slide to the previous item. */
  prev() {
    this.isAnimating || this.to(this.index - 1);
  }
  /**
   * Jump to the item with the `idx` index.
   *
   * @param idx the index of the item to jump to
   */
  to(t) {
    const { element: e, slides: i, options: o } = this, r = M(this), l = L(e);
    let a = t;
    if (!this.isAnimating && r !== a && !h.get(e, x)) {
      r < a || r === 0 && a === i.length - 1 ? this.direction = l ? "right" : "left" : (r > a || r === i.length - 1 && a === 0) && (this.direction = l ? "left" : "right");
      const { direction: f } = this;
      a < 0 ? a = i.length - 1 : a >= i.length && (a = 0);
      const u = f === "left" ? "next" : "prev", p = f === "left" ? "start" : "end", c = {
        relatedTarget: i[a],
        from: r,
        to: a,
        direction: f
      };
      _(D, c), _(O, c), B(e, D), D.defaultPrevented || (this.index = a, k(this, a), lt(i[a]) && R(e, "slide") ? h.set(
        e,
        () => {
          g(i[a], `${d}-${u}`), dt(i[a]), g(i[a], `${d}-${p}`), g(i[r], `${d}-${p}`), q(
            i[a],
            () => this.slides && this.slides.length && J(this)
          );
        },
        0,
        x
      ) : (g(i[a], m), E(i[r], m), h.set(
        e,
        () => {
          h.clear(e, x), e && o.interval && !this.isPaused && this.cycle(), B(e, O);
        },
        0,
        x
      )));
    }
  }
  /** Remove `Carousel` component from target. */
  dispose() {
    const { isAnimating: t } = this, e = {
      ...this,
      isAnimating: t
    };
    this._toggleEventListeners(), super.dispose(), e.isAnimating && q(e.slides[e.index], () => {
      J(e);
    });
  }
}
A(w, "selector", C), A(w, "init", yt), A(w, "getInstance", v);
export {
  w as default
};
//# sourceMappingURL=carousel.mjs.map
