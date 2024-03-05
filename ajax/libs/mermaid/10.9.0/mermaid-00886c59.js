function mh(t) {
  for (var e = [], i = 1; i < arguments.length; i++)
    e[i - 1] = arguments[i];
  var r = Array.from(typeof t == "string" ? [t] : t);
  r[r.length - 1] = r[r.length - 1].replace(/\r?\n([\t ]*)$/, "");
  var n = r.reduce(function(a, l) {
    var h = l.match(/\n([\t ]+|(?!\s).)/g);
    return h ? a.concat(h.map(function(u) {
      var f, c;
      return (c = (f = u.match(/[\t ]/g)) === null || f === void 0 ? void 0 : f.length) !== null && c !== void 0 ? c : 0;
    })) : a;
  }, []);
  if (n.length) {
    var o = new RegExp(`
[	 ]{` + Math.min.apply(Math, n) + "}", "g");
    r = r.map(function(a) {
      return a.replace(o, `
`);
    });
  }
  r[0] = r[0].replace(/^\r?\n/, "");
  var s = r[0];
  return e.forEach(function(a, l) {
    var h = s.match(/(?:^|\n)( *)$/), u = h ? h[1] : "", f = a;
    typeof a == "string" && a.includes(`
`) && (f = String(a).split(`
`).map(function(c, d) {
      return d === 0 ? c : "" + u + c;
    }).join(`
`)), s += f + r[l + 1];
  }), s;
}
var yh = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function _h(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var Ns = { exports: {} };
(function(t, e) {
  (function(i, r) {
    t.exports = r();
  })(yh, function() {
    var i = 1e3, r = 6e4, n = 36e5, o = "millisecond", s = "second", a = "minute", l = "hour", h = "day", u = "week", f = "month", c = "quarter", d = "year", m = "date", S = "Invalid Date", O = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, z = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, T = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(M) {
      var k = ["th", "st", "nd", "rd"], C = M % 100;
      return "[" + M + (k[(C - 20) % 10] || k[C] || k[0]) + "]";
    } }, R = function(M, k, C) {
      var w = String(M);
      return !w || w.length >= k ? M : "" + Array(k + 1 - w.length).join(C) + M;
    }, X = { s: R, z: function(M) {
      var k = -M.utcOffset(), C = Math.abs(k), w = Math.floor(C / 60), x = C % 60;
      return (k <= 0 ? "+" : "-") + R(w, 2, "0") + ":" + R(x, 2, "0");
    }, m: function M(k, C) {
      if (k.date() < C.date())
        return -M(C, k);
      var w = 12 * (C.year() - k.year()) + (C.month() - k.month()), x = k.clone().add(w, f), b = C - x < 0, D = k.clone().add(w + (b ? -1 : 1), f);
      return +(-(w + (C - x) / (b ? x - D : D - x)) || 0);
    }, a: function(M) {
      return M < 0 ? Math.ceil(M) || 0 : Math.floor(M);
    }, p: function(M) {
      return { M: f, y: d, w: u, d: h, D: m, h: l, m: a, s, ms: o, Q: c }[M] || String(M || "").toLowerCase().replace(/s$/, "");
    }, u: function(M) {
      return M === void 0;
    } }, G = "en", V = {};
    V[G] = T;
    var H = "$isDayjsObject", oe = function(M) {
      return M instanceof Ct || !(!M || !M[H]);
    }, Kt = function M(k, C, w) {
      var x;
      if (!k)
        return G;
      if (typeof k == "string") {
        var b = k.toLowerCase();
        V[b] && (x = b), C && (V[b] = C, x = b);
        var D = k.split("-");
        if (!x && D.length > 1)
          return M(D[0]);
      } else {
        var I = k.name;
        V[I] = k, x = I;
      }
      return !w && x && (G = x), x || !w && G;
    }, P = function(M, k) {
      if (oe(M))
        return M.clone();
      var C = typeof k == "object" ? k : {};
      return C.date = M, C.args = arguments, new Ct(C);
    }, W = X;
    W.l = Kt, W.i = oe, W.w = function(M, k) {
      return P(M, { locale: k.$L, utc: k.$u, x: k.$x, $offset: k.$offset });
    };
    var Ct = function() {
      function M(C) {
        this.$L = Kt(C.locale, null, !0), this.parse(C), this.$x = this.$x || C.x || {}, this[H] = !0;
      }
      var k = M.prototype;
      return k.parse = function(C) {
        this.$d = function(w) {
          var x = w.date, b = w.utc;
          if (x === null)
            return /* @__PURE__ */ new Date(NaN);
          if (W.u(x))
            return /* @__PURE__ */ new Date();
          if (x instanceof Date)
            return new Date(x);
          if (typeof x == "string" && !/Z$/i.test(x)) {
            var D = x.match(O);
            if (D) {
              var I = D[2] - 1 || 0, Y = (D[7] || "0").substring(0, 3);
              return b ? new Date(Date.UTC(D[1], I, D[3] || 1, D[4] || 0, D[5] || 0, D[6] || 0, Y)) : new Date(D[1], I, D[3] || 1, D[4] || 0, D[5] || 0, D[6] || 0, Y);
            }
          }
          return new Date(x);
        }(C), this.init();
      }, k.init = function() {
        var C = this.$d;
        this.$y = C.getFullYear(), this.$M = C.getMonth(), this.$D = C.getDate(), this.$W = C.getDay(), this.$H = C.getHours(), this.$m = C.getMinutes(), this.$s = C.getSeconds(), this.$ms = C.getMilliseconds();
      }, k.$utils = function() {
        return W;
      }, k.isValid = function() {
        return this.$d.toString() !== S;
      }, k.isSame = function(C, w) {
        var x = P(C);
        return this.startOf(w) <= x && x <= this.endOf(w);
      }, k.isAfter = function(C, w) {
        return P(C) < this.startOf(w);
      }, k.isBefore = function(C, w) {
        return this.endOf(w) < P(C);
      }, k.$g = function(C, w, x) {
        return W.u(C) ? this[w] : this.set(x, C);
      }, k.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, k.valueOf = function() {
        return this.$d.getTime();
      }, k.startOf = function(C, w) {
        var x = this, b = !!W.u(w) || w, D = W.p(C), I = function(Lt, Z) {
          var it = W.w(x.$u ? Date.UTC(x.$y, Z, Lt) : new Date(x.$y, Z, Lt), x);
          return b ? it : it.endOf(h);
        }, Y = function(Lt, Z) {
          return W.w(x.toDate()[Lt].apply(x.toDate("s"), (b ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(Z)), x);
        }, N = this.$W, K = this.$M, et = this.$D, Rt = "set" + (this.$u ? "UTC" : "");
        switch (D) {
          case d:
            return b ? I(1, 0) : I(31, 11);
          case f:
            return b ? I(1, K) : I(0, K + 1);
          case u:
            var St = this.$locale().weekStart || 0, Zt = (N < St ? N + 7 : N) - St;
            return I(b ? et - Zt : et + (6 - Zt), K);
          case h:
          case m:
            return Y(Rt + "Hours", 0);
          case l:
            return Y(Rt + "Minutes", 1);
          case a:
            return Y(Rt + "Seconds", 2);
          case s:
            return Y(Rt + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, k.endOf = function(C) {
        return this.startOf(C, !1);
      }, k.$set = function(C, w) {
        var x, b = W.p(C), D = "set" + (this.$u ? "UTC" : ""), I = (x = {}, x[h] = D + "Date", x[m] = D + "Date", x[f] = D + "Month", x[d] = D + "FullYear", x[l] = D + "Hours", x[a] = D + "Minutes", x[s] = D + "Seconds", x[o] = D + "Milliseconds", x)[b], Y = b === h ? this.$D + (w - this.$W) : w;
        if (b === f || b === d) {
          var N = this.clone().set(m, 1);
          N.$d[I](Y), N.init(), this.$d = N.set(m, Math.min(this.$D, N.daysInMonth())).$d;
        } else
          I && this.$d[I](Y);
        return this.init(), this;
      }, k.set = function(C, w) {
        return this.clone().$set(C, w);
      }, k.get = function(C) {
        return this[W.p(C)]();
      }, k.add = function(C, w) {
        var x, b = this;
        C = Number(C);
        var D = W.p(w), I = function(K) {
          var et = P(b);
          return W.w(et.date(et.date() + Math.round(K * C)), b);
        };
        if (D === f)
          return this.set(f, this.$M + C);
        if (D === d)
          return this.set(d, this.$y + C);
        if (D === h)
          return I(1);
        if (D === u)
          return I(7);
        var Y = (x = {}, x[a] = r, x[l] = n, x[s] = i, x)[D] || 1, N = this.$d.getTime() + C * Y;
        return W.w(N, this);
      }, k.subtract = function(C, w) {
        return this.add(-1 * C, w);
      }, k.format = function(C) {
        var w = this, x = this.$locale();
        if (!this.isValid())
          return x.invalidDate || S;
        var b = C || "YYYY-MM-DDTHH:mm:ssZ", D = W.z(this), I = this.$H, Y = this.$m, N = this.$M, K = x.weekdays, et = x.months, Rt = x.meridiem, St = function(Z, it, Pt, Jt) {
          return Z && (Z[it] || Z(w, b)) || Pt[it].slice(0, Jt);
        }, Zt = function(Z) {
          return W.s(I % 12 || 12, Z, "0");
        }, Lt = Rt || function(Z, it, Pt) {
          var Jt = Z < 12 ? "AM" : "PM";
          return Pt ? Jt.toLowerCase() : Jt;
        };
        return b.replace(z, function(Z, it) {
          return it || function(Pt) {
            switch (Pt) {
              case "YY":
                return String(w.$y).slice(-2);
              case "YYYY":
                return W.s(w.$y, 4, "0");
              case "M":
                return N + 1;
              case "MM":
                return W.s(N + 1, 2, "0");
              case "MMM":
                return St(x.monthsShort, N, et, 3);
              case "MMMM":
                return St(et, N);
              case "D":
                return w.$D;
              case "DD":
                return W.s(w.$D, 2, "0");
              case "d":
                return String(w.$W);
              case "dd":
                return St(x.weekdaysMin, w.$W, K, 2);
              case "ddd":
                return St(x.weekdaysShort, w.$W, K, 3);
              case "dddd":
                return K[w.$W];
              case "H":
                return String(I);
              case "HH":
                return W.s(I, 2, "0");
              case "h":
                return Zt(1);
              case "hh":
                return Zt(2);
              case "a":
                return Lt(I, Y, !0);
              case "A":
                return Lt(I, Y, !1);
              case "m":
                return String(Y);
              case "mm":
                return W.s(Y, 2, "0");
              case "s":
                return String(w.$s);
              case "ss":
                return W.s(w.$s, 2, "0");
              case "SSS":
                return W.s(w.$ms, 3, "0");
              case "Z":
                return D;
            }
            return null;
          }(Z) || D.replace(":", "");
        });
      }, k.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, k.diff = function(C, w, x) {
        var b, D = this, I = W.p(w), Y = P(C), N = (Y.utcOffset() - this.utcOffset()) * r, K = this - Y, et = function() {
          return W.m(D, Y);
        };
        switch (I) {
          case d:
            b = et() / 12;
            break;
          case f:
            b = et();
            break;
          case c:
            b = et() / 3;
            break;
          case u:
            b = (K - N) / 6048e5;
            break;
          case h:
            b = (K - N) / 864e5;
            break;
          case l:
            b = K / n;
            break;
          case a:
            b = K / r;
            break;
          case s:
            b = K / i;
            break;
          default:
            b = K;
        }
        return x ? b : W.a(b);
      }, k.daysInMonth = function() {
        return this.endOf(f).$D;
      }, k.$locale = function() {
        return V[this.$L];
      }, k.locale = function(C, w) {
        if (!C)
          return this.$L;
        var x = this.clone(), b = Kt(C, w, !0);
        return b && (x.$L = b), x;
      }, k.clone = function() {
        return W.w(this.$d, this);
      }, k.toDate = function() {
        return new Date(this.valueOf());
      }, k.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, k.toISOString = function() {
        return this.$d.toISOString();
      }, k.toString = function() {
        return this.$d.toUTCString();
      }, M;
    }(), Nt = Ct.prototype;
    return P.prototype = Nt, [["$ms", o], ["$s", s], ["$m", a], ["$H", l], ["$W", h], ["$M", f], ["$y", d], ["$D", m]].forEach(function(M) {
      Nt[M[1]] = function(k) {
        return this.$g(k, M[0], M[1]);
      };
    }), P.extend = function(M, k) {
      return M.$i || (M(k, Ct, P), M.$i = !0), P;
    }, P.locale = Kt, P.isDayjs = oe, P.unix = function(M) {
      return P(1e3 * M);
    }, P.en = V[G], P.Ls = V, P.p = {}, P;
  });
})(Ns);
var Ch = Ns.exports;
const xh = /* @__PURE__ */ _h(Ch), Wt = {
  trace: 0,
  debug: 1,
  info: 2,
  warn: 3,
  error: 4,
  fatal: 5
}, L = {
  trace: (...t) => {
  },
  debug: (...t) => {
  },
  info: (...t) => {
  },
  warn: (...t) => {
  },
  error: (...t) => {
  },
  fatal: (...t) => {
  }
}, bn = function(t = "fatal") {
  let e = Wt.fatal;
  typeof t == "string" ? (t = t.toLowerCase(), t in Wt && (e = Wt[t])) : typeof t == "number" && (e = t), L.trace = () => {
  }, L.debug = () => {
  }, L.info = () => {
  }, L.warn = () => {
  }, L.error = () => {
  }, L.fatal = () => {
  }, e <= Wt.fatal && (L.fatal = console.error ? console.error.bind(console, xt("FATAL"), "color: orange") : console.log.bind(console, "\x1B[35m", xt("FATAL"))), e <= Wt.error && (L.error = console.error ? console.error.bind(console, xt("ERROR"), "color: orange") : console.log.bind(console, "\x1B[31m", xt("ERROR"))), e <= Wt.warn && (L.warn = console.warn ? console.warn.bind(console, xt("WARN"), "color: orange") : console.log.bind(console, "\x1B[33m", xt("WARN"))), e <= Wt.info && (L.info = console.info ? console.info.bind(console, xt("INFO"), "color: lightblue") : console.log.bind(console, "\x1B[34m", xt("INFO"))), e <= Wt.debug && (L.debug = console.debug ? console.debug.bind(console, xt("DEBUG"), "color: lightgreen") : console.log.bind(console, "\x1B[32m", xt("DEBUG"))), e <= Wt.trace && (L.trace = console.debug ? console.debug.bind(console, xt("TRACE"), "color: lightgreen") : console.log.bind(console, "\x1B[32m", xt("TRACE")));
}, xt = (t) => `%c${xh().format("ss.SSS")} : ${t} : `;
var Rs = {};
(function(t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.sanitizeUrl = t.BLANK_URL = void 0;
  var e = /^([^\w]*)(javascript|data|vbscript)/im, i = /&#(\w+)(^\w|;)?/g, r = /&(newline|tab);/gi, n = /[\u0000-\u001F\u007F-\u009F\u2000-\u200D\uFEFF]/gim, o = /^.+(:|&colon;)/gim, s = [".", "/"];
  t.BLANK_URL = "about:blank";
  function a(u) {
    return s.indexOf(u[0]) > -1;
  }
  function l(u) {
    var f = u.replace(n, "");
    return f.replace(i, function(c, d) {
      return String.fromCharCode(d);
    });
  }
  function h(u) {
    if (!u)
      return t.BLANK_URL;
    var f = l(u).replace(r, "").replace(n, "").trim();
    if (!f)
      return t.BLANK_URL;
    if (a(f))
      return f;
    var c = f.match(o);
    if (!c)
      return f;
    var d = c[0];
    return e.test(d) ? t.BLANK_URL : f;
  }
  t.sanitizeUrl = h;
})(Rs);
var bh = { value: () => {
} };
function Ps() {
  for (var t = 0, e = arguments.length, i = {}, r; t < e; ++t) {
    if (!(r = arguments[t] + "") || r in i || /[\s.]/.test(r))
      throw new Error("illegal type: " + r);
    i[r] = [];
  }
  return new Oi(i);
}
function Oi(t) {
  this._ = t;
}
function Th(t, e) {
  return t.trim().split(/^|\s+/).map(function(i) {
    var r = "", n = i.indexOf(".");
    if (n >= 0 && (r = i.slice(n + 1), i = i.slice(0, n)), i && !e.hasOwnProperty(i))
      throw new Error("unknown type: " + i);
    return { type: i, name: r };
  });
}
Oi.prototype = Ps.prototype = {
  constructor: Oi,
  on: function(t, e) {
    var i = this._, r = Th(t + "", i), n, o = -1, s = r.length;
    if (arguments.length < 2) {
      for (; ++o < s; )
        if ((n = (t = r[o]).type) && (n = kh(i[n], t.name)))
          return n;
      return;
    }
    if (e != null && typeof e != "function")
      throw new Error("invalid callback: " + e);
    for (; ++o < s; )
      if (n = (t = r[o]).type)
        i[n] = To(i[n], t.name, e);
      else if (e == null)
        for (n in i)
          i[n] = To(i[n], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, e = this._;
    for (var i in e)
      t[i] = e[i].slice();
    return new Oi(t);
  },
  call: function(t, e) {
    if ((n = arguments.length - 2) > 0)
      for (var i = new Array(n), r = 0, n, o; r < n; ++r)
        i[r] = arguments[r + 2];
    if (!this._.hasOwnProperty(t))
      throw new Error("unknown type: " + t);
    for (o = this._[t], r = 0, n = o.length; r < n; ++r)
      o[r].value.apply(e, i);
  },
  apply: function(t, e, i) {
    if (!this._.hasOwnProperty(t))
      throw new Error("unknown type: " + t);
    for (var r = this._[t], n = 0, o = r.length; n < o; ++n)
      r[n].value.apply(e, i);
  }
};
function kh(t, e) {
  for (var i = 0, r = t.length, n; i < r; ++i)
    if ((n = t[i]).name === e)
      return n.value;
}
function To(t, e, i) {
  for (var r = 0, n = t.length; r < n; ++r)
    if (t[r].name === e) {
      t[r] = bh, t = t.slice(0, r).concat(t.slice(r + 1));
      break;
    }
  return i != null && t.push({ name: e, value: i }), t;
}
var Jr = "http://www.w3.org/1999/xhtml";
const ko = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Jr,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function fr(t) {
  var e = t += "", i = e.indexOf(":");
  return i >= 0 && (e = t.slice(0, i)) !== "xmlns" && (t = t.slice(i + 1)), ko.hasOwnProperty(e) ? { space: ko[e], local: t } : t;
}
function Sh(t) {
  return function() {
    var e = this.ownerDocument, i = this.namespaceURI;
    return i === Jr && e.documentElement.namespaceURI === Jr ? e.createElement(t) : e.createElementNS(i, t);
  };
}
function vh(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function qs(t) {
  var e = fr(t);
  return (e.local ? vh : Sh)(e);
}
function wh() {
}
function Tn(t) {
  return t == null ? wh : function() {
    return this.querySelector(t);
  };
}
function Bh(t) {
  typeof t != "function" && (t = Tn(t));
  for (var e = this._groups, i = e.length, r = new Array(i), n = 0; n < i; ++n)
    for (var o = e[n], s = o.length, a = r[n] = new Array(s), l, h, u = 0; u < s; ++u)
      (l = o[u]) && (h = t.call(l, l.__data__, u, o)) && ("__data__" in l && (h.__data__ = l.__data__), a[u] = h);
  return new yt(r, this._parents);
}
function Fh(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function Ah() {
  return [];
}
function zs(t) {
  return t == null ? Ah : function() {
    return this.querySelectorAll(t);
  };
}
function Lh(t) {
  return function() {
    return Fh(t.apply(this, arguments));
  };
}
function Eh(t) {
  typeof t == "function" ? t = Lh(t) : t = zs(t);
  for (var e = this._groups, i = e.length, r = [], n = [], o = 0; o < i; ++o)
    for (var s = e[o], a = s.length, l, h = 0; h < a; ++h)
      (l = s[h]) && (r.push(t.call(l, l.__data__, h, s)), n.push(l));
  return new yt(r, n);
}
function Ws(t) {
  return function() {
    return this.matches(t);
  };
}
function Hs(t) {
  return function(e) {
    return e.matches(t);
  };
}
var Mh = Array.prototype.find;
function Oh(t) {
  return function() {
    return Mh.call(this.children, t);
  };
}
function $h() {
  return this.firstElementChild;
}
function Ih(t) {
  return this.select(t == null ? $h : Oh(typeof t == "function" ? t : Hs(t)));
}
var Dh = Array.prototype.filter;
function Nh() {
  return Array.from(this.children);
}
function Rh(t) {
  return function() {
    return Dh.call(this.children, t);
  };
}
function Ph(t) {
  return this.selectAll(t == null ? Nh : Rh(typeof t == "function" ? t : Hs(t)));
}
function qh(t) {
  typeof t != "function" && (t = Ws(t));
  for (var e = this._groups, i = e.length, r = new Array(i), n = 0; n < i; ++n)
    for (var o = e[n], s = o.length, a = r[n] = [], l, h = 0; h < s; ++h)
      (l = o[h]) && t.call(l, l.__data__, h, o) && a.push(l);
  return new yt(r, this._parents);
}
function js(t) {
  return new Array(t.length);
}
function zh() {
  return new yt(this._enter || this._groups.map(js), this._parents);
}
function ji(t, e) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = e;
}
ji.prototype = {
  constructor: ji,
  appendChild: function(t) {
    return this._parent.insertBefore(t, this._next);
  },
  insertBefore: function(t, e) {
    return this._parent.insertBefore(t, e);
  },
  querySelector: function(t) {
    return this._parent.querySelector(t);
  },
  querySelectorAll: function(t) {
    return this._parent.querySelectorAll(t);
  }
};
function Wh(t) {
  return function() {
    return t;
  };
}
function Hh(t, e, i, r, n, o) {
  for (var s = 0, a, l = e.length, h = o.length; s < h; ++s)
    (a = e[s]) ? (a.__data__ = o[s], r[s] = a) : i[s] = new ji(t, o[s]);
  for (; s < l; ++s)
    (a = e[s]) && (n[s] = a);
}
function jh(t, e, i, r, n, o, s) {
  var a, l, h = /* @__PURE__ */ new Map(), u = e.length, f = o.length, c = new Array(u), d;
  for (a = 0; a < u; ++a)
    (l = e[a]) && (c[a] = d = s.call(l, l.__data__, a, e) + "", h.has(d) ? n[a] = l : h.set(d, l));
  for (a = 0; a < f; ++a)
    d = s.call(t, o[a], a, o) + "", (l = h.get(d)) ? (r[a] = l, l.__data__ = o[a], h.delete(d)) : i[a] = new ji(t, o[a]);
  for (a = 0; a < u; ++a)
    (l = e[a]) && h.get(c[a]) === l && (n[a] = l);
}
function Uh(t) {
  return t.__data__;
}
function Yh(t, e) {
  if (!arguments.length)
    return Array.from(this, Uh);
  var i = e ? jh : Hh, r = this._parents, n = this._groups;
  typeof t != "function" && (t = Wh(t));
  for (var o = n.length, s = new Array(o), a = new Array(o), l = new Array(o), h = 0; h < o; ++h) {
    var u = r[h], f = n[h], c = f.length, d = Gh(t.call(u, u && u.__data__, h, r)), m = d.length, S = a[h] = new Array(m), O = s[h] = new Array(m), z = l[h] = new Array(c);
    i(u, f, S, O, z, d, e);
    for (var T = 0, R = 0, X, G; T < m; ++T)
      if (X = S[T]) {
        for (T >= R && (R = T + 1); !(G = O[R]) && ++R < m; )
          ;
        X._next = G || null;
      }
  }
  return s = new yt(s, r), s._enter = a, s._exit = l, s;
}
function Gh(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function Vh() {
  return new yt(this._exit || this._groups.map(js), this._parents);
}
function Xh(t, e, i) {
  var r = this.enter(), n = this, o = this.exit();
  return typeof t == "function" ? (r = t(r), r && (r = r.selection())) : r = r.append(t + ""), e != null && (n = e(n), n && (n = n.selection())), i == null ? o.remove() : i(o), r && n ? r.merge(n).order() : n;
}
function Kh(t) {
  for (var e = t.selection ? t.selection() : t, i = this._groups, r = e._groups, n = i.length, o = r.length, s = Math.min(n, o), a = new Array(n), l = 0; l < s; ++l)
    for (var h = i[l], u = r[l], f = h.length, c = a[l] = new Array(f), d, m = 0; m < f; ++m)
      (d = h[m] || u[m]) && (c[m] = d);
  for (; l < n; ++l)
    a[l] = i[l];
  return new yt(a, this._parents);
}
function Zh() {
  for (var t = this._groups, e = -1, i = t.length; ++e < i; )
    for (var r = t[e], n = r.length - 1, o = r[n], s; --n >= 0; )
      (s = r[n]) && (o && s.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(s, o), o = s);
  return this;
}
function Jh(t) {
  t || (t = Qh);
  function e(f, c) {
    return f && c ? t(f.__data__, c.__data__) : !f - !c;
  }
  for (var i = this._groups, r = i.length, n = new Array(r), o = 0; o < r; ++o) {
    for (var s = i[o], a = s.length, l = n[o] = new Array(a), h, u = 0; u < a; ++u)
      (h = s[u]) && (l[u] = h);
    l.sort(e);
  }
  return new yt(n, this._parents).order();
}
function Qh(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function tc() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function ec() {
  return Array.from(this);
}
function ic() {
  for (var t = this._groups, e = 0, i = t.length; e < i; ++e)
    for (var r = t[e], n = 0, o = r.length; n < o; ++n) {
      var s = r[n];
      if (s)
        return s;
    }
  return null;
}
function rc() {
  let t = 0;
  for (const e of this)
    ++t;
  return t;
}
function nc() {
  return !this.node();
}
function oc(t) {
  for (var e = this._groups, i = 0, r = e.length; i < r; ++i)
    for (var n = e[i], o = 0, s = n.length, a; o < s; ++o)
      (a = n[o]) && t.call(a, a.__data__, o, n);
  return this;
}
function sc(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function ac(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function lc(t, e) {
  return function() {
    this.setAttribute(t, e);
  };
}
function hc(t, e) {
  return function() {
    this.setAttributeNS(t.space, t.local, e);
  };
}
function cc(t, e) {
  return function() {
    var i = e.apply(this, arguments);
    i == null ? this.removeAttribute(t) : this.setAttribute(t, i);
  };
}
function uc(t, e) {
  return function() {
    var i = e.apply(this, arguments);
    i == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, i);
  };
}
function fc(t, e) {
  var i = fr(t);
  if (arguments.length < 2) {
    var r = this.node();
    return i.local ? r.getAttributeNS(i.space, i.local) : r.getAttribute(i);
  }
  return this.each((e == null ? i.local ? ac : sc : typeof e == "function" ? i.local ? uc : cc : i.local ? hc : lc)(i, e));
}
function Us(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function dc(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function pc(t, e, i) {
  return function() {
    this.style.setProperty(t, e, i);
  };
}
function gc(t, e, i) {
  return function() {
    var r = e.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, i);
  };
}
function mc(t, e, i) {
  return arguments.length > 1 ? this.each((e == null ? dc : typeof e == "function" ? gc : pc)(t, e, i ?? "")) : Ae(this.node(), t);
}
function Ae(t, e) {
  return t.style.getPropertyValue(e) || Us(t).getComputedStyle(t, null).getPropertyValue(e);
}
function yc(t) {
  return function() {
    delete this[t];
  };
}
function _c(t, e) {
  return function() {
    this[t] = e;
  };
}
function Cc(t, e) {
  return function() {
    var i = e.apply(this, arguments);
    i == null ? delete this[t] : this[t] = i;
  };
}
function xc(t, e) {
  return arguments.length > 1 ? this.each((e == null ? yc : typeof e == "function" ? Cc : _c)(t, e)) : this.node()[t];
}
function Ys(t) {
  return t.trim().split(/^|\s+/);
}
function kn(t) {
  return t.classList || new Gs(t);
}
function Gs(t) {
  this._node = t, this._names = Ys(t.getAttribute("class") || "");
}
Gs.prototype = {
  add: function(t) {
    var e = this._names.indexOf(t);
    e < 0 && (this._names.push(t), this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function(t) {
    var e = this._names.indexOf(t);
    e >= 0 && (this._names.splice(e, 1), this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function(t) {
    return this._names.indexOf(t) >= 0;
  }
};
function Vs(t, e) {
  for (var i = kn(t), r = -1, n = e.length; ++r < n; )
    i.add(e[r]);
}
function Xs(t, e) {
  for (var i = kn(t), r = -1, n = e.length; ++r < n; )
    i.remove(e[r]);
}
function bc(t) {
  return function() {
    Vs(this, t);
  };
}
function Tc(t) {
  return function() {
    Xs(this, t);
  };
}
function kc(t, e) {
  return function() {
    (e.apply(this, arguments) ? Vs : Xs)(this, t);
  };
}
function Sc(t, e) {
  var i = Ys(t + "");
  if (arguments.length < 2) {
    for (var r = kn(this.node()), n = -1, o = i.length; ++n < o; )
      if (!r.contains(i[n]))
        return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? kc : e ? bc : Tc)(i, e));
}
function vc() {
  this.textContent = "";
}
function wc(t) {
  return function() {
    this.textContent = t;
  };
}
function Bc(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.textContent = e ?? "";
  };
}
function Fc(t) {
  return arguments.length ? this.each(t == null ? vc : (typeof t == "function" ? Bc : wc)(t)) : this.node().textContent;
}
function Ac() {
  this.innerHTML = "";
}
function Lc(t) {
  return function() {
    this.innerHTML = t;
  };
}
function Ec(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function Mc(t) {
  return arguments.length ? this.each(t == null ? Ac : (typeof t == "function" ? Ec : Lc)(t)) : this.node().innerHTML;
}
function Oc() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function $c() {
  return this.each(Oc);
}
function Ic() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Dc() {
  return this.each(Ic);
}
function Nc(t) {
  var e = typeof t == "function" ? t : qs(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function Rc() {
  return null;
}
function Pc(t, e) {
  var i = typeof t == "function" ? t : qs(t), r = e == null ? Rc : typeof e == "function" ? e : Tn(e);
  return this.select(function() {
    return this.insertBefore(i.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function qc() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function zc() {
  return this.each(qc);
}
function Wc() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Hc() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function jc(t) {
  return this.select(t ? Hc : Wc);
}
function Uc(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function Yc(t) {
  return function(e) {
    t.call(this, e, this.__data__);
  };
}
function Gc(t) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var i = "", r = e.indexOf(".");
    return r >= 0 && (i = e.slice(r + 1), e = e.slice(0, r)), { type: e, name: i };
  });
}
function Vc(t) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var i = 0, r = -1, n = e.length, o; i < n; ++i)
        o = e[i], (!t.type || o.type === t.type) && o.name === t.name ? this.removeEventListener(o.type, o.listener, o.options) : e[++r] = o;
      ++r ? e.length = r : delete this.__on;
    }
  };
}
function Xc(t, e, i) {
  return function() {
    var r = this.__on, n, o = Yc(e);
    if (r) {
      for (var s = 0, a = r.length; s < a; ++s)
        if ((n = r[s]).type === t.type && n.name === t.name) {
          this.removeEventListener(n.type, n.listener, n.options), this.addEventListener(n.type, n.listener = o, n.options = i), n.value = e;
          return;
        }
    }
    this.addEventListener(t.type, o, i), n = { type: t.type, name: t.name, value: e, listener: o, options: i }, r ? r.push(n) : this.__on = [n];
  };
}
function Kc(t, e, i) {
  var r = Gc(t + ""), n, o = r.length, s;
  if (arguments.length < 2) {
    var a = this.node().__on;
    if (a) {
      for (var l = 0, h = a.length, u; l < h; ++l)
        for (n = 0, u = a[l]; n < o; ++n)
          if ((s = r[n]).type === u.type && s.name === u.name)
            return u.value;
    }
    return;
  }
  for (a = e ? Xc : Vc, n = 0; n < o; ++n)
    this.each(a(r[n], e, i));
  return this;
}
function Ks(t, e, i) {
  var r = Us(t), n = r.CustomEvent;
  typeof n == "function" ? n = new n(e, i) : (n = r.document.createEvent("Event"), i ? (n.initEvent(e, i.bubbles, i.cancelable), n.detail = i.detail) : n.initEvent(e, !1, !1)), t.dispatchEvent(n);
}
function Zc(t, e) {
  return function() {
    return Ks(this, t, e);
  };
}
function Jc(t, e) {
  return function() {
    return Ks(this, t, e.apply(this, arguments));
  };
}
function Qc(t, e) {
  return this.each((typeof e == "function" ? Jc : Zc)(t, e));
}
function* tu() {
  for (var t = this._groups, e = 0, i = t.length; e < i; ++e)
    for (var r = t[e], n = 0, o = r.length, s; n < o; ++n)
      (s = r[n]) && (yield s);
}
var Zs = [null];
function yt(t, e) {
  this._groups = t, this._parents = e;
}
function di() {
  return new yt([[document.documentElement]], Zs);
}
function eu() {
  return this;
}
yt.prototype = di.prototype = {
  constructor: yt,
  select: Bh,
  selectAll: Eh,
  selectChild: Ih,
  selectChildren: Ph,
  filter: qh,
  data: Yh,
  enter: zh,
  exit: Vh,
  join: Xh,
  merge: Kh,
  selection: eu,
  order: Zh,
  sort: Jh,
  call: tc,
  nodes: ec,
  node: ic,
  size: rc,
  empty: nc,
  each: oc,
  attr: fc,
  style: mc,
  property: xc,
  classed: Sc,
  text: Fc,
  html: Mc,
  raise: $c,
  lower: Dc,
  append: Nc,
  insert: Pc,
  remove: zc,
  clone: jc,
  datum: Uc,
  on: Kc,
  dispatch: Qc,
  [Symbol.iterator]: tu
};
function bt(t) {
  return typeof t == "string" ? new yt([[document.querySelector(t)]], [document.documentElement]) : new yt([[t]], Zs);
}
function Sn(t, e, i) {
  t.prototype = e.prototype = i, i.constructor = t;
}
function Js(t, e) {
  var i = Object.create(t.prototype);
  for (var r in e)
    i[r] = e[r];
  return i;
}
function pi() {
}
var ri = 0.7, Ui = 1 / ri, Fe = "\\s*([+-]?\\d+)\\s*", ni = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Et = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", iu = /^#([0-9a-f]{3,8})$/, ru = new RegExp(`^rgb\\(${Fe},${Fe},${Fe}\\)$`), nu = new RegExp(`^rgb\\(${Et},${Et},${Et}\\)$`), ou = new RegExp(`^rgba\\(${Fe},${Fe},${Fe},${ni}\\)$`), su = new RegExp(`^rgba\\(${Et},${Et},${Et},${ni}\\)$`), au = new RegExp(`^hsl\\(${ni},${Et},${Et}\\)$`), lu = new RegExp(`^hsla\\(${ni},${Et},${Et},${ni}\\)$`), So = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
Sn(pi, oi, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: vo,
  // Deprecated! Use color.formatHex.
  formatHex: vo,
  formatHex8: hu,
  formatHsl: cu,
  formatRgb: wo,
  toString: wo
});
function vo() {
  return this.rgb().formatHex();
}
function hu() {
  return this.rgb().formatHex8();
}
function cu() {
  return Qs(this).formatHsl();
}
function wo() {
  return this.rgb().formatRgb();
}
function oi(t) {
  var e, i;
  return t = (t + "").trim().toLowerCase(), (e = iu.exec(t)) ? (i = e[1].length, e = parseInt(e[1], 16), i === 6 ? Bo(e) : i === 3 ? new pt(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : i === 8 ? ki(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : i === 4 ? ki(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = ru.exec(t)) ? new pt(e[1], e[2], e[3], 1) : (e = nu.exec(t)) ? new pt(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = ou.exec(t)) ? ki(e[1], e[2], e[3], e[4]) : (e = su.exec(t)) ? ki(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = au.exec(t)) ? Lo(e[1], e[2] / 100, e[3] / 100, 1) : (e = lu.exec(t)) ? Lo(e[1], e[2] / 100, e[3] / 100, e[4]) : So.hasOwnProperty(t) ? Bo(So[t]) : t === "transparent" ? new pt(NaN, NaN, NaN, 0) : null;
}
function Bo(t) {
  return new pt(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function ki(t, e, i, r) {
  return r <= 0 && (t = e = i = NaN), new pt(t, e, i, r);
}
function uu(t) {
  return t instanceof pi || (t = oi(t)), t ? (t = t.rgb(), new pt(t.r, t.g, t.b, t.opacity)) : new pt();
}
function Qr(t, e, i, r) {
  return arguments.length === 1 ? uu(t) : new pt(t, e, i, r ?? 1);
}
function pt(t, e, i, r) {
  this.r = +t, this.g = +e, this.b = +i, this.opacity = +r;
}
Sn(pt, Qr, Js(pi, {
  brighter(t) {
    return t = t == null ? Ui : Math.pow(Ui, t), new pt(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? ri : Math.pow(ri, t), new pt(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new pt(ue(this.r), ue(this.g), ue(this.b), Yi(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Fo,
  // Deprecated! Use color.formatHex.
  formatHex: Fo,
  formatHex8: fu,
  formatRgb: Ao,
  toString: Ao
}));
function Fo() {
  return `#${ce(this.r)}${ce(this.g)}${ce(this.b)}`;
}
function fu() {
  return `#${ce(this.r)}${ce(this.g)}${ce(this.b)}${ce((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Ao() {
  const t = Yi(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${ue(this.r)}, ${ue(this.g)}, ${ue(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function Yi(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function ue(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function ce(t) {
  return t = ue(t), (t < 16 ? "0" : "") + t.toString(16);
}
function Lo(t, e, i, r) {
  return r <= 0 ? t = e = i = NaN : i <= 0 || i >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new wt(t, e, i, r);
}
function Qs(t) {
  if (t instanceof wt)
    return new wt(t.h, t.s, t.l, t.opacity);
  if (t instanceof pi || (t = oi(t)), !t)
    return new wt();
  if (t instanceof wt)
    return t;
  t = t.rgb();
  var e = t.r / 255, i = t.g / 255, r = t.b / 255, n = Math.min(e, i, r), o = Math.max(e, i, r), s = NaN, a = o - n, l = (o + n) / 2;
  return a ? (e === o ? s = (i - r) / a + (i < r) * 6 : i === o ? s = (r - e) / a + 2 : s = (e - i) / a + 4, a /= l < 0.5 ? o + n : 2 - o - n, s *= 60) : a = l > 0 && l < 1 ? 0 : s, new wt(s, a, l, t.opacity);
}
function du(t, e, i, r) {
  return arguments.length === 1 ? Qs(t) : new wt(t, e, i, r ?? 1);
}
function wt(t, e, i, r) {
  this.h = +t, this.s = +e, this.l = +i, this.opacity = +r;
}
Sn(wt, du, Js(pi, {
  brighter(t) {
    return t = t == null ? Ui : Math.pow(Ui, t), new wt(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? ri : Math.pow(ri, t), new wt(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, e = isNaN(t) || isNaN(this.s) ? 0 : this.s, i = this.l, r = i + (i < 0.5 ? i : 1 - i) * e, n = 2 * i - r;
    return new pt(
      Dr(t >= 240 ? t - 240 : t + 120, n, r),
      Dr(t, n, r),
      Dr(t < 120 ? t + 240 : t - 120, n, r),
      this.opacity
    );
  },
  clamp() {
    return new wt(Eo(this.h), Si(this.s), Si(this.l), Yi(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = Yi(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${Eo(this.h)}, ${Si(this.s) * 100}%, ${Si(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function Eo(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function Si(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function Dr(t, e, i) {
  return (t < 60 ? e + (i - e) * t / 60 : t < 180 ? i : t < 240 ? e + (i - e) * (240 - t) / 60 : e) * 255;
}
const vn = (t) => () => t;
function ta(t, e) {
  return function(i) {
    return t + i * e;
  };
}
function pu(t, e, i) {
  return t = Math.pow(t, i), e = Math.pow(e, i) - t, i = 1 / i, function(r) {
    return Math.pow(t + r * e, i);
  };
}
function l1(t, e) {
  var i = e - t;
  return i ? ta(t, i > 180 || i < -180 ? i - 360 * Math.round(i / 360) : i) : vn(isNaN(t) ? e : t);
}
function gu(t) {
  return (t = +t) == 1 ? ea : function(e, i) {
    return i - e ? pu(e, i, t) : vn(isNaN(e) ? i : e);
  };
}
function ea(t, e) {
  var i = e - t;
  return i ? ta(t, i) : vn(isNaN(t) ? e : t);
}
const Mo = function t(e) {
  var i = gu(e);
  function r(n, o) {
    var s = i((n = Qr(n)).r, (o = Qr(o)).r), a = i(n.g, o.g), l = i(n.b, o.b), h = ea(n.opacity, o.opacity);
    return function(u) {
      return n.r = s(u), n.g = a(u), n.b = l(u), n.opacity = h(u), n + "";
    };
  }
  return r.gamma = t, r;
}(1);
function te(t, e) {
  return t = +t, e = +e, function(i) {
    return t * (1 - i) + e * i;
  };
}
var tn = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Nr = new RegExp(tn.source, "g");
function mu(t) {
  return function() {
    return t;
  };
}
function yu(t) {
  return function(e) {
    return t(e) + "";
  };
}
function _u(t, e) {
  var i = tn.lastIndex = Nr.lastIndex = 0, r, n, o, s = -1, a = [], l = [];
  for (t = t + "", e = e + ""; (r = tn.exec(t)) && (n = Nr.exec(e)); )
    (o = n.index) > i && (o = e.slice(i, o), a[s] ? a[s] += o : a[++s] = o), (r = r[0]) === (n = n[0]) ? a[s] ? a[s] += n : a[++s] = n : (a[++s] = null, l.push({ i: s, x: te(r, n) })), i = Nr.lastIndex;
  return i < e.length && (o = e.slice(i), a[s] ? a[s] += o : a[++s] = o), a.length < 2 ? l[0] ? yu(l[0].x) : mu(e) : (e = l.length, function(h) {
    for (var u = 0, f; u < e; ++u)
      a[(f = l[u]).i] = f.x(h);
    return a.join("");
  });
}
var Oo = 180 / Math.PI, en = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function ia(t, e, i, r, n, o) {
  var s, a, l;
  return (s = Math.sqrt(t * t + e * e)) && (t /= s, e /= s), (l = t * i + e * r) && (i -= t * l, r -= e * l), (a = Math.sqrt(i * i + r * r)) && (i /= a, r /= a, l /= a), t * r < e * i && (t = -t, e = -e, l = -l, s = -s), {
    translateX: n,
    translateY: o,
    rotate: Math.atan2(e, t) * Oo,
    skewX: Math.atan(l) * Oo,
    scaleX: s,
    scaleY: a
  };
}
var vi;
function Cu(t) {
  const e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return e.isIdentity ? en : ia(e.a, e.b, e.c, e.d, e.e, e.f);
}
function xu(t) {
  return t == null || (vi || (vi = document.createElementNS("http://www.w3.org/2000/svg", "g")), vi.setAttribute("transform", t), !(t = vi.transform.baseVal.consolidate())) ? en : (t = t.matrix, ia(t.a, t.b, t.c, t.d, t.e, t.f));
}
function ra(t, e, i, r) {
  function n(h) {
    return h.length ? h.pop() + " " : "";
  }
  function o(h, u, f, c, d, m) {
    if (h !== f || u !== c) {
      var S = d.push("translate(", null, e, null, i);
      m.push({ i: S - 4, x: te(h, f) }, { i: S - 2, x: te(u, c) });
    } else
      (f || c) && d.push("translate(" + f + e + c + i);
  }
  function s(h, u, f, c) {
    h !== u ? (h - u > 180 ? u += 360 : u - h > 180 && (h += 360), c.push({ i: f.push(n(f) + "rotate(", null, r) - 2, x: te(h, u) })) : u && f.push(n(f) + "rotate(" + u + r);
  }
  function a(h, u, f, c) {
    h !== u ? c.push({ i: f.push(n(f) + "skewX(", null, r) - 2, x: te(h, u) }) : u && f.push(n(f) + "skewX(" + u + r);
  }
  function l(h, u, f, c, d, m) {
    if (h !== f || u !== c) {
      var S = d.push(n(d) + "scale(", null, ",", null, ")");
      m.push({ i: S - 4, x: te(h, f) }, { i: S - 2, x: te(u, c) });
    } else
      (f !== 1 || c !== 1) && d.push(n(d) + "scale(" + f + "," + c + ")");
  }
  return function(h, u) {
    var f = [], c = [];
    return h = t(h), u = t(u), o(h.translateX, h.translateY, u.translateX, u.translateY, f, c), s(h.rotate, u.rotate, f, c), a(h.skewX, u.skewX, f, c), l(h.scaleX, h.scaleY, u.scaleX, u.scaleY, f, c), h = u = null, function(d) {
      for (var m = -1, S = c.length, O; ++m < S; )
        f[(O = c[m]).i] = O.x(d);
      return f.join("");
    };
  };
}
var bu = ra(Cu, "px, ", "px)", "deg)"), Tu = ra(xu, ", ", ")", ")"), Le = 0, Ve = 0, He = 0, na = 1e3, Gi, Xe, Vi = 0, pe = 0, dr = 0, si = typeof performance == "object" && performance.now ? performance : Date, oa = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function wn() {
  return pe || (oa(ku), pe = si.now() + dr);
}
function ku() {
  pe = 0;
}
function Xi() {
  this._call = this._time = this._next = null;
}
Xi.prototype = sa.prototype = {
  constructor: Xi,
  restart: function(t, e, i) {
    if (typeof t != "function")
      throw new TypeError("callback is not a function");
    i = (i == null ? wn() : +i) + (e == null ? 0 : +e), !this._next && Xe !== this && (Xe ? Xe._next = this : Gi = this, Xe = this), this._call = t, this._time = i, rn();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, rn());
  }
};
function sa(t, e, i) {
  var r = new Xi();
  return r.restart(t, e, i), r;
}
function Su() {
  wn(), ++Le;
  for (var t = Gi, e; t; )
    (e = pe - t._time) >= 0 && t._call.call(void 0, e), t = t._next;
  --Le;
}
function $o() {
  pe = (Vi = si.now()) + dr, Le = Ve = 0;
  try {
    Su();
  } finally {
    Le = 0, wu(), pe = 0;
  }
}
function vu() {
  var t = si.now(), e = t - Vi;
  e > na && (dr -= e, Vi = t);
}
function wu() {
  for (var t, e = Gi, i, r = 1 / 0; e; )
    e._call ? (r > e._time && (r = e._time), t = e, e = e._next) : (i = e._next, e._next = null, e = t ? t._next = i : Gi = i);
  Xe = t, rn(r);
}
function rn(t) {
  if (!Le) {
    Ve && (Ve = clearTimeout(Ve));
    var e = t - pe;
    e > 24 ? (t < 1 / 0 && (Ve = setTimeout($o, t - si.now() - dr)), He && (He = clearInterval(He))) : (He || (Vi = si.now(), He = setInterval(vu, na)), Le = 1, oa($o));
  }
}
function Io(t, e, i) {
  var r = new Xi();
  return e = e == null ? 0 : +e, r.restart((n) => {
    r.stop(), t(n + e);
  }, e, i), r;
}
var Bu = Ps("start", "end", "cancel", "interrupt"), Fu = [], aa = 0, Do = 1, nn = 2, $i = 3, No = 4, on = 5, Ii = 6;
function pr(t, e, i, r, n, o) {
  var s = t.__transition;
  if (!s)
    t.__transition = {};
  else if (i in s)
    return;
  Au(t, i, {
    name: e,
    index: r,
    // For context during callback.
    group: n,
    // For context during callback.
    on: Bu,
    tween: Fu,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: aa
  });
}
function Bn(t, e) {
  var i = At(t, e);
  if (i.state > aa)
    throw new Error("too late; already scheduled");
  return i;
}
function It(t, e) {
  var i = At(t, e);
  if (i.state > $i)
    throw new Error("too late; already running");
  return i;
}
function At(t, e) {
  var i = t.__transition;
  if (!i || !(i = i[e]))
    throw new Error("transition not found");
  return i;
}
function Au(t, e, i) {
  var r = t.__transition, n;
  r[e] = i, i.timer = sa(o, 0, i.time);
  function o(h) {
    i.state = Do, i.timer.restart(s, i.delay, i.time), i.delay <= h && s(h - i.delay);
  }
  function s(h) {
    var u, f, c, d;
    if (i.state !== Do)
      return l();
    for (u in r)
      if (d = r[u], d.name === i.name) {
        if (d.state === $i)
          return Io(s);
        d.state === No ? (d.state = Ii, d.timer.stop(), d.on.call("interrupt", t, t.__data__, d.index, d.group), delete r[u]) : +u < e && (d.state = Ii, d.timer.stop(), d.on.call("cancel", t, t.__data__, d.index, d.group), delete r[u]);
      }
    if (Io(function() {
      i.state === $i && (i.state = No, i.timer.restart(a, i.delay, i.time), a(h));
    }), i.state = nn, i.on.call("start", t, t.__data__, i.index, i.group), i.state === nn) {
      for (i.state = $i, n = new Array(c = i.tween.length), u = 0, f = -1; u < c; ++u)
        (d = i.tween[u].value.call(t, t.__data__, i.index, i.group)) && (n[++f] = d);
      n.length = f + 1;
    }
  }
  function a(h) {
    for (var u = h < i.duration ? i.ease.call(null, h / i.duration) : (i.timer.restart(l), i.state = on, 1), f = -1, c = n.length; ++f < c; )
      n[f].call(t, u);
    i.state === on && (i.on.call("end", t, t.__data__, i.index, i.group), l());
  }
  function l() {
    i.state = Ii, i.timer.stop(), delete r[e];
    for (var h in r)
      return;
    delete t.__transition;
  }
}
function Lu(t, e) {
  var i = t.__transition, r, n, o = !0, s;
  if (i) {
    e = e == null ? null : e + "";
    for (s in i) {
      if ((r = i[s]).name !== e) {
        o = !1;
        continue;
      }
      n = r.state > nn && r.state < on, r.state = Ii, r.timer.stop(), r.on.call(n ? "interrupt" : "cancel", t, t.__data__, r.index, r.group), delete i[s];
    }
    o && delete t.__transition;
  }
}
function Eu(t) {
  return this.each(function() {
    Lu(this, t);
  });
}
function Mu(t, e) {
  var i, r;
  return function() {
    var n = It(this, t), o = n.tween;
    if (o !== i) {
      r = i = o;
      for (var s = 0, a = r.length; s < a; ++s)
        if (r[s].name === e) {
          r = r.slice(), r.splice(s, 1);
          break;
        }
    }
    n.tween = r;
  };
}
function Ou(t, e, i) {
  var r, n;
  if (typeof i != "function")
    throw new Error();
  return function() {
    var o = It(this, t), s = o.tween;
    if (s !== r) {
      n = (r = s).slice();
      for (var a = { name: e, value: i }, l = 0, h = n.length; l < h; ++l)
        if (n[l].name === e) {
          n[l] = a;
          break;
        }
      l === h && n.push(a);
    }
    o.tween = n;
  };
}
function $u(t, e) {
  var i = this._id;
  if (t += "", arguments.length < 2) {
    for (var r = At(this.node(), i).tween, n = 0, o = r.length, s; n < o; ++n)
      if ((s = r[n]).name === t)
        return s.value;
    return null;
  }
  return this.each((e == null ? Mu : Ou)(i, t, e));
}
function Fn(t, e, i) {
  var r = t._id;
  return t.each(function() {
    var n = It(this, r);
    (n.value || (n.value = {}))[e] = i.apply(this, arguments);
  }), function(n) {
    return At(n, r).value[e];
  };
}
function la(t, e) {
  var i;
  return (typeof e == "number" ? te : e instanceof oi ? Mo : (i = oi(e)) ? (e = i, Mo) : _u)(t, e);
}
function Iu(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Du(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Nu(t, e, i) {
  var r, n = i + "", o;
  return function() {
    var s = this.getAttribute(t);
    return s === n ? null : s === r ? o : o = e(r = s, i);
  };
}
function Ru(t, e, i) {
  var r, n = i + "", o;
  return function() {
    var s = this.getAttributeNS(t.space, t.local);
    return s === n ? null : s === r ? o : o = e(r = s, i);
  };
}
function Pu(t, e, i) {
  var r, n, o;
  return function() {
    var s, a = i(this), l;
    return a == null ? void this.removeAttribute(t) : (s = this.getAttribute(t), l = a + "", s === l ? null : s === r && l === n ? o : (n = l, o = e(r = s, a)));
  };
}
function qu(t, e, i) {
  var r, n, o;
  return function() {
    var s, a = i(this), l;
    return a == null ? void this.removeAttributeNS(t.space, t.local) : (s = this.getAttributeNS(t.space, t.local), l = a + "", s === l ? null : s === r && l === n ? o : (n = l, o = e(r = s, a)));
  };
}
function zu(t, e) {
  var i = fr(t), r = i === "transform" ? Tu : la;
  return this.attrTween(t, typeof e == "function" ? (i.local ? qu : Pu)(i, r, Fn(this, "attr." + t, e)) : e == null ? (i.local ? Du : Iu)(i) : (i.local ? Ru : Nu)(i, r, e));
}
function Wu(t, e) {
  return function(i) {
    this.setAttribute(t, e.call(this, i));
  };
}
function Hu(t, e) {
  return function(i) {
    this.setAttributeNS(t.space, t.local, e.call(this, i));
  };
}
function ju(t, e) {
  var i, r;
  function n() {
    var o = e.apply(this, arguments);
    return o !== r && (i = (r = o) && Hu(t, o)), i;
  }
  return n._value = e, n;
}
function Uu(t, e) {
  var i, r;
  function n() {
    var o = e.apply(this, arguments);
    return o !== r && (i = (r = o) && Wu(t, o)), i;
  }
  return n._value = e, n;
}
function Yu(t, e) {
  var i = "attr." + t;
  if (arguments.length < 2)
    return (i = this.tween(i)) && i._value;
  if (e == null)
    return this.tween(i, null);
  if (typeof e != "function")
    throw new Error();
  var r = fr(t);
  return this.tween(i, (r.local ? ju : Uu)(r, e));
}
function Gu(t, e) {
  return function() {
    Bn(this, t).delay = +e.apply(this, arguments);
  };
}
function Vu(t, e) {
  return e = +e, function() {
    Bn(this, t).delay = e;
  };
}
function Xu(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Gu : Vu)(e, t)) : At(this.node(), e).delay;
}
function Ku(t, e) {
  return function() {
    It(this, t).duration = +e.apply(this, arguments);
  };
}
function Zu(t, e) {
  return e = +e, function() {
    It(this, t).duration = e;
  };
}
function Ju(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Ku : Zu)(e, t)) : At(this.node(), e).duration;
}
function Qu(t, e) {
  if (typeof e != "function")
    throw new Error();
  return function() {
    It(this, t).ease = e;
  };
}
function tf(t) {
  var e = this._id;
  return arguments.length ? this.each(Qu(e, t)) : At(this.node(), e).ease;
}
function ef(t, e) {
  return function() {
    var i = e.apply(this, arguments);
    if (typeof i != "function")
      throw new Error();
    It(this, t).ease = i;
  };
}
function rf(t) {
  if (typeof t != "function")
    throw new Error();
  return this.each(ef(this._id, t));
}
function nf(t) {
  typeof t != "function" && (t = Ws(t));
  for (var e = this._groups, i = e.length, r = new Array(i), n = 0; n < i; ++n)
    for (var o = e[n], s = o.length, a = r[n] = [], l, h = 0; h < s; ++h)
      (l = o[h]) && t.call(l, l.__data__, h, o) && a.push(l);
  return new Vt(r, this._parents, this._name, this._id);
}
function of(t) {
  if (t._id !== this._id)
    throw new Error();
  for (var e = this._groups, i = t._groups, r = e.length, n = i.length, o = Math.min(r, n), s = new Array(r), a = 0; a < o; ++a)
    for (var l = e[a], h = i[a], u = l.length, f = s[a] = new Array(u), c, d = 0; d < u; ++d)
      (c = l[d] || h[d]) && (f[d] = c);
  for (; a < r; ++a)
    s[a] = e[a];
  return new Vt(s, this._parents, this._name, this._id);
}
function sf(t) {
  return (t + "").trim().split(/^|\s+/).every(function(e) {
    var i = e.indexOf(".");
    return i >= 0 && (e = e.slice(0, i)), !e || e === "start";
  });
}
function af(t, e, i) {
  var r, n, o = sf(e) ? Bn : It;
  return function() {
    var s = o(this, t), a = s.on;
    a !== r && (n = (r = a).copy()).on(e, i), s.on = n;
  };
}
function lf(t, e) {
  var i = this._id;
  return arguments.length < 2 ? At(this.node(), i).on.on(t) : this.each(af(i, t, e));
}
function hf(t) {
  return function() {
    var e = this.parentNode;
    for (var i in this.__transition)
      if (+i !== t)
        return;
    e && e.removeChild(this);
  };
}
function cf() {
  return this.on("end.remove", hf(this._id));
}
function uf(t) {
  var e = this._name, i = this._id;
  typeof t != "function" && (t = Tn(t));
  for (var r = this._groups, n = r.length, o = new Array(n), s = 0; s < n; ++s)
    for (var a = r[s], l = a.length, h = o[s] = new Array(l), u, f, c = 0; c < l; ++c)
      (u = a[c]) && (f = t.call(u, u.__data__, c, a)) && ("__data__" in u && (f.__data__ = u.__data__), h[c] = f, pr(h[c], e, i, c, h, At(u, i)));
  return new Vt(o, this._parents, e, i);
}
function ff(t) {
  var e = this._name, i = this._id;
  typeof t != "function" && (t = zs(t));
  for (var r = this._groups, n = r.length, o = [], s = [], a = 0; a < n; ++a)
    for (var l = r[a], h = l.length, u, f = 0; f < h; ++f)
      if (u = l[f]) {
        for (var c = t.call(u, u.__data__, f, l), d, m = At(u, i), S = 0, O = c.length; S < O; ++S)
          (d = c[S]) && pr(d, e, i, S, c, m);
        o.push(c), s.push(u);
      }
  return new Vt(o, s, e, i);
}
var df = di.prototype.constructor;
function pf() {
  return new df(this._groups, this._parents);
}
function gf(t, e) {
  var i, r, n;
  return function() {
    var o = Ae(this, t), s = (this.style.removeProperty(t), Ae(this, t));
    return o === s ? null : o === i && s === r ? n : n = e(i = o, r = s);
  };
}
function ha(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function mf(t, e, i) {
  var r, n = i + "", o;
  return function() {
    var s = Ae(this, t);
    return s === n ? null : s === r ? o : o = e(r = s, i);
  };
}
function yf(t, e, i) {
  var r, n, o;
  return function() {
    var s = Ae(this, t), a = i(this), l = a + "";
    return a == null && (l = a = (this.style.removeProperty(t), Ae(this, t))), s === l ? null : s === r && l === n ? o : (n = l, o = e(r = s, a));
  };
}
function _f(t, e) {
  var i, r, n, o = "style." + e, s = "end." + o, a;
  return function() {
    var l = It(this, t), h = l.on, u = l.value[o] == null ? a || (a = ha(e)) : void 0;
    (h !== i || n !== u) && (r = (i = h).copy()).on(s, n = u), l.on = r;
  };
}
function Cf(t, e, i) {
  var r = (t += "") == "transform" ? bu : la;
  return e == null ? this.styleTween(t, gf(t, r)).on("end.style." + t, ha(t)) : typeof e == "function" ? this.styleTween(t, yf(t, r, Fn(this, "style." + t, e))).each(_f(this._id, t)) : this.styleTween(t, mf(t, r, e), i).on("end.style." + t, null);
}
function xf(t, e, i) {
  return function(r) {
    this.style.setProperty(t, e.call(this, r), i);
  };
}
function bf(t, e, i) {
  var r, n;
  function o() {
    var s = e.apply(this, arguments);
    return s !== n && (r = (n = s) && xf(t, s, i)), r;
  }
  return o._value = e, o;
}
function Tf(t, e, i) {
  var r = "style." + (t += "");
  if (arguments.length < 2)
    return (r = this.tween(r)) && r._value;
  if (e == null)
    return this.tween(r, null);
  if (typeof e != "function")
    throw new Error();
  return this.tween(r, bf(t, e, i ?? ""));
}
function kf(t) {
  return function() {
    this.textContent = t;
  };
}
function Sf(t) {
  return function() {
    var e = t(this);
    this.textContent = e ?? "";
  };
}
function vf(t) {
  return this.tween("text", typeof t == "function" ? Sf(Fn(this, "text", t)) : kf(t == null ? "" : t + ""));
}
function wf(t) {
  return function(e) {
    this.textContent = t.call(this, e);
  };
}
function Bf(t) {
  var e, i;
  function r() {
    var n = t.apply(this, arguments);
    return n !== i && (e = (i = n) && wf(n)), e;
  }
  return r._value = t, r;
}
function Ff(t) {
  var e = "text";
  if (arguments.length < 1)
    return (e = this.tween(e)) && e._value;
  if (t == null)
    return this.tween(e, null);
  if (typeof t != "function")
    throw new Error();
  return this.tween(e, Bf(t));
}
function Af() {
  for (var t = this._name, e = this._id, i = ca(), r = this._groups, n = r.length, o = 0; o < n; ++o)
    for (var s = r[o], a = s.length, l, h = 0; h < a; ++h)
      if (l = s[h]) {
        var u = At(l, e);
        pr(l, t, i, h, s, {
          time: u.time + u.delay + u.duration,
          delay: 0,
          duration: u.duration,
          ease: u.ease
        });
      }
  return new Vt(r, this._parents, t, i);
}
function Lf() {
  var t, e, i = this, r = i._id, n = i.size();
  return new Promise(function(o, s) {
    var a = { value: s }, l = { value: function() {
      --n === 0 && o();
    } };
    i.each(function() {
      var h = It(this, r), u = h.on;
      u !== t && (e = (t = u).copy(), e._.cancel.push(a), e._.interrupt.push(a), e._.end.push(l)), h.on = e;
    }), n === 0 && o();
  });
}
var Ef = 0;
function Vt(t, e, i, r) {
  this._groups = t, this._parents = e, this._name = i, this._id = r;
}
function ca() {
  return ++Ef;
}
var Ht = di.prototype;
Vt.prototype = {
  constructor: Vt,
  select: uf,
  selectAll: ff,
  selectChild: Ht.selectChild,
  selectChildren: Ht.selectChildren,
  filter: nf,
  merge: of,
  selection: pf,
  transition: Af,
  call: Ht.call,
  nodes: Ht.nodes,
  node: Ht.node,
  size: Ht.size,
  empty: Ht.empty,
  each: Ht.each,
  on: lf,
  attr: zu,
  attrTween: Yu,
  style: Cf,
  styleTween: Tf,
  text: vf,
  textTween: Ff,
  remove: cf,
  tween: $u,
  delay: Xu,
  duration: Ju,
  ease: tf,
  easeVarying: rf,
  end: Lf,
  [Symbol.iterator]: Ht[Symbol.iterator]
};
function Mf(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var Of = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: Mf
};
function $f(t, e) {
  for (var i; !(i = t.__transition) || !(i = i[e]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${e} not found`);
  return i;
}
function If(t) {
  var e, i;
  t instanceof Vt ? (e = t._id, t = t._name) : (e = ca(), (i = Of).time = wn(), t = t == null ? null : t + "");
  for (var r = this._groups, n = r.length, o = 0; o < n; ++o)
    for (var s = r[o], a = s.length, l, h = 0; h < a; ++h)
      (l = s[h]) && pr(l, t, e, h, s, i || $f(l, e));
  return new Vt(r, this._parents, t, e);
}
di.prototype.interrupt = Eu;
di.prototype.transition = If;
const h1 = Math.abs, c1 = Math.atan2, u1 = Math.cos, f1 = Math.max, d1 = Math.min, p1 = Math.sin, g1 = Math.sqrt, Ro = 1e-12, An = Math.PI, Po = An / 2, m1 = 2 * An;
function y1(t) {
  return t > 1 ? 0 : t < -1 ? An : Math.acos(t);
}
function _1(t) {
  return t >= 1 ? Po : t <= -1 ? -Po : Math.asin(t);
}
function ua(t) {
  this._context = t;
}
ua.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(t, e) {
    switch (t = +t, e = +e, this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(t, e) : this._context.moveTo(t, e);
        break;
      case 1:
        this._point = 2;
      default:
        this._context.lineTo(t, e);
        break;
    }
  }
};
function Df(t) {
  return new ua(t);
}
class fa {
  constructor(e, i) {
    this._context = e, this._x = i;
  }
  areaStart() {
    this._line = 0;
  }
  areaEnd() {
    this._line = NaN;
  }
  lineStart() {
    this._point = 0;
  }
  lineEnd() {
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  }
  point(e, i) {
    switch (e = +e, i = +i, this._point) {
      case 0: {
        this._point = 1, this._line ? this._context.lineTo(e, i) : this._context.moveTo(e, i);
        break;
      }
      case 1:
        this._point = 2;
      default: {
        this._x ? this._context.bezierCurveTo(this._x0 = (this._x0 + e) / 2, this._y0, this._x0, i, e, i) : this._context.bezierCurveTo(this._x0, this._y0 = (this._y0 + i) / 2, e, this._y0, e, i);
        break;
      }
    }
    this._x0 = e, this._y0 = i;
  }
}
function Nf(t) {
  return new fa(t, !0);
}
function Rf(t) {
  return new fa(t, !1);
}
function ie() {
}
function Ki(t, e, i) {
  t._context.bezierCurveTo(
    (2 * t._x0 + t._x1) / 3,
    (2 * t._y0 + t._y1) / 3,
    (t._x0 + 2 * t._x1) / 3,
    (t._y0 + 2 * t._y1) / 3,
    (t._x0 + 4 * t._x1 + e) / 6,
    (t._y0 + 4 * t._y1 + i) / 6
  );
}
function gr(t) {
  this._context = t;
}
gr.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = NaN, this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 3:
        Ki(this, this._x1, this._y1);
      case 2:
        this._context.lineTo(this._x1, this._y1);
        break;
    }
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(t, e) {
    switch (t = +t, e = +e, this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(t, e) : this._context.moveTo(t, e);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3, this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6);
      default:
        Ki(this, t, e);
        break;
    }
    this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = e;
  }
};
function Pf(t) {
  return new gr(t);
}
function da(t) {
  this._context = t;
}
da.prototype = {
  areaStart: ie,
  areaEnd: ie,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN, this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x2, this._y2), this._context.closePath();
        break;
      }
      case 2: {
        this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3), this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3), this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x2, this._y2), this.point(this._x3, this._y3), this.point(this._x4, this._y4);
        break;
      }
    }
  },
  point: function(t, e) {
    switch (t = +t, e = +e, this._point) {
      case 0:
        this._point = 1, this._x2 = t, this._y2 = e;
        break;
      case 1:
        this._point = 2, this._x3 = t, this._y3 = e;
        break;
      case 2:
        this._point = 3, this._x4 = t, this._y4 = e, this._context.moveTo((this._x0 + 4 * this._x1 + t) / 6, (this._y0 + 4 * this._y1 + e) / 6);
        break;
      default:
        Ki(this, t, e);
        break;
    }
    this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = e;
  }
};
function qf(t) {
  return new da(t);
}
function pa(t) {
  this._context = t;
}
pa.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = NaN, this._point = 0;
  },
  lineEnd: function() {
    (this._line || this._line !== 0 && this._point === 3) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(t, e) {
    switch (t = +t, e = +e, this._point) {
      case 0:
        this._point = 1;
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        var i = (this._x0 + 4 * this._x1 + t) / 6, r = (this._y0 + 4 * this._y1 + e) / 6;
        this._line ? this._context.lineTo(i, r) : this._context.moveTo(i, r);
        break;
      case 3:
        this._point = 4;
      default:
        Ki(this, t, e);
        break;
    }
    this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = e;
  }
};
function zf(t) {
  return new pa(t);
}
function ga(t, e) {
  this._basis = new gr(t), this._beta = e;
}
ga.prototype = {
  lineStart: function() {
    this._x = [], this._y = [], this._basis.lineStart();
  },
  lineEnd: function() {
    var t = this._x, e = this._y, i = t.length - 1;
    if (i > 0)
      for (var r = t[0], n = e[0], o = t[i] - r, s = e[i] - n, a = -1, l; ++a <= i; )
        l = a / i, this._basis.point(
          this._beta * t[a] + (1 - this._beta) * (r + l * o),
          this._beta * e[a] + (1 - this._beta) * (n + l * s)
        );
    this._x = this._y = null, this._basis.lineEnd();
  },
  point: function(t, e) {
    this._x.push(+t), this._y.push(+e);
  }
};
const Wf = function t(e) {
  function i(r) {
    return e === 1 ? new gr(r) : new ga(r, e);
  }
  return i.beta = function(r) {
    return t(+r);
  }, i;
}(0.85);
function Zi(t, e, i) {
  t._context.bezierCurveTo(
    t._x1 + t._k * (t._x2 - t._x0),
    t._y1 + t._k * (t._y2 - t._y0),
    t._x2 + t._k * (t._x1 - e),
    t._y2 + t._k * (t._y1 - i),
    t._x2,
    t._y2
  );
}
function Ln(t, e) {
  this._context = t, this._k = (1 - e) / 6;
}
Ln.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN, this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x2, this._y2);
        break;
      case 3:
        Zi(this, this._x1, this._y1);
        break;
    }
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(t, e) {
    switch (t = +t, e = +e, this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(t, e) : this._context.moveTo(t, e);
        break;
      case 1:
        this._point = 2, this._x1 = t, this._y1 = e;
        break;
      case 2:
        this._point = 3;
      default:
        Zi(this, t, e);
        break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = e;
  }
};
const Hf = function t(e) {
  function i(r) {
    return new Ln(r, e);
  }
  return i.tension = function(r) {
    return t(+r);
  }, i;
}(0);
function En(t, e) {
  this._context = t, this._k = (1 - e) / 6;
}
En.prototype = {
  areaStart: ie,
  areaEnd: ie,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN, this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x3, this._y3), this._context.closePath();
        break;
      }
      case 2: {
        this._context.lineTo(this._x3, this._y3), this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x3, this._y3), this.point(this._x4, this._y4), this.point(this._x5, this._y5);
        break;
      }
    }
  },
  point: function(t, e) {
    switch (t = +t, e = +e, this._point) {
      case 0:
        this._point = 1, this._x3 = t, this._y3 = e;
        break;
      case 1:
        this._point = 2, this._context.moveTo(this._x4 = t, this._y4 = e);
        break;
      case 2:
        this._point = 3, this._x5 = t, this._y5 = e;
        break;
      default:
        Zi(this, t, e);
        break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = e;
  }
};
const jf = function t(e) {
  function i(r) {
    return new En(r, e);
  }
  return i.tension = function(r) {
    return t(+r);
  }, i;
}(0);
function Mn(t, e) {
  this._context = t, this._k = (1 - e) / 6;
}
Mn.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN, this._point = 0;
  },
  lineEnd: function() {
    (this._line || this._line !== 0 && this._point === 3) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(t, e) {
    switch (t = +t, e = +e, this._point) {
      case 0:
        this._point = 1;
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3, this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
        break;
      case 3:
        this._point = 4;
      default:
        Zi(this, t, e);
        break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = e;
  }
};
const Uf = function t(e) {
  function i(r) {
    return new Mn(r, e);
  }
  return i.tension = function(r) {
    return t(+r);
  }, i;
}(0);
function On(t, e, i) {
  var r = t._x1, n = t._y1, o = t._x2, s = t._y2;
  if (t._l01_a > Ro) {
    var a = 2 * t._l01_2a + 3 * t._l01_a * t._l12_a + t._l12_2a, l = 3 * t._l01_a * (t._l01_a + t._l12_a);
    r = (r * a - t._x0 * t._l12_2a + t._x2 * t._l01_2a) / l, n = (n * a - t._y0 * t._l12_2a + t._y2 * t._l01_2a) / l;
  }
  if (t._l23_a > Ro) {
    var h = 2 * t._l23_2a + 3 * t._l23_a * t._l12_a + t._l12_2a, u = 3 * t._l23_a * (t._l23_a + t._l12_a);
    o = (o * h + t._x1 * t._l23_2a - e * t._l12_2a) / u, s = (s * h + t._y1 * t._l23_2a - i * t._l12_2a) / u;
  }
  t._context.bezierCurveTo(r, n, o, s, t._x2, t._y2);
}
function ma(t, e) {
  this._context = t, this._alpha = e;
}
ma.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN, this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x2, this._y2);
        break;
      case 3:
        this.point(this._x2, this._y2);
        break;
    }
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(t, e) {
    if (t = +t, e = +e, this._point) {
      var i = this._x2 - t, r = this._y2 - e;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(i * i + r * r, this._alpha));
    }
    switch (this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(t, e) : this._context.moveTo(t, e);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
      default:
        On(this, t, e);
        break;
    }
    this._l01_a = this._l12_a, this._l12_a = this._l23_a, this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a, this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = e;
  }
};
const Yf = function t(e) {
  function i(r) {
    return e ? new ma(r, e) : new Ln(r, 0);
  }
  return i.alpha = function(r) {
    return t(+r);
  }, i;
}(0.5);
function ya(t, e) {
  this._context = t, this._alpha = e;
}
ya.prototype = {
  areaStart: ie,
  areaEnd: ie,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN, this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x3, this._y3), this._context.closePath();
        break;
      }
      case 2: {
        this._context.lineTo(this._x3, this._y3), this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x3, this._y3), this.point(this._x4, this._y4), this.point(this._x5, this._y5);
        break;
      }
    }
  },
  point: function(t, e) {
    if (t = +t, e = +e, this._point) {
      var i = this._x2 - t, r = this._y2 - e;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(i * i + r * r, this._alpha));
    }
    switch (this._point) {
      case 0:
        this._point = 1, this._x3 = t, this._y3 = e;
        break;
      case 1:
        this._point = 2, this._context.moveTo(this._x4 = t, this._y4 = e);
        break;
      case 2:
        this._point = 3, this._x5 = t, this._y5 = e;
        break;
      default:
        On(this, t, e);
        break;
    }
    this._l01_a = this._l12_a, this._l12_a = this._l23_a, this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a, this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = e;
  }
};
const Gf = function t(e) {
  function i(r) {
    return e ? new ya(r, e) : new En(r, 0);
  }
  return i.alpha = function(r) {
    return t(+r);
  }, i;
}(0.5);
function _a(t, e) {
  this._context = t, this._alpha = e;
}
_a.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN, this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
  },
  lineEnd: function() {
    (this._line || this._line !== 0 && this._point === 3) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(t, e) {
    if (t = +t, e = +e, this._point) {
      var i = this._x2 - t, r = this._y2 - e;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(i * i + r * r, this._alpha));
    }
    switch (this._point) {
      case 0:
        this._point = 1;
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3, this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
        break;
      case 3:
        this._point = 4;
      default:
        On(this, t, e);
        break;
    }
    this._l01_a = this._l12_a, this._l12_a = this._l23_a, this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a, this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = e;
  }
};
const Vf = function t(e) {
  function i(r) {
    return e ? new _a(r, e) : new Mn(r, 0);
  }
  return i.alpha = function(r) {
    return t(+r);
  }, i;
}(0.5);
function Ca(t) {
  this._context = t;
}
Ca.prototype = {
  areaStart: ie,
  areaEnd: ie,
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    this._point && this._context.closePath();
  },
  point: function(t, e) {
    t = +t, e = +e, this._point ? this._context.lineTo(t, e) : (this._point = 1, this._context.moveTo(t, e));
  }
};
function Xf(t) {
  return new Ca(t);
}
function qo(t) {
  return t < 0 ? -1 : 1;
}
function zo(t, e, i) {
  var r = t._x1 - t._x0, n = e - t._x1, o = (t._y1 - t._y0) / (r || n < 0 && -0), s = (i - t._y1) / (n || r < 0 && -0), a = (o * n + s * r) / (r + n);
  return (qo(o) + qo(s)) * Math.min(Math.abs(o), Math.abs(s), 0.5 * Math.abs(a)) || 0;
}
function Wo(t, e) {
  var i = t._x1 - t._x0;
  return i ? (3 * (t._y1 - t._y0) / i - e) / 2 : e;
}
function Rr(t, e, i) {
  var r = t._x0, n = t._y0, o = t._x1, s = t._y1, a = (o - r) / 3;
  t._context.bezierCurveTo(r + a, n + a * e, o - a, s - a * i, o, s);
}
function Ji(t) {
  this._context = t;
}
Ji.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN, this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x1, this._y1);
        break;
      case 3:
        Rr(this, this._t0, Wo(this, this._t0));
        break;
    }
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(t, e) {
    var i = NaN;
    if (t = +t, e = +e, !(t === this._x1 && e === this._y1)) {
      switch (this._point) {
        case 0:
          this._point = 1, this._line ? this._context.lineTo(t, e) : this._context.moveTo(t, e);
          break;
        case 1:
          this._point = 2;
          break;
        case 2:
          this._point = 3, Rr(this, Wo(this, i = zo(this, t, e)), i);
          break;
        default:
          Rr(this, this._t0, i = zo(this, t, e));
          break;
      }
      this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = e, this._t0 = i;
    }
  }
};
function xa(t) {
  this._context = new ba(t);
}
(xa.prototype = Object.create(Ji.prototype)).point = function(t, e) {
  Ji.prototype.point.call(this, e, t);
};
function ba(t) {
  this._context = t;
}
ba.prototype = {
  moveTo: function(t, e) {
    this._context.moveTo(e, t);
  },
  closePath: function() {
    this._context.closePath();
  },
  lineTo: function(t, e) {
    this._context.lineTo(e, t);
  },
  bezierCurveTo: function(t, e, i, r, n, o) {
    this._context.bezierCurveTo(e, t, r, i, o, n);
  }
};
function Kf(t) {
  return new Ji(t);
}
function Zf(t) {
  return new xa(t);
}
function Ta(t) {
  this._context = t;
}
Ta.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = [], this._y = [];
  },
  lineEnd: function() {
    var t = this._x, e = this._y, i = t.length;
    if (i)
      if (this._line ? this._context.lineTo(t[0], e[0]) : this._context.moveTo(t[0], e[0]), i === 2)
        this._context.lineTo(t[1], e[1]);
      else
        for (var r = Ho(t), n = Ho(e), o = 0, s = 1; s < i; ++o, ++s)
          this._context.bezierCurveTo(r[0][o], n[0][o], r[1][o], n[1][o], t[s], e[s]);
    (this._line || this._line !== 0 && i === 1) && this._context.closePath(), this._line = 1 - this._line, this._x = this._y = null;
  },
  point: function(t, e) {
    this._x.push(+t), this._y.push(+e);
  }
};
function Ho(t) {
  var e, i = t.length - 1, r, n = new Array(i), o = new Array(i), s = new Array(i);
  for (n[0] = 0, o[0] = 2, s[0] = t[0] + 2 * t[1], e = 1; e < i - 1; ++e)
    n[e] = 1, o[e] = 4, s[e] = 4 * t[e] + 2 * t[e + 1];
  for (n[i - 1] = 2, o[i - 1] = 7, s[i - 1] = 8 * t[i - 1] + t[i], e = 1; e < i; ++e)
    r = n[e] / o[e - 1], o[e] -= r, s[e] -= r * s[e - 1];
  for (n[i - 1] = s[i - 1] / o[i - 1], e = i - 2; e >= 0; --e)
    n[e] = (s[e] - n[e + 1]) / o[e];
  for (o[i - 1] = (t[i] + n[i - 1]) / 2, e = 0; e < i - 1; ++e)
    o[e] = 2 * t[e + 1] - n[e + 1];
  return [n, o];
}
function Jf(t) {
  return new Ta(t);
}
function mr(t, e) {
  this._context = t, this._t = e;
}
mr.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = this._y = NaN, this._point = 0;
  },
  lineEnd: function() {
    0 < this._t && this._t < 1 && this._point === 2 && this._context.lineTo(this._x, this._y), (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line >= 0 && (this._t = 1 - this._t, this._line = 1 - this._line);
  },
  point: function(t, e) {
    switch (t = +t, e = +e, this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(t, e) : this._context.moveTo(t, e);
        break;
      case 1:
        this._point = 2;
      default: {
        if (this._t <= 0)
          this._context.lineTo(this._x, e), this._context.lineTo(t, e);
        else {
          var i = this._x * (1 - this._t) + t * this._t;
          this._context.lineTo(i, this._y), this._context.lineTo(i, e);
        }
        break;
      }
    }
    this._x = t, this._y = e;
  }
};
function Qf(t) {
  return new mr(t, 0.5);
}
function td(t) {
  return new mr(t, 0);
}
function ed(t) {
  return new mr(t, 1);
}
function Ke(t, e, i) {
  this.k = t, this.x = e, this.y = i;
}
Ke.prototype = {
  constructor: Ke,
  scale: function(t) {
    return t === 1 ? this : new Ke(this.k * t, this.x, this.y);
  },
  translate: function(t, e) {
    return t === 0 & e === 0 ? this : new Ke(this.k, this.x + this.k * t, this.y + this.k * e);
  },
  apply: function(t) {
    return [t[0] * this.k + this.x, t[1] * this.k + this.y];
  },
  applyX: function(t) {
    return t * this.k + this.x;
  },
  applyY: function(t) {
    return t * this.k + this.y;
  },
  invert: function(t) {
    return [(t[0] - this.x) / this.k, (t[1] - this.y) / this.k];
  },
  invertX: function(t) {
    return (t - this.x) / this.k;
  },
  invertY: function(t) {
    return (t - this.y) / this.k;
  },
  rescaleX: function(t) {
    return t.copy().domain(t.range().map(this.invertX, this).map(t.invert, t));
  },
  rescaleY: function(t) {
    return t.copy().domain(t.range().map(this.invertY, this).map(t.invert, t));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};
Ke.prototype;
/*! @license DOMPurify 3.0.9 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.0.9/LICENSE */
const {
  entries: ka,
  setPrototypeOf: jo,
  isFrozen: id,
  getPrototypeOf: rd,
  getOwnPropertyDescriptor: nd
} = Object;
let {
  freeze: ct,
  seal: Ft,
  create: Sa
} = Object, {
  apply: sn,
  construct: an
} = typeof Reflect < "u" && Reflect;
ct || (ct = function(e) {
  return e;
});
Ft || (Ft = function(e) {
  return e;
});
sn || (sn = function(e, i, r) {
  return e.apply(i, r);
});
an || (an = function(e, i) {
  return new e(...i);
});
const wi = _t(Array.prototype.forEach), Uo = _t(Array.prototype.pop), je = _t(Array.prototype.push), Di = _t(String.prototype.toLowerCase), Pr = _t(String.prototype.toString), od = _t(String.prototype.match), Ue = _t(String.prototype.replace), sd = _t(String.prototype.indexOf), ad = _t(String.prototype.trim), vt = _t(Object.prototype.hasOwnProperty), mt = _t(RegExp.prototype.test), Ye = ld(TypeError);
function _t(t) {
  return function(e) {
    for (var i = arguments.length, r = new Array(i > 1 ? i - 1 : 0), n = 1; n < i; n++)
      r[n - 1] = arguments[n];
    return sn(t, e, r);
  };
}
function ld(t) {
  return function() {
    for (var e = arguments.length, i = new Array(e), r = 0; r < e; r++)
      i[r] = arguments[r];
    return an(t, i);
  };
}
function q(t, e) {
  let i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Di;
  jo && jo(t, null);
  let r = e.length;
  for (; r--; ) {
    let n = e[r];
    if (typeof n == "string") {
      const o = i(n);
      o !== n && (id(e) || (e[r] = o), n = o);
    }
    t[n] = !0;
  }
  return t;
}
function hd(t) {
  for (let e = 0; e < t.length; e++)
    vt(t, e) || (t[e] = null);
  return t;
}
function le(t) {
  const e = Sa(null);
  for (const [i, r] of ka(t))
    vt(t, i) && (Array.isArray(r) ? e[i] = hd(r) : r && typeof r == "object" && r.constructor === Object ? e[i] = le(r) : e[i] = r);
  return e;
}
function Bi(t, e) {
  for (; t !== null; ) {
    const r = nd(t, e);
    if (r) {
      if (r.get)
        return _t(r.get);
      if (typeof r.value == "function")
        return _t(r.value);
    }
    t = rd(t);
  }
  function i() {
    return null;
  }
  return i;
}
const Yo = ct(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "section", "select", "shadow", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), qr = ct(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), zr = ct(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), cd = ct(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), Wr = ct(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), ud = ct(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), Go = ct(["#text"]), Vo = ct(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "pattern", "placeholder", "playsinline", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "xmlns", "slot"]), Hr = ct(["accent-height", "accumulate", "additive", "alignment-baseline", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), Xo = ct(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), Fi = ct(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), fd = Ft(/\{\{[\w\W]*|[\w\W]*\}\}/gm), dd = Ft(/<%[\w\W]*|[\w\W]*%>/gm), pd = Ft(/\${[\w\W]*}/gm), gd = Ft(/^data-[\-\w.\u00B7-\uFFFF]/), md = Ft(/^aria-[\-\w]+$/), va = Ft(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
), yd = Ft(/^(?:\w+script|data):/i), _d = Ft(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
), wa = Ft(/^html$/i);
var Ko = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  MUSTACHE_EXPR: fd,
  ERB_EXPR: dd,
  TMPLIT_EXPR: pd,
  DATA_ATTR: gd,
  ARIA_ATTR: md,
  IS_ALLOWED_URI: va,
  IS_SCRIPT_OR_DATA: yd,
  ATTR_WHITESPACE: _d,
  DOCTYPE_NAME: wa
});
const Cd = function() {
  return typeof window > "u" ? null : window;
}, xd = function(e, i) {
  if (typeof e != "object" || typeof e.createPolicy != "function")
    return null;
  let r = null;
  const n = "data-tt-policy-suffix";
  i && i.hasAttribute(n) && (r = i.getAttribute(n));
  const o = "dompurify" + (r ? "#" + r : "");
  try {
    return e.createPolicy(o, {
      createHTML(s) {
        return s;
      },
      createScriptURL(s) {
        return s;
      }
    });
  } catch {
    return console.warn("TrustedTypes policy " + o + " could not be created."), null;
  }
};
function Ba() {
  let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : Cd();
  const e = (B) => Ba(B);
  if (e.version = "3.0.9", e.removed = [], !t || !t.document || t.document.nodeType !== 9)
    return e.isSupported = !1, e;
  let {
    document: i
  } = t;
  const r = i, n = r.currentScript, {
    DocumentFragment: o,
    HTMLTemplateElement: s,
    Node: a,
    Element: l,
    NodeFilter: h,
    NamedNodeMap: u = t.NamedNodeMap || t.MozNamedAttrMap,
    HTMLFormElement: f,
    DOMParser: c,
    trustedTypes: d
  } = t, m = l.prototype, S = Bi(m, "cloneNode"), O = Bi(m, "nextSibling"), z = Bi(m, "childNodes"), T = Bi(m, "parentNode");
  if (typeof s == "function") {
    const B = i.createElement("template");
    B.content && B.content.ownerDocument && (i = B.content.ownerDocument);
  }
  let R, X = "";
  const {
    implementation: G,
    createNodeIterator: V,
    createDocumentFragment: H,
    getElementsByTagName: oe
  } = i, {
    importNode: Kt
  } = r;
  let P = {};
  e.isSupported = typeof ka == "function" && typeof T == "function" && G && G.createHTMLDocument !== void 0;
  const {
    MUSTACHE_EXPR: W,
    ERB_EXPR: Ct,
    TMPLIT_EXPR: Nt,
    DATA_ATTR: M,
    ARIA_ATTR: k,
    IS_SCRIPT_OR_DATA: C,
    ATTR_WHITESPACE: w
  } = Ko;
  let {
    IS_ALLOWED_URI: x
  } = Ko, b = null;
  const D = q({}, [...Yo, ...qr, ...zr, ...Wr, ...Go]);
  let I = null;
  const Y = q({}, [...Vo, ...Hr, ...Xo, ...Fi]);
  let N = Object.seal(Sa(null, {
    tagNameCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    },
    attributeNameCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    },
    allowCustomizedBuiltInElements: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: !1
    }
  })), K = null, et = null, Rt = !0, St = !0, Zt = !1, Lt = !0, Z = !1, it = !1, Pt = !1, Jt = !1, xe = !1, Ci = !1, xi = !1, eo = !0, io = !1;
  const ah = "user-content-";
  let Lr = !0, qe = !1, be = {}, Te = null;
  const ro = q({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
  let no = null;
  const oo = q({}, ["audio", "video", "img", "source", "image", "track"]);
  let Er = null;
  const so = q({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), bi = "http://www.w3.org/1998/Math/MathML", Ti = "http://www.w3.org/2000/svg", qt = "http://www.w3.org/1999/xhtml";
  let ke = qt, Mr = !1, Or = null;
  const lh = q({}, [bi, Ti, qt], Pr);
  let ze = null;
  const hh = ["application/xhtml+xml", "text/html"], ch = "text/html";
  let tt = null, Se = null;
  const uh = i.createElement("form"), ao = function(p) {
    return p instanceof RegExp || p instanceof Function;
  }, $r = function() {
    let p = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (!(Se && Se === p)) {
      if ((!p || typeof p != "object") && (p = {}), p = le(p), ze = // eslint-disable-next-line unicorn/prefer-includes
      hh.indexOf(p.PARSER_MEDIA_TYPE) === -1 ? ch : p.PARSER_MEDIA_TYPE, tt = ze === "application/xhtml+xml" ? Pr : Di, b = vt(p, "ALLOWED_TAGS") ? q({}, p.ALLOWED_TAGS, tt) : D, I = vt(p, "ALLOWED_ATTR") ? q({}, p.ALLOWED_ATTR, tt) : Y, Or = vt(p, "ALLOWED_NAMESPACES") ? q({}, p.ALLOWED_NAMESPACES, Pr) : lh, Er = vt(p, "ADD_URI_SAFE_ATTR") ? q(
        le(so),
        // eslint-disable-line indent
        p.ADD_URI_SAFE_ATTR,
        // eslint-disable-line indent
        tt
        // eslint-disable-line indent
      ) : so, no = vt(p, "ADD_DATA_URI_TAGS") ? q(
        le(oo),
        // eslint-disable-line indent
        p.ADD_DATA_URI_TAGS,
        // eslint-disable-line indent
        tt
        // eslint-disable-line indent
      ) : oo, Te = vt(p, "FORBID_CONTENTS") ? q({}, p.FORBID_CONTENTS, tt) : ro, K = vt(p, "FORBID_TAGS") ? q({}, p.FORBID_TAGS, tt) : {}, et = vt(p, "FORBID_ATTR") ? q({}, p.FORBID_ATTR, tt) : {}, be = vt(p, "USE_PROFILES") ? p.USE_PROFILES : !1, Rt = p.ALLOW_ARIA_ATTR !== !1, St = p.ALLOW_DATA_ATTR !== !1, Zt = p.ALLOW_UNKNOWN_PROTOCOLS || !1, Lt = p.ALLOW_SELF_CLOSE_IN_ATTR !== !1, Z = p.SAFE_FOR_TEMPLATES || !1, it = p.WHOLE_DOCUMENT || !1, xe = p.RETURN_DOM || !1, Ci = p.RETURN_DOM_FRAGMENT || !1, xi = p.RETURN_TRUSTED_TYPE || !1, Jt = p.FORCE_BODY || !1, eo = p.SANITIZE_DOM !== !1, io = p.SANITIZE_NAMED_PROPS || !1, Lr = p.KEEP_CONTENT !== !1, qe = p.IN_PLACE || !1, x = p.ALLOWED_URI_REGEXP || va, ke = p.NAMESPACE || qt, N = p.CUSTOM_ELEMENT_HANDLING || {}, p.CUSTOM_ELEMENT_HANDLING && ao(p.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (N.tagNameCheck = p.CUSTOM_ELEMENT_HANDLING.tagNameCheck), p.CUSTOM_ELEMENT_HANDLING && ao(p.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (N.attributeNameCheck = p.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), p.CUSTOM_ELEMENT_HANDLING && typeof p.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements == "boolean" && (N.allowCustomizedBuiltInElements = p.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), Z && (St = !1), Ci && (xe = !0), be && (b = q({}, Go), I = [], be.html === !0 && (q(b, Yo), q(I, Vo)), be.svg === !0 && (q(b, qr), q(I, Hr), q(I, Fi)), be.svgFilters === !0 && (q(b, zr), q(I, Hr), q(I, Fi)), be.mathMl === !0 && (q(b, Wr), q(I, Xo), q(I, Fi))), p.ADD_TAGS && (b === D && (b = le(b)), q(b, p.ADD_TAGS, tt)), p.ADD_ATTR && (I === Y && (I = le(I)), q(I, p.ADD_ATTR, tt)), p.ADD_URI_SAFE_ATTR && q(Er, p.ADD_URI_SAFE_ATTR, tt), p.FORBID_CONTENTS && (Te === ro && (Te = le(Te)), q(Te, p.FORBID_CONTENTS, tt)), Lr && (b["#text"] = !0), it && q(b, ["html", "head", "body"]), b.table && (q(b, ["tbody"]), delete K.tbody), p.TRUSTED_TYPES_POLICY) {
        if (typeof p.TRUSTED_TYPES_POLICY.createHTML != "function")
          throw Ye('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
        if (typeof p.TRUSTED_TYPES_POLICY.createScriptURL != "function")
          throw Ye('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
        R = p.TRUSTED_TYPES_POLICY, X = R.createHTML("");
      } else
        R === void 0 && (R = xd(d, n)), R !== null && typeof X == "string" && (X = R.createHTML(""));
      ct && ct(p), Se = p;
    }
  }, lo = q({}, ["mi", "mo", "mn", "ms", "mtext"]), ho = q({}, ["foreignobject", "desc", "title", "annotation-xml"]), fh = q({}, ["title", "style", "font", "a", "script"]), co = q({}, [...qr, ...zr, ...cd]), uo = q({}, [...Wr, ...ud]), dh = function(p) {
    let y = T(p);
    (!y || !y.tagName) && (y = {
      namespaceURI: ke,
      tagName: "template"
    });
    const v = Di(p.tagName), j = Di(y.tagName);
    return Or[p.namespaceURI] ? p.namespaceURI === Ti ? y.namespaceURI === qt ? v === "svg" : y.namespaceURI === bi ? v === "svg" && (j === "annotation-xml" || lo[j]) : !!co[v] : p.namespaceURI === bi ? y.namespaceURI === qt ? v === "math" : y.namespaceURI === Ti ? v === "math" && ho[j] : !!uo[v] : p.namespaceURI === qt ? y.namespaceURI === Ti && !ho[j] || y.namespaceURI === bi && !lo[j] ? !1 : !uo[v] && (fh[v] || !co[v]) : !!(ze === "application/xhtml+xml" && Or[p.namespaceURI]) : !1;
  }, se = function(p) {
    je(e.removed, {
      element: p
    });
    try {
      p.parentNode.removeChild(p);
    } catch {
      p.remove();
    }
  }, Ir = function(p, y) {
    try {
      je(e.removed, {
        attribute: y.getAttributeNode(p),
        from: y
      });
    } catch {
      je(e.removed, {
        attribute: null,
        from: y
      });
    }
    if (y.removeAttribute(p), p === "is" && !I[p])
      if (xe || Ci)
        try {
          se(y);
        } catch {
        }
      else
        try {
          y.setAttribute(p, "");
        } catch {
        }
  }, fo = function(p) {
    let y = null, v = null;
    if (Jt)
      p = "<remove></remove>" + p;
    else {
      const nt = od(p, /^[\r\n\t ]+/);
      v = nt && nt[0];
    }
    ze === "application/xhtml+xml" && ke === qt && (p = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + p + "</body></html>");
    const j = R ? R.createHTML(p) : p;
    if (ke === qt)
      try {
        y = new c().parseFromString(j, ze);
      } catch {
      }
    if (!y || !y.documentElement) {
      y = G.createDocument(ke, "template", null);
      try {
        y.documentElement.innerHTML = Mr ? X : j;
      } catch {
      }
    }
    const rt = y.body || y.documentElement;
    return p && v && rt.insertBefore(i.createTextNode(v), rt.childNodes[0] || null), ke === qt ? oe.call(y, it ? "html" : "body")[0] : it ? y.documentElement : rt;
  }, po = function(p) {
    return V.call(
      p.ownerDocument || p,
      p,
      // eslint-disable-next-line no-bitwise
      h.SHOW_ELEMENT | h.SHOW_COMMENT | h.SHOW_TEXT,
      null
    );
  }, ph = function(p) {
    return p instanceof f && (typeof p.nodeName != "string" || typeof p.textContent != "string" || typeof p.removeChild != "function" || !(p.attributes instanceof u) || typeof p.removeAttribute != "function" || typeof p.setAttribute != "function" || typeof p.namespaceURI != "string" || typeof p.insertBefore != "function" || typeof p.hasChildNodes != "function");
  }, go = function(p) {
    return typeof a == "function" && p instanceof a;
  }, zt = function(p, y, v) {
    P[p] && wi(P[p], (j) => {
      j.call(e, y, v, Se);
    });
  }, mo = function(p) {
    let y = null;
    if (zt("beforeSanitizeElements", p, null), ph(p))
      return se(p), !0;
    const v = tt(p.nodeName);
    if (zt("uponSanitizeElement", p, {
      tagName: v,
      allowedTags: b
    }), p.hasChildNodes() && !go(p.firstElementChild) && mt(/<[/\w]/g, p.innerHTML) && mt(/<[/\w]/g, p.textContent))
      return se(p), !0;
    if (!b[v] || K[v]) {
      if (!K[v] && _o(v) && (N.tagNameCheck instanceof RegExp && mt(N.tagNameCheck, v) || N.tagNameCheck instanceof Function && N.tagNameCheck(v)))
        return !1;
      if (Lr && !Te[v]) {
        const j = T(p) || p.parentNode, rt = z(p) || p.childNodes;
        if (rt && j) {
          const nt = rt.length;
          for (let ut = nt - 1; ut >= 0; --ut)
            j.insertBefore(S(rt[ut], !0), O(p));
        }
      }
      return se(p), !0;
    }
    return p instanceof l && !dh(p) || (v === "noscript" || v === "noembed" || v === "noframes") && mt(/<\/no(script|embed|frames)/i, p.innerHTML) ? (se(p), !0) : (Z && p.nodeType === 3 && (y = p.textContent, wi([W, Ct, Nt], (j) => {
      y = Ue(y, j, " ");
    }), p.textContent !== y && (je(e.removed, {
      element: p.cloneNode()
    }), p.textContent = y)), zt("afterSanitizeElements", p, null), !1);
  }, yo = function(p, y, v) {
    if (eo && (y === "id" || y === "name") && (v in i || v in uh))
      return !1;
    if (!(St && !et[y] && mt(M, y))) {
      if (!(Rt && mt(k, y))) {
        if (!I[y] || et[y]) {
          if (
            // First condition does a very basic check if a) it's basically a valid custom element tagname AND
            // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
            // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
            !(_o(p) && (N.tagNameCheck instanceof RegExp && mt(N.tagNameCheck, p) || N.tagNameCheck instanceof Function && N.tagNameCheck(p)) && (N.attributeNameCheck instanceof RegExp && mt(N.attributeNameCheck, y) || N.attributeNameCheck instanceof Function && N.attributeNameCheck(y)) || // Alternative, second condition checks if it's an `is`-attribute, AND
            // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
            y === "is" && N.allowCustomizedBuiltInElements && (N.tagNameCheck instanceof RegExp && mt(N.tagNameCheck, v) || N.tagNameCheck instanceof Function && N.tagNameCheck(v)))
          )
            return !1;
        } else if (!Er[y]) {
          if (!mt(x, Ue(v, w, ""))) {
            if (!((y === "src" || y === "xlink:href" || y === "href") && p !== "script" && sd(v, "data:") === 0 && no[p])) {
              if (!(Zt && !mt(C, Ue(v, w, "")))) {
                if (v)
                  return !1;
              }
            }
          }
        }
      }
    }
    return !0;
  }, _o = function(p) {
    return p !== "annotation-xml" && p.indexOf("-") > 0;
  }, Co = function(p) {
    zt("beforeSanitizeAttributes", p, null);
    const {
      attributes: y
    } = p;
    if (!y)
      return;
    const v = {
      attrName: "",
      attrValue: "",
      keepAttr: !0,
      allowedAttributes: I
    };
    let j = y.length;
    for (; j--; ) {
      const rt = y[j], {
        name: nt,
        namespaceURI: ut,
        value: ae
      } = rt, We = tt(nt);
      let ft = nt === "value" ? ae : ad(ae);
      if (v.attrName = We, v.attrValue = ft, v.keepAttr = !0, v.forceKeepAttr = void 0, zt("uponSanitizeAttribute", p, v), ft = v.attrValue, v.forceKeepAttr || (Ir(nt, p), !v.keepAttr))
        continue;
      if (!Lt && mt(/\/>/i, ft)) {
        Ir(nt, p);
        continue;
      }
      Z && wi([W, Ct, Nt], (bo) => {
        ft = Ue(ft, bo, " ");
      });
      const xo = tt(p.nodeName);
      if (yo(xo, We, ft)) {
        if (io && (We === "id" || We === "name") && (Ir(nt, p), ft = ah + ft), R && typeof d == "object" && typeof d.getAttributeType == "function" && !ut)
          switch (d.getAttributeType(xo, We)) {
            case "TrustedHTML": {
              ft = R.createHTML(ft);
              break;
            }
            case "TrustedScriptURL": {
              ft = R.createScriptURL(ft);
              break;
            }
          }
        try {
          ut ? p.setAttributeNS(ut, nt, ft) : p.setAttribute(nt, ft), Uo(e.removed);
        } catch {
        }
      }
    }
    zt("afterSanitizeAttributes", p, null);
  }, gh = function B(p) {
    let y = null;
    const v = po(p);
    for (zt("beforeSanitizeShadowDOM", p, null); y = v.nextNode(); )
      zt("uponSanitizeShadowNode", y, null), !mo(y) && (y.content instanceof o && B(y.content), Co(y));
    zt("afterSanitizeShadowDOM", p, null);
  };
  return e.sanitize = function(B) {
    let p = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, y = null, v = null, j = null, rt = null;
    if (Mr = !B, Mr && (B = "<!-->"), typeof B != "string" && !go(B))
      if (typeof B.toString == "function") {
        if (B = B.toString(), typeof B != "string")
          throw Ye("dirty is not a string, aborting");
      } else
        throw Ye("toString is not a function");
    if (!e.isSupported)
      return B;
    if (Pt || $r(p), e.removed = [], typeof B == "string" && (qe = !1), qe) {
      if (B.nodeName) {
        const ae = tt(B.nodeName);
        if (!b[ae] || K[ae])
          throw Ye("root node is forbidden and cannot be sanitized in-place");
      }
    } else if (B instanceof a)
      y = fo("<!---->"), v = y.ownerDocument.importNode(B, !0), v.nodeType === 1 && v.nodeName === "BODY" || v.nodeName === "HTML" ? y = v : y.appendChild(v);
    else {
      if (!xe && !Z && !it && // eslint-disable-next-line unicorn/prefer-includes
      B.indexOf("<") === -1)
        return R && xi ? R.createHTML(B) : B;
      if (y = fo(B), !y)
        return xe ? null : xi ? X : "";
    }
    y && Jt && se(y.firstChild);
    const nt = po(qe ? B : y);
    for (; j = nt.nextNode(); )
      mo(j) || (j.content instanceof o && gh(j.content), Co(j));
    if (qe)
      return B;
    if (xe) {
      if (Ci)
        for (rt = H.call(y.ownerDocument); y.firstChild; )
          rt.appendChild(y.firstChild);
      else
        rt = y;
      return (I.shadowroot || I.shadowrootmode) && (rt = Kt.call(r, rt, !0)), rt;
    }
    let ut = it ? y.outerHTML : y.innerHTML;
    return it && b["!doctype"] && y.ownerDocument && y.ownerDocument.doctype && y.ownerDocument.doctype.name && mt(wa, y.ownerDocument.doctype.name) && (ut = "<!DOCTYPE " + y.ownerDocument.doctype.name + `>
` + ut), Z && wi([W, Ct, Nt], (ae) => {
      ut = Ue(ut, ae, " ");
    }), R && xi ? R.createHTML(ut) : ut;
  }, e.setConfig = function() {
    let B = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    $r(B), Pt = !0;
  }, e.clearConfig = function() {
    Se = null, Pt = !1;
  }, e.isValidAttribute = function(B, p, y) {
    Se || $r({});
    const v = tt(B), j = tt(p);
    return yo(v, j, y);
  }, e.addHook = function(B, p) {
    typeof p == "function" && (P[B] = P[B] || [], je(P[B], p));
  }, e.removeHook = function(B) {
    if (P[B])
      return Uo(P[B]);
  }, e.removeHooks = function(B) {
    P[B] && (P[B] = []);
  }, e.removeAllHooks = function() {
    P = {};
  }, e;
}
var Ee = Ba();
const gi = /<br\s*\/?>/gi, bd = (t) => t ? Aa(t).replace(/\\n/g, "#br#").split("#br#") : [""], Td = (() => {
  let t = !1;
  return () => {
    t || (kd(), t = !0);
  };
})();
function kd() {
  const t = "data-temp-href-target";
  Ee.addHook("beforeSanitizeAttributes", (e) => {
    e.tagName === "A" && e.hasAttribute("target") && e.setAttribute(t, e.getAttribute("target") || "");
  }), Ee.addHook("afterSanitizeAttributes", (e) => {
    e.tagName === "A" && e.hasAttribute(t) && (e.setAttribute("target", e.getAttribute(t) || ""), e.removeAttribute(t), e.getAttribute("target") === "_blank" && e.setAttribute("rel", "noopener"));
  });
}
const Fa = (t) => (Td(), Ee.sanitize(t)), Zo = (t, e) => {
  var i;
  if (((i = e.flowchart) == null ? void 0 : i.htmlLabels) !== !1) {
    const r = e.securityLevel;
    r === "antiscript" || r === "strict" ? t = Fa(t) : r !== "loose" && (t = Aa(t), t = t.replace(/</g, "&lt;").replace(/>/g, "&gt;"), t = t.replace(/=/g, "&equals;"), t = Bd(t));
  }
  return t;
}, ai = (t, e) => t && (e.dompurifyConfig ? t = Ee.sanitize(Zo(t, e), e.dompurifyConfig).toString() : t = Ee.sanitize(Zo(t, e), {
  FORBID_TAGS: ["style"]
}).toString(), t), Sd = (t, e) => typeof t == "string" ? ai(t, e) : t.flat().map((i) => ai(i, e)), vd = (t) => gi.test(t), wd = (t) => t.split(gi), Bd = (t) => t.replace(/#br#/g, "<br/>"), Aa = (t) => t.replace(gi, "#br#"), Fd = (t) => {
  let e = "";
  return t && (e = window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.search, e = e.replaceAll(/\(/g, "\\("), e = e.replaceAll(/\)/g, "\\)")), e;
}, La = (t) => !(t === !1 || ["false", "null", "0"].includes(String(t).trim().toLowerCase())), Ad = function(...t) {
  const e = t.filter((i) => !isNaN(i));
  return Math.max(...e);
}, Ld = function(...t) {
  const e = t.filter((i) => !isNaN(i));
  return Math.min(...e);
}, C1 = function(t) {
  const e = t.split(/(,)/), i = [];
  for (let r = 0; r < e.length; r++) {
    let n = e[r];
    if (n === "," && r > 0 && r + 1 < e.length) {
      const o = e[r - 1], s = e[r + 1];
      Ed(o, s) && (n = o + "," + s, r++, i.pop());
    }
    i.push(Md(n));
  }
  return i.join("");
}, ln = (t, e) => Math.max(0, t.split(e).length - 1), Ed = (t, e) => {
  const i = ln(t, "~"), r = ln(e, "~");
  return i === 1 && r === 1;
}, Md = (t) => {
  const e = ln(t, "~");
  let i = !1;
  if (e <= 1)
    return t;
  e % 2 !== 0 && t.startsWith("~") && (t = t.substring(1), i = !0);
  const r = [...t];
  let n = r.indexOf("~"), o = r.lastIndexOf("~");
  for (; n !== -1 && o !== -1 && n !== o; )
    r[n] = "<", r[o] = ">", n = r.indexOf("~"), o = r.lastIndexOf("~");
  return i && r.unshift("~"), r.join("");
}, Jo = () => window.MathMLElement !== void 0, hn = /\$\$(.*)\$\$/g, Qo = (t) => {
  var e;
  return (((e = t.match(hn)) == null ? void 0 : e.length) ?? 0) > 0;
}, x1 = async (t, e) => {
  t = await Od(t, e);
  const i = document.createElement("div");
  i.innerHTML = t, i.id = "katex-temp", i.style.visibility = "hidden", i.style.position = "absolute", i.style.top = "0";
  const r = document.querySelector("body");
  r == null || r.insertAdjacentElement("beforeend", i);
  const n = { width: i.clientWidth, height: i.clientHeight };
  return i.remove(), n;
}, Od = async (t, e) => {
  if (!Qo(t))
    return t;
  if (!Jo() && !e.legacyMathML)
    return t.replace(hn, "MathML is unsupported in this environment.");
  const { default: i } = await import("./katex-d90b6d29.js");
  return t.split(gi).map(
    (r) => Qo(r) ? `
            <div style="display: flex; align-items: center; justify-content: center; white-space: nowrap;">
              ${r}
            </div>
          ` : `<div>${r}</div>`
  ).join("").replace(
    hn,
    (r, n) => i.renderToString(n, {
      throwOnError: !0,
      displayMode: !0,
      output: Jo() ? "mathml" : "htmlAndMathml"
    }).replace(/\n/g, " ").replace(/<annotation.*<\/annotation>/g, "")
  );
}, $n = {
  getRows: bd,
  sanitizeText: ai,
  sanitizeTextOrArray: Sd,
  hasBreaks: vd,
  splitBreaks: wd,
  lineBreakRegex: gi,
  removeScript: Fa,
  getUrl: Fd,
  evaluate: La,
  getMax: Ad,
  getMin: Ld
}, Ni = {
  /* CLAMP */
  min: {
    r: 0,
    g: 0,
    b: 0,
    s: 0,
    l: 0,
    a: 0
  },
  max: {
    r: 255,
    g: 255,
    b: 255,
    h: 360,
    s: 100,
    l: 100,
    a: 1
  },
  clamp: {
    r: (t) => t >= 255 ? 255 : t < 0 ? 0 : t,
    g: (t) => t >= 255 ? 255 : t < 0 ? 0 : t,
    b: (t) => t >= 255 ? 255 : t < 0 ? 0 : t,
    h: (t) => t % 360,
    s: (t) => t >= 100 ? 100 : t < 0 ? 0 : t,
    l: (t) => t >= 100 ? 100 : t < 0 ? 0 : t,
    a: (t) => t >= 1 ? 1 : t < 0 ? 0 : t
  },
  /* CONVERSION */
  //SOURCE: https://planetcalc.com/7779
  toLinear: (t) => {
    const e = t / 255;
    return t > 0.03928 ? Math.pow((e + 0.055) / 1.055, 2.4) : e / 12.92;
  },
  //SOURCE: https://gist.github.com/mjackson/5311256
  hue2rgb: (t, e, i) => (i < 0 && (i += 1), i > 1 && (i -= 1), i < 1 / 6 ? t + (e - t) * 6 * i : i < 1 / 2 ? e : i < 2 / 3 ? t + (e - t) * (2 / 3 - i) * 6 : t),
  hsl2rgb: ({ h: t, s: e, l: i }, r) => {
    if (!e)
      return i * 2.55;
    t /= 360, e /= 100, i /= 100;
    const n = i < 0.5 ? i * (1 + e) : i + e - i * e, o = 2 * i - n;
    switch (r) {
      case "r":
        return Ni.hue2rgb(o, n, t + 1 / 3) * 255;
      case "g":
        return Ni.hue2rgb(o, n, t) * 255;
      case "b":
        return Ni.hue2rgb(o, n, t - 1 / 3) * 255;
    }
  },
  rgb2hsl: ({ r: t, g: e, b: i }, r) => {
    t /= 255, e /= 255, i /= 255;
    const n = Math.max(t, e, i), o = Math.min(t, e, i), s = (n + o) / 2;
    if (r === "l")
      return s * 100;
    if (n === o)
      return 0;
    const a = n - o, l = s > 0.5 ? a / (2 - n - o) : a / (n + o);
    if (r === "s")
      return l * 100;
    switch (n) {
      case t:
        return ((e - i) / a + (e < i ? 6 : 0)) * 60;
      case e:
        return ((i - t) / a + 2) * 60;
      case i:
        return ((t - e) / a + 4) * 60;
      default:
        return -1;
    }
  }
}, $d = Ni, Id = {
  /* API */
  clamp: (t, e, i) => e > i ? Math.min(e, Math.max(i, t)) : Math.min(i, Math.max(e, t)),
  round: (t) => Math.round(t * 1e10) / 1e10
}, Dd = Id, Nd = {
  /* API */
  dec2hex: (t) => {
    const e = Math.round(t).toString(16);
    return e.length > 1 ? e : `0${e}`;
  }
}, Rd = Nd, Pd = {
  channel: $d,
  lang: Dd,
  unit: Rd
}, $ = Pd, Qt = {};
for (let t = 0; t <= 255; t++)
  Qt[t] = $.unit.dec2hex(t);
const ot = {
  ALL: 0,
  RGB: 1,
  HSL: 2
};
class qd {
  constructor() {
    this.type = ot.ALL;
  }
  /* API */
  get() {
    return this.type;
  }
  set(e) {
    if (this.type && this.type !== e)
      throw new Error("Cannot change both RGB and HSL channels at the same time");
    this.type = e;
  }
  reset() {
    this.type = ot.ALL;
  }
  is(e) {
    return this.type === e;
  }
}
const zd = qd;
class Wd {
  /* CONSTRUCTOR */
  constructor(e, i) {
    this.color = i, this.changed = !1, this.data = e, this.type = new zd();
  }
  /* API */
  set(e, i) {
    return this.color = i, this.changed = !1, this.data = e, this.type.type = ot.ALL, this;
  }
  /* HELPERS */
  _ensureHSL() {
    const e = this.data, { h: i, s: r, l: n } = e;
    i === void 0 && (e.h = $.channel.rgb2hsl(e, "h")), r === void 0 && (e.s = $.channel.rgb2hsl(e, "s")), n === void 0 && (e.l = $.channel.rgb2hsl(e, "l"));
  }
  _ensureRGB() {
    const e = this.data, { r: i, g: r, b: n } = e;
    i === void 0 && (e.r = $.channel.hsl2rgb(e, "r")), r === void 0 && (e.g = $.channel.hsl2rgb(e, "g")), n === void 0 && (e.b = $.channel.hsl2rgb(e, "b"));
  }
  /* GETTERS */
  get r() {
    const e = this.data, i = e.r;
    return !this.type.is(ot.HSL) && i !== void 0 ? i : (this._ensureHSL(), $.channel.hsl2rgb(e, "r"));
  }
  get g() {
    const e = this.data, i = e.g;
    return !this.type.is(ot.HSL) && i !== void 0 ? i : (this._ensureHSL(), $.channel.hsl2rgb(e, "g"));
  }
  get b() {
    const e = this.data, i = e.b;
    return !this.type.is(ot.HSL) && i !== void 0 ? i : (this._ensureHSL(), $.channel.hsl2rgb(e, "b"));
  }
  get h() {
    const e = this.data, i = e.h;
    return !this.type.is(ot.RGB) && i !== void 0 ? i : (this._ensureRGB(), $.channel.rgb2hsl(e, "h"));
  }
  get s() {
    const e = this.data, i = e.s;
    return !this.type.is(ot.RGB) && i !== void 0 ? i : (this._ensureRGB(), $.channel.rgb2hsl(e, "s"));
  }
  get l() {
    const e = this.data, i = e.l;
    return !this.type.is(ot.RGB) && i !== void 0 ? i : (this._ensureRGB(), $.channel.rgb2hsl(e, "l"));
  }
  get a() {
    return this.data.a;
  }
  /* SETTERS */
  set r(e) {
    this.type.set(ot.RGB), this.changed = !0, this.data.r = e;
  }
  set g(e) {
    this.type.set(ot.RGB), this.changed = !0, this.data.g = e;
  }
  set b(e) {
    this.type.set(ot.RGB), this.changed = !0, this.data.b = e;
  }
  set h(e) {
    this.type.set(ot.HSL), this.changed = !0, this.data.h = e;
  }
  set s(e) {
    this.type.set(ot.HSL), this.changed = !0, this.data.s = e;
  }
  set l(e) {
    this.type.set(ot.HSL), this.changed = !0, this.data.l = e;
  }
  set a(e) {
    this.changed = !0, this.data.a = e;
  }
}
const Hd = Wd, jd = new Hd({ r: 0, g: 0, b: 0, a: 0 }, "transparent"), yr = jd, Ea = {
  /* VARIABLES */
  re: /^#((?:[a-f0-9]{2}){2,4}|[a-f0-9]{3})$/i,
  /* API */
  parse: (t) => {
    if (t.charCodeAt(0) !== 35)
      return;
    const e = t.match(Ea.re);
    if (!e)
      return;
    const i = e[1], r = parseInt(i, 16), n = i.length, o = n % 4 === 0, s = n > 4, a = s ? 1 : 17, l = s ? 8 : 4, h = o ? 0 : -1, u = s ? 255 : 15;
    return yr.set({
      r: (r >> l * (h + 3) & u) * a,
      g: (r >> l * (h + 2) & u) * a,
      b: (r >> l * (h + 1) & u) * a,
      a: o ? (r & u) * a / 255 : 1
    }, t);
  },
  stringify: (t) => {
    const { r: e, g: i, b: r, a: n } = t;
    return n < 1 ? `#${Qt[Math.round(e)]}${Qt[Math.round(i)]}${Qt[Math.round(r)]}${Qt[Math.round(n * 255)]}` : `#${Qt[Math.round(e)]}${Qt[Math.round(i)]}${Qt[Math.round(r)]}`;
  }
}, Ze = Ea, Ri = {
  /* VARIABLES */
  re: /^hsla?\(\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e-?\d+)?(?:deg|grad|rad|turn)?)\s*?(?:,|\s)\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e-?\d+)?%)\s*?(?:,|\s)\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e-?\d+)?%)(?:\s*?(?:,|\/)\s*?\+?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e-?\d+)?(%)?))?\s*?\)$/i,
  hueRe: /^(.+?)(deg|grad|rad|turn)$/i,
  /* HELPERS */
  _hue2deg: (t) => {
    const e = t.match(Ri.hueRe);
    if (e) {
      const [, i, r] = e;
      switch (r) {
        case "grad":
          return $.channel.clamp.h(parseFloat(i) * 0.9);
        case "rad":
          return $.channel.clamp.h(parseFloat(i) * 180 / Math.PI);
        case "turn":
          return $.channel.clamp.h(parseFloat(i) * 360);
      }
    }
    return $.channel.clamp.h(parseFloat(t));
  },
  /* API */
  parse: (t) => {
    const e = t.charCodeAt(0);
    if (e !== 104 && e !== 72)
      return;
    const i = t.match(Ri.re);
    if (!i)
      return;
    const [, r, n, o, s, a] = i;
    return yr.set({
      h: Ri._hue2deg(r),
      s: $.channel.clamp.s(parseFloat(n)),
      l: $.channel.clamp.l(parseFloat(o)),
      a: s ? $.channel.clamp.a(a ? parseFloat(s) / 100 : parseFloat(s)) : 1
    }, t);
  },
  stringify: (t) => {
    const { h: e, s: i, l: r, a: n } = t;
    return n < 1 ? `hsla(${$.lang.round(e)}, ${$.lang.round(i)}%, ${$.lang.round(r)}%, ${n})` : `hsl(${$.lang.round(e)}, ${$.lang.round(i)}%, ${$.lang.round(r)}%)`;
  }
}, Ai = Ri, Pi = {
  /* VARIABLES */
  colors: {
    aliceblue: "#f0f8ff",
    antiquewhite: "#faebd7",
    aqua: "#00ffff",
    aquamarine: "#7fffd4",
    azure: "#f0ffff",
    beige: "#f5f5dc",
    bisque: "#ffe4c4",
    black: "#000000",
    blanchedalmond: "#ffebcd",
    blue: "#0000ff",
    blueviolet: "#8a2be2",
    brown: "#a52a2a",
    burlywood: "#deb887",
    cadetblue: "#5f9ea0",
    chartreuse: "#7fff00",
    chocolate: "#d2691e",
    coral: "#ff7f50",
    cornflowerblue: "#6495ed",
    cornsilk: "#fff8dc",
    crimson: "#dc143c",
    cyanaqua: "#00ffff",
    darkblue: "#00008b",
    darkcyan: "#008b8b",
    darkgoldenrod: "#b8860b",
    darkgray: "#a9a9a9",
    darkgreen: "#006400",
    darkgrey: "#a9a9a9",
    darkkhaki: "#bdb76b",
    darkmagenta: "#8b008b",
    darkolivegreen: "#556b2f",
    darkorange: "#ff8c00",
    darkorchid: "#9932cc",
    darkred: "#8b0000",
    darksalmon: "#e9967a",
    darkseagreen: "#8fbc8f",
    darkslateblue: "#483d8b",
    darkslategray: "#2f4f4f",
    darkslategrey: "#2f4f4f",
    darkturquoise: "#00ced1",
    darkviolet: "#9400d3",
    deeppink: "#ff1493",
    deepskyblue: "#00bfff",
    dimgray: "#696969",
    dimgrey: "#696969",
    dodgerblue: "#1e90ff",
    firebrick: "#b22222",
    floralwhite: "#fffaf0",
    forestgreen: "#228b22",
    fuchsia: "#ff00ff",
    gainsboro: "#dcdcdc",
    ghostwhite: "#f8f8ff",
    gold: "#ffd700",
    goldenrod: "#daa520",
    gray: "#808080",
    green: "#008000",
    greenyellow: "#adff2f",
    grey: "#808080",
    honeydew: "#f0fff0",
    hotpink: "#ff69b4",
    indianred: "#cd5c5c",
    indigo: "#4b0082",
    ivory: "#fffff0",
    khaki: "#f0e68c",
    lavender: "#e6e6fa",
    lavenderblush: "#fff0f5",
    lawngreen: "#7cfc00",
    lemonchiffon: "#fffacd",
    lightblue: "#add8e6",
    lightcoral: "#f08080",
    lightcyan: "#e0ffff",
    lightgoldenrodyellow: "#fafad2",
    lightgray: "#d3d3d3",
    lightgreen: "#90ee90",
    lightgrey: "#d3d3d3",
    lightpink: "#ffb6c1",
    lightsalmon: "#ffa07a",
    lightseagreen: "#20b2aa",
    lightskyblue: "#87cefa",
    lightslategray: "#778899",
    lightslategrey: "#778899",
    lightsteelblue: "#b0c4de",
    lightyellow: "#ffffe0",
    lime: "#00ff00",
    limegreen: "#32cd32",
    linen: "#faf0e6",
    magenta: "#ff00ff",
    maroon: "#800000",
    mediumaquamarine: "#66cdaa",
    mediumblue: "#0000cd",
    mediumorchid: "#ba55d3",
    mediumpurple: "#9370db",
    mediumseagreen: "#3cb371",
    mediumslateblue: "#7b68ee",
    mediumspringgreen: "#00fa9a",
    mediumturquoise: "#48d1cc",
    mediumvioletred: "#c71585",
    midnightblue: "#191970",
    mintcream: "#f5fffa",
    mistyrose: "#ffe4e1",
    moccasin: "#ffe4b5",
    navajowhite: "#ffdead",
    navy: "#000080",
    oldlace: "#fdf5e6",
    olive: "#808000",
    olivedrab: "#6b8e23",
    orange: "#ffa500",
    orangered: "#ff4500",
    orchid: "#da70d6",
    palegoldenrod: "#eee8aa",
    palegreen: "#98fb98",
    paleturquoise: "#afeeee",
    palevioletred: "#db7093",
    papayawhip: "#ffefd5",
    peachpuff: "#ffdab9",
    peru: "#cd853f",
    pink: "#ffc0cb",
    plum: "#dda0dd",
    powderblue: "#b0e0e6",
    purple: "#800080",
    rebeccapurple: "#663399",
    red: "#ff0000",
    rosybrown: "#bc8f8f",
    royalblue: "#4169e1",
    saddlebrown: "#8b4513",
    salmon: "#fa8072",
    sandybrown: "#f4a460",
    seagreen: "#2e8b57",
    seashell: "#fff5ee",
    sienna: "#a0522d",
    silver: "#c0c0c0",
    skyblue: "#87ceeb",
    slateblue: "#6a5acd",
    slategray: "#708090",
    slategrey: "#708090",
    snow: "#fffafa",
    springgreen: "#00ff7f",
    tan: "#d2b48c",
    teal: "#008080",
    thistle: "#d8bfd8",
    transparent: "#00000000",
    turquoise: "#40e0d0",
    violet: "#ee82ee",
    wheat: "#f5deb3",
    white: "#ffffff",
    whitesmoke: "#f5f5f5",
    yellow: "#ffff00",
    yellowgreen: "#9acd32"
  },
  /* API */
  parse: (t) => {
    t = t.toLowerCase();
    const e = Pi.colors[t];
    if (e)
      return Ze.parse(e);
  },
  stringify: (t) => {
    const e = Ze.stringify(t);
    for (const i in Pi.colors)
      if (Pi.colors[i] === e)
        return i;
  }
}, ts = Pi, Ma = {
  /* VARIABLES */
  re: /^rgba?\(\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e\d+)?(%?))\s*?(?:,|\s)\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e\d+)?(%?))\s*?(?:,|\s)\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e\d+)?(%?))(?:\s*?(?:,|\/)\s*?\+?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e\d+)?(%?)))?\s*?\)$/i,
  /* API */
  parse: (t) => {
    const e = t.charCodeAt(0);
    if (e !== 114 && e !== 82)
      return;
    const i = t.match(Ma.re);
    if (!i)
      return;
    const [, r, n, o, s, a, l, h, u] = i;
    return yr.set({
      r: $.channel.clamp.r(n ? parseFloat(r) * 2.55 : parseFloat(r)),
      g: $.channel.clamp.g(s ? parseFloat(o) * 2.55 : parseFloat(o)),
      b: $.channel.clamp.b(l ? parseFloat(a) * 2.55 : parseFloat(a)),
      a: h ? $.channel.clamp.a(u ? parseFloat(h) / 100 : parseFloat(h)) : 1
    }, t);
  },
  stringify: (t) => {
    const { r: e, g: i, b: r, a: n } = t;
    return n < 1 ? `rgba(${$.lang.round(e)}, ${$.lang.round(i)}, ${$.lang.round(r)}, ${$.lang.round(n)})` : `rgb(${$.lang.round(e)}, ${$.lang.round(i)}, ${$.lang.round(r)})`;
  }
}, Li = Ma, Ud = {
  /* VARIABLES */
  format: {
    keyword: ts,
    hex: Ze,
    rgb: Li,
    rgba: Li,
    hsl: Ai,
    hsla: Ai
  },
  /* API */
  parse: (t) => {
    if (typeof t != "string")
      return t;
    const e = Ze.parse(t) || Li.parse(t) || Ai.parse(t) || ts.parse(t);
    if (e)
      return e;
    throw new Error(`Unsupported color format: "${t}"`);
  },
  stringify: (t) => !t.changed && t.color ? t.color : t.type.is(ot.HSL) || t.data.r === void 0 ? Ai.stringify(t) : t.a < 1 || !Number.isInteger(t.r) || !Number.isInteger(t.g) || !Number.isInteger(t.b) ? Li.stringify(t) : Ze.stringify(t)
}, Ot = Ud, Yd = (t, e) => {
  const i = Ot.parse(t);
  for (const r in e)
    i[r] = $.channel.clamp[r](e[r]);
  return Ot.stringify(i);
}, Oa = Yd, Gd = (t, e, i = 0, r = 1) => {
  if (typeof t != "number")
    return Oa(t, { a: e });
  const n = yr.set({
    r: $.channel.clamp.r(t),
    g: $.channel.clamp.g(e),
    b: $.channel.clamp.b(i),
    a: $.channel.clamp.a(r)
  });
  return Ot.stringify(n);
}, Je = Gd, Vd = (t) => {
  const { r: e, g: i, b: r } = Ot.parse(t), n = 0.2126 * $.channel.toLinear(e) + 0.7152 * $.channel.toLinear(i) + 0.0722 * $.channel.toLinear(r);
  return $.lang.round(n);
}, Xd = Vd, Kd = (t) => Xd(t) >= 0.5, Zd = Kd, Jd = (t) => !Zd(t), mi = Jd, Qd = (t, e, i) => {
  const r = Ot.parse(t), n = r[e], o = $.channel.clamp[e](n + i);
  return n !== o && (r[e] = o), Ot.stringify(r);
}, $a = Qd, tp = (t, e) => $a(t, "l", e), F = tp, ep = (t, e) => $a(t, "l", -e), E = ep, ip = (t, e) => {
  const i = Ot.parse(t), r = {};
  for (const n in e)
    e[n] && (r[n] = i[n] + e[n]);
  return Oa(t, r);
}, g = ip, rp = (t, e, i = 50) => {
  const { r, g: n, b: o, a: s } = Ot.parse(t), { r: a, g: l, b: h, a: u } = Ot.parse(e), f = i / 100, c = f * 2 - 1, d = s - u, S = ((c * d === -1 ? c : (c + d) / (1 + c * d)) + 1) / 2, O = 1 - S, z = r * S + a * O, T = n * S + l * O, R = o * S + h * O, X = s * f + u * (1 - f);
  return Je(z, T, R, X);
}, np = rp, op = (t, e = 100) => {
  const i = Ot.parse(t);
  return i.r = 255 - i.r, i.g = 255 - i.g, i.b = 255 - i.b, np(i, t, e);
}, _ = op, ht = (t, e) => e ? g(t, { s: -40, l: 10 }) : g(t, { s: -40, l: -10 }), _r = "#ffffff", Cr = "#f2f2f2";
let sp = class {
  constructor() {
    this.background = "#f4f4f4", this.primaryColor = "#fff4dd", this.noteBkgColor = "#fff5ad", this.noteTextColor = "#333", this.THEME_COLOR_LIMIT = 12, this.fontFamily = '"trebuchet ms", verdana, arial, sans-serif', this.fontSize = "16px";
  }
  updateColors() {
    var i, r, n, o, s, a, l, h, u, f, c;
    if (this.primaryTextColor = this.primaryTextColor || (this.darkMode ? "#eee" : "#333"), this.secondaryColor = this.secondaryColor || g(this.primaryColor, { h: -120 }), this.tertiaryColor = this.tertiaryColor || g(this.primaryColor, { h: 180, l: 5 }), this.primaryBorderColor = this.primaryBorderColor || ht(this.primaryColor, this.darkMode), this.secondaryBorderColor = this.secondaryBorderColor || ht(this.secondaryColor, this.darkMode), this.tertiaryBorderColor = this.tertiaryBorderColor || ht(this.tertiaryColor, this.darkMode), this.noteBorderColor = this.noteBorderColor || ht(this.noteBkgColor, this.darkMode), this.noteBkgColor = this.noteBkgColor || "#fff5ad", this.noteTextColor = this.noteTextColor || "#333", this.secondaryTextColor = this.secondaryTextColor || _(this.secondaryColor), this.tertiaryTextColor = this.tertiaryTextColor || _(this.tertiaryColor), this.lineColor = this.lineColor || _(this.background), this.arrowheadColor = this.arrowheadColor || _(this.background), this.textColor = this.textColor || this.primaryTextColor, this.border2 = this.border2 || this.tertiaryBorderColor, this.nodeBkg = this.nodeBkg || this.primaryColor, this.mainBkg = this.mainBkg || this.primaryColor, this.nodeBorder = this.nodeBorder || this.primaryBorderColor, this.clusterBkg = this.clusterBkg || this.tertiaryColor, this.clusterBorder = this.clusterBorder || this.tertiaryBorderColor, this.defaultLinkColor = this.defaultLinkColor || this.lineColor, this.titleColor = this.titleColor || this.tertiaryTextColor, this.edgeLabelBackground = this.edgeLabelBackground || (this.darkMode ? E(this.secondaryColor, 30) : this.secondaryColor), this.nodeTextColor = this.nodeTextColor || this.primaryTextColor, this.actorBorder = this.actorBorder || this.primaryBorderColor, this.actorBkg = this.actorBkg || this.mainBkg, this.actorTextColor = this.actorTextColor || this.primaryTextColor, this.actorLineColor = this.actorLineColor || "grey", this.labelBoxBkgColor = this.labelBoxBkgColor || this.actorBkg, this.signalColor = this.signalColor || this.textColor, this.signalTextColor = this.signalTextColor || this.textColor, this.labelBoxBorderColor = this.labelBoxBorderColor || this.actorBorder, this.labelTextColor = this.labelTextColor || this.actorTextColor, this.loopTextColor = this.loopTextColor || this.actorTextColor, this.activationBorderColor = this.activationBorderColor || E(this.secondaryColor, 10), this.activationBkgColor = this.activationBkgColor || this.secondaryColor, this.sequenceNumberColor = this.sequenceNumberColor || _(this.lineColor), this.sectionBkgColor = this.sectionBkgColor || this.tertiaryColor, this.altSectionBkgColor = this.altSectionBkgColor || "white", this.sectionBkgColor = this.sectionBkgColor || this.secondaryColor, this.sectionBkgColor2 = this.sectionBkgColor2 || this.primaryColor, this.excludeBkgColor = this.excludeBkgColor || "#eeeeee", this.taskBorderColor = this.taskBorderColor || this.primaryBorderColor, this.taskBkgColor = this.taskBkgColor || this.primaryColor, this.activeTaskBorderColor = this.activeTaskBorderColor || this.primaryColor, this.activeTaskBkgColor = this.activeTaskBkgColor || F(this.primaryColor, 23), this.gridColor = this.gridColor || "lightgrey", this.doneTaskBkgColor = this.doneTaskBkgColor || "lightgrey", this.doneTaskBorderColor = this.doneTaskBorderColor || "grey", this.critBorderColor = this.critBorderColor || "#ff8888", this.critBkgColor = this.critBkgColor || "red", this.todayLineColor = this.todayLineColor || "red", this.taskTextColor = this.taskTextColor || this.textColor, this.taskTextOutsideColor = this.taskTextOutsideColor || this.textColor, this.taskTextLightColor = this.taskTextLightColor || this.textColor, this.taskTextColor = this.taskTextColor || this.primaryTextColor, this.taskTextDarkColor = this.taskTextDarkColor || this.textColor, this.taskTextClickableColor = this.taskTextClickableColor || "#003163", this.personBorder = this.personBorder || this.primaryBorderColor, this.personBkg = this.personBkg || this.mainBkg, this.transitionColor = this.transitionColor || this.lineColor, this.transitionLabelColor = this.transitionLabelColor || this.textColor, this.stateLabelColor = this.stateLabelColor || this.stateBkg || this.primaryTextColor, this.stateBkg = this.stateBkg || this.mainBkg, this.labelBackgroundColor = this.labelBackgroundColor || this.stateBkg, this.compositeBackground = this.compositeBackground || this.background || this.tertiaryColor, this.altBackground = this.altBackground || this.tertiaryColor, this.compositeTitleBackground = this.compositeTitleBackground || this.mainBkg, this.compositeBorder = this.compositeBorder || this.nodeBorder, this.innerEndBackground = this.nodeBorder, this.errorBkgColor = this.errorBkgColor || this.tertiaryColor, this.errorTextColor = this.errorTextColor || this.tertiaryTextColor, this.transitionColor = this.transitionColor || this.lineColor, this.specialStateColor = this.lineColor, this.cScale0 = this.cScale0 || this.primaryColor, this.cScale1 = this.cScale1 || this.secondaryColor, this.cScale2 = this.cScale2 || this.tertiaryColor, this.cScale3 = this.cScale3 || g(this.primaryColor, { h: 30 }), this.cScale4 = this.cScale4 || g(this.primaryColor, { h: 60 }), this.cScale5 = this.cScale5 || g(this.primaryColor, { h: 90 }), this.cScale6 = this.cScale6 || g(this.primaryColor, { h: 120 }), this.cScale7 = this.cScale7 || g(this.primaryColor, { h: 150 }), this.cScale8 = this.cScale8 || g(this.primaryColor, { h: 210, l: 150 }), this.cScale9 = this.cScale9 || g(this.primaryColor, { h: 270 }), this.cScale10 = this.cScale10 || g(this.primaryColor, { h: 300 }), this.cScale11 = this.cScale11 || g(this.primaryColor, { h: 330 }), this.darkMode)
      for (let d = 0; d < this.THEME_COLOR_LIMIT; d++)
        this["cScale" + d] = E(this["cScale" + d], 75);
    else
      for (let d = 0; d < this.THEME_COLOR_LIMIT; d++)
        this["cScale" + d] = E(this["cScale" + d], 25);
    for (let d = 0; d < this.THEME_COLOR_LIMIT; d++)
      this["cScaleInv" + d] = this["cScaleInv" + d] || _(this["cScale" + d]);
    for (let d = 0; d < this.THEME_COLOR_LIMIT; d++)
      this.darkMode ? this["cScalePeer" + d] = this["cScalePeer" + d] || F(this["cScale" + d], 10) : this["cScalePeer" + d] = this["cScalePeer" + d] || E(this["cScale" + d], 10);
    this.scaleLabelColor = this.scaleLabelColor || this.labelTextColor;
    for (let d = 0; d < this.THEME_COLOR_LIMIT; d++)
      this["cScaleLabel" + d] = this["cScaleLabel" + d] || this.scaleLabelColor;
    const e = this.darkMode ? -4 : -1;
    for (let d = 0; d < 5; d++)
      this["surface" + d] = this["surface" + d] || g(this.mainBkg, { h: 180, s: -15, l: e * (5 + d * 3) }), this["surfacePeer" + d] = this["surfacePeer" + d] || g(this.mainBkg, { h: 180, s: -15, l: e * (8 + d * 3) });
    this.classText = this.classText || this.textColor, this.fillType0 = this.fillType0 || this.primaryColor, this.fillType1 = this.fillType1 || this.secondaryColor, this.fillType2 = this.fillType2 || g(this.primaryColor, { h: 64 }), this.fillType3 = this.fillType3 || g(this.secondaryColor, { h: 64 }), this.fillType4 = this.fillType4 || g(this.primaryColor, { h: -64 }), this.fillType5 = this.fillType5 || g(this.secondaryColor, { h: -64 }), this.fillType6 = this.fillType6 || g(this.primaryColor, { h: 128 }), this.fillType7 = this.fillType7 || g(this.secondaryColor, { h: 128 }), this.pie1 = this.pie1 || this.primaryColor, this.pie2 = this.pie2 || this.secondaryColor, this.pie3 = this.pie3 || this.tertiaryColor, this.pie4 = this.pie4 || g(this.primaryColor, { l: -10 }), this.pie5 = this.pie5 || g(this.secondaryColor, { l: -10 }), this.pie6 = this.pie6 || g(this.tertiaryColor, { l: -10 }), this.pie7 = this.pie7 || g(this.primaryColor, { h: 60, l: -10 }), this.pie8 = this.pie8 || g(this.primaryColor, { h: -60, l: -10 }), this.pie9 = this.pie9 || g(this.primaryColor, { h: 120, l: 0 }), this.pie10 = this.pie10 || g(this.primaryColor, { h: 60, l: -20 }), this.pie11 = this.pie11 || g(this.primaryColor, { h: -60, l: -20 }), this.pie12 = this.pie12 || g(this.primaryColor, { h: 120, l: -10 }), this.pieTitleTextSize = this.pieTitleTextSize || "25px", this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor, this.pieSectionTextSize = this.pieSectionTextSize || "17px", this.pieSectionTextColor = this.pieSectionTextColor || this.textColor, this.pieLegendTextSize = this.pieLegendTextSize || "17px", this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor, this.pieStrokeColor = this.pieStrokeColor || "black", this.pieStrokeWidth = this.pieStrokeWidth || "2px", this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || "2px", this.pieOuterStrokeColor = this.pieOuterStrokeColor || "black", this.pieOpacity = this.pieOpacity || "0.7", this.quadrant1Fill = this.quadrant1Fill || this.primaryColor, this.quadrant2Fill = this.quadrant2Fill || g(this.primaryColor, { r: 5, g: 5, b: 5 }), this.quadrant3Fill = this.quadrant3Fill || g(this.primaryColor, { r: 10, g: 10, b: 10 }), this.quadrant4Fill = this.quadrant4Fill || g(this.primaryColor, { r: 15, g: 15, b: 15 }), this.quadrant1TextFill = this.quadrant1TextFill || this.primaryTextColor, this.quadrant2TextFill = this.quadrant2TextFill || g(this.primaryTextColor, { r: -5, g: -5, b: -5 }), this.quadrant3TextFill = this.quadrant3TextFill || g(this.primaryTextColor, { r: -10, g: -10, b: -10 }), this.quadrant4TextFill = this.quadrant4TextFill || g(this.primaryTextColor, { r: -15, g: -15, b: -15 }), this.quadrantPointFill = this.quadrantPointFill || mi(this.quadrant1Fill) ? F(this.quadrant1Fill) : E(this.quadrant1Fill), this.quadrantPointTextFill = this.quadrantPointTextFill || this.primaryTextColor, this.quadrantXAxisTextFill = this.quadrantXAxisTextFill || this.primaryTextColor, this.quadrantYAxisTextFill = this.quadrantYAxisTextFill || this.primaryTextColor, this.quadrantInternalBorderStrokeFill = this.quadrantInternalBorderStrokeFill || this.primaryBorderColor, this.quadrantExternalBorderStrokeFill = this.quadrantExternalBorderStrokeFill || this.primaryBorderColor, this.quadrantTitleFill = this.quadrantTitleFill || this.primaryTextColor, this.xyChart = {
      backgroundColor: ((i = this.xyChart) == null ? void 0 : i.backgroundColor) || this.background,
      titleColor: ((r = this.xyChart) == null ? void 0 : r.titleColor) || this.primaryTextColor,
      xAxisTitleColor: ((n = this.xyChart) == null ? void 0 : n.xAxisTitleColor) || this.primaryTextColor,
      xAxisLabelColor: ((o = this.xyChart) == null ? void 0 : o.xAxisLabelColor) || this.primaryTextColor,
      xAxisTickColor: ((s = this.xyChart) == null ? void 0 : s.xAxisTickColor) || this.primaryTextColor,
      xAxisLineColor: ((a = this.xyChart) == null ? void 0 : a.xAxisLineColor) || this.primaryTextColor,
      yAxisTitleColor: ((l = this.xyChart) == null ? void 0 : l.yAxisTitleColor) || this.primaryTextColor,
      yAxisLabelColor: ((h = this.xyChart) == null ? void 0 : h.yAxisLabelColor) || this.primaryTextColor,
      yAxisTickColor: ((u = this.xyChart) == null ? void 0 : u.yAxisTickColor) || this.primaryTextColor,
      yAxisLineColor: ((f = this.xyChart) == null ? void 0 : f.yAxisLineColor) || this.primaryTextColor,
      plotColorPalette: ((c = this.xyChart) == null ? void 0 : c.plotColorPalette) || "#FFF4DD,#FFD8B1,#FFA07A,#ECEFF1,#D6DBDF,#C3E0A8,#FFB6A4,#FFD74D,#738FA7,#FFFFF0"
    }, this.requirementBackground = this.requirementBackground || this.primaryColor, this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor, this.requirementBorderSize = this.requirementBorderSize || "1", this.requirementTextColor = this.requirementTextColor || this.primaryTextColor, this.relationColor = this.relationColor || this.lineColor, this.relationLabelBackground = this.relationLabelBackground || (this.darkMode ? E(this.secondaryColor, 30) : this.secondaryColor), this.relationLabelColor = this.relationLabelColor || this.actorTextColor, this.git0 = this.git0 || this.primaryColor, this.git1 = this.git1 || this.secondaryColor, this.git2 = this.git2 || this.tertiaryColor, this.git3 = this.git3 || g(this.primaryColor, { h: -30 }), this.git4 = this.git4 || g(this.primaryColor, { h: -60 }), this.git5 = this.git5 || g(this.primaryColor, { h: -90 }), this.git6 = this.git6 || g(this.primaryColor, { h: 60 }), this.git7 = this.git7 || g(this.primaryColor, { h: 120 }), this.darkMode ? (this.git0 = F(this.git0, 25), this.git1 = F(this.git1, 25), this.git2 = F(this.git2, 25), this.git3 = F(this.git3, 25), this.git4 = F(this.git4, 25), this.git5 = F(this.git5, 25), this.git6 = F(this.git6, 25), this.git7 = F(this.git7, 25)) : (this.git0 = E(this.git0, 25), this.git1 = E(this.git1, 25), this.git2 = E(this.git2, 25), this.git3 = E(this.git3, 25), this.git4 = E(this.git4, 25), this.git5 = E(this.git5, 25), this.git6 = E(this.git6, 25), this.git7 = E(this.git7, 25)), this.gitInv0 = this.gitInv0 || _(this.git0), this.gitInv1 = this.gitInv1 || _(this.git1), this.gitInv2 = this.gitInv2 || _(this.git2), this.gitInv3 = this.gitInv3 || _(this.git3), this.gitInv4 = this.gitInv4 || _(this.git4), this.gitInv5 = this.gitInv5 || _(this.git5), this.gitInv6 = this.gitInv6 || _(this.git6), this.gitInv7 = this.gitInv7 || _(this.git7), this.branchLabelColor = this.branchLabelColor || (this.darkMode ? "black" : this.labelTextColor), this.gitBranchLabel0 = this.gitBranchLabel0 || this.branchLabelColor, this.gitBranchLabel1 = this.gitBranchLabel1 || this.branchLabelColor, this.gitBranchLabel2 = this.gitBranchLabel2 || this.branchLabelColor, this.gitBranchLabel3 = this.gitBranchLabel3 || this.branchLabelColor, this.gitBranchLabel4 = this.gitBranchLabel4 || this.branchLabelColor, this.gitBranchLabel5 = this.gitBranchLabel5 || this.branchLabelColor, this.gitBranchLabel6 = this.gitBranchLabel6 || this.branchLabelColor, this.gitBranchLabel7 = this.gitBranchLabel7 || this.branchLabelColor, this.tagLabelColor = this.tagLabelColor || this.primaryTextColor, this.tagLabelBackground = this.tagLabelBackground || this.primaryColor, this.tagLabelBorder = this.tagBorder || this.primaryBorderColor, this.tagLabelFontSize = this.tagLabelFontSize || "10px", this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor, this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor, this.commitLabelFontSize = this.commitLabelFontSize || "10px", this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || _r, this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || Cr;
  }
  calculate(e) {
    if (typeof e != "object") {
      this.updateColors();
      return;
    }
    const i = Object.keys(e);
    i.forEach((r) => {
      this[r] = e[r];
    }), this.updateColors(), i.forEach((r) => {
      this[r] = e[r];
    });
  }
};
const ap = (t) => {
  const e = new sp();
  return e.calculate(t), e;
};
let lp = class {
  constructor() {
    this.background = "#333", this.primaryColor = "#1f2020", this.secondaryColor = F(this.primaryColor, 16), this.tertiaryColor = g(this.primaryColor, { h: -160 }), this.primaryBorderColor = _(this.background), this.secondaryBorderColor = ht(this.secondaryColor, this.darkMode), this.tertiaryBorderColor = ht(this.tertiaryColor, this.darkMode), this.primaryTextColor = _(this.primaryColor), this.secondaryTextColor = _(this.secondaryColor), this.tertiaryTextColor = _(this.tertiaryColor), this.lineColor = _(this.background), this.textColor = _(this.background), this.mainBkg = "#1f2020", this.secondBkg = "calculated", this.mainContrastColor = "lightgrey", this.darkTextColor = F(_("#323D47"), 10), this.lineColor = "calculated", this.border1 = "#81B1DB", this.border2 = Je(255, 255, 255, 0.25), this.arrowheadColor = "calculated", this.fontFamily = '"trebuchet ms", verdana, arial, sans-serif', this.fontSize = "16px", this.labelBackground = "#181818", this.textColor = "#ccc", this.THEME_COLOR_LIMIT = 12, this.nodeBkg = "calculated", this.nodeBorder = "calculated", this.clusterBkg = "calculated", this.clusterBorder = "calculated", this.defaultLinkColor = "calculated", this.titleColor = "#F9FFFE", this.edgeLabelBackground = "calculated", this.actorBorder = "calculated", this.actorBkg = "calculated", this.actorTextColor = "calculated", this.actorLineColor = "calculated", this.signalColor = "calculated", this.signalTextColor = "calculated", this.labelBoxBkgColor = "calculated", this.labelBoxBorderColor = "calculated", this.labelTextColor = "calculated", this.loopTextColor = "calculated", this.noteBorderColor = "calculated", this.noteBkgColor = "#fff5ad", this.noteTextColor = "calculated", this.activationBorderColor = "calculated", this.activationBkgColor = "calculated", this.sequenceNumberColor = "black", this.sectionBkgColor = E("#EAE8D9", 30), this.altSectionBkgColor = "calculated", this.sectionBkgColor2 = "#EAE8D9", this.excludeBkgColor = E(this.sectionBkgColor, 10), this.taskBorderColor = Je(255, 255, 255, 70), this.taskBkgColor = "calculated", this.taskTextColor = "calculated", this.taskTextLightColor = "calculated", this.taskTextOutsideColor = "calculated", this.taskTextClickableColor = "#003163", this.activeTaskBorderColor = Je(255, 255, 255, 50), this.activeTaskBkgColor = "#81B1DB", this.gridColor = "calculated", this.doneTaskBkgColor = "calculated", this.doneTaskBorderColor = "grey", this.critBorderColor = "#E83737", this.critBkgColor = "#E83737", this.taskTextDarkColor = "calculated", this.todayLineColor = "#DB5757", this.personBorder = this.primaryBorderColor, this.personBkg = this.mainBkg, this.labelColor = "calculated", this.errorBkgColor = "#a44141", this.errorTextColor = "#ddd";
  }
  updateColors() {
    var e, i, r, n, o, s, a, l, h, u, f;
    this.secondBkg = F(this.mainBkg, 16), this.lineColor = this.mainContrastColor, this.arrowheadColor = this.mainContrastColor, this.nodeBkg = this.mainBkg, this.nodeBorder = this.border1, this.clusterBkg = this.secondBkg, this.clusterBorder = this.border2, this.defaultLinkColor = this.lineColor, this.edgeLabelBackground = F(this.labelBackground, 25), this.actorBorder = this.border1, this.actorBkg = this.mainBkg, this.actorTextColor = this.mainContrastColor, this.actorLineColor = this.mainContrastColor, this.signalColor = this.mainContrastColor, this.signalTextColor = this.mainContrastColor, this.labelBoxBkgColor = this.actorBkg, this.labelBoxBorderColor = this.actorBorder, this.labelTextColor = this.mainContrastColor, this.loopTextColor = this.mainContrastColor, this.noteBorderColor = this.secondaryBorderColor, this.noteBkgColor = this.secondBkg, this.noteTextColor = this.secondaryTextColor, this.activationBorderColor = this.border1, this.activationBkgColor = this.secondBkg, this.altSectionBkgColor = this.background, this.taskBkgColor = F(this.mainBkg, 23), this.taskTextColor = this.darkTextColor, this.taskTextLightColor = this.mainContrastColor, this.taskTextOutsideColor = this.taskTextLightColor, this.gridColor = this.mainContrastColor, this.doneTaskBkgColor = this.mainContrastColor, this.taskTextDarkColor = this.darkTextColor, this.transitionColor = this.transitionColor || this.lineColor, this.transitionLabelColor = this.transitionLabelColor || this.textColor, this.stateLabelColor = this.stateLabelColor || this.stateBkg || this.primaryTextColor, this.stateBkg = this.stateBkg || this.mainBkg, this.labelBackgroundColor = this.labelBackgroundColor || this.stateBkg, this.compositeBackground = this.compositeBackground || this.background || this.tertiaryColor, this.altBackground = this.altBackground || "#555", this.compositeTitleBackground = this.compositeTitleBackground || this.mainBkg, this.compositeBorder = this.compositeBorder || this.nodeBorder, this.innerEndBackground = this.primaryBorderColor, this.specialStateColor = "#f4f4f4", this.errorBkgColor = this.errorBkgColor || this.tertiaryColor, this.errorTextColor = this.errorTextColor || this.tertiaryTextColor, this.fillType0 = this.primaryColor, this.fillType1 = this.secondaryColor, this.fillType2 = g(this.primaryColor, { h: 64 }), this.fillType3 = g(this.secondaryColor, { h: 64 }), this.fillType4 = g(this.primaryColor, { h: -64 }), this.fillType5 = g(this.secondaryColor, { h: -64 }), this.fillType6 = g(this.primaryColor, { h: 128 }), this.fillType7 = g(this.secondaryColor, { h: 128 }), this.cScale1 = this.cScale1 || "#0b0000", this.cScale2 = this.cScale2 || "#4d1037", this.cScale3 = this.cScale3 || "#3f5258", this.cScale4 = this.cScale4 || "#4f2f1b", this.cScale5 = this.cScale5 || "#6e0a0a", this.cScale6 = this.cScale6 || "#3b0048", this.cScale7 = this.cScale7 || "#995a01", this.cScale8 = this.cScale8 || "#154706", this.cScale9 = this.cScale9 || "#161722", this.cScale10 = this.cScale10 || "#00296f", this.cScale11 = this.cScale11 || "#01629c", this.cScale12 = this.cScale12 || "#010029", this.cScale0 = this.cScale0 || this.primaryColor, this.cScale1 = this.cScale1 || this.secondaryColor, this.cScale2 = this.cScale2 || this.tertiaryColor, this.cScale3 = this.cScale3 || g(this.primaryColor, { h: 30 }), this.cScale4 = this.cScale4 || g(this.primaryColor, { h: 60 }), this.cScale5 = this.cScale5 || g(this.primaryColor, { h: 90 }), this.cScale6 = this.cScale6 || g(this.primaryColor, { h: 120 }), this.cScale7 = this.cScale7 || g(this.primaryColor, { h: 150 }), this.cScale8 = this.cScale8 || g(this.primaryColor, { h: 210 }), this.cScale9 = this.cScale9 || g(this.primaryColor, { h: 270 }), this.cScale10 = this.cScale10 || g(this.primaryColor, { h: 300 }), this.cScale11 = this.cScale11 || g(this.primaryColor, { h: 330 });
    for (let c = 0; c < this.THEME_COLOR_LIMIT; c++)
      this["cScaleInv" + c] = this["cScaleInv" + c] || _(this["cScale" + c]);
    for (let c = 0; c < this.THEME_COLOR_LIMIT; c++)
      this["cScalePeer" + c] = this["cScalePeer" + c] || F(this["cScale" + c], 10);
    for (let c = 0; c < 5; c++)
      this["surface" + c] = this["surface" + c] || g(this.mainBkg, { h: 30, s: -30, l: -(-10 + c * 4) }), this["surfacePeer" + c] = this["surfacePeer" + c] || g(this.mainBkg, { h: 30, s: -30, l: -(-7 + c * 4) });
    this.scaleLabelColor = this.scaleLabelColor || (this.darkMode ? "black" : this.labelTextColor);
    for (let c = 0; c < this.THEME_COLOR_LIMIT; c++)
      this["cScaleLabel" + c] = this["cScaleLabel" + c] || this.scaleLabelColor;
    for (let c = 0; c < this.THEME_COLOR_LIMIT; c++)
      this["pie" + c] = this["cScale" + c];
    this.pieTitleTextSize = this.pieTitleTextSize || "25px", this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor, this.pieSectionTextSize = this.pieSectionTextSize || "17px", this.pieSectionTextColor = this.pieSectionTextColor || this.textColor, this.pieLegendTextSize = this.pieLegendTextSize || "17px", this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor, this.pieStrokeColor = this.pieStrokeColor || "black", this.pieStrokeWidth = this.pieStrokeWidth || "2px", this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || "2px", this.pieOuterStrokeColor = this.pieOuterStrokeColor || "black", this.pieOpacity = this.pieOpacity || "0.7", this.quadrant1Fill = this.quadrant1Fill || this.primaryColor, this.quadrant2Fill = this.quadrant2Fill || g(this.primaryColor, { r: 5, g: 5, b: 5 }), this.quadrant3Fill = this.quadrant3Fill || g(this.primaryColor, { r: 10, g: 10, b: 10 }), this.quadrant4Fill = this.quadrant4Fill || g(this.primaryColor, { r: 15, g: 15, b: 15 }), this.quadrant1TextFill = this.quadrant1TextFill || this.primaryTextColor, this.quadrant2TextFill = this.quadrant2TextFill || g(this.primaryTextColor, { r: -5, g: -5, b: -5 }), this.quadrant3TextFill = this.quadrant3TextFill || g(this.primaryTextColor, { r: -10, g: -10, b: -10 }), this.quadrant4TextFill = this.quadrant4TextFill || g(this.primaryTextColor, { r: -15, g: -15, b: -15 }), this.quadrantPointFill = this.quadrantPointFill || mi(this.quadrant1Fill) ? F(this.quadrant1Fill) : E(this.quadrant1Fill), this.quadrantPointTextFill = this.quadrantPointTextFill || this.primaryTextColor, this.quadrantXAxisTextFill = this.quadrantXAxisTextFill || this.primaryTextColor, this.quadrantYAxisTextFill = this.quadrantYAxisTextFill || this.primaryTextColor, this.quadrantInternalBorderStrokeFill = this.quadrantInternalBorderStrokeFill || this.primaryBorderColor, this.quadrantExternalBorderStrokeFill = this.quadrantExternalBorderStrokeFill || this.primaryBorderColor, this.quadrantTitleFill = this.quadrantTitleFill || this.primaryTextColor, this.xyChart = {
      backgroundColor: ((e = this.xyChart) == null ? void 0 : e.backgroundColor) || this.background,
      titleColor: ((i = this.xyChart) == null ? void 0 : i.titleColor) || this.primaryTextColor,
      xAxisTitleColor: ((r = this.xyChart) == null ? void 0 : r.xAxisTitleColor) || this.primaryTextColor,
      xAxisLabelColor: ((n = this.xyChart) == null ? void 0 : n.xAxisLabelColor) || this.primaryTextColor,
      xAxisTickColor: ((o = this.xyChart) == null ? void 0 : o.xAxisTickColor) || this.primaryTextColor,
      xAxisLineColor: ((s = this.xyChart) == null ? void 0 : s.xAxisLineColor) || this.primaryTextColor,
      yAxisTitleColor: ((a = this.xyChart) == null ? void 0 : a.yAxisTitleColor) || this.primaryTextColor,
      yAxisLabelColor: ((l = this.xyChart) == null ? void 0 : l.yAxisLabelColor) || this.primaryTextColor,
      yAxisTickColor: ((h = this.xyChart) == null ? void 0 : h.yAxisTickColor) || this.primaryTextColor,
      yAxisLineColor: ((u = this.xyChart) == null ? void 0 : u.yAxisLineColor) || this.primaryTextColor,
      plotColorPalette: ((f = this.xyChart) == null ? void 0 : f.plotColorPalette) || "#3498db,#2ecc71,#e74c3c,#f1c40f,#bdc3c7,#ffffff,#34495e,#9b59b6,#1abc9c,#e67e22"
    }, this.classText = this.primaryTextColor, this.requirementBackground = this.requirementBackground || this.primaryColor, this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor, this.requirementBorderSize = this.requirementBorderSize || "1", this.requirementTextColor = this.requirementTextColor || this.primaryTextColor, this.relationColor = this.relationColor || this.lineColor, this.relationLabelBackground = this.relationLabelBackground || (this.darkMode ? E(this.secondaryColor, 30) : this.secondaryColor), this.relationLabelColor = this.relationLabelColor || this.actorTextColor, this.git0 = F(this.secondaryColor, 20), this.git1 = F(this.pie2 || this.secondaryColor, 20), this.git2 = F(this.pie3 || this.tertiaryColor, 20), this.git3 = F(this.pie4 || g(this.primaryColor, { h: -30 }), 20), this.git4 = F(this.pie5 || g(this.primaryColor, { h: -60 }), 20), this.git5 = F(this.pie6 || g(this.primaryColor, { h: -90 }), 10), this.git6 = F(this.pie7 || g(this.primaryColor, { h: 60 }), 10), this.git7 = F(this.pie8 || g(this.primaryColor, { h: 120 }), 20), this.gitInv0 = this.gitInv0 || _(this.git0), this.gitInv1 = this.gitInv1 || _(this.git1), this.gitInv2 = this.gitInv2 || _(this.git2), this.gitInv3 = this.gitInv3 || _(this.git3), this.gitInv4 = this.gitInv4 || _(this.git4), this.gitInv5 = this.gitInv5 || _(this.git5), this.gitInv6 = this.gitInv6 || _(this.git6), this.gitInv7 = this.gitInv7 || _(this.git7), this.gitBranchLabel0 = this.gitBranchLabel0 || _(this.labelTextColor), this.gitBranchLabel1 = this.gitBranchLabel1 || this.labelTextColor, this.gitBranchLabel2 = this.gitBranchLabel2 || this.labelTextColor, this.gitBranchLabel3 = this.gitBranchLabel3 || _(this.labelTextColor), this.gitBranchLabel4 = this.gitBranchLabel4 || this.labelTextColor, this.gitBranchLabel5 = this.gitBranchLabel5 || this.labelTextColor, this.gitBranchLabel6 = this.gitBranchLabel6 || this.labelTextColor, this.gitBranchLabel7 = this.gitBranchLabel7 || this.labelTextColor, this.tagLabelColor = this.tagLabelColor || this.primaryTextColor, this.tagLabelBackground = this.tagLabelBackground || this.primaryColor, this.tagLabelBorder = this.tagBorder || this.primaryBorderColor, this.tagLabelFontSize = this.tagLabelFontSize || "10px", this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor, this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor, this.commitLabelFontSize = this.commitLabelFontSize || "10px", this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || F(this.background, 12), this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || F(this.background, 2);
  }
  calculate(e) {
    if (typeof e != "object") {
      this.updateColors();
      return;
    }
    const i = Object.keys(e);
    i.forEach((r) => {
      this[r] = e[r];
    }), this.updateColors(), i.forEach((r) => {
      this[r] = e[r];
    });
  }
};
const hp = (t) => {
  const e = new lp();
  return e.calculate(t), e;
};
let cp = class {
  constructor() {
    this.background = "#f4f4f4", this.primaryColor = "#ECECFF", this.secondaryColor = g(this.primaryColor, { h: 120 }), this.secondaryColor = "#ffffde", this.tertiaryColor = g(this.primaryColor, { h: -160 }), this.primaryBorderColor = ht(this.primaryColor, this.darkMode), this.secondaryBorderColor = ht(this.secondaryColor, this.darkMode), this.tertiaryBorderColor = ht(this.tertiaryColor, this.darkMode), this.primaryTextColor = _(this.primaryColor), this.secondaryTextColor = _(this.secondaryColor), this.tertiaryTextColor = _(this.tertiaryColor), this.lineColor = _(this.background), this.textColor = _(this.background), this.background = "white", this.mainBkg = "#ECECFF", this.secondBkg = "#ffffde", this.lineColor = "#333333", this.border1 = "#9370DB", this.border2 = "#aaaa33", this.arrowheadColor = "#333333", this.fontFamily = '"trebuchet ms", verdana, arial, sans-serif', this.fontSize = "16px", this.labelBackground = "#e8e8e8", this.textColor = "#333", this.THEME_COLOR_LIMIT = 12, this.nodeBkg = "calculated", this.nodeBorder = "calculated", this.clusterBkg = "calculated", this.clusterBorder = "calculated", this.defaultLinkColor = "calculated", this.titleColor = "calculated", this.edgeLabelBackground = "calculated", this.actorBorder = "calculated", this.actorBkg = "calculated", this.actorTextColor = "black", this.actorLineColor = "grey", this.signalColor = "calculated", this.signalTextColor = "calculated", this.labelBoxBkgColor = "calculated", this.labelBoxBorderColor = "calculated", this.labelTextColor = "calculated", this.loopTextColor = "calculated", this.noteBorderColor = "calculated", this.noteBkgColor = "#fff5ad", this.noteTextColor = "calculated", this.activationBorderColor = "#666", this.activationBkgColor = "#f4f4f4", this.sequenceNumberColor = "white", this.sectionBkgColor = "calculated", this.altSectionBkgColor = "calculated", this.sectionBkgColor2 = "calculated", this.excludeBkgColor = "#eeeeee", this.taskBorderColor = "calculated", this.taskBkgColor = "calculated", this.taskTextLightColor = "calculated", this.taskTextColor = this.taskTextLightColor, this.taskTextDarkColor = "calculated", this.taskTextOutsideColor = this.taskTextDarkColor, this.taskTextClickableColor = "calculated", this.activeTaskBorderColor = "calculated", this.activeTaskBkgColor = "calculated", this.gridColor = "calculated", this.doneTaskBkgColor = "calculated", this.doneTaskBorderColor = "calculated", this.critBorderColor = "calculated", this.critBkgColor = "calculated", this.todayLineColor = "calculated", this.sectionBkgColor = Je(102, 102, 255, 0.49), this.altSectionBkgColor = "white", this.sectionBkgColor2 = "#fff400", this.taskBorderColor = "#534fbc", this.taskBkgColor = "#8a90dd", this.taskTextLightColor = "white", this.taskTextColor = "calculated", this.taskTextDarkColor = "black", this.taskTextOutsideColor = "calculated", this.taskTextClickableColor = "#003163", this.activeTaskBorderColor = "#534fbc", this.activeTaskBkgColor = "#bfc7ff", this.gridColor = "lightgrey", this.doneTaskBkgColor = "lightgrey", this.doneTaskBorderColor = "grey", this.critBorderColor = "#ff8888", this.critBkgColor = "red", this.todayLineColor = "red", this.personBorder = this.primaryBorderColor, this.personBkg = this.mainBkg, this.labelColor = "black", this.errorBkgColor = "#552222", this.errorTextColor = "#552222", this.updateColors();
  }
  updateColors() {
    var e, i, r, n, o, s, a, l, h, u, f;
    this.cScale0 = this.cScale0 || this.primaryColor, this.cScale1 = this.cScale1 || this.secondaryColor, this.cScale2 = this.cScale2 || this.tertiaryColor, this.cScale3 = this.cScale3 || g(this.primaryColor, { h: 30 }), this.cScale4 = this.cScale4 || g(this.primaryColor, { h: 60 }), this.cScale5 = this.cScale5 || g(this.primaryColor, { h: 90 }), this.cScale6 = this.cScale6 || g(this.primaryColor, { h: 120 }), this.cScale7 = this.cScale7 || g(this.primaryColor, { h: 150 }), this.cScale8 = this.cScale8 || g(this.primaryColor, { h: 210 }), this.cScale9 = this.cScale9 || g(this.primaryColor, { h: 270 }), this.cScale10 = this.cScale10 || g(this.primaryColor, { h: 300 }), this.cScale11 = this.cScale11 || g(this.primaryColor, { h: 330 }), this["cScalePeer1"] = this["cScalePeer1"] || E(this.secondaryColor, 45), this["cScalePeer2"] = this["cScalePeer2"] || E(this.tertiaryColor, 40);
    for (let c = 0; c < this.THEME_COLOR_LIMIT; c++)
      this["cScale" + c] = E(this["cScale" + c], 10), this["cScalePeer" + c] = this["cScalePeer" + c] || E(this["cScale" + c], 25);
    for (let c = 0; c < this.THEME_COLOR_LIMIT; c++)
      this["cScaleInv" + c] = this["cScaleInv" + c] || g(this["cScale" + c], { h: 180 });
    for (let c = 0; c < 5; c++)
      this["surface" + c] = this["surface" + c] || g(this.mainBkg, { h: 30, l: -(5 + c * 5) }), this["surfacePeer" + c] = this["surfacePeer" + c] || g(this.mainBkg, { h: 30, l: -(7 + c * 5) });
    if (this.scaleLabelColor = this.scaleLabelColor !== "calculated" && this.scaleLabelColor ? this.scaleLabelColor : this.labelTextColor, this.labelTextColor !== "calculated") {
      this.cScaleLabel0 = this.cScaleLabel0 || _(this.labelTextColor), this.cScaleLabel3 = this.cScaleLabel3 || _(this.labelTextColor);
      for (let c = 0; c < this.THEME_COLOR_LIMIT; c++)
        this["cScaleLabel" + c] = this["cScaleLabel" + c] || this.labelTextColor;
    }
    this.nodeBkg = this.mainBkg, this.nodeBorder = this.border1, this.clusterBkg = this.secondBkg, this.clusterBorder = this.border2, this.defaultLinkColor = this.lineColor, this.titleColor = this.textColor, this.edgeLabelBackground = this.labelBackground, this.actorBorder = F(this.border1, 23), this.actorBkg = this.mainBkg, this.labelBoxBkgColor = this.actorBkg, this.signalColor = this.textColor, this.signalTextColor = this.textColor, this.labelBoxBorderColor = this.actorBorder, this.labelTextColor = this.actorTextColor, this.loopTextColor = this.actorTextColor, this.noteBorderColor = this.border2, this.noteTextColor = this.actorTextColor, this.taskTextColor = this.taskTextLightColor, this.taskTextOutsideColor = this.taskTextDarkColor, this.transitionColor = this.transitionColor || this.lineColor, this.transitionLabelColor = this.transitionLabelColor || this.textColor, this.stateLabelColor = this.stateLabelColor || this.stateBkg || this.primaryTextColor, this.stateBkg = this.stateBkg || this.mainBkg, this.labelBackgroundColor = this.labelBackgroundColor || this.stateBkg, this.compositeBackground = this.compositeBackground || this.background || this.tertiaryColor, this.altBackground = this.altBackground || "#f0f0f0", this.compositeTitleBackground = this.compositeTitleBackground || this.mainBkg, this.compositeBorder = this.compositeBorder || this.nodeBorder, this.innerEndBackground = this.nodeBorder, this.specialStateColor = this.lineColor, this.errorBkgColor = this.errorBkgColor || this.tertiaryColor, this.errorTextColor = this.errorTextColor || this.tertiaryTextColor, this.transitionColor = this.transitionColor || this.lineColor, this.classText = this.primaryTextColor, this.fillType0 = this.primaryColor, this.fillType1 = this.secondaryColor, this.fillType2 = g(this.primaryColor, { h: 64 }), this.fillType3 = g(this.secondaryColor, { h: 64 }), this.fillType4 = g(this.primaryColor, { h: -64 }), this.fillType5 = g(this.secondaryColor, { h: -64 }), this.fillType6 = g(this.primaryColor, { h: 128 }), this.fillType7 = g(this.secondaryColor, { h: 128 }), this.pie1 = this.pie1 || this.primaryColor, this.pie2 = this.pie2 || this.secondaryColor, this.pie3 = this.pie3 || g(this.tertiaryColor, { l: -40 }), this.pie4 = this.pie4 || g(this.primaryColor, { l: -10 }), this.pie5 = this.pie5 || g(this.secondaryColor, { l: -30 }), this.pie6 = this.pie6 || g(this.tertiaryColor, { l: -20 }), this.pie7 = this.pie7 || g(this.primaryColor, { h: 60, l: -20 }), this.pie8 = this.pie8 || g(this.primaryColor, { h: -60, l: -40 }), this.pie9 = this.pie9 || g(this.primaryColor, { h: 120, l: -40 }), this.pie10 = this.pie10 || g(this.primaryColor, { h: 60, l: -40 }), this.pie11 = this.pie11 || g(this.primaryColor, { h: -90, l: -40 }), this.pie12 = this.pie12 || g(this.primaryColor, { h: 120, l: -30 }), this.pieTitleTextSize = this.pieTitleTextSize || "25px", this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor, this.pieSectionTextSize = this.pieSectionTextSize || "17px", this.pieSectionTextColor = this.pieSectionTextColor || this.textColor, this.pieLegendTextSize = this.pieLegendTextSize || "17px", this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor, this.pieStrokeColor = this.pieStrokeColor || "black", this.pieStrokeWidth = this.pieStrokeWidth || "2px", this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || "2px", this.pieOuterStrokeColor = this.pieOuterStrokeColor || "black", this.pieOpacity = this.pieOpacity || "0.7", this.quadrant1Fill = this.quadrant1Fill || this.primaryColor, this.quadrant2Fill = this.quadrant2Fill || g(this.primaryColor, { r: 5, g: 5, b: 5 }), this.quadrant3Fill = this.quadrant3Fill || g(this.primaryColor, { r: 10, g: 10, b: 10 }), this.quadrant4Fill = this.quadrant4Fill || g(this.primaryColor, { r: 15, g: 15, b: 15 }), this.quadrant1TextFill = this.quadrant1TextFill || this.primaryTextColor, this.quadrant2TextFill = this.quadrant2TextFill || g(this.primaryTextColor, { r: -5, g: -5, b: -5 }), this.quadrant3TextFill = this.quadrant3TextFill || g(this.primaryTextColor, { r: -10, g: -10, b: -10 }), this.quadrant4TextFill = this.quadrant4TextFill || g(this.primaryTextColor, { r: -15, g: -15, b: -15 }), this.quadrantPointFill = this.quadrantPointFill || mi(this.quadrant1Fill) ? F(this.quadrant1Fill) : E(this.quadrant1Fill), this.quadrantPointTextFill = this.quadrantPointTextFill || this.primaryTextColor, this.quadrantXAxisTextFill = this.quadrantXAxisTextFill || this.primaryTextColor, this.quadrantYAxisTextFill = this.quadrantYAxisTextFill || this.primaryTextColor, this.quadrantInternalBorderStrokeFill = this.quadrantInternalBorderStrokeFill || this.primaryBorderColor, this.quadrantExternalBorderStrokeFill = this.quadrantExternalBorderStrokeFill || this.primaryBorderColor, this.quadrantTitleFill = this.quadrantTitleFill || this.primaryTextColor, this.xyChart = {
      backgroundColor: ((e = this.xyChart) == null ? void 0 : e.backgroundColor) || this.background,
      titleColor: ((i = this.xyChart) == null ? void 0 : i.titleColor) || this.primaryTextColor,
      xAxisTitleColor: ((r = this.xyChart) == null ? void 0 : r.xAxisTitleColor) || this.primaryTextColor,
      xAxisLabelColor: ((n = this.xyChart) == null ? void 0 : n.xAxisLabelColor) || this.primaryTextColor,
      xAxisTickColor: ((o = this.xyChart) == null ? void 0 : o.xAxisTickColor) || this.primaryTextColor,
      xAxisLineColor: ((s = this.xyChart) == null ? void 0 : s.xAxisLineColor) || this.primaryTextColor,
      yAxisTitleColor: ((a = this.xyChart) == null ? void 0 : a.yAxisTitleColor) || this.primaryTextColor,
      yAxisLabelColor: ((l = this.xyChart) == null ? void 0 : l.yAxisLabelColor) || this.primaryTextColor,
      yAxisTickColor: ((h = this.xyChart) == null ? void 0 : h.yAxisTickColor) || this.primaryTextColor,
      yAxisLineColor: ((u = this.xyChart) == null ? void 0 : u.yAxisLineColor) || this.primaryTextColor,
      plotColorPalette: ((f = this.xyChart) == null ? void 0 : f.plotColorPalette) || "#ECECFF,#8493A6,#FFC3A0,#DCDDE1,#B8E994,#D1A36F,#C3CDE6,#FFB6C1,#496078,#F8F3E3"
    }, this.requirementBackground = this.requirementBackground || this.primaryColor, this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor, this.requirementBorderSize = this.requirementBorderSize || "1", this.requirementTextColor = this.requirementTextColor || this.primaryTextColor, this.relationColor = this.relationColor || this.lineColor, this.relationLabelBackground = this.relationLabelBackground || this.labelBackground, this.relationLabelColor = this.relationLabelColor || this.actorTextColor, this.git0 = this.git0 || this.primaryColor, this.git1 = this.git1 || this.secondaryColor, this.git2 = this.git2 || this.tertiaryColor, this.git3 = this.git3 || g(this.primaryColor, { h: -30 }), this.git4 = this.git4 || g(this.primaryColor, { h: -60 }), this.git5 = this.git5 || g(this.primaryColor, { h: -90 }), this.git6 = this.git6 || g(this.primaryColor, { h: 60 }), this.git7 = this.git7 || g(this.primaryColor, { h: 120 }), this.darkMode ? (this.git0 = F(this.git0, 25), this.git1 = F(this.git1, 25), this.git2 = F(this.git2, 25), this.git3 = F(this.git3, 25), this.git4 = F(this.git4, 25), this.git5 = F(this.git5, 25), this.git6 = F(this.git6, 25), this.git7 = F(this.git7, 25)) : (this.git0 = E(this.git0, 25), this.git1 = E(this.git1, 25), this.git2 = E(this.git2, 25), this.git3 = E(this.git3, 25), this.git4 = E(this.git4, 25), this.git5 = E(this.git5, 25), this.git6 = E(this.git6, 25), this.git7 = E(this.git7, 25)), this.gitInv0 = this.gitInv0 || E(_(this.git0), 25), this.gitInv1 = this.gitInv1 || _(this.git1), this.gitInv2 = this.gitInv2 || _(this.git2), this.gitInv3 = this.gitInv3 || _(this.git3), this.gitInv4 = this.gitInv4 || _(this.git4), this.gitInv5 = this.gitInv5 || _(this.git5), this.gitInv6 = this.gitInv6 || _(this.git6), this.gitInv7 = this.gitInv7 || _(this.git7), this.gitBranchLabel0 = this.gitBranchLabel0 || _(this.labelTextColor), this.gitBranchLabel1 = this.gitBranchLabel1 || this.labelTextColor, this.gitBranchLabel2 = this.gitBranchLabel2 || this.labelTextColor, this.gitBranchLabel3 = this.gitBranchLabel3 || _(this.labelTextColor), this.gitBranchLabel4 = this.gitBranchLabel4 || this.labelTextColor, this.gitBranchLabel5 = this.gitBranchLabel5 || this.labelTextColor, this.gitBranchLabel6 = this.gitBranchLabel6 || this.labelTextColor, this.gitBranchLabel7 = this.gitBranchLabel7 || this.labelTextColor, this.tagLabelColor = this.tagLabelColor || this.primaryTextColor, this.tagLabelBackground = this.tagLabelBackground || this.primaryColor, this.tagLabelBorder = this.tagBorder || this.primaryBorderColor, this.tagLabelFontSize = this.tagLabelFontSize || "10px", this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor, this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor, this.commitLabelFontSize = this.commitLabelFontSize || "10px", this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || _r, this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || Cr;
  }
  calculate(e) {
    if (typeof e != "object") {
      this.updateColors();
      return;
    }
    const i = Object.keys(e);
    i.forEach((r) => {
      this[r] = e[r];
    }), this.updateColors(), i.forEach((r) => {
      this[r] = e[r];
    });
  }
};
const up = (t) => {
  const e = new cp();
  return e.calculate(t), e;
};
let fp = class {
  constructor() {
    this.background = "#f4f4f4", this.primaryColor = "#cde498", this.secondaryColor = "#cdffb2", this.background = "white", this.mainBkg = "#cde498", this.secondBkg = "#cdffb2", this.lineColor = "green", this.border1 = "#13540c", this.border2 = "#6eaa49", this.arrowheadColor = "green", this.fontFamily = '"trebuchet ms", verdana, arial, sans-serif', this.fontSize = "16px", this.tertiaryColor = F("#cde498", 10), this.primaryBorderColor = ht(this.primaryColor, this.darkMode), this.secondaryBorderColor = ht(this.secondaryColor, this.darkMode), this.tertiaryBorderColor = ht(this.tertiaryColor, this.darkMode), this.primaryTextColor = _(this.primaryColor), this.secondaryTextColor = _(this.secondaryColor), this.tertiaryTextColor = _(this.primaryColor), this.lineColor = _(this.background), this.textColor = _(this.background), this.THEME_COLOR_LIMIT = 12, this.nodeBkg = "calculated", this.nodeBorder = "calculated", this.clusterBkg = "calculated", this.clusterBorder = "calculated", this.defaultLinkColor = "calculated", this.titleColor = "#333", this.edgeLabelBackground = "#e8e8e8", this.actorBorder = "calculated", this.actorBkg = "calculated", this.actorTextColor = "black", this.actorLineColor = "grey", this.signalColor = "#333", this.signalTextColor = "#333", this.labelBoxBkgColor = "calculated", this.labelBoxBorderColor = "#326932", this.labelTextColor = "calculated", this.loopTextColor = "calculated", this.noteBorderColor = "calculated", this.noteBkgColor = "#fff5ad", this.noteTextColor = "calculated", this.activationBorderColor = "#666", this.activationBkgColor = "#f4f4f4", this.sequenceNumberColor = "white", this.sectionBkgColor = "#6eaa49", this.altSectionBkgColor = "white", this.sectionBkgColor2 = "#6eaa49", this.excludeBkgColor = "#eeeeee", this.taskBorderColor = "calculated", this.taskBkgColor = "#487e3a", this.taskTextLightColor = "white", this.taskTextColor = "calculated", this.taskTextDarkColor = "black", this.taskTextOutsideColor = "calculated", this.taskTextClickableColor = "#003163", this.activeTaskBorderColor = "calculated", this.activeTaskBkgColor = "calculated", this.gridColor = "lightgrey", this.doneTaskBkgColor = "lightgrey", this.doneTaskBorderColor = "grey", this.critBorderColor = "#ff8888", this.critBkgColor = "red", this.todayLineColor = "red", this.personBorder = this.primaryBorderColor, this.personBkg = this.mainBkg, this.labelColor = "black", this.errorBkgColor = "#552222", this.errorTextColor = "#552222";
  }
  updateColors() {
    var e, i, r, n, o, s, a, l, h, u, f;
    this.actorBorder = E(this.mainBkg, 20), this.actorBkg = this.mainBkg, this.labelBoxBkgColor = this.actorBkg, this.labelTextColor = this.actorTextColor, this.loopTextColor = this.actorTextColor, this.noteBorderColor = this.border2, this.noteTextColor = this.actorTextColor, this.cScale0 = this.cScale0 || this.primaryColor, this.cScale1 = this.cScale1 || this.secondaryColor, this.cScale2 = this.cScale2 || this.tertiaryColor, this.cScale3 = this.cScale3 || g(this.primaryColor, { h: 30 }), this.cScale4 = this.cScale4 || g(this.primaryColor, { h: 60 }), this.cScale5 = this.cScale5 || g(this.primaryColor, { h: 90 }), this.cScale6 = this.cScale6 || g(this.primaryColor, { h: 120 }), this.cScale7 = this.cScale7 || g(this.primaryColor, { h: 150 }), this.cScale8 = this.cScale8 || g(this.primaryColor, { h: 210 }), this.cScale9 = this.cScale9 || g(this.primaryColor, { h: 270 }), this.cScale10 = this.cScale10 || g(this.primaryColor, { h: 300 }), this.cScale11 = this.cScale11 || g(this.primaryColor, { h: 330 }), this["cScalePeer1"] = this["cScalePeer1"] || E(this.secondaryColor, 45), this["cScalePeer2"] = this["cScalePeer2"] || E(this.tertiaryColor, 40);
    for (let c = 0; c < this.THEME_COLOR_LIMIT; c++)
      this["cScale" + c] = E(this["cScale" + c], 10), this["cScalePeer" + c] = this["cScalePeer" + c] || E(this["cScale" + c], 25);
    for (let c = 0; c < this.THEME_COLOR_LIMIT; c++)
      this["cScaleInv" + c] = this["cScaleInv" + c] || g(this["cScale" + c], { h: 180 });
    this.scaleLabelColor = this.scaleLabelColor !== "calculated" && this.scaleLabelColor ? this.scaleLabelColor : this.labelTextColor;
    for (let c = 0; c < this.THEME_COLOR_LIMIT; c++)
      this["cScaleLabel" + c] = this["cScaleLabel" + c] || this.scaleLabelColor;
    for (let c = 0; c < 5; c++)
      this["surface" + c] = this["surface" + c] || g(this.mainBkg, { h: 30, s: -30, l: -(5 + c * 5) }), this["surfacePeer" + c] = this["surfacePeer" + c] || g(this.mainBkg, { h: 30, s: -30, l: -(8 + c * 5) });
    this.nodeBkg = this.mainBkg, this.nodeBorder = this.border1, this.clusterBkg = this.secondBkg, this.clusterBorder = this.border2, this.defaultLinkColor = this.lineColor, this.taskBorderColor = this.border1, this.taskTextColor = this.taskTextLightColor, this.taskTextOutsideColor = this.taskTextDarkColor, this.activeTaskBorderColor = this.taskBorderColor, this.activeTaskBkgColor = this.mainBkg, this.transitionColor = this.transitionColor || this.lineColor, this.transitionLabelColor = this.transitionLabelColor || this.textColor, this.stateLabelColor = this.stateLabelColor || this.stateBkg || this.primaryTextColor, this.stateBkg = this.stateBkg || this.mainBkg, this.labelBackgroundColor = this.labelBackgroundColor || this.stateBkg, this.compositeBackground = this.compositeBackground || this.background || this.tertiaryColor, this.altBackground = this.altBackground || "#f0f0f0", this.compositeTitleBackground = this.compositeTitleBackground || this.mainBkg, this.compositeBorder = this.compositeBorder || this.nodeBorder, this.innerEndBackground = this.primaryBorderColor, this.specialStateColor = this.lineColor, this.errorBkgColor = this.errorBkgColor || this.tertiaryColor, this.errorTextColor = this.errorTextColor || this.tertiaryTextColor, this.transitionColor = this.transitionColor || this.lineColor, this.classText = this.primaryTextColor, this.fillType0 = this.primaryColor, this.fillType1 = this.secondaryColor, this.fillType2 = g(this.primaryColor, { h: 64 }), this.fillType3 = g(this.secondaryColor, { h: 64 }), this.fillType4 = g(this.primaryColor, { h: -64 }), this.fillType5 = g(this.secondaryColor, { h: -64 }), this.fillType6 = g(this.primaryColor, { h: 128 }), this.fillType7 = g(this.secondaryColor, { h: 128 }), this.pie1 = this.pie1 || this.primaryColor, this.pie2 = this.pie2 || this.secondaryColor, this.pie3 = this.pie3 || this.tertiaryColor, this.pie4 = this.pie4 || g(this.primaryColor, { l: -30 }), this.pie5 = this.pie5 || g(this.secondaryColor, { l: -30 }), this.pie6 = this.pie6 || g(this.tertiaryColor, { h: 40, l: -40 }), this.pie7 = this.pie7 || g(this.primaryColor, { h: 60, l: -10 }), this.pie8 = this.pie8 || g(this.primaryColor, { h: -60, l: -10 }), this.pie9 = this.pie9 || g(this.primaryColor, { h: 120, l: 0 }), this.pie10 = this.pie10 || g(this.primaryColor, { h: 60, l: -50 }), this.pie11 = this.pie11 || g(this.primaryColor, { h: -60, l: -50 }), this.pie12 = this.pie12 || g(this.primaryColor, { h: 120, l: -50 }), this.pieTitleTextSize = this.pieTitleTextSize || "25px", this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor, this.pieSectionTextSize = this.pieSectionTextSize || "17px", this.pieSectionTextColor = this.pieSectionTextColor || this.textColor, this.pieLegendTextSize = this.pieLegendTextSize || "17px", this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor, this.pieStrokeColor = this.pieStrokeColor || "black", this.pieStrokeWidth = this.pieStrokeWidth || "2px", this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || "2px", this.pieOuterStrokeColor = this.pieOuterStrokeColor || "black", this.pieOpacity = this.pieOpacity || "0.7", this.quadrant1Fill = this.quadrant1Fill || this.primaryColor, this.quadrant2Fill = this.quadrant2Fill || g(this.primaryColor, { r: 5, g: 5, b: 5 }), this.quadrant3Fill = this.quadrant3Fill || g(this.primaryColor, { r: 10, g: 10, b: 10 }), this.quadrant4Fill = this.quadrant4Fill || g(this.primaryColor, { r: 15, g: 15, b: 15 }), this.quadrant1TextFill = this.quadrant1TextFill || this.primaryTextColor, this.quadrant2TextFill = this.quadrant2TextFill || g(this.primaryTextColor, { r: -5, g: -5, b: -5 }), this.quadrant3TextFill = this.quadrant3TextFill || g(this.primaryTextColor, { r: -10, g: -10, b: -10 }), this.quadrant4TextFill = this.quadrant4TextFill || g(this.primaryTextColor, { r: -15, g: -15, b: -15 }), this.quadrantPointFill = this.quadrantPointFill || mi(this.quadrant1Fill) ? F(this.quadrant1Fill) : E(this.quadrant1Fill), this.quadrantPointTextFill = this.quadrantPointTextFill || this.primaryTextColor, this.quadrantXAxisTextFill = this.quadrantXAxisTextFill || this.primaryTextColor, this.quadrantYAxisTextFill = this.quadrantYAxisTextFill || this.primaryTextColor, this.quadrantInternalBorderStrokeFill = this.quadrantInternalBorderStrokeFill || this.primaryBorderColor, this.quadrantExternalBorderStrokeFill = this.quadrantExternalBorderStrokeFill || this.primaryBorderColor, this.quadrantTitleFill = this.quadrantTitleFill || this.primaryTextColor, this.xyChart = {
      backgroundColor: ((e = this.xyChart) == null ? void 0 : e.backgroundColor) || this.background,
      titleColor: ((i = this.xyChart) == null ? void 0 : i.titleColor) || this.primaryTextColor,
      xAxisTitleColor: ((r = this.xyChart) == null ? void 0 : r.xAxisTitleColor) || this.primaryTextColor,
      xAxisLabelColor: ((n = this.xyChart) == null ? void 0 : n.xAxisLabelColor) || this.primaryTextColor,
      xAxisTickColor: ((o = this.xyChart) == null ? void 0 : o.xAxisTickColor) || this.primaryTextColor,
      xAxisLineColor: ((s = this.xyChart) == null ? void 0 : s.xAxisLineColor) || this.primaryTextColor,
      yAxisTitleColor: ((a = this.xyChart) == null ? void 0 : a.yAxisTitleColor) || this.primaryTextColor,
      yAxisLabelColor: ((l = this.xyChart) == null ? void 0 : l.yAxisLabelColor) || this.primaryTextColor,
      yAxisTickColor: ((h = this.xyChart) == null ? void 0 : h.yAxisTickColor) || this.primaryTextColor,
      yAxisLineColor: ((u = this.xyChart) == null ? void 0 : u.yAxisLineColor) || this.primaryTextColor,
      plotColorPalette: ((f = this.xyChart) == null ? void 0 : f.plotColorPalette) || "#CDE498,#FF6B6B,#A0D2DB,#D7BDE2,#F0F0F0,#FFC3A0,#7FD8BE,#FF9A8B,#FAF3E0,#FFF176"
    }, this.requirementBackground = this.requirementBackground || this.primaryColor, this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor, this.requirementBorderSize = this.requirementBorderSize || "1", this.requirementTextColor = this.requirementTextColor || this.primaryTextColor, this.relationColor = this.relationColor || this.lineColor, this.relationLabelBackground = this.relationLabelBackground || this.edgeLabelBackground, this.relationLabelColor = this.relationLabelColor || this.actorTextColor, this.git0 = this.git0 || this.primaryColor, this.git1 = this.git1 || this.secondaryColor, this.git2 = this.git2 || this.tertiaryColor, this.git3 = this.git3 || g(this.primaryColor, { h: -30 }), this.git4 = this.git4 || g(this.primaryColor, { h: -60 }), this.git5 = this.git5 || g(this.primaryColor, { h: -90 }), this.git6 = this.git6 || g(this.primaryColor, { h: 60 }), this.git7 = this.git7 || g(this.primaryColor, { h: 120 }), this.darkMode ? (this.git0 = F(this.git0, 25), this.git1 = F(this.git1, 25), this.git2 = F(this.git2, 25), this.git3 = F(this.git3, 25), this.git4 = F(this.git4, 25), this.git5 = F(this.git5, 25), this.git6 = F(this.git6, 25), this.git7 = F(this.git7, 25)) : (this.git0 = E(this.git0, 25), this.git1 = E(this.git1, 25), this.git2 = E(this.git2, 25), this.git3 = E(this.git3, 25), this.git4 = E(this.git4, 25), this.git5 = E(this.git5, 25), this.git6 = E(this.git6, 25), this.git7 = E(this.git7, 25)), this.gitInv0 = this.gitInv0 || _(this.git0), this.gitInv1 = this.gitInv1 || _(this.git1), this.gitInv2 = this.gitInv2 || _(this.git2), this.gitInv3 = this.gitInv3 || _(this.git3), this.gitInv4 = this.gitInv4 || _(this.git4), this.gitInv5 = this.gitInv5 || _(this.git5), this.gitInv6 = this.gitInv6 || _(this.git6), this.gitInv7 = this.gitInv7 || _(this.git7), this.gitBranchLabel0 = this.gitBranchLabel0 || _(this.labelTextColor), this.gitBranchLabel1 = this.gitBranchLabel1 || this.labelTextColor, this.gitBranchLabel2 = this.gitBranchLabel2 || this.labelTextColor, this.gitBranchLabel3 = this.gitBranchLabel3 || _(this.labelTextColor), this.gitBranchLabel4 = this.gitBranchLabel4 || this.labelTextColor, this.gitBranchLabel5 = this.gitBranchLabel5 || this.labelTextColor, this.gitBranchLabel6 = this.gitBranchLabel6 || this.labelTextColor, this.gitBranchLabel7 = this.gitBranchLabel7 || this.labelTextColor, this.tagLabelColor = this.tagLabelColor || this.primaryTextColor, this.tagLabelBackground = this.tagLabelBackground || this.primaryColor, this.tagLabelBorder = this.tagBorder || this.primaryBorderColor, this.tagLabelFontSize = this.tagLabelFontSize || "10px", this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor, this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor, this.commitLabelFontSize = this.commitLabelFontSize || "10px", this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || _r, this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || Cr;
  }
  calculate(e) {
    if (typeof e != "object") {
      this.updateColors();
      return;
    }
    const i = Object.keys(e);
    i.forEach((r) => {
      this[r] = e[r];
    }), this.updateColors(), i.forEach((r) => {
      this[r] = e[r];
    });
  }
};
const dp = (t) => {
  const e = new fp();
  return e.calculate(t), e;
};
class pp {
  constructor() {
    this.primaryColor = "#eee", this.contrast = "#707070", this.secondaryColor = F(this.contrast, 55), this.background = "#ffffff", this.tertiaryColor = g(this.primaryColor, { h: -160 }), this.primaryBorderColor = ht(this.primaryColor, this.darkMode), this.secondaryBorderColor = ht(this.secondaryColor, this.darkMode), this.tertiaryBorderColor = ht(this.tertiaryColor, this.darkMode), this.primaryTextColor = _(this.primaryColor), this.secondaryTextColor = _(this.secondaryColor), this.tertiaryTextColor = _(this.tertiaryColor), this.lineColor = _(this.background), this.textColor = _(this.background), this.mainBkg = "#eee", this.secondBkg = "calculated", this.lineColor = "#666", this.border1 = "#999", this.border2 = "calculated", this.note = "#ffa", this.text = "#333", this.critical = "#d42", this.done = "#bbb", this.arrowheadColor = "#333333", this.fontFamily = '"trebuchet ms", verdana, arial, sans-serif', this.fontSize = "16px", this.THEME_COLOR_LIMIT = 12, this.nodeBkg = "calculated", this.nodeBorder = "calculated", this.clusterBkg = "calculated", this.clusterBorder = "calculated", this.defaultLinkColor = "calculated", this.titleColor = "calculated", this.edgeLabelBackground = "white", this.actorBorder = "calculated", this.actorBkg = "calculated", this.actorTextColor = "calculated", this.actorLineColor = "calculated", this.signalColor = "calculated", this.signalTextColor = "calculated", this.labelBoxBkgColor = "calculated", this.labelBoxBorderColor = "calculated", this.labelTextColor = "calculated", this.loopTextColor = "calculated", this.noteBorderColor = "calculated", this.noteBkgColor = "calculated", this.noteTextColor = "calculated", this.activationBorderColor = "#666", this.activationBkgColor = "#f4f4f4", this.sequenceNumberColor = "white", this.sectionBkgColor = "calculated", this.altSectionBkgColor = "white", this.sectionBkgColor2 = "calculated", this.excludeBkgColor = "#eeeeee", this.taskBorderColor = "calculated", this.taskBkgColor = "calculated", this.taskTextLightColor = "white", this.taskTextColor = "calculated", this.taskTextDarkColor = "calculated", this.taskTextOutsideColor = "calculated", this.taskTextClickableColor = "#003163", this.activeTaskBorderColor = "calculated", this.activeTaskBkgColor = "calculated", this.gridColor = "calculated", this.doneTaskBkgColor = "calculated", this.doneTaskBorderColor = "calculated", this.critBkgColor = "calculated", this.critBorderColor = "calculated", this.todayLineColor = "calculated", this.personBorder = this.primaryBorderColor, this.personBkg = this.mainBkg, this.labelColor = "black", this.errorBkgColor = "#552222", this.errorTextColor = "#552222";
  }
  updateColors() {
    var e, i, r, n, o, s, a, l, h, u, f;
    this.secondBkg = F(this.contrast, 55), this.border2 = this.contrast, this.actorBorder = F(this.border1, 23), this.actorBkg = this.mainBkg, this.actorTextColor = this.text, this.actorLineColor = this.lineColor, this.signalColor = this.text, this.signalTextColor = this.text, this.labelBoxBkgColor = this.actorBkg, this.labelBoxBorderColor = this.actorBorder, this.labelTextColor = this.text, this.loopTextColor = this.text, this.noteBorderColor = "#999", this.noteBkgColor = "#666", this.noteTextColor = "#fff", this.cScale0 = this.cScale0 || "#555", this.cScale1 = this.cScale1 || "#F4F4F4", this.cScale2 = this.cScale2 || "#555", this.cScale3 = this.cScale3 || "#BBB", this.cScale4 = this.cScale4 || "#777", this.cScale5 = this.cScale5 || "#999", this.cScale6 = this.cScale6 || "#DDD", this.cScale7 = this.cScale7 || "#FFF", this.cScale8 = this.cScale8 || "#DDD", this.cScale9 = this.cScale9 || "#BBB", this.cScale10 = this.cScale10 || "#999", this.cScale11 = this.cScale11 || "#777";
    for (let c = 0; c < this.THEME_COLOR_LIMIT; c++)
      this["cScaleInv" + c] = this["cScaleInv" + c] || _(this["cScale" + c]);
    for (let c = 0; c < this.THEME_COLOR_LIMIT; c++)
      this.darkMode ? this["cScalePeer" + c] = this["cScalePeer" + c] || F(this["cScale" + c], 10) : this["cScalePeer" + c] = this["cScalePeer" + c] || E(this["cScale" + c], 10);
    this.scaleLabelColor = this.scaleLabelColor || (this.darkMode ? "black" : this.labelTextColor), this.cScaleLabel0 = this.cScaleLabel0 || this.cScale1, this.cScaleLabel2 = this.cScaleLabel2 || this.cScale1;
    for (let c = 0; c < this.THEME_COLOR_LIMIT; c++)
      this["cScaleLabel" + c] = this["cScaleLabel" + c] || this.scaleLabelColor;
    for (let c = 0; c < 5; c++)
      this["surface" + c] = this["surface" + c] || g(this.mainBkg, { l: -(5 + c * 5) }), this["surfacePeer" + c] = this["surfacePeer" + c] || g(this.mainBkg, { l: -(8 + c * 5) });
    this.nodeBkg = this.mainBkg, this.nodeBorder = this.border1, this.clusterBkg = this.secondBkg, this.clusterBorder = this.border2, this.defaultLinkColor = this.lineColor, this.titleColor = this.text, this.sectionBkgColor = F(this.contrast, 30), this.sectionBkgColor2 = F(this.contrast, 30), this.taskBorderColor = E(this.contrast, 10), this.taskBkgColor = this.contrast, this.taskTextColor = this.taskTextLightColor, this.taskTextDarkColor = this.text, this.taskTextOutsideColor = this.taskTextDarkColor, this.activeTaskBorderColor = this.taskBorderColor, this.activeTaskBkgColor = this.mainBkg, this.gridColor = F(this.border1, 30), this.doneTaskBkgColor = this.done, this.doneTaskBorderColor = this.lineColor, this.critBkgColor = this.critical, this.critBorderColor = E(this.critBkgColor, 10), this.todayLineColor = this.critBkgColor, this.transitionColor = this.transitionColor || "#000", this.transitionLabelColor = this.transitionLabelColor || this.textColor, this.stateLabelColor = this.stateLabelColor || this.stateBkg || this.primaryTextColor, this.stateBkg = this.stateBkg || this.mainBkg, this.labelBackgroundColor = this.labelBackgroundColor || this.stateBkg, this.compositeBackground = this.compositeBackground || this.background || this.tertiaryColor, this.altBackground = this.altBackground || "#f4f4f4", this.compositeTitleBackground = this.compositeTitleBackground || this.mainBkg, this.stateBorder = this.stateBorder || "#000", this.innerEndBackground = this.primaryBorderColor, this.specialStateColor = "#222", this.errorBkgColor = this.errorBkgColor || this.tertiaryColor, this.errorTextColor = this.errorTextColor || this.tertiaryTextColor, this.classText = this.primaryTextColor, this.fillType0 = this.primaryColor, this.fillType1 = this.secondaryColor, this.fillType2 = g(this.primaryColor, { h: 64 }), this.fillType3 = g(this.secondaryColor, { h: 64 }), this.fillType4 = g(this.primaryColor, { h: -64 }), this.fillType5 = g(this.secondaryColor, { h: -64 }), this.fillType6 = g(this.primaryColor, { h: 128 }), this.fillType7 = g(this.secondaryColor, { h: 128 });
    for (let c = 0; c < this.THEME_COLOR_LIMIT; c++)
      this["pie" + c] = this["cScale" + c];
    this.pie12 = this.pie0, this.pieTitleTextSize = this.pieTitleTextSize || "25px", this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor, this.pieSectionTextSize = this.pieSectionTextSize || "17px", this.pieSectionTextColor = this.pieSectionTextColor || this.textColor, this.pieLegendTextSize = this.pieLegendTextSize || "17px", this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor, this.pieStrokeColor = this.pieStrokeColor || "black", this.pieStrokeWidth = this.pieStrokeWidth || "2px", this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || "2px", this.pieOuterStrokeColor = this.pieOuterStrokeColor || "black", this.pieOpacity = this.pieOpacity || "0.7", this.quadrant1Fill = this.quadrant1Fill || this.primaryColor, this.quadrant2Fill = this.quadrant2Fill || g(this.primaryColor, { r: 5, g: 5, b: 5 }), this.quadrant3Fill = this.quadrant3Fill || g(this.primaryColor, { r: 10, g: 10, b: 10 }), this.quadrant4Fill = this.quadrant4Fill || g(this.primaryColor, { r: 15, g: 15, b: 15 }), this.quadrant1TextFill = this.quadrant1TextFill || this.primaryTextColor, this.quadrant2TextFill = this.quadrant2TextFill || g(this.primaryTextColor, { r: -5, g: -5, b: -5 }), this.quadrant3TextFill = this.quadrant3TextFill || g(this.primaryTextColor, { r: -10, g: -10, b: -10 }), this.quadrant4TextFill = this.quadrant4TextFill || g(this.primaryTextColor, { r: -15, g: -15, b: -15 }), this.quadrantPointFill = this.quadrantPointFill || mi(this.quadrant1Fill) ? F(this.quadrant1Fill) : E(this.quadrant1Fill), this.quadrantPointTextFill = this.quadrantPointTextFill || this.primaryTextColor, this.quadrantXAxisTextFill = this.quadrantXAxisTextFill || this.primaryTextColor, this.quadrantYAxisTextFill = this.quadrantYAxisTextFill || this.primaryTextColor, this.quadrantInternalBorderStrokeFill = this.quadrantInternalBorderStrokeFill || this.primaryBorderColor, this.quadrantExternalBorderStrokeFill = this.quadrantExternalBorderStrokeFill || this.primaryBorderColor, this.quadrantTitleFill = this.quadrantTitleFill || this.primaryTextColor, this.xyChart = {
      backgroundColor: ((e = this.xyChart) == null ? void 0 : e.backgroundColor) || this.background,
      titleColor: ((i = this.xyChart) == null ? void 0 : i.titleColor) || this.primaryTextColor,
      xAxisTitleColor: ((r = this.xyChart) == null ? void 0 : r.xAxisTitleColor) || this.primaryTextColor,
      xAxisLabelColor: ((n = this.xyChart) == null ? void 0 : n.xAxisLabelColor) || this.primaryTextColor,
      xAxisTickColor: ((o = this.xyChart) == null ? void 0 : o.xAxisTickColor) || this.primaryTextColor,
      xAxisLineColor: ((s = this.xyChart) == null ? void 0 : s.xAxisLineColor) || this.primaryTextColor,
      yAxisTitleColor: ((a = this.xyChart) == null ? void 0 : a.yAxisTitleColor) || this.primaryTextColor,
      yAxisLabelColor: ((l = this.xyChart) == null ? void 0 : l.yAxisLabelColor) || this.primaryTextColor,
      yAxisTickColor: ((h = this.xyChart) == null ? void 0 : h.yAxisTickColor) || this.primaryTextColor,
      yAxisLineColor: ((u = this.xyChart) == null ? void 0 : u.yAxisLineColor) || this.primaryTextColor,
      plotColorPalette: ((f = this.xyChart) == null ? void 0 : f.plotColorPalette) || "#EEE,#6BB8E4,#8ACB88,#C7ACD6,#E8DCC2,#FFB2A8,#FFF380,#7E8D91,#FFD8B1,#FAF3E0"
    }, this.requirementBackground = this.requirementBackground || this.primaryColor, this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor, this.requirementBorderSize = this.requirementBorderSize || "1", this.requirementTextColor = this.requirementTextColor || this.primaryTextColor, this.relationColor = this.relationColor || this.lineColor, this.relationLabelBackground = this.relationLabelBackground || this.edgeLabelBackground, this.relationLabelColor = this.relationLabelColor || this.actorTextColor, this.git0 = E(this.pie1, 25) || this.primaryColor, this.git1 = this.pie2 || this.secondaryColor, this.git2 = this.pie3 || this.tertiaryColor, this.git3 = this.pie4 || g(this.primaryColor, { h: -30 }), this.git4 = this.pie5 || g(this.primaryColor, { h: -60 }), this.git5 = this.pie6 || g(this.primaryColor, { h: -90 }), this.git6 = this.pie7 || g(this.primaryColor, { h: 60 }), this.git7 = this.pie8 || g(this.primaryColor, { h: 120 }), this.gitInv0 = this.gitInv0 || _(this.git0), this.gitInv1 = this.gitInv1 || _(this.git1), this.gitInv2 = this.gitInv2 || _(this.git2), this.gitInv3 = this.gitInv3 || _(this.git3), this.gitInv4 = this.gitInv4 || _(this.git4), this.gitInv5 = this.gitInv5 || _(this.git5), this.gitInv6 = this.gitInv6 || _(this.git6), this.gitInv7 = this.gitInv7 || _(this.git7), this.branchLabelColor = this.branchLabelColor || this.labelTextColor, this.gitBranchLabel0 = this.branchLabelColor, this.gitBranchLabel1 = "white", this.gitBranchLabel2 = this.branchLabelColor, this.gitBranchLabel3 = "white", this.gitBranchLabel4 = this.branchLabelColor, this.gitBranchLabel5 = this.branchLabelColor, this.gitBranchLabel6 = this.branchLabelColor, this.gitBranchLabel7 = this.branchLabelColor, this.tagLabelColor = this.tagLabelColor || this.primaryTextColor, this.tagLabelBackground = this.tagLabelBackground || this.primaryColor, this.tagLabelBorder = this.tagBorder || this.primaryBorderColor, this.tagLabelFontSize = this.tagLabelFontSize || "10px", this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor, this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor, this.commitLabelFontSize = this.commitLabelFontSize || "10px", this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || _r, this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || Cr;
  }
  calculate(e) {
    if (typeof e != "object") {
      this.updateColors();
      return;
    }
    const i = Object.keys(e);
    i.forEach((r) => {
      this[r] = e[r];
    }), this.updateColors(), i.forEach((r) => {
      this[r] = e[r];
    });
  }
}
const gp = (t) => {
  const e = new pp();
  return e.calculate(t), e;
}, Gt = {
  base: {
    getThemeVariables: ap
  },
  dark: {
    getThemeVariables: hp
  },
  default: {
    getThemeVariables: up
  },
  forest: {
    getThemeVariables: dp
  },
  neutral: {
    getThemeVariables: gp
  }
}, jt = {
  flowchart: {
    useMaxWidth: !0,
    titleTopMargin: 25,
    subGraphTitleMargin: {
      top: 0,
      bottom: 0
    },
    diagramPadding: 8,
    htmlLabels: !0,
    nodeSpacing: 50,
    rankSpacing: 50,
    curve: "basis",
    padding: 15,
    defaultRenderer: "dagre-wrapper",
    wrappingWidth: 200
  },
  sequence: {
    useMaxWidth: !0,
    hideUnusedParticipants: !1,
    activationWidth: 10,
    diagramMarginX: 50,
    diagramMarginY: 10,
    actorMargin: 50,
    width: 150,
    height: 65,
    boxMargin: 10,
    boxTextMargin: 5,
    noteMargin: 10,
    messageMargin: 35,
    messageAlign: "center",
    mirrorActors: !0,
    forceMenus: !1,
    bottomMarginAdj: 1,
    rightAngles: !1,
    showSequenceNumbers: !1,
    actorFontSize: 14,
    actorFontFamily: '"Open Sans", sans-serif',
    actorFontWeight: 400,
    noteFontSize: 14,
    noteFontFamily: '"trebuchet ms", verdana, arial, sans-serif',
    noteFontWeight: 400,
    noteAlign: "center",
    messageFontSize: 16,
    messageFontFamily: '"trebuchet ms", verdana, arial, sans-serif',
    messageFontWeight: 400,
    wrap: !1,
    wrapPadding: 10,
    labelBoxWidth: 50,
    labelBoxHeight: 20
  },
  gantt: {
    useMaxWidth: !0,
    titleTopMargin: 25,
    barHeight: 20,
    barGap: 4,
    topPadding: 50,
    rightPadding: 75,
    leftPadding: 75,
    gridLineStartPadding: 35,
    fontSize: 11,
    sectionFontSize: 11,
    numberSectionStyles: 4,
    axisFormat: "%Y-%m-%d",
    topAxis: !1,
    displayMode: "",
    weekday: "sunday"
  },
  journey: {
    useMaxWidth: !0,
    diagramMarginX: 50,
    diagramMarginY: 10,
    leftMargin: 150,
    width: 150,
    height: 50,
    boxMargin: 10,
    boxTextMargin: 5,
    noteMargin: 10,
    messageMargin: 35,
    messageAlign: "center",
    bottomMarginAdj: 1,
    rightAngles: !1,
    taskFontSize: 14,
    taskFontFamily: '"Open Sans", sans-serif',
    taskMargin: 50,
    activationWidth: 10,
    textPlacement: "fo",
    actorColours: [
      "#8FBC8F",
      "#7CFC00",
      "#00FFFF",
      "#20B2AA",
      "#B0E0E6",
      "#FFFFE0"
    ],
    sectionFills: [
      "#191970",
      "#8B008B",
      "#4B0082",
      "#2F4F4F",
      "#800000",
      "#8B4513",
      "#00008B"
    ],
    sectionColours: [
      "#fff"
    ]
  },
  class: {
    useMaxWidth: !0,
    titleTopMargin: 25,
    arrowMarkerAbsolute: !1,
    dividerMargin: 10,
    padding: 5,
    textHeight: 10,
    defaultRenderer: "dagre-wrapper",
    htmlLabels: !1
  },
  state: {
    useMaxWidth: !0,
    titleTopMargin: 25,
    dividerMargin: 10,
    sizeUnit: 5,
    padding: 8,
    textHeight: 10,
    titleShift: -15,
    noteMargin: 10,
    forkWidth: 70,
    forkHeight: 7,
    miniPadding: 2,
    fontSizeFactor: 5.02,
    fontSize: 24,
    labelHeight: 16,
    edgeLengthFactor: "20",
    compositTitleSize: 35,
    radius: 5,
    defaultRenderer: "dagre-wrapper"
  },
  er: {
    useMaxWidth: !0,
    titleTopMargin: 25,
    diagramPadding: 20,
    layoutDirection: "TB",
    minEntityWidth: 100,
    minEntityHeight: 75,
    entityPadding: 15,
    stroke: "gray",
    fill: "honeydew",
    fontSize: 12
  },
  pie: {
    useMaxWidth: !0,
    textPosition: 0.75
  },
  quadrantChart: {
    useMaxWidth: !0,
    chartWidth: 500,
    chartHeight: 500,
    titleFontSize: 20,
    titlePadding: 10,
    quadrantPadding: 5,
    xAxisLabelPadding: 5,
    yAxisLabelPadding: 5,
    xAxisLabelFontSize: 16,
    yAxisLabelFontSize: 16,
    quadrantLabelFontSize: 16,
    quadrantTextTopPadding: 5,
    pointTextPadding: 5,
    pointLabelFontSize: 12,
    pointRadius: 5,
    xAxisPosition: "top",
    yAxisPosition: "left",
    quadrantInternalBorderStrokeWidth: 1,
    quadrantExternalBorderStrokeWidth: 2
  },
  xyChart: {
    useMaxWidth: !0,
    width: 700,
    height: 500,
    titleFontSize: 20,
    titlePadding: 10,
    showTitle: !0,
    xAxis: {
      $ref: "#/$defs/XYChartAxisConfig",
      showLabel: !0,
      labelFontSize: 14,
      labelPadding: 5,
      showTitle: !0,
      titleFontSize: 16,
      titlePadding: 5,
      showTick: !0,
      tickLength: 5,
      tickWidth: 2,
      showAxisLine: !0,
      axisLineWidth: 2
    },
    yAxis: {
      $ref: "#/$defs/XYChartAxisConfig",
      showLabel: !0,
      labelFontSize: 14,
      labelPadding: 5,
      showTitle: !0,
      titleFontSize: 16,
      titlePadding: 5,
      showTick: !0,
      tickLength: 5,
      tickWidth: 2,
      showAxisLine: !0,
      axisLineWidth: 2
    },
    chartOrientation: "vertical",
    plotReservedSpacePercent: 50
  },
  requirement: {
    useMaxWidth: !0,
    rect_fill: "#f9f9f9",
    text_color: "#333",
    rect_border_size: "0.5px",
    rect_border_color: "#bbb",
    rect_min_width: 200,
    rect_min_height: 200,
    fontSize: 14,
    rect_padding: 10,
    line_height: 20
  },
  mindmap: {
    useMaxWidth: !0,
    padding: 10,
    maxNodeWidth: 200
  },
  timeline: {
    useMaxWidth: !0,
    diagramMarginX: 50,
    diagramMarginY: 10,
    leftMargin: 150,
    width: 150,
    height: 50,
    boxMargin: 10,
    boxTextMargin: 5,
    noteMargin: 10,
    messageMargin: 35,
    messageAlign: "center",
    bottomMarginAdj: 1,
    rightAngles: !1,
    taskFontSize: 14,
    taskFontFamily: '"Open Sans", sans-serif',
    taskMargin: 50,
    activationWidth: 10,
    textPlacement: "fo",
    actorColours: [
      "#8FBC8F",
      "#7CFC00",
      "#00FFFF",
      "#20B2AA",
      "#B0E0E6",
      "#FFFFE0"
    ],
    sectionFills: [
      "#191970",
      "#8B008B",
      "#4B0082",
      "#2F4F4F",
      "#800000",
      "#8B4513",
      "#00008B"
    ],
    sectionColours: [
      "#fff"
    ],
    disableMulticolor: !1
  },
  gitGraph: {
    useMaxWidth: !0,
    titleTopMargin: 25,
    diagramPadding: 8,
    nodeLabel: {
      width: 75,
      height: 100,
      x: -25,
      y: 0
    },
    mainBranchName: "main",
    mainBranchOrder: 0,
    showCommitLabel: !0,
    showBranches: !0,
    rotateCommitLabel: !0,
    parallelCommits: !1,
    arrowMarkerAbsolute: !1
  },
  c4: {
    useMaxWidth: !0,
    diagramMarginX: 50,
    diagramMarginY: 10,
    c4ShapeMargin: 50,
    c4ShapePadding: 20,
    width: 216,
    height: 60,
    boxMargin: 10,
    c4ShapeInRow: 4,
    nextLinePaddingX: 0,
    c4BoundaryInRow: 2,
    personFontSize: 14,
    personFontFamily: '"Open Sans", sans-serif',
    personFontWeight: "normal",
    external_personFontSize: 14,
    external_personFontFamily: '"Open Sans", sans-serif',
    external_personFontWeight: "normal",
    systemFontSize: 14,
    systemFontFamily: '"Open Sans", sans-serif',
    systemFontWeight: "normal",
    external_systemFontSize: 14,
    external_systemFontFamily: '"Open Sans", sans-serif',
    external_systemFontWeight: "normal",
    system_dbFontSize: 14,
    system_dbFontFamily: '"Open Sans", sans-serif',
    system_dbFontWeight: "normal",
    external_system_dbFontSize: 14,
    external_system_dbFontFamily: '"Open Sans", sans-serif',
    external_system_dbFontWeight: "normal",
    system_queueFontSize: 14,
    system_queueFontFamily: '"Open Sans", sans-serif',
    system_queueFontWeight: "normal",
    external_system_queueFontSize: 14,
    external_system_queueFontFamily: '"Open Sans", sans-serif',
    external_system_queueFontWeight: "normal",
    boundaryFontSize: 14,
    boundaryFontFamily: '"Open Sans", sans-serif',
    boundaryFontWeight: "normal",
    messageFontSize: 12,
    messageFontFamily: '"Open Sans", sans-serif',
    messageFontWeight: "normal",
    containerFontSize: 14,
    containerFontFamily: '"Open Sans", sans-serif',
    containerFontWeight: "normal",
    external_containerFontSize: 14,
    external_containerFontFamily: '"Open Sans", sans-serif',
    external_containerFontWeight: "normal",
    container_dbFontSize: 14,
    container_dbFontFamily: '"Open Sans", sans-serif',
    container_dbFontWeight: "normal",
    external_container_dbFontSize: 14,
    external_container_dbFontFamily: '"Open Sans", sans-serif',
    external_container_dbFontWeight: "normal",
    container_queueFontSize: 14,
    container_queueFontFamily: '"Open Sans", sans-serif',
    container_queueFontWeight: "normal",
    external_container_queueFontSize: 14,
    external_container_queueFontFamily: '"Open Sans", sans-serif',
    external_container_queueFontWeight: "normal",
    componentFontSize: 14,
    componentFontFamily: '"Open Sans", sans-serif',
    componentFontWeight: "normal",
    external_componentFontSize: 14,
    external_componentFontFamily: '"Open Sans", sans-serif',
    external_componentFontWeight: "normal",
    component_dbFontSize: 14,
    component_dbFontFamily: '"Open Sans", sans-serif',
    component_dbFontWeight: "normal",
    external_component_dbFontSize: 14,
    external_component_dbFontFamily: '"Open Sans", sans-serif',
    external_component_dbFontWeight: "normal",
    component_queueFontSize: 14,
    component_queueFontFamily: '"Open Sans", sans-serif',
    component_queueFontWeight: "normal",
    external_component_queueFontSize: 14,
    external_component_queueFontFamily: '"Open Sans", sans-serif',
    external_component_queueFontWeight: "normal",
    wrap: !0,
    wrapPadding: 10,
    person_bg_color: "#08427B",
    person_border_color: "#073B6F",
    external_person_bg_color: "#686868",
    external_person_border_color: "#8A8A8A",
    system_bg_color: "#1168BD",
    system_border_color: "#3C7FC0",
    system_db_bg_color: "#1168BD",
    system_db_border_color: "#3C7FC0",
    system_queue_bg_color: "#1168BD",
    system_queue_border_color: "#3C7FC0",
    external_system_bg_color: "#999999",
    external_system_border_color: "#8A8A8A",
    external_system_db_bg_color: "#999999",
    external_system_db_border_color: "#8A8A8A",
    external_system_queue_bg_color: "#999999",
    external_system_queue_border_color: "#8A8A8A",
    container_bg_color: "#438DD5",
    container_border_color: "#3C7FC0",
    container_db_bg_color: "#438DD5",
    container_db_border_color: "#3C7FC0",
    container_queue_bg_color: "#438DD5",
    container_queue_border_color: "#3C7FC0",
    external_container_bg_color: "#B3B3B3",
    external_container_border_color: "#A6A6A6",
    external_container_db_bg_color: "#B3B3B3",
    external_container_db_border_color: "#A6A6A6",
    external_container_queue_bg_color: "#B3B3B3",
    external_container_queue_border_color: "#A6A6A6",
    component_bg_color: "#85BBF0",
    component_border_color: "#78A8D8",
    component_db_bg_color: "#85BBF0",
    component_db_border_color: "#78A8D8",
    component_queue_bg_color: "#85BBF0",
    component_queue_border_color: "#78A8D8",
    external_component_bg_color: "#CCCCCC",
    external_component_border_color: "#BFBFBF",
    external_component_db_bg_color: "#CCCCCC",
    external_component_db_border_color: "#BFBFBF",
    external_component_queue_bg_color: "#CCCCCC",
    external_component_queue_border_color: "#BFBFBF"
  },
  sankey: {
    useMaxWidth: !0,
    width: 600,
    height: 400,
    linkColor: "gradient",
    nodeAlignment: "justify",
    showValues: !0,
    prefix: "",
    suffix: ""
  },
  block: {
    useMaxWidth: !0,
    padding: 8
  },
  theme: "default",
  maxTextSize: 5e4,
  maxEdges: 500,
  darkMode: !1,
  fontFamily: '"trebuchet ms", verdana, arial, sans-serif;',
  logLevel: 5,
  securityLevel: "strict",
  startOnLoad: !0,
  arrowMarkerAbsolute: !1,
  secure: [
    "secure",
    "securityLevel",
    "startOnLoad",
    "maxTextSize",
    "maxEdges"
  ],
  legacyMathML: !1,
  deterministicIds: !1,
  fontSize: 16
}, Ia = {
  ...jt,
  // Set, even though they're `undefined` so that `configKeys` finds these keys
  // TODO: Should we replace these with `null` so that they can go in the JSON Schema?
  deterministicIDSeed: void 0,
  themeCSS: void 0,
  // add non-JSON default config values
  themeVariables: Gt.default.getThemeVariables(),
  sequence: {
    ...jt.sequence,
    messageFont: function() {
      return {
        fontFamily: this.messageFontFamily,
        fontSize: this.messageFontSize,
        fontWeight: this.messageFontWeight
      };
    },
    noteFont: function() {
      return {
        fontFamily: this.noteFontFamily,
        fontSize: this.noteFontSize,
        fontWeight: this.noteFontWeight
      };
    },
    actorFont: function() {
      return {
        fontFamily: this.actorFontFamily,
        fontSize: this.actorFontSize,
        fontWeight: this.actorFontWeight
      };
    }
  },
  gantt: {
    ...jt.gantt,
    tickInterval: void 0,
    useWidth: void 0
    // can probably be removed since `configKeys` already includes this
  },
  c4: {
    ...jt.c4,
    useWidth: void 0,
    personFont: function() {
      return {
        fontFamily: this.personFontFamily,
        fontSize: this.personFontSize,
        fontWeight: this.personFontWeight
      };
    },
    external_personFont: function() {
      return {
        fontFamily: this.external_personFontFamily,
        fontSize: this.external_personFontSize,
        fontWeight: this.external_personFontWeight
      };
    },
    systemFont: function() {
      return {
        fontFamily: this.systemFontFamily,
        fontSize: this.systemFontSize,
        fontWeight: this.systemFontWeight
      };
    },
    external_systemFont: function() {
      return {
        fontFamily: this.external_systemFontFamily,
        fontSize: this.external_systemFontSize,
        fontWeight: this.external_systemFontWeight
      };
    },
    system_dbFont: function() {
      return {
        fontFamily: this.system_dbFontFamily,
        fontSize: this.system_dbFontSize,
        fontWeight: this.system_dbFontWeight
      };
    },
    external_system_dbFont: function() {
      return {
        fontFamily: this.external_system_dbFontFamily,
        fontSize: this.external_system_dbFontSize,
        fontWeight: this.external_system_dbFontWeight
      };
    },
    system_queueFont: function() {
      return {
        fontFamily: this.system_queueFontFamily,
        fontSize: this.system_queueFontSize,
        fontWeight: this.system_queueFontWeight
      };
    },
    external_system_queueFont: function() {
      return {
        fontFamily: this.external_system_queueFontFamily,
        fontSize: this.external_system_queueFontSize,
        fontWeight: this.external_system_queueFontWeight
      };
    },
    containerFont: function() {
      return {
        fontFamily: this.containerFontFamily,
        fontSize: this.containerFontSize,
        fontWeight: this.containerFontWeight
      };
    },
    external_containerFont: function() {
      return {
        fontFamily: this.external_containerFontFamily,
        fontSize: this.external_containerFontSize,
        fontWeight: this.external_containerFontWeight
      };
    },
    container_dbFont: function() {
      return {
        fontFamily: this.container_dbFontFamily,
        fontSize: this.container_dbFontSize,
        fontWeight: this.container_dbFontWeight
      };
    },
    external_container_dbFont: function() {
      return {
        fontFamily: this.external_container_dbFontFamily,
        fontSize: this.external_container_dbFontSize,
        fontWeight: this.external_container_dbFontWeight
      };
    },
    container_queueFont: function() {
      return {
        fontFamily: this.container_queueFontFamily,
        fontSize: this.container_queueFontSize,
        fontWeight: this.container_queueFontWeight
      };
    },
    external_container_queueFont: function() {
      return {
        fontFamily: this.external_container_queueFontFamily,
        fontSize: this.external_container_queueFontSize,
        fontWeight: this.external_container_queueFontWeight
      };
    },
    componentFont: function() {
      return {
        fontFamily: this.componentFontFamily,
        fontSize: this.componentFontSize,
        fontWeight: this.componentFontWeight
      };
    },
    external_componentFont: function() {
      return {
        fontFamily: this.external_componentFontFamily,
        fontSize: this.external_componentFontSize,
        fontWeight: this.external_componentFontWeight
      };
    },
    component_dbFont: function() {
      return {
        fontFamily: this.component_dbFontFamily,
        fontSize: this.component_dbFontSize,
        fontWeight: this.component_dbFontWeight
      };
    },
    external_component_dbFont: function() {
      return {
        fontFamily: this.external_component_dbFontFamily,
        fontSize: this.external_component_dbFontSize,
        fontWeight: this.external_component_dbFontWeight
      };
    },
    component_queueFont: function() {
      return {
        fontFamily: this.component_queueFontFamily,
        fontSize: this.component_queueFontSize,
        fontWeight: this.component_queueFontWeight
      };
    },
    external_component_queueFont: function() {
      return {
        fontFamily: this.external_component_queueFontFamily,
        fontSize: this.external_component_queueFontSize,
        fontWeight: this.external_component_queueFontWeight
      };
    },
    boundaryFont: function() {
      return {
        fontFamily: this.boundaryFontFamily,
        fontSize: this.boundaryFontSize,
        fontWeight: this.boundaryFontWeight
      };
    },
    messageFont: function() {
      return {
        fontFamily: this.messageFontFamily,
        fontSize: this.messageFontSize,
        fontWeight: this.messageFontWeight
      };
    }
  },
  pie: {
    ...jt.pie,
    useWidth: 984
  },
  xyChart: {
    ...jt.xyChart,
    useWidth: void 0
  },
  requirement: {
    ...jt.requirement,
    useWidth: void 0
  },
  gitGraph: {
    ...jt.gitGraph,
    // TODO: This is a temporary override for `gitGraph`, since every other
    //       diagram does have `useMaxWidth`, but instead sets it to `true`.
    //       Should we set this to `true` instead?
    useMaxWidth: !1
  },
  sankey: {
    ...jt.sankey,
    // this is false, unlike every other diagram (other than gitGraph)
    // TODO: can we make this default to `true` instead?
    useMaxWidth: !1
  }
}, Da = (t, e = "") => Object.keys(t).reduce((i, r) => Array.isArray(t[r]) ? i : typeof t[r] == "object" && t[r] !== null ? [...i, e + r, ...Da(t[r], "")] : [...i, e + r], []), mp = new Set(Da(Ia, "")), yp = Ia, Qi = (t) => {
  if (L.debug("sanitizeDirective called with", t), !(typeof t != "object" || t == null)) {
    if (Array.isArray(t)) {
      t.forEach((e) => Qi(e));
      return;
    }
    for (const e of Object.keys(t)) {
      if (L.debug("Checking key", e), e.startsWith("__") || e.includes("proto") || e.includes("constr") || !mp.has(e) || t[e] == null) {
        L.debug("sanitize deleting key: ", e), delete t[e];
        continue;
      }
      if (typeof t[e] == "object") {
        L.debug("sanitizing object", e), Qi(t[e]);
        continue;
      }
      const i = ["themeCSS", "fontFamily", "altFontFamily"];
      for (const r of i)
        e.includes(r) && (L.debug("sanitizing css option", e), t[e] = _p(t[e]));
    }
    if (t.themeVariables)
      for (const e of Object.keys(t.themeVariables)) {
        const i = t.themeVariables[e];
        i != null && i.match && !i.match(/^[\d "#%(),.;A-Za-z]+$/) && (t.themeVariables[e] = "");
      }
    L.debug("After sanitization", t);
  }
}, _p = (t) => {
  let e = 0, i = 0;
  for (const r of t) {
    if (e < i)
      return "{ /* ERROR: Unbalanced CSS */ }";
    r === "{" ? e++ : r === "}" && i++;
  }
  return e !== i ? "{ /* ERROR: Unbalanced CSS */ }" : t;
}, Na = /^-{3}\s*[\n\r](.*?)[\n\r]-{3}\s*[\n\r]+/s, Qe = /%{2}{\s*(?:(\w+)\s*:|(\w+))\s*(?:(\w+)|((?:(?!}%{2}).|\r?\n)*))?\s*(?:}%{2})?/gi, Cp = /\s*%%.*\n/gm;
class Ra extends Error {
  constructor(e) {
    super(e), this.name = "UnknownDiagramError";
  }
}
const Me = {}, xr = function(t, e) {
  t = t.replace(Na, "").replace(Qe, "").replace(Cp, `
`);
  for (const [i, { detector: r }] of Object.entries(Me))
    if (r(t, e))
      return i;
  throw new Ra(
    `No diagram type detected matching given configuration for text: ${t}`
  );
}, Pa = (...t) => {
  for (const { id: e, detector: i, loader: r } of t)
    qa(e, i, r);
}, qa = (t, e, i) => {
  Me[t] ? L.error(`Detector with key ${t} already exists`) : Me[t] = { detector: e, loader: i }, L.debug(`Detector with key ${t} added${i ? " with loader" : ""}`);
}, xp = (t) => Me[t].loader, cn = (t, e, { depth: i = 2, clobber: r = !1 } = {}) => {
  const n = { depth: i, clobber: r };
  return Array.isArray(e) && !Array.isArray(t) ? (e.forEach((o) => cn(t, o, n)), t) : Array.isArray(e) && Array.isArray(t) ? (e.forEach((o) => {
    t.includes(o) || t.push(o);
  }), t) : t === void 0 || i <= 0 ? t != null && typeof t == "object" && typeof e == "object" ? Object.assign(t, e) : e : (e !== void 0 && typeof t == "object" && typeof e == "object" && Object.keys(e).forEach((o) => {
    typeof e[o] == "object" && (t[o] === void 0 || typeof t[o] == "object") ? (t[o] === void 0 && (t[o] = Array.isArray(e[o]) ? [] : {}), t[o] = cn(t[o], e[o], { depth: i - 1, clobber: r })) : (r || typeof t[o] != "object" && typeof e[o] != "object") && (t[o] = e[o]);
  }), t);
}, st = cn;
var bp = typeof global == "object" && global && global.Object === Object && global;
const za = bp;
var Tp = typeof self == "object" && self && self.Object === Object && self, kp = za || Tp || Function("return this")();
const Dt = kp;
var Sp = Dt.Symbol;
const tr = Sp;
var Wa = Object.prototype, vp = Wa.hasOwnProperty, wp = Wa.toString, Ge = tr ? tr.toStringTag : void 0;
function Bp(t) {
  var e = vp.call(t, Ge), i = t[Ge];
  try {
    t[Ge] = void 0;
    var r = !0;
  } catch {
  }
  var n = wp.call(t);
  return r && (e ? t[Ge] = i : delete t[Ge]), n;
}
var Fp = Object.prototype, Ap = Fp.toString;
function Lp(t) {
  return Ap.call(t);
}
var Ep = "[object Null]", Mp = "[object Undefined]", es = tr ? tr.toStringTag : void 0;
function Ne(t) {
  return t == null ? t === void 0 ? Mp : Ep : es && es in Object(t) ? Bp(t) : Lp(t);
}
function ye(t) {
  var e = typeof t;
  return t != null && (e == "object" || e == "function");
}
var Op = "[object AsyncFunction]", $p = "[object Function]", Ip = "[object GeneratorFunction]", Dp = "[object Proxy]";
function In(t) {
  if (!ye(t))
    return !1;
  var e = Ne(t);
  return e == $p || e == Ip || e == Op || e == Dp;
}
var Np = Dt["__core-js_shared__"];
const jr = Np;
var is = function() {
  var t = /[^.]+$/.exec(jr && jr.keys && jr.keys.IE_PROTO || "");
  return t ? "Symbol(src)_1." + t : "";
}();
function Rp(t) {
  return !!is && is in t;
}
var Pp = Function.prototype, qp = Pp.toString;
function _e(t) {
  if (t != null) {
    try {
      return qp.call(t);
    } catch {
    }
    try {
      return t + "";
    } catch {
    }
  }
  return "";
}
var zp = /[\\^$.*+?()[\]{}|]/g, Wp = /^\[object .+?Constructor\]$/, Hp = Function.prototype, jp = Object.prototype, Up = Hp.toString, Yp = jp.hasOwnProperty, Gp = RegExp(
  "^" + Up.call(Yp).replace(zp, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Vp(t) {
  if (!ye(t) || Rp(t))
    return !1;
  var e = In(t) ? Gp : Wp;
  return e.test(_e(t));
}
function Xp(t, e) {
  return t == null ? void 0 : t[e];
}
function Ce(t, e) {
  var i = Xp(t, e);
  return Vp(i) ? i : void 0;
}
var Kp = Ce(Object, "create");
const li = Kp;
function Zp() {
  this.__data__ = li ? li(null) : {}, this.size = 0;
}
function Jp(t) {
  var e = this.has(t) && delete this.__data__[t];
  return this.size -= e ? 1 : 0, e;
}
var Qp = "__lodash_hash_undefined__", tg = Object.prototype, eg = tg.hasOwnProperty;
function ig(t) {
  var e = this.__data__;
  if (li) {
    var i = e[t];
    return i === Qp ? void 0 : i;
  }
  return eg.call(e, t) ? e[t] : void 0;
}
var rg = Object.prototype, ng = rg.hasOwnProperty;
function og(t) {
  var e = this.__data__;
  return li ? e[t] !== void 0 : ng.call(e, t);
}
var sg = "__lodash_hash_undefined__";
function ag(t, e) {
  var i = this.__data__;
  return this.size += this.has(t) ? 0 : 1, i[t] = li && e === void 0 ? sg : e, this;
}
function ge(t) {
  var e = -1, i = t == null ? 0 : t.length;
  for (this.clear(); ++e < i; ) {
    var r = t[e];
    this.set(r[0], r[1]);
  }
}
ge.prototype.clear = Zp;
ge.prototype.delete = Jp;
ge.prototype.get = ig;
ge.prototype.has = og;
ge.prototype.set = ag;
function lg() {
  this.__data__ = [], this.size = 0;
}
function br(t, e) {
  return t === e || t !== t && e !== e;
}
function Tr(t, e) {
  for (var i = t.length; i--; )
    if (br(t[i][0], e))
      return i;
  return -1;
}
var hg = Array.prototype, cg = hg.splice;
function ug(t) {
  var e = this.__data__, i = Tr(e, t);
  if (i < 0)
    return !1;
  var r = e.length - 1;
  return i == r ? e.pop() : cg.call(e, i, 1), --this.size, !0;
}
function fg(t) {
  var e = this.__data__, i = Tr(e, t);
  return i < 0 ? void 0 : e[i][1];
}
function dg(t) {
  return Tr(this.__data__, t) > -1;
}
function pg(t, e) {
  var i = this.__data__, r = Tr(i, t);
  return r < 0 ? (++this.size, i.push([t, e])) : i[r][1] = e, this;
}
function Xt(t) {
  var e = -1, i = t == null ? 0 : t.length;
  for (this.clear(); ++e < i; ) {
    var r = t[e];
    this.set(r[0], r[1]);
  }
}
Xt.prototype.clear = lg;
Xt.prototype.delete = ug;
Xt.prototype.get = fg;
Xt.prototype.has = dg;
Xt.prototype.set = pg;
var gg = Ce(Dt, "Map");
const hi = gg;
function mg() {
  this.size = 0, this.__data__ = {
    hash: new ge(),
    map: new (hi || Xt)(),
    string: new ge()
  };
}
function yg(t) {
  var e = typeof t;
  return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? t !== "__proto__" : t === null;
}
function kr(t, e) {
  var i = t.__data__;
  return yg(e) ? i[typeof e == "string" ? "string" : "hash"] : i.map;
}
function _g(t) {
  var e = kr(this, t).delete(t);
  return this.size -= e ? 1 : 0, e;
}
function Cg(t) {
  return kr(this, t).get(t);
}
function xg(t) {
  return kr(this, t).has(t);
}
function bg(t, e) {
  var i = kr(this, t), r = i.size;
  return i.set(t, e), this.size += i.size == r ? 0 : 1, this;
}
function ne(t) {
  var e = -1, i = t == null ? 0 : t.length;
  for (this.clear(); ++e < i; ) {
    var r = t[e];
    this.set(r[0], r[1]);
  }
}
ne.prototype.clear = mg;
ne.prototype.delete = _g;
ne.prototype.get = Cg;
ne.prototype.has = xg;
ne.prototype.set = bg;
var Tg = "Expected a function";
function yi(t, e) {
  if (typeof t != "function" || e != null && typeof e != "function")
    throw new TypeError(Tg);
  var i = function() {
    var r = arguments, n = e ? e.apply(this, r) : r[0], o = i.cache;
    if (o.has(n))
      return o.get(n);
    var s = t.apply(this, r);
    return i.cache = o.set(n, s) || o, s;
  };
  return i.cache = new (yi.Cache || ne)(), i;
}
yi.Cache = ne;
function kg() {
  this.__data__ = new Xt(), this.size = 0;
}
function Sg(t) {
  var e = this.__data__, i = e.delete(t);
  return this.size = e.size, i;
}
function vg(t) {
  return this.__data__.get(t);
}
function wg(t) {
  return this.__data__.has(t);
}
var Bg = 200;
function Fg(t, e) {
  var i = this.__data__;
  if (i instanceof Xt) {
    var r = i.__data__;
    if (!hi || r.length < Bg - 1)
      return r.push([t, e]), this.size = ++i.size, this;
    i = this.__data__ = new ne(r);
  }
  return i.set(t, e), this.size = i.size, this;
}
function Re(t) {
  var e = this.__data__ = new Xt(t);
  this.size = e.size;
}
Re.prototype.clear = kg;
Re.prototype.delete = Sg;
Re.prototype.get = vg;
Re.prototype.has = wg;
Re.prototype.set = Fg;
var Ag = function() {
  try {
    var t = Ce(Object, "defineProperty");
    return t({}, "", {}), t;
  } catch {
  }
}();
const er = Ag;
function Dn(t, e, i) {
  e == "__proto__" && er ? er(t, e, {
    configurable: !0,
    enumerable: !0,
    value: i,
    writable: !0
  }) : t[e] = i;
}
function un(t, e, i) {
  (i !== void 0 && !br(t[e], i) || i === void 0 && !(e in t)) && Dn(t, e, i);
}
function Lg(t) {
  return function(e, i, r) {
    for (var n = -1, o = Object(e), s = r(e), a = s.length; a--; ) {
      var l = s[t ? a : ++n];
      if (i(o[l], l, o) === !1)
        break;
    }
    return e;
  };
}
var Eg = Lg();
const Mg = Eg;
var Ha = typeof exports == "object" && exports && !exports.nodeType && exports, rs = Ha && typeof module == "object" && module && !module.nodeType && module, Og = rs && rs.exports === Ha, ns = Og ? Dt.Buffer : void 0, os = ns ? ns.allocUnsafe : void 0;
function $g(t, e) {
  if (e)
    return t.slice();
  var i = t.length, r = os ? os(i) : new t.constructor(i);
  return t.copy(r), r;
}
var Ig = Dt.Uint8Array;
const ss = Ig;
function Dg(t) {
  var e = new t.constructor(t.byteLength);
  return new ss(e).set(new ss(t)), e;
}
function Ng(t, e) {
  var i = e ? Dg(t.buffer) : t.buffer;
  return new t.constructor(i, t.byteOffset, t.length);
}
function Rg(t, e) {
  var i = -1, r = t.length;
  for (e || (e = Array(r)); ++i < r; )
    e[i] = t[i];
  return e;
}
var as = Object.create, Pg = function() {
  function t() {
  }
  return function(e) {
    if (!ye(e))
      return {};
    if (as)
      return as(e);
    t.prototype = e;
    var i = new t();
    return t.prototype = void 0, i;
  };
}();
const qg = Pg;
function ja(t, e) {
  return function(i) {
    return t(e(i));
  };
}
var zg = ja(Object.getPrototypeOf, Object);
const Ua = zg;
var Wg = Object.prototype;
function Sr(t) {
  var e = t && t.constructor, i = typeof e == "function" && e.prototype || Wg;
  return t === i;
}
function Hg(t) {
  return typeof t.constructor == "function" && !Sr(t) ? qg(Ua(t)) : {};
}
function _i(t) {
  return t != null && typeof t == "object";
}
var jg = "[object Arguments]";
function ls(t) {
  return _i(t) && Ne(t) == jg;
}
var Ya = Object.prototype, Ug = Ya.hasOwnProperty, Yg = Ya.propertyIsEnumerable, Gg = ls(function() {
  return arguments;
}()) ? ls : function(t) {
  return _i(t) && Ug.call(t, "callee") && !Yg.call(t, "callee");
};
const ir = Gg;
var Vg = Array.isArray;
const rr = Vg;
var Xg = 9007199254740991;
function Ga(t) {
  return typeof t == "number" && t > -1 && t % 1 == 0 && t <= Xg;
}
function vr(t) {
  return t != null && Ga(t.length) && !In(t);
}
function Kg(t) {
  return _i(t) && vr(t);
}
function Zg() {
  return !1;
}
var Va = typeof exports == "object" && exports && !exports.nodeType && exports, hs = Va && typeof module == "object" && module && !module.nodeType && module, Jg = hs && hs.exports === Va, cs = Jg ? Dt.Buffer : void 0, Qg = cs ? cs.isBuffer : void 0, tm = Qg || Zg;
const Nn = tm;
var em = "[object Object]", im = Function.prototype, rm = Object.prototype, Xa = im.toString, nm = rm.hasOwnProperty, om = Xa.call(Object);
function sm(t) {
  if (!_i(t) || Ne(t) != em)
    return !1;
  var e = Ua(t);
  if (e === null)
    return !0;
  var i = nm.call(e, "constructor") && e.constructor;
  return typeof i == "function" && i instanceof i && Xa.call(i) == om;
}
var am = "[object Arguments]", lm = "[object Array]", hm = "[object Boolean]", cm = "[object Date]", um = "[object Error]", fm = "[object Function]", dm = "[object Map]", pm = "[object Number]", gm = "[object Object]", mm = "[object RegExp]", ym = "[object Set]", _m = "[object String]", Cm = "[object WeakMap]", xm = "[object ArrayBuffer]", bm = "[object DataView]", Tm = "[object Float32Array]", km = "[object Float64Array]", Sm = "[object Int8Array]", vm = "[object Int16Array]", wm = "[object Int32Array]", Bm = "[object Uint8Array]", Fm = "[object Uint8ClampedArray]", Am = "[object Uint16Array]", Lm = "[object Uint32Array]", U = {};
U[Tm] = U[km] = U[Sm] = U[vm] = U[wm] = U[Bm] = U[Fm] = U[Am] = U[Lm] = !0;
U[am] = U[lm] = U[xm] = U[hm] = U[bm] = U[cm] = U[um] = U[fm] = U[dm] = U[pm] = U[gm] = U[mm] = U[ym] = U[_m] = U[Cm] = !1;
function Em(t) {
  return _i(t) && Ga(t.length) && !!U[Ne(t)];
}
function Mm(t) {
  return function(e) {
    return t(e);
  };
}
var Ka = typeof exports == "object" && exports && !exports.nodeType && exports, ti = Ka && typeof module == "object" && module && !module.nodeType && module, Om = ti && ti.exports === Ka, Ur = Om && za.process, $m = function() {
  try {
    var t = ti && ti.require && ti.require("util").types;
    return t || Ur && Ur.binding && Ur.binding("util");
  } catch {
  }
}();
const us = $m;
var fs = us && us.isTypedArray, Im = fs ? Mm(fs) : Em;
const Rn = Im;
function fn(t, e) {
  if (!(e === "constructor" && typeof t[e] == "function") && e != "__proto__")
    return t[e];
}
var Dm = Object.prototype, Nm = Dm.hasOwnProperty;
function Rm(t, e, i) {
  var r = t[e];
  (!(Nm.call(t, e) && br(r, i)) || i === void 0 && !(e in t)) && Dn(t, e, i);
}
function Pm(t, e, i, r) {
  var n = !i;
  i || (i = {});
  for (var o = -1, s = e.length; ++o < s; ) {
    var a = e[o], l = r ? r(i[a], t[a], a, i, t) : void 0;
    l === void 0 && (l = t[a]), n ? Dn(i, a, l) : Rm(i, a, l);
  }
  return i;
}
function qm(t, e) {
  for (var i = -1, r = Array(t); ++i < t; )
    r[i] = e(i);
  return r;
}
var zm = 9007199254740991, Wm = /^(?:0|[1-9]\d*)$/;
function Za(t, e) {
  var i = typeof t;
  return e = e ?? zm, !!e && (i == "number" || i != "symbol" && Wm.test(t)) && t > -1 && t % 1 == 0 && t < e;
}
var Hm = Object.prototype, jm = Hm.hasOwnProperty;
function Um(t, e) {
  var i = rr(t), r = !i && ir(t), n = !i && !r && Nn(t), o = !i && !r && !n && Rn(t), s = i || r || n || o, a = s ? qm(t.length, String) : [], l = a.length;
  for (var h in t)
    (e || jm.call(t, h)) && !(s && // Safari 9 has enumerable `arguments.length` in strict mode.
    (h == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    n && (h == "offset" || h == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    o && (h == "buffer" || h == "byteLength" || h == "byteOffset") || // Skip index properties.
    Za(h, l))) && a.push(h);
  return a;
}
function Ym(t) {
  var e = [];
  if (t != null)
    for (var i in Object(t))
      e.push(i);
  return e;
}
var Gm = Object.prototype, Vm = Gm.hasOwnProperty;
function Xm(t) {
  if (!ye(t))
    return Ym(t);
  var e = Sr(t), i = [];
  for (var r in t)
    r == "constructor" && (e || !Vm.call(t, r)) || i.push(r);
  return i;
}
function Ja(t) {
  return vr(t) ? Um(t, !0) : Xm(t);
}
function Km(t) {
  return Pm(t, Ja(t));
}
function Zm(t, e, i, r, n, o, s) {
  var a = fn(t, i), l = fn(e, i), h = s.get(l);
  if (h) {
    un(t, i, h);
    return;
  }
  var u = o ? o(a, l, i + "", t, e, s) : void 0, f = u === void 0;
  if (f) {
    var c = rr(l), d = !c && Nn(l), m = !c && !d && Rn(l);
    u = l, c || d || m ? rr(a) ? u = a : Kg(a) ? u = Rg(a) : d ? (f = !1, u = $g(l, !0)) : m ? (f = !1, u = Ng(l, !0)) : u = [] : sm(l) || ir(l) ? (u = a, ir(a) ? u = Km(a) : (!ye(a) || In(a)) && (u = Hg(l))) : f = !1;
  }
  f && (s.set(l, u), n(u, l, r, o, s), s.delete(l)), un(t, i, u);
}
function Qa(t, e, i, r, n) {
  t !== e && Mg(e, function(o, s) {
    if (n || (n = new Re()), ye(o))
      Zm(t, e, s, i, Qa, r, n);
    else {
      var a = r ? r(fn(t, s), o, s + "", t, e, n) : void 0;
      a === void 0 && (a = o), un(t, s, a);
    }
  }, Ja);
}
function tl(t) {
  return t;
}
function Jm(t, e, i) {
  switch (i.length) {
    case 0:
      return t.call(e);
    case 1:
      return t.call(e, i[0]);
    case 2:
      return t.call(e, i[0], i[1]);
    case 3:
      return t.call(e, i[0], i[1], i[2]);
  }
  return t.apply(e, i);
}
var ds = Math.max;
function Qm(t, e, i) {
  return e = ds(e === void 0 ? t.length - 1 : e, 0), function() {
    for (var r = arguments, n = -1, o = ds(r.length - e, 0), s = Array(o); ++n < o; )
      s[n] = r[e + n];
    n = -1;
    for (var a = Array(e + 1); ++n < e; )
      a[n] = r[n];
    return a[e] = i(s), Jm(t, this, a);
  };
}
function t0(t) {
  return function() {
    return t;
  };
}
var e0 = er ? function(t, e) {
  return er(t, "toString", {
    configurable: !0,
    enumerable: !1,
    value: t0(e),
    writable: !0
  });
} : tl;
const i0 = e0;
var r0 = 800, n0 = 16, o0 = Date.now;
function s0(t) {
  var e = 0, i = 0;
  return function() {
    var r = o0(), n = n0 - (r - i);
    if (i = r, n > 0) {
      if (++e >= r0)
        return arguments[0];
    } else
      e = 0;
    return t.apply(void 0, arguments);
  };
}
var a0 = s0(i0);
const l0 = a0;
function h0(t, e) {
  return l0(Qm(t, e, tl), t + "");
}
function c0(t, e, i) {
  if (!ye(i))
    return !1;
  var r = typeof e;
  return (r == "number" ? vr(i) && Za(e, i.length) : r == "string" && e in i) ? br(i[e], t) : !1;
}
function u0(t) {
  return h0(function(e, i) {
    var r = -1, n = i.length, o = n > 1 ? i[n - 1] : void 0, s = n > 2 ? i[2] : void 0;
    for (o = t.length > 3 && typeof o == "function" ? (n--, o) : void 0, s && c0(i[0], i[1], s) && (o = n < 3 ? void 0 : o, n = 1), e = Object(e); ++r < n; ) {
      var a = i[r];
      a && t(e, a, r, o);
    }
    return e;
  });
}
var f0 = u0(function(t, e, i) {
  Qa(t, e, i);
});
const d0 = f0, p0 = "​", g0 = {
  curveBasis: Pf,
  curveBasisClosed: qf,
  curveBasisOpen: zf,
  curveBumpX: Nf,
  curveBumpY: Rf,
  curveBundle: Wf,
  curveCardinalClosed: jf,
  curveCardinalOpen: Uf,
  curveCardinal: Hf,
  curveCatmullRomClosed: Gf,
  curveCatmullRomOpen: Vf,
  curveCatmullRom: Yf,
  curveLinear: Df,
  curveLinearClosed: Xf,
  curveMonotoneX: Kf,
  curveMonotoneY: Zf,
  curveNatural: Jf,
  curveStep: Qf,
  curveStepAfter: ed,
  curveStepBefore: td
}, m0 = /\s*(?:(\w+)(?=:):|(\w+))\s*(?:(\w+)|((?:(?!}%{2}).|\r?\n)*))?\s*(?:}%{2})?/gi, y0 = function(t, e) {
  const i = el(t, /(?:init\b)|(?:initialize\b)/);
  let r = {};
  if (Array.isArray(i)) {
    const s = i.map((a) => a.args);
    Qi(s), r = st(r, [...s]);
  } else
    r = i.args;
  if (!r)
    return;
  let n = xr(t, e);
  const o = "config";
  return r[o] !== void 0 && (n === "flowchart-v2" && (n = "flowchart"), r[n] = r[o], delete r[o]), r;
}, el = function(t, e = null) {
  try {
    const i = new RegExp(
      `[%]{2}(?![{]${m0.source})(?=[}][%]{2}).*
`,
      "ig"
    );
    t = t.trim().replace(i, "").replace(/'/gm, '"'), L.debug(
      `Detecting diagram directive${e !== null ? " type:" + e : ""} based on the text:${t}`
    );
    let r;
    const n = [];
    for (; (r = Qe.exec(t)) !== null; )
      if (r.index === Qe.lastIndex && Qe.lastIndex++, r && !e || e && r[1] && r[1].match(e) || e && r[2] && r[2].match(e)) {
        const o = r[1] ? r[1] : r[2], s = r[3] ? r[3].trim() : r[4] ? JSON.parse(r[4].trim()) : null;
        n.push({ type: o, args: s });
      }
    return n.length === 0 ? { type: t, args: null } : n.length === 1 ? n[0] : n;
  } catch (i) {
    return L.error(
      `ERROR: ${i.message} - Unable to parse directive type: '${e}' based on the text: '${t}'`
    ), { type: void 0, args: null };
  }
}, _0 = function(t) {
  return t.replace(Qe, "");
}, C0 = function(t, e) {
  for (const [i, r] of e.entries())
    if (r.match(t))
      return i;
  return -1;
};
function x0(t, e) {
  if (!t)
    return e;
  const i = `curve${t.charAt(0).toUpperCase() + t.slice(1)}`;
  return g0[i] ?? e;
}
function b0(t, e) {
  const i = t.trim();
  if (i)
    return e.securityLevel !== "loose" ? Rs.sanitizeUrl(i) : i;
}
const T0 = (t, ...e) => {
  const i = t.split("."), r = i.length - 1, n = i[r];
  let o = window;
  for (let s = 0; s < r; s++)
    if (o = o[i[s]], !o) {
      L.error(`Function name: ${t} not found in window`);
      return;
    }
  o[n](...e);
};
function il(t, e) {
  return !t || !e ? 0 : Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2));
}
function k0(t) {
  let e, i = 0;
  t.forEach((n) => {
    i += il(n, e), e = n;
  });
  const r = i / 2;
  return Pn(t, r);
}
function S0(t) {
  return t.length === 1 ? t[0] : k0(t);
}
const ps = (t, e = 2) => {
  const i = Math.pow(10, e);
  return Math.round(t * i) / i;
}, Pn = (t, e) => {
  let i, r = e;
  for (const n of t) {
    if (i) {
      const o = il(n, i);
      if (o < r)
        r -= o;
      else {
        const s = r / o;
        if (s <= 0)
          return i;
        if (s >= 1)
          return { x: n.x, y: n.y };
        if (s > 0 && s < 1)
          return {
            x: ps((1 - s) * i.x + s * n.x, 5),
            y: ps((1 - s) * i.y + s * n.y, 5)
          };
      }
    }
    i = n;
  }
  throw new Error("Could not find a suitable point for the given distance");
}, v0 = (t, e, i) => {
  L.info(`our points ${JSON.stringify(e)}`), e[0] !== i && (e = e.reverse());
  const n = Pn(e, 25), o = t ? 10 : 5, s = Math.atan2(e[0].y - n.y, e[0].x - n.x), a = { x: 0, y: 0 };
  return a.x = Math.sin(s) * o + (e[0].x + n.x) / 2, a.y = -Math.cos(s) * o + (e[0].y + n.y) / 2, a;
};
function w0(t, e, i) {
  const r = structuredClone(i);
  L.info("our points", r), e !== "start_left" && e !== "start_right" && r.reverse();
  const n = 25 + t, o = Pn(r, n), s = 10 + t * 0.5, a = Math.atan2(r[0].y - o.y, r[0].x - o.x), l = { x: 0, y: 0 };
  return e === "start_left" ? (l.x = Math.sin(a + Math.PI) * s + (r[0].x + o.x) / 2, l.y = -Math.cos(a + Math.PI) * s + (r[0].y + o.y) / 2) : e === "end_right" ? (l.x = Math.sin(a - Math.PI) * s + (r[0].x + o.x) / 2 - 5, l.y = -Math.cos(a - Math.PI) * s + (r[0].y + o.y) / 2 - 5) : e === "end_left" ? (l.x = Math.sin(a) * s + (r[0].x + o.x) / 2 - 5, l.y = -Math.cos(a) * s + (r[0].y + o.y) / 2 - 5) : (l.x = Math.sin(a) * s + (r[0].x + o.x) / 2, l.y = -Math.cos(a) * s + (r[0].y + o.y) / 2), l;
}
function B0(t) {
  let e = "", i = "";
  for (const r of t)
    r !== void 0 && (r.startsWith("color:") || r.startsWith("text-align:") ? i = i + r + ";" : e = e + r + ";");
  return { style: e, labelStyle: i };
}
let gs = 0;
const F0 = () => (gs++, "id-" + Math.random().toString(36).substr(2, 12) + "-" + gs);
function A0(t) {
  let e = "";
  const i = "0123456789abcdef", r = i.length;
  for (let n = 0; n < t; n++)
    e += i.charAt(Math.floor(Math.random() * r));
  return e;
}
const L0 = (t) => A0(t.length), E0 = function() {
  return {
    x: 0,
    y: 0,
    fill: void 0,
    anchor: "start",
    style: "#666",
    width: 100,
    height: 100,
    textMargin: 0,
    rx: 0,
    ry: 0,
    valign: void 0,
    text: ""
  };
}, M0 = function(t, e) {
  const i = e.text.replace($n.lineBreakRegex, " "), [, r] = zn(e.fontSize), n = t.append("text");
  n.attr("x", e.x), n.attr("y", e.y), n.style("text-anchor", e.anchor), n.style("font-family", e.fontFamily), n.style("font-size", r), n.style("font-weight", e.fontWeight), n.attr("fill", e.fill), e.class !== void 0 && n.attr("class", e.class);
  const o = n.append("tspan");
  return o.attr("x", e.x + e.textMargin * 2), o.attr("fill", e.fill), o.text(i), n;
}, O0 = yi(
  (t, e, i) => {
    if (!t || (i = Object.assign(
      { fontSize: 12, fontWeight: 400, fontFamily: "Arial", joinWith: "<br/>" },
      i
    ), $n.lineBreakRegex.test(t)))
      return t;
    const r = t.split(" "), n = [];
    let o = "";
    return r.forEach((s, a) => {
      const l = nr(`${s} `, i), h = nr(o, i);
      if (l > e) {
        const { hyphenatedStrings: c, remainingWord: d } = $0(s, e, "-", i);
        n.push(o, ...c), o = d;
      } else
        h + l >= e ? (n.push(o), o = s) : o = [o, s].filter(Boolean).join(" ");
      a + 1 === r.length && n.push(o);
    }), n.filter((s) => s !== "").join(i.joinWith);
  },
  (t, e, i) => `${t}${e}${i.fontSize}${i.fontWeight}${i.fontFamily}${i.joinWith}`
), $0 = yi(
  (t, e, i = "-", r) => {
    r = Object.assign(
      { fontSize: 12, fontWeight: 400, fontFamily: "Arial", margin: 0 },
      r
    );
    const n = [...t], o = [];
    let s = "";
    return n.forEach((a, l) => {
      const h = `${s}${a}`;
      if (nr(h, r) >= e) {
        const f = l + 1, c = n.length === f, d = `${h}${i}`;
        o.push(c ? h : d), s = "";
      } else
        s = h;
    }), { hyphenatedStrings: o, remainingWord: s };
  },
  (t, e, i = "-", r) => `${t}${e}${i}${r.fontSize}${r.fontWeight}${r.fontFamily}`
);
function I0(t, e) {
  return qn(t, e).height;
}
function nr(t, e) {
  return qn(t, e).width;
}
const qn = yi(
  (t, e) => {
    const { fontSize: i = 12, fontFamily: r = "Arial", fontWeight: n = 400 } = e;
    if (!t)
      return { width: 0, height: 0 };
    const [, o] = zn(i), s = ["sans-serif", r], a = t.split($n.lineBreakRegex), l = [], h = bt("body");
    if (!h.remove)
      return { width: 0, height: 0, lineHeight: 0 };
    const u = h.append("svg");
    for (const c of s) {
      let d = 0;
      const m = { width: 0, height: 0, lineHeight: 0 };
      for (const S of a) {
        const O = E0();
        O.text = S || p0;
        const z = M0(u, O).style("font-size", o).style("font-weight", n).style("font-family", c), T = (z._groups || z)[0][0].getBBox();
        if (T.width === 0 && T.height === 0)
          throw new Error("svg element not in render tree");
        m.width = Math.round(Math.max(m.width, T.width)), d = Math.round(T.height), m.height += d, m.lineHeight = Math.round(Math.max(m.lineHeight, d));
      }
      l.push(m);
    }
    u.remove();
    const f = isNaN(l[1].height) || isNaN(l[1].width) || isNaN(l[1].lineHeight) || l[0].height > l[1].height && l[0].width > l[1].width && l[0].lineHeight > l[1].lineHeight ? 0 : 1;
    return l[f];
  },
  (t, e) => `${t}${e.fontSize}${e.fontWeight}${e.fontFamily}`
);
class D0 {
  constructor(e = !1, i) {
    this.count = 0, this.count = i ? i.length : 0, this.next = e ? () => this.count++ : () => Date.now();
  }
}
let Ei;
const N0 = function(t) {
  return Ei = Ei || document.createElement("div"), t = escape(t).replace(/%26/g, "&").replace(/%23/g, "#").replace(/%3B/g, ";"), Ei.innerHTML = t, unescape(Ei.textContent);
};
function rl(t) {
  return "str" in t;
}
const R0 = (t, e, i, r) => {
  var o;
  if (!r)
    return;
  const n = (o = t.node()) == null ? void 0 : o.getBBox();
  n && t.append("text").text(r).attr("x", n.x + n.width / 2).attr("y", -i).attr("class", e);
}, zn = (t) => {
  if (typeof t == "number")
    return [t, t + "px"];
  const e = parseInt(t ?? "", 10);
  return Number.isNaN(e) ? [void 0, void 0] : t === String(e) ? [e, t + "px"] : [e, t];
};
function nl(t, e) {
  return d0({}, t, e);
}
const ei = {
  assignWithDepth: st,
  wrapLabel: O0,
  calculateTextHeight: I0,
  calculateTextWidth: nr,
  calculateTextDimensions: qn,
  cleanAndMerge: nl,
  detectInit: y0,
  detectDirective: el,
  isSubstringInArray: C0,
  interpolateToCurve: x0,
  calcLabelPosition: S0,
  calcCardinalityPosition: v0,
  calcTerminalLabelPosition: w0,
  formatUrl: b0,
  getStylesFromArray: B0,
  generateId: F0,
  random: L0,
  runFunc: T0,
  entityDecode: N0,
  insertTitle: R0,
  parseFontSize: zn,
  InitIDGenerator: D0
}, P0 = function(t) {
  let e = t;
  return e = e.replace(/style.*:\S*#.*;/g, function(i) {
    return i.substring(0, i.length - 1);
  }), e = e.replace(/classDef.*:\S*#.*;/g, function(i) {
    return i.substring(0, i.length - 1);
  }), e = e.replace(/#\w+;/g, function(i) {
    const r = i.substring(1, i.length - 1);
    return /^\+?\d+$/.test(r) ? "ﬂ°°" + r + "¶ß" : "ﬂ°" + r + "¶ß";
  }), e;
}, q0 = function(t) {
  return t.replace(/ﬂ°°/g, "&#").replace(/ﬂ°/g, "&").replace(/¶ß/g, ";");
};
var ol = "comm", sl = "rule", al = "decl", z0 = "@import", W0 = "@keyframes", H0 = "@layer", ll = Math.abs, Wn = String.fromCharCode;
function hl(t) {
  return t.trim();
}
function qi(t, e, i) {
  return t.replace(e, i);
}
function j0(t, e, i) {
  return t.indexOf(e, i);
}
function ci(t, e) {
  return t.charCodeAt(e) | 0;
}
function ui(t, e, i) {
  return t.slice(e, i);
}
function Ut(t) {
  return t.length;
}
function U0(t) {
  return t.length;
}
function Mi(t, e) {
  return e.push(t), t;
}
var wr = 1, Oe = 1, cl = 0, kt = 0, J = 0, Pe = "";
function Hn(t, e, i, r, n, o, s, a) {
  return { value: t, root: e, parent: i, type: r, props: n, children: o, line: wr, column: Oe, length: s, return: "", siblings: a };
}
function Y0() {
  return J;
}
function G0() {
  return J = kt > 0 ? ci(Pe, --kt) : 0, Oe--, J === 10 && (Oe = 1, wr--), J;
}
function Bt() {
  return J = kt < cl ? ci(Pe, kt++) : 0, Oe++, J === 10 && (Oe = 1, wr++), J;
}
function fe() {
  return ci(Pe, kt);
}
function zi() {
  return kt;
}
function Br(t, e) {
  return ui(Pe, t, e);
}
function dn(t) {
  switch (t) {
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    case 59:
    case 123:
    case 125:
      return 4;
    case 58:
      return 3;
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function V0(t) {
  return wr = Oe = 1, cl = Ut(Pe = t), kt = 0, [];
}
function X0(t) {
  return Pe = "", t;
}
function Yr(t) {
  return hl(Br(kt - 1, pn(t === 91 ? t + 2 : t === 40 ? t + 1 : t)));
}
function K0(t) {
  for (; (J = fe()) && J < 33; )
    Bt();
  return dn(t) > 2 || dn(J) > 3 ? "" : " ";
}
function Z0(t, e) {
  for (; --e && Bt() && !(J < 48 || J > 102 || J > 57 && J < 65 || J > 70 && J < 97); )
    ;
  return Br(t, zi() + (e < 6 && fe() == 32 && Bt() == 32));
}
function pn(t) {
  for (; Bt(); )
    switch (J) {
      case t:
        return kt;
      case 34:
      case 39:
        t !== 34 && t !== 39 && pn(J);
        break;
      case 40:
        t === 41 && pn(t);
        break;
      case 92:
        Bt();
        break;
    }
  return kt;
}
function J0(t, e) {
  for (; Bt() && t + J !== 47 + 10; )
    if (t + J === 42 + 42 && fe() === 47)
      break;
  return "/*" + Br(e, kt - 1) + "*" + Wn(t === 47 ? t : Bt());
}
function Q0(t) {
  for (; !dn(fe()); )
    Bt();
  return Br(t, kt);
}
function ty(t) {
  return X0(Wi("", null, null, null, [""], t = V0(t), 0, [0], t));
}
function Wi(t, e, i, r, n, o, s, a, l) {
  for (var h = 0, u = 0, f = s, c = 0, d = 0, m = 0, S = 1, O = 1, z = 1, T = 0, R = "", X = n, G = o, V = r, H = R; O; )
    switch (m = T, T = Bt()) {
      case 40:
        if (m != 108 && ci(H, f - 1) == 58) {
          j0(H += qi(Yr(T), "&", "&\f"), "&\f", ll(h ? a[h - 1] : 0)) != -1 && (z = -1);
          break;
        }
      case 34:
      case 39:
      case 91:
        H += Yr(T);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        H += K0(m);
        break;
      case 92:
        H += Z0(zi() - 1, 7);
        continue;
      case 47:
        switch (fe()) {
          case 42:
          case 47:
            Mi(ey(J0(Bt(), zi()), e, i, l), l);
            break;
          default:
            H += "/";
        }
        break;
      case 123 * S:
        a[h++] = Ut(H) * z;
      case 125 * S:
      case 59:
      case 0:
        switch (T) {
          case 0:
          case 125:
            O = 0;
          case 59 + u:
            z == -1 && (H = qi(H, /\f/g, "")), d > 0 && Ut(H) - f && Mi(d > 32 ? ys(H + ";", r, i, f - 1, l) : ys(qi(H, " ", "") + ";", r, i, f - 2, l), l);
            break;
          case 59:
            H += ";";
          default:
            if (Mi(V = ms(H, e, i, h, u, n, a, R, X = [], G = [], f, o), o), T === 123)
              if (u === 0)
                Wi(H, e, V, V, X, o, f, a, G);
              else
                switch (c === 99 && ci(H, 3) === 110 ? 100 : c) {
                  case 100:
                  case 108:
                  case 109:
                  case 115:
                    Wi(t, V, V, r && Mi(ms(t, V, V, 0, 0, n, a, R, n, X = [], f, G), G), n, G, f, a, r ? X : G);
                    break;
                  default:
                    Wi(H, V, V, V, [""], G, 0, a, G);
                }
        }
        h = u = d = 0, S = z = 1, R = H = "", f = s;
        break;
      case 58:
        f = 1 + Ut(H), d = m;
      default:
        if (S < 1) {
          if (T == 123)
            --S;
          else if (T == 125 && S++ == 0 && G0() == 125)
            continue;
        }
        switch (H += Wn(T), T * S) {
          case 38:
            z = u > 0 ? 1 : (H += "\f", -1);
            break;
          case 44:
            a[h++] = (Ut(H) - 1) * z, z = 1;
            break;
          case 64:
            fe() === 45 && (H += Yr(Bt())), c = fe(), u = f = Ut(R = H += Q0(zi())), T++;
            break;
          case 45:
            m === 45 && Ut(H) == 2 && (S = 0);
        }
    }
  return o;
}
function ms(t, e, i, r, n, o, s, a, l, h, u, f) {
  for (var c = n - 1, d = n === 0 ? o : [""], m = U0(d), S = 0, O = 0, z = 0; S < r; ++S)
    for (var T = 0, R = ui(t, c + 1, c = ll(O = s[S])), X = t; T < m; ++T)
      (X = hl(O > 0 ? d[T] + " " + R : qi(R, /&\f/g, d[T]))) && (l[z++] = X);
  return Hn(t, e, i, n === 0 ? sl : a, l, h, u, f);
}
function ey(t, e, i, r) {
  return Hn(t, e, i, ol, Wn(Y0()), ui(t, 2, -2), 0, r);
}
function ys(t, e, i, r, n) {
  return Hn(t, e, i, al, ui(t, 0, r), ui(t, r + 1, -1), r, n);
}
function gn(t, e) {
  for (var i = "", r = 0; r < t.length; r++)
    i += e(t[r], r, t, e) || "";
  return i;
}
function iy(t, e, i, r) {
  switch (t.type) {
    case H0:
      if (t.children.length)
        break;
    case z0:
    case al:
      return t.return = t.return || t.value;
    case ol:
      return "";
    case W0:
      return t.return = t.value + "{" + gn(t.children, r) + "}";
    case sl:
      if (!Ut(t.value = t.props.join(",")))
        return "";
  }
  return Ut(i = gn(t.children, r)) ? t.return = t.value + "{" + i + "}" : "";
}
const _s = "10.9.0", $e = Object.freeze(yp);
let dt = st({}, $e), ul, Ie = [], ii = st({}, $e);
const Fr = (t, e) => {
  let i = st({}, t), r = {};
  for (const n of e)
    pl(n), r = st(r, n);
  if (i = st(i, r), r.theme && r.theme in Gt) {
    const n = st({}, ul), o = st(
      n.themeVariables || {},
      r.themeVariables
    );
    i.theme && i.theme in Gt && (i.themeVariables = Gt[i.theme].getThemeVariables(o));
  }
  return ii = i, gl(ii), ii;
}, ry = (t) => (dt = st({}, $e), dt = st(dt, t), t.theme && Gt[t.theme] && (dt.themeVariables = Gt[t.theme].getThemeVariables(t.themeVariables)), Fr(dt, Ie), dt), ny = (t) => {
  ul = st({}, t);
}, oy = (t) => (dt = st(dt, t), Fr(dt, Ie), dt), fl = () => st({}, dt), dl = (t) => (gl(t), st(ii, t), $t()), $t = () => st({}, ii), pl = (t) => {
  t && (["secure", ...dt.secure ?? []].forEach((e) => {
    Object.hasOwn(t, e) && (L.debug(`Denied attempt to modify a secure key ${e}`, t[e]), delete t[e]);
  }), Object.keys(t).forEach((e) => {
    e.startsWith("__") && delete t[e];
  }), Object.keys(t).forEach((e) => {
    typeof t[e] == "string" && (t[e].includes("<") || t[e].includes(">") || t[e].includes("url(data:")) && delete t[e], typeof t[e] == "object" && pl(t[e]);
  }));
}, sy = (t) => {
  Qi(t), t.fontFamily && (!t.themeVariables || !t.themeVariables.fontFamily) && (t.themeVariables = { fontFamily: t.fontFamily }), Ie.push(t), Fr(dt, Ie);
}, or = (t = dt) => {
  Ie = [], Fr(t, Ie);
}, ay = {
  LAZY_LOAD_DEPRECATED: "The configuration options lazyLoadedDiagrams and loadExternalDiagramsAtStartup are deprecated. Please use registerExternalDiagrams instead."
}, Cs = {}, ly = (t) => {
  Cs[t] || (L.warn(ay[t]), Cs[t] = !0);
}, gl = (t) => {
  t && (t.lazyLoadedDiagrams || t.loadExternalDiagramsAtStartup) && ly("LAZY_LOAD_DEPRECATED");
}, ml = "c4", hy = (t) => /^\s*C4Context|C4Container|C4Component|C4Dynamic|C4Deployment/.test(t), cy = async () => {
  const { diagram: t } = await import("./c4Diagram-e65f60cc.js");
  return { id: ml, diagram: t };
}, uy = {
  id: ml,
  detector: hy,
  loader: cy
}, fy = uy, yl = "flowchart", dy = (t, e) => {
  var i, r;
  return ((i = e == null ? void 0 : e.flowchart) == null ? void 0 : i.defaultRenderer) === "dagre-wrapper" || ((r = e == null ? void 0 : e.flowchart) == null ? void 0 : r.defaultRenderer) === "elk" ? !1 : /^\s*graph/.test(t);
}, py = async () => {
  const { diagram: t } = await import("./flowDiagram-d3710025.js");
  return { id: yl, diagram: t };
}, gy = {
  id: yl,
  detector: dy,
  loader: py
}, my = gy, _l = "flowchart-v2", yy = (t, e) => {
  var i, r, n;
  return ((i = e == null ? void 0 : e.flowchart) == null ? void 0 : i.defaultRenderer) === "dagre-d3" || ((r = e == null ? void 0 : e.flowchart) == null ? void 0 : r.defaultRenderer) === "elk" ? !1 : /^\s*graph/.test(t) && ((n = e == null ? void 0 : e.flowchart) == null ? void 0 : n.defaultRenderer) === "dagre-wrapper" ? !0 : /^\s*flowchart/.test(t);
}, _y = async () => {
  const { diagram: t } = await import("./flowDiagram-v2-8dd8b966.js");
  return { id: _l, diagram: t };
}, Cy = {
  id: _l,
  detector: yy,
  loader: _y
}, xy = Cy, Cl = "er", by = (t) => /^\s*erDiagram/.test(t), Ty = async () => {
  const { diagram: t } = await import("./erDiagram-88ff80f2.js");
  return { id: Cl, diagram: t };
}, ky = {
  id: Cl,
  detector: by,
  loader: Ty
}, Sy = ky, xl = "gitGraph", vy = (t) => /^\s*gitGraph/.test(t), wy = async () => {
  const { diagram: t } = await import("./gitGraphDiagram-e4279c54.js");
  return { id: xl, diagram: t };
}, By = {
  id: xl,
  detector: vy,
  loader: wy
}, Fy = By, bl = "gantt", Ay = (t) => /^\s*gantt/.test(t), Ly = async () => {
  const { diagram: t } = await import("./ganttDiagram-d5eca442.js");
  return { id: bl, diagram: t };
}, Ey = {
  id: bl,
  detector: Ay,
  loader: Ly
}, My = Ey, Tl = "info", Oy = (t) => /^\s*info/.test(t), $y = async () => {
  const { diagram: t } = await import("./infoDiagram-6f84184f.js");
  return { id: Tl, diagram: t };
}, Iy = {
  id: Tl,
  detector: Oy,
  loader: $y
}, kl = "pie", Dy = (t) => /^\s*pie/.test(t), Ny = async () => {
  const { diagram: t } = await import("./pieDiagram-fdb04870.js");
  return { id: kl, diagram: t };
}, Ry = {
  id: kl,
  detector: Dy,
  loader: Ny
}, Sl = "quadrantChart", Py = (t) => /^\s*quadrantChart/.test(t), qy = async () => {
  const { diagram: t } = await import("./quadrantDiagram-acae359b.js");
  return { id: Sl, diagram: t };
}, zy = {
  id: Sl,
  detector: Py,
  loader: qy
}, Wy = zy, vl = "xychart", Hy = (t) => /^\s*xychart-beta/.test(t), jy = async () => {
  const { diagram: t } = await import("./xychartDiagram-2c3c3b85.js");
  return { id: vl, diagram: t };
}, Uy = {
  id: vl,
  detector: Hy,
  loader: jy
}, Yy = Uy, wl = "requirement", Gy = (t) => /^\s*requirement(Diagram)?/.test(t), Vy = async () => {
  const { diagram: t } = await import("./requirementDiagram-fc9445a3.js");
  return { id: wl, diagram: t };
}, Xy = {
  id: wl,
  detector: Gy,
  loader: Vy
}, Ky = Xy, Bl = "sequence", Zy = (t) => /^\s*sequenceDiagram/.test(t), Jy = async () => {
  const { diagram: t } = await import("./sequenceDiagram-a3c91cc7.js");
  return { id: Bl, diagram: t };
}, Qy = {
  id: Bl,
  detector: Zy,
  loader: Jy
}, t_ = Qy, Fl = "class", e_ = (t, e) => {
  var i;
  return ((i = e == null ? void 0 : e.class) == null ? void 0 : i.defaultRenderer) === "dagre-wrapper" ? !1 : /^\s*classDiagram/.test(t);
}, i_ = async () => {
  const { diagram: t } = await import("./classDiagram-9faaf380.js");
  return { id: Fl, diagram: t };
}, r_ = {
  id: Fl,
  detector: e_,
  loader: i_
}, n_ = r_, Al = "classDiagram", o_ = (t, e) => {
  var i;
  return /^\s*classDiagram/.test(t) && ((i = e == null ? void 0 : e.class) == null ? void 0 : i.defaultRenderer) === "dagre-wrapper" ? !0 : /^\s*classDiagram-v2/.test(t);
}, s_ = async () => {
  const { diagram: t } = await import("./classDiagram-v2-8d50f991.js");
  return { id: Al, diagram: t };
}, a_ = {
  id: Al,
  detector: o_,
  loader: s_
}, l_ = a_, Ll = "state", h_ = (t, e) => {
  var i;
  return ((i = e == null ? void 0 : e.state) == null ? void 0 : i.defaultRenderer) === "dagre-wrapper" ? !1 : /^\s*stateDiagram/.test(t);
}, c_ = async () => {
  const { diagram: t } = await import("./stateDiagram-654cced9.js");
  return { id: Ll, diagram: t };
}, u_ = {
  id: Ll,
  detector: h_,
  loader: c_
}, f_ = u_, El = "stateDiagram", d_ = (t, e) => {
  var i;
  return !!(/^\s*stateDiagram-v2/.test(t) || /^\s*stateDiagram/.test(t) && ((i = e == null ? void 0 : e.state) == null ? void 0 : i.defaultRenderer) === "dagre-wrapper");
}, p_ = async () => {
  const { diagram: t } = await import("./stateDiagram-v2-140258dc.js");
  return { id: El, diagram: t };
}, g_ = {
  id: El,
  detector: d_,
  loader: p_
}, m_ = g_, Ml = "journey", y_ = (t) => /^\s*journey/.test(t), __ = async () => {
  const { diagram: t } = await import("./journeyDiagram-b15fc9d2.js");
  return { id: Ml, diagram: t };
}, C_ = {
  id: Ml,
  detector: y_,
  loader: __
}, x_ = C_, b_ = function(t, e) {
  for (let i of e)
    t.attr(i[0], i[1]);
}, T_ = function(t, e, i) {
  let r = /* @__PURE__ */ new Map();
  return i ? (r.set("width", "100%"), r.set("style", `max-width: ${e}px;`)) : (r.set("height", t), r.set("width", e)), r;
}, Ol = function(t, e, i, r) {
  const n = T_(e, i, r);
  b_(t, n);
}, k_ = function(t, e, i, r) {
  const n = e.node().getBBox(), o = n.width, s = n.height;
  L.info(`SVG bounds: ${o}x${s}`, n);
  let a = 0, l = 0;
  L.info(`Graph bounds: ${a}x${l}`, t), a = o + i * 2, l = s + i * 2, L.info(`Calculated bounds: ${a}x${l}`), Ol(e, l, a, r);
  const h = `${n.x - i} ${n.y - i} ${n.width + 2 * i} ${n.height + 2 * i}`;
  e.attr("viewBox", h);
}, Hi = {}, S_ = (t, e, i) => {
  let r = "";
  return t in Hi && Hi[t] ? r = Hi[t](i) : L.warn(`No theme found for ${t}`), ` & {
    font-family: ${i.fontFamily};
    font-size: ${i.fontSize};
    fill: ${i.textColor}
  }

  /* Classes common for multiple diagrams */

  & .error-icon {
    fill: ${i.errorBkgColor};
  }
  & .error-text {
    fill: ${i.errorTextColor};
    stroke: ${i.errorTextColor};
  }

  & .edge-thickness-normal {
    stroke-width: 2px;
  }
  & .edge-thickness-thick {
    stroke-width: 3.5px
  }
  & .edge-pattern-solid {
    stroke-dasharray: 0;
  }

  & .edge-pattern-dashed{
    stroke-dasharray: 3;
  }
  .edge-pattern-dotted {
    stroke-dasharray: 2;
  }

  & .marker {
    fill: ${i.lineColor};
    stroke: ${i.lineColor};
  }
  & .marker.cross {
    stroke: ${i.lineColor};
  }

  & svg {
    font-family: ${i.fontFamily};
    font-size: ${i.fontSize};
  }

  ${r}

  ${e}
`;
}, v_ = (t, e) => {
  e !== void 0 && (Hi[t] = e);
}, w_ = S_;
let jn = "", Un = "", Yn = "";
const Gn = (t) => ai(t, $t()), B_ = () => {
  jn = "", Yn = "", Un = "";
}, F_ = (t) => {
  jn = Gn(t).replace(/^\s+/g, "");
}, A_ = () => jn, L_ = (t) => {
  Yn = Gn(t).replace(/\n\s+/g, `
`);
}, E_ = () => Yn, M_ = (t) => {
  Un = Gn(t);
}, O_ = () => Un, $_ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  clear: B_,
  getAccDescription: E_,
  getAccTitle: A_,
  getDiagramTitle: O_,
  setAccDescription: L_,
  setAccTitle: F_,
  setDiagramTitle: M_
}, Symbol.toStringTag, { value: "Module" })), I_ = L, D_ = bn, Vn = $t, v1 = dl, w1 = $e, N_ = (t) => ai(t, Vn()), R_ = k_, P_ = () => $_, sr = {}, ar = (t, e, i) => {
  var r;
  if (sr[t])
    throw new Error(`Diagram ${t} already registered.`);
  sr[t] = e, i && qa(t, i), v_(t, e.styles), (r = e.injectUtils) == null || r.call(
    e,
    I_,
    D_,
    Vn,
    N_,
    R_,
    P_(),
    () => {
    }
  );
}, Xn = (t) => {
  if (t in sr)
    return sr[t];
  throw new q_(t);
};
class q_ extends Error {
  constructor(e) {
    super(`Diagram ${e} not found.`);
  }
}
const z_ = (t) => {
  var n;
  const { securityLevel: e } = Vn();
  let i = bt("body");
  if (e === "sandbox") {
    const s = ((n = bt(`#i${t}`).node()) == null ? void 0 : n.contentDocument) ?? document;
    i = bt(s.body);
  }
  return i.select(`#${t}`);
}, W_ = (t, e, i) => {
  L.debug(`rendering svg for syntax error
`);
  const r = z_(e), n = r.append("g");
  r.attr("viewBox", "0 0 2412 512"), Ol(r, 100, 512, !0), n.append("path").attr("class", "error-icon").attr(
    "d",
    "m411.313,123.313c6.25-6.25 6.25-16.375 0-22.625s-16.375-6.25-22.625,0l-32,32-9.375,9.375-20.688-20.688c-12.484-12.5-32.766-12.5-45.25,0l-16,16c-1.261,1.261-2.304,2.648-3.31,4.051-21.739-8.561-45.324-13.426-70.065-13.426-105.867,0-192,86.133-192,192s86.133,192 192,192 192-86.133 192-192c0-24.741-4.864-48.327-13.426-70.065 1.402-1.007 2.79-2.049 4.051-3.31l16-16c12.5-12.492 12.5-32.758 0-45.25l-20.688-20.688 9.375-9.375 32.001-31.999zm-219.313,100.687c-52.938,0-96,43.063-96,96 0,8.836-7.164,16-16,16s-16-7.164-16-16c0-70.578 57.422-128 128-128 8.836,0 16,7.164 16,16s-7.164,16-16,16z"
  ), n.append("path").attr("class", "error-icon").attr(
    "d",
    "m459.02,148.98c-6.25-6.25-16.375-6.25-22.625,0s-6.25,16.375 0,22.625l16,16c3.125,3.125 7.219,4.688 11.313,4.688 4.094,0 8.188-1.563 11.313-4.688 6.25-6.25 6.25-16.375 0-22.625l-16.001-16z"
  ), n.append("path").attr("class", "error-icon").attr(
    "d",
    "m340.395,75.605c3.125,3.125 7.219,4.688 11.313,4.688 4.094,0 8.188-1.563 11.313-4.688 6.25-6.25 6.25-16.375 0-22.625l-16-16c-6.25-6.25-16.375-6.25-22.625,0s-6.25,16.375 0,22.625l15.999,16z"
  ), n.append("path").attr("class", "error-icon").attr(
    "d",
    "m400,64c8.844,0 16-7.164 16-16v-32c0-8.836-7.156-16-16-16-8.844,0-16,7.164-16,16v32c0,8.836 7.156,16 16,16z"
  ), n.append("path").attr("class", "error-icon").attr(
    "d",
    "m496,96.586h-32c-8.844,0-16,7.164-16,16 0,8.836 7.156,16 16,16h32c8.844,0 16-7.164 16-16 0-8.836-7.156-16-16-16z"
  ), n.append("path").attr("class", "error-icon").attr(
    "d",
    "m436.98,75.605c3.125,3.125 7.219,4.688 11.313,4.688 4.094,0 8.188-1.563 11.313-4.688l32-32c6.25-6.25 6.25-16.375 0-22.625s-16.375-6.25-22.625,0l-32,32c-6.251,6.25-6.251,16.375-0.001,22.625z"
  ), n.append("text").attr("class", "error-text").attr("x", 1440).attr("y", 250).attr("font-size", "150px").style("text-anchor", "middle").text("Syntax error in text"), n.append("text").attr("class", "error-text").attr("x", 1250).attr("y", 400).attr("font-size", "100px").style("text-anchor", "middle").text(`mermaid version ${i}`);
}, $l = { draw: W_ }, H_ = $l, j_ = {
  db: {},
  renderer: $l,
  parser: {
    parser: { yy: {} },
    parse: () => {
    }
  }
}, U_ = j_, Il = "flowchart-elk", Y_ = (t, e) => {
  var i;
  return (
    // If diagram explicitly states flowchart-elk
    !!(/^\s*flowchart-elk/.test(t) || // If a flowchart/graph diagram has their default renderer set to elk
    /^\s*flowchart|graph/.test(t) && ((i = e == null ? void 0 : e.flowchart) == null ? void 0 : i.defaultRenderer) === "elk")
  );
}, G_ = async () => {
  const { diagram: t } = await import("./flowchart-elk-definition-34365f60.js");
  return { id: Il, diagram: t };
}, V_ = {
  id: Il,
  detector: Y_,
  loader: G_
}, X_ = V_, Dl = "timeline", K_ = (t) => /^\s*timeline/.test(t), Z_ = async () => {
  const { diagram: t } = await import("./timeline-definition-d879e019.js");
  return { id: Dl, diagram: t };
}, J_ = {
  id: Dl,
  detector: K_,
  loader: Z_
}, Q_ = J_, Nl = "mindmap", tC = (t) => /^\s*mindmap/.test(t), eC = async () => {
  const { diagram: t } = await import("./mindmap-definition-2aab62ef.js");
  return { id: Nl, diagram: t };
}, iC = {
  id: Nl,
  detector: tC,
  loader: eC
}, rC = iC, Rl = "sankey", nC = (t) => /^\s*sankey-beta/.test(t), oC = async () => {
  const { diagram: t } = await import("./sankeyDiagram-9fcf3781.js");
  return { id: Rl, diagram: t };
}, sC = {
  id: Rl,
  detector: nC,
  loader: oC
}, aC = sC, Pl = "block", lC = (t) => /^\s*block-beta/.test(t), hC = async () => {
  const { diagram: t } = await import("./blockDiagram-48276afd.js");
  return { id: Pl, diagram: t };
}, cC = {
  id: Pl,
  detector: lC,
  loader: hC
}, uC = cC;
let xs = !1;
const Kn = () => {
  xs || (xs = !0, ar("error", U_, (t) => t.toLowerCase().trim() === "error"), ar(
    "---",
    // --- diagram type may appear if YAML front-matter is not parsed correctly
    {
      db: {
        clear: () => {
        }
      },
      styles: {},
      // should never be used
      renderer: {
        draw: () => {
        }
      },
      parser: {
        parser: { yy: {} },
        parse: () => {
          throw new Error(
            "Diagrams beginning with --- are not valid. If you were trying to use a YAML front-matter, please ensure that you've correctly opened and closed the YAML front-matter with un-indented `---` blocks"
          );
        }
      },
      init: () => null
      // no op
    },
    (t) => t.toLowerCase().trimStart().startsWith("---")
  ), Pa(
    fy,
    l_,
    n_,
    Sy,
    My,
    Iy,
    Ry,
    Ky,
    t_,
    X_,
    xy,
    my,
    rC,
    Q_,
    Fy,
    m_,
    f_,
    x_,
    Wy,
    aC,
    Yy,
    uC
  ));
};
class ql {
  constructor(e, i = {}) {
    this.text = e, this.metadata = i, this.type = "graph", this.text = P0(e), this.text += `
`;
    const r = $t();
    try {
      this.type = xr(e, r);
    } catch (o) {
      this.type = "error", this.detectError = o;
    }
    const n = Xn(this.type);
    L.debug("Type " + this.type), this.db = n.db, this.renderer = n.renderer, this.parser = n.parser, this.parser.parser.yy = this.db, this.init = n.init, this.parse();
  }
  parse() {
    var i, r, n, o, s;
    if (this.detectError)
      throw this.detectError;
    (r = (i = this.db).clear) == null || r.call(i);
    const e = $t();
    (n = this.init) == null || n.call(this, e), this.metadata.title && ((s = (o = this.db).setDiagramTitle) == null || s.call(o, this.metadata.title)), this.parser.parse(this.text);
  }
  async render(e, i) {
    await this.renderer.draw(this.text, e, i, this);
  }
  getParser() {
    return this.parser;
  }
  getType() {
    return this.type;
  }
}
const fC = async (t, e = {}) => {
  const i = xr(t, $t());
  try {
    Xn(i);
  } catch {
    const n = xp(i);
    if (!n)
      throw new Ra(`Diagram ${i} not found.`);
    const { id: o, diagram: s } = await n();
    ar(o, s);
  }
  return new ql(t, e);
};
let bs = [];
const dC = () => {
  bs.forEach((t) => {
    t();
  }), bs = [];
};
var pC = ja(Object.keys, Object);
const gC = pC;
var mC = Object.prototype, yC = mC.hasOwnProperty;
function _C(t) {
  if (!Sr(t))
    return gC(t);
  var e = [];
  for (var i in Object(t))
    yC.call(t, i) && i != "constructor" && e.push(i);
  return e;
}
var CC = Ce(Dt, "DataView");
const mn = CC;
var xC = Ce(Dt, "Promise");
const yn = xC;
var bC = Ce(Dt, "Set");
const _n = bC;
var TC = Ce(Dt, "WeakMap");
const Cn = TC;
var Ts = "[object Map]", kC = "[object Object]", ks = "[object Promise]", Ss = "[object Set]", vs = "[object WeakMap]", ws = "[object DataView]", SC = _e(mn), vC = _e(hi), wC = _e(yn), BC = _e(_n), FC = _e(Cn), he = Ne;
(mn && he(new mn(new ArrayBuffer(1))) != ws || hi && he(new hi()) != Ts || yn && he(yn.resolve()) != ks || _n && he(new _n()) != Ss || Cn && he(new Cn()) != vs) && (he = function(t) {
  var e = Ne(t), i = e == kC ? t.constructor : void 0, r = i ? _e(i) : "";
  if (r)
    switch (r) {
      case SC:
        return ws;
      case vC:
        return Ts;
      case wC:
        return ks;
      case BC:
        return Ss;
      case FC:
        return vs;
    }
  return e;
});
const AC = he;
var LC = "[object Map]", EC = "[object Set]", MC = Object.prototype, OC = MC.hasOwnProperty;
function Gr(t) {
  if (t == null)
    return !0;
  if (vr(t) && (rr(t) || typeof t == "string" || typeof t.splice == "function" || Nn(t) || Rn(t) || ir(t)))
    return !t.length;
  var e = AC(t);
  if (e == LC || e == EC)
    return !t.size;
  if (Sr(t))
    return !_C(t).length;
  for (var i in t)
    if (OC.call(t, i))
      return !1;
  return !0;
}
const $C = "graphics-document document";
function IC(t, e) {
  t.attr("role", $C), e !== "" && t.attr("aria-roledescription", e);
}
function DC(t, e, i, r) {
  if (t.insert !== void 0) {
    if (i) {
      const n = `chart-desc-${r}`;
      t.attr("aria-describedby", n), t.insert("desc", ":first-child").attr("id", n).text(i);
    }
    if (e) {
      const n = `chart-title-${r}`;
      t.attr("aria-labelledby", n), t.insert("title", ":first-child").attr("id", n).text(e);
    }
  }
}
const NC = (t) => t.replace(/^\s*%%(?!{)[^\n]+\n?/gm, "").trimStart();
/*! js-yaml 4.1.0 https://github.com/nodeca/js-yaml @license MIT */
function zl(t) {
  return typeof t > "u" || t === null;
}
function RC(t) {
  return typeof t == "object" && t !== null;
}
function PC(t) {
  return Array.isArray(t) ? t : zl(t) ? [] : [t];
}
function qC(t, e) {
  var i, r, n, o;
  if (e)
    for (o = Object.keys(e), i = 0, r = o.length; i < r; i += 1)
      n = o[i], t[n] = e[n];
  return t;
}
function zC(t, e) {
  var i = "", r;
  for (r = 0; r < e; r += 1)
    i += t;
  return i;
}
function WC(t) {
  return t === 0 && Number.NEGATIVE_INFINITY === 1 / t;
}
var HC = zl, jC = RC, UC = PC, YC = zC, GC = WC, VC = qC, lt = {
  isNothing: HC,
  isObject: jC,
  toArray: UC,
  repeat: YC,
  isNegativeZero: GC,
  extend: VC
};
function Wl(t, e) {
  var i = "", r = t.reason || "(unknown reason)";
  return t.mark ? (t.mark.name && (i += 'in "' + t.mark.name + '" '), i += "(" + (t.mark.line + 1) + ":" + (t.mark.column + 1) + ")", !e && t.mark.snippet && (i += `

` + t.mark.snippet), r + " " + i) : r;
}
function fi(t, e) {
  Error.call(this), this.name = "YAMLException", this.reason = t, this.mark = e, this.message = Wl(this, !1), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack || "";
}
fi.prototype = Object.create(Error.prototype);
fi.prototype.constructor = fi;
fi.prototype.toString = function(e) {
  return this.name + ": " + Wl(this, e);
};
var Yt = fi;
function Vr(t, e, i, r, n) {
  var o = "", s = "", a = Math.floor(n / 2) - 1;
  return r - e > a && (o = " ... ", e = r - a + o.length), i - r > a && (s = " ...", i = r + a - s.length), {
    str: o + t.slice(e, i).replace(/\t/g, "→") + s,
    pos: r - e + o.length
    // relative position
  };
}
function Xr(t, e) {
  return lt.repeat(" ", e - t.length) + t;
}
function XC(t, e) {
  if (e = Object.create(e || null), !t.buffer)
    return null;
  e.maxLength || (e.maxLength = 79), typeof e.indent != "number" && (e.indent = 1), typeof e.linesBefore != "number" && (e.linesBefore = 3), typeof e.linesAfter != "number" && (e.linesAfter = 2);
  for (var i = /\r?\n|\r|\0/g, r = [0], n = [], o, s = -1; o = i.exec(t.buffer); )
    n.push(o.index), r.push(o.index + o[0].length), t.position <= o.index && s < 0 && (s = r.length - 2);
  s < 0 && (s = r.length - 1);
  var a = "", l, h, u = Math.min(t.line + e.linesAfter, n.length).toString().length, f = e.maxLength - (e.indent + u + 3);
  for (l = 1; l <= e.linesBefore && !(s - l < 0); l++)
    h = Vr(
      t.buffer,
      r[s - l],
      n[s - l],
      t.position - (r[s] - r[s - l]),
      f
    ), a = lt.repeat(" ", e.indent) + Xr((t.line - l + 1).toString(), u) + " | " + h.str + `
` + a;
  for (h = Vr(t.buffer, r[s], n[s], t.position, f), a += lt.repeat(" ", e.indent) + Xr((t.line + 1).toString(), u) + " | " + h.str + `
`, a += lt.repeat("-", e.indent + u + 3 + h.pos) + `^
`, l = 1; l <= e.linesAfter && !(s + l >= n.length); l++)
    h = Vr(
      t.buffer,
      r[s + l],
      n[s + l],
      t.position - (r[s] - r[s + l]),
      f
    ), a += lt.repeat(" ", e.indent) + Xr((t.line + l + 1).toString(), u) + " | " + h.str + `
`;
  return a.replace(/\n$/, "");
}
var KC = XC, ZC = [
  "kind",
  "multi",
  "resolve",
  "construct",
  "instanceOf",
  "predicate",
  "represent",
  "representName",
  "defaultStyle",
  "styleAliases"
], JC = [
  "scalar",
  "sequence",
  "mapping"
];
function QC(t) {
  var e = {};
  return t !== null && Object.keys(t).forEach(function(i) {
    t[i].forEach(function(r) {
      e[String(r)] = i;
    });
  }), e;
}
function tx(t, e) {
  if (e = e || {}, Object.keys(e).forEach(function(i) {
    if (ZC.indexOf(i) === -1)
      throw new Yt('Unknown option "' + i + '" is met in definition of "' + t + '" YAML type.');
  }), this.options = e, this.tag = t, this.kind = e.kind || null, this.resolve = e.resolve || function() {
    return !0;
  }, this.construct = e.construct || function(i) {
    return i;
  }, this.instanceOf = e.instanceOf || null, this.predicate = e.predicate || null, this.represent = e.represent || null, this.representName = e.representName || null, this.defaultStyle = e.defaultStyle || null, this.multi = e.multi || !1, this.styleAliases = QC(e.styleAliases || null), JC.indexOf(this.kind) === -1)
    throw new Yt('Unknown kind "' + this.kind + '" is specified for "' + t + '" YAML type.');
}
var at = tx;
function Bs(t, e) {
  var i = [];
  return t[e].forEach(function(r) {
    var n = i.length;
    i.forEach(function(o, s) {
      o.tag === r.tag && o.kind === r.kind && o.multi === r.multi && (n = s);
    }), i[n] = r;
  }), i;
}
function ex() {
  var t = {
    scalar: {},
    sequence: {},
    mapping: {},
    fallback: {},
    multi: {
      scalar: [],
      sequence: [],
      mapping: [],
      fallback: []
    }
  }, e, i;
  function r(n) {
    n.multi ? (t.multi[n.kind].push(n), t.multi.fallback.push(n)) : t[n.kind][n.tag] = t.fallback[n.tag] = n;
  }
  for (e = 0, i = arguments.length; e < i; e += 1)
    arguments[e].forEach(r);
  return t;
}
function xn(t) {
  return this.extend(t);
}
xn.prototype.extend = function(e) {
  var i = [], r = [];
  if (e instanceof at)
    r.push(e);
  else if (Array.isArray(e))
    r = r.concat(e);
  else if (e && (Array.isArray(e.implicit) || Array.isArray(e.explicit)))
    e.implicit && (i = i.concat(e.implicit)), e.explicit && (r = r.concat(e.explicit));
  else
    throw new Yt("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
  i.forEach(function(o) {
    if (!(o instanceof at))
      throw new Yt("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    if (o.loadKind && o.loadKind !== "scalar")
      throw new Yt("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
    if (o.multi)
      throw new Yt("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
  }), r.forEach(function(o) {
    if (!(o instanceof at))
      throw new Yt("Specified list of YAML types (or a single Type object) contains a non-Type object.");
  });
  var n = Object.create(xn.prototype);
  return n.implicit = (this.implicit || []).concat(i), n.explicit = (this.explicit || []).concat(r), n.compiledImplicit = Bs(n, "implicit"), n.compiledExplicit = Bs(n, "explicit"), n.compiledTypeMap = ex(n.compiledImplicit, n.compiledExplicit), n;
};
var ix = xn, rx = new at("tag:yaml.org,2002:str", {
  kind: "scalar",
  construct: function(t) {
    return t !== null ? t : "";
  }
}), nx = new at("tag:yaml.org,2002:seq", {
  kind: "sequence",
  construct: function(t) {
    return t !== null ? t : [];
  }
}), ox = new at("tag:yaml.org,2002:map", {
  kind: "mapping",
  construct: function(t) {
    return t !== null ? t : {};
  }
}), sx = new ix({
  explicit: [
    rx,
    nx,
    ox
  ]
});
function ax(t) {
  if (t === null)
    return !0;
  var e = t.length;
  return e === 1 && t === "~" || e === 4 && (t === "null" || t === "Null" || t === "NULL");
}
function lx() {
  return null;
}
function hx(t) {
  return t === null;
}
var cx = new at("tag:yaml.org,2002:null", {
  kind: "scalar",
  resolve: ax,
  construct: lx,
  predicate: hx,
  represent: {
    canonical: function() {
      return "~";
    },
    lowercase: function() {
      return "null";
    },
    uppercase: function() {
      return "NULL";
    },
    camelcase: function() {
      return "Null";
    },
    empty: function() {
      return "";
    }
  },
  defaultStyle: "lowercase"
});
function ux(t) {
  if (t === null)
    return !1;
  var e = t.length;
  return e === 4 && (t === "true" || t === "True" || t === "TRUE") || e === 5 && (t === "false" || t === "False" || t === "FALSE");
}
function fx(t) {
  return t === "true" || t === "True" || t === "TRUE";
}
function dx(t) {
  return Object.prototype.toString.call(t) === "[object Boolean]";
}
var px = new at("tag:yaml.org,2002:bool", {
  kind: "scalar",
  resolve: ux,
  construct: fx,
  predicate: dx,
  represent: {
    lowercase: function(t) {
      return t ? "true" : "false";
    },
    uppercase: function(t) {
      return t ? "TRUE" : "FALSE";
    },
    camelcase: function(t) {
      return t ? "True" : "False";
    }
  },
  defaultStyle: "lowercase"
});
function gx(t) {
  return 48 <= t && t <= 57 || 65 <= t && t <= 70 || 97 <= t && t <= 102;
}
function mx(t) {
  return 48 <= t && t <= 55;
}
function yx(t) {
  return 48 <= t && t <= 57;
}
function _x(t) {
  if (t === null)
    return !1;
  var e = t.length, i = 0, r = !1, n;
  if (!e)
    return !1;
  if (n = t[i], (n === "-" || n === "+") && (n = t[++i]), n === "0") {
    if (i + 1 === e)
      return !0;
    if (n = t[++i], n === "b") {
      for (i++; i < e; i++)
        if (n = t[i], n !== "_") {
          if (n !== "0" && n !== "1")
            return !1;
          r = !0;
        }
      return r && n !== "_";
    }
    if (n === "x") {
      for (i++; i < e; i++)
        if (n = t[i], n !== "_") {
          if (!gx(t.charCodeAt(i)))
            return !1;
          r = !0;
        }
      return r && n !== "_";
    }
    if (n === "o") {
      for (i++; i < e; i++)
        if (n = t[i], n !== "_") {
          if (!mx(t.charCodeAt(i)))
            return !1;
          r = !0;
        }
      return r && n !== "_";
    }
  }
  if (n === "_")
    return !1;
  for (; i < e; i++)
    if (n = t[i], n !== "_") {
      if (!yx(t.charCodeAt(i)))
        return !1;
      r = !0;
    }
  return !(!r || n === "_");
}
function Cx(t) {
  var e = t, i = 1, r;
  if (e.indexOf("_") !== -1 && (e = e.replace(/_/g, "")), r = e[0], (r === "-" || r === "+") && (r === "-" && (i = -1), e = e.slice(1), r = e[0]), e === "0")
    return 0;
  if (r === "0") {
    if (e[1] === "b")
      return i * parseInt(e.slice(2), 2);
    if (e[1] === "x")
      return i * parseInt(e.slice(2), 16);
    if (e[1] === "o")
      return i * parseInt(e.slice(2), 8);
  }
  return i * parseInt(e, 10);
}
function xx(t) {
  return Object.prototype.toString.call(t) === "[object Number]" && t % 1 === 0 && !lt.isNegativeZero(t);
}
var bx = new at("tag:yaml.org,2002:int", {
  kind: "scalar",
  resolve: _x,
  construct: Cx,
  predicate: xx,
  represent: {
    binary: function(t) {
      return t >= 0 ? "0b" + t.toString(2) : "-0b" + t.toString(2).slice(1);
    },
    octal: function(t) {
      return t >= 0 ? "0o" + t.toString(8) : "-0o" + t.toString(8).slice(1);
    },
    decimal: function(t) {
      return t.toString(10);
    },
    /* eslint-disable max-len */
    hexadecimal: function(t) {
      return t >= 0 ? "0x" + t.toString(16).toUpperCase() : "-0x" + t.toString(16).toUpperCase().slice(1);
    }
  },
  defaultStyle: "decimal",
  styleAliases: {
    binary: [2, "bin"],
    octal: [8, "oct"],
    decimal: [10, "dec"],
    hexadecimal: [16, "hex"]
  }
}), Tx = new RegExp(
  // 2.5e4, 2.5 and integers
  "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
);
function kx(t) {
  return !(t === null || !Tx.test(t) || // Quick hack to not allow integers end with `_`
  // Probably should update regexp & check speed
  t[t.length - 1] === "_");
}
function Sx(t) {
  var e, i;
  return e = t.replace(/_/g, "").toLowerCase(), i = e[0] === "-" ? -1 : 1, "+-".indexOf(e[0]) >= 0 && (e = e.slice(1)), e === ".inf" ? i === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : e === ".nan" ? NaN : i * parseFloat(e, 10);
}
var vx = /^[-+]?[0-9]+e/;
function wx(t, e) {
  var i;
  if (isNaN(t))
    switch (e) {
      case "lowercase":
        return ".nan";
      case "uppercase":
        return ".NAN";
      case "camelcase":
        return ".NaN";
    }
  else if (Number.POSITIVE_INFINITY === t)
    switch (e) {
      case "lowercase":
        return ".inf";
      case "uppercase":
        return ".INF";
      case "camelcase":
        return ".Inf";
    }
  else if (Number.NEGATIVE_INFINITY === t)
    switch (e) {
      case "lowercase":
        return "-.inf";
      case "uppercase":
        return "-.INF";
      case "camelcase":
        return "-.Inf";
    }
  else if (lt.isNegativeZero(t))
    return "-0.0";
  return i = t.toString(10), vx.test(i) ? i.replace("e", ".e") : i;
}
function Bx(t) {
  return Object.prototype.toString.call(t) === "[object Number]" && (t % 1 !== 0 || lt.isNegativeZero(t));
}
var Fx = new at("tag:yaml.org,2002:float", {
  kind: "scalar",
  resolve: kx,
  construct: Sx,
  predicate: Bx,
  represent: wx,
  defaultStyle: "lowercase"
}), Hl = sx.extend({
  implicit: [
    cx,
    px,
    bx,
    Fx
  ]
}), Ax = Hl, jl = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
), Ul = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
);
function Lx(t) {
  return t === null ? !1 : jl.exec(t) !== null || Ul.exec(t) !== null;
}
function Ex(t) {
  var e, i, r, n, o, s, a, l = 0, h = null, u, f, c;
  if (e = jl.exec(t), e === null && (e = Ul.exec(t)), e === null)
    throw new Error("Date resolve error");
  if (i = +e[1], r = +e[2] - 1, n = +e[3], !e[4])
    return new Date(Date.UTC(i, r, n));
  if (o = +e[4], s = +e[5], a = +e[6], e[7]) {
    for (l = e[7].slice(0, 3); l.length < 3; )
      l += "0";
    l = +l;
  }
  return e[9] && (u = +e[10], f = +(e[11] || 0), h = (u * 60 + f) * 6e4, e[9] === "-" && (h = -h)), c = new Date(Date.UTC(i, r, n, o, s, a, l)), h && c.setTime(c.getTime() - h), c;
}
function Mx(t) {
  return t.toISOString();
}
var Ox = new at("tag:yaml.org,2002:timestamp", {
  kind: "scalar",
  resolve: Lx,
  construct: Ex,
  instanceOf: Date,
  represent: Mx
});
function $x(t) {
  return t === "<<" || t === null;
}
var Ix = new at("tag:yaml.org,2002:merge", {
  kind: "scalar",
  resolve: $x
}), Zn = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
function Dx(t) {
  if (t === null)
    return !1;
  var e, i, r = 0, n = t.length, o = Zn;
  for (i = 0; i < n; i++)
    if (e = o.indexOf(t.charAt(i)), !(e > 64)) {
      if (e < 0)
        return !1;
      r += 6;
    }
  return r % 8 === 0;
}
function Nx(t) {
  var e, i, r = t.replace(/[\r\n=]/g, ""), n = r.length, o = Zn, s = 0, a = [];
  for (e = 0; e < n; e++)
    e % 4 === 0 && e && (a.push(s >> 16 & 255), a.push(s >> 8 & 255), a.push(s & 255)), s = s << 6 | o.indexOf(r.charAt(e));
  return i = n % 4 * 6, i === 0 ? (a.push(s >> 16 & 255), a.push(s >> 8 & 255), a.push(s & 255)) : i === 18 ? (a.push(s >> 10 & 255), a.push(s >> 2 & 255)) : i === 12 && a.push(s >> 4 & 255), new Uint8Array(a);
}
function Rx(t) {
  var e = "", i = 0, r, n, o = t.length, s = Zn;
  for (r = 0; r < o; r++)
    r % 3 === 0 && r && (e += s[i >> 18 & 63], e += s[i >> 12 & 63], e += s[i >> 6 & 63], e += s[i & 63]), i = (i << 8) + t[r];
  return n = o % 3, n === 0 ? (e += s[i >> 18 & 63], e += s[i >> 12 & 63], e += s[i >> 6 & 63], e += s[i & 63]) : n === 2 ? (e += s[i >> 10 & 63], e += s[i >> 4 & 63], e += s[i << 2 & 63], e += s[64]) : n === 1 && (e += s[i >> 2 & 63], e += s[i << 4 & 63], e += s[64], e += s[64]), e;
}
function Px(t) {
  return Object.prototype.toString.call(t) === "[object Uint8Array]";
}
var qx = new at("tag:yaml.org,2002:binary", {
  kind: "scalar",
  resolve: Dx,
  construct: Nx,
  predicate: Px,
  represent: Rx
}), zx = Object.prototype.hasOwnProperty, Wx = Object.prototype.toString;
function Hx(t) {
  if (t === null)
    return !0;
  var e = [], i, r, n, o, s, a = t;
  for (i = 0, r = a.length; i < r; i += 1) {
    if (n = a[i], s = !1, Wx.call(n) !== "[object Object]")
      return !1;
    for (o in n)
      if (zx.call(n, o))
        if (!s)
          s = !0;
        else
          return !1;
    if (!s)
      return !1;
    if (e.indexOf(o) === -1)
      e.push(o);
    else
      return !1;
  }
  return !0;
}
function jx(t) {
  return t !== null ? t : [];
}
var Ux = new at("tag:yaml.org,2002:omap", {
  kind: "sequence",
  resolve: Hx,
  construct: jx
}), Yx = Object.prototype.toString;
function Gx(t) {
  if (t === null)
    return !0;
  var e, i, r, n, o, s = t;
  for (o = new Array(s.length), e = 0, i = s.length; e < i; e += 1) {
    if (r = s[e], Yx.call(r) !== "[object Object]" || (n = Object.keys(r), n.length !== 1))
      return !1;
    o[e] = [n[0], r[n[0]]];
  }
  return !0;
}
function Vx(t) {
  if (t === null)
    return [];
  var e, i, r, n, o, s = t;
  for (o = new Array(s.length), e = 0, i = s.length; e < i; e += 1)
    r = s[e], n = Object.keys(r), o[e] = [n[0], r[n[0]]];
  return o;
}
var Xx = new at("tag:yaml.org,2002:pairs", {
  kind: "sequence",
  resolve: Gx,
  construct: Vx
}), Kx = Object.prototype.hasOwnProperty;
function Zx(t) {
  if (t === null)
    return !0;
  var e, i = t;
  for (e in i)
    if (Kx.call(i, e) && i[e] !== null)
      return !1;
  return !0;
}
function Jx(t) {
  return t !== null ? t : {};
}
var Qx = new at("tag:yaml.org,2002:set", {
  kind: "mapping",
  resolve: Zx,
  construct: Jx
}), tb = Ax.extend({
  implicit: [
    Ox,
    Ix
  ],
  explicit: [
    qx,
    Ux,
    Xx,
    Qx
  ]
}), re = Object.prototype.hasOwnProperty, lr = 1, Yl = 2, Gl = 3, hr = 4, Kr = 1, eb = 2, Fs = 3, ib = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, rb = /[\x85\u2028\u2029]/, nb = /[,\[\]\{\}]/, Vl = /^(?:!|!!|![a-z\-]+!)$/i, Xl = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
function As(t) {
  return Object.prototype.toString.call(t);
}
function Mt(t) {
  return t === 10 || t === 13;
}
function de(t) {
  return t === 9 || t === 32;
}
function gt(t) {
  return t === 9 || t === 32 || t === 10 || t === 13;
}
function we(t) {
  return t === 44 || t === 91 || t === 93 || t === 123 || t === 125;
}
function ob(t) {
  var e;
  return 48 <= t && t <= 57 ? t - 48 : (e = t | 32, 97 <= e && e <= 102 ? e - 97 + 10 : -1);
}
function sb(t) {
  return t === 120 ? 2 : t === 117 ? 4 : t === 85 ? 8 : 0;
}
function ab(t) {
  return 48 <= t && t <= 57 ? t - 48 : -1;
}
function Ls(t) {
  return t === 48 ? "\0" : t === 97 ? "\x07" : t === 98 ? "\b" : t === 116 || t === 9 ? "	" : t === 110 ? `
` : t === 118 ? "\v" : t === 102 ? "\f" : t === 114 ? "\r" : t === 101 ? "\x1B" : t === 32 ? " " : t === 34 ? '"' : t === 47 ? "/" : t === 92 ? "\\" : t === 78 ? "" : t === 95 ? " " : t === 76 ? "\u2028" : t === 80 ? "\u2029" : "";
}
function lb(t) {
  return t <= 65535 ? String.fromCharCode(t) : String.fromCharCode(
    (t - 65536 >> 10) + 55296,
    (t - 65536 & 1023) + 56320
  );
}
var Kl = new Array(256), Zl = new Array(256);
for (var ve = 0; ve < 256; ve++)
  Kl[ve] = Ls(ve) ? 1 : 0, Zl[ve] = Ls(ve);
function hb(t, e) {
  this.input = t, this.filename = e.filename || null, this.schema = e.schema || tb, this.onWarning = e.onWarning || null, this.legacy = e.legacy || !1, this.json = e.json || !1, this.listener = e.listener || null, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = t.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.firstTabInLine = -1, this.documents = [];
}
function Jl(t, e) {
  var i = {
    name: t.filename,
    buffer: t.input.slice(0, -1),
    // omit trailing \0
    position: t.position,
    line: t.line,
    column: t.position - t.lineStart
  };
  return i.snippet = KC(i), new Yt(e, i);
}
function A(t, e) {
  throw Jl(t, e);
}
function cr(t, e) {
  t.onWarning && t.onWarning.call(null, Jl(t, e));
}
var Es = {
  YAML: function(e, i, r) {
    var n, o, s;
    e.version !== null && A(e, "duplication of %YAML directive"), r.length !== 1 && A(e, "YAML directive accepts exactly one argument"), n = /^([0-9]+)\.([0-9]+)$/.exec(r[0]), n === null && A(e, "ill-formed argument of the YAML directive"), o = parseInt(n[1], 10), s = parseInt(n[2], 10), o !== 1 && A(e, "unacceptable YAML version of the document"), e.version = r[0], e.checkLineBreaks = s < 2, s !== 1 && s !== 2 && cr(e, "unsupported YAML version of the document");
  },
  TAG: function(e, i, r) {
    var n, o;
    r.length !== 2 && A(e, "TAG directive accepts exactly two arguments"), n = r[0], o = r[1], Vl.test(n) || A(e, "ill-formed tag handle (first argument) of the TAG directive"), re.call(e.tagMap, n) && A(e, 'there is a previously declared suffix for "' + n + '" tag handle'), Xl.test(o) || A(e, "ill-formed tag prefix (second argument) of the TAG directive");
    try {
      o = decodeURIComponent(o);
    } catch {
      A(e, "tag prefix is malformed: " + o);
    }
    e.tagMap[n] = o;
  }
};
function ee(t, e, i, r) {
  var n, o, s, a;
  if (e < i) {
    if (a = t.input.slice(e, i), r)
      for (n = 0, o = a.length; n < o; n += 1)
        s = a.charCodeAt(n), s === 9 || 32 <= s && s <= 1114111 || A(t, "expected valid JSON character");
    else
      ib.test(a) && A(t, "the stream contains non-printable characters");
    t.result += a;
  }
}
function Ms(t, e, i, r) {
  var n, o, s, a;
  for (lt.isObject(i) || A(t, "cannot merge mappings; the provided source object is unacceptable"), n = Object.keys(i), s = 0, a = n.length; s < a; s += 1)
    o = n[s], re.call(e, o) || (e[o] = i[o], r[o] = !0);
}
function Be(t, e, i, r, n, o, s, a, l) {
  var h, u;
  if (Array.isArray(n))
    for (n = Array.prototype.slice.call(n), h = 0, u = n.length; h < u; h += 1)
      Array.isArray(n[h]) && A(t, "nested arrays are not supported inside keys"), typeof n == "object" && As(n[h]) === "[object Object]" && (n[h] = "[object Object]");
  if (typeof n == "object" && As(n) === "[object Object]" && (n = "[object Object]"), n = String(n), e === null && (e = {}), r === "tag:yaml.org,2002:merge")
    if (Array.isArray(o))
      for (h = 0, u = o.length; h < u; h += 1)
        Ms(t, e, o[h], i);
    else
      Ms(t, e, o, i);
  else
    !t.json && !re.call(i, n) && re.call(e, n) && (t.line = s || t.line, t.lineStart = a || t.lineStart, t.position = l || t.position, A(t, "duplicated mapping key")), n === "__proto__" ? Object.defineProperty(e, n, {
      configurable: !0,
      enumerable: !0,
      writable: !0,
      value: o
    }) : e[n] = o, delete i[n];
  return e;
}
function Jn(t) {
  var e;
  e = t.input.charCodeAt(t.position), e === 10 ? t.position++ : e === 13 ? (t.position++, t.input.charCodeAt(t.position) === 10 && t.position++) : A(t, "a line break is expected"), t.line += 1, t.lineStart = t.position, t.firstTabInLine = -1;
}
function Q(t, e, i) {
  for (var r = 0, n = t.input.charCodeAt(t.position); n !== 0; ) {
    for (; de(n); )
      n === 9 && t.firstTabInLine === -1 && (t.firstTabInLine = t.position), n = t.input.charCodeAt(++t.position);
    if (e && n === 35)
      do
        n = t.input.charCodeAt(++t.position);
      while (n !== 10 && n !== 13 && n !== 0);
    if (Mt(n))
      for (Jn(t), n = t.input.charCodeAt(t.position), r++, t.lineIndent = 0; n === 32; )
        t.lineIndent++, n = t.input.charCodeAt(++t.position);
    else
      break;
  }
  return i !== -1 && r !== 0 && t.lineIndent < i && cr(t, "deficient indentation"), r;
}
function Ar(t) {
  var e = t.position, i;
  return i = t.input.charCodeAt(e), !!((i === 45 || i === 46) && i === t.input.charCodeAt(e + 1) && i === t.input.charCodeAt(e + 2) && (e += 3, i = t.input.charCodeAt(e), i === 0 || gt(i)));
}
function Qn(t, e) {
  e === 1 ? t.result += " " : e > 1 && (t.result += lt.repeat(`
`, e - 1));
}
function cb(t, e, i) {
  var r, n, o, s, a, l, h, u, f = t.kind, c = t.result, d;
  if (d = t.input.charCodeAt(t.position), gt(d) || we(d) || d === 35 || d === 38 || d === 42 || d === 33 || d === 124 || d === 62 || d === 39 || d === 34 || d === 37 || d === 64 || d === 96 || (d === 63 || d === 45) && (n = t.input.charCodeAt(t.position + 1), gt(n) || i && we(n)))
    return !1;
  for (t.kind = "scalar", t.result = "", o = s = t.position, a = !1; d !== 0; ) {
    if (d === 58) {
      if (n = t.input.charCodeAt(t.position + 1), gt(n) || i && we(n))
        break;
    } else if (d === 35) {
      if (r = t.input.charCodeAt(t.position - 1), gt(r))
        break;
    } else {
      if (t.position === t.lineStart && Ar(t) || i && we(d))
        break;
      if (Mt(d))
        if (l = t.line, h = t.lineStart, u = t.lineIndent, Q(t, !1, -1), t.lineIndent >= e) {
          a = !0, d = t.input.charCodeAt(t.position);
          continue;
        } else {
          t.position = s, t.line = l, t.lineStart = h, t.lineIndent = u;
          break;
        }
    }
    a && (ee(t, o, s, !1), Qn(t, t.line - l), o = s = t.position, a = !1), de(d) || (s = t.position + 1), d = t.input.charCodeAt(++t.position);
  }
  return ee(t, o, s, !1), t.result ? !0 : (t.kind = f, t.result = c, !1);
}
function ub(t, e) {
  var i, r, n;
  if (i = t.input.charCodeAt(t.position), i !== 39)
    return !1;
  for (t.kind = "scalar", t.result = "", t.position++, r = n = t.position; (i = t.input.charCodeAt(t.position)) !== 0; )
    if (i === 39)
      if (ee(t, r, t.position, !0), i = t.input.charCodeAt(++t.position), i === 39)
        r = t.position, t.position++, n = t.position;
      else
        return !0;
    else
      Mt(i) ? (ee(t, r, n, !0), Qn(t, Q(t, !1, e)), r = n = t.position) : t.position === t.lineStart && Ar(t) ? A(t, "unexpected end of the document within a single quoted scalar") : (t.position++, n = t.position);
  A(t, "unexpected end of the stream within a single quoted scalar");
}
function fb(t, e) {
  var i, r, n, o, s, a;
  if (a = t.input.charCodeAt(t.position), a !== 34)
    return !1;
  for (t.kind = "scalar", t.result = "", t.position++, i = r = t.position; (a = t.input.charCodeAt(t.position)) !== 0; ) {
    if (a === 34)
      return ee(t, i, t.position, !0), t.position++, !0;
    if (a === 92) {
      if (ee(t, i, t.position, !0), a = t.input.charCodeAt(++t.position), Mt(a))
        Q(t, !1, e);
      else if (a < 256 && Kl[a])
        t.result += Zl[a], t.position++;
      else if ((s = sb(a)) > 0) {
        for (n = s, o = 0; n > 0; n--)
          a = t.input.charCodeAt(++t.position), (s = ob(a)) >= 0 ? o = (o << 4) + s : A(t, "expected hexadecimal character");
        t.result += lb(o), t.position++;
      } else
        A(t, "unknown escape sequence");
      i = r = t.position;
    } else
      Mt(a) ? (ee(t, i, r, !0), Qn(t, Q(t, !1, e)), i = r = t.position) : t.position === t.lineStart && Ar(t) ? A(t, "unexpected end of the document within a double quoted scalar") : (t.position++, r = t.position);
  }
  A(t, "unexpected end of the stream within a double quoted scalar");
}
function db(t, e) {
  var i = !0, r, n, o, s = t.tag, a, l = t.anchor, h, u, f, c, d, m = /* @__PURE__ */ Object.create(null), S, O, z, T;
  if (T = t.input.charCodeAt(t.position), T === 91)
    u = 93, d = !1, a = [];
  else if (T === 123)
    u = 125, d = !0, a = {};
  else
    return !1;
  for (t.anchor !== null && (t.anchorMap[t.anchor] = a), T = t.input.charCodeAt(++t.position); T !== 0; ) {
    if (Q(t, !0, e), T = t.input.charCodeAt(t.position), T === u)
      return t.position++, t.tag = s, t.anchor = l, t.kind = d ? "mapping" : "sequence", t.result = a, !0;
    i ? T === 44 && A(t, "expected the node content, but found ','") : A(t, "missed comma between flow collection entries"), O = S = z = null, f = c = !1, T === 63 && (h = t.input.charCodeAt(t.position + 1), gt(h) && (f = c = !0, t.position++, Q(t, !0, e))), r = t.line, n = t.lineStart, o = t.position, De(t, e, lr, !1, !0), O = t.tag, S = t.result, Q(t, !0, e), T = t.input.charCodeAt(t.position), (c || t.line === r) && T === 58 && (f = !0, T = t.input.charCodeAt(++t.position), Q(t, !0, e), De(t, e, lr, !1, !0), z = t.result), d ? Be(t, a, m, O, S, z, r, n, o) : f ? a.push(Be(t, null, m, O, S, z, r, n, o)) : a.push(S), Q(t, !0, e), T = t.input.charCodeAt(t.position), T === 44 ? (i = !0, T = t.input.charCodeAt(++t.position)) : i = !1;
  }
  A(t, "unexpected end of the stream within a flow collection");
}
function pb(t, e) {
  var i, r, n = Kr, o = !1, s = !1, a = e, l = 0, h = !1, u, f;
  if (f = t.input.charCodeAt(t.position), f === 124)
    r = !1;
  else if (f === 62)
    r = !0;
  else
    return !1;
  for (t.kind = "scalar", t.result = ""; f !== 0; )
    if (f = t.input.charCodeAt(++t.position), f === 43 || f === 45)
      Kr === n ? n = f === 43 ? Fs : eb : A(t, "repeat of a chomping mode identifier");
    else if ((u = ab(f)) >= 0)
      u === 0 ? A(t, "bad explicit indentation width of a block scalar; it cannot be less than one") : s ? A(t, "repeat of an indentation width identifier") : (a = e + u - 1, s = !0);
    else
      break;
  if (de(f)) {
    do
      f = t.input.charCodeAt(++t.position);
    while (de(f));
    if (f === 35)
      do
        f = t.input.charCodeAt(++t.position);
      while (!Mt(f) && f !== 0);
  }
  for (; f !== 0; ) {
    for (Jn(t), t.lineIndent = 0, f = t.input.charCodeAt(t.position); (!s || t.lineIndent < a) && f === 32; )
      t.lineIndent++, f = t.input.charCodeAt(++t.position);
    if (!s && t.lineIndent > a && (a = t.lineIndent), Mt(f)) {
      l++;
      continue;
    }
    if (t.lineIndent < a) {
      n === Fs ? t.result += lt.repeat(`
`, o ? 1 + l : l) : n === Kr && o && (t.result += `
`);
      break;
    }
    for (r ? de(f) ? (h = !0, t.result += lt.repeat(`
`, o ? 1 + l : l)) : h ? (h = !1, t.result += lt.repeat(`
`, l + 1)) : l === 0 ? o && (t.result += " ") : t.result += lt.repeat(`
`, l) : t.result += lt.repeat(`
`, o ? 1 + l : l), o = !0, s = !0, l = 0, i = t.position; !Mt(f) && f !== 0; )
      f = t.input.charCodeAt(++t.position);
    ee(t, i, t.position, !1);
  }
  return !0;
}
function Os(t, e) {
  var i, r = t.tag, n = t.anchor, o = [], s, a = !1, l;
  if (t.firstTabInLine !== -1)
    return !1;
  for (t.anchor !== null && (t.anchorMap[t.anchor] = o), l = t.input.charCodeAt(t.position); l !== 0 && (t.firstTabInLine !== -1 && (t.position = t.firstTabInLine, A(t, "tab characters must not be used in indentation")), !(l !== 45 || (s = t.input.charCodeAt(t.position + 1), !gt(s)))); ) {
    if (a = !0, t.position++, Q(t, !0, -1) && t.lineIndent <= e) {
      o.push(null), l = t.input.charCodeAt(t.position);
      continue;
    }
    if (i = t.line, De(t, e, Gl, !1, !0), o.push(t.result), Q(t, !0, -1), l = t.input.charCodeAt(t.position), (t.line === i || t.lineIndent > e) && l !== 0)
      A(t, "bad indentation of a sequence entry");
    else if (t.lineIndent < e)
      break;
  }
  return a ? (t.tag = r, t.anchor = n, t.kind = "sequence", t.result = o, !0) : !1;
}
function gb(t, e, i) {
  var r, n, o, s, a, l, h = t.tag, u = t.anchor, f = {}, c = /* @__PURE__ */ Object.create(null), d = null, m = null, S = null, O = !1, z = !1, T;
  if (t.firstTabInLine !== -1)
    return !1;
  for (t.anchor !== null && (t.anchorMap[t.anchor] = f), T = t.input.charCodeAt(t.position); T !== 0; ) {
    if (!O && t.firstTabInLine !== -1 && (t.position = t.firstTabInLine, A(t, "tab characters must not be used in indentation")), r = t.input.charCodeAt(t.position + 1), o = t.line, (T === 63 || T === 58) && gt(r))
      T === 63 ? (O && (Be(t, f, c, d, m, null, s, a, l), d = m = S = null), z = !0, O = !0, n = !0) : O ? (O = !1, n = !0) : A(t, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), t.position += 1, T = r;
    else {
      if (s = t.line, a = t.lineStart, l = t.position, !De(t, i, Yl, !1, !0))
        break;
      if (t.line === o) {
        for (T = t.input.charCodeAt(t.position); de(T); )
          T = t.input.charCodeAt(++t.position);
        if (T === 58)
          T = t.input.charCodeAt(++t.position), gt(T) || A(t, "a whitespace character is expected after the key-value separator within a block mapping"), O && (Be(t, f, c, d, m, null, s, a, l), d = m = S = null), z = !0, O = !1, n = !1, d = t.tag, m = t.result;
        else if (z)
          A(t, "can not read an implicit mapping pair; a colon is missed");
        else
          return t.tag = h, t.anchor = u, !0;
      } else if (z)
        A(t, "can not read a block mapping entry; a multiline key may not be an implicit key");
      else
        return t.tag = h, t.anchor = u, !0;
    }
    if ((t.line === o || t.lineIndent > e) && (O && (s = t.line, a = t.lineStart, l = t.position), De(t, e, hr, !0, n) && (O ? m = t.result : S = t.result), O || (Be(t, f, c, d, m, S, s, a, l), d = m = S = null), Q(t, !0, -1), T = t.input.charCodeAt(t.position)), (t.line === o || t.lineIndent > e) && T !== 0)
      A(t, "bad indentation of a mapping entry");
    else if (t.lineIndent < e)
      break;
  }
  return O && Be(t, f, c, d, m, null, s, a, l), z && (t.tag = h, t.anchor = u, t.kind = "mapping", t.result = f), z;
}
function mb(t) {
  var e, i = !1, r = !1, n, o, s;
  if (s = t.input.charCodeAt(t.position), s !== 33)
    return !1;
  if (t.tag !== null && A(t, "duplication of a tag property"), s = t.input.charCodeAt(++t.position), s === 60 ? (i = !0, s = t.input.charCodeAt(++t.position)) : s === 33 ? (r = !0, n = "!!", s = t.input.charCodeAt(++t.position)) : n = "!", e = t.position, i) {
    do
      s = t.input.charCodeAt(++t.position);
    while (s !== 0 && s !== 62);
    t.position < t.length ? (o = t.input.slice(e, t.position), s = t.input.charCodeAt(++t.position)) : A(t, "unexpected end of the stream within a verbatim tag");
  } else {
    for (; s !== 0 && !gt(s); )
      s === 33 && (r ? A(t, "tag suffix cannot contain exclamation marks") : (n = t.input.slice(e - 1, t.position + 1), Vl.test(n) || A(t, "named tag handle cannot contain such characters"), r = !0, e = t.position + 1)), s = t.input.charCodeAt(++t.position);
    o = t.input.slice(e, t.position), nb.test(o) && A(t, "tag suffix cannot contain flow indicator characters");
  }
  o && !Xl.test(o) && A(t, "tag name cannot contain such characters: " + o);
  try {
    o = decodeURIComponent(o);
  } catch {
    A(t, "tag name is malformed: " + o);
  }
  return i ? t.tag = o : re.call(t.tagMap, n) ? t.tag = t.tagMap[n] + o : n === "!" ? t.tag = "!" + o : n === "!!" ? t.tag = "tag:yaml.org,2002:" + o : A(t, 'undeclared tag handle "' + n + '"'), !0;
}
function yb(t) {
  var e, i;
  if (i = t.input.charCodeAt(t.position), i !== 38)
    return !1;
  for (t.anchor !== null && A(t, "duplication of an anchor property"), i = t.input.charCodeAt(++t.position), e = t.position; i !== 0 && !gt(i) && !we(i); )
    i = t.input.charCodeAt(++t.position);
  return t.position === e && A(t, "name of an anchor node must contain at least one character"), t.anchor = t.input.slice(e, t.position), !0;
}
function _b(t) {
  var e, i, r;
  if (r = t.input.charCodeAt(t.position), r !== 42)
    return !1;
  for (r = t.input.charCodeAt(++t.position), e = t.position; r !== 0 && !gt(r) && !we(r); )
    r = t.input.charCodeAt(++t.position);
  return t.position === e && A(t, "name of an alias node must contain at least one character"), i = t.input.slice(e, t.position), re.call(t.anchorMap, i) || A(t, 'unidentified alias "' + i + '"'), t.result = t.anchorMap[i], Q(t, !0, -1), !0;
}
function De(t, e, i, r, n) {
  var o, s, a, l = 1, h = !1, u = !1, f, c, d, m, S, O;
  if (t.listener !== null && t.listener("open", t), t.tag = null, t.anchor = null, t.kind = null, t.result = null, o = s = a = hr === i || Gl === i, r && Q(t, !0, -1) && (h = !0, t.lineIndent > e ? l = 1 : t.lineIndent === e ? l = 0 : t.lineIndent < e && (l = -1)), l === 1)
    for (; mb(t) || yb(t); )
      Q(t, !0, -1) ? (h = !0, a = o, t.lineIndent > e ? l = 1 : t.lineIndent === e ? l = 0 : t.lineIndent < e && (l = -1)) : a = !1;
  if (a && (a = h || n), (l === 1 || hr === i) && (lr === i || Yl === i ? S = e : S = e + 1, O = t.position - t.lineStart, l === 1 ? a && (Os(t, O) || gb(t, O, S)) || db(t, S) ? u = !0 : (s && pb(t, S) || ub(t, S) || fb(t, S) ? u = !0 : _b(t) ? (u = !0, (t.tag !== null || t.anchor !== null) && A(t, "alias node should not have any properties")) : cb(t, S, lr === i) && (u = !0, t.tag === null && (t.tag = "?")), t.anchor !== null && (t.anchorMap[t.anchor] = t.result)) : l === 0 && (u = a && Os(t, O))), t.tag === null)
    t.anchor !== null && (t.anchorMap[t.anchor] = t.result);
  else if (t.tag === "?") {
    for (t.result !== null && t.kind !== "scalar" && A(t, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + t.kind + '"'), f = 0, c = t.implicitTypes.length; f < c; f += 1)
      if (m = t.implicitTypes[f], m.resolve(t.result)) {
        t.result = m.construct(t.result), t.tag = m.tag, t.anchor !== null && (t.anchorMap[t.anchor] = t.result);
        break;
      }
  } else if (t.tag !== "!") {
    if (re.call(t.typeMap[t.kind || "fallback"], t.tag))
      m = t.typeMap[t.kind || "fallback"][t.tag];
    else
      for (m = null, d = t.typeMap.multi[t.kind || "fallback"], f = 0, c = d.length; f < c; f += 1)
        if (t.tag.slice(0, d[f].tag.length) === d[f].tag) {
          m = d[f];
          break;
        }
    m || A(t, "unknown tag !<" + t.tag + ">"), t.result !== null && m.kind !== t.kind && A(t, "unacceptable node kind for !<" + t.tag + '> tag; it should be "' + m.kind + '", not "' + t.kind + '"'), m.resolve(t.result, t.tag) ? (t.result = m.construct(t.result, t.tag), t.anchor !== null && (t.anchorMap[t.anchor] = t.result)) : A(t, "cannot resolve a node with !<" + t.tag + "> explicit tag");
  }
  return t.listener !== null && t.listener("close", t), t.tag !== null || t.anchor !== null || u;
}
function Cb(t) {
  var e = t.position, i, r, n, o = !1, s;
  for (t.version = null, t.checkLineBreaks = t.legacy, t.tagMap = /* @__PURE__ */ Object.create(null), t.anchorMap = /* @__PURE__ */ Object.create(null); (s = t.input.charCodeAt(t.position)) !== 0 && (Q(t, !0, -1), s = t.input.charCodeAt(t.position), !(t.lineIndent > 0 || s !== 37)); ) {
    for (o = !0, s = t.input.charCodeAt(++t.position), i = t.position; s !== 0 && !gt(s); )
      s = t.input.charCodeAt(++t.position);
    for (r = t.input.slice(i, t.position), n = [], r.length < 1 && A(t, "directive name must not be less than one character in length"); s !== 0; ) {
      for (; de(s); )
        s = t.input.charCodeAt(++t.position);
      if (s === 35) {
        do
          s = t.input.charCodeAt(++t.position);
        while (s !== 0 && !Mt(s));
        break;
      }
      if (Mt(s))
        break;
      for (i = t.position; s !== 0 && !gt(s); )
        s = t.input.charCodeAt(++t.position);
      n.push(t.input.slice(i, t.position));
    }
    s !== 0 && Jn(t), re.call(Es, r) ? Es[r](t, r, n) : cr(t, 'unknown document directive "' + r + '"');
  }
  if (Q(t, !0, -1), t.lineIndent === 0 && t.input.charCodeAt(t.position) === 45 && t.input.charCodeAt(t.position + 1) === 45 && t.input.charCodeAt(t.position + 2) === 45 ? (t.position += 3, Q(t, !0, -1)) : o && A(t, "directives end mark is expected"), De(t, t.lineIndent - 1, hr, !1, !0), Q(t, !0, -1), t.checkLineBreaks && rb.test(t.input.slice(e, t.position)) && cr(t, "non-ASCII line breaks are interpreted as content"), t.documents.push(t.result), t.position === t.lineStart && Ar(t)) {
    t.input.charCodeAt(t.position) === 46 && (t.position += 3, Q(t, !0, -1));
    return;
  }
  if (t.position < t.length - 1)
    A(t, "end of the stream or a document separator is expected");
  else
    return;
}
function Ql(t, e) {
  t = String(t), e = e || {}, t.length !== 0 && (t.charCodeAt(t.length - 1) !== 10 && t.charCodeAt(t.length - 1) !== 13 && (t += `
`), t.charCodeAt(0) === 65279 && (t = t.slice(1)));
  var i = new hb(t, e), r = t.indexOf("\0");
  for (r !== -1 && (i.position = r, A(i, "null byte is not allowed in input")), i.input += "\0"; i.input.charCodeAt(i.position) === 32; )
    i.lineIndent += 1, i.position += 1;
  for (; i.position < i.length - 1; )
    Cb(i);
  return i.documents;
}
function xb(t, e, i) {
  e !== null && typeof e == "object" && typeof i > "u" && (i = e, e = null);
  var r = Ql(t, i);
  if (typeof e != "function")
    return r;
  for (var n = 0, o = r.length; n < o; n += 1)
    e(r[n]);
}
function bb(t, e) {
  var i = Ql(t, e);
  if (i.length !== 0) {
    if (i.length === 1)
      return i[0];
    throw new Yt("expected a single document in the stream, but found more");
  }
}
var Tb = xb, kb = bb, Sb = {
  loadAll: Tb,
  load: kb
}, vb = Hl, wb = Sb.load;
function Bb(t) {
  const e = t.match(Na);
  if (!e)
    return {
      text: t,
      metadata: {}
    };
  let i = wb(e[1], {
    // To support config, we need JSON schema.
    // https://www.yaml.org/spec/1.2/spec.html#id2803231
    schema: vb
  }) ?? {};
  i = typeof i == "object" && !Array.isArray(i) ? i : {};
  const r = {};
  return i.displayMode && (r.displayMode = i.displayMode.toString()), i.title && (r.title = i.title.toString()), i.config && (r.config = i.config), {
    text: t.slice(e[0].length),
    metadata: r
  };
}
const Fb = (t) => t.replace(/\r\n?/g, `
`).replace(
  /<(\w+)([^>]*)>/g,
  (e, i, r) => "<" + i + r.replace(/="([^"]*)"/g, "='$1'") + ">"
), Ab = (t) => {
  const { text: e, metadata: i } = Bb(t), { displayMode: r, title: n, config: o = {} } = i;
  return r && (o.gantt || (o.gantt = {}), o.gantt.displayMode = r), { title: n, config: o, text: e };
}, Lb = (t) => {
  const e = ei.detectInit(t) ?? {}, i = ei.detectDirective(t, "wrap");
  return Array.isArray(i) ? e.wrap = i.some(({ type: r }) => {
  }) : (i == null ? void 0 : i.type) === "wrap" && (e.wrap = !0), {
    text: _0(t),
    directive: e
  };
};
function th(t) {
  const e = Fb(t), i = Ab(e), r = Lb(i.text), n = nl(i.config, r.directive);
  return t = NC(r.text), {
    code: t,
    title: i.title,
    config: n
  };
}
const Eb = 5e4, Mb = "graph TB;a[Maximum text size in diagram exceeded];style a fill:#faa", Ob = "sandbox", $b = "loose", Ib = "http://www.w3.org/2000/svg", Db = "http://www.w3.org/1999/xlink", Nb = "http://www.w3.org/1999/xhtml", Rb = "100%", Pb = "100%", qb = "border:0;margin:0;", zb = "margin:0", Wb = "allow-top-navigation-by-user-activation allow-popups", Hb = 'The "iframe" tag is not supported by your browser.', jb = ["foreignobject"], Ub = ["dominant-baseline"];
function eh(t) {
  const e = th(t);
  return or(), sy(e.config ?? {}), e;
}
async function Yb(t, e) {
  Kn(), t = eh(t).code;
  try {
    await to(t);
  } catch (i) {
    if (e != null && e.suppressErrors)
      return !1;
    throw i;
  }
  return !0;
}
const $s = (t, e, i = []) => `
.${t} ${e} { ${i.join(" !important; ")} !important; }`, Gb = (t, e = {}) => {
  var r;
  let i = "";
  if (t.themeCSS !== void 0 && (i += `
${t.themeCSS}`), t.fontFamily !== void 0 && (i += `
:root { --mermaid-font-family: ${t.fontFamily}}`), t.altFontFamily !== void 0 && (i += `
:root { --mermaid-alt-font-family: ${t.altFontFamily}}`), !Gr(e)) {
    const a = t.htmlLabels || ((r = t.flowchart) == null ? void 0 : r.htmlLabels) ? ["> *", "span"] : ["rect", "polygon", "ellipse", "circle", "path"];
    for (const l in e) {
      const h = e[l];
      Gr(h.styles) || a.forEach((u) => {
        i += $s(h.id, u, h.styles);
      }), Gr(h.textStyles) || (i += $s(h.id, "tspan", h.textStyles));
    }
  }
  return i;
}, Vb = (t, e, i, r) => {
  const n = Gb(t, i), o = w_(e, n, t.themeVariables);
  return gn(ty(`${r}{${o}}`), iy);
}, Xb = (t = "", e, i) => {
  let r = t;
  return !i && !e && (r = r.replace(
    /marker-end="url\([\d+./:=?A-Za-z-]*?#/g,
    'marker-end="url(#'
  )), r = q0(r), r = r.replace(/<br>/g, "<br/>"), r;
}, Kb = (t = "", e) => {
  var n, o;
  const i = (o = (n = e == null ? void 0 : e.viewBox) == null ? void 0 : n.baseVal) != null && o.height ? e.viewBox.baseVal.height + "px" : Pb, r = btoa('<body style="' + zb + '">' + t + "</body>");
  return `<iframe style="width:${Rb};height:${i};${qb}" src="data:text/html;base64,${r}" sandbox="${Wb}">
  ${Hb}
</iframe>`;
}, Is = (t, e, i, r, n) => {
  const o = t.append("div");
  o.attr("id", i), r && o.attr("style", r);
  const s = o.append("svg").attr("id", e).attr("width", "100%").attr("xmlns", Ib);
  return n && s.attr("xmlns:xlink", n), s.append("g"), t;
};
function Ds(t, e) {
  return t.append("iframe").attr("id", e).attr("style", "width: 100%; height: 100%;").attr("sandbox", "");
}
const Zb = (t, e, i, r) => {
  var n, o, s;
  (n = t.getElementById(e)) == null || n.remove(), (o = t.getElementById(i)) == null || o.remove(), (s = t.getElementById(r)) == null || s.remove();
}, Jb = async function(t, e, i) {
  var Nt, M, k, C, w, x;
  Kn();
  const r = eh(e);
  e = r.code;
  const n = $t();
  L.debug(n), e.length > ((n == null ? void 0 : n.maxTextSize) ?? Eb) && (e = Mb);
  const o = "#" + t, s = "i" + t, a = "#" + s, l = "d" + t, h = "#" + l;
  let u = bt("body");
  const f = n.securityLevel === Ob, c = n.securityLevel === $b, d = n.fontFamily;
  if (i !== void 0) {
    if (i && (i.innerHTML = ""), f) {
      const b = Ds(bt(i), s);
      u = bt(b.nodes()[0].contentDocument.body), u.node().style.margin = 0;
    } else
      u = bt(i);
    Is(u, t, l, `font-family: ${d}`, Db);
  } else {
    if (Zb(document, t, l, s), f) {
      const b = Ds(bt("body"), s);
      u = bt(b.nodes()[0].contentDocument.body), u.node().style.margin = 0;
    } else
      u = bt("body");
    Is(u, t, l);
  }
  let m, S;
  try {
    m = await to(e, { title: r.title });
  } catch (b) {
    m = new ql("error"), S = b;
  }
  const O = u.select(h).node(), z = m.type, T = O.firstChild, R = T.firstChild, X = (M = (Nt = m.renderer).getClasses) == null ? void 0 : M.call(Nt, e, m), G = Vb(n, z, X, o), V = document.createElement("style");
  V.innerHTML = G, T.insertBefore(V, R);
  try {
    await m.renderer.draw(e, t, _s, m);
  } catch (b) {
    throw H_.draw(e, t, _s), b;
  }
  const H = u.select(`${h} svg`), oe = (C = (k = m.db).getAccTitle) == null ? void 0 : C.call(k), Kt = (x = (w = m.db).getAccDescription) == null ? void 0 : x.call(w);
  t1(z, H, oe, Kt), u.select(`[id="${t}"]`).selectAll("foreignobject > *").attr("xmlns", Nb);
  let P = u.select(h).node().innerHTML;
  if (L.debug("config.arrowMarkerAbsolute", n.arrowMarkerAbsolute), P = Xb(P, f, La(n.arrowMarkerAbsolute)), f) {
    const b = u.select(h + " svg").node();
    P = Kb(P, b);
  } else
    c || (P = Ee.sanitize(P, {
      ADD_TAGS: jb,
      ADD_ATTR: Ub
    }));
  if (dC(), S)
    throw S;
  const Ct = bt(f ? a : h).node();
  return Ct && "remove" in Ct && Ct.remove(), {
    svg: P,
    bindFunctions: m.db.bindFunctions
  };
};
function Qb(t = {}) {
  var i;
  t != null && t.fontFamily && !((i = t.themeVariables) != null && i.fontFamily) && (t.themeVariables || (t.themeVariables = {}), t.themeVariables.fontFamily = t.fontFamily), ny(t), t != null && t.theme && t.theme in Gt ? t.themeVariables = Gt[t.theme].getThemeVariables(
    t.themeVariables
  ) : t && (t.themeVariables = Gt.default.getThemeVariables(t.themeVariables));
  const e = typeof t == "object" ? ry(t) : fl();
  bn(e.logLevel), Kn();
}
const to = (t, e = {}) => {
  const { code: i } = th(t);
  return fC(i, e);
};
function t1(t, e, i, r) {
  IC(e, t), DC(e, i, r, e.attr("id"));
}
const me = Object.freeze({
  render: Jb,
  parse: Yb,
  getDiagramFromText: to,
  initialize: Qb,
  getConfig: $t,
  setConfig: dl,
  getSiteConfig: fl,
  updateSiteConfig: oy,
  reset: () => {
    or();
  },
  globalReset: () => {
    or($e);
  },
  defaultConfig: $e
});
bn($t().logLevel);
or($t());
const e1 = async () => {
  L.debug("Loading registered diagrams");
  const e = (await Promise.allSettled(
    Object.entries(Me).map(async ([i, { detector: r, loader: n }]) => {
      if (n)
        try {
          Xn(i);
        } catch {
          try {
            const { diagram: s, id: a } = await n();
            ar(a, s, r);
          } catch (s) {
            throw L.error(`Failed to load external diagram with key ${i}. Removing from detectors.`), delete Me[i], s;
          }
        }
    })
  )).filter((i) => i.status === "rejected");
  if (e.length > 0) {
    L.error(`Failed to load ${e.length} external diagrams`);
    for (const i of e)
      L.error(i);
    throw new Error(`Failed to load ${e.length} external diagrams`);
  }
}, i1 = (t, e, i) => {
  L.warn(t), rl(t) ? (i && i(t.str, t.hash), e.push({ ...t, message: t.str, error: t })) : (i && i(t), t instanceof Error && e.push({
    str: t.message,
    message: t.message,
    hash: t.name,
    error: t
  }));
}, ih = async function(t = {
  querySelector: ".mermaid"
}) {
  try {
    await r1(t);
  } catch (e) {
    if (rl(e) && L.error(e.str), Tt.parseError && Tt.parseError(e), !t.suppressErrors)
      throw L.error("Use the suppressErrors option to suppress these errors"), e;
  }
}, r1 = async function({ postRenderCallback: t, querySelector: e, nodes: i } = {
  querySelector: ".mermaid"
}) {
  const r = me.getConfig();
  L.debug(`${t ? "" : "No "}Callback function found`);
  let n;
  if (i)
    n = i;
  else if (e)
    n = document.querySelectorAll(e);
  else
    throw new Error("Nodes and querySelector are both undefined");
  L.debug(`Found ${n.length} diagrams`), (r == null ? void 0 : r.startOnLoad) !== void 0 && (L.debug("Start On Load: " + (r == null ? void 0 : r.startOnLoad)), me.updateSiteConfig({ startOnLoad: r == null ? void 0 : r.startOnLoad }));
  const o = new ei.InitIDGenerator(r.deterministicIds, r.deterministicIDSeed);
  let s;
  const a = [];
  for (const l of Array.from(n)) {
    L.info("Rendering diagram: " + l.id);
    /*! Check if previously processed */
    if (l.getAttribute("data-processed"))
      continue;
    l.setAttribute("data-processed", "true");
    const h = `mermaid-${o.next()}`;
    s = l.innerHTML, s = mh(ei.entityDecode(s)).trim().replace(/<br\s*\/?>/gi, "<br/>");
    const u = ei.detectInit(s);
    u && L.debug("Detected early reinit: ", u);
    try {
      const { svg: f, bindFunctions: c } = await sh(h, s, l);
      l.innerHTML = f, t && await t(h), c && c(l);
    } catch (f) {
      i1(f, a, Tt.parseError);
    }
  }
  if (a.length > 0)
    throw a[0];
}, rh = function(t) {
  me.initialize(t);
}, n1 = async function(t, e, i) {
  L.warn("mermaid.init is deprecated. Please use run instead."), t && rh(t);
  const r = { postRenderCallback: i, querySelector: ".mermaid" };
  typeof e == "string" ? r.querySelector = e : e && (e instanceof HTMLElement ? r.nodes = [e] : r.nodes = e), await ih(r);
}, o1 = async (t, {
  lazyLoad: e = !0
} = {}) => {
  Pa(...t), e === !1 && await e1();
}, nh = function() {
  if (Tt.startOnLoad) {
    const { startOnLoad: t } = me.getConfig();
    t && Tt.run().catch((e) => L.error("Mermaid failed to initialize", e));
  }
};
if (typeof document < "u") {
  /*!
   * Wait for document loaded before starting the execution
   */
  window.addEventListener("load", nh, !1);
}
const s1 = function(t) {
  Tt.parseError = t;
}, ur = [];
let Zr = !1;
const oh = async () => {
  if (!Zr) {
    for (Zr = !0; ur.length > 0; ) {
      const t = ur.shift();
      if (t)
        try {
          await t();
        } catch (e) {
          L.error("Error executing queue", e);
        }
    }
    Zr = !1;
  }
}, a1 = async (t, e) => new Promise((i, r) => {
  const n = () => new Promise((o, s) => {
    me.parse(t, e).then(
      (a) => {
        o(a), i(a);
      },
      (a) => {
        var l;
        L.error("Error parsing", a), (l = Tt.parseError) == null || l.call(Tt, a), s(a), r(a);
      }
    );
  });
  ur.push(n), oh().catch(r);
}), sh = (t, e, i) => new Promise((r, n) => {
  const o = () => new Promise((s, a) => {
    me.render(t, e, i).then(
      (l) => {
        s(l), r(l);
      },
      (l) => {
        var h;
        L.error("Error parsing", l), (h = Tt.parseError) == null || h.call(Tt, l), a(l), n(l);
      }
    );
  });
  ur.push(o), oh().catch(n);
}), Tt = {
  startOnLoad: !0,
  mermaidAPI: me,
  parse: a1,
  render: sh,
  init: n1,
  run: ih,
  registerExternalDiagrams: o1,
  initialize: rh,
  parseError: void 0,
  contentLoaded: nh,
  setParseErrorHandler: s1,
  detectType: xr
};
export {
  vn as $,
  ei as A,
  Je as B,
  M_ as C,
  O_ as D,
  B_ as E,
  Pf as F,
  C1 as G,
  L0 as H,
  R_ as I,
  Sn as J,
  Js as K,
  pi as L,
  uu as M,
  ea as N,
  l1 as O,
  yh as P,
  _h as Q,
  pt as R,
  yt as S,
  xh as T,
  z_ as U,
  m1 as V,
  yp as W,
  nl as X,
  zn as Y,
  up as Z,
  $t as _,
  E_ as a,
  Re as a$,
  te as a0,
  oi as a1,
  Mo as a2,
  _u as a3,
  Qo as a4,
  p0 as a5,
  x1 as a6,
  F0 as a7,
  ye as a8,
  l0 as a9,
  Ro as aA,
  g1 as aB,
  d1 as aC,
  h1 as aD,
  c1 as aE,
  _1 as aF,
  y1 as aG,
  f1 as aH,
  $ as aI,
  Ot as aJ,
  _i as aK,
  Ne as aL,
  tr as aM,
  Um as aN,
  _C as aO,
  yi as aP,
  ir as aQ,
  Pm as aR,
  Ua as aS,
  Dg as aT,
  Ng as aU,
  AC as aV,
  us as aW,
  Rg as aX,
  Nn as aY,
  $g as aZ,
  Hg as a_,
  Qm as aa,
  Dt as ab,
  h0 as ac,
  c0 as ad,
  Ja as ae,
  br as af,
  vr as ag,
  rr as ah,
  Mg as ai,
  Dn as aj,
  tl as ak,
  Za as al,
  Rm as am,
  Mm as an,
  t0 as ao,
  d0 as ap,
  gi as aq,
  w1 as ar,
  $_ as as,
  mi as at,
  F as au,
  E as av,
  An as aw,
  u1 as ax,
  p1 as ay,
  Po as az,
  L_ as b,
  ne as b0,
  ss as b1,
  Rn as b2,
  Ga as b3,
  _n as b4,
  Kg as b5,
  Gr as b6,
  q0 as b7,
  mh as b8,
  Tt as b9,
  Vn as c,
  ai as d,
  Rs as e,
  $n as f,
  A_ as g,
  st as h,
  nr as i,
  bt as j,
  Ol as k,
  L as l,
  I0 as m,
  Df as n,
  B0 as o,
  La as p,
  x0 as q,
  Od as r,
  F_ as s,
  k_ as t,
  v1 as u,
  Zs as v,
  O0 as w,
  Fh as x,
  sm as y,
  In as z
};
