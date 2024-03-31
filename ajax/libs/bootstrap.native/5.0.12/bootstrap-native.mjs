var Bo = Object.defineProperty;
var Ro = (t, s, e) => s in t ? Bo(t, s, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[s] = e;
var d = (t, s, e) => (Ro(t, typeof s != "symbol" ? s + "" : s, e), e);
const Nn = "aria-describedby", De = "aria-expanded", ke = "aria-hidden", Ne = "aria-modal", Ns = "aria-pressed", Qe = "aria-selected", Wo = "DOMContentLoaded", ws = "focus", Es = "focusin", On = "focusout", Oe = "keydown", Fo = "keyup", N = "click", Mn = "mousedown", jo = "hover", Me = "mouseenter", $s = "mouseleave", zo = "pointerdown", Vo = "pointermove", Ko = "pointerup", _e = "resize", Be = "scroll", Ts = "touchstart", Xo = "dragstart", as = "ArrowDown", rs = "ArrowUp", Os = "ArrowLeft", Ms = "ArrowRight", ys = "Escape", Yo = "transitionDuration", Uo = "transitionDelay", Ze = "transitionend", _n = "transitionProperty", qo = navigator.userAgentData, Ae = qo, { userAgent: Qo } = navigator, Le = Qo, _s = /iPhone|iPad|iPod|Android/i;
Ae ? Ae.brands.some((t) => _s.test(t.brand)) : _s.test(Le);
const Bs = /(iPhone|iPod|iPad)/, Zo = Ae ? Ae.brands.some((t) => Bs.test(t.brand)) : (
  /* istanbul ignore next */
  Bs.test(Le)
);
Le && Le.includes("Firefox");
const { head: Re } = document;
["webkitPerspective", "perspective"].some((t) => t in Re.style);
const Go = (t, s, e, n) => {
  const o = n || !1;
  t.addEventListener(s, e, o);
}, Jo = (t, s, e, n) => {
  const o = n || !1;
  t.removeEventListener(s, e, o);
}, ti = (t, s, e, n) => {
  const o = (i) => {
    (i.target === t || i.currentTarget === t) && (e.apply(t, [i]), Jo(t, s, o, n));
  };
  Go(t, s, o, n);
}, ge = () => {
};
(() => {
  let t = !1;
  try {
    const s = Object.defineProperty({}, "passive", {
      get: () => (t = !0, t)
    });
    ti(document, Wo, ge, s);
  } catch {
  }
  return t;
})();
["webkitTransform", "transform"].some((t) => t in Re.style);
["webkitAnimation", "animation"].some((t) => t in Re.style);
["webkitTransition", "transition"].some((t) => t in Re.style);
const it = (t, s) => t.getAttribute(s), Ie = (t, s) => t.hasAttribute(s), O = (t, s, e) => t.setAttribute(s, e), kt = (t, s) => t.removeAttribute(s), g = (t, ...s) => {
  t.classList.add(...s);
}, b = (t, ...s) => {
  t.classList.remove(...s);
}, h = (t, s) => t.classList.contains(s), ve = (t) => t != null && typeof t == "object" || !1, L = (t) => ve(t) && typeof t.nodeType == "number" && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].some((s) => t.nodeType === s) || !1, y = (t) => L(t) && t.nodeType === 1 || !1, Ft = /* @__PURE__ */ new Map(), At = {
  data: Ft,
  /**
   * Sets web components data.
   *
   * @param element target element
   * @param component the component's name or a unique key
   * @param instance the component instance
   */
  set: (t, s, e) => {
    y(t) && (Ft.has(s) || Ft.set(s, /* @__PURE__ */ new Map()), Ft.get(s).set(t, e));
  },
  /**
   * Returns all instances for specified component.
   *
   * @param component the component's name or a unique key
   * @returns all the component instances
   */
  getAllFor: (t) => Ft.get(t) || null,
  /**
   * Returns the instance associated with the target.
   *
   * @param element target element
   * @param component the component's name or a unique key
   * @returns the instance
   */
  get: (t, s) => {
    if (!y(t) || !s)
      return null;
    const e = At.getAllFor(s);
    return t && e && e.get(t) || null;
  },
  /**
   * Removes web components data.
   *
   * @param element target element
   * @param component the component's name or a unique key
   */
  remove: (t, s) => {
    const e = At.getAllFor(s);
    !e || !y(t) || (e.delete(t), e.size === 0 && Ft.delete(s));
  }
}, F = (t, s) => At.get(t, s), be = (t) => typeof t == "string" || !1, Cs = (t) => ve(t) && t.constructor.name === "Window" || !1, Bn = (t) => L(t) && t.nodeType === 9 || !1, E = (t) => Cs(t) ? t.document : Bn(t) ? t : L(t) ? t.ownerDocument : window.document, dt = (t, ...s) => Object.assign(t, ...s), $t = (t) => {
  if (!t)
    return;
  if (be(t))
    return E().createElement(t);
  const { tagName: s } = t, e = $t(s);
  if (!e)
    return;
  const n = { ...t };
  return delete n.tagName, dt(e, n);
}, w = (t, s) => t.dispatchEvent(s), V = (t, s) => {
  const e = getComputedStyle(t), n = s.replace("webkit", "Webkit").replace(/([A-Z])/g, "-$1").toLowerCase();
  return e.getPropertyValue(n);
}, ei = (t) => {
  const s = V(t, _n), e = V(t, Uo), n = e.includes("ms") ? (
    /* istanbul ignore next */
    1
  ) : 1e3, o = s && s !== "none" ? parseFloat(e) * n : (
    /* istanbul ignore next */
    0
  );
  return Number.isNaN(o) ? (
    /* istanbul ignore next */
    0
  ) : o;
}, Kt = (t) => {
  const s = V(t, _n), e = V(t, Yo), n = e.includes("ms") ? (
    /* istanbul ignore next */
    1
  ) : 1e3, o = s && s !== "none" ? parseFloat(e) * n : (
    /* istanbul ignore next */
    0
  );
  return Number.isNaN(o) ? (
    /* istanbul ignore next */
    0
  ) : o;
}, x = (t, s) => {
  let e = 0;
  const n = new Event(Ze), o = Kt(t), i = ei(t);
  if (o) {
    const c = (a) => {
      a.target === t && (s.apply(t, [a]), t.removeEventListener(Ze, c), e = 1);
    };
    t.addEventListener(Ze, c), setTimeout(() => {
      e || w(t, n);
    }, o + i + 17);
  } else
    s.apply(t, [n]);
}, ht = (t, s) => t.focus(s), Rs = (t) => ["true", !0].includes(t) ? !0 : ["false", !1].includes(t) ? !1 : ["null", "", null, void 0].includes(t) ? null : t !== "" && !Number.isNaN(+t) ? +t : t, Ce = (t) => Object.entries(t), Xt = (t) => t.toLowerCase(), si = (t, s, e, n) => {
  const o = { ...e }, i = { ...t.dataset }, c = { ...s }, a = {}, l = "title";
  return Ce(i).forEach(([r, f]) => {
    const p = n && typeof r == "string" && r.includes(n) ? r.replace(n, "").replace(/[A-Z]/g, (v) => Xt(v)) : r;
    a[p] = Rs(f);
  }), Ce(o).forEach(([r, f]) => {
    o[r] = Rs(f);
  }), Ce(s).forEach(([r, f]) => {
    r in o ? c[r] = o[r] : r in a ? c[r] = a[r] : c[r] = r === l ? it(t, l) : f;
  }), c;
}, Ws = (t) => Object.keys(t), $ = (t, s) => {
  const e = new CustomEvent(t, {
    cancelable: !0,
    bubbles: !0
  });
  return ve(s) && dt(e, s), e;
}, st = { passive: !0 }, Mt = (t) => t.offsetHeight, I = (t, s) => {
  Ce(s).forEach(([e, n]) => {
    if (n && be(e) && e.includes("--"))
      t.style.setProperty(e, n);
    else {
      const o = {};
      o[e] = n, dt(t.style, o);
    }
  });
}, ls = (t) => ve(t) && t.constructor.name === "Map" || !1, ni = (t) => typeof t == "number" || !1, bt = /* @__PURE__ */ new Map(), u = {
  /**
   * Sets a new timeout timer for an element, or element -> key association.
   *
   * @param element target element
   * @param callback the callback
   * @param delay the execution delay
   * @param key a unique key
   */
  set: (t, s, e, n) => {
    y(t) && (n && n.length ? (bt.has(t) || bt.set(t, /* @__PURE__ */ new Map()), bt.get(t).set(n, setTimeout(s, e))) : bt.set(t, setTimeout(s, e)));
  },
  /**
   * Returns the timer associated with the target.
   *
   * @param element target element
   * @param key a unique
   * @returns the timer
   */
  get: (t, s) => {
    if (!y(t))
      return null;
    const e = bt.get(t);
    return s && e && ls(e) ? e.get(s) || /* istanbul ignore next */
    null : ni(e) ? e : null;
  },
  /**
   * Clears the element's timer.
   *
   * @param element target element
   * @param key a unique key
   */
  clear: (t, s) => {
    if (!y(t))
      return;
    const e = bt.get(t);
    s && s.length && ls(e) ? (clearTimeout(e.get(s)), e.delete(s), e.size === 0 && bt.delete(t)) : (clearTimeout(e), bt.delete(t));
  }
}, we = (t, s) => {
  const { width: e, height: n, top: o, right: i, bottom: c, left: a } = t.getBoundingClientRect();
  let l = 1, r = 1;
  if (s && y(t)) {
    const { offsetWidth: f, offsetHeight: p } = t;
    l = f > 0 ? Math.round(e) / f : (
      /* istanbul ignore next */
      1
    ), r = p > 0 ? Math.round(n) / p : (
      /* istanbul ignore next */
      1
    );
  }
  return {
    width: e / l,
    height: n / r,
    top: o / r,
    right: i / l,
    bottom: c / r,
    left: a / l,
    x: a / l,
    y: o / r
  };
}, St = (t) => E(t).body, ft = (t) => E(t).documentElement, Rn = (t) => L(t) && t.constructor.name === "ShadowRoot" || !1, oi = (t) => t.nodeName === "HTML" ? t : y(t) && t.assignedSlot || // step into the shadow DOM of the parent of a slotted node
L(t) && t.parentNode || // DOM Element detected
Rn(t) && t.host || // ShadowRoot detected
ft(t);
let Fs = 0, js = 0;
const jt = /* @__PURE__ */ new Map(), Wn = (t, s) => {
  let e = s ? Fs : js;
  if (s) {
    const n = Wn(t), o = jt.get(n) || /* @__PURE__ */ new Map();
    jt.has(n) || jt.set(n, o), ls(o) && !o.has(s) ? (o.set(s, e), Fs += 1) : e = o.get(s);
  } else {
    const n = t.id || t;
    jt.has(n) ? e = jt.get(n) : (jt.set(n, e), js += 1);
  }
  return e;
}, qt = (t) => {
  var s;
  return t ? Bn(t) ? t.defaultView : L(t) ? (s = t == null ? void 0 : t.ownerDocument) == null ? void 0 : s.defaultView : t : window;
}, ii = (t) => Array.isArray(t) || !1, Fn = (t) => {
  if (!L(t))
    return !1;
  const { top: s, bottom: e } = we(t), { clientHeight: n } = ft(t);
  return s <= n && e >= 0;
}, ci = (t) => typeof t == "function" || !1, ai = (t) => ve(t) && t.constructor.name === "NodeList" || !1, Ct = (t) => ft(t).dir === "rtl", ri = (t) => L(t) && ["TABLE", "TD", "TH"].includes(t.nodeName) || !1, M = (t, s) => t ? t.closest(s) || // break out of `ShadowRoot`
M(t.getRootNode().host, s) : null, P = (t, s) => y(t) ? t : (L(s) ? s : E()).querySelector(t), Ss = (t, s) => (L(s) ? s : E()).getElementsByTagName(t), tt = (t, s) => (L(s) ? s : E()).querySelectorAll(t), rt = (t, s) => (s && L(s) ? s : E()).getElementsByClassName(
  t
), jn = (t, s) => t.matches(s), Vt = {}, zn = (t) => {
  const { type: s, currentTarget: e } = t;
  [...Vt[s]].forEach(([n, o]) => {
    e === n && [...o].forEach(([i, c]) => {
      i.apply(n, [t]), typeof c == "object" && c.once && B(n, s, i, c);
    });
  });
}, _ = (t, s, e, n) => {
  Vt[s] || (Vt[s] = /* @__PURE__ */ new Map());
  const o = Vt[s];
  o.has(t) || o.set(t, /* @__PURE__ */ new Map());
  const i = o.get(t), { size: c } = i;
  i.set(e, n), c || t.addEventListener(s, zn, n);
}, B = (t, s, e, n) => {
  const o = Vt[s], i = o && o.get(t), c = i && i.get(e), a = c !== void 0 ? c : n;
  i && i.has(e) && i.delete(e), o && (!i || !i.size) && o.delete(t), (!o || !o.size) && delete Vt[s], (!i || !i.size) && t.removeEventListener(
    s,
    zn,
    a
  );
}, R = "fade", m = "show", We = "data-bs-dismiss", Fe = "alert", Vn = "Alert", li = "5.0.12", di = li;
class nt {
  /**
   * @param target `HTMLElement` or selector string
   * @param config component instance options
   */
  constructor(s, e) {
    /** just to have something to extend from */
    d(this, "_toggleEventListeners", () => {
    });
    const n = P(s);
    if (!n)
      throw be(s) ? Error(`${this.name} Error: "${s}" is not a valid selector.`) : Error(`${this.name} Error: your target is not an instance of HTMLElement.`);
    const o = At.get(n, this.name);
    o && o._toggleEventListeners(), this.element = n, this.options = this.defaults && Ws(this.defaults).length ? si(n, this.defaults, e || {}, "bs") : {}, At.set(n, this.name, this);
  }
  /* istanbul ignore next */
  get version() {
    return di;
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
    At.remove(this.element, this.name), Ws(this).forEach((s) => {
      delete this[s];
    });
  }
}
const hi = `.${Fe}`, fi = `[${We}="${Fe}"]`, gi = (t) => F(t, Vn), pi = (t) => new ne(t), zs = $(`close.bs.${Fe}`), ui = $(`closed.bs.${Fe}`), Vs = (t) => {
  const { element: s } = t;
  w(s, ui), t._toggleEventListeners(), t.dispose(), s.remove();
};
class ne extends nt {
  constructor(e) {
    super(e);
    d(this, "dismiss");
    // ALERT PUBLIC METHODS
    // ====================
    /**
     * Public method that hides the `.alert` element from the user,
     * disposes the instance once animation is complete, then
     * removes the element from the DOM.
     */
    d(this, "close", () => {
      const { element: e } = this;
      e && h(e, m) && (w(e, zs), zs.defaultPrevented || (b(e, m), h(e, R) ? x(e, () => Vs(this)) : Vs(this)));
    });
    /**
     * Toggle on / off the `click` event listener.
     *
     * @param add when `true`, event listener is added
     */
    d(this, "_toggleEventListeners", (e) => {
      const n = e ? _ : B, { dismiss: o, close: i } = this;
      o && n(o, N, i);
    });
    this.dismiss = P(fi, this.element), this._toggleEventListeners(!0);
  }
  /** Returns component name string. */
  get name() {
    return Vn;
  }
  /** Remove the component from target element. */
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
d(ne, "selector", hi), d(ne, "init", pi), d(ne, "getInstance", gi);
const C = "active", ct = "data-bs-toggle", mi = "button", Kn = "Button", vi = `[${ct}="${mi}"]`, bi = (t) => F(t, Kn), wi = (t) => new oe(t);
class oe extends nt {
  /**
   * @param target usually a `.btn` element
   */
  constructor(e) {
    super(e);
    d(this, "isActive", !1);
    // BUTTON PUBLIC METHODS
    // =====================
    /**
     * Toggles the state of the target button.
     *
     * @param e usually `click` Event object
     */
    d(this, "toggle", (e) => {
      e && e.preventDefault();
      const { element: n, isActive: o } = this;
      !h(n, "disabled") && !it(n, "disabled") && ((o ? b : g)(n, C), O(n, Ns, o ? "false" : "true"), this.isActive = h(n, C));
    });
    // BUTTON PRIVATE METHOD
    // =====================
    /**
     * Toggles on/off the `click` event listener.
     *
     * @param add when `true`, event listener is added
     */
    d(this, "_toggleEventListeners", (e) => {
      (e ? _ : B)(this.element, N, this.toggle);
    });
    const { element: n } = this;
    this.isActive = h(n, C), O(n, Ns, String(!!this.isActive)), this._toggleEventListeners(!0);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return Kn;
  }
  /** Removes the `Button` component from the target element. */
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
d(oe, "selector", vi), d(oe, "init", wi), d(oe, "getInstance", bi);
const ds = "data-bs-target", Lt = "carousel", Xn = "Carousel", Ks = "data-bs-parent", Ei = "data-bs-container", X = (t) => {
  const s = [ds, Ks, Ei, "href"], e = E(t);
  return s.map((n) => {
    const o = it(t, n);
    return o ? n === Ks ? M(t, o) : P(o, e) : null;
  }).filter((n) => n)[0];
}, Ee = `[data-bs-ride="${Lt}"]`, Q = `${Lt}-item`, hs = "data-bs-slide-to", Et = "data-bs-slide", Tt = "paused", Xs = {
  pause: "hover",
  keyboard: !1,
  touch: !0,
  interval: 5e3
}, gt = (t) => F(t, Xn), $i = (t) => new ie(t);
let se = 0, Se = 0, Ge = 0;
const Je = $(`slide.bs.${Lt}`), fs = $(`slid.bs.${Lt}`), Ys = (t) => {
  const { index: s, direction: e, element: n, slides: o, options: i } = t;
  if (t.isAnimating) {
    const c = gs(t), a = e === "left" ? "next" : "prev", l = e === "left" ? "start" : "end";
    g(o[s], C), b(o[s], `${Q}-${a}`), b(o[s], `${Q}-${l}`), b(o[c], C), b(o[c], `${Q}-${l}`), w(n, fs), u.clear(n, Et), t.cycle && !E(n).hidden && i.interval && !t.isPaused && t.cycle();
  }
};
function Ti() {
  const t = gt(this);
  t && !t.isPaused && !u.get(this, Tt) && g(this, Tt);
}
function yi() {
  const t = gt(this);
  t && t.isPaused && !u.get(this, Tt) && t.cycle();
}
function Ci(t) {
  t.preventDefault();
  const s = M(this, Ee) || X(this), e = gt(s);
  if (e && !e.isAnimating) {
    const n = +(it(this, hs) || /* istanbul ignore next */
    0);
    this && !h(this, C) && // event target is not active
    !Number.isNaN(n) && e.to(n);
  }
}
function Si(t) {
  t.preventDefault();
  const s = M(this, Ee) || X(this), e = gt(s);
  if (e && !e.isAnimating) {
    const n = it(this, Et);
    n === "next" ? e.next() : n === "prev" && e.prev();
  }
}
const Hi = ({ code: t, target: s }) => {
  const e = E(s), [n] = [...tt(Ee, e)].filter((i) => Fn(i)), o = gt(n);
  if (o && !o.isAnimating && !/textarea|input/i.test(s.nodeName)) {
    const i = Ct(n);
    t === (i ? Ms : Os) ? o.prev() : t === (i ? Os : Ms) && o.next();
  }
};
function Us(t) {
  const { target: s } = t, e = gt(this);
  e && e.isTouch && (e.indicator && !e.indicator.contains(s) || !e.controls.includes(s)) && (t.stopImmediatePropagation(), t.stopPropagation(), t.preventDefault());
}
function xi(t) {
  const { target: s } = t, e = gt(this);
  if (e && !e.isAnimating && !e.isTouch) {
    const { controls: n, indicators: o } = e;
    [...n, ...o].every((i) => i === s || i.contains(s)) || (se = t.pageX, this.contains(s) && (e.isTouch = !0, Yn(e, !0)));
  }
}
const Pi = (t) => {
  Se = t.pageX;
}, Di = (t) => {
  var o;
  const { target: s } = t, e = E(s), n = [...tt(Ee, e)].map((i) => gt(i)).find((i) => i.isTouch);
  if (n) {
    const { element: i, index: c } = n, a = Ct(i);
    Ge = t.pageX, n.isTouch = !1, Yn(n), !((o = e.getSelection()) != null && o.toString().length) && i.contains(s) && Math.abs(se - Ge) > 120 && (Se < se ? n.to(c + (a ? -1 : 1)) : Se > se && n.to(c + (a ? 1 : -1))), se = 0, Se = 0, Ge = 0;
  }
}, ts = (t, s) => {
  const { indicators: e } = t;
  [...e].forEach((n) => b(n, C)), t.indicators[s] && g(e[s], C);
}, Yn = (t, s) => {
  const { element: e } = t, n = s ? _ : B;
  n(E(e), Vo, Pi, st), n(E(e), Ko, Di, st);
}, gs = (t) => {
  const { slides: s, element: e } = t, n = P(`.${Q}.${C}`, e);
  return y(n) ? [...s].indexOf(n) : -1;
};
class ie extends nt {
  /**
   * @param target mostly a `.carousel` element
   * @param config instance options
   */
  constructor(e, n) {
    super(e, n);
    /**
     * Toggles all event listeners for the `Carousel` instance.
     *
     * @param add when `TRUE` event listeners are added
     */
    d(this, "_toggleEventListeners", (e) => {
      const { element: n, options: o, slides: i, controls: c, indicators: a } = this, { touch: l, pause: r, interval: f, keyboard: p } = o, v = e ? _ : B;
      r && f && (v(n, Me, Ti), v(n, $s, yi)), l && i.length > 2 && (v(n, zo, xi, st), v(n, Ts, Us, { passive: !1 }), v(n, Xo, Us, { passive: !1 })), c.length && c.forEach((D) => {
        D && v(D, N, Si);
      }), a.length && a.forEach((D) => {
        v(D, N, Ci);
      }), p && v(E(n), Oe, Hi);
    });
    const { element: o } = this;
    this.direction = Ct(o) ? "right" : "left", this.isTouch = !1, this.slides = rt(Q, o);
    const { slides: i } = this;
    if (i.length >= 2) {
      const c = gs(this), a = [...i].find((f) => jn(f, `.${Q}-next,.${Q}-next`));
      this.index = c;
      const l = E(o);
      this.controls = [
        ...tt(`[${Et}]`, o),
        ...tt(`[${Et}][${ds}="#${o.id}"]`, l)
      ].filter((f, p, v) => p === v.indexOf(f)), this.indicator = P(`.${Lt}-indicators`, o), this.indicators = [
        ...this.indicator ? tt(`[${hs}]`, this.indicator) : [],
        ...tt(`[${hs}][${ds}="#${o.id}"]`, l)
      ].filter((f, p, v) => p === v.indexOf(f));
      const { options: r } = this;
      this.options.interval = r.interval === !0 ? Xs.interval : r.interval, a ? this.index = [...i].indexOf(a) : c < 0 && (this.index = 0, g(i[0], C), this.indicators.length && ts(this, 0)), this.indicators.length && ts(this, this.index), this._toggleEventListeners(!0), r.interval && this.cycle();
    }
  }
  /**
   * Returns component name string.
   */
  get name() {
    return Xn;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return Xs;
  }
  /**
   * Check if instance is paused.
   */
  get isPaused() {
    return h(this.element, Tt);
  }
  /**
   * Check if instance is animating.
   */
  get isAnimating() {
    return P(`.${Q}-next,.${Q}-prev`, this.element) !== null;
  }
  // CAROUSEL PUBLIC METHODS
  // =======================
  /** Slide automatically through items. */
  cycle() {
    const { element: e, options: n, isPaused: o, index: i } = this;
    u.clear(e, Lt), o && (u.clear(e, Tt), b(e, Tt)), u.set(
      e,
      () => {
        this.element && !this.isPaused && !this.isTouch && Fn(e) && this.to(i + 1);
      },
      n.interval,
      Lt
    );
  }
  /** Pause the automatic cycle. */
  pause() {
    const { element: e, options: n } = this;
    !this.isPaused && n.interval && (g(e, Tt), u.set(
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
    const { element: n, slides: o, options: i } = this, c = gs(this), a = Ct(n);
    let l = e;
    if (!this.isAnimating && c !== l && !u.get(n, Et)) {
      c < l || c === 0 && l === o.length - 1 ? this.direction = a ? "right" : "left" : (c > l || c === o.length - 1 && l === 0) && (this.direction = a ? "left" : "right");
      const { direction: r } = this;
      l < 0 ? l = o.length - 1 : l >= o.length && (l = 0);
      const f = r === "left" ? "next" : "prev", p = r === "left" ? "start" : "end", v = {
        relatedTarget: o[l],
        from: c,
        to: l,
        direction: r
      };
      dt(Je, v), dt(fs, v), w(n, Je), Je.defaultPrevented || (this.index = l, ts(this, l), Kt(o[l]) && h(n, "slide") ? u.set(
        n,
        () => {
          g(o[l], `${Q}-${f}`), Mt(o[l]), g(o[l], `${Q}-${p}`), g(o[c], `${Q}-${p}`), x(
            o[l],
            () => this.slides && this.slides.length && Ys(this)
          );
        },
        0,
        Et
      ) : (g(o[l], C), b(o[c], C), u.set(
        n,
        () => {
          u.clear(n, Et), n && i.interval && !this.isPaused && this.cycle(), w(n, fs);
        },
        0,
        Et
      )));
    }
  }
  /** Remove `Carousel` component from target. */
  dispose() {
    const { isAnimating: e } = this, n = {
      ...this,
      isAnimating: e
    };
    this._toggleEventListeners(), super.dispose(), n.isAnimating && x(n.slides[n.index], () => {
      Ys(n);
    });
  }
}
d(ie, "selector", Ee), d(ie, "init", $i), d(ie, "getInstance", gt);
const Nt = "collapsing", K = "collapse", Un = "Collapse", Ai = `.${K}`, qn = `[${ct}="${K}"]`, Li = { parent: null }, He = (t) => F(t, Un), Ii = (t) => new ce(t), qs = $(`show.bs.${K}`), ki = $(`shown.bs.${K}`), Qs = $(`hide.bs.${K}`), Ni = $(`hidden.bs.${K}`), Oi = (t) => {
  const { element: s, parent: e, triggers: n } = t;
  w(s, qs), qs.defaultPrevented || (u.set(s, ge, 17), e && u.set(e, ge, 17), g(s, Nt), b(s, K), I(s, { height: `${s.scrollHeight}px` }), x(s, () => {
    u.clear(s), e && u.clear(e), n.forEach((o) => O(o, De, "true")), b(s, Nt), g(s, K), g(s, m), I(s, { height: "" }), w(s, ki);
  }));
}, Zs = (t) => {
  const { element: s, parent: e, triggers: n } = t;
  w(s, Qs), Qs.defaultPrevented || (u.set(s, ge, 17), e && u.set(e, ge, 17), I(s, { height: `${s.scrollHeight}px` }), b(s, K), b(s, m), g(s, Nt), Mt(s), I(s, { height: "0px" }), x(s, () => {
    u.clear(s), e && u.clear(e), n.forEach((o) => O(o, De, "false")), b(s, Nt), g(s, K), I(s, { height: "" }), w(s, Ni);
  }));
}, Mi = (t) => {
  const { target: s } = t, e = s && M(s, qn), n = e && X(e), o = n && He(n);
  o && o.toggle(), e && e.tagName === "A" && t.preventDefault();
};
class ce extends nt {
  /**
   * @param target and `Element` that matches the selector
   * @param config instance options
   */
  constructor(e, n) {
    super(e, n);
    /**
     * Toggles on/off the event listener(s) of the `Collapse` instance.
     *
     * @param add when `true`, the event listener is added
     */
    d(this, "_toggleEventListeners", (e) => {
      const n = e ? _ : B, { triggers: o } = this;
      o.length && o.forEach((i) => n(i, N, Mi));
    });
    const { element: o, options: i } = this, c = E(o);
    this.triggers = [...tt(qn, c)].filter((a) => X(a) === o), this.parent = y(i.parent) ? i.parent : be(i.parent) ? X(o) || P(i.parent, c) : null, this._toggleEventListeners(!0);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return Un;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return Li;
  }
  // COLLAPSE PUBLIC METHODS
  // =======================
  /** Hides the collapse. */
  hide() {
    const { triggers: e, element: n } = this;
    u.get(n) || (Zs(this), e.length && e.forEach((o) => g(o, `${K}d`)));
  }
  /** Shows the collapse. */
  show() {
    const { element: e, parent: n, triggers: o } = this;
    let i, c;
    n && (i = [...tt(`.${K}.${m}`, n)].find(
      (a) => He(a)
    ), c = i && He(i)), (!n || !u.get(n)) && !u.get(e) && (c && i !== e && (Zs(c), c.triggers.forEach((a) => {
      g(a, `${K}d`);
    })), Oi(this), o.length && o.forEach((a) => b(a, `${K}d`)));
  }
  /** Toggles the visibility of the collapse. */
  toggle() {
    h(this.element, m) ? this.hide() : this.show();
  }
  /** Remove the `Collapse` component from the target `Element`. */
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
d(ce, "selector", Ai), d(ce, "init", Ii), d(ce, "getInstance", He);
const Ot = ["dropdown", "dropup", "dropstart", "dropend"], Qn = "Dropdown", Zn = "dropdown-menu", Gn = (t) => {
  const s = M(t, "A");
  return t.tagName === "A" && // anchor href starts with #
  Ie(t, "href") && it(t, "href").slice(-1) === "#" || // OR a child of an anchor with href starts with #
  s && Ie(s, "href") && it(s, "href").slice(-1) === "#";
}, [et, ps, us, ms] = Ot, Jn = `[${ct}="${et}"]`, Yt = (t) => F(t, Qn), _i = (t) => new ae(t), Bi = `${Zn}-end`, Gs = [et, ps], Js = [us, ms], tn = ["A", "BUTTON"], Ri = {
  offset: 5,
  // [number] 5(px)
  display: "dynamic"
  // [dynamic|static]
}, es = $(`show.bs.${et}`), en = $(`shown.bs.${et}`), ss = $(`hide.bs.${et}`), sn = $(`hidden.bs.${et}`), to = $(`updated.bs.${et}`), eo = (t) => {
  const { element: s, menu: e, parentElement: n, options: o } = t, { offset: i } = o;
  if (V(e, "position") !== "static") {
    const c = Ct(s), a = h(e, Bi);
    ["margin", "top", "bottom", "left", "right"].forEach((k) => {
      const ut = {};
      ut[k] = "", I(e, ut);
    });
    let r = Ot.find((k) => h(n, k)) || /* istanbul ignore next: fallback position */
    et;
    const f = {
      dropdown: [i, 0, 0],
      dropup: [0, 0, i],
      dropstart: c ? [-1, 0, 0, i] : [-1, i, 0],
      dropend: c ? [-1, i, 0] : [-1, 0, 0, i]
    }, p = {
      dropdown: { top: "100%" },
      dropup: { top: "auto", bottom: "100%" },
      dropstart: c ? { left: "100%", right: "auto" } : { left: "auto", right: "100%" },
      dropend: c ? { left: "auto", right: "100%" } : { left: "100%", right: "auto" },
      menuStart: c ? { right: "0", left: "auto" } : { right: "auto", left: "0" },
      menuEnd: c ? { right: "auto", left: "0" } : { right: "0", left: "auto" }
    }, { offsetWidth: v, offsetHeight: D } = e, { clientWidth: q, clientHeight: T } = ft(s), {
      left: j,
      top: Y,
      width: Bt,
      height: at
    } = we(s), S = j - v - i < 0, J = j + v + Bt + i >= q, ot = Y + D + i >= T, W = Y + D + at + i >= T, z = Y - D - i < 0, H = (!c && a || c && !a) && j + Bt - v < 0, Rt = (c && a || !c && !a) && j + v >= q;
    if (Js.includes(r) && S && J && (r = et), r === us && (c ? J : S) && (r = ms), r === ms && (c ? S : J) && (r = us), r === ps && z && !W && (r = et), r === et && W && !z && (r = ps), Js.includes(r) && ot && dt(p[r], {
      top: "auto",
      bottom: 0
    }), Gs.includes(r) && (H || Rt)) {
      let k = { left: "auto", right: "auto" };
      !H && Rt && !c && (k = { left: "auto", right: 0 }), H && !Rt && c && (k = { left: 0, right: "auto" }), k && dt(p[r], k);
    }
    const pt = f[r];
    I(e, {
      ...p[r],
      margin: `${pt.map((k) => k && `${k}px`).join(" ")}`
    }), Gs.includes(r) && a && a && I(e, p[!c && H || c && Rt ? "menuStart" : (
      /* istanbul ignore next */
      "menuEnd"
    )]), w(n, to);
  }
}, Wi = (t) => [...t.children].map((s) => {
  if (s && tn.includes(s.tagName))
    return s;
  const { firstElementChild: e } = s;
  return e && tn.includes(e.tagName) ? e : null;
}).filter((s) => s), nn = (t) => {
  const { element: s, options: e } = t, n = t.open ? _ : B, o = E(s);
  n(o, N, on), n(o, ws, on), n(o, Oe, ji), n(o, Fo, zi), e.display === "dynamic" && [Be, _e].forEach((i) => {
    n(qt(s), i, Vi, st);
  });
}, je = (t) => {
  const s = [...Ot, "btn-group", "input-group"].map((e) => rt(`${e} ${m}`, E(t))).find((e) => e.length);
  if (s && s.length)
    return [...s[0].children].find(
      (e) => Ot.some((n) => n === it(e, ct))
    );
}, on = (t) => {
  const { target: s, type: e } = t;
  if (s && y(s)) {
    const n = je(s), o = n && Yt(n);
    if (o) {
      const { parentElement: i, menu: c } = o, a = i && i.contains(s) && (s.tagName === "form" || M(s, "form") !== null);
      [N, Mn].includes(e) && Gn(s) && t.preventDefault(), !a && e !== ws && s !== n && s !== c && o.hide();
    }
  }
}, Fi = (t) => {
  const { target: s } = t, e = s && M(s, Jn), n = e && Yt(e);
  n && (t.stopPropagation(), n.toggle(), e && Gn(e) && t.preventDefault());
}, ji = (t) => {
  [as, rs].includes(t.code) && t.preventDefault();
};
function zi(t) {
  const { code: s } = t, e = je(this), n = e && Yt(e), { activeElement: o } = e && E(e);
  if (n && o) {
    const { menu: i, open: c } = n, a = Wi(i);
    if (a && a.length && [as, rs].includes(s)) {
      let l = a.indexOf(o);
      o === e ? l = 0 : s === rs ? l = l > 1 ? l - 1 : 0 : s === as && (l = l < a.length - 1 ? l + 1 : l), a[l] && ht(a[l]);
    }
    ys === s && c && (n.toggle(), ht(e));
  }
}
function Vi() {
  const t = je(this), s = t && Yt(t);
  s && s.open && eo(s);
}
class ae extends nt {
  /**
   * @param target Element or string selector
   * @param config the instance options
   */
  constructor(e, n) {
    super(e, n);
    /**
     * Toggles on/off the `click` event listener of the `Dropdown`.
     *
     * @param add when `true`, it will add the event listener
     */
    d(this, "_toggleEventListeners", (e) => {
      (e ? _ : B)(this.element, N, Fi);
    });
    const { parentElement: o } = this.element, [i] = rt(Zn, o);
    i && (this.parentElement = o, this.menu = i, this._toggleEventListeners(!0));
  }
  /**
   * Returns component name string.
   */
  get name() {
    return Qn;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return Ri;
  }
  // DROPDOWN PUBLIC METHODS
  // =======================
  /** Shows/hides the dropdown menu to the user. */
  toggle() {
    this.open ? this.hide() : this.show();
  }
  /** Shows the dropdown menu to the user. */
  show() {
    const { element: e, open: n, menu: o, parentElement: i } = this;
    if (!n) {
      const c = je(e), a = c && Yt(c);
      a && a.hide(), [es, en, to].forEach((l) => {
        l.relatedTarget = e;
      }), w(i, es), es.defaultPrevented || (g(o, m), g(i, m), O(e, De, "true"), eo(this), this.open = !n, ht(e), nn(this), w(i, en));
    }
  }
  /** Hides the dropdown menu from the user. */
  hide() {
    const { element: e, open: n, menu: o, parentElement: i } = this;
    n && ([ss, sn].forEach((c) => {
      c.relatedTarget = e;
    }), w(i, ss), ss.defaultPrevented || (b(o, m), b(i, m), O(e, De, "false"), this.open = !n, nn(this), w(i, sn)));
  }
  /** Removes the `Dropdown` component from the target element. */
  dispose() {
    this.open && this.hide(), this._toggleEventListeners(), super.dispose();
  }
}
d(ae, "selector", Jn), d(ae, "init", _i), d(ae, "getInstance", Yt);
const U = "modal", Hs = "Modal", xs = "Offcanvas", Ki = "fixed-top", Xi = "fixed-bottom", so = "sticky-top", no = "position-sticky", oo = (t) => [
  ...rt(Ki, t),
  ...rt(Xi, t),
  ...rt(so, t),
  ...rt(no, t),
  ...rt("is-fixed", t)
], Yi = (t) => {
  const s = St(t);
  I(s, {
    paddingRight: "",
    overflow: ""
  });
  const e = oo(s);
  e.length && e.forEach((n) => {
    I(n, {
      paddingRight: "",
      marginRight: ""
    });
  });
}, io = (t) => {
  const { clientWidth: s } = ft(t), { innerWidth: e } = qt(t);
  return Math.abs(e - s);
}, co = (t, s) => {
  const e = St(t), n = parseInt(V(e, "paddingRight"), 10), i = V(e, "overflow") === "hidden" && n ? 0 : io(t), c = oo(e);
  s && (I(e, {
    overflow: "hidden",
    paddingRight: `${n + i}px`
  }), c.length && c.forEach((a) => {
    const l = V(a, "paddingRight");
    if (a.style.paddingRight = `${parseInt(l, 10) + i}px`, [so, no].some((r) => h(a, r))) {
      const r = V(a, "marginRight");
      a.style.marginRight = `${parseInt(r, 10) - i}px`;
    }
  }));
}, Z = "offcanvas", yt = $t({ tagName: "div", className: "popup-container" }), ao = (t, s) => {
  const e = L(s) && s.nodeName === "BODY", n = L(s) && !e ? s : yt, o = e ? s : St(t);
  L(t) && (n === yt && o.append(yt), n.append(t));
}, ro = (t, s) => {
  const e = L(s) && s.nodeName === "BODY", n = L(s) && !e ? s : yt;
  L(t) && (t.remove(), n === yt && !yt.children.length && yt.remove());
}, Ps = (t, s) => {
  const e = L(s) && s.nodeName !== "BODY" ? s : yt;
  return L(t) && e.contains(t);
}, lo = "backdrop", cn = `${U}-${lo}`, an = `${Z}-${lo}`, ho = `.${U}.${m}`, Ds = `.${Z}.${m}`, A = $t("div"), _t = (t) => P(`${ho},${Ds}`, E(t)), As = (t) => {
  const s = t ? cn : an;
  [cn, an].forEach((e) => {
    b(A, e);
  }), g(A, s);
}, fo = (t, s, e) => {
  As(e), ao(A, St(t)), s && g(A, R);
}, go = () => {
  h(A, m) || (g(A, m), Mt(A));
}, ze = () => {
  b(A, m);
}, po = (t) => {
  _t(t) || (b(A, R), ro(A, St(t)), Yi(t));
}, uo = (t) => y(t) && V(t, "visibility") !== "hidden" && t.offsetParent !== null, Ui = `.${U}`, mo = `[${ct}="${U}"]`, qi = `[${We}="${U}"]`, vo = `${U}-static`, Qi = {
  backdrop: !0,
  keyboard: !0
}, pe = (t) => F(t, Hs), Zi = (t) => new re(t), xe = $(`show.bs.${U}`), rn = $(`shown.bs.${U}`), ns = $(`hide.bs.${U}`), ln = $(`hidden.bs.${U}`), bo = (t) => {
  const { element: s } = t, e = io(s), { clientHeight: n, scrollHeight: o } = ft(s), { clientHeight: i, scrollHeight: c } = s, a = i !== c;
  if (!a && e) {
    const l = Ct(s) ? (
      /* istanbul ignore next */
      "paddingLeft"
    ) : "paddingRight", r = {};
    r[l] = `${e}px`, I(s, r);
  }
  co(s, a || n !== o);
}, wo = (t, s) => {
  const e = s ? _ : B, { element: n, update: o } = t;
  e(n, N, tc), e(qt(n), _e, o, st), e(E(n), Oe, Ji);
}, dn = (t) => {
  const { triggers: s, element: e, relatedTarget: n } = t;
  po(e), I(e, { paddingRight: "", display: "" }), wo(t);
  const o = xe.relatedTarget || s.find(uo);
  o && ht(o), ln.relatedTarget = n, w(e, ln);
}, hn = (t) => {
  const { element: s, relatedTarget: e } = t;
  ht(s), wo(t, !0), rn.relatedTarget = e, w(s, rn);
}, fn = (t) => {
  const { element: s, hasFade: e } = t;
  I(s, { display: "block" }), bo(t), _t(s) || I(St(s), { overflow: "hidden" }), g(s, m), kt(s, ke), O(s, Ne, "true"), e ? x(s, () => hn(t)) : hn(t);
}, gn = (t) => {
  const { element: s, options: e, hasFade: n } = t;
  e.backdrop && n && h(A, m) && !_t(s) ? (ze(), x(A, () => dn(t))) : dn(t);
}, Gi = (t) => {
  const { target: s } = t, e = s && M(s, mo), n = e && X(e), o = n && pe(n);
  o && (e && e.tagName === "A" && t.preventDefault(), o.relatedTarget = e, o.toggle());
}, Ji = ({ code: t, target: s }) => {
  const e = P(ho, E(s)), n = e && pe(e);
  if (n) {
    const { options: o } = n;
    o.keyboard && t === ys && // the keyboard option is enabled and the key is 27
    h(e, m) && (n.relatedTarget = null, n.hide());
  }
}, tc = (t) => {
  var n, o;
  const { currentTarget: s } = t, e = s ? pe(s) : null;
  if (e && s && !u.get(s)) {
    const { options: i, isStatic: c, modalDialog: a } = e, { backdrop: l } = i, { target: r } = t, f = (o = (n = E(s)) == null ? void 0 : n.getSelection()) == null ? void 0 : o.toString().length, p = a.contains(r), v = r && M(r, qi);
    c && !p ? u.set(
      s,
      () => {
        g(s, vo), x(a, () => ec(e));
      },
      17
    ) : (v || !f && !c && !p && l) && (e.relatedTarget = v || null, e.hide(), t.preventDefault());
  }
}, ec = (t) => {
  const { element: s, modalDialog: e } = t, n = (Kt(e) || 0) + 17;
  b(s, vo), u.set(s, () => u.clear(s), n);
};
class re extends nt {
  /**
   * @param target usually the `.modal` element
   * @param config instance options
   */
  constructor(e, n) {
    super(e, n);
    /**
     * Updates the modal layout.
     */
    d(this, "update", () => {
      h(this.element, m) && bo(this);
    });
    /**
     * Toggles on/off the `click` event listener of the `Modal` instance.
     *
     * @param add when `true`, event listener(s) is/are added
     */
    d(this, "_toggleEventListeners", (e) => {
      const n = e ? _ : B, { triggers: o } = this;
      o.length && o.forEach((i) => n(i, N, Gi));
    });
    const { element: o } = this, i = P(`.${U}-dialog`, o);
    i && (this.modalDialog = i, this.triggers = [...tt(mo, E(o))].filter(
      (c) => X(c) === o
    ), this.isStatic = this.options.backdrop === "static", this.hasFade = h(o, R), this.relatedTarget = null, this._toggleEventListeners(!0));
  }
  /**
   * Returns component name string.
   */
  get name() {
    return Hs;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return Qi;
  }
  // MODAL PUBLIC METHODS
  // ====================
  /** Toggles the visibility of the modal. */
  toggle() {
    h(this.element, m) ? this.hide() : this.show();
  }
  /** Shows the modal to the user. */
  show() {
    const { element: e, options: n, hasFade: o, relatedTarget: i } = this, { backdrop: c } = n;
    let a = 0;
    if (!h(e, m) && (xe.relatedTarget = i || void 0, w(e, xe), !xe.defaultPrevented)) {
      const l = _t(e);
      if (l && l !== e) {
        const r = pe(l) || /* istanbul ignore next */
        F(l, xs);
        r && r.hide();
      }
      c ? (Ps(A) ? As(!0) : fo(e, o, !0), a = Kt(A), go(), setTimeout(() => fn(this), a)) : (fn(this), l && h(A, m) && ze());
    }
  }
  /** Hide the modal from the user. */
  hide() {
    const { element: e, hasFade: n, relatedTarget: o } = this;
    h(e, m) && (ns.relatedTarget = o || void 0, w(e, ns), ns.defaultPrevented || (b(e, m), O(e, ke, "true"), kt(e, Ne), n ? x(e, () => gn(this)) : gn(this)));
  }
  /** Removes the `Modal` component from target element. */
  dispose() {
    const e = { ...this }, { element: n, modalDialog: o } = e, i = () => super.dispose();
    this._toggleEventListeners(), this.hide(), h(n, "fade") ? x(o, i) : i();
  }
}
d(re, "selector", Ui), d(re, "init", Zi), d(re, "getInstance", pe);
const sc = `.${Z}`, Ls = `[${ct}="${Z}"]`, nc = `[${We}="${Z}"]`, Ve = `${Z}-toggling`, oc = {
  backdrop: !0,
  // boolean
  keyboard: !0,
  // boolean
  scroll: !1
  // boolean
}, ue = (t) => F(t, xs), ic = (t) => new le(t), Pe = $(`show.bs.${Z}`), Eo = $(`shown.bs.${Z}`), os = $(`hide.bs.${Z}`), $o = $(`hidden.bs.${Z}`), cc = (t) => {
  const { element: s } = t, { clientHeight: e, scrollHeight: n } = ft(s);
  co(s, e !== n);
}, To = (t, s) => {
  const e = s ? _ : B, n = E(t.element);
  e(n, Oe, dc), e(n, N, lc);
}, pn = (t) => {
  const { element: s, options: e } = t;
  e.scroll || (cc(t), I(St(s), { overflow: "hidden" })), g(s, Ve), g(s, m), I(s, { visibility: "visible" }), x(s, () => hc(t));
}, ac = (t) => {
  const { element: s, options: e } = t, n = _t(s);
  s.blur(), !n && e.backdrop && h(A, m) && ze(), x(s, () => fc(t));
}, rc = (t) => {
  const s = M(t.target, Ls), e = s && X(s), n = e && ue(e);
  n && (n.relatedTarget = s, n.toggle(), s && s.tagName === "A" && t.preventDefault());
}, lc = (t) => {
  const { target: s } = t, e = P(Ds, E(s)), n = P(nc, e), o = e && ue(e);
  if (o) {
    const { options: i, triggers: c } = o, { backdrop: a } = i, l = M(s, Ls), r = E(e).getSelection();
    (!A.contains(s) || a !== "static") && (!(r && r.toString().length) && (!e.contains(s) && a && /* istanbul ignore next */
    (!l || c.includes(s)) || n && n.contains(s)) && (o.relatedTarget = n && n.contains(s) ? n : null, o.hide()), l && l.tagName === "A" && t.preventDefault());
  }
}, dc = ({ code: t, target: s }) => {
  const e = P(Ds, E(s)), n = e && ue(e);
  n && n.options.keyboard && t === ys && (n.relatedTarget = null, n.hide());
}, hc = (t) => {
  const { element: s } = t;
  b(s, Ve), kt(s, ke), O(s, Ne, "true"), O(s, "role", "dialog"), w(s, Eo), To(t, !0), ht(s);
}, fc = (t) => {
  const { element: s, triggers: e } = t;
  O(s, ke, "true"), kt(s, Ne), kt(s, "role"), I(s, { visibility: "" });
  const n = Pe.relatedTarget || e.find(uo);
  n && ht(n), po(s), w(s, $o), b(s, Ve), _t(s) || To(t);
};
class le extends nt {
  /**
   * @param target usually an `.offcanvas` element
   * @param config instance options
   */
  constructor(e, n) {
    super(e, n);
    /**
     * Toggles on/off the `click` event listeners.
     *
     * @param self the `Offcanvas` instance
     * @param add when *true*, listeners are added
     */
    d(this, "_toggleEventListeners", (e) => {
      const n = e ? _ : B;
      this.triggers.forEach((o) => n(o, N, rc));
    });
    const { element: o } = this;
    this.triggers = [...tt(Ls, E(o))].filter(
      (i) => X(i) === o
    ), this.relatedTarget = null, this._toggleEventListeners(!0);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return xs;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return oc;
  }
  // OFFCANVAS PUBLIC METHODS
  // ========================
  /** Shows or hides the offcanvas from the user. */
  toggle() {
    h(this.element, m) ? this.hide() : this.show();
  }
  /** Shows the offcanvas to the user. */
  show() {
    const { element: e, options: n, relatedTarget: o } = this;
    let i = 0;
    if (!h(e, m) && (Pe.relatedTarget = o || void 0, Eo.relatedTarget = o || void 0, w(e, Pe), !Pe.defaultPrevented)) {
      const c = _t(e);
      if (c && c !== e) {
        const a = ue(c) || /* istanbul ignore next */
        F(c, Hs);
        a && a.hide();
      }
      n.backdrop ? (Ps(A) ? As() : fo(e, !0), i = Kt(A), go(), setTimeout(() => pn(this), i)) : (pn(this), c && h(A, m) && ze());
    }
  }
  /** Hides the offcanvas from the user. */
  hide() {
    const { element: e, relatedTarget: n } = this;
    h(e, m) && (os.relatedTarget = n || void 0, $o.relatedTarget = n || void 0, w(e, os), os.defaultPrevented || (g(e, Ve), b(e, m), ac(this)));
  }
  /** Removes the `Offcanvas` from the target element. */
  dispose() {
    const e = { ...this }, { element: n, options: o } = e, i = o.backdrop ? Kt(A) : (
      /* istanbul ignore next */
      0
    ), c = () => setTimeout(() => super.dispose(), i + 17);
    this._toggleEventListeners(), this.hide(), h(n, m) ? x(n, c) : c();
  }
}
d(le, "selector", sc), d(le, "init", ic), d(le, "getInstance", ue);
const It = "popover", Ke = "Popover", lt = "tooltip", yo = (t) => {
  const s = t === lt, e = s ? `${t}-inner` : `${t}-body`, n = s ? "" : `<h3 class="${t}-header"></h3>`, o = `<div class="${t}-arrow"></div>`, i = `<div class="${e}"></div>`;
  return `<div class="${t}" role="${lt}">${n + o + i}</div>`;
}, Co = {
  top: "top",
  bottom: "bottom",
  left: "start",
  right: "end"
}, vs = (t) => {
  const s = /\b(top|bottom|start|end)+/, { element: e, tooltip: n, container: o, options: i, arrow: c } = t;
  if (n) {
    const a = { ...Co }, l = Ct(e);
    I(n, {
      // top: '0px', left: '0px', right: '', bottom: '',
      top: "",
      left: "",
      right: "",
      bottom: ""
    });
    const r = t.name === Ke, { offsetWidth: f, offsetHeight: p } = n, { clientWidth: v, clientHeight: D, offsetWidth: q } = ft(e);
    let { placement: T } = i;
    const { clientWidth: j, offsetWidth: Y } = o, at = V(o, "position") === "fixed", S = Math.abs(at ? j - Y : v - q), J = l && at ? (
      /* istanbul ignore next */
      S
    ) : 0, ot = v - (l ? 0 : S) - 1, {
      width: W,
      height: z,
      left: H,
      right: Rt,
      top: pt
    } = we(e, !0), { x: k, y: ut } = {
      x: H,
      y: pt
    };
    I(c, {
      top: "",
      left: "",
      right: "",
      bottom: ""
    });
    let Ht = 0, Qt = "", mt = 0, Xe = "", Wt = "", Te = "", Ye = "";
    const xt = c.offsetWidth || 0, vt = c.offsetHeight || 0, Ue = xt / 2;
    let Zt = pt - p - vt < 0, Gt = pt + p + z + vt >= D, Jt = H - f - xt < J, te = H + f + W + xt >= ot;
    const ye = ["left", "right"], qe = ["top", "bottom"];
    Zt = ye.includes(T) ? pt + z / 2 - p / 2 - vt < 0 : Zt, Gt = ye.includes(T) ? pt + p / 2 + z / 2 + vt >= D : Gt, Jt = qe.includes(T) ? H + W / 2 - f / 2 < J : Jt, te = qe.includes(T) ? H + f / 2 + W / 2 >= ot : te, T = ye.includes(T) && Jt && te ? "top" : T, T = T === "top" && Zt ? "bottom" : T, T = T === "bottom" && Gt ? "top" : T, T = T === "left" && Jt ? "right" : T, T = T === "right" && te ? (
      /* istanbul ignore next */
      "left"
    ) : T, n.className.includes(T) || (n.className = n.className.replace(s, a[T])), ye.includes(T) ? (T === "left" ? mt = k - f - (r ? xt : 0) : mt = k + W + (r ? xt : 0), Zt && Gt ? (Ht = 0, Qt = 0, Wt = pt + z / 2 - vt / 2) : Zt ? (Ht = ut, Qt = "", Wt = z / 2 - xt) : Gt ? (Ht = ut - p + z, Qt = "", Wt = p - z / 2 - xt) : (Ht = ut - p / 2 + z / 2, Wt = p / 2 - vt / 2)) : qe.includes(T) && (T === "top" ? Ht = ut - p - (r ? vt : 0) : Ht = ut + z + (r ? vt : 0), Jt ? (mt = 0, Te = k + W / 2 - Ue) : te ? (mt = "auto", Xe = 0, Ye = W / 2 + ot - Rt - Ue) : (mt = k - f / 2 + W / 2, Te = f / 2 - Ue)), I(n, {
      top: `${Ht}px`,
      bottom: Qt === "" ? "" : `${Qt}px`,
      left: mt === "auto" ? mt : `${mt}px`,
      right: Xe !== "" ? `${Xe}px` : ""
    }), y(c) && (Wt !== "" && (c.style.top = `${Wt}px`), Te !== "" ? c.style.left = `${Te}px` : Ye !== "" && (c.style.right = `${Ye}px`));
    const _o = $(`updated.bs.${Xt(t.name)}`);
    w(e, _o);
  }
}, bs = {
  template: yo(lt),
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
}, So = "data-original-title", Pt = "Tooltip", wt = (t, s, e) => {
  if (be(s) && s.length) {
    let n = s.trim();
    ci(e) && (n = e(n));
    const i = new DOMParser().parseFromString(n, "text/html");
    t.append(...i.body.childNodes);
  } else
    y(s) ? t.append(s) : (ai(s) || ii(s) && s.every(L)) && t.append(...s);
}, gc = (t) => {
  const s = t.name === Pt, { id: e, element: n, options: o } = t, { title: i, placement: c, template: a, animation: l, customClass: r, sanitizeFn: f, dismissible: p, content: v, btnClose: D } = o, q = s ? lt : It, T = { ...Co };
  let j = [], Y = [];
  Ct(n) && (T.left = "end", T.right = "start");
  const Bt = `bs-${q}-${T[c]}`;
  let at;
  if (y(a))
    at = a;
  else {
    const J = $t("div");
    wt(J, a, f), at = J.firstChild;
  }
  t.tooltip = y(at) ? at.cloneNode(!0) : (
    /* istanbul ignore next */
    void 0
  );
  const { tooltip: S } = t;
  if (S) {
    O(S, "id", e), O(S, "role", lt);
    const J = s ? `${lt}-inner` : `${It}-body`, ot = s ? null : P(`.${It}-header`, S), W = P(`.${J}`, S);
    t.arrow = P(`.${q}-arrow`, S);
    const { arrow: z } = t;
    if (y(i))
      j = [i.cloneNode(!0)];
    else {
      const H = $t("div");
      wt(H, i, f), j = [...H.childNodes];
    }
    if (y(v))
      Y = [v.cloneNode(!0)];
    else {
      const H = $t("div");
      wt(H, v, f), Y = [...H.childNodes];
    }
    if (p)
      if (i)
        if (y(D))
          j = [...j, D.cloneNode(!0)];
        else {
          const H = $t("div");
          wt(H, D, f), j = [...j, H.firstChild];
        }
      else if (ot && ot.remove(), y(D))
        Y = [...Y, D.cloneNode(!0)];
      else {
        const H = $t("div");
        wt(H, D, f), Y = [...Y, H.firstChild];
      }
    s ? i && W && wt(W, i, f) : (i && ot && wt(ot, j, f), v && W && wt(W, Y, f), t.btn = P(".btn-close", S) || void 0), g(S, "position-fixed"), g(z, "position-absolute"), h(S, q) || g(S, q), l && !h(S, R) && g(S, R), r && !h(S, r) && g(S, r), h(S, Bt) || g(S, Bt);
  }
}, pc = (t) => {
  const s = ["HTML", "BODY"], e = [];
  let { parentNode: n } = t;
  for (; n && !s.includes(n.nodeName); )
    n = oi(n), Rn(n) || ri(n) || e.push(n);
  return e.find((o, i) => V(o, "position") !== "relative" && e.slice(i + 1).every((c) => V(c, "position") === "static") ? o : null) || /* istanbul ignore next: optional guard */
  E(t).body;
}, uc = `[${ct}="${lt}"],[data-tip="${lt}"]`, Ho = "title";
let un = (t) => F(t, Pt);
const mc = (t) => new Dt(t), vc = (t) => {
  const { element: s, tooltip: e, container: n, offsetParent: o } = t;
  kt(s, Nn), ro(e, n === o ? n : o);
}, ee = (t) => {
  const { tooltip: s, container: e, offsetParent: n } = t;
  return s && Ps(s, e === n ? e : n);
}, bc = (t, s) => {
  const { element: e } = t;
  t._toggleEventListeners(), Ie(e, So) && t.name === Pt && Po(t), s && s();
}, xo = (t, s) => {
  const e = s ? _ : B, { element: n } = t;
  e(E(n), Ts, t.handleTouch, st), [Be, _e].forEach((o) => {
    e(qt(n), o, t.update, st);
  });
}, mn = (t) => {
  const { element: s } = t, e = $(`shown.bs.${Xt(t.name)}`);
  xo(t, !0), w(s, e), u.clear(s, "in");
}, vn = (t) => {
  const { element: s } = t, e = $(`hidden.bs.${Xt(t.name)}`);
  xo(t), vc(t), w(s, e), u.clear(s, "out");
}, bn = (t, s) => {
  const e = s ? _ : B, { element: n, container: o, offsetParent: i } = t, { offsetHeight: c, scrollHeight: a } = o, l = M(n, `.${U}`), r = M(n, `.${Z}`), f = qt(n), v = o === i && c !== a ? o : f;
  e(v, _e, t.update, st), e(v, Be, t.update, st), l && e(l, `hide.bs.${U}`, t.handleHide), r && e(r, `hide.bs.${Z}`, t.handleHide);
}, Po = (t, s) => {
  const e = [So, Ho], { element: n } = t;
  O(
    n,
    e[s ? 0 : 1],
    s || it(n, e[0]) || /* istanbul ignore next */
    ""
  ), kt(n, e[s ? 1 : 0]);
};
class Dt extends nt {
  /**
   * @param target the target element
   * @param config the instance options
   */
  constructor(e, n) {
    super(e, n);
    // TOOLTIP PUBLIC METHODS
    // ======================
    /** Handles the focus event on iOS. */
    d(this, "handleFocus", () => ht(this.element));
    /** Shows the tooltip. */
    d(this, "handleShow", () => this.show());
    /** Hides the tooltip. */
    d(this, "handleHide", () => this.hide());
    /** Updates the tooltip position. */
    d(this, "update", () => {
      vs(this);
    });
    /** Toggles the tooltip visibility. */
    d(this, "toggle", () => {
      const { tooltip: e } = this;
      e && !ee(this) ? this.show() : this.hide();
    });
    /**
     * Handles the `touchstart` event listener for `Tooltip`
     *
     * @this {Tooltip}
     * @param {TouchEvent} e the `Event` object
     */
    d(this, "handleTouch", ({ target: e }) => {
      const { tooltip: n, element: o } = this;
      n && n.contains(e) || e === o || e && o.contains(e) || this.hide();
    });
    /**
     * Toggles on/off the `Tooltip` event listeners.
     *
     * @param add when `true`, event listeners are added
     */
    d(this, "_toggleEventListeners", (e) => {
      const n = e ? _ : B, { element: o, options: i, btn: c } = this, { trigger: a } = i, r = !!(this.name !== Pt && i.dismissible);
      a.includes("manual") || (this.enabled = !!e, a.split(" ").forEach((p) => {
        p === jo ? (n(o, Mn, this.handleShow), n(o, Me, this.handleShow), r || (n(o, $s, this.handleHide), n(E(o), Ts, this.handleTouch, st))) : p === N ? n(o, p, r ? this.handleShow : this.toggle) : p === ws && (n(o, Es, this.handleShow), r || n(o, On, this.handleHide), Zo && n(o, N, this.handleFocus)), r && c && n(c, N, this.handleHide);
      }));
    });
    const { element: o } = this, i = this.name === Pt, c = i ? lt : It, a = i ? Pt : Ke;
    un = (r) => F(r, a), this.enabled = !0, this.id = `${c}-${Wn(o, c)}`;
    const { options: l } = this;
    !l.title && i || !i && !l.content || (dt(bs, { titleAttr: "" }), Ie(o, Ho) && i && typeof l.title == "string" && Po(this, l.title), this.container = pc(o), this.offsetParent = ["sticky", "fixed"].some(
      (r) => V(this.container, "position") === r
    ) ? this.container : E(this.element).body, gc(this), this._toggleEventListeners(!0));
  }
  /**
   * Returns component name string.
   */
  get name() {
    return Pt;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return bs;
  }
  show() {
    const { options: e, tooltip: n, element: o, container: i, offsetParent: c, id: a } = this, { animation: l } = e, r = u.get(o, "out"), f = i === c ? i : c;
    u.clear(o, "out"), n && !r && !ee(this) && u.set(
      o,
      () => {
        const p = $(`show.bs.${Xt(this.name)}`);
        w(o, p), p.defaultPrevented || (ao(n, f), O(o, Nn, `#${a}`), this.update(), bn(this, !0), h(n, m) || g(n, m), l ? x(n, () => mn(this)) : mn(this));
      },
      17,
      "in"
    );
  }
  hide() {
    const { options: e, tooltip: n, element: o } = this, { animation: i, delay: c } = e;
    u.clear(o, "in"), n && ee(this) && u.set(
      o,
      () => {
        const a = $(`hide.bs.${Xt(this.name)}`);
        w(o, a), a.defaultPrevented || (this.update(), b(n, m), bn(this), i ? x(n, () => vn(this)) : vn(this));
      },
      c + 17,
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
    const { tooltip: e, options: n, enabled: o } = this, { animation: i } = n;
    o && (e && ee(this) && i ? (this.hide(), x(e, () => this._toggleEventListeners())) : this._toggleEventListeners(), this.enabled = !o);
  }
  /** Toggles the `disabled` property. */
  toggleEnabled() {
    this.enabled ? this.disable() : this.enable();
  }
  /** Removes the `Tooltip` from the target element. */
  dispose() {
    const { tooltip: e, options: n } = this, o = { ...this, name: this.name }, i = () => setTimeout(() => bc(o, () => super.dispose()), 17);
    n.animation && ee(o) ? (this.options.delay = 0, this.hide(), x(e, i)) : i();
  }
}
d(Dt, "selector", uc), d(Dt, "init", mc), d(Dt, "getInstance", un), d(Dt, "styleTip", vs);
const wc = `[${ct}="${It}"],[data-tip="${It}"]`, Ec = dt({}, bs, {
  template: yo(It),
  content: "",
  dismissible: !1,
  btnClose: '<button class="btn-close" aria-label="Close"></button>'
}), $c = (t) => F(t, Ke), Tc = (t) => new zt(t);
class zt extends Dt {
  /**
   * @param target the target element
   * @param config the instance options
   */
  constructor(e, n) {
    super(e, n);
    /* extend original `show()` */
    d(this, "show", () => {
      super.show();
      const { options: e, btn: n } = this;
      e.dismissible && n && setTimeout(() => ht(n), 17);
    });
  }
  /**
   * Returns component name string.
   */
  get name() {
    return Ke;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return Ec;
  }
}
d(zt, "selector", wc), d(zt, "init", Tc), d(zt, "getInstance", $c), d(zt, "styleTip", vs);
const yc = "scrollspy", Do = "ScrollSpy", Cc = '[data-bs-spy="scroll"]', Sc = {
  offset: 10,
  target: null
}, Hc = (t) => F(t, Do), xc = (t) => new de(t), wn = $(`activate.bs.${yc}`), Pc = (t) => {
  const { target: s, scrollTarget: e, options: n, itemsLength: o, scrollHeight: i, element: c } = t, { offset: a } = n, l = Cs(e), r = s && Ss("A", s), f = e ? Ao(e) : (
    /* istanbul ignore next */
    i
  );
  if (t.scrollTop = l ? e.scrollY : e.scrollTop, r && (f !== i || o !== r.length)) {
    let p, v, D;
    t.items = [], t.offsets = [], t.scrollHeight = f, t.maxScroll = t.scrollHeight - Dc(t), [...r].forEach((q) => {
      p = it(q, "href"), v = p && p.charAt(0) === "#" && p.slice(-1) !== "#" && P(p, E(c)), v && (t.items.push(q), D = we(v), t.offsets.push((l ? D.top + t.scrollTop : v.offsetTop) - a));
    }), t.itemsLength = t.items.length;
  }
}, Ao = (t) => y(t) ? t.scrollHeight : ft(t).scrollHeight, Dc = ({ element: t, scrollTarget: s }) => Cs(s) ? s.innerHeight : we(t).height, Lo = (t) => {
  [...Ss("A", t)].forEach((s) => {
    h(s, C) && b(s, C);
  });
}, En = (t, s) => {
  const { target: e, element: n } = t;
  y(e) && Lo(e), t.activeItem = s, g(s, C);
  const o = [];
  let i = s;
  for (; i !== St(n); )
    i = i.parentElement, (h(i, "nav") || h(i, "dropdown-menu")) && o.push(i);
  o.forEach((c) => {
    const a = c.previousElementSibling;
    a && !h(a, C) && g(a, C);
  }), wn.relatedTarget = s, w(n, wn);
};
class de extends nt {
  /**
   * @param target the target element
   * @param config the instance options
   */
  constructor(e, n) {
    super(e, n);
    /* eslint-enable */
    // SCROLLSPY PUBLIC METHODS
    // ========================
    /** Updates all items. */
    d(this, "refresh", () => {
      const { target: e } = this;
      if (y(e) && e.offsetHeight > 0) {
        Pc(this);
        const { scrollTop: n, maxScroll: o, itemsLength: i, items: c, activeItem: a } = this;
        if (n >= o) {
          const r = c[i - 1];
          a !== r && En(this, r);
          return;
        }
        const { offsets: l } = this;
        if (a && n < l[0] && l[0] > 0) {
          this.activeItem = null, e && Lo(e);
          return;
        }
        c.forEach((r, f) => {
          a !== r && n >= l[f] && (typeof l[f + 1] > "u" || n < l[f + 1]) && En(this, r);
        });
      }
    });
    /**
     * Toggles on/off the component event listener.
     *
     * @param add when `true`, listener is added
     */
    d(this, "_toggleEventListeners", (e) => {
      (e ? _ : B)(this.scrollTarget, Be, this.refresh, st);
    });
    const { element: o, options: i } = this;
    this.target = P(i.target, E(o)), this.target && (this.scrollTarget = o.clientHeight < o.scrollHeight ? o : qt(o), this.scrollHeight = Ao(this.scrollTarget), this._toggleEventListeners(!0), this.refresh());
  }
  /* eslint-disable */
  /**
   * Returns component name string.
   */
  get name() {
    return Do;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return Sc;
  }
  /** Removes `ScrollSpy` from the target element. */
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
d(de, "selector", Cc), d(de, "init", xc), d(de, "getInstance", Hc);
const $e = "tab", Io = "Tab", $n = `[${ct}="${$e}"]`, ko = (t) => F(t, Io), Ac = (t) => new he(t), is = $(`show.bs.${$e}`), Tn = $(`shown.bs.${$e}`), cs = $(`hide.bs.${$e}`), yn = $(`hidden.bs.${$e}`), me = /* @__PURE__ */ new Map(), Cn = (t) => {
  const { tabContent: s, nav: e } = t;
  s && h(s, Nt) && (s.style.height = "", b(s, Nt)), e && u.clear(e);
}, Sn = (t) => {
  const { element: s, tabContent: e, content: n, nav: o } = t, { tab: i } = y(o) && me.get(o) || /* istanbul ignore next */
  { tab: null };
  if (e && n && h(n, R)) {
    const { currentHeight: c, nextHeight: a } = me.get(s) || /* istanbul ignore next */
    {
      currentHeight: 0,
      nextHeight: 0
    };
    c === a ? Cn(t) : setTimeout(() => {
      e.style.height = `${a}px`, Mt(e), x(e, () => Cn(t));
    }, 50);
  } else
    o && u.clear(o);
  Tn.relatedTarget = i, w(s, Tn);
}, Hn = (t) => {
  const { element: s, content: e, tabContent: n, nav: o } = t, { tab: i, content: c } = o && me.get(o) || /* istanbul ignore next */
  { tab: null, content: null };
  let a = 0;
  if (n && e && h(e, R) && ([c, e].forEach((l) => {
    y(l) && g(l, "overflow-hidden");
  }), a = y(c) ? c.scrollHeight : (
    /* istanbul ignore next */
    0
  )), is.relatedTarget = i, yn.relatedTarget = s, w(s, is), !is.defaultPrevented) {
    if (e && g(e, C), c && b(c, C), n && e && h(e, R)) {
      const l = e.scrollHeight;
      me.set(s, { currentHeight: a, nextHeight: l, tab: null, content: null }), g(n, Nt), n.style.height = `${a}px`, Mt(n), [c, e].forEach((r) => {
        r && b(r, "overflow-hidden");
      });
    }
    e && e && h(e, R) ? setTimeout(() => {
      g(e, m), x(e, () => {
        Sn(t);
      });
    }, 1) : (e && g(e, m), Sn(t)), i && w(i, yn);
  }
}, xn = (t) => {
  const { nav: s } = t;
  if (!y(s))
    return { tab: null, content: null };
  const e = rt(C, s);
  let n = null;
  e.length === 1 && !Ot.some((i) => h(e[0].parentElement, i)) ? [n] = e : e.length > 1 && (n = e[e.length - 1]);
  const o = y(n) ? X(n) : null;
  return { tab: n, content: o };
}, Pn = (t) => {
  if (!y(t))
    return null;
  const s = M(t, `.${Ot.join(",.")}`);
  return s ? P(`.${Ot[0]}-toggle`, s) : null;
}, Lc = (t) => {
  const s = ko(t.target);
  s && (t.preventDefault(), s.show());
};
class he extends nt {
  /** @param target the target element */
  constructor(e) {
    super(e);
    /**
     * Toggles on/off the `click` event listener.
     *
     * @param add when `true`, event listener is added
     */
    d(this, "_toggleEventListeners", (e) => {
      (e ? _ : B)(this.element, N, Lc);
    });
    const { element: n } = this, o = X(n);
    if (o) {
      const i = M(n, ".nav"), c = M(o, ".tab-content");
      this.nav = i, this.content = o, this.tabContent = c, this.dropdown = Pn(n);
      const { tab: a } = xn(this);
      if (i && !a) {
        const l = P($n, i), r = l && X(l);
        r && (g(l, C), g(r, m), g(r, C), O(n, Qe, "true"));
      }
      this._toggleEventListeners(!0);
    }
  }
  /**
   * Returns component name string.
   */
  get name() {
    return Io;
  }
  // TAB PUBLIC METHODS
  // ==================
  /** Shows the tab to the user. */
  show() {
    const { element: e, content: n, nav: o, dropdown: i } = this;
    if (!(o && u.get(o)) && !h(e, C)) {
      const { tab: c, content: a } = xn(this);
      if (o && me.set(o, { tab: c, content: a, currentHeight: 0, nextHeight: 0 }), cs.relatedTarget = e, y(c) && (w(c, cs), !cs.defaultPrevented)) {
        g(e, C), O(e, Qe, "true");
        const l = y(c) && Pn(c);
        if (l && h(l, C) && b(l, C), o) {
          const r = () => {
            c && (b(c, C), O(c, Qe, "false")), i && !h(i, C) && g(i, C);
          };
          a && (h(a, R) || n && h(n, R)) ? u.set(o, r, 1) : r();
        }
        a && (b(a, m), h(a, R) ? x(a, () => Hn(this)) : Hn(this));
      }
    }
  }
  /** Removes the `Tab` component from the target element. */
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
d(he, "selector", $n), d(he, "init", Ac), d(he, "getInstance", ko);
const G = "toast", No = "Toast", Ic = `.${G}`, kc = `[${We}="${G}"]`, Oo = `[${ct}="${G}"]`, Ut = "showing", Mo = "hide", Nc = {
  animation: !0,
  autohide: !0,
  delay: 5e3
}, Is = (t) => F(t, No), Oc = (t) => new fe(t), Dn = $(`show.bs.${G}`), Mc = $(`shown.bs.${G}`), An = $(`hide.bs.${G}`), _c = $(`hidden.bs.${G}`), Ln = (t) => {
  const { element: s, options: e } = t;
  b(s, Ut), u.clear(s, Ut), w(s, Mc), e.autohide && u.set(s, () => t.hide(), e.delay, G);
}, In = (t) => {
  const { element: s } = t;
  b(s, Ut), b(s, m), g(s, Mo), u.clear(s, G), w(s, _c);
}, Bc = (t) => {
  const { element: s, options: e } = t;
  g(s, Ut), e.animation ? (Mt(s), x(s, () => In(t))) : In(t);
}, Rc = (t) => {
  const { element: s, options: e } = t;
  u.set(
    s,
    () => {
      b(s, Mo), Mt(s), g(s, m), g(s, Ut), e.animation ? x(s, () => Ln(t)) : Ln(t);
    },
    17,
    Ut
  );
}, Wc = (t) => {
  u.clear(t.element, G), t._toggleEventListeners();
}, Fc = (t) => {
  const { target: s } = t, e = s && M(s, Oo), n = e && X(e), o = n && Is(n);
  o && (e && e.tagName === "A" && t.preventDefault(), o.relatedTarget = e, o.show());
}, jc = (t) => {
  const s = t.target, e = Is(s), { type: n, relatedTarget: o } = t;
  e && s !== o && !s.contains(o) && ([Me, Es].includes(n) ? u.clear(s, G) : u.set(s, () => e.hide(), e.options.delay, G));
};
class fe extends nt {
  /**
   * @param target the target `.toast` element
   * @param config the instance options
   */
  constructor(e, n) {
    super(e, n);
    // TOAST PUBLIC METHODS
    // ====================
    /** Shows the toast. */
    d(this, "show", () => {
      const { element: e, isShown: n } = this;
      e && !n && (w(e, Dn), Dn.defaultPrevented || Rc(this));
    });
    /** Hides the toast. */
    d(this, "hide", () => {
      const { element: e, isShown: n } = this;
      e && n && (w(e, An), An.defaultPrevented || Bc(this));
    });
    /**
     * Toggles on/off the `click` event listener.
     *
     * @param add when `true`, it will add the listener
     */
    d(this, "_toggleEventListeners", (e) => {
      const n = e ? _ : B, { element: o, triggers: i, dismiss: c, options: a, hide: l } = this;
      c && n(c, N, l), a.autohide && [Es, On, Me, $s].forEach(
        (r) => n(o, r, jc)
      ), i.length && i.forEach((r) => n(r, N, Fc));
    });
    const { element: o, options: i } = this;
    i.animation && !h(o, R) ? g(o, R) : !i.animation && h(o, R) && b(o, R), this.dismiss = P(kc, o), this.triggers = [...tt(Oo, E(o))].filter(
      (c) => X(c) === o
    ), this._toggleEventListeners(!0);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return No;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return Nc;
  }
  /**
   * Returns *true* when toast is visible.
   */
  get isShown() {
    return h(this.element, m);
  }
  /** Removes the `Toast` component from the target element. */
  dispose() {
    const { element: e, isShown: n } = this;
    n && b(e, m), Wc(this), super.dispose();
  }
}
d(fe, "selector", Ic), d(fe, "init", Oc), d(fe, "getInstance", Is);
const ks = /* @__PURE__ */ new Map();
[ne, oe, ie, ce, ae, re, le, zt, de, he, fe, Dt].forEach(
  (t) => ks.set(t.prototype.name, t)
);
const zc = (t, s) => {
  [...s].forEach((e) => t(e));
}, Vc = (t, s) => {
  const e = At.getAllFor(t);
  e && [...e].forEach(([n, o]) => {
    s.contains(n) && o.dispose();
  });
}, kn = (t) => {
  const s = t && t.nodeName ? t : document, e = [...Ss("*", s)];
  ks.forEach((n) => {
    const { init: o, selector: i } = n;
    zc(
      o,
      e.filter((c) => jn(c, i))
    );
  });
}, Xc = (t) => {
  const s = t && t.nodeName ? t : document;
  ks.forEach((e) => {
    Vc(e.prototype.name, s);
  });
};
document.body ? kn() : _(document, "DOMContentLoaded", () => kn(), { once: !0 });
export {
  ne as Alert,
  oe as Button,
  ie as Carousel,
  ce as Collapse,
  ae as Dropdown,
  re as Modal,
  le as Offcanvas,
  zt as Popover,
  de as ScrollSpy,
  he as Tab,
  fe as Toast,
  Dt as Tooltip,
  kn as initCallback,
  Xc as removeDataAPI
};
//# sourceMappingURL=bootstrap-native.mjs.map
