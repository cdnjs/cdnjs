const fe = "aria-describedby", ge = "aria-expanded", I = "aria-hidden", me = "aria-modal", pe = "aria-pressed", ye = "aria-selected", we = "focus", be = "focusin", ve = "focusout", Ee = "keydown", Ae = "keyup", Le = "click", Ne = "mousedown", Te = "hover", Me = "mouseenter", xe = "mouseleave", Ce = "pointerdown", ke = "pointermove", De = "pointerup", je = "touchstart", ze = "dragstart", Q = 'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"]', He = "ArrowDown", Be = "ArrowUp", Pe = "ArrowLeft", Se = "ArrowRight", Fe = "Escape", Z = "transitionDuration", _ = "transitionDelay", N = "transitionend", F = "transitionProperty", Oe = () => {
  const e = /(iPhone|iPod|iPad)/;
  return navigator?.userAgentData?.brands.some(
    (t) => e.test(t.brand)
  ) || e.test(
    navigator?.userAgent
  ) || !1;
}, Ve = () => {
}, q = (e, t, s, n) => {
  e.addEventListener(
    t,
    s,
    !1
  );
}, X = (e, t, s, n) => {
  e.removeEventListener(
    t,
    s,
    !1
  );
}, O = (e, t) => e.getAttribute(t), G = (e, t) => e.hasAttribute(t), We = (e, t, s) => e.setAttribute(t, s), $e = (e, t) => e.removeAttribute(t), Re = (e, ...t) => {
  e.classList.add(...t);
}, Ie = (e, ...t) => {
  e.classList.remove(...t);
}, Qe = (e, t) => e.classList.contains(t), b = (e) => e != null && typeof e == "object" || !1, u = (e) => b(e) && typeof e.nodeType == "number" && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].some(
  (t) => e.nodeType === t
) || !1, c = (e) => u(e) && e.nodeType === 1 || !1, m = /* @__PURE__ */ new Map(), y = {
  data: m,
  set: (e, t, s) => {
    c(e) && (m.has(t) || m.set(t, /* @__PURE__ */ new Map()), m.get(t).set(e, s));
  },
  getAllFor: (e) => m.get(e) || null,
  get: (e, t) => {
    if (!c(e) || !t) return null;
    const s = y.getAllFor(t);
    return e && s && s.get(e) || null;
  },
  remove: (e, t) => {
    const s = y.getAllFor(t);
    !s || !c(e) || (s.delete(e), s.size === 0 && m.delete(t));
  }
}, Ze = (e, t) => y.get(e, t), z = (e) => e?.trim().replace(
  /(?:^\w|[A-Z]|\b\w)/g,
  (t, s) => s === 0 ? t.toLowerCase() : t.toUpperCase()
).replace(/\s+/g, ""), M = (e) => typeof e == "string" || !1, V = (e) => b(e) && e.constructor.name === "Window" || !1, W = (e) => u(e) && e.nodeType === 9 || !1, d = (e) => W(e) ? e : u(e) ? e.ownerDocument : V(e) ? e.document : globalThis.document, x = (e, ...t) => Object.assign(e, ...t), K = (e) => {
  if (!e) return;
  if (M(e))
    return d().createElement(e);
  const { tagName: t } = e, s = K(t);
  if (!s) return;
  const n = { ...e };
  return delete n.tagName, x(s, n);
}, U = (e, t) => e.dispatchEvent(t), A = (e, t, s) => {
  const n = getComputedStyle(e, s), a = t.replace("webkit", "Webkit").replace(/([A-Z])/g, "-$1").toLowerCase();
  return n.getPropertyValue(a);
}, J = (e) => {
  const t = A(e, F), s = A(e, _), n = s.includes("ms") ? 1 : 1e3, a = t && t !== "none" ? parseFloat(s) * n : 0;
  return Number.isNaN(a) ? 0 : a;
}, Y = (e) => {
  const t = A(e, F), s = A(e, Z), n = s.includes("ms") ? 1 : 1e3, a = t && t !== "none" ? parseFloat(s) * n : 0;
  return Number.isNaN(a) ? 0 : a;
}, _e = (e, t) => {
  let s = 0;
  const n = new Event(N), a = Y(e), o = J(e);
  if (a) {
    const r = (l) => {
      l.target === e && (t.apply(e, [l]), e.removeEventListener(N, r), s = 1);
    };
    e.addEventListener(N, r), setTimeout(() => {
      s || U(e, n);
    }, a + o + 17);
  } else
    t.apply(e, [n]);
}, qe = (e, t) => e.focus(t), H = (e) => ["true", !0].includes(e) ? !0 : ["false", !1].includes(e) ? !1 : ["null", "", null, void 0].includes(e) ? null : e !== "" && !Number.isNaN(+e) ? +e : e, E = (e) => Object.entries(e), ee = (e, t, s, n) => {
  if (!c(e)) return t;
  const a = { ...s }, o = { ...e.dataset }, r = { ...t }, l = {}, h = "title";
  return E(o).forEach(([i, f]) => {
    const v = typeof i == "string" && i.includes(n) ? z(i.replace(n, "")) : z(i);
    l[v] = H(f);
  }), E(a).forEach(([i, f]) => {
    a[i] = H(f);
  }), E(t).forEach(([i, f]) => {
    i in a ? r[i] = a[i] : i in l ? r[i] = l[i] : r[i] = i === h ? O(e, h) : f;
  }), r;
}, B = (e) => Object.keys(e), Xe = (e, t) => {
  const s = new CustomEvent(e, {
    cancelable: !0,
    bubbles: !0
  });
  return b(t) && x(s, t), s;
}, Ge = { passive: !0 }, Ke = (e) => e.offsetHeight, Ue = (e, t) => {
  E(t).forEach(([s, n]) => {
    if (n && M(s) && s.includes("--"))
      e.style.setProperty(s, n);
    else {
      const a = {};
      a[s] = n, x(e.style, a);
    }
  });
}, T = (e) => b(e) && e.constructor.name === "Map" || !1, te = (e) => typeof e == "number" || !1, g = /* @__PURE__ */ new Map(), Je = {
  set: (e, t, s, n) => {
    c(e) && (n && n.length ? (g.has(e) || g.set(e, /* @__PURE__ */ new Map()), g.get(e).set(n, setTimeout(t, s))) : g.set(e, setTimeout(t, s)));
  },
  get: (e, t) => {
    if (!c(e)) return null;
    const s = g.get(e);
    return t && s && T(s) ? s.get(t) || null : te(s) ? s : null;
  },
  clear: (e, t) => {
    if (!c(e)) return;
    const s = g.get(e);
    t && t.length && T(s) ? (clearTimeout(s.get(t)), s.delete(t), s.size === 0 && g.delete(e)) : (clearTimeout(s), g.delete(e));
  }
}, Ye = (e) => e.toLowerCase(), se = (e, t) => (u(t) ? t : d()).querySelectorAll(e), C = /* @__PURE__ */ new Map();
function $(e) {
  const { shiftKey: t, code: s } = e, n = d(this), a = [
    ...se(Q, this)
  ].filter(
    (l) => !G(l, "disabled") && !O(l, I)
  );
  if (!a.length) return;
  const o = a[0], r = a[a.length - 1];
  s === "Tab" && (t && n.activeElement === o ? (r.focus(), e.preventDefault()) : !t && n.activeElement === r && (o.focus(), e.preventDefault()));
}
const k = (e) => C.has(e) === !0, ne = (e) => {
  k(e) || (q(e, "keydown", $), C.set(e, !0));
}, ae = (e) => {
  k(e) && (X(e, "keydown", $), C.delete(e));
}, et = (e) => {
  k(e) ? ae(e) : ne(e);
}, D = (e) => c(e) && "offsetWidth" in e || !1, L = (e, t) => {
  const { width: s, height: n, top: a, right: o, bottom: r, left: l } = e.getBoundingClientRect();
  let h = 1, i = 1;
  if (t && D(e)) {
    const { offsetWidth: f, offsetHeight: v } = e;
    h = f > 0 ? Math.round(s) / f : 1, i = v > 0 ? Math.round(n) / v : 1;
  }
  return {
    width: s / h,
    height: n / i,
    top: a / i,
    right: o / h,
    bottom: r / i,
    left: l / h,
    x: l / h,
    y: a / i
  };
}, tt = (e) => d(e).body, j = (e) => d(e).documentElement, st = (e) => {
  const t = V(e), s = t ? e.scrollX : e.scrollLeft, n = t ? e.scrollY : e.scrollTop;
  return { x: s, y: n };
}, oe = (e) => u(e) && e.constructor.name === "ShadowRoot" || !1, nt = (e) => e.nodeName === "HTML" ? e : c(e) && e.assignedSlot || u(e) && e.parentNode || oe(e) && e.host || j(e), at = (e) => e ? W(e) ? e.defaultView : u(e) ? e?.ownerDocument?.defaultView : e : window, ot = (e) => u(e) && ["TABLE", "TD", "TH"].includes(e.nodeName) || !1, rt = (e, t) => e.matches(t), re = (e) => {
  if (!D(e)) return !1;
  const { width: t, height: s } = L(e), { offsetWidth: n, offsetHeight: a } = e;
  return Math.round(t) !== n || Math.round(s) !== a;
}, it = (e, t, s) => {
  const n = D(t), a = L(
    e,
    n && re(t)
  ), o = { x: 0, y: 0 };
  if (n) {
    const r = L(t, !0);
    o.x = r.x + t.clientLeft, o.y = r.y + t.clientTop;
  }
  return {
    x: a.left + s.x - o.x,
    y: a.top + s.y - o.y,
    width: a.width,
    height: a.height
  };
};
let P = 0, S = 0;
const p = /* @__PURE__ */ new Map(), ie = (e, t) => {
  let s = t ? P : S;
  if (t) {
    const n = ie(e), a = p.get(n) || /* @__PURE__ */ new Map();
    p.has(n) || p.set(n, a), T(a) && !a.has(t) ? (a.set(t, s), P += 1) : s = a.get(t);
  } else {
    const n = e.id || e;
    p.has(n) ? s = p.get(n) : (p.set(n, s), S += 1);
  }
  return s;
}, lt = (e) => Array.isArray(e) || !1, ct = (e) => {
  if (!u(e)) return !1;
  const { top: t, bottom: s } = L(e), { clientHeight: n } = j(e);
  return t <= n && s >= 0;
}, ut = (e) => typeof e == "function" || !1, dt = (e) => b(e) && e.constructor.name === "NodeList" || !1, ht = (e) => j(e).dir === "rtl", le = (e, t) => !e || !t ? null : e.closest(t) || le(e.getRootNode().host, t) || null, ce = (e, t) => c(e) ? e : (c(t) ? t : d()).querySelector(e), ft = (e, t) => (u(t) ? t : d()).getElementsByTagName(
  e
), gt = (e, t) => d(t).getElementById(e), mt = (e, t) => (t && u(t) ? t : d()).getElementsByClassName(
  e
), w = {}, R = (e) => {
  const { type: t, currentTarget: s } = e;
  w[t].forEach((n, a) => {
    s === a && n.forEach((o, r) => {
      r.apply(a, [e]), typeof o == "object" && o.once && ue(a, t, r, o);
    });
  });
}, pt = (e, t, s, n) => {
  w[t] || (w[t] = /* @__PURE__ */ new Map());
  const a = w[t];
  a.has(e) || a.set(e, /* @__PURE__ */ new Map());
  const o = a.get(
    e
  ), { size: r } = o;
  o.set(s, n), r || e.addEventListener(
    t,
    R,
    n
  );
}, ue = (e, t, s, n) => {
  const a = w[t], o = a && a.get(e), r = o && o.get(s), l = r !== void 0 ? r : n;
  o && o.has(s) && o.delete(s), a && (!o || !o.size) && a.delete(e), (!a || !a.size) && delete w[t], (!o || !o.size) && e.removeEventListener(
    t,
    R,
    l
  );
}, de = "5.1.2", he = de;
class yt {
  constructor(t, s) {
    let n;
    try {
      if (c(t))
        n = t;
      else if (M(t)) {
        if (n = ce(t), !n) throw Error(`"${t}" is not a valid selector.`);
      } else
        throw Error("your target is not an instance of HTMLElement.");
    } catch (o) {
      throw Error(`${this.name} Error: ${o.message}`);
    }
    const a = y.get(n, this.name);
    a && a._toggleEventListeners(), this.element = n, this.options = this.defaults && B(this.defaults).length ? ee(n, this.defaults, s || {}, "bs") : {}, y.set(n, this.name, this);
  }
  get version() {
    return he;
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
    y.remove(this.element, this.name), B(this).forEach((t) => {
      delete this[t];
    });
  }
}
export {
  $e as $,
  xe as A,
  yt as B,
  G as C,
  ct as D,
  pt as E,
  pe as F,
  Re as G,
  ht as H,
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
  ce as W,
  Be as X,
  Fe as Y,
  U as Z,
  Qe as _,
  Ie as a,
  tt as a0,
  I as a1,
  me as a2,
  et as a3,
  at as a4,
  K as a5,
  gt as a6,
  ft as a7,
  ye as a8,
  be as a9,
  ve as aa,
  st as ab,
  it as ac,
  Ye as ad,
  ut as ae,
  dt as af,
  lt as ag,
  u as ah,
  nt as ai,
  oe as aj,
  ot as ak,
  ie as al,
  Te as am,
  Oe as an,
  fe as ao,
  rt as b,
  se as c,
  d,
  Ke as e,
  Ge as f,
  je as g,
  Je as h,
  ze as i,
  mt as j,
  Ee as k,
  Se as l,
  Xe as m,
  Pe as n,
  D as o,
  M as p,
  Ve as q,
  ue as r,
  _e as s,
  Ze as t,
  Y as u,
  Le as v,
  Me as w,
  Ue as x,
  ge as y,
  ke as z
};
//# sourceMappingURL=base-component-BMXjNJAi.mjs.map
