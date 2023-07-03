var Go = Object.defineProperty;
var Qo = (t, e, s) => e in t ? Go(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s;
var h = (t, e, s) => (Qo(t, typeof e != "symbol" ? e + "" : e, s), s);
const Xn = "aria-describedby", Ae = "aria-expanded", Oe = "aria-hidden", Me = "aria-modal", Ls = "aria-pressed", Qe = "aria-selected", Jo = "DOMContentLoaded", Ts = "focus", ys = "focusin", Yn = "focusout", Le = "keydown", _o = "keyup", N = "click", Un = "mousedown", ti = "hover", Be = "mouseenter", Es = "mouseleave", ei = "pointerdown", si = "pointermove", ni = "pointerup", Re = "resize", We = "scroll", Cs = "touchstart", oi = "dragstart", rs = "ArrowDown", ls = "ArrowUp", Bs = "ArrowLeft", Rs = "ArrowRight", Hs = "Escape", ii = "transitionDuration", ci = "transitionDelay", Je = "transitionend", Zn = "transitionProperty", ai = navigator.userAgentData, Ie = ai, { userAgent: ri } = navigator, ke = ri, Ws = /iPhone|iPad|iPod|Android/i;
Ie ? Ie.brands.some((t) => Ws.test(t.brand)) : Ws.test(ke);
const Fs = /(iPhone|iPod|iPad)/, li = Ie ? Ie.brands.some((t) => Fs.test(t.brand)) : (
  /* istanbul ignore next */
  Fs.test(ke)
);
ke && ke.includes("Firefox");
const { head: Fe } = document;
["webkitPerspective", "perspective"].some((t) => t in Fe.style);
const di = (t, e, s, n) => {
  const o = n || !1;
  t.addEventListener(e, s, o);
}, hi = (t, e, s, n) => {
  const o = n || !1;
  t.removeEventListener(e, s, o);
}, fi = (t, e, s, n) => {
  const o = (i) => {
    (i.target === t || i.currentTarget === t) && (s.apply(t, [i]), hi(t, e, o, n));
  };
  di(t, e, o, n);
}, ge = () => {
};
(() => {
  let t = !1;
  try {
    const e = Object.defineProperty({}, "passive", {
      get: () => (t = !0, t)
    });
    fi(document, Jo, ge, e);
  } catch {
  }
  return t;
})();
["webkitTransform", "transform"].some((t) => t in Fe.style);
["webkitAnimation", "animation"].some((t) => t in Fe.style);
["webkitTransition", "transition"].some((t) => t in Fe.style);
const it = (t, e) => t.getAttribute(e), Ne = (t, e) => t.hasAttribute(e), O = (t, e, s) => t.setAttribute(e, s), Nt = (t, e) => t.removeAttribute(e), p = (t, ...e) => {
  t.classList.add(...e);
}, v = (t, ...e) => {
  t.classList.remove(...e);
}, f = (t, e) => t.classList.contains(e), be = (t) => t != null && typeof t == "object" || !1, A = (t) => be(t) && typeof t.nodeType == "number" && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].some((e) => t.nodeType === e) || !1, y = (t) => A(t) && t.nodeType === 1 || !1, jt = /* @__PURE__ */ new Map(), Dt = {
  data: jt,
  /**
   * Sets web components data.
   *
   * @param element target element
   * @param component the component's name or a unique key
   * @param instance the component instance
   */
  set: (t, e, s) => {
    y(t) && (jt.has(e) || jt.set(e, /* @__PURE__ */ new Map()), jt.get(e).set(t, s));
  },
  /**
   * Returns all instances for specified component.
   *
   * @param component the component's name or a unique key
   * @returns all the component instances
   */
  getAllFor: (t) => jt.get(t) || null,
  /**
   * Returns the instance associated with the target.
   *
   * @param element target element
   * @param component the component's name or a unique key
   * @returns the instance
   */
  get: (t, e) => {
    if (!y(t) || !e)
      return null;
    const s = Dt.getAllFor(e);
    return t && s && s.get(t) || null;
  },
  /**
   * Removes web components data.
   *
   * @param element target element
   * @param component the component's name or a unique key
   */
  remove: (t, e) => {
    const s = Dt.getAllFor(e);
    !s || !y(t) || (s.delete(t), s.size === 0 && jt.delete(e));
  }
}, j = (t, e) => Dt.get(t, e), we = (t) => typeof t == "string" || !1, Ss = (t) => be(t) && t.constructor.name === "Window" || !1, qn = (t) => A(t) && t.nodeType === 9 || !1, w = (t) => Ss(t) ? t.document : qn(t) ? t : A(t) ? t.ownerDocument : window.document, dt = (t, ...e) => Object.assign(t, ...e), Tt = (t) => {
  if (!t)
    return;
  if (we(t))
    return w().createElement(t);
  const { tagName: e } = t, s = Tt(e);
  if (!s)
    return;
  const n = { ...t };
  return delete n.tagName, dt(s, n);
}, b = (t, e) => t.dispatchEvent(e), V = (t, e) => {
  const s = getComputedStyle(t), n = e.replace("webkit", "Webkit").replace(/([A-Z])/g, "-$1").toLowerCase();
  return s.getPropertyValue(n);
}, pi = (t) => {
  const e = V(t, Zn), s = V(t, ci), n = s.includes("ms") ? (
    /* istanbul ignore next */
    1
  ) : 1e3, o = e && e !== "none" ? parseFloat(s) * n : (
    /* istanbul ignore next */
    0
  );
  return Number.isNaN(o) ? (
    /* istanbul ignore next */
    0
  ) : o;
}, Xt = (t) => {
  const e = V(t, Zn), s = V(t, ii), n = s.includes("ms") ? (
    /* istanbul ignore next */
    1
  ) : 1e3, o = e && e !== "none" ? parseFloat(s) * n : (
    /* istanbul ignore next */
    0
  );
  return Number.isNaN(o) ? (
    /* istanbul ignore next */
    0
  ) : o;
}, x = (t, e) => {
  let s = 0;
  const n = new Event(Je), o = Xt(t), i = pi(t);
  if (o) {
    const c = (a) => {
      a.target === t && (e.apply(t, [a]), t.removeEventListener(Je, c), s = 1);
    };
    t.addEventListener(Je, c), setTimeout(() => {
      s || b(t, n);
    }, o + i + 17);
  } else
    e.apply(t, [n]);
}, ht = (t, e) => t.focus(e), js = (t) => ["true", !0].includes(t) ? !0 : ["false", !1].includes(t) ? !1 : ["null", "", null, void 0].includes(t) ? null : t !== "" && !Number.isNaN(+t) ? +t : t, He = (t) => Object.entries(t), Yt = (t) => t.toLowerCase(), gi = (t, e, s, n) => {
  const o = { ...s }, i = { ...t.dataset }, c = { ...e }, a = {}, r = "title";
  return He(i).forEach(([l, d]) => {
    const g = n && typeof l == "string" && l.includes(n) ? l.replace(n, "").replace(/[A-Z]/g, (C) => Yt(C)) : l;
    a[g] = js(d);
  }), He(o).forEach(([l, d]) => {
    o[l] = js(d);
  }), He(e).forEach(([l, d]) => {
    l in o ? c[l] = o[l] : l in a ? c[l] = a[l] : c[l] = l === r ? it(t, r) : d;
  }), c;
}, zs = (t) => Object.keys(t), $ = (t, e) => {
  const s = new CustomEvent(t, {
    cancelable: !0,
    bubbles: !0
  });
  return be(e) && dt(s, e), s;
}, st = { passive: !0 }, Lt = (t) => t.offsetHeight, I = (t, e) => {
  He(e).forEach(([s, n]) => {
    if (n && we(s) && s.includes("--"))
      t.style.setProperty(s, n);
    else {
      const o = {};
      o[s] = n, dt(t.style, o);
    }
  });
}, ds = (t) => be(t) && t.constructor.name === "Map" || !1, ui = (t) => typeof t == "number" || !1, bt = /* @__PURE__ */ new Map(), u = {
  /**
   * Sets a new timeout timer for an element, or element -> key association.
   *
   * @param element target element
   * @param callback the callback
   * @param delay the execution delay
   * @param key a unique key
   */
  set: (t, e, s, n) => {
    y(t) && (n && n.length ? (bt.has(t) || bt.set(t, /* @__PURE__ */ new Map()), bt.get(t).set(n, setTimeout(e, s))) : bt.set(t, setTimeout(e, s)));
  },
  /**
   * Returns the timer associated with the target.
   *
   * @param element target element
   * @param key a unique
   * @returns the timer
   */
  get: (t, e) => {
    if (!y(t))
      return null;
    const s = bt.get(t);
    return e && s && ds(s) ? s.get(e) || /* istanbul ignore next */
    null : ui(s) ? s : null;
  },
  /**
   * Clears the element's timer.
   *
   * @param element target element
   * @param key a unique key
   */
  clear: (t, e) => {
    if (!y(t))
      return;
    const s = bt.get(t);
    e && e.length && ds(s) ? (clearTimeout(s.get(e)), s.delete(e), s.size === 0 && bt.delete(t)) : (clearTimeout(s), bt.delete(t));
  }
}, $e = (t, e) => {
  const { width: s, height: n, top: o, right: i, bottom: c, left: a } = t.getBoundingClientRect();
  let r = 1, l = 1;
  if (e && y(t)) {
    const { offsetWidth: d, offsetHeight: g } = t;
    r = d > 0 ? Math.round(s) / d : (
      /* istanbul ignore next */
      1
    ), l = g > 0 ? Math.round(n) / g : (
      /* istanbul ignore next */
      1
    );
  }
  return {
    width: s / r,
    height: n / l,
    top: o / l,
    right: i / r,
    bottom: c / l,
    left: a / r,
    x: a / r,
    y: o / l
  };
}, Ht = (t) => w(t).body, ft = (t) => w(t).documentElement, Gn = (t) => A(t) && t.constructor.name === "ShadowRoot" || !1, mi = (t) => t.nodeName === "HTML" ? t : y(t) && t.assignedSlot || // step into the shadow DOM of the parent of a slotted node
A(t) && t.parentNode || // DOM Element detected
Gn(t) && t.host || // ShadowRoot detected
ft(t);
let Ks = 0, Vs = 0;
const zt = /* @__PURE__ */ new Map(), Qn = (t, e) => {
  let s = e ? Ks : Vs;
  if (e) {
    const n = Qn(t), o = zt.get(n) || /* @__PURE__ */ new Map();
    zt.has(n) || zt.set(n, o), ds(o) && !o.has(e) ? (o.set(e, s), Ks += 1) : s = o.get(e);
  } else {
    const n = t.id || t;
    zt.has(n) ? s = zt.get(n) : (zt.set(n, s), Vs += 1);
  }
  return s;
}, qt = (t) => {
  var e;
  return t ? qn(t) ? t.defaultView : A(t) ? (e = t == null ? void 0 : t.ownerDocument) == null ? void 0 : e.defaultView : t : window;
}, vi = (t) => Array.isArray(t) || !1, Jn = (t) => {
  if (!A(t))
    return !1;
  const { top: e, bottom: s } = $e(t), { clientHeight: n } = ft(t);
  return e <= n && s >= 0;
}, bi = (t) => typeof t == "function" || !1, wi = (t) => be(t) && t.constructor.name === "NodeList" || !1, Ct = (t) => ft(t).dir === "rtl", $i = (t) => A(t) && ["TABLE", "TD", "TH"].includes(t.nodeName) || !1, M = (t, e) => t ? t.closest(e) || // break out of `ShadowRoot`
M(t.getRootNode().host, e) : null, P = (t, e) => y(t) ? t : (A(e) ? e : w()).querySelector(t), xs = (t, e) => (A(e) ? e : w()).getElementsByTagName(t), tt = (t, e) => (A(e) ? e : w()).querySelectorAll(t), rt = (t, e) => (e && A(e) ? e : w()).getElementsByClassName(
  t
), _n = (t, e) => t.matches(e), Vt = {}, to = (t) => {
  const { type: e, currentTarget: s } = t;
  [...Vt[e]].forEach(([n, o]) => {
    s === n && [...o].forEach(([i, c]) => {
      i.apply(n, [t]), typeof c == "object" && c.once && B(n, e, i, c);
    });
  });
}, L = (t, e, s, n) => {
  Vt[e] || (Vt[e] = /* @__PURE__ */ new Map());
  const o = Vt[e];
  o.has(t) || o.set(t, /* @__PURE__ */ new Map());
  const i = o.get(t), { size: c } = i;
  i.set(s, n), c || t.addEventListener(e, to, n);
}, B = (t, e, s, n) => {
  const o = Vt[e], i = o && o.get(t), c = i && i.get(s), a = c !== void 0 ? c : n;
  i && i.has(s) && i.delete(s), o && (!i || !i.size) && o.delete(t), (!o || !o.size) && delete Vt[e], (!i || !i.size) && t.removeEventListener(e, to, a);
}, R = "fade", m = "show", je = "data-bs-dismiss", ze = "alert", eo = "Alert", Ti = "5.0.8", yi = Ti;
class nt {
  /**
   * @param target `HTMLElement` or selector string
   * @param config component instance options
   */
  constructor(e, s) {
    const n = P(e);
    if (!n)
      throw we(e) ? Error(`${this.name} Error: "${e}" is not a valid selector.`) : Error(`${this.name} Error: your target is not an instance of HTMLElement.`);
    const o = Dt.get(n, this.name);
    o && o.dispose(), this.element = n, this.options = this.defaults && zs(this.defaults).length ? gi(n, this.defaults, s || {}, "bs") : {}, Dt.set(n, this.name, this);
  }
  /* istanbul ignore next */
  get version() {
    return yi;
  }
  /* istanbul ignore next */
  get name() {
    return "BaseComponent";
  }
  /* istanbul ignore next */
  get defaults() {
    return {};
  }
  /** Removes component from target element. */
  dispose() {
    Dt.remove(this.element, this.name), zs(this).forEach((e) => {
      delete this[e];
    });
  }
}
const Ei = `.${ze}`, Ci = `[${je}="${ze}"]`, Hi = (t) => j(t, eo), Si = (t) => new oe(t), Xs = $(`close.bs.${ze}`), xi = $(`closed.bs.${ze}`), Ys = (t) => {
  const { element: e } = t;
  hs(t), b(e, xi), t.dispose(), e.remove();
}, hs = (t, e) => {
  const s = e ? L : B, { dismiss: n, close: o } = t;
  n && s(n, N, o);
};
class oe extends nt {
  constructor(s) {
    super(s);
    h(this, "dismiss");
    // ALERT PUBLIC METHODS
    // ====================
    /**
     * Public method that hides the `.alert` element from the user,
     * disposes the instance once animation is complete, then
     * removes the element from the DOM.
     */
    h(this, "close", () => {
      const { element: s } = this;
      s && f(s, m) && (b(s, Xs), Xs.defaultPrevented || (v(s, m), f(s, R) ? x(s, () => Ys(this)) : Ys(this)));
    });
    this.dismiss = P(Ci, this.element), hs(this, !0);
  }
  /** Returns component name string. */
  get name() {
    return eo;
  }
  /** Remove the component from target element. */
  dispose() {
    hs(this), super.dispose();
  }
}
h(oe, "selector", Ei), h(oe, "init", Si), h(oe, "getInstance", Hi);
const E = "active", ct = "data-bs-toggle", Pi = "button", so = "Button", Di = `[${ct}="${Pi}"]`, Ai = (t) => j(t, so), Ii = (t) => new ie(t), Us = (t, e) => {
  (e ? L : B)(t.element, N, t.toggle);
};
class ie extends nt {
  /**
   * @param target usually a `.btn` element
   */
  constructor(s) {
    super(s);
    h(this, "isActive", !1);
    // BUTTON PUBLIC METHODS
    // =====================
    /**
     * Toggles the state of the target button.
     *
     * @param e usually `click` Event object
     */
    h(this, "toggle", (s) => {
      s && s.preventDefault();
      const { element: n, isActive: o } = this;
      !f(n, "disabled") && !it(n, "disabled") && ((o ? v : p)(n, E), O(n, Ls, o ? "false" : "true"), this.isActive = f(n, E));
    });
    const { element: n } = this;
    this.isActive = f(n, E), O(n, Ls, String(!!this.isActive)), Us(this, !0);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return so;
  }
  /** Removes the `Button` component from the target element. */
  dispose() {
    Us(this), super.dispose();
  }
}
h(ie, "selector", Di), h(ie, "init", Ii), h(ie, "getInstance", Ai);
const fs = "data-bs-target", At = "carousel", no = "Carousel", Zs = "data-bs-parent", ki = "data-bs-container", Y = (t) => {
  const e = [fs, Zs, ki, "href"], s = w(t);
  return e.map((n) => {
    const o = it(t, n);
    return o ? n === Zs ? M(t, o) : P(o, s) : null;
  }).filter((n) => n)[0];
}, Te = `[data-bs-ride="${At}"]`, G = `${At}-item`, ps = "data-bs-slide-to", $t = "data-bs-slide", yt = "paused", qs = {
  pause: "hover",
  keyboard: !1,
  touch: !0,
  interval: 5e3
}, pt = (t) => j(t, no), Ni = (t) => new ce(t);
let se = 0, Se = 0, _e = 0;
const ts = $(`slide.bs.${At}`), gs = $(`slid.bs.${At}`), Gs = (t) => {
  const { index: e, direction: s, element: n, slides: o, options: i } = t;
  if (t.isAnimating) {
    const c = us(t), a = s === "left" ? "next" : "prev", r = s === "left" ? "start" : "end";
    p(o[e], E), v(o[e], `${G}-${a}`), v(o[e], `${G}-${r}`), v(o[c], E), v(o[c], `${G}-${r}`), b(n, gs), u.clear(n, $t), t.cycle && !w(n).hidden && i.interval && !t.isPaused && t.cycle();
  }
};
function Oi() {
  const t = pt(this);
  t && !t.isPaused && !u.get(this, yt) && p(this, yt);
}
function Mi() {
  const t = pt(this);
  t && t.isPaused && !u.get(this, yt) && t.cycle();
}
function Li(t) {
  t.preventDefault();
  const e = M(this, Te) || Y(this), s = pt(e);
  if (s && !s.isAnimating) {
    const n = +(it(this, ps) || /* istanbul ignore next */
    0);
    this && !f(this, E) && // event target is not active
    !Number.isNaN(n) && s.to(n);
  }
}
function Bi(t) {
  t.preventDefault();
  const e = M(this, Te) || Y(this), s = pt(e);
  if (s && !s.isAnimating) {
    const n = it(this, $t);
    n === "next" ? s.next() : n === "prev" && s.prev();
  }
}
const Ri = ({ code: t, target: e }) => {
  const s = w(e), [n] = [...tt(Te, s)].filter((i) => Jn(i)), o = pt(n);
  if (o && !o.isAnimating && !/textarea|input/i.test(e.nodeName)) {
    const i = Ct(n);
    t === (i ? Rs : Bs) ? o.prev() : t === (i ? Bs : Rs) && o.next();
  }
};
function Qs(t) {
  const { target: e } = t, s = pt(this);
  s && s.isTouch && (s.indicator && !s.indicator.contains(e) || !s.controls.includes(e)) && (t.stopImmediatePropagation(), t.stopPropagation(), t.preventDefault());
}
function Wi(t) {
  const { target: e } = t, s = pt(this);
  if (s && !s.isAnimating && !s.isTouch) {
    const { controls: n, indicators: o } = s;
    [...n, ...o].every((i) => i === e || i.contains(e)) || (se = t.pageX, this.contains(e) && (s.isTouch = !0, oo(s, !0)));
  }
}
const Fi = (t) => {
  Se = t.pageX;
}, ji = (t) => {
  var o;
  const { target: e } = t, s = w(e), n = [...tt(Te, s)].map((i) => pt(i)).find((i) => i.isTouch);
  if (n) {
    const { element: i, index: c } = n, a = Ct(i);
    _e = t.pageX, n.isTouch = !1, oo(n), !((o = s.getSelection()) != null && o.toString().length) && i.contains(e) && Math.abs(se - _e) > 120 && (Se < se ? n.to(c + (a ? -1 : 1)) : Se > se && n.to(c + (a ? 1 : -1))), se = 0, Se = 0, _e = 0;
  }
}, es = (t, e) => {
  const { indicators: s } = t;
  [...s].forEach((n) => v(n, E)), t.indicators[e] && p(s[e], E);
}, oo = (t, e) => {
  const { element: s } = t, n = e ? L : B;
  n(w(s), si, Fi, st), n(w(s), ni, ji, st);
}, Js = (t, e) => {
  const { element: s, options: n, slides: o, controls: i, indicators: c } = t, { touch: a, pause: r, interval: l, keyboard: d } = n, g = e ? L : B;
  r && l && (g(s, Be, Oi), g(s, Es, Mi)), a && o.length > 2 && (g(s, ei, Wi, st), g(s, Cs, Qs, { passive: !1 }), g(s, oi, Qs, { passive: !1 })), i.length && i.forEach((C) => {
    C && g(C, N, Bi);
  }), c.length && c.forEach((C) => {
    g(C, N, Li);
  }), d && g(w(s), Le, Ri);
}, us = (t) => {
  const { slides: e, element: s } = t, n = P(`.${G}.${E}`, s);
  return y(n) ? [...e].indexOf(n) : -1;
};
class ce extends nt {
  /**
   * @param target mostly a `.carousel` element
   * @param config instance options
   */
  constructor(e, s) {
    super(e, s);
    const { element: n } = this;
    this.direction = Ct(n) ? "right" : "left", this.isTouch = !1, this.slides = rt(G, n);
    const { slides: o } = this;
    if (o.length >= 2) {
      const i = us(this), c = [...o].find((l) => _n(l, `.${G}-next,.${G}-next`));
      this.index = i;
      const a = w(n);
      this.controls = [
        ...tt(`[${$t}]`, n),
        ...tt(`[${$t}][${fs}="#${n.id}"]`, a)
      ].filter((l, d, g) => d === g.indexOf(l)), this.indicator = P(`.${At}-indicators`, n), this.indicators = [
        ...this.indicator ? tt(`[${ps}]`, this.indicator) : [],
        ...tt(`[${ps}][${fs}="#${n.id}"]`, a)
      ].filter((l, d, g) => d === g.indexOf(l));
      const { options: r } = this;
      this.options.interval = r.interval === !0 ? qs.interval : r.interval, c ? this.index = [...o].indexOf(c) : i < 0 && (this.index = 0, p(o[0], E), this.indicators.length && es(this, 0)), this.indicators.length && es(this, this.index), Js(this, !0), r.interval && this.cycle();
    }
  }
  /**
   * Returns component name string.
   */
  get name() {
    return no;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return qs;
  }
  /**
   * Check if instance is paused.
   */
  get isPaused() {
    return f(this.element, yt);
  }
  /**
   * Check if instance is animating.
   */
  get isAnimating() {
    return P(`.${G}-next,.${G}-prev`, this.element) !== null;
  }
  // CAROUSEL PUBLIC METHODS
  // =======================
  /** Slide automatically through items. */
  cycle() {
    const { element: e, options: s, isPaused: n, index: o } = this;
    u.clear(e, At), n && (u.clear(e, yt), v(e, yt)), u.set(
      e,
      () => {
        this.element && !this.isPaused && !this.isTouch && Jn(e) && this.to(o + 1);
      },
      s.interval,
      At
    );
  }
  /** Pause the automatic cycle. */
  pause() {
    const { element: e, options: s } = this;
    !this.isPaused && s.interval && (p(e, yt), u.set(
      e,
      () => {
      },
      1,
      yt
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
  to(e) {
    const { element: s, slides: n, options: o } = this, i = us(this), c = Ct(s);
    let a = e;
    if (!this.isAnimating && i !== a && !u.get(s, $t)) {
      i < a || i === 0 && a === n.length - 1 ? this.direction = c ? "right" : "left" : (i > a || i === n.length - 1 && a === 0) && (this.direction = c ? "left" : "right");
      const { direction: r } = this;
      a < 0 ? a = n.length - 1 : a >= n.length && (a = 0);
      const l = r === "left" ? "next" : "prev", d = r === "left" ? "start" : "end", g = {
        relatedTarget: n[a],
        from: i,
        to: a,
        direction: r
      };
      dt(ts, g), dt(gs, g), b(s, ts), ts.defaultPrevented || (this.index = a, es(this, a), Xt(n[a]) && f(s, "slide") ? u.set(
        s,
        () => {
          p(n[a], `${G}-${l}`), Lt(n[a]), p(n[a], `${G}-${d}`), p(n[i], `${G}-${d}`), x(
            n[a],
            () => this.slides && this.slides.length && Gs(this)
          );
        },
        0,
        $t
      ) : (p(n[a], E), v(n[i], E), u.set(
        s,
        () => {
          u.clear(s, $t), s && o.interval && !this.isPaused && this.cycle(), b(s, gs);
        },
        0,
        $t
      )));
    }
  }
  /** Remove `Carousel` component from target. */
  dispose() {
    const { isAnimating: e } = this, s = {
      ...this,
      isAnimating: e
    };
    Js(s), super.dispose(), s.isAnimating && x(s.slides[s.index], () => {
      Gs(s);
    });
  }
}
h(ce, "selector", Te), h(ce, "init", Ni), h(ce, "getInstance", pt);
const Ot = "collapsing", X = "collapse", io = "Collapse", zi = `.${X}`, co = `[${ct}="${X}"]`, Ki = { parent: null }, xe = (t) => j(t, io), Vi = (t) => new ae(t), _s = $(`show.bs.${X}`), Xi = $(`shown.bs.${X}`), tn = $(`hide.bs.${X}`), Yi = $(`hidden.bs.${X}`), Ui = (t) => {
  const { element: e, parent: s, triggers: n } = t;
  b(e, _s), _s.defaultPrevented || (u.set(e, ge, 17), s && u.set(s, ge, 17), p(e, Ot), v(e, X), I(e, { height: `${e.scrollHeight}px` }), x(e, () => {
    u.clear(e), s && u.clear(s), n.forEach((o) => O(o, Ae, "true")), v(e, Ot), p(e, X), p(e, m), I(e, { height: "" }), b(e, Xi);
  }));
}, en = (t) => {
  const { element: e, parent: s, triggers: n } = t;
  b(e, tn), tn.defaultPrevented || (u.set(e, ge, 17), s && u.set(s, ge, 17), I(e, { height: `${e.scrollHeight}px` }), v(e, X), v(e, m), p(e, Ot), Lt(e), I(e, { height: "0px" }), x(e, () => {
    u.clear(e), s && u.clear(s), n.forEach((o) => O(o, Ae, "false")), v(e, Ot), p(e, X), I(e, { height: "" }), b(e, Yi);
  }));
}, sn = (t, e) => {
  const s = e ? L : B, { triggers: n } = t;
  n.length && n.forEach((o) => s(o, N, Zi));
}, Zi = (t) => {
  const { target: e } = t, s = e && M(e, co), n = s && Y(s), o = n && xe(n);
  o && o.toggle(), s && s.tagName === "A" && t.preventDefault();
};
class ae extends nt {
  /**
   * @param target and `Element` that matches the selector
   * @param config instance options
   */
  constructor(e, s) {
    super(e, s);
    const { element: n, options: o } = this, i = w(n);
    this.triggers = [...tt(co, i)].filter((c) => Y(c) === n), this.parent = y(o.parent) ? o.parent : we(o.parent) ? Y(n) || P(o.parent, i) : null, sn(this, !0);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return io;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return Ki;
  }
  // COLLAPSE PUBLIC METHODS
  // =======================
  /** Toggles the visibility of the collapse. */
  toggle() {
    f(this.element, m) ? this.hide() : this.show();
  }
  /** Hides the collapse. */
  hide() {
    const { triggers: e, element: s } = this;
    u.get(s) || (en(this), e.length && e.forEach((n) => p(n, `${X}d`)));
  }
  /** Shows the collapse. */
  show() {
    const { element: e, parent: s, triggers: n } = this;
    let o, i;
    s && (o = [...tt(`.${X}.${m}`, s)].find(
      (c) => xe(c)
    ), i = o && xe(o)), (!s || !u.get(s)) && !u.get(e) && (i && o !== e && (en(i), i.triggers.forEach((c) => {
      p(c, `${X}d`);
    })), Ui(this), n.length && n.forEach((c) => v(c, `${X}d`)));
  }
  /** Remove the `Collapse` component from the target `Element`. */
  dispose() {
    sn(this), super.dispose();
  }
}
h(ae, "selector", zi), h(ae, "init", Vi), h(ae, "getInstance", xe);
const Mt = ["dropdown", "dropup", "dropstart", "dropend"], ao = "Dropdown", ro = "dropdown-menu", lo = (t) => {
  const e = M(t, "A");
  return t.tagName === "A" && // anchor href starts with #
  Ne(t, "href") && it(t, "href").slice(-1) === "#" || // OR a child of an anchor with href starts with #
  e && Ne(e, "href") && it(e, "href").slice(-1) === "#";
}, [et, ms, vs, bs] = Mt, ho = `[${ct}="${et}"]`, Ut = (t) => j(t, ao), qi = (t) => new re(t), Gi = `${ro}-end`, nn = [et, ms], on = [vs, bs], cn = ["A", "BUTTON"], Qi = {
  offset: 5,
  // [number] 5(px)
  display: "dynamic"
  // [dynamic|static]
}, ss = $(`show.bs.${et}`), an = $(`shown.bs.${et}`), ns = $(`hide.bs.${et}`), rn = $(`hidden.bs.${et}`), fo = $(`updated.bs.${et}`), po = (t) => {
  const { element: e, menu: s, parentElement: n, options: o } = t, { offset: i } = o;
  if (V(s, "position") !== "static") {
    const c = Ct(e), a = f(s, Gi);
    ["margin", "top", "bottom", "left", "right"].forEach((k) => {
      const ut = {};
      ut[k] = "", I(s, ut);
    });
    let l = Mt.find((k) => f(n, k)) || /* istanbul ignore next: fallback position */
    et;
    const d = {
      dropdown: [i, 0, 0],
      dropup: [0, 0, i],
      dropstart: c ? [-1, 0, 0, i] : [-1, i, 0],
      dropend: c ? [-1, i, 0] : [-1, 0, 0, i]
    }, g = {
      dropdown: { top: "100%" },
      dropup: { top: "auto", bottom: "100%" },
      dropstart: c ? { left: "100%", right: "auto" } : { left: "auto", right: "100%" },
      dropend: c ? { left: "auto", right: "100%" } : { left: "100%", right: "auto" },
      menuStart: c ? { right: "0", left: "auto" } : { right: "auto", left: "0" },
      menuEnd: c ? { right: "auto", left: "0" } : { right: "0", left: "auto" }
    }, { offsetWidth: C, offsetHeight: W } = s, { clientWidth: q, clientHeight: T } = ft(e), {
      left: z,
      top: U,
      width: Rt,
      height: at
    } = $e(e), H = z - C - i < 0, _ = z + C + Rt + i >= q, ot = U + W + i >= T, F = U + W + at + i >= T, K = U - W - i < 0, S = (!c && a || c && !a) && z + Rt - C < 0, Wt = (c && a || !c && !a) && z + C >= q;
    if (on.includes(l) && H && _ && (l = et), l === vs && (c ? _ : H) && (l = bs), l === bs && (c ? H : _) && (l = vs), l === ms && K && !F && (l = et), l === et && F && !K && (l = ms), on.includes(l) && ot && dt(g[l], {
      top: "auto",
      bottom: 0
    }), nn.includes(l) && (S || Wt)) {
      let k = { left: "auto", right: "auto" };
      !S && Wt && !c && (k = { left: "auto", right: 0 }), S && !Wt && c && (k = { left: 0, right: "auto" }), k && dt(g[l], k);
    }
    const gt = d[l];
    I(s, {
      ...g[l],
      margin: `${gt.map((k) => k && `${k}px`).join(" ")}`
    }), nn.includes(l) && a && a && I(s, g[!c && S || c && Wt ? "menuStart" : (
      /* istanbul ignore next */
      "menuEnd"
    )]), b(n, fo);
  }
}, Ji = (t) => [...t.children].map((e) => {
  if (e && cn.includes(e.tagName))
    return e;
  const { firstElementChild: s } = e;
  return s && cn.includes(s.tagName) ? s : null;
}).filter((e) => e), ln = (t) => {
  const { element: e, options: s } = t, n = t.open ? L : B, o = w(e);
  n(o, N, hn), n(o, Ts, hn), n(o, Le, tc), n(o, _o, ec), s.display === "dynamic" && [We, Re].forEach((i) => {
    n(qt(e), i, sc, st);
  });
}, dn = (t, e) => {
  (e ? L : B)(t.element, N, _i);
}, Ke = (t) => {
  const e = [...Mt, "btn-group", "input-group"].map((s) => rt(`${s} ${m}`, w(t))).find((s) => s.length);
  if (e && e.length)
    return [...e[0].children].find(
      (s) => Mt.some((n) => n === it(s, ct))
    );
}, hn = (t) => {
  const { target: e, type: s } = t;
  if (e && y(e)) {
    const n = Ke(e), o = n && Ut(n);
    if (o) {
      const { parentElement: i, menu: c } = o, a = i && i.contains(e) && (e.tagName === "form" || M(e, "form") !== null);
      [N, Un].includes(s) && lo(e) && t.preventDefault(), !a && s !== Ts && e !== n && e !== c && o.hide();
    }
  }
}, _i = (t) => {
  const { target: e } = t, s = e && M(e, ho), n = s && Ut(s);
  n && (t.stopPropagation(), n.toggle(), s && lo(s) && t.preventDefault());
}, tc = (t) => {
  [rs, ls].includes(t.code) && t.preventDefault();
};
function ec(t) {
  const { code: e } = t, s = Ke(this), n = s && Ut(s), { activeElement: o } = s && w(s);
  if (n && o) {
    const { menu: i, open: c } = n, a = Ji(i);
    if (a && a.length && [rs, ls].includes(e)) {
      let r = a.indexOf(o);
      o === s ? r = 0 : e === ls ? r = r > 1 ? r - 1 : 0 : e === rs && (r = r < a.length - 1 ? r + 1 : r), a[r] && ht(a[r]);
    }
    Hs === e && c && (n.toggle(), ht(s));
  }
}
function sc() {
  const t = Ke(this), e = t && Ut(t);
  e && e.open && po(e);
}
class re extends nt {
  /**
   * @param target Element or string selector
   * @param config the instance options
   */
  constructor(e, s) {
    super(e, s);
    const { parentElement: n } = this.element, [o] = rt(ro, n);
    o && (this.parentElement = n, this.menu = o, dn(this, !0));
  }
  /**
   * Returns component name string.
   */
  get name() {
    return ao;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return Qi;
  }
  // DROPDOWN PUBLIC METHODS
  // =======================
  /** Shows/hides the dropdown menu to the user. */
  toggle() {
    this.open ? this.hide() : this.show();
  }
  /** Shows the dropdown menu to the user. */
  show() {
    const { element: e, open: s, menu: n, parentElement: o } = this;
    if (!s) {
      const i = Ke(e), c = i && Ut(i);
      c && c.hide(), [ss, an, fo].forEach((a) => {
        a.relatedTarget = e;
      }), b(o, ss), ss.defaultPrevented || (p(n, m), p(o, m), O(e, Ae, "true"), po(this), this.open = !s, ht(e), ln(this), b(o, an));
    }
  }
  /** Hides the dropdown menu from the user. */
  hide() {
    const { element: e, open: s, menu: n, parentElement: o } = this;
    s && ([ns, rn].forEach((i) => {
      i.relatedTarget = e;
    }), b(o, ns), ns.defaultPrevented || (v(n, m), v(o, m), O(e, Ae, "false"), this.open = !s, ln(this), b(o, rn)));
  }
  /** Removes the `Dropdown` component from the target element. */
  dispose() {
    this.open && this.hide(), dn(this), super.dispose();
  }
}
h(re, "selector", ho), h(re, "init", qi), h(re, "getInstance", Ut);
const Z = "modal", Ps = "Modal", Ds = "Offcanvas", nc = "fixed-top", oc = "fixed-bottom", go = "sticky-top", uo = "position-sticky", mo = (t) => [
  ...rt(nc, t),
  ...rt(oc, t),
  ...rt(go, t),
  ...rt(uo, t),
  ...rt("is-fixed", t)
], ic = (t) => {
  const e = Ht(t);
  I(e, {
    paddingRight: "",
    overflow: ""
  });
  const s = mo(e);
  s.length && s.forEach((n) => {
    I(n, {
      paddingRight: "",
      marginRight: ""
    });
  });
}, vo = (t) => {
  const { clientWidth: e } = ft(t), { innerWidth: s } = qt(t);
  return Math.abs(s - e);
}, bo = (t, e) => {
  const s = Ht(t), n = parseInt(V(s, "paddingRight"), 10), i = V(s, "overflow") === "hidden" && n ? 0 : vo(t), c = mo(s);
  e && (I(s, {
    overflow: "hidden",
    paddingRight: `${n + i}px`
  }), c.length && c.forEach((a) => {
    const r = V(a, "paddingRight");
    if (a.style.paddingRight = `${parseInt(r, 10) + i}px`, [go, uo].some((l) => f(a, l))) {
      const l = V(a, "marginRight");
      a.style.marginRight = `${parseInt(l, 10) - i}px`;
    }
  }));
}, Q = "offcanvas", Et = Tt({ tagName: "div", className: "popup-container" }), wo = (t, e) => {
  const s = A(e) && e.nodeName === "BODY", n = A(e) && !s ? e : Et, o = s ? e : Ht(t);
  A(t) && (n === Et && o.append(Et), n.append(t));
}, $o = (t, e) => {
  const s = A(e) && e.nodeName === "BODY", n = A(e) && !s ? e : Et;
  A(t) && (t.remove(), n === Et && !Et.children.length && Et.remove());
}, As = (t, e) => {
  const s = A(e) && e.nodeName !== "BODY" ? e : Et;
  return A(t) && s.contains(t);
}, To = "backdrop", fn = `${Z}-${To}`, pn = `${Q}-${To}`, yo = `.${Z}.${m}`, Is = `.${Q}.${m}`, D = Tt("div"), Bt = (t) => P(`${yo},${Is}`, w(t)), ks = (t) => {
  const e = t ? fn : pn;
  [fn, pn].forEach((s) => {
    v(D, s);
  }), p(D, e);
}, Eo = (t, e, s) => {
  ks(s), wo(D, Ht(t)), e && p(D, R);
}, Co = () => {
  f(D, m) || (p(D, m), Lt(D));
}, Ve = () => {
  v(D, m);
}, Ho = (t) => {
  Bt(t) || (v(D, R), $o(D, Ht(t)), ic(t));
}, So = (t) => y(t) && V(t, "visibility") !== "hidden" && t.offsetParent !== null, cc = `.${Z}`, xo = `[${ct}="${Z}"]`, ac = `[${je}="${Z}"]`, Po = `${Z}-static`, rc = {
  backdrop: !0,
  keyboard: !0
}, ue = (t) => j(t, Ps), lc = (t) => new le(t), Pe = $(`show.bs.${Z}`), gn = $(`shown.bs.${Z}`), os = $(`hide.bs.${Z}`), un = $(`hidden.bs.${Z}`), Do = (t) => {
  const { element: e } = t, s = vo(e), { clientHeight: n, scrollHeight: o } = ft(e), { clientHeight: i, scrollHeight: c } = e, a = i !== c;
  if (!a && s) {
    const r = Ct(e) ? (
      /* istanbul ignore next */
      "paddingLeft"
    ) : "paddingRight", l = {};
    l[r] = `${s}px`, I(e, l);
  }
  bo(e, a || n !== o);
}, Ao = (t, e) => {
  const s = e ? L : B, { element: n, update: o } = t;
  s(n, N, fc), s(qt(n), Re, o, st), s(w(n), Le, hc);
}, mn = (t, e) => {
  const s = e ? L : B, { triggers: n } = t;
  n.length && n.forEach((o) => s(o, N, dc));
}, vn = (t) => {
  const { triggers: e, element: s, relatedTarget: n } = t;
  Ho(s), I(s, { paddingRight: "", display: "" }), Ao(t);
  const o = Pe.relatedTarget || e.find(So);
  o && ht(o), un.relatedTarget = n, b(s, un);
}, bn = (t) => {
  const { element: e, relatedTarget: s } = t;
  ht(e), Ao(t, !0), gn.relatedTarget = s, b(e, gn);
}, wn = (t) => {
  const { element: e, hasFade: s } = t;
  I(e, { display: "block" }), Do(t), Bt(e) || I(Ht(e), { overflow: "hidden" }), p(e, m), Nt(e, Oe), O(e, Me, "true"), s ? x(e, () => bn(t)) : bn(t);
}, $n = (t) => {
  const { element: e, options: s, hasFade: n } = t;
  s.backdrop && n && f(D, m) && !Bt(e) ? (Ve(), x(D, () => vn(t))) : vn(t);
}, dc = (t) => {
  const { target: e } = t, s = e && M(e, xo), n = s && Y(s), o = n && ue(n);
  o && (s && s.tagName === "A" && t.preventDefault(), o.relatedTarget = s, o.toggle());
}, hc = ({ code: t, target: e }) => {
  const s = P(yo, w(e)), n = s && ue(s);
  if (n) {
    const { options: o } = n;
    o.keyboard && t === Hs && // the keyboard option is enabled and the key is 27
    f(s, m) && (n.relatedTarget = null, n.hide());
  }
};
function fc(t) {
  var s, n;
  const e = ue(this);
  if (e && !u.get(this)) {
    const { options: o, isStatic: i, modalDialog: c } = e, { backdrop: a } = o, { target: r } = t, l = (n = (s = w(this)) == null ? void 0 : s.getSelection()) == null ? void 0 : n.toString().length, d = c.contains(r), g = r && M(r, ac);
    i && !d ? u.set(
      this,
      () => {
        p(this, Po), x(c, () => pc(e));
      },
      17
    ) : (g || !l && !i && !d && a) && (e.relatedTarget = g || null, e.hide(), t.preventDefault());
  }
}
const pc = (t) => {
  const { element: e, modalDialog: s } = t, n = (Xt(s) || 0) + 17;
  v(e, Po), u.set(e, () => u.clear(e), n);
};
class le extends nt {
  /**
   * @param target usually the `.modal` element
   * @param config instance options
   */
  constructor(s, n) {
    super(s, n);
    /**
     * Updates the modal layout.
     */
    h(this, "update", () => {
      f(this.element, m) && Do(this);
    });
    const { element: o } = this, i = P(`.${Z}-dialog`, o);
    i && (this.modalDialog = i, this.triggers = [...tt(xo, w(o))].filter(
      (c) => Y(c) === o
    ), this.isStatic = this.options.backdrop === "static", this.hasFade = f(o, R), this.relatedTarget = null, mn(this, !0));
  }
  /**
   * Returns component name string.
   */
  get name() {
    return Ps;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return rc;
  }
  // MODAL PUBLIC METHODS
  // ====================
  /** Toggles the visibility of the modal. */
  toggle() {
    f(this.element, m) ? this.hide() : this.show();
  }
  /** Shows the modal to the user. */
  show() {
    const { element: s, options: n, hasFade: o, relatedTarget: i } = this, { backdrop: c } = n;
    let a = 0;
    if (!f(s, m) && (Pe.relatedTarget = i || void 0, b(s, Pe), !Pe.defaultPrevented)) {
      const r = Bt(s);
      if (r && r !== s) {
        const l = ue(r) || /* istanbul ignore next */
        j(r, Ds);
        l && l.hide();
      }
      c ? (As(D) ? ks(!0) : Eo(s, o, !0), a = Xt(D), Co(), setTimeout(() => wn(this), a)) : (wn(this), r && f(D, m) && Ve());
    }
  }
  /** Hide the modal from the user. */
  hide() {
    const { element: s, hasFade: n, relatedTarget: o } = this;
    f(s, m) && (os.relatedTarget = o || void 0, b(s, os), os.defaultPrevented || (v(s, m), O(s, Oe, "true"), Nt(s, Me), n ? x(s, () => $n(this)) : $n(this)));
  }
  /** Removes the `Modal` component from target element. */
  dispose() {
    const s = { ...this }, { element: n, modalDialog: o } = s, i = () => setTimeout(() => super.dispose(), 17);
    mn(s), this.hide(), f(n, "fade") ? x(o, i) : i();
  }
}
h(le, "selector", cc), h(le, "init", lc), h(le, "getInstance", ue);
const gc = `.${Q}`, Ns = `[${ct}="${Q}"]`, uc = `[${je}="${Q}"]`, Xe = `${Q}-toggling`, mc = {
  backdrop: !0,
  // boolean
  keyboard: !0,
  // boolean
  scroll: !1
  // boolean
}, me = (t) => j(t, Ds), vc = (t) => new de(t), De = $(`show.bs.${Q}`), Io = $(`shown.bs.${Q}`), is = $(`hide.bs.${Q}`), ko = $(`hidden.bs.${Q}`), bc = (t) => {
  const { element: e } = t, { clientHeight: s, scrollHeight: n } = ft(e);
  bo(e, s !== n);
}, Tn = (t, e) => {
  const s = e ? L : B;
  t.triggers.forEach((n) => s(n, N, $c));
}, No = (t, e) => {
  const s = e ? L : B, n = w(t.element);
  s(n, Le, yc), s(n, N, Tc);
}, yn = (t) => {
  const { element: e, options: s } = t;
  s.scroll || (bc(t), I(Ht(e), { overflow: "hidden" })), p(e, Xe), p(e, m), I(e, { visibility: "visible" }), x(e, () => Ec(t));
}, wc = (t) => {
  const { element: e, options: s } = t, n = Bt(e);
  e.blur(), !n && s.backdrop && f(D, m) ? (Ve(), x(D, () => En(t))) : En(t);
}, $c = (t) => {
  const e = M(t.target, Ns), s = e && Y(e), n = s && me(s);
  n && (n.relatedTarget = e, n.toggle(), e && e.tagName === "A" && t.preventDefault());
}, Tc = (t) => {
  const { target: e } = t, s = P(Is, w(e)), n = P(uc, s), o = s && me(s);
  if (o) {
    const { options: i, triggers: c } = o, { backdrop: a } = i, r = M(e, Ns), l = w(s).getSelection();
    (!D.contains(e) || a !== "static") && (!(l && l.toString().length) && (!s.contains(e) && a && /* istanbul ignore next */
    (!r || c.includes(e)) || n && n.contains(e)) && (o.relatedTarget = n && n.contains(e) ? n : null, o.hide()), r && r.tagName === "A" && t.preventDefault());
  }
}, yc = ({ code: t, target: e }) => {
  const s = P(Is, w(e)), n = s && me(s);
  n && n.options.keyboard && t === Hs && (n.relatedTarget = null, n.hide());
}, Ec = (t) => {
  const { element: e } = t;
  v(e, Xe), Nt(e, Oe), O(e, Me, "true"), O(e, "role", "dialog"), b(e, Io), No(t, !0), ht(e);
}, En = (t) => {
  const { element: e, triggers: s } = t;
  O(e, Oe, "true"), Nt(e, Me), Nt(e, "role"), I(e, { visibility: "" });
  const n = De.relatedTarget || s.find(So);
  n && ht(n), Ho(e), b(e, ko), v(e, Xe), Bt(e) || No(t);
};
class de extends nt {
  /**
   * @param target usually an `.offcanvas` element
   * @param config instance options
   */
  constructor(e, s) {
    super(e, s);
    const { element: n } = this;
    this.triggers = [...tt(Ns, w(n))].filter(
      (o) => Y(o) === n
    ), this.relatedTarget = null, Tn(this, !0);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return Ds;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return mc;
  }
  // OFFCANVAS PUBLIC METHODS
  // ========================
  /** Shows or hides the offcanvas from the user. */
  toggle() {
    f(this.element, m) ? this.hide() : this.show();
  }
  /** Shows the offcanvas to the user. */
  show() {
    const { element: e, options: s, relatedTarget: n } = this;
    let o = 0;
    if (!f(e, m) && (De.relatedTarget = n || void 0, Io.relatedTarget = n || void 0, b(e, De), !De.defaultPrevented)) {
      const i = Bt(e);
      if (i && i !== e) {
        const c = me(i) || /* istanbul ignore next */
        j(i, Ps);
        c && c.hide();
      }
      s.backdrop ? (As(D) ? ks() : Eo(e, !0), o = Xt(D), Co(), setTimeout(() => yn(this), o)) : (yn(this), i && f(D, m) && Ve());
    }
  }
  /** Hides the offcanvas from the user. */
  hide() {
    const { element: e, relatedTarget: s } = this;
    f(e, m) && (is.relatedTarget = s || void 0, ko.relatedTarget = s || void 0, b(e, is), is.defaultPrevented || (p(e, Xe), v(e, m), wc(this)));
  }
  /** Removes the `Offcanvas` from the target element. */
  dispose() {
    const e = { ...this }, { element: s, options: n } = e, o = n.backdrop ? Xt(D) : (
      /* istanbul ignore next */
      0
    ), i = () => setTimeout(() => super.dispose(), o + 17);
    Tn(e), this.hide(), f(s, m) ? x(s, i) : i();
  }
}
h(de, "selector", gc), h(de, "init", vc), h(de, "getInstance", me);
const It = "popover", Ye = "Popover", lt = "tooltip", Oo = (t) => {
  const e = t === lt, s = e ? `${t}-inner` : `${t}-body`, n = e ? "" : `<h3 class="${t}-header"></h3>`, o = `<div class="${t}-arrow"></div>`, i = `<div class="${s}"></div>`;
  return `<div class="${t}" role="${lt}">${n + o + i}</div>`;
}, Mo = {
  top: "top",
  bottom: "bottom",
  left: "start",
  right: "end"
}, ws = (t) => {
  const e = /\b(top|bottom|start|end)+/, { element: s, tooltip: n, container: o, options: i, arrow: c } = t;
  if (n) {
    const a = { ...Mo }, r = Ct(s);
    I(n, {
      // top: '0px', left: '0px', right: '', bottom: '',
      top: "",
      left: "",
      right: "",
      bottom: ""
    });
    const l = t.name === Ye, { offsetWidth: d, offsetHeight: g } = n, { clientWidth: C, clientHeight: W, offsetWidth: q } = ft(s);
    let { placement: T } = i;
    const { clientWidth: z, offsetWidth: U } = o, at = V(o, "position") === "fixed", H = Math.abs(at ? z - U : C - q), _ = r && at ? (
      /* istanbul ignore next */
      H
    ) : 0, ot = C - (r ? 0 : H) - 1, {
      width: F,
      height: K,
      left: S,
      right: Wt,
      top: gt
    } = $e(s, !0), { x: k, y: ut } = {
      x: S,
      y: gt
    };
    I(c, {
      top: "",
      left: "",
      right: "",
      bottom: ""
    });
    let St = 0, Gt = "", mt = 0, Ue = "", Ft = "", Ee = "", Ze = "";
    const xt = c.offsetWidth || 0, vt = c.offsetHeight || 0, qe = xt / 2;
    let Qt = gt - g - vt < 0, Jt = gt + g + K + vt >= W, _t = S - d - xt < _, te = S + d + F + xt >= ot;
    const Ce = ["left", "right"], Ge = ["top", "bottom"];
    Qt = Ce.includes(T) ? gt + K / 2 - g / 2 - vt < 0 : Qt, Jt = Ce.includes(T) ? gt + g / 2 + K / 2 + vt >= W : Jt, _t = Ge.includes(T) ? S + F / 2 - d / 2 < _ : _t, te = Ge.includes(T) ? S + d / 2 + F / 2 >= ot : te, T = Ce.includes(T) && _t && te ? "top" : T, T = T === "top" && Qt ? "bottom" : T, T = T === "bottom" && Jt ? "top" : T, T = T === "left" && _t ? "right" : T, T = T === "right" && te ? (
      /* istanbul ignore next */
      "left"
    ) : T, n.className.includes(T) || (n.className = n.className.replace(e, a[T])), Ce.includes(T) ? (T === "left" ? mt = k - d - (l ? xt : 0) : mt = k + F + (l ? xt : 0), Qt && Jt ? (St = 0, Gt = 0, Ft = gt + K / 2 - vt / 2) : Qt ? (St = ut, Gt = "", Ft = K / 2 - xt) : Jt ? (St = ut - g + K, Gt = "", Ft = g - K / 2 - xt) : (St = ut - g / 2 + K / 2, Ft = g / 2 - vt / 2)) : Ge.includes(T) && (T === "top" ? St = ut - g - (l ? vt : 0) : St = ut + K + (l ? vt : 0), _t ? (mt = 0, Ee = k + F / 2 - qe) : te ? (mt = "auto", Ue = 0, Ze = F / 2 + ot - Wt - qe) : (mt = k - d / 2 + F / 2, Ee = d / 2 - qe)), I(n, {
      top: `${St}px`,
      bottom: Gt === "" ? "" : `${Gt}px`,
      left: mt === "auto" ? mt : `${mt}px`,
      right: Ue !== "" ? `${Ue}px` : ""
    }), y(c) && (Ft !== "" && (c.style.top = `${Ft}px`), Ee !== "" ? c.style.left = `${Ee}px` : Ze !== "" && (c.style.right = `${Ze}px`));
    const qo = $(`updated.bs.${Yt(t.name)}`);
    b(s, qo);
  }
}, $s = {
  template: Oo(lt),
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
}, Lo = "data-original-title", kt = "Tooltip", wt = (t, e, s) => {
  if (we(e) && e.length) {
    let n = e.trim();
    bi(s) && (n = s(n));
    const i = new DOMParser().parseFromString(n, "text/html");
    t.append(...i.body.childNodes);
  } else
    y(e) ? t.append(e) : (wi(e) || vi(e) && e.every(A)) && t.append(...e);
}, Cc = (t) => {
  const e = t.name === kt, { id: s, element: n, options: o } = t, { title: i, placement: c, template: a, animation: r, customClass: l, sanitizeFn: d, dismissible: g, content: C, btnClose: W } = o, q = e ? lt : It, T = { ...Mo };
  let z = [], U = [];
  Ct(n) && (T.left = "end", T.right = "start");
  const Rt = `bs-${q}-${T[c]}`;
  let at;
  if (y(a))
    at = a;
  else {
    const _ = Tt("div");
    wt(_, a, d), at = _.firstChild;
  }
  t.tooltip = y(at) ? at.cloneNode(!0) : (
    /* istanbul ignore next */
    void 0
  );
  const { tooltip: H } = t;
  if (H) {
    O(H, "id", s), O(H, "role", lt);
    const _ = e ? `${lt}-inner` : `${It}-body`, ot = e ? null : P(`.${It}-header`, H), F = P(`.${_}`, H);
    t.arrow = P(`.${q}-arrow`, H);
    const { arrow: K } = t;
    if (y(i))
      z = [i.cloneNode(!0)];
    else {
      const S = Tt("div");
      wt(S, i, d), z = [...S.childNodes];
    }
    if (y(C))
      U = [C.cloneNode(!0)];
    else {
      const S = Tt("div");
      wt(S, C, d), U = [...S.childNodes];
    }
    if (g)
      if (i)
        if (y(W))
          z = [...z, W.cloneNode(!0)];
        else {
          const S = Tt("div");
          wt(S, W, d), z = [...z, S.firstChild];
        }
      else if (ot && ot.remove(), y(W))
        U = [...U, W.cloneNode(!0)];
      else {
        const S = Tt("div");
        wt(S, W, d), U = [...U, S.firstChild];
      }
    e ? i && F && wt(F, i, d) : (i && ot && wt(ot, z, d), C && F && wt(F, U, d), t.btn = P(".btn-close", H) || void 0), p(H, "position-fixed"), p(K, "position-absolute"), f(H, q) || p(H, q), r && !f(H, R) && p(H, R), l && !f(H, l) && p(H, l), f(H, Rt) || p(H, Rt);
  }
}, Hc = (t) => {
  const e = ["HTML", "BODY"], s = [];
  let { parentNode: n } = t;
  for (; n && !e.includes(n.nodeName); )
    n = mi(n), Gn(n) || $i(n) || s.push(n);
  return s.find((o, i) => V(o, "position") !== "relative" && s.slice(i + 1).every((c) => V(c, "position") === "static") ? o : null) || /* istanbul ignore next: optional guard */
  w(t).body;
}, Sc = `[${ct}="${lt}"],[data-tip="${lt}"]`, Bo = "title";
let Cn = (t) => j(t, kt);
const xc = (t) => new Pt(t), Pc = (t) => {
  const { element: e, tooltip: s, container: n, offsetParent: o } = t;
  Nt(e, Xn), $o(s, n === o ? n : o);
}, ee = (t) => {
  const { tooltip: e, container: s, offsetParent: n } = t;
  return e && As(e, s === n ? s : n);
}, Dc = (t, e) => {
  const { element: s } = t;
  ne(t), Ne(s, Lo) && t.name === kt && Wo(t), e && e();
}, Ro = (t, e) => {
  const s = e ? L : B, { element: n } = t;
  s(w(n), Cs, t.handleTouch, st), [We, Re].forEach((o) => {
    s(qt(n), o, t.update, st);
  });
}, Hn = (t) => {
  const { element: e } = t, s = $(`shown.bs.${Yt(t.name)}`);
  Ro(t, !0), b(e, s), u.clear(e, "in");
}, Sn = (t) => {
  const { element: e } = t, s = $(`hidden.bs.${Yt(t.name)}`);
  Ro(t), Pc(t), b(e, s), u.clear(e, "out");
}, ne = (t, e) => {
  const s = e ? L : B, { element: n, options: o, btn: i } = t, { trigger: c } = o, r = !!(t.name !== kt && o.dismissible);
  c.includes("manual") || (t.enabled = !!e, c.split(" ").forEach((d) => {
    d === ti ? (s(n, Un, t.handleShow), s(n, Be, t.handleShow), r || (s(n, Es, t.handleHide), s(w(n), Cs, t.handleTouch, st))) : d === N ? s(n, d, r ? t.handleShow : t.toggle) : d === Ts && (s(n, ys, t.handleShow), r || s(n, Yn, t.handleHide), li && s(n, N, t.handleFocus)), r && i && s(i, N, t.handleHide);
  }));
}, xn = (t, e) => {
  const s = e ? L : B, { element: n, container: o, offsetParent: i } = t, { offsetHeight: c, scrollHeight: a } = o, r = M(n, `.${Z}`), l = M(n, `.${Q}`), d = qt(n), C = o === i && c !== a ? o : d;
  s(C, Re, t.update, st), s(C, We, t.update, st), r && s(r, `hide.bs.${Z}`, t.handleHide), l && s(l, `hide.bs.${Q}`, t.handleHide);
}, Wo = (t, e) => {
  const s = [Lo, Bo], { element: n } = t;
  O(
    n,
    s[e ? 0 : 1],
    e || it(n, s[0]) || /* istanbul ignore next */
    ""
  ), Nt(n, s[e ? 1 : 0]);
};
class Pt extends nt {
  /**
   * @param target the target element
   * @param config the instance options
   */
  constructor(s, n) {
    super(s, n);
    // TOOLTIP PUBLIC METHODS
    // ======================
    /** Handles the focus event on iOS. */
    h(this, "handleFocus", () => ht(this.element));
    /** Shows the tooltip. */
    h(this, "handleShow", () => this.show());
    /** Hides the tooltip. */
    h(this, "handleHide", () => this.hide());
    /** Updates the tooltip position. */
    h(this, "update", () => {
      ws(this);
    });
    /** Toggles the tooltip visibility. */
    h(this, "toggle", () => {
      const { tooltip: s } = this;
      s && !ee(this) ? this.show() : this.hide();
    });
    /**
     * Handles the `touchstart` event listener for `Tooltip`
     *
     * @this {Tooltip}
     * @param {TouchEvent} e the `Event` object
     */
    h(this, "handleTouch", ({ target: s }) => {
      const { tooltip: n, element: o } = this;
      n && n.contains(s) || s === o || s && o.contains(s) || this.hide();
    });
    const { element: o } = this, i = this.name === kt, c = i ? lt : It, a = i ? kt : Ye;
    Cn = (l) => j(l, a), this.enabled = !0, this.id = `${c}-${Qn(o, c)}`;
    const { options: r } = this;
    !r.title && i || !i && !r.content || (dt($s, { titleAttr: "" }), Ne(o, Bo) && i && typeof r.title == "string" && Wo(this, r.title), this.container = Hc(o), this.offsetParent = ["sticky", "fixed"].some(
      (l) => V(this.container, "position") === l
    ) ? this.container : w(this.element).body, Cc(this), ne(this, !0));
  }
  /**
   * Returns component name string.
   */
  get name() {
    return kt;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return $s;
  }
  show() {
    const { options: s, tooltip: n, element: o, container: i, offsetParent: c, id: a } = this, { animation: r } = s, l = u.get(o, "out"), d = i === c ? i : c;
    u.clear(o, "out"), n && !l && !ee(this) && u.set(
      o,
      () => {
        const g = $(`show.bs.${Yt(this.name)}`);
        b(o, g), g.defaultPrevented || (wo(n, d), O(o, Xn, `#${a}`), this.update(), xn(this, !0), f(n, m) || p(n, m), r ? x(n, () => Hn(this)) : Hn(this));
      },
      17,
      "in"
    );
  }
  hide() {
    const { options: s, tooltip: n, element: o } = this, { animation: i, delay: c } = s;
    u.clear(o, "in"), n && ee(this) && u.set(
      o,
      () => {
        const a = $(`hide.bs.${Yt(this.name)}`);
        b(o, a), a.defaultPrevented || (this.update(), v(n, m), xn(this), i ? x(n, () => Sn(this)) : Sn(this));
      },
      c + 17,
      "out"
    );
  }
  /** Enables the tooltip. */
  enable() {
    const { enabled: s } = this;
    s || (ne(this, !0), this.enabled = !s);
  }
  /** Disables the tooltip. */
  disable() {
    const { tooltip: s, options: n, enabled: o } = this, { animation: i } = n;
    o && (s && ee(this) && i ? (this.hide(), x(s, () => ne(this))) : ne(this), this.enabled = !o);
  }
  /** Toggles the `disabled` property. */
  toggleEnabled() {
    this.enabled ? this.disable() : this.enable();
  }
  /** Removes the `Tooltip` from the target element. */
  dispose() {
    const { tooltip: s, options: n } = this, o = { ...this, name: this.name }, i = () => setTimeout(() => Dc(o, () => super.dispose()), 17);
    n.animation && ee(o) ? (this.options.delay = 0, this.hide(), x(s, i)) : i();
  }
}
h(Pt, "selector", Sc), h(Pt, "init", xc), h(Pt, "getInstance", Cn), h(Pt, "styleTip", ws);
const Ac = `[${ct}="${It}"],[data-tip="${It}"]`, Ic = dt({}, $s, {
  template: Oo(It),
  content: "",
  dismissible: !1,
  btnClose: '<button class="btn-close" aria-label="Close"></button>'
}), kc = (t) => j(t, Ye), Nc = (t) => new Kt(t);
class Kt extends Pt {
  /**
   * @param target the target element
   * @param config the instance options
   */
  constructor(s, n) {
    super(s, n);
    /* extend original `show()` */
    h(this, "show", () => {
      super.show();
      const { options: s, btn: n } = this;
      s.dismissible && n && setTimeout(() => ht(n), 17);
    });
  }
  /**
   * Returns component name string.
   */
  get name() {
    return Ye;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return Ic;
  }
}
h(Kt, "selector", Ac), h(Kt, "init", Nc), h(Kt, "getInstance", kc), h(Kt, "styleTip", ws);
const Oc = "scrollspy", Fo = "ScrollSpy", Mc = '[data-bs-spy="scroll"]', Lc = {
  offset: 10,
  target: null
}, Bc = (t) => j(t, Fo), Rc = (t) => new he(t), Pn = $(`activate.bs.${Oc}`), Wc = (t) => {
  const { target: e, scrollTarget: s, options: n, itemsLength: o, scrollHeight: i, element: c } = t, { offset: a } = n, r = Ss(s), l = e && xs("A", e), d = s ? jo(s) : (
    /* istanbul ignore next */
    i
  );
  if (t.scrollTop = r ? s.scrollY : s.scrollTop, l && (d !== i || o !== l.length)) {
    let g, C, W;
    t.items = [], t.offsets = [], t.scrollHeight = d, t.maxScroll = t.scrollHeight - Fc(t), [...l].forEach((q) => {
      g = it(q, "href"), C = g && g.charAt(0) === "#" && g.slice(-1) !== "#" && P(g, w(c)), C && (t.items.push(q), W = $e(C), t.offsets.push((r ? W.top + t.scrollTop : C.offsetTop) - a));
    }), t.itemsLength = t.items.length;
  }
}, jo = (t) => y(t) ? t.scrollHeight : ft(t).scrollHeight, Fc = ({ element: t, scrollTarget: e }) => Ss(e) ? e.innerHeight : $e(t).height, zo = (t) => {
  [...xs("A", t)].forEach((e) => {
    f(e, E) && v(e, E);
  });
}, Dn = (t, e) => {
  const { target: s, element: n } = t;
  y(s) && zo(s), t.activeItem = e, p(e, E);
  const o = [];
  let i = e;
  for (; i !== Ht(n); )
    i = i.parentElement, (f(i, "nav") || f(i, "dropdown-menu")) && o.push(i);
  o.forEach((c) => {
    const a = c.previousElementSibling;
    a && !f(a, E) && p(a, E);
  }), Pn.relatedTarget = e, b(n, Pn);
}, An = (t, e) => {
  (e ? L : B)(t.scrollTarget, We, t.refresh, st);
};
class he extends nt {
  /**
   * @param target the target element
   * @param config the instance options
   */
  constructor(s, n) {
    super(s, n);
    /* eslint-enable */
    // SCROLLSPY PUBLIC METHODS
    // ========================
    /** Updates all items. */
    h(this, "refresh", () => {
      const { target: s } = this;
      if (y(s) && s.offsetHeight > 0) {
        Wc(this);
        const { scrollTop: n, maxScroll: o, itemsLength: i, items: c, activeItem: a } = this;
        if (n >= o) {
          const l = c[i - 1];
          a !== l && Dn(this, l);
          return;
        }
        const { offsets: r } = this;
        if (a && n < r[0] && r[0] > 0) {
          this.activeItem = null, s && zo(s);
          return;
        }
        c.forEach((l, d) => {
          a !== l && n >= r[d] && (typeof r[d + 1] > "u" || n < r[d + 1]) && Dn(this, l);
        });
      }
    });
    const { element: o, options: i } = this;
    this.target = P(i.target, w(o)), this.target && (this.scrollTarget = o.clientHeight < o.scrollHeight ? o : qt(o), this.scrollHeight = jo(this.scrollTarget), An(this, !0), this.refresh());
  }
  /* eslint-disable */
  /**
   * Returns component name string.
   */
  get name() {
    return Fo;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return Lc;
  }
  /** Removes `ScrollSpy` from the target element. */
  dispose() {
    An(this), super.dispose();
  }
}
h(he, "selector", Mc), h(he, "init", Rc), h(he, "getInstance", Bc);
const ye = "tab", Ko = "Tab", In = `[${ct}="${ye}"]`, Vo = (t) => j(t, Ko), jc = (t) => new fe(t), cs = $(`show.bs.${ye}`), kn = $(`shown.bs.${ye}`), as = $(`hide.bs.${ye}`), Nn = $(`hidden.bs.${ye}`), ve = /* @__PURE__ */ new Map(), On = (t) => {
  const { tabContent: e, nav: s } = t;
  e && f(e, Ot) && (e.style.height = "", v(e, Ot)), s && u.clear(s);
}, Mn = (t) => {
  const { element: e, tabContent: s, content: n, nav: o } = t, { tab: i } = y(o) && ve.get(o) || /* istanbul ignore next */
  { tab: null };
  if (s && n && f(n, R)) {
    const { currentHeight: c, nextHeight: a } = ve.get(e) || /* istanbul ignore next */
    {
      currentHeight: 0,
      nextHeight: 0
    };
    c === a ? On(t) : setTimeout(() => {
      s.style.height = `${a}px`, Lt(s), x(s, () => On(t));
    }, 50);
  } else
    o && u.clear(o);
  kn.relatedTarget = i, b(e, kn);
}, Ln = (t) => {
  const { element: e, content: s, tabContent: n, nav: o } = t, { tab: i, content: c } = o && ve.get(o) || /* istanbul ignore next */
  { tab: null, content: null };
  let a = 0;
  if (n && s && f(s, R) && ([c, s].forEach((r) => {
    y(r) && p(r, "overflow-hidden");
  }), a = y(c) ? c.scrollHeight : (
    /* istanbul ignore next */
    0
  )), cs.relatedTarget = i, Nn.relatedTarget = e, b(e, cs), !cs.defaultPrevented) {
    if (s && p(s, E), c && v(c, E), n && s && f(s, R)) {
      const r = s.scrollHeight;
      ve.set(e, { currentHeight: a, nextHeight: r, tab: null, content: null }), p(n, Ot), n.style.height = `${a}px`, Lt(n), [c, s].forEach((l) => {
        l && v(l, "overflow-hidden");
      });
    }
    s && s && f(s, R) ? setTimeout(() => {
      p(s, m), x(s, () => {
        Mn(t);
      });
    }, 1) : (s && p(s, m), Mn(t)), i && b(i, Nn);
  }
}, Bn = (t) => {
  const { nav: e } = t;
  if (!y(e))
    return { tab: null, content: null };
  const s = rt(E, e);
  let n = null;
  s.length === 1 && !Mt.some((i) => f(s[0].parentElement, i)) ? [n] = s : s.length > 1 && (n = s[s.length - 1]);
  const o = y(n) ? Y(n) : null;
  return { tab: n, content: o };
}, Rn = (t) => {
  if (!y(t))
    return null;
  const e = M(t, `.${Mt.join(",.")}`);
  return e ? P(`.${Mt[0]}-toggle`, e) : null;
}, Wn = (t, e) => {
  (e ? L : B)(t.element, N, zc);
}, zc = (t) => {
  const e = Vo(t.target);
  e && (t.preventDefault(), e.show());
};
class fe extends nt {
  /** @param target the target element */
  constructor(e) {
    super(e);
    const { element: s } = this, n = Y(s);
    if (n) {
      const o = M(s, ".nav"), i = M(n, ".tab-content");
      this.nav = o, this.content = n, this.tabContent = i, this.dropdown = Rn(s);
      const { tab: c } = Bn(this);
      if (o && !c) {
        const a = P(In, o), r = a && Y(a);
        r && (p(a, E), p(r, m), p(r, E), O(s, Qe, "true"));
      }
      Wn(this, !0);
    }
  }
  /**
   * Returns component name string.
   */
  get name() {
    return Ko;
  }
  // TAB PUBLIC METHODS
  // ==================
  /** Shows the tab to the user. */
  show() {
    const { element: e, content: s, nav: n, dropdown: o } = this;
    if (!(n && u.get(n)) && !f(e, E)) {
      const { tab: i, content: c } = Bn(this);
      if (n && ve.set(n, { tab: i, content: c, currentHeight: 0, nextHeight: 0 }), as.relatedTarget = e, y(i) && (b(i, as), !as.defaultPrevented)) {
        p(e, E), O(e, Qe, "true");
        const a = y(i) && Rn(i);
        if (a && f(a, E) && v(a, E), n) {
          const r = () => {
            i && (v(i, E), O(i, Qe, "false")), o && !f(o, E) && p(o, E);
          };
          c && (f(c, R) || s && f(s, R)) ? u.set(n, r, 1) : r();
        }
        c && (v(c, m), f(c, R) ? x(c, () => Ln(this)) : Ln(this));
      }
    }
  }
  /** Removes the `Tab` component from the target element. */
  dispose() {
    Wn(this), super.dispose();
  }
}
h(fe, "selector", In), h(fe, "init", jc), h(fe, "getInstance", Vo);
const J = "toast", Xo = "Toast", Kc = `.${J}`, Vc = `[${je}="${J}"]`, Yo = `[${ct}="${J}"]`, Zt = "showing", Uo = "hide", Xc = {
  animation: !0,
  autohide: !0,
  delay: 5e3
}, Os = (t) => j(t, Xo), Yc = (t) => new pe(t), Fn = $(`show.bs.${J}`), Uc = $(`shown.bs.${J}`), jn = $(`hide.bs.${J}`), Zc = $(`hidden.bs.${J}`), zn = (t) => {
  const { element: e, options: s } = t;
  v(e, Zt), u.clear(e, Zt), b(e, Uc), s.autohide && u.set(e, () => t.hide(), s.delay, J);
}, Kn = (t) => {
  const { element: e } = t;
  v(e, Zt), v(e, m), p(e, Uo), u.clear(e, J), b(e, Zc);
}, qc = (t) => {
  const { element: e, options: s } = t;
  p(e, Zt), s.animation ? (Lt(e), x(e, () => Kn(t))) : Kn(t);
}, Gc = (t) => {
  const { element: e, options: s } = t;
  u.set(
    e,
    () => {
      v(e, Uo), Lt(e), p(e, m), p(e, Zt), s.animation ? x(e, () => zn(t)) : zn(t);
    },
    17,
    Zt
  );
}, Zo = (t, e) => {
  const s = e ? L : B, { element: n, triggers: o, dismiss: i, options: c, hide: a } = t;
  i && s(i, N, a), c.autohide && [ys, Yn, Be, Es].forEach(
    (r) => s(n, r, _c)
  ), o.length && o.forEach((r) => s(r, N, Jc));
}, Qc = (t) => {
  u.clear(t.element, J), Zo(t);
}, Jc = (t) => {
  const { target: e } = t, s = e && M(e, Yo), n = s && Y(s), o = n && Os(n);
  o && (s && s.tagName === "A" && t.preventDefault(), o.relatedTarget = s, o.show());
}, _c = (t) => {
  const e = t.target, s = Os(e), { type: n, relatedTarget: o } = t;
  s && e !== o && !e.contains(o) && ([Be, ys].includes(n) ? u.clear(e, J) : u.set(e, () => s.hide(), s.options.delay, J));
};
class pe extends nt {
  /**
   * @param target the target `.toast` element
   * @param config the instance options
   */
  constructor(s, n) {
    super(s, n);
    // TOAST PUBLIC METHODS
    // ====================
    /** Shows the toast. */
    h(this, "show", () => {
      const { element: s, isShown: n } = this;
      s && !n && (b(s, Fn), Fn.defaultPrevented || Gc(this));
    });
    /** Hides the toast. */
    h(this, "hide", () => {
      const { element: s, isShown: n } = this;
      s && n && (b(s, jn), jn.defaultPrevented || qc(this));
    });
    const { element: o, options: i } = this;
    i.animation && !f(o, R) ? p(o, R) : !i.animation && f(o, R) && v(o, R), this.dismiss = P(Vc, o), this.triggers = [...tt(Yo, w(o))].filter(
      (c) => Y(c) === o
    ), Zo(this, !0);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return Xo;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return Xc;
  }
  /**
   * Returns *true* when toast is visible.
   */
  get isShown() {
    return f(this.element, m);
  }
  /** Removes the `Toast` component from the target element. */
  dispose() {
    const { element: s, isShown: n } = this;
    n && v(s, m), Qc(this), super.dispose();
  }
}
h(pe, "selector", Kc), h(pe, "init", Yc), h(pe, "getInstance", Os);
const Ms = /* @__PURE__ */ new Map();
[oe, ie, ce, ae, re, le, de, Kt, he, fe, pe, Pt].forEach(
  (t) => Ms.set(t.prototype.name, t)
);
const ta = (t, e) => {
  [...e].forEach((s) => t(s));
}, ea = (t, e) => {
  const s = Dt.getAllFor(t);
  s && [...s].forEach(([n, o]) => {
    e.contains(n) && o.dispose();
  });
}, Vn = (t) => {
  const e = t && t.nodeName ? t : document, s = [...xs("*", e)];
  Ms.forEach((n) => {
    const { init: o, selector: i } = n;
    ta(
      o,
      s.filter((c) => _n(c, i))
    );
  });
}, na = (t) => {
  const e = t && t.nodeName ? t : document;
  Ms.forEach((s) => {
    ea(s.prototype.name, e);
  });
};
document.body ? Vn() : L(document, "DOMContentLoaded", () => Vn(), { once: !0 });
export {
  oe as Alert,
  ie as Button,
  ce as Carousel,
  ae as Collapse,
  re as Dropdown,
  le as Modal,
  de as Offcanvas,
  Kt as Popover,
  he as ScrollSpy,
  fe as Tab,
  pe as Toast,
  Pt as Tooltip,
  Vn as initCallback,
  na as removeDataAPI
};
//# sourceMappingURL=bootstrap-native.mjs.map
