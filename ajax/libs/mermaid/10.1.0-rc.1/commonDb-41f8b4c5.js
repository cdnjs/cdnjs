var Do = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function mh(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var xi = {}, Ro = {
  get exports() {
    return xi;
  },
  set exports(t) {
    xi = t;
  }
};
(function(t, e) {
  (function(i, r) {
    t.exports = r();
  })(Do, function() {
    var i = 1e3, r = 6e4, o = 36e5, n = "millisecond", s = "second", l = "minute", h = "hour", u = "day", f = "week", g = "month", x = "quarter", _ = "year", M = "date", z = "Invalid Date", j = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, Ot = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, nt = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(k) {
      var y = ["th", "st", "nd", "rd"], p = k % 100;
      return "[" + k + (y[(p - 20) % 10] || y[p] || y[0]) + "]";
    } }, Q = function(k, y, p) {
      var B = String(k);
      return !B || B.length >= y ? k : "" + Array(y + 1 - B.length).join(p) + k;
    }, H = { s: Q, z: function(k) {
      var y = -k.utcOffset(), p = Math.abs(y), B = Math.floor(p / 60), b = p % 60;
      return (y <= 0 ? "+" : "-") + Q(B, 2, "0") + ":" + Q(b, 2, "0");
    }, m: function k(y, p) {
      if (y.date() < p.date())
        return -k(p, y);
      var B = 12 * (p.year() - y.year()) + (p.month() - y.month()), b = y.clone().add(B, g), F = p - b < 0, w = y.clone().add(B + (F ? -1 : 1), g);
      return +(-(B + (p - b) / (F ? b - w : w - b)) || 0);
    }, a: function(k) {
      return k < 0 ? Math.ceil(k) || 0 : Math.floor(k);
    }, p: function(k) {
      return { M: g, y: _, w: f, d: u, D: M, h, m: l, s, ms: n, Q: x }[k] || String(k || "").toLowerCase().replace(/s$/, "");
    }, u: function(k) {
      return k === void 0;
    } }, at = "en", lt = {};
    lt[at] = nt;
    var It = function(k) {
      return k instanceof qt;
    }, Ht = function k(y, p, B) {
      var b;
      if (!y)
        return at;
      if (typeof y == "string") {
        var F = y.toLowerCase();
        lt[F] && (b = F), p && (lt[F] = p, b = F);
        var w = y.split("-");
        if (!b && w.length > 1)
          return k(w[0]);
      } else {
        var O = y.name;
        lt[O] = y, b = O;
      }
      return !B && b && (at = b), b || !B && at;
    }, W = function(k, y) {
      if (It(k))
        return k.clone();
      var p = typeof y == "object" ? y : {};
      return p.date = k, p.args = arguments, new qt(p);
    }, D = H;
    D.l = Ht, D.i = It, D.w = function(k, y) {
      return W(k, { locale: y.$L, utc: y.$u, x: y.$x, $offset: y.$offset });
    };
    var qt = function() {
      function k(p) {
        this.$L = Ht(p.locale, null, !0), this.parse(p);
      }
      var y = k.prototype;
      return y.parse = function(p) {
        this.$d = function(B) {
          var b = B.date, F = B.utc;
          if (b === null)
            return new Date(NaN);
          if (D.u(b))
            return new Date();
          if (b instanceof Date)
            return new Date(b);
          if (typeof b == "string" && !/Z$/i.test(b)) {
            var w = b.match(j);
            if (w) {
              var O = w[2] - 1 || 0, $ = (w[7] || "0").substring(0, 3);
              return F ? new Date(Date.UTC(w[1], O, w[3] || 1, w[4] || 0, w[5] || 0, w[6] || 0, $)) : new Date(w[1], O, w[3] || 1, w[4] || 0, w[5] || 0, w[6] || 0, $);
            }
          }
          return new Date(b);
        }(p), this.$x = p.x || {}, this.init();
      }, y.init = function() {
        var p = this.$d;
        this.$y = p.getFullYear(), this.$M = p.getMonth(), this.$D = p.getDate(), this.$W = p.getDay(), this.$H = p.getHours(), this.$m = p.getMinutes(), this.$s = p.getSeconds(), this.$ms = p.getMilliseconds();
      }, y.$utils = function() {
        return D;
      }, y.isValid = function() {
        return this.$d.toString() !== z;
      }, y.isSame = function(p, B) {
        var b = W(p);
        return this.startOf(B) <= b && b <= this.endOf(B);
      }, y.isAfter = function(p, B) {
        return W(p) < this.startOf(B);
      }, y.isBefore = function(p, B) {
        return this.endOf(B) < W(p);
      }, y.$g = function(p, B, b) {
        return D.u(p) ? this[B] : this.set(b, p);
      }, y.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, y.valueOf = function() {
        return this.$d.getTime();
      }, y.startOf = function(p, B) {
        var b = this, F = !!D.u(B) || B, w = D.p(p), O = function(bt, G) {
          var ct = D.w(b.$u ? Date.UTC(b.$y, G, bt) : new Date(b.$y, G, bt), b);
          return F ? ct : ct.endOf(u);
        }, $ = function(bt, G) {
          return D.w(b.toDate()[bt].apply(b.toDate("s"), (F ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(G)), b);
        }, A = this.$W, P = this.$M, R = this.$D, ht = "set" + (this.$u ? "UTC" : "");
        switch (w) {
          case _:
            return F ? O(1, 0) : O(31, 11);
          case g:
            return F ? O(1, P) : O(0, P + 1);
          case f:
            var N = this.$locale().weekStart || 0, dt = (A < N ? A + 7 : A) - N;
            return O(F ? R - dt : R + (6 - dt), P);
          case u:
          case M:
            return $(ht + "Hours", 0);
          case h:
            return $(ht + "Minutes", 1);
          case l:
            return $(ht + "Seconds", 2);
          case s:
            return $(ht + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, y.endOf = function(p) {
        return this.startOf(p, !1);
      }, y.$set = function(p, B) {
        var b, F = D.p(p), w = "set" + (this.$u ? "UTC" : ""), O = (b = {}, b[u] = w + "Date", b[M] = w + "Date", b[g] = w + "Month", b[_] = w + "FullYear", b[h] = w + "Hours", b[l] = w + "Minutes", b[s] = w + "Seconds", b[n] = w + "Milliseconds", b)[F], $ = F === u ? this.$D + (B - this.$W) : B;
        if (F === g || F === _) {
          var A = this.clone().set(M, 1);
          A.$d[O]($), A.init(), this.$d = A.set(M, Math.min(this.$D, A.daysInMonth())).$d;
        } else
          O && this.$d[O]($);
        return this.init(), this;
      }, y.set = function(p, B) {
        return this.clone().$set(p, B);
      }, y.get = function(p) {
        return this[D.p(p)]();
      }, y.add = function(p, B) {
        var b, F = this;
        p = Number(p);
        var w = D.p(B), O = function(P) {
          var R = W(F);
          return D.w(R.date(R.date() + Math.round(P * p)), F);
        };
        if (w === g)
          return this.set(g, this.$M + p);
        if (w === _)
          return this.set(_, this.$y + p);
        if (w === u)
          return O(1);
        if (w === f)
          return O(7);
        var $ = (b = {}, b[l] = r, b[h] = o, b[s] = i, b)[w] || 1, A = this.$d.getTime() + p * $;
        return D.w(A, this);
      }, y.subtract = function(p, B) {
        return this.add(-1 * p, B);
      }, y.format = function(p) {
        var B = this, b = this.$locale();
        if (!this.isValid())
          return b.invalidDate || z;
        var F = p || "YYYY-MM-DDTHH:mm:ssZ", w = D.z(this), O = this.$H, $ = this.$m, A = this.$M, P = b.weekdays, R = b.months, ht = function(G, ct, Ut, Dt) {
          return G && (G[ct] || G(B, F)) || Ut[ct].slice(0, Dt);
        }, N = function(G) {
          return D.s(O % 12 || 12, G, "0");
        }, dt = b.meridiem || function(G, ct, Ut) {
          var Dt = G < 12 ? "AM" : "PM";
          return Ut ? Dt.toLowerCase() : Dt;
        }, bt = { YY: String(this.$y).slice(-2), YYYY: this.$y, M: A + 1, MM: D.s(A + 1, 2, "0"), MMM: ht(b.monthsShort, A, R, 3), MMMM: ht(R, A), D: this.$D, DD: D.s(this.$D, 2, "0"), d: String(this.$W), dd: ht(b.weekdaysMin, this.$W, P, 2), ddd: ht(b.weekdaysShort, this.$W, P, 3), dddd: P[this.$W], H: String(O), HH: D.s(O, 2, "0"), h: N(1), hh: N(2), a: dt(O, $, !0), A: dt(O, $, !1), m: String($), mm: D.s($, 2, "0"), s: String(this.$s), ss: D.s(this.$s, 2, "0"), SSS: D.s(this.$ms, 3, "0"), Z: w };
        return F.replace(Ot, function(G, ct) {
          return ct || bt[G] || w.replace(":", "");
        });
      }, y.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, y.diff = function(p, B, b) {
        var F, w = D.p(B), O = W(p), $ = (O.utcOffset() - this.utcOffset()) * r, A = this - O, P = D.m(this, O);
        return P = (F = {}, F[_] = P / 12, F[g] = P, F[x] = P / 3, F[f] = (A - $) / 6048e5, F[u] = (A - $) / 864e5, F[h] = A / o, F[l] = A / r, F[s] = A / i, F)[w] || A, b ? P : D.a(P);
      }, y.daysInMonth = function() {
        return this.endOf(g).$D;
      }, y.$locale = function() {
        return lt[this.$L];
      }, y.locale = function(p, B) {
        if (!p)
          return this.$L;
        var b = this.clone(), F = Ht(p, B, !0);
        return F && (b.$L = F), b;
      }, y.clone = function() {
        return D.w(this.$d, this);
      }, y.toDate = function() {
        return new Date(this.valueOf());
      }, y.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, y.toISOString = function() {
        return this.$d.toISOString();
      }, y.toString = function() {
        return this.$d.toUTCString();
      }, k;
    }(), ie = qt.prototype;
    return W.prototype = ie, [["$ms", n], ["$s", s], ["$m", l], ["$H", h], ["$W", u], ["$M", g], ["$y", _], ["$D", M]].forEach(function(k) {
      ie[k[1]] = function(y) {
        return this.$g(y, k[0], k[1]);
      };
    }), W.extend = function(k, y) {
      return k.$i || (k(y, qt, W), k.$i = !0), W;
    }, W.locale = Ht, W.isDayjs = It, W.unix = function(k) {
      return W(1e3 * k);
    }, W.en = lt[at], W.Ls = lt, W.p = {}, W;
  });
})(Ro);
const No = xi, Bt = {
  trace: 0,
  debug: 1,
  info: 2,
  warn: 3,
  error: 4,
  fatal: 5
}, et = {
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
}, Ch = function(t = "fatal") {
  let e = Bt.fatal;
  typeof t == "string" ? (t = t.toLowerCase(), t in Bt && (e = Bt[t])) : typeof t == "number" && (e = t), et.trace = () => {
  }, et.debug = () => {
  }, et.info = () => {
  }, et.warn = () => {
  }, et.error = () => {
  }, et.fatal = () => {
  }, e <= Bt.fatal && (et.fatal = console.error ? console.error.bind(console, ut("FATAL"), "color: orange") : console.log.bind(console, "\x1B[35m", ut("FATAL"))), e <= Bt.error && (et.error = console.error ? console.error.bind(console, ut("ERROR"), "color: orange") : console.log.bind(console, "\x1B[31m", ut("ERROR"))), e <= Bt.warn && (et.warn = console.warn ? console.warn.bind(console, ut("WARN"), "color: orange") : console.log.bind(console, "\x1B[33m", ut("WARN"))), e <= Bt.info && (et.info = console.info ? console.info.bind(console, ut("INFO"), "color: lightblue") : console.log.bind(console, "\x1B[34m", ut("INFO"))), e <= Bt.debug && (et.debug = console.debug ? console.debug.bind(console, ut("DEBUG"), "color: lightgreen") : console.log.bind(console, "\x1B[32m", ut("DEBUG"))), e <= Bt.trace && (et.trace = console.debug ? console.debug.bind(console, ut("TRACE"), "color: lightgreen") : console.log.bind(console, "\x1B[32m", ut("TRACE")));
}, ut = (t) => `%c${No().format("ss.SSS")} : ${t} : `;
var zo = { value: () => {
} };
function Mr() {
  for (var t = 0, e = arguments.length, i = {}, r; t < e; ++t) {
    if (!(r = arguments[t] + "") || r in i || /[\s.]/.test(r))
      throw new Error("illegal type: " + r);
    i[r] = [];
  }
  return new Me(i);
}
function Me(t) {
  this._ = t;
}
function $o(t, e) {
  return t.trim().split(/^|\s+/).map(function(i) {
    var r = "", o = i.indexOf(".");
    if (o >= 0 && (r = i.slice(o + 1), i = i.slice(0, o)), i && !e.hasOwnProperty(i))
      throw new Error("unknown type: " + i);
    return { type: i, name: r };
  });
}
Me.prototype = Mr.prototype = {
  constructor: Me,
  on: function(t, e) {
    var i = this._, r = $o(t + "", i), o, n = -1, s = r.length;
    if (arguments.length < 2) {
      for (; ++n < s; )
        if ((o = (t = r[n]).type) && (o = Wo(i[o], t.name)))
          return o;
      return;
    }
    if (e != null && typeof e != "function")
      throw new Error("invalid callback: " + e);
    for (; ++n < s; )
      if (o = (t = r[n]).type)
        i[o] = ar(i[o], t.name, e);
      else if (e == null)
        for (o in i)
          i[o] = ar(i[o], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, e = this._;
    for (var i in e)
      t[i] = e[i].slice();
    return new Me(t);
  },
  call: function(t, e) {
    if ((o = arguments.length - 2) > 0)
      for (var i = new Array(o), r = 0, o, n; r < o; ++r)
        i[r] = arguments[r + 2];
    if (!this._.hasOwnProperty(t))
      throw new Error("unknown type: " + t);
    for (n = this._[t], r = 0, o = n.length; r < o; ++r)
      n[r].value.apply(e, i);
  },
  apply: function(t, e, i) {
    if (!this._.hasOwnProperty(t))
      throw new Error("unknown type: " + t);
    for (var r = this._[t], o = 0, n = r.length; o < n; ++o)
      r[o].value.apply(e, i);
  }
};
function Wo(t, e) {
  for (var i = 0, r = t.length, o; i < r; ++i)
    if ((o = t[i]).name === e)
      return o.value;
}
function ar(t, e, i) {
  for (var r = 0, o = t.length; r < o; ++r)
    if (t[r].name === e) {
      t[r] = zo, t = t.slice(0, r).concat(t.slice(r + 1));
      break;
    }
  return i != null && t.push({ name: e, value: i }), t;
}
var Ti = "http://www.w3.org/1999/xhtml";
const lr = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Ti,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function Xe(t) {
  var e = t += "", i = e.indexOf(":");
  return i >= 0 && (e = t.slice(0, i)) !== "xmlns" && (t = t.slice(i + 1)), lr.hasOwnProperty(e) ? { space: lr[e], local: t } : t;
}
function Po(t) {
  return function() {
    var e = this.ownerDocument, i = this.namespaceURI;
    return i === Ti && e.documentElement.namespaceURI === Ti ? e.createElement(t) : e.createElementNS(i, t);
  };
}
function Ho(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function Or(t) {
  var e = Xe(t);
  return (e.local ? Ho : Po)(e);
}
function qo() {
}
function Ii(t) {
  return t == null ? qo : function() {
    return this.querySelector(t);
  };
}
function Uo(t) {
  typeof t != "function" && (t = Ii(t));
  for (var e = this._groups, i = e.length, r = new Array(i), o = 0; o < i; ++o)
    for (var n = e[o], s = n.length, l = r[o] = new Array(s), h, u, f = 0; f < s; ++f)
      (h = n[f]) && (u = t.call(h, h.__data__, f, n)) && ("__data__" in h && (u.__data__ = h.__data__), l[f] = u);
  return new st(r, this._parents);
}
function Go(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function Vo() {
  return [];
}
function Ir(t) {
  return t == null ? Vo : function() {
    return this.querySelectorAll(t);
  };
}
function Yo(t) {
  return function() {
    return Go(t.apply(this, arguments));
  };
}
function Xo(t) {
  typeof t == "function" ? t = Yo(t) : t = Ir(t);
  for (var e = this._groups, i = e.length, r = [], o = [], n = 0; n < i; ++n)
    for (var s = e[n], l = s.length, h, u = 0; u < l; ++u)
      (h = s[u]) && (r.push(t.call(h, h.__data__, u, s)), o.push(h));
  return new st(r, o);
}
function Dr(t) {
  return function() {
    return this.matches(t);
  };
}
function Rr(t) {
  return function(e) {
    return e.matches(t);
  };
}
var jo = Array.prototype.find;
function Ko(t) {
  return function() {
    return jo.call(this.children, t);
  };
}
function Zo() {
  return this.firstElementChild;
}
function Jo(t) {
  return this.select(t == null ? Zo : Ko(typeof t == "function" ? t : Rr(t)));
}
var Qo = Array.prototype.filter;
function tn() {
  return Array.from(this.children);
}
function en(t) {
  return function() {
    return Qo.call(this.children, t);
  };
}
function rn(t) {
  return this.selectAll(t == null ? tn : en(typeof t == "function" ? t : Rr(t)));
}
function on(t) {
  typeof t != "function" && (t = Dr(t));
  for (var e = this._groups, i = e.length, r = new Array(i), o = 0; o < i; ++o)
    for (var n = e[o], s = n.length, l = r[o] = [], h, u = 0; u < s; ++u)
      (h = n[u]) && t.call(h, h.__data__, u, n) && l.push(h);
  return new st(r, this._parents);
}
function Nr(t) {
  return new Array(t.length);
}
function nn() {
  return new st(this._enter || this._groups.map(Nr), this._parents);
}
function We(t, e) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = e;
}
We.prototype = {
  constructor: We,
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
function sn(t) {
  return function() {
    return t;
  };
}
function an(t, e, i, r, o, n) {
  for (var s = 0, l, h = e.length, u = n.length; s < u; ++s)
    (l = e[s]) ? (l.__data__ = n[s], r[s] = l) : i[s] = new We(t, n[s]);
  for (; s < h; ++s)
    (l = e[s]) && (o[s] = l);
}
function ln(t, e, i, r, o, n, s) {
  var l, h, u = /* @__PURE__ */ new Map(), f = e.length, g = n.length, x = new Array(f), _;
  for (l = 0; l < f; ++l)
    (h = e[l]) && (x[l] = _ = s.call(h, h.__data__, l, e) + "", u.has(_) ? o[l] = h : u.set(_, h));
  for (l = 0; l < g; ++l)
    _ = s.call(t, n[l], l, n) + "", (h = u.get(_)) ? (r[l] = h, h.__data__ = n[l], u.delete(_)) : i[l] = new We(t, n[l]);
  for (l = 0; l < f; ++l)
    (h = e[l]) && u.get(x[l]) === h && (o[l] = h);
}
function hn(t) {
  return t.__data__;
}
function cn(t, e) {
  if (!arguments.length)
    return Array.from(this, hn);
  var i = e ? ln : an, r = this._parents, o = this._groups;
  typeof t != "function" && (t = sn(t));
  for (var n = o.length, s = new Array(n), l = new Array(n), h = new Array(n), u = 0; u < n; ++u) {
    var f = r[u], g = o[u], x = g.length, _ = un(t.call(f, f && f.__data__, u, r)), M = _.length, z = l[u] = new Array(M), j = s[u] = new Array(M), Ot = h[u] = new Array(x);
    i(f, g, z, j, Ot, _, e);
    for (var nt = 0, Q = 0, H, at; nt < M; ++nt)
      if (H = z[nt]) {
        for (nt >= Q && (Q = nt + 1); !(at = j[Q]) && ++Q < M; )
          ;
        H._next = at || null;
      }
  }
  return s = new st(s, r), s._enter = l, s._exit = h, s;
}
function un(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function fn() {
  return new st(this._exit || this._groups.map(Nr), this._parents);
}
function dn(t, e, i) {
  var r = this.enter(), o = this, n = this.exit();
  return typeof t == "function" ? (r = t(r), r && (r = r.selection())) : r = r.append(t + ""), e != null && (o = e(o), o && (o = o.selection())), i == null ? n.remove() : i(n), r && o ? r.merge(o).order() : o;
}
function gn(t) {
  for (var e = t.selection ? t.selection() : t, i = this._groups, r = e._groups, o = i.length, n = r.length, s = Math.min(o, n), l = new Array(o), h = 0; h < s; ++h)
    for (var u = i[h], f = r[h], g = u.length, x = l[h] = new Array(g), _, M = 0; M < g; ++M)
      (_ = u[M] || f[M]) && (x[M] = _);
  for (; h < o; ++h)
    l[h] = i[h];
  return new st(l, this._parents);
}
function pn() {
  for (var t = this._groups, e = -1, i = t.length; ++e < i; )
    for (var r = t[e], o = r.length - 1, n = r[o], s; --o >= 0; )
      (s = r[o]) && (n && s.compareDocumentPosition(n) ^ 4 && n.parentNode.insertBefore(s, n), n = s);
  return this;
}
function mn(t) {
  t || (t = Cn);
  function e(g, x) {
    return g && x ? t(g.__data__, x.__data__) : !g - !x;
  }
  for (var i = this._groups, r = i.length, o = new Array(r), n = 0; n < r; ++n) {
    for (var s = i[n], l = s.length, h = o[n] = new Array(l), u, f = 0; f < l; ++f)
      (u = s[f]) && (h[f] = u);
    h.sort(e);
  }
  return new st(o, this._parents).order();
}
function Cn(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function yn() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function bn() {
  return Array.from(this);
}
function _n() {
  for (var t = this._groups, e = 0, i = t.length; e < i; ++e)
    for (var r = t[e], o = 0, n = r.length; o < n; ++o) {
      var s = r[o];
      if (s)
        return s;
    }
  return null;
}
function xn() {
  let t = 0;
  for (const e of this)
    ++t;
  return t;
}
function Tn() {
  return !this.node();
}
function kn(t) {
  for (var e = this._groups, i = 0, r = e.length; i < r; ++i)
    for (var o = e[i], n = 0, s = o.length, l; n < s; ++n)
      (l = o[n]) && t.call(l, l.__data__, n, o);
  return this;
}
function Sn(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Bn(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function vn(t, e) {
  return function() {
    this.setAttribute(t, e);
  };
}
function wn(t, e) {
  return function() {
    this.setAttributeNS(t.space, t.local, e);
  };
}
function Ln(t, e) {
  return function() {
    var i = e.apply(this, arguments);
    i == null ? this.removeAttribute(t) : this.setAttribute(t, i);
  };
}
function Fn(t, e) {
  return function() {
    var i = e.apply(this, arguments);
    i == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, i);
  };
}
function An(t, e) {
  var i = Xe(t);
  if (arguments.length < 2) {
    var r = this.node();
    return i.local ? r.getAttributeNS(i.space, i.local) : r.getAttribute(i);
  }
  return this.each((e == null ? i.local ? Bn : Sn : typeof e == "function" ? i.local ? Fn : Ln : i.local ? wn : vn)(i, e));
}
function zr(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function En(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Mn(t, e, i) {
  return function() {
    this.style.setProperty(t, e, i);
  };
}
function On(t, e, i) {
  return function() {
    var r = e.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, i);
  };
}
function In(t, e, i) {
  return arguments.length > 1 ? this.each((e == null ? En : typeof e == "function" ? On : Mn)(t, e, i ?? "")) : Qt(this.node(), t);
}
function Qt(t, e) {
  return t.style.getPropertyValue(e) || zr(t).getComputedStyle(t, null).getPropertyValue(e);
}
function Dn(t) {
  return function() {
    delete this[t];
  };
}
function Rn(t, e) {
  return function() {
    this[t] = e;
  };
}
function Nn(t, e) {
  return function() {
    var i = e.apply(this, arguments);
    i == null ? delete this[t] : this[t] = i;
  };
}
function zn(t, e) {
  return arguments.length > 1 ? this.each((e == null ? Dn : typeof e == "function" ? Nn : Rn)(t, e)) : this.node()[t];
}
function $r(t) {
  return t.trim().split(/^|\s+/);
}
function Di(t) {
  return t.classList || new Wr(t);
}
function Wr(t) {
  this._node = t, this._names = $r(t.getAttribute("class") || "");
}
Wr.prototype = {
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
function Pr(t, e) {
  for (var i = Di(t), r = -1, o = e.length; ++r < o; )
    i.add(e[r]);
}
function Hr(t, e) {
  for (var i = Di(t), r = -1, o = e.length; ++r < o; )
    i.remove(e[r]);
}
function $n(t) {
  return function() {
    Pr(this, t);
  };
}
function Wn(t) {
  return function() {
    Hr(this, t);
  };
}
function Pn(t, e) {
  return function() {
    (e.apply(this, arguments) ? Pr : Hr)(this, t);
  };
}
function Hn(t, e) {
  var i = $r(t + "");
  if (arguments.length < 2) {
    for (var r = Di(this.node()), o = -1, n = i.length; ++o < n; )
      if (!r.contains(i[o]))
        return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? Pn : e ? $n : Wn)(i, e));
}
function qn() {
  this.textContent = "";
}
function Un(t) {
  return function() {
    this.textContent = t;
  };
}
function Gn(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.textContent = e ?? "";
  };
}
function Vn(t) {
  return arguments.length ? this.each(t == null ? qn : (typeof t == "function" ? Gn : Un)(t)) : this.node().textContent;
}
function Yn() {
  this.innerHTML = "";
}
function Xn(t) {
  return function() {
    this.innerHTML = t;
  };
}
function jn(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function Kn(t) {
  return arguments.length ? this.each(t == null ? Yn : (typeof t == "function" ? jn : Xn)(t)) : this.node().innerHTML;
}
function Zn() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Jn() {
  return this.each(Zn);
}
function Qn() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function ts() {
  return this.each(Qn);
}
function es(t) {
  var e = typeof t == "function" ? t : Or(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function is() {
  return null;
}
function rs(t, e) {
  var i = typeof t == "function" ? t : Or(t), r = e == null ? is : typeof e == "function" ? e : Ii(e);
  return this.select(function() {
    return this.insertBefore(i.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function os() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function ns() {
  return this.each(os);
}
function ss() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function as() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function ls(t) {
  return this.select(t ? as : ss);
}
function hs(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function cs(t) {
  return function(e) {
    t.call(this, e, this.__data__);
  };
}
function us(t) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var i = "", r = e.indexOf(".");
    return r >= 0 && (i = e.slice(r + 1), e = e.slice(0, r)), { type: e, name: i };
  });
}
function fs(t) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var i = 0, r = -1, o = e.length, n; i < o; ++i)
        n = e[i], (!t.type || n.type === t.type) && n.name === t.name ? this.removeEventListener(n.type, n.listener, n.options) : e[++r] = n;
      ++r ? e.length = r : delete this.__on;
    }
  };
}
function ds(t, e, i) {
  return function() {
    var r = this.__on, o, n = cs(e);
    if (r) {
      for (var s = 0, l = r.length; s < l; ++s)
        if ((o = r[s]).type === t.type && o.name === t.name) {
          this.removeEventListener(o.type, o.listener, o.options), this.addEventListener(o.type, o.listener = n, o.options = i), o.value = e;
          return;
        }
    }
    this.addEventListener(t.type, n, i), o = { type: t.type, name: t.name, value: e, listener: n, options: i }, r ? r.push(o) : this.__on = [o];
  };
}
function gs(t, e, i) {
  var r = us(t + ""), o, n = r.length, s;
  if (arguments.length < 2) {
    var l = this.node().__on;
    if (l) {
      for (var h = 0, u = l.length, f; h < u; ++h)
        for (o = 0, f = l[h]; o < n; ++o)
          if ((s = r[o]).type === f.type && s.name === f.name)
            return f.value;
    }
    return;
  }
  for (l = e ? ds : fs, o = 0; o < n; ++o)
    this.each(l(r[o], e, i));
  return this;
}
function qr(t, e, i) {
  var r = zr(t), o = r.CustomEvent;
  typeof o == "function" ? o = new o(e, i) : (o = r.document.createEvent("Event"), i ? (o.initEvent(e, i.bubbles, i.cancelable), o.detail = i.detail) : o.initEvent(e, !1, !1)), t.dispatchEvent(o);
}
function ps(t, e) {
  return function() {
    return qr(this, t, e);
  };
}
function ms(t, e) {
  return function() {
    return qr(this, t, e.apply(this, arguments));
  };
}
function Cs(t, e) {
  return this.each((typeof e == "function" ? ms : ps)(t, e));
}
function* ys() {
  for (var t = this._groups, e = 0, i = t.length; e < i; ++e)
    for (var r = t[e], o = 0, n = r.length, s; o < n; ++o)
      (s = r[o]) && (yield s);
}
var Ur = [null];
function st(t, e) {
  this._groups = t, this._parents = e;
}
function Ce() {
  return new st([[document.documentElement]], Ur);
}
function bs() {
  return this;
}
st.prototype = Ce.prototype = {
  constructor: st,
  select: Uo,
  selectAll: Xo,
  selectChild: Jo,
  selectChildren: rn,
  filter: on,
  data: cn,
  enter: nn,
  exit: fn,
  join: dn,
  merge: gn,
  selection: bs,
  order: pn,
  sort: mn,
  call: yn,
  nodes: bn,
  node: _n,
  size: xn,
  empty: Tn,
  each: kn,
  attr: An,
  style: In,
  property: zn,
  classed: Hn,
  text: Vn,
  html: Kn,
  raise: Jn,
  lower: ts,
  append: es,
  insert: rs,
  remove: ns,
  clone: ls,
  datum: hs,
  on: gs,
  dispatch: Cs,
  [Symbol.iterator]: ys
};
function yh(t) {
  return typeof t == "string" ? new st([[document.querySelector(t)]], [document.documentElement]) : new st([[t]], Ur);
}
function Ri(t, e, i) {
  t.prototype = e.prototype = i, i.constructor = t;
}
function Gr(t, e) {
  var i = Object.create(t.prototype);
  for (var r in e)
    i[r] = e[r];
  return i;
}
function ye() {
}
var de = 0.7, Pe = 1 / de, Zt = "\\s*([+-]?\\d+)\\s*", ge = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", _t = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", _s = /^#([0-9a-f]{3,8})$/, xs = new RegExp(`^rgb\\(${Zt},${Zt},${Zt}\\)$`), Ts = new RegExp(`^rgb\\(${_t},${_t},${_t}\\)$`), ks = new RegExp(`^rgba\\(${Zt},${Zt},${Zt},${ge}\\)$`), Ss = new RegExp(`^rgba\\(${_t},${_t},${_t},${ge}\\)$`), Bs = new RegExp(`^hsl\\(${ge},${_t},${_t}\\)$`), vs = new RegExp(`^hsla\\(${ge},${_t},${_t},${ge}\\)$`), hr = {
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
Ri(ye, pe, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: cr,
  // Deprecated! Use color.formatHex.
  formatHex: cr,
  formatHex8: ws,
  formatHsl: Ls,
  formatRgb: ur,
  toString: ur
});
function cr() {
  return this.rgb().formatHex();
}
function ws() {
  return this.rgb().formatHex8();
}
function Ls() {
  return Vr(this).formatHsl();
}
function ur() {
  return this.rgb().formatRgb();
}
function pe(t) {
  var e, i;
  return t = (t + "").trim().toLowerCase(), (e = _s.exec(t)) ? (i = e[1].length, e = parseInt(e[1], 16), i === 6 ? fr(e) : i === 3 ? new ot(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : i === 8 ? Be(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : i === 4 ? Be(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = xs.exec(t)) ? new ot(e[1], e[2], e[3], 1) : (e = Ts.exec(t)) ? new ot(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = ks.exec(t)) ? Be(e[1], e[2], e[3], e[4]) : (e = Ss.exec(t)) ? Be(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = Bs.exec(t)) ? pr(e[1], e[2] / 100, e[3] / 100, 1) : (e = vs.exec(t)) ? pr(e[1], e[2] / 100, e[3] / 100, e[4]) : hr.hasOwnProperty(t) ? fr(hr[t]) : t === "transparent" ? new ot(NaN, NaN, NaN, 0) : null;
}
function fr(t) {
  return new ot(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function Be(t, e, i, r) {
  return r <= 0 && (t = e = i = NaN), new ot(t, e, i, r);
}
function Fs(t) {
  return t instanceof ye || (t = pe(t)), t ? (t = t.rgb(), new ot(t.r, t.g, t.b, t.opacity)) : new ot();
}
function ki(t, e, i, r) {
  return arguments.length === 1 ? Fs(t) : new ot(t, e, i, r ?? 1);
}
function ot(t, e, i, r) {
  this.r = +t, this.g = +e, this.b = +i, this.opacity = +r;
}
Ri(ot, ki, Gr(ye, {
  brighter(t) {
    return t = t == null ? Pe : Math.pow(Pe, t), new ot(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? de : Math.pow(de, t), new ot(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new ot(Wt(this.r), Wt(this.g), Wt(this.b), He(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: dr,
  // Deprecated! Use color.formatHex.
  formatHex: dr,
  formatHex8: As,
  formatRgb: gr,
  toString: gr
}));
function dr() {
  return `#${$t(this.r)}${$t(this.g)}${$t(this.b)}`;
}
function As() {
  return `#${$t(this.r)}${$t(this.g)}${$t(this.b)}${$t((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function gr() {
  const t = He(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${Wt(this.r)}, ${Wt(this.g)}, ${Wt(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function He(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function Wt(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function $t(t) {
  return t = Wt(t), (t < 16 ? "0" : "") + t.toString(16);
}
function pr(t, e, i, r) {
  return r <= 0 ? t = e = i = NaN : i <= 0 || i >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new mt(t, e, i, r);
}
function Vr(t) {
  if (t instanceof mt)
    return new mt(t.h, t.s, t.l, t.opacity);
  if (t instanceof ye || (t = pe(t)), !t)
    return new mt();
  if (t instanceof mt)
    return t;
  t = t.rgb();
  var e = t.r / 255, i = t.g / 255, r = t.b / 255, o = Math.min(e, i, r), n = Math.max(e, i, r), s = NaN, l = n - o, h = (n + o) / 2;
  return l ? (e === n ? s = (i - r) / l + (i < r) * 6 : i === n ? s = (r - e) / l + 2 : s = (e - i) / l + 4, l /= h < 0.5 ? n + o : 2 - n - o, s *= 60) : l = h > 0 && h < 1 ? 0 : s, new mt(s, l, h, t.opacity);
}
function Es(t, e, i, r) {
  return arguments.length === 1 ? Vr(t) : new mt(t, e, i, r ?? 1);
}
function mt(t, e, i, r) {
  this.h = +t, this.s = +e, this.l = +i, this.opacity = +r;
}
Ri(mt, Es, Gr(ye, {
  brighter(t) {
    return t = t == null ? Pe : Math.pow(Pe, t), new mt(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? de : Math.pow(de, t), new mt(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, e = isNaN(t) || isNaN(this.s) ? 0 : this.s, i = this.l, r = i + (i < 0.5 ? i : 1 - i) * e, o = 2 * i - r;
    return new ot(
      di(t >= 240 ? t - 240 : t + 120, o, r),
      di(t, o, r),
      di(t < 120 ? t + 240 : t - 120, o, r),
      this.opacity
    );
  },
  clamp() {
    return new mt(mr(this.h), ve(this.s), ve(this.l), He(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = He(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${mr(this.h)}, ${ve(this.s) * 100}%, ${ve(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function mr(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function ve(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function di(t, e, i) {
  return (t < 60 ? e + (i - e) * t / 60 : t < 180 ? i : t < 240 ? e + (i - e) * (240 - t) / 60 : e) * 255;
}
const Ni = (t) => () => t;
function Yr(t, e) {
  return function(i) {
    return t + i * e;
  };
}
function Ms(t, e, i) {
  return t = Math.pow(t, i), e = Math.pow(e, i) - t, i = 1 / i, function(r) {
    return Math.pow(t + r * e, i);
  };
}
function bh(t, e) {
  var i = e - t;
  return i ? Yr(t, i > 180 || i < -180 ? i - 360 * Math.round(i / 360) : i) : Ni(isNaN(t) ? e : t);
}
function Os(t) {
  return (t = +t) == 1 ? Xr : function(e, i) {
    return i - e ? Ms(e, i, t) : Ni(isNaN(e) ? i : e);
  };
}
function Xr(t, e) {
  var i = e - t;
  return i ? Yr(t, i) : Ni(isNaN(t) ? e : t);
}
const Cr = function t(e) {
  var i = Os(e);
  function r(o, n) {
    var s = i((o = ki(o)).r, (n = ki(n)).r), l = i(o.g, n.g), h = i(o.b, n.b), u = Xr(o.opacity, n.opacity);
    return function(f) {
      return o.r = s(f), o.g = l(f), o.b = h(f), o.opacity = u(f), o + "";
    };
  }
  return r.gamma = t, r;
}(1);
function At(t, e) {
  return t = +t, e = +e, function(i) {
    return t * (1 - i) + e * i;
  };
}
var Si = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, gi = new RegExp(Si.source, "g");
function Is(t) {
  return function() {
    return t;
  };
}
function Ds(t) {
  return function(e) {
    return t(e) + "";
  };
}
function Rs(t, e) {
  var i = Si.lastIndex = gi.lastIndex = 0, r, o, n, s = -1, l = [], h = [];
  for (t = t + "", e = e + ""; (r = Si.exec(t)) && (o = gi.exec(e)); )
    (n = o.index) > i && (n = e.slice(i, n), l[s] ? l[s] += n : l[++s] = n), (r = r[0]) === (o = o[0]) ? l[s] ? l[s] += o : l[++s] = o : (l[++s] = null, h.push({ i: s, x: At(r, o) })), i = gi.lastIndex;
  return i < e.length && (n = e.slice(i), l[s] ? l[s] += n : l[++s] = n), l.length < 2 ? h[0] ? Ds(h[0].x) : Is(e) : (e = h.length, function(u) {
    for (var f = 0, g; f < e; ++f)
      l[(g = h[f]).i] = g.x(u);
    return l.join("");
  });
}
var yr = 180 / Math.PI, Bi = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function jr(t, e, i, r, o, n) {
  var s, l, h;
  return (s = Math.sqrt(t * t + e * e)) && (t /= s, e /= s), (h = t * i + e * r) && (i -= t * h, r -= e * h), (l = Math.sqrt(i * i + r * r)) && (i /= l, r /= l, h /= l), t * r < e * i && (t = -t, e = -e, h = -h, s = -s), {
    translateX: o,
    translateY: n,
    rotate: Math.atan2(e, t) * yr,
    skewX: Math.atan(h) * yr,
    scaleX: s,
    scaleY: l
  };
}
var we;
function Ns(t) {
  const e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return e.isIdentity ? Bi : jr(e.a, e.b, e.c, e.d, e.e, e.f);
}
function zs(t) {
  return t == null || (we || (we = document.createElementNS("http://www.w3.org/2000/svg", "g")), we.setAttribute("transform", t), !(t = we.transform.baseVal.consolidate())) ? Bi : (t = t.matrix, jr(t.a, t.b, t.c, t.d, t.e, t.f));
}
function Kr(t, e, i, r) {
  function o(u) {
    return u.length ? u.pop() + " " : "";
  }
  function n(u, f, g, x, _, M) {
    if (u !== g || f !== x) {
      var z = _.push("translate(", null, e, null, i);
      M.push({ i: z - 4, x: At(u, g) }, { i: z - 2, x: At(f, x) });
    } else
      (g || x) && _.push("translate(" + g + e + x + i);
  }
  function s(u, f, g, x) {
    u !== f ? (u - f > 180 ? f += 360 : f - u > 180 && (u += 360), x.push({ i: g.push(o(g) + "rotate(", null, r) - 2, x: At(u, f) })) : f && g.push(o(g) + "rotate(" + f + r);
  }
  function l(u, f, g, x) {
    u !== f ? x.push({ i: g.push(o(g) + "skewX(", null, r) - 2, x: At(u, f) }) : f && g.push(o(g) + "skewX(" + f + r);
  }
  function h(u, f, g, x, _, M) {
    if (u !== g || f !== x) {
      var z = _.push(o(_) + "scale(", null, ",", null, ")");
      M.push({ i: z - 4, x: At(u, g) }, { i: z - 2, x: At(f, x) });
    } else
      (g !== 1 || x !== 1) && _.push(o(_) + "scale(" + g + "," + x + ")");
  }
  return function(u, f) {
    var g = [], x = [];
    return u = t(u), f = t(f), n(u.translateX, u.translateY, f.translateX, f.translateY, g, x), s(u.rotate, f.rotate, g, x), l(u.skewX, f.skewX, g, x), h(u.scaleX, u.scaleY, f.scaleX, f.scaleY, g, x), u = f = null, function(_) {
      for (var M = -1, z = x.length, j; ++M < z; )
        g[(j = x[M]).i] = j.x(_);
      return g.join("");
    };
  };
}
var $s = Kr(Ns, "px, ", "px)", "deg)"), Ws = Kr(zs, ", ", ")", ")"), te = 0, ae = 0, ne = 0, Zr = 1e3, qe, le, Ue = 0, Pt = 0, je = 0, me = typeof performance == "object" && performance.now ? performance : Date, Jr = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function zi() {
  return Pt || (Jr(Ps), Pt = me.now() + je);
}
function Ps() {
  Pt = 0;
}
function Ge() {
  this._call = this._time = this._next = null;
}
Ge.prototype = Qr.prototype = {
  constructor: Ge,
  restart: function(t, e, i) {
    if (typeof t != "function")
      throw new TypeError("callback is not a function");
    i = (i == null ? zi() : +i) + (e == null ? 0 : +e), !this._next && le !== this && (le ? le._next = this : qe = this, le = this), this._call = t, this._time = i, vi();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, vi());
  }
};
function Qr(t, e, i) {
  var r = new Ge();
  return r.restart(t, e, i), r;
}
function Hs() {
  zi(), ++te;
  for (var t = qe, e; t; )
    (e = Pt - t._time) >= 0 && t._call.call(void 0, e), t = t._next;
  --te;
}
function br() {
  Pt = (Ue = me.now()) + je, te = ae = 0;
  try {
    Hs();
  } finally {
    te = 0, Us(), Pt = 0;
  }
}
function qs() {
  var t = me.now(), e = t - Ue;
  e > Zr && (je -= e, Ue = t);
}
function Us() {
  for (var t, e = qe, i, r = 1 / 0; e; )
    e._call ? (r > e._time && (r = e._time), t = e, e = e._next) : (i = e._next, e._next = null, e = t ? t._next = i : qe = i);
  le = t, vi(r);
}
function vi(t) {
  if (!te) {
    ae && (ae = clearTimeout(ae));
    var e = t - Pt;
    e > 24 ? (t < 1 / 0 && (ae = setTimeout(br, t - me.now() - je)), ne && (ne = clearInterval(ne))) : (ne || (Ue = me.now(), ne = setInterval(qs, Zr)), te = 1, Jr(br));
  }
}
function _r(t, e, i) {
  var r = new Ge();
  return e = e == null ? 0 : +e, r.restart((o) => {
    r.stop(), t(o + e);
  }, e, i), r;
}
var Gs = Mr("start", "end", "cancel", "interrupt"), Vs = [], to = 0, xr = 1, wi = 2, Oe = 3, Tr = 4, Li = 5, Ie = 6;
function Ke(t, e, i, r, o, n) {
  var s = t.__transition;
  if (!s)
    t.__transition = {};
  else if (i in s)
    return;
  Ys(t, i, {
    name: e,
    index: r,
    // For context during callback.
    group: o,
    // For context during callback.
    on: Gs,
    tween: Vs,
    time: n.time,
    delay: n.delay,
    duration: n.duration,
    ease: n.ease,
    timer: null,
    state: to
  });
}
function $i(t, e) {
  var i = yt(t, e);
  if (i.state > to)
    throw new Error("too late; already scheduled");
  return i;
}
function xt(t, e) {
  var i = yt(t, e);
  if (i.state > Oe)
    throw new Error("too late; already running");
  return i;
}
function yt(t, e) {
  var i = t.__transition;
  if (!i || !(i = i[e]))
    throw new Error("transition not found");
  return i;
}
function Ys(t, e, i) {
  var r = t.__transition, o;
  r[e] = i, i.timer = Qr(n, 0, i.time);
  function n(u) {
    i.state = xr, i.timer.restart(s, i.delay, i.time), i.delay <= u && s(u - i.delay);
  }
  function s(u) {
    var f, g, x, _;
    if (i.state !== xr)
      return h();
    for (f in r)
      if (_ = r[f], _.name === i.name) {
        if (_.state === Oe)
          return _r(s);
        _.state === Tr ? (_.state = Ie, _.timer.stop(), _.on.call("interrupt", t, t.__data__, _.index, _.group), delete r[f]) : +f < e && (_.state = Ie, _.timer.stop(), _.on.call("cancel", t, t.__data__, _.index, _.group), delete r[f]);
      }
    if (_r(function() {
      i.state === Oe && (i.state = Tr, i.timer.restart(l, i.delay, i.time), l(u));
    }), i.state = wi, i.on.call("start", t, t.__data__, i.index, i.group), i.state === wi) {
      for (i.state = Oe, o = new Array(x = i.tween.length), f = 0, g = -1; f < x; ++f)
        (_ = i.tween[f].value.call(t, t.__data__, i.index, i.group)) && (o[++g] = _);
      o.length = g + 1;
    }
  }
  function l(u) {
    for (var f = u < i.duration ? i.ease.call(null, u / i.duration) : (i.timer.restart(h), i.state = Li, 1), g = -1, x = o.length; ++g < x; )
      o[g].call(t, f);
    i.state === Li && (i.on.call("end", t, t.__data__, i.index, i.group), h());
  }
  function h() {
    i.state = Ie, i.timer.stop(), delete r[e];
    for (var u in r)
      return;
    delete t.__transition;
  }
}
function Xs(t, e) {
  var i = t.__transition, r, o, n = !0, s;
  if (i) {
    e = e == null ? null : e + "";
    for (s in i) {
      if ((r = i[s]).name !== e) {
        n = !1;
        continue;
      }
      o = r.state > wi && r.state < Li, r.state = Ie, r.timer.stop(), r.on.call(o ? "interrupt" : "cancel", t, t.__data__, r.index, r.group), delete i[s];
    }
    n && delete t.__transition;
  }
}
function js(t) {
  return this.each(function() {
    Xs(this, t);
  });
}
function Ks(t, e) {
  var i, r;
  return function() {
    var o = xt(this, t), n = o.tween;
    if (n !== i) {
      r = i = n;
      for (var s = 0, l = r.length; s < l; ++s)
        if (r[s].name === e) {
          r = r.slice(), r.splice(s, 1);
          break;
        }
    }
    o.tween = r;
  };
}
function Zs(t, e, i) {
  var r, o;
  if (typeof i != "function")
    throw new Error();
  return function() {
    var n = xt(this, t), s = n.tween;
    if (s !== r) {
      o = (r = s).slice();
      for (var l = { name: e, value: i }, h = 0, u = o.length; h < u; ++h)
        if (o[h].name === e) {
          o[h] = l;
          break;
        }
      h === u && o.push(l);
    }
    n.tween = o;
  };
}
function Js(t, e) {
  var i = this._id;
  if (t += "", arguments.length < 2) {
    for (var r = yt(this.node(), i).tween, o = 0, n = r.length, s; o < n; ++o)
      if ((s = r[o]).name === t)
        return s.value;
    return null;
  }
  return this.each((e == null ? Ks : Zs)(i, t, e));
}
function Wi(t, e, i) {
  var r = t._id;
  return t.each(function() {
    var o = xt(this, r);
    (o.value || (o.value = {}))[e] = i.apply(this, arguments);
  }), function(o) {
    return yt(o, r).value[e];
  };
}
function eo(t, e) {
  var i;
  return (typeof e == "number" ? At : e instanceof pe ? Cr : (i = pe(e)) ? (e = i, Cr) : Rs)(t, e);
}
function Qs(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function ta(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function ea(t, e, i) {
  var r, o = i + "", n;
  return function() {
    var s = this.getAttribute(t);
    return s === o ? null : s === r ? n : n = e(r = s, i);
  };
}
function ia(t, e, i) {
  var r, o = i + "", n;
  return function() {
    var s = this.getAttributeNS(t.space, t.local);
    return s === o ? null : s === r ? n : n = e(r = s, i);
  };
}
function ra(t, e, i) {
  var r, o, n;
  return function() {
    var s, l = i(this), h;
    return l == null ? void this.removeAttribute(t) : (s = this.getAttribute(t), h = l + "", s === h ? null : s === r && h === o ? n : (o = h, n = e(r = s, l)));
  };
}
function oa(t, e, i) {
  var r, o, n;
  return function() {
    var s, l = i(this), h;
    return l == null ? void this.removeAttributeNS(t.space, t.local) : (s = this.getAttributeNS(t.space, t.local), h = l + "", s === h ? null : s === r && h === o ? n : (o = h, n = e(r = s, l)));
  };
}
function na(t, e) {
  var i = Xe(t), r = i === "transform" ? Ws : eo;
  return this.attrTween(t, typeof e == "function" ? (i.local ? oa : ra)(i, r, Wi(this, "attr." + t, e)) : e == null ? (i.local ? ta : Qs)(i) : (i.local ? ia : ea)(i, r, e));
}
function sa(t, e) {
  return function(i) {
    this.setAttribute(t, e.call(this, i));
  };
}
function aa(t, e) {
  return function(i) {
    this.setAttributeNS(t.space, t.local, e.call(this, i));
  };
}
function la(t, e) {
  var i, r;
  function o() {
    var n = e.apply(this, arguments);
    return n !== r && (i = (r = n) && aa(t, n)), i;
  }
  return o._value = e, o;
}
function ha(t, e) {
  var i, r;
  function o() {
    var n = e.apply(this, arguments);
    return n !== r && (i = (r = n) && sa(t, n)), i;
  }
  return o._value = e, o;
}
function ca(t, e) {
  var i = "attr." + t;
  if (arguments.length < 2)
    return (i = this.tween(i)) && i._value;
  if (e == null)
    return this.tween(i, null);
  if (typeof e != "function")
    throw new Error();
  var r = Xe(t);
  return this.tween(i, (r.local ? la : ha)(r, e));
}
function ua(t, e) {
  return function() {
    $i(this, t).delay = +e.apply(this, arguments);
  };
}
function fa(t, e) {
  return e = +e, function() {
    $i(this, t).delay = e;
  };
}
function da(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? ua : fa)(e, t)) : yt(this.node(), e).delay;
}
function ga(t, e) {
  return function() {
    xt(this, t).duration = +e.apply(this, arguments);
  };
}
function pa(t, e) {
  return e = +e, function() {
    xt(this, t).duration = e;
  };
}
function ma(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? ga : pa)(e, t)) : yt(this.node(), e).duration;
}
function Ca(t, e) {
  if (typeof e != "function")
    throw new Error();
  return function() {
    xt(this, t).ease = e;
  };
}
function ya(t) {
  var e = this._id;
  return arguments.length ? this.each(Ca(e, t)) : yt(this.node(), e).ease;
}
function ba(t, e) {
  return function() {
    var i = e.apply(this, arguments);
    if (typeof i != "function")
      throw new Error();
    xt(this, t).ease = i;
  };
}
function _a(t) {
  if (typeof t != "function")
    throw new Error();
  return this.each(ba(this._id, t));
}
function xa(t) {
  typeof t != "function" && (t = Dr(t));
  for (var e = this._groups, i = e.length, r = new Array(i), o = 0; o < i; ++o)
    for (var n = e[o], s = n.length, l = r[o] = [], h, u = 0; u < s; ++u)
      (h = n[u]) && t.call(h, h.__data__, u, n) && l.push(h);
  return new wt(r, this._parents, this._name, this._id);
}
function Ta(t) {
  if (t._id !== this._id)
    throw new Error();
  for (var e = this._groups, i = t._groups, r = e.length, o = i.length, n = Math.min(r, o), s = new Array(r), l = 0; l < n; ++l)
    for (var h = e[l], u = i[l], f = h.length, g = s[l] = new Array(f), x, _ = 0; _ < f; ++_)
      (x = h[_] || u[_]) && (g[_] = x);
  for (; l < r; ++l)
    s[l] = e[l];
  return new wt(s, this._parents, this._name, this._id);
}
function ka(t) {
  return (t + "").trim().split(/^|\s+/).every(function(e) {
    var i = e.indexOf(".");
    return i >= 0 && (e = e.slice(0, i)), !e || e === "start";
  });
}
function Sa(t, e, i) {
  var r, o, n = ka(e) ? $i : xt;
  return function() {
    var s = n(this, t), l = s.on;
    l !== r && (o = (r = l).copy()).on(e, i), s.on = o;
  };
}
function Ba(t, e) {
  var i = this._id;
  return arguments.length < 2 ? yt(this.node(), i).on.on(t) : this.each(Sa(i, t, e));
}
function va(t) {
  return function() {
    var e = this.parentNode;
    for (var i in this.__transition)
      if (+i !== t)
        return;
    e && e.removeChild(this);
  };
}
function wa() {
  return this.on("end.remove", va(this._id));
}
function La(t) {
  var e = this._name, i = this._id;
  typeof t != "function" && (t = Ii(t));
  for (var r = this._groups, o = r.length, n = new Array(o), s = 0; s < o; ++s)
    for (var l = r[s], h = l.length, u = n[s] = new Array(h), f, g, x = 0; x < h; ++x)
      (f = l[x]) && (g = t.call(f, f.__data__, x, l)) && ("__data__" in f && (g.__data__ = f.__data__), u[x] = g, Ke(u[x], e, i, x, u, yt(f, i)));
  return new wt(n, this._parents, e, i);
}
function Fa(t) {
  var e = this._name, i = this._id;
  typeof t != "function" && (t = Ir(t));
  for (var r = this._groups, o = r.length, n = [], s = [], l = 0; l < o; ++l)
    for (var h = r[l], u = h.length, f, g = 0; g < u; ++g)
      if (f = h[g]) {
        for (var x = t.call(f, f.__data__, g, h), _, M = yt(f, i), z = 0, j = x.length; z < j; ++z)
          (_ = x[z]) && Ke(_, e, i, z, x, M);
        n.push(x), s.push(f);
      }
  return new wt(n, s, e, i);
}
var Aa = Ce.prototype.constructor;
function Ea() {
  return new Aa(this._groups, this._parents);
}
function Ma(t, e) {
  var i, r, o;
  return function() {
    var n = Qt(this, t), s = (this.style.removeProperty(t), Qt(this, t));
    return n === s ? null : n === i && s === r ? o : o = e(i = n, r = s);
  };
}
function io(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Oa(t, e, i) {
  var r, o = i + "", n;
  return function() {
    var s = Qt(this, t);
    return s === o ? null : s === r ? n : n = e(r = s, i);
  };
}
function Ia(t, e, i) {
  var r, o, n;
  return function() {
    var s = Qt(this, t), l = i(this), h = l + "";
    return l == null && (h = l = (this.style.removeProperty(t), Qt(this, t))), s === h ? null : s === r && h === o ? n : (o = h, n = e(r = s, l));
  };
}
function Da(t, e) {
  var i, r, o, n = "style." + e, s = "end." + n, l;
  return function() {
    var h = xt(this, t), u = h.on, f = h.value[n] == null ? l || (l = io(e)) : void 0;
    (u !== i || o !== f) && (r = (i = u).copy()).on(s, o = f), h.on = r;
  };
}
function Ra(t, e, i) {
  var r = (t += "") == "transform" ? $s : eo;
  return e == null ? this.styleTween(t, Ma(t, r)).on("end.style." + t, io(t)) : typeof e == "function" ? this.styleTween(t, Ia(t, r, Wi(this, "style." + t, e))).each(Da(this._id, t)) : this.styleTween(t, Oa(t, r, e), i).on("end.style." + t, null);
}
function Na(t, e, i) {
  return function(r) {
    this.style.setProperty(t, e.call(this, r), i);
  };
}
function za(t, e, i) {
  var r, o;
  function n() {
    var s = e.apply(this, arguments);
    return s !== o && (r = (o = s) && Na(t, s, i)), r;
  }
  return n._value = e, n;
}
function $a(t, e, i) {
  var r = "style." + (t += "");
  if (arguments.length < 2)
    return (r = this.tween(r)) && r._value;
  if (e == null)
    return this.tween(r, null);
  if (typeof e != "function")
    throw new Error();
  return this.tween(r, za(t, e, i ?? ""));
}
function Wa(t) {
  return function() {
    this.textContent = t;
  };
}
function Pa(t) {
  return function() {
    var e = t(this);
    this.textContent = e ?? "";
  };
}
function Ha(t) {
  return this.tween("text", typeof t == "function" ? Pa(Wi(this, "text", t)) : Wa(t == null ? "" : t + ""));
}
function qa(t) {
  return function(e) {
    this.textContent = t.call(this, e);
  };
}
function Ua(t) {
  var e, i;
  function r() {
    var o = t.apply(this, arguments);
    return o !== i && (e = (i = o) && qa(o)), e;
  }
  return r._value = t, r;
}
function Ga(t) {
  var e = "text";
  if (arguments.length < 1)
    return (e = this.tween(e)) && e._value;
  if (t == null)
    return this.tween(e, null);
  if (typeof t != "function")
    throw new Error();
  return this.tween(e, Ua(t));
}
function Va() {
  for (var t = this._name, e = this._id, i = ro(), r = this._groups, o = r.length, n = 0; n < o; ++n)
    for (var s = r[n], l = s.length, h, u = 0; u < l; ++u)
      if (h = s[u]) {
        var f = yt(h, e);
        Ke(h, t, i, u, s, {
          time: f.time + f.delay + f.duration,
          delay: 0,
          duration: f.duration,
          ease: f.ease
        });
      }
  return new wt(r, this._parents, t, i);
}
function Ya() {
  var t, e, i = this, r = i._id, o = i.size();
  return new Promise(function(n, s) {
    var l = { value: s }, h = { value: function() {
      --o === 0 && n();
    } };
    i.each(function() {
      var u = xt(this, r), f = u.on;
      f !== t && (e = (t = f).copy(), e._.cancel.push(l), e._.interrupt.push(l), e._.end.push(h)), u.on = e;
    }), o === 0 && n();
  });
}
var Xa = 0;
function wt(t, e, i, r) {
  this._groups = t, this._parents = e, this._name = i, this._id = r;
}
function ro() {
  return ++Xa;
}
var vt = Ce.prototype;
wt.prototype = {
  constructor: wt,
  select: La,
  selectAll: Fa,
  selectChild: vt.selectChild,
  selectChildren: vt.selectChildren,
  filter: xa,
  merge: Ta,
  selection: Ea,
  transition: Va,
  call: vt.call,
  nodes: vt.nodes,
  node: vt.node,
  size: vt.size,
  empty: vt.empty,
  each: vt.each,
  on: Ba,
  attr: na,
  attrTween: ca,
  style: Ra,
  styleTween: $a,
  text: Ha,
  textTween: Ga,
  remove: wa,
  tween: Js,
  delay: da,
  duration: ma,
  ease: ya,
  easeVarying: _a,
  end: Ya,
  [Symbol.iterator]: vt[Symbol.iterator]
};
function ja(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var Ka = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: ja
};
function Za(t, e) {
  for (var i; !(i = t.__transition) || !(i = i[e]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${e} not found`);
  return i;
}
function Ja(t) {
  var e, i;
  t instanceof wt ? (e = t._id, t = t._name) : (e = ro(), (i = Ka).time = zi(), t = t == null ? null : t + "");
  for (var r = this._groups, o = r.length, n = 0; n < o; ++n)
    for (var s = r[n], l = s.length, h, u = 0; u < l; ++u)
      (h = s[u]) && Ke(h, t, e, u, s, i || Za(h, e));
  return new wt(r, this._parents, t, e);
}
Ce.prototype.interrupt = js;
Ce.prototype.transition = Ja;
function he(t, e, i) {
  this.k = t, this.x = e, this.y = i;
}
he.prototype = {
  constructor: he,
  scale: function(t) {
    return t === 1 ? this : new he(this.k * t, this.x, this.y);
  },
  translate: function(t, e) {
    return t === 0 & e === 0 ? this : new he(this.k, this.x + this.k * t, this.y + this.k * e);
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
he.prototype;
/*! @license DOMPurify 2.4.5 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/2.4.5/LICENSE */
function Et(t) {
  return Et = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, Et(t);
}
function Fi(t, e) {
  return Fi = Object.setPrototypeOf || function(r, o) {
    return r.__proto__ = o, r;
  }, Fi(t, e);
}
function Qa() {
  if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
    return !1;
  if (typeof Proxy == "function")
    return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), !0;
  } catch {
    return !1;
  }
}
function De(t, e, i) {
  return Qa() ? De = Reflect.construct : De = function(o, n, s) {
    var l = [null];
    l.push.apply(l, n);
    var h = Function.bind.apply(o, l), u = new h();
    return s && Fi(u, s.prototype), u;
  }, De.apply(null, arguments);
}
function pt(t) {
  return tl(t) || el(t) || il(t) || rl();
}
function tl(t) {
  if (Array.isArray(t))
    return Ai(t);
}
function el(t) {
  if (typeof Symbol < "u" && t[Symbol.iterator] != null || t["@@iterator"] != null)
    return Array.from(t);
}
function il(t, e) {
  if (t) {
    if (typeof t == "string")
      return Ai(t, e);
    var i = Object.prototype.toString.call(t).slice(8, -1);
    if (i === "Object" && t.constructor && (i = t.constructor.name), i === "Map" || i === "Set")
      return Array.from(t);
    if (i === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i))
      return Ai(t, e);
  }
}
function Ai(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var i = 0, r = new Array(e); i < e; i++)
    r[i] = t[i];
  return r;
}
function rl() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
var ol = Object.hasOwnProperty, kr = Object.setPrototypeOf, nl = Object.isFrozen, sl = Object.getPrototypeOf, al = Object.getOwnPropertyDescriptor, J = Object.freeze, Ct = Object.seal, ll = Object.create, oo = typeof Reflect < "u" && Reflect, Ve = oo.apply, Ei = oo.construct;
Ve || (Ve = function(e, i, r) {
  return e.apply(i, r);
});
J || (J = function(e) {
  return e;
});
Ct || (Ct = function(e) {
  return e;
});
Ei || (Ei = function(e, i) {
  return De(e, pt(i));
});
var hl = ft(Array.prototype.forEach), Sr = ft(Array.prototype.pop), se = ft(Array.prototype.push), Re = ft(String.prototype.toLowerCase), pi = ft(String.prototype.toString), cl = ft(String.prototype.match), gt = ft(String.prototype.replace), ul = ft(String.prototype.indexOf), fl = ft(String.prototype.trim), K = ft(RegExp.prototype.test), mi = dl(TypeError);
function ft(t) {
  return function(e) {
    for (var i = arguments.length, r = new Array(i > 1 ? i - 1 : 0), o = 1; o < i; o++)
      r[o - 1] = arguments[o];
    return Ve(t, e, r);
  };
}
function dl(t) {
  return function() {
    for (var e = arguments.length, i = new Array(e), r = 0; r < e; r++)
      i[r] = arguments[r];
    return Ei(t, i);
  };
}
function E(t, e, i) {
  i = i || Re, kr && kr(t, null);
  for (var r = e.length; r--; ) {
    var o = e[r];
    if (typeof o == "string") {
      var n = i(o);
      n !== o && (nl(e) || (e[r] = n), o = n);
    }
    t[o] = !0;
  }
  return t;
}
function zt(t) {
  var e = ll(null), i;
  for (i in t)
    Ve(ol, t, [i]) === !0 && (e[i] = t[i]);
  return e;
}
function Le(t, e) {
  for (; t !== null; ) {
    var i = al(t, e);
    if (i) {
      if (i.get)
        return ft(i.get);
      if (typeof i.value == "function")
        return ft(i.value);
    }
    t = sl(t);
  }
  function r(o) {
    return console.warn("fallback value for", o), null;
  }
  return r;
}
var Br = J(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "section", "select", "shadow", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), Ci = J(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), yi = J(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), gl = J(["animate", "color-profile", "cursor", "discard", "fedropshadow", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), bi = J(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover"]), pl = J(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), vr = J(["#text"]), wr = J(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "pattern", "placeholder", "playsinline", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "xmlns", "slot"]), _i = J(["accent-height", "accumulate", "additive", "alignment-baseline", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), Lr = J(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), Fe = J(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), ml = Ct(/\{\{[\w\W]*|[\w\W]*\}\}/gm), Cl = Ct(/<%[\w\W]*|[\w\W]*%>/gm), yl = Ct(/\${[\w\W]*}/gm), bl = Ct(/^data-[\-\w.\u00B7-\uFFFF]/), _l = Ct(/^aria-[\-\w]+$/), xl = Ct(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
), Tl = Ct(/^(?:\w+script|data):/i), kl = Ct(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
), Sl = Ct(/^html$/i), Bl = function() {
  return typeof window > "u" ? null : window;
}, vl = function(e, i) {
  if (Et(e) !== "object" || typeof e.createPolicy != "function")
    return null;
  var r = null, o = "data-tt-policy-suffix";
  i.currentScript && i.currentScript.hasAttribute(o) && (r = i.currentScript.getAttribute(o));
  var n = "dompurify" + (r ? "#" + r : "");
  try {
    return e.createPolicy(n, {
      createHTML: function(l) {
        return l;
      },
      createScriptURL: function(l) {
        return l;
      }
    });
  } catch {
    return console.warn("TrustedTypes policy " + n + " could not be created."), null;
  }
};
function no() {
  var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : Bl(), e = function(a) {
    return no(a);
  };
  if (e.version = "2.4.5", e.removed = [], !t || !t.document || t.document.nodeType !== 9)
    return e.isSupported = !1, e;
  var i = t.document, r = t.document, o = t.DocumentFragment, n = t.HTMLTemplateElement, s = t.Node, l = t.Element, h = t.NodeFilter, u = t.NamedNodeMap, f = u === void 0 ? t.NamedNodeMap || t.MozNamedAttrMap : u, g = t.HTMLFormElement, x = t.DOMParser, _ = t.trustedTypes, M = l.prototype, z = Le(M, "cloneNode"), j = Le(M, "nextSibling"), Ot = Le(M, "childNodes"), nt = Le(M, "parentNode");
  if (typeof n == "function") {
    var Q = r.createElement("template");
    Q.content && Q.content.ownerDocument && (r = Q.content.ownerDocument);
  }
  var H = vl(_, i), at = H ? H.createHTML("") : "", lt = r, It = lt.implementation, Ht = lt.createNodeIterator, W = lt.createDocumentFragment, D = lt.getElementsByTagName, qt = i.importNode, ie = {};
  try {
    ie = zt(r).documentMode ? r.documentMode : {};
  } catch {
  }
  var k = {};
  e.isSupported = typeof nt == "function" && It && typeof It.createHTMLDocument < "u" && ie !== 9;
  var y = ml, p = Cl, B = yl, b = bl, F = _l, w = Tl, O = kl, $ = xl, A = null, P = E({}, [].concat(pt(Br), pt(Ci), pt(yi), pt(bi), pt(vr))), R = null, ht = E({}, [].concat(pt(wr), pt(_i), pt(Lr), pt(Fe))), N = Object.seal(Object.create(null, {
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
  })), dt = null, bt = null, G = !0, ct = !0, Ut = !1, Dt = !0, Gt = !1, Rt = !1, ri = !1, oi = !1, Vt = !1, be = !1, _e = !1, Gi = !0, Vi = !1, vo = "user-content-", ni = !0, re = !1, Yt = {}, Xt = null, Yi = E({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]), Xi = null, ji = E({}, ["audio", "video", "img", "source", "image", "track"]), si = null, Ki = E({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), xe = "http://www.w3.org/1998/Math/MathML", Te = "http://www.w3.org/2000/svg", Tt = "http://www.w3.org/1999/xhtml", jt = Tt, ai = !1, li = null, wo = E({}, [xe, Te, Tt], pi), Nt, Lo = ["application/xhtml+xml", "text/html"], Fo = "text/html", q, Kt = null, Ao = r.createElement("form"), Zi = function(a) {
    return a instanceof RegExp || a instanceof Function;
  }, hi = function(a) {
    Kt && Kt === a || ((!a || Et(a) !== "object") && (a = {}), a = zt(a), Nt = // eslint-disable-next-line unicorn/prefer-includes
    Lo.indexOf(a.PARSER_MEDIA_TYPE) === -1 ? Nt = Fo : Nt = a.PARSER_MEDIA_TYPE, q = Nt === "application/xhtml+xml" ? pi : Re, A = "ALLOWED_TAGS" in a ? E({}, a.ALLOWED_TAGS, q) : P, R = "ALLOWED_ATTR" in a ? E({}, a.ALLOWED_ATTR, q) : ht, li = "ALLOWED_NAMESPACES" in a ? E({}, a.ALLOWED_NAMESPACES, pi) : wo, si = "ADD_URI_SAFE_ATTR" in a ? E(
      zt(Ki),
      // eslint-disable-line indent
      a.ADD_URI_SAFE_ATTR,
      // eslint-disable-line indent
      q
      // eslint-disable-line indent
    ) : Ki, Xi = "ADD_DATA_URI_TAGS" in a ? E(
      zt(ji),
      // eslint-disable-line indent
      a.ADD_DATA_URI_TAGS,
      // eslint-disable-line indent
      q
      // eslint-disable-line indent
    ) : ji, Xt = "FORBID_CONTENTS" in a ? E({}, a.FORBID_CONTENTS, q) : Yi, dt = "FORBID_TAGS" in a ? E({}, a.FORBID_TAGS, q) : {}, bt = "FORBID_ATTR" in a ? E({}, a.FORBID_ATTR, q) : {}, Yt = "USE_PROFILES" in a ? a.USE_PROFILES : !1, G = a.ALLOW_ARIA_ATTR !== !1, ct = a.ALLOW_DATA_ATTR !== !1, Ut = a.ALLOW_UNKNOWN_PROTOCOLS || !1, Dt = a.ALLOW_SELF_CLOSE_IN_ATTR !== !1, Gt = a.SAFE_FOR_TEMPLATES || !1, Rt = a.WHOLE_DOCUMENT || !1, Vt = a.RETURN_DOM || !1, be = a.RETURN_DOM_FRAGMENT || !1, _e = a.RETURN_TRUSTED_TYPE || !1, oi = a.FORCE_BODY || !1, Gi = a.SANITIZE_DOM !== !1, Vi = a.SANITIZE_NAMED_PROPS || !1, ni = a.KEEP_CONTENT !== !1, re = a.IN_PLACE || !1, $ = a.ALLOWED_URI_REGEXP || $, jt = a.NAMESPACE || Tt, N = a.CUSTOM_ELEMENT_HANDLING || {}, a.CUSTOM_ELEMENT_HANDLING && Zi(a.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (N.tagNameCheck = a.CUSTOM_ELEMENT_HANDLING.tagNameCheck), a.CUSTOM_ELEMENT_HANDLING && Zi(a.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (N.attributeNameCheck = a.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), a.CUSTOM_ELEMENT_HANDLING && typeof a.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements == "boolean" && (N.allowCustomizedBuiltInElements = a.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), Gt && (ct = !1), be && (Vt = !0), Yt && (A = E({}, pt(vr)), R = [], Yt.html === !0 && (E(A, Br), E(R, wr)), Yt.svg === !0 && (E(A, Ci), E(R, _i), E(R, Fe)), Yt.svgFilters === !0 && (E(A, yi), E(R, _i), E(R, Fe)), Yt.mathMl === !0 && (E(A, bi), E(R, Lr), E(R, Fe))), a.ADD_TAGS && (A === P && (A = zt(A)), E(A, a.ADD_TAGS, q)), a.ADD_ATTR && (R === ht && (R = zt(R)), E(R, a.ADD_ATTR, q)), a.ADD_URI_SAFE_ATTR && E(si, a.ADD_URI_SAFE_ATTR, q), a.FORBID_CONTENTS && (Xt === Yi && (Xt = zt(Xt)), E(Xt, a.FORBID_CONTENTS, q)), ni && (A["#text"] = !0), Rt && E(A, ["html", "head", "body"]), A.table && (E(A, ["tbody"]), delete dt.tbody), J && J(a), Kt = a);
  }, Ji = E({}, ["mi", "mo", "mn", "ms", "mtext"]), Qi = E({}, ["foreignobject", "desc", "title", "annotation-xml"]), Eo = E({}, ["title", "style", "font", "a", "script"]), ke = E({}, Ci);
  E(ke, yi), E(ke, gl);
  var ci = E({}, bi);
  E(ci, pl);
  var Mo = function(a) {
    var d = nt(a);
    (!d || !d.tagName) && (d = {
      namespaceURI: jt,
      tagName: "template"
    });
    var C = Re(a.tagName), I = Re(d.tagName);
    return li[a.namespaceURI] ? a.namespaceURI === Te ? d.namespaceURI === Tt ? C === "svg" : d.namespaceURI === xe ? C === "svg" && (I === "annotation-xml" || Ji[I]) : Boolean(ke[C]) : a.namespaceURI === xe ? d.namespaceURI === Tt ? C === "math" : d.namespaceURI === Te ? C === "math" && Qi[I] : Boolean(ci[C]) : a.namespaceURI === Tt ? d.namespaceURI === Te && !Qi[I] || d.namespaceURI === xe && !Ji[I] ? !1 : !ci[C] && (Eo[C] || !ke[C]) : !!(Nt === "application/xhtml+xml" && li[a.namespaceURI]) : !1;
  }, kt = function(a) {
    se(e.removed, {
      element: a
    });
    try {
      a.parentNode.removeChild(a);
    } catch {
      try {
        a.outerHTML = at;
      } catch {
        a.remove();
      }
    }
  }, ui = function(a, d) {
    try {
      se(e.removed, {
        attribute: d.getAttributeNode(a),
        from: d
      });
    } catch {
      se(e.removed, {
        attribute: null,
        from: d
      });
    }
    if (d.removeAttribute(a), a === "is" && !R[a])
      if (Vt || be)
        try {
          kt(d);
        } catch {
        }
      else
        try {
          d.setAttribute(a, "");
        } catch {
        }
  }, tr = function(a) {
    var d, C;
    if (oi)
      a = "<remove></remove>" + a;
    else {
      var I = cl(a, /^[\r\n\t ]+/);
      C = I && I[0];
    }
    Nt === "application/xhtml+xml" && jt === Tt && (a = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + a + "</body></html>");
    var tt = H ? H.createHTML(a) : a;
    if (jt === Tt)
      try {
        d = new x().parseFromString(tt, Nt);
      } catch {
      }
    if (!d || !d.documentElement) {
      d = It.createDocument(jt, "template", null);
      try {
        d.documentElement.innerHTML = ai ? at : tt;
      } catch {
      }
    }
    var Y = d.body || d.documentElement;
    return a && C && Y.insertBefore(r.createTextNode(C), Y.childNodes[0] || null), jt === Tt ? D.call(d, Rt ? "html" : "body")[0] : Rt ? d.documentElement : Y;
  }, er = function(a) {
    return Ht.call(
      a.ownerDocument || a,
      a,
      // eslint-disable-next-line no-bitwise
      h.SHOW_ELEMENT | h.SHOW_COMMENT | h.SHOW_TEXT,
      null,
      !1
    );
  }, Oo = function(a) {
    return a instanceof g && (typeof a.nodeName != "string" || typeof a.textContent != "string" || typeof a.removeChild != "function" || !(a.attributes instanceof f) || typeof a.removeAttribute != "function" || typeof a.setAttribute != "function" || typeof a.namespaceURI != "string" || typeof a.insertBefore != "function" || typeof a.hasChildNodes != "function");
  }, oe = function(a) {
    return Et(s) === "object" ? a instanceof s : a && Et(a) === "object" && typeof a.nodeType == "number" && typeof a.nodeName == "string";
  }, St = function(a, d, C) {
    k[a] && hl(k[a], function(I) {
      I.call(e, d, C, Kt);
    });
  }, ir = function(a) {
    var d;
    if (St("beforeSanitizeElements", a, null), Oo(a) || K(/[\u0080-\uFFFF]/, a.nodeName))
      return kt(a), !0;
    var C = q(a.nodeName);
    if (St("uponSanitizeElement", a, {
      tagName: C,
      allowedTags: A
    }), a.hasChildNodes() && !oe(a.firstElementChild) && (!oe(a.content) || !oe(a.content.firstElementChild)) && K(/<[/\w]/g, a.innerHTML) && K(/<[/\w]/g, a.textContent) || C === "select" && K(/<template/i, a.innerHTML))
      return kt(a), !0;
    if (!A[C] || dt[C]) {
      if (!dt[C] && or(C) && (N.tagNameCheck instanceof RegExp && K(N.tagNameCheck, C) || N.tagNameCheck instanceof Function && N.tagNameCheck(C)))
        return !1;
      if (ni && !Xt[C]) {
        var I = nt(a) || a.parentNode, tt = Ot(a) || a.childNodes;
        if (tt && I)
          for (var Y = tt.length, V = Y - 1; V >= 0; --V)
            I.insertBefore(z(tt[V], !0), j(a));
      }
      return kt(a), !0;
    }
    return a instanceof l && !Mo(a) || (C === "noscript" || C === "noembed") && K(/<\/no(script|embed)/i, a.innerHTML) ? (kt(a), !0) : (Gt && a.nodeType === 3 && (d = a.textContent, d = gt(d, y, " "), d = gt(d, p, " "), d = gt(d, B, " "), a.textContent !== d && (se(e.removed, {
      element: a.cloneNode()
    }), a.textContent = d)), St("afterSanitizeElements", a, null), !1);
  }, rr = function(a, d, C) {
    if (Gi && (d === "id" || d === "name") && (C in r || C in Ao))
      return !1;
    if (!(ct && !bt[d] && K(b, d))) {
      if (!(G && K(F, d))) {
        if (!R[d] || bt[d]) {
          if (
            // First condition does a very basic check if a) it's basically a valid custom element tagname AND
            // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
            // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
            !(or(a) && (N.tagNameCheck instanceof RegExp && K(N.tagNameCheck, a) || N.tagNameCheck instanceof Function && N.tagNameCheck(a)) && (N.attributeNameCheck instanceof RegExp && K(N.attributeNameCheck, d) || N.attributeNameCheck instanceof Function && N.attributeNameCheck(d)) || // Alternative, second condition checks if it's an `is`-attribute, AND
            // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
            d === "is" && N.allowCustomizedBuiltInElements && (N.tagNameCheck instanceof RegExp && K(N.tagNameCheck, C) || N.tagNameCheck instanceof Function && N.tagNameCheck(C)))
          )
            return !1;
        } else if (!si[d]) {
          if (!K($, gt(C, O, ""))) {
            if (!((d === "src" || d === "xlink:href" || d === "href") && a !== "script" && ul(C, "data:") === 0 && Xi[a])) {
              if (!(Ut && !K(w, gt(C, O, "")))) {
                if (C)
                  return !1;
              }
            }
          }
        }
      }
    }
    return !0;
  }, or = function(a) {
    return a.indexOf("-") > 0;
  }, nr = function(a) {
    var d, C, I, tt;
    St("beforeSanitizeAttributes", a, null);
    var Y = a.attributes;
    if (Y) {
      var V = {
        attrName: "",
        attrValue: "",
        keepAttr: !0,
        allowedAttributes: R
      };
      for (tt = Y.length; tt--; ) {
        d = Y[tt];
        var Se = d, U = Se.name, fi = Se.namespaceURI;
        if (C = U === "value" ? d.value : fl(d.value), I = q(U), V.attrName = I, V.attrValue = C, V.keepAttr = !0, V.forceKeepAttr = void 0, St("uponSanitizeAttribute", a, V), C = V.attrValue, !V.forceKeepAttr && (ui(U, a), !!V.keepAttr)) {
          if (!Dt && K(/\/>/i, C)) {
            ui(U, a);
            continue;
          }
          Gt && (C = gt(C, y, " "), C = gt(C, p, " "), C = gt(C, B, " "));
          var sr = q(a.nodeName);
          if (rr(sr, I, C)) {
            if (Vi && (I === "id" || I === "name") && (ui(U, a), C = vo + C), H && Et(_) === "object" && typeof _.getAttributeType == "function" && !fi)
              switch (_.getAttributeType(sr, I)) {
                case "TrustedHTML":
                  C = H.createHTML(C);
                  break;
                case "TrustedScriptURL":
                  C = H.createScriptURL(C);
                  break;
              }
            try {
              fi ? a.setAttributeNS(fi, U, C) : a.setAttribute(U, C), Sr(e.removed);
            } catch {
            }
          }
        }
      }
      St("afterSanitizeAttributes", a, null);
    }
  }, Io = function T(a) {
    var d, C = er(a);
    for (St("beforeSanitizeShadowDOM", a, null); d = C.nextNode(); )
      St("uponSanitizeShadowNode", d, null), !ir(d) && (d.content instanceof o && T(d.content), nr(d));
    St("afterSanitizeShadowDOM", a, null);
  };
  return e.sanitize = function(T) {
    var a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, d, C, I, tt, Y;
    if (ai = !T, ai && (T = "<!-->"), typeof T != "string" && !oe(T)) {
      if (typeof T.toString != "function")
        throw mi("toString is not a function");
      if (T = T.toString(), typeof T != "string")
        throw mi("dirty is not a string, aborting");
    }
    if (!e.isSupported) {
      if (Et(t.toStaticHTML) === "object" || typeof t.toStaticHTML == "function") {
        if (typeof T == "string")
          return t.toStaticHTML(T);
        if (oe(T))
          return t.toStaticHTML(T.outerHTML);
      }
      return T;
    }
    if (ri || hi(a), e.removed = [], typeof T == "string" && (re = !1), re) {
      if (T.nodeName) {
        var V = q(T.nodeName);
        if (!A[V] || dt[V])
          throw mi("root node is forbidden and cannot be sanitized in-place");
      }
    } else if (T instanceof s)
      d = tr("<!---->"), C = d.ownerDocument.importNode(T, !0), C.nodeType === 1 && C.nodeName === "BODY" || C.nodeName === "HTML" ? d = C : d.appendChild(C);
    else {
      if (!Vt && !Gt && !Rt && // eslint-disable-next-line unicorn/prefer-includes
      T.indexOf("<") === -1)
        return H && _e ? H.createHTML(T) : T;
      if (d = tr(T), !d)
        return Vt ? null : _e ? at : "";
    }
    d && oi && kt(d.firstChild);
    for (var Se = er(re ? T : d); I = Se.nextNode(); )
      I.nodeType === 3 && I === tt || ir(I) || (I.content instanceof o && Io(I.content), nr(I), tt = I);
    if (tt = null, re)
      return T;
    if (Vt) {
      if (be)
        for (Y = W.call(d.ownerDocument); d.firstChild; )
          Y.appendChild(d.firstChild);
      else
        Y = d;
      return (R.shadowroot || R.shadowrootmod) && (Y = qt.call(i, Y, !0)), Y;
    }
    var U = Rt ? d.outerHTML : d.innerHTML;
    return Rt && A["!doctype"] && d.ownerDocument && d.ownerDocument.doctype && d.ownerDocument.doctype.name && K(Sl, d.ownerDocument.doctype.name) && (U = "<!DOCTYPE " + d.ownerDocument.doctype.name + `>
` + U), Gt && (U = gt(U, y, " "), U = gt(U, p, " "), U = gt(U, B, " ")), H && _e ? H.createHTML(U) : U;
  }, e.setConfig = function(T) {
    hi(T), ri = !0;
  }, e.clearConfig = function() {
    Kt = null, ri = !1;
  }, e.isValidAttribute = function(T, a, d) {
    Kt || hi({});
    var C = q(T), I = q(a);
    return rr(C, I, d);
  }, e.addHook = function(T, a) {
    typeof a == "function" && (k[T] = k[T] || [], se(k[T], a));
  }, e.removeHook = function(T) {
    if (k[T])
      return Sr(k[T]);
  }, e.removeHooks = function(T) {
    k[T] && (k[T] = []);
  }, e.removeAllHooks = function() {
    k = {};
  }, e;
}
var Mi = no();
const wl = (t) => t ? ao(t).replace(/\\n/g, "#br#").split("#br#") : [""], so = (t) => Mi.sanitize(t), Fr = (t, e) => {
  var i;
  if (((i = e.flowchart) == null ? void 0 : i.htmlLabels) !== !1) {
    const r = e.securityLevel;
    r === "antiscript" || r === "strict" ? t = so(t) : r !== "loose" && (t = ao(t), t = t.replace(/</g, "&lt;").replace(/>/g, "&gt;"), t = t.replace(/=/g, "&equals;"), t = El(t));
  }
  return t;
}, Ye = (t, e) => t && (e.dompurifyConfig ? t = Mi.sanitize(Fr(t, e), e.dompurifyConfig).toString() : t = Mi.sanitize(Fr(t, e), {
  FORBID_TAGS: ["style"]
}).toString(), t), Ll = (t, e) => typeof t == "string" ? Ye(t, e) : t.flat().map((i) => Ye(i, e)), Ze = /<br\s*\/?>/gi, Fl = (t) => Ze.test(t), Al = (t) => t.split(Ze), El = (t) => t.replace(/#br#/g, "<br/>"), ao = (t) => t.replace(Ze, "#br#"), Ml = (t) => {
  let e = "";
  return t && (e = window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.search, e = e.replaceAll(/\(/g, "\\("), e = e.replaceAll(/\)/g, "\\)")), e;
}, Ol = (t) => !(t === !1 || ["false", "null", "0"].includes(String(t).trim().toLowerCase())), Il = function(t) {
  let e = t;
  if (t.split("~").length - 1 >= 2) {
    let i = e;
    do
      e = i, i = e.replace(/~([^\s,:;]+)~/, "<$1>");
    while (i != e);
    return Il(i);
  } else
    return e;
}, _h = {
  getRows: wl,
  sanitizeText: Ye,
  sanitizeTextOrArray: Ll,
  hasBreaks: Fl,
  splitBreaks: Al,
  lineBreakRegex: Ze,
  removeScript: so,
  getUrl: Ml,
  evaluate: Ol
}, Ne = {
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
    const o = i < 0.5 ? i * (1 + e) : i + e - i * e, n = 2 * i - o;
    switch (r) {
      case "r":
        return Ne.hue2rgb(n, o, t + 1 / 3) * 255;
      case "g":
        return Ne.hue2rgb(n, o, t) * 255;
      case "b":
        return Ne.hue2rgb(n, o, t - 1 / 3) * 255;
    }
  },
  rgb2hsl: ({ r: t, g: e, b: i }, r) => {
    t /= 255, e /= 255, i /= 255;
    const o = Math.max(t, e, i), n = Math.min(t, e, i), s = (o + n) / 2;
    if (r === "l")
      return s * 100;
    if (o === n)
      return 0;
    const l = o - n, h = s > 0.5 ? l / (2 - o - n) : l / (o + n);
    if (r === "s")
      return h * 100;
    switch (o) {
      case t:
        return ((e - i) / l + (e < i ? 6 : 0)) * 60;
      case e:
        return ((i - t) / l + 2) * 60;
      case i:
        return ((t - e) / l + 4) * 60;
      default:
        return -1;
    }
  }
}, Dl = Ne, Rl = {
  /* API */
  clamp: (t, e, i) => e > i ? Math.min(e, Math.max(i, t)) : Math.min(i, Math.max(e, t)),
  round: (t) => Math.round(t * 1e10) / 1e10
}, Nl = Rl, zl = {
  /* API */
  dec2hex: (t) => {
    const e = Math.round(t).toString(16);
    return e.length > 1 ? e : `0${e}`;
  }
}, $l = zl, Wl = {
  channel: Dl,
  lang: Nl,
  unit: $l
}, L = Wl, Ft = {};
for (let t = 0; t <= 255; t++)
  Ft[t] = L.unit.dec2hex(t);
const X = {
  ALL: 0,
  RGB: 1,
  HSL: 2
};
class Pl {
  constructor() {
    this.type = X.ALL;
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
    this.type = X.ALL;
  }
  is(e) {
    return this.type === e;
  }
}
const Hl = Pl;
class ql {
  /* CONSTRUCTOR */
  constructor(e, i) {
    this.color = i, this.changed = !1, this.data = e, this.type = new Hl();
  }
  /* API */
  set(e, i) {
    return this.color = i, this.changed = !1, this.data = e, this.type.type = X.ALL, this;
  }
  /* HELPERS */
  _ensureHSL() {
    const e = this.data, { h: i, s: r, l: o } = e;
    i === void 0 && (e.h = L.channel.rgb2hsl(e, "h")), r === void 0 && (e.s = L.channel.rgb2hsl(e, "s")), o === void 0 && (e.l = L.channel.rgb2hsl(e, "l"));
  }
  _ensureRGB() {
    const e = this.data, { r: i, g: r, b: o } = e;
    i === void 0 && (e.r = L.channel.hsl2rgb(e, "r")), r === void 0 && (e.g = L.channel.hsl2rgb(e, "g")), o === void 0 && (e.b = L.channel.hsl2rgb(e, "b"));
  }
  /* GETTERS */
  get r() {
    const e = this.data, i = e.r;
    return !this.type.is(X.HSL) && i !== void 0 ? i : (this._ensureHSL(), L.channel.hsl2rgb(e, "r"));
  }
  get g() {
    const e = this.data, i = e.g;
    return !this.type.is(X.HSL) && i !== void 0 ? i : (this._ensureHSL(), L.channel.hsl2rgb(e, "g"));
  }
  get b() {
    const e = this.data, i = e.b;
    return !this.type.is(X.HSL) && i !== void 0 ? i : (this._ensureHSL(), L.channel.hsl2rgb(e, "b"));
  }
  get h() {
    const e = this.data, i = e.h;
    return !this.type.is(X.RGB) && i !== void 0 ? i : (this._ensureRGB(), L.channel.rgb2hsl(e, "h"));
  }
  get s() {
    const e = this.data, i = e.s;
    return !this.type.is(X.RGB) && i !== void 0 ? i : (this._ensureRGB(), L.channel.rgb2hsl(e, "s"));
  }
  get l() {
    const e = this.data, i = e.l;
    return !this.type.is(X.RGB) && i !== void 0 ? i : (this._ensureRGB(), L.channel.rgb2hsl(e, "l"));
  }
  get a() {
    return this.data.a;
  }
  /* SETTERS */
  set r(e) {
    this.type.set(X.RGB), this.changed = !0, this.data.r = e;
  }
  set g(e) {
    this.type.set(X.RGB), this.changed = !0, this.data.g = e;
  }
  set b(e) {
    this.type.set(X.RGB), this.changed = !0, this.data.b = e;
  }
  set h(e) {
    this.type.set(X.HSL), this.changed = !0, this.data.h = e;
  }
  set s(e) {
    this.type.set(X.HSL), this.changed = !0, this.data.s = e;
  }
  set l(e) {
    this.type.set(X.HSL), this.changed = !0, this.data.l = e;
  }
  set a(e) {
    this.changed = !0, this.data.a = e;
  }
}
const Ul = ql, Gl = new Ul({ r: 0, g: 0, b: 0, a: 0 }, "transparent"), Je = Gl, lo = {
  /* VARIABLES */
  re: /^#((?:[a-f0-9]{2}){2,4}|[a-f0-9]{3})$/i,
  /* API */
  parse: (t) => {
    if (t.charCodeAt(0) !== 35)
      return;
    const e = t.match(lo.re);
    if (!e)
      return;
    const i = e[1], r = parseInt(i, 16), o = i.length, n = o % 4 === 0, s = o > 4, l = s ? 1 : 17, h = s ? 8 : 4, u = n ? 0 : -1, f = s ? 255 : 15;
    return Je.set({
      r: (r >> h * (u + 3) & f) * l,
      g: (r >> h * (u + 2) & f) * l,
      b: (r >> h * (u + 1) & f) * l,
      a: n ? (r & f) * l / 255 : 1
    }, t);
  },
  stringify: (t) => {
    const { r: e, g: i, b: r, a: o } = t;
    return o < 1 ? `#${Ft[Math.round(e)]}${Ft[Math.round(i)]}${Ft[Math.round(r)]}${Ft[Math.round(o * 255)]}` : `#${Ft[Math.round(e)]}${Ft[Math.round(i)]}${Ft[Math.round(r)]}`;
  }
}, ce = lo, ze = {
  /* VARIABLES */
  re: /^hsla?\(\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e-?\d+)?(?:deg|grad|rad|turn)?)\s*?(?:,|\s)\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e-?\d+)?%)\s*?(?:,|\s)\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e-?\d+)?%)(?:\s*?(?:,|\/)\s*?\+?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e-?\d+)?(%)?))?\s*?\)$/i,
  hueRe: /^(.+?)(deg|grad|rad|turn)$/i,
  /* HELPERS */
  _hue2deg: (t) => {
    const e = t.match(ze.hueRe);
    if (e) {
      const [, i, r] = e;
      switch (r) {
        case "grad":
          return L.channel.clamp.h(parseFloat(i) * 0.9);
        case "rad":
          return L.channel.clamp.h(parseFloat(i) * 180 / Math.PI);
        case "turn":
          return L.channel.clamp.h(parseFloat(i) * 360);
      }
    }
    return L.channel.clamp.h(parseFloat(t));
  },
  /* API */
  parse: (t) => {
    const e = t.charCodeAt(0);
    if (e !== 104 && e !== 72)
      return;
    const i = t.match(ze.re);
    if (!i)
      return;
    const [, r, o, n, s, l] = i;
    return Je.set({
      h: ze._hue2deg(r),
      s: L.channel.clamp.s(parseFloat(o)),
      l: L.channel.clamp.l(parseFloat(n)),
      a: s ? L.channel.clamp.a(l ? parseFloat(s) / 100 : parseFloat(s)) : 1
    }, t);
  },
  stringify: (t) => {
    const { h: e, s: i, l: r, a: o } = t;
    return o < 1 ? `hsla(${L.lang.round(e)}, ${L.lang.round(i)}%, ${L.lang.round(r)}%, ${o})` : `hsl(${L.lang.round(e)}, ${L.lang.round(i)}%, ${L.lang.round(r)}%)`;
  }
}, Ae = ze, $e = {
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
    const e = $e.colors[t];
    if (e)
      return ce.parse(e);
  },
  stringify: (t) => {
    const e = ce.stringify(t);
    for (const i in $e.colors)
      if ($e.colors[i] === e)
        return i;
  }
}, Ar = $e, ho = {
  /* VARIABLES */
  re: /^rgba?\(\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e\d+)?(%?))\s*?(?:,|\s)\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e\d+)?(%?))\s*?(?:,|\s)\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e\d+)?(%?))(?:\s*?(?:,|\/)\s*?\+?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e\d+)?(%?)))?\s*?\)$/i,
  /* API */
  parse: (t) => {
    const e = t.charCodeAt(0);
    if (e !== 114 && e !== 82)
      return;
    const i = t.match(ho.re);
    if (!i)
      return;
    const [, r, o, n, s, l, h, u, f] = i;
    return Je.set({
      r: L.channel.clamp.r(o ? parseFloat(r) * 2.55 : parseFloat(r)),
      g: L.channel.clamp.g(s ? parseFloat(n) * 2.55 : parseFloat(n)),
      b: L.channel.clamp.b(h ? parseFloat(l) * 2.55 : parseFloat(l)),
      a: u ? L.channel.clamp.a(f ? parseFloat(u) / 100 : parseFloat(u)) : 1
    }, t);
  },
  stringify: (t) => {
    const { r: e, g: i, b: r, a: o } = t;
    return o < 1 ? `rgba(${L.lang.round(e)}, ${L.lang.round(i)}, ${L.lang.round(r)}, ${L.lang.round(o)})` : `rgb(${L.lang.round(e)}, ${L.lang.round(i)}, ${L.lang.round(r)})`;
  }
}, Ee = ho, Vl = {
  /* VARIABLES */
  format: {
    keyword: Ar,
    hex: ce,
    rgb: Ee,
    rgba: Ee,
    hsl: Ae,
    hsla: Ae
  },
  /* API */
  parse: (t) => {
    if (typeof t != "string")
      return t;
    const e = ce.parse(t) || Ee.parse(t) || Ae.parse(t) || Ar.parse(t);
    if (e)
      return e;
    throw new Error(`Unsupported color format: "${t}"`);
  },
  stringify: (t) => !t.changed && t.color ? t.color : t.type.is(X.HSL) || t.data.r === void 0 ? Ae.stringify(t) : t.a < 1 || !Number.isInteger(t.r) || !Number.isInteger(t.g) || !Number.isInteger(t.b) ? Ee.stringify(t) : ce.stringify(t)
}, Lt = Vl, Yl = (t, e) => {
  const i = Lt.parse(t);
  for (const r in e)
    i[r] = L.channel.clamp[r](e[r]);
  return Lt.stringify(i);
}, co = Yl, Xl = (t, e, i = 0, r = 1) => {
  if (typeof t != "number")
    return co(t, { a: e });
  const o = Je.set({
    r: L.channel.clamp.r(t),
    g: L.channel.clamp.g(e),
    b: L.channel.clamp.b(i),
    a: L.channel.clamp.a(r)
  });
  return Lt.stringify(o);
}, ue = Xl, jl = (t, e, i) => {
  const r = Lt.parse(t), o = r[e], n = L.channel.clamp[e](o + i);
  return o !== n && (r[e] = n), Lt.stringify(r);
}, uo = jl, Kl = (t, e) => uo(t, "l", e), S = Kl, Zl = (t, e) => uo(t, "l", -e), v = Zl, Jl = (t, e) => {
  const i = Lt.parse(t), r = {};
  for (const o in e)
    e[o] && (r[o] = i[o] + e[o]);
  return co(t, r);
}, c = Jl, Ql = (t, e, i = 50) => {
  const { r, g: o, b: n, a: s } = Lt.parse(t), { r: l, g: h, b: u, a: f } = Lt.parse(e), g = i / 100, x = g * 2 - 1, _ = s - f, z = ((x * _ === -1 ? x : (x + _) / (1 + x * _)) + 1) / 2, j = 1 - z, Ot = r * z + l * j, nt = o * z + h * j, Q = n * z + u * j, H = s * g + f * (1 - g);
  return ue(Ot, nt, Q, H);
}, th = Ql, eh = (t, e = 100) => {
  const i = Lt.parse(t);
  return i.r = 255 - i.r, i.g = 255 - i.g, i.b = 255 - i.b, th(i, t, e);
}, m = eh, Z = (t, e) => e ? c(t, { s: -40, l: 10 }) : c(t, { s: -40, l: -10 }), Qe = "#ffffff", ti = "#f2f2f2";
let ih = class {
  constructor() {
    this.background = "#f4f4f4", this.primaryColor = "#fff4dd", this.noteBkgColor = "#fff5ad", this.noteTextColor = "#333", this.THEME_COLOR_LIMIT = 12, this.fontFamily = '"trebuchet ms", verdana, arial, sans-serif', this.fontSize = "16px";
  }
  updateColors() {
    if (this.primaryTextColor = this.primaryTextColor || (this.darkMode ? "#eee" : "#333"), this.secondaryColor = this.secondaryColor || c(this.primaryColor, { h: -120 }), this.tertiaryColor = this.tertiaryColor || c(this.primaryColor, { h: 180, l: 5 }), this.primaryBorderColor = this.primaryBorderColor || Z(this.primaryColor, this.darkMode), this.secondaryBorderColor = this.secondaryBorderColor || Z(this.secondaryColor, this.darkMode), this.tertiaryBorderColor = this.tertiaryBorderColor || Z(this.tertiaryColor, this.darkMode), this.noteBorderColor = this.noteBorderColor || Z(this.noteBkgColor, this.darkMode), this.noteBkgColor = this.noteBkgColor || "#fff5ad", this.noteTextColor = this.noteTextColor || "#333", this.secondaryTextColor = this.secondaryTextColor || m(this.secondaryColor), this.tertiaryTextColor = this.tertiaryTextColor || m(this.tertiaryColor), this.lineColor = this.lineColor || m(this.background), this.textColor = this.textColor || this.primaryTextColor, this.nodeBkg = this.nodeBkg || this.primaryColor, this.mainBkg = this.mainBkg || this.primaryColor, this.nodeBorder = this.nodeBorder || this.primaryBorderColor, this.clusterBkg = this.clusterBkg || this.tertiaryColor, this.clusterBorder = this.clusterBorder || this.tertiaryBorderColor, this.defaultLinkColor = this.defaultLinkColor || this.lineColor, this.titleColor = this.titleColor || this.tertiaryTextColor, this.edgeLabelBackground = this.edgeLabelBackground || (this.darkMode ? v(this.secondaryColor, 30) : this.secondaryColor), this.nodeTextColor = this.nodeTextColor || this.primaryTextColor, this.actorBorder = this.actorBorder || this.primaryBorderColor, this.actorBkg = this.actorBkg || this.mainBkg, this.actorTextColor = this.actorTextColor || this.primaryTextColor, this.actorLineColor = this.actorLineColor || "grey", this.labelBoxBkgColor = this.labelBoxBkgColor || this.actorBkg, this.signalColor = this.signalColor || this.textColor, this.signalTextColor = this.signalTextColor || this.textColor, this.labelBoxBorderColor = this.labelBoxBorderColor || this.actorBorder, this.labelTextColor = this.labelTextColor || this.actorTextColor, this.loopTextColor = this.loopTextColor || this.actorTextColor, this.activationBorderColor = this.activationBorderColor || v(this.secondaryColor, 10), this.activationBkgColor = this.activationBkgColor || this.secondaryColor, this.sequenceNumberColor = this.sequenceNumberColor || m(this.lineColor), this.sectionBkgColor = this.sectionBkgColor || this.tertiaryColor, this.altSectionBkgColor = this.altSectionBkgColor || "white", this.sectionBkgColor = this.sectionBkgColor || this.secondaryColor, this.sectionBkgColor2 = this.sectionBkgColor2 || this.primaryColor, this.excludeBkgColor = this.excludeBkgColor || "#eeeeee", this.taskBorderColor = this.taskBorderColor || this.primaryBorderColor, this.taskBkgColor = this.taskBkgColor || this.primaryColor, this.activeTaskBorderColor = this.activeTaskBorderColor || this.primaryColor, this.activeTaskBkgColor = this.activeTaskBkgColor || S(this.primaryColor, 23), this.gridColor = this.gridColor || "lightgrey", this.doneTaskBkgColor = this.doneTaskBkgColor || "lightgrey", this.doneTaskBorderColor = this.doneTaskBorderColor || "grey", this.critBorderColor = this.critBorderColor || "#ff8888", this.critBkgColor = this.critBkgColor || "red", this.todayLineColor = this.todayLineColor || "red", this.taskTextColor = this.taskTextColor || this.textColor, this.taskTextOutsideColor = this.taskTextOutsideColor || this.textColor, this.taskTextLightColor = this.taskTextLightColor || this.textColor, this.taskTextColor = this.taskTextColor || this.primaryTextColor, this.taskTextDarkColor = this.taskTextDarkColor || this.textColor, this.taskTextClickableColor = this.taskTextClickableColor || "#003163", this.personBorder = this.personBorder || this.primaryBorderColor, this.personBkg = this.personBkg || this.mainBkg, this.transitionColor = this.transitionColor || this.lineColor, this.transitionLabelColor = this.transitionLabelColor || this.textColor, this.stateLabelColor = this.stateLabelColor || this.stateBkg || this.primaryTextColor, this.stateBkg = this.stateBkg || this.mainBkg, this.labelBackgroundColor = this.labelBackgroundColor || this.stateBkg, this.compositeBackground = this.compositeBackground || this.background || this.tertiaryColor, this.altBackground = this.altBackground || this.tertiaryColor, this.compositeTitleBackground = this.compositeTitleBackground || this.mainBkg, this.compositeBorder = this.compositeBorder || this.nodeBorder, this.innerEndBackground = this.nodeBorder, this.errorBkgColor = this.errorBkgColor || this.tertiaryColor, this.errorTextColor = this.errorTextColor || this.tertiaryTextColor, this.transitionColor = this.transitionColor || this.lineColor, this.specialStateColor = this.lineColor, this.cScale0 = this.cScale0 || this.primaryColor, this.cScale1 = this.cScale1 || this.secondaryColor, this.cScale2 = this.cScale2 || this.tertiaryColor, this.cScale3 = this.cScale3 || c(this.primaryColor, { h: 30 }), this.cScale4 = this.cScale4 || c(this.primaryColor, { h: 60 }), this.cScale5 = this.cScale5 || c(this.primaryColor, { h: 90 }), this.cScale6 = this.cScale6 || c(this.primaryColor, { h: 120 }), this.cScale7 = this.cScale7 || c(this.primaryColor, { h: 150 }), this.cScale8 = this.cScale8 || c(this.primaryColor, { h: 210, l: 150 }), this.cScale9 = this.cScale9 || c(this.primaryColor, { h: 270 }), this.cScale10 = this.cScale10 || c(this.primaryColor, { h: 300 }), this.cScale11 = this.cScale11 || c(this.primaryColor, { h: 330 }), this.darkMode)
      for (let i = 0; i < this.THEME_COLOR_LIMIT; i++)
        this["cScale" + i] = v(this["cScale" + i], 75);
    else
      for (let i = 0; i < this.THEME_COLOR_LIMIT; i++)
        this["cScale" + i] = v(this["cScale" + i], 25);
    for (let i = 0; i < this.THEME_COLOR_LIMIT; i++)
      this["cScaleInv" + i] = this["cScaleInv" + i] || m(this["cScale" + i]);
    for (let i = 0; i < this.THEME_COLOR_LIMIT; i++)
      this.darkMode ? this["cScalePeer" + i] = this["cScalePeer" + i] || S(this["cScale" + i], 10) : this["cScalePeer" + i] = this["cScalePeer" + i] || v(this["cScale" + i], 10);
    this.scaleLabelColor = this.scaleLabelColor || this.labelTextColor;
    for (let i = 0; i < this.THEME_COLOR_LIMIT; i++)
      this["cScaleLabel" + i] = this["cScaleLabel" + i] || this.scaleLabelColor;
    const e = this.darkMode ? -4 : -1;
    for (let i = 0; i < 5; i++)
      this["surface" + i] = this["surface" + i] || c(this.mainBkg, { h: 180, s: -15, l: e * (5 + i * 3) }), this["surfacePeer" + i] = this["surfacePeer" + i] || c(this.mainBkg, { h: 180, s: -15, l: e * (8 + i * 3) });
    this.classText = this.classText || this.textColor, this.fillType0 = this.fillType0 || this.primaryColor, this.fillType1 = this.fillType1 || this.secondaryColor, this.fillType2 = this.fillType2 || c(this.primaryColor, { h: 64 }), this.fillType3 = this.fillType3 || c(this.secondaryColor, { h: 64 }), this.fillType4 = this.fillType4 || c(this.primaryColor, { h: -64 }), this.fillType5 = this.fillType5 || c(this.secondaryColor, { h: -64 }), this.fillType6 = this.fillType6 || c(this.primaryColor, { h: 128 }), this.fillType7 = this.fillType7 || c(this.secondaryColor, { h: 128 }), this.pie1 = this.pie1 || this.primaryColor, this.pie2 = this.pie2 || this.secondaryColor, this.pie3 = this.pie3 || this.tertiaryColor, this.pie4 = this.pie4 || c(this.primaryColor, { l: -10 }), this.pie5 = this.pie5 || c(this.secondaryColor, { l: -10 }), this.pie6 = this.pie6 || c(this.tertiaryColor, { l: -10 }), this.pie7 = this.pie7 || c(this.primaryColor, { h: 60, l: -10 }), this.pie8 = this.pie8 || c(this.primaryColor, { h: -60, l: -10 }), this.pie9 = this.pie9 || c(this.primaryColor, { h: 120, l: 0 }), this.pie10 = this.pie10 || c(this.primaryColor, { h: 60, l: -20 }), this.pie11 = this.pie11 || c(this.primaryColor, { h: -60, l: -20 }), this.pie12 = this.pie12 || c(this.primaryColor, { h: 120, l: -10 }), this.pieTitleTextSize = this.pieTitleTextSize || "25px", this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor, this.pieSectionTextSize = this.pieSectionTextSize || "17px", this.pieSectionTextColor = this.pieSectionTextColor || this.textColor, this.pieLegendTextSize = this.pieLegendTextSize || "17px", this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor, this.pieStrokeColor = this.pieStrokeColor || "black", this.pieStrokeWidth = this.pieStrokeWidth || "2px", this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || "2px", this.pieOuterStrokeColor = this.pieOuterStrokeColor || "black", this.pieOpacity = this.pieOpacity || "0.7", this.requirementBackground = this.requirementBackground || this.primaryColor, this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor, this.requirementBorderSize = this.requirementBorderSize || this.primaryBorderColor, this.requirementTextColor = this.requirementTextColor || this.primaryTextColor, this.relationColor = this.relationColor || this.lineColor, this.relationLabelBackground = this.relationLabelBackground || (this.darkMode ? v(this.secondaryColor, 30) : this.secondaryColor), this.relationLabelColor = this.relationLabelColor || this.actorTextColor, this.git0 = this.git0 || this.primaryColor, this.git1 = this.git1 || this.secondaryColor, this.git2 = this.git2 || this.tertiaryColor, this.git3 = this.git3 || c(this.primaryColor, { h: -30 }), this.git4 = this.git4 || c(this.primaryColor, { h: -60 }), this.git5 = this.git5 || c(this.primaryColor, { h: -90 }), this.git6 = this.git6 || c(this.primaryColor, { h: 60 }), this.git7 = this.git7 || c(this.primaryColor, { h: 120 }), this.darkMode ? (this.git0 = S(this.git0, 25), this.git1 = S(this.git1, 25), this.git2 = S(this.git2, 25), this.git3 = S(this.git3, 25), this.git4 = S(this.git4, 25), this.git5 = S(this.git5, 25), this.git6 = S(this.git6, 25), this.git7 = S(this.git7, 25)) : (this.git0 = v(this.git0, 25), this.git1 = v(this.git1, 25), this.git2 = v(this.git2, 25), this.git3 = v(this.git3, 25), this.git4 = v(this.git4, 25), this.git5 = v(this.git5, 25), this.git6 = v(this.git6, 25), this.git7 = v(this.git7, 25)), this.gitInv0 = this.gitInv0 || m(this.git0), this.gitInv1 = this.gitInv1 || m(this.git1), this.gitInv2 = this.gitInv2 || m(this.git2), this.gitInv3 = this.gitInv3 || m(this.git3), this.gitInv4 = this.gitInv4 || m(this.git4), this.gitInv5 = this.gitInv5 || m(this.git5), this.gitInv6 = this.gitInv6 || m(this.git6), this.gitInv7 = this.gitInv7 || m(this.git7), this.branchLabelColor = this.branchLabelColor || (this.darkMode ? "black" : this.labelTextColor), this.gitBranchLabel0 = this.gitBranchLabel0 || this.branchLabelColor, this.gitBranchLabel1 = this.gitBranchLabel1 || this.branchLabelColor, this.gitBranchLabel2 = this.gitBranchLabel2 || this.branchLabelColor, this.gitBranchLabel3 = this.gitBranchLabel3 || this.branchLabelColor, this.gitBranchLabel4 = this.gitBranchLabel4 || this.branchLabelColor, this.gitBranchLabel5 = this.gitBranchLabel5 || this.branchLabelColor, this.gitBranchLabel6 = this.gitBranchLabel6 || this.branchLabelColor, this.gitBranchLabel7 = this.gitBranchLabel7 || this.branchLabelColor, this.tagLabelColor = this.tagLabelColor || this.primaryTextColor, this.tagLabelBackground = this.tagLabelBackground || this.primaryColor, this.tagLabelBorder = this.tagBorder || this.primaryBorderColor, this.tagLabelFontSize = this.tagLabelFontSize || "10px", this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor, this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor, this.commitLabelFontSize = this.commitLabelFontSize || "10px", this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || Qe, this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || ti;
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
const rh = (t) => {
  const e = new ih();
  return e.calculate(t), e;
};
let oh = class {
  constructor() {
    this.background = "#333", this.primaryColor = "#1f2020", this.secondaryColor = S(this.primaryColor, 16), this.tertiaryColor = c(this.primaryColor, { h: -160 }), this.primaryBorderColor = m(this.background), this.secondaryBorderColor = Z(this.secondaryColor, this.darkMode), this.tertiaryBorderColor = Z(this.tertiaryColor, this.darkMode), this.primaryTextColor = m(this.primaryColor), this.secondaryTextColor = m(this.secondaryColor), this.tertiaryTextColor = m(this.tertiaryColor), this.lineColor = m(this.background), this.textColor = m(this.background), this.mainBkg = "#1f2020", this.secondBkg = "calculated", this.mainContrastColor = "lightgrey", this.darkTextColor = S(m("#323D47"), 10), this.lineColor = "calculated", this.border1 = "#81B1DB", this.border2 = ue(255, 255, 255, 0.25), this.arrowheadColor = "calculated", this.fontFamily = '"trebuchet ms", verdana, arial, sans-serif', this.fontSize = "16px", this.labelBackground = "#181818", this.textColor = "#ccc", this.THEME_COLOR_LIMIT = 12, this.nodeBkg = "calculated", this.nodeBorder = "calculated", this.clusterBkg = "calculated", this.clusterBorder = "calculated", this.defaultLinkColor = "calculated", this.titleColor = "#F9FFFE", this.edgeLabelBackground = "calculated", this.actorBorder = "calculated", this.actorBkg = "calculated", this.actorTextColor = "calculated", this.actorLineColor = "calculated", this.signalColor = "calculated", this.signalTextColor = "calculated", this.labelBoxBkgColor = "calculated", this.labelBoxBorderColor = "calculated", this.labelTextColor = "calculated", this.loopTextColor = "calculated", this.noteBorderColor = "calculated", this.noteBkgColor = "#fff5ad", this.noteTextColor = "calculated", this.activationBorderColor = "calculated", this.activationBkgColor = "calculated", this.sequenceNumberColor = "black", this.sectionBkgColor = v("#EAE8D9", 30), this.altSectionBkgColor = "calculated", this.sectionBkgColor2 = "#EAE8D9", this.taskBorderColor = ue(255, 255, 255, 70), this.taskBkgColor = "calculated", this.taskTextColor = "calculated", this.taskTextLightColor = "calculated", this.taskTextOutsideColor = "calculated", this.taskTextClickableColor = "#003163", this.activeTaskBorderColor = ue(255, 255, 255, 50), this.activeTaskBkgColor = "#81B1DB", this.gridColor = "calculated", this.doneTaskBkgColor = "calculated", this.doneTaskBorderColor = "grey", this.critBorderColor = "#E83737", this.critBkgColor = "#E83737", this.taskTextDarkColor = "calculated", this.todayLineColor = "#DB5757", this.personBorder = "calculated", this.personBkg = "calculated", this.labelColor = "calculated", this.errorBkgColor = "#a44141", this.errorTextColor = "#ddd";
  }
  updateColors() {
    this.secondBkg = S(this.mainBkg, 16), this.lineColor = this.mainContrastColor, this.arrowheadColor = this.mainContrastColor, this.nodeBkg = this.mainBkg, this.nodeBorder = this.border1, this.clusterBkg = this.secondBkg, this.clusterBorder = this.border2, this.defaultLinkColor = this.lineColor, this.edgeLabelBackground = S(this.labelBackground, 25), this.actorBorder = this.border1, this.actorBkg = this.mainBkg, this.actorTextColor = this.mainContrastColor, this.actorLineColor = this.mainContrastColor, this.signalColor = this.mainContrastColor, this.signalTextColor = this.mainContrastColor, this.labelBoxBkgColor = this.actorBkg, this.labelBoxBorderColor = this.actorBorder, this.labelTextColor = this.mainContrastColor, this.loopTextColor = this.mainContrastColor, this.noteBorderColor = this.secondaryBorderColor, this.noteBkgColor = this.secondBkg, this.noteTextColor = this.secondaryTextColor, this.activationBorderColor = this.border1, this.activationBkgColor = this.secondBkg, this.altSectionBkgColor = this.background, this.taskBkgColor = S(this.mainBkg, 23), this.taskTextColor = this.darkTextColor, this.taskTextLightColor = this.mainContrastColor, this.taskTextOutsideColor = this.taskTextLightColor, this.gridColor = this.mainContrastColor, this.doneTaskBkgColor = this.mainContrastColor, this.taskTextDarkColor = this.darkTextColor, this.transitionColor = this.transitionColor || this.lineColor, this.transitionLabelColor = this.transitionLabelColor || this.textColor, this.stateLabelColor = this.stateLabelColor || this.stateBkg || this.primaryTextColor, this.stateBkg = this.stateBkg || this.mainBkg, this.labelBackgroundColor = this.labelBackgroundColor || this.stateBkg, this.compositeBackground = this.compositeBackground || this.background || this.tertiaryColor, this.altBackground = this.altBackground || "#555", this.compositeTitleBackground = this.compositeTitleBackground || this.mainBkg, this.compositeBorder = this.compositeBorder || this.nodeBorder, this.innerEndBackground = this.primaryBorderColor, this.specialStateColor = "#f4f4f4", this.errorBkgColor = this.errorBkgColor || this.tertiaryColor, this.errorTextColor = this.errorTextColor || this.tertiaryTextColor, this.fillType0 = this.primaryColor, this.fillType1 = this.secondaryColor, this.fillType2 = c(this.primaryColor, { h: 64 }), this.fillType3 = c(this.secondaryColor, { h: 64 }), this.fillType4 = c(this.primaryColor, { h: -64 }), this.fillType5 = c(this.secondaryColor, { h: -64 }), this.fillType6 = c(this.primaryColor, { h: 128 }), this.fillType7 = c(this.secondaryColor, { h: 128 }), this.cScale1 = this.cScale1 || "#0b0000", this.cScale2 = this.cScale2 || "#4d1037", this.cScale3 = this.cScale3 || "#3f5258", this.cScale4 = this.cScale4 || "#4f2f1b", this.cScale5 = this.cScale5 || "#6e0a0a", this.cScale6 = this.cScale6 || "#3b0048", this.cScale7 = this.cScale7 || "#995a01", this.cScale8 = this.cScale8 || "#154706", this.cScale9 = this.cScale9 || "#161722", this.cScale10 = this.cScale10 || "#00296f", this.cScale11 = this.cScale11 || "#01629c", this.cScale12 = this.cScale12 || "#010029", this.cScale0 = this.cScale0 || this.primaryColor, this.cScale1 = this.cScale1 || this.secondaryColor, this.cScale2 = this.cScale2 || this.tertiaryColor, this.cScale3 = this.cScale3 || c(this.primaryColor, { h: 30 }), this.cScale4 = this.cScale4 || c(this.primaryColor, { h: 60 }), this.cScale5 = this.cScale5 || c(this.primaryColor, { h: 90 }), this.cScale6 = this.cScale6 || c(this.primaryColor, { h: 120 }), this.cScale7 = this.cScale7 || c(this.primaryColor, { h: 150 }), this.cScale8 = this.cScale8 || c(this.primaryColor, { h: 210 }), this.cScale9 = this.cScale9 || c(this.primaryColor, { h: 270 }), this.cScale10 = this.cScale10 || c(this.primaryColor, { h: 300 }), this.cScale11 = this.cScale11 || c(this.primaryColor, { h: 330 });
    for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
      this["cScaleInv" + e] = this["cScaleInv" + e] || m(this["cScale" + e]);
    for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
      this["cScalePeer" + e] = this["cScalePeer" + e] || S(this["cScale" + e], 10);
    for (let e = 0; e < 5; e++)
      this["surface" + e] = this["surface" + e] || c(this.mainBkg, { h: 30, s: -30, l: -(-10 + e * 4) }), this["surfacePeer" + e] = this["surfacePeer" + e] || c(this.mainBkg, { h: 30, s: -30, l: -(-7 + e * 4) });
    this.scaleLabelColor = this.scaleLabelColor || (this.darkMode ? "black" : this.labelTextColor);
    for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
      this["cScaleLabel" + e] = this["cScaleLabel" + e] || this.scaleLabelColor;
    for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
      this["pie" + e] = this["cScale" + e];
    this.pieTitleTextSize = this.pieTitleTextSize || "25px", this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor, this.pieSectionTextSize = this.pieSectionTextSize || "17px", this.pieSectionTextColor = this.pieSectionTextColor || this.textColor, this.pieLegendTextSize = this.pieLegendTextSize || "17px", this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor, this.pieStrokeColor = this.pieStrokeColor || "black", this.pieStrokeWidth = this.pieStrokeWidth || "2px", this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || "2px", this.pieOuterStrokeColor = this.pieOuterStrokeColor || "black", this.pieOpacity = this.pieOpacity || "0.7", this.classText = this.primaryTextColor, this.requirementBackground = this.requirementBackground || this.primaryColor, this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor, this.requirementBorderSize = this.requirementBorderSize || this.primaryBorderColor, this.requirementTextColor = this.requirementTextColor || this.primaryTextColor, this.relationColor = this.relationColor || this.lineColor, this.relationLabelBackground = this.relationLabelBackground || (this.darkMode ? v(this.secondaryColor, 30) : this.secondaryColor), this.relationLabelColor = this.relationLabelColor || this.actorTextColor, this.git0 = S(this.secondaryColor, 20), this.git1 = S(this.pie2 || this.secondaryColor, 20), this.git2 = S(this.pie3 || this.tertiaryColor, 20), this.git3 = S(this.pie4 || c(this.primaryColor, { h: -30 }), 20), this.git4 = S(this.pie5 || c(this.primaryColor, { h: -60 }), 20), this.git5 = S(this.pie6 || c(this.primaryColor, { h: -90 }), 10), this.git6 = S(this.pie7 || c(this.primaryColor, { h: 60 }), 10), this.git7 = S(this.pie8 || c(this.primaryColor, { h: 120 }), 20), this.gitInv0 = this.gitInv0 || m(this.git0), this.gitInv1 = this.gitInv1 || m(this.git1), this.gitInv2 = this.gitInv2 || m(this.git2), this.gitInv3 = this.gitInv3 || m(this.git3), this.gitInv4 = this.gitInv4 || m(this.git4), this.gitInv5 = this.gitInv5 || m(this.git5), this.gitInv6 = this.gitInv6 || m(this.git6), this.gitInv7 = this.gitInv7 || m(this.git7), this.tagLabelColor = this.tagLabelColor || this.primaryTextColor, this.tagLabelBackground = this.tagLabelBackground || this.primaryColor, this.tagLabelBorder = this.tagBorder || this.primaryBorderColor, this.tagLabelFontSize = this.tagLabelFontSize || "10px", this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor, this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor, this.commitLabelFontSize = this.commitLabelFontSize || "10px", this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || S(this.background, 12), this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || S(this.background, 2);
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
const nh = (t) => {
  const e = new oh();
  return e.calculate(t), e;
};
let sh = class {
  constructor() {
    this.background = "#f4f4f4", this.primaryColor = "#ECECFF", this.secondaryColor = c(this.primaryColor, { h: 120 }), this.secondaryColor = "#ffffde", this.tertiaryColor = c(this.primaryColor, { h: -160 }), this.primaryBorderColor = Z(this.primaryColor, this.darkMode), this.secondaryBorderColor = Z(this.secondaryColor, this.darkMode), this.tertiaryBorderColor = Z(this.tertiaryColor, this.darkMode), this.primaryTextColor = m(this.primaryColor), this.secondaryTextColor = m(this.secondaryColor), this.tertiaryTextColor = m(this.tertiaryColor), this.lineColor = m(this.background), this.textColor = m(this.background), this.background = "white", this.mainBkg = "#ECECFF", this.secondBkg = "#ffffde", this.lineColor = "#333333", this.border1 = "#9370DB", this.border2 = "#aaaa33", this.arrowheadColor = "#333333", this.fontFamily = '"trebuchet ms", verdana, arial, sans-serif', this.fontSize = "16px", this.labelBackground = "#e8e8e8", this.textColor = "#333", this.THEME_COLOR_LIMIT = 12, this.nodeBkg = "calculated", this.nodeBorder = "calculated", this.clusterBkg = "calculated", this.clusterBorder = "calculated", this.defaultLinkColor = "calculated", this.titleColor = "calculated", this.edgeLabelBackground = "calculated", this.actorBorder = "calculated", this.actorBkg = "calculated", this.actorTextColor = "black", this.actorLineColor = "grey", this.signalColor = "calculated", this.signalTextColor = "calculated", this.labelBoxBkgColor = "calculated", this.labelBoxBorderColor = "calculated", this.labelTextColor = "calculated", this.loopTextColor = "calculated", this.noteBorderColor = "calculated", this.noteBkgColor = "#fff5ad", this.noteTextColor = "calculated", this.activationBorderColor = "#666", this.activationBkgColor = "#f4f4f4", this.sequenceNumberColor = "white", this.sectionBkgColor = "calculated", this.altSectionBkgColor = "calculated", this.sectionBkgColor2 = "calculated", this.excludeBkgColor = "#eeeeee", this.taskBorderColor = "calculated", this.taskBkgColor = "calculated", this.taskTextLightColor = "calculated", this.taskTextColor = this.taskTextLightColor, this.taskTextDarkColor = "calculated", this.taskTextOutsideColor = this.taskTextDarkColor, this.taskTextClickableColor = "calculated", this.activeTaskBorderColor = "calculated", this.activeTaskBkgColor = "calculated", this.gridColor = "calculated", this.doneTaskBkgColor = "calculated", this.doneTaskBorderColor = "calculated", this.critBorderColor = "calculated", this.critBkgColor = "calculated", this.todayLineColor = "calculated", this.sectionBkgColor = ue(102, 102, 255, 0.49), this.altSectionBkgColor = "white", this.sectionBkgColor2 = "#fff400", this.taskBorderColor = "#534fbc", this.taskBkgColor = "#8a90dd", this.taskTextLightColor = "white", this.taskTextColor = "calculated", this.taskTextDarkColor = "black", this.taskTextOutsideColor = "calculated", this.taskTextClickableColor = "#003163", this.activeTaskBorderColor = "#534fbc", this.activeTaskBkgColor = "#bfc7ff", this.gridColor = "lightgrey", this.doneTaskBkgColor = "lightgrey", this.doneTaskBorderColor = "grey", this.critBorderColor = "#ff8888", this.critBkgColor = "red", this.todayLineColor = "red", this.personBorder = "calculated", this.personBkg = "calculated", this.labelColor = "black", this.errorBkgColor = "#552222", this.errorTextColor = "#552222", this.updateColors();
  }
  updateColors() {
    this.cScale0 = this.cScale0 || this.primaryColor, this.cScale1 = this.cScale1 || this.secondaryColor, this.cScale2 = this.cScale2 || this.tertiaryColor, this.cScale3 = this.cScale3 || c(this.primaryColor, { h: 30 }), this.cScale4 = this.cScale4 || c(this.primaryColor, { h: 60 }), this.cScale5 = this.cScale5 || c(this.primaryColor, { h: 90 }), this.cScale6 = this.cScale6 || c(this.primaryColor, { h: 120 }), this.cScale7 = this.cScale7 || c(this.primaryColor, { h: 150 }), this.cScale8 = this.cScale8 || c(this.primaryColor, { h: 210 }), this.cScale9 = this.cScale9 || c(this.primaryColor, { h: 270 }), this.cScale10 = this.cScale10 || c(this.primaryColor, { h: 300 }), this.cScale11 = this.cScale11 || c(this.primaryColor, { h: 330 }), this["cScalePeer" + 1] = this["cScalePeer" + 1] || v(this.secondaryColor, 45), this["cScalePeer" + 2] = this["cScalePeer" + 2] || v(this.tertiaryColor, 40);
    for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
      this["cScale" + e] = v(this["cScale" + e], 10), this["cScalePeer" + e] = this["cScalePeer" + e] || v(this["cScale" + e], 25);
    for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
      this["cScaleInv" + e] = this["cScaleInv" + e] || c(this["cScale" + e], { h: 180 });
    for (let e = 0; e < 5; e++)
      this["surface" + e] = this["surface" + e] || c(this.mainBkg, { h: 30, l: -(5 + e * 5) }), this["surfacePeer" + e] = this["surfacePeer" + e] || c(this.mainBkg, { h: 30, l: -(7 + e * 5) });
    if (this.scaleLabelColor = this.scaleLabelColor !== "calculated" && this.scaleLabelColor ? this.scaleLabelColor : this.labelTextColor, this.labelTextColor !== "calculated") {
      this.cScaleLabel0 = this.cScaleLabel0 || m(this.labelTextColor), this.cScaleLabel3 = this.cScaleLabel3 || m(this.labelTextColor);
      for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
        this["cScaleLabel" + e] = this["cScaleLabel" + e] || this.labelTextColor;
    }
    this.nodeBkg = this.mainBkg, this.nodeBorder = this.border1, this.clusterBkg = this.secondBkg, this.clusterBorder = this.border2, this.defaultLinkColor = this.lineColor, this.titleColor = this.textColor, this.edgeLabelBackground = this.labelBackground, this.actorBorder = S(this.border1, 23), this.actorBkg = this.mainBkg, this.labelBoxBkgColor = this.actorBkg, this.signalColor = this.textColor, this.signalTextColor = this.textColor, this.labelBoxBorderColor = this.actorBorder, this.labelTextColor = this.actorTextColor, this.loopTextColor = this.actorTextColor, this.noteBorderColor = this.border2, this.noteTextColor = this.actorTextColor, this.taskTextColor = this.taskTextLightColor, this.taskTextOutsideColor = this.taskTextDarkColor, this.transitionColor = this.transitionColor || this.lineColor, this.transitionLabelColor = this.transitionLabelColor || this.textColor, this.stateLabelColor = this.stateLabelColor || this.stateBkg || this.primaryTextColor, this.stateBkg = this.stateBkg || this.mainBkg, this.labelBackgroundColor = this.labelBackgroundColor || this.stateBkg, this.compositeBackground = this.compositeBackground || this.background || this.tertiaryColor, this.altBackground = this.altBackground || "#f0f0f0", this.compositeTitleBackground = this.compositeTitleBackground || this.mainBkg, this.compositeBorder = this.compositeBorder || this.nodeBorder, this.innerEndBackground = this.nodeBorder, this.specialStateColor = this.lineColor, this.errorBkgColor = this.errorBkgColor || this.tertiaryColor, this.errorTextColor = this.errorTextColor || this.tertiaryTextColor, this.transitionColor = this.transitionColor || this.lineColor, this.classText = this.primaryTextColor, this.fillType0 = this.primaryColor, this.fillType1 = this.secondaryColor, this.fillType2 = c(this.primaryColor, { h: 64 }), this.fillType3 = c(this.secondaryColor, { h: 64 }), this.fillType4 = c(this.primaryColor, { h: -64 }), this.fillType5 = c(this.secondaryColor, { h: -64 }), this.fillType6 = c(this.primaryColor, { h: 128 }), this.fillType7 = c(this.secondaryColor, { h: 128 }), this.pie1 = this.pie1 || this.primaryColor, this.pie2 = this.pie2 || this.secondaryColor, this.pie3 = this.pie3 || c(this.tertiaryColor, { l: -40 }), this.pie4 = this.pie4 || c(this.primaryColor, { l: -10 }), this.pie5 = this.pie5 || c(this.secondaryColor, { l: -30 }), this.pie6 = this.pie6 || c(this.tertiaryColor, { l: -20 }), this.pie7 = this.pie7 || c(this.primaryColor, { h: 60, l: -20 }), this.pie8 = this.pie8 || c(this.primaryColor, { h: -60, l: -40 }), this.pie9 = this.pie9 || c(this.primaryColor, { h: 120, l: -40 }), this.pie10 = this.pie10 || c(this.primaryColor, { h: 60, l: -40 }), this.pie11 = this.pie11 || c(this.primaryColor, { h: -90, l: -40 }), this.pie12 = this.pie12 || c(this.primaryColor, { h: 120, l: -30 }), this.pieTitleTextSize = this.pieTitleTextSize || "25px", this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor, this.pieSectionTextSize = this.pieSectionTextSize || "17px", this.pieSectionTextColor = this.pieSectionTextColor || this.textColor, this.pieLegendTextSize = this.pieLegendTextSize || "17px", this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor, this.pieStrokeColor = this.pieStrokeColor || "black", this.pieStrokeWidth = this.pieStrokeWidth || "2px", this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || "2px", this.pieOuterStrokeColor = this.pieOuterStrokeColor || "black", this.pieOpacity = this.pieOpacity || "0.7", this.requirementBackground = this.requirementBackground || this.primaryColor, this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor, this.requirementBorderSize = this.requirementBorderSize || this.primaryBorderColor, this.requirementTextColor = this.requirementTextColor || this.primaryTextColor, this.relationColor = this.relationColor || this.lineColor, this.relationLabelBackground = this.relationLabelBackground || this.labelBackground, this.relationLabelColor = this.relationLabelColor || this.actorTextColor, this.git0 = this.git0 || this.primaryColor, this.git1 = this.git1 || this.secondaryColor, this.git2 = this.git2 || this.tertiaryColor, this.git3 = this.git3 || c(this.primaryColor, { h: -30 }), this.git4 = this.git4 || c(this.primaryColor, { h: -60 }), this.git5 = this.git5 || c(this.primaryColor, { h: -90 }), this.git6 = this.git6 || c(this.primaryColor, { h: 60 }), this.git7 = this.git7 || c(this.primaryColor, { h: 120 }), this.darkMode ? (this.git0 = S(this.git0, 25), this.git1 = S(this.git1, 25), this.git2 = S(this.git2, 25), this.git3 = S(this.git3, 25), this.git4 = S(this.git4, 25), this.git5 = S(this.git5, 25), this.git6 = S(this.git6, 25), this.git7 = S(this.git7, 25)) : (this.git0 = v(this.git0, 25), this.git1 = v(this.git1, 25), this.git2 = v(this.git2, 25), this.git3 = v(this.git3, 25), this.git4 = v(this.git4, 25), this.git5 = v(this.git5, 25), this.git6 = v(this.git6, 25), this.git7 = v(this.git7, 25)), this.gitInv0 = this.gitInv0 || v(m(this.git0), 25), this.gitInv1 = this.gitInv1 || m(this.git1), this.gitInv2 = this.gitInv2 || m(this.git2), this.gitInv3 = this.gitInv3 || m(this.git3), this.gitInv4 = this.gitInv4 || m(this.git4), this.gitInv5 = this.gitInv5 || m(this.git5), this.gitInv6 = this.gitInv6 || m(this.git6), this.gitInv7 = this.gitInv7 || m(this.git7), this.gitBranchLabel0 = this.gitBranchLabel0 || m(this.labelTextColor), this.gitBranchLabel1 = this.gitBranchLabel1 || this.labelTextColor, this.gitBranchLabel2 = this.gitBranchLabel2 || this.labelTextColor, this.gitBranchLabel3 = this.gitBranchLabel3 || m(this.labelTextColor), this.gitBranchLabel4 = this.gitBranchLabel4 || this.labelTextColor, this.gitBranchLabel5 = this.gitBranchLabel5 || this.labelTextColor, this.gitBranchLabel6 = this.gitBranchLabel6 || this.labelTextColor, this.gitBranchLabel7 = this.gitBranchLabel7 || this.labelTextColor, this.tagLabelColor = this.tagLabelColor || this.primaryTextColor, this.tagLabelBackground = this.tagLabelBackground || this.primaryColor, this.tagLabelBorder = this.tagBorder || this.primaryBorderColor, this.tagLabelFontSize = this.tagLabelFontSize || "10px", this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor, this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor, this.commitLabelFontSize = this.commitLabelFontSize || "10px", this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || Qe, this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || ti;
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
const ah = (t) => {
  const e = new sh();
  return e.calculate(t), e;
};
let lh = class {
  constructor() {
    this.background = "#f4f4f4", this.primaryColor = "#cde498", this.secondaryColor = "#cdffb2", this.background = "white", this.mainBkg = "#cde498", this.secondBkg = "#cdffb2", this.lineColor = "green", this.border1 = "#13540c", this.border2 = "#6eaa49", this.arrowheadColor = "green", this.fontFamily = '"trebuchet ms", verdana, arial, sans-serif', this.fontSize = "16px", this.tertiaryColor = S("#cde498", 10), this.primaryBorderColor = Z(this.primaryColor, this.darkMode), this.secondaryBorderColor = Z(this.secondaryColor, this.darkMode), this.tertiaryBorderColor = Z(this.tertiaryColor, this.darkMode), this.primaryTextColor = m(this.primaryColor), this.secondaryTextColor = m(this.secondaryColor), this.tertiaryTextColor = m(this.primaryColor), this.lineColor = m(this.background), this.textColor = m(this.background), this.THEME_COLOR_LIMIT = 12, this.nodeBkg = "calculated", this.nodeBorder = "calculated", this.clusterBkg = "calculated", this.clusterBorder = "calculated", this.defaultLinkColor = "calculated", this.titleColor = "#333", this.edgeLabelBackground = "#e8e8e8", this.actorBorder = "calculated", this.actorBkg = "calculated", this.actorTextColor = "black", this.actorLineColor = "grey", this.signalColor = "#333", this.signalTextColor = "#333", this.labelBoxBkgColor = "calculated", this.labelBoxBorderColor = "#326932", this.labelTextColor = "calculated", this.loopTextColor = "calculated", this.noteBorderColor = "calculated", this.noteBkgColor = "#fff5ad", this.noteTextColor = "calculated", this.activationBorderColor = "#666", this.activationBkgColor = "#f4f4f4", this.sequenceNumberColor = "white", this.sectionBkgColor = "#6eaa49", this.altSectionBkgColor = "white", this.sectionBkgColor2 = "#6eaa49", this.excludeBkgColor = "#eeeeee", this.taskBorderColor = "calculated", this.taskBkgColor = "#487e3a", this.taskTextLightColor = "white", this.taskTextColor = "calculated", this.taskTextDarkColor = "black", this.taskTextOutsideColor = "calculated", this.taskTextClickableColor = "#003163", this.activeTaskBorderColor = "calculated", this.activeTaskBkgColor = "calculated", this.gridColor = "lightgrey", this.doneTaskBkgColor = "lightgrey", this.doneTaskBorderColor = "grey", this.critBorderColor = "#ff8888", this.critBkgColor = "red", this.todayLineColor = "red", this.personBorder = "calculated", this.personBkg = "calculated", this.labelColor = "black", this.errorBkgColor = "#552222", this.errorTextColor = "#552222";
  }
  updateColors() {
    this.cScale0 = this.cScale0 || this.primaryColor, this.cScale1 = this.cScale1 || this.secondaryColor, this.cScale2 = this.cScale2 || this.tertiaryColor, this.cScale3 = this.cScale3 || c(this.primaryColor, { h: 30 }), this.cScale4 = this.cScale4 || c(this.primaryColor, { h: 60 }), this.cScale5 = this.cScale5 || c(this.primaryColor, { h: 90 }), this.cScale6 = this.cScale6 || c(this.primaryColor, { h: 120 }), this.cScale7 = this.cScale7 || c(this.primaryColor, { h: 150 }), this.cScale8 = this.cScale8 || c(this.primaryColor, { h: 210 }), this.cScale9 = this.cScale9 || c(this.primaryColor, { h: 270 }), this.cScale10 = this.cScale10 || c(this.primaryColor, { h: 300 }), this.cScale11 = this.cScale11 || c(this.primaryColor, { h: 330 }), this["cScalePeer" + 1] = this["cScalePeer" + 1] || v(this.secondaryColor, 45), this["cScalePeer" + 2] = this["cScalePeer" + 2] || v(this.tertiaryColor, 40);
    for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
      this["cScale" + e] = v(this["cScale" + e], 10), this["cScalePeer" + e] = this["cScalePeer" + e] || v(this["cScale" + e], 25);
    for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
      this["cScaleInv" + e] = this["cScaleInv" + e] || c(this["cScale" + e], { h: 180 });
    this.scaleLabelColor = this.scaleLabelColor !== "calculated" && this.scaleLabelColor ? this.scaleLabelColor : this.labelTextColor;
    for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
      this["cScaleLabel" + e] = this["cScaleLabel" + e] || this.scaleLabelColor;
    for (let e = 0; e < 5; e++)
      this["surface" + e] = this["surface" + e] || c(this.mainBkg, { h: 30, s: -30, l: -(5 + e * 5) }), this["surfacePeer" + e] = this["surfacePeer" + e] || c(this.mainBkg, { h: 30, s: -30, l: -(8 + e * 5) });
    this.nodeBkg = this.mainBkg, this.nodeBorder = this.border1, this.clusterBkg = this.secondBkg, this.clusterBorder = this.border2, this.defaultLinkColor = this.lineColor, this.actorBorder = v(this.mainBkg, 20), this.actorBkg = this.mainBkg, this.labelBoxBkgColor = this.actorBkg, this.labelTextColor = this.actorTextColor, this.loopTextColor = this.actorTextColor, this.noteBorderColor = this.border2, this.noteTextColor = this.actorTextColor, this.taskBorderColor = this.border1, this.taskTextColor = this.taskTextLightColor, this.taskTextOutsideColor = this.taskTextDarkColor, this.activeTaskBorderColor = this.taskBorderColor, this.activeTaskBkgColor = this.mainBkg, this.transitionColor = this.transitionColor || this.lineColor, this.transitionLabelColor = this.transitionLabelColor || this.textColor, this.stateLabelColor = this.stateLabelColor || this.stateBkg || this.primaryTextColor, this.stateBkg = this.stateBkg || this.mainBkg, this.labelBackgroundColor = this.labelBackgroundColor || this.stateBkg, this.compositeBackground = this.compositeBackground || this.background || this.tertiaryColor, this.altBackground = this.altBackground || "#f0f0f0", this.compositeTitleBackground = this.compositeTitleBackground || this.mainBkg, this.compositeBorder = this.compositeBorder || this.nodeBorder, this.innerEndBackground = this.primaryBorderColor, this.specialStateColor = this.lineColor, this.errorBkgColor = this.errorBkgColor || this.tertiaryColor, this.errorTextColor = this.errorTextColor || this.tertiaryTextColor, this.transitionColor = this.transitionColor || this.lineColor, this.classText = this.primaryTextColor, this.fillType0 = this.primaryColor, this.fillType1 = this.secondaryColor, this.fillType2 = c(this.primaryColor, { h: 64 }), this.fillType3 = c(this.secondaryColor, { h: 64 }), this.fillType4 = c(this.primaryColor, { h: -64 }), this.fillType5 = c(this.secondaryColor, { h: -64 }), this.fillType6 = c(this.primaryColor, { h: 128 }), this.fillType7 = c(this.secondaryColor, { h: 128 }), this.pie1 = this.pie1 || this.primaryColor, this.pie2 = this.pie2 || this.secondaryColor, this.pie3 = this.pie3 || this.tertiaryColor, this.pie4 = this.pie4 || c(this.primaryColor, { l: -30 }), this.pie5 = this.pie5 || c(this.secondaryColor, { l: -30 }), this.pie6 = this.pie6 || c(this.tertiaryColor, { h: 40, l: -40 }), this.pie7 = this.pie7 || c(this.primaryColor, { h: 60, l: -10 }), this.pie8 = this.pie8 || c(this.primaryColor, { h: -60, l: -10 }), this.pie9 = this.pie9 || c(this.primaryColor, { h: 120, l: 0 }), this.pie10 = this.pie10 || c(this.primaryColor, { h: 60, l: -50 }), this.pie11 = this.pie11 || c(this.primaryColor, { h: -60, l: -50 }), this.pie12 = this.pie12 || c(this.primaryColor, { h: 120, l: -50 }), this.pieTitleTextSize = this.pieTitleTextSize || "25px", this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor, this.pieSectionTextSize = this.pieSectionTextSize || "17px", this.pieSectionTextColor = this.pieSectionTextColor || this.textColor, this.pieLegendTextSize = this.pieLegendTextSize || "17px", this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor, this.pieStrokeColor = this.pieStrokeColor || "black", this.pieStrokeWidth = this.pieStrokeWidth || "2px", this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || "2px", this.pieOuterStrokeColor = this.pieOuterStrokeColor || "black", this.pieOpacity = this.pieOpacity || "0.7", this.requirementBackground = this.requirementBackground || this.primaryColor, this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor, this.requirementBorderSize = this.requirementBorderSize || this.primaryBorderColor, this.requirementTextColor = this.requirementTextColor || this.primaryTextColor, this.relationColor = this.relationColor || this.lineColor, this.relationLabelBackground = this.relationLabelBackground || this.edgeLabelBackground, this.relationLabelColor = this.relationLabelColor || this.actorTextColor, this.git0 = this.git0 || this.primaryColor, this.git1 = this.git1 || this.secondaryColor, this.git2 = this.git2 || this.tertiaryColor, this.git3 = this.git3 || c(this.primaryColor, { h: -30 }), this.git4 = this.git4 || c(this.primaryColor, { h: -60 }), this.git5 = this.git5 || c(this.primaryColor, { h: -90 }), this.git6 = this.git6 || c(this.primaryColor, { h: 60 }), this.git7 = this.git7 || c(this.primaryColor, { h: 120 }), this.darkMode ? (this.git0 = S(this.git0, 25), this.git1 = S(this.git1, 25), this.git2 = S(this.git2, 25), this.git3 = S(this.git3, 25), this.git4 = S(this.git4, 25), this.git5 = S(this.git5, 25), this.git6 = S(this.git6, 25), this.git7 = S(this.git7, 25)) : (this.git0 = v(this.git0, 25), this.git1 = v(this.git1, 25), this.git2 = v(this.git2, 25), this.git3 = v(this.git3, 25), this.git4 = v(this.git4, 25), this.git5 = v(this.git5, 25), this.git6 = v(this.git6, 25), this.git7 = v(this.git7, 25)), this.gitInv0 = this.gitInv0 || m(this.git0), this.gitInv1 = this.gitInv1 || m(this.git1), this.gitInv2 = this.gitInv2 || m(this.git2), this.gitInv3 = this.gitInv3 || m(this.git3), this.gitInv4 = this.gitInv4 || m(this.git4), this.gitInv5 = this.gitInv5 || m(this.git5), this.gitInv6 = this.gitInv6 || m(this.git6), this.gitInv7 = this.gitInv7 || m(this.git7), this.tagLabelColor = this.tagLabelColor || this.primaryTextColor, this.tagLabelBackground = this.tagLabelBackground || this.primaryColor, this.tagLabelBorder = this.tagBorder || this.primaryBorderColor, this.tagLabelFontSize = this.tagLabelFontSize || "10px", this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor, this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor, this.commitLabelFontSize = this.commitLabelFontSize || "10px", this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || Qe, this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || ti;
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
const hh = (t) => {
  const e = new lh();
  return e.calculate(t), e;
};
class ch {
  constructor() {
    this.primaryColor = "#eee", this.contrast = "#707070", this.secondaryColor = S(this.contrast, 55), this.background = "#ffffff", this.tertiaryColor = c(this.primaryColor, { h: -160 }), this.primaryBorderColor = Z(this.primaryColor, this.darkMode), this.secondaryBorderColor = Z(this.secondaryColor, this.darkMode), this.tertiaryBorderColor = Z(this.tertiaryColor, this.darkMode), this.primaryTextColor = m(this.primaryColor), this.secondaryTextColor = m(this.secondaryColor), this.tertiaryTextColor = m(this.tertiaryColor), this.lineColor = m(this.background), this.textColor = m(this.background), this.mainBkg = "#eee", this.secondBkg = "calculated", this.lineColor = "#666", this.border1 = "#999", this.border2 = "calculated", this.note = "#ffa", this.text = "#333", this.critical = "#d42", this.done = "#bbb", this.arrowheadColor = "#333333", this.fontFamily = '"trebuchet ms", verdana, arial, sans-serif', this.fontSize = "16px", this.THEME_COLOR_LIMIT = 12, this.nodeBkg = "calculated", this.nodeBorder = "calculated", this.clusterBkg = "calculated", this.clusterBorder = "calculated", this.defaultLinkColor = "calculated", this.titleColor = "calculated", this.edgeLabelBackground = "white", this.actorBorder = "calculated", this.actorBkg = "calculated", this.actorTextColor = "calculated", this.actorLineColor = "calculated", this.signalColor = "calculated", this.signalTextColor = "calculated", this.labelBoxBkgColor = "calculated", this.labelBoxBorderColor = "calculated", this.labelTextColor = "calculated", this.loopTextColor = "calculated", this.noteBorderColor = "calculated", this.noteBkgColor = "calculated", this.noteTextColor = "calculated", this.activationBorderColor = "#666", this.activationBkgColor = "#f4f4f4", this.sequenceNumberColor = "white", this.sectionBkgColor = "calculated", this.altSectionBkgColor = "white", this.sectionBkgColor2 = "calculated", this.excludeBkgColor = "#eeeeee", this.taskBorderColor = "calculated", this.taskBkgColor = "calculated", this.taskTextLightColor = "white", this.taskTextColor = "calculated", this.taskTextDarkColor = "calculated", this.taskTextOutsideColor = "calculated", this.taskTextClickableColor = "#003163", this.activeTaskBorderColor = "calculated", this.activeTaskBkgColor = "calculated", this.gridColor = "calculated", this.doneTaskBkgColor = "calculated", this.doneTaskBorderColor = "calculated", this.critBkgColor = "calculated", this.critBorderColor = "calculated", this.todayLineColor = "calculated", this.personBorder = "calculated", this.personBkg = "calculated", this.labelColor = "black", this.errorBkgColor = "#552222", this.errorTextColor = "#552222";
  }
  updateColors() {
    this.secondBkg = S(this.contrast, 55), this.border2 = this.contrast, this.cScale0 = this.cScale0 || "#555", this.cScale1 = this.cScale1 || "#F4F4F4", this.cScale2 = this.cScale2 || "#555", this.cScale3 = this.cScale3 || "#BBB", this.cScale4 = this.cScale4 || "#777", this.cScale5 = this.cScale5 || "#999", this.cScale6 = this.cScale6 || "#DDD", this.cScale7 = this.cScale7 || "#FFF", this.cScale8 = this.cScale8 || "#DDD", this.cScale9 = this.cScale9 || "#BBB", this.cScale10 = this.cScale10 || "#999", this.cScale11 = this.cScale11 || "#777";
    for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
      this["cScaleInv" + e] = this["cScaleInv" + e] || m(this["cScale" + e]);
    for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
      this.darkMode ? this["cScalePeer" + e] = this["cScalePeer" + e] || S(this["cScale" + e], 10) : this["cScalePeer" + e] = this["cScalePeer" + e] || v(this["cScale" + e], 10);
    this.scaleLabelColor = this.scaleLabelColor || (this.darkMode ? "black" : this.labelTextColor), this.cScaleLabel0 = this.cScaleLabel0 || this.cScale1, this.cScaleLabel2 = this.cScaleLabel2 || this.cScale1;
    for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
      this["cScaleLabel" + e] = this["cScaleLabel" + e] || this.scaleLabelColor;
    for (let e = 0; e < 5; e++)
      this["surface" + e] = this["surface" + e] || c(this.mainBkg, { l: -(5 + e * 5) }), this["surfacePeer" + e] = this["surfacePeer" + e] || c(this.mainBkg, { l: -(8 + e * 5) });
    this.nodeBkg = this.mainBkg, this.nodeBorder = this.border1, this.clusterBkg = this.secondBkg, this.clusterBorder = this.border2, this.defaultLinkColor = this.lineColor, this.titleColor = this.text, this.actorBorder = S(this.border1, 23), this.actorBkg = this.mainBkg, this.actorTextColor = this.text, this.actorLineColor = this.lineColor, this.signalColor = this.text, this.signalTextColor = this.text, this.labelBoxBkgColor = this.actorBkg, this.labelBoxBorderColor = this.actorBorder, this.labelTextColor = this.text, this.loopTextColor = this.text, this.noteBorderColor = "#999", this.noteBkgColor = "#666", this.noteTextColor = "#fff", this.sectionBkgColor = S(this.contrast, 30), this.sectionBkgColor2 = S(this.contrast, 30), this.taskBorderColor = v(this.contrast, 10), this.taskBkgColor = this.contrast, this.taskTextColor = this.taskTextLightColor, this.taskTextDarkColor = this.text, this.taskTextOutsideColor = this.taskTextDarkColor, this.activeTaskBorderColor = this.taskBorderColor, this.activeTaskBkgColor = this.mainBkg, this.gridColor = S(this.border1, 30), this.doneTaskBkgColor = this.done, this.doneTaskBorderColor = this.lineColor, this.critBkgColor = this.critical, this.critBorderColor = v(this.critBkgColor, 10), this.todayLineColor = this.critBkgColor, this.transitionColor = this.transitionColor || "#000", this.transitionLabelColor = this.transitionLabelColor || this.textColor, this.stateLabelColor = this.stateLabelColor || this.stateBkg || this.primaryTextColor, this.stateBkg = this.stateBkg || this.mainBkg, this.labelBackgroundColor = this.labelBackgroundColor || this.stateBkg, this.compositeBackground = this.compositeBackground || this.background || this.tertiaryColor, this.altBackground = this.altBackground || "#f4f4f4", this.compositeTitleBackground = this.compositeTitleBackground || this.mainBkg, this.stateBorder = this.stateBorder || "#000", this.innerEndBackground = this.primaryBorderColor, this.specialStateColor = "#222", this.errorBkgColor = this.errorBkgColor || this.tertiaryColor, this.errorTextColor = this.errorTextColor || this.tertiaryTextColor, this.classText = this.primaryTextColor, this.fillType0 = this.primaryColor, this.fillType1 = this.secondaryColor, this.fillType2 = c(this.primaryColor, { h: 64 }), this.fillType3 = c(this.secondaryColor, { h: 64 }), this.fillType4 = c(this.primaryColor, { h: -64 }), this.fillType5 = c(this.secondaryColor, { h: -64 }), this.fillType6 = c(this.primaryColor, { h: 128 }), this.fillType7 = c(this.secondaryColor, { h: 128 });
    for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
      this["pie" + e] = this["cScale" + e];
    this.pie12 = this.pie0, this.pieTitleTextSize = this.pieTitleTextSize || "25px", this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor, this.pieSectionTextSize = this.pieSectionTextSize || "17px", this.pieSectionTextColor = this.pieSectionTextColor || this.textColor, this.pieLegendTextSize = this.pieLegendTextSize || "17px", this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor, this.pieStrokeColor = this.pieStrokeColor || "black", this.pieStrokeWidth = this.pieStrokeWidth || "2px", this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || "2px", this.pieOuterStrokeColor = this.pieOuterStrokeColor || "black", this.pieOpacity = this.pieOpacity || "0.7", this.requirementBackground = this.requirementBackground || this.primaryColor, this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor, this.requirementBorderSize = this.requirementBorderSize || this.primaryBorderColor, this.requirementTextColor = this.requirementTextColor || this.primaryTextColor, this.relationColor = this.relationColor || this.lineColor, this.relationLabelBackground = this.relationLabelBackground || this.edgeLabelBackground, this.relationLabelColor = this.relationLabelColor || this.actorTextColor, this.git0 = v(this.pie1, 25) || this.primaryColor, this.git1 = this.pie2 || this.secondaryColor, this.git2 = this.pie3 || this.tertiaryColor, this.git3 = this.pie4 || c(this.primaryColor, { h: -30 }), this.git4 = this.pie5 || c(this.primaryColor, { h: -60 }), this.git5 = this.pie6 || c(this.primaryColor, { h: -90 }), this.git6 = this.pie7 || c(this.primaryColor, { h: 60 }), this.git7 = this.pie8 || c(this.primaryColor, { h: 120 }), this.gitInv0 = this.gitInv0 || m(this.git0), this.gitInv1 = this.gitInv1 || m(this.git1), this.gitInv2 = this.gitInv2 || m(this.git2), this.gitInv3 = this.gitInv3 || m(this.git3), this.gitInv4 = this.gitInv4 || m(this.git4), this.gitInv5 = this.gitInv5 || m(this.git5), this.gitInv6 = this.gitInv6 || m(this.git6), this.gitInv7 = this.gitInv7 || m(this.git7), this.branchLabelColor = this.branchLabelColor || this.labelTextColor, this.gitBranchLabel0 = this.branchLabelColor, this.gitBranchLabel1 = "white", this.gitBranchLabel2 = this.branchLabelColor, this.gitBranchLabel3 = "white", this.gitBranchLabel4 = this.branchLabelColor, this.gitBranchLabel5 = this.branchLabelColor, this.gitBranchLabel6 = this.branchLabelColor, this.gitBranchLabel7 = this.branchLabelColor, this.tagLabelColor = this.tagLabelColor || this.primaryTextColor, this.tagLabelBackground = this.tagLabelBackground || this.primaryColor, this.tagLabelBorder = this.tagBorder || this.primaryBorderColor, this.tagLabelFontSize = this.tagLabelFontSize || "10px", this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor, this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor, this.commitLabelFontSize = this.commitLabelFontSize || "10px", this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || Qe, this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || ti;
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
const uh = (t) => {
  const e = new ch();
  return e.calculate(t), e;
}, Jt = {
  base: {
    getThemeVariables: rh
  },
  dark: {
    getThemeVariables: nh
  },
  default: {
    getThemeVariables: ah
  },
  forest: {
    getThemeVariables: hh
  },
  neutral: {
    getThemeVariables: uh
  }
}, Mt = {
  /**
   * Theme , the CSS style sheet
   *
   * | Parameter | Description     | Type   | Required | Values                                         |
   * | --------- | --------------- | ------ | -------- | ---------------------------------------------- |
   * | theme     | Built in Themes | string | Optional | 'default', 'forest', 'dark', 'neutral', 'null' |
   *
   * **Notes:** To disable any pre-defined mermaid theme, use "null".
   *
   * @example
   *
   * ```js
   * {
   *   "theme": "forest",
   *   "themeCSS": ".node rect { fill: red; }"
   * }
   * ```
   */
  theme: "default",
  themeVariables: Jt.default.getThemeVariables(),
  themeCSS: void 0,
  /* **maxTextSize** - The maximum allowed size of the users text diagram */
  maxTextSize: 5e4,
  darkMode: !1,
  /**
   * | Parameter  | Description                                            | Type   | Required | Values                      |
   * | ---------- | ------------------------------------------------------ | ------ | -------- | --------------------------- |
   * | fontFamily | specifies the font to be used in the rendered diagrams | string | Required | Any Possible CSS FontFamily |
   *
   * **Notes:** Default value: '"trebuchet ms", verdana, arial, sans-serif;'.
   */
  fontFamily: '"trebuchet ms", verdana, arial, sans-serif;',
  /**
   * | Parameter | Description                                           | Type             | Required | Values                                        |
   * | --------- | ----------------------------------------------------- | ---------------- | -------- | --------------------------------------------- |
   * | logLevel  | This option decides the amount of logging to be used. | string \| number | Required | 'trace','debug','info','warn','error','fatal' |
   *
   * **Notes:**
   *
   * - Trace: 0
   * - Debug: 1
   * - Info: 2
   * - Warn: 3
   * - Error: 4
   * - Fatal: 5 (default)
   */
  logLevel: 5,
  /**
   * | Parameter     | Description                       | Type   | Required | Values                                     |
   * | ------------- | --------------------------------- | ------ | -------- | ------------------------------------------ |
   * | securityLevel | Level of trust for parsed diagram | string | Required | 'sandbox', 'strict', 'loose', 'antiscript' |
   *
   * **Notes**:
   *
   * - **strict**: (**default**) tags in text are encoded, click functionality is disabled
   * - **loose**: tags in text are allowed, click functionality is enabled
   * - **antiscript**: html tags in text are allowed, (only script element is removed), click
   *   functionality is enabled
   * - **sandbox**: With this security level all rendering takes place in a sandboxed iframe. This
   *   prevent any JavaScript from running in the context. This may hinder interactive functionality
   *   of the diagram like scripts, popups in sequence diagram or links to other tabs/targets etc.
   */
  securityLevel: "strict",
  /**
   * | Parameter   | Description                                  | Type    | Required | Values      |
   * | ----------- | -------------------------------------------- | ------- | -------- | ----------- |
   * | startOnLoad | Dictates whether mermaid starts on Page load | boolean | Required | true, false |
   *
   * **Notes:** Default value: true
   */
  startOnLoad: !0,
  /**
   * | Parameter           | Description                                                                  | Type    | Required | Values      |
   * | ------------------- | ---------------------------------------------------------------------------- | ------- | -------- | ----------- |
   * | arrowMarkerAbsolute | Controls whether or arrow markers in html code are absolute paths or anchors | boolean | Required | true, false |
   *
   * **Notes**:
   *
   * This matters if you are using base tag settings.
   *
   * Default value: false
   */
  arrowMarkerAbsolute: !1,
  /**
   * This option controls which currentConfig keys are considered _secure_ and can only be changed
   * via call to mermaidAPI.initialize. Calls to mermaidAPI.reinitialize cannot make changes to the
   * `secure` keys in the current currentConfig. This prevents malicious graph directives from
   * overriding a site's default security.
   *
   * **Notes**:
   *
   * Default value: ['secure', 'securityLevel', 'startOnLoad', 'maxTextSize']
   */
  secure: ["secure", "securityLevel", "startOnLoad", "maxTextSize"],
  /**
   * This option controls if the generated ids of nodes in the SVG are generated randomly or based
   * on a seed. If set to false, the IDs are generated based on the current date and thus are not
   * deterministic. This is the default behavior.
   *
   * **Notes**:
   *
   * This matters if your files are checked into source control e.g. git and should not change unless
   * content is changed.
   *
   * Default value: false
   */
  deterministicIds: !1,
  /**
   * This option is the optional seed for deterministic ids. if set to undefined but
   * deterministicIds is true, a simple number iterator is used. You can set this attribute to base
   * the seed on a static string.
   */
  deterministicIDSeed: void 0,
  /** The object containing configurations specific for flowcharts */
  flowchart: {
    /**
     * ### titleTopMargin
     *
     * | Parameter      | Description                                    | Type    | Required | Values             |
     * | -------------- | ---------------------------------------------- | ------- | -------- | ------------------ |
     * | titleTopMargin | Margin top for the text over the flowchart     | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 25
     */
    titleTopMargin: 25,
    /**
     * | Parameter      | Description                                     | Type    | Required | Values             |
     * | -------------- | ----------------------------------------------- | ------- | -------- | ------------------ |
     * | diagramPadding | Amount of padding around the diagram as a whole | Integer | Required | Any Positive Value |
     *
     * **Notes:**
     *
     * The amount of padding around the diagram as a whole so that embedded diagrams have margins,
     * expressed in pixels
     *
     * Default value: 8
     */
    diagramPadding: 8,
    /**
     * | Parameter  | Description                                                                                  | Type    | Required | Values      |
     * | ---------- | -------------------------------------------------------------------------------------------- | ------- | -------- | ----------- |
     * | htmlLabels | Flag for setting whether or not a html tag should be used for rendering labels on the edges. | boolean | Required | true, false |
     *
     * **Notes:** Default value: true.
     */
    htmlLabels: !0,
    /**
     * | Parameter   | Description                                         | Type    | Required | Values              |
     * | ----------- | --------------------------------------------------- | ------- | -------- | ------------------- |
     * | nodeSpacing | Defines the spacing between nodes on the same level | Integer | Required | Any positive Number |
     *
     * **Notes:**
     *
     * Pertains to horizontal spacing for TB (top to bottom) or BT (bottom to top) graphs, and the
     * vertical spacing for LR as well as RL graphs.**
     *
     * Default value: 50
     */
    nodeSpacing: 50,
    /**
     * | Parameter   | Description                                           | Type    | Required | Values              |
     * | ----------- | ----------------------------------------------------- | ------- | -------- | ------------------- |
     * | rankSpacing | Defines the spacing between nodes on different levels | Integer | Required | Any Positive Number |
     *
     * **Notes**:
     *
     * Pertains to vertical spacing for TB (top to bottom) or BT (bottom to top), and the horizontal
     * spacing for LR as well as RL graphs.
     *
     * Default value 50
     */
    rankSpacing: 50,
    /**
     * | Parameter | Description                                        | Type   | Required | Values                        |
     * | --------- | -------------------------------------------------- | ------ | -------- | ----------------------------- |
     * | curve     | Defines how mermaid renders curves for flowcharts. | string | Required | 'basis', 'linear', 'cardinal' |
     *
     * **Notes:**
     *
     * Default Value: 'basis'
     */
    curve: "basis",
    // Only used in new experimental rendering
    // represents the padding between the labels and the shape
    padding: 15,
    /**
     * | Parameter   | Description | Type    | Required | Values      |
     * | ----------- | ----------- | ------- | -------- | ----------- |
     * | useMaxWidth | See notes   | boolean | 4        | true, false |
     *
     * **Notes:**
     *
     * When this flag is set the height and width is set to 100% and is then scaling with the
     * available space if not the absolute space required is used.
     *
     * Default value: true
     */
    useMaxWidth: !0,
    /**
     * | Parameter       | Description | Type    | Required | Values                  |
     * | --------------- | ----------- | ------- | -------- | ----------------------- |
     * | defaultRenderer | See notes   | boolean | 4        | dagre-d3, dagre-wrapper, elk |
     *
     * **Notes:**
     *
     * Decides which rendering engine that is to be used for the rendering. Legal values are:
     * dagre-d3 dagre-wrapper - wrapper for dagre implemented in mermaid, elk for layout using
     * elkjs
     *
     * Default value: 'dagre-wrapper'
     */
    defaultRenderer: "dagre-wrapper",
    /**
     * | Parameter       | Description | Type    | Required | Values                  |
     * | --------------- | ----------- | ------- | -------- | ----------------------- |
     * | wrappingWidth   | See notes   | number  | 4        | width of nodes where text is wrapped |
     *
     * **Notes:**
     *
     * When using markdown strings the text ius wrapped automatically, this
     * value sets the max width of a text before it continues on a new line.
     * Default value: 'dagre-wrapper'
     */
    wrappingWidth: 200
  },
  /** The object containing configurations specific for sequence diagrams */
  sequence: {
    hideUnusedParticipants: !1,
    /**
     * | Parameter       | Description                  | Type    | Required | Values             |
     * | --------------- | ---------------------------- | ------- | -------- | ------------------ |
     * | activationWidth | Width of the activation rect | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value :10
     */
    activationWidth: 10,
    /**
     * | Parameter      | Description                                          | Type    | Required | Values             |
     * | -------------- | ---------------------------------------------------- | ------- | -------- | ------------------ |
     * | diagramMarginX | Margin to the right and left of the sequence diagram | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 50
     */
    diagramMarginX: 50,
    /**
     * | Parameter      | Description                                       | Type    | Required | Values             |
     * | -------------- | ------------------------------------------------- | ------- | -------- | ------------------ |
     * | diagramMarginY | Margin to the over and under the sequence diagram | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 10
     */
    diagramMarginY: 10,
    /**
     * | Parameter   | Description           | Type    | Required | Values             |
     * | ----------- | --------------------- | ------- | -------- | ------------------ |
     * | actorMargin | Margin between actors | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 50
     */
    actorMargin: 50,
    /**
     * | Parameter | Description          | Type    | Required | Values             |
     * | --------- | -------------------- | ------- | -------- | ------------------ |
     * | width     | Width of actor boxes | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 150
     */
    width: 150,
    /**
     * | Parameter | Description           | Type    | Required | Values             |
     * | --------- | --------------------- | ------- | -------- | ------------------ |
     * | height    | Height of actor boxes | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 65
     */
    height: 65,
    /**
     * | Parameter | Description              | Type    | Required | Values             |
     * | --------- | ------------------------ | ------- | -------- | ------------------ |
     * | boxMargin | Margin around loop boxes | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 10
     */
    boxMargin: 10,
    /**
     * | Parameter     | Description                                  | Type    | Required | Values             |
     * | ------------- | -------------------------------------------- | ------- | -------- | ------------------ |
     * | boxTextMargin | Margin around the text in loop/alt/opt boxes | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 5
     */
    boxTextMargin: 5,
    /**
     * | Parameter  | Description         | Type    | Required | Values             |
     * | ---------- | ------------------- | ------- | -------- | ------------------ |
     * | noteMargin | margin around notes | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 10
     */
    noteMargin: 10,
    /**
     * | Parameter     | Description            | Type    | Required | Values             |
     * | ------------- | ---------------------- | ------- | -------- | ------------------ |
     * | messageMargin | Space between messages | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 35
     */
    messageMargin: 35,
    /**
     * | Parameter    | Description                 | Type   | Required | Values                    |
     * | ------------ | --------------------------- | ------ | -------- | ------------------------- |
     * | messageAlign | Multiline message alignment | string | Required | 'left', 'center', 'right' |
     *
     * **Notes:** Default value: 'center'
     */
    messageAlign: "center",
    /**
     * | Parameter    | Description                 | Type    | Required | Values      |
     * | ------------ | --------------------------- | ------- | -------- | ----------- |
     * | mirrorActors | Mirror actors under diagram | boolean | Required | true, false |
     *
     * **Notes:** Default value: true
     */
    mirrorActors: !0,
    /**
     * | Parameter  | Description                                                             | Type    | Required | Values      |
     * | ---------- | ----------------------------------------------------------------------- | ------- | -------- | ----------- |
     * | forceMenus | forces actor popup menus to always be visible (to support E2E testing). | Boolean | Required | True, False |
     *
     * **Notes:**
     *
     * Default value: false.
     */
    forceMenus: !1,
    /**
     * | Parameter       | Description                                | Type    | Required | Values             |
     * | --------------- | ------------------------------------------ | ------- | -------- | ------------------ |
     * | bottomMarginAdj | Prolongs the edge of the diagram downwards | Integer | Required | Any Positive Value |
     *
     * **Notes:**
     *
     * Depending on css styling this might need adjustment.
     *
     * Default value: 1
     */
    bottomMarginAdj: 1,
    /**
     * | Parameter   | Description | Type    | Required | Values      |
     * | ----------- | ----------- | ------- | -------- | ----------- |
     * | useMaxWidth | See Notes   | boolean | Required | true, false |
     *
     * **Notes:** When this flag is set to true, the height and width is set to 100% and is then
     * scaling with the available space. If set to false, the absolute space required is used.
     *
     * Default value: true
     */
    useMaxWidth: !0,
    /**
     * | Parameter   | Description                          | Type    | Required | Values      |
     * | ----------- | ------------------------------------ | ------- | -------- | ----------- |
     * | rightAngles | display curve arrows as right angles | boolean | Required | true, false |
     *
     * **Notes:**
     *
     * This will display arrows that start and begin at the same node as right angles, rather than a
     * curve
     *
     * Default value: false
     */
    rightAngles: !1,
    /**
     * | Parameter           | Description                     | Type    | Required | Values      |
     * | ------------------- | ------------------------------- | ------- | -------- | ----------- |
     * | showSequenceNumbers | This will show the node numbers | boolean | Required | true, false |
     *
     * **Notes:** Default value: false
     */
    showSequenceNumbers: !1,
    /**
     * | Parameter     | Description                                        | Type    | Required | Values             |
     * | ------------- | -------------------------------------------------- | ------- | -------- | ------------------ |
     * | actorFontSize | This sets the font size of the actor's description | Integer | Require  | Any Positive Value |
     *
     * **Notes:** **Default value 14**..
     */
    actorFontSize: 14,
    /**
     * | Parameter       | Description                                          | Type   | Required | Values                      |
     * | --------------- | ---------------------------------------------------- | ------ | -------- | --------------------------- |
     * | actorFontFamily | This sets the font family of the actor's description | string | Required | Any Possible CSS FontFamily |
     *
     * **Notes:** Default value: "'Open Sans", sans-serif'
     */
    actorFontFamily: '"Open Sans", sans-serif',
    /**
     * This sets the font weight of the actor's description
     *
     * **Notes:** Default value: 400.
     */
    actorFontWeight: 400,
    /**
     * | Parameter    | Description                                     | Type    | Required | Values             |
     * | ------------ | ----------------------------------------------- | ------- | -------- | ------------------ |
     * | noteFontSize | This sets the font size of actor-attached notes | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 14
     */
    noteFontSize: 14,
    /**
     * | Parameter      | Description                                        | Type   | Required | Values                      |
     * | -------------- | -------------------------------------------------- | ------ | -------- | --------------------------- |
     * | noteFontFamily | This sets the font family of actor-attached notes. | string | Required | Any Possible CSS FontFamily |
     *
     * **Notes:** Default value: ''"trebuchet ms", verdana, arial, sans-serif'
     */
    noteFontFamily: '"trebuchet ms", verdana, arial, sans-serif',
    /**
     * This sets the font weight of the note's description
     *
     * **Notes:** Default value: 400
     */
    noteFontWeight: 400,
    /**
     * | Parameter | Description                                          | Type   | Required | Values                    |
     * | --------- | ---------------------------------------------------- | ------ | -------- | ------------------------- |
     * | noteAlign | This sets the text alignment of actor-attached notes | string | required | 'left', 'center', 'right' |
     *
     * **Notes:** Default value: 'center'
     */
    noteAlign: "center",
    /**
     * | Parameter       | Description                               | Type    | Required | Values              |
     * | --------------- | ----------------------------------------- | ------- | -------- | ------------------- |
     * | messageFontSize | This sets the font size of actor messages | Integer | Required | Any Positive Number |
     *
     * **Notes:** Default value: 16
     */
    messageFontSize: 16,
    /**
     * | Parameter         | Description                                 | Type   | Required | Values                      |
     * | ----------------- | ------------------------------------------- | ------ | -------- | --------------------------- |
     * | messageFontFamily | This sets the font family of actor messages | string | Required | Any Possible CSS FontFamily |
     *
     * **Notes:** Default value: '"trebuchet ms", verdana, arial, sans-serif'
     */
    messageFontFamily: '"trebuchet ms", verdana, arial, sans-serif',
    /**
     * This sets the font weight of the message's description
     *
     * **Notes:** Default value: 400.
     */
    messageFontWeight: 400,
    /**
     * This sets the auto-wrap state for the diagram
     *
     * **Notes:** Default value: false.
     */
    wrap: !1,
    /**
     * This sets the auto-wrap padding for the diagram (sides only)
     *
     * **Notes:** Default value: 0.
     */
    wrapPadding: 10,
    /**
     * This sets the width of the loop-box (loop, alt, opt, par)
     *
     * **Notes:** Default value: 50.
     */
    labelBoxWidth: 50,
    /**
     * This sets the height of the loop-box (loop, alt, opt, par)
     *
     * **Notes:** Default value: 20.
     */
    labelBoxHeight: 20,
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
  /** The object containing configurations specific for gantt diagrams */
  gantt: {
    /**
     * ### titleTopMargin
     *
     * | Parameter      | Description                                    | Type    | Required | Values             |
     * | -------------- | ---------------------------------------------- | ------- | -------- | ------------------ |
     * | titleTopMargin | Margin top for the text over the gantt diagram | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 25
     */
    titleTopMargin: 25,
    /**
     * | Parameter | Description                         | Type    | Required | Values             |
     * | --------- | ----------------------------------- | ------- | -------- | ------------------ |
     * | barHeight | The height of the bars in the graph | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 20
     */
    barHeight: 20,
    /**
     * | Parameter | Description                                                      | Type    | Required | Values             |
     * | --------- | ---------------------------------------------------------------- | ------- | -------- | ------------------ |
     * | barGap    | The margin between the different activities in the gantt diagram | Integer | Optional | Any Positive Value |
     *
     * **Notes:** Default value: 4
     */
    barGap: 4,
    /**
     * | Parameter  | Description                                                                | Type    | Required | Values             |
     * | ---------- | -------------------------------------------------------------------------- | ------- | -------- | ------------------ |
     * | topPadding | Margin between title and gantt diagram and between axis and gantt diagram. | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 50
     */
    topPadding: 50,
    /**
     * | Parameter    | Description                                                             | Type    | Required | Values             |
     * | ------------ | ----------------------------------------------------------------------- | ------- | -------- | ------------------ |
     * | rightPadding | The space allocated for the section name to the right of the activities | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 75
     */
    rightPadding: 75,
    /**
     * | Parameter   | Description                                                            | Type    | Required | Values             |
     * | ----------- | ---------------------------------------------------------------------- | ------- | -------- | ------------------ |
     * | leftPadding | The space allocated for the section name to the left of the activities | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 75
     */
    leftPadding: 75,
    /**
     * | Parameter            | Description                                  | Type    | Required | Values             |
     * | -------------------- | -------------------------------------------- | ------- | -------- | ------------------ |
     * | gridLineStartPadding | Vertical starting position of the grid lines | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 35
     */
    gridLineStartPadding: 35,
    /**
     * | Parameter | Description | Type    | Required | Values             |
     * | --------- | ----------- | ------- | -------- | ------------------ |
     * | fontSize  | Font size   | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 11
     */
    fontSize: 11,
    /**
     * | Parameter       | Description            | Type    | Required | Values             |
     * | --------------- | ---------------------- | ------- | -------- | ------------------ |
     * | sectionFontSize | Font size for sections | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 11
     */
    sectionFontSize: 11,
    /**
     * | Parameter           | Description                              | Type    | Required | Values             |
     * | ------------------- | ---------------------------------------- | ------- | -------- | ------------------ |
     * | numberSectionStyles | The number of alternating section styles | Integer | 4        | Any Positive Value |
     *
     * **Notes:** Default value: 4
     */
    numberSectionStyles: 4,
    /**
     * | Parameter   | Description               | Type   | Required | Values    |
     * | ----------- | ------------------------- | ------ | -------- | --------- |
     * | displayMode | Controls the display mode | string | 4        | 'compact' |
     *
     * **Notes**:
     *
     * - **compact**: Enables displaying multiple tasks on the same row.
     */
    displayMode: "",
    /**
     * | Parameter  | Description                  | Type | Required | Values           |
     * | ---------- | ---------------------------- | ---- | -------- | ---------------- |
     * | axisFormat | Date/time format of the axis | 3    | Required | Date in yy-mm-dd |
     *
     * **Notes:**
     *
     * This might need adjustment to match your locale and preferences
     *
     * Default value: '%Y-%m-%d'.
     */
    axisFormat: "%Y-%m-%d",
    /**
     * | Parameter    | Description | Type   | Required | Values  |
     * | ------------ | ------------| ------ | -------- | ------- |
     * | tickInterval | axis ticks  | string | Optional | string  |
     *
     * **Notes:**
     *
     * Pattern is /^([1-9][0-9]*)(minute|hour|day|week|month)$/
     *
     * Default value: undefined
     */
    tickInterval: void 0,
    /**
     * | Parameter   | Description | Type    | Required | Values      |
     * | ----------- | ----------- | ------- | -------- | ----------- |
     * | useMaxWidth | See notes   | boolean | 4        | true, false |
     *
     * **Notes:**
     *
     * When this flag is set the height and width is set to 100% and is then scaling with the
     * available space if not the absolute space required is used.
     *
     * Default value: true
     */
    useMaxWidth: !0,
    /**
     * | Parameter | Description | Type    | Required | Values      |
     * | --------- | ----------- | ------- | -------- | ----------- |
     * | topAxis   | See notes   | Boolean | 4        | True, False |
     *
     * **Notes:** when this flag is set date labels will be added to the top of the chart
     *
     * **Default value false**.
     */
    topAxis: !1,
    useWidth: void 0
  },
  /** The object containing configurations specific for journey diagrams */
  journey: {
    /**
     * | Parameter      | Description                                          | Type    | Required | Values             |
     * | -------------- | ---------------------------------------------------- | ------- | -------- | ------------------ |
     * | diagramMarginX | Margin to the right and left of the sequence diagram | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 50
     */
    diagramMarginX: 50,
    /**
     * | Parameter      | Description                                        | Type    | Required | Values             |
     * | -------------- | -------------------------------------------------- | ------- | -------- | ------------------ |
     * | diagramMarginY | Margin to the over and under the sequence diagram. | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 10
     */
    diagramMarginY: 10,
    /**
     * | Parameter   | Description           | Type    | Required | Values             |
     * | ----------- | --------------------- | ------- | -------- | ------------------ |
     * | actorMargin | Margin between actors | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 50
     */
    leftMargin: 150,
    /**
     * | Parameter | Description          | Type    | Required | Values             |
     * | --------- | -------------------- | ------- | -------- | ------------------ |
     * | width     | Width of actor boxes | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 150
     */
    width: 150,
    /**
     * | Parameter | Description           | Type    | Required | Values             |
     * | --------- | --------------------- | ------- | -------- | ------------------ |
     * | height    | Height of actor boxes | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 65
     */
    height: 50,
    /**
     * | Parameter | Description              | Type    | Required | Values             |
     * | --------- | ------------------------ | ------- | -------- | ------------------ |
     * | boxMargin | Margin around loop boxes | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 10
     */
    boxMargin: 10,
    /**
     * | Parameter     | Description                                  | Type    | Required | Values             |
     * | ------------- | -------------------------------------------- | ------- | -------- | ------------------ |
     * | boxTextMargin | Margin around the text in loop/alt/opt boxes | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 5
     */
    boxTextMargin: 5,
    /**
     * | Parameter  | Description         | Type    | Required | Values             |
     * | ---------- | ------------------- | ------- | -------- | ------------------ |
     * | noteMargin | Margin around notes | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 10
     */
    noteMargin: 10,
    /**
     * | Parameter     | Description             | Type    | Required | Values             |
     * | ------------- | ----------------------- | ------- | -------- | ------------------ |
     * | messageMargin | Space between messages. | Integer | Required | Any Positive Value |
     *
     * **Notes:**
     *
     * Space between messages.
     *
     * Default value: 35
     */
    messageMargin: 35,
    /**
     * | Parameter    | Description                 | Type | Required | Values                    |
     * | ------------ | --------------------------- | ---- | -------- | ------------------------- |
     * | messageAlign | Multiline message alignment | 3    | 4        | 'left', 'center', 'right' |
     *
     * **Notes:** Default value: 'center'
     */
    messageAlign: "center",
    /**
     * | Parameter       | Description                                | Type    | Required | Values             |
     * | --------------- | ------------------------------------------ | ------- | -------- | ------------------ |
     * | bottomMarginAdj | Prolongs the edge of the diagram downwards | Integer | 4        | Any Positive Value |
     *
     * **Notes:**
     *
     * Depending on css styling this might need adjustment.
     *
     * Default value: 1
     */
    bottomMarginAdj: 1,
    /**
     * | Parameter   | Description | Type    | Required | Values      |
     * | ----------- | ----------- | ------- | -------- | ----------- |
     * | useMaxWidth | See notes   | boolean | 4        | true, false |
     *
     * **Notes:**
     *
     * When this flag is set the height and width is set to 100% and is then scaling with the
     * available space if not the absolute space required is used.
     *
     * Default value: true
     */
    useMaxWidth: !0,
    /**
     * | Parameter   | Description                       | Type | Required | Values      |
     * | ----------- | --------------------------------- | ---- | -------- | ----------- |
     * | rightAngles | Curved Arrows become Right Angles | 3    | 4        | true, false |
     *
     * **Notes:**
     *
     * This will display arrows that start and begin at the same node as right angles, rather than a
     * curves
     *
     * Default value: false
     */
    rightAngles: !1,
    taskFontSize: 14,
    taskFontFamily: '"Open Sans", sans-serif',
    taskMargin: 50,
    // width of activation box
    activationWidth: 10,
    // text placement as: tspan | fo | old only text as before
    textPlacement: "fo",
    actorColours: ["#8FBC8F", "#7CFC00", "#00FFFF", "#20B2AA", "#B0E0E6", "#FFFFE0"],
    sectionFills: ["#191970", "#8B008B", "#4B0082", "#2F4F4F", "#800000", "#8B4513", "#00008B"],
    sectionColours: ["#fff"]
  },
  /** The object containing configurations specific for timeline diagrams */
  timeline: {
    /**
     * | Parameter      | Description                                          | Type    | Required | Values             |
     * | -------------- | ---------------------------------------------------- | ------- | -------- | ------------------ |
     * | diagramMarginX | Margin to the right and left of the sequence diagram | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 50
     */
    diagramMarginX: 50,
    /**
     * | Parameter      | Description                                        | Type    | Required | Values             |
     * | -------------- | -------------------------------------------------- | ------- | -------- | ------------------ |
     * | diagramMarginY | Margin to the over and under the sequence diagram. | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 10
     */
    diagramMarginY: 10,
    /**
     * | Parameter   | Description           | Type    | Required | Values             |
     * | ----------- | --------------------- | ------- | -------- | ------------------ |
     * | actorMargin | Margin between actors | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 50
     */
    leftMargin: 150,
    /**
     * | Parameter | Description          | Type    | Required | Values             |
     * | --------- | -------------------- | ------- | -------- | ------------------ |
     * | width     | Width of actor boxes | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 150
     */
    width: 150,
    /**
     * | Parameter | Description           | Type    | Required | Values             |
     * | --------- | --------------------- | ------- | -------- | ------------------ |
     * | height    | Height of actor boxes | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 65
     */
    height: 50,
    /**
     * | Parameter | Description              | Type    | Required | Values             |
     * | --------- | ------------------------ | ------- | -------- | ------------------ |
     * | boxMargin | Margin around loop boxes | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 10
     */
    boxMargin: 10,
    /**
     * | Parameter     | Description                                  | Type    | Required | Values             |
     * | ------------- | -------------------------------------------- | ------- | -------- | ------------------ |
     * | boxTextMargin | Margin around the text in loop/alt/opt boxes | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 5
     */
    boxTextMargin: 5,
    /**
     * | Parameter  | Description         | Type    | Required | Values             |
     * | ---------- | ------------------- | ------- | -------- | ------------------ |
     * | noteMargin | Margin around notes | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 10
     */
    noteMargin: 10,
    /**
     * | Parameter     | Description             | Type    | Required | Values             |
     * | ------------- | ----------------------- | ------- | -------- | ------------------ |
     * | messageMargin | Space between messages. | Integer | Required | Any Positive Value |
     *
     * **Notes:**
     *
     * Space between messages.
     *
     * Default value: 35
     */
    messageMargin: 35,
    /**
     * | Parameter    | Description                 | Type | Required | Values                    |
     * | ------------ | --------------------------- | ---- | -------- | ------------------------- |
     * | messageAlign | Multiline message alignment | 3    | 4        | 'left', 'center', 'right' |
     *
     * **Notes:** Default value: 'center'
     */
    messageAlign: "center",
    /**
     * | Parameter       | Description                                | Type    | Required | Values             |
     * | --------------- | ------------------------------------------ | ------- | -------- | ------------------ |
     * | bottomMarginAdj | Prolongs the edge of the diagram downwards | Integer | 4        | Any Positive Value |
     *
     * **Notes:**
     *
     * Depending on css styling this might need adjustment.
     *
     * Default value: 1
     */
    bottomMarginAdj: 1,
    /**
     * | Parameter   | Description | Type    | Required | Values      |
     * | ----------- | ----------- | ------- | -------- | ----------- |
     * | useMaxWidth | See notes   | boolean | 4        | true, false |
     *
     * **Notes:**
     *
     * When this flag is set the height and width is set to 100% and is then scaling with the
     * available space if not the absolute space required is used.
     *
     * Default value: true
     */
    useMaxWidth: !0,
    /**
     * | Parameter   | Description                       | Type | Required | Values      |
     * | ----------- | --------------------------------- | ---- | -------- | ----------- |
     * | rightAngles | Curved Arrows become Right Angles | 3    | 4        | true, false |
     *
     * **Notes:**
     *
     * This will display arrows that start and begin at the same node as right angles, rather than a
     * curves
     *
     * Default value: false
     */
    rightAngles: !1,
    taskFontSize: 14,
    taskFontFamily: '"Open Sans", sans-serif',
    taskMargin: 50,
    // width of activation box
    activationWidth: 10,
    // text placement as: tspan | fo | old only text as before
    textPlacement: "fo",
    actorColours: ["#8FBC8F", "#7CFC00", "#00FFFF", "#20B2AA", "#B0E0E6", "#FFFFE0"],
    sectionFills: ["#191970", "#8B008B", "#4B0082", "#2F4F4F", "#800000", "#8B4513", "#00008B"],
    sectionColours: ["#fff"],
    disableMulticolor: !1
  },
  class: {
    /**
     * ### titleTopMargin
     *
     * | Parameter      | Description                                    | Type    | Required | Values             |
     * | -------------- | ---------------------------------------------- | ------- | -------- | ------------------ |
     * | titleTopMargin | Margin top for the text over the class diagram | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 25
     */
    titleTopMargin: 25,
    arrowMarkerAbsolute: !1,
    dividerMargin: 10,
    padding: 5,
    textHeight: 10,
    /**
     * | Parameter   | Description | Type    | Required | Values      |
     * | ----------- | ----------- | ------- | -------- | ----------- |
     * | useMaxWidth | See notes   | boolean | 4        | true, false |
     *
     * **Notes:**
     *
     * When this flag is set the height and width is set to 100% and is then scaling with the
     * available space if not the absolute space required is used.
     *
     * Default value: true
     */
    useMaxWidth: !0,
    /**
     * | Parameter       | Description | Type    | Required | Values                  |
     * | --------------- | ----------- | ------- | -------- | ----------------------- |
     * | defaultRenderer | See notes   | boolean | 4        | dagre-d3, dagre-wrapper |
     *
     * **Notes**:
     *
     * Decides which rendering engine that is to be used for the rendering. Legal values are:
     * dagre-d3 dagre-wrapper - wrapper for dagre implemented in mermaid
     *
     * Default value: 'dagre-d3'
     */
    defaultRenderer: "dagre-wrapper"
  },
  state: {
    /**
     * ### titleTopMargin
     *
     * | Parameter      | Description                                    | Type    | Required | Values             |
     * | -------------- | ---------------------------------------------- | ------- | -------- | ------------------ |
     * | titleTopMargin | Margin top for the text over the state diagram | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 25
     */
    titleTopMargin: 25,
    dividerMargin: 10,
    sizeUnit: 5,
    padding: 8,
    textHeight: 10,
    titleShift: -15,
    noteMargin: 10,
    forkWidth: 70,
    forkHeight: 7,
    // Used
    miniPadding: 2,
    // Font size factor, this is used to guess the width of the edges labels before rendering by dagre
    // layout. This might need updating if/when switching font
    fontSizeFactor: 5.02,
    fontSize: 24,
    labelHeight: 16,
    edgeLengthFactor: "20",
    compositTitleSize: 35,
    radius: 5,
    /**
     * | Parameter   | Description | Type    | Required | Values      |
     * | ----------- | ----------- | ------- | -------- | ----------- |
     * | useMaxWidth | See notes   | boolean | 4        | true, false |
     *
     * **Notes:**
     *
     * When this flag is set the height and width is set to 100% and is then scaling with the
     * available space if not the absolute space required is used.
     *
     * Default value: true
     */
    useMaxWidth: !0,
    /**
     * | Parameter       | Description | Type    | Required | Values                  |
     * | --------------- | ----------- | ------- | -------- | ----------------------- |
     * | defaultRenderer | See notes   | boolean | 4        | dagre-d3, dagre-wrapper |
     *
     * **Notes:**
     *
     * Decides which rendering engine that is to be used for the rendering. Legal values are:
     * dagre-d3 dagre-wrapper - wrapper for dagre implemented in mermaid
     *
     * Default value: 'dagre-d3'
     */
    defaultRenderer: "dagre-wrapper"
  },
  /** The object containing configurations specific for entity relationship diagrams */
  er: {
    /**
     * ### titleTopMargin
     *
     * | Parameter      | Description                                    | Type    | Required | Values             |
     * | -------------- | ---------------------------------------------- | ------- | -------- | ------------------ |
     * | titleTopMargin | Margin top for the text over the diagram       | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 25
     */
    titleTopMargin: 25,
    /**
     * | Parameter      | Description                                     | Type    | Required | Values             |
     * | -------------- | ----------------------------------------------- | ------- | -------- | ------------------ |
     * | diagramPadding | Amount of padding around the diagram as a whole | Integer | Required | Any Positive Value |
     *
     * **Notes:**
     *
     * The amount of padding around the diagram as a whole so that embedded diagrams have margins,
     * expressed in pixels
     *
     * Default value: 20
     */
    diagramPadding: 20,
    /**
     * | Parameter       | Description                              | Type   | Required | Values                 |
     * | --------------- | ---------------------------------------- | ------ | -------- | ---------------------- |
     * | layoutDirection | Directional bias for layout of entities. | string | Required | "TB", "BT", "LR", "RL" |
     *
     * **Notes:**
     *
     * 'TB' for Top-Bottom, 'BT'for Bottom-Top, 'LR' for Left-Right, or 'RL' for Right to Left.
     *
     * T = top, B = bottom, L = left, and R = right.
     *
     * Default value: 'TB'
     */
    layoutDirection: "TB",
    /**
     * | Parameter      | Description                        | Type    | Required | Values             |
     * | -------------- | ---------------------------------- | ------- | -------- | ------------------ |
     * | minEntityWidth | The minimum width of an entity box | Integer | Required | Any Positive Value |
     *
     * **Notes:** Expressed in pixels. Default value: 100
     */
    minEntityWidth: 100,
    /**
     * | Parameter       | Description                         | Type    | Required | Values             |
     * | --------------- | ----------------------------------- | ------- | -------- | ------------------ |
     * | minEntityHeight | The minimum height of an entity box | Integer | 4        | Any Positive Value |
     *
     * **Notes:** Expressed in pixels Default value: 75
     */
    minEntityHeight: 75,
    /**
     * | Parameter     | Description                                                  | Type    | Required | Values             |
     * | ------------- | ------------------------------------------------------------ | ------- | -------- | ------------------ |
     * | entityPadding | Minimum internal padding between text in box and box borders | Integer | 4        | Any Positive Value |
     *
     * **Notes:**
     *
     * The minimum internal padding between text in an entity box and the enclosing box borders,
     * expressed in pixels.
     *
     * Default value: 15
     */
    entityPadding: 15,
    /**
     * | Parameter | Description                         | Type   | Required | Values               |
     * | --------- | ----------------------------------- | ------ | -------- | -------------------- |
     * | stroke    | Stroke color of box edges and lines | string | 4        | Any recognized color |
     *
     * **Notes:** Default value: 'gray'
     */
    stroke: "gray",
    /**
     * | Parameter | Description                | Type   | Required | Values               |
     * | --------- | -------------------------- | ------ | -------- | -------------------- |
     * | fill      | Fill color of entity boxes | string | 4        | Any recognized color |
     *
     * **Notes:** Default value: 'honeydew'
     */
    fill: "honeydew",
    /**
     * | Parameter | Description         | Type    | Required | Values             |
     * | --------- | ------------------- | ------- | -------- | ------------------ |
     * | fontSize  | Font Size in pixels | Integer |          | Any Positive Value |
     *
     * **Notes:**
     *
     * Font size (expressed as an integer representing a number of pixels) Default value: 12
     */
    fontSize: 12,
    /**
     * | Parameter   | Description | Type    | Required | Values      |
     * | ----------- | ----------- | ------- | -------- | ----------- |
     * | useMaxWidth | See Notes   | boolean | Required | true, false |
     *
     * **Notes:**
     *
     * When this flag is set to true, the diagram width is locked to 100% and scaled based on
     * available space. If set to false, the diagram reserves its absolute width.
     *
     * Default value: true
     */
    useMaxWidth: !0
  },
  /** The object containing configurations specific for pie diagrams */
  pie: {
    useWidth: void 0,
    /**
     * | Parameter   | Description | Type    | Required | Values      |
     * | ----------- | ----------- | ------- | -------- | ----------- |
     * | useMaxWidth | See Notes   | boolean | Required | true, false |
     *
     * **Notes:**
     *
     * When this flag is set to true, the diagram width is locked to 100% and scaled based on
     * available space. If set to false, the diagram reserves its absolute width.
     *
     * Default value: true
     */
    useMaxWidth: !0,
    /**
     * | Parameter    | Description                                                                      | Type    | Required | Values              |
     * | ------------ | -------------------------------------------------------------------------------- | ------- | -------- | ------------------- |
     * | textPosition | Axial position of slice's label from zero at the center to 1 at the outside edge | Number  | Optional | Decimal from 0 to 1 |
     *
     * **Notes:** Default value: 0.75
     */
    textPosition: 0.75
  },
  /** The object containing configurations specific for req diagrams */
  requirement: {
    useWidth: void 0,
    /**
     * | Parameter   | Description | Type    | Required | Values      |
     * | ----------- | ----------- | ------- | -------- | ----------- |
     * | useMaxWidth | See Notes   | boolean | Required | true, false |
     *
     * **Notes:**
     *
     * When this flag is set to true, the diagram width is locked to 100% and scaled based on
     * available space. If set to false, the diagram reserves its absolute width.
     *
     * Default value: true
     */
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
  gitGraph: {
    /**
     * ### titleTopMargin
     *
     * | Parameter      | Description                                    | Type    | Required | Values             |
     * | -------------- | ---------------------------------------------- | ------- | -------- | ------------------ |
     * | titleTopMargin | Margin top for the text over the Git diagram   | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 25
     */
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
    rotateCommitLabel: !0
  },
  /** The object containing configurations specific for c4 diagrams */
  c4: {
    useWidth: void 0,
    /**
     * | Parameter      | Description                                    | Type    | Required | Values             |
     * | -------------- | ---------------------------------------------- | ------- | -------- | ------------------ |
     * | diagramMarginX | Margin to the right and left of the c4 diagram | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 50
     */
    diagramMarginX: 50,
    /**
     * | Parameter      | Description                                 | Type    | Required | Values             |
     * | -------------- | ------------------------------------------- | ------- | -------- | ------------------ |
     * | diagramMarginY | Margin to the over and under the c4 diagram | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 10
     */
    diagramMarginY: 10,
    /**
     * | Parameter     | Description           | Type    | Required | Values             |
     * | ------------- | --------------------- | ------- | -------- | ------------------ |
     * | c4ShapeMargin | Margin between shapes | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 50
     */
    c4ShapeMargin: 50,
    /**
     * | Parameter      | Description            | Type    | Required | Values             |
     * | -------------- | ---------------------- | ------- | -------- | ------------------ |
     * | c4ShapePadding | Padding between shapes | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 20
     */
    c4ShapePadding: 20,
    /**
     * | Parameter | Description           | Type    | Required | Values             |
     * | --------- | --------------------- | ------- | -------- | ------------------ |
     * | width     | Width of person boxes | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 216
     */
    width: 216,
    /**
     * | Parameter | Description            | Type    | Required | Values             |
     * | --------- | ---------------------- | ------- | -------- | ------------------ |
     * | height    | Height of person boxes | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 60
     */
    height: 60,
    /**
     * | Parameter | Description         | Type    | Required | Values             |
     * | --------- | ------------------- | ------- | -------- | ------------------ |
     * | boxMargin | Margin around boxes | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 10
     */
    boxMargin: 10,
    /**
     * | Parameter   | Description | Type    | Required | Values      |
     * | ----------- | ----------- | ------- | -------- | ----------- |
     * | useMaxWidth | See Notes   | boolean | Required | true, false |
     *
     * **Notes:** When this flag is set to true, the height and width is set to 100% and is then
     * scaling with the available space. If set to false, the absolute space required is used.
     *
     * Default value: true
     */
    useMaxWidth: !0,
    /**
     * | Parameter    | Description | Type    | Required | Values             |
     * | ------------ | ----------- | ------- | -------- | ------------------ |
     * | c4ShapeInRow | See Notes   | Integer | Required | Any Positive Value |
     *
     * **Notes:** How many shapes to place in each row.
     *
     * Default value: 4
     */
    c4ShapeInRow: 4,
    nextLinePaddingX: 0,
    /**
     * | Parameter       | Description | Type    | Required | Values             |
     * | --------------- | ----------- | ------- | -------- | ------------------ |
     * | c4BoundaryInRow | See Notes   | Integer | Required | Any Positive Value |
     *
     * **Notes:** How many boundaries to place in each row.
     *
     * Default value: 2
     */
    c4BoundaryInRow: 2,
    /**
     * This sets the font size of Person shape for the diagram
     *
     * **Notes:** Default value: 14.
     */
    personFontSize: 14,
    /**
     * This sets the font family of Person shape for the diagram
     *
     * **Notes:** Default value: "Open Sans", sans-serif.
     */
    personFontFamily: '"Open Sans", sans-serif',
    /**
     * This sets the font weight of Person shape for the diagram
     *
     * **Notes:** Default value: normal.
     */
    personFontWeight: "normal",
    /**
     * This sets the font size of External Person shape for the diagram
     *
     * **Notes:** Default value: 14.
     */
    external_personFontSize: 14,
    /**
     * This sets the font family of External Person shape for the diagram
     *
     * **Notes:** Default value: "Open Sans", sans-serif.
     */
    external_personFontFamily: '"Open Sans", sans-serif',
    /**
     * This sets the font weight of External Person shape for the diagram
     *
     * **Notes:** Default value: normal.
     */
    external_personFontWeight: "normal",
    /**
     * This sets the font size of System shape for the diagram
     *
     * **Notes:** Default value: 14.
     */
    systemFontSize: 14,
    /**
     * This sets the font family of System shape for the diagram
     *
     * **Notes:** Default value: "Open Sans", sans-serif.
     */
    systemFontFamily: '"Open Sans", sans-serif',
    /**
     * This sets the font weight of System shape for the diagram
     *
     * **Notes:** Default value: normal.
     */
    systemFontWeight: "normal",
    /**
     * This sets the font size of External System shape for the diagram
     *
     * **Notes:** Default value: 14.
     */
    external_systemFontSize: 14,
    /**
     * This sets the font family of External System shape for the diagram
     *
     * **Notes:** Default value: "Open Sans", sans-serif.
     */
    external_systemFontFamily: '"Open Sans", sans-serif',
    /**
     * This sets the font weight of External System shape for the diagram
     *
     * **Notes:** Default value: normal.
     */
    external_systemFontWeight: "normal",
    /**
     * This sets the font size of System DB shape for the diagram
     *
     * **Notes:** Default value: 14.
     */
    system_dbFontSize: 14,
    /**
     * This sets the font family of System DB shape for the diagram
     *
     * **Notes:** Default value: "Open Sans", sans-serif.
     */
    system_dbFontFamily: '"Open Sans", sans-serif',
    /**
     * This sets the font weight of System DB shape for the diagram
     *
     * **Notes:** Default value: normal.
     */
    system_dbFontWeight: "normal",
    /**
     * This sets the font size of External System DB shape for the diagram
     *
     * **Notes:** Default value: 14.
     */
    external_system_dbFontSize: 14,
    /**
     * This sets the font family of External System DB shape for the diagram
     *
     * **Notes:** Default value: "Open Sans", sans-serif.
     */
    external_system_dbFontFamily: '"Open Sans", sans-serif',
    /**
     * This sets the font weight of External System DB shape for the diagram
     *
     * **Notes:** Default value: normal.
     */
    external_system_dbFontWeight: "normal",
    /**
     * This sets the font size of System Queue shape for the diagram
     *
     * **Notes:** Default value: 14.
     */
    system_queueFontSize: 14,
    /**
     * This sets the font family of System Queue shape for the diagram
     *
     * **Notes:** Default value: "Open Sans", sans-serif.
     */
    system_queueFontFamily: '"Open Sans", sans-serif',
    /**
     * This sets the font weight of System Queue shape for the diagram
     *
     * **Notes:** Default value: normal.
     */
    system_queueFontWeight: "normal",
    /**
     * This sets the font size of External System Queue shape for the diagram
     *
     * **Notes:** Default value: 14.
     */
    external_system_queueFontSize: 14,
    /**
     * This sets the font family of External System Queue shape for the diagram
     *
     * **Notes:** Default value: "Open Sans", sans-serif.
     */
    external_system_queueFontFamily: '"Open Sans", sans-serif',
    /**
     * This sets the font weight of External System Queue shape for the diagram
     *
     * **Notes:** Default value: normal.
     */
    external_system_queueFontWeight: "normal",
    /**
     * This sets the font size of Boundary shape for the diagram
     *
     * **Notes:** Default value: 14.
     */
    boundaryFontSize: 14,
    /**
     * This sets the font family of Boundary shape for the diagram
     *
     * **Notes:** Default value: "Open Sans", sans-serif.
     */
    boundaryFontFamily: '"Open Sans", sans-serif',
    /**
     * This sets the font weight of Boundary shape for the diagram
     *
     * **Notes:** Default value: normal.
     */
    boundaryFontWeight: "normal",
    /**
     * This sets the font size of Message shape for the diagram
     *
     * **Notes:** Default value: 12.
     */
    messageFontSize: 12,
    /**
     * This sets the font family of Message shape for the diagram
     *
     * **Notes:** Default value: "Open Sans", sans-serif.
     */
    messageFontFamily: '"Open Sans", sans-serif',
    /**
     * This sets the font weight of Message shape for the diagram
     *
     * **Notes:** Default value: normal.
     */
    messageFontWeight: "normal",
    /**
     * This sets the font size of Container shape for the diagram
     *
     * **Notes:** Default value: 14.
     */
    containerFontSize: 14,
    /**
     * This sets the font family of Container shape for the diagram
     *
     * **Notes:** Default value: "Open Sans", sans-serif.
     */
    containerFontFamily: '"Open Sans", sans-serif',
    /**
     * This sets the font weight of Container shape for the diagram
     *
     * **Notes:** Default value: normal.
     */
    containerFontWeight: "normal",
    /**
     * This sets the font size of External Container shape for the diagram
     *
     * **Notes:** Default value: 14.
     */
    external_containerFontSize: 14,
    /**
     * This sets the font family of External Container shape for the diagram
     *
     * **Notes:** Default value: "Open Sans", sans-serif.
     */
    external_containerFontFamily: '"Open Sans", sans-serif',
    /**
     * This sets the font weight of External Container shape for the diagram
     *
     * **Notes:** Default value: normal.
     */
    external_containerFontWeight: "normal",
    /**
     * This sets the font size of Container DB shape for the diagram
     *
     * **Notes:** Default value: 14.
     */
    container_dbFontSize: 14,
    /**
     * This sets the font family of Container DB shape for the diagram
     *
     * **Notes:** Default value: "Open Sans", sans-serif.
     */
    container_dbFontFamily: '"Open Sans", sans-serif',
    /**
     * This sets the font weight of Container DB shape for the diagram
     *
     * **Notes:** Default value: normal.
     */
    container_dbFontWeight: "normal",
    /**
     * This sets the font size of External Container DB shape for the diagram
     *
     * **Notes:** Default value: 14.
     */
    external_container_dbFontSize: 14,
    /**
     * This sets the font family of External Container DB shape for the diagram
     *
     * **Notes:** Default value: "Open Sans", sans-serif.
     */
    external_container_dbFontFamily: '"Open Sans", sans-serif',
    /**
     * This sets the font weight of External Container DB shape for the diagram
     *
     * **Notes:** Default value: normal.
     */
    external_container_dbFontWeight: "normal",
    /**
     * This sets the font size of Container Queue shape for the diagram
     *
     * **Notes:** Default value: 14.
     */
    container_queueFontSize: 14,
    /**
     * This sets the font family of Container Queue shape for the diagram
     *
     * **Notes:** Default value: "Open Sans", sans-serif.
     */
    container_queueFontFamily: '"Open Sans", sans-serif',
    /**
     * This sets the font weight of Container Queue shape for the diagram
     *
     * **Notes:** Default value: normal.
     */
    container_queueFontWeight: "normal",
    /**
     * This sets the font size of External Container Queue shape for the diagram
     *
     * **Notes:** Default value: 14.
     */
    external_container_queueFontSize: 14,
    /**
     * This sets the font family of External Container Queue shape for the diagram
     *
     * **Notes:** Default value: "Open Sans", sans-serif.
     */
    external_container_queueFontFamily: '"Open Sans", sans-serif',
    /**
     * This sets the font weight of External Container Queue shape for the diagram
     *
     * **Notes:** Default value: normal.
     */
    external_container_queueFontWeight: "normal",
    /**
     * This sets the font size of Component shape for the diagram
     *
     * **Notes:** Default value: 14.
     */
    componentFontSize: 14,
    /**
     * This sets the font family of Component shape for the diagram
     *
     * **Notes:** Default value: "Open Sans", sans-serif.
     */
    componentFontFamily: '"Open Sans", sans-serif',
    /**
     * This sets the font weight of Component shape for the diagram
     *
     * **Notes:** Default value: normal.
     */
    componentFontWeight: "normal",
    /**
     * This sets the font size of External Component shape for the diagram
     *
     * **Notes:** Default value: 14.
     */
    external_componentFontSize: 14,
    /**
     * This sets the font family of External Component shape for the diagram
     *
     * **Notes:** Default value: "Open Sans", sans-serif.
     */
    external_componentFontFamily: '"Open Sans", sans-serif',
    /**
     * This sets the font weight of External Component shape for the diagram
     *
     * **Notes:** Default value: normal.
     */
    external_componentFontWeight: "normal",
    /**
     * This sets the font size of Component DB shape for the diagram
     *
     * **Notes:** Default value: 14.
     */
    component_dbFontSize: 14,
    /**
     * This sets the font family of Component DB shape for the diagram
     *
     * **Notes:** Default value: "Open Sans", sans-serif.
     */
    component_dbFontFamily: '"Open Sans", sans-serif',
    /**
     * This sets the font weight of Component DB shape for the diagram
     *
     * **Notes:** Default value: normal.
     */
    component_dbFontWeight: "normal",
    /**
     * This sets the font size of External Component DB shape for the diagram
     *
     * **Notes:** Default value: 14.
     */
    external_component_dbFontSize: 14,
    /**
     * This sets the font family of External Component DB shape for the diagram
     *
     * **Notes:** Default value: "Open Sans", sans-serif.
     */
    external_component_dbFontFamily: '"Open Sans", sans-serif',
    /**
     * This sets the font weight of External Component DB shape for the diagram
     *
     * **Notes:** Default value: normal.
     */
    external_component_dbFontWeight: "normal",
    /**
     * This sets the font size of Component Queue shape for the diagram
     *
     * **Notes:** Default value: 14.
     */
    component_queueFontSize: 14,
    /**
     * This sets the font family of Component Queue shape for the diagram
     *
     * **Notes:** Default value: "Open Sans", sans-serif.
     */
    component_queueFontFamily: '"Open Sans", sans-serif',
    /**
     * This sets the font weight of Component Queue shape for the diagram
     *
     * **Notes:** Default value: normal.
     */
    component_queueFontWeight: "normal",
    /**
     * This sets the font size of External Component Queue shape for the diagram
     *
     * **Notes:** Default value: 14.
     */
    external_component_queueFontSize: 14,
    /**
     * This sets the font family of External Component Queue shape for the diagram
     *
     * **Notes:** Default value: "Open Sans", sans-serif.
     */
    external_component_queueFontFamily: '"Open Sans", sans-serif',
    /**
     * This sets the font weight of External Component Queue shape for the diagram
     *
     * **Notes:** Default value: normal.
     */
    external_component_queueFontWeight: "normal",
    /**
     * This sets the auto-wrap state for the diagram
     *
     * **Notes:** Default value: true.
     */
    wrap: !0,
    /**
     * This sets the auto-wrap padding for the diagram (sides only)
     *
     * **Notes:** Default value: 0.
     */
    wrapPadding: 10,
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
    },
    // ' Colors
    // ' ##################################
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
  mindmap: {
    useMaxWidth: !0,
    padding: 10,
    maxNodeWidth: 200
  },
  fontSize: 16
};
Mt.class && (Mt.class.arrowMarkerAbsolute = Mt.arrowMarkerAbsolute);
Mt.gitGraph && (Mt.gitGraph.arrowMarkerAbsolute = Mt.arrowMarkerAbsolute);
const fo = (t, e = "") => Object.keys(t).reduce((i, r) => Array.isArray(t[r]) ? i : typeof t[r] == "object" && t[r] !== null ? [...i, e + r, ...fo(t[r], "")] : [...i, e + r], []), Bh = fo(Mt, ""), fh = Mt, Oi = function(t, e, i) {
  const { depth: r, clobber: o } = Object.assign({ depth: 2, clobber: !1 }, i);
  return Array.isArray(e) && !Array.isArray(t) ? (e.forEach((n) => Oi(t, n, i)), t) : Array.isArray(e) && Array.isArray(t) ? (e.forEach((n) => {
    t.includes(n) || t.push(n);
  }), t) : t === void 0 || r <= 0 ? t != null && typeof t == "object" && typeof e == "object" ? Object.assign(t, e) : e : (e !== void 0 && typeof t == "object" && typeof e == "object" && Object.keys(e).forEach((n) => {
    typeof e[n] == "object" && (t[n] === void 0 || typeof t[n] == "object") ? (t[n] === void 0 && (t[n] = Array.isArray(e[n]) ? [] : {}), t[n] = Oi(t[n], e[n], { depth: r - 1, clobber: o })) : (o || typeof t[n] != "object" && typeof e[n] != "object") && (t[n] = e[n]);
  }), t);
}, rt = Oi, Pi = Object.freeze(fh);
let it = rt({}, Pi), go, ee = [], fe = rt({}, Pi);
const ei = (t, e) => {
  let i = rt({}, t), r = {};
  for (const o of e)
    mo(o), r = rt(r, o);
  if (i = rt(i, r), r.theme && r.theme in Jt) {
    const o = rt({}, go), n = rt(
      o.themeVariables || {},
      r.themeVariables
    );
    i.theme && i.theme in Jt && (i.themeVariables = Jt[i.theme].getThemeVariables(n));
  }
  return fe = i, yo(fe), fe;
}, vh = (t) => (it = rt({}, Pi), it = rt(it, t), t.theme && Jt[t.theme] && (it.themeVariables = Jt[t.theme].getThemeVariables(t.themeVariables)), ei(it, ee), it), wh = (t) => {
  go = rt({}, t);
}, Lh = (t) => (it = rt(it, t), ei(it, ee), it), Fh = () => rt({}, it), Ah = (t) => (yo(t), rt(fe, t), po()), po = () => rt({}, fe), mo = (t) => {
  ["secure", ...it.secure ?? []].forEach((e) => {
    t[e] !== void 0 && (et.debug(`Denied attempt to modify a secure key ${e}`, t[e]), delete t[e]);
  }), Object.keys(t).forEach((e) => {
    e.indexOf("__") === 0 && delete t[e];
  }), Object.keys(t).forEach((e) => {
    typeof t[e] == "string" && (t[e].includes("<") || t[e].includes(">") || t[e].includes("url(data:")) && delete t[e], typeof t[e] == "object" && mo(t[e]);
  });
}, Eh = (t) => {
  t.fontFamily && (t.themeVariables ? t.themeVariables.fontFamily || (t.themeVariables = { fontFamily: t.fontFamily }) : t.themeVariables = { fontFamily: t.fontFamily }), ee.push(t), ei(it, ee);
}, Mh = (t = it) => {
  ee = [], ei(t, ee);
};
var Co = /* @__PURE__ */ ((t) => (t.LAZY_LOAD_DEPRECATED = "The configuration options lazyLoadedDiagrams and loadExternalDiagramsAtStartup are deprecated. Please use registerExternalDiagrams instead.", t))(Co || {});
const Er = {}, dh = (t) => {
  Er[t] || (et.warn(Co[t]), Er[t] = !0);
}, yo = (t) => {
  t && (t.lazyLoadedDiagrams || t.loadExternalDiagramsAtStartup) && dh("LAZY_LOAD_DEPRECATED");
};
let Hi = "", ii = "", qi = "";
const Ui = (t) => Ye(t, po()), bo = function() {
  Hi = "", qi = "", ii = "";
}, _o = function(t) {
  Hi = Ui(t).replace(/^\s+/g, "");
}, xo = function() {
  return Hi || ii;
}, To = function(t) {
  qi = Ui(t).replace(/\n\s+/g, `
`);
}, ko = function() {
  return qi;
}, So = function(t) {
  ii = Ui(t);
}, Bo = function() {
  return ii;
}, gh = {
  getAccTitle: xo,
  setAccTitle: _o,
  getDiagramTitle: Bo,
  setDiagramTitle: So,
  getAccDescription: ko,
  setAccDescription: To,
  clear: bo
}, Oh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  clear: bo,
  default: gh,
  getAccDescription: ko,
  getAccTitle: xo,
  getDiagramTitle: Bo,
  setAccDescription: To,
  setAccTitle: _o,
  setDiagramTitle: So
}, Symbol.toStringTag, { value: "Module" }));
export {
  bo as A,
  Ur as B,
  Go as C,
  Il as D,
  Ri as E,
  Gr as F,
  ye as G,
  Fs as H,
  Ni as I,
  At as J,
  pe as K,
  Cr as L,
  Rs as M,
  Xr as N,
  bh as O,
  Do as P,
  No as Q,
  ot as R,
  st as S,
  mh as T,
  S as U,
  v as V,
  Lt as W,
  L as _,
  Eh as a,
  Ye as b,
  Oh as c,
  rt as d,
  Bh as e,
  _h as f,
  po as g,
  yh as h,
  Ah as i,
  Fh as j,
  Pi as k,
  et as l,
  Ol as m,
  wh as n,
  vh as o,
  Mi as p,
  _o as q,
  Mh as r,
  Ch as s,
  Jt as t,
  Lh as u,
  xo as v,
  ko as w,
  To as x,
  So as y,
  Bo as z
};
//# sourceMappingURL=commonDb-41f8b4c5.js.map
