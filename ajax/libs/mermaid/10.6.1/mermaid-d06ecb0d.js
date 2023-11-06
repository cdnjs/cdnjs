function ah(t) {
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
var lh = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function hh(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var Es = { exports: {} };
(function(t, e) {
  (function(i, r) {
    t.exports = r();
  })(lh, function() {
    var i = 1e3, r = 6e4, n = 36e5, o = "millisecond", s = "second", a = "minute", l = "hour", h = "day", u = "week", f = "month", c = "quarter", p = "year", y = "date", v = "Invalid Date", M = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, q = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, S = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(E) {
      var k = ["th", "st", "nd", "rd"], C = E % 100;
      return "[" + E + (k[(C - 20) % 10] || k[C] || k[0]) + "]";
    } }, z = function(E, k, C) {
      var O = String(E);
      return !O || O.length >= k ? E : "" + Array(k + 1 - O.length).join(C) + E;
    }, Q = { s: z, z: function(E) {
      var k = -E.utcOffset(), C = Math.abs(k), O = Math.floor(C / 60), x = C % 60;
      return (k <= 0 ? "+" : "-") + z(O, 2, "0") + ":" + z(x, 2, "0");
    }, m: function E(k, C) {
      if (k.date() < C.date())
        return -E(C, k);
      var O = 12 * (C.year() - k.year()) + (C.month() - k.month()), x = k.clone().add(O, f), D = C - x < 0, T = k.clone().add(O + (D ? -1 : 1), f);
      return +(-(O + (C - x) / (D ? x - T : T - x)) || 0);
    }, a: function(E) {
      return E < 0 ? Math.ceil(E) || 0 : Math.floor(E);
    }, p: function(E) {
      return { M: f, y: p, w: u, d: h, D: y, h: l, m: a, s, ms: o, Q: c }[E] || String(E || "").toLowerCase().replace(/s$/, "");
    }, u: function(E) {
      return E === void 0;
    } }, X = "en", G = {};
    G[X] = S;
    var W = function(E) {
      return E instanceof Nt;
    }, Xt = function E(k, C, O) {
      var x;
      if (!k)
        return X;
      if (typeof k == "string") {
        var D = k.toLowerCase();
        G[D] && (x = D), C && (G[D] = C, x = D);
        var T = k.split("-");
        if (!x && T.length > 1)
          return E(T[0]);
      } else {
        var H = k.name;
        G[H] = k, x = H;
      }
      return !O && x && (X = x), x || !O && X;
    }, K = function(E, k) {
      if (W(E))
        return E.clone();
      var C = typeof k == "object" ? k : {};
      return C.date = E, C.args = arguments, new Nt(C);
    }, I = Q;
    I.l = Xt, I.i = W, I.w = function(E, k) {
      return K(E, { locale: k.$L, utc: k.$u, x: k.$x, $offset: k.$offset });
    };
    var Nt = function() {
      function E(C) {
        this.$L = Xt(C.locale, null, !0), this.parse(C);
      }
      var k = E.prototype;
      return k.parse = function(C) {
        this.$d = function(O) {
          var x = O.date, D = O.utc;
          if (x === null)
            return /* @__PURE__ */ new Date(NaN);
          if (I.u(x))
            return /* @__PURE__ */ new Date();
          if (x instanceof Date)
            return new Date(x);
          if (typeof x == "string" && !/Z$/i.test(x)) {
            var T = x.match(M);
            if (T) {
              var H = T[2] - 1 || 0, R = (T[7] || "0").substring(0, 3);
              return D ? new Date(Date.UTC(T[1], H, T[3] || 1, T[4] || 0, T[5] || 0, T[6] || 0, R)) : new Date(T[1], H, T[3] || 1, T[4] || 0, T[5] || 0, T[6] || 0, R);
            }
          }
          return new Date(x);
        }(C), this.$x = C.x || {}, this.init();
      }, k.init = function() {
        var C = this.$d;
        this.$y = C.getFullYear(), this.$M = C.getMonth(), this.$D = C.getDate(), this.$W = C.getDay(), this.$H = C.getHours(), this.$m = C.getMinutes(), this.$s = C.getSeconds(), this.$ms = C.getMilliseconds();
      }, k.$utils = function() {
        return I;
      }, k.isValid = function() {
        return this.$d.toString() !== v;
      }, k.isSame = function(C, O) {
        var x = K(C);
        return this.startOf(O) <= x && x <= this.endOf(O);
      }, k.isAfter = function(C, O) {
        return K(C) < this.startOf(O);
      }, k.isBefore = function(C, O) {
        return this.endOf(O) < K(C);
      }, k.$g = function(C, O, x) {
        return I.u(C) ? this[O] : this.set(x, C);
      }, k.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, k.valueOf = function() {
        return this.$d.getTime();
      }, k.startOf = function(C, O) {
        var x = this, D = !!I.u(O) || O, T = I.p(C), H = function(Pt, it) {
          var st = I.w(x.$u ? Date.UTC(x.$y, it, Pt) : new Date(x.$y, it, Pt), x);
          return D ? st : st.endOf(h);
        }, R = function(Pt, it) {
          return I.w(x.toDate()[Pt].apply(x.toDate("s"), (D ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(it)), x);
        }, U = this.$W, P = this.$M, ct = this.$D, pt = "set" + (this.$u ? "UTC" : "");
        switch (T) {
          case p:
            return D ? H(1, 0) : H(31, 11);
          case f:
            return D ? H(1, P) : H(0, P + 1);
          case u:
            var Kt = this.$locale().weekStart || 0, Rt = (U < Kt ? U + 7 : U) - Kt;
            return H(D ? ct - Rt : ct + (6 - Rt), P);
          case h:
          case y:
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
      }, k.endOf = function(C) {
        return this.startOf(C, !1);
      }, k.$set = function(C, O) {
        var x, D = I.p(C), T = "set" + (this.$u ? "UTC" : ""), H = (x = {}, x[h] = T + "Date", x[y] = T + "Date", x[f] = T + "Month", x[p] = T + "FullYear", x[l] = T + "Hours", x[a] = T + "Minutes", x[s] = T + "Seconds", x[o] = T + "Milliseconds", x)[D], R = D === h ? this.$D + (O - this.$W) : O;
        if (D === f || D === p) {
          var U = this.clone().set(y, 1);
          U.$d[H](R), U.init(), this.$d = U.set(y, Math.min(this.$D, U.daysInMonth())).$d;
        } else
          H && this.$d[H](R);
        return this.init(), this;
      }, k.set = function(C, O) {
        return this.clone().$set(C, O);
      }, k.get = function(C) {
        return this[I.p(C)]();
      }, k.add = function(C, O) {
        var x, D = this;
        C = Number(C);
        var T = I.p(O), H = function(P) {
          var ct = K(D);
          return I.w(ct.date(ct.date() + Math.round(P * C)), D);
        };
        if (T === f)
          return this.set(f, this.$M + C);
        if (T === p)
          return this.set(p, this.$y + C);
        if (T === h)
          return H(1);
        if (T === u)
          return H(7);
        var R = (x = {}, x[a] = r, x[l] = n, x[s] = i, x)[T] || 1, U = this.$d.getTime() + C * R;
        return I.w(U, this);
      }, k.subtract = function(C, O) {
        return this.add(-1 * C, O);
      }, k.format = function(C) {
        var O = this, x = this.$locale();
        if (!this.isValid())
          return x.invalidDate || v;
        var D = C || "YYYY-MM-DDTHH:mm:ssZ", T = I.z(this), H = this.$H, R = this.$m, U = this.$M, P = x.weekdays, ct = x.months, pt = function(it, st, kt, Zt) {
          return it && (it[st] || it(O, D)) || kt[st].slice(0, Zt);
        }, Kt = function(it) {
          return I.s(H % 12 || 12, it, "0");
        }, Rt = x.meridiem || function(it, st, kt) {
          var Zt = it < 12 ? "AM" : "PM";
          return kt ? Zt.toLowerCase() : Zt;
        }, Pt = { YY: String(this.$y).slice(-2), YYYY: this.$y, M: U + 1, MM: I.s(U + 1, 2, "0"), MMM: pt(x.monthsShort, U, ct, 3), MMMM: pt(ct, U), D: this.$D, DD: I.s(this.$D, 2, "0"), d: String(this.$W), dd: pt(x.weekdaysMin, this.$W, P, 2), ddd: pt(x.weekdaysShort, this.$W, P, 3), dddd: P[this.$W], H: String(H), HH: I.s(H, 2, "0"), h: Kt(1), hh: Kt(2), a: Rt(H, R, !0), A: Rt(H, R, !1), m: String(R), mm: I.s(R, 2, "0"), s: String(this.$s), ss: I.s(this.$s, 2, "0"), SSS: I.s(this.$ms, 3, "0"), Z: T };
        return D.replace(q, function(it, st) {
          return st || Pt[it] || T.replace(":", "");
        });
      }, k.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, k.diff = function(C, O, x) {
        var D, T = I.p(O), H = K(C), R = (H.utcOffset() - this.utcOffset()) * r, U = this - H, P = I.m(this, H);
        return P = (D = {}, D[p] = P / 12, D[f] = P, D[c] = P / 3, D[u] = (U - R) / 6048e5, D[h] = (U - R) / 864e5, D[l] = U / n, D[a] = U / r, D[s] = U / i, D)[T] || U, x ? P : I.a(P);
      }, k.daysInMonth = function() {
        return this.endOf(f).$D;
      }, k.$locale = function() {
        return G[this.$L];
      }, k.locale = function(C, O) {
        if (!C)
          return this.$L;
        var x = this.clone(), D = Xt(C, O, !0);
        return D && (x.$L = D), x;
      }, k.clone = function() {
        return I.w(this.$d, this);
      }, k.toDate = function() {
        return new Date(this.valueOf());
      }, k.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, k.toISOString = function() {
        return this.$d.toISOString();
      }, k.toString = function() {
        return this.$d.toUTCString();
      }, E;
    }(), At = Nt.prototype;
    return K.prototype = At, [["$ms", o], ["$s", s], ["$m", a], ["$H", l], ["$W", h], ["$M", f], ["$y", p], ["$D", y]].forEach(function(E) {
      At[E[1]] = function(k) {
        return this.$g(k, E[0], E[1]);
      };
    }), K.extend = function(E, k) {
      return E.$i || (E(k, Nt, K), E.$i = !0), K;
    }, K.locale = Xt, K.isDayjs = W, K.unix = function(E) {
      return K(1e3 * E);
    }, K.en = G[X], K.Ls = G, K.p = {}, K;
  });
})(Es);
var ch = Es.exports;
const uh = /* @__PURE__ */ hh(ch), Wt = {
  trace: 0,
  debug: 1,
  info: 2,
  warn: 3,
  error: 4,
  fatal: 5
}, A = {
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
  typeof t == "string" ? (t = t.toLowerCase(), t in Wt && (e = Wt[t])) : typeof t == "number" && (e = t), A.trace = () => {
  }, A.debug = () => {
  }, A.info = () => {
  }, A.warn = () => {
  }, A.error = () => {
  }, A.fatal = () => {
  }, e <= Wt.fatal && (A.fatal = console.error ? console.error.bind(console, _t("FATAL"), "color: orange") : console.log.bind(console, "\x1B[35m", _t("FATAL"))), e <= Wt.error && (A.error = console.error ? console.error.bind(console, _t("ERROR"), "color: orange") : console.log.bind(console, "\x1B[31m", _t("ERROR"))), e <= Wt.warn && (A.warn = console.warn ? console.warn.bind(console, _t("WARN"), "color: orange") : console.log.bind(console, "\x1B[33m", _t("WARN"))), e <= Wt.info && (A.info = console.info ? console.info.bind(console, _t("INFO"), "color: lightblue") : console.log.bind(console, "\x1B[34m", _t("INFO"))), e <= Wt.debug && (A.debug = console.debug ? console.debug.bind(console, _t("DEBUG"), "color: lightgreen") : console.log.bind(console, "\x1B[32m", _t("DEBUG"))), e <= Wt.trace && (A.trace = console.debug ? console.debug.bind(console, _t("TRACE"), "color: lightgreen") : console.log.bind(console, "\x1B[32m", _t("TRACE")));
}, _t = (t) => `%c${uh().format("ss.SSS")} : ${t} : `;
var Tn = {};
Object.defineProperty(Tn, "__esModule", { value: !0 });
var Ms = Tn.sanitizeUrl = void 0, fh = /^([^\w]*)(javascript|data|vbscript)/im, dh = /&#(\w+)(^\w|;)?/g, ph = /&(newline|tab);/gi, gh = /[\u0000-\u001F\u007F-\u009F\u2000-\u200D\uFEFF]/gim, mh = /^.+(:|&colon;)/gim, yh = [".", "/"];
function _h(t) {
  return yh.indexOf(t[0]) > -1;
}
function Ch(t) {
  return t.replace(dh, function(e, i) {
    return String.fromCharCode(i);
  });
}
function xh(t) {
  var e = Ch(t || "").replace(ph, "").replace(gh, "").trim();
  if (!e)
    return "about:blank";
  if (_h(e))
    return e;
  var i = e.match(mh);
  if (!i)
    return e;
  var r = i[0];
  return fh.test(r) ? "about:blank" : e;
}
Ms = Tn.sanitizeUrl = xh;
var bh = { value: () => {
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
function Th(t, e) {
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
function kh(t, e) {
  for (var i = 0, r = t.length, n; i < r; ++i)
    if ((n = t[i]).name === e)
      return n.value;
}
function Co(t, e, i) {
  for (var r = 0, n = t.length; r < n; ++r)
    if (t[r].name === e) {
      t[r] = bh, t = t.slice(0, r).concat(t.slice(r + 1));
      break;
    }
  return i != null && t.push({ name: e, value: i }), t;
}
var Zr = "http://www.w3.org/1999/xhtml";
const xo = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Zr,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function ar(t) {
  var e = t += "", i = e.indexOf(":");
  return i >= 0 && (e = t.slice(0, i)) !== "xmlns" && (t = t.slice(i + 1)), xo.hasOwnProperty(e) ? { space: xo[e], local: t } : t;
}
function Sh(t) {
  return function() {
    var e = this.ownerDocument, i = this.namespaceURI;
    return i === Zr && e.documentElement.namespaceURI === Zr ? e.createElement(t) : e.createElementNS(i, t);
  };
}
function vh(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function $s(t) {
  var e = ar(t);
  return (e.local ? vh : Sh)(e);
}
function wh() {
}
function kn(t) {
  return t == null ? wh : function() {
    return this.querySelector(t);
  };
}
function Bh(t) {
  typeof t != "function" && (t = kn(t));
  for (var e = this._groups, i = e.length, r = new Array(i), n = 0; n < i; ++n)
    for (var o = e[n], s = o.length, a = r[n] = new Array(s), l, h, u = 0; u < s; ++u)
      (l = o[u]) && (h = t.call(l, l.__data__, u, o)) && ("__data__" in l && (h.__data__ = l.__data__), a[u] = h);
  return new mt(r, this._parents);
}
function Fh(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function Ah() {
  return [];
}
function Is(t) {
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
  typeof t == "function" ? t = Lh(t) : t = Is(t);
  for (var e = this._groups, i = e.length, r = [], n = [], o = 0; o < i; ++o)
    for (var s = e[o], a = s.length, l, h = 0; h < a; ++h)
      (l = s[h]) && (r.push(t.call(l, l.__data__, h, s)), n.push(l));
  return new mt(r, n);
}
function Ds(t) {
  return function() {
    return this.matches(t);
  };
}
function Ns(t) {
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
  return this.select(t == null ? $h : Oh(typeof t == "function" ? t : Ns(t)));
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
  return this.selectAll(t == null ? Nh : Rh(typeof t == "function" ? t : Ns(t)));
}
function qh(t) {
  typeof t != "function" && (t = Ds(t));
  for (var e = this._groups, i = e.length, r = new Array(i), n = 0; n < i; ++n)
    for (var o = e[n], s = o.length, a = r[n] = [], l, h = 0; h < s; ++h)
      (l = o[h]) && t.call(l, l.__data__, h, o) && a.push(l);
  return new mt(r, this._parents);
}
function Rs(t) {
  return new Array(t.length);
}
function zh() {
  return new mt(this._enter || this._groups.map(Rs), this._parents);
}
function Ri(t, e) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = e;
}
Ri.prototype = {
  constructor: Ri,
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
    (a = e[s]) ? (a.__data__ = o[s], r[s] = a) : i[s] = new Ri(t, o[s]);
  for (; s < l; ++s)
    (a = e[s]) && (n[s] = a);
}
function jh(t, e, i, r, n, o, s) {
  var a, l, h = /* @__PURE__ */ new Map(), u = e.length, f = o.length, c = new Array(u), p;
  for (a = 0; a < u; ++a)
    (l = e[a]) && (c[a] = p = s.call(l, l.__data__, a, e) + "", h.has(p) ? n[a] = l : h.set(p, l));
  for (a = 0; a < f; ++a)
    p = s.call(t, o[a], a, o) + "", (l = h.get(p)) ? (r[a] = l, l.__data__ = o[a], h.delete(p)) : i[a] = new Ri(t, o[a]);
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
    var u = r[h], f = n[h], c = f.length, p = Gh(t.call(u, u && u.__data__, h, r)), y = p.length, v = a[h] = new Array(y), M = s[h] = new Array(y), q = l[h] = new Array(c);
    i(u, f, v, M, q, p, e);
    for (var S = 0, z = 0, Q, X; S < y; ++S)
      if (Q = v[S]) {
        for (S >= z && (z = S + 1); !(X = M[z]) && ++z < y; )
          ;
        Q._next = X || null;
      }
  }
  return s = new mt(s, r), s._enter = a, s._exit = l, s;
}
function Gh(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function Vh() {
  return new mt(this._exit || this._groups.map(Rs), this._parents);
}
function Xh(t, e, i) {
  var r = this.enter(), n = this, o = this.exit();
  return typeof t == "function" ? (r = t(r), r && (r = r.selection())) : r = r.append(t + ""), e != null && (n = e(n), n && (n = n.selection())), i == null ? o.remove() : i(o), r && n ? r.merge(n).order() : n;
}
function Kh(t) {
  for (var e = t.selection ? t.selection() : t, i = this._groups, r = e._groups, n = i.length, o = r.length, s = Math.min(n, o), a = new Array(n), l = 0; l < s; ++l)
    for (var h = i[l], u = r[l], f = h.length, c = a[l] = new Array(f), p, y = 0; y < f; ++y)
      (p = h[y] || u[y]) && (c[y] = p);
  for (; l < n; ++l)
    a[l] = i[l];
  return new mt(a, this._parents);
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
  return new mt(n, this._parents).order();
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
  var i = ar(t);
  if (arguments.length < 2) {
    var r = this.node();
    return i.local ? r.getAttributeNS(i.space, i.local) : r.getAttribute(i);
  }
  return this.each((e == null ? i.local ? ac : sc : typeof e == "function" ? i.local ? uc : cc : i.local ? hc : lc)(i, e));
}
function Ps(t) {
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
  return arguments.length > 1 ? this.each((e == null ? dc : typeof e == "function" ? gc : pc)(t, e, i ?? "")) : Fe(this.node(), t);
}
function Fe(t, e) {
  return t.style.getPropertyValue(e) || Ps(t).getComputedStyle(t, null).getPropertyValue(e);
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
function qs(t) {
  return t.trim().split(/^|\s+/);
}
function Sn(t) {
  return t.classList || new zs(t);
}
function zs(t) {
  this._node = t, this._names = qs(t.getAttribute("class") || "");
}
zs.prototype = {
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
function Ws(t, e) {
  for (var i = Sn(t), r = -1, n = e.length; ++r < n; )
    i.add(e[r]);
}
function Hs(t, e) {
  for (var i = Sn(t), r = -1, n = e.length; ++r < n; )
    i.remove(e[r]);
}
function bc(t) {
  return function() {
    Ws(this, t);
  };
}
function Tc(t) {
  return function() {
    Hs(this, t);
  };
}
function kc(t, e) {
  return function() {
    (e.apply(this, arguments) ? Ws : Hs)(this, t);
  };
}
function Sc(t, e) {
  var i = qs(t + "");
  if (arguments.length < 2) {
    for (var r = Sn(this.node()), n = -1, o = i.length; ++n < o; )
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
  var e = typeof t == "function" ? t : $s(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function Rc() {
  return null;
}
function Pc(t, e) {
  var i = typeof t == "function" ? t : $s(t), r = e == null ? Rc : typeof e == "function" ? e : kn(e);
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
function js(t, e, i) {
  var r = Ps(t), n = r.CustomEvent;
  typeof n == "function" ? n = new n(e, i) : (n = r.document.createEvent("Event"), i ? (n.initEvent(e, i.bubbles, i.cancelable), n.detail = i.detail) : n.initEvent(e, !1, !1)), t.dispatchEvent(n);
}
function Zc(t, e) {
  return function() {
    return js(this, t, e);
  };
}
function Jc(t, e) {
  return function() {
    return js(this, t, e.apply(this, arguments));
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
var Us = [null];
function mt(t, e) {
  this._groups = t, this._parents = e;
}
function li() {
  return new mt([[document.documentElement]], Us);
}
function eu() {
  return this;
}
mt.prototype = li.prototype = {
  constructor: mt,
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
function Ct(t) {
  return typeof t == "string" ? new mt([[document.querySelector(t)]], [document.documentElement]) : new mt([[t]], Us);
}
function vn(t, e, i) {
  t.prototype = e.prototype = i, i.constructor = t;
}
function Ys(t, e) {
  var i = Object.create(t.prototype);
  for (var r in e)
    i[r] = e[r];
  return i;
}
function hi() {
}
var Je = 0.7, Pi = 1 / Je, Be = "\\s*([+-]?\\d+)\\s*", Qe = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Et = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", iu = /^#([0-9a-f]{3,8})$/, ru = new RegExp(`^rgb\\(${Be},${Be},${Be}\\)$`), nu = new RegExp(`^rgb\\(${Et},${Et},${Et}\\)$`), ou = new RegExp(`^rgba\\(${Be},${Be},${Be},${Qe}\\)$`), su = new RegExp(`^rgba\\(${Et},${Et},${Et},${Qe}\\)$`), au = new RegExp(`^hsl\\(${Qe},${Et},${Et}\\)$`), lu = new RegExp(`^hsla\\(${Qe},${Et},${Et},${Qe}\\)$`), bo = {
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
vn(hi, ti, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: To,
  // Deprecated! Use color.formatHex.
  formatHex: To,
  formatHex8: hu,
  formatHsl: cu,
  formatRgb: ko,
  toString: ko
});
function To() {
  return this.rgb().formatHex();
}
function hu() {
  return this.rgb().formatHex8();
}
function cu() {
  return Gs(this).formatHsl();
}
function ko() {
  return this.rgb().formatRgb();
}
function ti(t) {
  var e, i;
  return t = (t + "").trim().toLowerCase(), (e = iu.exec(t)) ? (i = e[1].length, e = parseInt(e[1], 16), i === 6 ? So(e) : i === 3 ? new ft(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : i === 8 ? Ci(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : i === 4 ? Ci(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = ru.exec(t)) ? new ft(e[1], e[2], e[3], 1) : (e = nu.exec(t)) ? new ft(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = ou.exec(t)) ? Ci(e[1], e[2], e[3], e[4]) : (e = su.exec(t)) ? Ci(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = au.exec(t)) ? Bo(e[1], e[2] / 100, e[3] / 100, 1) : (e = lu.exec(t)) ? Bo(e[1], e[2] / 100, e[3] / 100, e[4]) : bo.hasOwnProperty(t) ? So(bo[t]) : t === "transparent" ? new ft(NaN, NaN, NaN, 0) : null;
}
function So(t) {
  return new ft(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function Ci(t, e, i, r) {
  return r <= 0 && (t = e = i = NaN), new ft(t, e, i, r);
}
function uu(t) {
  return t instanceof hi || (t = ti(t)), t ? (t = t.rgb(), new ft(t.r, t.g, t.b, t.opacity)) : new ft();
}
function Jr(t, e, i, r) {
  return arguments.length === 1 ? uu(t) : new ft(t, e, i, r ?? 1);
}
function ft(t, e, i, r) {
  this.r = +t, this.g = +e, this.b = +i, this.opacity = +r;
}
vn(ft, Jr, Ys(hi, {
  brighter(t) {
    return t = t == null ? Pi : Math.pow(Pi, t), new ft(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Je : Math.pow(Je, t), new ft(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new ft(he(this.r), he(this.g), he(this.b), qi(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: vo,
  // Deprecated! Use color.formatHex.
  formatHex: vo,
  formatHex8: fu,
  formatRgb: wo,
  toString: wo
}));
function vo() {
  return `#${le(this.r)}${le(this.g)}${le(this.b)}`;
}
function fu() {
  return `#${le(this.r)}${le(this.g)}${le(this.b)}${le((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function wo() {
  const t = qi(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${he(this.r)}, ${he(this.g)}, ${he(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function qi(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function he(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function le(t) {
  return t = he(t), (t < 16 ? "0" : "") + t.toString(16);
}
function Bo(t, e, i, r) {
  return r <= 0 ? t = e = i = NaN : i <= 0 || i >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new vt(t, e, i, r);
}
function Gs(t) {
  if (t instanceof vt)
    return new vt(t.h, t.s, t.l, t.opacity);
  if (t instanceof hi || (t = ti(t)), !t)
    return new vt();
  if (t instanceof vt)
    return t;
  t = t.rgb();
  var e = t.r / 255, i = t.g / 255, r = t.b / 255, n = Math.min(e, i, r), o = Math.max(e, i, r), s = NaN, a = o - n, l = (o + n) / 2;
  return a ? (e === o ? s = (i - r) / a + (i < r) * 6 : i === o ? s = (r - e) / a + 2 : s = (e - i) / a + 4, a /= l < 0.5 ? o + n : 2 - o - n, s *= 60) : a = l > 0 && l < 1 ? 0 : s, new vt(s, a, l, t.opacity);
}
function du(t, e, i, r) {
  return arguments.length === 1 ? Gs(t) : new vt(t, e, i, r ?? 1);
}
function vt(t, e, i, r) {
  this.h = +t, this.s = +e, this.l = +i, this.opacity = +r;
}
vn(vt, du, Ys(hi, {
  brighter(t) {
    return t = t == null ? Pi : Math.pow(Pi, t), new vt(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Je : Math.pow(Je, t), new vt(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, e = isNaN(t) || isNaN(this.s) ? 0 : this.s, i = this.l, r = i + (i < 0.5 ? i : 1 - i) * e, n = 2 * i - r;
    return new ft(
      Ir(t >= 240 ? t - 240 : t + 120, n, r),
      Ir(t, n, r),
      Ir(t < 120 ? t + 240 : t - 120, n, r),
      this.opacity
    );
  },
  clamp() {
    return new vt(Fo(this.h), xi(this.s), xi(this.l), qi(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = qi(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${Fo(this.h)}, ${xi(this.s) * 100}%, ${xi(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function Fo(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function xi(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function Ir(t, e, i) {
  return (t < 60 ? e + (i - e) * t / 60 : t < 180 ? i : t < 240 ? e + (i - e) * (240 - t) / 60 : e) * 255;
}
const wn = (t) => () => t;
function Vs(t, e) {
  return function(i) {
    return t + i * e;
  };
}
function pu(t, e, i) {
  return t = Math.pow(t, i), e = Math.pow(e, i) - t, i = 1 / i, function(r) {
    return Math.pow(t + r * e, i);
  };
}
function i1(t, e) {
  var i = e - t;
  return i ? Vs(t, i > 180 || i < -180 ? i - 360 * Math.round(i / 360) : i) : wn(isNaN(t) ? e : t);
}
function gu(t) {
  return (t = +t) == 1 ? Xs : function(e, i) {
    return i - e ? pu(e, i, t) : wn(isNaN(e) ? i : e);
  };
}
function Xs(t, e) {
  var i = e - t;
  return i ? Vs(t, i) : wn(isNaN(t) ? e : t);
}
const Ao = function t(e) {
  var i = gu(e);
  function r(n, o) {
    var s = i((n = Jr(n)).r, (o = Jr(o)).r), a = i(n.g, o.g), l = i(n.b, o.b), h = Xs(n.opacity, o.opacity);
    return function(u) {
      return n.r = s(u), n.g = a(u), n.b = l(u), n.opacity = h(u), n + "";
    };
  }
  return r.gamma = t, r;
}(1);
function Qt(t, e) {
  return t = +t, e = +e, function(i) {
    return t * (1 - i) + e * i;
  };
}
var Qr = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Dr = new RegExp(Qr.source, "g");
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
  var i = Qr.lastIndex = Dr.lastIndex = 0, r, n, o, s = -1, a = [], l = [];
  for (t = t + "", e = e + ""; (r = Qr.exec(t)) && (n = Dr.exec(e)); )
    (o = n.index) > i && (o = e.slice(i, o), a[s] ? a[s] += o : a[++s] = o), (r = r[0]) === (n = n[0]) ? a[s] ? a[s] += n : a[++s] = n : (a[++s] = null, l.push({ i: s, x: Qt(r, n) })), i = Dr.lastIndex;
  return i < e.length && (o = e.slice(i), a[s] ? a[s] += o : a[++s] = o), a.length < 2 ? l[0] ? yu(l[0].x) : mu(e) : (e = l.length, function(h) {
    for (var u = 0, f; u < e; ++u)
      a[(f = l[u]).i] = f.x(h);
    return a.join("");
  });
}
var Lo = 180 / Math.PI, tn = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function Ks(t, e, i, r, n, o) {
  var s, a, l;
  return (s = Math.sqrt(t * t + e * e)) && (t /= s, e /= s), (l = t * i + e * r) && (i -= t * l, r -= e * l), (a = Math.sqrt(i * i + r * r)) && (i /= a, r /= a, l /= a), t * r < e * i && (t = -t, e = -e, l = -l, s = -s), {
    translateX: n,
    translateY: o,
    rotate: Math.atan2(e, t) * Lo,
    skewX: Math.atan(l) * Lo,
    scaleX: s,
    scaleY: a
  };
}
var bi;
function Cu(t) {
  const e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return e.isIdentity ? tn : Ks(e.a, e.b, e.c, e.d, e.e, e.f);
}
function xu(t) {
  return t == null || (bi || (bi = document.createElementNS("http://www.w3.org/2000/svg", "g")), bi.setAttribute("transform", t), !(t = bi.transform.baseVal.consolidate())) ? tn : (t = t.matrix, Ks(t.a, t.b, t.c, t.d, t.e, t.f));
}
function Zs(t, e, i, r) {
  function n(h) {
    return h.length ? h.pop() + " " : "";
  }
  function o(h, u, f, c, p, y) {
    if (h !== f || u !== c) {
      var v = p.push("translate(", null, e, null, i);
      y.push({ i: v - 4, x: Qt(h, f) }, { i: v - 2, x: Qt(u, c) });
    } else
      (f || c) && p.push("translate(" + f + e + c + i);
  }
  function s(h, u, f, c) {
    h !== u ? (h - u > 180 ? u += 360 : u - h > 180 && (h += 360), c.push({ i: f.push(n(f) + "rotate(", null, r) - 2, x: Qt(h, u) })) : u && f.push(n(f) + "rotate(" + u + r);
  }
  function a(h, u, f, c) {
    h !== u ? c.push({ i: f.push(n(f) + "skewX(", null, r) - 2, x: Qt(h, u) }) : u && f.push(n(f) + "skewX(" + u + r);
  }
  function l(h, u, f, c, p, y) {
    if (h !== f || u !== c) {
      var v = p.push(n(p) + "scale(", null, ",", null, ")");
      y.push({ i: v - 4, x: Qt(h, f) }, { i: v - 2, x: Qt(u, c) });
    } else
      (f !== 1 || c !== 1) && p.push(n(p) + "scale(" + f + "," + c + ")");
  }
  return function(h, u) {
    var f = [], c = [];
    return h = t(h), u = t(u), o(h.translateX, h.translateY, u.translateX, u.translateY, f, c), s(h.rotate, u.rotate, f, c), a(h.skewX, u.skewX, f, c), l(h.scaleX, h.scaleY, u.scaleX, u.scaleY, f, c), h = u = null, function(p) {
      for (var y = -1, v = c.length, M; ++y < v; )
        f[(M = c[y]).i] = M.x(p);
      return f.join("");
    };
  };
}
var bu = Zs(Cu, "px, ", "px)", "deg)"), Tu = Zs(xu, ", ", ")", ")"), Ae = 0, He = 0, Pe = 0, Js = 1e3, zi, je, Wi = 0, fe = 0, lr = 0, ei = typeof performance == "object" && performance.now ? performance : Date, Qs = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function Bn() {
  return fe || (Qs(ku), fe = ei.now() + lr);
}
function ku() {
  fe = 0;
}
function Hi() {
  this._call = this._time = this._next = null;
}
Hi.prototype = ta.prototype = {
  constructor: Hi,
  restart: function(t, e, i) {
    if (typeof t != "function")
      throw new TypeError("callback is not a function");
    i = (i == null ? Bn() : +i) + (e == null ? 0 : +e), !this._next && je !== this && (je ? je._next = this : zi = this, je = this), this._call = t, this._time = i, en();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, en());
  }
};
function ta(t, e, i) {
  var r = new Hi();
  return r.restart(t, e, i), r;
}
function Su() {
  Bn(), ++Ae;
  for (var t = zi, e; t; )
    (e = fe - t._time) >= 0 && t._call.call(void 0, e), t = t._next;
  --Ae;
}
function Eo() {
  fe = (Wi = ei.now()) + lr, Ae = He = 0;
  try {
    Su();
  } finally {
    Ae = 0, wu(), fe = 0;
  }
}
function vu() {
  var t = ei.now(), e = t - Wi;
  e > Js && (lr -= e, Wi = t);
}
function wu() {
  for (var t, e = zi, i, r = 1 / 0; e; )
    e._call ? (r > e._time && (r = e._time), t = e, e = e._next) : (i = e._next, e._next = null, e = t ? t._next = i : zi = i);
  je = t, en(r);
}
function en(t) {
  if (!Ae) {
    He && (He = clearTimeout(He));
    var e = t - fe;
    e > 24 ? (t < 1 / 0 && (He = setTimeout(Eo, t - ei.now() - lr)), Pe && (Pe = clearInterval(Pe))) : (Pe || (Wi = ei.now(), Pe = setInterval(vu, Js)), Ae = 1, Qs(Eo));
  }
}
function Mo(t, e, i) {
  var r = new Hi();
  return e = e == null ? 0 : +e, r.restart((n) => {
    r.stop(), t(n + e);
  }, e, i), r;
}
var Bu = Os("start", "end", "cancel", "interrupt"), Fu = [], ea = 0, Oo = 1, rn = 2, Ai = 3, $o = 4, nn = 5, Li = 6;
function hr(t, e, i, r, n, o) {
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
    state: ea
  });
}
function Fn(t, e) {
  var i = Ft(t, e);
  if (i.state > ea)
    throw new Error("too late; already scheduled");
  return i;
}
function It(t, e) {
  var i = Ft(t, e);
  if (i.state > Ai)
    throw new Error("too late; already running");
  return i;
}
function Ft(t, e) {
  var i = t.__transition;
  if (!i || !(i = i[e]))
    throw new Error("transition not found");
  return i;
}
function Au(t, e, i) {
  var r = t.__transition, n;
  r[e] = i, i.timer = ta(o, 0, i.time);
  function o(h) {
    i.state = Oo, i.timer.restart(s, i.delay, i.time), i.delay <= h && s(h - i.delay);
  }
  function s(h) {
    var u, f, c, p;
    if (i.state !== Oo)
      return l();
    for (u in r)
      if (p = r[u], p.name === i.name) {
        if (p.state === Ai)
          return Mo(s);
        p.state === $o ? (p.state = Li, p.timer.stop(), p.on.call("interrupt", t, t.__data__, p.index, p.group), delete r[u]) : +u < e && (p.state = Li, p.timer.stop(), p.on.call("cancel", t, t.__data__, p.index, p.group), delete r[u]);
      }
    if (Mo(function() {
      i.state === Ai && (i.state = $o, i.timer.restart(a, i.delay, i.time), a(h));
    }), i.state = rn, i.on.call("start", t, t.__data__, i.index, i.group), i.state === rn) {
      for (i.state = Ai, n = new Array(c = i.tween.length), u = 0, f = -1; u < c; ++u)
        (p = i.tween[u].value.call(t, t.__data__, i.index, i.group)) && (n[++f] = p);
      n.length = f + 1;
    }
  }
  function a(h) {
    for (var u = h < i.duration ? i.ease.call(null, h / i.duration) : (i.timer.restart(l), i.state = nn, 1), f = -1, c = n.length; ++f < c; )
      n[f].call(t, u);
    i.state === nn && (i.on.call("end", t, t.__data__, i.index, i.group), l());
  }
  function l() {
    i.state = Li, i.timer.stop(), delete r[e];
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
      n = r.state > rn && r.state < nn, r.state = Li, r.timer.stop(), r.on.call(n ? "interrupt" : "cancel", t, t.__data__, r.index, r.group), delete i[s];
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
    for (var r = Ft(this.node(), i).tween, n = 0, o = r.length, s; n < o; ++n)
      if ((s = r[n]).name === t)
        return s.value;
    return null;
  }
  return this.each((e == null ? Mu : Ou)(i, t, e));
}
function An(t, e, i) {
  var r = t._id;
  return t.each(function() {
    var n = It(this, r);
    (n.value || (n.value = {}))[e] = i.apply(this, arguments);
  }), function(n) {
    return Ft(n, r).value[e];
  };
}
function ia(t, e) {
  var i;
  return (typeof e == "number" ? Qt : e instanceof ti ? Ao : (i = ti(e)) ? (e = i, Ao) : _u)(t, e);
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
  var i = ar(t), r = i === "transform" ? Tu : ia;
  return this.attrTween(t, typeof e == "function" ? (i.local ? qu : Pu)(i, r, An(this, "attr." + t, e)) : e == null ? (i.local ? Du : Iu)(i) : (i.local ? Ru : Nu)(i, r, e));
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
  var r = ar(t);
  return this.tween(i, (r.local ? ju : Uu)(r, e));
}
function Gu(t, e) {
  return function() {
    Fn(this, t).delay = +e.apply(this, arguments);
  };
}
function Vu(t, e) {
  return e = +e, function() {
    Fn(this, t).delay = e;
  };
}
function Xu(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Gu : Vu)(e, t)) : Ft(this.node(), e).delay;
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
  return arguments.length ? this.each((typeof t == "function" ? Ku : Zu)(e, t)) : Ft(this.node(), e).duration;
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
  return arguments.length ? this.each(Qu(e, t)) : Ft(this.node(), e).ease;
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
  typeof t != "function" && (t = Ds(t));
  for (var e = this._groups, i = e.length, r = new Array(i), n = 0; n < i; ++n)
    for (var o = e[n], s = o.length, a = r[n] = [], l, h = 0; h < s; ++h)
      (l = o[h]) && t.call(l, l.__data__, h, o) && a.push(l);
  return new Gt(r, this._parents, this._name, this._id);
}
function of(t) {
  if (t._id !== this._id)
    throw new Error();
  for (var e = this._groups, i = t._groups, r = e.length, n = i.length, o = Math.min(r, n), s = new Array(r), a = 0; a < o; ++a)
    for (var l = e[a], h = i[a], u = l.length, f = s[a] = new Array(u), c, p = 0; p < u; ++p)
      (c = l[p] || h[p]) && (f[p] = c);
  for (; a < r; ++a)
    s[a] = e[a];
  return new Gt(s, this._parents, this._name, this._id);
}
function sf(t) {
  return (t + "").trim().split(/^|\s+/).every(function(e) {
    var i = e.indexOf(".");
    return i >= 0 && (e = e.slice(0, i)), !e || e === "start";
  });
}
function af(t, e, i) {
  var r, n, o = sf(e) ? Fn : It;
  return function() {
    var s = o(this, t), a = s.on;
    a !== r && (n = (r = a).copy()).on(e, i), s.on = n;
  };
}
function lf(t, e) {
  var i = this._id;
  return arguments.length < 2 ? Ft(this.node(), i).on.on(t) : this.each(af(i, t, e));
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
  typeof t != "function" && (t = kn(t));
  for (var r = this._groups, n = r.length, o = new Array(n), s = 0; s < n; ++s)
    for (var a = r[s], l = a.length, h = o[s] = new Array(l), u, f, c = 0; c < l; ++c)
      (u = a[c]) && (f = t.call(u, u.__data__, c, a)) && ("__data__" in u && (f.__data__ = u.__data__), h[c] = f, hr(h[c], e, i, c, h, Ft(u, i)));
  return new Gt(o, this._parents, e, i);
}
function ff(t) {
  var e = this._name, i = this._id;
  typeof t != "function" && (t = Is(t));
  for (var r = this._groups, n = r.length, o = [], s = [], a = 0; a < n; ++a)
    for (var l = r[a], h = l.length, u, f = 0; f < h; ++f)
      if (u = l[f]) {
        for (var c = t.call(u, u.__data__, f, l), p, y = Ft(u, i), v = 0, M = c.length; v < M; ++v)
          (p = c[v]) && hr(p, e, i, v, c, y);
        o.push(c), s.push(u);
      }
  return new Gt(o, s, e, i);
}
var df = li.prototype.constructor;
function pf() {
  return new df(this._groups, this._parents);
}
function gf(t, e) {
  var i, r, n;
  return function() {
    var o = Fe(this, t), s = (this.style.removeProperty(t), Fe(this, t));
    return o === s ? null : o === i && s === r ? n : n = e(i = o, r = s);
  };
}
function ra(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function mf(t, e, i) {
  var r, n = i + "", o;
  return function() {
    var s = Fe(this, t);
    return s === n ? null : s === r ? o : o = e(r = s, i);
  };
}
function yf(t, e, i) {
  var r, n, o;
  return function() {
    var s = Fe(this, t), a = i(this), l = a + "";
    return a == null && (l = a = (this.style.removeProperty(t), Fe(this, t))), s === l ? null : s === r && l === n ? o : (n = l, o = e(r = s, a));
  };
}
function _f(t, e) {
  var i, r, n, o = "style." + e, s = "end." + o, a;
  return function() {
    var l = It(this, t), h = l.on, u = l.value[o] == null ? a || (a = ra(e)) : void 0;
    (h !== i || n !== u) && (r = (i = h).copy()).on(s, n = u), l.on = r;
  };
}
function Cf(t, e, i) {
  var r = (t += "") == "transform" ? bu : ia;
  return e == null ? this.styleTween(t, gf(t, r)).on("end.style." + t, ra(t)) : typeof e == "function" ? this.styleTween(t, yf(t, r, An(this, "style." + t, e))).each(_f(this._id, t)) : this.styleTween(t, mf(t, r, e), i).on("end.style." + t, null);
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
  return this.tween("text", typeof t == "function" ? Sf(An(this, "text", t)) : kf(t == null ? "" : t + ""));
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
  for (var t = this._name, e = this._id, i = na(), r = this._groups, n = r.length, o = 0; o < n; ++o)
    for (var s = r[o], a = s.length, l, h = 0; h < a; ++h)
      if (l = s[h]) {
        var u = Ft(l, e);
        hr(l, t, i, h, s, {
          time: u.time + u.delay + u.duration,
          delay: 0,
          duration: u.duration,
          ease: u.ease
        });
      }
  return new Gt(r, this._parents, t, i);
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
function Gt(t, e, i, r) {
  this._groups = t, this._parents = e, this._name = i, this._id = r;
}
function na() {
  return ++Ef;
}
var Ht = li.prototype;
Gt.prototype = {
  constructor: Gt,
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
  t instanceof Gt ? (e = t._id, t = t._name) : (e = na(), (i = Of).time = Bn(), t = t == null ? null : t + "");
  for (var r = this._groups, n = r.length, o = 0; o < n; ++o)
    for (var s = r[o], a = s.length, l, h = 0; h < a; ++h)
      (l = s[h]) && hr(l, t, e, h, s, i || $f(l, e));
  return new Gt(r, this._parents, t, e);
}
li.prototype.interrupt = Eu;
li.prototype.transition = If;
const r1 = Math.abs, n1 = Math.atan2, o1 = Math.cos, s1 = Math.max, a1 = Math.min, l1 = Math.sin, h1 = Math.sqrt, Io = 1e-12, Ln = Math.PI, Do = Ln / 2, c1 = 2 * Ln;
function u1(t) {
  return t > 1 ? 0 : t < -1 ? Ln : Math.acos(t);
}
function f1(t) {
  return t >= 1 ? Do : t <= -1 ? -Do : Math.asin(t);
}
function oa(t) {
  this._context = t;
}
oa.prototype = {
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
  return new oa(t);
}
class sa {
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
  return new sa(t, !0);
}
function Rf(t) {
  return new sa(t, !1);
}
function ie() {
}
function ji(t, e, i) {
  t._context.bezierCurveTo(
    (2 * t._x0 + t._x1) / 3,
    (2 * t._y0 + t._y1) / 3,
    (t._x0 + 2 * t._x1) / 3,
    (t._y0 + 2 * t._y1) / 3,
    (t._x0 + 4 * t._x1 + e) / 6,
    (t._y0 + 4 * t._y1 + i) / 6
  );
}
function cr(t) {
  this._context = t;
}
cr.prototype = {
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
        ji(this, this._x1, this._y1);
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
        ji(this, t, e);
        break;
    }
    this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = e;
  }
};
function Pf(t) {
  return new cr(t);
}
function aa(t) {
  this._context = t;
}
aa.prototype = {
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
        ji(this, t, e);
        break;
    }
    this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = e;
  }
};
function qf(t) {
  return new aa(t);
}
function la(t) {
  this._context = t;
}
la.prototype = {
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
        ji(this, t, e);
        break;
    }
    this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = e;
  }
};
function zf(t) {
  return new la(t);
}
function ha(t, e) {
  this._basis = new cr(t), this._beta = e;
}
ha.prototype = {
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
    return e === 1 ? new cr(r) : new ha(r, e);
  }
  return i.beta = function(r) {
    return t(+r);
  }, i;
}(0.85);
function Ui(t, e, i) {
  t._context.bezierCurveTo(
    t._x1 + t._k * (t._x2 - t._x0),
    t._y1 + t._k * (t._y2 - t._y0),
    t._x2 + t._k * (t._x1 - e),
    t._y2 + t._k * (t._y1 - i),
    t._x2,
    t._y2
  );
}
function En(t, e) {
  this._context = t, this._k = (1 - e) / 6;
}
En.prototype = {
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
        Ui(this, this._x1, this._y1);
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
        Ui(this, t, e);
        break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = e;
  }
};
const Hf = function t(e) {
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
        Ui(this, t, e);
        break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = e;
  }
};
const jf = function t(e) {
  function i(r) {
    return new Mn(r, e);
  }
  return i.tension = function(r) {
    return t(+r);
  }, i;
}(0);
function On(t, e) {
  this._context = t, this._k = (1 - e) / 6;
}
On.prototype = {
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
        Ui(this, t, e);
        break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = e;
  }
};
const Uf = function t(e) {
  function i(r) {
    return new On(r, e);
  }
  return i.tension = function(r) {
    return t(+r);
  }, i;
}(0);
function $n(t, e, i) {
  var r = t._x1, n = t._y1, o = t._x2, s = t._y2;
  if (t._l01_a > Io) {
    var a = 2 * t._l01_2a + 3 * t._l01_a * t._l12_a + t._l12_2a, l = 3 * t._l01_a * (t._l01_a + t._l12_a);
    r = (r * a - t._x0 * t._l12_2a + t._x2 * t._l01_2a) / l, n = (n * a - t._y0 * t._l12_2a + t._y2 * t._l01_2a) / l;
  }
  if (t._l23_a > Io) {
    var h = 2 * t._l23_2a + 3 * t._l23_a * t._l12_a + t._l12_2a, u = 3 * t._l23_a * (t._l23_a + t._l12_a);
    o = (o * h + t._x1 * t._l23_2a - e * t._l12_2a) / u, s = (s * h + t._y1 * t._l23_2a - i * t._l12_2a) / u;
  }
  t._context.bezierCurveTo(r, n, o, s, t._x2, t._y2);
}
function ca(t, e) {
  this._context = t, this._alpha = e;
}
ca.prototype = {
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
        $n(this, t, e);
        break;
    }
    this._l01_a = this._l12_a, this._l12_a = this._l23_a, this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a, this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = e;
  }
};
const Yf = function t(e) {
  function i(r) {
    return e ? new ca(r, e) : new En(r, 0);
  }
  return i.alpha = function(r) {
    return t(+r);
  }, i;
}(0.5);
function ua(t, e) {
  this._context = t, this._alpha = e;
}
ua.prototype = {
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
        $n(this, t, e);
        break;
    }
    this._l01_a = this._l12_a, this._l12_a = this._l23_a, this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a, this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = e;
  }
};
const Gf = function t(e) {
  function i(r) {
    return e ? new ua(r, e) : new Mn(r, 0);
  }
  return i.alpha = function(r) {
    return t(+r);
  }, i;
}(0.5);
function fa(t, e) {
  this._context = t, this._alpha = e;
}
fa.prototype = {
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
        $n(this, t, e);
        break;
    }
    this._l01_a = this._l12_a, this._l12_a = this._l23_a, this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a, this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = e;
  }
};
const Vf = function t(e) {
  function i(r) {
    return e ? new fa(r, e) : new On(r, 0);
  }
  return i.alpha = function(r) {
    return t(+r);
  }, i;
}(0.5);
function da(t) {
  this._context = t;
}
da.prototype = {
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
  return new da(t);
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
function Nr(t, e, i) {
  var r = t._x0, n = t._y0, o = t._x1, s = t._y1, a = (o - r) / 3;
  t._context.bezierCurveTo(r + a, n + a * e, o - a, s - a * i, o, s);
}
function Yi(t) {
  this._context = t;
}
Yi.prototype = {
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
        Nr(this, this._t0, Po(this, this._t0));
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
          this._point = 3, Nr(this, Po(this, i = Ro(this, t, e)), i);
          break;
        default:
          Nr(this, this._t0, i = Ro(this, t, e));
          break;
      }
      this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = e, this._t0 = i;
    }
  }
};
function pa(t) {
  this._context = new ga(t);
}
(pa.prototype = Object.create(Yi.prototype)).point = function(t, e) {
  Yi.prototype.point.call(this, e, t);
};
function ga(t) {
  this._context = t;
}
ga.prototype = {
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
  return new Yi(t);
}
function Zf(t) {
  return new pa(t);
}
function ma(t) {
  this._context = t;
}
ma.prototype = {
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
function Jf(t) {
  return new ma(t);
}
function ur(t, e) {
  this._context = t, this._t = e;
}
ur.prototype = {
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
  return new ur(t, 0.5);
}
function td(t) {
  return new ur(t, 0);
}
function ed(t) {
  return new ur(t, 1);
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
  entries: ya,
  setPrototypeOf: zo,
  isFrozen: id,
  getPrototypeOf: rd,
  getOwnPropertyDescriptor: nd
} = Object;
let {
  freeze: ht,
  seal: Bt,
  create: od
} = Object, {
  apply: on,
  construct: sn
} = typeof Reflect < "u" && Reflect;
on || (on = function(e, i, r) {
  return e.apply(i, r);
});
ht || (ht = function(e) {
  return e;
});
Bt || (Bt = function(e) {
  return e;
});
sn || (sn = function(e, i) {
  return new e(...i);
});
const sd = bt(Array.prototype.forEach), Wo = bt(Array.prototype.pop), qe = bt(Array.prototype.push), Ei = bt(String.prototype.toLowerCase), Rr = bt(String.prototype.toString), ad = bt(String.prototype.match), St = bt(String.prototype.replace), ld = bt(String.prototype.indexOf), hd = bt(String.prototype.trim), gt = bt(RegExp.prototype.test), ze = cd(TypeError);
function bt(t) {
  return function(e) {
    for (var i = arguments.length, r = new Array(i > 1 ? i - 1 : 0), n = 1; n < i; n++)
      r[n - 1] = arguments[n];
    return on(t, e, r);
  };
}
function cd(t) {
  return function() {
    for (var e = arguments.length, i = new Array(e), r = 0; r < e; r++)
      i[r] = arguments[r];
    return sn(t, i);
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
      s !== o && (id(e) || (e[n] = s), o = s);
    }
    t[o] = !0;
  }
  return t;
}
function ke(t) {
  const e = od(null);
  for (const [i, r] of ya(t))
    e[i] = r;
  return e;
}
function Ti(t, e) {
  for (; t !== null; ) {
    const r = nd(t, e);
    if (r) {
      if (r.get)
        return bt(r.get);
      if (typeof r.value == "function")
        return bt(r.value);
    }
    t = rd(t);
  }
  function i(r) {
    return console.warn("fallback value for", r), null;
  }
  return i;
}
const Ho = ht(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "section", "select", "shadow", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), Pr = ht(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), qr = ht(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), ud = ht(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), zr = ht(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), fd = ht(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), jo = ht(["#text"]), Uo = ht(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "pattern", "placeholder", "playsinline", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "xmlns", "slot"]), Wr = ht(["accent-height", "accumulate", "additive", "alignment-baseline", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), Yo = ht(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), ki = ht(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), dd = Bt(/\{\{[\w\W]*|[\w\W]*\}\}/gm), pd = Bt(/<%[\w\W]*|[\w\W]*%>/gm), gd = Bt(/\${[\w\W]*}/gm), md = Bt(/^data-[\-\w.\u00B7-\uFFFF]/), yd = Bt(/^aria-[\-\w]+$/), _a = Bt(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
), _d = Bt(/^(?:\w+script|data):/i), Cd = Bt(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
), Ca = Bt(/^html$/i);
var Go = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  MUSTACHE_EXPR: dd,
  ERB_EXPR: pd,
  TMPLIT_EXPR: gd,
  DATA_ATTR: md,
  ARIA_ATTR: yd,
  IS_ALLOWED_URI: _a,
  IS_SCRIPT_OR_DATA: _d,
  ATTR_WHITESPACE: Cd,
  DOCTYPE_NAME: Ca
});
const xd = () => typeof window > "u" ? null : window, bd = function(e, i) {
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
function xa() {
  let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : xd();
  const e = (w) => xa(w);
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
    NamedNodeMap: u = t.NamedNodeMap || t.MozNamedAttrMap,
    HTMLFormElement: f,
    DOMParser: c,
    trustedTypes: p
  } = t, y = l.prototype, v = Ti(y, "cloneNode"), M = Ti(y, "nextSibling"), q = Ti(y, "childNodes"), S = Ti(y, "parentNode");
  if (typeof s == "function") {
    const w = n.createElement("template");
    w.content && w.content.ownerDocument && (n = w.content.ownerDocument);
  }
  let z, Q = "";
  const {
    implementation: X,
    createNodeIterator: G,
    createDocumentFragment: W,
    getElementsByTagName: Xt
  } = n, {
    importNode: K
  } = i;
  let I = {};
  e.isSupported = typeof ya == "function" && typeof S == "function" && X && X.createHTMLDocument !== void 0;
  const {
    MUSTACHE_EXPR: Nt,
    ERB_EXPR: At,
    TMPLIT_EXPR: E,
    DATA_ATTR: k,
    ARIA_ATTR: C,
    IS_SCRIPT_OR_DATA: O,
    ATTR_WHITESPACE: x
  } = Go;
  let {
    IS_ALLOWED_URI: D
  } = Go, T = null;
  const H = N({}, [...Ho, ...Pr, ...qr, ...zr, ...jo]);
  let R = null;
  const U = N({}, [...Uo, ...Wr, ...Yo, ...ki]);
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
  })), ct = null, pt = null, Kt = !0, Rt = !0, Pt = !1, it = !0, st = !1, kt = !1, Zt = !1, wr = !1, _e = !1, di = !1, pi = !1, io = !0, ro = !1;
  const Jl = "user-content-";
  let Br = !0, Re = !1, Ce = {}, xe = null;
  const no = N({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
  let oo = null;
  const so = N({}, ["audio", "video", "img", "source", "image", "track"]);
  let Fr = null;
  const ao = N({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), gi = "http://www.w3.org/1998/Math/MathML", mi = "http://www.w3.org/2000/svg", qt = "http://www.w3.org/1999/xhtml";
  let be = qt, Ar = !1, Lr = null;
  const Ql = N({}, [gi, mi, qt], Rr);
  let oe;
  const th = ["application/xhtml+xml", "text/html"], eh = "text/html";
  let tt, Te = null;
  const ih = n.createElement("form"), lo = function(d) {
    return d instanceof RegExp || d instanceof Function;
  }, Er = function(d) {
    if (!(Te && Te === d)) {
      if ((!d || typeof d != "object") && (d = {}), d = ke(d), oe = // eslint-disable-next-line unicorn/prefer-includes
      th.indexOf(d.PARSER_MEDIA_TYPE) === -1 ? oe = eh : oe = d.PARSER_MEDIA_TYPE, tt = oe === "application/xhtml+xml" ? Rr : Ei, T = "ALLOWED_TAGS" in d ? N({}, d.ALLOWED_TAGS, tt) : H, R = "ALLOWED_ATTR" in d ? N({}, d.ALLOWED_ATTR, tt) : U, Lr = "ALLOWED_NAMESPACES" in d ? N({}, d.ALLOWED_NAMESPACES, Rr) : Ql, Fr = "ADD_URI_SAFE_ATTR" in d ? N(
        ke(ao),
        // eslint-disable-line indent
        d.ADD_URI_SAFE_ATTR,
        // eslint-disable-line indent
        tt
        // eslint-disable-line indent
      ) : ao, oo = "ADD_DATA_URI_TAGS" in d ? N(
        ke(so),
        // eslint-disable-line indent
        d.ADD_DATA_URI_TAGS,
        // eslint-disable-line indent
        tt
        // eslint-disable-line indent
      ) : so, xe = "FORBID_CONTENTS" in d ? N({}, d.FORBID_CONTENTS, tt) : no, ct = "FORBID_TAGS" in d ? N({}, d.FORBID_TAGS, tt) : {}, pt = "FORBID_ATTR" in d ? N({}, d.FORBID_ATTR, tt) : {}, Ce = "USE_PROFILES" in d ? d.USE_PROFILES : !1, Kt = d.ALLOW_ARIA_ATTR !== !1, Rt = d.ALLOW_DATA_ATTR !== !1, Pt = d.ALLOW_UNKNOWN_PROTOCOLS || !1, it = d.ALLOW_SELF_CLOSE_IN_ATTR !== !1, st = d.SAFE_FOR_TEMPLATES || !1, kt = d.WHOLE_DOCUMENT || !1, _e = d.RETURN_DOM || !1, di = d.RETURN_DOM_FRAGMENT || !1, pi = d.RETURN_TRUSTED_TYPE || !1, wr = d.FORCE_BODY || !1, io = d.SANITIZE_DOM !== !1, ro = d.SANITIZE_NAMED_PROPS || !1, Br = d.KEEP_CONTENT !== !1, Re = d.IN_PLACE || !1, D = d.ALLOWED_URI_REGEXP || _a, be = d.NAMESPACE || qt, P = d.CUSTOM_ELEMENT_HANDLING || {}, d.CUSTOM_ELEMENT_HANDLING && lo(d.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (P.tagNameCheck = d.CUSTOM_ELEMENT_HANDLING.tagNameCheck), d.CUSTOM_ELEMENT_HANDLING && lo(d.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (P.attributeNameCheck = d.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), d.CUSTOM_ELEMENT_HANDLING && typeof d.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements == "boolean" && (P.allowCustomizedBuiltInElements = d.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), st && (Rt = !1), di && (_e = !0), Ce && (T = N({}, [...jo]), R = [], Ce.html === !0 && (N(T, Ho), N(R, Uo)), Ce.svg === !0 && (N(T, Pr), N(R, Wr), N(R, ki)), Ce.svgFilters === !0 && (N(T, qr), N(R, Wr), N(R, ki)), Ce.mathMl === !0 && (N(T, zr), N(R, Yo), N(R, ki))), d.ADD_TAGS && (T === H && (T = ke(T)), N(T, d.ADD_TAGS, tt)), d.ADD_ATTR && (R === U && (R = ke(R)), N(R, d.ADD_ATTR, tt)), d.ADD_URI_SAFE_ATTR && N(Fr, d.ADD_URI_SAFE_ATTR, tt), d.FORBID_CONTENTS && (xe === no && (xe = ke(xe)), N(xe, d.FORBID_CONTENTS, tt)), Br && (T["#text"] = !0), kt && N(T, ["html", "head", "body"]), T.table && (N(T, ["tbody"]), delete ct.tbody), d.TRUSTED_TYPES_POLICY) {
        if (typeof d.TRUSTED_TYPES_POLICY.createHTML != "function")
          throw ze('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
        if (typeof d.TRUSTED_TYPES_POLICY.createScriptURL != "function")
          throw ze('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
        z = d.TRUSTED_TYPES_POLICY, Q = z.createHTML("");
      } else
        z === void 0 && (z = bd(p, r)), z !== null && typeof Q == "string" && (Q = z.createHTML(""));
      ht && ht(d), Te = d;
    }
  }, ho = N({}, ["mi", "mo", "mn", "ms", "mtext"]), co = N({}, ["foreignobject", "desc", "title", "annotation-xml"]), rh = N({}, ["title", "style", "font", "a", "script"]), yi = N({}, Pr);
  N(yi, qr), N(yi, ud);
  const Mr = N({}, zr);
  N(Mr, fd);
  const nh = function(d) {
    let m = S(d);
    (!m || !m.tagName) && (m = {
      namespaceURI: be,
      tagName: "template"
    });
    const b = Ei(d.tagName), j = Ei(m.tagName);
    return Lr[d.namespaceURI] ? d.namespaceURI === mi ? m.namespaceURI === qt ? b === "svg" : m.namespaceURI === gi ? b === "svg" && (j === "annotation-xml" || ho[j]) : !!yi[b] : d.namespaceURI === gi ? m.namespaceURI === qt ? b === "math" : m.namespaceURI === mi ? b === "math" && co[j] : !!Mr[b] : d.namespaceURI === qt ? m.namespaceURI === mi && !co[j] || m.namespaceURI === gi && !ho[j] ? !1 : !Mr[b] && (rh[b] || !yi[b]) : !!(oe === "application/xhtml+xml" && Lr[d.namespaceURI]) : !1;
  }, se = function(d) {
    qe(e.removed, {
      element: d
    });
    try {
      d.parentNode.removeChild(d);
    } catch {
      d.remove();
    }
  }, Or = function(d, m) {
    try {
      qe(e.removed, {
        attribute: m.getAttributeNode(d),
        from: m
      });
    } catch {
      qe(e.removed, {
        attribute: null,
        from: m
      });
    }
    if (m.removeAttribute(d), d === "is" && !R[d])
      if (_e || di)
        try {
          se(m);
        } catch {
        }
      else
        try {
          m.setAttribute(d, "");
        } catch {
        }
  }, uo = function(d) {
    let m, b;
    if (wr)
      d = "<remove></remove>" + d;
    else {
      const yt = ad(d, /^[\r\n\t ]+/);
      b = yt && yt[0];
    }
    oe === "application/xhtml+xml" && be === qt && (d = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + d + "</body></html>");
    const j = z ? z.createHTML(d) : d;
    if (be === qt)
      try {
        m = new c().parseFromString(j, oe);
      } catch {
      }
    if (!m || !m.documentElement) {
      m = X.createDocument(be, "template", null);
      try {
        m.documentElement.innerHTML = Ar ? Q : j;
      } catch {
      }
    }
    const et = m.body || m.documentElement;
    return d && b && et.insertBefore(n.createTextNode(b), et.childNodes[0] || null), be === qt ? Xt.call(m, kt ? "html" : "body")[0] : kt ? m.documentElement : et;
  }, fo = function(d) {
    return G.call(
      d.ownerDocument || d,
      d,
      // eslint-disable-next-line no-bitwise
      h.SHOW_ELEMENT | h.SHOW_COMMENT | h.SHOW_TEXT,
      null,
      !1
    );
  }, oh = function(d) {
    return d instanceof f && (typeof d.nodeName != "string" || typeof d.textContent != "string" || typeof d.removeChild != "function" || !(d.attributes instanceof u) || typeof d.removeAttribute != "function" || typeof d.setAttribute != "function" || typeof d.namespaceURI != "string" || typeof d.insertBefore != "function" || typeof d.hasChildNodes != "function");
  }, _i = function(d) {
    return typeof a == "object" ? d instanceof a : d && typeof d == "object" && typeof d.nodeType == "number" && typeof d.nodeName == "string";
  }, zt = function(d, m, b) {
    I[d] && sd(I[d], (j) => {
      j.call(e, m, b, Te);
    });
  }, po = function(d) {
    let m;
    if (zt("beforeSanitizeElements", d, null), oh(d))
      return se(d), !0;
    const b = tt(d.nodeName);
    if (zt("uponSanitizeElement", d, {
      tagName: b,
      allowedTags: T
    }), d.hasChildNodes() && !_i(d.firstElementChild) && (!_i(d.content) || !_i(d.content.firstElementChild)) && gt(/<[/\w]/g, d.innerHTML) && gt(/<[/\w]/g, d.textContent))
      return se(d), !0;
    if (!T[b] || ct[b]) {
      if (!ct[b] && mo(b) && (P.tagNameCheck instanceof RegExp && gt(P.tagNameCheck, b) || P.tagNameCheck instanceof Function && P.tagNameCheck(b)))
        return !1;
      if (Br && !xe[b]) {
        const j = S(d) || d.parentNode, et = q(d) || d.childNodes;
        if (et && j) {
          const yt = et.length;
          for (let V = yt - 1; V >= 0; --V)
            j.insertBefore(v(et[V], !0), M(d));
        }
      }
      return se(d), !0;
    }
    return d instanceof l && !nh(d) || (b === "noscript" || b === "noembed" || b === "noframes") && gt(/<\/no(script|embed|frames)/i, d.innerHTML) ? (se(d), !0) : (st && d.nodeType === 3 && (m = d.textContent, m = St(m, Nt, " "), m = St(m, At, " "), m = St(m, E, " "), d.textContent !== m && (qe(e.removed, {
      element: d.cloneNode()
    }), d.textContent = m)), zt("afterSanitizeElements", d, null), !1);
  }, go = function(d, m, b) {
    if (io && (m === "id" || m === "name") && (b in n || b in ih))
      return !1;
    if (!(Rt && !pt[m] && gt(k, m))) {
      if (!(Kt && gt(C, m))) {
        if (!R[m] || pt[m]) {
          if (
            // First condition does a very basic check if a) it's basically a valid custom element tagname AND
            // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
            // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
            !(mo(d) && (P.tagNameCheck instanceof RegExp && gt(P.tagNameCheck, d) || P.tagNameCheck instanceof Function && P.tagNameCheck(d)) && (P.attributeNameCheck instanceof RegExp && gt(P.attributeNameCheck, m) || P.attributeNameCheck instanceof Function && P.attributeNameCheck(m)) || // Alternative, second condition checks if it's an `is`-attribute, AND
            // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
            m === "is" && P.allowCustomizedBuiltInElements && (P.tagNameCheck instanceof RegExp && gt(P.tagNameCheck, b) || P.tagNameCheck instanceof Function && P.tagNameCheck(b)))
          )
            return !1;
        } else if (!Fr[m]) {
          if (!gt(D, St(b, x, ""))) {
            if (!((m === "src" || m === "xlink:href" || m === "href") && d !== "script" && ld(b, "data:") === 0 && oo[d])) {
              if (!(Pt && !gt(O, St(b, x, "")))) {
                if (b)
                  return !1;
              }
            }
          }
        }
      }
    }
    return !0;
  }, mo = function(d) {
    return d.indexOf("-") > 0;
  }, yo = function(d) {
    let m, b, j, et;
    zt("beforeSanitizeAttributes", d, null);
    const {
      attributes: yt
    } = d;
    if (!yt)
      return;
    const V = {
      attrName: "",
      attrValue: "",
      keepAttr: !0,
      allowedAttributes: R
    };
    for (et = yt.length; et--; ) {
      m = yt[et];
      const {
        name: Lt,
        namespaceURI: $r
      } = m;
      if (b = Lt === "value" ? m.value : hd(m.value), j = tt(Lt), V.attrName = j, V.attrValue = b, V.keepAttr = !0, V.forceKeepAttr = void 0, zt("uponSanitizeAttribute", d, V), b = V.attrValue, V.forceKeepAttr || (Or(Lt, d), !V.keepAttr))
        continue;
      if (!it && gt(/\/>/i, b)) {
        Or(Lt, d);
        continue;
      }
      st && (b = St(b, Nt, " "), b = St(b, At, " "), b = St(b, E, " "));
      const _o = tt(d.nodeName);
      if (go(_o, j, b)) {
        if (ro && (j === "id" || j === "name") && (Or(Lt, d), b = Jl + b), z && typeof p == "object" && typeof p.getAttributeType == "function" && !$r)
          switch (p.getAttributeType(_o, j)) {
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
          $r ? d.setAttributeNS($r, Lt, b) : d.setAttribute(Lt, b), Wo(e.removed);
        } catch {
        }
      }
    }
    zt("afterSanitizeAttributes", d, null);
  }, sh = function w(d) {
    let m;
    const b = fo(d);
    for (zt("beforeSanitizeShadowDOM", d, null); m = b.nextNode(); )
      zt("uponSanitizeShadowNode", m, null), !po(m) && (m.content instanceof o && w(m.content), yo(m));
    zt("afterSanitizeShadowDOM", d, null);
  };
  return e.sanitize = function(w) {
    let d = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, m, b, j, et;
    if (Ar = !w, Ar && (w = "<!-->"), typeof w != "string" && !_i(w))
      if (typeof w.toString == "function") {
        if (w = w.toString(), typeof w != "string")
          throw ze("dirty is not a string, aborting");
      } else
        throw ze("toString is not a function");
    if (!e.isSupported)
      return w;
    if (Zt || Er(d), e.removed = [], typeof w == "string" && (Re = !1), Re) {
      if (w.nodeName) {
        const Lt = tt(w.nodeName);
        if (!T[Lt] || ct[Lt])
          throw ze("root node is forbidden and cannot be sanitized in-place");
      }
    } else if (w instanceof a)
      m = uo("<!---->"), b = m.ownerDocument.importNode(w, !0), b.nodeType === 1 && b.nodeName === "BODY" || b.nodeName === "HTML" ? m = b : m.appendChild(b);
    else {
      if (!_e && !st && !kt && // eslint-disable-next-line unicorn/prefer-includes
      w.indexOf("<") === -1)
        return z && pi ? z.createHTML(w) : w;
      if (m = uo(w), !m)
        return _e ? null : pi ? Q : "";
    }
    m && wr && se(m.firstChild);
    const yt = fo(Re ? w : m);
    for (; j = yt.nextNode(); )
      po(j) || (j.content instanceof o && sh(j.content), yo(j));
    if (Re)
      return w;
    if (_e) {
      if (di)
        for (et = W.call(m.ownerDocument); m.firstChild; )
          et.appendChild(m.firstChild);
      else
        et = m;
      return (R.shadowroot || R.shadowrootmode) && (et = K.call(i, et, !0)), et;
    }
    let V = kt ? m.outerHTML : m.innerHTML;
    return kt && T["!doctype"] && m.ownerDocument && m.ownerDocument.doctype && m.ownerDocument.doctype.name && gt(Ca, m.ownerDocument.doctype.name) && (V = "<!DOCTYPE " + m.ownerDocument.doctype.name + `>
` + V), st && (V = St(V, Nt, " "), V = St(V, At, " "), V = St(V, E, " ")), z && pi ? z.createHTML(V) : V;
  }, e.setConfig = function(w) {
    Er(w), Zt = !0;
  }, e.clearConfig = function() {
    Te = null, Zt = !1;
  }, e.isValidAttribute = function(w, d, m) {
    Te || Er({});
    const b = tt(w), j = tt(d);
    return go(b, j, m);
  }, e.addHook = function(w, d) {
    typeof d == "function" && (I[w] = I[w] || [], qe(I[w], d));
  }, e.removeHook = function(w) {
    if (I[w])
      return Wo(I[w]);
  }, e.removeHooks = function(w) {
    I[w] && (I[w] = []);
  }, e.removeAllHooks = function() {
    I = {};
  }, e;
}
var Gi = xa();
const fr = /<br\s*\/?>/gi, Td = (t) => t ? Ta(t).replace(/\\n/g, "#br#").split("#br#") : [""], ba = (t) => Gi.sanitize(t), Vo = (t, e) => {
  var i;
  if (((i = e.flowchart) == null ? void 0 : i.htmlLabels) !== !1) {
    const r = e.securityLevel;
    r === "antiscript" || r === "strict" ? t = ba(t) : r !== "loose" && (t = Ta(t), t = t.replace(/</g, "&lt;").replace(/>/g, "&gt;"), t = t.replace(/=/g, "&equals;"), t = wd(t));
  }
  return t;
}, ii = (t, e) => t && (e.dompurifyConfig ? t = Gi.sanitize(Vo(t, e), e.dompurifyConfig).toString() : t = Gi.sanitize(Vo(t, e), {
  FORBID_TAGS: ["style"]
}).toString(), t), kd = (t, e) => typeof t == "string" ? ii(t, e) : t.flat().map((i) => ii(i, e)), Sd = (t) => fr.test(t), vd = (t) => t.split(fr), wd = (t) => t.replace(/#br#/g, "<br/>"), Ta = (t) => t.replace(fr, "#br#"), Bd = (t) => {
  let e = "";
  return t && (e = window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.search, e = e.replaceAll(/\(/g, "\\("), e = e.replaceAll(/\)/g, "\\)")), e;
}, ka = (t) => !(t === !1 || ["false", "null", "0"].includes(String(t).trim().toLowerCase())), Fd = function(...t) {
  const e = t.filter((i) => !isNaN(i));
  return Math.max(...e);
}, Ad = function(...t) {
  const e = t.filter((i) => !isNaN(i));
  return Math.min(...e);
}, d1 = function(t) {
  const e = t.split(/(,)/), i = [];
  for (let r = 0; r < e.length; r++) {
    let n = e[r];
    if (n === "," && r > 0 && r + 1 < e.length) {
      const o = e[r - 1], s = e[r + 1];
      Ld(o, s) && (n = o + "," + s, r++, i.pop());
    }
    i.push(Ed(n));
  }
  return i.join("");
}, an = (t, e) => Math.max(0, t.split(e).length - 1), Ld = (t, e) => {
  const i = an(t, "~"), r = an(e, "~");
  return i === 1 && r === 1;
}, Ed = (t) => {
  const e = an(t, "~");
  let i = !1;
  if (e <= 1)
    return t;
  e % 2 !== 0 && t.startsWith("~") && (t = t.substring(1), i = !0);
  const r = [...t];
  let n = r.indexOf("~"), o = r.lastIndexOf("~");
  for (; n !== -1 && o !== -1 && n !== o; )
    r[n] = "<", r[o] = ">", n = r.indexOf("~"), o = r.lastIndexOf("~");
  return i && r.unshift("~"), r.join("");
}, In = {
  getRows: Td,
  sanitizeText: ii,
  sanitizeTextOrArray: kd,
  hasBreaks: Sd,
  splitBreaks: vd,
  lineBreakRegex: fr,
  removeScript: ba,
  getUrl: Bd,
  evaluate: ka,
  getMax: Fd,
  getMin: Ad
}, Mi = {
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
        return Mi.hue2rgb(o, n, t + 1 / 3) * 255;
      case "g":
        return Mi.hue2rgb(o, n, t) * 255;
      case "b":
        return Mi.hue2rgb(o, n, t - 1 / 3) * 255;
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
}, Md = Mi, Od = {
  /* API */
  clamp: (t, e, i) => e > i ? Math.min(e, Math.max(i, t)) : Math.min(i, Math.max(e, t)),
  round: (t) => Math.round(t * 1e10) / 1e10
}, $d = Od, Id = {
  /* API */
  dec2hex: (t) => {
    const e = Math.round(t).toString(16);
    return e.length > 1 ? e : `0${e}`;
  }
}, Dd = Id, Nd = {
  channel: Md,
  lang: $d,
  unit: Dd
}, $ = Nd, Jt = {};
for (let t = 0; t <= 255; t++)
  Jt[t] = $.unit.dec2hex(t);
const rt = {
  ALL: 0,
  RGB: 1,
  HSL: 2
};
class Rd {
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
const Pd = Rd;
class qd {
  /* CONSTRUCTOR */
  constructor(e, i) {
    this.color = i, this.changed = !1, this.data = e, this.type = new Pd();
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
const zd = qd, Wd = new zd({ r: 0, g: 0, b: 0, a: 0 }, "transparent"), dr = Wd, Sa = {
  /* VARIABLES */
  re: /^#((?:[a-f0-9]{2}){2,4}|[a-f0-9]{3})$/i,
  /* API */
  parse: (t) => {
    if (t.charCodeAt(0) !== 35)
      return;
    const e = t.match(Sa.re);
    if (!e)
      return;
    const i = e[1], r = parseInt(i, 16), n = i.length, o = n % 4 === 0, s = n > 4, a = s ? 1 : 17, l = s ? 8 : 4, h = o ? 0 : -1, u = s ? 255 : 15;
    return dr.set({
      r: (r >> l * (h + 3) & u) * a,
      g: (r >> l * (h + 2) & u) * a,
      b: (r >> l * (h + 1) & u) * a,
      a: o ? (r & u) * a / 255 : 1
    }, t);
  },
  stringify: (t) => {
    const { r: e, g: i, b: r, a: n } = t;
    return n < 1 ? `#${Jt[Math.round(e)]}${Jt[Math.round(i)]}${Jt[Math.round(r)]}${Jt[Math.round(n * 255)]}` : `#${Jt[Math.round(e)]}${Jt[Math.round(i)]}${Jt[Math.round(r)]}`;
  }
}, Ye = Sa, Oi = {
  /* VARIABLES */
  re: /^hsla?\(\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e-?\d+)?(?:deg|grad|rad|turn)?)\s*?(?:,|\s)\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e-?\d+)?%)\s*?(?:,|\s)\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e-?\d+)?%)(?:\s*?(?:,|\/)\s*?\+?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e-?\d+)?(%)?))?\s*?\)$/i,
  hueRe: /^(.+?)(deg|grad|rad|turn)$/i,
  /* HELPERS */
  _hue2deg: (t) => {
    const e = t.match(Oi.hueRe);
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
    const i = t.match(Oi.re);
    if (!i)
      return;
    const [, r, n, o, s, a] = i;
    return dr.set({
      h: Oi._hue2deg(r),
      s: $.channel.clamp.s(parseFloat(n)),
      l: $.channel.clamp.l(parseFloat(o)),
      a: s ? $.channel.clamp.a(a ? parseFloat(s) / 100 : parseFloat(s)) : 1
    }, t);
  },
  stringify: (t) => {
    const { h: e, s: i, l: r, a: n } = t;
    return n < 1 ? `hsla(${$.lang.round(e)}, ${$.lang.round(i)}%, ${$.lang.round(r)}%, ${n})` : `hsl(${$.lang.round(e)}, ${$.lang.round(i)}%, ${$.lang.round(r)}%)`;
  }
}, Si = Oi, $i = {
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
    const [, r, n, o, s, a, l, h, u] = i;
    return dr.set({
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
}, vi = va, Hd = {
  /* VARIABLES */
  format: {
    keyword: Xo,
    hex: Ye,
    rgb: vi,
    rgba: vi,
    hsl: Si,
    hsla: Si
  },
  /* API */
  parse: (t) => {
    if (typeof t != "string")
      return t;
    const e = Ye.parse(t) || vi.parse(t) || Si.parse(t) || Xo.parse(t);
    if (e)
      return e;
    throw new Error(`Unsupported color format: "${t}"`);
  },
  stringify: (t) => !t.changed && t.color ? t.color : t.type.is(rt.HSL) || t.data.r === void 0 ? Si.stringify(t) : t.a < 1 || !Number.isInteger(t.r) || !Number.isInteger(t.g) || !Number.isInteger(t.b) ? vi.stringify(t) : Ye.stringify(t)
}, Ot = Hd, jd = (t, e) => {
  const i = Ot.parse(t);
  for (const r in e)
    i[r] = $.channel.clamp[r](e[r]);
  return Ot.stringify(i);
}, wa = jd, Ud = (t, e, i = 0, r = 1) => {
  if (typeof t != "number")
    return wa(t, { a: e });
  const n = dr.set({
    r: $.channel.clamp.r(t),
    g: $.channel.clamp.g(e),
    b: $.channel.clamp.b(i),
    a: $.channel.clamp.a(r)
  });
  return Ot.stringify(n);
}, Ge = Ud, Yd = (t) => {
  const { r: e, g: i, b: r } = Ot.parse(t), n = 0.2126 * $.channel.toLinear(e) + 0.7152 * $.channel.toLinear(i) + 0.0722 * $.channel.toLinear(r);
  return $.lang.round(n);
}, Gd = Yd, Vd = (t) => Gd(t) >= 0.5, Xd = Vd, Kd = (t) => !Xd(t), ci = Kd, Zd = (t, e, i) => {
  const r = Ot.parse(t), n = r[e], o = $.channel.clamp[e](n + i);
  return n !== o && (r[e] = o), Ot.stringify(r);
}, Ba = Zd, Jd = (t, e) => Ba(t, "l", e), B = Jd, Qd = (t, e) => Ba(t, "l", -e), L = Qd, tp = (t, e) => {
  const i = Ot.parse(t), r = {};
  for (const n in e)
    e[n] && (r[n] = i[n] + e[n]);
  return wa(t, r);
}, g = tp, ep = (t, e, i = 50) => {
  const { r, g: n, b: o, a: s } = Ot.parse(t), { r: a, g: l, b: h, a: u } = Ot.parse(e), f = i / 100, c = f * 2 - 1, p = s - u, v = ((c * p === -1 ? c : (c + p) / (1 + c * p)) + 1) / 2, M = 1 - v, q = r * v + a * M, S = n * v + l * M, z = o * v + h * M, Q = s * f + u * (1 - f);
  return Ge(q, S, z, Q);
}, ip = ep, rp = (t, e = 100) => {
  const i = Ot.parse(t);
  return i.r = 255 - i.r, i.g = 255 - i.g, i.b = 255 - i.b, ip(i, t, e);
}, _ = rp, lt = (t, e) => e ? g(t, { s: -40, l: 10 }) : g(t, { s: -40, l: -10 }), pr = "#ffffff", gr = "#f2f2f2";
let np = class {
  constructor() {
    this.background = "#f4f4f4", this.primaryColor = "#fff4dd", this.noteBkgColor = "#fff5ad", this.noteTextColor = "#333", this.THEME_COLOR_LIMIT = 12, this.fontFamily = '"trebuchet ms", verdana, arial, sans-serif', this.fontSize = "16px";
  }
  updateColors() {
    var i, r, n, o, s, a, l, h, u, f, c;
    if (this.primaryTextColor = this.primaryTextColor || (this.darkMode ? "#eee" : "#333"), this.secondaryColor = this.secondaryColor || g(this.primaryColor, { h: -120 }), this.tertiaryColor = this.tertiaryColor || g(this.primaryColor, { h: 180, l: 5 }), this.primaryBorderColor = this.primaryBorderColor || lt(this.primaryColor, this.darkMode), this.secondaryBorderColor = this.secondaryBorderColor || lt(this.secondaryColor, this.darkMode), this.tertiaryBorderColor = this.tertiaryBorderColor || lt(this.tertiaryColor, this.darkMode), this.noteBorderColor = this.noteBorderColor || lt(this.noteBkgColor, this.darkMode), this.noteBkgColor = this.noteBkgColor || "#fff5ad", this.noteTextColor = this.noteTextColor || "#333", this.secondaryTextColor = this.secondaryTextColor || _(this.secondaryColor), this.tertiaryTextColor = this.tertiaryTextColor || _(this.tertiaryColor), this.lineColor = this.lineColor || _(this.background), this.arrowheadColor = this.arrowheadColor || _(this.background), this.textColor = this.textColor || this.primaryTextColor, this.border2 = this.border2 || this.tertiaryBorderColor, this.nodeBkg = this.nodeBkg || this.primaryColor, this.mainBkg = this.mainBkg || this.primaryColor, this.nodeBorder = this.nodeBorder || this.primaryBorderColor, this.clusterBkg = this.clusterBkg || this.tertiaryColor, this.clusterBorder = this.clusterBorder || this.tertiaryBorderColor, this.defaultLinkColor = this.defaultLinkColor || this.lineColor, this.titleColor = this.titleColor || this.tertiaryTextColor, this.edgeLabelBackground = this.edgeLabelBackground || (this.darkMode ? L(this.secondaryColor, 30) : this.secondaryColor), this.nodeTextColor = this.nodeTextColor || this.primaryTextColor, this.actorBorder = this.actorBorder || this.primaryBorderColor, this.actorBkg = this.actorBkg || this.mainBkg, this.actorTextColor = this.actorTextColor || this.primaryTextColor, this.actorLineColor = this.actorLineColor || "grey", this.labelBoxBkgColor = this.labelBoxBkgColor || this.actorBkg, this.signalColor = this.signalColor || this.textColor, this.signalTextColor = this.signalTextColor || this.textColor, this.labelBoxBorderColor = this.labelBoxBorderColor || this.actorBorder, this.labelTextColor = this.labelTextColor || this.actorTextColor, this.loopTextColor = this.loopTextColor || this.actorTextColor, this.activationBorderColor = this.activationBorderColor || L(this.secondaryColor, 10), this.activationBkgColor = this.activationBkgColor || this.secondaryColor, this.sequenceNumberColor = this.sequenceNumberColor || _(this.lineColor), this.sectionBkgColor = this.sectionBkgColor || this.tertiaryColor, this.altSectionBkgColor = this.altSectionBkgColor || "white", this.sectionBkgColor = this.sectionBkgColor || this.secondaryColor, this.sectionBkgColor2 = this.sectionBkgColor2 || this.primaryColor, this.excludeBkgColor = this.excludeBkgColor || "#eeeeee", this.taskBorderColor = this.taskBorderColor || this.primaryBorderColor, this.taskBkgColor = this.taskBkgColor || this.primaryColor, this.activeTaskBorderColor = this.activeTaskBorderColor || this.primaryColor, this.activeTaskBkgColor = this.activeTaskBkgColor || B(this.primaryColor, 23), this.gridColor = this.gridColor || "lightgrey", this.doneTaskBkgColor = this.doneTaskBkgColor || "lightgrey", this.doneTaskBorderColor = this.doneTaskBorderColor || "grey", this.critBorderColor = this.critBorderColor || "#ff8888", this.critBkgColor = this.critBkgColor || "red", this.todayLineColor = this.todayLineColor || "red", this.taskTextColor = this.taskTextColor || this.textColor, this.taskTextOutsideColor = this.taskTextOutsideColor || this.textColor, this.taskTextLightColor = this.taskTextLightColor || this.textColor, this.taskTextColor = this.taskTextColor || this.primaryTextColor, this.taskTextDarkColor = this.taskTextDarkColor || this.textColor, this.taskTextClickableColor = this.taskTextClickableColor || "#003163", this.personBorder = this.personBorder || this.primaryBorderColor, this.personBkg = this.personBkg || this.mainBkg, this.transitionColor = this.transitionColor || this.lineColor, this.transitionLabelColor = this.transitionLabelColor || this.textColor, this.stateLabelColor = this.stateLabelColor || this.stateBkg || this.primaryTextColor, this.stateBkg = this.stateBkg || this.mainBkg, this.labelBackgroundColor = this.labelBackgroundColor || this.stateBkg, this.compositeBackground = this.compositeBackground || this.background || this.tertiaryColor, this.altBackground = this.altBackground || this.tertiaryColor, this.compositeTitleBackground = this.compositeTitleBackground || this.mainBkg, this.compositeBorder = this.compositeBorder || this.nodeBorder, this.innerEndBackground = this.nodeBorder, this.errorBkgColor = this.errorBkgColor || this.tertiaryColor, this.errorTextColor = this.errorTextColor || this.tertiaryTextColor, this.transitionColor = this.transitionColor || this.lineColor, this.specialStateColor = this.lineColor, this.cScale0 = this.cScale0 || this.primaryColor, this.cScale1 = this.cScale1 || this.secondaryColor, this.cScale2 = this.cScale2 || this.tertiaryColor, this.cScale3 = this.cScale3 || g(this.primaryColor, { h: 30 }), this.cScale4 = this.cScale4 || g(this.primaryColor, { h: 60 }), this.cScale5 = this.cScale5 || g(this.primaryColor, { h: 90 }), this.cScale6 = this.cScale6 || g(this.primaryColor, { h: 120 }), this.cScale7 = this.cScale7 || g(this.primaryColor, { h: 150 }), this.cScale8 = this.cScale8 || g(this.primaryColor, { h: 210, l: 150 }), this.cScale9 = this.cScale9 || g(this.primaryColor, { h: 270 }), this.cScale10 = this.cScale10 || g(this.primaryColor, { h: 300 }), this.cScale11 = this.cScale11 || g(this.primaryColor, { h: 330 }), this.darkMode)
      for (let p = 0; p < this.THEME_COLOR_LIMIT; p++)
        this["cScale" + p] = L(this["cScale" + p], 75);
    else
      for (let p = 0; p < this.THEME_COLOR_LIMIT; p++)
        this["cScale" + p] = L(this["cScale" + p], 25);
    for (let p = 0; p < this.THEME_COLOR_LIMIT; p++)
      this["cScaleInv" + p] = this["cScaleInv" + p] || _(this["cScale" + p]);
    for (let p = 0; p < this.THEME_COLOR_LIMIT; p++)
      this.darkMode ? this["cScalePeer" + p] = this["cScalePeer" + p] || B(this["cScale" + p], 10) : this["cScalePeer" + p] = this["cScalePeer" + p] || L(this["cScale" + p], 10);
    this.scaleLabelColor = this.scaleLabelColor || this.labelTextColor;
    for (let p = 0; p < this.THEME_COLOR_LIMIT; p++)
      this["cScaleLabel" + p] = this["cScaleLabel" + p] || this.scaleLabelColor;
    const e = this.darkMode ? -4 : -1;
    for (let p = 0; p < 5; p++)
      this["surface" + p] = this["surface" + p] || g(this.mainBkg, { h: 180, s: -15, l: e * (5 + p * 3) }), this["surfacePeer" + p] = this["surfacePeer" + p] || g(this.mainBkg, { h: 180, s: -15, l: e * (8 + p * 3) });
    this.classText = this.classText || this.textColor, this.fillType0 = this.fillType0 || this.primaryColor, this.fillType1 = this.fillType1 || this.secondaryColor, this.fillType2 = this.fillType2 || g(this.primaryColor, { h: 64 }), this.fillType3 = this.fillType3 || g(this.secondaryColor, { h: 64 }), this.fillType4 = this.fillType4 || g(this.primaryColor, { h: -64 }), this.fillType5 = this.fillType5 || g(this.secondaryColor, { h: -64 }), this.fillType6 = this.fillType6 || g(this.primaryColor, { h: 128 }), this.fillType7 = this.fillType7 || g(this.secondaryColor, { h: 128 }), this.pie1 = this.pie1 || this.primaryColor, this.pie2 = this.pie2 || this.secondaryColor, this.pie3 = this.pie3 || this.tertiaryColor, this.pie4 = this.pie4 || g(this.primaryColor, { l: -10 }), this.pie5 = this.pie5 || g(this.secondaryColor, { l: -10 }), this.pie6 = this.pie6 || g(this.tertiaryColor, { l: -10 }), this.pie7 = this.pie7 || g(this.primaryColor, { h: 60, l: -10 }), this.pie8 = this.pie8 || g(this.primaryColor, { h: -60, l: -10 }), this.pie9 = this.pie9 || g(this.primaryColor, { h: 120, l: 0 }), this.pie10 = this.pie10 || g(this.primaryColor, { h: 60, l: -20 }), this.pie11 = this.pie11 || g(this.primaryColor, { h: -60, l: -20 }), this.pie12 = this.pie12 || g(this.primaryColor, { h: 120, l: -10 }), this.pieTitleTextSize = this.pieTitleTextSize || "25px", this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor, this.pieSectionTextSize = this.pieSectionTextSize || "17px", this.pieSectionTextColor = this.pieSectionTextColor || this.textColor, this.pieLegendTextSize = this.pieLegendTextSize || "17px", this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor, this.pieStrokeColor = this.pieStrokeColor || "black", this.pieStrokeWidth = this.pieStrokeWidth || "2px", this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || "2px", this.pieOuterStrokeColor = this.pieOuterStrokeColor || "black", this.pieOpacity = this.pieOpacity || "0.7", this.quadrant1Fill = this.quadrant1Fill || this.primaryColor, this.quadrant2Fill = this.quadrant2Fill || g(this.primaryColor, { r: 5, g: 5, b: 5 }), this.quadrant3Fill = this.quadrant3Fill || g(this.primaryColor, { r: 10, g: 10, b: 10 }), this.quadrant4Fill = this.quadrant4Fill || g(this.primaryColor, { r: 15, g: 15, b: 15 }), this.quadrant1TextFill = this.quadrant1TextFill || this.primaryTextColor, this.quadrant2TextFill = this.quadrant2TextFill || g(this.primaryTextColor, { r: -5, g: -5, b: -5 }), this.quadrant3TextFill = this.quadrant3TextFill || g(this.primaryTextColor, { r: -10, g: -10, b: -10 }), this.quadrant4TextFill = this.quadrant4TextFill || g(this.primaryTextColor, { r: -15, g: -15, b: -15 }), this.quadrantPointFill = this.quadrantPointFill || ci(this.quadrant1Fill) ? B(this.quadrant1Fill) : L(this.quadrant1Fill), this.quadrantPointTextFill = this.quadrantPointTextFill || this.primaryTextColor, this.quadrantXAxisTextFill = this.quadrantXAxisTextFill || this.primaryTextColor, this.quadrantYAxisTextFill = this.quadrantYAxisTextFill || this.primaryTextColor, this.quadrantInternalBorderStrokeFill = this.quadrantInternalBorderStrokeFill || this.primaryBorderColor, this.quadrantExternalBorderStrokeFill = this.quadrantExternalBorderStrokeFill || this.primaryBorderColor, this.quadrantTitleFill = this.quadrantTitleFill || this.primaryTextColor, this.xyChart = {
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
    }, this.requirementBackground = this.requirementBackground || this.primaryColor, this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor, this.requirementBorderSize = this.requirementBorderSize || "1", this.requirementTextColor = this.requirementTextColor || this.primaryTextColor, this.relationColor = this.relationColor || this.lineColor, this.relationLabelBackground = this.relationLabelBackground || (this.darkMode ? L(this.secondaryColor, 30) : this.secondaryColor), this.relationLabelColor = this.relationLabelColor || this.actorTextColor, this.git0 = this.git0 || this.primaryColor, this.git1 = this.git1 || this.secondaryColor, this.git2 = this.git2 || this.tertiaryColor, this.git3 = this.git3 || g(this.primaryColor, { h: -30 }), this.git4 = this.git4 || g(this.primaryColor, { h: -60 }), this.git5 = this.git5 || g(this.primaryColor, { h: -90 }), this.git6 = this.git6 || g(this.primaryColor, { h: 60 }), this.git7 = this.git7 || g(this.primaryColor, { h: 120 }), this.darkMode ? (this.git0 = B(this.git0, 25), this.git1 = B(this.git1, 25), this.git2 = B(this.git2, 25), this.git3 = B(this.git3, 25), this.git4 = B(this.git4, 25), this.git5 = B(this.git5, 25), this.git6 = B(this.git6, 25), this.git7 = B(this.git7, 25)) : (this.git0 = L(this.git0, 25), this.git1 = L(this.git1, 25), this.git2 = L(this.git2, 25), this.git3 = L(this.git3, 25), this.git4 = L(this.git4, 25), this.git5 = L(this.git5, 25), this.git6 = L(this.git6, 25), this.git7 = L(this.git7, 25)), this.gitInv0 = this.gitInv0 || _(this.git0), this.gitInv1 = this.gitInv1 || _(this.git1), this.gitInv2 = this.gitInv2 || _(this.git2), this.gitInv3 = this.gitInv3 || _(this.git3), this.gitInv4 = this.gitInv4 || _(this.git4), this.gitInv5 = this.gitInv5 || _(this.git5), this.gitInv6 = this.gitInv6 || _(this.git6), this.gitInv7 = this.gitInv7 || _(this.git7), this.branchLabelColor = this.branchLabelColor || (this.darkMode ? "black" : this.labelTextColor), this.gitBranchLabel0 = this.gitBranchLabel0 || this.branchLabelColor, this.gitBranchLabel1 = this.gitBranchLabel1 || this.branchLabelColor, this.gitBranchLabel2 = this.gitBranchLabel2 || this.branchLabelColor, this.gitBranchLabel3 = this.gitBranchLabel3 || this.branchLabelColor, this.gitBranchLabel4 = this.gitBranchLabel4 || this.branchLabelColor, this.gitBranchLabel5 = this.gitBranchLabel5 || this.branchLabelColor, this.gitBranchLabel6 = this.gitBranchLabel6 || this.branchLabelColor, this.gitBranchLabel7 = this.gitBranchLabel7 || this.branchLabelColor, this.tagLabelColor = this.tagLabelColor || this.primaryTextColor, this.tagLabelBackground = this.tagLabelBackground || this.primaryColor, this.tagLabelBorder = this.tagBorder || this.primaryBorderColor, this.tagLabelFontSize = this.tagLabelFontSize || "10px", this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor, this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor, this.commitLabelFontSize = this.commitLabelFontSize || "10px", this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || pr, this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || gr;
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
const op = (t) => {
  const e = new np();
  return e.calculate(t), e;
};
let sp = class {
  constructor() {
    this.background = "#333", this.primaryColor = "#1f2020", this.secondaryColor = B(this.primaryColor, 16), this.tertiaryColor = g(this.primaryColor, { h: -160 }), this.primaryBorderColor = _(this.background), this.secondaryBorderColor = lt(this.secondaryColor, this.darkMode), this.tertiaryBorderColor = lt(this.tertiaryColor, this.darkMode), this.primaryTextColor = _(this.primaryColor), this.secondaryTextColor = _(this.secondaryColor), this.tertiaryTextColor = _(this.tertiaryColor), this.lineColor = _(this.background), this.textColor = _(this.background), this.mainBkg = "#1f2020", this.secondBkg = "calculated", this.mainContrastColor = "lightgrey", this.darkTextColor = B(_("#323D47"), 10), this.lineColor = "calculated", this.border1 = "#81B1DB", this.border2 = Ge(255, 255, 255, 0.25), this.arrowheadColor = "calculated", this.fontFamily = '"trebuchet ms", verdana, arial, sans-serif', this.fontSize = "16px", this.labelBackground = "#181818", this.textColor = "#ccc", this.THEME_COLOR_LIMIT = 12, this.nodeBkg = "calculated", this.nodeBorder = "calculated", this.clusterBkg = "calculated", this.clusterBorder = "calculated", this.defaultLinkColor = "calculated", this.titleColor = "#F9FFFE", this.edgeLabelBackground = "calculated", this.actorBorder = "calculated", this.actorBkg = "calculated", this.actorTextColor = "calculated", this.actorLineColor = "calculated", this.signalColor = "calculated", this.signalTextColor = "calculated", this.labelBoxBkgColor = "calculated", this.labelBoxBorderColor = "calculated", this.labelTextColor = "calculated", this.loopTextColor = "calculated", this.noteBorderColor = "calculated", this.noteBkgColor = "#fff5ad", this.noteTextColor = "calculated", this.activationBorderColor = "calculated", this.activationBkgColor = "calculated", this.sequenceNumberColor = "black", this.sectionBkgColor = L("#EAE8D9", 30), this.altSectionBkgColor = "calculated", this.sectionBkgColor2 = "#EAE8D9", this.excludeBkgColor = L(this.sectionBkgColor, 10), this.taskBorderColor = Ge(255, 255, 255, 70), this.taskBkgColor = "calculated", this.taskTextColor = "calculated", this.taskTextLightColor = "calculated", this.taskTextOutsideColor = "calculated", this.taskTextClickableColor = "#003163", this.activeTaskBorderColor = Ge(255, 255, 255, 50), this.activeTaskBkgColor = "#81B1DB", this.gridColor = "calculated", this.doneTaskBkgColor = "calculated", this.doneTaskBorderColor = "grey", this.critBorderColor = "#E83737", this.critBkgColor = "#E83737", this.taskTextDarkColor = "calculated", this.todayLineColor = "#DB5757", this.personBorder = this.primaryBorderColor, this.personBkg = this.mainBkg, this.labelColor = "calculated", this.errorBkgColor = "#a44141", this.errorTextColor = "#ddd";
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
    this.pieTitleTextSize = this.pieTitleTextSize || "25px", this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor, this.pieSectionTextSize = this.pieSectionTextSize || "17px", this.pieSectionTextColor = this.pieSectionTextColor || this.textColor, this.pieLegendTextSize = this.pieLegendTextSize || "17px", this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor, this.pieStrokeColor = this.pieStrokeColor || "black", this.pieStrokeWidth = this.pieStrokeWidth || "2px", this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || "2px", this.pieOuterStrokeColor = this.pieOuterStrokeColor || "black", this.pieOpacity = this.pieOpacity || "0.7", this.quadrant1Fill = this.quadrant1Fill || this.primaryColor, this.quadrant2Fill = this.quadrant2Fill || g(this.primaryColor, { r: 5, g: 5, b: 5 }), this.quadrant3Fill = this.quadrant3Fill || g(this.primaryColor, { r: 10, g: 10, b: 10 }), this.quadrant4Fill = this.quadrant4Fill || g(this.primaryColor, { r: 15, g: 15, b: 15 }), this.quadrant1TextFill = this.quadrant1TextFill || this.primaryTextColor, this.quadrant2TextFill = this.quadrant2TextFill || g(this.primaryTextColor, { r: -5, g: -5, b: -5 }), this.quadrant3TextFill = this.quadrant3TextFill || g(this.primaryTextColor, { r: -10, g: -10, b: -10 }), this.quadrant4TextFill = this.quadrant4TextFill || g(this.primaryTextColor, { r: -15, g: -15, b: -15 }), this.quadrantPointFill = this.quadrantPointFill || ci(this.quadrant1Fill) ? B(this.quadrant1Fill) : L(this.quadrant1Fill), this.quadrantPointTextFill = this.quadrantPointTextFill || this.primaryTextColor, this.quadrantXAxisTextFill = this.quadrantXAxisTextFill || this.primaryTextColor, this.quadrantYAxisTextFill = this.quadrantYAxisTextFill || this.primaryTextColor, this.quadrantInternalBorderStrokeFill = this.quadrantInternalBorderStrokeFill || this.primaryBorderColor, this.quadrantExternalBorderStrokeFill = this.quadrantExternalBorderStrokeFill || this.primaryBorderColor, this.quadrantTitleFill = this.quadrantTitleFill || this.primaryTextColor, this.xyChart = {
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
    }, this.classText = this.primaryTextColor, this.requirementBackground = this.requirementBackground || this.primaryColor, this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor, this.requirementBorderSize = this.requirementBorderSize || "1", this.requirementTextColor = this.requirementTextColor || this.primaryTextColor, this.relationColor = this.relationColor || this.lineColor, this.relationLabelBackground = this.relationLabelBackground || (this.darkMode ? L(this.secondaryColor, 30) : this.secondaryColor), this.relationLabelColor = this.relationLabelColor || this.actorTextColor, this.git0 = B(this.secondaryColor, 20), this.git1 = B(this.pie2 || this.secondaryColor, 20), this.git2 = B(this.pie3 || this.tertiaryColor, 20), this.git3 = B(this.pie4 || g(this.primaryColor, { h: -30 }), 20), this.git4 = B(this.pie5 || g(this.primaryColor, { h: -60 }), 20), this.git5 = B(this.pie6 || g(this.primaryColor, { h: -90 }), 10), this.git6 = B(this.pie7 || g(this.primaryColor, { h: 60 }), 10), this.git7 = B(this.pie8 || g(this.primaryColor, { h: 120 }), 20), this.gitInv0 = this.gitInv0 || _(this.git0), this.gitInv1 = this.gitInv1 || _(this.git1), this.gitInv2 = this.gitInv2 || _(this.git2), this.gitInv3 = this.gitInv3 || _(this.git3), this.gitInv4 = this.gitInv4 || _(this.git4), this.gitInv5 = this.gitInv5 || _(this.git5), this.gitInv6 = this.gitInv6 || _(this.git6), this.gitInv7 = this.gitInv7 || _(this.git7), this.gitBranchLabel0 = this.gitBranchLabel0 || _(this.labelTextColor), this.gitBranchLabel1 = this.gitBranchLabel1 || this.labelTextColor, this.gitBranchLabel2 = this.gitBranchLabel2 || this.labelTextColor, this.gitBranchLabel3 = this.gitBranchLabel3 || _(this.labelTextColor), this.gitBranchLabel4 = this.gitBranchLabel4 || this.labelTextColor, this.gitBranchLabel5 = this.gitBranchLabel5 || this.labelTextColor, this.gitBranchLabel6 = this.gitBranchLabel6 || this.labelTextColor, this.gitBranchLabel7 = this.gitBranchLabel7 || this.labelTextColor, this.tagLabelColor = this.tagLabelColor || this.primaryTextColor, this.tagLabelBackground = this.tagLabelBackground || this.primaryColor, this.tagLabelBorder = this.tagBorder || this.primaryBorderColor, this.tagLabelFontSize = this.tagLabelFontSize || "10px", this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor, this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor, this.commitLabelFontSize = this.commitLabelFontSize || "10px", this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || B(this.background, 12), this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || B(this.background, 2);
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
    this.background = "#f4f4f4", this.primaryColor = "#ECECFF", this.secondaryColor = g(this.primaryColor, { h: 120 }), this.secondaryColor = "#ffffde", this.tertiaryColor = g(this.primaryColor, { h: -160 }), this.primaryBorderColor = lt(this.primaryColor, this.darkMode), this.secondaryBorderColor = lt(this.secondaryColor, this.darkMode), this.tertiaryBorderColor = lt(this.tertiaryColor, this.darkMode), this.primaryTextColor = _(this.primaryColor), this.secondaryTextColor = _(this.secondaryColor), this.tertiaryTextColor = _(this.tertiaryColor), this.lineColor = _(this.background), this.textColor = _(this.background), this.background = "white", this.mainBkg = "#ECECFF", this.secondBkg = "#ffffde", this.lineColor = "#333333", this.border1 = "#9370DB", this.border2 = "#aaaa33", this.arrowheadColor = "#333333", this.fontFamily = '"trebuchet ms", verdana, arial, sans-serif', this.fontSize = "16px", this.labelBackground = "#e8e8e8", this.textColor = "#333", this.THEME_COLOR_LIMIT = 12, this.nodeBkg = "calculated", this.nodeBorder = "calculated", this.clusterBkg = "calculated", this.clusterBorder = "calculated", this.defaultLinkColor = "calculated", this.titleColor = "calculated", this.edgeLabelBackground = "calculated", this.actorBorder = "calculated", this.actorBkg = "calculated", this.actorTextColor = "black", this.actorLineColor = "grey", this.signalColor = "calculated", this.signalTextColor = "calculated", this.labelBoxBkgColor = "calculated", this.labelBoxBorderColor = "calculated", this.labelTextColor = "calculated", this.loopTextColor = "calculated", this.noteBorderColor = "calculated", this.noteBkgColor = "#fff5ad", this.noteTextColor = "calculated", this.activationBorderColor = "#666", this.activationBkgColor = "#f4f4f4", this.sequenceNumberColor = "white", this.sectionBkgColor = "calculated", this.altSectionBkgColor = "calculated", this.sectionBkgColor2 = "calculated", this.excludeBkgColor = "#eeeeee", this.taskBorderColor = "calculated", this.taskBkgColor = "calculated", this.taskTextLightColor = "calculated", this.taskTextColor = this.taskTextLightColor, this.taskTextDarkColor = "calculated", this.taskTextOutsideColor = this.taskTextDarkColor, this.taskTextClickableColor = "calculated", this.activeTaskBorderColor = "calculated", this.activeTaskBkgColor = "calculated", this.gridColor = "calculated", this.doneTaskBkgColor = "calculated", this.doneTaskBorderColor = "calculated", this.critBorderColor = "calculated", this.critBkgColor = "calculated", this.todayLineColor = "calculated", this.sectionBkgColor = Ge(102, 102, 255, 0.49), this.altSectionBkgColor = "white", this.sectionBkgColor2 = "#fff400", this.taskBorderColor = "#534fbc", this.taskBkgColor = "#8a90dd", this.taskTextLightColor = "white", this.taskTextColor = "calculated", this.taskTextDarkColor = "black", this.taskTextOutsideColor = "calculated", this.taskTextClickableColor = "#003163", this.activeTaskBorderColor = "#534fbc", this.activeTaskBkgColor = "#bfc7ff", this.gridColor = "lightgrey", this.doneTaskBkgColor = "lightgrey", this.doneTaskBorderColor = "grey", this.critBorderColor = "#ff8888", this.critBkgColor = "red", this.todayLineColor = "red", this.personBorder = this.primaryBorderColor, this.personBkg = this.mainBkg, this.labelColor = "black", this.errorBkgColor = "#552222", this.errorTextColor = "#552222", this.updateColors();
  }
  updateColors() {
    var e, i, r, n, o, s, a, l, h, u, f;
    this.cScale0 = this.cScale0 || this.primaryColor, this.cScale1 = this.cScale1 || this.secondaryColor, this.cScale2 = this.cScale2 || this.tertiaryColor, this.cScale3 = this.cScale3 || g(this.primaryColor, { h: 30 }), this.cScale4 = this.cScale4 || g(this.primaryColor, { h: 60 }), this.cScale5 = this.cScale5 || g(this.primaryColor, { h: 90 }), this.cScale6 = this.cScale6 || g(this.primaryColor, { h: 120 }), this.cScale7 = this.cScale7 || g(this.primaryColor, { h: 150 }), this.cScale8 = this.cScale8 || g(this.primaryColor, { h: 210 }), this.cScale9 = this.cScale9 || g(this.primaryColor, { h: 270 }), this.cScale10 = this.cScale10 || g(this.primaryColor, { h: 300 }), this.cScale11 = this.cScale11 || g(this.primaryColor, { h: 330 }), this["cScalePeer1"] = this["cScalePeer1"] || L(this.secondaryColor, 45), this["cScalePeer2"] = this["cScalePeer2"] || L(this.tertiaryColor, 40);
    for (let c = 0; c < this.THEME_COLOR_LIMIT; c++)
      this["cScale" + c] = L(this["cScale" + c], 10), this["cScalePeer" + c] = this["cScalePeer" + c] || L(this["cScale" + c], 25);
    for (let c = 0; c < this.THEME_COLOR_LIMIT; c++)
      this["cScaleInv" + c] = this["cScaleInv" + c] || g(this["cScale" + c], { h: 180 });
    for (let c = 0; c < 5; c++)
      this["surface" + c] = this["surface" + c] || g(this.mainBkg, { h: 30, l: -(5 + c * 5) }), this["surfacePeer" + c] = this["surfacePeer" + c] || g(this.mainBkg, { h: 30, l: -(7 + c * 5) });
    if (this.scaleLabelColor = this.scaleLabelColor !== "calculated" && this.scaleLabelColor ? this.scaleLabelColor : this.labelTextColor, this.labelTextColor !== "calculated") {
      this.cScaleLabel0 = this.cScaleLabel0 || _(this.labelTextColor), this.cScaleLabel3 = this.cScaleLabel3 || _(this.labelTextColor);
      for (let c = 0; c < this.THEME_COLOR_LIMIT; c++)
        this["cScaleLabel" + c] = this["cScaleLabel" + c] || this.labelTextColor;
    }
    this.nodeBkg = this.mainBkg, this.nodeBorder = this.border1, this.clusterBkg = this.secondBkg, this.clusterBorder = this.border2, this.defaultLinkColor = this.lineColor, this.titleColor = this.textColor, this.edgeLabelBackground = this.labelBackground, this.actorBorder = B(this.border1, 23), this.actorBkg = this.mainBkg, this.labelBoxBkgColor = this.actorBkg, this.signalColor = this.textColor, this.signalTextColor = this.textColor, this.labelBoxBorderColor = this.actorBorder, this.labelTextColor = this.actorTextColor, this.loopTextColor = this.actorTextColor, this.noteBorderColor = this.border2, this.noteTextColor = this.actorTextColor, this.taskTextColor = this.taskTextLightColor, this.taskTextOutsideColor = this.taskTextDarkColor, this.transitionColor = this.transitionColor || this.lineColor, this.transitionLabelColor = this.transitionLabelColor || this.textColor, this.stateLabelColor = this.stateLabelColor || this.stateBkg || this.primaryTextColor, this.stateBkg = this.stateBkg || this.mainBkg, this.labelBackgroundColor = this.labelBackgroundColor || this.stateBkg, this.compositeBackground = this.compositeBackground || this.background || this.tertiaryColor, this.altBackground = this.altBackground || "#f0f0f0", this.compositeTitleBackground = this.compositeTitleBackground || this.mainBkg, this.compositeBorder = this.compositeBorder || this.nodeBorder, this.innerEndBackground = this.nodeBorder, this.specialStateColor = this.lineColor, this.errorBkgColor = this.errorBkgColor || this.tertiaryColor, this.errorTextColor = this.errorTextColor || this.tertiaryTextColor, this.transitionColor = this.transitionColor || this.lineColor, this.classText = this.primaryTextColor, this.fillType0 = this.primaryColor, this.fillType1 = this.secondaryColor, this.fillType2 = g(this.primaryColor, { h: 64 }), this.fillType3 = g(this.secondaryColor, { h: 64 }), this.fillType4 = g(this.primaryColor, { h: -64 }), this.fillType5 = g(this.secondaryColor, { h: -64 }), this.fillType6 = g(this.primaryColor, { h: 128 }), this.fillType7 = g(this.secondaryColor, { h: 128 }), this.pie1 = this.pie1 || this.primaryColor, this.pie2 = this.pie2 || this.secondaryColor, this.pie3 = this.pie3 || g(this.tertiaryColor, { l: -40 }), this.pie4 = this.pie4 || g(this.primaryColor, { l: -10 }), this.pie5 = this.pie5 || g(this.secondaryColor, { l: -30 }), this.pie6 = this.pie6 || g(this.tertiaryColor, { l: -20 }), this.pie7 = this.pie7 || g(this.primaryColor, { h: 60, l: -20 }), this.pie8 = this.pie8 || g(this.primaryColor, { h: -60, l: -40 }), this.pie9 = this.pie9 || g(this.primaryColor, { h: 120, l: -40 }), this.pie10 = this.pie10 || g(this.primaryColor, { h: 60, l: -40 }), this.pie11 = this.pie11 || g(this.primaryColor, { h: -90, l: -40 }), this.pie12 = this.pie12 || g(this.primaryColor, { h: 120, l: -30 }), this.pieTitleTextSize = this.pieTitleTextSize || "25px", this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor, this.pieSectionTextSize = this.pieSectionTextSize || "17px", this.pieSectionTextColor = this.pieSectionTextColor || this.textColor, this.pieLegendTextSize = this.pieLegendTextSize || "17px", this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor, this.pieStrokeColor = this.pieStrokeColor || "black", this.pieStrokeWidth = this.pieStrokeWidth || "2px", this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || "2px", this.pieOuterStrokeColor = this.pieOuterStrokeColor || "black", this.pieOpacity = this.pieOpacity || "0.7", this.quadrant1Fill = this.quadrant1Fill || this.primaryColor, this.quadrant2Fill = this.quadrant2Fill || g(this.primaryColor, { r: 5, g: 5, b: 5 }), this.quadrant3Fill = this.quadrant3Fill || g(this.primaryColor, { r: 10, g: 10, b: 10 }), this.quadrant4Fill = this.quadrant4Fill || g(this.primaryColor, { r: 15, g: 15, b: 15 }), this.quadrant1TextFill = this.quadrant1TextFill || this.primaryTextColor, this.quadrant2TextFill = this.quadrant2TextFill || g(this.primaryTextColor, { r: -5, g: -5, b: -5 }), this.quadrant3TextFill = this.quadrant3TextFill || g(this.primaryTextColor, { r: -10, g: -10, b: -10 }), this.quadrant4TextFill = this.quadrant4TextFill || g(this.primaryTextColor, { r: -15, g: -15, b: -15 }), this.quadrantPointFill = this.quadrantPointFill || ci(this.quadrant1Fill) ? B(this.quadrant1Fill) : L(this.quadrant1Fill), this.quadrantPointTextFill = this.quadrantPointTextFill || this.primaryTextColor, this.quadrantXAxisTextFill = this.quadrantXAxisTextFill || this.primaryTextColor, this.quadrantYAxisTextFill = this.quadrantYAxisTextFill || this.primaryTextColor, this.quadrantInternalBorderStrokeFill = this.quadrantInternalBorderStrokeFill || this.primaryBorderColor, this.quadrantExternalBorderStrokeFill = this.quadrantExternalBorderStrokeFill || this.primaryBorderColor, this.quadrantTitleFill = this.quadrantTitleFill || this.primaryTextColor, this.xyChart = {
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
    }, this.requirementBackground = this.requirementBackground || this.primaryColor, this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor, this.requirementBorderSize = this.requirementBorderSize || "1", this.requirementTextColor = this.requirementTextColor || this.primaryTextColor, this.relationColor = this.relationColor || this.lineColor, this.relationLabelBackground = this.relationLabelBackground || this.labelBackground, this.relationLabelColor = this.relationLabelColor || this.actorTextColor, this.git0 = this.git0 || this.primaryColor, this.git1 = this.git1 || this.secondaryColor, this.git2 = this.git2 || this.tertiaryColor, this.git3 = this.git3 || g(this.primaryColor, { h: -30 }), this.git4 = this.git4 || g(this.primaryColor, { h: -60 }), this.git5 = this.git5 || g(this.primaryColor, { h: -90 }), this.git6 = this.git6 || g(this.primaryColor, { h: 60 }), this.git7 = this.git7 || g(this.primaryColor, { h: 120 }), this.darkMode ? (this.git0 = B(this.git0, 25), this.git1 = B(this.git1, 25), this.git2 = B(this.git2, 25), this.git3 = B(this.git3, 25), this.git4 = B(this.git4, 25), this.git5 = B(this.git5, 25), this.git6 = B(this.git6, 25), this.git7 = B(this.git7, 25)) : (this.git0 = L(this.git0, 25), this.git1 = L(this.git1, 25), this.git2 = L(this.git2, 25), this.git3 = L(this.git3, 25), this.git4 = L(this.git4, 25), this.git5 = L(this.git5, 25), this.git6 = L(this.git6, 25), this.git7 = L(this.git7, 25)), this.gitInv0 = this.gitInv0 || L(_(this.git0), 25), this.gitInv1 = this.gitInv1 || _(this.git1), this.gitInv2 = this.gitInv2 || _(this.git2), this.gitInv3 = this.gitInv3 || _(this.git3), this.gitInv4 = this.gitInv4 || _(this.git4), this.gitInv5 = this.gitInv5 || _(this.git5), this.gitInv6 = this.gitInv6 || _(this.git6), this.gitInv7 = this.gitInv7 || _(this.git7), this.gitBranchLabel0 = this.gitBranchLabel0 || _(this.labelTextColor), this.gitBranchLabel1 = this.gitBranchLabel1 || this.labelTextColor, this.gitBranchLabel2 = this.gitBranchLabel2 || this.labelTextColor, this.gitBranchLabel3 = this.gitBranchLabel3 || _(this.labelTextColor), this.gitBranchLabel4 = this.gitBranchLabel4 || this.labelTextColor, this.gitBranchLabel5 = this.gitBranchLabel5 || this.labelTextColor, this.gitBranchLabel6 = this.gitBranchLabel6 || this.labelTextColor, this.gitBranchLabel7 = this.gitBranchLabel7 || this.labelTextColor, this.tagLabelColor = this.tagLabelColor || this.primaryTextColor, this.tagLabelBackground = this.tagLabelBackground || this.primaryColor, this.tagLabelBorder = this.tagBorder || this.primaryBorderColor, this.tagLabelFontSize = this.tagLabelFontSize || "10px", this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor, this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor, this.commitLabelFontSize = this.commitLabelFontSize || "10px", this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || pr, this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || gr;
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
    this.background = "#f4f4f4", this.primaryColor = "#cde498", this.secondaryColor = "#cdffb2", this.background = "white", this.mainBkg = "#cde498", this.secondBkg = "#cdffb2", this.lineColor = "green", this.border1 = "#13540c", this.border2 = "#6eaa49", this.arrowheadColor = "green", this.fontFamily = '"trebuchet ms", verdana, arial, sans-serif', this.fontSize = "16px", this.tertiaryColor = B("#cde498", 10), this.primaryBorderColor = lt(this.primaryColor, this.darkMode), this.secondaryBorderColor = lt(this.secondaryColor, this.darkMode), this.tertiaryBorderColor = lt(this.tertiaryColor, this.darkMode), this.primaryTextColor = _(this.primaryColor), this.secondaryTextColor = _(this.secondaryColor), this.tertiaryTextColor = _(this.primaryColor), this.lineColor = _(this.background), this.textColor = _(this.background), this.THEME_COLOR_LIMIT = 12, this.nodeBkg = "calculated", this.nodeBorder = "calculated", this.clusterBkg = "calculated", this.clusterBorder = "calculated", this.defaultLinkColor = "calculated", this.titleColor = "#333", this.edgeLabelBackground = "#e8e8e8", this.actorBorder = "calculated", this.actorBkg = "calculated", this.actorTextColor = "black", this.actorLineColor = "grey", this.signalColor = "#333", this.signalTextColor = "#333", this.labelBoxBkgColor = "calculated", this.labelBoxBorderColor = "#326932", this.labelTextColor = "calculated", this.loopTextColor = "calculated", this.noteBorderColor = "calculated", this.noteBkgColor = "#fff5ad", this.noteTextColor = "calculated", this.activationBorderColor = "#666", this.activationBkgColor = "#f4f4f4", this.sequenceNumberColor = "white", this.sectionBkgColor = "#6eaa49", this.altSectionBkgColor = "white", this.sectionBkgColor2 = "#6eaa49", this.excludeBkgColor = "#eeeeee", this.taskBorderColor = "calculated", this.taskBkgColor = "#487e3a", this.taskTextLightColor = "white", this.taskTextColor = "calculated", this.taskTextDarkColor = "black", this.taskTextOutsideColor = "calculated", this.taskTextClickableColor = "#003163", this.activeTaskBorderColor = "calculated", this.activeTaskBkgColor = "calculated", this.gridColor = "lightgrey", this.doneTaskBkgColor = "lightgrey", this.doneTaskBorderColor = "grey", this.critBorderColor = "#ff8888", this.critBkgColor = "red", this.todayLineColor = "red", this.personBorder = this.primaryBorderColor, this.personBkg = this.mainBkg, this.labelColor = "black", this.errorBkgColor = "#552222", this.errorTextColor = "#552222";
  }
  updateColors() {
    var e, i, r, n, o, s, a, l, h, u, f;
    this.actorBorder = L(this.mainBkg, 20), this.actorBkg = this.mainBkg, this.labelBoxBkgColor = this.actorBkg, this.labelTextColor = this.actorTextColor, this.loopTextColor = this.actorTextColor, this.noteBorderColor = this.border2, this.noteTextColor = this.actorTextColor, this.cScale0 = this.cScale0 || this.primaryColor, this.cScale1 = this.cScale1 || this.secondaryColor, this.cScale2 = this.cScale2 || this.tertiaryColor, this.cScale3 = this.cScale3 || g(this.primaryColor, { h: 30 }), this.cScale4 = this.cScale4 || g(this.primaryColor, { h: 60 }), this.cScale5 = this.cScale5 || g(this.primaryColor, { h: 90 }), this.cScale6 = this.cScale6 || g(this.primaryColor, { h: 120 }), this.cScale7 = this.cScale7 || g(this.primaryColor, { h: 150 }), this.cScale8 = this.cScale8 || g(this.primaryColor, { h: 210 }), this.cScale9 = this.cScale9 || g(this.primaryColor, { h: 270 }), this.cScale10 = this.cScale10 || g(this.primaryColor, { h: 300 }), this.cScale11 = this.cScale11 || g(this.primaryColor, { h: 330 }), this["cScalePeer1"] = this["cScalePeer1"] || L(this.secondaryColor, 45), this["cScalePeer2"] = this["cScalePeer2"] || L(this.tertiaryColor, 40);
    for (let c = 0; c < this.THEME_COLOR_LIMIT; c++)
      this["cScale" + c] = L(this["cScale" + c], 10), this["cScalePeer" + c] = this["cScalePeer" + c] || L(this["cScale" + c], 25);
    for (let c = 0; c < this.THEME_COLOR_LIMIT; c++)
      this["cScaleInv" + c] = this["cScaleInv" + c] || g(this["cScale" + c], { h: 180 });
    this.scaleLabelColor = this.scaleLabelColor !== "calculated" && this.scaleLabelColor ? this.scaleLabelColor : this.labelTextColor;
    for (let c = 0; c < this.THEME_COLOR_LIMIT; c++)
      this["cScaleLabel" + c] = this["cScaleLabel" + c] || this.scaleLabelColor;
    for (let c = 0; c < 5; c++)
      this["surface" + c] = this["surface" + c] || g(this.mainBkg, { h: 30, s: -30, l: -(5 + c * 5) }), this["surfacePeer" + c] = this["surfacePeer" + c] || g(this.mainBkg, { h: 30, s: -30, l: -(8 + c * 5) });
    this.nodeBkg = this.mainBkg, this.nodeBorder = this.border1, this.clusterBkg = this.secondBkg, this.clusterBorder = this.border2, this.defaultLinkColor = this.lineColor, this.taskBorderColor = this.border1, this.taskTextColor = this.taskTextLightColor, this.taskTextOutsideColor = this.taskTextDarkColor, this.activeTaskBorderColor = this.taskBorderColor, this.activeTaskBkgColor = this.mainBkg, this.transitionColor = this.transitionColor || this.lineColor, this.transitionLabelColor = this.transitionLabelColor || this.textColor, this.stateLabelColor = this.stateLabelColor || this.stateBkg || this.primaryTextColor, this.stateBkg = this.stateBkg || this.mainBkg, this.labelBackgroundColor = this.labelBackgroundColor || this.stateBkg, this.compositeBackground = this.compositeBackground || this.background || this.tertiaryColor, this.altBackground = this.altBackground || "#f0f0f0", this.compositeTitleBackground = this.compositeTitleBackground || this.mainBkg, this.compositeBorder = this.compositeBorder || this.nodeBorder, this.innerEndBackground = this.primaryBorderColor, this.specialStateColor = this.lineColor, this.errorBkgColor = this.errorBkgColor || this.tertiaryColor, this.errorTextColor = this.errorTextColor || this.tertiaryTextColor, this.transitionColor = this.transitionColor || this.lineColor, this.classText = this.primaryTextColor, this.fillType0 = this.primaryColor, this.fillType1 = this.secondaryColor, this.fillType2 = g(this.primaryColor, { h: 64 }), this.fillType3 = g(this.secondaryColor, { h: 64 }), this.fillType4 = g(this.primaryColor, { h: -64 }), this.fillType5 = g(this.secondaryColor, { h: -64 }), this.fillType6 = g(this.primaryColor, { h: 128 }), this.fillType7 = g(this.secondaryColor, { h: 128 }), this.pie1 = this.pie1 || this.primaryColor, this.pie2 = this.pie2 || this.secondaryColor, this.pie3 = this.pie3 || this.tertiaryColor, this.pie4 = this.pie4 || g(this.primaryColor, { l: -30 }), this.pie5 = this.pie5 || g(this.secondaryColor, { l: -30 }), this.pie6 = this.pie6 || g(this.tertiaryColor, { h: 40, l: -40 }), this.pie7 = this.pie7 || g(this.primaryColor, { h: 60, l: -10 }), this.pie8 = this.pie8 || g(this.primaryColor, { h: -60, l: -10 }), this.pie9 = this.pie9 || g(this.primaryColor, { h: 120, l: 0 }), this.pie10 = this.pie10 || g(this.primaryColor, { h: 60, l: -50 }), this.pie11 = this.pie11 || g(this.primaryColor, { h: -60, l: -50 }), this.pie12 = this.pie12 || g(this.primaryColor, { h: 120, l: -50 }), this.pieTitleTextSize = this.pieTitleTextSize || "25px", this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor, this.pieSectionTextSize = this.pieSectionTextSize || "17px", this.pieSectionTextColor = this.pieSectionTextColor || this.textColor, this.pieLegendTextSize = this.pieLegendTextSize || "17px", this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor, this.pieStrokeColor = this.pieStrokeColor || "black", this.pieStrokeWidth = this.pieStrokeWidth || "2px", this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || "2px", this.pieOuterStrokeColor = this.pieOuterStrokeColor || "black", this.pieOpacity = this.pieOpacity || "0.7", this.quadrant1Fill = this.quadrant1Fill || this.primaryColor, this.quadrant2Fill = this.quadrant2Fill || g(this.primaryColor, { r: 5, g: 5, b: 5 }), this.quadrant3Fill = this.quadrant3Fill || g(this.primaryColor, { r: 10, g: 10, b: 10 }), this.quadrant4Fill = this.quadrant4Fill || g(this.primaryColor, { r: 15, g: 15, b: 15 }), this.quadrant1TextFill = this.quadrant1TextFill || this.primaryTextColor, this.quadrant2TextFill = this.quadrant2TextFill || g(this.primaryTextColor, { r: -5, g: -5, b: -5 }), this.quadrant3TextFill = this.quadrant3TextFill || g(this.primaryTextColor, { r: -10, g: -10, b: -10 }), this.quadrant4TextFill = this.quadrant4TextFill || g(this.primaryTextColor, { r: -15, g: -15, b: -15 }), this.quadrantPointFill = this.quadrantPointFill || ci(this.quadrant1Fill) ? B(this.quadrant1Fill) : L(this.quadrant1Fill), this.quadrantPointTextFill = this.quadrantPointTextFill || this.primaryTextColor, this.quadrantXAxisTextFill = this.quadrantXAxisTextFill || this.primaryTextColor, this.quadrantYAxisTextFill = this.quadrantYAxisTextFill || this.primaryTextColor, this.quadrantInternalBorderStrokeFill = this.quadrantInternalBorderStrokeFill || this.primaryBorderColor, this.quadrantExternalBorderStrokeFill = this.quadrantExternalBorderStrokeFill || this.primaryBorderColor, this.quadrantTitleFill = this.quadrantTitleFill || this.primaryTextColor, this.xyChart = {
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
    }, this.requirementBackground = this.requirementBackground || this.primaryColor, this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor, this.requirementBorderSize = this.requirementBorderSize || "1", this.requirementTextColor = this.requirementTextColor || this.primaryTextColor, this.relationColor = this.relationColor || this.lineColor, this.relationLabelBackground = this.relationLabelBackground || this.edgeLabelBackground, this.relationLabelColor = this.relationLabelColor || this.actorTextColor, this.git0 = this.git0 || this.primaryColor, this.git1 = this.git1 || this.secondaryColor, this.git2 = this.git2 || this.tertiaryColor, this.git3 = this.git3 || g(this.primaryColor, { h: -30 }), this.git4 = this.git4 || g(this.primaryColor, { h: -60 }), this.git5 = this.git5 || g(this.primaryColor, { h: -90 }), this.git6 = this.git6 || g(this.primaryColor, { h: 60 }), this.git7 = this.git7 || g(this.primaryColor, { h: 120 }), this.darkMode ? (this.git0 = B(this.git0, 25), this.git1 = B(this.git1, 25), this.git2 = B(this.git2, 25), this.git3 = B(this.git3, 25), this.git4 = B(this.git4, 25), this.git5 = B(this.git5, 25), this.git6 = B(this.git6, 25), this.git7 = B(this.git7, 25)) : (this.git0 = L(this.git0, 25), this.git1 = L(this.git1, 25), this.git2 = L(this.git2, 25), this.git3 = L(this.git3, 25), this.git4 = L(this.git4, 25), this.git5 = L(this.git5, 25), this.git6 = L(this.git6, 25), this.git7 = L(this.git7, 25)), this.gitInv0 = this.gitInv0 || _(this.git0), this.gitInv1 = this.gitInv1 || _(this.git1), this.gitInv2 = this.gitInv2 || _(this.git2), this.gitInv3 = this.gitInv3 || _(this.git3), this.gitInv4 = this.gitInv4 || _(this.git4), this.gitInv5 = this.gitInv5 || _(this.git5), this.gitInv6 = this.gitInv6 || _(this.git6), this.gitInv7 = this.gitInv7 || _(this.git7), this.gitBranchLabel0 = this.gitBranchLabel0 || _(this.labelTextColor), this.gitBranchLabel1 = this.gitBranchLabel1 || this.labelTextColor, this.gitBranchLabel2 = this.gitBranchLabel2 || this.labelTextColor, this.gitBranchLabel3 = this.gitBranchLabel3 || _(this.labelTextColor), this.gitBranchLabel4 = this.gitBranchLabel4 || this.labelTextColor, this.gitBranchLabel5 = this.gitBranchLabel5 || this.labelTextColor, this.gitBranchLabel6 = this.gitBranchLabel6 || this.labelTextColor, this.gitBranchLabel7 = this.gitBranchLabel7 || this.labelTextColor, this.tagLabelColor = this.tagLabelColor || this.primaryTextColor, this.tagLabelBackground = this.tagLabelBackground || this.primaryColor, this.tagLabelBorder = this.tagBorder || this.primaryBorderColor, this.tagLabelFontSize = this.tagLabelFontSize || "10px", this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor, this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor, this.commitLabelFontSize = this.commitLabelFontSize || "10px", this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || pr, this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || gr;
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
class fp {
  constructor() {
    this.primaryColor = "#eee", this.contrast = "#707070", this.secondaryColor = B(this.contrast, 55), this.background = "#ffffff", this.tertiaryColor = g(this.primaryColor, { h: -160 }), this.primaryBorderColor = lt(this.primaryColor, this.darkMode), this.secondaryBorderColor = lt(this.secondaryColor, this.darkMode), this.tertiaryBorderColor = lt(this.tertiaryColor, this.darkMode), this.primaryTextColor = _(this.primaryColor), this.secondaryTextColor = _(this.secondaryColor), this.tertiaryTextColor = _(this.tertiaryColor), this.lineColor = _(this.background), this.textColor = _(this.background), this.mainBkg = "#eee", this.secondBkg = "calculated", this.lineColor = "#666", this.border1 = "#999", this.border2 = "calculated", this.note = "#ffa", this.text = "#333", this.critical = "#d42", this.done = "#bbb", this.arrowheadColor = "#333333", this.fontFamily = '"trebuchet ms", verdana, arial, sans-serif', this.fontSize = "16px", this.THEME_COLOR_LIMIT = 12, this.nodeBkg = "calculated", this.nodeBorder = "calculated", this.clusterBkg = "calculated", this.clusterBorder = "calculated", this.defaultLinkColor = "calculated", this.titleColor = "calculated", this.edgeLabelBackground = "white", this.actorBorder = "calculated", this.actorBkg = "calculated", this.actorTextColor = "calculated", this.actorLineColor = "calculated", this.signalColor = "calculated", this.signalTextColor = "calculated", this.labelBoxBkgColor = "calculated", this.labelBoxBorderColor = "calculated", this.labelTextColor = "calculated", this.loopTextColor = "calculated", this.noteBorderColor = "calculated", this.noteBkgColor = "calculated", this.noteTextColor = "calculated", this.activationBorderColor = "#666", this.activationBkgColor = "#f4f4f4", this.sequenceNumberColor = "white", this.sectionBkgColor = "calculated", this.altSectionBkgColor = "white", this.sectionBkgColor2 = "calculated", this.excludeBkgColor = "#eeeeee", this.taskBorderColor = "calculated", this.taskBkgColor = "calculated", this.taskTextLightColor = "white", this.taskTextColor = "calculated", this.taskTextDarkColor = "calculated", this.taskTextOutsideColor = "calculated", this.taskTextClickableColor = "#003163", this.activeTaskBorderColor = "calculated", this.activeTaskBkgColor = "calculated", this.gridColor = "calculated", this.doneTaskBkgColor = "calculated", this.doneTaskBorderColor = "calculated", this.critBkgColor = "calculated", this.critBorderColor = "calculated", this.todayLineColor = "calculated", this.personBorder = this.primaryBorderColor, this.personBkg = this.mainBkg, this.labelColor = "black", this.errorBkgColor = "#552222", this.errorTextColor = "#552222";
  }
  updateColors() {
    var e, i, r, n, o, s, a, l, h, u, f;
    this.secondBkg = B(this.contrast, 55), this.border2 = this.contrast, this.actorBorder = B(this.border1, 23), this.actorBkg = this.mainBkg, this.actorTextColor = this.text, this.actorLineColor = this.lineColor, this.signalColor = this.text, this.signalTextColor = this.text, this.labelBoxBkgColor = this.actorBkg, this.labelBoxBorderColor = this.actorBorder, this.labelTextColor = this.text, this.loopTextColor = this.text, this.noteBorderColor = "#999", this.noteBkgColor = "#666", this.noteTextColor = "#fff", this.cScale0 = this.cScale0 || "#555", this.cScale1 = this.cScale1 || "#F4F4F4", this.cScale2 = this.cScale2 || "#555", this.cScale3 = this.cScale3 || "#BBB", this.cScale4 = this.cScale4 || "#777", this.cScale5 = this.cScale5 || "#999", this.cScale6 = this.cScale6 || "#DDD", this.cScale7 = this.cScale7 || "#FFF", this.cScale8 = this.cScale8 || "#DDD", this.cScale9 = this.cScale9 || "#BBB", this.cScale10 = this.cScale10 || "#999", this.cScale11 = this.cScale11 || "#777";
    for (let c = 0; c < this.THEME_COLOR_LIMIT; c++)
      this["cScaleInv" + c] = this["cScaleInv" + c] || _(this["cScale" + c]);
    for (let c = 0; c < this.THEME_COLOR_LIMIT; c++)
      this.darkMode ? this["cScalePeer" + c] = this["cScalePeer" + c] || B(this["cScale" + c], 10) : this["cScalePeer" + c] = this["cScalePeer" + c] || L(this["cScale" + c], 10);
    this.scaleLabelColor = this.scaleLabelColor || (this.darkMode ? "black" : this.labelTextColor), this.cScaleLabel0 = this.cScaleLabel0 || this.cScale1, this.cScaleLabel2 = this.cScaleLabel2 || this.cScale1;
    for (let c = 0; c < this.THEME_COLOR_LIMIT; c++)
      this["cScaleLabel" + c] = this["cScaleLabel" + c] || this.scaleLabelColor;
    for (let c = 0; c < 5; c++)
      this["surface" + c] = this["surface" + c] || g(this.mainBkg, { l: -(5 + c * 5) }), this["surfacePeer" + c] = this["surfacePeer" + c] || g(this.mainBkg, { l: -(8 + c * 5) });
    this.nodeBkg = this.mainBkg, this.nodeBorder = this.border1, this.clusterBkg = this.secondBkg, this.clusterBorder = this.border2, this.defaultLinkColor = this.lineColor, this.titleColor = this.text, this.sectionBkgColor = B(this.contrast, 30), this.sectionBkgColor2 = B(this.contrast, 30), this.taskBorderColor = L(this.contrast, 10), this.taskBkgColor = this.contrast, this.taskTextColor = this.taskTextLightColor, this.taskTextDarkColor = this.text, this.taskTextOutsideColor = this.taskTextDarkColor, this.activeTaskBorderColor = this.taskBorderColor, this.activeTaskBkgColor = this.mainBkg, this.gridColor = B(this.border1, 30), this.doneTaskBkgColor = this.done, this.doneTaskBorderColor = this.lineColor, this.critBkgColor = this.critical, this.critBorderColor = L(this.critBkgColor, 10), this.todayLineColor = this.critBkgColor, this.transitionColor = this.transitionColor || "#000", this.transitionLabelColor = this.transitionLabelColor || this.textColor, this.stateLabelColor = this.stateLabelColor || this.stateBkg || this.primaryTextColor, this.stateBkg = this.stateBkg || this.mainBkg, this.labelBackgroundColor = this.labelBackgroundColor || this.stateBkg, this.compositeBackground = this.compositeBackground || this.background || this.tertiaryColor, this.altBackground = this.altBackground || "#f4f4f4", this.compositeTitleBackground = this.compositeTitleBackground || this.mainBkg, this.stateBorder = this.stateBorder || "#000", this.innerEndBackground = this.primaryBorderColor, this.specialStateColor = "#222", this.errorBkgColor = this.errorBkgColor || this.tertiaryColor, this.errorTextColor = this.errorTextColor || this.tertiaryTextColor, this.classText = this.primaryTextColor, this.fillType0 = this.primaryColor, this.fillType1 = this.secondaryColor, this.fillType2 = g(this.primaryColor, { h: 64 }), this.fillType3 = g(this.secondaryColor, { h: 64 }), this.fillType4 = g(this.primaryColor, { h: -64 }), this.fillType5 = g(this.secondaryColor, { h: -64 }), this.fillType6 = g(this.primaryColor, { h: 128 }), this.fillType7 = g(this.secondaryColor, { h: 128 });
    for (let c = 0; c < this.THEME_COLOR_LIMIT; c++)
      this["pie" + c] = this["cScale" + c];
    this.pie12 = this.pie0, this.pieTitleTextSize = this.pieTitleTextSize || "25px", this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor, this.pieSectionTextSize = this.pieSectionTextSize || "17px", this.pieSectionTextColor = this.pieSectionTextColor || this.textColor, this.pieLegendTextSize = this.pieLegendTextSize || "17px", this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor, this.pieStrokeColor = this.pieStrokeColor || "black", this.pieStrokeWidth = this.pieStrokeWidth || "2px", this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || "2px", this.pieOuterStrokeColor = this.pieOuterStrokeColor || "black", this.pieOpacity = this.pieOpacity || "0.7", this.quadrant1Fill = this.quadrant1Fill || this.primaryColor, this.quadrant2Fill = this.quadrant2Fill || g(this.primaryColor, { r: 5, g: 5, b: 5 }), this.quadrant3Fill = this.quadrant3Fill || g(this.primaryColor, { r: 10, g: 10, b: 10 }), this.quadrant4Fill = this.quadrant4Fill || g(this.primaryColor, { r: 15, g: 15, b: 15 }), this.quadrant1TextFill = this.quadrant1TextFill || this.primaryTextColor, this.quadrant2TextFill = this.quadrant2TextFill || g(this.primaryTextColor, { r: -5, g: -5, b: -5 }), this.quadrant3TextFill = this.quadrant3TextFill || g(this.primaryTextColor, { r: -10, g: -10, b: -10 }), this.quadrant4TextFill = this.quadrant4TextFill || g(this.primaryTextColor, { r: -15, g: -15, b: -15 }), this.quadrantPointFill = this.quadrantPointFill || ci(this.quadrant1Fill) ? B(this.quadrant1Fill) : L(this.quadrant1Fill), this.quadrantPointTextFill = this.quadrantPointTextFill || this.primaryTextColor, this.quadrantXAxisTextFill = this.quadrantXAxisTextFill || this.primaryTextColor, this.quadrantYAxisTextFill = this.quadrantYAxisTextFill || this.primaryTextColor, this.quadrantInternalBorderStrokeFill = this.quadrantInternalBorderStrokeFill || this.primaryBorderColor, this.quadrantExternalBorderStrokeFill = this.quadrantExternalBorderStrokeFill || this.primaryBorderColor, this.quadrantTitleFill = this.quadrantTitleFill || this.primaryTextColor, this.xyChart = {
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
    }, this.requirementBackground = this.requirementBackground || this.primaryColor, this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor, this.requirementBorderSize = this.requirementBorderSize || "1", this.requirementTextColor = this.requirementTextColor || this.primaryTextColor, this.relationColor = this.relationColor || this.lineColor, this.relationLabelBackground = this.relationLabelBackground || this.edgeLabelBackground, this.relationLabelColor = this.relationLabelColor || this.actorTextColor, this.git0 = L(this.pie1, 25) || this.primaryColor, this.git1 = this.pie2 || this.secondaryColor, this.git2 = this.pie3 || this.tertiaryColor, this.git3 = this.pie4 || g(this.primaryColor, { h: -30 }), this.git4 = this.pie5 || g(this.primaryColor, { h: -60 }), this.git5 = this.pie6 || g(this.primaryColor, { h: -90 }), this.git6 = this.pie7 || g(this.primaryColor, { h: 60 }), this.git7 = this.pie8 || g(this.primaryColor, { h: 120 }), this.gitInv0 = this.gitInv0 || _(this.git0), this.gitInv1 = this.gitInv1 || _(this.git1), this.gitInv2 = this.gitInv2 || _(this.git2), this.gitInv3 = this.gitInv3 || _(this.git3), this.gitInv4 = this.gitInv4 || _(this.git4), this.gitInv5 = this.gitInv5 || _(this.git5), this.gitInv6 = this.gitInv6 || _(this.git6), this.gitInv7 = this.gitInv7 || _(this.git7), this.branchLabelColor = this.branchLabelColor || this.labelTextColor, this.gitBranchLabel0 = this.branchLabelColor, this.gitBranchLabel1 = "white", this.gitBranchLabel2 = this.branchLabelColor, this.gitBranchLabel3 = "white", this.gitBranchLabel4 = this.branchLabelColor, this.gitBranchLabel5 = this.branchLabelColor, this.gitBranchLabel6 = this.branchLabelColor, this.gitBranchLabel7 = this.branchLabelColor, this.tagLabelColor = this.tagLabelColor || this.primaryTextColor, this.tagLabelBackground = this.tagLabelBackground || this.primaryColor, this.tagLabelBorder = this.tagBorder || this.primaryBorderColor, this.tagLabelFontSize = this.tagLabelFontSize || "10px", this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor, this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor, this.commitLabelFontSize = this.commitLabelFontSize || "10px", this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || pr, this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || gr;
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
const dp = (t) => {
  const e = new fp();
  return e.calculate(t), e;
}, Yt = {
  base: {
    getThemeVariables: op
  },
  dark: {
    getThemeVariables: ap
  },
  default: {
    getThemeVariables: hp
  },
  forest: {
    getThemeVariables: up
  },
  neutral: {
    getThemeVariables: dp
  }
}, jt = {
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
}, Fa = {
  ...jt,
  // Set, even though they're `undefined` so that `configKeys` finds these keys
  // TODO: Should we replace these with `null` so that they can go in the JSON Schema?
  deterministicIDSeed: void 0,
  themeCSS: void 0,
  // add non-JSON default config values
  themeVariables: Yt.default.getThemeVariables(),
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
}, Aa = (t, e = "") => Object.keys(t).reduce((i, r) => Array.isArray(t[r]) ? i : typeof t[r] == "object" && t[r] !== null ? [...i, e + r, ...Aa(t[r], "")] : [...i, e + r], []), pp = new Set(Aa(Fa, "")), gp = Fa, Vi = (t) => {
  if (A.debug("sanitizeDirective called with", t), !(typeof t != "object" || t == null)) {
    if (Array.isArray(t)) {
      t.forEach((e) => Vi(e));
      return;
    }
    for (const e of Object.keys(t)) {
      if (A.debug("Checking key", e), e.startsWith("__") || e.includes("proto") || e.includes("constr") || !pp.has(e) || t[e] == null) {
        A.debug("sanitize deleting key: ", e), delete t[e];
        continue;
      }
      if (typeof t[e] == "object") {
        A.debug("sanitizing object", e), Vi(t[e]);
        continue;
      }
      const i = ["themeCSS", "fontFamily", "altFontFamily"];
      for (const r of i)
        e.includes(r) && (A.debug("sanitizing css option", e), t[e] = mp(t[e]));
    }
    if (t.themeVariables)
      for (const e of Object.keys(t.themeVariables)) {
        const i = t.themeVariables[e];
        i != null && i.match && !i.match(/^[\d "#%(),.;A-Za-z]+$/) && (t.themeVariables[e] = "");
      }
    A.debug("After sanitization", t);
  }
}, mp = (t) => {
  let e = 0, i = 0;
  for (const r of t) {
    if (e < i)
      return "{ /* ERROR: Unbalanced CSS */ }";
    r === "{" ? e++ : r === "}" && i++;
  }
  return e !== i ? "{ /* ERROR: Unbalanced CSS */ }" : t;
}, La = /^-{3}\s*[\n\r](.*?)[\n\r]-{3}\s*[\n\r]+/s, Ve = /%{2}{\s*(?:(\w+)\s*:|(\w+))\s*(?:(\w+)|((?:(?!}%{2}).|\r?\n)*))?\s*(?:}%{2})?/gi, yp = /\s*%%.*\n/gm;
class Ea extends Error {
  constructor(e) {
    super(e), this.name = "UnknownDiagramError";
  }
}
const Le = {}, mr = function(t, e) {
  t = t.replace(La, "").replace(Ve, "").replace(yp, `
`);
  for (const [i, { detector: r }] of Object.entries(Le))
    if (r(t, e))
      return i;
  throw new Ea(
    `No diagram type detected matching given configuration for text: ${t}`
  );
}, Ma = (...t) => {
  for (const { id: e, detector: i, loader: r } of t)
    Oa(e, i, r);
}, Oa = (t, e, i) => {
  Le[t] ? A.error(`Detector with key ${t} already exists`) : Le[t] = { detector: e, loader: i }, A.debug(`Detector with key ${t} added${i ? " with loader" : ""}`);
}, _p = (t) => Le[t].loader, ln = (t, e, { depth: i = 2, clobber: r = !1 } = {}) => {
  const n = { depth: i, clobber: r };
  return Array.isArray(e) && !Array.isArray(t) ? (e.forEach((o) => ln(t, o, n)), t) : Array.isArray(e) && Array.isArray(t) ? (e.forEach((o) => {
    t.includes(o) || t.push(o);
  }), t) : t === void 0 || i <= 0 ? t != null && typeof t == "object" && typeof e == "object" ? Object.assign(t, e) : e : (e !== void 0 && typeof t == "object" && typeof e == "object" && Object.keys(e).forEach((o) => {
    typeof e[o] == "object" && (t[o] === void 0 || typeof t[o] == "object") ? (t[o] === void 0 && (t[o] = Array.isArray(e[o]) ? [] : {}), t[o] = ln(t[o], e[o], { depth: i - 1, clobber: r })) : (r || typeof t[o] != "object" && typeof e[o] != "object") && (t[o] = e[o]);
  }), t);
}, nt = ln;
var Cp = typeof global == "object" && global && global.Object === Object && global;
const $a = Cp;
var xp = typeof self == "object" && self && self.Object === Object && self, bp = $a || xp || Function("return this")();
const Dt = bp;
var Tp = Dt.Symbol;
const Xi = Tp;
var Ia = Object.prototype, kp = Ia.hasOwnProperty, Sp = Ia.toString, We = Xi ? Xi.toStringTag : void 0;
function vp(t) {
  var e = kp.call(t, We), i = t[We];
  try {
    t[We] = void 0;
    var r = !0;
  } catch {
  }
  var n = Sp.call(t);
  return r && (e ? t[We] = i : delete t[We]), n;
}
var wp = Object.prototype, Bp = wp.toString;
function Fp(t) {
  return Bp.call(t);
}
var Ap = "[object Null]", Lp = "[object Undefined]", Ko = Xi ? Xi.toStringTag : void 0;
function Ie(t) {
  return t == null ? t === void 0 ? Lp : Ap : Ko && Ko in Object(t) ? vp(t) : Fp(t);
}
function ge(t) {
  var e = typeof t;
  return t != null && (e == "object" || e == "function");
}
var Ep = "[object AsyncFunction]", Mp = "[object Function]", Op = "[object GeneratorFunction]", $p = "[object Proxy]";
function Dn(t) {
  if (!ge(t))
    return !1;
  var e = Ie(t);
  return e == Mp || e == Op || e == Ep || e == $p;
}
var Ip = Dt["__core-js_shared__"];
const Hr = Ip;
var Zo = function() {
  var t = /[^.]+$/.exec(Hr && Hr.keys && Hr.keys.IE_PROTO || "");
  return t ? "Symbol(src)_1." + t : "";
}();
function Dp(t) {
  return !!Zo && Zo in t;
}
var Np = Function.prototype, Rp = Np.toString;
function me(t) {
  if (t != null) {
    try {
      return Rp.call(t);
    } catch {
    }
    try {
      return t + "";
    } catch {
    }
  }
  return "";
}
var Pp = /[\\^$.*+?()[\]{}|]/g, qp = /^\[object .+?Constructor\]$/, zp = Function.prototype, Wp = Object.prototype, Hp = zp.toString, jp = Wp.hasOwnProperty, Up = RegExp(
  "^" + Hp.call(jp).replace(Pp, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Yp(t) {
  if (!ge(t) || Dp(t))
    return !1;
  var e = Dn(t) ? Up : qp;
  return e.test(me(t));
}
function Gp(t, e) {
  return t == null ? void 0 : t[e];
}
function ye(t, e) {
  var i = Gp(t, e);
  return Yp(i) ? i : void 0;
}
var Vp = ye(Object, "create");
const ri = Vp;
function Xp() {
  this.__data__ = ri ? ri(null) : {}, this.size = 0;
}
function Kp(t) {
  var e = this.has(t) && delete this.__data__[t];
  return this.size -= e ? 1 : 0, e;
}
var Zp = "__lodash_hash_undefined__", Jp = Object.prototype, Qp = Jp.hasOwnProperty;
function tg(t) {
  var e = this.__data__;
  if (ri) {
    var i = e[t];
    return i === Zp ? void 0 : i;
  }
  return Qp.call(e, t) ? e[t] : void 0;
}
var eg = Object.prototype, ig = eg.hasOwnProperty;
function rg(t) {
  var e = this.__data__;
  return ri ? e[t] !== void 0 : ig.call(e, t);
}
var ng = "__lodash_hash_undefined__";
function og(t, e) {
  var i = this.__data__;
  return this.size += this.has(t) ? 0 : 1, i[t] = ri && e === void 0 ? ng : e, this;
}
function de(t) {
  var e = -1, i = t == null ? 0 : t.length;
  for (this.clear(); ++e < i; ) {
    var r = t[e];
    this.set(r[0], r[1]);
  }
}
de.prototype.clear = Xp;
de.prototype.delete = Kp;
de.prototype.get = tg;
de.prototype.has = rg;
de.prototype.set = og;
function sg() {
  this.__data__ = [], this.size = 0;
}
function yr(t, e) {
  return t === e || t !== t && e !== e;
}
function _r(t, e) {
  for (var i = t.length; i--; )
    if (yr(t[i][0], e))
      return i;
  return -1;
}
var ag = Array.prototype, lg = ag.splice;
function hg(t) {
  var e = this.__data__, i = _r(e, t);
  if (i < 0)
    return !1;
  var r = e.length - 1;
  return i == r ? e.pop() : lg.call(e, i, 1), --this.size, !0;
}
function cg(t) {
  var e = this.__data__, i = _r(e, t);
  return i < 0 ? void 0 : e[i][1];
}
function ug(t) {
  return _r(this.__data__, t) > -1;
}
function fg(t, e) {
  var i = this.__data__, r = _r(i, t);
  return r < 0 ? (++this.size, i.push([t, e])) : i[r][1] = e, this;
}
function Vt(t) {
  var e = -1, i = t == null ? 0 : t.length;
  for (this.clear(); ++e < i; ) {
    var r = t[e];
    this.set(r[0], r[1]);
  }
}
Vt.prototype.clear = sg;
Vt.prototype.delete = hg;
Vt.prototype.get = cg;
Vt.prototype.has = ug;
Vt.prototype.set = fg;
var dg = ye(Dt, "Map");
const ni = dg;
function pg() {
  this.size = 0, this.__data__ = {
    hash: new de(),
    map: new (ni || Vt)(),
    string: new de()
  };
}
function gg(t) {
  var e = typeof t;
  return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? t !== "__proto__" : t === null;
}
function Cr(t, e) {
  var i = t.__data__;
  return gg(e) ? i[typeof e == "string" ? "string" : "hash"] : i.map;
}
function mg(t) {
  var e = Cr(this, t).delete(t);
  return this.size -= e ? 1 : 0, e;
}
function yg(t) {
  return Cr(this, t).get(t);
}
function _g(t) {
  return Cr(this, t).has(t);
}
function Cg(t, e) {
  var i = Cr(this, t), r = i.size;
  return i.set(t, e), this.size += i.size == r ? 0 : 1, this;
}
function ne(t) {
  var e = -1, i = t == null ? 0 : t.length;
  for (this.clear(); ++e < i; ) {
    var r = t[e];
    this.set(r[0], r[1]);
  }
}
ne.prototype.clear = pg;
ne.prototype.delete = mg;
ne.prototype.get = yg;
ne.prototype.has = _g;
ne.prototype.set = Cg;
var xg = "Expected a function";
function ui(t, e) {
  if (typeof t != "function" || e != null && typeof e != "function")
    throw new TypeError(xg);
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
function bg() {
  this.__data__ = new Vt(), this.size = 0;
}
function Tg(t) {
  var e = this.__data__, i = e.delete(t);
  return this.size = e.size, i;
}
function kg(t) {
  return this.__data__.get(t);
}
function Sg(t) {
  return this.__data__.has(t);
}
var vg = 200;
function wg(t, e) {
  var i = this.__data__;
  if (i instanceof Vt) {
    var r = i.__data__;
    if (!ni || r.length < vg - 1)
      return r.push([t, e]), this.size = ++i.size, this;
    i = this.__data__ = new ne(r);
  }
  return i.set(t, e), this.size = i.size, this;
}
function De(t) {
  var e = this.__data__ = new Vt(t);
  this.size = e.size;
}
De.prototype.clear = bg;
De.prototype.delete = Tg;
De.prototype.get = kg;
De.prototype.has = Sg;
De.prototype.set = wg;
var Bg = function() {
  try {
    var t = ye(Object, "defineProperty");
    return t({}, "", {}), t;
  } catch {
  }
}();
const Ki = Bg;
function Nn(t, e, i) {
  e == "__proto__" && Ki ? Ki(t, e, {
    configurable: !0,
    enumerable: !0,
    value: i,
    writable: !0
  }) : t[e] = i;
}
function hn(t, e, i) {
  (i !== void 0 && !yr(t[e], i) || i === void 0 && !(e in t)) && Nn(t, e, i);
}
function Fg(t) {
  return function(e, i, r) {
    for (var n = -1, o = Object(e), s = r(e), a = s.length; a--; ) {
      var l = s[t ? a : ++n];
      if (i(o[l], l, o) === !1)
        break;
    }
    return e;
  };
}
var Ag = Fg();
const Lg = Ag;
var Da = typeof exports == "object" && exports && !exports.nodeType && exports, Jo = Da && typeof module == "object" && module && !module.nodeType && module, Eg = Jo && Jo.exports === Da, Qo = Eg ? Dt.Buffer : void 0, ts = Qo ? Qo.allocUnsafe : void 0;
function Mg(t, e) {
  if (e)
    return t.slice();
  var i = t.length, r = ts ? ts(i) : new t.constructor(i);
  return t.copy(r), r;
}
var Og = Dt.Uint8Array;
const es = Og;
function $g(t) {
  var e = new t.constructor(t.byteLength);
  return new es(e).set(new es(t)), e;
}
function Ig(t, e) {
  var i = e ? $g(t.buffer) : t.buffer;
  return new t.constructor(i, t.byteOffset, t.length);
}
function Dg(t, e) {
  var i = -1, r = t.length;
  for (e || (e = Array(r)); ++i < r; )
    e[i] = t[i];
  return e;
}
var is = Object.create, Ng = function() {
  function t() {
  }
  return function(e) {
    if (!ge(e))
      return {};
    if (is)
      return is(e);
    t.prototype = e;
    var i = new t();
    return t.prototype = void 0, i;
  };
}();
const Rg = Ng;
function Na(t, e) {
  return function(i) {
    return t(e(i));
  };
}
var Pg = Na(Object.getPrototypeOf, Object);
const Ra = Pg;
var qg = Object.prototype;
function xr(t) {
  var e = t && t.constructor, i = typeof e == "function" && e.prototype || qg;
  return t === i;
}
function zg(t) {
  return typeof t.constructor == "function" && !xr(t) ? Rg(Ra(t)) : {};
}
function fi(t) {
  return t != null && typeof t == "object";
}
var Wg = "[object Arguments]";
function rs(t) {
  return fi(t) && Ie(t) == Wg;
}
var Pa = Object.prototype, Hg = Pa.hasOwnProperty, jg = Pa.propertyIsEnumerable, Ug = rs(function() {
  return arguments;
}()) ? rs : function(t) {
  return fi(t) && Hg.call(t, "callee") && !jg.call(t, "callee");
};
const Zi = Ug;
var Yg = Array.isArray;
const Ji = Yg;
var Gg = 9007199254740991;
function qa(t) {
  return typeof t == "number" && t > -1 && t % 1 == 0 && t <= Gg;
}
function br(t) {
  return t != null && qa(t.length) && !Dn(t);
}
function Vg(t) {
  return fi(t) && br(t);
}
function Xg() {
  return !1;
}
var za = typeof exports == "object" && exports && !exports.nodeType && exports, ns = za && typeof module == "object" && module && !module.nodeType && module, Kg = ns && ns.exports === za, os = Kg ? Dt.Buffer : void 0, Zg = os ? os.isBuffer : void 0, Jg = Zg || Xg;
const Rn = Jg;
var Qg = "[object Object]", tm = Function.prototype, em = Object.prototype, Wa = tm.toString, im = em.hasOwnProperty, rm = Wa.call(Object);
function nm(t) {
  if (!fi(t) || Ie(t) != Qg)
    return !1;
  var e = Ra(t);
  if (e === null)
    return !0;
  var i = im.call(e, "constructor") && e.constructor;
  return typeof i == "function" && i instanceof i && Wa.call(i) == rm;
}
var om = "[object Arguments]", sm = "[object Array]", am = "[object Boolean]", lm = "[object Date]", hm = "[object Error]", cm = "[object Function]", um = "[object Map]", fm = "[object Number]", dm = "[object Object]", pm = "[object RegExp]", gm = "[object Set]", mm = "[object String]", ym = "[object WeakMap]", _m = "[object ArrayBuffer]", Cm = "[object DataView]", xm = "[object Float32Array]", bm = "[object Float64Array]", Tm = "[object Int8Array]", km = "[object Int16Array]", Sm = "[object Int32Array]", vm = "[object Uint8Array]", wm = "[object Uint8ClampedArray]", Bm = "[object Uint16Array]", Fm = "[object Uint32Array]", Y = {};
Y[xm] = Y[bm] = Y[Tm] = Y[km] = Y[Sm] = Y[vm] = Y[wm] = Y[Bm] = Y[Fm] = !0;
Y[om] = Y[sm] = Y[_m] = Y[am] = Y[Cm] = Y[lm] = Y[hm] = Y[cm] = Y[um] = Y[fm] = Y[dm] = Y[pm] = Y[gm] = Y[mm] = Y[ym] = !1;
function Am(t) {
  return fi(t) && qa(t.length) && !!Y[Ie(t)];
}
function Lm(t) {
  return function(e) {
    return t(e);
  };
}
var Ha = typeof exports == "object" && exports && !exports.nodeType && exports, Xe = Ha && typeof module == "object" && module && !module.nodeType && module, Em = Xe && Xe.exports === Ha, jr = Em && $a.process, Mm = function() {
  try {
    var t = Xe && Xe.require && Xe.require("util").types;
    return t || jr && jr.binding && jr.binding("util");
  } catch {
  }
}();
const ss = Mm;
var as = ss && ss.isTypedArray, Om = as ? Lm(as) : Am;
const Pn = Om;
function cn(t, e) {
  if (!(e === "constructor" && typeof t[e] == "function") && e != "__proto__")
    return t[e];
}
var $m = Object.prototype, Im = $m.hasOwnProperty;
function Dm(t, e, i) {
  var r = t[e];
  (!(Im.call(t, e) && yr(r, i)) || i === void 0 && !(e in t)) && Nn(t, e, i);
}
function Nm(t, e, i, r) {
  var n = !i;
  i || (i = {});
  for (var o = -1, s = e.length; ++o < s; ) {
    var a = e[o], l = r ? r(i[a], t[a], a, i, t) : void 0;
    l === void 0 && (l = t[a]), n ? Nn(i, a, l) : Dm(i, a, l);
  }
  return i;
}
function Rm(t, e) {
  for (var i = -1, r = Array(t); ++i < t; )
    r[i] = e(i);
  return r;
}
var Pm = 9007199254740991, qm = /^(?:0|[1-9]\d*)$/;
function ja(t, e) {
  var i = typeof t;
  return e = e ?? Pm, !!e && (i == "number" || i != "symbol" && qm.test(t)) && t > -1 && t % 1 == 0 && t < e;
}
var zm = Object.prototype, Wm = zm.hasOwnProperty;
function Hm(t, e) {
  var i = Ji(t), r = !i && Zi(t), n = !i && !r && Rn(t), o = !i && !r && !n && Pn(t), s = i || r || n || o, a = s ? Rm(t.length, String) : [], l = a.length;
  for (var h in t)
    (e || Wm.call(t, h)) && !(s && // Safari 9 has enumerable `arguments.length` in strict mode.
    (h == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    n && (h == "offset" || h == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    o && (h == "buffer" || h == "byteLength" || h == "byteOffset") || // Skip index properties.
    ja(h, l))) && a.push(h);
  return a;
}
function jm(t) {
  var e = [];
  if (t != null)
    for (var i in Object(t))
      e.push(i);
  return e;
}
var Um = Object.prototype, Ym = Um.hasOwnProperty;
function Gm(t) {
  if (!ge(t))
    return jm(t);
  var e = xr(t), i = [];
  for (var r in t)
    r == "constructor" && (e || !Ym.call(t, r)) || i.push(r);
  return i;
}
function Ua(t) {
  return br(t) ? Hm(t, !0) : Gm(t);
}
function Vm(t) {
  return Nm(t, Ua(t));
}
function Xm(t, e, i, r, n, o, s) {
  var a = cn(t, i), l = cn(e, i), h = s.get(l);
  if (h) {
    hn(t, i, h);
    return;
  }
  var u = o ? o(a, l, i + "", t, e, s) : void 0, f = u === void 0;
  if (f) {
    var c = Ji(l), p = !c && Rn(l), y = !c && !p && Pn(l);
    u = l, c || p || y ? Ji(a) ? u = a : Vg(a) ? u = Dg(a) : p ? (f = !1, u = Mg(l, !0)) : y ? (f = !1, u = Ig(l, !0)) : u = [] : nm(l) || Zi(l) ? (u = a, Zi(a) ? u = Vm(a) : (!ge(a) || Dn(a)) && (u = zg(l))) : f = !1;
  }
  f && (s.set(l, u), n(u, l, r, o, s), s.delete(l)), hn(t, i, u);
}
function Ya(t, e, i, r, n) {
  t !== e && Lg(e, function(o, s) {
    if (n || (n = new De()), ge(o))
      Xm(t, e, s, i, Ya, r, n);
    else {
      var a = r ? r(cn(t, s), o, s + "", t, e, n) : void 0;
      a === void 0 && (a = o), hn(t, s, a);
    }
  }, Ua);
}
function Ga(t) {
  return t;
}
function Km(t, e, i) {
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
function Zm(t, e, i) {
  return e = ls(e === void 0 ? t.length - 1 : e, 0), function() {
    for (var r = arguments, n = -1, o = ls(r.length - e, 0), s = Array(o); ++n < o; )
      s[n] = r[e + n];
    n = -1;
    for (var a = Array(e + 1); ++n < e; )
      a[n] = r[n];
    return a[e] = i(s), Km(t, this, a);
  };
}
function Jm(t) {
  return function() {
    return t;
  };
}
var Qm = Ki ? function(t, e) {
  return Ki(t, "toString", {
    configurable: !0,
    enumerable: !1,
    value: Jm(e),
    writable: !0
  });
} : Ga;
const t0 = Qm;
var e0 = 800, i0 = 16, r0 = Date.now;
function n0(t) {
  var e = 0, i = 0;
  return function() {
    var r = r0(), n = i0 - (r - i);
    if (i = r, n > 0) {
      if (++e >= e0)
        return arguments[0];
    } else
      e = 0;
    return t.apply(void 0, arguments);
  };
}
var o0 = n0(t0);
const s0 = o0;
function a0(t, e) {
  return s0(Zm(t, e, Ga), t + "");
}
function l0(t, e, i) {
  if (!ge(i))
    return !1;
  var r = typeof e;
  return (r == "number" ? br(i) && ja(e, i.length) : r == "string" && e in i) ? yr(i[e], t) : !1;
}
function h0(t) {
  return a0(function(e, i) {
    var r = -1, n = i.length, o = n > 1 ? i[n - 1] : void 0, s = n > 2 ? i[2] : void 0;
    for (o = t.length > 3 && typeof o == "function" ? (n--, o) : void 0, s && l0(i[0], i[1], s) && (o = n < 3 ? void 0 : o, n = 1), e = Object(e); ++r < n; ) {
      var a = i[r];
      a && t(e, a, r, o);
    }
    return e;
  });
}
var c0 = h0(function(t, e, i) {
  Ya(t, e, i);
});
const u0 = c0, f0 = "​", d0 = {
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
}, p0 = /\s*(?:(\w+)(?=:):|(\w+))\s*(?:(\w+)|((?:(?!}%{2}).|\r?\n)*))?\s*(?:}%{2})?/gi, g0 = function(t, e) {
  const i = Va(t, /(?:init\b)|(?:initialize\b)/);
  let r = {};
  if (Array.isArray(i)) {
    const s = i.map((a) => a.args);
    Vi(s), r = nt(r, [...s]);
  } else
    r = i.args;
  if (!r)
    return;
  let n = mr(t, e);
  const o = "config";
  return r[o] !== void 0 && (n === "flowchart-v2" && (n = "flowchart"), r[n] = r[o], delete r[o]), r;
}, Va = function(t, e = null) {
  try {
    const i = new RegExp(
      `[%]{2}(?![{]${p0.source})(?=[}][%]{2}).*
`,
      "ig"
    );
    t = t.trim().replace(i, "").replace(/'/gm, '"'), A.debug(
      `Detecting diagram directive${e !== null ? " type:" + e : ""} based on the text:${t}`
    );
    let r;
    const n = [];
    for (; (r = Ve.exec(t)) !== null; )
      if (r.index === Ve.lastIndex && Ve.lastIndex++, r && !e || e && r[1] && r[1].match(e) || e && r[2] && r[2].match(e)) {
        const o = r[1] ? r[1] : r[2], s = r[3] ? r[3].trim() : r[4] ? JSON.parse(r[4].trim()) : null;
        n.push({ type: o, args: s });
      }
    return n.length === 0 ? { type: t, args: null } : n.length === 1 ? n[0] : n;
  } catch (i) {
    return A.error(
      `ERROR: ${i.message} - Unable to parse directive type: '${e}' based on the text: '${t}'`
    ), { type: void 0, args: null };
  }
}, m0 = function(t) {
  return t.replace(Ve, "");
}, y0 = function(t, e) {
  for (const [i, r] of e.entries())
    if (r.match(t))
      return i;
  return -1;
};
function _0(t, e) {
  if (!t)
    return e;
  const i = `curve${t.charAt(0).toUpperCase() + t.slice(1)}`;
  return d0[i] ?? e;
}
function C0(t, e) {
  const i = t.trim();
  if (i)
    return e.securityLevel !== "loose" ? Ms(i) : i;
}
const x0 = (t, ...e) => {
  const i = t.split("."), r = i.length - 1, n = i[r];
  let o = window;
  for (let s = 0; s < r; s++)
    if (o = o[i[s]], !o) {
      A.error(`Function name: ${t} not found in window`);
      return;
    }
  o[n](...e);
};
function Xa(t, e) {
  return !t || !e ? 0 : Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2));
}
function b0(t) {
  let e, i = 0;
  t.forEach((n) => {
    i += Xa(n, e), e = n;
  });
  const r = i / 2;
  return qn(t, r);
}
function T0(t) {
  return t.length === 1 ? t[0] : b0(t);
}
const hs = (t, e = 2) => {
  const i = Math.pow(10, e);
  return Math.round(t * i) / i;
}, qn = (t, e) => {
  let i, r = e;
  for (const n of t) {
    if (i) {
      const o = Xa(n, i);
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
            x: hs((1 - s) * i.x + s * n.x, 5),
            y: hs((1 - s) * i.y + s * n.y, 5)
          };
      }
    }
    i = n;
  }
  throw new Error("Could not find a suitable point for the given distance");
}, k0 = (t, e, i) => {
  A.info(`our points ${JSON.stringify(e)}`), e[0] !== i && (e = e.reverse());
  const n = qn(e, 25), o = t ? 10 : 5, s = Math.atan2(e[0].y - n.y, e[0].x - n.x), a = { x: 0, y: 0 };
  return a.x = Math.sin(s) * o + (e[0].x + n.x) / 2, a.y = -Math.cos(s) * o + (e[0].y + n.y) / 2, a;
};
function S0(t, e, i) {
  const r = structuredClone(i);
  A.info("our points", r), e !== "start_left" && e !== "start_right" && r.reverse();
  const n = 25 + t, o = qn(r, n), s = 10 + t * 0.5, a = Math.atan2(r[0].y - o.y, r[0].x - o.x), l = { x: 0, y: 0 };
  return e === "start_left" ? (l.x = Math.sin(a + Math.PI) * s + (r[0].x + o.x) / 2, l.y = -Math.cos(a + Math.PI) * s + (r[0].y + o.y) / 2) : e === "end_right" ? (l.x = Math.sin(a - Math.PI) * s + (r[0].x + o.x) / 2 - 5, l.y = -Math.cos(a - Math.PI) * s + (r[0].y + o.y) / 2 - 5) : e === "end_left" ? (l.x = Math.sin(a) * s + (r[0].x + o.x) / 2 - 5, l.y = -Math.cos(a) * s + (r[0].y + o.y) / 2 - 5) : (l.x = Math.sin(a) * s + (r[0].x + o.x) / 2, l.y = -Math.cos(a) * s + (r[0].y + o.y) / 2), l;
}
function v0(t) {
  let e = "", i = "";
  for (const r of t)
    r !== void 0 && (r.startsWith("color:") || r.startsWith("text-align:") ? i = i + r + ";" : e = e + r + ";");
  return { style: e, labelStyle: i };
}
let cs = 0;
const w0 = () => (cs++, "id-" + Math.random().toString(36).substr(2, 12) + "-" + cs);
function B0(t) {
  let e = "";
  const i = "0123456789abcdef", r = i.length;
  for (let n = 0; n < t; n++)
    e += i.charAt(Math.floor(Math.random() * r));
  return e;
}
const F0 = (t) => B0(t.length), A0 = function() {
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
}, L0 = function(t, e) {
  const i = e.text.replace(In.lineBreakRegex, " "), [, r] = Wn(e.fontSize), n = t.append("text");
  n.attr("x", e.x), n.attr("y", e.y), n.style("text-anchor", e.anchor), n.style("font-family", e.fontFamily), n.style("font-size", r), n.style("font-weight", e.fontWeight), n.attr("fill", e.fill), e.class !== void 0 && n.attr("class", e.class);
  const o = n.append("tspan");
  return o.attr("x", e.x + e.textMargin * 2), o.attr("fill", e.fill), o.text(i), n;
}, E0 = ui(
  (t, e, i) => {
    if (!t || (i = Object.assign(
      { fontSize: 12, fontWeight: 400, fontFamily: "Arial", joinWith: "<br/>" },
      i
    ), In.lineBreakRegex.test(t)))
      return t;
    const r = t.split(" "), n = [];
    let o = "";
    return r.forEach((s, a) => {
      const l = Qi(`${s} `, i), h = Qi(o, i);
      if (l > e) {
        const { hyphenatedStrings: c, remainingWord: p } = M0(s, e, "-", i);
        n.push(o, ...c), o = p;
      } else
        h + l >= e ? (n.push(o), o = s) : o = [o, s].filter(Boolean).join(" ");
      a + 1 === r.length && n.push(o);
    }), n.filter((s) => s !== "").join(i.joinWith);
  },
  (t, e, i) => `${t}${e}${i.fontSize}${i.fontWeight}${i.fontFamily}${i.joinWith}`
), M0 = ui(
  (t, e, i = "-", r) => {
    r = Object.assign(
      { fontSize: 12, fontWeight: 400, fontFamily: "Arial", margin: 0 },
      r
    );
    const n = [...t], o = [];
    let s = "";
    return n.forEach((a, l) => {
      const h = `${s}${a}`;
      if (Qi(h, r) >= e) {
        const f = l + 1, c = n.length === f, p = `${h}${i}`;
        o.push(c ? h : p), s = "";
      } else
        s = h;
    }), { hyphenatedStrings: o, remainingWord: s };
  },
  (t, e, i = "-", r) => `${t}${e}${i}${r.fontSize}${r.fontWeight}${r.fontFamily}`
);
function O0(t, e) {
  return zn(t, e).height;
}
function Qi(t, e) {
  return zn(t, e).width;
}
const zn = ui(
  (t, e) => {
    const { fontSize: i = 12, fontFamily: r = "Arial", fontWeight: n = 400 } = e;
    if (!t)
      return { width: 0, height: 0 };
    const [, o] = Wn(i), s = ["sans-serif", r], a = t.split(In.lineBreakRegex), l = [], h = Ct("body");
    if (!h.remove)
      return { width: 0, height: 0, lineHeight: 0 };
    const u = h.append("svg");
    for (const c of s) {
      let p = 0;
      const y = { width: 0, height: 0, lineHeight: 0 };
      for (const v of a) {
        const M = A0();
        M.text = v || f0;
        const q = L0(u, M).style("font-size", o).style("font-weight", n).style("font-family", c), S = (q._groups || q)[0][0].getBBox();
        if (S.width === 0 && S.height === 0)
          throw new Error("svg element not in render tree");
        y.width = Math.round(Math.max(y.width, S.width)), p = Math.round(S.height), y.height += p, y.lineHeight = Math.round(Math.max(y.lineHeight, p));
      }
      l.push(y);
    }
    u.remove();
    const f = isNaN(l[1].height) || isNaN(l[1].width) || isNaN(l[1].lineHeight) || l[0].height > l[1].height && l[0].width > l[1].width && l[0].lineHeight > l[1].lineHeight ? 0 : 1;
    return l[f];
  },
  (t, e) => `${t}${e.fontSize}${e.fontWeight}${e.fontFamily}`
);
class $0 {
  constructor(e = !1, i) {
    this.count = 0, this.count = i ? i.length : 0, this.next = e ? () => this.count++ : () => Date.now();
  }
}
let wi;
const I0 = function(t) {
  return wi = wi || document.createElement("div"), t = escape(t).replace(/%26/g, "&").replace(/%23/g, "#").replace(/%3B/g, ";"), wi.innerHTML = t, unescape(wi.textContent);
};
function Ka(t) {
  return "str" in t;
}
const D0 = (t, e, i, r) => {
  var o;
  if (!r)
    return;
  const n = (o = t.node()) == null ? void 0 : o.getBBox();
  n && t.append("text").text(r).attr("x", n.x + n.width / 2).attr("y", -i).attr("class", e);
}, Wn = (t) => {
  if (typeof t == "number")
    return [t, t + "px"];
  const e = parseInt(t ?? "", 10);
  return Number.isNaN(e) ? [void 0, void 0] : t === String(e) ? [e, t + "px"] : [e, t];
};
function Za(t, e) {
  return u0({}, t, e);
}
const Ke = {
  assignWithDepth: nt,
  wrapLabel: E0,
  calculateTextHeight: O0,
  calculateTextWidth: Qi,
  calculateTextDimensions: zn,
  cleanAndMerge: Za,
  detectInit: g0,
  detectDirective: Va,
  isSubstringInArray: y0,
  interpolateToCurve: _0,
  calcLabelPosition: T0,
  calcCardinalityPosition: k0,
  calcTerminalLabelPosition: S0,
  formatUrl: C0,
  getStylesFromArray: v0,
  generateId: w0,
  random: F0,
  runFunc: x0,
  entityDecode: I0,
  insertTitle: D0,
  parseFontSize: Wn,
  InitIDGenerator: $0
};
var Ja = "comm", Qa = "rule", tl = "decl", N0 = "@import", R0 = "@keyframes", P0 = Math.abs, Hn = String.fromCharCode;
function el(t) {
  return t.trim();
}
function un(t, e, i) {
  return t.replace(e, i);
}
function q0(t, e) {
  return t.indexOf(e);
}
function oi(t, e) {
  return t.charCodeAt(e) | 0;
}
function si(t, e, i) {
  return t.slice(e, i);
}
function te(t) {
  return t.length;
}
function il(t) {
  return t.length;
}
function Bi(t, e) {
  return e.push(t), t;
}
var Tr = 1, Ee = 1, rl = 0, Tt = 0, Z = 0, Ne = "";
function jn(t, e, i, r, n, o, s) {
  return { value: t, root: e, parent: i, type: r, props: n, children: o, line: Tr, column: Ee, length: s, return: "" };
}
function z0() {
  return Z;
}
function W0() {
  return Z = Tt > 0 ? oi(Ne, --Tt) : 0, Ee--, Z === 10 && (Ee = 1, Tr--), Z;
}
function wt() {
  return Z = Tt < rl ? oi(Ne, Tt++) : 0, Ee++, Z === 10 && (Ee = 1, Tr++), Z;
}
function ce() {
  return oi(Ne, Tt);
}
function Ii() {
  return Tt;
}
function kr(t, e) {
  return si(Ne, t, e);
}
function fn(t) {
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
function H0(t) {
  return Tr = Ee = 1, rl = te(Ne = t), Tt = 0, [];
}
function j0(t) {
  return Ne = "", t;
}
function Ur(t) {
  return el(kr(Tt - 1, dn(t === 91 ? t + 2 : t === 40 ? t + 1 : t)));
}
function U0(t) {
  for (; (Z = ce()) && Z < 33; )
    wt();
  return fn(t) > 2 || fn(Z) > 3 ? "" : " ";
}
function Y0(t, e) {
  for (; --e && wt() && !(Z < 48 || Z > 102 || Z > 57 && Z < 65 || Z > 70 && Z < 97); )
    ;
  return kr(t, Ii() + (e < 6 && ce() == 32 && wt() == 32));
}
function dn(t) {
  for (; wt(); )
    switch (Z) {
      case t:
        return Tt;
      case 34:
      case 39:
        t !== 34 && t !== 39 && dn(Z);
        break;
      case 40:
        t === 41 && dn(t);
        break;
      case 92:
        wt();
        break;
    }
  return Tt;
}
function G0(t, e) {
  for (; wt() && t + Z !== 47 + 10; )
    if (t + Z === 42 + 42 && ce() === 47)
      break;
  return "/*" + kr(e, Tt - 1) + "*" + Hn(t === 47 ? t : wt());
}
function V0(t) {
  for (; !fn(ce()); )
    wt();
  return kr(t, Tt);
}
function X0(t) {
  return j0(Di("", null, null, null, [""], t = H0(t), 0, [0], t));
}
function Di(t, e, i, r, n, o, s, a, l) {
  for (var h = 0, u = 0, f = s, c = 0, p = 0, y = 0, v = 1, M = 1, q = 1, S = 0, z = "", Q = n, X = o, G = r, W = z; M; )
    switch (y = S, S = wt()) {
      case 40:
        if (y != 108 && oi(W, f - 1) == 58) {
          q0(W += un(Ur(S), "&", "&\f"), "&\f") != -1 && (q = -1);
          break;
        }
      case 34:
      case 39:
      case 91:
        W += Ur(S);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        W += U0(y);
        break;
      case 92:
        W += Y0(Ii() - 1, 7);
        continue;
      case 47:
        switch (ce()) {
          case 42:
          case 47:
            Bi(K0(G0(wt(), Ii()), e, i), l);
            break;
          default:
            W += "/";
        }
        break;
      case 123 * v:
        a[h++] = te(W) * q;
      case 125 * v:
      case 59:
      case 0:
        switch (S) {
          case 0:
          case 125:
            M = 0;
          case 59 + u:
            p > 0 && te(W) - f && Bi(p > 32 ? fs(W + ";", r, i, f - 1) : fs(un(W, " ", "") + ";", r, i, f - 2), l);
            break;
          case 59:
            W += ";";
          default:
            if (Bi(G = us(W, e, i, h, u, n, a, z, Q = [], X = [], f), o), S === 123)
              if (u === 0)
                Di(W, e, G, G, Q, o, f, a, X);
              else
                switch (c === 99 && oi(W, 3) === 110 ? 100 : c) {
                  case 100:
                  case 109:
                  case 115:
                    Di(t, G, G, r && Bi(us(t, G, G, 0, 0, n, a, z, n, Q = [], f), X), n, X, f, a, r ? Q : X);
                    break;
                  default:
                    Di(W, G, G, G, [""], X, 0, a, X);
                }
        }
        h = u = p = 0, v = q = 1, z = W = "", f = s;
        break;
      case 58:
        f = 1 + te(W), p = y;
      default:
        if (v < 1) {
          if (S == 123)
            --v;
          else if (S == 125 && v++ == 0 && W0() == 125)
            continue;
        }
        switch (W += Hn(S), S * v) {
          case 38:
            q = u > 0 ? 1 : (W += "\f", -1);
            break;
          case 44:
            a[h++] = (te(W) - 1) * q, q = 1;
            break;
          case 64:
            ce() === 45 && (W += Ur(wt())), c = ce(), u = f = te(z = W += V0(Ii())), S++;
            break;
          case 45:
            y === 45 && te(W) == 2 && (v = 0);
        }
    }
  return o;
}
function us(t, e, i, r, n, o, s, a, l, h, u) {
  for (var f = n - 1, c = n === 0 ? o : [""], p = il(c), y = 0, v = 0, M = 0; y < r; ++y)
    for (var q = 0, S = si(t, f + 1, f = P0(v = s[y])), z = t; q < p; ++q)
      (z = el(v > 0 ? c[q] + " " + S : un(S, /&\f/g, c[q]))) && (l[M++] = z);
  return jn(t, e, i, n === 0 ? Qa : a, l, h, u);
}
function K0(t, e, i) {
  return jn(t, e, i, Ja, Hn(z0()), si(t, 2, -2), 0);
}
function fs(t, e, i, r) {
  return jn(t, e, i, tl, si(t, 0, r), si(t, r + 1, -1), r);
}
function pn(t, e) {
  for (var i = "", r = il(t), n = 0; n < r; n++)
    i += e(t[n], n, t, e) || "";
  return i;
}
function Z0(t, e, i, r) {
  switch (t.type) {
    case N0:
    case tl:
      return t.return = t.return || t.value;
    case Ja:
      return "";
    case R0:
      return t.return = t.value + "{" + pn(t.children, r) + "}";
    case Qa:
      t.value = t.props.join(",");
  }
  return te(i = pn(t.children, r)) ? t.return = t.value + "{" + i + "}" : "";
}
const ds = "10.6.1", Me = Object.freeze(gp);
let ut = nt({}, Me), nl, Oe = [], Ze = nt({}, Me);
const Sr = (t, e) => {
  let i = nt({}, t), r = {};
  for (const n of e)
    al(n), r = nt(r, n);
  if (i = nt(i, r), r.theme && r.theme in Yt) {
    const n = nt({}, nl), o = nt(
      n.themeVariables || {},
      r.themeVariables
    );
    i.theme && i.theme in Yt && (i.themeVariables = Yt[i.theme].getThemeVariables(o));
  }
  return Ze = i, ll(Ze), Ze;
}, J0 = (t) => (ut = nt({}, Me), ut = nt(ut, t), t.theme && Yt[t.theme] && (ut.themeVariables = Yt[t.theme].getThemeVariables(t.themeVariables)), Sr(ut, Oe), ut), Q0 = (t) => {
  nl = nt({}, t);
}, ty = (t) => (ut = nt(ut, t), Sr(ut, Oe), ut), ol = () => nt({}, ut), sl = (t) => (ll(t), nt(Ze, t), $t()), $t = () => nt({}, Ze), al = (t) => {
  t && (["secure", ...ut.secure ?? []].forEach((e) => {
    Object.hasOwn(t, e) && (A.debug(`Denied attempt to modify a secure key ${e}`, t[e]), delete t[e]);
  }), Object.keys(t).forEach((e) => {
    e.startsWith("__") && delete t[e];
  }), Object.keys(t).forEach((e) => {
    typeof t[e] == "string" && (t[e].includes("<") || t[e].includes(">") || t[e].includes("url(data:")) && delete t[e], typeof t[e] == "object" && al(t[e]);
  }));
}, ey = (t) => {
  Vi(t), t.fontFamily && (!t.themeVariables || !t.themeVariables.fontFamily) && (t.themeVariables = { fontFamily: t.fontFamily }), Oe.push(t), Sr(ut, Oe);
}, tr = (t = ut) => {
  Oe = [], Sr(t, Oe);
}, iy = {
  LAZY_LOAD_DEPRECATED: "The configuration options lazyLoadedDiagrams and loadExternalDiagramsAtStartup are deprecated. Please use registerExternalDiagrams instead."
}, ps = {}, ry = (t) => {
  ps[t] || (A.warn(iy[t]), ps[t] = !0);
}, ll = (t) => {
  t && (t.lazyLoadedDiagrams || t.loadExternalDiagramsAtStartup) && ry("LAZY_LOAD_DEPRECATED");
}, hl = "c4", ny = (t) => /^\s*C4Context|C4Container|C4Component|C4Dynamic|C4Deployment/.test(t), oy = async () => {
  const { diagram: t } = await import("./c4Diagram-ec3bb67c.js");
  return { id: hl, diagram: t };
}, sy = {
  id: hl,
  detector: ny,
  loader: oy
}, ay = sy, cl = "flowchart", ly = (t, e) => {
  var i, r;
  return ((i = e == null ? void 0 : e.flowchart) == null ? void 0 : i.defaultRenderer) === "dagre-wrapper" || ((r = e == null ? void 0 : e.flowchart) == null ? void 0 : r.defaultRenderer) === "elk" ? !1 : /^\s*graph/.test(t);
}, hy = async () => {
  const { diagram: t } = await import("./flowDiagram-1541572e.js");
  return { id: cl, diagram: t };
}, cy = {
  id: cl,
  detector: ly,
  loader: hy
}, uy = cy, ul = "flowchart-v2", fy = (t, e) => {
  var i, r, n;
  return ((i = e == null ? void 0 : e.flowchart) == null ? void 0 : i.defaultRenderer) === "dagre-d3" || ((r = e == null ? void 0 : e.flowchart) == null ? void 0 : r.defaultRenderer) === "elk" ? !1 : /^\s*graph/.test(t) && ((n = e == null ? void 0 : e.flowchart) == null ? void 0 : n.defaultRenderer) === "dagre-wrapper" ? !0 : /^\s*flowchart/.test(t);
}, dy = async () => {
  const { diagram: t } = await import("./flowDiagram-v2-67a58972.js");
  return { id: ul, diagram: t };
}, py = {
  id: ul,
  detector: fy,
  loader: dy
}, gy = py, fl = "er", my = (t) => /^\s*erDiagram/.test(t), yy = async () => {
  const { diagram: t } = await import("./erDiagram-a329e5de.js");
  return { id: fl, diagram: t };
}, _y = {
  id: fl,
  detector: my,
  loader: yy
}, Cy = _y, dl = "gitGraph", xy = (t) => /^\s*gitGraph/.test(t), by = async () => {
  const { diagram: t } = await import("./gitGraphDiagram-2083142e.js");
  return { id: dl, diagram: t };
}, Ty = {
  id: dl,
  detector: xy,
  loader: by
}, ky = Ty, pl = "gantt", Sy = (t) => /^\s*gantt/.test(t), vy = async () => {
  const { diagram: t } = await import("./ganttDiagram-a6dd55d8.js");
  return { id: pl, diagram: t };
}, wy = {
  id: pl,
  detector: Sy,
  loader: vy
}, By = wy, gl = "info", Fy = (t) => /^\s*info/.test(t), Ay = async () => {
  const { diagram: t } = await import("./infoDiagram-3423a8e0.js");
  return { id: gl, diagram: t };
}, Ly = {
  id: gl,
  detector: Fy,
  loader: Ay
}, ml = "pie", Ey = (t) => /^\s*pie/.test(t), My = async () => {
  const { diagram: t } = await import("./pieDiagram-2fe1d2bb.js");
  return { id: ml, diagram: t };
}, Oy = {
  id: ml,
  detector: Ey,
  loader: My
}, yl = "quadrantChart", $y = (t) => /^\s*quadrantChart/.test(t), Iy = async () => {
  const { diagram: t } = await import("./quadrantDiagram-140db9f1.js");
  return { id: yl, diagram: t };
}, Dy = {
  id: yl,
  detector: $y,
  loader: Iy
}, Ny = Dy, _l = "xychart", Ry = (t) => /^\s*xychart-beta/.test(t), Py = async () => {
  const { diagram: t } = await import("./xychartDiagram-ad0c231b.js");
  return { id: _l, diagram: t };
}, qy = {
  id: _l,
  detector: Ry,
  loader: Py
}, zy = qy, Cl = "requirement", Wy = (t) => /^\s*requirement(Diagram)?/.test(t), Hy = async () => {
  const { diagram: t } = await import("./requirementDiagram-dd25f257.js");
  return { id: Cl, diagram: t };
}, jy = {
  id: Cl,
  detector: Wy,
  loader: Hy
}, Uy = jy, xl = "sequence", Yy = (t) => /^\s*sequenceDiagram/.test(t), Gy = async () => {
  const { diagram: t } = await import("./sequenceDiagram-d9c89af8.js");
  return { id: xl, diagram: t };
}, Vy = {
  id: xl,
  detector: Yy,
  loader: Gy
}, Xy = Vy, bl = "class", Ky = (t, e) => {
  var i;
  return ((i = e == null ? void 0 : e.class) == null ? void 0 : i.defaultRenderer) === "dagre-wrapper" ? !1 : /^\s*classDiagram/.test(t);
}, Zy = async () => {
  const { diagram: t } = await import("./classDiagram-46f60f18.js");
  return { id: bl, diagram: t };
}, Jy = {
  id: bl,
  detector: Ky,
  loader: Zy
}, Qy = Jy, Tl = "classDiagram", t_ = (t, e) => {
  var i;
  return /^\s*classDiagram/.test(t) && ((i = e == null ? void 0 : e.class) == null ? void 0 : i.defaultRenderer) === "dagre-wrapper" ? !0 : /^\s*classDiagram-v2/.test(t);
}, e_ = async () => {
  const { diagram: t } = await import("./classDiagram-v2-1fad7961.js");
  return { id: Tl, diagram: t };
}, i_ = {
  id: Tl,
  detector: t_,
  loader: e_
}, r_ = i_, kl = "state", n_ = (t, e) => {
  var i;
  return ((i = e == null ? void 0 : e.state) == null ? void 0 : i.defaultRenderer) === "dagre-wrapper" ? !1 : /^\s*stateDiagram/.test(t);
}, o_ = async () => {
  const { diagram: t } = await import("./stateDiagram-61a94aa8.js");
  return { id: kl, diagram: t };
}, s_ = {
  id: kl,
  detector: n_,
  loader: o_
}, a_ = s_, Sl = "stateDiagram", l_ = (t, e) => {
  var i;
  return !!(/^\s*stateDiagram-v2/.test(t) || /^\s*stateDiagram/.test(t) && ((i = e == null ? void 0 : e.state) == null ? void 0 : i.defaultRenderer) === "dagre-wrapper");
}, h_ = async () => {
  const { diagram: t } = await import("./stateDiagram-v2-ee6f52b7.js");
  return { id: Sl, diagram: t };
}, c_ = {
  id: Sl,
  detector: l_,
  loader: h_
}, u_ = c_, vl = "journey", f_ = (t) => /^\s*journey/.test(t), d_ = async () => {
  const { diagram: t } = await import("./journeyDiagram-66140ef0.js");
  return { id: vl, diagram: t };
}, p_ = {
  id: vl,
  detector: f_,
  loader: d_
}, g_ = p_, m_ = function(t, e) {
  for (let i of e)
    t.attr(i[0], i[1]);
}, y_ = function(t, e, i) {
  let r = /* @__PURE__ */ new Map();
  return i ? (r.set("width", "100%"), r.set("style", `max-width: ${e}px;`)) : (r.set("height", t), r.set("width", e)), r;
}, wl = function(t, e, i, r) {
  const n = y_(e, i, r);
  m_(t, n);
}, __ = function(t, e, i, r) {
  const n = e.node().getBBox(), o = n.width, s = n.height;
  A.info(`SVG bounds: ${o}x${s}`, n);
  let a = 0, l = 0;
  A.info(`Graph bounds: ${a}x${l}`, t), a = o + i * 2, l = s + i * 2, A.info(`Calculated bounds: ${a}x${l}`), wl(e, l, a, r);
  const h = `${n.x - i} ${n.y - i} ${n.width + 2 * i} ${n.height + 2 * i}`;
  e.attr("viewBox", h);
}, Ni = {}, C_ = (t, e, i) => {
  let r = "";
  return t in Ni && Ni[t] ? r = Ni[t](i) : A.warn(`No theme found for ${t}`), ` & {
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
}, x_ = (t, e) => {
  e !== void 0 && (Ni[t] = e);
}, b_ = C_;
let Un = "", Yn = "", Gn = "";
const Vn = (t) => ii(t, $t()), T_ = () => {
  Un = "", Gn = "", Yn = "";
}, k_ = (t) => {
  Un = Vn(t).replace(/^\s+/g, "");
}, S_ = () => Un, v_ = (t) => {
  Gn = Vn(t).replace(/\n\s+/g, `
`);
}, w_ = () => Gn, B_ = (t) => {
  Yn = Vn(t);
}, F_ = () => Yn, A_ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  clear: T_,
  getAccDescription: w_,
  getAccTitle: S_,
  getDiagramTitle: F_,
  setAccDescription: v_,
  setAccTitle: k_,
  setDiagramTitle: B_
}, Symbol.toStringTag, { value: "Module" })), L_ = A, E_ = bn, Xn = $t, _1 = sl, C1 = Me, M_ = (t) => ii(t, Xn()), O_ = __, $_ = () => A_, er = {}, ir = (t, e, i) => {
  var r;
  if (er[t])
    throw new Error(`Diagram ${t} already registered.`);
  er[t] = e, i && Oa(t, i), x_(t, e.styles), (r = e.injectUtils) == null || r.call(
    e,
    L_,
    E_,
    Xn,
    M_,
    O_,
    $_(),
    () => {
    }
  );
}, Kn = (t) => {
  if (t in er)
    return er[t];
  throw new I_(t);
};
class I_ extends Error {
  constructor(e) {
    super(`Diagram ${e} not found.`);
  }
}
const D_ = (t) => {
  var n;
  const { securityLevel: e } = Xn();
  let i = Ct("body");
  if (e === "sandbox") {
    const s = ((n = Ct(`#i${t}`).node()) == null ? void 0 : n.contentDocument) ?? document;
    i = Ct(s.body);
  }
  return i.select(`#${t}`);
}, N_ = (t, e, i) => {
  A.debug(`renering svg for syntax error
`);
  const r = D_(e);
  r.attr("viewBox", "0 0 2412 512"), wl(r, 100, 512, !0);
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
}, Bl = { draw: N_ }, R_ = Bl, P_ = {
  db: {},
  renderer: Bl,
  parser: {
    parser: { yy: {} },
    parse: () => {
    }
  }
}, q_ = P_, Fl = "flowchart-elk", z_ = (t, e) => {
  var i;
  return (
    // If diagram explicitly states flowchart-elk
    !!(/^\s*flowchart-elk/.test(t) || // If a flowchart/graph diagram has their default renderer set to elk
    /^\s*flowchart|graph/.test(t) && ((i = e == null ? void 0 : e.flowchart) == null ? void 0 : i.defaultRenderer) === "elk")
  );
}, W_ = async () => {
  const { diagram: t } = await import("./flowchart-elk-definition-6aadd678.js");
  return { id: Fl, diagram: t };
}, H_ = {
  id: Fl,
  detector: z_,
  loader: W_
}, j_ = H_, Al = "timeline", U_ = (t) => /^\s*timeline/.test(t), Y_ = async () => {
  const { diagram: t } = await import("./timeline-definition-82eccf71.js");
  return { id: Al, diagram: t };
}, G_ = {
  id: Al,
  detector: U_,
  loader: Y_
}, V_ = G_, Ll = "mindmap", X_ = (t) => /^\s*mindmap/.test(t), K_ = async () => {
  const { diagram: t } = await import("./mindmap-definition-ad21433c.js");
  return { id: Ll, diagram: t };
}, Z_ = {
  id: Ll,
  detector: X_,
  loader: K_
}, J_ = Z_, El = "sankey", Q_ = (t) => /^\s*sankey-beta/.test(t), tC = async () => {
  const { diagram: t } = await import("./sankeyDiagram-51de3a0d.js");
  return { id: El, diagram: t };
}, eC = {
  id: El,
  detector: Q_,
  loader: tC
}, iC = eC;
let gs = !1;
const Zn = () => {
  gs || (gs = !0, ir("error", q_, (t) => t.toLowerCase().trim() === "error"), ir(
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
  ), Ma(
    ay,
    r_,
    Qy,
    Cy,
    By,
    Ly,
    Oy,
    Uy,
    Xy,
    j_,
    gy,
    uy,
    J_,
    V_,
    ky,
    u_,
    a_,
    g_,
    Ny,
    iC,
    zy
  ));
};
class Ml {
  constructor(e, i = {}) {
    this.text = e, this.metadata = i, this.type = "graph", this.text += `
`;
    const r = $t();
    try {
      this.type = mr(e, r);
    } catch (o) {
      this.type = "error", this.detectError = o;
    }
    const n = Kn(this.type);
    A.debug("Type " + this.type), this.db = n.db, this.renderer = n.renderer, this.parser = n.parser, this.parser.parser.yy = this.db, this.init = n.init, this.parse();
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
const Jn = async (t, e = {}) => {
  const i = mr(t, $t());
  try {
    Kn(i);
  } catch {
    const n = _p(i);
    if (!n)
      throw new Ea(`Diagram ${i} not found.`);
    const { id: o, diagram: s } = await n();
    ir(o, s);
  }
  return new Ml(t, e);
};
let gn = [];
const x1 = (t) => {
  gn.push(t);
}, rC = () => {
  gn.forEach((t) => {
    t();
  }), gn = [];
};
var nC = Na(Object.keys, Object);
const oC = nC;
var sC = Object.prototype, aC = sC.hasOwnProperty;
function lC(t) {
  if (!xr(t))
    return oC(t);
  var e = [];
  for (var i in Object(t))
    aC.call(t, i) && i != "constructor" && e.push(i);
  return e;
}
var hC = ye(Dt, "DataView");
const mn = hC;
var cC = ye(Dt, "Promise");
const yn = cC;
var uC = ye(Dt, "Set");
const _n = uC;
var fC = ye(Dt, "WeakMap");
const Cn = fC;
var ms = "[object Map]", dC = "[object Object]", ys = "[object Promise]", _s = "[object Set]", Cs = "[object WeakMap]", xs = "[object DataView]", pC = me(mn), gC = me(ni), mC = me(yn), yC = me(_n), _C = me(Cn), ae = Ie;
(mn && ae(new mn(new ArrayBuffer(1))) != xs || ni && ae(new ni()) != ms || yn && ae(yn.resolve()) != ys || _n && ae(new _n()) != _s || Cn && ae(new Cn()) != Cs) && (ae = function(t) {
  var e = Ie(t), i = e == dC ? t.constructor : void 0, r = i ? me(i) : "";
  if (r)
    switch (r) {
      case pC:
        return xs;
      case gC:
        return ms;
      case mC:
        return ys;
      case yC:
        return _s;
      case _C:
        return Cs;
    }
  return e;
});
const CC = ae;
var xC = "[object Map]", bC = "[object Set]", TC = Object.prototype, kC = TC.hasOwnProperty;
function Yr(t) {
  if (t == null)
    return !0;
  if (br(t) && (Ji(t) || typeof t == "string" || typeof t.splice == "function" || Rn(t) || Pn(t) || Zi(t)))
    return !t.length;
  var e = CC(t);
  if (e == xC || e == bC)
    return !t.size;
  if (xr(t))
    return !lC(t).length;
  for (var i in t)
    if (kC.call(t, i))
      return !1;
  return !0;
}
const SC = "graphics-document document";
function vC(t, e) {
  t.attr("role", SC), e !== "" && t.attr("aria-roledescription", e);
}
function wC(t, e, i, r) {
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
const BC = (t) => t.replace(/^\s*%%(?!{)[^\n]+\n?/gm, "").trimStart();
/*! js-yaml 4.1.0 https://github.com/nodeca/js-yaml @license MIT */
function Ol(t) {
  return typeof t > "u" || t === null;
}
function FC(t) {
  return typeof t == "object" && t !== null;
}
function AC(t) {
  return Array.isArray(t) ? t : Ol(t) ? [] : [t];
}
function LC(t, e) {
  var i, r, n, o;
  if (e)
    for (o = Object.keys(e), i = 0, r = o.length; i < r; i += 1)
      n = o[i], t[n] = e[n];
  return t;
}
function EC(t, e) {
  var i = "", r;
  for (r = 0; r < e; r += 1)
    i += t;
  return i;
}
function MC(t) {
  return t === 0 && Number.NEGATIVE_INFINITY === 1 / t;
}
var OC = Ol, $C = FC, IC = AC, DC = EC, NC = MC, RC = LC, at = {
  isNothing: OC,
  isObject: $C,
  toArray: IC,
  repeat: DC,
  isNegativeZero: NC,
  extend: RC
};
function $l(t, e) {
  var i = "", r = t.reason || "(unknown reason)";
  return t.mark ? (t.mark.name && (i += 'in "' + t.mark.name + '" '), i += "(" + (t.mark.line + 1) + ":" + (t.mark.column + 1) + ")", !e && t.mark.snippet && (i += `

` + t.mark.snippet), r + " " + i) : r;
}
function ai(t, e) {
  Error.call(this), this.name = "YAMLException", this.reason = t, this.mark = e, this.message = $l(this, !1), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack || "";
}
ai.prototype = Object.create(Error.prototype);
ai.prototype.constructor = ai;
ai.prototype.toString = function(e) {
  return this.name + ": " + $l(this, e);
};
var Ut = ai;
function Gr(t, e, i, r, n) {
  var o = "", s = "", a = Math.floor(n / 2) - 1;
  return r - e > a && (o = " ... ", e = r - a + o.length), i - r > a && (s = " ...", i = r + a - s.length), {
    str: o + t.slice(e, i).replace(/\t/g, "→") + s,
    pos: r - e + o.length
    // relative position
  };
}
function Vr(t, e) {
  return at.repeat(" ", e - t.length) + t;
}
function PC(t, e) {
  if (e = Object.create(e || null), !t.buffer)
    return null;
  e.maxLength || (e.maxLength = 79), typeof e.indent != "number" && (e.indent = 1), typeof e.linesBefore != "number" && (e.linesBefore = 3), typeof e.linesAfter != "number" && (e.linesAfter = 2);
  for (var i = /\r?\n|\r|\0/g, r = [0], n = [], o, s = -1; o = i.exec(t.buffer); )
    n.push(o.index), r.push(o.index + o[0].length), t.position <= o.index && s < 0 && (s = r.length - 2);
  s < 0 && (s = r.length - 1);
  var a = "", l, h, u = Math.min(t.line + e.linesAfter, n.length).toString().length, f = e.maxLength - (e.indent + u + 3);
  for (l = 1; l <= e.linesBefore && !(s - l < 0); l++)
    h = Gr(
      t.buffer,
      r[s - l],
      n[s - l],
      t.position - (r[s] - r[s - l]),
      f
    ), a = at.repeat(" ", e.indent) + Vr((t.line - l + 1).toString(), u) + " | " + h.str + `
` + a;
  for (h = Gr(t.buffer, r[s], n[s], t.position, f), a += at.repeat(" ", e.indent) + Vr((t.line + 1).toString(), u) + " | " + h.str + `
`, a += at.repeat("-", e.indent + u + 3 + h.pos) + `^
`, l = 1; l <= e.linesAfter && !(s + l >= n.length); l++)
    h = Gr(
      t.buffer,
      r[s + l],
      n[s + l],
      t.position - (r[s] - r[s + l]),
      f
    ), a += at.repeat(" ", e.indent) + Vr((t.line + l + 1).toString(), u) + " | " + h.str + `
`;
  return a.replace(/\n$/, "");
}
var qC = PC, zC = [
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
], WC = [
  "scalar",
  "sequence",
  "mapping"
];
function HC(t) {
  var e = {};
  return t !== null && Object.keys(t).forEach(function(i) {
    t[i].forEach(function(r) {
      e[String(r)] = i;
    });
  }), e;
}
function jC(t, e) {
  if (e = e || {}, Object.keys(e).forEach(function(i) {
    if (zC.indexOf(i) === -1)
      throw new Ut('Unknown option "' + i + '" is met in definition of "' + t + '" YAML type.');
  }), this.options = e, this.tag = t, this.kind = e.kind || null, this.resolve = e.resolve || function() {
    return !0;
  }, this.construct = e.construct || function(i) {
    return i;
  }, this.instanceOf = e.instanceOf || null, this.predicate = e.predicate || null, this.represent = e.represent || null, this.representName = e.representName || null, this.defaultStyle = e.defaultStyle || null, this.multi = e.multi || !1, this.styleAliases = HC(e.styleAliases || null), WC.indexOf(this.kind) === -1)
    throw new Ut('Unknown kind "' + this.kind + '" is specified for "' + t + '" YAML type.');
}
var ot = jC;
function bs(t, e) {
  var i = [];
  return t[e].forEach(function(r) {
    var n = i.length;
    i.forEach(function(o, s) {
      o.tag === r.tag && o.kind === r.kind && o.multi === r.multi && (n = s);
    }), i[n] = r;
  }), i;
}
function UC() {
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
  if (e instanceof ot)
    r.push(e);
  else if (Array.isArray(e))
    r = r.concat(e);
  else if (e && (Array.isArray(e.implicit) || Array.isArray(e.explicit)))
    e.implicit && (i = i.concat(e.implicit)), e.explicit && (r = r.concat(e.explicit));
  else
    throw new Ut("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
  i.forEach(function(o) {
    if (!(o instanceof ot))
      throw new Ut("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    if (o.loadKind && o.loadKind !== "scalar")
      throw new Ut("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
    if (o.multi)
      throw new Ut("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
  }), r.forEach(function(o) {
    if (!(o instanceof ot))
      throw new Ut("Specified list of YAML types (or a single Type object) contains a non-Type object.");
  });
  var n = Object.create(xn.prototype);
  return n.implicit = (this.implicit || []).concat(i), n.explicit = (this.explicit || []).concat(r), n.compiledImplicit = bs(n, "implicit"), n.compiledExplicit = bs(n, "explicit"), n.compiledTypeMap = UC(n.compiledImplicit, n.compiledExplicit), n;
};
var YC = xn, GC = new ot("tag:yaml.org,2002:str", {
  kind: "scalar",
  construct: function(t) {
    return t !== null ? t : "";
  }
}), VC = new ot("tag:yaml.org,2002:seq", {
  kind: "sequence",
  construct: function(t) {
    return t !== null ? t : [];
  }
}), XC = new ot("tag:yaml.org,2002:map", {
  kind: "mapping",
  construct: function(t) {
    return t !== null ? t : {};
  }
}), KC = new YC({
  explicit: [
    GC,
    VC,
    XC
  ]
});
function ZC(t) {
  if (t === null)
    return !0;
  var e = t.length;
  return e === 1 && t === "~" || e === 4 && (t === "null" || t === "Null" || t === "NULL");
}
function JC() {
  return null;
}
function QC(t) {
  return t === null;
}
var tx = new ot("tag:yaml.org,2002:null", {
  kind: "scalar",
  resolve: ZC,
  construct: JC,
  predicate: QC,
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
function ex(t) {
  if (t === null)
    return !1;
  var e = t.length;
  return e === 4 && (t === "true" || t === "True" || t === "TRUE") || e === 5 && (t === "false" || t === "False" || t === "FALSE");
}
function ix(t) {
  return t === "true" || t === "True" || t === "TRUE";
}
function rx(t) {
  return Object.prototype.toString.call(t) === "[object Boolean]";
}
var nx = new ot("tag:yaml.org,2002:bool", {
  kind: "scalar",
  resolve: ex,
  construct: ix,
  predicate: rx,
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
function ox(t) {
  return 48 <= t && t <= 57 || 65 <= t && t <= 70 || 97 <= t && t <= 102;
}
function sx(t) {
  return 48 <= t && t <= 55;
}
function ax(t) {
  return 48 <= t && t <= 57;
}
function lx(t) {
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
          if (!ox(t.charCodeAt(i)))
            return !1;
          r = !0;
        }
      return r && n !== "_";
    }
    if (n === "o") {
      for (i++; i < e; i++)
        if (n = t[i], n !== "_") {
          if (!sx(t.charCodeAt(i)))
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
      if (!ax(t.charCodeAt(i)))
        return !1;
      r = !0;
    }
  return !(!r || n === "_");
}
function hx(t) {
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
function cx(t) {
  return Object.prototype.toString.call(t) === "[object Number]" && t % 1 === 0 && !at.isNegativeZero(t);
}
var ux = new ot("tag:yaml.org,2002:int", {
  kind: "scalar",
  resolve: lx,
  construct: hx,
  predicate: cx,
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
}), fx = new RegExp(
  // 2.5e4, 2.5 and integers
  "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
);
function dx(t) {
  return !(t === null || !fx.test(t) || // Quick hack to not allow integers end with `_`
  // Probably should update regexp & check speed
  t[t.length - 1] === "_");
}
function px(t) {
  var e, i;
  return e = t.replace(/_/g, "").toLowerCase(), i = e[0] === "-" ? -1 : 1, "+-".indexOf(e[0]) >= 0 && (e = e.slice(1)), e === ".inf" ? i === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : e === ".nan" ? NaN : i * parseFloat(e, 10);
}
var gx = /^[-+]?[0-9]+e/;
function mx(t, e) {
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
  return i = t.toString(10), gx.test(i) ? i.replace("e", ".e") : i;
}
function yx(t) {
  return Object.prototype.toString.call(t) === "[object Number]" && (t % 1 !== 0 || at.isNegativeZero(t));
}
var _x = new ot("tag:yaml.org,2002:float", {
  kind: "scalar",
  resolve: dx,
  construct: px,
  predicate: yx,
  represent: mx,
  defaultStyle: "lowercase"
}), Il = KC.extend({
  implicit: [
    tx,
    nx,
    ux,
    _x
  ]
}), Cx = Il, Dl = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
), Nl = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
);
function xx(t) {
  return t === null ? !1 : Dl.exec(t) !== null || Nl.exec(t) !== null;
}
function bx(t) {
  var e, i, r, n, o, s, a, l = 0, h = null, u, f, c;
  if (e = Dl.exec(t), e === null && (e = Nl.exec(t)), e === null)
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
function Tx(t) {
  return t.toISOString();
}
var kx = new ot("tag:yaml.org,2002:timestamp", {
  kind: "scalar",
  resolve: xx,
  construct: bx,
  instanceOf: Date,
  represent: Tx
});
function Sx(t) {
  return t === "<<" || t === null;
}
var vx = new ot("tag:yaml.org,2002:merge", {
  kind: "scalar",
  resolve: Sx
}), Qn = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
function wx(t) {
  if (t === null)
    return !1;
  var e, i, r = 0, n = t.length, o = Qn;
  for (i = 0; i < n; i++)
    if (e = o.indexOf(t.charAt(i)), !(e > 64)) {
      if (e < 0)
        return !1;
      r += 6;
    }
  return r % 8 === 0;
}
function Bx(t) {
  var e, i, r = t.replace(/[\r\n=]/g, ""), n = r.length, o = Qn, s = 0, a = [];
  for (e = 0; e < n; e++)
    e % 4 === 0 && e && (a.push(s >> 16 & 255), a.push(s >> 8 & 255), a.push(s & 255)), s = s << 6 | o.indexOf(r.charAt(e));
  return i = n % 4 * 6, i === 0 ? (a.push(s >> 16 & 255), a.push(s >> 8 & 255), a.push(s & 255)) : i === 18 ? (a.push(s >> 10 & 255), a.push(s >> 2 & 255)) : i === 12 && a.push(s >> 4 & 255), new Uint8Array(a);
}
function Fx(t) {
  var e = "", i = 0, r, n, o = t.length, s = Qn;
  for (r = 0; r < o; r++)
    r % 3 === 0 && r && (e += s[i >> 18 & 63], e += s[i >> 12 & 63], e += s[i >> 6 & 63], e += s[i & 63]), i = (i << 8) + t[r];
  return n = o % 3, n === 0 ? (e += s[i >> 18 & 63], e += s[i >> 12 & 63], e += s[i >> 6 & 63], e += s[i & 63]) : n === 2 ? (e += s[i >> 10 & 63], e += s[i >> 4 & 63], e += s[i << 2 & 63], e += s[64]) : n === 1 && (e += s[i >> 2 & 63], e += s[i << 4 & 63], e += s[64], e += s[64]), e;
}
function Ax(t) {
  return Object.prototype.toString.call(t) === "[object Uint8Array]";
}
var Lx = new ot("tag:yaml.org,2002:binary", {
  kind: "scalar",
  resolve: wx,
  construct: Bx,
  predicate: Ax,
  represent: Fx
}), Ex = Object.prototype.hasOwnProperty, Mx = Object.prototype.toString;
function Ox(t) {
  if (t === null)
    return !0;
  var e = [], i, r, n, o, s, a = t;
  for (i = 0, r = a.length; i < r; i += 1) {
    if (n = a[i], s = !1, Mx.call(n) !== "[object Object]")
      return !1;
    for (o in n)
      if (Ex.call(n, o))
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
function $x(t) {
  return t !== null ? t : [];
}
var Ix = new ot("tag:yaml.org,2002:omap", {
  kind: "sequence",
  resolve: Ox,
  construct: $x
}), Dx = Object.prototype.toString;
function Nx(t) {
  if (t === null)
    return !0;
  var e, i, r, n, o, s = t;
  for (o = new Array(s.length), e = 0, i = s.length; e < i; e += 1) {
    if (r = s[e], Dx.call(r) !== "[object Object]" || (n = Object.keys(r), n.length !== 1))
      return !1;
    o[e] = [n[0], r[n[0]]];
  }
  return !0;
}
function Rx(t) {
  if (t === null)
    return [];
  var e, i, r, n, o, s = t;
  for (o = new Array(s.length), e = 0, i = s.length; e < i; e += 1)
    r = s[e], n = Object.keys(r), o[e] = [n[0], r[n[0]]];
  return o;
}
var Px = new ot("tag:yaml.org,2002:pairs", {
  kind: "sequence",
  resolve: Nx,
  construct: Rx
}), qx = Object.prototype.hasOwnProperty;
function zx(t) {
  if (t === null)
    return !0;
  var e, i = t;
  for (e in i)
    if (qx.call(i, e) && i[e] !== null)
      return !1;
  return !0;
}
function Wx(t) {
  return t !== null ? t : {};
}
var Hx = new ot("tag:yaml.org,2002:set", {
  kind: "mapping",
  resolve: zx,
  construct: Wx
}), jx = Cx.extend({
  implicit: [
    kx,
    vx
  ],
  explicit: [
    Lx,
    Ix,
    Px,
    Hx
  ]
}), re = Object.prototype.hasOwnProperty, rr = 1, Rl = 2, Pl = 3, nr = 4, Xr = 1, Ux = 2, Ts = 3, Yx = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, Gx = /[\x85\u2028\u2029]/, Vx = /[,\[\]\{\}]/, ql = /^(?:!|!!|![a-z\-]+!)$/i, zl = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
function ks(t) {
  return Object.prototype.toString.call(t);
}
function Mt(t) {
  return t === 10 || t === 13;
}
function ue(t) {
  return t === 9 || t === 32;
}
function dt(t) {
  return t === 9 || t === 32 || t === 10 || t === 13;
}
function ve(t) {
  return t === 44 || t === 91 || t === 93 || t === 123 || t === 125;
}
function Xx(t) {
  var e;
  return 48 <= t && t <= 57 ? t - 48 : (e = t | 32, 97 <= e && e <= 102 ? e - 97 + 10 : -1);
}
function Kx(t) {
  return t === 120 ? 2 : t === 117 ? 4 : t === 85 ? 8 : 0;
}
function Zx(t) {
  return 48 <= t && t <= 57 ? t - 48 : -1;
}
function Ss(t) {
  return t === 48 ? "\0" : t === 97 ? "\x07" : t === 98 ? "\b" : t === 116 || t === 9 ? "	" : t === 110 ? `
` : t === 118 ? "\v" : t === 102 ? "\f" : t === 114 ? "\r" : t === 101 ? "\x1B" : t === 32 ? " " : t === 34 ? '"' : t === 47 ? "/" : t === 92 ? "\\" : t === 78 ? "" : t === 95 ? " " : t === 76 ? "\u2028" : t === 80 ? "\u2029" : "";
}
function Jx(t) {
  return t <= 65535 ? String.fromCharCode(t) : String.fromCharCode(
    (t - 65536 >> 10) + 55296,
    (t - 65536 & 1023) + 56320
  );
}
var Wl = new Array(256), Hl = new Array(256);
for (var Se = 0; Se < 256; Se++)
  Wl[Se] = Ss(Se) ? 1 : 0, Hl[Se] = Ss(Se);
function Qx(t, e) {
  this.input = t, this.filename = e.filename || null, this.schema = e.schema || jx, this.onWarning = e.onWarning || null, this.legacy = e.legacy || !1, this.json = e.json || !1, this.listener = e.listener || null, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = t.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.firstTabInLine = -1, this.documents = [];
}
function jl(t, e) {
  var i = {
    name: t.filename,
    buffer: t.input.slice(0, -1),
    // omit trailing \0
    position: t.position,
    line: t.line,
    column: t.position - t.lineStart
  };
  return i.snippet = qC(i), new Ut(e, i);
}
function F(t, e) {
  throw jl(t, e);
}
function or(t, e) {
  t.onWarning && t.onWarning.call(null, jl(t, e));
}
var vs = {
  YAML: function(e, i, r) {
    var n, o, s;
    e.version !== null && F(e, "duplication of %YAML directive"), r.length !== 1 && F(e, "YAML directive accepts exactly one argument"), n = /^([0-9]+)\.([0-9]+)$/.exec(r[0]), n === null && F(e, "ill-formed argument of the YAML directive"), o = parseInt(n[1], 10), s = parseInt(n[2], 10), o !== 1 && F(e, "unacceptable YAML version of the document"), e.version = r[0], e.checkLineBreaks = s < 2, s !== 1 && s !== 2 && or(e, "unsupported YAML version of the document");
  },
  TAG: function(e, i, r) {
    var n, o;
    r.length !== 2 && F(e, "TAG directive accepts exactly two arguments"), n = r[0], o = r[1], ql.test(n) || F(e, "ill-formed tag handle (first argument) of the TAG directive"), re.call(e.tagMap, n) && F(e, 'there is a previously declared suffix for "' + n + '" tag handle'), zl.test(o) || F(e, "ill-formed tag prefix (second argument) of the TAG directive");
    try {
      o = decodeURIComponent(o);
    } catch {
      F(e, "tag prefix is malformed: " + o);
    }
    e.tagMap[n] = o;
  }
};
function ee(t, e, i, r) {
  var n, o, s, a;
  if (e < i) {
    if (a = t.input.slice(e, i), r)
      for (n = 0, o = a.length; n < o; n += 1)
        s = a.charCodeAt(n), s === 9 || 32 <= s && s <= 1114111 || F(t, "expected valid JSON character");
    else
      Yx.test(a) && F(t, "the stream contains non-printable characters");
    t.result += a;
  }
}
function ws(t, e, i, r) {
  var n, o, s, a;
  for (at.isObject(i) || F(t, "cannot merge mappings; the provided source object is unacceptable"), n = Object.keys(i), s = 0, a = n.length; s < a; s += 1)
    o = n[s], re.call(e, o) || (e[o] = i[o], r[o] = !0);
}
function we(t, e, i, r, n, o, s, a, l) {
  var h, u;
  if (Array.isArray(n))
    for (n = Array.prototype.slice.call(n), h = 0, u = n.length; h < u; h += 1)
      Array.isArray(n[h]) && F(t, "nested arrays are not supported inside keys"), typeof n == "object" && ks(n[h]) === "[object Object]" && (n[h] = "[object Object]");
  if (typeof n == "object" && ks(n) === "[object Object]" && (n = "[object Object]"), n = String(n), e === null && (e = {}), r === "tag:yaml.org,2002:merge")
    if (Array.isArray(o))
      for (h = 0, u = o.length; h < u; h += 1)
        ws(t, e, o[h], i);
    else
      ws(t, e, o, i);
  else
    !t.json && !re.call(i, n) && re.call(e, n) && (t.line = s || t.line, t.lineStart = a || t.lineStart, t.position = l || t.position, F(t, "duplicated mapping key")), n === "__proto__" ? Object.defineProperty(e, n, {
      configurable: !0,
      enumerable: !0,
      writable: !0,
      value: o
    }) : e[n] = o, delete i[n];
  return e;
}
function to(t) {
  var e;
  e = t.input.charCodeAt(t.position), e === 10 ? t.position++ : e === 13 ? (t.position++, t.input.charCodeAt(t.position) === 10 && t.position++) : F(t, "a line break is expected"), t.line += 1, t.lineStart = t.position, t.firstTabInLine = -1;
}
function J(t, e, i) {
  for (var r = 0, n = t.input.charCodeAt(t.position); n !== 0; ) {
    for (; ue(n); )
      n === 9 && t.firstTabInLine === -1 && (t.firstTabInLine = t.position), n = t.input.charCodeAt(++t.position);
    if (e && n === 35)
      do
        n = t.input.charCodeAt(++t.position);
      while (n !== 10 && n !== 13 && n !== 0);
    if (Mt(n))
      for (to(t), n = t.input.charCodeAt(t.position), r++, t.lineIndent = 0; n === 32; )
        t.lineIndent++, n = t.input.charCodeAt(++t.position);
    else
      break;
  }
  return i !== -1 && r !== 0 && t.lineIndent < i && or(t, "deficient indentation"), r;
}
function vr(t) {
  var e = t.position, i;
  return i = t.input.charCodeAt(e), !!((i === 45 || i === 46) && i === t.input.charCodeAt(e + 1) && i === t.input.charCodeAt(e + 2) && (e += 3, i = t.input.charCodeAt(e), i === 0 || dt(i)));
}
function eo(t, e) {
  e === 1 ? t.result += " " : e > 1 && (t.result += at.repeat(`
`, e - 1));
}
function tb(t, e, i) {
  var r, n, o, s, a, l, h, u, f = t.kind, c = t.result, p;
  if (p = t.input.charCodeAt(t.position), dt(p) || ve(p) || p === 35 || p === 38 || p === 42 || p === 33 || p === 124 || p === 62 || p === 39 || p === 34 || p === 37 || p === 64 || p === 96 || (p === 63 || p === 45) && (n = t.input.charCodeAt(t.position + 1), dt(n) || i && ve(n)))
    return !1;
  for (t.kind = "scalar", t.result = "", o = s = t.position, a = !1; p !== 0; ) {
    if (p === 58) {
      if (n = t.input.charCodeAt(t.position + 1), dt(n) || i && ve(n))
        break;
    } else if (p === 35) {
      if (r = t.input.charCodeAt(t.position - 1), dt(r))
        break;
    } else {
      if (t.position === t.lineStart && vr(t) || i && ve(p))
        break;
      if (Mt(p))
        if (l = t.line, h = t.lineStart, u = t.lineIndent, J(t, !1, -1), t.lineIndent >= e) {
          a = !0, p = t.input.charCodeAt(t.position);
          continue;
        } else {
          t.position = s, t.line = l, t.lineStart = h, t.lineIndent = u;
          break;
        }
    }
    a && (ee(t, o, s, !1), eo(t, t.line - l), o = s = t.position, a = !1), ue(p) || (s = t.position + 1), p = t.input.charCodeAt(++t.position);
  }
  return ee(t, o, s, !1), t.result ? !0 : (t.kind = f, t.result = c, !1);
}
function eb(t, e) {
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
      Mt(i) ? (ee(t, r, n, !0), eo(t, J(t, !1, e)), r = n = t.position) : t.position === t.lineStart && vr(t) ? F(t, "unexpected end of the document within a single quoted scalar") : (t.position++, n = t.position);
  F(t, "unexpected end of the stream within a single quoted scalar");
}
function ib(t, e) {
  var i, r, n, o, s, a;
  if (a = t.input.charCodeAt(t.position), a !== 34)
    return !1;
  for (t.kind = "scalar", t.result = "", t.position++, i = r = t.position; (a = t.input.charCodeAt(t.position)) !== 0; ) {
    if (a === 34)
      return ee(t, i, t.position, !0), t.position++, !0;
    if (a === 92) {
      if (ee(t, i, t.position, !0), a = t.input.charCodeAt(++t.position), Mt(a))
        J(t, !1, e);
      else if (a < 256 && Wl[a])
        t.result += Hl[a], t.position++;
      else if ((s = Kx(a)) > 0) {
        for (n = s, o = 0; n > 0; n--)
          a = t.input.charCodeAt(++t.position), (s = Xx(a)) >= 0 ? o = (o << 4) + s : F(t, "expected hexadecimal character");
        t.result += Jx(o), t.position++;
      } else
        F(t, "unknown escape sequence");
      i = r = t.position;
    } else
      Mt(a) ? (ee(t, i, r, !0), eo(t, J(t, !1, e)), i = r = t.position) : t.position === t.lineStart && vr(t) ? F(t, "unexpected end of the document within a double quoted scalar") : (t.position++, r = t.position);
  }
  F(t, "unexpected end of the stream within a double quoted scalar");
}
function rb(t, e) {
  var i = !0, r, n, o, s = t.tag, a, l = t.anchor, h, u, f, c, p, y = /* @__PURE__ */ Object.create(null), v, M, q, S;
  if (S = t.input.charCodeAt(t.position), S === 91)
    u = 93, p = !1, a = [];
  else if (S === 123)
    u = 125, p = !0, a = {};
  else
    return !1;
  for (t.anchor !== null && (t.anchorMap[t.anchor] = a), S = t.input.charCodeAt(++t.position); S !== 0; ) {
    if (J(t, !0, e), S = t.input.charCodeAt(t.position), S === u)
      return t.position++, t.tag = s, t.anchor = l, t.kind = p ? "mapping" : "sequence", t.result = a, !0;
    i ? S === 44 && F(t, "expected the node content, but found ','") : F(t, "missed comma between flow collection entries"), M = v = q = null, f = c = !1, S === 63 && (h = t.input.charCodeAt(t.position + 1), dt(h) && (f = c = !0, t.position++, J(t, !0, e))), r = t.line, n = t.lineStart, o = t.position, $e(t, e, rr, !1, !0), M = t.tag, v = t.result, J(t, !0, e), S = t.input.charCodeAt(t.position), (c || t.line === r) && S === 58 && (f = !0, S = t.input.charCodeAt(++t.position), J(t, !0, e), $e(t, e, rr, !1, !0), q = t.result), p ? we(t, a, y, M, v, q, r, n, o) : f ? a.push(we(t, null, y, M, v, q, r, n, o)) : a.push(v), J(t, !0, e), S = t.input.charCodeAt(t.position), S === 44 ? (i = !0, S = t.input.charCodeAt(++t.position)) : i = !1;
  }
  F(t, "unexpected end of the stream within a flow collection");
}
function nb(t, e) {
  var i, r, n = Xr, o = !1, s = !1, a = e, l = 0, h = !1, u, f;
  if (f = t.input.charCodeAt(t.position), f === 124)
    r = !1;
  else if (f === 62)
    r = !0;
  else
    return !1;
  for (t.kind = "scalar", t.result = ""; f !== 0; )
    if (f = t.input.charCodeAt(++t.position), f === 43 || f === 45)
      Xr === n ? n = f === 43 ? Ts : Ux : F(t, "repeat of a chomping mode identifier");
    else if ((u = Zx(f)) >= 0)
      u === 0 ? F(t, "bad explicit indentation width of a block scalar; it cannot be less than one") : s ? F(t, "repeat of an indentation width identifier") : (a = e + u - 1, s = !0);
    else
      break;
  if (ue(f)) {
    do
      f = t.input.charCodeAt(++t.position);
    while (ue(f));
    if (f === 35)
      do
        f = t.input.charCodeAt(++t.position);
      while (!Mt(f) && f !== 0);
  }
  for (; f !== 0; ) {
    for (to(t), t.lineIndent = 0, f = t.input.charCodeAt(t.position); (!s || t.lineIndent < a) && f === 32; )
      t.lineIndent++, f = t.input.charCodeAt(++t.position);
    if (!s && t.lineIndent > a && (a = t.lineIndent), Mt(f)) {
      l++;
      continue;
    }
    if (t.lineIndent < a) {
      n === Ts ? t.result += at.repeat(`
`, o ? 1 + l : l) : n === Xr && o && (t.result += `
`);
      break;
    }
    for (r ? ue(f) ? (h = !0, t.result += at.repeat(`
`, o ? 1 + l : l)) : h ? (h = !1, t.result += at.repeat(`
`, l + 1)) : l === 0 ? o && (t.result += " ") : t.result += at.repeat(`
`, l) : t.result += at.repeat(`
`, o ? 1 + l : l), o = !0, s = !0, l = 0, i = t.position; !Mt(f) && f !== 0; )
      f = t.input.charCodeAt(++t.position);
    ee(t, i, t.position, !1);
  }
  return !0;
}
function Bs(t, e) {
  var i, r = t.tag, n = t.anchor, o = [], s, a = !1, l;
  if (t.firstTabInLine !== -1)
    return !1;
  for (t.anchor !== null && (t.anchorMap[t.anchor] = o), l = t.input.charCodeAt(t.position); l !== 0 && (t.firstTabInLine !== -1 && (t.position = t.firstTabInLine, F(t, "tab characters must not be used in indentation")), !(l !== 45 || (s = t.input.charCodeAt(t.position + 1), !dt(s)))); ) {
    if (a = !0, t.position++, J(t, !0, -1) && t.lineIndent <= e) {
      o.push(null), l = t.input.charCodeAt(t.position);
      continue;
    }
    if (i = t.line, $e(t, e, Pl, !1, !0), o.push(t.result), J(t, !0, -1), l = t.input.charCodeAt(t.position), (t.line === i || t.lineIndent > e) && l !== 0)
      F(t, "bad indentation of a sequence entry");
    else if (t.lineIndent < e)
      break;
  }
  return a ? (t.tag = r, t.anchor = n, t.kind = "sequence", t.result = o, !0) : !1;
}
function ob(t, e, i) {
  var r, n, o, s, a, l, h = t.tag, u = t.anchor, f = {}, c = /* @__PURE__ */ Object.create(null), p = null, y = null, v = null, M = !1, q = !1, S;
  if (t.firstTabInLine !== -1)
    return !1;
  for (t.anchor !== null && (t.anchorMap[t.anchor] = f), S = t.input.charCodeAt(t.position); S !== 0; ) {
    if (!M && t.firstTabInLine !== -1 && (t.position = t.firstTabInLine, F(t, "tab characters must not be used in indentation")), r = t.input.charCodeAt(t.position + 1), o = t.line, (S === 63 || S === 58) && dt(r))
      S === 63 ? (M && (we(t, f, c, p, y, null, s, a, l), p = y = v = null), q = !0, M = !0, n = !0) : M ? (M = !1, n = !0) : F(t, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), t.position += 1, S = r;
    else {
      if (s = t.line, a = t.lineStart, l = t.position, !$e(t, i, Rl, !1, !0))
        break;
      if (t.line === o) {
        for (S = t.input.charCodeAt(t.position); ue(S); )
          S = t.input.charCodeAt(++t.position);
        if (S === 58)
          S = t.input.charCodeAt(++t.position), dt(S) || F(t, "a whitespace character is expected after the key-value separator within a block mapping"), M && (we(t, f, c, p, y, null, s, a, l), p = y = v = null), q = !0, M = !1, n = !1, p = t.tag, y = t.result;
        else if (q)
          F(t, "can not read an implicit mapping pair; a colon is missed");
        else
          return t.tag = h, t.anchor = u, !0;
      } else if (q)
        F(t, "can not read a block mapping entry; a multiline key may not be an implicit key");
      else
        return t.tag = h, t.anchor = u, !0;
    }
    if ((t.line === o || t.lineIndent > e) && (M && (s = t.line, a = t.lineStart, l = t.position), $e(t, e, nr, !0, n) && (M ? y = t.result : v = t.result), M || (we(t, f, c, p, y, v, s, a, l), p = y = v = null), J(t, !0, -1), S = t.input.charCodeAt(t.position)), (t.line === o || t.lineIndent > e) && S !== 0)
      F(t, "bad indentation of a mapping entry");
    else if (t.lineIndent < e)
      break;
  }
  return M && we(t, f, c, p, y, null, s, a, l), q && (t.tag = h, t.anchor = u, t.kind = "mapping", t.result = f), q;
}
function sb(t) {
  var e, i = !1, r = !1, n, o, s;
  if (s = t.input.charCodeAt(t.position), s !== 33)
    return !1;
  if (t.tag !== null && F(t, "duplication of a tag property"), s = t.input.charCodeAt(++t.position), s === 60 ? (i = !0, s = t.input.charCodeAt(++t.position)) : s === 33 ? (r = !0, n = "!!", s = t.input.charCodeAt(++t.position)) : n = "!", e = t.position, i) {
    do
      s = t.input.charCodeAt(++t.position);
    while (s !== 0 && s !== 62);
    t.position < t.length ? (o = t.input.slice(e, t.position), s = t.input.charCodeAt(++t.position)) : F(t, "unexpected end of the stream within a verbatim tag");
  } else {
    for (; s !== 0 && !dt(s); )
      s === 33 && (r ? F(t, "tag suffix cannot contain exclamation marks") : (n = t.input.slice(e - 1, t.position + 1), ql.test(n) || F(t, "named tag handle cannot contain such characters"), r = !0, e = t.position + 1)), s = t.input.charCodeAt(++t.position);
    o = t.input.slice(e, t.position), Vx.test(o) && F(t, "tag suffix cannot contain flow indicator characters");
  }
  o && !zl.test(o) && F(t, "tag name cannot contain such characters: " + o);
  try {
    o = decodeURIComponent(o);
  } catch {
    F(t, "tag name is malformed: " + o);
  }
  return i ? t.tag = o : re.call(t.tagMap, n) ? t.tag = t.tagMap[n] + o : n === "!" ? t.tag = "!" + o : n === "!!" ? t.tag = "tag:yaml.org,2002:" + o : F(t, 'undeclared tag handle "' + n + '"'), !0;
}
function ab(t) {
  var e, i;
  if (i = t.input.charCodeAt(t.position), i !== 38)
    return !1;
  for (t.anchor !== null && F(t, "duplication of an anchor property"), i = t.input.charCodeAt(++t.position), e = t.position; i !== 0 && !dt(i) && !ve(i); )
    i = t.input.charCodeAt(++t.position);
  return t.position === e && F(t, "name of an anchor node must contain at least one character"), t.anchor = t.input.slice(e, t.position), !0;
}
function lb(t) {
  var e, i, r;
  if (r = t.input.charCodeAt(t.position), r !== 42)
    return !1;
  for (r = t.input.charCodeAt(++t.position), e = t.position; r !== 0 && !dt(r) && !ve(r); )
    r = t.input.charCodeAt(++t.position);
  return t.position === e && F(t, "name of an alias node must contain at least one character"), i = t.input.slice(e, t.position), re.call(t.anchorMap, i) || F(t, 'unidentified alias "' + i + '"'), t.result = t.anchorMap[i], J(t, !0, -1), !0;
}
function $e(t, e, i, r, n) {
  var o, s, a, l = 1, h = !1, u = !1, f, c, p, y, v, M;
  if (t.listener !== null && t.listener("open", t), t.tag = null, t.anchor = null, t.kind = null, t.result = null, o = s = a = nr === i || Pl === i, r && J(t, !0, -1) && (h = !0, t.lineIndent > e ? l = 1 : t.lineIndent === e ? l = 0 : t.lineIndent < e && (l = -1)), l === 1)
    for (; sb(t) || ab(t); )
      J(t, !0, -1) ? (h = !0, a = o, t.lineIndent > e ? l = 1 : t.lineIndent === e ? l = 0 : t.lineIndent < e && (l = -1)) : a = !1;
  if (a && (a = h || n), (l === 1 || nr === i) && (rr === i || Rl === i ? v = e : v = e + 1, M = t.position - t.lineStart, l === 1 ? a && (Bs(t, M) || ob(t, M, v)) || rb(t, v) ? u = !0 : (s && nb(t, v) || eb(t, v) || ib(t, v) ? u = !0 : lb(t) ? (u = !0, (t.tag !== null || t.anchor !== null) && F(t, "alias node should not have any properties")) : tb(t, v, rr === i) && (u = !0, t.tag === null && (t.tag = "?")), t.anchor !== null && (t.anchorMap[t.anchor] = t.result)) : l === 0 && (u = a && Bs(t, M))), t.tag === null)
    t.anchor !== null && (t.anchorMap[t.anchor] = t.result);
  else if (t.tag === "?") {
    for (t.result !== null && t.kind !== "scalar" && F(t, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + t.kind + '"'), f = 0, c = t.implicitTypes.length; f < c; f += 1)
      if (y = t.implicitTypes[f], y.resolve(t.result)) {
        t.result = y.construct(t.result), t.tag = y.tag, t.anchor !== null && (t.anchorMap[t.anchor] = t.result);
        break;
      }
  } else if (t.tag !== "!") {
    if (re.call(t.typeMap[t.kind || "fallback"], t.tag))
      y = t.typeMap[t.kind || "fallback"][t.tag];
    else
      for (y = null, p = t.typeMap.multi[t.kind || "fallback"], f = 0, c = p.length; f < c; f += 1)
        if (t.tag.slice(0, p[f].tag.length) === p[f].tag) {
          y = p[f];
          break;
        }
    y || F(t, "unknown tag !<" + t.tag + ">"), t.result !== null && y.kind !== t.kind && F(t, "unacceptable node kind for !<" + t.tag + '> tag; it should be "' + y.kind + '", not "' + t.kind + '"'), y.resolve(t.result, t.tag) ? (t.result = y.construct(t.result, t.tag), t.anchor !== null && (t.anchorMap[t.anchor] = t.result)) : F(t, "cannot resolve a node with !<" + t.tag + "> explicit tag");
  }
  return t.listener !== null && t.listener("close", t), t.tag !== null || t.anchor !== null || u;
}
function hb(t) {
  var e = t.position, i, r, n, o = !1, s;
  for (t.version = null, t.checkLineBreaks = t.legacy, t.tagMap = /* @__PURE__ */ Object.create(null), t.anchorMap = /* @__PURE__ */ Object.create(null); (s = t.input.charCodeAt(t.position)) !== 0 && (J(t, !0, -1), s = t.input.charCodeAt(t.position), !(t.lineIndent > 0 || s !== 37)); ) {
    for (o = !0, s = t.input.charCodeAt(++t.position), i = t.position; s !== 0 && !dt(s); )
      s = t.input.charCodeAt(++t.position);
    for (r = t.input.slice(i, t.position), n = [], r.length < 1 && F(t, "directive name must not be less than one character in length"); s !== 0; ) {
      for (; ue(s); )
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
    s !== 0 && to(t), re.call(vs, r) ? vs[r](t, r, n) : or(t, 'unknown document directive "' + r + '"');
  }
  if (J(t, !0, -1), t.lineIndent === 0 && t.input.charCodeAt(t.position) === 45 && t.input.charCodeAt(t.position + 1) === 45 && t.input.charCodeAt(t.position + 2) === 45 ? (t.position += 3, J(t, !0, -1)) : o && F(t, "directives end mark is expected"), $e(t, t.lineIndent - 1, nr, !1, !0), J(t, !0, -1), t.checkLineBreaks && Gx.test(t.input.slice(e, t.position)) && or(t, "non-ASCII line breaks are interpreted as content"), t.documents.push(t.result), t.position === t.lineStart && vr(t)) {
    t.input.charCodeAt(t.position) === 46 && (t.position += 3, J(t, !0, -1));
    return;
  }
  if (t.position < t.length - 1)
    F(t, "end of the stream or a document separator is expected");
  else
    return;
}
function Ul(t, e) {
  t = String(t), e = e || {}, t.length !== 0 && (t.charCodeAt(t.length - 1) !== 10 && t.charCodeAt(t.length - 1) !== 13 && (t += `
`), t.charCodeAt(0) === 65279 && (t = t.slice(1)));
  var i = new Qx(t, e), r = t.indexOf("\0");
  for (r !== -1 && (i.position = r, F(i, "null byte is not allowed in input")), i.input += "\0"; i.input.charCodeAt(i.position) === 32; )
    i.lineIndent += 1, i.position += 1;
  for (; i.position < i.length - 1; )
    hb(i);
  return i.documents;
}
function cb(t, e, i) {
  e !== null && typeof e == "object" && typeof i > "u" && (i = e, e = null);
  var r = Ul(t, i);
  if (typeof e != "function")
    return r;
  for (var n = 0, o = r.length; n < o; n += 1)
    e(r[n]);
}
function ub(t, e) {
  var i = Ul(t, e);
  if (i.length !== 0) {
    if (i.length === 1)
      return i[0];
    throw new Ut("expected a single document in the stream, but found more");
  }
}
var fb = cb, db = ub, pb = {
  loadAll: fb,
  load: db
}, gb = Il, mb = pb.load;
function yb(t) {
  const e = t.match(La);
  if (!e)
    return {
      text: t,
      metadata: {}
    };
  let i = mb(e[1], {
    // To support config, we need JSON schema.
    // https://www.yaml.org/spec/1.2/spec.html#id2803231
    schema: gb
  }) ?? {};
  i = typeof i == "object" && !Array.isArray(i) ? i : {};
  const r = {};
  return i.displayMode && (r.displayMode = i.displayMode.toString()), i.title && (r.title = i.title.toString()), i.config && (r.config = i.config), {
    text: t.slice(e[0].length),
    metadata: r
  };
}
const _b = (t) => t.replace(/\r\n?/g, `
`).replace(
  /<(\w+)([^>]*)>/g,
  (e, i, r) => "<" + i + r.replace(/="([^"]*)"/g, "='$1'") + ">"
), Cb = (t) => {
  const { text: e, metadata: i } = yb(t), { displayMode: r, title: n, config: o = {} } = i;
  return r && (o.gantt || (o.gantt = {}), o.gantt.displayMode = r), { title: n, config: o, text: e };
}, xb = (t) => {
  const e = Ke.detectInit(t) ?? {}, i = Ke.detectDirective(t, "wrap");
  return Array.isArray(i) ? e.wrap = i.some(({ type: r }) => {
  }) : (i == null ? void 0 : i.type) === "wrap" && (e.wrap = !0), {
    text: m0(t),
    directive: e
  };
};
function bb(t) {
  const e = _b(t), i = Cb(e), r = xb(i.text), n = Za(i.config, r.directive);
  return t = BC(r.text), {
    code: t,
    title: i.title,
    config: n
  };
}
const Tb = 5e4, kb = "graph TB;a[Maximum text size in diagram exceeded];style a fill:#faa", Sb = "sandbox", vb = "loose", wb = "http://www.w3.org/2000/svg", Bb = "http://www.w3.org/1999/xlink", Fb = "http://www.w3.org/1999/xhtml", Ab = "100%", Lb = "100%", Eb = "border:0;margin:0;", Mb = "margin:0", Ob = "allow-top-navigation-by-user-activation allow-popups", $b = 'The "iframe" tag is not supported by your browser.', Ib = ["foreignobject"], Db = ["dominant-baseline"];
function Yl(t) {
  const e = bb(t);
  return tr(), ey(e.config ?? {}), e;
}
async function Nb(t, e) {
  Zn(), t = Yl(t).code;
  try {
    await Jn(t);
  } catch (i) {
    if (e != null && e.suppressErrors)
      return !1;
    throw i;
  }
  return !0;
}
const Rb = function(t) {
  let e = t;
  return e = e.replace(/style.*:\S*#.*;/g, function(i) {
    return i.substring(0, i.length - 1);
  }), e = e.replace(/classDef.*:\S*#.*;/g, function(i) {
    return i.substring(0, i.length - 1);
  }), e = e.replace(/#\w+;/g, function(i) {
    const r = i.substring(1, i.length - 1);
    return /^\+?\d+$/.test(r) ? "ﬂ°°" + r + "¶ß" : "ﬂ°" + r + "¶ß";
  }), e;
}, Pb = function(t) {
  return t.replace(/ﬂ°°/g, "&#").replace(/ﬂ°/g, "&").replace(/¶ß/g, ";");
}, Fs = (t, e, i = []) => `
.${t} ${e} { ${i.join(" !important; ")} !important; }`, qb = (t, e = {}) => {
  var r;
  let i = "";
  if (t.themeCSS !== void 0 && (i += `
${t.themeCSS}`), t.fontFamily !== void 0 && (i += `
:root { --mermaid-font-family: ${t.fontFamily}}`), t.altFontFamily !== void 0 && (i += `
:root { --mermaid-alt-font-family: ${t.altFontFamily}}`), !Yr(e)) {
    const a = t.htmlLabels || ((r = t.flowchart) == null ? void 0 : r.htmlLabels) ? ["> *", "span"] : ["rect", "polygon", "ellipse", "circle", "path"];
    for (const l in e) {
      const h = e[l];
      Yr(h.styles) || a.forEach((u) => {
        i += Fs(h.id, u, h.styles);
      }), Yr(h.textStyles) || (i += Fs(h.id, "tspan", h.textStyles));
    }
  }
  return i;
}, zb = (t, e, i, r) => {
  const n = qb(t, i), o = b_(e, n, t.themeVariables);
  return pn(X0(`${r}{${o}}`), Z0);
}, Wb = (t = "", e, i) => {
  let r = t;
  return !i && !e && (r = r.replace(
    /marker-end="url\([\d+./:=?A-Za-z-]*?#/g,
    'marker-end="url(#'
  )), r = Pb(r), r = r.replace(/<br>/g, "<br/>"), r;
}, Hb = (t = "", e) => {
  var n, o;
  const i = (o = (n = e == null ? void 0 : e.viewBox) == null ? void 0 : n.baseVal) != null && o.height ? e.viewBox.baseVal.height + "px" : Lb, r = btoa('<body style="' + Mb + '">' + t + "</body>");
  return `<iframe style="width:${Ab};height:${i};${Eb}" src="data:text/html;base64,${r}" sandbox="${Ob}">
  ${$b}
</iframe>`;
}, As = (t, e, i, r, n) => {
  const o = t.append("div");
  o.attr("id", i), r && o.attr("style", r);
  const s = o.append("svg").attr("id", e).attr("width", "100%").attr("xmlns", wb);
  return n && s.attr("xmlns:xlink", n), s.append("g"), t;
};
function Ls(t, e) {
  return t.append("iframe").attr("id", e).attr("style", "width: 100%; height: 100%;").attr("sandbox", "");
}
const jb = (t, e, i, r) => {
  var n, o, s;
  (n = t.getElementById(e)) == null || n.remove(), (o = t.getElementById(i)) == null || o.remove(), (s = t.getElementById(r)) == null || s.remove();
}, Ub = async function(t, e, i) {
  var E, k, C, O, x, D;
  Zn();
  const r = Yl(e);
  e = r.code;
  const n = $t();
  A.debug(n), e.length > ((n == null ? void 0 : n.maxTextSize) ?? Tb) && (e = kb);
  const o = "#" + t, s = "i" + t, a = "#" + s, l = "d" + t, h = "#" + l;
  let u = Ct("body");
  const f = n.securityLevel === Sb, c = n.securityLevel === vb, p = n.fontFamily;
  if (i !== void 0) {
    if (i && (i.innerHTML = ""), f) {
      const T = Ls(Ct(i), s);
      u = Ct(T.nodes()[0].contentDocument.body), u.node().style.margin = 0;
    } else
      u = Ct(i);
    As(u, t, l, `font-family: ${p}`, Bb);
  } else {
    if (jb(document, t, l, s), f) {
      const T = Ls(Ct("body"), s);
      u = Ct(T.nodes()[0].contentDocument.body), u.node().style.margin = 0;
    } else
      u = Ct("body");
    As(u, t, l);
  }
  e = Rb(e);
  let y, v;
  try {
    y = await Jn(e, { title: r.title });
  } catch (T) {
    y = new Ml("error"), v = T;
  }
  const M = u.select(h).node(), q = y.type, S = M.firstChild, z = S.firstChild, Q = (k = (E = y.renderer).getClasses) == null ? void 0 : k.call(E, e, y), X = zb(n, q, Q, o), G = document.createElement("style");
  G.innerHTML = X, S.insertBefore(G, z);
  try {
    await y.renderer.draw(e, t, ds, y);
  } catch (T) {
    throw R_.draw(e, t, ds), T;
  }
  const W = u.select(`${h} svg`), Xt = (O = (C = y.db).getAccTitle) == null ? void 0 : O.call(C), K = (D = (x = y.db).getAccDescription) == null ? void 0 : D.call(x);
  Gb(q, W, Xt, K), u.select(`[id="${t}"]`).selectAll("foreignobject > *").attr("xmlns", Fb);
  let I = u.select(h).node().innerHTML;
  if (A.debug("config.arrowMarkerAbsolute", n.arrowMarkerAbsolute), I = Wb(I, f, ka(n.arrowMarkerAbsolute)), f) {
    const T = u.select(h + " svg").node();
    I = Hb(I, T);
  } else
    c || (I = Gi.sanitize(I, {
      ADD_TAGS: Ib,
      ADD_ATTR: Db
    }));
  if (rC(), v)
    throw v;
  const At = Ct(f ? a : h).node();
  return At && "remove" in At && At.remove(), {
    svg: I,
    bindFunctions: y.db.bindFunctions
  };
};
function Yb(t = {}) {
  var i;
  t != null && t.fontFamily && !((i = t.themeVariables) != null && i.fontFamily) && (t.themeVariables || (t.themeVariables = {}), t.themeVariables.fontFamily = t.fontFamily), Q0(t), t != null && t.theme && t.theme in Yt ? t.themeVariables = Yt[t.theme].getThemeVariables(
    t.themeVariables
  ) : t && (t.themeVariables = Yt.default.getThemeVariables(t.themeVariables));
  const e = typeof t == "object" ? J0(t) : ol();
  bn(e.logLevel), Zn();
}
function Gb(t, e, i, r) {
  vC(e, t), wC(e, i, r, e.attr("id"));
}
const pe = Object.freeze({
  render: Ub,
  parse: Nb,
  getDiagramFromText: Jn,
  initialize: Yb,
  getConfig: $t,
  setConfig: sl,
  getSiteConfig: ol,
  updateSiteConfig: ty,
  reset: () => {
    tr();
  },
  globalReset: () => {
    tr(Me);
  },
  defaultConfig: Me
});
bn($t().logLevel);
tr($t());
const Vb = async () => {
  A.debug("Loading registered diagrams");
  const e = (await Promise.allSettled(
    Object.entries(Le).map(async ([i, { detector: r, loader: n }]) => {
      if (n)
        try {
          Kn(i);
        } catch {
          try {
            const { diagram: s, id: a } = await n();
            ir(a, s, r);
          } catch (s) {
            throw A.error(`Failed to load external diagram with key ${i}. Removing from detectors.`), delete Le[i], s;
          }
        }
    })
  )).filter((i) => i.status === "rejected");
  if (e.length > 0) {
    A.error(`Failed to load ${e.length} external diagrams`);
    for (const i of e)
      A.error(i);
    throw new Error(`Failed to load ${e.length} external diagrams`);
  }
}, Xb = (t, e, i) => {
  A.warn(t), Ka(t) ? (i && i(t.str, t.hash), e.push({ ...t, message: t.str, error: t })) : (i && i(t), t instanceof Error && e.push({
    str: t.message,
    message: t.message,
    hash: t.name,
    error: t
  }));
}, Gl = async function(t = {
  querySelector: ".mermaid"
}) {
  try {
    await Kb(t);
  } catch (e) {
    if (Ka(e) && A.error(e.str), xt.parseError && xt.parseError(e), !t.suppressErrors)
      throw A.error("Use the suppressErrors option to suppress these errors"), e;
  }
}, Kb = async function({ postRenderCallback: t, querySelector: e, nodes: i } = {
  querySelector: ".mermaid"
}) {
  const r = pe.getConfig();
  A.debug(`${t ? "" : "No "}Callback function found`);
  let n;
  if (i)
    n = i;
  else if (e)
    n = document.querySelectorAll(e);
  else
    throw new Error("Nodes and querySelector are both undefined");
  A.debug(`Found ${n.length} diagrams`), (r == null ? void 0 : r.startOnLoad) !== void 0 && (A.debug("Start On Load: " + (r == null ? void 0 : r.startOnLoad)), pe.updateSiteConfig({ startOnLoad: r == null ? void 0 : r.startOnLoad }));
  const o = new Ke.InitIDGenerator(r.deterministicIds, r.deterministicIDSeed);
  let s;
  const a = [];
  for (const l of Array.from(n)) {
    A.info("Rendering diagram: " + l.id);
    /*! Check if previously processed */
    if (l.getAttribute("data-processed"))
      continue;
    l.setAttribute("data-processed", "true");
    const h = `mermaid-${o.next()}`;
    s = l.innerHTML, s = ah(Ke.entityDecode(s)).trim().replace(/<br\s*\/?>/gi, "<br/>");
    const u = Ke.detectInit(s);
    u && A.debug("Detected early reinit: ", u);
    try {
      const { svg: f, bindFunctions: c } = await Zl(h, s, l);
      l.innerHTML = f, t && await t(h), c && c(l);
    } catch (f) {
      Xb(f, a, xt.parseError);
    }
  }
  if (a.length > 0)
    throw a[0];
}, Vl = function(t) {
  pe.initialize(t);
}, Zb = async function(t, e, i) {
  A.warn("mermaid.init is deprecated. Please use run instead."), t && Vl(t);
  const r = { postRenderCallback: i, querySelector: ".mermaid" };
  typeof e == "string" ? r.querySelector = e : e && (e instanceof HTMLElement ? r.nodes = [e] : r.nodes = e), await Gl(r);
}, Jb = async (t, {
  lazyLoad: e = !0
} = {}) => {
  Ma(...t), e === !1 && await Vb();
}, Xl = function() {
  if (xt.startOnLoad) {
    const { startOnLoad: t } = pe.getConfig();
    t && xt.run().catch((e) => A.error("Mermaid failed to initialize", e));
  }
};
if (typeof document < "u") {
  /*!
   * Wait for document loaded before starting the execution
   */
  window.addEventListener("load", Xl, !1);
}
const Qb = function(t) {
  xt.parseError = t;
}, sr = [];
let Kr = !1;
const Kl = async () => {
  if (!Kr) {
    for (Kr = !0; sr.length > 0; ) {
      const t = sr.shift();
      if (t)
        try {
          await t();
        } catch (e) {
          A.error("Error executing queue", e);
        }
    }
    Kr = !1;
  }
}, t1 = async (t, e) => new Promise((i, r) => {
  const n = () => new Promise((o, s) => {
    pe.parse(t, e).then(
      (a) => {
        o(a), i(a);
      },
      (a) => {
        var l;
        A.error("Error parsing", a), (l = xt.parseError) == null || l.call(xt, a), s(a), r(a);
      }
    );
  });
  sr.push(n), Kl().catch(r);
}), Zl = (t, e, i) => new Promise((r, n) => {
  const o = () => new Promise((s, a) => {
    pe.render(t, e, i).then(
      (l) => {
        s(l), r(l);
      },
      (l) => {
        var h;
        A.error("Error parsing", l), (h = xt.parseError) == null || h.call(xt, l), a(l), n(l);
      }
    );
  });
  sr.push(o), Kl().catch(n);
}), xt = {
  startOnLoad: !0,
  mermaidAPI: pe,
  parse: t1,
  render: Zl,
  init: Zb,
  run: Gl,
  registerExternalDiagrams: Jb,
  initialize: Vl,
  parseError: void 0,
  contentLoaded: Xl,
  setParseErrorHandler: Qb,
  detectType: mr
};
export {
  $t as $,
  Ge as A,
  B_ as B,
  Ot as C,
  F_ as D,
  T_ as E,
  Pf as F,
  d1 as G,
  F0 as H,
  O_ as I,
  vn as J,
  Ys as K,
  hi as L,
  uu as M,
  Xs as N,
  i1 as O,
  lh as P,
  hh as Q,
  ft as R,
  mt as S,
  uh as T,
  D_ as U,
  c1 as V,
  gp as W,
  Za as X,
  Wn as Y,
  hp as Z,
  $ as _,
  w_ as a,
  h1 as a$,
  wn as a0,
  Qt as a1,
  ti as a2,
  Ao as a3,
  _u as a4,
  x1 as a5,
  f0 as a6,
  w0 as a7,
  fi as a8,
  Ie as a9,
  es as aA,
  Pn as aB,
  qa as aC,
  ja as aD,
  Ga as aE,
  Lg as aF,
  Dt as aG,
  a0 as aH,
  l0 as aI,
  Nn as aJ,
  _n as aK,
  Vg as aL,
  Jm as aM,
  Yr as aN,
  u0 as aO,
  fr as aP,
  C1 as aQ,
  Pb as aR,
  A_ as aS,
  ci as aT,
  B as aU,
  L as aV,
  Ln as aW,
  o1 as aX,
  l1 as aY,
  Do as aZ,
  Io as a_,
  Xi as aa,
  Ji as ab,
  ge as ac,
  br as ad,
  Hm as ae,
  lC as af,
  ui as ag,
  Zi as ah,
  s0 as ai,
  Zm as aj,
  Nm as ak,
  Ua as al,
  Ra as am,
  $g as an,
  Ig as ao,
  CC as ap,
  ss as aq,
  Lm as ar,
  Dg as as,
  Rn as at,
  Mg as au,
  zg as av,
  De as aw,
  Dm as ax,
  ne as ay,
  yr as az,
  v_ as b,
  a1 as b0,
  r1 as b1,
  n1 as b2,
  f1 as b3,
  u1 as b4,
  s1 as b5,
  ah as b6,
  xt as b7,
  Xn as c,
  ii as d,
  Ms as e,
  In as f,
  S_ as g,
  nt as h,
  Qi as i,
  Ct as j,
  wl as k,
  A as l,
  O0 as m,
  Df as n,
  v0 as o,
  ka as p,
  _0 as q,
  __ as r,
  k_ as s,
  _1 as t,
  Us as u,
  Fh as v,
  E0 as w,
  nm as x,
  Dn as y,
  Ke as z
};
