function dh(t) {
  for (var e = [], i = 1; i < arguments.length; i++)
    e[i - 1] = arguments[i];
  var r = Array.from(typeof t == "string" ? [t] : t);
  r[r.length - 1] = r[r.length - 1].replace(/\r?\n([\t ]*)$/, "");
  var n = r.reduce(function(a, l) {
    var h = l.match(/\n([\t ]+|(?!\s).)/g);
    return h ? a.concat(h.map(function(c) {
      var u, g;
      return (g = (u = c.match(/[\t ]/g)) === null || u === void 0 ? void 0 : u.length) !== null && g !== void 0 ? g : 0;
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
    var h = s.match(/(?:^|\n)( *)$/), c = h ? h[1] : "", u = a;
    typeof a == "string" && a.includes(`
`) && (u = String(a).split(`
`).map(function(g, p) {
      return p === 0 ? g : "" + c + g;
    }).join(`
`)), s += u + r[l + 1];
  }), s;
}
var ph = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function gh(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var As = { exports: {} };
(function(t, e) {
  (function(i, r) {
    t.exports = r();
  })(ph, function() {
    var i = 1e3, r = 6e4, n = 36e5, o = "millisecond", s = "second", a = "minute", l = "hour", h = "day", c = "week", u = "month", g = "quarter", p = "year", _ = "date", v = "Invalid Date", O = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, P = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, S = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(E) {
      var T = ["th", "st", "nd", "rd"], x = E % 100;
      return "[" + E + (T[(x - 20) % 10] || T[x] || T[0]) + "]";
    } }, z = function(E, T, x) {
      var M = String(E);
      return !M || M.length >= T ? E : "" + Array(T + 1 - M.length).join(x) + E;
    }, Q = { s: z, z: function(E) {
      var T = -E.utcOffset(), x = Math.abs(T), M = Math.floor(x / 60), y = x % 60;
      return (T <= 0 ? "+" : "-") + z(M, 2, "0") + ":" + z(y, 2, "0");
    }, m: function E(T, x) {
      if (T.date() < x.date())
        return -E(x, T);
      var M = 12 * (x.year() - T.year()) + (x.month() - T.month()), y = T.clone().add(M, u), D = x - y < 0, k = T.clone().add(M + (D ? -1 : 1), u);
      return +(-(M + (x - y) / (D ? y - k : k - y)) || 0);
    }, a: function(E) {
      return E < 0 ? Math.ceil(E) || 0 : Math.floor(E);
    }, p: function(E) {
      return { M: u, y: p, w: c, d: h, D: _, h: l, m: a, s, ms: o, Q: g }[E] || String(E || "").toLowerCase().replace(/s$/, "");
    }, u: function(E) {
      return E === void 0;
    } }, X = "en", G = {};
    G[X] = S;
    var W = function(E) {
      return E instanceof Nt;
    }, Vt = function E(T, x, M) {
      var y;
      if (!T)
        return X;
      if (typeof T == "string") {
        var D = T.toLowerCase();
        G[D] && (y = D), x && (G[D] = x, y = D);
        var k = T.split("-");
        if (!y && k.length > 1)
          return E(k[0]);
      } else {
        var H = T.name;
        G[H] = T, y = H;
      }
      return !M && y && (X = y), y || !M && X;
    }, K = function(E, T) {
      if (W(E))
        return E.clone();
      var x = typeof T == "object" ? T : {};
      return x.date = E, x.args = arguments, new Nt(x);
    }, I = Q;
    I.l = Vt, I.i = W, I.w = function(E, T) {
      return K(E, { locale: T.$L, utc: T.$u, x: T.$x, $offset: T.$offset });
    };
    var Nt = function() {
      function E(x) {
        this.$L = Vt(x.locale, null, !0), this.parse(x);
      }
      var T = E.prototype;
      return T.parse = function(x) {
        this.$d = function(M) {
          var y = M.date, D = M.utc;
          if (y === null)
            return /* @__PURE__ */ new Date(NaN);
          if (I.u(y))
            return /* @__PURE__ */ new Date();
          if (y instanceof Date)
            return new Date(y);
          if (typeof y == "string" && !/Z$/i.test(y)) {
            var k = y.match(O);
            if (k) {
              var H = k[2] - 1 || 0, R = (k[7] || "0").substring(0, 3);
              return D ? new Date(Date.UTC(k[1], H, k[3] || 1, k[4] || 0, k[5] || 0, k[6] || 0, R)) : new Date(k[1], H, k[3] || 1, k[4] || 0, k[5] || 0, k[6] || 0, R);
            }
          }
          return new Date(y);
        }(x), this.$x = x.x || {}, this.init();
      }, T.init = function() {
        var x = this.$d;
        this.$y = x.getFullYear(), this.$M = x.getMonth(), this.$D = x.getDate(), this.$W = x.getDay(), this.$H = x.getHours(), this.$m = x.getMinutes(), this.$s = x.getSeconds(), this.$ms = x.getMilliseconds();
      }, T.$utils = function() {
        return I;
      }, T.isValid = function() {
        return this.$d.toString() !== v;
      }, T.isSame = function(x, M) {
        var y = K(x);
        return this.startOf(M) <= y && y <= this.endOf(M);
      }, T.isAfter = function(x, M) {
        return K(x) < this.startOf(M);
      }, T.isBefore = function(x, M) {
        return this.endOf(M) < K(x);
      }, T.$g = function(x, M, y) {
        return I.u(x) ? this[M] : this.set(y, x);
      }, T.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, T.valueOf = function() {
        return this.$d.getTime();
      }, T.startOf = function(x, M) {
        var y = this, D = !!I.u(M) || M, k = I.p(x), H = function(Pt, it) {
          var st = I.w(y.$u ? Date.UTC(y.$y, it, Pt) : new Date(y.$y, it, Pt), y);
          return D ? st : st.endOf(h);
        }, R = function(Pt, it) {
          return I.w(y.toDate()[Pt].apply(y.toDate("s"), (D ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(it)), y);
        }, U = this.$W, q = this.$M, ct = this.$D, pt = "set" + (this.$u ? "UTC" : "");
        switch (k) {
          case p:
            return D ? H(1, 0) : H(31, 11);
          case u:
            return D ? H(1, q) : H(0, q + 1);
          case c:
            var Xt = this.$locale().weekStart || 0, Rt = (U < Xt ? U + 7 : U) - Xt;
            return H(D ? ct - Rt : ct + (6 - Rt), q);
          case h:
          case _:
            return R(pt + "Hours", 0);
          case l:
            return R(pt + "Minutes", 1);
          case a:
            return R(pt + "Seconds", 2);
          case s:
            return R(pt + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, T.endOf = function(x) {
        return this.startOf(x, !1);
      }, T.$set = function(x, M) {
        var y, D = I.p(x), k = "set" + (this.$u ? "UTC" : ""), H = (y = {}, y[h] = k + "Date", y[_] = k + "Date", y[u] = k + "Month", y[p] = k + "FullYear", y[l] = k + "Hours", y[a] = k + "Minutes", y[s] = k + "Seconds", y[o] = k + "Milliseconds", y)[D], R = D === h ? this.$D + (M - this.$W) : M;
        if (D === u || D === p) {
          var U = this.clone().set(_, 1);
          U.$d[H](R), U.init(), this.$d = U.set(_, Math.min(this.$D, U.daysInMonth())).$d;
        } else
          H && this.$d[H](R);
        return this.init(), this;
      }, T.set = function(x, M) {
        return this.clone().$set(x, M);
      }, T.get = function(x) {
        return this[I.p(x)]();
      }, T.add = function(x, M) {
        var y, D = this;
        x = Number(x);
        var k = I.p(M), H = function(q) {
          var ct = K(D);
          return I.w(ct.date(ct.date() + Math.round(q * x)), D);
        };
        if (k === u)
          return this.set(u, this.$M + x);
        if (k === p)
          return this.set(p, this.$y + x);
        if (k === h)
          return H(1);
        if (k === c)
          return H(7);
        var R = (y = {}, y[a] = r, y[l] = n, y[s] = i, y)[k] || 1, U = this.$d.getTime() + x * R;
        return I.w(U, this);
      }, T.subtract = function(x, M) {
        return this.add(-1 * x, M);
      }, T.format = function(x) {
        var M = this, y = this.$locale();
        if (!this.isValid())
          return y.invalidDate || v;
        var D = x || "YYYY-MM-DDTHH:mm:ssZ", k = I.z(this), H = this.$H, R = this.$m, U = this.$M, q = y.weekdays, ct = y.months, pt = function(it, st, St, Kt) {
          return it && (it[st] || it(M, D)) || St[st].slice(0, Kt);
        }, Xt = function(it) {
          return I.s(H % 12 || 12, it, "0");
        }, Rt = y.meridiem || function(it, st, St) {
          var Kt = it < 12 ? "AM" : "PM";
          return St ? Kt.toLowerCase() : Kt;
        }, Pt = { YY: String(this.$y).slice(-2), YYYY: this.$y, M: U + 1, MM: I.s(U + 1, 2, "0"), MMM: pt(y.monthsShort, U, ct, 3), MMMM: pt(ct, U), D: this.$D, DD: I.s(this.$D, 2, "0"), d: String(this.$W), dd: pt(y.weekdaysMin, this.$W, q, 2), ddd: pt(y.weekdaysShort, this.$W, q, 3), dddd: q[this.$W], H: String(H), HH: I.s(H, 2, "0"), h: Xt(1), hh: Xt(2), a: Rt(H, R, !0), A: Rt(H, R, !1), m: String(R), mm: I.s(R, 2, "0"), s: String(this.$s), ss: I.s(this.$s, 2, "0"), SSS: I.s(this.$ms, 3, "0"), Z: k };
        return D.replace(P, function(it, st) {
          return st || Pt[it] || k.replace(":", "");
        });
      }, T.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, T.diff = function(x, M, y) {
        var D, k = I.p(M), H = K(x), R = (H.utcOffset() - this.utcOffset()) * r, U = this - H, q = I.m(this, H);
        return q = (D = {}, D[p] = q / 12, D[u] = q, D[g] = q / 3, D[c] = (U - R) / 6048e5, D[h] = (U - R) / 864e5, D[l] = U / n, D[a] = U / r, D[s] = U / i, D)[k] || U, y ? q : I.a(q);
      }, T.daysInMonth = function() {
        return this.endOf(u).$D;
      }, T.$locale = function() {
        return G[this.$L];
      }, T.locale = function(x, M) {
        if (!x)
          return this.$L;
        var y = this.clone(), D = Vt(x, M, !0);
        return D && (y.$L = D), y;
      }, T.clone = function() {
        return I.w(this.$d, this);
      }, T.toDate = function() {
        return new Date(this.valueOf());
      }, T.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, T.toISOString = function() {
        return this.$d.toISOString();
      }, T.toString = function() {
        return this.$d.toUTCString();
      }, E;
    }(), At = Nt.prototype;
    return K.prototype = At, [["$ms", o], ["$s", s], ["$m", a], ["$H", l], ["$W", h], ["$M", u], ["$y", p], ["$D", _]].forEach(function(E) {
      At[E[1]] = function(T) {
        return this.$g(T, E[0], E[1]);
      };
    }), K.extend = function(E, T) {
      return E.$i || (E(T, Nt, K), E.$i = !0), K;
    }, K.locale = Vt, K.isDayjs = W, K.unix = function(E) {
      return K(1e3 * E);
    }, K.en = G[X], K.Ls = G, K.p = {}, K;
  });
})(As);
var mh = As.exports;
const _h = /* @__PURE__ */ gh(mh), Wt = {
  trace: 0,
  debug: 1,
  info: 2,
  warn: 3,
  error: 4,
  fatal: 5
}, w = {
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
  let e = Wt.fatal;
  typeof t == "string" ? (t = t.toLowerCase(), t in Wt && (e = Wt[t])) : typeof t == "number" && (e = t), w.trace = () => {
  }, w.debug = () => {
  }, w.info = () => {
  }, w.warn = () => {
  }, w.error = () => {
  }, w.fatal = () => {
  }, e <= Wt.fatal && (w.fatal = console.error ? console.error.bind(console, yt("FATAL"), "color: orange") : console.log.bind(console, "\x1B[35m", yt("FATAL"))), e <= Wt.error && (w.error = console.error ? console.error.bind(console, yt("ERROR"), "color: orange") : console.log.bind(console, "\x1B[31m", yt("ERROR"))), e <= Wt.warn && (w.warn = console.warn ? console.warn.bind(console, yt("WARN"), "color: orange") : console.log.bind(console, "\x1B[33m", yt("WARN"))), e <= Wt.info && (w.info = console.info ? console.info.bind(console, yt("INFO"), "color: lightblue") : console.log.bind(console, "\x1B[34m", yt("INFO"))), e <= Wt.debug && (w.debug = console.debug ? console.debug.bind(console, yt("DEBUG"), "color: lightgreen") : console.log.bind(console, "\x1B[32m", yt("DEBUG"))), e <= Wt.trace && (w.trace = console.debug ? console.debug.bind(console, yt("TRACE"), "color: lightgreen") : console.log.bind(console, "\x1B[32m", yt("TRACE")));
}, yt = (t) => `%c${_h().format("ss.SSS")} : ${t} : `;
var kn = {};
Object.defineProperty(kn, "__esModule", { value: !0 });
var Es = kn.sanitizeUrl = void 0, yh = /^([^\w]*)(javascript|data|vbscript)/im, Ch = /&#(\w+)(^\w|;)?/g, xh = /&(newline|tab);/gi, bh = /[\u0000-\u001F\u007F-\u009F\u2000-\u200D\uFEFF]/gim, Th = /^.+(:|&colon;)/gim, Sh = [".", "/"];
function vh(t) {
  return Sh.indexOf(t[0]) > -1;
}
function kh(t) {
  return t.replace(Ch, function(e, i) {
    return String.fromCharCode(i);
  });
}
function wh(t) {
  var e = kh(t || "").replace(xh, "").replace(bh, "").trim();
  if (!e)
    return "about:blank";
  if (vh(e))
    return e;
  var i = e.match(Th);
  if (!i)
    return e;
  var r = i[0];
  return yh.test(r) ? "about:blank" : e;
}
Es = kn.sanitizeUrl = wh;
var Bh = { value: () => {
} };
function Os() {
  for (var t = 0, e = arguments.length, i = {}, r; t < e; ++t) {
    if (!(r = arguments[t] + "") || r in i || /[\s.]/.test(r))
      throw new Error("illegal type: " + r);
    i[r] = [];
  }
  return new Fi(i);
}
function Fi(t) {
  this._ = t;
}
function Fh(t, e) {
  return t.trim().split(/^|\s+/).map(function(i) {
    var r = "", n = i.indexOf(".");
    if (n >= 0 && (r = i.slice(n + 1), i = i.slice(0, n)), i && !e.hasOwnProperty(i))
      throw new Error("unknown type: " + i);
    return { type: i, name: r };
  });
}
Fi.prototype = Os.prototype = {
  constructor: Fi,
  on: function(t, e) {
    var i = this._, r = Fh(t + "", i), n, o = -1, s = r.length;
    if (arguments.length < 2) {
      for (; ++o < s; )
        if ((n = (t = r[o]).type) && (n = Lh(i[n], t.name)))
          return n;
      return;
    }
    if (e != null && typeof e != "function")
      throw new Error("invalid callback: " + e);
    for (; ++o < s; )
      if (n = (t = r[o]).type)
        i[n] = Co(i[n], t.name, e);
      else if (e == null)
        for (n in i)
          i[n] = Co(i[n], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, e = this._;
    for (var i in e)
      t[i] = e[i].slice();
    return new Fi(t);
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
function Lh(t, e) {
  for (var i = 0, r = t.length, n; i < r; ++i)
    if ((n = t[i]).name === e)
      return n.value;
}
function Co(t, e, i) {
  for (var r = 0, n = t.length; r < n; ++r)
    if (t[r].name === e) {
      t[r] = Bh, t = t.slice(0, r).concat(t.slice(r + 1));
      break;
    }
  return i != null && t.push({ name: e, value: i }), t;
}
var en = "http://www.w3.org/1999/xhtml";
const xo = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: en,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function cr(t) {
  var e = t += "", i = e.indexOf(":");
  return i >= 0 && (e = t.slice(0, i)) !== "xmlns" && (t = t.slice(i + 1)), xo.hasOwnProperty(e) ? { space: xo[e], local: t } : t;
}
function Ah(t) {
  return function() {
    var e = this.ownerDocument, i = this.namespaceURI;
    return i === en && e.documentElement.namespaceURI === en ? e.createElement(t) : e.createElementNS(i, t);
  };
}
function Eh(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function Ms(t) {
  var e = cr(t);
  return (e.local ? Eh : Ah)(e);
}
function Oh() {
}
function wn(t) {
  return t == null ? Oh : function() {
    return this.querySelector(t);
  };
}
function Mh(t) {
  typeof t != "function" && (t = wn(t));
  for (var e = this._groups, i = e.length, r = new Array(i), n = 0; n < i; ++n)
    for (var o = e[n], s = o.length, a = r[n] = new Array(s), l, h, c = 0; c < s; ++c)
      (l = o[c]) && (h = t.call(l, l.__data__, c, o)) && ("__data__" in l && (h.__data__ = l.__data__), a[c] = h);
  return new mt(r, this._parents);
}
function $h(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function Ih() {
  return [];
}
function $s(t) {
  return t == null ? Ih : function() {
    return this.querySelectorAll(t);
  };
}
function Dh(t) {
  return function() {
    return $h(t.apply(this, arguments));
  };
}
function Nh(t) {
  typeof t == "function" ? t = Dh(t) : t = $s(t);
  for (var e = this._groups, i = e.length, r = [], n = [], o = 0; o < i; ++o)
    for (var s = e[o], a = s.length, l, h = 0; h < a; ++h)
      (l = s[h]) && (r.push(t.call(l, l.__data__, h, s)), n.push(l));
  return new mt(r, n);
}
function Is(t) {
  return function() {
    return this.matches(t);
  };
}
function Ds(t) {
  return function(e) {
    return e.matches(t);
  };
}
var Rh = Array.prototype.find;
function Ph(t) {
  return function() {
    return Rh.call(this.children, t);
  };
}
function qh() {
  return this.firstElementChild;
}
function zh(t) {
  return this.select(t == null ? qh : Ph(typeof t == "function" ? t : Ds(t)));
}
var Wh = Array.prototype.filter;
function Hh() {
  return Array.from(this.children);
}
function jh(t) {
  return function() {
    return Wh.call(this.children, t);
  };
}
function Uh(t) {
  return this.selectAll(t == null ? Hh : jh(typeof t == "function" ? t : Ds(t)));
}
function Yh(t) {
  typeof t != "function" && (t = Is(t));
  for (var e = this._groups, i = e.length, r = new Array(i), n = 0; n < i; ++n)
    for (var o = e[n], s = o.length, a = r[n] = [], l, h = 0; h < s; ++h)
      (l = o[h]) && t.call(l, l.__data__, h, o) && a.push(l);
  return new mt(r, this._parents);
}
function Ns(t) {
  return new Array(t.length);
}
function Gh() {
  return new mt(this._enter || this._groups.map(Ns), this._parents);
}
function qi(t, e) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = e;
}
qi.prototype = {
  constructor: qi,
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
function Vh(t) {
  return function() {
    return t;
  };
}
function Xh(t, e, i, r, n, o) {
  for (var s = 0, a, l = e.length, h = o.length; s < h; ++s)
    (a = e[s]) ? (a.__data__ = o[s], r[s] = a) : i[s] = new qi(t, o[s]);
  for (; s < l; ++s)
    (a = e[s]) && (n[s] = a);
}
function Kh(t, e, i, r, n, o, s) {
  var a, l, h = /* @__PURE__ */ new Map(), c = e.length, u = o.length, g = new Array(c), p;
  for (a = 0; a < c; ++a)
    (l = e[a]) && (g[a] = p = s.call(l, l.__data__, a, e) + "", h.has(p) ? n[a] = l : h.set(p, l));
  for (a = 0; a < u; ++a)
    p = s.call(t, o[a], a, o) + "", (l = h.get(p)) ? (r[a] = l, l.__data__ = o[a], h.delete(p)) : i[a] = new qi(t, o[a]);
  for (a = 0; a < c; ++a)
    (l = e[a]) && h.get(g[a]) === l && (n[a] = l);
}
function Zh(t) {
  return t.__data__;
}
function Jh(t, e) {
  if (!arguments.length)
    return Array.from(this, Zh);
  var i = e ? Kh : Xh, r = this._parents, n = this._groups;
  typeof t != "function" && (t = Vh(t));
  for (var o = n.length, s = new Array(o), a = new Array(o), l = new Array(o), h = 0; h < o; ++h) {
    var c = r[h], u = n[h], g = u.length, p = Qh(t.call(c, c && c.__data__, h, r)), _ = p.length, v = a[h] = new Array(_), O = s[h] = new Array(_), P = l[h] = new Array(g);
    i(c, u, v, O, P, p, e);
    for (var S = 0, z = 0, Q, X; S < _; ++S)
      if (Q = v[S]) {
        for (S >= z && (z = S + 1); !(X = O[z]) && ++z < _; )
          ;
        Q._next = X || null;
      }
  }
  return s = new mt(s, r), s._enter = a, s._exit = l, s;
}
function Qh(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function tc() {
  return new mt(this._exit || this._groups.map(Ns), this._parents);
}
function ec(t, e, i) {
  var r = this.enter(), n = this, o = this.exit();
  return typeof t == "function" ? (r = t(r), r && (r = r.selection())) : r = r.append(t + ""), e != null && (n = e(n), n && (n = n.selection())), i == null ? o.remove() : i(o), r && n ? r.merge(n).order() : n;
}
function ic(t) {
  for (var e = t.selection ? t.selection() : t, i = this._groups, r = e._groups, n = i.length, o = r.length, s = Math.min(n, o), a = new Array(n), l = 0; l < s; ++l)
    for (var h = i[l], c = r[l], u = h.length, g = a[l] = new Array(u), p, _ = 0; _ < u; ++_)
      (p = h[_] || c[_]) && (g[_] = p);
  for (; l < n; ++l)
    a[l] = i[l];
  return new mt(a, this._parents);
}
function rc() {
  for (var t = this._groups, e = -1, i = t.length; ++e < i; )
    for (var r = t[e], n = r.length - 1, o = r[n], s; --n >= 0; )
      (s = r[n]) && (o && s.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(s, o), o = s);
  return this;
}
function nc(t) {
  t || (t = oc);
  function e(u, g) {
    return u && g ? t(u.__data__, g.__data__) : !u - !g;
  }
  for (var i = this._groups, r = i.length, n = new Array(r), o = 0; o < r; ++o) {
    for (var s = i[o], a = s.length, l = n[o] = new Array(a), h, c = 0; c < a; ++c)
      (h = s[c]) && (l[c] = h);
    l.sort(e);
  }
  return new mt(n, this._parents).order();
}
function oc(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function sc() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function ac() {
  return Array.from(this);
}
function lc() {
  for (var t = this._groups, e = 0, i = t.length; e < i; ++e)
    for (var r = t[e], n = 0, o = r.length; n < o; ++n) {
      var s = r[n];
      if (s)
        return s;
    }
  return null;
}
function hc() {
  let t = 0;
  for (const e of this)
    ++t;
  return t;
}
function cc() {
  return !this.node();
}
function uc(t) {
  for (var e = this._groups, i = 0, r = e.length; i < r; ++i)
    for (var n = e[i], o = 0, s = n.length, a; o < s; ++o)
      (a = n[o]) && t.call(a, a.__data__, o, n);
  return this;
}
function fc(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function dc(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function pc(t, e) {
  return function() {
    this.setAttribute(t, e);
  };
}
function gc(t, e) {
  return function() {
    this.setAttributeNS(t.space, t.local, e);
  };
}
function mc(t, e) {
  return function() {
    var i = e.apply(this, arguments);
    i == null ? this.removeAttribute(t) : this.setAttribute(t, i);
  };
}
function _c(t, e) {
  return function() {
    var i = e.apply(this, arguments);
    i == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, i);
  };
}
function yc(t, e) {
  var i = cr(t);
  if (arguments.length < 2) {
    var r = this.node();
    return i.local ? r.getAttributeNS(i.space, i.local) : r.getAttribute(i);
  }
  return this.each((e == null ? i.local ? dc : fc : typeof e == "function" ? i.local ? _c : mc : i.local ? gc : pc)(i, e));
}
function Rs(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function Cc(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function xc(t, e, i) {
  return function() {
    this.style.setProperty(t, e, i);
  };
}
function bc(t, e, i) {
  return function() {
    var r = e.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, i);
  };
}
function Tc(t, e, i) {
  return arguments.length > 1 ? this.each((e == null ? Cc : typeof e == "function" ? bc : xc)(t, e, i ?? "")) : Le(this.node(), t);
}
function Le(t, e) {
  return t.style.getPropertyValue(e) || Rs(t).getComputedStyle(t, null).getPropertyValue(e);
}
function Sc(t) {
  return function() {
    delete this[t];
  };
}
function vc(t, e) {
  return function() {
    this[t] = e;
  };
}
function kc(t, e) {
  return function() {
    var i = e.apply(this, arguments);
    i == null ? delete this[t] : this[t] = i;
  };
}
function wc(t, e) {
  return arguments.length > 1 ? this.each((e == null ? Sc : typeof e == "function" ? kc : vc)(t, e)) : this.node()[t];
}
function Ps(t) {
  return t.trim().split(/^|\s+/);
}
function Bn(t) {
  return t.classList || new qs(t);
}
function qs(t) {
  this._node = t, this._names = Ps(t.getAttribute("class") || "");
}
qs.prototype = {
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
function zs(t, e) {
  for (var i = Bn(t), r = -1, n = e.length; ++r < n; )
    i.add(e[r]);
}
function Ws(t, e) {
  for (var i = Bn(t), r = -1, n = e.length; ++r < n; )
    i.remove(e[r]);
}
function Bc(t) {
  return function() {
    zs(this, t);
  };
}
function Fc(t) {
  return function() {
    Ws(this, t);
  };
}
function Lc(t, e) {
  return function() {
    (e.apply(this, arguments) ? zs : Ws)(this, t);
  };
}
function Ac(t, e) {
  var i = Ps(t + "");
  if (arguments.length < 2) {
    for (var r = Bn(this.node()), n = -1, o = i.length; ++n < o; )
      if (!r.contains(i[n]))
        return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? Lc : e ? Bc : Fc)(i, e));
}
function Ec() {
  this.textContent = "";
}
function Oc(t) {
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
function $c(t) {
  return arguments.length ? this.each(t == null ? Ec : (typeof t == "function" ? Mc : Oc)(t)) : this.node().textContent;
}
function Ic() {
  this.innerHTML = "";
}
function Dc(t) {
  return function() {
    this.innerHTML = t;
  };
}
function Nc(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function Rc(t) {
  return arguments.length ? this.each(t == null ? Ic : (typeof t == "function" ? Nc : Dc)(t)) : this.node().innerHTML;
}
function Pc() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function qc() {
  return this.each(Pc);
}
function zc() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Wc() {
  return this.each(zc);
}
function Hc(t) {
  var e = typeof t == "function" ? t : Ms(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function jc() {
  return null;
}
function Uc(t, e) {
  var i = typeof t == "function" ? t : Ms(t), r = e == null ? jc : typeof e == "function" ? e : wn(e);
  return this.select(function() {
    return this.insertBefore(i.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function Yc() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function Gc() {
  return this.each(Yc);
}
function Vc() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Xc() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Kc(t) {
  return this.select(t ? Xc : Vc);
}
function Zc(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function Jc(t) {
  return function(e) {
    t.call(this, e, this.__data__);
  };
}
function Qc(t) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var i = "", r = e.indexOf(".");
    return r >= 0 && (i = e.slice(r + 1), e = e.slice(0, r)), { type: e, name: i };
  });
}
function tu(t) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var i = 0, r = -1, n = e.length, o; i < n; ++i)
        o = e[i], (!t.type || o.type === t.type) && o.name === t.name ? this.removeEventListener(o.type, o.listener, o.options) : e[++r] = o;
      ++r ? e.length = r : delete this.__on;
    }
  };
}
function eu(t, e, i) {
  return function() {
    var r = this.__on, n, o = Jc(e);
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
function iu(t, e, i) {
  var r = Qc(t + ""), n, o = r.length, s;
  if (arguments.length < 2) {
    var a = this.node().__on;
    if (a) {
      for (var l = 0, h = a.length, c; l < h; ++l)
        for (n = 0, c = a[l]; n < o; ++n)
          if ((s = r[n]).type === c.type && s.name === c.name)
            return c.value;
    }
    return;
  }
  for (a = e ? eu : tu, n = 0; n < o; ++n)
    this.each(a(r[n], e, i));
  return this;
}
function Hs(t, e, i) {
  var r = Rs(t), n = r.CustomEvent;
  typeof n == "function" ? n = new n(e, i) : (n = r.document.createEvent("Event"), i ? (n.initEvent(e, i.bubbles, i.cancelable), n.detail = i.detail) : n.initEvent(e, !1, !1)), t.dispatchEvent(n);
}
function ru(t, e) {
  return function() {
    return Hs(this, t, e);
  };
}
function nu(t, e) {
  return function() {
    return Hs(this, t, e.apply(this, arguments));
  };
}
function ou(t, e) {
  return this.each((typeof e == "function" ? nu : ru)(t, e));
}
function* su() {
  for (var t = this._groups, e = 0, i = t.length; e < i; ++e)
    for (var r = t[e], n = 0, o = r.length, s; n < o; ++n)
      (s = r[n]) && (yield s);
}
var js = [null];
function mt(t, e) {
  this._groups = t, this._parents = e;
}
function li() {
  return new mt([[document.documentElement]], js);
}
function au() {
  return this;
}
mt.prototype = li.prototype = {
  constructor: mt,
  select: Mh,
  selectAll: Nh,
  selectChild: zh,
  selectChildren: Uh,
  filter: Yh,
  data: Jh,
  enter: Gh,
  exit: tc,
  join: ec,
  merge: ic,
  selection: au,
  order: rc,
  sort: nc,
  call: sc,
  nodes: ac,
  node: lc,
  size: hc,
  empty: cc,
  each: uc,
  attr: yc,
  style: Tc,
  property: wc,
  classed: Ac,
  text: $c,
  html: Rc,
  raise: qc,
  lower: Wc,
  append: Hc,
  insert: Uc,
  remove: Gc,
  clone: Kc,
  datum: Zc,
  on: iu,
  dispatch: ou,
  [Symbol.iterator]: su
};
function Ct(t) {
  return typeof t == "string" ? new mt([[document.querySelector(t)]], [document.documentElement]) : new mt([[t]], js);
}
function Fn(t, e, i) {
  t.prototype = e.prototype = i, i.constructor = t;
}
function Us(t, e) {
  var i = Object.create(t.prototype);
  for (var r in e)
    i[r] = e[r];
  return i;
}
function hi() {
}
var Ke = 0.7, zi = 1 / Ke, Fe = "\\s*([+-]?\\d+)\\s*", Ze = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Ot = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", lu = /^#([0-9a-f]{3,8})$/, hu = new RegExp(`^rgb\\(${Fe},${Fe},${Fe}\\)$`), cu = new RegExp(`^rgb\\(${Ot},${Ot},${Ot}\\)$`), uu = new RegExp(`^rgba\\(${Fe},${Fe},${Fe},${Ze}\\)$`), fu = new RegExp(`^rgba\\(${Ot},${Ot},${Ot},${Ze}\\)$`), du = new RegExp(`^hsl\\(${Ze},${Ot},${Ot}\\)$`), pu = new RegExp(`^hsla\\(${Ze},${Ot},${Ot},${Ze}\\)$`), bo = {
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
Fn(hi, Je, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: To,
  // Deprecated! Use color.formatHex.
  formatHex: To,
  formatHex8: gu,
  formatHsl: mu,
  formatRgb: So,
  toString: So
});
function To() {
  return this.rgb().formatHex();
}
function gu() {
  return this.rgb().formatHex8();
}
function mu() {
  return Ys(this).formatHsl();
}
function So() {
  return this.rgb().formatRgb();
}
function Je(t) {
  var e, i;
  return t = (t + "").trim().toLowerCase(), (e = lu.exec(t)) ? (i = e[1].length, e = parseInt(e[1], 16), i === 6 ? vo(e) : i === 3 ? new ft(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : i === 8 ? Ci(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : i === 4 ? Ci(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = hu.exec(t)) ? new ft(e[1], e[2], e[3], 1) : (e = cu.exec(t)) ? new ft(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = uu.exec(t)) ? Ci(e[1], e[2], e[3], e[4]) : (e = fu.exec(t)) ? Ci(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = du.exec(t)) ? Bo(e[1], e[2] / 100, e[3] / 100, 1) : (e = pu.exec(t)) ? Bo(e[1], e[2] / 100, e[3] / 100, e[4]) : bo.hasOwnProperty(t) ? vo(bo[t]) : t === "transparent" ? new ft(NaN, NaN, NaN, 0) : null;
}
function vo(t) {
  return new ft(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function Ci(t, e, i, r) {
  return r <= 0 && (t = e = i = NaN), new ft(t, e, i, r);
}
function _u(t) {
  return t instanceof hi || (t = Je(t)), t ? (t = t.rgb(), new ft(t.r, t.g, t.b, t.opacity)) : new ft();
}
function rn(t, e, i, r) {
  return arguments.length === 1 ? _u(t) : new ft(t, e, i, r ?? 1);
}
function ft(t, e, i, r) {
  this.r = +t, this.g = +e, this.b = +i, this.opacity = +r;
}
Fn(ft, rn, Us(hi, {
  brighter(t) {
    return t = t == null ? zi : Math.pow(zi, t), new ft(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Ke : Math.pow(Ke, t), new ft(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new ft(ce(this.r), ce(this.g), ce(this.b), Wi(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: ko,
  // Deprecated! Use color.formatHex.
  formatHex: ko,
  formatHex8: yu,
  formatRgb: wo,
  toString: wo
}));
function ko() {
  return `#${he(this.r)}${he(this.g)}${he(this.b)}`;
}
function yu() {
  return `#${he(this.r)}${he(this.g)}${he(this.b)}${he((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function wo() {
  const t = Wi(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${ce(this.r)}, ${ce(this.g)}, ${ce(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function Wi(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function ce(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function he(t) {
  return t = ce(t), (t < 16 ? "0" : "") + t.toString(16);
}
function Bo(t, e, i, r) {
  return r <= 0 ? t = e = i = NaN : i <= 0 || i >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new kt(t, e, i, r);
}
function Ys(t) {
  if (t instanceof kt)
    return new kt(t.h, t.s, t.l, t.opacity);
  if (t instanceof hi || (t = Je(t)), !t)
    return new kt();
  if (t instanceof kt)
    return t;
  t = t.rgb();
  var e = t.r / 255, i = t.g / 255, r = t.b / 255, n = Math.min(e, i, r), o = Math.max(e, i, r), s = NaN, a = o - n, l = (o + n) / 2;
  return a ? (e === o ? s = (i - r) / a + (i < r) * 6 : i === o ? s = (r - e) / a + 2 : s = (e - i) / a + 4, a /= l < 0.5 ? o + n : 2 - o - n, s *= 60) : a = l > 0 && l < 1 ? 0 : s, new kt(s, a, l, t.opacity);
}
function Cu(t, e, i, r) {
  return arguments.length === 1 ? Ys(t) : new kt(t, e, i, r ?? 1);
}
function kt(t, e, i, r) {
  this.h = +t, this.s = +e, this.l = +i, this.opacity = +r;
}
Fn(kt, Cu, Us(hi, {
  brighter(t) {
    return t = t == null ? zi : Math.pow(zi, t), new kt(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Ke : Math.pow(Ke, t), new kt(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, e = isNaN(t) || isNaN(this.s) ? 0 : this.s, i = this.l, r = i + (i < 0.5 ? i : 1 - i) * e, n = 2 * i - r;
    return new ft(
      Pr(t >= 240 ? t - 240 : t + 120, n, r),
      Pr(t, n, r),
      Pr(t < 120 ? t + 240 : t - 120, n, r),
      this.opacity
    );
  },
  clamp() {
    return new kt(Fo(this.h), xi(this.s), xi(this.l), Wi(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = Wi(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${Fo(this.h)}, ${xi(this.s) * 100}%, ${xi(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function Fo(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function xi(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function Pr(t, e, i) {
  return (t < 60 ? e + (i - e) * t / 60 : t < 180 ? i : t < 240 ? e + (i - e) * (240 - t) / 60 : e) * 255;
}
const Ln = (t) => () => t;
function Gs(t, e) {
  return function(i) {
    return t + i * e;
  };
}
function xu(t, e, i) {
  return t = Math.pow(t, i), e = Math.pow(e, i) - t, i = 1 / i, function(r) {
    return Math.pow(t + r * e, i);
  };
}
function Gb(t, e) {
  var i = e - t;
  return i ? Gs(t, i > 180 || i < -180 ? i - 360 * Math.round(i / 360) : i) : Ln(isNaN(t) ? e : t);
}
function bu(t) {
  return (t = +t) == 1 ? Vs : function(e, i) {
    return i - e ? xu(e, i, t) : Ln(isNaN(e) ? i : e);
  };
}
function Vs(t, e) {
  var i = e - t;
  return i ? Gs(t, i) : Ln(isNaN(t) ? e : t);
}
const Lo = function t(e) {
  var i = bu(e);
  function r(n, o) {
    var s = i((n = rn(n)).r, (o = rn(o)).r), a = i(n.g, o.g), l = i(n.b, o.b), h = Vs(n.opacity, o.opacity);
    return function(c) {
      return n.r = s(c), n.g = a(c), n.b = l(c), n.opacity = h(c), n + "";
    };
  }
  return r.gamma = t, r;
}(1);
function Qt(t, e) {
  return t = +t, e = +e, function(i) {
    return t * (1 - i) + e * i;
  };
}
var nn = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, qr = new RegExp(nn.source, "g");
function Tu(t) {
  return function() {
    return t;
  };
}
function Su(t) {
  return function(e) {
    return t(e) + "";
  };
}
function vu(t, e) {
  var i = nn.lastIndex = qr.lastIndex = 0, r, n, o, s = -1, a = [], l = [];
  for (t = t + "", e = e + ""; (r = nn.exec(t)) && (n = qr.exec(e)); )
    (o = n.index) > i && (o = e.slice(i, o), a[s] ? a[s] += o : a[++s] = o), (r = r[0]) === (n = n[0]) ? a[s] ? a[s] += n : a[++s] = n : (a[++s] = null, l.push({ i: s, x: Qt(r, n) })), i = qr.lastIndex;
  return i < e.length && (o = e.slice(i), a[s] ? a[s] += o : a[++s] = o), a.length < 2 ? l[0] ? Su(l[0].x) : Tu(e) : (e = l.length, function(h) {
    for (var c = 0, u; c < e; ++c)
      a[(u = l[c]).i] = u.x(h);
    return a.join("");
  });
}
var Ao = 180 / Math.PI, on = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function Xs(t, e, i, r, n, o) {
  var s, a, l;
  return (s = Math.sqrt(t * t + e * e)) && (t /= s, e /= s), (l = t * i + e * r) && (i -= t * l, r -= e * l), (a = Math.sqrt(i * i + r * r)) && (i /= a, r /= a, l /= a), t * r < e * i && (t = -t, e = -e, l = -l, s = -s), {
    translateX: n,
    translateY: o,
    rotate: Math.atan2(e, t) * Ao,
    skewX: Math.atan(l) * Ao,
    scaleX: s,
    scaleY: a
  };
}
var bi;
function ku(t) {
  const e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return e.isIdentity ? on : Xs(e.a, e.b, e.c, e.d, e.e, e.f);
}
function wu(t) {
  return t == null || (bi || (bi = document.createElementNS("http://www.w3.org/2000/svg", "g")), bi.setAttribute("transform", t), !(t = bi.transform.baseVal.consolidate())) ? on : (t = t.matrix, Xs(t.a, t.b, t.c, t.d, t.e, t.f));
}
function Ks(t, e, i, r) {
  function n(h) {
    return h.length ? h.pop() + " " : "";
  }
  function o(h, c, u, g, p, _) {
    if (h !== u || c !== g) {
      var v = p.push("translate(", null, e, null, i);
      _.push({ i: v - 4, x: Qt(h, u) }, { i: v - 2, x: Qt(c, g) });
    } else
      (u || g) && p.push("translate(" + u + e + g + i);
  }
  function s(h, c, u, g) {
    h !== c ? (h - c > 180 ? c += 360 : c - h > 180 && (h += 360), g.push({ i: u.push(n(u) + "rotate(", null, r) - 2, x: Qt(h, c) })) : c && u.push(n(u) + "rotate(" + c + r);
  }
  function a(h, c, u, g) {
    h !== c ? g.push({ i: u.push(n(u) + "skewX(", null, r) - 2, x: Qt(h, c) }) : c && u.push(n(u) + "skewX(" + c + r);
  }
  function l(h, c, u, g, p, _) {
    if (h !== u || c !== g) {
      var v = p.push(n(p) + "scale(", null, ",", null, ")");
      _.push({ i: v - 4, x: Qt(h, u) }, { i: v - 2, x: Qt(c, g) });
    } else
      (u !== 1 || g !== 1) && p.push(n(p) + "scale(" + u + "," + g + ")");
  }
  return function(h, c) {
    var u = [], g = [];
    return h = t(h), c = t(c), o(h.translateX, h.translateY, c.translateX, c.translateY, u, g), s(h.rotate, c.rotate, u, g), a(h.skewX, c.skewX, u, g), l(h.scaleX, h.scaleY, c.scaleX, c.scaleY, u, g), h = c = null, function(p) {
      for (var _ = -1, v = g.length, O; ++_ < v; )
        u[(O = g[_]).i] = O.x(p);
      return u.join("");
    };
  };
}
var Bu = Ks(ku, "px, ", "px)", "deg)"), Fu = Ks(wu, ", ", ")", ")"), Ae = 0, He = 0, Pe = 0, Zs = 1e3, Hi, je, ji = 0, de = 0, ur = 0, Qe = typeof performance == "object" && performance.now ? performance : Date, Js = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function An() {
  return de || (Js(Lu), de = Qe.now() + ur);
}
function Lu() {
  de = 0;
}
function Ui() {
  this._call = this._time = this._next = null;
}
Ui.prototype = Qs.prototype = {
  constructor: Ui,
  restart: function(t, e, i) {
    if (typeof t != "function")
      throw new TypeError("callback is not a function");
    i = (i == null ? An() : +i) + (e == null ? 0 : +e), !this._next && je !== this && (je ? je._next = this : Hi = this, je = this), this._call = t, this._time = i, sn();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, sn());
  }
};
function Qs(t, e, i) {
  var r = new Ui();
  return r.restart(t, e, i), r;
}
function Au() {
  An(), ++Ae;
  for (var t = Hi, e; t; )
    (e = de - t._time) >= 0 && t._call.call(void 0, e), t = t._next;
  --Ae;
}
function Eo() {
  de = (ji = Qe.now()) + ur, Ae = He = 0;
  try {
    Au();
  } finally {
    Ae = 0, Ou(), de = 0;
  }
}
function Eu() {
  var t = Qe.now(), e = t - ji;
  e > Zs && (ur -= e, ji = t);
}
function Ou() {
  for (var t, e = Hi, i, r = 1 / 0; e; )
    e._call ? (r > e._time && (r = e._time), t = e, e = e._next) : (i = e._next, e._next = null, e = t ? t._next = i : Hi = i);
  je = t, sn(r);
}
function sn(t) {
  if (!Ae) {
    He && (He = clearTimeout(He));
    var e = t - de;
    e > 24 ? (t < 1 / 0 && (He = setTimeout(Eo, t - Qe.now() - ur)), Pe && (Pe = clearInterval(Pe))) : (Pe || (ji = Qe.now(), Pe = setInterval(Eu, Zs)), Ae = 1, Js(Eo));
  }
}
function Oo(t, e, i) {
  var r = new Ui();
  return e = e == null ? 0 : +e, r.restart((n) => {
    r.stop(), t(n + e);
  }, e, i), r;
}
var Mu = Os("start", "end", "cancel", "interrupt"), $u = [], ta = 0, Mo = 1, an = 2, Li = 3, $o = 4, ln = 5, Ai = 6;
function fr(t, e, i, r, n, o) {
  var s = t.__transition;
  if (!s)
    t.__transition = {};
  else if (i in s)
    return;
  Iu(t, i, {
    name: e,
    index: r,
    // For context during callback.
    group: n,
    // For context during callback.
    on: Mu,
    tween: $u,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: ta
  });
}
function En(t, e) {
  var i = Lt(t, e);
  if (i.state > ta)
    throw new Error("too late; already scheduled");
  return i;
}
function It(t, e) {
  var i = Lt(t, e);
  if (i.state > Li)
    throw new Error("too late; already running");
  return i;
}
function Lt(t, e) {
  var i = t.__transition;
  if (!i || !(i = i[e]))
    throw new Error("transition not found");
  return i;
}
function Iu(t, e, i) {
  var r = t.__transition, n;
  r[e] = i, i.timer = Qs(o, 0, i.time);
  function o(h) {
    i.state = Mo, i.timer.restart(s, i.delay, i.time), i.delay <= h && s(h - i.delay);
  }
  function s(h) {
    var c, u, g, p;
    if (i.state !== Mo)
      return l();
    for (c in r)
      if (p = r[c], p.name === i.name) {
        if (p.state === Li)
          return Oo(s);
        p.state === $o ? (p.state = Ai, p.timer.stop(), p.on.call("interrupt", t, t.__data__, p.index, p.group), delete r[c]) : +c < e && (p.state = Ai, p.timer.stop(), p.on.call("cancel", t, t.__data__, p.index, p.group), delete r[c]);
      }
    if (Oo(function() {
      i.state === Li && (i.state = $o, i.timer.restart(a, i.delay, i.time), a(h));
    }), i.state = an, i.on.call("start", t, t.__data__, i.index, i.group), i.state === an) {
      for (i.state = Li, n = new Array(g = i.tween.length), c = 0, u = -1; c < g; ++c)
        (p = i.tween[c].value.call(t, t.__data__, i.index, i.group)) && (n[++u] = p);
      n.length = u + 1;
    }
  }
  function a(h) {
    for (var c = h < i.duration ? i.ease.call(null, h / i.duration) : (i.timer.restart(l), i.state = ln, 1), u = -1, g = n.length; ++u < g; )
      n[u].call(t, c);
    i.state === ln && (i.on.call("end", t, t.__data__, i.index, i.group), l());
  }
  function l() {
    i.state = Ai, i.timer.stop(), delete r[e];
    for (var h in r)
      return;
    delete t.__transition;
  }
}
function Du(t, e) {
  var i = t.__transition, r, n, o = !0, s;
  if (i) {
    e = e == null ? null : e + "";
    for (s in i) {
      if ((r = i[s]).name !== e) {
        o = !1;
        continue;
      }
      n = r.state > an && r.state < ln, r.state = Ai, r.timer.stop(), r.on.call(n ? "interrupt" : "cancel", t, t.__data__, r.index, r.group), delete i[s];
    }
    o && delete t.__transition;
  }
}
function Nu(t) {
  return this.each(function() {
    Du(this, t);
  });
}
function Ru(t, e) {
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
function Pu(t, e, i) {
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
function qu(t, e) {
  var i = this._id;
  if (t += "", arguments.length < 2) {
    for (var r = Lt(this.node(), i).tween, n = 0, o = r.length, s; n < o; ++n)
      if ((s = r[n]).name === t)
        return s.value;
    return null;
  }
  return this.each((e == null ? Ru : Pu)(i, t, e));
}
function On(t, e, i) {
  var r = t._id;
  return t.each(function() {
    var n = It(this, r);
    (n.value || (n.value = {}))[e] = i.apply(this, arguments);
  }), function(n) {
    return Lt(n, r).value[e];
  };
}
function ea(t, e) {
  var i;
  return (typeof e == "number" ? Qt : e instanceof Je ? Lo : (i = Je(e)) ? (e = i, Lo) : vu)(t, e);
}
function zu(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Wu(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Hu(t, e, i) {
  var r, n = i + "", o;
  return function() {
    var s = this.getAttribute(t);
    return s === n ? null : s === r ? o : o = e(r = s, i);
  };
}
function ju(t, e, i) {
  var r, n = i + "", o;
  return function() {
    var s = this.getAttributeNS(t.space, t.local);
    return s === n ? null : s === r ? o : o = e(r = s, i);
  };
}
function Uu(t, e, i) {
  var r, n, o;
  return function() {
    var s, a = i(this), l;
    return a == null ? void this.removeAttribute(t) : (s = this.getAttribute(t), l = a + "", s === l ? null : s === r && l === n ? o : (n = l, o = e(r = s, a)));
  };
}
function Yu(t, e, i) {
  var r, n, o;
  return function() {
    var s, a = i(this), l;
    return a == null ? void this.removeAttributeNS(t.space, t.local) : (s = this.getAttributeNS(t.space, t.local), l = a + "", s === l ? null : s === r && l === n ? o : (n = l, o = e(r = s, a)));
  };
}
function Gu(t, e) {
  var i = cr(t), r = i === "transform" ? Fu : ea;
  return this.attrTween(t, typeof e == "function" ? (i.local ? Yu : Uu)(i, r, On(this, "attr." + t, e)) : e == null ? (i.local ? Wu : zu)(i) : (i.local ? ju : Hu)(i, r, e));
}
function Vu(t, e) {
  return function(i) {
    this.setAttribute(t, e.call(this, i));
  };
}
function Xu(t, e) {
  return function(i) {
    this.setAttributeNS(t.space, t.local, e.call(this, i));
  };
}
function Ku(t, e) {
  var i, r;
  function n() {
    var o = e.apply(this, arguments);
    return o !== r && (i = (r = o) && Xu(t, o)), i;
  }
  return n._value = e, n;
}
function Zu(t, e) {
  var i, r;
  function n() {
    var o = e.apply(this, arguments);
    return o !== r && (i = (r = o) && Vu(t, o)), i;
  }
  return n._value = e, n;
}
function Ju(t, e) {
  var i = "attr." + t;
  if (arguments.length < 2)
    return (i = this.tween(i)) && i._value;
  if (e == null)
    return this.tween(i, null);
  if (typeof e != "function")
    throw new Error();
  var r = cr(t);
  return this.tween(i, (r.local ? Ku : Zu)(r, e));
}
function Qu(t, e) {
  return function() {
    En(this, t).delay = +e.apply(this, arguments);
  };
}
function tf(t, e) {
  return e = +e, function() {
    En(this, t).delay = e;
  };
}
function ef(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Qu : tf)(e, t)) : Lt(this.node(), e).delay;
}
function rf(t, e) {
  return function() {
    It(this, t).duration = +e.apply(this, arguments);
  };
}
function nf(t, e) {
  return e = +e, function() {
    It(this, t).duration = e;
  };
}
function of(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? rf : nf)(e, t)) : Lt(this.node(), e).duration;
}
function sf(t, e) {
  if (typeof e != "function")
    throw new Error();
  return function() {
    It(this, t).ease = e;
  };
}
function af(t) {
  var e = this._id;
  return arguments.length ? this.each(sf(e, t)) : Lt(this.node(), e).ease;
}
function lf(t, e) {
  return function() {
    var i = e.apply(this, arguments);
    if (typeof i != "function")
      throw new Error();
    It(this, t).ease = i;
  };
}
function hf(t) {
  if (typeof t != "function")
    throw new Error();
  return this.each(lf(this._id, t));
}
function cf(t) {
  typeof t != "function" && (t = Is(t));
  for (var e = this._groups, i = e.length, r = new Array(i), n = 0; n < i; ++n)
    for (var o = e[n], s = o.length, a = r[n] = [], l, h = 0; h < s; ++h)
      (l = o[h]) && t.call(l, l.__data__, h, o) && a.push(l);
  return new Yt(r, this._parents, this._name, this._id);
}
function uf(t) {
  if (t._id !== this._id)
    throw new Error();
  for (var e = this._groups, i = t._groups, r = e.length, n = i.length, o = Math.min(r, n), s = new Array(r), a = 0; a < o; ++a)
    for (var l = e[a], h = i[a], c = l.length, u = s[a] = new Array(c), g, p = 0; p < c; ++p)
      (g = l[p] || h[p]) && (u[p] = g);
  for (; a < r; ++a)
    s[a] = e[a];
  return new Yt(s, this._parents, this._name, this._id);
}
function ff(t) {
  return (t + "").trim().split(/^|\s+/).every(function(e) {
    var i = e.indexOf(".");
    return i >= 0 && (e = e.slice(0, i)), !e || e === "start";
  });
}
function df(t, e, i) {
  var r, n, o = ff(e) ? En : It;
  return function() {
    var s = o(this, t), a = s.on;
    a !== r && (n = (r = a).copy()).on(e, i), s.on = n;
  };
}
function pf(t, e) {
  var i = this._id;
  return arguments.length < 2 ? Lt(this.node(), i).on.on(t) : this.each(df(i, t, e));
}
function gf(t) {
  return function() {
    var e = this.parentNode;
    for (var i in this.__transition)
      if (+i !== t)
        return;
    e && e.removeChild(this);
  };
}
function mf() {
  return this.on("end.remove", gf(this._id));
}
function _f(t) {
  var e = this._name, i = this._id;
  typeof t != "function" && (t = wn(t));
  for (var r = this._groups, n = r.length, o = new Array(n), s = 0; s < n; ++s)
    for (var a = r[s], l = a.length, h = o[s] = new Array(l), c, u, g = 0; g < l; ++g)
      (c = a[g]) && (u = t.call(c, c.__data__, g, a)) && ("__data__" in c && (u.__data__ = c.__data__), h[g] = u, fr(h[g], e, i, g, h, Lt(c, i)));
  return new Yt(o, this._parents, e, i);
}
function yf(t) {
  var e = this._name, i = this._id;
  typeof t != "function" && (t = $s(t));
  for (var r = this._groups, n = r.length, o = [], s = [], a = 0; a < n; ++a)
    for (var l = r[a], h = l.length, c, u = 0; u < h; ++u)
      if (c = l[u]) {
        for (var g = t.call(c, c.__data__, u, l), p, _ = Lt(c, i), v = 0, O = g.length; v < O; ++v)
          (p = g[v]) && fr(p, e, i, v, g, _);
        o.push(g), s.push(c);
      }
  return new Yt(o, s, e, i);
}
var Cf = li.prototype.constructor;
function xf() {
  return new Cf(this._groups, this._parents);
}
function bf(t, e) {
  var i, r, n;
  return function() {
    var o = Le(this, t), s = (this.style.removeProperty(t), Le(this, t));
    return o === s ? null : o === i && s === r ? n : n = e(i = o, r = s);
  };
}
function ia(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Tf(t, e, i) {
  var r, n = i + "", o;
  return function() {
    var s = Le(this, t);
    return s === n ? null : s === r ? o : o = e(r = s, i);
  };
}
function Sf(t, e, i) {
  var r, n, o;
  return function() {
    var s = Le(this, t), a = i(this), l = a + "";
    return a == null && (l = a = (this.style.removeProperty(t), Le(this, t))), s === l ? null : s === r && l === n ? o : (n = l, o = e(r = s, a));
  };
}
function vf(t, e) {
  var i, r, n, o = "style." + e, s = "end." + o, a;
  return function() {
    var l = It(this, t), h = l.on, c = l.value[o] == null ? a || (a = ia(e)) : void 0;
    (h !== i || n !== c) && (r = (i = h).copy()).on(s, n = c), l.on = r;
  };
}
function kf(t, e, i) {
  var r = (t += "") == "transform" ? Bu : ea;
  return e == null ? this.styleTween(t, bf(t, r)).on("end.style." + t, ia(t)) : typeof e == "function" ? this.styleTween(t, Sf(t, r, On(this, "style." + t, e))).each(vf(this._id, t)) : this.styleTween(t, Tf(t, r, e), i).on("end.style." + t, null);
}
function wf(t, e, i) {
  return function(r) {
    this.style.setProperty(t, e.call(this, r), i);
  };
}
function Bf(t, e, i) {
  var r, n;
  function o() {
    var s = e.apply(this, arguments);
    return s !== n && (r = (n = s) && wf(t, s, i)), r;
  }
  return o._value = e, o;
}
function Ff(t, e, i) {
  var r = "style." + (t += "");
  if (arguments.length < 2)
    return (r = this.tween(r)) && r._value;
  if (e == null)
    return this.tween(r, null);
  if (typeof e != "function")
    throw new Error();
  return this.tween(r, Bf(t, e, i ?? ""));
}
function Lf(t) {
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
function Ef(t) {
  return this.tween("text", typeof t == "function" ? Af(On(this, "text", t)) : Lf(t == null ? "" : t + ""));
}
function Of(t) {
  return function(e) {
    this.textContent = t.call(this, e);
  };
}
function Mf(t) {
  var e, i;
  function r() {
    var n = t.apply(this, arguments);
    return n !== i && (e = (i = n) && Of(n)), e;
  }
  return r._value = t, r;
}
function $f(t) {
  var e = "text";
  if (arguments.length < 1)
    return (e = this.tween(e)) && e._value;
  if (t == null)
    return this.tween(e, null);
  if (typeof t != "function")
    throw new Error();
  return this.tween(e, Mf(t));
}
function If() {
  for (var t = this._name, e = this._id, i = ra(), r = this._groups, n = r.length, o = 0; o < n; ++o)
    for (var s = r[o], a = s.length, l, h = 0; h < a; ++h)
      if (l = s[h]) {
        var c = Lt(l, e);
        fr(l, t, i, h, s, {
          time: c.time + c.delay + c.duration,
          delay: 0,
          duration: c.duration,
          ease: c.ease
        });
      }
  return new Yt(r, this._parents, t, i);
}
function Df() {
  var t, e, i = this, r = i._id, n = i.size();
  return new Promise(function(o, s) {
    var a = { value: s }, l = { value: function() {
      --n === 0 && o();
    } };
    i.each(function() {
      var h = It(this, r), c = h.on;
      c !== t && (e = (t = c).copy(), e._.cancel.push(a), e._.interrupt.push(a), e._.end.push(l)), h.on = e;
    }), n === 0 && o();
  });
}
var Nf = 0;
function Yt(t, e, i, r) {
  this._groups = t, this._parents = e, this._name = i, this._id = r;
}
function ra() {
  return ++Nf;
}
var Ht = li.prototype;
Yt.prototype = {
  constructor: Yt,
  select: _f,
  selectAll: yf,
  selectChild: Ht.selectChild,
  selectChildren: Ht.selectChildren,
  filter: cf,
  merge: uf,
  selection: xf,
  transition: If,
  call: Ht.call,
  nodes: Ht.nodes,
  node: Ht.node,
  size: Ht.size,
  empty: Ht.empty,
  each: Ht.each,
  on: pf,
  attr: Gu,
  attrTween: Ju,
  style: kf,
  styleTween: Ff,
  text: Ef,
  textTween: $f,
  remove: mf,
  tween: qu,
  delay: ef,
  duration: of,
  ease: af,
  easeVarying: hf,
  end: Df,
  [Symbol.iterator]: Ht[Symbol.iterator]
};
function Rf(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var Pf = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: Rf
};
function qf(t, e) {
  for (var i; !(i = t.__transition) || !(i = i[e]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${e} not found`);
  return i;
}
function zf(t) {
  var e, i;
  t instanceof Yt ? (e = t._id, t = t._name) : (e = ra(), (i = Pf).time = An(), t = t == null ? null : t + "");
  for (var r = this._groups, n = r.length, o = 0; o < n; ++o)
    for (var s = r[o], a = s.length, l, h = 0; h < a; ++h)
      (l = s[h]) && fr(l, t, e, h, s, i || qf(l, e));
  return new Yt(r, this._parents, t, e);
}
li.prototype.interrupt = Nu;
li.prototype.transition = zf;
const Vb = Math.abs, Xb = Math.atan2, Kb = Math.cos, Zb = Math.max, Jb = Math.min, Qb = Math.sin, t1 = Math.sqrt, Io = 1e-12, Mn = Math.PI, Do = Mn / 2, e1 = 2 * Mn;
function i1(t) {
  return t > 1 ? 0 : t < -1 ? Mn : Math.acos(t);
}
function r1(t) {
  return t >= 1 ? Do : t <= -1 ? -Do : Math.asin(t);
}
function na(t) {
  this._context = t;
}
na.prototype = {
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
function Wf(t) {
  return new na(t);
}
class oa {
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
function Hf(t) {
  return new oa(t, !0);
}
function jf(t) {
  return new oa(t, !1);
}
function ie() {
}
function Yi(t, e, i) {
  t._context.bezierCurveTo(
    (2 * t._x0 + t._x1) / 3,
    (2 * t._y0 + t._y1) / 3,
    (t._x0 + 2 * t._x1) / 3,
    (t._y0 + 2 * t._y1) / 3,
    (t._x0 + 4 * t._x1 + e) / 6,
    (t._y0 + 4 * t._y1 + i) / 6
  );
}
function dr(t) {
  this._context = t;
}
dr.prototype = {
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
        Yi(this, this._x1, this._y1);
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
        Yi(this, t, e);
        break;
    }
    this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = e;
  }
};
function Uf(t) {
  return new dr(t);
}
function sa(t) {
  this._context = t;
}
sa.prototype = {
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
        Yi(this, t, e);
        break;
    }
    this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = e;
  }
};
function Yf(t) {
  return new sa(t);
}
function aa(t) {
  this._context = t;
}
aa.prototype = {
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
        Yi(this, t, e);
        break;
    }
    this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = e;
  }
};
function Gf(t) {
  return new aa(t);
}
function la(t, e) {
  this._basis = new dr(t), this._beta = e;
}
la.prototype = {
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
const Vf = function t(e) {
  function i(r) {
    return e === 1 ? new dr(r) : new la(r, e);
  }
  return i.beta = function(r) {
    return t(+r);
  }, i;
}(0.85);
function Gi(t, e, i) {
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
        Gi(this, this._x1, this._y1);
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
        Gi(this, t, e);
        break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = e;
  }
};
const Xf = function t(e) {
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
        Gi(this, t, e);
        break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = e;
  }
};
const Kf = function t(e) {
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
        Gi(this, t, e);
        break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = e;
  }
};
const Zf = function t(e) {
  function i(r) {
    return new Dn(r, e);
  }
  return i.tension = function(r) {
    return t(+r);
  }, i;
}(0);
function Nn(t, e, i) {
  var r = t._x1, n = t._y1, o = t._x2, s = t._y2;
  if (t._l01_a > Io) {
    var a = 2 * t._l01_2a + 3 * t._l01_a * t._l12_a + t._l12_2a, l = 3 * t._l01_a * (t._l01_a + t._l12_a);
    r = (r * a - t._x0 * t._l12_2a + t._x2 * t._l01_2a) / l, n = (n * a - t._y0 * t._l12_2a + t._y2 * t._l01_2a) / l;
  }
  if (t._l23_a > Io) {
    var h = 2 * t._l23_2a + 3 * t._l23_a * t._l12_a + t._l12_2a, c = 3 * t._l23_a * (t._l23_a + t._l12_a);
    o = (o * h + t._x1 * t._l23_2a - e * t._l12_2a) / c, s = (s * h + t._y1 * t._l23_2a - i * t._l12_2a) / c;
  }
  t._context.bezierCurveTo(r, n, o, s, t._x2, t._y2);
}
function ha(t, e) {
  this._context = t, this._alpha = e;
}
ha.prototype = {
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
const Jf = function t(e) {
  function i(r) {
    return e ? new ha(r, e) : new $n(r, 0);
  }
  return i.alpha = function(r) {
    return t(+r);
  }, i;
}(0.5);
function ca(t, e) {
  this._context = t, this._alpha = e;
}
ca.prototype = {
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
        Nn(this, t, e);
        break;
    }
    this._l01_a = this._l12_a, this._l12_a = this._l23_a, this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a, this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = e;
  }
};
const Qf = function t(e) {
  function i(r) {
    return e ? new ca(r, e) : new In(r, 0);
  }
  return i.alpha = function(r) {
    return t(+r);
  }, i;
}(0.5);
function ua(t, e) {
  this._context = t, this._alpha = e;
}
ua.prototype = {
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
const td = function t(e) {
  function i(r) {
    return e ? new ua(r, e) : new Dn(r, 0);
  }
  return i.alpha = function(r) {
    return t(+r);
  }, i;
}(0.5);
function fa(t) {
  this._context = t;
}
fa.prototype = {
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
function ed(t) {
  return new fa(t);
}
function No(t) {
  return t < 0 ? -1 : 1;
}
function Ro(t, e, i) {
  var r = t._x1 - t._x0, n = e - t._x1, o = (t._y1 - t._y0) / (r || n < 0 && -0), s = (i - t._y1) / (n || r < 0 && -0), a = (o * n + s * r) / (r + n);
  return (No(o) + No(s)) * Math.min(Math.abs(o), Math.abs(s), 0.5 * Math.abs(a)) || 0;
}
function Po(t, e) {
  var i = t._x1 - t._x0;
  return i ? (3 * (t._y1 - t._y0) / i - e) / 2 : e;
}
function zr(t, e, i) {
  var r = t._x0, n = t._y0, o = t._x1, s = t._y1, a = (o - r) / 3;
  t._context.bezierCurveTo(r + a, n + a * e, o - a, s - a * i, o, s);
}
function Vi(t) {
  this._context = t;
}
Vi.prototype = {
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
        zr(this, this._t0, Po(this, this._t0));
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
          this._point = 3, zr(this, Po(this, i = Ro(this, t, e)), i);
          break;
        default:
          zr(this, this._t0, i = Ro(this, t, e));
          break;
      }
      this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = e, this._t0 = i;
    }
  }
};
function da(t) {
  this._context = new pa(t);
}
(da.prototype = Object.create(Vi.prototype)).point = function(t, e) {
  Vi.prototype.point.call(this, e, t);
};
function pa(t) {
  this._context = t;
}
pa.prototype = {
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
function id(t) {
  return new Vi(t);
}
function rd(t) {
  return new da(t);
}
function ga(t) {
  this._context = t;
}
ga.prototype = {
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
        for (var r = qo(t), n = qo(e), o = 0, s = 1; s < i; ++o, ++s)
          this._context.bezierCurveTo(r[0][o], n[0][o], r[1][o], n[1][o], t[s], e[s]);
    (this._line || this._line !== 0 && i === 1) && this._context.closePath(), this._line = 1 - this._line, this._x = this._y = null;
  },
  point: function(t, e) {
    this._x.push(+t), this._y.push(+e);
  }
};
function qo(t) {
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
function nd(t) {
  return new ga(t);
}
function pr(t, e) {
  this._context = t, this._t = e;
}
pr.prototype = {
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
function od(t) {
  return new pr(t, 0.5);
}
function sd(t) {
  return new pr(t, 0);
}
function ad(t) {
  return new pr(t, 1);
}
function Ue(t, e, i) {
  this.k = t, this.x = e, this.y = i;
}
Ue.prototype = {
  constructor: Ue,
  scale: function(t) {
    return t === 1 ? this : new Ue(this.k * t, this.x, this.y);
  },
  translate: function(t, e) {
    return t === 0 & e === 0 ? this : new Ue(this.k, this.x + this.k * t, this.y + this.k * e);
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
Ue.prototype;
/*! @license DOMPurify 3.0.5 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.0.5/LICENSE */
const {
  entries: ma,
  setPrototypeOf: zo,
  isFrozen: ld,
  getPrototypeOf: hd,
  getOwnPropertyDescriptor: cd
} = Object;
let {
  freeze: ht,
  seal: Bt,
  create: ud
} = Object, {
  apply: hn,
  construct: cn
} = typeof Reflect < "u" && Reflect;
hn || (hn = function(e, i, r) {
  return e.apply(i, r);
});
ht || (ht = function(e) {
  return e;
});
Bt || (Bt = function(e) {
  return e;
});
cn || (cn = function(e, i) {
  return new e(...i);
});
const fd = bt(Array.prototype.forEach), Wo = bt(Array.prototype.pop), qe = bt(Array.prototype.push), Ei = bt(String.prototype.toLowerCase), Wr = bt(String.prototype.toString), dd = bt(String.prototype.match), vt = bt(String.prototype.replace), pd = bt(String.prototype.indexOf), gd = bt(String.prototype.trim), gt = bt(RegExp.prototype.test), ze = md(TypeError);
function bt(t) {
  return function(e) {
    for (var i = arguments.length, r = new Array(i > 1 ? i - 1 : 0), n = 1; n < i; n++)
      r[n - 1] = arguments[n];
    return hn(t, e, r);
  };
}
function md(t) {
  return function() {
    for (var e = arguments.length, i = new Array(e), r = 0; r < e; r++)
      i[r] = arguments[r];
    return cn(t, i);
  };
}
function N(t, e, i) {
  var r;
  i = (r = i) !== null && r !== void 0 ? r : Ei, zo && zo(t, null);
  let n = e.length;
  for (; n--; ) {
    let o = e[n];
    if (typeof o == "string") {
      const s = i(o);
      s !== o && (ld(e) || (e[n] = s), o = s);
    }
    t[o] = !0;
  }
  return t;
}
function ve(t) {
  const e = ud(null);
  for (const [i, r] of ma(t))
    e[i] = r;
  return e;
}
function Ti(t, e) {
  for (; t !== null; ) {
    const r = cd(t, e);
    if (r) {
      if (r.get)
        return bt(r.get);
      if (typeof r.value == "function")
        return bt(r.value);
    }
    t = hd(t);
  }
  function i(r) {
    return console.warn("fallback value for", r), null;
  }
  return i;
}
const Ho = ht(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "section", "select", "shadow", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), Hr = ht(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), jr = ht(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), _d = ht(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), Ur = ht(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), yd = ht(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), jo = ht(["#text"]), Uo = ht(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "pattern", "placeholder", "playsinline", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "xmlns", "slot"]), Yr = ht(["accent-height", "accumulate", "additive", "alignment-baseline", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), Yo = ht(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), Si = ht(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), Cd = Bt(/\{\{[\w\W]*|[\w\W]*\}\}/gm), xd = Bt(/<%[\w\W]*|[\w\W]*%>/gm), bd = Bt(/\${[\w\W]*}/gm), Td = Bt(/^data-[\-\w.\u00B7-\uFFFF]/), Sd = Bt(/^aria-[\-\w]+$/), _a = Bt(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
), vd = Bt(/^(?:\w+script|data):/i), kd = Bt(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
), ya = Bt(/^html$/i);
var Go = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  MUSTACHE_EXPR: Cd,
  ERB_EXPR: xd,
  TMPLIT_EXPR: bd,
  DATA_ATTR: Td,
  ARIA_ATTR: Sd,
  IS_ALLOWED_URI: _a,
  IS_SCRIPT_OR_DATA: vd,
  ATTR_WHITESPACE: kd,
  DOCTYPE_NAME: ya
});
const wd = () => typeof window > "u" ? null : window, Bd = function(e, i) {
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
function Ca() {
  let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : wd();
  const e = (B) => Ca(B);
  if (e.version = "3.0.5", e.removed = [], !t || !t.document || t.document.nodeType !== 9)
    return e.isSupported = !1, e;
  const i = t.document, r = i.currentScript;
  let {
    document: n
  } = t;
  const {
    DocumentFragment: o,
    HTMLTemplateElement: s,
    Node: a,
    Element: l,
    NodeFilter: h,
    NamedNodeMap: c = t.NamedNodeMap || t.MozNamedAttrMap,
    HTMLFormElement: u,
    DOMParser: g,
    trustedTypes: p
  } = t, _ = l.prototype, v = Ti(_, "cloneNode"), O = Ti(_, "nextSibling"), P = Ti(_, "childNodes"), S = Ti(_, "parentNode");
  if (typeof s == "function") {
    const B = n.createElement("template");
    B.content && B.content.ownerDocument && (n = B.content.ownerDocument);
  }
  let z, Q = "";
  const {
    implementation: X,
    createNodeIterator: G,
    createDocumentFragment: W,
    getElementsByTagName: Vt
  } = n, {
    importNode: K
  } = i;
  let I = {};
  e.isSupported = typeof ma == "function" && typeof S == "function" && X && X.createHTMLDocument !== void 0;
  const {
    MUSTACHE_EXPR: Nt,
    ERB_EXPR: At,
    TMPLIT_EXPR: E,
    DATA_ATTR: T,
    ARIA_ATTR: x,
    IS_SCRIPT_OR_DATA: M,
    ATTR_WHITESPACE: y
  } = Go;
  let {
    IS_ALLOWED_URI: D
  } = Go, k = null;
  const H = N({}, [...Ho, ...Hr, ...jr, ...Ur, ...jo]);
  let R = null;
  const U = N({}, [...Uo, ...Yr, ...Yo, ...Si]);
  let q = Object.seal(Object.create(null, {
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
  })), ct = null, pt = null, Xt = !0, Rt = !0, Pt = !1, it = !0, st = !1, St = !1, Kt = !1, Ar = !1, Ce = !1, di = !1, pi = !1, io = !0, ro = !1;
  const nh = "user-content-";
  let Er = !0, Re = !1, xe = {}, be = null;
  const no = N({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
  let oo = null;
  const so = N({}, ["audio", "video", "img", "source", "image", "track"]);
  let Or = null;
  const ao = N({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), gi = "http://www.w3.org/1998/Math/MathML", mi = "http://www.w3.org/2000/svg", qt = "http://www.w3.org/1999/xhtml";
  let Te = qt, Mr = !1, $r = null;
  const oh = N({}, [gi, mi, qt], Wr);
  let oe;
  const sh = ["application/xhtml+xml", "text/html"], ah = "text/html";
  let tt, Se = null;
  const lh = n.createElement("form"), lo = function(f) {
    return f instanceof RegExp || f instanceof Function;
  }, Ir = function(f) {
    if (!(Se && Se === f)) {
      if ((!f || typeof f != "object") && (f = {}), f = ve(f), oe = // eslint-disable-next-line unicorn/prefer-includes
      sh.indexOf(f.PARSER_MEDIA_TYPE) === -1 ? oe = ah : oe = f.PARSER_MEDIA_TYPE, tt = oe === "application/xhtml+xml" ? Wr : Ei, k = "ALLOWED_TAGS" in f ? N({}, f.ALLOWED_TAGS, tt) : H, R = "ALLOWED_ATTR" in f ? N({}, f.ALLOWED_ATTR, tt) : U, $r = "ALLOWED_NAMESPACES" in f ? N({}, f.ALLOWED_NAMESPACES, Wr) : oh, Or = "ADD_URI_SAFE_ATTR" in f ? N(
        ve(ao),
        // eslint-disable-line indent
        f.ADD_URI_SAFE_ATTR,
        // eslint-disable-line indent
        tt
        // eslint-disable-line indent
      ) : ao, oo = "ADD_DATA_URI_TAGS" in f ? N(
        ve(so),
        // eslint-disable-line indent
        f.ADD_DATA_URI_TAGS,
        // eslint-disable-line indent
        tt
        // eslint-disable-line indent
      ) : so, be = "FORBID_CONTENTS" in f ? N({}, f.FORBID_CONTENTS, tt) : no, ct = "FORBID_TAGS" in f ? N({}, f.FORBID_TAGS, tt) : {}, pt = "FORBID_ATTR" in f ? N({}, f.FORBID_ATTR, tt) : {}, xe = "USE_PROFILES" in f ? f.USE_PROFILES : !1, Xt = f.ALLOW_ARIA_ATTR !== !1, Rt = f.ALLOW_DATA_ATTR !== !1, Pt = f.ALLOW_UNKNOWN_PROTOCOLS || !1, it = f.ALLOW_SELF_CLOSE_IN_ATTR !== !1, st = f.SAFE_FOR_TEMPLATES || !1, St = f.WHOLE_DOCUMENT || !1, Ce = f.RETURN_DOM || !1, di = f.RETURN_DOM_FRAGMENT || !1, pi = f.RETURN_TRUSTED_TYPE || !1, Ar = f.FORCE_BODY || !1, io = f.SANITIZE_DOM !== !1, ro = f.SANITIZE_NAMED_PROPS || !1, Er = f.KEEP_CONTENT !== !1, Re = f.IN_PLACE || !1, D = f.ALLOWED_URI_REGEXP || _a, Te = f.NAMESPACE || qt, q = f.CUSTOM_ELEMENT_HANDLING || {}, f.CUSTOM_ELEMENT_HANDLING && lo(f.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (q.tagNameCheck = f.CUSTOM_ELEMENT_HANDLING.tagNameCheck), f.CUSTOM_ELEMENT_HANDLING && lo(f.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (q.attributeNameCheck = f.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), f.CUSTOM_ELEMENT_HANDLING && typeof f.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements == "boolean" && (q.allowCustomizedBuiltInElements = f.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), st && (Rt = !1), di && (Ce = !0), xe && (k = N({}, [...jo]), R = [], xe.html === !0 && (N(k, Ho), N(R, Uo)), xe.svg === !0 && (N(k, Hr), N(R, Yr), N(R, Si)), xe.svgFilters === !0 && (N(k, jr), N(R, Yr), N(R, Si)), xe.mathMl === !0 && (N(k, Ur), N(R, Yo), N(R, Si))), f.ADD_TAGS && (k === H && (k = ve(k)), N(k, f.ADD_TAGS, tt)), f.ADD_ATTR && (R === U && (R = ve(R)), N(R, f.ADD_ATTR, tt)), f.ADD_URI_SAFE_ATTR && N(Or, f.ADD_URI_SAFE_ATTR, tt), f.FORBID_CONTENTS && (be === no && (be = ve(be)), N(be, f.FORBID_CONTENTS, tt)), Er && (k["#text"] = !0), St && N(k, ["html", "head", "body"]), k.table && (N(k, ["tbody"]), delete ct.tbody), f.TRUSTED_TYPES_POLICY) {
        if (typeof f.TRUSTED_TYPES_POLICY.createHTML != "function")
          throw ze('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
        if (typeof f.TRUSTED_TYPES_POLICY.createScriptURL != "function")
          throw ze('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
        z = f.TRUSTED_TYPES_POLICY, Q = z.createHTML("");
      } else
        z === void 0 && (z = Bd(p, r)), z !== null && typeof Q == "string" && (Q = z.createHTML(""));
      ht && ht(f), Se = f;
    }
  }, ho = N({}, ["mi", "mo", "mn", "ms", "mtext"]), co = N({}, ["foreignobject", "desc", "title", "annotation-xml"]), hh = N({}, ["title", "style", "font", "a", "script"]), _i = N({}, Hr);
  N(_i, jr), N(_i, _d);
  const Dr = N({}, Ur);
  N(Dr, yd);
  const ch = function(f) {
    let m = S(f);
    (!m || !m.tagName) && (m = {
      namespaceURI: Te,
      tagName: "template"
    });
    const b = Ei(f.tagName), j = Ei(m.tagName);
    return $r[f.namespaceURI] ? f.namespaceURI === mi ? m.namespaceURI === qt ? b === "svg" : m.namespaceURI === gi ? b === "svg" && (j === "annotation-xml" || ho[j]) : !!_i[b] : f.namespaceURI === gi ? m.namespaceURI === qt ? b === "math" : m.namespaceURI === mi ? b === "math" && co[j] : !!Dr[b] : f.namespaceURI === qt ? m.namespaceURI === mi && !co[j] || m.namespaceURI === gi && !ho[j] ? !1 : !Dr[b] && (hh[b] || !_i[b]) : !!(oe === "application/xhtml+xml" && $r[f.namespaceURI]) : !1;
  }, se = function(f) {
    qe(e.removed, {
      element: f
    });
    try {
      f.parentNode.removeChild(f);
    } catch {
      f.remove();
    }
  }, Nr = function(f, m) {
    try {
      qe(e.removed, {
        attribute: m.getAttributeNode(f),
        from: m
      });
    } catch {
      qe(e.removed, {
        attribute: null,
        from: m
      });
    }
    if (m.removeAttribute(f), f === "is" && !R[f])
      if (Ce || di)
        try {
          se(m);
        } catch {
        }
      else
        try {
          m.setAttribute(f, "");
        } catch {
        }
  }, uo = function(f) {
    let m, b;
    if (Ar)
      f = "<remove></remove>" + f;
    else {
      const _t = dd(f, /^[\r\n\t ]+/);
      b = _t && _t[0];
    }
    oe === "application/xhtml+xml" && Te === qt && (f = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + f + "</body></html>");
    const j = z ? z.createHTML(f) : f;
    if (Te === qt)
      try {
        m = new g().parseFromString(j, oe);
      } catch {
      }
    if (!m || !m.documentElement) {
      m = X.createDocument(Te, "template", null);
      try {
        m.documentElement.innerHTML = Mr ? Q : j;
      } catch {
      }
    }
    const et = m.body || m.documentElement;
    return f && b && et.insertBefore(n.createTextNode(b), et.childNodes[0] || null), Te === qt ? Vt.call(m, St ? "html" : "body")[0] : St ? m.documentElement : et;
  }, fo = function(f) {
    return G.call(
      f.ownerDocument || f,
      f,
      // eslint-disable-next-line no-bitwise
      h.SHOW_ELEMENT | h.SHOW_COMMENT | h.SHOW_TEXT,
      null,
      !1
    );
  }, uh = function(f) {
    return f instanceof u && (typeof f.nodeName != "string" || typeof f.textContent != "string" || typeof f.removeChild != "function" || !(f.attributes instanceof c) || typeof f.removeAttribute != "function" || typeof f.setAttribute != "function" || typeof f.namespaceURI != "string" || typeof f.insertBefore != "function" || typeof f.hasChildNodes != "function");
  }, yi = function(f) {
    return typeof a == "object" ? f instanceof a : f && typeof f == "object" && typeof f.nodeType == "number" && typeof f.nodeName == "string";
  }, zt = function(f, m, b) {
    I[f] && fd(I[f], (j) => {
      j.call(e, m, b, Se);
    });
  }, po = function(f) {
    let m;
    if (zt("beforeSanitizeElements", f, null), uh(f))
      return se(f), !0;
    const b = tt(f.nodeName);
    if (zt("uponSanitizeElement", f, {
      tagName: b,
      allowedTags: k
    }), f.hasChildNodes() && !yi(f.firstElementChild) && (!yi(f.content) || !yi(f.content.firstElementChild)) && gt(/<[/\w]/g, f.innerHTML) && gt(/<[/\w]/g, f.textContent))
      return se(f), !0;
    if (!k[b] || ct[b]) {
      if (!ct[b] && mo(b) && (q.tagNameCheck instanceof RegExp && gt(q.tagNameCheck, b) || q.tagNameCheck instanceof Function && q.tagNameCheck(b)))
        return !1;
      if (Er && !be[b]) {
        const j = S(f) || f.parentNode, et = P(f) || f.childNodes;
        if (et && j) {
          const _t = et.length;
          for (let V = _t - 1; V >= 0; --V)
            j.insertBefore(v(et[V], !0), O(f));
        }
      }
      return se(f), !0;
    }
    return f instanceof l && !ch(f) || (b === "noscript" || b === "noembed" || b === "noframes") && gt(/<\/no(script|embed|frames)/i, f.innerHTML) ? (se(f), !0) : (st && f.nodeType === 3 && (m = f.textContent, m = vt(m, Nt, " "), m = vt(m, At, " "), m = vt(m, E, " "), f.textContent !== m && (qe(e.removed, {
      element: f.cloneNode()
    }), f.textContent = m)), zt("afterSanitizeElements", f, null), !1);
  }, go = function(f, m, b) {
    if (io && (m === "id" || m === "name") && (b in n || b in lh))
      return !1;
    if (!(Rt && !pt[m] && gt(T, m))) {
      if (!(Xt && gt(x, m))) {
        if (!R[m] || pt[m]) {
          if (
            // First condition does a very basic check if a) it's basically a valid custom element tagname AND
            // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
            // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
            !(mo(f) && (q.tagNameCheck instanceof RegExp && gt(q.tagNameCheck, f) || q.tagNameCheck instanceof Function && q.tagNameCheck(f)) && (q.attributeNameCheck instanceof RegExp && gt(q.attributeNameCheck, m) || q.attributeNameCheck instanceof Function && q.attributeNameCheck(m)) || // Alternative, second condition checks if it's an `is`-attribute, AND
            // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
            m === "is" && q.allowCustomizedBuiltInElements && (q.tagNameCheck instanceof RegExp && gt(q.tagNameCheck, b) || q.tagNameCheck instanceof Function && q.tagNameCheck(b)))
          )
            return !1;
        } else if (!Or[m]) {
          if (!gt(D, vt(b, y, ""))) {
            if (!((m === "src" || m === "xlink:href" || m === "href") && f !== "script" && pd(b, "data:") === 0 && oo[f])) {
              if (!(Pt && !gt(M, vt(b, y, "")))) {
                if (b)
                  return !1;
              }
            }
          }
        }
      }
    }
    return !0;
  }, mo = function(f) {
    return f.indexOf("-") > 0;
  }, _o = function(f) {
    let m, b, j, et;
    zt("beforeSanitizeAttributes", f, null);
    const {
      attributes: _t
    } = f;
    if (!_t)
      return;
    const V = {
      attrName: "",
      attrValue: "",
      keepAttr: !0,
      allowedAttributes: R
    };
    for (et = _t.length; et--; ) {
      m = _t[et];
      const {
        name: Et,
        namespaceURI: Rr
      } = m;
      if (b = Et === "value" ? m.value : gd(m.value), j = tt(Et), V.attrName = j, V.attrValue = b, V.keepAttr = !0, V.forceKeepAttr = void 0, zt("uponSanitizeAttribute", f, V), b = V.attrValue, V.forceKeepAttr || (Nr(Et, f), !V.keepAttr))
        continue;
      if (!it && gt(/\/>/i, b)) {
        Nr(Et, f);
        continue;
      }
      st && (b = vt(b, Nt, " "), b = vt(b, At, " "), b = vt(b, E, " "));
      const yo = tt(f.nodeName);
      if (go(yo, j, b)) {
        if (ro && (j === "id" || j === "name") && (Nr(Et, f), b = nh + b), z && typeof p == "object" && typeof p.getAttributeType == "function" && !Rr)
          switch (p.getAttributeType(yo, j)) {
            case "TrustedHTML": {
              b = z.createHTML(b);
              break;
            }
            case "TrustedScriptURL": {
              b = z.createScriptURL(b);
              break;
            }
          }
        try {
          Rr ? f.setAttributeNS(Rr, Et, b) : f.setAttribute(Et, b), Wo(e.removed);
        } catch {
        }
      }
    }
    zt("afterSanitizeAttributes", f, null);
  }, fh = function B(f) {
    let m;
    const b = fo(f);
    for (zt("beforeSanitizeShadowDOM", f, null); m = b.nextNode(); )
      zt("uponSanitizeShadowNode", m, null), !po(m) && (m.content instanceof o && B(m.content), _o(m));
    zt("afterSanitizeShadowDOM", f, null);
  };
  return e.sanitize = function(B) {
    let f = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, m, b, j, et;
    if (Mr = !B, Mr && (B = "<!-->"), typeof B != "string" && !yi(B))
      if (typeof B.toString == "function") {
        if (B = B.toString(), typeof B != "string")
          throw ze("dirty is not a string, aborting");
      } else
        throw ze("toString is not a function");
    if (!e.isSupported)
      return B;
    if (Kt || Ir(f), e.removed = [], typeof B == "string" && (Re = !1), Re) {
      if (B.nodeName) {
        const Et = tt(B.nodeName);
        if (!k[Et] || ct[Et])
          throw ze("root node is forbidden and cannot be sanitized in-place");
      }
    } else if (B instanceof a)
      m = uo("<!---->"), b = m.ownerDocument.importNode(B, !0), b.nodeType === 1 && b.nodeName === "BODY" || b.nodeName === "HTML" ? m = b : m.appendChild(b);
    else {
      if (!Ce && !st && !St && // eslint-disable-next-line unicorn/prefer-includes
      B.indexOf("<") === -1)
        return z && pi ? z.createHTML(B) : B;
      if (m = uo(B), !m)
        return Ce ? null : pi ? Q : "";
    }
    m && Ar && se(m.firstChild);
    const _t = fo(Re ? B : m);
    for (; j = _t.nextNode(); )
      po(j) || (j.content instanceof o && fh(j.content), _o(j));
    if (Re)
      return B;
    if (Ce) {
      if (di)
        for (et = W.call(m.ownerDocument); m.firstChild; )
          et.appendChild(m.firstChild);
      else
        et = m;
      return (R.shadowroot || R.shadowrootmode) && (et = K.call(i, et, !0)), et;
    }
    let V = St ? m.outerHTML : m.innerHTML;
    return St && k["!doctype"] && m.ownerDocument && m.ownerDocument.doctype && m.ownerDocument.doctype.name && gt(ya, m.ownerDocument.doctype.name) && (V = "<!DOCTYPE " + m.ownerDocument.doctype.name + `>
` + V), st && (V = vt(V, Nt, " "), V = vt(V, At, " "), V = vt(V, E, " ")), z && pi ? z.createHTML(V) : V;
  }, e.setConfig = function(B) {
    Ir(B), Kt = !0;
  }, e.clearConfig = function() {
    Se = null, Kt = !1;
  }, e.isValidAttribute = function(B, f, m) {
    Se || Ir({});
    const b = tt(B), j = tt(f);
    return go(b, j, m);
  }, e.addHook = function(B, f) {
    typeof f == "function" && (I[B] = I[B] || [], qe(I[B], f));
  }, e.removeHook = function(B) {
    if (I[B])
      return Wo(I[B]);
  }, e.removeHooks = function(B) {
    I[B] && (I[B] = []);
  }, e.removeAllHooks = function() {
    I = {};
  }, e;
}
var Xi = Ca();
const gr = /<br\s*\/?>/gi, Fd = (t) => t ? ba(t).replace(/\\n/g, "#br#").split("#br#") : [""], xa = (t) => Xi.sanitize(t), Vo = (t, e) => {
  var i;
  if (((i = e.flowchart) == null ? void 0 : i.htmlLabels) !== !1) {
    const r = e.securityLevel;
    r === "antiscript" || r === "strict" ? t = xa(t) : r !== "loose" && (t = ba(t), t = t.replace(/</g, "&lt;").replace(/>/g, "&gt;"), t = t.replace(/=/g, "&equals;"), t = Od(t));
  }
  return t;
}, ti = (t, e) => t && (e.dompurifyConfig ? t = Xi.sanitize(Vo(t, e), e.dompurifyConfig).toString() : t = Xi.sanitize(Vo(t, e), {
  FORBID_TAGS: ["style"]
}).toString(), t), Ld = (t, e) => typeof t == "string" ? ti(t, e) : t.flat().map((i) => ti(i, e)), Ad = (t) => gr.test(t), Ed = (t) => t.split(gr), Od = (t) => t.replace(/#br#/g, "<br/>"), ba = (t) => t.replace(gr, "#br#"), Md = (t) => {
  let e = "";
  return t && (e = window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.search, e = e.replaceAll(/\(/g, "\\("), e = e.replaceAll(/\)/g, "\\)")), e;
}, Ta = (t) => !(t === !1 || ["false", "null", "0"].includes(String(t).trim().toLowerCase())), $d = function(...t) {
  const e = t.filter((i) => !isNaN(i));
  return Math.max(...e);
}, Id = function(...t) {
  const e = t.filter((i) => !isNaN(i));
  return Math.min(...e);
}, Dd = function(t) {
  let e = t;
  if (t.split("~").length - 1 >= 2) {
    let i = e;
    do
      e = i, i = e.replace(/~([^\s,:;]+)~/, "<$1>");
    while (i != e);
    return Dd(i);
  } else
    return e;
}, Rn = {
  getRows: Fd,
  sanitizeText: ti,
  sanitizeTextOrArray: Ld,
  hasBreaks: Ad,
  splitBreaks: Ed,
  lineBreakRegex: gr,
  removeScript: xa,
  getUrl: Md,
  evaluate: Ta,
  getMax: $d,
  getMin: Id
}, Oi = {
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
        return Oi.hue2rgb(o, n, t + 1 / 3) * 255;
      case "g":
        return Oi.hue2rgb(o, n, t) * 255;
      case "b":
        return Oi.hue2rgb(o, n, t - 1 / 3) * 255;
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
}, Nd = Oi, Rd = {
  /* API */
  clamp: (t, e, i) => e > i ? Math.min(e, Math.max(i, t)) : Math.min(i, Math.max(e, t)),
  round: (t) => Math.round(t * 1e10) / 1e10
}, Pd = Rd, qd = {
  /* API */
  dec2hex: (t) => {
    const e = Math.round(t).toString(16);
    return e.length > 1 ? e : `0${e}`;
  }
}, zd = qd, Wd = {
  channel: Nd,
  lang: Pd,
  unit: zd
}, $ = Wd, Jt = {};
for (let t = 0; t <= 255; t++)
  Jt[t] = $.unit.dec2hex(t);
const rt = {
  ALL: 0,
  RGB: 1,
  HSL: 2
};
class Hd {
  constructor() {
    this.type = rt.ALL;
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
    this.type = rt.ALL;
  }
  is(e) {
    return this.type === e;
  }
}
const jd = Hd;
class Ud {
  /* CONSTRUCTOR */
  constructor(e, i) {
    this.color = i, this.changed = !1, this.data = e, this.type = new jd();
  }
  /* API */
  set(e, i) {
    return this.color = i, this.changed = !1, this.data = e, this.type.type = rt.ALL, this;
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
    return !this.type.is(rt.HSL) && i !== void 0 ? i : (this._ensureHSL(), $.channel.hsl2rgb(e, "r"));
  }
  get g() {
    const e = this.data, i = e.g;
    return !this.type.is(rt.HSL) && i !== void 0 ? i : (this._ensureHSL(), $.channel.hsl2rgb(e, "g"));
  }
  get b() {
    const e = this.data, i = e.b;
    return !this.type.is(rt.HSL) && i !== void 0 ? i : (this._ensureHSL(), $.channel.hsl2rgb(e, "b"));
  }
  get h() {
    const e = this.data, i = e.h;
    return !this.type.is(rt.RGB) && i !== void 0 ? i : (this._ensureRGB(), $.channel.rgb2hsl(e, "h"));
  }
  get s() {
    const e = this.data, i = e.s;
    return !this.type.is(rt.RGB) && i !== void 0 ? i : (this._ensureRGB(), $.channel.rgb2hsl(e, "s"));
  }
  get l() {
    const e = this.data, i = e.l;
    return !this.type.is(rt.RGB) && i !== void 0 ? i : (this._ensureRGB(), $.channel.rgb2hsl(e, "l"));
  }
  get a() {
    return this.data.a;
  }
  /* SETTERS */
  set r(e) {
    this.type.set(rt.RGB), this.changed = !0, this.data.r = e;
  }
  set g(e) {
    this.type.set(rt.RGB), this.changed = !0, this.data.g = e;
  }
  set b(e) {
    this.type.set(rt.RGB), this.changed = !0, this.data.b = e;
  }
  set h(e) {
    this.type.set(rt.HSL), this.changed = !0, this.data.h = e;
  }
  set s(e) {
    this.type.set(rt.HSL), this.changed = !0, this.data.s = e;
  }
  set l(e) {
    this.type.set(rt.HSL), this.changed = !0, this.data.l = e;
  }
  set a(e) {
    this.changed = !0, this.data.a = e;
  }
}
const Yd = Ud, Gd = new Yd({ r: 0, g: 0, b: 0, a: 0 }, "transparent"), mr = Gd, Sa = {
  /* VARIABLES */
  re: /^#((?:[a-f0-9]{2}){2,4}|[a-f0-9]{3})$/i,
  /* API */
  parse: (t) => {
    if (t.charCodeAt(0) !== 35)
      return;
    const e = t.match(Sa.re);
    if (!e)
      return;
    const i = e[1], r = parseInt(i, 16), n = i.length, o = n % 4 === 0, s = n > 4, a = s ? 1 : 17, l = s ? 8 : 4, h = o ? 0 : -1, c = s ? 255 : 15;
    return mr.set({
      r: (r >> l * (h + 3) & c) * a,
      g: (r >> l * (h + 2) & c) * a,
      b: (r >> l * (h + 1) & c) * a,
      a: o ? (r & c) * a / 255 : 1
    }, t);
  },
  stringify: (t) => {
    const { r: e, g: i, b: r, a: n } = t;
    return n < 1 ? `#${Jt[Math.round(e)]}${Jt[Math.round(i)]}${Jt[Math.round(r)]}${Jt[Math.round(n * 255)]}` : `#${Jt[Math.round(e)]}${Jt[Math.round(i)]}${Jt[Math.round(r)]}`;
  }
}, Ye = Sa, Mi = {
  /* VARIABLES */
  re: /^hsla?\(\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e-?\d+)?(?:deg|grad|rad|turn)?)\s*?(?:,|\s)\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e-?\d+)?%)\s*?(?:,|\s)\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e-?\d+)?%)(?:\s*?(?:,|\/)\s*?\+?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e-?\d+)?(%)?))?\s*?\)$/i,
  hueRe: /^(.+?)(deg|grad|rad|turn)$/i,
  /* HELPERS */
  _hue2deg: (t) => {
    const e = t.match(Mi.hueRe);
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
    const i = t.match(Mi.re);
    if (!i)
      return;
    const [, r, n, o, s, a] = i;
    return mr.set({
      h: Mi._hue2deg(r),
      s: $.channel.clamp.s(parseFloat(n)),
      l: $.channel.clamp.l(parseFloat(o)),
      a: s ? $.channel.clamp.a(a ? parseFloat(s) / 100 : parseFloat(s)) : 1
    }, t);
  },
  stringify: (t) => {
    const { h: e, s: i, l: r, a: n } = t;
    return n < 1 ? `hsla(${$.lang.round(e)}, ${$.lang.round(i)}%, ${$.lang.round(r)}%, ${n})` : `hsl(${$.lang.round(e)}, ${$.lang.round(i)}%, ${$.lang.round(r)}%)`;
  }
}, vi = Mi, $i = {
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
    const e = $i.colors[t];
    if (e)
      return Ye.parse(e);
  },
  stringify: (t) => {
    const e = Ye.stringify(t);
    for (const i in $i.colors)
      if ($i.colors[i] === e)
        return i;
  }
}, Xo = $i, va = {
  /* VARIABLES */
  re: /^rgba?\(\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e\d+)?(%?))\s*?(?:,|\s)\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e\d+)?(%?))\s*?(?:,|\s)\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e\d+)?(%?))(?:\s*?(?:,|\/)\s*?\+?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e\d+)?(%?)))?\s*?\)$/i,
  /* API */
  parse: (t) => {
    const e = t.charCodeAt(0);
    if (e !== 114 && e !== 82)
      return;
    const i = t.match(va.re);
    if (!i)
      return;
    const [, r, n, o, s, a, l, h, c] = i;
    return mr.set({
      r: $.channel.clamp.r(n ? parseFloat(r) * 2.55 : parseFloat(r)),
      g: $.channel.clamp.g(s ? parseFloat(o) * 2.55 : parseFloat(o)),
      b: $.channel.clamp.b(l ? parseFloat(a) * 2.55 : parseFloat(a)),
      a: h ? $.channel.clamp.a(c ? parseFloat(h) / 100 : parseFloat(h)) : 1
    }, t);
  },
  stringify: (t) => {
    const { r: e, g: i, b: r, a: n } = t;
    return n < 1 ? `rgba(${$.lang.round(e)}, ${$.lang.round(i)}, ${$.lang.round(r)}, ${$.lang.round(n)})` : `rgb(${$.lang.round(e)}, ${$.lang.round(i)}, ${$.lang.round(r)})`;
  }
}, ki = va, Vd = {
  /* VARIABLES */
  format: {
    keyword: Xo,
    hex: Ye,
    rgb: ki,
    rgba: ki,
    hsl: vi,
    hsla: vi
  },
  /* API */
  parse: (t) => {
    if (typeof t != "string")
      return t;
    const e = Ye.parse(t) || ki.parse(t) || vi.parse(t) || Xo.parse(t);
    if (e)
      return e;
    throw new Error(`Unsupported color format: "${t}"`);
  },
  stringify: (t) => !t.changed && t.color ? t.color : t.type.is(rt.HSL) || t.data.r === void 0 ? vi.stringify(t) : t.a < 1 || !Number.isInteger(t.r) || !Number.isInteger(t.g) || !Number.isInteger(t.b) ? ki.stringify(t) : Ye.stringify(t)
}, $t = Vd, Xd = (t, e) => {
  const i = $t.parse(t);
  for (const r in e)
    i[r] = $.channel.clamp[r](e[r]);
  return $t.stringify(i);
}, ka = Xd, Kd = (t, e, i = 0, r = 1) => {
  if (typeof t != "number")
    return ka(t, { a: e });
  const n = mr.set({
    r: $.channel.clamp.r(t),
    g: $.channel.clamp.g(e),
    b: $.channel.clamp.b(i),
    a: $.channel.clamp.a(r)
  });
  return $t.stringify(n);
}, Ge = Kd, Zd = (t) => {
  const { r: e, g: i, b: r } = $t.parse(t), n = 0.2126 * $.channel.toLinear(e) + 0.7152 * $.channel.toLinear(i) + 0.0722 * $.channel.toLinear(r);
  return $.lang.round(n);
}, Jd = Zd, Qd = (t) => Jd(t) >= 0.5, tp = Qd, ep = (t) => !tp(t), ci = ep, ip = (t, e, i) => {
  const r = $t.parse(t), n = r[e], o = $.channel.clamp[e](n + i);
  return n !== o && (r[e] = o), $t.stringify(r);
}, wa = ip, rp = (t, e) => wa(t, "l", e), F = rp, np = (t, e) => wa(t, "l", -e), A = np, op = (t, e) => {
  const i = $t.parse(t), r = {};
  for (const n in e)
    e[n] && (r[n] = i[n] + e[n]);
  return ka(t, r);
}, d = op, sp = (t, e, i = 50) => {
  const { r, g: n, b: o, a: s } = $t.parse(t), { r: a, g: l, b: h, a: c } = $t.parse(e), u = i / 100, g = u * 2 - 1, p = s - c, v = ((g * p === -1 ? g : (g + p) / (1 + g * p)) + 1) / 2, O = 1 - v, P = r * v + a * O, S = n * v + l * O, z = o * v + h * O, Q = s * u + c * (1 - u);
  return Ge(P, S, z, Q);
}, ap = sp, lp = (t, e = 100) => {
  const i = $t.parse(t);
  return i.r = 255 - i.r, i.g = 255 - i.g, i.b = 255 - i.b, ap(i, t, e);
}, C = lp, lt = (t, e) => e ? d(t, { s: -40, l: 10 }) : d(t, { s: -40, l: -10 }), _r = "#ffffff", yr = "#f2f2f2";
let hp = class {
  constructor() {
    this.background = "#f4f4f4", this.primaryColor = "#fff4dd", this.noteBkgColor = "#fff5ad", this.noteTextColor = "#333", this.THEME_COLOR_LIMIT = 12, this.fontFamily = '"trebuchet ms", verdana, arial, sans-serif', this.fontSize = "16px";
  }
  updateColors() {
    if (this.primaryTextColor = this.primaryTextColor || (this.darkMode ? "#eee" : "#333"), this.secondaryColor = this.secondaryColor || d(this.primaryColor, { h: -120 }), this.tertiaryColor = this.tertiaryColor || d(this.primaryColor, { h: 180, l: 5 }), this.primaryBorderColor = this.primaryBorderColor || lt(this.primaryColor, this.darkMode), this.secondaryBorderColor = this.secondaryBorderColor || lt(this.secondaryColor, this.darkMode), this.tertiaryBorderColor = this.tertiaryBorderColor || lt(this.tertiaryColor, this.darkMode), this.noteBorderColor = this.noteBorderColor || lt(this.noteBkgColor, this.darkMode), this.noteBkgColor = this.noteBkgColor || "#fff5ad", this.noteTextColor = this.noteTextColor || "#333", this.secondaryTextColor = this.secondaryTextColor || C(this.secondaryColor), this.tertiaryTextColor = this.tertiaryTextColor || C(this.tertiaryColor), this.lineColor = this.lineColor || C(this.background), this.arrowheadColor = this.arrowheadColor || C(this.background), this.textColor = this.textColor || this.primaryTextColor, this.border2 = this.border2 || this.tertiaryBorderColor, this.nodeBkg = this.nodeBkg || this.primaryColor, this.mainBkg = this.mainBkg || this.primaryColor, this.nodeBorder = this.nodeBorder || this.primaryBorderColor, this.clusterBkg = this.clusterBkg || this.tertiaryColor, this.clusterBorder = this.clusterBorder || this.tertiaryBorderColor, this.defaultLinkColor = this.defaultLinkColor || this.lineColor, this.titleColor = this.titleColor || this.tertiaryTextColor, this.edgeLabelBackground = this.edgeLabelBackground || (this.darkMode ? A(this.secondaryColor, 30) : this.secondaryColor), this.nodeTextColor = this.nodeTextColor || this.primaryTextColor, this.actorBorder = this.actorBorder || this.primaryBorderColor, this.actorBkg = this.actorBkg || this.mainBkg, this.actorTextColor = this.actorTextColor || this.primaryTextColor, this.actorLineColor = this.actorLineColor || "grey", this.labelBoxBkgColor = this.labelBoxBkgColor || this.actorBkg, this.signalColor = this.signalColor || this.textColor, this.signalTextColor = this.signalTextColor || this.textColor, this.labelBoxBorderColor = this.labelBoxBorderColor || this.actorBorder, this.labelTextColor = this.labelTextColor || this.actorTextColor, this.loopTextColor = this.loopTextColor || this.actorTextColor, this.activationBorderColor = this.activationBorderColor || A(this.secondaryColor, 10), this.activationBkgColor = this.activationBkgColor || this.secondaryColor, this.sequenceNumberColor = this.sequenceNumberColor || C(this.lineColor), this.sectionBkgColor = this.sectionBkgColor || this.tertiaryColor, this.altSectionBkgColor = this.altSectionBkgColor || "white", this.sectionBkgColor = this.sectionBkgColor || this.secondaryColor, this.sectionBkgColor2 = this.sectionBkgColor2 || this.primaryColor, this.excludeBkgColor = this.excludeBkgColor || "#eeeeee", this.taskBorderColor = this.taskBorderColor || this.primaryBorderColor, this.taskBkgColor = this.taskBkgColor || this.primaryColor, this.activeTaskBorderColor = this.activeTaskBorderColor || this.primaryColor, this.activeTaskBkgColor = this.activeTaskBkgColor || F(this.primaryColor, 23), this.gridColor = this.gridColor || "lightgrey", this.doneTaskBkgColor = this.doneTaskBkgColor || "lightgrey", this.doneTaskBorderColor = this.doneTaskBorderColor || "grey", this.critBorderColor = this.critBorderColor || "#ff8888", this.critBkgColor = this.critBkgColor || "red", this.todayLineColor = this.todayLineColor || "red", this.taskTextColor = this.taskTextColor || this.textColor, this.taskTextOutsideColor = this.taskTextOutsideColor || this.textColor, this.taskTextLightColor = this.taskTextLightColor || this.textColor, this.taskTextColor = this.taskTextColor || this.primaryTextColor, this.taskTextDarkColor = this.taskTextDarkColor || this.textColor, this.taskTextClickableColor = this.taskTextClickableColor || "#003163", this.personBorder = this.personBorder || this.primaryBorderColor, this.personBkg = this.personBkg || this.mainBkg, this.transitionColor = this.transitionColor || this.lineColor, this.transitionLabelColor = this.transitionLabelColor || this.textColor, this.stateLabelColor = this.stateLabelColor || this.stateBkg || this.primaryTextColor, this.stateBkg = this.stateBkg || this.mainBkg, this.labelBackgroundColor = this.labelBackgroundColor || this.stateBkg, this.compositeBackground = this.compositeBackground || this.background || this.tertiaryColor, this.altBackground = this.altBackground || this.tertiaryColor, this.compositeTitleBackground = this.compositeTitleBackground || this.mainBkg, this.compositeBorder = this.compositeBorder || this.nodeBorder, this.innerEndBackground = this.nodeBorder, this.errorBkgColor = this.errorBkgColor || this.tertiaryColor, this.errorTextColor = this.errorTextColor || this.tertiaryTextColor, this.transitionColor = this.transitionColor || this.lineColor, this.specialStateColor = this.lineColor, this.cScale0 = this.cScale0 || this.primaryColor, this.cScale1 = this.cScale1 || this.secondaryColor, this.cScale2 = this.cScale2 || this.tertiaryColor, this.cScale3 = this.cScale3 || d(this.primaryColor, { h: 30 }), this.cScale4 = this.cScale4 || d(this.primaryColor, { h: 60 }), this.cScale5 = this.cScale5 || d(this.primaryColor, { h: 90 }), this.cScale6 = this.cScale6 || d(this.primaryColor, { h: 120 }), this.cScale7 = this.cScale7 || d(this.primaryColor, { h: 150 }), this.cScale8 = this.cScale8 || d(this.primaryColor, { h: 210, l: 150 }), this.cScale9 = this.cScale9 || d(this.primaryColor, { h: 270 }), this.cScale10 = this.cScale10 || d(this.primaryColor, { h: 300 }), this.cScale11 = this.cScale11 || d(this.primaryColor, { h: 330 }), this.darkMode)
      for (let i = 0; i < this.THEME_COLOR_LIMIT; i++)
        this["cScale" + i] = A(this["cScale" + i], 75);
    else
      for (let i = 0; i < this.THEME_COLOR_LIMIT; i++)
        this["cScale" + i] = A(this["cScale" + i], 25);
    for (let i = 0; i < this.THEME_COLOR_LIMIT; i++)
      this["cScaleInv" + i] = this["cScaleInv" + i] || C(this["cScale" + i]);
    for (let i = 0; i < this.THEME_COLOR_LIMIT; i++)
      this.darkMode ? this["cScalePeer" + i] = this["cScalePeer" + i] || F(this["cScale" + i], 10) : this["cScalePeer" + i] = this["cScalePeer" + i] || A(this["cScale" + i], 10);
    this.scaleLabelColor = this.scaleLabelColor || this.labelTextColor;
    for (let i = 0; i < this.THEME_COLOR_LIMIT; i++)
      this["cScaleLabel" + i] = this["cScaleLabel" + i] || this.scaleLabelColor;
    const e = this.darkMode ? -4 : -1;
    for (let i = 0; i < 5; i++)
      this["surface" + i] = this["surface" + i] || d(this.mainBkg, { h: 180, s: -15, l: e * (5 + i * 3) }), this["surfacePeer" + i] = this["surfacePeer" + i] || d(this.mainBkg, { h: 180, s: -15, l: e * (8 + i * 3) });
    this.classText = this.classText || this.textColor, this.fillType0 = this.fillType0 || this.primaryColor, this.fillType1 = this.fillType1 || this.secondaryColor, this.fillType2 = this.fillType2 || d(this.primaryColor, { h: 64 }), this.fillType3 = this.fillType3 || d(this.secondaryColor, { h: 64 }), this.fillType4 = this.fillType4 || d(this.primaryColor, { h: -64 }), this.fillType5 = this.fillType5 || d(this.secondaryColor, { h: -64 }), this.fillType6 = this.fillType6 || d(this.primaryColor, { h: 128 }), this.fillType7 = this.fillType7 || d(this.secondaryColor, { h: 128 }), this.pie1 = this.pie1 || this.primaryColor, this.pie2 = this.pie2 || this.secondaryColor, this.pie3 = this.pie3 || this.tertiaryColor, this.pie4 = this.pie4 || d(this.primaryColor, { l: -10 }), this.pie5 = this.pie5 || d(this.secondaryColor, { l: -10 }), this.pie6 = this.pie6 || d(this.tertiaryColor, { l: -10 }), this.pie7 = this.pie7 || d(this.primaryColor, { h: 60, l: -10 }), this.pie8 = this.pie8 || d(this.primaryColor, { h: -60, l: -10 }), this.pie9 = this.pie9 || d(this.primaryColor, { h: 120, l: 0 }), this.pie10 = this.pie10 || d(this.primaryColor, { h: 60, l: -20 }), this.pie11 = this.pie11 || d(this.primaryColor, { h: -60, l: -20 }), this.pie12 = this.pie12 || d(this.primaryColor, { h: 120, l: -10 }), this.pieTitleTextSize = this.pieTitleTextSize || "25px", this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor, this.pieSectionTextSize = this.pieSectionTextSize || "17px", this.pieSectionTextColor = this.pieSectionTextColor || this.textColor, this.pieLegendTextSize = this.pieLegendTextSize || "17px", this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor, this.pieStrokeColor = this.pieStrokeColor || "black", this.pieStrokeWidth = this.pieStrokeWidth || "2px", this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || "2px", this.pieOuterStrokeColor = this.pieOuterStrokeColor || "black", this.pieOpacity = this.pieOpacity || "0.7", this.quadrant1Fill = this.quadrant1Fill || this.primaryColor, this.quadrant2Fill = this.quadrant2Fill || d(this.primaryColor, { r: 5, g: 5, b: 5 }), this.quadrant3Fill = this.quadrant3Fill || d(this.primaryColor, { r: 10, g: 10, b: 10 }), this.quadrant4Fill = this.quadrant4Fill || d(this.primaryColor, { r: 15, g: 15, b: 15 }), this.quadrant1TextFill = this.quadrant1TextFill || this.primaryTextColor, this.quadrant2TextFill = this.quadrant2TextFill || d(this.primaryTextColor, { r: -5, g: -5, b: -5 }), this.quadrant3TextFill = this.quadrant3TextFill || d(this.primaryTextColor, { r: -10, g: -10, b: -10 }), this.quadrant4TextFill = this.quadrant4TextFill || d(this.primaryTextColor, { r: -15, g: -15, b: -15 }), this.quadrantPointFill = this.quadrantPointFill || ci(this.quadrant1Fill) ? F(this.quadrant1Fill) : A(this.quadrant1Fill), this.quadrantPointTextFill = this.quadrantPointTextFill || this.primaryTextColor, this.quadrantXAxisTextFill = this.quadrantXAxisTextFill || this.primaryTextColor, this.quadrantYAxisTextFill = this.quadrantYAxisTextFill || this.primaryTextColor, this.quadrantInternalBorderStrokeFill = this.quadrantInternalBorderStrokeFill || this.primaryBorderColor, this.quadrantExternalBorderStrokeFill = this.quadrantExternalBorderStrokeFill || this.primaryBorderColor, this.quadrantTitleFill = this.quadrantTitleFill || this.primaryTextColor, this.requirementBackground = this.requirementBackground || this.primaryColor, this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor, this.requirementBorderSize = this.requirementBorderSize || "1", this.requirementTextColor = this.requirementTextColor || this.primaryTextColor, this.relationColor = this.relationColor || this.lineColor, this.relationLabelBackground = this.relationLabelBackground || (this.darkMode ? A(this.secondaryColor, 30) : this.secondaryColor), this.relationLabelColor = this.relationLabelColor || this.actorTextColor, this.git0 = this.git0 || this.primaryColor, this.git1 = this.git1 || this.secondaryColor, this.git2 = this.git2 || this.tertiaryColor, this.git3 = this.git3 || d(this.primaryColor, { h: -30 }), this.git4 = this.git4 || d(this.primaryColor, { h: -60 }), this.git5 = this.git5 || d(this.primaryColor, { h: -90 }), this.git6 = this.git6 || d(this.primaryColor, { h: 60 }), this.git7 = this.git7 || d(this.primaryColor, { h: 120 }), this.darkMode ? (this.git0 = F(this.git0, 25), this.git1 = F(this.git1, 25), this.git2 = F(this.git2, 25), this.git3 = F(this.git3, 25), this.git4 = F(this.git4, 25), this.git5 = F(this.git5, 25), this.git6 = F(this.git6, 25), this.git7 = F(this.git7, 25)) : (this.git0 = A(this.git0, 25), this.git1 = A(this.git1, 25), this.git2 = A(this.git2, 25), this.git3 = A(this.git3, 25), this.git4 = A(this.git4, 25), this.git5 = A(this.git5, 25), this.git6 = A(this.git6, 25), this.git7 = A(this.git7, 25)), this.gitInv0 = this.gitInv0 || C(this.git0), this.gitInv1 = this.gitInv1 || C(this.git1), this.gitInv2 = this.gitInv2 || C(this.git2), this.gitInv3 = this.gitInv3 || C(this.git3), this.gitInv4 = this.gitInv4 || C(this.git4), this.gitInv5 = this.gitInv5 || C(this.git5), this.gitInv6 = this.gitInv6 || C(this.git6), this.gitInv7 = this.gitInv7 || C(this.git7), this.branchLabelColor = this.branchLabelColor || (this.darkMode ? "black" : this.labelTextColor), this.gitBranchLabel0 = this.gitBranchLabel0 || this.branchLabelColor, this.gitBranchLabel1 = this.gitBranchLabel1 || this.branchLabelColor, this.gitBranchLabel2 = this.gitBranchLabel2 || this.branchLabelColor, this.gitBranchLabel3 = this.gitBranchLabel3 || this.branchLabelColor, this.gitBranchLabel4 = this.gitBranchLabel4 || this.branchLabelColor, this.gitBranchLabel5 = this.gitBranchLabel5 || this.branchLabelColor, this.gitBranchLabel6 = this.gitBranchLabel6 || this.branchLabelColor, this.gitBranchLabel7 = this.gitBranchLabel7 || this.branchLabelColor, this.tagLabelColor = this.tagLabelColor || this.primaryTextColor, this.tagLabelBackground = this.tagLabelBackground || this.primaryColor, this.tagLabelBorder = this.tagBorder || this.primaryBorderColor, this.tagLabelFontSize = this.tagLabelFontSize || "10px", this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor, this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor, this.commitLabelFontSize = this.commitLabelFontSize || "10px", this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || _r, this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || yr;
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
const cp = (t) => {
  const e = new hp();
  return e.calculate(t), e;
};
let up = class {
  constructor() {
    this.background = "#333", this.primaryColor = "#1f2020", this.secondaryColor = F(this.primaryColor, 16), this.tertiaryColor = d(this.primaryColor, { h: -160 }), this.primaryBorderColor = C(this.background), this.secondaryBorderColor = lt(this.secondaryColor, this.darkMode), this.tertiaryBorderColor = lt(this.tertiaryColor, this.darkMode), this.primaryTextColor = C(this.primaryColor), this.secondaryTextColor = C(this.secondaryColor), this.tertiaryTextColor = C(this.tertiaryColor), this.lineColor = C(this.background), this.textColor = C(this.background), this.mainBkg = "#1f2020", this.secondBkg = "calculated", this.mainContrastColor = "lightgrey", this.darkTextColor = F(C("#323D47"), 10), this.lineColor = "calculated", this.border1 = "#81B1DB", this.border2 = Ge(255, 255, 255, 0.25), this.arrowheadColor = "calculated", this.fontFamily = '"trebuchet ms", verdana, arial, sans-serif', this.fontSize = "16px", this.labelBackground = "#181818", this.textColor = "#ccc", this.THEME_COLOR_LIMIT = 12, this.nodeBkg = "calculated", this.nodeBorder = "calculated", this.clusterBkg = "calculated", this.clusterBorder = "calculated", this.defaultLinkColor = "calculated", this.titleColor = "#F9FFFE", this.edgeLabelBackground = "calculated", this.actorBorder = "calculated", this.actorBkg = "calculated", this.actorTextColor = "calculated", this.actorLineColor = "calculated", this.signalColor = "calculated", this.signalTextColor = "calculated", this.labelBoxBkgColor = "calculated", this.labelBoxBorderColor = "calculated", this.labelTextColor = "calculated", this.loopTextColor = "calculated", this.noteBorderColor = "calculated", this.noteBkgColor = "#fff5ad", this.noteTextColor = "calculated", this.activationBorderColor = "calculated", this.activationBkgColor = "calculated", this.sequenceNumberColor = "black", this.sectionBkgColor = A("#EAE8D9", 30), this.altSectionBkgColor = "calculated", this.sectionBkgColor2 = "#EAE8D9", this.excludeBkgColor = A(this.sectionBkgColor, 10), this.taskBorderColor = Ge(255, 255, 255, 70), this.taskBkgColor = "calculated", this.taskTextColor = "calculated", this.taskTextLightColor = "calculated", this.taskTextOutsideColor = "calculated", this.taskTextClickableColor = "#003163", this.activeTaskBorderColor = Ge(255, 255, 255, 50), this.activeTaskBkgColor = "#81B1DB", this.gridColor = "calculated", this.doneTaskBkgColor = "calculated", this.doneTaskBorderColor = "grey", this.critBorderColor = "#E83737", this.critBkgColor = "#E83737", this.taskTextDarkColor = "calculated", this.todayLineColor = "#DB5757", this.personBorder = this.primaryBorderColor, this.personBkg = this.mainBkg, this.labelColor = "calculated", this.errorBkgColor = "#a44141", this.errorTextColor = "#ddd";
  }
  updateColors() {
    this.secondBkg = F(this.mainBkg, 16), this.lineColor = this.mainContrastColor, this.arrowheadColor = this.mainContrastColor, this.nodeBkg = this.mainBkg, this.nodeBorder = this.border1, this.clusterBkg = this.secondBkg, this.clusterBorder = this.border2, this.defaultLinkColor = this.lineColor, this.edgeLabelBackground = F(this.labelBackground, 25), this.actorBorder = this.border1, this.actorBkg = this.mainBkg, this.actorTextColor = this.mainContrastColor, this.actorLineColor = this.mainContrastColor, this.signalColor = this.mainContrastColor, this.signalTextColor = this.mainContrastColor, this.labelBoxBkgColor = this.actorBkg, this.labelBoxBorderColor = this.actorBorder, this.labelTextColor = this.mainContrastColor, this.loopTextColor = this.mainContrastColor, this.noteBorderColor = this.secondaryBorderColor, this.noteBkgColor = this.secondBkg, this.noteTextColor = this.secondaryTextColor, this.activationBorderColor = this.border1, this.activationBkgColor = this.secondBkg, this.altSectionBkgColor = this.background, this.taskBkgColor = F(this.mainBkg, 23), this.taskTextColor = this.darkTextColor, this.taskTextLightColor = this.mainContrastColor, this.taskTextOutsideColor = this.taskTextLightColor, this.gridColor = this.mainContrastColor, this.doneTaskBkgColor = this.mainContrastColor, this.taskTextDarkColor = this.darkTextColor, this.transitionColor = this.transitionColor || this.lineColor, this.transitionLabelColor = this.transitionLabelColor || this.textColor, this.stateLabelColor = this.stateLabelColor || this.stateBkg || this.primaryTextColor, this.stateBkg = this.stateBkg || this.mainBkg, this.labelBackgroundColor = this.labelBackgroundColor || this.stateBkg, this.compositeBackground = this.compositeBackground || this.background || this.tertiaryColor, this.altBackground = this.altBackground || "#555", this.compositeTitleBackground = this.compositeTitleBackground || this.mainBkg, this.compositeBorder = this.compositeBorder || this.nodeBorder, this.innerEndBackground = this.primaryBorderColor, this.specialStateColor = "#f4f4f4", this.errorBkgColor = this.errorBkgColor || this.tertiaryColor, this.errorTextColor = this.errorTextColor || this.tertiaryTextColor, this.fillType0 = this.primaryColor, this.fillType1 = this.secondaryColor, this.fillType2 = d(this.primaryColor, { h: 64 }), this.fillType3 = d(this.secondaryColor, { h: 64 }), this.fillType4 = d(this.primaryColor, { h: -64 }), this.fillType5 = d(this.secondaryColor, { h: -64 }), this.fillType6 = d(this.primaryColor, { h: 128 }), this.fillType7 = d(this.secondaryColor, { h: 128 }), this.cScale1 = this.cScale1 || "#0b0000", this.cScale2 = this.cScale2 || "#4d1037", this.cScale3 = this.cScale3 || "#3f5258", this.cScale4 = this.cScale4 || "#4f2f1b", this.cScale5 = this.cScale5 || "#6e0a0a", this.cScale6 = this.cScale6 || "#3b0048", this.cScale7 = this.cScale7 || "#995a01", this.cScale8 = this.cScale8 || "#154706", this.cScale9 = this.cScale9 || "#161722", this.cScale10 = this.cScale10 || "#00296f", this.cScale11 = this.cScale11 || "#01629c", this.cScale12 = this.cScale12 || "#010029", this.cScale0 = this.cScale0 || this.primaryColor, this.cScale1 = this.cScale1 || this.secondaryColor, this.cScale2 = this.cScale2 || this.tertiaryColor, this.cScale3 = this.cScale3 || d(this.primaryColor, { h: 30 }), this.cScale4 = this.cScale4 || d(this.primaryColor, { h: 60 }), this.cScale5 = this.cScale5 || d(this.primaryColor, { h: 90 }), this.cScale6 = this.cScale6 || d(this.primaryColor, { h: 120 }), this.cScale7 = this.cScale7 || d(this.primaryColor, { h: 150 }), this.cScale8 = this.cScale8 || d(this.primaryColor, { h: 210 }), this.cScale9 = this.cScale9 || d(this.primaryColor, { h: 270 }), this.cScale10 = this.cScale10 || d(this.primaryColor, { h: 300 }), this.cScale11 = this.cScale11 || d(this.primaryColor, { h: 330 });
    for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
      this["cScaleInv" + e] = this["cScaleInv" + e] || C(this["cScale" + e]);
    for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
      this["cScalePeer" + e] = this["cScalePeer" + e] || F(this["cScale" + e], 10);
    for (let e = 0; e < 5; e++)
      this["surface" + e] = this["surface" + e] || d(this.mainBkg, { h: 30, s: -30, l: -(-10 + e * 4) }), this["surfacePeer" + e] = this["surfacePeer" + e] || d(this.mainBkg, { h: 30, s: -30, l: -(-7 + e * 4) });
    this.scaleLabelColor = this.scaleLabelColor || (this.darkMode ? "black" : this.labelTextColor);
    for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
      this["cScaleLabel" + e] = this["cScaleLabel" + e] || this.scaleLabelColor;
    for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
      this["pie" + e] = this["cScale" + e];
    this.pieTitleTextSize = this.pieTitleTextSize || "25px", this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor, this.pieSectionTextSize = this.pieSectionTextSize || "17px", this.pieSectionTextColor = this.pieSectionTextColor || this.textColor, this.pieLegendTextSize = this.pieLegendTextSize || "17px", this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor, this.pieStrokeColor = this.pieStrokeColor || "black", this.pieStrokeWidth = this.pieStrokeWidth || "2px", this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || "2px", this.pieOuterStrokeColor = this.pieOuterStrokeColor || "black", this.pieOpacity = this.pieOpacity || "0.7", this.quadrant1Fill = this.quadrant1Fill || this.primaryColor, this.quadrant2Fill = this.quadrant2Fill || d(this.primaryColor, { r: 5, g: 5, b: 5 }), this.quadrant3Fill = this.quadrant3Fill || d(this.primaryColor, { r: 10, g: 10, b: 10 }), this.quadrant4Fill = this.quadrant4Fill || d(this.primaryColor, { r: 15, g: 15, b: 15 }), this.quadrant1TextFill = this.quadrant1TextFill || this.primaryTextColor, this.quadrant2TextFill = this.quadrant2TextFill || d(this.primaryTextColor, { r: -5, g: -5, b: -5 }), this.quadrant3TextFill = this.quadrant3TextFill || d(this.primaryTextColor, { r: -10, g: -10, b: -10 }), this.quadrant4TextFill = this.quadrant4TextFill || d(this.primaryTextColor, { r: -15, g: -15, b: -15 }), this.quadrantPointFill = this.quadrantPointFill || ci(this.quadrant1Fill) ? F(this.quadrant1Fill) : A(this.quadrant1Fill), this.quadrantPointTextFill = this.quadrantPointTextFill || this.primaryTextColor, this.quadrantXAxisTextFill = this.quadrantXAxisTextFill || this.primaryTextColor, this.quadrantYAxisTextFill = this.quadrantYAxisTextFill || this.primaryTextColor, this.quadrantInternalBorderStrokeFill = this.quadrantInternalBorderStrokeFill || this.primaryBorderColor, this.quadrantExternalBorderStrokeFill = this.quadrantExternalBorderStrokeFill || this.primaryBorderColor, this.quadrantTitleFill = this.quadrantTitleFill || this.primaryTextColor, this.classText = this.primaryTextColor, this.requirementBackground = this.requirementBackground || this.primaryColor, this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor, this.requirementBorderSize = this.requirementBorderSize || "1", this.requirementTextColor = this.requirementTextColor || this.primaryTextColor, this.relationColor = this.relationColor || this.lineColor, this.relationLabelBackground = this.relationLabelBackground || (this.darkMode ? A(this.secondaryColor, 30) : this.secondaryColor), this.relationLabelColor = this.relationLabelColor || this.actorTextColor, this.git0 = F(this.secondaryColor, 20), this.git1 = F(this.pie2 || this.secondaryColor, 20), this.git2 = F(this.pie3 || this.tertiaryColor, 20), this.git3 = F(this.pie4 || d(this.primaryColor, { h: -30 }), 20), this.git4 = F(this.pie5 || d(this.primaryColor, { h: -60 }), 20), this.git5 = F(this.pie6 || d(this.primaryColor, { h: -90 }), 10), this.git6 = F(this.pie7 || d(this.primaryColor, { h: 60 }), 10), this.git7 = F(this.pie8 || d(this.primaryColor, { h: 120 }), 20), this.gitInv0 = this.gitInv0 || C(this.git0), this.gitInv1 = this.gitInv1 || C(this.git1), this.gitInv2 = this.gitInv2 || C(this.git2), this.gitInv3 = this.gitInv3 || C(this.git3), this.gitInv4 = this.gitInv4 || C(this.git4), this.gitInv5 = this.gitInv5 || C(this.git5), this.gitInv6 = this.gitInv6 || C(this.git6), this.gitInv7 = this.gitInv7 || C(this.git7), this.gitBranchLabel0 = this.gitBranchLabel0 || C(this.labelTextColor), this.gitBranchLabel1 = this.gitBranchLabel1 || this.labelTextColor, this.gitBranchLabel2 = this.gitBranchLabel2 || this.labelTextColor, this.gitBranchLabel3 = this.gitBranchLabel3 || C(this.labelTextColor), this.gitBranchLabel4 = this.gitBranchLabel4 || this.labelTextColor, this.gitBranchLabel5 = this.gitBranchLabel5 || this.labelTextColor, this.gitBranchLabel6 = this.gitBranchLabel6 || this.labelTextColor, this.gitBranchLabel7 = this.gitBranchLabel7 || this.labelTextColor, this.tagLabelColor = this.tagLabelColor || this.primaryTextColor, this.tagLabelBackground = this.tagLabelBackground || this.primaryColor, this.tagLabelBorder = this.tagBorder || this.primaryBorderColor, this.tagLabelFontSize = this.tagLabelFontSize || "10px", this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor, this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor, this.commitLabelFontSize = this.commitLabelFontSize || "10px", this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || F(this.background, 12), this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || F(this.background, 2);
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
    this.background = "#f4f4f4", this.primaryColor = "#ECECFF", this.secondaryColor = d(this.primaryColor, { h: 120 }), this.secondaryColor = "#ffffde", this.tertiaryColor = d(this.primaryColor, { h: -160 }), this.primaryBorderColor = lt(this.primaryColor, this.darkMode), this.secondaryBorderColor = lt(this.secondaryColor, this.darkMode), this.tertiaryBorderColor = lt(this.tertiaryColor, this.darkMode), this.primaryTextColor = C(this.primaryColor), this.secondaryTextColor = C(this.secondaryColor), this.tertiaryTextColor = C(this.tertiaryColor), this.lineColor = C(this.background), this.textColor = C(this.background), this.background = "white", this.mainBkg = "#ECECFF", this.secondBkg = "#ffffde", this.lineColor = "#333333", this.border1 = "#9370DB", this.border2 = "#aaaa33", this.arrowheadColor = "#333333", this.fontFamily = '"trebuchet ms", verdana, arial, sans-serif', this.fontSize = "16px", this.labelBackground = "#e8e8e8", this.textColor = "#333", this.THEME_COLOR_LIMIT = 12, this.nodeBkg = "calculated", this.nodeBorder = "calculated", this.clusterBkg = "calculated", this.clusterBorder = "calculated", this.defaultLinkColor = "calculated", this.titleColor = "calculated", this.edgeLabelBackground = "calculated", this.actorBorder = "calculated", this.actorBkg = "calculated", this.actorTextColor = "black", this.actorLineColor = "grey", this.signalColor = "calculated", this.signalTextColor = "calculated", this.labelBoxBkgColor = "calculated", this.labelBoxBorderColor = "calculated", this.labelTextColor = "calculated", this.loopTextColor = "calculated", this.noteBorderColor = "calculated", this.noteBkgColor = "#fff5ad", this.noteTextColor = "calculated", this.activationBorderColor = "#666", this.activationBkgColor = "#f4f4f4", this.sequenceNumberColor = "white", this.sectionBkgColor = "calculated", this.altSectionBkgColor = "calculated", this.sectionBkgColor2 = "calculated", this.excludeBkgColor = "#eeeeee", this.taskBorderColor = "calculated", this.taskBkgColor = "calculated", this.taskTextLightColor = "calculated", this.taskTextColor = this.taskTextLightColor, this.taskTextDarkColor = "calculated", this.taskTextOutsideColor = this.taskTextDarkColor, this.taskTextClickableColor = "calculated", this.activeTaskBorderColor = "calculated", this.activeTaskBkgColor = "calculated", this.gridColor = "calculated", this.doneTaskBkgColor = "calculated", this.doneTaskBorderColor = "calculated", this.critBorderColor = "calculated", this.critBkgColor = "calculated", this.todayLineColor = "calculated", this.sectionBkgColor = Ge(102, 102, 255, 0.49), this.altSectionBkgColor = "white", this.sectionBkgColor2 = "#fff400", this.taskBorderColor = "#534fbc", this.taskBkgColor = "#8a90dd", this.taskTextLightColor = "white", this.taskTextColor = "calculated", this.taskTextDarkColor = "black", this.taskTextOutsideColor = "calculated", this.taskTextClickableColor = "#003163", this.activeTaskBorderColor = "#534fbc", this.activeTaskBkgColor = "#bfc7ff", this.gridColor = "lightgrey", this.doneTaskBkgColor = "lightgrey", this.doneTaskBorderColor = "grey", this.critBorderColor = "#ff8888", this.critBkgColor = "red", this.todayLineColor = "red", this.personBorder = this.primaryBorderColor, this.personBkg = this.mainBkg, this.labelColor = "black", this.errorBkgColor = "#552222", this.errorTextColor = "#552222", this.updateColors();
  }
  updateColors() {
    this.cScale0 = this.cScale0 || this.primaryColor, this.cScale1 = this.cScale1 || this.secondaryColor, this.cScale2 = this.cScale2 || this.tertiaryColor, this.cScale3 = this.cScale3 || d(this.primaryColor, { h: 30 }), this.cScale4 = this.cScale4 || d(this.primaryColor, { h: 60 }), this.cScale5 = this.cScale5 || d(this.primaryColor, { h: 90 }), this.cScale6 = this.cScale6 || d(this.primaryColor, { h: 120 }), this.cScale7 = this.cScale7 || d(this.primaryColor, { h: 150 }), this.cScale8 = this.cScale8 || d(this.primaryColor, { h: 210 }), this.cScale9 = this.cScale9 || d(this.primaryColor, { h: 270 }), this.cScale10 = this.cScale10 || d(this.primaryColor, { h: 300 }), this.cScale11 = this.cScale11 || d(this.primaryColor, { h: 330 }), this["cScalePeer1"] = this["cScalePeer1"] || A(this.secondaryColor, 45), this["cScalePeer2"] = this["cScalePeer2"] || A(this.tertiaryColor, 40);
    for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
      this["cScale" + e] = A(this["cScale" + e], 10), this["cScalePeer" + e] = this["cScalePeer" + e] || A(this["cScale" + e], 25);
    for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
      this["cScaleInv" + e] = this["cScaleInv" + e] || d(this["cScale" + e], { h: 180 });
    for (let e = 0; e < 5; e++)
      this["surface" + e] = this["surface" + e] || d(this.mainBkg, { h: 30, l: -(5 + e * 5) }), this["surfacePeer" + e] = this["surfacePeer" + e] || d(this.mainBkg, { h: 30, l: -(7 + e * 5) });
    if (this.scaleLabelColor = this.scaleLabelColor !== "calculated" && this.scaleLabelColor ? this.scaleLabelColor : this.labelTextColor, this.labelTextColor !== "calculated") {
      this.cScaleLabel0 = this.cScaleLabel0 || C(this.labelTextColor), this.cScaleLabel3 = this.cScaleLabel3 || C(this.labelTextColor);
      for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
        this["cScaleLabel" + e] = this["cScaleLabel" + e] || this.labelTextColor;
    }
    this.nodeBkg = this.mainBkg, this.nodeBorder = this.border1, this.clusterBkg = this.secondBkg, this.clusterBorder = this.border2, this.defaultLinkColor = this.lineColor, this.titleColor = this.textColor, this.edgeLabelBackground = this.labelBackground, this.actorBorder = F(this.border1, 23), this.actorBkg = this.mainBkg, this.labelBoxBkgColor = this.actorBkg, this.signalColor = this.textColor, this.signalTextColor = this.textColor, this.labelBoxBorderColor = this.actorBorder, this.labelTextColor = this.actorTextColor, this.loopTextColor = this.actorTextColor, this.noteBorderColor = this.border2, this.noteTextColor = this.actorTextColor, this.taskTextColor = this.taskTextLightColor, this.taskTextOutsideColor = this.taskTextDarkColor, this.transitionColor = this.transitionColor || this.lineColor, this.transitionLabelColor = this.transitionLabelColor || this.textColor, this.stateLabelColor = this.stateLabelColor || this.stateBkg || this.primaryTextColor, this.stateBkg = this.stateBkg || this.mainBkg, this.labelBackgroundColor = this.labelBackgroundColor || this.stateBkg, this.compositeBackground = this.compositeBackground || this.background || this.tertiaryColor, this.altBackground = this.altBackground || "#f0f0f0", this.compositeTitleBackground = this.compositeTitleBackground || this.mainBkg, this.compositeBorder = this.compositeBorder || this.nodeBorder, this.innerEndBackground = this.nodeBorder, this.specialStateColor = this.lineColor, this.errorBkgColor = this.errorBkgColor || this.tertiaryColor, this.errorTextColor = this.errorTextColor || this.tertiaryTextColor, this.transitionColor = this.transitionColor || this.lineColor, this.classText = this.primaryTextColor, this.fillType0 = this.primaryColor, this.fillType1 = this.secondaryColor, this.fillType2 = d(this.primaryColor, { h: 64 }), this.fillType3 = d(this.secondaryColor, { h: 64 }), this.fillType4 = d(this.primaryColor, { h: -64 }), this.fillType5 = d(this.secondaryColor, { h: -64 }), this.fillType6 = d(this.primaryColor, { h: 128 }), this.fillType7 = d(this.secondaryColor, { h: 128 }), this.pie1 = this.pie1 || this.primaryColor, this.pie2 = this.pie2 || this.secondaryColor, this.pie3 = this.pie3 || d(this.tertiaryColor, { l: -40 }), this.pie4 = this.pie4 || d(this.primaryColor, { l: -10 }), this.pie5 = this.pie5 || d(this.secondaryColor, { l: -30 }), this.pie6 = this.pie6 || d(this.tertiaryColor, { l: -20 }), this.pie7 = this.pie7 || d(this.primaryColor, { h: 60, l: -20 }), this.pie8 = this.pie8 || d(this.primaryColor, { h: -60, l: -40 }), this.pie9 = this.pie9 || d(this.primaryColor, { h: 120, l: -40 }), this.pie10 = this.pie10 || d(this.primaryColor, { h: 60, l: -40 }), this.pie11 = this.pie11 || d(this.primaryColor, { h: -90, l: -40 }), this.pie12 = this.pie12 || d(this.primaryColor, { h: 120, l: -30 }), this.pieTitleTextSize = this.pieTitleTextSize || "25px", this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor, this.pieSectionTextSize = this.pieSectionTextSize || "17px", this.pieSectionTextColor = this.pieSectionTextColor || this.textColor, this.pieLegendTextSize = this.pieLegendTextSize || "17px", this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor, this.pieStrokeColor = this.pieStrokeColor || "black", this.pieStrokeWidth = this.pieStrokeWidth || "2px", this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || "2px", this.pieOuterStrokeColor = this.pieOuterStrokeColor || "black", this.pieOpacity = this.pieOpacity || "0.7", this.quadrant1Fill = this.quadrant1Fill || this.primaryColor, this.quadrant2Fill = this.quadrant2Fill || d(this.primaryColor, { r: 5, g: 5, b: 5 }), this.quadrant3Fill = this.quadrant3Fill || d(this.primaryColor, { r: 10, g: 10, b: 10 }), this.quadrant4Fill = this.quadrant4Fill || d(this.primaryColor, { r: 15, g: 15, b: 15 }), this.quadrant1TextFill = this.quadrant1TextFill || this.primaryTextColor, this.quadrant2TextFill = this.quadrant2TextFill || d(this.primaryTextColor, { r: -5, g: -5, b: -5 }), this.quadrant3TextFill = this.quadrant3TextFill || d(this.primaryTextColor, { r: -10, g: -10, b: -10 }), this.quadrant4TextFill = this.quadrant4TextFill || d(this.primaryTextColor, { r: -15, g: -15, b: -15 }), this.quadrantPointFill = this.quadrantPointFill || ci(this.quadrant1Fill) ? F(this.quadrant1Fill) : A(this.quadrant1Fill), this.quadrantPointTextFill = this.quadrantPointTextFill || this.primaryTextColor, this.quadrantXAxisTextFill = this.quadrantXAxisTextFill || this.primaryTextColor, this.quadrantYAxisTextFill = this.quadrantYAxisTextFill || this.primaryTextColor, this.quadrantInternalBorderStrokeFill = this.quadrantInternalBorderStrokeFill || this.primaryBorderColor, this.quadrantExternalBorderStrokeFill = this.quadrantExternalBorderStrokeFill || this.primaryBorderColor, this.quadrantTitleFill = this.quadrantTitleFill || this.primaryTextColor, this.requirementBackground = this.requirementBackground || this.primaryColor, this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor, this.requirementBorderSize = this.requirementBorderSize || "1", this.requirementTextColor = this.requirementTextColor || this.primaryTextColor, this.relationColor = this.relationColor || this.lineColor, this.relationLabelBackground = this.relationLabelBackground || this.labelBackground, this.relationLabelColor = this.relationLabelColor || this.actorTextColor, this.git0 = this.git0 || this.primaryColor, this.git1 = this.git1 || this.secondaryColor, this.git2 = this.git2 || this.tertiaryColor, this.git3 = this.git3 || d(this.primaryColor, { h: -30 }), this.git4 = this.git4 || d(this.primaryColor, { h: -60 }), this.git5 = this.git5 || d(this.primaryColor, { h: -90 }), this.git6 = this.git6 || d(this.primaryColor, { h: 60 }), this.git7 = this.git7 || d(this.primaryColor, { h: 120 }), this.darkMode ? (this.git0 = F(this.git0, 25), this.git1 = F(this.git1, 25), this.git2 = F(this.git2, 25), this.git3 = F(this.git3, 25), this.git4 = F(this.git4, 25), this.git5 = F(this.git5, 25), this.git6 = F(this.git6, 25), this.git7 = F(this.git7, 25)) : (this.git0 = A(this.git0, 25), this.git1 = A(this.git1, 25), this.git2 = A(this.git2, 25), this.git3 = A(this.git3, 25), this.git4 = A(this.git4, 25), this.git5 = A(this.git5, 25), this.git6 = A(this.git6, 25), this.git7 = A(this.git7, 25)), this.gitInv0 = this.gitInv0 || A(C(this.git0), 25), this.gitInv1 = this.gitInv1 || C(this.git1), this.gitInv2 = this.gitInv2 || C(this.git2), this.gitInv3 = this.gitInv3 || C(this.git3), this.gitInv4 = this.gitInv4 || C(this.git4), this.gitInv5 = this.gitInv5 || C(this.git5), this.gitInv6 = this.gitInv6 || C(this.git6), this.gitInv7 = this.gitInv7 || C(this.git7), this.gitBranchLabel0 = this.gitBranchLabel0 || C(this.labelTextColor), this.gitBranchLabel1 = this.gitBranchLabel1 || this.labelTextColor, this.gitBranchLabel2 = this.gitBranchLabel2 || this.labelTextColor, this.gitBranchLabel3 = this.gitBranchLabel3 || C(this.labelTextColor), this.gitBranchLabel4 = this.gitBranchLabel4 || this.labelTextColor, this.gitBranchLabel5 = this.gitBranchLabel5 || this.labelTextColor, this.gitBranchLabel6 = this.gitBranchLabel6 || this.labelTextColor, this.gitBranchLabel7 = this.gitBranchLabel7 || this.labelTextColor, this.tagLabelColor = this.tagLabelColor || this.primaryTextColor, this.tagLabelBackground = this.tagLabelBackground || this.primaryColor, this.tagLabelBorder = this.tagBorder || this.primaryBorderColor, this.tagLabelFontSize = this.tagLabelFontSize || "10px", this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor, this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor, this.commitLabelFontSize = this.commitLabelFontSize || "10px", this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || _r, this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || yr;
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
    this.background = "#f4f4f4", this.primaryColor = "#cde498", this.secondaryColor = "#cdffb2", this.background = "white", this.mainBkg = "#cde498", this.secondBkg = "#cdffb2", this.lineColor = "green", this.border1 = "#13540c", this.border2 = "#6eaa49", this.arrowheadColor = "green", this.fontFamily = '"trebuchet ms", verdana, arial, sans-serif', this.fontSize = "16px", this.tertiaryColor = F("#cde498", 10), this.primaryBorderColor = lt(this.primaryColor, this.darkMode), this.secondaryBorderColor = lt(this.secondaryColor, this.darkMode), this.tertiaryBorderColor = lt(this.tertiaryColor, this.darkMode), this.primaryTextColor = C(this.primaryColor), this.secondaryTextColor = C(this.secondaryColor), this.tertiaryTextColor = C(this.primaryColor), this.lineColor = C(this.background), this.textColor = C(this.background), this.THEME_COLOR_LIMIT = 12, this.nodeBkg = "calculated", this.nodeBorder = "calculated", this.clusterBkg = "calculated", this.clusterBorder = "calculated", this.defaultLinkColor = "calculated", this.titleColor = "#333", this.edgeLabelBackground = "#e8e8e8", this.actorBorder = "calculated", this.actorBkg = "calculated", this.actorTextColor = "black", this.actorLineColor = "grey", this.signalColor = "#333", this.signalTextColor = "#333", this.labelBoxBkgColor = "calculated", this.labelBoxBorderColor = "#326932", this.labelTextColor = "calculated", this.loopTextColor = "calculated", this.noteBorderColor = "calculated", this.noteBkgColor = "#fff5ad", this.noteTextColor = "calculated", this.activationBorderColor = "#666", this.activationBkgColor = "#f4f4f4", this.sequenceNumberColor = "white", this.sectionBkgColor = "#6eaa49", this.altSectionBkgColor = "white", this.sectionBkgColor2 = "#6eaa49", this.excludeBkgColor = "#eeeeee", this.taskBorderColor = "calculated", this.taskBkgColor = "#487e3a", this.taskTextLightColor = "white", this.taskTextColor = "calculated", this.taskTextDarkColor = "black", this.taskTextOutsideColor = "calculated", this.taskTextClickableColor = "#003163", this.activeTaskBorderColor = "calculated", this.activeTaskBkgColor = "calculated", this.gridColor = "lightgrey", this.doneTaskBkgColor = "lightgrey", this.doneTaskBorderColor = "grey", this.critBorderColor = "#ff8888", this.critBkgColor = "red", this.todayLineColor = "red", this.personBorder = this.primaryBorderColor, this.personBkg = this.mainBkg, this.labelColor = "black", this.errorBkgColor = "#552222", this.errorTextColor = "#552222";
  }
  updateColors() {
    this.actorBorder = A(this.mainBkg, 20), this.actorBkg = this.mainBkg, this.labelBoxBkgColor = this.actorBkg, this.labelTextColor = this.actorTextColor, this.loopTextColor = this.actorTextColor, this.noteBorderColor = this.border2, this.noteTextColor = this.actorTextColor, this.cScale0 = this.cScale0 || this.primaryColor, this.cScale1 = this.cScale1 || this.secondaryColor, this.cScale2 = this.cScale2 || this.tertiaryColor, this.cScale3 = this.cScale3 || d(this.primaryColor, { h: 30 }), this.cScale4 = this.cScale4 || d(this.primaryColor, { h: 60 }), this.cScale5 = this.cScale5 || d(this.primaryColor, { h: 90 }), this.cScale6 = this.cScale6 || d(this.primaryColor, { h: 120 }), this.cScale7 = this.cScale7 || d(this.primaryColor, { h: 150 }), this.cScale8 = this.cScale8 || d(this.primaryColor, { h: 210 }), this.cScale9 = this.cScale9 || d(this.primaryColor, { h: 270 }), this.cScale10 = this.cScale10 || d(this.primaryColor, { h: 300 }), this.cScale11 = this.cScale11 || d(this.primaryColor, { h: 330 }), this["cScalePeer1"] = this["cScalePeer1"] || A(this.secondaryColor, 45), this["cScalePeer2"] = this["cScalePeer2"] || A(this.tertiaryColor, 40);
    for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
      this["cScale" + e] = A(this["cScale" + e], 10), this["cScalePeer" + e] = this["cScalePeer" + e] || A(this["cScale" + e], 25);
    for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
      this["cScaleInv" + e] = this["cScaleInv" + e] || d(this["cScale" + e], { h: 180 });
    this.scaleLabelColor = this.scaleLabelColor !== "calculated" && this.scaleLabelColor ? this.scaleLabelColor : this.labelTextColor;
    for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
      this["cScaleLabel" + e] = this["cScaleLabel" + e] || this.scaleLabelColor;
    for (let e = 0; e < 5; e++)
      this["surface" + e] = this["surface" + e] || d(this.mainBkg, { h: 30, s: -30, l: -(5 + e * 5) }), this["surfacePeer" + e] = this["surfacePeer" + e] || d(this.mainBkg, { h: 30, s: -30, l: -(8 + e * 5) });
    this.nodeBkg = this.mainBkg, this.nodeBorder = this.border1, this.clusterBkg = this.secondBkg, this.clusterBorder = this.border2, this.defaultLinkColor = this.lineColor, this.taskBorderColor = this.border1, this.taskTextColor = this.taskTextLightColor, this.taskTextOutsideColor = this.taskTextDarkColor, this.activeTaskBorderColor = this.taskBorderColor, this.activeTaskBkgColor = this.mainBkg, this.transitionColor = this.transitionColor || this.lineColor, this.transitionLabelColor = this.transitionLabelColor || this.textColor, this.stateLabelColor = this.stateLabelColor || this.stateBkg || this.primaryTextColor, this.stateBkg = this.stateBkg || this.mainBkg, this.labelBackgroundColor = this.labelBackgroundColor || this.stateBkg, this.compositeBackground = this.compositeBackground || this.background || this.tertiaryColor, this.altBackground = this.altBackground || "#f0f0f0", this.compositeTitleBackground = this.compositeTitleBackground || this.mainBkg, this.compositeBorder = this.compositeBorder || this.nodeBorder, this.innerEndBackground = this.primaryBorderColor, this.specialStateColor = this.lineColor, this.errorBkgColor = this.errorBkgColor || this.tertiaryColor, this.errorTextColor = this.errorTextColor || this.tertiaryTextColor, this.transitionColor = this.transitionColor || this.lineColor, this.classText = this.primaryTextColor, this.fillType0 = this.primaryColor, this.fillType1 = this.secondaryColor, this.fillType2 = d(this.primaryColor, { h: 64 }), this.fillType3 = d(this.secondaryColor, { h: 64 }), this.fillType4 = d(this.primaryColor, { h: -64 }), this.fillType5 = d(this.secondaryColor, { h: -64 }), this.fillType6 = d(this.primaryColor, { h: 128 }), this.fillType7 = d(this.secondaryColor, { h: 128 }), this.pie1 = this.pie1 || this.primaryColor, this.pie2 = this.pie2 || this.secondaryColor, this.pie3 = this.pie3 || this.tertiaryColor, this.pie4 = this.pie4 || d(this.primaryColor, { l: -30 }), this.pie5 = this.pie5 || d(this.secondaryColor, { l: -30 }), this.pie6 = this.pie6 || d(this.tertiaryColor, { h: 40, l: -40 }), this.pie7 = this.pie7 || d(this.primaryColor, { h: 60, l: -10 }), this.pie8 = this.pie8 || d(this.primaryColor, { h: -60, l: -10 }), this.pie9 = this.pie9 || d(this.primaryColor, { h: 120, l: 0 }), this.pie10 = this.pie10 || d(this.primaryColor, { h: 60, l: -50 }), this.pie11 = this.pie11 || d(this.primaryColor, { h: -60, l: -50 }), this.pie12 = this.pie12 || d(this.primaryColor, { h: 120, l: -50 }), this.pieTitleTextSize = this.pieTitleTextSize || "25px", this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor, this.pieSectionTextSize = this.pieSectionTextSize || "17px", this.pieSectionTextColor = this.pieSectionTextColor || this.textColor, this.pieLegendTextSize = this.pieLegendTextSize || "17px", this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor, this.pieStrokeColor = this.pieStrokeColor || "black", this.pieStrokeWidth = this.pieStrokeWidth || "2px", this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || "2px", this.pieOuterStrokeColor = this.pieOuterStrokeColor || "black", this.pieOpacity = this.pieOpacity || "0.7", this.quadrant1Fill = this.quadrant1Fill || this.primaryColor, this.quadrant2Fill = this.quadrant2Fill || d(this.primaryColor, { r: 5, g: 5, b: 5 }), this.quadrant3Fill = this.quadrant3Fill || d(this.primaryColor, { r: 10, g: 10, b: 10 }), this.quadrant4Fill = this.quadrant4Fill || d(this.primaryColor, { r: 15, g: 15, b: 15 }), this.quadrant1TextFill = this.quadrant1TextFill || this.primaryTextColor, this.quadrant2TextFill = this.quadrant2TextFill || d(this.primaryTextColor, { r: -5, g: -5, b: -5 }), this.quadrant3TextFill = this.quadrant3TextFill || d(this.primaryTextColor, { r: -10, g: -10, b: -10 }), this.quadrant4TextFill = this.quadrant4TextFill || d(this.primaryTextColor, { r: -15, g: -15, b: -15 }), this.quadrantPointFill = this.quadrantPointFill || ci(this.quadrant1Fill) ? F(this.quadrant1Fill) : A(this.quadrant1Fill), this.quadrantPointTextFill = this.quadrantPointTextFill || this.primaryTextColor, this.quadrantXAxisTextFill = this.quadrantXAxisTextFill || this.primaryTextColor, this.quadrantYAxisTextFill = this.quadrantYAxisTextFill || this.primaryTextColor, this.quadrantInternalBorderStrokeFill = this.quadrantInternalBorderStrokeFill || this.primaryBorderColor, this.quadrantExternalBorderStrokeFill = this.quadrantExternalBorderStrokeFill || this.primaryBorderColor, this.quadrantTitleFill = this.quadrantTitleFill || this.primaryTextColor, this.requirementBackground = this.requirementBackground || this.primaryColor, this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor, this.requirementBorderSize = this.requirementBorderSize || "1", this.requirementTextColor = this.requirementTextColor || this.primaryTextColor, this.relationColor = this.relationColor || this.lineColor, this.relationLabelBackground = this.relationLabelBackground || this.edgeLabelBackground, this.relationLabelColor = this.relationLabelColor || this.actorTextColor, this.git0 = this.git0 || this.primaryColor, this.git1 = this.git1 || this.secondaryColor, this.git2 = this.git2 || this.tertiaryColor, this.git3 = this.git3 || d(this.primaryColor, { h: -30 }), this.git4 = this.git4 || d(this.primaryColor, { h: -60 }), this.git5 = this.git5 || d(this.primaryColor, { h: -90 }), this.git6 = this.git6 || d(this.primaryColor, { h: 60 }), this.git7 = this.git7 || d(this.primaryColor, { h: 120 }), this.darkMode ? (this.git0 = F(this.git0, 25), this.git1 = F(this.git1, 25), this.git2 = F(this.git2, 25), this.git3 = F(this.git3, 25), this.git4 = F(this.git4, 25), this.git5 = F(this.git5, 25), this.git6 = F(this.git6, 25), this.git7 = F(this.git7, 25)) : (this.git0 = A(this.git0, 25), this.git1 = A(this.git1, 25), this.git2 = A(this.git2, 25), this.git3 = A(this.git3, 25), this.git4 = A(this.git4, 25), this.git5 = A(this.git5, 25), this.git6 = A(this.git6, 25), this.git7 = A(this.git7, 25)), this.gitInv0 = this.gitInv0 || C(this.git0), this.gitInv1 = this.gitInv1 || C(this.git1), this.gitInv2 = this.gitInv2 || C(this.git2), this.gitInv3 = this.gitInv3 || C(this.git3), this.gitInv4 = this.gitInv4 || C(this.git4), this.gitInv5 = this.gitInv5 || C(this.git5), this.gitInv6 = this.gitInv6 || C(this.git6), this.gitInv7 = this.gitInv7 || C(this.git7), this.gitBranchLabel0 = this.gitBranchLabel0 || C(this.labelTextColor), this.gitBranchLabel1 = this.gitBranchLabel1 || this.labelTextColor, this.gitBranchLabel2 = this.gitBranchLabel2 || this.labelTextColor, this.gitBranchLabel3 = this.gitBranchLabel3 || C(this.labelTextColor), this.gitBranchLabel4 = this.gitBranchLabel4 || this.labelTextColor, this.gitBranchLabel5 = this.gitBranchLabel5 || this.labelTextColor, this.gitBranchLabel6 = this.gitBranchLabel6 || this.labelTextColor, this.gitBranchLabel7 = this.gitBranchLabel7 || this.labelTextColor, this.tagLabelColor = this.tagLabelColor || this.primaryTextColor, this.tagLabelBackground = this.tagLabelBackground || this.primaryColor, this.tagLabelBorder = this.tagBorder || this.primaryBorderColor, this.tagLabelFontSize = this.tagLabelFontSize || "10px", this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor, this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor, this.commitLabelFontSize = this.commitLabelFontSize || "10px", this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || _r, this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || yr;
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
class _p {
  constructor() {
    this.primaryColor = "#eee", this.contrast = "#707070", this.secondaryColor = F(this.contrast, 55), this.background = "#ffffff", this.tertiaryColor = d(this.primaryColor, { h: -160 }), this.primaryBorderColor = lt(this.primaryColor, this.darkMode), this.secondaryBorderColor = lt(this.secondaryColor, this.darkMode), this.tertiaryBorderColor = lt(this.tertiaryColor, this.darkMode), this.primaryTextColor = C(this.primaryColor), this.secondaryTextColor = C(this.secondaryColor), this.tertiaryTextColor = C(this.tertiaryColor), this.lineColor = C(this.background), this.textColor = C(this.background), this.mainBkg = "#eee", this.secondBkg = "calculated", this.lineColor = "#666", this.border1 = "#999", this.border2 = "calculated", this.note = "#ffa", this.text = "#333", this.critical = "#d42", this.done = "#bbb", this.arrowheadColor = "#333333", this.fontFamily = '"trebuchet ms", verdana, arial, sans-serif', this.fontSize = "16px", this.THEME_COLOR_LIMIT = 12, this.nodeBkg = "calculated", this.nodeBorder = "calculated", this.clusterBkg = "calculated", this.clusterBorder = "calculated", this.defaultLinkColor = "calculated", this.titleColor = "calculated", this.edgeLabelBackground = "white", this.actorBorder = "calculated", this.actorBkg = "calculated", this.actorTextColor = "calculated", this.actorLineColor = "calculated", this.signalColor = "calculated", this.signalTextColor = "calculated", this.labelBoxBkgColor = "calculated", this.labelBoxBorderColor = "calculated", this.labelTextColor = "calculated", this.loopTextColor = "calculated", this.noteBorderColor = "calculated", this.noteBkgColor = "calculated", this.noteTextColor = "calculated", this.activationBorderColor = "#666", this.activationBkgColor = "#f4f4f4", this.sequenceNumberColor = "white", this.sectionBkgColor = "calculated", this.altSectionBkgColor = "white", this.sectionBkgColor2 = "calculated", this.excludeBkgColor = "#eeeeee", this.taskBorderColor = "calculated", this.taskBkgColor = "calculated", this.taskTextLightColor = "white", this.taskTextColor = "calculated", this.taskTextDarkColor = "calculated", this.taskTextOutsideColor = "calculated", this.taskTextClickableColor = "#003163", this.activeTaskBorderColor = "calculated", this.activeTaskBkgColor = "calculated", this.gridColor = "calculated", this.doneTaskBkgColor = "calculated", this.doneTaskBorderColor = "calculated", this.critBkgColor = "calculated", this.critBorderColor = "calculated", this.todayLineColor = "calculated", this.personBorder = this.primaryBorderColor, this.personBkg = this.mainBkg, this.labelColor = "black", this.errorBkgColor = "#552222", this.errorTextColor = "#552222";
  }
  updateColors() {
    this.secondBkg = F(this.contrast, 55), this.border2 = this.contrast, this.actorBorder = F(this.border1, 23), this.actorBkg = this.mainBkg, this.actorTextColor = this.text, this.actorLineColor = this.lineColor, this.signalColor = this.text, this.signalTextColor = this.text, this.labelBoxBkgColor = this.actorBkg, this.labelBoxBorderColor = this.actorBorder, this.labelTextColor = this.text, this.loopTextColor = this.text, this.noteBorderColor = "#999", this.noteBkgColor = "#666", this.noteTextColor = "#fff", this.cScale0 = this.cScale0 || "#555", this.cScale1 = this.cScale1 || "#F4F4F4", this.cScale2 = this.cScale2 || "#555", this.cScale3 = this.cScale3 || "#BBB", this.cScale4 = this.cScale4 || "#777", this.cScale5 = this.cScale5 || "#999", this.cScale6 = this.cScale6 || "#DDD", this.cScale7 = this.cScale7 || "#FFF", this.cScale8 = this.cScale8 || "#DDD", this.cScale9 = this.cScale9 || "#BBB", this.cScale10 = this.cScale10 || "#999", this.cScale11 = this.cScale11 || "#777";
    for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
      this["cScaleInv" + e] = this["cScaleInv" + e] || C(this["cScale" + e]);
    for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
      this.darkMode ? this["cScalePeer" + e] = this["cScalePeer" + e] || F(this["cScale" + e], 10) : this["cScalePeer" + e] = this["cScalePeer" + e] || A(this["cScale" + e], 10);
    this.scaleLabelColor = this.scaleLabelColor || (this.darkMode ? "black" : this.labelTextColor), this.cScaleLabel0 = this.cScaleLabel0 || this.cScale1, this.cScaleLabel2 = this.cScaleLabel2 || this.cScale1;
    for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
      this["cScaleLabel" + e] = this["cScaleLabel" + e] || this.scaleLabelColor;
    for (let e = 0; e < 5; e++)
      this["surface" + e] = this["surface" + e] || d(this.mainBkg, { l: -(5 + e * 5) }), this["surfacePeer" + e] = this["surfacePeer" + e] || d(this.mainBkg, { l: -(8 + e * 5) });
    this.nodeBkg = this.mainBkg, this.nodeBorder = this.border1, this.clusterBkg = this.secondBkg, this.clusterBorder = this.border2, this.defaultLinkColor = this.lineColor, this.titleColor = this.text, this.sectionBkgColor = F(this.contrast, 30), this.sectionBkgColor2 = F(this.contrast, 30), this.taskBorderColor = A(this.contrast, 10), this.taskBkgColor = this.contrast, this.taskTextColor = this.taskTextLightColor, this.taskTextDarkColor = this.text, this.taskTextOutsideColor = this.taskTextDarkColor, this.activeTaskBorderColor = this.taskBorderColor, this.activeTaskBkgColor = this.mainBkg, this.gridColor = F(this.border1, 30), this.doneTaskBkgColor = this.done, this.doneTaskBorderColor = this.lineColor, this.critBkgColor = this.critical, this.critBorderColor = A(this.critBkgColor, 10), this.todayLineColor = this.critBkgColor, this.transitionColor = this.transitionColor || "#000", this.transitionLabelColor = this.transitionLabelColor || this.textColor, this.stateLabelColor = this.stateLabelColor || this.stateBkg || this.primaryTextColor, this.stateBkg = this.stateBkg || this.mainBkg, this.labelBackgroundColor = this.labelBackgroundColor || this.stateBkg, this.compositeBackground = this.compositeBackground || this.background || this.tertiaryColor, this.altBackground = this.altBackground || "#f4f4f4", this.compositeTitleBackground = this.compositeTitleBackground || this.mainBkg, this.stateBorder = this.stateBorder || "#000", this.innerEndBackground = this.primaryBorderColor, this.specialStateColor = "#222", this.errorBkgColor = this.errorBkgColor || this.tertiaryColor, this.errorTextColor = this.errorTextColor || this.tertiaryTextColor, this.classText = this.primaryTextColor, this.fillType0 = this.primaryColor, this.fillType1 = this.secondaryColor, this.fillType2 = d(this.primaryColor, { h: 64 }), this.fillType3 = d(this.secondaryColor, { h: 64 }), this.fillType4 = d(this.primaryColor, { h: -64 }), this.fillType5 = d(this.secondaryColor, { h: -64 }), this.fillType6 = d(this.primaryColor, { h: 128 }), this.fillType7 = d(this.secondaryColor, { h: 128 });
    for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
      this["pie" + e] = this["cScale" + e];
    this.pie12 = this.pie0, this.pieTitleTextSize = this.pieTitleTextSize || "25px", this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor, this.pieSectionTextSize = this.pieSectionTextSize || "17px", this.pieSectionTextColor = this.pieSectionTextColor || this.textColor, this.pieLegendTextSize = this.pieLegendTextSize || "17px", this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor, this.pieStrokeColor = this.pieStrokeColor || "black", this.pieStrokeWidth = this.pieStrokeWidth || "2px", this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || "2px", this.pieOuterStrokeColor = this.pieOuterStrokeColor || "black", this.pieOpacity = this.pieOpacity || "0.7", this.quadrant1Fill = this.quadrant1Fill || this.primaryColor, this.quadrant2Fill = this.quadrant2Fill || d(this.primaryColor, { r: 5, g: 5, b: 5 }), this.quadrant3Fill = this.quadrant3Fill || d(this.primaryColor, { r: 10, g: 10, b: 10 }), this.quadrant4Fill = this.quadrant4Fill || d(this.primaryColor, { r: 15, g: 15, b: 15 }), this.quadrant1TextFill = this.quadrant1TextFill || this.primaryTextColor, this.quadrant2TextFill = this.quadrant2TextFill || d(this.primaryTextColor, { r: -5, g: -5, b: -5 }), this.quadrant3TextFill = this.quadrant3TextFill || d(this.primaryTextColor, { r: -10, g: -10, b: -10 }), this.quadrant4TextFill = this.quadrant4TextFill || d(this.primaryTextColor, { r: -15, g: -15, b: -15 }), this.quadrantPointFill = this.quadrantPointFill || ci(this.quadrant1Fill) ? F(this.quadrant1Fill) : A(this.quadrant1Fill), this.quadrantPointTextFill = this.quadrantPointTextFill || this.primaryTextColor, this.quadrantXAxisTextFill = this.quadrantXAxisTextFill || this.primaryTextColor, this.quadrantYAxisTextFill = this.quadrantYAxisTextFill || this.primaryTextColor, this.quadrantInternalBorderStrokeFill = this.quadrantInternalBorderStrokeFill || this.primaryBorderColor, this.quadrantExternalBorderStrokeFill = this.quadrantExternalBorderStrokeFill || this.primaryBorderColor, this.quadrantTitleFill = this.quadrantTitleFill || this.primaryTextColor, this.requirementBackground = this.requirementBackground || this.primaryColor, this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor, this.requirementBorderSize = this.requirementBorderSize || "1", this.requirementTextColor = this.requirementTextColor || this.primaryTextColor, this.relationColor = this.relationColor || this.lineColor, this.relationLabelBackground = this.relationLabelBackground || this.edgeLabelBackground, this.relationLabelColor = this.relationLabelColor || this.actorTextColor, this.git0 = A(this.pie1, 25) || this.primaryColor, this.git1 = this.pie2 || this.secondaryColor, this.git2 = this.pie3 || this.tertiaryColor, this.git3 = this.pie4 || d(this.primaryColor, { h: -30 }), this.git4 = this.pie5 || d(this.primaryColor, { h: -60 }), this.git5 = this.pie6 || d(this.primaryColor, { h: -90 }), this.git6 = this.pie7 || d(this.primaryColor, { h: 60 }), this.git7 = this.pie8 || d(this.primaryColor, { h: 120 }), this.gitInv0 = this.gitInv0 || C(this.git0), this.gitInv1 = this.gitInv1 || C(this.git1), this.gitInv2 = this.gitInv2 || C(this.git2), this.gitInv3 = this.gitInv3 || C(this.git3), this.gitInv4 = this.gitInv4 || C(this.git4), this.gitInv5 = this.gitInv5 || C(this.git5), this.gitInv6 = this.gitInv6 || C(this.git6), this.gitInv7 = this.gitInv7 || C(this.git7), this.branchLabelColor = this.branchLabelColor || this.labelTextColor, this.gitBranchLabel0 = this.branchLabelColor, this.gitBranchLabel1 = "white", this.gitBranchLabel2 = this.branchLabelColor, this.gitBranchLabel3 = "white", this.gitBranchLabel4 = this.branchLabelColor, this.gitBranchLabel5 = this.branchLabelColor, this.gitBranchLabel6 = this.branchLabelColor, this.gitBranchLabel7 = this.branchLabelColor, this.tagLabelColor = this.tagLabelColor || this.primaryTextColor, this.tagLabelBackground = this.tagLabelBackground || this.primaryColor, this.tagLabelBorder = this.tagBorder || this.primaryBorderColor, this.tagLabelFontSize = this.tagLabelFontSize || "10px", this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor, this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor, this.commitLabelFontSize = this.commitLabelFontSize || "10px", this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || _r, this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || yr;
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
const yp = (t) => {
  const e = new _p();
  return e.calculate(t), e;
}, Ut = {
  base: {
    getThemeVariables: cp
  },
  dark: {
    getThemeVariables: fp
  },
  default: {
    getThemeVariables: pp
  },
  forest: {
    getThemeVariables: mp
  },
  neutral: {
    getThemeVariables: yp
  }
}, Zt = {
  flowchart: {
    useMaxWidth: !0,
    titleTopMargin: 25,
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
  theme: "default",
  maxTextSize: 5e4,
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
    "maxTextSize"
  ],
  deterministicIds: !1,
  fontSize: 16
}, Ba = {
  ...Zt,
  // Set, even though they're `undefined` so that `configKeys` finds these keys
  // TODO: Should we replace these with `null` so that they can go in the JSON Schema?
  deterministicIDSeed: void 0,
  themeCSS: void 0,
  // add non-JSON default config values
  themeVariables: Ut.default.getThemeVariables(),
  sequence: {
    ...Zt.sequence,
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
    ...Zt.gantt,
    tickInterval: void 0,
    useWidth: void 0
    // can probably be removed since `configKeys` already includes this
  },
  c4: {
    ...Zt.c4,
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
    ...Zt.pie,
    useWidth: 984
  },
  requirement: {
    ...Zt.requirement,
    useWidth: void 0
  },
  gitGraph: {
    ...Zt.gitGraph,
    // TODO: This is a temporary override for `gitGraph`, since every other
    //       diagram does have `useMaxWidth`, but instead sets it to `true`.
    //       Should we set this to `true` instead?
    useMaxWidth: !1
  },
  sankey: {
    ...Zt.sankey,
    // this is false, unlike every other diagram (other than gitGraph)
    // TODO: can we make this default to `true` instead?
    useMaxWidth: !1
  }
}, Fa = (t, e = "") => Object.keys(t).reduce((i, r) => Array.isArray(t[r]) ? i : typeof t[r] == "object" && t[r] !== null ? [...i, e + r, ...Fa(t[r], "")] : [...i, e + r], []), Cp = new Set(Fa(Ba, "")), xp = Ba, La = /^-{3}\s*[\n\r](.*?)[\n\r]-{3}\s*[\n\r]+/s, Ii = /%{2}{\s*(?:(\w+)\s*:|(\w+))\s*(?:(\w+)|((?:(?!}%{2}).|\r?\n)*))?\s*(?:}%{2})?/gi, bp = /\s*%%.*\n/gm;
class Aa extends Error {
  constructor(e) {
    super(e), this.name = "UnknownDiagramError";
  }
}
const Ee = {}, Cr = function(t, e) {
  t = t.replace(La, "").replace(Ii, "").replace(bp, `
`);
  for (const [i, { detector: r }] of Object.entries(Ee))
    if (r(t, e))
      return i;
  throw new Aa(
    `No diagram type detected matching given configuration for text: ${t}`
  );
}, Ea = (...t) => {
  for (const { id: e, detector: i, loader: r } of t)
    Oa(e, i, r);
}, Oa = (t, e, i) => {
  Ee[t] ? w.error(`Detector with key ${t} already exists`) : Ee[t] = { detector: e, loader: i }, w.debug(`Detector with key ${t} added${i ? " with loader" : ""}`);
}, Tp = (t) => Ee[t].loader, un = (t, e, { depth: i = 2, clobber: r = !1 } = {}) => {
  const n = { depth: i, clobber: r };
  return Array.isArray(e) && !Array.isArray(t) ? (e.forEach((o) => un(t, o, n)), t) : Array.isArray(e) && Array.isArray(t) ? (e.forEach((o) => {
    t.includes(o) || t.push(o);
  }), t) : t === void 0 || i <= 0 ? t != null && typeof t == "object" && typeof e == "object" ? Object.assign(t, e) : e : (e !== void 0 && typeof t == "object" && typeof e == "object" && Object.keys(e).forEach((o) => {
    typeof e[o] == "object" && (t[o] === void 0 || typeof t[o] == "object") ? (t[o] === void 0 && (t[o] = Array.isArray(e[o]) ? [] : {}), t[o] = un(t[o], e[o], { depth: i - 1, clobber: r })) : (r || typeof t[o] != "object" && typeof e[o] != "object") && (t[o] = e[o]);
  }), t);
}, nt = un;
var Sp = typeof global == "object" && global && global.Object === Object && global;
const Ma = Sp;
var vp = typeof self == "object" && self && self.Object === Object && self, kp = Ma || vp || Function("return this")();
const Dt = kp;
var wp = Dt.Symbol;
const Ki = wp;
var $a = Object.prototype, Bp = $a.hasOwnProperty, Fp = $a.toString, We = Ki ? Ki.toStringTag : void 0;
function Lp(t) {
  var e = Bp.call(t, We), i = t[We];
  try {
    t[We] = void 0;
    var r = !0;
  } catch {
  }
  var n = Fp.call(t);
  return r && (e ? t[We] = i : delete t[We]), n;
}
var Ap = Object.prototype, Ep = Ap.toString;
function Op(t) {
  return Ep.call(t);
}
var Mp = "[object Null]", $p = "[object Undefined]", Ko = Ki ? Ki.toStringTag : void 0;
function Ie(t) {
  return t == null ? t === void 0 ? $p : Mp : Ko && Ko in Object(t) ? Lp(t) : Op(t);
}
function me(t) {
  var e = typeof t;
  return t != null && (e == "object" || e == "function");
}
var Ip = "[object AsyncFunction]", Dp = "[object Function]", Np = "[object GeneratorFunction]", Rp = "[object Proxy]";
function Pn(t) {
  if (!me(t))
    return !1;
  var e = Ie(t);
  return e == Dp || e == Np || e == Ip || e == Rp;
}
var Pp = Dt["__core-js_shared__"];
const Gr = Pp;
var Zo = function() {
  var t = /[^.]+$/.exec(Gr && Gr.keys && Gr.keys.IE_PROTO || "");
  return t ? "Symbol(src)_1." + t : "";
}();
function qp(t) {
  return !!Zo && Zo in t;
}
var zp = Function.prototype, Wp = zp.toString;
function _e(t) {
  if (t != null) {
    try {
      return Wp.call(t);
    } catch {
    }
    try {
      return t + "";
    } catch {
    }
  }
  return "";
}
var Hp = /[\\^$.*+?()[\]{}|]/g, jp = /^\[object .+?Constructor\]$/, Up = Function.prototype, Yp = Object.prototype, Gp = Up.toString, Vp = Yp.hasOwnProperty, Xp = RegExp(
  "^" + Gp.call(Vp).replace(Hp, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Kp(t) {
  if (!me(t) || qp(t))
    return !1;
  var e = Pn(t) ? Xp : jp;
  return e.test(_e(t));
}
function Zp(t, e) {
  return t == null ? void 0 : t[e];
}
function ye(t, e) {
  var i = Zp(t, e);
  return Kp(i) ? i : void 0;
}
var Jp = ye(Object, "create");
const ei = Jp;
function Qp() {
  this.__data__ = ei ? ei(null) : {}, this.size = 0;
}
function tg(t) {
  var e = this.has(t) && delete this.__data__[t];
  return this.size -= e ? 1 : 0, e;
}
var eg = "__lodash_hash_undefined__", ig = Object.prototype, rg = ig.hasOwnProperty;
function ng(t) {
  var e = this.__data__;
  if (ei) {
    var i = e[t];
    return i === eg ? void 0 : i;
  }
  return rg.call(e, t) ? e[t] : void 0;
}
var og = Object.prototype, sg = og.hasOwnProperty;
function ag(t) {
  var e = this.__data__;
  return ei ? e[t] !== void 0 : sg.call(e, t);
}
var lg = "__lodash_hash_undefined__";
function hg(t, e) {
  var i = this.__data__;
  return this.size += this.has(t) ? 0 : 1, i[t] = ei && e === void 0 ? lg : e, this;
}
function pe(t) {
  var e = -1, i = t == null ? 0 : t.length;
  for (this.clear(); ++e < i; ) {
    var r = t[e];
    this.set(r[0], r[1]);
  }
}
pe.prototype.clear = Qp;
pe.prototype.delete = tg;
pe.prototype.get = ng;
pe.prototype.has = ag;
pe.prototype.set = hg;
function cg() {
  this.__data__ = [], this.size = 0;
}
function xr(t, e) {
  return t === e || t !== t && e !== e;
}
function br(t, e) {
  for (var i = t.length; i--; )
    if (xr(t[i][0], e))
      return i;
  return -1;
}
var ug = Array.prototype, fg = ug.splice;
function dg(t) {
  var e = this.__data__, i = br(e, t);
  if (i < 0)
    return !1;
  var r = e.length - 1;
  return i == r ? e.pop() : fg.call(e, i, 1), --this.size, !0;
}
function pg(t) {
  var e = this.__data__, i = br(e, t);
  return i < 0 ? void 0 : e[i][1];
}
function gg(t) {
  return br(this.__data__, t) > -1;
}
function mg(t, e) {
  var i = this.__data__, r = br(i, t);
  return r < 0 ? (++this.size, i.push([t, e])) : i[r][1] = e, this;
}
function Gt(t) {
  var e = -1, i = t == null ? 0 : t.length;
  for (this.clear(); ++e < i; ) {
    var r = t[e];
    this.set(r[0], r[1]);
  }
}
Gt.prototype.clear = cg;
Gt.prototype.delete = dg;
Gt.prototype.get = pg;
Gt.prototype.has = gg;
Gt.prototype.set = mg;
var _g = ye(Dt, "Map");
const ii = _g;
function yg() {
  this.size = 0, this.__data__ = {
    hash: new pe(),
    map: new (ii || Gt)(),
    string: new pe()
  };
}
function Cg(t) {
  var e = typeof t;
  return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? t !== "__proto__" : t === null;
}
function Tr(t, e) {
  var i = t.__data__;
  return Cg(e) ? i[typeof e == "string" ? "string" : "hash"] : i.map;
}
function xg(t) {
  var e = Tr(this, t).delete(t);
  return this.size -= e ? 1 : 0, e;
}
function bg(t) {
  return Tr(this, t).get(t);
}
function Tg(t) {
  return Tr(this, t).has(t);
}
function Sg(t, e) {
  var i = Tr(this, t), r = i.size;
  return i.set(t, e), this.size += i.size == r ? 0 : 1, this;
}
function ne(t) {
  var e = -1, i = t == null ? 0 : t.length;
  for (this.clear(); ++e < i; ) {
    var r = t[e];
    this.set(r[0], r[1]);
  }
}
ne.prototype.clear = yg;
ne.prototype.delete = xg;
ne.prototype.get = bg;
ne.prototype.has = Tg;
ne.prototype.set = Sg;
var vg = "Expected a function";
function ui(t, e) {
  if (typeof t != "function" || e != null && typeof e != "function")
    throw new TypeError(vg);
  var i = function() {
    var r = arguments, n = e ? e.apply(this, r) : r[0], o = i.cache;
    if (o.has(n))
      return o.get(n);
    var s = t.apply(this, r);
    return i.cache = o.set(n, s) || o, s;
  };
  return i.cache = new (ui.Cache || ne)(), i;
}
ui.Cache = ne;
function kg() {
  this.__data__ = new Gt(), this.size = 0;
}
function wg(t) {
  var e = this.__data__, i = e.delete(t);
  return this.size = e.size, i;
}
function Bg(t) {
  return this.__data__.get(t);
}
function Fg(t) {
  return this.__data__.has(t);
}
var Lg = 200;
function Ag(t, e) {
  var i = this.__data__;
  if (i instanceof Gt) {
    var r = i.__data__;
    if (!ii || r.length < Lg - 1)
      return r.push([t, e]), this.size = ++i.size, this;
    i = this.__data__ = new ne(r);
  }
  return i.set(t, e), this.size = i.size, this;
}
function De(t) {
  var e = this.__data__ = new Gt(t);
  this.size = e.size;
}
De.prototype.clear = kg;
De.prototype.delete = wg;
De.prototype.get = Bg;
De.prototype.has = Fg;
De.prototype.set = Ag;
var Eg = function() {
  try {
    var t = ye(Object, "defineProperty");
    return t({}, "", {}), t;
  } catch {
  }
}();
const Zi = Eg;
function qn(t, e, i) {
  e == "__proto__" && Zi ? Zi(t, e, {
    configurable: !0,
    enumerable: !0,
    value: i,
    writable: !0
  }) : t[e] = i;
}
function fn(t, e, i) {
  (i !== void 0 && !xr(t[e], i) || i === void 0 && !(e in t)) && qn(t, e, i);
}
function Og(t) {
  return function(e, i, r) {
    for (var n = -1, o = Object(e), s = r(e), a = s.length; a--; ) {
      var l = s[t ? a : ++n];
      if (i(o[l], l, o) === !1)
        break;
    }
    return e;
  };
}
var Mg = Og();
const $g = Mg;
var Ia = typeof exports == "object" && exports && !exports.nodeType && exports, Jo = Ia && typeof module == "object" && module && !module.nodeType && module, Ig = Jo && Jo.exports === Ia, Qo = Ig ? Dt.Buffer : void 0, ts = Qo ? Qo.allocUnsafe : void 0;
function Dg(t, e) {
  if (e)
    return t.slice();
  var i = t.length, r = ts ? ts(i) : new t.constructor(i);
  return t.copy(r), r;
}
var Ng = Dt.Uint8Array;
const es = Ng;
function Rg(t) {
  var e = new t.constructor(t.byteLength);
  return new es(e).set(new es(t)), e;
}
function Pg(t, e) {
  var i = e ? Rg(t.buffer) : t.buffer;
  return new t.constructor(i, t.byteOffset, t.length);
}
function qg(t, e) {
  var i = -1, r = t.length;
  for (e || (e = Array(r)); ++i < r; )
    e[i] = t[i];
  return e;
}
var is = Object.create, zg = function() {
  function t() {
  }
  return function(e) {
    if (!me(e))
      return {};
    if (is)
      return is(e);
    t.prototype = e;
    var i = new t();
    return t.prototype = void 0, i;
  };
}();
const Wg = zg;
function Da(t, e) {
  return function(i) {
    return t(e(i));
  };
}
var Hg = Da(Object.getPrototypeOf, Object);
const Na = Hg;
var jg = Object.prototype;
function Sr(t) {
  var e = t && t.constructor, i = typeof e == "function" && e.prototype || jg;
  return t === i;
}
function Ug(t) {
  return typeof t.constructor == "function" && !Sr(t) ? Wg(Na(t)) : {};
}
function fi(t) {
  return t != null && typeof t == "object";
}
var Yg = "[object Arguments]";
function rs(t) {
  return fi(t) && Ie(t) == Yg;
}
var Ra = Object.prototype, Gg = Ra.hasOwnProperty, Vg = Ra.propertyIsEnumerable, Xg = rs(function() {
  return arguments;
}()) ? rs : function(t) {
  return fi(t) && Gg.call(t, "callee") && !Vg.call(t, "callee");
};
const Ji = Xg;
var Kg = Array.isArray;
const Qi = Kg;
var Zg = 9007199254740991;
function Pa(t) {
  return typeof t == "number" && t > -1 && t % 1 == 0 && t <= Zg;
}
function vr(t) {
  return t != null && Pa(t.length) && !Pn(t);
}
function Jg(t) {
  return fi(t) && vr(t);
}
function Qg() {
  return !1;
}
var qa = typeof exports == "object" && exports && !exports.nodeType && exports, ns = qa && typeof module == "object" && module && !module.nodeType && module, t0 = ns && ns.exports === qa, os = t0 ? Dt.Buffer : void 0, e0 = os ? os.isBuffer : void 0, i0 = e0 || Qg;
const zn = i0;
var r0 = "[object Object]", n0 = Function.prototype, o0 = Object.prototype, za = n0.toString, s0 = o0.hasOwnProperty, a0 = za.call(Object);
function l0(t) {
  if (!fi(t) || Ie(t) != r0)
    return !1;
  var e = Na(t);
  if (e === null)
    return !0;
  var i = s0.call(e, "constructor") && e.constructor;
  return typeof i == "function" && i instanceof i && za.call(i) == a0;
}
var h0 = "[object Arguments]", c0 = "[object Array]", u0 = "[object Boolean]", f0 = "[object Date]", d0 = "[object Error]", p0 = "[object Function]", g0 = "[object Map]", m0 = "[object Number]", _0 = "[object Object]", y0 = "[object RegExp]", C0 = "[object Set]", x0 = "[object String]", b0 = "[object WeakMap]", T0 = "[object ArrayBuffer]", S0 = "[object DataView]", v0 = "[object Float32Array]", k0 = "[object Float64Array]", w0 = "[object Int8Array]", B0 = "[object Int16Array]", F0 = "[object Int32Array]", L0 = "[object Uint8Array]", A0 = "[object Uint8ClampedArray]", E0 = "[object Uint16Array]", O0 = "[object Uint32Array]", Y = {};
Y[v0] = Y[k0] = Y[w0] = Y[B0] = Y[F0] = Y[L0] = Y[A0] = Y[E0] = Y[O0] = !0;
Y[h0] = Y[c0] = Y[T0] = Y[u0] = Y[S0] = Y[f0] = Y[d0] = Y[p0] = Y[g0] = Y[m0] = Y[_0] = Y[y0] = Y[C0] = Y[x0] = Y[b0] = !1;
function M0(t) {
  return fi(t) && Pa(t.length) && !!Y[Ie(t)];
}
function $0(t) {
  return function(e) {
    return t(e);
  };
}
var Wa = typeof exports == "object" && exports && !exports.nodeType && exports, Ve = Wa && typeof module == "object" && module && !module.nodeType && module, I0 = Ve && Ve.exports === Wa, Vr = I0 && Ma.process, D0 = function() {
  try {
    var t = Ve && Ve.require && Ve.require("util").types;
    return t || Vr && Vr.binding && Vr.binding("util");
  } catch {
  }
}();
const ss = D0;
var as = ss && ss.isTypedArray, N0 = as ? $0(as) : M0;
const Wn = N0;
function dn(t, e) {
  if (!(e === "constructor" && typeof t[e] == "function") && e != "__proto__")
    return t[e];
}
var R0 = Object.prototype, P0 = R0.hasOwnProperty;
function q0(t, e, i) {
  var r = t[e];
  (!(P0.call(t, e) && xr(r, i)) || i === void 0 && !(e in t)) && qn(t, e, i);
}
function z0(t, e, i, r) {
  var n = !i;
  i || (i = {});
  for (var o = -1, s = e.length; ++o < s; ) {
    var a = e[o], l = r ? r(i[a], t[a], a, i, t) : void 0;
    l === void 0 && (l = t[a]), n ? qn(i, a, l) : q0(i, a, l);
  }
  return i;
}
function W0(t, e) {
  for (var i = -1, r = Array(t); ++i < t; )
    r[i] = e(i);
  return r;
}
var H0 = 9007199254740991, j0 = /^(?:0|[1-9]\d*)$/;
function Ha(t, e) {
  var i = typeof t;
  return e = e ?? H0, !!e && (i == "number" || i != "symbol" && j0.test(t)) && t > -1 && t % 1 == 0 && t < e;
}
var U0 = Object.prototype, Y0 = U0.hasOwnProperty;
function G0(t, e) {
  var i = Qi(t), r = !i && Ji(t), n = !i && !r && zn(t), o = !i && !r && !n && Wn(t), s = i || r || n || o, a = s ? W0(t.length, String) : [], l = a.length;
  for (var h in t)
    (e || Y0.call(t, h)) && !(s && // Safari 9 has enumerable `arguments.length` in strict mode.
    (h == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    n && (h == "offset" || h == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    o && (h == "buffer" || h == "byteLength" || h == "byteOffset") || // Skip index properties.
    Ha(h, l))) && a.push(h);
  return a;
}
function V0(t) {
  var e = [];
  if (t != null)
    for (var i in Object(t))
      e.push(i);
  return e;
}
var X0 = Object.prototype, K0 = X0.hasOwnProperty;
function Z0(t) {
  if (!me(t))
    return V0(t);
  var e = Sr(t), i = [];
  for (var r in t)
    r == "constructor" && (e || !K0.call(t, r)) || i.push(r);
  return i;
}
function ja(t) {
  return vr(t) ? G0(t, !0) : Z0(t);
}
function J0(t) {
  return z0(t, ja(t));
}
function Q0(t, e, i, r, n, o, s) {
  var a = dn(t, i), l = dn(e, i), h = s.get(l);
  if (h) {
    fn(t, i, h);
    return;
  }
  var c = o ? o(a, l, i + "", t, e, s) : void 0, u = c === void 0;
  if (u) {
    var g = Qi(l), p = !g && zn(l), _ = !g && !p && Wn(l);
    c = l, g || p || _ ? Qi(a) ? c = a : Jg(a) ? c = qg(a) : p ? (u = !1, c = Dg(l, !0)) : _ ? (u = !1, c = Pg(l, !0)) : c = [] : l0(l) || Ji(l) ? (c = a, Ji(a) ? c = J0(a) : (!me(a) || Pn(a)) && (c = Ug(l))) : u = !1;
  }
  u && (s.set(l, c), n(c, l, r, o, s), s.delete(l)), fn(t, i, c);
}
function Ua(t, e, i, r, n) {
  t !== e && $g(e, function(o, s) {
    if (n || (n = new De()), me(o))
      Q0(t, e, s, i, Ua, r, n);
    else {
      var a = r ? r(dn(t, s), o, s + "", t, e, n) : void 0;
      a === void 0 && (a = o), fn(t, s, a);
    }
  }, ja);
}
function Ya(t) {
  return t;
}
function tm(t, e, i) {
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
var ls = Math.max;
function em(t, e, i) {
  return e = ls(e === void 0 ? t.length - 1 : e, 0), function() {
    for (var r = arguments, n = -1, o = ls(r.length - e, 0), s = Array(o); ++n < o; )
      s[n] = r[e + n];
    n = -1;
    for (var a = Array(e + 1); ++n < e; )
      a[n] = r[n];
    return a[e] = i(s), tm(t, this, a);
  };
}
function im(t) {
  return function() {
    return t;
  };
}
var rm = Zi ? function(t, e) {
  return Zi(t, "toString", {
    configurable: !0,
    enumerable: !1,
    value: im(e),
    writable: !0
  });
} : Ya;
const nm = rm;
var om = 800, sm = 16, am = Date.now;
function lm(t) {
  var e = 0, i = 0;
  return function() {
    var r = am(), n = sm - (r - i);
    if (i = r, n > 0) {
      if (++e >= om)
        return arguments[0];
    } else
      e = 0;
    return t.apply(void 0, arguments);
  };
}
var hm = lm(nm);
const cm = hm;
function um(t, e) {
  return cm(em(t, e, Ya), t + "");
}
function fm(t, e, i) {
  if (!me(i))
    return !1;
  var r = typeof e;
  return (r == "number" ? vr(i) && Ha(e, i.length) : r == "string" && e in i) ? xr(i[e], t) : !1;
}
function dm(t) {
  return um(function(e, i) {
    var r = -1, n = i.length, o = n > 1 ? i[n - 1] : void 0, s = n > 2 ? i[2] : void 0;
    for (o = t.length > 3 && typeof o == "function" ? (n--, o) : void 0, s && fm(i[0], i[1], s) && (o = n < 3 ? void 0 : o, n = 1), e = Object(e); ++r < n; ) {
      var a = i[r];
      a && t(e, a, r, o);
    }
    return e;
  });
}
var pm = dm(function(t, e, i) {
  Ua(t, e, i);
});
const gm = pm, mm = "​", _m = {
  curveBasis: Uf,
  curveBasisClosed: Yf,
  curveBasisOpen: Gf,
  curveBumpX: Hf,
  curveBumpY: jf,
  curveBundle: Vf,
  curveCardinalClosed: Kf,
  curveCardinalOpen: Zf,
  curveCardinal: Xf,
  curveCatmullRomClosed: Qf,
  curveCatmullRomOpen: td,
  curveCatmullRom: Jf,
  curveLinear: Wf,
  curveLinearClosed: ed,
  curveMonotoneX: id,
  curveMonotoneY: rd,
  curveNatural: nd,
  curveStep: od,
  curveStepAfter: ad,
  curveStepBefore: sd
}, ym = /\s*(?:(\w+)(?=:):|(\w+))\s*(?:(\w+)|((?:(?!}%{2}).|\r?\n)*))?\s*(?:}%{2})?/gi, Cm = function(t, e) {
  const i = Ga(t, /(?:init\b)|(?:initialize\b)/);
  let r = {};
  if (Array.isArray(i)) {
    const o = i.map((s) => s.args);
    ri(o), r = nt(r, [...o]);
  } else
    r = i.args;
  if (!r)
    return;
  let n = Cr(t, e);
  return ["config"].forEach((o) => {
    r[o] !== void 0 && (n === "flowchart-v2" && (n = "flowchart"), r[n] = r[o], delete r[o]);
  }), r;
}, Ga = function(t, e = null) {
  try {
    const i = new RegExp(
      `[%]{2}(?![{]${ym.source})(?=[}][%]{2}).*
`,
      "ig"
    );
    t = t.trim().replace(i, "").replace(/'/gm, '"'), w.debug(
      `Detecting diagram directive${e !== null ? " type:" + e : ""} based on the text:${t}`
    );
    let r;
    const n = [];
    for (; (r = Ii.exec(t)) !== null; )
      if (r.index === Ii.lastIndex && Ii.lastIndex++, r && !e || e && r[1] && r[1].match(e) || e && r[2] && r[2].match(e)) {
        const o = r[1] ? r[1] : r[2], s = r[3] ? r[3].trim() : r[4] ? JSON.parse(r[4].trim()) : null;
        n.push({ type: o, args: s });
      }
    return n.length === 0 && n.push({ type: t, args: null }), n.length === 1 ? n[0] : n;
  } catch (i) {
    return w.error(
      `ERROR: ${i.message} - Unable to parse directive
      ${e !== null ? " type:" + e : ""} based on the text:${t}`
    ), { type: null, args: null };
  }
}, xm = function(t, e) {
  for (const [i, r] of e.entries())
    if (r.match(t))
      return i;
  return -1;
};
function bm(t, e) {
  if (!t)
    return e;
  const i = `curve${t.charAt(0).toUpperCase() + t.slice(1)}`;
  return _m[i] || e;
}
function Tm(t, e) {
  const i = t.trim();
  if (i)
    return e.securityLevel !== "loose" ? Es(i) : i;
}
const Sm = (t, ...e) => {
  const i = t.split("."), r = i.length - 1, n = i[r];
  let o = window;
  for (let s = 0; s < r; s++)
    if (o = o[i[s]], !o)
      return;
  o[n](...e);
};
function tr(t, e) {
  return t && e ? Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2)) : 0;
}
function vm(t) {
  let e, i = 0;
  t.forEach((o) => {
    i += tr(o, e), e = o;
  });
  let r = i / 2, n;
  return e = void 0, t.forEach((o) => {
    if (e && !n) {
      const s = tr(o, e);
      if (s < r)
        r -= s;
      else {
        const a = r / s;
        a <= 0 && (n = e), a >= 1 && (n = { x: o.x, y: o.y }), a > 0 && a < 1 && (n = {
          x: (1 - a) * e.x + a * o.x,
          y: (1 - a) * e.y + a * o.y
        });
      }
    }
    e = o;
  }), n;
}
function km(t) {
  return t.length === 1 ? t[0] : vm(t);
}
const wm = (t, e, i) => {
  let r;
  w.info(`our points ${JSON.stringify(e)}`), e[0] !== i && (e = e.reverse());
  let o = 25, s;
  r = void 0, e.forEach((c) => {
    if (r && !s) {
      const u = tr(c, r);
      if (u < o)
        o -= u;
      else {
        const g = o / u;
        g <= 0 && (s = r), g >= 1 && (s = { x: c.x, y: c.y }), g > 0 && g < 1 && (s = {
          x: (1 - g) * r.x + g * c.x,
          y: (1 - g) * r.y + g * c.y
        });
      }
    }
    r = c;
  });
  const a = t ? 10 : 5, l = Math.atan2(e[0].y - s.y, e[0].x - s.x), h = { x: 0, y: 0 };
  return h.x = Math.sin(l) * a + (e[0].x + s.x) / 2, h.y = -Math.cos(l) * a + (e[0].y + s.y) / 2, h;
};
function Bm(t, e, i) {
  let r = JSON.parse(JSON.stringify(i)), n;
  w.info("our points", r), e !== "start_left" && e !== "start_right" && (r = r.reverse()), r.forEach((u) => {
    n = u;
  });
  let s = 25 + t, a;
  n = void 0, r.forEach((u) => {
    if (n && !a) {
      const g = tr(u, n);
      if (g < s)
        s -= g;
      else {
        const p = s / g;
        p <= 0 && (a = n), p >= 1 && (a = { x: u.x, y: u.y }), p > 0 && p < 1 && (a = {
          x: (1 - p) * n.x + p * u.x,
          y: (1 - p) * n.y + p * u.y
        });
      }
    }
    n = u;
  });
  const l = 10 + t * 0.5, h = Math.atan2(r[0].y - a.y, r[0].x - a.x), c = { x: 0, y: 0 };
  return c.x = Math.sin(h) * l + (r[0].x + a.x) / 2, c.y = -Math.cos(h) * l + (r[0].y + a.y) / 2, e === "start_left" && (c.x = Math.sin(h + Math.PI) * l + (r[0].x + a.x) / 2, c.y = -Math.cos(h + Math.PI) * l + (r[0].y + a.y) / 2), e === "end_right" && (c.x = Math.sin(h - Math.PI) * l + (r[0].x + a.x) / 2 - 5, c.y = -Math.cos(h - Math.PI) * l + (r[0].y + a.y) / 2 - 5), e === "end_left" && (c.x = Math.sin(h) * l + (r[0].x + a.x) / 2 - 5, c.y = -Math.cos(h) * l + (r[0].y + a.y) / 2 - 5), c;
}
function Fm(t) {
  let e = "", i = "";
  for (const r of t)
    r !== void 0 && (r.startsWith("color:") || r.startsWith("text-align:") ? i = i + r + ";" : e = e + r + ";");
  return { style: e, labelStyle: i };
}
let hs = 0;
const Lm = () => (hs++, "id-" + Math.random().toString(36).substr(2, 12) + "-" + hs);
function Am(t) {
  let e = "";
  const i = "0123456789abcdef", r = i.length;
  for (let n = 0; n < t; n++)
    e += i.charAt(Math.floor(Math.random() * r));
  return e;
}
const Em = (t) => Am(t.length), Om = function() {
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
    valign: void 0
  };
}, Mm = function(t, e) {
  const i = e.text.replace(Rn.lineBreakRegex, " "), [, r] = jn(e.fontSize), n = t.append("text");
  n.attr("x", e.x), n.attr("y", e.y), n.style("text-anchor", e.anchor), n.style("font-family", e.fontFamily), n.style("font-size", r), n.style("font-weight", e.fontWeight), n.attr("fill", e.fill), e.class !== void 0 && n.attr("class", e.class);
  const o = n.append("tspan");
  return o.attr("x", e.x + e.textMargin * 2), o.attr("fill", e.fill), o.text(i), n;
}, $m = ui(
  (t, e, i) => {
    if (!t || (i = Object.assign(
      { fontSize: 12, fontWeight: 400, fontFamily: "Arial", joinWith: "<br/>" },
      i
    ), Rn.lineBreakRegex.test(t)))
      return t;
    const r = t.split(" "), n = [];
    let o = "";
    return r.forEach((s, a) => {
      const l = er(`${s} `, i), h = er(o, i);
      if (l > e) {
        const { hyphenatedStrings: g, remainingWord: p } = Im(s, e, "-", i);
        n.push(o, ...g), o = p;
      } else
        h + l >= e ? (n.push(o), o = s) : o = [o, s].filter(Boolean).join(" ");
      a + 1 === r.length && n.push(o);
    }), n.filter((s) => s !== "").join(i.joinWith);
  },
  (t, e, i) => `${t}${e}${i.fontSize}${i.fontWeight}${i.fontFamily}${i.joinWith}`
), Im = ui(
  (t, e, i = "-", r) => {
    r = Object.assign(
      { fontSize: 12, fontWeight: 400, fontFamily: "Arial", margin: 0 },
      r
    );
    const n = [...t], o = [];
    let s = "";
    return n.forEach((a, l) => {
      const h = `${s}${a}`;
      if (er(h, r) >= e) {
        const u = l + 1, g = n.length === u, p = `${h}${i}`;
        o.push(g ? h : p), s = "";
      } else
        s = h;
    }), { hyphenatedStrings: o, remainingWord: s };
  },
  (t, e, i = "-", r) => `${t}${e}${i}${r.fontSize}${r.fontWeight}${r.fontFamily}`
);
function Dm(t, e) {
  return e = Object.assign(
    { fontSize: 12, fontWeight: 400, fontFamily: "Arial", margin: 15 },
    e
  ), Hn(t, e).height;
}
function er(t, e) {
  return e = Object.assign({ fontSize: 12, fontWeight: 400, fontFamily: "Arial" }, e), Hn(t, e).width;
}
const Hn = ui(
  (t, e) => {
    e = Object.assign({ fontSize: 12, fontWeight: 400, fontFamily: "Arial" }, e);
    const { fontSize: i, fontFamily: r, fontWeight: n } = e;
    if (!t)
      return { width: 0, height: 0 };
    const [, o] = jn(i), s = ["sans-serif", r], a = t.split(Rn.lineBreakRegex), l = [], h = Ct("body");
    if (!h.remove)
      return { width: 0, height: 0, lineHeight: 0 };
    const c = h.append("svg");
    for (const g of s) {
      let p = 0;
      const _ = { width: 0, height: 0, lineHeight: 0 };
      for (const v of a) {
        const O = Om();
        O.text = v || mm;
        const P = Mm(c, O).style("font-size", o).style("font-weight", n).style("font-family", g), S = (P._groups || P)[0][0].getBBox();
        if (S.width === 0 && S.height === 0)
          throw new Error("svg element not in render tree");
        _.width = Math.round(Math.max(_.width, S.width)), p = Math.round(S.height), _.height += p, _.lineHeight = Math.round(Math.max(_.lineHeight, p));
      }
      l.push(_);
    }
    c.remove();
    const u = isNaN(l[1].height) || isNaN(l[1].width) || isNaN(l[1].lineHeight) || l[0].height > l[1].height && l[0].width > l[1].width && l[0].lineHeight > l[1].lineHeight ? 0 : 1;
    return l[u];
  },
  (t, e) => `${t}${e.fontSize}${e.fontWeight}${e.fontFamily}`
), Nm = class {
  constructor(e, i) {
    this.deterministic = e, this.seed = i, this.count = i ? i.length : 0;
  }
  next() {
    return this.deterministic ? this.count++ : Date.now();
  }
};
let wi;
const Rm = function(t) {
  return wi = wi || document.createElement("div"), t = escape(t).replace(/%26/g, "&").replace(/%23/g, "#").replace(/%3B/g, ";"), wi.innerHTML = t, unescape(wi.textContent);
}, ri = (t) => {
  if (w.debug("sanitizeDirective called with", t), !(typeof t != "object" || t == null)) {
    if (Array.isArray(t)) {
      t.forEach((e) => ri(e));
      return;
    }
    for (const e of Object.keys(t)) {
      if (w.debug("Checking key", e), e.startsWith("__") || e.includes("proto") || e.includes("constr") || !Cp.has(e) || t[e] == null) {
        w.debug("sanitize deleting key: ", e), delete t[e];
        continue;
      }
      if (typeof t[e] == "object") {
        w.debug("sanitizing object", e), ri(t[e]);
        continue;
      }
      const i = ["themeCSS", "fontFamily", "altFontFamily"];
      for (const r of i)
        e.includes(r) && (w.debug("sanitizing css option", e), t[e] = Va(t[e]));
    }
    if (t.themeVariables)
      for (const e of Object.keys(t.themeVariables)) {
        const i = t.themeVariables[e];
        i != null && i.match && !i.match(/^[\d "#%(),.;A-Za-z]+$/) && (t.themeVariables[e] = "");
      }
    w.debug("After sanitization", t);
  }
}, Va = (t) => {
  let e = 0, i = 0;
  for (const r of t) {
    if (e < i)
      return "{ /* ERROR: Unbalanced CSS */ }";
    r === "{" ? e++ : r === "}" && i++;
  }
  return e !== i ? "{ /* ERROR: Unbalanced CSS */ }" : t;
};
function Xa(t) {
  return "str" in t;
}
const Pm = (t, e, i, r) => {
  if (!r)
    return;
  const n = t.node().getBBox();
  t.append("text").text(r).attr("x", n.x + n.width / 2).attr("y", -i).attr("class", e);
}, jn = (t) => {
  if (typeof t == "number")
    return [t, t + "px"];
  const e = parseInt(t, 10);
  return Number.isNaN(e) ? [void 0, void 0] : t === String(e) ? [e, t + "px"] : [e, t];
};
function qm(t, e) {
  return gm({}, t, e);
}
const Di = {
  assignWithDepth: nt,
  wrapLabel: $m,
  calculateTextHeight: Dm,
  calculateTextWidth: er,
  calculateTextDimensions: Hn,
  cleanAndMerge: qm,
  detectInit: Cm,
  detectDirective: Ga,
  isSubstringInArray: xm,
  interpolateToCurve: bm,
  calcLabelPosition: km,
  calcCardinalityPosition: wm,
  calcTerminalLabelPosition: Bm,
  formatUrl: Tm,
  getStylesFromArray: Fm,
  generateId: Lm,
  random: Em,
  runFunc: Sm,
  entityDecode: Rm,
  initIdGenerator: Nm,
  sanitizeDirective: ri,
  sanitizeCss: Va,
  insertTitle: Pm,
  parseFontSize: jn
};
var Ka = "comm", Za = "rule", Ja = "decl", zm = "@import", Wm = "@keyframes", Hm = Math.abs, Un = String.fromCharCode;
function Qa(t) {
  return t.trim();
}
function pn(t, e, i) {
  return t.replace(e, i);
}
function jm(t, e) {
  return t.indexOf(e);
}
function ni(t, e) {
  return t.charCodeAt(e) | 0;
}
function oi(t, e, i) {
  return t.slice(e, i);
}
function te(t) {
  return t.length;
}
function tl(t) {
  return t.length;
}
function Bi(t, e) {
  return e.push(t), t;
}
var kr = 1, Oe = 1, el = 0, Tt = 0, Z = 0, Ne = "";
function Yn(t, e, i, r, n, o, s) {
  return { value: t, root: e, parent: i, type: r, props: n, children: o, line: kr, column: Oe, length: s, return: "" };
}
function Um() {
  return Z;
}
function Ym() {
  return Z = Tt > 0 ? ni(Ne, --Tt) : 0, Oe--, Z === 10 && (Oe = 1, kr--), Z;
}
function wt() {
  return Z = Tt < el ? ni(Ne, Tt++) : 0, Oe++, Z === 10 && (Oe = 1, kr++), Z;
}
function ue() {
  return ni(Ne, Tt);
}
function Ni() {
  return Tt;
}
function wr(t, e) {
  return oi(Ne, t, e);
}
function gn(t) {
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
function Gm(t) {
  return kr = Oe = 1, el = te(Ne = t), Tt = 0, [];
}
function Vm(t) {
  return Ne = "", t;
}
function Xr(t) {
  return Qa(wr(Tt - 1, mn(t === 91 ? t + 2 : t === 40 ? t + 1 : t)));
}
function Xm(t) {
  for (; (Z = ue()) && Z < 33; )
    wt();
  return gn(t) > 2 || gn(Z) > 3 ? "" : " ";
}
function Km(t, e) {
  for (; --e && wt() && !(Z < 48 || Z > 102 || Z > 57 && Z < 65 || Z > 70 && Z < 97); )
    ;
  return wr(t, Ni() + (e < 6 && ue() == 32 && wt() == 32));
}
function mn(t) {
  for (; wt(); )
    switch (Z) {
      case t:
        return Tt;
      case 34:
      case 39:
        t !== 34 && t !== 39 && mn(Z);
        break;
      case 40:
        t === 41 && mn(t);
        break;
      case 92:
        wt();
        break;
    }
  return Tt;
}
function Zm(t, e) {
  for (; wt() && t + Z !== 47 + 10; )
    if (t + Z === 42 + 42 && ue() === 47)
      break;
  return "/*" + wr(e, Tt - 1) + "*" + Un(t === 47 ? t : wt());
}
function Jm(t) {
  for (; !gn(ue()); )
    wt();
  return wr(t, Tt);
}
function Qm(t) {
  return Vm(Ri("", null, null, null, [""], t = Gm(t), 0, [0], t));
}
function Ri(t, e, i, r, n, o, s, a, l) {
  for (var h = 0, c = 0, u = s, g = 0, p = 0, _ = 0, v = 1, O = 1, P = 1, S = 0, z = "", Q = n, X = o, G = r, W = z; O; )
    switch (_ = S, S = wt()) {
      case 40:
        if (_ != 108 && ni(W, u - 1) == 58) {
          jm(W += pn(Xr(S), "&", "&\f"), "&\f") != -1 && (P = -1);
          break;
        }
      case 34:
      case 39:
      case 91:
        W += Xr(S);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        W += Xm(_);
        break;
      case 92:
        W += Km(Ni() - 1, 7);
        continue;
      case 47:
        switch (ue()) {
          case 42:
          case 47:
            Bi(t_(Zm(wt(), Ni()), e, i), l);
            break;
          default:
            W += "/";
        }
        break;
      case 123 * v:
        a[h++] = te(W) * P;
      case 125 * v:
      case 59:
      case 0:
        switch (S) {
          case 0:
          case 125:
            O = 0;
          case 59 + c:
            p > 0 && te(W) - u && Bi(p > 32 ? us(W + ";", r, i, u - 1) : us(pn(W, " ", "") + ";", r, i, u - 2), l);
            break;
          case 59:
            W += ";";
          default:
            if (Bi(G = cs(W, e, i, h, c, n, a, z, Q = [], X = [], u), o), S === 123)
              if (c === 0)
                Ri(W, e, G, G, Q, o, u, a, X);
              else
                switch (g === 99 && ni(W, 3) === 110 ? 100 : g) {
                  case 100:
                  case 109:
                  case 115:
                    Ri(t, G, G, r && Bi(cs(t, G, G, 0, 0, n, a, z, n, Q = [], u), X), n, X, u, a, r ? Q : X);
                    break;
                  default:
                    Ri(W, G, G, G, [""], X, 0, a, X);
                }
        }
        h = c = p = 0, v = P = 1, z = W = "", u = s;
        break;
      case 58:
        u = 1 + te(W), p = _;
      default:
        if (v < 1) {
          if (S == 123)
            --v;
          else if (S == 125 && v++ == 0 && Ym() == 125)
            continue;
        }
        switch (W += Un(S), S * v) {
          case 38:
            P = c > 0 ? 1 : (W += "\f", -1);
            break;
          case 44:
            a[h++] = (te(W) - 1) * P, P = 1;
            break;
          case 64:
            ue() === 45 && (W += Xr(wt())), g = ue(), c = u = te(z = W += Jm(Ni())), S++;
            break;
          case 45:
            _ === 45 && te(W) == 2 && (v = 0);
        }
    }
  return o;
}
function cs(t, e, i, r, n, o, s, a, l, h, c) {
  for (var u = n - 1, g = n === 0 ? o : [""], p = tl(g), _ = 0, v = 0, O = 0; _ < r; ++_)
    for (var P = 0, S = oi(t, u + 1, u = Hm(v = s[_])), z = t; P < p; ++P)
      (z = Qa(v > 0 ? g[P] + " " + S : pn(S, /&\f/g, g[P]))) && (l[O++] = z);
  return Yn(t, e, i, n === 0 ? Za : a, l, h, c);
}
function t_(t, e, i) {
  return Yn(t, e, i, Ka, Un(Um()), oi(t, 2, -2), 0);
}
function us(t, e, i, r) {
  return Yn(t, e, i, Ja, oi(t, 0, r), oi(t, r + 1, -1), r);
}
function _n(t, e) {
  for (var i = "", r = tl(t), n = 0; n < r; n++)
    i += e(t[n], n, t, e) || "";
  return i;
}
function e_(t, e, i, r) {
  switch (t.type) {
    case zm:
    case Ja:
      return t.return = t.return || t.value;
    case Ka:
      return "";
    case Wm:
      return t.return = t.value + "{" + _n(t.children, r) + "}";
    case Za:
      t.value = t.props.join(",");
  }
  return te(i = _n(t.children, r)) ? t.return = t.value + "{" + i + "}" : "";
}
const fs = "10.4.0", si = Object.freeze(xp);
let ut = nt({}, si), il, Me = [], Xe = nt({}, si);
const Br = (t, e) => {
  let i = nt({}, t), r = {};
  for (const n of e)
    nl(n), r = nt(r, n);
  if (i = nt(i, r), r.theme && r.theme in Ut) {
    const n = nt({}, il), o = nt(
      n.themeVariables || {},
      r.themeVariables
    );
    i.theme && i.theme in Ut && (i.themeVariables = Ut[i.theme].getThemeVariables(o));
  }
  return Xe = i, ol(Xe), Xe;
}, i_ = (t) => (ut = nt({}, si), ut = nt(ut, t), t.theme && Ut[t.theme] && (ut.themeVariables = Ut[t.theme].getThemeVariables(t.themeVariables)), Br(ut, Me), ut), r_ = (t) => {
  il = nt({}, t);
}, n_ = (t) => (ut = nt(ut, t), Br(ut, Me), ut), rl = () => nt({}, ut), o_ = (t) => (ol(t), nt(Xe, t), Ft()), Ft = () => nt({}, Xe), nl = (t) => {
  t && (["secure", ...ut.secure ?? []].forEach((e) => {
    Object.hasOwn(t, e) && (w.debug(`Denied attempt to modify a secure key ${e}`, t[e]), delete t[e]);
  }), Object.keys(t).forEach((e) => {
    e.startsWith("__") && delete t[e];
  }), Object.keys(t).forEach((e) => {
    typeof t[e] == "string" && (t[e].includes("<") || t[e].includes(">") || t[e].includes("url(data:")) && delete t[e], typeof t[e] == "object" && nl(t[e]);
  }));
}, ir = (t) => {
  ri(t), t.fontFamily && (!t.themeVariables || !t.themeVariables.fontFamily) && (t.themeVariables = { fontFamily: t.fontFamily }), Me.push(t), Br(ut, Me);
}, rr = (t = ut) => {
  Me = [], Br(t, Me);
}, s_ = {
  LAZY_LOAD_DEPRECATED: "The configuration options lazyLoadedDiagrams and loadExternalDiagramsAtStartup are deprecated. Please use registerExternalDiagrams instead."
}, ds = {}, a_ = (t) => {
  ds[t] || (w.warn(s_[t]), ds[t] = !0);
}, ol = (t) => {
  t && (t.lazyLoadedDiagrams || t.loadExternalDiagramsAtStartup) && a_("LAZY_LOAD_DEPRECATED");
}, sl = "c4", l_ = (t) => /^\s*C4Context|C4Container|C4Component|C4Dynamic|C4Deployment/.test(t), h_ = async () => {
  const { diagram: t } = await import("./c4Diagram-01b08bdc.js");
  return { id: sl, diagram: t };
}, c_ = {
  id: sl,
  detector: l_,
  loader: h_
}, u_ = c_, al = "flowchart", f_ = (t, e) => {
  var i, r;
  return ((i = e == null ? void 0 : e.flowchart) == null ? void 0 : i.defaultRenderer) === "dagre-wrapper" || ((r = e == null ? void 0 : e.flowchart) == null ? void 0 : r.defaultRenderer) === "elk" ? !1 : /^\s*graph/.test(t);
}, d_ = async () => {
  const { diagram: t } = await import("./flowDiagram-5d2b0cd4.js");
  return { id: al, diagram: t };
}, p_ = {
  id: al,
  detector: f_,
  loader: d_
}, g_ = p_, ll = "flowchart-v2", m_ = (t, e) => {
  var i, r, n;
  return ((i = e == null ? void 0 : e.flowchart) == null ? void 0 : i.defaultRenderer) === "dagre-d3" || ((r = e == null ? void 0 : e.flowchart) == null ? void 0 : r.defaultRenderer) === "elk" ? !1 : /^\s*graph/.test(t) && ((n = e == null ? void 0 : e.flowchart) == null ? void 0 : n.defaultRenderer) === "dagre-wrapper" ? !0 : /^\s*flowchart/.test(t);
}, __ = async () => {
  const { diagram: t } = await import("./flowDiagram-v2-c8096018.js");
  return { id: ll, diagram: t };
}, y_ = {
  id: ll,
  detector: m_,
  loader: __
}, C_ = y_, hl = "er", x_ = (t) => /^\s*erDiagram/.test(t), b_ = async () => {
  const { diagram: t } = await import("./erDiagram-9aadf2be.js");
  return { id: hl, diagram: t };
}, T_ = {
  id: hl,
  detector: x_,
  loader: b_
}, S_ = T_, cl = "gitGraph", v_ = (t) => /^\s*gitGraph/.test(t), k_ = async () => {
  const { diagram: t } = await import("./gitGraphDiagram-4c126424.js");
  return { id: cl, diagram: t };
}, w_ = {
  id: cl,
  detector: v_,
  loader: k_
}, B_ = w_, ul = "gantt", F_ = (t) => /^\s*gantt/.test(t), L_ = async () => {
  const { diagram: t } = await import("./ganttDiagram-3d9d1ab4.js");
  return { id: ul, diagram: t };
}, A_ = {
  id: ul,
  detector: F_,
  loader: L_
}, E_ = A_, fl = "info", O_ = (t) => /^\s*info/.test(t), M_ = async () => {
  const { diagram: t } = await import("./infoDiagram-6cbe7c6f.js");
  return { id: fl, diagram: t };
}, $_ = {
  id: fl,
  detector: O_,
  loader: M_
}, dl = "pie", I_ = (t) => /^\s*pie/.test(t), D_ = async () => {
  const { diagram: t } = await import("./pieDiagram-16330908.js");
  return { id: dl, diagram: t };
}, N_ = {
  id: dl,
  detector: I_,
  loader: D_
}, pl = "quadrantChart", R_ = (t) => /^\s*quadrantChart/.test(t), P_ = async () => {
  const { diagram: t } = await import("./quadrantDiagram-6f203608.js");
  return { id: pl, diagram: t };
}, q_ = {
  id: pl,
  detector: R_,
  loader: P_
}, z_ = q_, gl = "requirement", W_ = (t) => /^\s*requirement(Diagram)?/.test(t), H_ = async () => {
  const { diagram: t } = await import("./requirementDiagram-e64784ea.js");
  return { id: gl, diagram: t };
}, j_ = {
  id: gl,
  detector: W_,
  loader: H_
}, U_ = j_, ml = "sequence", Y_ = (t) => /^\s*sequenceDiagram/.test(t), G_ = async () => {
  const { diagram: t } = await import("./sequenceDiagram-b5c34a98.js");
  return { id: ml, diagram: t };
}, V_ = {
  id: ml,
  detector: Y_,
  loader: G_
}, X_ = V_, _l = "class", K_ = (t, e) => {
  var i;
  return ((i = e == null ? void 0 : e.class) == null ? void 0 : i.defaultRenderer) === "dagre-wrapper" ? !1 : /^\s*classDiagram/.test(t);
}, Z_ = async () => {
  const { diagram: t } = await import("./classDiagram-09b02f81.js");
  return { id: _l, diagram: t };
}, J_ = {
  id: _l,
  detector: K_,
  loader: Z_
}, Q_ = J_, yl = "classDiagram", ty = (t, e) => {
  var i;
  return /^\s*classDiagram/.test(t) && ((i = e == null ? void 0 : e.class) == null ? void 0 : i.defaultRenderer) === "dagre-wrapper" ? !0 : /^\s*classDiagram-v2/.test(t);
}, ey = async () => {
  const { diagram: t } = await import("./classDiagram-v2-441552b7.js");
  return { id: yl, diagram: t };
}, iy = {
  id: yl,
  detector: ty,
  loader: ey
}, ry = iy, Cl = "state", ny = (t, e) => {
  var i;
  return ((i = e == null ? void 0 : e.state) == null ? void 0 : i.defaultRenderer) === "dagre-wrapper" ? !1 : /^\s*stateDiagram/.test(t);
}, oy = async () => {
  const { diagram: t } = await import("./stateDiagram-c6f77c62.js");
  return { id: Cl, diagram: t };
}, sy = {
  id: Cl,
  detector: ny,
  loader: oy
}, ay = sy, xl = "stateDiagram", ly = (t, e) => {
  var i;
  return !!(/^\s*stateDiagram-v2/.test(t) || /^\s*stateDiagram/.test(t) && ((i = e == null ? void 0 : e.state) == null ? void 0 : i.defaultRenderer) === "dagre-wrapper");
}, hy = async () => {
  const { diagram: t } = await import("./stateDiagram-v2-7af7da00.js");
  return { id: xl, diagram: t };
}, cy = {
  id: xl,
  detector: ly,
  loader: hy
}, uy = cy, bl = "journey", fy = (t) => /^\s*journey/.test(t), dy = async () => {
  const { diagram: t } = await import("./journeyDiagram-f3c7ca51.js");
  return { id: bl, diagram: t };
}, py = {
  id: bl,
  detector: fy,
  loader: dy
}, gy = py, my = (t) => {
  var n;
  const { securityLevel: e } = Ft();
  let i = Ct("body");
  if (e === "sandbox") {
    const s = ((n = Ct(`#i${t}`).node()) == null ? void 0 : n.contentDocument) ?? document;
    i = Ct(s.body);
  }
  return i.select(`#${t}`);
}, _y = function(t, e) {
  for (let i of e)
    t.attr(i[0], i[1]);
}, yy = function(t, e, i) {
  let r = /* @__PURE__ */ new Map();
  return i ? (r.set("width", "100%"), r.set("style", `max-width: ${e}px;`)) : (r.set("height", t), r.set("width", e)), r;
}, Tl = function(t, e, i, r) {
  const n = yy(e, i, r);
  _y(t, n);
}, Cy = function(t, e, i, r) {
  const n = e.node().getBBox(), o = n.width, s = n.height;
  w.info(`SVG bounds: ${o}x${s}`, n);
  let a = 0, l = 0;
  w.info(`Graph bounds: ${a}x${l}`, t), a = o + i * 2, l = s + i * 2, w.info(`Calculated bounds: ${a}x${l}`), Tl(e, l, a, r);
  const h = `${n.x - i} ${n.y - i} ${n.width + 2 * i} ${n.height + 2 * i}`;
  e.attr("viewBox", h);
}, xy = (t, e, i) => {
  w.debug(`renering svg for syntax error
`);
  const r = my(e);
  r.attr("viewBox", "0 0 2412 512"), Tl(r, 100, 512, !0);
  const n = r.append("g");
  n.append("path").attr("class", "error-icon").attr(
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
}, Sl = { draw: xy }, by = Sl, Ty = {
  db: {},
  renderer: Sl,
  parser: {
    parser: { yy: {} },
    parse: () => {
    }
  }
}, Sy = Ty, vl = "flowchart-elk", vy = (t, e) => {
  var i;
  return (
    // If diagram explicitly states flowchart-elk
    !!(/^\s*flowchart-elk/.test(t) || // If a flowchart/graph diagram has their default renderer set to elk
    /^\s*flowchart|graph/.test(t) && ((i = e == null ? void 0 : e.flowchart) == null ? void 0 : i.defaultRenderer) === "elk")
  );
}, ky = async () => {
  const { diagram: t } = await import("./flowchart-elk-definition-32a627c1.js");
  return { id: vl, diagram: t };
}, wy = {
  id: vl,
  detector: vy,
  loader: ky
}, By = wy, kl = "timeline", Fy = (t) => /^\s*timeline/.test(t), Ly = async () => {
  const { diagram: t } = await import("./timeline-definition-e6c31e7d.js");
  return { id: kl, diagram: t };
}, Ay = {
  id: kl,
  detector: Fy,
  loader: Ly
}, Ey = Ay, wl = "mindmap", Oy = (t) => /^\s*mindmap/.test(t), My = async () => {
  const { diagram: t } = await import("./mindmap-definition-6e51e9e7.js");
  return { id: wl, diagram: t };
}, $y = {
  id: wl,
  detector: Oy,
  loader: My
}, Iy = $y, Bl = "sankey", Dy = (t) => /^\s*sankey-beta/.test(t), Ny = async () => {
  const { diagram: t } = await import("./sankeyDiagram-80078f5f.js");
  return { id: Bl, diagram: t };
}, Ry = {
  id: Bl,
  detector: Dy,
  loader: Ny
}, Py = Ry, Pi = {}, qy = (t, e, i) => {
  let r = "";
  return t in Pi && Pi[t] ? r = Pi[t](i) : w.warn(`No theme found for ${t}`), ` & {
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
}, zy = (t, e) => {
  e !== void 0 && (Pi[t] = e);
}, Wy = qy;
let Gn = "", Fr = "", Vn = "";
const Xn = (t) => ti(t, Ft()), Fl = function() {
  Gn = "", Vn = "", Fr = "";
}, Ll = function(t) {
  Gn = Xn(t).replace(/^\s+/g, "");
}, Al = function() {
  return Gn || Fr;
}, El = function(t) {
  Vn = Xn(t).replace(/\n\s+/g, `
`);
}, Ol = function() {
  return Vn;
}, Ml = function(t) {
  Fr = Xn(t);
}, $l = function() {
  return Fr;
}, Hy = {
  getAccTitle: Al,
  setAccTitle: Ll,
  getDiagramTitle: $l,
  setDiagramTitle: Ml,
  getAccDescription: Ol,
  setAccDescription: El,
  clear: Fl
}, jy = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  clear: Fl,
  default: Hy,
  getAccDescription: Ol,
  getAccTitle: Al,
  getDiagramTitle: $l,
  setAccDescription: El,
  setAccTitle: Ll,
  setDiagramTitle: Ml
}, Symbol.toStringTag, { value: "Module" }));
let ae = {};
const Il = function(t, e, i, r) {
  w.debug("parseDirective is being called", e, i, r);
  try {
    if (e !== void 0)
      switch (e = e.trim(), i) {
        case "open_directive":
          ae = {};
          break;
        case "type_directive":
          if (!ae)
            throw new Error("currentDirective is undefined");
          ae.type = e.toLowerCase();
          break;
        case "arg_directive":
          if (!ae)
            throw new Error("currentDirective is undefined");
          ae.args = JSON.parse(e);
          break;
        case "close_directive":
          Uy(t, ae, r), ae = void 0;
          break;
      }
  } catch (n) {
    w.error(
      `Error while rendering sequenceDiagram directive: ${e} jison context: ${i}`
    ), w.error(n.message);
  }
}, Uy = function(t, e, i) {
  switch (w.info(`Directive type=${e.type} with args:`, e.args), e.type) {
    case "init":
    case "initialize": {
      ["config"].forEach((r) => {
        e.args[r] !== void 0 && (i === "flowchart-v2" && (i = "flowchart"), e.args[i] = e.args[r], delete e.args[r]);
      }), ir(e.args);
      break;
    }
    case "wrap":
    case "nowrap":
      t && t.setWrap && t.setWrap(e.type === "wrap");
      break;
    case "themeCss":
      w.warn("themeCss encountered");
      break;
    default:
      w.warn(
        `Unhandled directive: source: '%%{${e.type}: ${JSON.stringify(
          e.args ? e.args : {}
        )}}%%`,
        e
      );
      break;
  }
}, Yy = w, Gy = vn, Dl = Ft, Vy = (t) => ti(t, Dl()), Xy = Cy, Ky = () => jy, Zy = (t, e, i, r) => Il(t, e, i, r), nr = {}, or = (t, e, i) => {
  if (nr[t])
    throw new Error(`Diagram ${t} already registered.`);
  nr[t] = e, i && Oa(t, i), zy(t, e.styles), e.injectUtils && e.injectUtils(
    Yy,
    Gy,
    Dl,
    Vy,
    Xy,
    Ky(),
    Zy
  );
}, Kn = (t) => {
  if (t in nr)
    return nr[t];
  throw new Jy(t);
};
class Jy extends Error {
  constructor(e) {
    super(`Diagram ${e} not found.`);
  }
}
let ps = !1;
const Zn = () => {
  ps || (ps = !0, or("error", Sy, (t) => t.toLowerCase().trim() === "error"), or(
    "---",
    // --- diagram type may appear if YAML front-matter is not parsed correctly
    {
      db: {
        clear: () => {
        }
      },
      styles: {},
      // should never be used
      renderer: {},
      // should never be used
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
  ), Ea(
    u_,
    ry,
    Q_,
    S_,
    E_,
    $_,
    N_,
    U_,
    X_,
    By,
    C_,
    g_,
    Iy,
    Ey,
    B_,
    uy,
    ay,
    gy,
    z_,
    Py
  ));
};
/*! js-yaml 4.1.0 https://github.com/nodeca/js-yaml @license MIT */
function Nl(t) {
  return typeof t > "u" || t === null;
}
function Qy(t) {
  return typeof t == "object" && t !== null;
}
function tC(t) {
  return Array.isArray(t) ? t : Nl(t) ? [] : [t];
}
function eC(t, e) {
  var i, r, n, o;
  if (e)
    for (o = Object.keys(e), i = 0, r = o.length; i < r; i += 1)
      n = o[i], t[n] = e[n];
  return t;
}
function iC(t, e) {
  var i = "", r;
  for (r = 0; r < e; r += 1)
    i += t;
  return i;
}
function rC(t) {
  return t === 0 && Number.NEGATIVE_INFINITY === 1 / t;
}
var nC = Nl, oC = Qy, sC = tC, aC = iC, lC = rC, hC = eC, at = {
  isNothing: nC,
  isObject: oC,
  toArray: sC,
  repeat: aC,
  isNegativeZero: lC,
  extend: hC
};
function Rl(t, e) {
  var i = "", r = t.reason || "(unknown reason)";
  return t.mark ? (t.mark.name && (i += 'in "' + t.mark.name + '" '), i += "(" + (t.mark.line + 1) + ":" + (t.mark.column + 1) + ")", !e && t.mark.snippet && (i += `

` + t.mark.snippet), r + " " + i) : r;
}
function ai(t, e) {
  Error.call(this), this.name = "YAMLException", this.reason = t, this.mark = e, this.message = Rl(this, !1), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack || "";
}
ai.prototype = Object.create(Error.prototype);
ai.prototype.constructor = ai;
ai.prototype.toString = function(e) {
  return this.name + ": " + Rl(this, e);
};
var jt = ai;
function Kr(t, e, i, r, n) {
  var o = "", s = "", a = Math.floor(n / 2) - 1;
  return r - e > a && (o = " ... ", e = r - a + o.length), i - r > a && (s = " ...", i = r + a - s.length), {
    str: o + t.slice(e, i).replace(/\t/g, "→") + s,
    pos: r - e + o.length
    // relative position
  };
}
function Zr(t, e) {
  return at.repeat(" ", e - t.length) + t;
}
function cC(t, e) {
  if (e = Object.create(e || null), !t.buffer)
    return null;
  e.maxLength || (e.maxLength = 79), typeof e.indent != "number" && (e.indent = 1), typeof e.linesBefore != "number" && (e.linesBefore = 3), typeof e.linesAfter != "number" && (e.linesAfter = 2);
  for (var i = /\r?\n|\r|\0/g, r = [0], n = [], o, s = -1; o = i.exec(t.buffer); )
    n.push(o.index), r.push(o.index + o[0].length), t.position <= o.index && s < 0 && (s = r.length - 2);
  s < 0 && (s = r.length - 1);
  var a = "", l, h, c = Math.min(t.line + e.linesAfter, n.length).toString().length, u = e.maxLength - (e.indent + c + 3);
  for (l = 1; l <= e.linesBefore && !(s - l < 0); l++)
    h = Kr(
      t.buffer,
      r[s - l],
      n[s - l],
      t.position - (r[s] - r[s - l]),
      u
    ), a = at.repeat(" ", e.indent) + Zr((t.line - l + 1).toString(), c) + " | " + h.str + `
` + a;
  for (h = Kr(t.buffer, r[s], n[s], t.position, u), a += at.repeat(" ", e.indent) + Zr((t.line + 1).toString(), c) + " | " + h.str + `
`, a += at.repeat("-", e.indent + c + 3 + h.pos) + `^
`, l = 1; l <= e.linesAfter && !(s + l >= n.length); l++)
    h = Kr(
      t.buffer,
      r[s + l],
      n[s + l],
      t.position - (r[s] - r[s + l]),
      u
    ), a += at.repeat(" ", e.indent) + Zr((t.line + l + 1).toString(), c) + " | " + h.str + `
`;
  return a.replace(/\n$/, "");
}
var uC = cC, fC = [
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
], dC = [
  "scalar",
  "sequence",
  "mapping"
];
function pC(t) {
  var e = {};
  return t !== null && Object.keys(t).forEach(function(i) {
    t[i].forEach(function(r) {
      e[String(r)] = i;
    });
  }), e;
}
function gC(t, e) {
  if (e = e || {}, Object.keys(e).forEach(function(i) {
    if (fC.indexOf(i) === -1)
      throw new jt('Unknown option "' + i + '" is met in definition of "' + t + '" YAML type.');
  }), this.options = e, this.tag = t, this.kind = e.kind || null, this.resolve = e.resolve || function() {
    return !0;
  }, this.construct = e.construct || function(i) {
    return i;
  }, this.instanceOf = e.instanceOf || null, this.predicate = e.predicate || null, this.represent = e.represent || null, this.representName = e.representName || null, this.defaultStyle = e.defaultStyle || null, this.multi = e.multi || !1, this.styleAliases = pC(e.styleAliases || null), dC.indexOf(this.kind) === -1)
    throw new jt('Unknown kind "' + this.kind + '" is specified for "' + t + '" YAML type.');
}
var ot = gC;
function gs(t, e) {
  var i = [];
  return t[e].forEach(function(r) {
    var n = i.length;
    i.forEach(function(o, s) {
      o.tag === r.tag && o.kind === r.kind && o.multi === r.multi && (n = s);
    }), i[n] = r;
  }), i;
}
function mC() {
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
function yn(t) {
  return this.extend(t);
}
yn.prototype.extend = function(e) {
  var i = [], r = [];
  if (e instanceof ot)
    r.push(e);
  else if (Array.isArray(e))
    r = r.concat(e);
  else if (e && (Array.isArray(e.implicit) || Array.isArray(e.explicit)))
    e.implicit && (i = i.concat(e.implicit)), e.explicit && (r = r.concat(e.explicit));
  else
    throw new jt("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
  i.forEach(function(o) {
    if (!(o instanceof ot))
      throw new jt("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    if (o.loadKind && o.loadKind !== "scalar")
      throw new jt("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
    if (o.multi)
      throw new jt("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
  }), r.forEach(function(o) {
    if (!(o instanceof ot))
      throw new jt("Specified list of YAML types (or a single Type object) contains a non-Type object.");
  });
  var n = Object.create(yn.prototype);
  return n.implicit = (this.implicit || []).concat(i), n.explicit = (this.explicit || []).concat(r), n.compiledImplicit = gs(n, "implicit"), n.compiledExplicit = gs(n, "explicit"), n.compiledTypeMap = mC(n.compiledImplicit, n.compiledExplicit), n;
};
var _C = yn, yC = new ot("tag:yaml.org,2002:str", {
  kind: "scalar",
  construct: function(t) {
    return t !== null ? t : "";
  }
}), CC = new ot("tag:yaml.org,2002:seq", {
  kind: "sequence",
  construct: function(t) {
    return t !== null ? t : [];
  }
}), xC = new ot("tag:yaml.org,2002:map", {
  kind: "mapping",
  construct: function(t) {
    return t !== null ? t : {};
  }
}), bC = new _C({
  explicit: [
    yC,
    CC,
    xC
  ]
});
function TC(t) {
  if (t === null)
    return !0;
  var e = t.length;
  return e === 1 && t === "~" || e === 4 && (t === "null" || t === "Null" || t === "NULL");
}
function SC() {
  return null;
}
function vC(t) {
  return t === null;
}
var kC = new ot("tag:yaml.org,2002:null", {
  kind: "scalar",
  resolve: TC,
  construct: SC,
  predicate: vC,
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
function wC(t) {
  if (t === null)
    return !1;
  var e = t.length;
  return e === 4 && (t === "true" || t === "True" || t === "TRUE") || e === 5 && (t === "false" || t === "False" || t === "FALSE");
}
function BC(t) {
  return t === "true" || t === "True" || t === "TRUE";
}
function FC(t) {
  return Object.prototype.toString.call(t) === "[object Boolean]";
}
var LC = new ot("tag:yaml.org,2002:bool", {
  kind: "scalar",
  resolve: wC,
  construct: BC,
  predicate: FC,
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
function AC(t) {
  return 48 <= t && t <= 57 || 65 <= t && t <= 70 || 97 <= t && t <= 102;
}
function EC(t) {
  return 48 <= t && t <= 55;
}
function OC(t) {
  return 48 <= t && t <= 57;
}
function MC(t) {
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
          if (!AC(t.charCodeAt(i)))
            return !1;
          r = !0;
        }
      return r && n !== "_";
    }
    if (n === "o") {
      for (i++; i < e; i++)
        if (n = t[i], n !== "_") {
          if (!EC(t.charCodeAt(i)))
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
      if (!OC(t.charCodeAt(i)))
        return !1;
      r = !0;
    }
  return !(!r || n === "_");
}
function $C(t) {
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
function IC(t) {
  return Object.prototype.toString.call(t) === "[object Number]" && t % 1 === 0 && !at.isNegativeZero(t);
}
var DC = new ot("tag:yaml.org,2002:int", {
  kind: "scalar",
  resolve: MC,
  construct: $C,
  predicate: IC,
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
}), NC = new RegExp(
  // 2.5e4, 2.5 and integers
  "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
);
function RC(t) {
  return !(t === null || !NC.test(t) || // Quick hack to not allow integers end with `_`
  // Probably should update regexp & check speed
  t[t.length - 1] === "_");
}
function PC(t) {
  var e, i;
  return e = t.replace(/_/g, "").toLowerCase(), i = e[0] === "-" ? -1 : 1, "+-".indexOf(e[0]) >= 0 && (e = e.slice(1)), e === ".inf" ? i === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : e === ".nan" ? NaN : i * parseFloat(e, 10);
}
var qC = /^[-+]?[0-9]+e/;
function zC(t, e) {
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
  else if (at.isNegativeZero(t))
    return "-0.0";
  return i = t.toString(10), qC.test(i) ? i.replace("e", ".e") : i;
}
function WC(t) {
  return Object.prototype.toString.call(t) === "[object Number]" && (t % 1 !== 0 || at.isNegativeZero(t));
}
var HC = new ot("tag:yaml.org,2002:float", {
  kind: "scalar",
  resolve: RC,
  construct: PC,
  predicate: WC,
  represent: zC,
  defaultStyle: "lowercase"
}), Pl = bC.extend({
  implicit: [
    kC,
    LC,
    DC,
    HC
  ]
}), jC = Pl, ql = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
), zl = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
);
function UC(t) {
  return t === null ? !1 : ql.exec(t) !== null || zl.exec(t) !== null;
}
function YC(t) {
  var e, i, r, n, o, s, a, l = 0, h = null, c, u, g;
  if (e = ql.exec(t), e === null && (e = zl.exec(t)), e === null)
    throw new Error("Date resolve error");
  if (i = +e[1], r = +e[2] - 1, n = +e[3], !e[4])
    return new Date(Date.UTC(i, r, n));
  if (o = +e[4], s = +e[5], a = +e[6], e[7]) {
    for (l = e[7].slice(0, 3); l.length < 3; )
      l += "0";
    l = +l;
  }
  return e[9] && (c = +e[10], u = +(e[11] || 0), h = (c * 60 + u) * 6e4, e[9] === "-" && (h = -h)), g = new Date(Date.UTC(i, r, n, o, s, a, l)), h && g.setTime(g.getTime() - h), g;
}
function GC(t) {
  return t.toISOString();
}
var VC = new ot("tag:yaml.org,2002:timestamp", {
  kind: "scalar",
  resolve: UC,
  construct: YC,
  instanceOf: Date,
  represent: GC
});
function XC(t) {
  return t === "<<" || t === null;
}
var KC = new ot("tag:yaml.org,2002:merge", {
  kind: "scalar",
  resolve: XC
}), Jn = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
function ZC(t) {
  if (t === null)
    return !1;
  var e, i, r = 0, n = t.length, o = Jn;
  for (i = 0; i < n; i++)
    if (e = o.indexOf(t.charAt(i)), !(e > 64)) {
      if (e < 0)
        return !1;
      r += 6;
    }
  return r % 8 === 0;
}
function JC(t) {
  var e, i, r = t.replace(/[\r\n=]/g, ""), n = r.length, o = Jn, s = 0, a = [];
  for (e = 0; e < n; e++)
    e % 4 === 0 && e && (a.push(s >> 16 & 255), a.push(s >> 8 & 255), a.push(s & 255)), s = s << 6 | o.indexOf(r.charAt(e));
  return i = n % 4 * 6, i === 0 ? (a.push(s >> 16 & 255), a.push(s >> 8 & 255), a.push(s & 255)) : i === 18 ? (a.push(s >> 10 & 255), a.push(s >> 2 & 255)) : i === 12 && a.push(s >> 4 & 255), new Uint8Array(a);
}
function QC(t) {
  var e = "", i = 0, r, n, o = t.length, s = Jn;
  for (r = 0; r < o; r++)
    r % 3 === 0 && r && (e += s[i >> 18 & 63], e += s[i >> 12 & 63], e += s[i >> 6 & 63], e += s[i & 63]), i = (i << 8) + t[r];
  return n = o % 3, n === 0 ? (e += s[i >> 18 & 63], e += s[i >> 12 & 63], e += s[i >> 6 & 63], e += s[i & 63]) : n === 2 ? (e += s[i >> 10 & 63], e += s[i >> 4 & 63], e += s[i << 2 & 63], e += s[64]) : n === 1 && (e += s[i >> 2 & 63], e += s[i << 4 & 63], e += s[64], e += s[64]), e;
}
function tx(t) {
  return Object.prototype.toString.call(t) === "[object Uint8Array]";
}
var ex = new ot("tag:yaml.org,2002:binary", {
  kind: "scalar",
  resolve: ZC,
  construct: JC,
  predicate: tx,
  represent: QC
}), ix = Object.prototype.hasOwnProperty, rx = Object.prototype.toString;
function nx(t) {
  if (t === null)
    return !0;
  var e = [], i, r, n, o, s, a = t;
  for (i = 0, r = a.length; i < r; i += 1) {
    if (n = a[i], s = !1, rx.call(n) !== "[object Object]")
      return !1;
    for (o in n)
      if (ix.call(n, o))
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
function ox(t) {
  return t !== null ? t : [];
}
var sx = new ot("tag:yaml.org,2002:omap", {
  kind: "sequence",
  resolve: nx,
  construct: ox
}), ax = Object.prototype.toString;
function lx(t) {
  if (t === null)
    return !0;
  var e, i, r, n, o, s = t;
  for (o = new Array(s.length), e = 0, i = s.length; e < i; e += 1) {
    if (r = s[e], ax.call(r) !== "[object Object]" || (n = Object.keys(r), n.length !== 1))
      return !1;
    o[e] = [n[0], r[n[0]]];
  }
  return !0;
}
function hx(t) {
  if (t === null)
    return [];
  var e, i, r, n, o, s = t;
  for (o = new Array(s.length), e = 0, i = s.length; e < i; e += 1)
    r = s[e], n = Object.keys(r), o[e] = [n[0], r[n[0]]];
  return o;
}
var cx = new ot("tag:yaml.org,2002:pairs", {
  kind: "sequence",
  resolve: lx,
  construct: hx
}), ux = Object.prototype.hasOwnProperty;
function fx(t) {
  if (t === null)
    return !0;
  var e, i = t;
  for (e in i)
    if (ux.call(i, e) && i[e] !== null)
      return !1;
  return !0;
}
function dx(t) {
  return t !== null ? t : {};
}
var px = new ot("tag:yaml.org,2002:set", {
  kind: "mapping",
  resolve: fx,
  construct: dx
}), gx = jC.extend({
  implicit: [
    VC,
    KC
  ],
  explicit: [
    ex,
    sx,
    cx,
    px
  ]
}), re = Object.prototype.hasOwnProperty, sr = 1, Wl = 2, Hl = 3, ar = 4, Jr = 1, mx = 2, ms = 3, _x = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, yx = /[\x85\u2028\u2029]/, Cx = /[,\[\]\{\}]/, jl = /^(?:!|!!|![a-z\-]+!)$/i, Ul = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
function _s(t) {
  return Object.prototype.toString.call(t);
}
function Mt(t) {
  return t === 10 || t === 13;
}
function fe(t) {
  return t === 9 || t === 32;
}
function dt(t) {
  return t === 9 || t === 32 || t === 10 || t === 13;
}
function we(t) {
  return t === 44 || t === 91 || t === 93 || t === 123 || t === 125;
}
function xx(t) {
  var e;
  return 48 <= t && t <= 57 ? t - 48 : (e = t | 32, 97 <= e && e <= 102 ? e - 97 + 10 : -1);
}
function bx(t) {
  return t === 120 ? 2 : t === 117 ? 4 : t === 85 ? 8 : 0;
}
function Tx(t) {
  return 48 <= t && t <= 57 ? t - 48 : -1;
}
function ys(t) {
  return t === 48 ? "\0" : t === 97 ? "\x07" : t === 98 ? "\b" : t === 116 || t === 9 ? "	" : t === 110 ? `
` : t === 118 ? "\v" : t === 102 ? "\f" : t === 114 ? "\r" : t === 101 ? "\x1B" : t === 32 ? " " : t === 34 ? '"' : t === 47 ? "/" : t === 92 ? "\\" : t === 78 ? "" : t === 95 ? " " : t === 76 ? "\u2028" : t === 80 ? "\u2029" : "";
}
function Sx(t) {
  return t <= 65535 ? String.fromCharCode(t) : String.fromCharCode(
    (t - 65536 >> 10) + 55296,
    (t - 65536 & 1023) + 56320
  );
}
var Yl = new Array(256), Gl = new Array(256);
for (var ke = 0; ke < 256; ke++)
  Yl[ke] = ys(ke) ? 1 : 0, Gl[ke] = ys(ke);
function vx(t, e) {
  this.input = t, this.filename = e.filename || null, this.schema = e.schema || gx, this.onWarning = e.onWarning || null, this.legacy = e.legacy || !1, this.json = e.json || !1, this.listener = e.listener || null, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = t.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.firstTabInLine = -1, this.documents = [];
}
function Vl(t, e) {
  var i = {
    name: t.filename,
    buffer: t.input.slice(0, -1),
    // omit trailing \0
    position: t.position,
    line: t.line,
    column: t.position - t.lineStart
  };
  return i.snippet = uC(i), new jt(e, i);
}
function L(t, e) {
  throw Vl(t, e);
}
function lr(t, e) {
  t.onWarning && t.onWarning.call(null, Vl(t, e));
}
var Cs = {
  YAML: function(e, i, r) {
    var n, o, s;
    e.version !== null && L(e, "duplication of %YAML directive"), r.length !== 1 && L(e, "YAML directive accepts exactly one argument"), n = /^([0-9]+)\.([0-9]+)$/.exec(r[0]), n === null && L(e, "ill-formed argument of the YAML directive"), o = parseInt(n[1], 10), s = parseInt(n[2], 10), o !== 1 && L(e, "unacceptable YAML version of the document"), e.version = r[0], e.checkLineBreaks = s < 2, s !== 1 && s !== 2 && lr(e, "unsupported YAML version of the document");
  },
  TAG: function(e, i, r) {
    var n, o;
    r.length !== 2 && L(e, "TAG directive accepts exactly two arguments"), n = r[0], o = r[1], jl.test(n) || L(e, "ill-formed tag handle (first argument) of the TAG directive"), re.call(e.tagMap, n) && L(e, 'there is a previously declared suffix for "' + n + '" tag handle'), Ul.test(o) || L(e, "ill-formed tag prefix (second argument) of the TAG directive");
    try {
      o = decodeURIComponent(o);
    } catch {
      L(e, "tag prefix is malformed: " + o);
    }
    e.tagMap[n] = o;
  }
};
function ee(t, e, i, r) {
  var n, o, s, a;
  if (e < i) {
    if (a = t.input.slice(e, i), r)
      for (n = 0, o = a.length; n < o; n += 1)
        s = a.charCodeAt(n), s === 9 || 32 <= s && s <= 1114111 || L(t, "expected valid JSON character");
    else
      _x.test(a) && L(t, "the stream contains non-printable characters");
    t.result += a;
  }
}
function xs(t, e, i, r) {
  var n, o, s, a;
  for (at.isObject(i) || L(t, "cannot merge mappings; the provided source object is unacceptable"), n = Object.keys(i), s = 0, a = n.length; s < a; s += 1)
    o = n[s], re.call(e, o) || (e[o] = i[o], r[o] = !0);
}
function Be(t, e, i, r, n, o, s, a, l) {
  var h, c;
  if (Array.isArray(n))
    for (n = Array.prototype.slice.call(n), h = 0, c = n.length; h < c; h += 1)
      Array.isArray(n[h]) && L(t, "nested arrays are not supported inside keys"), typeof n == "object" && _s(n[h]) === "[object Object]" && (n[h] = "[object Object]");
  if (typeof n == "object" && _s(n) === "[object Object]" && (n = "[object Object]"), n = String(n), e === null && (e = {}), r === "tag:yaml.org,2002:merge")
    if (Array.isArray(o))
      for (h = 0, c = o.length; h < c; h += 1)
        xs(t, e, o[h], i);
    else
      xs(t, e, o, i);
  else
    !t.json && !re.call(i, n) && re.call(e, n) && (t.line = s || t.line, t.lineStart = a || t.lineStart, t.position = l || t.position, L(t, "duplicated mapping key")), n === "__proto__" ? Object.defineProperty(e, n, {
      configurable: !0,
      enumerable: !0,
      writable: !0,
      value: o
    }) : e[n] = o, delete i[n];
  return e;
}
function Qn(t) {
  var e;
  e = t.input.charCodeAt(t.position), e === 10 ? t.position++ : e === 13 ? (t.position++, t.input.charCodeAt(t.position) === 10 && t.position++) : L(t, "a line break is expected"), t.line += 1, t.lineStart = t.position, t.firstTabInLine = -1;
}
function J(t, e, i) {
  for (var r = 0, n = t.input.charCodeAt(t.position); n !== 0; ) {
    for (; fe(n); )
      n === 9 && t.firstTabInLine === -1 && (t.firstTabInLine = t.position), n = t.input.charCodeAt(++t.position);
    if (e && n === 35)
      do
        n = t.input.charCodeAt(++t.position);
      while (n !== 10 && n !== 13 && n !== 0);
    if (Mt(n))
      for (Qn(t), n = t.input.charCodeAt(t.position), r++, t.lineIndent = 0; n === 32; )
        t.lineIndent++, n = t.input.charCodeAt(++t.position);
    else
      break;
  }
  return i !== -1 && r !== 0 && t.lineIndent < i && lr(t, "deficient indentation"), r;
}
function Lr(t) {
  var e = t.position, i;
  return i = t.input.charCodeAt(e), !!((i === 45 || i === 46) && i === t.input.charCodeAt(e + 1) && i === t.input.charCodeAt(e + 2) && (e += 3, i = t.input.charCodeAt(e), i === 0 || dt(i)));
}
function to(t, e) {
  e === 1 ? t.result += " " : e > 1 && (t.result += at.repeat(`
`, e - 1));
}
function kx(t, e, i) {
  var r, n, o, s, a, l, h, c, u = t.kind, g = t.result, p;
  if (p = t.input.charCodeAt(t.position), dt(p) || we(p) || p === 35 || p === 38 || p === 42 || p === 33 || p === 124 || p === 62 || p === 39 || p === 34 || p === 37 || p === 64 || p === 96 || (p === 63 || p === 45) && (n = t.input.charCodeAt(t.position + 1), dt(n) || i && we(n)))
    return !1;
  for (t.kind = "scalar", t.result = "", o = s = t.position, a = !1; p !== 0; ) {
    if (p === 58) {
      if (n = t.input.charCodeAt(t.position + 1), dt(n) || i && we(n))
        break;
    } else if (p === 35) {
      if (r = t.input.charCodeAt(t.position - 1), dt(r))
        break;
    } else {
      if (t.position === t.lineStart && Lr(t) || i && we(p))
        break;
      if (Mt(p))
        if (l = t.line, h = t.lineStart, c = t.lineIndent, J(t, !1, -1), t.lineIndent >= e) {
          a = !0, p = t.input.charCodeAt(t.position);
          continue;
        } else {
          t.position = s, t.line = l, t.lineStart = h, t.lineIndent = c;
          break;
        }
    }
    a && (ee(t, o, s, !1), to(t, t.line - l), o = s = t.position, a = !1), fe(p) || (s = t.position + 1), p = t.input.charCodeAt(++t.position);
  }
  return ee(t, o, s, !1), t.result ? !0 : (t.kind = u, t.result = g, !1);
}
function wx(t, e) {
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
      Mt(i) ? (ee(t, r, n, !0), to(t, J(t, !1, e)), r = n = t.position) : t.position === t.lineStart && Lr(t) ? L(t, "unexpected end of the document within a single quoted scalar") : (t.position++, n = t.position);
  L(t, "unexpected end of the stream within a single quoted scalar");
}
function Bx(t, e) {
  var i, r, n, o, s, a;
  if (a = t.input.charCodeAt(t.position), a !== 34)
    return !1;
  for (t.kind = "scalar", t.result = "", t.position++, i = r = t.position; (a = t.input.charCodeAt(t.position)) !== 0; ) {
    if (a === 34)
      return ee(t, i, t.position, !0), t.position++, !0;
    if (a === 92) {
      if (ee(t, i, t.position, !0), a = t.input.charCodeAt(++t.position), Mt(a))
        J(t, !1, e);
      else if (a < 256 && Yl[a])
        t.result += Gl[a], t.position++;
      else if ((s = bx(a)) > 0) {
        for (n = s, o = 0; n > 0; n--)
          a = t.input.charCodeAt(++t.position), (s = xx(a)) >= 0 ? o = (o << 4) + s : L(t, "expected hexadecimal character");
        t.result += Sx(o), t.position++;
      } else
        L(t, "unknown escape sequence");
      i = r = t.position;
    } else
      Mt(a) ? (ee(t, i, r, !0), to(t, J(t, !1, e)), i = r = t.position) : t.position === t.lineStart && Lr(t) ? L(t, "unexpected end of the document within a double quoted scalar") : (t.position++, r = t.position);
  }
  L(t, "unexpected end of the stream within a double quoted scalar");
}
function Fx(t, e) {
  var i = !0, r, n, o, s = t.tag, a, l = t.anchor, h, c, u, g, p, _ = /* @__PURE__ */ Object.create(null), v, O, P, S;
  if (S = t.input.charCodeAt(t.position), S === 91)
    c = 93, p = !1, a = [];
  else if (S === 123)
    c = 125, p = !0, a = {};
  else
    return !1;
  for (t.anchor !== null && (t.anchorMap[t.anchor] = a), S = t.input.charCodeAt(++t.position); S !== 0; ) {
    if (J(t, !0, e), S = t.input.charCodeAt(t.position), S === c)
      return t.position++, t.tag = s, t.anchor = l, t.kind = p ? "mapping" : "sequence", t.result = a, !0;
    i ? S === 44 && L(t, "expected the node content, but found ','") : L(t, "missed comma between flow collection entries"), O = v = P = null, u = g = !1, S === 63 && (h = t.input.charCodeAt(t.position + 1), dt(h) && (u = g = !0, t.position++, J(t, !0, e))), r = t.line, n = t.lineStart, o = t.position, $e(t, e, sr, !1, !0), O = t.tag, v = t.result, J(t, !0, e), S = t.input.charCodeAt(t.position), (g || t.line === r) && S === 58 && (u = !0, S = t.input.charCodeAt(++t.position), J(t, !0, e), $e(t, e, sr, !1, !0), P = t.result), p ? Be(t, a, _, O, v, P, r, n, o) : u ? a.push(Be(t, null, _, O, v, P, r, n, o)) : a.push(v), J(t, !0, e), S = t.input.charCodeAt(t.position), S === 44 ? (i = !0, S = t.input.charCodeAt(++t.position)) : i = !1;
  }
  L(t, "unexpected end of the stream within a flow collection");
}
function Lx(t, e) {
  var i, r, n = Jr, o = !1, s = !1, a = e, l = 0, h = !1, c, u;
  if (u = t.input.charCodeAt(t.position), u === 124)
    r = !1;
  else if (u === 62)
    r = !0;
  else
    return !1;
  for (t.kind = "scalar", t.result = ""; u !== 0; )
    if (u = t.input.charCodeAt(++t.position), u === 43 || u === 45)
      Jr === n ? n = u === 43 ? ms : mx : L(t, "repeat of a chomping mode identifier");
    else if ((c = Tx(u)) >= 0)
      c === 0 ? L(t, "bad explicit indentation width of a block scalar; it cannot be less than one") : s ? L(t, "repeat of an indentation width identifier") : (a = e + c - 1, s = !0);
    else
      break;
  if (fe(u)) {
    do
      u = t.input.charCodeAt(++t.position);
    while (fe(u));
    if (u === 35)
      do
        u = t.input.charCodeAt(++t.position);
      while (!Mt(u) && u !== 0);
  }
  for (; u !== 0; ) {
    for (Qn(t), t.lineIndent = 0, u = t.input.charCodeAt(t.position); (!s || t.lineIndent < a) && u === 32; )
      t.lineIndent++, u = t.input.charCodeAt(++t.position);
    if (!s && t.lineIndent > a && (a = t.lineIndent), Mt(u)) {
      l++;
      continue;
    }
    if (t.lineIndent < a) {
      n === ms ? t.result += at.repeat(`
`, o ? 1 + l : l) : n === Jr && o && (t.result += `
`);
      break;
    }
    for (r ? fe(u) ? (h = !0, t.result += at.repeat(`
`, o ? 1 + l : l)) : h ? (h = !1, t.result += at.repeat(`
`, l + 1)) : l === 0 ? o && (t.result += " ") : t.result += at.repeat(`
`, l) : t.result += at.repeat(`
`, o ? 1 + l : l), o = !0, s = !0, l = 0, i = t.position; !Mt(u) && u !== 0; )
      u = t.input.charCodeAt(++t.position);
    ee(t, i, t.position, !1);
  }
  return !0;
}
function bs(t, e) {
  var i, r = t.tag, n = t.anchor, o = [], s, a = !1, l;
  if (t.firstTabInLine !== -1)
    return !1;
  for (t.anchor !== null && (t.anchorMap[t.anchor] = o), l = t.input.charCodeAt(t.position); l !== 0 && (t.firstTabInLine !== -1 && (t.position = t.firstTabInLine, L(t, "tab characters must not be used in indentation")), !(l !== 45 || (s = t.input.charCodeAt(t.position + 1), !dt(s)))); ) {
    if (a = !0, t.position++, J(t, !0, -1) && t.lineIndent <= e) {
      o.push(null), l = t.input.charCodeAt(t.position);
      continue;
    }
    if (i = t.line, $e(t, e, Hl, !1, !0), o.push(t.result), J(t, !0, -1), l = t.input.charCodeAt(t.position), (t.line === i || t.lineIndent > e) && l !== 0)
      L(t, "bad indentation of a sequence entry");
    else if (t.lineIndent < e)
      break;
  }
  return a ? (t.tag = r, t.anchor = n, t.kind = "sequence", t.result = o, !0) : !1;
}
function Ax(t, e, i) {
  var r, n, o, s, a, l, h = t.tag, c = t.anchor, u = {}, g = /* @__PURE__ */ Object.create(null), p = null, _ = null, v = null, O = !1, P = !1, S;
  if (t.firstTabInLine !== -1)
    return !1;
  for (t.anchor !== null && (t.anchorMap[t.anchor] = u), S = t.input.charCodeAt(t.position); S !== 0; ) {
    if (!O && t.firstTabInLine !== -1 && (t.position = t.firstTabInLine, L(t, "tab characters must not be used in indentation")), r = t.input.charCodeAt(t.position + 1), o = t.line, (S === 63 || S === 58) && dt(r))
      S === 63 ? (O && (Be(t, u, g, p, _, null, s, a, l), p = _ = v = null), P = !0, O = !0, n = !0) : O ? (O = !1, n = !0) : L(t, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), t.position += 1, S = r;
    else {
      if (s = t.line, a = t.lineStart, l = t.position, !$e(t, i, Wl, !1, !0))
        break;
      if (t.line === o) {
        for (S = t.input.charCodeAt(t.position); fe(S); )
          S = t.input.charCodeAt(++t.position);
        if (S === 58)
          S = t.input.charCodeAt(++t.position), dt(S) || L(t, "a whitespace character is expected after the key-value separator within a block mapping"), O && (Be(t, u, g, p, _, null, s, a, l), p = _ = v = null), P = !0, O = !1, n = !1, p = t.tag, _ = t.result;
        else if (P)
          L(t, "can not read an implicit mapping pair; a colon is missed");
        else
          return t.tag = h, t.anchor = c, !0;
      } else if (P)
        L(t, "can not read a block mapping entry; a multiline key may not be an implicit key");
      else
        return t.tag = h, t.anchor = c, !0;
    }
    if ((t.line === o || t.lineIndent > e) && (O && (s = t.line, a = t.lineStart, l = t.position), $e(t, e, ar, !0, n) && (O ? _ = t.result : v = t.result), O || (Be(t, u, g, p, _, v, s, a, l), p = _ = v = null), J(t, !0, -1), S = t.input.charCodeAt(t.position)), (t.line === o || t.lineIndent > e) && S !== 0)
      L(t, "bad indentation of a mapping entry");
    else if (t.lineIndent < e)
      break;
  }
  return O && Be(t, u, g, p, _, null, s, a, l), P && (t.tag = h, t.anchor = c, t.kind = "mapping", t.result = u), P;
}
function Ex(t) {
  var e, i = !1, r = !1, n, o, s;
  if (s = t.input.charCodeAt(t.position), s !== 33)
    return !1;
  if (t.tag !== null && L(t, "duplication of a tag property"), s = t.input.charCodeAt(++t.position), s === 60 ? (i = !0, s = t.input.charCodeAt(++t.position)) : s === 33 ? (r = !0, n = "!!", s = t.input.charCodeAt(++t.position)) : n = "!", e = t.position, i) {
    do
      s = t.input.charCodeAt(++t.position);
    while (s !== 0 && s !== 62);
    t.position < t.length ? (o = t.input.slice(e, t.position), s = t.input.charCodeAt(++t.position)) : L(t, "unexpected end of the stream within a verbatim tag");
  } else {
    for (; s !== 0 && !dt(s); )
      s === 33 && (r ? L(t, "tag suffix cannot contain exclamation marks") : (n = t.input.slice(e - 1, t.position + 1), jl.test(n) || L(t, "named tag handle cannot contain such characters"), r = !0, e = t.position + 1)), s = t.input.charCodeAt(++t.position);
    o = t.input.slice(e, t.position), Cx.test(o) && L(t, "tag suffix cannot contain flow indicator characters");
  }
  o && !Ul.test(o) && L(t, "tag name cannot contain such characters: " + o);
  try {
    o = decodeURIComponent(o);
  } catch {
    L(t, "tag name is malformed: " + o);
  }
  return i ? t.tag = o : re.call(t.tagMap, n) ? t.tag = t.tagMap[n] + o : n === "!" ? t.tag = "!" + o : n === "!!" ? t.tag = "tag:yaml.org,2002:" + o : L(t, 'undeclared tag handle "' + n + '"'), !0;
}
function Ox(t) {
  var e, i;
  if (i = t.input.charCodeAt(t.position), i !== 38)
    return !1;
  for (t.anchor !== null && L(t, "duplication of an anchor property"), i = t.input.charCodeAt(++t.position), e = t.position; i !== 0 && !dt(i) && !we(i); )
    i = t.input.charCodeAt(++t.position);
  return t.position === e && L(t, "name of an anchor node must contain at least one character"), t.anchor = t.input.slice(e, t.position), !0;
}
function Mx(t) {
  var e, i, r;
  if (r = t.input.charCodeAt(t.position), r !== 42)
    return !1;
  for (r = t.input.charCodeAt(++t.position), e = t.position; r !== 0 && !dt(r) && !we(r); )
    r = t.input.charCodeAt(++t.position);
  return t.position === e && L(t, "name of an alias node must contain at least one character"), i = t.input.slice(e, t.position), re.call(t.anchorMap, i) || L(t, 'unidentified alias "' + i + '"'), t.result = t.anchorMap[i], J(t, !0, -1), !0;
}
function $e(t, e, i, r, n) {
  var o, s, a, l = 1, h = !1, c = !1, u, g, p, _, v, O;
  if (t.listener !== null && t.listener("open", t), t.tag = null, t.anchor = null, t.kind = null, t.result = null, o = s = a = ar === i || Hl === i, r && J(t, !0, -1) && (h = !0, t.lineIndent > e ? l = 1 : t.lineIndent === e ? l = 0 : t.lineIndent < e && (l = -1)), l === 1)
    for (; Ex(t) || Ox(t); )
      J(t, !0, -1) ? (h = !0, a = o, t.lineIndent > e ? l = 1 : t.lineIndent === e ? l = 0 : t.lineIndent < e && (l = -1)) : a = !1;
  if (a && (a = h || n), (l === 1 || ar === i) && (sr === i || Wl === i ? v = e : v = e + 1, O = t.position - t.lineStart, l === 1 ? a && (bs(t, O) || Ax(t, O, v)) || Fx(t, v) ? c = !0 : (s && Lx(t, v) || wx(t, v) || Bx(t, v) ? c = !0 : Mx(t) ? (c = !0, (t.tag !== null || t.anchor !== null) && L(t, "alias node should not have any properties")) : kx(t, v, sr === i) && (c = !0, t.tag === null && (t.tag = "?")), t.anchor !== null && (t.anchorMap[t.anchor] = t.result)) : l === 0 && (c = a && bs(t, O))), t.tag === null)
    t.anchor !== null && (t.anchorMap[t.anchor] = t.result);
  else if (t.tag === "?") {
    for (t.result !== null && t.kind !== "scalar" && L(t, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + t.kind + '"'), u = 0, g = t.implicitTypes.length; u < g; u += 1)
      if (_ = t.implicitTypes[u], _.resolve(t.result)) {
        t.result = _.construct(t.result), t.tag = _.tag, t.anchor !== null && (t.anchorMap[t.anchor] = t.result);
        break;
      }
  } else if (t.tag !== "!") {
    if (re.call(t.typeMap[t.kind || "fallback"], t.tag))
      _ = t.typeMap[t.kind || "fallback"][t.tag];
    else
      for (_ = null, p = t.typeMap.multi[t.kind || "fallback"], u = 0, g = p.length; u < g; u += 1)
        if (t.tag.slice(0, p[u].tag.length) === p[u].tag) {
          _ = p[u];
          break;
        }
    _ || L(t, "unknown tag !<" + t.tag + ">"), t.result !== null && _.kind !== t.kind && L(t, "unacceptable node kind for !<" + t.tag + '> tag; it should be "' + _.kind + '", not "' + t.kind + '"'), _.resolve(t.result, t.tag) ? (t.result = _.construct(t.result, t.tag), t.anchor !== null && (t.anchorMap[t.anchor] = t.result)) : L(t, "cannot resolve a node with !<" + t.tag + "> explicit tag");
  }
  return t.listener !== null && t.listener("close", t), t.tag !== null || t.anchor !== null || c;
}
function $x(t) {
  var e = t.position, i, r, n, o = !1, s;
  for (t.version = null, t.checkLineBreaks = t.legacy, t.tagMap = /* @__PURE__ */ Object.create(null), t.anchorMap = /* @__PURE__ */ Object.create(null); (s = t.input.charCodeAt(t.position)) !== 0 && (J(t, !0, -1), s = t.input.charCodeAt(t.position), !(t.lineIndent > 0 || s !== 37)); ) {
    for (o = !0, s = t.input.charCodeAt(++t.position), i = t.position; s !== 0 && !dt(s); )
      s = t.input.charCodeAt(++t.position);
    for (r = t.input.slice(i, t.position), n = [], r.length < 1 && L(t, "directive name must not be less than one character in length"); s !== 0; ) {
      for (; fe(s); )
        s = t.input.charCodeAt(++t.position);
      if (s === 35) {
        do
          s = t.input.charCodeAt(++t.position);
        while (s !== 0 && !Mt(s));
        break;
      }
      if (Mt(s))
        break;
      for (i = t.position; s !== 0 && !dt(s); )
        s = t.input.charCodeAt(++t.position);
      n.push(t.input.slice(i, t.position));
    }
    s !== 0 && Qn(t), re.call(Cs, r) ? Cs[r](t, r, n) : lr(t, 'unknown document directive "' + r + '"');
  }
  if (J(t, !0, -1), t.lineIndent === 0 && t.input.charCodeAt(t.position) === 45 && t.input.charCodeAt(t.position + 1) === 45 && t.input.charCodeAt(t.position + 2) === 45 ? (t.position += 3, J(t, !0, -1)) : o && L(t, "directives end mark is expected"), $e(t, t.lineIndent - 1, ar, !1, !0), J(t, !0, -1), t.checkLineBreaks && yx.test(t.input.slice(e, t.position)) && lr(t, "non-ASCII line breaks are interpreted as content"), t.documents.push(t.result), t.position === t.lineStart && Lr(t)) {
    t.input.charCodeAt(t.position) === 46 && (t.position += 3, J(t, !0, -1));
    return;
  }
  if (t.position < t.length - 1)
    L(t, "end of the stream or a document separator is expected");
  else
    return;
}
function Xl(t, e) {
  t = String(t), e = e || {}, t.length !== 0 && (t.charCodeAt(t.length - 1) !== 10 && t.charCodeAt(t.length - 1) !== 13 && (t += `
`), t.charCodeAt(0) === 65279 && (t = t.slice(1)));
  var i = new vx(t, e), r = t.indexOf("\0");
  for (r !== -1 && (i.position = r, L(i, "null byte is not allowed in input")), i.input += "\0"; i.input.charCodeAt(i.position) === 32; )
    i.lineIndent += 1, i.position += 1;
  for (; i.position < i.length - 1; )
    $x(i);
  return i.documents;
}
function Ix(t, e, i) {
  e !== null && typeof e == "object" && typeof i > "u" && (i = e, e = null);
  var r = Xl(t, i);
  if (typeof e != "function")
    return r;
  for (var n = 0, o = r.length; n < o; n += 1)
    e(r[n]);
}
function Dx(t, e) {
  var i = Xl(t, e);
  if (i.length !== 0) {
    if (i.length === 1)
      return i[0];
    throw new jt("expected a single document in the stream, but found more");
  }
}
var Nx = Ix, Rx = Dx, Px = {
  loadAll: Nx,
  load: Rx
}, qx = Pl, zx = Px.load;
function Kl(t, e, i) {
  var o, s;
  const r = t.match(La);
  if (!r)
    return t;
  const n = zx(r[1], {
    // To support config, we need JSON schema.
    // https://www.yaml.org/spec/1.2/spec.html#id2803231
    schema: qx
  });
  return n != null && n.title && ((o = e.setDiagramTitle) == null || o.call(e, n.title.toString())), n != null && n.displayMode && ((s = e.setDisplayMode) == null || s.call(e, n.displayMode.toString())), n != null && n.config && (i == null || i(n.config)), t.slice(r[0].length);
}
const Wx = (t) => t.trimStart().replace(/^\s*%%(?!{)[^\n]+\n?/gm, "");
class Zl {
  constructor(e) {
    this.text = e, this.type = "graph", this.text += `
`;
    const i = Ft();
    try {
      this.type = Cr(e, i);
    } catch (o) {
      this.type = "error", this.detectError = o;
    }
    const r = Kn(this.type);
    w.debug("Type " + this.type), this.db = r.db, this.renderer = r.renderer, this.parser = r.parser;
    const n = this.parser.parse.bind(this.parser);
    this.parser.parse = (o) => n(Wx(Kl(o, this.db, ir))), this.parser.parser.yy = this.db, this.init = r.init, this.parse();
  }
  parse() {
    var e, i, r;
    if (this.detectError)
      throw this.detectError;
    (i = (e = this.db).clear) == null || i.call(e), (r = this.init) == null || r.call(this, Ft()), this.parser.parse(this.text);
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
const eo = async (t) => {
  const e = Cr(t, Ft());
  try {
    Kn(e);
  } catch {
    const r = Tp(e);
    if (!r)
      throw new Aa(`Diagram ${e} not found.`);
    const { id: n, diagram: o } = await r();
    or(n, o);
  }
  return new Zl(t);
};
let Cn = [];
const h1 = (t) => {
  Cn.push(t);
}, Hx = () => {
  Cn.forEach((t) => {
    t();
  }), Cn = [];
};
var jx = Da(Object.keys, Object);
const Ux = jx;
var Yx = Object.prototype, Gx = Yx.hasOwnProperty;
function Vx(t) {
  if (!Sr(t))
    return Ux(t);
  var e = [];
  for (var i in Object(t))
    Gx.call(t, i) && i != "constructor" && e.push(i);
  return e;
}
var Xx = ye(Dt, "DataView");
const xn = Xx;
var Kx = ye(Dt, "Promise");
const bn = Kx;
var Zx = ye(Dt, "Set");
const Tn = Zx;
var Jx = ye(Dt, "WeakMap");
const Sn = Jx;
var Ts = "[object Map]", Qx = "[object Object]", Ss = "[object Promise]", vs = "[object Set]", ks = "[object WeakMap]", ws = "[object DataView]", tb = _e(xn), eb = _e(ii), ib = _e(bn), rb = _e(Tn), nb = _e(Sn), le = Ie;
(xn && le(new xn(new ArrayBuffer(1))) != ws || ii && le(new ii()) != Ts || bn && le(bn.resolve()) != Ss || Tn && le(new Tn()) != vs || Sn && le(new Sn()) != ks) && (le = function(t) {
  var e = Ie(t), i = e == Qx ? t.constructor : void 0, r = i ? _e(i) : "";
  if (r)
    switch (r) {
      case tb:
        return ws;
      case eb:
        return Ts;
      case ib:
        return Ss;
      case rb:
        return vs;
      case nb:
        return ks;
    }
  return e;
});
const ob = le;
var sb = "[object Map]", ab = "[object Set]", lb = Object.prototype, hb = lb.hasOwnProperty;
function Qr(t) {
  if (t == null)
    return !0;
  if (vr(t) && (Qi(t) || typeof t == "string" || typeof t.splice == "function" || zn(t) || Wn(t) || Ji(t)))
    return !t.length;
  var e = ob(t);
  if (e == sb || e == ab)
    return !t.size;
  if (Sr(t))
    return !Vx(t).length;
  for (var i in t)
    if (hb.call(t, i))
      return !1;
  return !0;
}
const cb = "graphics-document document";
function ub(t, e) {
  t.attr("role", cb), e !== "" && t.attr("aria-roledescription", e);
}
function fb(t, e, i, r) {
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
const Jl = [
  "graph",
  "flowchart",
  "flowchart-v2",
  "flowchart-elk",
  "stateDiagram",
  "stateDiagram-v2"
], db = 5e4, pb = "graph TB;a[Maximum text size in diagram exceeded];style a fill:#faa", gb = "sandbox", mb = "loose", _b = "http://www.w3.org/2000/svg", yb = "http://www.w3.org/1999/xlink", Cb = "http://www.w3.org/1999/xhtml", xb = "100%", bb = "100%", Tb = "border:0;margin:0;", Sb = "margin:0", vb = "allow-top-navigation-by-user-activation allow-popups", kb = 'The "iframe" tag is not supported by your browser.', wb = ["foreignobject"], Bb = ["dominant-baseline"];
async function Fb(t, e) {
  Zn();
  try {
    await eo(t);
  } catch (i) {
    if (e != null && e.suppressErrors)
      return !1;
    throw i;
  }
  return !0;
}
const Lb = function(t) {
  let e = t;
  return e = e.replace(/style.*:\S*#.*;/g, function(i) {
    return i.substring(0, i.length - 1);
  }), e = e.replace(/classDef.*:\S*#.*;/g, function(i) {
    return i.substring(0, i.length - 1);
  }), e = e.replace(/#\w+;/g, function(i) {
    const r = i.substring(1, i.length - 1);
    return /^\+?\d+$/.test(r) ? "ﬂ°°" + r + "¶ß" : "ﬂ°" + r + "¶ß";
  }), e;
}, Ab = function(t) {
  return t.replace(/ﬂ°°/g, "&#").replace(/ﬂ°/g, "&").replace(/¶ß/g, ";");
}, Bs = (t, e, i = []) => `
.${t} ${e} { ${i.join(" !important; ")} !important; }`, Eb = (t, e, i = {}) => {
  var n;
  let r = "";
  if (t.themeCSS !== void 0 && (r += `
${t.themeCSS}`), t.fontFamily !== void 0 && (r += `
:root { --mermaid-font-family: ${t.fontFamily}}`), t.altFontFamily !== void 0 && (r += `
:root { --mermaid-alt-font-family: ${t.altFontFamily}}`), !Qr(i) && Jl.includes(e)) {
    const l = t.htmlLabels || ((n = t.flowchart) == null ? void 0 : n.htmlLabels) ? ["> *", "span"] : ["rect", "polygon", "ellipse", "circle", "path"];
    for (const h in i) {
      const c = i[h];
      Qr(c.styles) || l.forEach((u) => {
        r += Bs(c.id, u, c.styles);
      }), Qr(c.textStyles) || (r += Bs(c.id, "tspan", c.textStyles));
    }
  }
  return r;
}, Ob = (t, e, i, r) => {
  const n = Eb(t, e, i), o = Wy(e, n, t.themeVariables);
  return _n(Qm(`${r}{${o}}`), e_);
}, Mb = (t = "", e, i) => {
  let r = t;
  return !i && !e && (r = r.replace(
    /marker-end="url\([\d+./:=?A-Za-z-]*?#/g,
    'marker-end="url(#'
  )), r = Ab(r), r = r.replace(/<br>/g, "<br/>"), r;
}, $b = (t = "", e) => {
  var n, o;
  const i = (o = (n = e == null ? void 0 : e.viewBox) == null ? void 0 : n.baseVal) != null && o.height ? e.viewBox.baseVal.height + "px" : bb, r = btoa('<body style="' + Sb + '">' + t + "</body>");
  return `<iframe style="width:${xb};height:${i};${Tb}" src="data:text/html;base64,${r}" sandbox="${vb}">
  ${kb}
</iframe>`;
}, Fs = (t, e, i, r, n) => {
  const o = t.append("div");
  o.attr("id", i), r && o.attr("style", r);
  const s = o.append("svg").attr("id", e).attr("width", "100%").attr("xmlns", _b);
  return n && s.attr("xmlns:xlink", n), s.append("g"), t;
};
function Ls(t, e) {
  return t.append("iframe").attr("id", e).attr("style", "width: 100%; height: 100%;").attr("sandbox", "");
}
const Ib = (t, e, i, r) => {
  var n, o, s;
  (n = t.getElementById(e)) == null || n.remove(), (o = t.getElementById(i)) == null || o.remove(), (s = t.getElementById(r)) == null || s.remove();
}, Db = async function(t, e, i) {
  var E, T, x, M;
  Zn(), rr(), Kl(e, {}, ir);
  const r = Di.detectInit(e);
  r && ir(r);
  const n = Ft();
  w.debug(n), e.length > ((n == null ? void 0 : n.maxTextSize) ?? db) && (e = pb), e = e.replace(/\r\n?/g, `
`), e = e.replace(
    /<(\w+)([^>]*)>/g,
    (y, D, k) => "<" + D + k.replace(/="([^"]*)"/g, "='$1'") + ">"
  );
  const o = "#" + t, s = "i" + t, a = "#" + s, l = "d" + t, h = "#" + l;
  let c = Ct("body");
  const u = n.securityLevel === gb, g = n.securityLevel === mb, p = n.fontFamily;
  if (i !== void 0) {
    if (i && (i.innerHTML = ""), u) {
      const y = Ls(Ct(i), s);
      c = Ct(y.nodes()[0].contentDocument.body), c.node().style.margin = 0;
    } else
      c = Ct(i);
    Fs(c, t, l, `font-family: ${p}`, yb);
  } else {
    if (Ib(document, t, l, s), u) {
      const y = Ls(Ct("body"), s);
      c = Ct(y.nodes()[0].contentDocument.body), c.node().style.margin = 0;
    } else
      c = Ct("body");
    Fs(c, t, l);
  }
  e = Lb(e);
  let _, v;
  try {
    _ = await eo(e);
  } catch (y) {
    _ = new Zl("error"), v = y;
  }
  const O = c.select(h).node(), P = _.type, S = O.firstChild, z = S.firstChild, Q = Jl.includes(P) ? _.renderer.getClasses(e, _) : {}, X = Ob(n, P, Q, o), G = document.createElement("style");
  G.innerHTML = X, S.insertBefore(G, z);
  try {
    await _.renderer.draw(e, t, fs, _);
  } catch (y) {
    throw by.draw(e, t, fs), y;
  }
  const W = c.select(`${h} svg`), Vt = (T = (E = _.db).getAccTitle) == null ? void 0 : T.call(E), K = (M = (x = _.db).getAccDescription) == null ? void 0 : M.call(x);
  Rb(P, W, Vt, K), c.select(`[id="${t}"]`).selectAll("foreignobject > *").attr("xmlns", Cb);
  let I = c.select(h).node().innerHTML;
  if (w.debug("config.arrowMarkerAbsolute", n.arrowMarkerAbsolute), I = Mb(I, u, Ta(n.arrowMarkerAbsolute)), u) {
    const y = c.select(h + " svg").node();
    I = $b(I, y);
  } else
    g || (I = Xi.sanitize(I, {
      ADD_TAGS: wb,
      ADD_ATTR: Bb
    }));
  if (Hx(), v)
    throw v;
  const At = Ct(u ? a : h).node();
  return At && "remove" in At && At.remove(), {
    svg: I,
    bindFunctions: _.db.bindFunctions
  };
};
function Nb(t = {}) {
  var i;
  t != null && t.fontFamily && !((i = t.themeVariables) != null && i.fontFamily) && (t.themeVariables || (t.themeVariables = {}), t.themeVariables.fontFamily = t.fontFamily), r_(t), t != null && t.theme && t.theme in Ut ? t.themeVariables = Ut[t.theme].getThemeVariables(
    t.themeVariables
  ) : t && (t.themeVariables = Ut.default.getThemeVariables(t.themeVariables));
  const e = typeof t == "object" ? i_(t) : rl();
  vn(e.logLevel), Zn();
}
function Rb(t, e, i, r) {
  ub(e, t), fb(e, i, r, e.attr("id"));
}
const ge = Object.freeze({
  render: Db,
  parse: Fb,
  parseDirective: Il,
  getDiagramFromText: eo,
  initialize: Nb,
  getConfig: Ft,
  setConfig: o_,
  getSiteConfig: rl,
  updateSiteConfig: n_,
  reset: () => {
    rr();
  },
  globalReset: () => {
    rr(si);
  },
  defaultConfig: si
});
vn(Ft().logLevel);
rr(Ft());
const Pb = async () => {
  w.debug("Loading registered diagrams");
  const e = (await Promise.allSettled(
    Object.entries(Ee).map(async ([i, { detector: r, loader: n }]) => {
      if (n)
        try {
          Kn(i);
        } catch {
          try {
            const { diagram: s, id: a } = await n();
            or(a, s, r);
          } catch (s) {
            throw w.error(`Failed to load external diagram with key ${i}. Removing from detectors.`), delete Ee[i], s;
          }
        }
    })
  )).filter((i) => i.status === "rejected");
  if (e.length > 0) {
    w.error(`Failed to load ${e.length} external diagrams`);
    for (const i of e)
      w.error(i);
    throw new Error(`Failed to load ${e.length} external diagrams`);
  }
}, qb = (t, e, i) => {
  w.warn(t), Xa(t) ? (i && i(t.str, t.hash), e.push({ ...t, message: t.str, error: t })) : (i && i(t), t instanceof Error && e.push({
    str: t.message,
    message: t.message,
    hash: t.name,
    error: t
  }));
}, Ql = async function(t = {
  querySelector: ".mermaid"
}) {
  try {
    await zb(t);
  } catch (e) {
    if (Xa(e) && w.error(e.str), xt.parseError && xt.parseError(e), !t.suppressErrors)
      throw w.error("Use the suppressErrors option to suppress these errors"), e;
  }
}, zb = async function({ postRenderCallback: t, querySelector: e, nodes: i } = {
  querySelector: ".mermaid"
}) {
  const r = ge.getConfig();
  w.debug(`${t ? "" : "No "}Callback function found`);
  let n;
  if (i)
    n = i;
  else if (e)
    n = document.querySelectorAll(e);
  else
    throw new Error("Nodes and querySelector are both undefined");
  w.debug(`Found ${n.length} diagrams`), (r == null ? void 0 : r.startOnLoad) !== void 0 && (w.debug("Start On Load: " + (r == null ? void 0 : r.startOnLoad)), ge.updateSiteConfig({ startOnLoad: r == null ? void 0 : r.startOnLoad }));
  const o = new Di.initIdGenerator(r.deterministicIds, r.deterministicIDSeed);
  let s;
  const a = [];
  for (const l of Array.from(n)) {
    w.info("Rendering diagram: " + l.id);
    /*! Check if previously processed */
    if (l.getAttribute("data-processed"))
      continue;
    l.setAttribute("data-processed", "true");
    const h = `mermaid-${o.next()}`;
    s = l.innerHTML, s = dh(Di.entityDecode(s)).trim().replace(/<br\s*\/?>/gi, "<br/>");
    const c = Di.detectInit(s);
    c && w.debug("Detected early reinit: ", c);
    try {
      const { svg: u, bindFunctions: g } = await rh(h, s, l);
      l.innerHTML = u, t && await t(h), g && g(l);
    } catch (u) {
      qb(u, a, xt.parseError);
    }
  }
  if (a.length > 0)
    throw a[0];
}, th = function(t) {
  ge.initialize(t);
}, Wb = async function(t, e, i) {
  w.warn("mermaid.init is deprecated. Please use run instead."), t && th(t);
  const r = { postRenderCallback: i, querySelector: ".mermaid" };
  typeof e == "string" ? r.querySelector = e : e && (e instanceof HTMLElement ? r.nodes = [e] : r.nodes = e), await Ql(r);
}, Hb = async (t, {
  lazyLoad: e = !0
} = {}) => {
  Ea(...t), e === !1 && await Pb();
}, eh = function() {
  if (xt.startOnLoad) {
    const { startOnLoad: t } = ge.getConfig();
    t && xt.run().catch((e) => w.error("Mermaid failed to initialize", e));
  }
};
if (typeof document < "u") {
  /*!
   * Wait for document loaded before starting the execution
   */
  window.addEventListener("load", eh, !1);
}
const jb = function(t) {
  xt.parseError = t;
}, hr = [];
let tn = !1;
const ih = async () => {
  if (!tn) {
    for (tn = !0; hr.length > 0; ) {
      const t = hr.shift();
      if (t)
        try {
          await t();
        } catch (e) {
          w.error("Error executing queue", e);
        }
    }
    tn = !1;
  }
}, Ub = async (t, e) => new Promise((i, r) => {
  const n = () => new Promise((o, s) => {
    ge.parse(t, e).then(
      (a) => {
        o(a), i(a);
      },
      (a) => {
        var l;
        w.error("Error parsing", a), (l = xt.parseError) == null || l.call(xt, a), s(a), r(a);
      }
    );
  });
  hr.push(n), ih().catch(r);
}), rh = (t, e, i) => new Promise((r, n) => {
  const o = () => new Promise((s, a) => {
    ge.render(t, e, i).then(
      (l) => {
        s(l), r(l);
      },
      (l) => {
        var h;
        w.error("Error parsing", l), (h = xt.parseError) == null || h.call(xt, l), a(l), n(l);
      }
    );
  });
  hr.push(o), ih().catch(n);
}), xt = {
  startOnLoad: !0,
  mermaidAPI: ge,
  parse: Ub,
  render: rh,
  init: Wb,
  run: Ql,
  registerExternalDiagrams: Hb,
  initialize: th,
  parseError: void 0,
  contentLoaded: eh,
  setParseErrorHandler: jb,
  detectType: Cr
};
export {
  qm as $,
  Di as A,
  Ge as B,
  $t as C,
  Ml as D,
  $l as E,
  Fl as F,
  Uf as G,
  Dd as H,
  Em as I,
  Dl as J,
  Xy as K,
  Fn as L,
  Us as M,
  hi as N,
  _u as O,
  Vs as P,
  Gb as Q,
  ft as R,
  mt as S,
  ph as T,
  gh as U,
  _h as V,
  my as W,
  e1 as X,
  xp as Y,
  Il as Z,
  $ as _,
  Ol as a,
  Do as a$,
  jn as a0,
  pp as a1,
  Ln as a2,
  Qt as a3,
  Je as a4,
  Lo as a5,
  vu as a6,
  h1 as a7,
  mm as a8,
  Lm as a9,
  ne as aA,
  xr as aB,
  es as aC,
  Wn as aD,
  Pa as aE,
  Ha as aF,
  Ya as aG,
  $g as aH,
  Dt as aI,
  um as aJ,
  fm as aK,
  qn as aL,
  Tn as aM,
  Jg as aN,
  im as aO,
  Qr as aP,
  gm as aQ,
  gr as aR,
  si as aS,
  Ab as aT,
  jy as aU,
  ci as aV,
  F as aW,
  A as aX,
  Mn as aY,
  Kb as aZ,
  Qb as a_,
  fi as aa,
  Ie as ab,
  Ki as ac,
  Qi as ad,
  me as ae,
  vr as af,
  G0 as ag,
  Vx as ah,
  ui as ai,
  Ji as aj,
  cm as ak,
  em as al,
  z0 as am,
  ja as an,
  Na as ao,
  Rg as ap,
  Pg as aq,
  ob as ar,
  ss as as,
  $0 as at,
  qg as au,
  zn as av,
  Dg as aw,
  Ug as ax,
  De as ay,
  q0 as az,
  El as b,
  Io as b0,
  t1 as b1,
  Jb as b2,
  Vb as b3,
  Xb as b4,
  r1 as b5,
  i1 as b6,
  Zb as b7,
  dh as b8,
  xt as b9,
  Ft as c,
  ti as d,
  Es as e,
  Rn as f,
  Al as g,
  nt as h,
  er as i,
  Ct as j,
  Tl as k,
  w as l,
  ge as m,
  Dm as n,
  Wf as o,
  Fm as p,
  Ta as q,
  bm as r,
  Ll as s,
  Cy as t,
  o_ as u,
  js as v,
  $m as w,
  $h as x,
  l0 as y,
  Pn as z
};
