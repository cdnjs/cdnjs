const Cn = "aria-describedby", Ee = "aria-expanded", re = "aria-hidden", $e = "aria-modal", Cs = "aria-pressed", Oe = "aria-selected", is = "focus", rs = "focusin", _n = "focusout", ye = "keydown", Ro = "keyup", D = "click", xn = "mousedown", Fo = "hover", Ce = "mouseenter", cs = "mouseleave", Wo = "pointerdown", zo = "pointermove", jo = "pointerup", as = "touchstart", Ko = "dragstart", Vo = 'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"]', Xe = "ArrowDown", qe = "ArrowUp", _s = "ArrowLeft", xs = "ArrowRight", ls = "Escape", Xo = "transitionDuration", qo = "transitionDelay", ke = "transitionend", Sn = "transitionProperty", Uo = () => {
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
}, Y = (e, t) => e.getAttribute(t), Jt = (e, t) => e.hasAttribute(t), I = (e, t, s) => e.setAttribute(t, s), Dt = (e, t) => e.removeAttribute(t), d = (e, ...t) => {
  e.classList.add(...t);
}, v = (e, ...t) => {
  e.classList.remove(...t);
}, h = (e, t) => e.classList.contains(t), ce = (e) => e != null && typeof e == "object" || !1, A = (e) => ce(e) && typeof e.nodeType == "number" && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].some(
  (t) => e.nodeType === t
) || !1, j = (e) => A(e) && e.nodeType === 1 || !1, zt = /* @__PURE__ */ new Map(), Ht = {
  data: zt,
  set: (e, t, s) => {
    j(e) && (zt.has(t) || zt.set(t, /* @__PURE__ */ new Map()), zt.get(t).set(e, s));
  },
  getAllFor: (e) => zt.get(e) || null,
  get: (e, t) => {
    if (!j(e) || !t) return null;
    const s = Ht.getAllFor(t);
    return e && s && s.get(e) || null;
  },
  remove: (e, t) => {
    const s = Ht.getAllFor(t);
    !s || !j(e) || (s.delete(e), s.size === 0 && zt.delete(t));
  }
}, F = (e, t) => Ht.get(e, t), Ss = (e) => e?.trim().replace(
  /(?:^\w|[A-Z]|\b\w)/g,
  (t, s) => s === 0 ? t.toLowerCase() : t.toUpperCase()
).replace(/\s+/g, ""), ae = (e) => typeof e == "string" || !1, Hn = (e) => ce(e) && e.constructor.name === "Window" || !1, An = (e) => A(e) && e.nodeType === 9 || !1, w = (e) => An(e) ? e : A(e) ? e.ownerDocument : Hn(e) ? e.document : globalThis.document, at = (e, ...t) => Object.assign(e, ...t), bt = (e) => {
  if (!e) return;
  if (ae(e))
    return w().createElement(e);
  const { tagName: t } = e, s = bt(t);
  if (!s) return;
  const n = { ...e };
  return delete n.tagName, at(s, n);
}, b = (e, t) => e.dispatchEvent(t), R = (e, t, s) => {
  const n = getComputedStyle(e, s), o = t.replace("webkit", "Webkit").replace(/([A-Z])/g, "-$1").toLowerCase();
  return n.getPropertyValue(o);
}, Qo = (e) => {
  const t = R(e, Sn), s = R(e, qo), n = s.includes("ms") ? 1 : 1e3, o = t && t !== "none" ? parseFloat(s) * n : 0;
  return Number.isNaN(o) ? 0 : o;
}, le = (e) => {
  const t = R(e, Sn), s = R(e, Xo), n = s.includes("ms") ? 1 : 1e3, o = t && t !== "none" ? parseFloat(s) * n : 0;
  return Number.isNaN(o) ? 0 : o;
}, x = (e, t) => {
  let s = 0;
  const n = new Event(ke), o = le(e), i = Qo(e);
  if (o) {
    const r = (c) => {
      c.target === e && (t.apply(e, [c]), e.removeEventListener(ke, r), s = 1);
    };
    e.addEventListener(ke, r), setTimeout(() => {
      s || b(e, n);
    }, o + i + 17);
  } else
    t.apply(e, [n]);
}, lt = (e, t) => e.focus(t), Hs = (e) => ["true", !0].includes(e) ? !0 : ["false", !1].includes(e) ? !1 : ["null", "", null, void 0].includes(e) ? null : e !== "" && !Number.isNaN(+e) ? +e : e, pe = (e) => Object.entries(e), Go = (e, t, s, n) => {
  if (!j(e)) return t;
  const o = { ...s }, i = { ...e.dataset }, r = { ...t }, c = {}, a = "title";
  return pe(i).forEach(([l, f]) => {
    const p = typeof l == "string" && l.includes(n) ? Ss(l.replace(n, "")) : Ss(l);
    c[p] = Hs(f);
  }), pe(o).forEach(([l, f]) => {
    o[l] = Hs(f);
  }), pe(t).forEach(([l, f]) => {
    l in o ? r[l] = o[l] : l in c ? r[l] = c[l] : r[l] = l === a ? Y(e, a) : f;
  }), r;
}, As = (e) => Object.keys(e), E = (e, t) => {
  const s = new CustomEvent(e, {
    cancelable: !0,
    bubbles: !0
  });
  return ce(t) && at(s, t), s;
}, te = { passive: !0 }, kt = (e) => e.offsetHeight, S = (e, t) => {
  pe(t).forEach(([s, n]) => {
    if (n && ae(s) && s.includes("--"))
      e.style.setProperty(s, n);
    else {
      const o = {};
      o[s] = n, at(e.style, o);
    }
  });
}, Ue = (e) => ce(e) && e.constructor.name === "Map" || !1, Jo = (e) => typeof e == "number" || !1, pt = /* @__PURE__ */ new Map(), u = {
  set: (e, t, s, n) => {
    j(e) && (n && n.length ? (pt.has(e) || pt.set(e, /* @__PURE__ */ new Map()), pt.get(e).set(n, setTimeout(t, s))) : pt.set(e, setTimeout(t, s)));
  },
  get: (e, t) => {
    if (!j(e)) return null;
    const s = pt.get(e);
    return t && s && Ue(s) ? s.get(t) || null : Jo(s) ? s : null;
  },
  clear: (e, t) => {
    if (!j(e)) return;
    const s = pt.get(e);
    t && t.length && Ue(s) ? (clearTimeout(s.get(t)), s.delete(t), s.size === 0 && pt.delete(e)) : (clearTimeout(s), pt.delete(e));
  }
}, ee = (e) => e.toLowerCase(), U = (e, t) => (A(t) ? t : w()).querySelectorAll(e), ds = /* @__PURE__ */ new Map();
function Pn(e) {
  const { shiftKey: t, code: s } = e, n = w(this), o = [
    ...U(Vo, this)
  ].filter(
    (c) => !Jt(c, "disabled") && !Y(c, re)
  );
  if (!o.length) return;
  const i = o[0], r = o[o.length - 1];
  s === "Tab" && (t && n.activeElement === i ? (r.focus(), e.preventDefault()) : !t && n.activeElement === r && (i.focus(), e.preventDefault()));
}
const hs = (e) => ds.has(e) === !0, ti = (e) => {
  hs(e) || (Yo(e, "keydown", Pn), ds.set(e, !0));
}, ei = (e) => {
  hs(e) && (Zo(e, "keydown", Pn), ds.delete(e));
}, _e = (e) => {
  hs(e) ? ei(e) : ti(e);
}, H = (e) => j(e) && "offsetWidth" in e || !1, It = (e, t) => {
  const { width: s, height: n, top: o, right: i, bottom: r, left: c } = e.getBoundingClientRect();
  let a = 1, l = 1;
  if (t && H(e)) {
    const { offsetWidth: f, offsetHeight: p } = e;
    a = f > 0 ? Math.round(s) / f : 1, l = p > 0 ? Math.round(n) / p : 1;
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
  const t = Hn(e), s = t ? e.scrollX : e.scrollLeft, n = t ? e.scrollY : e.scrollTop;
  return { x: s, y: n };
}, Dn = (e) => A(e) && e.constructor.name === "ShadowRoot" || !1, ni = (e) => e.nodeName === "HTML" ? e : j(e) && e.assignedSlot || A(e) && e.parentNode || Dn(e) && e.host || dt(e), In = (e) => e ? An(e) ? e.defaultView : A(e) ? e?.ownerDocument?.defaultView : e : window, oi = (e) => A(e) && ["TABLE", "TD", "TH"].includes(e.nodeName) || !1, Ln = (e, t) => e.matches(t), ii = (e) => {
  if (!H(e)) return !1;
  const { width: t, height: s } = It(e), { offsetWidth: n, offsetHeight: o } = e;
  return Math.round(t) !== n || Math.round(s) !== o;
}, ri = (e, t, s) => {
  const n = H(t), o = It(
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
const jt = /* @__PURE__ */ new Map(), On = (e, t) => {
  let s = t ? Ps : Ds;
  if (t) {
    const n = On(e), o = jt.get(n) || /* @__PURE__ */ new Map();
    jt.has(n) || jt.set(n, o), Ue(o) && !o.has(t) ? (o.set(t, s), Ps += 1) : s = o.get(t);
  } else {
    const n = e.id || e;
    jt.has(n) ? s = jt.get(n) : (jt.set(n, s), Ds += 1);
  }
  return s;
}, ci = (e) => Array.isArray(e) || !1, kn = (e) => {
  if (!A(e)) return !1;
  const { top: t, bottom: s } = It(e), { clientHeight: n } = dt(e);
  return t <= n && s >= 0;
}, Nn = (e) => typeof e == "function" || !1, ai = (e) => ce(e) && e.constructor.name === "NodeList" || !1, Tt = (e) => dt(e).dir === "rtl", M = (e, t) => !e || !t ? null : e.closest(t) || M(e.getRootNode().host, t) || null, _ = (e, t) => j(e) ? e : (j(t) ? t : w()).querySelector(e), fs = (e, t) => (A(t) ? t : w()).getElementsByTagName(
  e
), li = (e, t) => w(t).getElementById(e), rt = (e, t) => (t && A(t) ? t : w()).getElementsByClassName(
  e
), Kt = {}, Mn = (e) => {
  const { type: t, currentTarget: s } = e;
  Kt[t].forEach((n, o) => {
    s === o && n.forEach((i, r) => {
      r.apply(o, [e]), typeof i == "object" && i.once && O(o, t, r, i);
    });
  });
}, L = (e, t, s, n) => {
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
}, k = "fade", g = "show", xe = "data-bs-dismiss", Se = "alert", Bn = "Alert", nt = (e) => h(e, "disabled") || Y(e, "disabled") === "true", di = "5.1.5", hi = di;
class st {
  constructor(t, s) {
    let n;
    try {
      if (j(t))
        n = t;
      else if (ae(t)) {
        if (n = _(t), !n) throw Error(`"${t}" is not a valid selector.`);
      } else
        throw Error("your target is not an instance of HTMLElement.");
    } catch (i) {
      throw Error(`${this.name} Error: ${i.message}`);
    }
    const o = Ht.get(n, this.name);
    o && o._toggleEventListeners(), this.element = n, this.options = this.defaults && As(this.defaults).length ? Go(n, this.defaults, s || {}, "bs") : {}, Ht.set(n, this.name, this);
  }
  get version() {
    return hi;
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
    Ht.remove(this.element, this.name), As(this).forEach((t) => {
      delete this[t];
    });
  }
}
const fi = `.${Se}`, ui = `[${xe}="${Se}"]`, gi = (e) => F(e, Bn), pi = (e) => new Rn(e), Is = E(
  `close.bs.${Se}`
), mi = E(
  `closed.bs.${Se}`
), Ls = (e) => {
  const { element: t } = e;
  b(t, mi), e._toggleEventListeners(), e.dispose(), t.remove();
};
class Rn extends st {
  static selector = fi;
  static init = pi;
  static getInstance = gi;
  dismiss;
  constructor(t) {
    super(t), this.dismiss = _(
      ui,
      this.element
    ), this._toggleEventListeners(!0);
  }
  get name() {
    return Bn;
  }
  close = (t) => {
    const { element: s, dismiss: n } = this;
    !s || !h(s, g) || t && n && nt(n) || (b(s, Is), !Is.defaultPrevented && (v(s, g), h(s, k) ? x(s, () => Ls(this)) : Ls(this)));
  };
  _toggleEventListeners = (t) => {
    const s = t ? L : O, { dismiss: n, close: o } = this;
    n && s(n, D, o);
  };
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
const T = "active", ot = "data-bs-toggle", vi = "button", Fn = "Button", bi = `[${ot}="${vi}"]`, wi = (e) => F(e, Fn), Ei = (e) => new Wn(e);
class Wn extends st {
  static selector = bi;
  static init = Ei;
  static getInstance = wi;
  constructor(t) {
    super(t);
    const { element: s } = this;
    this.isActive = h(s, T), I(s, Cs, String(!!this.isActive)), this._toggleEventListeners(!0);
  }
  get name() {
    return Fn;
  }
  toggle = (t) => {
    t && t.preventDefault();
    const { element: s, isActive: n } = this;
    if (nt(s)) return;
    (n ? v : d)(s, T), I(s, Cs, n ? "false" : "true"), this.isActive = h(s, T);
  };
  _toggleEventListeners = (t) => {
    (t ? L : O)(this.element, D, this.toggle);
  };
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
const Ye = "data-bs-target", At = "carousel", zn = "Carousel", Os = "data-bs-parent", Ti = "data-bs-container", K = (e) => {
  const t = [Ye, Os, Ti, "href"], s = w(e);
  return t.map((n) => {
    const o = Y(e, n);
    return o ? n === Os ? M(e, o) : _(o, s) : null;
  }).filter((n) => n)[0];
}, de = `[data-bs-ride="${At}"]`, tt = `${At}-item`, Ze = "data-bs-slide-to", vt = "data-bs-slide", wt = "paused", ks = {
  pause: "hover",
  keyboard: !1,
  touch: !0,
  interval: 5e3
}, ht = (e) => F(e, zn), $i = (e) => new Kn(e);
let Gt = 0, me = 0, Ne = 0;
const Me = E(`slide.bs.${At}`), Qe = E(`slid.bs.${At}`), Ns = (e) => {
  const { index: t, direction: s, element: n, slides: o, options: i } = e;
  if (e.isAnimating) {
    const r = Ge(e), c = s === "left" ? "next" : "prev", a = s === "left" ? "start" : "end";
    d(o[t], T), v(o[t], `${tt}-${c}`), v(o[t], `${tt}-${a}`), v(o[r], T), v(o[r], `${tt}-${a}`), b(n, Qe), u.clear(n, vt), e.cycle && !w(n).hidden && i.interval && !e.isPaused && e.cycle();
  }
};
function yi() {
  const e = ht(this);
  e && !e.isPaused && !u.get(this, wt) && d(this, wt);
}
function Ci() {
  const e = ht(this);
  e && e.isPaused && !u.get(this, wt) && e.cycle();
}
function _i(e) {
  e.preventDefault();
  const t = M(this, de) || K(this), s = t && ht(t);
  if (nt(this) || !s || s.isAnimating) return;
  const n = +(Y(this, Ze) || 0);
  this && !h(this, T) && !Number.isNaN(n) && s.to(n);
}
function xi(e) {
  e.preventDefault();
  const t = M(this, de) || K(this), s = t && ht(t);
  if (nt(this) || !s || s.isAnimating) return;
  const n = Y(this, vt);
  n === "next" ? s.next() : n === "prev" && s.prev();
}
const Si = ({ code: e, target: t }) => {
  const s = w(t), [n] = [...U(de, s)].filter((a) => kn(a)), o = ht(n);
  if (!o || o.isAnimating || /textarea|input|select/i.test(t.nodeName)) return;
  const i = Tt(n);
  e === (i ? xs : _s) ? o.prev() : e === (i ? _s : xs) && o.next();
};
function Ms(e) {
  const { target: t } = e, s = ht(this);
  s && s.isTouch && (s.indicator && !s.indicator.contains(t) || !s.controls.includes(t)) && (e.stopImmediatePropagation(), e.stopPropagation(), e.preventDefault());
}
function Hi(e) {
  const { target: t } = e, s = ht(this);
  if (!s || s.isAnimating || s.isTouch) return;
  const { controls: n, indicators: o } = s;
  [...n, ...o].every(
    (i) => i === t || i.contains(t)
  ) || (Gt = e.pageX, this.contains(t) && (s.isTouch = !0, jn(s, !0)));
}
const Ai = (e) => {
  me = e.pageX;
}, Pi = (e) => {
  const { target: t } = e, s = w(t), n = [...U(de, s)].map((c) => ht(c)).find((c) => c.isTouch);
  if (!n) return;
  const { element: o, index: i } = n, r = Tt(o);
  Ne = e.pageX, n.isTouch = !1, jn(n), !s.getSelection()?.toString().length && o.contains(t) && Math.abs(Gt - Ne) > 120 && (me < Gt ? n.to(i + (r ? -1 : 1)) : me > Gt && n.to(i + (r ? 1 : -1))), Gt = 0, me = 0, Ne = 0;
}, Be = (e, t) => {
  const { indicators: s } = e;
  [...s].forEach((n) => v(n, T)), e.indicators[t] && d(s[t], T);
}, jn = (e, t) => {
  const { element: s } = e, n = t ? L : O;
  n(
    w(s),
    zo,
    Ai,
    te
  ), n(
    w(s),
    jo,
    Pi,
    te
  );
}, Ge = (e) => {
  const { slides: t, element: s } = e, n = _(
    `.${tt}.${T}`,
    s
  );
  return n ? [...t].indexOf(n) : -1;
};
class Kn extends st {
  static selector = de;
  static init = $i;
  static getInstance = ht;
  constructor(t, s) {
    super(t, s);
    const { element: n } = this;
    this.direction = Tt(n) ? "right" : "left", this.isTouch = !1, this.slides = rt(tt, n);
    const { slides: o } = this;
    if (o.length < 2) return;
    const i = Ge(this), r = [...o].find(
      (l) => Ln(l, `.${tt}-next`)
    );
    this.index = i;
    const c = w(n);
    this.controls = [
      ...U(`[${vt}]`, n),
      ...U(
        `[${vt}][${Ye}="#${n.id}"]`,
        c
      )
    ].filter((l, f, p) => f === p.indexOf(l)), this.indicator = _(
      `.${At}-indicators`,
      n
    ), this.indicators = [
      ...this.indicator ? U(`[${Ze}]`, this.indicator) : [],
      ...U(
        `[${Ze}][${Ye}="#${n.id}"]`,
        c
      )
    ].filter((l, f, p) => f === p.indexOf(l));
    const { options: a } = this;
    this.options.interval = a.interval === !0 ? ks.interval : a.interval, r ? this.index = [...o].indexOf(r) : i < 0 && (this.index = 0, d(o[0], T), this.indicators.length && Be(this, 0)), this.indicators.length && Be(this, this.index), this._toggleEventListeners(!0), a.interval && this.cycle();
  }
  get name() {
    return zn;
  }
  get defaults() {
    return ks;
  }
  get isPaused() {
    return h(this.element, wt);
  }
  get isAnimating() {
    return _(
      `.${tt}-next,.${tt}-prev`,
      this.element
    ) !== null;
  }
  cycle() {
    const { element: t, options: s, isPaused: n, index: o } = this;
    u.clear(t, At), n && (u.clear(t, wt), v(t, wt)), u.set(
      t,
      () => {
        this.element && !this.isPaused && !this.isTouch && kn(t) && this.to(o + 1);
      },
      s.interval,
      At
    );
  }
  pause() {
    const { element: t, options: s } = this;
    this.isPaused || !s.interval || (d(t, wt), u.set(
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
    if (this.isAnimating || i === c || u.get(s, vt)) return;
    i < c || i === 0 && c === n.length - 1 ? this.direction = r ? "right" : "left" : (i > c || i === n.length - 1 && c === 0) && (this.direction = r ? "left" : "right");
    const { direction: a } = this;
    c < 0 ? c = n.length - 1 : c >= n.length && (c = 0);
    const l = a === "left" ? "next" : "prev", f = a === "left" ? "start" : "end", p = {
      relatedTarget: n[c],
      from: i,
      to: c,
      direction: a
    };
    at(Me, p), at(Qe, p), b(s, Me), !Me.defaultPrevented && (this.index = c, Be(this, c), le(n[c]) && h(s, "slide") ? u.set(
      s,
      () => {
        d(n[c], `${tt}-${l}`), kt(n[c]), d(n[c], `${tt}-${f}`), d(n[i], `${tt}-${f}`), x(
          n[c],
          () => this.slides && this.slides.length && Ns(this)
        );
      },
      0,
      vt
    ) : (d(n[c], T), v(n[i], T), u.set(
      s,
      () => {
        u.clear(s, vt), s && o.interval && !this.isPaused && this.cycle(), b(s, Qe);
      },
      0,
      vt
    )));
  }
  _toggleEventListeners = (t) => {
    const { element: s, options: n, slides: o, controls: i, indicators: r } = this, { touch: c, pause: a, interval: l, keyboard: f } = n, p = t ? L : O;
    a && l && (p(s, Ce, yi), p(s, cs, Ci)), c && o.length > 2 && (p(
      s,
      Wo,
      Hi,
      te
    ), p(s, as, Ms, { passive: !1 }), p(s, Ko, Ms, { passive: !1 })), i.length && i.forEach((y) => {
      p(y, D, xi);
    }), r.length && r.forEach((y) => {
      p(y, D, _i);
    }), f && p(w(s), ye, Si);
  };
  dispose() {
    const { isAnimating: t } = this, s = {
      ...this,
      isAnimating: t
    };
    this._toggleEventListeners(), super.dispose(), s.isAnimating && x(s.slides[s.index], () => {
      Ns(s);
    });
  }
}
const Lt = "collapsing", z = "collapse", Vn = "Collapse", Di = `.${z}`, Xn = `[${ot}="${z}"]`, Ii = { parent: null }, ve = (e) => F(e, Vn), Li = (e) => new qn(e), Bs = E(`show.bs.${z}`), Oi = E(`shown.bs.${z}`), Rs = E(`hide.bs.${z}`), ki = E(`hidden.bs.${z}`), Ni = (e) => {
  const { element: t, parent: s, triggers: n } = e;
  b(t, Bs), Bs.defaultPrevented || (u.set(t, Te, 17), s && u.set(s, Te, 17), d(t, Lt), v(t, z), S(t, { height: `${t.scrollHeight}px` }), x(t, () => {
    u.clear(t), s && u.clear(s), n.forEach((o) => I(o, Ee, "true")), v(t, Lt), d(t, z), d(t, g), S(t, { height: "" }), b(t, Oi);
  }));
}, Fs = (e) => {
  const { element: t, parent: s, triggers: n } = e;
  b(t, Rs), Rs.defaultPrevented || (u.set(t, Te, 17), s && u.set(s, Te, 17), S(t, { height: `${t.scrollHeight}px` }), v(t, z), v(t, g), d(t, Lt), kt(t), S(t, { height: "0px" }), x(t, () => {
    u.clear(t), s && u.clear(s), n.forEach((o) => I(o, Ee, "false")), v(t, Lt), d(t, z), S(t, { height: "" }), b(t, ki);
  }));
}, Mi = (e) => {
  const { target: t } = e, s = t && M(t, Xn), n = s && K(s), o = n && ve(n);
  s && nt(s) || o && (o.toggle(), s?.tagName === "A" && e.preventDefault());
};
class qn extends st {
  static selector = Di;
  static init = Li;
  static getInstance = ve;
  constructor(t, s) {
    super(t, s);
    const { element: n, options: o } = this, i = w(n);
    this.triggers = [...U(Xn, i)].filter(
      (r) => K(r) === n
    ), this.parent = H(o.parent) ? o.parent : ae(o.parent) ? K(n) || _(o.parent, i) : null, this._toggleEventListeners(!0);
  }
  get name() {
    return Vn;
  }
  get defaults() {
    return Ii;
  }
  hide() {
    const { triggers: t, element: s } = this;
    u.get(s) || (Fs(this), t.length && t.forEach((n) => d(n, `${z}d`)));
  }
  show() {
    const { element: t, parent: s, triggers: n } = this;
    let o, i;
    s && (o = [
      ...U(`.${z}.${g}`, s)
    ].find((r) => ve(r)), i = o && ve(o)), (!s || !u.get(s)) && !u.get(t) && (i && o !== t && (Fs(i), i.triggers.forEach((r) => {
      d(r, `${z}d`);
    })), Ni(this), n.length && n.forEach((r) => v(r, `${z}d`)));
  }
  toggle() {
    h(this.element, g) ? this.hide() : this.show();
  }
  _toggleEventListeners = (t) => {
    const s = t ? L : O, { triggers: n } = this;
    n.length && n.forEach((o) => {
      s(o, D, Mi);
    });
  };
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
var Bi = "1.1.0";
const Ri = [
  "all",
  "intersecting",
  "update"
], Ws = "PositionObserver Error";
var us = class {
  entries;
  static version = Bi;
  /** `PositionObserver.tick` */
  _t;
  /** `PositionObserver.root` */
  _r;
  /** `PositionObserver.callbackMode` */
  _cm;
  /** `PositionObserver.root.clientWidth` */
  _w;
  /** `PositionObserver.root.clientHeight` */
  _h;
  /** `IntersectionObserver.options.rootMargin` */
  _rm;
  /** `IntersectionObserver.options.threshold` */
  _th;
  /** `PositionObserver.callback` */
  _c;
  /**
  * The constructor takes two arguments, a `callback`, which is called
  * whenever the position of an observed element changes and an `options` object.
  * The callback function takes an array of `PositionObserverEntry` objects
  * as its first argument and the PositionObserver instance as its second argument.
  *
  * @param callback the callback that applies to all targets of this observer
  * @param options the options of this observer
  */
  constructor(e, t) {
    if (!Nn(e)) throw new Error(`${Ws}: ${e} is not a function.`);
    this.entries = /* @__PURE__ */ new Map(), this._c = e, this._t = 0;
    const s = j(t?.root) ? t.root : document?.documentElement;
    this._r = s, this._rm = t?.rootMargin, this._th = t?.threshold;
    this._cm = Ri.indexOf(t?.callbackMode || "intersecting"), this._w = s.clientWidth, this._h = s.clientHeight;
  }
  /**
  * Start observing the position of the specified element.
  * If the element is not currently attached to the DOM,
  * it will NOT be added to the entries.
  *
  * @param target an `Element` target
  */
  observe = (e) => {
    if (!j(e)) throw new Error(`${Ws}: ${e} is not an instance of Element.`);
    this._r.contains(e) && this._n(e).then((t) => {
      t.boundingClientRect && !this.getEntry(e) && this.entries.set(e, t);
      this._t || (this._t = requestAnimationFrame(this._rc));
    });
  };
  /**
  * Stop observing the position of the specified element.
  *
  * @param target an `Element` target
  */
  unobserve = (e) => {
    this.entries.has(e) && this.entries.delete(e);
  };
  /**
  * Private method responsible for all the heavy duty,
  * the observer's runtime.
  * `PositionObserver.runCallback`
  */
  _rc = () => {
    if (!this.entries.size) {
      this._t = 0;
      return;
    }
    const { clientWidth: e, clientHeight: t } = this._r, s = new Promise((n) => {
      const o = [];
      this.entries.forEach(({ target: i, boundingClientRect: r, isIntersecting: c }) => {
        this._r.contains(i) && this._n(i).then((a) => {
          if (!a.isIntersecting) {
            if (this._cm === 1) return;
            if (this._cm === 2) {
              c && (this.entries.set(i, a), o.push(a));
              return;
            }
          }
          const { left: l, top: f } = a.boundingClientRect;
          (r.top !== f || r.left !== l || this._w !== e || this._h !== t) && (this.entries.set(i, a), o.push(a));
        });
      }), this._w = e, this._h = t, n(o);
    });
    this._t = requestAnimationFrame(async () => {
      const n = await s;
      n.length && this._c(n, this), this._rc();
    });
  };
  /**
  * Check intersection status and resolve it
  * right away.
  *
  * `PositionObserver.newEntryForTarget`
  *
  * @param target an `Element` target
  */
  _n = (e) => new Promise((t) => {
    new IntersectionObserver(([n], o) => {
      o.disconnect(), t(n);
    }, {
      threshold: this._th,
      rootMargin: this._rm
    }).observe(e);
  });
  /**
  * Find the entry for a given target.
  *
  * @param target an `HTMLElement` target
  */
  getEntry = (e) => this.entries.get(e);
  /**
  * Immediately stop observing all elements.
  */
  disconnect = () => {
    cancelAnimationFrame(this._t), this.entries.clear(), this._t = 0;
  };
};
const Ot = ["dropdown", "dropup", "dropstart", "dropend"], Un = "Dropdown", Yn = "dropdown-menu", Zn = (e) => {
  const t = M(e, "A");
  return e.tagName === "A" && Jt(e, "href") && Y(e, "href")?.slice(-1) === "#" || t && Jt(t, "href") && Y(t, "href")?.slice(-1) === "#";
}, [et, Je, ts, es] = Ot, Fi = `[${ot}="${et}"]`, se = (e) => F(e, Un), Wi = (e) => new Gn(e), zi = `${Yn}-end`, zs = [et, Je], js = [ts, es], Ks = ["A", "BUTTON"], ji = {
  offset: 5,
  display: "dynamic"
}, Re = E(
  `show.bs.${et}`
), Vs = E(
  `shown.bs.${et}`
), Fe = E(
  `hide.bs.${et}`
), Xs = E(`hidden.bs.${et}`), Qn = E(`updated.bs.${et}`), qs = (e) => {
  const { element: t, menu: s, parentElement: n, options: o } = e, { offset: i } = o;
  if (R(s, "position") === "static") return;
  const r = Tt(t), c = h(s, zi);
  ["margin", "top", "bottom", "left", "right"].forEach((B) => {
    const Ct = {};
    Ct[B] = "", S(s, Ct);
  });
  let l = Ot.find((B) => h(n, B)) || et;
  const f = {
    dropdown: [i, 0, 0],
    dropup: [0, 0, i],
    dropstart: r ? [-1, 0, 0, i] : [-1, i, 0],
    dropend: r ? [-1, i, 0] : [-1, 0, 0, i]
  }, p = {
    dropdown: { top: "100%" },
    dropup: { top: "auto", bottom: "100%" },
    dropstart: r ? { left: "100%", right: "auto" } : { left: "auto", right: "100%" },
    dropend: r ? { left: "auto", right: "100%" } : { left: "100%", right: "auto" },
    menuStart: r ? { right: "0", left: "auto" } : { right: "auto", left: "0" },
    menuEnd: r ? { right: "auto", left: "0" } : { right: "0", left: "auto" }
  }, { offsetWidth: y, offsetHeight: N } = s, { clientWidth: q, clientHeight: G } = dt(t), {
    left: m,
    top: V,
    width: $t,
    height: yt
  } = It(t), C = m - y - i < 0, ft = m + y + $t + i >= q, it = V + N + i >= G, J = V + N + yt + i >= G, Bt = V - N - i < 0, $ = (!r && c || r && !c) && m + $t - y < 0, W = (r && c || !r && !c) && m + y >= q;
  if (js.includes(l) && C && ft && (l = et), l === ts && (r ? ft : C) && (l = es), l === es && (r ? C : ft) && (l = ts), l === Je && Bt && !J && (l = et), l === et && J && !Bt && (l = Je), js.includes(l) && it && at(p[l], {
    top: "auto",
    bottom: 0
  }), zs.includes(l) && ($ || W)) {
    let B = { left: "auto", right: "auto" };
    !$ && W && !r && (B = { left: "auto", right: 0 }), $ && !W && r && (B = { left: 0, right: "auto" }), B && at(p[l], B);
  }
  const Rt = f[l];
  S(s, {
    ...p[l],
    margin: `${Rt.map((B) => B && `${B}px`).join(" ")}`
  }), zs.includes(l) && c && c && S(s, p[!r && $ || r && W ? "menuStart" : "menuEnd"]), b(n, Qn);
}, Ki = (e) => Array.from(e.children).map((t) => {
  if (t && Ks.includes(t.tagName)) return t;
  const { firstElementChild: s } = t;
  return s && Ks.includes(s.tagName) ? s : null;
}).filter((t) => t), Us = (e) => {
  const { element: t, options: s, menu: n } = e, o = e.open ? L : O, i = w(t);
  o(i, D, Ys), o(i, is, Ys), o(i, ye, Xi), o(i, Ro, qi), s.display === "dynamic" && (e.open ? e._observer.observe(n) : e._observer.disconnect());
}, gs = (e) => {
  const t = [...Ot, "btn-group", "input-group"].map(
    (s) => rt(`${s} ${g}`, w(e))
  ).find((s) => s.length);
  if (t && t.length)
    return [...t[0].children].find(
      (s) => Ot.some((n) => n === Y(s, ot))
    );
}, Ys = (e) => {
  const { target: t, type: s } = e;
  if (!H(t)) return;
  const n = gs(t), o = n && se(n);
  if (!o) return;
  const { parentElement: i, menu: r } = o, c = i && i.contains(t) && (t.tagName === "form" || M(t, "form") !== null);
  [D, xn].includes(s) && Zn(t) && e.preventDefault(), !c && s !== is && t !== n && t !== r && o.hide();
};
function Vi(e) {
  const t = se(this);
  nt(this) || t && (e.stopPropagation(), t.toggle(), Zn(this) && e.preventDefault());
}
const Xi = (e) => {
  [Xe, qe].includes(e.code) && e.preventDefault();
};
function qi(e) {
  const { code: t } = e, s = gs(this);
  if (!s) return;
  const n = se(s), { activeElement: o } = w(s);
  if (!n || !o) return;
  const { menu: i, open: r } = n, c = Ki(i);
  if (c && c.length && [Xe, qe].includes(t)) {
    let a = c.indexOf(o);
    o === s ? a = 0 : t === qe ? a = a > 1 ? a - 1 : 0 : t === Xe && (a = a < c.length - 1 ? a + 1 : a), c[a] && lt(c[a]);
  }
  ls === t && r && (n.toggle(), lt(s));
}
class Gn extends st {
  static selector = Fi;
  static init = Wi;
  static getInstance = se;
  constructor(t, s) {
    super(t, s);
    const { parentElement: n } = this.element, [o] = rt(
      Yn,
      n
    );
    o && (this.parentElement = n, this.menu = o, this._observer = new us(
      () => qs(this)
    ), this._toggleEventListeners(!0));
  }
  get name() {
    return Un;
  }
  get defaults() {
    return ji;
  }
  toggle() {
    this.open ? this.hide() : this.show();
  }
  show() {
    const { element: t, open: s, menu: n, parentElement: o } = this;
    if (s) return;
    const i = gs(t), r = i && se(i);
    r && r.hide(), [Re, Vs, Qn].forEach(
      (c) => {
        c.relatedTarget = t;
      }
    ), b(o, Re), !Re.defaultPrevented && (d(n, g), d(o, g), I(t, Ee, "true"), qs(this), this.open = !s, lt(t), Us(this), b(o, Vs));
  }
  hide() {
    const { element: t, open: s, menu: n, parentElement: o } = this;
    s && ([Fe, Xs].forEach((i) => {
      i.relatedTarget = t;
    }), b(o, Fe), !Fe.defaultPrevented && (v(n, g), v(o, g), I(t, Ee, "false"), this.open = !s, Us(this), b(o, Xs)));
  }
  _toggleEventListeners = (t) => {
    (t ? L : O)(this.element, D, Vi);
  };
  dispose() {
    this.open && this.hide(), this._toggleEventListeners(), super.dispose();
  }
}
const X = "modal", ps = "Modal", ms = "Offcanvas", Ui = "fixed-top", Yi = "fixed-bottom", Jn = "sticky-top", to = "position-sticky", eo = (e) => [
  ...rt(Ui, e),
  ...rt(Yi, e),
  ...rt(Jn, e),
  ...rt(to, e),
  ...rt("is-fixed", e)
], Zi = (e) => {
  const t = Nt(e);
  S(t, {
    paddingRight: "",
    overflow: ""
  });
  const s = eo(t);
  s.length && s.forEach((n) => {
    S(n, {
      paddingRight: "",
      marginRight: ""
    });
  });
}, so = (e) => {
  const { clientWidth: t } = dt(e), { innerWidth: s } = In(e);
  return Math.abs(s - t);
}, no = (e, t) => {
  const s = Nt(e), n = parseInt(R(s, "paddingRight"), 10), i = R(s, "overflow") === "hidden" && n ? 0 : so(e), r = eo(s);
  t && (S(s, {
    overflow: "hidden",
    paddingRight: `${n + i}px`
  }), r.length && r.forEach((c) => {
    const a = R(c, "paddingRight");
    if (c.style.paddingRight = `${parseInt(a, 10) + i}px`, [Jn, to].some((l) => h(c, l))) {
      const l = R(c, "marginRight");
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
}, ro = "backdrop", Zs = `${X}-${ro}`, Qs = `${Z}-${ro}`, co = `.${X}.${g}`, bs = `.${Z}.${g}`, P = bt("div"), Mt = (e) => _(
  `${co},${bs}`,
  w(e)
), ws = (e) => {
  const t = e ? Zs : Qs;
  [Zs, Qs].forEach((s) => {
    v(P, s);
  }), d(P, t);
}, ao = (e, t, s) => {
  ws(s), oo(P, Nt(e)), t && d(P, k);
}, lo = () => {
  h(P, g) || (d(P, g), kt(P));
}, He = () => {
  v(P, g);
}, ho = (e) => {
  Mt(e) || (v(P, k), io(P, Nt(e)), Zi(e));
}, fo = (e) => H(e) && R(e, "visibility") !== "hidden" && e.offsetParent !== null, Qi = `.${X}`, Gi = `[${ot}="${X}"]`, Ji = `[${xe}="${X}"]`, uo = `${X}-static`, tr = {
  backdrop: !0,
  keyboard: !0
}, ne = (e) => F(e, ps), er = (e) => new mo(e), be = E(
  `show.bs.${X}`
), Gs = E(
  `shown.bs.${X}`
), We = E(
  `hide.bs.${X}`
), Js = E(
  `hidden.bs.${X}`
), go = (e) => {
  const { element: t } = e, s = so(t), { clientHeight: n, scrollHeight: o } = dt(t), { clientHeight: i, scrollHeight: r } = t, c = i !== r;
  if (!c && s) {
    const l = { [Tt(t) ? "paddingLeft" : "paddingRight"]: `${s}px` };
    S(t, l);
  }
  no(t, c || n !== o);
}, po = (e, t) => {
  const s = t ? L : O, { element: n } = e;
  s(n, D, or), s(w(n), ye, nr), t ? e._observer.observe(n) : e._observer.disconnect();
}, tn = (e) => {
  const { triggers: t, element: s, relatedTarget: n } = e;
  ho(s), S(s, { paddingRight: "", display: "" }), po(e);
  const o = be.relatedTarget || t.find(fo);
  o && lt(o), Js.relatedTarget = n || void 0, b(s, Js), _e(s);
}, en = (e) => {
  const { element: t, relatedTarget: s } = e;
  lt(t), po(e, !0), Gs.relatedTarget = s || void 0, b(t, Gs), _e(t);
}, sn = (e) => {
  const { element: t, hasFade: s } = e;
  S(t, { display: "block" }), go(e), Mt(t) || S(Nt(t), { overflow: "hidden" }), d(t, g), Dt(t, re), I(t, $e, "true"), s ? x(t, () => en(e)) : en(e);
}, nn = (e) => {
  const { element: t, options: s, hasFade: n } = e;
  s.backdrop && n && h(P, g) && !Mt(t) ? (He(), x(P, () => tn(e))) : tn(e);
};
function sr(e) {
  const t = K(this), s = t && ne(t);
  nt(this) || s && (this.tagName === "A" && e.preventDefault(), s.relatedTarget = this, s.toggle());
}
const nr = ({ code: e, target: t }) => {
  const s = _(co, w(t)), n = s && ne(s);
  if (!n) return;
  const { options: o } = n;
  o.keyboard && e === ls && h(s, g) && (n.relatedTarget = null, n.hide());
}, or = (e) => {
  const { currentTarget: t } = e, s = t && ne(t);
  if (!s || !t || u.get(t)) return;
  const { options: n, isStatic: o, modalDialog: i } = s, { backdrop: r } = n, { target: c } = e, a = w(t)?.getSelection()?.toString().length, l = i.contains(c), f = c && M(c, Ji);
  o && !l ? u.set(
    t,
    () => {
      d(t, uo), x(i, () => ir(s));
    },
    17
  ) : (f || !a && !o && !l && r) && (s.relatedTarget = f || null, s.hide(), e.preventDefault());
}, ir = (e) => {
  const { element: t, modalDialog: s } = e, n = (le(s) || 0) + 17;
  v(t, uo), u.set(t, () => u.clear(t), n);
};
class mo extends st {
  static selector = Qi;
  static init = er;
  static getInstance = ne;
  constructor(t, s) {
    super(t, s);
    const { element: n } = this, o = _(
      `.${X}-dialog`,
      n
    );
    o && (this.modalDialog = o, this.triggers = [
      ...U(
        Gi,
        w(n)
      )
    ].filter(
      (i) => K(i) === n
    ), this.isStatic = this.options.backdrop === "static", this.hasFade = h(n, k), this.relatedTarget = null, this._observer = new ResizeObserver(() => this.update()), this._toggleEventListeners(!0));
  }
  get name() {
    return ps;
  }
  get defaults() {
    return tr;
  }
  toggle() {
    h(this.element, g) ? this.hide() : this.show();
  }
  show() {
    const { element: t, options: s, hasFade: n, relatedTarget: o } = this, { backdrop: i } = s;
    let r = 0;
    if (h(t, g) || (be.relatedTarget = o || void 0, b(t, be), be.defaultPrevented)) return;
    const c = Mt(t);
    if (c && c !== t) {
      const a = ne(c) || F(
        c,
        ms
      );
      a && a.hide();
    }
    i ? (vs(P) ? ws(!0) : ao(t, n, !0), r = le(P), lo(), setTimeout(() => sn(this), r)) : (sn(this), c && h(P, g) && He());
  }
  hide() {
    const { element: t, hasFade: s, relatedTarget: n } = this;
    h(t, g) && (We.relatedTarget = n || void 0, b(t, We), !We.defaultPrevented && (v(t, g), I(t, re, "true"), Dt(t, $e), s ? x(t, () => nn(this)) : nn(this)));
  }
  update = () => {
    h(this.element, g) && go(this);
  };
  _toggleEventListeners = (t) => {
    const s = t ? L : O, { triggers: n } = this;
    n.length && n.forEach((o) => {
      s(o, D, sr);
    });
  };
  dispose() {
    const t = { ...this }, { modalDialog: s, hasFade: n } = t, o = () => setTimeout(() => super.dispose(), 17);
    this.hide(), this._toggleEventListeners(), n ? x(s, o) : o();
  }
}
const rr = `.${Z}`, vo = `[${ot}="${Z}"]`, cr = `[${xe}="${Z}"]`, Ae = `${Z}-toggling`, ar = {
  backdrop: !0,
  keyboard: !0,
  scroll: !1
}, oe = (e) => F(e, ms), lr = (e) => new To(e), we = E(`show.bs.${Z}`), bo = E(`shown.bs.${Z}`), ze = E(`hide.bs.${Z}`), wo = E(`hidden.bs.${Z}`), dr = (e) => {
  const { element: t } = e, { clientHeight: s, scrollHeight: n } = dt(t);
  no(t, s !== n);
}, Eo = (e, t) => {
  const s = t ? L : O, n = w(e.element);
  s(n, ye, gr), s(n, D, ur);
}, on = (e) => {
  const { element: t, options: s } = e;
  s.scroll || (dr(e), S(Nt(t), { overflow: "hidden" })), d(t, Ae), d(t, g), S(t, { visibility: "visible" }), x(t, () => pr(e));
}, hr = (e) => {
  const { element: t, options: s } = e, n = Mt(t);
  t.blur(), !n && s.backdrop && h(P, g) && He(), x(t, () => mr(e));
};
function fr(e) {
  const t = K(this), s = t && oe(t);
  nt(this) || s && (s.relatedTarget = this, s.toggle(), this.tagName === "A" && e.preventDefault());
}
const ur = (e) => {
  const { target: t } = e, s = _(
    bs,
    w(t)
  );
  if (!s) return;
  const n = _(
    cr,
    s
  ), o = oe(s);
  if (!o) return;
  const { options: i, triggers: r } = o, { backdrop: c } = i, a = M(t, vo), l = w(s).getSelection();
  P.contains(t) && c === "static" || (!(l && l.toString().length) && (!s.contains(t) && c && (!a || r.includes(t)) || n && n.contains(t)) && (o.relatedTarget = n && n.contains(t) ? n : void 0, o.hide()), a && a.tagName === "A" && e.preventDefault());
}, gr = ({ code: e, target: t }) => {
  const s = _(
    bs,
    w(t)
  ), n = s && oe(s);
  n && n.options.keyboard && e === ls && (n.relatedTarget = void 0, n.hide());
}, pr = (e) => {
  const { element: t } = e;
  v(t, Ae), Dt(t, re), I(t, $e, "true"), I(t, "role", "dialog"), b(t, bo), Eo(e, !0), lt(t), _e(t);
}, mr = (e) => {
  const { element: t, triggers: s } = e;
  I(t, re, "true"), Dt(t, $e), Dt(t, "role"), S(t, { visibility: "" });
  const n = we.relatedTarget || s.find(fo);
  n && lt(n), ho(t), b(t, wo), v(t, Ae), _e(t), Mt(t) || Eo(e);
};
class To extends st {
  static selector = rr;
  static init = lr;
  static getInstance = oe;
  constructor(t, s) {
    super(t, s);
    const { element: n } = this;
    this.triggers = [
      ...U(
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
    return ar;
  }
  toggle() {
    h(this.element, g) ? this.hide() : this.show();
  }
  show() {
    const { element: t, options: s, relatedTarget: n } = this;
    let o = 0;
    if (h(t, g) || (we.relatedTarget = n || void 0, bo.relatedTarget = n || void 0, b(t, we), we.defaultPrevented)) return;
    const i = Mt(t);
    if (i && i !== t) {
      const r = oe(i) || F(
        i,
        ps
      );
      r && r.hide();
    }
    s.backdrop ? (vs(P) ? ws() : ao(t, !0), o = le(P), lo(), setTimeout(() => on(this), o)) : (on(this), i && h(P, g) && He());
  }
  hide() {
    const { element: t, relatedTarget: s } = this;
    h(t, g) && (ze.relatedTarget = s || void 0, wo.relatedTarget = s || void 0, b(t, ze), !ze.defaultPrevented && (d(t, Ae), v(t, g), hr(this)));
  }
  _toggleEventListeners = (t) => {
    const s = t ? L : O;
    this.triggers.forEach((n) => {
      s(n, D, fr);
    });
  };
  dispose() {
    const { element: t } = this, s = h(t, g), n = () => setTimeout(() => super.dispose(), 1);
    this.hide(), this._toggleEventListeners(), s ? x(t, n) : n();
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
    S(n, {
      top: "",
      left: "",
      right: "",
      bottom: ""
    });
    const { offsetWidth: p, offsetHeight: y } = n, { clientWidth: N, clientHeight: q, offsetWidth: G } = dt(s);
    let { placement: m } = r;
    const { clientWidth: V, offsetWidth: $t } = o, C = R(
      o,
      "position"
    ) === "fixed", ft = Math.abs(C ? V - $t : N - G), it = a && C ? ft : 0, J = N - (a ? 0 : ft) - 1, Bt = e._observer.getEntry(s), {
      width: $,
      height: W,
      left: Rt,
      right: B,
      top: Ct
    } = Bt?.boundingClientRect || It(s, !0), {
      x: fe,
      y: Ft
    } = ri(
      s,
      i,
      { x: l, y: f }
    );
    S(c, {
      top: "",
      left: "",
      right: "",
      bottom: ""
    });
    let _t = 0, Xt = "", ut = 0, Pe = "", Wt = "", ue = "", De = "";
    const xt = c.offsetWidth || 0, gt = c.offsetHeight || 0, Ie = xt / 2;
    let qt = Ct - y - gt < 0, Ut = Ct + y + W + gt >= q, Yt = Rt - p - xt < it, Zt = Rt + p + $ + xt >= J;
    const ge = ["left", "right"], Le = ["top", "bottom"];
    qt = ge.includes(m) ? Ct + W / 2 - y / 2 - gt < 0 : qt, Ut = ge.includes(m) ? Ct + y / 2 + W / 2 + gt >= q : Ut, Yt = Le.includes(m) ? Rt + $ / 2 - p / 2 < it : Yt, Zt = Le.includes(m) ? Rt + p / 2 + $ / 2 >= J : Zt, m = ge.includes(m) && Yt && Zt ? "top" : m, m = m === "top" && qt ? "bottom" : m, m = m === "bottom" && Ut ? "top" : m, m = m === "left" && Yt ? "right" : m, m = m === "right" && Zt ? "left" : m, n.className.includes(m) || (n.className = n.className.replace(
      t,
      yo[m]
    )), ge.includes(m) ? (m === "left" ? ut = fe - p - xt : ut = fe + $ + xt, qt && Ut ? (_t = 0, Xt = 0, Wt = Ft + W / 2 - gt / 2) : qt ? (_t = Ft, Xt = "", Wt = W / 2 - xt) : Ut ? (_t = Ft - y + W, Xt = "", Wt = y - W / 2 - xt) : (_t = Ft - y / 2 + W / 2, Wt = y / 2 - gt / 2)) : Le.includes(m) && (m === "top" ? _t = Ft - y - gt : _t = Ft + W + gt, Yt ? (ut = 0, ue = fe + $ / 2 - Ie) : Zt ? (ut = "auto", Pe = 0, De = $ / 2 + J - B - Ie) : (ut = fe - p / 2 + $ / 2, ue = p / 2 - Ie)), S(n, {
      top: `${_t}px`,
      bottom: Xt === "" ? "" : `${Xt}px`,
      left: ut === "auto" ? ut : `${ut}px`,
      right: Pe !== "" ? `${Pe}px` : ""
    }), H(c) && (Wt !== "" && (c.style.top = `${Wt}px`), ue !== "" ? c.style.left = `${ue}px` : De !== "" && (c.style.right = `${De}px`));
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
}, Co = "data-original-title", St = "Tooltip", mt = (e, t, s) => {
  if (ae(t) && t.length) {
    let n = t.trim();
    Nn(s) && (n = s(n));
    const i = new DOMParser().parseFromString(n, "text/html");
    e.append(...i.body.childNodes);
  } else H(t) ? e.append(t) : (ai(t) || ci(t) && t.every(A)) && e.append(...t);
}, vr = (e) => {
  const t = e.name === St, { id: s, element: n, options: o } = e, {
    title: i,
    placement: r,
    template: c,
    animation: a,
    customClass: l,
    sanitizeFn: f,
    dismissible: p,
    content: y,
    btnClose: N
  } = o, q = t ? ct : Pt, G = { ...yo };
  let m = [], V = [];
  Tt(n) && (G.left = "end", G.right = "start");
  const $t = `bs-${q}-${G[r]}`;
  let yt;
  if (H(c))
    yt = c;
  else {
    const $ = bt("div");
    mt($, c, f), yt = $.firstChild;
  }
  if (!H(yt)) return;
  e.tooltip = yt.cloneNode(!0);
  const { tooltip: C } = e;
  I(C, "id", s), I(C, "role", ct);
  const ft = t ? `${ct}-inner` : `${Pt}-body`, it = t ? null : _(`.${Pt}-header`, C), J = _(`.${ft}`, C);
  e.arrow = _(
    `.${q}-arrow`,
    C
  );
  const { arrow: Bt } = e;
  if (H(i)) m = [i.cloneNode(!0)];
  else {
    const $ = bt("div");
    mt($, i, f), m = [...$.childNodes];
  }
  if (H(y)) V = [y.cloneNode(!0)];
  else {
    const $ = bt("div");
    mt($, y, f), V = [...$.childNodes];
  }
  if (p)
    if (i)
      if (H(N))
        m = [...m, N.cloneNode(!0)];
      else {
        const $ = bt("div");
        mt($, N, f), m = [...m, $.firstChild];
      }
    else if (it && it.remove(), H(N))
      V = [...V, N.cloneNode(!0)];
    else {
      const $ = bt("div");
      mt($, N, f), V = [...V, $.firstChild];
    }
  t ? i && J && mt(J, i, f) : (i && it && mt(it, m, f), y && J && mt(J, V, f), e.btn = _(".btn-close", C) || void 0), d(C, "position-absolute"), d(Bt, "position-absolute"), h(C, q) || d(C, q), a && !h(C, k) && d(C, k), l && !h(C, l) && d(C, l), h(C, $t) || d(C, $t);
}, br = (e) => {
  const t = ["HTML", "BODY"], s = [];
  let { parentNode: n } = e;
  for (; n && !t.includes(n.nodeName); )
    n = ni(n), Dn(n) || oi(n) || s.push(n);
  return s.find((o, i) => (R(o, "position") !== "relative" || R(o, "position") === "relative" && o.offsetHeight !== o.scrollHeight) && s.slice(i + 1).every(
    (r) => R(r, "position") === "static"
  ) ? o : null) || w(e).body;
}, wr = `[${ot}="${ct}"],[data-tip="${ct}"]`, _o = "title";
let rn = (e) => F(e, St);
const Er = (e) => new Ts(e), Tr = (e) => {
  const { element: t, tooltip: s, container: n } = e;
  Dt(t, Cn), io(
    s,
    n
  );
}, Qt = (e) => {
  const { tooltip: t, container: s } = e;
  return t && vs(t, s);
}, $r = (e, t) => {
  const { element: s } = e;
  e._toggleEventListeners(), Jt(s, Co) && e.name === St && So(e), t && t();
}, xo = (e, t) => {
  const s = t ? L : O, { element: n } = e;
  s(
    w(n),
    as,
    e.handleTouch,
    te
  );
}, cn = (e) => {
  const { element: t } = e, s = E(
    `shown.bs.${ee(e.name)}`
  );
  xo(e, !0), b(t, s), u.clear(t, "in");
}, an = (e) => {
  const { element: t } = e, s = E(
    `hidden.bs.${ee(e.name)}`
  );
  xo(e), Tr(e), b(t, s), u.clear(t, "out");
}, ln = (e, t) => {
  const s = t ? L : O, { element: n, tooltip: o } = e, i = M(n, `.${X}`), r = M(n, `.${Z}`);
  t ? [n, o].forEach((c) => e._observer.observe(c)) : e._observer.disconnect(), i && s(i, `hide.bs.${X}`, e.handleHide), r && s(r, `hide.bs.${Z}`, e.handleHide);
}, So = (e, t) => {
  const s = [Co, _o], { element: n } = e;
  I(
    n,
    s[t ? 0 : 1],
    t || Y(n, s[0]) || ""
  ), Dt(n, s[t ? 1 : 0]);
};
class Ts extends st {
  static selector = wr;
  static init = Er;
  static getInstance = rn;
  static styleTip = ss;
  constructor(t, s) {
    super(t, s);
    const { element: n } = this, o = this.name === St, i = o ? ct : Pt, r = o ? St : Es;
    rn = (f) => F(f, r), this.enabled = !0, this.id = `${i}-${On(n, i)}`;
    const { options: c } = this;
    if (!c.title && o || !o && !c.content)
      return;
    at(ns, { titleAttr: "" }), Jt(n, _o) && o && typeof c.title == "string" && So(this, c.title);
    const a = br(n), l = ["sticky", "fixed", "relative"].some(
      (f) => R(a, "position") === f
    ) ? a : In(n);
    this.container = a, this.offsetParent = l, vr(this), this.tooltip && (this._observer = new us(() => this.update()), this._toggleEventListeners(!0));
  }
  get name() {
    return St;
  }
  get defaults() {
    return ns;
  }
  handleFocus = () => lt(this.element);
  handleShow = () => this.show();
  show() {
    const { options: t, tooltip: s, element: n, container: o, id: i } = this, { animation: r } = t, c = u.get(n, "out");
    u.clear(n, "out"), s && !c && !Qt(this) && u.set(
      n,
      () => {
        const a = E(
          `show.bs.${ee(this.name)}`
        );
        b(n, a), a.defaultPrevented || (oo(s, o), I(n, Cn, `#${i}`), this.update(), ln(this, !0), h(s, g) || d(s, g), r ? x(s, () => cn(this)) : cn(this));
      },
      17,
      "in"
    );
  }
  handleHide = () => this.hide();
  hide() {
    const { options: t, tooltip: s, element: n } = this, { animation: o, delay: i } = t;
    u.clear(n, "in"), s && Qt(this) && u.set(
      n,
      () => {
        const r = E(
          `hide.bs.${ee(this.name)}`
        );
        b(n, r), r.defaultPrevented || (this.update(), v(s, g), ln(this), o ? x(s, () => an(this)) : an(this));
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
    const s = t ? L : O, { element: n, options: o, btn: i } = this, { trigger: r } = o, a = !!(this.name !== St && o.dismissible);
    r.includes("manual") || (this.enabled = !!t, r.split(" ").forEach((f) => {
      f === Fo ? (s(n, xn, this.handleShow), s(n, Ce, this.handleShow), a || (s(n, cs, this.handleHide), s(
        w(n),
        as,
        this.handleTouch,
        te
      ))) : f === D ? s(n, f, a ? this.handleShow : this.toggle) : f === is && (s(n, rs, this.handleShow), a || s(n, _n, this.handleHide), Uo() && s(n, D, this.handleFocus)), a && i && s(i, D, this.handleHide);
    }));
  };
  dispose() {
    const { tooltip: t, options: s } = this, n = { ...this, name: this.name }, o = () => setTimeout(
      () => $r(n, () => super.dispose()),
      17
    );
    s.animation && Qt(n) ? (this.options.delay = 0, this.hide(), x(t, o)) : o();
  }
}
const yr = `[${ot}="${Pt}"],[data-tip="${Pt}"]`, Cr = at({}, ns, {
  template: $o(Pt),
  content: "",
  dismissible: !1,
  btnClose: '<button class="btn-close position-absolute top-0 end-0 m-1" aria-label="Close"></button>'
}), _r = (e) => F(e, Es), xr = (e) => new Ho(e);
class Ho extends Ts {
  static selector = yr;
  static init = xr;
  static getInstance = _r;
  static styleTip = ss;
  constructor(t, s) {
    super(t, s);
  }
  get name() {
    return Es;
  }
  get defaults() {
    return Cr;
  }
  show = () => {
    super.show();
    const { options: t, btn: s } = this;
    t.dismissible && s && setTimeout(() => lt(s), 17);
  };
}
const Sr = "scrollspy", Ao = "ScrollSpy", Hr = '[data-bs-spy="scroll"]', Ar = "[href]", Pr = {
  offset: 10,
  target: void 0
}, Dr = (e) => F(e, Ao), Ir = (e) => new Do(e), dn = E(`activate.bs.${Sr}`), Lr = (e) => {
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
}, hn = (e, t) => {
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
  dn.relatedTarget = t, b(n, dn);
}, je = (e, t) => {
  const { scrollTarget: s, element: n, options: o } = e;
  return (s !== n ? It(t).top + s.scrollTop : t.offsetTop) - (o.offset || 10);
};
class Do extends st {
  static selector = Hr;
  static init = Ir;
  static getInstance = Dr;
  constructor(t, s) {
    super(t, s);
    const { element: n, options: o } = this, i = _(
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
    return Pr;
  }
  refresh = () => {
    const { target: t, scrollTarget: s } = this;
    if (!t || t.offsetHeight === 0) return;
    Lr(this);
    const { _itemsLength: n, _observables: o, _activeItem: i } = this;
    if (!n) return;
    const r = o.entries().toArray(), { scrollTop: c, scrollHeight: a, clientHeight: l } = s;
    if (c >= a - l) {
      const p = r[n - 1]?.[1];
      i !== p && hn(this, p);
      return;
    }
    const f = r[0]?.[0] ? je(this, r[0][0]) : null;
    if (f !== null && c < f && f > 0) {
      this._activeItem = null, Po(t);
      return;
    }
    for (let p = 0; p < n; p += 1) {
      const [y, N] = r[p], q = je(this, y), G = r[p + 1]?.[0], m = G ? je(this, G) : null;
      if (i !== N && c >= q && (m === null || c < m)) {
        hn(this, N);
        break;
      }
    }
  };
  _scrollTo = (t) => {
    const s = M(t.target, Ar), n = s && Y(s, "href")?.slice(1), o = n && li(n, this.target);
    o && (this.scrollTarget.scrollTo({
      top: o.offsetTop,
      behavior: "smooth"
    }), t.preventDefault());
  };
  _toggleEventListeners = (t) => {
    const { target: s, _observables: n, _observer: o, _scrollTo: i } = this;
    (t ? L : O)(s, D, i), t ? n?.forEach((c, a) => o.observe(a)) : o.disconnect();
  };
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
const he = "tab", Io = "Tab", os = `[${ot}="${he}"]`, Lo = (e) => F(e, Io), Or = (e) => new Oo(e), Ke = E(
  `show.bs.${he}`
), fn = E(
  `shown.bs.${he}`
), Ve = E(
  `hide.bs.${he}`
), un = E(
  `hidden.bs.${he}`
), ie = /* @__PURE__ */ new Map(), gn = (e) => {
  const { tabContent: t, nav: s } = e;
  t && h(t, Lt) && (t.style.height = "", v(t, Lt)), s && u.clear(s);
}, pn = (e) => {
  const { element: t, tabContent: s, content: n, nav: o } = e, { tab: i } = H(o) && ie.get(o) || { tab: null };
  if (s && n && h(n, k)) {
    const { currentHeight: r, nextHeight: c } = ie.get(t) || { currentHeight: 0, nextHeight: 0 };
    r !== c ? setTimeout(() => {
      s.style.height = `${c}px`, kt(s), x(s, () => gn(e));
    }, 50) : gn(e);
  } else o && u.clear(o);
  fn.relatedTarget = i, b(t, fn);
}, mn = (e) => {
  const { element: t, content: s, tabContent: n, nav: o } = e, { tab: i, content: r } = o && ie.get(o) || { tab: null, content: null };
  let c = 0;
  if (n && s && h(s, k) && ([r, s].forEach((a) => {
    a && d(a, "overflow-hidden");
  }), c = r ? r.scrollHeight : 0), Ke.relatedTarget = i, un.relatedTarget = t, b(t, Ke), !Ke.defaultPrevented) {
    if (s && d(s, T), r && v(r, T), n && s && h(s, k)) {
      const a = s.scrollHeight;
      ie.set(t, {
        currentHeight: c,
        nextHeight: a,
        tab: null,
        content: null
      }), d(n, Lt), n.style.height = `${c}px`, kt(n), [r, s].forEach((l) => {
        l && v(l, "overflow-hidden");
      });
    }
    s && s && h(s, k) ? setTimeout(() => {
      d(s, g), x(s, () => {
        pn(e);
      });
    }, 1) : (s && d(s, g), pn(e)), i && b(i, un);
  }
}, vn = (e) => {
  const { nav: t } = e;
  if (!H(t))
    return { tab: null, content: null };
  const s = rt(
    T,
    t
  );
  let n = null;
  s.length === 1 && !Ot.some(
    (i) => h(s[0].parentElement, i)
  ) ? [n] = s : s.length > 1 && (n = s[s.length - 1]);
  const o = H(n) ? K(n) : null;
  return { tab: n, content: o };
}, bn = (e) => {
  if (!H(e)) return null;
  const t = M(e, `.${Ot.join(",.")}`);
  return t ? _(`.${Ot[0]}-toggle`, t) : null;
}, kr = (e) => {
  const t = M(e.target, os), s = t && Lo(t);
  s && (e.preventDefault(), s.show());
};
class Oo extends st {
  static selector = os;
  static init = Or;
  static getInstance = Lo;
  constructor(t) {
    super(t);
    const { element: s } = this, n = K(s);
    if (!n) return;
    const o = M(s, ".nav"), i = M(
      n,
      ".tab-content"
    );
    this.nav = o, this.content = n, this.tabContent = i, this.dropdown = bn(s);
    const { tab: r } = vn(this);
    if (o && !r) {
      const c = _(os, o), a = c && K(c);
      a && (d(c, T), d(a, g), d(a, T), I(s, Oe, "true"));
    }
    this._toggleEventListeners(!0);
  }
  get name() {
    return Io;
  }
  show() {
    const { element: t, content: s, nav: n, dropdown: o } = this;
    if (n && u.get(n) || h(t, T)) return;
    const { tab: i, content: r } = vn(this);
    if (n && i && ie.set(n, { tab: i, content: r, currentHeight: 0, nextHeight: 0 }), Ve.relatedTarget = t, !H(i) || (b(i, Ve), Ve.defaultPrevented)) return;
    d(t, T), I(t, Oe, "true");
    const c = H(i) && bn(i);
    if (c && h(c, T) && v(c, T), n) {
      const a = () => {
        i && (v(i, T), I(i, Oe, "false")), o && !h(o, T) && d(o, T);
      };
      r && (h(r, k) || s && h(s, k)) ? u.set(n, a, 1) : a();
    }
    r && (v(r, g), h(r, k) ? x(r, () => mn(this)) : mn(this));
  }
  _toggleEventListeners = (t) => {
    (t ? L : O)(this.element, D, kr);
  };
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
const Q = "toast", ko = "Toast", Nr = `.${Q}`, Mr = `[${xe}="${Q}"]`, Br = `[${ot}="${Q}"]`, Vt = "showing", No = "hide", Rr = {
  animation: !0,
  autohide: !0,
  delay: 5e3
}, $s = (e) => F(e, ko), Fr = (e) => new Mo(e), wn = E(
  `show.bs.${Q}`
), Wr = E(
  `shown.bs.${Q}`
), En = E(
  `hide.bs.${Q}`
), zr = E(
  `hidden.bs.${Q}`
), Tn = (e) => {
  const { element: t, options: s } = e;
  v(t, Vt), u.clear(t, Vt), b(t, Wr), s.autohide && u.set(t, () => e.hide(), s.delay, Q);
}, $n = (e) => {
  const { element: t } = e;
  v(t, Vt), v(t, g), d(t, No), u.clear(t, Q), b(t, zr);
}, jr = (e) => {
  const { element: t, options: s } = e;
  d(t, Vt), s.animation ? (kt(t), x(t, () => $n(e))) : $n(e);
}, Kr = (e) => {
  const { element: t, options: s } = e;
  u.set(
    t,
    () => {
      v(t, No), kt(t), d(t, g), d(t, Vt), s.animation ? x(t, () => Tn(e)) : Tn(e);
    },
    17,
    Vt
  );
};
function Vr(e) {
  const t = K(this), s = t && $s(t);
  nt(this) || s && (this.tagName === "A" && e.preventDefault(), s.relatedTarget = this, s.show());
}
const Xr = (e) => {
  const t = e.target, s = $s(t), { type: n, relatedTarget: o } = e;
  !s || t === o || t.contains(o) || ([Ce, rs].includes(n) ? u.clear(t, Q) : u.set(t, () => s.hide(), s.options.delay, Q));
};
class Mo extends st {
  static selector = Nr;
  static init = Fr;
  static getInstance = $s;
  constructor(t, s) {
    super(t, s);
    const { element: n, options: o } = this;
    o.animation && !h(n, k) ? d(n, k) : !o.animation && h(n, k) && v(n, k), this.dismiss = _(Mr, n), this.triggers = [
      ...U(
        Br,
        w(n)
      )
    ].filter(
      (i) => K(i) === n
    ), this._toggleEventListeners(!0);
  }
  get name() {
    return ko;
  }
  get defaults() {
    return Rr;
  }
  get isShown() {
    return h(this.element, g);
  }
  show = () => {
    const { element: t, isShown: s } = this;
    !t || s || (b(t, wn), wn.defaultPrevented || Kr(this));
  };
  hide = () => {
    const { element: t, isShown: s } = this;
    !t || !s || (b(t, En), En.defaultPrevented || jr(this));
  };
  _toggleEventListeners = (t) => {
    const s = t ? L : O, { element: n, triggers: o, dismiss: i, options: r, hide: c } = this;
    i && s(i, D, c), r.autohide && [rs, _n, Ce, cs].forEach(
      (a) => s(n, a, Xr)
    ), o.length && o.forEach((a) => {
      s(a, D, Vr);
    });
  };
  dispose() {
    const { element: t, isShown: s } = this;
    this._toggleEventListeners(), u.clear(t, Q), s && v(t, g), super.dispose();
  }
}
const ys = /* @__PURE__ */ new Map();
[
  Rn,
  Wn,
  Kn,
  qn,
  Gn,
  mo,
  To,
  Ho,
  Do,
  Oo,
  Mo,
  Ts
].forEach((e) => ys.set(e.prototype.name, e));
const qr = (e, t) => {
  [...t].forEach((s) => e(s));
}, Ur = (e, t) => {
  const s = Ht.getAllFor(e);
  s && [...s].forEach(([n, o]) => {
    t.contains(n) && o.dispose();
  });
}, yn = (e) => {
  const t = e && e.nodeName ? e : document, s = [...fs("*", t)];
  ys.forEach((n) => {
    const { init: o, selector: i } = n;
    qr(
      o,
      s.filter((r) => Ln(r, i))
    );
  });
}, Yr = (e) => {
  const t = e && e.nodeName ? e : document;
  ys.forEach((s) => {
    Ur(s.prototype.name, t);
  });
};
document.body ? yn() : L(document, "DOMContentLoaded", () => yn(), {
  once: !0
});
export {
  Rn as Alert,
  Wn as Button,
  Kn as Carousel,
  qn as Collapse,
  Gn as Dropdown,
  mo as Modal,
  To as Offcanvas,
  Ho as Popover,
  Do as ScrollSpy,
  Oo as Tab,
  Mo as Toast,
  Ts as Tooltip,
  yn as initCallback,
  Yr as removeDataAPI
};
//# sourceMappingURL=bootstrap-native.mjs.map
