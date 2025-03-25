const de = "aria-describedby", he = "aria-expanded", O = "aria-hidden", fe = "aria-modal", ge = "aria-pressed", pe = "aria-selected", me = "focus", ye = "focusin", we = "focusout", be = "keydown", ve = "keyup", Ee = "click", Le = "mousedown", Ae = "hover", Te = "mouseenter", Ne = "mouseleave", Me = "pointerdown", xe = "pointermove", De = "pointerup", ke = "touchstart", Ce = "dragstart", q = 'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"]', Be = "ArrowDown", We = "ArrowUp", He = "ArrowLeft", Pe = "ArrowRight", Se = "Escape", V = "transitionDuration", I = "transitionDelay", T = "transitionend", $ = "transitionProperty", $e = () => {
  const e = /(iPhone|iPod|iPad)/;
  return navigator?.userAgentData?.brands.some(
    (t) => e.test(t.brand)
  ) || e.test(
    navigator?.userAgent
  ) || !1;
}, je = () => {
}, K = (e, t, s, n) => {
  const a = n || !1;
  e.addEventListener(
    t,
    s,
    a
  );
}, _ = (e, t, s, n) => {
  const a = n || !1;
  e.removeEventListener(
    t,
    s,
    a
  );
}, j = (e, t) => e.getAttribute(t), G = (e, t) => e.hasAttribute(t), ze = (e, t, s) => e.setAttribute(t, s), Re = (e, t) => e.removeAttribute(t), Fe = (e, ...t) => {
  e.classList.add(...t);
}, Oe = (e, ...t) => {
  e.classList.remove(...t);
}, qe = (e, t) => e.classList.contains(t), b = (e) => e != null && typeof e == "object" || !1, u = (e) => b(e) && typeof e.nodeType == "number" && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].some(
  (t) => e.nodeType === t
) || !1, c = (e) => u(e) && e.nodeType === 1 || !1, p = /* @__PURE__ */ new Map(), y = {
  data: p,
  set: (e, t, s) => {
    c(e) && (p.has(t) || p.set(t, /* @__PURE__ */ new Map()), p.get(t).set(e, s));
  },
  getAllFor: (e) => p.get(e) || null,
  get: (e, t) => {
    if (!c(e) || !t) return null;
    const s = y.getAllFor(t);
    return e && s && s.get(e) || null;
  },
  remove: (e, t) => {
    const s = y.getAllFor(t);
    !s || !c(e) || (s.delete(e), s.size === 0 && p.delete(t));
  }
}, Ve = (e, t) => y.get(e, t), B = (e) => e?.trim().replace(
  /(?:^\w|[A-Z]|\b\w)/g,
  (t, s) => s === 0 ? t.toLowerCase() : t.toUpperCase()
).replace(/\s+/g, ""), x = (e) => typeof e == "string" || !1, z = (e) => b(e) && e.constructor.name === "Window" || !1, R = (e) => u(e) && e.nodeType === 9 || !1, d = (e) => R(e) ? e : u(e) ? e.ownerDocument : z(e) ? e.document : globalThis.document, D = (e, ...t) => Object.assign(e, ...t), Q = (e) => {
  if (!e) return;
  if (x(e))
    return d().createElement(e);
  const { tagName: t } = e, s = Q(t);
  if (!s) return;
  const n = { ...e };
  return delete n.tagName, D(s, n);
}, U = (e, t) => e.dispatchEvent(t), L = (e, t, s) => {
  const n = getComputedStyle(e, s), a = t.replace("webkit", "Webkit").replace(/([A-Z])/g, "-$1").toLowerCase();
  return n.getPropertyValue(a);
}, X = (e) => {
  const t = L(e, $), s = L(e, I), n = s.includes("ms") ? 1 : 1e3, a = t && t !== "none" ? parseFloat(s) * n : 0;
  return Number.isNaN(a) ? 0 : a;
}, Y = (e) => {
  const t = L(e, $), s = L(e, V), n = s.includes("ms") ? 1 : 1e3, a = t && t !== "none" ? parseFloat(s) * n : 0;
  return Number.isNaN(a) ? 0 : a;
}, Ie = (e, t) => {
  let s = 0;
  const n = new Event(T), a = Y(e), o = X(e);
  if (a) {
    const r = (l) => {
      l.target === e && (t.apply(e, [l]), e.removeEventListener(T, r), s = 1);
    };
    e.addEventListener(T, r), setTimeout(() => {
      s || U(e, n);
    }, a + o + 17);
  } else
    t.apply(e, [n]);
}, Ke = (e, t) => e.focus(t), W = (e) => ["true", !0].includes(e) ? !0 : ["false", !1].includes(e) ? !1 : ["null", "", null, void 0].includes(e) ? null : e !== "" && !Number.isNaN(+e) ? +e : e, E = (e) => Object.entries(e), Z = (e, t, s, n) => {
  if (!c(e)) return t;
  const a = { ...s }, o = { ...e.dataset }, r = { ...t }, l = {}, h = "title";
  return E(o).forEach(([i, f]) => {
    const v = typeof i == "string" && i.includes(n) ? B(i.replace(n, "")) : B(i);
    l[v] = W(f);
  }), E(a).forEach(([i, f]) => {
    a[i] = W(f);
  }), E(t).forEach(([i, f]) => {
    i in a ? r[i] = a[i] : i in l ? r[i] = l[i] : r[i] = i === h ? j(e, h) : f;
  }), r;
}, H = (e) => Object.keys(e), _e = (e, t) => {
  const s = new CustomEvent(e, {
    cancelable: !0,
    bubbles: !0
  });
  return b(t) && D(s, t), s;
}, Ge = { passive: !0 }, Qe = (e) => e.offsetHeight, Ue = (e, t) => {
  E(t).forEach(([s, n]) => {
    if (n && x(s) && s.includes("--"))
      e.style.setProperty(s, n);
    else {
      const a = {};
      a[s] = n, D(e.style, a);
    }
  });
}, N = (e) => b(e) && e.constructor.name === "Map" || !1, J = (e) => typeof e == "number" || !1, g = /* @__PURE__ */ new Map(), Xe = {
  set: (e, t, s, n) => {
    c(e) && (n && n.length ? (g.has(e) || g.set(e, /* @__PURE__ */ new Map()), g.get(e).set(n, setTimeout(t, s))) : g.set(e, setTimeout(t, s)));
  },
  get: (e, t) => {
    if (!c(e)) return null;
    const s = g.get(e);
    return t && s && N(s) ? s.get(t) || null : J(s) ? s : null;
  },
  clear: (e, t) => {
    if (!c(e)) return;
    const s = g.get(e);
    t && t.length && N(s) ? (clearTimeout(s.get(t)), s.delete(t), s.size === 0 && g.delete(e)) : (clearTimeout(s), g.delete(e));
  }
}, Ye = (e) => e.toLowerCase(), ee = (e, t) => (u(t) ? t : d()).querySelectorAll(e), M = /* @__PURE__ */ new Map();
function te(e) {
  const { shiftKey: t, code: s } = e, n = d(this), a = [
    ...ee(q, this)
  ].filter(
    (l) => !G(l, "disabled") && !j(l, O)
  );
  if (!a.length) return;
  const o = a[0], r = a[a.length - 1];
  s === "Tab" && (t && n.activeElement === o ? (r.focus(), e.preventDefault()) : !t && n.activeElement === r && (o.focus(), e.preventDefault()));
}
const se = (e) => M.has(e) === !0, Ze = (e) => {
  const t = se(e);
  (t ? _ : K)(e, "keydown", te), t ? M.delete(e) : M.set(e, !0);
}, k = (e) => c(e) && "offsetWidth" in e || !1, A = (e, t) => {
  const { width: s, height: n, top: a, right: o, bottom: r, left: l } = e.getBoundingClientRect();
  let h = 1, i = 1;
  if (t && k(e)) {
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
}, Je = (e) => d(e).body, C = (e) => d(e).documentElement, et = (e) => {
  const t = z(e), s = t ? e.scrollX : e.scrollLeft, n = t ? e.scrollY : e.scrollTop;
  return { x: s, y: n };
}, ne = (e) => u(e) && e.constructor.name === "ShadowRoot" || !1, tt = (e) => e.nodeName === "HTML" ? e : c(e) && e.assignedSlot || u(e) && e.parentNode || ne(e) && e.host || C(e), st = (e) => e ? R(e) ? e.defaultView : u(e) ? e?.ownerDocument?.defaultView : e : window, nt = (e) => u(e) && ["TABLE", "TD", "TH"].includes(e.nodeName) || !1, at = (e, t) => e.matches(t), ae = (e) => {
  if (!k(e)) return !1;
  const { width: t, height: s } = A(e), { offsetWidth: n, offsetHeight: a } = e;
  return Math.round(t) !== n || Math.round(s) !== a;
}, ot = (e, t, s) => {
  const n = k(t), a = A(
    e,
    n && ae(t)
  ), o = { x: 0, y: 0 };
  if (n) {
    const r = A(t, !0);
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
const m = /* @__PURE__ */ new Map(), oe = (e, t) => {
  let s = t ? P : S;
  if (t) {
    const n = oe(e), a = m.get(n) || /* @__PURE__ */ new Map();
    m.has(n) || m.set(n, a), N(a) && !a.has(t) ? (a.set(t, s), P += 1) : s = a.get(t);
  } else {
    const n = e.id || e;
    m.has(n) ? s = m.get(n) : (m.set(n, s), S += 1);
  }
  return s;
}, rt = (e) => Array.isArray(e) || !1, it = (e) => {
  if (!u(e)) return !1;
  const { top: t, bottom: s } = A(e), { clientHeight: n } = C(e);
  return t <= n && s >= 0;
}, lt = (e) => typeof e == "function" || !1, ct = (e) => b(e) && e.constructor.name === "NodeList" || !1, ut = (e) => C(e).dir === "rtl", re = (e, t) => !e || !t ? null : e.closest(t) || re(e.getRootNode().host, t) || null, ie = (e, t) => c(e) ? e : (c(t) ? t : d()).querySelector(e), dt = (e, t) => (u(t) ? t : d()).getElementsByTagName(
  e
), ht = (e, t) => d(t).getElementById(e), ft = (e, t) => (t && u(t) ? t : d()).getElementsByClassName(
  e
), w = {}, F = (e) => {
  const { type: t, currentTarget: s } = e;
  w[t].forEach((n, a) => {
    s === a && n.forEach((o, r) => {
      r.apply(a, [e]), typeof o == "object" && o.once && le(a, t, r, o);
    });
  });
}, gt = (e, t, s, n) => {
  w[t] || (w[t] = /* @__PURE__ */ new Map());
  const a = w[t];
  a.has(e) || a.set(e, /* @__PURE__ */ new Map());
  const o = a.get(
    e
  ), { size: r } = o;
  o.set(s, n), r || e.addEventListener(
    t,
    F,
    n
  );
}, le = (e, t, s, n) => {
  const a = w[t], o = a && a.get(e), r = o && o.get(s), l = r !== void 0 ? r : n;
  o && o.has(s) && o.delete(s), a && (!o || !o.size) && a.delete(e), (!a || !a.size) && delete w[t], (!o || !o.size) && e.removeEventListener(
    t,
    F,
    l
  );
}, ce = "5.1.1", ue = ce;
class pt {
  constructor(t, s) {
    let n;
    try {
      if (c(t))
        n = t;
      else if (x(t)) {
        if (n = ie(t), !n) throw Error(`"${t}" is not a valid selector.`);
      } else
        throw Error("your target is not an instance of HTMLElement.");
    } catch (o) {
      throw Error(`${this.name} Error: ${o.message}`);
    }
    const a = y.get(n, this.name);
    a && a._toggleEventListeners(), this.element = n, this.options = this.defaults && H(this.defaults).length ? Z(n, this.defaults, s || {}, "bs") : {}, y.set(n, this.name, this);
  }
  get version() {
    return ue;
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
    y.remove(this.element, this.name), H(this).forEach((t) => {
      delete this[t];
    });
  }
}
export {
  Re as $,
  G as A,
  pt as B,
  D as C,
  Me as D,
  gt as E,
  Ke as F,
  qe as G,
  ie as H,
  ge as I,
  L as J,
  Fe as K,
  C as L,
  A as M,
  x as N,
  xe as O,
  me as P,
  ve as Q,
  ft as R,
  re as S,
  it as T,
  Le as U,
  Be as V,
  ze as W,
  Ve as X,
  je as Y,
  We as Z,
  Se as _,
  U as a,
  Je as a0,
  O as a1,
  fe as a2,
  Ze as a3,
  st as a4,
  Q as a5,
  ht as a6,
  dt as a7,
  pe as a8,
  ye as a9,
  we as aa,
  et as ab,
  ot as ac,
  Ye as ad,
  lt as ae,
  ct as af,
  rt as ag,
  u as ah,
  tt as ai,
  ne as aj,
  nt as ak,
  oe as al,
  Ae as am,
  $e as an,
  de as ao,
  ut as b,
  Xe as c,
  d,
  Y as e,
  Ge as f,
  Ee as g,
  Te as h,
  ke as i,
  Ce as j,
  j as k,
  be as l,
  Qe as m,
  Ie as n,
  He as o,
  _e as p,
  Oe as q,
  le as r,
  Pe as s,
  k as t,
  ee as u,
  at as v,
  Ue as w,
  De as x,
  Ne as y,
  he as z
};
//# sourceMappingURL=base-component--xj9oMJ8.mjs.map
