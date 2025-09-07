const Cn = "aria-describedby", Ee = "aria-expanded", re = "aria-hidden", $e = "aria-modal", Cs = "aria-pressed", ke = "aria-selected", rs = "focus", cs = "focusin", _n = "focusout", ye = "keydown", Wo = "keyup", D = "click", xn = "mousedown", zo = "hover", Ce = "mouseenter", as = "mouseleave", Sn = "pointerdown", jo = "pointermove", Ko = "pointerup", _e = "touchstart", Vo = "dragstart", Xo = 'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"]', qe = "ArrowDown", Ue = "ArrowUp", _s = "ArrowLeft", xs = "ArrowRight", ls = "Escape", qo = "transitionDuration", Uo = "transitionDelay", Ne = "transitionend", An = "transitionProperty", Hn = () => {
  const e = /iPhone|iPad|iPod|Android/i;
  return navigator?.userAgentData?.brands.some(
    (t) => e.test(t.brand)
  ) || e.test(navigator?.userAgent) || !1;
}, Yo = () => {
  const e = /(iPhone|iPod|iPad)/;
  return navigator?.userAgentData?.brands.some(
    (t) => e.test(t.brand)
  ) || e.test(
    navigator?.userAgent
  ) || !1;
}, Te = () => {
}, Zo = (e, t, s, n) => {
  e.addEventListener(
    t,
    s,
    !1
  );
}, Qo = (e, t, s, n) => {
  e.removeEventListener(
    t,
    s,
    !1
  );
}, Y = (e, t) => e.getAttribute(t), Jt = (e, t) => e.hasAttribute(t), I = (e, t, s) => e.setAttribute(t, s), Dt = (e, t) => e.removeAttribute(t), d = (e, ...t) => {
  e.classList.add(...t);
}, v = (e, ...t) => {
  e.classList.remove(...t);
}, h = (e, t) => e.classList.contains(t), ce = (e) => e != null && typeof e == "object" || !1, H = (e) => ce(e) && typeof e.nodeType == "number" && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].some(
  (t) => e.nodeType === t
) || !1, j = (e) => H(e) && e.nodeType === 1 || !1, zt = /* @__PURE__ */ new Map(), At = {
  data: zt,
  set: (e, t, s) => {
    j(e) && (zt.has(t) || zt.set(t, /* @__PURE__ */ new Map()), zt.get(t).set(e, s));
  },
  getAllFor: (e) => zt.get(e) || null,
  get: (e, t) => {
    if (!j(e) || !t) return null;
    const s = At.getAllFor(t);
    return e && s && s.get(e) || null;
  },
  remove: (e, t) => {
    const s = At.getAllFor(t);
    !s || !j(e) || (s.delete(e), s.size === 0 && zt.delete(t));
  }
}, F = (e, t) => At.get(e, t), Ss = (e) => e?.trim().replace(
  /(?:^\w|[A-Z]|\b\w)/g,
  (t, s) => s === 0 ? t.toLowerCase() : t.toUpperCase()
).replace(/\s+/g, ""), ae = (e) => typeof e == "string" || !1, Pn = (e) => ce(e) && e.constructor.name === "Window" || !1, Dn = (e) => H(e) && e.nodeType === 9 || !1, w = (e) => Dn(e) ? e : H(e) ? e.ownerDocument : Pn(e) ? e.document : globalThis.document, at = (e, ...t) => Object.assign(e, ...t), bt = (e) => {
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
}, Go = (e) => {
  const t = R(e, An), s = R(e, Uo), n = s.includes("ms") ? 1 : 1e3, o = t && t !== "none" ? parseFloat(s) * n : 0;
  return Number.isNaN(o) ? 0 : o;
}, le = (e) => {
  const t = R(e, An), s = R(e, qo), n = s.includes("ms") ? 1 : 1e3, o = t && t !== "none" ? parseFloat(s) * n : 0;
  return Number.isNaN(o) ? 0 : o;
}, x = (e, t) => {
  let s = 0;
  const n = new Event(Ne), o = le(e), i = Go(e);
  if (o) {
    const r = (c) => {
      c.target === e && (t.apply(e, [c]), e.removeEventListener(Ne, r), s = 1);
    };
    e.addEventListener(Ne, r), setTimeout(() => {
      s || b(e, n);
    }, o + i + 17);
  } else
    t.apply(e, [n]);
}, lt = (e, t) => e.focus(t), As = (e) => ["true", !0].includes(e) ? !0 : ["false", !1].includes(e) ? !1 : ["null", "", null, void 0].includes(e) ? null : e !== "" && !Number.isNaN(+e) ? +e : e, pe = (e) => Object.entries(e), Jo = (e, t, s, n) => {
  if (!j(e)) return t;
  const o = { ...s }, i = { ...e.dataset }, r = { ...t }, c = {}, a = "title";
  return pe(i).forEach(([l, f]) => {
    const p = typeof l == "string" && l.includes(n) ? Ss(l.replace(n, "")) : Ss(l);
    c[p] = As(f);
  }), pe(o).forEach(([l, f]) => {
    o[l] = As(f);
  }), pe(t).forEach(([l, f]) => {
    l in o ? r[l] = o[l] : l in c ? r[l] = c[l] : r[l] = l === a ? Y(e, a) : f;
  }), r;
}, Hs = (e) => Object.keys(e), E = (e, t) => {
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
}, Ye = (e) => ce(e) && e.constructor.name === "Map" || !1, ti = (e) => typeof e == "number" || !1, pt = /* @__PURE__ */ new Map(), u = {
  set: (e, t, s, n) => {
    j(e) && (n && n.length ? (pt.has(e) || pt.set(e, /* @__PURE__ */ new Map()), pt.get(e).set(n, setTimeout(t, s))) : pt.set(e, setTimeout(t, s)));
  },
  get: (e, t) => {
    if (!j(e)) return null;
    const s = pt.get(e);
    return t && s && Ye(s) ? s.get(t) || null : ti(s) ? s : null;
  },
  clear: (e, t) => {
    if (!j(e)) return;
    const s = pt.get(e);
    t && t.length && Ye(s) ? (clearTimeout(s.get(t)), s.delete(t), s.size === 0 && pt.delete(e)) : (clearTimeout(s), pt.delete(e));
  }
}, ee = (e) => e.toLowerCase(), U = (e, t) => (H(t) ? t : w()).querySelectorAll(e), ds = /* @__PURE__ */ new Map();
function In(e) {
  const { shiftKey: t, code: s } = e, n = w(this), o = [
    ...U(Xo, this)
  ].filter(
    (c) => !Jt(c, "disabled") && !Y(c, re)
  );
  if (!o.length) return;
  const i = o[0], r = o[o.length - 1];
  s === "Tab" && (t && n.activeElement === i ? (r.focus(), e.preventDefault()) : !t && n.activeElement === r && (i.focus(), e.preventDefault()));
}
const hs = (e) => ds.has(e) === !0, ei = (e) => {
  hs(e) || (Zo(e, "keydown", In), ds.set(e, !0));
}, si = (e) => {
  hs(e) && (Qo(e, "keydown", In), ds.delete(e));
}, xe = (e) => {
  hs(e) ? si(e) : ei(e);
}, A = (e) => j(e) && "offsetWidth" in e || !1, It = (e, t) => {
  const { width: s, height: n, top: o, right: i, bottom: r, left: c } = e.getBoundingClientRect();
  let a = 1, l = 1;
  if (t && A(e)) {
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
}, Nt = (e) => w(e).body, dt = (e) => w(e).documentElement, ni = (e) => {
  const t = Pn(e), s = t ? e.scrollX : e.scrollLeft, n = t ? e.scrollY : e.scrollTop;
  return { x: s, y: n };
}, Ln = (e) => H(e) && e.constructor.name === "ShadowRoot" || !1, oi = (e) => e.nodeName === "HTML" ? e : j(e) && e.assignedSlot || H(e) && e.parentNode || Ln(e) && e.host || dt(e), On = (e) => e ? Dn(e) ? e.defaultView : H(e) ? e?.ownerDocument?.defaultView : e : window, ii = (e) => H(e) && ["TABLE", "TD", "TH"].includes(e.nodeName) || !1, kn = (e, t) => e.matches(t), ri = (e) => {
  if (!A(e)) return !1;
  const { width: t, height: s } = It(e), { offsetWidth: n, offsetHeight: o } = e;
  return Math.round(t) !== n || Math.round(s) !== o;
}, ci = (e, t, s) => {
  const n = A(t), o = It(
    e,
    n && ri(t)
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
const jt = /* @__PURE__ */ new Map(), Nn = (e, t) => {
  let s = t ? Ps : Ds;
  if (t) {
    const n = Nn(e), o = jt.get(n) || /* @__PURE__ */ new Map();
    jt.has(n) || jt.set(n, o), Ye(o) && !o.has(t) ? (o.set(t, s), Ps += 1) : s = o.get(t);
  } else {
    const n = e.id || e;
    jt.has(n) ? s = jt.get(n) : (jt.set(n, s), Ds += 1);
  }
  return s;
}, ai = (e) => Array.isArray(e) || !1, Mn = (e) => {
  if (!H(e)) return !1;
  const { top: t, bottom: s } = It(e), { clientHeight: n } = dt(e);
  return t <= n && s >= 0;
}, Bn = (e) => typeof e == "function" || !1, li = (e) => ce(e) && e.constructor.name === "NodeList" || !1, Tt = (e) => dt(e).dir === "rtl", M = (e, t) => !e || !t ? null : e.closest(t) || M(e.getRootNode().host, t) || null, _ = (e, t) => j(e) ? e : (j(t) ? t : w()).querySelector(e), fs = (e, t) => (H(t) ? t : w()).getElementsByTagName(
  e
), di = (e, t) => w(t).getElementById(e), rt = (e, t) => (t && H(t) ? t : w()).getElementsByClassName(
  e
), Kt = {}, Rn = (e) => {
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
    Rn,
    n
  );
}, O = (e, t, s, n) => {
  const o = Kt[t], i = o && o.get(e), r = i && i.get(s), c = r !== void 0 ? r : n;
  i && i.has(s) && i.delete(s), o && (!i || !i.size) && o.delete(e), (!o || !o.size) && delete Kt[t], (!i || !i.size) && e.removeEventListener(
    t,
    Rn,
    c
  );
}, k = "fade", g = "show", Se = "data-bs-dismiss", Ae = "alert", Fn = "Alert", nt = (e) => h(e, "disabled") || Y(e, "disabled") === "true", hi = "5.1.6", fi = hi;
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
    const o = At.get(n, this.name);
    o && o._toggleEventListeners(), this.element = n, this.options = this.defaults && Hs(this.defaults).length ? Jo(n, this.defaults, s || {}, "bs") : {}, At.set(n, this.name, this);
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
    At.remove(this.element, this.name), Hs(this).forEach((t) => {
      delete this[t];
    });
  }
}
const ui = `.${Ae}`, gi = `[${Se}="${Ae}"]`, pi = (e) => F(e, Fn), mi = (e) => new Wn(e), Is = E(
  `close.bs.${Ae}`
), vi = E(
  `closed.bs.${Ae}`
), Ls = (e) => {
  const { element: t } = e;
  b(t, vi), e._toggleEventListeners(), e.dispose(), t.remove();
};
class Wn extends st {
  static selector = ui;
  static init = mi;
  static getInstance = pi;
  dismiss;
  constructor(t) {
    super(t), this.dismiss = _(
      gi,
      this.element
    ), this._toggleEventListeners(!0);
  }
  get name() {
    return Fn;
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
const T = "active", ot = "data-bs-toggle", bi = "button", zn = "Button", wi = `[${ot}="${bi}"]`, Ei = (e) => F(e, zn), Ti = (e) => new jn(e);
class jn extends st {
  static selector = wi;
  static init = Ti;
  static getInstance = Ei;
  constructor(t) {
    super(t);
    const { element: s } = this;
    this.isActive = h(s, T), I(s, Cs, String(!!this.isActive)), this._toggleEventListeners(!0);
  }
  get name() {
    return zn;
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
const Ze = "data-bs-target", Ht = "carousel", Kn = "Carousel", Os = "data-bs-parent", $i = "data-bs-container", K = (e) => {
  const t = [Ze, Os, $i, "href"], s = w(e);
  return t.map((n) => {
    const o = Y(e, n);
    return o ? n === Os ? M(e, o) : _(o, s) : null;
  }).filter((n) => n)[0];
}, de = `[data-bs-ride="${Ht}"]`, tt = `${Ht}-item`, Qe = "data-bs-slide-to", vt = "data-bs-slide", wt = "paused", yi = Hn() ? _e : Sn;
console.log({ isMobile: Hn(), touchEvent: yi });
const ks = {
  pause: "hover",
  keyboard: !1,
  touch: !0,
  interval: 5e3
}, ht = (e) => F(e, Kn), Ci = (e) => new Xn(e);
let Gt = 0, me = 0, Me = 0;
const Be = E(`slide.bs.${Ht}`), Ge = E(`slid.bs.${Ht}`), Ns = (e) => {
  const { index: t, direction: s, element: n, slides: o, options: i } = e;
  if (e.isAnimating) {
    const r = Je(e), c = s === "left" ? "next" : "prev", a = s === "left" ? "start" : "end";
    d(o[t], T), v(o[t], `${tt}-${c}`), v(o[t], `${tt}-${a}`), v(o[r], T), v(o[r], `${tt}-${a}`), b(n, Ge), u.clear(n, vt), e.cycle && !w(n).hidden && i.interval && !e.isPaused && e.cycle();
  }
};
function _i() {
  const e = ht(this);
  e && !e.isPaused && !u.get(this, wt) && d(this, wt);
}
function xi() {
  const e = ht(this);
  e && e.isPaused && !u.get(this, wt) && e.cycle();
}
function Si(e) {
  e.preventDefault();
  const t = M(this, de) || K(this), s = t && ht(t);
  if (nt(this) || !s || s.isAnimating) return;
  const n = +(Y(this, Qe) || 0);
  this && !h(this, T) && !Number.isNaN(n) && s.to(n);
}
function Ai(e) {
  e.preventDefault();
  const t = M(this, de) || K(this), s = t && ht(t);
  if (nt(this) || !s || s.isAnimating) return;
  const n = Y(this, vt);
  n === "next" ? s.next() : n === "prev" && s.prev();
}
const Hi = ({ code: e, target: t }) => {
  const s = w(t), [n] = [...U(de, s)].filter((a) => Mn(a)), o = ht(n);
  if (!o || o.isAnimating || /textarea|input|select/i.test(t.nodeName)) return;
  const i = Tt(n);
  e === (i ? xs : _s) ? o.prev() : e === (i ? _s : xs) && o.next();
};
function Ms(e) {
  const { target: t } = e, s = ht(this);
  s && s.isTouch && !s.controls.includes(t) && !s.controls.includes(t?.parentElement) && (!s.indicator || !s.indicator.contains(t)) && e.preventDefault();
}
function Pi(e) {
  const { target: t } = e, s = ht(this);
  if (!s || s.isAnimating || s.isTouch) return;
  const { controls: n, indicator: o } = s;
  ![...n, o].every(
    (i) => i && (i === t || i.contains(t))
  ) && this.contains(t) && (Gt = e.pageX, s.isTouch = !0, Vn(s, !0));
}
const Di = (e) => {
  me = e.pageX;
}, Ii = (e) => {
  const { target: t } = e, s = w(t), n = [...U(de, s)].map((c) => ht(c)).find((c) => c.isTouch);
  if (!n) return;
  const { element: o, index: i } = n, r = Tt(o);
  Me = e.pageX, n.isTouch = !1, Vn(n), !s.getSelection()?.toString().length && o.contains(t) && Math.abs(Gt - Me) > 120 && (me < Gt ? n.to(i + (r ? -1 : 1)) : me > Gt && n.to(i + (r ? 1 : -1))), Gt = 0, me = 0, Me = 0;
}, Re = (e, t) => {
  const { indicators: s } = e;
  [...s].forEach((n) => v(n, T)), e.indicators[t] && d(s[t], T);
}, Vn = (e, t) => {
  const { element: s } = e, n = t ? L : O;
  n(
    w(s),
    jo,
    Di,
    te
  ), n(
    w(s),
    Ko,
    Ii,
    te
  );
}, Je = (e) => {
  const { slides: t, element: s } = e, n = _(
    `.${tt}.${T}`,
    s
  );
  return n ? [...t].indexOf(n) : -1;
};
class Xn extends st {
  static selector = de;
  static init = Ci;
  static getInstance = ht;
  constructor(t, s) {
    super(t, s);
    const { element: n } = this;
    this.direction = Tt(n) ? "right" : "left", this.isTouch = !1, this.slides = rt(tt, n);
    const { slides: o } = this;
    if (o.length < 2) return;
    const i = Je(this), r = [...o].find(
      (l) => kn(l, `.${tt}-next`)
    );
    this.index = i;
    const c = w(n);
    this.controls = [
      ...U(`[${vt}]`, n),
      ...U(
        `[${vt}][${Ze}="#${n.id}"]`,
        c
      )
    ].filter((l, f, p) => f === p.indexOf(l)), this.indicator = _(
      `.${Ht}-indicators`,
      n
    ), this.indicators = [
      ...this.indicator ? U(`[${Qe}]`, this.indicator) : [],
      ...U(
        `[${Qe}][${Ze}="#${n.id}"]`,
        c
      )
    ].filter((l, f, p) => f === p.indexOf(l));
    const { options: a } = this;
    this.options.interval = a.interval === !0 ? ks.interval : a.interval, r ? this.index = [...o].indexOf(r) : i < 0 && (this.index = 0, d(o[0], T), this.indicators.length && Re(this, 0)), this.indicators.length && Re(this, this.index), this._toggleEventListeners(!0), a.interval && this.cycle();
  }
  get name() {
    return Kn;
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
    u.clear(t, Ht), n && (u.clear(t, wt), v(t, wt)), u.set(
      t,
      () => {
        this.element && !this.isPaused && !this.isTouch && Mn(t) && this.to(o + 1);
      },
      s.interval,
      Ht
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
    const { element: s, slides: n, options: o } = this, i = Je(this), r = Tt(s);
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
    at(Be, p), at(Ge, p), b(s, Be), !Be.defaultPrevented && (this.index = c, Re(this, c), le(n[c]) && h(s, "slide") ? u.set(
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
        u.clear(s, vt), s && o.interval && !this.isPaused && this.cycle(), b(s, Ge);
      },
      0,
      vt
    )));
  }
  _toggleEventListeners = (t) => {
    const { element: s, options: n, slides: o, controls: i, indicators: r } = this, { touch: c, pause: a, interval: l, keyboard: f } = n, p = t ? L : O;
    a && l && (p(s, Ce, _i), p(s, as, xi)), c && o.length > 2 && (p(
      s,
      Sn,
      Pi,
      te
    ), p(s, _e, Ms, { passive: !1 }), p(s, Vo, Ms, { passive: !1 })), i.length && i.forEach((y) => {
      p(y, D, Ai);
    }), r.length && r.forEach((y) => {
      p(y, D, Si);
    }), f && p(w(s), ye, Hi);
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
const Lt = "collapsing", z = "collapse", qn = "Collapse", Li = `.${z}`, Un = `[${ot}="${z}"]`, Oi = { parent: null }, ve = (e) => F(e, qn), ki = (e) => new Yn(e), Bs = E(`show.bs.${z}`), Ni = E(`shown.bs.${z}`), Rs = E(`hide.bs.${z}`), Mi = E(`hidden.bs.${z}`), Bi = (e) => {
  const { element: t, parent: s, triggers: n } = e;
  b(t, Bs), Bs.defaultPrevented || (u.set(t, Te, 17), s && u.set(s, Te, 17), d(t, Lt), v(t, z), S(t, { height: `${t.scrollHeight}px` }), x(t, () => {
    u.clear(t), s && u.clear(s), n.forEach((o) => I(o, Ee, "true")), v(t, Lt), d(t, z), d(t, g), S(t, { height: "" }), b(t, Ni);
  }));
}, Fs = (e) => {
  const { element: t, parent: s, triggers: n } = e;
  b(t, Rs), Rs.defaultPrevented || (u.set(t, Te, 17), s && u.set(s, Te, 17), S(t, { height: `${t.scrollHeight}px` }), v(t, z), v(t, g), d(t, Lt), kt(t), S(t, { height: "0px" }), x(t, () => {
    u.clear(t), s && u.clear(s), n.forEach((o) => I(o, Ee, "false")), v(t, Lt), d(t, z), S(t, { height: "" }), b(t, Mi);
  }));
}, Ri = (e) => {
  const { target: t } = e, s = t && M(t, Un), n = s && K(s), o = n && ve(n);
  s && nt(s) || o && (o.toggle(), s?.tagName === "A" && e.preventDefault());
};
class Yn extends st {
  static selector = Li;
  static init = ki;
  static getInstance = ve;
  constructor(t, s) {
    super(t, s);
    const { element: n, options: o } = this, i = w(n);
    this.triggers = [...U(Un, i)].filter(
      (r) => K(r) === n
    ), this.parent = A(o.parent) ? o.parent : ae(o.parent) ? K(n) || _(o.parent, i) : null, this._toggleEventListeners(!0);
  }
  get name() {
    return qn;
  }
  get defaults() {
    return Oi;
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
    })), Bi(this), n.length && n.forEach((r) => v(r, `${z}d`)));
  }
  toggle() {
    h(this.element, g) ? this.hide() : this.show();
  }
  _toggleEventListeners = (t) => {
    const s = t ? L : O, { triggers: n } = this;
    n.length && n.forEach((o) => {
      s(o, D, Ri);
    });
  };
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
var Fi = "1.1.0";
const Wi = [
  "all",
  "intersecting",
  "update"
], Ws = "PositionObserver Error";
var us = class {
  entries;
  static version = Fi;
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
    if (!Bn(e)) throw new Error(`${Ws}: ${e} is not a function.`);
    this.entries = /* @__PURE__ */ new Map(), this._c = e, this._t = 0;
    const s = j(t?.root) ? t.root : document?.documentElement;
    this._r = s, this._rm = t?.rootMargin, this._th = t?.threshold;
    this._cm = Wi.indexOf(t?.callbackMode || "intersecting"), this._w = s.clientWidth, this._h = s.clientHeight;
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
const Ot = ["dropdown", "dropup", "dropstart", "dropend"], Zn = "Dropdown", Qn = "dropdown-menu", Gn = (e) => {
  const t = M(e, "A");
  return e.tagName === "A" && Jt(e, "href") && Y(e, "href")?.slice(-1) === "#" || t && Jt(t, "href") && Y(t, "href")?.slice(-1) === "#";
}, [et, ts, es, ss] = Ot, zi = `[${ot}="${et}"]`, se = (e) => F(e, Zn), ji = (e) => new to(e), Ki = `${Qn}-end`, zs = [et, ts], js = [es, ss], Ks = ["A", "BUTTON"], Vi = {
  offset: 5,
  display: "dynamic"
}, Fe = E(
  `show.bs.${et}`
), Vs = E(
  `shown.bs.${et}`
), We = E(
  `hide.bs.${et}`
), Xs = E(`hidden.bs.${et}`), Jn = E(`updated.bs.${et}`), qs = (e) => {
  const { element: t, menu: s, parentElement: n, options: o } = e, { offset: i } = o;
  if (R(s, "position") === "static") return;
  const r = Tt(t), c = h(s, Ki);
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
  if (js.includes(l) && C && ft && (l = et), l === es && (r ? ft : C) && (l = ss), l === ss && (r ? C : ft) && (l = es), l === ts && Bt && !J && (l = et), l === et && J && !Bt && (l = ts), js.includes(l) && it && at(p[l], {
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
  }), zs.includes(l) && c && c && S(s, p[!r && $ || r && W ? "menuStart" : "menuEnd"]), b(n, Jn);
}, Xi = (e) => Array.from(e.children).map((t) => {
  if (t && Ks.includes(t.tagName)) return t;
  const { firstElementChild: s } = t;
  return s && Ks.includes(s.tagName) ? s : null;
}).filter((t) => t), Us = (e) => {
  const { element: t, options: s, menu: n } = e, o = e.open ? L : O, i = w(t);
  o(i, D, Ys), o(i, rs, Ys), o(i, ye, Ui), o(i, Wo, Yi), s.display === "dynamic" && (e.open ? e._observer.observe(n) : e._observer.disconnect());
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
  if (!A(t)) return;
  const n = gs(t), o = n && se(n);
  if (!o) return;
  const { parentElement: i, menu: r } = o, c = i && i.contains(t) && (t.tagName === "form" || M(t, "form") !== null);
  [D, xn].includes(s) && Gn(t) && e.preventDefault(), !c && s !== rs && t !== n && t !== r && o.hide();
};
function qi(e) {
  const t = se(this);
  nt(this) || t && (e.stopPropagation(), t.toggle(), Gn(this) && e.preventDefault());
}
const Ui = (e) => {
  [qe, Ue].includes(e.code) && e.preventDefault();
};
function Yi(e) {
  const { code: t } = e, s = gs(this);
  if (!s) return;
  const n = se(s), { activeElement: o } = w(s);
  if (!n || !o) return;
  const { menu: i, open: r } = n, c = Xi(i);
  if (c && c.length && [qe, Ue].includes(t)) {
    let a = c.indexOf(o);
    o === s ? a = 0 : t === Ue ? a = a > 1 ? a - 1 : 0 : t === qe && (a = a < c.length - 1 ? a + 1 : a), c[a] && lt(c[a]);
  }
  ls === t && r && (n.toggle(), lt(s));
}
class to extends st {
  static selector = zi;
  static init = ji;
  static getInstance = se;
  constructor(t, s) {
    super(t, s);
    const { parentElement: n } = this.element, [o] = rt(
      Qn,
      n
    );
    o && (this.parentElement = n, this.menu = o, this._observer = new us(
      () => qs(this)
    ), this._toggleEventListeners(!0));
  }
  get name() {
    return Zn;
  }
  get defaults() {
    return Vi;
  }
  toggle() {
    this.open ? this.hide() : this.show();
  }
  show() {
    const { element: t, open: s, menu: n, parentElement: o } = this;
    if (s) return;
    const i = gs(t), r = i && se(i);
    r && r.hide(), [Fe, Vs, Jn].forEach(
      (c) => {
        c.relatedTarget = t;
      }
    ), b(o, Fe), !Fe.defaultPrevented && (d(n, g), d(o, g), I(t, Ee, "true"), qs(this), this.open = !s, lt(t), Us(this), b(o, Vs));
  }
  hide() {
    const { element: t, open: s, menu: n, parentElement: o } = this;
    s && ([We, Xs].forEach((i) => {
      i.relatedTarget = t;
    }), b(o, We), !We.defaultPrevented && (v(n, g), v(o, g), I(t, Ee, "false"), this.open = !s, Us(this), b(o, Xs)));
  }
  _toggleEventListeners = (t) => {
    (t ? L : O)(this.element, D, qi);
  };
  dispose() {
    this.open && this.hide(), this._toggleEventListeners(), super.dispose();
  }
}
const X = "modal", ps = "Modal", ms = "Offcanvas", Zi = "fixed-top", Qi = "fixed-bottom", eo = "sticky-top", so = "position-sticky", no = (e) => [
  ...rt(Zi, e),
  ...rt(Qi, e),
  ...rt(eo, e),
  ...rt(so, e),
  ...rt("is-fixed", e)
], Gi = (e) => {
  const t = Nt(e);
  S(t, {
    paddingRight: "",
    overflow: ""
  });
  const s = no(t);
  s.length && s.forEach((n) => {
    S(n, {
      paddingRight: "",
      marginRight: ""
    });
  });
}, oo = (e) => {
  const { clientWidth: t } = dt(e), { innerWidth: s } = On(e);
  return Math.abs(s - t);
}, io = (e, t) => {
  const s = Nt(e), n = parseInt(R(s, "paddingRight"), 10), i = R(s, "overflow") === "hidden" && n ? 0 : oo(e), r = no(s);
  t && (S(s, {
    overflow: "hidden",
    paddingRight: `${n + i}px`
  }), r.length && r.forEach((c) => {
    const a = R(c, "paddingRight");
    if (c.style.paddingRight = `${parseInt(a, 10) + i}px`, [eo, so].some((l) => h(c, l))) {
      const l = R(c, "marginRight");
      c.style.marginRight = `${parseInt(l, 10) - i}px`;
    }
  }));
}, Z = "offcanvas", Et = bt({
  tagName: "div",
  className: "popup-container"
}), ro = (e, t) => {
  const s = H(t) && t.nodeName === "BODY", n = H(t) && !s ? t : Et, o = s ? t : Nt(e);
  H(e) && (n === Et && o.append(Et), n.append(e));
}, co = (e, t) => {
  const s = H(t) && t.nodeName === "BODY", n = H(t) && !s ? t : Et;
  H(e) && (e.remove(), n === Et && !Et.children.length && Et.remove());
}, vs = (e, t) => {
  const s = H(t) && t.nodeName !== "BODY" ? t : Et;
  return H(e) && s.contains(e);
}, ao = "backdrop", Zs = `${X}-${ao}`, Qs = `${Z}-${ao}`, lo = `.${X}.${g}`, bs = `.${Z}.${g}`, P = bt("div"), Mt = (e) => _(
  `${lo},${bs}`,
  w(e)
), ws = (e) => {
  const t = e ? Zs : Qs;
  [Zs, Qs].forEach((s) => {
    v(P, s);
  }), d(P, t);
}, ho = (e, t, s) => {
  ws(s), ro(P, Nt(e)), t && d(P, k);
}, fo = () => {
  h(P, g) || (d(P, g), kt(P));
}, He = () => {
  v(P, g);
}, uo = (e) => {
  Mt(e) || (v(P, k), co(P, Nt(e)), Gi(e));
}, go = (e) => A(e) && R(e, "visibility") !== "hidden" && e.offsetParent !== null, Ji = `.${X}`, tr = `[${ot}="${X}"]`, er = `[${Se}="${X}"]`, po = `${X}-static`, sr = {
  backdrop: !0,
  keyboard: !0
}, ne = (e) => F(e, ps), nr = (e) => new bo(e), be = E(
  `show.bs.${X}`
), Gs = E(
  `shown.bs.${X}`
), ze = E(
  `hide.bs.${X}`
), Js = E(
  `hidden.bs.${X}`
), mo = (e) => {
  const { element: t } = e, s = oo(t), { clientHeight: n, scrollHeight: o } = dt(t), { clientHeight: i, scrollHeight: r } = t, c = i !== r;
  if (!c && s) {
    const l = { [Tt(t) ? "paddingLeft" : "paddingRight"]: `${s}px` };
    S(t, l);
  }
  io(t, c || n !== o);
}, vo = (e, t) => {
  const s = t ? L : O, { element: n } = e;
  s(n, D, rr), s(w(n), ye, ir), t ? e._observer.observe(n) : e._observer.disconnect();
}, tn = (e) => {
  const { triggers: t, element: s, relatedTarget: n } = e;
  uo(s), S(s, { paddingRight: "", display: "" }), vo(e);
  const o = be.relatedTarget || t.find(go);
  o && lt(o), Js.relatedTarget = n || void 0, b(s, Js), xe(s);
}, en = (e) => {
  const { element: t, relatedTarget: s } = e;
  lt(t), vo(e, !0), Gs.relatedTarget = s || void 0, b(t, Gs), xe(t);
}, sn = (e) => {
  const { element: t, hasFade: s } = e;
  S(t, { display: "block" }), mo(e), Mt(t) || S(Nt(t), { overflow: "hidden" }), d(t, g), Dt(t, re), I(t, $e, "true"), s ? x(t, () => en(e)) : en(e);
}, nn = (e) => {
  const { element: t, options: s, hasFade: n } = e;
  s.backdrop && n && h(P, g) && !Mt(t) ? (He(), x(P, () => tn(e))) : tn(e);
};
function or(e) {
  const t = K(this), s = t && ne(t);
  nt(this) || s && (this.tagName === "A" && e.preventDefault(), s.relatedTarget = this, s.toggle());
}
const ir = ({ code: e, target: t }) => {
  const s = _(lo, w(t)), n = s && ne(s);
  if (!n) return;
  const { options: o } = n;
  o.keyboard && e === ls && h(s, g) && (n.relatedTarget = null, n.hide());
}, rr = (e) => {
  const { currentTarget: t } = e, s = t && ne(t);
  if (!s || !t || u.get(t)) return;
  const { options: n, isStatic: o, modalDialog: i } = s, { backdrop: r } = n, { target: c } = e, a = w(t)?.getSelection()?.toString().length, l = i.contains(c), f = c && M(c, er);
  o && !l ? u.set(
    t,
    () => {
      d(t, po), x(i, () => cr(s));
    },
    17
  ) : (f || !a && !o && !l && r) && (s.relatedTarget = f || null, s.hide(), e.preventDefault());
}, cr = (e) => {
  const { element: t, modalDialog: s } = e, n = (le(s) || 0) + 17;
  v(t, po), u.set(t, () => u.clear(t), n);
};
class bo extends st {
  static selector = Ji;
  static init = nr;
  static getInstance = ne;
  constructor(t, s) {
    super(t, s);
    const { element: n } = this, o = _(
      `.${X}-dialog`,
      n
    );
    o && (this.modalDialog = o, this.triggers = [
      ...U(
        tr,
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
    return sr;
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
    i ? (vs(P) ? ws(!0) : ho(t, n, !0), r = le(P), fo(), setTimeout(() => sn(this), r)) : (sn(this), c && h(P, g) && He());
  }
  hide() {
    const { element: t, hasFade: s, relatedTarget: n } = this;
    h(t, g) && (ze.relatedTarget = n || void 0, b(t, ze), !ze.defaultPrevented && (v(t, g), I(t, re, "true"), Dt(t, $e), s ? x(t, () => nn(this)) : nn(this)));
  }
  update = () => {
    h(this.element, g) && mo(this);
  };
  _toggleEventListeners = (t) => {
    const s = t ? L : O, { triggers: n } = this;
    n.length && n.forEach((o) => {
      s(o, D, or);
    });
  };
  dispose() {
    const t = { ...this }, { modalDialog: s, hasFade: n } = t, o = () => setTimeout(() => super.dispose(), 17);
    this.hide(), this._toggleEventListeners(), n ? x(s, o) : o();
  }
}
const ar = `.${Z}`, wo = `[${ot}="${Z}"]`, lr = `[${Se}="${Z}"]`, Pe = `${Z}-toggling`, dr = {
  backdrop: !0,
  keyboard: !0,
  scroll: !1
}, oe = (e) => F(e, ms), hr = (e) => new yo(e), we = E(`show.bs.${Z}`), Eo = E(`shown.bs.${Z}`), je = E(`hide.bs.${Z}`), To = E(`hidden.bs.${Z}`), fr = (e) => {
  const { element: t } = e, { clientHeight: s, scrollHeight: n } = dt(t);
  io(t, s !== n);
}, $o = (e, t) => {
  const s = t ? L : O, n = w(e.element);
  s(n, ye, mr), s(n, D, pr);
}, on = (e) => {
  const { element: t, options: s } = e;
  s.scroll || (fr(e), S(Nt(t), { overflow: "hidden" })), d(t, Pe), d(t, g), S(t, { visibility: "visible" }), x(t, () => vr(e));
}, ur = (e) => {
  const { element: t, options: s } = e, n = Mt(t);
  t.blur(), !n && s.backdrop && h(P, g) && He(), x(t, () => br(e));
};
function gr(e) {
  const t = K(this), s = t && oe(t);
  nt(this) || s && (s.relatedTarget = this, s.toggle(), this.tagName === "A" && e.preventDefault());
}
const pr = (e) => {
  const { target: t } = e, s = _(
    bs,
    w(t)
  );
  if (!s) return;
  const n = _(
    lr,
    s
  ), o = oe(s);
  if (!o) return;
  const { options: i, triggers: r } = o, { backdrop: c } = i, a = M(t, wo), l = w(s).getSelection();
  P.contains(t) && c === "static" || (!(l && l.toString().length) && (!s.contains(t) && c && (!a || r.includes(t)) || n && n.contains(t)) && (o.relatedTarget = n && n.contains(t) ? n : void 0, o.hide()), a && a.tagName === "A" && e.preventDefault());
}, mr = ({ code: e, target: t }) => {
  const s = _(
    bs,
    w(t)
  ), n = s && oe(s);
  n && n.options.keyboard && e === ls && (n.relatedTarget = void 0, n.hide());
}, vr = (e) => {
  const { element: t } = e;
  v(t, Pe), Dt(t, re), I(t, $e, "true"), I(t, "role", "dialog"), b(t, Eo), $o(e, !0), lt(t), xe(t);
}, br = (e) => {
  const { element: t, triggers: s } = e;
  I(t, re, "true"), Dt(t, $e), Dt(t, "role"), S(t, { visibility: "" });
  const n = we.relatedTarget || s.find(go);
  n && lt(n), uo(t), b(t, To), v(t, Pe), xe(t), Mt(t) || $o(e);
};
class yo extends st {
  static selector = ar;
  static init = hr;
  static getInstance = oe;
  constructor(t, s) {
    super(t, s);
    const { element: n } = this;
    this.triggers = [
      ...U(
        wo,
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
    return dr;
  }
  toggle() {
    h(this.element, g) ? this.hide() : this.show();
  }
  show() {
    const { element: t, options: s, relatedTarget: n } = this;
    let o = 0;
    if (h(t, g) || (we.relatedTarget = n || void 0, Eo.relatedTarget = n || void 0, b(t, we), we.defaultPrevented)) return;
    const i = Mt(t);
    if (i && i !== t) {
      const r = oe(i) || F(
        i,
        ps
      );
      r && r.hide();
    }
    s.backdrop ? (vs(P) ? ws() : ho(t, !0), o = le(P), fo(), setTimeout(() => on(this), o)) : (on(this), i && h(P, g) && He());
  }
  hide() {
    const { element: t, relatedTarget: s } = this;
    h(t, g) && (je.relatedTarget = s || void 0, To.relatedTarget = s || void 0, b(t, je), !je.defaultPrevented && (d(t, Pe), v(t, g), ur(this)));
  }
  _toggleEventListeners = (t) => {
    const s = t ? L : O;
    this.triggers.forEach((n) => {
      s(n, D, gr);
    });
  };
  dispose() {
    const { element: t } = this, s = h(t, g), n = () => setTimeout(() => super.dispose(), 1);
    this.hide(), this._toggleEventListeners(), s ? x(t, n) : n();
  }
}
const Pt = "popover", Es = "Popover", ct = "tooltip", Co = (e) => {
  const t = e === ct, s = t ? `${e}-inner` : `${e}-body`, n = t ? "" : `<h3 class="${e}-header"></h3>`, o = `<div class="${e}-arrow"></div>`, i = `<div class="${s}"></div>`;
  return `<div class="${e}" role="${ct}">${n + o + i}</div>`;
}, _o = {
  top: "top",
  bottom: "bottom",
  left: "start",
  right: "end"
}, ns = (e) => {
  requestAnimationFrame(() => {
    const t = /\b(top|bottom|start|end)+/, { element: s, tooltip: n, container: o, offsetParent: i, options: r, arrow: c } = e;
    if (!n) return;
    const a = Tt(s), { x: l, y: f } = ni(i);
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
    } = ci(
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
    let _t = 0, Xt = "", ut = 0, De = "", Wt = "", ue = "", Ie = "";
    const xt = c.offsetWidth || 0, gt = c.offsetHeight || 0, Le = xt / 2;
    let qt = Ct - y - gt < 0, Ut = Ct + y + W + gt >= q, Yt = Rt - p - xt < it, Zt = Rt + p + $ + xt >= J;
    const ge = ["left", "right"], Oe = ["top", "bottom"];
    qt = ge.includes(m) ? Ct + W / 2 - y / 2 - gt < 0 : qt, Ut = ge.includes(m) ? Ct + y / 2 + W / 2 + gt >= q : Ut, Yt = Oe.includes(m) ? Rt + $ / 2 - p / 2 < it : Yt, Zt = Oe.includes(m) ? Rt + p / 2 + $ / 2 >= J : Zt, m = ge.includes(m) && Yt && Zt ? "top" : m, m = m === "top" && qt ? "bottom" : m, m = m === "bottom" && Ut ? "top" : m, m = m === "left" && Yt ? "right" : m, m = m === "right" && Zt ? "left" : m, n.className.includes(m) || (n.className = n.className.replace(
      t,
      _o[m]
    )), ge.includes(m) ? (m === "left" ? ut = fe - p - xt : ut = fe + $ + xt, qt && Ut ? (_t = 0, Xt = 0, Wt = Ft + W / 2 - gt / 2) : qt ? (_t = Ft, Xt = "", Wt = W / 2 - xt) : Ut ? (_t = Ft - y + W, Xt = "", Wt = y - W / 2 - xt) : (_t = Ft - y / 2 + W / 2, Wt = y / 2 - gt / 2)) : Oe.includes(m) && (m === "top" ? _t = Ft - y - gt : _t = Ft + W + gt, Yt ? (ut = 0, ue = fe + $ / 2 - Le) : Zt ? (ut = "auto", De = 0, Ie = $ / 2 + J - B - Le) : (ut = fe - p / 2 + $ / 2, ue = p / 2 - Le)), S(n, {
      top: `${_t}px`,
      bottom: Xt === "" ? "" : `${Xt}px`,
      left: ut === "auto" ? ut : `${ut}px`,
      right: De !== "" ? `${De}px` : ""
    }), A(c) && (Wt !== "" && (c.style.top = `${Wt}px`), ue !== "" ? c.style.left = `${ue}px` : Ie !== "" && (c.style.right = `${Ie}px`));
    const Fo = E(
      `updated.bs.${ee(e.name)}`
    );
    b(s, Fo);
  });
}, os = {
  template: Co(ct),
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
}, xo = "data-original-title", St = "Tooltip", mt = (e, t, s) => {
  if (ae(t) && t.length) {
    let n = t.trim();
    Bn(s) && (n = s(n));
    const i = new DOMParser().parseFromString(n, "text/html");
    e.append(...i.body.childNodes);
  } else A(t) ? e.append(t) : (li(t) || ai(t) && t.every(H)) && e.append(...t);
}, wr = (e) => {
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
  } = o, q = t ? ct : Pt, G = { ..._o };
  let m = [], V = [];
  Tt(n) && (G.left = "end", G.right = "start");
  const $t = `bs-${q}-${G[r]}`;
  let yt;
  if (A(c))
    yt = c;
  else {
    const $ = bt("div");
    mt($, c, f), yt = $.firstChild;
  }
  if (!A(yt)) return;
  e.tooltip = yt.cloneNode(!0);
  const { tooltip: C } = e;
  I(C, "id", s), I(C, "role", ct);
  const ft = t ? `${ct}-inner` : `${Pt}-body`, it = t ? null : _(`.${Pt}-header`, C), J = _(`.${ft}`, C);
  e.arrow = _(
    `.${q}-arrow`,
    C
  );
  const { arrow: Bt } = e;
  if (A(i)) m = [i.cloneNode(!0)];
  else {
    const $ = bt("div");
    mt($, i, f), m = [...$.childNodes];
  }
  if (A(y)) V = [y.cloneNode(!0)];
  else {
    const $ = bt("div");
    mt($, y, f), V = [...$.childNodes];
  }
  if (p)
    if (i)
      if (A(N))
        m = [...m, N.cloneNode(!0)];
      else {
        const $ = bt("div");
        mt($, N, f), m = [...m, $.firstChild];
      }
    else if (it && it.remove(), A(N))
      V = [...V, N.cloneNode(!0)];
    else {
      const $ = bt("div");
      mt($, N, f), V = [...V, $.firstChild];
    }
  t ? i && J && mt(J, i, f) : (i && it && mt(it, m, f), y && J && mt(J, V, f), e.btn = _(".btn-close", C) || void 0), d(C, "position-absolute"), d(Bt, "position-absolute"), h(C, q) || d(C, q), a && !h(C, k) && d(C, k), l && !h(C, l) && d(C, l), h(C, $t) || d(C, $t);
}, Er = (e) => {
  const t = ["HTML", "BODY"], s = [];
  let { parentNode: n } = e;
  for (; n && !t.includes(n.nodeName); )
    n = oi(n), Ln(n) || ii(n) || s.push(n);
  return s.find((o, i) => (R(o, "position") !== "relative" || R(o, "position") === "relative" && o.offsetHeight !== o.scrollHeight) && s.slice(i + 1).every(
    (r) => R(r, "position") === "static"
  ) ? o : null) || w(e).body;
}, Tr = `[${ot}="${ct}"],[data-tip="${ct}"]`, So = "title";
let rn = (e) => F(e, St);
const $r = (e) => new Ts(e), yr = (e) => {
  const { element: t, tooltip: s, container: n } = e;
  Dt(t, Cn), co(
    s,
    n
  );
}, Qt = (e) => {
  const { tooltip: t, container: s } = e;
  return t && vs(t, s);
}, Cr = (e, t) => {
  const { element: s } = e;
  e._toggleEventListeners(), Jt(s, xo) && e.name === St && Ho(e), t && t();
}, Ao = (e, t) => {
  const s = t ? L : O, { element: n } = e;
  s(
    w(n),
    _e,
    e.handleTouch,
    te
  );
}, cn = (e) => {
  const { element: t } = e, s = E(
    `shown.bs.${ee(e.name)}`
  );
  Ao(e, !0), b(t, s), u.clear(t, "in");
}, an = (e) => {
  const { element: t } = e, s = E(
    `hidden.bs.${ee(e.name)}`
  );
  Ao(e), yr(e), b(t, s), u.clear(t, "out");
}, ln = (e, t) => {
  const s = t ? L : O, { element: n, tooltip: o } = e, i = M(n, `.${X}`), r = M(n, `.${Z}`);
  t ? [n, o].forEach((c) => e._observer.observe(c)) : e._observer.disconnect(), i && s(i, `hide.bs.${X}`, e.handleHide), r && s(r, `hide.bs.${Z}`, e.handleHide);
}, Ho = (e, t) => {
  const s = [xo, So], { element: n } = e;
  I(
    n,
    s[t ? 0 : 1],
    t || Y(n, s[0]) || ""
  ), Dt(n, s[t ? 1 : 0]);
};
class Ts extends st {
  static selector = Tr;
  static init = $r;
  static getInstance = rn;
  static styleTip = ns;
  constructor(t, s) {
    super(t, s);
    const { element: n } = this, o = this.name === St, i = o ? ct : Pt, r = o ? St : Es;
    rn = (f) => F(f, r), this.enabled = !0, this.id = `${i}-${Nn(n, i)}`;
    const { options: c } = this;
    if (!c.title && o || !o && !c.content)
      return;
    at(os, { titleAttr: "" }), Jt(n, So) && o && typeof c.title == "string" && Ho(this, c.title);
    const a = Er(n), l = ["sticky", "fixed", "relative"].some(
      (f) => R(a, "position") === f
    ) ? a : On(n);
    this.container = a, this.offsetParent = l, wr(this), this.tooltip && (this._observer = new us(() => this.update()), this._toggleEventListeners(!0));
  }
  get name() {
    return St;
  }
  get defaults() {
    return os;
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
        b(n, a), a.defaultPrevented || (ro(s, o), I(n, Cn, `#${i}`), this.update(), ln(this, !0), h(s, g) || d(s, g), r ? x(s, () => cn(this)) : cn(this));
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
    ns(this);
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
      f === zo ? (s(n, xn, this.handleShow), s(n, Ce, this.handleShow), a || (s(n, as, this.handleHide), s(
        w(n),
        _e,
        this.handleTouch,
        te
      ))) : f === D ? s(n, f, a ? this.handleShow : this.toggle) : f === rs && (s(n, cs, this.handleShow), a || s(n, _n, this.handleHide), Yo() && s(n, D, this.handleFocus)), a && i && s(i, D, this.handleHide);
    }));
  };
  dispose() {
    const { tooltip: t, options: s } = this, n = { ...this, name: this.name }, o = () => setTimeout(
      () => Cr(n, () => super.dispose()),
      17
    );
    s.animation && Qt(n) ? (this.options.delay = 0, this.hide(), x(t, o)) : o();
  }
}
const _r = `[${ot}="${Pt}"],[data-tip="${Pt}"]`, xr = at({}, os, {
  template: Co(Pt),
  content: "",
  dismissible: !1,
  btnClose: '<button class="btn-close position-absolute top-0 end-0 m-1" aria-label="Close"></button>'
}), Sr = (e) => F(e, Es), Ar = (e) => new Po(e);
class Po extends Ts {
  static selector = _r;
  static init = Ar;
  static getInstance = Sr;
  static styleTip = ns;
  constructor(t, s) {
    super(t, s);
  }
  get name() {
    return Es;
  }
  get defaults() {
    return xr;
  }
  show = () => {
    super.show();
    const { options: t, btn: s } = this;
    t.dismissible && s && setTimeout(() => lt(s), 17);
  };
}
const Hr = "scrollspy", Do = "ScrollSpy", Pr = '[data-bs-spy="scroll"]', Dr = "[href]", Ir = {
  offset: 10,
  target: void 0
}, Lr = (e) => F(e, Do), Or = (e) => new Lo(e), dn = E(`activate.bs.${Hr}`), kr = (e) => {
  const {
    target: t,
    _itemsLength: s,
    _observables: n
  } = e, o = fs("A", t), i = w(t);
  !o.length || s === n.size || (n.clear(), Array.from(o).forEach((r) => {
    const c = Y(r, "href")?.slice(1), a = c?.length ? i.getElementById(c) : null;
    a && !nt(r) && e._observables.set(a, r);
  }), e._itemsLength = e._observables.size);
}, Io = (e) => {
  Array.from(fs("A", e)).forEach(
    (t) => {
      h(t, T) && v(t, T);
    }
  );
}, hn = (e, t) => {
  const { target: s, element: n } = e;
  Io(s), e._activeItem = t, d(t, T);
  let o = t;
  for (; o !== s; )
    if (o = o.parentElement, ["nav", "dropdown-menu", "list-group"].some(
      (i) => h(o, i)
    )) {
      const i = o.previousElementSibling;
      i && !h(i, T) && d(i, T);
    }
  dn.relatedTarget = t, b(n, dn);
}, Ke = (e, t) => {
  const { scrollTarget: s, element: n, options: o } = e;
  return (s !== n ? It(t).top + s.scrollTop : t.offsetTop) - (o.offset || 10);
};
class Lo extends st {
  static selector = Pr;
  static init = Or;
  static getInstance = Lr;
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
    return Do;
  }
  get defaults() {
    return Ir;
  }
  refresh = () => {
    const { target: t, scrollTarget: s } = this;
    if (!t || t.offsetHeight === 0) return;
    kr(this);
    const { _itemsLength: n, _observables: o, _activeItem: i } = this;
    if (!n) return;
    const r = o.entries().toArray(), { scrollTop: c, scrollHeight: a, clientHeight: l } = s;
    if (c >= a - l) {
      const p = r[n - 1]?.[1];
      i !== p && hn(this, p);
      return;
    }
    const f = r[0]?.[0] ? Ke(this, r[0][0]) : null;
    if (f !== null && c < f && f > 0) {
      this._activeItem = null, Io(t);
      return;
    }
    for (let p = 0; p < n; p += 1) {
      const [y, N] = r[p], q = Ke(this, y), G = r[p + 1]?.[0], m = G ? Ke(this, G) : null;
      if (i !== N && c >= q && (m === null || c < m)) {
        hn(this, N);
        break;
      }
    }
  };
  _scrollTo = (t) => {
    const s = M(t.target, Dr), n = s && Y(s, "href")?.slice(1), o = n && di(n, this.target);
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
const he = "tab", Oo = "Tab", is = `[${ot}="${he}"]`, ko = (e) => F(e, Oo), Nr = (e) => new No(e), Ve = E(
  `show.bs.${he}`
), fn = E(
  `shown.bs.${he}`
), Xe = E(
  `hide.bs.${he}`
), un = E(
  `hidden.bs.${he}`
), ie = /* @__PURE__ */ new Map(), gn = (e) => {
  const { tabContent: t, nav: s } = e;
  t && h(t, Lt) && (t.style.height = "", v(t, Lt)), s && u.clear(s);
}, pn = (e) => {
  const { element: t, tabContent: s, content: n, nav: o } = e, { tab: i } = A(o) && ie.get(o) || { tab: null };
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
  }), c = r ? r.scrollHeight : 0), Ve.relatedTarget = i, un.relatedTarget = t, b(t, Ve), !Ve.defaultPrevented) {
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
  if (!A(t))
    return { tab: null, content: null };
  const s = rt(
    T,
    t
  );
  let n = null;
  s.length === 1 && !Ot.some(
    (i) => h(s[0].parentElement, i)
  ) ? [n] = s : s.length > 1 && (n = s[s.length - 1]);
  const o = A(n) ? K(n) : null;
  return { tab: n, content: o };
}, bn = (e) => {
  if (!A(e)) return null;
  const t = M(e, `.${Ot.join(",.")}`);
  return t ? _(`.${Ot[0]}-toggle`, t) : null;
}, Mr = (e) => {
  const t = M(e.target, is), s = t && ko(t);
  s && (e.preventDefault(), s.show());
};
class No extends st {
  static selector = is;
  static init = Nr;
  static getInstance = ko;
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
      const c = _(is, o), a = c && K(c);
      a && (d(c, T), d(a, g), d(a, T), I(s, ke, "true"));
    }
    this._toggleEventListeners(!0);
  }
  get name() {
    return Oo;
  }
  show() {
    const { element: t, content: s, nav: n, dropdown: o } = this;
    if (n && u.get(n) || h(t, T)) return;
    const { tab: i, content: r } = vn(this);
    if (n && i && ie.set(n, { tab: i, content: r, currentHeight: 0, nextHeight: 0 }), Xe.relatedTarget = t, !A(i) || (b(i, Xe), Xe.defaultPrevented)) return;
    d(t, T), I(t, ke, "true");
    const c = A(i) && bn(i);
    if (c && h(c, T) && v(c, T), n) {
      const a = () => {
        i && (v(i, T), I(i, ke, "false")), o && !h(o, T) && d(o, T);
      };
      r && (h(r, k) || s && h(s, k)) ? u.set(n, a, 1) : a();
    }
    r && (v(r, g), h(r, k) ? x(r, () => mn(this)) : mn(this));
  }
  _toggleEventListeners = (t) => {
    (t ? L : O)(this.element, D, Mr);
  };
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
const Q = "toast", Mo = "Toast", Br = `.${Q}`, Rr = `[${Se}="${Q}"]`, Fr = `[${ot}="${Q}"]`, Vt = "showing", Bo = "hide", Wr = {
  animation: !0,
  autohide: !0,
  delay: 5e3
}, $s = (e) => F(e, Mo), zr = (e) => new Ro(e), wn = E(
  `show.bs.${Q}`
), jr = E(
  `shown.bs.${Q}`
), En = E(
  `hide.bs.${Q}`
), Kr = E(
  `hidden.bs.${Q}`
), Tn = (e) => {
  const { element: t, options: s } = e;
  v(t, Vt), u.clear(t, Vt), b(t, jr), s.autohide && u.set(t, () => e.hide(), s.delay, Q);
}, $n = (e) => {
  const { element: t } = e;
  v(t, Vt), v(t, g), d(t, Bo), u.clear(t, Q), b(t, Kr);
}, Vr = (e) => {
  const { element: t, options: s } = e;
  d(t, Vt), s.animation ? (kt(t), x(t, () => $n(e))) : $n(e);
}, Xr = (e) => {
  const { element: t, options: s } = e;
  u.set(
    t,
    () => {
      v(t, Bo), kt(t), d(t, g), d(t, Vt), s.animation ? x(t, () => Tn(e)) : Tn(e);
    },
    17,
    Vt
  );
};
function qr(e) {
  const t = K(this), s = t && $s(t);
  nt(this) || s && (this.tagName === "A" && e.preventDefault(), s.relatedTarget = this, s.show());
}
const Ur = (e) => {
  const t = e.target, s = $s(t), { type: n, relatedTarget: o } = e;
  !s || t === o || t.contains(o) || ([Ce, cs].includes(n) ? u.clear(t, Q) : u.set(t, () => s.hide(), s.options.delay, Q));
};
class Ro extends st {
  static selector = Br;
  static init = zr;
  static getInstance = $s;
  constructor(t, s) {
    super(t, s);
    const { element: n, options: o } = this;
    o.animation && !h(n, k) ? d(n, k) : !o.animation && h(n, k) && v(n, k), this.dismiss = _(Rr, n), this.triggers = [
      ...U(
        Fr,
        w(n)
      )
    ].filter(
      (i) => K(i) === n
    ), this._toggleEventListeners(!0);
  }
  get name() {
    return Mo;
  }
  get defaults() {
    return Wr;
  }
  get isShown() {
    return h(this.element, g);
  }
  show = () => {
    const { element: t, isShown: s } = this;
    !t || s || (b(t, wn), wn.defaultPrevented || Xr(this));
  };
  hide = () => {
    const { element: t, isShown: s } = this;
    !t || !s || (b(t, En), En.defaultPrevented || Vr(this));
  };
  _toggleEventListeners = (t) => {
    const s = t ? L : O, { element: n, triggers: o, dismiss: i, options: r, hide: c } = this;
    i && s(i, D, c), r.autohide && [cs, _n, Ce, as].forEach(
      (a) => s(n, a, Ur)
    ), o.length && o.forEach((a) => {
      s(a, D, qr);
    });
  };
  dispose() {
    const { element: t, isShown: s } = this;
    this._toggleEventListeners(), u.clear(t, Q), s && v(t, g), super.dispose();
  }
}
const ys = /* @__PURE__ */ new Map();
[
  Wn,
  jn,
  Xn,
  Yn,
  to,
  bo,
  yo,
  Po,
  Lo,
  No,
  Ro,
  Ts
].forEach((e) => ys.set(e.prototype.name, e));
const Yr = (e, t) => {
  [...t].forEach((s) => e(s));
}, Zr = (e, t) => {
  const s = At.getAllFor(e);
  s && [...s].forEach(([n, o]) => {
    t.contains(n) && o.dispose();
  });
}, yn = (e) => {
  const t = e && e.nodeName ? e : document, s = [...fs("*", t)];
  ys.forEach((n) => {
    const { init: o, selector: i } = n;
    Yr(
      o,
      s.filter((r) => kn(r, i))
    );
  });
}, Qr = (e) => {
  const t = e && e.nodeName ? e : document;
  ys.forEach((s) => {
    Zr(s.prototype.name, t);
  });
};
document.body ? yn() : L(document, "DOMContentLoaded", () => yn(), {
  once: !0
});
export {
  Wn as Alert,
  jn as Button,
  Xn as Carousel,
  Yn as Collapse,
  to as Dropdown,
  bo as Modal,
  yo as Offcanvas,
  Po as Popover,
  Lo as ScrollSpy,
  No as Tab,
  Ro as Toast,
  Ts as Tooltip,
  yn as initCallback,
  Qr as removeDataAPI
};
//# sourceMappingURL=bootstrap-native.mjs.map
