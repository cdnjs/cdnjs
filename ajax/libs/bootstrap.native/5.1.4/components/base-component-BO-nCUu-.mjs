const he = "aria-describedby", ge = "aria-expanded", I = "aria-hidden", me = "aria-modal", pe = "aria-pressed", ye = "aria-selected", we = "focus", be = "focusin", ve = "focusout", Ee = "keydown", Ae = "keyup", Le = "click", Ne = "mousedown", Te = "hover", Me = "mouseenter", xe = "mouseleave", Ce = "pointerdown", ke = "pointermove", De = "pointerup", je = "touchstart", ze = "dragstart", Q = 'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"]', He = "ArrowDown", Be = "ArrowUp", Pe = "ArrowLeft", Se = "ArrowRight", Fe = "Escape", Z = "transitionDuration", _ = "transitionDelay", N = "transitionend", F = "transitionProperty", Oe = () => {
  const e = /(iPhone|iPod|iPad)/;
  return navigator?.userAgentData?.brands.some(
    (s) => e.test(s.brand)
  ) || e.test(
    navigator?.userAgent
  ) || !1;
}, Ve = () => {
}, q = (e, s, t, a) => {
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
}, O = (e, s) => e.getAttribute(s), G = (e, s) => e.hasAttribute(s), We = (e, s, t) => e.setAttribute(s, t), $e = (e, s) => e.removeAttribute(s), Re = (e, ...s) => {
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
}, Ze = (e, s) => y.get(e, s), z = (e) => e?.trim().replace(
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
  const s = A(e, F), t = A(e, _), a = t.includes("ms") ? 1 : 1e3, n = s && s !== "none" ? parseFloat(t) * a : 0;
  return Number.isNaN(n) ? 0 : n;
}, Y = (e) => {
  const s = A(e, F), t = A(e, Z), a = t.includes("ms") ? 1 : 1e3, n = s && s !== "none" ? parseFloat(t) * a : 0;
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
}, qe = (e, s) => e.focus(s), H = (e) => ["true", !0].includes(e) ? !0 : ["false", !1].includes(e) ? !1 : ["null", "", null, void 0].includes(e) ? null : e !== "" && !Number.isNaN(+e) ? +e : e, E = (e) => Object.entries(e), ee = (e, s, t, a) => {
  if (!u(e)) return s;
  const n = { ...t }, o = { ...e.dataset }, r = { ...s }, l = {}, f = "title";
  return E(o).forEach(([i, h]) => {
    const v = typeof i == "string" && i.includes(a) ? z(i.replace(a, "")) : z(i);
    l[v] = H(h);
  }), E(n).forEach(([i, h]) => {
    n[i] = H(h);
  }), E(s).forEach(([i, h]) => {
    i in n ? r[i] = n[i] : i in l ? r[i] = l[i] : r[i] = i === f ? O(e, f) : h;
  }), r;
}, B = (e) => Object.keys(e), Xe = (e, s) => {
  const t = new CustomEvent(e, {
    cancelable: !0,
    bubbles: !0
  });
  return b(s) && x(t, s), t;
}, Ge = { passive: !0 }, Ke = (e) => e.offsetHeight, Ue = (e, s) => {
  E(s).forEach(([t, a]) => {
    if (a && M(t) && t.includes("--"))
      e.style.setProperty(t, a);
    else {
      const n = {};
      n[t] = a, x(e.style, n);
    }
  });
}, T = (e) => b(e) && e.constructor.name === "Map" || !1, se = (e) => typeof e == "number" || !1, g = /* @__PURE__ */ new Map(), Je = {
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
}, Ye = (e) => e.toLowerCase(), te = (e, s) => (c(s) ? s : d()).querySelectorAll(e), C = /* @__PURE__ */ new Map();
function $(e) {
  const { shiftKey: s, code: t } = e, a = d(this), n = [
    ...te(Q, this)
  ].filter(
    (l) => !G(l, "disabled") && !O(l, I)
  );
  if (!n.length) return;
  const o = n[0], r = n[n.length - 1];
  t === "Tab" && (s && a.activeElement === o ? (r.focus(), e.preventDefault()) : !s && a.activeElement === r && (o.focus(), e.preventDefault()));
}
const k = (e) => C.has(e) === !0, ae = (e) => {
  k(e) || (q(e, "keydown", $), C.set(e, !0));
}, ne = (e) => {
  k(e) && (X(e, "keydown", $), C.delete(e));
}, es = (e) => {
  k(e) ? ne(e) : ae(e);
}, D = (e) => u(e) && "offsetWidth" in e || !1, L = (e, s) => {
  const { width: t, height: a, top: n, right: o, bottom: r, left: l } = e.getBoundingClientRect();
  let f = 1, i = 1;
  if (s && D(e)) {
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
}, ss = (e) => d(e).body, j = (e) => d(e).documentElement, ts = (e) => {
  const s = V(e), t = s ? e.scrollX : e.scrollLeft, a = s ? e.scrollY : e.scrollTop;
  return { x: t, y: a };
}, oe = (e) => c(e) && e.constructor.name === "ShadowRoot" || !1, as = (e) => e.nodeName === "HTML" ? e : u(e) && e.assignedSlot || c(e) && e.parentNode || oe(e) && e.host || j(e), ns = (e) => e ? W(e) ? e.defaultView : c(e) ? e?.ownerDocument?.defaultView : e : window, os = (e) => c(e) && ["TABLE", "TD", "TH"].includes(e.nodeName) || !1, rs = (e, s) => e.matches(s), re = (e) => {
  if (!D(e)) return !1;
  const { width: s, height: t } = L(e), { offsetWidth: a, offsetHeight: n } = e;
  return Math.round(s) !== a || Math.round(t) !== n;
}, is = (e, s, t) => {
  const a = D(s), n = L(
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
let P = 0, S = 0;
const p = /* @__PURE__ */ new Map(), ie = (e, s) => {
  let t = s ? P : S;
  if (s) {
    const a = ie(e), n = p.get(a) || /* @__PURE__ */ new Map();
    p.has(a) || p.set(a, n), T(n) && !n.has(s) ? (n.set(s, t), P += 1) : t = n.get(s);
  } else {
    const a = e.id || e;
    p.has(a) ? t = p.get(a) : (p.set(a, t), S += 1);
  }
  return t;
}, ls = (e) => Array.isArray(e) || !1, us = (e) => {
  if (!c(e)) return !1;
  const { top: s, bottom: t } = L(e), { clientHeight: a } = j(e);
  return s <= a && t >= 0;
}, cs = (e) => typeof e == "function" || !1, ds = (e) => b(e) && e.constructor.name === "NodeList" || !1, fs = (e) => j(e).dir === "rtl", le = (e, s) => !e || !s ? null : e.closest(s) || le(e.getRootNode().host, s) || null, ue = (e, s) => u(e) ? e : (u(s) ? s : d()).querySelector(e), hs = (e, s) => (c(s) ? s : d()).getElementsByTagName(
  e
), gs = (e, s) => d(s).getElementById(e), ms = (e, s) => (s && c(s) ? s : d()).getElementsByClassName(
  e
), w = {}, R = (e) => {
  const { type: s, currentTarget: t } = e;
  w[s].forEach((a, n) => {
    t === n && a.forEach((o, r) => {
      r.apply(n, [e]), typeof o == "object" && o.once && ce(n, s, r, o);
    });
  });
}, ps = (e, s, t, a) => {
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
}, de = "5.1.4", fe = de;
class ys {
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
    n && n._toggleEventListeners(), this.element = a, this.options = this.defaults && B(this.defaults).length ? ee(a, this.defaults, t || {}, "bs") : {}, y.set(a, this.name, this);
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
    y.remove(this.element, this.name), B(this).forEach((s) => {
      delete this[s];
    });
  }
}
export {
  $e as $,
  xe as A,
  ys as B,
  G as C,
  us as D,
  ps as E,
  pe as F,
  Re as G,
  fs as H,
  De as I,
  qe as J,
  O as K,
  A as L,
  j as M,
  le as N,
  Ce as O,
  L as P,
  We as Q,
  we as R,
  Ae as S,
  x as T,
  Ne as U,
  He as V,
  ue as W,
  Be as X,
  Fe as Y,
  U as Z,
  Qe as _,
  Ie as a,
  I as a0,
  me as a1,
  ss as a2,
  es as a3,
  ns as a4,
  K as a5,
  gs as a6,
  hs as a7,
  ye as a8,
  be as a9,
  ve as aa,
  ts as ab,
  is as ac,
  Ye as ad,
  cs as ae,
  ds as af,
  ls as ag,
  c as ah,
  as as ai,
  oe as aj,
  os as ak,
  ie as al,
  Te as am,
  Oe as an,
  he as ao,
  rs as b,
  te as c,
  d,
  Ke as e,
  Ge as f,
  je as g,
  Je as h,
  ze as i,
  ms as j,
  Ee as k,
  Pe as l,
  Xe as m,
  Se as n,
  D as o,
  M as p,
  Ve as q,
  ce as r,
  _e as s,
  Ze as t,
  Y as u,
  Le as v,
  Me as w,
  Ue as x,
  ge as y,
  ke as z
};
//# sourceMappingURL=base-component-BO-nCUu-.mjs.map
