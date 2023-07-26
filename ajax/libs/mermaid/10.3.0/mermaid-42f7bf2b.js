function Pl(t) {
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
var zl = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Wl(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var cs = { exports: {} };
(function(t, e) {
  (function(i, r) {
    t.exports = r();
  })(zl, function() {
    var i = 1e3, r = 6e4, n = 36e5, o = "millisecond", s = "second", a = "minute", l = "hour", h = "day", c = "week", u = "month", g = "quarter", p = "year", _ = "date", v = "Invalid Date", M = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, q = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, k = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(E) {
      var T = ["th", "st", "nd", "rd"], x = E % 100;
      return "[" + E + (T[(x - 20) % 10] || T[x] || T[0]) + "]";
    } }, z = function(E, T, x) {
      var O = String(E);
      return !O || O.length >= T ? E : "" + Array(T + 1 - O.length).join(x) + E;
    }, Q = { s: z, z: function(E) {
      var T = -E.utcOffset(), x = Math.abs(T), O = Math.floor(x / 60), y = x % 60;
      return (T <= 0 ? "+" : "-") + z(O, 2, "0") + ":" + z(y, 2, "0");
    }, m: function E(T, x) {
      if (T.date() < x.date())
        return -E(x, T);
      var O = 12 * (x.year() - T.year()) + (x.month() - T.month()), y = T.clone().add(O, u), D = x - y < 0, w = T.clone().add(O + (D ? -1 : 1), u);
      return +(-(O + (x - y) / (D ? y - w : w - y)) || 0);
    }, a: function(E) {
      return E < 0 ? Math.ceil(E) || 0 : Math.floor(E);
    }, p: function(E) {
      return { M: u, y: p, w: c, d: h, D: _, h: l, m: a, s, ms: o, Q: g }[E] || String(E || "").toLowerCase().replace(/s$/, "");
    }, u: function(E) {
      return E === void 0;
    } }, X = "en", G = {};
    G[X] = k;
    var W = function(E) {
      return E instanceof $t;
    }, Yt = function E(T, x, O) {
      var y;
      if (!T)
        return X;
      if (typeof T == "string") {
        var D = T.toLowerCase();
        G[D] && (y = D), x && (G[D] = x, y = D);
        var w = T.split("-");
        if (!y && w.length > 1)
          return E(w[0]);
      } else {
        var H = T.name;
        G[H] = T, y = H;
      }
      return !O && y && (X = y), y || !O && X;
    }, K = function(E, T) {
      if (W(E))
        return E.clone();
      var x = typeof T == "object" ? T : {};
      return x.date = E, x.args = arguments, new $t(x);
    }, $ = Q;
    $.l = Yt, $.i = W, $.w = function(E, T) {
      return K(E, { locale: T.$L, utc: T.$u, x: T.$x, $offset: T.$offset });
    };
    var $t = function() {
      function E(x) {
        this.$L = Yt(x.locale, null, !0), this.parse(x);
      }
      var T = E.prototype;
      return T.parse = function(x) {
        this.$d = function(O) {
          var y = O.date, D = O.utc;
          if (y === null)
            return /* @__PURE__ */ new Date(NaN);
          if ($.u(y))
            return /* @__PURE__ */ new Date();
          if (y instanceof Date)
            return new Date(y);
          if (typeof y == "string" && !/Z$/i.test(y)) {
            var w = y.match(M);
            if (w) {
              var H = w[2] - 1 || 0, R = (w[7] || "0").substring(0, 3);
              return D ? new Date(Date.UTC(w[1], H, w[3] || 1, w[4] || 0, w[5] || 0, w[6] || 0, R)) : new Date(w[1], H, w[3] || 1, w[4] || 0, w[5] || 0, w[6] || 0, R);
            }
          }
          return new Date(y);
        }(x), this.$x = x.x || {}, this.init();
      }, T.init = function() {
        var x = this.$d;
        this.$y = x.getFullYear(), this.$M = x.getMonth(), this.$D = x.getDate(), this.$W = x.getDay(), this.$H = x.getHours(), this.$m = x.getMinutes(), this.$s = x.getSeconds(), this.$ms = x.getMilliseconds();
      }, T.$utils = function() {
        return $;
      }, T.isValid = function() {
        return this.$d.toString() !== v;
      }, T.isSame = function(x, O) {
        var y = K(x);
        return this.startOf(O) <= y && y <= this.endOf(O);
      }, T.isAfter = function(x, O) {
        return K(x) < this.startOf(O);
      }, T.isBefore = function(x, O) {
        return this.endOf(O) < K(x);
      }, T.$g = function(x, O, y) {
        return $.u(x) ? this[O] : this.set(y, x);
      }, T.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, T.valueOf = function() {
        return this.$d.getTime();
      }, T.startOf = function(x, O) {
        var y = this, D = !!$.u(O) || O, w = $.p(x), H = function(Nt, it) {
          var st = $.w(y.$u ? Date.UTC(y.$y, it, Nt) : new Date(y.$y, it, Nt), y);
          return D ? st : st.endOf(h);
        }, R = function(Nt, it) {
          return $.w(y.toDate()[Nt].apply(y.toDate("s"), (D ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(it)), y);
        }, U = this.$W, P = this.$M, ct = this.$D, pt = "set" + (this.$u ? "UTC" : "");
        switch (w) {
          case p:
            return D ? H(1, 0) : H(31, 11);
          case u:
            return D ? H(1, P) : H(0, P + 1);
          case c:
            var Gt = this.$locale().weekStart || 0, Dt = (U < Gt ? U + 7 : U) - Gt;
            return H(D ? ct - Dt : ct + (6 - Dt), P);
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
      }, T.$set = function(x, O) {
        var y, D = $.p(x), w = "set" + (this.$u ? "UTC" : ""), H = (y = {}, y[h] = w + "Date", y[_] = w + "Date", y[u] = w + "Month", y[p] = w + "FullYear", y[l] = w + "Hours", y[a] = w + "Minutes", y[s] = w + "Seconds", y[o] = w + "Milliseconds", y)[D], R = D === h ? this.$D + (O - this.$W) : O;
        if (D === u || D === p) {
          var U = this.clone().set(_, 1);
          U.$d[H](R), U.init(), this.$d = U.set(_, Math.min(this.$D, U.daysInMonth())).$d;
        } else
          H && this.$d[H](R);
        return this.init(), this;
      }, T.set = function(x, O) {
        return this.clone().$set(x, O);
      }, T.get = function(x) {
        return this[$.p(x)]();
      }, T.add = function(x, O) {
        var y, D = this;
        x = Number(x);
        var w = $.p(O), H = function(P) {
          var ct = K(D);
          return $.w(ct.date(ct.date() + Math.round(P * x)), D);
        };
        if (w === u)
          return this.set(u, this.$M + x);
        if (w === p)
          return this.set(p, this.$y + x);
        if (w === h)
          return H(1);
        if (w === c)
          return H(7);
        var R = (y = {}, y[a] = r, y[l] = n, y[s] = i, y)[w] || 1, U = this.$d.getTime() + x * R;
        return $.w(U, this);
      }, T.subtract = function(x, O) {
        return this.add(-1 * x, O);
      }, T.format = function(x) {
        var O = this, y = this.$locale();
        if (!this.isValid())
          return y.invalidDate || v;
        var D = x || "YYYY-MM-DDTHH:mm:ssZ", w = $.z(this), H = this.$H, R = this.$m, U = this.$M, P = y.weekdays, ct = y.months, pt = function(it, st, Tt, Vt) {
          return it && (it[st] || it(O, D)) || Tt[st].slice(0, Vt);
        }, Gt = function(it) {
          return $.s(H % 12 || 12, it, "0");
        }, Dt = y.meridiem || function(it, st, Tt) {
          var Vt = it < 12 ? "AM" : "PM";
          return Tt ? Vt.toLowerCase() : Vt;
        }, Nt = { YY: String(this.$y).slice(-2), YYYY: this.$y, M: U + 1, MM: $.s(U + 1, 2, "0"), MMM: pt(y.monthsShort, U, ct, 3), MMMM: pt(ct, U), D: this.$D, DD: $.s(this.$D, 2, "0"), d: String(this.$W), dd: pt(y.weekdaysMin, this.$W, P, 2), ddd: pt(y.weekdaysShort, this.$W, P, 3), dddd: P[this.$W], H: String(H), HH: $.s(H, 2, "0"), h: Gt(1), hh: Gt(2), a: Dt(H, R, !0), A: Dt(H, R, !1), m: String(R), mm: $.s(R, 2, "0"), s: String(this.$s), ss: $.s(this.$s, 2, "0"), SSS: $.s(this.$ms, 3, "0"), Z: w };
        return D.replace(q, function(it, st) {
          return st || Nt[it] || w.replace(":", "");
        });
      }, T.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, T.diff = function(x, O, y) {
        var D, w = $.p(O), H = K(x), R = (H.utcOffset() - this.utcOffset()) * r, U = this - H, P = $.m(this, H);
        return P = (D = {}, D[p] = P / 12, D[u] = P, D[g] = P / 3, D[c] = (U - R) / 6048e5, D[h] = (U - R) / 864e5, D[l] = U / n, D[a] = U / r, D[s] = U / i, D)[w] || U, y ? P : $.a(P);
      }, T.daysInMonth = function() {
        return this.endOf(u).$D;
      }, T.$locale = function() {
        return G[this.$L];
      }, T.locale = function(x, O) {
        if (!x)
          return this.$L;
        var y = this.clone(), D = Yt(x, O, !0);
        return D && (y.$L = D), y;
      }, T.clone = function() {
        return $.w(this.$d, this);
      }, T.toDate = function() {
        return new Date(this.valueOf());
      }, T.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, T.toISOString = function() {
        return this.$d.toISOString();
      }, T.toString = function() {
        return this.$d.toUTCString();
      }, E;
    }(), Ft = $t.prototype;
    return K.prototype = Ft, [["$ms", o], ["$s", s], ["$m", a], ["$H", l], ["$W", h], ["$M", u], ["$y", p], ["$D", _]].forEach(function(E) {
      Ft[E[1]] = function(T) {
        return this.$g(T, E[0], E[1]);
      };
    }), K.extend = function(E, T) {
      return E.$i || (E(T, $t, K), E.$i = !0), K;
    }, K.locale = Yt, K.isDayjs = W, K.unix = function(E) {
      return K(1e3 * E);
    }, K.en = G[X], K.Ls = G, K.p = {}, K;
  });
})(cs);
var Hl = cs.exports;
const jl = /* @__PURE__ */ Wl(Hl), Pt = {
  trace: 0,
  debug: 1,
  info: 2,
  warn: 3,
  error: 4,
  fatal: 5
}, S = {
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
}, dn = function(t = "fatal") {
  let e = Pt.fatal;
  typeof t == "string" ? (t = t.toLowerCase(), t in Pt && (e = Pt[t])) : typeof t == "number" && (e = t), S.trace = () => {
  }, S.debug = () => {
  }, S.info = () => {
  }, S.warn = () => {
  }, S.error = () => {
  }, S.fatal = () => {
  }, e <= Pt.fatal && (S.fatal = console.error ? console.error.bind(console, yt("FATAL"), "color: orange") : console.log.bind(console, "\x1B[35m", yt("FATAL"))), e <= Pt.error && (S.error = console.error ? console.error.bind(console, yt("ERROR"), "color: orange") : console.log.bind(console, "\x1B[31m", yt("ERROR"))), e <= Pt.warn && (S.warn = console.warn ? console.warn.bind(console, yt("WARN"), "color: orange") : console.log.bind(console, "\x1B[33m", yt("WARN"))), e <= Pt.info && (S.info = console.info ? console.info.bind(console, yt("INFO"), "color: lightblue") : console.log.bind(console, "\x1B[34m", yt("INFO"))), e <= Pt.debug && (S.debug = console.debug ? console.debug.bind(console, yt("DEBUG"), "color: lightgreen") : console.log.bind(console, "\x1B[32m", yt("DEBUG"))), e <= Pt.trace && (S.trace = console.debug ? console.debug.bind(console, yt("TRACE"), "color: lightgreen") : console.log.bind(console, "\x1B[32m", yt("TRACE")));
}, yt = (t) => `%c${jl().format("ss.SSS")} : ${t} : `;
var pn = {};
Object.defineProperty(pn, "__esModule", { value: !0 });
var us = pn.sanitizeUrl = void 0, Ul = /^([^\w]*)(javascript|data|vbscript)/im, Yl = /&#(\w+)(^\w|;)?/g, Gl = /&(newline|tab);/gi, Vl = /[\u0000-\u001F\u007F-\u009F\u2000-\u200D\uFEFF]/gim, Xl = /^.+(:|&colon;)/gim, Kl = [".", "/"];
function Zl(t) {
  return Kl.indexOf(t[0]) > -1;
}
function Jl(t) {
  return t.replace(Yl, function(e, i) {
    return String.fromCharCode(i);
  });
}
function Ql(t) {
  var e = Jl(t || "").replace(Gl, "").replace(Vl, "").trim();
  if (!e)
    return "about:blank";
  if (Zl(e))
    return e;
  var i = e.match(Xl);
  if (!i)
    return e;
  var r = i[0];
  return Ul.test(r) ? "about:blank" : e;
}
us = pn.sanitizeUrl = Ql;
var th = { value: () => {
} };
function fs() {
  for (var t = 0, e = arguments.length, i = {}, r; t < e; ++t) {
    if (!(r = arguments[t] + "") || r in i || /[\s.]/.test(r))
      throw new Error("illegal type: " + r);
    i[r] = [];
  }
  return new ki(i);
}
function ki(t) {
  this._ = t;
}
function eh(t, e) {
  return t.trim().split(/^|\s+/).map(function(i) {
    var r = "", n = i.indexOf(".");
    if (n >= 0 && (r = i.slice(n + 1), i = i.slice(0, n)), i && !e.hasOwnProperty(i))
      throw new Error("unknown type: " + i);
    return { type: i, name: r };
  });
}
ki.prototype = fs.prototype = {
  constructor: ki,
  on: function(t, e) {
    var i = this._, r = eh(t + "", i), n, o = -1, s = r.length;
    if (arguments.length < 2) {
      for (; ++o < s; )
        if ((n = (t = r[o]).type) && (n = ih(i[n], t.name)))
          return n;
      return;
    }
    if (e != null && typeof e != "function")
      throw new Error("invalid callback: " + e);
    for (; ++o < s; )
      if (n = (t = r[o]).type)
        i[n] = no(i[n], t.name, e);
      else if (e == null)
        for (n in i)
          i[n] = no(i[n], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, e = this._;
    for (var i in e)
      t[i] = e[i].slice();
    return new ki(t);
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
function ih(t, e) {
  for (var i = 0, r = t.length, n; i < r; ++i)
    if ((n = t[i]).name === e)
      return n.value;
}
function no(t, e, i) {
  for (var r = 0, n = t.length; r < n; ++r)
    if (t[r].name === e) {
      t[r] = th, t = t.slice(0, r).concat(t.slice(r + 1));
      break;
    }
  return i != null && t.push({ name: e, value: i }), t;
}
var Yr = "http://www.w3.org/1999/xhtml";
const oo = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Yr,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function rr(t) {
  var e = t += "", i = e.indexOf(":");
  return i >= 0 && (e = t.slice(0, i)) !== "xmlns" && (t = t.slice(i + 1)), oo.hasOwnProperty(e) ? { space: oo[e], local: t } : t;
}
function rh(t) {
  return function() {
    var e = this.ownerDocument, i = this.namespaceURI;
    return i === Yr && e.documentElement.namespaceURI === Yr ? e.createElement(t) : e.createElementNS(i, t);
  };
}
function nh(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function ds(t) {
  var e = rr(t);
  return (e.local ? nh : rh)(e);
}
function oh() {
}
function gn(t) {
  return t == null ? oh : function() {
    return this.querySelector(t);
  };
}
function sh(t) {
  typeof t != "function" && (t = gn(t));
  for (var e = this._groups, i = e.length, r = new Array(i), n = 0; n < i; ++n)
    for (var o = e[n], s = o.length, a = r[n] = new Array(s), l, h, c = 0; c < s; ++c)
      (l = o[c]) && (h = t.call(l, l.__data__, c, o)) && ("__data__" in l && (h.__data__ = l.__data__), a[c] = h);
  return new mt(r, this._parents);
}
function ah(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function lh() {
  return [];
}
function ps(t) {
  return t == null ? lh : function() {
    return this.querySelectorAll(t);
  };
}
function hh(t) {
  return function() {
    return ah(t.apply(this, arguments));
  };
}
function ch(t) {
  typeof t == "function" ? t = hh(t) : t = ps(t);
  for (var e = this._groups, i = e.length, r = [], n = [], o = 0; o < i; ++o)
    for (var s = e[o], a = s.length, l, h = 0; h < a; ++h)
      (l = s[h]) && (r.push(t.call(l, l.__data__, h, s)), n.push(l));
  return new mt(r, n);
}
function gs(t) {
  return function() {
    return this.matches(t);
  };
}
function ms(t) {
  return function(e) {
    return e.matches(t);
  };
}
var uh = Array.prototype.find;
function fh(t) {
  return function() {
    return uh.call(this.children, t);
  };
}
function dh() {
  return this.firstElementChild;
}
function ph(t) {
  return this.select(t == null ? dh : fh(typeof t == "function" ? t : ms(t)));
}
var gh = Array.prototype.filter;
function mh() {
  return Array.from(this.children);
}
function _h(t) {
  return function() {
    return gh.call(this.children, t);
  };
}
function yh(t) {
  return this.selectAll(t == null ? mh : _h(typeof t == "function" ? t : ms(t)));
}
function Ch(t) {
  typeof t != "function" && (t = gs(t));
  for (var e = this._groups, i = e.length, r = new Array(i), n = 0; n < i; ++n)
    for (var o = e[n], s = o.length, a = r[n] = [], l, h = 0; h < s; ++h)
      (l = o[h]) && t.call(l, l.__data__, h, o) && a.push(l);
  return new mt(r, this._parents);
}
function _s(t) {
  return new Array(t.length);
}
function xh() {
  return new mt(this._enter || this._groups.map(_s), this._parents);
}
function Di(t, e) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = e;
}
Di.prototype = {
  constructor: Di,
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
function bh(t) {
  return function() {
    return t;
  };
}
function Th(t, e, i, r, n, o) {
  for (var s = 0, a, l = e.length, h = o.length; s < h; ++s)
    (a = e[s]) ? (a.__data__ = o[s], r[s] = a) : i[s] = new Di(t, o[s]);
  for (; s < l; ++s)
    (a = e[s]) && (n[s] = a);
}
function Sh(t, e, i, r, n, o, s) {
  var a, l, h = /* @__PURE__ */ new Map(), c = e.length, u = o.length, g = new Array(c), p;
  for (a = 0; a < c; ++a)
    (l = e[a]) && (g[a] = p = s.call(l, l.__data__, a, e) + "", h.has(p) ? n[a] = l : h.set(p, l));
  for (a = 0; a < u; ++a)
    p = s.call(t, o[a], a, o) + "", (l = h.get(p)) ? (r[a] = l, l.__data__ = o[a], h.delete(p)) : i[a] = new Di(t, o[a]);
  for (a = 0; a < c; ++a)
    (l = e[a]) && h.get(g[a]) === l && (n[a] = l);
}
function kh(t) {
  return t.__data__;
}
function vh(t, e) {
  if (!arguments.length)
    return Array.from(this, kh);
  var i = e ? Sh : Th, r = this._parents, n = this._groups;
  typeof t != "function" && (t = bh(t));
  for (var o = n.length, s = new Array(o), a = new Array(o), l = new Array(o), h = 0; h < o; ++h) {
    var c = r[h], u = n[h], g = u.length, p = wh(t.call(c, c && c.__data__, h, r)), _ = p.length, v = a[h] = new Array(_), M = s[h] = new Array(_), q = l[h] = new Array(g);
    i(c, u, v, M, q, p, e);
    for (var k = 0, z = 0, Q, X; k < _; ++k)
      if (Q = v[k]) {
        for (k >= z && (z = k + 1); !(X = M[z]) && ++z < _; )
          ;
        Q._next = X || null;
      }
  }
  return s = new mt(s, r), s._enter = a, s._exit = l, s;
}
function wh(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function Bh() {
  return new mt(this._exit || this._groups.map(_s), this._parents);
}
function Fh(t, e, i) {
  var r = this.enter(), n = this, o = this.exit();
  return typeof t == "function" ? (r = t(r), r && (r = r.selection())) : r = r.append(t + ""), e != null && (n = e(n), n && (n = n.selection())), i == null ? o.remove() : i(o), r && n ? r.merge(n).order() : n;
}
function Lh(t) {
  for (var e = t.selection ? t.selection() : t, i = this._groups, r = e._groups, n = i.length, o = r.length, s = Math.min(n, o), a = new Array(n), l = 0; l < s; ++l)
    for (var h = i[l], c = r[l], u = h.length, g = a[l] = new Array(u), p, _ = 0; _ < u; ++_)
      (p = h[_] || c[_]) && (g[_] = p);
  for (; l < n; ++l)
    a[l] = i[l];
  return new mt(a, this._parents);
}
function Ah() {
  for (var t = this._groups, e = -1, i = t.length; ++e < i; )
    for (var r = t[e], n = r.length - 1, o = r[n], s; --n >= 0; )
      (s = r[n]) && (o && s.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(s, o), o = s);
  return this;
}
function Eh(t) {
  t || (t = Mh);
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
function Mh(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function Oh() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function Ih() {
  return Array.from(this);
}
function $h() {
  for (var t = this._groups, e = 0, i = t.length; e < i; ++e)
    for (var r = t[e], n = 0, o = r.length; n < o; ++n) {
      var s = r[n];
      if (s)
        return s;
    }
  return null;
}
function Dh() {
  let t = 0;
  for (const e of this)
    ++t;
  return t;
}
function Nh() {
  return !this.node();
}
function Rh(t) {
  for (var e = this._groups, i = 0, r = e.length; i < r; ++i)
    for (var n = e[i], o = 0, s = n.length, a; o < s; ++o)
      (a = n[o]) && t.call(a, a.__data__, o, n);
  return this;
}
function qh(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Ph(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function zh(t, e) {
  return function() {
    this.setAttribute(t, e);
  };
}
function Wh(t, e) {
  return function() {
    this.setAttributeNS(t.space, t.local, e);
  };
}
function Hh(t, e) {
  return function() {
    var i = e.apply(this, arguments);
    i == null ? this.removeAttribute(t) : this.setAttribute(t, i);
  };
}
function jh(t, e) {
  return function() {
    var i = e.apply(this, arguments);
    i == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, i);
  };
}
function Uh(t, e) {
  var i = rr(t);
  if (arguments.length < 2) {
    var r = this.node();
    return i.local ? r.getAttributeNS(i.space, i.local) : r.getAttribute(i);
  }
  return this.each((e == null ? i.local ? Ph : qh : typeof e == "function" ? i.local ? jh : Hh : i.local ? Wh : zh)(i, e));
}
function ys(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function Yh(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Gh(t, e, i) {
  return function() {
    this.style.setProperty(t, e, i);
  };
}
function Vh(t, e, i) {
  return function() {
    var r = e.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, i);
  };
}
function Xh(t, e, i) {
  return arguments.length > 1 ? this.each((e == null ? Yh : typeof e == "function" ? Vh : Gh)(t, e, i ?? "")) : we(this.node(), t);
}
function we(t, e) {
  return t.style.getPropertyValue(e) || ys(t).getComputedStyle(t, null).getPropertyValue(e);
}
function Kh(t) {
  return function() {
    delete this[t];
  };
}
function Zh(t, e) {
  return function() {
    this[t] = e;
  };
}
function Jh(t, e) {
  return function() {
    var i = e.apply(this, arguments);
    i == null ? delete this[t] : this[t] = i;
  };
}
function Qh(t, e) {
  return arguments.length > 1 ? this.each((e == null ? Kh : typeof e == "function" ? Jh : Zh)(t, e)) : this.node()[t];
}
function Cs(t) {
  return t.trim().split(/^|\s+/);
}
function mn(t) {
  return t.classList || new xs(t);
}
function xs(t) {
  this._node = t, this._names = Cs(t.getAttribute("class") || "");
}
xs.prototype = {
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
function bs(t, e) {
  for (var i = mn(t), r = -1, n = e.length; ++r < n; )
    i.add(e[r]);
}
function Ts(t, e) {
  for (var i = mn(t), r = -1, n = e.length; ++r < n; )
    i.remove(e[r]);
}
function tc(t) {
  return function() {
    bs(this, t);
  };
}
function ec(t) {
  return function() {
    Ts(this, t);
  };
}
function ic(t, e) {
  return function() {
    (e.apply(this, arguments) ? bs : Ts)(this, t);
  };
}
function rc(t, e) {
  var i = Cs(t + "");
  if (arguments.length < 2) {
    for (var r = mn(this.node()), n = -1, o = i.length; ++n < o; )
      if (!r.contains(i[n]))
        return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? ic : e ? tc : ec)(i, e));
}
function nc() {
  this.textContent = "";
}
function oc(t) {
  return function() {
    this.textContent = t;
  };
}
function sc(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.textContent = e ?? "";
  };
}
function ac(t) {
  return arguments.length ? this.each(t == null ? nc : (typeof t == "function" ? sc : oc)(t)) : this.node().textContent;
}
function lc() {
  this.innerHTML = "";
}
function hc(t) {
  return function() {
    this.innerHTML = t;
  };
}
function cc(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function uc(t) {
  return arguments.length ? this.each(t == null ? lc : (typeof t == "function" ? cc : hc)(t)) : this.node().innerHTML;
}
function fc() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function dc() {
  return this.each(fc);
}
function pc() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function gc() {
  return this.each(pc);
}
function mc(t) {
  var e = typeof t == "function" ? t : ds(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function _c() {
  return null;
}
function yc(t, e) {
  var i = typeof t == "function" ? t : ds(t), r = e == null ? _c : typeof e == "function" ? e : gn(e);
  return this.select(function() {
    return this.insertBefore(i.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function Cc() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function xc() {
  return this.each(Cc);
}
function bc() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Tc() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Sc(t) {
  return this.select(t ? Tc : bc);
}
function kc(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function vc(t) {
  return function(e) {
    t.call(this, e, this.__data__);
  };
}
function wc(t) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var i = "", r = e.indexOf(".");
    return r >= 0 && (i = e.slice(r + 1), e = e.slice(0, r)), { type: e, name: i };
  });
}
function Bc(t) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var i = 0, r = -1, n = e.length, o; i < n; ++i)
        o = e[i], (!t.type || o.type === t.type) && o.name === t.name ? this.removeEventListener(o.type, o.listener, o.options) : e[++r] = o;
      ++r ? e.length = r : delete this.__on;
    }
  };
}
function Fc(t, e, i) {
  return function() {
    var r = this.__on, n, o = vc(e);
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
function Lc(t, e, i) {
  var r = wc(t + ""), n, o = r.length, s;
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
  for (a = e ? Fc : Bc, n = 0; n < o; ++n)
    this.each(a(r[n], e, i));
  return this;
}
function Ss(t, e, i) {
  var r = ys(t), n = r.CustomEvent;
  typeof n == "function" ? n = new n(e, i) : (n = r.document.createEvent("Event"), i ? (n.initEvent(e, i.bubbles, i.cancelable), n.detail = i.detail) : n.initEvent(e, !1, !1)), t.dispatchEvent(n);
}
function Ac(t, e) {
  return function() {
    return Ss(this, t, e);
  };
}
function Ec(t, e) {
  return function() {
    return Ss(this, t, e.apply(this, arguments));
  };
}
function Mc(t, e) {
  return this.each((typeof e == "function" ? Ec : Ac)(t, e));
}
function* Oc() {
  for (var t = this._groups, e = 0, i = t.length; e < i; ++e)
    for (var r = t[e], n = 0, o = r.length, s; n < o; ++n)
      (s = r[n]) && (yield s);
}
var ks = [null];
function mt(t, e) {
  this._groups = t, this._parents = e;
}
function ni() {
  return new mt([[document.documentElement]], ks);
}
function Ic() {
  return this;
}
mt.prototype = ni.prototype = {
  constructor: mt,
  select: sh,
  selectAll: ch,
  selectChild: ph,
  selectChildren: yh,
  filter: Ch,
  data: vh,
  enter: xh,
  exit: Bh,
  join: Fh,
  merge: Lh,
  selection: Ic,
  order: Ah,
  sort: Eh,
  call: Oh,
  nodes: Ih,
  node: $h,
  size: Dh,
  empty: Nh,
  each: Rh,
  attr: Uh,
  style: Xh,
  property: Qh,
  classed: rc,
  text: ac,
  html: uc,
  raise: dc,
  lower: gc,
  append: mc,
  insert: yc,
  remove: xc,
  clone: Sc,
  datum: kc,
  on: Lc,
  dispatch: Mc,
  [Symbol.iterator]: Oc
};
function At(t) {
  return typeof t == "string" ? new mt([[document.querySelector(t)]], [document.documentElement]) : new mt([[t]], ks);
}
function _n(t, e, i) {
  t.prototype = e.prototype = i, i.constructor = t;
}
function vs(t, e) {
  var i = Object.create(t.prototype);
  for (var r in e)
    i[r] = e[r];
  return i;
}
function oi() {
}
var Ve = 0.7, Ni = 1 / Ve, ve = "\\s*([+-]?\\d+)\\s*", Xe = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Et = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", $c = /^#([0-9a-f]{3,8})$/, Dc = new RegExp(`^rgb\\(${ve},${ve},${ve}\\)$`), Nc = new RegExp(`^rgb\\(${Et},${Et},${Et}\\)$`), Rc = new RegExp(`^rgba\\(${ve},${ve},${ve},${Xe}\\)$`), qc = new RegExp(`^rgba\\(${Et},${Et},${Et},${Xe}\\)$`), Pc = new RegExp(`^hsl\\(${Xe},${Et},${Et}\\)$`), zc = new RegExp(`^hsla\\(${Xe},${Et},${Et},${Xe}\\)$`), so = {
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
_n(oi, Ke, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: ao,
  // Deprecated! Use color.formatHex.
  formatHex: ao,
  formatHex8: Wc,
  formatHsl: Hc,
  formatRgb: lo,
  toString: lo
});
function ao() {
  return this.rgb().formatHex();
}
function Wc() {
  return this.rgb().formatHex8();
}
function Hc() {
  return ws(this).formatHsl();
}
function lo() {
  return this.rgb().formatRgb();
}
function Ke(t) {
  var e, i;
  return t = (t + "").trim().toLowerCase(), (e = $c.exec(t)) ? (i = e[1].length, e = parseInt(e[1], 16), i === 6 ? ho(e) : i === 3 ? new ft(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : i === 8 ? gi(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : i === 4 ? gi(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = Dc.exec(t)) ? new ft(e[1], e[2], e[3], 1) : (e = Nc.exec(t)) ? new ft(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = Rc.exec(t)) ? gi(e[1], e[2], e[3], e[4]) : (e = qc.exec(t)) ? gi(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = Pc.exec(t)) ? fo(e[1], e[2] / 100, e[3] / 100, 1) : (e = zc.exec(t)) ? fo(e[1], e[2] / 100, e[3] / 100, e[4]) : so.hasOwnProperty(t) ? ho(so[t]) : t === "transparent" ? new ft(NaN, NaN, NaN, 0) : null;
}
function ho(t) {
  return new ft(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function gi(t, e, i, r) {
  return r <= 0 && (t = e = i = NaN), new ft(t, e, i, r);
}
function jc(t) {
  return t instanceof oi || (t = Ke(t)), t ? (t = t.rgb(), new ft(t.r, t.g, t.b, t.opacity)) : new ft();
}
function Gr(t, e, i, r) {
  return arguments.length === 1 ? jc(t) : new ft(t, e, i, r ?? 1);
}
function ft(t, e, i, r) {
  this.r = +t, this.g = +e, this.b = +i, this.opacity = +r;
}
_n(ft, Gr, vs(oi, {
  brighter(t) {
    return t = t == null ? Ni : Math.pow(Ni, t), new ft(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Ve : Math.pow(Ve, t), new ft(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new ft(le(this.r), le(this.g), le(this.b), Ri(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: co,
  // Deprecated! Use color.formatHex.
  formatHex: co,
  formatHex8: Uc,
  formatRgb: uo,
  toString: uo
}));
function co() {
  return `#${ae(this.r)}${ae(this.g)}${ae(this.b)}`;
}
function Uc() {
  return `#${ae(this.r)}${ae(this.g)}${ae(this.b)}${ae((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function uo() {
  const t = Ri(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${le(this.r)}, ${le(this.g)}, ${le(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function Ri(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function le(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function ae(t) {
  return t = le(t), (t < 16 ? "0" : "") + t.toString(16);
}
function fo(t, e, i, r) {
  return r <= 0 ? t = e = i = NaN : i <= 0 || i >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new kt(t, e, i, r);
}
function ws(t) {
  if (t instanceof kt)
    return new kt(t.h, t.s, t.l, t.opacity);
  if (t instanceof oi || (t = Ke(t)), !t)
    return new kt();
  if (t instanceof kt)
    return t;
  t = t.rgb();
  var e = t.r / 255, i = t.g / 255, r = t.b / 255, n = Math.min(e, i, r), o = Math.max(e, i, r), s = NaN, a = o - n, l = (o + n) / 2;
  return a ? (e === o ? s = (i - r) / a + (i < r) * 6 : i === o ? s = (r - e) / a + 2 : s = (e - i) / a + 4, a /= l < 0.5 ? o + n : 2 - o - n, s *= 60) : a = l > 0 && l < 1 ? 0 : s, new kt(s, a, l, t.opacity);
}
function Yc(t, e, i, r) {
  return arguments.length === 1 ? ws(t) : new kt(t, e, i, r ?? 1);
}
function kt(t, e, i, r) {
  this.h = +t, this.s = +e, this.l = +i, this.opacity = +r;
}
_n(kt, Yc, vs(oi, {
  brighter(t) {
    return t = t == null ? Ni : Math.pow(Ni, t), new kt(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Ve : Math.pow(Ve, t), new kt(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, e = isNaN(t) || isNaN(this.s) ? 0 : this.s, i = this.l, r = i + (i < 0.5 ? i : 1 - i) * e, n = 2 * i - r;
    return new ft(
      Lr(t >= 240 ? t - 240 : t + 120, n, r),
      Lr(t, n, r),
      Lr(t < 120 ? t + 240 : t - 120, n, r),
      this.opacity
    );
  },
  clamp() {
    return new kt(po(this.h), mi(this.s), mi(this.l), Ri(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = Ri(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${po(this.h)}, ${mi(this.s) * 100}%, ${mi(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function po(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function mi(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function Lr(t, e, i) {
  return (t < 60 ? e + (i - e) * t / 60 : t < 180 ? i : t < 240 ? e + (i - e) * (240 - t) / 60 : e) * 255;
}
const yn = (t) => () => t;
function Bs(t, e) {
  return function(i) {
    return t + i * e;
  };
}
function Gc(t, e, i) {
  return t = Math.pow(t, i), e = Math.pow(e, i) - t, i = 1 / i, function(r) {
    return Math.pow(t + r * e, i);
  };
}
function wx(t, e) {
  var i = e - t;
  return i ? Bs(t, i > 180 || i < -180 ? i - 360 * Math.round(i / 360) : i) : yn(isNaN(t) ? e : t);
}
function Vc(t) {
  return (t = +t) == 1 ? Fs : function(e, i) {
    return i - e ? Gc(e, i, t) : yn(isNaN(e) ? i : e);
  };
}
function Fs(t, e) {
  var i = e - t;
  return i ? Bs(t, i) : yn(isNaN(t) ? e : t);
}
const go = function t(e) {
  var i = Vc(e);
  function r(n, o) {
    var s = i((n = Gr(n)).r, (o = Gr(o)).r), a = i(n.g, o.g), l = i(n.b, o.b), h = Fs(n.opacity, o.opacity);
    return function(c) {
      return n.r = s(c), n.g = a(c), n.b = l(c), n.opacity = h(c), n + "";
    };
  }
  return r.gamma = t, r;
}(1);
function Zt(t, e) {
  return t = +t, e = +e, function(i) {
    return t * (1 - i) + e * i;
  };
}
var Vr = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Ar = new RegExp(Vr.source, "g");
function Xc(t) {
  return function() {
    return t;
  };
}
function Kc(t) {
  return function(e) {
    return t(e) + "";
  };
}
function Zc(t, e) {
  var i = Vr.lastIndex = Ar.lastIndex = 0, r, n, o, s = -1, a = [], l = [];
  for (t = t + "", e = e + ""; (r = Vr.exec(t)) && (n = Ar.exec(e)); )
    (o = n.index) > i && (o = e.slice(i, o), a[s] ? a[s] += o : a[++s] = o), (r = r[0]) === (n = n[0]) ? a[s] ? a[s] += n : a[++s] = n : (a[++s] = null, l.push({ i: s, x: Zt(r, n) })), i = Ar.lastIndex;
  return i < e.length && (o = e.slice(i), a[s] ? a[s] += o : a[++s] = o), a.length < 2 ? l[0] ? Kc(l[0].x) : Xc(e) : (e = l.length, function(h) {
    for (var c = 0, u; c < e; ++c)
      a[(u = l[c]).i] = u.x(h);
    return a.join("");
  });
}
var mo = 180 / Math.PI, Xr = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function Ls(t, e, i, r, n, o) {
  var s, a, l;
  return (s = Math.sqrt(t * t + e * e)) && (t /= s, e /= s), (l = t * i + e * r) && (i -= t * l, r -= e * l), (a = Math.sqrt(i * i + r * r)) && (i /= a, r /= a, l /= a), t * r < e * i && (t = -t, e = -e, l = -l, s = -s), {
    translateX: n,
    translateY: o,
    rotate: Math.atan2(e, t) * mo,
    skewX: Math.atan(l) * mo,
    scaleX: s,
    scaleY: a
  };
}
var _i;
function Jc(t) {
  const e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return e.isIdentity ? Xr : Ls(e.a, e.b, e.c, e.d, e.e, e.f);
}
function Qc(t) {
  return t == null || (_i || (_i = document.createElementNS("http://www.w3.org/2000/svg", "g")), _i.setAttribute("transform", t), !(t = _i.transform.baseVal.consolidate())) ? Xr : (t = t.matrix, Ls(t.a, t.b, t.c, t.d, t.e, t.f));
}
function As(t, e, i, r) {
  function n(h) {
    return h.length ? h.pop() + " " : "";
  }
  function o(h, c, u, g, p, _) {
    if (h !== u || c !== g) {
      var v = p.push("translate(", null, e, null, i);
      _.push({ i: v - 4, x: Zt(h, u) }, { i: v - 2, x: Zt(c, g) });
    } else
      (u || g) && p.push("translate(" + u + e + g + i);
  }
  function s(h, c, u, g) {
    h !== c ? (h - c > 180 ? c += 360 : c - h > 180 && (h += 360), g.push({ i: u.push(n(u) + "rotate(", null, r) - 2, x: Zt(h, c) })) : c && u.push(n(u) + "rotate(" + c + r);
  }
  function a(h, c, u, g) {
    h !== c ? g.push({ i: u.push(n(u) + "skewX(", null, r) - 2, x: Zt(h, c) }) : c && u.push(n(u) + "skewX(" + c + r);
  }
  function l(h, c, u, g, p, _) {
    if (h !== u || c !== g) {
      var v = p.push(n(p) + "scale(", null, ",", null, ")");
      _.push({ i: v - 4, x: Zt(h, u) }, { i: v - 2, x: Zt(c, g) });
    } else
      (u !== 1 || g !== 1) && p.push(n(p) + "scale(" + u + "," + g + ")");
  }
  return function(h, c) {
    var u = [], g = [];
    return h = t(h), c = t(c), o(h.translateX, h.translateY, c.translateX, c.translateY, u, g), s(h.rotate, c.rotate, u, g), a(h.skewX, c.skewX, u, g), l(h.scaleX, h.scaleY, c.scaleX, c.scaleY, u, g), h = c = null, function(p) {
      for (var _ = -1, v = g.length, M; ++_ < v; )
        u[(M = g[_]).i] = M.x(p);
      return u.join("");
    };
  };
}
var tu = As(Jc, "px, ", "px)", "deg)"), eu = As(Qc, ", ", ")", ")"), Be = 0, ze = 0, Ne = 0, Es = 1e3, qi, We, Pi = 0, ue = 0, nr = 0, Ze = typeof performance == "object" && performance.now ? performance : Date, Ms = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function Cn() {
  return ue || (Ms(iu), ue = Ze.now() + nr);
}
function iu() {
  ue = 0;
}
function zi() {
  this._call = this._time = this._next = null;
}
zi.prototype = Os.prototype = {
  constructor: zi,
  restart: function(t, e, i) {
    if (typeof t != "function")
      throw new TypeError("callback is not a function");
    i = (i == null ? Cn() : +i) + (e == null ? 0 : +e), !this._next && We !== this && (We ? We._next = this : qi = this, We = this), this._call = t, this._time = i, Kr();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Kr());
  }
};
function Os(t, e, i) {
  var r = new zi();
  return r.restart(t, e, i), r;
}
function ru() {
  Cn(), ++Be;
  for (var t = qi, e; t; )
    (e = ue - t._time) >= 0 && t._call.call(void 0, e), t = t._next;
  --Be;
}
function _o() {
  ue = (Pi = Ze.now()) + nr, Be = ze = 0;
  try {
    ru();
  } finally {
    Be = 0, ou(), ue = 0;
  }
}
function nu() {
  var t = Ze.now(), e = t - Pi;
  e > Es && (nr -= e, Pi = t);
}
function ou() {
  for (var t, e = qi, i, r = 1 / 0; e; )
    e._call ? (r > e._time && (r = e._time), t = e, e = e._next) : (i = e._next, e._next = null, e = t ? t._next = i : qi = i);
  We = t, Kr(r);
}
function Kr(t) {
  if (!Be) {
    ze && (ze = clearTimeout(ze));
    var e = t - ue;
    e > 24 ? (t < 1 / 0 && (ze = setTimeout(_o, t - Ze.now() - nr)), Ne && (Ne = clearInterval(Ne))) : (Ne || (Pi = Ze.now(), Ne = setInterval(nu, Es)), Be = 1, Ms(_o));
  }
}
function yo(t, e, i) {
  var r = new zi();
  return e = e == null ? 0 : +e, r.restart((n) => {
    r.stop(), t(n + e);
  }, e, i), r;
}
var su = fs("start", "end", "cancel", "interrupt"), au = [], Is = 0, Co = 1, Zr = 2, vi = 3, xo = 4, Jr = 5, wi = 6;
function or(t, e, i, r, n, o) {
  var s = t.__transition;
  if (!s)
    t.__transition = {};
  else if (i in s)
    return;
  lu(t, i, {
    name: e,
    index: r,
    // For context during callback.
    group: n,
    // For context during callback.
    on: su,
    tween: au,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: Is
  });
}
function xn(t, e) {
  var i = Bt(t, e);
  if (i.state > Is)
    throw new Error("too late; already scheduled");
  return i;
}
function It(t, e) {
  var i = Bt(t, e);
  if (i.state > vi)
    throw new Error("too late; already running");
  return i;
}
function Bt(t, e) {
  var i = t.__transition;
  if (!i || !(i = i[e]))
    throw new Error("transition not found");
  return i;
}
function lu(t, e, i) {
  var r = t.__transition, n;
  r[e] = i, i.timer = Os(o, 0, i.time);
  function o(h) {
    i.state = Co, i.timer.restart(s, i.delay, i.time), i.delay <= h && s(h - i.delay);
  }
  function s(h) {
    var c, u, g, p;
    if (i.state !== Co)
      return l();
    for (c in r)
      if (p = r[c], p.name === i.name) {
        if (p.state === vi)
          return yo(s);
        p.state === xo ? (p.state = wi, p.timer.stop(), p.on.call("interrupt", t, t.__data__, p.index, p.group), delete r[c]) : +c < e && (p.state = wi, p.timer.stop(), p.on.call("cancel", t, t.__data__, p.index, p.group), delete r[c]);
      }
    if (yo(function() {
      i.state === vi && (i.state = xo, i.timer.restart(a, i.delay, i.time), a(h));
    }), i.state = Zr, i.on.call("start", t, t.__data__, i.index, i.group), i.state === Zr) {
      for (i.state = vi, n = new Array(g = i.tween.length), c = 0, u = -1; c < g; ++c)
        (p = i.tween[c].value.call(t, t.__data__, i.index, i.group)) && (n[++u] = p);
      n.length = u + 1;
    }
  }
  function a(h) {
    for (var c = h < i.duration ? i.ease.call(null, h / i.duration) : (i.timer.restart(l), i.state = Jr, 1), u = -1, g = n.length; ++u < g; )
      n[u].call(t, c);
    i.state === Jr && (i.on.call("end", t, t.__data__, i.index, i.group), l());
  }
  function l() {
    i.state = wi, i.timer.stop(), delete r[e];
    for (var h in r)
      return;
    delete t.__transition;
  }
}
function hu(t, e) {
  var i = t.__transition, r, n, o = !0, s;
  if (i) {
    e = e == null ? null : e + "";
    for (s in i) {
      if ((r = i[s]).name !== e) {
        o = !1;
        continue;
      }
      n = r.state > Zr && r.state < Jr, r.state = wi, r.timer.stop(), r.on.call(n ? "interrupt" : "cancel", t, t.__data__, r.index, r.group), delete i[s];
    }
    o && delete t.__transition;
  }
}
function cu(t) {
  return this.each(function() {
    hu(this, t);
  });
}
function uu(t, e) {
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
function fu(t, e, i) {
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
function du(t, e) {
  var i = this._id;
  if (t += "", arguments.length < 2) {
    for (var r = Bt(this.node(), i).tween, n = 0, o = r.length, s; n < o; ++n)
      if ((s = r[n]).name === t)
        return s.value;
    return null;
  }
  return this.each((e == null ? uu : fu)(i, t, e));
}
function bn(t, e, i) {
  var r = t._id;
  return t.each(function() {
    var n = It(this, r);
    (n.value || (n.value = {}))[e] = i.apply(this, arguments);
  }), function(n) {
    return Bt(n, r).value[e];
  };
}
function $s(t, e) {
  var i;
  return (typeof e == "number" ? Zt : e instanceof Ke ? go : (i = Ke(e)) ? (e = i, go) : Zc)(t, e);
}
function pu(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function gu(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function mu(t, e, i) {
  var r, n = i + "", o;
  return function() {
    var s = this.getAttribute(t);
    return s === n ? null : s === r ? o : o = e(r = s, i);
  };
}
function _u(t, e, i) {
  var r, n = i + "", o;
  return function() {
    var s = this.getAttributeNS(t.space, t.local);
    return s === n ? null : s === r ? o : o = e(r = s, i);
  };
}
function yu(t, e, i) {
  var r, n, o;
  return function() {
    var s, a = i(this), l;
    return a == null ? void this.removeAttribute(t) : (s = this.getAttribute(t), l = a + "", s === l ? null : s === r && l === n ? o : (n = l, o = e(r = s, a)));
  };
}
function Cu(t, e, i) {
  var r, n, o;
  return function() {
    var s, a = i(this), l;
    return a == null ? void this.removeAttributeNS(t.space, t.local) : (s = this.getAttributeNS(t.space, t.local), l = a + "", s === l ? null : s === r && l === n ? o : (n = l, o = e(r = s, a)));
  };
}
function xu(t, e) {
  var i = rr(t), r = i === "transform" ? eu : $s;
  return this.attrTween(t, typeof e == "function" ? (i.local ? Cu : yu)(i, r, bn(this, "attr." + t, e)) : e == null ? (i.local ? gu : pu)(i) : (i.local ? _u : mu)(i, r, e));
}
function bu(t, e) {
  return function(i) {
    this.setAttribute(t, e.call(this, i));
  };
}
function Tu(t, e) {
  return function(i) {
    this.setAttributeNS(t.space, t.local, e.call(this, i));
  };
}
function Su(t, e) {
  var i, r;
  function n() {
    var o = e.apply(this, arguments);
    return o !== r && (i = (r = o) && Tu(t, o)), i;
  }
  return n._value = e, n;
}
function ku(t, e) {
  var i, r;
  function n() {
    var o = e.apply(this, arguments);
    return o !== r && (i = (r = o) && bu(t, o)), i;
  }
  return n._value = e, n;
}
function vu(t, e) {
  var i = "attr." + t;
  if (arguments.length < 2)
    return (i = this.tween(i)) && i._value;
  if (e == null)
    return this.tween(i, null);
  if (typeof e != "function")
    throw new Error();
  var r = rr(t);
  return this.tween(i, (r.local ? Su : ku)(r, e));
}
function wu(t, e) {
  return function() {
    xn(this, t).delay = +e.apply(this, arguments);
  };
}
function Bu(t, e) {
  return e = +e, function() {
    xn(this, t).delay = e;
  };
}
function Fu(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? wu : Bu)(e, t)) : Bt(this.node(), e).delay;
}
function Lu(t, e) {
  return function() {
    It(this, t).duration = +e.apply(this, arguments);
  };
}
function Au(t, e) {
  return e = +e, function() {
    It(this, t).duration = e;
  };
}
function Eu(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Lu : Au)(e, t)) : Bt(this.node(), e).duration;
}
function Mu(t, e) {
  if (typeof e != "function")
    throw new Error();
  return function() {
    It(this, t).ease = e;
  };
}
function Ou(t) {
  var e = this._id;
  return arguments.length ? this.each(Mu(e, t)) : Bt(this.node(), e).ease;
}
function Iu(t, e) {
  return function() {
    var i = e.apply(this, arguments);
    if (typeof i != "function")
      throw new Error();
    It(this, t).ease = i;
  };
}
function $u(t) {
  if (typeof t != "function")
    throw new Error();
  return this.each(Iu(this._id, t));
}
function Du(t) {
  typeof t != "function" && (t = gs(t));
  for (var e = this._groups, i = e.length, r = new Array(i), n = 0; n < i; ++n)
    for (var o = e[n], s = o.length, a = r[n] = [], l, h = 0; h < s; ++h)
      (l = o[h]) && t.call(l, l.__data__, h, o) && a.push(l);
  return new jt(r, this._parents, this._name, this._id);
}
function Nu(t) {
  if (t._id !== this._id)
    throw new Error();
  for (var e = this._groups, i = t._groups, r = e.length, n = i.length, o = Math.min(r, n), s = new Array(r), a = 0; a < o; ++a)
    for (var l = e[a], h = i[a], c = l.length, u = s[a] = new Array(c), g, p = 0; p < c; ++p)
      (g = l[p] || h[p]) && (u[p] = g);
  for (; a < r; ++a)
    s[a] = e[a];
  return new jt(s, this._parents, this._name, this._id);
}
function Ru(t) {
  return (t + "").trim().split(/^|\s+/).every(function(e) {
    var i = e.indexOf(".");
    return i >= 0 && (e = e.slice(0, i)), !e || e === "start";
  });
}
function qu(t, e, i) {
  var r, n, o = Ru(e) ? xn : It;
  return function() {
    var s = o(this, t), a = s.on;
    a !== r && (n = (r = a).copy()).on(e, i), s.on = n;
  };
}
function Pu(t, e) {
  var i = this._id;
  return arguments.length < 2 ? Bt(this.node(), i).on.on(t) : this.each(qu(i, t, e));
}
function zu(t) {
  return function() {
    var e = this.parentNode;
    for (var i in this.__transition)
      if (+i !== t)
        return;
    e && e.removeChild(this);
  };
}
function Wu() {
  return this.on("end.remove", zu(this._id));
}
function Hu(t) {
  var e = this._name, i = this._id;
  typeof t != "function" && (t = gn(t));
  for (var r = this._groups, n = r.length, o = new Array(n), s = 0; s < n; ++s)
    for (var a = r[s], l = a.length, h = o[s] = new Array(l), c, u, g = 0; g < l; ++g)
      (c = a[g]) && (u = t.call(c, c.__data__, g, a)) && ("__data__" in c && (u.__data__ = c.__data__), h[g] = u, or(h[g], e, i, g, h, Bt(c, i)));
  return new jt(o, this._parents, e, i);
}
function ju(t) {
  var e = this._name, i = this._id;
  typeof t != "function" && (t = ps(t));
  for (var r = this._groups, n = r.length, o = [], s = [], a = 0; a < n; ++a)
    for (var l = r[a], h = l.length, c, u = 0; u < h; ++u)
      if (c = l[u]) {
        for (var g = t.call(c, c.__data__, u, l), p, _ = Bt(c, i), v = 0, M = g.length; v < M; ++v)
          (p = g[v]) && or(p, e, i, v, g, _);
        o.push(g), s.push(c);
      }
  return new jt(o, s, e, i);
}
var Uu = ni.prototype.constructor;
function Yu() {
  return new Uu(this._groups, this._parents);
}
function Gu(t, e) {
  var i, r, n;
  return function() {
    var o = we(this, t), s = (this.style.removeProperty(t), we(this, t));
    return o === s ? null : o === i && s === r ? n : n = e(i = o, r = s);
  };
}
function Ds(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Vu(t, e, i) {
  var r, n = i + "", o;
  return function() {
    var s = we(this, t);
    return s === n ? null : s === r ? o : o = e(r = s, i);
  };
}
function Xu(t, e, i) {
  var r, n, o;
  return function() {
    var s = we(this, t), a = i(this), l = a + "";
    return a == null && (l = a = (this.style.removeProperty(t), we(this, t))), s === l ? null : s === r && l === n ? o : (n = l, o = e(r = s, a));
  };
}
function Ku(t, e) {
  var i, r, n, o = "style." + e, s = "end." + o, a;
  return function() {
    var l = It(this, t), h = l.on, c = l.value[o] == null ? a || (a = Ds(e)) : void 0;
    (h !== i || n !== c) && (r = (i = h).copy()).on(s, n = c), l.on = r;
  };
}
function Zu(t, e, i) {
  var r = (t += "") == "transform" ? tu : $s;
  return e == null ? this.styleTween(t, Gu(t, r)).on("end.style." + t, Ds(t)) : typeof e == "function" ? this.styleTween(t, Xu(t, r, bn(this, "style." + t, e))).each(Ku(this._id, t)) : this.styleTween(t, Vu(t, r, e), i).on("end.style." + t, null);
}
function Ju(t, e, i) {
  return function(r) {
    this.style.setProperty(t, e.call(this, r), i);
  };
}
function Qu(t, e, i) {
  var r, n;
  function o() {
    var s = e.apply(this, arguments);
    return s !== n && (r = (n = s) && Ju(t, s, i)), r;
  }
  return o._value = e, o;
}
function tf(t, e, i) {
  var r = "style." + (t += "");
  if (arguments.length < 2)
    return (r = this.tween(r)) && r._value;
  if (e == null)
    return this.tween(r, null);
  if (typeof e != "function")
    throw new Error();
  return this.tween(r, Qu(t, e, i ?? ""));
}
function ef(t) {
  return function() {
    this.textContent = t;
  };
}
function rf(t) {
  return function() {
    var e = t(this);
    this.textContent = e ?? "";
  };
}
function nf(t) {
  return this.tween("text", typeof t == "function" ? rf(bn(this, "text", t)) : ef(t == null ? "" : t + ""));
}
function of(t) {
  return function(e) {
    this.textContent = t.call(this, e);
  };
}
function sf(t) {
  var e, i;
  function r() {
    var n = t.apply(this, arguments);
    return n !== i && (e = (i = n) && of(n)), e;
  }
  return r._value = t, r;
}
function af(t) {
  var e = "text";
  if (arguments.length < 1)
    return (e = this.tween(e)) && e._value;
  if (t == null)
    return this.tween(e, null);
  if (typeof t != "function")
    throw new Error();
  return this.tween(e, sf(t));
}
function lf() {
  for (var t = this._name, e = this._id, i = Ns(), r = this._groups, n = r.length, o = 0; o < n; ++o)
    for (var s = r[o], a = s.length, l, h = 0; h < a; ++h)
      if (l = s[h]) {
        var c = Bt(l, e);
        or(l, t, i, h, s, {
          time: c.time + c.delay + c.duration,
          delay: 0,
          duration: c.duration,
          ease: c.ease
        });
      }
  return new jt(r, this._parents, t, i);
}
function hf() {
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
var cf = 0;
function jt(t, e, i, r) {
  this._groups = t, this._parents = e, this._name = i, this._id = r;
}
function Ns() {
  return ++cf;
}
var zt = ni.prototype;
jt.prototype = {
  constructor: jt,
  select: Hu,
  selectAll: ju,
  selectChild: zt.selectChild,
  selectChildren: zt.selectChildren,
  filter: Du,
  merge: Nu,
  selection: Yu,
  transition: lf,
  call: zt.call,
  nodes: zt.nodes,
  node: zt.node,
  size: zt.size,
  empty: zt.empty,
  each: zt.each,
  on: Pu,
  attr: xu,
  attrTween: vu,
  style: Zu,
  styleTween: tf,
  text: nf,
  textTween: af,
  remove: Wu,
  tween: du,
  delay: Fu,
  duration: Eu,
  ease: Ou,
  easeVarying: $u,
  end: hf,
  [Symbol.iterator]: zt[Symbol.iterator]
};
function uf(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var ff = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: uf
};
function df(t, e) {
  for (var i; !(i = t.__transition) || !(i = i[e]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${e} not found`);
  return i;
}
function pf(t) {
  var e, i;
  t instanceof jt ? (e = t._id, t = t._name) : (e = Ns(), (i = ff).time = Cn(), t = t == null ? null : t + "");
  for (var r = this._groups, n = r.length, o = 0; o < n; ++o)
    for (var s = r[o], a = s.length, l, h = 0; h < a; ++h)
      (l = s[h]) && or(l, t, e, h, s, i || df(l, e));
  return new jt(r, this._parents, t, e);
}
ni.prototype.interrupt = cu;
ni.prototype.transition = pf;
const Bx = Math.abs, Fx = Math.atan2, Lx = Math.cos, Ax = Math.max, Ex = Math.min, Mx = Math.sin, Ox = Math.sqrt, bo = 1e-12, Tn = Math.PI, To = Tn / 2, Ix = 2 * Tn;
function $x(t) {
  return t > 1 ? 0 : t < -1 ? Tn : Math.acos(t);
}
function Dx(t) {
  return t >= 1 ? To : t <= -1 ? -To : Math.asin(t);
}
function Rs(t) {
  this._context = t;
}
Rs.prototype = {
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
function gf(t) {
  return new Rs(t);
}
class qs {
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
function mf(t) {
  return new qs(t, !0);
}
function _f(t) {
  return new qs(t, !1);
}
function te() {
}
function Wi(t, e, i) {
  t._context.bezierCurveTo(
    (2 * t._x0 + t._x1) / 3,
    (2 * t._y0 + t._y1) / 3,
    (t._x0 + 2 * t._x1) / 3,
    (t._y0 + 2 * t._y1) / 3,
    (t._x0 + 4 * t._x1 + e) / 6,
    (t._y0 + 4 * t._y1 + i) / 6
  );
}
function sr(t) {
  this._context = t;
}
sr.prototype = {
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
        Wi(this, this._x1, this._y1);
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
        Wi(this, t, e);
        break;
    }
    this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = e;
  }
};
function yf(t) {
  return new sr(t);
}
function Ps(t) {
  this._context = t;
}
Ps.prototype = {
  areaStart: te,
  areaEnd: te,
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
        Wi(this, t, e);
        break;
    }
    this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = e;
  }
};
function Cf(t) {
  return new Ps(t);
}
function zs(t) {
  this._context = t;
}
zs.prototype = {
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
        Wi(this, t, e);
        break;
    }
    this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = e;
  }
};
function xf(t) {
  return new zs(t);
}
function Ws(t, e) {
  this._basis = new sr(t), this._beta = e;
}
Ws.prototype = {
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
const bf = function t(e) {
  function i(r) {
    return e === 1 ? new sr(r) : new Ws(r, e);
  }
  return i.beta = function(r) {
    return t(+r);
  }, i;
}(0.85);
function Hi(t, e, i) {
  t._context.bezierCurveTo(
    t._x1 + t._k * (t._x2 - t._x0),
    t._y1 + t._k * (t._y2 - t._y0),
    t._x2 + t._k * (t._x1 - e),
    t._y2 + t._k * (t._y1 - i),
    t._x2,
    t._y2
  );
}
function Sn(t, e) {
  this._context = t, this._k = (1 - e) / 6;
}
Sn.prototype = {
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
        Hi(this, this._x1, this._y1);
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
        Hi(this, t, e);
        break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = e;
  }
};
const Tf = function t(e) {
  function i(r) {
    return new Sn(r, e);
  }
  return i.tension = function(r) {
    return t(+r);
  }, i;
}(0);
function kn(t, e) {
  this._context = t, this._k = (1 - e) / 6;
}
kn.prototype = {
  areaStart: te,
  areaEnd: te,
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
        Hi(this, t, e);
        break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = e;
  }
};
const Sf = function t(e) {
  function i(r) {
    return new kn(r, e);
  }
  return i.tension = function(r) {
    return t(+r);
  }, i;
}(0);
function vn(t, e) {
  this._context = t, this._k = (1 - e) / 6;
}
vn.prototype = {
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
        Hi(this, t, e);
        break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = e;
  }
};
const kf = function t(e) {
  function i(r) {
    return new vn(r, e);
  }
  return i.tension = function(r) {
    return t(+r);
  }, i;
}(0);
function wn(t, e, i) {
  var r = t._x1, n = t._y1, o = t._x2, s = t._y2;
  if (t._l01_a > bo) {
    var a = 2 * t._l01_2a + 3 * t._l01_a * t._l12_a + t._l12_2a, l = 3 * t._l01_a * (t._l01_a + t._l12_a);
    r = (r * a - t._x0 * t._l12_2a + t._x2 * t._l01_2a) / l, n = (n * a - t._y0 * t._l12_2a + t._y2 * t._l01_2a) / l;
  }
  if (t._l23_a > bo) {
    var h = 2 * t._l23_2a + 3 * t._l23_a * t._l12_a + t._l12_2a, c = 3 * t._l23_a * (t._l23_a + t._l12_a);
    o = (o * h + t._x1 * t._l23_2a - e * t._l12_2a) / c, s = (s * h + t._y1 * t._l23_2a - i * t._l12_2a) / c;
  }
  t._context.bezierCurveTo(r, n, o, s, t._x2, t._y2);
}
function Hs(t, e) {
  this._context = t, this._alpha = e;
}
Hs.prototype = {
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
        wn(this, t, e);
        break;
    }
    this._l01_a = this._l12_a, this._l12_a = this._l23_a, this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a, this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = e;
  }
};
const vf = function t(e) {
  function i(r) {
    return e ? new Hs(r, e) : new Sn(r, 0);
  }
  return i.alpha = function(r) {
    return t(+r);
  }, i;
}(0.5);
function js(t, e) {
  this._context = t, this._alpha = e;
}
js.prototype = {
  areaStart: te,
  areaEnd: te,
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
        wn(this, t, e);
        break;
    }
    this._l01_a = this._l12_a, this._l12_a = this._l23_a, this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a, this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = e;
  }
};
const wf = function t(e) {
  function i(r) {
    return e ? new js(r, e) : new kn(r, 0);
  }
  return i.alpha = function(r) {
    return t(+r);
  }, i;
}(0.5);
function Us(t, e) {
  this._context = t, this._alpha = e;
}
Us.prototype = {
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
        wn(this, t, e);
        break;
    }
    this._l01_a = this._l12_a, this._l12_a = this._l23_a, this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a, this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = e;
  }
};
const Bf = function t(e) {
  function i(r) {
    return e ? new Us(r, e) : new vn(r, 0);
  }
  return i.alpha = function(r) {
    return t(+r);
  }, i;
}(0.5);
function Ys(t) {
  this._context = t;
}
Ys.prototype = {
  areaStart: te,
  areaEnd: te,
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
function Ff(t) {
  return new Ys(t);
}
function So(t) {
  return t < 0 ? -1 : 1;
}
function ko(t, e, i) {
  var r = t._x1 - t._x0, n = e - t._x1, o = (t._y1 - t._y0) / (r || n < 0 && -0), s = (i - t._y1) / (n || r < 0 && -0), a = (o * n + s * r) / (r + n);
  return (So(o) + So(s)) * Math.min(Math.abs(o), Math.abs(s), 0.5 * Math.abs(a)) || 0;
}
function vo(t, e) {
  var i = t._x1 - t._x0;
  return i ? (3 * (t._y1 - t._y0) / i - e) / 2 : e;
}
function Er(t, e, i) {
  var r = t._x0, n = t._y0, o = t._x1, s = t._y1, a = (o - r) / 3;
  t._context.bezierCurveTo(r + a, n + a * e, o - a, s - a * i, o, s);
}
function ji(t) {
  this._context = t;
}
ji.prototype = {
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
        Er(this, this._t0, vo(this, this._t0));
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
          this._point = 3, Er(this, vo(this, i = ko(this, t, e)), i);
          break;
        default:
          Er(this, this._t0, i = ko(this, t, e));
          break;
      }
      this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = e, this._t0 = i;
    }
  }
};
function Gs(t) {
  this._context = new Vs(t);
}
(Gs.prototype = Object.create(ji.prototype)).point = function(t, e) {
  ji.prototype.point.call(this, e, t);
};
function Vs(t) {
  this._context = t;
}
Vs.prototype = {
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
function Lf(t) {
  return new ji(t);
}
function Af(t) {
  return new Gs(t);
}
function Xs(t) {
  this._context = t;
}
Xs.prototype = {
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
        for (var r = wo(t), n = wo(e), o = 0, s = 1; s < i; ++o, ++s)
          this._context.bezierCurveTo(r[0][o], n[0][o], r[1][o], n[1][o], t[s], e[s]);
    (this._line || this._line !== 0 && i === 1) && this._context.closePath(), this._line = 1 - this._line, this._x = this._y = null;
  },
  point: function(t, e) {
    this._x.push(+t), this._y.push(+e);
  }
};
function wo(t) {
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
function Ef(t) {
  return new Xs(t);
}
function ar(t, e) {
  this._context = t, this._t = e;
}
ar.prototype = {
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
function Mf(t) {
  return new ar(t, 0.5);
}
function Of(t) {
  return new ar(t, 0);
}
function If(t) {
  return new ar(t, 1);
}
function He(t, e, i) {
  this.k = t, this.x = e, this.y = i;
}
He.prototype = {
  constructor: He,
  scale: function(t) {
    return t === 1 ? this : new He(this.k * t, this.x, this.y);
  },
  translate: function(t, e) {
    return t === 0 & e === 0 ? this : new He(this.k, this.x + this.k * t, this.y + this.k * e);
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
He.prototype;
/*! @license DOMPurify 3.0.5 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.0.5/LICENSE */
const {
  entries: Ks,
  setPrototypeOf: Bo,
  isFrozen: $f,
  getPrototypeOf: Df,
  getOwnPropertyDescriptor: Nf
} = Object;
let {
  freeze: ht,
  seal: wt,
  create: Rf
} = Object, {
  apply: Qr,
  construct: tn
} = typeof Reflect < "u" && Reflect;
Qr || (Qr = function(e, i, r) {
  return e.apply(i, r);
});
ht || (ht = function(e) {
  return e;
});
wt || (wt = function(e) {
  return e;
});
tn || (tn = function(e, i) {
  return new e(...i);
});
const qf = xt(Array.prototype.forEach), Fo = xt(Array.prototype.pop), Re = xt(Array.prototype.push), Bi = xt(String.prototype.toLowerCase), Mr = xt(String.prototype.toString), Pf = xt(String.prototype.match), St = xt(String.prototype.replace), zf = xt(String.prototype.indexOf), Wf = xt(String.prototype.trim), gt = xt(RegExp.prototype.test), qe = Hf(TypeError);
function xt(t) {
  return function(e) {
    for (var i = arguments.length, r = new Array(i > 1 ? i - 1 : 0), n = 1; n < i; n++)
      r[n - 1] = arguments[n];
    return Qr(t, e, r);
  };
}
function Hf(t) {
  return function() {
    for (var e = arguments.length, i = new Array(e), r = 0; r < e; r++)
      i[r] = arguments[r];
    return tn(t, i);
  };
}
function N(t, e, i) {
  var r;
  i = (r = i) !== null && r !== void 0 ? r : Bi, Bo && Bo(t, null);
  let n = e.length;
  for (; n--; ) {
    let o = e[n];
    if (typeof o == "string") {
      const s = i(o);
      s !== o && ($f(e) || (e[n] = s), o = s);
    }
    t[o] = !0;
  }
  return t;
}
function be(t) {
  const e = Rf(null);
  for (const [i, r] of Ks(t))
    e[i] = r;
  return e;
}
function yi(t, e) {
  for (; t !== null; ) {
    const r = Nf(t, e);
    if (r) {
      if (r.get)
        return xt(r.get);
      if (typeof r.value == "function")
        return xt(r.value);
    }
    t = Df(t);
  }
  function i(r) {
    return console.warn("fallback value for", r), null;
  }
  return i;
}
const Lo = ht(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "section", "select", "shadow", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), Or = ht(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), Ir = ht(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), jf = ht(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), $r = ht(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), Uf = ht(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), Ao = ht(["#text"]), Eo = ht(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "pattern", "placeholder", "playsinline", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "xmlns", "slot"]), Dr = ht(["accent-height", "accumulate", "additive", "alignment-baseline", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), Mo = ht(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), Ci = ht(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), Yf = wt(/\{\{[\w\W]*|[\w\W]*\}\}/gm), Gf = wt(/<%[\w\W]*|[\w\W]*%>/gm), Vf = wt(/\${[\w\W]*}/gm), Xf = wt(/^data-[\-\w.\u00B7-\uFFFF]/), Kf = wt(/^aria-[\-\w]+$/), Zs = wt(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
), Zf = wt(/^(?:\w+script|data):/i), Jf = wt(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
), Js = wt(/^html$/i);
var Oo = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  MUSTACHE_EXPR: Yf,
  ERB_EXPR: Gf,
  TMPLIT_EXPR: Vf,
  DATA_ATTR: Xf,
  ARIA_ATTR: Kf,
  IS_ALLOWED_URI: Zs,
  IS_SCRIPT_OR_DATA: Zf,
  ATTR_WHITESPACE: Jf,
  DOCTYPE_NAME: Js
});
const Qf = () => typeof window > "u" ? null : window, td = function(e, i) {
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
function Qs() {
  let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : Qf();
  const e = (B) => Qs(B);
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
  } = t, _ = l.prototype, v = yi(_, "cloneNode"), M = yi(_, "nextSibling"), q = yi(_, "childNodes"), k = yi(_, "parentNode");
  if (typeof s == "function") {
    const B = n.createElement("template");
    B.content && B.content.ownerDocument && (n = B.content.ownerDocument);
  }
  let z, Q = "";
  const {
    implementation: X,
    createNodeIterator: G,
    createDocumentFragment: W,
    getElementsByTagName: Yt
  } = n, {
    importNode: K
  } = i;
  let $ = {};
  e.isSupported = typeof Ks == "function" && typeof k == "function" && X && X.createHTMLDocument !== void 0;
  const {
    MUSTACHE_EXPR: $t,
    ERB_EXPR: Ft,
    TMPLIT_EXPR: E,
    DATA_ATTR: T,
    ARIA_ATTR: x,
    IS_SCRIPT_OR_DATA: O,
    ATTR_WHITESPACE: y
  } = Oo;
  let {
    IS_ALLOWED_URI: D
  } = Oo, w = null;
  const H = N({}, [...Lo, ...Or, ...Ir, ...$r, ...Ao]);
  let R = null;
  const U = N({}, [...Eo, ...Dr, ...Mo, ...Ci]);
  let P = Object.seal(Object.create(null, {
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
  })), ct = null, pt = null, Gt = !0, Dt = !0, Nt = !1, it = !0, st = !1, Tt = !1, Vt = !1, xr = !1, me = !1, hi = !1, ci = !1, Wn = !0, Hn = !1;
  const El = "user-content-";
  let br = !0, De = !1, _e = {}, ye = null;
  const jn = N({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
  let Un = null;
  const Yn = N({}, ["audio", "video", "img", "source", "image", "track"]);
  let Tr = null;
  const Gn = N({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), ui = "http://www.w3.org/1998/Math/MathML", fi = "http://www.w3.org/2000/svg", Rt = "http://www.w3.org/1999/xhtml";
  let Ce = Rt, Sr = !1, kr = null;
  const Ml = N({}, [ui, fi, Rt], Mr);
  let re;
  const Ol = ["application/xhtml+xml", "text/html"], Il = "text/html";
  let tt, xe = null;
  const $l = n.createElement("form"), Vn = function(f) {
    return f instanceof RegExp || f instanceof Function;
  }, vr = function(f) {
    if (!(xe && xe === f)) {
      if ((!f || typeof f != "object") && (f = {}), f = be(f), re = // eslint-disable-next-line unicorn/prefer-includes
      Ol.indexOf(f.PARSER_MEDIA_TYPE) === -1 ? re = Il : re = f.PARSER_MEDIA_TYPE, tt = re === "application/xhtml+xml" ? Mr : Bi, w = "ALLOWED_TAGS" in f ? N({}, f.ALLOWED_TAGS, tt) : H, R = "ALLOWED_ATTR" in f ? N({}, f.ALLOWED_ATTR, tt) : U, kr = "ALLOWED_NAMESPACES" in f ? N({}, f.ALLOWED_NAMESPACES, Mr) : Ml, Tr = "ADD_URI_SAFE_ATTR" in f ? N(
        be(Gn),
        // eslint-disable-line indent
        f.ADD_URI_SAFE_ATTR,
        // eslint-disable-line indent
        tt
        // eslint-disable-line indent
      ) : Gn, Un = "ADD_DATA_URI_TAGS" in f ? N(
        be(Yn),
        // eslint-disable-line indent
        f.ADD_DATA_URI_TAGS,
        // eslint-disable-line indent
        tt
        // eslint-disable-line indent
      ) : Yn, ye = "FORBID_CONTENTS" in f ? N({}, f.FORBID_CONTENTS, tt) : jn, ct = "FORBID_TAGS" in f ? N({}, f.FORBID_TAGS, tt) : {}, pt = "FORBID_ATTR" in f ? N({}, f.FORBID_ATTR, tt) : {}, _e = "USE_PROFILES" in f ? f.USE_PROFILES : !1, Gt = f.ALLOW_ARIA_ATTR !== !1, Dt = f.ALLOW_DATA_ATTR !== !1, Nt = f.ALLOW_UNKNOWN_PROTOCOLS || !1, it = f.ALLOW_SELF_CLOSE_IN_ATTR !== !1, st = f.SAFE_FOR_TEMPLATES || !1, Tt = f.WHOLE_DOCUMENT || !1, me = f.RETURN_DOM || !1, hi = f.RETURN_DOM_FRAGMENT || !1, ci = f.RETURN_TRUSTED_TYPE || !1, xr = f.FORCE_BODY || !1, Wn = f.SANITIZE_DOM !== !1, Hn = f.SANITIZE_NAMED_PROPS || !1, br = f.KEEP_CONTENT !== !1, De = f.IN_PLACE || !1, D = f.ALLOWED_URI_REGEXP || Zs, Ce = f.NAMESPACE || Rt, P = f.CUSTOM_ELEMENT_HANDLING || {}, f.CUSTOM_ELEMENT_HANDLING && Vn(f.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (P.tagNameCheck = f.CUSTOM_ELEMENT_HANDLING.tagNameCheck), f.CUSTOM_ELEMENT_HANDLING && Vn(f.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (P.attributeNameCheck = f.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), f.CUSTOM_ELEMENT_HANDLING && typeof f.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements == "boolean" && (P.allowCustomizedBuiltInElements = f.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), st && (Dt = !1), hi && (me = !0), _e && (w = N({}, [...Ao]), R = [], _e.html === !0 && (N(w, Lo), N(R, Eo)), _e.svg === !0 && (N(w, Or), N(R, Dr), N(R, Ci)), _e.svgFilters === !0 && (N(w, Ir), N(R, Dr), N(R, Ci)), _e.mathMl === !0 && (N(w, $r), N(R, Mo), N(R, Ci))), f.ADD_TAGS && (w === H && (w = be(w)), N(w, f.ADD_TAGS, tt)), f.ADD_ATTR && (R === U && (R = be(R)), N(R, f.ADD_ATTR, tt)), f.ADD_URI_SAFE_ATTR && N(Tr, f.ADD_URI_SAFE_ATTR, tt), f.FORBID_CONTENTS && (ye === jn && (ye = be(ye)), N(ye, f.FORBID_CONTENTS, tt)), br && (w["#text"] = !0), Tt && N(w, ["html", "head", "body"]), w.table && (N(w, ["tbody"]), delete ct.tbody), f.TRUSTED_TYPES_POLICY) {
        if (typeof f.TRUSTED_TYPES_POLICY.createHTML != "function")
          throw qe('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
        if (typeof f.TRUSTED_TYPES_POLICY.createScriptURL != "function")
          throw qe('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
        z = f.TRUSTED_TYPES_POLICY, Q = z.createHTML("");
      } else
        z === void 0 && (z = td(p, r)), z !== null && typeof Q == "string" && (Q = z.createHTML(""));
      ht && ht(f), xe = f;
    }
  }, Xn = N({}, ["mi", "mo", "mn", "ms", "mtext"]), Kn = N({}, ["foreignobject", "desc", "title", "annotation-xml"]), Dl = N({}, ["title", "style", "font", "a", "script"]), di = N({}, Or);
  N(di, Ir), N(di, jf);
  const wr = N({}, $r);
  N(wr, Uf);
  const Nl = function(f) {
    let m = k(f);
    (!m || !m.tagName) && (m = {
      namespaceURI: Ce,
      tagName: "template"
    });
    const b = Bi(f.tagName), j = Bi(m.tagName);
    return kr[f.namespaceURI] ? f.namespaceURI === fi ? m.namespaceURI === Rt ? b === "svg" : m.namespaceURI === ui ? b === "svg" && (j === "annotation-xml" || Xn[j]) : !!di[b] : f.namespaceURI === ui ? m.namespaceURI === Rt ? b === "math" : m.namespaceURI === fi ? b === "math" && Kn[j] : !!wr[b] : f.namespaceURI === Rt ? m.namespaceURI === fi && !Kn[j] || m.namespaceURI === ui && !Xn[j] ? !1 : !wr[b] && (Dl[b] || !di[b]) : !!(re === "application/xhtml+xml" && kr[f.namespaceURI]) : !1;
  }, ne = function(f) {
    Re(e.removed, {
      element: f
    });
    try {
      f.parentNode.removeChild(f);
    } catch {
      f.remove();
    }
  }, Br = function(f, m) {
    try {
      Re(e.removed, {
        attribute: m.getAttributeNode(f),
        from: m
      });
    } catch {
      Re(e.removed, {
        attribute: null,
        from: m
      });
    }
    if (m.removeAttribute(f), f === "is" && !R[f])
      if (me || hi)
        try {
          ne(m);
        } catch {
        }
      else
        try {
          m.setAttribute(f, "");
        } catch {
        }
  }, Zn = function(f) {
    let m, b;
    if (xr)
      f = "<remove></remove>" + f;
    else {
      const _t = Pf(f, /^[\r\n\t ]+/);
      b = _t && _t[0];
    }
    re === "application/xhtml+xml" && Ce === Rt && (f = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + f + "</body></html>");
    const j = z ? z.createHTML(f) : f;
    if (Ce === Rt)
      try {
        m = new g().parseFromString(j, re);
      } catch {
      }
    if (!m || !m.documentElement) {
      m = X.createDocument(Ce, "template", null);
      try {
        m.documentElement.innerHTML = Sr ? Q : j;
      } catch {
      }
    }
    const et = m.body || m.documentElement;
    return f && b && et.insertBefore(n.createTextNode(b), et.childNodes[0] || null), Ce === Rt ? Yt.call(m, Tt ? "html" : "body")[0] : Tt ? m.documentElement : et;
  }, Jn = function(f) {
    return G.call(
      f.ownerDocument || f,
      f,
      // eslint-disable-next-line no-bitwise
      h.SHOW_ELEMENT | h.SHOW_COMMENT | h.SHOW_TEXT,
      null,
      !1
    );
  }, Rl = function(f) {
    return f instanceof u && (typeof f.nodeName != "string" || typeof f.textContent != "string" || typeof f.removeChild != "function" || !(f.attributes instanceof c) || typeof f.removeAttribute != "function" || typeof f.setAttribute != "function" || typeof f.namespaceURI != "string" || typeof f.insertBefore != "function" || typeof f.hasChildNodes != "function");
  }, pi = function(f) {
    return typeof a == "object" ? f instanceof a : f && typeof f == "object" && typeof f.nodeType == "number" && typeof f.nodeName == "string";
  }, qt = function(f, m, b) {
    $[f] && qf($[f], (j) => {
      j.call(e, m, b, xe);
    });
  }, Qn = function(f) {
    let m;
    if (qt("beforeSanitizeElements", f, null), Rl(f))
      return ne(f), !0;
    const b = tt(f.nodeName);
    if (qt("uponSanitizeElement", f, {
      tagName: b,
      allowedTags: w
    }), f.hasChildNodes() && !pi(f.firstElementChild) && (!pi(f.content) || !pi(f.content.firstElementChild)) && gt(/<[/\w]/g, f.innerHTML) && gt(/<[/\w]/g, f.textContent))
      return ne(f), !0;
    if (!w[b] || ct[b]) {
      if (!ct[b] && eo(b) && (P.tagNameCheck instanceof RegExp && gt(P.tagNameCheck, b) || P.tagNameCheck instanceof Function && P.tagNameCheck(b)))
        return !1;
      if (br && !ye[b]) {
        const j = k(f) || f.parentNode, et = q(f) || f.childNodes;
        if (et && j) {
          const _t = et.length;
          for (let V = _t - 1; V >= 0; --V)
            j.insertBefore(v(et[V], !0), M(f));
        }
      }
      return ne(f), !0;
    }
    return f instanceof l && !Nl(f) || (b === "noscript" || b === "noembed" || b === "noframes") && gt(/<\/no(script|embed|frames)/i, f.innerHTML) ? (ne(f), !0) : (st && f.nodeType === 3 && (m = f.textContent, m = St(m, $t, " "), m = St(m, Ft, " "), m = St(m, E, " "), f.textContent !== m && (Re(e.removed, {
      element: f.cloneNode()
    }), f.textContent = m)), qt("afterSanitizeElements", f, null), !1);
  }, to = function(f, m, b) {
    if (Wn && (m === "id" || m === "name") && (b in n || b in $l))
      return !1;
    if (!(Dt && !pt[m] && gt(T, m))) {
      if (!(Gt && gt(x, m))) {
        if (!R[m] || pt[m]) {
          if (
            // First condition does a very basic check if a) it's basically a valid custom element tagname AND
            // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
            // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
            !(eo(f) && (P.tagNameCheck instanceof RegExp && gt(P.tagNameCheck, f) || P.tagNameCheck instanceof Function && P.tagNameCheck(f)) && (P.attributeNameCheck instanceof RegExp && gt(P.attributeNameCheck, m) || P.attributeNameCheck instanceof Function && P.attributeNameCheck(m)) || // Alternative, second condition checks if it's an `is`-attribute, AND
            // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
            m === "is" && P.allowCustomizedBuiltInElements && (P.tagNameCheck instanceof RegExp && gt(P.tagNameCheck, b) || P.tagNameCheck instanceof Function && P.tagNameCheck(b)))
          )
            return !1;
        } else if (!Tr[m]) {
          if (!gt(D, St(b, y, ""))) {
            if (!((m === "src" || m === "xlink:href" || m === "href") && f !== "script" && zf(b, "data:") === 0 && Un[f])) {
              if (!(Nt && !gt(O, St(b, y, "")))) {
                if (b)
                  return !1;
              }
            }
          }
        }
      }
    }
    return !0;
  }, eo = function(f) {
    return f.indexOf("-") > 0;
  }, io = function(f) {
    let m, b, j, et;
    qt("beforeSanitizeAttributes", f, null);
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
        name: Lt,
        namespaceURI: Fr
      } = m;
      if (b = Lt === "value" ? m.value : Wf(m.value), j = tt(Lt), V.attrName = j, V.attrValue = b, V.keepAttr = !0, V.forceKeepAttr = void 0, qt("uponSanitizeAttribute", f, V), b = V.attrValue, V.forceKeepAttr || (Br(Lt, f), !V.keepAttr))
        continue;
      if (!it && gt(/\/>/i, b)) {
        Br(Lt, f);
        continue;
      }
      st && (b = St(b, $t, " "), b = St(b, Ft, " "), b = St(b, E, " "));
      const ro = tt(f.nodeName);
      if (to(ro, j, b)) {
        if (Hn && (j === "id" || j === "name") && (Br(Lt, f), b = El + b), z && typeof p == "object" && typeof p.getAttributeType == "function" && !Fr)
          switch (p.getAttributeType(ro, j)) {
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
          Fr ? f.setAttributeNS(Fr, Lt, b) : f.setAttribute(Lt, b), Fo(e.removed);
        } catch {
        }
      }
    }
    qt("afterSanitizeAttributes", f, null);
  }, ql = function B(f) {
    let m;
    const b = Jn(f);
    for (qt("beforeSanitizeShadowDOM", f, null); m = b.nextNode(); )
      qt("uponSanitizeShadowNode", m, null), !Qn(m) && (m.content instanceof o && B(m.content), io(m));
    qt("afterSanitizeShadowDOM", f, null);
  };
  return e.sanitize = function(B) {
    let f = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, m, b, j, et;
    if (Sr = !B, Sr && (B = "<!-->"), typeof B != "string" && !pi(B))
      if (typeof B.toString == "function") {
        if (B = B.toString(), typeof B != "string")
          throw qe("dirty is not a string, aborting");
      } else
        throw qe("toString is not a function");
    if (!e.isSupported)
      return B;
    if (Vt || vr(f), e.removed = [], typeof B == "string" && (De = !1), De) {
      if (B.nodeName) {
        const Lt = tt(B.nodeName);
        if (!w[Lt] || ct[Lt])
          throw qe("root node is forbidden and cannot be sanitized in-place");
      }
    } else if (B instanceof a)
      m = Zn("<!---->"), b = m.ownerDocument.importNode(B, !0), b.nodeType === 1 && b.nodeName === "BODY" || b.nodeName === "HTML" ? m = b : m.appendChild(b);
    else {
      if (!me && !st && !Tt && // eslint-disable-next-line unicorn/prefer-includes
      B.indexOf("<") === -1)
        return z && ci ? z.createHTML(B) : B;
      if (m = Zn(B), !m)
        return me ? null : ci ? Q : "";
    }
    m && xr && ne(m.firstChild);
    const _t = Jn(De ? B : m);
    for (; j = _t.nextNode(); )
      Qn(j) || (j.content instanceof o && ql(j.content), io(j));
    if (De)
      return B;
    if (me) {
      if (hi)
        for (et = W.call(m.ownerDocument); m.firstChild; )
          et.appendChild(m.firstChild);
      else
        et = m;
      return (R.shadowroot || R.shadowrootmode) && (et = K.call(i, et, !0)), et;
    }
    let V = Tt ? m.outerHTML : m.innerHTML;
    return Tt && w["!doctype"] && m.ownerDocument && m.ownerDocument.doctype && m.ownerDocument.doctype.name && gt(Js, m.ownerDocument.doctype.name) && (V = "<!DOCTYPE " + m.ownerDocument.doctype.name + `>
` + V), st && (V = St(V, $t, " "), V = St(V, Ft, " "), V = St(V, E, " ")), z && ci ? z.createHTML(V) : V;
  }, e.setConfig = function(B) {
    vr(B), Vt = !0;
  }, e.clearConfig = function() {
    xe = null, Vt = !1;
  }, e.isValidAttribute = function(B, f, m) {
    xe || vr({});
    const b = tt(B), j = tt(f);
    return to(b, j, m);
  }, e.addHook = function(B, f) {
    typeof f == "function" && ($[B] = $[B] || [], Re($[B], f));
  }, e.removeHook = function(B) {
    if ($[B])
      return Fo($[B]);
  }, e.removeHooks = function(B) {
    $[B] && ($[B] = []);
  }, e.removeAllHooks = function() {
    $ = {};
  }, e;
}
var Ui = Qs();
const lr = /<br\s*\/?>/gi, ed = (t) => t ? ea(t).replace(/\\n/g, "#br#").split("#br#") : [""], ta = (t) => Ui.sanitize(t), Io = (t, e) => {
  var i;
  if (((i = e.flowchart) == null ? void 0 : i.htmlLabels) !== !1) {
    const r = e.securityLevel;
    r === "antiscript" || r === "strict" ? t = ta(t) : r !== "loose" && (t = ea(t), t = t.replace(/</g, "&lt;").replace(/>/g, "&gt;"), t = t.replace(/=/g, "&equals;"), t = od(t));
  }
  return t;
}, Je = (t, e) => t && (e.dompurifyConfig ? t = Ui.sanitize(Io(t, e), e.dompurifyConfig).toString() : t = Ui.sanitize(Io(t, e), {
  FORBID_TAGS: ["style"]
}).toString(), t), id = (t, e) => typeof t == "string" ? Je(t, e) : t.flat().map((i) => Je(i, e)), rd = (t) => lr.test(t), nd = (t) => t.split(lr), od = (t) => t.replace(/#br#/g, "<br/>"), ea = (t) => t.replace(lr, "#br#"), sd = (t) => {
  let e = "";
  return t && (e = window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.search, e = e.replaceAll(/\(/g, "\\("), e = e.replaceAll(/\)/g, "\\)")), e;
}, ia = (t) => !(t === !1 || ["false", "null", "0"].includes(String(t).trim().toLowerCase())), ad = function(...t) {
  const e = t.filter((i) => !isNaN(i));
  return Math.max(...e);
}, ld = function(...t) {
  const e = t.filter((i) => !isNaN(i));
  return Math.min(...e);
}, hd = function(t) {
  let e = t;
  if (t.split("~").length - 1 >= 2) {
    let i = e;
    do
      e = i, i = e.replace(/~([^\s,:;]+)~/, "<$1>");
    while (i != e);
    return hd(i);
  } else
    return e;
}, Bn = {
  getRows: ed,
  sanitizeText: Je,
  sanitizeTextOrArray: id,
  hasBreaks: rd,
  splitBreaks: nd,
  lineBreakRegex: lr,
  removeScript: ta,
  getUrl: sd,
  evaluate: ia,
  getMax: ad,
  getMin: ld
}, Fi = {
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
        return Fi.hue2rgb(o, n, t + 1 / 3) * 255;
      case "g":
        return Fi.hue2rgb(o, n, t) * 255;
      case "b":
        return Fi.hue2rgb(o, n, t - 1 / 3) * 255;
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
}, cd = Fi, ud = {
  /* API */
  clamp: (t, e, i) => e > i ? Math.min(e, Math.max(i, t)) : Math.min(i, Math.max(e, t)),
  round: (t) => Math.round(t * 1e10) / 1e10
}, fd = ud, dd = {
  /* API */
  dec2hex: (t) => {
    const e = Math.round(t).toString(16);
    return e.length > 1 ? e : `0${e}`;
  }
}, pd = dd, gd = {
  channel: cd,
  lang: fd,
  unit: pd
}, I = gd, Kt = {};
for (let t = 0; t <= 255; t++)
  Kt[t] = I.unit.dec2hex(t);
const rt = {
  ALL: 0,
  RGB: 1,
  HSL: 2
};
class md {
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
const _d = md;
class yd {
  /* CONSTRUCTOR */
  constructor(e, i) {
    this.color = i, this.changed = !1, this.data = e, this.type = new _d();
  }
  /* API */
  set(e, i) {
    return this.color = i, this.changed = !1, this.data = e, this.type.type = rt.ALL, this;
  }
  /* HELPERS */
  _ensureHSL() {
    const e = this.data, { h: i, s: r, l: n } = e;
    i === void 0 && (e.h = I.channel.rgb2hsl(e, "h")), r === void 0 && (e.s = I.channel.rgb2hsl(e, "s")), n === void 0 && (e.l = I.channel.rgb2hsl(e, "l"));
  }
  _ensureRGB() {
    const e = this.data, { r: i, g: r, b: n } = e;
    i === void 0 && (e.r = I.channel.hsl2rgb(e, "r")), r === void 0 && (e.g = I.channel.hsl2rgb(e, "g")), n === void 0 && (e.b = I.channel.hsl2rgb(e, "b"));
  }
  /* GETTERS */
  get r() {
    const e = this.data, i = e.r;
    return !this.type.is(rt.HSL) && i !== void 0 ? i : (this._ensureHSL(), I.channel.hsl2rgb(e, "r"));
  }
  get g() {
    const e = this.data, i = e.g;
    return !this.type.is(rt.HSL) && i !== void 0 ? i : (this._ensureHSL(), I.channel.hsl2rgb(e, "g"));
  }
  get b() {
    const e = this.data, i = e.b;
    return !this.type.is(rt.HSL) && i !== void 0 ? i : (this._ensureHSL(), I.channel.hsl2rgb(e, "b"));
  }
  get h() {
    const e = this.data, i = e.h;
    return !this.type.is(rt.RGB) && i !== void 0 ? i : (this._ensureRGB(), I.channel.rgb2hsl(e, "h"));
  }
  get s() {
    const e = this.data, i = e.s;
    return !this.type.is(rt.RGB) && i !== void 0 ? i : (this._ensureRGB(), I.channel.rgb2hsl(e, "s"));
  }
  get l() {
    const e = this.data, i = e.l;
    return !this.type.is(rt.RGB) && i !== void 0 ? i : (this._ensureRGB(), I.channel.rgb2hsl(e, "l"));
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
const Cd = yd, xd = new Cd({ r: 0, g: 0, b: 0, a: 0 }, "transparent"), hr = xd, ra = {
  /* VARIABLES */
  re: /^#((?:[a-f0-9]{2}){2,4}|[a-f0-9]{3})$/i,
  /* API */
  parse: (t) => {
    if (t.charCodeAt(0) !== 35)
      return;
    const e = t.match(ra.re);
    if (!e)
      return;
    const i = e[1], r = parseInt(i, 16), n = i.length, o = n % 4 === 0, s = n > 4, a = s ? 1 : 17, l = s ? 8 : 4, h = o ? 0 : -1, c = s ? 255 : 15;
    return hr.set({
      r: (r >> l * (h + 3) & c) * a,
      g: (r >> l * (h + 2) & c) * a,
      b: (r >> l * (h + 1) & c) * a,
      a: o ? (r & c) * a / 255 : 1
    }, t);
  },
  stringify: (t) => {
    const { r: e, g: i, b: r, a: n } = t;
    return n < 1 ? `#${Kt[Math.round(e)]}${Kt[Math.round(i)]}${Kt[Math.round(r)]}${Kt[Math.round(n * 255)]}` : `#${Kt[Math.round(e)]}${Kt[Math.round(i)]}${Kt[Math.round(r)]}`;
  }
}, je = ra, Li = {
  /* VARIABLES */
  re: /^hsla?\(\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e-?\d+)?(?:deg|grad|rad|turn)?)\s*?(?:,|\s)\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e-?\d+)?%)\s*?(?:,|\s)\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e-?\d+)?%)(?:\s*?(?:,|\/)\s*?\+?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e-?\d+)?(%)?))?\s*?\)$/i,
  hueRe: /^(.+?)(deg|grad|rad|turn)$/i,
  /* HELPERS */
  _hue2deg: (t) => {
    const e = t.match(Li.hueRe);
    if (e) {
      const [, i, r] = e;
      switch (r) {
        case "grad":
          return I.channel.clamp.h(parseFloat(i) * 0.9);
        case "rad":
          return I.channel.clamp.h(parseFloat(i) * 180 / Math.PI);
        case "turn":
          return I.channel.clamp.h(parseFloat(i) * 360);
      }
    }
    return I.channel.clamp.h(parseFloat(t));
  },
  /* API */
  parse: (t) => {
    const e = t.charCodeAt(0);
    if (e !== 104 && e !== 72)
      return;
    const i = t.match(Li.re);
    if (!i)
      return;
    const [, r, n, o, s, a] = i;
    return hr.set({
      h: Li._hue2deg(r),
      s: I.channel.clamp.s(parseFloat(n)),
      l: I.channel.clamp.l(parseFloat(o)),
      a: s ? I.channel.clamp.a(a ? parseFloat(s) / 100 : parseFloat(s)) : 1
    }, t);
  },
  stringify: (t) => {
    const { h: e, s: i, l: r, a: n } = t;
    return n < 1 ? `hsla(${I.lang.round(e)}, ${I.lang.round(i)}%, ${I.lang.round(r)}%, ${n})` : `hsl(${I.lang.round(e)}, ${I.lang.round(i)}%, ${I.lang.round(r)}%)`;
  }
}, xi = Li, Ai = {
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
    const e = Ai.colors[t];
    if (e)
      return je.parse(e);
  },
  stringify: (t) => {
    const e = je.stringify(t);
    for (const i in Ai.colors)
      if (Ai.colors[i] === e)
        return i;
  }
}, $o = Ai, na = {
  /* VARIABLES */
  re: /^rgba?\(\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e\d+)?(%?))\s*?(?:,|\s)\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e\d+)?(%?))\s*?(?:,|\s)\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e\d+)?(%?))(?:\s*?(?:,|\/)\s*?\+?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e\d+)?(%?)))?\s*?\)$/i,
  /* API */
  parse: (t) => {
    const e = t.charCodeAt(0);
    if (e !== 114 && e !== 82)
      return;
    const i = t.match(na.re);
    if (!i)
      return;
    const [, r, n, o, s, a, l, h, c] = i;
    return hr.set({
      r: I.channel.clamp.r(n ? parseFloat(r) * 2.55 : parseFloat(r)),
      g: I.channel.clamp.g(s ? parseFloat(o) * 2.55 : parseFloat(o)),
      b: I.channel.clamp.b(l ? parseFloat(a) * 2.55 : parseFloat(a)),
      a: h ? I.channel.clamp.a(c ? parseFloat(h) / 100 : parseFloat(h)) : 1
    }, t);
  },
  stringify: (t) => {
    const { r: e, g: i, b: r, a: n } = t;
    return n < 1 ? `rgba(${I.lang.round(e)}, ${I.lang.round(i)}, ${I.lang.round(r)}, ${I.lang.round(n)})` : `rgb(${I.lang.round(e)}, ${I.lang.round(i)}, ${I.lang.round(r)})`;
  }
}, bi = na, bd = {
  /* VARIABLES */
  format: {
    keyword: $o,
    hex: je,
    rgb: bi,
    rgba: bi,
    hsl: xi,
    hsla: xi
  },
  /* API */
  parse: (t) => {
    if (typeof t != "string")
      return t;
    const e = je.parse(t) || bi.parse(t) || xi.parse(t) || $o.parse(t);
    if (e)
      return e;
    throw new Error(`Unsupported color format: "${t}"`);
  },
  stringify: (t) => !t.changed && t.color ? t.color : t.type.is(rt.HSL) || t.data.r === void 0 ? xi.stringify(t) : t.a < 1 || !Number.isInteger(t.r) || !Number.isInteger(t.g) || !Number.isInteger(t.b) ? bi.stringify(t) : je.stringify(t)
}, Ot = bd, Td = (t, e) => {
  const i = Ot.parse(t);
  for (const r in e)
    i[r] = I.channel.clamp[r](e[r]);
  return Ot.stringify(i);
}, oa = Td, Sd = (t, e, i = 0, r = 1) => {
  if (typeof t != "number")
    return oa(t, { a: e });
  const n = hr.set({
    r: I.channel.clamp.r(t),
    g: I.channel.clamp.g(e),
    b: I.channel.clamp.b(i),
    a: I.channel.clamp.a(r)
  });
  return Ot.stringify(n);
}, Ue = Sd, kd = (t) => {
  const { r: e, g: i, b: r } = Ot.parse(t), n = 0.2126 * I.channel.toLinear(e) + 0.7152 * I.channel.toLinear(i) + 0.0722 * I.channel.toLinear(r);
  return I.lang.round(n);
}, vd = kd, wd = (t) => vd(t) >= 0.5, Bd = wd, Fd = (t) => !Bd(t), si = Fd, Ld = (t, e, i) => {
  const r = Ot.parse(t), n = r[e], o = I.channel.clamp[e](n + i);
  return n !== o && (r[e] = o), Ot.stringify(r);
}, sa = Ld, Ad = (t, e) => sa(t, "l", e), F = Ad, Ed = (t, e) => sa(t, "l", -e), A = Ed, Md = (t, e) => {
  const i = Ot.parse(t), r = {};
  for (const n in e)
    e[n] && (r[n] = i[n] + e[n]);
  return oa(t, r);
}, d = Md, Od = (t, e, i = 50) => {
  const { r, g: n, b: o, a: s } = Ot.parse(t), { r: a, g: l, b: h, a: c } = Ot.parse(e), u = i / 100, g = u * 2 - 1, p = s - c, v = ((g * p === -1 ? g : (g + p) / (1 + g * p)) + 1) / 2, M = 1 - v, q = r * v + a * M, k = n * v + l * M, z = o * v + h * M, Q = s * u + c * (1 - u);
  return Ue(q, k, z, Q);
}, Id = Od, $d = (t, e = 100) => {
  const i = Ot.parse(t);
  return i.r = 255 - i.r, i.g = 255 - i.g, i.b = 255 - i.b, Id(i, t, e);
}, C = $d, lt = (t, e) => e ? d(t, { s: -40, l: 10 }) : d(t, { s: -40, l: -10 }), cr = "#ffffff", ur = "#f2f2f2";
let Dd = class {
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
    this.classText = this.classText || this.textColor, this.fillType0 = this.fillType0 || this.primaryColor, this.fillType1 = this.fillType1 || this.secondaryColor, this.fillType2 = this.fillType2 || d(this.primaryColor, { h: 64 }), this.fillType3 = this.fillType3 || d(this.secondaryColor, { h: 64 }), this.fillType4 = this.fillType4 || d(this.primaryColor, { h: -64 }), this.fillType5 = this.fillType5 || d(this.secondaryColor, { h: -64 }), this.fillType6 = this.fillType6 || d(this.primaryColor, { h: 128 }), this.fillType7 = this.fillType7 || d(this.secondaryColor, { h: 128 }), this.pie1 = this.pie1 || this.primaryColor, this.pie2 = this.pie2 || this.secondaryColor, this.pie3 = this.pie3 || this.tertiaryColor, this.pie4 = this.pie4 || d(this.primaryColor, { l: -10 }), this.pie5 = this.pie5 || d(this.secondaryColor, { l: -10 }), this.pie6 = this.pie6 || d(this.tertiaryColor, { l: -10 }), this.pie7 = this.pie7 || d(this.primaryColor, { h: 60, l: -10 }), this.pie8 = this.pie8 || d(this.primaryColor, { h: -60, l: -10 }), this.pie9 = this.pie9 || d(this.primaryColor, { h: 120, l: 0 }), this.pie10 = this.pie10 || d(this.primaryColor, { h: 60, l: -20 }), this.pie11 = this.pie11 || d(this.primaryColor, { h: -60, l: -20 }), this.pie12 = this.pie12 || d(this.primaryColor, { h: 120, l: -10 }), this.pieTitleTextSize = this.pieTitleTextSize || "25px", this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor, this.pieSectionTextSize = this.pieSectionTextSize || "17px", this.pieSectionTextColor = this.pieSectionTextColor || this.textColor, this.pieLegendTextSize = this.pieLegendTextSize || "17px", this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor, this.pieStrokeColor = this.pieStrokeColor || "black", this.pieStrokeWidth = this.pieStrokeWidth || "2px", this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || "2px", this.pieOuterStrokeColor = this.pieOuterStrokeColor || "black", this.pieOpacity = this.pieOpacity || "0.7", this.quadrant1Fill = this.quadrant1Fill || this.primaryColor, this.quadrant2Fill = this.quadrant2Fill || d(this.primaryColor, { r: 5, g: 5, b: 5 }), this.quadrant3Fill = this.quadrant3Fill || d(this.primaryColor, { r: 10, g: 10, b: 10 }), this.quadrant4Fill = this.quadrant4Fill || d(this.primaryColor, { r: 15, g: 15, b: 15 }), this.quadrant1TextFill = this.quadrant1TextFill || this.primaryTextColor, this.quadrant2TextFill = this.quadrant2TextFill || d(this.primaryTextColor, { r: -5, g: -5, b: -5 }), this.quadrant3TextFill = this.quadrant3TextFill || d(this.primaryTextColor, { r: -10, g: -10, b: -10 }), this.quadrant4TextFill = this.quadrant4TextFill || d(this.primaryTextColor, { r: -15, g: -15, b: -15 }), this.quadrantPointFill = this.quadrantPointFill || si(this.quadrant1Fill) ? F(this.quadrant1Fill) : A(this.quadrant1Fill), this.quadrantPointTextFill = this.quadrantPointTextFill || this.primaryTextColor, this.quadrantXAxisTextFill = this.quadrantXAxisTextFill || this.primaryTextColor, this.quadrantYAxisTextFill = this.quadrantYAxisTextFill || this.primaryTextColor, this.quadrantInternalBorderStrokeFill = this.quadrantInternalBorderStrokeFill || this.primaryBorderColor, this.quadrantExternalBorderStrokeFill = this.quadrantExternalBorderStrokeFill || this.primaryBorderColor, this.quadrantTitleFill = this.quadrantTitleFill || this.primaryTextColor, this.requirementBackground = this.requirementBackground || this.primaryColor, this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor, this.requirementBorderSize = this.requirementBorderSize || "1", this.requirementTextColor = this.requirementTextColor || this.primaryTextColor, this.relationColor = this.relationColor || this.lineColor, this.relationLabelBackground = this.relationLabelBackground || (this.darkMode ? A(this.secondaryColor, 30) : this.secondaryColor), this.relationLabelColor = this.relationLabelColor || this.actorTextColor, this.git0 = this.git0 || this.primaryColor, this.git1 = this.git1 || this.secondaryColor, this.git2 = this.git2 || this.tertiaryColor, this.git3 = this.git3 || d(this.primaryColor, { h: -30 }), this.git4 = this.git4 || d(this.primaryColor, { h: -60 }), this.git5 = this.git5 || d(this.primaryColor, { h: -90 }), this.git6 = this.git6 || d(this.primaryColor, { h: 60 }), this.git7 = this.git7 || d(this.primaryColor, { h: 120 }), this.darkMode ? (this.git0 = F(this.git0, 25), this.git1 = F(this.git1, 25), this.git2 = F(this.git2, 25), this.git3 = F(this.git3, 25), this.git4 = F(this.git4, 25), this.git5 = F(this.git5, 25), this.git6 = F(this.git6, 25), this.git7 = F(this.git7, 25)) : (this.git0 = A(this.git0, 25), this.git1 = A(this.git1, 25), this.git2 = A(this.git2, 25), this.git3 = A(this.git3, 25), this.git4 = A(this.git4, 25), this.git5 = A(this.git5, 25), this.git6 = A(this.git6, 25), this.git7 = A(this.git7, 25)), this.gitInv0 = this.gitInv0 || C(this.git0), this.gitInv1 = this.gitInv1 || C(this.git1), this.gitInv2 = this.gitInv2 || C(this.git2), this.gitInv3 = this.gitInv3 || C(this.git3), this.gitInv4 = this.gitInv4 || C(this.git4), this.gitInv5 = this.gitInv5 || C(this.git5), this.gitInv6 = this.gitInv6 || C(this.git6), this.gitInv7 = this.gitInv7 || C(this.git7), this.branchLabelColor = this.branchLabelColor || (this.darkMode ? "black" : this.labelTextColor), this.gitBranchLabel0 = this.gitBranchLabel0 || this.branchLabelColor, this.gitBranchLabel1 = this.gitBranchLabel1 || this.branchLabelColor, this.gitBranchLabel2 = this.gitBranchLabel2 || this.branchLabelColor, this.gitBranchLabel3 = this.gitBranchLabel3 || this.branchLabelColor, this.gitBranchLabel4 = this.gitBranchLabel4 || this.branchLabelColor, this.gitBranchLabel5 = this.gitBranchLabel5 || this.branchLabelColor, this.gitBranchLabel6 = this.gitBranchLabel6 || this.branchLabelColor, this.gitBranchLabel7 = this.gitBranchLabel7 || this.branchLabelColor, this.tagLabelColor = this.tagLabelColor || this.primaryTextColor, this.tagLabelBackground = this.tagLabelBackground || this.primaryColor, this.tagLabelBorder = this.tagBorder || this.primaryBorderColor, this.tagLabelFontSize = this.tagLabelFontSize || "10px", this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor, this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor, this.commitLabelFontSize = this.commitLabelFontSize || "10px", this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || cr, this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || ur;
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
const Nd = (t) => {
  const e = new Dd();
  return e.calculate(t), e;
};
let Rd = class {
  constructor() {
    this.background = "#333", this.primaryColor = "#1f2020", this.secondaryColor = F(this.primaryColor, 16), this.tertiaryColor = d(this.primaryColor, { h: -160 }), this.primaryBorderColor = C(this.background), this.secondaryBorderColor = lt(this.secondaryColor, this.darkMode), this.tertiaryBorderColor = lt(this.tertiaryColor, this.darkMode), this.primaryTextColor = C(this.primaryColor), this.secondaryTextColor = C(this.secondaryColor), this.tertiaryTextColor = C(this.tertiaryColor), this.lineColor = C(this.background), this.textColor = C(this.background), this.mainBkg = "#1f2020", this.secondBkg = "calculated", this.mainContrastColor = "lightgrey", this.darkTextColor = F(C("#323D47"), 10), this.lineColor = "calculated", this.border1 = "#81B1DB", this.border2 = Ue(255, 255, 255, 0.25), this.arrowheadColor = "calculated", this.fontFamily = '"trebuchet ms", verdana, arial, sans-serif', this.fontSize = "16px", this.labelBackground = "#181818", this.textColor = "#ccc", this.THEME_COLOR_LIMIT = 12, this.nodeBkg = "calculated", this.nodeBorder = "calculated", this.clusterBkg = "calculated", this.clusterBorder = "calculated", this.defaultLinkColor = "calculated", this.titleColor = "#F9FFFE", this.edgeLabelBackground = "calculated", this.actorBorder = "calculated", this.actorBkg = "calculated", this.actorTextColor = "calculated", this.actorLineColor = "calculated", this.signalColor = "calculated", this.signalTextColor = "calculated", this.labelBoxBkgColor = "calculated", this.labelBoxBorderColor = "calculated", this.labelTextColor = "calculated", this.loopTextColor = "calculated", this.noteBorderColor = "calculated", this.noteBkgColor = "#fff5ad", this.noteTextColor = "calculated", this.activationBorderColor = "calculated", this.activationBkgColor = "calculated", this.sequenceNumberColor = "black", this.sectionBkgColor = A("#EAE8D9", 30), this.altSectionBkgColor = "calculated", this.sectionBkgColor2 = "#EAE8D9", this.excludeBkgColor = A(this.sectionBkgColor, 10), this.taskBorderColor = Ue(255, 255, 255, 70), this.taskBkgColor = "calculated", this.taskTextColor = "calculated", this.taskTextLightColor = "calculated", this.taskTextOutsideColor = "calculated", this.taskTextClickableColor = "#003163", this.activeTaskBorderColor = Ue(255, 255, 255, 50), this.activeTaskBkgColor = "#81B1DB", this.gridColor = "calculated", this.doneTaskBkgColor = "calculated", this.doneTaskBorderColor = "grey", this.critBorderColor = "#E83737", this.critBkgColor = "#E83737", this.taskTextDarkColor = "calculated", this.todayLineColor = "#DB5757", this.personBorder = this.primaryBorderColor, this.personBkg = this.mainBkg, this.labelColor = "calculated", this.errorBkgColor = "#a44141", this.errorTextColor = "#ddd";
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
    this.pieTitleTextSize = this.pieTitleTextSize || "25px", this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor, this.pieSectionTextSize = this.pieSectionTextSize || "17px", this.pieSectionTextColor = this.pieSectionTextColor || this.textColor, this.pieLegendTextSize = this.pieLegendTextSize || "17px", this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor, this.pieStrokeColor = this.pieStrokeColor || "black", this.pieStrokeWidth = this.pieStrokeWidth || "2px", this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || "2px", this.pieOuterStrokeColor = this.pieOuterStrokeColor || "black", this.pieOpacity = this.pieOpacity || "0.7", this.quadrant1Fill = this.quadrant1Fill || this.primaryColor, this.quadrant2Fill = this.quadrant2Fill || d(this.primaryColor, { r: 5, g: 5, b: 5 }), this.quadrant3Fill = this.quadrant3Fill || d(this.primaryColor, { r: 10, g: 10, b: 10 }), this.quadrant4Fill = this.quadrant4Fill || d(this.primaryColor, { r: 15, g: 15, b: 15 }), this.quadrant1TextFill = this.quadrant1TextFill || this.primaryTextColor, this.quadrant2TextFill = this.quadrant2TextFill || d(this.primaryTextColor, { r: -5, g: -5, b: -5 }), this.quadrant3TextFill = this.quadrant3TextFill || d(this.primaryTextColor, { r: -10, g: -10, b: -10 }), this.quadrant4TextFill = this.quadrant4TextFill || d(this.primaryTextColor, { r: -15, g: -15, b: -15 }), this.quadrantPointFill = this.quadrantPointFill || si(this.quadrant1Fill) ? F(this.quadrant1Fill) : A(this.quadrant1Fill), this.quadrantPointTextFill = this.quadrantPointTextFill || this.primaryTextColor, this.quadrantXAxisTextFill = this.quadrantXAxisTextFill || this.primaryTextColor, this.quadrantYAxisTextFill = this.quadrantYAxisTextFill || this.primaryTextColor, this.quadrantInternalBorderStrokeFill = this.quadrantInternalBorderStrokeFill || this.primaryBorderColor, this.quadrantExternalBorderStrokeFill = this.quadrantExternalBorderStrokeFill || this.primaryBorderColor, this.quadrantTitleFill = this.quadrantTitleFill || this.primaryTextColor, this.classText = this.primaryTextColor, this.requirementBackground = this.requirementBackground || this.primaryColor, this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor, this.requirementBorderSize = this.requirementBorderSize || "1", this.requirementTextColor = this.requirementTextColor || this.primaryTextColor, this.relationColor = this.relationColor || this.lineColor, this.relationLabelBackground = this.relationLabelBackground || (this.darkMode ? A(this.secondaryColor, 30) : this.secondaryColor), this.relationLabelColor = this.relationLabelColor || this.actorTextColor, this.git0 = F(this.secondaryColor, 20), this.git1 = F(this.pie2 || this.secondaryColor, 20), this.git2 = F(this.pie3 || this.tertiaryColor, 20), this.git3 = F(this.pie4 || d(this.primaryColor, { h: -30 }), 20), this.git4 = F(this.pie5 || d(this.primaryColor, { h: -60 }), 20), this.git5 = F(this.pie6 || d(this.primaryColor, { h: -90 }), 10), this.git6 = F(this.pie7 || d(this.primaryColor, { h: 60 }), 10), this.git7 = F(this.pie8 || d(this.primaryColor, { h: 120 }), 20), this.gitInv0 = this.gitInv0 || C(this.git0), this.gitInv1 = this.gitInv1 || C(this.git1), this.gitInv2 = this.gitInv2 || C(this.git2), this.gitInv3 = this.gitInv3 || C(this.git3), this.gitInv4 = this.gitInv4 || C(this.git4), this.gitInv5 = this.gitInv5 || C(this.git5), this.gitInv6 = this.gitInv6 || C(this.git6), this.gitInv7 = this.gitInv7 || C(this.git7), this.gitBranchLabel0 = this.gitBranchLabel0 || C(this.labelTextColor), this.gitBranchLabel1 = this.gitBranchLabel1 || this.labelTextColor, this.gitBranchLabel2 = this.gitBranchLabel2 || this.labelTextColor, this.gitBranchLabel3 = this.gitBranchLabel3 || C(this.labelTextColor), this.gitBranchLabel4 = this.gitBranchLabel4 || this.labelTextColor, this.gitBranchLabel5 = this.gitBranchLabel5 || this.labelTextColor, this.gitBranchLabel6 = this.gitBranchLabel6 || this.labelTextColor, this.gitBranchLabel7 = this.gitBranchLabel7 || this.labelTextColor, this.tagLabelColor = this.tagLabelColor || this.primaryTextColor, this.tagLabelBackground = this.tagLabelBackground || this.primaryColor, this.tagLabelBorder = this.tagBorder || this.primaryBorderColor, this.tagLabelFontSize = this.tagLabelFontSize || "10px", this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor, this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor, this.commitLabelFontSize = this.commitLabelFontSize || "10px", this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || F(this.background, 12), this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || F(this.background, 2);
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
const qd = (t) => {
  const e = new Rd();
  return e.calculate(t), e;
};
let Pd = class {
  constructor() {
    this.background = "#f4f4f4", this.primaryColor = "#ECECFF", this.secondaryColor = d(this.primaryColor, { h: 120 }), this.secondaryColor = "#ffffde", this.tertiaryColor = d(this.primaryColor, { h: -160 }), this.primaryBorderColor = lt(this.primaryColor, this.darkMode), this.secondaryBorderColor = lt(this.secondaryColor, this.darkMode), this.tertiaryBorderColor = lt(this.tertiaryColor, this.darkMode), this.primaryTextColor = C(this.primaryColor), this.secondaryTextColor = C(this.secondaryColor), this.tertiaryTextColor = C(this.tertiaryColor), this.lineColor = C(this.background), this.textColor = C(this.background), this.background = "white", this.mainBkg = "#ECECFF", this.secondBkg = "#ffffde", this.lineColor = "#333333", this.border1 = "#9370DB", this.border2 = "#aaaa33", this.arrowheadColor = "#333333", this.fontFamily = '"trebuchet ms", verdana, arial, sans-serif', this.fontSize = "16px", this.labelBackground = "#e8e8e8", this.textColor = "#333", this.THEME_COLOR_LIMIT = 12, this.nodeBkg = "calculated", this.nodeBorder = "calculated", this.clusterBkg = "calculated", this.clusterBorder = "calculated", this.defaultLinkColor = "calculated", this.titleColor = "calculated", this.edgeLabelBackground = "calculated", this.actorBorder = "calculated", this.actorBkg = "calculated", this.actorTextColor = "black", this.actorLineColor = "grey", this.signalColor = "calculated", this.signalTextColor = "calculated", this.labelBoxBkgColor = "calculated", this.labelBoxBorderColor = "calculated", this.labelTextColor = "calculated", this.loopTextColor = "calculated", this.noteBorderColor = "calculated", this.noteBkgColor = "#fff5ad", this.noteTextColor = "calculated", this.activationBorderColor = "#666", this.activationBkgColor = "#f4f4f4", this.sequenceNumberColor = "white", this.sectionBkgColor = "calculated", this.altSectionBkgColor = "calculated", this.sectionBkgColor2 = "calculated", this.excludeBkgColor = "#eeeeee", this.taskBorderColor = "calculated", this.taskBkgColor = "calculated", this.taskTextLightColor = "calculated", this.taskTextColor = this.taskTextLightColor, this.taskTextDarkColor = "calculated", this.taskTextOutsideColor = this.taskTextDarkColor, this.taskTextClickableColor = "calculated", this.activeTaskBorderColor = "calculated", this.activeTaskBkgColor = "calculated", this.gridColor = "calculated", this.doneTaskBkgColor = "calculated", this.doneTaskBorderColor = "calculated", this.critBorderColor = "calculated", this.critBkgColor = "calculated", this.todayLineColor = "calculated", this.sectionBkgColor = Ue(102, 102, 255, 0.49), this.altSectionBkgColor = "white", this.sectionBkgColor2 = "#fff400", this.taskBorderColor = "#534fbc", this.taskBkgColor = "#8a90dd", this.taskTextLightColor = "white", this.taskTextColor = "calculated", this.taskTextDarkColor = "black", this.taskTextOutsideColor = "calculated", this.taskTextClickableColor = "#003163", this.activeTaskBorderColor = "#534fbc", this.activeTaskBkgColor = "#bfc7ff", this.gridColor = "lightgrey", this.doneTaskBkgColor = "lightgrey", this.doneTaskBorderColor = "grey", this.critBorderColor = "#ff8888", this.critBkgColor = "red", this.todayLineColor = "red", this.personBorder = this.primaryBorderColor, this.personBkg = this.mainBkg, this.labelColor = "black", this.errorBkgColor = "#552222", this.errorTextColor = "#552222", this.updateColors();
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
    this.nodeBkg = this.mainBkg, this.nodeBorder = this.border1, this.clusterBkg = this.secondBkg, this.clusterBorder = this.border2, this.defaultLinkColor = this.lineColor, this.titleColor = this.textColor, this.edgeLabelBackground = this.labelBackground, this.actorBorder = F(this.border1, 23), this.actorBkg = this.mainBkg, this.labelBoxBkgColor = this.actorBkg, this.signalColor = this.textColor, this.signalTextColor = this.textColor, this.labelBoxBorderColor = this.actorBorder, this.labelTextColor = this.actorTextColor, this.loopTextColor = this.actorTextColor, this.noteBorderColor = this.border2, this.noteTextColor = this.actorTextColor, this.taskTextColor = this.taskTextLightColor, this.taskTextOutsideColor = this.taskTextDarkColor, this.transitionColor = this.transitionColor || this.lineColor, this.transitionLabelColor = this.transitionLabelColor || this.textColor, this.stateLabelColor = this.stateLabelColor || this.stateBkg || this.primaryTextColor, this.stateBkg = this.stateBkg || this.mainBkg, this.labelBackgroundColor = this.labelBackgroundColor || this.stateBkg, this.compositeBackground = this.compositeBackground || this.background || this.tertiaryColor, this.altBackground = this.altBackground || "#f0f0f0", this.compositeTitleBackground = this.compositeTitleBackground || this.mainBkg, this.compositeBorder = this.compositeBorder || this.nodeBorder, this.innerEndBackground = this.nodeBorder, this.specialStateColor = this.lineColor, this.errorBkgColor = this.errorBkgColor || this.tertiaryColor, this.errorTextColor = this.errorTextColor || this.tertiaryTextColor, this.transitionColor = this.transitionColor || this.lineColor, this.classText = this.primaryTextColor, this.fillType0 = this.primaryColor, this.fillType1 = this.secondaryColor, this.fillType2 = d(this.primaryColor, { h: 64 }), this.fillType3 = d(this.secondaryColor, { h: 64 }), this.fillType4 = d(this.primaryColor, { h: -64 }), this.fillType5 = d(this.secondaryColor, { h: -64 }), this.fillType6 = d(this.primaryColor, { h: 128 }), this.fillType7 = d(this.secondaryColor, { h: 128 }), this.pie1 = this.pie1 || this.primaryColor, this.pie2 = this.pie2 || this.secondaryColor, this.pie3 = this.pie3 || d(this.tertiaryColor, { l: -40 }), this.pie4 = this.pie4 || d(this.primaryColor, { l: -10 }), this.pie5 = this.pie5 || d(this.secondaryColor, { l: -30 }), this.pie6 = this.pie6 || d(this.tertiaryColor, { l: -20 }), this.pie7 = this.pie7 || d(this.primaryColor, { h: 60, l: -20 }), this.pie8 = this.pie8 || d(this.primaryColor, { h: -60, l: -40 }), this.pie9 = this.pie9 || d(this.primaryColor, { h: 120, l: -40 }), this.pie10 = this.pie10 || d(this.primaryColor, { h: 60, l: -40 }), this.pie11 = this.pie11 || d(this.primaryColor, { h: -90, l: -40 }), this.pie12 = this.pie12 || d(this.primaryColor, { h: 120, l: -30 }), this.pieTitleTextSize = this.pieTitleTextSize || "25px", this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor, this.pieSectionTextSize = this.pieSectionTextSize || "17px", this.pieSectionTextColor = this.pieSectionTextColor || this.textColor, this.pieLegendTextSize = this.pieLegendTextSize || "17px", this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor, this.pieStrokeColor = this.pieStrokeColor || "black", this.pieStrokeWidth = this.pieStrokeWidth || "2px", this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || "2px", this.pieOuterStrokeColor = this.pieOuterStrokeColor || "black", this.pieOpacity = this.pieOpacity || "0.7", this.quadrant1Fill = this.quadrant1Fill || this.primaryColor, this.quadrant2Fill = this.quadrant2Fill || d(this.primaryColor, { r: 5, g: 5, b: 5 }), this.quadrant3Fill = this.quadrant3Fill || d(this.primaryColor, { r: 10, g: 10, b: 10 }), this.quadrant4Fill = this.quadrant4Fill || d(this.primaryColor, { r: 15, g: 15, b: 15 }), this.quadrant1TextFill = this.quadrant1TextFill || this.primaryTextColor, this.quadrant2TextFill = this.quadrant2TextFill || d(this.primaryTextColor, { r: -5, g: -5, b: -5 }), this.quadrant3TextFill = this.quadrant3TextFill || d(this.primaryTextColor, { r: -10, g: -10, b: -10 }), this.quadrant4TextFill = this.quadrant4TextFill || d(this.primaryTextColor, { r: -15, g: -15, b: -15 }), this.quadrantPointFill = this.quadrantPointFill || si(this.quadrant1Fill) ? F(this.quadrant1Fill) : A(this.quadrant1Fill), this.quadrantPointTextFill = this.quadrantPointTextFill || this.primaryTextColor, this.quadrantXAxisTextFill = this.quadrantXAxisTextFill || this.primaryTextColor, this.quadrantYAxisTextFill = this.quadrantYAxisTextFill || this.primaryTextColor, this.quadrantInternalBorderStrokeFill = this.quadrantInternalBorderStrokeFill || this.primaryBorderColor, this.quadrantExternalBorderStrokeFill = this.quadrantExternalBorderStrokeFill || this.primaryBorderColor, this.quadrantTitleFill = this.quadrantTitleFill || this.primaryTextColor, this.requirementBackground = this.requirementBackground || this.primaryColor, this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor, this.requirementBorderSize = this.requirementBorderSize || "1", this.requirementTextColor = this.requirementTextColor || this.primaryTextColor, this.relationColor = this.relationColor || this.lineColor, this.relationLabelBackground = this.relationLabelBackground || this.labelBackground, this.relationLabelColor = this.relationLabelColor || this.actorTextColor, this.git0 = this.git0 || this.primaryColor, this.git1 = this.git1 || this.secondaryColor, this.git2 = this.git2 || this.tertiaryColor, this.git3 = this.git3 || d(this.primaryColor, { h: -30 }), this.git4 = this.git4 || d(this.primaryColor, { h: -60 }), this.git5 = this.git5 || d(this.primaryColor, { h: -90 }), this.git6 = this.git6 || d(this.primaryColor, { h: 60 }), this.git7 = this.git7 || d(this.primaryColor, { h: 120 }), this.darkMode ? (this.git0 = F(this.git0, 25), this.git1 = F(this.git1, 25), this.git2 = F(this.git2, 25), this.git3 = F(this.git3, 25), this.git4 = F(this.git4, 25), this.git5 = F(this.git5, 25), this.git6 = F(this.git6, 25), this.git7 = F(this.git7, 25)) : (this.git0 = A(this.git0, 25), this.git1 = A(this.git1, 25), this.git2 = A(this.git2, 25), this.git3 = A(this.git3, 25), this.git4 = A(this.git4, 25), this.git5 = A(this.git5, 25), this.git6 = A(this.git6, 25), this.git7 = A(this.git7, 25)), this.gitInv0 = this.gitInv0 || A(C(this.git0), 25), this.gitInv1 = this.gitInv1 || C(this.git1), this.gitInv2 = this.gitInv2 || C(this.git2), this.gitInv3 = this.gitInv3 || C(this.git3), this.gitInv4 = this.gitInv4 || C(this.git4), this.gitInv5 = this.gitInv5 || C(this.git5), this.gitInv6 = this.gitInv6 || C(this.git6), this.gitInv7 = this.gitInv7 || C(this.git7), this.gitBranchLabel0 = this.gitBranchLabel0 || C(this.labelTextColor), this.gitBranchLabel1 = this.gitBranchLabel1 || this.labelTextColor, this.gitBranchLabel2 = this.gitBranchLabel2 || this.labelTextColor, this.gitBranchLabel3 = this.gitBranchLabel3 || C(this.labelTextColor), this.gitBranchLabel4 = this.gitBranchLabel4 || this.labelTextColor, this.gitBranchLabel5 = this.gitBranchLabel5 || this.labelTextColor, this.gitBranchLabel6 = this.gitBranchLabel6 || this.labelTextColor, this.gitBranchLabel7 = this.gitBranchLabel7 || this.labelTextColor, this.tagLabelColor = this.tagLabelColor || this.primaryTextColor, this.tagLabelBackground = this.tagLabelBackground || this.primaryColor, this.tagLabelBorder = this.tagBorder || this.primaryBorderColor, this.tagLabelFontSize = this.tagLabelFontSize || "10px", this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor, this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor, this.commitLabelFontSize = this.commitLabelFontSize || "10px", this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || cr, this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || ur;
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
const zd = (t) => {
  const e = new Pd();
  return e.calculate(t), e;
};
let Wd = class {
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
    this.nodeBkg = this.mainBkg, this.nodeBorder = this.border1, this.clusterBkg = this.secondBkg, this.clusterBorder = this.border2, this.defaultLinkColor = this.lineColor, this.taskBorderColor = this.border1, this.taskTextColor = this.taskTextLightColor, this.taskTextOutsideColor = this.taskTextDarkColor, this.activeTaskBorderColor = this.taskBorderColor, this.activeTaskBkgColor = this.mainBkg, this.transitionColor = this.transitionColor || this.lineColor, this.transitionLabelColor = this.transitionLabelColor || this.textColor, this.stateLabelColor = this.stateLabelColor || this.stateBkg || this.primaryTextColor, this.stateBkg = this.stateBkg || this.mainBkg, this.labelBackgroundColor = this.labelBackgroundColor || this.stateBkg, this.compositeBackground = this.compositeBackground || this.background || this.tertiaryColor, this.altBackground = this.altBackground || "#f0f0f0", this.compositeTitleBackground = this.compositeTitleBackground || this.mainBkg, this.compositeBorder = this.compositeBorder || this.nodeBorder, this.innerEndBackground = this.primaryBorderColor, this.specialStateColor = this.lineColor, this.errorBkgColor = this.errorBkgColor || this.tertiaryColor, this.errorTextColor = this.errorTextColor || this.tertiaryTextColor, this.transitionColor = this.transitionColor || this.lineColor, this.classText = this.primaryTextColor, this.fillType0 = this.primaryColor, this.fillType1 = this.secondaryColor, this.fillType2 = d(this.primaryColor, { h: 64 }), this.fillType3 = d(this.secondaryColor, { h: 64 }), this.fillType4 = d(this.primaryColor, { h: -64 }), this.fillType5 = d(this.secondaryColor, { h: -64 }), this.fillType6 = d(this.primaryColor, { h: 128 }), this.fillType7 = d(this.secondaryColor, { h: 128 }), this.pie1 = this.pie1 || this.primaryColor, this.pie2 = this.pie2 || this.secondaryColor, this.pie3 = this.pie3 || this.tertiaryColor, this.pie4 = this.pie4 || d(this.primaryColor, { l: -30 }), this.pie5 = this.pie5 || d(this.secondaryColor, { l: -30 }), this.pie6 = this.pie6 || d(this.tertiaryColor, { h: 40, l: -40 }), this.pie7 = this.pie7 || d(this.primaryColor, { h: 60, l: -10 }), this.pie8 = this.pie8 || d(this.primaryColor, { h: -60, l: -10 }), this.pie9 = this.pie9 || d(this.primaryColor, { h: 120, l: 0 }), this.pie10 = this.pie10 || d(this.primaryColor, { h: 60, l: -50 }), this.pie11 = this.pie11 || d(this.primaryColor, { h: -60, l: -50 }), this.pie12 = this.pie12 || d(this.primaryColor, { h: 120, l: -50 }), this.pieTitleTextSize = this.pieTitleTextSize || "25px", this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor, this.pieSectionTextSize = this.pieSectionTextSize || "17px", this.pieSectionTextColor = this.pieSectionTextColor || this.textColor, this.pieLegendTextSize = this.pieLegendTextSize || "17px", this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor, this.pieStrokeColor = this.pieStrokeColor || "black", this.pieStrokeWidth = this.pieStrokeWidth || "2px", this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || "2px", this.pieOuterStrokeColor = this.pieOuterStrokeColor || "black", this.pieOpacity = this.pieOpacity || "0.7", this.quadrant1Fill = this.quadrant1Fill || this.primaryColor, this.quadrant2Fill = this.quadrant2Fill || d(this.primaryColor, { r: 5, g: 5, b: 5 }), this.quadrant3Fill = this.quadrant3Fill || d(this.primaryColor, { r: 10, g: 10, b: 10 }), this.quadrant4Fill = this.quadrant4Fill || d(this.primaryColor, { r: 15, g: 15, b: 15 }), this.quadrant1TextFill = this.quadrant1TextFill || this.primaryTextColor, this.quadrant2TextFill = this.quadrant2TextFill || d(this.primaryTextColor, { r: -5, g: -5, b: -5 }), this.quadrant3TextFill = this.quadrant3TextFill || d(this.primaryTextColor, { r: -10, g: -10, b: -10 }), this.quadrant4TextFill = this.quadrant4TextFill || d(this.primaryTextColor, { r: -15, g: -15, b: -15 }), this.quadrantPointFill = this.quadrantPointFill || si(this.quadrant1Fill) ? F(this.quadrant1Fill) : A(this.quadrant1Fill), this.quadrantPointTextFill = this.quadrantPointTextFill || this.primaryTextColor, this.quadrantXAxisTextFill = this.quadrantXAxisTextFill || this.primaryTextColor, this.quadrantYAxisTextFill = this.quadrantYAxisTextFill || this.primaryTextColor, this.quadrantInternalBorderStrokeFill = this.quadrantInternalBorderStrokeFill || this.primaryBorderColor, this.quadrantExternalBorderStrokeFill = this.quadrantExternalBorderStrokeFill || this.primaryBorderColor, this.quadrantTitleFill = this.quadrantTitleFill || this.primaryTextColor, this.requirementBackground = this.requirementBackground || this.primaryColor, this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor, this.requirementBorderSize = this.requirementBorderSize || "1", this.requirementTextColor = this.requirementTextColor || this.primaryTextColor, this.relationColor = this.relationColor || this.lineColor, this.relationLabelBackground = this.relationLabelBackground || this.edgeLabelBackground, this.relationLabelColor = this.relationLabelColor || this.actorTextColor, this.git0 = this.git0 || this.primaryColor, this.git1 = this.git1 || this.secondaryColor, this.git2 = this.git2 || this.tertiaryColor, this.git3 = this.git3 || d(this.primaryColor, { h: -30 }), this.git4 = this.git4 || d(this.primaryColor, { h: -60 }), this.git5 = this.git5 || d(this.primaryColor, { h: -90 }), this.git6 = this.git6 || d(this.primaryColor, { h: 60 }), this.git7 = this.git7 || d(this.primaryColor, { h: 120 }), this.darkMode ? (this.git0 = F(this.git0, 25), this.git1 = F(this.git1, 25), this.git2 = F(this.git2, 25), this.git3 = F(this.git3, 25), this.git4 = F(this.git4, 25), this.git5 = F(this.git5, 25), this.git6 = F(this.git6, 25), this.git7 = F(this.git7, 25)) : (this.git0 = A(this.git0, 25), this.git1 = A(this.git1, 25), this.git2 = A(this.git2, 25), this.git3 = A(this.git3, 25), this.git4 = A(this.git4, 25), this.git5 = A(this.git5, 25), this.git6 = A(this.git6, 25), this.git7 = A(this.git7, 25)), this.gitInv0 = this.gitInv0 || C(this.git0), this.gitInv1 = this.gitInv1 || C(this.git1), this.gitInv2 = this.gitInv2 || C(this.git2), this.gitInv3 = this.gitInv3 || C(this.git3), this.gitInv4 = this.gitInv4 || C(this.git4), this.gitInv5 = this.gitInv5 || C(this.git5), this.gitInv6 = this.gitInv6 || C(this.git6), this.gitInv7 = this.gitInv7 || C(this.git7), this.gitBranchLabel0 = this.gitBranchLabel0 || C(this.labelTextColor), this.gitBranchLabel1 = this.gitBranchLabel1 || this.labelTextColor, this.gitBranchLabel2 = this.gitBranchLabel2 || this.labelTextColor, this.gitBranchLabel3 = this.gitBranchLabel3 || C(this.labelTextColor), this.gitBranchLabel4 = this.gitBranchLabel4 || this.labelTextColor, this.gitBranchLabel5 = this.gitBranchLabel5 || this.labelTextColor, this.gitBranchLabel6 = this.gitBranchLabel6 || this.labelTextColor, this.gitBranchLabel7 = this.gitBranchLabel7 || this.labelTextColor, this.tagLabelColor = this.tagLabelColor || this.primaryTextColor, this.tagLabelBackground = this.tagLabelBackground || this.primaryColor, this.tagLabelBorder = this.tagBorder || this.primaryBorderColor, this.tagLabelFontSize = this.tagLabelFontSize || "10px", this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor, this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor, this.commitLabelFontSize = this.commitLabelFontSize || "10px", this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || cr, this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || ur;
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
const Hd = (t) => {
  const e = new Wd();
  return e.calculate(t), e;
};
class jd {
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
    this.pie12 = this.pie0, this.pieTitleTextSize = this.pieTitleTextSize || "25px", this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor, this.pieSectionTextSize = this.pieSectionTextSize || "17px", this.pieSectionTextColor = this.pieSectionTextColor || this.textColor, this.pieLegendTextSize = this.pieLegendTextSize || "17px", this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor, this.pieStrokeColor = this.pieStrokeColor || "black", this.pieStrokeWidth = this.pieStrokeWidth || "2px", this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || "2px", this.pieOuterStrokeColor = this.pieOuterStrokeColor || "black", this.pieOpacity = this.pieOpacity || "0.7", this.quadrant1Fill = this.quadrant1Fill || this.primaryColor, this.quadrant2Fill = this.quadrant2Fill || d(this.primaryColor, { r: 5, g: 5, b: 5 }), this.quadrant3Fill = this.quadrant3Fill || d(this.primaryColor, { r: 10, g: 10, b: 10 }), this.quadrant4Fill = this.quadrant4Fill || d(this.primaryColor, { r: 15, g: 15, b: 15 }), this.quadrant1TextFill = this.quadrant1TextFill || this.primaryTextColor, this.quadrant2TextFill = this.quadrant2TextFill || d(this.primaryTextColor, { r: -5, g: -5, b: -5 }), this.quadrant3TextFill = this.quadrant3TextFill || d(this.primaryTextColor, { r: -10, g: -10, b: -10 }), this.quadrant4TextFill = this.quadrant4TextFill || d(this.primaryTextColor, { r: -15, g: -15, b: -15 }), this.quadrantPointFill = this.quadrantPointFill || si(this.quadrant1Fill) ? F(this.quadrant1Fill) : A(this.quadrant1Fill), this.quadrantPointTextFill = this.quadrantPointTextFill || this.primaryTextColor, this.quadrantXAxisTextFill = this.quadrantXAxisTextFill || this.primaryTextColor, this.quadrantYAxisTextFill = this.quadrantYAxisTextFill || this.primaryTextColor, this.quadrantInternalBorderStrokeFill = this.quadrantInternalBorderStrokeFill || this.primaryBorderColor, this.quadrantExternalBorderStrokeFill = this.quadrantExternalBorderStrokeFill || this.primaryBorderColor, this.quadrantTitleFill = this.quadrantTitleFill || this.primaryTextColor, this.requirementBackground = this.requirementBackground || this.primaryColor, this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor, this.requirementBorderSize = this.requirementBorderSize || "1", this.requirementTextColor = this.requirementTextColor || this.primaryTextColor, this.relationColor = this.relationColor || this.lineColor, this.relationLabelBackground = this.relationLabelBackground || this.edgeLabelBackground, this.relationLabelColor = this.relationLabelColor || this.actorTextColor, this.git0 = A(this.pie1, 25) || this.primaryColor, this.git1 = this.pie2 || this.secondaryColor, this.git2 = this.pie3 || this.tertiaryColor, this.git3 = this.pie4 || d(this.primaryColor, { h: -30 }), this.git4 = this.pie5 || d(this.primaryColor, { h: -60 }), this.git5 = this.pie6 || d(this.primaryColor, { h: -90 }), this.git6 = this.pie7 || d(this.primaryColor, { h: 60 }), this.git7 = this.pie8 || d(this.primaryColor, { h: 120 }), this.gitInv0 = this.gitInv0 || C(this.git0), this.gitInv1 = this.gitInv1 || C(this.git1), this.gitInv2 = this.gitInv2 || C(this.git2), this.gitInv3 = this.gitInv3 || C(this.git3), this.gitInv4 = this.gitInv4 || C(this.git4), this.gitInv5 = this.gitInv5 || C(this.git5), this.gitInv6 = this.gitInv6 || C(this.git6), this.gitInv7 = this.gitInv7 || C(this.git7), this.branchLabelColor = this.branchLabelColor || this.labelTextColor, this.gitBranchLabel0 = this.branchLabelColor, this.gitBranchLabel1 = "white", this.gitBranchLabel2 = this.branchLabelColor, this.gitBranchLabel3 = "white", this.gitBranchLabel4 = this.branchLabelColor, this.gitBranchLabel5 = this.branchLabelColor, this.gitBranchLabel6 = this.branchLabelColor, this.gitBranchLabel7 = this.branchLabelColor, this.tagLabelColor = this.tagLabelColor || this.primaryTextColor, this.tagLabelBackground = this.tagLabelBackground || this.primaryColor, this.tagLabelBorder = this.tagBorder || this.primaryBorderColor, this.tagLabelFontSize = this.tagLabelFontSize || "10px", this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor, this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor, this.commitLabelFontSize = this.commitLabelFontSize || "10px", this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || cr, this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || ur;
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
const Ud = (t) => {
  const e = new jd();
  return e.calculate(t), e;
}, Ht = {
  base: {
    getThemeVariables: Nd
  },
  dark: {
    getThemeVariables: qd
  },
  default: {
    getThemeVariables: zd
  },
  forest: {
    getThemeVariables: Hd
  },
  neutral: {
    getThemeVariables: Ud
  }
}, Xt = {
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
    nodeAlignment: "justify"
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
}, aa = {
  ...Xt,
  // Set, even though they're `undefined` so that `configKeys` finds these keys
  // TODO: Should we replace these with `null` so that they can go in the JSON Schema?
  deterministicIDSeed: void 0,
  themeCSS: void 0,
  // add non-JSON default config values
  themeVariables: Ht.default.getThemeVariables(),
  sequence: {
    ...Xt.sequence,
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
    ...Xt.gantt,
    tickInterval: void 0,
    useWidth: void 0
    // can probably be removed since `configKeys` already includes this
  },
  c4: {
    ...Xt.c4,
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
    ...Xt.pie,
    useWidth: void 0
  },
  requirement: {
    ...Xt.requirement,
    useWidth: void 0
  },
  gitGraph: {
    ...Xt.gitGraph,
    // TODO: This is a temporary override for `gitGraph`, since every other
    //       diagram does have `useMaxWidth`, but instead sets it to `true`.
    //       Should we set this to `true` instead?
    useMaxWidth: !1
  },
  sankey: {
    ...Xt.sankey,
    // this is false, unlike every other diagram (other than gitGraph)
    // TODO: can we make this default to `true` instead?
    useMaxWidth: !1
  }
}, la = (t, e = "") => Object.keys(t).reduce((i, r) => Array.isArray(t[r]) ? i : typeof t[r] == "object" && t[r] !== null ? [...i, e + r, ...la(t[r], "")] : [...i, e + r], []), Yd = la(aa, ""), Gd = aa;
/*! js-yaml 4.1.0 https://github.com/nodeca/js-yaml @license MIT */
function ha(t) {
  return typeof t > "u" || t === null;
}
function Vd(t) {
  return typeof t == "object" && t !== null;
}
function Xd(t) {
  return Array.isArray(t) ? t : ha(t) ? [] : [t];
}
function Kd(t, e) {
  var i, r, n, o;
  if (e)
    for (o = Object.keys(e), i = 0, r = o.length; i < r; i += 1)
      n = o[i], t[n] = e[n];
  return t;
}
function Zd(t, e) {
  var i = "", r;
  for (r = 0; r < e; r += 1)
    i += t;
  return i;
}
function Jd(t) {
  return t === 0 && Number.NEGATIVE_INFINITY === 1 / t;
}
var Qd = ha, tp = Vd, ep = Xd, ip = Zd, rp = Jd, np = Kd, at = {
  isNothing: Qd,
  isObject: tp,
  toArray: ep,
  repeat: ip,
  isNegativeZero: rp,
  extend: np
};
function ca(t, e) {
  var i = "", r = t.reason || "(unknown reason)";
  return t.mark ? (t.mark.name && (i += 'in "' + t.mark.name + '" '), i += "(" + (t.mark.line + 1) + ":" + (t.mark.column + 1) + ")", !e && t.mark.snippet && (i += `

` + t.mark.snippet), r + " " + i) : r;
}
function Qe(t, e) {
  Error.call(this), this.name = "YAMLException", this.reason = t, this.mark = e, this.message = ca(this, !1), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack || "";
}
Qe.prototype = Object.create(Error.prototype);
Qe.prototype.constructor = Qe;
Qe.prototype.toString = function(e) {
  return this.name + ": " + ca(this, e);
};
var Wt = Qe;
function Nr(t, e, i, r, n) {
  var o = "", s = "", a = Math.floor(n / 2) - 1;
  return r - e > a && (o = " ... ", e = r - a + o.length), i - r > a && (s = " ...", i = r + a - s.length), {
    str: o + t.slice(e, i).replace(/\t/g, "→") + s,
    pos: r - e + o.length
    // relative position
  };
}
function Rr(t, e) {
  return at.repeat(" ", e - t.length) + t;
}
function op(t, e) {
  if (e = Object.create(e || null), !t.buffer)
    return null;
  e.maxLength || (e.maxLength = 79), typeof e.indent != "number" && (e.indent = 1), typeof e.linesBefore != "number" && (e.linesBefore = 3), typeof e.linesAfter != "number" && (e.linesAfter = 2);
  for (var i = /\r?\n|\r|\0/g, r = [0], n = [], o, s = -1; o = i.exec(t.buffer); )
    n.push(o.index), r.push(o.index + o[0].length), t.position <= o.index && s < 0 && (s = r.length - 2);
  s < 0 && (s = r.length - 1);
  var a = "", l, h, c = Math.min(t.line + e.linesAfter, n.length).toString().length, u = e.maxLength - (e.indent + c + 3);
  for (l = 1; l <= e.linesBefore && !(s - l < 0); l++)
    h = Nr(
      t.buffer,
      r[s - l],
      n[s - l],
      t.position - (r[s] - r[s - l]),
      u
    ), a = at.repeat(" ", e.indent) + Rr((t.line - l + 1).toString(), c) + " | " + h.str + `
` + a;
  for (h = Nr(t.buffer, r[s], n[s], t.position, u), a += at.repeat(" ", e.indent) + Rr((t.line + 1).toString(), c) + " | " + h.str + `
`, a += at.repeat("-", e.indent + c + 3 + h.pos) + `^
`, l = 1; l <= e.linesAfter && !(s + l >= n.length); l++)
    h = Nr(
      t.buffer,
      r[s + l],
      n[s + l],
      t.position - (r[s] - r[s + l]),
      u
    ), a += at.repeat(" ", e.indent) + Rr((t.line + l + 1).toString(), c) + " | " + h.str + `
`;
  return a.replace(/\n$/, "");
}
var sp = op, ap = [
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
], lp = [
  "scalar",
  "sequence",
  "mapping"
];
function hp(t) {
  var e = {};
  return t !== null && Object.keys(t).forEach(function(i) {
    t[i].forEach(function(r) {
      e[String(r)] = i;
    });
  }), e;
}
function cp(t, e) {
  if (e = e || {}, Object.keys(e).forEach(function(i) {
    if (ap.indexOf(i) === -1)
      throw new Wt('Unknown option "' + i + '" is met in definition of "' + t + '" YAML type.');
  }), this.options = e, this.tag = t, this.kind = e.kind || null, this.resolve = e.resolve || function() {
    return !0;
  }, this.construct = e.construct || function(i) {
    return i;
  }, this.instanceOf = e.instanceOf || null, this.predicate = e.predicate || null, this.represent = e.represent || null, this.representName = e.representName || null, this.defaultStyle = e.defaultStyle || null, this.multi = e.multi || !1, this.styleAliases = hp(e.styleAliases || null), lp.indexOf(this.kind) === -1)
    throw new Wt('Unknown kind "' + this.kind + '" is specified for "' + t + '" YAML type.');
}
var ot = cp;
function Do(t, e) {
  var i = [];
  return t[e].forEach(function(r) {
    var n = i.length;
    i.forEach(function(o, s) {
      o.tag === r.tag && o.kind === r.kind && o.multi === r.multi && (n = s);
    }), i[n] = r;
  }), i;
}
function up() {
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
function en(t) {
  return this.extend(t);
}
en.prototype.extend = function(e) {
  var i = [], r = [];
  if (e instanceof ot)
    r.push(e);
  else if (Array.isArray(e))
    r = r.concat(e);
  else if (e && (Array.isArray(e.implicit) || Array.isArray(e.explicit)))
    e.implicit && (i = i.concat(e.implicit)), e.explicit && (r = r.concat(e.explicit));
  else
    throw new Wt("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
  i.forEach(function(o) {
    if (!(o instanceof ot))
      throw new Wt("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    if (o.loadKind && o.loadKind !== "scalar")
      throw new Wt("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
    if (o.multi)
      throw new Wt("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
  }), r.forEach(function(o) {
    if (!(o instanceof ot))
      throw new Wt("Specified list of YAML types (or a single Type object) contains a non-Type object.");
  });
  var n = Object.create(en.prototype);
  return n.implicit = (this.implicit || []).concat(i), n.explicit = (this.explicit || []).concat(r), n.compiledImplicit = Do(n, "implicit"), n.compiledExplicit = Do(n, "explicit"), n.compiledTypeMap = up(n.compiledImplicit, n.compiledExplicit), n;
};
var fp = en, dp = new ot("tag:yaml.org,2002:str", {
  kind: "scalar",
  construct: function(t) {
    return t !== null ? t : "";
  }
}), pp = new ot("tag:yaml.org,2002:seq", {
  kind: "sequence",
  construct: function(t) {
    return t !== null ? t : [];
  }
}), gp = new ot("tag:yaml.org,2002:map", {
  kind: "mapping",
  construct: function(t) {
    return t !== null ? t : {};
  }
}), ua = new fp({
  explicit: [
    dp,
    pp,
    gp
  ]
});
function mp(t) {
  if (t === null)
    return !0;
  var e = t.length;
  return e === 1 && t === "~" || e === 4 && (t === "null" || t === "Null" || t === "NULL");
}
function _p() {
  return null;
}
function yp(t) {
  return t === null;
}
var Cp = new ot("tag:yaml.org,2002:null", {
  kind: "scalar",
  resolve: mp,
  construct: _p,
  predicate: yp,
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
function xp(t) {
  if (t === null)
    return !1;
  var e = t.length;
  return e === 4 && (t === "true" || t === "True" || t === "TRUE") || e === 5 && (t === "false" || t === "False" || t === "FALSE");
}
function bp(t) {
  return t === "true" || t === "True" || t === "TRUE";
}
function Tp(t) {
  return Object.prototype.toString.call(t) === "[object Boolean]";
}
var Sp = new ot("tag:yaml.org,2002:bool", {
  kind: "scalar",
  resolve: xp,
  construct: bp,
  predicate: Tp,
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
function kp(t) {
  return 48 <= t && t <= 57 || 65 <= t && t <= 70 || 97 <= t && t <= 102;
}
function vp(t) {
  return 48 <= t && t <= 55;
}
function wp(t) {
  return 48 <= t && t <= 57;
}
function Bp(t) {
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
          if (!kp(t.charCodeAt(i)))
            return !1;
          r = !0;
        }
      return r && n !== "_";
    }
    if (n === "o") {
      for (i++; i < e; i++)
        if (n = t[i], n !== "_") {
          if (!vp(t.charCodeAt(i)))
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
      if (!wp(t.charCodeAt(i)))
        return !1;
      r = !0;
    }
  return !(!r || n === "_");
}
function Fp(t) {
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
function Lp(t) {
  return Object.prototype.toString.call(t) === "[object Number]" && t % 1 === 0 && !at.isNegativeZero(t);
}
var Ap = new ot("tag:yaml.org,2002:int", {
  kind: "scalar",
  resolve: Bp,
  construct: Fp,
  predicate: Lp,
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
}), Ep = new RegExp(
  // 2.5e4, 2.5 and integers
  "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
);
function Mp(t) {
  return !(t === null || !Ep.test(t) || // Quick hack to not allow integers end with `_`
  // Probably should update regexp & check speed
  t[t.length - 1] === "_");
}
function Op(t) {
  var e, i;
  return e = t.replace(/_/g, "").toLowerCase(), i = e[0] === "-" ? -1 : 1, "+-".indexOf(e[0]) >= 0 && (e = e.slice(1)), e === ".inf" ? i === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : e === ".nan" ? NaN : i * parseFloat(e, 10);
}
var Ip = /^[-+]?[0-9]+e/;
function $p(t, e) {
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
  return i = t.toString(10), Ip.test(i) ? i.replace("e", ".e") : i;
}
function Dp(t) {
  return Object.prototype.toString.call(t) === "[object Number]" && (t % 1 !== 0 || at.isNegativeZero(t));
}
var Np = new ot("tag:yaml.org,2002:float", {
  kind: "scalar",
  resolve: Mp,
  construct: Op,
  predicate: Dp,
  represent: $p,
  defaultStyle: "lowercase"
}), Rp = ua.extend({
  implicit: [
    Cp,
    Sp,
    Ap,
    Np
  ]
}), qp = Rp, fa = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
), da = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
);
function Pp(t) {
  return t === null ? !1 : fa.exec(t) !== null || da.exec(t) !== null;
}
function zp(t) {
  var e, i, r, n, o, s, a, l = 0, h = null, c, u, g;
  if (e = fa.exec(t), e === null && (e = da.exec(t)), e === null)
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
function Wp(t) {
  return t.toISOString();
}
var Hp = new ot("tag:yaml.org,2002:timestamp", {
  kind: "scalar",
  resolve: Pp,
  construct: zp,
  instanceOf: Date,
  represent: Wp
});
function jp(t) {
  return t === "<<" || t === null;
}
var Up = new ot("tag:yaml.org,2002:merge", {
  kind: "scalar",
  resolve: jp
}), Fn = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
function Yp(t) {
  if (t === null)
    return !1;
  var e, i, r = 0, n = t.length, o = Fn;
  for (i = 0; i < n; i++)
    if (e = o.indexOf(t.charAt(i)), !(e > 64)) {
      if (e < 0)
        return !1;
      r += 6;
    }
  return r % 8 === 0;
}
function Gp(t) {
  var e, i, r = t.replace(/[\r\n=]/g, ""), n = r.length, o = Fn, s = 0, a = [];
  for (e = 0; e < n; e++)
    e % 4 === 0 && e && (a.push(s >> 16 & 255), a.push(s >> 8 & 255), a.push(s & 255)), s = s << 6 | o.indexOf(r.charAt(e));
  return i = n % 4 * 6, i === 0 ? (a.push(s >> 16 & 255), a.push(s >> 8 & 255), a.push(s & 255)) : i === 18 ? (a.push(s >> 10 & 255), a.push(s >> 2 & 255)) : i === 12 && a.push(s >> 4 & 255), new Uint8Array(a);
}
function Vp(t) {
  var e = "", i = 0, r, n, o = t.length, s = Fn;
  for (r = 0; r < o; r++)
    r % 3 === 0 && r && (e += s[i >> 18 & 63], e += s[i >> 12 & 63], e += s[i >> 6 & 63], e += s[i & 63]), i = (i << 8) + t[r];
  return n = o % 3, n === 0 ? (e += s[i >> 18 & 63], e += s[i >> 12 & 63], e += s[i >> 6 & 63], e += s[i & 63]) : n === 2 ? (e += s[i >> 10 & 63], e += s[i >> 4 & 63], e += s[i << 2 & 63], e += s[64]) : n === 1 && (e += s[i >> 2 & 63], e += s[i << 4 & 63], e += s[64], e += s[64]), e;
}
function Xp(t) {
  return Object.prototype.toString.call(t) === "[object Uint8Array]";
}
var Kp = new ot("tag:yaml.org,2002:binary", {
  kind: "scalar",
  resolve: Yp,
  construct: Gp,
  predicate: Xp,
  represent: Vp
}), Zp = Object.prototype.hasOwnProperty, Jp = Object.prototype.toString;
function Qp(t) {
  if (t === null)
    return !0;
  var e = [], i, r, n, o, s, a = t;
  for (i = 0, r = a.length; i < r; i += 1) {
    if (n = a[i], s = !1, Jp.call(n) !== "[object Object]")
      return !1;
    for (o in n)
      if (Zp.call(n, o))
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
function tg(t) {
  return t !== null ? t : [];
}
var eg = new ot("tag:yaml.org,2002:omap", {
  kind: "sequence",
  resolve: Qp,
  construct: tg
}), ig = Object.prototype.toString;
function rg(t) {
  if (t === null)
    return !0;
  var e, i, r, n, o, s = t;
  for (o = new Array(s.length), e = 0, i = s.length; e < i; e += 1) {
    if (r = s[e], ig.call(r) !== "[object Object]" || (n = Object.keys(r), n.length !== 1))
      return !1;
    o[e] = [n[0], r[n[0]]];
  }
  return !0;
}
function ng(t) {
  if (t === null)
    return [];
  var e, i, r, n, o, s = t;
  for (o = new Array(s.length), e = 0, i = s.length; e < i; e += 1)
    r = s[e], n = Object.keys(r), o[e] = [n[0], r[n[0]]];
  return o;
}
var og = new ot("tag:yaml.org,2002:pairs", {
  kind: "sequence",
  resolve: rg,
  construct: ng
}), sg = Object.prototype.hasOwnProperty;
function ag(t) {
  if (t === null)
    return !0;
  var e, i = t;
  for (e in i)
    if (sg.call(i, e) && i[e] !== null)
      return !1;
  return !0;
}
function lg(t) {
  return t !== null ? t : {};
}
var hg = new ot("tag:yaml.org,2002:set", {
  kind: "mapping",
  resolve: ag,
  construct: lg
}), cg = qp.extend({
  implicit: [
    Hp,
    Up
  ],
  explicit: [
    Kp,
    eg,
    og,
    hg
  ]
}), ee = Object.prototype.hasOwnProperty, Yi = 1, pa = 2, ga = 3, Gi = 4, qr = 1, ug = 2, No = 3, fg = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, dg = /[\x85\u2028\u2029]/, pg = /[,\[\]\{\}]/, ma = /^(?:!|!!|![a-z\-]+!)$/i, _a = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
function Ro(t) {
  return Object.prototype.toString.call(t);
}
function Mt(t) {
  return t === 10 || t === 13;
}
function he(t) {
  return t === 9 || t === 32;
}
function dt(t) {
  return t === 9 || t === 32 || t === 10 || t === 13;
}
function Se(t) {
  return t === 44 || t === 91 || t === 93 || t === 123 || t === 125;
}
function gg(t) {
  var e;
  return 48 <= t && t <= 57 ? t - 48 : (e = t | 32, 97 <= e && e <= 102 ? e - 97 + 10 : -1);
}
function mg(t) {
  return t === 120 ? 2 : t === 117 ? 4 : t === 85 ? 8 : 0;
}
function _g(t) {
  return 48 <= t && t <= 57 ? t - 48 : -1;
}
function qo(t) {
  return t === 48 ? "\0" : t === 97 ? "\x07" : t === 98 ? "\b" : t === 116 || t === 9 ? "	" : t === 110 ? `
` : t === 118 ? "\v" : t === 102 ? "\f" : t === 114 ? "\r" : t === 101 ? "\x1B" : t === 32 ? " " : t === 34 ? '"' : t === 47 ? "/" : t === 92 ? "\\" : t === 78 ? "" : t === 95 ? " " : t === 76 ? "\u2028" : t === 80 ? "\u2029" : "";
}
function yg(t) {
  return t <= 65535 ? String.fromCharCode(t) : String.fromCharCode(
    (t - 65536 >> 10) + 55296,
    (t - 65536 & 1023) + 56320
  );
}
var ya = new Array(256), Ca = new Array(256);
for (var Te = 0; Te < 256; Te++)
  ya[Te] = qo(Te) ? 1 : 0, Ca[Te] = qo(Te);
function Cg(t, e) {
  this.input = t, this.filename = e.filename || null, this.schema = e.schema || cg, this.onWarning = e.onWarning || null, this.legacy = e.legacy || !1, this.json = e.json || !1, this.listener = e.listener || null, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = t.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.firstTabInLine = -1, this.documents = [];
}
function xa(t, e) {
  var i = {
    name: t.filename,
    buffer: t.input.slice(0, -1),
    // omit trailing \0
    position: t.position,
    line: t.line,
    column: t.position - t.lineStart
  };
  return i.snippet = sp(i), new Wt(e, i);
}
function L(t, e) {
  throw xa(t, e);
}
function Vi(t, e) {
  t.onWarning && t.onWarning.call(null, xa(t, e));
}
var Po = {
  YAML: function(e, i, r) {
    var n, o, s;
    e.version !== null && L(e, "duplication of %YAML directive"), r.length !== 1 && L(e, "YAML directive accepts exactly one argument"), n = /^([0-9]+)\.([0-9]+)$/.exec(r[0]), n === null && L(e, "ill-formed argument of the YAML directive"), o = parseInt(n[1], 10), s = parseInt(n[2], 10), o !== 1 && L(e, "unacceptable YAML version of the document"), e.version = r[0], e.checkLineBreaks = s < 2, s !== 1 && s !== 2 && Vi(e, "unsupported YAML version of the document");
  },
  TAG: function(e, i, r) {
    var n, o;
    r.length !== 2 && L(e, "TAG directive accepts exactly two arguments"), n = r[0], o = r[1], ma.test(n) || L(e, "ill-formed tag handle (first argument) of the TAG directive"), ee.call(e.tagMap, n) && L(e, 'there is a previously declared suffix for "' + n + '" tag handle'), _a.test(o) || L(e, "ill-formed tag prefix (second argument) of the TAG directive");
    try {
      o = decodeURIComponent(o);
    } catch {
      L(e, "tag prefix is malformed: " + o);
    }
    e.tagMap[n] = o;
  }
};
function Qt(t, e, i, r) {
  var n, o, s, a;
  if (e < i) {
    if (a = t.input.slice(e, i), r)
      for (n = 0, o = a.length; n < o; n += 1)
        s = a.charCodeAt(n), s === 9 || 32 <= s && s <= 1114111 || L(t, "expected valid JSON character");
    else
      fg.test(a) && L(t, "the stream contains non-printable characters");
    t.result += a;
  }
}
function zo(t, e, i, r) {
  var n, o, s, a;
  for (at.isObject(i) || L(t, "cannot merge mappings; the provided source object is unacceptable"), n = Object.keys(i), s = 0, a = n.length; s < a; s += 1)
    o = n[s], ee.call(e, o) || (e[o] = i[o], r[o] = !0);
}
function ke(t, e, i, r, n, o, s, a, l) {
  var h, c;
  if (Array.isArray(n))
    for (n = Array.prototype.slice.call(n), h = 0, c = n.length; h < c; h += 1)
      Array.isArray(n[h]) && L(t, "nested arrays are not supported inside keys"), typeof n == "object" && Ro(n[h]) === "[object Object]" && (n[h] = "[object Object]");
  if (typeof n == "object" && Ro(n) === "[object Object]" && (n = "[object Object]"), n = String(n), e === null && (e = {}), r === "tag:yaml.org,2002:merge")
    if (Array.isArray(o))
      for (h = 0, c = o.length; h < c; h += 1)
        zo(t, e, o[h], i);
    else
      zo(t, e, o, i);
  else
    !t.json && !ee.call(i, n) && ee.call(e, n) && (t.line = s || t.line, t.lineStart = a || t.lineStart, t.position = l || t.position, L(t, "duplicated mapping key")), n === "__proto__" ? Object.defineProperty(e, n, {
      configurable: !0,
      enumerable: !0,
      writable: !0,
      value: o
    }) : e[n] = o, delete i[n];
  return e;
}
function Ln(t) {
  var e;
  e = t.input.charCodeAt(t.position), e === 10 ? t.position++ : e === 13 ? (t.position++, t.input.charCodeAt(t.position) === 10 && t.position++) : L(t, "a line break is expected"), t.line += 1, t.lineStart = t.position, t.firstTabInLine = -1;
}
function J(t, e, i) {
  for (var r = 0, n = t.input.charCodeAt(t.position); n !== 0; ) {
    for (; he(n); )
      n === 9 && t.firstTabInLine === -1 && (t.firstTabInLine = t.position), n = t.input.charCodeAt(++t.position);
    if (e && n === 35)
      do
        n = t.input.charCodeAt(++t.position);
      while (n !== 10 && n !== 13 && n !== 0);
    if (Mt(n))
      for (Ln(t), n = t.input.charCodeAt(t.position), r++, t.lineIndent = 0; n === 32; )
        t.lineIndent++, n = t.input.charCodeAt(++t.position);
    else
      break;
  }
  return i !== -1 && r !== 0 && t.lineIndent < i && Vi(t, "deficient indentation"), r;
}
function fr(t) {
  var e = t.position, i;
  return i = t.input.charCodeAt(e), !!((i === 45 || i === 46) && i === t.input.charCodeAt(e + 1) && i === t.input.charCodeAt(e + 2) && (e += 3, i = t.input.charCodeAt(e), i === 0 || dt(i)));
}
function An(t, e) {
  e === 1 ? t.result += " " : e > 1 && (t.result += at.repeat(`
`, e - 1));
}
function xg(t, e, i) {
  var r, n, o, s, a, l, h, c, u = t.kind, g = t.result, p;
  if (p = t.input.charCodeAt(t.position), dt(p) || Se(p) || p === 35 || p === 38 || p === 42 || p === 33 || p === 124 || p === 62 || p === 39 || p === 34 || p === 37 || p === 64 || p === 96 || (p === 63 || p === 45) && (n = t.input.charCodeAt(t.position + 1), dt(n) || i && Se(n)))
    return !1;
  for (t.kind = "scalar", t.result = "", o = s = t.position, a = !1; p !== 0; ) {
    if (p === 58) {
      if (n = t.input.charCodeAt(t.position + 1), dt(n) || i && Se(n))
        break;
    } else if (p === 35) {
      if (r = t.input.charCodeAt(t.position - 1), dt(r))
        break;
    } else {
      if (t.position === t.lineStart && fr(t) || i && Se(p))
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
    a && (Qt(t, o, s, !1), An(t, t.line - l), o = s = t.position, a = !1), he(p) || (s = t.position + 1), p = t.input.charCodeAt(++t.position);
  }
  return Qt(t, o, s, !1), t.result ? !0 : (t.kind = u, t.result = g, !1);
}
function bg(t, e) {
  var i, r, n;
  if (i = t.input.charCodeAt(t.position), i !== 39)
    return !1;
  for (t.kind = "scalar", t.result = "", t.position++, r = n = t.position; (i = t.input.charCodeAt(t.position)) !== 0; )
    if (i === 39)
      if (Qt(t, r, t.position, !0), i = t.input.charCodeAt(++t.position), i === 39)
        r = t.position, t.position++, n = t.position;
      else
        return !0;
    else
      Mt(i) ? (Qt(t, r, n, !0), An(t, J(t, !1, e)), r = n = t.position) : t.position === t.lineStart && fr(t) ? L(t, "unexpected end of the document within a single quoted scalar") : (t.position++, n = t.position);
  L(t, "unexpected end of the stream within a single quoted scalar");
}
function Tg(t, e) {
  var i, r, n, o, s, a;
  if (a = t.input.charCodeAt(t.position), a !== 34)
    return !1;
  for (t.kind = "scalar", t.result = "", t.position++, i = r = t.position; (a = t.input.charCodeAt(t.position)) !== 0; ) {
    if (a === 34)
      return Qt(t, i, t.position, !0), t.position++, !0;
    if (a === 92) {
      if (Qt(t, i, t.position, !0), a = t.input.charCodeAt(++t.position), Mt(a))
        J(t, !1, e);
      else if (a < 256 && ya[a])
        t.result += Ca[a], t.position++;
      else if ((s = mg(a)) > 0) {
        for (n = s, o = 0; n > 0; n--)
          a = t.input.charCodeAt(++t.position), (s = gg(a)) >= 0 ? o = (o << 4) + s : L(t, "expected hexadecimal character");
        t.result += yg(o), t.position++;
      } else
        L(t, "unknown escape sequence");
      i = r = t.position;
    } else
      Mt(a) ? (Qt(t, i, r, !0), An(t, J(t, !1, e)), i = r = t.position) : t.position === t.lineStart && fr(t) ? L(t, "unexpected end of the document within a double quoted scalar") : (t.position++, r = t.position);
  }
  L(t, "unexpected end of the stream within a double quoted scalar");
}
function Sg(t, e) {
  var i = !0, r, n, o, s = t.tag, a, l = t.anchor, h, c, u, g, p, _ = /* @__PURE__ */ Object.create(null), v, M, q, k;
  if (k = t.input.charCodeAt(t.position), k === 91)
    c = 93, p = !1, a = [];
  else if (k === 123)
    c = 125, p = !0, a = {};
  else
    return !1;
  for (t.anchor !== null && (t.anchorMap[t.anchor] = a), k = t.input.charCodeAt(++t.position); k !== 0; ) {
    if (J(t, !0, e), k = t.input.charCodeAt(t.position), k === c)
      return t.position++, t.tag = s, t.anchor = l, t.kind = p ? "mapping" : "sequence", t.result = a, !0;
    i ? k === 44 && L(t, "expected the node content, but found ','") : L(t, "missed comma between flow collection entries"), M = v = q = null, u = g = !1, k === 63 && (h = t.input.charCodeAt(t.position + 1), dt(h) && (u = g = !0, t.position++, J(t, !0, e))), r = t.line, n = t.lineStart, o = t.position, Fe(t, e, Yi, !1, !0), M = t.tag, v = t.result, J(t, !0, e), k = t.input.charCodeAt(t.position), (g || t.line === r) && k === 58 && (u = !0, k = t.input.charCodeAt(++t.position), J(t, !0, e), Fe(t, e, Yi, !1, !0), q = t.result), p ? ke(t, a, _, M, v, q, r, n, o) : u ? a.push(ke(t, null, _, M, v, q, r, n, o)) : a.push(v), J(t, !0, e), k = t.input.charCodeAt(t.position), k === 44 ? (i = !0, k = t.input.charCodeAt(++t.position)) : i = !1;
  }
  L(t, "unexpected end of the stream within a flow collection");
}
function kg(t, e) {
  var i, r, n = qr, o = !1, s = !1, a = e, l = 0, h = !1, c, u;
  if (u = t.input.charCodeAt(t.position), u === 124)
    r = !1;
  else if (u === 62)
    r = !0;
  else
    return !1;
  for (t.kind = "scalar", t.result = ""; u !== 0; )
    if (u = t.input.charCodeAt(++t.position), u === 43 || u === 45)
      qr === n ? n = u === 43 ? No : ug : L(t, "repeat of a chomping mode identifier");
    else if ((c = _g(u)) >= 0)
      c === 0 ? L(t, "bad explicit indentation width of a block scalar; it cannot be less than one") : s ? L(t, "repeat of an indentation width identifier") : (a = e + c - 1, s = !0);
    else
      break;
  if (he(u)) {
    do
      u = t.input.charCodeAt(++t.position);
    while (he(u));
    if (u === 35)
      do
        u = t.input.charCodeAt(++t.position);
      while (!Mt(u) && u !== 0);
  }
  for (; u !== 0; ) {
    for (Ln(t), t.lineIndent = 0, u = t.input.charCodeAt(t.position); (!s || t.lineIndent < a) && u === 32; )
      t.lineIndent++, u = t.input.charCodeAt(++t.position);
    if (!s && t.lineIndent > a && (a = t.lineIndent), Mt(u)) {
      l++;
      continue;
    }
    if (t.lineIndent < a) {
      n === No ? t.result += at.repeat(`
`, o ? 1 + l : l) : n === qr && o && (t.result += `
`);
      break;
    }
    for (r ? he(u) ? (h = !0, t.result += at.repeat(`
`, o ? 1 + l : l)) : h ? (h = !1, t.result += at.repeat(`
`, l + 1)) : l === 0 ? o && (t.result += " ") : t.result += at.repeat(`
`, l) : t.result += at.repeat(`
`, o ? 1 + l : l), o = !0, s = !0, l = 0, i = t.position; !Mt(u) && u !== 0; )
      u = t.input.charCodeAt(++t.position);
    Qt(t, i, t.position, !1);
  }
  return !0;
}
function Wo(t, e) {
  var i, r = t.tag, n = t.anchor, o = [], s, a = !1, l;
  if (t.firstTabInLine !== -1)
    return !1;
  for (t.anchor !== null && (t.anchorMap[t.anchor] = o), l = t.input.charCodeAt(t.position); l !== 0 && (t.firstTabInLine !== -1 && (t.position = t.firstTabInLine, L(t, "tab characters must not be used in indentation")), !(l !== 45 || (s = t.input.charCodeAt(t.position + 1), !dt(s)))); ) {
    if (a = !0, t.position++, J(t, !0, -1) && t.lineIndent <= e) {
      o.push(null), l = t.input.charCodeAt(t.position);
      continue;
    }
    if (i = t.line, Fe(t, e, ga, !1, !0), o.push(t.result), J(t, !0, -1), l = t.input.charCodeAt(t.position), (t.line === i || t.lineIndent > e) && l !== 0)
      L(t, "bad indentation of a sequence entry");
    else if (t.lineIndent < e)
      break;
  }
  return a ? (t.tag = r, t.anchor = n, t.kind = "sequence", t.result = o, !0) : !1;
}
function vg(t, e, i) {
  var r, n, o, s, a, l, h = t.tag, c = t.anchor, u = {}, g = /* @__PURE__ */ Object.create(null), p = null, _ = null, v = null, M = !1, q = !1, k;
  if (t.firstTabInLine !== -1)
    return !1;
  for (t.anchor !== null && (t.anchorMap[t.anchor] = u), k = t.input.charCodeAt(t.position); k !== 0; ) {
    if (!M && t.firstTabInLine !== -1 && (t.position = t.firstTabInLine, L(t, "tab characters must not be used in indentation")), r = t.input.charCodeAt(t.position + 1), o = t.line, (k === 63 || k === 58) && dt(r))
      k === 63 ? (M && (ke(t, u, g, p, _, null, s, a, l), p = _ = v = null), q = !0, M = !0, n = !0) : M ? (M = !1, n = !0) : L(t, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), t.position += 1, k = r;
    else {
      if (s = t.line, a = t.lineStart, l = t.position, !Fe(t, i, pa, !1, !0))
        break;
      if (t.line === o) {
        for (k = t.input.charCodeAt(t.position); he(k); )
          k = t.input.charCodeAt(++t.position);
        if (k === 58)
          k = t.input.charCodeAt(++t.position), dt(k) || L(t, "a whitespace character is expected after the key-value separator within a block mapping"), M && (ke(t, u, g, p, _, null, s, a, l), p = _ = v = null), q = !0, M = !1, n = !1, p = t.tag, _ = t.result;
        else if (q)
          L(t, "can not read an implicit mapping pair; a colon is missed");
        else
          return t.tag = h, t.anchor = c, !0;
      } else if (q)
        L(t, "can not read a block mapping entry; a multiline key may not be an implicit key");
      else
        return t.tag = h, t.anchor = c, !0;
    }
    if ((t.line === o || t.lineIndent > e) && (M && (s = t.line, a = t.lineStart, l = t.position), Fe(t, e, Gi, !0, n) && (M ? _ = t.result : v = t.result), M || (ke(t, u, g, p, _, v, s, a, l), p = _ = v = null), J(t, !0, -1), k = t.input.charCodeAt(t.position)), (t.line === o || t.lineIndent > e) && k !== 0)
      L(t, "bad indentation of a mapping entry");
    else if (t.lineIndent < e)
      break;
  }
  return M && ke(t, u, g, p, _, null, s, a, l), q && (t.tag = h, t.anchor = c, t.kind = "mapping", t.result = u), q;
}
function wg(t) {
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
      s === 33 && (r ? L(t, "tag suffix cannot contain exclamation marks") : (n = t.input.slice(e - 1, t.position + 1), ma.test(n) || L(t, "named tag handle cannot contain such characters"), r = !0, e = t.position + 1)), s = t.input.charCodeAt(++t.position);
    o = t.input.slice(e, t.position), pg.test(o) && L(t, "tag suffix cannot contain flow indicator characters");
  }
  o && !_a.test(o) && L(t, "tag name cannot contain such characters: " + o);
  try {
    o = decodeURIComponent(o);
  } catch {
    L(t, "tag name is malformed: " + o);
  }
  return i ? t.tag = o : ee.call(t.tagMap, n) ? t.tag = t.tagMap[n] + o : n === "!" ? t.tag = "!" + o : n === "!!" ? t.tag = "tag:yaml.org,2002:" + o : L(t, 'undeclared tag handle "' + n + '"'), !0;
}
function Bg(t) {
  var e, i;
  if (i = t.input.charCodeAt(t.position), i !== 38)
    return !1;
  for (t.anchor !== null && L(t, "duplication of an anchor property"), i = t.input.charCodeAt(++t.position), e = t.position; i !== 0 && !dt(i) && !Se(i); )
    i = t.input.charCodeAt(++t.position);
  return t.position === e && L(t, "name of an anchor node must contain at least one character"), t.anchor = t.input.slice(e, t.position), !0;
}
function Fg(t) {
  var e, i, r;
  if (r = t.input.charCodeAt(t.position), r !== 42)
    return !1;
  for (r = t.input.charCodeAt(++t.position), e = t.position; r !== 0 && !dt(r) && !Se(r); )
    r = t.input.charCodeAt(++t.position);
  return t.position === e && L(t, "name of an alias node must contain at least one character"), i = t.input.slice(e, t.position), ee.call(t.anchorMap, i) || L(t, 'unidentified alias "' + i + '"'), t.result = t.anchorMap[i], J(t, !0, -1), !0;
}
function Fe(t, e, i, r, n) {
  var o, s, a, l = 1, h = !1, c = !1, u, g, p, _, v, M;
  if (t.listener !== null && t.listener("open", t), t.tag = null, t.anchor = null, t.kind = null, t.result = null, o = s = a = Gi === i || ga === i, r && J(t, !0, -1) && (h = !0, t.lineIndent > e ? l = 1 : t.lineIndent === e ? l = 0 : t.lineIndent < e && (l = -1)), l === 1)
    for (; wg(t) || Bg(t); )
      J(t, !0, -1) ? (h = !0, a = o, t.lineIndent > e ? l = 1 : t.lineIndent === e ? l = 0 : t.lineIndent < e && (l = -1)) : a = !1;
  if (a && (a = h || n), (l === 1 || Gi === i) && (Yi === i || pa === i ? v = e : v = e + 1, M = t.position - t.lineStart, l === 1 ? a && (Wo(t, M) || vg(t, M, v)) || Sg(t, v) ? c = !0 : (s && kg(t, v) || bg(t, v) || Tg(t, v) ? c = !0 : Fg(t) ? (c = !0, (t.tag !== null || t.anchor !== null) && L(t, "alias node should not have any properties")) : xg(t, v, Yi === i) && (c = !0, t.tag === null && (t.tag = "?")), t.anchor !== null && (t.anchorMap[t.anchor] = t.result)) : l === 0 && (c = a && Wo(t, M))), t.tag === null)
    t.anchor !== null && (t.anchorMap[t.anchor] = t.result);
  else if (t.tag === "?") {
    for (t.result !== null && t.kind !== "scalar" && L(t, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + t.kind + '"'), u = 0, g = t.implicitTypes.length; u < g; u += 1)
      if (_ = t.implicitTypes[u], _.resolve(t.result)) {
        t.result = _.construct(t.result), t.tag = _.tag, t.anchor !== null && (t.anchorMap[t.anchor] = t.result);
        break;
      }
  } else if (t.tag !== "!") {
    if (ee.call(t.typeMap[t.kind || "fallback"], t.tag))
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
function Lg(t) {
  var e = t.position, i, r, n, o = !1, s;
  for (t.version = null, t.checkLineBreaks = t.legacy, t.tagMap = /* @__PURE__ */ Object.create(null), t.anchorMap = /* @__PURE__ */ Object.create(null); (s = t.input.charCodeAt(t.position)) !== 0 && (J(t, !0, -1), s = t.input.charCodeAt(t.position), !(t.lineIndent > 0 || s !== 37)); ) {
    for (o = !0, s = t.input.charCodeAt(++t.position), i = t.position; s !== 0 && !dt(s); )
      s = t.input.charCodeAt(++t.position);
    for (r = t.input.slice(i, t.position), n = [], r.length < 1 && L(t, "directive name must not be less than one character in length"); s !== 0; ) {
      for (; he(s); )
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
    s !== 0 && Ln(t), ee.call(Po, r) ? Po[r](t, r, n) : Vi(t, 'unknown document directive "' + r + '"');
  }
  if (J(t, !0, -1), t.lineIndent === 0 && t.input.charCodeAt(t.position) === 45 && t.input.charCodeAt(t.position + 1) === 45 && t.input.charCodeAt(t.position + 2) === 45 ? (t.position += 3, J(t, !0, -1)) : o && L(t, "directives end mark is expected"), Fe(t, t.lineIndent - 1, Gi, !1, !0), J(t, !0, -1), t.checkLineBreaks && dg.test(t.input.slice(e, t.position)) && Vi(t, "non-ASCII line breaks are interpreted as content"), t.documents.push(t.result), t.position === t.lineStart && fr(t)) {
    t.input.charCodeAt(t.position) === 46 && (t.position += 3, J(t, !0, -1));
    return;
  }
  if (t.position < t.length - 1)
    L(t, "end of the stream or a document separator is expected");
  else
    return;
}
function ba(t, e) {
  t = String(t), e = e || {}, t.length !== 0 && (t.charCodeAt(t.length - 1) !== 10 && t.charCodeAt(t.length - 1) !== 13 && (t += `
`), t.charCodeAt(0) === 65279 && (t = t.slice(1)));
  var i = new Cg(t, e), r = t.indexOf("\0");
  for (r !== -1 && (i.position = r, L(i, "null byte is not allowed in input")), i.input += "\0"; i.input.charCodeAt(i.position) === 32; )
    i.lineIndent += 1, i.position += 1;
  for (; i.position < i.length - 1; )
    Lg(i);
  return i.documents;
}
function Ag(t, e, i) {
  e !== null && typeof e == "object" && typeof i > "u" && (i = e, e = null);
  var r = ba(t, i);
  if (typeof e != "function")
    return r;
  for (var n = 0, o = r.length; n < o; n += 1)
    e(r[n]);
}
function Eg(t, e) {
  var i = ba(t, e);
  if (i.length !== 0) {
    if (i.length === 1)
      return i[0];
    throw new Wt("expected a single document in the stream, but found more");
  }
}
var Mg = Ag, Og = Eg, Ig = {
  loadAll: Mg,
  load: Og
}, $g = ua, Dg = Ig.load;
const Ta = /^-{3}\s*[\n\r](.*?)[\n\r]-{3}\s*[\n\r]+/s;
function Ng(t, e) {
  var r, n;
  const i = t.match(Ta);
  if (i) {
    const o = Dg(i[1], {
      // To keep things simple, only allow strings, arrays, and plain objects.
      // https://www.yaml.org/spec/1.2/spec.html#id2802346
      schema: $g
    });
    return o != null && o.title && ((r = e.setDiagramTitle) == null || r.call(e, o.title)), o != null && o.displayMode && ((n = e.setDisplayMode) == null || n.call(e, o.displayMode)), t.slice(i[0].length);
  } else
    return t;
}
const rn = function(t, e, i) {
  const { depth: r, clobber: n } = Object.assign({ depth: 2, clobber: !1 }, i);
  return Array.isArray(e) && !Array.isArray(t) ? (e.forEach((o) => rn(t, o, i)), t) : Array.isArray(e) && Array.isArray(t) ? (e.forEach((o) => {
    t.includes(o) || t.push(o);
  }), t) : t === void 0 || r <= 0 ? t != null && typeof t == "object" && typeof e == "object" ? Object.assign(t, e) : e : (e !== void 0 && typeof t == "object" && typeof e == "object" && Object.keys(e).forEach((o) => {
    typeof e[o] == "object" && (t[o] === void 0 || typeof t[o] == "object") ? (t[o] === void 0 && (t[o] = Array.isArray(e[o]) ? [] : {}), t[o] = rn(t[o], e[o], { depth: r - 1, clobber: n })) : (n || typeof t[o] != "object" && typeof e[o] != "object") && (t[o] = e[o]);
  }), t);
}, nt = rn, ti = Object.freeze(Gd);
let ut = nt({}, ti), Sa, Le = [], Ye = nt({}, ti);
const dr = (t, e) => {
  let i = nt({}, t), r = {};
  for (const n of e)
    va(n), r = nt(r, n);
  if (i = nt(i, r), r.theme && r.theme in Ht) {
    const n = nt({}, Sa), o = nt(
      n.themeVariables || {},
      r.themeVariables
    );
    i.theme && i.theme in Ht && (i.themeVariables = Ht[i.theme].getThemeVariables(o));
  }
  return Ye = i, Ba(Ye), Ye;
}, Rg = (t) => (ut = nt({}, ti), ut = nt(ut, t), t.theme && Ht[t.theme] && (ut.themeVariables = Ht[t.theme].getThemeVariables(t.themeVariables)), dr(ut, Le), ut), qg = (t) => {
  Sa = nt({}, t);
}, Pg = (t) => (ut = nt(ut, t), dr(ut, Le), ut), ka = () => nt({}, ut), zg = (t) => (Ba(t), nt(Ye, t), Ut()), Ut = () => nt({}, Ye), va = (t) => {
  ["secure", ...ut.secure ?? []].forEach((e) => {
    t[e] !== void 0 && (S.debug(`Denied attempt to modify a secure key ${e}`, t[e]), delete t[e]);
  }), Object.keys(t).forEach((e) => {
    e.indexOf("__") === 0 && delete t[e];
  }), Object.keys(t).forEach((e) => {
    typeof t[e] == "string" && (t[e].includes("<") || t[e].includes(">") || t[e].includes("url(data:")) && delete t[e], typeof t[e] == "object" && va(t[e]);
  });
}, wa = (t) => {
  t.fontFamily && (t.themeVariables ? t.themeVariables.fontFamily || (t.themeVariables = { fontFamily: t.fontFamily }) : t.themeVariables = { fontFamily: t.fontFamily }), Le.push(t), dr(ut, Le);
}, Xi = (t = ut) => {
  Le = [], dr(t, Le);
}, Wg = {
  LAZY_LOAD_DEPRECATED: "The configuration options lazyLoadedDiagrams and loadExternalDiagramsAtStartup are deprecated. Please use registerExternalDiagrams instead."
}, Ho = {}, Hg = (t) => {
  Ho[t] || (S.warn(Wg[t]), Ho[t] = !0);
}, Ba = (t) => {
  t && (t.lazyLoadedDiagrams || t.loadExternalDiagramsAtStartup) && Hg("LAZY_LOAD_DEPRECATED");
}, jg = function(t, e) {
  for (let i of e)
    t.attr(i[0], i[1]);
}, Ug = function(t, e, i) {
  let r = /* @__PURE__ */ new Map();
  return i ? (r.set("width", "100%"), r.set("style", `max-width: ${e}px;`)) : (r.set("height", t), r.set("width", e)), r;
}, Yg = function(t, e, i, r) {
  const n = Ug(e, i, r);
  jg(t, n);
}, Gg = function(t, e, i, r) {
  const n = e.node().getBBox(), o = n.width, s = n.height;
  S.info(`SVG bounds: ${o}x${s}`, n);
  let a = 0, l = 0;
  S.info(`Graph bounds: ${a}x${l}`, t), a = o + i * 2, l = s + i * 2, S.info(`Calculated bounds: ${a}x${l}`), Yg(e, l, a, r);
  const h = `${n.x - i} ${n.y - i} ${n.width + 2 * i} ${n.height + 2 * i}`;
  e.attr("viewBox", h);
}, Ei = {}, Vg = (t, e, i) => {
  let r = "";
  return t in Ei && Ei[t] ? r = Ei[t](i) : S.warn(`No theme found for ${t}`), ` & {
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
}, Xg = (t, e) => {
  e !== void 0 && (Ei[t] = e);
}, Kg = Vg;
let En = "", pr = "", Mn = "";
const On = (t) => Je(t, Ut()), Fa = function() {
  En = "", Mn = "", pr = "";
}, La = function(t) {
  En = On(t).replace(/^\s+/g, "");
}, Aa = function() {
  return En || pr;
}, Ea = function(t) {
  Mn = On(t).replace(/\n\s+/g, `
`);
}, Ma = function() {
  return Mn;
}, Oa = function(t) {
  pr = On(t);
}, Ia = function() {
  return pr;
}, Zg = {
  getAccTitle: Aa,
  setAccTitle: La,
  getDiagramTitle: Ia,
  setDiagramTitle: Oa,
  getAccDescription: Ma,
  setAccDescription: Ea,
  clear: Fa
}, Jg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  clear: Fa,
  default: Zg,
  getAccDescription: Ma,
  getAccTitle: Aa,
  getDiagramTitle: Ia,
  setAccDescription: Ea,
  setAccTitle: La,
  setDiagramTitle: Oa
}, Symbol.toStringTag, { value: "Module" }));
let oe = {};
const $a = function(t, e, i, r) {
  S.debug("parseDirective is being called", e, i, r);
  try {
    if (e !== void 0)
      switch (e = e.trim(), i) {
        case "open_directive":
          oe = {};
          break;
        case "type_directive":
          if (!oe)
            throw new Error("currentDirective is undefined");
          oe.type = e.toLowerCase();
          break;
        case "arg_directive":
          if (!oe)
            throw new Error("currentDirective is undefined");
          oe.args = JSON.parse(e);
          break;
        case "close_directive":
          Qg(t, oe, r), oe = void 0;
          break;
      }
  } catch (n) {
    S.error(
      `Error while rendering sequenceDiagram directive: ${e} jison context: ${i}`
    ), S.error(n.message);
  }
}, Qg = function(t, e, i) {
  switch (S.info(`Directive type=${e.type} with args:`, e.args), e.type) {
    case "init":
    case "initialize": {
      ["config"].forEach((r) => {
        e.args[r] !== void 0 && (i === "flowchart-v2" && (i = "flowchart"), e.args[i] = e.args[r], delete e.args[r]);
      }), S.info("sanitize in handleDirective", e.args), Ee(e.args), S.info("sanitize in handleDirective (done)", e.args), wa(e.args);
      break;
    }
    case "wrap":
    case "nowrap":
      t && t.setWrap && t.setWrap(e.type === "wrap");
      break;
    case "themeCss":
      S.warn("themeCss encountered");
      break;
    default:
      S.warn(
        `Unhandled directive: source: '%%{${e.type}: ${JSON.stringify(
          e.args ? e.args : {}
        )}}%%`,
        e
      );
      break;
  }
}, tm = S, em = dn, Da = Ut, im = (t) => Je(t, Da()), rm = Gg, nm = () => Jg, om = (t, e, i, r) => $a(t, e, i, r), Ki = {}, Zi = (t, e, i) => {
  if (Ki[t])
    throw new Error(`Diagram ${t} already registered.`);
  Ki[t] = e, i && qa(t, i), Xg(t, e.styles), e.injectUtils && e.injectUtils(
    tm,
    em,
    Da,
    im,
    rm,
    nm(),
    om
  );
}, In = (t) => {
  if (t in Ki)
    return Ki[t];
  throw new Error(`Diagram ${t} not found.`);
};
class Na extends Error {
  constructor(e) {
    super(e), this.name = "UnknownDiagramError";
  }
}
const sm = /%{2}{\s*(?:(\w+)\s*:|(\w+))\s*(?:(\w+)|((?:(?!}%{2}).|\r?\n)*))?\s*(?:}%{2})?/gi, am = /\s*%%.*\n/gm, Ae = {}, gr = function(t, e) {
  t = t.replace(Ta, "").replace(sm, "").replace(am, `
`);
  for (const [i, { detector: r }] of Object.entries(Ae))
    if (r(t, e))
      return i;
  throw new Na(
    `No diagram type detected matching given configuration for text: ${t}`
  );
}, Ra = (...t) => {
  for (const { id: e, detector: i, loader: r } of t)
    qa(e, i, r);
}, lm = async () => {
  S.debug("Loading registered diagrams");
  const e = (await Promise.allSettled(
    Object.entries(Ae).map(async ([i, { detector: r, loader: n }]) => {
      if (n)
        try {
          In(i);
        } catch {
          try {
            const { diagram: s, id: a } = await n();
            Zi(a, s, r);
          } catch (s) {
            throw S.error(`Failed to load external diagram with key ${i}. Removing from detectors.`), delete Ae[i], s;
          }
        }
    })
  )).filter((i) => i.status === "rejected");
  if (e.length > 0) {
    S.error(`Failed to load ${e.length} external diagrams`);
    for (const i of e)
      S.error(i);
    throw new Error(`Failed to load ${e.length} external diagrams`);
  }
}, qa = (t, e, i) => {
  Ae[t] ? S.error(`Detector with key ${t} already exists`) : Ae[t] = { detector: e, loader: i }, S.debug(`Detector with key ${t} added${i ? " with loader" : ""}`);
}, hm = (t) => Ae[t].loader;
var cm = typeof global == "object" && global && global.Object === Object && global;
const Pa = cm;
var um = typeof self == "object" && self && self.Object === Object && self, fm = Pa || um || Function("return this")();
const ie = fm;
var dm = ie.Symbol;
const Ji = dm;
var za = Object.prototype, pm = za.hasOwnProperty, gm = za.toString, Pe = Ji ? Ji.toStringTag : void 0;
function mm(t) {
  var e = pm.call(t, Pe), i = t[Pe];
  try {
    t[Pe] = void 0;
    var r = !0;
  } catch {
  }
  var n = gm.call(t);
  return r && (e ? t[Pe] = i : delete t[Pe]), n;
}
var _m = Object.prototype, ym = _m.toString;
function Cm(t) {
  return ym.call(t);
}
var xm = "[object Null]", bm = "[object Undefined]", jo = Ji ? Ji.toStringTag : void 0;
function ai(t) {
  return t == null ? t === void 0 ? bm : xm : jo && jo in Object(t) ? mm(t) : Cm(t);
}
function Wa(t) {
  var e = typeof t;
  return t != null && (e == "object" || e == "function");
}
var Tm = "[object AsyncFunction]", Sm = "[object Function]", km = "[object GeneratorFunction]", vm = "[object Proxy]";
function Ha(t) {
  if (!Wa(t))
    return !1;
  var e = ai(t);
  return e == Sm || e == km || e == Tm || e == vm;
}
var wm = ie["__core-js_shared__"];
const Pr = wm;
var Uo = function() {
  var t = /[^.]+$/.exec(Pr && Pr.keys && Pr.keys.IE_PROTO || "");
  return t ? "Symbol(src)_1." + t : "";
}();
function Bm(t) {
  return !!Uo && Uo in t;
}
var Fm = Function.prototype, Lm = Fm.toString;
function pe(t) {
  if (t != null) {
    try {
      return Lm.call(t);
    } catch {
    }
    try {
      return t + "";
    } catch {
    }
  }
  return "";
}
var Am = /[\\^$.*+?()[\]{}|]/g, Em = /^\[object .+?Constructor\]$/, Mm = Function.prototype, Om = Object.prototype, Im = Mm.toString, $m = Om.hasOwnProperty, Dm = RegExp(
  "^" + Im.call($m).replace(Am, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Nm(t) {
  if (!Wa(t) || Bm(t))
    return !1;
  var e = Ha(t) ? Dm : Em;
  return e.test(pe(t));
}
function Rm(t, e) {
  return t == null ? void 0 : t[e];
}
function Oe(t, e) {
  var i = Rm(t, e);
  return Nm(i) ? i : void 0;
}
var qm = Oe(Object, "create");
const ei = qm;
function Pm() {
  this.__data__ = ei ? ei(null) : {}, this.size = 0;
}
function zm(t) {
  var e = this.has(t) && delete this.__data__[t];
  return this.size -= e ? 1 : 0, e;
}
var Wm = "__lodash_hash_undefined__", Hm = Object.prototype, jm = Hm.hasOwnProperty;
function Um(t) {
  var e = this.__data__;
  if (ei) {
    var i = e[t];
    return i === Wm ? void 0 : i;
  }
  return jm.call(e, t) ? e[t] : void 0;
}
var Ym = Object.prototype, Gm = Ym.hasOwnProperty;
function Vm(t) {
  var e = this.__data__;
  return ei ? e[t] !== void 0 : Gm.call(e, t);
}
var Xm = "__lodash_hash_undefined__";
function Km(t, e) {
  var i = this.__data__;
  return this.size += this.has(t) ? 0 : 1, i[t] = ei && e === void 0 ? Xm : e, this;
}
function fe(t) {
  var e = -1, i = t == null ? 0 : t.length;
  for (this.clear(); ++e < i; ) {
    var r = t[e];
    this.set(r[0], r[1]);
  }
}
fe.prototype.clear = Pm;
fe.prototype.delete = zm;
fe.prototype.get = Um;
fe.prototype.has = Vm;
fe.prototype.set = Km;
function Zm() {
  this.__data__ = [], this.size = 0;
}
function Jm(t, e) {
  return t === e || t !== t && e !== e;
}
function mr(t, e) {
  for (var i = t.length; i--; )
    if (Jm(t[i][0], e))
      return i;
  return -1;
}
var Qm = Array.prototype, t0 = Qm.splice;
function e0(t) {
  var e = this.__data__, i = mr(e, t);
  if (i < 0)
    return !1;
  var r = e.length - 1;
  return i == r ? e.pop() : t0.call(e, i, 1), --this.size, !0;
}
function i0(t) {
  var e = this.__data__, i = mr(e, t);
  return i < 0 ? void 0 : e[i][1];
}
function r0(t) {
  return mr(this.__data__, t) > -1;
}
function n0(t, e) {
  var i = this.__data__, r = mr(i, t);
  return r < 0 ? (++this.size, i.push([t, e])) : i[r][1] = e, this;
}
function Ie(t) {
  var e = -1, i = t == null ? 0 : t.length;
  for (this.clear(); ++e < i; ) {
    var r = t[e];
    this.set(r[0], r[1]);
  }
}
Ie.prototype.clear = Zm;
Ie.prototype.delete = e0;
Ie.prototype.get = i0;
Ie.prototype.has = r0;
Ie.prototype.set = n0;
var o0 = Oe(ie, "Map");
const Qi = o0;
function s0() {
  this.size = 0, this.__data__ = {
    hash: new fe(),
    map: new (Qi || Ie)(),
    string: new fe()
  };
}
function a0(t) {
  var e = typeof t;
  return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? t !== "__proto__" : t === null;
}
function _r(t, e) {
  var i = t.__data__;
  return a0(e) ? i[typeof e == "string" ? "string" : "hash"] : i.map;
}
function l0(t) {
  var e = _r(this, t).delete(t);
  return this.size -= e ? 1 : 0, e;
}
function h0(t) {
  return _r(this, t).get(t);
}
function c0(t) {
  return _r(this, t).has(t);
}
function u0(t, e) {
  var i = _r(this, t), r = i.size;
  return i.set(t, e), this.size += i.size == r ? 0 : 1, this;
}
function ge(t) {
  var e = -1, i = t == null ? 0 : t.length;
  for (this.clear(); ++e < i; ) {
    var r = t[e];
    this.set(r[0], r[1]);
  }
}
ge.prototype.clear = s0;
ge.prototype.delete = l0;
ge.prototype.get = h0;
ge.prototype.has = c0;
ge.prototype.set = u0;
var f0 = "Expected a function";
function li(t, e) {
  if (typeof t != "function" || e != null && typeof e != "function")
    throw new TypeError(f0);
  var i = function() {
    var r = arguments, n = e ? e.apply(this, r) : r[0], o = i.cache;
    if (o.has(n))
      return o.get(n);
    var s = t.apply(this, r);
    return i.cache = o.set(n, s) || o, s;
  };
  return i.cache = new (li.Cache || ge)(), i;
}
li.Cache = ge;
const d0 = "​", p0 = {
  curveBasis: yf,
  curveBasisClosed: Cf,
  curveBasisOpen: xf,
  curveBumpX: mf,
  curveBumpY: _f,
  curveBundle: bf,
  curveCardinalClosed: Sf,
  curveCardinalOpen: kf,
  curveCardinal: Tf,
  curveCatmullRomClosed: wf,
  curveCatmullRomOpen: Bf,
  curveCatmullRom: vf,
  curveLinear: gf,
  curveLinearClosed: Ff,
  curveMonotoneX: Lf,
  curveMonotoneY: Af,
  curveNatural: Ef,
  curveStep: Mf,
  curveStepAfter: If,
  curveStepBefore: Of
}, zr = /%{2}{\s*(?:(\w+)\s*:|(\w+))\s*(?:(\w+)|((?:(?!}%{2}).|\r?\n)*))?\s*(?:}%{2})?/gi, g0 = /\s*(?:(\w+)(?=:):|(\w+))\s*(?:(\w+)|((?:(?!}%{2}).|\r?\n)*))?\s*(?:}%{2})?/gi, m0 = function(t, e) {
  const i = ja(t, /(?:init\b)|(?:initialize\b)/);
  let r = {};
  if (Array.isArray(i)) {
    const n = i.map((o) => o.args);
    Ee(n), r = nt(r, [...n]);
  } else
    r = i.args;
  if (r) {
    let n = gr(t, e);
    ["config"].forEach((o) => {
      r[o] !== void 0 && (n === "flowchart-v2" && (n = "flowchart"), r[n] = r[o], delete r[o]);
    });
  }
  return r;
}, ja = function(t, e = null) {
  try {
    const i = new RegExp(
      `[%]{2}(?![{]${g0.source})(?=[}][%]{2}).*
`,
      "ig"
    );
    t = t.trim().replace(i, "").replace(/'/gm, '"'), S.debug(
      `Detecting diagram directive${e !== null ? " type:" + e : ""} based on the text:${t}`
    );
    let r;
    const n = [];
    for (; (r = zr.exec(t)) !== null; )
      if (r.index === zr.lastIndex && zr.lastIndex++, r && !e || e && r[1] && r[1].match(e) || e && r[2] && r[2].match(e)) {
        const o = r[1] ? r[1] : r[2], s = r[3] ? r[3].trim() : r[4] ? JSON.parse(r[4].trim()) : null;
        n.push({ type: o, args: s });
      }
    return n.length === 0 && n.push({ type: t, args: null }), n.length === 1 ? n[0] : n;
  } catch (i) {
    return S.error(
      `ERROR: ${i.message} - Unable to parse directive
      ${e !== null ? " type:" + e : ""} based on the text:${t}`
    ), { type: null, args: null };
  }
}, _0 = function(t, e) {
  for (const [i, r] of e.entries())
    if (r.match(t))
      return i;
  return -1;
};
function y0(t, e) {
  if (!t)
    return e;
  const i = `curve${t.charAt(0).toUpperCase() + t.slice(1)}`;
  return p0[i] || e;
}
function C0(t, e) {
  const i = t.trim();
  if (i)
    return e.securityLevel !== "loose" ? us(i) : i;
}
const x0 = (t, ...e) => {
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
function b0(t) {
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
function T0(t) {
  return t.length === 1 ? t[0] : b0(t);
}
const S0 = (t, e, i) => {
  let r;
  S.info(`our points ${JSON.stringify(e)}`), e[0] !== i && (e = e.reverse());
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
function k0(t, e, i) {
  let r = JSON.parse(JSON.stringify(i)), n;
  S.info("our points", r), e !== "start_left" && e !== "start_right" && (r = r.reverse()), r.forEach((u) => {
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
function v0(t) {
  let e = "", i = "";
  for (const r of t)
    r !== void 0 && (r.startsWith("color:") || r.startsWith("text-align:") ? i = i + r + ";" : e = e + r + ";");
  return { style: e, labelStyle: i };
}
let Yo = 0;
const w0 = () => (Yo++, "id-" + Math.random().toString(36).substr(2, 12) + "-" + Yo);
function B0(t) {
  let e = "";
  const i = "0123456789abcdef", r = i.length;
  for (let n = 0; n < t; n++)
    e += i.charAt(Math.floor(Math.random() * r));
  return e;
}
const F0 = (t) => B0(t.length), L0 = function() {
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
}, A0 = function(t, e) {
  const i = e.text.replace(Bn.lineBreakRegex, " "), [, r] = Dn(e.fontSize), n = t.append("text");
  n.attr("x", e.x), n.attr("y", e.y), n.style("text-anchor", e.anchor), n.style("font-family", e.fontFamily), n.style("font-size", r), n.style("font-weight", e.fontWeight), n.attr("fill", e.fill), e.class !== void 0 && n.attr("class", e.class);
  const o = n.append("tspan");
  return o.attr("x", e.x + e.textMargin * 2), o.attr("fill", e.fill), o.text(i), n;
}, E0 = li(
  (t, e, i) => {
    if (!t || (i = Object.assign(
      { fontSize: 12, fontWeight: 400, fontFamily: "Arial", joinWith: "<br/>" },
      i
    ), Bn.lineBreakRegex.test(t)))
      return t;
    const r = t.split(" "), n = [];
    let o = "";
    return r.forEach((s, a) => {
      const l = er(`${s} `, i), h = er(o, i);
      if (l > e) {
        const { hyphenatedStrings: g, remainingWord: p } = M0(s, e, "-", i);
        n.push(o, ...g), o = p;
      } else
        h + l >= e ? (n.push(o), o = s) : o = [o, s].filter(Boolean).join(" ");
      a + 1 === r.length && n.push(o);
    }), n.filter((s) => s !== "").join(i.joinWith);
  },
  (t, e, i) => `${t}${e}${i.fontSize}${i.fontWeight}${i.fontFamily}${i.joinWith}`
), M0 = li(
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
function O0(t, e) {
  return e = Object.assign(
    { fontSize: 12, fontWeight: 400, fontFamily: "Arial", margin: 15 },
    e
  ), $n(t, e).height;
}
function er(t, e) {
  return e = Object.assign({ fontSize: 12, fontWeight: 400, fontFamily: "Arial" }, e), $n(t, e).width;
}
const $n = li(
  (t, e) => {
    e = Object.assign({ fontSize: 12, fontWeight: 400, fontFamily: "Arial" }, e);
    const { fontSize: i, fontFamily: r, fontWeight: n } = e;
    if (!t)
      return { width: 0, height: 0 };
    const [, o] = Dn(i), s = ["sans-serif", r], a = t.split(Bn.lineBreakRegex), l = [], h = At("body");
    if (!h.remove)
      return { width: 0, height: 0, lineHeight: 0 };
    const c = h.append("svg");
    for (const g of s) {
      let p = 0;
      const _ = { width: 0, height: 0, lineHeight: 0 };
      for (const v of a) {
        const M = L0();
        M.text = v || d0;
        const q = A0(c, M).style("font-size", o).style("font-weight", n).style("font-family", g), k = (q._groups || q)[0][0].getBBox();
        if (k.width === 0 && k.height === 0)
          throw new Error("svg element not in render tree");
        _.width = Math.round(Math.max(_.width, k.width)), p = Math.round(k.height), _.height += p, _.lineHeight = Math.round(Math.max(_.lineHeight, p));
      }
      l.push(_);
    }
    c.remove();
    const u = isNaN(l[1].height) || isNaN(l[1].width) || isNaN(l[1].lineHeight) || l[0].height > l[1].height && l[0].width > l[1].width && l[0].lineHeight > l[1].lineHeight ? 0 : 1;
    return l[u];
  },
  (t, e) => `${t}${e.fontSize}${e.fontWeight}${e.fontFamily}`
), I0 = class {
  constructor(e, i) {
    this.deterministic = e, this.seed = i, this.count = i ? i.length : 0;
  }
  next() {
    return this.deterministic ? this.count++ : Date.now();
  }
};
let Ti;
const $0 = function(t) {
  return Ti = Ti || document.createElement("div"), t = escape(t).replace(/%26/g, "&").replace(/%23/g, "#").replace(/%3B/g, ";"), Ti.innerHTML = t, unescape(Ti.textContent);
}, Ee = (t) => {
  if (S.debug("directiveSanitizer called with", t), typeof t == "object" && (t.length ? t.forEach((e) => Ee(e)) : Object.keys(t).forEach((e) => {
    S.debug("Checking key", e), e.startsWith("__") && (S.debug("sanitize deleting __ option", e), delete t[e]), e.includes("proto") && (S.debug("sanitize deleting proto option", e), delete t[e]), e.includes("constr") && (S.debug("sanitize deleting constr option", e), delete t[e]), e.includes("themeCSS") && (S.debug("sanitizing themeCss option"), t[e] = Mi(t[e])), e.includes("fontFamily") && (S.debug("sanitizing fontFamily option"), t[e] = Mi(t[e])), e.includes("altFontFamily") && (S.debug("sanitizing altFontFamily option"), t[e] = Mi(t[e])), Yd.includes(e) ? typeof t[e] == "object" && (S.debug("sanitize deleting object", e), Ee(t[e])) : (S.debug("sanitize deleting option", e), delete t[e]);
  })), t.themeVariables) {
    const e = Object.keys(t.themeVariables);
    for (const i of e) {
      const r = t.themeVariables[i];
      r && r.match && !r.match(/^[\d "#%(),.;A-Za-z]+$/) && (t.themeVariables[i] = "");
    }
  }
  S.debug("After sanitization", t);
}, Mi = (t) => {
  let e = 0, i = 0;
  for (const r of t) {
    if (e < i)
      return "{ /* ERROR: Unbalanced CSS */ }";
    r === "{" ? e++ : r === "}" && i++;
  }
  return e !== i ? "{ /* ERROR: Unbalanced CSS */ }" : t;
};
function Ua(t) {
  return "str" in t;
}
function D0(t) {
  return t instanceof Error ? t.message : String(t);
}
const N0 = (t, e, i, r) => {
  if (!r)
    return;
  const n = t.node().getBBox();
  t.append("text").text(r).attr("x", n.x + n.width / 2).attr("y", -i).attr("class", e);
}, Dn = (t) => {
  if (typeof t == "number")
    return [t, t + "px"];
  const e = parseInt(t, 10);
  return Number.isNaN(e) ? [void 0, void 0] : t === String(e) ? [e, t + "px"] : [e, t];
}, Oi = {
  assignWithDepth: nt,
  wrapLabel: E0,
  calculateTextHeight: O0,
  calculateTextWidth: er,
  calculateTextDimensions: $n,
  detectInit: m0,
  detectDirective: ja,
  isSubstringInArray: _0,
  interpolateToCurve: y0,
  calcLabelPosition: T0,
  calcCardinalityPosition: S0,
  calcTerminalLabelPosition: k0,
  formatUrl: C0,
  getStylesFromArray: v0,
  generateId: w0,
  random: F0,
  runFunc: x0,
  entityDecode: $0,
  initIdGenerator: I0,
  directiveSanitizer: Ee,
  sanitizeCss: Mi,
  insertTitle: N0,
  parseFontSize: Dn
};
var Ya = "comm", Ga = "rule", Va = "decl", R0 = "@import", q0 = "@keyframes", P0 = Math.abs, Nn = String.fromCharCode;
function Xa(t) {
  return t.trim();
}
function nn(t, e, i) {
  return t.replace(e, i);
}
function z0(t, e) {
  return t.indexOf(e);
}
function ii(t, e) {
  return t.charCodeAt(e) | 0;
}
function ri(t, e, i) {
  return t.slice(e, i);
}
function Jt(t) {
  return t.length;
}
function Ka(t) {
  return t.length;
}
function Si(t, e) {
  return e.push(t), t;
}
var yr = 1, Me = 1, Za = 0, bt = 0, Z = 0, $e = "";
function Rn(t, e, i, r, n, o, s) {
  return { value: t, root: e, parent: i, type: r, props: n, children: o, line: yr, column: Me, length: s, return: "" };
}
function W0() {
  return Z;
}
function H0() {
  return Z = bt > 0 ? ii($e, --bt) : 0, Me--, Z === 10 && (Me = 1, yr--), Z;
}
function vt() {
  return Z = bt < Za ? ii($e, bt++) : 0, Me++, Z === 10 && (Me = 1, yr++), Z;
}
function ce() {
  return ii($e, bt);
}
function Ii() {
  return bt;
}
function Cr(t, e) {
  return ri($e, t, e);
}
function on(t) {
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
function j0(t) {
  return yr = Me = 1, Za = Jt($e = t), bt = 0, [];
}
function U0(t) {
  return $e = "", t;
}
function Wr(t) {
  return Xa(Cr(bt - 1, sn(t === 91 ? t + 2 : t === 40 ? t + 1 : t)));
}
function Y0(t) {
  for (; (Z = ce()) && Z < 33; )
    vt();
  return on(t) > 2 || on(Z) > 3 ? "" : " ";
}
function G0(t, e) {
  for (; --e && vt() && !(Z < 48 || Z > 102 || Z > 57 && Z < 65 || Z > 70 && Z < 97); )
    ;
  return Cr(t, Ii() + (e < 6 && ce() == 32 && vt() == 32));
}
function sn(t) {
  for (; vt(); )
    switch (Z) {
      case t:
        return bt;
      case 34:
      case 39:
        t !== 34 && t !== 39 && sn(Z);
        break;
      case 40:
        t === 41 && sn(t);
        break;
      case 92:
        vt();
        break;
    }
  return bt;
}
function V0(t, e) {
  for (; vt() && t + Z !== 47 + 10; )
    if (t + Z === 42 + 42 && ce() === 47)
      break;
  return "/*" + Cr(e, bt - 1) + "*" + Nn(t === 47 ? t : vt());
}
function X0(t) {
  for (; !on(ce()); )
    vt();
  return Cr(t, bt);
}
function K0(t) {
  return U0($i("", null, null, null, [""], t = j0(t), 0, [0], t));
}
function $i(t, e, i, r, n, o, s, a, l) {
  for (var h = 0, c = 0, u = s, g = 0, p = 0, _ = 0, v = 1, M = 1, q = 1, k = 0, z = "", Q = n, X = o, G = r, W = z; M; )
    switch (_ = k, k = vt()) {
      case 40:
        if (_ != 108 && ii(W, u - 1) == 58) {
          z0(W += nn(Wr(k), "&", "&\f"), "&\f") != -1 && (q = -1);
          break;
        }
      case 34:
      case 39:
      case 91:
        W += Wr(k);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        W += Y0(_);
        break;
      case 92:
        W += G0(Ii() - 1, 7);
        continue;
      case 47:
        switch (ce()) {
          case 42:
          case 47:
            Si(Z0(V0(vt(), Ii()), e, i), l);
            break;
          default:
            W += "/";
        }
        break;
      case 123 * v:
        a[h++] = Jt(W) * q;
      case 125 * v:
      case 59:
      case 0:
        switch (k) {
          case 0:
          case 125:
            M = 0;
          case 59 + c:
            p > 0 && Jt(W) - u && Si(p > 32 ? Vo(W + ";", r, i, u - 1) : Vo(nn(W, " ", "") + ";", r, i, u - 2), l);
            break;
          case 59:
            W += ";";
          default:
            if (Si(G = Go(W, e, i, h, c, n, a, z, Q = [], X = [], u), o), k === 123)
              if (c === 0)
                $i(W, e, G, G, Q, o, u, a, X);
              else
                switch (g === 99 && ii(W, 3) === 110 ? 100 : g) {
                  case 100:
                  case 109:
                  case 115:
                    $i(t, G, G, r && Si(Go(t, G, G, 0, 0, n, a, z, n, Q = [], u), X), n, X, u, a, r ? Q : X);
                    break;
                  default:
                    $i(W, G, G, G, [""], X, 0, a, X);
                }
        }
        h = c = p = 0, v = q = 1, z = W = "", u = s;
        break;
      case 58:
        u = 1 + Jt(W), p = _;
      default:
        if (v < 1) {
          if (k == 123)
            --v;
          else if (k == 125 && v++ == 0 && H0() == 125)
            continue;
        }
        switch (W += Nn(k), k * v) {
          case 38:
            q = c > 0 ? 1 : (W += "\f", -1);
            break;
          case 44:
            a[h++] = (Jt(W) - 1) * q, q = 1;
            break;
          case 64:
            ce() === 45 && (W += Wr(vt())), g = ce(), c = u = Jt(z = W += X0(Ii())), k++;
            break;
          case 45:
            _ === 45 && Jt(W) == 2 && (v = 0);
        }
    }
  return o;
}
function Go(t, e, i, r, n, o, s, a, l, h, c) {
  for (var u = n - 1, g = n === 0 ? o : [""], p = Ka(g), _ = 0, v = 0, M = 0; _ < r; ++_)
    for (var q = 0, k = ri(t, u + 1, u = P0(v = s[_])), z = t; q < p; ++q)
      (z = Xa(v > 0 ? g[q] + " " + k : nn(k, /&\f/g, g[q]))) && (l[M++] = z);
  return Rn(t, e, i, n === 0 ? Ga : a, l, h, c);
}
function Z0(t, e, i) {
  return Rn(t, e, i, Ya, Nn(W0()), ri(t, 2, -2), 0);
}
function Vo(t, e, i, r) {
  return Rn(t, e, i, Va, ri(t, 0, r), ri(t, r + 1, -1), r);
}
function an(t, e) {
  for (var i = "", r = Ka(t), n = 0; n < r; n++)
    i += e(t[n], n, t, e) || "";
  return i;
}
function J0(t, e, i, r) {
  switch (t.type) {
    case R0:
    case Va:
      return t.return = t.return || t.value;
    case Ya:
      return "";
    case q0:
      return t.return = t.value + "{" + an(t.children, r) + "}";
    case Ga:
      t.value = t.props.join(",");
  }
  return Jt(i = an(t.children, r)) ? t.return = t.value + "{" + i + "}" : "";
}
const Xo = "10.3.0", Ja = "c4", Q0 = (t) => /^\s*C4Context|C4Container|C4Component|C4Dynamic|C4Deployment/.test(t), t_ = async () => {
  const { diagram: t } = await import("./c4Diagram-1bdb45a8.js");
  return { id: Ja, diagram: t };
}, e_ = {
  id: Ja,
  detector: Q0,
  loader: t_
}, i_ = e_, Qa = "flowchart", r_ = (t, e) => {
  var i, r;
  return ((i = e == null ? void 0 : e.flowchart) == null ? void 0 : i.defaultRenderer) === "dagre-wrapper" || ((r = e == null ? void 0 : e.flowchart) == null ? void 0 : r.defaultRenderer) === "elk" ? !1 : /^\s*graph/.test(t);
}, n_ = async () => {
  const { diagram: t } = await import("./flowDiagram-ccbbb58d.js");
  return { id: Qa, diagram: t };
}, o_ = {
  id: Qa,
  detector: r_,
  loader: n_
}, s_ = o_, tl = "flowchart-v2", a_ = (t, e) => {
  var i, r, n;
  return ((i = e == null ? void 0 : e.flowchart) == null ? void 0 : i.defaultRenderer) === "dagre-d3" || ((r = e == null ? void 0 : e.flowchart) == null ? void 0 : r.defaultRenderer) === "elk" ? !1 : /^\s*graph/.test(t) && ((n = e == null ? void 0 : e.flowchart) == null ? void 0 : n.defaultRenderer) === "dagre-wrapper" ? !0 : /^\s*flowchart/.test(t);
}, l_ = async () => {
  const { diagram: t } = await import("./flowDiagram-v2-79ccd6da.js");
  return { id: tl, diagram: t };
}, h_ = {
  id: tl,
  detector: a_,
  loader: l_
}, c_ = h_, el = "er", u_ = (t) => /^\s*erDiagram/.test(t), f_ = async () => {
  const { diagram: t } = await import("./erDiagram-97139f44.js");
  return { id: el, diagram: t };
}, d_ = {
  id: el,
  detector: u_,
  loader: f_
}, p_ = d_, il = "gitGraph", g_ = (t) => /^\s*gitGraph/.test(t), m_ = async () => {
  const { diagram: t } = await import("./gitGraphDiagram-c3fe571f.js");
  return { id: il, diagram: t };
}, __ = {
  id: il,
  detector: g_,
  loader: m_
}, y_ = __, rl = "gantt", C_ = (t) => /^\s*gantt/.test(t), x_ = async () => {
  const { diagram: t } = await import("./ganttDiagram-3eff0dd8.js");
  return { id: rl, diagram: t };
}, b_ = {
  id: rl,
  detector: C_,
  loader: x_
}, T_ = b_, nl = "info", S_ = (t) => /^\s*info/.test(t), k_ = async () => {
  const { diagram: t } = await import("./infoDiagram-9c10eab1.js");
  return { id: nl, diagram: t };
}, v_ = {
  id: nl,
  detector: S_,
  loader: k_
}, ol = "pie", w_ = (t) => /^\s*pie/.test(t), B_ = async () => {
  const { diagram: t } = await import("./pieDiagram-fd367f1f.js");
  return { id: ol, diagram: t };
}, F_ = {
  id: ol,
  detector: w_,
  loader: B_
}, L_ = F_, sl = "quadrantChart", A_ = (t) => /^\s*quadrantChart/.test(t), E_ = async () => {
  const { diagram: t } = await import("./quadrantDiagram-1763608a.js");
  return { id: sl, diagram: t };
}, M_ = {
  id: sl,
  detector: A_,
  loader: E_
}, O_ = M_, al = "requirement", I_ = (t) => /^\s*requirement(Diagram)?/.test(t), $_ = async () => {
  const { diagram: t } = await import("./requirementDiagram-779d93b3.js");
  return { id: al, diagram: t };
}, D_ = {
  id: al,
  detector: I_,
  loader: $_
}, N_ = D_, ll = "sequence", R_ = (t) => /^\s*sequenceDiagram/.test(t), q_ = async () => {
  const { diagram: t } = await import("./sequenceDiagram-169f11ec.js");
  return { id: ll, diagram: t };
}, P_ = {
  id: ll,
  detector: R_,
  loader: q_
}, z_ = P_, hl = "class", W_ = (t, e) => {
  var i;
  return ((i = e == null ? void 0 : e.class) == null ? void 0 : i.defaultRenderer) === "dagre-wrapper" ? !1 : /^\s*classDiagram/.test(t);
}, H_ = async () => {
  const { diagram: t } = await import("./classDiagram-185c1a10.js");
  return { id: hl, diagram: t };
}, j_ = {
  id: hl,
  detector: W_,
  loader: H_
}, U_ = j_, cl = "classDiagram", Y_ = (t, e) => {
  var i;
  return /^\s*classDiagram/.test(t) && ((i = e == null ? void 0 : e.class) == null ? void 0 : i.defaultRenderer) === "dagre-wrapper" ? !0 : /^\s*classDiagram-v2/.test(t);
}, G_ = async () => {
  const { diagram: t } = await import("./classDiagram-v2-6dc3b9c3.js");
  return { id: cl, diagram: t };
}, V_ = {
  id: cl,
  detector: Y_,
  loader: G_
}, X_ = V_, ul = "state", K_ = (t, e) => {
  var i;
  return ((i = e == null ? void 0 : e.state) == null ? void 0 : i.defaultRenderer) === "dagre-wrapper" ? !1 : /^\s*stateDiagram/.test(t);
}, Z_ = async () => {
  const { diagram: t } = await import("./stateDiagram-6f4bb19d.js");
  return { id: ul, diagram: t };
}, J_ = {
  id: ul,
  detector: K_,
  loader: Z_
}, Q_ = J_, fl = "stateDiagram", ty = (t, e) => {
  var i;
  return !!(/^\s*stateDiagram-v2/.test(t) || /^\s*stateDiagram/.test(t) && ((i = e == null ? void 0 : e.state) == null ? void 0 : i.defaultRenderer) === "dagre-wrapper");
}, ey = async () => {
  const { diagram: t } = await import("./stateDiagram-v2-d72c79bd.js");
  return { id: fl, diagram: t };
}, iy = {
  id: fl,
  detector: ty,
  loader: ey
}, ry = iy, dl = "journey", ny = (t) => /^\s*journey/.test(t), oy = async () => {
  const { diagram: t } = await import("./journeyDiagram-b6904cec.js");
  return { id: dl, diagram: t };
}, sy = {
  id: dl,
  detector: ny,
  loader: oy
}, ay = sy, ly = () => "", hy = ly, cy = function() {
}, uy = (t, e, i) => {
  try {
    S.debug(`Renering svg for syntax error
`);
    const r = At("#" + e), n = r.append("g");
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
    ), n.append("text").attr("class", "error-text").attr("x", 1440).attr("y", 250).attr("font-size", "150px").style("text-anchor", "middle").text("Syntax error in text"), n.append("text").attr("class", "error-text").attr("x", 1250).attr("y", 400).attr("font-size", "100px").style("text-anchor", "middle").text("mermaid version " + i), r.attr("height", 100), r.attr("width", 500), r.attr("viewBox", "768 0 912 512");
  } catch (r) {
    S.error("Error while rendering info diagram"), S.error(D0(r));
  }
}, pl = {
  setConf: cy,
  draw: uy
}, fy = {
  db: {
    clear: () => {
    }
  },
  styles: hy,
  renderer: pl,
  parser: {
    parser: { yy: {} },
    parse: () => {
    }
  },
  init: () => {
  }
}, dy = fy, gl = "flowchart-elk", py = (t, e) => {
  var i;
  return (
    // If diagram explicitly states flowchart-elk
    !!(/^\s*flowchart-elk/.test(t) || // If a flowchart/graph diagram has their default renderer set to elk
    /^\s*flowchart|graph/.test(t) && ((i = e == null ? void 0 : e.flowchart) == null ? void 0 : i.defaultRenderer) === "elk")
  );
}, gy = async () => {
  const { diagram: t } = await import("./flowchart-elk-definition-7863a61f.js");
  return { id: gl, diagram: t };
}, my = {
  id: gl,
  detector: py,
  loader: gy
}, _y = my, ml = "timeline", yy = (t) => /^\s*timeline/.test(t), Cy = async () => {
  const { diagram: t } = await import("./timeline-definition-65183566.js");
  return { id: ml, diagram: t };
}, xy = {
  id: ml,
  detector: yy,
  loader: Cy
}, by = xy, _l = "mindmap", Ty = (t) => /^\s*mindmap/.test(t), Sy = async () => {
  const { diagram: t } = await import("./mindmap-definition-a9d0f378.js");
  return { id: _l, diagram: t };
}, ky = {
  id: _l,
  detector: Ty,
  loader: Sy
}, vy = ky, yl = "sankey", wy = (t) => /^\s*sankey-beta/.test(t), By = async () => {
  const { diagram: t } = await import("./sankeyDiagram-86a66bae.js");
  return { id: yl, diagram: t };
}, Fy = {
  id: yl,
  detector: wy,
  loader: By
}, Ly = Fy;
let Ko = !1;
const qn = () => {
  Ko || (Ko = !0, Zi("error", dy, (t) => t.toLowerCase().trim() === "error"), Zi(
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
  ), Ra(
    i_,
    X_,
    U_,
    p_,
    T_,
    v_,
    L_,
    N_,
    z_,
    _y,
    c_,
    s_,
    vy,
    by,
    y_,
    ry,
    Q_,
    ay,
    O_,
    Ly
  ));
}, Ay = (t) => t.trimStart().replace(/^\s*%%(?!{)[^\n]+\n?/gm, "");
class Cl {
  constructor(e) {
    var o, s;
    this.text = e, this.type = "graph", this.text += `
`;
    const i = Ut();
    try {
      this.type = gr(e, i);
    } catch (a) {
      this.type = "error", this.detectError = a;
    }
    const r = In(this.type);
    S.debug("Type " + this.type), this.db = r.db, (s = (o = this.db).clear) == null || s.call(o), this.renderer = r.renderer, this.parser = r.parser;
    const n = this.parser.parse.bind(this.parser);
    this.parser.parse = (a) => n(Ay(Ng(a, this.db))), this.parser.parser.yy = this.db, r.init && (r.init(i), S.info("Initialized diagram " + this.type, i)), this.parse();
  }
  parse() {
    var e, i;
    if (this.detectError)
      throw this.detectError;
    (i = (e = this.db).clear) == null || i.call(e), this.parser.parse(this.text);
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
const Pn = async (t) => {
  const e = gr(t, Ut());
  try {
    In(e);
  } catch {
    const r = hm(e);
    if (!r)
      throw new Na(`Diagram ${e} not found.`);
    const { id: n, diagram: o } = await r();
    Zi(n, o);
  }
  return new Cl(t);
};
let ln = [];
const Wx = (t) => {
  ln.push(t);
}, Ey = () => {
  ln.forEach((t) => {
    t();
  }), ln = [];
};
var My = Object.prototype;
function xl(t) {
  var e = t && t.constructor, i = typeof e == "function" && e.prototype || My;
  return t === i;
}
function Oy(t, e) {
  return function(i) {
    return t(e(i));
  };
}
var Iy = Oy(Object.keys, Object);
const $y = Iy;
var Dy = Object.prototype, Ny = Dy.hasOwnProperty;
function Ry(t) {
  if (!xl(t))
    return $y(t);
  var e = [];
  for (var i in Object(t))
    Ny.call(t, i) && i != "constructor" && e.push(i);
  return e;
}
var qy = Oe(ie, "DataView");
const hn = qy;
var Py = Oe(ie, "Promise");
const cn = Py;
var zy = Oe(ie, "Set");
const un = zy;
var Wy = Oe(ie, "WeakMap");
const fn = Wy;
var Zo = "[object Map]", Hy = "[object Object]", Jo = "[object Promise]", Qo = "[object Set]", ts = "[object WeakMap]", es = "[object DataView]", jy = pe(hn), Uy = pe(Qi), Yy = pe(cn), Gy = pe(un), Vy = pe(fn), se = ai;
(hn && se(new hn(new ArrayBuffer(1))) != es || Qi && se(new Qi()) != Zo || cn && se(cn.resolve()) != Jo || un && se(new un()) != Qo || fn && se(new fn()) != ts) && (se = function(t) {
  var e = ai(t), i = e == Hy ? t.constructor : void 0, r = i ? pe(i) : "";
  if (r)
    switch (r) {
      case jy:
        return es;
      case Uy:
        return Zo;
      case Yy:
        return Jo;
      case Gy:
        return Qo;
      case Vy:
        return ts;
    }
  return e;
});
const Xy = se;
function zn(t) {
  return t != null && typeof t == "object";
}
var Ky = "[object Arguments]";
function is(t) {
  return zn(t) && ai(t) == Ky;
}
var bl = Object.prototype, Zy = bl.hasOwnProperty, Jy = bl.propertyIsEnumerable, Qy = is(function() {
  return arguments;
}()) ? is : function(t) {
  return zn(t) && Zy.call(t, "callee") && !Jy.call(t, "callee");
};
const tC = Qy;
var eC = Array.isArray;
const iC = eC;
var rC = 9007199254740991;
function Tl(t) {
  return typeof t == "number" && t > -1 && t % 1 == 0 && t <= rC;
}
function nC(t) {
  return t != null && Tl(t.length) && !Ha(t);
}
function oC() {
  return !1;
}
var Sl = typeof exports == "object" && exports && !exports.nodeType && exports, rs = Sl && typeof module == "object" && module && !module.nodeType && module, sC = rs && rs.exports === Sl, ns = sC ? ie.Buffer : void 0, aC = ns ? ns.isBuffer : void 0, lC = aC || oC;
const hC = lC;
var cC = "[object Arguments]", uC = "[object Array]", fC = "[object Boolean]", dC = "[object Date]", pC = "[object Error]", gC = "[object Function]", mC = "[object Map]", _C = "[object Number]", yC = "[object Object]", CC = "[object RegExp]", xC = "[object Set]", bC = "[object String]", TC = "[object WeakMap]", SC = "[object ArrayBuffer]", kC = "[object DataView]", vC = "[object Float32Array]", wC = "[object Float64Array]", BC = "[object Int8Array]", FC = "[object Int16Array]", LC = "[object Int32Array]", AC = "[object Uint8Array]", EC = "[object Uint8ClampedArray]", MC = "[object Uint16Array]", OC = "[object Uint32Array]", Y = {};
Y[vC] = Y[wC] = Y[BC] = Y[FC] = Y[LC] = Y[AC] = Y[EC] = Y[MC] = Y[OC] = !0;
Y[cC] = Y[uC] = Y[SC] = Y[fC] = Y[kC] = Y[dC] = Y[pC] = Y[gC] = Y[mC] = Y[_C] = Y[yC] = Y[CC] = Y[xC] = Y[bC] = Y[TC] = !1;
function IC(t) {
  return zn(t) && Tl(t.length) && !!Y[ai(t)];
}
function $C(t) {
  return function(e) {
    return t(e);
  };
}
var kl = typeof exports == "object" && exports && !exports.nodeType && exports, Ge = kl && typeof module == "object" && module && !module.nodeType && module, DC = Ge && Ge.exports === kl, Hr = DC && Pa.process, NC = function() {
  try {
    var t = Ge && Ge.require && Ge.require("util").types;
    return t || Hr && Hr.binding && Hr.binding("util");
  } catch {
  }
}();
const os = NC;
var ss = os && os.isTypedArray, RC = ss ? $C(ss) : IC;
const qC = RC;
var PC = "[object Map]", zC = "[object Set]", WC = Object.prototype, HC = WC.hasOwnProperty;
function jr(t) {
  if (t == null)
    return !0;
  if (nC(t) && (iC(t) || typeof t == "string" || typeof t.splice == "function" || hC(t) || qC(t) || tC(t)))
    return !t.length;
  var e = Xy(t);
  if (e == PC || e == zC)
    return !t.size;
  if (xl(t))
    return !Ry(t).length;
  for (var i in t)
    if (HC.call(t, i))
      return !1;
  return !0;
}
const jC = "graphics-document document";
function UC(t, e) {
  t.attr("role", jC), e !== "" && t.attr("aria-roledescription", e);
}
function YC(t, e, i, r) {
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
const vl = [
  "graph",
  "flowchart",
  "flowchart-v2",
  "flowchart-elk",
  "stateDiagram",
  "stateDiagram-v2"
], GC = 5e4, VC = "graph TB;a[Maximum text size in diagram exceeded];style a fill:#faa", XC = "sandbox", KC = "loose", ZC = "http://www.w3.org/2000/svg", JC = "http://www.w3.org/1999/xlink", QC = "http://www.w3.org/1999/xhtml", tx = "100%", ex = "100%", ix = "border:0;margin:0;", rx = "margin:0", nx = "allow-top-navigation-by-user-activation allow-popups", ox = 'The "iframe" tag is not supported by your browser.', sx = ["foreignobject"], ax = ["dominant-baseline"];
async function lx(t, e) {
  qn();
  try {
    (await Pn(t)).parse();
  } catch (i) {
    if (e != null && e.suppressErrors)
      return !1;
    throw i;
  }
  return !0;
}
const hx = function(t) {
  let e = t;
  return e = e.replace(/style.*:\S*#.*;/g, function(i) {
    return i.substring(0, i.length - 1);
  }), e = e.replace(/classDef.*:\S*#.*;/g, function(i) {
    return i.substring(0, i.length - 1);
  }), e = e.replace(/#\w+;/g, function(i) {
    const r = i.substring(1, i.length - 1);
    return /^\+?\d+$/.test(r) ? "ﬂ°°" + r + "¶ß" : "ﬂ°" + r + "¶ß";
  }), e;
}, cx = function(t) {
  return t.replace(/ﬂ°°/g, "&#").replace(/ﬂ°/g, "&").replace(/¶ß/g, ";");
}, as = (t, e, i = []) => `
.${t} ${e} { ${i.join(" !important; ")} !important; }`, ux = (t, e, i = {}) => {
  var n;
  let r = "";
  if (t.themeCSS !== void 0 && (r += `
${t.themeCSS}`), t.fontFamily !== void 0 && (r += `
:root { --mermaid-font-family: ${t.fontFamily}}`), t.altFontFamily !== void 0 && (r += `
:root { --mermaid-alt-font-family: ${t.altFontFamily}}`), !jr(i) && vl.includes(e)) {
    const l = t.htmlLabels || ((n = t.flowchart) == null ? void 0 : n.htmlLabels) ? ["> *", "span"] : ["rect", "polygon", "ellipse", "circle", "path"];
    for (const h in i) {
      const c = i[h];
      jr(c.styles) || l.forEach((u) => {
        r += as(c.id, u, c.styles);
      }), jr(c.textStyles) || (r += as(c.id, "tspan", c.textStyles));
    }
  }
  return r;
}, fx = (t, e, i, r) => {
  const n = ux(t, e, i), o = Kg(e, n, t.themeVariables);
  return an(K0(`${r}{${o}}`), J0);
}, dx = (t = "", e, i) => {
  let r = t;
  return !i && !e && (r = r.replace(
    /marker-end="url\([\d+./:=?A-Za-z-]*?#/g,
    'marker-end="url(#'
  )), r = cx(r), r = r.replace(/<br>/g, "<br/>"), r;
}, px = (t = "", e) => {
  const i = e ? e.viewBox.baseVal.height + "px" : ex, r = btoa('<body style="' + rx + '">' + t + "</body>");
  return `<iframe style="width:${tx};height:${i};${ix}" src="data:text/html;base64,${r}" sandbox="${nx}">
  ${ox}
</iframe>`;
}, ls = (t, e, i, r, n) => {
  const o = t.append("div");
  o.attr("id", i), r && o.attr("style", r);
  const s = o.append("svg").attr("id", e).attr("width", "100%").attr("xmlns", ZC);
  return n && s.attr("xmlns:xlink", n), s.append("g"), t;
};
function hs(t, e) {
  return t.append("iframe").attr("id", e).attr("style", "width: 100%; height: 100%;").attr("sandbox", "");
}
const gx = (t, e, i, r) => {
  var n, o, s;
  (n = t.getElementById(e)) == null || n.remove(), (o = t.getElementById(i)) == null || o.remove(), (s = t.getElementById(r)) == null || s.remove();
}, mx = async function(t, e, i) {
  var E, T, x, O;
  qn(), Xi();
  const r = Oi.detectInit(e);
  r && (Ee(r), wa(r));
  const n = Ut();
  S.debug(n), e.length > ((n == null ? void 0 : n.maxTextSize) ?? GC) && (e = VC), e = e.replace(/\r\n?/g, `
`), e = e.replace(
    /<(\w+)([^>]*)>/g,
    (y, D, w) => "<" + D + w.replace(/="([^"]*)"/g, "='$1'") + ">"
  );
  const o = "#" + t, s = "i" + t, a = "#" + s, l = "d" + t, h = "#" + l;
  let c = At("body");
  const u = n.securityLevel === XC, g = n.securityLevel === KC, p = n.fontFamily;
  if (i !== void 0) {
    if (i && (i.innerHTML = ""), u) {
      const y = hs(At(i), s);
      c = At(y.nodes()[0].contentDocument.body), c.node().style.margin = 0;
    } else
      c = At(i);
    ls(c, t, l, `font-family: ${p}`, JC);
  } else {
    if (gx(document, t, l, s), u) {
      const y = hs(At("body"), s);
      c = At(y.nodes()[0].contentDocument.body), c.node().style.margin = 0;
    } else
      c = At("body");
    ls(c, t, l);
  }
  e = hx(e);
  let _, v;
  try {
    _ = await Pn(e);
  } catch (y) {
    _ = new Cl("error"), v = y;
  }
  const M = c.select(h).node(), q = _.type, k = M.firstChild, z = k.firstChild, Q = vl.includes(q) ? _.renderer.getClasses(e, _) : {}, X = fx(n, q, Q, o), G = document.createElement("style");
  G.innerHTML = X, k.insertBefore(G, z);
  try {
    await _.renderer.draw(e, t, Xo, _);
  } catch (y) {
    throw pl.draw(e, t, Xo), y;
  }
  const W = c.select(`${h} svg`), Yt = (T = (E = _.db).getAccTitle) == null ? void 0 : T.call(E), K = (O = (x = _.db).getAccDescription) == null ? void 0 : O.call(x);
  yx(q, W, Yt, K), c.select(`[id="${t}"]`).selectAll("foreignobject > *").attr("xmlns", QC);
  let $ = c.select(h).node().innerHTML;
  if (S.debug("config.arrowMarkerAbsolute", n.arrowMarkerAbsolute), $ = dx($, u, ia(n.arrowMarkerAbsolute)), u) {
    const y = c.select(h + " svg").node();
    $ = px($, y);
  } else
    g || ($ = Ui.sanitize($, {
      ADD_TAGS: sx,
      ADD_ATTR: ax
    }));
  if (Ey(), v)
    throw v;
  const Ft = At(u ? a : h).node();
  return Ft && "remove" in Ft && Ft.remove(), {
    svg: $,
    bindFunctions: _.db.bindFunctions
  };
};
function _x(t = {}) {
  var i;
  t != null && t.fontFamily && !((i = t.themeVariables) != null && i.fontFamily) && (t.themeVariables || (t.themeVariables = {}), t.themeVariables.fontFamily = t.fontFamily), qg(t), t != null && t.theme && t.theme in Ht ? t.themeVariables = Ht[t.theme].getThemeVariables(
    t.themeVariables
  ) : t && (t.themeVariables = Ht.default.getThemeVariables(t.themeVariables));
  const e = typeof t == "object" ? Rg(t) : ka();
  dn(e.logLevel), qn();
}
function yx(t, e, i, r) {
  UC(e, t), YC(e, i, r, e.attr("id"));
}
const de = Object.freeze({
  render: mx,
  parse: lx,
  parseDirective: $a,
  getDiagramFromText: Pn,
  initialize: _x,
  getConfig: Ut,
  setConfig: zg,
  getSiteConfig: ka,
  updateSiteConfig: Pg,
  reset: () => {
    Xi();
  },
  globalReset: () => {
    Xi(ti);
  },
  defaultConfig: ti
});
dn(Ut().logLevel);
Xi(Ut());
const Cx = (t, e, i) => {
  S.warn(t), Ua(t) ? (i && i(t.str, t.hash), e.push({ ...t, message: t.str, error: t })) : (i && i(t), t instanceof Error && e.push({
    str: t.message,
    message: t.message,
    hash: t.name,
    error: t
  }));
}, wl = async function(t = {
  querySelector: ".mermaid"
}) {
  try {
    await xx(t);
  } catch (e) {
    if (Ua(e) && S.error(e.str), Ct.parseError && Ct.parseError(e), !t.suppressErrors)
      throw S.error("Use the suppressErrors option to suppress these errors"), e;
  }
}, xx = async function({ postRenderCallback: t, querySelector: e, nodes: i } = {
  querySelector: ".mermaid"
}) {
  const r = de.getConfig();
  S.debug(`${t ? "" : "No "}Callback function found`);
  let n;
  if (i)
    n = i;
  else if (e)
    n = document.querySelectorAll(e);
  else
    throw new Error("Nodes and querySelector are both undefined");
  S.debug(`Found ${n.length} diagrams`), (r == null ? void 0 : r.startOnLoad) !== void 0 && (S.debug("Start On Load: " + (r == null ? void 0 : r.startOnLoad)), de.updateSiteConfig({ startOnLoad: r == null ? void 0 : r.startOnLoad }));
  const o = new Oi.initIdGenerator(r.deterministicIds, r.deterministicIDSeed);
  let s;
  const a = [];
  for (const l of Array.from(n)) {
    S.info("Rendering diagram: " + l.id);
    /*! Check if previously processed */
    if (l.getAttribute("data-processed"))
      continue;
    l.setAttribute("data-processed", "true");
    const h = `mermaid-${o.next()}`;
    s = l.innerHTML, s = Pl(Oi.entityDecode(s)).trim().replace(/<br\s*\/?>/gi, "<br/>");
    const c = Oi.detectInit(s);
    c && S.debug("Detected early reinit: ", c);
    try {
      const { svg: u, bindFunctions: g } = await Al(h, s, l);
      l.innerHTML = u, t && await t(h), g && g(l);
    } catch (u) {
      Cx(u, a, Ct.parseError);
    }
  }
  if (a.length > 0)
    throw a[0];
}, Bl = function(t) {
  de.initialize(t);
}, bx = async function(t, e, i) {
  S.warn("mermaid.init is deprecated. Please use run instead."), t && Bl(t);
  const r = { postRenderCallback: i, querySelector: ".mermaid" };
  typeof e == "string" ? r.querySelector = e : e && (e instanceof HTMLElement ? r.nodes = [e] : r.nodes = e), await wl(r);
}, Tx = async (t, {
  lazyLoad: e = !0
} = {}) => {
  Ra(...t), e === !1 && await lm();
}, Fl = function() {
  if (Ct.startOnLoad) {
    const { startOnLoad: t } = de.getConfig();
    t && Ct.run().catch((e) => S.error("Mermaid failed to initialize", e));
  }
};
if (typeof document < "u") {
  /*!
   * Wait for document loaded before starting the execution
   */
  window.addEventListener("load", Fl, !1);
}
const Sx = function(t) {
  Ct.parseError = t;
}, ir = [];
let Ur = !1;
const Ll = async () => {
  if (!Ur) {
    for (Ur = !0; ir.length > 0; ) {
      const t = ir.shift();
      if (t)
        try {
          await t();
        } catch (e) {
          S.error("Error executing queue", e);
        }
    }
    Ur = !1;
  }
}, kx = async (t, e) => new Promise((i, r) => {
  const n = () => new Promise((o, s) => {
    de.parse(t, e).then(
      (a) => {
        o(a), i(a);
      },
      (a) => {
        var l;
        S.error("Error parsing", a), (l = Ct.parseError) == null || l.call(Ct, a), s(a), r(a);
      }
    );
  });
  ir.push(n), Ll().catch(r);
}), Al = (t, e, i) => new Promise((r, n) => {
  const o = () => new Promise((s, a) => {
    de.render(t, e, i).then(
      (l) => {
        s(l), r(l);
      },
      (l) => {
        var h;
        S.error("Error parsing", l), (h = Ct.parseError) == null || h.call(Ct, l), a(l), n(l);
      }
    );
  });
  ir.push(o), Ll().catch(n);
}), Ct = {
  startOnLoad: !0,
  mermaidAPI: de,
  parse: kx,
  render: Al,
  init: bx,
  run: wl,
  registerExternalDiagrams: Tx,
  initialize: Bl,
  parseError: void 0,
  contentLoaded: Fl,
  setParseErrorHandler: Sx,
  detectType: gr
};
export {
  Zt as $,
  Ue as A,
  Oa as B,
  Ot as C,
  Ia as D,
  Fa as E,
  yf as F,
  hd as G,
  F0 as H,
  Da as I,
  rm as J,
  _n as K,
  vs as L,
  oi as M,
  jc as N,
  Fs as O,
  wx as P,
  zl as Q,
  ft as R,
  mt as S,
  Wl as T,
  jl as U,
  Ix as V,
  Dn as W,
  zd as X,
  Gd as Y,
  yn as Z,
  I as _,
  Ma as a,
  Ke as a0,
  go as a1,
  Zc as a2,
  Wx as a3,
  d0 as a4,
  w0 as a5,
  zn as a6,
  ai as a7,
  Ji as a8,
  iC as a9,
  F as aA,
  A as aB,
  To as aC,
  bo as aD,
  Lx as aE,
  Mx as aF,
  Ox as aG,
  Ex as aH,
  Bx as aI,
  Tn as aJ,
  Fx as aK,
  Dx as aL,
  $x as aM,
  Ax as aN,
  Pl as aO,
  Ct as aP,
  Wa as aa,
  Oe as ab,
  Jm as ac,
  nC as ad,
  tC as ae,
  hC as af,
  qC as ag,
  Ry as ah,
  xl as ai,
  li as aj,
  Oy as ak,
  Ie as al,
  Qi as am,
  ge as an,
  ie as ao,
  Xy as ap,
  os as aq,
  $C as ar,
  Tl as as,
  un as at,
  jr as au,
  ti as av,
  cx as aw,
  Jg as ax,
  $a as ay,
  si as az,
  Ea as b,
  Ut as c,
  Je as d,
  us as e,
  Bn as f,
  Aa as g,
  nt as h,
  er as i,
  At as j,
  Yg as k,
  S as l,
  de as m,
  O0 as n,
  gf as o,
  v0 as p,
  ia as q,
  y0 as r,
  La as s,
  Gg as t,
  zg as u,
  ks as v,
  E0 as w,
  ah as x,
  Ha as y,
  Oi as z
};
