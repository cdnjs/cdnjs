import { w as cn, x as un, R as ln, C as fn, y as Kn, z as $n, A as he, B as He, D as Ve, E as tr, F as ee, G as er, g as pt, H as ot, l as me, f as zt, e as nr } from "./config-0b7a4e7d.js";
import { s as rr, u as ir } from "./utils-c190d844.js";
import { m as ar } from "./mermaidAPI-f2dd6058.js";
import { s as sr, g as or, d as cr, e as ur, b as lr, a as fr, f as hr } from "./commonDb-9eb4b6e7.js";
import { c as mr } from "./setupGraphViewbox-a7344a0b.js";
import { i as hn } from "./init-f9637058.js";
import "./errorRenderer-89ef1884.js";
function Ht(t, e) {
  return t == null || e == null ? NaN : t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function dr(t, e) {
  return t == null || e == null ? NaN : e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function Ce(t) {
  let e, r, n;
  t.length !== 2 ? (e = Ht, r = (l, g) => Ht(t(l), g), n = (l, g) => t(l) - g) : (e = t === Ht || t === dr ? t : gr, r = t, n = t);
  function i(l, g, d = 0, w = l.length) {
    if (d < w) {
      if (e(g, g) !== 0)
        return w;
      do {
        const x = d + w >>> 1;
        r(l[x], g) < 0 ? d = x + 1 : w = x;
      } while (d < w);
    }
    return d;
  }
  function a(l, g, d = 0, w = l.length) {
    if (d < w) {
      if (e(g, g) !== 0)
        return w;
      do {
        const x = d + w >>> 1;
        r(l[x], g) <= 0 ? d = x + 1 : w = x;
      } while (d < w);
    }
    return d;
  }
  function s(l, g, d = 0, w = l.length) {
    const x = i(l, g, d, w - 1);
    return x > d && n(l[x - 1], g) > -n(l[x], g) ? x - 1 : x;
  }
  return { left: i, center: s, right: a };
}
function gr() {
  return 0;
}
function yr(t) {
  return t === null ? NaN : +t;
}
const kr = Ce(Ht), pr = kr.right;
Ce(yr).center;
const Tr = pr;
var de = Math.sqrt(50), ge = Math.sqrt(10), ye = Math.sqrt(2);
function vr(t, e, r) {
  var n, i = -1, a, s, l;
  if (e = +e, t = +t, r = +r, t === e && r > 0)
    return [t];
  if ((n = e < t) && (a = t, t = e, e = a), (l = mn(t, e, r)) === 0 || !isFinite(l))
    return [];
  if (l > 0) {
    let g = Math.round(t / l), d = Math.round(e / l);
    for (g * l < t && ++g, d * l > e && --d, s = new Array(a = d - g + 1); ++i < a; )
      s[i] = (g + i) * l;
  } else {
    l = -l;
    let g = Math.round(t * l), d = Math.round(e * l);
    for (g / l < t && ++g, d / l > e && --d, s = new Array(a = d - g + 1); ++i < a; )
      s[i] = (g + i) / l;
  }
  return n && s.reverse(), s;
}
function mn(t, e, r) {
  var n = (e - t) / Math.max(0, r), i = Math.floor(Math.log(n) / Math.LN10), a = n / Math.pow(10, i);
  return i >= 0 ? (a >= de ? 10 : a >= ge ? 5 : a >= ye ? 2 : 1) * Math.pow(10, i) : -Math.pow(10, -i) / (a >= de ? 10 : a >= ge ? 5 : a >= ye ? 2 : 1);
}
function ke(t, e, r) {
  var n = Math.abs(e - t) / Math.max(0, r), i = Math.pow(10, Math.floor(Math.log(n) / Math.LN10)), a = n / i;
  return a >= de ? i *= 10 : a >= ge ? i *= 5 : a >= ye && (i *= 2), e < t ? -i : i;
}
function br(t, e) {
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
function xr(t, e) {
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
function wr(t) {
  return t;
}
var Vt = 1, ne = 2, pe = 3, Ot = 4, We = 1e-6;
function Mr(t) {
  return "translate(" + t + ",0)";
}
function Cr(t) {
  return "translate(0," + t + ")";
}
function Dr(t) {
  return (e) => +t(e);
}
function Sr(t, e) {
  return e = Math.max(0, t.bandwidth() - e * 2) / 2, t.round() && (e = Math.round(e)), (r) => +t(r) + e;
}
function _r() {
  return !this.__axis;
}
function dn(t, e) {
  var r = [], n = null, i = null, a = 6, s = 6, l = 3, g = typeof window < "u" && window.devicePixelRatio > 1 ? 0 : 0.5, d = t === Vt || t === Ot ? -1 : 1, w = t === Ot || t === ne ? "x" : "y", x = t === Vt || t === pe ? Mr : Cr;
  function k(y) {
    var E = n ?? (e.ticks ? e.ticks.apply(e, r) : e.domain()), X = i ?? (e.tickFormat ? e.tickFormat.apply(e, r) : wr), B = Math.max(a, 0) + l, Q = e.range(), tt = +Q[0] + g, P = +Q[Q.length - 1] + g, W = (e.bandwidth ? Sr : Dr)(e.copy(), g), O = y.selection ? y.selection() : y, M = O.selectAll(".domain").data([null]), N = O.selectAll(".tick").data(E, e).order(), R = N.exit(), b = N.enter().append("g").attr("class", "tick"), m = N.select("line"), c = N.select("text");
    M = M.merge(M.enter().insert("path", ".tick").attr("class", "domain").attr("stroke", "currentColor")), N = N.merge(b), m = m.merge(b.append("line").attr("stroke", "currentColor").attr(w + "2", d * a)), c = c.merge(b.append("text").attr("fill", "currentColor").attr(w, d * B).attr("dy", t === Vt ? "0em" : t === pe ? "0.71em" : "0.32em")), y !== O && (M = M.transition(y), N = N.transition(y), m = m.transition(y), c = c.transition(y), R = R.transition(y).attr("opacity", We).attr("transform", function(f) {
      return isFinite(f = W(f)) ? x(f + g) : this.getAttribute("transform");
    }), b.attr("opacity", We).attr("transform", function(f) {
      var T = this.parentNode.__axis;
      return x((T && isFinite(T = T(f)) ? T : W(f)) + g);
    })), R.remove(), M.attr("d", t === Ot || t === ne ? s ? "M" + d * s + "," + tt + "H" + g + "V" + P + "H" + d * s : "M" + g + "," + tt + "V" + P : s ? "M" + tt + "," + d * s + "V" + g + "H" + P + "V" + d * s : "M" + tt + "," + g + "H" + P), N.attr("opacity", 1).attr("transform", function(f) {
      return x(W(f) + g);
    }), m.attr(w + "2", d * a), c.attr(w, d * B).text(X), O.filter(_r).attr("fill", "none").attr("font-size", 10).attr("font-family", "sans-serif").attr("text-anchor", t === ne ? "start" : t === Ot ? "end" : "middle"), O.each(function() {
      this.__axis = W;
    });
  }
  return k.scale = function(y) {
    return arguments.length ? (e = y, k) : e;
  }, k.ticks = function() {
    return r = Array.from(arguments), k;
  }, k.tickArguments = function(y) {
    return arguments.length ? (r = y == null ? [] : Array.from(y), k) : r.slice();
  }, k.tickValues = function(y) {
    return arguments.length ? (n = y == null ? null : Array.from(y), k) : n && n.slice();
  }, k.tickFormat = function(y) {
    return arguments.length ? (i = y, k) : i;
  }, k.tickSize = function(y) {
    return arguments.length ? (a = s = +y, k) : a;
  }, k.tickSizeInner = function(y) {
    return arguments.length ? (a = +y, k) : a;
  }, k.tickSizeOuter = function(y) {
    return arguments.length ? (s = +y, k) : s;
  }, k.tickPadding = function(y) {
    return arguments.length ? (l = +y, k) : l;
  }, k.offset = function(y) {
    return arguments.length ? (g = +y, k) : g;
  }, k;
}
function Ur(t) {
  return dn(Vt, t);
}
function Ar(t) {
  return dn(pe, t);
}
const Fr = Math.PI / 180, Er = 180 / Math.PI, Bt = 18, gn = 0.96422, yn = 1, kn = 0.82521, pn = 4 / 29, Tt = 6 / 29, Tn = 3 * Tt * Tt, Lr = Tt * Tt * Tt;
function vn(t) {
  if (t instanceof st)
    return new st(t.l, t.a, t.b, t.opacity);
  if (t instanceof ut)
    return bn(t);
  t instanceof ln || (t = Kn(t));
  var e = se(t.r), r = se(t.g), n = se(t.b), i = re((0.2225045 * e + 0.7168786 * r + 0.0606169 * n) / yn), a, s;
  return e === r && r === n ? a = s = i : (a = re((0.4360747 * e + 0.3850649 * r + 0.1430804 * n) / gn), s = re((0.0139322 * e + 0.0971045 * r + 0.7141733 * n) / kn)), new st(116 * i - 16, 500 * (a - i), 200 * (i - s), t.opacity);
}
function Ir(t, e, r, n) {
  return arguments.length === 1 ? vn(t) : new st(t, e, r, n ?? 1);
}
function st(t, e, r, n) {
  this.l = +t, this.a = +e, this.b = +r, this.opacity = +n;
}
cn(st, Ir, un(fn, {
  brighter(t) {
    return new st(this.l + Bt * (t ?? 1), this.a, this.b, this.opacity);
  },
  darker(t) {
    return new st(this.l - Bt * (t ?? 1), this.a, this.b, this.opacity);
  },
  rgb() {
    var t = (this.l + 16) / 116, e = isNaN(this.a) ? t : t + this.a / 500, r = isNaN(this.b) ? t : t - this.b / 200;
    return e = gn * ie(e), t = yn * ie(t), r = kn * ie(r), new ln(
      ae(3.1338561 * e - 1.6168667 * t - 0.4906146 * r),
      ae(-0.9787684 * e + 1.9161415 * t + 0.033454 * r),
      ae(0.0719453 * e - 0.2289914 * t + 1.4052427 * r),
      this.opacity
    );
  }
}));
function re(t) {
  return t > Lr ? Math.pow(t, 1 / 3) : t / Tn + pn;
}
function ie(t) {
  return t > Tt ? t * t * t : Tn * (t - pn);
}
function ae(t) {
  return 255 * (t <= 31308e-7 ? 12.92 * t : 1.055 * Math.pow(t, 1 / 2.4) - 0.055);
}
function se(t) {
  return (t /= 255) <= 0.04045 ? t / 12.92 : Math.pow((t + 0.055) / 1.055, 2.4);
}
function Nr(t) {
  if (t instanceof ut)
    return new ut(t.h, t.c, t.l, t.opacity);
  if (t instanceof st || (t = vn(t)), t.a === 0 && t.b === 0)
    return new ut(NaN, 0 < t.l && t.l < 100 ? 0 : NaN, t.l, t.opacity);
  var e = Math.atan2(t.b, t.a) * Er;
  return new ut(e < 0 ? e + 360 : e, Math.sqrt(t.a * t.a + t.b * t.b), t.l, t.opacity);
}
function Te(t, e, r, n) {
  return arguments.length === 1 ? Nr(t) : new ut(t, e, r, n ?? 1);
}
function ut(t, e, r, n) {
  this.h = +t, this.c = +e, this.l = +r, this.opacity = +n;
}
function bn(t) {
  if (isNaN(t.h))
    return new st(t.l, 0, 0, t.opacity);
  var e = t.h * Fr;
  return new st(t.l, Math.cos(e) * t.c, Math.sin(e) * t.c, t.opacity);
}
cn(ut, Te, un(fn, {
  brighter(t) {
    return new ut(this.h, this.c, this.l + Bt * (t ?? 1), this.opacity);
  },
  darker(t) {
    return new ut(this.h, this.c, this.l - Bt * (t ?? 1), this.opacity);
  },
  rgb() {
    return bn(this).rgb();
  }
}));
function Yr(t, e) {
  e || (e = []);
  var r = t ? Math.min(e.length, t.length) : 0, n = e.slice(), i;
  return function(a) {
    for (i = 0; i < r; ++i)
      n[i] = t[i] * (1 - a) + e[i] * a;
    return n;
  };
}
function zr(t) {
  return ArrayBuffer.isView(t) && !(t instanceof DataView);
}
function Or(t, e) {
  var r = e ? e.length : 0, n = t ? Math.min(r, t.length) : 0, i = new Array(n), a = new Array(r), s;
  for (s = 0; s < n; ++s)
    i[s] = De(t[s], e[s]);
  for (; s < r; ++s)
    a[s] = e[s];
  return function(l) {
    for (s = 0; s < n; ++s)
      a[s] = i[s](l);
    return a;
  };
}
function Pr(t, e) {
  var r = new Date();
  return t = +t, e = +e, function(n) {
    return r.setTime(t * (1 - n) + e * n), r;
  };
}
function Hr(t, e) {
  var r = {}, n = {}, i;
  (t === null || typeof t != "object") && (t = {}), (e === null || typeof e != "object") && (e = {});
  for (i in e)
    i in t ? r[i] = De(t[i], e[i]) : n[i] = e[i];
  return function(a) {
    for (i in r)
      n[i] = r[i](a);
    return n;
  };
}
function De(t, e) {
  var r = typeof e, n;
  return e == null || r === "boolean" ? $n(e) : (r === "number" ? he : r === "string" ? (n = He(e)) ? (e = n, Ve) : tr : e instanceof He ? Ve : e instanceof Date ? Pr : zr(e) ? Yr : Array.isArray(e) ? Or : typeof e.valueOf != "function" && typeof e.toString != "function" || isNaN(e) ? Hr : he)(t, e);
}
function Vr(t, e) {
  return t = +t, e = +e, function(r) {
    return Math.round(t * (1 - r) + e * r);
  };
}
function Wr(t) {
  return function(e, r) {
    var n = t((e = Te(e)).h, (r = Te(r)).h), i = ee(e.c, r.c), a = ee(e.l, r.l), s = ee(e.opacity, r.opacity);
    return function(l) {
      return e.h = n(l), e.c = i(l), e.l = a(l), e.opacity = s(l), e + "";
    };
  };
}
const Rr = Wr(er);
function Br(t) {
  return Math.abs(t = Math.round(t)) >= 1e21 ? t.toLocaleString("en").replace(/,/g, "") : t.toString(10);
}
function jt(t, e) {
  if ((r = (t = e ? t.toExponential(e - 1) : t.toExponential()).indexOf("e")) < 0)
    return null;
  var r, n = t.slice(0, r);
  return [
    n.length > 1 ? n[0] + n.slice(2) : n,
    +t.slice(r + 1)
  ];
}
function bt(t) {
  return t = jt(Math.abs(t)), t ? t[1] : NaN;
}
function jr(t, e) {
  return function(r, n) {
    for (var i = r.length, a = [], s = 0, l = t[0], g = 0; i > 0 && l > 0 && (g + l + 1 > n && (l = Math.max(1, n - g)), a.push(r.substring(i -= l, i + l)), !((g += l + 1) > n)); )
      l = t[s = (s + 1) % t.length];
    return a.reverse().join(e);
  };
}
function qr(t) {
  return function(e) {
    return e.replace(/[0-9]/g, function(r) {
      return t[+r];
    });
  };
}
var Zr = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function qt(t) {
  if (!(e = Zr.exec(t)))
    throw new Error("invalid format: " + t);
  var e;
  return new Se({
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
qt.prototype = Se.prototype;
function Se(t) {
  this.fill = t.fill === void 0 ? " " : t.fill + "", this.align = t.align === void 0 ? ">" : t.align + "", this.sign = t.sign === void 0 ? "-" : t.sign + "", this.symbol = t.symbol === void 0 ? "" : t.symbol + "", this.zero = !!t.zero, this.width = t.width === void 0 ? void 0 : +t.width, this.comma = !!t.comma, this.precision = t.precision === void 0 ? void 0 : +t.precision, this.trim = !!t.trim, this.type = t.type === void 0 ? "" : t.type + "";
}
Se.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
function Xr(t) {
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
var xn;
function Qr(t, e) {
  var r = jt(t, e);
  if (!r)
    return t + "";
  var n = r[0], i = r[1], a = i - (xn = Math.max(-8, Math.min(8, Math.floor(i / 3))) * 3) + 1, s = n.length;
  return a === s ? n : a > s ? n + new Array(a - s + 1).join("0") : a > 0 ? n.slice(0, a) + "." + n.slice(a) : "0." + new Array(1 - a).join("0") + jt(t, Math.max(0, e + a - 1))[0];
}
function Re(t, e) {
  var r = jt(t, e);
  if (!r)
    return t + "";
  var n = r[0], i = r[1];
  return i < 0 ? "0." + new Array(-i).join("0") + n : n.length > i + 1 ? n.slice(0, i + 1) + "." + n.slice(i + 1) : n + new Array(i - n.length + 2).join("0");
}
const Be = {
  "%": (t, e) => (t * 100).toFixed(e),
  b: (t) => Math.round(t).toString(2),
  c: (t) => t + "",
  d: Br,
  e: (t, e) => t.toExponential(e),
  f: (t, e) => t.toFixed(e),
  g: (t, e) => t.toPrecision(e),
  o: (t) => Math.round(t).toString(8),
  p: (t, e) => Re(t * 100, e),
  r: Re,
  s: Qr,
  X: (t) => Math.round(t).toString(16).toUpperCase(),
  x: (t) => Math.round(t).toString(16)
};
function je(t) {
  return t;
}
var qe = Array.prototype.map, Ze = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function Gr(t) {
  var e = t.grouping === void 0 || t.thousands === void 0 ? je : jr(qe.call(t.grouping, Number), t.thousands + ""), r = t.currency === void 0 ? "" : t.currency[0] + "", n = t.currency === void 0 ? "" : t.currency[1] + "", i = t.decimal === void 0 ? "." : t.decimal + "", a = t.numerals === void 0 ? je : qr(qe.call(t.numerals, String)), s = t.percent === void 0 ? "%" : t.percent + "", l = t.minus === void 0 ? "−" : t.minus + "", g = t.nan === void 0 ? "NaN" : t.nan + "";
  function d(x) {
    x = qt(x);
    var k = x.fill, y = x.align, E = x.sign, X = x.symbol, B = x.zero, Q = x.width, tt = x.comma, P = x.precision, W = x.trim, O = x.type;
    O === "n" ? (tt = !0, O = "g") : Be[O] || (P === void 0 && (P = 12), W = !0, O = "g"), (B || k === "0" && y === "=") && (B = !0, k = "0", y = "=");
    var M = X === "$" ? r : X === "#" && /[boxX]/.test(O) ? "0" + O.toLowerCase() : "", N = X === "$" ? n : /[%p]/.test(O) ? s : "", R = Be[O], b = /[defgprs%]/.test(O);
    P = P === void 0 ? 6 : /[gprs]/.test(O) ? Math.max(1, Math.min(21, P)) : Math.max(0, Math.min(20, P));
    function m(c) {
      var f = M, T = N, o, L, u;
      if (O === "c")
        T = R(c) + T, c = "";
      else {
        c = +c;
        var S = c < 0 || 1 / c < 0;
        if (c = isNaN(c) ? g : R(Math.abs(c), P), W && (c = Xr(c)), S && +c == 0 && E !== "+" && (S = !1), f = (S ? E === "(" ? E : l : E === "-" || E === "(" ? "" : E) + f, T = (O === "s" ? Ze[8 + xn / 3] : "") + T + (S && E === "(" ? ")" : ""), b) {
          for (o = -1, L = c.length; ++o < L; )
            if (u = c.charCodeAt(o), 48 > u || u > 57) {
              T = (u === 46 ? i + c.slice(o + 1) : c.slice(o)) + T, c = c.slice(0, o);
              break;
            }
        }
      }
      tt && !B && (c = e(c, 1 / 0));
      var V = f.length + c.length + T.length, j = V < Q ? new Array(Q - V + 1).join(k) : "";
      switch (tt && B && (c = e(j + c, j.length ? Q - T.length : 1 / 0), j = ""), y) {
        case "<":
          c = f + c + T + j;
          break;
        case "=":
          c = f + j + c + T;
          break;
        case "^":
          c = j.slice(0, V = j.length >> 1) + f + c + T + j.slice(V);
          break;
        default:
          c = j + f + c + T;
          break;
      }
      return a(c);
    }
    return m.toString = function() {
      return x + "";
    }, m;
  }
  function w(x, k) {
    var y = d((x = qt(x), x.type = "f", x)), E = Math.max(-8, Math.min(8, Math.floor(bt(k) / 3))) * 3, X = Math.pow(10, -E), B = Ze[8 + E / 3];
    return function(Q) {
      return y(X * Q) + B;
    };
  }
  return {
    format: d,
    formatPrefix: w
  };
}
var Pt, wn, Mn;
Jr({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function Jr(t) {
  return Pt = Gr(t), wn = Pt.format, Mn = Pt.formatPrefix, Pt;
}
function Kr(t) {
  return Math.max(0, -bt(Math.abs(t)));
}
function $r(t, e) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(bt(e) / 3))) * 3 - bt(Math.abs(t)));
}
function ti(t, e) {
  return t = Math.abs(t), e = Math.abs(e) - t, Math.max(0, bt(e) - bt(t)) + 1;
}
function ei(t) {
  return function() {
    return t;
  };
}
function ni(t) {
  return +t;
}
var Xe = [0, 1];
function kt(t) {
  return t;
}
function ve(t, e) {
  return (e -= t = +t) ? function(r) {
    return (r - t) / e;
  } : ei(isNaN(e) ? NaN : 0.5);
}
function ri(t, e) {
  var r;
  return t > e && (r = t, t = e, e = r), function(n) {
    return Math.max(t, Math.min(e, n));
  };
}
function ii(t, e, r) {
  var n = t[0], i = t[1], a = e[0], s = e[1];
  return i < n ? (n = ve(i, n), a = r(s, a)) : (n = ve(n, i), a = r(a, s)), function(l) {
    return a(n(l));
  };
}
function ai(t, e, r) {
  var n = Math.min(t.length, e.length) - 1, i = new Array(n), a = new Array(n), s = -1;
  for (t[n] < t[0] && (t = t.slice().reverse(), e = e.slice().reverse()); ++s < n; )
    i[s] = ve(t[s], t[s + 1]), a[s] = r(e[s], e[s + 1]);
  return function(l) {
    var g = Tr(t, l, 1, n) - 1;
    return a[g](i[g](l));
  };
}
function Cn(t, e) {
  return e.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp()).unknown(t.unknown());
}
function si() {
  var t = Xe, e = Xe, r = De, n, i, a, s = kt, l, g, d;
  function w() {
    var k = Math.min(t.length, e.length);
    return s !== kt && (s = ri(t[0], t[k - 1])), l = k > 2 ? ai : ii, g = d = null, x;
  }
  function x(k) {
    return k == null || isNaN(k = +k) ? a : (g || (g = l(t.map(n), e, r)))(n(s(k)));
  }
  return x.invert = function(k) {
    return s(i((d || (d = l(e, t.map(n), he)))(k)));
  }, x.domain = function(k) {
    return arguments.length ? (t = Array.from(k, ni), w()) : t.slice();
  }, x.range = function(k) {
    return arguments.length ? (e = Array.from(k), w()) : e.slice();
  }, x.rangeRound = function(k) {
    return e = Array.from(k), r = Vr, w();
  }, x.clamp = function(k) {
    return arguments.length ? (s = k ? !0 : kt, w()) : s !== kt;
  }, x.interpolate = function(k) {
    return arguments.length ? (r = k, w()) : r;
  }, x.unknown = function(k) {
    return arguments.length ? (a = k, x) : a;
  }, function(k, y) {
    return n = k, i = y, w();
  };
}
function Dn() {
  return si()(kt, kt);
}
function oi(t, e, r, n) {
  var i = ke(t, e, r), a;
  switch (n = qt(n ?? ",f"), n.type) {
    case "s": {
      var s = Math.max(Math.abs(t), Math.abs(e));
      return n.precision == null && !isNaN(a = $r(i, s)) && (n.precision = a), Mn(n, s);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      n.precision == null && !isNaN(a = ti(i, Math.max(Math.abs(t), Math.abs(e)))) && (n.precision = a - (n.type === "e"));
      break;
    }
    case "f":
    case "%": {
      n.precision == null && !isNaN(a = Kr(i)) && (n.precision = a - (n.type === "%") * 2);
      break;
    }
  }
  return wn(n);
}
function ci(t) {
  var e = t.domain;
  return t.ticks = function(r) {
    var n = e();
    return vr(n[0], n[n.length - 1], r ?? 10);
  }, t.tickFormat = function(r, n) {
    var i = e();
    return oi(i[0], i[i.length - 1], r ?? 10, n);
  }, t.nice = function(r) {
    r == null && (r = 10);
    var n = e(), i = 0, a = n.length - 1, s = n[i], l = n[a], g, d, w = 10;
    for (l < s && (d = s, s = l, l = d, d = i, i = a, a = d); w-- > 0; ) {
      if (d = mn(s, l, r), d === g)
        return n[i] = s, n[a] = l, e(n);
      if (d > 0)
        s = Math.floor(s / d) * d, l = Math.ceil(l / d) * d;
      else if (d < 0)
        s = Math.ceil(s * d) / d, l = Math.floor(l * d) / d;
      else
        break;
      g = d;
    }
    return t;
  }, t;
}
function Sn() {
  var t = Dn();
  return t.copy = function() {
    return Cn(t, Sn());
  }, hn.apply(t, arguments), ci(t);
}
function ui(t, e) {
  t = t.slice();
  var r = 0, n = t.length - 1, i = t[r], a = t[n], s;
  return a < i && (s = r, r = n, n = s, s = i, i = a, a = s), t[r] = e.floor(i), t[n] = e.ceil(a), t;
}
var oe = new Date(), ce = new Date();
function K(t, e, r, n) {
  function i(a) {
    return t(a = arguments.length === 0 ? new Date() : new Date(+a)), a;
  }
  return i.floor = function(a) {
    return t(a = new Date(+a)), a;
  }, i.ceil = function(a) {
    return t(a = new Date(a - 1)), e(a, 1), t(a), a;
  }, i.round = function(a) {
    var s = i(a), l = i.ceil(a);
    return a - s < l - a ? s : l;
  }, i.offset = function(a, s) {
    return e(a = new Date(+a), s == null ? 1 : Math.floor(s)), a;
  }, i.range = function(a, s, l) {
    var g = [], d;
    if (a = i.ceil(a), l = l == null ? 1 : Math.floor(l), !(a < s) || !(l > 0))
      return g;
    do
      g.push(d = new Date(+a)), e(a, l), t(a);
    while (d < a && a < s);
    return g;
  }, i.filter = function(a) {
    return K(function(s) {
      if (s >= s)
        for (; t(s), !a(s); )
          s.setTime(s - 1);
    }, function(s, l) {
      if (s >= s)
        if (l < 0)
          for (; ++l <= 0; )
            for (; e(s, -1), !a(s); )
              ;
        else
          for (; --l >= 0; )
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
var Zt = K(function() {
}, function(t, e) {
  t.setTime(+t + e);
}, function(t, e) {
  return e - t;
});
Zt.every = function(t) {
  return t = Math.floor(t), !isFinite(t) || !(t > 0) ? null : t > 1 ? K(function(e) {
    e.setTime(Math.floor(e / t) * t);
  }, function(e, r) {
    e.setTime(+e + r * t);
  }, function(e, r) {
    return (r - e) / t;
  }) : Zt;
};
const li = Zt;
Zt.range;
const lt = 1e3, rt = lt * 60, ft = rt * 60, ht = ft * 24, _e = ht * 7, Qe = ht * 30, ue = ht * 365;
var _n = K(function(t) {
  t.setTime(t - t.getMilliseconds());
}, function(t, e) {
  t.setTime(+t + e * lt);
}, function(t, e) {
  return (e - t) / lt;
}, function(t) {
  return t.getUTCSeconds();
});
const Lt = _n;
_n.range;
var Un = K(function(t) {
  t.setTime(t - t.getMilliseconds() - t.getSeconds() * lt);
}, function(t, e) {
  t.setTime(+t + e * rt);
}, function(t, e) {
  return (e - t) / rt;
}, function(t) {
  return t.getMinutes();
});
const Xt = Un;
Un.range;
var An = K(function(t) {
  t.setTime(t - t.getMilliseconds() - t.getSeconds() * lt - t.getMinutes() * rt);
}, function(t, e) {
  t.setTime(+t + e * ft);
}, function(t, e) {
  return (e - t) / ft;
}, function(t) {
  return t.getHours();
});
const Qt = An;
An.range;
var Fn = K(
  (t) => t.setHours(0, 0, 0, 0),
  (t, e) => t.setDate(t.getDate() + e),
  (t, e) => (e - t - (e.getTimezoneOffset() - t.getTimezoneOffset()) * rt) / ht,
  (t) => t.getDate() - 1
);
const xt = Fn;
Fn.range;
function dt(t) {
  return K(function(e) {
    e.setDate(e.getDate() - (e.getDay() + 7 - t) % 7), e.setHours(0, 0, 0, 0);
  }, function(e, r) {
    e.setDate(e.getDate() + r * 7);
  }, function(e, r) {
    return (r - e - (r.getTimezoneOffset() - e.getTimezoneOffset()) * rt) / _e;
  });
}
var wt = dt(0), Gt = dt(1), fi = dt(2), hi = dt(3), Mt = dt(4), mi = dt(5), di = dt(6);
wt.range;
Gt.range;
fi.range;
hi.range;
Mt.range;
mi.range;
di.range;
var En = K(function(t) {
  t.setDate(1), t.setHours(0, 0, 0, 0);
}, function(t, e) {
  t.setMonth(t.getMonth() + e);
}, function(t, e) {
  return e.getMonth() - t.getMonth() + (e.getFullYear() - t.getFullYear()) * 12;
}, function(t) {
  return t.getMonth();
});
const Jt = En;
En.range;
var Ue = K(function(t) {
  t.setMonth(0, 1), t.setHours(0, 0, 0, 0);
}, function(t, e) {
  t.setFullYear(t.getFullYear() + e);
}, function(t, e) {
  return e.getFullYear() - t.getFullYear();
}, function(t) {
  return t.getFullYear();
});
Ue.every = function(t) {
  return !isFinite(t = Math.floor(t)) || !(t > 0) ? null : K(function(e) {
    e.setFullYear(Math.floor(e.getFullYear() / t) * t), e.setMonth(0, 1), e.setHours(0, 0, 0, 0);
  }, function(e, r) {
    e.setFullYear(e.getFullYear() + r * t);
  });
};
const mt = Ue;
Ue.range;
var Ln = K(function(t) {
  t.setUTCSeconds(0, 0);
}, function(t, e) {
  t.setTime(+t + e * rt);
}, function(t, e) {
  return (e - t) / rt;
}, function(t) {
  return t.getUTCMinutes();
});
const gi = Ln;
Ln.range;
var In = K(function(t) {
  t.setUTCMinutes(0, 0, 0);
}, function(t, e) {
  t.setTime(+t + e * ft);
}, function(t, e) {
  return (e - t) / ft;
}, function(t) {
  return t.getUTCHours();
});
const yi = In;
In.range;
var Nn = K(function(t) {
  t.setUTCHours(0, 0, 0, 0);
}, function(t, e) {
  t.setUTCDate(t.getUTCDate() + e);
}, function(t, e) {
  return (e - t) / ht;
}, function(t) {
  return t.getUTCDate() - 1;
});
const Ae = Nn;
Nn.range;
function gt(t) {
  return K(function(e) {
    e.setUTCDate(e.getUTCDate() - (e.getUTCDay() + 7 - t) % 7), e.setUTCHours(0, 0, 0, 0);
  }, function(e, r) {
    e.setUTCDate(e.getUTCDate() + r * 7);
  }, function(e, r) {
    return (r - e) / _e;
  });
}
var Fe = gt(0), Kt = gt(1), ki = gt(2), pi = gt(3), Ct = gt(4), Ti = gt(5), vi = gt(6);
Fe.range;
Kt.range;
ki.range;
pi.range;
Ct.range;
Ti.range;
vi.range;
var Yn = K(function(t) {
  t.setUTCDate(1), t.setUTCHours(0, 0, 0, 0);
}, function(t, e) {
  t.setUTCMonth(t.getUTCMonth() + e);
}, function(t, e) {
  return e.getUTCMonth() - t.getUTCMonth() + (e.getUTCFullYear() - t.getUTCFullYear()) * 12;
}, function(t) {
  return t.getUTCMonth();
});
const bi = Yn;
Yn.range;
var Ee = K(function(t) {
  t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0);
}, function(t, e) {
  t.setUTCFullYear(t.getUTCFullYear() + e);
}, function(t, e) {
  return e.getUTCFullYear() - t.getUTCFullYear();
}, function(t) {
  return t.getUTCFullYear();
});
Ee.every = function(t) {
  return !isFinite(t = Math.floor(t)) || !(t > 0) ? null : K(function(e) {
    e.setUTCFullYear(Math.floor(e.getUTCFullYear() / t) * t), e.setUTCMonth(0, 1), e.setUTCHours(0, 0, 0, 0);
  }, function(e, r) {
    e.setUTCFullYear(e.getUTCFullYear() + r * t);
  });
};
const Dt = Ee;
Ee.range;
function zn(t, e, r, n, i, a) {
  const s = [
    [Lt, 1, lt],
    [Lt, 5, 5 * lt],
    [Lt, 15, 15 * lt],
    [Lt, 30, 30 * lt],
    [a, 1, rt],
    [a, 5, 5 * rt],
    [a, 15, 15 * rt],
    [a, 30, 30 * rt],
    [i, 1, ft],
    [i, 3, 3 * ft],
    [i, 6, 6 * ft],
    [i, 12, 12 * ft],
    [n, 1, ht],
    [n, 2, 2 * ht],
    [r, 1, _e],
    [e, 1, Qe],
    [e, 3, 3 * Qe],
    [t, 1, ue]
  ];
  function l(d, w, x) {
    const k = w < d;
    k && ([d, w] = [w, d]);
    const y = x && typeof x.range == "function" ? x : g(d, w, x), E = y ? y.range(d, +w + 1) : [];
    return k ? E.reverse() : E;
  }
  function g(d, w, x) {
    const k = Math.abs(w - d) / x, y = Ce(([, , B]) => B).right(s, k);
    if (y === s.length)
      return t.every(ke(d / ue, w / ue, x));
    if (y === 0)
      return li.every(Math.max(ke(d, w, x), 1));
    const [E, X] = s[k / s[y - 1][2] < s[y][2] / k ? y - 1 : y];
    return E.every(X);
  }
  return [l, g];
}
zn(Dt, bi, Fe, Ae, yi, gi);
const [xi, wi] = zn(mt, Jt, wt, xt, Qt, Xt);
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
function At(t, e, r) {
  return { y: t, m: e, d: r, H: 0, M: 0, S: 0, L: 0 };
}
function Mi(t) {
  var e = t.dateTime, r = t.date, n = t.time, i = t.periods, a = t.days, s = t.shortDays, l = t.months, g = t.shortMonths, d = Ft(i), w = Et(i), x = Ft(a), k = Et(a), y = Ft(s), E = Et(s), X = Ft(l), B = Et(l), Q = Ft(g), tt = Et(g), P = {
    a: S,
    A: V,
    b: j,
    B: p,
    c: null,
    d: en,
    e: en,
    f: Zi,
    g: ra,
    G: aa,
    H: Bi,
    I: ji,
    j: qi,
    L: On,
    m: Xi,
    M: Qi,
    p: _,
    q: D,
    Q: an,
    s: sn,
    S: Gi,
    u: Ji,
    U: Ki,
    V: $i,
    w: ta,
    W: ea,
    x: null,
    X: null,
    y: na,
    Y: ia,
    Z: sa,
    "%": rn
  }, W = {
    a: z,
    A: H,
    b: U,
    B: I,
    c: null,
    d: nn,
    e: nn,
    f: la,
    g: va,
    G: xa,
    H: oa,
    I: ca,
    j: ua,
    L: Hn,
    m: fa,
    M: ha,
    p: Ut,
    q: G,
    Q: an,
    s: sn,
    S: ma,
    u: da,
    U: ga,
    V: ya,
    w: ka,
    W: pa,
    x: null,
    X: null,
    y: Ta,
    Y: ba,
    Z: wa,
    "%": rn
  }, O = {
    a: m,
    A: c,
    b: f,
    B: T,
    c: o,
    d: $e,
    e: $e,
    f: Hi,
    g: Ke,
    G: Je,
    H: tn,
    I: tn,
    j: Yi,
    L: Pi,
    m: Ni,
    M: zi,
    p: b,
    q: Ii,
    Q: Wi,
    s: Ri,
    S: Oi,
    u: Ui,
    U: Ai,
    V: Fi,
    w: _i,
    W: Ei,
    x: L,
    X: u,
    y: Ke,
    Y: Je,
    Z: Li,
    "%": Vi
  };
  P.x = M(r, P), P.X = M(n, P), P.c = M(e, P), W.x = M(r, W), W.X = M(n, W), W.c = M(e, W);
  function M(v, C) {
    return function(A) {
      var h = [], q = -1, F = 0, et = v.length, J, it, nt;
      for (A instanceof Date || (A = new Date(+A)); ++q < et; )
        v.charCodeAt(q) === 37 && (h.push(v.slice(F, q)), (it = Ge[J = v.charAt(++q)]) != null ? J = v.charAt(++q) : it = J === "e" ? " " : "0", (nt = C[J]) && (J = nt(A, it)), h.push(J), F = q + 1);
      return h.push(v.slice(F, q)), h.join("");
    };
  }
  function N(v, C) {
    return function(A) {
      var h = At(1900, void 0, 1), q = R(h, v, A += "", 0), F, et;
      if (q != A.length)
        return null;
      if ("Q" in h)
        return new Date(h.Q);
      if ("s" in h)
        return new Date(h.s * 1e3 + ("L" in h ? h.L : 0));
      if (C && !("Z" in h) && (h.Z = 0), "p" in h && (h.H = h.H % 12 + h.p * 12), h.m === void 0 && (h.m = "q" in h ? h.q : 0), "V" in h) {
        if (h.V < 1 || h.V > 53)
          return null;
        "w" in h || (h.w = 1), "Z" in h ? (F = fe(At(h.y, 0, 1)), et = F.getUTCDay(), F = et > 4 || et === 0 ? Kt.ceil(F) : Kt(F), F = Ae.offset(F, (h.V - 1) * 7), h.y = F.getUTCFullYear(), h.m = F.getUTCMonth(), h.d = F.getUTCDate() + (h.w + 6) % 7) : (F = le(At(h.y, 0, 1)), et = F.getDay(), F = et > 4 || et === 0 ? Gt.ceil(F) : Gt(F), F = xt.offset(F, (h.V - 1) * 7), h.y = F.getFullYear(), h.m = F.getMonth(), h.d = F.getDate() + (h.w + 6) % 7);
      } else
        ("W" in h || "U" in h) && ("w" in h || (h.w = "u" in h ? h.u % 7 : "W" in h ? 1 : 0), et = "Z" in h ? fe(At(h.y, 0, 1)).getUTCDay() : le(At(h.y, 0, 1)).getDay(), h.m = 0, h.d = "W" in h ? (h.w + 6) % 7 + h.W * 7 - (et + 5) % 7 : h.w + h.U * 7 - (et + 6) % 7);
      return "Z" in h ? (h.H += h.Z / 100 | 0, h.M += h.Z % 100, fe(h)) : le(h);
    };
  }
  function R(v, C, A, h) {
    for (var q = 0, F = C.length, et = A.length, J, it; q < F; ) {
      if (h >= et)
        return -1;
      if (J = C.charCodeAt(q++), J === 37) {
        if (J = C.charAt(q++), it = O[J in Ge ? C.charAt(q++) : J], !it || (h = it(v, A, h)) < 0)
          return -1;
      } else if (J != A.charCodeAt(h++))
        return -1;
    }
    return h;
  }
  function b(v, C, A) {
    var h = d.exec(C.slice(A));
    return h ? (v.p = w.get(h[0].toLowerCase()), A + h[0].length) : -1;
  }
  function m(v, C, A) {
    var h = y.exec(C.slice(A));
    return h ? (v.w = E.get(h[0].toLowerCase()), A + h[0].length) : -1;
  }
  function c(v, C, A) {
    var h = x.exec(C.slice(A));
    return h ? (v.w = k.get(h[0].toLowerCase()), A + h[0].length) : -1;
  }
  function f(v, C, A) {
    var h = Q.exec(C.slice(A));
    return h ? (v.m = tt.get(h[0].toLowerCase()), A + h[0].length) : -1;
  }
  function T(v, C, A) {
    var h = X.exec(C.slice(A));
    return h ? (v.m = B.get(h[0].toLowerCase()), A + h[0].length) : -1;
  }
  function o(v, C, A) {
    return R(v, e, C, A);
  }
  function L(v, C, A) {
    return R(v, r, C, A);
  }
  function u(v, C, A) {
    return R(v, n, C, A);
  }
  function S(v) {
    return s[v.getDay()];
  }
  function V(v) {
    return a[v.getDay()];
  }
  function j(v) {
    return g[v.getMonth()];
  }
  function p(v) {
    return l[v.getMonth()];
  }
  function _(v) {
    return i[+(v.getHours() >= 12)];
  }
  function D(v) {
    return 1 + ~~(v.getMonth() / 3);
  }
  function z(v) {
    return s[v.getUTCDay()];
  }
  function H(v) {
    return a[v.getUTCDay()];
  }
  function U(v) {
    return g[v.getUTCMonth()];
  }
  function I(v) {
    return l[v.getUTCMonth()];
  }
  function Ut(v) {
    return i[+(v.getUTCHours() >= 12)];
  }
  function G(v) {
    return 1 + ~~(v.getUTCMonth() / 3);
  }
  return {
    format: function(v) {
      var C = M(v += "", P);
      return C.toString = function() {
        return v;
      }, C;
    },
    parse: function(v) {
      var C = N(v += "", !1);
      return C.toString = function() {
        return v;
      }, C;
    },
    utcFormat: function(v) {
      var C = M(v += "", W);
      return C.toString = function() {
        return v;
      }, C;
    },
    utcParse: function(v) {
      var C = N(v += "", !0);
      return C.toString = function() {
        return v;
      }, C;
    }
  };
}
var Ge = { "-": "", _: " ", 0: "0" }, $ = /^\s*\d+/, Ci = /^%/, Di = /[\\^$*+?|[\]().{}]/g;
function Y(t, e, r) {
  var n = t < 0 ? "-" : "", i = (n ? -t : t) + "", a = i.length;
  return n + (a < r ? new Array(r - a + 1).join(e) + i : i);
}
function Si(t) {
  return t.replace(Di, "\\$&");
}
function Ft(t) {
  return new RegExp("^(?:" + t.map(Si).join("|") + ")", "i");
}
function Et(t) {
  return new Map(t.map((e, r) => [e.toLowerCase(), r]));
}
function _i(t, e, r) {
  var n = $.exec(e.slice(r, r + 1));
  return n ? (t.w = +n[0], r + n[0].length) : -1;
}
function Ui(t, e, r) {
  var n = $.exec(e.slice(r, r + 1));
  return n ? (t.u = +n[0], r + n[0].length) : -1;
}
function Ai(t, e, r) {
  var n = $.exec(e.slice(r, r + 2));
  return n ? (t.U = +n[0], r + n[0].length) : -1;
}
function Fi(t, e, r) {
  var n = $.exec(e.slice(r, r + 2));
  return n ? (t.V = +n[0], r + n[0].length) : -1;
}
function Ei(t, e, r) {
  var n = $.exec(e.slice(r, r + 2));
  return n ? (t.W = +n[0], r + n[0].length) : -1;
}
function Je(t, e, r) {
  var n = $.exec(e.slice(r, r + 4));
  return n ? (t.y = +n[0], r + n[0].length) : -1;
}
function Ke(t, e, r) {
  var n = $.exec(e.slice(r, r + 2));
  return n ? (t.y = +n[0] + (+n[0] > 68 ? 1900 : 2e3), r + n[0].length) : -1;
}
function Li(t, e, r) {
  var n = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(e.slice(r, r + 6));
  return n ? (t.Z = n[1] ? 0 : -(n[2] + (n[3] || "00")), r + n[0].length) : -1;
}
function Ii(t, e, r) {
  var n = $.exec(e.slice(r, r + 1));
  return n ? (t.q = n[0] * 3 - 3, r + n[0].length) : -1;
}
function Ni(t, e, r) {
  var n = $.exec(e.slice(r, r + 2));
  return n ? (t.m = n[0] - 1, r + n[0].length) : -1;
}
function $e(t, e, r) {
  var n = $.exec(e.slice(r, r + 2));
  return n ? (t.d = +n[0], r + n[0].length) : -1;
}
function Yi(t, e, r) {
  var n = $.exec(e.slice(r, r + 3));
  return n ? (t.m = 0, t.d = +n[0], r + n[0].length) : -1;
}
function tn(t, e, r) {
  var n = $.exec(e.slice(r, r + 2));
  return n ? (t.H = +n[0], r + n[0].length) : -1;
}
function zi(t, e, r) {
  var n = $.exec(e.slice(r, r + 2));
  return n ? (t.M = +n[0], r + n[0].length) : -1;
}
function Oi(t, e, r) {
  var n = $.exec(e.slice(r, r + 2));
  return n ? (t.S = +n[0], r + n[0].length) : -1;
}
function Pi(t, e, r) {
  var n = $.exec(e.slice(r, r + 3));
  return n ? (t.L = +n[0], r + n[0].length) : -1;
}
function Hi(t, e, r) {
  var n = $.exec(e.slice(r, r + 6));
  return n ? (t.L = Math.floor(n[0] / 1e3), r + n[0].length) : -1;
}
function Vi(t, e, r) {
  var n = Ci.exec(e.slice(r, r + 1));
  return n ? r + n[0].length : -1;
}
function Wi(t, e, r) {
  var n = $.exec(e.slice(r));
  return n ? (t.Q = +n[0], r + n[0].length) : -1;
}
function Ri(t, e, r) {
  var n = $.exec(e.slice(r));
  return n ? (t.s = +n[0], r + n[0].length) : -1;
}
function en(t, e) {
  return Y(t.getDate(), e, 2);
}
function Bi(t, e) {
  return Y(t.getHours(), e, 2);
}
function ji(t, e) {
  return Y(t.getHours() % 12 || 12, e, 2);
}
function qi(t, e) {
  return Y(1 + xt.count(mt(t), t), e, 3);
}
function On(t, e) {
  return Y(t.getMilliseconds(), e, 3);
}
function Zi(t, e) {
  return On(t, e) + "000";
}
function Xi(t, e) {
  return Y(t.getMonth() + 1, e, 2);
}
function Qi(t, e) {
  return Y(t.getMinutes(), e, 2);
}
function Gi(t, e) {
  return Y(t.getSeconds(), e, 2);
}
function Ji(t) {
  var e = t.getDay();
  return e === 0 ? 7 : e;
}
function Ki(t, e) {
  return Y(wt.count(mt(t) - 1, t), e, 2);
}
function Pn(t) {
  var e = t.getDay();
  return e >= 4 || e === 0 ? Mt(t) : Mt.ceil(t);
}
function $i(t, e) {
  return t = Pn(t), Y(Mt.count(mt(t), t) + (mt(t).getDay() === 4), e, 2);
}
function ta(t) {
  return t.getDay();
}
function ea(t, e) {
  return Y(Gt.count(mt(t) - 1, t), e, 2);
}
function na(t, e) {
  return Y(t.getFullYear() % 100, e, 2);
}
function ra(t, e) {
  return t = Pn(t), Y(t.getFullYear() % 100, e, 2);
}
function ia(t, e) {
  return Y(t.getFullYear() % 1e4, e, 4);
}
function aa(t, e) {
  var r = t.getDay();
  return t = r >= 4 || r === 0 ? Mt(t) : Mt.ceil(t), Y(t.getFullYear() % 1e4, e, 4);
}
function sa(t) {
  var e = t.getTimezoneOffset();
  return (e > 0 ? "-" : (e *= -1, "+")) + Y(e / 60 | 0, "0", 2) + Y(e % 60, "0", 2);
}
function nn(t, e) {
  return Y(t.getUTCDate(), e, 2);
}
function oa(t, e) {
  return Y(t.getUTCHours(), e, 2);
}
function ca(t, e) {
  return Y(t.getUTCHours() % 12 || 12, e, 2);
}
function ua(t, e) {
  return Y(1 + Ae.count(Dt(t), t), e, 3);
}
function Hn(t, e) {
  return Y(t.getUTCMilliseconds(), e, 3);
}
function la(t, e) {
  return Hn(t, e) + "000";
}
function fa(t, e) {
  return Y(t.getUTCMonth() + 1, e, 2);
}
function ha(t, e) {
  return Y(t.getUTCMinutes(), e, 2);
}
function ma(t, e) {
  return Y(t.getUTCSeconds(), e, 2);
}
function da(t) {
  var e = t.getUTCDay();
  return e === 0 ? 7 : e;
}
function ga(t, e) {
  return Y(Fe.count(Dt(t) - 1, t), e, 2);
}
function Vn(t) {
  var e = t.getUTCDay();
  return e >= 4 || e === 0 ? Ct(t) : Ct.ceil(t);
}
function ya(t, e) {
  return t = Vn(t), Y(Ct.count(Dt(t), t) + (Dt(t).getUTCDay() === 4), e, 2);
}
function ka(t) {
  return t.getUTCDay();
}
function pa(t, e) {
  return Y(Kt.count(Dt(t) - 1, t), e, 2);
}
function Ta(t, e) {
  return Y(t.getUTCFullYear() % 100, e, 2);
}
function va(t, e) {
  return t = Vn(t), Y(t.getUTCFullYear() % 100, e, 2);
}
function ba(t, e) {
  return Y(t.getUTCFullYear() % 1e4, e, 4);
}
function xa(t, e) {
  var r = t.getUTCDay();
  return t = r >= 4 || r === 0 ? Ct(t) : Ct.ceil(t), Y(t.getUTCFullYear() % 1e4, e, 4);
}
function wa() {
  return "+0000";
}
function rn() {
  return "%";
}
function an(t) {
  return +t;
}
function sn(t) {
  return Math.floor(+t / 1e3);
}
var yt, $t;
Ma({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
});
function Ma(t) {
  return yt = Mi(t), $t = yt.format, yt.parse, yt.utcFormat, yt.utcParse, yt;
}
function Ca(t) {
  return new Date(t);
}
function Da(t) {
  return t instanceof Date ? +t : +new Date(+t);
}
function Wn(t, e, r, n, i, a, s, l, g, d) {
  var w = Dn(), x = w.invert, k = w.domain, y = d(".%L"), E = d(":%S"), X = d("%I:%M"), B = d("%I %p"), Q = d("%a %d"), tt = d("%b %d"), P = d("%B"), W = d("%Y");
  function O(M) {
    return (g(M) < M ? y : l(M) < M ? E : s(M) < M ? X : a(M) < M ? B : n(M) < M ? i(M) < M ? Q : tt : r(M) < M ? P : W)(M);
  }
  return w.invert = function(M) {
    return new Date(x(M));
  }, w.domain = function(M) {
    return arguments.length ? k(Array.from(M, Da)) : k().map(Ca);
  }, w.ticks = function(M) {
    var N = k();
    return t(N[0], N[N.length - 1], M ?? 10);
  }, w.tickFormat = function(M, N) {
    return N == null ? O : d(N);
  }, w.nice = function(M) {
    var N = k();
    return (!M || typeof M.range != "function") && (M = e(N[0], N[N.length - 1], M ?? 10)), M ? k(ui(N, M)) : w;
  }, w.copy = function() {
    return Cn(w, Wn(t, e, r, n, i, a, s, l, g, d));
  }, w;
}
function Sa() {
  return hn.apply(Wn(xi, wi, mt, Jt, wt, xt, Qt, Xt, Lt, $t).domain([new Date(2e3, 0, 1), new Date(2e3, 0, 2)]), arguments);
}
var be = function() {
  var t = function(R, b, m, c) {
    for (m = m || {}, c = R.length; c--; m[R[c]] = b)
      ;
    return m;
  }, e = [1, 3], r = [1, 5], n = [7, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 23, 25, 26, 28, 35, 40], i = [1, 15], a = [1, 16], s = [1, 17], l = [1, 18], g = [1, 19], d = [1, 20], w = [1, 21], x = [1, 22], k = [1, 23], y = [1, 24], E = [1, 25], X = [1, 26], B = [1, 27], Q = [1, 29], tt = [1, 31], P = [1, 34], W = [5, 7, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 23, 25, 26, 28, 35, 40], O = {
    trace: function() {
    },
    yy: {},
    symbols_: { error: 2, start: 3, directive: 4, gantt: 5, document: 6, EOF: 7, line: 8, SPACE: 9, statement: 10, NL: 11, dateFormat: 12, inclusiveEndDates: 13, topAxis: 14, axisFormat: 15, tickInterval: 16, excludes: 17, includes: 18, todayMarker: 19, title: 20, acc_title: 21, acc_title_value: 22, acc_descr: 23, acc_descr_value: 24, acc_descr_multiline_value: 25, section: 26, clickStatement: 27, taskTxt: 28, taskData: 29, openDirective: 30, typeDirective: 31, closeDirective: 32, ":": 33, argDirective: 34, click: 35, callbackname: 36, callbackargs: 37, href: 38, clickStatementDebug: 39, open_directive: 40, type_directive: 41, arg_directive: 42, close_directive: 43, $accept: 0, $end: 1 },
    terminals_: { 2: "error", 5: "gantt", 7: "EOF", 9: "SPACE", 11: "NL", 12: "dateFormat", 13: "inclusiveEndDates", 14: "topAxis", 15: "axisFormat", 16: "tickInterval", 17: "excludes", 18: "includes", 19: "todayMarker", 20: "title", 21: "acc_title", 22: "acc_title_value", 23: "acc_descr", 24: "acc_descr_value", 25: "acc_descr_multiline_value", 26: "section", 28: "taskTxt", 29: "taskData", 33: ":", 35: "click", 36: "callbackname", 37: "callbackargs", 38: "href", 40: "open_directive", 41: "type_directive", 42: "arg_directive", 43: "close_directive" },
    productions_: [0, [3, 2], [3, 3], [6, 0], [6, 2], [8, 2], [8, 1], [8, 1], [8, 1], [10, 1], [10, 1], [10, 1], [10, 1], [10, 1], [10, 1], [10, 1], [10, 1], [10, 1], [10, 2], [10, 2], [10, 1], [10, 1], [10, 1], [10, 2], [10, 1], [4, 4], [4, 6], [27, 2], [27, 3], [27, 3], [27, 4], [27, 3], [27, 4], [27, 2], [39, 2], [39, 3], [39, 3], [39, 4], [39, 3], [39, 4], [39, 2], [30, 1], [31, 1], [34, 1], [32, 1]],
    performAction: function(b, m, c, f, T, o, L) {
      var u = o.length - 1;
      switch (T) {
        case 2:
          return o[u - 1];
        case 3:
          this.$ = [];
          break;
        case 4:
          o[u - 1].push(o[u]), this.$ = o[u - 1];
          break;
        case 5:
        case 6:
          this.$ = o[u];
          break;
        case 7:
        case 8:
          this.$ = [];
          break;
        case 9:
          f.setDateFormat(o[u].substr(11)), this.$ = o[u].substr(11);
          break;
        case 10:
          f.enableInclusiveEndDates(), this.$ = o[u].substr(18);
          break;
        case 11:
          f.TopAxis(), this.$ = o[u].substr(8);
          break;
        case 12:
          f.setAxisFormat(o[u].substr(11)), this.$ = o[u].substr(11);
          break;
        case 13:
          f.setTickInterval(o[u].substr(13)), this.$ = o[u].substr(13);
          break;
        case 14:
          f.setExcludes(o[u].substr(9)), this.$ = o[u].substr(9);
          break;
        case 15:
          f.setIncludes(o[u].substr(9)), this.$ = o[u].substr(9);
          break;
        case 16:
          f.setTodayMarker(o[u].substr(12)), this.$ = o[u].substr(12);
          break;
        case 17:
          f.setDiagramTitle(o[u].substr(6)), this.$ = o[u].substr(6);
          break;
        case 18:
          this.$ = o[u].trim(), f.setAccTitle(this.$);
          break;
        case 19:
        case 20:
          this.$ = o[u].trim(), f.setAccDescription(this.$);
          break;
        case 21:
          f.addSection(o[u].substr(8)), this.$ = o[u].substr(8);
          break;
        case 23:
          f.addTask(o[u - 1], o[u]), this.$ = "task";
          break;
        case 27:
          this.$ = o[u - 1], f.setClickEvent(o[u - 1], o[u], null);
          break;
        case 28:
          this.$ = o[u - 2], f.setClickEvent(o[u - 2], o[u - 1], o[u]);
          break;
        case 29:
          this.$ = o[u - 2], f.setClickEvent(o[u - 2], o[u - 1], null), f.setLink(o[u - 2], o[u]);
          break;
        case 30:
          this.$ = o[u - 3], f.setClickEvent(o[u - 3], o[u - 2], o[u - 1]), f.setLink(o[u - 3], o[u]);
          break;
        case 31:
          this.$ = o[u - 2], f.setClickEvent(o[u - 2], o[u], null), f.setLink(o[u - 2], o[u - 1]);
          break;
        case 32:
          this.$ = o[u - 3], f.setClickEvent(o[u - 3], o[u - 1], o[u]), f.setLink(o[u - 3], o[u - 2]);
          break;
        case 33:
          this.$ = o[u - 1], f.setLink(o[u - 1], o[u]);
          break;
        case 34:
        case 40:
          this.$ = o[u - 1] + " " + o[u];
          break;
        case 35:
        case 36:
        case 38:
          this.$ = o[u - 2] + " " + o[u - 1] + " " + o[u];
          break;
        case 37:
        case 39:
          this.$ = o[u - 3] + " " + o[u - 2] + " " + o[u - 1] + " " + o[u];
          break;
        case 41:
          f.parseDirective("%%{", "open_directive");
          break;
        case 42:
          f.parseDirective(o[u], "type_directive");
          break;
        case 43:
          o[u] = o[u].trim().replace(/'/g, '"'), f.parseDirective(o[u], "arg_directive");
          break;
        case 44:
          f.parseDirective("}%%", "close_directive", "gantt");
          break;
      }
    },
    table: [{ 3: 1, 4: 2, 5: e, 30: 4, 40: r }, { 1: [3] }, { 3: 6, 4: 2, 5: e, 30: 4, 40: r }, t(n, [2, 3], { 6: 7 }), { 31: 8, 41: [1, 9] }, { 41: [2, 41] }, { 1: [2, 1] }, { 4: 30, 7: [1, 10], 8: 11, 9: [1, 12], 10: 13, 11: [1, 14], 12: i, 13: a, 14: s, 15: l, 16: g, 17: d, 18: w, 19: x, 20: k, 21: y, 23: E, 25: X, 26: B, 27: 28, 28: Q, 30: 4, 35: tt, 40: r }, { 32: 32, 33: [1, 33], 43: P }, t([33, 43], [2, 42]), t(n, [2, 8], { 1: [2, 2] }), t(n, [2, 4]), { 4: 30, 10: 35, 12: i, 13: a, 14: s, 15: l, 16: g, 17: d, 18: w, 19: x, 20: k, 21: y, 23: E, 25: X, 26: B, 27: 28, 28: Q, 30: 4, 35: tt, 40: r }, t(n, [2, 6]), t(n, [2, 7]), t(n, [2, 9]), t(n, [2, 10]), t(n, [2, 11]), t(n, [2, 12]), t(n, [2, 13]), t(n, [2, 14]), t(n, [2, 15]), t(n, [2, 16]), t(n, [2, 17]), { 22: [1, 36] }, { 24: [1, 37] }, t(n, [2, 20]), t(n, [2, 21]), t(n, [2, 22]), { 29: [1, 38] }, t(n, [2, 24]), { 36: [1, 39], 38: [1, 40] }, { 11: [1, 41] }, { 34: 42, 42: [1, 43] }, { 11: [2, 44] }, t(n, [2, 5]), t(n, [2, 18]), t(n, [2, 19]), t(n, [2, 23]), t(n, [2, 27], { 37: [1, 44], 38: [1, 45] }), t(n, [2, 33], { 36: [1, 46] }), t(W, [2, 25]), { 32: 47, 43: P }, { 43: [2, 43] }, t(n, [2, 28], { 38: [1, 48] }), t(n, [2, 29]), t(n, [2, 31], { 37: [1, 49] }), { 11: [1, 50] }, t(n, [2, 30]), t(n, [2, 32]), t(W, [2, 26])],
    defaultActions: { 5: [2, 41], 6: [2, 1], 34: [2, 44], 43: [2, 43] },
    parseError: function(b, m) {
      if (m.recoverable)
        this.trace(b);
      else {
        var c = new Error(b);
        throw c.hash = m, c;
      }
    },
    parse: function(b) {
      var m = this, c = [0], f = [], T = [null], o = [], L = this.table, u = "", S = 0, V = 0, j = 2, p = 1, _ = o.slice.call(arguments, 1), D = Object.create(this.lexer), z = { yy: {} };
      for (var H in this.yy)
        Object.prototype.hasOwnProperty.call(this.yy, H) && (z.yy[H] = this.yy[H]);
      D.setInput(b, z.yy), z.yy.lexer = D, z.yy.parser = this, typeof D.yylloc > "u" && (D.yylloc = {});
      var U = D.yylloc;
      o.push(U);
      var I = D.options && D.options.ranges;
      typeof z.yy.parseError == "function" ? this.parseError = z.yy.parseError : this.parseError = Object.getPrototypeOf(this).parseError;
      function Ut() {
        var nt;
        return nt = f.pop() || D.lex() || p, typeof nt != "number" && (nt instanceof Array && (f = nt, nt = f.pop()), nt = m.symbols_[nt] || nt), nt;
      }
      for (var G, v, C, A, h = {}, q, F, et, J; ; ) {
        if (v = c[c.length - 1], this.defaultActions[v] ? C = this.defaultActions[v] : ((G === null || typeof G > "u") && (G = Ut()), C = L[v] && L[v][G]), typeof C > "u" || !C.length || !C[0]) {
          var it = "";
          J = [];
          for (q in L[v])
            this.terminals_[q] && q > j && J.push("'" + this.terminals_[q] + "'");
          D.showPosition ? it = "Parse error on line " + (S + 1) + `:
` + D.showPosition() + `
Expecting ` + J.join(", ") + ", got '" + (this.terminals_[G] || G) + "'" : it = "Parse error on line " + (S + 1) + ": Unexpected " + (G == p ? "end of input" : "'" + (this.terminals_[G] || G) + "'"), this.parseError(it, {
            text: D.match,
            token: this.terminals_[G] || G,
            line: D.yylineno,
            loc: U,
            expected: J
          });
        }
        if (C[0] instanceof Array && C.length > 1)
          throw new Error("Parse Error: multiple actions possible at state: " + v + ", token: " + G);
        switch (C[0]) {
          case 1:
            c.push(G), T.push(D.yytext), o.push(D.yylloc), c.push(C[1]), G = null, V = D.yyleng, u = D.yytext, S = D.yylineno, U = D.yylloc;
            break;
          case 2:
            if (F = this.productions_[C[1]][1], h.$ = T[T.length - F], h._$ = {
              first_line: o[o.length - (F || 1)].first_line,
              last_line: o[o.length - 1].last_line,
              first_column: o[o.length - (F || 1)].first_column,
              last_column: o[o.length - 1].last_column
            }, I && (h._$.range = [
              o[o.length - (F || 1)].range[0],
              o[o.length - 1].range[1]
            ]), A = this.performAction.apply(h, [
              u,
              V,
              S,
              z.yy,
              C[1],
              T,
              o
            ].concat(_)), typeof A < "u")
              return A;
            F && (c = c.slice(0, -1 * F * 2), T = T.slice(0, -1 * F), o = o.slice(0, -1 * F)), c.push(this.productions_[C[1]][0]), T.push(h.$), o.push(h._$), et = L[c[c.length - 2]][c[c.length - 1]], c.push(et);
            break;
          case 3:
            return !0;
        }
      }
      return !0;
    }
  }, M = function() {
    var R = {
      EOF: 1,
      parseError: function(m, c) {
        if (this.yy.parser)
          this.yy.parser.parseError(m, c);
        else
          throw new Error(m);
      },
      // resets the lexer, sets new input
      setInput: function(b, m) {
        return this.yy = m || this.yy || {}, this._input = b, this._more = this._backtrack = this.done = !1, this.yylineno = this.yyleng = 0, this.yytext = this.matched = this.match = "", this.conditionStack = ["INITIAL"], this.yylloc = {
          first_line: 1,
          first_column: 0,
          last_line: 1,
          last_column: 0
        }, this.options.ranges && (this.yylloc.range = [0, 0]), this.offset = 0, this;
      },
      // consumes and returns one char from the input
      input: function() {
        var b = this._input[0];
        this.yytext += b, this.yyleng++, this.offset++, this.match += b, this.matched += b;
        var m = b.match(/(?:\r\n?|\n).*/g);
        return m ? (this.yylineno++, this.yylloc.last_line++) : this.yylloc.last_column++, this.options.ranges && this.yylloc.range[1]++, this._input = this._input.slice(1), b;
      },
      // unshifts one char (or a string) into the input
      unput: function(b) {
        var m = b.length, c = b.split(/(?:\r\n?|\n)/g);
        this._input = b + this._input, this.yytext = this.yytext.substr(0, this.yytext.length - m), this.offset -= m;
        var f = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1), this.matched = this.matched.substr(0, this.matched.length - 1), c.length - 1 && (this.yylineno -= c.length - 1);
        var T = this.yylloc.range;
        return this.yylloc = {
          first_line: this.yylloc.first_line,
          last_line: this.yylineno + 1,
          first_column: this.yylloc.first_column,
          last_column: c ? (c.length === f.length ? this.yylloc.first_column : 0) + f[f.length - c.length].length - c[0].length : this.yylloc.first_column - m
        }, this.options.ranges && (this.yylloc.range = [T[0], T[0] + this.yyleng - m]), this.yyleng = this.yytext.length, this;
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
      less: function(b) {
        this.unput(this.match.slice(b));
      },
      // displays already matched input, i.e. for error messages
      pastInput: function() {
        var b = this.matched.substr(0, this.matched.length - this.match.length);
        return (b.length > 20 ? "..." : "") + b.substr(-20).replace(/\n/g, "");
      },
      // displays upcoming input, i.e. for error messages
      upcomingInput: function() {
        var b = this.match;
        return b.length < 20 && (b += this._input.substr(0, 20 - b.length)), (b.substr(0, 20) + (b.length > 20 ? "..." : "")).replace(/\n/g, "");
      },
      // displays the character position where the lexing error occurred, i.e. for error messages
      showPosition: function() {
        var b = this.pastInput(), m = new Array(b.length + 1).join("-");
        return b + this.upcomingInput() + `
` + m + "^";
      },
      // test the lexed token: return FALSE when not a match, otherwise return token
      test_match: function(b, m) {
        var c, f, T;
        if (this.options.backtrack_lexer && (T = {
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
        }, this.options.ranges && (T.yylloc.range = this.yylloc.range.slice(0))), f = b[0].match(/(?:\r\n?|\n).*/g), f && (this.yylineno += f.length), this.yylloc = {
          first_line: this.yylloc.last_line,
          last_line: this.yylineno + 1,
          first_column: this.yylloc.last_column,
          last_column: f ? f[f.length - 1].length - f[f.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + b[0].length
        }, this.yytext += b[0], this.match += b[0], this.matches = b, this.yyleng = this.yytext.length, this.options.ranges && (this.yylloc.range = [this.offset, this.offset += this.yyleng]), this._more = !1, this._backtrack = !1, this._input = this._input.slice(b[0].length), this.matched += b[0], c = this.performAction.call(this, this.yy, this, m, this.conditionStack[this.conditionStack.length - 1]), this.done && this._input && (this.done = !1), c)
          return c;
        if (this._backtrack) {
          for (var o in T)
            this[o] = T[o];
          return !1;
        }
        return !1;
      },
      // return next match in input
      next: function() {
        if (this.done)
          return this.EOF;
        this._input || (this.done = !0);
        var b, m, c, f;
        this._more || (this.yytext = "", this.match = "");
        for (var T = this._currentRules(), o = 0; o < T.length; o++)
          if (c = this._input.match(this.rules[T[o]]), c && (!m || c[0].length > m[0].length)) {
            if (m = c, f = o, this.options.backtrack_lexer) {
              if (b = this.test_match(c, T[o]), b !== !1)
                return b;
              if (this._backtrack) {
                m = !1;
                continue;
              } else
                return !1;
            } else if (!this.options.flex)
              break;
          }
        return m ? (b = this.test_match(m, T[f]), b !== !1 ? b : !1) : this._input === "" ? this.EOF : this.parseError("Lexical error on line " + (this.yylineno + 1) + `. Unrecognized text.
` + this.showPosition(), {
          text: "",
          token: null,
          line: this.yylineno
        });
      },
      // return next match that has a token
      lex: function() {
        var m = this.next();
        return m || this.lex();
      },
      // activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
      begin: function(m) {
        this.conditionStack.push(m);
      },
      // pop the previously active lexer condition state off the condition stack
      popState: function() {
        var m = this.conditionStack.length - 1;
        return m > 0 ? this.conditionStack.pop() : this.conditionStack[0];
      },
      // produce the lexer rule set which is active for the currently active lexer condition state
      _currentRules: function() {
        return this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1] ? this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules : this.conditions.INITIAL.rules;
      },
      // return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
      topState: function(m) {
        return m = this.conditionStack.length - 1 - Math.abs(m || 0), m >= 0 ? this.conditionStack[m] : "INITIAL";
      },
      // alias for begin(condition)
      pushState: function(m) {
        this.begin(m);
      },
      // return the number of states currently on the stack
      stateStackSize: function() {
        return this.conditionStack.length;
      },
      options: { "case-insensitive": !0 },
      performAction: function(m, c, f, T) {
        switch (f) {
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
    return R;
  }();
  O.lexer = M;
  function N() {
    this.yy = {};
  }
  return N.prototype = O, O.Parser = N, new N();
}();
be.parser = be;
const _a = be;
let at = "", Le = "", Ie, Ne = "", It = [], Nt = [], Ye = {}, ze = [], te = [], St = "";
const Rn = ["active", "done", "crit", "milestone"];
let Oe = [], Yt = !1, Pe = !1, xe = 0;
const Ua = function(t, e, r) {
  ar.parseDirective(this, t, e, r);
}, Aa = function() {
  ze = [], te = [], St = "", Oe = [], Wt = 0, Me = void 0, Rt = void 0, Z = [], at = "", Le = "", Ie = void 0, Ne = "", It = [], Nt = [], Yt = !1, Pe = !1, xe = 0, Ye = {}, hr();
}, Fa = function(t) {
  Le = t;
}, Ea = function() {
  return Le;
}, La = function(t) {
  Ie = t;
}, Ia = function() {
  return Ie;
}, Na = function(t) {
  Ne = t;
}, Ya = function() {
  return Ne;
}, za = function(t) {
  at = t;
}, Oa = function() {
  Yt = !0;
}, Pa = function() {
  return Yt;
}, Ha = function() {
  Pe = !0;
}, Va = function() {
  return Pe;
}, Wa = function() {
  return at;
}, Ra = function(t) {
  It = t.toLowerCase().split(/[\s,]+/);
}, Ba = function() {
  return It;
}, ja = function(t) {
  Nt = t.toLowerCase().split(/[\s,]+/);
}, qa = function() {
  return Nt;
}, Za = function() {
  return Ye;
}, Xa = function(t) {
  St = t, ze.push(t);
}, Qa = function() {
  return ze;
}, Ga = function() {
  let t = on();
  const e = 10;
  let r = 0;
  for (; !t && r < e; )
    t = on(), r++;
  return te = Z, te;
}, Bn = function(t, e, r, n) {
  return n.includes(t.format(e.trim())) ? !1 : t.isoWeekday() >= 6 && r.includes("weekends") || r.includes(t.format("dddd").toLowerCase()) ? !0 : r.includes(t.format(e.trim()));
}, jn = function(t, e, r, n) {
  if (!r.length || t.manualEndTime)
    return;
  let i = ot(t.startTime, e, !0);
  i.add(1, "d");
  let a = ot(t.endTime, e, !0), s = Ja(i, a, e, r, n);
  t.endTime = a.toDate(), t.renderEndTime = s;
}, Ja = function(t, e, r, n, i) {
  let a = !1, s = null;
  for (; t <= e; )
    a || (s = e.toDate()), a = Bn(t, r, n, i), a && e.add(1, "d"), t.add(1, "d");
  return s;
}, we = function(t, e, r) {
  r = r.trim();
  const i = /^after\s+([\d\w- ]+)/.exec(r.trim());
  if (i !== null) {
    let s = null;
    if (i[1].split(" ").forEach(function(l) {
      let g = _t(l);
      g !== void 0 && (s ? g.endTime > s.endTime && (s = g) : s = g);
    }), s)
      return s.endTime;
    {
      const l = new Date();
      return l.setHours(0, 0, 0, 0), l;
    }
  }
  let a = ot(r, e.trim(), !0);
  if (a.isValid())
    return a.toDate();
  {
    me.debug("Invalid date:" + r), me.debug("With date format:" + e.trim());
    const s = new Date(r);
    if (s === void 0 || isNaN(s.getTime()))
      throw new Error("Invalid date:" + r);
    return s;
  }
}, qn = function(t) {
  const e = /^(\d+(?:\.\d+)?)([Mdhmswy]|ms)$/.exec(t.trim());
  return e !== null ? ot.duration(Number.parseFloat(e[1]), e[2]) : ot.duration.invalid();
}, Zn = function(t, e, r, n = !1) {
  r = r.trim();
  let i = ot(r, e.trim(), !0);
  if (i.isValid())
    return n && i.add(1, "d"), i.toDate();
  const a = ot(t), s = qn(r);
  return s.isValid() && a.add(s), a.toDate();
};
let Wt = 0;
const vt = function(t) {
  return t === void 0 ? (Wt = Wt + 1, "task" + Wt) : t;
}, Ka = function(t, e) {
  let r;
  e.substr(0, 1) === ":" ? r = e.substr(1, e.length) : r = e;
  const n = r.split(","), i = {};
  Jn(n, i, Rn);
  for (let s = 0; s < n.length; s++)
    n[s] = n[s].trim();
  let a = "";
  switch (n.length) {
    case 1:
      i.id = vt(), i.startTime = t.endTime, a = n[0];
      break;
    case 2:
      i.id = vt(), i.startTime = we(void 0, at, n[0]), a = n[1];
      break;
    case 3:
      i.id = vt(n[0]), i.startTime = we(void 0, at, n[1]), a = n[2];
      break;
  }
  return a && (i.endTime = Zn(i.startTime, at, a, Yt), i.manualEndTime = ot(a, "YYYY-MM-DD", !0).isValid(), jn(i, at, Nt, It)), i;
}, $a = function(t, e) {
  let r;
  e.substr(0, 1) === ":" ? r = e.substr(1, e.length) : r = e;
  const n = r.split(","), i = {};
  Jn(n, i, Rn);
  for (let a = 0; a < n.length; a++)
    n[a] = n[a].trim();
  switch (n.length) {
    case 1:
      i.id = vt(), i.startTime = {
        type: "prevTaskEnd",
        id: t
      }, i.endTime = {
        data: n[0]
      };
      break;
    case 2:
      i.id = vt(), i.startTime = {
        type: "getStartDate",
        startData: n[0]
      }, i.endTime = {
        data: n[1]
      };
      break;
    case 3:
      i.id = vt(n[0]), i.startTime = {
        type: "getStartDate",
        startData: n[1]
      }, i.endTime = {
        data: n[2]
      };
      break;
  }
  return i;
};
let Me, Rt, Z = [];
const Xn = {}, ts = function(t, e) {
  const r = {
    section: St,
    type: St,
    processed: !1,
    manualEndTime: !1,
    renderEndTime: null,
    raw: { data: e },
    task: t,
    classes: []
  }, n = $a(Rt, e);
  r.raw.startTime = n.startTime, r.raw.endTime = n.endTime, r.id = n.id, r.prevTaskId = Rt, r.active = n.active, r.done = n.done, r.crit = n.crit, r.milestone = n.milestone, r.order = xe, xe++;
  const i = Z.push(r);
  Rt = r.id, Xn[r.id] = i - 1;
}, _t = function(t) {
  const e = Xn[t];
  return Z[e];
}, es = function(t, e) {
  const r = {
    section: St,
    type: St,
    description: t,
    task: t,
    classes: []
  }, n = Ka(Me, e);
  r.startTime = n.startTime, r.endTime = n.endTime, r.id = n.id, r.active = n.active, r.done = n.done, r.crit = n.crit, r.milestone = n.milestone, Me = r, te.push(r);
}, on = function() {
  const t = function(r) {
    const n = Z[r];
    let i = "";
    switch (Z[r].raw.startTime.type) {
      case "prevTaskEnd": {
        const a = _t(n.prevTaskId);
        n.startTime = a.endTime;
        break;
      }
      case "getStartDate":
        i = we(void 0, at, Z[r].raw.startTime.startData), i && (Z[r].startTime = i);
        break;
    }
    return Z[r].startTime && (Z[r].endTime = Zn(
      Z[r].startTime,
      at,
      Z[r].raw.endTime.data,
      Yt
    ), Z[r].endTime && (Z[r].processed = !0, Z[r].manualEndTime = ot(
      Z[r].raw.endTime.data,
      "YYYY-MM-DD",
      !0
    ).isValid(), jn(Z[r], at, Nt, It))), Z[r].processed;
  };
  let e = !0;
  for (const [r, n] of Z.entries())
    t(r), e = e && n.processed;
  return e;
}, ns = function(t, e) {
  let r = e;
  pt().securityLevel !== "loose" && (r = rr(e)), t.split(",").forEach(function(n) {
    _t(n) !== void 0 && (Gn(n, () => {
      window.open(r, "_self");
    }), Ye[n] = r);
  }), Qn(t, "clickable");
}, Qn = function(t, e) {
  t.split(",").forEach(function(r) {
    let n = _t(r);
    n !== void 0 && n.classes.push(e);
  });
}, rs = function(t, e, r) {
  if (pt().securityLevel !== "loose" || e === void 0)
    return;
  let n = [];
  if (typeof r == "string") {
    n = r.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    for (let a = 0; a < n.length; a++) {
      let s = n[a].trim();
      s.charAt(0) === '"' && s.charAt(s.length - 1) === '"' && (s = s.substr(1, s.length - 2)), n[a] = s;
    }
  }
  n.length === 0 && n.push(t), _t(t) !== void 0 && Gn(t, () => {
    ir.runFunc(e, ...n);
  });
}, Gn = function(t, e) {
  Oe.push(
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
}, is = function(t, e, r) {
  t.split(",").forEach(function(n) {
    rs(n, e, r);
  }), Qn(t, "clickable");
}, as = function(t) {
  Oe.forEach(function(e) {
    e(t);
  });
}, ss = {
  parseDirective: Ua,
  getConfig: () => pt().gantt,
  clear: Aa,
  setDateFormat: za,
  getDateFormat: Wa,
  enableInclusiveEndDates: Oa,
  endDatesAreInclusive: Pa,
  enableTopAxis: Ha,
  topAxisEnabled: Va,
  setAxisFormat: Fa,
  getAxisFormat: Ea,
  setTickInterval: La,
  getTickInterval: Ia,
  setTodayMarker: Na,
  getTodayMarker: Ya,
  setAccTitle: sr,
  getAccTitle: or,
  setDiagramTitle: cr,
  getDiagramTitle: ur,
  setAccDescription: lr,
  getAccDescription: fr,
  addSection: Xa,
  getSections: Qa,
  getTasks: Ga,
  addTask: ts,
  findTaskById: _t,
  addTaskOrg: es,
  setIncludes: Ra,
  getIncludes: Ba,
  setExcludes: ja,
  getExcludes: qa,
  setClickEvent: is,
  setLink: ns,
  getLinks: Za,
  bindFunctions: as,
  parseDuration: qn,
  isInvalidDate: Bn
};
function Jn(t, e, r) {
  let n = !0;
  for (; n; )
    n = !1, r.forEach(function(i) {
      const a = "^\\s*" + i + "\\s*$", s = new RegExp(a);
      t[0].match(s) && (e[i] = !0, t.shift(1), n = !0);
    });
}
const os = function() {
  me.debug("Something is calling, setConf, remove the call");
};
let ct;
const cs = function(t, e, r, n) {
  const i = pt().gantt, a = pt().securityLevel;
  let s;
  a === "sandbox" && (s = zt("#i" + e));
  const l = a === "sandbox" ? zt(s.nodes()[0].contentDocument.body) : zt("body"), g = a === "sandbox" ? s.nodes()[0].contentDocument : document, d = g.getElementById(e);
  ct = d.parentElement.offsetWidth, ct === void 0 && (ct = 1200), i.useWidth !== void 0 && (ct = i.useWidth);
  const w = n.db.getTasks(), x = w.length * (i.barHeight + i.barGap) + 2 * i.topPadding;
  d.setAttribute("viewBox", "0 0 " + ct + " " + x);
  const k = l.select(`[id="${e}"]`), y = Sa().domain([
    xr(w, function(m) {
      return m.startTime;
    }),
    br(w, function(m) {
      return m.endTime;
    })
  ]).rangeRound([0, ct - i.leftPadding - i.rightPadding]);
  let E = [];
  for (const m of w)
    E.push(m.type);
  const X = E;
  E = N(E);
  function B(m, c) {
    const f = m.startTime, T = c.startTime;
    let o = 0;
    return f > T ? o = 1 : f < T && (o = -1), o;
  }
  w.sort(B), Q(w, ct, x), mr(k, x, ct, i.useMaxWidth), k.append("text").text(n.db.getDiagramTitle()).attr("x", ct / 2).attr("y", i.titleTopMargin).attr("class", "titleText");
  function Q(m, c, f) {
    const T = i.barHeight, o = T + i.barGap, L = i.topPadding, u = i.leftPadding, S = Sn().domain([0, E.length]).range(["#00B9FA", "#F95002"]).interpolate(Rr);
    P(
      o,
      L,
      u,
      c,
      f,
      m,
      n.db.getExcludes(),
      n.db.getIncludes()
    ), W(u, L, c, f), tt(m, o, L, u, T, S, c), O(o, L), M(u, L, c, f);
  }
  function tt(m, c, f, T, o, L, u) {
    k.append("g").selectAll("rect").data(m).enter().append("rect").attr("x", 0).attr("y", function(p, _) {
      return _ = p.order, _ * c + f - 2;
    }).attr("width", function() {
      return u - i.rightPadding / 2;
    }).attr("height", c).attr("class", function(p) {
      for (const [_, D] of E.entries())
        if (p.type === D)
          return "section section" + _ % i.numberSectionStyles;
      return "section section0";
    });
    const S = k.append("g").selectAll("rect").data(m).enter(), V = n.db.getLinks();
    if (S.append("rect").attr("id", function(p) {
      return p.id;
    }).attr("rx", 3).attr("ry", 3).attr("x", function(p) {
      return p.milestone ? y(p.startTime) + T + 0.5 * (y(p.endTime) - y(p.startTime)) - 0.5 * o : y(p.startTime) + T;
    }).attr("y", function(p, _) {
      return _ = p.order, _ * c + f;
    }).attr("width", function(p) {
      return p.milestone ? o : y(p.renderEndTime || p.endTime) - y(p.startTime);
    }).attr("height", o).attr("transform-origin", function(p, _) {
      return _ = p.order, (y(p.startTime) + T + 0.5 * (y(p.endTime) - y(p.startTime))).toString() + "px " + (_ * c + f + 0.5 * o).toString() + "px";
    }).attr("class", function(p) {
      const _ = "task";
      let D = "";
      p.classes.length > 0 && (D = p.classes.join(" "));
      let z = 0;
      for (const [U, I] of E.entries())
        p.type === I && (z = U % i.numberSectionStyles);
      let H = "";
      return p.active ? p.crit ? H += " activeCrit" : H = " active" : p.done ? p.crit ? H = " doneCrit" : H = " done" : p.crit && (H += " crit"), H.length === 0 && (H = " task"), p.milestone && (H = " milestone " + H), H += z, H += " " + D, _ + H;
    }), S.append("text").attr("id", function(p) {
      return p.id + "-text";
    }).text(function(p) {
      return p.task;
    }).attr("font-size", i.fontSize).attr("x", function(p) {
      let _ = y(p.startTime), D = y(p.renderEndTime || p.endTime);
      p.milestone && (_ += 0.5 * (y(p.endTime) - y(p.startTime)) - 0.5 * o), p.milestone && (D = _ + o);
      const z = this.getBBox().width;
      return z > D - _ ? D + z + 1.5 * i.leftPadding > u ? _ + T - 5 : D + T + 5 : (D - _) / 2 + _ + T;
    }).attr("y", function(p, _) {
      return _ = p.order, _ * c + i.barHeight / 2 + (i.fontSize / 2 - 2) + f;
    }).attr("text-height", o).attr("class", function(p) {
      const _ = y(p.startTime);
      let D = y(p.endTime);
      p.milestone && (D = _ + o);
      const z = this.getBBox().width;
      let H = "";
      p.classes.length > 0 && (H = p.classes.join(" "));
      let U = 0;
      for (const [Ut, G] of E.entries())
        p.type === G && (U = Ut % i.numberSectionStyles);
      let I = "";
      return p.active && (p.crit ? I = "activeCritText" + U : I = "activeText" + U), p.done ? p.crit ? I = I + " doneCritText" + U : I = I + " doneText" + U : p.crit && (I = I + " critText" + U), p.milestone && (I += " milestoneText"), z > D - _ ? D + z + 1.5 * i.leftPadding > u ? H + " taskTextOutsideLeft taskTextOutside" + U + " " + I : H + " taskTextOutsideRight taskTextOutside" + U + " " + I + " width-" + z : H + " taskText taskText" + U + " " + I + " width-" + z;
    }), pt().securityLevel === "sandbox") {
      let p;
      p = zt("#i" + e);
      const _ = p.nodes()[0].contentDocument;
      S.filter(function(D) {
        return V[D.id] !== void 0;
      }).each(function(D) {
        var z = _.querySelector("#" + D.id), H = _.querySelector("#" + D.id + "-text");
        const U = z.parentNode;
        var I = _.createElement("a");
        I.setAttribute("xlink:href", V[D.id]), I.setAttribute("target", "_top"), U.appendChild(I), I.appendChild(z), I.appendChild(H);
      });
    }
  }
  function P(m, c, f, T, o, L, u, S) {
    const V = L.reduce(
      (U, { startTime: I }) => U ? Math.min(U, I) : I,
      0
    ), j = L.reduce((U, { endTime: I }) => U ? Math.max(U, I) : I, 0), p = n.db.getDateFormat();
    if (!V || !j)
      return;
    const _ = [];
    let D = null, z = ot(V);
    for (; z.valueOf() <= j; )
      n.db.isInvalidDate(z, p, u, S) ? D ? D.end = z.clone() : D = {
        start: z.clone(),
        end: z.clone()
      } : D && (_.push(D), D = null), z.add(1, "d");
    k.append("g").selectAll("rect").data(_).enter().append("rect").attr("id", function(U) {
      return "exclude-" + U.start.format("YYYY-MM-DD");
    }).attr("x", function(U) {
      return y(U.start) + f;
    }).attr("y", i.gridLineStartPadding).attr("width", function(U) {
      const I = U.end.clone().add(1, "day");
      return y(I) - y(U.start);
    }).attr("height", o - c - i.gridLineStartPadding).attr("transform-origin", function(U, I) {
      return (y(U.start) + f + 0.5 * (y(U.end) - y(U.start))).toString() + "px " + (I * m + 0.5 * o).toString() + "px";
    }).attr("class", "exclude-range");
  }
  function W(m, c, f, T) {
    let o = Ar(y).tickSize(-T + c + i.gridLineStartPadding).tickFormat($t(n.db.getAxisFormat() || i.axisFormat || "%Y-%m-%d"));
    const u = /^([1-9]\d*)(minute|hour|day|week|month)$/.exec(
      n.db.getTickInterval() || i.tickInterval
    );
    if (u !== null) {
      const S = u[1];
      switch (u[2]) {
        case "minute":
          o.ticks(Xt.every(S));
          break;
        case "hour":
          o.ticks(Qt.every(S));
          break;
        case "day":
          o.ticks(xt.every(S));
          break;
        case "week":
          o.ticks(wt.every(S));
          break;
        case "month":
          o.ticks(Jt.every(S));
          break;
      }
    }
    if (k.append("g").attr("class", "grid").attr("transform", "translate(" + m + ", " + (T - 50) + ")").call(o).selectAll("text").style("text-anchor", "middle").attr("fill", "#000").attr("stroke", "none").attr("font-size", 10).attr("dy", "1em"), n.db.topAxisEnabled() || i.topAxis) {
      let S = Ur(y).tickSize(-T + c + i.gridLineStartPadding).tickFormat($t(n.db.getAxisFormat() || i.axisFormat || "%Y-%m-%d"));
      if (u !== null) {
        const V = u[1];
        switch (u[2]) {
          case "minute":
            S.ticks(Xt.every(V));
            break;
          case "hour":
            S.ticks(Qt.every(V));
            break;
          case "day":
            S.ticks(xt.every(V));
            break;
          case "week":
            S.ticks(wt.every(V));
            break;
          case "month":
            S.ticks(Jt.every(V));
            break;
        }
      }
      k.append("g").attr("class", "grid").attr("transform", "translate(" + m + ", " + c + ")").call(S).selectAll("text").style("text-anchor", "middle").attr("fill", "#000").attr("stroke", "none").attr("font-size", 10);
    }
  }
  function O(m, c) {
    const f = [];
    let T = 0;
    for (const [o, L] of E.entries())
      f[o] = [L, b(L, X)];
    k.append("g").selectAll("text").data(f).enter().append(function(o) {
      const L = o[0].split(nr.lineBreakRegex), u = -(L.length - 1) / 2, S = g.createElementNS("http://www.w3.org/2000/svg", "text");
      S.setAttribute("dy", u + "em");
      for (const [V, j] of L.entries()) {
        const p = g.createElementNS("http://www.w3.org/2000/svg", "tspan");
        p.setAttribute("alignment-baseline", "central"), p.setAttribute("x", "10"), V > 0 && p.setAttribute("dy", "1em"), p.textContent = j, S.appendChild(p);
      }
      return S;
    }).attr("x", 10).attr("y", function(o, L) {
      if (L > 0)
        for (let u = 0; u < L; u++)
          return T += f[L - 1][1], o[1] * m / 2 + T * m + c;
      else
        return o[1] * m / 2 + c;
    }).attr("font-size", i.sectionFontSize).attr("font-size", i.sectionFontSize).attr("class", function(o) {
      for (const [L, u] of E.entries())
        if (o[0] === u)
          return "sectionTitle sectionTitle" + L % i.numberSectionStyles;
      return "sectionTitle";
    });
  }
  function M(m, c, f, T) {
    const o = n.db.getTodayMarker();
    if (o === "off")
      return;
    const L = k.append("g").attr("class", "today"), u = new Date(), S = L.append("line");
    S.attr("x1", y(u) + m).attr("x2", y(u) + m).attr("y1", i.titleTopMargin).attr("y2", T - i.titleTopMargin).attr("class", "today"), o !== "" && S.attr("style", o.replace(/,/g, ";"));
  }
  function N(m) {
    const c = {}, f = [];
    for (let T = 0, o = m.length; T < o; ++T)
      Object.prototype.hasOwnProperty.call(c, m[T]) || (c[m[T]] = !0, f.push(m[T]));
    return f;
  }
  function R(m) {
    let c = m.length;
    const f = {};
    for (; c; )
      f[m[--c]] = (f[m[c]] || 0) + 1;
    return f;
  }
  function b(m, c) {
    return R(c)[m] || 0;
  }
}, us = {
  setConf: os,
  draw: cs
}, ls = (t) => `
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
`, fs = ls, Ts = {
  parser: _a,
  db: ss,
  renderer: us,
  styles: fs
};
export {
  Ts as diagram
};
//# sourceMappingURL=ganttDiagram-bd6c6bd4.js.map
