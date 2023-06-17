import { s as rr, u as ir, v as ar } from "./utils-8ea37061.js";
import { E as mn, F as dn, R as gn, G as yn, H as sr, I as or, J as he, K as Ze, L as je, M as cr, N as ee, O as ur, P as _e, g as vt, q as lr, v as fr, y as hr, z as mr, x as dr, w as gr, Q as nt, A as yr, l as me, h as Wt, f as pr } from "./commonDb-41f8b4c5.js";
import { m as kr } from "./mermaidAPI-67f627de.js";
import { i as pn } from "./init-f9637058.js";
function Ht(t, e) {
  return t == null || e == null ? NaN : t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function vr(t, e) {
  return t == null || e == null ? NaN : e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function Ae(t) {
  let e, r, n;
  t.length !== 2 ? (e = Ht, r = (c, y) => Ht(t(c), y), n = (c, y) => t(c) - y) : (e = t === Ht || t === vr ? t : Tr, r = t, n = t);
  function i(c, y, f = 0, x = c.length) {
    if (f < x) {
      if (e(y, y) !== 0)
        return x;
      do {
        const p = f + x >>> 1;
        r(c[p], y) < 0 ? f = p + 1 : x = p;
      } while (f < x);
    }
    return f;
  }
  function a(c, y, f = 0, x = c.length) {
    if (f < x) {
      if (e(y, y) !== 0)
        return x;
      do {
        const p = f + x >>> 1;
        r(c[p], y) <= 0 ? f = p + 1 : x = p;
      } while (f < x);
    }
    return f;
  }
  function s(c, y, f = 0, x = c.length) {
    const p = i(c, y, f, x - 1);
    return p > f && n(c[p - 1], y) > -n(c[p], y) ? p - 1 : p;
  }
  return { left: i, center: s, right: a };
}
function Tr() {
  return 0;
}
function xr(t) {
  return t === null ? NaN : +t;
}
const br = Ae(Ht), Mr = br.right;
Ae(xr).center;
const wr = Mr;
var de = Math.sqrt(50), ge = Math.sqrt(10), ye = Math.sqrt(2);
function Dr(t, e, r) {
  var n, i = -1, a, s, c;
  if (e = +e, t = +t, r = +r, t === e && r > 0)
    return [t];
  if ((n = e < t) && (a = t, t = e, e = a), (c = kn(t, e, r)) === 0 || !isFinite(c))
    return [];
  if (c > 0) {
    let y = Math.round(t / c), f = Math.round(e / c);
    for (y * c < t && ++y, f * c > e && --f, s = new Array(a = f - y + 1); ++i < a; )
      s[i] = (y + i) * c;
  } else {
    c = -c;
    let y = Math.round(t * c), f = Math.round(e * c);
    for (y / c < t && ++y, f / c > e && --f, s = new Array(a = f - y + 1); ++i < a; )
      s[i] = (y + i) / c;
  }
  return n && s.reverse(), s;
}
function kn(t, e, r) {
  var n = (e - t) / Math.max(0, r), i = Math.floor(Math.log(n) / Math.LN10), a = n / Math.pow(10, i);
  return i >= 0 ? (a >= de ? 10 : a >= ge ? 5 : a >= ye ? 2 : 1) * Math.pow(10, i) : -Math.pow(10, -i) / (a >= de ? 10 : a >= ge ? 5 : a >= ye ? 2 : 1);
}
function pe(t, e, r) {
  var n = Math.abs(e - t) / Math.max(0, r), i = Math.pow(10, Math.floor(Math.log(n) / Math.LN10)), a = n / i;
  return a >= de ? i *= 10 : a >= ge ? i *= 5 : a >= ye && (i *= 2), e < t ? -i : i;
}
function Cr(t, e) {
  let r;
  if (e === void 0)
    for (const n of t)
      n != null && (r < n || r === void 0 && n >= n) && (r = n);
  else {
    let n = -1;
    for (let i of t)
      (i = e(i, ++n, t)) != null && (r < i || r === void 0 && i >= i) && (r = i);
  }
  return r;
}
function Sr(t, e) {
  let r;
  if (e === void 0)
    for (const n of t)
      n != null && (r > n || r === void 0 && n >= n) && (r = n);
  else {
    let n = -1;
    for (let i of t)
      (i = e(i, ++n, t)) != null && (r > i || r === void 0 && i >= i) && (r = i);
  }
  return r;
}
function _r(t) {
  return t;
}
var Pt = 1, ne = 2, ke = 3, zt = 4, qe = 1e-6;
function Ar(t) {
  return "translate(" + t + ",0)";
}
function Fr(t) {
  return "translate(0," + t + ")";
}
function Yr(t) {
  return (e) => +t(e);
}
function Ur(t, e) {
  return e = Math.max(0, t.bandwidth() - e * 2) / 2, t.round() && (e = Math.round(e)), (r) => +t(r) + e;
}
function Lr() {
  return !this.__axis;
}
function vn(t, e) {
  var r = [], n = null, i = null, a = 6, s = 6, c = 3, y = typeof window < "u" && window.devicePixelRatio > 1 ? 0 : 0.5, f = t === Pt || t === zt ? -1 : 1, x = t === zt || t === ne ? "x" : "y", p = t === Pt || t === ke ? Ar : Fr;
  function v(D) {
    var z = n ?? (e.ticks ? e.ticks.apply(e, r) : e.domain()), T = i ?? (e.tickFormat ? e.tickFormat.apply(e, r) : _r), _ = Math.max(a, 0) + c, I = e.range(), W = +I[0] + y, O = +I[I.length - 1] + y, V = (e.bandwidth ? Ur : Yr)(e.copy(), y), P = D.selection ? D.selection() : D, C = P.selectAll(".domain").data([null]), U = P.selectAll(".tick").data(z, e).order(), w = U.exit(), h = U.enter().append("g").attr("class", "tick"), g = U.select("line"), u = U.select("text");
    C = C.merge(C.enter().insert("path", ".tick").attr("class", "domain").attr("stroke", "currentColor")), U = U.merge(h), g = g.merge(h.append("line").attr("stroke", "currentColor").attr(x + "2", f * a)), u = u.merge(h.append("text").attr("fill", "currentColor").attr(x, f * _).attr("dy", t === Pt ? "0em" : t === ke ? "0.71em" : "0.32em")), D !== P && (C = C.transition(D), U = U.transition(D), g = g.transition(D), u = u.transition(D), w = w.transition(D).attr("opacity", qe).attr("transform", function(l) {
      return isFinite(l = V(l)) ? p(l + y) : this.getAttribute("transform");
    }), h.attr("opacity", qe).attr("transform", function(l) {
      var b = this.parentNode.__axis;
      return p((b && isFinite(b = b(l)) ? b : V(l)) + y);
    })), w.remove(), C.attr("d", t === zt || t === ne ? s ? "M" + f * s + "," + W + "H" + y + "V" + O + "H" + f * s : "M" + y + "," + W + "V" + O : s ? "M" + W + "," + f * s + "V" + y + "H" + O + "V" + f * s : "M" + W + "," + y + "H" + O), U.attr("opacity", 1).attr("transform", function(l) {
      return p(V(l) + y);
    }), g.attr(x + "2", f * a), u.attr(x, f * _).text(T), P.filter(Lr).attr("fill", "none").attr("font-size", 10).attr("font-family", "sans-serif").attr("text-anchor", t === ne ? "start" : t === zt ? "end" : "middle"), P.each(function() {
      this.__axis = V;
    });
  }
  return v.scale = function(D) {
    return arguments.length ? (e = D, v) : e;
  }, v.ticks = function() {
    return r = Array.from(arguments), v;
  }, v.tickArguments = function(D) {
    return arguments.length ? (r = D == null ? [] : Array.from(D), v) : r.slice();
  }, v.tickValues = function(D) {
    return arguments.length ? (n = D == null ? null : Array.from(D), v) : n && n.slice();
  }, v.tickFormat = function(D) {
    return arguments.length ? (i = D, v) : i;
  }, v.tickSize = function(D) {
    return arguments.length ? (a = s = +D, v) : a;
  }, v.tickSizeInner = function(D) {
    return arguments.length ? (a = +D, v) : a;
  }, v.tickSizeOuter = function(D) {
    return arguments.length ? (s = +D, v) : s;
  }, v.tickPadding = function(D) {
    return arguments.length ? (c = +D, v) : c;
  }, v.offset = function(D) {
    return arguments.length ? (y = +D, v) : y;
  }, v;
}
function Er(t) {
  return vn(Pt, t);
}
function Ir(t) {
  return vn(ke, t);
}
const Nr = Math.PI / 180, Wr = 180 / Math.PI, Bt = 18, Tn = 0.96422, xn = 1, bn = 0.82521, Mn = 4 / 29, Tt = 6 / 29, wn = 3 * Tt * Tt, zr = Tt * Tt * Tt;
function Dn(t) {
  if (t instanceof ot)
    return new ot(t.l, t.a, t.b, t.opacity);
  if (t instanceof ut)
    return Cn(t);
  t instanceof gn || (t = sr(t));
  var e = se(t.r), r = se(t.g), n = se(t.b), i = re((0.2225045 * e + 0.7168786 * r + 0.0606169 * n) / xn), a, s;
  return e === r && r === n ? a = s = i : (a = re((0.4360747 * e + 0.3850649 * r + 0.1430804 * n) / Tn), s = re((0.0139322 * e + 0.0971045 * r + 0.7141733 * n) / bn)), new ot(116 * i - 16, 500 * (a - i), 200 * (i - s), t.opacity);
}
function Or(t, e, r, n) {
  return arguments.length === 1 ? Dn(t) : new ot(t, e, r, n ?? 1);
}
function ot(t, e, r, n) {
  this.l = +t, this.a = +e, this.b = +r, this.opacity = +n;
}
mn(ot, Or, dn(yn, {
  brighter(t) {
    return new ot(this.l + Bt * (t ?? 1), this.a, this.b, this.opacity);
  },
  darker(t) {
    return new ot(this.l - Bt * (t ?? 1), this.a, this.b, this.opacity);
  },
  rgb() {
    var t = (this.l + 16) / 116, e = isNaN(this.a) ? t : t + this.a / 500, r = isNaN(this.b) ? t : t - this.b / 200;
    return e = Tn * ie(e), t = xn * ie(t), r = bn * ie(r), new gn(
      ae(3.1338561 * e - 1.6168667 * t - 0.4906146 * r),
      ae(-0.9787684 * e + 1.9161415 * t + 0.033454 * r),
      ae(0.0719453 * e - 0.2289914 * t + 1.4052427 * r),
      this.opacity
    );
  }
}));
function re(t) {
  return t > zr ? Math.pow(t, 1 / 3) : t / wn + Mn;
}
function ie(t) {
  return t > Tt ? t * t * t : wn * (t - Mn);
}
function ae(t) {
  return 255 * (t <= 31308e-7 ? 12.92 * t : 1.055 * Math.pow(t, 1 / 2.4) - 0.055);
}
function se(t) {
  return (t /= 255) <= 0.04045 ? t / 12.92 : Math.pow((t + 0.055) / 1.055, 2.4);
}
function Hr(t) {
  if (t instanceof ut)
    return new ut(t.h, t.c, t.l, t.opacity);
  if (t instanceof ot || (t = Dn(t)), t.a === 0 && t.b === 0)
    return new ut(NaN, 0 < t.l && t.l < 100 ? 0 : NaN, t.l, t.opacity);
  var e = Math.atan2(t.b, t.a) * Wr;
  return new ut(e < 0 ? e + 360 : e, Math.sqrt(t.a * t.a + t.b * t.b), t.l, t.opacity);
}
function ve(t, e, r, n) {
  return arguments.length === 1 ? Hr(t) : new ut(t, e, r, n ?? 1);
}
function ut(t, e, r, n) {
  this.h = +t, this.c = +e, this.l = +r, this.opacity = +n;
}
function Cn(t) {
  if (isNaN(t.h))
    return new ot(t.l, 0, 0, t.opacity);
  var e = t.h * Nr;
  return new ot(t.l, Math.cos(e) * t.c, Math.sin(e) * t.c, t.opacity);
}
mn(ut, ve, dn(yn, {
  brighter(t) {
    return new ut(this.h, this.c, this.l + Bt * (t ?? 1), this.opacity);
  },
  darker(t) {
    return new ut(this.h, this.c, this.l - Bt * (t ?? 1), this.opacity);
  },
  rgb() {
    return Cn(this).rgb();
  }
}));
function Pr(t, e) {
  e || (e = []);
  var r = t ? Math.min(e.length, t.length) : 0, n = e.slice(), i;
  return function(a) {
    for (i = 0; i < r; ++i)
      n[i] = t[i] * (1 - a) + e[i] * a;
    return n;
  };
}
function Vr(t) {
  return ArrayBuffer.isView(t) && !(t instanceof DataView);
}
function Rr(t, e) {
  var r = e ? e.length : 0, n = t ? Math.min(r, t.length) : 0, i = new Array(n), a = new Array(r), s;
  for (s = 0; s < n; ++s)
    i[s] = Fe(t[s], e[s]);
  for (; s < r; ++s)
    a[s] = e[s];
  return function(c) {
    for (s = 0; s < n; ++s)
      a[s] = i[s](c);
    return a;
  };
}
function Br(t, e) {
  var r = new Date();
  return t = +t, e = +e, function(n) {
    return r.setTime(t * (1 - n) + e * n), r;
  };
}
function Zr(t, e) {
  var r = {}, n = {}, i;
  (t === null || typeof t != "object") && (t = {}), (e === null || typeof e != "object") && (e = {});
  for (i in e)
    i in t ? r[i] = Fe(t[i], e[i]) : n[i] = e[i];
  return function(a) {
    for (i in r)
      n[i] = r[i](a);
    return n;
  };
}
function Fe(t, e) {
  var r = typeof e, n;
  return e == null || r === "boolean" ? or(e) : (r === "number" ? he : r === "string" ? (n = Ze(e)) ? (e = n, je) : cr : e instanceof Ze ? je : e instanceof Date ? Br : Vr(e) ? Pr : Array.isArray(e) ? Rr : typeof e.valueOf != "function" && typeof e.toString != "function" || isNaN(e) ? Zr : he)(t, e);
}
function jr(t, e) {
  return t = +t, e = +e, function(r) {
    return Math.round(t * (1 - r) + e * r);
  };
}
function qr(t) {
  return function(e, r) {
    var n = t((e = ve(e)).h, (r = ve(r)).h), i = ee(e.c, r.c), a = ee(e.l, r.l), s = ee(e.opacity, r.opacity);
    return function(c) {
      return e.h = n(c), e.c = i(c), e.l = a(c), e.opacity = s(c), e + "";
    };
  };
}
const Xr = qr(ur);
function Gr(t) {
  return Math.abs(t = Math.round(t)) >= 1e21 ? t.toLocaleString("en").replace(/,/g, "") : t.toString(10);
}
function Zt(t, e) {
  if ((r = (t = e ? t.toExponential(e - 1) : t.toExponential()).indexOf("e")) < 0)
    return null;
  var r, n = t.slice(0, r);
  return [
    n.length > 1 ? n[0] + n.slice(2) : n,
    +t.slice(r + 1)
  ];
}
function bt(t) {
  return t = Zt(Math.abs(t)), t ? t[1] : NaN;
}
function $r(t, e) {
  return function(r, n) {
    for (var i = r.length, a = [], s = 0, c = t[0], y = 0; i > 0 && c > 0 && (y + c + 1 > n && (c = Math.max(1, n - y)), a.push(r.substring(i -= c, i + c)), !((y += c + 1) > n)); )
      c = t[s = (s + 1) % t.length];
    return a.reverse().join(e);
  };
}
function Qr(t) {
  return function(e) {
    return e.replace(/[0-9]/g, function(r) {
      return t[+r];
    });
  };
}
var Jr = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function jt(t) {
  if (!(e = Jr.exec(t)))
    throw new Error("invalid format: " + t);
  var e;
  return new Ye({
    fill: e[1],
    align: e[2],
    sign: e[3],
    symbol: e[4],
    zero: e[5],
    width: e[6],
    comma: e[7],
    precision: e[8] && e[8].slice(1),
    trim: e[9],
    type: e[10]
  });
}
jt.prototype = Ye.prototype;
function Ye(t) {
  this.fill = t.fill === void 0 ? " " : t.fill + "", this.align = t.align === void 0 ? ">" : t.align + "", this.sign = t.sign === void 0 ? "-" : t.sign + "", this.symbol = t.symbol === void 0 ? "" : t.symbol + "", this.zero = !!t.zero, this.width = t.width === void 0 ? void 0 : +t.width, this.comma = !!t.comma, this.precision = t.precision === void 0 ? void 0 : +t.precision, this.trim = !!t.trim, this.type = t.type === void 0 ? "" : t.type + "";
}
Ye.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
function Kr(t) {
  t:
    for (var e = t.length, r = 1, n = -1, i; r < e; ++r)
      switch (t[r]) {
        case ".":
          n = i = r;
          break;
        case "0":
          n === 0 && (n = r), i = r;
          break;
        default:
          if (!+t[r])
            break t;
          n > 0 && (n = 0);
          break;
      }
  return n > 0 ? t.slice(0, n) + t.slice(i + 1) : t;
}
var Sn;
function ti(t, e) {
  var r = Zt(t, e);
  if (!r)
    return t + "";
  var n = r[0], i = r[1], a = i - (Sn = Math.max(-8, Math.min(8, Math.floor(i / 3))) * 3) + 1, s = n.length;
  return a === s ? n : a > s ? n + new Array(a - s + 1).join("0") : a > 0 ? n.slice(0, a) + "." + n.slice(a) : "0." + new Array(1 - a).join("0") + Zt(t, Math.max(0, e + a - 1))[0];
}
function Xe(t, e) {
  var r = Zt(t, e);
  if (!r)
    return t + "";
  var n = r[0], i = r[1];
  return i < 0 ? "0." + new Array(-i).join("0") + n : n.length > i + 1 ? n.slice(0, i + 1) + "." + n.slice(i + 1) : n + new Array(i - n.length + 2).join("0");
}
const Ge = {
  "%": (t, e) => (t * 100).toFixed(e),
  b: (t) => Math.round(t).toString(2),
  c: (t) => t + "",
  d: Gr,
  e: (t, e) => t.toExponential(e),
  f: (t, e) => t.toFixed(e),
  g: (t, e) => t.toPrecision(e),
  o: (t) => Math.round(t).toString(8),
  p: (t, e) => Xe(t * 100, e),
  r: Xe,
  s: ti,
  X: (t) => Math.round(t).toString(16).toUpperCase(),
  x: (t) => Math.round(t).toString(16)
};
function $e(t) {
  return t;
}
var Qe = Array.prototype.map, Je = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function ei(t) {
  var e = t.grouping === void 0 || t.thousands === void 0 ? $e : $r(Qe.call(t.grouping, Number), t.thousands + ""), r = t.currency === void 0 ? "" : t.currency[0] + "", n = t.currency === void 0 ? "" : t.currency[1] + "", i = t.decimal === void 0 ? "." : t.decimal + "", a = t.numerals === void 0 ? $e : Qr(Qe.call(t.numerals, String)), s = t.percent === void 0 ? "%" : t.percent + "", c = t.minus === void 0 ? "−" : t.minus + "", y = t.nan === void 0 ? "NaN" : t.nan + "";
  function f(p) {
    p = jt(p);
    var v = p.fill, D = p.align, z = p.sign, T = p.symbol, _ = p.zero, I = p.width, W = p.comma, O = p.precision, V = p.trim, P = p.type;
    P === "n" ? (W = !0, P = "g") : Ge[P] || (O === void 0 && (O = 12), V = !0, P = "g"), (_ || v === "0" && D === "=") && (_ = !0, v = "0", D = "=");
    var C = T === "$" ? r : T === "#" && /[boxX]/.test(P) ? "0" + P.toLowerCase() : "", U = T === "$" ? n : /[%p]/.test(P) ? s : "", w = Ge[P], h = /[defgprs%]/.test(P);
    O = O === void 0 ? 6 : /[gprs]/.test(P) ? Math.max(1, Math.min(21, O)) : Math.max(0, Math.min(20, O));
    function g(u) {
      var l = C, b = U, o, Y, m;
      if (P === "c")
        b = w(u) + b, u = "";
      else {
        u = +u;
        var Z = u < 0 || 1 / u < 0;
        if (u = isNaN(u) ? y : w(Math.abs(u), O), V && (u = Kr(u)), Z && +u == 0 && z !== "+" && (Z = !1), l = (Z ? z === "(" ? z : c : z === "-" || z === "(" ? "" : z) + l, b = (P === "s" ? Je[8 + Sn / 3] : "") + b + (Z && z === "(" ? ")" : ""), h) {
          for (o = -1, Y = u.length; ++o < Y; )
            if (m = u.charCodeAt(o), 48 > m || m > 57) {
              b = (m === 46 ? i + u.slice(o + 1) : u.slice(o)) + b, u = u.slice(0, o);
              break;
            }
        }
      }
      W && !_ && (u = e(u, 1 / 0));
      var j = l.length + u.length + b.length, B = j < I ? new Array(I - j + 1).join(v) : "";
      switch (W && _ && (u = e(B + u, B.length ? I - b.length : 1 / 0), B = ""), D) {
        case "<":
          u = l + u + b + B;
          break;
        case "=":
          u = l + B + u + b;
          break;
        case "^":
          u = B.slice(0, j = B.length >> 1) + l + u + b + B.slice(j);
          break;
        default:
          u = B + l + u + b;
          break;
      }
      return a(u);
    }
    return g.toString = function() {
      return p + "";
    }, g;
  }
  function x(p, v) {
    var D = f((p = jt(p), p.type = "f", p)), z = Math.max(-8, Math.min(8, Math.floor(bt(v) / 3))) * 3, T = Math.pow(10, -z), _ = Je[8 + z / 3];
    return function(I) {
      return D(T * I) + _;
    };
  }
  return {
    format: f,
    formatPrefix: x
  };
}
var Ot, _n, An;
ni({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function ni(t) {
  return Ot = ei(t), _n = Ot.format, An = Ot.formatPrefix, Ot;
}
function ri(t) {
  return Math.max(0, -bt(Math.abs(t)));
}
function ii(t, e) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(bt(e) / 3))) * 3 - bt(Math.abs(t)));
}
function ai(t, e) {
  return t = Math.abs(t), e = Math.abs(e) - t, Math.max(0, bt(e) - bt(t)) + 1;
}
function si(t) {
  return function() {
    return t;
  };
}
function oi(t) {
  return +t;
}
var Ke = [0, 1];
function kt(t) {
  return t;
}
function Te(t, e) {
  return (e -= t = +t) ? function(r) {
    return (r - t) / e;
  } : si(isNaN(e) ? NaN : 0.5);
}
function ci(t, e) {
  var r;
  return t > e && (r = t, t = e, e = r), function(n) {
    return Math.max(t, Math.min(e, n));
  };
}
function ui(t, e, r) {
  var n = t[0], i = t[1], a = e[0], s = e[1];
  return i < n ? (n = Te(i, n), a = r(s, a)) : (n = Te(n, i), a = r(a, s)), function(c) {
    return a(n(c));
  };
}
function li(t, e, r) {
  var n = Math.min(t.length, e.length) - 1, i = new Array(n), a = new Array(n), s = -1;
  for (t[n] < t[0] && (t = t.slice().reverse(), e = e.slice().reverse()); ++s < n; )
    i[s] = Te(t[s], t[s + 1]), a[s] = r(e[s], e[s + 1]);
  return function(c) {
    var y = wr(t, c, 1, n) - 1;
    return a[y](i[y](c));
  };
}
function Fn(t, e) {
  return e.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp()).unknown(t.unknown());
}
function fi() {
  var t = Ke, e = Ke, r = Fe, n, i, a, s = kt, c, y, f;
  function x() {
    var v = Math.min(t.length, e.length);
    return s !== kt && (s = ci(t[0], t[v - 1])), c = v > 2 ? li : ui, y = f = null, p;
  }
  function p(v) {
    return v == null || isNaN(v = +v) ? a : (y || (y = c(t.map(n), e, r)))(n(s(v)));
  }
  return p.invert = function(v) {
    return s(i((f || (f = c(e, t.map(n), he)))(v)));
  }, p.domain = function(v) {
    return arguments.length ? (t = Array.from(v, oi), x()) : t.slice();
  }, p.range = function(v) {
    return arguments.length ? (e = Array.from(v), x()) : e.slice();
  }, p.rangeRound = function(v) {
    return e = Array.from(v), r = jr, x();
  }, p.clamp = function(v) {
    return arguments.length ? (s = v ? !0 : kt, x()) : s !== kt;
  }, p.interpolate = function(v) {
    return arguments.length ? (r = v, x()) : r;
  }, p.unknown = function(v) {
    return arguments.length ? (a = v, p) : a;
  }, function(v, D) {
    return n = v, i = D, x();
  };
}
function Yn() {
  return fi()(kt, kt);
}
function hi(t, e, r, n) {
  var i = pe(t, e, r), a;
  switch (n = jt(n ?? ",f"), n.type) {
    case "s": {
      var s = Math.max(Math.abs(t), Math.abs(e));
      return n.precision == null && !isNaN(a = ii(i, s)) && (n.precision = a), An(n, s);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      n.precision == null && !isNaN(a = ai(i, Math.max(Math.abs(t), Math.abs(e)))) && (n.precision = a - (n.type === "e"));
      break;
    }
    case "f":
    case "%": {
      n.precision == null && !isNaN(a = ri(i)) && (n.precision = a - (n.type === "%") * 2);
      break;
    }
  }
  return _n(n);
}
function mi(t) {
  var e = t.domain;
  return t.ticks = function(r) {
    var n = e();
    return Dr(n[0], n[n.length - 1], r ?? 10);
  }, t.tickFormat = function(r, n) {
    var i = e();
    return hi(i[0], i[i.length - 1], r ?? 10, n);
  }, t.nice = function(r) {
    r == null && (r = 10);
    var n = e(), i = 0, a = n.length - 1, s = n[i], c = n[a], y, f, x = 10;
    for (c < s && (f = s, s = c, c = f, f = i, i = a, a = f); x-- > 0; ) {
      if (f = kn(s, c, r), f === y)
        return n[i] = s, n[a] = c, e(n);
      if (f > 0)
        s = Math.floor(s / f) * f, c = Math.ceil(c / f) * f;
      else if (f < 0)
        s = Math.ceil(s * f) / f, c = Math.floor(c * f) / f;
      else
        break;
      y = f;
    }
    return t;
  }, t;
}
function Un() {
  var t = Yn();
  return t.copy = function() {
    return Fn(t, Un());
  }, pn.apply(t, arguments), mi(t);
}
function di(t, e) {
  t = t.slice();
  var r = 0, n = t.length - 1, i = t[r], a = t[n], s;
  return a < i && (s = r, r = n, n = s, s = i, i = a, a = s), t[r] = e.floor(i), t[n] = e.ceil(a), t;
}
var oe = new Date(), ce = new Date();
function tt(t, e, r, n) {
  function i(a) {
    return t(a = arguments.length === 0 ? new Date() : new Date(+a)), a;
  }
  return i.floor = function(a) {
    return t(a = new Date(+a)), a;
  }, i.ceil = function(a) {
    return t(a = new Date(a - 1)), e(a, 1), t(a), a;
  }, i.round = function(a) {
    var s = i(a), c = i.ceil(a);
    return a - s < c - a ? s : c;
  }, i.offset = function(a, s) {
    return e(a = new Date(+a), s == null ? 1 : Math.floor(s)), a;
  }, i.range = function(a, s, c) {
    var y = [], f;
    if (a = i.ceil(a), c = c == null ? 1 : Math.floor(c), !(a < s) || !(c > 0))
      return y;
    do
      y.push(f = new Date(+a)), e(a, c), t(a);
    while (f < a && a < s);
    return y;
  }, i.filter = function(a) {
    return tt(function(s) {
      if (s >= s)
        for (; t(s), !a(s); )
          s.setTime(s - 1);
    }, function(s, c) {
      if (s >= s)
        if (c < 0)
          for (; ++c <= 0; )
            for (; e(s, -1), !a(s); )
              ;
        else
          for (; --c >= 0; )
            for (; e(s, 1), !a(s); )
              ;
    });
  }, r && (i.count = function(a, s) {
    return oe.setTime(+a), ce.setTime(+s), t(oe), t(ce), Math.floor(r(oe, ce));
  }, i.every = function(a) {
    return a = Math.floor(a), !isFinite(a) || !(a > 0) ? null : a > 1 ? i.filter(n ? function(s) {
      return n(s) % a === 0;
    } : function(s) {
      return i.count(0, s) % a === 0;
    }) : i;
  }), i;
}
var qt = tt(function() {
}, function(t, e) {
  t.setTime(+t + e);
}, function(t, e) {
  return e - t;
});
qt.every = function(t) {
  return t = Math.floor(t), !isFinite(t) || !(t > 0) ? null : t > 1 ? tt(function(e) {
    e.setTime(Math.floor(e / t) * t);
  }, function(e, r) {
    e.setTime(+e + r * t);
  }, function(e, r) {
    return (r - e) / t;
  }) : qt;
};
const gi = qt;
qt.range;
const lt = 1e3, it = lt * 60, ft = it * 60, mt = ft * 24, Ue = mt * 7, tn = mt * 30, ue = mt * 365;
var Ln = tt(function(t) {
  t.setTime(t - t.getMilliseconds());
}, function(t, e) {
  t.setTime(+t + e * lt);
}, function(t, e) {
  return (e - t) / lt;
}, function(t) {
  return t.getUTCSeconds();
});
const Lt = Ln;
Ln.range;
var En = tt(function(t) {
  t.setTime(t - t.getMilliseconds() - t.getSeconds() * lt);
}, function(t, e) {
  t.setTime(+t + e * it);
}, function(t, e) {
  return (e - t) / it;
}, function(t) {
  return t.getMinutes();
});
const Xt = En;
En.range;
var In = tt(function(t) {
  t.setTime(t - t.getMilliseconds() - t.getSeconds() * lt - t.getMinutes() * it);
}, function(t, e) {
  t.setTime(+t + e * ft);
}, function(t, e) {
  return (e - t) / ft;
}, function(t) {
  return t.getHours();
});
const Gt = In;
In.range;
var Nn = tt(
  (t) => t.setHours(0, 0, 0, 0),
  (t, e) => t.setDate(t.getDate() + e),
  (t, e) => (e - t - (e.getTimezoneOffset() - t.getTimezoneOffset()) * it) / mt,
  (t) => t.getDate() - 1
);
const Mt = Nn;
Nn.range;
function gt(t) {
  return tt(function(e) {
    e.setDate(e.getDate() - (e.getDay() + 7 - t) % 7), e.setHours(0, 0, 0, 0);
  }, function(e, r) {
    e.setDate(e.getDate() + r * 7);
  }, function(e, r) {
    return (r - e - (r.getTimezoneOffset() - e.getTimezoneOffset()) * it) / Ue;
  });
}
var wt = gt(0), $t = gt(1), yi = gt(2), pi = gt(3), Dt = gt(4), ki = gt(5), vi = gt(6);
wt.range;
$t.range;
yi.range;
pi.range;
Dt.range;
ki.range;
vi.range;
var Wn = tt(function(t) {
  t.setDate(1), t.setHours(0, 0, 0, 0);
}, function(t, e) {
  t.setMonth(t.getMonth() + e);
}, function(t, e) {
  return e.getMonth() - t.getMonth() + (e.getFullYear() - t.getFullYear()) * 12;
}, function(t) {
  return t.getMonth();
});
const Qt = Wn;
Wn.range;
var Le = tt(function(t) {
  t.setMonth(0, 1), t.setHours(0, 0, 0, 0);
}, function(t, e) {
  t.setFullYear(t.getFullYear() + e);
}, function(t, e) {
  return e.getFullYear() - t.getFullYear();
}, function(t) {
  return t.getFullYear();
});
Le.every = function(t) {
  return !isFinite(t = Math.floor(t)) || !(t > 0) ? null : tt(function(e) {
    e.setFullYear(Math.floor(e.getFullYear() / t) * t), e.setMonth(0, 1), e.setHours(0, 0, 0, 0);
  }, function(e, r) {
    e.setFullYear(e.getFullYear() + r * t);
  });
};
const dt = Le;
Le.range;
var zn = tt(function(t) {
  t.setUTCSeconds(0, 0);
}, function(t, e) {
  t.setTime(+t + e * it);
}, function(t, e) {
  return (e - t) / it;
}, function(t) {
  return t.getUTCMinutes();
});
const Ti = zn;
zn.range;
var On = tt(function(t) {
  t.setUTCMinutes(0, 0, 0);
}, function(t, e) {
  t.setTime(+t + e * ft);
}, function(t, e) {
  return (e - t) / ft;
}, function(t) {
  return t.getUTCHours();
});
const xi = On;
On.range;
var Hn = tt(function(t) {
  t.setUTCHours(0, 0, 0, 0);
}, function(t, e) {
  t.setUTCDate(t.getUTCDate() + e);
}, function(t, e) {
  return (e - t) / mt;
}, function(t) {
  return t.getUTCDate() - 1;
});
const Ee = Hn;
Hn.range;
function yt(t) {
  return tt(function(e) {
    e.setUTCDate(e.getUTCDate() - (e.getUTCDay() + 7 - t) % 7), e.setUTCHours(0, 0, 0, 0);
  }, function(e, r) {
    e.setUTCDate(e.getUTCDate() + r * 7);
  }, function(e, r) {
    return (r - e) / Ue;
  });
}
var Ie = yt(0), Jt = yt(1), bi = yt(2), Mi = yt(3), Ct = yt(4), wi = yt(5), Di = yt(6);
Ie.range;
Jt.range;
bi.range;
Mi.range;
Ct.range;
wi.range;
Di.range;
var Pn = tt(function(t) {
  t.setUTCDate(1), t.setUTCHours(0, 0, 0, 0);
}, function(t, e) {
  t.setUTCMonth(t.getUTCMonth() + e);
}, function(t, e) {
  return e.getUTCMonth() - t.getUTCMonth() + (e.getUTCFullYear() - t.getUTCFullYear()) * 12;
}, function(t) {
  return t.getUTCMonth();
});
const Ci = Pn;
Pn.range;
var Ne = tt(function(t) {
  t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0);
}, function(t, e) {
  t.setUTCFullYear(t.getUTCFullYear() + e);
}, function(t, e) {
  return e.getUTCFullYear() - t.getUTCFullYear();
}, function(t) {
  return t.getUTCFullYear();
});
Ne.every = function(t) {
  return !isFinite(t = Math.floor(t)) || !(t > 0) ? null : tt(function(e) {
    e.setUTCFullYear(Math.floor(e.getUTCFullYear() / t) * t), e.setUTCMonth(0, 1), e.setUTCHours(0, 0, 0, 0);
  }, function(e, r) {
    e.setUTCFullYear(e.getUTCFullYear() + r * t);
  });
};
const St = Ne;
Ne.range;
function Vn(t, e, r, n, i, a) {
  const s = [
    [Lt, 1, lt],
    [Lt, 5, 5 * lt],
    [Lt, 15, 15 * lt],
    [Lt, 30, 30 * lt],
    [a, 1, it],
    [a, 5, 5 * it],
    [a, 15, 15 * it],
    [a, 30, 30 * it],
    [i, 1, ft],
    [i, 3, 3 * ft],
    [i, 6, 6 * ft],
    [i, 12, 12 * ft],
    [n, 1, mt],
    [n, 2, 2 * mt],
    [r, 1, Ue],
    [e, 1, tn],
    [e, 3, 3 * tn],
    [t, 1, ue]
  ];
  function c(f, x, p) {
    const v = x < f;
    v && ([f, x] = [x, f]);
    const D = p && typeof p.range == "function" ? p : y(f, x, p), z = D ? D.range(f, +x + 1) : [];
    return v ? z.reverse() : z;
  }
  function y(f, x, p) {
    const v = Math.abs(x - f) / p, D = Ae(([, , _]) => _).right(s, v);
    if (D === s.length)
      return t.every(pe(f / ue, x / ue, p));
    if (D === 0)
      return gi.every(Math.max(pe(f, x, p), 1));
    const [z, T] = s[v / s[D - 1][2] < s[D][2] / v ? D - 1 : D];
    return z.every(T);
  }
  return [c, y];
}
Vn(St, Ci, Ie, Ee, xi, Ti);
const [Si, _i] = Vn(dt, Qt, wt, Mt, Gt, Xt);
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
function Ft(t, e, r) {
  return { y: t, m: e, d: r, H: 0, M: 0, S: 0, L: 0 };
}
function Ai(t) {
  var e = t.dateTime, r = t.date, n = t.time, i = t.periods, a = t.days, s = t.shortDays, c = t.months, y = t.shortMonths, f = Yt(i), x = Ut(i), p = Yt(a), v = Ut(a), D = Yt(s), z = Ut(s), T = Yt(c), _ = Ut(c), I = Yt(y), W = Ut(y), O = {
    a: Z,
    A: j,
    b: B,
    B: k,
    c: null,
    d: on,
    e: on,
    f: Ji,
    g: ca,
    G: la,
    H: Gi,
    I: $i,
    j: Qi,
    L: Rn,
    m: Ki,
    M: ta,
    p: A,
    q: F,
    Q: ln,
    s: fn,
    S: ea,
    u: na,
    U: ra,
    V: ia,
    w: aa,
    W: sa,
    x: null,
    X: null,
    y: oa,
    Y: ua,
    Z: fa,
    "%": un
  }, V = {
    a: L,
    A: H,
    b: $,
    B: q,
    c: null,
    d: cn,
    e: cn,
    f: ga,
    g: Da,
    G: Sa,
    H: ha,
    I: ma,
    j: da,
    L: Zn,
    m: ya,
    M: pa,
    p: ht,
    q: G,
    Q: ln,
    s: fn,
    S: ka,
    u: va,
    U: Ta,
    V: xa,
    w: ba,
    W: Ma,
    x: null,
    X: null,
    y: wa,
    Y: Ca,
    Z: _a,
    "%": un
  }, P = {
    a: g,
    A: u,
    b: l,
    B: b,
    c: o,
    d: an,
    e: an,
    f: Zi,
    g: rn,
    G: nn,
    H: sn,
    I: sn,
    j: Pi,
    L: Bi,
    m: Hi,
    M: Vi,
    p: h,
    q: Oi,
    Q: qi,
    s: Xi,
    S: Ri,
    u: Ei,
    U: Ii,
    V: Ni,
    w: Li,
    W: Wi,
    x: Y,
    X: m,
    y: rn,
    Y: nn,
    Z: zi,
    "%": ji
  };
  O.x = C(r, O), O.X = C(n, O), O.c = C(e, O), V.x = C(r, V), V.X = C(n, V), V.c = C(e, V);
  function C(M, S) {
    return function(E) {
      var d = [], X = -1, N = 0, Q = M.length, J, at, rt;
      for (E instanceof Date || (E = new Date(+E)); ++X < Q; )
        M.charCodeAt(X) === 37 && (d.push(M.slice(N, X)), (at = en[J = M.charAt(++X)]) != null ? J = M.charAt(++X) : at = J === "e" ? " " : "0", (rt = S[J]) && (J = rt(E, at)), d.push(J), N = X + 1);
      return d.push(M.slice(N, X)), d.join("");
    };
  }
  function U(M, S) {
    return function(E) {
      var d = Ft(1900, void 0, 1), X = w(d, M, E += "", 0), N, Q;
      if (X != E.length)
        return null;
      if ("Q" in d)
        return new Date(d.Q);
      if ("s" in d)
        return new Date(d.s * 1e3 + ("L" in d ? d.L : 0));
      if (S && !("Z" in d) && (d.Z = 0), "p" in d && (d.H = d.H % 12 + d.p * 12), d.m === void 0 && (d.m = "q" in d ? d.q : 0), "V" in d) {
        if (d.V < 1 || d.V > 53)
          return null;
        "w" in d || (d.w = 1), "Z" in d ? (N = fe(Ft(d.y, 0, 1)), Q = N.getUTCDay(), N = Q > 4 || Q === 0 ? Jt.ceil(N) : Jt(N), N = Ee.offset(N, (d.V - 1) * 7), d.y = N.getUTCFullYear(), d.m = N.getUTCMonth(), d.d = N.getUTCDate() + (d.w + 6) % 7) : (N = le(Ft(d.y, 0, 1)), Q = N.getDay(), N = Q > 4 || Q === 0 ? $t.ceil(N) : $t(N), N = Mt.offset(N, (d.V - 1) * 7), d.y = N.getFullYear(), d.m = N.getMonth(), d.d = N.getDate() + (d.w + 6) % 7);
      } else
        ("W" in d || "U" in d) && ("w" in d || (d.w = "u" in d ? d.u % 7 : "W" in d ? 1 : 0), Q = "Z" in d ? fe(Ft(d.y, 0, 1)).getUTCDay() : le(Ft(d.y, 0, 1)).getDay(), d.m = 0, d.d = "W" in d ? (d.w + 6) % 7 + d.W * 7 - (Q + 5) % 7 : d.w + d.U * 7 - (Q + 6) % 7);
      return "Z" in d ? (d.H += d.Z / 100 | 0, d.M += d.Z % 100, fe(d)) : le(d);
    };
  }
  function w(M, S, E, d) {
    for (var X = 0, N = S.length, Q = E.length, J, at; X < N; ) {
      if (d >= Q)
        return -1;
      if (J = S.charCodeAt(X++), J === 37) {
        if (J = S.charAt(X++), at = P[J in en ? S.charAt(X++) : J], !at || (d = at(M, E, d)) < 0)
          return -1;
      } else if (J != E.charCodeAt(d++))
        return -1;
    }
    return d;
  }
  function h(M, S, E) {
    var d = f.exec(S.slice(E));
    return d ? (M.p = x.get(d[0].toLowerCase()), E + d[0].length) : -1;
  }
  function g(M, S, E) {
    var d = D.exec(S.slice(E));
    return d ? (M.w = z.get(d[0].toLowerCase()), E + d[0].length) : -1;
  }
  function u(M, S, E) {
    var d = p.exec(S.slice(E));
    return d ? (M.w = v.get(d[0].toLowerCase()), E + d[0].length) : -1;
  }
  function l(M, S, E) {
    var d = I.exec(S.slice(E));
    return d ? (M.m = W.get(d[0].toLowerCase()), E + d[0].length) : -1;
  }
  function b(M, S, E) {
    var d = T.exec(S.slice(E));
    return d ? (M.m = _.get(d[0].toLowerCase()), E + d[0].length) : -1;
  }
  function o(M, S, E) {
    return w(M, e, S, E);
  }
  function Y(M, S, E) {
    return w(M, r, S, E);
  }
  function m(M, S, E) {
    return w(M, n, S, E);
  }
  function Z(M) {
    return s[M.getDay()];
  }
  function j(M) {
    return a[M.getDay()];
  }
  function B(M) {
    return y[M.getMonth()];
  }
  function k(M) {
    return c[M.getMonth()];
  }
  function A(M) {
    return i[+(M.getHours() >= 12)];
  }
  function F(M) {
    return 1 + ~~(M.getMonth() / 3);
  }
  function L(M) {
    return s[M.getUTCDay()];
  }
  function H(M) {
    return a[M.getUTCDay()];
  }
  function $(M) {
    return y[M.getUTCMonth()];
  }
  function q(M) {
    return c[M.getUTCMonth()];
  }
  function ht(M) {
    return i[+(M.getUTCHours() >= 12)];
  }
  function G(M) {
    return 1 + ~~(M.getUTCMonth() / 3);
  }
  return {
    format: function(M) {
      var S = C(M += "", O);
      return S.toString = function() {
        return M;
      }, S;
    },
    parse: function(M) {
      var S = U(M += "", !1);
      return S.toString = function() {
        return M;
      }, S;
    },
    utcFormat: function(M) {
      var S = C(M += "", V);
      return S.toString = function() {
        return M;
      }, S;
    },
    utcParse: function(M) {
      var S = U(M += "", !0);
      return S.toString = function() {
        return M;
      }, S;
    }
  };
}
var en = { "-": "", _: " ", 0: "0" }, et = /^\s*\d+/, Fi = /^%/, Yi = /[\\^$*+?|[\]().{}]/g;
function R(t, e, r) {
  var n = t < 0 ? "-" : "", i = (n ? -t : t) + "", a = i.length;
  return n + (a < r ? new Array(r - a + 1).join(e) + i : i);
}
function Ui(t) {
  return t.replace(Yi, "\\$&");
}
function Yt(t) {
  return new RegExp("^(?:" + t.map(Ui).join("|") + ")", "i");
}
function Ut(t) {
  return new Map(t.map((e, r) => [e.toLowerCase(), r]));
}
function Li(t, e, r) {
  var n = et.exec(e.slice(r, r + 1));
  return n ? (t.w = +n[0], r + n[0].length) : -1;
}
function Ei(t, e, r) {
  var n = et.exec(e.slice(r, r + 1));
  return n ? (t.u = +n[0], r + n[0].length) : -1;
}
function Ii(t, e, r) {
  var n = et.exec(e.slice(r, r + 2));
  return n ? (t.U = +n[0], r + n[0].length) : -1;
}
function Ni(t, e, r) {
  var n = et.exec(e.slice(r, r + 2));
  return n ? (t.V = +n[0], r + n[0].length) : -1;
}
function Wi(t, e, r) {
  var n = et.exec(e.slice(r, r + 2));
  return n ? (t.W = +n[0], r + n[0].length) : -1;
}
function nn(t, e, r) {
  var n = et.exec(e.slice(r, r + 4));
  return n ? (t.y = +n[0], r + n[0].length) : -1;
}
function rn(t, e, r) {
  var n = et.exec(e.slice(r, r + 2));
  return n ? (t.y = +n[0] + (+n[0] > 68 ? 1900 : 2e3), r + n[0].length) : -1;
}
function zi(t, e, r) {
  var n = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(e.slice(r, r + 6));
  return n ? (t.Z = n[1] ? 0 : -(n[2] + (n[3] || "00")), r + n[0].length) : -1;
}
function Oi(t, e, r) {
  var n = et.exec(e.slice(r, r + 1));
  return n ? (t.q = n[0] * 3 - 3, r + n[0].length) : -1;
}
function Hi(t, e, r) {
  var n = et.exec(e.slice(r, r + 2));
  return n ? (t.m = n[0] - 1, r + n[0].length) : -1;
}
function an(t, e, r) {
  var n = et.exec(e.slice(r, r + 2));
  return n ? (t.d = +n[0], r + n[0].length) : -1;
}
function Pi(t, e, r) {
  var n = et.exec(e.slice(r, r + 3));
  return n ? (t.m = 0, t.d = +n[0], r + n[0].length) : -1;
}
function sn(t, e, r) {
  var n = et.exec(e.slice(r, r + 2));
  return n ? (t.H = +n[0], r + n[0].length) : -1;
}
function Vi(t, e, r) {
  var n = et.exec(e.slice(r, r + 2));
  return n ? (t.M = +n[0], r + n[0].length) : -1;
}
function Ri(t, e, r) {
  var n = et.exec(e.slice(r, r + 2));
  return n ? (t.S = +n[0], r + n[0].length) : -1;
}
function Bi(t, e, r) {
  var n = et.exec(e.slice(r, r + 3));
  return n ? (t.L = +n[0], r + n[0].length) : -1;
}
function Zi(t, e, r) {
  var n = et.exec(e.slice(r, r + 6));
  return n ? (t.L = Math.floor(n[0] / 1e3), r + n[0].length) : -1;
}
function ji(t, e, r) {
  var n = Fi.exec(e.slice(r, r + 1));
  return n ? r + n[0].length : -1;
}
function qi(t, e, r) {
  var n = et.exec(e.slice(r));
  return n ? (t.Q = +n[0], r + n[0].length) : -1;
}
function Xi(t, e, r) {
  var n = et.exec(e.slice(r));
  return n ? (t.s = +n[0], r + n[0].length) : -1;
}
function on(t, e) {
  return R(t.getDate(), e, 2);
}
function Gi(t, e) {
  return R(t.getHours(), e, 2);
}
function $i(t, e) {
  return R(t.getHours() % 12 || 12, e, 2);
}
function Qi(t, e) {
  return R(1 + Mt.count(dt(t), t), e, 3);
}
function Rn(t, e) {
  return R(t.getMilliseconds(), e, 3);
}
function Ji(t, e) {
  return Rn(t, e) + "000";
}
function Ki(t, e) {
  return R(t.getMonth() + 1, e, 2);
}
function ta(t, e) {
  return R(t.getMinutes(), e, 2);
}
function ea(t, e) {
  return R(t.getSeconds(), e, 2);
}
function na(t) {
  var e = t.getDay();
  return e === 0 ? 7 : e;
}
function ra(t, e) {
  return R(wt.count(dt(t) - 1, t), e, 2);
}
function Bn(t) {
  var e = t.getDay();
  return e >= 4 || e === 0 ? Dt(t) : Dt.ceil(t);
}
function ia(t, e) {
  return t = Bn(t), R(Dt.count(dt(t), t) + (dt(t).getDay() === 4), e, 2);
}
function aa(t) {
  return t.getDay();
}
function sa(t, e) {
  return R($t.count(dt(t) - 1, t), e, 2);
}
function oa(t, e) {
  return R(t.getFullYear() % 100, e, 2);
}
function ca(t, e) {
  return t = Bn(t), R(t.getFullYear() % 100, e, 2);
}
function ua(t, e) {
  return R(t.getFullYear() % 1e4, e, 4);
}
function la(t, e) {
  var r = t.getDay();
  return t = r >= 4 || r === 0 ? Dt(t) : Dt.ceil(t), R(t.getFullYear() % 1e4, e, 4);
}
function fa(t) {
  var e = t.getTimezoneOffset();
  return (e > 0 ? "-" : (e *= -1, "+")) + R(e / 60 | 0, "0", 2) + R(e % 60, "0", 2);
}
function cn(t, e) {
  return R(t.getUTCDate(), e, 2);
}
function ha(t, e) {
  return R(t.getUTCHours(), e, 2);
}
function ma(t, e) {
  return R(t.getUTCHours() % 12 || 12, e, 2);
}
function da(t, e) {
  return R(1 + Ee.count(St(t), t), e, 3);
}
function Zn(t, e) {
  return R(t.getUTCMilliseconds(), e, 3);
}
function ga(t, e) {
  return Zn(t, e) + "000";
}
function ya(t, e) {
  return R(t.getUTCMonth() + 1, e, 2);
}
function pa(t, e) {
  return R(t.getUTCMinutes(), e, 2);
}
function ka(t, e) {
  return R(t.getUTCSeconds(), e, 2);
}
function va(t) {
  var e = t.getUTCDay();
  return e === 0 ? 7 : e;
}
function Ta(t, e) {
  return R(Ie.count(St(t) - 1, t), e, 2);
}
function jn(t) {
  var e = t.getUTCDay();
  return e >= 4 || e === 0 ? Ct(t) : Ct.ceil(t);
}
function xa(t, e) {
  return t = jn(t), R(Ct.count(St(t), t) + (St(t).getUTCDay() === 4), e, 2);
}
function ba(t) {
  return t.getUTCDay();
}
function Ma(t, e) {
  return R(Jt.count(St(t) - 1, t), e, 2);
}
function wa(t, e) {
  return R(t.getUTCFullYear() % 100, e, 2);
}
function Da(t, e) {
  return t = jn(t), R(t.getUTCFullYear() % 100, e, 2);
}
function Ca(t, e) {
  return R(t.getUTCFullYear() % 1e4, e, 4);
}
function Sa(t, e) {
  var r = t.getUTCDay();
  return t = r >= 4 || r === 0 ? Ct(t) : Ct.ceil(t), R(t.getUTCFullYear() % 1e4, e, 4);
}
function _a() {
  return "+0000";
}
function un() {
  return "%";
}
function ln(t) {
  return +t;
}
function fn(t) {
  return Math.floor(+t / 1e3);
}
var pt, Kt;
Aa({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
});
function Aa(t) {
  return pt = Ai(t), Kt = pt.format, pt.parse, pt.utcFormat, pt.utcParse, pt;
}
function Fa(t) {
  return new Date(t);
}
function Ya(t) {
  return t instanceof Date ? +t : +new Date(+t);
}
function qn(t, e, r, n, i, a, s, c, y, f) {
  var x = Yn(), p = x.invert, v = x.domain, D = f(".%L"), z = f(":%S"), T = f("%I:%M"), _ = f("%I %p"), I = f("%a %d"), W = f("%b %d"), O = f("%B"), V = f("%Y");
  function P(C) {
    return (y(C) < C ? D : c(C) < C ? z : s(C) < C ? T : a(C) < C ? _ : n(C) < C ? i(C) < C ? I : W : r(C) < C ? O : V)(C);
  }
  return x.invert = function(C) {
    return new Date(p(C));
  }, x.domain = function(C) {
    return arguments.length ? v(Array.from(C, Ya)) : v().map(Fa);
  }, x.ticks = function(C) {
    var U = v();
    return t(U[0], U[U.length - 1], C ?? 10);
  }, x.tickFormat = function(C, U) {
    return U == null ? P : f(U);
  }, x.nice = function(C) {
    var U = v();
    return (!C || typeof C.range != "function") && (C = e(U[0], U[U.length - 1], C ?? 10)), C ? v(di(U, C)) : x;
  }, x.copy = function() {
    return Fn(x, qn(t, e, r, n, i, a, s, c, y, f));
  }, x;
}
function Ua() {
  return pn.apply(qn(Si, _i, dt, Qt, wt, Mt, Gt, Xt, Lt, Kt).domain([new Date(2e3, 0, 1), new Date(2e3, 0, 2)]), arguments);
}
var xe = function() {
  var t = function(w, h, g, u) {
    for (g = g || {}, u = w.length; u--; g[w[u]] = h)
      ;
    return g;
  }, e = [1, 3], r = [1, 5], n = [7, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 23, 25, 26, 28, 35, 40], i = [1, 15], a = [1, 16], s = [1, 17], c = [1, 18], y = [1, 19], f = [1, 20], x = [1, 21], p = [1, 22], v = [1, 23], D = [1, 24], z = [1, 25], T = [1, 26], _ = [1, 27], I = [1, 29], W = [1, 31], O = [1, 34], V = [5, 7, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 23, 25, 26, 28, 35, 40], P = {
    trace: function() {
    },
    yy: {},
    symbols_: { error: 2, start: 3, directive: 4, gantt: 5, document: 6, EOF: 7, line: 8, SPACE: 9, statement: 10, NL: 11, dateFormat: 12, inclusiveEndDates: 13, topAxis: 14, axisFormat: 15, tickInterval: 16, excludes: 17, includes: 18, todayMarker: 19, title: 20, acc_title: 21, acc_title_value: 22, acc_descr: 23, acc_descr_value: 24, acc_descr_multiline_value: 25, section: 26, clickStatement: 27, taskTxt: 28, taskData: 29, openDirective: 30, typeDirective: 31, closeDirective: 32, ":": 33, argDirective: 34, click: 35, callbackname: 36, callbackargs: 37, href: 38, clickStatementDebug: 39, open_directive: 40, type_directive: 41, arg_directive: 42, close_directive: 43, $accept: 0, $end: 1 },
    terminals_: { 2: "error", 5: "gantt", 7: "EOF", 9: "SPACE", 11: "NL", 12: "dateFormat", 13: "inclusiveEndDates", 14: "topAxis", 15: "axisFormat", 16: "tickInterval", 17: "excludes", 18: "includes", 19: "todayMarker", 20: "title", 21: "acc_title", 22: "acc_title_value", 23: "acc_descr", 24: "acc_descr_value", 25: "acc_descr_multiline_value", 26: "section", 28: "taskTxt", 29: "taskData", 33: ":", 35: "click", 36: "callbackname", 37: "callbackargs", 38: "href", 40: "open_directive", 41: "type_directive", 42: "arg_directive", 43: "close_directive" },
    productions_: [0, [3, 2], [3, 3], [6, 0], [6, 2], [8, 2], [8, 1], [8, 1], [8, 1], [10, 1], [10, 1], [10, 1], [10, 1], [10, 1], [10, 1], [10, 1], [10, 1], [10, 1], [10, 2], [10, 2], [10, 1], [10, 1], [10, 1], [10, 2], [10, 1], [4, 4], [4, 6], [27, 2], [27, 3], [27, 3], [27, 4], [27, 3], [27, 4], [27, 2], [39, 2], [39, 3], [39, 3], [39, 4], [39, 3], [39, 4], [39, 2], [30, 1], [31, 1], [34, 1], [32, 1]],
    performAction: function(h, g, u, l, b, o, Y) {
      var m = o.length - 1;
      switch (b) {
        case 2:
          return o[m - 1];
        case 3:
          this.$ = [];
          break;
        case 4:
          o[m - 1].push(o[m]), this.$ = o[m - 1];
          break;
        case 5:
        case 6:
          this.$ = o[m];
          break;
        case 7:
        case 8:
          this.$ = [];
          break;
        case 9:
          l.setDateFormat(o[m].substr(11)), this.$ = o[m].substr(11);
          break;
        case 10:
          l.enableInclusiveEndDates(), this.$ = o[m].substr(18);
          break;
        case 11:
          l.TopAxis(), this.$ = o[m].substr(8);
          break;
        case 12:
          l.setAxisFormat(o[m].substr(11)), this.$ = o[m].substr(11);
          break;
        case 13:
          l.setTickInterval(o[m].substr(13)), this.$ = o[m].substr(13);
          break;
        case 14:
          l.setExcludes(o[m].substr(9)), this.$ = o[m].substr(9);
          break;
        case 15:
          l.setIncludes(o[m].substr(9)), this.$ = o[m].substr(9);
          break;
        case 16:
          l.setTodayMarker(o[m].substr(12)), this.$ = o[m].substr(12);
          break;
        case 17:
          l.setDiagramTitle(o[m].substr(6)), this.$ = o[m].substr(6);
          break;
        case 18:
          this.$ = o[m].trim(), l.setAccTitle(this.$);
          break;
        case 19:
        case 20:
          this.$ = o[m].trim(), l.setAccDescription(this.$);
          break;
        case 21:
          l.addSection(o[m].substr(8)), this.$ = o[m].substr(8);
          break;
        case 23:
          l.addTask(o[m - 1], o[m]), this.$ = "task";
          break;
        case 27:
          this.$ = o[m - 1], l.setClickEvent(o[m - 1], o[m], null);
          break;
        case 28:
          this.$ = o[m - 2], l.setClickEvent(o[m - 2], o[m - 1], o[m]);
          break;
        case 29:
          this.$ = o[m - 2], l.setClickEvent(o[m - 2], o[m - 1], null), l.setLink(o[m - 2], o[m]);
          break;
        case 30:
          this.$ = o[m - 3], l.setClickEvent(o[m - 3], o[m - 2], o[m - 1]), l.setLink(o[m - 3], o[m]);
          break;
        case 31:
          this.$ = o[m - 2], l.setClickEvent(o[m - 2], o[m], null), l.setLink(o[m - 2], o[m - 1]);
          break;
        case 32:
          this.$ = o[m - 3], l.setClickEvent(o[m - 3], o[m - 1], o[m]), l.setLink(o[m - 3], o[m - 2]);
          break;
        case 33:
          this.$ = o[m - 1], l.setLink(o[m - 1], o[m]);
          break;
        case 34:
        case 40:
          this.$ = o[m - 1] + " " + o[m];
          break;
        case 35:
        case 36:
        case 38:
          this.$ = o[m - 2] + " " + o[m - 1] + " " + o[m];
          break;
        case 37:
        case 39:
          this.$ = o[m - 3] + " " + o[m - 2] + " " + o[m - 1] + " " + o[m];
          break;
        case 41:
          l.parseDirective("%%{", "open_directive");
          break;
        case 42:
          l.parseDirective(o[m], "type_directive");
          break;
        case 43:
          o[m] = o[m].trim().replace(/'/g, '"'), l.parseDirective(o[m], "arg_directive");
          break;
        case 44:
          l.parseDirective("}%%", "close_directive", "gantt");
          break;
      }
    },
    table: [{ 3: 1, 4: 2, 5: e, 30: 4, 40: r }, { 1: [3] }, { 3: 6, 4: 2, 5: e, 30: 4, 40: r }, t(n, [2, 3], { 6: 7 }), { 31: 8, 41: [1, 9] }, { 41: [2, 41] }, { 1: [2, 1] }, { 4: 30, 7: [1, 10], 8: 11, 9: [1, 12], 10: 13, 11: [1, 14], 12: i, 13: a, 14: s, 15: c, 16: y, 17: f, 18: x, 19: p, 20: v, 21: D, 23: z, 25: T, 26: _, 27: 28, 28: I, 30: 4, 35: W, 40: r }, { 32: 32, 33: [1, 33], 43: O }, t([33, 43], [2, 42]), t(n, [2, 8], { 1: [2, 2] }), t(n, [2, 4]), { 4: 30, 10: 35, 12: i, 13: a, 14: s, 15: c, 16: y, 17: f, 18: x, 19: p, 20: v, 21: D, 23: z, 25: T, 26: _, 27: 28, 28: I, 30: 4, 35: W, 40: r }, t(n, [2, 6]), t(n, [2, 7]), t(n, [2, 9]), t(n, [2, 10]), t(n, [2, 11]), t(n, [2, 12]), t(n, [2, 13]), t(n, [2, 14]), t(n, [2, 15]), t(n, [2, 16]), t(n, [2, 17]), { 22: [1, 36] }, { 24: [1, 37] }, t(n, [2, 20]), t(n, [2, 21]), t(n, [2, 22]), { 29: [1, 38] }, t(n, [2, 24]), { 36: [1, 39], 38: [1, 40] }, { 11: [1, 41] }, { 34: 42, 42: [1, 43] }, { 11: [2, 44] }, t(n, [2, 5]), t(n, [2, 18]), t(n, [2, 19]), t(n, [2, 23]), t(n, [2, 27], { 37: [1, 44], 38: [1, 45] }), t(n, [2, 33], { 36: [1, 46] }), t(V, [2, 25]), { 32: 47, 43: O }, { 43: [2, 43] }, t(n, [2, 28], { 38: [1, 48] }), t(n, [2, 29]), t(n, [2, 31], { 37: [1, 49] }), { 11: [1, 50] }, t(n, [2, 30]), t(n, [2, 32]), t(V, [2, 26])],
    defaultActions: { 5: [2, 41], 6: [2, 1], 34: [2, 44], 43: [2, 43] },
    parseError: function(h, g) {
      if (g.recoverable)
        this.trace(h);
      else {
        var u = new Error(h);
        throw u.hash = g, u;
      }
    },
    parse: function(h) {
      var g = this, u = [0], l = [], b = [null], o = [], Y = this.table, m = "", Z = 0, j = 0, B = 2, k = 1, A = o.slice.call(arguments, 1), F = Object.create(this.lexer), L = { yy: {} };
      for (var H in this.yy)
        Object.prototype.hasOwnProperty.call(this.yy, H) && (L.yy[H] = this.yy[H]);
      F.setInput(h, L.yy), L.yy.lexer = F, L.yy.parser = this, typeof F.yylloc > "u" && (F.yylloc = {});
      var $ = F.yylloc;
      o.push($);
      var q = F.options && F.options.ranges;
      typeof L.yy.parseError == "function" ? this.parseError = L.yy.parseError : this.parseError = Object.getPrototypeOf(this).parseError;
      function ht() {
        var rt;
        return rt = l.pop() || F.lex() || k, typeof rt != "number" && (rt instanceof Array && (l = rt, rt = l.pop()), rt = g.symbols_[rt] || rt), rt;
      }
      for (var G, M, S, E, d = {}, X, N, Q, J; ; ) {
        if (M = u[u.length - 1], this.defaultActions[M] ? S = this.defaultActions[M] : ((G === null || typeof G > "u") && (G = ht()), S = Y[M] && Y[M][G]), typeof S > "u" || !S.length || !S[0]) {
          var at = "";
          J = [];
          for (X in Y[M])
            this.terminals_[X] && X > B && J.push("'" + this.terminals_[X] + "'");
          F.showPosition ? at = "Parse error on line " + (Z + 1) + `:
` + F.showPosition() + `
Expecting ` + J.join(", ") + ", got '" + (this.terminals_[G] || G) + "'" : at = "Parse error on line " + (Z + 1) + ": Unexpected " + (G == k ? "end of input" : "'" + (this.terminals_[G] || G) + "'"), this.parseError(at, {
            text: F.match,
            token: this.terminals_[G] || G,
            line: F.yylineno,
            loc: $,
            expected: J
          });
        }
        if (S[0] instanceof Array && S.length > 1)
          throw new Error("Parse Error: multiple actions possible at state: " + M + ", token: " + G);
        switch (S[0]) {
          case 1:
            u.push(G), b.push(F.yytext), o.push(F.yylloc), u.push(S[1]), G = null, j = F.yyleng, m = F.yytext, Z = F.yylineno, $ = F.yylloc;
            break;
          case 2:
            if (N = this.productions_[S[1]][1], d.$ = b[b.length - N], d._$ = {
              first_line: o[o.length - (N || 1)].first_line,
              last_line: o[o.length - 1].last_line,
              first_column: o[o.length - (N || 1)].first_column,
              last_column: o[o.length - 1].last_column
            }, q && (d._$.range = [
              o[o.length - (N || 1)].range[0],
              o[o.length - 1].range[1]
            ]), E = this.performAction.apply(d, [
              m,
              j,
              Z,
              L.yy,
              S[1],
              b,
              o
            ].concat(A)), typeof E < "u")
              return E;
            N && (u = u.slice(0, -1 * N * 2), b = b.slice(0, -1 * N), o = o.slice(0, -1 * N)), u.push(this.productions_[S[1]][0]), b.push(d.$), o.push(d._$), Q = Y[u[u.length - 2]][u[u.length - 1]], u.push(Q);
            break;
          case 3:
            return !0;
        }
      }
      return !0;
    }
  }, C = function() {
    var w = {
      EOF: 1,
      parseError: function(g, u) {
        if (this.yy.parser)
          this.yy.parser.parseError(g, u);
        else
          throw new Error(g);
      },
      // resets the lexer, sets new input
      setInput: function(h, g) {
        return this.yy = g || this.yy || {}, this._input = h, this._more = this._backtrack = this.done = !1, this.yylineno = this.yyleng = 0, this.yytext = this.matched = this.match = "", this.conditionStack = ["INITIAL"], this.yylloc = {
          first_line: 1,
          first_column: 0,
          last_line: 1,
          last_column: 0
        }, this.options.ranges && (this.yylloc.range = [0, 0]), this.offset = 0, this;
      },
      // consumes and returns one char from the input
      input: function() {
        var h = this._input[0];
        this.yytext += h, this.yyleng++, this.offset++, this.match += h, this.matched += h;
        var g = h.match(/(?:\r\n?|\n).*/g);
        return g ? (this.yylineno++, this.yylloc.last_line++) : this.yylloc.last_column++, this.options.ranges && this.yylloc.range[1]++, this._input = this._input.slice(1), h;
      },
      // unshifts one char (or a string) into the input
      unput: function(h) {
        var g = h.length, u = h.split(/(?:\r\n?|\n)/g);
        this._input = h + this._input, this.yytext = this.yytext.substr(0, this.yytext.length - g), this.offset -= g;
        var l = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1), this.matched = this.matched.substr(0, this.matched.length - 1), u.length - 1 && (this.yylineno -= u.length - 1);
        var b = this.yylloc.range;
        return this.yylloc = {
          first_line: this.yylloc.first_line,
          last_line: this.yylineno + 1,
          first_column: this.yylloc.first_column,
          last_column: u ? (u.length === l.length ? this.yylloc.first_column : 0) + l[l.length - u.length].length - u[0].length : this.yylloc.first_column - g
        }, this.options.ranges && (this.yylloc.range = [b[0], b[0] + this.yyleng - g]), this.yyleng = this.yytext.length, this;
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
      less: function(h) {
        this.unput(this.match.slice(h));
      },
      // displays already matched input, i.e. for error messages
      pastInput: function() {
        var h = this.matched.substr(0, this.matched.length - this.match.length);
        return (h.length > 20 ? "..." : "") + h.substr(-20).replace(/\n/g, "");
      },
      // displays upcoming input, i.e. for error messages
      upcomingInput: function() {
        var h = this.match;
        return h.length < 20 && (h += this._input.substr(0, 20 - h.length)), (h.substr(0, 20) + (h.length > 20 ? "..." : "")).replace(/\n/g, "");
      },
      // displays the character position where the lexing error occurred, i.e. for error messages
      showPosition: function() {
        var h = this.pastInput(), g = new Array(h.length + 1).join("-");
        return h + this.upcomingInput() + `
` + g + "^";
      },
      // test the lexed token: return FALSE when not a match, otherwise return token
      test_match: function(h, g) {
        var u, l, b;
        if (this.options.backtrack_lexer && (b = {
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
        }, this.options.ranges && (b.yylloc.range = this.yylloc.range.slice(0))), l = h[0].match(/(?:\r\n?|\n).*/g), l && (this.yylineno += l.length), this.yylloc = {
          first_line: this.yylloc.last_line,
          last_line: this.yylineno + 1,
          first_column: this.yylloc.last_column,
          last_column: l ? l[l.length - 1].length - l[l.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + h[0].length
        }, this.yytext += h[0], this.match += h[0], this.matches = h, this.yyleng = this.yytext.length, this.options.ranges && (this.yylloc.range = [this.offset, this.offset += this.yyleng]), this._more = !1, this._backtrack = !1, this._input = this._input.slice(h[0].length), this.matched += h[0], u = this.performAction.call(this, this.yy, this, g, this.conditionStack[this.conditionStack.length - 1]), this.done && this._input && (this.done = !1), u)
          return u;
        if (this._backtrack) {
          for (var o in b)
            this[o] = b[o];
          return !1;
        }
        return !1;
      },
      // return next match in input
      next: function() {
        if (this.done)
          return this.EOF;
        this._input || (this.done = !0);
        var h, g, u, l;
        this._more || (this.yytext = "", this.match = "");
        for (var b = this._currentRules(), o = 0; o < b.length; o++)
          if (u = this._input.match(this.rules[b[o]]), u && (!g || u[0].length > g[0].length)) {
            if (g = u, l = o, this.options.backtrack_lexer) {
              if (h = this.test_match(u, b[o]), h !== !1)
                return h;
              if (this._backtrack) {
                g = !1;
                continue;
              } else
                return !1;
            } else if (!this.options.flex)
              break;
          }
        return g ? (h = this.test_match(g, b[l]), h !== !1 ? h : !1) : this._input === "" ? this.EOF : this.parseError("Lexical error on line " + (this.yylineno + 1) + `. Unrecognized text.
` + this.showPosition(), {
          text: "",
          token: null,
          line: this.yylineno
        });
      },
      // return next match that has a token
      lex: function() {
        var g = this.next();
        return g || this.lex();
      },
      // activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
      begin: function(g) {
        this.conditionStack.push(g);
      },
      // pop the previously active lexer condition state off the condition stack
      popState: function() {
        var g = this.conditionStack.length - 1;
        return g > 0 ? this.conditionStack.pop() : this.conditionStack[0];
      },
      // produce the lexer rule set which is active for the currently active lexer condition state
      _currentRules: function() {
        return this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1] ? this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules : this.conditions.INITIAL.rules;
      },
      // return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
      topState: function(g) {
        return g = this.conditionStack.length - 1 - Math.abs(g || 0), g >= 0 ? this.conditionStack[g] : "INITIAL";
      },
      // alias for begin(condition)
      pushState: function(g) {
        this.begin(g);
      },
      // return the number of states currently on the stack
      stateStackSize: function() {
        return this.conditionStack.length;
      },
      options: { "case-insensitive": !0 },
      performAction: function(g, u, l, b) {
        switch (l) {
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
    return w;
  }();
  P.lexer = C;
  function U() {
    this.yy = {};
  }
  return U.prototype = P, P.Parser = U, new U();
}();
xe.parser = xe;
const La = xe;
var be = {}, Ea = {
  get exports() {
    return be;
  },
  set exports(t) {
    be = t;
  }
};
(function(t, e) {
  (function(r, n) {
    t.exports = n();
  })(_e, function() {
    var r = "day";
    return function(n, i, a) {
      var s = function(f) {
        return f.add(4 - f.isoWeekday(), r);
      }, c = i.prototype;
      c.isoWeekYear = function() {
        return s(this).year();
      }, c.isoWeek = function(f) {
        if (!this.$utils().u(f))
          return this.add(7 * (f - this.isoWeek()), r);
        var x, p, v, D, z = s(this), T = (x = this.isoWeekYear(), p = this.$u, v = (p ? a.utc : a)().year(x).startOf("year"), D = 4 - v.isoWeekday(), v.isoWeekday() > 4 && (D += 7), v.add(D, r));
        return z.diff(T, "week") + 1;
      }, c.isoWeekday = function(f) {
        return this.$utils().u(f) ? this.day() || 7 : this.day(this.day() % 7 ? f : f - 7);
      };
      var y = c.startOf;
      c.startOf = function(f, x) {
        var p = this.$utils(), v = !!p.u(x) || x;
        return p.p(f) === "isoweek" ? v ? this.date(this.date() - (this.isoWeekday() - 1)).startOf("day") : this.date(this.date() - 1 - (this.isoWeekday() - 1) + 7).endOf("day") : y.bind(this)(f, x);
      };
    };
  });
})(Ea);
const Ia = be;
var Me = {}, Na = {
  get exports() {
    return Me;
  },
  set exports(t) {
    Me = t;
  }
};
(function(t, e) {
  (function(r, n) {
    t.exports = n();
  })(_e, function() {
    var r = { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" }, n = /(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|YYYY|YY?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g, i = /\d\d/, a = /\d\d?/, s = /\d*[^-_:/,()\s\d]+/, c = {}, y = function(T) {
      return (T = +T) + (T > 68 ? 1900 : 2e3);
    }, f = function(T) {
      return function(_) {
        this[T] = +_;
      };
    }, x = [/[+-]\d\d:?(\d\d)?|Z/, function(T) {
      (this.zone || (this.zone = {})).offset = function(_) {
        if (!_ || _ === "Z")
          return 0;
        var I = _.match(/([+-]|\d\d)/g), W = 60 * I[1] + (+I[2] || 0);
        return W === 0 ? 0 : I[0] === "+" ? -W : W;
      }(T);
    }], p = function(T) {
      var _ = c[T];
      return _ && (_.indexOf ? _ : _.s.concat(_.f));
    }, v = function(T, _) {
      var I, W = c.meridiem;
      if (W) {
        for (var O = 1; O <= 24; O += 1)
          if (T.indexOf(W(O, 0, _)) > -1) {
            I = O > 12;
            break;
          }
      } else
        I = T === (_ ? "pm" : "PM");
      return I;
    }, D = { A: [s, function(T) {
      this.afternoon = v(T, !1);
    }], a: [s, function(T) {
      this.afternoon = v(T, !0);
    }], S: [/\d/, function(T) {
      this.milliseconds = 100 * +T;
    }], SS: [i, function(T) {
      this.milliseconds = 10 * +T;
    }], SSS: [/\d{3}/, function(T) {
      this.milliseconds = +T;
    }], s: [a, f("seconds")], ss: [a, f("seconds")], m: [a, f("minutes")], mm: [a, f("minutes")], H: [a, f("hours")], h: [a, f("hours")], HH: [a, f("hours")], hh: [a, f("hours")], D: [a, f("day")], DD: [i, f("day")], Do: [s, function(T) {
      var _ = c.ordinal, I = T.match(/\d+/);
      if (this.day = I[0], _)
        for (var W = 1; W <= 31; W += 1)
          _(W).replace(/\[|\]/g, "") === T && (this.day = W);
    }], M: [a, f("month")], MM: [i, f("month")], MMM: [s, function(T) {
      var _ = p("months"), I = (p("monthsShort") || _.map(function(W) {
        return W.slice(0, 3);
      })).indexOf(T) + 1;
      if (I < 1)
        throw new Error();
      this.month = I % 12 || I;
    }], MMMM: [s, function(T) {
      var _ = p("months").indexOf(T) + 1;
      if (_ < 1)
        throw new Error();
      this.month = _ % 12 || _;
    }], Y: [/[+-]?\d+/, f("year")], YY: [i, function(T) {
      this.year = y(T);
    }], YYYY: [/\d{4}/, f("year")], Z: x, ZZ: x };
    function z(T) {
      var _, I;
      _ = T, I = c && c.formats;
      for (var W = (T = _.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, function(h, g, u) {
        var l = u && u.toUpperCase();
        return g || I[u] || r[u] || I[l].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, function(b, o, Y) {
          return o || Y.slice(1);
        });
      })).match(n), O = W.length, V = 0; V < O; V += 1) {
        var P = W[V], C = D[P], U = C && C[0], w = C && C[1];
        W[V] = w ? { regex: U, parser: w } : P.replace(/^\[|\]$/g, "");
      }
      return function(h) {
        for (var g = {}, u = 0, l = 0; u < O; u += 1) {
          var b = W[u];
          if (typeof b == "string")
            l += b.length;
          else {
            var o = b.regex, Y = b.parser, m = h.slice(l), Z = o.exec(m)[0];
            Y.call(g, Z), h = h.replace(Z, "");
          }
        }
        return function(j) {
          var B = j.afternoon;
          if (B !== void 0) {
            var k = j.hours;
            B ? k < 12 && (j.hours += 12) : k === 12 && (j.hours = 0), delete j.afternoon;
          }
        }(g), g;
      };
    }
    return function(T, _, I) {
      I.p.customParseFormat = !0, T && T.parseTwoDigitYear && (y = T.parseTwoDigitYear);
      var W = _.prototype, O = W.parse;
      W.parse = function(V) {
        var P = V.date, C = V.utc, U = V.args;
        this.$u = C;
        var w = U[1];
        if (typeof w == "string") {
          var h = U[2] === !0, g = U[3] === !0, u = h || g, l = U[2];
          g && (l = U[2]), c = this.$locale(), !h && l && (c = I.Ls[l]), this.$d = function(m, Z, j) {
            try {
              if (["x", "X"].indexOf(Z) > -1)
                return new Date((Z === "X" ? 1e3 : 1) * m);
              var B = z(Z)(m), k = B.year, A = B.month, F = B.day, L = B.hours, H = B.minutes, $ = B.seconds, q = B.milliseconds, ht = B.zone, G = new Date(), M = F || (k || A ? 1 : G.getDate()), S = k || G.getFullYear(), E = 0;
              k && !A || (E = A > 0 ? A - 1 : G.getMonth());
              var d = L || 0, X = H || 0, N = $ || 0, Q = q || 0;
              return ht ? new Date(Date.UTC(S, E, M, d, X, N, Q + 60 * ht.offset * 1e3)) : j ? new Date(Date.UTC(S, E, M, d, X, N, Q)) : new Date(S, E, M, d, X, N, Q);
            } catch {
              return new Date("");
            }
          }(P, w, C), this.init(), l && l !== !0 && (this.$L = this.locale(l).$L), u && P != this.format(w) && (this.$d = new Date("")), c = {};
        } else if (w instanceof Array)
          for (var b = w.length, o = 1; o <= b; o += 1) {
            U[1] = w[o - 1];
            var Y = I.apply(this, U);
            if (Y.isValid()) {
              this.$d = Y.$d, this.$L = Y.$L, this.init();
              break;
            }
            o === b && (this.$d = new Date(""));
          }
        else
          O.call(this, V);
      };
    };
  });
})(Na);
const Wa = Me;
var we = {}, za = {
  get exports() {
    return we;
  },
  set exports(t) {
    we = t;
  }
};
(function(t, e) {
  (function(r, n) {
    t.exports = n();
  })(_e, function() {
    return function(r, n) {
      var i = n.prototype, a = i.format;
      i.format = function(s) {
        var c = this, y = this.$locale();
        if (!this.isValid())
          return a.bind(this)(s);
        var f = this.$utils(), x = (s || "YYYY-MM-DDTHH:mm:ssZ").replace(/\[([^\]]+)]|Q|wo|ww|w|WW|W|zzz|z|gggg|GGGG|Do|X|x|k{1,2}|S/g, function(p) {
          switch (p) {
            case "Q":
              return Math.ceil((c.$M + 1) / 3);
            case "Do":
              return y.ordinal(c.$D);
            case "gggg":
              return c.weekYear();
            case "GGGG":
              return c.isoWeekYear();
            case "wo":
              return y.ordinal(c.week(), "W");
            case "w":
            case "ww":
              return f.s(c.week(), p === "w" ? 1 : 2, "0");
            case "W":
            case "WW":
              return f.s(c.isoWeek(), p === "W" ? 1 : 2, "0");
            case "k":
            case "kk":
              return f.s(String(c.$H === 0 ? 24 : c.$H), p === "k" ? 1 : 2, "0");
            case "X":
              return Math.floor(c.$d.getTime() / 1e3);
            case "x":
              return c.$d.getTime();
            case "z":
              return "[" + c.offsetName() + "]";
            case "zzz":
              return "[" + c.offsetName("long") + "]";
            default:
              return p;
          }
        });
        return a.bind(this)(x);
      };
    };
  });
})(za);
const Oa = we;
nt.extend(Ia);
nt.extend(Wa);
nt.extend(Oa);
let st = "", We = "", ze, Oe = "", Et = [], It = [], He = {}, Pe = [], te = [], _t = "", Ve = "";
const Xn = ["active", "done", "crit", "milestone"];
let Re = [], Nt = !1, Be = !1, De = 0;
const Ha = function(t, e, r) {
  kr.parseDirective(this, t, e, r);
}, Pa = function() {
  Pe = [], te = [], _t = "", Re = [], Vt = 0, Se = void 0, Rt = void 0, K = [], st = "", We = "", Ve = "", ze = void 0, Oe = "", Et = [], It = [], Nt = !1, Be = !1, De = 0, He = {}, yr();
}, Va = function(t) {
  We = t;
}, Ra = function() {
  return We;
}, Ba = function(t) {
  ze = t;
}, Za = function() {
  return ze;
}, ja = function(t) {
  Oe = t;
}, qa = function() {
  return Oe;
}, Xa = function(t) {
  st = t;
}, Ga = function() {
  Nt = !0;
}, $a = function() {
  return Nt;
}, Qa = function() {
  Be = !0;
}, Ja = function() {
  return Be;
}, Ka = function(t) {
  Ve = t;
}, ts = function() {
  return Ve;
}, es = function() {
  return st;
}, ns = function(t) {
  Et = t.toLowerCase().split(/[\s,]+/);
}, rs = function() {
  return Et;
}, is = function(t) {
  It = t.toLowerCase().split(/[\s,]+/);
}, as = function() {
  return It;
}, ss = function() {
  return He;
}, os = function(t) {
  _t = t, Pe.push(t);
}, cs = function() {
  return Pe;
}, us = function() {
  let t = hn();
  const e = 10;
  let r = 0;
  for (; !t && r < e; )
    t = hn(), r++;
  return te = K, te;
}, Gn = function(t, e, r, n) {
  return n.includes(t.format(e.trim())) ? !1 : t.isoWeekday() >= 6 && r.includes("weekends") || r.includes(t.format("dddd").toLowerCase()) ? !0 : r.includes(t.format(e.trim()));
}, $n = function(t, e, r, n) {
  if (!r.length || t.manualEndTime)
    return;
  let i;
  t.startTime instanceof Date ? i = nt(t.startTime) : i = nt(t.startTime, e, !0), i = i.add(1, "d");
  let a;
  t.endTime instanceof Date ? a = nt(t.endTime) : a = nt(t.endTime, e, !0);
  const [s, c] = ls(
    i,
    a,
    e,
    r,
    n
  );
  t.endTime = s.toDate(), t.renderEndTime = c;
}, ls = function(t, e, r, n, i) {
  let a = !1, s = null;
  for (; t <= e; )
    a || (s = e.toDate()), a = Gn(t, r, n, i), a && (e = e.add(1, "d")), t = t.add(1, "d");
  return [e, s];
}, Ce = function(t, e, r) {
  r = r.trim();
  const i = /^after\s+([\d\w- ]+)/.exec(r.trim());
  if (i !== null) {
    let s = null;
    if (i[1].split(" ").forEach(function(c) {
      let y = At(c);
      y !== void 0 && (s ? y.endTime > s.endTime && (s = y) : s = y);
    }), s)
      return s.endTime;
    {
      const c = new Date();
      return c.setHours(0, 0, 0, 0), c;
    }
  }
  let a = nt(r, e.trim(), !0);
  if (a.isValid())
    return a.toDate();
  {
    me.debug("Invalid date:" + r), me.debug("With date format:" + e.trim());
    const s = new Date(r);
    if (s === void 0 || isNaN(s.getTime()))
      throw new Error("Invalid date:" + r);
    return s;
  }
}, Qn = function(t) {
  const e = /^(\d+(?:\.\d+)?)([Mdhmswy]|ms)$/.exec(t.trim());
  return e !== null ? [Number.parseFloat(e[1]), e[2]] : [NaN, "ms"];
}, Jn = function(t, e, r, n = !1) {
  r = r.trim();
  let i = nt(r, e.trim(), !0);
  if (i.isValid())
    return n && (i = i.add(1, "d")), i.toDate();
  let a = nt(t);
  const [s, c] = Qn(r);
  if (!Number.isNaN(s)) {
    const y = a.add(s, c);
    y.isValid() && (a = y);
  }
  return a.toDate();
};
let Vt = 0;
const xt = function(t) {
  return t === void 0 ? (Vt = Vt + 1, "task" + Vt) : t;
}, fs = function(t, e) {
  let r;
  e.substr(0, 1) === ":" ? r = e.substr(1, e.length) : r = e;
  const n = r.split(","), i = {};
  nr(n, i, Xn);
  for (let s = 0; s < n.length; s++)
    n[s] = n[s].trim();
  let a = "";
  switch (n.length) {
    case 1:
      i.id = xt(), i.startTime = t.endTime, a = n[0];
      break;
    case 2:
      i.id = xt(), i.startTime = Ce(void 0, st, n[0]), a = n[1];
      break;
    case 3:
      i.id = xt(n[0]), i.startTime = Ce(void 0, st, n[1]), a = n[2];
      break;
  }
  return a && (i.endTime = Jn(i.startTime, st, a, Nt), i.manualEndTime = nt(a, "YYYY-MM-DD", !0).isValid(), $n(i, st, It, Et)), i;
}, hs = function(t, e) {
  let r;
  e.substr(0, 1) === ":" ? r = e.substr(1, e.length) : r = e;
  const n = r.split(","), i = {};
  nr(n, i, Xn);
  for (let a = 0; a < n.length; a++)
    n[a] = n[a].trim();
  switch (n.length) {
    case 1:
      i.id = xt(), i.startTime = {
        type: "prevTaskEnd",
        id: t
      }, i.endTime = {
        data: n[0]
      };
      break;
    case 2:
      i.id = xt(), i.startTime = {
        type: "getStartDate",
        startData: n[0]
      }, i.endTime = {
        data: n[1]
      };
      break;
    case 3:
      i.id = xt(n[0]), i.startTime = {
        type: "getStartDate",
        startData: n[1]
      }, i.endTime = {
        data: n[2]
      };
      break;
  }
  return i;
};
let Se, Rt, K = [];
const Kn = {}, ms = function(t, e) {
  const r = {
    section: _t,
    type: _t,
    processed: !1,
    manualEndTime: !1,
    renderEndTime: null,
    raw: { data: e },
    task: t,
    classes: []
  }, n = hs(Rt, e);
  r.raw.startTime = n.startTime, r.raw.endTime = n.endTime, r.id = n.id, r.prevTaskId = Rt, r.active = n.active, r.done = n.done, r.crit = n.crit, r.milestone = n.milestone, r.order = De, De++;
  const i = K.push(r);
  Rt = r.id, Kn[r.id] = i - 1;
}, At = function(t) {
  const e = Kn[t];
  return K[e];
}, ds = function(t, e) {
  const r = {
    section: _t,
    type: _t,
    description: t,
    task: t,
    classes: []
  }, n = fs(Se, e);
  r.startTime = n.startTime, r.endTime = n.endTime, r.id = n.id, r.active = n.active, r.done = n.done, r.crit = n.crit, r.milestone = n.milestone, Se = r, te.push(r);
}, hn = function() {
  const t = function(r) {
    const n = K[r];
    let i = "";
    switch (K[r].raw.startTime.type) {
      case "prevTaskEnd": {
        const a = At(n.prevTaskId);
        n.startTime = a.endTime;
        break;
      }
      case "getStartDate":
        i = Ce(void 0, st, K[r].raw.startTime.startData), i && (K[r].startTime = i);
        break;
    }
    return K[r].startTime && (K[r].endTime = Jn(
      K[r].startTime,
      st,
      K[r].raw.endTime.data,
      Nt
    ), K[r].endTime && (K[r].processed = !0, K[r].manualEndTime = nt(
      K[r].raw.endTime.data,
      "YYYY-MM-DD",
      !0
    ).isValid(), $n(K[r], st, It, Et))), K[r].processed;
  };
  let e = !0;
  for (const [r, n] of K.entries())
    t(r), e = e && n.processed;
  return e;
}, gs = function(t, e) {
  let r = e;
  vt().securityLevel !== "loose" && (r = rr(e)), t.split(",").forEach(function(n) {
    At(n) !== void 0 && (er(n, () => {
      window.open(r, "_self");
    }), He[n] = r);
  }), tr(t, "clickable");
}, tr = function(t, e) {
  t.split(",").forEach(function(r) {
    let n = At(r);
    n !== void 0 && n.classes.push(e);
  });
}, ys = function(t, e, r) {
  if (vt().securityLevel !== "loose" || e === void 0)
    return;
  let n = [];
  if (typeof r == "string") {
    n = r.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    for (let a = 0; a < n.length; a++) {
      let s = n[a].trim();
      s.charAt(0) === '"' && s.charAt(s.length - 1) === '"' && (s = s.substr(1, s.length - 2)), n[a] = s;
    }
  }
  n.length === 0 && n.push(t), At(t) !== void 0 && er(t, () => {
    ir.runFunc(e, ...n);
  });
}, er = function(t, e) {
  Re.push(
    function() {
      const r = document.querySelector(`[id="${t}"]`);
      r !== null && r.addEventListener("click", function() {
        e();
      });
    },
    function() {
      const r = document.querySelector(`[id="${t}-text"]`);
      r !== null && r.addEventListener("click", function() {
        e();
      });
    }
  );
}, ps = function(t, e, r) {
  t.split(",").forEach(function(n) {
    ys(n, e, r);
  }), tr(t, "clickable");
}, ks = function(t) {
  Re.forEach(function(e) {
    e(t);
  });
}, vs = {
  parseDirective: Ha,
  getConfig: () => vt().gantt,
  clear: Pa,
  setDateFormat: Xa,
  getDateFormat: es,
  enableInclusiveEndDates: Ga,
  endDatesAreInclusive: $a,
  enableTopAxis: Qa,
  topAxisEnabled: Ja,
  setAxisFormat: Va,
  getAxisFormat: Ra,
  setTickInterval: Ba,
  getTickInterval: Za,
  setTodayMarker: ja,
  getTodayMarker: qa,
  setAccTitle: lr,
  getAccTitle: fr,
  setDiagramTitle: hr,
  getDiagramTitle: mr,
  setDisplayMode: Ka,
  getDisplayMode: ts,
  setAccDescription: dr,
  getAccDescription: gr,
  addSection: os,
  getSections: cs,
  getTasks: us,
  addTask: ms,
  findTaskById: At,
  addTaskOrg: ds,
  setIncludes: ns,
  getIncludes: rs,
  setExcludes: is,
  getExcludes: as,
  setClickEvent: ps,
  setLink: gs,
  getLinks: ss,
  bindFunctions: ks,
  parseDuration: Qn,
  isInvalidDate: Gn
};
function nr(t, e, r) {
  let n = !0;
  for (; n; )
    n = !1, r.forEach(function(i) {
      const a = "^\\s*" + i + "\\s*$", s = new RegExp(a);
      t[0].match(s) && (e[i] = !0, t.shift(1), n = !0);
    });
}
const Ts = function() {
  me.debug("Something is calling, setConf, remove the call");
}, xs = (t, e) => {
  let r = [...t].map(() => -1 / 0), n = [...t].sort((a, s) => a.startTime - s.startTime || a.order - s.order), i = 0;
  for (const a of n)
    for (let s = 0; s < r.length; s++)
      if (a.startTime >= r[s]) {
        r[s] = a.endTime, a.order = s + e, s > i && (i = s);
        break;
      }
  return i;
};
let ct;
const bs = function(t, e, r, n) {
  const i = vt().gantt, a = vt().securityLevel;
  let s;
  a === "sandbox" && (s = Wt("#i" + e));
  const c = a === "sandbox" ? Wt(s.nodes()[0].contentDocument.body) : Wt("body"), y = a === "sandbox" ? s.nodes()[0].contentDocument : document, f = y.getElementById(e);
  ct = f.parentElement.offsetWidth, ct === void 0 && (ct = 1200), i.useWidth !== void 0 && (ct = i.useWidth);
  const x = n.db.getTasks();
  let p = [];
  for (const w of x)
    p.push(w.type);
  p = U(p);
  const v = {};
  let D = 2 * i.topPadding;
  if (n.db.getDisplayMode() === "compact" || i.displayMode === "compact") {
    const w = {};
    for (const g of x)
      w[g.section] === void 0 ? w[g.section] = [g] : w[g.section].push(g);
    let h = 0;
    for (const g of Object.keys(w)) {
      const u = xs(w[g], h) + 1;
      h += u, D += u * (i.barHeight + i.barGap), v[g] = u;
    }
  } else {
    D += x.length * (i.barHeight + i.barGap);
    for (const w of p)
      v[w] = x.filter((h) => h.type === w).length;
  }
  f.setAttribute("viewBox", "0 0 " + ct + " " + D);
  const z = c.select(`[id="${e}"]`), T = Ua().domain([
    Sr(x, function(w) {
      return w.startTime;
    }),
    Cr(x, function(w) {
      return w.endTime;
    })
  ]).rangeRound([0, ct - i.leftPadding - i.rightPadding]);
  function _(w, h) {
    const g = w.startTime, u = h.startTime;
    let l = 0;
    return g > u ? l = 1 : g < u && (l = -1), l;
  }
  x.sort(_), I(x, ct, D), ar(z, D, ct, i.useMaxWidth), z.append("text").text(n.db.getDiagramTitle()).attr("x", ct / 2).attr("y", i.titleTopMargin).attr("class", "titleText");
  function I(w, h, g) {
    const u = i.barHeight, l = u + i.barGap, b = i.topPadding, o = i.leftPadding, Y = Un().domain([0, p.length]).range(["#00B9FA", "#F95002"]).interpolate(Xr);
    O(
      l,
      b,
      o,
      h,
      g,
      w,
      n.db.getExcludes(),
      n.db.getIncludes()
    ), V(o, b, h, g), W(w, l, b, o, u, Y, h), P(l, b), C(o, b, h, g);
  }
  function W(w, h, g, u, l, b, o) {
    const m = [...new Set(w.map((k) => k.order))].map((k) => w.find((A) => A.order === k));
    z.append("g").selectAll("rect").data(m).enter().append("rect").attr("x", 0).attr("y", function(k, A) {
      return A = k.order, A * h + g - 2;
    }).attr("width", function() {
      return o - i.rightPadding / 2;
    }).attr("height", h).attr("class", function(k) {
      for (const [A, F] of p.entries())
        if (k.type === F)
          return "section section" + A % i.numberSectionStyles;
      return "section section0";
    });
    const Z = z.append("g").selectAll("rect").data(w).enter(), j = n.db.getLinks();
    if (Z.append("rect").attr("id", function(k) {
      return k.id;
    }).attr("rx", 3).attr("ry", 3).attr("x", function(k) {
      return k.milestone ? T(k.startTime) + u + 0.5 * (T(k.endTime) - T(k.startTime)) - 0.5 * l : T(k.startTime) + u;
    }).attr("y", function(k, A) {
      return A = k.order, A * h + g;
    }).attr("width", function(k) {
      return k.milestone ? l : T(k.renderEndTime || k.endTime) - T(k.startTime);
    }).attr("height", l).attr("transform-origin", function(k, A) {
      return A = k.order, (T(k.startTime) + u + 0.5 * (T(k.endTime) - T(k.startTime))).toString() + "px " + (A * h + g + 0.5 * l).toString() + "px";
    }).attr("class", function(k) {
      const A = "task";
      let F = "";
      k.classes.length > 0 && (F = k.classes.join(" "));
      let L = 0;
      for (const [$, q] of p.entries())
        k.type === q && (L = $ % i.numberSectionStyles);
      let H = "";
      return k.active ? k.crit ? H += " activeCrit" : H = " active" : k.done ? k.crit ? H = " doneCrit" : H = " done" : k.crit && (H += " crit"), H.length === 0 && (H = " task"), k.milestone && (H = " milestone " + H), H += L, H += " " + F, A + H;
    }), Z.append("text").attr("id", function(k) {
      return k.id + "-text";
    }).text(function(k) {
      return k.task;
    }).attr("font-size", i.fontSize).attr("x", function(k) {
      let A = T(k.startTime), F = T(k.renderEndTime || k.endTime);
      k.milestone && (A += 0.5 * (T(k.endTime) - T(k.startTime)) - 0.5 * l), k.milestone && (F = A + l);
      const L = this.getBBox().width;
      return L > F - A ? F + L + 1.5 * i.leftPadding > o ? A + u - 5 : F + u + 5 : (F - A) / 2 + A + u;
    }).attr("y", function(k, A) {
      return A = k.order, A * h + i.barHeight / 2 + (i.fontSize / 2 - 2) + g;
    }).attr("text-height", l).attr("class", function(k) {
      const A = T(k.startTime);
      let F = T(k.endTime);
      k.milestone && (F = A + l);
      const L = this.getBBox().width;
      let H = "";
      k.classes.length > 0 && (H = k.classes.join(" "));
      let $ = 0;
      for (const [ht, G] of p.entries())
        k.type === G && ($ = ht % i.numberSectionStyles);
      let q = "";
      return k.active && (k.crit ? q = "activeCritText" + $ : q = "activeText" + $), k.done ? k.crit ? q = q + " doneCritText" + $ : q = q + " doneText" + $ : k.crit && (q = q + " critText" + $), k.milestone && (q += " milestoneText"), L > F - A ? F + L + 1.5 * i.leftPadding > o ? H + " taskTextOutsideLeft taskTextOutside" + $ + " " + q : H + " taskTextOutsideRight taskTextOutside" + $ + " " + q + " width-" + L : H + " taskText taskText" + $ + " " + q + " width-" + L;
    }), vt().securityLevel === "sandbox") {
      let k;
      k = Wt("#i" + e);
      const A = k.nodes()[0].contentDocument;
      Z.filter(function(F) {
        return j[F.id] !== void 0;
      }).each(function(F) {
        var L = A.querySelector("#" + F.id), H = A.querySelector("#" + F.id + "-text");
        const $ = L.parentNode;
        var q = A.createElement("a");
        q.setAttribute("xlink:href", j[F.id]), q.setAttribute("target", "_top"), $.appendChild(q), q.appendChild(L), q.appendChild(H);
      });
    }
  }
  function O(w, h, g, u, l, b, o, Y) {
    const m = b.reduce(
      (L, { startTime: H }) => L ? Math.min(L, H) : H,
      0
    ), Z = b.reduce((L, { endTime: H }) => L ? Math.max(L, H) : H, 0), j = n.db.getDateFormat();
    if (!m || !Z)
      return;
    const B = [];
    let k = null, A = nt(m);
    for (; A.valueOf() <= Z; )
      n.db.isInvalidDate(A, j, o, Y) ? k ? k.end = A : k = {
        start: A,
        end: A
      } : k && (B.push(k), k = null), A = A.add(1, "d");
    z.append("g").selectAll("rect").data(B).enter().append("rect").attr("id", function(L) {
      return "exclude-" + L.start.format("YYYY-MM-DD");
    }).attr("x", function(L) {
      return T(L.start) + g;
    }).attr("y", i.gridLineStartPadding).attr("width", function(L) {
      const H = L.end.add(1, "day");
      return T(H) - T(L.start);
    }).attr("height", l - h - i.gridLineStartPadding).attr("transform-origin", function(L, H) {
      return (T(L.start) + g + 0.5 * (T(L.end) - T(L.start))).toString() + "px " + (H * w + 0.5 * l).toString() + "px";
    }).attr("class", "exclude-range");
  }
  function V(w, h, g, u) {
    let l = Ir(T).tickSize(-u + h + i.gridLineStartPadding).tickFormat(Kt(n.db.getAxisFormat() || i.axisFormat || "%Y-%m-%d"));
    const o = /^([1-9]\d*)(minute|hour|day|week|month)$/.exec(
      n.db.getTickInterval() || i.tickInterval
    );
    if (o !== null) {
      const Y = o[1];
      switch (o[2]) {
        case "minute":
          l.ticks(Xt.every(Y));
          break;
        case "hour":
          l.ticks(Gt.every(Y));
          break;
        case "day":
          l.ticks(Mt.every(Y));
          break;
        case "week":
          l.ticks(wt.every(Y));
          break;
        case "month":
          l.ticks(Qt.every(Y));
          break;
      }
    }
    if (z.append("g").attr("class", "grid").attr("transform", "translate(" + w + ", " + (u - 50) + ")").call(l).selectAll("text").style("text-anchor", "middle").attr("fill", "#000").attr("stroke", "none").attr("font-size", 10).attr("dy", "1em"), n.db.topAxisEnabled() || i.topAxis) {
      let Y = Er(T).tickSize(-u + h + i.gridLineStartPadding).tickFormat(Kt(n.db.getAxisFormat() || i.axisFormat || "%Y-%m-%d"));
      if (o !== null) {
        const m = o[1];
        switch (o[2]) {
          case "minute":
            Y.ticks(Xt.every(m));
            break;
          case "hour":
            Y.ticks(Gt.every(m));
            break;
          case "day":
            Y.ticks(Mt.every(m));
            break;
          case "week":
            Y.ticks(wt.every(m));
            break;
          case "month":
            Y.ticks(Qt.every(m));
            break;
        }
      }
      z.append("g").attr("class", "grid").attr("transform", "translate(" + w + ", " + h + ")").call(Y).selectAll("text").style("text-anchor", "middle").attr("fill", "#000").attr("stroke", "none").attr("font-size", 10);
    }
  }
  function P(w, h) {
    let g = 0;
    const u = Object.keys(v).map((l) => [l, v[l]]);
    z.append("g").selectAll("text").data(u).enter().append(function(l) {
      const b = l[0].split(pr.lineBreakRegex), o = -(b.length - 1) / 2, Y = y.createElementNS("http://www.w3.org/2000/svg", "text");
      Y.setAttribute("dy", o + "em");
      for (const [m, Z] of b.entries()) {
        const j = y.createElementNS("http://www.w3.org/2000/svg", "tspan");
        j.setAttribute("alignment-baseline", "central"), j.setAttribute("x", "10"), m > 0 && j.setAttribute("dy", "1em"), j.textContent = Z, Y.appendChild(j);
      }
      return Y;
    }).attr("x", 10).attr("y", function(l, b) {
      if (b > 0)
        for (let o = 0; o < b; o++)
          return g += u[b - 1][1], l[1] * w / 2 + g * w + h;
      else
        return l[1] * w / 2 + h;
    }).attr("font-size", i.sectionFontSize).attr("class", function(l) {
      for (const [b, o] of p.entries())
        if (l[0] === o)
          return "sectionTitle sectionTitle" + b % i.numberSectionStyles;
      return "sectionTitle";
    });
  }
  function C(w, h, g, u) {
    const l = n.db.getTodayMarker();
    if (l === "off")
      return;
    const b = z.append("g").attr("class", "today"), o = new Date(), Y = b.append("line");
    Y.attr("x1", T(o) + w).attr("x2", T(o) + w).attr("y1", i.titleTopMargin).attr("y2", u - i.titleTopMargin).attr("class", "today"), l !== "" && Y.attr("style", l.replace(/,/g, ";"));
  }
  function U(w) {
    const h = {}, g = [];
    for (let u = 0, l = w.length; u < l; ++u)
      Object.prototype.hasOwnProperty.call(h, w[u]) || (h[w[u]] = !0, g.push(w[u]));
    return g;
  }
}, Ms = {
  setConf: Ts,
  draw: bs
}, ws = (t) => `
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
`, Ds = ws, Fs = {
  parser: La,
  db: vs,
  renderer: Ms,
  styles: Ds
};
export {
  Fs as diagram
};
//# sourceMappingURL=ganttDiagram-6b6599ba.js.map
