function bh(t) {
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
`).map(function(c, p) {
      return p === 0 ? c : "" + u + c;
    }).join(`
`)), s += f + r[l + 1];
  }), s;
}
var Th = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function kh(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var Hs = { exports: {} };
(function(t, e) {
  (function(i, r) {
    t.exports = r();
  })(Th, function() {
    var i = 1e3, r = 6e4, n = 36e5, o = "millisecond", s = "second", a = "minute", l = "hour", h = "day", u = "week", f = "month", c = "quarter", p = "year", m = "date", k = "Invalid Date", O = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, q = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, T = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(M) {
      var b = ["th", "st", "nd", "rd"], C = M % 100;
      return "[" + M + (b[(C - 20) % 10] || b[C] || b[0]) + "]";
    } }, U = function(M, b, C) {
      var v = String(M);
      return !v || v.length >= b ? M : "" + Array(b + 1 - v.length).join(C) + M;
    }, W = { s: U, z: function(M) {
      var b = -M.utcOffset(), C = Math.abs(b), v = Math.floor(C / 60), x = C % 60;
      return (b <= 0 ? "+" : "-") + U(v, 2, "0") + ":" + U(x, 2, "0");
    }, m: function M(b, C) {
      if (b.date() < C.date())
        return -M(C, b);
      var v = 12 * (C.year() - b.year()) + (C.month() - b.month()), x = b.clone().add(v, f), A = C - x < 0, D = b.clone().add(v + (A ? -1 : 1), f);
      return +(-(v + (C - x) / (A ? x - D : D - x)) || 0);
    }, a: function(M) {
      return M < 0 ? Math.ceil(M) || 0 : Math.floor(M);
    }, p: function(M) {
      return { M: f, y: p, w: u, d: h, D: m, h: l, m: a, s, ms: o, Q: c }[M] || String(M || "").toLowerCase().replace(/s$/, "");
    }, u: function(M) {
      return M === void 0;
    } }, G = "en", V = {};
    V[G] = T;
    var H = "$isDayjsObject", ae = function(M) {
      return M instanceof _t || !(!M || !M[H]);
    }, Jt = function M(b, C, v) {
      var x;
      if (!b)
        return G;
      if (typeof b == "string") {
        var A = b.toLowerCase();
        V[A] && (x = A), C && (V[A] = C, x = A);
        var D = b.split("-");
        if (!x && D.length > 1)
          return M(D[0]);
      } else {
        var I = b.name;
        V[I] = b, x = I;
      }
      return !v && x && (G = x), x || !v && G;
    }, j = function(M, b) {
      if (ae(M))
        return M.clone();
      var C = typeof b == "object" ? b : {};
      return C.date = M, C.args = arguments, new _t(C);
    }, N = W;
    N.l = Jt, N.i = ae, N.w = function(M, b) {
      return j(M, { locale: b.$L, utc: b.$u, x: b.$x, $offset: b.$offset });
    };
    var _t = function() {
      function M(C) {
        this.$L = Jt(C.locale, null, !0), this.parse(C), this.$x = this.$x || C.x || {}, this[H] = !0;
      }
      var b = M.prototype;
      return b.parse = function(C) {
        this.$d = function(v) {
          var x = v.date, A = v.utc;
          if (x === null)
            return /* @__PURE__ */ new Date(NaN);
          if (N.u(x))
            return /* @__PURE__ */ new Date();
          if (x instanceof Date)
            return new Date(x);
          if (typeof x == "string" && !/Z$/i.test(x)) {
            var D = x.match(O);
            if (D) {
              var I = D[2] - 1 || 0, K = (D[7] || "0").substring(0, 3);
              return A ? new Date(Date.UTC(D[1], I, D[3] || 1, D[4] || 0, D[5] || 0, D[6] || 0, K)) : new Date(D[1], I, D[3] || 1, D[4] || 0, D[5] || 0, D[6] || 0, K);
            }
          }
          return new Date(x);
        }(C), this.init();
      }, b.init = function() {
        var C = this.$d;
        this.$y = C.getFullYear(), this.$M = C.getMonth(), this.$D = C.getDate(), this.$W = C.getDay(), this.$H = C.getHours(), this.$m = C.getMinutes(), this.$s = C.getSeconds(), this.$ms = C.getMilliseconds();
      }, b.$utils = function() {
        return N;
      }, b.isValid = function() {
        return this.$d.toString() !== k;
      }, b.isSame = function(C, v) {
        var x = j(C);
        return this.startOf(v) <= x && x <= this.endOf(v);
      }, b.isAfter = function(C, v) {
        return j(C) < this.startOf(v);
      }, b.isBefore = function(C, v) {
        return this.endOf(v) < j(C);
      }, b.$g = function(C, v, x) {
        return N.u(C) ? this[v] : this.set(x, C);
      }, b.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, b.valueOf = function() {
        return this.$d.getTime();
      }, b.startOf = function(C, v) {
        var x = this, A = !!N.u(v) || v, D = N.p(C), I = function(Bt, et) {
          var Ft = N.w(x.$u ? Date.UTC(x.$y, et, Bt) : new Date(x.$y, et, Bt), x);
          return A ? Ft : Ft.endOf(h);
        }, K = function(Bt, et) {
          return N.w(x.toDate()[Bt].apply(x.toDate("s"), (A ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(et)), x);
        }, R = this.$W, Q = this.$M, z = this.$D, Ct = "set" + (this.$u ? "UTC" : "");
        switch (D) {
          case p:
            return A ? I(1, 0) : I(31, 11);
          case f:
            return A ? I(1, Q) : I(0, Q + 1);
          case u:
            var wt = this.$locale().weekStart || 0, Qt = (R < wt ? R + 7 : R) - wt;
            return I(A ? z - Qt : z + (6 - Qt), Q);
          case h:
          case m:
            return K(Ct + "Hours", 0);
          case l:
            return K(Ct + "Minutes", 1);
          case a:
            return K(Ct + "Seconds", 2);
          case s:
            return K(Ct + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, b.endOf = function(C) {
        return this.startOf(C, !1);
      }, b.$set = function(C, v) {
        var x, A = N.p(C), D = "set" + (this.$u ? "UTC" : ""), I = (x = {}, x[h] = D + "Date", x[m] = D + "Date", x[f] = D + "Month", x[p] = D + "FullYear", x[l] = D + "Hours", x[a] = D + "Minutes", x[s] = D + "Seconds", x[o] = D + "Milliseconds", x)[A], K = A === h ? this.$D + (v - this.$W) : v;
        if (A === f || A === p) {
          var R = this.clone().set(m, 1);
          R.$d[I](K), R.init(), this.$d = R.set(m, Math.min(this.$D, R.daysInMonth())).$d;
        } else
          I && this.$d[I](K);
        return this.init(), this;
      }, b.set = function(C, v) {
        return this.clone().$set(C, v);
      }, b.get = function(C) {
        return this[N.p(C)]();
      }, b.add = function(C, v) {
        var x, A = this;
        C = Number(C);
        var D = N.p(v), I = function(Q) {
          var z = j(A);
          return N.w(z.date(z.date() + Math.round(Q * C)), A);
        };
        if (D === f)
          return this.set(f, this.$M + C);
        if (D === p)
          return this.set(p, this.$y + C);
        if (D === h)
          return I(1);
        if (D === u)
          return I(7);
        var K = (x = {}, x[a] = r, x[l] = n, x[s] = i, x)[D] || 1, R = this.$d.getTime() + C * K;
        return N.w(R, this);
      }, b.subtract = function(C, v) {
        return this.add(-1 * C, v);
      }, b.format = function(C) {
        var v = this, x = this.$locale();
        if (!this.isValid())
          return x.invalidDate || k;
        var A = C || "YYYY-MM-DDTHH:mm:ssZ", D = N.z(this), I = this.$H, K = this.$m, R = this.$M, Q = x.weekdays, z = x.months, Ct = x.meridiem, wt = function(et, Ft, xt, te) {
          return et && (et[Ft] || et(v, A)) || xt[Ft].slice(0, te);
        }, Qt = function(et) {
          return N.s(I % 12 || 12, et, "0");
        }, Bt = Ct || function(et, Ft, xt) {
          var te = et < 12 ? "AM" : "PM";
          return xt ? te.toLowerCase() : te;
        };
        return A.replace(q, function(et, Ft) {
          return Ft || function(xt) {
            switch (xt) {
              case "YY":
                return String(v.$y).slice(-2);
              case "YYYY":
                return N.s(v.$y, 4, "0");
              case "M":
                return R + 1;
              case "MM":
                return N.s(R + 1, 2, "0");
              case "MMM":
                return wt(x.monthsShort, R, z, 3);
              case "MMMM":
                return wt(z, R);
              case "D":
                return v.$D;
              case "DD":
                return N.s(v.$D, 2, "0");
              case "d":
                return String(v.$W);
              case "dd":
                return wt(x.weekdaysMin, v.$W, Q, 2);
              case "ddd":
                return wt(x.weekdaysShort, v.$W, Q, 3);
              case "dddd":
                return Q[v.$W];
              case "H":
                return String(I);
              case "HH":
                return N.s(I, 2, "0");
              case "h":
                return Qt(1);
              case "hh":
                return Qt(2);
              case "a":
                return Bt(I, K, !0);
              case "A":
                return Bt(I, K, !1);
              case "m":
                return String(K);
              case "mm":
                return N.s(K, 2, "0");
              case "s":
                return String(v.$s);
              case "ss":
                return N.s(v.$s, 2, "0");
              case "SSS":
                return N.s(v.$ms, 3, "0");
              case "Z":
                return D;
            }
            return null;
          }(et) || D.replace(":", "");
        });
      }, b.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, b.diff = function(C, v, x) {
        var A, D = this, I = N.p(v), K = j(C), R = (K.utcOffset() - this.utcOffset()) * r, Q = this - K, z = function() {
          return N.m(D, K);
        };
        switch (I) {
          case p:
            A = z() / 12;
            break;
          case f:
            A = z();
            break;
          case c:
            A = z() / 3;
            break;
          case u:
            A = (Q - R) / 6048e5;
            break;
          case h:
            A = (Q - R) / 864e5;
            break;
          case l:
            A = Q / n;
            break;
          case a:
            A = Q / r;
            break;
          case s:
            A = Q / i;
            break;
          default:
            A = Q;
        }
        return x ? A : N.a(A);
      }, b.daysInMonth = function() {
        return this.endOf(f).$D;
      }, b.$locale = function() {
        return V[this.$L];
      }, b.locale = function(C, v) {
        if (!C)
          return this.$L;
        var x = this.clone(), A = Jt(C, v, !0);
        return A && (x.$L = A), x;
      }, b.clone = function() {
        return N.w(this.$d, this);
      }, b.toDate = function() {
        return new Date(this.valueOf());
      }, b.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, b.toISOString = function() {
        return this.$d.toISOString();
      }, b.toString = function() {
        return this.$d.toUTCString();
      }, M;
    }(), zt = _t.prototype;
    return j.prototype = zt, [["$ms", o], ["$s", s], ["$m", a], ["$H", l], ["$W", h], ["$M", f], ["$y", p], ["$D", m]].forEach(function(M) {
      zt[M[1]] = function(b) {
        return this.$g(b, M[0], M[1]);
      };
    }), j.extend = function(M, b) {
      return M.$i || (M(b, _t, j), M.$i = !0), j;
    }, j.locale = Jt, j.isDayjs = ae, j.unix = function(M) {
      return j(1e3 * M);
    }, j.en = V[G], j.Ls = V, j.p = {}, j;
  });
})(Hs);
var Sh = Hs.exports;
const vh = /* @__PURE__ */ kh(Sh), jt = {
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
}, vn = function(t = "fatal") {
  let e = jt.fatal;
  typeof t == "string" ? (t = t.toLowerCase(), t in jt && (e = jt[t])) : typeof t == "number" && (e = t), L.trace = () => {
  }, L.debug = () => {
  }, L.info = () => {
  }, L.warn = () => {
  }, L.error = () => {
  }, L.fatal = () => {
  }, e <= jt.fatal && (L.fatal = console.error ? console.error.bind(console, bt("FATAL"), "color: orange") : console.log.bind(console, "\x1B[35m", bt("FATAL"))), e <= jt.error && (L.error = console.error ? console.error.bind(console, bt("ERROR"), "color: orange") : console.log.bind(console, "\x1B[31m", bt("ERROR"))), e <= jt.warn && (L.warn = console.warn ? console.warn.bind(console, bt("WARN"), "color: orange") : console.log.bind(console, "\x1B[33m", bt("WARN"))), e <= jt.info && (L.info = console.info ? console.info.bind(console, bt("INFO"), "color: lightblue") : console.log.bind(console, "\x1B[34m", bt("INFO"))), e <= jt.debug && (L.debug = console.debug ? console.debug.bind(console, bt("DEBUG"), "color: lightgreen") : console.log.bind(console, "\x1B[32m", bt("DEBUG"))), e <= jt.trace && (L.trace = console.debug ? console.debug.bind(console, bt("TRACE"), "color: lightgreen") : console.log.bind(console, "\x1B[32m", bt("TRACE")));
}, bt = (t) => `%c${vh().format("ss.SSS")} : ${t} : `;
var js = {};
(function(t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.sanitizeUrl = t.BLANK_URL = void 0;
  var e = /^([^\w]*)(javascript|data|vbscript)/im, i = /&#(\w+)(^\w|;)?/g, r = /&(newline|tab);/gi, n = /[\u0000-\u001F\u007F-\u009F\u2000-\u200D\uFEFF]/gim, o = /^.+(:|&colon;)/gim, s = [".", "/"];
  t.BLANK_URL = "about:blank";
  function a(u) {
    return s.indexOf(u[0]) > -1;
  }
  function l(u) {
    var f = u.replace(n, "");
    return f.replace(i, function(c, p) {
      return String.fromCharCode(p);
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
    var p = c[0];
    return e.test(p) ? t.BLANK_URL : f;
  }
  t.sanitizeUrl = h;
})(js);
var wh = { value: () => {
} };
function Us() {
  for (var t = 0, e = arguments.length, i = {}, r; t < e; ++t) {
    if (!(r = arguments[t] + "") || r in i || /[\s.]/.test(r))
      throw new Error("illegal type: " + r);
    i[r] = [];
  }
  return new Di(i);
}
function Di(t) {
  this._ = t;
}
function Bh(t, e) {
  return t.trim().split(/^|\s+/).map(function(i) {
    var r = "", n = i.indexOf(".");
    if (n >= 0 && (r = i.slice(n + 1), i = i.slice(0, n)), i && !e.hasOwnProperty(i))
      throw new Error("unknown type: " + i);
    return { type: i, name: r };
  });
}
Di.prototype = Us.prototype = {
  constructor: Di,
  on: function(t, e) {
    var i = this._, r = Bh(t + "", i), n, o = -1, s = r.length;
    if (arguments.length < 2) {
      for (; ++o < s; )
        if ((n = (t = r[o]).type) && (n = Fh(i[n], t.name)))
          return n;
      return;
    }
    if (e != null && typeof e != "function")
      throw new Error("invalid callback: " + e);
    for (; ++o < s; )
      if (n = (t = r[o]).type)
        i[n] = Bo(i[n], t.name, e);
      else if (e == null)
        for (n in i)
          i[n] = Bo(i[n], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, e = this._;
    for (var i in e)
      t[i] = e[i].slice();
    return new Di(t);
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
function Fh(t, e) {
  for (var i = 0, r = t.length, n; i < r; ++i)
    if ((n = t[i]).name === e)
      return n.value;
}
function Bo(t, e, i) {
  for (var r = 0, n = t.length; r < n; ++r)
    if (t[r].name === e) {
      t[r] = wh, t = t.slice(0, r).concat(t.slice(r + 1));
      break;
    }
  return i != null && t.push({ name: e, value: i }), t;
}
var rn = "http://www.w3.org/1999/xhtml";
const Fo = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: rn,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function gr(t) {
  var e = t += "", i = e.indexOf(":");
  return i >= 0 && (e = t.slice(0, i)) !== "xmlns" && (t = t.slice(i + 1)), Fo.hasOwnProperty(e) ? { space: Fo[e], local: t } : t;
}
function Ah(t) {
  return function() {
    var e = this.ownerDocument, i = this.namespaceURI;
    return i === rn && e.documentElement.namespaceURI === rn ? e.createElement(t) : e.createElementNS(i, t);
  };
}
function Lh(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function Ys(t) {
  var e = gr(t);
  return (e.local ? Lh : Ah)(e);
}
function Eh() {
}
function wn(t) {
  return t == null ? Eh : function() {
    return this.querySelector(t);
  };
}
function Mh(t) {
  typeof t != "function" && (t = wn(t));
  for (var e = this._groups, i = e.length, r = new Array(i), n = 0; n < i; ++n)
    for (var o = e[n], s = o.length, a = r[n] = new Array(s), l, h, u = 0; u < s; ++u)
      (l = o[u]) && (h = t.call(l, l.__data__, u, o)) && ("__data__" in l && (h.__data__ = l.__data__), a[u] = h);
  return new mt(r, this._parents);
}
function Oh(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function $h() {
  return [];
}
function Gs(t) {
  return t == null ? $h : function() {
    return this.querySelectorAll(t);
  };
}
function Ih(t) {
  return function() {
    return Oh(t.apply(this, arguments));
  };
}
function Dh(t) {
  typeof t == "function" ? t = Ih(t) : t = Gs(t);
  for (var e = this._groups, i = e.length, r = [], n = [], o = 0; o < i; ++o)
    for (var s = e[o], a = s.length, l, h = 0; h < a; ++h)
      (l = s[h]) && (r.push(t.call(l, l.__data__, h, s)), n.push(l));
  return new mt(r, n);
}
function Vs(t) {
  return function() {
    return this.matches(t);
  };
}
function Xs(t) {
  return function(e) {
    return e.matches(t);
  };
}
var Nh = Array.prototype.find;
function Rh(t) {
  return function() {
    return Nh.call(this.children, t);
  };
}
function Ph() {
  return this.firstElementChild;
}
function qh(t) {
  return this.select(t == null ? Ph : Rh(typeof t == "function" ? t : Xs(t)));
}
var zh = Array.prototype.filter;
function Wh() {
  return Array.from(this.children);
}
function Hh(t) {
  return function() {
    return zh.call(this.children, t);
  };
}
function jh(t) {
  return this.selectAll(t == null ? Wh : Hh(typeof t == "function" ? t : Xs(t)));
}
function Uh(t) {
  typeof t != "function" && (t = Vs(t));
  for (var e = this._groups, i = e.length, r = new Array(i), n = 0; n < i; ++n)
    for (var o = e[n], s = o.length, a = r[n] = [], l, h = 0; h < s; ++h)
      (l = o[h]) && t.call(l, l.__data__, h, o) && a.push(l);
  return new mt(r, this._parents);
}
function Ks(t) {
  return new Array(t.length);
}
function Yh() {
  return new mt(this._enter || this._groups.map(Ks), this._parents);
}
function Gi(t, e) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = e;
}
Gi.prototype = {
  constructor: Gi,
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
function Gh(t) {
  return function() {
    return t;
  };
}
function Vh(t, e, i, r, n, o) {
  for (var s = 0, a, l = e.length, h = o.length; s < h; ++s)
    (a = e[s]) ? (a.__data__ = o[s], r[s] = a) : i[s] = new Gi(t, o[s]);
  for (; s < l; ++s)
    (a = e[s]) && (n[s] = a);
}
function Xh(t, e, i, r, n, o, s) {
  var a, l, h = /* @__PURE__ */ new Map(), u = e.length, f = o.length, c = new Array(u), p;
  for (a = 0; a < u; ++a)
    (l = e[a]) && (c[a] = p = s.call(l, l.__data__, a, e) + "", h.has(p) ? n[a] = l : h.set(p, l));
  for (a = 0; a < f; ++a)
    p = s.call(t, o[a], a, o) + "", (l = h.get(p)) ? (r[a] = l, l.__data__ = o[a], h.delete(p)) : i[a] = new Gi(t, o[a]);
  for (a = 0; a < u; ++a)
    (l = e[a]) && h.get(c[a]) === l && (n[a] = l);
}
function Kh(t) {
  return t.__data__;
}
function Zh(t, e) {
  if (!arguments.length)
    return Array.from(this, Kh);
  var i = e ? Xh : Vh, r = this._parents, n = this._groups;
  typeof t != "function" && (t = Gh(t));
  for (var o = n.length, s = new Array(o), a = new Array(o), l = new Array(o), h = 0; h < o; ++h) {
    var u = r[h], f = n[h], c = f.length, p = Jh(t.call(u, u && u.__data__, h, r)), m = p.length, k = a[h] = new Array(m), O = s[h] = new Array(m), q = l[h] = new Array(c);
    i(u, f, k, O, q, p, e);
    for (var T = 0, U = 0, W, G; T < m; ++T)
      if (W = k[T]) {
        for (T >= U && (U = T + 1); !(G = O[U]) && ++U < m; )
          ;
        W._next = G || null;
      }
  }
  return s = new mt(s, r), s._enter = a, s._exit = l, s;
}
function Jh(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function Qh() {
  return new mt(this._exit || this._groups.map(Ks), this._parents);
}
function tc(t, e, i) {
  var r = this.enter(), n = this, o = this.exit();
  return typeof t == "function" ? (r = t(r), r && (r = r.selection())) : r = r.append(t + ""), e != null && (n = e(n), n && (n = n.selection())), i == null ? o.remove() : i(o), r && n ? r.merge(n).order() : n;
}
function ec(t) {
  for (var e = t.selection ? t.selection() : t, i = this._groups, r = e._groups, n = i.length, o = r.length, s = Math.min(n, o), a = new Array(n), l = 0; l < s; ++l)
    for (var h = i[l], u = r[l], f = h.length, c = a[l] = new Array(f), p, m = 0; m < f; ++m)
      (p = h[m] || u[m]) && (c[m] = p);
  for (; l < n; ++l)
    a[l] = i[l];
  return new mt(a, this._parents);
}
function ic() {
  for (var t = this._groups, e = -1, i = t.length; ++e < i; )
    for (var r = t[e], n = r.length - 1, o = r[n], s; --n >= 0; )
      (s = r[n]) && (o && s.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(s, o), o = s);
  return this;
}
function rc(t) {
  t || (t = nc);
  function e(f, c) {
    return f && c ? t(f.__data__, c.__data__) : !f - !c;
  }
  for (var i = this._groups, r = i.length, n = new Array(r), o = 0; o < r; ++o) {
    for (var s = i[o], a = s.length, l = n[o] = new Array(a), h, u = 0; u < a; ++u)
      (h = s[u]) && (l[u] = h);
    l.sort(e);
  }
  return new mt(n, this._parents).order();
}
function nc(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function oc() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function sc() {
  return Array.from(this);
}
function ac() {
  for (var t = this._groups, e = 0, i = t.length; e < i; ++e)
    for (var r = t[e], n = 0, o = r.length; n < o; ++n) {
      var s = r[n];
      if (s)
        return s;
    }
  return null;
}
function lc() {
  let t = 0;
  for (const e of this)
    ++t;
  return t;
}
function hc() {
  return !this.node();
}
function cc(t) {
  for (var e = this._groups, i = 0, r = e.length; i < r; ++i)
    for (var n = e[i], o = 0, s = n.length, a; o < s; ++o)
      (a = n[o]) && t.call(a, a.__data__, o, n);
  return this;
}
function uc(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function fc(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function dc(t, e) {
  return function() {
    this.setAttribute(t, e);
  };
}
function pc(t, e) {
  return function() {
    this.setAttributeNS(t.space, t.local, e);
  };
}
function gc(t, e) {
  return function() {
    var i = e.apply(this, arguments);
    i == null ? this.removeAttribute(t) : this.setAttribute(t, i);
  };
}
function mc(t, e) {
  return function() {
    var i = e.apply(this, arguments);
    i == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, i);
  };
}
function yc(t, e) {
  var i = gr(t);
  if (arguments.length < 2) {
    var r = this.node();
    return i.local ? r.getAttributeNS(i.space, i.local) : r.getAttribute(i);
  }
  return this.each((e == null ? i.local ? fc : uc : typeof e == "function" ? i.local ? mc : gc : i.local ? pc : dc)(i, e));
}
function Zs(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function _c(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Cc(t, e, i) {
  return function() {
    this.style.setProperty(t, e, i);
  };
}
function xc(t, e, i) {
  return function() {
    var r = e.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, i);
  };
}
function bc(t, e, i) {
  return arguments.length > 1 ? this.each((e == null ? _c : typeof e == "function" ? xc : Cc)(t, e, i ?? "")) : Le(this.node(), t);
}
function Le(t, e) {
  return t.style.getPropertyValue(e) || Zs(t).getComputedStyle(t, null).getPropertyValue(e);
}
function Tc(t) {
  return function() {
    delete this[t];
  };
}
function kc(t, e) {
  return function() {
    this[t] = e;
  };
}
function Sc(t, e) {
  return function() {
    var i = e.apply(this, arguments);
    i == null ? delete this[t] : this[t] = i;
  };
}
function vc(t, e) {
  return arguments.length > 1 ? this.each((e == null ? Tc : typeof e == "function" ? Sc : kc)(t, e)) : this.node()[t];
}
function Js(t) {
  return t.trim().split(/^|\s+/);
}
function Bn(t) {
  return t.classList || new Qs(t);
}
function Qs(t) {
  this._node = t, this._names = Js(t.getAttribute("class") || "");
}
Qs.prototype = {
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
function ta(t, e) {
  for (var i = Bn(t), r = -1, n = e.length; ++r < n; )
    i.add(e[r]);
}
function ea(t, e) {
  for (var i = Bn(t), r = -1, n = e.length; ++r < n; )
    i.remove(e[r]);
}
function wc(t) {
  return function() {
    ta(this, t);
  };
}
function Bc(t) {
  return function() {
    ea(this, t);
  };
}
function Fc(t, e) {
  return function() {
    (e.apply(this, arguments) ? ta : ea)(this, t);
  };
}
function Ac(t, e) {
  var i = Js(t + "");
  if (arguments.length < 2) {
    for (var r = Bn(this.node()), n = -1, o = i.length; ++n < o; )
      if (!r.contains(i[n]))
        return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? Fc : e ? wc : Bc)(i, e));
}
function Lc() {
  this.textContent = "";
}
function Ec(t) {
  return function() {
    this.textContent = t;
  };
}
function Mc(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.textContent = e ?? "";
  };
}
function Oc(t) {
  return arguments.length ? this.each(t == null ? Lc : (typeof t == "function" ? Mc : Ec)(t)) : this.node().textContent;
}
function $c() {
  this.innerHTML = "";
}
function Ic(t) {
  return function() {
    this.innerHTML = t;
  };
}
function Dc(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function Nc(t) {
  return arguments.length ? this.each(t == null ? $c : (typeof t == "function" ? Dc : Ic)(t)) : this.node().innerHTML;
}
function Rc() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Pc() {
  return this.each(Rc);
}
function qc() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function zc() {
  return this.each(qc);
}
function Wc(t) {
  var e = typeof t == "function" ? t : Ys(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function Hc() {
  return null;
}
function jc(t, e) {
  var i = typeof t == "function" ? t : Ys(t), r = e == null ? Hc : typeof e == "function" ? e : wn(e);
  return this.select(function() {
    return this.insertBefore(i.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function Uc() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function Yc() {
  return this.each(Uc);
}
function Gc() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Vc() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Xc(t) {
  return this.select(t ? Vc : Gc);
}
function Kc(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function Zc(t) {
  return function(e) {
    t.call(this, e, this.__data__);
  };
}
function Jc(t) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var i = "", r = e.indexOf(".");
    return r >= 0 && (i = e.slice(r + 1), e = e.slice(0, r)), { type: e, name: i };
  });
}
function Qc(t) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var i = 0, r = -1, n = e.length, o; i < n; ++i)
        o = e[i], (!t.type || o.type === t.type) && o.name === t.name ? this.removeEventListener(o.type, o.listener, o.options) : e[++r] = o;
      ++r ? e.length = r : delete this.__on;
    }
  };
}
function tu(t, e, i) {
  return function() {
    var r = this.__on, n, o = Zc(e);
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
function eu(t, e, i) {
  var r = Jc(t + ""), n, o = r.length, s;
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
  for (a = e ? tu : Qc, n = 0; n < o; ++n)
    this.each(a(r[n], e, i));
  return this;
}
function ia(t, e, i) {
  var r = Zs(t), n = r.CustomEvent;
  typeof n == "function" ? n = new n(e, i) : (n = r.document.createEvent("Event"), i ? (n.initEvent(e, i.bubbles, i.cancelable), n.detail = i.detail) : n.initEvent(e, !1, !1)), t.dispatchEvent(n);
}
function iu(t, e) {
  return function() {
    return ia(this, t, e);
  };
}
function ru(t, e) {
  return function() {
    return ia(this, t, e.apply(this, arguments));
  };
}
function nu(t, e) {
  return this.each((typeof e == "function" ? ru : iu)(t, e));
}
function* ou() {
  for (var t = this._groups, e = 0, i = t.length; e < i; ++e)
    for (var r = t[e], n = 0, o = r.length, s; n < o; ++n)
      (s = r[n]) && (yield s);
}
var ra = [null];
function mt(t, e) {
  this._groups = t, this._parents = e;
}
function mi() {
  return new mt([[document.documentElement]], ra);
}
function su() {
  return this;
}
mt.prototype = mi.prototype = {
  constructor: mt,
  select: Mh,
  selectAll: Dh,
  selectChild: qh,
  selectChildren: jh,
  filter: Uh,
  data: Zh,
  enter: Yh,
  exit: Qh,
  join: tc,
  merge: ec,
  selection: su,
  order: ic,
  sort: rc,
  call: oc,
  nodes: sc,
  node: ac,
  size: lc,
  empty: hc,
  each: cc,
  attr: yc,
  style: bc,
  property: vc,
  classed: Ac,
  text: Oc,
  html: Nc,
  raise: Pc,
  lower: zc,
  append: Wc,
  insert: jc,
  remove: Yc,
  clone: Xc,
  datum: Kc,
  on: eu,
  dispatch: nu,
  [Symbol.iterator]: ou
};
function Tt(t) {
  return typeof t == "string" ? new mt([[document.querySelector(t)]], [document.documentElement]) : new mt([[t]], ra);
}
function Fn(t, e, i) {
  t.prototype = e.prototype = i, i.constructor = t;
}
function na(t, e) {
  var i = Object.create(t.prototype);
  for (var r in e)
    i[r] = e[r];
  return i;
}
function yi() {
}
var si = 0.7, Vi = 1 / si, Ae = "\\s*([+-]?\\d+)\\s*", ai = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", It = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", au = /^#([0-9a-f]{3,8})$/, lu = new RegExp(`^rgb\\(${Ae},${Ae},${Ae}\\)$`), hu = new RegExp(`^rgb\\(${It},${It},${It}\\)$`), cu = new RegExp(`^rgba\\(${Ae},${Ae},${Ae},${ai}\\)$`), uu = new RegExp(`^rgba\\(${It},${It},${It},${ai}\\)$`), fu = new RegExp(`^hsl\\(${ai},${It},${It}\\)$`), du = new RegExp(`^hsla\\(${ai},${It},${It},${ai}\\)$`), Ao = {
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
Fn(yi, li, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Lo,
  // Deprecated! Use color.formatHex.
  formatHex: Lo,
  formatHex8: pu,
  formatHsl: gu,
  formatRgb: Eo,
  toString: Eo
});
function Lo() {
  return this.rgb().formatHex();
}
function pu() {
  return this.rgb().formatHex8();
}
function gu() {
  return oa(this).formatHsl();
}
function Eo() {
  return this.rgb().formatRgb();
}
function li(t) {
  var e, i;
  return t = (t + "").trim().toLowerCase(), (e = au.exec(t)) ? (i = e[1].length, e = parseInt(e[1], 16), i === 6 ? Mo(e) : i === 3 ? new pt(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : i === 8 ? Bi(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : i === 4 ? Bi(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = lu.exec(t)) ? new pt(e[1], e[2], e[3], 1) : (e = hu.exec(t)) ? new pt(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = cu.exec(t)) ? Bi(e[1], e[2], e[3], e[4]) : (e = uu.exec(t)) ? Bi(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = fu.exec(t)) ? Io(e[1], e[2] / 100, e[3] / 100, 1) : (e = du.exec(t)) ? Io(e[1], e[2] / 100, e[3] / 100, e[4]) : Ao.hasOwnProperty(t) ? Mo(Ao[t]) : t === "transparent" ? new pt(NaN, NaN, NaN, 0) : null;
}
function Mo(t) {
  return new pt(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function Bi(t, e, i, r) {
  return r <= 0 && (t = e = i = NaN), new pt(t, e, i, r);
}
function mu(t) {
  return t instanceof yi || (t = li(t)), t ? (t = t.rgb(), new pt(t.r, t.g, t.b, t.opacity)) : new pt();
}
function nn(t, e, i, r) {
  return arguments.length === 1 ? mu(t) : new pt(t, e, i, r ?? 1);
}
function pt(t, e, i, r) {
  this.r = +t, this.g = +e, this.b = +i, this.opacity = +r;
}
Fn(pt, nn, na(yi, {
  brighter(t) {
    return t = t == null ? Vi : Math.pow(Vi, t), new pt(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? si : Math.pow(si, t), new pt(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new pt(fe(this.r), fe(this.g), fe(this.b), Xi(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Oo,
  // Deprecated! Use color.formatHex.
  formatHex: Oo,
  formatHex8: yu,
  formatRgb: $o,
  toString: $o
}));
function Oo() {
  return `#${ue(this.r)}${ue(this.g)}${ue(this.b)}`;
}
function yu() {
  return `#${ue(this.r)}${ue(this.g)}${ue(this.b)}${ue((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function $o() {
  const t = Xi(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${fe(this.r)}, ${fe(this.g)}, ${fe(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function Xi(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function fe(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function ue(t) {
  return t = fe(t), (t < 16 ? "0" : "") + t.toString(16);
}
function Io(t, e, i, r) {
  return r <= 0 ? t = e = i = NaN : i <= 0 || i >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new Lt(t, e, i, r);
}
function oa(t) {
  if (t instanceof Lt)
    return new Lt(t.h, t.s, t.l, t.opacity);
  if (t instanceof yi || (t = li(t)), !t)
    return new Lt();
  if (t instanceof Lt)
    return t;
  t = t.rgb();
  var e = t.r / 255, i = t.g / 255, r = t.b / 255, n = Math.min(e, i, r), o = Math.max(e, i, r), s = NaN, a = o - n, l = (o + n) / 2;
  return a ? (e === o ? s = (i - r) / a + (i < r) * 6 : i === o ? s = (r - e) / a + 2 : s = (e - i) / a + 4, a /= l < 0.5 ? o + n : 2 - o - n, s *= 60) : a = l > 0 && l < 1 ? 0 : s, new Lt(s, a, l, t.opacity);
}
function _u(t, e, i, r) {
  return arguments.length === 1 ? oa(t) : new Lt(t, e, i, r ?? 1);
}
function Lt(t, e, i, r) {
  this.h = +t, this.s = +e, this.l = +i, this.opacity = +r;
}
Fn(Lt, _u, na(yi, {
  brighter(t) {
    return t = t == null ? Vi : Math.pow(Vi, t), new Lt(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? si : Math.pow(si, t), new Lt(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, e = isNaN(t) || isNaN(this.s) ? 0 : this.s, i = this.l, r = i + (i < 0.5 ? i : 1 - i) * e, n = 2 * i - r;
    return new pt(
      qr(t >= 240 ? t - 240 : t + 120, n, r),
      qr(t, n, r),
      qr(t < 120 ? t + 240 : t - 120, n, r),
      this.opacity
    );
  },
  clamp() {
    return new Lt(Do(this.h), Fi(this.s), Fi(this.l), Xi(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = Xi(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${Do(this.h)}, ${Fi(this.s) * 100}%, ${Fi(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function Do(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function Fi(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function qr(t, e, i) {
  return (t < 60 ? e + (i - e) * t / 60 : t < 180 ? i : t < 240 ? e + (i - e) * (240 - t) / 60 : e) * 255;
}
const An = (t) => () => t;
function sa(t, e) {
  return function(i) {
    return t + i * e;
  };
}
function Cu(t, e, i) {
  return t = Math.pow(t, i), e = Math.pow(e, i) - t, i = 1 / i, function(r) {
    return Math.pow(t + r * e, i);
  };
}
function d1(t, e) {
  var i = e - t;
  return i ? sa(t, i > 180 || i < -180 ? i - 360 * Math.round(i / 360) : i) : An(isNaN(t) ? e : t);
}
function xu(t) {
  return (t = +t) == 1 ? aa : function(e, i) {
    return i - e ? Cu(e, i, t) : An(isNaN(e) ? i : e);
  };
}
function aa(t, e) {
  var i = e - t;
  return i ? sa(t, i) : An(isNaN(t) ? e : t);
}
const No = function t(e) {
  var i = xu(e);
  function r(n, o) {
    var s = i((n = nn(n)).r, (o = nn(o)).r), a = i(n.g, o.g), l = i(n.b, o.b), h = aa(n.opacity, o.opacity);
    return function(u) {
      return n.r = s(u), n.g = a(u), n.b = l(u), n.opacity = h(u), n + "";
    };
  }
  return r.gamma = t, r;
}(1);
function ie(t, e) {
  return t = +t, e = +e, function(i) {
    return t * (1 - i) + e * i;
  };
}
var on = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, zr = new RegExp(on.source, "g");
function bu(t) {
  return function() {
    return t;
  };
}
function Tu(t) {
  return function(e) {
    return t(e) + "";
  };
}
function ku(t, e) {
  var i = on.lastIndex = zr.lastIndex = 0, r, n, o, s = -1, a = [], l = [];
  for (t = t + "", e = e + ""; (r = on.exec(t)) && (n = zr.exec(e)); )
    (o = n.index) > i && (o = e.slice(i, o), a[s] ? a[s] += o : a[++s] = o), (r = r[0]) === (n = n[0]) ? a[s] ? a[s] += n : a[++s] = n : (a[++s] = null, l.push({ i: s, x: ie(r, n) })), i = zr.lastIndex;
  return i < e.length && (o = e.slice(i), a[s] ? a[s] += o : a[++s] = o), a.length < 2 ? l[0] ? Tu(l[0].x) : bu(e) : (e = l.length, function(h) {
    for (var u = 0, f; u < e; ++u)
      a[(f = l[u]).i] = f.x(h);
    return a.join("");
  });
}
var Ro = 180 / Math.PI, sn = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function la(t, e, i, r, n, o) {
  var s, a, l;
  return (s = Math.sqrt(t * t + e * e)) && (t /= s, e /= s), (l = t * i + e * r) && (i -= t * l, r -= e * l), (a = Math.sqrt(i * i + r * r)) && (i /= a, r /= a, l /= a), t * r < e * i && (t = -t, e = -e, l = -l, s = -s), {
    translateX: n,
    translateY: o,
    rotate: Math.atan2(e, t) * Ro,
    skewX: Math.atan(l) * Ro,
    scaleX: s,
    scaleY: a
  };
}
var Ai;
function Su(t) {
  const e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return e.isIdentity ? sn : la(e.a, e.b, e.c, e.d, e.e, e.f);
}
function vu(t) {
  return t == null || (Ai || (Ai = document.createElementNS("http://www.w3.org/2000/svg", "g")), Ai.setAttribute("transform", t), !(t = Ai.transform.baseVal.consolidate())) ? sn : (t = t.matrix, la(t.a, t.b, t.c, t.d, t.e, t.f));
}
function ha(t, e, i, r) {
  function n(h) {
    return h.length ? h.pop() + " " : "";
  }
  function o(h, u, f, c, p, m) {
    if (h !== f || u !== c) {
      var k = p.push("translate(", null, e, null, i);
      m.push({ i: k - 4, x: ie(h, f) }, { i: k - 2, x: ie(u, c) });
    } else
      (f || c) && p.push("translate(" + f + e + c + i);
  }
  function s(h, u, f, c) {
    h !== u ? (h - u > 180 ? u += 360 : u - h > 180 && (h += 360), c.push({ i: f.push(n(f) + "rotate(", null, r) - 2, x: ie(h, u) })) : u && f.push(n(f) + "rotate(" + u + r);
  }
  function a(h, u, f, c) {
    h !== u ? c.push({ i: f.push(n(f) + "skewX(", null, r) - 2, x: ie(h, u) }) : u && f.push(n(f) + "skewX(" + u + r);
  }
  function l(h, u, f, c, p, m) {
    if (h !== f || u !== c) {
      var k = p.push(n(p) + "scale(", null, ",", null, ")");
      m.push({ i: k - 4, x: ie(h, f) }, { i: k - 2, x: ie(u, c) });
    } else
      (f !== 1 || c !== 1) && p.push(n(p) + "scale(" + f + "," + c + ")");
  }
  return function(h, u) {
    var f = [], c = [];
    return h = t(h), u = t(u), o(h.translateX, h.translateY, u.translateX, u.translateY, f, c), s(h.rotate, u.rotate, f, c), a(h.skewX, u.skewX, f, c), l(h.scaleX, h.scaleY, u.scaleX, u.scaleY, f, c), h = u = null, function(p) {
      for (var m = -1, k = c.length, O; ++m < k; )
        f[(O = c[m]).i] = O.x(p);
      return f.join("");
    };
  };
}
var wu = ha(Su, "px, ", "px)", "deg)"), Bu = ha(vu, ", ", ")", ")"), Ee = 0, Ze = 0, je = 0, ca = 1e3, Ki, Je, Zi = 0, ge = 0, mr = 0, hi = typeof performance == "object" && performance.now ? performance : Date, ua = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function Ln() {
  return ge || (ua(Fu), ge = hi.now() + mr);
}
function Fu() {
  ge = 0;
}
function Ji() {
  this._call = this._time = this._next = null;
}
Ji.prototype = fa.prototype = {
  constructor: Ji,
  restart: function(t, e, i) {
    if (typeof t != "function")
      throw new TypeError("callback is not a function");
    i = (i == null ? Ln() : +i) + (e == null ? 0 : +e), !this._next && Je !== this && (Je ? Je._next = this : Ki = this, Je = this), this._call = t, this._time = i, an();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, an());
  }
};
function fa(t, e, i) {
  var r = new Ji();
  return r.restart(t, e, i), r;
}
function Au() {
  Ln(), ++Ee;
  for (var t = Ki, e; t; )
    (e = ge - t._time) >= 0 && t._call.call(void 0, e), t = t._next;
  --Ee;
}
function Po() {
  ge = (Zi = hi.now()) + mr, Ee = Ze = 0;
  try {
    Au();
  } finally {
    Ee = 0, Eu(), ge = 0;
  }
}
function Lu() {
  var t = hi.now(), e = t - Zi;
  e > ca && (mr -= e, Zi = t);
}
function Eu() {
  for (var t, e = Ki, i, r = 1 / 0; e; )
    e._call ? (r > e._time && (r = e._time), t = e, e = e._next) : (i = e._next, e._next = null, e = t ? t._next = i : Ki = i);
  Je = t, an(r);
}
function an(t) {
  if (!Ee) {
    Ze && (Ze = clearTimeout(Ze));
    var e = t - ge;
    e > 24 ? (t < 1 / 0 && (Ze = setTimeout(Po, t - hi.now() - mr)), je && (je = clearInterval(je))) : (je || (Zi = hi.now(), je = setInterval(Lu, ca)), Ee = 1, ua(Po));
  }
}
function qo(t, e, i) {
  var r = new Ji();
  return e = e == null ? 0 : +e, r.restart((n) => {
    r.stop(), t(n + e);
  }, e, i), r;
}
var Mu = Us("start", "end", "cancel", "interrupt"), Ou = [], da = 0, zo = 1, ln = 2, Ni = 3, Wo = 4, hn = 5, Ri = 6;
function yr(t, e, i, r, n, o) {
  var s = t.__transition;
  if (!s)
    t.__transition = {};
  else if (i in s)
    return;
  $u(t, i, {
    name: e,
    index: r,
    // For context during callback.
    group: n,
    // For context during callback.
    on: Mu,
    tween: Ou,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: da
  });
}
function En(t, e) {
  var i = Mt(t, e);
  if (i.state > da)
    throw new Error("too late; already scheduled");
  return i;
}
function Pt(t, e) {
  var i = Mt(t, e);
  if (i.state > Ni)
    throw new Error("too late; already running");
  return i;
}
function Mt(t, e) {
  var i = t.__transition;
  if (!i || !(i = i[e]))
    throw new Error("transition not found");
  return i;
}
function $u(t, e, i) {
  var r = t.__transition, n;
  r[e] = i, i.timer = fa(o, 0, i.time);
  function o(h) {
    i.state = zo, i.timer.restart(s, i.delay, i.time), i.delay <= h && s(h - i.delay);
  }
  function s(h) {
    var u, f, c, p;
    if (i.state !== zo)
      return l();
    for (u in r)
      if (p = r[u], p.name === i.name) {
        if (p.state === Ni)
          return qo(s);
        p.state === Wo ? (p.state = Ri, p.timer.stop(), p.on.call("interrupt", t, t.__data__, p.index, p.group), delete r[u]) : +u < e && (p.state = Ri, p.timer.stop(), p.on.call("cancel", t, t.__data__, p.index, p.group), delete r[u]);
      }
    if (qo(function() {
      i.state === Ni && (i.state = Wo, i.timer.restart(a, i.delay, i.time), a(h));
    }), i.state = ln, i.on.call("start", t, t.__data__, i.index, i.group), i.state === ln) {
      for (i.state = Ni, n = new Array(c = i.tween.length), u = 0, f = -1; u < c; ++u)
        (p = i.tween[u].value.call(t, t.__data__, i.index, i.group)) && (n[++f] = p);
      n.length = f + 1;
    }
  }
  function a(h) {
    for (var u = h < i.duration ? i.ease.call(null, h / i.duration) : (i.timer.restart(l), i.state = hn, 1), f = -1, c = n.length; ++f < c; )
      n[f].call(t, u);
    i.state === hn && (i.on.call("end", t, t.__data__, i.index, i.group), l());
  }
  function l() {
    i.state = Ri, i.timer.stop(), delete r[e];
    for (var h in r)
      return;
    delete t.__transition;
  }
}
function Iu(t, e) {
  var i = t.__transition, r, n, o = !0, s;
  if (i) {
    e = e == null ? null : e + "";
    for (s in i) {
      if ((r = i[s]).name !== e) {
        o = !1;
        continue;
      }
      n = r.state > ln && r.state < hn, r.state = Ri, r.timer.stop(), r.on.call(n ? "interrupt" : "cancel", t, t.__data__, r.index, r.group), delete i[s];
    }
    o && delete t.__transition;
  }
}
function Du(t) {
  return this.each(function() {
    Iu(this, t);
  });
}
function Nu(t, e) {
  var i, r;
  return function() {
    var n = Pt(this, t), o = n.tween;
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
function Ru(t, e, i) {
  var r, n;
  if (typeof i != "function")
    throw new Error();
  return function() {
    var o = Pt(this, t), s = o.tween;
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
function Pu(t, e) {
  var i = this._id;
  if (t += "", arguments.length < 2) {
    for (var r = Mt(this.node(), i).tween, n = 0, o = r.length, s; n < o; ++n)
      if ((s = r[n]).name === t)
        return s.value;
    return null;
  }
  return this.each((e == null ? Nu : Ru)(i, t, e));
}
function Mn(t, e, i) {
  var r = t._id;
  return t.each(function() {
    var n = Pt(this, r);
    (n.value || (n.value = {}))[e] = i.apply(this, arguments);
  }), function(n) {
    return Mt(n, r).value[e];
  };
}
function pa(t, e) {
  var i;
  return (typeof e == "number" ? ie : e instanceof li ? No : (i = li(e)) ? (e = i, No) : ku)(t, e);
}
function qu(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function zu(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Wu(t, e, i) {
  var r, n = i + "", o;
  return function() {
    var s = this.getAttribute(t);
    return s === n ? null : s === r ? o : o = e(r = s, i);
  };
}
function Hu(t, e, i) {
  var r, n = i + "", o;
  return function() {
    var s = this.getAttributeNS(t.space, t.local);
    return s === n ? null : s === r ? o : o = e(r = s, i);
  };
}
function ju(t, e, i) {
  var r, n, o;
  return function() {
    var s, a = i(this), l;
    return a == null ? void this.removeAttribute(t) : (s = this.getAttribute(t), l = a + "", s === l ? null : s === r && l === n ? o : (n = l, o = e(r = s, a)));
  };
}
function Uu(t, e, i) {
  var r, n, o;
  return function() {
    var s, a = i(this), l;
    return a == null ? void this.removeAttributeNS(t.space, t.local) : (s = this.getAttributeNS(t.space, t.local), l = a + "", s === l ? null : s === r && l === n ? o : (n = l, o = e(r = s, a)));
  };
}
function Yu(t, e) {
  var i = gr(t), r = i === "transform" ? Bu : pa;
  return this.attrTween(t, typeof e == "function" ? (i.local ? Uu : ju)(i, r, Mn(this, "attr." + t, e)) : e == null ? (i.local ? zu : qu)(i) : (i.local ? Hu : Wu)(i, r, e));
}
function Gu(t, e) {
  return function(i) {
    this.setAttribute(t, e.call(this, i));
  };
}
function Vu(t, e) {
  return function(i) {
    this.setAttributeNS(t.space, t.local, e.call(this, i));
  };
}
function Xu(t, e) {
  var i, r;
  function n() {
    var o = e.apply(this, arguments);
    return o !== r && (i = (r = o) && Vu(t, o)), i;
  }
  return n._value = e, n;
}
function Ku(t, e) {
  var i, r;
  function n() {
    var o = e.apply(this, arguments);
    return o !== r && (i = (r = o) && Gu(t, o)), i;
  }
  return n._value = e, n;
}
function Zu(t, e) {
  var i = "attr." + t;
  if (arguments.length < 2)
    return (i = this.tween(i)) && i._value;
  if (e == null)
    return this.tween(i, null);
  if (typeof e != "function")
    throw new Error();
  var r = gr(t);
  return this.tween(i, (r.local ? Xu : Ku)(r, e));
}
function Ju(t, e) {
  return function() {
    En(this, t).delay = +e.apply(this, arguments);
  };
}
function Qu(t, e) {
  return e = +e, function() {
    En(this, t).delay = e;
  };
}
function tf(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Ju : Qu)(e, t)) : Mt(this.node(), e).delay;
}
function ef(t, e) {
  return function() {
    Pt(this, t).duration = +e.apply(this, arguments);
  };
}
function rf(t, e) {
  return e = +e, function() {
    Pt(this, t).duration = e;
  };
}
function nf(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? ef : rf)(e, t)) : Mt(this.node(), e).duration;
}
function of(t, e) {
  if (typeof e != "function")
    throw new Error();
  return function() {
    Pt(this, t).ease = e;
  };
}
function sf(t) {
  var e = this._id;
  return arguments.length ? this.each(of(e, t)) : Mt(this.node(), e).ease;
}
function af(t, e) {
  return function() {
    var i = e.apply(this, arguments);
    if (typeof i != "function")
      throw new Error();
    Pt(this, t).ease = i;
  };
}
function lf(t) {
  if (typeof t != "function")
    throw new Error();
  return this.each(af(this._id, t));
}
function hf(t) {
  typeof t != "function" && (t = Vs(t));
  for (var e = this._groups, i = e.length, r = new Array(i), n = 0; n < i; ++n)
    for (var o = e[n], s = o.length, a = r[n] = [], l, h = 0; h < s; ++h)
      (l = o[h]) && t.call(l, l.__data__, h, o) && a.push(l);
  return new Kt(r, this._parents, this._name, this._id);
}
function cf(t) {
  if (t._id !== this._id)
    throw new Error();
  for (var e = this._groups, i = t._groups, r = e.length, n = i.length, o = Math.min(r, n), s = new Array(r), a = 0; a < o; ++a)
    for (var l = e[a], h = i[a], u = l.length, f = s[a] = new Array(u), c, p = 0; p < u; ++p)
      (c = l[p] || h[p]) && (f[p] = c);
  for (; a < r; ++a)
    s[a] = e[a];
  return new Kt(s, this._parents, this._name, this._id);
}
function uf(t) {
  return (t + "").trim().split(/^|\s+/).every(function(e) {
    var i = e.indexOf(".");
    return i >= 0 && (e = e.slice(0, i)), !e || e === "start";
  });
}
function ff(t, e, i) {
  var r, n, o = uf(e) ? En : Pt;
  return function() {
    var s = o(this, t), a = s.on;
    a !== r && (n = (r = a).copy()).on(e, i), s.on = n;
  };
}
function df(t, e) {
  var i = this._id;
  return arguments.length < 2 ? Mt(this.node(), i).on.on(t) : this.each(ff(i, t, e));
}
function pf(t) {
  return function() {
    var e = this.parentNode;
    for (var i in this.__transition)
      if (+i !== t)
        return;
    e && e.removeChild(this);
  };
}
function gf() {
  return this.on("end.remove", pf(this._id));
}
function mf(t) {
  var e = this._name, i = this._id;
  typeof t != "function" && (t = wn(t));
  for (var r = this._groups, n = r.length, o = new Array(n), s = 0; s < n; ++s)
    for (var a = r[s], l = a.length, h = o[s] = new Array(l), u, f, c = 0; c < l; ++c)
      (u = a[c]) && (f = t.call(u, u.__data__, c, a)) && ("__data__" in u && (f.__data__ = u.__data__), h[c] = f, yr(h[c], e, i, c, h, Mt(u, i)));
  return new Kt(o, this._parents, e, i);
}
function yf(t) {
  var e = this._name, i = this._id;
  typeof t != "function" && (t = Gs(t));
  for (var r = this._groups, n = r.length, o = [], s = [], a = 0; a < n; ++a)
    for (var l = r[a], h = l.length, u, f = 0; f < h; ++f)
      if (u = l[f]) {
        for (var c = t.call(u, u.__data__, f, l), p, m = Mt(u, i), k = 0, O = c.length; k < O; ++k)
          (p = c[k]) && yr(p, e, i, k, c, m);
        o.push(c), s.push(u);
      }
  return new Kt(o, s, e, i);
}
var _f = mi.prototype.constructor;
function Cf() {
  return new _f(this._groups, this._parents);
}
function xf(t, e) {
  var i, r, n;
  return function() {
    var o = Le(this, t), s = (this.style.removeProperty(t), Le(this, t));
    return o === s ? null : o === i && s === r ? n : n = e(i = o, r = s);
  };
}
function ga(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function bf(t, e, i) {
  var r, n = i + "", o;
  return function() {
    var s = Le(this, t);
    return s === n ? null : s === r ? o : o = e(r = s, i);
  };
}
function Tf(t, e, i) {
  var r, n, o;
  return function() {
    var s = Le(this, t), a = i(this), l = a + "";
    return a == null && (l = a = (this.style.removeProperty(t), Le(this, t))), s === l ? null : s === r && l === n ? o : (n = l, o = e(r = s, a));
  };
}
function kf(t, e) {
  var i, r, n, o = "style." + e, s = "end." + o, a;
  return function() {
    var l = Pt(this, t), h = l.on, u = l.value[o] == null ? a || (a = ga(e)) : void 0;
    (h !== i || n !== u) && (r = (i = h).copy()).on(s, n = u), l.on = r;
  };
}
function Sf(t, e, i) {
  var r = (t += "") == "transform" ? wu : pa;
  return e == null ? this.styleTween(t, xf(t, r)).on("end.style." + t, ga(t)) : typeof e == "function" ? this.styleTween(t, Tf(t, r, Mn(this, "style." + t, e))).each(kf(this._id, t)) : this.styleTween(t, bf(t, r, e), i).on("end.style." + t, null);
}
function vf(t, e, i) {
  return function(r) {
    this.style.setProperty(t, e.call(this, r), i);
  };
}
function wf(t, e, i) {
  var r, n;
  function o() {
    var s = e.apply(this, arguments);
    return s !== n && (r = (n = s) && vf(t, s, i)), r;
  }
  return o._value = e, o;
}
function Bf(t, e, i) {
  var r = "style." + (t += "");
  if (arguments.length < 2)
    return (r = this.tween(r)) && r._value;
  if (e == null)
    return this.tween(r, null);
  if (typeof e != "function")
    throw new Error();
  return this.tween(r, wf(t, e, i ?? ""));
}
function Ff(t) {
  return function() {
    this.textContent = t;
  };
}
function Af(t) {
  return function() {
    var e = t(this);
    this.textContent = e ?? "";
  };
}
function Lf(t) {
  return this.tween("text", typeof t == "function" ? Af(Mn(this, "text", t)) : Ff(t == null ? "" : t + ""));
}
function Ef(t) {
  return function(e) {
    this.textContent = t.call(this, e);
  };
}
function Mf(t) {
  var e, i;
  function r() {
    var n = t.apply(this, arguments);
    return n !== i && (e = (i = n) && Ef(n)), e;
  }
  return r._value = t, r;
}
function Of(t) {
  var e = "text";
  if (arguments.length < 1)
    return (e = this.tween(e)) && e._value;
  if (t == null)
    return this.tween(e, null);
  if (typeof t != "function")
    throw new Error();
  return this.tween(e, Mf(t));
}
function $f() {
  for (var t = this._name, e = this._id, i = ma(), r = this._groups, n = r.length, o = 0; o < n; ++o)
    for (var s = r[o], a = s.length, l, h = 0; h < a; ++h)
      if (l = s[h]) {
        var u = Mt(l, e);
        yr(l, t, i, h, s, {
          time: u.time + u.delay + u.duration,
          delay: 0,
          duration: u.duration,
          ease: u.ease
        });
      }
  return new Kt(r, this._parents, t, i);
}
function If() {
  var t, e, i = this, r = i._id, n = i.size();
  return new Promise(function(o, s) {
    var a = { value: s }, l = { value: function() {
      --n === 0 && o();
    } };
    i.each(function() {
      var h = Pt(this, r), u = h.on;
      u !== t && (e = (t = u).copy(), e._.cancel.push(a), e._.interrupt.push(a), e._.end.push(l)), h.on = e;
    }), n === 0 && o();
  });
}
var Df = 0;
function Kt(t, e, i, r) {
  this._groups = t, this._parents = e, this._name = i, this._id = r;
}
function ma() {
  return ++Df;
}
var Ut = mi.prototype;
Kt.prototype = {
  constructor: Kt,
  select: mf,
  selectAll: yf,
  selectChild: Ut.selectChild,
  selectChildren: Ut.selectChildren,
  filter: hf,
  merge: cf,
  selection: Cf,
  transition: $f,
  call: Ut.call,
  nodes: Ut.nodes,
  node: Ut.node,
  size: Ut.size,
  empty: Ut.empty,
  each: Ut.each,
  on: df,
  attr: Yu,
  attrTween: Zu,
  style: Sf,
  styleTween: Bf,
  text: Lf,
  textTween: Of,
  remove: gf,
  tween: Pu,
  delay: tf,
  duration: nf,
  ease: sf,
  easeVarying: lf,
  end: If,
  [Symbol.iterator]: Ut[Symbol.iterator]
};
function Nf(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var Rf = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: Nf
};
function Pf(t, e) {
  for (var i; !(i = t.__transition) || !(i = i[e]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${e} not found`);
  return i;
}
function qf(t) {
  var e, i;
  t instanceof Kt ? (e = t._id, t = t._name) : (e = ma(), (i = Rf).time = Ln(), t = t == null ? null : t + "");
  for (var r = this._groups, n = r.length, o = 0; o < n; ++o)
    for (var s = r[o], a = s.length, l, h = 0; h < a; ++h)
      (l = s[h]) && yr(l, t, e, h, s, i || Pf(l, e));
  return new Kt(r, this._parents, t, e);
}
mi.prototype.interrupt = Du;
mi.prototype.transition = qf;
const p1 = Math.abs, g1 = Math.atan2, m1 = Math.cos, y1 = Math.max, _1 = Math.min, C1 = Math.sin, x1 = Math.sqrt, Ho = 1e-12, On = Math.PI, jo = On / 2, b1 = 2 * On;
function T1(t) {
  return t > 1 ? 0 : t < -1 ? On : Math.acos(t);
}
function k1(t) {
  return t >= 1 ? jo : t <= -1 ? -jo : Math.asin(t);
}
function ya(t) {
  this._context = t;
}
ya.prototype = {
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
function zf(t) {
  return new ya(t);
}
class _a {
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
function Wf(t) {
  return new _a(t, !0);
}
function Hf(t) {
  return new _a(t, !1);
}
function ne() {
}
function Qi(t, e, i) {
  t._context.bezierCurveTo(
    (2 * t._x0 + t._x1) / 3,
    (2 * t._y0 + t._y1) / 3,
    (t._x0 + 2 * t._x1) / 3,
    (t._y0 + 2 * t._y1) / 3,
    (t._x0 + 4 * t._x1 + e) / 6,
    (t._y0 + 4 * t._y1 + i) / 6
  );
}
function _r(t) {
  this._context = t;
}
_r.prototype = {
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
        Qi(this, this._x1, this._y1);
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
        Qi(this, t, e);
        break;
    }
    this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = e;
  }
};
function jf(t) {
  return new _r(t);
}
function Ca(t) {
  this._context = t;
}
Ca.prototype = {
  areaStart: ne,
  areaEnd: ne,
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
        Qi(this, t, e);
        break;
    }
    this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = e;
  }
};
function Uf(t) {
  return new Ca(t);
}
function xa(t) {
  this._context = t;
}
xa.prototype = {
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
        Qi(this, t, e);
        break;
    }
    this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = e;
  }
};
function Yf(t) {
  return new xa(t);
}
function ba(t, e) {
  this._basis = new _r(t), this._beta = e;
}
ba.prototype = {
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
const Gf = function t(e) {
  function i(r) {
    return e === 1 ? new _r(r) : new ba(r, e);
  }
  return i.beta = function(r) {
    return t(+r);
  }, i;
}(0.85);
function tr(t, e, i) {
  t._context.bezierCurveTo(
    t._x1 + t._k * (t._x2 - t._x0),
    t._y1 + t._k * (t._y2 - t._y0),
    t._x2 + t._k * (t._x1 - e),
    t._y2 + t._k * (t._y1 - i),
    t._x2,
    t._y2
  );
}
function $n(t, e) {
  this._context = t, this._k = (1 - e) / 6;
}
$n.prototype = {
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
        tr(this, this._x1, this._y1);
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
        tr(this, t, e);
        break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = e;
  }
};
const Vf = function t(e) {
  function i(r) {
    return new $n(r, e);
  }
  return i.tension = function(r) {
    return t(+r);
  }, i;
}(0);
function In(t, e) {
  this._context = t, this._k = (1 - e) / 6;
}
In.prototype = {
  areaStart: ne,
  areaEnd: ne,
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
        tr(this, t, e);
        break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = e;
  }
};
const Xf = function t(e) {
  function i(r) {
    return new In(r, e);
  }
  return i.tension = function(r) {
    return t(+r);
  }, i;
}(0);
function Dn(t, e) {
  this._context = t, this._k = (1 - e) / 6;
}
Dn.prototype = {
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
        tr(this, t, e);
        break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = e;
  }
};
const Kf = function t(e) {
  function i(r) {
    return new Dn(r, e);
  }
  return i.tension = function(r) {
    return t(+r);
  }, i;
}(0);
function Nn(t, e, i) {
  var r = t._x1, n = t._y1, o = t._x2, s = t._y2;
  if (t._l01_a > Ho) {
    var a = 2 * t._l01_2a + 3 * t._l01_a * t._l12_a + t._l12_2a, l = 3 * t._l01_a * (t._l01_a + t._l12_a);
    r = (r * a - t._x0 * t._l12_2a + t._x2 * t._l01_2a) / l, n = (n * a - t._y0 * t._l12_2a + t._y2 * t._l01_2a) / l;
  }
  if (t._l23_a > Ho) {
    var h = 2 * t._l23_2a + 3 * t._l23_a * t._l12_a + t._l12_2a, u = 3 * t._l23_a * (t._l23_a + t._l12_a);
    o = (o * h + t._x1 * t._l23_2a - e * t._l12_2a) / u, s = (s * h + t._y1 * t._l23_2a - i * t._l12_2a) / u;
  }
  t._context.bezierCurveTo(r, n, o, s, t._x2, t._y2);
}
function Ta(t, e) {
  this._context = t, this._alpha = e;
}
Ta.prototype = {
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
        Nn(this, t, e);
        break;
    }
    this._l01_a = this._l12_a, this._l12_a = this._l23_a, this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a, this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = e;
  }
};
const Zf = function t(e) {
  function i(r) {
    return e ? new Ta(r, e) : new $n(r, 0);
  }
  return i.alpha = function(r) {
    return t(+r);
  }, i;
}(0.5);
function ka(t, e) {
  this._context = t, this._alpha = e;
}
ka.prototype = {
  areaStart: ne,
  areaEnd: ne,
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
        Nn(this, t, e);
        break;
    }
    this._l01_a = this._l12_a, this._l12_a = this._l23_a, this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a, this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = e;
  }
};
const Jf = function t(e) {
  function i(r) {
    return e ? new ka(r, e) : new In(r, 0);
  }
  return i.alpha = function(r) {
    return t(+r);
  }, i;
}(0.5);
function Sa(t, e) {
  this._context = t, this._alpha = e;
}
Sa.prototype = {
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
        Nn(this, t, e);
        break;
    }
    this._l01_a = this._l12_a, this._l12_a = this._l23_a, this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a, this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = e;
  }
};
const Qf = function t(e) {
  function i(r) {
    return e ? new Sa(r, e) : new Dn(r, 0);
  }
  return i.alpha = function(r) {
    return t(+r);
  }, i;
}(0.5);
function va(t) {
  this._context = t;
}
va.prototype = {
  areaStart: ne,
  areaEnd: ne,
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
function td(t) {
  return new va(t);
}
function Uo(t) {
  return t < 0 ? -1 : 1;
}
function Yo(t, e, i) {
  var r = t._x1 - t._x0, n = e - t._x1, o = (t._y1 - t._y0) / (r || n < 0 && -0), s = (i - t._y1) / (n || r < 0 && -0), a = (o * n + s * r) / (r + n);
  return (Uo(o) + Uo(s)) * Math.min(Math.abs(o), Math.abs(s), 0.5 * Math.abs(a)) || 0;
}
function Go(t, e) {
  var i = t._x1 - t._x0;
  return i ? (3 * (t._y1 - t._y0) / i - e) / 2 : e;
}
function Wr(t, e, i) {
  var r = t._x0, n = t._y0, o = t._x1, s = t._y1, a = (o - r) / 3;
  t._context.bezierCurveTo(r + a, n + a * e, o - a, s - a * i, o, s);
}
function er(t) {
  this._context = t;
}
er.prototype = {
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
        Wr(this, this._t0, Go(this, this._t0));
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
          this._point = 3, Wr(this, Go(this, i = Yo(this, t, e)), i);
          break;
        default:
          Wr(this, this._t0, i = Yo(this, t, e));
          break;
      }
      this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = e, this._t0 = i;
    }
  }
};
function wa(t) {
  this._context = new Ba(t);
}
(wa.prototype = Object.create(er.prototype)).point = function(t, e) {
  er.prototype.point.call(this, e, t);
};
function Ba(t) {
  this._context = t;
}
Ba.prototype = {
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
function ed(t) {
  return new er(t);
}
function id(t) {
  return new wa(t);
}
function Fa(t) {
  this._context = t;
}
Fa.prototype = {
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
        for (var r = Vo(t), n = Vo(e), o = 0, s = 1; s < i; ++o, ++s)
          this._context.bezierCurveTo(r[0][o], n[0][o], r[1][o], n[1][o], t[s], e[s]);
    (this._line || this._line !== 0 && i === 1) && this._context.closePath(), this._line = 1 - this._line, this._x = this._y = null;
  },
  point: function(t, e) {
    this._x.push(+t), this._y.push(+e);
  }
};
function Vo(t) {
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
function rd(t) {
  return new Fa(t);
}
function Cr(t, e) {
  this._context = t, this._t = e;
}
Cr.prototype = {
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
function nd(t) {
  return new Cr(t, 0.5);
}
function od(t) {
  return new Cr(t, 0);
}
function sd(t) {
  return new Cr(t, 1);
}
function Qe(t, e, i) {
  this.k = t, this.x = e, this.y = i;
}
Qe.prototype = {
  constructor: Qe,
  scale: function(t) {
    return t === 1 ? this : new Qe(this.k * t, this.x, this.y);
  },
  translate: function(t, e) {
    return t === 0 & e === 0 ? this : new Qe(this.k, this.x + this.k * t, this.y + this.k * e);
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
Qe.prototype;
/*! @license DOMPurify 3.1.6 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.1.6/LICENSE */
const {
  entries: Aa,
  setPrototypeOf: Xo,
  isFrozen: ad,
  getPrototypeOf: ld,
  getOwnPropertyDescriptor: hd
} = Object;
let {
  freeze: ut,
  seal: St,
  create: La
} = Object, {
  apply: cn,
  construct: un
} = typeof Reflect < "u" && Reflect;
ut || (ut = function(e) {
  return e;
});
St || (St = function(e) {
  return e;
});
cn || (cn = function(e, i, r) {
  return e.apply(i, r);
});
un || (un = function(e, i) {
  return new e(...i);
});
const Li = yt(Array.prototype.forEach), Ko = yt(Array.prototype.pop), Ue = yt(Array.prototype.push), Pi = yt(String.prototype.toLowerCase), Hr = yt(String.prototype.toString), Zo = yt(String.prototype.match), Ye = yt(String.prototype.replace), cd = yt(String.prototype.indexOf), ud = yt(String.prototype.trim), At = yt(Object.prototype.hasOwnProperty), lt = yt(RegExp.prototype.test), Ge = fd(TypeError);
function yt(t) {
  return function(e) {
    for (var i = arguments.length, r = new Array(i > 1 ? i - 1 : 0), n = 1; n < i; n++)
      r[n - 1] = arguments[n];
    return cn(t, e, r);
  };
}
function fd(t) {
  return function() {
    for (var e = arguments.length, i = new Array(e), r = 0; r < e; r++)
      i[r] = arguments[r];
    return un(t, i);
  };
}
function P(t, e) {
  let i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Pi;
  Xo && Xo(t, null);
  let r = e.length;
  for (; r--; ) {
    let n = e[r];
    if (typeof n == "string") {
      const o = i(n);
      o !== n && (ad(e) || (e[r] = o), n = o);
    }
    t[n] = !0;
  }
  return t;
}
function dd(t) {
  for (let e = 0; e < t.length; e++)
    At(t, e) || (t[e] = null);
  return t;
}
function he(t) {
  const e = La(null);
  for (const [i, r] of Aa(t))
    At(t, i) && (Array.isArray(r) ? e[i] = dd(r) : r && typeof r == "object" && r.constructor === Object ? e[i] = he(r) : e[i] = r);
  return e;
}
function Ve(t, e) {
  for (; t !== null; ) {
    const r = hd(t, e);
    if (r) {
      if (r.get)
        return yt(r.get);
      if (typeof r.value == "function")
        return yt(r.value);
    }
    t = ld(t);
  }
  function i() {
    return null;
  }
  return i;
}
const Jo = ut(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "section", "select", "shadow", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), jr = ut(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), Ur = ut(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), pd = ut(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), Yr = ut(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), gd = ut(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), Qo = ut(["#text"]), ts = ut(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]), Gr = ut(["accent-height", "accumulate", "additive", "alignment-baseline", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), es = ut(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), Ei = ut(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), md = St(/\{\{[\w\W]*|[\w\W]*\}\}/gm), yd = St(/<%[\w\W]*|[\w\W]*%>/gm), _d = St(/\${[\w\W]*}/gm), Cd = St(/^data-[\-\w.\u00B7-\uFFFF]/), xd = St(/^aria-[\-\w]+$/), Ea = St(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
), bd = St(/^(?:\w+script|data):/i), Td = St(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
), Ma = St(/^html$/i), kd = St(/^[a-z][.\w]*(-[.\w]+)+$/i);
var is = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  MUSTACHE_EXPR: md,
  ERB_EXPR: yd,
  TMPLIT_EXPR: _d,
  DATA_ATTR: Cd,
  ARIA_ATTR: xd,
  IS_ALLOWED_URI: Ea,
  IS_SCRIPT_OR_DATA: bd,
  ATTR_WHITESPACE: Td,
  DOCTYPE_NAME: Ma,
  CUSTOM_ELEMENT: kd
});
const Xe = {
  element: 1,
  attribute: 2,
  text: 3,
  cdataSection: 4,
  entityReference: 5,
  // Deprecated
  entityNode: 6,
  // Deprecated
  progressingInstruction: 7,
  comment: 8,
  document: 9,
  documentType: 10,
  documentFragment: 11,
  notation: 12
  // Deprecated
}, Sd = function() {
  return typeof window > "u" ? null : window;
}, vd = function(e, i) {
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
function Oa() {
  let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : Sd();
  const e = (w) => Oa(w);
  if (e.version = "3.1.6", e.removed = [], !t || !t.document || t.document.nodeType !== Xe.document)
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
    trustedTypes: p
  } = t, m = l.prototype, k = Ve(m, "cloneNode"), O = Ve(m, "remove"), q = Ve(m, "nextSibling"), T = Ve(m, "childNodes"), U = Ve(m, "parentNode");
  if (typeof s == "function") {
    const w = i.createElement("template");
    w.content && w.content.ownerDocument && (i = w.content.ownerDocument);
  }
  let W, G = "";
  const {
    implementation: V,
    createNodeIterator: H,
    createDocumentFragment: ae,
    getElementsByTagName: Jt
  } = i, {
    importNode: j
  } = r;
  let N = {};
  e.isSupported = typeof Aa == "function" && typeof U == "function" && V && V.createHTMLDocument !== void 0;
  const {
    MUSTACHE_EXPR: _t,
    ERB_EXPR: zt,
    TMPLIT_EXPR: M,
    DATA_ATTR: b,
    ARIA_ATTR: C,
    IS_SCRIPT_OR_DATA: v,
    ATTR_WHITESPACE: x,
    CUSTOM_ELEMENT: A
  } = is;
  let {
    IS_ALLOWED_URI: D
  } = is, I = null;
  const K = P({}, [...Jo, ...jr, ...Ur, ...Yr, ...Qo]);
  let R = null;
  const Q = P({}, [...ts, ...Gr, ...es, ...Ei]);
  let z = Object.seal(La(null, {
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
  })), Ct = null, wt = null, Qt = !0, Bt = !0, et = !1, Ft = !0, xt = !1, te = !0, le = !1, Or = !1, $r = !1, be = !1, Ti = !1, ki = !1, oo = !0, so = !1;
  const dh = "user-content-";
  let Ir = !0, ze = !1, Te = {}, ke = null;
  const ao = P({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
  let lo = null;
  const ho = P({}, ["audio", "video", "img", "source", "image", "track"]);
  let Dr = null;
  const co = P({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), Si = "http://www.w3.org/1998/Math/MathML", vi = "http://www.w3.org/2000/svg", Wt = "http://www.w3.org/1999/xhtml";
  let Se = Wt, Nr = !1, Rr = null;
  const ph = P({}, [Si, vi, Wt], Hr);
  let We = null;
  const gh = ["application/xhtml+xml", "text/html"], mh = "text/html";
  let tt = null, ve = null;
  const yh = i.createElement("form"), uo = function(d) {
    return d instanceof RegExp || d instanceof Function;
  }, Pr = function() {
    let d = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (!(ve && ve === d)) {
      if ((!d || typeof d != "object") && (d = {}), d = he(d), We = // eslint-disable-next-line unicorn/prefer-includes
      gh.indexOf(d.PARSER_MEDIA_TYPE) === -1 ? mh : d.PARSER_MEDIA_TYPE, tt = We === "application/xhtml+xml" ? Hr : Pi, I = At(d, "ALLOWED_TAGS") ? P({}, d.ALLOWED_TAGS, tt) : K, R = At(d, "ALLOWED_ATTR") ? P({}, d.ALLOWED_ATTR, tt) : Q, Rr = At(d, "ALLOWED_NAMESPACES") ? P({}, d.ALLOWED_NAMESPACES, Hr) : ph, Dr = At(d, "ADD_URI_SAFE_ATTR") ? P(
        he(co),
        // eslint-disable-line indent
        d.ADD_URI_SAFE_ATTR,
        // eslint-disable-line indent
        tt
        // eslint-disable-line indent
      ) : co, lo = At(d, "ADD_DATA_URI_TAGS") ? P(
        he(ho),
        // eslint-disable-line indent
        d.ADD_DATA_URI_TAGS,
        // eslint-disable-line indent
        tt
        // eslint-disable-line indent
      ) : ho, ke = At(d, "FORBID_CONTENTS") ? P({}, d.FORBID_CONTENTS, tt) : ao, Ct = At(d, "FORBID_TAGS") ? P({}, d.FORBID_TAGS, tt) : {}, wt = At(d, "FORBID_ATTR") ? P({}, d.FORBID_ATTR, tt) : {}, Te = At(d, "USE_PROFILES") ? d.USE_PROFILES : !1, Qt = d.ALLOW_ARIA_ATTR !== !1, Bt = d.ALLOW_DATA_ATTR !== !1, et = d.ALLOW_UNKNOWN_PROTOCOLS || !1, Ft = d.ALLOW_SELF_CLOSE_IN_ATTR !== !1, xt = d.SAFE_FOR_TEMPLATES || !1, te = d.SAFE_FOR_XML !== !1, le = d.WHOLE_DOCUMENT || !1, be = d.RETURN_DOM || !1, Ti = d.RETURN_DOM_FRAGMENT || !1, ki = d.RETURN_TRUSTED_TYPE || !1, $r = d.FORCE_BODY || !1, oo = d.SANITIZE_DOM !== !1, so = d.SANITIZE_NAMED_PROPS || !1, Ir = d.KEEP_CONTENT !== !1, ze = d.IN_PLACE || !1, D = d.ALLOWED_URI_REGEXP || Ea, Se = d.NAMESPACE || Wt, z = d.CUSTOM_ELEMENT_HANDLING || {}, d.CUSTOM_ELEMENT_HANDLING && uo(d.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (z.tagNameCheck = d.CUSTOM_ELEMENT_HANDLING.tagNameCheck), d.CUSTOM_ELEMENT_HANDLING && uo(d.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (z.attributeNameCheck = d.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), d.CUSTOM_ELEMENT_HANDLING && typeof d.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements == "boolean" && (z.allowCustomizedBuiltInElements = d.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), xt && (Bt = !1), Ti && (be = !0), Te && (I = P({}, Qo), R = [], Te.html === !0 && (P(I, Jo), P(R, ts)), Te.svg === !0 && (P(I, jr), P(R, Gr), P(R, Ei)), Te.svgFilters === !0 && (P(I, Ur), P(R, Gr), P(R, Ei)), Te.mathMl === !0 && (P(I, Yr), P(R, es), P(R, Ei))), d.ADD_TAGS && (I === K && (I = he(I)), P(I, d.ADD_TAGS, tt)), d.ADD_ATTR && (R === Q && (R = he(R)), P(R, d.ADD_ATTR, tt)), d.ADD_URI_SAFE_ATTR && P(Dr, d.ADD_URI_SAFE_ATTR, tt), d.FORBID_CONTENTS && (ke === ao && (ke = he(ke)), P(ke, d.FORBID_CONTENTS, tt)), Ir && (I["#text"] = !0), le && P(I, ["html", "head", "body"]), I.table && (P(I, ["tbody"]), delete Ct.tbody), d.TRUSTED_TYPES_POLICY) {
        if (typeof d.TRUSTED_TYPES_POLICY.createHTML != "function")
          throw Ge('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
        if (typeof d.TRUSTED_TYPES_POLICY.createScriptURL != "function")
          throw Ge('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
        W = d.TRUSTED_TYPES_POLICY, G = W.createHTML("");
      } else
        W === void 0 && (W = vd(p, n)), W !== null && typeof G == "string" && (G = W.createHTML(""));
      ut && ut(d), ve = d;
    }
  }, fo = P({}, ["mi", "mo", "mn", "ms", "mtext"]), po = P({}, ["foreignobject", "annotation-xml"]), _h = P({}, ["title", "style", "font", "a", "script"]), go = P({}, [...jr, ...Ur, ...pd]), mo = P({}, [...Yr, ...gd]), Ch = function(d) {
    let y = U(d);
    (!y || !y.tagName) && (y = {
      namespaceURI: Se,
      tagName: "template"
    });
    const S = Pi(d.tagName), Y = Pi(y.tagName);
    return Rr[d.namespaceURI] ? d.namespaceURI === vi ? y.namespaceURI === Wt ? S === "svg" : y.namespaceURI === Si ? S === "svg" && (Y === "annotation-xml" || fo[Y]) : !!go[S] : d.namespaceURI === Si ? y.namespaceURI === Wt ? S === "math" : y.namespaceURI === vi ? S === "math" && po[Y] : !!mo[S] : d.namespaceURI === Wt ? y.namespaceURI === vi && !po[Y] || y.namespaceURI === Si && !fo[Y] ? !1 : !mo[S] && (_h[S] || !go[S]) : !!(We === "application/xhtml+xml" && Rr[d.namespaceURI]) : !1;
  }, Ot = function(d) {
    Ue(e.removed, {
      element: d
    });
    try {
      U(d).removeChild(d);
    } catch {
      O(d);
    }
  }, wi = function(d, y) {
    try {
      Ue(e.removed, {
        attribute: y.getAttributeNode(d),
        from: y
      });
    } catch {
      Ue(e.removed, {
        attribute: null,
        from: y
      });
    }
    if (y.removeAttribute(d), d === "is" && !R[d])
      if (be || Ti)
        try {
          Ot(y);
        } catch {
        }
      else
        try {
          y.setAttribute(d, "");
        } catch {
        }
  }, yo = function(d) {
    let y = null, S = null;
    if ($r)
      d = "<remove></remove>" + d;
    else {
      const it = Zo(d, /^[\r\n\t ]+/);
      S = it && it[0];
    }
    We === "application/xhtml+xml" && Se === Wt && (d = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + d + "</body></html>");
    const Y = W ? W.createHTML(d) : d;
    if (Se === Wt)
      try {
        y = new c().parseFromString(Y, We);
      } catch {
      }
    if (!y || !y.documentElement) {
      y = V.createDocument(Se, "template", null);
      try {
        y.documentElement.innerHTML = Nr ? G : Y;
      } catch {
      }
    }
    const rt = y.body || y.documentElement;
    return d && S && rt.insertBefore(i.createTextNode(S), rt.childNodes[0] || null), Se === Wt ? Jt.call(y, le ? "html" : "body")[0] : le ? y.documentElement : rt;
  }, _o = function(d) {
    return H.call(
      d.ownerDocument || d,
      d,
      // eslint-disable-next-line no-bitwise
      h.SHOW_ELEMENT | h.SHOW_COMMENT | h.SHOW_TEXT | h.SHOW_PROCESSING_INSTRUCTION | h.SHOW_CDATA_SECTION,
      null
    );
  }, Co = function(d) {
    return d instanceof f && (typeof d.nodeName != "string" || typeof d.textContent != "string" || typeof d.removeChild != "function" || !(d.attributes instanceof u) || typeof d.removeAttribute != "function" || typeof d.setAttribute != "function" || typeof d.namespaceURI != "string" || typeof d.insertBefore != "function" || typeof d.hasChildNodes != "function");
  }, xo = function(d) {
    return typeof a == "function" && d instanceof a;
  }, Ht = function(d, y, S) {
    N[d] && Li(N[d], (Y) => {
      Y.call(e, y, S, ve);
    });
  }, bo = function(d) {
    let y = null;
    if (Ht("beforeSanitizeElements", d, null), Co(d))
      return Ot(d), !0;
    const S = tt(d.nodeName);
    if (Ht("uponSanitizeElement", d, {
      tagName: S,
      allowedTags: I
    }), d.hasChildNodes() && !xo(d.firstElementChild) && lt(/<[/\w]/g, d.innerHTML) && lt(/<[/\w]/g, d.textContent) || d.nodeType === Xe.progressingInstruction || te && d.nodeType === Xe.comment && lt(/<[/\w]/g, d.data))
      return Ot(d), !0;
    if (!I[S] || Ct[S]) {
      if (!Ct[S] && ko(S) && (z.tagNameCheck instanceof RegExp && lt(z.tagNameCheck, S) || z.tagNameCheck instanceof Function && z.tagNameCheck(S)))
        return !1;
      if (Ir && !ke[S]) {
        const Y = U(d) || d.parentNode, rt = T(d) || d.childNodes;
        if (rt && Y) {
          const it = rt.length;
          for (let ft = it - 1; ft >= 0; --ft) {
            const $t = k(rt[ft], !0);
            $t.__removalCount = (d.__removalCount || 0) + 1, Y.insertBefore($t, q(d));
          }
        }
      }
      return Ot(d), !0;
    }
    return d instanceof l && !Ch(d) || (S === "noscript" || S === "noembed" || S === "noframes") && lt(/<\/no(script|embed|frames)/i, d.innerHTML) ? (Ot(d), !0) : (xt && d.nodeType === Xe.text && (y = d.textContent, Li([_t, zt, M], (Y) => {
      y = Ye(y, Y, " ");
    }), d.textContent !== y && (Ue(e.removed, {
      element: d.cloneNode()
    }), d.textContent = y)), Ht("afterSanitizeElements", d, null), !1);
  }, To = function(d, y, S) {
    if (oo && (y === "id" || y === "name") && (S in i || S in yh))
      return !1;
    if (!(Bt && !wt[y] && lt(b, y))) {
      if (!(Qt && lt(C, y))) {
        if (!R[y] || wt[y]) {
          if (
            // First condition does a very basic check if a) it's basically a valid custom element tagname AND
            // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
            // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
            !(ko(d) && (z.tagNameCheck instanceof RegExp && lt(z.tagNameCheck, d) || z.tagNameCheck instanceof Function && z.tagNameCheck(d)) && (z.attributeNameCheck instanceof RegExp && lt(z.attributeNameCheck, y) || z.attributeNameCheck instanceof Function && z.attributeNameCheck(y)) || // Alternative, second condition checks if it's an `is`-attribute, AND
            // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
            y === "is" && z.allowCustomizedBuiltInElements && (z.tagNameCheck instanceof RegExp && lt(z.tagNameCheck, S) || z.tagNameCheck instanceof Function && z.tagNameCheck(S)))
          )
            return !1;
        } else if (!Dr[y]) {
          if (!lt(D, Ye(S, x, ""))) {
            if (!((y === "src" || y === "xlink:href" || y === "href") && d !== "script" && cd(S, "data:") === 0 && lo[d])) {
              if (!(et && !lt(v, Ye(S, x, "")))) {
                if (S)
                  return !1;
              }
            }
          }
        }
      }
    }
    return !0;
  }, ko = function(d) {
    return d !== "annotation-xml" && Zo(d, A);
  }, So = function(d) {
    Ht("beforeSanitizeAttributes", d, null);
    const {
      attributes: y
    } = d;
    if (!y)
      return;
    const S = {
      attrName: "",
      attrValue: "",
      keepAttr: !0,
      allowedAttributes: R
    };
    let Y = y.length;
    for (; Y--; ) {
      const rt = y[Y], {
        name: it,
        namespaceURI: ft,
        value: $t
      } = rt, He = tt(it);
      let at = it === "value" ? $t : ud($t);
      if (S.attrName = He, S.attrValue = at, S.keepAttr = !0, S.forceKeepAttr = void 0, Ht("uponSanitizeAttribute", d, S), at = S.attrValue, te && lt(/((--!?|])>)|<\/(style|title)/i, at)) {
        wi(it, d);
        continue;
      }
      if (S.forceKeepAttr || (wi(it, d), !S.keepAttr))
        continue;
      if (!Ft && lt(/\/>/i, at)) {
        wi(it, d);
        continue;
      }
      xt && Li([_t, zt, M], (wo) => {
        at = Ye(at, wo, " ");
      });
      const vo = tt(d.nodeName);
      if (To(vo, He, at)) {
        if (so && (He === "id" || He === "name") && (wi(it, d), at = dh + at), W && typeof p == "object" && typeof p.getAttributeType == "function" && !ft)
          switch (p.getAttributeType(vo, He)) {
            case "TrustedHTML": {
              at = W.createHTML(at);
              break;
            }
            case "TrustedScriptURL": {
              at = W.createScriptURL(at);
              break;
            }
          }
        try {
          ft ? d.setAttributeNS(ft, it, at) : d.setAttribute(it, at), Co(d) ? Ot(d) : Ko(e.removed);
        } catch {
        }
      }
    }
    Ht("afterSanitizeAttributes", d, null);
  }, xh = function w(d) {
    let y = null;
    const S = _o(d);
    for (Ht("beforeSanitizeShadowDOM", d, null); y = S.nextNode(); )
      Ht("uponSanitizeShadowNode", y, null), !bo(y) && (y.content instanceof o && w(y.content), So(y));
    Ht("afterSanitizeShadowDOM", d, null);
  };
  return e.sanitize = function(w) {
    let d = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, y = null, S = null, Y = null, rt = null;
    if (Nr = !w, Nr && (w = "<!-->"), typeof w != "string" && !xo(w))
      if (typeof w.toString == "function") {
        if (w = w.toString(), typeof w != "string")
          throw Ge("dirty is not a string, aborting");
      } else
        throw Ge("toString is not a function");
    if (!e.isSupported)
      return w;
    if (Or || Pr(d), e.removed = [], typeof w == "string" && (ze = !1), ze) {
      if (w.nodeName) {
        const $t = tt(w.nodeName);
        if (!I[$t] || Ct[$t])
          throw Ge("root node is forbidden and cannot be sanitized in-place");
      }
    } else if (w instanceof a)
      y = yo("<!---->"), S = y.ownerDocument.importNode(w, !0), S.nodeType === Xe.element && S.nodeName === "BODY" || S.nodeName === "HTML" ? y = S : y.appendChild(S);
    else {
      if (!be && !xt && !le && // eslint-disable-next-line unicorn/prefer-includes
      w.indexOf("<") === -1)
        return W && ki ? W.createHTML(w) : w;
      if (y = yo(w), !y)
        return be ? null : ki ? G : "";
    }
    y && $r && Ot(y.firstChild);
    const it = _o(ze ? w : y);
    for (; Y = it.nextNode(); )
      bo(Y) || (Y.content instanceof o && xh(Y.content), So(Y));
    if (ze)
      return w;
    if (be) {
      if (Ti)
        for (rt = ae.call(y.ownerDocument); y.firstChild; )
          rt.appendChild(y.firstChild);
      else
        rt = y;
      return (R.shadowroot || R.shadowrootmode) && (rt = j.call(r, rt, !0)), rt;
    }
    let ft = le ? y.outerHTML : y.innerHTML;
    return le && I["!doctype"] && y.ownerDocument && y.ownerDocument.doctype && y.ownerDocument.doctype.name && lt(Ma, y.ownerDocument.doctype.name) && (ft = "<!DOCTYPE " + y.ownerDocument.doctype.name + `>
` + ft), xt && Li([_t, zt, M], ($t) => {
      ft = Ye(ft, $t, " ");
    }), W && ki ? W.createHTML(ft) : ft;
  }, e.setConfig = function() {
    let w = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    Pr(w), Or = !0;
  }, e.clearConfig = function() {
    ve = null, Or = !1;
  }, e.isValidAttribute = function(w, d, y) {
    ve || Pr({});
    const S = tt(w), Y = tt(d);
    return To(S, Y, y);
  }, e.addHook = function(w, d) {
    typeof d == "function" && (N[w] = N[w] || [], Ue(N[w], d));
  }, e.removeHook = function(w) {
    if (N[w])
      return Ko(N[w]);
  }, e.removeHooks = function(w) {
    N[w] && (N[w] = []);
  }, e.removeAllHooks = function() {
    N = {};
  }, e;
}
var Me = Oa();
const _i = /<br\s*\/?>/gi, wd = (t) => t ? Ia(t).replace(/\\n/g, "#br#").split("#br#") : [""], Bd = (() => {
  let t = !1;
  return () => {
    t || (Fd(), t = !0);
  };
})();
function Fd() {
  const t = "data-temp-href-target";
  Me.addHook("beforeSanitizeAttributes", (e) => {
    e.tagName === "A" && e.hasAttribute("target") && e.setAttribute(t, e.getAttribute("target") || "");
  }), Me.addHook("afterSanitizeAttributes", (e) => {
    e.tagName === "A" && e.hasAttribute(t) && (e.setAttribute("target", e.getAttribute(t) || ""), e.removeAttribute(t), e.getAttribute("target") === "_blank" && e.setAttribute("rel", "noopener"));
  });
}
const $a = (t) => (Bd(), Me.sanitize(t)), rs = (t, e) => {
  var i;
  if (((i = e.flowchart) == null ? void 0 : i.htmlLabels) !== !1) {
    const r = e.securityLevel;
    r === "antiscript" || r === "strict" ? t = $a(t) : r !== "loose" && (t = Ia(t), t = t.replace(/</g, "&lt;").replace(/>/g, "&gt;"), t = t.replace(/=/g, "&equals;"), t = Md(t));
  }
  return t;
}, ci = (t, e) => t && (e.dompurifyConfig ? t = Me.sanitize(rs(t, e), e.dompurifyConfig).toString() : t = Me.sanitize(rs(t, e), {
  FORBID_TAGS: ["style"]
}).toString(), t), Ad = (t, e) => typeof t == "string" ? ci(t, e) : t.flat().map((i) => ci(i, e)), Ld = (t) => _i.test(t), Ed = (t) => t.split(_i), Md = (t) => t.replace(/#br#/g, "<br/>"), Ia = (t) => t.replace(_i, "#br#"), Od = (t) => {
  let e = "";
  return t && (e = window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.search, e = e.replaceAll(/\(/g, "\\("), e = e.replaceAll(/\)/g, "\\)")), e;
}, Da = (t) => !(t === !1 || ["false", "null", "0"].includes(String(t).trim().toLowerCase())), $d = function(...t) {
  const e = t.filter((i) => !isNaN(i));
  return Math.max(...e);
}, Id = function(...t) {
  const e = t.filter((i) => !isNaN(i));
  return Math.min(...e);
}, S1 = function(t) {
  const e = t.split(/(,)/), i = [];
  for (let r = 0; r < e.length; r++) {
    let n = e[r];
    if (n === "," && r > 0 && r + 1 < e.length) {
      const o = e[r - 1], s = e[r + 1];
      Dd(o, s) && (n = o + "," + s, r++, i.pop());
    }
    i.push(Nd(n));
  }
  return i.join("");
}, fn = (t, e) => Math.max(0, t.split(e).length - 1), Dd = (t, e) => {
  const i = fn(t, "~"), r = fn(e, "~");
  return i === 1 && r === 1;
}, Nd = (t) => {
  const e = fn(t, "~");
  let i = !1;
  if (e <= 1)
    return t;
  e % 2 !== 0 && t.startsWith("~") && (t = t.substring(1), i = !0);
  const r = [...t];
  let n = r.indexOf("~"), o = r.lastIndexOf("~");
  for (; n !== -1 && o !== -1 && n !== o; )
    r[n] = "<", r[o] = ">", n = r.indexOf("~"), o = r.lastIndexOf("~");
  return i && r.unshift("~"), r.join("");
}, ns = () => window.MathMLElement !== void 0, dn = /\$\$(.*)\$\$/g, os = (t) => {
  var e;
  return (((e = t.match(dn)) == null ? void 0 : e.length) ?? 0) > 0;
}, v1 = async (t, e) => {
  t = await Rd(t, e);
  const i = document.createElement("div");
  i.innerHTML = t, i.id = "katex-temp", i.style.visibility = "hidden", i.style.position = "absolute", i.style.top = "0";
  const r = document.querySelector("body");
  r == null || r.insertAdjacentElement("beforeend", i);
  const n = { width: i.clientWidth, height: i.clientHeight };
  return i.remove(), n;
}, Rd = async (t, e) => {
  if (!os(t))
    return t;
  if (!ns() && !e.legacyMathML)
    return t.replace(dn, "MathML is unsupported in this environment.");
  const { default: i } = await import("./katex-fa3848e8.js");
  return t.split(_i).map(
    (r) => os(r) ? `
            <div style="display: flex; align-items: center; justify-content: center; white-space: nowrap;">
              ${r}
            </div>
          ` : `<div>${r}</div>`
  ).join("").replace(
    dn,
    (r, n) => i.renderToString(n, {
      throwOnError: !0,
      displayMode: !0,
      output: ns() ? "mathml" : "htmlAndMathml"
    }).replace(/\n/g, " ").replace(/<annotation.*<\/annotation>/g, "")
  );
}, Rn = {
  getRows: wd,
  sanitizeText: ci,
  sanitizeTextOrArray: Ad,
  hasBreaks: Ld,
  splitBreaks: Ed,
  lineBreakRegex: _i,
  removeScript: $a,
  getUrl: Od,
  evaluate: Da,
  getMax: $d,
  getMin: Id
}, qi = {
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
        return qi.hue2rgb(o, n, t + 1 / 3) * 255;
      case "g":
        return qi.hue2rgb(o, n, t) * 255;
      case "b":
        return qi.hue2rgb(o, n, t - 1 / 3) * 255;
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
}, Pd = qi, qd = {
  /* API */
  clamp: (t, e, i) => e > i ? Math.min(e, Math.max(i, t)) : Math.min(i, Math.max(e, t)),
  round: (t) => Math.round(t * 1e10) / 1e10
}, zd = qd, Wd = {
  /* API */
  dec2hex: (t) => {
    const e = Math.round(t).toString(16);
    return e.length > 1 ? e : `0${e}`;
  }
}, Hd = Wd, jd = {
  channel: Pd,
  lang: zd,
  unit: Hd
}, $ = jd, ee = {};
for (let t = 0; t <= 255; t++)
  ee[t] = $.unit.dec2hex(t);
const nt = {
  ALL: 0,
  RGB: 1,
  HSL: 2
};
class Ud {
  constructor() {
    this.type = nt.ALL;
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
    this.type = nt.ALL;
  }
  is(e) {
    return this.type === e;
  }
}
const Yd = Ud;
class Gd {
  /* CONSTRUCTOR */
  constructor(e, i) {
    this.color = i, this.changed = !1, this.data = e, this.type = new Yd();
  }
  /* API */
  set(e, i) {
    return this.color = i, this.changed = !1, this.data = e, this.type.type = nt.ALL, this;
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
    return !this.type.is(nt.HSL) && i !== void 0 ? i : (this._ensureHSL(), $.channel.hsl2rgb(e, "r"));
  }
  get g() {
    const e = this.data, i = e.g;
    return !this.type.is(nt.HSL) && i !== void 0 ? i : (this._ensureHSL(), $.channel.hsl2rgb(e, "g"));
  }
  get b() {
    const e = this.data, i = e.b;
    return !this.type.is(nt.HSL) && i !== void 0 ? i : (this._ensureHSL(), $.channel.hsl2rgb(e, "b"));
  }
  get h() {
    const e = this.data, i = e.h;
    return !this.type.is(nt.RGB) && i !== void 0 ? i : (this._ensureRGB(), $.channel.rgb2hsl(e, "h"));
  }
  get s() {
    const e = this.data, i = e.s;
    return !this.type.is(nt.RGB) && i !== void 0 ? i : (this._ensureRGB(), $.channel.rgb2hsl(e, "s"));
  }
  get l() {
    const e = this.data, i = e.l;
    return !this.type.is(nt.RGB) && i !== void 0 ? i : (this._ensureRGB(), $.channel.rgb2hsl(e, "l"));
  }
  get a() {
    return this.data.a;
  }
  /* SETTERS */
  set r(e) {
    this.type.set(nt.RGB), this.changed = !0, this.data.r = e;
  }
  set g(e) {
    this.type.set(nt.RGB), this.changed = !0, this.data.g = e;
  }
  set b(e) {
    this.type.set(nt.RGB), this.changed = !0, this.data.b = e;
  }
  set h(e) {
    this.type.set(nt.HSL), this.changed = !0, this.data.h = e;
  }
  set s(e) {
    this.type.set(nt.HSL), this.changed = !0, this.data.s = e;
  }
  set l(e) {
    this.type.set(nt.HSL), this.changed = !0, this.data.l = e;
  }
  set a(e) {
    this.changed = !0, this.data.a = e;
  }
}
const Vd = Gd, Xd = new Vd({ r: 0, g: 0, b: 0, a: 0 }, "transparent"), xr = Xd, Na = {
  /* VARIABLES */
  re: /^#((?:[a-f0-9]{2}){2,4}|[a-f0-9]{3})$/i,
  /* API */
  parse: (t) => {
    if (t.charCodeAt(0) !== 35)
      return;
    const e = t.match(Na.re);
    if (!e)
      return;
    const i = e[1], r = parseInt(i, 16), n = i.length, o = n % 4 === 0, s = n > 4, a = s ? 1 : 17, l = s ? 8 : 4, h = o ? 0 : -1, u = s ? 255 : 15;
    return xr.set({
      r: (r >> l * (h + 3) & u) * a,
      g: (r >> l * (h + 2) & u) * a,
      b: (r >> l * (h + 1) & u) * a,
      a: o ? (r & u) * a / 255 : 1
    }, t);
  },
  stringify: (t) => {
    const { r: e, g: i, b: r, a: n } = t;
    return n < 1 ? `#${ee[Math.round(e)]}${ee[Math.round(i)]}${ee[Math.round(r)]}${ee[Math.round(n * 255)]}` : `#${ee[Math.round(e)]}${ee[Math.round(i)]}${ee[Math.round(r)]}`;
  }
}, ti = Na, zi = {
  /* VARIABLES */
  re: /^hsla?\(\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e-?\d+)?(?:deg|grad|rad|turn)?)\s*?(?:,|\s)\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e-?\d+)?%)\s*?(?:,|\s)\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e-?\d+)?%)(?:\s*?(?:,|\/)\s*?\+?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e-?\d+)?(%)?))?\s*?\)$/i,
  hueRe: /^(.+?)(deg|grad|rad|turn)$/i,
  /* HELPERS */
  _hue2deg: (t) => {
    const e = t.match(zi.hueRe);
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
    const i = t.match(zi.re);
    if (!i)
      return;
    const [, r, n, o, s, a] = i;
    return xr.set({
      h: zi._hue2deg(r),
      s: $.channel.clamp.s(parseFloat(n)),
      l: $.channel.clamp.l(parseFloat(o)),
      a: s ? $.channel.clamp.a(a ? parseFloat(s) / 100 : parseFloat(s)) : 1
    }, t);
  },
  stringify: (t) => {
    const { h: e, s: i, l: r, a: n } = t;
    return n < 1 ? `hsla(${$.lang.round(e)}, ${$.lang.round(i)}%, ${$.lang.round(r)}%, ${n})` : `hsl(${$.lang.round(e)}, ${$.lang.round(i)}%, ${$.lang.round(r)}%)`;
  }
}, Mi = zi, Wi = {
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
    const e = Wi.colors[t];
    if (e)
      return ti.parse(e);
  },
  stringify: (t) => {
    const e = ti.stringify(t);
    for (const i in Wi.colors)
      if (Wi.colors[i] === e)
        return i;
  }
}, ss = Wi, Ra = {
  /* VARIABLES */
  re: /^rgba?\(\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e\d+)?(%?))\s*?(?:,|\s)\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e\d+)?(%?))\s*?(?:,|\s)\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e\d+)?(%?))(?:\s*?(?:,|\/)\s*?\+?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e\d+)?(%?)))?\s*?\)$/i,
  /* API */
  parse: (t) => {
    const e = t.charCodeAt(0);
    if (e !== 114 && e !== 82)
      return;
    const i = t.match(Ra.re);
    if (!i)
      return;
    const [, r, n, o, s, a, l, h, u] = i;
    return xr.set({
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
}, Oi = Ra, Kd = {
  /* VARIABLES */
  format: {
    keyword: ss,
    hex: ti,
    rgb: Oi,
    rgba: Oi,
    hsl: Mi,
    hsla: Mi
  },
  /* API */
  parse: (t) => {
    if (typeof t != "string")
      return t;
    const e = ti.parse(t) || Oi.parse(t) || Mi.parse(t) || ss.parse(t);
    if (e)
      return e;
    throw new Error(`Unsupported color format: "${t}"`);
  },
  stringify: (t) => !t.changed && t.color ? t.color : t.type.is(nt.HSL) || t.data.r === void 0 ? Mi.stringify(t) : t.a < 1 || !Number.isInteger(t.r) || !Number.isInteger(t.g) || !Number.isInteger(t.b) ? Oi.stringify(t) : ti.stringify(t)
}, Nt = Kd, Zd = (t, e) => {
  const i = Nt.parse(t);
  for (const r in e)
    i[r] = $.channel.clamp[r](e[r]);
  return Nt.stringify(i);
}, Pa = Zd, Jd = (t, e, i = 0, r = 1) => {
  if (typeof t != "number")
    return Pa(t, { a: e });
  const n = xr.set({
    r: $.channel.clamp.r(t),
    g: $.channel.clamp.g(e),
    b: $.channel.clamp.b(i),
    a: $.channel.clamp.a(r)
  });
  return Nt.stringify(n);
}, ei = Jd, Qd = (t) => {
  const { r: e, g: i, b: r } = Nt.parse(t), n = 0.2126 * $.channel.toLinear(e) + 0.7152 * $.channel.toLinear(i) + 0.0722 * $.channel.toLinear(r);
  return $.lang.round(n);
}, tp = Qd, ep = (t) => tp(t) >= 0.5, ip = ep, rp = (t) => !ip(t), Ci = rp, np = (t, e, i) => {
  const r = Nt.parse(t), n = r[e], o = $.channel.clamp[e](n + i);
  return n !== o && (r[e] = o), Nt.stringify(r);
}, qa = np, op = (t, e) => qa(t, "l", e), B = op, sp = (t, e) => qa(t, "l", -e), E = sp, ap = (t, e) => {
  const i = Nt.parse(t), r = {};
  for (const n in e)
    e[n] && (r[n] = i[n] + e[n]);
  return Pa(t, r);
}, g = ap, lp = (t, e, i = 50) => {
  const { r, g: n, b: o, a: s } = Nt.parse(t), { r: a, g: l, b: h, a: u } = Nt.parse(e), f = i / 100, c = f * 2 - 1, p = s - u, k = ((c * p === -1 ? c : (c + p) / (1 + c * p)) + 1) / 2, O = 1 - k, q = r * k + a * O, T = n * k + l * O, U = o * k + h * O, W = s * f + u * (1 - f);
  return ei(q, T, U, W);
}, hp = lp, cp = (t, e = 100) => {
  const i = Nt.parse(t);
  return i.r = 255 - i.r, i.g = 255 - i.g, i.b = 255 - i.b, hp(i, t, e);
}, _ = cp, ct = (t, e) => e ? g(t, { s: -40, l: 10 }) : g(t, { s: -40, l: -10 }), br = "#ffffff", Tr = "#f2f2f2";
let up = class {
  constructor() {
    this.background = "#f4f4f4", this.primaryColor = "#fff4dd", this.noteBkgColor = "#fff5ad", this.noteTextColor = "#333", this.THEME_COLOR_LIMIT = 12, this.fontFamily = '"trebuchet ms", verdana, arial, sans-serif', this.fontSize = "16px";
  }
  updateColors() {
    var i, r, n, o, s, a, l, h, u, f, c;
    if (this.primaryTextColor = this.primaryTextColor || (this.darkMode ? "#eee" : "#333"), this.secondaryColor = this.secondaryColor || g(this.primaryColor, { h: -120 }), this.tertiaryColor = this.tertiaryColor || g(this.primaryColor, { h: 180, l: 5 }), this.primaryBorderColor = this.primaryBorderColor || ct(this.primaryColor, this.darkMode), this.secondaryBorderColor = this.secondaryBorderColor || ct(this.secondaryColor, this.darkMode), this.tertiaryBorderColor = this.tertiaryBorderColor || ct(this.tertiaryColor, this.darkMode), this.noteBorderColor = this.noteBorderColor || ct(this.noteBkgColor, this.darkMode), this.noteBkgColor = this.noteBkgColor || "#fff5ad", this.noteTextColor = this.noteTextColor || "#333", this.secondaryTextColor = this.secondaryTextColor || _(this.secondaryColor), this.tertiaryTextColor = this.tertiaryTextColor || _(this.tertiaryColor), this.lineColor = this.lineColor || _(this.background), this.arrowheadColor = this.arrowheadColor || _(this.background), this.textColor = this.textColor || this.primaryTextColor, this.border2 = this.border2 || this.tertiaryBorderColor, this.nodeBkg = this.nodeBkg || this.primaryColor, this.mainBkg = this.mainBkg || this.primaryColor, this.nodeBorder = this.nodeBorder || this.primaryBorderColor, this.clusterBkg = this.clusterBkg || this.tertiaryColor, this.clusterBorder = this.clusterBorder || this.tertiaryBorderColor, this.defaultLinkColor = this.defaultLinkColor || this.lineColor, this.titleColor = this.titleColor || this.tertiaryTextColor, this.edgeLabelBackground = this.edgeLabelBackground || (this.darkMode ? E(this.secondaryColor, 30) : this.secondaryColor), this.nodeTextColor = this.nodeTextColor || this.primaryTextColor, this.actorBorder = this.actorBorder || this.primaryBorderColor, this.actorBkg = this.actorBkg || this.mainBkg, this.actorTextColor = this.actorTextColor || this.primaryTextColor, this.actorLineColor = this.actorLineColor || "grey", this.labelBoxBkgColor = this.labelBoxBkgColor || this.actorBkg, this.signalColor = this.signalColor || this.textColor, this.signalTextColor = this.signalTextColor || this.textColor, this.labelBoxBorderColor = this.labelBoxBorderColor || this.actorBorder, this.labelTextColor = this.labelTextColor || this.actorTextColor, this.loopTextColor = this.loopTextColor || this.actorTextColor, this.activationBorderColor = this.activationBorderColor || E(this.secondaryColor, 10), this.activationBkgColor = this.activationBkgColor || this.secondaryColor, this.sequenceNumberColor = this.sequenceNumberColor || _(this.lineColor), this.sectionBkgColor = this.sectionBkgColor || this.tertiaryColor, this.altSectionBkgColor = this.altSectionBkgColor || "white", this.sectionBkgColor = this.sectionBkgColor || this.secondaryColor, this.sectionBkgColor2 = this.sectionBkgColor2 || this.primaryColor, this.excludeBkgColor = this.excludeBkgColor || "#eeeeee", this.taskBorderColor = this.taskBorderColor || this.primaryBorderColor, this.taskBkgColor = this.taskBkgColor || this.primaryColor, this.activeTaskBorderColor = this.activeTaskBorderColor || this.primaryColor, this.activeTaskBkgColor = this.activeTaskBkgColor || B(this.primaryColor, 23), this.gridColor = this.gridColor || "lightgrey", this.doneTaskBkgColor = this.doneTaskBkgColor || "lightgrey", this.doneTaskBorderColor = this.doneTaskBorderColor || "grey", this.critBorderColor = this.critBorderColor || "#ff8888", this.critBkgColor = this.critBkgColor || "red", this.todayLineColor = this.todayLineColor || "red", this.taskTextColor = this.taskTextColor || this.textColor, this.taskTextOutsideColor = this.taskTextOutsideColor || this.textColor, this.taskTextLightColor = this.taskTextLightColor || this.textColor, this.taskTextColor = this.taskTextColor || this.primaryTextColor, this.taskTextDarkColor = this.taskTextDarkColor || this.textColor, this.taskTextClickableColor = this.taskTextClickableColor || "#003163", this.personBorder = this.personBorder || this.primaryBorderColor, this.personBkg = this.personBkg || this.mainBkg, this.transitionColor = this.transitionColor || this.lineColor, this.transitionLabelColor = this.transitionLabelColor || this.textColor, this.stateLabelColor = this.stateLabelColor || this.stateBkg || this.primaryTextColor, this.stateBkg = this.stateBkg || this.mainBkg, this.labelBackgroundColor = this.labelBackgroundColor || this.stateBkg, this.compositeBackground = this.compositeBackground || this.background || this.tertiaryColor, this.altBackground = this.altBackground || this.tertiaryColor, this.compositeTitleBackground = this.compositeTitleBackground || this.mainBkg, this.compositeBorder = this.compositeBorder || this.nodeBorder, this.innerEndBackground = this.nodeBorder, this.errorBkgColor = this.errorBkgColor || this.tertiaryColor, this.errorTextColor = this.errorTextColor || this.tertiaryTextColor, this.transitionColor = this.transitionColor || this.lineColor, this.specialStateColor = this.lineColor, this.cScale0 = this.cScale0 || this.primaryColor, this.cScale1 = this.cScale1 || this.secondaryColor, this.cScale2 = this.cScale2 || this.tertiaryColor, this.cScale3 = this.cScale3 || g(this.primaryColor, { h: 30 }), this.cScale4 = this.cScale4 || g(this.primaryColor, { h: 60 }), this.cScale5 = this.cScale5 || g(this.primaryColor, { h: 90 }), this.cScale6 = this.cScale6 || g(this.primaryColor, { h: 120 }), this.cScale7 = this.cScale7 || g(this.primaryColor, { h: 150 }), this.cScale8 = this.cScale8 || g(this.primaryColor, { h: 210, l: 150 }), this.cScale9 = this.cScale9 || g(this.primaryColor, { h: 270 }), this.cScale10 = this.cScale10 || g(this.primaryColor, { h: 300 }), this.cScale11 = this.cScale11 || g(this.primaryColor, { h: 330 }), this.darkMode)
      for (let p = 0; p < this.THEME_COLOR_LIMIT; p++)
        this["cScale" + p] = E(this["cScale" + p], 75);
    else
      for (let p = 0; p < this.THEME_COLOR_LIMIT; p++)
        this["cScale" + p] = E(this["cScale" + p], 25);
    for (let p = 0; p < this.THEME_COLOR_LIMIT; p++)
      this["cScaleInv" + p] = this["cScaleInv" + p] || _(this["cScale" + p]);
    for (let p = 0; p < this.THEME_COLOR_LIMIT; p++)
      this.darkMode ? this["cScalePeer" + p] = this["cScalePeer" + p] || B(this["cScale" + p], 10) : this["cScalePeer" + p] = this["cScalePeer" + p] || E(this["cScale" + p], 10);
    this.scaleLabelColor = this.scaleLabelColor || this.labelTextColor;
    for (let p = 0; p < this.THEME_COLOR_LIMIT; p++)
      this["cScaleLabel" + p] = this["cScaleLabel" + p] || this.scaleLabelColor;
    const e = this.darkMode ? -4 : -1;
    for (let p = 0; p < 5; p++)
      this["surface" + p] = this["surface" + p] || g(this.mainBkg, { h: 180, s: -15, l: e * (5 + p * 3) }), this["surfacePeer" + p] = this["surfacePeer" + p] || g(this.mainBkg, { h: 180, s: -15, l: e * (8 + p * 3) });
    this.classText = this.classText || this.textColor, this.fillType0 = this.fillType0 || this.primaryColor, this.fillType1 = this.fillType1 || this.secondaryColor, this.fillType2 = this.fillType2 || g(this.primaryColor, { h: 64 }), this.fillType3 = this.fillType3 || g(this.secondaryColor, { h: 64 }), this.fillType4 = this.fillType4 || g(this.primaryColor, { h: -64 }), this.fillType5 = this.fillType5 || g(this.secondaryColor, { h: -64 }), this.fillType6 = this.fillType6 || g(this.primaryColor, { h: 128 }), this.fillType7 = this.fillType7 || g(this.secondaryColor, { h: 128 }), this.pie1 = this.pie1 || this.primaryColor, this.pie2 = this.pie2 || this.secondaryColor, this.pie3 = this.pie3 || this.tertiaryColor, this.pie4 = this.pie4 || g(this.primaryColor, { l: -10 }), this.pie5 = this.pie5 || g(this.secondaryColor, { l: -10 }), this.pie6 = this.pie6 || g(this.tertiaryColor, { l: -10 }), this.pie7 = this.pie7 || g(this.primaryColor, { h: 60, l: -10 }), this.pie8 = this.pie8 || g(this.primaryColor, { h: -60, l: -10 }), this.pie9 = this.pie9 || g(this.primaryColor, { h: 120, l: 0 }), this.pie10 = this.pie10 || g(this.primaryColor, { h: 60, l: -20 }), this.pie11 = this.pie11 || g(this.primaryColor, { h: -60, l: -20 }), this.pie12 = this.pie12 || g(this.primaryColor, { h: 120, l: -10 }), this.pieTitleTextSize = this.pieTitleTextSize || "25px", this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor, this.pieSectionTextSize = this.pieSectionTextSize || "17px", this.pieSectionTextColor = this.pieSectionTextColor || this.textColor, this.pieLegendTextSize = this.pieLegendTextSize || "17px", this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor, this.pieStrokeColor = this.pieStrokeColor || "black", this.pieStrokeWidth = this.pieStrokeWidth || "2px", this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || "2px", this.pieOuterStrokeColor = this.pieOuterStrokeColor || "black", this.pieOpacity = this.pieOpacity || "0.7", this.quadrant1Fill = this.quadrant1Fill || this.primaryColor, this.quadrant2Fill = this.quadrant2Fill || g(this.primaryColor, { r: 5, g: 5, b: 5 }), this.quadrant3Fill = this.quadrant3Fill || g(this.primaryColor, { r: 10, g: 10, b: 10 }), this.quadrant4Fill = this.quadrant4Fill || g(this.primaryColor, { r: 15, g: 15, b: 15 }), this.quadrant1TextFill = this.quadrant1TextFill || this.primaryTextColor, this.quadrant2TextFill = this.quadrant2TextFill || g(this.primaryTextColor, { r: -5, g: -5, b: -5 }), this.quadrant3TextFill = this.quadrant3TextFill || g(this.primaryTextColor, { r: -10, g: -10, b: -10 }), this.quadrant4TextFill = this.quadrant4TextFill || g(this.primaryTextColor, { r: -15, g: -15, b: -15 }), this.quadrantPointFill = this.quadrantPointFill || Ci(this.quadrant1Fill) ? B(this.quadrant1Fill) : E(this.quadrant1Fill), this.quadrantPointTextFill = this.quadrantPointTextFill || this.primaryTextColor, this.quadrantXAxisTextFill = this.quadrantXAxisTextFill || this.primaryTextColor, this.quadrantYAxisTextFill = this.quadrantYAxisTextFill || this.primaryTextColor, this.quadrantInternalBorderStrokeFill = this.quadrantInternalBorderStrokeFill || this.primaryBorderColor, this.quadrantExternalBorderStrokeFill = this.quadrantExternalBorderStrokeFill || this.primaryBorderColor, this.quadrantTitleFill = this.quadrantTitleFill || this.primaryTextColor, this.xyChart = {
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
    }, this.requirementBackground = this.requirementBackground || this.primaryColor, this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor, this.requirementBorderSize = this.requirementBorderSize || "1", this.requirementTextColor = this.requirementTextColor || this.primaryTextColor, this.relationColor = this.relationColor || this.lineColor, this.relationLabelBackground = this.relationLabelBackground || (this.darkMode ? E(this.secondaryColor, 30) : this.secondaryColor), this.relationLabelColor = this.relationLabelColor || this.actorTextColor, this.git0 = this.git0 || this.primaryColor, this.git1 = this.git1 || this.secondaryColor, this.git2 = this.git2 || this.tertiaryColor, this.git3 = this.git3 || g(this.primaryColor, { h: -30 }), this.git4 = this.git4 || g(this.primaryColor, { h: -60 }), this.git5 = this.git5 || g(this.primaryColor, { h: -90 }), this.git6 = this.git6 || g(this.primaryColor, { h: 60 }), this.git7 = this.git7 || g(this.primaryColor, { h: 120 }), this.darkMode ? (this.git0 = B(this.git0, 25), this.git1 = B(this.git1, 25), this.git2 = B(this.git2, 25), this.git3 = B(this.git3, 25), this.git4 = B(this.git4, 25), this.git5 = B(this.git5, 25), this.git6 = B(this.git6, 25), this.git7 = B(this.git7, 25)) : (this.git0 = E(this.git0, 25), this.git1 = E(this.git1, 25), this.git2 = E(this.git2, 25), this.git3 = E(this.git3, 25), this.git4 = E(this.git4, 25), this.git5 = E(this.git5, 25), this.git6 = E(this.git6, 25), this.git7 = E(this.git7, 25)), this.gitInv0 = this.gitInv0 || _(this.git0), this.gitInv1 = this.gitInv1 || _(this.git1), this.gitInv2 = this.gitInv2 || _(this.git2), this.gitInv3 = this.gitInv3 || _(this.git3), this.gitInv4 = this.gitInv4 || _(this.git4), this.gitInv5 = this.gitInv5 || _(this.git5), this.gitInv6 = this.gitInv6 || _(this.git6), this.gitInv7 = this.gitInv7 || _(this.git7), this.branchLabelColor = this.branchLabelColor || (this.darkMode ? "black" : this.labelTextColor), this.gitBranchLabel0 = this.gitBranchLabel0 || this.branchLabelColor, this.gitBranchLabel1 = this.gitBranchLabel1 || this.branchLabelColor, this.gitBranchLabel2 = this.gitBranchLabel2 || this.branchLabelColor, this.gitBranchLabel3 = this.gitBranchLabel3 || this.branchLabelColor, this.gitBranchLabel4 = this.gitBranchLabel4 || this.branchLabelColor, this.gitBranchLabel5 = this.gitBranchLabel5 || this.branchLabelColor, this.gitBranchLabel6 = this.gitBranchLabel6 || this.branchLabelColor, this.gitBranchLabel7 = this.gitBranchLabel7 || this.branchLabelColor, this.tagLabelColor = this.tagLabelColor || this.primaryTextColor, this.tagLabelBackground = this.tagLabelBackground || this.primaryColor, this.tagLabelBorder = this.tagBorder || this.primaryBorderColor, this.tagLabelFontSize = this.tagLabelFontSize || "10px", this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor, this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor, this.commitLabelFontSize = this.commitLabelFontSize || "10px", this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || br, this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || Tr;
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
const fp = (t) => {
  const e = new up();
  return e.calculate(t), e;
};
let dp = class {
  constructor() {
    this.background = "#333", this.primaryColor = "#1f2020", this.secondaryColor = B(this.primaryColor, 16), this.tertiaryColor = g(this.primaryColor, { h: -160 }), this.primaryBorderColor = _(this.background), this.secondaryBorderColor = ct(this.secondaryColor, this.darkMode), this.tertiaryBorderColor = ct(this.tertiaryColor, this.darkMode), this.primaryTextColor = _(this.primaryColor), this.secondaryTextColor = _(this.secondaryColor), this.tertiaryTextColor = _(this.tertiaryColor), this.lineColor = _(this.background), this.textColor = _(this.background), this.mainBkg = "#1f2020", this.secondBkg = "calculated", this.mainContrastColor = "lightgrey", this.darkTextColor = B(_("#323D47"), 10), this.lineColor = "calculated", this.border1 = "#81B1DB", this.border2 = ei(255, 255, 255, 0.25), this.arrowheadColor = "calculated", this.fontFamily = '"trebuchet ms", verdana, arial, sans-serif', this.fontSize = "16px", this.labelBackground = "#181818", this.textColor = "#ccc", this.THEME_COLOR_LIMIT = 12, this.nodeBkg = "calculated", this.nodeBorder = "calculated", this.clusterBkg = "calculated", this.clusterBorder = "calculated", this.defaultLinkColor = "calculated", this.titleColor = "#F9FFFE", this.edgeLabelBackground = "calculated", this.actorBorder = "calculated", this.actorBkg = "calculated", this.actorTextColor = "calculated", this.actorLineColor = "calculated", this.signalColor = "calculated", this.signalTextColor = "calculated", this.labelBoxBkgColor = "calculated", this.labelBoxBorderColor = "calculated", this.labelTextColor = "calculated", this.loopTextColor = "calculated", this.noteBorderColor = "calculated", this.noteBkgColor = "#fff5ad", this.noteTextColor = "calculated", this.activationBorderColor = "calculated", this.activationBkgColor = "calculated", this.sequenceNumberColor = "black", this.sectionBkgColor = E("#EAE8D9", 30), this.altSectionBkgColor = "calculated", this.sectionBkgColor2 = "#EAE8D9", this.excludeBkgColor = E(this.sectionBkgColor, 10), this.taskBorderColor = ei(255, 255, 255, 70), this.taskBkgColor = "calculated", this.taskTextColor = "calculated", this.taskTextLightColor = "calculated", this.taskTextOutsideColor = "calculated", this.taskTextClickableColor = "#003163", this.activeTaskBorderColor = ei(255, 255, 255, 50), this.activeTaskBkgColor = "#81B1DB", this.gridColor = "calculated", this.doneTaskBkgColor = "calculated", this.doneTaskBorderColor = "grey", this.critBorderColor = "#E83737", this.critBkgColor = "#E83737", this.taskTextDarkColor = "calculated", this.todayLineColor = "#DB5757", this.personBorder = this.primaryBorderColor, this.personBkg = this.mainBkg, this.labelColor = "calculated", this.errorBkgColor = "#a44141", this.errorTextColor = "#ddd";
  }
  updateColors() {
    var e, i, r, n, o, s, a, l, h, u, f;
    this.secondBkg = B(this.mainBkg, 16), this.lineColor = this.mainContrastColor, this.arrowheadColor = this.mainContrastColor, this.nodeBkg = this.mainBkg, this.nodeBorder = this.border1, this.clusterBkg = this.secondBkg, this.clusterBorder = this.border2, this.defaultLinkColor = this.lineColor, this.edgeLabelBackground = B(this.labelBackground, 25), this.actorBorder = this.border1, this.actorBkg = this.mainBkg, this.actorTextColor = this.mainContrastColor, this.actorLineColor = this.mainContrastColor, this.signalColor = this.mainContrastColor, this.signalTextColor = this.mainContrastColor, this.labelBoxBkgColor = this.actorBkg, this.labelBoxBorderColor = this.actorBorder, this.labelTextColor = this.mainContrastColor, this.loopTextColor = this.mainContrastColor, this.noteBorderColor = this.secondaryBorderColor, this.noteBkgColor = this.secondBkg, this.noteTextColor = this.secondaryTextColor, this.activationBorderColor = this.border1, this.activationBkgColor = this.secondBkg, this.altSectionBkgColor = this.background, this.taskBkgColor = B(this.mainBkg, 23), this.taskTextColor = this.darkTextColor, this.taskTextLightColor = this.mainContrastColor, this.taskTextOutsideColor = this.taskTextLightColor, this.gridColor = this.mainContrastColor, this.doneTaskBkgColor = this.mainContrastColor, this.taskTextDarkColor = this.darkTextColor, this.transitionColor = this.transitionColor || this.lineColor, this.transitionLabelColor = this.transitionLabelColor || this.textColor, this.stateLabelColor = this.stateLabelColor || this.stateBkg || this.primaryTextColor, this.stateBkg = this.stateBkg || this.mainBkg, this.labelBackgroundColor = this.labelBackgroundColor || this.stateBkg, this.compositeBackground = this.compositeBackground || this.background || this.tertiaryColor, this.altBackground = this.altBackground || "#555", this.compositeTitleBackground = this.compositeTitleBackground || this.mainBkg, this.compositeBorder = this.compositeBorder || this.nodeBorder, this.innerEndBackground = this.primaryBorderColor, this.specialStateColor = "#f4f4f4", this.errorBkgColor = this.errorBkgColor || this.tertiaryColor, this.errorTextColor = this.errorTextColor || this.tertiaryTextColor, this.fillType0 = this.primaryColor, this.fillType1 = this.secondaryColor, this.fillType2 = g(this.primaryColor, { h: 64 }), this.fillType3 = g(this.secondaryColor, { h: 64 }), this.fillType4 = g(this.primaryColor, { h: -64 }), this.fillType5 = g(this.secondaryColor, { h: -64 }), this.fillType6 = g(this.primaryColor, { h: 128 }), this.fillType7 = g(this.secondaryColor, { h: 128 }), this.cScale1 = this.cScale1 || "#0b0000", this.cScale2 = this.cScale2 || "#4d1037", this.cScale3 = this.cScale3 || "#3f5258", this.cScale4 = this.cScale4 || "#4f2f1b", this.cScale5 = this.cScale5 || "#6e0a0a", this.cScale6 = this.cScale6 || "#3b0048", this.cScale7 = this.cScale7 || "#995a01", this.cScale8 = this.cScale8 || "#154706", this.cScale9 = this.cScale9 || "#161722", this.cScale10 = this.cScale10 || "#00296f", this.cScale11 = this.cScale11 || "#01629c", this.cScale12 = this.cScale12 || "#010029", this.cScale0 = this.cScale0 || this.primaryColor, this.cScale1 = this.cScale1 || this.secondaryColor, this.cScale2 = this.cScale2 || this.tertiaryColor, this.cScale3 = this.cScale3 || g(this.primaryColor, { h: 30 }), this.cScale4 = this.cScale4 || g(this.primaryColor, { h: 60 }), this.cScale5 = this.cScale5 || g(this.primaryColor, { h: 90 }), this.cScale6 = this.cScale6 || g(this.primaryColor, { h: 120 }), this.cScale7 = this.cScale7 || g(this.primaryColor, { h: 150 }), this.cScale8 = this.cScale8 || g(this.primaryColor, { h: 210 }), this.cScale9 = this.cScale9 || g(this.primaryColor, { h: 270 }), this.cScale10 = this.cScale10 || g(this.primaryColor, { h: 300 }), this.cScale11 = this.cScale11 || g(this.primaryColor, { h: 330 });
    for (let c = 0; c < this.THEME_COLOR_LIMIT; c++)
      this["cScaleInv" + c] = this["cScaleInv" + c] || _(this["cScale" + c]);
    for (let c = 0; c < this.THEME_COLOR_LIMIT; c++)
      this["cScalePeer" + c] = this["cScalePeer" + c] || B(this["cScale" + c], 10);
    for (let c = 0; c < 5; c++)
      this["surface" + c] = this["surface" + c] || g(this.mainBkg, { h: 30, s: -30, l: -(-10 + c * 4) }), this["surfacePeer" + c] = this["surfacePeer" + c] || g(this.mainBkg, { h: 30, s: -30, l: -(-7 + c * 4) });
    this.scaleLabelColor = this.scaleLabelColor || (this.darkMode ? "black" : this.labelTextColor);
    for (let c = 0; c < this.THEME_COLOR_LIMIT; c++)
      this["cScaleLabel" + c] = this["cScaleLabel" + c] || this.scaleLabelColor;
    for (let c = 0; c < this.THEME_COLOR_LIMIT; c++)
      this["pie" + c] = this["cScale" + c];
    this.pieTitleTextSize = this.pieTitleTextSize || "25px", this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor, this.pieSectionTextSize = this.pieSectionTextSize || "17px", this.pieSectionTextColor = this.pieSectionTextColor || this.textColor, this.pieLegendTextSize = this.pieLegendTextSize || "17px", this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor, this.pieStrokeColor = this.pieStrokeColor || "black", this.pieStrokeWidth = this.pieStrokeWidth || "2px", this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || "2px", this.pieOuterStrokeColor = this.pieOuterStrokeColor || "black", this.pieOpacity = this.pieOpacity || "0.7", this.quadrant1Fill = this.quadrant1Fill || this.primaryColor, this.quadrant2Fill = this.quadrant2Fill || g(this.primaryColor, { r: 5, g: 5, b: 5 }), this.quadrant3Fill = this.quadrant3Fill || g(this.primaryColor, { r: 10, g: 10, b: 10 }), this.quadrant4Fill = this.quadrant4Fill || g(this.primaryColor, { r: 15, g: 15, b: 15 }), this.quadrant1TextFill = this.quadrant1TextFill || this.primaryTextColor, this.quadrant2TextFill = this.quadrant2TextFill || g(this.primaryTextColor, { r: -5, g: -5, b: -5 }), this.quadrant3TextFill = this.quadrant3TextFill || g(this.primaryTextColor, { r: -10, g: -10, b: -10 }), this.quadrant4TextFill = this.quadrant4TextFill || g(this.primaryTextColor, { r: -15, g: -15, b: -15 }), this.quadrantPointFill = this.quadrantPointFill || Ci(this.quadrant1Fill) ? B(this.quadrant1Fill) : E(this.quadrant1Fill), this.quadrantPointTextFill = this.quadrantPointTextFill || this.primaryTextColor, this.quadrantXAxisTextFill = this.quadrantXAxisTextFill || this.primaryTextColor, this.quadrantYAxisTextFill = this.quadrantYAxisTextFill || this.primaryTextColor, this.quadrantInternalBorderStrokeFill = this.quadrantInternalBorderStrokeFill || this.primaryBorderColor, this.quadrantExternalBorderStrokeFill = this.quadrantExternalBorderStrokeFill || this.primaryBorderColor, this.quadrantTitleFill = this.quadrantTitleFill || this.primaryTextColor, this.xyChart = {
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
    }, this.classText = this.primaryTextColor, this.requirementBackground = this.requirementBackground || this.primaryColor, this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor, this.requirementBorderSize = this.requirementBorderSize || "1", this.requirementTextColor = this.requirementTextColor || this.primaryTextColor, this.relationColor = this.relationColor || this.lineColor, this.relationLabelBackground = this.relationLabelBackground || (this.darkMode ? E(this.secondaryColor, 30) : this.secondaryColor), this.relationLabelColor = this.relationLabelColor || this.actorTextColor, this.git0 = B(this.secondaryColor, 20), this.git1 = B(this.pie2 || this.secondaryColor, 20), this.git2 = B(this.pie3 || this.tertiaryColor, 20), this.git3 = B(this.pie4 || g(this.primaryColor, { h: -30 }), 20), this.git4 = B(this.pie5 || g(this.primaryColor, { h: -60 }), 20), this.git5 = B(this.pie6 || g(this.primaryColor, { h: -90 }), 10), this.git6 = B(this.pie7 || g(this.primaryColor, { h: 60 }), 10), this.git7 = B(this.pie8 || g(this.primaryColor, { h: 120 }), 20), this.gitInv0 = this.gitInv0 || _(this.git0), this.gitInv1 = this.gitInv1 || _(this.git1), this.gitInv2 = this.gitInv2 || _(this.git2), this.gitInv3 = this.gitInv3 || _(this.git3), this.gitInv4 = this.gitInv4 || _(this.git4), this.gitInv5 = this.gitInv5 || _(this.git5), this.gitInv6 = this.gitInv6 || _(this.git6), this.gitInv7 = this.gitInv7 || _(this.git7), this.gitBranchLabel0 = this.gitBranchLabel0 || _(this.labelTextColor), this.gitBranchLabel1 = this.gitBranchLabel1 || this.labelTextColor, this.gitBranchLabel2 = this.gitBranchLabel2 || this.labelTextColor, this.gitBranchLabel3 = this.gitBranchLabel3 || _(this.labelTextColor), this.gitBranchLabel4 = this.gitBranchLabel4 || this.labelTextColor, this.gitBranchLabel5 = this.gitBranchLabel5 || this.labelTextColor, this.gitBranchLabel6 = this.gitBranchLabel6 || this.labelTextColor, this.gitBranchLabel7 = this.gitBranchLabel7 || this.labelTextColor, this.tagLabelColor = this.tagLabelColor || this.primaryTextColor, this.tagLabelBackground = this.tagLabelBackground || this.primaryColor, this.tagLabelBorder = this.tagBorder || this.primaryBorderColor, this.tagLabelFontSize = this.tagLabelFontSize || "10px", this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor, this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor, this.commitLabelFontSize = this.commitLabelFontSize || "10px", this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || B(this.background, 12), this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || B(this.background, 2);
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
const pp = (t) => {
  const e = new dp();
  return e.calculate(t), e;
};
let gp = class {
  constructor() {
    this.background = "#f4f4f4", this.primaryColor = "#ECECFF", this.secondaryColor = g(this.primaryColor, { h: 120 }), this.secondaryColor = "#ffffde", this.tertiaryColor = g(this.primaryColor, { h: -160 }), this.primaryBorderColor = ct(this.primaryColor, this.darkMode), this.secondaryBorderColor = ct(this.secondaryColor, this.darkMode), this.tertiaryBorderColor = ct(this.tertiaryColor, this.darkMode), this.primaryTextColor = _(this.primaryColor), this.secondaryTextColor = _(this.secondaryColor), this.tertiaryTextColor = _(this.tertiaryColor), this.lineColor = _(this.background), this.textColor = _(this.background), this.background = "white", this.mainBkg = "#ECECFF", this.secondBkg = "#ffffde", this.lineColor = "#333333", this.border1 = "#9370DB", this.border2 = "#aaaa33", this.arrowheadColor = "#333333", this.fontFamily = '"trebuchet ms", verdana, arial, sans-serif', this.fontSize = "16px", this.labelBackground = "#e8e8e8", this.textColor = "#333", this.THEME_COLOR_LIMIT = 12, this.nodeBkg = "calculated", this.nodeBorder = "calculated", this.clusterBkg = "calculated", this.clusterBorder = "calculated", this.defaultLinkColor = "calculated", this.titleColor = "calculated", this.edgeLabelBackground = "calculated", this.actorBorder = "calculated", this.actorBkg = "calculated", this.actorTextColor = "black", this.actorLineColor = "grey", this.signalColor = "calculated", this.signalTextColor = "calculated", this.labelBoxBkgColor = "calculated", this.labelBoxBorderColor = "calculated", this.labelTextColor = "calculated", this.loopTextColor = "calculated", this.noteBorderColor = "calculated", this.noteBkgColor = "#fff5ad", this.noteTextColor = "calculated", this.activationBorderColor = "#666", this.activationBkgColor = "#f4f4f4", this.sequenceNumberColor = "white", this.sectionBkgColor = "calculated", this.altSectionBkgColor = "calculated", this.sectionBkgColor2 = "calculated", this.excludeBkgColor = "#eeeeee", this.taskBorderColor = "calculated", this.taskBkgColor = "calculated", this.taskTextLightColor = "calculated", this.taskTextColor = this.taskTextLightColor, this.taskTextDarkColor = "calculated", this.taskTextOutsideColor = this.taskTextDarkColor, this.taskTextClickableColor = "calculated", this.activeTaskBorderColor = "calculated", this.activeTaskBkgColor = "calculated", this.gridColor = "calculated", this.doneTaskBkgColor = "calculated", this.doneTaskBorderColor = "calculated", this.critBorderColor = "calculated", this.critBkgColor = "calculated", this.todayLineColor = "calculated", this.sectionBkgColor = ei(102, 102, 255, 0.49), this.altSectionBkgColor = "white", this.sectionBkgColor2 = "#fff400", this.taskBorderColor = "#534fbc", this.taskBkgColor = "#8a90dd", this.taskTextLightColor = "white", this.taskTextColor = "calculated", this.taskTextDarkColor = "black", this.taskTextOutsideColor = "calculated", this.taskTextClickableColor = "#003163", this.activeTaskBorderColor = "#534fbc", this.activeTaskBkgColor = "#bfc7ff", this.gridColor = "lightgrey", this.doneTaskBkgColor = "lightgrey", this.doneTaskBorderColor = "grey", this.critBorderColor = "#ff8888", this.critBkgColor = "red", this.todayLineColor = "red", this.personBorder = this.primaryBorderColor, this.personBkg = this.mainBkg, this.labelColor = "black", this.errorBkgColor = "#552222", this.errorTextColor = "#552222", this.updateColors();
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
    this.nodeBkg = this.mainBkg, this.nodeBorder = this.border1, this.clusterBkg = this.secondBkg, this.clusterBorder = this.border2, this.defaultLinkColor = this.lineColor, this.titleColor = this.textColor, this.edgeLabelBackground = this.labelBackground, this.actorBorder = B(this.border1, 23), this.actorBkg = this.mainBkg, this.labelBoxBkgColor = this.actorBkg, this.signalColor = this.textColor, this.signalTextColor = this.textColor, this.labelBoxBorderColor = this.actorBorder, this.labelTextColor = this.actorTextColor, this.loopTextColor = this.actorTextColor, this.noteBorderColor = this.border2, this.noteTextColor = this.actorTextColor, this.taskTextColor = this.taskTextLightColor, this.taskTextOutsideColor = this.taskTextDarkColor, this.transitionColor = this.transitionColor || this.lineColor, this.transitionLabelColor = this.transitionLabelColor || this.textColor, this.stateLabelColor = this.stateLabelColor || this.stateBkg || this.primaryTextColor, this.stateBkg = this.stateBkg || this.mainBkg, this.labelBackgroundColor = this.labelBackgroundColor || this.stateBkg, this.compositeBackground = this.compositeBackground || this.background || this.tertiaryColor, this.altBackground = this.altBackground || "#f0f0f0", this.compositeTitleBackground = this.compositeTitleBackground || this.mainBkg, this.compositeBorder = this.compositeBorder || this.nodeBorder, this.innerEndBackground = this.nodeBorder, this.specialStateColor = this.lineColor, this.errorBkgColor = this.errorBkgColor || this.tertiaryColor, this.errorTextColor = this.errorTextColor || this.tertiaryTextColor, this.transitionColor = this.transitionColor || this.lineColor, this.classText = this.primaryTextColor, this.fillType0 = this.primaryColor, this.fillType1 = this.secondaryColor, this.fillType2 = g(this.primaryColor, { h: 64 }), this.fillType3 = g(this.secondaryColor, { h: 64 }), this.fillType4 = g(this.primaryColor, { h: -64 }), this.fillType5 = g(this.secondaryColor, { h: -64 }), this.fillType6 = g(this.primaryColor, { h: 128 }), this.fillType7 = g(this.secondaryColor, { h: 128 }), this.pie1 = this.pie1 || this.primaryColor, this.pie2 = this.pie2 || this.secondaryColor, this.pie3 = this.pie3 || g(this.tertiaryColor, { l: -40 }), this.pie4 = this.pie4 || g(this.primaryColor, { l: -10 }), this.pie5 = this.pie5 || g(this.secondaryColor, { l: -30 }), this.pie6 = this.pie6 || g(this.tertiaryColor, { l: -20 }), this.pie7 = this.pie7 || g(this.primaryColor, { h: 60, l: -20 }), this.pie8 = this.pie8 || g(this.primaryColor, { h: -60, l: -40 }), this.pie9 = this.pie9 || g(this.primaryColor, { h: 120, l: -40 }), this.pie10 = this.pie10 || g(this.primaryColor, { h: 60, l: -40 }), this.pie11 = this.pie11 || g(this.primaryColor, { h: -90, l: -40 }), this.pie12 = this.pie12 || g(this.primaryColor, { h: 120, l: -30 }), this.pieTitleTextSize = this.pieTitleTextSize || "25px", this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor, this.pieSectionTextSize = this.pieSectionTextSize || "17px", this.pieSectionTextColor = this.pieSectionTextColor || this.textColor, this.pieLegendTextSize = this.pieLegendTextSize || "17px", this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor, this.pieStrokeColor = this.pieStrokeColor || "black", this.pieStrokeWidth = this.pieStrokeWidth || "2px", this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || "2px", this.pieOuterStrokeColor = this.pieOuterStrokeColor || "black", this.pieOpacity = this.pieOpacity || "0.7", this.quadrant1Fill = this.quadrant1Fill || this.primaryColor, this.quadrant2Fill = this.quadrant2Fill || g(this.primaryColor, { r: 5, g: 5, b: 5 }), this.quadrant3Fill = this.quadrant3Fill || g(this.primaryColor, { r: 10, g: 10, b: 10 }), this.quadrant4Fill = this.quadrant4Fill || g(this.primaryColor, { r: 15, g: 15, b: 15 }), this.quadrant1TextFill = this.quadrant1TextFill || this.primaryTextColor, this.quadrant2TextFill = this.quadrant2TextFill || g(this.primaryTextColor, { r: -5, g: -5, b: -5 }), this.quadrant3TextFill = this.quadrant3TextFill || g(this.primaryTextColor, { r: -10, g: -10, b: -10 }), this.quadrant4TextFill = this.quadrant4TextFill || g(this.primaryTextColor, { r: -15, g: -15, b: -15 }), this.quadrantPointFill = this.quadrantPointFill || Ci(this.quadrant1Fill) ? B(this.quadrant1Fill) : E(this.quadrant1Fill), this.quadrantPointTextFill = this.quadrantPointTextFill || this.primaryTextColor, this.quadrantXAxisTextFill = this.quadrantXAxisTextFill || this.primaryTextColor, this.quadrantYAxisTextFill = this.quadrantYAxisTextFill || this.primaryTextColor, this.quadrantInternalBorderStrokeFill = this.quadrantInternalBorderStrokeFill || this.primaryBorderColor, this.quadrantExternalBorderStrokeFill = this.quadrantExternalBorderStrokeFill || this.primaryBorderColor, this.quadrantTitleFill = this.quadrantTitleFill || this.primaryTextColor, this.xyChart = {
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
    }, this.requirementBackground = this.requirementBackground || this.primaryColor, this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor, this.requirementBorderSize = this.requirementBorderSize || "1", this.requirementTextColor = this.requirementTextColor || this.primaryTextColor, this.relationColor = this.relationColor || this.lineColor, this.relationLabelBackground = this.relationLabelBackground || this.labelBackground, this.relationLabelColor = this.relationLabelColor || this.actorTextColor, this.git0 = this.git0 || this.primaryColor, this.git1 = this.git1 || this.secondaryColor, this.git2 = this.git2 || this.tertiaryColor, this.git3 = this.git3 || g(this.primaryColor, { h: -30 }), this.git4 = this.git4 || g(this.primaryColor, { h: -60 }), this.git5 = this.git5 || g(this.primaryColor, { h: -90 }), this.git6 = this.git6 || g(this.primaryColor, { h: 60 }), this.git7 = this.git7 || g(this.primaryColor, { h: 120 }), this.darkMode ? (this.git0 = B(this.git0, 25), this.git1 = B(this.git1, 25), this.git2 = B(this.git2, 25), this.git3 = B(this.git3, 25), this.git4 = B(this.git4, 25), this.git5 = B(this.git5, 25), this.git6 = B(this.git6, 25), this.git7 = B(this.git7, 25)) : (this.git0 = E(this.git0, 25), this.git1 = E(this.git1, 25), this.git2 = E(this.git2, 25), this.git3 = E(this.git3, 25), this.git4 = E(this.git4, 25), this.git5 = E(this.git5, 25), this.git6 = E(this.git6, 25), this.git7 = E(this.git7, 25)), this.gitInv0 = this.gitInv0 || E(_(this.git0), 25), this.gitInv1 = this.gitInv1 || _(this.git1), this.gitInv2 = this.gitInv2 || _(this.git2), this.gitInv3 = this.gitInv3 || _(this.git3), this.gitInv4 = this.gitInv4 || _(this.git4), this.gitInv5 = this.gitInv5 || _(this.git5), this.gitInv6 = this.gitInv6 || _(this.git6), this.gitInv7 = this.gitInv7 || _(this.git7), this.gitBranchLabel0 = this.gitBranchLabel0 || _(this.labelTextColor), this.gitBranchLabel1 = this.gitBranchLabel1 || this.labelTextColor, this.gitBranchLabel2 = this.gitBranchLabel2 || this.labelTextColor, this.gitBranchLabel3 = this.gitBranchLabel3 || _(this.labelTextColor), this.gitBranchLabel4 = this.gitBranchLabel4 || this.labelTextColor, this.gitBranchLabel5 = this.gitBranchLabel5 || this.labelTextColor, this.gitBranchLabel6 = this.gitBranchLabel6 || this.labelTextColor, this.gitBranchLabel7 = this.gitBranchLabel7 || this.labelTextColor, this.tagLabelColor = this.tagLabelColor || this.primaryTextColor, this.tagLabelBackground = this.tagLabelBackground || this.primaryColor, this.tagLabelBorder = this.tagBorder || this.primaryBorderColor, this.tagLabelFontSize = this.tagLabelFontSize || "10px", this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor, this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor, this.commitLabelFontSize = this.commitLabelFontSize || "10px", this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || br, this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || Tr;
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
const mp = (t) => {
  const e = new gp();
  return e.calculate(t), e;
};
let yp = class {
  constructor() {
    this.background = "#f4f4f4", this.primaryColor = "#cde498", this.secondaryColor = "#cdffb2", this.background = "white", this.mainBkg = "#cde498", this.secondBkg = "#cdffb2", this.lineColor = "green", this.border1 = "#13540c", this.border2 = "#6eaa49", this.arrowheadColor = "green", this.fontFamily = '"trebuchet ms", verdana, arial, sans-serif', this.fontSize = "16px", this.tertiaryColor = B("#cde498", 10), this.primaryBorderColor = ct(this.primaryColor, this.darkMode), this.secondaryBorderColor = ct(this.secondaryColor, this.darkMode), this.tertiaryBorderColor = ct(this.tertiaryColor, this.darkMode), this.primaryTextColor = _(this.primaryColor), this.secondaryTextColor = _(this.secondaryColor), this.tertiaryTextColor = _(this.primaryColor), this.lineColor = _(this.background), this.textColor = _(this.background), this.THEME_COLOR_LIMIT = 12, this.nodeBkg = "calculated", this.nodeBorder = "calculated", this.clusterBkg = "calculated", this.clusterBorder = "calculated", this.defaultLinkColor = "calculated", this.titleColor = "#333", this.edgeLabelBackground = "#e8e8e8", this.actorBorder = "calculated", this.actorBkg = "calculated", this.actorTextColor = "black", this.actorLineColor = "grey", this.signalColor = "#333", this.signalTextColor = "#333", this.labelBoxBkgColor = "calculated", this.labelBoxBorderColor = "#326932", this.labelTextColor = "calculated", this.loopTextColor = "calculated", this.noteBorderColor = "calculated", this.noteBkgColor = "#fff5ad", this.noteTextColor = "calculated", this.activationBorderColor = "#666", this.activationBkgColor = "#f4f4f4", this.sequenceNumberColor = "white", this.sectionBkgColor = "#6eaa49", this.altSectionBkgColor = "white", this.sectionBkgColor2 = "#6eaa49", this.excludeBkgColor = "#eeeeee", this.taskBorderColor = "calculated", this.taskBkgColor = "#487e3a", this.taskTextLightColor = "white", this.taskTextColor = "calculated", this.taskTextDarkColor = "black", this.taskTextOutsideColor = "calculated", this.taskTextClickableColor = "#003163", this.activeTaskBorderColor = "calculated", this.activeTaskBkgColor = "calculated", this.gridColor = "lightgrey", this.doneTaskBkgColor = "lightgrey", this.doneTaskBorderColor = "grey", this.critBorderColor = "#ff8888", this.critBkgColor = "red", this.todayLineColor = "red", this.personBorder = this.primaryBorderColor, this.personBkg = this.mainBkg, this.labelColor = "black", this.errorBkgColor = "#552222", this.errorTextColor = "#552222";
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
    this.nodeBkg = this.mainBkg, this.nodeBorder = this.border1, this.clusterBkg = this.secondBkg, this.clusterBorder = this.border2, this.defaultLinkColor = this.lineColor, this.taskBorderColor = this.border1, this.taskTextColor = this.taskTextLightColor, this.taskTextOutsideColor = this.taskTextDarkColor, this.activeTaskBorderColor = this.taskBorderColor, this.activeTaskBkgColor = this.mainBkg, this.transitionColor = this.transitionColor || this.lineColor, this.transitionLabelColor = this.transitionLabelColor || this.textColor, this.stateLabelColor = this.stateLabelColor || this.stateBkg || this.primaryTextColor, this.stateBkg = this.stateBkg || this.mainBkg, this.labelBackgroundColor = this.labelBackgroundColor || this.stateBkg, this.compositeBackground = this.compositeBackground || this.background || this.tertiaryColor, this.altBackground = this.altBackground || "#f0f0f0", this.compositeTitleBackground = this.compositeTitleBackground || this.mainBkg, this.compositeBorder = this.compositeBorder || this.nodeBorder, this.innerEndBackground = this.primaryBorderColor, this.specialStateColor = this.lineColor, this.errorBkgColor = this.errorBkgColor || this.tertiaryColor, this.errorTextColor = this.errorTextColor || this.tertiaryTextColor, this.transitionColor = this.transitionColor || this.lineColor, this.classText = this.primaryTextColor, this.fillType0 = this.primaryColor, this.fillType1 = this.secondaryColor, this.fillType2 = g(this.primaryColor, { h: 64 }), this.fillType3 = g(this.secondaryColor, { h: 64 }), this.fillType4 = g(this.primaryColor, { h: -64 }), this.fillType5 = g(this.secondaryColor, { h: -64 }), this.fillType6 = g(this.primaryColor, { h: 128 }), this.fillType7 = g(this.secondaryColor, { h: 128 }), this.pie1 = this.pie1 || this.primaryColor, this.pie2 = this.pie2 || this.secondaryColor, this.pie3 = this.pie3 || this.tertiaryColor, this.pie4 = this.pie4 || g(this.primaryColor, { l: -30 }), this.pie5 = this.pie5 || g(this.secondaryColor, { l: -30 }), this.pie6 = this.pie6 || g(this.tertiaryColor, { h: 40, l: -40 }), this.pie7 = this.pie7 || g(this.primaryColor, { h: 60, l: -10 }), this.pie8 = this.pie8 || g(this.primaryColor, { h: -60, l: -10 }), this.pie9 = this.pie9 || g(this.primaryColor, { h: 120, l: 0 }), this.pie10 = this.pie10 || g(this.primaryColor, { h: 60, l: -50 }), this.pie11 = this.pie11 || g(this.primaryColor, { h: -60, l: -50 }), this.pie12 = this.pie12 || g(this.primaryColor, { h: 120, l: -50 }), this.pieTitleTextSize = this.pieTitleTextSize || "25px", this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor, this.pieSectionTextSize = this.pieSectionTextSize || "17px", this.pieSectionTextColor = this.pieSectionTextColor || this.textColor, this.pieLegendTextSize = this.pieLegendTextSize || "17px", this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor, this.pieStrokeColor = this.pieStrokeColor || "black", this.pieStrokeWidth = this.pieStrokeWidth || "2px", this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || "2px", this.pieOuterStrokeColor = this.pieOuterStrokeColor || "black", this.pieOpacity = this.pieOpacity || "0.7", this.quadrant1Fill = this.quadrant1Fill || this.primaryColor, this.quadrant2Fill = this.quadrant2Fill || g(this.primaryColor, { r: 5, g: 5, b: 5 }), this.quadrant3Fill = this.quadrant3Fill || g(this.primaryColor, { r: 10, g: 10, b: 10 }), this.quadrant4Fill = this.quadrant4Fill || g(this.primaryColor, { r: 15, g: 15, b: 15 }), this.quadrant1TextFill = this.quadrant1TextFill || this.primaryTextColor, this.quadrant2TextFill = this.quadrant2TextFill || g(this.primaryTextColor, { r: -5, g: -5, b: -5 }), this.quadrant3TextFill = this.quadrant3TextFill || g(this.primaryTextColor, { r: -10, g: -10, b: -10 }), this.quadrant4TextFill = this.quadrant4TextFill || g(this.primaryTextColor, { r: -15, g: -15, b: -15 }), this.quadrantPointFill = this.quadrantPointFill || Ci(this.quadrant1Fill) ? B(this.quadrant1Fill) : E(this.quadrant1Fill), this.quadrantPointTextFill = this.quadrantPointTextFill || this.primaryTextColor, this.quadrantXAxisTextFill = this.quadrantXAxisTextFill || this.primaryTextColor, this.quadrantYAxisTextFill = this.quadrantYAxisTextFill || this.primaryTextColor, this.quadrantInternalBorderStrokeFill = this.quadrantInternalBorderStrokeFill || this.primaryBorderColor, this.quadrantExternalBorderStrokeFill = this.quadrantExternalBorderStrokeFill || this.primaryBorderColor, this.quadrantTitleFill = this.quadrantTitleFill || this.primaryTextColor, this.xyChart = {
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
    }, this.requirementBackground = this.requirementBackground || this.primaryColor, this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor, this.requirementBorderSize = this.requirementBorderSize || "1", this.requirementTextColor = this.requirementTextColor || this.primaryTextColor, this.relationColor = this.relationColor || this.lineColor, this.relationLabelBackground = this.relationLabelBackground || this.edgeLabelBackground, this.relationLabelColor = this.relationLabelColor || this.actorTextColor, this.git0 = this.git0 || this.primaryColor, this.git1 = this.git1 || this.secondaryColor, this.git2 = this.git2 || this.tertiaryColor, this.git3 = this.git3 || g(this.primaryColor, { h: -30 }), this.git4 = this.git4 || g(this.primaryColor, { h: -60 }), this.git5 = this.git5 || g(this.primaryColor, { h: -90 }), this.git6 = this.git6 || g(this.primaryColor, { h: 60 }), this.git7 = this.git7 || g(this.primaryColor, { h: 120 }), this.darkMode ? (this.git0 = B(this.git0, 25), this.git1 = B(this.git1, 25), this.git2 = B(this.git2, 25), this.git3 = B(this.git3, 25), this.git4 = B(this.git4, 25), this.git5 = B(this.git5, 25), this.git6 = B(this.git6, 25), this.git7 = B(this.git7, 25)) : (this.git0 = E(this.git0, 25), this.git1 = E(this.git1, 25), this.git2 = E(this.git2, 25), this.git3 = E(this.git3, 25), this.git4 = E(this.git4, 25), this.git5 = E(this.git5, 25), this.git6 = E(this.git6, 25), this.git7 = E(this.git7, 25)), this.gitInv0 = this.gitInv0 || _(this.git0), this.gitInv1 = this.gitInv1 || _(this.git1), this.gitInv2 = this.gitInv2 || _(this.git2), this.gitInv3 = this.gitInv3 || _(this.git3), this.gitInv4 = this.gitInv4 || _(this.git4), this.gitInv5 = this.gitInv5 || _(this.git5), this.gitInv6 = this.gitInv6 || _(this.git6), this.gitInv7 = this.gitInv7 || _(this.git7), this.gitBranchLabel0 = this.gitBranchLabel0 || _(this.labelTextColor), this.gitBranchLabel1 = this.gitBranchLabel1 || this.labelTextColor, this.gitBranchLabel2 = this.gitBranchLabel2 || this.labelTextColor, this.gitBranchLabel3 = this.gitBranchLabel3 || _(this.labelTextColor), this.gitBranchLabel4 = this.gitBranchLabel4 || this.labelTextColor, this.gitBranchLabel5 = this.gitBranchLabel5 || this.labelTextColor, this.gitBranchLabel6 = this.gitBranchLabel6 || this.labelTextColor, this.gitBranchLabel7 = this.gitBranchLabel7 || this.labelTextColor, this.tagLabelColor = this.tagLabelColor || this.primaryTextColor, this.tagLabelBackground = this.tagLabelBackground || this.primaryColor, this.tagLabelBorder = this.tagBorder || this.primaryBorderColor, this.tagLabelFontSize = this.tagLabelFontSize || "10px", this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor, this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor, this.commitLabelFontSize = this.commitLabelFontSize || "10px", this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || br, this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || Tr;
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
const _p = (t) => {
  const e = new yp();
  return e.calculate(t), e;
};
class Cp {
  constructor() {
    this.primaryColor = "#eee", this.contrast = "#707070", this.secondaryColor = B(this.contrast, 55), this.background = "#ffffff", this.tertiaryColor = g(this.primaryColor, { h: -160 }), this.primaryBorderColor = ct(this.primaryColor, this.darkMode), this.secondaryBorderColor = ct(this.secondaryColor, this.darkMode), this.tertiaryBorderColor = ct(this.tertiaryColor, this.darkMode), this.primaryTextColor = _(this.primaryColor), this.secondaryTextColor = _(this.secondaryColor), this.tertiaryTextColor = _(this.tertiaryColor), this.lineColor = _(this.background), this.textColor = _(this.background), this.mainBkg = "#eee", this.secondBkg = "calculated", this.lineColor = "#666", this.border1 = "#999", this.border2 = "calculated", this.note = "#ffa", this.text = "#333", this.critical = "#d42", this.done = "#bbb", this.arrowheadColor = "#333333", this.fontFamily = '"trebuchet ms", verdana, arial, sans-serif', this.fontSize = "16px", this.THEME_COLOR_LIMIT = 12, this.nodeBkg = "calculated", this.nodeBorder = "calculated", this.clusterBkg = "calculated", this.clusterBorder = "calculated", this.defaultLinkColor = "calculated", this.titleColor = "calculated", this.edgeLabelBackground = "white", this.actorBorder = "calculated", this.actorBkg = "calculated", this.actorTextColor = "calculated", this.actorLineColor = "calculated", this.signalColor = "calculated", this.signalTextColor = "calculated", this.labelBoxBkgColor = "calculated", this.labelBoxBorderColor = "calculated", this.labelTextColor = "calculated", this.loopTextColor = "calculated", this.noteBorderColor = "calculated", this.noteBkgColor = "calculated", this.noteTextColor = "calculated", this.activationBorderColor = "#666", this.activationBkgColor = "#f4f4f4", this.sequenceNumberColor = "white", this.sectionBkgColor = "calculated", this.altSectionBkgColor = "white", this.sectionBkgColor2 = "calculated", this.excludeBkgColor = "#eeeeee", this.taskBorderColor = "calculated", this.taskBkgColor = "calculated", this.taskTextLightColor = "white", this.taskTextColor = "calculated", this.taskTextDarkColor = "calculated", this.taskTextOutsideColor = "calculated", this.taskTextClickableColor = "#003163", this.activeTaskBorderColor = "calculated", this.activeTaskBkgColor = "calculated", this.gridColor = "calculated", this.doneTaskBkgColor = "calculated", this.doneTaskBorderColor = "calculated", this.critBkgColor = "calculated", this.critBorderColor = "calculated", this.todayLineColor = "calculated", this.personBorder = this.primaryBorderColor, this.personBkg = this.mainBkg, this.labelColor = "black", this.errorBkgColor = "#552222", this.errorTextColor = "#552222";
  }
  updateColors() {
    var e, i, r, n, o, s, a, l, h, u, f;
    this.secondBkg = B(this.contrast, 55), this.border2 = this.contrast, this.actorBorder = B(this.border1, 23), this.actorBkg = this.mainBkg, this.actorTextColor = this.text, this.actorLineColor = this.lineColor, this.signalColor = this.text, this.signalTextColor = this.text, this.labelBoxBkgColor = this.actorBkg, this.labelBoxBorderColor = this.actorBorder, this.labelTextColor = this.text, this.loopTextColor = this.text, this.noteBorderColor = "#999", this.noteBkgColor = "#666", this.noteTextColor = "#fff", this.cScale0 = this.cScale0 || "#555", this.cScale1 = this.cScale1 || "#F4F4F4", this.cScale2 = this.cScale2 || "#555", this.cScale3 = this.cScale3 || "#BBB", this.cScale4 = this.cScale4 || "#777", this.cScale5 = this.cScale5 || "#999", this.cScale6 = this.cScale6 || "#DDD", this.cScale7 = this.cScale7 || "#FFF", this.cScale8 = this.cScale8 || "#DDD", this.cScale9 = this.cScale9 || "#BBB", this.cScale10 = this.cScale10 || "#999", this.cScale11 = this.cScale11 || "#777";
    for (let c = 0; c < this.THEME_COLOR_LIMIT; c++)
      this["cScaleInv" + c] = this["cScaleInv" + c] || _(this["cScale" + c]);
    for (let c = 0; c < this.THEME_COLOR_LIMIT; c++)
      this.darkMode ? this["cScalePeer" + c] = this["cScalePeer" + c] || B(this["cScale" + c], 10) : this["cScalePeer" + c] = this["cScalePeer" + c] || E(this["cScale" + c], 10);
    this.scaleLabelColor = this.scaleLabelColor || (this.darkMode ? "black" : this.labelTextColor), this.cScaleLabel0 = this.cScaleLabel0 || this.cScale1, this.cScaleLabel2 = this.cScaleLabel2 || this.cScale1;
    for (let c = 0; c < this.THEME_COLOR_LIMIT; c++)
      this["cScaleLabel" + c] = this["cScaleLabel" + c] || this.scaleLabelColor;
    for (let c = 0; c < 5; c++)
      this["surface" + c] = this["surface" + c] || g(this.mainBkg, { l: -(5 + c * 5) }), this["surfacePeer" + c] = this["surfacePeer" + c] || g(this.mainBkg, { l: -(8 + c * 5) });
    this.nodeBkg = this.mainBkg, this.nodeBorder = this.border1, this.clusterBkg = this.secondBkg, this.clusterBorder = this.border2, this.defaultLinkColor = this.lineColor, this.titleColor = this.text, this.sectionBkgColor = B(this.contrast, 30), this.sectionBkgColor2 = B(this.contrast, 30), this.taskBorderColor = E(this.contrast, 10), this.taskBkgColor = this.contrast, this.taskTextColor = this.taskTextLightColor, this.taskTextDarkColor = this.text, this.taskTextOutsideColor = this.taskTextDarkColor, this.activeTaskBorderColor = this.taskBorderColor, this.activeTaskBkgColor = this.mainBkg, this.gridColor = B(this.border1, 30), this.doneTaskBkgColor = this.done, this.doneTaskBorderColor = this.lineColor, this.critBkgColor = this.critical, this.critBorderColor = E(this.critBkgColor, 10), this.todayLineColor = this.critBkgColor, this.transitionColor = this.transitionColor || "#000", this.transitionLabelColor = this.transitionLabelColor || this.textColor, this.stateLabelColor = this.stateLabelColor || this.stateBkg || this.primaryTextColor, this.stateBkg = this.stateBkg || this.mainBkg, this.labelBackgroundColor = this.labelBackgroundColor || this.stateBkg, this.compositeBackground = this.compositeBackground || this.background || this.tertiaryColor, this.altBackground = this.altBackground || "#f4f4f4", this.compositeTitleBackground = this.compositeTitleBackground || this.mainBkg, this.stateBorder = this.stateBorder || "#000", this.innerEndBackground = this.primaryBorderColor, this.specialStateColor = "#222", this.errorBkgColor = this.errorBkgColor || this.tertiaryColor, this.errorTextColor = this.errorTextColor || this.tertiaryTextColor, this.classText = this.primaryTextColor, this.fillType0 = this.primaryColor, this.fillType1 = this.secondaryColor, this.fillType2 = g(this.primaryColor, { h: 64 }), this.fillType3 = g(this.secondaryColor, { h: 64 }), this.fillType4 = g(this.primaryColor, { h: -64 }), this.fillType5 = g(this.secondaryColor, { h: -64 }), this.fillType6 = g(this.primaryColor, { h: 128 }), this.fillType7 = g(this.secondaryColor, { h: 128 });
    for (let c = 0; c < this.THEME_COLOR_LIMIT; c++)
      this["pie" + c] = this["cScale" + c];
    this.pie12 = this.pie0, this.pieTitleTextSize = this.pieTitleTextSize || "25px", this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor, this.pieSectionTextSize = this.pieSectionTextSize || "17px", this.pieSectionTextColor = this.pieSectionTextColor || this.textColor, this.pieLegendTextSize = this.pieLegendTextSize || "17px", this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor, this.pieStrokeColor = this.pieStrokeColor || "black", this.pieStrokeWidth = this.pieStrokeWidth || "2px", this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || "2px", this.pieOuterStrokeColor = this.pieOuterStrokeColor || "black", this.pieOpacity = this.pieOpacity || "0.7", this.quadrant1Fill = this.quadrant1Fill || this.primaryColor, this.quadrant2Fill = this.quadrant2Fill || g(this.primaryColor, { r: 5, g: 5, b: 5 }), this.quadrant3Fill = this.quadrant3Fill || g(this.primaryColor, { r: 10, g: 10, b: 10 }), this.quadrant4Fill = this.quadrant4Fill || g(this.primaryColor, { r: 15, g: 15, b: 15 }), this.quadrant1TextFill = this.quadrant1TextFill || this.primaryTextColor, this.quadrant2TextFill = this.quadrant2TextFill || g(this.primaryTextColor, { r: -5, g: -5, b: -5 }), this.quadrant3TextFill = this.quadrant3TextFill || g(this.primaryTextColor, { r: -10, g: -10, b: -10 }), this.quadrant4TextFill = this.quadrant4TextFill || g(this.primaryTextColor, { r: -15, g: -15, b: -15 }), this.quadrantPointFill = this.quadrantPointFill || Ci(this.quadrant1Fill) ? B(this.quadrant1Fill) : E(this.quadrant1Fill), this.quadrantPointTextFill = this.quadrantPointTextFill || this.primaryTextColor, this.quadrantXAxisTextFill = this.quadrantXAxisTextFill || this.primaryTextColor, this.quadrantYAxisTextFill = this.quadrantYAxisTextFill || this.primaryTextColor, this.quadrantInternalBorderStrokeFill = this.quadrantInternalBorderStrokeFill || this.primaryBorderColor, this.quadrantExternalBorderStrokeFill = this.quadrantExternalBorderStrokeFill || this.primaryBorderColor, this.quadrantTitleFill = this.quadrantTitleFill || this.primaryTextColor, this.xyChart = {
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
    }, this.requirementBackground = this.requirementBackground || this.primaryColor, this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor, this.requirementBorderSize = this.requirementBorderSize || "1", this.requirementTextColor = this.requirementTextColor || this.primaryTextColor, this.relationColor = this.relationColor || this.lineColor, this.relationLabelBackground = this.relationLabelBackground || this.edgeLabelBackground, this.relationLabelColor = this.relationLabelColor || this.actorTextColor, this.git0 = E(this.pie1, 25) || this.primaryColor, this.git1 = this.pie2 || this.secondaryColor, this.git2 = this.pie3 || this.tertiaryColor, this.git3 = this.pie4 || g(this.primaryColor, { h: -30 }), this.git4 = this.pie5 || g(this.primaryColor, { h: -60 }), this.git5 = this.pie6 || g(this.primaryColor, { h: -90 }), this.git6 = this.pie7 || g(this.primaryColor, { h: 60 }), this.git7 = this.pie8 || g(this.primaryColor, { h: 120 }), this.gitInv0 = this.gitInv0 || _(this.git0), this.gitInv1 = this.gitInv1 || _(this.git1), this.gitInv2 = this.gitInv2 || _(this.git2), this.gitInv3 = this.gitInv3 || _(this.git3), this.gitInv4 = this.gitInv4 || _(this.git4), this.gitInv5 = this.gitInv5 || _(this.git5), this.gitInv6 = this.gitInv6 || _(this.git6), this.gitInv7 = this.gitInv7 || _(this.git7), this.branchLabelColor = this.branchLabelColor || this.labelTextColor, this.gitBranchLabel0 = this.branchLabelColor, this.gitBranchLabel1 = "white", this.gitBranchLabel2 = this.branchLabelColor, this.gitBranchLabel3 = "white", this.gitBranchLabel4 = this.branchLabelColor, this.gitBranchLabel5 = this.branchLabelColor, this.gitBranchLabel6 = this.branchLabelColor, this.gitBranchLabel7 = this.branchLabelColor, this.tagLabelColor = this.tagLabelColor || this.primaryTextColor, this.tagLabelBackground = this.tagLabelBackground || this.primaryColor, this.tagLabelBorder = this.tagBorder || this.primaryBorderColor, this.tagLabelFontSize = this.tagLabelFontSize || "10px", this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor, this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor, this.commitLabelFontSize = this.commitLabelFontSize || "10px", this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || br, this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || Tr;
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
const xp = (t) => {
  const e = new Cp();
  return e.calculate(t), e;
}, Xt = {
  base: {
    getThemeVariables: fp
  },
  dark: {
    getThemeVariables: pp
  },
  default: {
    getThemeVariables: mp
  },
  forest: {
    getThemeVariables: _p
  },
  neutral: {
    getThemeVariables: xp
  }
}, Yt = {
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
}, za = {
  ...Yt,
  // Set, even though they're `undefined` so that `configKeys` finds these keys
  // TODO: Should we replace these with `null` so that they can go in the JSON Schema?
  deterministicIDSeed: void 0,
  themeCSS: void 0,
  // add non-JSON default config values
  themeVariables: Xt.default.getThemeVariables(),
  sequence: {
    ...Yt.sequence,
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
    ...Yt.gantt,
    tickInterval: void 0,
    useWidth: void 0
    // can probably be removed since `configKeys` already includes this
  },
  c4: {
    ...Yt.c4,
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
    ...Yt.pie,
    useWidth: 984
  },
  xyChart: {
    ...Yt.xyChart,
    useWidth: void 0
  },
  requirement: {
    ...Yt.requirement,
    useWidth: void 0
  },
  gitGraph: {
    ...Yt.gitGraph,
    // TODO: This is a temporary override for `gitGraph`, since every other
    //       diagram does have `useMaxWidth`, but instead sets it to `true`.
    //       Should we set this to `true` instead?
    useMaxWidth: !1
  },
  sankey: {
    ...Yt.sankey,
    // this is false, unlike every other diagram (other than gitGraph)
    // TODO: can we make this default to `true` instead?
    useMaxWidth: !1
  }
}, Wa = (t, e = "") => Object.keys(t).reduce((i, r) => Array.isArray(t[r]) ? i : typeof t[r] == "object" && t[r] !== null ? [...i, e + r, ...Wa(t[r], "")] : [...i, e + r], []), bp = new Set(Wa(za, "")), Tp = za, ir = (t) => {
  if (L.debug("sanitizeDirective called with", t), !(typeof t != "object" || t == null)) {
    if (Array.isArray(t)) {
      t.forEach((e) => ir(e));
      return;
    }
    for (const e of Object.keys(t)) {
      if (L.debug("Checking key", e), e.startsWith("__") || e.includes("proto") || e.includes("constr") || !bp.has(e) || t[e] == null) {
        L.debug("sanitize deleting key: ", e), delete t[e];
        continue;
      }
      if (typeof t[e] == "object") {
        L.debug("sanitizing object", e), ir(t[e]);
        continue;
      }
      const i = ["themeCSS", "fontFamily", "altFontFamily"];
      for (const r of i)
        e.includes(r) && (L.debug("sanitizing css option", e), t[e] = kp(t[e]));
    }
    if (t.themeVariables)
      for (const e of Object.keys(t.themeVariables)) {
        const i = t.themeVariables[e];
        i != null && i.match && !i.match(/^[\d "#%(),.;A-Za-z]+$/) && (t.themeVariables[e] = "");
      }
    L.debug("After sanitization", t);
  }
}, kp = (t) => {
  let e = 0, i = 0;
  for (const r of t) {
    if (e < i)
      return "{ /* ERROR: Unbalanced CSS */ }";
    r === "{" ? e++ : r === "}" && i++;
  }
  return e !== i ? "{ /* ERROR: Unbalanced CSS */ }" : t;
}, Ha = /^-{3}\s*[\n\r](.*?)[\n\r]-{3}\s*[\n\r]+/s, ii = /%{2}{\s*(?:(\w+)\s*:|(\w+))\s*(?:(\w+)|((?:(?!}%{2}).|\r?\n)*))?\s*(?:}%{2})?/gi, Sp = /\s*%%.*\n/gm;
class ja extends Error {
  constructor(e) {
    super(e), this.name = "UnknownDiagramError";
  }
}
const Oe = {}, kr = function(t, e) {
  t = t.replace(Ha, "").replace(ii, "").replace(Sp, `
`);
  for (const [i, { detector: r }] of Object.entries(Oe))
    if (r(t, e))
      return i;
  throw new ja(
    `No diagram type detected matching given configuration for text: ${t}`
  );
}, Ua = (...t) => {
  for (const { id: e, detector: i, loader: r } of t)
    Ya(e, i, r);
}, Ya = (t, e, i) => {
  Oe[t] ? L.error(`Detector with key ${t} already exists`) : Oe[t] = { detector: e, loader: i }, L.debug(`Detector with key ${t} added${i ? " with loader" : ""}`);
}, vp = (t) => Oe[t].loader, pn = (t, e, { depth: i = 2, clobber: r = !1 } = {}) => {
  const n = { depth: i, clobber: r };
  return Array.isArray(e) && !Array.isArray(t) ? (e.forEach((o) => pn(t, o, n)), t) : Array.isArray(e) && Array.isArray(t) ? (e.forEach((o) => {
    t.includes(o) || t.push(o);
  }), t) : t === void 0 || i <= 0 ? t != null && typeof t == "object" && typeof e == "object" ? Object.assign(t, e) : e : (e !== void 0 && typeof t == "object" && typeof e == "object" && Object.keys(e).forEach((o) => {
    typeof e[o] == "object" && (t[o] === void 0 || typeof t[o] == "object") ? (t[o] === void 0 && (t[o] = Array.isArray(e[o]) ? [] : {}), t[o] = pn(t[o], e[o], { depth: i - 1, clobber: r })) : (r || typeof t[o] != "object" && typeof e[o] != "object") && (t[o] = e[o]);
  }), t);
}, ot = pn;
var wp = typeof global == "object" && global && global.Object === Object && global;
const Ga = wp;
var Bp = typeof self == "object" && self && self.Object === Object && self, Fp = Ga || Bp || Function("return this")();
const qt = Fp;
var Ap = qt.Symbol;
const rr = Ap;
var Va = Object.prototype, Lp = Va.hasOwnProperty, Ep = Va.toString, Ke = rr ? rr.toStringTag : void 0;
function Mp(t) {
  var e = Lp.call(t, Ke), i = t[Ke];
  try {
    t[Ke] = void 0;
    var r = !0;
  } catch {
  }
  var n = Ep.call(t);
  return r && (e ? t[Ke] = i : delete t[Ke]), n;
}
var Op = Object.prototype, $p = Op.toString;
function Ip(t) {
  return $p.call(t);
}
var Dp = "[object Null]", Np = "[object Undefined]", as = rr ? rr.toStringTag : void 0;
function Re(t) {
  return t == null ? t === void 0 ? Np : Dp : as && as in Object(t) ? Mp(t) : Ip(t);
}
function _e(t) {
  var e = typeof t;
  return t != null && (e == "object" || e == "function");
}
var Rp = "[object AsyncFunction]", Pp = "[object Function]", qp = "[object GeneratorFunction]", zp = "[object Proxy]";
function Pn(t) {
  if (!_e(t))
    return !1;
  var e = Re(t);
  return e == Pp || e == qp || e == Rp || e == zp;
}
var Wp = qt["__core-js_shared__"];
const Vr = Wp;
var ls = function() {
  var t = /[^.]+$/.exec(Vr && Vr.keys && Vr.keys.IE_PROTO || "");
  return t ? "Symbol(src)_1." + t : "";
}();
function Hp(t) {
  return !!ls && ls in t;
}
var jp = Function.prototype, Up = jp.toString;
function Ce(t) {
  if (t != null) {
    try {
      return Up.call(t);
    } catch {
    }
    try {
      return t + "";
    } catch {
    }
  }
  return "";
}
var Yp = /[\\^$.*+?()[\]{}|]/g, Gp = /^\[object .+?Constructor\]$/, Vp = Function.prototype, Xp = Object.prototype, Kp = Vp.toString, Zp = Xp.hasOwnProperty, Jp = RegExp(
  "^" + Kp.call(Zp).replace(Yp, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Qp(t) {
  if (!_e(t) || Hp(t))
    return !1;
  var e = Pn(t) ? Jp : Gp;
  return e.test(Ce(t));
}
function tg(t, e) {
  return t == null ? void 0 : t[e];
}
function xe(t, e) {
  var i = tg(t, e);
  return Qp(i) ? i : void 0;
}
var eg = xe(Object, "create");
const ui = eg;
function ig() {
  this.__data__ = ui ? ui(null) : {}, this.size = 0;
}
function rg(t) {
  var e = this.has(t) && delete this.__data__[t];
  return this.size -= e ? 1 : 0, e;
}
var ng = "__lodash_hash_undefined__", og = Object.prototype, sg = og.hasOwnProperty;
function ag(t) {
  var e = this.__data__;
  if (ui) {
    var i = e[t];
    return i === ng ? void 0 : i;
  }
  return sg.call(e, t) ? e[t] : void 0;
}
var lg = Object.prototype, hg = lg.hasOwnProperty;
function cg(t) {
  var e = this.__data__;
  return ui ? e[t] !== void 0 : hg.call(e, t);
}
var ug = "__lodash_hash_undefined__";
function fg(t, e) {
  var i = this.__data__;
  return this.size += this.has(t) ? 0 : 1, i[t] = ui && e === void 0 ? ug : e, this;
}
function me(t) {
  var e = -1, i = t == null ? 0 : t.length;
  for (this.clear(); ++e < i; ) {
    var r = t[e];
    this.set(r[0], r[1]);
  }
}
me.prototype.clear = ig;
me.prototype.delete = rg;
me.prototype.get = ag;
me.prototype.has = cg;
me.prototype.set = fg;
function dg() {
  this.__data__ = [], this.size = 0;
}
function Sr(t, e) {
  return t === e || t !== t && e !== e;
}
function vr(t, e) {
  for (var i = t.length; i--; )
    if (Sr(t[i][0], e))
      return i;
  return -1;
}
var pg = Array.prototype, gg = pg.splice;
function mg(t) {
  var e = this.__data__, i = vr(e, t);
  if (i < 0)
    return !1;
  var r = e.length - 1;
  return i == r ? e.pop() : gg.call(e, i, 1), --this.size, !0;
}
function yg(t) {
  var e = this.__data__, i = vr(e, t);
  return i < 0 ? void 0 : e[i][1];
}
function _g(t) {
  return vr(this.__data__, t) > -1;
}
function Cg(t, e) {
  var i = this.__data__, r = vr(i, t);
  return r < 0 ? (++this.size, i.push([t, e])) : i[r][1] = e, this;
}
function Zt(t) {
  var e = -1, i = t == null ? 0 : t.length;
  for (this.clear(); ++e < i; ) {
    var r = t[e];
    this.set(r[0], r[1]);
  }
}
Zt.prototype.clear = dg;
Zt.prototype.delete = mg;
Zt.prototype.get = yg;
Zt.prototype.has = _g;
Zt.prototype.set = Cg;
var xg = xe(qt, "Map");
const fi = xg;
function bg() {
  this.size = 0, this.__data__ = {
    hash: new me(),
    map: new (fi || Zt)(),
    string: new me()
  };
}
function Tg(t) {
  var e = typeof t;
  return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? t !== "__proto__" : t === null;
}
function wr(t, e) {
  var i = t.__data__;
  return Tg(e) ? i[typeof e == "string" ? "string" : "hash"] : i.map;
}
function kg(t) {
  var e = wr(this, t).delete(t);
  return this.size -= e ? 1 : 0, e;
}
function Sg(t) {
  return wr(this, t).get(t);
}
function vg(t) {
  return wr(this, t).has(t);
}
function wg(t, e) {
  var i = wr(this, t), r = i.size;
  return i.set(t, e), this.size += i.size == r ? 0 : 1, this;
}
function se(t) {
  var e = -1, i = t == null ? 0 : t.length;
  for (this.clear(); ++e < i; ) {
    var r = t[e];
    this.set(r[0], r[1]);
  }
}
se.prototype.clear = bg;
se.prototype.delete = kg;
se.prototype.get = Sg;
se.prototype.has = vg;
se.prototype.set = wg;
var Bg = "Expected a function";
function xi(t, e) {
  if (typeof t != "function" || e != null && typeof e != "function")
    throw new TypeError(Bg);
  var i = function() {
    var r = arguments, n = e ? e.apply(this, r) : r[0], o = i.cache;
    if (o.has(n))
      return o.get(n);
    var s = t.apply(this, r);
    return i.cache = o.set(n, s) || o, s;
  };
  return i.cache = new (xi.Cache || se)(), i;
}
xi.Cache = se;
function Fg() {
  this.__data__ = new Zt(), this.size = 0;
}
function Ag(t) {
  var e = this.__data__, i = e.delete(t);
  return this.size = e.size, i;
}
function Lg(t) {
  return this.__data__.get(t);
}
function Eg(t) {
  return this.__data__.has(t);
}
var Mg = 200;
function Og(t, e) {
  var i = this.__data__;
  if (i instanceof Zt) {
    var r = i.__data__;
    if (!fi || r.length < Mg - 1)
      return r.push([t, e]), this.size = ++i.size, this;
    i = this.__data__ = new se(r);
  }
  return i.set(t, e), this.size = i.size, this;
}
function Pe(t) {
  var e = this.__data__ = new Zt(t);
  this.size = e.size;
}
Pe.prototype.clear = Fg;
Pe.prototype.delete = Ag;
Pe.prototype.get = Lg;
Pe.prototype.has = Eg;
Pe.prototype.set = Og;
var $g = function() {
  try {
    var t = xe(Object, "defineProperty");
    return t({}, "", {}), t;
  } catch {
  }
}();
const nr = $g;
function qn(t, e, i) {
  e == "__proto__" && nr ? nr(t, e, {
    configurable: !0,
    enumerable: !0,
    value: i,
    writable: !0
  }) : t[e] = i;
}
function gn(t, e, i) {
  (i !== void 0 && !Sr(t[e], i) || i === void 0 && !(e in t)) && qn(t, e, i);
}
function Ig(t) {
  return function(e, i, r) {
    for (var n = -1, o = Object(e), s = r(e), a = s.length; a--; ) {
      var l = s[t ? a : ++n];
      if (i(o[l], l, o) === !1)
        break;
    }
    return e;
  };
}
var Dg = Ig();
const Ng = Dg;
var Xa = typeof exports == "object" && exports && !exports.nodeType && exports, hs = Xa && typeof module == "object" && module && !module.nodeType && module, Rg = hs && hs.exports === Xa, cs = Rg ? qt.Buffer : void 0, us = cs ? cs.allocUnsafe : void 0;
function Pg(t, e) {
  if (e)
    return t.slice();
  var i = t.length, r = us ? us(i) : new t.constructor(i);
  return t.copy(r), r;
}
var qg = qt.Uint8Array;
const fs = qg;
function zg(t) {
  var e = new t.constructor(t.byteLength);
  return new fs(e).set(new fs(t)), e;
}
function Wg(t, e) {
  var i = e ? zg(t.buffer) : t.buffer;
  return new t.constructor(i, t.byteOffset, t.length);
}
function Hg(t, e) {
  var i = -1, r = t.length;
  for (e || (e = Array(r)); ++i < r; )
    e[i] = t[i];
  return e;
}
var ds = Object.create, jg = function() {
  function t() {
  }
  return function(e) {
    if (!_e(e))
      return {};
    if (ds)
      return ds(e);
    t.prototype = e;
    var i = new t();
    return t.prototype = void 0, i;
  };
}();
const Ug = jg;
function Ka(t, e) {
  return function(i) {
    return t(e(i));
  };
}
var Yg = Ka(Object.getPrototypeOf, Object);
const Za = Yg;
var Gg = Object.prototype;
function Br(t) {
  var e = t && t.constructor, i = typeof e == "function" && e.prototype || Gg;
  return t === i;
}
function Vg(t) {
  return typeof t.constructor == "function" && !Br(t) ? Ug(Za(t)) : {};
}
function bi(t) {
  return t != null && typeof t == "object";
}
var Xg = "[object Arguments]";
function ps(t) {
  return bi(t) && Re(t) == Xg;
}
var Ja = Object.prototype, Kg = Ja.hasOwnProperty, Zg = Ja.propertyIsEnumerable, Jg = ps(function() {
  return arguments;
}()) ? ps : function(t) {
  return bi(t) && Kg.call(t, "callee") && !Zg.call(t, "callee");
};
const or = Jg;
var Qg = Array.isArray;
const sr = Qg;
var tm = 9007199254740991;
function Qa(t) {
  return typeof t == "number" && t > -1 && t % 1 == 0 && t <= tm;
}
function Fr(t) {
  return t != null && Qa(t.length) && !Pn(t);
}
function em(t) {
  return bi(t) && Fr(t);
}
function im() {
  return !1;
}
var tl = typeof exports == "object" && exports && !exports.nodeType && exports, gs = tl && typeof module == "object" && module && !module.nodeType && module, rm = gs && gs.exports === tl, ms = rm ? qt.Buffer : void 0, nm = ms ? ms.isBuffer : void 0, om = nm || im;
const zn = om;
var sm = "[object Object]", am = Function.prototype, lm = Object.prototype, el = am.toString, hm = lm.hasOwnProperty, cm = el.call(Object);
function um(t) {
  if (!bi(t) || Re(t) != sm)
    return !1;
  var e = Za(t);
  if (e === null)
    return !0;
  var i = hm.call(e, "constructor") && e.constructor;
  return typeof i == "function" && i instanceof i && el.call(i) == cm;
}
var fm = "[object Arguments]", dm = "[object Array]", pm = "[object Boolean]", gm = "[object Date]", mm = "[object Error]", ym = "[object Function]", _m = "[object Map]", Cm = "[object Number]", xm = "[object Object]", bm = "[object RegExp]", Tm = "[object Set]", km = "[object String]", Sm = "[object WeakMap]", vm = "[object ArrayBuffer]", wm = "[object DataView]", Bm = "[object Float32Array]", Fm = "[object Float64Array]", Am = "[object Int8Array]", Lm = "[object Int16Array]", Em = "[object Int32Array]", Mm = "[object Uint8Array]", Om = "[object Uint8ClampedArray]", $m = "[object Uint16Array]", Im = "[object Uint32Array]", X = {};
X[Bm] = X[Fm] = X[Am] = X[Lm] = X[Em] = X[Mm] = X[Om] = X[$m] = X[Im] = !0;
X[fm] = X[dm] = X[vm] = X[pm] = X[wm] = X[gm] = X[mm] = X[ym] = X[_m] = X[Cm] = X[xm] = X[bm] = X[Tm] = X[km] = X[Sm] = !1;
function Dm(t) {
  return bi(t) && Qa(t.length) && !!X[Re(t)];
}
function Nm(t) {
  return function(e) {
    return t(e);
  };
}
var il = typeof exports == "object" && exports && !exports.nodeType && exports, ri = il && typeof module == "object" && module && !module.nodeType && module, Rm = ri && ri.exports === il, Xr = Rm && Ga.process, Pm = function() {
  try {
    var t = ri && ri.require && ri.require("util").types;
    return t || Xr && Xr.binding && Xr.binding("util");
  } catch {
  }
}();
const ys = Pm;
var _s = ys && ys.isTypedArray, qm = _s ? Nm(_s) : Dm;
const Wn = qm;
function mn(t, e) {
  if (!(e === "constructor" && typeof t[e] == "function") && e != "__proto__")
    return t[e];
}
var zm = Object.prototype, Wm = zm.hasOwnProperty;
function Hm(t, e, i) {
  var r = t[e];
  (!(Wm.call(t, e) && Sr(r, i)) || i === void 0 && !(e in t)) && qn(t, e, i);
}
function jm(t, e, i, r) {
  var n = !i;
  i || (i = {});
  for (var o = -1, s = e.length; ++o < s; ) {
    var a = e[o], l = r ? r(i[a], t[a], a, i, t) : void 0;
    l === void 0 && (l = t[a]), n ? qn(i, a, l) : Hm(i, a, l);
  }
  return i;
}
function Um(t, e) {
  for (var i = -1, r = Array(t); ++i < t; )
    r[i] = e(i);
  return r;
}
var Ym = 9007199254740991, Gm = /^(?:0|[1-9]\d*)$/;
function rl(t, e) {
  var i = typeof t;
  return e = e ?? Ym, !!e && (i == "number" || i != "symbol" && Gm.test(t)) && t > -1 && t % 1 == 0 && t < e;
}
var Vm = Object.prototype, Xm = Vm.hasOwnProperty;
function Km(t, e) {
  var i = sr(t), r = !i && or(t), n = !i && !r && zn(t), o = !i && !r && !n && Wn(t), s = i || r || n || o, a = s ? Um(t.length, String) : [], l = a.length;
  for (var h in t)
    (e || Xm.call(t, h)) && !(s && // Safari 9 has enumerable `arguments.length` in strict mode.
    (h == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    n && (h == "offset" || h == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    o && (h == "buffer" || h == "byteLength" || h == "byteOffset") || // Skip index properties.
    rl(h, l))) && a.push(h);
  return a;
}
function Zm(t) {
  var e = [];
  if (t != null)
    for (var i in Object(t))
      e.push(i);
  return e;
}
var Jm = Object.prototype, Qm = Jm.hasOwnProperty;
function t0(t) {
  if (!_e(t))
    return Zm(t);
  var e = Br(t), i = [];
  for (var r in t)
    r == "constructor" && (e || !Qm.call(t, r)) || i.push(r);
  return i;
}
function nl(t) {
  return Fr(t) ? Km(t, !0) : t0(t);
}
function e0(t) {
  return jm(t, nl(t));
}
function i0(t, e, i, r, n, o, s) {
  var a = mn(t, i), l = mn(e, i), h = s.get(l);
  if (h) {
    gn(t, i, h);
    return;
  }
  var u = o ? o(a, l, i + "", t, e, s) : void 0, f = u === void 0;
  if (f) {
    var c = sr(l), p = !c && zn(l), m = !c && !p && Wn(l);
    u = l, c || p || m ? sr(a) ? u = a : em(a) ? u = Hg(a) : p ? (f = !1, u = Pg(l, !0)) : m ? (f = !1, u = Wg(l, !0)) : u = [] : um(l) || or(l) ? (u = a, or(a) ? u = e0(a) : (!_e(a) || Pn(a)) && (u = Vg(l))) : f = !1;
  }
  f && (s.set(l, u), n(u, l, r, o, s), s.delete(l)), gn(t, i, u);
}
function ol(t, e, i, r, n) {
  t !== e && Ng(e, function(o, s) {
    if (n || (n = new Pe()), _e(o))
      i0(t, e, s, i, ol, r, n);
    else {
      var a = r ? r(mn(t, s), o, s + "", t, e, n) : void 0;
      a === void 0 && (a = o), gn(t, s, a);
    }
  }, nl);
}
function sl(t) {
  return t;
}
function r0(t, e, i) {
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
var Cs = Math.max;
function n0(t, e, i) {
  return e = Cs(e === void 0 ? t.length - 1 : e, 0), function() {
    for (var r = arguments, n = -1, o = Cs(r.length - e, 0), s = Array(o); ++n < o; )
      s[n] = r[e + n];
    n = -1;
    for (var a = Array(e + 1); ++n < e; )
      a[n] = r[n];
    return a[e] = i(s), r0(t, this, a);
  };
}
function o0(t) {
  return function() {
    return t;
  };
}
var s0 = nr ? function(t, e) {
  return nr(t, "toString", {
    configurable: !0,
    enumerable: !1,
    value: o0(e),
    writable: !0
  });
} : sl;
const a0 = s0;
var l0 = 800, h0 = 16, c0 = Date.now;
function u0(t) {
  var e = 0, i = 0;
  return function() {
    var r = c0(), n = h0 - (r - i);
    if (i = r, n > 0) {
      if (++e >= l0)
        return arguments[0];
    } else
      e = 0;
    return t.apply(void 0, arguments);
  };
}
var f0 = u0(a0);
const d0 = f0;
function p0(t, e) {
  return d0(n0(t, e, sl), t + "");
}
function g0(t, e, i) {
  if (!_e(i))
    return !1;
  var r = typeof e;
  return (r == "number" ? Fr(i) && rl(e, i.length) : r == "string" && e in i) ? Sr(i[e], t) : !1;
}
function m0(t) {
  return p0(function(e, i) {
    var r = -1, n = i.length, o = n > 1 ? i[n - 1] : void 0, s = n > 2 ? i[2] : void 0;
    for (o = t.length > 3 && typeof o == "function" ? (n--, o) : void 0, s && g0(i[0], i[1], s) && (o = n < 3 ? void 0 : o, n = 1), e = Object(e); ++r < n; ) {
      var a = i[r];
      a && t(e, a, r, o);
    }
    return e;
  });
}
var y0 = m0(function(t, e, i) {
  ol(t, e, i);
});
const _0 = y0, C0 = "​", x0 = {
  curveBasis: jf,
  curveBasisClosed: Uf,
  curveBasisOpen: Yf,
  curveBumpX: Wf,
  curveBumpY: Hf,
  curveBundle: Gf,
  curveCardinalClosed: Xf,
  curveCardinalOpen: Kf,
  curveCardinal: Vf,
  curveCatmullRomClosed: Jf,
  curveCatmullRomOpen: Qf,
  curveCatmullRom: Zf,
  curveLinear: zf,
  curveLinearClosed: td,
  curveMonotoneX: ed,
  curveMonotoneY: id,
  curveNatural: rd,
  curveStep: nd,
  curveStepAfter: sd,
  curveStepBefore: od
}, b0 = /\s*(?:(\w+)(?=:):|(\w+))\s*(?:(\w+)|((?:(?!}%{2}).|\r?\n)*))?\s*(?:}%{2})?/gi, T0 = function(t, e) {
  const i = al(t, /(?:init\b)|(?:initialize\b)/);
  let r = {};
  if (Array.isArray(i)) {
    const s = i.map((a) => a.args);
    ir(s), r = ot(r, [...s]);
  } else
    r = i.args;
  if (!r)
    return;
  let n = kr(t, e);
  const o = "config";
  return r[o] !== void 0 && (n === "flowchart-v2" && (n = "flowchart"), r[n] = r[o], delete r[o]), r;
}, al = function(t, e = null) {
  try {
    const i = new RegExp(
      `[%]{2}(?![{]${b0.source})(?=[}][%]{2}).*
`,
      "ig"
    );
    t = t.trim().replace(i, "").replace(/'/gm, '"'), L.debug(
      `Detecting diagram directive${e !== null ? " type:" + e : ""} based on the text:${t}`
    );
    let r;
    const n = [];
    for (; (r = ii.exec(t)) !== null; )
      if (r.index === ii.lastIndex && ii.lastIndex++, r && !e || e && r[1] && r[1].match(e) || e && r[2] && r[2].match(e)) {
        const o = r[1] ? r[1] : r[2], s = r[3] ? r[3].trim() : r[4] ? JSON.parse(r[4].trim()) : null;
        n.push({ type: o, args: s });
      }
    return n.length === 0 ? { type: t, args: null } : n.length === 1 ? n[0] : n;
  } catch (i) {
    return L.error(
      `ERROR: ${i.message} - Unable to parse directive type: '${e}' based on the text: '${t}'`
    ), { type: void 0, args: null };
  }
}, k0 = function(t) {
  return t.replace(ii, "");
}, S0 = function(t, e) {
  for (const [i, r] of e.entries())
    if (r.match(t))
      return i;
  return -1;
};
function v0(t, e) {
  if (!t)
    return e;
  const i = `curve${t.charAt(0).toUpperCase() + t.slice(1)}`;
  return x0[i] ?? e;
}
function w0(t, e) {
  const i = t.trim();
  if (i)
    return e.securityLevel !== "loose" ? js.sanitizeUrl(i) : i;
}
const B0 = (t, ...e) => {
  const i = t.split("."), r = i.length - 1, n = i[r];
  let o = window;
  for (let s = 0; s < r; s++)
    if (o = o[i[s]], !o) {
      L.error(`Function name: ${t} not found in window`);
      return;
    }
  o[n](...e);
};
function ll(t, e) {
  return !t || !e ? 0 : Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2));
}
function F0(t) {
  let e, i = 0;
  t.forEach((n) => {
    i += ll(n, e), e = n;
  });
  const r = i / 2;
  return Hn(t, r);
}
function A0(t) {
  return t.length === 1 ? t[0] : F0(t);
}
const xs = (t, e = 2) => {
  const i = Math.pow(10, e);
  return Math.round(t * i) / i;
}, Hn = (t, e) => {
  let i, r = e;
  for (const n of t) {
    if (i) {
      const o = ll(n, i);
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
            x: xs((1 - s) * i.x + s * n.x, 5),
            y: xs((1 - s) * i.y + s * n.y, 5)
          };
      }
    }
    i = n;
  }
  throw new Error("Could not find a suitable point for the given distance");
}, L0 = (t, e, i) => {
  L.info(`our points ${JSON.stringify(e)}`), e[0] !== i && (e = e.reverse());
  const n = Hn(e, 25), o = t ? 10 : 5, s = Math.atan2(e[0].y - n.y, e[0].x - n.x), a = { x: 0, y: 0 };
  return a.x = Math.sin(s) * o + (e[0].x + n.x) / 2, a.y = -Math.cos(s) * o + (e[0].y + n.y) / 2, a;
};
function E0(t, e, i) {
  const r = structuredClone(i);
  L.info("our points", r), e !== "start_left" && e !== "start_right" && r.reverse();
  const n = 25 + t, o = Hn(r, n), s = 10 + t * 0.5, a = Math.atan2(r[0].y - o.y, r[0].x - o.x), l = { x: 0, y: 0 };
  return e === "start_left" ? (l.x = Math.sin(a + Math.PI) * s + (r[0].x + o.x) / 2, l.y = -Math.cos(a + Math.PI) * s + (r[0].y + o.y) / 2) : e === "end_right" ? (l.x = Math.sin(a - Math.PI) * s + (r[0].x + o.x) / 2 - 5, l.y = -Math.cos(a - Math.PI) * s + (r[0].y + o.y) / 2 - 5) : e === "end_left" ? (l.x = Math.sin(a) * s + (r[0].x + o.x) / 2 - 5, l.y = -Math.cos(a) * s + (r[0].y + o.y) / 2 - 5) : (l.x = Math.sin(a) * s + (r[0].x + o.x) / 2, l.y = -Math.cos(a) * s + (r[0].y + o.y) / 2), l;
}
function M0(t) {
  let e = "", i = "";
  for (const r of t)
    r !== void 0 && (r.startsWith("color:") || r.startsWith("text-align:") ? i = i + r + ";" : e = e + r + ";");
  return { style: e, labelStyle: i };
}
let bs = 0;
const O0 = () => (bs++, "id-" + Math.random().toString(36).substr(2, 12) + "-" + bs);
function $0(t) {
  let e = "";
  const i = "0123456789abcdef", r = i.length;
  for (let n = 0; n < t; n++)
    e += i.charAt(Math.floor(Math.random() * r));
  return e;
}
const I0 = (t) => $0(t.length), D0 = function() {
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
}, N0 = function(t, e) {
  const i = e.text.replace(Rn.lineBreakRegex, " "), [, r] = Un(e.fontSize), n = t.append("text");
  n.attr("x", e.x), n.attr("y", e.y), n.style("text-anchor", e.anchor), n.style("font-family", e.fontFamily), n.style("font-size", r), n.style("font-weight", e.fontWeight), n.attr("fill", e.fill), e.class !== void 0 && n.attr("class", e.class);
  const o = n.append("tspan");
  return o.attr("x", e.x + e.textMargin * 2), o.attr("fill", e.fill), o.text(i), n;
}, R0 = xi(
  (t, e, i) => {
    if (!t || (i = Object.assign(
      { fontSize: 12, fontWeight: 400, fontFamily: "Arial", joinWith: "<br/>" },
      i
    ), Rn.lineBreakRegex.test(t)))
      return t;
    const r = t.split(" "), n = [];
    let o = "";
    return r.forEach((s, a) => {
      const l = ar(`${s} `, i), h = ar(o, i);
      if (l > e) {
        const { hyphenatedStrings: c, remainingWord: p } = P0(s, e, "-", i);
        n.push(o, ...c), o = p;
      } else
        h + l >= e ? (n.push(o), o = s) : o = [o, s].filter(Boolean).join(" ");
      a + 1 === r.length && n.push(o);
    }), n.filter((s) => s !== "").join(i.joinWith);
  },
  (t, e, i) => `${t}${e}${i.fontSize}${i.fontWeight}${i.fontFamily}${i.joinWith}`
), P0 = xi(
  (t, e, i = "-", r) => {
    r = Object.assign(
      { fontSize: 12, fontWeight: 400, fontFamily: "Arial", margin: 0 },
      r
    );
    const n = [...t], o = [];
    let s = "";
    return n.forEach((a, l) => {
      const h = `${s}${a}`;
      if (ar(h, r) >= e) {
        const f = l + 1, c = n.length === f, p = `${h}${i}`;
        o.push(c ? h : p), s = "";
      } else
        s = h;
    }), { hyphenatedStrings: o, remainingWord: s };
  },
  (t, e, i = "-", r) => `${t}${e}${i}${r.fontSize}${r.fontWeight}${r.fontFamily}`
);
function q0(t, e) {
  return jn(t, e).height;
}
function ar(t, e) {
  return jn(t, e).width;
}
const jn = xi(
  (t, e) => {
    const { fontSize: i = 12, fontFamily: r = "Arial", fontWeight: n = 400 } = e;
    if (!t)
      return { width: 0, height: 0 };
    const [, o] = Un(i), s = ["sans-serif", r], a = t.split(Rn.lineBreakRegex), l = [], h = Tt("body");
    if (!h.remove)
      return { width: 0, height: 0, lineHeight: 0 };
    const u = h.append("svg");
    for (const c of s) {
      let p = 0;
      const m = { width: 0, height: 0, lineHeight: 0 };
      for (const k of a) {
        const O = D0();
        O.text = k || C0;
        const q = N0(u, O).style("font-size", o).style("font-weight", n).style("font-family", c), T = (q._groups || q)[0][0].getBBox();
        if (T.width === 0 && T.height === 0)
          throw new Error("svg element not in render tree");
        m.width = Math.round(Math.max(m.width, T.width)), p = Math.round(T.height), m.height += p, m.lineHeight = Math.round(Math.max(m.lineHeight, p));
      }
      l.push(m);
    }
    u.remove();
    const f = isNaN(l[1].height) || isNaN(l[1].width) || isNaN(l[1].lineHeight) || l[0].height > l[1].height && l[0].width > l[1].width && l[0].lineHeight > l[1].lineHeight ? 0 : 1;
    return l[f];
  },
  (t, e) => `${t}${e.fontSize}${e.fontWeight}${e.fontFamily}`
);
class z0 {
  constructor(e = !1, i) {
    this.count = 0, this.count = i ? i.length : 0, this.next = e ? () => this.count++ : () => Date.now();
  }
}
let $i;
const W0 = function(t) {
  return $i = $i || document.createElement("div"), t = escape(t).replace(/%26/g, "&").replace(/%23/g, "#").replace(/%3B/g, ";"), $i.innerHTML = t, unescape($i.textContent);
};
function hl(t) {
  return "str" in t;
}
const H0 = (t, e, i, r) => {
  var o;
  if (!r)
    return;
  const n = (o = t.node()) == null ? void 0 : o.getBBox();
  n && t.append("text").text(r).attr("x", n.x + n.width / 2).attr("y", -i).attr("class", e);
}, Un = (t) => {
  if (typeof t == "number")
    return [t, t + "px"];
  const e = parseInt(t ?? "", 10);
  return Number.isNaN(e) ? [void 0, void 0] : t === String(e) ? [e, t + "px"] : [e, t];
};
function cl(t, e) {
  return _0({}, t, e);
}
const ni = {
  assignWithDepth: ot,
  wrapLabel: R0,
  calculateTextHeight: q0,
  calculateTextWidth: ar,
  calculateTextDimensions: jn,
  cleanAndMerge: cl,
  detectInit: T0,
  detectDirective: al,
  isSubstringInArray: S0,
  interpolateToCurve: v0,
  calcLabelPosition: A0,
  calcCardinalityPosition: L0,
  calcTerminalLabelPosition: E0,
  formatUrl: w0,
  getStylesFromArray: M0,
  generateId: O0,
  random: I0,
  runFunc: B0,
  entityDecode: W0,
  insertTitle: H0,
  parseFontSize: Un,
  InitIDGenerator: z0
}, j0 = function(t) {
  let e = t;
  return e = e.replace(/style.*:\S*#.*;/g, function(i) {
    return i.substring(0, i.length - 1);
  }), e = e.replace(/classDef.*:\S*#.*;/g, function(i) {
    return i.substring(0, i.length - 1);
  }), e = e.replace(/#\w+;/g, function(i) {
    const r = i.substring(1, i.length - 1);
    return /^\+?\d+$/.test(r) ? "ﬂ°°" + r + "¶ß" : "ﬂ°" + r + "¶ß";
  }), e;
}, U0 = function(t) {
  return t.replace(/ﬂ°°/g, "&#").replace(/ﬂ°/g, "&").replace(/¶ß/g, ";");
};
var ul = "comm", fl = "rule", dl = "decl", Y0 = "@import", G0 = "@keyframes", V0 = "@layer", pl = Math.abs, Yn = String.fromCharCode;
function gl(t) {
  return t.trim();
}
function Hi(t, e, i) {
  return t.replace(e, i);
}
function X0(t, e, i) {
  return t.indexOf(e, i);
}
function di(t, e) {
  return t.charCodeAt(e) | 0;
}
function pi(t, e, i) {
  return t.slice(e, i);
}
function Gt(t) {
  return t.length;
}
function K0(t) {
  return t.length;
}
function Ii(t, e) {
  return e.push(t), t;
}
var Ar = 1, $e = 1, ml = 0, vt = 0, Z = 0, qe = "";
function Gn(t, e, i, r, n, o, s, a) {
  return { value: t, root: e, parent: i, type: r, props: n, children: o, line: Ar, column: $e, length: s, return: "", siblings: a };
}
function Z0() {
  return Z;
}
function J0() {
  return Z = vt > 0 ? di(qe, --vt) : 0, $e--, Z === 10 && ($e = 1, Ar--), Z;
}
function Et() {
  return Z = vt < ml ? di(qe, vt++) : 0, $e++, Z === 10 && ($e = 1, Ar++), Z;
}
function de() {
  return di(qe, vt);
}
function ji() {
  return vt;
}
function Lr(t, e) {
  return pi(qe, t, e);
}
function yn(t) {
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
function Q0(t) {
  return Ar = $e = 1, ml = Gt(qe = t), vt = 0, [];
}
function ty(t) {
  return qe = "", t;
}
function Kr(t) {
  return gl(Lr(vt - 1, _n(t === 91 ? t + 2 : t === 40 ? t + 1 : t)));
}
function ey(t) {
  for (; (Z = de()) && Z < 33; )
    Et();
  return yn(t) > 2 || yn(Z) > 3 ? "" : " ";
}
function iy(t, e) {
  for (; --e && Et() && !(Z < 48 || Z > 102 || Z > 57 && Z < 65 || Z > 70 && Z < 97); )
    ;
  return Lr(t, ji() + (e < 6 && de() == 32 && Et() == 32));
}
function _n(t) {
  for (; Et(); )
    switch (Z) {
      case t:
        return vt;
      case 34:
      case 39:
        t !== 34 && t !== 39 && _n(Z);
        break;
      case 40:
        t === 41 && _n(t);
        break;
      case 92:
        Et();
        break;
    }
  return vt;
}
function ry(t, e) {
  for (; Et() && t + Z !== 47 + 10; )
    if (t + Z === 42 + 42 && de() === 47)
      break;
  return "/*" + Lr(e, vt - 1) + "*" + Yn(t === 47 ? t : Et());
}
function ny(t) {
  for (; !yn(de()); )
    Et();
  return Lr(t, vt);
}
function oy(t) {
  return ty(Ui("", null, null, null, [""], t = Q0(t), 0, [0], t));
}
function Ui(t, e, i, r, n, o, s, a, l) {
  for (var h = 0, u = 0, f = s, c = 0, p = 0, m = 0, k = 1, O = 1, q = 1, T = 0, U = "", W = n, G = o, V = r, H = U; O; )
    switch (m = T, T = Et()) {
      case 40:
        if (m != 108 && di(H, f - 1) == 58) {
          X0(H += Hi(Kr(T), "&", "&\f"), "&\f", pl(h ? a[h - 1] : 0)) != -1 && (q = -1);
          break;
        }
      case 34:
      case 39:
      case 91:
        H += Kr(T);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        H += ey(m);
        break;
      case 92:
        H += iy(ji() - 1, 7);
        continue;
      case 47:
        switch (de()) {
          case 42:
          case 47:
            Ii(sy(ry(Et(), ji()), e, i, l), l);
            break;
          default:
            H += "/";
        }
        break;
      case 123 * k:
        a[h++] = Gt(H) * q;
      case 125 * k:
      case 59:
      case 0:
        switch (T) {
          case 0:
          case 125:
            O = 0;
          case 59 + u:
            q == -1 && (H = Hi(H, /\f/g, "")), p > 0 && Gt(H) - f && Ii(p > 32 ? ks(H + ";", r, i, f - 1, l) : ks(Hi(H, " ", "") + ";", r, i, f - 2, l), l);
            break;
          case 59:
            H += ";";
          default:
            if (Ii(V = Ts(H, e, i, h, u, n, a, U, W = [], G = [], f, o), o), T === 123)
              if (u === 0)
                Ui(H, e, V, V, W, o, f, a, G);
              else
                switch (c === 99 && di(H, 3) === 110 ? 100 : c) {
                  case 100:
                  case 108:
                  case 109:
                  case 115:
                    Ui(t, V, V, r && Ii(Ts(t, V, V, 0, 0, n, a, U, n, W = [], f, G), G), n, G, f, a, r ? W : G);
                    break;
                  default:
                    Ui(H, V, V, V, [""], G, 0, a, G);
                }
        }
        h = u = p = 0, k = q = 1, U = H = "", f = s;
        break;
      case 58:
        f = 1 + Gt(H), p = m;
      default:
        if (k < 1) {
          if (T == 123)
            --k;
          else if (T == 125 && k++ == 0 && J0() == 125)
            continue;
        }
        switch (H += Yn(T), T * k) {
          case 38:
            q = u > 0 ? 1 : (H += "\f", -1);
            break;
          case 44:
            a[h++] = (Gt(H) - 1) * q, q = 1;
            break;
          case 64:
            de() === 45 && (H += Kr(Et())), c = de(), u = f = Gt(U = H += ny(ji())), T++;
            break;
          case 45:
            m === 45 && Gt(H) == 2 && (k = 0);
        }
    }
  return o;
}
function Ts(t, e, i, r, n, o, s, a, l, h, u, f) {
  for (var c = n - 1, p = n === 0 ? o : [""], m = K0(p), k = 0, O = 0, q = 0; k < r; ++k)
    for (var T = 0, U = pi(t, c + 1, c = pl(O = s[k])), W = t; T < m; ++T)
      (W = gl(O > 0 ? p[T] + " " + U : Hi(U, /&\f/g, p[T]))) && (l[q++] = W);
  return Gn(t, e, i, n === 0 ? fl : a, l, h, u, f);
}
function sy(t, e, i, r) {
  return Gn(t, e, i, ul, Yn(Z0()), pi(t, 2, -2), 0, r);
}
function ks(t, e, i, r, n) {
  return Gn(t, e, i, dl, pi(t, 0, r), pi(t, r + 1, -1), r, n);
}
function Cn(t, e) {
  for (var i = "", r = 0; r < t.length; r++)
    i += e(t[r], r, t, e) || "";
  return i;
}
function ay(t, e, i, r) {
  switch (t.type) {
    case V0:
      if (t.children.length)
        break;
    case Y0:
    case dl:
      return t.return = t.return || t.value;
    case ul:
      return "";
    case G0:
      return t.return = t.value + "{" + Cn(t.children, r) + "}";
    case fl:
      if (!Gt(t.value = t.props.join(",")))
        return "";
  }
  return Gt(i = Cn(t.children, r)) ? t.return = t.value + "{" + i + "}" : "";
}
const Ss = "10.9.3", Ie = Object.freeze(Tp);
let dt = ot({}, Ie), yl, De = [], oi = ot({}, Ie);
const Er = (t, e) => {
  let i = ot({}, t), r = {};
  for (const n of e)
    xl(n), r = ot(r, n);
  if (i = ot(i, r), r.theme && r.theme in Xt) {
    const n = ot({}, yl), o = ot(
      n.themeVariables || {},
      r.themeVariables
    );
    i.theme && i.theme in Xt && (i.themeVariables = Xt[i.theme].getThemeVariables(o));
  }
  return oi = i, bl(oi), oi;
}, ly = (t) => (dt = ot({}, Ie), dt = ot(dt, t), t.theme && Xt[t.theme] && (dt.themeVariables = Xt[t.theme].getThemeVariables(t.themeVariables)), Er(dt, De), dt), hy = (t) => {
  yl = ot({}, t);
}, cy = (t) => (dt = ot(dt, t), Er(dt, De), dt), _l = () => ot({}, dt), Cl = (t) => (bl(t), ot(oi, t), Rt()), Rt = () => ot({}, oi), xl = (t) => {
  t && (["secure", ...dt.secure ?? []].forEach((e) => {
    Object.hasOwn(t, e) && (L.debug(`Denied attempt to modify a secure key ${e}`, t[e]), delete t[e]);
  }), Object.keys(t).forEach((e) => {
    e.startsWith("__") && delete t[e];
  }), Object.keys(t).forEach((e) => {
    typeof t[e] == "string" && (t[e].includes("<") || t[e].includes(">") || t[e].includes("url(data:")) && delete t[e], typeof t[e] == "object" && xl(t[e]);
  }));
}, uy = (t) => {
  ir(t), t.fontFamily && (!t.themeVariables || !t.themeVariables.fontFamily) && (t.themeVariables = { fontFamily: t.fontFamily }), De.push(t), Er(dt, De);
}, lr = (t = dt) => {
  De = [], Er(t, De);
}, fy = {
  LAZY_LOAD_DEPRECATED: "The configuration options lazyLoadedDiagrams and loadExternalDiagramsAtStartup are deprecated. Please use registerExternalDiagrams instead."
}, vs = {}, dy = (t) => {
  vs[t] || (L.warn(fy[t]), vs[t] = !0);
}, bl = (t) => {
  t && (t.lazyLoadedDiagrams || t.loadExternalDiagramsAtStartup) && dy("LAZY_LOAD_DEPRECATED");
}, Tl = "c4", py = (t) => /^\s*C4Context|C4Container|C4Component|C4Dynamic|C4Deployment/.test(t), gy = async () => {
  const { diagram: t } = await import("./c4Diagram-71b4987c.js");
  return { id: Tl, diagram: t };
}, my = {
  id: Tl,
  detector: py,
  loader: gy
}, yy = my, kl = "flowchart", _y = (t, e) => {
  var i, r;
  return ((i = e == null ? void 0 : e.flowchart) == null ? void 0 : i.defaultRenderer) === "dagre-wrapper" || ((r = e == null ? void 0 : e.flowchart) == null ? void 0 : r.defaultRenderer) === "elk" ? !1 : /^\s*graph/.test(t);
}, Cy = async () => {
  const { diagram: t } = await import("./flowDiagram-a0832dcd.js");
  return { id: kl, diagram: t };
}, xy = {
  id: kl,
  detector: _y,
  loader: Cy
}, by = xy, Sl = "flowchart-v2", Ty = (t, e) => {
  var i, r, n;
  return ((i = e == null ? void 0 : e.flowchart) == null ? void 0 : i.defaultRenderer) === "dagre-d3" || ((r = e == null ? void 0 : e.flowchart) == null ? void 0 : r.defaultRenderer) === "elk" ? !1 : /^\s*graph/.test(t) && ((n = e == null ? void 0 : e.flowchart) == null ? void 0 : n.defaultRenderer) === "dagre-wrapper" ? !0 : /^\s*flowchart/.test(t);
}, ky = async () => {
  const { diagram: t } = await import("./flowDiagram-v2-a90a998c.js");
  return { id: Sl, diagram: t };
}, Sy = {
  id: Sl,
  detector: Ty,
  loader: ky
}, vy = Sy, vl = "er", wy = (t) => /^\s*erDiagram/.test(t), By = async () => {
  const { diagram: t } = await import("./erDiagram-52ee5ed7.js");
  return { id: vl, diagram: t };
}, Fy = {
  id: vl,
  detector: wy,
  loader: By
}, Ay = Fy, wl = "gitGraph", Ly = (t) => /^\s*gitGraph/.test(t), Ey = async () => {
  const { diagram: t } = await import("./gitGraphDiagram-348475b8.js");
  return { id: wl, diagram: t };
}, My = {
  id: wl,
  detector: Ly,
  loader: Ey
}, Oy = My, Bl = "gantt", $y = (t) => /^\s*gantt/.test(t), Iy = async () => {
  const { diagram: t } = await import("./ganttDiagram-d3ab137f.js");
  return { id: Bl, diagram: t };
}, Dy = {
  id: Bl,
  detector: $y,
  loader: Iy
}, Ny = Dy, Fl = "info", Ry = (t) => /^\s*info/.test(t), Py = async () => {
  const { diagram: t } = await import("./infoDiagram-12c122cb.js");
  return { id: Fl, diagram: t };
}, qy = {
  id: Fl,
  detector: Ry,
  loader: Py
}, Al = "pie", zy = (t) => /^\s*pie/.test(t), Wy = async () => {
  const { diagram: t } = await import("./pieDiagram-2a61ad98.js");
  return { id: Al, diagram: t };
}, Hy = {
  id: Al,
  detector: zy,
  loader: Wy
}, Ll = "quadrantChart", jy = (t) => /^\s*quadrantChart/.test(t), Uy = async () => {
  const { diagram: t } = await import("./quadrantDiagram-97313f6a.js");
  return { id: Ll, diagram: t };
}, Yy = {
  id: Ll,
  detector: jy,
  loader: Uy
}, Gy = Yy, El = "xychart", Vy = (t) => /^\s*xychart-beta/.test(t), Xy = async () => {
  const { diagram: t } = await import("./xychartDiagram-024e42d6.js");
  return { id: El, diagram: t };
}, Ky = {
  id: El,
  detector: Vy,
  loader: Xy
}, Zy = Ky, Ml = "requirement", Jy = (t) => /^\s*requirement(Diagram)?/.test(t), Qy = async () => {
  const { diagram: t } = await import("./requirementDiagram-836c2e45.js");
  return { id: Ml, diagram: t };
}, t_ = {
  id: Ml,
  detector: Jy,
  loader: Qy
}, e_ = t_, Ol = "sequence", i_ = (t) => /^\s*sequenceDiagram/.test(t), r_ = async () => {
  const { diagram: t } = await import("./sequenceDiagram-819f4947.js");
  return { id: Ol, diagram: t };
}, n_ = {
  id: Ol,
  detector: i_,
  loader: r_
}, o_ = n_, $l = "class", s_ = (t, e) => {
  var i;
  return ((i = e == null ? void 0 : e.class) == null ? void 0 : i.defaultRenderer) === "dagre-wrapper" ? !1 : /^\s*classDiagram/.test(t);
}, a_ = async () => {
  const { diagram: t } = await import("./classDiagram-301cd207.js");
  return { id: $l, diagram: t };
}, l_ = {
  id: $l,
  detector: s_,
  loader: a_
}, h_ = l_, Il = "classDiagram", c_ = (t, e) => {
  var i;
  return /^\s*classDiagram/.test(t) && ((i = e == null ? void 0 : e.class) == null ? void 0 : i.defaultRenderer) === "dagre-wrapper" ? !0 : /^\s*classDiagram-v2/.test(t);
}, u_ = async () => {
  const { diagram: t } = await import("./classDiagram-v2-20d1e04b.js");
  return { id: Il, diagram: t };
}, f_ = {
  id: Il,
  detector: c_,
  loader: u_
}, d_ = f_, Dl = "state", p_ = (t, e) => {
  var i;
  return ((i = e == null ? void 0 : e.state) == null ? void 0 : i.defaultRenderer) === "dagre-wrapper" ? !1 : /^\s*stateDiagram/.test(t);
}, g_ = async () => {
  const { diagram: t } = await import("./stateDiagram-dc3cd90b.js");
  return { id: Dl, diagram: t };
}, m_ = {
  id: Dl,
  detector: p_,
  loader: g_
}, y_ = m_, Nl = "stateDiagram", __ = (t, e) => {
  var i;
  return !!(/^\s*stateDiagram-v2/.test(t) || /^\s*stateDiagram/.test(t) && ((i = e == null ? void 0 : e.state) == null ? void 0 : i.defaultRenderer) === "dagre-wrapper");
}, C_ = async () => {
  const { diagram: t } = await import("./stateDiagram-v2-734e0ec8.js");
  return { id: Nl, diagram: t };
}, x_ = {
  id: Nl,
  detector: __,
  loader: C_
}, b_ = x_, Rl = "journey", T_ = (t) => /^\s*journey/.test(t), k_ = async () => {
  const { diagram: t } = await import("./journeyDiagram-e798f4cb.js");
  return { id: Rl, diagram: t };
}, S_ = {
  id: Rl,
  detector: T_,
  loader: k_
}, v_ = S_, w_ = function(t, e) {
  for (let i of e)
    t.attr(i[0], i[1]);
}, B_ = function(t, e, i) {
  let r = /* @__PURE__ */ new Map();
  return i ? (r.set("width", "100%"), r.set("style", `max-width: ${e}px;`)) : (r.set("height", t), r.set("width", e)), r;
}, Pl = function(t, e, i, r) {
  const n = B_(e, i, r);
  w_(t, n);
}, F_ = function(t, e, i, r) {
  const n = e.node().getBBox(), o = n.width, s = n.height;
  L.info(`SVG bounds: ${o}x${s}`, n);
  let a = 0, l = 0;
  L.info(`Graph bounds: ${a}x${l}`, t), a = o + i * 2, l = s + i * 2, L.info(`Calculated bounds: ${a}x${l}`), Pl(e, l, a, r);
  const h = `${n.x - i} ${n.y - i} ${n.width + 2 * i} ${n.height + 2 * i}`;
  e.attr("viewBox", h);
}, Yi = {}, A_ = (t, e, i) => {
  let r = "";
  return t in Yi && Yi[t] ? r = Yi[t](i) : L.warn(`No theme found for ${t}`), ` & {
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
}, L_ = (t, e) => {
  e !== void 0 && (Yi[t] = e);
}, E_ = A_;
let Vn = "", Xn = "", Kn = "";
const Zn = (t) => ci(t, Rt()), M_ = () => {
  Vn = "", Kn = "", Xn = "";
}, O_ = (t) => {
  Vn = Zn(t).replace(/^\s+/g, "");
}, $_ = () => Vn, I_ = (t) => {
  Kn = Zn(t).replace(/\n\s+/g, `
`);
}, D_ = () => Kn, N_ = (t) => {
  Xn = Zn(t);
}, R_ = () => Xn, P_ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  clear: M_,
  getAccDescription: D_,
  getAccTitle: $_,
  getDiagramTitle: R_,
  setAccDescription: I_,
  setAccTitle: O_,
  setDiagramTitle: N_
}, Symbol.toStringTag, { value: "Module" })), q_ = L, z_ = vn, Jn = Rt, L1 = Cl, E1 = Ie, W_ = (t) => ci(t, Jn()), H_ = F_, j_ = () => P_, hr = {}, cr = (t, e, i) => {
  var r;
  if (hr[t])
    throw new Error(`Diagram ${t} already registered.`);
  hr[t] = e, i && Ya(t, i), L_(t, e.styles), (r = e.injectUtils) == null || r.call(
    e,
    q_,
    z_,
    Jn,
    W_,
    H_,
    j_(),
    () => {
    }
  );
}, Qn = (t) => {
  if (t in hr)
    return hr[t];
  throw new U_(t);
};
class U_ extends Error {
  constructor(e) {
    super(`Diagram ${e} not found.`);
  }
}
const Y_ = (t) => {
  var n;
  const { securityLevel: e } = Jn();
  let i = Tt("body");
  if (e === "sandbox") {
    const s = ((n = Tt(`#i${t}`).node()) == null ? void 0 : n.contentDocument) ?? document;
    i = Tt(s.body);
  }
  return i.select(`#${t}`);
}, G_ = (t, e, i) => {
  L.debug(`rendering svg for syntax error
`);
  const r = Y_(e), n = r.append("g");
  r.attr("viewBox", "0 0 2412 512"), Pl(r, 100, 512, !0), n.append("path").attr("class", "error-icon").attr(
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
}, ql = { draw: G_ }, V_ = ql, X_ = {
  db: {},
  renderer: ql,
  parser: {
    parser: { yy: {} },
    parse: () => {
    }
  }
}, K_ = X_, zl = "flowchart-elk", Z_ = (t, e) => {
  var i;
  return (
    // If diagram explicitly states flowchart-elk
    !!(/^\s*flowchart-elk/.test(t) || // If a flowchart/graph diagram has their default renderer set to elk
    /^\s*flowchart|graph/.test(t) && ((i = e == null ? void 0 : e.flowchart) == null ? void 0 : i.defaultRenderer) === "elk")
  );
}, J_ = async () => {
  const { diagram: t } = await import("./flowchart-elk-definition-fbe65b0a.js");
  return { id: zl, diagram: t };
}, Q_ = {
  id: zl,
  detector: Z_,
  loader: J_
}, tC = Q_, Wl = "timeline", eC = (t) => /^\s*timeline/.test(t), iC = async () => {
  const { diagram: t } = await import("./timeline-definition-1d5f75ec.js");
  return { id: Wl, diagram: t };
}, rC = {
  id: Wl,
  detector: eC,
  loader: iC
}, nC = rC, Hl = "mindmap", oC = (t) => /^\s*mindmap/.test(t), sC = async () => {
  const { diagram: t } = await import("./mindmap-definition-69d738f7.js");
  return { id: Hl, diagram: t };
}, aC = {
  id: Hl,
  detector: oC,
  loader: sC
}, lC = aC, jl = "sankey", hC = (t) => /^\s*sankey-beta/.test(t), cC = async () => {
  const { diagram: t } = await import("./sankeyDiagram-21c8b3a4.js");
  return { id: jl, diagram: t };
}, uC = {
  id: jl,
  detector: hC,
  loader: cC
}, fC = uC, Ul = "block", dC = (t) => /^\s*block-beta/.test(t), pC = async () => {
  const { diagram: t } = await import("./blockDiagram-325c0d7b.js");
  return { id: Ul, diagram: t };
}, gC = {
  id: Ul,
  detector: dC,
  loader: pC
}, mC = gC;
let ws = !1;
const to = () => {
  ws || (ws = !0, cr("error", K_, (t) => t.toLowerCase().trim() === "error"), cr(
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
  ), Ua(
    yy,
    d_,
    h_,
    Ay,
    Ny,
    qy,
    Hy,
    e_,
    o_,
    tC,
    vy,
    by,
    lC,
    nC,
    Oy,
    b_,
    y_,
    v_,
    Gy,
    fC,
    Zy,
    mC
  ));
};
class Yl {
  constructor(e, i = {}) {
    this.text = e, this.metadata = i, this.type = "graph", this.text = j0(e), this.text += `
`;
    const r = Rt();
    try {
      this.type = kr(e, r);
    } catch (o) {
      this.type = "error", this.detectError = o;
    }
    const n = Qn(this.type);
    L.debug("Type " + this.type), this.db = n.db, this.renderer = n.renderer, this.parser = n.parser, this.parser.parser.yy = this.db, this.init = n.init, this.parse();
  }
  parse() {
    var i, r, n, o, s;
    if (this.detectError)
      throw this.detectError;
    (r = (i = this.db).clear) == null || r.call(i);
    const e = Rt();
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
const yC = async (t, e = {}) => {
  const i = kr(t, Rt());
  try {
    Qn(i);
  } catch {
    const n = vp(i);
    if (!n)
      throw new ja(`Diagram ${i} not found.`);
    const { id: o, diagram: s } = await n();
    cr(o, s);
  }
  return new Yl(t, e);
};
let Bs = [];
const _C = () => {
  Bs.forEach((t) => {
    t();
  }), Bs = [];
};
var CC = Ka(Object.keys, Object);
const xC = CC;
var bC = Object.prototype, TC = bC.hasOwnProperty;
function kC(t) {
  if (!Br(t))
    return xC(t);
  var e = [];
  for (var i in Object(t))
    TC.call(t, i) && i != "constructor" && e.push(i);
  return e;
}
var SC = xe(qt, "DataView");
const xn = SC;
var vC = xe(qt, "Promise");
const bn = vC;
var wC = xe(qt, "Set");
const Tn = wC;
var BC = xe(qt, "WeakMap");
const kn = BC;
var Fs = "[object Map]", FC = "[object Object]", As = "[object Promise]", Ls = "[object Set]", Es = "[object WeakMap]", Ms = "[object DataView]", AC = Ce(xn), LC = Ce(fi), EC = Ce(bn), MC = Ce(Tn), OC = Ce(kn), ce = Re;
(xn && ce(new xn(new ArrayBuffer(1))) != Ms || fi && ce(new fi()) != Fs || bn && ce(bn.resolve()) != As || Tn && ce(new Tn()) != Ls || kn && ce(new kn()) != Es) && (ce = function(t) {
  var e = Re(t), i = e == FC ? t.constructor : void 0, r = i ? Ce(i) : "";
  if (r)
    switch (r) {
      case AC:
        return Ms;
      case LC:
        return Fs;
      case EC:
        return As;
      case MC:
        return Ls;
      case OC:
        return Es;
    }
  return e;
});
const $C = ce;
var IC = "[object Map]", DC = "[object Set]", NC = Object.prototype, RC = NC.hasOwnProperty;
function Zr(t) {
  if (t == null)
    return !0;
  if (Fr(t) && (sr(t) || typeof t == "string" || typeof t.splice == "function" || zn(t) || Wn(t) || or(t)))
    return !t.length;
  var e = $C(t);
  if (e == IC || e == DC)
    return !t.size;
  if (Br(t))
    return !kC(t).length;
  for (var i in t)
    if (RC.call(t, i))
      return !1;
  return !0;
}
const PC = "graphics-document document";
function qC(t, e) {
  t.attr("role", PC), e !== "" && t.attr("aria-roledescription", e);
}
function zC(t, e, i, r) {
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
const WC = (t) => t.replace(/^\s*%%(?!{)[^\n]+\n?/gm, "").trimStart();
/*! js-yaml 4.1.0 https://github.com/nodeca/js-yaml @license MIT */
function Gl(t) {
  return typeof t > "u" || t === null;
}
function HC(t) {
  return typeof t == "object" && t !== null;
}
function jC(t) {
  return Array.isArray(t) ? t : Gl(t) ? [] : [t];
}
function UC(t, e) {
  var i, r, n, o;
  if (e)
    for (o = Object.keys(e), i = 0, r = o.length; i < r; i += 1)
      n = o[i], t[n] = e[n];
  return t;
}
function YC(t, e) {
  var i = "", r;
  for (r = 0; r < e; r += 1)
    i += t;
  return i;
}
function GC(t) {
  return t === 0 && Number.NEGATIVE_INFINITY === 1 / t;
}
var VC = Gl, XC = HC, KC = jC, ZC = YC, JC = GC, QC = UC, ht = {
  isNothing: VC,
  isObject: XC,
  toArray: KC,
  repeat: ZC,
  isNegativeZero: JC,
  extend: QC
};
function Vl(t, e) {
  var i = "", r = t.reason || "(unknown reason)";
  return t.mark ? (t.mark.name && (i += 'in "' + t.mark.name + '" '), i += "(" + (t.mark.line + 1) + ":" + (t.mark.column + 1) + ")", !e && t.mark.snippet && (i += `

` + t.mark.snippet), r + " " + i) : r;
}
function gi(t, e) {
  Error.call(this), this.name = "YAMLException", this.reason = t, this.mark = e, this.message = Vl(this, !1), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack || "";
}
gi.prototype = Object.create(Error.prototype);
gi.prototype.constructor = gi;
gi.prototype.toString = function(e) {
  return this.name + ": " + Vl(this, e);
};
var Vt = gi;
function Jr(t, e, i, r, n) {
  var o = "", s = "", a = Math.floor(n / 2) - 1;
  return r - e > a && (o = " ... ", e = r - a + o.length), i - r > a && (s = " ...", i = r + a - s.length), {
    str: o + t.slice(e, i).replace(/\t/g, "→") + s,
    pos: r - e + o.length
    // relative position
  };
}
function Qr(t, e) {
  return ht.repeat(" ", e - t.length) + t;
}
function tx(t, e) {
  if (e = Object.create(e || null), !t.buffer)
    return null;
  e.maxLength || (e.maxLength = 79), typeof e.indent != "number" && (e.indent = 1), typeof e.linesBefore != "number" && (e.linesBefore = 3), typeof e.linesAfter != "number" && (e.linesAfter = 2);
  for (var i = /\r?\n|\r|\0/g, r = [0], n = [], o, s = -1; o = i.exec(t.buffer); )
    n.push(o.index), r.push(o.index + o[0].length), t.position <= o.index && s < 0 && (s = r.length - 2);
  s < 0 && (s = r.length - 1);
  var a = "", l, h, u = Math.min(t.line + e.linesAfter, n.length).toString().length, f = e.maxLength - (e.indent + u + 3);
  for (l = 1; l <= e.linesBefore && !(s - l < 0); l++)
    h = Jr(
      t.buffer,
      r[s - l],
      n[s - l],
      t.position - (r[s] - r[s - l]),
      f
    ), a = ht.repeat(" ", e.indent) + Qr((t.line - l + 1).toString(), u) + " | " + h.str + `
` + a;
  for (h = Jr(t.buffer, r[s], n[s], t.position, f), a += ht.repeat(" ", e.indent) + Qr((t.line + 1).toString(), u) + " | " + h.str + `
`, a += ht.repeat("-", e.indent + u + 3 + h.pos) + `^
`, l = 1; l <= e.linesAfter && !(s + l >= n.length); l++)
    h = Jr(
      t.buffer,
      r[s + l],
      n[s + l],
      t.position - (r[s] - r[s + l]),
      f
    ), a += ht.repeat(" ", e.indent) + Qr((t.line + l + 1).toString(), u) + " | " + h.str + `
`;
  return a.replace(/\n$/, "");
}
var ex = tx, ix = [
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
], rx = [
  "scalar",
  "sequence",
  "mapping"
];
function nx(t) {
  var e = {};
  return t !== null && Object.keys(t).forEach(function(i) {
    t[i].forEach(function(r) {
      e[String(r)] = i;
    });
  }), e;
}
function ox(t, e) {
  if (e = e || {}, Object.keys(e).forEach(function(i) {
    if (ix.indexOf(i) === -1)
      throw new Vt('Unknown option "' + i + '" is met in definition of "' + t + '" YAML type.');
  }), this.options = e, this.tag = t, this.kind = e.kind || null, this.resolve = e.resolve || function() {
    return !0;
  }, this.construct = e.construct || function(i) {
    return i;
  }, this.instanceOf = e.instanceOf || null, this.predicate = e.predicate || null, this.represent = e.represent || null, this.representName = e.representName || null, this.defaultStyle = e.defaultStyle || null, this.multi = e.multi || !1, this.styleAliases = nx(e.styleAliases || null), rx.indexOf(this.kind) === -1)
    throw new Vt('Unknown kind "' + this.kind + '" is specified for "' + t + '" YAML type.');
}
var st = ox;
function Os(t, e) {
  var i = [];
  return t[e].forEach(function(r) {
    var n = i.length;
    i.forEach(function(o, s) {
      o.tag === r.tag && o.kind === r.kind && o.multi === r.multi && (n = s);
    }), i[n] = r;
  }), i;
}
function sx() {
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
function Sn(t) {
  return this.extend(t);
}
Sn.prototype.extend = function(e) {
  var i = [], r = [];
  if (e instanceof st)
    r.push(e);
  else if (Array.isArray(e))
    r = r.concat(e);
  else if (e && (Array.isArray(e.implicit) || Array.isArray(e.explicit)))
    e.implicit && (i = i.concat(e.implicit)), e.explicit && (r = r.concat(e.explicit));
  else
    throw new Vt("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
  i.forEach(function(o) {
    if (!(o instanceof st))
      throw new Vt("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    if (o.loadKind && o.loadKind !== "scalar")
      throw new Vt("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
    if (o.multi)
      throw new Vt("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
  }), r.forEach(function(o) {
    if (!(o instanceof st))
      throw new Vt("Specified list of YAML types (or a single Type object) contains a non-Type object.");
  });
  var n = Object.create(Sn.prototype);
  return n.implicit = (this.implicit || []).concat(i), n.explicit = (this.explicit || []).concat(r), n.compiledImplicit = Os(n, "implicit"), n.compiledExplicit = Os(n, "explicit"), n.compiledTypeMap = sx(n.compiledImplicit, n.compiledExplicit), n;
};
var ax = Sn, lx = new st("tag:yaml.org,2002:str", {
  kind: "scalar",
  construct: function(t) {
    return t !== null ? t : "";
  }
}), hx = new st("tag:yaml.org,2002:seq", {
  kind: "sequence",
  construct: function(t) {
    return t !== null ? t : [];
  }
}), cx = new st("tag:yaml.org,2002:map", {
  kind: "mapping",
  construct: function(t) {
    return t !== null ? t : {};
  }
}), ux = new ax({
  explicit: [
    lx,
    hx,
    cx
  ]
});
function fx(t) {
  if (t === null)
    return !0;
  var e = t.length;
  return e === 1 && t === "~" || e === 4 && (t === "null" || t === "Null" || t === "NULL");
}
function dx() {
  return null;
}
function px(t) {
  return t === null;
}
var gx = new st("tag:yaml.org,2002:null", {
  kind: "scalar",
  resolve: fx,
  construct: dx,
  predicate: px,
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
function mx(t) {
  if (t === null)
    return !1;
  var e = t.length;
  return e === 4 && (t === "true" || t === "True" || t === "TRUE") || e === 5 && (t === "false" || t === "False" || t === "FALSE");
}
function yx(t) {
  return t === "true" || t === "True" || t === "TRUE";
}
function _x(t) {
  return Object.prototype.toString.call(t) === "[object Boolean]";
}
var Cx = new st("tag:yaml.org,2002:bool", {
  kind: "scalar",
  resolve: mx,
  construct: yx,
  predicate: _x,
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
function xx(t) {
  return 48 <= t && t <= 57 || 65 <= t && t <= 70 || 97 <= t && t <= 102;
}
function bx(t) {
  return 48 <= t && t <= 55;
}
function Tx(t) {
  return 48 <= t && t <= 57;
}
function kx(t) {
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
          if (!xx(t.charCodeAt(i)))
            return !1;
          r = !0;
        }
      return r && n !== "_";
    }
    if (n === "o") {
      for (i++; i < e; i++)
        if (n = t[i], n !== "_") {
          if (!bx(t.charCodeAt(i)))
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
      if (!Tx(t.charCodeAt(i)))
        return !1;
      r = !0;
    }
  return !(!r || n === "_");
}
function Sx(t) {
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
function vx(t) {
  return Object.prototype.toString.call(t) === "[object Number]" && t % 1 === 0 && !ht.isNegativeZero(t);
}
var wx = new st("tag:yaml.org,2002:int", {
  kind: "scalar",
  resolve: kx,
  construct: Sx,
  predicate: vx,
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
}), Bx = new RegExp(
  // 2.5e4, 2.5 and integers
  "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
);
function Fx(t) {
  return !(t === null || !Bx.test(t) || // Quick hack to not allow integers end with `_`
  // Probably should update regexp & check speed
  t[t.length - 1] === "_");
}
function Ax(t) {
  var e, i;
  return e = t.replace(/_/g, "").toLowerCase(), i = e[0] === "-" ? -1 : 1, "+-".indexOf(e[0]) >= 0 && (e = e.slice(1)), e === ".inf" ? i === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : e === ".nan" ? NaN : i * parseFloat(e, 10);
}
var Lx = /^[-+]?[0-9]+e/;
function Ex(t, e) {
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
  else if (ht.isNegativeZero(t))
    return "-0.0";
  return i = t.toString(10), Lx.test(i) ? i.replace("e", ".e") : i;
}
function Mx(t) {
  return Object.prototype.toString.call(t) === "[object Number]" && (t % 1 !== 0 || ht.isNegativeZero(t));
}
var Ox = new st("tag:yaml.org,2002:float", {
  kind: "scalar",
  resolve: Fx,
  construct: Ax,
  predicate: Mx,
  represent: Ex,
  defaultStyle: "lowercase"
}), Xl = ux.extend({
  implicit: [
    gx,
    Cx,
    wx,
    Ox
  ]
}), $x = Xl, Kl = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
), Zl = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
);
function Ix(t) {
  return t === null ? !1 : Kl.exec(t) !== null || Zl.exec(t) !== null;
}
function Dx(t) {
  var e, i, r, n, o, s, a, l = 0, h = null, u, f, c;
  if (e = Kl.exec(t), e === null && (e = Zl.exec(t)), e === null)
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
function Nx(t) {
  return t.toISOString();
}
var Rx = new st("tag:yaml.org,2002:timestamp", {
  kind: "scalar",
  resolve: Ix,
  construct: Dx,
  instanceOf: Date,
  represent: Nx
});
function Px(t) {
  return t === "<<" || t === null;
}
var qx = new st("tag:yaml.org,2002:merge", {
  kind: "scalar",
  resolve: Px
}), eo = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
function zx(t) {
  if (t === null)
    return !1;
  var e, i, r = 0, n = t.length, o = eo;
  for (i = 0; i < n; i++)
    if (e = o.indexOf(t.charAt(i)), !(e > 64)) {
      if (e < 0)
        return !1;
      r += 6;
    }
  return r % 8 === 0;
}
function Wx(t) {
  var e, i, r = t.replace(/[\r\n=]/g, ""), n = r.length, o = eo, s = 0, a = [];
  for (e = 0; e < n; e++)
    e % 4 === 0 && e && (a.push(s >> 16 & 255), a.push(s >> 8 & 255), a.push(s & 255)), s = s << 6 | o.indexOf(r.charAt(e));
  return i = n % 4 * 6, i === 0 ? (a.push(s >> 16 & 255), a.push(s >> 8 & 255), a.push(s & 255)) : i === 18 ? (a.push(s >> 10 & 255), a.push(s >> 2 & 255)) : i === 12 && a.push(s >> 4 & 255), new Uint8Array(a);
}
function Hx(t) {
  var e = "", i = 0, r, n, o = t.length, s = eo;
  for (r = 0; r < o; r++)
    r % 3 === 0 && r && (e += s[i >> 18 & 63], e += s[i >> 12 & 63], e += s[i >> 6 & 63], e += s[i & 63]), i = (i << 8) + t[r];
  return n = o % 3, n === 0 ? (e += s[i >> 18 & 63], e += s[i >> 12 & 63], e += s[i >> 6 & 63], e += s[i & 63]) : n === 2 ? (e += s[i >> 10 & 63], e += s[i >> 4 & 63], e += s[i << 2 & 63], e += s[64]) : n === 1 && (e += s[i >> 2 & 63], e += s[i << 4 & 63], e += s[64], e += s[64]), e;
}
function jx(t) {
  return Object.prototype.toString.call(t) === "[object Uint8Array]";
}
var Ux = new st("tag:yaml.org,2002:binary", {
  kind: "scalar",
  resolve: zx,
  construct: Wx,
  predicate: jx,
  represent: Hx
}), Yx = Object.prototype.hasOwnProperty, Gx = Object.prototype.toString;
function Vx(t) {
  if (t === null)
    return !0;
  var e = [], i, r, n, o, s, a = t;
  for (i = 0, r = a.length; i < r; i += 1) {
    if (n = a[i], s = !1, Gx.call(n) !== "[object Object]")
      return !1;
    for (o in n)
      if (Yx.call(n, o))
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
function Xx(t) {
  return t !== null ? t : [];
}
var Kx = new st("tag:yaml.org,2002:omap", {
  kind: "sequence",
  resolve: Vx,
  construct: Xx
}), Zx = Object.prototype.toString;
function Jx(t) {
  if (t === null)
    return !0;
  var e, i, r, n, o, s = t;
  for (o = new Array(s.length), e = 0, i = s.length; e < i; e += 1) {
    if (r = s[e], Zx.call(r) !== "[object Object]" || (n = Object.keys(r), n.length !== 1))
      return !1;
    o[e] = [n[0], r[n[0]]];
  }
  return !0;
}
function Qx(t) {
  if (t === null)
    return [];
  var e, i, r, n, o, s = t;
  for (o = new Array(s.length), e = 0, i = s.length; e < i; e += 1)
    r = s[e], n = Object.keys(r), o[e] = [n[0], r[n[0]]];
  return o;
}
var tb = new st("tag:yaml.org,2002:pairs", {
  kind: "sequence",
  resolve: Jx,
  construct: Qx
}), eb = Object.prototype.hasOwnProperty;
function ib(t) {
  if (t === null)
    return !0;
  var e, i = t;
  for (e in i)
    if (eb.call(i, e) && i[e] !== null)
      return !1;
  return !0;
}
function rb(t) {
  return t !== null ? t : {};
}
var nb = new st("tag:yaml.org,2002:set", {
  kind: "mapping",
  resolve: ib,
  construct: rb
}), ob = $x.extend({
  implicit: [
    Rx,
    qx
  ],
  explicit: [
    Ux,
    Kx,
    tb,
    nb
  ]
}), oe = Object.prototype.hasOwnProperty, ur = 1, Jl = 2, Ql = 3, fr = 4, tn = 1, sb = 2, $s = 3, ab = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, lb = /[\x85\u2028\u2029]/, hb = /[,\[\]\{\}]/, th = /^(?:!|!!|![a-z\-]+!)$/i, eh = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
function Is(t) {
  return Object.prototype.toString.call(t);
}
function Dt(t) {
  return t === 10 || t === 13;
}
function pe(t) {
  return t === 9 || t === 32;
}
function gt(t) {
  return t === 9 || t === 32 || t === 10 || t === 13;
}
function Be(t) {
  return t === 44 || t === 91 || t === 93 || t === 123 || t === 125;
}
function cb(t) {
  var e;
  return 48 <= t && t <= 57 ? t - 48 : (e = t | 32, 97 <= e && e <= 102 ? e - 97 + 10 : -1);
}
function ub(t) {
  return t === 120 ? 2 : t === 117 ? 4 : t === 85 ? 8 : 0;
}
function fb(t) {
  return 48 <= t && t <= 57 ? t - 48 : -1;
}
function Ds(t) {
  return t === 48 ? "\0" : t === 97 ? "\x07" : t === 98 ? "\b" : t === 116 || t === 9 ? "	" : t === 110 ? `
` : t === 118 ? "\v" : t === 102 ? "\f" : t === 114 ? "\r" : t === 101 ? "\x1B" : t === 32 ? " " : t === 34 ? '"' : t === 47 ? "/" : t === 92 ? "\\" : t === 78 ? "" : t === 95 ? " " : t === 76 ? "\u2028" : t === 80 ? "\u2029" : "";
}
function db(t) {
  return t <= 65535 ? String.fromCharCode(t) : String.fromCharCode(
    (t - 65536 >> 10) + 55296,
    (t - 65536 & 1023) + 56320
  );
}
var ih = new Array(256), rh = new Array(256);
for (var we = 0; we < 256; we++)
  ih[we] = Ds(we) ? 1 : 0, rh[we] = Ds(we);
function pb(t, e) {
  this.input = t, this.filename = e.filename || null, this.schema = e.schema || ob, this.onWarning = e.onWarning || null, this.legacy = e.legacy || !1, this.json = e.json || !1, this.listener = e.listener || null, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = t.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.firstTabInLine = -1, this.documents = [];
}
function nh(t, e) {
  var i = {
    name: t.filename,
    buffer: t.input.slice(0, -1),
    // omit trailing \0
    position: t.position,
    line: t.line,
    column: t.position - t.lineStart
  };
  return i.snippet = ex(i), new Vt(e, i);
}
function F(t, e) {
  throw nh(t, e);
}
function dr(t, e) {
  t.onWarning && t.onWarning.call(null, nh(t, e));
}
var Ns = {
  YAML: function(e, i, r) {
    var n, o, s;
    e.version !== null && F(e, "duplication of %YAML directive"), r.length !== 1 && F(e, "YAML directive accepts exactly one argument"), n = /^([0-9]+)\.([0-9]+)$/.exec(r[0]), n === null && F(e, "ill-formed argument of the YAML directive"), o = parseInt(n[1], 10), s = parseInt(n[2], 10), o !== 1 && F(e, "unacceptable YAML version of the document"), e.version = r[0], e.checkLineBreaks = s < 2, s !== 1 && s !== 2 && dr(e, "unsupported YAML version of the document");
  },
  TAG: function(e, i, r) {
    var n, o;
    r.length !== 2 && F(e, "TAG directive accepts exactly two arguments"), n = r[0], o = r[1], th.test(n) || F(e, "ill-formed tag handle (first argument) of the TAG directive"), oe.call(e.tagMap, n) && F(e, 'there is a previously declared suffix for "' + n + '" tag handle'), eh.test(o) || F(e, "ill-formed tag prefix (second argument) of the TAG directive");
    try {
      o = decodeURIComponent(o);
    } catch {
      F(e, "tag prefix is malformed: " + o);
    }
    e.tagMap[n] = o;
  }
};
function re(t, e, i, r) {
  var n, o, s, a;
  if (e < i) {
    if (a = t.input.slice(e, i), r)
      for (n = 0, o = a.length; n < o; n += 1)
        s = a.charCodeAt(n), s === 9 || 32 <= s && s <= 1114111 || F(t, "expected valid JSON character");
    else
      ab.test(a) && F(t, "the stream contains non-printable characters");
    t.result += a;
  }
}
function Rs(t, e, i, r) {
  var n, o, s, a;
  for (ht.isObject(i) || F(t, "cannot merge mappings; the provided source object is unacceptable"), n = Object.keys(i), s = 0, a = n.length; s < a; s += 1)
    o = n[s], oe.call(e, o) || (e[o] = i[o], r[o] = !0);
}
function Fe(t, e, i, r, n, o, s, a, l) {
  var h, u;
  if (Array.isArray(n))
    for (n = Array.prototype.slice.call(n), h = 0, u = n.length; h < u; h += 1)
      Array.isArray(n[h]) && F(t, "nested arrays are not supported inside keys"), typeof n == "object" && Is(n[h]) === "[object Object]" && (n[h] = "[object Object]");
  if (typeof n == "object" && Is(n) === "[object Object]" && (n = "[object Object]"), n = String(n), e === null && (e = {}), r === "tag:yaml.org,2002:merge")
    if (Array.isArray(o))
      for (h = 0, u = o.length; h < u; h += 1)
        Rs(t, e, o[h], i);
    else
      Rs(t, e, o, i);
  else
    !t.json && !oe.call(i, n) && oe.call(e, n) && (t.line = s || t.line, t.lineStart = a || t.lineStart, t.position = l || t.position, F(t, "duplicated mapping key")), n === "__proto__" ? Object.defineProperty(e, n, {
      configurable: !0,
      enumerable: !0,
      writable: !0,
      value: o
    }) : e[n] = o, delete i[n];
  return e;
}
function io(t) {
  var e;
  e = t.input.charCodeAt(t.position), e === 10 ? t.position++ : e === 13 ? (t.position++, t.input.charCodeAt(t.position) === 10 && t.position++) : F(t, "a line break is expected"), t.line += 1, t.lineStart = t.position, t.firstTabInLine = -1;
}
function J(t, e, i) {
  for (var r = 0, n = t.input.charCodeAt(t.position); n !== 0; ) {
    for (; pe(n); )
      n === 9 && t.firstTabInLine === -1 && (t.firstTabInLine = t.position), n = t.input.charCodeAt(++t.position);
    if (e && n === 35)
      do
        n = t.input.charCodeAt(++t.position);
      while (n !== 10 && n !== 13 && n !== 0);
    if (Dt(n))
      for (io(t), n = t.input.charCodeAt(t.position), r++, t.lineIndent = 0; n === 32; )
        t.lineIndent++, n = t.input.charCodeAt(++t.position);
    else
      break;
  }
  return i !== -1 && r !== 0 && t.lineIndent < i && dr(t, "deficient indentation"), r;
}
function Mr(t) {
  var e = t.position, i;
  return i = t.input.charCodeAt(e), !!((i === 45 || i === 46) && i === t.input.charCodeAt(e + 1) && i === t.input.charCodeAt(e + 2) && (e += 3, i = t.input.charCodeAt(e), i === 0 || gt(i)));
}
function ro(t, e) {
  e === 1 ? t.result += " " : e > 1 && (t.result += ht.repeat(`
`, e - 1));
}
function gb(t, e, i) {
  var r, n, o, s, a, l, h, u, f = t.kind, c = t.result, p;
  if (p = t.input.charCodeAt(t.position), gt(p) || Be(p) || p === 35 || p === 38 || p === 42 || p === 33 || p === 124 || p === 62 || p === 39 || p === 34 || p === 37 || p === 64 || p === 96 || (p === 63 || p === 45) && (n = t.input.charCodeAt(t.position + 1), gt(n) || i && Be(n)))
    return !1;
  for (t.kind = "scalar", t.result = "", o = s = t.position, a = !1; p !== 0; ) {
    if (p === 58) {
      if (n = t.input.charCodeAt(t.position + 1), gt(n) || i && Be(n))
        break;
    } else if (p === 35) {
      if (r = t.input.charCodeAt(t.position - 1), gt(r))
        break;
    } else {
      if (t.position === t.lineStart && Mr(t) || i && Be(p))
        break;
      if (Dt(p))
        if (l = t.line, h = t.lineStart, u = t.lineIndent, J(t, !1, -1), t.lineIndent >= e) {
          a = !0, p = t.input.charCodeAt(t.position);
          continue;
        } else {
          t.position = s, t.line = l, t.lineStart = h, t.lineIndent = u;
          break;
        }
    }
    a && (re(t, o, s, !1), ro(t, t.line - l), o = s = t.position, a = !1), pe(p) || (s = t.position + 1), p = t.input.charCodeAt(++t.position);
  }
  return re(t, o, s, !1), t.result ? !0 : (t.kind = f, t.result = c, !1);
}
function mb(t, e) {
  var i, r, n;
  if (i = t.input.charCodeAt(t.position), i !== 39)
    return !1;
  for (t.kind = "scalar", t.result = "", t.position++, r = n = t.position; (i = t.input.charCodeAt(t.position)) !== 0; )
    if (i === 39)
      if (re(t, r, t.position, !0), i = t.input.charCodeAt(++t.position), i === 39)
        r = t.position, t.position++, n = t.position;
      else
        return !0;
    else
      Dt(i) ? (re(t, r, n, !0), ro(t, J(t, !1, e)), r = n = t.position) : t.position === t.lineStart && Mr(t) ? F(t, "unexpected end of the document within a single quoted scalar") : (t.position++, n = t.position);
  F(t, "unexpected end of the stream within a single quoted scalar");
}
function yb(t, e) {
  var i, r, n, o, s, a;
  if (a = t.input.charCodeAt(t.position), a !== 34)
    return !1;
  for (t.kind = "scalar", t.result = "", t.position++, i = r = t.position; (a = t.input.charCodeAt(t.position)) !== 0; ) {
    if (a === 34)
      return re(t, i, t.position, !0), t.position++, !0;
    if (a === 92) {
      if (re(t, i, t.position, !0), a = t.input.charCodeAt(++t.position), Dt(a))
        J(t, !1, e);
      else if (a < 256 && ih[a])
        t.result += rh[a], t.position++;
      else if ((s = ub(a)) > 0) {
        for (n = s, o = 0; n > 0; n--)
          a = t.input.charCodeAt(++t.position), (s = cb(a)) >= 0 ? o = (o << 4) + s : F(t, "expected hexadecimal character");
        t.result += db(o), t.position++;
      } else
        F(t, "unknown escape sequence");
      i = r = t.position;
    } else
      Dt(a) ? (re(t, i, r, !0), ro(t, J(t, !1, e)), i = r = t.position) : t.position === t.lineStart && Mr(t) ? F(t, "unexpected end of the document within a double quoted scalar") : (t.position++, r = t.position);
  }
  F(t, "unexpected end of the stream within a double quoted scalar");
}
function _b(t, e) {
  var i = !0, r, n, o, s = t.tag, a, l = t.anchor, h, u, f, c, p, m = /* @__PURE__ */ Object.create(null), k, O, q, T;
  if (T = t.input.charCodeAt(t.position), T === 91)
    u = 93, p = !1, a = [];
  else if (T === 123)
    u = 125, p = !0, a = {};
  else
    return !1;
  for (t.anchor !== null && (t.anchorMap[t.anchor] = a), T = t.input.charCodeAt(++t.position); T !== 0; ) {
    if (J(t, !0, e), T = t.input.charCodeAt(t.position), T === u)
      return t.position++, t.tag = s, t.anchor = l, t.kind = p ? "mapping" : "sequence", t.result = a, !0;
    i ? T === 44 && F(t, "expected the node content, but found ','") : F(t, "missed comma between flow collection entries"), O = k = q = null, f = c = !1, T === 63 && (h = t.input.charCodeAt(t.position + 1), gt(h) && (f = c = !0, t.position++, J(t, !0, e))), r = t.line, n = t.lineStart, o = t.position, Ne(t, e, ur, !1, !0), O = t.tag, k = t.result, J(t, !0, e), T = t.input.charCodeAt(t.position), (c || t.line === r) && T === 58 && (f = !0, T = t.input.charCodeAt(++t.position), J(t, !0, e), Ne(t, e, ur, !1, !0), q = t.result), p ? Fe(t, a, m, O, k, q, r, n, o) : f ? a.push(Fe(t, null, m, O, k, q, r, n, o)) : a.push(k), J(t, !0, e), T = t.input.charCodeAt(t.position), T === 44 ? (i = !0, T = t.input.charCodeAt(++t.position)) : i = !1;
  }
  F(t, "unexpected end of the stream within a flow collection");
}
function Cb(t, e) {
  var i, r, n = tn, o = !1, s = !1, a = e, l = 0, h = !1, u, f;
  if (f = t.input.charCodeAt(t.position), f === 124)
    r = !1;
  else if (f === 62)
    r = !0;
  else
    return !1;
  for (t.kind = "scalar", t.result = ""; f !== 0; )
    if (f = t.input.charCodeAt(++t.position), f === 43 || f === 45)
      tn === n ? n = f === 43 ? $s : sb : F(t, "repeat of a chomping mode identifier");
    else if ((u = fb(f)) >= 0)
      u === 0 ? F(t, "bad explicit indentation width of a block scalar; it cannot be less than one") : s ? F(t, "repeat of an indentation width identifier") : (a = e + u - 1, s = !0);
    else
      break;
  if (pe(f)) {
    do
      f = t.input.charCodeAt(++t.position);
    while (pe(f));
    if (f === 35)
      do
        f = t.input.charCodeAt(++t.position);
      while (!Dt(f) && f !== 0);
  }
  for (; f !== 0; ) {
    for (io(t), t.lineIndent = 0, f = t.input.charCodeAt(t.position); (!s || t.lineIndent < a) && f === 32; )
      t.lineIndent++, f = t.input.charCodeAt(++t.position);
    if (!s && t.lineIndent > a && (a = t.lineIndent), Dt(f)) {
      l++;
      continue;
    }
    if (t.lineIndent < a) {
      n === $s ? t.result += ht.repeat(`
`, o ? 1 + l : l) : n === tn && o && (t.result += `
`);
      break;
    }
    for (r ? pe(f) ? (h = !0, t.result += ht.repeat(`
`, o ? 1 + l : l)) : h ? (h = !1, t.result += ht.repeat(`
`, l + 1)) : l === 0 ? o && (t.result += " ") : t.result += ht.repeat(`
`, l) : t.result += ht.repeat(`
`, o ? 1 + l : l), o = !0, s = !0, l = 0, i = t.position; !Dt(f) && f !== 0; )
      f = t.input.charCodeAt(++t.position);
    re(t, i, t.position, !1);
  }
  return !0;
}
function Ps(t, e) {
  var i, r = t.tag, n = t.anchor, o = [], s, a = !1, l;
  if (t.firstTabInLine !== -1)
    return !1;
  for (t.anchor !== null && (t.anchorMap[t.anchor] = o), l = t.input.charCodeAt(t.position); l !== 0 && (t.firstTabInLine !== -1 && (t.position = t.firstTabInLine, F(t, "tab characters must not be used in indentation")), !(l !== 45 || (s = t.input.charCodeAt(t.position + 1), !gt(s)))); ) {
    if (a = !0, t.position++, J(t, !0, -1) && t.lineIndent <= e) {
      o.push(null), l = t.input.charCodeAt(t.position);
      continue;
    }
    if (i = t.line, Ne(t, e, Ql, !1, !0), o.push(t.result), J(t, !0, -1), l = t.input.charCodeAt(t.position), (t.line === i || t.lineIndent > e) && l !== 0)
      F(t, "bad indentation of a sequence entry");
    else if (t.lineIndent < e)
      break;
  }
  return a ? (t.tag = r, t.anchor = n, t.kind = "sequence", t.result = o, !0) : !1;
}
function xb(t, e, i) {
  var r, n, o, s, a, l, h = t.tag, u = t.anchor, f = {}, c = /* @__PURE__ */ Object.create(null), p = null, m = null, k = null, O = !1, q = !1, T;
  if (t.firstTabInLine !== -1)
    return !1;
  for (t.anchor !== null && (t.anchorMap[t.anchor] = f), T = t.input.charCodeAt(t.position); T !== 0; ) {
    if (!O && t.firstTabInLine !== -1 && (t.position = t.firstTabInLine, F(t, "tab characters must not be used in indentation")), r = t.input.charCodeAt(t.position + 1), o = t.line, (T === 63 || T === 58) && gt(r))
      T === 63 ? (O && (Fe(t, f, c, p, m, null, s, a, l), p = m = k = null), q = !0, O = !0, n = !0) : O ? (O = !1, n = !0) : F(t, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), t.position += 1, T = r;
    else {
      if (s = t.line, a = t.lineStart, l = t.position, !Ne(t, i, Jl, !1, !0))
        break;
      if (t.line === o) {
        for (T = t.input.charCodeAt(t.position); pe(T); )
          T = t.input.charCodeAt(++t.position);
        if (T === 58)
          T = t.input.charCodeAt(++t.position), gt(T) || F(t, "a whitespace character is expected after the key-value separator within a block mapping"), O && (Fe(t, f, c, p, m, null, s, a, l), p = m = k = null), q = !0, O = !1, n = !1, p = t.tag, m = t.result;
        else if (q)
          F(t, "can not read an implicit mapping pair; a colon is missed");
        else
          return t.tag = h, t.anchor = u, !0;
      } else if (q)
        F(t, "can not read a block mapping entry; a multiline key may not be an implicit key");
      else
        return t.tag = h, t.anchor = u, !0;
    }
    if ((t.line === o || t.lineIndent > e) && (O && (s = t.line, a = t.lineStart, l = t.position), Ne(t, e, fr, !0, n) && (O ? m = t.result : k = t.result), O || (Fe(t, f, c, p, m, k, s, a, l), p = m = k = null), J(t, !0, -1), T = t.input.charCodeAt(t.position)), (t.line === o || t.lineIndent > e) && T !== 0)
      F(t, "bad indentation of a mapping entry");
    else if (t.lineIndent < e)
      break;
  }
  return O && Fe(t, f, c, p, m, null, s, a, l), q && (t.tag = h, t.anchor = u, t.kind = "mapping", t.result = f), q;
}
function bb(t) {
  var e, i = !1, r = !1, n, o, s;
  if (s = t.input.charCodeAt(t.position), s !== 33)
    return !1;
  if (t.tag !== null && F(t, "duplication of a tag property"), s = t.input.charCodeAt(++t.position), s === 60 ? (i = !0, s = t.input.charCodeAt(++t.position)) : s === 33 ? (r = !0, n = "!!", s = t.input.charCodeAt(++t.position)) : n = "!", e = t.position, i) {
    do
      s = t.input.charCodeAt(++t.position);
    while (s !== 0 && s !== 62);
    t.position < t.length ? (o = t.input.slice(e, t.position), s = t.input.charCodeAt(++t.position)) : F(t, "unexpected end of the stream within a verbatim tag");
  } else {
    for (; s !== 0 && !gt(s); )
      s === 33 && (r ? F(t, "tag suffix cannot contain exclamation marks") : (n = t.input.slice(e - 1, t.position + 1), th.test(n) || F(t, "named tag handle cannot contain such characters"), r = !0, e = t.position + 1)), s = t.input.charCodeAt(++t.position);
    o = t.input.slice(e, t.position), hb.test(o) && F(t, "tag suffix cannot contain flow indicator characters");
  }
  o && !eh.test(o) && F(t, "tag name cannot contain such characters: " + o);
  try {
    o = decodeURIComponent(o);
  } catch {
    F(t, "tag name is malformed: " + o);
  }
  return i ? t.tag = o : oe.call(t.tagMap, n) ? t.tag = t.tagMap[n] + o : n === "!" ? t.tag = "!" + o : n === "!!" ? t.tag = "tag:yaml.org,2002:" + o : F(t, 'undeclared tag handle "' + n + '"'), !0;
}
function Tb(t) {
  var e, i;
  if (i = t.input.charCodeAt(t.position), i !== 38)
    return !1;
  for (t.anchor !== null && F(t, "duplication of an anchor property"), i = t.input.charCodeAt(++t.position), e = t.position; i !== 0 && !gt(i) && !Be(i); )
    i = t.input.charCodeAt(++t.position);
  return t.position === e && F(t, "name of an anchor node must contain at least one character"), t.anchor = t.input.slice(e, t.position), !0;
}
function kb(t) {
  var e, i, r;
  if (r = t.input.charCodeAt(t.position), r !== 42)
    return !1;
  for (r = t.input.charCodeAt(++t.position), e = t.position; r !== 0 && !gt(r) && !Be(r); )
    r = t.input.charCodeAt(++t.position);
  return t.position === e && F(t, "name of an alias node must contain at least one character"), i = t.input.slice(e, t.position), oe.call(t.anchorMap, i) || F(t, 'unidentified alias "' + i + '"'), t.result = t.anchorMap[i], J(t, !0, -1), !0;
}
function Ne(t, e, i, r, n) {
  var o, s, a, l = 1, h = !1, u = !1, f, c, p, m, k, O;
  if (t.listener !== null && t.listener("open", t), t.tag = null, t.anchor = null, t.kind = null, t.result = null, o = s = a = fr === i || Ql === i, r && J(t, !0, -1) && (h = !0, t.lineIndent > e ? l = 1 : t.lineIndent === e ? l = 0 : t.lineIndent < e && (l = -1)), l === 1)
    for (; bb(t) || Tb(t); )
      J(t, !0, -1) ? (h = !0, a = o, t.lineIndent > e ? l = 1 : t.lineIndent === e ? l = 0 : t.lineIndent < e && (l = -1)) : a = !1;
  if (a && (a = h || n), (l === 1 || fr === i) && (ur === i || Jl === i ? k = e : k = e + 1, O = t.position - t.lineStart, l === 1 ? a && (Ps(t, O) || xb(t, O, k)) || _b(t, k) ? u = !0 : (s && Cb(t, k) || mb(t, k) || yb(t, k) ? u = !0 : kb(t) ? (u = !0, (t.tag !== null || t.anchor !== null) && F(t, "alias node should not have any properties")) : gb(t, k, ur === i) && (u = !0, t.tag === null && (t.tag = "?")), t.anchor !== null && (t.anchorMap[t.anchor] = t.result)) : l === 0 && (u = a && Ps(t, O))), t.tag === null)
    t.anchor !== null && (t.anchorMap[t.anchor] = t.result);
  else if (t.tag === "?") {
    for (t.result !== null && t.kind !== "scalar" && F(t, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + t.kind + '"'), f = 0, c = t.implicitTypes.length; f < c; f += 1)
      if (m = t.implicitTypes[f], m.resolve(t.result)) {
        t.result = m.construct(t.result), t.tag = m.tag, t.anchor !== null && (t.anchorMap[t.anchor] = t.result);
        break;
      }
  } else if (t.tag !== "!") {
    if (oe.call(t.typeMap[t.kind || "fallback"], t.tag))
      m = t.typeMap[t.kind || "fallback"][t.tag];
    else
      for (m = null, p = t.typeMap.multi[t.kind || "fallback"], f = 0, c = p.length; f < c; f += 1)
        if (t.tag.slice(0, p[f].tag.length) === p[f].tag) {
          m = p[f];
          break;
        }
    m || F(t, "unknown tag !<" + t.tag + ">"), t.result !== null && m.kind !== t.kind && F(t, "unacceptable node kind for !<" + t.tag + '> tag; it should be "' + m.kind + '", not "' + t.kind + '"'), m.resolve(t.result, t.tag) ? (t.result = m.construct(t.result, t.tag), t.anchor !== null && (t.anchorMap[t.anchor] = t.result)) : F(t, "cannot resolve a node with !<" + t.tag + "> explicit tag");
  }
  return t.listener !== null && t.listener("close", t), t.tag !== null || t.anchor !== null || u;
}
function Sb(t) {
  var e = t.position, i, r, n, o = !1, s;
  for (t.version = null, t.checkLineBreaks = t.legacy, t.tagMap = /* @__PURE__ */ Object.create(null), t.anchorMap = /* @__PURE__ */ Object.create(null); (s = t.input.charCodeAt(t.position)) !== 0 && (J(t, !0, -1), s = t.input.charCodeAt(t.position), !(t.lineIndent > 0 || s !== 37)); ) {
    for (o = !0, s = t.input.charCodeAt(++t.position), i = t.position; s !== 0 && !gt(s); )
      s = t.input.charCodeAt(++t.position);
    for (r = t.input.slice(i, t.position), n = [], r.length < 1 && F(t, "directive name must not be less than one character in length"); s !== 0; ) {
      for (; pe(s); )
        s = t.input.charCodeAt(++t.position);
      if (s === 35) {
        do
          s = t.input.charCodeAt(++t.position);
        while (s !== 0 && !Dt(s));
        break;
      }
      if (Dt(s))
        break;
      for (i = t.position; s !== 0 && !gt(s); )
        s = t.input.charCodeAt(++t.position);
      n.push(t.input.slice(i, t.position));
    }
    s !== 0 && io(t), oe.call(Ns, r) ? Ns[r](t, r, n) : dr(t, 'unknown document directive "' + r + '"');
  }
  if (J(t, !0, -1), t.lineIndent === 0 && t.input.charCodeAt(t.position) === 45 && t.input.charCodeAt(t.position + 1) === 45 && t.input.charCodeAt(t.position + 2) === 45 ? (t.position += 3, J(t, !0, -1)) : o && F(t, "directives end mark is expected"), Ne(t, t.lineIndent - 1, fr, !1, !0), J(t, !0, -1), t.checkLineBreaks && lb.test(t.input.slice(e, t.position)) && dr(t, "non-ASCII line breaks are interpreted as content"), t.documents.push(t.result), t.position === t.lineStart && Mr(t)) {
    t.input.charCodeAt(t.position) === 46 && (t.position += 3, J(t, !0, -1));
    return;
  }
  if (t.position < t.length - 1)
    F(t, "end of the stream or a document separator is expected");
  else
    return;
}
function oh(t, e) {
  t = String(t), e = e || {}, t.length !== 0 && (t.charCodeAt(t.length - 1) !== 10 && t.charCodeAt(t.length - 1) !== 13 && (t += `
`), t.charCodeAt(0) === 65279 && (t = t.slice(1)));
  var i = new pb(t, e), r = t.indexOf("\0");
  for (r !== -1 && (i.position = r, F(i, "null byte is not allowed in input")), i.input += "\0"; i.input.charCodeAt(i.position) === 32; )
    i.lineIndent += 1, i.position += 1;
  for (; i.position < i.length - 1; )
    Sb(i);
  return i.documents;
}
function vb(t, e, i) {
  e !== null && typeof e == "object" && typeof i > "u" && (i = e, e = null);
  var r = oh(t, i);
  if (typeof e != "function")
    return r;
  for (var n = 0, o = r.length; n < o; n += 1)
    e(r[n]);
}
function wb(t, e) {
  var i = oh(t, e);
  if (i.length !== 0) {
    if (i.length === 1)
      return i[0];
    throw new Vt("expected a single document in the stream, but found more");
  }
}
var Bb = vb, Fb = wb, Ab = {
  loadAll: Bb,
  load: Fb
}, Lb = Xl, Eb = Ab.load;
function Mb(t) {
  const e = t.match(Ha);
  if (!e)
    return {
      text: t,
      metadata: {}
    };
  let i = Eb(e[1], {
    // To support config, we need JSON schema.
    // https://www.yaml.org/spec/1.2/spec.html#id2803231
    schema: Lb
  }) ?? {};
  i = typeof i == "object" && !Array.isArray(i) ? i : {};
  const r = {};
  return i.displayMode && (r.displayMode = i.displayMode.toString()), i.title && (r.title = i.title.toString()), i.config && (r.config = i.config), {
    text: t.slice(e[0].length),
    metadata: r
  };
}
const Ob = (t) => t.replace(/\r\n?/g, `
`).replace(
  /<(\w+)([^>]*)>/g,
  (e, i, r) => "<" + i + r.replace(/="([^"]*)"/g, "='$1'") + ">"
), $b = (t) => {
  const { text: e, metadata: i } = Mb(t), { displayMode: r, title: n, config: o = {} } = i;
  return r && (o.gantt || (o.gantt = {}), o.gantt.displayMode = r), { title: n, config: o, text: e };
}, Ib = (t) => {
  const e = ni.detectInit(t) ?? {}, i = ni.detectDirective(t, "wrap");
  return Array.isArray(i) ? e.wrap = i.some(({ type: r }) => {
  }) : (i == null ? void 0 : i.type) === "wrap" && (e.wrap = !0), {
    text: k0(t),
    directive: e
  };
};
function sh(t) {
  const e = Ob(t), i = $b(e), r = Ib(i.text), n = cl(i.config, r.directive);
  return t = WC(r.text), {
    code: t,
    title: i.title,
    config: n
  };
}
const Db = 5e4, Nb = "graph TB;a[Maximum text size in diagram exceeded];style a fill:#faa", Rb = "sandbox", Pb = "loose", qb = "http://www.w3.org/2000/svg", zb = "http://www.w3.org/1999/xlink", Wb = "http://www.w3.org/1999/xhtml", Hb = "100%", jb = "100%", Ub = "border:0;margin:0;", Yb = "margin:0", Gb = "allow-top-navigation-by-user-activation allow-popups", Vb = 'The "iframe" tag is not supported by your browser.', Xb = ["foreignobject"], Kb = ["dominant-baseline"];
function ah(t) {
  const e = sh(t);
  return lr(), uy(e.config ?? {}), e;
}
async function Zb(t, e) {
  to(), t = ah(t).code;
  try {
    await no(t);
  } catch (i) {
    if (e != null && e.suppressErrors)
      return !1;
    throw i;
  }
  return !0;
}
const qs = (t, e, i = []) => `
.${t} ${e} { ${i.join(" !important; ")} !important; }`, Jb = (t, e = {}) => {
  var r;
  let i = "";
  if (t.themeCSS !== void 0 && (i += `
${t.themeCSS}`), t.fontFamily !== void 0 && (i += `
:root { --mermaid-font-family: ${t.fontFamily}}`), t.altFontFamily !== void 0 && (i += `
:root { --mermaid-alt-font-family: ${t.altFontFamily}}`), !Zr(e)) {
    const a = t.htmlLabels || ((r = t.flowchart) == null ? void 0 : r.htmlLabels) ? ["> *", "span"] : ["rect", "polygon", "ellipse", "circle", "path"];
    for (const l in e) {
      const h = e[l];
      Zr(h.styles) || a.forEach((u) => {
        i += qs(h.id, u, h.styles);
      }), Zr(h.textStyles) || (i += qs(h.id, "tspan", h.textStyles));
    }
  }
  return i;
}, Qb = (t, e, i, r) => {
  const n = Jb(t, i), o = E_(e, n, t.themeVariables);
  return Cn(oy(`${r}{${o}}`), ay);
}, t1 = (t = "", e, i) => {
  let r = t;
  return !i && !e && (r = r.replace(
    /marker-end="url\([\d+./:=?A-Za-z-]*?#/g,
    'marker-end="url(#'
  )), r = U0(r), r = r.replace(/<br>/g, "<br/>"), r;
}, e1 = (t = "", e) => {
  var n, o;
  const i = (o = (n = e == null ? void 0 : e.viewBox) == null ? void 0 : n.baseVal) != null && o.height ? e.viewBox.baseVal.height + "px" : jb, r = btoa('<body style="' + Yb + '">' + t + "</body>");
  return `<iframe style="width:${Hb};height:${i};${Ub}" src="data:text/html;base64,${r}" sandbox="${Gb}">
  ${Vb}
</iframe>`;
}, zs = (t, e, i, r, n) => {
  const o = t.append("div");
  o.attr("id", i), r && o.attr("style", r);
  const s = o.append("svg").attr("id", e).attr("width", "100%").attr("xmlns", qb);
  return n && s.attr("xmlns:xlink", n), s.append("g"), t;
};
function Ws(t, e) {
  return t.append("iframe").attr("id", e).attr("style", "width: 100%; height: 100%;").attr("sandbox", "");
}
const i1 = (t, e, i, r) => {
  var n, o, s;
  (n = t.getElementById(e)) == null || n.remove(), (o = t.getElementById(i)) == null || o.remove(), (s = t.getElementById(r)) == null || s.remove();
}, r1 = async function(t, e, i) {
  var zt, M, b, C, v, x;
  to();
  const r = ah(e);
  e = r.code;
  const n = Rt();
  L.debug(n), e.length > ((n == null ? void 0 : n.maxTextSize) ?? Db) && (e = Nb);
  const o = "#" + t, s = "i" + t, a = "#" + s, l = "d" + t, h = "#" + l;
  let u = Tt("body");
  const f = n.securityLevel === Rb, c = n.securityLevel === Pb, p = n.fontFamily;
  if (i !== void 0) {
    if (i && (i.innerHTML = ""), f) {
      const A = Ws(Tt(i), s);
      u = Tt(A.nodes()[0].contentDocument.body), u.node().style.margin = 0;
    } else
      u = Tt(i);
    zs(u, t, l, `font-family: ${p}`, zb);
  } else {
    if (i1(document, t, l, s), f) {
      const A = Ws(Tt("body"), s);
      u = Tt(A.nodes()[0].contentDocument.body), u.node().style.margin = 0;
    } else
      u = Tt("body");
    zs(u, t, l);
  }
  let m, k;
  try {
    m = await no(e, { title: r.title });
  } catch (A) {
    m = new Yl("error"), k = A;
  }
  const O = u.select(h).node(), q = m.type, T = O.firstChild, U = T.firstChild, W = (M = (zt = m.renderer).getClasses) == null ? void 0 : M.call(zt, e, m), G = Qb(n, q, W, o), V = document.createElement("style");
  V.innerHTML = G, T.insertBefore(V, U);
  try {
    await m.renderer.draw(e, t, Ss, m);
  } catch (A) {
    throw V_.draw(e, t, Ss), A;
  }
  const H = u.select(`${h} svg`), ae = (C = (b = m.db).getAccTitle) == null ? void 0 : C.call(b), Jt = (x = (v = m.db).getAccDescription) == null ? void 0 : x.call(v);
  o1(q, H, ae, Jt), u.select(`[id="${t}"]`).selectAll("foreignobject > *").attr("xmlns", Wb);
  let j = u.select(h).node().innerHTML;
  if (L.debug("config.arrowMarkerAbsolute", n.arrowMarkerAbsolute), j = t1(j, f, Da(n.arrowMarkerAbsolute)), f) {
    const A = u.select(h + " svg").node();
    j = e1(j, A);
  } else
    c || (j = Me.sanitize(j, {
      ADD_TAGS: Xb,
      ADD_ATTR: Kb
    }));
  if (_C(), k)
    throw k;
  const _t = Tt(f ? a : h).node();
  return _t && "remove" in _t && _t.remove(), {
    svg: j,
    bindFunctions: m.db.bindFunctions
  };
};
function n1(t = {}) {
  var i;
  t != null && t.fontFamily && !((i = t.themeVariables) != null && i.fontFamily) && (t.themeVariables || (t.themeVariables = {}), t.themeVariables.fontFamily = t.fontFamily), hy(t), t != null && t.theme && t.theme in Xt ? t.themeVariables = Xt[t.theme].getThemeVariables(
    t.themeVariables
  ) : t && (t.themeVariables = Xt.default.getThemeVariables(t.themeVariables));
  const e = typeof t == "object" ? ly(t) : _l();
  vn(e.logLevel), to();
}
const no = (t, e = {}) => {
  const { code: i } = sh(t);
  return yC(i, e);
};
function o1(t, e, i, r) {
  qC(e, t), zC(e, i, r, e.attr("id"));
}
const ye = Object.freeze({
  render: r1,
  parse: Zb,
  getDiagramFromText: no,
  initialize: n1,
  getConfig: Rt,
  setConfig: Cl,
  getSiteConfig: _l,
  updateSiteConfig: cy,
  reset: () => {
    lr();
  },
  globalReset: () => {
    lr(Ie);
  },
  defaultConfig: Ie
});
vn(Rt().logLevel);
lr(Rt());
const s1 = async () => {
  L.debug("Loading registered diagrams");
  const e = (await Promise.allSettled(
    Object.entries(Oe).map(async ([i, { detector: r, loader: n }]) => {
      if (n)
        try {
          Qn(i);
        } catch {
          try {
            const { diagram: s, id: a } = await n();
            cr(a, s, r);
          } catch (s) {
            throw L.error(`Failed to load external diagram with key ${i}. Removing from detectors.`), delete Oe[i], s;
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
}, a1 = (t, e, i) => {
  L.warn(t), hl(t) ? (i && i(t.str, t.hash), e.push({ ...t, message: t.str, error: t })) : (i && i(t), t instanceof Error && e.push({
    str: t.message,
    message: t.message,
    hash: t.name,
    error: t
  }));
}, lh = async function(t = {
  querySelector: ".mermaid"
}) {
  try {
    await l1(t);
  } catch (e) {
    if (hl(e) && L.error(e.str), kt.parseError && kt.parseError(e), !t.suppressErrors)
      throw L.error("Use the suppressErrors option to suppress these errors"), e;
  }
}, l1 = async function({ postRenderCallback: t, querySelector: e, nodes: i } = {
  querySelector: ".mermaid"
}) {
  const r = ye.getConfig();
  L.debug(`${t ? "" : "No "}Callback function found`);
  let n;
  if (i)
    n = i;
  else if (e)
    n = document.querySelectorAll(e);
  else
    throw new Error("Nodes and querySelector are both undefined");
  L.debug(`Found ${n.length} diagrams`), (r == null ? void 0 : r.startOnLoad) !== void 0 && (L.debug("Start On Load: " + (r == null ? void 0 : r.startOnLoad)), ye.updateSiteConfig({ startOnLoad: r == null ? void 0 : r.startOnLoad }));
  const o = new ni.InitIDGenerator(r.deterministicIds, r.deterministicIDSeed);
  let s;
  const a = [];
  for (const l of Array.from(n)) {
    L.info("Rendering diagram: " + l.id);
    /*! Check if previously processed */
    if (l.getAttribute("data-processed"))
      continue;
    l.setAttribute("data-processed", "true");
    const h = `mermaid-${o.next()}`;
    s = l.innerHTML, s = bh(ni.entityDecode(s)).trim().replace(/<br\s*\/?>/gi, "<br/>");
    const u = ni.detectInit(s);
    u && L.debug("Detected early reinit: ", u);
    try {
      const { svg: f, bindFunctions: c } = await fh(h, s, l);
      l.innerHTML = f, t && await t(h), c && c(l);
    } catch (f) {
      a1(f, a, kt.parseError);
    }
  }
  if (a.length > 0)
    throw a[0];
}, hh = function(t) {
  ye.initialize(t);
}, h1 = async function(t, e, i) {
  L.warn("mermaid.init is deprecated. Please use run instead."), t && hh(t);
  const r = { postRenderCallback: i, querySelector: ".mermaid" };
  typeof e == "string" ? r.querySelector = e : e && (e instanceof HTMLElement ? r.nodes = [e] : r.nodes = e), await lh(r);
}, c1 = async (t, {
  lazyLoad: e = !0
} = {}) => {
  Ua(...t), e === !1 && await s1();
}, ch = function() {
  if (kt.startOnLoad) {
    const { startOnLoad: t } = ye.getConfig();
    t && kt.run().catch((e) => L.error("Mermaid failed to initialize", e));
  }
};
if (typeof document < "u") {
  /*!
   * Wait for document loaded before starting the execution
   */
  window.addEventListener("load", ch, !1);
}
const u1 = function(t) {
  kt.parseError = t;
}, pr = [];
let en = !1;
const uh = async () => {
  if (!en) {
    for (en = !0; pr.length > 0; ) {
      const t = pr.shift();
      if (t)
        try {
          await t();
        } catch (e) {
          L.error("Error executing queue", e);
        }
    }
    en = !1;
  }
}, f1 = async (t, e) => new Promise((i, r) => {
  const n = () => new Promise((o, s) => {
    ye.parse(t, e).then(
      (a) => {
        o(a), i(a);
      },
      (a) => {
        var l;
        L.error("Error parsing", a), (l = kt.parseError) == null || l.call(kt, a), s(a), r(a);
      }
    );
  });
  pr.push(n), uh().catch(r);
}), fh = (t, e, i) => new Promise((r, n) => {
  const o = () => new Promise((s, a) => {
    ye.render(t, e, i).then(
      (l) => {
        s(l), r(l);
      },
      (l) => {
        var h;
        L.error("Error parsing", l), (h = kt.parseError) == null || h.call(kt, l), a(l), n(l);
      }
    );
  });
  pr.push(o), uh().catch(n);
}), kt = {
  startOnLoad: !0,
  mermaidAPI: ye,
  parse: f1,
  render: fh,
  init: h1,
  run: lh,
  registerExternalDiagrams: c1,
  initialize: hh,
  parseError: void 0,
  contentLoaded: ch,
  setParseErrorHandler: u1,
  detectType: kr
};
export {
  An as $,
  ni as A,
  ei as B,
  N_ as C,
  R_ as D,
  M_ as E,
  jf as F,
  S1 as G,
  I0 as H,
  H_ as I,
  Fn as J,
  na as K,
  yi as L,
  mu as M,
  aa as N,
  d1 as O,
  Th as P,
  kh as Q,
  pt as R,
  mt as S,
  vh as T,
  Y_ as U,
  b1 as V,
  Tp as W,
  cl as X,
  Un as Y,
  mp as Z,
  Rt as _,
  D_ as a,
  Pe as a$,
  ie as a0,
  li as a1,
  No as a2,
  ku as a3,
  os as a4,
  C0 as a5,
  v1 as a6,
  O0 as a7,
  _e as a8,
  d0 as a9,
  Ho as aA,
  x1 as aB,
  _1 as aC,
  p1 as aD,
  g1 as aE,
  k1 as aF,
  T1 as aG,
  y1 as aH,
  $ as aI,
  Nt as aJ,
  bi as aK,
  Re as aL,
  rr as aM,
  Km as aN,
  kC as aO,
  xi as aP,
  or as aQ,
  jm as aR,
  Za as aS,
  zg as aT,
  Wg as aU,
  $C as aV,
  ys as aW,
  Hg as aX,
  zn as aY,
  Pg as aZ,
  Vg as a_,
  n0 as aa,
  qt as ab,
  p0 as ac,
  g0 as ad,
  nl as ae,
  Sr as af,
  Fr as ag,
  sr as ah,
  Ng as ai,
  qn as aj,
  sl as ak,
  rl as al,
  Hm as am,
  Nm as an,
  o0 as ao,
  _0 as ap,
  _i as aq,
  E1 as ar,
  P_ as as,
  Ci as at,
  B as au,
  E as av,
  On as aw,
  m1 as ax,
  C1 as ay,
  jo as az,
  I_ as b,
  se as b0,
  fs as b1,
  Wn as b2,
  Qa as b3,
  Tn as b4,
  em as b5,
  Zr as b6,
  U0 as b7,
  bh as b8,
  kt as b9,
  Jn as c,
  ci as d,
  js as e,
  Rn as f,
  $_ as g,
  ot as h,
  ar as i,
  Tt as j,
  Pl as k,
  L as l,
  q0 as m,
  zf as n,
  M0 as o,
  Da as p,
  v0 as q,
  Rd as r,
  O_ as s,
  F_ as t,
  L1 as u,
  ra as v,
  R0 as w,
  Oh as x,
  um as y,
  Pn as z
};
