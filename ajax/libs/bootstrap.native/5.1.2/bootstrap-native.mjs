const xn = "aria-describedby", Ee = "aria-expanded", re = "aria-hidden", $e = "aria-modal", Cs = "aria-pressed", ke = "aria-selected", is = "focus", rs = "focusin", Sn = "focusout", ye = "keydown", Ro = "keyup", D = "click", Hn = "mousedown", Wo = "hover", Ce = "mouseenter", cs = "mouseleave", Fo = "pointerdown", jo = "pointermove", zo = "pointerup", as = "touchstart", Ko = "dragstart", Vo = 'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"]', Xe = "ArrowDown", qe = "ArrowUp", xs = "ArrowLeft", Ss = "ArrowRight", ls = "Escape", Xo = "transitionDuration", qo = "transitionDelay", Oe = "transitionend", _n = "transitionProperty", Uo = () => {
  const e = /(iPhone|iPod|iPad)/;
  return navigator?.userAgentData?.brands.some(
    (t) => e.test(t.brand)
  ) || e.test(
    navigator?.userAgent
  ) || !1;
}, Te = () => {
}, Yo = (e, t, s, n) => {
  e.addEventListener(
    t,
    s,
    !1
  );
}, Zo = (e, t, s, n) => {
  e.removeEventListener(
    t,
    s,
    !1
  );
}, Y = (e, t) => e.getAttribute(t), Jt = (e, t) => e.hasAttribute(t), L = (e, t, s) => e.setAttribute(t, s), Dt = (e, t) => e.removeAttribute(t), d = (e, ...t) => {
  e.classList.add(...t);
}, v = (e, ...t) => {
  e.classList.remove(...t);
}, h = (e, t) => e.classList.contains(t), ce = (e) => e != null && typeof e == "object" || !1, A = (e) => ce(e) && typeof e.nodeType == "number" && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].some(
  (t) => e.nodeType === t
) || !1, U = (e) => A(e) && e.nodeType === 1 || !1, jt = /* @__PURE__ */ new Map(), _t = {
  data: jt,
  set: (e, t, s) => {
    U(e) && (jt.has(t) || jt.set(t, /* @__PURE__ */ new Map()), jt.get(t).set(e, s));
  },
  getAllFor: (e) => jt.get(e) || null,
  get: (e, t) => {
    if (!U(e) || !t) return null;
    const s = _t.getAllFor(t);
    return e && s && s.get(e) || null;
  },
  remove: (e, t) => {
    const s = _t.getAllFor(t);
    !s || !U(e) || (s.delete(e), s.size === 0 && jt.delete(t));
  }
}, F = (e, t) => _t.get(e, t), Hs = (e) => e?.trim().replace(
  /(?:^\w|[A-Z]|\b\w)/g,
  (t, s) => s === 0 ? t.toLowerCase() : t.toUpperCase()
).replace(/\s+/g, ""), ae = (e) => typeof e == "string" || !1, An = (e) => ce(e) && e.constructor.name === "Window" || !1, Pn = (e) => A(e) && e.nodeType === 9 || !1, w = (e) => Pn(e) ? e : A(e) ? e.ownerDocument : An(e) ? e.document : globalThis.document, at = (e, ...t) => Object.assign(e, ...t), bt = (e) => {
  if (!e) return;
  if (ae(e))
    return w().createElement(e);
  const { tagName: t } = e, s = bt(t);
  if (!s) return;
  const n = { ...e };
  return delete n.tagName, at(s, n);
}, b = (e, t) => e.dispatchEvent(t), W = (e, t, s) => {
  const n = getComputedStyle(e, s), o = t.replace("webkit", "Webkit").replace(/([A-Z])/g, "-$1").toLowerCase();
  return n.getPropertyValue(o);
}, Qo = (e) => {
  const t = W(e, _n), s = W(e, qo), n = s.includes("ms") ? 1 : 1e3, o = t && t !== "none" ? parseFloat(s) * n : 0;
  return Number.isNaN(o) ? 0 : o;
}, le = (e) => {
  const t = W(e, _n), s = W(e, Xo), n = s.includes("ms") ? 1 : 1e3, o = t && t !== "none" ? parseFloat(s) * n : 0;
  return Number.isNaN(o) ? 0 : o;
}, S = (e, t) => {
  let s = 0;
  const n = new Event(Oe), o = le(e), i = Qo(e);
  if (o) {
    const r = (c) => {
      c.target === e && (t.apply(e, [c]), e.removeEventListener(Oe, r), s = 1);
    };
    e.addEventListener(Oe, r), setTimeout(() => {
      s || b(e, n);
    }, o + i + 17);
  } else
    t.apply(e, [n]);
}, lt = (e, t) => e.focus(t), _s = (e) => ["true", !0].includes(e) ? !0 : ["false", !1].includes(e) ? !1 : ["null", "", null, void 0].includes(e) ? null : e !== "" && !Number.isNaN(+e) ? +e : e, pe = (e) => Object.entries(e), Go = (e, t, s, n) => {
  if (!U(e)) return t;
  const o = { ...s }, i = { ...e.dataset }, r = { ...t }, c = {}, a = "title";
  return pe(i).forEach(([l, f]) => {
    const u = typeof l == "string" && l.includes(n) ? Hs(l.replace(n, "")) : Hs(l);
    c[u] = _s(f);
  }), pe(o).forEach(([l, f]) => {
    o[l] = _s(f);
  }), pe(t).forEach(([l, f]) => {
    l in o ? r[l] = o[l] : l in c ? r[l] = c[l] : r[l] = l === a ? Y(e, a) : f;
  }), r;
}, As = (e) => Object.keys(e), E = (e, t) => {
  const s = new CustomEvent(e, {
    cancelable: !0,
    bubbles: !0
  });
  return ce(t) && at(s, t), s;
}, te = { passive: !0 }, Ot = (e) => e.offsetHeight, H = (e, t) => {
  pe(t).forEach(([s, n]) => {
    if (n && ae(s) && s.includes("--"))
      e.style.setProperty(s, n);
    else {
      const o = {};
      o[s] = n, at(e.style, o);
    }
  });
}, Ue = (e) => ce(e) && e.constructor.name === "Map" || !1, Jo = (e) => typeof e == "number" || !1, pt = /* @__PURE__ */ new Map(), g = {
  set: (e, t, s, n) => {
    U(e) && (n && n.length ? (pt.has(e) || pt.set(e, /* @__PURE__ */ new Map()), pt.get(e).set(n, setTimeout(t, s))) : pt.set(e, setTimeout(t, s)));
  },
  get: (e, t) => {
    if (!U(e)) return null;
    const s = pt.get(e);
    return t && s && Ue(s) ? s.get(t) || null : Jo(s) ? s : null;
  },
  clear: (e, t) => {
    if (!U(e)) return;
    const s = pt.get(e);
    t && t.length && Ue(s) ? (clearTimeout(s.get(t)), s.delete(t), s.size === 0 && pt.delete(e)) : (clearTimeout(s), pt.delete(e));
  }
}, ee = (e) => e.toLowerCase(), q = (e, t) => (A(t) ? t : w()).querySelectorAll(e), ds = /* @__PURE__ */ new Map();
function Dn(e) {
  const { shiftKey: t, code: s } = e, n = w(this), o = [
    ...q(Vo, this)
  ].filter(
    (c) => !Jt(c, "disabled") && !Y(c, re)
  );
  if (!o.length) return;
  const i = o[0], r = o[o.length - 1];
  s === "Tab" && (t && n.activeElement === i ? (r.focus(), e.preventDefault()) : !t && n.activeElement === r && (i.focus(), e.preventDefault()));
}
const hs = (e) => ds.has(e) === !0, ti = (e) => {
  hs(e) || (Yo(e, "keydown", Dn), ds.set(e, !0));
}, ei = (e) => {
  hs(e) && (Zo(e, "keydown", Dn), ds.delete(e));
}, xe = (e) => {
  hs(e) ? ei(e) : ti(e);
}, _ = (e) => U(e) && "offsetWidth" in e || !1, It = (e, t) => {
  const { width: s, height: n, top: o, right: i, bottom: r, left: c } = e.getBoundingClientRect();
  let a = 1, l = 1;
  if (t && _(e)) {
    const { offsetWidth: f, offsetHeight: u } = e;
    a = f > 0 ? Math.round(s) / f : 1, l = u > 0 ? Math.round(n) / u : 1;
  }
  return {
    width: s / a,
    height: n / l,
    top: o / l,
    right: i / a,
    bottom: r / l,
    left: c / a,
    x: c / a,
    y: o / l
  };
}, Nt = (e) => w(e).body, dt = (e) => w(e).documentElement, si = (e) => {
  const t = An(e), s = t ? e.scrollX : e.scrollLeft, n = t ? e.scrollY : e.scrollTop;
  return { x: s, y: n };
}, In = (e) => A(e) && e.constructor.name === "ShadowRoot" || !1, ni = (e) => e.nodeName === "HTML" ? e : U(e) && e.assignedSlot || A(e) && e.parentNode || In(e) && e.host || dt(e), Ln = (e) => e ? Pn(e) ? e.defaultView : A(e) ? e?.ownerDocument?.defaultView : e : window, oi = (e) => A(e) && ["TABLE", "TD", "TH"].includes(e.nodeName) || !1, kn = (e, t) => e.matches(t), ii = (e) => {
  if (!_(e)) return !1;
  const { width: t, height: s } = It(e), { offsetWidth: n, offsetHeight: o } = e;
  return Math.round(t) !== n || Math.round(s) !== o;
}, ri = (e, t, s) => {
  const n = _(t), o = It(
    e,
    n && ii(t)
  ), i = { x: 0, y: 0 };
  if (n) {
    const r = It(t, !0);
    i.x = r.x + t.clientLeft, i.y = r.y + t.clientTop;
  }
  return {
    x: o.left + s.x - i.x,
    y: o.top + s.y - i.y,
    width: o.width,
    height: o.height
  };
};
let Ps = 0, Ds = 0;
const zt = /* @__PURE__ */ new Map(), On = (e, t) => {
  let s = t ? Ps : Ds;
  if (t) {
    const n = On(e), o = zt.get(n) || /* @__PURE__ */ new Map();
    zt.has(n) || zt.set(n, o), Ue(o) && !o.has(t) ? (o.set(t, s), Ps += 1) : s = o.get(t);
  } else {
    const n = e.id || e;
    zt.has(n) ? s = zt.get(n) : (zt.set(n, s), Ds += 1);
  }
  return s;
}, ci = (e) => Array.isArray(e) || !1, Nn = (e) => {
  if (!A(e)) return !1;
  const { top: t, bottom: s } = It(e), { clientHeight: n } = dt(e);
  return t <= n && s >= 0;
}, ai = (e) => typeof e == "function" || !1, li = (e) => ce(e) && e.constructor.name === "NodeList" || !1, Tt = (e) => dt(e).dir === "rtl", M = (e, t) => !e || !t ? null : e.closest(t) || M(e.getRootNode().host, t) || null, x = (e, t) => U(e) ? e : (U(t) ? t : w()).querySelector(e), fs = (e, t) => (A(t) ? t : w()).getElementsByTagName(
  e
), di = (e, t) => w(t).getElementById(e), rt = (e, t) => (t && A(t) ? t : w()).getElementsByClassName(
  e
), Kt = {}, Mn = (e) => {
  const { type: t, currentTarget: s } = e;
  Kt[t].forEach((n, o) => {
    s === o && n.forEach((i, r) => {
      r.apply(o, [e]), typeof i == "object" && i.once && O(o, t, r, i);
    });
  });
}, k = (e, t, s, n) => {
  Kt[t] || (Kt[t] = /* @__PURE__ */ new Map());
  const o = Kt[t];
  o.has(e) || o.set(e, /* @__PURE__ */ new Map());
  const i = o.get(
    e
  ), { size: r } = i;
  i.set(s, n), r || e.addEventListener(
    t,
    Mn,
    n
  );
}, O = (e, t, s, n) => {
  const o = Kt[t], i = o && o.get(e), r = i && i.get(s), c = r !== void 0 ? r : n;
  i && i.has(s) && i.delete(s), o && (!i || !i.size) && o.delete(e), (!o || !o.size) && delete Kt[t], (!i || !i.size) && e.removeEventListener(
    t,
    Mn,
    c
  );
}, N = "fade", p = "show", Se = "data-bs-dismiss", He = "alert", Bn = "Alert", nt = (e) => h(e, "disabled") || Y(e, "disabled") === "true", hi = "5.1.2", fi = hi;
class st {
  constructor(t, s) {
    let n;
    try {
      if (U(t))
        n = t;
      else if (ae(t)) {
        if (n = x(t), !n) throw Error(`"${t}" is not a valid selector.`);
      } else
        throw Error("your target is not an instance of HTMLElement.");
    } catch (i) {
      throw Error(`${this.name} Error: ${i.message}`);
    }
    const o = _t.get(n, this.name);
    o && o._toggleEventListeners(), this.element = n, this.options = this.defaults && As(this.defaults).length ? Go(n, this.defaults, s || {}, "bs") : {}, _t.set(n, this.name, this);
  }
  get version() {
    return fi;
  }
  get name() {
    return "BaseComponent";
  }
  get defaults() {
    return {};
  }
  _toggleEventListeners = () => {
  };
  dispose() {
    _t.remove(this.element, this.name), As(this).forEach((t) => {
      delete this[t];
    });
  }
}
const ui = `.${He}`, gi = `[${Se}="${He}"]`, pi = (e) => F(e, Bn), mi = (e) => new Rn(e), Is = E(
  `close.bs.${He}`
), vi = E(
  `closed.bs.${He}`
), Ls = (e) => {
  const { element: t } = e;
  b(t, vi), e._toggleEventListeners(), e.dispose(), t.remove();
};
class Rn extends st {
  static selector = ui;
  static init = mi;
  static getInstance = pi;
  dismiss;
  constructor(t) {
    super(t), this.dismiss = x(
      gi,
      this.element
    ), this._toggleEventListeners(!0);
  }
  get name() {
    return Bn;
  }
  close = (t) => {
    const { element: s, dismiss: n } = this;
    !s || !h(s, p) || t && n && nt(n) || (b(s, Is), !Is.defaultPrevented && (v(s, p), h(s, N) ? S(s, () => Ls(this)) : Ls(this)));
  };
  _toggleEventListeners = (t) => {
    const s = t ? k : O, { dismiss: n, close: o } = this;
    n && s(n, D, o);
  };
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
const T = "active", ot = "data-bs-toggle", bi = "button", Wn = "Button", wi = `[${ot}="${bi}"]`, Ei = (e) => F(e, Wn), Ti = (e) => new Fn(e);
class Fn extends st {
  static selector = wi;
  static init = Ti;
  static getInstance = Ei;
  constructor(t) {
    super(t);
    const { element: s } = this;
    this.isActive = h(s, T), L(s, Cs, String(!!this.isActive)), this._toggleEventListeners(!0);
  }
  get name() {
    return Wn;
  }
  toggle = (t) => {
    t && t.preventDefault();
    const { element: s, isActive: n } = this;
    if (nt(s)) return;
    (n ? v : d)(s, T), L(s, Cs, n ? "false" : "true"), this.isActive = h(s, T);
  };
  _toggleEventListeners = (t) => {
    (t ? k : O)(this.element, D, this.toggle);
  };
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
const Ye = "data-bs-target", At = "carousel", jn = "Carousel", ks = "data-bs-parent", $i = "data-bs-container", K = (e) => {
  const t = [Ye, ks, $i, "href"], s = w(e);
  return t.map((n) => {
    const o = Y(e, n);
    return o ? n === ks ? M(e, o) : x(o, s) : null;
  }).filter((n) => n)[0];
}, de = `[data-bs-ride="${At}"]`, tt = `${At}-item`, Ze = "data-bs-slide-to", vt = "data-bs-slide", wt = "paused", Os = {
  pause: "hover",
  keyboard: !1,
  touch: !0,
  interval: 5e3
}, ht = (e) => F(e, jn), yi = (e) => new Kn(e);
let Gt = 0, me = 0, Ne = 0;
const Me = E(`slide.bs.${At}`), Qe = E(`slid.bs.${At}`), Ns = (e) => {
  const { index: t, direction: s, element: n, slides: o, options: i } = e;
  if (e.isAnimating) {
    const r = Ge(e), c = s === "left" ? "next" : "prev", a = s === "left" ? "start" : "end";
    d(o[t], T), v(o[t], `${tt}-${c}`), v(o[t], `${tt}-${a}`), v(o[r], T), v(o[r], `${tt}-${a}`), b(n, Qe), g.clear(n, vt), e.cycle && !w(n).hidden && i.interval && !e.isPaused && e.cycle();
  }
};
function Ci() {
  const e = ht(this);
  e && !e.isPaused && !g.get(this, wt) && d(this, wt);
}
function xi() {
  const e = ht(this);
  e && e.isPaused && !g.get(this, wt) && e.cycle();
}
function Si(e) {
  e.preventDefault();
  const t = M(this, de) || K(this), s = t && ht(t);
  if (nt(this) || !s || s.isAnimating) return;
  const n = +(Y(this, Ze) || 0);
  this && !h(this, T) && !Number.isNaN(n) && s.to(n);
}
function Hi(e) {
  e.preventDefault();
  const t = M(this, de) || K(this), s = t && ht(t);
  if (nt(this) || !s || s.isAnimating) return;
  const n = Y(this, vt);
  n === "next" ? s.next() : n === "prev" && s.prev();
}
const _i = ({ code: e, target: t }) => {
  const s = w(t), [n] = [...q(de, s)].filter((a) => Nn(a)), o = ht(n);
  if (!o || o.isAnimating || /textarea|input|select/i.test(t.nodeName)) return;
  const i = Tt(n);
  e === (i ? Ss : xs) ? o.prev() : e === (i ? xs : Ss) && o.next();
};
function Ms(e) {
  const { target: t } = e, s = ht(this);
  s && s.isTouch && (s.indicator && !s.indicator.contains(t) || !s.controls.includes(t)) && (e.stopImmediatePropagation(), e.stopPropagation(), e.preventDefault());
}
function Ai(e) {
  const { target: t } = e, s = ht(this);
  if (!s || s.isAnimating || s.isTouch) return;
  const { controls: n, indicators: o } = s;
  [...n, ...o].every(
    (i) => i === t || i.contains(t)
  ) || (Gt = e.pageX, this.contains(t) && (s.isTouch = !0, zn(s, !0)));
}
const Pi = (e) => {
  me = e.pageX;
}, Di = (e) => {
  const { target: t } = e, s = w(t), n = [...q(de, s)].map((c) => ht(c)).find((c) => c.isTouch);
  if (!n) return;
  const { element: o, index: i } = n, r = Tt(o);
  Ne = e.pageX, n.isTouch = !1, zn(n), !s.getSelection()?.toString().length && o.contains(t) && Math.abs(Gt - Ne) > 120 && (me < Gt ? n.to(i + (r ? -1 : 1)) : me > Gt && n.to(i + (r ? 1 : -1))), Gt = 0, me = 0, Ne = 0;
}, Be = (e, t) => {
  const { indicators: s } = e;
  [...s].forEach((n) => v(n, T)), e.indicators[t] && d(s[t], T);
}, zn = (e, t) => {
  const { element: s } = e, n = t ? k : O;
  n(
    w(s),
    jo,
    Pi,
    te
  ), n(
    w(s),
    zo,
    Di,
    te
  );
}, Ge = (e) => {
  const { slides: t, element: s } = e, n = x(
    `.${tt}.${T}`,
    s
  );
  return n ? [...t].indexOf(n) : -1;
};
class Kn extends st {
  static selector = de;
  static init = yi;
  static getInstance = ht;
  constructor(t, s) {
    super(t, s);
    const { element: n } = this;
    this.direction = Tt(n) ? "right" : "left", this.isTouch = !1, this.slides = rt(tt, n);
    const { slides: o } = this;
    if (o.length < 2) return;
    const i = Ge(this), r = [...o].find(
      (l) => kn(l, `.${tt}-next`)
    );
    this.index = i;
    const c = w(n);
    this.controls = [
      ...q(`[${vt}]`, n),
      ...q(
        `[${vt}][${Ye}="#${n.id}"]`,
        c
      )
    ].filter((l, f, u) => f === u.indexOf(l)), this.indicator = x(
      `.${At}-indicators`,
      n
    ), this.indicators = [
      ...this.indicator ? q(`[${Ze}]`, this.indicator) : [],
      ...q(
        `[${Ze}][${Ye}="#${n.id}"]`,
        c
      )
    ].filter((l, f, u) => f === u.indexOf(l));
    const { options: a } = this;
    this.options.interval = a.interval === !0 ? Os.interval : a.interval, r ? this.index = [...o].indexOf(r) : i < 0 && (this.index = 0, d(o[0], T), this.indicators.length && Be(this, 0)), this.indicators.length && Be(this, this.index), this._toggleEventListeners(!0), a.interval && this.cycle();
  }
  get name() {
    return jn;
  }
  get defaults() {
    return Os;
  }
  get isPaused() {
    return h(this.element, wt);
  }
  get isAnimating() {
    return x(
      `.${tt}-next,.${tt}-prev`,
      this.element
    ) !== null;
  }
  cycle() {
    const { element: t, options: s, isPaused: n, index: o } = this;
    g.clear(t, At), n && (g.clear(t, wt), v(t, wt)), g.set(
      t,
      () => {
        this.element && !this.isPaused && !this.isTouch && Nn(t) && this.to(o + 1);
      },
      s.interval,
      At
    );
  }
  pause() {
    const { element: t, options: s } = this;
    this.isPaused || !s.interval || (d(t, wt), g.set(
      t,
      () => {
      },
      1,
      wt
    ));
  }
  next() {
    this.isAnimating || this.to(this.index + 1);
  }
  prev() {
    this.isAnimating || this.to(this.index - 1);
  }
  to(t) {
    const { element: s, slides: n, options: o } = this, i = Ge(this), r = Tt(s);
    let c = t;
    if (this.isAnimating || i === c || g.get(s, vt)) return;
    i < c || i === 0 && c === n.length - 1 ? this.direction = r ? "right" : "left" : (i > c || i === n.length - 1 && c === 0) && (this.direction = r ? "left" : "right");
    const { direction: a } = this;
    c < 0 ? c = n.length - 1 : c >= n.length && (c = 0);
    const l = a === "left" ? "next" : "prev", f = a === "left" ? "start" : "end", u = {
      relatedTarget: n[c],
      from: i,
      to: c,
      direction: a
    };
    at(Me, u), at(Qe, u), b(s, Me), !Me.defaultPrevented && (this.index = c, Be(this, c), le(n[c]) && h(s, "slide") ? g.set(
      s,
      () => {
        d(n[c], `${tt}-${l}`), Ot(n[c]), d(n[c], `${tt}-${f}`), d(n[i], `${tt}-${f}`), S(
          n[c],
          () => this.slides && this.slides.length && Ns(this)
        );
      },
      0,
      vt
    ) : (d(n[c], T), v(n[i], T), g.set(
      s,
      () => {
        g.clear(s, vt), s && o.interval && !this.isPaused && this.cycle(), b(s, Qe);
      },
      0,
      vt
    )));
  }
  _toggleEventListeners = (t) => {
    const { element: s, options: n, slides: o, controls: i, indicators: r } = this, { touch: c, pause: a, interval: l, keyboard: f } = n, u = t ? k : O;
    a && l && (u(s, Ce, Ci), u(s, cs, xi)), c && o.length > 2 && (u(
      s,
      Fo,
      Ai,
      te
    ), u(s, as, Ms, { passive: !1 }), u(s, Ko, Ms, { passive: !1 })), i.length && i.forEach(($) => {
      u($, D, Hi);
    }), r.length && r.forEach(($) => {
      u($, D, Si);
    }), f && u(w(s), ye, _i);
  };
  dispose() {
    const { isAnimating: t } = this, s = {
      ...this,
      isAnimating: t
    };
    this._toggleEventListeners(), super.dispose(), s.isAnimating && S(s.slides[s.index], () => {
      Ns(s);
    });
  }
}
const Lt = "collapsing", z = "collapse", Vn = "Collapse", Ii = `.${z}`, Xn = `[${ot}="${z}"]`, Li = { parent: null }, ve = (e) => F(e, Vn), ki = (e) => new qn(e), Bs = E(`show.bs.${z}`), Oi = E(`shown.bs.${z}`), Rs = E(`hide.bs.${z}`), Ni = E(`hidden.bs.${z}`), Mi = (e) => {
  const { element: t, parent: s, triggers: n } = e;
  b(t, Bs), Bs.defaultPrevented || (g.set(t, Te, 17), s && g.set(s, Te, 17), d(t, Lt), v(t, z), H(t, { height: `${t.scrollHeight}px` }), S(t, () => {
    g.clear(t), s && g.clear(s), n.forEach((o) => L(o, Ee, "true")), v(t, Lt), d(t, z), d(t, p), H(t, { height: "" }), b(t, Oi);
  }));
}, Ws = (e) => {
  const { element: t, parent: s, triggers: n } = e;
  b(t, Rs), Rs.defaultPrevented || (g.set(t, Te, 17), s && g.set(s, Te, 17), H(t, { height: `${t.scrollHeight}px` }), v(t, z), v(t, p), d(t, Lt), Ot(t), H(t, { height: "0px" }), S(t, () => {
    g.clear(t), s && g.clear(s), n.forEach((o) => L(o, Ee, "false")), v(t, Lt), d(t, z), H(t, { height: "" }), b(t, Ni);
  }));
}, Bi = (e) => {
  const { target: t } = e, s = t && M(t, Xn), n = s && K(s), o = n && ve(n);
  s && nt(s) || o && (o.toggle(), s?.tagName === "A" && e.preventDefault());
};
class qn extends st {
  static selector = Ii;
  static init = ki;
  static getInstance = ve;
  constructor(t, s) {
    super(t, s);
    const { element: n, options: o } = this, i = w(n);
    this.triggers = [...q(Xn, i)].filter(
      (r) => K(r) === n
    ), this.parent = _(o.parent) ? o.parent : ae(o.parent) ? K(n) || x(o.parent, i) : null, this._toggleEventListeners(!0);
  }
  get name() {
    return Vn;
  }
  get defaults() {
    return Li;
  }
  hide() {
    const { triggers: t, element: s } = this;
    g.get(s) || (Ws(this), t.length && t.forEach((n) => d(n, `${z}d`)));
  }
  show() {
    const { element: t, parent: s, triggers: n } = this;
    let o, i;
    s && (o = [
      ...q(`.${z}.${p}`, s)
    ].find((r) => ve(r)), i = o && ve(o)), (!s || !g.get(s)) && !g.get(t) && (i && o !== t && (Ws(i), i.triggers.forEach((r) => {
      d(r, `${z}d`);
    })), Mi(this), n.length && n.forEach((r) => v(r, `${z}d`)));
  }
  toggle() {
    h(this.element, p) ? this.hide() : this.show();
  }
  _toggleEventListeners = (t) => {
    const s = t ? k : O, { triggers: n } = this;
    n.length && n.forEach((o) => {
      s(o, D, Bi);
    });
  };
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
const Ri = (e) => e != null && typeof e == "object" || !1, Wi = (e) => Ri(e) && typeof e.nodeType == "number" && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].some(
  (t) => e.nodeType === t
) || !1, Fs = (e) => Wi(e) && e.nodeType === 1 || !1, Fi = (e) => typeof e == "function" || !1, ji = "1.0.7", js = "PositionObserver Error";
class us {
  entries;
  static version = ji;
  _tick;
  _root;
  _callback;
  /**
   * The constructor takes two arguments, a `callback`, which is called
   * whenever the position of an observed element changes and an `options` object.
   * The callback function should take an array of `PositionObserverEntry` objects
   * as its only argument, but it's not required.
   *
   * @param callback the callback that applies to all targets of this observer
   * @param options the options of this observer
   */
  constructor(t, s) {
    if (!Fi(t))
      throw new Error(`${js}: ${t} is not a function.`);
    this.entries = /* @__PURE__ */ new Map(), this._callback = t, this._root = Fs(s?.root) ? s.root : document?.documentElement, this._tick = 0;
  }
  /**
   * Start observing the position of the specified element.
   * If the element is not currently attached to the DOM,
   * it will NOT be added to the entries.
   *
   * @param target an `Element` target
   */
  observe = (t) => {
    if (!Fs(t))
      throw new Error(
        `${js}: ${t} is not an instance of Element.`
      );
    this._root.contains(t) && this._new(t).then(({ boundingClientRect: s }) => {
      if (s && !this.getEntry(t)) {
        const { clientWidth: n, clientHeight: o } = this._root;
        this.entries.set(t, {
          target: t,
          boundingClientRect: s,
          clientWidth: n,
          clientHeight: o
        });
      }
      this._tick || (this._tick = requestAnimationFrame(this._runCallback));
    });
  };
  /**
   * Stop observing the position of the specified element.
   *
   * @param target an `Element` target
   */
  unobserve = (t) => {
    this.entries.has(t) && this.entries.delete(t);
  };
  /**
   * Private method responsible for all the heavy duty,
   * the observer's runtime.
   */
  _runCallback = () => {
    if (!this.entries.size) return;
    const { clientWidth: t, clientHeight: s } = this._root, n = new Promise((o) => {
      const i = [];
      this.entries.forEach(
        ({
          target: r,
          boundingClientRect: c,
          clientWidth: a,
          clientHeight: l
        }) => {
          this._root.contains(r) && this._new(r).then(({ boundingClientRect: f, isIntersecting: u }) => {
            if (!u) return;
            const { left: $, top: I } = f;
            if (c.top !== I || c.left !== $ || a !== t || l !== s) {
              const B = {
                target: r,
                boundingClientRect: f,
                clientHeight: s,
                clientWidth: t
              };
              this.entries.set(r, B), i.push(B);
            }
          });
        }
      ), o(i);
    });
    this._tick = requestAnimationFrame(async () => {
      const o = await n;
      o.length && this._callback(o, this), this._runCallback();
    });
  };
  /**
   * Check intersection status and resolve it
   * right away.
   *
   * @param target an `Element` target
   */
  _new = (t) => new Promise((s) => {
    new IntersectionObserver(
      ([n], o) => {
        o.disconnect(), s(n);
      }
    ).observe(t);
  });
  /**
   * Find the entry for a given target.
   *
   * @param target an `HTMLElement` target
   */
  getEntry = (t) => this.entries.get(t);
  /**
   * Immediately stop observing all elements.
   */
  disconnect = () => {
    cancelAnimationFrame(this._tick), this.entries.clear(), this._tick = 0;
  };
}
const kt = ["dropdown", "dropup", "dropstart", "dropend"], Un = "Dropdown", Yn = "dropdown-menu", Zn = (e) => {
  const t = M(e, "A");
  return e.tagName === "A" && Jt(e, "href") && Y(e, "href")?.slice(-1) === "#" || t && Jt(t, "href") && Y(t, "href")?.slice(-1) === "#";
}, [et, Je, ts, es] = kt, zi = `[${ot}="${et}"]`, se = (e) => F(e, Un), Ki = (e) => new Gn(e), Vi = `${Yn}-end`, zs = [et, Je], Ks = [ts, es], Vs = ["A", "BUTTON"], Xi = {
  offset: 5,
  display: "dynamic"
}, Re = E(
  `show.bs.${et}`
), Xs = E(
  `shown.bs.${et}`
), We = E(
  `hide.bs.${et}`
), qs = E(`hidden.bs.${et}`), Qn = E(`updated.bs.${et}`), Us = (e) => {
  const { element: t, menu: s, parentElement: n, options: o } = e, { offset: i } = o;
  if (W(s, "position") === "static") return;
  const r = Tt(t), c = h(s, Vi);
  ["margin", "top", "bottom", "left", "right"].forEach((R) => {
    const Ct = {};
    Ct[R] = "", H(s, Ct);
  });
  let l = kt.find((R) => h(n, R)) || et;
  const f = {
    dropdown: [i, 0, 0],
    dropup: [0, 0, i],
    dropstart: r ? [-1, 0, 0, i] : [-1, i, 0],
    dropend: r ? [-1, i, 0] : [-1, 0, 0, i]
  }, u = {
    dropdown: { top: "100%" },
    dropup: { top: "auto", bottom: "100%" },
    dropstart: r ? { left: "100%", right: "auto" } : { left: "auto", right: "100%" },
    dropend: r ? { left: "auto", right: "100%" } : { left: "100%", right: "auto" },
    menuStart: r ? { right: "0", left: "auto" } : { right: "auto", left: "0" },
    menuEnd: r ? { right: "auto", left: "0" } : { right: "0", left: "auto" }
  }, { offsetWidth: $, offsetHeight: I } = s, { clientWidth: B, clientHeight: G } = dt(t), {
    left: m,
    top: V,
    width: $t,
    height: yt
  } = It(t), C = m - $ - i < 0, ft = m + $ + $t + i >= B, it = V + I + i >= G, J = V + I + yt + i >= G, Bt = V - I - i < 0, y = (!r && c || r && !c) && m + $t - $ < 0, j = (r && c || !r && !c) && m + $ >= B;
  if (Ks.includes(l) && C && ft && (l = et), l === ts && (r ? ft : C) && (l = es), l === es && (r ? C : ft) && (l = ts), l === Je && Bt && !J && (l = et), l === et && J && !Bt && (l = Je), Ks.includes(l) && it && at(u[l], {
    top: "auto",
    bottom: 0
  }), zs.includes(l) && (y || j)) {
    let R = { left: "auto", right: "auto" };
    !y && j && !r && (R = { left: "auto", right: 0 }), y && !j && r && (R = { left: 0, right: "auto" }), R && at(u[l], R);
  }
  const Rt = f[l];
  H(s, {
    ...u[l],
    margin: `${Rt.map((R) => R && `${R}px`).join(" ")}`
  }), zs.includes(l) && c && c && H(s, u[!r && y || r && j ? "menuStart" : "menuEnd"]), b(n, Qn);
}, qi = (e) => Array.from(e.children).map((t) => {
  if (t && Vs.includes(t.tagName)) return t;
  const { firstElementChild: s } = t;
  return s && Vs.includes(s.tagName) ? s : null;
}).filter((t) => t), Ys = (e) => {
  const { element: t, options: s, menu: n } = e, o = e.open ? k : O, i = w(t);
  o(i, D, Zs), o(i, is, Zs), o(i, ye, Yi), o(i, Ro, Zi), s.display === "dynamic" && (e.open ? e._observer.observe(n) : e._observer.disconnect());
}, gs = (e) => {
  const t = [...kt, "btn-group", "input-group"].map(
    (s) => rt(`${s} ${p}`, w(e))
  ).find((s) => s.length);
  if (t && t.length)
    return [...t[0].children].find(
      (s) => kt.some((n) => n === Y(s, ot))
    );
}, Zs = (e) => {
  const { target: t, type: s } = e;
  if (!_(t)) return;
  const n = gs(t), o = n && se(n);
  if (!o) return;
  const { parentElement: i, menu: r } = o, c = i && i.contains(t) && (t.tagName === "form" || M(t, "form") !== null);
  [D, Hn].includes(s) && Zn(t) && e.preventDefault(), !c && s !== is && t !== n && t !== r && o.hide();
};
function Ui(e) {
  const t = se(this);
  nt(this) || t && (e.stopPropagation(), t.toggle(), Zn(this) && e.preventDefault());
}
const Yi = (e) => {
  [Xe, qe].includes(e.code) && e.preventDefault();
};
function Zi(e) {
  const { code: t } = e, s = gs(this);
  if (!s) return;
  const n = se(s), { activeElement: o } = w(s);
  if (!n || !o) return;
  const { menu: i, open: r } = n, c = qi(i);
  if (c && c.length && [Xe, qe].includes(t)) {
    let a = c.indexOf(o);
    o === s ? a = 0 : t === qe ? a = a > 1 ? a - 1 : 0 : t === Xe && (a = a < c.length - 1 ? a + 1 : a), c[a] && lt(c[a]);
  }
  ls === t && r && (n.toggle(), lt(s));
}
class Gn extends st {
  static selector = zi;
  static init = Ki;
  static getInstance = se;
  constructor(t, s) {
    super(t, s);
    const { parentElement: n } = this.element, [o] = rt(
      Yn,
      n
    );
    o && (this.parentElement = n, this.menu = o, this._observer = new us(
      () => Us(this)
    ), this._toggleEventListeners(!0));
  }
  get name() {
    return Un;
  }
  get defaults() {
    return Xi;
  }
  toggle() {
    this.open ? this.hide() : this.show();
  }
  show() {
    const { element: t, open: s, menu: n, parentElement: o } = this;
    if (s) return;
    const i = gs(t), r = i && se(i);
    r && r.hide(), [Re, Xs, Qn].forEach(
      (c) => {
        c.relatedTarget = t;
      }
    ), b(o, Re), !Re.defaultPrevented && (d(n, p), d(o, p), L(t, Ee, "true"), Us(this), this.open = !s, lt(t), Ys(this), b(o, Xs));
  }
  hide() {
    const { element: t, open: s, menu: n, parentElement: o } = this;
    s && ([We, qs].forEach((i) => {
      i.relatedTarget = t;
    }), b(o, We), !We.defaultPrevented && (v(n, p), v(o, p), L(t, Ee, "false"), this.open = !s, Ys(this), b(o, qs)));
  }
  _toggleEventListeners = (t) => {
    (t ? k : O)(this.element, D, Ui);
  };
  dispose() {
    this.open && this.hide(), this._toggleEventListeners(), super.dispose();
  }
}
const X = "modal", ps = "Modal", ms = "Offcanvas", Qi = "fixed-top", Gi = "fixed-bottom", Jn = "sticky-top", to = "position-sticky", eo = (e) => [
  ...rt(Qi, e),
  ...rt(Gi, e),
  ...rt(Jn, e),
  ...rt(to, e),
  ...rt("is-fixed", e)
], Ji = (e) => {
  const t = Nt(e);
  H(t, {
    paddingRight: "",
    overflow: ""
  });
  const s = eo(t);
  s.length && s.forEach((n) => {
    H(n, {
      paddingRight: "",
      marginRight: ""
    });
  });
}, so = (e) => {
  const { clientWidth: t } = dt(e), { innerWidth: s } = Ln(e);
  return Math.abs(s - t);
}, no = (e, t) => {
  const s = Nt(e), n = parseInt(W(s, "paddingRight"), 10), i = W(s, "overflow") === "hidden" && n ? 0 : so(e), r = eo(s);
  t && (H(s, {
    overflow: "hidden",
    paddingRight: `${n + i}px`
  }), r.length && r.forEach((c) => {
    const a = W(c, "paddingRight");
    if (c.style.paddingRight = `${parseInt(a, 10) + i}px`, [Jn, to].some((l) => h(c, l))) {
      const l = W(c, "marginRight");
      c.style.marginRight = `${parseInt(l, 10) - i}px`;
    }
  }));
}, Z = "offcanvas", Et = bt({
  tagName: "div",
  className: "popup-container"
}), oo = (e, t) => {
  const s = A(t) && t.nodeName === "BODY", n = A(t) && !s ? t : Et, o = s ? t : Nt(e);
  A(e) && (n === Et && o.append(Et), n.append(e));
}, io = (e, t) => {
  const s = A(t) && t.nodeName === "BODY", n = A(t) && !s ? t : Et;
  A(e) && (e.remove(), n === Et && !Et.children.length && Et.remove());
}, vs = (e, t) => {
  const s = A(t) && t.nodeName !== "BODY" ? t : Et;
  return A(e) && s.contains(e);
}, ro = "backdrop", Qs = `${X}-${ro}`, Gs = `${Z}-${ro}`, co = `.${X}.${p}`, bs = `.${Z}.${p}`, P = bt("div"), Mt = (e) => x(
  `${co},${bs}`,
  w(e)
), ws = (e) => {
  const t = e ? Qs : Gs;
  [Qs, Gs].forEach((s) => {
    v(P, s);
  }), d(P, t);
}, ao = (e, t, s) => {
  ws(s), oo(P, Nt(e)), t && d(P, N);
}, lo = () => {
  h(P, p) || (d(P, p), Ot(P));
}, _e = () => {
  v(P, p);
}, ho = (e) => {
  Mt(e) || (v(P, N), io(P, Nt(e)), Ji(e));
}, fo = (e) => _(e) && W(e, "visibility") !== "hidden" && e.offsetParent !== null, tr = `.${X}`, er = `[${ot}="${X}"]`, sr = `[${Se}="${X}"]`, uo = `${X}-static`, nr = {
  backdrop: !0,
  keyboard: !0
}, ne = (e) => F(e, ps), or = (e) => new mo(e), be = E(
  `show.bs.${X}`
), Js = E(
  `shown.bs.${X}`
), Fe = E(
  `hide.bs.${X}`
), tn = E(
  `hidden.bs.${X}`
), go = (e) => {
  const { element: t } = e, s = so(t), { clientHeight: n, scrollHeight: o } = dt(t), { clientHeight: i, scrollHeight: r } = t, c = i !== r;
  if (!c && s) {
    const l = { [Tt(t) ? "paddingLeft" : "paddingRight"]: `${s}px` };
    H(t, l);
  }
  no(t, c || n !== o);
}, po = (e, t) => {
  const s = t ? k : O, { element: n } = e;
  s(n, D, cr), s(w(n), ye, rr), t ? e._observer.observe(n) : e._observer.disconnect();
}, en = (e) => {
  const { triggers: t, element: s, relatedTarget: n } = e;
  ho(s), H(s, { paddingRight: "", display: "" }), po(e);
  const o = be.relatedTarget || t.find(fo);
  o && lt(o), tn.relatedTarget = n || void 0, b(s, tn), xe(s);
}, sn = (e) => {
  const { element: t, relatedTarget: s } = e;
  lt(t), po(e, !0), Js.relatedTarget = s || void 0, b(t, Js), xe(t);
}, nn = (e) => {
  const { element: t, hasFade: s } = e;
  H(t, { display: "block" }), go(e), Mt(t) || H(Nt(t), { overflow: "hidden" }), d(t, p), Dt(t, re), L(t, $e, "true"), s ? S(t, () => sn(e)) : sn(e);
}, on = (e) => {
  const { element: t, options: s, hasFade: n } = e;
  s.backdrop && n && h(P, p) && !Mt(t) ? (_e(), S(P, () => en(e))) : en(e);
};
function ir(e) {
  const t = K(this), s = t && ne(t);
  nt(this) || s && (this.tagName === "A" && e.preventDefault(), s.relatedTarget = this, s.toggle());
}
const rr = ({ code: e, target: t }) => {
  const s = x(co, w(t)), n = s && ne(s);
  if (!n) return;
  const { options: o } = n;
  o.keyboard && e === ls && h(s, p) && (n.relatedTarget = null, n.hide());
}, cr = (e) => {
  const { currentTarget: t } = e, s = t && ne(t);
  if (!s || !t || g.get(t)) return;
  const { options: n, isStatic: o, modalDialog: i } = s, { backdrop: r } = n, { target: c } = e, a = w(t)?.getSelection()?.toString().length, l = i.contains(c), f = c && M(c, sr);
  o && !l ? g.set(
    t,
    () => {
      d(t, uo), S(i, () => ar(s));
    },
    17
  ) : (f || !a && !o && !l && r) && (s.relatedTarget = f || null, s.hide(), e.preventDefault());
}, ar = (e) => {
  const { element: t, modalDialog: s } = e, n = (le(s) || 0) + 17;
  v(t, uo), g.set(t, () => g.clear(t), n);
};
class mo extends st {
  static selector = tr;
  static init = or;
  static getInstance = ne;
  constructor(t, s) {
    super(t, s);
    const { element: n } = this, o = x(
      `.${X}-dialog`,
      n
    );
    o && (this.modalDialog = o, this.triggers = [
      ...q(
        er,
        w(n)
      )
    ].filter(
      (i) => K(i) === n
    ), this.isStatic = this.options.backdrop === "static", this.hasFade = h(n, N), this.relatedTarget = null, this._observer = new ResizeObserver(() => this.update()), this._toggleEventListeners(!0));
  }
  get name() {
    return ps;
  }
  get defaults() {
    return nr;
  }
  toggle() {
    h(this.element, p) ? this.hide() : this.show();
  }
  show() {
    const { element: t, options: s, hasFade: n, relatedTarget: o } = this, { backdrop: i } = s;
    let r = 0;
    if (h(t, p) || (be.relatedTarget = o || void 0, b(t, be), be.defaultPrevented)) return;
    const c = Mt(t);
    if (c && c !== t) {
      const a = ne(c) || F(
        c,
        ms
      );
      a && a.hide();
    }
    i ? (vs(P) ? ws(!0) : ao(t, n, !0), r = le(P), lo(), setTimeout(() => nn(this), r)) : (nn(this), c && h(P, p) && _e());
  }
  hide() {
    const { element: t, hasFade: s, relatedTarget: n } = this;
    h(t, p) && (Fe.relatedTarget = n || void 0, b(t, Fe), !Fe.defaultPrevented && (v(t, p), L(t, re, "true"), Dt(t, $e), s ? S(t, () => on(this)) : on(this)));
  }
  update = () => {
    h(this.element, p) && go(this);
  };
  _toggleEventListeners = (t) => {
    const s = t ? k : O, { triggers: n } = this;
    n.length && n.forEach((o) => {
      s(o, D, ir);
    });
  };
  dispose() {
    const t = { ...this }, { modalDialog: s, hasFade: n } = t, o = () => setTimeout(() => super.dispose(), 17);
    this.hide(), this._toggleEventListeners(), n ? S(s, o) : o();
  }
}
const lr = `.${Z}`, vo = `[${ot}="${Z}"]`, dr = `[${Se}="${Z}"]`, Ae = `${Z}-toggling`, hr = {
  backdrop: !0,
  keyboard: !0,
  scroll: !1
}, oe = (e) => F(e, ms), fr = (e) => new To(e), we = E(`show.bs.${Z}`), bo = E(`shown.bs.${Z}`), je = E(`hide.bs.${Z}`), wo = E(`hidden.bs.${Z}`), ur = (e) => {
  const { element: t } = e, { clientHeight: s, scrollHeight: n } = dt(t);
  no(t, s !== n);
}, Eo = (e, t) => {
  const s = t ? k : O, n = w(e.element);
  s(n, ye, vr), s(n, D, mr);
}, rn = (e) => {
  const { element: t, options: s } = e;
  s.scroll || (ur(e), H(Nt(t), { overflow: "hidden" })), d(t, Ae), d(t, p), H(t, { visibility: "visible" }), S(t, () => br(e));
}, gr = (e) => {
  const { element: t, options: s } = e, n = Mt(t);
  t.blur(), !n && s.backdrop && h(P, p) && _e(), S(t, () => wr(e));
};
function pr(e) {
  const t = K(this), s = t && oe(t);
  nt(this) || s && (s.relatedTarget = this, s.toggle(), this.tagName === "A" && e.preventDefault());
}
const mr = (e) => {
  const { target: t } = e, s = x(
    bs,
    w(t)
  );
  if (!s) return;
  const n = x(
    dr,
    s
  ), o = oe(s);
  if (!o) return;
  const { options: i, triggers: r } = o, { backdrop: c } = i, a = M(t, vo), l = w(s).getSelection();
  P.contains(t) && c === "static" || (!(l && l.toString().length) && (!s.contains(t) && c && (!a || r.includes(t)) || n && n.contains(t)) && (o.relatedTarget = n && n.contains(t) ? n : void 0, o.hide()), a && a.tagName === "A" && e.preventDefault());
}, vr = ({ code: e, target: t }) => {
  const s = x(
    bs,
    w(t)
  ), n = s && oe(s);
  n && n.options.keyboard && e === ls && (n.relatedTarget = void 0, n.hide());
}, br = (e) => {
  const { element: t } = e;
  v(t, Ae), Dt(t, re), L(t, $e, "true"), L(t, "role", "dialog"), b(t, bo), Eo(e, !0), lt(t), xe(t);
}, wr = (e) => {
  const { element: t, triggers: s } = e;
  L(t, re, "true"), Dt(t, $e), Dt(t, "role"), H(t, { visibility: "" });
  const n = we.relatedTarget || s.find(fo);
  n && lt(n), ho(t), b(t, wo), v(t, Ae), xe(t), Mt(t) || Eo(e);
};
class To extends st {
  static selector = lr;
  static init = fr;
  static getInstance = oe;
  constructor(t, s) {
    super(t, s);
    const { element: n } = this;
    this.triggers = [
      ...q(
        vo,
        w(n)
      )
    ].filter(
      (o) => K(o) === n
    ), this.relatedTarget = void 0, this._toggleEventListeners(!0);
  }
  get name() {
    return ms;
  }
  get defaults() {
    return hr;
  }
  toggle() {
    h(this.element, p) ? this.hide() : this.show();
  }
  show() {
    const { element: t, options: s, relatedTarget: n } = this;
    let o = 0;
    if (h(t, p) || (we.relatedTarget = n || void 0, bo.relatedTarget = n || void 0, b(t, we), we.defaultPrevented)) return;
    const i = Mt(t);
    if (i && i !== t) {
      const r = oe(i) || F(
        i,
        ps
      );
      r && r.hide();
    }
    s.backdrop ? (vs(P) ? ws() : ao(t, !0), o = le(P), lo(), setTimeout(() => rn(this), o)) : (rn(this), i && h(P, p) && _e());
  }
  hide() {
    const { element: t, relatedTarget: s } = this;
    h(t, p) && (je.relatedTarget = s || void 0, wo.relatedTarget = s || void 0, b(t, je), !je.defaultPrevented && (d(t, Ae), v(t, p), gr(this)));
  }
  _toggleEventListeners = (t) => {
    const s = t ? k : O;
    this.triggers.forEach((n) => {
      s(n, D, pr);
    });
  };
  dispose() {
    const { element: t } = this, s = h(t, p), n = () => setTimeout(() => super.dispose(), 1);
    this.hide(), this._toggleEventListeners(), s ? S(t, n) : n();
  }
}
const Pt = "popover", Es = "Popover", ct = "tooltip", $o = (e) => {
  const t = e === ct, s = t ? `${e}-inner` : `${e}-body`, n = t ? "" : `<h3 class="${e}-header"></h3>`, o = `<div class="${e}-arrow"></div>`, i = `<div class="${s}"></div>`;
  return `<div class="${e}" role="${ct}">${n + o + i}</div>`;
}, yo = {
  top: "top",
  bottom: "bottom",
  left: "start",
  right: "end"
}, ss = (e) => {
  requestAnimationFrame(() => {
    const t = /\b(top|bottom|start|end)+/, { element: s, tooltip: n, container: o, offsetParent: i, options: r, arrow: c } = e;
    if (!n) return;
    const a = Tt(s), { x: l, y: f } = si(i);
    H(n, {
      top: "",
      left: "",
      right: "",
      bottom: ""
    });
    const { offsetWidth: u, offsetHeight: $ } = n, { clientWidth: I, clientHeight: B, offsetWidth: G } = dt(s);
    let { placement: m } = r;
    const { clientWidth: V, offsetWidth: $t } = o, C = W(
      o,
      "position"
    ) === "fixed", ft = Math.abs(C ? V - $t : I - G), it = a && C ? ft : 0, J = I - (a ? 0 : ft) - 1, Bt = e._observer.getEntry(s), {
      width: y,
      height: j,
      left: Rt,
      right: R,
      top: Ct
    } = Bt?.boundingClientRect || It(s, !0), {
      x: fe,
      y: Wt
    } = ri(
      s,
      i,
      { x: l, y: f }
    );
    H(c, {
      top: "",
      left: "",
      right: "",
      bottom: ""
    });
    let xt = 0, Xt = "", ut = 0, Pe = "", Ft = "", ue = "", De = "";
    const St = c.offsetWidth || 0, gt = c.offsetHeight || 0, Ie = St / 2;
    let qt = Ct - $ - gt < 0, Ut = Ct + $ + j + gt >= B, Yt = Rt - u - St < it, Zt = Rt + u + y + St >= J;
    const ge = ["left", "right"], Le = ["top", "bottom"];
    qt = ge.includes(m) ? Ct + j / 2 - $ / 2 - gt < 0 : qt, Ut = ge.includes(m) ? Ct + $ / 2 + j / 2 + gt >= B : Ut, Yt = Le.includes(m) ? Rt + y / 2 - u / 2 < it : Yt, Zt = Le.includes(m) ? Rt + u / 2 + y / 2 >= J : Zt, m = ge.includes(m) && Yt && Zt ? "top" : m, m = m === "top" && qt ? "bottom" : m, m = m === "bottom" && Ut ? "top" : m, m = m === "left" && Yt ? "right" : m, m = m === "right" && Zt ? "left" : m, n.className.includes(m) || (n.className = n.className.replace(
      t,
      yo[m]
    )), ge.includes(m) ? (m === "left" ? ut = fe - u - St : ut = fe + y + St, qt && Ut ? (xt = 0, Xt = 0, Ft = Wt + j / 2 - gt / 2) : qt ? (xt = Wt, Xt = "", Ft = j / 2 - St) : Ut ? (xt = Wt - $ + j, Xt = "", Ft = $ - j / 2 - St) : (xt = Wt - $ / 2 + j / 2, Ft = $ / 2 - gt / 2)) : Le.includes(m) && (m === "top" ? xt = Wt - $ - gt : xt = Wt + j + gt, Yt ? (ut = 0, ue = fe + y / 2 - Ie) : Zt ? (ut = "auto", Pe = 0, De = y / 2 + J - R - Ie) : (ut = fe - u / 2 + y / 2, ue = u / 2 - Ie)), H(n, {
      top: `${xt}px`,
      bottom: Xt === "" ? "" : `${Xt}px`,
      left: ut === "auto" ? ut : `${ut}px`,
      right: Pe !== "" ? `${Pe}px` : ""
    }), _(c) && (Ft !== "" && (c.style.top = `${Ft}px`), ue !== "" ? c.style.left = `${ue}px` : De !== "" && (c.style.right = `${De}px`));
    const Bo = E(
      `updated.bs.${ee(e.name)}`
    );
    b(s, Bo);
  });
}, ns = {
  template: $o(ct),
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
}, Co = "data-original-title", Ht = "Tooltip", mt = (e, t, s) => {
  if (ae(t) && t.length) {
    let n = t.trim();
    ai(s) && (n = s(n));
    const i = new DOMParser().parseFromString(n, "text/html");
    e.append(...i.body.childNodes);
  } else _(t) ? e.append(t) : (li(t) || ci(t) && t.every(A)) && e.append(...t);
}, Er = (e) => {
  const t = e.name === Ht, { id: s, element: n, options: o } = e, {
    title: i,
    placement: r,
    template: c,
    animation: a,
    customClass: l,
    sanitizeFn: f,
    dismissible: u,
    content: $,
    btnClose: I
  } = o, B = t ? ct : Pt, G = { ...yo };
  let m = [], V = [];
  Tt(n) && (G.left = "end", G.right = "start");
  const $t = `bs-${B}-${G[r]}`;
  let yt;
  if (_(c))
    yt = c;
  else {
    const y = bt("div");
    mt(y, c, f), yt = y.firstChild;
  }
  if (!_(yt)) return;
  e.tooltip = yt.cloneNode(!0);
  const { tooltip: C } = e;
  L(C, "id", s), L(C, "role", ct);
  const ft = t ? `${ct}-inner` : `${Pt}-body`, it = t ? null : x(`.${Pt}-header`, C), J = x(`.${ft}`, C);
  e.arrow = x(
    `.${B}-arrow`,
    C
  );
  const { arrow: Bt } = e;
  if (_(i)) m = [i.cloneNode(!0)];
  else {
    const y = bt("div");
    mt(y, i, f), m = [...y.childNodes];
  }
  if (_($)) V = [$.cloneNode(!0)];
  else {
    const y = bt("div");
    mt(y, $, f), V = [...y.childNodes];
  }
  if (u)
    if (i)
      if (_(I))
        m = [...m, I.cloneNode(!0)];
      else {
        const y = bt("div");
        mt(y, I, f), m = [...m, y.firstChild];
      }
    else if (it && it.remove(), _(I))
      V = [...V, I.cloneNode(!0)];
    else {
      const y = bt("div");
      mt(y, I, f), V = [...V, y.firstChild];
    }
  t ? i && J && mt(J, i, f) : (i && it && mt(it, m, f), $ && J && mt(J, V, f), e.btn = x(".btn-close", C) || void 0), d(C, "position-absolute"), d(Bt, "position-absolute"), h(C, B) || d(C, B), a && !h(C, N) && d(C, N), l && !h(C, l) && d(C, l), h(C, $t) || d(C, $t);
}, Tr = (e) => {
  const t = ["HTML", "BODY"], s = [];
  let { parentNode: n } = e;
  for (; n && !t.includes(n.nodeName); )
    n = ni(n), In(n) || oi(n) || s.push(n);
  return s.find((o, i) => (W(o, "position") !== "relative" || W(o, "position") === "relative" && o.offsetHeight !== o.scrollHeight) && s.slice(i + 1).every(
    (r) => W(r, "position") === "static"
  ) ? o : null) || w(e).body;
}, $r = `[${ot}="${ct}"],[data-tip="${ct}"]`, xo = "title";
let cn = (e) => F(e, Ht);
const yr = (e) => new Ts(e), Cr = (e) => {
  const { element: t, tooltip: s, container: n } = e;
  Dt(t, xn), io(
    s,
    n
  );
}, Qt = (e) => {
  const { tooltip: t, container: s } = e;
  return t && vs(t, s);
}, xr = (e, t) => {
  const { element: s } = e;
  e._toggleEventListeners(), Jt(s, Co) && e.name === Ht && Ho(e), t && t();
}, So = (e, t) => {
  const s = t ? k : O, { element: n } = e;
  s(
    w(n),
    as,
    e.handleTouch,
    te
  );
}, an = (e) => {
  const { element: t } = e, s = E(
    `shown.bs.${ee(e.name)}`
  );
  So(e, !0), b(t, s), g.clear(t, "in");
}, ln = (e) => {
  const { element: t } = e, s = E(
    `hidden.bs.${ee(e.name)}`
  );
  So(e), Cr(e), b(t, s), g.clear(t, "out");
}, dn = (e, t) => {
  const s = t ? k : O, { element: n, tooltip: o } = e, i = M(n, `.${X}`), r = M(n, `.${Z}`);
  t ? [n, o].forEach((c) => e._observer.observe(c)) : e._observer.disconnect(), i && s(i, `hide.bs.${X}`, e.handleHide), r && s(r, `hide.bs.${Z}`, e.handleHide);
}, Ho = (e, t) => {
  const s = [Co, xo], { element: n } = e;
  L(
    n,
    s[t ? 0 : 1],
    t || Y(n, s[0]) || ""
  ), Dt(n, s[t ? 1 : 0]);
};
class Ts extends st {
  static selector = $r;
  static init = yr;
  static getInstance = cn;
  static styleTip = ss;
  constructor(t, s) {
    super(t, s);
    const { element: n } = this, o = this.name === Ht, i = o ? ct : Pt, r = o ? Ht : Es;
    cn = (f) => F(f, r), this.enabled = !0, this.id = `${i}-${On(n, i)}`;
    const { options: c } = this;
    if (!c.title && o || !o && !c.content)
      return;
    at(ns, { titleAttr: "" }), Jt(n, xo) && o && typeof c.title == "string" && Ho(this, c.title);
    const a = Tr(n), l = ["sticky", "fixed", "relative"].some(
      (f) => W(a, "position") === f
    ) ? a : Ln(n);
    this.container = a, this.offsetParent = l, Er(this), this.tooltip && (this._observer = new us(() => this.update()), this._toggleEventListeners(!0));
  }
  get name() {
    return Ht;
  }
  get defaults() {
    return ns;
  }
  handleFocus = () => lt(this.element);
  handleShow = () => this.show();
  show() {
    const { options: t, tooltip: s, element: n, container: o, id: i } = this, { animation: r } = t, c = g.get(n, "out");
    g.clear(n, "out"), s && !c && !Qt(this) && g.set(
      n,
      () => {
        const a = E(
          `show.bs.${ee(this.name)}`
        );
        b(n, a), a.defaultPrevented || (oo(s, o), L(n, xn, `#${i}`), this.update(), dn(this, !0), h(s, p) || d(s, p), r ? S(s, () => an(this)) : an(this));
      },
      17,
      "in"
    );
  }
  handleHide = () => this.hide();
  hide() {
    const { options: t, tooltip: s, element: n } = this, { animation: o, delay: i } = t;
    g.clear(n, "in"), s && Qt(this) && g.set(
      n,
      () => {
        const r = E(
          `hide.bs.${ee(this.name)}`
        );
        b(n, r), r.defaultPrevented || (this.update(), v(s, p), dn(this), o ? S(s, () => ln(this)) : ln(this));
      },
      i + 17,
      "out"
    );
  }
  update = () => {
    ss(this);
  };
  toggle = () => {
    const { tooltip: t } = this;
    t && !Qt(this) ? this.show() : this.hide();
  };
  enable() {
    const { enabled: t } = this;
    t || (this._toggleEventListeners(!0), this.enabled = !t);
  }
  disable() {
    const { tooltip: t, enabled: s } = this;
    s && (t && Qt(this) && this.hide(), this._toggleEventListeners(), this.enabled = !s);
  }
  toggleEnabled() {
    this.enabled ? this.disable() : this.enable();
  }
  handleTouch = ({ target: t }) => {
    const { tooltip: s, element: n } = this;
    s && s.contains(t) || t === n || t && n.contains(t) || this.hide();
  };
  _toggleEventListeners = (t) => {
    const s = t ? k : O, { element: n, options: o, btn: i } = this, { trigger: r } = o, a = !!(this.name !== Ht && o.dismissible);
    r.includes("manual") || (this.enabled = !!t, r.split(" ").forEach((f) => {
      f === Wo ? (s(n, Hn, this.handleShow), s(n, Ce, this.handleShow), a || (s(n, cs, this.handleHide), s(
        w(n),
        as,
        this.handleTouch,
        te
      ))) : f === D ? s(n, f, a ? this.handleShow : this.toggle) : f === is && (s(n, rs, this.handleShow), a || s(n, Sn, this.handleHide), Uo() && s(n, D, this.handleFocus)), a && i && s(i, D, this.handleHide);
    }));
  };
  dispose() {
    const { tooltip: t, options: s } = this, n = { ...this, name: this.name }, o = () => setTimeout(
      () => xr(n, () => super.dispose()),
      17
    );
    s.animation && Qt(n) ? (this.options.delay = 0, this.hide(), S(t, o)) : o();
  }
}
const Sr = `[${ot}="${Pt}"],[data-tip="${Pt}"]`, Hr = at({}, ns, {
  template: $o(Pt),
  content: "",
  dismissible: !1,
  btnClose: '<button class="btn-close position-absolute top-0 end-0 m-1" aria-label="Close"></button>'
}), _r = (e) => F(e, Es), Ar = (e) => new _o(e);
class _o extends Ts {
  static selector = Sr;
  static init = Ar;
  static getInstance = _r;
  static styleTip = ss;
  constructor(t, s) {
    super(t, s);
  }
  get name() {
    return Es;
  }
  get defaults() {
    return Hr;
  }
  show = () => {
    super.show();
    const { options: t, btn: s } = this;
    t.dismissible && s && setTimeout(() => lt(s), 17);
  };
}
const Pr = "scrollspy", Ao = "ScrollSpy", Dr = '[data-bs-spy="scroll"]', Ir = "[href]", Lr = {
  offset: 10,
  target: void 0
}, kr = (e) => F(e, Ao), Or = (e) => new Do(e), hn = E(`activate.bs.${Pr}`), Nr = (e) => {
  const {
    target: t,
    _itemsLength: s,
    _observables: n
  } = e, o = fs("A", t), i = w(t);
  !o.length || s === n.size || (n.clear(), Array.from(o).forEach((r) => {
    const c = Y(r, "href")?.slice(1), a = c?.length ? i.getElementById(c) : null;
    a && !nt(r) && e._observables.set(a, r);
  }), e._itemsLength = e._observables.size);
}, Po = (e) => {
  Array.from(fs("A", e)).forEach(
    (t) => {
      h(t, T) && v(t, T);
    }
  );
}, fn = (e, t) => {
  const { target: s, element: n } = e;
  Po(s), e._activeItem = t, d(t, T);
  let o = t;
  for (; o !== s; )
    if (o = o.parentElement, ["nav", "dropdown-menu", "list-group"].some(
      (i) => h(o, i)
    )) {
      const i = o.previousElementSibling;
      i && !h(i, T) && d(i, T);
    }
  hn.relatedTarget = t, b(n, hn);
}, ze = (e, t) => {
  const { scrollTarget: s, element: n, options: o } = e;
  return (s !== n ? It(t).top + s.scrollTop : t.offsetTop) - (o.offset || 10);
};
class Do extends st {
  static selector = Dr;
  static init = Or;
  static getInstance = kr;
  constructor(t, s) {
    super(t, s);
    const { element: n, options: o } = this, i = x(
      o.target,
      w(n)
    );
    i && (this.target = i, this.scrollTarget = n.clientHeight < n.scrollHeight ? n : dt(n), this._observables = /* @__PURE__ */ new Map(), this.refresh(), this._observer = new us(() => {
      requestAnimationFrame(() => this.refresh());
    }, {
      root: this.scrollTarget
    }), this._toggleEventListeners(!0));
  }
  get name() {
    return Ao;
  }
  get defaults() {
    return Lr;
  }
  refresh = () => {
    const { target: t, scrollTarget: s } = this;
    if (!t || t.offsetHeight === 0) return;
    Nr(this);
    const { _itemsLength: n, _observables: o, _activeItem: i } = this;
    if (!n) return;
    const r = o.entries().toArray(), { scrollTop: c, scrollHeight: a, clientHeight: l } = s;
    if (c >= a - l) {
      const u = r[n - 1]?.[1];
      i !== u && fn(this, u);
      return;
    }
    const f = r[0]?.[0] ? ze(this, r[0][0]) : null;
    if (f !== null && c < f && f > 0) {
      this._activeItem = null, Po(t);
      return;
    }
    for (let u = 0; u < n; u += 1) {
      const [$, I] = r[u], B = ze(this, $), G = r[u + 1]?.[0], m = G ? ze(this, G) : null;
      if (i !== I && c >= B && (m === null || c < m)) {
        fn(this, I);
        break;
      }
    }
  };
  _scrollTo = (t) => {
    const s = M(t.target, Ir), n = s && Y(s, "href")?.slice(1), o = n && di(n, this.target);
    o && (this.scrollTarget.scrollTo({
      top: o.offsetTop,
      behavior: "smooth"
    }), t.preventDefault());
  };
  _toggleEventListeners = (t) => {
    const { target: s, _observables: n, _observer: o, _scrollTo: i } = this;
    (t ? k : O)(s, D, i), t ? n?.forEach((c, a) => o.observe(a)) : o.disconnect();
  };
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
const he = "tab", Io = "Tab", os = `[${ot}="${he}"]`, Lo = (e) => F(e, Io), Mr = (e) => new ko(e), Ke = E(
  `show.bs.${he}`
), un = E(
  `shown.bs.${he}`
), Ve = E(
  `hide.bs.${he}`
), gn = E(
  `hidden.bs.${he}`
), ie = /* @__PURE__ */ new Map(), pn = (e) => {
  const { tabContent: t, nav: s } = e;
  t && h(t, Lt) && (t.style.height = "", v(t, Lt)), s && g.clear(s);
}, mn = (e) => {
  const { element: t, tabContent: s, content: n, nav: o } = e, { tab: i } = _(o) && ie.get(o) || { tab: null };
  if (s && n && h(n, N)) {
    const { currentHeight: r, nextHeight: c } = ie.get(t) || { currentHeight: 0, nextHeight: 0 };
    r !== c ? setTimeout(() => {
      s.style.height = `${c}px`, Ot(s), S(s, () => pn(e));
    }, 50) : pn(e);
  } else o && g.clear(o);
  un.relatedTarget = i, b(t, un);
}, vn = (e) => {
  const { element: t, content: s, tabContent: n, nav: o } = e, { tab: i, content: r } = o && ie.get(o) || { tab: null, content: null };
  let c = 0;
  if (n && s && h(s, N) && ([r, s].forEach((a) => {
    a && d(a, "overflow-hidden");
  }), c = r ? r.scrollHeight : 0), Ke.relatedTarget = i, gn.relatedTarget = t, b(t, Ke), !Ke.defaultPrevented) {
    if (s && d(s, T), r && v(r, T), n && s && h(s, N)) {
      const a = s.scrollHeight;
      ie.set(t, {
        currentHeight: c,
        nextHeight: a,
        tab: null,
        content: null
      }), d(n, Lt), n.style.height = `${c}px`, Ot(n), [r, s].forEach((l) => {
        l && v(l, "overflow-hidden");
      });
    }
    s && s && h(s, N) ? setTimeout(() => {
      d(s, p), S(s, () => {
        mn(e);
      });
    }, 1) : (s && d(s, p), mn(e)), i && b(i, gn);
  }
}, bn = (e) => {
  const { nav: t } = e;
  if (!_(t))
    return { tab: null, content: null };
  const s = rt(
    T,
    t
  );
  let n = null;
  s.length === 1 && !kt.some(
    (i) => h(s[0].parentElement, i)
  ) ? [n] = s : s.length > 1 && (n = s[s.length - 1]);
  const o = _(n) ? K(n) : null;
  return { tab: n, content: o };
}, wn = (e) => {
  if (!_(e)) return null;
  const t = M(e, `.${kt.join(",.")}`);
  return t ? x(`.${kt[0]}-toggle`, t) : null;
}, Br = (e) => {
  const t = M(e.target, os), s = t && Lo(t);
  s && (e.preventDefault(), s.show());
};
class ko extends st {
  static selector = os;
  static init = Mr;
  static getInstance = Lo;
  constructor(t) {
    super(t);
    const { element: s } = this, n = K(s);
    if (!n) return;
    const o = M(s, ".nav"), i = M(
      n,
      ".tab-content"
    );
    this.nav = o, this.content = n, this.tabContent = i, this.dropdown = wn(s);
    const { tab: r } = bn(this);
    if (o && !r) {
      const c = x(os, o), a = c && K(c);
      a && (d(c, T), d(a, p), d(a, T), L(s, ke, "true"));
    }
    this._toggleEventListeners(!0);
  }
  get name() {
    return Io;
  }
  show() {
    const { element: t, content: s, nav: n, dropdown: o } = this;
    if (n && g.get(n) || h(t, T)) return;
    const { tab: i, content: r } = bn(this);
    if (n && i && ie.set(n, { tab: i, content: r, currentHeight: 0, nextHeight: 0 }), Ve.relatedTarget = t, !_(i) || (b(i, Ve), Ve.defaultPrevented)) return;
    d(t, T), L(t, ke, "true");
    const c = _(i) && wn(i);
    if (c && h(c, T) && v(c, T), n) {
      const a = () => {
        i && (v(i, T), L(i, ke, "false")), o && !h(o, T) && d(o, T);
      };
      r && (h(r, N) || s && h(s, N)) ? g.set(n, a, 1) : a();
    }
    r && (v(r, p), h(r, N) ? S(r, () => vn(this)) : vn(this));
  }
  _toggleEventListeners = (t) => {
    (t ? k : O)(this.element, D, Br);
  };
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
const Q = "toast", Oo = "Toast", Rr = `.${Q}`, Wr = `[${Se}="${Q}"]`, Fr = `[${ot}="${Q}"]`, Vt = "showing", No = "hide", jr = {
  animation: !0,
  autohide: !0,
  delay: 5e3
}, $s = (e) => F(e, Oo), zr = (e) => new Mo(e), En = E(
  `show.bs.${Q}`
), Kr = E(
  `shown.bs.${Q}`
), Tn = E(
  `hide.bs.${Q}`
), Vr = E(
  `hidden.bs.${Q}`
), $n = (e) => {
  const { element: t, options: s } = e;
  v(t, Vt), g.clear(t, Vt), b(t, Kr), s.autohide && g.set(t, () => e.hide(), s.delay, Q);
}, yn = (e) => {
  const { element: t } = e;
  v(t, Vt), v(t, p), d(t, No), g.clear(t, Q), b(t, Vr);
}, Xr = (e) => {
  const { element: t, options: s } = e;
  d(t, Vt), s.animation ? (Ot(t), S(t, () => yn(e))) : yn(e);
}, qr = (e) => {
  const { element: t, options: s } = e;
  g.set(
    t,
    () => {
      v(t, No), Ot(t), d(t, p), d(t, Vt), s.animation ? S(t, () => $n(e)) : $n(e);
    },
    17,
    Vt
  );
};
function Ur(e) {
  const t = K(this), s = t && $s(t);
  nt(this) || s && (this.tagName === "A" && e.preventDefault(), s.relatedTarget = this, s.show());
}
const Yr = (e) => {
  const t = e.target, s = $s(t), { type: n, relatedTarget: o } = e;
  !s || t === o || t.contains(o) || ([Ce, rs].includes(n) ? g.clear(t, Q) : g.set(t, () => s.hide(), s.options.delay, Q));
};
class Mo extends st {
  static selector = Rr;
  static init = zr;
  static getInstance = $s;
  constructor(t, s) {
    super(t, s);
    const { element: n, options: o } = this;
    o.animation && !h(n, N) ? d(n, N) : !o.animation && h(n, N) && v(n, N), this.dismiss = x(Wr, n), this.triggers = [
      ...q(
        Fr,
        w(n)
      )
    ].filter(
      (i) => K(i) === n
    ), this._toggleEventListeners(!0);
  }
  get name() {
    return Oo;
  }
  get defaults() {
    return jr;
  }
  get isShown() {
    return h(this.element, p);
  }
  show = () => {
    const { element: t, isShown: s } = this;
    !t || s || (b(t, En), En.defaultPrevented || qr(this));
  };
  hide = () => {
    const { element: t, isShown: s } = this;
    !t || !s || (b(t, Tn), Tn.defaultPrevented || Xr(this));
  };
  _toggleEventListeners = (t) => {
    const s = t ? k : O, { element: n, triggers: o, dismiss: i, options: r, hide: c } = this;
    i && s(i, D, c), r.autohide && [rs, Sn, Ce, cs].forEach(
      (a) => s(n, a, Yr)
    ), o.length && o.forEach((a) => {
      s(a, D, Ur);
    });
  };
  dispose() {
    const { element: t, isShown: s } = this;
    this._toggleEventListeners(), g.clear(t, Q), s && v(t, p), super.dispose();
  }
}
const ys = /* @__PURE__ */ new Map();
[
  Rn,
  Fn,
  Kn,
  qn,
  Gn,
  mo,
  To,
  _o,
  Do,
  ko,
  Mo,
  Ts
].forEach((e) => ys.set(e.prototype.name, e));
const Zr = (e, t) => {
  [...t].forEach((s) => e(s));
}, Qr = (e, t) => {
  const s = _t.getAllFor(e);
  s && [...s].forEach(([n, o]) => {
    t.contains(n) && o.dispose();
  });
}, Cn = (e) => {
  const t = e && e.nodeName ? e : document, s = [...fs("*", t)];
  ys.forEach((n) => {
    const { init: o, selector: i } = n;
    Zr(
      o,
      s.filter((r) => kn(r, i))
    );
  });
}, Gr = (e) => {
  const t = e && e.nodeName ? e : document;
  ys.forEach((s) => {
    Qr(s.prototype.name, t);
  });
};
document.body ? Cn() : k(document, "DOMContentLoaded", () => Cn(), {
  once: !0
});
export {
  Rn as Alert,
  Fn as Button,
  Kn as Carousel,
  qn as Collapse,
  Gn as Dropdown,
  mo as Modal,
  To as Offcanvas,
  _o as Popover,
  Do as ScrollSpy,
  ko as Tab,
  Mo as Toast,
  Ts as Tooltip,
  Cn as initCallback,
  Gr as removeDataAPI
};
//# sourceMappingURL=bootstrap-native.mjs.map
