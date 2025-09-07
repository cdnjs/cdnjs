const he = "aria-describedby", ge = "aria-expanded", q = "aria-hidden", me = "aria-modal", pe = "aria-pressed", ye = "aria-selected", we = "focus", be = "focusin", ve = "focusout", Ee = "keydown", Ae = "keyup", Le = "click", Ne = "mousedown", Te = "hover", Me = "mouseenter", xe = "mouseleave", Ce = "pointerdown", De = "pointermove", Pe = "pointerup", ke = "touchstart", je = "dragstart", I = 'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"]', ze = "ArrowDown", He = "ArrowUp", Be = "ArrowLeft", Se = "ArrowRight", Fe = "Escape", Q = "transitionDuration", Z = "transitionDelay", N = "transitionend", F = "transitionProperty", Oe = () => {
  const e = /iPhone|iPad|iPod|Android/i;
  return navigator?.userAgentData?.brands.some(
    (s) => e.test(s.brand)
  ) || e.test(navigator?.userAgent) || !1;
}, Ve = () => {
  const e = /(iPhone|iPod|iPad)/;
  return navigator?.userAgentData?.brands.some(
    (s) => e.test(s.brand)
  ) || e.test(
    navigator?.userAgent
  ) || !1;
}, We = () => {
}, _ = (e, s, t, a) => {
  e.addEventListener(
    s,
    t,
    !1
  );
}, X = (e, s, t, a) => {
  e.removeEventListener(
    s,
    t,
    !1
  );
}, O = (e, s) => e.getAttribute(s), G = (e, s) => e.hasAttribute(s), $e = (e, s, t) => e.setAttribute(s, t), Re = (e, s) => e.removeAttribute(s), qe = (e, ...s) => {
  e.classList.add(...s);
}, Ie = (e, ...s) => {
  e.classList.remove(...s);
}, Qe = (e, s) => e.classList.contains(s), b = (e) => e != null && typeof e == "object" || !1, c = (e) => b(e) && typeof e.nodeType == "number" && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].some(
  (s) => e.nodeType === s
) || !1, u = (e) => c(e) && e.nodeType === 1 || !1, m = /* @__PURE__ */ new Map(), y = {
  data: m,
  set: (e, s, t) => {
    u(e) && (m.has(s) || m.set(s, /* @__PURE__ */ new Map()), m.get(s).set(e, t));
  },
  getAllFor: (e) => m.get(e) || null,
  get: (e, s) => {
    if (!u(e) || !s) return null;
    const t = y.getAllFor(s);
    return e && t && t.get(e) || null;
  },
  remove: (e, s) => {
    const t = y.getAllFor(s);
    !t || !u(e) || (t.delete(e), t.size === 0 && m.delete(s));
  }
}, Ze = (e, s) => y.get(e, s), j = (e) => e?.trim().replace(
  /(?:^\w|[A-Z]|\b\w)/g,
  (s, t) => t === 0 ? s.toLowerCase() : s.toUpperCase()
).replace(/\s+/g, ""), M = (e) => typeof e == "string" || !1, V = (e) => b(e) && e.constructor.name === "Window" || !1, W = (e) => c(e) && e.nodeType === 9 || !1, d = (e) => W(e) ? e : c(e) ? e.ownerDocument : V(e) ? e.document : globalThis.document, x = (e, ...s) => Object.assign(e, ...s), K = (e) => {
  if (!e) return;
  if (M(e))
    return d().createElement(e);
  const { tagName: s } = e, t = K(s);
  if (!t) return;
  const a = { ...e };
  return delete a.tagName, x(t, a);
}, U = (e, s) => e.dispatchEvent(s), A = (e, s, t) => {
  const a = getComputedStyle(e, t), n = s.replace("webkit", "Webkit").replace(/([A-Z])/g, "-$1").toLowerCase();
  return a.getPropertyValue(n);
}, J = (e) => {
  const s = A(e, F), t = A(e, Z), a = t.includes("ms") ? 1 : 1e3, n = s && s !== "none" ? parseFloat(t) * a : 0;
  return Number.isNaN(n) ? 0 : n;
}, Y = (e) => {
  const s = A(e, F), t = A(e, Q), a = t.includes("ms") ? 1 : 1e3, n = s && s !== "none" ? parseFloat(t) * a : 0;
  return Number.isNaN(n) ? 0 : n;
}, _e = (e, s) => {
  let t = 0;
  const a = new Event(N), n = Y(e), o = J(e);
  if (n) {
    const r = (l) => {
      l.target === e && (s.apply(e, [l]), e.removeEventListener(N, r), t = 1);
    };
    e.addEventListener(N, r), setTimeout(() => {
      t || U(e, a);
    }, n + o + 17);
  } else
    s.apply(e, [a]);
}, Xe = (e, s) => e.focus(s), z = (e) => ["true", !0].includes(e) ? !0 : ["false", !1].includes(e) ? !1 : ["null", "", null, void 0].includes(e) ? null : e !== "" && !Number.isNaN(+e) ? +e : e, E = (e) => Object.entries(e), ee = (e, s, t, a) => {
  if (!u(e)) return s;
  const n = { ...t }, o = { ...e.dataset }, r = { ...s }, l = {}, f = "title";
  return E(o).forEach(([i, h]) => {
    const v = typeof i == "string" && i.includes(a) ? j(i.replace(a, "")) : j(i);
    l[v] = z(h);
  }), E(n).forEach(([i, h]) => {
    n[i] = z(h);
  }), E(s).forEach(([i, h]) => {
    i in n ? r[i] = n[i] : i in l ? r[i] = l[i] : r[i] = i === f ? O(e, f) : h;
  }), r;
}, H = (e) => Object.keys(e), Ge = (e, s) => {
  const t = new CustomEvent(e, {
    cancelable: !0,
    bubbles: !0
  });
  return b(s) && x(t, s), t;
}, Ke = { passive: !0 }, Ue = (e) => e.offsetHeight, Je = (e, s) => {
  E(s).forEach(([t, a]) => {
    if (a && M(t) && t.includes("--"))
      e.style.setProperty(t, a);
    else {
      const n = {};
      n[t] = a, x(e.style, n);
    }
  });
}, T = (e) => b(e) && e.constructor.name === "Map" || !1, se = (e) => typeof e == "number" || !1, g = /* @__PURE__ */ new Map(), Ye = {
  set: (e, s, t, a) => {
    u(e) && (a && a.length ? (g.has(e) || g.set(e, /* @__PURE__ */ new Map()), g.get(e).set(a, setTimeout(s, t))) : g.set(e, setTimeout(s, t)));
  },
  get: (e, s) => {
    if (!u(e)) return null;
    const t = g.get(e);
    return s && t && T(t) ? t.get(s) || null : se(t) ? t : null;
  },
  clear: (e, s) => {
    if (!u(e)) return;
    const t = g.get(e);
    s && s.length && T(t) ? (clearTimeout(t.get(s)), t.delete(s), t.size === 0 && g.delete(e)) : (clearTimeout(t), g.delete(e));
  }
}, es = (e) => e.toLowerCase(), te = (e, s) => (c(s) ? s : d()).querySelectorAll(e), C = /* @__PURE__ */ new Map();
function $(e) {
  const { shiftKey: s, code: t } = e, a = d(this), n = [
    ...te(I, this)
  ].filter(
    (l) => !G(l, "disabled") && !O(l, q)
  );
  if (!n.length) return;
  const o = n[0], r = n[n.length - 1];
  t === "Tab" && (s && a.activeElement === o ? (r.focus(), e.preventDefault()) : !s && a.activeElement === r && (o.focus(), e.preventDefault()));
}
const D = (e) => C.has(e) === !0, ae = (e) => {
  D(e) || (_(e, "keydown", $), C.set(e, !0));
}, ne = (e) => {
  D(e) && (X(e, "keydown", $), C.delete(e));
}, ss = (e) => {
  D(e) ? ne(e) : ae(e);
}, P = (e) => u(e) && "offsetWidth" in e || !1, L = (e, s) => {
  const { width: t, height: a, top: n, right: o, bottom: r, left: l } = e.getBoundingClientRect();
  let f = 1, i = 1;
  if (s && P(e)) {
    const { offsetWidth: h, offsetHeight: v } = e;
    f = h > 0 ? Math.round(t) / h : 1, i = v > 0 ? Math.round(a) / v : 1;
  }
  return {
    width: t / f,
    height: a / i,
    top: n / i,
    right: o / f,
    bottom: r / i,
    left: l / f,
    x: l / f,
    y: n / i
  };
}, ts = (e) => d(e).body, k = (e) => d(e).documentElement, as = (e) => {
  const s = V(e), t = s ? e.scrollX : e.scrollLeft, a = s ? e.scrollY : e.scrollTop;
  return { x: t, y: a };
}, oe = (e) => c(e) && e.constructor.name === "ShadowRoot" || !1, ns = (e) => e.nodeName === "HTML" ? e : u(e) && e.assignedSlot || c(e) && e.parentNode || oe(e) && e.host || k(e), os = (e) => e ? W(e) ? e.defaultView : c(e) ? e?.ownerDocument?.defaultView : e : window, rs = (e) => c(e) && ["TABLE", "TD", "TH"].includes(e.nodeName) || !1, is = (e, s) => e.matches(s), re = (e) => {
  if (!P(e)) return !1;
  const { width: s, height: t } = L(e), { offsetWidth: a, offsetHeight: n } = e;
  return Math.round(s) !== a || Math.round(t) !== n;
}, ls = (e, s, t) => {
  const a = P(s), n = L(
    e,
    a && re(s)
  ), o = { x: 0, y: 0 };
  if (a) {
    const r = L(s, !0);
    o.x = r.x + s.clientLeft, o.y = r.y + s.clientTop;
  }
  return {
    x: n.left + t.x - o.x,
    y: n.top + t.y - o.y,
    width: n.width,
    height: n.height
  };
};
let B = 0, S = 0;
const p = /* @__PURE__ */ new Map(), ie = (e, s) => {
  let t = s ? B : S;
  if (s) {
    const a = ie(e), n = p.get(a) || /* @__PURE__ */ new Map();
    p.has(a) || p.set(a, n), T(n) && !n.has(s) ? (n.set(s, t), B += 1) : t = n.get(s);
  } else {
    const a = e.id || e;
    p.has(a) ? t = p.get(a) : (p.set(a, t), S += 1);
  }
  return t;
}, us = (e) => Array.isArray(e) || !1, cs = (e) => {
  if (!c(e)) return !1;
  const { top: s, bottom: t } = L(e), { clientHeight: a } = k(e);
  return s <= a && t >= 0;
}, ds = (e) => typeof e == "function" || !1, fs = (e) => b(e) && e.constructor.name === "NodeList" || !1, hs = (e) => k(e).dir === "rtl", le = (e, s) => !e || !s ? null : e.closest(s) || le(e.getRootNode().host, s) || null, ue = (e, s) => u(e) ? e : (u(s) ? s : d()).querySelector(e), gs = (e, s) => (c(s) ? s : d()).getElementsByTagName(
  e
), ms = (e, s) => d(s).getElementById(e), ps = (e, s) => (s && c(s) ? s : d()).getElementsByClassName(
  e
), w = {}, R = (e) => {
  const { type: s, currentTarget: t } = e;
  w[s].forEach((a, n) => {
    t === n && a.forEach((o, r) => {
      r.apply(n, [e]), typeof o == "object" && o.once && ce(n, s, r, o);
    });
  });
}, ys = (e, s, t, a) => {
  w[s] || (w[s] = /* @__PURE__ */ new Map());
  const n = w[s];
  n.has(e) || n.set(e, /* @__PURE__ */ new Map());
  const o = n.get(
    e
  ), { size: r } = o;
  o.set(t, a), r || e.addEventListener(
    s,
    R,
    a
  );
}, ce = (e, s, t, a) => {
  const n = w[s], o = n && n.get(e), r = o && o.get(t), l = r !== void 0 ? r : a;
  o && o.has(t) && o.delete(t), n && (!o || !o.size) && n.delete(e), (!n || !n.size) && delete w[s], (!o || !o.size) && e.removeEventListener(
    s,
    R,
    l
  );
}, de = "5.1.6", fe = de;
class ws {
  constructor(s, t) {
    let a;
    try {
      if (u(s))
        a = s;
      else if (M(s)) {
        if (a = ue(s), !a) throw Error(`"${s}" is not a valid selector.`);
      } else
        throw Error("your target is not an instance of HTMLElement.");
    } catch (o) {
      throw Error(`${this.name} Error: ${o.message}`);
    }
    const n = y.get(a, this.name);
    n && n._toggleEventListeners(), this.element = a, this.options = this.defaults && H(this.defaults).length ? ee(a, this.defaults, t || {}, "bs") : {}, y.set(a, this.name, this);
  }
  get version() {
    return fe;
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
    y.remove(this.element, this.name), H(this).forEach((s) => {
      delete this[s];
    });
  }
}
export {
  Fe as $,
  xe as A,
  ws as B,
  ge as C,
  cs as D,
  ys as E,
  pe as F,
  qe as G,
  hs as H,
  Pe as I,
  G as J,
  O as K,
  Xe as L,
  A as M,
  le as N,
  Ce as O,
  k as P,
  $e as Q,
  L as R,
  we as S,
  x as T,
  Ae as U,
  Ne as V,
  ue as W,
  ze as X,
  He as Y,
  U as Z,
  Qe as _,
  Ie as a,
  Re as a0,
  q as a1,
  me as a2,
  ts as a3,
  ss as a4,
  os as a5,
  K as a6,
  ms as a7,
  gs as a8,
  ye as a9,
  be as aa,
  ve as ab,
  as as ac,
  ls as ad,
  es as ae,
  ds as af,
  fs as ag,
  us as ah,
  c as ai,
  ns as aj,
  oe as ak,
  rs as al,
  ie as am,
  Te as an,
  Ve as ao,
  he as ap,
  u as aq,
  ke as b,
  is as c,
  d,
  te as e,
  Ue as f,
  Ke as g,
  Ye as h,
  je as i,
  ps as j,
  Ee as k,
  Be as l,
  Ge as m,
  Se as n,
  P as o,
  M as p,
  We as q,
  ce as r,
  _e as s,
  Ze as t,
  Y as u,
  Le as v,
  Me as w,
  Oe as x,
  Je as y,
  De as z
};
//# sourceMappingURL=base-component-BazRqYWL.mjs.map
