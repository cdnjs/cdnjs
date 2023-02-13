function Uo(t, e) {
  for (var n = 0; n < e.length; n++) {
    const s = e[n];
    if (typeof s != "string" && !Array.isArray(s)) {
      for (const o in s)
        if (o !== "default" && !(o in t)) {
          const i = Object.getOwnPropertyDescriptor(s, o);
          i && Object.defineProperty(t, o, i.get ? i : {
            enumerable: !0,
            get: () => s[o]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }));
}
var b = {};
(function(t) {
  Object.defineProperty(t, Symbol.toStringTag, { value: "Module" });
  const e = {}, n = (r) => {
    const { type: c, currentTarget: l } = r;
    [...e[c]].forEach(([d, h]) => {
      l === d && [...h].forEach(([g, H]) => {
        g.apply(d, [r]), typeof H == "object" && H.once && o(d, c, g, H);
      });
    });
  }, s = (r, c, l, d) => {
    e[c] || (e[c] = /* @__PURE__ */ new Map());
    const h = e[c];
    h.has(r) || h.set(r, /* @__PURE__ */ new Map());
    const g = h.get(r), { size: H } = g;
    g.set(l, d), H || r.addEventListener(c, n, d);
  }, o = (r, c, l, d) => {
    const h = e[c], g = h && h.get(r), H = g && g.get(l), F = H !== void 0 ? H : d;
    g && g.has(l) && g.delete(l), h && (!g || !g.size) && h.delete(r), (!h || !h.size) && delete e[c], (!g || !g.size) && r.removeEventListener(c, n, F);
  }, i = s, a = o;
  t.addListener = s, t.globalListener = n, t.off = a, t.on = i, t.registry = e, t.removeListener = o;
})(b);
const Qr = /* @__PURE__ */ Uo({
  __proto__: null,
  default: b
}, [b]), Os = "aria-describedby", me = "aria-expanded", Ee = "aria-hidden", Ce = "aria-modal", Cn = "aria-pressed", Fe = "aria-selected", _o = "DOMContentLoaded", ln = "focus", dn = "focusin", Ns = "focusout", He = "keydown", qo = "keyup", N = "click", Go = "mousedown", Qo = "hover", Se = "mouseenter", hn = "mouseleave", Zo = "pointerdown", Jo = "pointermove", ti = "pointerup", Pe = "resize", De = "scroll", fn = "touchstart", ei = "dragstart", Qe = "ArrowDown", Ze = "ArrowUp", Hn = "ArrowLeft", Sn = "ArrowRight", un = "Escape", ni = "transitionDuration", si = "transitionDelay", ze = "transitionend", Ms = "transitionProperty", oi = navigator.userAgentData, ve = oi, { userAgent: ii } = navigator, be = ii, Pn = /iPhone|iPad|iPod|Android/i;
ve ? ve.brands.some((t) => Pn.test(t.brand)) : Pn.test(be);
const Dn = /(iPhone|iPod|iPad)/, ri = ve ? ve.brands.some((t) => Dn.test(t.brand)) : Dn.test(be);
be && be.includes("Firefox");
const { head: Le } = document;
["webkitPerspective", "perspective"].some((t) => t in Le.style);
const ai = (t, e, n, s) => {
  const o = s || !1;
  t.addEventListener(e, n, o);
}, ci = (t, e, n, s) => {
  const o = s || !1;
  t.removeEventListener(e, n, o);
}, li = (t, e, n, s) => {
  const o = (i) => {
    (i.target === t || i.currentTarget === t) && (n.apply(t, [i]), ci(t, e, o, s));
  };
  ai(t, e, o, s);
}, ne = () => {
};
(() => {
  let t = !1;
  try {
    const e = Object.defineProperty({}, "passive", {
      get: () => (t = !0, t)
    });
    li(document, _o, ne, e);
  } catch {
  }
  return t;
})();
["webkitTransform", "transform"].some((t) => t in Le.style);
["webkitAnimation", "animation"].some((t) => t in Le.style);
["webkitTransition", "transition"].some((t) => t in Le.style);
const Nt = (t, e) => t.getAttribute(e), we = (t, e) => t.hasAttribute(e), k = (t, e, n) => t.setAttribute(e, n), It = (t, e) => t.removeAttribute(e), f = (t, ...e) => {
  t.classList.add(...e);
}, v = (t, ...e) => {
  t.classList.remove(...e);
}, u = (t, e) => t.classList.contains(e), re = (t) => t != null && typeof t == "object" || !1, L = (t) => re(t) && typeof t.nodeType == "number" && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].some((e) => t.nodeType === e) || !1, E = (t) => L(t) && t.nodeType === 1 || !1, Zt = /* @__PURE__ */ new Map(), Pt = {
  set: (t, e, n) => {
    E(t) && (Zt.has(e) || Zt.set(e, /* @__PURE__ */ new Map()), Zt.get(e).set(t, n));
  },
  getAllFor: (t) => Zt.get(t) || null,
  get: (t, e) => {
    if (!E(t) || !e)
      return null;
    const n = Pt.getAllFor(e);
    return t && n && n.get(t) || null;
  },
  remove: (t, e) => {
    const n = Pt.getAllFor(e);
    !n || !E(t) || (n.delete(t), n.size === 0 && Zt.delete(e));
  }
}, j = (t, e) => Pt.get(t, e), Dt = (t) => typeof t == "string" || !1, pn = (t) => re(t) && t.constructor.name === "Window" || !1, Bs = (t) => L(t) && t.nodeType === 9 || !1, $ = (t) => pn(t) ? t.document : Bs(t) ? t : L(t) ? t.ownerDocument : window.document, ee = (t) => Object.entries(t), mt = (t) => {
  if (!t)
    return;
  if (Dt(t))
    return $().createElement(t);
  const { tagName: e } = t, n = mt(e);
  if (!n)
    return;
  const s = { ...t };
  return delete s.tagName, ee(s).forEach(([o, i]) => {
    Dt(o) && Dt(i) && k(n, o, i);
  }), n;
}, w = (t, e) => t.dispatchEvent(e), V = (t, e) => {
  const n = getComputedStyle(t), s = e.replace("webkit", "Webkit").replace(/([A-Z])/g, "-$1").toLowerCase();
  return n.getPropertyValue(s);
}, di = (t) => {
  const e = V(t, Ms), n = V(t, si), s = n.includes("ms") ? 1 : 1e3, o = e && e !== "none" ? parseFloat(n) * s : 0;
  return Number.isNaN(o) ? 0 : o;
}, ae = (t) => {
  const e = V(t, Ms), n = V(t, ni), s = n.includes("ms") ? 1 : 1e3, o = e && e !== "none" ? parseFloat(n) * s : 0;
  return Number.isNaN(o) ? 0 : o;
}, M = (t, e) => {
  let n = 0;
  const s = new Event(ze), o = ae(t), i = di(t);
  if (o) {
    const a = (r) => {
      r.target === t && (e.apply(t, [r]), t.removeEventListener(ze, a), n = 1);
    };
    t.addEventListener(ze, a), setTimeout(() => {
      n || w(t, s);
    }, o + i + 17);
  } else
    e.apply(t, [s]);
}, rt = (t, e) => t.focus(e), Ln = (t) => ["true", !0].includes(t) ? !0 : ["false", !1].includes(t) ? !1 : ["null", "", null, void 0].includes(t) ? null : t !== "" && !Number.isNaN(+t) ? +t : t, Kt = (t) => t.toLowerCase(), hi = (t, e, n, s) => {
  const o = { ...n }, i = { ...t.dataset }, a = { ...e }, r = {}, c = "title";
  return ee(i).forEach(([l, d]) => {
    const h = s && typeof l == "string" && l.includes(s) ? l.replace(s, "").replace(/[A-Z]/g, (g) => Kt(g)) : l;
    r[h] = Ln(d);
  }), ee(o).forEach(([l, d]) => {
    o[l] = Ln(d);
  }), ee(e).forEach(([l, d]) => {
    l in o ? a[l] = o[l] : l in r ? a[l] = r[l] : a[l] = l === c ? Nt(t, c) : d;
  }), a;
}, $t = (t, ...e) => Object.assign(t, ...e), Je = (t) => Object.keys(t), fi = (t) => Object.values(t), T = (t, e) => {
  const n = new CustomEvent(t, {
    cancelable: !0,
    bubbles: !0
  });
  return re(e) && $t(n, e), n;
}, tt = { passive: !0 }, Mt = (t) => t.offsetHeight, x = (t, e) => {
  ee(e).forEach(([n, s]) => {
    if (s && Dt(n) && n.includes("--"))
      t.style.setProperty(n, s);
    else {
      const o = {};
      o[n] = s, $t(t.style, o);
    }
  });
}, tn = (t) => re(t) && t.constructor.name === "Map" || !1, ui = (t) => typeof t == "number" || !1, ut = /* @__PURE__ */ new Map(), p = {
  set: (t, e, n, s) => {
    !E(t) || (s && s.length ? (ut.has(t) || ut.set(t, /* @__PURE__ */ new Map()), ut.get(t).set(s, setTimeout(e, n))) : ut.set(t, setTimeout(e, n)));
  },
  get: (t, e) => {
    if (!E(t))
      return null;
    const n = ut.get(t);
    return e && n && tn(n) ? n.get(e) || null : ui(n) ? n : null;
  },
  clear: (t, e) => {
    if (!E(t))
      return;
    const n = ut.get(t);
    e && e.length && tn(n) ? (clearTimeout(n.get(e)), n.delete(e), n.size === 0 && ut.delete(t)) : (clearTimeout(n), ut.delete(t));
  }
}, ce = (t, e) => {
  const { width: n, height: s, top: o, right: i, bottom: a, left: r } = t.getBoundingClientRect();
  let c = 1, l = 1;
  if (e && E(t)) {
    const { offsetWidth: d, offsetHeight: h } = t;
    c = d > 0 ? Math.round(n) / d : 1, l = h > 0 ? Math.round(s) / h : 1;
  }
  return {
    width: n / c,
    height: s / l,
    top: o / l,
    right: i / c,
    bottom: a / l,
    left: r / c,
    x: r / c,
    y: o / l
  };
}, yt = (t) => $(t).body, at = (t) => $(t).documentElement, Rs = (t) => L(t) && t.constructor.name === "ShadowRoot" || !1, pi = (t) => t.nodeName === "HTML" ? t : E(t) && t.assignedSlot || L(t) && t.parentNode || Rs(t) && t.host || at(t);
let xn = 0, An = 0;
const Ft = /* @__PURE__ */ new Map(), Ws = (t, e) => {
  let n = e ? xn : An;
  if (e) {
    const s = Ws(t), o = Ft.get(s) || /* @__PURE__ */ new Map();
    Ft.has(s) || Ft.set(s, o), tn(o) && !o.has(e) ? (o.set(e, n), xn += 1) : n = o.get(e);
  } else {
    const s = t.id || t;
    Ft.has(s) ? n = Ft.get(s) : (Ft.set(s, n), An += 1);
  }
  return n;
}, Yt = (t) => {
  var e;
  return t ? Bs(t) ? t.defaultView : L(t) ? (e = t?.ownerDocument) == null ? void 0 : e.defaultView : t : window;
}, gi = (t) => Array.isArray(t) || !1, js = (t) => {
  if (!L(t))
    return !1;
  const { top: e, bottom: n } = ce(t), { clientHeight: s } = at(t);
  return e <= s && n >= 0;
}, xe = (t) => typeof t == "function" || !1, mi = (t) => re(t) && t.constructor.name === "NodeList" || !1, Tt = (t) => at(t).dir === "rtl", vi = (t) => L(t) && ["TABLE", "TD", "TH"].includes(t.nodeName) || !1, I = (t, e) => t ? t.closest(e) || I(t.getRootNode().host, e) : null, D = (t, e) => E(t) ? t : (L(e) ? e : $()).querySelector(t), gn = (t, e) => (L(e) ? e : $()).getElementsByTagName(t), Z = (t, e) => (L(e) ? e : $()).querySelectorAll(t), vt = (t, e) => (e && L(e) ? e : $()).getElementsByClassName(
  t
), bi = (t, e) => t.matches(e), B = "fade", m = "show", Ae = "data-bs-dismiss", Ie = "alert", Fs = "Alert", wi = "5.0.0-alpha1", $i = wi;
class et {
  element;
  options;
  /**
   * @param target `HTMLElement` or selector string
   * @param config component instance options
   */
  constructor(e, n) {
    const s = D(e);
    if (!s)
      throw Dt(e) ? Error(`${this.name} Error: "${e}" is not a valid selector.`) : Error(`${this.name} Error: your target is not an instance of HTMLElement.`);
    const o = Pt.get(s, this.name);
    o && o.dispose(), this.element = s, this.defaults && Je(this.defaults).length && (this.options = hi(s, this.defaults, n || {}, "bs")), Pt.set(s, this.name, this);
  }
  /* istanbul ignore next */
  get version() {
    return $i;
  }
  /* istanbul ignore next */
  get name() {
    return "BaseComponent";
  }
  /* istanbul ignore next */
  get defaults() {
    return {};
  }
  /**
   * Removes component from target element;
   */
  dispose() {
    Pt.remove(this.element, this.name), Je(this).forEach((e) => {
      delete this[e];
    });
  }
}
const In = `.${Ie}`, Ti = `[${Ae}="${Ie}"]`, kn = (t) => j(t, Fs), yi = (t) => new zs(t), On = T(`close.bs.${Ie}`), Ei = T(`closed.bs.${Ie}`), Nn = (t) => {
  const { element: e } = t;
  en(t), w(e, Ei), t.dispose(), e.remove();
}, en = (t, e) => {
  const n = e ? b.addListener : b.removeListener, { dismiss: s } = t;
  s && n(s, N, t.close);
};
class zs extends et {
  static selector = In;
  static init = yi;
  static getInstance = kn;
  dismiss;
  constructor(e) {
    super(e), this.dismiss = D(Ti, this.element), en(this, !0);
  }
  /** Returns component name string. */
  get name() {
    return Fs;
  }
  // ALERT PUBLIC METHODS
  // ====================
  /**
   * Public method that hides the `.alert` element from the user,
   * disposes the instance once animation is complete, then
   * removes the element from the DOM.
   *
   * @param e the `click` event
   */
  close(e) {
    const n = e ? kn(I(e.target, In)) : this, { element: s } = n;
    if (s && u(s, m)) {
      if (w(s, On), On.defaultPrevented)
        return;
      v(s, m), u(s, B) ? M(s, () => Nn(n)) : Nn(n);
    }
  }
  /** Remove the component from target element. */
  dispose() {
    en(this), super.dispose();
  }
}
const C = "active", U = "data-bs-toggle", Ci = "button", Ks = "Button", Hi = `[${U}="${Ci}"]`, Mn = (t) => j(t, Ks), Si = (t) => new Vs(t), Bn = (t, e) => {
  (e ? b.addListener : b.removeListener)(t.element, N, t.toggle);
};
class Vs extends et {
  static selector = Hi;
  static init = Si;
  static getInstance = Mn;
  isActive = !1;
  /**
   * @param target usually a `.btn` element
   */
  constructor(e) {
    super(e);
    const { element: n } = this;
    this.isActive = u(n, C), k(n, Cn, String(!!this.isActive)), Bn(this, !0);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return Ks;
  }
  // BUTTON PUBLIC METHODS
  // =====================
  /**
   * Toggles the state of the target button.
   *
   * @param e usually `click` Event object
   */
  toggle(e) {
    e && e.preventDefault();
    const n = e ? Mn(e.target) : this;
    if (!n.element)
      return;
    const { element: s, isActive: o } = n;
    if (u(s, "disabled"))
      return;
    (o ? v : f)(s, C), k(s, Cn, o ? "false" : "true"), n.isActive = u(s, C);
  }
  /** Removes the `Button` component from the target element. */
  dispose() {
    Bn(this), super.dispose();
  }
}
const nn = "data-bs-target", Lt = "carousel", Xs = "Carousel", Rn = "data-bs-parent", Pi = "data-bs-container", W = (t) => {
  const e = [nn, Rn, Pi, "href"], n = $(t);
  return e.map((s) => {
    const o = Nt(t, s);
    return o ? s === Rn ? I(t, o) : D(o, n) : null;
  }).filter((s) => s)[0];
}, le = `[data-bs-ride="${Lt}"]`, Q = `${Lt}-item`, sn = "data-bs-slide-to", gt = "data-bs-slide", bt = "paused", Wn = {
  pause: "hover",
  keyboard: !1,
  touch: !0,
  interval: 5e3
}, st = (t) => j(t, Xs), Di = (t) => new Us(t);
let Ht = 0, zt = 0, Jt = 0;
const Ke = T(`slide.bs.${Lt}`), on = T(`slid.bs.${Lt}`), Li = (t) => {
  const { index: e, direction: n, element: s, slides: o, options: i } = t;
  if (t.isAnimating && st(s)) {
    const a = rn(t), r = n === "left" ? "next" : "prev", c = n === "left" ? "start" : "end";
    f(o[e], C), v(o[e], `${Q}-${r}`), v(o[e], `${Q}-${c}`), v(o[a], C), v(o[a], `${Q}-${c}`), w(s, on), p.clear(s, gt), !$(s).hidden && i.interval && !t.isPaused && t.cycle();
  }
};
function xi() {
  const t = st(this);
  t && !t.isPaused && !p.get(this, bt) && f(this, bt);
}
function Ai() {
  const t = st(this);
  t && t.isPaused && !p.get(this, bt) && t.cycle();
}
function Ii(t) {
  t.preventDefault();
  const e = I(this, le) || W(this), n = st(e);
  if (!n || n.isAnimating)
    return;
  const s = +(Nt(this, sn) || /* istanbul ignore next */
  0);
  this && !u(this, C) && // event target is not active
  !Number.isNaN(s) && n.to(s);
}
function ki(t) {
  t.preventDefault();
  const e = I(this, le) || W(this), n = st(e);
  if (!n || n.isAnimating)
    return;
  const s = Nt(this, gt);
  s === "next" ? n.next() : s === "prev" && n.prev();
}
const Oi = ({ code: t, target: e }) => {
  const n = $(e), [s] = [...Z(le, n)].filter((c) => js(c)), o = st(s);
  if (!o || o.isAnimating || /textarea|input/i.test(e.nodeName))
    return;
  const i = Tt(s);
  t === (i ? Sn : Hn) ? o.prev() : t === (i ? Hn : Sn) && o.next();
};
function jn(t) {
  const { target: e } = t, n = st(this);
  n && n.isTouch && (n.indicator && !n.indicator.contains(e) || !n.controls.includes(e)) && (t.stopImmediatePropagation(), t.stopPropagation(), t.preventDefault());
}
function Ni(t) {
  const { target: e } = t, n = st(this);
  if (!n || n.isAnimating || n.isTouch)
    return;
  const { controls: s, indicators: o } = n;
  [...s, ...o].some((i) => i === e || i.contains(e)) || (Ht = t.pageX, this.contains(e) && (n.isTouch = !0, Ys(n, !0)));
}
const Mi = (t) => {
  zt = t.pageX;
}, Bi = (t) => {
  const { target: e } = t, n = $(e), s = [...Z(le, n)].map((r) => st(r)).find((r) => r.isTouch);
  if (!s)
    return;
  const { element: o, index: i } = s, a = Tt(o);
  if (s.isTouch = !1, Ys(s), n.getSelection()?.toString().length) {
    Ht = 0, zt = 0, Jt = 0;
    return;
  }
  if (Jt = t.pageX, !o.contains(e) || Math.abs(Ht - Jt) < 120) {
    Ht = 0, zt = 0, Jt = 0;
    return;
  }
  zt < Ht ? s.to(i + (a ? -1 : 1)) : zt > Ht && s.to(i + (a ? 1 : -1)), Ht = 0, zt = 0, Jt = 0;
}, Ve = (t, e) => {
  const { indicators: n } = t;
  [...n].forEach((s) => v(s, C)), t.indicators[e] && f(n[e], C);
}, Ys = (t, e) => {
  const { element: n } = t, s = e ? b.addListener : b.removeListener;
  s($(n), Jo, Mi, tt), s($(n), ti, Bi, tt);
}, Fn = (t, e) => {
  const { element: n, options: s, slides: o, controls: i, indicators: a } = t, { touch: r, pause: c, interval: l, keyboard: d } = s, h = e ? b.addListener : b.removeListener;
  c && l && (h(n, Se, xi), h(n, hn, Ai)), r && o.length > 2 && (h(n, Zo, Ni, tt), h(n, fn, jn, { passive: !1 }), h(n, ei, jn, { passive: !1 })), i.length && i.forEach((g) => {
    g && h(g, N, ki);
  }), a.length && a.forEach((g) => {
    h(g, N, Ii);
  }), d && h($(n), He, Oi);
}, rn = (t) => {
  const { slides: e, element: n } = t, s = D(`.${Q}.${C}`, n);
  return E(s) ? [...e].indexOf(s) : -1;
};
class Us extends et {
  static selector = le;
  static init = Di;
  static getInstance = st;
  /**
   * @param target mostly a `.carousel` element
   * @param config instance options
   */
  constructor(e, n) {
    super(e, n);
    const { element: s } = this;
    this.direction = Tt(s) ? "right" : "left", this.index = 0, this.isTouch = !1, this.slides = vt(Q, s);
    const { slides: o } = this;
    if (o.length < 2)
      return;
    const i = $(s);
    this.controls = [
      ...Z(`[${gt}]`, s),
      ...Z(`[${gt}][${nn}="#${s.id}"]`, i)
    ], this.indicator = D(`.${Lt}-indicators`, s), this.indicators = [
      ...this.indicator ? Z(`[${sn}]`, this.indicator) : [],
      ...Z(`[${sn}][${nn}="#${s.id}"]`, i)
    ];
    const { options: a } = this;
    this.options.interval = a.interval === !0 ? Wn.interval : a.interval, rn(this) < 0 && (f(o[0], C), this.indicators.length && Ve(this, 0)), Fn(this, !0), a.interval && this.cycle();
  }
  /**
   * Returns component name string.
   */
  get name() {
    return Xs;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return Wn;
  }
  /**
   * Check if instance is paused.
   */
  get isPaused() {
    return u(this.element, bt);
  }
  /**
   * Check if instance is animating.
   */
  get isAnimating() {
    return D(`.${Q}-next,.${Q}-prev`, this.element) !== null;
  }
  // CAROUSEL PUBLIC METHODS
  // =======================
  /** Slide automatically through items. */
  cycle() {
    const { element: e, options: n, isPaused: s, index: o } = this;
    p.clear(e, Lt), s && (p.clear(e, bt), v(e, bt)), p.set(
      e,
      () => {
        this.element && !this.isPaused && !this.isTouch && js(e) && this.to(o + 1);
      },
      n.interval,
      Lt
    );
  }
  /** Pause the automatic cycle. */
  pause() {
    const { element: e, options: n } = this;
    !this.isPaused && n.interval && (f(e, bt), p.set(
      e,
      () => {
      },
      1,
      bt
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
    const { element: n, slides: s, options: o } = this, i = rn(this), a = Tt(n);
    let r = e;
    if (this.isAnimating || i === r || p.get(n, gt))
      return;
    i < r || i === 0 && r === s.length - 1 ? this.direction = a ? "right" : "left" : (i > r || i === s.length - 1 && r === 0) && (this.direction = a ? "left" : "right");
    const { direction: c } = this;
    r < 0 ? r = s.length - 1 : r >= s.length && (r = 0);
    const l = c === "left" ? "next" : "prev", d = c === "left" ? "start" : "end", h = {
      relatedTarget: s[r],
      from: i,
      to: r,
      direction: c
    };
    $t(Ke, h), $t(on, h), w(n, Ke), !Ke.defaultPrevented && (this.index = r, Ve(this, r), ae(s[r]) && u(n, "slide") ? p.set(
      n,
      () => {
        f(s[r], `${Q}-${l}`), Mt(s[r]), f(s[r], `${Q}-${d}`), f(s[i], `${Q}-${d}`), M(s[r], () => Li(this));
      },
      0,
      gt
    ) : (f(s[r], C), v(s[i], C), p.set(
      n,
      () => {
        p.clear(n, gt), n && o.interval && !this.isPaused && this.cycle(), w(n, on);
      },
      0,
      gt
    )));
  }
  /** Remove `Carousel` component from target. */
  dispose() {
    const { slides: e } = this, n = ["start", "end", "prev", "next"];
    [...e].forEach((s, o) => {
      u(s, C) && Ve(this, o), n.forEach((i) => v(s, `${Q}-${i}`));
    }), Fn(this), super.dispose();
  }
}
const kt = "collapsing", X = "collapse", _s = "Collapse", Ri = `.${X}`, qs = `[${U}="${X}"]`, Wi = { parent: null }, ue = (t) => j(t, _s), ji = (t) => new Gs(t), zn = T(`show.bs.${X}`), Fi = T(`shown.bs.${X}`), Kn = T(`hide.bs.${X}`), zi = T(`hidden.bs.${X}`), Ki = (t) => {
  const { element: e, parent: n, triggers: s } = t;
  w(e, zn), !zn.defaultPrevented && (p.set(e, ne, 17), n && p.set(n, ne, 17), f(e, kt), v(e, X), x(e, { height: `${e.scrollHeight}px` }), M(e, () => {
    p.clear(e), n && p.clear(n), s.forEach((o) => k(o, me, "true")), v(e, kt), f(e, X), f(e, m), x(e, { height: "" }), w(e, Fi);
  }));
}, Vn = (t) => {
  const { element: e, parent: n, triggers: s } = t;
  w(e, Kn), !Kn.defaultPrevented && (p.set(e, ne, 17), n && p.set(n, ne, 17), x(e, { height: `${e.scrollHeight}px` }), v(e, X), v(e, m), f(e, kt), Mt(e), x(e, { height: "0px" }), M(e, () => {
    p.clear(e), n && p.clear(n), s.forEach((o) => k(o, me, "false")), v(e, kt), f(e, X), x(e, { height: "" }), w(e, zi);
  }));
}, Xn = (t, e) => {
  const n = e ? b.addListener : b.removeListener, { triggers: s } = t;
  s.length && s.forEach((o) => n(o, N, Vi));
}, Vi = (t) => {
  const { target: e } = t, n = e && I(e, qs), s = n && W(n), o = s && ue(s);
  o && o.toggle(), n && n.tagName === "A" && t.preventDefault();
};
class Gs extends et {
  static selector = Ri;
  static init = ji;
  static getInstance = ue;
  /**
   * @param target and `Element` that matches the selector
   * @param config instance options
   */
  constructor(e, n) {
    super(e, n);
    const { element: s, options: o } = this, i = $(s);
    this.triggers = [...Z(qs, i)].filter((a) => W(a) === s), this.parent = D(o.parent, i) || W(s) || null, this.parent = W(s) || null, Xn(this, !0);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return _s;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return Wi;
  }
  // COLLAPSE PUBLIC METHODS
  // =======================
  /** Toggles the visibility of the collapse. */
  toggle() {
    u(this.element, m) ? this.hide() : this.show();
  }
  /** Hides the collapse. */
  hide() {
    const { triggers: e, element: n } = this;
    p.get(n) || (Vn(this), e.length && e.forEach((s) => f(s, `${X}d`)));
  }
  /** Shows the collapse. */
  show() {
    const { element: e, parent: n, triggers: s } = this;
    let o, i;
    n && (o = [...Z(`.${X}.${m}`, n)].find(
      (a) => ue(a)
    ), i = o && ue(o)), (!n || !p.get(n)) && !p.get(e) && (i && o !== e && (Vn(i), i.triggers.forEach((a) => {
      f(a, `${X}d`);
    })), Ki(this), s.length && s.forEach((a) => v(a, `${X}d`)));
  }
  /** Remove the `Collapse` component from the target `Element`. */
  dispose() {
    Xn(this), super.dispose();
  }
}
const Ot = ["dropdown", "dropup", "dropstart", "dropend"], Qs = "Dropdown", Zs = "dropdown-menu", Js = (t) => {
  const e = I(t, "A");
  return t.tagName === "A" && // anchor href starts with #
  we(t, "href") && t.href.slice(-1) === "#" || // OR a child of an anchor with href starts with #
  e && we(e, "href") && e.href.slice(-1) === "#";
}, [J, $e, Te, ye] = Ot, mn = `[${U}="${J}"],[${U}="${$e}"],[${U}="${ye}"],[${U}="${Te}"]`, Vt = (t) => j(t, Qs), Xi = (t) => new no(t), Yi = `${Zs}-end`, Yn = [J, $e], Un = [Te, ye], _n = ["A", "BUTTON"], Ui = {
  offset: 5,
  // [number] 5(px)
  display: "dynamic"
  // [dynamic|static]
}, Xe = T(`show.bs.${J}`), qn = T(`shown.bs.${J}`), Ye = T(`hide.bs.${J}`), Gn = T(`hidden.bs.${J}`), to = T(`updated.bs.${J}`), eo = (t) => {
  const { element: e, menu: n, parentElement: s, options: o } = t, { offset: i } = o;
  if (V(n, "position") === "static")
    return;
  const a = Tt(e), r = u(n, Yi);
  ["margin", "top", "bottom", "left", "right"].forEach((O) => {
    const dt = {};
    dt[O] = "", x(n, dt);
  });
  let l = Ot.find((O) => u(s, O)) || /* istanbul ignore next: fallback position */
  J;
  const d = {
    dropdown: [i, 0, 0],
    dropup: [0, 0, i],
    dropstart: a ? [-1, 0, 0, i] : [-1, i, 0],
    dropend: a ? [-1, i, 0] : [-1, 0, 0, i]
  }, h = {
    dropdown: { top: "100%" },
    dropup: { top: "auto", bottom: "100%" },
    dropstart: a ? { left: "100%", right: "auto" } : { left: "auto", right: "100%" },
    dropend: a ? { left: "auto", right: "100%" } : { left: "100%", right: "auto" },
    menuStart: a ? { right: "0", left: "auto" } : { right: "auto", left: "0" },
    menuEnd: a ? { right: "auto", left: "0" } : { right: "0", left: "auto" }
  }, { offsetWidth: g, offsetHeight: H } = n, { clientWidth: F, clientHeight: y } = at(e), { left: z, top: Y, width: Rt, height: ot } = ce(e), P = z - g - i < 0, ct = z + g + Rt + i >= F, nt = Y + H + i >= y, R = Y + H + ot + i >= y, K = Y - H - i < 0, S = (!a && r || a && !r) && z + Rt - g < 0, Wt = (a && r || !a && !r) && z + g >= F;
  if (Un.includes(l) && P && ct && (l = J), l === Te && (a ? ct : P) && (l = ye), l === ye && (a ? P : ct) && (l = Te), l === $e && K && !R && (l = J), l === J && R && !K && (l = $e), Un.includes(l) && nt && $t(h[l], {
    top: "auto",
    bottom: 0
  }), Yn.includes(l) && (S || Wt)) {
    let O = { left: "auto", right: "auto" };
    !S && Wt && !a && (O = { left: "auto", right: 0 }), S && !Wt && a && (O = { left: 0, right: "auto" }), O && $t(h[l], O);
  }
  const lt = d[l];
  x(n, {
    ...h[l],
    margin: `${lt.map((O) => O && `${O}px`).join(" ")}`
  }), Yn.includes(l) && r && r && x(n, h[!a && S || a && Wt ? "menuStart" : (
    /* istanbul ignore next */
    "menuEnd"
  )]), w(s, to);
}, _i = (t) => [...t.children].map((e) => {
  if (e && _n.includes(e.tagName))
    return e;
  const { firstElementChild: n } = e;
  return n && _n.includes(n.tagName) ? n : null;
}).filter((e) => e), Qn = (t) => {
  const { element: e, options: n } = t, s = t.open ? b.addListener : b.removeListener, o = $(e);
  s(o, N, Jn), s(o, ln, Jn), s(o, He, Gi), s(o, qo, Qi), n.display === "dynamic" && [De, Pe].forEach((i) => {
    s(Yt(e), i, Zi, tt);
  });
}, Zn = (t, e) => {
  (e ? b.addListener : b.removeListener)(t.element, N, qi);
}, ke = (t) => {
  const e = [...Ot, "btn-group", "input-group"].map((n) => vt(`${n} ${m}`, $(t))).find((n) => n.length);
  if (e && e.length)
    return [...e[0].children].find(
      (n) => Ot.some((s) => s === Nt(n, U))
    );
}, Jn = (t) => {
  const { target: e, type: n } = t;
  if (!e || !e.closest)
    return;
  const s = ke(e), o = s && Vt(s);
  if (!o)
    return;
  const { parentElement: i, menu: a } = o, r = I(e, mn) !== null, c = i && i.contains(e) && (e.tagName === "form" || I(e, "form") !== null);
  n === N && Js(e) && t.preventDefault(), !(n === ln && (e === s || e === a || a.contains(e))) && (c || r || o && o.hide());
}, qi = (t) => {
  const { target: e } = t, n = e && I(e, mn), s = n && Vt(n);
  s && (t.stopImmediatePropagation(), s.toggle(), n && Js(n) && t.preventDefault());
}, Gi = (t) => {
  [Qe, Ze].includes(t.code) && t.preventDefault();
};
function Qi(t) {
  const { code: e } = t, n = ke(this), s = n && Vt(n), { activeElement: o } = n && $(n);
  if (!s || !o)
    return;
  const { menu: i, open: a } = s, r = _i(i);
  if (r && r.length && [Qe, Ze].includes(e)) {
    let c = r.indexOf(o);
    o === n ? c = 0 : e === Ze ? c = c > 1 ? c - 1 : 0 : e === Qe && (c = c < r.length - 1 ? c + 1 : c), r[c] && rt(r[c]);
  }
  un === e && a && (s.toggle(), rt(n));
}
function Zi() {
  const t = ke(this), e = t && Vt(t);
  e && e.open && eo(e);
}
class no extends et {
  static selector = mn;
  static init = Xi;
  static getInstance = Vt;
  /**
   * @param target Element or string selector
   * @param config the instance options
   */
  constructor(e, n) {
    super(e, n);
    const { parentElement: s } = this.element;
    this.parentElement = s, this.menu = D(`.${Zs}`, s), Zn(this, !0);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return Qs;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return Ui;
  }
  // DROPDOWN PUBLIC METHODS
  // =======================
  /** Shows/hides the dropdown menu to the user. */
  toggle() {
    this.open ? this.hide() : this.show();
  }
  /** Shows the dropdown menu to the user. */
  show() {
    const { element: e, open: n, menu: s, parentElement: o } = this;
    if (n)
      return;
    const i = ke(e), a = i && Vt(i);
    a && a.hide(), [Xe, qn, to].forEach((r) => {
      r.relatedTarget = e;
    }), w(o, Xe), !Xe.defaultPrevented && (f(s, m), f(o, m), k(e, me, "true"), eo(this), this.open = !n, rt(e), Qn(this), w(o, qn));
  }
  /** Hides the dropdown menu from the user. */
  hide() {
    const { element: e, open: n, menu: s, parentElement: o } = this;
    n && ([Ye, Gn].forEach((i) => {
      i.relatedTarget = e;
    }), w(o, Ye), !Ye.defaultPrevented && (v(s, m), v(o, m), k(e, me, "false"), this.open = !n, Qn(this), w(o, Gn)));
  }
  /** Removes the `Dropdown` component from the target element. */
  dispose() {
    this.open && this.hide(), Zn(this), super.dispose();
  }
}
const _ = "modal", vn = "Modal", bn = "Offcanvas", Ji = "fixed-top", tr = "fixed-bottom", so = "sticky-top", oo = "position-sticky", io = (t) => [
  ...vt(Ji, t),
  ...vt(tr, t),
  ...vt(so, t),
  ...vt(oo, t),
  ...vt("is-fixed", t)
], er = (t) => {
  const e = yt(t);
  x(e, {
    paddingRight: "",
    overflow: ""
  });
  const n = io(e);
  n.length && n.forEach((s) => {
    x(s, {
      paddingRight: "",
      marginRight: ""
    });
  });
}, ro = (t) => {
  const { clientWidth: e } = at(t), { innerWidth: n } = Yt(t);
  return Math.abs(n - e);
}, ao = (t, e) => {
  const n = yt(t), s = parseInt(V(n, "paddingRight"), 10), i = V(n, "overflow") === "hidden" && s ? 0 : ro(t), a = io(n);
  e && (x(n, {
    overflow: "hidden",
    paddingRight: `${s + i}px`
  }), a.length && a.forEach((r) => {
    const c = V(r, "paddingRight");
    if (r.style.paddingRight = `${parseInt(c, 10) + i}px`, [so, oo].some((l) => u(r, l))) {
      const l = V(r, "marginRight");
      r.style.marginRight = `${parseInt(l, 10) - i}px`;
    }
  }));
}, q = "offcanvas", wt = mt({ tagName: "div" }), co = (t, e) => {
  const n = L(e) && e.nodeName === "BODY", s = L(e) && !n ? e : wt, o = n ? e : yt(t);
  L(t) && (s === wt && o.append(wt), s.append(t));
}, lo = (t, e) => {
  const n = L(e) && e.nodeName === "BODY", s = L(e) && !n ? e : wt;
  L(t) && (t.remove(), s === wt && !wt.children.length && wt.remove());
}, St = (t, e) => {
  const n = L(e) && e.nodeName !== "BODY" ? e : wt;
  return L(t) && n.contains(t);
}, ho = "backdrop", ts = `${_}-${ho}`, es = `${q}-${ho}`, fo = `.${_}.${m}`, wn = `.${q}.${m}`, A = mt("div"), Bt = (t) => D(`${fo},${wn}`, $(t)), $n = (t) => {
  const e = t ? ts : es;
  [ts, es].forEach((n) => {
    v(A, n);
  }), f(A, e);
}, uo = (t, e, n) => {
  $n(n), co(A, yt(t)), e && f(A, B);
}, po = () => {
  u(A, m) || (f(A, m), Mt(A));
}, Oe = () => {
  v(A, m);
}, go = (t) => {
  Bt(t) || (v(A, B), lo(A, yt(t)), er(t));
}, mo = (t) => E(t) && V(t, "visibility") !== "hidden" && t.offsetParent !== null, nr = `.${_}`, vo = `[${U}="${_}"]`, sr = `[${Ae}="${_}"]`, bo = `${_}-static`, or = {
  backdrop: !0,
  keyboard: !0
}, se = (t) => j(t, vn), ir = (t) => new To(t), pe = T(`show.bs.${_}`), ns = T(`shown.bs.${_}`), Ue = T(`hide.bs.${_}`), ss = T(`hidden.bs.${_}`), wo = (t) => {
  const { element: e } = t, n = ro(e), { clientHeight: s, scrollHeight: o } = at(e), { clientHeight: i, scrollHeight: a } = e, r = i !== a;
  if (!r && n) {
    const c = Tt(e) ? (
      /* istanbul ignore next */
      "paddingLeft"
    ) : "paddingRight", l = {};
    l[c] = `${n}px`, x(e, l);
  }
  ao(e, r || s !== o);
}, $o = (t, e) => {
  const n = e ? b.addListener : b.removeListener, { element: s } = t;
  n(s, N, cr), n(Yt(s), Pe, t.update, tt), n($(s), He, ar);
}, os = (t, e) => {
  const n = e ? b.addListener : b.removeListener, { triggers: s } = t;
  s.length && s.forEach((o) => n(o, N, rr));
}, is = (t, e) => {
  const { triggers: n, element: s, relatedTarget: o } = t;
  go(s), x(s, { paddingRight: "", display: "" }), $o(t);
  const i = pe.relatedTarget || n.find(mo);
  i && rt(i), xe(e) && e(), ss.relatedTarget = o, w(s, ss);
}, rs = (t) => {
  const { element: e, relatedTarget: n } = t;
  rt(e), $o(t, !0), ns.relatedTarget = n, w(e, ns);
}, as = (t) => {
  const { element: e, hasFade: n } = t;
  x(e, { display: "block" }), wo(t), Bt(e) || x(yt(e), { overflow: "hidden" }), f(e, m), It(e, Ee), k(e, Ce, "true"), n ? M(e, () => rs(t)) : rs(t);
}, cs = (t, e) => {
  const { element: n, options: s, hasFade: o } = t;
  s.backdrop && !e && o && u(A, m) && !Bt(n) ? (Oe(), M(A, () => is(t))) : is(t, e);
}, rr = (t) => {
  const { target: e } = t, n = e && I(e, vo), s = n && W(n), o = s && se(s);
  o && (n && n.tagName === "A" && t.preventDefault(), o.relatedTarget = n, o.toggle());
}, ar = ({ code: t, target: e }) => {
  const n = D(fo, $(e)), s = n && se(n);
  if (!s)
    return;
  const { options: o } = s;
  o.keyboard && t === un && // the keyboard option is enabled and the key is 27
  u(n, m) && (s.relatedTarget = null, s.hide());
};
function cr(t) {
  const e = se(this);
  if (!e || p.get(this))
    return;
  const { options: n, isStatic: s, modalDialog: o } = e, { backdrop: i } = n, { target: a } = t, r = $(this)?.getSelection()?.toString().length, c = o?.contains(a), l = a && I(a, sr);
  s && !c ? p.set(
    this,
    () => {
      f(this, bo), M(o, () => lr(e));
    },
    17
  ) : (l || !r && !s && !c && i) && (e.relatedTarget = l || null, e.hide(), t.preventDefault());
}
const lr = (t) => {
  const { element: e, modalDialog: n } = t, s = (E(n) ? ae(n) : (
    /* istanbul ignore next */
    0
  )) + 17;
  v(e, bo), p.set(e, () => p.clear(e), s);
};
class To extends et {
  static selector = nr;
  static init = ir;
  static getInstance = se;
  /**
   * @param target usually the `.modal` element
   * @param config instance options
   */
  constructor(e, n) {
    super(e, n);
    const { element: s } = this;
    this.modalDialog = D(`.${_}-dialog`, s), this.triggers = [...Z(vo, $(s))].filter(
      (o) => W(o) === s
    ), this.isStatic = this.options.backdrop === "static", this.hasFade = u(s, B), this.relatedTarget = null, os(this, !0), this.update = this.update.bind(this);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return vn;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return or;
  }
  // MODAL PUBLIC METHODS
  // ====================
  /** Toggles the visibility of the modal. */
  toggle() {
    u(this.element, m) ? this.hide() : this.show();
  }
  /** Shows the modal to the user. */
  show() {
    const { element: e, options: n, hasFade: s, relatedTarget: o } = this, { backdrop: i } = n;
    let a = 0;
    if (u(e, m) || (pe.relatedTarget = o || void 0, w(e, pe), pe.defaultPrevented))
      return;
    const r = Bt(e);
    if (r && r !== e) {
      const c = se(r) || /* istanbul ignore next */
      j(r, bn);
      c && c.hide();
    }
    i ? (St(A) ? $n(!0) : uo(e, s, !0), a = ae(A), po(), setTimeout(() => as(this), a)) : (as(this), r && u(A, m) && Oe());
  }
  /**
   * Hide the modal from the user.
   *
   * @param callback when defined it will skip animation
   */
  hide(e) {
    const { element: n, hasFade: s, relatedTarget: o } = this;
    u(n, m) && (Ue.relatedTarget = o || void 0, w(n, Ue), !Ue.defaultPrevented && (v(n, m), k(n, Ee, "true"), It(n, Ce), s ? M(n, () => cs(this, e)) : cs(this, e)));
  }
  /**
   * Updates the modal layout.
   */
  update() {
    u(this.element, m) && wo(this);
  }
  /** Removes the `Modal` component from target element. */
  dispose() {
    os(this), this.hide(() => super.dispose());
  }
}
const dr = `.${q}`, Tn = `[${U}="${q}"]`, hr = `[${Ae}="${q}"]`, Ne = `${q}-toggling`, fr = {
  backdrop: !0,
  // boolean
  keyboard: !0,
  // boolean
  scroll: !1
  // boolean
}, oe = (t) => j(t, bn), ur = (t) => new Ho(t), ge = T(`show.bs.${q}`), yo = T(`shown.bs.${q}`), _e = T(`hide.bs.${q}`), Eo = T(`hidden.bs.${q}`), pr = (t) => {
  const { element: e } = t, { clientHeight: n, scrollHeight: s } = at(e);
  ao(e, n !== s);
}, ls = (t, e) => {
  const n = e ? b.addListener : b.removeListener;
  t.triggers.forEach((s) => n(s, N, gr));
}, Co = (t, e) => {
  const n = e ? b.addListener : b.removeListener, s = $(t.element);
  n(s, He, vr), n(s, N, mr);
}, ds = (t) => {
  const { element: e, options: n } = t;
  n.scroll || (pr(t), x(yt(e), { overflow: "hidden" })), f(e, Ne), f(e, m), x(e, { visibility: "visible" }), M(e, () => br(t));
}, hs = (t, e) => {
  const { element: n, options: s } = t, o = Bt(n);
  n.blur(), !o && s.backdrop && u(A, m) ? (Oe(), M(A, () => fs(t, e))) : fs(t, e);
}, gr = (t) => {
  const e = I(t.target, Tn), n = e && W(e), s = n && oe(n);
  s && (s.relatedTarget = e, s.toggle(), e && e.tagName === "A" && t.preventDefault());
}, mr = (t) => {
  const { target: e } = t, n = D(wn, $(e)), s = D(hr, n), o = n && oe(n);
  if (!o)
    return;
  const { options: i, triggers: a } = o, { backdrop: r } = i, c = I(e, Tn), l = $(n).getSelection();
  A.contains(e) && r === "static" || (!(l && l.toString().length) && (!n.contains(e) && r && /* istanbul ignore next */
  (!c || a.includes(e)) || s && s.contains(e)) && (o.relatedTarget = s && s.contains(e) ? s : null, o.hide()), c && c.tagName === "A" && t.preventDefault());
}, vr = ({ code: t, target: e }) => {
  const n = D(wn, $(e)), s = n && oe(n);
  s && s.options.keyboard && t === un && (s.relatedTarget = null, s.hide());
}, br = (t) => {
  const { element: e } = t;
  v(e, Ne), It(e, Ee), k(e, Ce, "true"), k(e, "role", "dialog"), w(e, yo), Co(t, !0), rt(e);
}, fs = (t, e) => {
  const { element: n, triggers: s } = t;
  k(n, Ee, "true"), It(n, Ce), It(n, "role"), x(n, { visibility: "" });
  const o = ge.relatedTarget || s.find(mo);
  o && rt(o), go(n), w(n, Eo), v(n, Ne), Bt(n) || Co(t), xe(e) && e();
};
class Ho extends et {
  static selector = dr;
  static init = ur;
  static getInstance = oe;
  /**
   * @param target usually an `.offcanvas` element
   * @param config instance options
   */
  constructor(e, n) {
    super(e, n);
    const { element: s } = this;
    this.triggers = [...Z(Tn, $(s))].filter(
      (o) => W(o) === s
    ), this.relatedTarget = null, ls(this, !0);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return bn;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return fr;
  }
  // OFFCANVAS PUBLIC METHODS
  // ========================
  /** Shows or hides the offcanvas from the user. */
  toggle() {
    u(this.element, m) ? this.hide() : this.show();
  }
  /** Shows the offcanvas to the user. */
  show() {
    const { element: e, options: n, relatedTarget: s } = this;
    let o = 0;
    if (u(e, m) || (ge.relatedTarget = s || void 0, yo.relatedTarget = s || void 0, w(e, ge), ge.defaultPrevented))
      return;
    const i = Bt(e);
    if (i && i !== e) {
      const a = oe(i) || /* istanbul ignore next */
      j(i, vn);
      a && a.hide();
    }
    n.backdrop ? (St(A) ? $n() : uo(e, !0), o = ae(A), po(), setTimeout(() => ds(this), o)) : (ds(this), i && u(A, m) && Oe());
  }
  /**
   * Hides the offcanvas from the user.
   *
   * @param callback when `true` it will skip animation
   */
  hide(e) {
    const { element: n, relatedTarget: s } = this;
    u(n, m) && (_e.relatedTarget = s || void 0, Eo.relatedTarget = s || void 0, w(n, _e), !_e.defaultPrevented && (f(n, Ne), v(n, m), e ? hs(this, e) : M(n, () => hs(this, e))));
  }
  /** Removes the `Offcanvas` from the target element. */
  dispose() {
    ls(this), this.hide(() => super.dispose());
  }
}
const xt = "popover", Me = "Popover", it = "tooltip", So = (t) => {
  const e = t === it, n = e ? `${t}-inner` : `${t}-body`, s = e ? "" : `<h3 class="${t}-header"></h3>`, o = `<div class="${t}-arrow"></div>`, i = `<div class="${n}"></div>`;
  return `<div class="${t}" role="${it}">${s + o + i}</div>`;
}, Po = {
  top: "top",
  bottom: "bottom",
  left: "start",
  right: "end"
}, an = (t) => {
  const e = /\b(top|bottom|start|end)+/, { element: n, tooltip: s, container: o, options: i, arrow: a } = t;
  if (!s)
    return;
  const r = { ...Po }, c = Tt(n);
  x(s, {
    // top: '0px', left: '0px', right: '', bottom: '',
    top: "",
    left: "",
    right: "",
    bottom: ""
  });
  const l = t.name === Me, { offsetWidth: d, offsetHeight: h } = s, { clientWidth: g, clientHeight: H, offsetWidth: F } = at(n);
  let { placement: y } = i;
  const { clientWidth: z, offsetWidth: Y } = o, ot = V(o, "position") === "fixed", P = Math.abs(ot ? z - Y : g - F), ct = c && ot ? (
    /* istanbul ignore next */
    P
  ) : 0, nt = g - (c ? 0 : P) - 1, {
    width: R,
    height: K,
    left: S,
    right: Wt,
    top: lt
  } = ce(n, !0), { x: O, y: dt } = {
    x: S,
    y: lt
  };
  x(a, {
    top: "",
    left: "",
    right: "",
    bottom: ""
  });
  let Et = 0, Ut = "", ht = 0, Be = "", jt = "", he = "", Re = "";
  const Ct = a.offsetWidth || 0, ft = a.offsetHeight || 0, We = Ct / 2;
  let _t = lt - h - ft < 0, qt = lt + h + K + ft >= H, Gt = S - d - Ct < ct, Qt = S + d + R + Ct >= nt;
  const fe = ["left", "right"], je = ["top", "bottom"];
  _t = fe.includes(y) ? lt + K / 2 - h / 2 - ft < 0 : _t, qt = fe.includes(y) ? lt + h / 2 + K / 2 + ft >= H : qt, Gt = je.includes(y) ? S + R / 2 - d / 2 < ct : Gt, Qt = je.includes(y) ? S + d / 2 + R / 2 >= nt : Qt, y = fe.includes(y) && Gt && Qt ? "top" : y, y = y === "top" && _t ? "bottom" : y, y = y === "bottom" && qt ? "top" : y, y = y === "left" && Gt ? "right" : y, y = y === "right" && Qt ? "left" : y, s.className.includes(y) || (s.className = s.className.replace(e, r[y])), fe.includes(y) ? (y === "left" ? ht = O - d - (l ? Ct : 0) : ht = O + R + (l ? Ct : 0), _t && qt ? (Et = 0, Ut = 0, jt = lt + K / 2 - ft / 2) : _t ? (Et = dt, Ut = "", jt = K / 2 - Ct) : qt ? (Et = dt - h + K, Ut = "", jt = h - K / 2 - Ct) : (Et = dt - h / 2 + K / 2, jt = h / 2 - ft / 2)) : je.includes(y) && (y === "top" ? Et = dt - h - (l ? ft : 0) : Et = dt + K + (l ? ft : 0), Gt ? (ht = 0, he = O + R / 2 - We) : Qt ? (ht = "auto", Be = 0, Re = R / 2 + nt - Wt - We) : (ht = O - d / 2 + R / 2, he = d / 2 - We)), x(s, {
    top: `${Et}px`,
    bottom: Ut === "" ? "" : `${Ut}px`,
    left: ht === "auto" ? ht : `${ht}px`,
    right: Be !== "" ? `${Be}px` : ""
  }), E(a) && (jt !== "" && (a.style.top = `${jt}px`), he !== "" ? a.style.left = `${he}px` : Re !== "" && (a.style.right = `${Re}px`));
  const Yo = T(`updated.bs.${Kt(t.name)}`);
  w(n, Yo);
}, cn = {
  template: So(it),
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
}, Do = "data-original-title", At = "Tooltip", pt = (t, e, n) => {
  if (!(!E(t) || Dt(e) && !e.length))
    if (Dt(e)) {
      let s = e.trim();
      xe(n) && (s = n(s));
      const i = new DOMParser().parseFromString(s, "text/html");
      t.append(...i.body.childNodes);
    } else
      E(e) ? t.append(e) : (mi(e) || gi(e) && e.every(L)) && t.append(...e);
}, wr = (t) => {
  const e = t.name === At, { id: n, element: s, options: o } = t, { title: i, placement: a, template: r, animation: c, customClass: l, sanitizeFn: d, dismissible: h, content: g, btnClose: H } = o, F = e ? it : xt, y = { ...Po };
  let z = [], Y = [];
  Tt(s) && (y.left = "end", y.right = "start");
  const Rt = `bs-${F}-${y[a]}`;
  let ot;
  if (E(r))
    ot = r;
  else {
    const S = mt("div");
    pt(S, r, d), ot = S.firstChild;
  }
  t.tooltip = E(ot) ? ot.cloneNode(!0) : (
    /* istanbul ignore next */
    void 0
  );
  const { tooltip: P } = t;
  if (!P)
    return;
  k(P, "id", n), k(P, "role", it);
  const ct = e ? `${it}-inner` : `${xt}-body`, nt = e ? null : D(`.${xt}-header`, P), R = D(`.${ct}`, P);
  t.arrow = D(`.${F}-arrow`, P);
  const { arrow: K } = t;
  if (E(i))
    z = [i.cloneNode(!0)];
  else {
    const S = mt("div");
    pt(S, i, d), z = [...S.childNodes];
  }
  if (E(g))
    Y = [g.cloneNode(!0)];
  else {
    const S = mt("div");
    pt(S, g, d), Y = [...S.childNodes];
  }
  if (h)
    if (i)
      if (E(H))
        z = [...z, H.cloneNode(!0)];
      else {
        const S = mt("div");
        pt(S, H, d), z = [...z, S.firstChild];
      }
    else if (nt && nt.remove(), E(H))
      Y = [...Y, H.cloneNode(!0)];
    else {
      const S = mt("div");
      pt(S, H, d), Y = [...Y, S.firstChild];
    }
  e ? i && R && pt(R, i, d) : (i && nt && pt(nt, z, d), g && R && pt(R, Y, d), t.btn = D(".btn-close", P) || void 0), f(P, "position-fixed"), f(K, "position-absolute"), u(P, F) || f(P, F), c && !u(P, B) && f(P, B), l && !u(P, l) && f(P, l), u(P, Rt) || f(P, Rt);
}, $r = (t) => {
  const e = ["HTML", "BODY"], n = [];
  let { parentNode: s } = t;
  for (; s && !e.includes(s.nodeName); )
    s = pi(s), Rs(s) || vi(s) || n.push(s);
  return n.find((o, i) => V(o, "position") !== "relative" && n.slice(i + 1).every((a) => V(a, "position") === "static") ? o : null) || /* istanbul ignore next: optional guard */
  $(t).body;
}, Tr = `[${U}="${it}"],[data-tip="${it}"]`, Lo = "title";
let us = (t) => j(t, At);
const yr = (t) => new yn(t), Er = (t) => {
  const { element: e, tooltip: n, container: s, offsetParent: o } = t;
  It(e, Os), lo(n, s === o ? s : o);
}, Cr = (t, e) => {
  const { element: n } = t;
  te(t), we(n, Do) && t.name === At && Ao(t), e && e();
}, xo = (t, e) => {
  const n = e ? b.addListener : b.removeListener, { element: s } = t;
  n($(s), fn, t.handleTouch, tt), [De, Pe].forEach((o) => {
    n(Yt(s), o, t.update, tt);
  });
}, ps = (t) => {
  const { element: e } = t, n = T(`shown.bs.${Kt(t.name)}`);
  xo(t, !0), w(e, n), p.clear(e, "in");
}, gs = (t) => {
  const { element: e, onHideComplete: n } = t, s = T(`hidden.bs.${Kt(t.name)}`);
  xo(t), Er(t), w(e, s), xe(n) && (n(), t.onHideComplete = void 0), p.clear(e, "out");
}, te = (t, e) => {
  const n = e ? b.addListener : b.removeListener, { element: s, options: o, btn: i } = t, { trigger: a } = o, c = !!(t.name !== At && o.dismissible);
  if (a.includes("manual"))
    return;
  t.enabled = !!e, a.split(" ").forEach((d) => {
    d === Qo ? (n(s, Go, t.show), n(s, Se, t.show), c && i ? n(i, N, t.hide) : (n(s, hn, t.hide), n($(s), fn, t.handleTouch, tt))) : d === N ? n(s, d, c ? t.show : t.toggle) : d === ln && (n(s, dn, t.show), c || n(s, Ns, t.hide), ri && n(s, N, () => rt(s)));
  });
}, ms = (t, e) => {
  const n = e ? b.addListener : b.removeListener, { element: s, container: o, offsetParent: i } = t, { offsetHeight: a, scrollHeight: r } = o, c = I(s, `.${_}`), l = I(s, `.${q}`), d = Yt(s), g = o === i && a !== r ? o : d;
  n(g, Pe, t.update, tt), n(g, De, t.update, tt), c && n(c, `hide.bs.${_}`, t.hide), l && n(l, `hide.bs.${q}`, t.hide);
}, Ao = (t, e) => {
  const n = [Do, Lo], { element: s } = t;
  k(
    s,
    n[e ? 0 : 1],
    e || Nt(s, n[0]) || /* istanbul ignore next */
    ""
  ), It(s, n[e ? 1 : 0]);
};
class yn extends et {
  static selector = Tr;
  static init = yr;
  static getInstance = us;
  static styleTip = an;
  /**
   * @param target the target element
   * @param config the instance options
   */
  constructor(e, n) {
    super(e, n);
    const { element: s } = this, o = this.name === At, i = o ? it : xt, a = o ? At : Me;
    us = (c) => j(c, a), this.enabled = !0, this.id = `${i}-${Ws(s, i)}`;
    const { options: r } = this;
    !r.title && o || !o && !r.content || ($t(cn, { titleAttr: "" }), this.handleTouch = this.handleTouch.bind(this), this.update = this.update.bind(this), this.show = this.show.bind(this), this.hide = this.hide.bind(this), this.toggle = this.toggle.bind(this), we(s, Lo) && o && typeof r.title == "string" && Ao(this, r.title), this.container = $r(s), this.offsetParent = ["sticky", "fixed"].some(
      (c) => V(this.container, "position") === c
    ) ? this.container : $(this.element).body, wr(this), te(this, !0));
  }
  /**
   * Returns component name string.
   */
  get name() {
    return At;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return cn;
  }
  // TOOLTIP PUBLIC METHODS
  // ======================
  /** Shows the tooltip. */
  show() {
    const { options: e, tooltip: n, element: s, container: o, offsetParent: i, id: a } = this, { animation: r } = e, c = p.get(s, "out"), l = o === i ? o : i;
    p.clear(s, "out"), n && !c && !St(n, l) && p.set(
      s,
      () => {
        const d = T(`show.bs.${Kt(this.name)}`);
        w(s, d), !d.defaultPrevented && (co(n, l), k(s, Os, `#${a}`), this.update(), ms(this, !0), u(n, m) || f(n, m), r ? M(n, () => ps(this)) : ps(this));
      },
      17,
      "in"
    );
  }
  /** Hides the tooltip. */
  hide() {
    const { options: e, tooltip: n, element: s, container: o, offsetParent: i } = this, { animation: a, delay: r } = e;
    p.clear(s, "in"), n && St(n, o === i ? o : i) && p.set(
      s,
      () => {
        const c = T(`hide.bs.${Kt(this.name)}`);
        w(s, c), !c.defaultPrevented && (this.update(), v(n, m), ms(this), a ? M(n, () => gs(this)) : gs(this));
      },
      r + 17,
      "out"
    );
  }
  /** Updates the tooltip position. */
  update() {
    an(this);
  }
  /** Toggles the tooltip visibility. */
  toggle() {
    const { tooltip: e, container: n, offsetParent: s } = this;
    e && !St(e, n === s ? n : s) ? this.show() : this.hide();
  }
  /** Enables the tooltip. */
  enable() {
    const { enabled: e } = this;
    e || (te(this, !0), this.enabled = !e);
  }
  /** Disables the tooltip. */
  disable() {
    const { tooltip: e, container: n, offsetParent: s, options: o, enabled: i } = this, { animation: a } = o;
    i && (e && St(e, n === s ? n : s) && a ? (this.onHideComplete = () => te(this), this.hide()) : te(this), this.enabled = !i);
  }
  /** Toggles the `disabled` property. */
  toggleEnabled() {
    this.enabled ? this.disable() : this.enable();
  }
  /**
   * Handles the `touchstart` event listener for `Tooltip`
   *
   * @this {Tooltip}
   * @param {TouchEvent} e the `Event` object
   */
  handleTouch({ target: e }) {
    const { tooltip: n, element: s } = this;
    n && n.contains(e) || e === s || e && s.contains(e) || this.hide();
  }
  /** Removes the `Tooltip` from the target element. */
  dispose() {
    const { tooltip: e, container: n, offsetParent: s, options: o } = this, i = () => Cr(this, () => super.dispose());
    o.animation && e && St(e, n === s ? n : s) ? (this.options.delay = 0, this.onHideComplete = i, this.hide()) : i();
  }
}
const Hr = `[${U}="${xt}"],[data-tip="${xt}"]`, Sr = $t({}, cn, {
  template: So(xt),
  content: "",
  dismissible: !1,
  btnClose: '<button class="btn-close" aria-label="Close"></button>'
}), Pr = (t) => j(t, Me), Dr = (t) => new Io(t);
class Io extends yn {
  static selector = Hr;
  static init = Dr;
  static getInstance = Pr;
  static styleTip = an;
  /**
   * @param target the target element
   * @param config the instance options
   */
  constructor(e, n) {
    super(e, n);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return Me;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return Sr;
  }
  /* extend original `show()` */
  show() {
    super.show();
    const { options: e, btn: n } = this;
    e.dismissible && n && setTimeout(() => rt(n), 17);
  }
}
const Lr = "scrollspy", ko = "ScrollSpy", xr = '[data-bs-spy="scroll"]', Ar = {
  offset: 10,
  target: null
}, Ir = (t) => j(t, ko), kr = (t) => new Mo(t), vs = T(`activate.bs.${Lr}`), Or = (t) => {
  const { target: e, scrollTarget: n, options: s, itemsLength: o, scrollHeight: i, element: a } = t, { offset: r } = s, c = pn(n), l = e && gn("A", e), d = n ? Oo(n) : (
    /* istanbul ignore next */
    i
  );
  if (t.scrollTop = c ? n.scrollY : n.scrollTop, l && (d !== i || o !== l.length)) {
    let h, g, H;
    t.items = [], t.offsets = [], t.scrollHeight = d, t.maxScroll = t.scrollHeight - Nr(t), [...l].forEach((F) => {
      h = Nt(F, "href"), g = h && h.charAt(0) === "#" && h.slice(-1) !== "#" && D(h, $(a)), g && (t.items.push(F), H = ce(g), t.offsets.push((c ? H.top + t.scrollTop : g.offsetTop) - r));
    }), t.itemsLength = t.items.length;
  }
}, Oo = (t) => E(t) ? t.scrollHeight : at(t).scrollHeight, Nr = ({ element: t, scrollTarget: e }) => pn(e) ? e.innerHeight : ce(t).height, No = (t) => {
  [...gn("A", t)].forEach((e) => {
    u(e, C) && v(e, C);
  });
}, bs = (t, e) => {
  const { target: n, element: s } = t;
  E(n) && No(n), t.activeItem = e, f(e, C);
  const o = [];
  let i = e;
  for (; i !== yt(s); )
    i = i.parentElement, (u(i, "nav") || u(i, "dropdown-menu")) && o.push(i);
  o.forEach((a) => {
    const r = a.previousElementSibling;
    r && !u(r, C) && f(r, C);
  }), vs.relatedTarget = e, w(s, vs);
}, ws = (t, e) => {
  (e ? b.addListener : b.removeListener)(t.scrollTarget, De, t.refresh, tt);
};
class Mo extends et {
  static selector = xr;
  static init = kr;
  static getInstance = Ir;
  /**
   * @param target the target element
   * @param config the instance options
   */
  constructor(e, n) {
    super(e, n);
    const { element: s, options: o } = this;
    this.target = D(o.target, $(s)), this.target && (this.scrollTarget = s.clientHeight < s.scrollHeight ? s : Yt(s), this.scrollHeight = Oo(this.scrollTarget), this.refresh = this.refresh.bind(this), ws(this, !0), this.refresh());
  }
  /* eslint-disable */
  /**
   * Returns component name string.
   */
  get name() {
    return ko;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return Ar;
  }
  /* eslint-enable */
  // SCROLLSPY PUBLIC METHODS
  // ========================
  /** Updates all items. */
  refresh() {
    const { target: e } = this;
    if (e?.offsetHeight === 0)
      return;
    Or(this);
    const { scrollTop: n, maxScroll: s, itemsLength: o, items: i, activeItem: a } = this;
    if (n >= s) {
      const c = i[o - 1];
      a !== c && bs(this, c);
      return;
    }
    const { offsets: r } = this;
    if (a && n < r[0] && r[0] > 0) {
      this.activeItem = null, e && No(e);
      return;
    }
    i.forEach((c, l) => {
      a !== c && n >= r[l] && (typeof r[l + 1] > "u" || n < r[l + 1]) && bs(this, c);
    });
  }
  /** Removes `ScrollSpy` from the target element. */
  dispose() {
    ws(this), super.dispose();
  }
}
const de = "tab", Bo = "Tab", $s = `[${U}="${de}"]`, Ro = (t) => j(t, Bo), Mr = (t) => new Wo(t), qe = T(`show.bs.${de}`), Ts = T(`shown.bs.${de}`), Ge = T(`hide.bs.${de}`), ys = T(`hidden.bs.${de}`), ie = /* @__PURE__ */ new Map(), Es = (t) => {
  const { tabContent: e, nav: n } = t;
  e && u(e, kt) && (e.style.height = "", v(e, kt)), n && p.clear(n);
}, Cs = (t) => {
  const { element: e, tabContent: n, content: s, nav: o } = t, { tab: i } = E(o) && ie.get(o) || /* istanbul ignore next */
  { tab: null };
  if (n && s && u(s, B)) {
    const { currentHeight: a, nextHeight: r } = ie.get(e) || /* istanbul ignore next */
    {
      currentHeight: 0,
      nextHeight: 0
    };
    a === r ? Es(t) : setTimeout(() => {
      n.style.height = `${r}px`, Mt(n), M(n, () => Es(t));
    }, 50);
  } else
    o && p.clear(o);
  Ts.relatedTarget = i, w(e, Ts);
}, Hs = (t) => {
  const { element: e, content: n, tabContent: s, nav: o } = t, { tab: i, content: a } = o && ie.get(o) || /* istanbul ignore next */
  { tab: null, content: null };
  let r = 0;
  if (s && n && u(n, B) && ([a, n].forEach((c) => {
    E(c) && f(c, "overflow-hidden");
  }), r = E(a) ? a.scrollHeight : (
    /* istanbul ignore next */
    0
  )), qe.relatedTarget = i, ys.relatedTarget = e, w(e, qe), !qe.defaultPrevented) {
    if (n && f(n, C), a && v(a, C), s && n && u(n, B)) {
      const c = n.scrollHeight;
      ie.set(e, { currentHeight: r, nextHeight: c, tab: null, content: null }), f(s, kt), s.style.height = `${r}px`, Mt(s), [a, n].forEach((l) => {
        l && v(l, "overflow-hidden");
      });
    }
    n && n && u(n, B) ? setTimeout(() => {
      f(n, m), M(n, () => {
        Cs(t);
      });
    }, 1) : (n && f(n, m), Cs(t)), i && w(i, ys);
  }
}, Ss = (t) => {
  const { nav: e } = t;
  if (!E(e))
    return { tab: null, content: null };
  const n = vt(C, e);
  let s = null;
  n.length === 1 && !Ot.some((i) => u(n[0].parentElement, i)) ? [s] = n : n.length > 1 && (s = n[n.length - 1]);
  const o = E(s) ? W(s) : null;
  return { tab: s, content: o };
}, Ps = (t) => {
  if (!E(t))
    return null;
  const e = I(t, `.${Ot.join(",.")}`);
  return e ? D(`.${Ot[0]}-toggle`, e) : null;
}, Ds = (t, e) => {
  (e ? b.addListener : b.removeListener)(t.element, N, Br);
}, Br = (t) => {
  const e = Ro(t.target);
  e && (t.preventDefault(), e.show());
};
class Wo extends et {
  static selector = $s;
  static init = Mr;
  static getInstance = Ro;
  /** @param target the target element */
  constructor(e) {
    super(e);
    const { element: n } = this, s = W(n);
    if (!s)
      return;
    const o = I(n, ".nav"), i = I(s, ".tab-content");
    this.nav = o, this.content = s, this.tabContent = i, this.dropdown = Ps(n);
    const { tab: a } = Ss(this);
    if (o && !a) {
      const r = D($s, o), c = r && W(r);
      c && (f(r, C), f(c, m), f(c, C), k(n, Fe, "true"));
    }
    Ds(this, !0);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return Bo;
  }
  // TAB PUBLIC METHODS
  // ==================
  /** Shows the tab to the user. */
  show() {
    const { element: e, content: n, nav: s, dropdown: o } = this;
    if (!(s && p.get(s)) && !u(e, C)) {
      const { tab: i, content: a } = Ss(this);
      if (s && ie.set(s, { tab: i, content: a, currentHeight: 0, nextHeight: 0 }), Ge.relatedTarget = e, E(i) && w(i, Ge), Ge.defaultPrevented)
        return;
      f(e, C), k(e, Fe, "true");
      const r = E(i) && Ps(i);
      if (r && u(r, C) && v(r, C), s) {
        const c = () => {
          i && (v(i, C), k(i, Fe, "false")), o && !u(o, C) && f(o, C);
        };
        a && (u(a, B) || n && u(n, B)) ? p.set(s, c, 1) : c();
      }
      a && (v(a, m), u(a, B) ? M(a, () => Hs(this)) : Hs(this));
    }
  }
  /** Removes the `Tab` component from the target element. */
  dispose() {
    Ds(this), super.dispose();
  }
}
const G = "toast", jo = "Toast", Rr = `.${G}`, Wr = `[${Ae}="${G}"]`, Fo = `[${U}="${G}"]`, Xt = "showing", zo = "hide", jr = {
  animation: !0,
  autohide: !0,
  delay: 5e3
}, En = (t) => j(t, jo), Fr = (t) => new Vo(t), Ls = T(`show.bs.${G}`), zr = T(`shown.bs.${G}`), xs = T(`hide.bs.${G}`), Kr = T(`hidden.bs.${G}`), As = (t) => {
  const { element: e, options: n } = t;
  v(e, Xt), p.clear(e, Xt), w(e, zr), n.autohide && p.set(e, () => t.hide(), n.delay, G);
}, Is = (t) => {
  const { element: e } = t;
  v(e, Xt), v(e, m), f(e, zo), p.clear(e, G), w(e, Kr);
}, Vr = (t) => {
  const { element: e, options: n } = t;
  f(e, Xt), n.animation ? (Mt(e), M(e, () => Is(t))) : Is(t);
}, Xr = (t) => {
  const { element: e, options: n } = t;
  p.set(
    e,
    () => {
      v(e, zo), Mt(e), f(e, m), f(e, Xt), n.animation ? M(e, () => As(t)) : As(t);
    },
    17,
    Xt
  );
}, Ko = (t, e) => {
  const n = e ? b.addListener : b.removeListener, { element: s, triggers: o, dismiss: i, options: a } = t;
  i && n(i, N, t.hide), a.autohide && [dn, Ns, Se, hn].forEach(
    (r) => n(s, r, _r)
  ), o.length && o.forEach((r) => n(r, N, Ur));
}, Yr = (t) => {
  p.clear(t.element, G), Ko(t);
}, Ur = (t) => {
  const { target: e } = t, n = e && I(e, Fo), s = n && W(n), o = s && En(s);
  o && (n && n.tagName === "A" && t.preventDefault(), o.relatedTarget = n, o.show());
}, _r = (t) => {
  const e = t.target, n = En(e), { type: s, relatedTarget: o } = t;
  !n || e === o || e.contains(o) || ([Se, dn].includes(s) ? p.clear(e, G) : p.set(e, () => n.hide(), n.options.delay, G));
};
class Vo extends et {
  static selector = Rr;
  static init = Fr;
  static getInstance = En;
  /**
   * @param target the target `.toast` element
   * @param config the instance options
   */
  constructor(e, n) {
    super(e, n);
    const { element: s, options: o } = this;
    o.animation && !u(s, B) ? f(s, B) : !o.animation && u(s, B) && v(s, B), this.dismiss = D(Wr, s), this.triggers = [...Z(Fo, $(s))].filter(
      (i) => W(i) === s
    ), this.show = this.show.bind(this), this.hide = this.hide.bind(this), Ko(this, !0);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return jo;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return jr;
  }
  /**
   * Returns *true* when toast is visible.
   */
  get isShown() {
    return u(this.element, m);
  }
  // TOAST PUBLIC METHODS
  // ====================
  /** Shows the toast. */
  show() {
    const { element: e, isShown: n } = this;
    if (e && !n) {
      if (w(e, Ls), Ls.defaultPrevented)
        return;
      Xr(this);
    }
  }
  /** Hides the toast. */
  hide() {
    const { element: e, isShown: n } = this;
    if (e && n) {
      if (w(e, xs), xs.defaultPrevented)
        return;
      Vr(this);
    }
  }
  /** Removes the `Toast` component from the target element. */
  dispose() {
    const { element: e, isShown: n } = this;
    n && v(e, m), Yr(this), super.dispose();
  }
}
const Xo = {
  Alert: zs,
  Button: Vs,
  Carousel: Us,
  Collapse: Gs,
  Dropdown: no,
  Modal: To,
  Offcanvas: Ho,
  Popover: Io,
  ScrollSpy: Mo,
  Tab: Wo,
  Toast: Vo,
  Tooltip: yn
}, qr = (t, e) => {
  [...e].forEach((n) => t(n));
}, Gr = (t, e) => {
  const n = Pt.getAllFor(t);
  n && [...n].forEach(([s, o]) => {
    e.contains(s) && o.dispose();
  });
}, ks = (t) => {
  const e = t && t.nodeName ? t : document, n = [...gn("*", e)];
  fi(Xo).forEach((s) => {
    const { init: o, selector: i } = s;
    qr(
      o,
      n.filter((a) => bi(a, i))
    );
  });
}, Zr = (t) => {
  const e = t && t.nodeName ? t : document;
  Je(Xo).forEach((n) => {
    Gr(n, e);
  });
};
document.body ? ks() : b.addListener(document, "DOMContentLoaded", () => ks(), { once: !0 });
export {
  zs as Alert,
  Vs as Button,
  Us as Carousel,
  Gs as Collapse,
  no as Dropdown,
  Qr as Listener,
  To as Modal,
  Ho as Offcanvas,
  Io as Popover,
  Mo as ScrollSpy,
  Wo as Tab,
  Vo as Toast,
  yn as Tooltip,
  ks as initCallback,
  Zr as removeDataAPI
};
//# sourceMappingURL=bootstrap-native.mjs.map
