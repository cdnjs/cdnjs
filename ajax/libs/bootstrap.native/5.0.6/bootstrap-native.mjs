var qo = Object.defineProperty;
var Go = (t, e, s) => e in t ? qo(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s;
var h = (t, e, s) => (Go(t, typeof e != "symbol" ? e + "" : e, s), s);
const Dt = {}, Ts = (t) => {
  const { type: e, currentTarget: s } = t;
  [...Dt[e]].forEach(([n, o]) => {
    s === n && [...o].forEach(([i, c]) => {
      i.apply(n, [t]), typeof c == "object" && c.once && N(n, e, i, c);
    });
  });
}, k = (t, e, s, n) => {
  Dt[e] || (Dt[e] = /* @__PURE__ */ new Map());
  const o = Dt[e];
  o.has(t) || o.set(t, /* @__PURE__ */ new Map());
  const i = o.get(t), { size: c } = i;
  i.set(s, n), c || t.addEventListener(e, Ts, n);
}, N = (t, e, s, n) => {
  const o = Dt[e], i = o && o.get(t), c = i && i.get(s), a = c !== void 0 ? c : n;
  i && i.has(s) && i.delete(s), o && (!i || !i.size) && o.delete(t), (!o || !o.size) && delete Dt[e], (!i || !i.size) && t.removeEventListener(e, Ts, a);
}, Qo = k, Jo = N, ia = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addListener: k,
  globalListener: Ts,
  off: Jo,
  on: Qo,
  registry: Dt,
  removeListener: N
}, Symbol.toStringTag, { value: "Module" })), Yn = "aria-describedby", Ae = "aria-expanded", Oe = "aria-hidden", Me = "aria-modal", Bs = "aria-pressed", Ge = "aria-selected", ti = "DOMContentLoaded", ys = "focus", Es = "focusin", Un = "focusout", Le = "keydown", ei = "keyup", M = "click", _n = "mousedown", si = "hover", Be = "mouseenter", Cs = "mouseleave", ni = "pointerdown", oi = "pointermove", ii = "pointerup", Re = "resize", We = "scroll", Hs = "touchstart", ci = "dragstart", rs = "ArrowDown", ls = "ArrowUp", Rs = "ArrowLeft", Ws = "ArrowRight", Ss = "Escape", ai = "transitionDuration", ri = "transitionDelay", Qe = "transitionend", Zn = "transitionProperty", li = navigator.userAgentData, Ie = li, { userAgent: di } = navigator, ke = di, Fs = /iPhone|iPad|iPod|Android/i;
Ie ? Ie.brands.some((t) => Fs.test(t.brand)) : Fs.test(ke);
const js = /(iPhone|iPod|iPad)/, hi = Ie ? Ie.brands.some((t) => js.test(t.brand)) : (
  /* istanbul ignore next */
  js.test(ke)
);
ke && ke.includes("Firefox");
const { head: Fe } = document;
["webkitPerspective", "perspective"].some((t) => t in Fe.style);
const fi = (t, e, s, n) => {
  const o = n || !1;
  t.addEventListener(e, s, o);
}, pi = (t, e, s, n) => {
  const o = n || !1;
  t.removeEventListener(e, s, o);
}, gi = (t, e, s, n) => {
  const o = (i) => {
    (i.target === t || i.currentTarget === t) && (s.apply(t, [i]), pi(t, e, o, n));
  };
  fi(t, e, o, n);
}, ge = () => {
};
(() => {
  let t = !1;
  try {
    const e = Object.defineProperty({}, "passive", {
      get: () => (t = !0, t)
    });
    gi(document, ti, ge, e);
  } catch {
  }
  return t;
})();
["webkitTransform", "transform"].some((t) => t in Fe.style);
["webkitAnimation", "animation"].some((t) => t in Fe.style);
["webkitTransition", "transition"].some((t) => t in Fe.style);
const Ct = (t, e) => t.getAttribute(e), Ne = (t, e) => t.hasAttribute(e), L = (t, e, s) => t.setAttribute(e, s), Ot = (t, e) => t.removeAttribute(e), p = (t, ...e) => {
  t.classList.add(...e);
}, v = (t, ...e) => {
  t.classList.remove(...e);
}, f = (t, e) => t.classList.contains(e), be = (t) => t != null && typeof t == "object" || !1, A = (t) => be(t) && typeof t.nodeType == "number" && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].some((e) => t.nodeType === e) || !1, y = (t) => A(t) && t.nodeType === 1 || !1, zt = /* @__PURE__ */ new Map(), At = {
  data: zt,
  /**
   * Sets web components data.
   *
   * @param element target element
   * @param component the component's name or a unique key
   * @param instance the component instance
   */
  set: (t, e, s) => {
    y(t) && (zt.has(e) || zt.set(e, /* @__PURE__ */ new Map()), zt.get(e).set(t, s));
  },
  /**
   * Returns all instances for specified component.
   *
   * @param component the component's name or a unique key
   * @returns all the component instances
   */
  getAllFor: (t) => zt.get(t) || null,
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
    const s = At.getAllFor(e);
    return t && s && s.get(t) || null;
  },
  /**
   * Removes web components data.
   *
   * @param element target element
   * @param component the component's name or a unique key
   */
  remove: (t, e) => {
    const s = At.getAllFor(e);
    !s || !y(t) || (s.delete(t), s.size === 0 && zt.delete(e));
  }
}, j = (t, e) => At.get(t, e), we = (t) => typeof t == "string" || !1, xs = (t) => be(t) && t.constructor.name === "Window" || !1, qn = (t) => A(t) && t.nodeType === 9 || !1, w = (t) => xs(t) ? t.document : qn(t) ? t : A(t) ? t.ownerDocument : window.document, lt = (t, ...e) => Object.assign(t, ...e), $t = (t) => {
  if (!t)
    return;
  if (we(t))
    return w().createElement(t);
  const { tagName: e } = t, s = $t(e);
  if (!s)
    return;
  const n = { ...t };
  return delete n.tagName, lt(s, n);
}, b = (t, e) => t.dispatchEvent(e), V = (t, e) => {
  const s = getComputedStyle(t), n = e.replace("webkit", "Webkit").replace(/([A-Z])/g, "-$1").toLowerCase();
  return s.getPropertyValue(n);
}, ui = (t) => {
  const e = V(t, Zn), s = V(t, ri), n = s.includes("ms") ? (
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
  const e = V(t, Zn), s = V(t, ai), n = s.includes("ms") ? (
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
  const n = new Event(Qe), o = Xt(t), i = ui(t);
  if (o) {
    const c = (a) => {
      a.target === t && (e.apply(t, [a]), t.removeEventListener(Qe, c), s = 1);
    };
    t.addEventListener(Qe, c), setTimeout(() => {
      s || b(t, n);
    }, o + i + 17);
  } else
    e.apply(t, [n]);
}, dt = (t, e) => t.focus(e), zs = (t) => ["true", !0].includes(t) ? !0 : ["false", !1].includes(t) ? !1 : ["null", "", null, void 0].includes(t) ? null : t !== "" && !Number.isNaN(+t) ? +t : t, He = (t) => Object.entries(t), Yt = (t) => t.toLowerCase(), mi = (t, e, s, n) => {
  const o = { ...s }, i = { ...t.dataset }, c = { ...e }, a = {}, r = "title";
  return He(i).forEach(([l, d]) => {
    const g = n && typeof l == "string" && l.includes(n) ? l.replace(n, "").replace(/[A-Z]/g, (C) => Yt(C)) : l;
    a[g] = zs(d);
  }), He(o).forEach(([l, d]) => {
    o[l] = zs(d);
  }), He(e).forEach(([l, d]) => {
    l in o ? c[l] = o[l] : l in a ? c[l] = a[l] : c[l] = l === r ? Ct(t, r) : d;
  }), c;
}, Ks = (t) => Object.keys(t), $ = (t, e) => {
  const s = new CustomEvent(t, {
    cancelable: !0,
    bubbles: !0
  });
  return be(e) && lt(s, e), s;
}, st = { passive: !0 }, Bt = (t) => t.offsetHeight, I = (t, e) => {
  He(e).forEach(([s, n]) => {
    if (n && we(s) && s.includes("--"))
      t.style.setProperty(s, n);
    else {
      const o = {};
      o[s] = n, lt(t.style, o);
    }
  });
}, ds = (t) => be(t) && t.constructor.name === "Map" || !1, vi = (t) => typeof t == "number" || !1, vt = /* @__PURE__ */ new Map(), u = {
  /**
   * Sets a new timeout timer for an element, or element -> key association.
   *
   * @param element target element
   * @param callback the callback
   * @param delay the execution delay
   * @param key a unique key
   */
  set: (t, e, s, n) => {
    y(t) && (n && n.length ? (vt.has(t) || vt.set(t, /* @__PURE__ */ new Map()), vt.get(t).set(n, setTimeout(e, s))) : vt.set(t, setTimeout(e, s)));
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
    const s = vt.get(t);
    return e && s && ds(s) ? s.get(e) || /* istanbul ignore next */
    null : vi(s) ? s : null;
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
    const s = vt.get(t);
    e && e.length && ds(s) ? (clearTimeout(s.get(e)), s.delete(e), s.size === 0 && vt.delete(t)) : (clearTimeout(s), vt.delete(t));
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
}, Ht = (t) => w(t).body, ht = (t) => w(t).documentElement, Gn = (t) => A(t) && t.constructor.name === "ShadowRoot" || !1, bi = (t) => t.nodeName === "HTML" ? t : y(t) && t.assignedSlot || // step into the shadow DOM of the parent of a slotted node
A(t) && t.parentNode || // DOM Element detected
Gn(t) && t.host || // ShadowRoot detected
ht(t);
let Vs = 0, Xs = 0;
const Kt = /* @__PURE__ */ new Map(), Qn = (t, e) => {
  let s = e ? Vs : Xs;
  if (e) {
    const n = Qn(t), o = Kt.get(n) || /* @__PURE__ */ new Map();
    Kt.has(n) || Kt.set(n, o), ds(o) && !o.has(e) ? (o.set(e, s), Vs += 1) : s = o.get(e);
  } else {
    const n = t.id || t;
    Kt.has(n) ? s = Kt.get(n) : (Kt.set(n, s), Xs += 1);
  }
  return s;
}, Zt = (t) => {
  var e;
  return t ? qn(t) ? t.defaultView : A(t) ? (e = t == null ? void 0 : t.ownerDocument) == null ? void 0 : e.defaultView : t : window;
}, wi = (t) => Array.isArray(t) || !1, Jn = (t) => {
  if (!A(t))
    return !1;
  const { top: e, bottom: s } = $e(t), { clientHeight: n } = ht(t);
  return e <= n && s >= 0;
}, $i = (t) => typeof t == "function" || !1, Ti = (t) => be(t) && t.constructor.name === "NodeList" || !1, Et = (t) => ht(t).dir === "rtl", yi = (t) => A(t) && ["TABLE", "TD", "TH"].includes(t.nodeName) || !1, B = (t, e) => t ? t.closest(e) || // break out of `ShadowRoot`
B(t.getRootNode().host, e) : null, P = (t, e) => y(t) ? t : (A(e) ? e : w()).querySelector(t), Ps = (t, e) => (A(e) ? e : w()).getElementsByTagName(t), tt = (t, e) => (A(e) ? e : w()).querySelectorAll(t), at = (t, e) => (e && A(e) ? e : w()).getElementsByClassName(
  t
), to = (t, e) => t.matches(e), R = "fade", m = "show", je = "data-bs-dismiss", ze = "alert", eo = "Alert", Ei = "5.0.6", Ci = Ei;
class nt {
  /**
   * @param target `HTMLElement` or selector string
   * @param config component instance options
   */
  constructor(e, s) {
    const n = P(e);
    if (!n)
      throw we(e) ? Error(`${this.name} Error: "${e}" is not a valid selector.`) : Error(`${this.name} Error: your target is not an instance of HTMLElement.`);
    const o = At.get(n, this.name);
    o && o.dispose(), this.element = n, this.options = this.defaults && Ks(this.defaults).length ? mi(n, this.defaults, s || {}, "bs") : {}, At.set(n, this.name, this);
  }
  /* istanbul ignore next */
  get version() {
    return Ci;
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
    At.remove(this.element, this.name), Ks(this).forEach((e) => {
      delete this[e];
    });
  }
}
const Hi = `.${ze}`, Si = `[${je}="${ze}"]`, xi = (t) => j(t, eo), Pi = (t) => new oe(t), Ys = $(`close.bs.${ze}`), Di = $(`closed.bs.${ze}`), Us = (t) => {
  const { element: e } = t;
  hs(t), b(e, Di), t.dispose(), e.remove();
}, hs = (t, e) => {
  const s = e ? k : N, { dismiss: n, close: o } = t;
  n && s(n, M, o);
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
      s && f(s, m) && (b(s, Ys), Ys.defaultPrevented || (v(s, m), f(s, R) ? x(s, () => Us(this)) : Us(this)));
    });
    this.dismiss = P(Si, this.element), hs(this, !0);
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
h(oe, "selector", Hi), h(oe, "init", Pi), h(oe, "getInstance", xi);
const E = "active", it = "data-bs-toggle", Ai = "button", so = "Button", Ii = `[${it}="${Ai}"]`, ki = (t) => j(t, so), Ni = (t) => new ie(t), _s = (t, e) => {
  (e ? k : N)(t.element, M, t.toggle);
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
      !f(n, "disabled") && !Ct(n, "disabled") && ((o ? v : p)(n, E), L(n, Bs, o ? "false" : "true"), this.isActive = f(n, E));
    });
    const { element: n } = this;
    this.isActive = f(n, E), L(n, Bs, String(!!this.isActive)), _s(this, !0);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return so;
  }
  /** Removes the `Button` component from the target element. */
  dispose() {
    _s(this), super.dispose();
  }
}
h(ie, "selector", Ii), h(ie, "init", Ni), h(ie, "getInstance", ki);
const fs = "data-bs-target", It = "carousel", no = "Carousel", Zs = "data-bs-parent", Oi = "data-bs-container", Y = (t) => {
  const e = [fs, Zs, Oi, "href"], s = w(t);
  return e.map((n) => {
    const o = Ct(t, n);
    return o ? n === Zs ? B(t, o) : P(o, s) : null;
  }).filter((n) => n)[0];
}, Te = `[data-bs-ride="${It}"]`, q = `${It}-item`, ps = "data-bs-slide-to", wt = "data-bs-slide", Tt = "paused", qs = {
  pause: "hover",
  keyboard: !1,
  touch: !0,
  interval: 5e3
}, ft = (t) => j(t, no), Mi = (t) => new ce(t);
let se = 0, Se = 0, Je = 0;
const ts = $(`slide.bs.${It}`), gs = $(`slid.bs.${It}`), Gs = (t) => {
  const { index: e, direction: s, element: n, slides: o, options: i } = t;
  if (t.isAnimating) {
    const c = us(t), a = s === "left" ? "next" : "prev", r = s === "left" ? "start" : "end";
    p(o[e], E), v(o[e], `${q}-${a}`), v(o[e], `${q}-${r}`), v(o[c], E), v(o[c], `${q}-${r}`), b(n, gs), u.clear(n, wt), t.cycle && !w(n).hidden && i.interval && !t.isPaused && t.cycle();
  }
};
function Li() {
  const t = ft(this);
  t && !t.isPaused && !u.get(this, Tt) && p(this, Tt);
}
function Bi() {
  const t = ft(this);
  t && t.isPaused && !u.get(this, Tt) && t.cycle();
}
function Ri(t) {
  t.preventDefault();
  const e = B(this, Te) || Y(this), s = ft(e);
  if (s && !s.isAnimating) {
    const n = +(Ct(this, ps) || /* istanbul ignore next */
    0);
    this && !f(this, E) && // event target is not active
    !Number.isNaN(n) && s.to(n);
  }
}
function Wi(t) {
  t.preventDefault();
  const e = B(this, Te) || Y(this), s = ft(e);
  if (s && !s.isAnimating) {
    const n = Ct(this, wt);
    n === "next" ? s.next() : n === "prev" && s.prev();
  }
}
const Fi = ({ code: t, target: e }) => {
  const s = w(e), [n] = [...tt(Te, s)].filter((i) => Jn(i)), o = ft(n);
  if (o && !o.isAnimating && !/textarea|input/i.test(e.nodeName)) {
    const i = Et(n);
    t === (i ? Ws : Rs) ? o.prev() : t === (i ? Rs : Ws) && o.next();
  }
};
function Qs(t) {
  const { target: e } = t, s = ft(this);
  s && s.isTouch && (s.indicator && !s.indicator.contains(e) || !s.controls.includes(e)) && (t.stopImmediatePropagation(), t.stopPropagation(), t.preventDefault());
}
function ji(t) {
  const { target: e } = t, s = ft(this);
  if (s && !s.isAnimating && !s.isTouch) {
    const { controls: n, indicators: o } = s;
    [...n, ...o].every((i) => i === e || i.contains(e)) || (se = t.pageX, this.contains(e) && (s.isTouch = !0, oo(s, !0)));
  }
}
const zi = (t) => {
  Se = t.pageX;
}, Ki = (t) => {
  var o;
  const { target: e } = t, s = w(e), n = [...tt(Te, s)].map((i) => ft(i)).find((i) => i.isTouch);
  if (n) {
    const { element: i, index: c } = n, a = Et(i);
    Je = t.pageX, n.isTouch = !1, oo(n), !((o = s.getSelection()) != null && o.toString().length) && i.contains(e) && Math.abs(se - Je) > 120 && (Se < se ? n.to(c + (a ? -1 : 1)) : Se > se && n.to(c + (a ? 1 : -1))), se = 0, Se = 0, Je = 0;
  }
}, es = (t, e) => {
  const { indicators: s } = t;
  [...s].forEach((n) => v(n, E)), t.indicators[e] && p(s[e], E);
}, oo = (t, e) => {
  const { element: s } = t, n = e ? k : N;
  n(w(s), oi, zi, st), n(w(s), ii, Ki, st);
}, Js = (t, e) => {
  const { element: s, options: n, slides: o, controls: i, indicators: c } = t, { touch: a, pause: r, interval: l, keyboard: d } = n, g = e ? k : N;
  r && l && (g(s, Be, Li), g(s, Cs, Bi)), a && o.length > 2 && (g(s, ni, ji, st), g(s, Hs, Qs, { passive: !1 }), g(s, ci, Qs, { passive: !1 })), i.length && i.forEach((C) => {
    C && g(C, M, Wi);
  }), c.length && c.forEach((C) => {
    g(C, M, Ri);
  }), d && g(w(s), Le, Fi);
}, us = (t) => {
  const { slides: e, element: s } = t, n = P(`.${q}.${E}`, s);
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
    this.direction = Et(n) ? "right" : "left", this.isTouch = !1, this.slides = at(q, n);
    const { slides: o } = this;
    if (o.length >= 2) {
      const i = us(this), c = [...o].find((l) => to(l, `.${q}-next,.${q}-next`));
      this.index = i;
      const a = w(n);
      this.controls = [
        ...tt(`[${wt}]`, n),
        ...tt(`[${wt}][${fs}="#${n.id}"]`, a)
      ].filter((l, d, g) => d === g.indexOf(l)), this.indicator = P(`.${It}-indicators`, n), this.indicators = [
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
    return f(this.element, Tt);
  }
  /**
   * Check if instance is animating.
   */
  get isAnimating() {
    return P(`.${q}-next,.${q}-prev`, this.element) !== null;
  }
  // CAROUSEL PUBLIC METHODS
  // =======================
  /** Slide automatically through items. */
  cycle() {
    const { element: e, options: s, isPaused: n, index: o } = this;
    u.clear(e, It), n && (u.clear(e, Tt), v(e, Tt)), u.set(
      e,
      () => {
        this.element && !this.isPaused && !this.isTouch && Jn(e) && this.to(o + 1);
      },
      s.interval,
      It
    );
  }
  /** Pause the automatic cycle. */
  pause() {
    const { element: e, options: s } = this;
    !this.isPaused && s.interval && (p(e, Tt), u.set(
      e,
      () => {
      },
      1,
      Tt
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
    const { element: s, slides: n, options: o } = this, i = us(this), c = Et(s);
    let a = e;
    if (!this.isAnimating && i !== a && !u.get(s, wt)) {
      i < a || i === 0 && a === n.length - 1 ? this.direction = c ? "right" : "left" : (i > a || i === n.length - 1 && a === 0) && (this.direction = c ? "left" : "right");
      const { direction: r } = this;
      a < 0 ? a = n.length - 1 : a >= n.length && (a = 0);
      const l = r === "left" ? "next" : "prev", d = r === "left" ? "start" : "end", g = {
        relatedTarget: n[a],
        from: i,
        to: a,
        direction: r
      };
      lt(ts, g), lt(gs, g), b(s, ts), ts.defaultPrevented || (this.index = a, es(this, a), Xt(n[a]) && f(s, "slide") ? u.set(
        s,
        () => {
          p(n[a], `${q}-${l}`), Bt(n[a]), p(n[a], `${q}-${d}`), p(n[i], `${q}-${d}`), x(
            n[a],
            () => this.slides && this.slides.length && Gs(this)
          );
        },
        0,
        wt
      ) : (p(n[a], E), v(n[i], E), u.set(
        s,
        () => {
          u.clear(s, wt), s && o.interval && !this.isPaused && this.cycle(), b(s, gs);
        },
        0,
        wt
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
h(ce, "selector", Te), h(ce, "init", Mi), h(ce, "getInstance", ft);
const Mt = "collapsing", X = "collapse", io = "Collapse", Vi = `.${X}`, co = `[${it}="${X}"]`, Xi = { parent: null }, xe = (t) => j(t, io), Yi = (t) => new ae(t), tn = $(`show.bs.${X}`), Ui = $(`shown.bs.${X}`), en = $(`hide.bs.${X}`), _i = $(`hidden.bs.${X}`), Zi = (t) => {
  const { element: e, parent: s, triggers: n } = t;
  b(e, tn), tn.defaultPrevented || (u.set(e, ge, 17), s && u.set(s, ge, 17), p(e, Mt), v(e, X), I(e, { height: `${e.scrollHeight}px` }), x(e, () => {
    u.clear(e), s && u.clear(s), n.forEach((o) => L(o, Ae, "true")), v(e, Mt), p(e, X), p(e, m), I(e, { height: "" }), b(e, Ui);
  }));
}, sn = (t) => {
  const { element: e, parent: s, triggers: n } = t;
  b(e, en), en.defaultPrevented || (u.set(e, ge, 17), s && u.set(s, ge, 17), I(e, { height: `${e.scrollHeight}px` }), v(e, X), v(e, m), p(e, Mt), Bt(e), I(e, { height: "0px" }), x(e, () => {
    u.clear(e), s && u.clear(s), n.forEach((o) => L(o, Ae, "false")), v(e, Mt), p(e, X), I(e, { height: "" }), b(e, _i);
  }));
}, nn = (t, e) => {
  const s = e ? k : N, { triggers: n } = t;
  n.length && n.forEach((o) => s(o, M, qi));
}, qi = (t) => {
  const { target: e } = t, s = e && B(e, co), n = s && Y(s), o = n && xe(n);
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
    this.triggers = [...tt(co, i)].filter((c) => Y(c) === n), this.parent = y(o.parent) ? o.parent : we(o.parent) ? Y(n) || P(o.parent, i) : null, nn(this, !0);
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
    return Xi;
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
    u.get(s) || (sn(this), e.length && e.forEach((n) => p(n, `${X}d`)));
  }
  /** Shows the collapse. */
  show() {
    const { element: e, parent: s, triggers: n } = this;
    let o, i;
    s && (o = [...tt(`.${X}.${m}`, s)].find(
      (c) => xe(c)
    ), i = o && xe(o)), (!s || !u.get(s)) && !u.get(e) && (i && o !== e && (sn(i), i.triggers.forEach((c) => {
      p(c, `${X}d`);
    })), Zi(this), n.length && n.forEach((c) => v(c, `${X}d`)));
  }
  /** Remove the `Collapse` component from the target `Element`. */
  dispose() {
    nn(this), super.dispose();
  }
}
h(ae, "selector", Vi), h(ae, "init", Yi), h(ae, "getInstance", xe);
const Lt = ["dropdown", "dropup", "dropstart", "dropend"], ao = "Dropdown", ro = "dropdown-menu", lo = (t) => {
  const e = B(t, "A");
  return t.tagName === "A" && // anchor href starts with #
  Ne(t, "href") && t.href.slice(-1) === "#" || // OR a child of an anchor with href starts with #
  e && Ne(e, "href") && e.href.slice(-1) === "#";
}, [et, ms, vs, bs] = Lt, ho = `[${it}="${et}"]`, Ut = (t) => j(t, ao), Gi = (t) => new re(t), Qi = `${ro}-end`, on = [et, ms], cn = [vs, bs], an = ["A", "BUTTON"], Ji = {
  offset: 5,
  // [number] 5(px)
  display: "dynamic"
  // [dynamic|static]
}, ss = $(`show.bs.${et}`), rn = $(`shown.bs.${et}`), ns = $(`hide.bs.${et}`), ln = $(`hidden.bs.${et}`), fo = $(`updated.bs.${et}`), po = (t) => {
  const { element: e, menu: s, parentElement: n, options: o } = t, { offset: i } = o;
  if (V(s, "position") !== "static") {
    const c = Et(e), a = f(s, Qi);
    ["margin", "top", "bottom", "left", "right"].forEach((O) => {
      const gt = {};
      gt[O] = "", I(s, gt);
    });
    let l = Lt.find((O) => f(n, O)) || /* istanbul ignore next: fallback position */
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
    }, { offsetWidth: C, offsetHeight: W } = s, { clientWidth: Z, clientHeight: T } = ht(e), {
      left: z,
      top: U,
      width: Wt,
      height: ct
    } = $e(e), H = z - C - i < 0, J = z + C + Wt + i >= Z, ot = U + W + i >= T, F = U + W + ct + i >= T, K = U - W - i < 0, S = (!c && a || c && !a) && z + Wt - C < 0, Ft = (c && a || !c && !a) && z + C >= Z;
    if (cn.includes(l) && H && J && (l = et), l === vs && (c ? J : H) && (l = bs), l === bs && (c ? H : J) && (l = vs), l === ms && K && !F && (l = et), l === et && F && !K && (l = ms), cn.includes(l) && ot && lt(g[l], {
      top: "auto",
      bottom: 0
    }), on.includes(l) && (S || Ft)) {
      let O = { left: "auto", right: "auto" };
      !S && Ft && !c && (O = { left: "auto", right: 0 }), S && !Ft && c && (O = { left: 0, right: "auto" }), O && lt(g[l], O);
    }
    const pt = d[l];
    I(s, {
      ...g[l],
      margin: `${pt.map((O) => O && `${O}px`).join(" ")}`
    }), on.includes(l) && a && a && I(s, g[!c && S || c && Ft ? "menuStart" : (
      /* istanbul ignore next */
      "menuEnd"
    )]), b(n, fo);
  }
}, tc = (t) => [...t.children].map((e) => {
  if (e && an.includes(e.tagName))
    return e;
  const { firstElementChild: s } = e;
  return s && an.includes(s.tagName) ? s : null;
}).filter((e) => e), dn = (t) => {
  const { element: e, options: s } = t, n = t.open ? k : N, o = w(e);
  n(o, M, fn), n(o, ys, fn), n(o, Le, sc), n(o, ei, nc), s.display === "dynamic" && [We, Re].forEach((i) => {
    n(Zt(e), i, oc, st);
  });
}, hn = (t, e) => {
  (e ? k : N)(t.element, M, ec);
}, Ke = (t) => {
  const e = [...Lt, "btn-group", "input-group"].map((s) => at(`${s} ${m}`, w(t))).find((s) => s.length);
  if (e && e.length)
    return [...e[0].children].find(
      (s) => Lt.some((n) => n === Ct(s, it))
    );
}, fn = (t) => {
  const { target: e, type: s } = t;
  if (e && y(e)) {
    const n = Ke(e), o = n && Ut(n);
    if (o) {
      const { parentElement: i, menu: c } = o, a = i && i.contains(e) && (e.tagName === "form" || B(e, "form") !== null);
      [M, _n].includes(s) && lo(e) && t.preventDefault(), !a && s !== ys && e !== n && e !== c && o.hide();
    }
  }
}, ec = (t) => {
  const { target: e } = t, s = e && B(e, ho), n = s && Ut(s);
  n && (t.stopPropagation(), n.toggle(), s && lo(s) && t.preventDefault());
}, sc = (t) => {
  [rs, ls].includes(t.code) && t.preventDefault();
};
function nc(t) {
  const { code: e } = t, s = Ke(this), n = s && Ut(s), { activeElement: o } = s && w(s);
  if (n && o) {
    const { menu: i, open: c } = n, a = tc(i);
    if (a && a.length && [rs, ls].includes(e)) {
      let r = a.indexOf(o);
      o === s ? r = 0 : e === ls ? r = r > 1 ? r - 1 : 0 : e === rs && (r = r < a.length - 1 ? r + 1 : r), a[r] && dt(a[r]);
    }
    Ss === e && c && (n.toggle(), dt(s));
  }
}
function oc() {
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
    const { parentElement: n } = this.element, [o] = at(ro, n);
    o && (this.parentElement = n, this.menu = o, hn(this, !0));
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
    return Ji;
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
      c && c.hide(), [ss, rn, fo].forEach((a) => {
        a.relatedTarget = e;
      }), b(o, ss), ss.defaultPrevented || (p(n, m), p(o, m), L(e, Ae, "true"), po(this), this.open = !s, dt(e), dn(this), b(o, rn));
    }
  }
  /** Hides the dropdown menu from the user. */
  hide() {
    const { element: e, open: s, menu: n, parentElement: o } = this;
    s && ([ns, ln].forEach((i) => {
      i.relatedTarget = e;
    }), b(o, ns), ns.defaultPrevented || (v(n, m), v(o, m), L(e, Ae, "false"), this.open = !s, dn(this), b(o, ln)));
  }
  /** Removes the `Dropdown` component from the target element. */
  dispose() {
    this.open && this.hide(), hn(this), super.dispose();
  }
}
h(re, "selector", ho), h(re, "init", Gi), h(re, "getInstance", Ut);
const _ = "modal", Ds = "Modal", As = "Offcanvas", ic = "fixed-top", cc = "fixed-bottom", go = "sticky-top", uo = "position-sticky", mo = (t) => [
  ...at(ic, t),
  ...at(cc, t),
  ...at(go, t),
  ...at(uo, t),
  ...at("is-fixed", t)
], ac = (t) => {
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
  const { clientWidth: e } = ht(t), { innerWidth: s } = Zt(t);
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
}, G = "offcanvas", yt = $t({ tagName: "div", className: "popup-container" }), wo = (t, e) => {
  const s = A(e) && e.nodeName === "BODY", n = A(e) && !s ? e : yt, o = s ? e : Ht(t);
  A(t) && (n === yt && o.append(yt), n.append(t));
}, $o = (t, e) => {
  const s = A(e) && e.nodeName === "BODY", n = A(e) && !s ? e : yt;
  A(t) && (t.remove(), n === yt && !yt.children.length && yt.remove());
}, Is = (t, e) => {
  const s = A(e) && e.nodeName !== "BODY" ? e : yt;
  return A(t) && s.contains(t);
}, To = "backdrop", pn = `${_}-${To}`, gn = `${G}-${To}`, yo = `.${_}.${m}`, ks = `.${G}.${m}`, D = $t("div"), Rt = (t) => P(`${yo},${ks}`, w(t)), Ns = (t) => {
  const e = t ? pn : gn;
  [pn, gn].forEach((s) => {
    v(D, s);
  }), p(D, e);
}, Eo = (t, e, s) => {
  Ns(s), wo(D, Ht(t)), e && p(D, R);
}, Co = () => {
  f(D, m) || (p(D, m), Bt(D));
}, Ve = () => {
  v(D, m);
}, Ho = (t) => {
  Rt(t) || (v(D, R), $o(D, Ht(t)), ac(t));
}, So = (t) => y(t) && V(t, "visibility") !== "hidden" && t.offsetParent !== null, rc = `.${_}`, xo = `[${it}="${_}"]`, lc = `[${je}="${_}"]`, Po = `${_}-static`, dc = {
  backdrop: !0,
  keyboard: !0
}, ue = (t) => j(t, Ds), hc = (t) => new le(t), Pe = $(`show.bs.${_}`), un = $(`shown.bs.${_}`), os = $(`hide.bs.${_}`), mn = $(`hidden.bs.${_}`), Do = (t) => {
  const { element: e } = t, s = vo(e), { clientHeight: n, scrollHeight: o } = ht(e), { clientHeight: i, scrollHeight: c } = e, a = i !== c;
  if (!a && s) {
    const r = Et(e) ? (
      /* istanbul ignore next */
      "paddingLeft"
    ) : "paddingRight", l = {};
    l[r] = `${s}px`, I(e, l);
  }
  bo(e, a || n !== o);
}, Ao = (t, e) => {
  const s = e ? k : N, { element: n, update: o } = t;
  s(n, M, gc), s(Zt(n), Re, o, st), s(w(n), Le, pc);
}, vn = (t, e) => {
  const s = e ? k : N, { triggers: n } = t;
  n.length && n.forEach((o) => s(o, M, fc));
}, bn = (t) => {
  const { triggers: e, element: s, relatedTarget: n } = t;
  Ho(s), I(s, { paddingRight: "", display: "" }), Ao(t);
  const o = Pe.relatedTarget || e.find(So);
  o && dt(o), mn.relatedTarget = n, b(s, mn);
}, wn = (t) => {
  const { element: e, relatedTarget: s } = t;
  dt(e), Ao(t, !0), un.relatedTarget = s, b(e, un);
}, $n = (t) => {
  const { element: e, hasFade: s } = t;
  I(e, { display: "block" }), Do(t), Rt(e) || I(Ht(e), { overflow: "hidden" }), p(e, m), Ot(e, Oe), L(e, Me, "true"), s ? x(e, () => wn(t)) : wn(t);
}, Tn = (t) => {
  const { element: e, options: s, hasFade: n } = t;
  s.backdrop && n && f(D, m) && !Rt(e) ? (Ve(), x(D, () => bn(t))) : bn(t);
}, fc = (t) => {
  const { target: e } = t, s = e && B(e, xo), n = s && Y(s), o = n && ue(n);
  o && (s && s.tagName === "A" && t.preventDefault(), o.relatedTarget = s, o.toggle());
}, pc = ({ code: t, target: e }) => {
  const s = P(yo, w(e)), n = s && ue(s);
  if (n) {
    const { options: o } = n;
    o.keyboard && t === Ss && // the keyboard option is enabled and the key is 27
    f(s, m) && (n.relatedTarget = null, n.hide());
  }
};
function gc(t) {
  var s, n;
  const e = ue(this);
  if (e && !u.get(this)) {
    const { options: o, isStatic: i, modalDialog: c } = e, { backdrop: a } = o, { target: r } = t, l = (n = (s = w(this)) == null ? void 0 : s.getSelection()) == null ? void 0 : n.toString().length, d = c.contains(r), g = r && B(r, lc);
    i && !d ? u.set(
      this,
      () => {
        p(this, Po), x(c, () => uc(e));
      },
      17
    ) : (g || !l && !i && !d && a) && (e.relatedTarget = g || null, e.hide(), t.preventDefault());
  }
}
const uc = (t) => {
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
    const { element: o } = this, i = P(`.${_}-dialog`, o);
    i && (this.modalDialog = i, this.triggers = [...tt(xo, w(o))].filter(
      (c) => Y(c) === o
    ), this.isStatic = this.options.backdrop === "static", this.hasFade = f(o, R), this.relatedTarget = null, vn(this, !0));
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
    return dc;
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
      const r = Rt(s);
      if (r && r !== s) {
        const l = ue(r) || /* istanbul ignore next */
        j(r, As);
        l && l.hide();
      }
      c ? (Is(D) ? Ns(!0) : Eo(s, o, !0), a = Xt(D), Co(), setTimeout(() => $n(this), a)) : ($n(this), r && f(D, m) && Ve());
    }
  }
  /** Hide the modal from the user. */
  hide() {
    const { element: s, hasFade: n, relatedTarget: o } = this;
    f(s, m) && (os.relatedTarget = o || void 0, b(s, os), os.defaultPrevented || (v(s, m), L(s, Oe, "true"), Ot(s, Me), n ? x(s, () => Tn(this)) : Tn(this)));
  }
  /** Removes the `Modal` component from target element. */
  dispose() {
    const s = { ...this }, { element: n, modalDialog: o } = s, i = () => setTimeout(() => super.dispose(), 17);
    vn(s), this.hide(), f(n, "fade") ? x(o, i) : i();
  }
}
h(le, "selector", rc), h(le, "init", hc), h(le, "getInstance", ue);
const mc = `.${G}`, Os = `[${it}="${G}"]`, vc = `[${je}="${G}"]`, Xe = `${G}-toggling`, bc = {
  backdrop: !0,
  // boolean
  keyboard: !0,
  // boolean
  scroll: !1
  // boolean
}, me = (t) => j(t, As), wc = (t) => new de(t), De = $(`show.bs.${G}`), Io = $(`shown.bs.${G}`), is = $(`hide.bs.${G}`), ko = $(`hidden.bs.${G}`), $c = (t) => {
  const { element: e } = t, { clientHeight: s, scrollHeight: n } = ht(e);
  bo(e, s !== n);
}, yn = (t, e) => {
  const s = e ? k : N;
  t.triggers.forEach((n) => s(n, M, yc));
}, No = (t, e) => {
  const s = e ? k : N, n = w(t.element);
  s(n, Le, Cc), s(n, M, Ec);
}, En = (t) => {
  const { element: e, options: s } = t;
  s.scroll || ($c(t), I(Ht(e), { overflow: "hidden" })), p(e, Xe), p(e, m), I(e, { visibility: "visible" }), x(e, () => Hc(t));
}, Tc = (t) => {
  const { element: e, options: s } = t, n = Rt(e);
  e.blur(), !n && s.backdrop && f(D, m) ? (Ve(), x(D, () => Cn(t))) : Cn(t);
}, yc = (t) => {
  const e = B(t.target, Os), s = e && Y(e), n = s && me(s);
  n && (n.relatedTarget = e, n.toggle(), e && e.tagName === "A" && t.preventDefault());
}, Ec = (t) => {
  const { target: e } = t, s = P(ks, w(e)), n = P(vc, s), o = s && me(s);
  if (o) {
    const { options: i, triggers: c } = o, { backdrop: a } = i, r = B(e, Os), l = w(s).getSelection();
    (!D.contains(e) || a !== "static") && (!(l && l.toString().length) && (!s.contains(e) && a && /* istanbul ignore next */
    (!r || c.includes(e)) || n && n.contains(e)) && (o.relatedTarget = n && n.contains(e) ? n : null, o.hide()), r && r.tagName === "A" && t.preventDefault());
  }
}, Cc = ({ code: t, target: e }) => {
  const s = P(ks, w(e)), n = s && me(s);
  n && n.options.keyboard && t === Ss && (n.relatedTarget = null, n.hide());
}, Hc = (t) => {
  const { element: e } = t;
  v(e, Xe), Ot(e, Oe), L(e, Me, "true"), L(e, "role", "dialog"), b(e, Io), No(t, !0), dt(e);
}, Cn = (t) => {
  const { element: e, triggers: s } = t;
  L(e, Oe, "true"), Ot(e, Me), Ot(e, "role"), I(e, { visibility: "" });
  const n = De.relatedTarget || s.find(So);
  n && dt(n), Ho(e), b(e, ko), v(e, Xe), Rt(e) || No(t);
};
class de extends nt {
  /**
   * @param target usually an `.offcanvas` element
   * @param config instance options
   */
  constructor(e, s) {
    super(e, s);
    const { element: n } = this;
    this.triggers = [...tt(Os, w(n))].filter(
      (o) => Y(o) === n
    ), this.relatedTarget = null, yn(this, !0);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return As;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return bc;
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
      const i = Rt(e);
      if (i && i !== e) {
        const c = me(i) || /* istanbul ignore next */
        j(i, Ds);
        c && c.hide();
      }
      s.backdrop ? (Is(D) ? Ns() : Eo(e, !0), o = Xt(D), Co(), setTimeout(() => En(this), o)) : (En(this), i && f(D, m) && Ve());
    }
  }
  /** Hides the offcanvas from the user. */
  hide() {
    const { element: e, relatedTarget: s } = this;
    f(e, m) && (is.relatedTarget = s || void 0, ko.relatedTarget = s || void 0, b(e, is), is.defaultPrevented || (p(e, Xe), v(e, m), Tc(this)));
  }
  /** Removes the `Offcanvas` from the target element. */
  dispose() {
    const e = { ...this }, { element: s, options: n } = e, o = n.backdrop ? Xt(D) : (
      /* istanbul ignore next */
      0
    ), i = () => setTimeout(() => super.dispose(), o + 17);
    yn(e), this.hide(), f(s, m) ? x(s, i) : i();
  }
}
h(de, "selector", mc), h(de, "init", wc), h(de, "getInstance", me);
const kt = "popover", Ye = "Popover", rt = "tooltip", Oo = (t) => {
  const e = t === rt, s = e ? `${t}-inner` : `${t}-body`, n = e ? "" : `<h3 class="${t}-header"></h3>`, o = `<div class="${t}-arrow"></div>`, i = `<div class="${s}"></div>`;
  return `<div class="${t}" role="${rt}">${n + o + i}</div>`;
}, Mo = {
  top: "top",
  bottom: "bottom",
  left: "start",
  right: "end"
}, ws = (t) => {
  const e = /\b(top|bottom|start|end)+/, { element: s, tooltip: n, container: o, options: i, arrow: c } = t;
  if (n) {
    const a = { ...Mo }, r = Et(s);
    I(n, {
      // top: '0px', left: '0px', right: '', bottom: '',
      top: "",
      left: "",
      right: "",
      bottom: ""
    });
    const l = t.name === Ye, { offsetWidth: d, offsetHeight: g } = n, { clientWidth: C, clientHeight: W, offsetWidth: Z } = ht(s);
    let { placement: T } = i;
    const { clientWidth: z, offsetWidth: U } = o, ct = V(o, "position") === "fixed", H = Math.abs(ct ? z - U : C - Z), J = r && ct ? (
      /* istanbul ignore next */
      H
    ) : 0, ot = C - (r ? 0 : H) - 1, {
      width: F,
      height: K,
      left: S,
      right: Ft,
      top: pt
    } = $e(s, !0), { x: O, y: gt } = {
      x: S,
      y: pt
    };
    I(c, {
      top: "",
      left: "",
      right: "",
      bottom: ""
    });
    let St = 0, qt = "", ut = 0, Ue = "", jt = "", Ee = "", _e = "";
    const xt = c.offsetWidth || 0, mt = c.offsetHeight || 0, Ze = xt / 2;
    let Gt = pt - g - mt < 0, Qt = pt + g + K + mt >= W, Jt = S - d - xt < J, te = S + d + F + xt >= ot;
    const Ce = ["left", "right"], qe = ["top", "bottom"];
    Gt = Ce.includes(T) ? pt + K / 2 - g / 2 - mt < 0 : Gt, Qt = Ce.includes(T) ? pt + g / 2 + K / 2 + mt >= W : Qt, Jt = qe.includes(T) ? S + F / 2 - d / 2 < J : Jt, te = qe.includes(T) ? S + d / 2 + F / 2 >= ot : te, T = Ce.includes(T) && Jt && te ? "top" : T, T = T === "top" && Gt ? "bottom" : T, T = T === "bottom" && Qt ? "top" : T, T = T === "left" && Jt ? "right" : T, T = T === "right" && te ? (
      /* istanbul ignore next */
      "left"
    ) : T, n.className.includes(T) || (n.className = n.className.replace(e, a[T])), Ce.includes(T) ? (T === "left" ? ut = O - d - (l ? xt : 0) : ut = O + F + (l ? xt : 0), Gt && Qt ? (St = 0, qt = 0, jt = pt + K / 2 - mt / 2) : Gt ? (St = gt, qt = "", jt = K / 2 - xt) : Qt ? (St = gt - g + K, qt = "", jt = g - K / 2 - xt) : (St = gt - g / 2 + K / 2, jt = g / 2 - mt / 2)) : qe.includes(T) && (T === "top" ? St = gt - g - (l ? mt : 0) : St = gt + K + (l ? mt : 0), Jt ? (ut = 0, Ee = O + F / 2 - Ze) : te ? (ut = "auto", Ue = 0, _e = F / 2 + ot - Ft - Ze) : (ut = O - d / 2 + F / 2, Ee = d / 2 - Ze)), I(n, {
      top: `${St}px`,
      bottom: qt === "" ? "" : `${qt}px`,
      left: ut === "auto" ? ut : `${ut}px`,
      right: Ue !== "" ? `${Ue}px` : ""
    }), y(c) && (jt !== "" && (c.style.top = `${jt}px`), Ee !== "" ? c.style.left = `${Ee}px` : _e !== "" && (c.style.right = `${_e}px`));
    const Zo = $(`updated.bs.${Yt(t.name)}`);
    b(s, Zo);
  }
}, $s = {
  template: Oo(rt),
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
}, Lo = "data-original-title", Nt = "Tooltip", bt = (t, e, s) => {
  if (we(e) && e.length) {
    let n = e.trim();
    $i(s) && (n = s(n));
    const i = new DOMParser().parseFromString(n, "text/html");
    t.append(...i.body.childNodes);
  } else
    y(e) ? t.append(e) : (Ti(e) || wi(e) && e.every(A)) && t.append(...e);
}, Sc = (t) => {
  const e = t.name === Nt, { id: s, element: n, options: o } = t, { title: i, placement: c, template: a, animation: r, customClass: l, sanitizeFn: d, dismissible: g, content: C, btnClose: W } = o, Z = e ? rt : kt, T = { ...Mo };
  let z = [], U = [];
  Et(n) && (T.left = "end", T.right = "start");
  const Wt = `bs-${Z}-${T[c]}`;
  let ct;
  if (y(a))
    ct = a;
  else {
    const J = $t("div");
    bt(J, a, d), ct = J.firstChild;
  }
  t.tooltip = y(ct) ? ct.cloneNode(!0) : (
    /* istanbul ignore next */
    void 0
  );
  const { tooltip: H } = t;
  if (H) {
    L(H, "id", s), L(H, "role", rt);
    const J = e ? `${rt}-inner` : `${kt}-body`, ot = e ? null : P(`.${kt}-header`, H), F = P(`.${J}`, H);
    t.arrow = P(`.${Z}-arrow`, H);
    const { arrow: K } = t;
    if (y(i))
      z = [i.cloneNode(!0)];
    else {
      const S = $t("div");
      bt(S, i, d), z = [...S.childNodes];
    }
    if (y(C))
      U = [C.cloneNode(!0)];
    else {
      const S = $t("div");
      bt(S, C, d), U = [...S.childNodes];
    }
    if (g)
      if (i)
        if (y(W))
          z = [...z, W.cloneNode(!0)];
        else {
          const S = $t("div");
          bt(S, W, d), z = [...z, S.firstChild];
        }
      else if (ot && ot.remove(), y(W))
        U = [...U, W.cloneNode(!0)];
      else {
        const S = $t("div");
        bt(S, W, d), U = [...U, S.firstChild];
      }
    e ? i && F && bt(F, i, d) : (i && ot && bt(ot, z, d), C && F && bt(F, U, d), t.btn = P(".btn-close", H) || void 0), p(H, "position-fixed"), p(K, "position-absolute"), f(H, Z) || p(H, Z), r && !f(H, R) && p(H, R), l && !f(H, l) && p(H, l), f(H, Wt) || p(H, Wt);
  }
}, xc = (t) => {
  const e = ["HTML", "BODY"], s = [];
  let { parentNode: n } = t;
  for (; n && !e.includes(n.nodeName); )
    n = bi(n), Gn(n) || yi(n) || s.push(n);
  return s.find((o, i) => V(o, "position") !== "relative" && s.slice(i + 1).every((c) => V(c, "position") === "static") ? o : null) || /* istanbul ignore next: optional guard */
  w(t).body;
}, Pc = `[${it}="${rt}"],[data-tip="${rt}"]`, Bo = "title";
let Hn = (t) => j(t, Nt);
const Dc = (t) => new Pt(t), Ac = (t) => {
  const { element: e, tooltip: s, container: n, offsetParent: o } = t;
  Ot(e, Yn), $o(s, n === o ? n : o);
}, ee = (t) => {
  const { tooltip: e, container: s, offsetParent: n } = t;
  return e && Is(e, s === n ? s : n);
}, Ic = (t, e) => {
  const { element: s } = t;
  ne(t), Ne(s, Lo) && t.name === Nt && Wo(t), e && e();
}, Ro = (t, e) => {
  const s = e ? k : N, { element: n } = t;
  s(w(n), Hs, t.handleTouch, st), [We, Re].forEach((o) => {
    s(Zt(n), o, t.update, st);
  });
}, Sn = (t) => {
  const { element: e } = t, s = $(`shown.bs.${Yt(t.name)}`);
  Ro(t, !0), b(e, s), u.clear(e, "in");
}, xn = (t) => {
  const { element: e } = t, s = $(`hidden.bs.${Yt(t.name)}`);
  Ro(t), Ac(t), b(e, s), u.clear(e, "out");
}, ne = (t, e) => {
  const s = e ? k : N, { element: n, options: o, btn: i } = t, { trigger: c } = o, r = !!(t.name !== Nt && o.dismissible);
  c.includes("manual") || (t.enabled = !!e, c.split(" ").forEach((d) => {
    d === si ? (s(n, _n, t.handleShow), s(n, Be, t.handleShow), r || (s(n, Cs, t.handleHide), s(w(n), Hs, t.handleTouch, st))) : d === M ? s(n, d, r ? t.handleShow : t.toggle) : d === ys && (s(n, Es, t.handleShow), r || s(n, Un, t.handleHide), hi && s(n, M, t.handleFocus)), r && i && s(i, M, t.handleHide);
  }));
}, Pn = (t, e) => {
  const s = e ? k : N, { element: n, container: o, offsetParent: i } = t, { offsetHeight: c, scrollHeight: a } = o, r = B(n, `.${_}`), l = B(n, `.${G}`), d = Zt(n), C = o === i && c !== a ? o : d;
  s(C, Re, t.update, st), s(C, We, t.update, st), r && s(r, `hide.bs.${_}`, t.handleHide), l && s(l, `hide.bs.${G}`, t.handleHide);
}, Wo = (t, e) => {
  const s = [Lo, Bo], { element: n } = t;
  L(
    n,
    s[e ? 0 : 1],
    e || Ct(n, s[0]) || /* istanbul ignore next */
    ""
  ), Ot(n, s[e ? 1 : 0]);
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
    h(this, "handleFocus", () => dt(this.element));
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
    const { element: o } = this, i = this.name === Nt, c = i ? rt : kt, a = i ? Nt : Ye;
    Hn = (l) => j(l, a), this.enabled = !0, this.id = `${c}-${Qn(o, c)}`;
    const { options: r } = this;
    !r.title && i || !i && !r.content || (lt($s, { titleAttr: "" }), Ne(o, Bo) && i && typeof r.title == "string" && Wo(this, r.title), this.container = xc(o), this.offsetParent = ["sticky", "fixed"].some(
      (l) => V(this.container, "position") === l
    ) ? this.container : w(this.element).body, Sc(this), ne(this, !0));
  }
  /**
   * Returns component name string.
   */
  get name() {
    return Nt;
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
        b(o, g), g.defaultPrevented || (wo(n, d), L(o, Yn, `#${a}`), this.update(), Pn(this, !0), f(n, m) || p(n, m), r ? x(n, () => Sn(this)) : Sn(this));
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
        b(o, a), a.defaultPrevented || (this.update(), v(n, m), Pn(this), i ? x(n, () => xn(this)) : xn(this));
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
    const { tooltip: s, options: n } = this, o = { ...this, name: this.name }, i = () => setTimeout(() => Ic(o, () => super.dispose()), 17);
    n.animation && ee(o) ? (this.options.delay = 0, this.hide(), x(s, i)) : i();
  }
}
h(Pt, "selector", Pc), h(Pt, "init", Dc), h(Pt, "getInstance", Hn), h(Pt, "styleTip", ws);
const kc = `[${it}="${kt}"],[data-tip="${kt}"]`, Nc = lt({}, $s, {
  template: Oo(kt),
  content: "",
  dismissible: !1,
  btnClose: '<button class="btn-close" aria-label="Close"></button>'
}), Oc = (t) => j(t, Ye), Mc = (t) => new Vt(t);
class Vt extends Pt {
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
      s.dismissible && n && setTimeout(() => dt(n), 17);
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
    return Nc;
  }
}
h(Vt, "selector", kc), h(Vt, "init", Mc), h(Vt, "getInstance", Oc), h(Vt, "styleTip", ws);
const Lc = "scrollspy", Fo = "ScrollSpy", Bc = '[data-bs-spy="scroll"]', Rc = {
  offset: 10,
  target: null
}, Wc = (t) => j(t, Fo), Fc = (t) => new he(t), Dn = $(`activate.bs.${Lc}`), jc = (t) => {
  const { target: e, scrollTarget: s, options: n, itemsLength: o, scrollHeight: i, element: c } = t, { offset: a } = n, r = xs(s), l = e && Ps("A", e), d = s ? jo(s) : (
    /* istanbul ignore next */
    i
  );
  if (t.scrollTop = r ? s.scrollY : s.scrollTop, l && (d !== i || o !== l.length)) {
    let g, C, W;
    t.items = [], t.offsets = [], t.scrollHeight = d, t.maxScroll = t.scrollHeight - zc(t), [...l].forEach((Z) => {
      g = Ct(Z, "href"), C = g && g.charAt(0) === "#" && g.slice(-1) !== "#" && P(g, w(c)), C && (t.items.push(Z), W = $e(C), t.offsets.push((r ? W.top + t.scrollTop : C.offsetTop) - a));
    }), t.itemsLength = t.items.length;
  }
}, jo = (t) => y(t) ? t.scrollHeight : ht(t).scrollHeight, zc = ({ element: t, scrollTarget: e }) => xs(e) ? e.innerHeight : $e(t).height, zo = (t) => {
  [...Ps("A", t)].forEach((e) => {
    f(e, E) && v(e, E);
  });
}, An = (t, e) => {
  const { target: s, element: n } = t;
  y(s) && zo(s), t.activeItem = e, p(e, E);
  const o = [];
  let i = e;
  for (; i !== Ht(n); )
    i = i.parentElement, (f(i, "nav") || f(i, "dropdown-menu")) && o.push(i);
  o.forEach((c) => {
    const a = c.previousElementSibling;
    a && !f(a, E) && p(a, E);
  }), Dn.relatedTarget = e, b(n, Dn);
}, In = (t, e) => {
  (e ? k : N)(t.scrollTarget, We, t.refresh, st);
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
        jc(this);
        const { scrollTop: n, maxScroll: o, itemsLength: i, items: c, activeItem: a } = this;
        if (n >= o) {
          const l = c[i - 1];
          a !== l && An(this, l);
          return;
        }
        const { offsets: r } = this;
        if (a && n < r[0] && r[0] > 0) {
          this.activeItem = null, s && zo(s);
          return;
        }
        c.forEach((l, d) => {
          a !== l && n >= r[d] && (typeof r[d + 1] > "u" || n < r[d + 1]) && An(this, l);
        });
      }
    });
    const { element: o, options: i } = this;
    this.target = P(i.target, w(o)), this.target && (this.scrollTarget = o.clientHeight < o.scrollHeight ? o : Zt(o), this.scrollHeight = jo(this.scrollTarget), In(this, !0), this.refresh());
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
    return Rc;
  }
  /** Removes `ScrollSpy` from the target element. */
  dispose() {
    In(this), super.dispose();
  }
}
h(he, "selector", Bc), h(he, "init", Fc), h(he, "getInstance", Wc);
const ye = "tab", Ko = "Tab", kn = `[${it}="${ye}"]`, Vo = (t) => j(t, Ko), Kc = (t) => new fe(t), cs = $(`show.bs.${ye}`), Nn = $(`shown.bs.${ye}`), as = $(`hide.bs.${ye}`), On = $(`hidden.bs.${ye}`), ve = /* @__PURE__ */ new Map(), Mn = (t) => {
  const { tabContent: e, nav: s } = t;
  e && f(e, Mt) && (e.style.height = "", v(e, Mt)), s && u.clear(s);
}, Ln = (t) => {
  const { element: e, tabContent: s, content: n, nav: o } = t, { tab: i } = y(o) && ve.get(o) || /* istanbul ignore next */
  { tab: null };
  if (s && n && f(n, R)) {
    const { currentHeight: c, nextHeight: a } = ve.get(e) || /* istanbul ignore next */
    {
      currentHeight: 0,
      nextHeight: 0
    };
    c === a ? Mn(t) : setTimeout(() => {
      s.style.height = `${a}px`, Bt(s), x(s, () => Mn(t));
    }, 50);
  } else
    o && u.clear(o);
  Nn.relatedTarget = i, b(e, Nn);
}, Bn = (t) => {
  const { element: e, content: s, tabContent: n, nav: o } = t, { tab: i, content: c } = o && ve.get(o) || /* istanbul ignore next */
  { tab: null, content: null };
  let a = 0;
  if (n && s && f(s, R) && ([c, s].forEach((r) => {
    y(r) && p(r, "overflow-hidden");
  }), a = y(c) ? c.scrollHeight : (
    /* istanbul ignore next */
    0
  )), cs.relatedTarget = i, On.relatedTarget = e, b(e, cs), !cs.defaultPrevented) {
    if (s && p(s, E), c && v(c, E), n && s && f(s, R)) {
      const r = s.scrollHeight;
      ve.set(e, { currentHeight: a, nextHeight: r, tab: null, content: null }), p(n, Mt), n.style.height = `${a}px`, Bt(n), [c, s].forEach((l) => {
        l && v(l, "overflow-hidden");
      });
    }
    s && s && f(s, R) ? setTimeout(() => {
      p(s, m), x(s, () => {
        Ln(t);
      });
    }, 1) : (s && p(s, m), Ln(t)), i && b(i, On);
  }
}, Rn = (t) => {
  const { nav: e } = t;
  if (!y(e))
    return { tab: null, content: null };
  const s = at(E, e);
  let n = null;
  s.length === 1 && !Lt.some((i) => f(s[0].parentElement, i)) ? [n] = s : s.length > 1 && (n = s[s.length - 1]);
  const o = y(n) ? Y(n) : null;
  return { tab: n, content: o };
}, Wn = (t) => {
  if (!y(t))
    return null;
  const e = B(t, `.${Lt.join(",.")}`);
  return e ? P(`.${Lt[0]}-toggle`, e) : null;
}, Fn = (t, e) => {
  (e ? k : N)(t.element, M, Vc);
}, Vc = (t) => {
  const e = Vo(t.target);
  e && (t.preventDefault(), e.show());
};
class fe extends nt {
  /** @param target the target element */
  constructor(e) {
    super(e);
    const { element: s } = this, n = Y(s);
    if (n) {
      const o = B(s, ".nav"), i = B(n, ".tab-content");
      this.nav = o, this.content = n, this.tabContent = i, this.dropdown = Wn(s);
      const { tab: c } = Rn(this);
      if (o && !c) {
        const a = P(kn, o), r = a && Y(a);
        r && (p(a, E), p(r, m), p(r, E), L(s, Ge, "true"));
      }
      Fn(this, !0);
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
      const { tab: i, content: c } = Rn(this);
      if (n && ve.set(n, { tab: i, content: c, currentHeight: 0, nextHeight: 0 }), as.relatedTarget = e, y(i) && (b(i, as), !as.defaultPrevented)) {
        p(e, E), L(e, Ge, "true");
        const a = y(i) && Wn(i);
        if (a && f(a, E) && v(a, E), n) {
          const r = () => {
            i && (v(i, E), L(i, Ge, "false")), o && !f(o, E) && p(o, E);
          };
          c && (f(c, R) || s && f(s, R)) ? u.set(n, r, 1) : r();
        }
        c && (v(c, m), f(c, R) ? x(c, () => Bn(this)) : Bn(this));
      }
    }
  }
  /** Removes the `Tab` component from the target element. */
  dispose() {
    Fn(this), super.dispose();
  }
}
h(fe, "selector", kn), h(fe, "init", Kc), h(fe, "getInstance", Vo);
const Q = "toast", Xo = "Toast", Xc = `.${Q}`, Yc = `[${je}="${Q}"]`, Yo = `[${it}="${Q}"]`, _t = "showing", Uo = "hide", Uc = {
  animation: !0,
  autohide: !0,
  delay: 5e3
}, Ms = (t) => j(t, Xo), _c = (t) => new pe(t), jn = $(`show.bs.${Q}`), Zc = $(`shown.bs.${Q}`), zn = $(`hide.bs.${Q}`), qc = $(`hidden.bs.${Q}`), Kn = (t) => {
  const { element: e, options: s } = t;
  v(e, _t), u.clear(e, _t), b(e, Zc), s.autohide && u.set(e, () => t.hide(), s.delay, Q);
}, Vn = (t) => {
  const { element: e } = t;
  v(e, _t), v(e, m), p(e, Uo), u.clear(e, Q), b(e, qc);
}, Gc = (t) => {
  const { element: e, options: s } = t;
  p(e, _t), s.animation ? (Bt(e), x(e, () => Vn(t))) : Vn(t);
}, Qc = (t) => {
  const { element: e, options: s } = t;
  u.set(
    e,
    () => {
      v(e, Uo), Bt(e), p(e, m), p(e, _t), s.animation ? x(e, () => Kn(t)) : Kn(t);
    },
    17,
    _t
  );
}, _o = (t, e) => {
  const s = e ? k : N, { element: n, triggers: o, dismiss: i, options: c, hide: a } = t;
  i && s(i, M, a), c.autohide && [Es, Un, Be, Cs].forEach(
    (r) => s(n, r, ea)
  ), o.length && o.forEach((r) => s(r, M, ta));
}, Jc = (t) => {
  u.clear(t.element, Q), _o(t);
}, ta = (t) => {
  const { target: e } = t, s = e && B(e, Yo), n = s && Y(s), o = n && Ms(n);
  o && (s && s.tagName === "A" && t.preventDefault(), o.relatedTarget = s, o.show());
}, ea = (t) => {
  const e = t.target, s = Ms(e), { type: n, relatedTarget: o } = t;
  s && e !== o && !e.contains(o) && ([Be, Es].includes(n) ? u.clear(e, Q) : u.set(e, () => s.hide(), s.options.delay, Q));
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
      s && !n && (b(s, jn), jn.defaultPrevented || Qc(this));
    });
    /** Hides the toast. */
    h(this, "hide", () => {
      const { element: s, isShown: n } = this;
      s && n && (b(s, zn), zn.defaultPrevented || Gc(this));
    });
    const { element: o, options: i } = this;
    i.animation && !f(o, R) ? p(o, R) : !i.animation && f(o, R) && v(o, R), this.dismiss = P(Yc, o), this.triggers = [...tt(Yo, w(o))].filter(
      (c) => Y(c) === o
    ), _o(this, !0);
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
    return Uc;
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
    n && v(s, m), Jc(this), super.dispose();
  }
}
h(pe, "selector", Xc), h(pe, "init", _c), h(pe, "getInstance", Ms);
const Ls = /* @__PURE__ */ new Map();
[oe, ie, ce, ae, re, le, de, Vt, he, fe, pe, Pt].forEach(
  (t) => Ls.set(t.prototype.name, t)
);
const sa = (t, e) => {
  [...e].forEach((s) => t(s));
}, na = (t, e) => {
  const s = At.getAllFor(t);
  s && [...s].forEach(([n, o]) => {
    e.contains(n) && o.dispose();
  });
}, Xn = (t) => {
  const e = t && t.nodeName ? t : document, s = [...Ps("*", e)];
  Ls.forEach((n) => {
    const { init: o, selector: i } = n;
    sa(
      o,
      s.filter((c) => to(c, i))
    );
  });
}, ca = (t) => {
  const e = t && t.nodeName ? t : document;
  Ls.forEach((s) => {
    na(s.prototype.name, e);
  });
};
document.body ? Xn() : k(document, "DOMContentLoaded", () => Xn(), { once: !0 });
export {
  oe as Alert,
  ie as Button,
  ce as Carousel,
  ae as Collapse,
  re as Dropdown,
  ia as Listener,
  le as Modal,
  de as Offcanvas,
  Vt as Popover,
  he as ScrollSpy,
  fe as Tab,
  pe as Toast,
  Pt as Tooltip,
  Xn as initCallback,
  ca as removeDataAPI
};
//# sourceMappingURL=bootstrap-native.mjs.map
