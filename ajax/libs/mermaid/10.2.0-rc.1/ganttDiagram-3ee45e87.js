import { G as yn, H as kn, R as pn, I as vn, J as ar, K as sr, L as ve, M as je, N as qe, O as or, P as se, Q as cr, S as oe, W as ur, Y as lr, T as fr, c as xt, s as hr, g as dr, y as mr, z as gr, b as yr, a as kr, U as rt, m as pr, A as vr, e as Tr, x as xr, l as Te, j as Ht, k as br, f as Mr } from "./mermaid-29dd296b.js";
import { i as Tn } from "./init-f9637058.js";
function Zt(t, e) {
  return t == null || e == null ? NaN : t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function wr(t, e) {
  return t == null || e == null ? NaN : e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function Le(t) {
  let e, n, r;
  t.length !== 2 ? (e = Zt, n = (c, f) => Zt(t(c), f), r = (c, f) => t(c) - f) : (e = t === Zt || t === wr ? t : Dr, n = t, r = t);
  function i(c, f, h = 0, k = c.length) {
    if (h < k) {
      if (e(f, f) !== 0)
        return k;
      do {
        const p = h + k >>> 1;
        n(c[p], f) < 0 ? h = p + 1 : k = p;
      } while (h < k);
    }
    return h;
  }
  function a(c, f, h = 0, k = c.length) {
    if (h < k) {
      if (e(f, f) !== 0)
        return k;
      do {
        const p = h + k >>> 1;
        n(c[p], f) <= 0 ? h = p + 1 : k = p;
      } while (h < k);
    }
    return h;
  }
  function s(c, f, h = 0, k = c.length) {
    const p = i(c, f, h, k - 1);
    return p > h && r(c[p - 1], f) > -r(c[p], f) ? p - 1 : p;
  }
  return { left: i, center: s, right: a };
}
function Dr() {
  return 0;
}
function Cr(t) {
  return t === null ? NaN : +t;
}
const Sr = Le(Zt), _r = Sr.right;
Le(Cr).center;
const Ar = _r;
var xe = Math.sqrt(50), be = Math.sqrt(10), Me = Math.sqrt(2);
function Fr(t, e, n) {
  var r, i = -1, a, s, c;
  if (e = +e, t = +t, n = +n, t === e && n > 0)
    return [t];
  if ((r = e < t) && (a = t, t = e, e = a), (c = xn(t, e, n)) === 0 || !isFinite(c))
    return [];
  if (c > 0) {
    let f = Math.round(t / c), h = Math.round(e / c);
    for (f * c < t && ++f, h * c > e && --h, s = new Array(a = h - f + 1); ++i < a; )
      s[i] = (f + i) * c;
  } else {
    c = -c;
    let f = Math.round(t * c), h = Math.round(e * c);
    for (f / c < t && ++f, h / c > e && --h, s = new Array(a = h - f + 1); ++i < a; )
      s[i] = (f + i) / c;
  }
  return r && s.reverse(), s;
}
function xn(t, e, n) {
  var r = (e - t) / Math.max(0, n), i = Math.floor(Math.log(r) / Math.LN10), a = r / Math.pow(10, i);
  return i >= 0 ? (a >= xe ? 10 : a >= be ? 5 : a >= Me ? 2 : 1) * Math.pow(10, i) : -Math.pow(10, -i) / (a >= xe ? 10 : a >= be ? 5 : a >= Me ? 2 : 1);
}
function we(t, e, n) {
  var r = Math.abs(e - t) / Math.max(0, n), i = Math.pow(10, Math.floor(Math.log(r) / Math.LN10)), a = r / i;
  return a >= xe ? i *= 10 : a >= be ? i *= 5 : a >= Me && (i *= 2), e < t ? -i : i;
}
function Yr(t, e) {
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
function Lr(t, e) {
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
function Ur(t) {
  return t;
}
var jt = 1, ce = 2, De = 3, Vt = 4, Xe = 1e-6;
function Er(t) {
  return "translate(" + t + ",0)";
}
function Ir(t) {
  return "translate(0," + t + ")";
}
function Nr(t) {
  return (e) => +t(e);
}
function Wr(t, e) {
  return e = Math.max(0, t.bandwidth() - e * 2) / 2, t.round() && (e = Math.round(e)), (n) => +t(n) + e;
}
function zr() {
  return !this.__axis;
}
function bn(t, e) {
  var n = [], r = null, i = null, a = 6, s = 6, c = 3, f = typeof window < "u" && window.devicePixelRatio > 1 ? 0 : 0.5, h = t === jt || t === Vt ? -1 : 1, k = t === Vt || t === ce ? "x" : "y", p = t === jt || t === De ? Er : Ir;
  function v(x) {
    var _ = r ?? (e.ticks ? e.ticks.apply(e, n) : e.domain()), C = i ?? (e.tickFormat ? e.tickFormat.apply(e, n) : Ur), P = Math.max(a, 0) + c, H = e.range(), B = +H[0] + f, O = +H[H.length - 1] + f, V = (e.bandwidth ? Wr : Nr)(e.copy(), f), N = x.selection ? x.selection() : x, D = N.selectAll(".domain").data([null]), W = N.selectAll(".tick").data(_, e).order(), w = W.exit(), d = W.enter().append("g").attr("class", "tick"), y = W.select("line"), u = W.select("text");
    D = D.merge(D.enter().insert("path", ".tick").attr("class", "domain").attr("stroke", "currentColor")), W = W.merge(d), y = y.merge(d.append("line").attr("stroke", "currentColor").attr(k + "2", h * a)), u = u.merge(d.append("text").attr("fill", "currentColor").attr(k, h * P).attr("dy", t === jt ? "0em" : t === De ? "0.71em" : "0.32em")), x !== N && (D = D.transition(x), W = W.transition(x), y = y.transition(x), u = u.transition(x), w = w.transition(x).attr("opacity", Xe).attr("transform", function(l) {
      return isFinite(l = V(l)) ? p(l + f) : this.getAttribute("transform");
    }), d.attr("opacity", Xe).attr("transform", function(l) {
      var M = this.parentNode.__axis;
      return p((M && isFinite(M = M(l)) ? M : V(l)) + f);
    })), w.remove(), D.attr("d", t === Vt || t === ce ? s ? "M" + h * s + "," + B + "H" + f + "V" + O + "H" + h * s : "M" + f + "," + B + "V" + O : s ? "M" + B + "," + h * s + "V" + f + "H" + O + "V" + h * s : "M" + B + "," + f + "H" + O), W.attr("opacity", 1).attr("transform", function(l) {
      return p(V(l) + f);
    }), y.attr(k + "2", h * a), u.attr(k, h * P).text(C), N.filter(zr).attr("fill", "none").attr("font-size", 10).attr("font-family", "sans-serif").attr("text-anchor", t === ce ? "start" : t === Vt ? "end" : "middle"), N.each(function() {
      this.__axis = V;
    });
  }
  return v.scale = function(x) {
    return arguments.length ? (e = x, v) : e;
  }, v.ticks = function() {
    return n = Array.from(arguments), v;
  }, v.tickArguments = function(x) {
    return arguments.length ? (n = x == null ? [] : Array.from(x), v) : n.slice();
  }, v.tickValues = function(x) {
    return arguments.length ? (r = x == null ? null : Array.from(x), v) : r && r.slice();
  }, v.tickFormat = function(x) {
    return arguments.length ? (i = x, v) : i;
  }, v.tickSize = function(x) {
    return arguments.length ? (a = s = +x, v) : a;
  }, v.tickSizeInner = function(x) {
    return arguments.length ? (a = +x, v) : a;
  }, v.tickSizeOuter = function(x) {
    return arguments.length ? (s = +x, v) : s;
  }, v.tickPadding = function(x) {
    return arguments.length ? (c = +x, v) : c;
  }, v.offset = function(x) {
    return arguments.length ? (f = +x, v) : f;
  }, v;
}
function Or(t) {
  return bn(jt, t);
}
function Pr(t) {
  return bn(De, t);
}
const Hr = Math.PI / 180, Vr = 180 / Math.PI, Gt = 18, Mn = 0.96422, wn = 1, Dn = 0.82521, Cn = 4 / 29, bt = 6 / 29, Sn = 3 * bt * bt, Rr = bt * bt * bt;
function _n(t) {
  if (t instanceof ut)
    return new ut(t.l, t.a, t.b, t.opacity);
  if (t instanceof ft)
    return An(t);
  t instanceof pn || (t = ar(t));
  var e = he(t.r), n = he(t.g), r = he(t.b), i = ue((0.2225045 * e + 0.7168786 * n + 0.0606169 * r) / wn), a, s;
  return e === n && n === r ? a = s = i : (a = ue((0.4360747 * e + 0.3850649 * n + 0.1430804 * r) / Mn), s = ue((0.0139322 * e + 0.0971045 * n + 0.7141733 * r) / Dn)), new ut(116 * i - 16, 500 * (a - i), 200 * (i - s), t.opacity);
}
function Br(t, e, n, r) {
  return arguments.length === 1 ? _n(t) : new ut(t, e, n, r ?? 1);
}
function ut(t, e, n, r) {
  this.l = +t, this.a = +e, this.b = +n, this.opacity = +r;
}
yn(ut, Br, kn(vn, {
  brighter(t) {
    return new ut(this.l + Gt * (t ?? 1), this.a, this.b, this.opacity);
  },
  darker(t) {
    return new ut(this.l - Gt * (t ?? 1), this.a, this.b, this.opacity);
  },
  rgb() {
    var t = (this.l + 16) / 116, e = isNaN(this.a) ? t : t + this.a / 500, n = isNaN(this.b) ? t : t - this.b / 200;
    return e = Mn * le(e), t = wn * le(t), n = Dn * le(n), new pn(
      fe(3.1338561 * e - 1.6168667 * t - 0.4906146 * n),
      fe(-0.9787684 * e + 1.9161415 * t + 0.033454 * n),
      fe(0.0719453 * e - 0.2289914 * t + 1.4052427 * n),
      this.opacity
    );
  }
}));
function ue(t) {
  return t > Rr ? Math.pow(t, 1 / 3) : t / Sn + Cn;
}
function le(t) {
  return t > bt ? t * t * t : Sn * (t - Cn);
}
function fe(t) {
  return 255 * (t <= 31308e-7 ? 12.92 * t : 1.055 * Math.pow(t, 1 / 2.4) - 0.055);
}
function he(t) {
  return (t /= 255) <= 0.04045 ? t / 12.92 : Math.pow((t + 0.055) / 1.055, 2.4);
}
function Zr(t) {
  if (t instanceof ft)
    return new ft(t.h, t.c, t.l, t.opacity);
  if (t instanceof ut || (t = _n(t)), t.a === 0 && t.b === 0)
    return new ft(NaN, 0 < t.l && t.l < 100 ? 0 : NaN, t.l, t.opacity);
  var e = Math.atan2(t.b, t.a) * Vr;
  return new ft(e < 0 ? e + 360 : e, Math.sqrt(t.a * t.a + t.b * t.b), t.l, t.opacity);
}
function Ce(t, e, n, r) {
  return arguments.length === 1 ? Zr(t) : new ft(t, e, n, r ?? 1);
}
function ft(t, e, n, r) {
  this.h = +t, this.c = +e, this.l = +n, this.opacity = +r;
}
function An(t) {
  if (isNaN(t.h))
    return new ut(t.l, 0, 0, t.opacity);
  var e = t.h * Hr;
  return new ut(t.l, Math.cos(e) * t.c, Math.sin(e) * t.c, t.opacity);
}
yn(ft, Ce, kn(vn, {
  brighter(t) {
    return new ft(this.h, this.c, this.l + Gt * (t ?? 1), this.opacity);
  },
  darker(t) {
    return new ft(this.h, this.c, this.l - Gt * (t ?? 1), this.opacity);
  },
  rgb() {
    return An(this).rgb();
  }
}));
function jr(t, e) {
  e || (e = []);
  var n = t ? Math.min(e.length, t.length) : 0, r = e.slice(), i;
  return function(a) {
    for (i = 0; i < n; ++i)
      r[i] = t[i] * (1 - a) + e[i] * a;
    return r;
  };
}
function qr(t) {
  return ArrayBuffer.isView(t) && !(t instanceof DataView);
}
function Xr(t, e) {
  var n = e ? e.length : 0, r = t ? Math.min(n, t.length) : 0, i = new Array(r), a = new Array(n), s;
  for (s = 0; s < r; ++s)
    i[s] = Ue(t[s], e[s]);
  for (; s < n; ++s)
    a[s] = e[s];
  return function(c) {
    for (s = 0; s < r; ++s)
      a[s] = i[s](c);
    return a;
  };
}
function Gr(t, e) {
  var n = /* @__PURE__ */ new Date();
  return t = +t, e = +e, function(r) {
    return n.setTime(t * (1 - r) + e * r), n;
  };
}
function $r(t, e) {
  var n = {}, r = {}, i;
  (t === null || typeof t != "object") && (t = {}), (e === null || typeof e != "object") && (e = {});
  for (i in e)
    i in t ? n[i] = Ue(t[i], e[i]) : r[i] = e[i];
  return function(a) {
    for (i in n)
      r[i] = n[i](a);
    return r;
  };
}
function Ue(t, e) {
  var n = typeof e, r;
  return e == null || n === "boolean" ? sr(e) : (n === "number" ? ve : n === "string" ? (r = je(e)) ? (e = r, qe) : or : e instanceof je ? qe : e instanceof Date ? Gr : qr(e) ? jr : Array.isArray(e) ? Xr : typeof e.valueOf != "function" && typeof e.toString != "function" || isNaN(e) ? $r : ve)(t, e);
}
function Qr(t, e) {
  return t = +t, e = +e, function(n) {
    return Math.round(t * (1 - n) + e * n);
  };
}
function Jr(t) {
  return function(e, n) {
    var r = t((e = Ce(e)).h, (n = Ce(n)).h), i = se(e.c, n.c), a = se(e.l, n.l), s = se(e.opacity, n.opacity);
    return function(c) {
      return e.h = r(c), e.c = i(c), e.l = a(c), e.opacity = s(c), e + "";
    };
  };
}
const Kr = Jr(cr);
function ti(t) {
  return Math.abs(t = Math.round(t)) >= 1e21 ? t.toLocaleString("en").replace(/,/g, "") : t.toString(10);
}
function $t(t, e) {
  if ((n = (t = e ? t.toExponential(e - 1) : t.toExponential()).indexOf("e")) < 0)
    return null;
  var n, r = t.slice(0, n);
  return [
    r.length > 1 ? r[0] + r.slice(2) : r,
    +t.slice(n + 1)
  ];
}
function wt(t) {
  return t = $t(Math.abs(t)), t ? t[1] : NaN;
}
function ei(t, e) {
  return function(n, r) {
    for (var i = n.length, a = [], s = 0, c = t[0], f = 0; i > 0 && c > 0 && (f + c + 1 > r && (c = Math.max(1, r - f)), a.push(n.substring(i -= c, i + c)), !((f += c + 1) > r)); )
      c = t[s = (s + 1) % t.length];
    return a.reverse().join(e);
  };
}
function ni(t) {
  return function(e) {
    return e.replace(/[0-9]/g, function(n) {
      return t[+n];
    });
  };
}
var ri = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function Qt(t) {
  if (!(e = ri.exec(t)))
    throw new Error("invalid format: " + t);
  var e;
  return new Ee({
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
Qt.prototype = Ee.prototype;
function Ee(t) {
  this.fill = t.fill === void 0 ? " " : t.fill + "", this.align = t.align === void 0 ? ">" : t.align + "", this.sign = t.sign === void 0 ? "-" : t.sign + "", this.symbol = t.symbol === void 0 ? "" : t.symbol + "", this.zero = !!t.zero, this.width = t.width === void 0 ? void 0 : +t.width, this.comma = !!t.comma, this.precision = t.precision === void 0 ? void 0 : +t.precision, this.trim = !!t.trim, this.type = t.type === void 0 ? "" : t.type + "";
}
Ee.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
function ii(t) {
  t:
    for (var e = t.length, n = 1, r = -1, i; n < e; ++n)
      switch (t[n]) {
        case ".":
          r = i = n;
          break;
        case "0":
          r === 0 && (r = n), i = n;
          break;
        default:
          if (!+t[n])
            break t;
          r > 0 && (r = 0);
          break;
      }
  return r > 0 ? t.slice(0, r) + t.slice(i + 1) : t;
}
var Fn;
function ai(t, e) {
  var n = $t(t, e);
  if (!n)
    return t + "";
  var r = n[0], i = n[1], a = i - (Fn = Math.max(-8, Math.min(8, Math.floor(i / 3))) * 3) + 1, s = r.length;
  return a === s ? r : a > s ? r + new Array(a - s + 1).join("0") : a > 0 ? r.slice(0, a) + "." + r.slice(a) : "0." + new Array(1 - a).join("0") + $t(t, Math.max(0, e + a - 1))[0];
}
function Ge(t, e) {
  var n = $t(t, e);
  if (!n)
    return t + "";
  var r = n[0], i = n[1];
  return i < 0 ? "0." + new Array(-i).join("0") + r : r.length > i + 1 ? r.slice(0, i + 1) + "." + r.slice(i + 1) : r + new Array(i - r.length + 2).join("0");
}
const $e = {
  "%": (t, e) => (t * 100).toFixed(e),
  b: (t) => Math.round(t).toString(2),
  c: (t) => t + "",
  d: ti,
  e: (t, e) => t.toExponential(e),
  f: (t, e) => t.toFixed(e),
  g: (t, e) => t.toPrecision(e),
  o: (t) => Math.round(t).toString(8),
  p: (t, e) => Ge(t * 100, e),
  r: Ge,
  s: ai,
  X: (t) => Math.round(t).toString(16).toUpperCase(),
  x: (t) => Math.round(t).toString(16)
};
function Qe(t) {
  return t;
}
var Je = Array.prototype.map, Ke = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function si(t) {
  var e = t.grouping === void 0 || t.thousands === void 0 ? Qe : ei(Je.call(t.grouping, Number), t.thousands + ""), n = t.currency === void 0 ? "" : t.currency[0] + "", r = t.currency === void 0 ? "" : t.currency[1] + "", i = t.decimal === void 0 ? "." : t.decimal + "", a = t.numerals === void 0 ? Qe : ni(Je.call(t.numerals, String)), s = t.percent === void 0 ? "%" : t.percent + "", c = t.minus === void 0 ? "−" : t.minus + "", f = t.nan === void 0 ? "NaN" : t.nan + "";
  function h(p) {
    p = Qt(p);
    var v = p.fill, x = p.align, _ = p.sign, C = p.symbol, P = p.zero, H = p.width, B = p.comma, O = p.precision, V = p.trim, N = p.type;
    N === "n" ? (B = !0, N = "g") : $e[N] || (O === void 0 && (O = 12), V = !0, N = "g"), (P || v === "0" && x === "=") && (P = !0, v = "0", x = "=");
    var D = C === "$" ? n : C === "#" && /[boxX]/.test(N) ? "0" + N.toLowerCase() : "", W = C === "$" ? r : /[%p]/.test(N) ? s : "", w = $e[N], d = /[defgprs%]/.test(N);
    O = O === void 0 ? 6 : /[gprs]/.test(N) ? Math.max(1, Math.min(21, O)) : Math.max(0, Math.min(20, O));
    function y(u) {
      var l = D, M = W, o, E, g;
      if (N === "c")
        M = w(u) + M, u = "";
      else {
        u = +u;
        var Z = u < 0 || 1 / u < 0;
        if (u = isNaN(u) ? f : w(Math.abs(u), O), V && (u = ii(u)), Z && +u == 0 && _ !== "+" && (Z = !1), l = (Z ? _ === "(" ? _ : c : _ === "-" || _ === "(" ? "" : _) + l, M = (N === "s" ? Ke[8 + Fn / 3] : "") + M + (Z && _ === "(" ? ")" : ""), d) {
          for (o = -1, E = u.length; ++o < E; )
            if (g = u.charCodeAt(o), 48 > g || g > 57) {
              M = (g === 46 ? i + u.slice(o + 1) : u.slice(o)) + M, u = u.slice(0, o);
              break;
            }
        }
      }
      B && !P && (u = e(u, 1 / 0));
      var j = l.length + u.length + M.length, K = j < H ? new Array(H - j + 1).join(v) : "";
      switch (B && P && (u = e(K + u, K.length ? H - M.length : 1 / 0), K = ""), x) {
        case "<":
          u = l + u + M + K;
          break;
        case "=":
          u = l + K + u + M;
          break;
        case "^":
          u = K.slice(0, j = K.length >> 1) + l + u + M + K.slice(j);
          break;
        default:
          u = K + l + u + M;
          break;
      }
      return a(u);
    }
    return y.toString = function() {
      return p + "";
    }, y;
  }
  function k(p, v) {
    var x = h((p = Qt(p), p.type = "f", p)), _ = Math.max(-8, Math.min(8, Math.floor(wt(v) / 3))) * 3, C = Math.pow(10, -_), P = Ke[8 + _ / 3];
    return function(H) {
      return x(C * H) + P;
    };
  }
  return {
    format: h,
    formatPrefix: k
  };
}
var Rt, Yn, Ln;
oi({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function oi(t) {
  return Rt = si(t), Yn = Rt.format, Ln = Rt.formatPrefix, Rt;
}
function ci(t) {
  return Math.max(0, -wt(Math.abs(t)));
}
function ui(t, e) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(wt(e) / 3))) * 3 - wt(Math.abs(t)));
}
function li(t, e) {
  return t = Math.abs(t), e = Math.abs(e) - t, Math.max(0, wt(e) - wt(t)) + 1;
}
function fi(t) {
  return function() {
    return t;
  };
}
function hi(t) {
  return +t;
}
var tn = [0, 1];
function Tt(t) {
  return t;
}
function Se(t, e) {
  return (e -= t = +t) ? function(n) {
    return (n - t) / e;
  } : fi(isNaN(e) ? NaN : 0.5);
}
function di(t, e) {
  var n;
  return t > e && (n = t, t = e, e = n), function(r) {
    return Math.max(t, Math.min(e, r));
  };
}
function mi(t, e, n) {
  var r = t[0], i = t[1], a = e[0], s = e[1];
  return i < r ? (r = Se(i, r), a = n(s, a)) : (r = Se(r, i), a = n(a, s)), function(c) {
    return a(r(c));
  };
}
function gi(t, e, n) {
  var r = Math.min(t.length, e.length) - 1, i = new Array(r), a = new Array(r), s = -1;
  for (t[r] < t[0] && (t = t.slice().reverse(), e = e.slice().reverse()); ++s < r; )
    i[s] = Se(t[s], t[s + 1]), a[s] = n(e[s], e[s + 1]);
  return function(c) {
    var f = Ar(t, c, 1, r) - 1;
    return a[f](i[f](c));
  };
}
function Un(t, e) {
  return e.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp()).unknown(t.unknown());
}
function yi() {
  var t = tn, e = tn, n = Ue, r, i, a, s = Tt, c, f, h;
  function k() {
    var v = Math.min(t.length, e.length);
    return s !== Tt && (s = di(t[0], t[v - 1])), c = v > 2 ? gi : mi, f = h = null, p;
  }
  function p(v) {
    return v == null || isNaN(v = +v) ? a : (f || (f = c(t.map(r), e, n)))(r(s(v)));
  }
  return p.invert = function(v) {
    return s(i((h || (h = c(e, t.map(r), ve)))(v)));
  }, p.domain = function(v) {
    return arguments.length ? (t = Array.from(v, hi), k()) : t.slice();
  }, p.range = function(v) {
    return arguments.length ? (e = Array.from(v), k()) : e.slice();
  }, p.rangeRound = function(v) {
    return e = Array.from(v), n = Qr, k();
  }, p.clamp = function(v) {
    return arguments.length ? (s = v ? !0 : Tt, k()) : s !== Tt;
  }, p.interpolate = function(v) {
    return arguments.length ? (n = v, k()) : n;
  }, p.unknown = function(v) {
    return arguments.length ? (a = v, p) : a;
  }, function(v, x) {
    return r = v, i = x, k();
  };
}
function En() {
  return yi()(Tt, Tt);
}
function ki(t, e, n, r) {
  var i = we(t, e, n), a;
  switch (r = Qt(r ?? ",f"), r.type) {
    case "s": {
      var s = Math.max(Math.abs(t), Math.abs(e));
      return r.precision == null && !isNaN(a = ui(i, s)) && (r.precision = a), Ln(r, s);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      r.precision == null && !isNaN(a = li(i, Math.max(Math.abs(t), Math.abs(e)))) && (r.precision = a - (r.type === "e"));
      break;
    }
    case "f":
    case "%": {
      r.precision == null && !isNaN(a = ci(i)) && (r.precision = a - (r.type === "%") * 2);
      break;
    }
  }
  return Yn(r);
}
function pi(t) {
  var e = t.domain;
  return t.ticks = function(n) {
    var r = e();
    return Fr(r[0], r[r.length - 1], n ?? 10);
  }, t.tickFormat = function(n, r) {
    var i = e();
    return ki(i[0], i[i.length - 1], n ?? 10, r);
  }, t.nice = function(n) {
    n == null && (n = 10);
    var r = e(), i = 0, a = r.length - 1, s = r[i], c = r[a], f, h, k = 10;
    for (c < s && (h = s, s = c, c = h, h = i, i = a, a = h); k-- > 0; ) {
      if (h = xn(s, c, n), h === f)
        return r[i] = s, r[a] = c, e(r);
      if (h > 0)
        s = Math.floor(s / h) * h, c = Math.ceil(c / h) * h;
      else if (h < 0)
        s = Math.ceil(s * h) / h, c = Math.floor(c * h) / h;
      else
        break;
      f = h;
    }
    return t;
  }, t;
}
function In() {
  var t = En();
  return t.copy = function() {
    return Un(t, In());
  }, Tn.apply(t, arguments), pi(t);
}
function vi(t, e) {
  t = t.slice();
  var n = 0, r = t.length - 1, i = t[n], a = t[r], s;
  return a < i && (s = n, n = r, r = s, s = i, i = a, a = s), t[n] = e.floor(i), t[r] = e.ceil(a), t;
}
var de = /* @__PURE__ */ new Date(), me = /* @__PURE__ */ new Date();
function et(t, e, n, r) {
  function i(a) {
    return t(a = arguments.length === 0 ? /* @__PURE__ */ new Date() : /* @__PURE__ */ new Date(+a)), a;
  }
  return i.floor = function(a) {
    return t(a = /* @__PURE__ */ new Date(+a)), a;
  }, i.ceil = function(a) {
    return t(a = new Date(a - 1)), e(a, 1), t(a), a;
  }, i.round = function(a) {
    var s = i(a), c = i.ceil(a);
    return a - s < c - a ? s : c;
  }, i.offset = function(a, s) {
    return e(a = /* @__PURE__ */ new Date(+a), s == null ? 1 : Math.floor(s)), a;
  }, i.range = function(a, s, c) {
    var f = [], h;
    if (a = i.ceil(a), c = c == null ? 1 : Math.floor(c), !(a < s) || !(c > 0))
      return f;
    do
      f.push(h = /* @__PURE__ */ new Date(+a)), e(a, c), t(a);
    while (h < a && a < s);
    return f;
  }, i.filter = function(a) {
    return et(function(s) {
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
  }, n && (i.count = function(a, s) {
    return de.setTime(+a), me.setTime(+s), t(de), t(me), Math.floor(n(de, me));
  }, i.every = function(a) {
    return a = Math.floor(a), !isFinite(a) || !(a > 0) ? null : a > 1 ? i.filter(r ? function(s) {
      return r(s) % a === 0;
    } : function(s) {
      return i.count(0, s) % a === 0;
    }) : i;
  }), i;
}
var Jt = et(function() {
}, function(t, e) {
  t.setTime(+t + e);
}, function(t, e) {
  return e - t;
});
Jt.every = function(t) {
  return t = Math.floor(t), !isFinite(t) || !(t > 0) ? null : t > 1 ? et(function(e) {
    e.setTime(Math.floor(e / t) * t);
  }, function(e, n) {
    e.setTime(+e + n * t);
  }, function(e, n) {
    return (n - e) / t;
  }) : Jt;
};
const Ti = Jt;
Jt.range;
const ht = 1e3, ot = ht * 60, mt = ot * 60, gt = mt * 24, Ie = gt * 7, en = gt * 30, ge = gt * 365;
var Nn = et(function(t) {
  t.setTime(t - t.getMilliseconds());
}, function(t, e) {
  t.setTime(+t + e * ht);
}, function(t, e) {
  return (e - t) / ht;
}, function(t) {
  return t.getUTCSeconds();
});
const Nt = Nn;
Nn.range;
var Wn = et(function(t) {
  t.setTime(t - t.getMilliseconds() - t.getSeconds() * ht);
}, function(t, e) {
  t.setTime(+t + e * ot);
}, function(t, e) {
  return (e - t) / ot;
}, function(t) {
  return t.getMinutes();
});
const Kt = Wn;
Wn.range;
var zn = et(function(t) {
  t.setTime(t - t.getMilliseconds() - t.getSeconds() * ht - t.getMinutes() * ot);
}, function(t, e) {
  t.setTime(+t + e * mt);
}, function(t, e) {
  return (e - t) / mt;
}, function(t) {
  return t.getHours();
});
const te = zn;
zn.range;
var On = et(
  (t) => t.setHours(0, 0, 0, 0),
  (t, e) => t.setDate(t.getDate() + e),
  (t, e) => (e - t - (e.getTimezoneOffset() - t.getTimezoneOffset()) * ot) / gt,
  (t) => t.getDate() - 1
);
const Dt = On;
On.range;
function kt(t) {
  return et(function(e) {
    e.setDate(e.getDate() - (e.getDay() + 7 - t) % 7), e.setHours(0, 0, 0, 0);
  }, function(e, n) {
    e.setDate(e.getDate() + n * 7);
  }, function(e, n) {
    return (n - e - (n.getTimezoneOffset() - e.getTimezoneOffset()) * ot) / Ie;
  });
}
var Ct = kt(0), ee = kt(1), xi = kt(2), bi = kt(3), St = kt(4), Mi = kt(5), wi = kt(6);
Ct.range;
ee.range;
xi.range;
bi.range;
St.range;
Mi.range;
wi.range;
var Pn = et(function(t) {
  t.setDate(1), t.setHours(0, 0, 0, 0);
}, function(t, e) {
  t.setMonth(t.getMonth() + e);
}, function(t, e) {
  return e.getMonth() - t.getMonth() + (e.getFullYear() - t.getFullYear()) * 12;
}, function(t) {
  return t.getMonth();
});
const ne = Pn;
Pn.range;
var Ne = et(function(t) {
  t.setMonth(0, 1), t.setHours(0, 0, 0, 0);
}, function(t, e) {
  t.setFullYear(t.getFullYear() + e);
}, function(t, e) {
  return e.getFullYear() - t.getFullYear();
}, function(t) {
  return t.getFullYear();
});
Ne.every = function(t) {
  return !isFinite(t = Math.floor(t)) || !(t > 0) ? null : et(function(e) {
    e.setFullYear(Math.floor(e.getFullYear() / t) * t), e.setMonth(0, 1), e.setHours(0, 0, 0, 0);
  }, function(e, n) {
    e.setFullYear(e.getFullYear() + n * t);
  });
};
const yt = Ne;
Ne.range;
var Hn = et(function(t) {
  t.setUTCHours(0, 0, 0, 0);
}, function(t, e) {
  t.setUTCDate(t.getUTCDate() + e);
}, function(t, e) {
  return (e - t) / gt;
}, function(t) {
  return t.getUTCDate() - 1;
});
const Vn = Hn;
Hn.range;
function pt(t) {
  return et(function(e) {
    e.setUTCDate(e.getUTCDate() - (e.getUTCDay() + 7 - t) % 7), e.setUTCHours(0, 0, 0, 0);
  }, function(e, n) {
    e.setUTCDate(e.getUTCDate() + n * 7);
  }, function(e, n) {
    return (n - e) / Ie;
  });
}
var Rn = pt(0), re = pt(1), Di = pt(2), Ci = pt(3), _t = pt(4), Si = pt(5), _i = pt(6);
Rn.range;
re.range;
Di.range;
Ci.range;
_t.range;
Si.range;
_i.range;
var We = et(function(t) {
  t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0);
}, function(t, e) {
  t.setUTCFullYear(t.getUTCFullYear() + e);
}, function(t, e) {
  return e.getUTCFullYear() - t.getUTCFullYear();
}, function(t) {
  return t.getUTCFullYear();
});
We.every = function(t) {
  return !isFinite(t = Math.floor(t)) || !(t > 0) ? null : et(function(e) {
    e.setUTCFullYear(Math.floor(e.getUTCFullYear() / t) * t), e.setUTCMonth(0, 1), e.setUTCHours(0, 0, 0, 0);
  }, function(e, n) {
    e.setUTCFullYear(e.getUTCFullYear() + n * t);
  });
};
const Wt = We;
We.range;
function Ai(t, e, n, r, i, a) {
  const s = [
    [Nt, 1, ht],
    [Nt, 5, 5 * ht],
    [Nt, 15, 15 * ht],
    [Nt, 30, 30 * ht],
    [a, 1, ot],
    [a, 5, 5 * ot],
    [a, 15, 15 * ot],
    [a, 30, 30 * ot],
    [i, 1, mt],
    [i, 3, 3 * mt],
    [i, 6, 6 * mt],
    [i, 12, 12 * mt],
    [r, 1, gt],
    [r, 2, 2 * gt],
    [n, 1, Ie],
    [e, 1, en],
    [e, 3, 3 * en],
    [t, 1, ge]
  ];
  function c(h, k, p) {
    const v = k < h;
    v && ([h, k] = [k, h]);
    const x = p && typeof p.range == "function" ? p : f(h, k, p), _ = x ? x.range(h, +k + 1) : [];
    return v ? _.reverse() : _;
  }
  function f(h, k, p) {
    const v = Math.abs(k - h) / p, x = Le(([, , P]) => P).right(s, v);
    if (x === s.length)
      return t.every(we(h / ge, k / ge, p));
    if (x === 0)
      return Ti.every(Math.max(we(h, k, p), 1));
    const [_, C] = s[v / s[x - 1][2] < s[x][2] / v ? x - 1 : x];
    return _.every(C);
  }
  return [c, f];
}
const [Fi, Yi] = Ai(yt, ne, Ct, Dt, te, Kt);
function ye(t) {
  if (0 <= t.y && t.y < 100) {
    var e = new Date(-1, t.m, t.d, t.H, t.M, t.S, t.L);
    return e.setFullYear(t.y), e;
  }
  return new Date(t.y, t.m, t.d, t.H, t.M, t.S, t.L);
}
function ke(t) {
  if (0 <= t.y && t.y < 100) {
    var e = new Date(Date.UTC(-1, t.m, t.d, t.H, t.M, t.S, t.L));
    return e.setUTCFullYear(t.y), e;
  }
  return new Date(Date.UTC(t.y, t.m, t.d, t.H, t.M, t.S, t.L));
}
function Lt(t, e, n) {
  return { y: t, m: e, d: n, H: 0, M: 0, S: 0, L: 0 };
}
function Li(t) {
  var e = t.dateTime, n = t.date, r = t.time, i = t.periods, a = t.days, s = t.shortDays, c = t.months, f = t.shortMonths, h = Ut(i), k = Et(i), p = Ut(a), v = Et(a), x = Ut(s), _ = Et(s), C = Ut(c), P = Et(c), H = Ut(f), B = Et(f), O = {
    a: Z,
    A: j,
    b: K,
    B: T,
    c: null,
    d: cn,
    e: cn,
    f: ea,
    g: fa,
    G: da,
    H: Ji,
    I: Ki,
    j: ta,
    L: Bn,
    m: na,
    M: ra,
    p: A,
    q: F,
    Q: fn,
    s: hn,
    S: ia,
    u: aa,
    U: sa,
    V: oa,
    w: ca,
    W: ua,
    x: null,
    X: null,
    y: la,
    Y: ha,
    Z: ma,
    "%": ln
  }, V = {
    a: Y,
    A: I,
    b: q,
    B: R,
    c: null,
    d: un,
    e: un,
    f: pa,
    g: _a,
    G: Fa,
    H: ga,
    I: ya,
    j: ka,
    L: jn,
    m: va,
    M: Ta,
    p: Yt,
    q: $,
    Q: fn,
    s: hn,
    S: xa,
    u: ba,
    U: Ma,
    V: wa,
    w: Da,
    W: Ca,
    x: null,
    X: null,
    y: Sa,
    Y: Aa,
    Z: Ya,
    "%": ln
  }, N = {
    a: y,
    A: u,
    b: l,
    B: M,
    c: o,
    d: sn,
    e: sn,
    f: Xi,
    g: an,
    G: rn,
    H: on,
    I: on,
    j: Bi,
    L: qi,
    m: Ri,
    M: Zi,
    p: d,
    q: Vi,
    Q: $i,
    s: Qi,
    S: ji,
    u: Wi,
    U: zi,
    V: Oi,
    w: Ni,
    W: Pi,
    x: E,
    X: g,
    y: an,
    Y: rn,
    Z: Hi,
    "%": Gi
  };
  O.x = D(n, O), O.X = D(r, O), O.c = D(e, O), V.x = D(n, V), V.X = D(r, V), V.c = D(e, V);
  function D(b, S) {
    return function(L) {
      var m = [], X = -1, U = 0, tt = b.length, Q, at, it;
      for (L instanceof Date || (L = /* @__PURE__ */ new Date(+L)); ++X < tt; )
        b.charCodeAt(X) === 37 && (m.push(b.slice(U, X)), (at = nn[Q = b.charAt(++X)]) != null ? Q = b.charAt(++X) : at = Q === "e" ? " " : "0", (it = S[Q]) && (Q = it(L, at)), m.push(Q), U = X + 1);
      return m.push(b.slice(U, X)), m.join("");
    };
  }
  function W(b, S) {
    return function(L) {
      var m = Lt(1900, void 0, 1), X = w(m, b, L += "", 0), U, tt;
      if (X != L.length)
        return null;
      if ("Q" in m)
        return new Date(m.Q);
      if ("s" in m)
        return new Date(m.s * 1e3 + ("L" in m ? m.L : 0));
      if (S && !("Z" in m) && (m.Z = 0), "p" in m && (m.H = m.H % 12 + m.p * 12), m.m === void 0 && (m.m = "q" in m ? m.q : 0), "V" in m) {
        if (m.V < 1 || m.V > 53)
          return null;
        "w" in m || (m.w = 1), "Z" in m ? (U = ke(Lt(m.y, 0, 1)), tt = U.getUTCDay(), U = tt > 4 || tt === 0 ? re.ceil(U) : re(U), U = Vn.offset(U, (m.V - 1) * 7), m.y = U.getUTCFullYear(), m.m = U.getUTCMonth(), m.d = U.getUTCDate() + (m.w + 6) % 7) : (U = ye(Lt(m.y, 0, 1)), tt = U.getDay(), U = tt > 4 || tt === 0 ? ee.ceil(U) : ee(U), U = Dt.offset(U, (m.V - 1) * 7), m.y = U.getFullYear(), m.m = U.getMonth(), m.d = U.getDate() + (m.w + 6) % 7);
      } else
        ("W" in m || "U" in m) && ("w" in m || (m.w = "u" in m ? m.u % 7 : "W" in m ? 1 : 0), tt = "Z" in m ? ke(Lt(m.y, 0, 1)).getUTCDay() : ye(Lt(m.y, 0, 1)).getDay(), m.m = 0, m.d = "W" in m ? (m.w + 6) % 7 + m.W * 7 - (tt + 5) % 7 : m.w + m.U * 7 - (tt + 6) % 7);
      return "Z" in m ? (m.H += m.Z / 100 | 0, m.M += m.Z % 100, ke(m)) : ye(m);
    };
  }
  function w(b, S, L, m) {
    for (var X = 0, U = S.length, tt = L.length, Q, at; X < U; ) {
      if (m >= tt)
        return -1;
      if (Q = S.charCodeAt(X++), Q === 37) {
        if (Q = S.charAt(X++), at = N[Q in nn ? S.charAt(X++) : Q], !at || (m = at(b, L, m)) < 0)
          return -1;
      } else if (Q != L.charCodeAt(m++))
        return -1;
    }
    return m;
  }
  function d(b, S, L) {
    var m = h.exec(S.slice(L));
    return m ? (b.p = k.get(m[0].toLowerCase()), L + m[0].length) : -1;
  }
  function y(b, S, L) {
    var m = x.exec(S.slice(L));
    return m ? (b.w = _.get(m[0].toLowerCase()), L + m[0].length) : -1;
  }
  function u(b, S, L) {
    var m = p.exec(S.slice(L));
    return m ? (b.w = v.get(m[0].toLowerCase()), L + m[0].length) : -1;
  }
  function l(b, S, L) {
    var m = H.exec(S.slice(L));
    return m ? (b.m = B.get(m[0].toLowerCase()), L + m[0].length) : -1;
  }
  function M(b, S, L) {
    var m = C.exec(S.slice(L));
    return m ? (b.m = P.get(m[0].toLowerCase()), L + m[0].length) : -1;
  }
  function o(b, S, L) {
    return w(b, e, S, L);
  }
  function E(b, S, L) {
    return w(b, n, S, L);
  }
  function g(b, S, L) {
    return w(b, r, S, L);
  }
  function Z(b) {
    return s[b.getDay()];
  }
  function j(b) {
    return a[b.getDay()];
  }
  function K(b) {
    return f[b.getMonth()];
  }
  function T(b) {
    return c[b.getMonth()];
  }
  function A(b) {
    return i[+(b.getHours() >= 12)];
  }
  function F(b) {
    return 1 + ~~(b.getMonth() / 3);
  }
  function Y(b) {
    return s[b.getUTCDay()];
  }
  function I(b) {
    return a[b.getUTCDay()];
  }
  function q(b) {
    return f[b.getUTCMonth()];
  }
  function R(b) {
    return c[b.getUTCMonth()];
  }
  function Yt(b) {
    return i[+(b.getUTCHours() >= 12)];
  }
  function $(b) {
    return 1 + ~~(b.getUTCMonth() / 3);
  }
  return {
    format: function(b) {
      var S = D(b += "", O);
      return S.toString = function() {
        return b;
      }, S;
    },
    parse: function(b) {
      var S = W(b += "", !1);
      return S.toString = function() {
        return b;
      }, S;
    },
    utcFormat: function(b) {
      var S = D(b += "", V);
      return S.toString = function() {
        return b;
      }, S;
    },
    utcParse: function(b) {
      var S = W(b += "", !0);
      return S.toString = function() {
        return b;
      }, S;
    }
  };
}
var nn = { "-": "", _: " ", 0: "0" }, J = /^\s*\d+/, Ui = /^%/, Ei = /[\\^$*+?|[\]().{}]/g;
function z(t, e, n) {
  var r = t < 0 ? "-" : "", i = (r ? -t : t) + "", a = i.length;
  return r + (a < n ? new Array(n - a + 1).join(e) + i : i);
}
function Ii(t) {
  return t.replace(Ei, "\\$&");
}
function Ut(t) {
  return new RegExp("^(?:" + t.map(Ii).join("|") + ")", "i");
}
function Et(t) {
  return new Map(t.map((e, n) => [e.toLowerCase(), n]));
}
function Ni(t, e, n) {
  var r = J.exec(e.slice(n, n + 1));
  return r ? (t.w = +r[0], n + r[0].length) : -1;
}
function Wi(t, e, n) {
  var r = J.exec(e.slice(n, n + 1));
  return r ? (t.u = +r[0], n + r[0].length) : -1;
}
function zi(t, e, n) {
  var r = J.exec(e.slice(n, n + 2));
  return r ? (t.U = +r[0], n + r[0].length) : -1;
}
function Oi(t, e, n) {
  var r = J.exec(e.slice(n, n + 2));
  return r ? (t.V = +r[0], n + r[0].length) : -1;
}
function Pi(t, e, n) {
  var r = J.exec(e.slice(n, n + 2));
  return r ? (t.W = +r[0], n + r[0].length) : -1;
}
function rn(t, e, n) {
  var r = J.exec(e.slice(n, n + 4));
  return r ? (t.y = +r[0], n + r[0].length) : -1;
}
function an(t, e, n) {
  var r = J.exec(e.slice(n, n + 2));
  return r ? (t.y = +r[0] + (+r[0] > 68 ? 1900 : 2e3), n + r[0].length) : -1;
}
function Hi(t, e, n) {
  var r = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(e.slice(n, n + 6));
  return r ? (t.Z = r[1] ? 0 : -(r[2] + (r[3] || "00")), n + r[0].length) : -1;
}
function Vi(t, e, n) {
  var r = J.exec(e.slice(n, n + 1));
  return r ? (t.q = r[0] * 3 - 3, n + r[0].length) : -1;
}
function Ri(t, e, n) {
  var r = J.exec(e.slice(n, n + 2));
  return r ? (t.m = r[0] - 1, n + r[0].length) : -1;
}
function sn(t, e, n) {
  var r = J.exec(e.slice(n, n + 2));
  return r ? (t.d = +r[0], n + r[0].length) : -1;
}
function Bi(t, e, n) {
  var r = J.exec(e.slice(n, n + 3));
  return r ? (t.m = 0, t.d = +r[0], n + r[0].length) : -1;
}
function on(t, e, n) {
  var r = J.exec(e.slice(n, n + 2));
  return r ? (t.H = +r[0], n + r[0].length) : -1;
}
function Zi(t, e, n) {
  var r = J.exec(e.slice(n, n + 2));
  return r ? (t.M = +r[0], n + r[0].length) : -1;
}
function ji(t, e, n) {
  var r = J.exec(e.slice(n, n + 2));
  return r ? (t.S = +r[0], n + r[0].length) : -1;
}
function qi(t, e, n) {
  var r = J.exec(e.slice(n, n + 3));
  return r ? (t.L = +r[0], n + r[0].length) : -1;
}
function Xi(t, e, n) {
  var r = J.exec(e.slice(n, n + 6));
  return r ? (t.L = Math.floor(r[0] / 1e3), n + r[0].length) : -1;
}
function Gi(t, e, n) {
  var r = Ui.exec(e.slice(n, n + 1));
  return r ? n + r[0].length : -1;
}
function $i(t, e, n) {
  var r = J.exec(e.slice(n));
  return r ? (t.Q = +r[0], n + r[0].length) : -1;
}
function Qi(t, e, n) {
  var r = J.exec(e.slice(n));
  return r ? (t.s = +r[0], n + r[0].length) : -1;
}
function cn(t, e) {
  return z(t.getDate(), e, 2);
}
function Ji(t, e) {
  return z(t.getHours(), e, 2);
}
function Ki(t, e) {
  return z(t.getHours() % 12 || 12, e, 2);
}
function ta(t, e) {
  return z(1 + Dt.count(yt(t), t), e, 3);
}
function Bn(t, e) {
  return z(t.getMilliseconds(), e, 3);
}
function ea(t, e) {
  return Bn(t, e) + "000";
}
function na(t, e) {
  return z(t.getMonth() + 1, e, 2);
}
function ra(t, e) {
  return z(t.getMinutes(), e, 2);
}
function ia(t, e) {
  return z(t.getSeconds(), e, 2);
}
function aa(t) {
  var e = t.getDay();
  return e === 0 ? 7 : e;
}
function sa(t, e) {
  return z(Ct.count(yt(t) - 1, t), e, 2);
}
function Zn(t) {
  var e = t.getDay();
  return e >= 4 || e === 0 ? St(t) : St.ceil(t);
}
function oa(t, e) {
  return t = Zn(t), z(St.count(yt(t), t) + (yt(t).getDay() === 4), e, 2);
}
function ca(t) {
  return t.getDay();
}
function ua(t, e) {
  return z(ee.count(yt(t) - 1, t), e, 2);
}
function la(t, e) {
  return z(t.getFullYear() % 100, e, 2);
}
function fa(t, e) {
  return t = Zn(t), z(t.getFullYear() % 100, e, 2);
}
function ha(t, e) {
  return z(t.getFullYear() % 1e4, e, 4);
}
function da(t, e) {
  var n = t.getDay();
  return t = n >= 4 || n === 0 ? St(t) : St.ceil(t), z(t.getFullYear() % 1e4, e, 4);
}
function ma(t) {
  var e = t.getTimezoneOffset();
  return (e > 0 ? "-" : (e *= -1, "+")) + z(e / 60 | 0, "0", 2) + z(e % 60, "0", 2);
}
function un(t, e) {
  return z(t.getUTCDate(), e, 2);
}
function ga(t, e) {
  return z(t.getUTCHours(), e, 2);
}
function ya(t, e) {
  return z(t.getUTCHours() % 12 || 12, e, 2);
}
function ka(t, e) {
  return z(1 + Vn.count(Wt(t), t), e, 3);
}
function jn(t, e) {
  return z(t.getUTCMilliseconds(), e, 3);
}
function pa(t, e) {
  return jn(t, e) + "000";
}
function va(t, e) {
  return z(t.getUTCMonth() + 1, e, 2);
}
function Ta(t, e) {
  return z(t.getUTCMinutes(), e, 2);
}
function xa(t, e) {
  return z(t.getUTCSeconds(), e, 2);
}
function ba(t) {
  var e = t.getUTCDay();
  return e === 0 ? 7 : e;
}
function Ma(t, e) {
  return z(Rn.count(Wt(t) - 1, t), e, 2);
}
function qn(t) {
  var e = t.getUTCDay();
  return e >= 4 || e === 0 ? _t(t) : _t.ceil(t);
}
function wa(t, e) {
  return t = qn(t), z(_t.count(Wt(t), t) + (Wt(t).getUTCDay() === 4), e, 2);
}
function Da(t) {
  return t.getUTCDay();
}
function Ca(t, e) {
  return z(re.count(Wt(t) - 1, t), e, 2);
}
function Sa(t, e) {
  return z(t.getUTCFullYear() % 100, e, 2);
}
function _a(t, e) {
  return t = qn(t), z(t.getUTCFullYear() % 100, e, 2);
}
function Aa(t, e) {
  return z(t.getUTCFullYear() % 1e4, e, 4);
}
function Fa(t, e) {
  var n = t.getUTCDay();
  return t = n >= 4 || n === 0 ? _t(t) : _t.ceil(t), z(t.getUTCFullYear() % 1e4, e, 4);
}
function Ya() {
  return "+0000";
}
function ln() {
  return "%";
}
function fn(t) {
  return +t;
}
function hn(t) {
  return Math.floor(+t / 1e3);
}
var vt, ie;
La({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
});
function La(t) {
  return vt = Li(t), ie = vt.format, vt.parse, vt.utcFormat, vt.utcParse, vt;
}
function Ua(t) {
  return new Date(t);
}
function Ea(t) {
  return t instanceof Date ? +t : +/* @__PURE__ */ new Date(+t);
}
function Xn(t, e, n, r, i, a, s, c, f, h) {
  var k = En(), p = k.invert, v = k.domain, x = h(".%L"), _ = h(":%S"), C = h("%I:%M"), P = h("%I %p"), H = h("%a %d"), B = h("%b %d"), O = h("%B"), V = h("%Y");
  function N(D) {
    return (f(D) < D ? x : c(D) < D ? _ : s(D) < D ? C : a(D) < D ? P : r(D) < D ? i(D) < D ? H : B : n(D) < D ? O : V)(D);
  }
  return k.invert = function(D) {
    return new Date(p(D));
  }, k.domain = function(D) {
    return arguments.length ? v(Array.from(D, Ea)) : v().map(Ua);
  }, k.ticks = function(D) {
    var W = v();
    return t(W[0], W[W.length - 1], D ?? 10);
  }, k.tickFormat = function(D, W) {
    return W == null ? N : h(W);
  }, k.nice = function(D) {
    var W = v();
    return (!D || typeof D.range != "function") && (D = e(W[0], W[W.length - 1], D ?? 10)), D ? v(vi(W, D)) : k;
  }, k.copy = function() {
    return Un(k, Xn(t, e, n, r, i, a, s, c, f, h));
  }, k;
}
function Ia() {
  return Tn.apply(Xn(Fi, Yi, yt, ne, Ct, Dt, te, Kt, Nt, ie).domain([new Date(2e3, 0, 1), new Date(2e3, 0, 2)]), arguments);
}
var _e = function() {
  var t = function(w, d, y, u) {
    for (y = y || {}, u = w.length; u--; y[w[u]] = d)
      ;
    return y;
  }, e = [1, 3], n = [1, 5], r = [7, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 23, 25, 26, 28, 35, 40], i = [1, 15], a = [1, 16], s = [1, 17], c = [1, 18], f = [1, 19], h = [1, 20], k = [1, 21], p = [1, 22], v = [1, 23], x = [1, 24], _ = [1, 25], C = [1, 26], P = [1, 27], H = [1, 29], B = [1, 31], O = [1, 34], V = [5, 7, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 23, 25, 26, 28, 35, 40], N = {
    trace: function() {
    },
    yy: {},
    symbols_: { error: 2, start: 3, directive: 4, gantt: 5, document: 6, EOF: 7, line: 8, SPACE: 9, statement: 10, NL: 11, dateFormat: 12, inclusiveEndDates: 13, topAxis: 14, axisFormat: 15, tickInterval: 16, excludes: 17, includes: 18, todayMarker: 19, title: 20, acc_title: 21, acc_title_value: 22, acc_descr: 23, acc_descr_value: 24, acc_descr_multiline_value: 25, section: 26, clickStatement: 27, taskTxt: 28, taskData: 29, openDirective: 30, typeDirective: 31, closeDirective: 32, ":": 33, argDirective: 34, click: 35, callbackname: 36, callbackargs: 37, href: 38, clickStatementDebug: 39, open_directive: 40, type_directive: 41, arg_directive: 42, close_directive: 43, $accept: 0, $end: 1 },
    terminals_: { 2: "error", 5: "gantt", 7: "EOF", 9: "SPACE", 11: "NL", 12: "dateFormat", 13: "inclusiveEndDates", 14: "topAxis", 15: "axisFormat", 16: "tickInterval", 17: "excludes", 18: "includes", 19: "todayMarker", 20: "title", 21: "acc_title", 22: "acc_title_value", 23: "acc_descr", 24: "acc_descr_value", 25: "acc_descr_multiline_value", 26: "section", 28: "taskTxt", 29: "taskData", 33: ":", 35: "click", 36: "callbackname", 37: "callbackargs", 38: "href", 40: "open_directive", 41: "type_directive", 42: "arg_directive", 43: "close_directive" },
    productions_: [0, [3, 2], [3, 3], [6, 0], [6, 2], [8, 2], [8, 1], [8, 1], [8, 1], [10, 1], [10, 1], [10, 1], [10, 1], [10, 1], [10, 1], [10, 1], [10, 1], [10, 1], [10, 2], [10, 2], [10, 1], [10, 1], [10, 1], [10, 2], [10, 1], [4, 4], [4, 6], [27, 2], [27, 3], [27, 3], [27, 4], [27, 3], [27, 4], [27, 2], [39, 2], [39, 3], [39, 3], [39, 4], [39, 3], [39, 4], [39, 2], [30, 1], [31, 1], [34, 1], [32, 1]],
    performAction: function(d, y, u, l, M, o, E) {
      var g = o.length - 1;
      switch (M) {
        case 2:
          return o[g - 1];
        case 3:
          this.$ = [];
          break;
        case 4:
          o[g - 1].push(o[g]), this.$ = o[g - 1];
          break;
        case 5:
        case 6:
          this.$ = o[g];
          break;
        case 7:
        case 8:
          this.$ = [];
          break;
        case 9:
          l.setDateFormat(o[g].substr(11)), this.$ = o[g].substr(11);
          break;
        case 10:
          l.enableInclusiveEndDates(), this.$ = o[g].substr(18);
          break;
        case 11:
          l.TopAxis(), this.$ = o[g].substr(8);
          break;
        case 12:
          l.setAxisFormat(o[g].substr(11)), this.$ = o[g].substr(11);
          break;
        case 13:
          l.setTickInterval(o[g].substr(13)), this.$ = o[g].substr(13);
          break;
        case 14:
          l.setExcludes(o[g].substr(9)), this.$ = o[g].substr(9);
          break;
        case 15:
          l.setIncludes(o[g].substr(9)), this.$ = o[g].substr(9);
          break;
        case 16:
          l.setTodayMarker(o[g].substr(12)), this.$ = o[g].substr(12);
          break;
        case 17:
          l.setDiagramTitle(o[g].substr(6)), this.$ = o[g].substr(6);
          break;
        case 18:
          this.$ = o[g].trim(), l.setAccTitle(this.$);
          break;
        case 19:
        case 20:
          this.$ = o[g].trim(), l.setAccDescription(this.$);
          break;
        case 21:
          l.addSection(o[g].substr(8)), this.$ = o[g].substr(8);
          break;
        case 23:
          l.addTask(o[g - 1], o[g]), this.$ = "task";
          break;
        case 27:
          this.$ = o[g - 1], l.setClickEvent(o[g - 1], o[g], null);
          break;
        case 28:
          this.$ = o[g - 2], l.setClickEvent(o[g - 2], o[g - 1], o[g]);
          break;
        case 29:
          this.$ = o[g - 2], l.setClickEvent(o[g - 2], o[g - 1], null), l.setLink(o[g - 2], o[g]);
          break;
        case 30:
          this.$ = o[g - 3], l.setClickEvent(o[g - 3], o[g - 2], o[g - 1]), l.setLink(o[g - 3], o[g]);
          break;
        case 31:
          this.$ = o[g - 2], l.setClickEvent(o[g - 2], o[g], null), l.setLink(o[g - 2], o[g - 1]);
          break;
        case 32:
          this.$ = o[g - 3], l.setClickEvent(o[g - 3], o[g - 1], o[g]), l.setLink(o[g - 3], o[g - 2]);
          break;
        case 33:
          this.$ = o[g - 1], l.setLink(o[g - 1], o[g]);
          break;
        case 34:
        case 40:
          this.$ = o[g - 1] + " " + o[g];
          break;
        case 35:
        case 36:
        case 38:
          this.$ = o[g - 2] + " " + o[g - 1] + " " + o[g];
          break;
        case 37:
        case 39:
          this.$ = o[g - 3] + " " + o[g - 2] + " " + o[g - 1] + " " + o[g];
          break;
        case 41:
          l.parseDirective("%%{", "open_directive");
          break;
        case 42:
          l.parseDirective(o[g], "type_directive");
          break;
        case 43:
          o[g] = o[g].trim().replace(/'/g, '"'), l.parseDirective(o[g], "arg_directive");
          break;
        case 44:
          l.parseDirective("}%%", "close_directive", "gantt");
          break;
      }
    },
    table: [{ 3: 1, 4: 2, 5: e, 30: 4, 40: n }, { 1: [3] }, { 3: 6, 4: 2, 5: e, 30: 4, 40: n }, t(r, [2, 3], { 6: 7 }), { 31: 8, 41: [1, 9] }, { 41: [2, 41] }, { 1: [2, 1] }, { 4: 30, 7: [1, 10], 8: 11, 9: [1, 12], 10: 13, 11: [1, 14], 12: i, 13: a, 14: s, 15: c, 16: f, 17: h, 18: k, 19: p, 20: v, 21: x, 23: _, 25: C, 26: P, 27: 28, 28: H, 30: 4, 35: B, 40: n }, { 32: 32, 33: [1, 33], 43: O }, t([33, 43], [2, 42]), t(r, [2, 8], { 1: [2, 2] }), t(r, [2, 4]), { 4: 30, 10: 35, 12: i, 13: a, 14: s, 15: c, 16: f, 17: h, 18: k, 19: p, 20: v, 21: x, 23: _, 25: C, 26: P, 27: 28, 28: H, 30: 4, 35: B, 40: n }, t(r, [2, 6]), t(r, [2, 7]), t(r, [2, 9]), t(r, [2, 10]), t(r, [2, 11]), t(r, [2, 12]), t(r, [2, 13]), t(r, [2, 14]), t(r, [2, 15]), t(r, [2, 16]), t(r, [2, 17]), { 22: [1, 36] }, { 24: [1, 37] }, t(r, [2, 20]), t(r, [2, 21]), t(r, [2, 22]), { 29: [1, 38] }, t(r, [2, 24]), { 36: [1, 39], 38: [1, 40] }, { 11: [1, 41] }, { 34: 42, 42: [1, 43] }, { 11: [2, 44] }, t(r, [2, 5]), t(r, [2, 18]), t(r, [2, 19]), t(r, [2, 23]), t(r, [2, 27], { 37: [1, 44], 38: [1, 45] }), t(r, [2, 33], { 36: [1, 46] }), t(V, [2, 25]), { 32: 47, 43: O }, { 43: [2, 43] }, t(r, [2, 28], { 38: [1, 48] }), t(r, [2, 29]), t(r, [2, 31], { 37: [1, 49] }), { 11: [1, 50] }, t(r, [2, 30]), t(r, [2, 32]), t(V, [2, 26])],
    defaultActions: { 5: [2, 41], 6: [2, 1], 34: [2, 44], 43: [2, 43] },
    parseError: function(d, y) {
      if (y.recoverable)
        this.trace(d);
      else {
        var u = new Error(d);
        throw u.hash = y, u;
      }
    },
    parse: function(d) {
      var y = this, u = [0], l = [], M = [null], o = [], E = this.table, g = "", Z = 0, j = 0, K = 2, T = 1, A = o.slice.call(arguments, 1), F = Object.create(this.lexer), Y = { yy: {} };
      for (var I in this.yy)
        Object.prototype.hasOwnProperty.call(this.yy, I) && (Y.yy[I] = this.yy[I]);
      F.setInput(d, Y.yy), Y.yy.lexer = F, Y.yy.parser = this, typeof F.yylloc > "u" && (F.yylloc = {});
      var q = F.yylloc;
      o.push(q);
      var R = F.options && F.options.ranges;
      typeof Y.yy.parseError == "function" ? this.parseError = Y.yy.parseError : this.parseError = Object.getPrototypeOf(this).parseError;
      function Yt() {
        var it;
        return it = l.pop() || F.lex() || T, typeof it != "number" && (it instanceof Array && (l = it, it = l.pop()), it = y.symbols_[it] || it), it;
      }
      for (var $, b, S, L, m = {}, X, U, tt, Q; ; ) {
        if (b = u[u.length - 1], this.defaultActions[b] ? S = this.defaultActions[b] : (($ === null || typeof $ > "u") && ($ = Yt()), S = E[b] && E[b][$]), typeof S > "u" || !S.length || !S[0]) {
          var at = "";
          Q = [];
          for (X in E[b])
            this.terminals_[X] && X > K && Q.push("'" + this.terminals_[X] + "'");
          F.showPosition ? at = "Parse error on line " + (Z + 1) + `:
` + F.showPosition() + `
Expecting ` + Q.join(", ") + ", got '" + (this.terminals_[$] || $) + "'" : at = "Parse error on line " + (Z + 1) + ": Unexpected " + ($ == T ? "end of input" : "'" + (this.terminals_[$] || $) + "'"), this.parseError(at, {
            text: F.match,
            token: this.terminals_[$] || $,
            line: F.yylineno,
            loc: q,
            expected: Q
          });
        }
        if (S[0] instanceof Array && S.length > 1)
          throw new Error("Parse Error: multiple actions possible at state: " + b + ", token: " + $);
        switch (S[0]) {
          case 1:
            u.push($), M.push(F.yytext), o.push(F.yylloc), u.push(S[1]), $ = null, j = F.yyleng, g = F.yytext, Z = F.yylineno, q = F.yylloc;
            break;
          case 2:
            if (U = this.productions_[S[1]][1], m.$ = M[M.length - U], m._$ = {
              first_line: o[o.length - (U || 1)].first_line,
              last_line: o[o.length - 1].last_line,
              first_column: o[o.length - (U || 1)].first_column,
              last_column: o[o.length - 1].last_column
            }, R && (m._$.range = [
              o[o.length - (U || 1)].range[0],
              o[o.length - 1].range[1]
            ]), L = this.performAction.apply(m, [
              g,
              j,
              Z,
              Y.yy,
              S[1],
              M,
              o
            ].concat(A)), typeof L < "u")
              return L;
            U && (u = u.slice(0, -1 * U * 2), M = M.slice(0, -1 * U), o = o.slice(0, -1 * U)), u.push(this.productions_[S[1]][0]), M.push(m.$), o.push(m._$), tt = E[u[u.length - 2]][u[u.length - 1]], u.push(tt);
            break;
          case 3:
            return !0;
        }
      }
      return !0;
    }
  }, D = function() {
    var w = {
      EOF: 1,
      parseError: function(y, u) {
        if (this.yy.parser)
          this.yy.parser.parseError(y, u);
        else
          throw new Error(y);
      },
      // resets the lexer, sets new input
      setInput: function(d, y) {
        return this.yy = y || this.yy || {}, this._input = d, this._more = this._backtrack = this.done = !1, this.yylineno = this.yyleng = 0, this.yytext = this.matched = this.match = "", this.conditionStack = ["INITIAL"], this.yylloc = {
          first_line: 1,
          first_column: 0,
          last_line: 1,
          last_column: 0
        }, this.options.ranges && (this.yylloc.range = [0, 0]), this.offset = 0, this;
      },
      // consumes and returns one char from the input
      input: function() {
        var d = this._input[0];
        this.yytext += d, this.yyleng++, this.offset++, this.match += d, this.matched += d;
        var y = d.match(/(?:\r\n?|\n).*/g);
        return y ? (this.yylineno++, this.yylloc.last_line++) : this.yylloc.last_column++, this.options.ranges && this.yylloc.range[1]++, this._input = this._input.slice(1), d;
      },
      // unshifts one char (or a string) into the input
      unput: function(d) {
        var y = d.length, u = d.split(/(?:\r\n?|\n)/g);
        this._input = d + this._input, this.yytext = this.yytext.substr(0, this.yytext.length - y), this.offset -= y;
        var l = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1), this.matched = this.matched.substr(0, this.matched.length - 1), u.length - 1 && (this.yylineno -= u.length - 1);
        var M = this.yylloc.range;
        return this.yylloc = {
          first_line: this.yylloc.first_line,
          last_line: this.yylineno + 1,
          first_column: this.yylloc.first_column,
          last_column: u ? (u.length === l.length ? this.yylloc.first_column : 0) + l[l.length - u.length].length - u[0].length : this.yylloc.first_column - y
        }, this.options.ranges && (this.yylloc.range = [M[0], M[0] + this.yyleng - y]), this.yyleng = this.yytext.length, this;
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
      less: function(d) {
        this.unput(this.match.slice(d));
      },
      // displays already matched input, i.e. for error messages
      pastInput: function() {
        var d = this.matched.substr(0, this.matched.length - this.match.length);
        return (d.length > 20 ? "..." : "") + d.substr(-20).replace(/\n/g, "");
      },
      // displays upcoming input, i.e. for error messages
      upcomingInput: function() {
        var d = this.match;
        return d.length < 20 && (d += this._input.substr(0, 20 - d.length)), (d.substr(0, 20) + (d.length > 20 ? "..." : "")).replace(/\n/g, "");
      },
      // displays the character position where the lexing error occurred, i.e. for error messages
      showPosition: function() {
        var d = this.pastInput(), y = new Array(d.length + 1).join("-");
        return d + this.upcomingInput() + `
` + y + "^";
      },
      // test the lexed token: return FALSE when not a match, otherwise return token
      test_match: function(d, y) {
        var u, l, M;
        if (this.options.backtrack_lexer && (M = {
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
        }, this.options.ranges && (M.yylloc.range = this.yylloc.range.slice(0))), l = d[0].match(/(?:\r\n?|\n).*/g), l && (this.yylineno += l.length), this.yylloc = {
          first_line: this.yylloc.last_line,
          last_line: this.yylineno + 1,
          first_column: this.yylloc.last_column,
          last_column: l ? l[l.length - 1].length - l[l.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + d[0].length
        }, this.yytext += d[0], this.match += d[0], this.matches = d, this.yyleng = this.yytext.length, this.options.ranges && (this.yylloc.range = [this.offset, this.offset += this.yyleng]), this._more = !1, this._backtrack = !1, this._input = this._input.slice(d[0].length), this.matched += d[0], u = this.performAction.call(this, this.yy, this, y, this.conditionStack[this.conditionStack.length - 1]), this.done && this._input && (this.done = !1), u)
          return u;
        if (this._backtrack) {
          for (var o in M)
            this[o] = M[o];
          return !1;
        }
        return !1;
      },
      // return next match in input
      next: function() {
        if (this.done)
          return this.EOF;
        this._input || (this.done = !0);
        var d, y, u, l;
        this._more || (this.yytext = "", this.match = "");
        for (var M = this._currentRules(), o = 0; o < M.length; o++)
          if (u = this._input.match(this.rules[M[o]]), u && (!y || u[0].length > y[0].length)) {
            if (y = u, l = o, this.options.backtrack_lexer) {
              if (d = this.test_match(u, M[o]), d !== !1)
                return d;
              if (this._backtrack) {
                y = !1;
                continue;
              } else
                return !1;
            } else if (!this.options.flex)
              break;
          }
        return y ? (d = this.test_match(y, M[l]), d !== !1 ? d : !1) : this._input === "" ? this.EOF : this.parseError("Lexical error on line " + (this.yylineno + 1) + `. Unrecognized text.
` + this.showPosition(), {
          text: "",
          token: null,
          line: this.yylineno
        });
      },
      // return next match that has a token
      lex: function() {
        var y = this.next();
        return y || this.lex();
      },
      // activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
      begin: function(y) {
        this.conditionStack.push(y);
      },
      // pop the previously active lexer condition state off the condition stack
      popState: function() {
        var y = this.conditionStack.length - 1;
        return y > 0 ? this.conditionStack.pop() : this.conditionStack[0];
      },
      // produce the lexer rule set which is active for the currently active lexer condition state
      _currentRules: function() {
        return this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1] ? this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules : this.conditions.INITIAL.rules;
      },
      // return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
      topState: function(y) {
        return y = this.conditionStack.length - 1 - Math.abs(y || 0), y >= 0 ? this.conditionStack[y] : "INITIAL";
      },
      // alias for begin(condition)
      pushState: function(y) {
        this.begin(y);
      },
      // return the number of states currently on the stack
      stateStackSize: function() {
        return this.conditionStack.length;
      },
      options: { "case-insensitive": !0 },
      performAction: function(y, u, l, M) {
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
  N.lexer = D;
  function W() {
    this.yy = {};
  }
  return W.prototype = N, N.Parser = W, new W();
}();
_e.parser = _e;
const Na = _e;
var Wa = "isoweek";
const za = function(t, e, n) {
  var r = function(f, h) {
    var k = (h ? n.utc : n)().year(f).startOf(lr), p = 4 - k.isoWeekday();
    return k.isoWeekday() > 4 && (p += 7), k.add(p, oe);
  }, i = function(f) {
    return f.add(4 - f.isoWeekday(), oe);
  }, a = e.prototype;
  a.isoWeekYear = function() {
    var c = i(this);
    return c.year();
  }, a.isoWeek = function(c) {
    if (!this.$utils().u(c))
      return this.add((c - this.isoWeek()) * 7, oe);
    var f = i(this), h = r(this.isoWeekYear(), this.$u);
    return f.diff(h, ur) + 1;
  }, a.isoWeekday = function(c) {
    return this.$utils().u(c) ? this.day() || 7 : this.day(this.day() % 7 ? c : c - 7);
  };
  var s = a.startOf;
  a.startOf = function(c, f) {
    var h = this.$utils(), k = h.u(f) ? !0 : f, p = h.p(c);
    return p === Wa ? k ? this.date(this.date() - (this.isoWeekday() - 1)).startOf("day") : this.date(this.date() - 1 - (this.isoWeekday() - 1) + 7).endOf("day") : s.bind(this)(c, f);
  };
};
var Oa = function(e) {
  return e.replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, function(n, r, i) {
    return r || i.slice(1);
  });
}, Pa = {
  LTS: "h:mm:ss A",
  LT: "h:mm A",
  L: "MM/DD/YYYY",
  LL: "MMMM D, YYYY",
  LLL: "MMMM D, YYYY h:mm A",
  LLLL: "dddd, MMMM D, YYYY h:mm A"
}, Ha = function(e, n) {
  return e.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, function(r, i, a) {
    var s = a && a.toUpperCase();
    return i || n[a] || Pa[a] || Oa(n[s]);
  });
}, Va = /(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|YYYY|YY?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g, Ra = /\d/, Bt = /\d\d/, Ba = /\d{3}/, Za = /\d{4}/, st = /\d\d?/, ja = /[+-]?\d+/, qa = /[+-]\d\d:?(\d\d)?|Z/, It = /\d*[^-_:/,()\s\d]+/, dt = {}, Gn = function(e) {
  return e = +e, e + (e > 68 ? 1900 : 2e3);
};
function Xa(t) {
  if (!t || t === "Z")
    return 0;
  var e = t.match(/([+-]|\d\d)/g), n = +(e[1] * 60) + (+e[2] || 0);
  return n === 0 ? 0 : e[0] === "+" ? -n : n;
}
var nt = function(e) {
  return function(n) {
    this[e] = +n;
  };
}, dn = [qa, function(t) {
  var e = this.zone || (this.zone = {});
  e.offset = Xa(t);
}], pe = function(e) {
  var n = dt[e];
  return n && (n.indexOf ? n : n.s.concat(n.f));
}, mn = function(e, n) {
  var r, i = dt, a = i.meridiem;
  if (!a)
    r = e === (n ? "pm" : "PM");
  else
    for (var s = 1; s <= 24; s += 1)
      if (e.indexOf(a(s, 0, n)) > -1) {
        r = s > 12;
        break;
      }
  return r;
}, Ga = {
  A: [It, function(t) {
    this.afternoon = mn(t, !1);
  }],
  a: [It, function(t) {
    this.afternoon = mn(t, !0);
  }],
  S: [Ra, function(t) {
    this.milliseconds = +t * 100;
  }],
  SS: [Bt, function(t) {
    this.milliseconds = +t * 10;
  }],
  SSS: [Ba, function(t) {
    this.milliseconds = +t;
  }],
  s: [st, nt("seconds")],
  ss: [st, nt("seconds")],
  m: [st, nt("minutes")],
  mm: [st, nt("minutes")],
  H: [st, nt("hours")],
  h: [st, nt("hours")],
  HH: [st, nt("hours")],
  hh: [st, nt("hours")],
  D: [st, nt("day")],
  DD: [Bt, nt("day")],
  Do: [It, function(t) {
    var e = dt, n = e.ordinal, r = t.match(/\d+/);
    if (this.day = r[0], !!n)
      for (var i = 1; i <= 31; i += 1)
        n(i).replace(/\[|\]/g, "") === t && (this.day = i);
  }],
  M: [st, nt("month")],
  MM: [Bt, nt("month")],
  MMM: [It, function(t) {
    var e = pe("months"), n = pe("monthsShort"), r = (n || e.map(function(i) {
      return i.slice(0, 3);
    })).indexOf(t) + 1;
    if (r < 1)
      throw new Error();
    this.month = r % 12 || r;
  }],
  MMMM: [It, function(t) {
    var e = pe("months"), n = e.indexOf(t) + 1;
    if (n < 1)
      throw new Error();
    this.month = n % 12 || n;
  }],
  Y: [ja, nt("year")],
  YY: [Bt, function(t) {
    this.year = Gn(t);
  }],
  YYYY: [Za, nt("year")],
  Z: dn,
  ZZ: dn
};
function $a(t) {
  var e = t.afternoon;
  if (e !== void 0) {
    var n = t.hours;
    e ? n < 12 && (t.hours += 12) : n === 12 && (t.hours = 0), delete t.afternoon;
  }
}
function Qa(t) {
  t = Ha(t, dt && dt.formats);
  for (var e = t.match(Va), n = e.length, r = 0; r < n; r += 1) {
    var i = e[r], a = Ga[i], s = a && a[0], c = a && a[1];
    c ? e[r] = {
      regex: s,
      parser: c
    } : e[r] = i.replace(/^\[|\]$/g, "");
  }
  return function(f) {
    for (var h = {}, k = 0, p = 0; k < n; k += 1) {
      var v = e[k];
      if (typeof v == "string")
        p += v.length;
      else {
        var x = v.regex, _ = v.parser, C = f.slice(p), P = x.exec(C), H = P[0];
        _.call(h, H), f = f.replace(H, "");
      }
    }
    return $a(h), h;
  };
}
var Ja = function(e, n, r) {
  try {
    if (["x", "X"].indexOf(n) > -1)
      return new Date((n === "X" ? 1e3 : 1) * e);
    var i = Qa(n), a = i(e), s = a.year, c = a.month, f = a.day, h = a.hours, k = a.minutes, p = a.seconds, v = a.milliseconds, x = a.zone, _ = /* @__PURE__ */ new Date(), C = f || (!s && !c ? _.getDate() : 1), P = s || _.getFullYear(), H = 0;
    s && !c || (H = c > 0 ? c - 1 : _.getMonth());
    var B = h || 0, O = k || 0, V = p || 0, N = v || 0;
    return x ? new Date(Date.UTC(P, H, C, B, O, V, N + x.offset * 60 * 1e3)) : r ? new Date(Date.UTC(P, H, C, B, O, V, N)) : new Date(P, H, C, B, O, V, N);
  } catch {
    return /* @__PURE__ */ new Date("");
  }
};
const Ka = function(t, e, n) {
  n.p.customParseFormat = !0, t && t.parseTwoDigitYear && (Gn = t.parseTwoDigitYear);
  var r = e.prototype, i = r.parse;
  r.parse = function(a) {
    var s = a.date, c = a.utc, f = a.args;
    this.$u = c;
    var h = f[1];
    if (typeof h == "string") {
      var k = f[2] === !0, p = f[3] === !0, v = k || p, x = f[2];
      p && (x = f[2]), dt = this.$locale(), !k && x && (dt = n.Ls[x]), this.$d = Ja(s, h, c), this.init(), x && x !== !0 && (this.$L = this.locale(x).$L), v && s != this.format(h) && (this.$d = /* @__PURE__ */ new Date("")), dt = {};
    } else if (h instanceof Array)
      for (var _ = h.length, C = 1; C <= _; C += 1) {
        f[1] = h[C - 1];
        var P = n.apply(this, f);
        if (P.isValid()) {
          this.$d = P.$d, this.$L = P.$L, this.init();
          break;
        }
        C === _ && (this.$d = /* @__PURE__ */ new Date(""));
      }
    else
      i.call(this, a);
  };
}, ts = function(t, e) {
  var n = e.prototype, r = n.format;
  n.format = function(i) {
    var a = this, s = this.$locale();
    if (!this.isValid())
      return r.bind(this)(i);
    var c = this.$utils(), f = i || fr, h = f.replace(/\[([^\]]+)]|Q|wo|ww|w|WW|W|zzz|z|gggg|GGGG|Do|X|x|k{1,2}|S/g, function(k) {
      switch (k) {
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
          return c.s(a.week(), k === "w" ? 1 : 2, "0");
        case "W":
        case "WW":
          return c.s(a.isoWeek(), k === "W" ? 1 : 2, "0");
        case "k":
        case "kk":
          return c.s(String(a.$H === 0 ? 24 : a.$H), k === "k" ? 1 : 2, "0");
        case "X":
          return Math.floor(a.$d.getTime() / 1e3);
        case "x":
          return a.$d.getTime();
        case "z":
          return "[" + a.offsetName() + "]";
        case "zzz":
          return "[" + a.offsetName("long") + "]";
        default:
          return k;
      }
    });
    return r.bind(this)(h);
  };
};
rt.extend(za);
rt.extend(Ka);
rt.extend(ts);
let ct = "", ze = "", Oe, Pe = "", zt = [], Ot = [], He = {}, Ve = [], ae = [], At = "", Re = "";
const $n = ["active", "done", "crit", "milestone"];
let Be = [], Pt = !1, Ze = !1, Ae = 0;
const es = function(t, e, n) {
  pr.parseDirective(this, t, e, n);
}, ns = function() {
  Ve = [], ae = [], At = "", Be = [], qt = 0, Ye = void 0, Xt = void 0, G = [], ct = "", ze = "", Re = "", Oe = void 0, Pe = "", zt = [], Ot = [], Pt = !1, Ze = !1, Ae = 0, He = {}, vr();
}, rs = function(t) {
  ze = t;
}, is = function() {
  return ze;
}, as = function(t) {
  Oe = t;
}, ss = function() {
  return Oe;
}, os = function(t) {
  Pe = t;
}, cs = function() {
  return Pe;
}, us = function(t) {
  ct = t;
}, ls = function() {
  Pt = !0;
}, fs = function() {
  return Pt;
}, hs = function() {
  Ze = !0;
}, ds = function() {
  return Ze;
}, ms = function(t) {
  Re = t;
}, gs = function() {
  return Re;
}, ys = function() {
  return ct;
}, ks = function(t) {
  zt = t.toLowerCase().split(/[\s,]+/);
}, ps = function() {
  return zt;
}, vs = function(t) {
  Ot = t.toLowerCase().split(/[\s,]+/);
}, Ts = function() {
  return Ot;
}, xs = function() {
  return He;
}, bs = function(t) {
  At = t, Ve.push(t);
}, Ms = function() {
  return Ve;
}, ws = function() {
  let t = gn();
  const e = 10;
  let n = 0;
  for (; !t && n < e; )
    t = gn(), n++;
  return ae = G, ae;
}, Qn = function(t, e, n, r) {
  return r.includes(t.format(e.trim())) ? !1 : t.isoWeekday() >= 6 && n.includes("weekends") || n.includes(t.format("dddd").toLowerCase()) ? !0 : n.includes(t.format(e.trim()));
}, Jn = function(t, e, n, r) {
  if (!n.length || t.manualEndTime)
    return;
  let i;
  t.startTime instanceof Date ? i = rt(t.startTime) : i = rt(t.startTime, e, !0), i = i.add(1, "d");
  let a;
  t.endTime instanceof Date ? a = rt(t.endTime) : a = rt(t.endTime, e, !0);
  const [s, c] = Ds(
    i,
    a,
    e,
    n,
    r
  );
  t.endTime = s.toDate(), t.renderEndTime = c;
}, Ds = function(t, e, n, r, i) {
  let a = !1, s = null;
  for (; t <= e; )
    a || (s = e.toDate()), a = Qn(t, n, r, i), a && (e = e.add(1, "d")), t = t.add(1, "d");
  return [e, s];
}, Fe = function(t, e, n) {
  n = n.trim();
  const i = /^after\s+([\d\w- ]+)/.exec(n.trim());
  if (i !== null) {
    let s = null;
    if (i[1].split(" ").forEach(function(c) {
      let f = Ft(c);
      f !== void 0 && (s ? f.endTime > s.endTime && (s = f) : s = f);
    }), s)
      return s.endTime;
    {
      const c = /* @__PURE__ */ new Date();
      return c.setHours(0, 0, 0, 0), c;
    }
  }
  let a = rt(n, e.trim(), !0);
  if (a.isValid())
    return a.toDate();
  {
    Te.debug("Invalid date:" + n), Te.debug("With date format:" + e.trim());
    const s = new Date(n);
    if (s === void 0 || isNaN(s.getTime()))
      throw new Error("Invalid date:" + n);
    return s;
  }
}, Kn = function(t) {
  const e = /^(\d+(?:\.\d+)?)([Mdhmswy]|ms)$/.exec(t.trim());
  return e !== null ? [Number.parseFloat(e[1]), e[2]] : [NaN, "ms"];
}, tr = function(t, e, n, r = !1) {
  n = n.trim();
  let i = rt(n, e.trim(), !0);
  if (i.isValid())
    return r && (i = i.add(1, "d")), i.toDate();
  let a = rt(t);
  const [s, c] = Kn(n);
  if (!Number.isNaN(s)) {
    const f = a.add(s, c);
    f.isValid() && (a = f);
  }
  return a.toDate();
};
let qt = 0;
const Mt = function(t) {
  return t === void 0 ? (qt = qt + 1, "task" + qt) : t;
}, Cs = function(t, e) {
  let n;
  e.substr(0, 1) === ":" ? n = e.substr(1, e.length) : n = e;
  const r = n.split(","), i = {};
  ir(r, i, $n);
  for (let s = 0; s < r.length; s++)
    r[s] = r[s].trim();
  let a = "";
  switch (r.length) {
    case 1:
      i.id = Mt(), i.startTime = t.endTime, a = r[0];
      break;
    case 2:
      i.id = Mt(), i.startTime = Fe(void 0, ct, r[0]), a = r[1];
      break;
    case 3:
      i.id = Mt(r[0]), i.startTime = Fe(void 0, ct, r[1]), a = r[2];
      break;
  }
  return a && (i.endTime = tr(i.startTime, ct, a, Pt), i.manualEndTime = rt(a, "YYYY-MM-DD", !0).isValid(), Jn(i, ct, Ot, zt)), i;
}, Ss = function(t, e) {
  let n;
  e.substr(0, 1) === ":" ? n = e.substr(1, e.length) : n = e;
  const r = n.split(","), i = {};
  ir(r, i, $n);
  for (let a = 0; a < r.length; a++)
    r[a] = r[a].trim();
  switch (r.length) {
    case 1:
      i.id = Mt(), i.startTime = {
        type: "prevTaskEnd",
        id: t
      }, i.endTime = {
        data: r[0]
      };
      break;
    case 2:
      i.id = Mt(), i.startTime = {
        type: "getStartDate",
        startData: r[0]
      }, i.endTime = {
        data: r[1]
      };
      break;
    case 3:
      i.id = Mt(r[0]), i.startTime = {
        type: "getStartDate",
        startData: r[1]
      }, i.endTime = {
        data: r[2]
      };
      break;
  }
  return i;
};
let Ye, Xt, G = [];
const er = {}, _s = function(t, e) {
  const n = {
    section: At,
    type: At,
    processed: !1,
    manualEndTime: !1,
    renderEndTime: null,
    raw: { data: e },
    task: t,
    classes: []
  }, r = Ss(Xt, e);
  n.raw.startTime = r.startTime, n.raw.endTime = r.endTime, n.id = r.id, n.prevTaskId = Xt, n.active = r.active, n.done = r.done, n.crit = r.crit, n.milestone = r.milestone, n.order = Ae, Ae++;
  const i = G.push(n);
  Xt = n.id, er[n.id] = i - 1;
}, Ft = function(t) {
  const e = er[t];
  return G[e];
}, As = function(t, e) {
  const n = {
    section: At,
    type: At,
    description: t,
    task: t,
    classes: []
  }, r = Cs(Ye, e);
  n.startTime = r.startTime, n.endTime = r.endTime, n.id = r.id, n.active = r.active, n.done = r.done, n.crit = r.crit, n.milestone = r.milestone, Ye = n, ae.push(n);
}, gn = function() {
  const t = function(n) {
    const r = G[n];
    let i = "";
    switch (G[n].raw.startTime.type) {
      case "prevTaskEnd": {
        const a = Ft(r.prevTaskId);
        r.startTime = a.endTime;
        break;
      }
      case "getStartDate":
        i = Fe(void 0, ct, G[n].raw.startTime.startData), i && (G[n].startTime = i);
        break;
    }
    return G[n].startTime && (G[n].endTime = tr(
      G[n].startTime,
      ct,
      G[n].raw.endTime.data,
      Pt
    ), G[n].endTime && (G[n].processed = !0, G[n].manualEndTime = rt(
      G[n].raw.endTime.data,
      "YYYY-MM-DD",
      !0
    ).isValid(), Jn(G[n], ct, Ot, zt))), G[n].processed;
  };
  let e = !0;
  for (const [n, r] of G.entries())
    t(n), e = e && r.processed;
  return e;
}, Fs = function(t, e) {
  let n = e;
  xt().securityLevel !== "loose" && (n = Tr(e)), t.split(",").forEach(function(r) {
    Ft(r) !== void 0 && (rr(r, () => {
      window.open(n, "_self");
    }), He[r] = n);
  }), nr(t, "clickable");
}, nr = function(t, e) {
  t.split(",").forEach(function(n) {
    let r = Ft(n);
    r !== void 0 && r.classes.push(e);
  });
}, Ys = function(t, e, n) {
  if (xt().securityLevel !== "loose" || e === void 0)
    return;
  let r = [];
  if (typeof n == "string") {
    r = n.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    for (let a = 0; a < r.length; a++) {
      let s = r[a].trim();
      s.charAt(0) === '"' && s.charAt(s.length - 1) === '"' && (s = s.substr(1, s.length - 2)), r[a] = s;
    }
  }
  r.length === 0 && r.push(t), Ft(t) !== void 0 && rr(t, () => {
    xr.runFunc(e, ...r);
  });
}, rr = function(t, e) {
  Be.push(
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
}, Ls = function(t, e, n) {
  t.split(",").forEach(function(r) {
    Ys(r, e, n);
  }), nr(t, "clickable");
}, Us = function(t) {
  Be.forEach(function(e) {
    e(t);
  });
}, Es = {
  parseDirective: es,
  getConfig: () => xt().gantt,
  clear: ns,
  setDateFormat: us,
  getDateFormat: ys,
  enableInclusiveEndDates: ls,
  endDatesAreInclusive: fs,
  enableTopAxis: hs,
  topAxisEnabled: ds,
  setAxisFormat: rs,
  getAxisFormat: is,
  setTickInterval: as,
  getTickInterval: ss,
  setTodayMarker: os,
  getTodayMarker: cs,
  setAccTitle: hr,
  getAccTitle: dr,
  setDiagramTitle: mr,
  getDiagramTitle: gr,
  setDisplayMode: ms,
  getDisplayMode: gs,
  setAccDescription: yr,
  getAccDescription: kr,
  addSection: bs,
  getSections: Ms,
  getTasks: ws,
  addTask: _s,
  findTaskById: Ft,
  addTaskOrg: As,
  setIncludes: ks,
  getIncludes: ps,
  setExcludes: vs,
  getExcludes: Ts,
  setClickEvent: Ls,
  setLink: Fs,
  getLinks: xs,
  bindFunctions: Us,
  parseDuration: Kn,
  isInvalidDate: Qn
};
function ir(t, e, n) {
  let r = !0;
  for (; r; )
    r = !1, n.forEach(function(i) {
      const a = "^\\s*" + i + "\\s*$", s = new RegExp(a);
      t[0].match(s) && (e[i] = !0, t.shift(1), r = !0);
    });
}
const Is = function() {
  Te.debug("Something is calling, setConf, remove the call");
}, Ns = (t, e) => {
  let n = [...t].map(() => -1 / 0), r = [...t].sort((a, s) => a.startTime - s.startTime || a.order - s.order), i = 0;
  for (const a of r)
    for (let s = 0; s < n.length; s++)
      if (a.startTime >= n[s]) {
        n[s] = a.endTime, a.order = s + e, s > i && (i = s);
        break;
      }
  return i;
};
let lt;
const Ws = function(t, e, n, r) {
  const i = xt().gantt, a = xt().securityLevel;
  let s;
  a === "sandbox" && (s = Ht("#i" + e));
  const c = a === "sandbox" ? Ht(s.nodes()[0].contentDocument.body) : Ht("body"), f = a === "sandbox" ? s.nodes()[0].contentDocument : document, h = f.getElementById(e);
  lt = h.parentElement.offsetWidth, lt === void 0 && (lt = 1200), i.useWidth !== void 0 && (lt = i.useWidth);
  const k = r.db.getTasks();
  let p = [];
  for (const w of k)
    p.push(w.type);
  p = W(p);
  const v = {};
  let x = 2 * i.topPadding;
  if (r.db.getDisplayMode() === "compact" || i.displayMode === "compact") {
    const w = {};
    for (const y of k)
      w[y.section] === void 0 ? w[y.section] = [y] : w[y.section].push(y);
    let d = 0;
    for (const y of Object.keys(w)) {
      const u = Ns(w[y], d) + 1;
      d += u, x += u * (i.barHeight + i.barGap), v[y] = u;
    }
  } else {
    x += k.length * (i.barHeight + i.barGap);
    for (const w of p)
      v[w] = k.filter((d) => d.type === w).length;
  }
  h.setAttribute("viewBox", "0 0 " + lt + " " + x);
  const _ = c.select(`[id="${e}"]`), C = Ia().domain([
    Lr(k, function(w) {
      return w.startTime;
    }),
    Yr(k, function(w) {
      return w.endTime;
    })
  ]).rangeRound([0, lt - i.leftPadding - i.rightPadding]);
  function P(w, d) {
    const y = w.startTime, u = d.startTime;
    let l = 0;
    return y > u ? l = 1 : y < u && (l = -1), l;
  }
  k.sort(P), H(k, lt, x), br(_, x, lt, i.useMaxWidth), _.append("text").text(r.db.getDiagramTitle()).attr("x", lt / 2).attr("y", i.titleTopMargin).attr("class", "titleText");
  function H(w, d, y) {
    const u = i.barHeight, l = u + i.barGap, M = i.topPadding, o = i.leftPadding, E = In().domain([0, p.length]).range(["#00B9FA", "#F95002"]).interpolate(Kr);
    O(
      l,
      M,
      o,
      d,
      y,
      w,
      r.db.getExcludes(),
      r.db.getIncludes()
    ), V(o, M, d, y), B(w, l, M, o, u, E, d), N(l, M), D(o, M, d, y);
  }
  function B(w, d, y, u, l, M, o) {
    const g = [...new Set(w.map((T) => T.order))].map((T) => w.find((A) => A.order === T));
    _.append("g").selectAll("rect").data(g).enter().append("rect").attr("x", 0).attr("y", function(T, A) {
      return A = T.order, A * d + y - 2;
    }).attr("width", function() {
      return o - i.rightPadding / 2;
    }).attr("height", d).attr("class", function(T) {
      for (const [A, F] of p.entries())
        if (T.type === F)
          return "section section" + A % i.numberSectionStyles;
      return "section section0";
    });
    const Z = _.append("g").selectAll("rect").data(w).enter(), j = r.db.getLinks();
    if (Z.append("rect").attr("id", function(T) {
      return T.id;
    }).attr("rx", 3).attr("ry", 3).attr("x", function(T) {
      return T.milestone ? C(T.startTime) + u + 0.5 * (C(T.endTime) - C(T.startTime)) - 0.5 * l : C(T.startTime) + u;
    }).attr("y", function(T, A) {
      return A = T.order, A * d + y;
    }).attr("width", function(T) {
      return T.milestone ? l : C(T.renderEndTime || T.endTime) - C(T.startTime);
    }).attr("height", l).attr("transform-origin", function(T, A) {
      return A = T.order, (C(T.startTime) + u + 0.5 * (C(T.endTime) - C(T.startTime))).toString() + "px " + (A * d + y + 0.5 * l).toString() + "px";
    }).attr("class", function(T) {
      const A = "task";
      let F = "";
      T.classes.length > 0 && (F = T.classes.join(" "));
      let Y = 0;
      for (const [q, R] of p.entries())
        T.type === R && (Y = q % i.numberSectionStyles);
      let I = "";
      return T.active ? T.crit ? I += " activeCrit" : I = " active" : T.done ? T.crit ? I = " doneCrit" : I = " done" : T.crit && (I += " crit"), I.length === 0 && (I = " task"), T.milestone && (I = " milestone " + I), I += Y, I += " " + F, A + I;
    }), Z.append("text").attr("id", function(T) {
      return T.id + "-text";
    }).text(function(T) {
      return T.task;
    }).attr("font-size", i.fontSize).attr("x", function(T) {
      let A = C(T.startTime), F = C(T.renderEndTime || T.endTime);
      T.milestone && (A += 0.5 * (C(T.endTime) - C(T.startTime)) - 0.5 * l), T.milestone && (F = A + l);
      const Y = this.getBBox().width;
      return Y > F - A ? F + Y + 1.5 * i.leftPadding > o ? A + u - 5 : F + u + 5 : (F - A) / 2 + A + u;
    }).attr("y", function(T, A) {
      return A = T.order, A * d + i.barHeight / 2 + (i.fontSize / 2 - 2) + y;
    }).attr("text-height", l).attr("class", function(T) {
      const A = C(T.startTime);
      let F = C(T.endTime);
      T.milestone && (F = A + l);
      const Y = this.getBBox().width;
      let I = "";
      T.classes.length > 0 && (I = T.classes.join(" "));
      let q = 0;
      for (const [Yt, $] of p.entries())
        T.type === $ && (q = Yt % i.numberSectionStyles);
      let R = "";
      return T.active && (T.crit ? R = "activeCritText" + q : R = "activeText" + q), T.done ? T.crit ? R = R + " doneCritText" + q : R = R + " doneText" + q : T.crit && (R = R + " critText" + q), T.milestone && (R += " milestoneText"), Y > F - A ? F + Y + 1.5 * i.leftPadding > o ? I + " taskTextOutsideLeft taskTextOutside" + q + " " + R : I + " taskTextOutsideRight taskTextOutside" + q + " " + R + " width-" + Y : I + " taskText taskText" + q + " " + R + " width-" + Y;
    }), xt().securityLevel === "sandbox") {
      let T;
      T = Ht("#i" + e);
      const A = T.nodes()[0].contentDocument;
      Z.filter(function(F) {
        return j[F.id] !== void 0;
      }).each(function(F) {
        var Y = A.querySelector("#" + F.id), I = A.querySelector("#" + F.id + "-text");
        const q = Y.parentNode;
        var R = A.createElement("a");
        R.setAttribute("xlink:href", j[F.id]), R.setAttribute("target", "_top"), q.appendChild(R), R.appendChild(Y), R.appendChild(I);
      });
    }
  }
  function O(w, d, y, u, l, M, o, E) {
    const g = M.reduce(
      (Y, { startTime: I }) => Y ? Math.min(Y, I) : I,
      0
    ), Z = M.reduce((Y, { endTime: I }) => Y ? Math.max(Y, I) : I, 0), j = r.db.getDateFormat();
    if (!g || !Z)
      return;
    const K = [];
    let T = null, A = rt(g);
    for (; A.valueOf() <= Z; )
      r.db.isInvalidDate(A, j, o, E) ? T ? T.end = A : T = {
        start: A,
        end: A
      } : T && (K.push(T), T = null), A = A.add(1, "d");
    _.append("g").selectAll("rect").data(K).enter().append("rect").attr("id", function(Y) {
      return "exclude-" + Y.start.format("YYYY-MM-DD");
    }).attr("x", function(Y) {
      return C(Y.start) + y;
    }).attr("y", i.gridLineStartPadding).attr("width", function(Y) {
      const I = Y.end.add(1, "day");
      return C(I) - C(Y.start);
    }).attr("height", l - d - i.gridLineStartPadding).attr("transform-origin", function(Y, I) {
      return (C(Y.start) + y + 0.5 * (C(Y.end) - C(Y.start))).toString() + "px " + (I * w + 0.5 * l).toString() + "px";
    }).attr("class", "exclude-range");
  }
  function V(w, d, y, u) {
    let l = Pr(C).tickSize(-u + d + i.gridLineStartPadding).tickFormat(ie(r.db.getAxisFormat() || i.axisFormat || "%Y-%m-%d"));
    const o = /^([1-9]\d*)(minute|hour|day|week|month)$/.exec(
      r.db.getTickInterval() || i.tickInterval
    );
    if (o !== null) {
      const E = o[1];
      switch (o[2]) {
        case "minute":
          l.ticks(Kt.every(E));
          break;
        case "hour":
          l.ticks(te.every(E));
          break;
        case "day":
          l.ticks(Dt.every(E));
          break;
        case "week":
          l.ticks(Ct.every(E));
          break;
        case "month":
          l.ticks(ne.every(E));
          break;
      }
    }
    if (_.append("g").attr("class", "grid").attr("transform", "translate(" + w + ", " + (u - 50) + ")").call(l).selectAll("text").style("text-anchor", "middle").attr("fill", "#000").attr("stroke", "none").attr("font-size", 10).attr("dy", "1em"), r.db.topAxisEnabled() || i.topAxis) {
      let E = Or(C).tickSize(-u + d + i.gridLineStartPadding).tickFormat(ie(r.db.getAxisFormat() || i.axisFormat || "%Y-%m-%d"));
      if (o !== null) {
        const g = o[1];
        switch (o[2]) {
          case "minute":
            E.ticks(Kt.every(g));
            break;
          case "hour":
            E.ticks(te.every(g));
            break;
          case "day":
            E.ticks(Dt.every(g));
            break;
          case "week":
            E.ticks(Ct.every(g));
            break;
          case "month":
            E.ticks(ne.every(g));
            break;
        }
      }
      _.append("g").attr("class", "grid").attr("transform", "translate(" + w + ", " + d + ")").call(E).selectAll("text").style("text-anchor", "middle").attr("fill", "#000").attr("stroke", "none").attr("font-size", 10);
    }
  }
  function N(w, d) {
    let y = 0;
    const u = Object.keys(v).map((l) => [l, v[l]]);
    _.append("g").selectAll("text").data(u).enter().append(function(l) {
      const M = l[0].split(Mr.lineBreakRegex), o = -(M.length - 1) / 2, E = f.createElementNS("http://www.w3.org/2000/svg", "text");
      E.setAttribute("dy", o + "em");
      for (const [g, Z] of M.entries()) {
        const j = f.createElementNS("http://www.w3.org/2000/svg", "tspan");
        j.setAttribute("alignment-baseline", "central"), j.setAttribute("x", "10"), g > 0 && j.setAttribute("dy", "1em"), j.textContent = Z, E.appendChild(j);
      }
      return E;
    }).attr("x", 10).attr("y", function(l, M) {
      if (M > 0)
        for (let o = 0; o < M; o++)
          return y += u[M - 1][1], l[1] * w / 2 + y * w + d;
      else
        return l[1] * w / 2 + d;
    }).attr("font-size", i.sectionFontSize).attr("class", function(l) {
      for (const [M, o] of p.entries())
        if (l[0] === o)
          return "sectionTitle sectionTitle" + M % i.numberSectionStyles;
      return "sectionTitle";
    });
  }
  function D(w, d, y, u) {
    const l = r.db.getTodayMarker();
    if (l === "off")
      return;
    const M = _.append("g").attr("class", "today"), o = /* @__PURE__ */ new Date(), E = M.append("line");
    E.attr("x1", C(o) + w).attr("x2", C(o) + w).attr("y1", i.titleTopMargin).attr("y2", u - i.titleTopMargin).attr("class", "today"), l !== "" && E.attr("style", l.replace(/,/g, ";"));
  }
  function W(w) {
    const d = {}, y = [];
    for (let u = 0, l = w.length; u < l; ++u)
      Object.prototype.hasOwnProperty.call(d, w[u]) || (d[w[u]] = !0, y.push(w[u]));
    return y;
  }
}, zs = {
  setConf: Is,
  draw: Ws
}, Os = (t) => `
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
`, Ps = Os, Rs = {
  parser: Na,
  db: Es,
  renderer: zs,
  styles: Ps
};
export {
  Rs as diagram
};
