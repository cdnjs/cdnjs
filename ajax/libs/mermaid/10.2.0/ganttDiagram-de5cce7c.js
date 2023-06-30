import { I as qe, J as Ge, R as je, K as Qe, L as Yn, M as te, N as Fn, O as ee, W as Un, Y as Ln, P as An, c as Tt, s as En, g as In, z as Wn, A as On, b as zn, a as Nn, Q as nt, m as Hn, B as Pn, e as Vn, x as Rn, l as de, j as Nt, k as Bn, f as Zn } from "./mermaid-9357f3d0.js";
import { b as Xn, t as Ue, c as qn, a as Gn, l as jn } from "./linear-e84f7512.js";
import { i as Qn } from "./init-f9637058.js";
function Jn(t, e) {
  let n;
  if (e === void 0)
    for (const r of t)
      r != null && (n < r || n === void 0 && r >= r) && (n = r);
  else {
    let r = -1;
    for (let i of t)
      (i = e(i, ++r, t)) != null && (n < i || n === void 0 && i >= i) && (n = i);
  }
  return n;
}
function Kn(t, e) {
  let n;
  if (e === void 0)
    for (const r of t)
      r != null && (n > r || n === void 0 && r >= r) && (n = r);
  else {
    let r = -1;
    for (let i of t)
      (i = e(i, ++r, t)) != null && (n > i || n === void 0 && i >= i) && (n = i);
  }
  return n;
}
function $n(t) {
  return t;
}
var Vt = 1, ne = 2, me = 3, Ht = 4, Le = 1e-6;
function tr(t) {
  return "translate(" + t + ",0)";
}
function er(t) {
  return "translate(0," + t + ")";
}
function nr(t) {
  return (e) => +t(e);
}
function rr(t, e) {
  return e = Math.max(0, t.bandwidth() - e * 2) / 2, t.round() && (e = Math.round(e)), (n) => +t(n) + e;
}
function ir() {
  return !this.__axis;
}
function Je(t, e) {
  var n = [], r = null, i = null, a = 6, s = 6, g = 3, k = typeof window < "u" && window.devicePixelRatio > 1 ? 0 : 0.5, p = t === Vt || t === Ht ? -1 : 1, T = t === Ht || t === ne ? "x" : "y", _ = t === Vt || t === me ? tr : er;
  function x(v) {
    var E = r ?? (e.ticks ? e.ticks.apply(e, n) : e.domain()), M = i ?? (e.tickFormat ? e.tickFormat.apply(e, n) : $n), N = Math.max(a, 0) + g, V = e.range(), Q = +V[0] + k, H = +V[V.length - 1] + k, P = (e.bandwidth ? rr : nr)(e.copy(), k), R = v.selection ? v.selection() : v, w = R.selectAll(".domain").data([null]), O = R.selectAll(".tick").data(E, e).order(), b = O.exit(), l = O.enter().append("g").attr("class", "tick"), h = O.select("line"), d = O.select("text");
    w = w.merge(w.enter().insert("path", ".tick").attr("class", "domain").attr("stroke", "currentColor")), O = O.merge(l), h = h.merge(l.append("line").attr("stroke", "currentColor").attr(T + "2", p * a)), d = d.merge(l.append("text").attr("fill", "currentColor").attr(T, p * N).attr("dy", t === Vt ? "0em" : t === me ? "0.71em" : "0.32em")), v !== R && (w = w.transition(v), O = O.transition(v), h = h.transition(v), d = d.transition(v), b = b.transition(v).attr("opacity", Le).attr("transform", function(c) {
      return isFinite(c = P(c)) ? _(c + k) : this.getAttribute("transform");
    }), l.attr("opacity", Le).attr("transform", function(c) {
      var D = this.parentNode.__axis;
      return _((D && isFinite(D = D(c)) ? D : P(c)) + k);
    })), b.remove(), w.attr("d", t === Ht || t === ne ? s ? "M" + p * s + "," + Q + "H" + k + "V" + H + "H" + p * s : "M" + k + "," + Q + "V" + H : s ? "M" + Q + "," + p * s + "V" + k + "H" + H + "V" + p * s : "M" + Q + "," + k + "H" + H), O.attr("opacity", 1).attr("transform", function(c) {
      return _(P(c) + k);
    }), h.attr(T + "2", p * a), d.attr(T, p * N).text(M), R.filter(ir).attr("fill", "none").attr("font-size", 10).attr("font-family", "sans-serif").attr("text-anchor", t === ne ? "start" : t === Ht ? "end" : "middle"), R.each(function() {
      this.__axis = P;
    });
  }
  return x.scale = function(v) {
    return arguments.length ? (e = v, x) : e;
  }, x.ticks = function() {
    return n = Array.from(arguments), x;
  }, x.tickArguments = function(v) {
    return arguments.length ? (n = v == null ? [] : Array.from(v), x) : n.slice();
  }, x.tickValues = function(v) {
    return arguments.length ? (r = v == null ? null : Array.from(v), x) : r && r.slice();
  }, x.tickFormat = function(v) {
    return arguments.length ? (i = v, x) : i;
  }, x.tickSize = function(v) {
    return arguments.length ? (a = s = +v, x) : a;
  }, x.tickSizeInner = function(v) {
    return arguments.length ? (a = +v, x) : a;
  }, x.tickSizeOuter = function(v) {
    return arguments.length ? (s = +v, x) : s;
  }, x.tickPadding = function(v) {
    return arguments.length ? (g = +v, x) : g;
  }, x.offset = function(v) {
    return arguments.length ? (k = +v, x) : k;
  }, x;
}
function ar(t) {
  return Je(Vt, t);
}
function sr(t) {
  return Je(me, t);
}
const or = Math.PI / 180, cr = 180 / Math.PI, Zt = 18, Ke = 0.96422, $e = 1, tn = 0.82521, en = 4 / 29, bt = 6 / 29, nn = 3 * bt * bt, ur = bt * bt * bt;
function rn(t) {
  if (t instanceof ct)
    return new ct(t.l, t.a, t.b, t.opacity);
  if (t instanceof lt)
    return an(t);
  t instanceof je || (t = Yn(t));
  var e = se(t.r), n = se(t.g), r = se(t.b), i = re((0.2225045 * e + 0.7168786 * n + 0.0606169 * r) / $e), a, s;
  return e === n && n === r ? a = s = i : (a = re((0.4360747 * e + 0.3850649 * n + 0.1430804 * r) / Ke), s = re((0.0139322 * e + 0.0971045 * n + 0.7141733 * r) / tn)), new ct(116 * i - 16, 500 * (a - i), 200 * (i - s), t.opacity);
}
function lr(t, e, n, r) {
  return arguments.length === 1 ? rn(t) : new ct(t, e, n, r ?? 1);
}
function ct(t, e, n, r) {
  this.l = +t, this.a = +e, this.b = +n, this.opacity = +r;
}
qe(ct, lr, Ge(Qe, {
  brighter(t) {
    return new ct(this.l + Zt * (t ?? 1), this.a, this.b, this.opacity);
  },
  darker(t) {
    return new ct(this.l - Zt * (t ?? 1), this.a, this.b, this.opacity);
  },
  rgb() {
    var t = (this.l + 16) / 116, e = isNaN(this.a) ? t : t + this.a / 500, n = isNaN(this.b) ? t : t - this.b / 200;
    return e = Ke * ie(e), t = $e * ie(t), n = tn * ie(n), new je(
      ae(3.1338561 * e - 1.6168667 * t - 0.4906146 * n),
      ae(-0.9787684 * e + 1.9161415 * t + 0.033454 * n),
      ae(0.0719453 * e - 0.2289914 * t + 1.4052427 * n),
      this.opacity
    );
  }
}));
function re(t) {
  return t > ur ? Math.pow(t, 1 / 3) : t / nn + en;
}
function ie(t) {
  return t > bt ? t * t * t : nn * (t - en);
}
function ae(t) {
  return 255 * (t <= 31308e-7 ? 12.92 * t : 1.055 * Math.pow(t, 1 / 2.4) - 0.055);
}
function se(t) {
  return (t /= 255) <= 0.04045 ? t / 12.92 : Math.pow((t + 0.055) / 1.055, 2.4);
}
function fr(t) {
  if (t instanceof lt)
    return new lt(t.h, t.c, t.l, t.opacity);
  if (t instanceof ct || (t = rn(t)), t.a === 0 && t.b === 0)
    return new lt(NaN, 0 < t.l && t.l < 100 ? 0 : NaN, t.l, t.opacity);
  var e = Math.atan2(t.b, t.a) * cr;
  return new lt(e < 0 ? e + 360 : e, Math.sqrt(t.a * t.a + t.b * t.b), t.l, t.opacity);
}
function ge(t, e, n, r) {
  return arguments.length === 1 ? fr(t) : new lt(t, e, n, r ?? 1);
}
function lt(t, e, n, r) {
  this.h = +t, this.c = +e, this.l = +n, this.opacity = +r;
}
function an(t) {
  if (isNaN(t.h))
    return new ct(t.l, 0, 0, t.opacity);
  var e = t.h * or;
  return new ct(t.l, Math.cos(e) * t.c, Math.sin(e) * t.c, t.opacity);
}
qe(lt, ge, Ge(Qe, {
  brighter(t) {
    return new lt(this.h, this.c, this.l + Zt * (t ?? 1), this.opacity);
  },
  darker(t) {
    return new lt(this.h, this.c, this.l - Zt * (t ?? 1), this.opacity);
  },
  rgb() {
    return an(this).rgb();
  }
}));
function hr(t) {
  return function(e, n) {
    var r = t((e = ge(e)).h, (n = ge(n)).h), i = te(e.c, n.c), a = te(e.l, n.l), s = te(e.opacity, n.opacity);
    return function(g) {
      return e.h = r(g), e.c = i(g), e.l = a(g), e.opacity = s(g), e + "";
    };
  };
}
const dr = hr(Fn);
function mr(t, e) {
  t = t.slice();
  var n = 0, r = t.length - 1, i = t[n], a = t[r], s;
  return a < i && (s = n, n = r, r = s, s = i, i = a, a = s), t[n] = e.floor(i), t[r] = e.ceil(a), t;
}
var oe = /* @__PURE__ */ new Date(), ce = /* @__PURE__ */ new Date();
function tt(t, e, n, r) {
  function i(a) {
    return t(a = arguments.length === 0 ? /* @__PURE__ */ new Date() : /* @__PURE__ */ new Date(+a)), a;
  }
  return i.floor = function(a) {
    return t(a = /* @__PURE__ */ new Date(+a)), a;
  }, i.ceil = function(a) {
    return t(a = new Date(a - 1)), e(a, 1), t(a), a;
  }, i.round = function(a) {
    var s = i(a), g = i.ceil(a);
    return a - s < g - a ? s : g;
  }, i.offset = function(a, s) {
    return e(a = /* @__PURE__ */ new Date(+a), s == null ? 1 : Math.floor(s)), a;
  }, i.range = function(a, s, g) {
    var k = [], p;
    if (a = i.ceil(a), g = g == null ? 1 : Math.floor(g), !(a < s) || !(g > 0))
      return k;
    do
      k.push(p = /* @__PURE__ */ new Date(+a)), e(a, g), t(a);
    while (p < a && a < s);
    return k;
  }, i.filter = function(a) {
    return tt(function(s) {
      if (s >= s)
        for (; t(s), !a(s); )
          s.setTime(s - 1);
    }, function(s, g) {
      if (s >= s)
        if (g < 0)
          for (; ++g <= 0; )
            for (; e(s, -1), !a(s); )
              ;
        else
          for (; --g >= 0; )
            for (; e(s, 1), !a(s); )
              ;
    });
  }, n && (i.count = function(a, s) {
    return oe.setTime(+a), ce.setTime(+s), t(oe), t(ce), Math.floor(n(oe, ce));
  }, i.every = function(a) {
    return a = Math.floor(a), !isFinite(a) || !(a > 0) ? null : a > 1 ? i.filter(r ? function(s) {
      return r(s) % a === 0;
    } : function(s) {
      return i.count(0, s) % a === 0;
    }) : i;
  }), i;
}
var Xt = tt(function() {
}, function(t, e) {
  t.setTime(+t + e);
}, function(t, e) {
  return e - t;
});
Xt.every = function(t) {
  return t = Math.floor(t), !isFinite(t) || !(t > 0) ? null : t > 1 ? tt(function(e) {
    e.setTime(Math.floor(e / t) * t);
  }, function(e, n) {
    e.setTime(+e + n * t);
  }, function(e, n) {
    return (n - e) / t;
  }) : Xt;
};
const gr = Xt;
Xt.range;
const ft = 1e3, st = ft * 60, mt = st * 60, gt = mt * 24, Te = gt * 7, Ae = gt * 30, ue = gt * 365;
var sn = tt(function(t) {
  t.setTime(t - t.getMilliseconds());
}, function(t, e) {
  t.setTime(+t + e * ft);
}, function(t, e) {
  return (e - t) / ft;
}, function(t) {
  return t.getUTCSeconds();
});
const Et = sn;
sn.range;
var on = tt(function(t) {
  t.setTime(t - t.getMilliseconds() - t.getSeconds() * ft);
}, function(t, e) {
  t.setTime(+t + e * st);
}, function(t, e) {
  return (e - t) / st;
}, function(t) {
  return t.getMinutes();
});
const qt = on;
on.range;
var cn = tt(function(t) {
  t.setTime(t - t.getMilliseconds() - t.getSeconds() * ft - t.getMinutes() * st);
}, function(t, e) {
  t.setTime(+t + e * mt);
}, function(t, e) {
  return (e - t) / mt;
}, function(t) {
  return t.getHours();
});
const Gt = cn;
cn.range;
var un = tt(
  (t) => t.setHours(0, 0, 0, 0),
  (t, e) => t.setDate(t.getDate() + e),
  (t, e) => (e - t - (e.getTimezoneOffset() - t.getTimezoneOffset()) * st) / gt,
  (t) => t.getDate() - 1
);
const wt = un;
un.range;
function kt(t) {
  return tt(function(e) {
    e.setDate(e.getDate() - (e.getDay() + 7 - t) % 7), e.setHours(0, 0, 0, 0);
  }, function(e, n) {
    e.setDate(e.getDate() + n * 7);
  }, function(e, n) {
    return (n - e - (n.getTimezoneOffset() - e.getTimezoneOffset()) * st) / Te;
  });
}
var Dt = kt(0), jt = kt(1), yr = kt(2), kr = kt(3), Ct = kt(4), vr = kt(5), pr = kt(6);
Dt.range;
jt.range;
yr.range;
kr.range;
Ct.range;
vr.range;
pr.range;
var ln = tt(function(t) {
  t.setDate(1), t.setHours(0, 0, 0, 0);
}, function(t, e) {
  t.setMonth(t.getMonth() + e);
}, function(t, e) {
  return e.getMonth() - t.getMonth() + (e.getFullYear() - t.getFullYear()) * 12;
}, function(t) {
  return t.getMonth();
});
const Qt = ln;
ln.range;
var be = tt(function(t) {
  t.setMonth(0, 1), t.setHours(0, 0, 0, 0);
}, function(t, e) {
  t.setFullYear(t.getFullYear() + e);
}, function(t, e) {
  return e.getFullYear() - t.getFullYear();
}, function(t) {
  return t.getFullYear();
});
be.every = function(t) {
  return !isFinite(t = Math.floor(t)) || !(t > 0) ? null : tt(function(e) {
    e.setFullYear(Math.floor(e.getFullYear() / t) * t), e.setMonth(0, 1), e.setHours(0, 0, 0, 0);
  }, function(e, n) {
    e.setFullYear(e.getFullYear() + n * t);
  });
};
const yt = be;
be.range;
var fn = tt(function(t) {
  t.setUTCHours(0, 0, 0, 0);
}, function(t, e) {
  t.setUTCDate(t.getUTCDate() + e);
}, function(t, e) {
  return (e - t) / gt;
}, function(t) {
  return t.getUTCDate() - 1;
});
const hn = fn;
fn.range;
function vt(t) {
  return tt(function(e) {
    e.setUTCDate(e.getUTCDate() - (e.getUTCDay() + 7 - t) % 7), e.setUTCHours(0, 0, 0, 0);
  }, function(e, n) {
    e.setUTCDate(e.getUTCDate() + n * 7);
  }, function(e, n) {
    return (n - e) / Te;
  });
}
var dn = vt(0), Jt = vt(1), Tr = vt(2), br = vt(3), Mt = vt(4), xr = vt(5), wr = vt(6);
dn.range;
Jt.range;
Tr.range;
br.range;
Mt.range;
xr.range;
wr.range;
var xe = tt(function(t) {
  t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0);
}, function(t, e) {
  t.setUTCFullYear(t.getUTCFullYear() + e);
}, function(t, e) {
  return e.getUTCFullYear() - t.getUTCFullYear();
}, function(t) {
  return t.getUTCFullYear();
});
xe.every = function(t) {
  return !isFinite(t = Math.floor(t)) || !(t > 0) ? null : tt(function(e) {
    e.setUTCFullYear(Math.floor(e.getUTCFullYear() / t) * t), e.setUTCMonth(0, 1), e.setUTCHours(0, 0, 0, 0);
  }, function(e, n) {
    e.setUTCFullYear(e.getUTCFullYear() + n * t);
  });
};
const It = xe;
xe.range;
function Dr(t, e, n, r, i, a) {
  const s = [
    [Et, 1, ft],
    [Et, 5, 5 * ft],
    [Et, 15, 15 * ft],
    [Et, 30, 30 * ft],
    [a, 1, st],
    [a, 5, 5 * st],
    [a, 15, 15 * st],
    [a, 30, 30 * st],
    [i, 1, mt],
    [i, 3, 3 * mt],
    [i, 6, 6 * mt],
    [i, 12, 12 * mt],
    [r, 1, gt],
    [r, 2, 2 * gt],
    [n, 1, Te],
    [e, 1, Ae],
    [e, 3, 3 * Ae],
    [t, 1, ue]
  ];
  function g(p, T, _) {
    const x = T < p;
    x && ([p, T] = [T, p]);
    const v = _ && typeof _.range == "function" ? _ : k(p, T, _), E = v ? v.range(p, +T + 1) : [];
    return x ? E.reverse() : E;
  }
  function k(p, T, _) {
    const x = Math.abs(T - p) / _, v = Xn(([, , N]) => N).right(s, x);
    if (v === s.length)
      return t.every(Ue(p / ue, T / ue, _));
    if (v === 0)
      return gr.every(Math.max(Ue(p, T, _), 1));
    const [E, M] = s[x / s[v - 1][2] < s[v][2] / x ? v - 1 : v];
    return E.every(M);
  }
  return [g, k];
}
const [Cr, Mr] = Dr(yt, Qt, Dt, wt, Gt, qt);
function le(t) {
  if (0 <= t.y && t.y < 100) {
    var e = new Date(-1, t.m, t.d, t.H, t.M, t.S, t.L);
    return e.setFullYear(t.y), e;
  }
  return new Date(t.y, t.m, t.d, t.H, t.M, t.S, t.L);
}
function fe(t) {
  if (0 <= t.y && t.y < 100) {
    var e = new Date(Date.UTC(-1, t.m, t.d, t.H, t.M, t.S, t.L));
    return e.setUTCFullYear(t.y), e;
  }
  return new Date(Date.UTC(t.y, t.m, t.d, t.H, t.M, t.S, t.L));
}
function Ft(t, e, n) {
  return { y: t, m: e, d: n, H: 0, M: 0, S: 0, L: 0 };
}
function Sr(t) {
  var e = t.dateTime, n = t.date, r = t.time, i = t.periods, a = t.days, s = t.shortDays, g = t.months, k = t.shortMonths, p = Ut(i), T = Lt(i), _ = Ut(a), x = Lt(a), v = Ut(s), E = Lt(s), M = Ut(g), N = Lt(g), V = Ut(k), Q = Lt(k), H = {
    a: J,
    A: $,
    b: dt,
    B: m,
    c: null,
    d: Ne,
    e: Ne,
    f: Qr,
    g: si,
    G: ci,
    H: qr,
    I: Gr,
    j: jr,
    L: mn,
    m: Jr,
    M: Kr,
    p: S,
    q: Y,
    Q: Ve,
    s: Re,
    S: $r,
    u: ti,
    U: ei,
    V: ni,
    w: ri,
    W: ii,
    x: null,
    X: null,
    y: ai,
    Y: oi,
    Z: ui,
    "%": Pe
  }, P = {
    a: F,
    A,
    b: B,
    B: z,
    c: null,
    d: He,
    e: He,
    f: di,
    g: wi,
    G: Ci,
    H: li,
    I: fi,
    j: hi,
    L: yn,
    m: mi,
    M: gi,
    p: Yt,
    q,
    Q: Ve,
    s: Re,
    S: yi,
    u: ki,
    U: vi,
    V: pi,
    w: Ti,
    W: bi,
    x: null,
    X: null,
    y: xi,
    Y: Di,
    Z: Mi,
    "%": Pe
  }, R = {
    a: h,
    A: d,
    b: c,
    B: D,
    c: o,
    d: Oe,
    e: Oe,
    f: Rr,
    g: We,
    G: Ie,
    H: ze,
    I: ze,
    j: Nr,
    L: Vr,
    m: zr,
    M: Hr,
    p: l,
    q: Or,
    Q: Zr,
    s: Xr,
    S: Pr,
    u: Lr,
    U: Ar,
    V: Er,
    w: Ur,
    W: Ir,
    x: I,
    X: f,
    y: We,
    Y: Ie,
    Z: Wr,
    "%": Br
  };
  H.x = w(n, H), H.X = w(r, H), H.c = w(e, H), P.x = w(n, P), P.X = w(r, P), P.c = w(e, P);
  function w(y, C) {
    return function(U) {
      var u = [], Z = -1, L = 0, K = y.length, G, it, rt;
      for (U instanceof Date || (U = /* @__PURE__ */ new Date(+U)); ++Z < K; )
        y.charCodeAt(Z) === 37 && (u.push(y.slice(L, Z)), (it = Ee[G = y.charAt(++Z)]) != null ? G = y.charAt(++Z) : it = G === "e" ? " " : "0", (rt = C[G]) && (G = rt(U, it)), u.push(G), L = Z + 1);
      return u.push(y.slice(L, Z)), u.join("");
    };
  }
  function O(y, C) {
    return function(U) {
      var u = Ft(1900, void 0, 1), Z = b(u, y, U += "", 0), L, K;
      if (Z != U.length)
        return null;
      if ("Q" in u)
        return new Date(u.Q);
      if ("s" in u)
        return new Date(u.s * 1e3 + ("L" in u ? u.L : 0));
      if (C && !("Z" in u) && (u.Z = 0), "p" in u && (u.H = u.H % 12 + u.p * 12), u.m === void 0 && (u.m = "q" in u ? u.q : 0), "V" in u) {
        if (u.V < 1 || u.V > 53)
          return null;
        "w" in u || (u.w = 1), "Z" in u ? (L = fe(Ft(u.y, 0, 1)), K = L.getUTCDay(), L = K > 4 || K === 0 ? Jt.ceil(L) : Jt(L), L = hn.offset(L, (u.V - 1) * 7), u.y = L.getUTCFullYear(), u.m = L.getUTCMonth(), u.d = L.getUTCDate() + (u.w + 6) % 7) : (L = le(Ft(u.y, 0, 1)), K = L.getDay(), L = K > 4 || K === 0 ? jt.ceil(L) : jt(L), L = wt.offset(L, (u.V - 1) * 7), u.y = L.getFullYear(), u.m = L.getMonth(), u.d = L.getDate() + (u.w + 6) % 7);
      } else
        ("W" in u || "U" in u) && ("w" in u || (u.w = "u" in u ? u.u % 7 : "W" in u ? 1 : 0), K = "Z" in u ? fe(Ft(u.y, 0, 1)).getUTCDay() : le(Ft(u.y, 0, 1)).getDay(), u.m = 0, u.d = "W" in u ? (u.w + 6) % 7 + u.W * 7 - (K + 5) % 7 : u.w + u.U * 7 - (K + 6) % 7);
      return "Z" in u ? (u.H += u.Z / 100 | 0, u.M += u.Z % 100, fe(u)) : le(u);
    };
  }
  function b(y, C, U, u) {
    for (var Z = 0, L = C.length, K = U.length, G, it; Z < L; ) {
      if (u >= K)
        return -1;
      if (G = C.charCodeAt(Z++), G === 37) {
        if (G = C.charAt(Z++), it = R[G in Ee ? C.charAt(Z++) : G], !it || (u = it(y, U, u)) < 0)
          return -1;
      } else if (G != U.charCodeAt(u++))
        return -1;
    }
    return u;
  }
  function l(y, C, U) {
    var u = p.exec(C.slice(U));
    return u ? (y.p = T.get(u[0].toLowerCase()), U + u[0].length) : -1;
  }
  function h(y, C, U) {
    var u = v.exec(C.slice(U));
    return u ? (y.w = E.get(u[0].toLowerCase()), U + u[0].length) : -1;
  }
  function d(y, C, U) {
    var u = _.exec(C.slice(U));
    return u ? (y.w = x.get(u[0].toLowerCase()), U + u[0].length) : -1;
  }
  function c(y, C, U) {
    var u = V.exec(C.slice(U));
    return u ? (y.m = Q.get(u[0].toLowerCase()), U + u[0].length) : -1;
  }
  function D(y, C, U) {
    var u = M.exec(C.slice(U));
    return u ? (y.m = N.get(u[0].toLowerCase()), U + u[0].length) : -1;
  }
  function o(y, C, U) {
    return b(y, e, C, U);
  }
  function I(y, C, U) {
    return b(y, n, C, U);
  }
  function f(y, C, U) {
    return b(y, r, C, U);
  }
  function J(y) {
    return s[y.getDay()];
  }
  function $(y) {
    return a[y.getDay()];
  }
  function dt(y) {
    return k[y.getMonth()];
  }
  function m(y) {
    return g[y.getMonth()];
  }
  function S(y) {
    return i[+(y.getHours() >= 12)];
  }
  function Y(y) {
    return 1 + ~~(y.getMonth() / 3);
  }
  function F(y) {
    return s[y.getUTCDay()];
  }
  function A(y) {
    return a[y.getUTCDay()];
  }
  function B(y) {
    return k[y.getUTCMonth()];
  }
  function z(y) {
    return g[y.getUTCMonth()];
  }
  function Yt(y) {
    return i[+(y.getUTCHours() >= 12)];
  }
  function q(y) {
    return 1 + ~~(y.getUTCMonth() / 3);
  }
  return {
    format: function(y) {
      var C = w(y += "", H);
      return C.toString = function() {
        return y;
      }, C;
    },
    parse: function(y) {
      var C = O(y += "", !1);
      return C.toString = function() {
        return y;
      }, C;
    },
    utcFormat: function(y) {
      var C = w(y += "", P);
      return C.toString = function() {
        return y;
      }, C;
    },
    utcParse: function(y) {
      var C = O(y += "", !0);
      return C.toString = function() {
        return y;
      }, C;
    }
  };
}
var Ee = { "-": "", _: " ", 0: "0" }, j = /^\s*\d+/, _r = /^%/, Yr = /[\\^$*+?|[\]().{}]/g;
function W(t, e, n) {
  var r = t < 0 ? "-" : "", i = (r ? -t : t) + "", a = i.length;
  return r + (a < n ? new Array(n - a + 1).join(e) + i : i);
}
function Fr(t) {
  return t.replace(Yr, "\\$&");
}
function Ut(t) {
  return new RegExp("^(?:" + t.map(Fr).join("|") + ")", "i");
}
function Lt(t) {
  return new Map(t.map((e, n) => [e.toLowerCase(), n]));
}
function Ur(t, e, n) {
  var r = j.exec(e.slice(n, n + 1));
  return r ? (t.w = +r[0], n + r[0].length) : -1;
}
function Lr(t, e, n) {
  var r = j.exec(e.slice(n, n + 1));
  return r ? (t.u = +r[0], n + r[0].length) : -1;
}
function Ar(t, e, n) {
  var r = j.exec(e.slice(n, n + 2));
  return r ? (t.U = +r[0], n + r[0].length) : -1;
}
function Er(t, e, n) {
  var r = j.exec(e.slice(n, n + 2));
  return r ? (t.V = +r[0], n + r[0].length) : -1;
}
function Ir(t, e, n) {
  var r = j.exec(e.slice(n, n + 2));
  return r ? (t.W = +r[0], n + r[0].length) : -1;
}
function Ie(t, e, n) {
  var r = j.exec(e.slice(n, n + 4));
  return r ? (t.y = +r[0], n + r[0].length) : -1;
}
function We(t, e, n) {
  var r = j.exec(e.slice(n, n + 2));
  return r ? (t.y = +r[0] + (+r[0] > 68 ? 1900 : 2e3), n + r[0].length) : -1;
}
function Wr(t, e, n) {
  var r = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(e.slice(n, n + 6));
  return r ? (t.Z = r[1] ? 0 : -(r[2] + (r[3] || "00")), n + r[0].length) : -1;
}
function Or(t, e, n) {
  var r = j.exec(e.slice(n, n + 1));
  return r ? (t.q = r[0] * 3 - 3, n + r[0].length) : -1;
}
function zr(t, e, n) {
  var r = j.exec(e.slice(n, n + 2));
  return r ? (t.m = r[0] - 1, n + r[0].length) : -1;
}
function Oe(t, e, n) {
  var r = j.exec(e.slice(n, n + 2));
  return r ? (t.d = +r[0], n + r[0].length) : -1;
}
function Nr(t, e, n) {
  var r = j.exec(e.slice(n, n + 3));
  return r ? (t.m = 0, t.d = +r[0], n + r[0].length) : -1;
}
function ze(t, e, n) {
  var r = j.exec(e.slice(n, n + 2));
  return r ? (t.H = +r[0], n + r[0].length) : -1;
}
function Hr(t, e, n) {
  var r = j.exec(e.slice(n, n + 2));
  return r ? (t.M = +r[0], n + r[0].length) : -1;
}
function Pr(t, e, n) {
  var r = j.exec(e.slice(n, n + 2));
  return r ? (t.S = +r[0], n + r[0].length) : -1;
}
function Vr(t, e, n) {
  var r = j.exec(e.slice(n, n + 3));
  return r ? (t.L = +r[0], n + r[0].length) : -1;
}
function Rr(t, e, n) {
  var r = j.exec(e.slice(n, n + 6));
  return r ? (t.L = Math.floor(r[0] / 1e3), n + r[0].length) : -1;
}
function Br(t, e, n) {
  var r = _r.exec(e.slice(n, n + 1));
  return r ? n + r[0].length : -1;
}
function Zr(t, e, n) {
  var r = j.exec(e.slice(n));
  return r ? (t.Q = +r[0], n + r[0].length) : -1;
}
function Xr(t, e, n) {
  var r = j.exec(e.slice(n));
  return r ? (t.s = +r[0], n + r[0].length) : -1;
}
function Ne(t, e) {
  return W(t.getDate(), e, 2);
}
function qr(t, e) {
  return W(t.getHours(), e, 2);
}
function Gr(t, e) {
  return W(t.getHours() % 12 || 12, e, 2);
}
function jr(t, e) {
  return W(1 + wt.count(yt(t), t), e, 3);
}
function mn(t, e) {
  return W(t.getMilliseconds(), e, 3);
}
function Qr(t, e) {
  return mn(t, e) + "000";
}
function Jr(t, e) {
  return W(t.getMonth() + 1, e, 2);
}
function Kr(t, e) {
  return W(t.getMinutes(), e, 2);
}
function $r(t, e) {
  return W(t.getSeconds(), e, 2);
}
function ti(t) {
  var e = t.getDay();
  return e === 0 ? 7 : e;
}
function ei(t, e) {
  return W(Dt.count(yt(t) - 1, t), e, 2);
}
function gn(t) {
  var e = t.getDay();
  return e >= 4 || e === 0 ? Ct(t) : Ct.ceil(t);
}
function ni(t, e) {
  return t = gn(t), W(Ct.count(yt(t), t) + (yt(t).getDay() === 4), e, 2);
}
function ri(t) {
  return t.getDay();
}
function ii(t, e) {
  return W(jt.count(yt(t) - 1, t), e, 2);
}
function ai(t, e) {
  return W(t.getFullYear() % 100, e, 2);
}
function si(t, e) {
  return t = gn(t), W(t.getFullYear() % 100, e, 2);
}
function oi(t, e) {
  return W(t.getFullYear() % 1e4, e, 4);
}
function ci(t, e) {
  var n = t.getDay();
  return t = n >= 4 || n === 0 ? Ct(t) : Ct.ceil(t), W(t.getFullYear() % 1e4, e, 4);
}
function ui(t) {
  var e = t.getTimezoneOffset();
  return (e > 0 ? "-" : (e *= -1, "+")) + W(e / 60 | 0, "0", 2) + W(e % 60, "0", 2);
}
function He(t, e) {
  return W(t.getUTCDate(), e, 2);
}
function li(t, e) {
  return W(t.getUTCHours(), e, 2);
}
function fi(t, e) {
  return W(t.getUTCHours() % 12 || 12, e, 2);
}
function hi(t, e) {
  return W(1 + hn.count(It(t), t), e, 3);
}
function yn(t, e) {
  return W(t.getUTCMilliseconds(), e, 3);
}
function di(t, e) {
  return yn(t, e) + "000";
}
function mi(t, e) {
  return W(t.getUTCMonth() + 1, e, 2);
}
function gi(t, e) {
  return W(t.getUTCMinutes(), e, 2);
}
function yi(t, e) {
  return W(t.getUTCSeconds(), e, 2);
}
function ki(t) {
  var e = t.getUTCDay();
  return e === 0 ? 7 : e;
}
function vi(t, e) {
  return W(dn.count(It(t) - 1, t), e, 2);
}
function kn(t) {
  var e = t.getUTCDay();
  return e >= 4 || e === 0 ? Mt(t) : Mt.ceil(t);
}
function pi(t, e) {
  return t = kn(t), W(Mt.count(It(t), t) + (It(t).getUTCDay() === 4), e, 2);
}
function Ti(t) {
  return t.getUTCDay();
}
function bi(t, e) {
  return W(Jt.count(It(t) - 1, t), e, 2);
}
function xi(t, e) {
  return W(t.getUTCFullYear() % 100, e, 2);
}
function wi(t, e) {
  return t = kn(t), W(t.getUTCFullYear() % 100, e, 2);
}
function Di(t, e) {
  return W(t.getUTCFullYear() % 1e4, e, 4);
}
function Ci(t, e) {
  var n = t.getUTCDay();
  return t = n >= 4 || n === 0 ? Mt(t) : Mt.ceil(t), W(t.getUTCFullYear() % 1e4, e, 4);
}
function Mi() {
  return "+0000";
}
function Pe() {
  return "%";
}
function Ve(t) {
  return +t;
}
function Re(t) {
  return Math.floor(+t / 1e3);
}
var pt, Kt;
Si({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
});
function Si(t) {
  return pt = Sr(t), Kt = pt.format, pt.parse, pt.utcFormat, pt.utcParse, pt;
}
function _i(t) {
  return new Date(t);
}
function Yi(t) {
  return t instanceof Date ? +t : +/* @__PURE__ */ new Date(+t);
}
function vn(t, e, n, r, i, a, s, g, k, p) {
  var T = qn(), _ = T.invert, x = T.domain, v = p(".%L"), E = p(":%S"), M = p("%I:%M"), N = p("%I %p"), V = p("%a %d"), Q = p("%b %d"), H = p("%B"), P = p("%Y");
  function R(w) {
    return (k(w) < w ? v : g(w) < w ? E : s(w) < w ? M : a(w) < w ? N : r(w) < w ? i(w) < w ? V : Q : n(w) < w ? H : P)(w);
  }
  return T.invert = function(w) {
    return new Date(_(w));
  }, T.domain = function(w) {
    return arguments.length ? x(Array.from(w, Yi)) : x().map(_i);
  }, T.ticks = function(w) {
    var O = x();
    return t(O[0], O[O.length - 1], w ?? 10);
  }, T.tickFormat = function(w, O) {
    return O == null ? R : p(O);
  }, T.nice = function(w) {
    var O = x();
    return (!w || typeof w.range != "function") && (w = e(O[0], O[O.length - 1], w ?? 10)), w ? x(mr(O, w)) : T;
  }, T.copy = function() {
    return Gn(T, vn(t, e, n, r, i, a, s, g, k, p));
  }, T;
}
function Fi() {
  return Qn.apply(vn(Cr, Mr, yt, Qt, Dt, wt, Gt, qt, Et, Kt).domain([new Date(2e3, 0, 1), new Date(2e3, 0, 2)]), arguments);
}
var ye = function() {
  var t = function(b, l, h, d) {
    for (h = h || {}, d = b.length; d--; h[b[d]] = l)
      ;
    return h;
  }, e = [1, 3], n = [1, 5], r = [7, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 23, 25, 26, 28, 35, 40], i = [1, 15], a = [1, 16], s = [1, 17], g = [1, 18], k = [1, 19], p = [1, 20], T = [1, 21], _ = [1, 22], x = [1, 23], v = [1, 24], E = [1, 25], M = [1, 26], N = [1, 27], V = [1, 29], Q = [1, 31], H = [1, 34], P = [5, 7, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 23, 25, 26, 28, 35, 40], R = {
    trace: function() {
    },
    yy: {},
    symbols_: { error: 2, start: 3, directive: 4, gantt: 5, document: 6, EOF: 7, line: 8, SPACE: 9, statement: 10, NL: 11, dateFormat: 12, inclusiveEndDates: 13, topAxis: 14, axisFormat: 15, tickInterval: 16, excludes: 17, includes: 18, todayMarker: 19, title: 20, acc_title: 21, acc_title_value: 22, acc_descr: 23, acc_descr_value: 24, acc_descr_multiline_value: 25, section: 26, clickStatement: 27, taskTxt: 28, taskData: 29, openDirective: 30, typeDirective: 31, closeDirective: 32, ":": 33, argDirective: 34, click: 35, callbackname: 36, callbackargs: 37, href: 38, clickStatementDebug: 39, open_directive: 40, type_directive: 41, arg_directive: 42, close_directive: 43, $accept: 0, $end: 1 },
    terminals_: { 2: "error", 5: "gantt", 7: "EOF", 9: "SPACE", 11: "NL", 12: "dateFormat", 13: "inclusiveEndDates", 14: "topAxis", 15: "axisFormat", 16: "tickInterval", 17: "excludes", 18: "includes", 19: "todayMarker", 20: "title", 21: "acc_title", 22: "acc_title_value", 23: "acc_descr", 24: "acc_descr_value", 25: "acc_descr_multiline_value", 26: "section", 28: "taskTxt", 29: "taskData", 33: ":", 35: "click", 36: "callbackname", 37: "callbackargs", 38: "href", 40: "open_directive", 41: "type_directive", 42: "arg_directive", 43: "close_directive" },
    productions_: [0, [3, 2], [3, 3], [6, 0], [6, 2], [8, 2], [8, 1], [8, 1], [8, 1], [10, 1], [10, 1], [10, 1], [10, 1], [10, 1], [10, 1], [10, 1], [10, 1], [10, 1], [10, 2], [10, 2], [10, 1], [10, 1], [10, 1], [10, 2], [10, 1], [4, 4], [4, 6], [27, 2], [27, 3], [27, 3], [27, 4], [27, 3], [27, 4], [27, 2], [39, 2], [39, 3], [39, 3], [39, 4], [39, 3], [39, 4], [39, 2], [30, 1], [31, 1], [34, 1], [32, 1]],
    performAction: function(l, h, d, c, D, o, I) {
      var f = o.length - 1;
      switch (D) {
        case 2:
          return o[f - 1];
        case 3:
          this.$ = [];
          break;
        case 4:
          o[f - 1].push(o[f]), this.$ = o[f - 1];
          break;
        case 5:
        case 6:
          this.$ = o[f];
          break;
        case 7:
        case 8:
          this.$ = [];
          break;
        case 9:
          c.setDateFormat(o[f].substr(11)), this.$ = o[f].substr(11);
          break;
        case 10:
          c.enableInclusiveEndDates(), this.$ = o[f].substr(18);
          break;
        case 11:
          c.TopAxis(), this.$ = o[f].substr(8);
          break;
        case 12:
          c.setAxisFormat(o[f].substr(11)), this.$ = o[f].substr(11);
          break;
        case 13:
          c.setTickInterval(o[f].substr(13)), this.$ = o[f].substr(13);
          break;
        case 14:
          c.setExcludes(o[f].substr(9)), this.$ = o[f].substr(9);
          break;
        case 15:
          c.setIncludes(o[f].substr(9)), this.$ = o[f].substr(9);
          break;
        case 16:
          c.setTodayMarker(o[f].substr(12)), this.$ = o[f].substr(12);
          break;
        case 17:
          c.setDiagramTitle(o[f].substr(6)), this.$ = o[f].substr(6);
          break;
        case 18:
          this.$ = o[f].trim(), c.setAccTitle(this.$);
          break;
        case 19:
        case 20:
          this.$ = o[f].trim(), c.setAccDescription(this.$);
          break;
        case 21:
          c.addSection(o[f].substr(8)), this.$ = o[f].substr(8);
          break;
        case 23:
          c.addTask(o[f - 1], o[f]), this.$ = "task";
          break;
        case 27:
          this.$ = o[f - 1], c.setClickEvent(o[f - 1], o[f], null);
          break;
        case 28:
          this.$ = o[f - 2], c.setClickEvent(o[f - 2], o[f - 1], o[f]);
          break;
        case 29:
          this.$ = o[f - 2], c.setClickEvent(o[f - 2], o[f - 1], null), c.setLink(o[f - 2], o[f]);
          break;
        case 30:
          this.$ = o[f - 3], c.setClickEvent(o[f - 3], o[f - 2], o[f - 1]), c.setLink(o[f - 3], o[f]);
          break;
        case 31:
          this.$ = o[f - 2], c.setClickEvent(o[f - 2], o[f], null), c.setLink(o[f - 2], o[f - 1]);
          break;
        case 32:
          this.$ = o[f - 3], c.setClickEvent(o[f - 3], o[f - 1], o[f]), c.setLink(o[f - 3], o[f - 2]);
          break;
        case 33:
          this.$ = o[f - 1], c.setLink(o[f - 1], o[f]);
          break;
        case 34:
        case 40:
          this.$ = o[f - 1] + " " + o[f];
          break;
        case 35:
        case 36:
        case 38:
          this.$ = o[f - 2] + " " + o[f - 1] + " " + o[f];
          break;
        case 37:
        case 39:
          this.$ = o[f - 3] + " " + o[f - 2] + " " + o[f - 1] + " " + o[f];
          break;
        case 41:
          c.parseDirective("%%{", "open_directive");
          break;
        case 42:
          c.parseDirective(o[f], "type_directive");
          break;
        case 43:
          o[f] = o[f].trim().replace(/'/g, '"'), c.parseDirective(o[f], "arg_directive");
          break;
        case 44:
          c.parseDirective("}%%", "close_directive", "gantt");
          break;
      }
    },
    table: [{ 3: 1, 4: 2, 5: e, 30: 4, 40: n }, { 1: [3] }, { 3: 6, 4: 2, 5: e, 30: 4, 40: n }, t(r, [2, 3], { 6: 7 }), { 31: 8, 41: [1, 9] }, { 41: [2, 41] }, { 1: [2, 1] }, { 4: 30, 7: [1, 10], 8: 11, 9: [1, 12], 10: 13, 11: [1, 14], 12: i, 13: a, 14: s, 15: g, 16: k, 17: p, 18: T, 19: _, 20: x, 21: v, 23: E, 25: M, 26: N, 27: 28, 28: V, 30: 4, 35: Q, 40: n }, { 32: 32, 33: [1, 33], 43: H }, t([33, 43], [2, 42]), t(r, [2, 8], { 1: [2, 2] }), t(r, [2, 4]), { 4: 30, 10: 35, 12: i, 13: a, 14: s, 15: g, 16: k, 17: p, 18: T, 19: _, 20: x, 21: v, 23: E, 25: M, 26: N, 27: 28, 28: V, 30: 4, 35: Q, 40: n }, t(r, [2, 6]), t(r, [2, 7]), t(r, [2, 9]), t(r, [2, 10]), t(r, [2, 11]), t(r, [2, 12]), t(r, [2, 13]), t(r, [2, 14]), t(r, [2, 15]), t(r, [2, 16]), t(r, [2, 17]), { 22: [1, 36] }, { 24: [1, 37] }, t(r, [2, 20]), t(r, [2, 21]), t(r, [2, 22]), { 29: [1, 38] }, t(r, [2, 24]), { 36: [1, 39], 38: [1, 40] }, { 11: [1, 41] }, { 34: 42, 42: [1, 43] }, { 11: [2, 44] }, t(r, [2, 5]), t(r, [2, 18]), t(r, [2, 19]), t(r, [2, 23]), t(r, [2, 27], { 37: [1, 44], 38: [1, 45] }), t(r, [2, 33], { 36: [1, 46] }), t(P, [2, 25]), { 32: 47, 43: H }, { 43: [2, 43] }, t(r, [2, 28], { 38: [1, 48] }), t(r, [2, 29]), t(r, [2, 31], { 37: [1, 49] }), { 11: [1, 50] }, t(r, [2, 30]), t(r, [2, 32]), t(P, [2, 26])],
    defaultActions: { 5: [2, 41], 6: [2, 1], 34: [2, 44], 43: [2, 43] },
    parseError: function(l, h) {
      if (h.recoverable)
        this.trace(l);
      else {
        var d = new Error(l);
        throw d.hash = h, d;
      }
    },
    parse: function(l) {
      var h = this, d = [0], c = [], D = [null], o = [], I = this.table, f = "", J = 0, $ = 0, dt = 2, m = 1, S = o.slice.call(arguments, 1), Y = Object.create(this.lexer), F = { yy: {} };
      for (var A in this.yy)
        Object.prototype.hasOwnProperty.call(this.yy, A) && (F.yy[A] = this.yy[A]);
      Y.setInput(l, F.yy), F.yy.lexer = Y, F.yy.parser = this, typeof Y.yylloc > "u" && (Y.yylloc = {});
      var B = Y.yylloc;
      o.push(B);
      var z = Y.options && Y.options.ranges;
      typeof F.yy.parseError == "function" ? this.parseError = F.yy.parseError : this.parseError = Object.getPrototypeOf(this).parseError;
      function Yt() {
        var rt;
        return rt = c.pop() || Y.lex() || m, typeof rt != "number" && (rt instanceof Array && (c = rt, rt = c.pop()), rt = h.symbols_[rt] || rt), rt;
      }
      for (var q, y, C, U, u = {}, Z, L, K, G; ; ) {
        if (y = d[d.length - 1], this.defaultActions[y] ? C = this.defaultActions[y] : ((q === null || typeof q > "u") && (q = Yt()), C = I[y] && I[y][q]), typeof C > "u" || !C.length || !C[0]) {
          var it = "";
          G = [];
          for (Z in I[y])
            this.terminals_[Z] && Z > dt && G.push("'" + this.terminals_[Z] + "'");
          Y.showPosition ? it = "Parse error on line " + (J + 1) + `:
` + Y.showPosition() + `
Expecting ` + G.join(", ") + ", got '" + (this.terminals_[q] || q) + "'" : it = "Parse error on line " + (J + 1) + ": Unexpected " + (q == m ? "end of input" : "'" + (this.terminals_[q] || q) + "'"), this.parseError(it, {
            text: Y.match,
            token: this.terminals_[q] || q,
            line: Y.yylineno,
            loc: B,
            expected: G
          });
        }
        if (C[0] instanceof Array && C.length > 1)
          throw new Error("Parse Error: multiple actions possible at state: " + y + ", token: " + q);
        switch (C[0]) {
          case 1:
            d.push(q), D.push(Y.yytext), o.push(Y.yylloc), d.push(C[1]), q = null, $ = Y.yyleng, f = Y.yytext, J = Y.yylineno, B = Y.yylloc;
            break;
          case 2:
            if (L = this.productions_[C[1]][1], u.$ = D[D.length - L], u._$ = {
              first_line: o[o.length - (L || 1)].first_line,
              last_line: o[o.length - 1].last_line,
              first_column: o[o.length - (L || 1)].first_column,
              last_column: o[o.length - 1].last_column
            }, z && (u._$.range = [
              o[o.length - (L || 1)].range[0],
              o[o.length - 1].range[1]
            ]), U = this.performAction.apply(u, [
              f,
              $,
              J,
              F.yy,
              C[1],
              D,
              o
            ].concat(S)), typeof U < "u")
              return U;
            L && (d = d.slice(0, -1 * L * 2), D = D.slice(0, -1 * L), o = o.slice(0, -1 * L)), d.push(this.productions_[C[1]][0]), D.push(u.$), o.push(u._$), K = I[d[d.length - 2]][d[d.length - 1]], d.push(K);
            break;
          case 3:
            return !0;
        }
      }
      return !0;
    }
  }, w = function() {
    var b = {
      EOF: 1,
      parseError: function(h, d) {
        if (this.yy.parser)
          this.yy.parser.parseError(h, d);
        else
          throw new Error(h);
      },
      // resets the lexer, sets new input
      setInput: function(l, h) {
        return this.yy = h || this.yy || {}, this._input = l, this._more = this._backtrack = this.done = !1, this.yylineno = this.yyleng = 0, this.yytext = this.matched = this.match = "", this.conditionStack = ["INITIAL"], this.yylloc = {
          first_line: 1,
          first_column: 0,
          last_line: 1,
          last_column: 0
        }, this.options.ranges && (this.yylloc.range = [0, 0]), this.offset = 0, this;
      },
      // consumes and returns one char from the input
      input: function() {
        var l = this._input[0];
        this.yytext += l, this.yyleng++, this.offset++, this.match += l, this.matched += l;
        var h = l.match(/(?:\r\n?|\n).*/g);
        return h ? (this.yylineno++, this.yylloc.last_line++) : this.yylloc.last_column++, this.options.ranges && this.yylloc.range[1]++, this._input = this._input.slice(1), l;
      },
      // unshifts one char (or a string) into the input
      unput: function(l) {
        var h = l.length, d = l.split(/(?:\r\n?|\n)/g);
        this._input = l + this._input, this.yytext = this.yytext.substr(0, this.yytext.length - h), this.offset -= h;
        var c = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1), this.matched = this.matched.substr(0, this.matched.length - 1), d.length - 1 && (this.yylineno -= d.length - 1);
        var D = this.yylloc.range;
        return this.yylloc = {
          first_line: this.yylloc.first_line,
          last_line: this.yylineno + 1,
          first_column: this.yylloc.first_column,
          last_column: d ? (d.length === c.length ? this.yylloc.first_column : 0) + c[c.length - d.length].length - d[0].length : this.yylloc.first_column - h
        }, this.options.ranges && (this.yylloc.range = [D[0], D[0] + this.yyleng - h]), this.yyleng = this.yytext.length, this;
      },
      // When called from action, caches matched text and appends it on next action
      more: function() {
        return this._more = !0, this;
      },
      // When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
      reject: function() {
        if (this.options.backtrack_lexer)
          this._backtrack = !0;
        else
          return this.parseError("Lexical error on line " + (this.yylineno + 1) + `. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
` + this.showPosition(), {
            text: "",
            token: null,
            line: this.yylineno
          });
        return this;
      },
      // retain first n characters of the match
      less: function(l) {
        this.unput(this.match.slice(l));
      },
      // displays already matched input, i.e. for error messages
      pastInput: function() {
        var l = this.matched.substr(0, this.matched.length - this.match.length);
        return (l.length > 20 ? "..." : "") + l.substr(-20).replace(/\n/g, "");
      },
      // displays upcoming input, i.e. for error messages
      upcomingInput: function() {
        var l = this.match;
        return l.length < 20 && (l += this._input.substr(0, 20 - l.length)), (l.substr(0, 20) + (l.length > 20 ? "..." : "")).replace(/\n/g, "");
      },
      // displays the character position where the lexing error occurred, i.e. for error messages
      showPosition: function() {
        var l = this.pastInput(), h = new Array(l.length + 1).join("-");
        return l + this.upcomingInput() + `
` + h + "^";
      },
      // test the lexed token: return FALSE when not a match, otherwise return token
      test_match: function(l, h) {
        var d, c, D;
        if (this.options.backtrack_lexer && (D = {
          yylineno: this.yylineno,
          yylloc: {
            first_line: this.yylloc.first_line,
            last_line: this.last_line,
            first_column: this.yylloc.first_column,
            last_column: this.yylloc.last_column
          },
          yytext: this.yytext,
          match: this.match,
          matches: this.matches,
          matched: this.matched,
          yyleng: this.yyleng,
          offset: this.offset,
          _more: this._more,
          _input: this._input,
          yy: this.yy,
          conditionStack: this.conditionStack.slice(0),
          done: this.done
        }, this.options.ranges && (D.yylloc.range = this.yylloc.range.slice(0))), c = l[0].match(/(?:\r\n?|\n).*/g), c && (this.yylineno += c.length), this.yylloc = {
          first_line: this.yylloc.last_line,
          last_line: this.yylineno + 1,
          first_column: this.yylloc.last_column,
          last_column: c ? c[c.length - 1].length - c[c.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + l[0].length
        }, this.yytext += l[0], this.match += l[0], this.matches = l, this.yyleng = this.yytext.length, this.options.ranges && (this.yylloc.range = [this.offset, this.offset += this.yyleng]), this._more = !1, this._backtrack = !1, this._input = this._input.slice(l[0].length), this.matched += l[0], d = this.performAction.call(this, this.yy, this, h, this.conditionStack[this.conditionStack.length - 1]), this.done && this._input && (this.done = !1), d)
          return d;
        if (this._backtrack) {
          for (var o in D)
            this[o] = D[o];
          return !1;
        }
        return !1;
      },
      // return next match in input
      next: function() {
        if (this.done)
          return this.EOF;
        this._input || (this.done = !0);
        var l, h, d, c;
        this._more || (this.yytext = "", this.match = "");
        for (var D = this._currentRules(), o = 0; o < D.length; o++)
          if (d = this._input.match(this.rules[D[o]]), d && (!h || d[0].length > h[0].length)) {
            if (h = d, c = o, this.options.backtrack_lexer) {
              if (l = this.test_match(d, D[o]), l !== !1)
                return l;
              if (this._backtrack) {
                h = !1;
                continue;
              } else
                return !1;
            } else if (!this.options.flex)
              break;
          }
        return h ? (l = this.test_match(h, D[c]), l !== !1 ? l : !1) : this._input === "" ? this.EOF : this.parseError("Lexical error on line " + (this.yylineno + 1) + `. Unrecognized text.
` + this.showPosition(), {
          text: "",
          token: null,
          line: this.yylineno
        });
      },
      // return next match that has a token
      lex: function() {
        var h = this.next();
        return h || this.lex();
      },
      // activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
      begin: function(h) {
        this.conditionStack.push(h);
      },
      // pop the previously active lexer condition state off the condition stack
      popState: function() {
        var h = this.conditionStack.length - 1;
        return h > 0 ? this.conditionStack.pop() : this.conditionStack[0];
      },
      // produce the lexer rule set which is active for the currently active lexer condition state
      _currentRules: function() {
        return this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1] ? this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules : this.conditions.INITIAL.rules;
      },
      // return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
      topState: function(h) {
        return h = this.conditionStack.length - 1 - Math.abs(h || 0), h >= 0 ? this.conditionStack[h] : "INITIAL";
      },
      // alias for begin(condition)
      pushState: function(h) {
        this.begin(h);
      },
      // return the number of states currently on the stack
      stateStackSize: function() {
        return this.conditionStack.length;
      },
      options: { "case-insensitive": !0 },
      performAction: function(h, d, c, D) {
        switch (c) {
          case 0:
            return this.begin("open_directive"), 40;
          case 1:
            return this.begin("type_directive"), 41;
          case 2:
            return this.popState(), this.begin("arg_directive"), 33;
          case 3:
            return this.popState(), this.popState(), 43;
          case 4:
            return 42;
          case 5:
            return this.begin("acc_title"), 21;
          case 6:
            return this.popState(), "acc_title_value";
          case 7:
            return this.begin("acc_descr"), 23;
          case 8:
            return this.popState(), "acc_descr_value";
          case 9:
            this.begin("acc_descr_multiline");
            break;
          case 10:
            this.popState();
            break;
          case 11:
            return "acc_descr_multiline_value";
          case 12:
            break;
          case 13:
            break;
          case 14:
            break;
          case 15:
            return 11;
          case 16:
            break;
          case 17:
            break;
          case 18:
            break;
          case 19:
            this.begin("href");
            break;
          case 20:
            this.popState();
            break;
          case 21:
            return 38;
          case 22:
            this.begin("callbackname");
            break;
          case 23:
            this.popState();
            break;
          case 24:
            this.popState(), this.begin("callbackargs");
            break;
          case 25:
            return 36;
          case 26:
            this.popState();
            break;
          case 27:
            return 37;
          case 28:
            this.begin("click");
            break;
          case 29:
            this.popState();
            break;
          case 30:
            return 35;
          case 31:
            return 5;
          case 32:
            return 12;
          case 33:
            return 13;
          case 34:
            return 14;
          case 35:
            return 15;
          case 36:
            return 16;
          case 37:
            return 18;
          case 38:
            return 17;
          case 39:
            return 19;
          case 40:
            return "date";
          case 41:
            return 20;
          case 42:
            return "accDescription";
          case 43:
            return 26;
          case 44:
            return 28;
          case 45:
            return 29;
          case 46:
            return 33;
          case 47:
            return 7;
          case 48:
            return "INVALID";
        }
      },
      rules: [/^(?:%%\{)/i, /^(?:((?:(?!\}%%)[^:.])*))/i, /^(?::)/i, /^(?:\}%%)/i, /^(?:((?:(?!\}%%).|\n)*))/i, /^(?:accTitle\s*:\s*)/i, /^(?:(?!\n||)*[^\n]*)/i, /^(?:accDescr\s*:\s*)/i, /^(?:(?!\n||)*[^\n]*)/i, /^(?:accDescr\s*\{\s*)/i, /^(?:[\}])/i, /^(?:[^\}]*)/i, /^(?:%%(?!\{)*[^\n]*)/i, /^(?:[^\}]%%*[^\n]*)/i, /^(?:%%*[^\n]*[\n]*)/i, /^(?:[\n]+)/i, /^(?:\s+)/i, /^(?:#[^\n]*)/i, /^(?:%[^\n]*)/i, /^(?:href[\s]+["])/i, /^(?:["])/i, /^(?:[^"]*)/i, /^(?:call[\s]+)/i, /^(?:\([\s]*\))/i, /^(?:\()/i, /^(?:[^(]*)/i, /^(?:\))/i, /^(?:[^)]*)/i, /^(?:click[\s]+)/i, /^(?:[\s\n])/i, /^(?:[^\s\n]*)/i, /^(?:gantt\b)/i, /^(?:dateFormat\s[^#\n;]+)/i, /^(?:inclusiveEndDates\b)/i, /^(?:topAxis\b)/i, /^(?:axisFormat\s[^#\n;]+)/i, /^(?:tickInterval\s[^#\n;]+)/i, /^(?:includes\s[^#\n;]+)/i, /^(?:excludes\s[^#\n;]+)/i, /^(?:todayMarker\s[^\n;]+)/i, /^(?:\d\d\d\d-\d\d-\d\d\b)/i, /^(?:title\s[^#\n;]+)/i, /^(?:accDescription\s[^#\n;]+)/i, /^(?:section\s[^#:\n;]+)/i, /^(?:[^#:\n;]+)/i, /^(?::[^#\n;]+)/i, /^(?::)/i, /^(?:$)/i, /^(?:.)/i],
      conditions: { acc_descr_multiline: { rules: [10, 11], inclusive: !1 }, acc_descr: { rules: [8], inclusive: !1 }, acc_title: { rules: [6], inclusive: !1 }, close_directive: { rules: [], inclusive: !1 }, arg_directive: { rules: [3, 4], inclusive: !1 }, type_directive: { rules: [2, 3], inclusive: !1 }, open_directive: { rules: [1], inclusive: !1 }, callbackargs: { rules: [26, 27], inclusive: !1 }, callbackname: { rules: [23, 24, 25], inclusive: !1 }, href: { rules: [20, 21], inclusive: !1 }, click: { rules: [29, 30], inclusive: !1 }, INITIAL: { rules: [0, 5, 7, 9, 12, 13, 14, 15, 16, 17, 18, 19, 22, 28, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48], inclusive: !0 } }
    };
    return b;
  }();
  R.lexer = w;
  function O() {
    this.yy = {};
  }
  return O.prototype = R, R.Parser = O, new O();
}();
ye.parser = ye;
const Ui = ye;
var Li = "isoweek";
const Ai = function(t, e, n) {
  var r = function(k, p) {
    var T = (p ? n.utc : n)().year(k).startOf(Ln), _ = 4 - T.isoWeekday();
    return T.isoWeekday() > 4 && (_ += 7), T.add(_, ee);
  }, i = function(k) {
    return k.add(4 - k.isoWeekday(), ee);
  }, a = e.prototype;
  a.isoWeekYear = function() {
    var g = i(this);
    return g.year();
  }, a.isoWeek = function(g) {
    if (!this.$utils().u(g))
      return this.add((g - this.isoWeek()) * 7, ee);
    var k = i(this), p = r(this.isoWeekYear(), this.$u);
    return k.diff(p, Un) + 1;
  }, a.isoWeekday = function(g) {
    return this.$utils().u(g) ? this.day() || 7 : this.day(this.day() % 7 ? g : g - 7);
  };
  var s = a.startOf;
  a.startOf = function(g, k) {
    var p = this.$utils(), T = p.u(k) ? !0 : k, _ = p.p(g);
    return _ === Li ? T ? this.date(this.date() - (this.isoWeekday() - 1)).startOf("day") : this.date(this.date() - 1 - (this.isoWeekday() - 1) + 7).endOf("day") : s.bind(this)(g, k);
  };
};
var Ei = function(e) {
  return e.replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, function(n, r, i) {
    return r || i.slice(1);
  });
}, Ii = {
  LTS: "h:mm:ss A",
  LT: "h:mm A",
  L: "MM/DD/YYYY",
  LL: "MMMM D, YYYY",
  LLL: "MMMM D, YYYY h:mm A",
  LLLL: "dddd, MMMM D, YYYY h:mm A"
}, Wi = function(e, n) {
  return e.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, function(r, i, a) {
    var s = a && a.toUpperCase();
    return i || n[a] || Ii[a] || Ei(n[s]);
  });
}, Oi = /(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|YYYY|YY?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g, zi = /\d/, Pt = /\d\d/, Ni = /\d{3}/, Hi = /\d{4}/, at = /\d\d?/, Pi = /[+-]?\d+/, Vi = /[+-]\d\d:?(\d\d)?|Z/, At = /\d*[^-_:/,()\s\d]+/, ht = {}, pn = function(e) {
  return e = +e, e + (e > 68 ? 1900 : 2e3);
};
function Ri(t) {
  if (!t || t === "Z")
    return 0;
  var e = t.match(/([+-]|\d\d)/g), n = +(e[1] * 60) + (+e[2] || 0);
  return n === 0 ? 0 : e[0] === "+" ? -n : n;
}
var et = function(e) {
  return function(n) {
    this[e] = +n;
  };
}, Be = [Vi, function(t) {
  var e = this.zone || (this.zone = {});
  e.offset = Ri(t);
}], he = function(e) {
  var n = ht[e];
  return n && (n.indexOf ? n : n.s.concat(n.f));
}, Ze = function(e, n) {
  var r, i = ht, a = i.meridiem;
  if (!a)
    r = e === (n ? "pm" : "PM");
  else
    for (var s = 1; s <= 24; s += 1)
      if (e.indexOf(a(s, 0, n)) > -1) {
        r = s > 12;
        break;
      }
  return r;
}, Bi = {
  A: [At, function(t) {
    this.afternoon = Ze(t, !1);
  }],
  a: [At, function(t) {
    this.afternoon = Ze(t, !0);
  }],
  S: [zi, function(t) {
    this.milliseconds = +t * 100;
  }],
  SS: [Pt, function(t) {
    this.milliseconds = +t * 10;
  }],
  SSS: [Ni, function(t) {
    this.milliseconds = +t;
  }],
  s: [at, et("seconds")],
  ss: [at, et("seconds")],
  m: [at, et("minutes")],
  mm: [at, et("minutes")],
  H: [at, et("hours")],
  h: [at, et("hours")],
  HH: [at, et("hours")],
  hh: [at, et("hours")],
  D: [at, et("day")],
  DD: [Pt, et("day")],
  Do: [At, function(t) {
    var e = ht, n = e.ordinal, r = t.match(/\d+/);
    if (this.day = r[0], !!n)
      for (var i = 1; i <= 31; i += 1)
        n(i).replace(/\[|\]/g, "") === t && (this.day = i);
  }],
  M: [at, et("month")],
  MM: [Pt, et("month")],
  MMM: [At, function(t) {
    var e = he("months"), n = he("monthsShort"), r = (n || e.map(function(i) {
      return i.slice(0, 3);
    })).indexOf(t) + 1;
    if (r < 1)
      throw new Error();
    this.month = r % 12 || r;
  }],
  MMMM: [At, function(t) {
    var e = he("months"), n = e.indexOf(t) + 1;
    if (n < 1)
      throw new Error();
    this.month = n % 12 || n;
  }],
  Y: [Pi, et("year")],
  YY: [Pt, function(t) {
    this.year = pn(t);
  }],
  YYYY: [Hi, et("year")],
  Z: Be,
  ZZ: Be
};
function Zi(t) {
  var e = t.afternoon;
  if (e !== void 0) {
    var n = t.hours;
    e ? n < 12 && (t.hours += 12) : n === 12 && (t.hours = 0), delete t.afternoon;
  }
}
function Xi(t) {
  t = Wi(t, ht && ht.formats);
  for (var e = t.match(Oi), n = e.length, r = 0; r < n; r += 1) {
    var i = e[r], a = Bi[i], s = a && a[0], g = a && a[1];
    g ? e[r] = {
      regex: s,
      parser: g
    } : e[r] = i.replace(/^\[|\]$/g, "");
  }
  return function(k) {
    for (var p = {}, T = 0, _ = 0; T < n; T += 1) {
      var x = e[T];
      if (typeof x == "string")
        _ += x.length;
      else {
        var v = x.regex, E = x.parser, M = k.slice(_), N = v.exec(M), V = N[0];
        E.call(p, V), k = k.replace(V, "");
      }
    }
    return Zi(p), p;
  };
}
var qi = function(e, n, r) {
  try {
    if (["x", "X"].indexOf(n) > -1)
      return new Date((n === "X" ? 1e3 : 1) * e);
    var i = Xi(n), a = i(e), s = a.year, g = a.month, k = a.day, p = a.hours, T = a.minutes, _ = a.seconds, x = a.milliseconds, v = a.zone, E = /* @__PURE__ */ new Date(), M = k || (!s && !g ? E.getDate() : 1), N = s || E.getFullYear(), V = 0;
    s && !g || (V = g > 0 ? g - 1 : E.getMonth());
    var Q = p || 0, H = T || 0, P = _ || 0, R = x || 0;
    return v ? new Date(Date.UTC(N, V, M, Q, H, P, R + v.offset * 60 * 1e3)) : r ? new Date(Date.UTC(N, V, M, Q, H, P, R)) : new Date(N, V, M, Q, H, P, R);
  } catch {
    return /* @__PURE__ */ new Date("");
  }
};
const Gi = function(t, e, n) {
  n.p.customParseFormat = !0, t && t.parseTwoDigitYear && (pn = t.parseTwoDigitYear);
  var r = e.prototype, i = r.parse;
  r.parse = function(a) {
    var s = a.date, g = a.utc, k = a.args;
    this.$u = g;
    var p = k[1];
    if (typeof p == "string") {
      var T = k[2] === !0, _ = k[3] === !0, x = T || _, v = k[2];
      _ && (v = k[2]), ht = this.$locale(), !T && v && (ht = n.Ls[v]), this.$d = qi(s, p, g), this.init(), v && v !== !0 && (this.$L = this.locale(v).$L), x && s != this.format(p) && (this.$d = /* @__PURE__ */ new Date("")), ht = {};
    } else if (p instanceof Array)
      for (var E = p.length, M = 1; M <= E; M += 1) {
        k[1] = p[M - 1];
        var N = n.apply(this, k);
        if (N.isValid()) {
          this.$d = N.$d, this.$L = N.$L, this.init();
          break;
        }
        M === E && (this.$d = /* @__PURE__ */ new Date(""));
      }
    else
      i.call(this, a);
  };
}, ji = function(t, e) {
  var n = e.prototype, r = n.format;
  n.format = function(i) {
    var a = this, s = this.$locale();
    if (!this.isValid())
      return r.bind(this)(i);
    var g = this.$utils(), k = i || An, p = k.replace(/\[([^\]]+)]|Q|wo|ww|w|WW|W|zzz|z|gggg|GGGG|Do|X|x|k{1,2}|S/g, function(T) {
      switch (T) {
        case "Q":
          return Math.ceil((a.$M + 1) / 3);
        case "Do":
          return s.ordinal(a.$D);
        case "gggg":
          return a.weekYear();
        case "GGGG":
          return a.isoWeekYear();
        case "wo":
          return s.ordinal(a.week(), "W");
        case "w":
        case "ww":
          return g.s(a.week(), T === "w" ? 1 : 2, "0");
        case "W":
        case "WW":
          return g.s(a.isoWeek(), T === "W" ? 1 : 2, "0");
        case "k":
        case "kk":
          return g.s(String(a.$H === 0 ? 24 : a.$H), T === "k" ? 1 : 2, "0");
        case "X":
          return Math.floor(a.$d.getTime() / 1e3);
        case "x":
          return a.$d.getTime();
        case "z":
          return "[" + a.offsetName() + "]";
        case "zzz":
          return "[" + a.offsetName("long") + "]";
        default:
          return T;
      }
    });
    return r.bind(this)(p);
  };
};
nt.extend(Ai);
nt.extend(Gi);
nt.extend(ji);
let ot = "", we = "", De, Ce = "", Wt = [], Ot = [], Me = {}, Se = [], $t = [], St = "", _e = "";
const Tn = ["active", "done", "crit", "milestone"];
let Ye = [], zt = !1, Fe = !1, ke = 0;
const Qi = function(t, e, n) {
  Hn.parseDirective(this, t, e, n);
}, Ji = function() {
  Se = [], $t = [], St = "", Ye = [], Rt = 0, pe = void 0, Bt = void 0, X = [], ot = "", we = "", _e = "", De = void 0, Ce = "", Wt = [], Ot = [], zt = !1, Fe = !1, ke = 0, Me = {}, Pn();
}, Ki = function(t) {
  we = t;
}, $i = function() {
  return we;
}, ta = function(t) {
  De = t;
}, ea = function() {
  return De;
}, na = function(t) {
  Ce = t;
}, ra = function() {
  return Ce;
}, ia = function(t) {
  ot = t;
}, aa = function() {
  zt = !0;
}, sa = function() {
  return zt;
}, oa = function() {
  Fe = !0;
}, ca = function() {
  return Fe;
}, ua = function(t) {
  _e = t;
}, la = function() {
  return _e;
}, fa = function() {
  return ot;
}, ha = function(t) {
  Wt = t.toLowerCase().split(/[\s,]+/);
}, da = function() {
  return Wt;
}, ma = function(t) {
  Ot = t.toLowerCase().split(/[\s,]+/);
}, ga = function() {
  return Ot;
}, ya = function() {
  return Me;
}, ka = function(t) {
  St = t, Se.push(t);
}, va = function() {
  return Se;
}, pa = function() {
  let t = Xe();
  const e = 10;
  let n = 0;
  for (; !t && n < e; )
    t = Xe(), n++;
  return $t = X, $t;
}, bn = function(t, e, n, r) {
  return r.includes(t.format(e.trim())) ? !1 : t.isoWeekday() >= 6 && n.includes("weekends") || n.includes(t.format("dddd").toLowerCase()) ? !0 : n.includes(t.format(e.trim()));
}, xn = function(t, e, n, r) {
  if (!n.length || t.manualEndTime)
    return;
  let i;
  t.startTime instanceof Date ? i = nt(t.startTime) : i = nt(t.startTime, e, !0), i = i.add(1, "d");
  let a;
  t.endTime instanceof Date ? a = nt(t.endTime) : a = nt(t.endTime, e, !0);
  const [s, g] = Ta(
    i,
    a,
    e,
    n,
    r
  );
  t.endTime = s.toDate(), t.renderEndTime = g;
}, Ta = function(t, e, n, r, i) {
  let a = !1, s = null;
  for (; t <= e; )
    a || (s = e.toDate()), a = bn(t, n, r, i), a && (e = e.add(1, "d")), t = t.add(1, "d");
  return [e, s];
}, ve = function(t, e, n) {
  n = n.trim();
  const i = /^after\s+([\d\w- ]+)/.exec(n.trim());
  if (i !== null) {
    let s = null;
    if (i[1].split(" ").forEach(function(g) {
      let k = _t(g);
      k !== void 0 && (s ? k.endTime > s.endTime && (s = k) : s = k);
    }), s)
      return s.endTime;
    {
      const g = /* @__PURE__ */ new Date();
      return g.setHours(0, 0, 0, 0), g;
    }
  }
  let a = nt(n, e.trim(), !0);
  if (a.isValid())
    return a.toDate();
  {
    de.debug("Invalid date:" + n), de.debug("With date format:" + e.trim());
    const s = new Date(n);
    if (s === void 0 || isNaN(s.getTime()) || // WebKit browsers can mis-parse invalid dates to be ridiculously
    // huge numbers, e.g. new Date('202304') gets parsed as January 1, 202304.
    // This can cause virtually infinite loops while rendering, so for the
    // purposes of Gantt charts we'll just treat any date beyond 10,000 AD/BC as
    // invalid.
    s.getFullYear() < -1e4 || s.getFullYear() > 1e4)
      throw new Error("Invalid date:" + n);
    return s;
  }
}, wn = function(t) {
  const e = /^(\d+(?:\.\d+)?)([Mdhmswy]|ms)$/.exec(t.trim());
  return e !== null ? [Number.parseFloat(e[1]), e[2]] : [NaN, "ms"];
}, Dn = function(t, e, n, r = !1) {
  n = n.trim();
  let i = nt(n, e.trim(), !0);
  if (i.isValid())
    return r && (i = i.add(1, "d")), i.toDate();
  let a = nt(t);
  const [s, g] = wn(n);
  if (!Number.isNaN(s)) {
    const k = a.add(s, g);
    k.isValid() && (a = k);
  }
  return a.toDate();
};
let Rt = 0;
const xt = function(t) {
  return t === void 0 ? (Rt = Rt + 1, "task" + Rt) : t;
}, ba = function(t, e) {
  let n;
  e.substr(0, 1) === ":" ? n = e.substr(1, e.length) : n = e;
  const r = n.split(","), i = {};
  _n(r, i, Tn);
  for (let s = 0; s < r.length; s++)
    r[s] = r[s].trim();
  let a = "";
  switch (r.length) {
    case 1:
      i.id = xt(), i.startTime = t.endTime, a = r[0];
      break;
    case 2:
      i.id = xt(), i.startTime = ve(void 0, ot, r[0]), a = r[1];
      break;
    case 3:
      i.id = xt(r[0]), i.startTime = ve(void 0, ot, r[1]), a = r[2];
      break;
  }
  return a && (i.endTime = Dn(i.startTime, ot, a, zt), i.manualEndTime = nt(a, "YYYY-MM-DD", !0).isValid(), xn(i, ot, Ot, Wt)), i;
}, xa = function(t, e) {
  let n;
  e.substr(0, 1) === ":" ? n = e.substr(1, e.length) : n = e;
  const r = n.split(","), i = {};
  _n(r, i, Tn);
  for (let a = 0; a < r.length; a++)
    r[a] = r[a].trim();
  switch (r.length) {
    case 1:
      i.id = xt(), i.startTime = {
        type: "prevTaskEnd",
        id: t
      }, i.endTime = {
        data: r[0]
      };
      break;
    case 2:
      i.id = xt(), i.startTime = {
        type: "getStartDate",
        startData: r[0]
      }, i.endTime = {
        data: r[1]
      };
      break;
    case 3:
      i.id = xt(r[0]), i.startTime = {
        type: "getStartDate",
        startData: r[1]
      }, i.endTime = {
        data: r[2]
      };
      break;
  }
  return i;
};
let pe, Bt, X = [];
const Cn = {}, wa = function(t, e) {
  const n = {
    section: St,
    type: St,
    processed: !1,
    manualEndTime: !1,
    renderEndTime: null,
    raw: { data: e },
    task: t,
    classes: []
  }, r = xa(Bt, e);
  n.raw.startTime = r.startTime, n.raw.endTime = r.endTime, n.id = r.id, n.prevTaskId = Bt, n.active = r.active, n.done = r.done, n.crit = r.crit, n.milestone = r.milestone, n.order = ke, ke++;
  const i = X.push(n);
  Bt = n.id, Cn[n.id] = i - 1;
}, _t = function(t) {
  const e = Cn[t];
  return X[e];
}, Da = function(t, e) {
  const n = {
    section: St,
    type: St,
    description: t,
    task: t,
    classes: []
  }, r = ba(pe, e);
  n.startTime = r.startTime, n.endTime = r.endTime, n.id = r.id, n.active = r.active, n.done = r.done, n.crit = r.crit, n.milestone = r.milestone, pe = n, $t.push(n);
}, Xe = function() {
  const t = function(n) {
    const r = X[n];
    let i = "";
    switch (X[n].raw.startTime.type) {
      case "prevTaskEnd": {
        const a = _t(r.prevTaskId);
        r.startTime = a.endTime;
        break;
      }
      case "getStartDate":
        i = ve(void 0, ot, X[n].raw.startTime.startData), i && (X[n].startTime = i);
        break;
    }
    return X[n].startTime && (X[n].endTime = Dn(
      X[n].startTime,
      ot,
      X[n].raw.endTime.data,
      zt
    ), X[n].endTime && (X[n].processed = !0, X[n].manualEndTime = nt(
      X[n].raw.endTime.data,
      "YYYY-MM-DD",
      !0
    ).isValid(), xn(X[n], ot, Ot, Wt))), X[n].processed;
  };
  let e = !0;
  for (const [n, r] of X.entries())
    t(n), e = e && r.processed;
  return e;
}, Ca = function(t, e) {
  let n = e;
  Tt().securityLevel !== "loose" && (n = Vn(e)), t.split(",").forEach(function(r) {
    _t(r) !== void 0 && (Sn(r, () => {
      window.open(n, "_self");
    }), Me[r] = n);
  }), Mn(t, "clickable");
}, Mn = function(t, e) {
  t.split(",").forEach(function(n) {
    let r = _t(n);
    r !== void 0 && r.classes.push(e);
  });
}, Ma = function(t, e, n) {
  if (Tt().securityLevel !== "loose" || e === void 0)
    return;
  let r = [];
  if (typeof n == "string") {
    r = n.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    for (let a = 0; a < r.length; a++) {
      let s = r[a].trim();
      s.charAt(0) === '"' && s.charAt(s.length - 1) === '"' && (s = s.substr(1, s.length - 2)), r[a] = s;
    }
  }
  r.length === 0 && r.push(t), _t(t) !== void 0 && Sn(t, () => {
    Rn.runFunc(e, ...r);
  });
}, Sn = function(t, e) {
  Ye.push(
    function() {
      const n = document.querySelector(`[id="${t}"]`);
      n !== null && n.addEventListener("click", function() {
        e();
      });
    },
    function() {
      const n = document.querySelector(`[id="${t}-text"]`);
      n !== null && n.addEventListener("click", function() {
        e();
      });
    }
  );
}, Sa = function(t, e, n) {
  t.split(",").forEach(function(r) {
    Ma(r, e, n);
  }), Mn(t, "clickable");
}, _a = function(t) {
  Ye.forEach(function(e) {
    e(t);
  });
}, Ya = {
  parseDirective: Qi,
  getConfig: () => Tt().gantt,
  clear: Ji,
  setDateFormat: ia,
  getDateFormat: fa,
  enableInclusiveEndDates: aa,
  endDatesAreInclusive: sa,
  enableTopAxis: oa,
  topAxisEnabled: ca,
  setAxisFormat: Ki,
  getAxisFormat: $i,
  setTickInterval: ta,
  getTickInterval: ea,
  setTodayMarker: na,
  getTodayMarker: ra,
  setAccTitle: En,
  getAccTitle: In,
  setDiagramTitle: Wn,
  getDiagramTitle: On,
  setDisplayMode: ua,
  getDisplayMode: la,
  setAccDescription: zn,
  getAccDescription: Nn,
  addSection: ka,
  getSections: va,
  getTasks: pa,
  addTask: wa,
  findTaskById: _t,
  addTaskOrg: Da,
  setIncludes: ha,
  getIncludes: da,
  setExcludes: ma,
  getExcludes: ga,
  setClickEvent: Sa,
  setLink: Ca,
  getLinks: ya,
  bindFunctions: _a,
  parseDuration: wn,
  isInvalidDate: bn
};
function _n(t, e, n) {
  let r = !0;
  for (; r; )
    r = !1, n.forEach(function(i) {
      const a = "^\\s*" + i + "\\s*$", s = new RegExp(a);
      t[0].match(s) && (e[i] = !0, t.shift(1), r = !0);
    });
}
const Fa = function() {
  de.debug("Something is calling, setConf, remove the call");
}, Ua = (t, e) => {
  let n = [...t].map(() => -1 / 0), r = [...t].sort((a, s) => a.startTime - s.startTime || a.order - s.order), i = 0;
  for (const a of r)
    for (let s = 0; s < n.length; s++)
      if (a.startTime >= n[s]) {
        n[s] = a.endTime, a.order = s + e, s > i && (i = s);
        break;
      }
  return i;
};
let ut;
const La = function(t, e, n, r) {
  const i = Tt().gantt, a = Tt().securityLevel;
  let s;
  a === "sandbox" && (s = Nt("#i" + e));
  const g = a === "sandbox" ? Nt(s.nodes()[0].contentDocument.body) : Nt("body"), k = a === "sandbox" ? s.nodes()[0].contentDocument : document, p = k.getElementById(e);
  ut = p.parentElement.offsetWidth, ut === void 0 && (ut = 1200), i.useWidth !== void 0 && (ut = i.useWidth);
  const T = r.db.getTasks();
  let _ = [];
  for (const b of T)
    _.push(b.type);
  _ = O(_);
  const x = {};
  let v = 2 * i.topPadding;
  if (r.db.getDisplayMode() === "compact" || i.displayMode === "compact") {
    const b = {};
    for (const h of T)
      b[h.section] === void 0 ? b[h.section] = [h] : b[h.section].push(h);
    let l = 0;
    for (const h of Object.keys(b)) {
      const d = Ua(b[h], l) + 1;
      l += d, v += d * (i.barHeight + i.barGap), x[h] = d;
    }
  } else {
    v += T.length * (i.barHeight + i.barGap);
    for (const b of _)
      x[b] = T.filter((l) => l.type === b).length;
  }
  p.setAttribute("viewBox", "0 0 " + ut + " " + v);
  const E = g.select(`[id="${e}"]`), M = Fi().domain([
    Kn(T, function(b) {
      return b.startTime;
    }),
    Jn(T, function(b) {
      return b.endTime;
    })
  ]).rangeRound([0, ut - i.leftPadding - i.rightPadding]);
  function N(b, l) {
    const h = b.startTime, d = l.startTime;
    let c = 0;
    return h > d ? c = 1 : h < d && (c = -1), c;
  }
  T.sort(N), V(T, ut, v), Bn(E, v, ut, i.useMaxWidth), E.append("text").text(r.db.getDiagramTitle()).attr("x", ut / 2).attr("y", i.titleTopMargin).attr("class", "titleText");
  function V(b, l, h) {
    const d = i.barHeight, c = d + i.barGap, D = i.topPadding, o = i.leftPadding, I = jn().domain([0, _.length]).range(["#00B9FA", "#F95002"]).interpolate(dr);
    H(
      c,
      D,
      o,
      l,
      h,
      b,
      r.db.getExcludes(),
      r.db.getIncludes()
    ), P(o, D, l, h), Q(b, c, D, o, d, I, l), R(c, D), w(o, D, l, h);
  }
  function Q(b, l, h, d, c, D, o) {
    const f = [...new Set(b.map((m) => m.order))].map((m) => b.find((S) => S.order === m));
    E.append("g").selectAll("rect").data(f).enter().append("rect").attr("x", 0).attr("y", function(m, S) {
      return S = m.order, S * l + h - 2;
    }).attr("width", function() {
      return o - i.rightPadding / 2;
    }).attr("height", l).attr("class", function(m) {
      for (const [S, Y] of _.entries())
        if (m.type === Y)
          return "section section" + S % i.numberSectionStyles;
      return "section section0";
    });
    const J = E.append("g").selectAll("rect").data(b).enter(), $ = r.db.getLinks();
    if (J.append("rect").attr("id", function(m) {
      return m.id;
    }).attr("rx", 3).attr("ry", 3).attr("x", function(m) {
      return m.milestone ? M(m.startTime) + d + 0.5 * (M(m.endTime) - M(m.startTime)) - 0.5 * c : M(m.startTime) + d;
    }).attr("y", function(m, S) {
      return S = m.order, S * l + h;
    }).attr("width", function(m) {
      return m.milestone ? c : M(m.renderEndTime || m.endTime) - M(m.startTime);
    }).attr("height", c).attr("transform-origin", function(m, S) {
      return S = m.order, (M(m.startTime) + d + 0.5 * (M(m.endTime) - M(m.startTime))).toString() + "px " + (S * l + h + 0.5 * c).toString() + "px";
    }).attr("class", function(m) {
      const S = "task";
      let Y = "";
      m.classes.length > 0 && (Y = m.classes.join(" "));
      let F = 0;
      for (const [B, z] of _.entries())
        m.type === z && (F = B % i.numberSectionStyles);
      let A = "";
      return m.active ? m.crit ? A += " activeCrit" : A = " active" : m.done ? m.crit ? A = " doneCrit" : A = " done" : m.crit && (A += " crit"), A.length === 0 && (A = " task"), m.milestone && (A = " milestone " + A), A += F, A += " " + Y, S + A;
    }), J.append("text").attr("id", function(m) {
      return m.id + "-text";
    }).text(function(m) {
      return m.task;
    }).attr("font-size", i.fontSize).attr("x", function(m) {
      let S = M(m.startTime), Y = M(m.renderEndTime || m.endTime);
      m.milestone && (S += 0.5 * (M(m.endTime) - M(m.startTime)) - 0.5 * c), m.milestone && (Y = S + c);
      const F = this.getBBox().width;
      return F > Y - S ? Y + F + 1.5 * i.leftPadding > o ? S + d - 5 : Y + d + 5 : (Y - S) / 2 + S + d;
    }).attr("y", function(m, S) {
      return S = m.order, S * l + i.barHeight / 2 + (i.fontSize / 2 - 2) + h;
    }).attr("text-height", c).attr("class", function(m) {
      const S = M(m.startTime);
      let Y = M(m.endTime);
      m.milestone && (Y = S + c);
      const F = this.getBBox().width;
      let A = "";
      m.classes.length > 0 && (A = m.classes.join(" "));
      let B = 0;
      for (const [Yt, q] of _.entries())
        m.type === q && (B = Yt % i.numberSectionStyles);
      let z = "";
      return m.active && (m.crit ? z = "activeCritText" + B : z = "activeText" + B), m.done ? m.crit ? z = z + " doneCritText" + B : z = z + " doneText" + B : m.crit && (z = z + " critText" + B), m.milestone && (z += " milestoneText"), F > Y - S ? Y + F + 1.5 * i.leftPadding > o ? A + " taskTextOutsideLeft taskTextOutside" + B + " " + z : A + " taskTextOutsideRight taskTextOutside" + B + " " + z + " width-" + F : A + " taskText taskText" + B + " " + z + " width-" + F;
    }), Tt().securityLevel === "sandbox") {
      let m;
      m = Nt("#i" + e);
      const S = m.nodes()[0].contentDocument;
      J.filter(function(Y) {
        return $[Y.id] !== void 0;
      }).each(function(Y) {
        var F = S.querySelector("#" + Y.id), A = S.querySelector("#" + Y.id + "-text");
        const B = F.parentNode;
        var z = S.createElement("a");
        z.setAttribute("xlink:href", $[Y.id]), z.setAttribute("target", "_top"), B.appendChild(z), z.appendChild(F), z.appendChild(A);
      });
    }
  }
  function H(b, l, h, d, c, D, o, I) {
    const f = D.reduce(
      (F, { startTime: A }) => F ? Math.min(F, A) : A,
      0
    ), J = D.reduce((F, { endTime: A }) => F ? Math.max(F, A) : A, 0), $ = r.db.getDateFormat();
    if (!f || !J)
      return;
    const dt = [];
    let m = null, S = nt(f);
    for (; S.valueOf() <= J; )
      r.db.isInvalidDate(S, $, o, I) ? m ? m.end = S : m = {
        start: S,
        end: S
      } : m && (dt.push(m), m = null), S = S.add(1, "d");
    E.append("g").selectAll("rect").data(dt).enter().append("rect").attr("id", function(F) {
      return "exclude-" + F.start.format("YYYY-MM-DD");
    }).attr("x", function(F) {
      return M(F.start) + h;
    }).attr("y", i.gridLineStartPadding).attr("width", function(F) {
      const A = F.end.add(1, "day");
      return M(A) - M(F.start);
    }).attr("height", c - l - i.gridLineStartPadding).attr("transform-origin", function(F, A) {
      return (M(F.start) + h + 0.5 * (M(F.end) - M(F.start))).toString() + "px " + (A * b + 0.5 * c).toString() + "px";
    }).attr("class", "exclude-range");
  }
  function P(b, l, h, d) {
    let c = sr(M).tickSize(-d + l + i.gridLineStartPadding).tickFormat(Kt(r.db.getAxisFormat() || i.axisFormat || "%Y-%m-%d"));
    const o = /^([1-9]\d*)(minute|hour|day|week|month)$/.exec(
      r.db.getTickInterval() || i.tickInterval
    );
    if (o !== null) {
      const I = o[1];
      switch (o[2]) {
        case "minute":
          c.ticks(qt.every(I));
          break;
        case "hour":
          c.ticks(Gt.every(I));
          break;
        case "day":
          c.ticks(wt.every(I));
          break;
        case "week":
          c.ticks(Dt.every(I));
          break;
        case "month":
          c.ticks(Qt.every(I));
          break;
      }
    }
    if (E.append("g").attr("class", "grid").attr("transform", "translate(" + b + ", " + (d - 50) + ")").call(c).selectAll("text").style("text-anchor", "middle").attr("fill", "#000").attr("stroke", "none").attr("font-size", 10).attr("dy", "1em"), r.db.topAxisEnabled() || i.topAxis) {
      let I = ar(M).tickSize(-d + l + i.gridLineStartPadding).tickFormat(Kt(r.db.getAxisFormat() || i.axisFormat || "%Y-%m-%d"));
      if (o !== null) {
        const f = o[1];
        switch (o[2]) {
          case "minute":
            I.ticks(qt.every(f));
            break;
          case "hour":
            I.ticks(Gt.every(f));
            break;
          case "day":
            I.ticks(wt.every(f));
            break;
          case "week":
            I.ticks(Dt.every(f));
            break;
          case "month":
            I.ticks(Qt.every(f));
            break;
        }
      }
      E.append("g").attr("class", "grid").attr("transform", "translate(" + b + ", " + l + ")").call(I).selectAll("text").style("text-anchor", "middle").attr("fill", "#000").attr("stroke", "none").attr("font-size", 10);
    }
  }
  function R(b, l) {
    let h = 0;
    const d = Object.keys(x).map((c) => [c, x[c]]);
    E.append("g").selectAll("text").data(d).enter().append(function(c) {
      const D = c[0].split(Zn.lineBreakRegex), o = -(D.length - 1) / 2, I = k.createElementNS("http://www.w3.org/2000/svg", "text");
      I.setAttribute("dy", o + "em");
      for (const [f, J] of D.entries()) {
        const $ = k.createElementNS("http://www.w3.org/2000/svg", "tspan");
        $.setAttribute("alignment-baseline", "central"), $.setAttribute("x", "10"), f > 0 && $.setAttribute("dy", "1em"), $.textContent = J, I.appendChild($);
      }
      return I;
    }).attr("x", 10).attr("y", function(c, D) {
      if (D > 0)
        for (let o = 0; o < D; o++)
          return h += d[D - 1][1], c[1] * b / 2 + h * b + l;
      else
        return c[1] * b / 2 + l;
    }).attr("font-size", i.sectionFontSize).attr("class", function(c) {
      for (const [D, o] of _.entries())
        if (c[0] === o)
          return "sectionTitle sectionTitle" + D % i.numberSectionStyles;
      return "sectionTitle";
    });
  }
  function w(b, l, h, d) {
    const c = r.db.getTodayMarker();
    if (c === "off")
      return;
    const D = E.append("g").attr("class", "today"), o = /* @__PURE__ */ new Date(), I = D.append("line");
    I.attr("x1", M(o) + b).attr("x2", M(o) + b).attr("y1", i.titleTopMargin).attr("y2", d - i.titleTopMargin).attr("class", "today"), c !== "" && I.attr("style", c.replace(/,/g, ";"));
  }
  function O(b) {
    const l = {}, h = [];
    for (let d = 0, c = b.length; d < c; ++d)
      Object.prototype.hasOwnProperty.call(l, b[d]) || (l[b[d]] = !0, h.push(b[d]));
    return h;
  }
}, Aa = {
  setConf: Fa,
  draw: La
}, Ea = (t) => `
  .mermaid-main-font {
    font-family: "trebuchet ms", verdana, arial, sans-serif;
    font-family: var(--mermaid-font-family);
  }
  .exclude-range {
    fill: ${t.excludeBkgColor};
  }

  .section {
    stroke: none;
    opacity: 0.2;
  }

  .section0 {
    fill: ${t.sectionBkgColor};
  }

  .section2 {
    fill: ${t.sectionBkgColor2};
  }

  .section1,
  .section3 {
    fill: ${t.altSectionBkgColor};
    opacity: 0.2;
  }

  .sectionTitle0 {
    fill: ${t.titleColor};
  }

  .sectionTitle1 {
    fill: ${t.titleColor};
  }

  .sectionTitle2 {
    fill: ${t.titleColor};
  }

  .sectionTitle3 {
    fill: ${t.titleColor};
  }

  .sectionTitle {
    text-anchor: start;
    // font-size: ${t.ganttFontSize};
    // text-height: 14px;
    font-family: 'trebuchet ms', verdana, arial, sans-serif;
    font-family: var(--mermaid-font-family);

  }


  /* Grid and axis */

  .grid .tick {
    stroke: ${t.gridColor};
    opacity: 0.8;
    shape-rendering: crispEdges;
    text {
      font-family: ${t.fontFamily};
      fill: ${t.textColor};
    }
  }

  .grid path {
    stroke-width: 0;
  }


  /* Today line */

  .today {
    fill: none;
    stroke: ${t.todayLineColor};
    stroke-width: 2px;
  }


  /* Task styling */

  /* Default task */

  .task {
    stroke-width: 2;
  }

  .taskText {
    text-anchor: middle;
    font-family: 'trebuchet ms', verdana, arial, sans-serif;
    font-family: var(--mermaid-font-family);
  }

  // .taskText:not([font-size]) {
  //   font-size: ${t.ganttFontSize};
  // }

  .taskTextOutsideRight {
    fill: ${t.taskTextDarkColor};
    text-anchor: start;
    // font-size: ${t.ganttFontSize};
    font-family: 'trebuchet ms', verdana, arial, sans-serif;
    font-family: var(--mermaid-font-family);

  }

  .taskTextOutsideLeft {
    fill: ${t.taskTextDarkColor};
    text-anchor: end;
    // font-size: ${t.ganttFontSize};
  }

  /* Special case clickable */
  .task.clickable {
    cursor: pointer;
  }
  .taskText.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }

  .taskTextOutsideLeft.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }

  .taskTextOutsideRight.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }

  /* Specific task settings for the sections*/

  .taskText0,
  .taskText1,
  .taskText2,
  .taskText3 {
    fill: ${t.taskTextColor};
  }

  .task0,
  .task1,
  .task2,
  .task3 {
    fill: ${t.taskBkgColor};
    stroke: ${t.taskBorderColor};
  }

  .taskTextOutside0,
  .taskTextOutside2
  {
    fill: ${t.taskTextOutsideColor};
  }

  .taskTextOutside1,
  .taskTextOutside3 {
    fill: ${t.taskTextOutsideColor};
  }


  /* Active task */

  .active0,
  .active1,
  .active2,
  .active3 {
    fill: ${t.activeTaskBkgColor};
    stroke: ${t.activeTaskBorderColor};
  }

  .activeText0,
  .activeText1,
  .activeText2,
  .activeText3 {
    fill: ${t.taskTextDarkColor} !important;
  }


  /* Completed task */

  .done0,
  .done1,
  .done2,
  .done3 {
    stroke: ${t.doneTaskBorderColor};
    fill: ${t.doneTaskBkgColor};
    stroke-width: 2;
  }

  .doneText0,
  .doneText1,
  .doneText2,
  .doneText3 {
    fill: ${t.taskTextDarkColor} !important;
  }


  /* Tasks on the critical line */

  .crit0,
  .crit1,
  .crit2,
  .crit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.critBkgColor};
    stroke-width: 2;
  }

  .activeCrit0,
  .activeCrit1,
  .activeCrit2,
  .activeCrit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.activeTaskBkgColor};
    stroke-width: 2;
  }

  .doneCrit0,
  .doneCrit1,
  .doneCrit2,
  .doneCrit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.doneTaskBkgColor};
    stroke-width: 2;
    cursor: pointer;
    shape-rendering: crispEdges;
  }

  .milestone {
    transform: rotate(45deg) scale(0.8,0.8);
  }

  .milestoneText {
    font-style: italic;
  }
  .doneCritText0,
  .doneCritText1,
  .doneCritText2,
  .doneCritText3 {
    fill: ${t.taskTextDarkColor} !important;
  }

  .activeCritText0,
  .activeCritText1,
  .activeCritText2,
  .activeCritText3 {
    fill: ${t.taskTextDarkColor} !important;
  }

  .titleText {
    text-anchor: middle;
    font-size: 18px;
    fill: ${t.textColor}    ;
    font-family: 'trebuchet ms', verdana, arial, sans-serif;
    font-family: var(--mermaid-font-family);
  }
`, Ia = Ea, Na = {
  parser: Ui,
  db: Ya,
  renderer: Aa,
  styles: Ia
};
export {
  Na as diagram
};
