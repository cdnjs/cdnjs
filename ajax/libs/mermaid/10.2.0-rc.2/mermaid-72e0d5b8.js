function ac(t) {
  for (var e = [], i = 1; i < arguments.length; i++)
    e[i - 1] = arguments[i];
  var r = Array.from(typeof t == "string" ? [t] : t);
  r[r.length - 1] = r[r.length - 1].replace(/\r?\n([\t ]*)$/, "");
  var n = r.reduce(function(a, l) {
    var c = l.match(/\n([\t ]+|(?!\s).)/g);
    return c ? a.concat(c.map(function(h) {
      var u, g;
      return (g = (u = h.match(/[\t ]/g)) === null || u === void 0 ? void 0 : u.length) !== null && g !== void 0 ? g : 0;
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
    var c = s.match(/(?:^|\n)( *)$/), h = c ? c[1] : "", u = a;
    typeof a == "string" && a.includes(`
`) && (u = String(a).split(`
`).map(function(g, d) {
      return d === 0 ? g : "" + h + g;
    }).join(`
`)), s += u + r[l + 1];
  }), s;
}
var As = 60, Es = As * 60, Fs = Es * 24, lc = Fs * 7, be = 1e3, Rr = As * be, To = Es * be, cc = Fs * be, hc = lc * be, Sn = "millisecond", de = "second", pe = "minute", ge = "hour", $t = "day", ki = "week", pt = "month", Ms = "quarter", It = "year", me = "date", uc = "YYYY-MM-DDTHH:mm:ssZ", vo = "Invalid Date", fc = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, dc = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g;
const pc = {
  name: "en",
  weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
  months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
  ordinal: function(e) {
    var i = ["th", "st", "nd", "rd"], r = e % 100;
    return "[" + e + (i[(r - 20) % 10] || i[r] || i[0]) + "]";
  }
};
var rn = function(e, i, r) {
  var n = String(e);
  return !n || n.length >= i ? e : "" + Array(i + 1 - n.length).join(r) + e;
}, gc = function(e) {
  var i = -e.utcOffset(), r = Math.abs(i), n = Math.floor(r / 60), o = r % 60;
  return (i <= 0 ? "+" : "-") + rn(n, 2, "0") + ":" + rn(o, 2, "0");
}, mc = function t(e, i) {
  if (e.date() < i.date())
    return -t(i, e);
  var r = (i.year() - e.year()) * 12 + (i.month() - e.month()), n = e.clone().add(r, pt), o = i - n < 0, s = e.clone().add(r + (o ? -1 : 1), pt);
  return +(-(r + (i - n) / (o ? n - s : s - n)) || 0);
}, _c = function(e) {
  return e < 0 ? Math.ceil(e) || 0 : Math.floor(e);
}, yc = function(e) {
  var i = {
    M: pt,
    y: It,
    w: ki,
    d: $t,
    D: me,
    h: ge,
    m: pe,
    s: de,
    ms: Sn,
    Q: Ms
  };
  return i[e] || String(e || "").toLowerCase().replace(/s$/, "");
}, Cc = function(e) {
  return e === void 0;
};
const bc = {
  s: rn,
  z: gc,
  m: mc,
  a: _c,
  p: yc,
  u: Cc
};
var Pe = "en", Kt = {};
Kt[Pe] = pc;
var kn = function(e) {
  return e instanceof ar;
}, zi = function t(e, i, r) {
  var n;
  if (!e)
    return Pe;
  if (typeof e == "string") {
    var o = e.toLowerCase();
    Kt[o] && (n = o), i && (Kt[o] = i, n = o);
    var s = e.split("-");
    if (!n && s.length > 1)
      return t(s[0]);
  } else {
    var a = e.name;
    Kt[a] = e, n = a;
  }
  return !r && n && (Pe = n), n || !r && Pe;
}, G = function(e, i) {
  if (kn(e))
    return e.clone();
  var r = typeof i == "object" ? i : {};
  return r.date = e, r.args = arguments, new ar(r);
}, xc = function(e, i) {
  return G(e, {
    locale: i.$L,
    utc: i.$u,
    x: i.$x,
    $offset: i.$offset
    // todo: refactor; do not use this.$offset in you code
  });
}, $ = bc;
$.l = zi;
$.i = kn;
$.w = xc;
var Tc = function(e) {
  var i = e.date, r = e.utc;
  if (i === null)
    return /* @__PURE__ */ new Date(NaN);
  if ($.u(i))
    return /* @__PURE__ */ new Date();
  if (i instanceof Date)
    return new Date(i);
  if (typeof i == "string" && !/Z$/i.test(i)) {
    var n = i.match(fc);
    if (n) {
      var o = n[2] - 1 || 0, s = (n[7] || "0").substring(0, 3);
      return r ? new Date(Date.UTC(n[1], o, n[3] || 1, n[4] || 0, n[5] || 0, n[6] || 0, s)) : new Date(n[1], o, n[3] || 1, n[4] || 0, n[5] || 0, n[6] || 0, s);
    }
  }
  return new Date(i);
}, ar = /* @__PURE__ */ function() {
  function t(i) {
    this.$L = zi(i.locale, null, !0), this.parse(i);
  }
  var e = t.prototype;
  return e.parse = function(r) {
    this.$d = Tc(r), this.$x = r.x || {}, this.init();
  }, e.init = function() {
    var r = this.$d;
    this.$y = r.getFullYear(), this.$M = r.getMonth(), this.$D = r.getDate(), this.$W = r.getDay(), this.$H = r.getHours(), this.$m = r.getMinutes(), this.$s = r.getSeconds(), this.$ms = r.getMilliseconds();
  }, e.$utils = function() {
    return $;
  }, e.isValid = function() {
    return this.$d.toString() !== vo;
  }, e.isSame = function(r, n) {
    var o = G(r);
    return this.startOf(n) <= o && o <= this.endOf(n);
  }, e.isAfter = function(r, n) {
    return G(r) < this.startOf(n);
  }, e.isBefore = function(r, n) {
    return this.endOf(n) < G(r);
  }, e.$g = function(r, n, o) {
    return $.u(r) ? this[n] : this.set(o, r);
  }, e.unix = function() {
    return Math.floor(this.valueOf() / 1e3);
  }, e.valueOf = function() {
    return this.$d.getTime();
  }, e.startOf = function(r, n) {
    var o = this, s = $.u(n) ? !0 : n, a = $.p(r), l = function(L, y) {
      var F = $.w(o.$u ? Date.UTC(o.$y, y, L) : new Date(o.$y, y, L), o);
      return s ? F : F.endOf($t);
    }, c = function(L, y) {
      var F = [0, 0, 0, 0], N = [23, 59, 59, 999];
      return $.w(o.toDate()[L].apply(
        // eslint-disable-line prefer-spread
        o.toDate("s"),
        (s ? F : N).slice(y)
      ), o);
    }, h = this.$W, u = this.$M, g = this.$D, d = "set" + (this.$u ? "UTC" : "");
    switch (a) {
      case It:
        return s ? l(1, 0) : l(31, 11);
      case pt:
        return s ? l(1, u) : l(0, u + 1);
      case ki: {
        var _ = this.$locale().weekStart || 0, T = (h < _ ? h + 7 : h) - _;
        return l(s ? g - T : g + (6 - T), u);
      }
      case $t:
      case me:
        return c(d + "Hours", 0);
      case ge:
        return c(d + "Minutes", 1);
      case pe:
        return c(d + "Seconds", 2);
      case de:
        return c(d + "Milliseconds", 3);
      default:
        return this.clone();
    }
  }, e.endOf = function(r) {
    return this.startOf(r, !1);
  }, e.$set = function(r, n) {
    var o, s = $.p(r), a = "set" + (this.$u ? "UTC" : ""), l = (o = {}, o[$t] = a + "Date", o[me] = a + "Date", o[pt] = a + "Month", o[It] = a + "FullYear", o[ge] = a + "Hours", o[pe] = a + "Minutes", o[de] = a + "Seconds", o[Sn] = a + "Milliseconds", o)[s], c = s === $t ? this.$D + (n - this.$W) : n;
    if (s === pt || s === It) {
      var h = this.clone().set(me, 1);
      h.$d[l](c), h.init(), this.$d = h.set(me, Math.min(this.$D, h.daysInMonth())).$d;
    } else
      l && this.$d[l](c);
    return this.init(), this;
  }, e.set = function(r, n) {
    return this.clone().$set(r, n);
  }, e.get = function(r) {
    return this[$.p(r)]();
  }, e.add = function(r, n) {
    var o = this, s;
    r = Number(r);
    var a = $.p(n), l = function(g) {
      var d = G(o);
      return $.w(d.date(d.date() + Math.round(g * r)), o);
    };
    if (a === pt)
      return this.set(pt, this.$M + r);
    if (a === It)
      return this.set(It, this.$y + r);
    if (a === $t)
      return l(1);
    if (a === ki)
      return l(7);
    var c = (s = {}, s[pe] = Rr, s[ge] = To, s[de] = be, s)[a] || 1, h = this.$d.getTime() + r * c;
    return $.w(h, this);
  }, e.subtract = function(r, n) {
    return this.add(r * -1, n);
  }, e.format = function(r) {
    var n = this, o = this.$locale();
    if (!this.isValid())
      return o.invalidDate || vo;
    var s = r || uc, a = $.z(this), l = this.$H, c = this.$m, h = this.$M, u = o.weekdays, g = o.months, d = o.meridiem, _ = function(F, N, H, Y) {
      return F && (F[N] || F(n, s)) || H[N].slice(0, Y);
    }, T = function(F) {
      return $.s(l % 12 || 12, F, "0");
    }, w = d || function(y, F, N) {
      var H = y < 12 ? "AM" : "PM";
      return N ? H.toLowerCase() : H;
    }, L = {
      YY: String(this.$y).slice(-2),
      YYYY: this.$y,
      M: h + 1,
      MM: $.s(h + 1, 2, "0"),
      MMM: _(o.monthsShort, h, g, 3),
      MMMM: _(g, h),
      D: this.$D,
      DD: $.s(this.$D, 2, "0"),
      d: String(this.$W),
      dd: _(o.weekdaysMin, this.$W, u, 2),
      ddd: _(o.weekdaysShort, this.$W, u, 3),
      dddd: u[this.$W],
      H: String(l),
      HH: $.s(l, 2, "0"),
      h: T(1),
      hh: T(2),
      a: w(l, c, !0),
      A: w(l, c, !1),
      m: String(c),
      mm: $.s(c, 2, "0"),
      s: String(this.$s),
      ss: $.s(this.$s, 2, "0"),
      SSS: $.s(this.$ms, 3, "0"),
      Z: a
      // 'ZZ' logic below
    };
    return s.replace(dc, function(y, F) {
      return F || L[y] || a.replace(":", "");
    });
  }, e.utcOffset = function() {
    return -Math.round(this.$d.getTimezoneOffset() / 15) * 15;
  }, e.diff = function(r, n, o) {
    var s, a = $.p(n), l = G(r), c = (l.utcOffset() - this.utcOffset()) * Rr, h = this - l, u = $.m(this, l);
    return u = (s = {}, s[It] = u / 12, s[pt] = u, s[Ms] = u / 3, s[ki] = (h - c) / hc, s[$t] = (h - c) / cc, s[ge] = h / To, s[pe] = h / Rr, s[de] = h / be, s)[a] || h, o ? u : $.a(u);
  }, e.daysInMonth = function() {
    return this.endOf(pt).$D;
  }, e.$locale = function() {
    return Kt[this.$L];
  }, e.locale = function(r, n) {
    if (!r)
      return this.$L;
    var o = this.clone(), s = zi(r, n, !0);
    return s && (o.$L = s), o;
  }, e.clone = function() {
    return $.w(this.$d, this);
  }, e.toDate = function() {
    return new Date(this.valueOf());
  }, e.toJSON = function() {
    return this.isValid() ? this.toISOString() : null;
  }, e.toISOString = function() {
    return this.$d.toISOString();
  }, e.toString = function() {
    return this.$d.toUTCString();
  }, t;
}(), Os = ar.prototype;
G.prototype = Os;
[["$ms", Sn], ["$s", de], ["$m", pe], ["$H", ge], ["$W", $t], ["$M", pt], ["$y", It], ["$D", me]].forEach(function(t) {
  Os[t[1]] = function(e) {
    return this.$g(e, t[0], t[1]);
  };
});
G.extend = function(t, e) {
  return t.$i || (t(e, ar, G), t.$i = !0), G;
};
G.locale = zi;
G.isDayjs = kn;
G.unix = function(t) {
  return G(t * 1e3);
};
G.en = Kt[Pe];
G.Ls = Kt;
G.p = {};
const wt = {
  trace: 0,
  debug: 1,
  info: 2,
  warn: 3,
  error: 4,
  fatal: 5
}, x = {
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
}, wn = function(t = "fatal") {
  let e = wt.fatal;
  typeof t == "string" ? (t = t.toLowerCase(), t in wt && (e = wt[t])) : typeof t == "number" && (e = t), x.trace = () => {
  }, x.debug = () => {
  }, x.info = () => {
  }, x.warn = () => {
  }, x.error = () => {
  }, x.fatal = () => {
  }, e <= wt.fatal && (x.fatal = console.error ? console.error.bind(console, lt("FATAL"), "color: orange") : console.log.bind(console, "\x1B[35m", lt("FATAL"))), e <= wt.error && (x.error = console.error ? console.error.bind(console, lt("ERROR"), "color: orange") : console.log.bind(console, "\x1B[31m", lt("ERROR"))), e <= wt.warn && (x.warn = console.warn ? console.warn.bind(console, lt("WARN"), "color: orange") : console.log.bind(console, "\x1B[33m", lt("WARN"))), e <= wt.info && (x.info = console.info ? console.info.bind(console, lt("INFO"), "color: lightblue") : console.log.bind(console, "\x1B[34m", lt("INFO"))), e <= wt.debug && (x.debug = console.debug ? console.debug.bind(console, lt("DEBUG"), "color: lightgreen") : console.log.bind(console, "\x1B[32m", lt("DEBUG"))), e <= wt.trace && (x.trace = console.debug ? console.debug.bind(console, lt("TRACE"), "color: lightgreen") : console.log.bind(console, "\x1B[32m", lt("TRACE")));
}, lt = (t) => `%c${G().format("ss.SSS")} : ${t} : `;
var Bn = {};
Object.defineProperty(Bn, "__esModule", { value: !0 });
var $s = Bn.sanitizeUrl = void 0, vc = /^([^\w]*)(javascript|data|vbscript)/im, Sc = /&#(\w+)(^\w|;)?/g, kc = /&(newline|tab);/gi, wc = /[\u0000-\u001F\u007F-\u009F\u2000-\u200D\uFEFF]/gim, Bc = /^.+(:|&colon;)/gim, Lc = [".", "/"];
function Ac(t) {
  return Lc.indexOf(t[0]) > -1;
}
function Ec(t) {
  return t.replace(Sc, function(e, i) {
    return String.fromCharCode(i);
  });
}
function Fc(t) {
  var e = Ec(t || "").replace(kc, "").replace(wc, "").trim();
  if (!e)
    return "about:blank";
  if (Ac(e))
    return e;
  var i = e.match(Bc);
  if (!i)
    return e;
  var r = i[0];
  return vc.test(r) ? "about:blank" : e;
}
$s = Bn.sanitizeUrl = Fc;
var Mc = { value: () => {
} };
function Is() {
  for (var t = 0, e = arguments.length, i = {}, r; t < e; ++t) {
    if (!(r = arguments[t] + "") || r in i || /[\s.]/.test(r))
      throw new Error("illegal type: " + r);
    i[r] = [];
  }
  return new wi(i);
}
function wi(t) {
  this._ = t;
}
function Oc(t, e) {
  return t.trim().split(/^|\s+/).map(function(i) {
    var r = "", n = i.indexOf(".");
    if (n >= 0 && (r = i.slice(n + 1), i = i.slice(0, n)), i && !e.hasOwnProperty(i))
      throw new Error("unknown type: " + i);
    return { type: i, name: r };
  });
}
wi.prototype = Is.prototype = {
  constructor: wi,
  on: function(t, e) {
    var i = this._, r = Oc(t + "", i), n, o = -1, s = r.length;
    if (arguments.length < 2) {
      for (; ++o < s; )
        if ((n = (t = r[o]).type) && (n = $c(i[n], t.name)))
          return n;
      return;
    }
    if (e != null && typeof e != "function")
      throw new Error("invalid callback: " + e);
    for (; ++o < s; )
      if (n = (t = r[o]).type)
        i[n] = So(i[n], t.name, e);
      else if (e == null)
        for (n in i)
          i[n] = So(i[n], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, e = this._;
    for (var i in e)
      t[i] = e[i].slice();
    return new wi(t);
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
function $c(t, e) {
  for (var i = 0, r = t.length, n; i < r; ++i)
    if ((n = t[i]).name === e)
      return n.value;
}
function So(t, e, i) {
  for (var r = 0, n = t.length; r < n; ++r)
    if (t[r].name === e) {
      t[r] = Mc, t = t.slice(0, r).concat(t.slice(r + 1));
      break;
    }
  return i != null && t.push({ name: e, value: i }), t;
}
var nn = "http://www.w3.org/1999/xhtml";
const ko = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: nn,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function lr(t) {
  var e = t += "", i = e.indexOf(":");
  return i >= 0 && (e = t.slice(0, i)) !== "xmlns" && (t = t.slice(i + 1)), ko.hasOwnProperty(e) ? { space: ko[e], local: t } : t;
}
function Ic(t) {
  return function() {
    var e = this.ownerDocument, i = this.namespaceURI;
    return i === nn && e.documentElement.namespaceURI === nn ? e.createElement(t) : e.createElementNS(i, t);
  };
}
function Dc(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function Ds(t) {
  var e = lr(t);
  return (e.local ? Dc : Ic)(e);
}
function Nc() {
}
function Ln(t) {
  return t == null ? Nc : function() {
    return this.querySelector(t);
  };
}
function Rc(t) {
  typeof t != "function" && (t = Ln(t));
  for (var e = this._groups, i = e.length, r = new Array(i), n = 0; n < i; ++n)
    for (var o = e[n], s = o.length, a = r[n] = new Array(s), l, c, h = 0; h < s; ++h)
      (l = o[h]) && (c = t.call(l, l.__data__, h, o)) && ("__data__" in l && (c.__data__ = l.__data__), a[h] = c);
  return new ot(r, this._parents);
}
function zc(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function Pc() {
  return [];
}
function Ns(t) {
  return t == null ? Pc : function() {
    return this.querySelectorAll(t);
  };
}
function Wc(t) {
  return function() {
    return zc(t.apply(this, arguments));
  };
}
function Hc(t) {
  typeof t == "function" ? t = Wc(t) : t = Ns(t);
  for (var e = this._groups, i = e.length, r = [], n = [], o = 0; o < i; ++o)
    for (var s = e[o], a = s.length, l, c = 0; c < a; ++c)
      (l = s[c]) && (r.push(t.call(l, l.__data__, c, s)), n.push(l));
  return new ot(r, n);
}
function Rs(t) {
  return function() {
    return this.matches(t);
  };
}
function zs(t) {
  return function(e) {
    return e.matches(t);
  };
}
var qc = Array.prototype.find;
function jc(t) {
  return function() {
    return qc.call(this.children, t);
  };
}
function Uc() {
  return this.firstElementChild;
}
function Gc(t) {
  return this.select(t == null ? Uc : jc(typeof t == "function" ? t : zs(t)));
}
var Yc = Array.prototype.filter;
function Vc() {
  return Array.from(this.children);
}
function Xc(t) {
  return function() {
    return Yc.call(this.children, t);
  };
}
function Kc(t) {
  return this.selectAll(t == null ? Vc : Xc(typeof t == "function" ? t : zs(t)));
}
function Zc(t) {
  typeof t != "function" && (t = Rs(t));
  for (var e = this._groups, i = e.length, r = new Array(i), n = 0; n < i; ++n)
    for (var o = e[n], s = o.length, a = r[n] = [], l, c = 0; c < s; ++c)
      (l = o[c]) && t.call(l, l.__data__, c, o) && a.push(l);
  return new ot(r, this._parents);
}
function Ps(t) {
  return new Array(t.length);
}
function Jc() {
  return new ot(this._enter || this._groups.map(Ps), this._parents);
}
function Pi(t, e) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = e;
}
Pi.prototype = {
  constructor: Pi,
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
function Qc(t) {
  return function() {
    return t;
  };
}
function th(t, e, i, r, n, o) {
  for (var s = 0, a, l = e.length, c = o.length; s < c; ++s)
    (a = e[s]) ? (a.__data__ = o[s], r[s] = a) : i[s] = new Pi(t, o[s]);
  for (; s < l; ++s)
    (a = e[s]) && (n[s] = a);
}
function eh(t, e, i, r, n, o, s) {
  var a, l, c = /* @__PURE__ */ new Map(), h = e.length, u = o.length, g = new Array(h), d;
  for (a = 0; a < h; ++a)
    (l = e[a]) && (g[a] = d = s.call(l, l.__data__, a, e) + "", c.has(d) ? n[a] = l : c.set(d, l));
  for (a = 0; a < u; ++a)
    d = s.call(t, o[a], a, o) + "", (l = c.get(d)) ? (r[a] = l, l.__data__ = o[a], c.delete(d)) : i[a] = new Pi(t, o[a]);
  for (a = 0; a < h; ++a)
    (l = e[a]) && c.get(g[a]) === l && (n[a] = l);
}
function ih(t) {
  return t.__data__;
}
function rh(t, e) {
  if (!arguments.length)
    return Array.from(this, ih);
  var i = e ? eh : th, r = this._parents, n = this._groups;
  typeof t != "function" && (t = Qc(t));
  for (var o = n.length, s = new Array(o), a = new Array(o), l = new Array(o), c = 0; c < o; ++c) {
    var h = r[c], u = n[c], g = u.length, d = nh(t.call(h, h && h.__data__, c, r)), _ = d.length, T = a[c] = new Array(_), w = s[c] = new Array(_), L = l[c] = new Array(g);
    i(h, u, T, w, L, d, e);
    for (var y = 0, F = 0, N, H; y < _; ++y)
      if (N = T[y]) {
        for (y >= F && (F = y + 1); !(H = w[F]) && ++F < _; )
          ;
        N._next = H || null;
      }
  }
  return s = new ot(s, r), s._enter = a, s._exit = l, s;
}
function nh(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function oh() {
  return new ot(this._exit || this._groups.map(Ps), this._parents);
}
function sh(t, e, i) {
  var r = this.enter(), n = this, o = this.exit();
  return typeof t == "function" ? (r = t(r), r && (r = r.selection())) : r = r.append(t + ""), e != null && (n = e(n), n && (n = n.selection())), i == null ? o.remove() : i(o), r && n ? r.merge(n).order() : n;
}
function ah(t) {
  for (var e = t.selection ? t.selection() : t, i = this._groups, r = e._groups, n = i.length, o = r.length, s = Math.min(n, o), a = new Array(n), l = 0; l < s; ++l)
    for (var c = i[l], h = r[l], u = c.length, g = a[l] = new Array(u), d, _ = 0; _ < u; ++_)
      (d = c[_] || h[_]) && (g[_] = d);
  for (; l < n; ++l)
    a[l] = i[l];
  return new ot(a, this._parents);
}
function lh() {
  for (var t = this._groups, e = -1, i = t.length; ++e < i; )
    for (var r = t[e], n = r.length - 1, o = r[n], s; --n >= 0; )
      (s = r[n]) && (o && s.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(s, o), o = s);
  return this;
}
function ch(t) {
  t || (t = hh);
  function e(u, g) {
    return u && g ? t(u.__data__, g.__data__) : !u - !g;
  }
  for (var i = this._groups, r = i.length, n = new Array(r), o = 0; o < r; ++o) {
    for (var s = i[o], a = s.length, l = n[o] = new Array(a), c, h = 0; h < a; ++h)
      (c = s[h]) && (l[h] = c);
    l.sort(e);
  }
  return new ot(n, this._parents).order();
}
function hh(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function uh() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function fh() {
  return Array.from(this);
}
function dh() {
  for (var t = this._groups, e = 0, i = t.length; e < i; ++e)
    for (var r = t[e], n = 0, o = r.length; n < o; ++n) {
      var s = r[n];
      if (s)
        return s;
    }
  return null;
}
function ph() {
  let t = 0;
  for (const e of this)
    ++t;
  return t;
}
function gh() {
  return !this.node();
}
function mh(t) {
  for (var e = this._groups, i = 0, r = e.length; i < r; ++i)
    for (var n = e[i], o = 0, s = n.length, a; o < s; ++o)
      (a = n[o]) && t.call(a, a.__data__, o, n);
  return this;
}
function _h(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function yh(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Ch(t, e) {
  return function() {
    this.setAttribute(t, e);
  };
}
function bh(t, e) {
  return function() {
    this.setAttributeNS(t.space, t.local, e);
  };
}
function xh(t, e) {
  return function() {
    var i = e.apply(this, arguments);
    i == null ? this.removeAttribute(t) : this.setAttribute(t, i);
  };
}
function Th(t, e) {
  return function() {
    var i = e.apply(this, arguments);
    i == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, i);
  };
}
function vh(t, e) {
  var i = lr(t);
  if (arguments.length < 2) {
    var r = this.node();
    return i.local ? r.getAttributeNS(i.space, i.local) : r.getAttribute(i);
  }
  return this.each((e == null ? i.local ? yh : _h : typeof e == "function" ? i.local ? Th : xh : i.local ? bh : Ch)(i, e));
}
function Ws(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function Sh(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function kh(t, e, i) {
  return function() {
    this.style.setProperty(t, e, i);
  };
}
function wh(t, e, i) {
  return function() {
    var r = e.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, i);
  };
}
function Bh(t, e, i) {
  return arguments.length > 1 ? this.each((e == null ? Sh : typeof e == "function" ? wh : kh)(t, e, i ?? "")) : xe(this.node(), t);
}
function xe(t, e) {
  return t.style.getPropertyValue(e) || Ws(t).getComputedStyle(t, null).getPropertyValue(e);
}
function Lh(t) {
  return function() {
    delete this[t];
  };
}
function Ah(t, e) {
  return function() {
    this[t] = e;
  };
}
function Eh(t, e) {
  return function() {
    var i = e.apply(this, arguments);
    i == null ? delete this[t] : this[t] = i;
  };
}
function Fh(t, e) {
  return arguments.length > 1 ? this.each((e == null ? Lh : typeof e == "function" ? Eh : Ah)(t, e)) : this.node()[t];
}
function Hs(t) {
  return t.trim().split(/^|\s+/);
}
function An(t) {
  return t.classList || new qs(t);
}
function qs(t) {
  this._node = t, this._names = Hs(t.getAttribute("class") || "");
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
function js(t, e) {
  for (var i = An(t), r = -1, n = e.length; ++r < n; )
    i.add(e[r]);
}
function Us(t, e) {
  for (var i = An(t), r = -1, n = e.length; ++r < n; )
    i.remove(e[r]);
}
function Mh(t) {
  return function() {
    js(this, t);
  };
}
function Oh(t) {
  return function() {
    Us(this, t);
  };
}
function $h(t, e) {
  return function() {
    (e.apply(this, arguments) ? js : Us)(this, t);
  };
}
function Ih(t, e) {
  var i = Hs(t + "");
  if (arguments.length < 2) {
    for (var r = An(this.node()), n = -1, o = i.length; ++n < o; )
      if (!r.contains(i[n]))
        return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? $h : e ? Mh : Oh)(i, e));
}
function Dh() {
  this.textContent = "";
}
function Nh(t) {
  return function() {
    this.textContent = t;
  };
}
function Rh(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.textContent = e ?? "";
  };
}
function zh(t) {
  return arguments.length ? this.each(t == null ? Dh : (typeof t == "function" ? Rh : Nh)(t)) : this.node().textContent;
}
function Ph() {
  this.innerHTML = "";
}
function Wh(t) {
  return function() {
    this.innerHTML = t;
  };
}
function Hh(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function qh(t) {
  return arguments.length ? this.each(t == null ? Ph : (typeof t == "function" ? Hh : Wh)(t)) : this.node().innerHTML;
}
function jh() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Uh() {
  return this.each(jh);
}
function Gh() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Yh() {
  return this.each(Gh);
}
function Vh(t) {
  var e = typeof t == "function" ? t : Ds(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function Xh() {
  return null;
}
function Kh(t, e) {
  var i = typeof t == "function" ? t : Ds(t), r = e == null ? Xh : typeof e == "function" ? e : Ln(e);
  return this.select(function() {
    return this.insertBefore(i.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function Zh() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function Jh() {
  return this.each(Zh);
}
function Qh() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function tu() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function eu(t) {
  return this.select(t ? tu : Qh);
}
function iu(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function ru(t) {
  return function(e) {
    t.call(this, e, this.__data__);
  };
}
function nu(t) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var i = "", r = e.indexOf(".");
    return r >= 0 && (i = e.slice(r + 1), e = e.slice(0, r)), { type: e, name: i };
  });
}
function ou(t) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var i = 0, r = -1, n = e.length, o; i < n; ++i)
        o = e[i], (!t.type || o.type === t.type) && o.name === t.name ? this.removeEventListener(o.type, o.listener, o.options) : e[++r] = o;
      ++r ? e.length = r : delete this.__on;
    }
  };
}
function su(t, e, i) {
  return function() {
    var r = this.__on, n, o = ru(e);
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
function au(t, e, i) {
  var r = nu(t + ""), n, o = r.length, s;
  if (arguments.length < 2) {
    var a = this.node().__on;
    if (a) {
      for (var l = 0, c = a.length, h; l < c; ++l)
        for (n = 0, h = a[l]; n < o; ++n)
          if ((s = r[n]).type === h.type && s.name === h.name)
            return h.value;
    }
    return;
  }
  for (a = e ? su : ou, n = 0; n < o; ++n)
    this.each(a(r[n], e, i));
  return this;
}
function Gs(t, e, i) {
  var r = Ws(t), n = r.CustomEvent;
  typeof n == "function" ? n = new n(e, i) : (n = r.document.createEvent("Event"), i ? (n.initEvent(e, i.bubbles, i.cancelable), n.detail = i.detail) : n.initEvent(e, !1, !1)), t.dispatchEvent(n);
}
function lu(t, e) {
  return function() {
    return Gs(this, t, e);
  };
}
function cu(t, e) {
  return function() {
    return Gs(this, t, e.apply(this, arguments));
  };
}
function hu(t, e) {
  return this.each((typeof e == "function" ? cu : lu)(t, e));
}
function* uu() {
  for (var t = this._groups, e = 0, i = t.length; e < i; ++e)
    for (var r = t[e], n = 0, o = r.length, s; n < o; ++n)
      (s = r[n]) && (yield s);
}
var Ys = [null];
function ot(t, e) {
  this._groups = t, this._parents = e;
}
function ei() {
  return new ot([[document.documentElement]], Ys);
}
function fu() {
  return this;
}
ot.prototype = ei.prototype = {
  constructor: ot,
  select: Rc,
  selectAll: Hc,
  selectChild: Gc,
  selectChildren: Kc,
  filter: Zc,
  data: rh,
  enter: Jc,
  exit: oh,
  join: sh,
  merge: ah,
  selection: fu,
  order: lh,
  sort: ch,
  call: uh,
  nodes: fh,
  node: dh,
  size: ph,
  empty: gh,
  each: mh,
  attr: vh,
  style: Bh,
  property: Fh,
  classed: Ih,
  text: zh,
  html: qh,
  raise: Uh,
  lower: Yh,
  append: Vh,
  insert: Kh,
  remove: Jh,
  clone: eu,
  datum: iu,
  on: au,
  dispatch: hu,
  [Symbol.iterator]: uu
};
function bt(t) {
  return typeof t == "string" ? new ot([[document.querySelector(t)]], [document.documentElement]) : new ot([[t]], Ys);
}
function En(t, e, i) {
  t.prototype = e.prototype = i, i.constructor = t;
}
function Vs(t, e) {
  var i = Object.create(t.prototype);
  for (var r in e)
    i[r] = e[r];
  return i;
}
function ii() {
}
var Ue = 0.7, Wi = 1 / Ue, Ce = "\\s*([+-]?\\d+)\\s*", Ge = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", xt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", du = /^#([0-9a-f]{3,8})$/, pu = new RegExp(`^rgb\\(${Ce},${Ce},${Ce}\\)$`), gu = new RegExp(`^rgb\\(${xt},${xt},${xt}\\)$`), mu = new RegExp(`^rgba\\(${Ce},${Ce},${Ce},${Ge}\\)$`), _u = new RegExp(`^rgba\\(${xt},${xt},${xt},${Ge}\\)$`), yu = new RegExp(`^hsl\\(${Ge},${xt},${xt}\\)$`), Cu = new RegExp(`^hsla\\(${Ge},${xt},${xt},${Ge}\\)$`), wo = {
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
En(ii, Ye, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Bo,
  // Deprecated! Use color.formatHex.
  formatHex: Bo,
  formatHex8: bu,
  formatHsl: xu,
  formatRgb: Lo,
  toString: Lo
});
function Bo() {
  return this.rgb().formatHex();
}
function bu() {
  return this.rgb().formatHex8();
}
function xu() {
  return Xs(this).formatHsl();
}
function Lo() {
  return this.rgb().formatRgb();
}
function Ye(t) {
  var e, i;
  return t = (t + "").trim().toLowerCase(), (e = du.exec(t)) ? (i = e[1].length, e = parseInt(e[1], 16), i === 6 ? Ao(e) : i === 3 ? new et(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : i === 8 ? mi(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : i === 4 ? mi(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = pu.exec(t)) ? new et(e[1], e[2], e[3], 1) : (e = gu.exec(t)) ? new et(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = mu.exec(t)) ? mi(e[1], e[2], e[3], e[4]) : (e = _u.exec(t)) ? mi(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = yu.exec(t)) ? Mo(e[1], e[2] / 100, e[3] / 100, 1) : (e = Cu.exec(t)) ? Mo(e[1], e[2] / 100, e[3] / 100, e[4]) : wo.hasOwnProperty(t) ? Ao(wo[t]) : t === "transparent" ? new et(NaN, NaN, NaN, 0) : null;
}
function Ao(t) {
  return new et(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function mi(t, e, i, r) {
  return r <= 0 && (t = e = i = NaN), new et(t, e, i, r);
}
function Tu(t) {
  return t instanceof ii || (t = Ye(t)), t ? (t = t.rgb(), new et(t.r, t.g, t.b, t.opacity)) : new et();
}
function on(t, e, i, r) {
  return arguments.length === 1 ? Tu(t) : new et(t, e, i, r ?? 1);
}
function et(t, e, i, r) {
  this.r = +t, this.g = +e, this.b = +i, this.opacity = +r;
}
En(et, on, Vs(ii, {
  brighter(t) {
    return t = t == null ? Wi : Math.pow(Wi, t), new et(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Ue : Math.pow(Ue, t), new et(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new et(Zt(this.r), Zt(this.g), Zt(this.b), Hi(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Eo,
  // Deprecated! Use color.formatHex.
  formatHex: Eo,
  formatHex8: vu,
  formatRgb: Fo,
  toString: Fo
}));
function Eo() {
  return `#${Xt(this.r)}${Xt(this.g)}${Xt(this.b)}`;
}
function vu() {
  return `#${Xt(this.r)}${Xt(this.g)}${Xt(this.b)}${Xt((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Fo() {
  const t = Hi(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${Zt(this.r)}, ${Zt(this.g)}, ${Zt(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function Hi(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function Zt(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function Xt(t) {
  return t = Zt(t), (t < 16 ? "0" : "") + t.toString(16);
}
function Mo(t, e, i, r) {
  return r <= 0 ? t = e = i = NaN : i <= 0 || i >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new gt(t, e, i, r);
}
function Xs(t) {
  if (t instanceof gt)
    return new gt(t.h, t.s, t.l, t.opacity);
  if (t instanceof ii || (t = Ye(t)), !t)
    return new gt();
  if (t instanceof gt)
    return t;
  t = t.rgb();
  var e = t.r / 255, i = t.g / 255, r = t.b / 255, n = Math.min(e, i, r), o = Math.max(e, i, r), s = NaN, a = o - n, l = (o + n) / 2;
  return a ? (e === o ? s = (i - r) / a + (i < r) * 6 : i === o ? s = (r - e) / a + 2 : s = (e - i) / a + 4, a /= l < 0.5 ? o + n : 2 - o - n, s *= 60) : a = l > 0 && l < 1 ? 0 : s, new gt(s, a, l, t.opacity);
}
function Su(t, e, i, r) {
  return arguments.length === 1 ? Xs(t) : new gt(t, e, i, r ?? 1);
}
function gt(t, e, i, r) {
  this.h = +t, this.s = +e, this.l = +i, this.opacity = +r;
}
En(gt, Su, Vs(ii, {
  brighter(t) {
    return t = t == null ? Wi : Math.pow(Wi, t), new gt(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Ue : Math.pow(Ue, t), new gt(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, e = isNaN(t) || isNaN(this.s) ? 0 : this.s, i = this.l, r = i + (i < 0.5 ? i : 1 - i) * e, n = 2 * i - r;
    return new et(
      zr(t >= 240 ? t - 240 : t + 120, n, r),
      zr(t, n, r),
      zr(t < 120 ? t + 240 : t - 120, n, r),
      this.opacity
    );
  },
  clamp() {
    return new gt(Oo(this.h), _i(this.s), _i(this.l), Hi(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = Hi(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${Oo(this.h)}, ${_i(this.s) * 100}%, ${_i(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function Oo(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function _i(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function zr(t, e, i) {
  return (t < 60 ? e + (i - e) * t / 60 : t < 180 ? i : t < 240 ? e + (i - e) * (240 - t) / 60 : e) * 255;
}
const Fn = (t) => () => t;
function Ks(t, e) {
  return function(i) {
    return t + i * e;
  };
}
function ku(t, e, i) {
  return t = Math.pow(t, i), e = Math.pow(e, i) - t, i = 1 / i, function(r) {
    return Math.pow(t + r * e, i);
  };
}
function Hb(t, e) {
  var i = e - t;
  return i ? Ks(t, i > 180 || i < -180 ? i - 360 * Math.round(i / 360) : i) : Fn(isNaN(t) ? e : t);
}
function wu(t) {
  return (t = +t) == 1 ? Zs : function(e, i) {
    return i - e ? ku(e, i, t) : Fn(isNaN(e) ? i : e);
  };
}
function Zs(t, e) {
  var i = e - t;
  return i ? Ks(t, i) : Fn(isNaN(t) ? e : t);
}
const $o = function t(e) {
  var i = wu(e);
  function r(n, o) {
    var s = i((n = on(n)).r, (o = on(o)).r), a = i(n.g, o.g), l = i(n.b, o.b), c = Zs(n.opacity, o.opacity);
    return function(h) {
      return n.r = s(h), n.g = a(h), n.b = l(h), n.opacity = c(h), n + "";
    };
  }
  return r.gamma = t, r;
}(1);
function Dt(t, e) {
  return t = +t, e = +e, function(i) {
    return t * (1 - i) + e * i;
  };
}
var sn = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Pr = new RegExp(sn.source, "g");
function Bu(t) {
  return function() {
    return t;
  };
}
function Lu(t) {
  return function(e) {
    return t(e) + "";
  };
}
function Au(t, e) {
  var i = sn.lastIndex = Pr.lastIndex = 0, r, n, o, s = -1, a = [], l = [];
  for (t = t + "", e = e + ""; (r = sn.exec(t)) && (n = Pr.exec(e)); )
    (o = n.index) > i && (o = e.slice(i, o), a[s] ? a[s] += o : a[++s] = o), (r = r[0]) === (n = n[0]) ? a[s] ? a[s] += n : a[++s] = n : (a[++s] = null, l.push({ i: s, x: Dt(r, n) })), i = Pr.lastIndex;
  return i < e.length && (o = e.slice(i), a[s] ? a[s] += o : a[++s] = o), a.length < 2 ? l[0] ? Lu(l[0].x) : Bu(e) : (e = l.length, function(c) {
    for (var h = 0, u; h < e; ++h)
      a[(u = l[h]).i] = u.x(c);
    return a.join("");
  });
}
var Io = 180 / Math.PI, an = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function Js(t, e, i, r, n, o) {
  var s, a, l;
  return (s = Math.sqrt(t * t + e * e)) && (t /= s, e /= s), (l = t * i + e * r) && (i -= t * l, r -= e * l), (a = Math.sqrt(i * i + r * r)) && (i /= a, r /= a, l /= a), t * r < e * i && (t = -t, e = -e, l = -l, s = -s), {
    translateX: n,
    translateY: o,
    rotate: Math.atan2(e, t) * Io,
    skewX: Math.atan(l) * Io,
    scaleX: s,
    scaleY: a
  };
}
var yi;
function Eu(t) {
  const e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return e.isIdentity ? an : Js(e.a, e.b, e.c, e.d, e.e, e.f);
}
function Fu(t) {
  return t == null || (yi || (yi = document.createElementNS("http://www.w3.org/2000/svg", "g")), yi.setAttribute("transform", t), !(t = yi.transform.baseVal.consolidate())) ? an : (t = t.matrix, Js(t.a, t.b, t.c, t.d, t.e, t.f));
}
function Qs(t, e, i, r) {
  function n(c) {
    return c.length ? c.pop() + " " : "";
  }
  function o(c, h, u, g, d, _) {
    if (c !== u || h !== g) {
      var T = d.push("translate(", null, e, null, i);
      _.push({ i: T - 4, x: Dt(c, u) }, { i: T - 2, x: Dt(h, g) });
    } else
      (u || g) && d.push("translate(" + u + e + g + i);
  }
  function s(c, h, u, g) {
    c !== h ? (c - h > 180 ? h += 360 : h - c > 180 && (c += 360), g.push({ i: u.push(n(u) + "rotate(", null, r) - 2, x: Dt(c, h) })) : h && u.push(n(u) + "rotate(" + h + r);
  }
  function a(c, h, u, g) {
    c !== h ? g.push({ i: u.push(n(u) + "skewX(", null, r) - 2, x: Dt(c, h) }) : h && u.push(n(u) + "skewX(" + h + r);
  }
  function l(c, h, u, g, d, _) {
    if (c !== u || h !== g) {
      var T = d.push(n(d) + "scale(", null, ",", null, ")");
      _.push({ i: T - 4, x: Dt(c, u) }, { i: T - 2, x: Dt(h, g) });
    } else
      (u !== 1 || g !== 1) && d.push(n(d) + "scale(" + u + "," + g + ")");
  }
  return function(c, h) {
    var u = [], g = [];
    return c = t(c), h = t(h), o(c.translateX, c.translateY, h.translateX, h.translateY, u, g), s(c.rotate, h.rotate, u, g), a(c.skewX, h.skewX, u, g), l(c.scaleX, c.scaleY, h.scaleX, h.scaleY, u, g), c = h = null, function(d) {
      for (var _ = -1, T = g.length, w; ++_ < T; )
        u[(w = g[_]).i] = w.x(d);
      return u.join("");
    };
  };
}
var Mu = Qs(Eu, "px, ", "px)", "deg)"), Ou = Qs(Fu, ", ", ")", ")"), Te = 0, Ne = 0, $e = 0, ta = 1e3, qi, Re, ji = 0, te = 0, cr = 0, Ve = typeof performance == "object" && performance.now ? performance : Date, ea = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function Mn() {
  return te || (ea($u), te = Ve.now() + cr);
}
function $u() {
  te = 0;
}
function Ui() {
  this._call = this._time = this._next = null;
}
Ui.prototype = ia.prototype = {
  constructor: Ui,
  restart: function(t, e, i) {
    if (typeof t != "function")
      throw new TypeError("callback is not a function");
    i = (i == null ? Mn() : +i) + (e == null ? 0 : +e), !this._next && Re !== this && (Re ? Re._next = this : qi = this, Re = this), this._call = t, this._time = i, ln();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, ln());
  }
};
function ia(t, e, i) {
  var r = new Ui();
  return r.restart(t, e, i), r;
}
function Iu() {
  Mn(), ++Te;
  for (var t = qi, e; t; )
    (e = te - t._time) >= 0 && t._call.call(void 0, e), t = t._next;
  --Te;
}
function Do() {
  te = (ji = Ve.now()) + cr, Te = Ne = 0;
  try {
    Iu();
  } finally {
    Te = 0, Nu(), te = 0;
  }
}
function Du() {
  var t = Ve.now(), e = t - ji;
  e > ta && (cr -= e, ji = t);
}
function Nu() {
  for (var t, e = qi, i, r = 1 / 0; e; )
    e._call ? (r > e._time && (r = e._time), t = e, e = e._next) : (i = e._next, e._next = null, e = t ? t._next = i : qi = i);
  Re = t, ln(r);
}
function ln(t) {
  if (!Te) {
    Ne && (Ne = clearTimeout(Ne));
    var e = t - te;
    e > 24 ? (t < 1 / 0 && (Ne = setTimeout(Do, t - Ve.now() - cr)), $e && ($e = clearInterval($e))) : ($e || (ji = Ve.now(), $e = setInterval(Du, ta)), Te = 1, ea(Do));
  }
}
function No(t, e, i) {
  var r = new Ui();
  return e = e == null ? 0 : +e, r.restart((n) => {
    r.stop(), t(n + e);
  }, e, i), r;
}
var Ru = Is("start", "end", "cancel", "interrupt"), zu = [], ra = 0, Ro = 1, cn = 2, Bi = 3, zo = 4, hn = 5, Li = 6;
function hr(t, e, i, r, n, o) {
  var s = t.__transition;
  if (!s)
    t.__transition = {};
  else if (i in s)
    return;
  Pu(t, i, {
    name: e,
    index: r,
    // For context during callback.
    group: n,
    // For context during callback.
    on: Ru,
    tween: zu,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: ra
  });
}
function On(t, e) {
  var i = yt(t, e);
  if (i.state > ra)
    throw new Error("too late; already scheduled");
  return i;
}
function vt(t, e) {
  var i = yt(t, e);
  if (i.state > Bi)
    throw new Error("too late; already running");
  return i;
}
function yt(t, e) {
  var i = t.__transition;
  if (!i || !(i = i[e]))
    throw new Error("transition not found");
  return i;
}
function Pu(t, e, i) {
  var r = t.__transition, n;
  r[e] = i, i.timer = ia(o, 0, i.time);
  function o(c) {
    i.state = Ro, i.timer.restart(s, i.delay, i.time), i.delay <= c && s(c - i.delay);
  }
  function s(c) {
    var h, u, g, d;
    if (i.state !== Ro)
      return l();
    for (h in r)
      if (d = r[h], d.name === i.name) {
        if (d.state === Bi)
          return No(s);
        d.state === zo ? (d.state = Li, d.timer.stop(), d.on.call("interrupt", t, t.__data__, d.index, d.group), delete r[h]) : +h < e && (d.state = Li, d.timer.stop(), d.on.call("cancel", t, t.__data__, d.index, d.group), delete r[h]);
      }
    if (No(function() {
      i.state === Bi && (i.state = zo, i.timer.restart(a, i.delay, i.time), a(c));
    }), i.state = cn, i.on.call("start", t, t.__data__, i.index, i.group), i.state === cn) {
      for (i.state = Bi, n = new Array(g = i.tween.length), h = 0, u = -1; h < g; ++h)
        (d = i.tween[h].value.call(t, t.__data__, i.index, i.group)) && (n[++u] = d);
      n.length = u + 1;
    }
  }
  function a(c) {
    for (var h = c < i.duration ? i.ease.call(null, c / i.duration) : (i.timer.restart(l), i.state = hn, 1), u = -1, g = n.length; ++u < g; )
      n[u].call(t, h);
    i.state === hn && (i.on.call("end", t, t.__data__, i.index, i.group), l());
  }
  function l() {
    i.state = Li, i.timer.stop(), delete r[e];
    for (var c in r)
      return;
    delete t.__transition;
  }
}
function Wu(t, e) {
  var i = t.__transition, r, n, o = !0, s;
  if (i) {
    e = e == null ? null : e + "";
    for (s in i) {
      if ((r = i[s]).name !== e) {
        o = !1;
        continue;
      }
      n = r.state > cn && r.state < hn, r.state = Li, r.timer.stop(), r.on.call(n ? "interrupt" : "cancel", t, t.__data__, r.index, r.group), delete i[s];
    }
    o && delete t.__transition;
  }
}
function Hu(t) {
  return this.each(function() {
    Wu(this, t);
  });
}
function qu(t, e) {
  var i, r;
  return function() {
    var n = vt(this, t), o = n.tween;
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
function ju(t, e, i) {
  var r, n;
  if (typeof i != "function")
    throw new Error();
  return function() {
    var o = vt(this, t), s = o.tween;
    if (s !== r) {
      n = (r = s).slice();
      for (var a = { name: e, value: i }, l = 0, c = n.length; l < c; ++l)
        if (n[l].name === e) {
          n[l] = a;
          break;
        }
      l === c && n.push(a);
    }
    o.tween = n;
  };
}
function Uu(t, e) {
  var i = this._id;
  if (t += "", arguments.length < 2) {
    for (var r = yt(this.node(), i).tween, n = 0, o = r.length, s; n < o; ++n)
      if ((s = r[n]).name === t)
        return s.value;
    return null;
  }
  return this.each((e == null ? qu : ju)(i, t, e));
}
function $n(t, e, i) {
  var r = t._id;
  return t.each(function() {
    var n = vt(this, r);
    (n.value || (n.value = {}))[e] = i.apply(this, arguments);
  }), function(n) {
    return yt(n, r).value[e];
  };
}
function na(t, e) {
  var i;
  return (typeof e == "number" ? Dt : e instanceof Ye ? $o : (i = Ye(e)) ? (e = i, $o) : Au)(t, e);
}
function Gu(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Yu(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Vu(t, e, i) {
  var r, n = i + "", o;
  return function() {
    var s = this.getAttribute(t);
    return s === n ? null : s === r ? o : o = e(r = s, i);
  };
}
function Xu(t, e, i) {
  var r, n = i + "", o;
  return function() {
    var s = this.getAttributeNS(t.space, t.local);
    return s === n ? null : s === r ? o : o = e(r = s, i);
  };
}
function Ku(t, e, i) {
  var r, n, o;
  return function() {
    var s, a = i(this), l;
    return a == null ? void this.removeAttribute(t) : (s = this.getAttribute(t), l = a + "", s === l ? null : s === r && l === n ? o : (n = l, o = e(r = s, a)));
  };
}
function Zu(t, e, i) {
  var r, n, o;
  return function() {
    var s, a = i(this), l;
    return a == null ? void this.removeAttributeNS(t.space, t.local) : (s = this.getAttributeNS(t.space, t.local), l = a + "", s === l ? null : s === r && l === n ? o : (n = l, o = e(r = s, a)));
  };
}
function Ju(t, e) {
  var i = lr(t), r = i === "transform" ? Ou : na;
  return this.attrTween(t, typeof e == "function" ? (i.local ? Zu : Ku)(i, r, $n(this, "attr." + t, e)) : e == null ? (i.local ? Yu : Gu)(i) : (i.local ? Xu : Vu)(i, r, e));
}
function Qu(t, e) {
  return function(i) {
    this.setAttribute(t, e.call(this, i));
  };
}
function tf(t, e) {
  return function(i) {
    this.setAttributeNS(t.space, t.local, e.call(this, i));
  };
}
function ef(t, e) {
  var i, r;
  function n() {
    var o = e.apply(this, arguments);
    return o !== r && (i = (r = o) && tf(t, o)), i;
  }
  return n._value = e, n;
}
function rf(t, e) {
  var i, r;
  function n() {
    var o = e.apply(this, arguments);
    return o !== r && (i = (r = o) && Qu(t, o)), i;
  }
  return n._value = e, n;
}
function nf(t, e) {
  var i = "attr." + t;
  if (arguments.length < 2)
    return (i = this.tween(i)) && i._value;
  if (e == null)
    return this.tween(i, null);
  if (typeof e != "function")
    throw new Error();
  var r = lr(t);
  return this.tween(i, (r.local ? ef : rf)(r, e));
}
function of(t, e) {
  return function() {
    On(this, t).delay = +e.apply(this, arguments);
  };
}
function sf(t, e) {
  return e = +e, function() {
    On(this, t).delay = e;
  };
}
function af(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? of : sf)(e, t)) : yt(this.node(), e).delay;
}
function lf(t, e) {
  return function() {
    vt(this, t).duration = +e.apply(this, arguments);
  };
}
function cf(t, e) {
  return e = +e, function() {
    vt(this, t).duration = e;
  };
}
function hf(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? lf : cf)(e, t)) : yt(this.node(), e).duration;
}
function uf(t, e) {
  if (typeof e != "function")
    throw new Error();
  return function() {
    vt(this, t).ease = e;
  };
}
function ff(t) {
  var e = this._id;
  return arguments.length ? this.each(uf(e, t)) : yt(this.node(), e).ease;
}
function df(t, e) {
  return function() {
    var i = e.apply(this, arguments);
    if (typeof i != "function")
      throw new Error();
    vt(this, t).ease = i;
  };
}
function pf(t) {
  if (typeof t != "function")
    throw new Error();
  return this.each(df(this._id, t));
}
function gf(t) {
  typeof t != "function" && (t = Rs(t));
  for (var e = this._groups, i = e.length, r = new Array(i), n = 0; n < i; ++n)
    for (var o = e[n], s = o.length, a = r[n] = [], l, c = 0; c < s; ++c)
      (l = o[c]) && t.call(l, l.__data__, c, o) && a.push(l);
  return new Et(r, this._parents, this._name, this._id);
}
function mf(t) {
  if (t._id !== this._id)
    throw new Error();
  for (var e = this._groups, i = t._groups, r = e.length, n = i.length, o = Math.min(r, n), s = new Array(r), a = 0; a < o; ++a)
    for (var l = e[a], c = i[a], h = l.length, u = s[a] = new Array(h), g, d = 0; d < h; ++d)
      (g = l[d] || c[d]) && (u[d] = g);
  for (; a < r; ++a)
    s[a] = e[a];
  return new Et(s, this._parents, this._name, this._id);
}
function _f(t) {
  return (t + "").trim().split(/^|\s+/).every(function(e) {
    var i = e.indexOf(".");
    return i >= 0 && (e = e.slice(0, i)), !e || e === "start";
  });
}
function yf(t, e, i) {
  var r, n, o = _f(e) ? On : vt;
  return function() {
    var s = o(this, t), a = s.on;
    a !== r && (n = (r = a).copy()).on(e, i), s.on = n;
  };
}
function Cf(t, e) {
  var i = this._id;
  return arguments.length < 2 ? yt(this.node(), i).on.on(t) : this.each(yf(i, t, e));
}
function bf(t) {
  return function() {
    var e = this.parentNode;
    for (var i in this.__transition)
      if (+i !== t)
        return;
    e && e.removeChild(this);
  };
}
function xf() {
  return this.on("end.remove", bf(this._id));
}
function Tf(t) {
  var e = this._name, i = this._id;
  typeof t != "function" && (t = Ln(t));
  for (var r = this._groups, n = r.length, o = new Array(n), s = 0; s < n; ++s)
    for (var a = r[s], l = a.length, c = o[s] = new Array(l), h, u, g = 0; g < l; ++g)
      (h = a[g]) && (u = t.call(h, h.__data__, g, a)) && ("__data__" in h && (u.__data__ = h.__data__), c[g] = u, hr(c[g], e, i, g, c, yt(h, i)));
  return new Et(o, this._parents, e, i);
}
function vf(t) {
  var e = this._name, i = this._id;
  typeof t != "function" && (t = Ns(t));
  for (var r = this._groups, n = r.length, o = [], s = [], a = 0; a < n; ++a)
    for (var l = r[a], c = l.length, h, u = 0; u < c; ++u)
      if (h = l[u]) {
        for (var g = t.call(h, h.__data__, u, l), d, _ = yt(h, i), T = 0, w = g.length; T < w; ++T)
          (d = g[T]) && hr(d, e, i, T, g, _);
        o.push(g), s.push(h);
      }
  return new Et(o, s, e, i);
}
var Sf = ei.prototype.constructor;
function kf() {
  return new Sf(this._groups, this._parents);
}
function wf(t, e) {
  var i, r, n;
  return function() {
    var o = xe(this, t), s = (this.style.removeProperty(t), xe(this, t));
    return o === s ? null : o === i && s === r ? n : n = e(i = o, r = s);
  };
}
function oa(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Bf(t, e, i) {
  var r, n = i + "", o;
  return function() {
    var s = xe(this, t);
    return s === n ? null : s === r ? o : o = e(r = s, i);
  };
}
function Lf(t, e, i) {
  var r, n, o;
  return function() {
    var s = xe(this, t), a = i(this), l = a + "";
    return a == null && (l = a = (this.style.removeProperty(t), xe(this, t))), s === l ? null : s === r && l === n ? o : (n = l, o = e(r = s, a));
  };
}
function Af(t, e) {
  var i, r, n, o = "style." + e, s = "end." + o, a;
  return function() {
    var l = vt(this, t), c = l.on, h = l.value[o] == null ? a || (a = oa(e)) : void 0;
    (c !== i || n !== h) && (r = (i = c).copy()).on(s, n = h), l.on = r;
  };
}
function Ef(t, e, i) {
  var r = (t += "") == "transform" ? Mu : na;
  return e == null ? this.styleTween(t, wf(t, r)).on("end.style." + t, oa(t)) : typeof e == "function" ? this.styleTween(t, Lf(t, r, $n(this, "style." + t, e))).each(Af(this._id, t)) : this.styleTween(t, Bf(t, r, e), i).on("end.style." + t, null);
}
function Ff(t, e, i) {
  return function(r) {
    this.style.setProperty(t, e.call(this, r), i);
  };
}
function Mf(t, e, i) {
  var r, n;
  function o() {
    var s = e.apply(this, arguments);
    return s !== n && (r = (n = s) && Ff(t, s, i)), r;
  }
  return o._value = e, o;
}
function Of(t, e, i) {
  var r = "style." + (t += "");
  if (arguments.length < 2)
    return (r = this.tween(r)) && r._value;
  if (e == null)
    return this.tween(r, null);
  if (typeof e != "function")
    throw new Error();
  return this.tween(r, Mf(t, e, i ?? ""));
}
function $f(t) {
  return function() {
    this.textContent = t;
  };
}
function If(t) {
  return function() {
    var e = t(this);
    this.textContent = e ?? "";
  };
}
function Df(t) {
  return this.tween("text", typeof t == "function" ? If($n(this, "text", t)) : $f(t == null ? "" : t + ""));
}
function Nf(t) {
  return function(e) {
    this.textContent = t.call(this, e);
  };
}
function Rf(t) {
  var e, i;
  function r() {
    var n = t.apply(this, arguments);
    return n !== i && (e = (i = n) && Nf(n)), e;
  }
  return r._value = t, r;
}
function zf(t) {
  var e = "text";
  if (arguments.length < 1)
    return (e = this.tween(e)) && e._value;
  if (t == null)
    return this.tween(e, null);
  if (typeof t != "function")
    throw new Error();
  return this.tween(e, Rf(t));
}
function Pf() {
  for (var t = this._name, e = this._id, i = sa(), r = this._groups, n = r.length, o = 0; o < n; ++o)
    for (var s = r[o], a = s.length, l, c = 0; c < a; ++c)
      if (l = s[c]) {
        var h = yt(l, e);
        hr(l, t, i, c, s, {
          time: h.time + h.delay + h.duration,
          delay: 0,
          duration: h.duration,
          ease: h.ease
        });
      }
  return new Et(r, this._parents, t, i);
}
function Wf() {
  var t, e, i = this, r = i._id, n = i.size();
  return new Promise(function(o, s) {
    var a = { value: s }, l = { value: function() {
      --n === 0 && o();
    } };
    i.each(function() {
      var c = vt(this, r), h = c.on;
      h !== t && (e = (t = h).copy(), e._.cancel.push(a), e._.interrupt.push(a), e._.end.push(l)), c.on = e;
    }), n === 0 && o();
  });
}
var Hf = 0;
function Et(t, e, i, r) {
  this._groups = t, this._parents = e, this._name = i, this._id = r;
}
function sa() {
  return ++Hf;
}
var Bt = ei.prototype;
Et.prototype = {
  constructor: Et,
  select: Tf,
  selectAll: vf,
  selectChild: Bt.selectChild,
  selectChildren: Bt.selectChildren,
  filter: gf,
  merge: mf,
  selection: kf,
  transition: Pf,
  call: Bt.call,
  nodes: Bt.nodes,
  node: Bt.node,
  size: Bt.size,
  empty: Bt.empty,
  each: Bt.each,
  on: Cf,
  attr: Ju,
  attrTween: nf,
  style: Ef,
  styleTween: Of,
  text: Df,
  textTween: zf,
  remove: xf,
  tween: Uu,
  delay: af,
  duration: hf,
  ease: ff,
  easeVarying: pf,
  end: Wf,
  [Symbol.iterator]: Bt[Symbol.iterator]
};
function qf(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var jf = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: qf
};
function Uf(t, e) {
  for (var i; !(i = t.__transition) || !(i = i[e]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${e} not found`);
  return i;
}
function Gf(t) {
  var e, i;
  t instanceof Et ? (e = t._id, t = t._name) : (e = sa(), (i = jf).time = Mn(), t = t == null ? null : t + "");
  for (var r = this._groups, n = r.length, o = 0; o < n; ++o)
    for (var s = r[o], a = s.length, l, c = 0; c < a; ++c)
      (l = s[c]) && hr(l, t, e, c, s, i || Uf(l, e));
  return new Et(r, this._parents, t, e);
}
ei.prototype.interrupt = Hu;
ei.prototype.transition = Gf;
const qb = Math.abs, jb = Math.atan2, Ub = Math.cos, Gb = Math.max, Yb = Math.min, Vb = Math.sin, Xb = Math.sqrt, Po = 1e-12, In = Math.PI, Wo = In / 2, Kb = 2 * In;
function Zb(t) {
  return t > 1 ? 0 : t < -1 ? In : Math.acos(t);
}
function Jb(t) {
  return t >= 1 ? Wo : t <= -1 ? -Wo : Math.asin(t);
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
function Yf(t) {
  return new aa(t);
}
class la {
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
function Vf(t) {
  return new la(t, !0);
}
function Xf(t) {
  return new la(t, !1);
}
function Pt() {
}
function Gi(t, e, i) {
  t._context.bezierCurveTo(
    (2 * t._x0 + t._x1) / 3,
    (2 * t._y0 + t._y1) / 3,
    (t._x0 + 2 * t._x1) / 3,
    (t._y0 + 2 * t._y1) / 3,
    (t._x0 + 4 * t._x1 + e) / 6,
    (t._y0 + 4 * t._y1 + i) / 6
  );
}
function ur(t) {
  this._context = t;
}
ur.prototype = {
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
        Gi(this, this._x1, this._y1);
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
        Gi(this, t, e);
        break;
    }
    this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = e;
  }
};
function Kf(t) {
  return new ur(t);
}
function ca(t) {
  this._context = t;
}
ca.prototype = {
  areaStart: Pt,
  areaEnd: Pt,
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
        Gi(this, t, e);
        break;
    }
    this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = e;
  }
};
function Zf(t) {
  return new ca(t);
}
function ha(t) {
  this._context = t;
}
ha.prototype = {
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
        Gi(this, t, e);
        break;
    }
    this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = e;
  }
};
function Jf(t) {
  return new ha(t);
}
function ua(t, e) {
  this._basis = new ur(t), this._beta = e;
}
ua.prototype = {
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
const Qf = function t(e) {
  function i(r) {
    return e === 1 ? new ur(r) : new ua(r, e);
  }
  return i.beta = function(r) {
    return t(+r);
  }, i;
}(0.85);
function Yi(t, e, i) {
  t._context.bezierCurveTo(
    t._x1 + t._k * (t._x2 - t._x0),
    t._y1 + t._k * (t._y2 - t._y0),
    t._x2 + t._k * (t._x1 - e),
    t._y2 + t._k * (t._y1 - i),
    t._x2,
    t._y2
  );
}
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
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x2, this._y2);
        break;
      case 3:
        Yi(this, this._x1, this._y1);
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
        Yi(this, t, e);
        break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = e;
  }
};
const td = function t(e) {
  function i(r) {
    return new Dn(r, e);
  }
  return i.tension = function(r) {
    return t(+r);
  }, i;
}(0);
function Nn(t, e) {
  this._context = t, this._k = (1 - e) / 6;
}
Nn.prototype = {
  areaStart: Pt,
  areaEnd: Pt,
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
        Yi(this, t, e);
        break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = e;
  }
};
const ed = function t(e) {
  function i(r) {
    return new Nn(r, e);
  }
  return i.tension = function(r) {
    return t(+r);
  }, i;
}(0);
function Rn(t, e) {
  this._context = t, this._k = (1 - e) / 6;
}
Rn.prototype = {
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
        Yi(this, t, e);
        break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = e;
  }
};
const id = function t(e) {
  function i(r) {
    return new Rn(r, e);
  }
  return i.tension = function(r) {
    return t(+r);
  }, i;
}(0);
function zn(t, e, i) {
  var r = t._x1, n = t._y1, o = t._x2, s = t._y2;
  if (t._l01_a > Po) {
    var a = 2 * t._l01_2a + 3 * t._l01_a * t._l12_a + t._l12_2a, l = 3 * t._l01_a * (t._l01_a + t._l12_a);
    r = (r * a - t._x0 * t._l12_2a + t._x2 * t._l01_2a) / l, n = (n * a - t._y0 * t._l12_2a + t._y2 * t._l01_2a) / l;
  }
  if (t._l23_a > Po) {
    var c = 2 * t._l23_2a + 3 * t._l23_a * t._l12_a + t._l12_2a, h = 3 * t._l23_a * (t._l23_a + t._l12_a);
    o = (o * c + t._x1 * t._l23_2a - e * t._l12_2a) / h, s = (s * c + t._y1 * t._l23_2a - i * t._l12_2a) / h;
  }
  t._context.bezierCurveTo(r, n, o, s, t._x2, t._y2);
}
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
        zn(this, t, e);
        break;
    }
    this._l01_a = this._l12_a, this._l12_a = this._l23_a, this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a, this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = e;
  }
};
const rd = function t(e) {
  function i(r) {
    return e ? new fa(r, e) : new Dn(r, 0);
  }
  return i.alpha = function(r) {
    return t(+r);
  }, i;
}(0.5);
function da(t, e) {
  this._context = t, this._alpha = e;
}
da.prototype = {
  areaStart: Pt,
  areaEnd: Pt,
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
        zn(this, t, e);
        break;
    }
    this._l01_a = this._l12_a, this._l12_a = this._l23_a, this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a, this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = e;
  }
};
const nd = function t(e) {
  function i(r) {
    return e ? new da(r, e) : new Nn(r, 0);
  }
  return i.alpha = function(r) {
    return t(+r);
  }, i;
}(0.5);
function pa(t, e) {
  this._context = t, this._alpha = e;
}
pa.prototype = {
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
        zn(this, t, e);
        break;
    }
    this._l01_a = this._l12_a, this._l12_a = this._l23_a, this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a, this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = e;
  }
};
const od = function t(e) {
  function i(r) {
    return e ? new pa(r, e) : new Rn(r, 0);
  }
  return i.alpha = function(r) {
    return t(+r);
  }, i;
}(0.5);
function ga(t) {
  this._context = t;
}
ga.prototype = {
  areaStart: Pt,
  areaEnd: Pt,
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
function sd(t) {
  return new ga(t);
}
function Ho(t) {
  return t < 0 ? -1 : 1;
}
function qo(t, e, i) {
  var r = t._x1 - t._x0, n = e - t._x1, o = (t._y1 - t._y0) / (r || n < 0 && -0), s = (i - t._y1) / (n || r < 0 && -0), a = (o * n + s * r) / (r + n);
  return (Ho(o) + Ho(s)) * Math.min(Math.abs(o), Math.abs(s), 0.5 * Math.abs(a)) || 0;
}
function jo(t, e) {
  var i = t._x1 - t._x0;
  return i ? (3 * (t._y1 - t._y0) / i - e) / 2 : e;
}
function Wr(t, e, i) {
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
        Wr(this, this._t0, jo(this, this._t0));
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
          this._point = 3, Wr(this, jo(this, i = qo(this, t, e)), i);
          break;
        default:
          Wr(this, this._t0, i = qo(this, t, e));
          break;
      }
      this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = e, this._t0 = i;
    }
  }
};
function ma(t) {
  this._context = new _a(t);
}
(ma.prototype = Object.create(Vi.prototype)).point = function(t, e) {
  Vi.prototype.point.call(this, e, t);
};
function _a(t) {
  this._context = t;
}
_a.prototype = {
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
function ad(t) {
  return new Vi(t);
}
function ld(t) {
  return new ma(t);
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
    this._x = [], this._y = [];
  },
  lineEnd: function() {
    var t = this._x, e = this._y, i = t.length;
    if (i)
      if (this._line ? this._context.lineTo(t[0], e[0]) : this._context.moveTo(t[0], e[0]), i === 2)
        this._context.lineTo(t[1], e[1]);
      else
        for (var r = Uo(t), n = Uo(e), o = 0, s = 1; s < i; ++o, ++s)
          this._context.bezierCurveTo(r[0][o], n[0][o], r[1][o], n[1][o], t[s], e[s]);
    (this._line || this._line !== 0 && i === 1) && this._context.closePath(), this._line = 1 - this._line, this._x = this._y = null;
  },
  point: function(t, e) {
    this._x.push(+t), this._y.push(+e);
  }
};
function Uo(t) {
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
function cd(t) {
  return new ya(t);
}
function fr(t, e) {
  this._context = t, this._t = e;
}
fr.prototype = {
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
function hd(t) {
  return new fr(t, 0.5);
}
function ud(t) {
  return new fr(t, 0);
}
function fd(t) {
  return new fr(t, 1);
}
function ze(t, e, i) {
  this.k = t, this.x = e, this.y = i;
}
ze.prototype = {
  constructor: ze,
  scale: function(t) {
    return t === 1 ? this : new ze(this.k * t, this.x, this.y);
  },
  translate: function(t, e) {
    return t === 0 & e === 0 ? this : new ze(this.k, this.x + this.k * t, this.y + this.k * e);
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
ze.prototype;
/*! @license DOMPurify 3.0.2 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.0.2/LICENSE */
const {
  entries: Ca,
  setPrototypeOf: Go,
  isFrozen: dd,
  getPrototypeOf: pd,
  getOwnPropertyDescriptor: gd
} = Object;
let {
  freeze: Q,
  seal: _t,
  create: md
} = Object, {
  apply: un,
  construct: fn
} = typeof Reflect < "u" && Reflect;
un || (un = function(e, i, r) {
  return e.apply(i, r);
});
Q || (Q = function(e) {
  return e;
});
_t || (_t = function(e) {
  return e;
});
fn || (fn = function(e, i) {
  return new e(...i);
});
const _d = ht(Array.prototype.forEach), Yo = ht(Array.prototype.pop), Ie = ht(Array.prototype.push), Ai = ht(String.prototype.toLowerCase), Hr = ht(String.prototype.toString), yd = ht(String.prototype.match), dt = ht(String.prototype.replace), Cd = ht(String.prototype.indexOf), bd = ht(String.prototype.trim), nt = ht(RegExp.prototype.test), qr = xd(TypeError);
function ht(t) {
  return function(e) {
    for (var i = arguments.length, r = new Array(i > 1 ? i - 1 : 0), n = 1; n < i; n++)
      r[n - 1] = arguments[n];
    return un(t, e, r);
  };
}
function xd(t) {
  return function() {
    for (var e = arguments.length, i = new Array(e), r = 0; r < e; r++)
      i[r] = arguments[r];
    return fn(t, i);
  };
}
function E(t, e, i) {
  i = i || Ai, Go && Go(t, null);
  let r = e.length;
  for (; r--; ) {
    let n = e[r];
    if (typeof n == "string") {
      const o = i(n);
      o !== n && (dd(e) || (e[r] = o), n = o);
    }
    t[n] = !0;
  }
  return t;
}
function ue(t) {
  const e = md(null);
  for (const [i, r] of Ca(t))
    e[i] = r;
  return e;
}
function Ci(t, e) {
  for (; t !== null; ) {
    const r = gd(t, e);
    if (r) {
      if (r.get)
        return ht(r.get);
      if (typeof r.value == "function")
        return ht(r.value);
    }
    t = pd(t);
  }
  function i(r) {
    return console.warn("fallback value for", r), null;
  }
  return i;
}
const Vo = Q(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "section", "select", "shadow", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), jr = Q(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), Ur = Q(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), Td = Q(["animate", "color-profile", "cursor", "discard", "fedropshadow", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), Gr = Q(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), vd = Q(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), Xo = Q(["#text"]), Ko = Q(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "pattern", "placeholder", "playsinline", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "xmlns", "slot"]), Yr = Q(["accent-height", "accumulate", "additive", "alignment-baseline", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), Zo = Q(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), bi = Q(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), Sd = _t(/\{\{[\w\W]*|[\w\W]*\}\}/gm), kd = _t(/<%[\w\W]*|[\w\W]*%>/gm), wd = _t(/\${[\w\W]*}/gm), Bd = _t(/^data-[\-\w.\u00B7-\uFFFF]/), Ld = _t(/^aria-[\-\w]+$/), ba = _t(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
), Ad = _t(/^(?:\w+script|data):/i), Ed = _t(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
), xa = _t(/^html$/i);
var Jo = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  MUSTACHE_EXPR: Sd,
  ERB_EXPR: kd,
  TMPLIT_EXPR: wd,
  DATA_ATTR: Bd,
  ARIA_ATTR: Ld,
  IS_ALLOWED_URI: ba,
  IS_SCRIPT_OR_DATA: Ad,
  ATTR_WHITESPACE: Ed,
  DOCTYPE_NAME: xa
});
const Fd = () => typeof window > "u" ? null : window, Md = function(e, i) {
  if (typeof e != "object" || typeof e.createPolicy != "function")
    return null;
  let r = null;
  const n = "data-tt-policy-suffix";
  i.currentScript && i.currentScript.hasAttribute(n) && (r = i.currentScript.getAttribute(n));
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
function Ta() {
  let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : Fd();
  const e = (v) => Ta(v);
  if (e.version = "3.0.2", e.removed = [], !t || !t.document || t.document.nodeType !== 9)
    return e.isSupported = !1, e;
  const i = t.document;
  let {
    document: r
  } = t;
  const {
    DocumentFragment: n,
    HTMLTemplateElement: o,
    Node: s,
    Element: a,
    NodeFilter: l,
    NamedNodeMap: c = t.NamedNodeMap || t.MozNamedAttrMap,
    HTMLFormElement: h,
    DOMParser: u,
    trustedTypes: g
  } = t, d = a.prototype, _ = Ci(d, "cloneNode"), T = Ci(d, "nextSibling"), w = Ci(d, "childNodes"), L = Ci(d, "parentNode");
  if (typeof o == "function") {
    const v = r.createElement("template");
    v.content && v.content.ownerDocument && (r = v.content.ownerDocument);
  }
  const y = Md(g, i), F = y ? y.createHTML("") : "", {
    implementation: N,
    createNodeIterator: H,
    createDocumentFragment: Y,
    getElementsByTagName: O
  } = r, {
    importNode: kr
  } = i;
  let st = {};
  e.isSupported = typeof Ca == "function" && typeof L == "function" && N && typeof N.createHTMLDocument < "u";
  const {
    MUSTACHE_EXPR: ft,
    ERB_EXPR: oi,
    TMPLIT_EXPR: qt,
    DATA_ATTR: si,
    ARIA_ATTR: ai,
    IS_SCRIPT_OR_DATA: li,
    ATTR_WHITESPACE: Fe
  } = Jo;
  let {
    IS_ALLOWED_URI: rt
  } = Jo, z = null;
  const ci = E({}, [...Vo, ...jr, ...Ur, ...Gr, ...Xo]);
  let q = null;
  const eo = E({}, [...Ko, ...Yr, ...Zo, ...bi]);
  let R = Object.seal(Object.create(null, {
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
  })), Me = null, wr = null, io = !0, Br = !0, ro = !1, no = !0, oe = !1, jt = !1, Lr = !1, Ar = !1, se = !1, hi = !1, ui = !1, oo = !0, so = !1;
  const Jl = "user-content-";
  let Er = !0, Oe = !1, ae = {}, le = null;
  const ao = E({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
  let lo = null;
  const co = E({}, ["audio", "video", "img", "source", "image", "track"]);
  let Fr = null;
  const ho = E({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), fi = "http://www.w3.org/1998/Math/MathML", di = "http://www.w3.org/2000/svg", St = "http://www.w3.org/1999/xhtml";
  let ce = St, Mr = !1, Or = null;
  const Ql = E({}, [fi, di, St], Hr);
  let Ut;
  const tc = ["application/xhtml+xml", "text/html"], ec = "text/html";
  let j, he = null;
  const ic = r.createElement("form"), uo = function(f) {
    return f instanceof RegExp || f instanceof Function;
  }, $r = function(f) {
    he && he === f || ((!f || typeof f != "object") && (f = {}), f = ue(f), Ut = // eslint-disable-next-line unicorn/prefer-includes
    tc.indexOf(f.PARSER_MEDIA_TYPE) === -1 ? Ut = ec : Ut = f.PARSER_MEDIA_TYPE, j = Ut === "application/xhtml+xml" ? Hr : Ai, z = "ALLOWED_TAGS" in f ? E({}, f.ALLOWED_TAGS, j) : ci, q = "ALLOWED_ATTR" in f ? E({}, f.ALLOWED_ATTR, j) : eo, Or = "ALLOWED_NAMESPACES" in f ? E({}, f.ALLOWED_NAMESPACES, Hr) : Ql, Fr = "ADD_URI_SAFE_ATTR" in f ? E(
      ue(ho),
      // eslint-disable-line indent
      f.ADD_URI_SAFE_ATTR,
      // eslint-disable-line indent
      j
      // eslint-disable-line indent
    ) : ho, lo = "ADD_DATA_URI_TAGS" in f ? E(
      ue(co),
      // eslint-disable-line indent
      f.ADD_DATA_URI_TAGS,
      // eslint-disable-line indent
      j
      // eslint-disable-line indent
    ) : co, le = "FORBID_CONTENTS" in f ? E({}, f.FORBID_CONTENTS, j) : ao, Me = "FORBID_TAGS" in f ? E({}, f.FORBID_TAGS, j) : {}, wr = "FORBID_ATTR" in f ? E({}, f.FORBID_ATTR, j) : {}, ae = "USE_PROFILES" in f ? f.USE_PROFILES : !1, io = f.ALLOW_ARIA_ATTR !== !1, Br = f.ALLOW_DATA_ATTR !== !1, ro = f.ALLOW_UNKNOWN_PROTOCOLS || !1, no = f.ALLOW_SELF_CLOSE_IN_ATTR !== !1, oe = f.SAFE_FOR_TEMPLATES || !1, jt = f.WHOLE_DOCUMENT || !1, se = f.RETURN_DOM || !1, hi = f.RETURN_DOM_FRAGMENT || !1, ui = f.RETURN_TRUSTED_TYPE || !1, Ar = f.FORCE_BODY || !1, oo = f.SANITIZE_DOM !== !1, so = f.SANITIZE_NAMED_PROPS || !1, Er = f.KEEP_CONTENT !== !1, Oe = f.IN_PLACE || !1, rt = f.ALLOWED_URI_REGEXP || ba, ce = f.NAMESPACE || St, R = f.CUSTOM_ELEMENT_HANDLING || {}, f.CUSTOM_ELEMENT_HANDLING && uo(f.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (R.tagNameCheck = f.CUSTOM_ELEMENT_HANDLING.tagNameCheck), f.CUSTOM_ELEMENT_HANDLING && uo(f.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (R.attributeNameCheck = f.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), f.CUSTOM_ELEMENT_HANDLING && typeof f.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements == "boolean" && (R.allowCustomizedBuiltInElements = f.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), oe && (Br = !1), hi && (se = !0), ae && (z = E({}, [...Xo]), q = [], ae.html === !0 && (E(z, Vo), E(q, Ko)), ae.svg === !0 && (E(z, jr), E(q, Yr), E(q, bi)), ae.svgFilters === !0 && (E(z, Ur), E(q, Yr), E(q, bi)), ae.mathMl === !0 && (E(z, Gr), E(q, Zo), E(q, bi))), f.ADD_TAGS && (z === ci && (z = ue(z)), E(z, f.ADD_TAGS, j)), f.ADD_ATTR && (q === eo && (q = ue(q)), E(q, f.ADD_ATTR, j)), f.ADD_URI_SAFE_ATTR && E(Fr, f.ADD_URI_SAFE_ATTR, j), f.FORBID_CONTENTS && (le === ao && (le = ue(le)), E(le, f.FORBID_CONTENTS, j)), Er && (z["#text"] = !0), jt && E(z, ["html", "head", "body"]), z.table && (E(z, ["tbody"]), delete Me.tbody), Q && Q(f), he = f);
  }, fo = E({}, ["mi", "mo", "mn", "ms", "mtext"]), po = E({}, ["foreignobject", "desc", "title", "annotation-xml"]), rc = E({}, ["title", "style", "font", "a", "script"]), pi = E({}, jr);
  E(pi, Ur), E(pi, Td);
  const Ir = E({}, Gr);
  E(Ir, vd);
  const nc = function(f) {
    let m = L(f);
    (!m || !m.tagName) && (m = {
      namespaceURI: ce,
      tagName: "template"
    });
    const b = Ai(f.tagName), M = Ai(m.tagName);
    return Or[f.namespaceURI] ? f.namespaceURI === di ? m.namespaceURI === St ? b === "svg" : m.namespaceURI === fi ? b === "svg" && (M === "annotation-xml" || fo[M]) : !!pi[b] : f.namespaceURI === fi ? m.namespaceURI === St ? b === "math" : m.namespaceURI === di ? b === "math" && po[M] : !!Ir[b] : f.namespaceURI === St ? m.namespaceURI === di && !po[M] || m.namespaceURI === fi && !fo[M] ? !1 : !Ir[b] && (rc[b] || !pi[b]) : !!(Ut === "application/xhtml+xml" && Or[f.namespaceURI]) : !1;
  }, Gt = function(f) {
    Ie(e.removed, {
      element: f
    });
    try {
      f.parentNode.removeChild(f);
    } catch {
      f.remove();
    }
  }, Dr = function(f, m) {
    try {
      Ie(e.removed, {
        attribute: m.getAttributeNode(f),
        from: m
      });
    } catch {
      Ie(e.removed, {
        attribute: null,
        from: m
      });
    }
    if (m.removeAttribute(f), f === "is" && !q[f])
      if (se || hi)
        try {
          Gt(m);
        } catch {
        }
      else
        try {
          m.setAttribute(f, "");
        } catch {
        }
  }, go = function(f) {
    let m, b;
    if (Ar)
      f = "<remove></remove>" + f;
    else {
      const at = yd(f, /^[\r\n\t ]+/);
      b = at && at[0];
    }
    Ut === "application/xhtml+xml" && ce === St && (f = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + f + "</body></html>");
    const M = y ? y.createHTML(f) : f;
    if (ce === St)
      try {
        m = new u().parseFromString(M, Ut);
      } catch {
      }
    if (!m || !m.documentElement) {
      m = N.createDocument(ce, "template", null);
      try {
        m.documentElement.innerHTML = Mr ? F : M;
      } catch {
      }
    }
    const U = m.body || m.documentElement;
    return f && b && U.insertBefore(r.createTextNode(b), U.childNodes[0] || null), ce === St ? O.call(m, jt ? "html" : "body")[0] : jt ? m.documentElement : U;
  }, mo = function(f) {
    return H.call(
      f.ownerDocument || f,
      f,
      // eslint-disable-next-line no-bitwise
      l.SHOW_ELEMENT | l.SHOW_COMMENT | l.SHOW_TEXT,
      null,
      !1
    );
  }, oc = function(f) {
    return f instanceof h && (typeof f.nodeName != "string" || typeof f.textContent != "string" || typeof f.removeChild != "function" || !(f.attributes instanceof c) || typeof f.removeAttribute != "function" || typeof f.setAttribute != "function" || typeof f.namespaceURI != "string" || typeof f.insertBefore != "function" || typeof f.hasChildNodes != "function");
  }, gi = function(f) {
    return typeof s == "object" ? f instanceof s : f && typeof f == "object" && typeof f.nodeType == "number" && typeof f.nodeName == "string";
  }, kt = function(f, m, b) {
    st[f] && _d(st[f], (M) => {
      M.call(e, m, b, he);
    });
  }, _o = function(f) {
    let m;
    if (kt("beforeSanitizeElements", f, null), oc(f))
      return Gt(f), !0;
    const b = j(f.nodeName);
    if (kt("uponSanitizeElement", f, {
      tagName: b,
      allowedTags: z
    }), f.hasChildNodes() && !gi(f.firstElementChild) && (!gi(f.content) || !gi(f.content.firstElementChild)) && nt(/<[/\w]/g, f.innerHTML) && nt(/<[/\w]/g, f.textContent))
      return Gt(f), !0;
    if (!z[b] || Me[b]) {
      if (!Me[b] && Co(b) && (R.tagNameCheck instanceof RegExp && nt(R.tagNameCheck, b) || R.tagNameCheck instanceof Function && R.tagNameCheck(b)))
        return !1;
      if (Er && !le[b]) {
        const M = L(f) || f.parentNode, U = w(f) || f.childNodes;
        if (U && M) {
          const at = U.length;
          for (let D = at - 1; D >= 0; --D)
            M.insertBefore(_(U[D], !0), T(f));
        }
      }
      return Gt(f), !0;
    }
    return f instanceof a && !nc(f) || (b === "noscript" || b === "noembed") && nt(/<\/no(script|embed)/i, f.innerHTML) ? (Gt(f), !0) : (oe && f.nodeType === 3 && (m = f.textContent, m = dt(m, ft, " "), m = dt(m, oi, " "), m = dt(m, qt, " "), f.textContent !== m && (Ie(e.removed, {
      element: f.cloneNode()
    }), f.textContent = m)), kt("afterSanitizeElements", f, null), !1);
  }, yo = function(f, m, b) {
    if (oo && (m === "id" || m === "name") && (b in r || b in ic))
      return !1;
    if (!(Br && !wr[m] && nt(si, m))) {
      if (!(io && nt(ai, m))) {
        if (!q[m] || wr[m]) {
          if (
            // First condition does a very basic check if a) it's basically a valid custom element tagname AND
            // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
            // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
            !(Co(f) && (R.tagNameCheck instanceof RegExp && nt(R.tagNameCheck, f) || R.tagNameCheck instanceof Function && R.tagNameCheck(f)) && (R.attributeNameCheck instanceof RegExp && nt(R.attributeNameCheck, m) || R.attributeNameCheck instanceof Function && R.attributeNameCheck(m)) || // Alternative, second condition checks if it's an `is`-attribute, AND
            // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
            m === "is" && R.allowCustomizedBuiltInElements && (R.tagNameCheck instanceof RegExp && nt(R.tagNameCheck, b) || R.tagNameCheck instanceof Function && R.tagNameCheck(b)))
          )
            return !1;
        } else if (!Fr[m]) {
          if (!nt(rt, dt(b, Fe, ""))) {
            if (!((m === "src" || m === "xlink:href" || m === "href") && f !== "script" && Cd(b, "data:") === 0 && lo[f])) {
              if (!(ro && !nt(li, dt(b, Fe, "")))) {
                if (b)
                  return !1;
              }
            }
          }
        }
      }
    }
    return !0;
  }, Co = function(f) {
    return f.indexOf("-") > 0;
  }, bo = function(f) {
    let m, b, M, U;
    kt("beforeSanitizeAttributes", f, null);
    const {
      attributes: at
    } = f;
    if (!at)
      return;
    const D = {
      attrName: "",
      attrValue: "",
      keepAttr: !0,
      allowedAttributes: q
    };
    for (U = at.length; U--; ) {
      m = at[U];
      const {
        name: Ct,
        namespaceURI: Nr
      } = m;
      if (b = Ct === "value" ? m.value : bd(m.value), M = j(Ct), D.attrName = M, D.attrValue = b, D.keepAttr = !0, D.forceKeepAttr = void 0, kt("uponSanitizeAttribute", f, D), b = D.attrValue, D.forceKeepAttr || (Dr(Ct, f), !D.keepAttr))
        continue;
      if (!no && nt(/\/>/i, b)) {
        Dr(Ct, f);
        continue;
      }
      oe && (b = dt(b, ft, " "), b = dt(b, oi, " "), b = dt(b, qt, " "));
      const xo = j(f.nodeName);
      if (yo(xo, M, b)) {
        if (so && (M === "id" || M === "name") && (Dr(Ct, f), b = Jl + b), y && typeof g == "object" && typeof g.getAttributeType == "function" && !Nr)
          switch (g.getAttributeType(xo, M)) {
            case "TrustedHTML":
              b = y.createHTML(b);
              break;
            case "TrustedScriptURL":
              b = y.createScriptURL(b);
              break;
          }
        try {
          Nr ? f.setAttributeNS(Nr, Ct, b) : f.setAttribute(Ct, b), Yo(e.removed);
        } catch {
        }
      }
    }
    kt("afterSanitizeAttributes", f, null);
  }, sc = function v(f) {
    let m;
    const b = mo(f);
    for (kt("beforeSanitizeShadowDOM", f, null); m = b.nextNode(); )
      kt("uponSanitizeShadowNode", m, null), !_o(m) && (m.content instanceof n && v(m.content), bo(m));
    kt("afterSanitizeShadowDOM", f, null);
  };
  return e.sanitize = function(v) {
    let f = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, m, b, M, U;
    if (Mr = !v, Mr && (v = "<!-->"), typeof v != "string" && !gi(v)) {
      if (typeof v.toString != "function")
        throw qr("toString is not a function");
      if (v = v.toString(), typeof v != "string")
        throw qr("dirty is not a string, aborting");
    }
    if (!e.isSupported)
      return v;
    if (Lr || $r(f), e.removed = [], typeof v == "string" && (Oe = !1), Oe) {
      if (v.nodeName) {
        const Ct = j(v.nodeName);
        if (!z[Ct] || Me[Ct])
          throw qr("root node is forbidden and cannot be sanitized in-place");
      }
    } else if (v instanceof s)
      m = go("<!---->"), b = m.ownerDocument.importNode(v, !0), b.nodeType === 1 && b.nodeName === "BODY" || b.nodeName === "HTML" ? m = b : m.appendChild(b);
    else {
      if (!se && !oe && !jt && // eslint-disable-next-line unicorn/prefer-includes
      v.indexOf("<") === -1)
        return y && ui ? y.createHTML(v) : v;
      if (m = go(v), !m)
        return se ? null : ui ? F : "";
    }
    m && Ar && Gt(m.firstChild);
    const at = mo(Oe ? v : m);
    for (; M = at.nextNode(); )
      _o(M) || (M.content instanceof n && sc(M.content), bo(M));
    if (Oe)
      return v;
    if (se) {
      if (hi)
        for (U = Y.call(m.ownerDocument); m.firstChild; )
          U.appendChild(m.firstChild);
      else
        U = m;
      return (q.shadowroot || q.shadowrootmod) && (U = kr.call(i, U, !0)), U;
    }
    let D = jt ? m.outerHTML : m.innerHTML;
    return jt && z["!doctype"] && m.ownerDocument && m.ownerDocument.doctype && m.ownerDocument.doctype.name && nt(xa, m.ownerDocument.doctype.name) && (D = "<!DOCTYPE " + m.ownerDocument.doctype.name + `>
` + D), oe && (D = dt(D, ft, " "), D = dt(D, oi, " "), D = dt(D, qt, " ")), y && ui ? y.createHTML(D) : D;
  }, e.setConfig = function(v) {
    $r(v), Lr = !0;
  }, e.clearConfig = function() {
    he = null, Lr = !1;
  }, e.isValidAttribute = function(v, f, m) {
    he || $r({});
    const b = j(v), M = j(f);
    return yo(b, M, m);
  }, e.addHook = function(v, f) {
    typeof f == "function" && (st[v] = st[v] || [], Ie(st[v], f));
  }, e.removeHook = function(v) {
    if (st[v])
      return Yo(st[v]);
  }, e.removeHooks = function(v) {
    st[v] && (st[v] = []);
  }, e.removeAllHooks = function() {
    st = {};
  }, e;
}
var Xi = Ta();
const dr = /<br\s*\/?>/gi, Od = (t) => t ? Sa(t).replace(/\\n/g, "#br#").split("#br#") : [""], va = (t) => Xi.sanitize(t), Qo = (t, e) => {
  var i;
  if (((i = e.flowchart) == null ? void 0 : i.htmlLabels) !== !1) {
    const r = e.securityLevel;
    r === "antiscript" || r === "strict" ? t = va(t) : r !== "loose" && (t = Sa(t), t = t.replace(/</g, "&lt;").replace(/>/g, "&gt;"), t = t.replace(/=/g, "&equals;"), t = Nd(t));
  }
  return t;
}, Xe = (t, e) => t && (e.dompurifyConfig ? t = Xi.sanitize(Qo(t, e), e.dompurifyConfig).toString() : t = Xi.sanitize(Qo(t, e), {
  FORBID_TAGS: ["style"]
}).toString(), t), $d = (t, e) => typeof t == "string" ? Xe(t, e) : t.flat().map((i) => Xe(i, e)), Id = (t) => dr.test(t), Dd = (t) => t.split(dr), Nd = (t) => t.replace(/#br#/g, "<br/>"), Sa = (t) => t.replace(dr, "#br#"), Rd = (t) => {
  let e = "";
  return t && (e = window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.search, e = e.replaceAll(/\(/g, "\\("), e = e.replaceAll(/\)/g, "\\)")), e;
}, ka = (t) => !(t === !1 || ["false", "null", "0"].includes(String(t).trim().toLowerCase())), zd = function(t) {
  let e = t;
  if (t.split("~").length - 1 >= 2) {
    let i = e;
    do
      e = i, i = e.replace(/~([^\s,:;]+)~/, "<$1>");
    while (i != e);
    return zd(i);
  } else
    return e;
}, Pn = {
  getRows: Od,
  sanitizeText: Xe,
  sanitizeTextOrArray: $d,
  hasBreaks: Id,
  splitBreaks: Dd,
  lineBreakRegex: dr,
  removeScript: va,
  getUrl: Rd,
  evaluate: ka
}, Ei = {
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
        return Ei.hue2rgb(o, n, t + 1 / 3) * 255;
      case "g":
        return Ei.hue2rgb(o, n, t) * 255;
      case "b":
        return Ei.hue2rgb(o, n, t - 1 / 3) * 255;
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
}, Pd = Ei, Wd = {
  /* API */
  clamp: (t, e, i) => e > i ? Math.min(e, Math.max(i, t)) : Math.min(i, Math.max(e, t)),
  round: (t) => Math.round(t * 1e10) / 1e10
}, Hd = Wd, qd = {
  /* API */
  dec2hex: (t) => {
    const e = Math.round(t).toString(16);
    return e.length > 1 ? e : `0${e}`;
  }
}, jd = qd, Ud = {
  channel: Pd,
  lang: Hd,
  unit: jd
}, A = Ud, Ot = {};
for (let t = 0; t <= 255; t++)
  Ot[t] = A.unit.dec2hex(t);
const V = {
  ALL: 0,
  RGB: 1,
  HSL: 2
};
class Gd {
  constructor() {
    this.type = V.ALL;
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
    this.type = V.ALL;
  }
  is(e) {
    return this.type === e;
  }
}
const Yd = Gd;
class Vd {
  /* CONSTRUCTOR */
  constructor(e, i) {
    this.color = i, this.changed = !1, this.data = e, this.type = new Yd();
  }
  /* API */
  set(e, i) {
    return this.color = i, this.changed = !1, this.data = e, this.type.type = V.ALL, this;
  }
  /* HELPERS */
  _ensureHSL() {
    const e = this.data, { h: i, s: r, l: n } = e;
    i === void 0 && (e.h = A.channel.rgb2hsl(e, "h")), r === void 0 && (e.s = A.channel.rgb2hsl(e, "s")), n === void 0 && (e.l = A.channel.rgb2hsl(e, "l"));
  }
  _ensureRGB() {
    const e = this.data, { r: i, g: r, b: n } = e;
    i === void 0 && (e.r = A.channel.hsl2rgb(e, "r")), r === void 0 && (e.g = A.channel.hsl2rgb(e, "g")), n === void 0 && (e.b = A.channel.hsl2rgb(e, "b"));
  }
  /* GETTERS */
  get r() {
    const e = this.data, i = e.r;
    return !this.type.is(V.HSL) && i !== void 0 ? i : (this._ensureHSL(), A.channel.hsl2rgb(e, "r"));
  }
  get g() {
    const e = this.data, i = e.g;
    return !this.type.is(V.HSL) && i !== void 0 ? i : (this._ensureHSL(), A.channel.hsl2rgb(e, "g"));
  }
  get b() {
    const e = this.data, i = e.b;
    return !this.type.is(V.HSL) && i !== void 0 ? i : (this._ensureHSL(), A.channel.hsl2rgb(e, "b"));
  }
  get h() {
    const e = this.data, i = e.h;
    return !this.type.is(V.RGB) && i !== void 0 ? i : (this._ensureRGB(), A.channel.rgb2hsl(e, "h"));
  }
  get s() {
    const e = this.data, i = e.s;
    return !this.type.is(V.RGB) && i !== void 0 ? i : (this._ensureRGB(), A.channel.rgb2hsl(e, "s"));
  }
  get l() {
    const e = this.data, i = e.l;
    return !this.type.is(V.RGB) && i !== void 0 ? i : (this._ensureRGB(), A.channel.rgb2hsl(e, "l"));
  }
  get a() {
    return this.data.a;
  }
  /* SETTERS */
  set r(e) {
    this.type.set(V.RGB), this.changed = !0, this.data.r = e;
  }
  set g(e) {
    this.type.set(V.RGB), this.changed = !0, this.data.g = e;
  }
  set b(e) {
    this.type.set(V.RGB), this.changed = !0, this.data.b = e;
  }
  set h(e) {
    this.type.set(V.HSL), this.changed = !0, this.data.h = e;
  }
  set s(e) {
    this.type.set(V.HSL), this.changed = !0, this.data.s = e;
  }
  set l(e) {
    this.type.set(V.HSL), this.changed = !0, this.data.l = e;
  }
  set a(e) {
    this.changed = !0, this.data.a = e;
  }
}
const Xd = Vd, Kd = new Xd({ r: 0, g: 0, b: 0, a: 0 }, "transparent"), pr = Kd, wa = {
  /* VARIABLES */
  re: /^#((?:[a-f0-9]{2}){2,4}|[a-f0-9]{3})$/i,
  /* API */
  parse: (t) => {
    if (t.charCodeAt(0) !== 35)
      return;
    const e = t.match(wa.re);
    if (!e)
      return;
    const i = e[1], r = parseInt(i, 16), n = i.length, o = n % 4 === 0, s = n > 4, a = s ? 1 : 17, l = s ? 8 : 4, c = o ? 0 : -1, h = s ? 255 : 15;
    return pr.set({
      r: (r >> l * (c + 3) & h) * a,
      g: (r >> l * (c + 2) & h) * a,
      b: (r >> l * (c + 1) & h) * a,
      a: o ? (r & h) * a / 255 : 1
    }, t);
  },
  stringify: (t) => {
    const { r: e, g: i, b: r, a: n } = t;
    return n < 1 ? `#${Ot[Math.round(e)]}${Ot[Math.round(i)]}${Ot[Math.round(r)]}${Ot[Math.round(n * 255)]}` : `#${Ot[Math.round(e)]}${Ot[Math.round(i)]}${Ot[Math.round(r)]}`;
  }
}, We = wa, Fi = {
  /* VARIABLES */
  re: /^hsla?\(\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e-?\d+)?(?:deg|grad|rad|turn)?)\s*?(?:,|\s)\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e-?\d+)?%)\s*?(?:,|\s)\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e-?\d+)?%)(?:\s*?(?:,|\/)\s*?\+?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e-?\d+)?(%)?))?\s*?\)$/i,
  hueRe: /^(.+?)(deg|grad|rad|turn)$/i,
  /* HELPERS */
  _hue2deg: (t) => {
    const e = t.match(Fi.hueRe);
    if (e) {
      const [, i, r] = e;
      switch (r) {
        case "grad":
          return A.channel.clamp.h(parseFloat(i) * 0.9);
        case "rad":
          return A.channel.clamp.h(parseFloat(i) * 180 / Math.PI);
        case "turn":
          return A.channel.clamp.h(parseFloat(i) * 360);
      }
    }
    return A.channel.clamp.h(parseFloat(t));
  },
  /* API */
  parse: (t) => {
    const e = t.charCodeAt(0);
    if (e !== 104 && e !== 72)
      return;
    const i = t.match(Fi.re);
    if (!i)
      return;
    const [, r, n, o, s, a] = i;
    return pr.set({
      h: Fi._hue2deg(r),
      s: A.channel.clamp.s(parseFloat(n)),
      l: A.channel.clamp.l(parseFloat(o)),
      a: s ? A.channel.clamp.a(a ? parseFloat(s) / 100 : parseFloat(s)) : 1
    }, t);
  },
  stringify: (t) => {
    const { h: e, s: i, l: r, a: n } = t;
    return n < 1 ? `hsla(${A.lang.round(e)}, ${A.lang.round(i)}%, ${A.lang.round(r)}%, ${n})` : `hsl(${A.lang.round(e)}, ${A.lang.round(i)}%, ${A.lang.round(r)}%)`;
  }
}, xi = Fi, Mi = {
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
    const e = Mi.colors[t];
    if (e)
      return We.parse(e);
  },
  stringify: (t) => {
    const e = We.stringify(t);
    for (const i in Mi.colors)
      if (Mi.colors[i] === e)
        return i;
  }
}, ts = Mi, Ba = {
  /* VARIABLES */
  re: /^rgba?\(\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e\d+)?(%?))\s*?(?:,|\s)\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e\d+)?(%?))\s*?(?:,|\s)\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e\d+)?(%?))(?:\s*?(?:,|\/)\s*?\+?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e\d+)?(%?)))?\s*?\)$/i,
  /* API */
  parse: (t) => {
    const e = t.charCodeAt(0);
    if (e !== 114 && e !== 82)
      return;
    const i = t.match(Ba.re);
    if (!i)
      return;
    const [, r, n, o, s, a, l, c, h] = i;
    return pr.set({
      r: A.channel.clamp.r(n ? parseFloat(r) * 2.55 : parseFloat(r)),
      g: A.channel.clamp.g(s ? parseFloat(o) * 2.55 : parseFloat(o)),
      b: A.channel.clamp.b(l ? parseFloat(a) * 2.55 : parseFloat(a)),
      a: c ? A.channel.clamp.a(h ? parseFloat(c) / 100 : parseFloat(c)) : 1
    }, t);
  },
  stringify: (t) => {
    const { r: e, g: i, b: r, a: n } = t;
    return n < 1 ? `rgba(${A.lang.round(e)}, ${A.lang.round(i)}, ${A.lang.round(r)}, ${A.lang.round(n)})` : `rgb(${A.lang.round(e)}, ${A.lang.round(i)}, ${A.lang.round(r)})`;
  }
}, Ti = Ba, Zd = {
  /* VARIABLES */
  format: {
    keyword: ts,
    hex: We,
    rgb: Ti,
    rgba: Ti,
    hsl: xi,
    hsla: xi
  },
  /* API */
  parse: (t) => {
    if (typeof t != "string")
      return t;
    const e = We.parse(t) || Ti.parse(t) || xi.parse(t) || ts.parse(t);
    if (e)
      return e;
    throw new Error(`Unsupported color format: "${t}"`);
  },
  stringify: (t) => !t.changed && t.color ? t.color : t.type.is(V.HSL) || t.data.r === void 0 ? xi.stringify(t) : t.a < 1 || !Number.isInteger(t.r) || !Number.isInteger(t.g) || !Number.isInteger(t.b) ? Ti.stringify(t) : We.stringify(t)
}, Ft = Zd, Jd = (t, e) => {
  const i = Ft.parse(t);
  for (const r in e)
    i[r] = A.channel.clamp[r](e[r]);
  return Ft.stringify(i);
}, La = Jd, Qd = (t, e, i = 0, r = 1) => {
  if (typeof t != "number")
    return La(t, { a: e });
  const n = pr.set({
    r: A.channel.clamp.r(t),
    g: A.channel.clamp.g(e),
    b: A.channel.clamp.b(i),
    a: A.channel.clamp.a(r)
  });
  return Ft.stringify(n);
}, He = Qd, tp = (t, e, i) => {
  const r = Ft.parse(t), n = r[e], o = A.channel.clamp[e](n + i);
  return n !== o && (r[e] = o), Ft.stringify(r);
}, Aa = tp, ep = (t, e) => Aa(t, "l", e), k = ep, ip = (t, e) => Aa(t, "l", -e), B = ip, rp = (t, e) => {
  const i = Ft.parse(t), r = {};
  for (const n in e)
    e[n] && (r[n] = i[n] + e[n]);
  return La(t, r);
}, p = rp, np = (t, e, i = 50) => {
  const { r, g: n, b: o, a: s } = Ft.parse(t), { r: a, g: l, b: c, a: h } = Ft.parse(e), u = i / 100, g = u * 2 - 1, d = s - h, T = ((g * d === -1 ? g : (g + d) / (1 + g * d)) + 1) / 2, w = 1 - T, L = r * T + a * w, y = n * T + l * w, F = o * T + c * w, N = s * u + h * (1 - u);
  return He(L, y, F, N);
}, op = np, sp = (t, e = 100) => {
  const i = Ft.parse(t);
  return i.r = 255 - i.r, i.g = 255 - i.g, i.b = 255 - i.b, op(i, t, e);
}, C = sp, J = (t, e) => e ? p(t, { s: -40, l: 10 }) : p(t, { s: -40, l: -10 }), gr = "#ffffff", mr = "#f2f2f2";
let ap = class {
  constructor() {
    this.background = "#f4f4f4", this.primaryColor = "#fff4dd", this.noteBkgColor = "#fff5ad", this.noteTextColor = "#333", this.THEME_COLOR_LIMIT = 12, this.fontFamily = '"trebuchet ms", verdana, arial, sans-serif', this.fontSize = "16px";
  }
  updateColors() {
    if (this.primaryTextColor = this.primaryTextColor || (this.darkMode ? "#eee" : "#333"), this.secondaryColor = this.secondaryColor || p(this.primaryColor, { h: -120 }), this.tertiaryColor = this.tertiaryColor || p(this.primaryColor, { h: 180, l: 5 }), this.primaryBorderColor = this.primaryBorderColor || J(this.primaryColor, this.darkMode), this.secondaryBorderColor = this.secondaryBorderColor || J(this.secondaryColor, this.darkMode), this.tertiaryBorderColor = this.tertiaryBorderColor || J(this.tertiaryColor, this.darkMode), this.noteBorderColor = this.noteBorderColor || J(this.noteBkgColor, this.darkMode), this.noteBkgColor = this.noteBkgColor || "#fff5ad", this.noteTextColor = this.noteTextColor || "#333", this.secondaryTextColor = this.secondaryTextColor || C(this.secondaryColor), this.tertiaryTextColor = this.tertiaryTextColor || C(this.tertiaryColor), this.lineColor = this.lineColor || C(this.background), this.arrowheadColor = this.arrowheadColor || C(this.background), this.textColor = this.textColor || this.primaryTextColor, this.border2 = this.border2 || this.tertiaryBorderColor, this.nodeBkg = this.nodeBkg || this.primaryColor, this.mainBkg = this.mainBkg || this.primaryColor, this.nodeBorder = this.nodeBorder || this.primaryBorderColor, this.clusterBkg = this.clusterBkg || this.tertiaryColor, this.clusterBorder = this.clusterBorder || this.tertiaryBorderColor, this.defaultLinkColor = this.defaultLinkColor || this.lineColor, this.titleColor = this.titleColor || this.tertiaryTextColor, this.edgeLabelBackground = this.edgeLabelBackground || (this.darkMode ? B(this.secondaryColor, 30) : this.secondaryColor), this.nodeTextColor = this.nodeTextColor || this.primaryTextColor, this.actorBorder = this.actorBorder || this.primaryBorderColor, this.actorBkg = this.actorBkg || this.mainBkg, this.actorTextColor = this.actorTextColor || this.primaryTextColor, this.actorLineColor = this.actorLineColor || "grey", this.labelBoxBkgColor = this.labelBoxBkgColor || this.actorBkg, this.signalColor = this.signalColor || this.textColor, this.signalTextColor = this.signalTextColor || this.textColor, this.labelBoxBorderColor = this.labelBoxBorderColor || this.actorBorder, this.labelTextColor = this.labelTextColor || this.actorTextColor, this.loopTextColor = this.loopTextColor || this.actorTextColor, this.activationBorderColor = this.activationBorderColor || B(this.secondaryColor, 10), this.activationBkgColor = this.activationBkgColor || this.secondaryColor, this.sequenceNumberColor = this.sequenceNumberColor || C(this.lineColor), this.sectionBkgColor = this.sectionBkgColor || this.tertiaryColor, this.altSectionBkgColor = this.altSectionBkgColor || "white", this.sectionBkgColor = this.sectionBkgColor || this.secondaryColor, this.sectionBkgColor2 = this.sectionBkgColor2 || this.primaryColor, this.excludeBkgColor = this.excludeBkgColor || "#eeeeee", this.taskBorderColor = this.taskBorderColor || this.primaryBorderColor, this.taskBkgColor = this.taskBkgColor || this.primaryColor, this.activeTaskBorderColor = this.activeTaskBorderColor || this.primaryColor, this.activeTaskBkgColor = this.activeTaskBkgColor || k(this.primaryColor, 23), this.gridColor = this.gridColor || "lightgrey", this.doneTaskBkgColor = this.doneTaskBkgColor || "lightgrey", this.doneTaskBorderColor = this.doneTaskBorderColor || "grey", this.critBorderColor = this.critBorderColor || "#ff8888", this.critBkgColor = this.critBkgColor || "red", this.todayLineColor = this.todayLineColor || "red", this.taskTextColor = this.taskTextColor || this.textColor, this.taskTextOutsideColor = this.taskTextOutsideColor || this.textColor, this.taskTextLightColor = this.taskTextLightColor || this.textColor, this.taskTextColor = this.taskTextColor || this.primaryTextColor, this.taskTextDarkColor = this.taskTextDarkColor || this.textColor, this.taskTextClickableColor = this.taskTextClickableColor || "#003163", this.personBorder = this.personBorder || this.primaryBorderColor, this.personBkg = this.personBkg || this.mainBkg, this.transitionColor = this.transitionColor || this.lineColor, this.transitionLabelColor = this.transitionLabelColor || this.textColor, this.stateLabelColor = this.stateLabelColor || this.stateBkg || this.primaryTextColor, this.stateBkg = this.stateBkg || this.mainBkg, this.labelBackgroundColor = this.labelBackgroundColor || this.stateBkg, this.compositeBackground = this.compositeBackground || this.background || this.tertiaryColor, this.altBackground = this.altBackground || this.tertiaryColor, this.compositeTitleBackground = this.compositeTitleBackground || this.mainBkg, this.compositeBorder = this.compositeBorder || this.nodeBorder, this.innerEndBackground = this.nodeBorder, this.errorBkgColor = this.errorBkgColor || this.tertiaryColor, this.errorTextColor = this.errorTextColor || this.tertiaryTextColor, this.transitionColor = this.transitionColor || this.lineColor, this.specialStateColor = this.lineColor, this.cScale0 = this.cScale0 || this.primaryColor, this.cScale1 = this.cScale1 || this.secondaryColor, this.cScale2 = this.cScale2 || this.tertiaryColor, this.cScale3 = this.cScale3 || p(this.primaryColor, { h: 30 }), this.cScale4 = this.cScale4 || p(this.primaryColor, { h: 60 }), this.cScale5 = this.cScale5 || p(this.primaryColor, { h: 90 }), this.cScale6 = this.cScale6 || p(this.primaryColor, { h: 120 }), this.cScale7 = this.cScale7 || p(this.primaryColor, { h: 150 }), this.cScale8 = this.cScale8 || p(this.primaryColor, { h: 210, l: 150 }), this.cScale9 = this.cScale9 || p(this.primaryColor, { h: 270 }), this.cScale10 = this.cScale10 || p(this.primaryColor, { h: 300 }), this.cScale11 = this.cScale11 || p(this.primaryColor, { h: 330 }), this.darkMode)
      for (let i = 0; i < this.THEME_COLOR_LIMIT; i++)
        this["cScale" + i] = B(this["cScale" + i], 75);
    else
      for (let i = 0; i < this.THEME_COLOR_LIMIT; i++)
        this["cScale" + i] = B(this["cScale" + i], 25);
    for (let i = 0; i < this.THEME_COLOR_LIMIT; i++)
      this["cScaleInv" + i] = this["cScaleInv" + i] || C(this["cScale" + i]);
    for (let i = 0; i < this.THEME_COLOR_LIMIT; i++)
      this.darkMode ? this["cScalePeer" + i] = this["cScalePeer" + i] || k(this["cScale" + i], 10) : this["cScalePeer" + i] = this["cScalePeer" + i] || B(this["cScale" + i], 10);
    this.scaleLabelColor = this.scaleLabelColor || this.labelTextColor;
    for (let i = 0; i < this.THEME_COLOR_LIMIT; i++)
      this["cScaleLabel" + i] = this["cScaleLabel" + i] || this.scaleLabelColor;
    const e = this.darkMode ? -4 : -1;
    for (let i = 0; i < 5; i++)
      this["surface" + i] = this["surface" + i] || p(this.mainBkg, { h: 180, s: -15, l: e * (5 + i * 3) }), this["surfacePeer" + i] = this["surfacePeer" + i] || p(this.mainBkg, { h: 180, s: -15, l: e * (8 + i * 3) });
    this.classText = this.classText || this.textColor, this.fillType0 = this.fillType0 || this.primaryColor, this.fillType1 = this.fillType1 || this.secondaryColor, this.fillType2 = this.fillType2 || p(this.primaryColor, { h: 64 }), this.fillType3 = this.fillType3 || p(this.secondaryColor, { h: 64 }), this.fillType4 = this.fillType4 || p(this.primaryColor, { h: -64 }), this.fillType5 = this.fillType5 || p(this.secondaryColor, { h: -64 }), this.fillType6 = this.fillType6 || p(this.primaryColor, { h: 128 }), this.fillType7 = this.fillType7 || p(this.secondaryColor, { h: 128 }), this.pie1 = this.pie1 || this.primaryColor, this.pie2 = this.pie2 || this.secondaryColor, this.pie3 = this.pie3 || this.tertiaryColor, this.pie4 = this.pie4 || p(this.primaryColor, { l: -10 }), this.pie5 = this.pie5 || p(this.secondaryColor, { l: -10 }), this.pie6 = this.pie6 || p(this.tertiaryColor, { l: -10 }), this.pie7 = this.pie7 || p(this.primaryColor, { h: 60, l: -10 }), this.pie8 = this.pie8 || p(this.primaryColor, { h: -60, l: -10 }), this.pie9 = this.pie9 || p(this.primaryColor, { h: 120, l: 0 }), this.pie10 = this.pie10 || p(this.primaryColor, { h: 60, l: -20 }), this.pie11 = this.pie11 || p(this.primaryColor, { h: -60, l: -20 }), this.pie12 = this.pie12 || p(this.primaryColor, { h: 120, l: -10 }), this.pieTitleTextSize = this.pieTitleTextSize || "25px", this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor, this.pieSectionTextSize = this.pieSectionTextSize || "17px", this.pieSectionTextColor = this.pieSectionTextColor || this.textColor, this.pieLegendTextSize = this.pieLegendTextSize || "17px", this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor, this.pieStrokeColor = this.pieStrokeColor || "black", this.pieStrokeWidth = this.pieStrokeWidth || "2px", this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || "2px", this.pieOuterStrokeColor = this.pieOuterStrokeColor || "black", this.pieOpacity = this.pieOpacity || "0.7", this.requirementBackground = this.requirementBackground || this.primaryColor, this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor, this.requirementBorderSize = this.requirementBorderSize || "1", this.requirementTextColor = this.requirementTextColor || this.primaryTextColor, this.relationColor = this.relationColor || this.lineColor, this.relationLabelBackground = this.relationLabelBackground || (this.darkMode ? B(this.secondaryColor, 30) : this.secondaryColor), this.relationLabelColor = this.relationLabelColor || this.actorTextColor, this.git0 = this.git0 || this.primaryColor, this.git1 = this.git1 || this.secondaryColor, this.git2 = this.git2 || this.tertiaryColor, this.git3 = this.git3 || p(this.primaryColor, { h: -30 }), this.git4 = this.git4 || p(this.primaryColor, { h: -60 }), this.git5 = this.git5 || p(this.primaryColor, { h: -90 }), this.git6 = this.git6 || p(this.primaryColor, { h: 60 }), this.git7 = this.git7 || p(this.primaryColor, { h: 120 }), this.darkMode ? (this.git0 = k(this.git0, 25), this.git1 = k(this.git1, 25), this.git2 = k(this.git2, 25), this.git3 = k(this.git3, 25), this.git4 = k(this.git4, 25), this.git5 = k(this.git5, 25), this.git6 = k(this.git6, 25), this.git7 = k(this.git7, 25)) : (this.git0 = B(this.git0, 25), this.git1 = B(this.git1, 25), this.git2 = B(this.git2, 25), this.git3 = B(this.git3, 25), this.git4 = B(this.git4, 25), this.git5 = B(this.git5, 25), this.git6 = B(this.git6, 25), this.git7 = B(this.git7, 25)), this.gitInv0 = this.gitInv0 || C(this.git0), this.gitInv1 = this.gitInv1 || C(this.git1), this.gitInv2 = this.gitInv2 || C(this.git2), this.gitInv3 = this.gitInv3 || C(this.git3), this.gitInv4 = this.gitInv4 || C(this.git4), this.gitInv5 = this.gitInv5 || C(this.git5), this.gitInv6 = this.gitInv6 || C(this.git6), this.gitInv7 = this.gitInv7 || C(this.git7), this.branchLabelColor = this.branchLabelColor || (this.darkMode ? "black" : this.labelTextColor), this.gitBranchLabel0 = this.gitBranchLabel0 || this.branchLabelColor, this.gitBranchLabel1 = this.gitBranchLabel1 || this.branchLabelColor, this.gitBranchLabel2 = this.gitBranchLabel2 || this.branchLabelColor, this.gitBranchLabel3 = this.gitBranchLabel3 || this.branchLabelColor, this.gitBranchLabel4 = this.gitBranchLabel4 || this.branchLabelColor, this.gitBranchLabel5 = this.gitBranchLabel5 || this.branchLabelColor, this.gitBranchLabel6 = this.gitBranchLabel6 || this.branchLabelColor, this.gitBranchLabel7 = this.gitBranchLabel7 || this.branchLabelColor, this.tagLabelColor = this.tagLabelColor || this.primaryTextColor, this.tagLabelBackground = this.tagLabelBackground || this.primaryColor, this.tagLabelBorder = this.tagBorder || this.primaryBorderColor, this.tagLabelFontSize = this.tagLabelFontSize || "10px", this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor, this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor, this.commitLabelFontSize = this.commitLabelFontSize || "10px", this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || gr, this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || mr;
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
const lp = (t) => {
  const e = new ap();
  return e.calculate(t), e;
};
let cp = class {
  constructor() {
    this.background = "#333", this.primaryColor = "#1f2020", this.secondaryColor = k(this.primaryColor, 16), this.tertiaryColor = p(this.primaryColor, { h: -160 }), this.primaryBorderColor = C(this.background), this.secondaryBorderColor = J(this.secondaryColor, this.darkMode), this.tertiaryBorderColor = J(this.tertiaryColor, this.darkMode), this.primaryTextColor = C(this.primaryColor), this.secondaryTextColor = C(this.secondaryColor), this.tertiaryTextColor = C(this.tertiaryColor), this.lineColor = C(this.background), this.textColor = C(this.background), this.mainBkg = "#1f2020", this.secondBkg = "calculated", this.mainContrastColor = "lightgrey", this.darkTextColor = k(C("#323D47"), 10), this.lineColor = "calculated", this.border1 = "#81B1DB", this.border2 = He(255, 255, 255, 0.25), this.arrowheadColor = "calculated", this.fontFamily = '"trebuchet ms", verdana, arial, sans-serif', this.fontSize = "16px", this.labelBackground = "#181818", this.textColor = "#ccc", this.THEME_COLOR_LIMIT = 12, this.nodeBkg = "calculated", this.nodeBorder = "calculated", this.clusterBkg = "calculated", this.clusterBorder = "calculated", this.defaultLinkColor = "calculated", this.titleColor = "#F9FFFE", this.edgeLabelBackground = "calculated", this.actorBorder = "calculated", this.actorBkg = "calculated", this.actorTextColor = "calculated", this.actorLineColor = "calculated", this.signalColor = "calculated", this.signalTextColor = "calculated", this.labelBoxBkgColor = "calculated", this.labelBoxBorderColor = "calculated", this.labelTextColor = "calculated", this.loopTextColor = "calculated", this.noteBorderColor = "calculated", this.noteBkgColor = "#fff5ad", this.noteTextColor = "calculated", this.activationBorderColor = "calculated", this.activationBkgColor = "calculated", this.sequenceNumberColor = "black", this.sectionBkgColor = B("#EAE8D9", 30), this.altSectionBkgColor = "calculated", this.sectionBkgColor2 = "#EAE8D9", this.excludeBkgColor = B(this.sectionBkgColor, 10), this.taskBorderColor = He(255, 255, 255, 70), this.taskBkgColor = "calculated", this.taskTextColor = "calculated", this.taskTextLightColor = "calculated", this.taskTextOutsideColor = "calculated", this.taskTextClickableColor = "#003163", this.activeTaskBorderColor = He(255, 255, 255, 50), this.activeTaskBkgColor = "#81B1DB", this.gridColor = "calculated", this.doneTaskBkgColor = "calculated", this.doneTaskBorderColor = "grey", this.critBorderColor = "#E83737", this.critBkgColor = "#E83737", this.taskTextDarkColor = "calculated", this.todayLineColor = "#DB5757", this.personBorder = this.primaryBorderColor, this.personBkg = this.mainBkg, this.labelColor = "calculated", this.errorBkgColor = "#a44141", this.errorTextColor = "#ddd";
  }
  updateColors() {
    this.secondBkg = k(this.mainBkg, 16), this.lineColor = this.mainContrastColor, this.arrowheadColor = this.mainContrastColor, this.nodeBkg = this.mainBkg, this.nodeBorder = this.border1, this.clusterBkg = this.secondBkg, this.clusterBorder = this.border2, this.defaultLinkColor = this.lineColor, this.edgeLabelBackground = k(this.labelBackground, 25), this.actorBorder = this.border1, this.actorBkg = this.mainBkg, this.actorTextColor = this.mainContrastColor, this.actorLineColor = this.mainContrastColor, this.signalColor = this.mainContrastColor, this.signalTextColor = this.mainContrastColor, this.labelBoxBkgColor = this.actorBkg, this.labelBoxBorderColor = this.actorBorder, this.labelTextColor = this.mainContrastColor, this.loopTextColor = this.mainContrastColor, this.noteBorderColor = this.secondaryBorderColor, this.noteBkgColor = this.secondBkg, this.noteTextColor = this.secondaryTextColor, this.activationBorderColor = this.border1, this.activationBkgColor = this.secondBkg, this.altSectionBkgColor = this.background, this.taskBkgColor = k(this.mainBkg, 23), this.taskTextColor = this.darkTextColor, this.taskTextLightColor = this.mainContrastColor, this.taskTextOutsideColor = this.taskTextLightColor, this.gridColor = this.mainContrastColor, this.doneTaskBkgColor = this.mainContrastColor, this.taskTextDarkColor = this.darkTextColor, this.transitionColor = this.transitionColor || this.lineColor, this.transitionLabelColor = this.transitionLabelColor || this.textColor, this.stateLabelColor = this.stateLabelColor || this.stateBkg || this.primaryTextColor, this.stateBkg = this.stateBkg || this.mainBkg, this.labelBackgroundColor = this.labelBackgroundColor || this.stateBkg, this.compositeBackground = this.compositeBackground || this.background || this.tertiaryColor, this.altBackground = this.altBackground || "#555", this.compositeTitleBackground = this.compositeTitleBackground || this.mainBkg, this.compositeBorder = this.compositeBorder || this.nodeBorder, this.innerEndBackground = this.primaryBorderColor, this.specialStateColor = "#f4f4f4", this.errorBkgColor = this.errorBkgColor || this.tertiaryColor, this.errorTextColor = this.errorTextColor || this.tertiaryTextColor, this.fillType0 = this.primaryColor, this.fillType1 = this.secondaryColor, this.fillType2 = p(this.primaryColor, { h: 64 }), this.fillType3 = p(this.secondaryColor, { h: 64 }), this.fillType4 = p(this.primaryColor, { h: -64 }), this.fillType5 = p(this.secondaryColor, { h: -64 }), this.fillType6 = p(this.primaryColor, { h: 128 }), this.fillType7 = p(this.secondaryColor, { h: 128 }), this.cScale1 = this.cScale1 || "#0b0000", this.cScale2 = this.cScale2 || "#4d1037", this.cScale3 = this.cScale3 || "#3f5258", this.cScale4 = this.cScale4 || "#4f2f1b", this.cScale5 = this.cScale5 || "#6e0a0a", this.cScale6 = this.cScale6 || "#3b0048", this.cScale7 = this.cScale7 || "#995a01", this.cScale8 = this.cScale8 || "#154706", this.cScale9 = this.cScale9 || "#161722", this.cScale10 = this.cScale10 || "#00296f", this.cScale11 = this.cScale11 || "#01629c", this.cScale12 = this.cScale12 || "#010029", this.cScale0 = this.cScale0 || this.primaryColor, this.cScale1 = this.cScale1 || this.secondaryColor, this.cScale2 = this.cScale2 || this.tertiaryColor, this.cScale3 = this.cScale3 || p(this.primaryColor, { h: 30 }), this.cScale4 = this.cScale4 || p(this.primaryColor, { h: 60 }), this.cScale5 = this.cScale5 || p(this.primaryColor, { h: 90 }), this.cScale6 = this.cScale6 || p(this.primaryColor, { h: 120 }), this.cScale7 = this.cScale7 || p(this.primaryColor, { h: 150 }), this.cScale8 = this.cScale8 || p(this.primaryColor, { h: 210 }), this.cScale9 = this.cScale9 || p(this.primaryColor, { h: 270 }), this.cScale10 = this.cScale10 || p(this.primaryColor, { h: 300 }), this.cScale11 = this.cScale11 || p(this.primaryColor, { h: 330 });
    for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
      this["cScaleInv" + e] = this["cScaleInv" + e] || C(this["cScale" + e]);
    for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
      this["cScalePeer" + e] = this["cScalePeer" + e] || k(this["cScale" + e], 10);
    for (let e = 0; e < 5; e++)
      this["surface" + e] = this["surface" + e] || p(this.mainBkg, { h: 30, s: -30, l: -(-10 + e * 4) }), this["surfacePeer" + e] = this["surfacePeer" + e] || p(this.mainBkg, { h: 30, s: -30, l: -(-7 + e * 4) });
    this.scaleLabelColor = this.scaleLabelColor || (this.darkMode ? "black" : this.labelTextColor);
    for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
      this["cScaleLabel" + e] = this["cScaleLabel" + e] || this.scaleLabelColor;
    for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
      this["pie" + e] = this["cScale" + e];
    this.pieTitleTextSize = this.pieTitleTextSize || "25px", this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor, this.pieSectionTextSize = this.pieSectionTextSize || "17px", this.pieSectionTextColor = this.pieSectionTextColor || this.textColor, this.pieLegendTextSize = this.pieLegendTextSize || "17px", this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor, this.pieStrokeColor = this.pieStrokeColor || "black", this.pieStrokeWidth = this.pieStrokeWidth || "2px", this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || "2px", this.pieOuterStrokeColor = this.pieOuterStrokeColor || "black", this.pieOpacity = this.pieOpacity || "0.7", this.classText = this.primaryTextColor, this.requirementBackground = this.requirementBackground || this.primaryColor, this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor, this.requirementBorderSize = this.requirementBorderSize || "1", this.requirementTextColor = this.requirementTextColor || this.primaryTextColor, this.relationColor = this.relationColor || this.lineColor, this.relationLabelBackground = this.relationLabelBackground || (this.darkMode ? B(this.secondaryColor, 30) : this.secondaryColor), this.relationLabelColor = this.relationLabelColor || this.actorTextColor, this.git0 = k(this.secondaryColor, 20), this.git1 = k(this.pie2 || this.secondaryColor, 20), this.git2 = k(this.pie3 || this.tertiaryColor, 20), this.git3 = k(this.pie4 || p(this.primaryColor, { h: -30 }), 20), this.git4 = k(this.pie5 || p(this.primaryColor, { h: -60 }), 20), this.git5 = k(this.pie6 || p(this.primaryColor, { h: -90 }), 10), this.git6 = k(this.pie7 || p(this.primaryColor, { h: 60 }), 10), this.git7 = k(this.pie8 || p(this.primaryColor, { h: 120 }), 20), this.gitInv0 = this.gitInv0 || C(this.git0), this.gitInv1 = this.gitInv1 || C(this.git1), this.gitInv2 = this.gitInv2 || C(this.git2), this.gitInv3 = this.gitInv3 || C(this.git3), this.gitInv4 = this.gitInv4 || C(this.git4), this.gitInv5 = this.gitInv5 || C(this.git5), this.gitInv6 = this.gitInv6 || C(this.git6), this.gitInv7 = this.gitInv7 || C(this.git7), this.gitBranchLabel0 = this.gitBranchLabel0 || C(this.labelTextColor), this.gitBranchLabel1 = this.gitBranchLabel1 || this.labelTextColor, this.gitBranchLabel2 = this.gitBranchLabel2 || this.labelTextColor, this.gitBranchLabel3 = this.gitBranchLabel3 || C(this.labelTextColor), this.gitBranchLabel4 = this.gitBranchLabel4 || this.labelTextColor, this.gitBranchLabel5 = this.gitBranchLabel5 || this.labelTextColor, this.gitBranchLabel6 = this.gitBranchLabel6 || this.labelTextColor, this.gitBranchLabel7 = this.gitBranchLabel7 || this.labelTextColor, this.tagLabelColor = this.tagLabelColor || this.primaryTextColor, this.tagLabelBackground = this.tagLabelBackground || this.primaryColor, this.tagLabelBorder = this.tagBorder || this.primaryBorderColor, this.tagLabelFontSize = this.tagLabelFontSize || "10px", this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor, this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor, this.commitLabelFontSize = this.commitLabelFontSize || "10px", this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || k(this.background, 12), this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || k(this.background, 2);
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
  const e = new cp();
  return e.calculate(t), e;
};
let up = class {
  constructor() {
    this.background = "#f4f4f4", this.primaryColor = "#ECECFF", this.secondaryColor = p(this.primaryColor, { h: 120 }), this.secondaryColor = "#ffffde", this.tertiaryColor = p(this.primaryColor, { h: -160 }), this.primaryBorderColor = J(this.primaryColor, this.darkMode), this.secondaryBorderColor = J(this.secondaryColor, this.darkMode), this.tertiaryBorderColor = J(this.tertiaryColor, this.darkMode), this.primaryTextColor = C(this.primaryColor), this.secondaryTextColor = C(this.secondaryColor), this.tertiaryTextColor = C(this.tertiaryColor), this.lineColor = C(this.background), this.textColor = C(this.background), this.background = "white", this.mainBkg = "#ECECFF", this.secondBkg = "#ffffde", this.lineColor = "#333333", this.border1 = "#9370DB", this.border2 = "#aaaa33", this.arrowheadColor = "#333333", this.fontFamily = '"trebuchet ms", verdana, arial, sans-serif', this.fontSize = "16px", this.labelBackground = "#e8e8e8", this.textColor = "#333", this.THEME_COLOR_LIMIT = 12, this.nodeBkg = "calculated", this.nodeBorder = "calculated", this.clusterBkg = "calculated", this.clusterBorder = "calculated", this.defaultLinkColor = "calculated", this.titleColor = "calculated", this.edgeLabelBackground = "calculated", this.actorBorder = "calculated", this.actorBkg = "calculated", this.actorTextColor = "black", this.actorLineColor = "grey", this.signalColor = "calculated", this.signalTextColor = "calculated", this.labelBoxBkgColor = "calculated", this.labelBoxBorderColor = "calculated", this.labelTextColor = "calculated", this.loopTextColor = "calculated", this.noteBorderColor = "calculated", this.noteBkgColor = "#fff5ad", this.noteTextColor = "calculated", this.activationBorderColor = "#666", this.activationBkgColor = "#f4f4f4", this.sequenceNumberColor = "white", this.sectionBkgColor = "calculated", this.altSectionBkgColor = "calculated", this.sectionBkgColor2 = "calculated", this.excludeBkgColor = "#eeeeee", this.taskBorderColor = "calculated", this.taskBkgColor = "calculated", this.taskTextLightColor = "calculated", this.taskTextColor = this.taskTextLightColor, this.taskTextDarkColor = "calculated", this.taskTextOutsideColor = this.taskTextDarkColor, this.taskTextClickableColor = "calculated", this.activeTaskBorderColor = "calculated", this.activeTaskBkgColor = "calculated", this.gridColor = "calculated", this.doneTaskBkgColor = "calculated", this.doneTaskBorderColor = "calculated", this.critBorderColor = "calculated", this.critBkgColor = "calculated", this.todayLineColor = "calculated", this.sectionBkgColor = He(102, 102, 255, 0.49), this.altSectionBkgColor = "white", this.sectionBkgColor2 = "#fff400", this.taskBorderColor = "#534fbc", this.taskBkgColor = "#8a90dd", this.taskTextLightColor = "white", this.taskTextColor = "calculated", this.taskTextDarkColor = "black", this.taskTextOutsideColor = "calculated", this.taskTextClickableColor = "#003163", this.activeTaskBorderColor = "#534fbc", this.activeTaskBkgColor = "#bfc7ff", this.gridColor = "lightgrey", this.doneTaskBkgColor = "lightgrey", this.doneTaskBorderColor = "grey", this.critBorderColor = "#ff8888", this.critBkgColor = "red", this.todayLineColor = "red", this.personBorder = this.primaryBorderColor, this.personBkg = this.mainBkg, this.labelColor = "black", this.errorBkgColor = "#552222", this.errorTextColor = "#552222", this.updateColors();
  }
  updateColors() {
    this.cScale0 = this.cScale0 || this.primaryColor, this.cScale1 = this.cScale1 || this.secondaryColor, this.cScale2 = this.cScale2 || this.tertiaryColor, this.cScale3 = this.cScale3 || p(this.primaryColor, { h: 30 }), this.cScale4 = this.cScale4 || p(this.primaryColor, { h: 60 }), this.cScale5 = this.cScale5 || p(this.primaryColor, { h: 90 }), this.cScale6 = this.cScale6 || p(this.primaryColor, { h: 120 }), this.cScale7 = this.cScale7 || p(this.primaryColor, { h: 150 }), this.cScale8 = this.cScale8 || p(this.primaryColor, { h: 210 }), this.cScale9 = this.cScale9 || p(this.primaryColor, { h: 270 }), this.cScale10 = this.cScale10 || p(this.primaryColor, { h: 300 }), this.cScale11 = this.cScale11 || p(this.primaryColor, { h: 330 }), this["cScalePeer1"] = this["cScalePeer1"] || B(this.secondaryColor, 45), this["cScalePeer2"] = this["cScalePeer2"] || B(this.tertiaryColor, 40);
    for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
      this["cScale" + e] = B(this["cScale" + e], 10), this["cScalePeer" + e] = this["cScalePeer" + e] || B(this["cScale" + e], 25);
    for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
      this["cScaleInv" + e] = this["cScaleInv" + e] || p(this["cScale" + e], { h: 180 });
    for (let e = 0; e < 5; e++)
      this["surface" + e] = this["surface" + e] || p(this.mainBkg, { h: 30, l: -(5 + e * 5) }), this["surfacePeer" + e] = this["surfacePeer" + e] || p(this.mainBkg, { h: 30, l: -(7 + e * 5) });
    if (this.scaleLabelColor = this.scaleLabelColor !== "calculated" && this.scaleLabelColor ? this.scaleLabelColor : this.labelTextColor, this.labelTextColor !== "calculated") {
      this.cScaleLabel0 = this.cScaleLabel0 || C(this.labelTextColor), this.cScaleLabel3 = this.cScaleLabel3 || C(this.labelTextColor);
      for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
        this["cScaleLabel" + e] = this["cScaleLabel" + e] || this.labelTextColor;
    }
    this.nodeBkg = this.mainBkg, this.nodeBorder = this.border1, this.clusterBkg = this.secondBkg, this.clusterBorder = this.border2, this.defaultLinkColor = this.lineColor, this.titleColor = this.textColor, this.edgeLabelBackground = this.labelBackground, this.actorBorder = k(this.border1, 23), this.actorBkg = this.mainBkg, this.labelBoxBkgColor = this.actorBkg, this.signalColor = this.textColor, this.signalTextColor = this.textColor, this.labelBoxBorderColor = this.actorBorder, this.labelTextColor = this.actorTextColor, this.loopTextColor = this.actorTextColor, this.noteBorderColor = this.border2, this.noteTextColor = this.actorTextColor, this.taskTextColor = this.taskTextLightColor, this.taskTextOutsideColor = this.taskTextDarkColor, this.transitionColor = this.transitionColor || this.lineColor, this.transitionLabelColor = this.transitionLabelColor || this.textColor, this.stateLabelColor = this.stateLabelColor || this.stateBkg || this.primaryTextColor, this.stateBkg = this.stateBkg || this.mainBkg, this.labelBackgroundColor = this.labelBackgroundColor || this.stateBkg, this.compositeBackground = this.compositeBackground || this.background || this.tertiaryColor, this.altBackground = this.altBackground || "#f0f0f0", this.compositeTitleBackground = this.compositeTitleBackground || this.mainBkg, this.compositeBorder = this.compositeBorder || this.nodeBorder, this.innerEndBackground = this.nodeBorder, this.specialStateColor = this.lineColor, this.errorBkgColor = this.errorBkgColor || this.tertiaryColor, this.errorTextColor = this.errorTextColor || this.tertiaryTextColor, this.transitionColor = this.transitionColor || this.lineColor, this.classText = this.primaryTextColor, this.fillType0 = this.primaryColor, this.fillType1 = this.secondaryColor, this.fillType2 = p(this.primaryColor, { h: 64 }), this.fillType3 = p(this.secondaryColor, { h: 64 }), this.fillType4 = p(this.primaryColor, { h: -64 }), this.fillType5 = p(this.secondaryColor, { h: -64 }), this.fillType6 = p(this.primaryColor, { h: 128 }), this.fillType7 = p(this.secondaryColor, { h: 128 }), this.pie1 = this.pie1 || this.primaryColor, this.pie2 = this.pie2 || this.secondaryColor, this.pie3 = this.pie3 || p(this.tertiaryColor, { l: -40 }), this.pie4 = this.pie4 || p(this.primaryColor, { l: -10 }), this.pie5 = this.pie5 || p(this.secondaryColor, { l: -30 }), this.pie6 = this.pie6 || p(this.tertiaryColor, { l: -20 }), this.pie7 = this.pie7 || p(this.primaryColor, { h: 60, l: -20 }), this.pie8 = this.pie8 || p(this.primaryColor, { h: -60, l: -40 }), this.pie9 = this.pie9 || p(this.primaryColor, { h: 120, l: -40 }), this.pie10 = this.pie10 || p(this.primaryColor, { h: 60, l: -40 }), this.pie11 = this.pie11 || p(this.primaryColor, { h: -90, l: -40 }), this.pie12 = this.pie12 || p(this.primaryColor, { h: 120, l: -30 }), this.pieTitleTextSize = this.pieTitleTextSize || "25px", this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor, this.pieSectionTextSize = this.pieSectionTextSize || "17px", this.pieSectionTextColor = this.pieSectionTextColor || this.textColor, this.pieLegendTextSize = this.pieLegendTextSize || "17px", this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor, this.pieStrokeColor = this.pieStrokeColor || "black", this.pieStrokeWidth = this.pieStrokeWidth || "2px", this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || "2px", this.pieOuterStrokeColor = this.pieOuterStrokeColor || "black", this.pieOpacity = this.pieOpacity || "0.7", this.requirementBackground = this.requirementBackground || this.primaryColor, this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor, this.requirementBorderSize = this.requirementBorderSize || "1", this.requirementTextColor = this.requirementTextColor || this.primaryTextColor, this.relationColor = this.relationColor || this.lineColor, this.relationLabelBackground = this.relationLabelBackground || this.labelBackground, this.relationLabelColor = this.relationLabelColor || this.actorTextColor, this.git0 = this.git0 || this.primaryColor, this.git1 = this.git1 || this.secondaryColor, this.git2 = this.git2 || this.tertiaryColor, this.git3 = this.git3 || p(this.primaryColor, { h: -30 }), this.git4 = this.git4 || p(this.primaryColor, { h: -60 }), this.git5 = this.git5 || p(this.primaryColor, { h: -90 }), this.git6 = this.git6 || p(this.primaryColor, { h: 60 }), this.git7 = this.git7 || p(this.primaryColor, { h: 120 }), this.darkMode ? (this.git0 = k(this.git0, 25), this.git1 = k(this.git1, 25), this.git2 = k(this.git2, 25), this.git3 = k(this.git3, 25), this.git4 = k(this.git4, 25), this.git5 = k(this.git5, 25), this.git6 = k(this.git6, 25), this.git7 = k(this.git7, 25)) : (this.git0 = B(this.git0, 25), this.git1 = B(this.git1, 25), this.git2 = B(this.git2, 25), this.git3 = B(this.git3, 25), this.git4 = B(this.git4, 25), this.git5 = B(this.git5, 25), this.git6 = B(this.git6, 25), this.git7 = B(this.git7, 25)), this.gitInv0 = this.gitInv0 || B(C(this.git0), 25), this.gitInv1 = this.gitInv1 || C(this.git1), this.gitInv2 = this.gitInv2 || C(this.git2), this.gitInv3 = this.gitInv3 || C(this.git3), this.gitInv4 = this.gitInv4 || C(this.git4), this.gitInv5 = this.gitInv5 || C(this.git5), this.gitInv6 = this.gitInv6 || C(this.git6), this.gitInv7 = this.gitInv7 || C(this.git7), this.gitBranchLabel0 = this.gitBranchLabel0 || C(this.labelTextColor), this.gitBranchLabel1 = this.gitBranchLabel1 || this.labelTextColor, this.gitBranchLabel2 = this.gitBranchLabel2 || this.labelTextColor, this.gitBranchLabel3 = this.gitBranchLabel3 || C(this.labelTextColor), this.gitBranchLabel4 = this.gitBranchLabel4 || this.labelTextColor, this.gitBranchLabel5 = this.gitBranchLabel5 || this.labelTextColor, this.gitBranchLabel6 = this.gitBranchLabel6 || this.labelTextColor, this.gitBranchLabel7 = this.gitBranchLabel7 || this.labelTextColor, this.tagLabelColor = this.tagLabelColor || this.primaryTextColor, this.tagLabelBackground = this.tagLabelBackground || this.primaryColor, this.tagLabelBorder = this.tagBorder || this.primaryBorderColor, this.tagLabelFontSize = this.tagLabelFontSize || "10px", this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor, this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor, this.commitLabelFontSize = this.commitLabelFontSize || "10px", this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || gr, this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || mr;
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
    this.background = "#f4f4f4", this.primaryColor = "#cde498", this.secondaryColor = "#cdffb2", this.background = "white", this.mainBkg = "#cde498", this.secondBkg = "#cdffb2", this.lineColor = "green", this.border1 = "#13540c", this.border2 = "#6eaa49", this.arrowheadColor = "green", this.fontFamily = '"trebuchet ms", verdana, arial, sans-serif', this.fontSize = "16px", this.tertiaryColor = k("#cde498", 10), this.primaryBorderColor = J(this.primaryColor, this.darkMode), this.secondaryBorderColor = J(this.secondaryColor, this.darkMode), this.tertiaryBorderColor = J(this.tertiaryColor, this.darkMode), this.primaryTextColor = C(this.primaryColor), this.secondaryTextColor = C(this.secondaryColor), this.tertiaryTextColor = C(this.primaryColor), this.lineColor = C(this.background), this.textColor = C(this.background), this.THEME_COLOR_LIMIT = 12, this.nodeBkg = "calculated", this.nodeBorder = "calculated", this.clusterBkg = "calculated", this.clusterBorder = "calculated", this.defaultLinkColor = "calculated", this.titleColor = "#333", this.edgeLabelBackground = "#e8e8e8", this.actorBorder = "calculated", this.actorBkg = "calculated", this.actorTextColor = "black", this.actorLineColor = "grey", this.signalColor = "#333", this.signalTextColor = "#333", this.labelBoxBkgColor = "calculated", this.labelBoxBorderColor = "#326932", this.labelTextColor = "calculated", this.loopTextColor = "calculated", this.noteBorderColor = "calculated", this.noteBkgColor = "#fff5ad", this.noteTextColor = "calculated", this.activationBorderColor = "#666", this.activationBkgColor = "#f4f4f4", this.sequenceNumberColor = "white", this.sectionBkgColor = "#6eaa49", this.altSectionBkgColor = "white", this.sectionBkgColor2 = "#6eaa49", this.excludeBkgColor = "#eeeeee", this.taskBorderColor = "calculated", this.taskBkgColor = "#487e3a", this.taskTextLightColor = "white", this.taskTextColor = "calculated", this.taskTextDarkColor = "black", this.taskTextOutsideColor = "calculated", this.taskTextClickableColor = "#003163", this.activeTaskBorderColor = "calculated", this.activeTaskBkgColor = "calculated", this.gridColor = "lightgrey", this.doneTaskBkgColor = "lightgrey", this.doneTaskBorderColor = "grey", this.critBorderColor = "#ff8888", this.critBkgColor = "red", this.todayLineColor = "red", this.personBorder = this.primaryBorderColor, this.personBkg = this.mainBkg, this.labelColor = "black", this.errorBkgColor = "#552222", this.errorTextColor = "#552222";
  }
  updateColors() {
    this.actorBorder = B(this.mainBkg, 20), this.actorBkg = this.mainBkg, this.labelBoxBkgColor = this.actorBkg, this.labelTextColor = this.actorTextColor, this.loopTextColor = this.actorTextColor, this.noteBorderColor = this.border2, this.noteTextColor = this.actorTextColor, this.cScale0 = this.cScale0 || this.primaryColor, this.cScale1 = this.cScale1 || this.secondaryColor, this.cScale2 = this.cScale2 || this.tertiaryColor, this.cScale3 = this.cScale3 || p(this.primaryColor, { h: 30 }), this.cScale4 = this.cScale4 || p(this.primaryColor, { h: 60 }), this.cScale5 = this.cScale5 || p(this.primaryColor, { h: 90 }), this.cScale6 = this.cScale6 || p(this.primaryColor, { h: 120 }), this.cScale7 = this.cScale7 || p(this.primaryColor, { h: 150 }), this.cScale8 = this.cScale8 || p(this.primaryColor, { h: 210 }), this.cScale9 = this.cScale9 || p(this.primaryColor, { h: 270 }), this.cScale10 = this.cScale10 || p(this.primaryColor, { h: 300 }), this.cScale11 = this.cScale11 || p(this.primaryColor, { h: 330 }), this["cScalePeer1"] = this["cScalePeer1"] || B(this.secondaryColor, 45), this["cScalePeer2"] = this["cScalePeer2"] || B(this.tertiaryColor, 40);
    for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
      this["cScale" + e] = B(this["cScale" + e], 10), this["cScalePeer" + e] = this["cScalePeer" + e] || B(this["cScale" + e], 25);
    for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
      this["cScaleInv" + e] = this["cScaleInv" + e] || p(this["cScale" + e], { h: 180 });
    this.scaleLabelColor = this.scaleLabelColor !== "calculated" && this.scaleLabelColor ? this.scaleLabelColor : this.labelTextColor;
    for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
      this["cScaleLabel" + e] = this["cScaleLabel" + e] || this.scaleLabelColor;
    for (let e = 0; e < 5; e++)
      this["surface" + e] = this["surface" + e] || p(this.mainBkg, { h: 30, s: -30, l: -(5 + e * 5) }), this["surfacePeer" + e] = this["surfacePeer" + e] || p(this.mainBkg, { h: 30, s: -30, l: -(8 + e * 5) });
    this.nodeBkg = this.mainBkg, this.nodeBorder = this.border1, this.clusterBkg = this.secondBkg, this.clusterBorder = this.border2, this.defaultLinkColor = this.lineColor, this.taskBorderColor = this.border1, this.taskTextColor = this.taskTextLightColor, this.taskTextOutsideColor = this.taskTextDarkColor, this.activeTaskBorderColor = this.taskBorderColor, this.activeTaskBkgColor = this.mainBkg, this.transitionColor = this.transitionColor || this.lineColor, this.transitionLabelColor = this.transitionLabelColor || this.textColor, this.stateLabelColor = this.stateLabelColor || this.stateBkg || this.primaryTextColor, this.stateBkg = this.stateBkg || this.mainBkg, this.labelBackgroundColor = this.labelBackgroundColor || this.stateBkg, this.compositeBackground = this.compositeBackground || this.background || this.tertiaryColor, this.altBackground = this.altBackground || "#f0f0f0", this.compositeTitleBackground = this.compositeTitleBackground || this.mainBkg, this.compositeBorder = this.compositeBorder || this.nodeBorder, this.innerEndBackground = this.primaryBorderColor, this.specialStateColor = this.lineColor, this.errorBkgColor = this.errorBkgColor || this.tertiaryColor, this.errorTextColor = this.errorTextColor || this.tertiaryTextColor, this.transitionColor = this.transitionColor || this.lineColor, this.classText = this.primaryTextColor, this.fillType0 = this.primaryColor, this.fillType1 = this.secondaryColor, this.fillType2 = p(this.primaryColor, { h: 64 }), this.fillType3 = p(this.secondaryColor, { h: 64 }), this.fillType4 = p(this.primaryColor, { h: -64 }), this.fillType5 = p(this.secondaryColor, { h: -64 }), this.fillType6 = p(this.primaryColor, { h: 128 }), this.fillType7 = p(this.secondaryColor, { h: 128 }), this.pie1 = this.pie1 || this.primaryColor, this.pie2 = this.pie2 || this.secondaryColor, this.pie3 = this.pie3 || this.tertiaryColor, this.pie4 = this.pie4 || p(this.primaryColor, { l: -30 }), this.pie5 = this.pie5 || p(this.secondaryColor, { l: -30 }), this.pie6 = this.pie6 || p(this.tertiaryColor, { h: 40, l: -40 }), this.pie7 = this.pie7 || p(this.primaryColor, { h: 60, l: -10 }), this.pie8 = this.pie8 || p(this.primaryColor, { h: -60, l: -10 }), this.pie9 = this.pie9 || p(this.primaryColor, { h: 120, l: 0 }), this.pie10 = this.pie10 || p(this.primaryColor, { h: 60, l: -50 }), this.pie11 = this.pie11 || p(this.primaryColor, { h: -60, l: -50 }), this.pie12 = this.pie12 || p(this.primaryColor, { h: 120, l: -50 }), this.pieTitleTextSize = this.pieTitleTextSize || "25px", this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor, this.pieSectionTextSize = this.pieSectionTextSize || "17px", this.pieSectionTextColor = this.pieSectionTextColor || this.textColor, this.pieLegendTextSize = this.pieLegendTextSize || "17px", this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor, this.pieStrokeColor = this.pieStrokeColor || "black", this.pieStrokeWidth = this.pieStrokeWidth || "2px", this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || "2px", this.pieOuterStrokeColor = this.pieOuterStrokeColor || "black", this.pieOpacity = this.pieOpacity || "0.7", this.requirementBackground = this.requirementBackground || this.primaryColor, this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor, this.requirementBorderSize = this.requirementBorderSize || "1", this.requirementTextColor = this.requirementTextColor || this.primaryTextColor, this.relationColor = this.relationColor || this.lineColor, this.relationLabelBackground = this.relationLabelBackground || this.edgeLabelBackground, this.relationLabelColor = this.relationLabelColor || this.actorTextColor, this.git0 = this.git0 || this.primaryColor, this.git1 = this.git1 || this.secondaryColor, this.git2 = this.git2 || this.tertiaryColor, this.git3 = this.git3 || p(this.primaryColor, { h: -30 }), this.git4 = this.git4 || p(this.primaryColor, { h: -60 }), this.git5 = this.git5 || p(this.primaryColor, { h: -90 }), this.git6 = this.git6 || p(this.primaryColor, { h: 60 }), this.git7 = this.git7 || p(this.primaryColor, { h: 120 }), this.darkMode ? (this.git0 = k(this.git0, 25), this.git1 = k(this.git1, 25), this.git2 = k(this.git2, 25), this.git3 = k(this.git3, 25), this.git4 = k(this.git4, 25), this.git5 = k(this.git5, 25), this.git6 = k(this.git6, 25), this.git7 = k(this.git7, 25)) : (this.git0 = B(this.git0, 25), this.git1 = B(this.git1, 25), this.git2 = B(this.git2, 25), this.git3 = B(this.git3, 25), this.git4 = B(this.git4, 25), this.git5 = B(this.git5, 25), this.git6 = B(this.git6, 25), this.git7 = B(this.git7, 25)), this.gitInv0 = this.gitInv0 || C(this.git0), this.gitInv1 = this.gitInv1 || C(this.git1), this.gitInv2 = this.gitInv2 || C(this.git2), this.gitInv3 = this.gitInv3 || C(this.git3), this.gitInv4 = this.gitInv4 || C(this.git4), this.gitInv5 = this.gitInv5 || C(this.git5), this.gitInv6 = this.gitInv6 || C(this.git6), this.gitInv7 = this.gitInv7 || C(this.git7), this.gitBranchLabel0 = this.gitBranchLabel0 || C(this.labelTextColor), this.gitBranchLabel1 = this.gitBranchLabel1 || this.labelTextColor, this.gitBranchLabel2 = this.gitBranchLabel2 || this.labelTextColor, this.gitBranchLabel3 = this.gitBranchLabel3 || C(this.labelTextColor), this.gitBranchLabel4 = this.gitBranchLabel4 || this.labelTextColor, this.gitBranchLabel5 = this.gitBranchLabel5 || this.labelTextColor, this.gitBranchLabel6 = this.gitBranchLabel6 || this.labelTextColor, this.gitBranchLabel7 = this.gitBranchLabel7 || this.labelTextColor, this.tagLabelColor = this.tagLabelColor || this.primaryTextColor, this.tagLabelBackground = this.tagLabelBackground || this.primaryColor, this.tagLabelBorder = this.tagBorder || this.primaryBorderColor, this.tagLabelFontSize = this.tagLabelFontSize || "10px", this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor, this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor, this.commitLabelFontSize = this.commitLabelFontSize || "10px", this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || gr, this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || mr;
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
class gp {
  constructor() {
    this.primaryColor = "#eee", this.contrast = "#707070", this.secondaryColor = k(this.contrast, 55), this.background = "#ffffff", this.tertiaryColor = p(this.primaryColor, { h: -160 }), this.primaryBorderColor = J(this.primaryColor, this.darkMode), this.secondaryBorderColor = J(this.secondaryColor, this.darkMode), this.tertiaryBorderColor = J(this.tertiaryColor, this.darkMode), this.primaryTextColor = C(this.primaryColor), this.secondaryTextColor = C(this.secondaryColor), this.tertiaryTextColor = C(this.tertiaryColor), this.lineColor = C(this.background), this.textColor = C(this.background), this.mainBkg = "#eee", this.secondBkg = "calculated", this.lineColor = "#666", this.border1 = "#999", this.border2 = "calculated", this.note = "#ffa", this.text = "#333", this.critical = "#d42", this.done = "#bbb", this.arrowheadColor = "#333333", this.fontFamily = '"trebuchet ms", verdana, arial, sans-serif', this.fontSize = "16px", this.THEME_COLOR_LIMIT = 12, this.nodeBkg = "calculated", this.nodeBorder = "calculated", this.clusterBkg = "calculated", this.clusterBorder = "calculated", this.defaultLinkColor = "calculated", this.titleColor = "calculated", this.edgeLabelBackground = "white", this.actorBorder = "calculated", this.actorBkg = "calculated", this.actorTextColor = "calculated", this.actorLineColor = "calculated", this.signalColor = "calculated", this.signalTextColor = "calculated", this.labelBoxBkgColor = "calculated", this.labelBoxBorderColor = "calculated", this.labelTextColor = "calculated", this.loopTextColor = "calculated", this.noteBorderColor = "calculated", this.noteBkgColor = "calculated", this.noteTextColor = "calculated", this.activationBorderColor = "#666", this.activationBkgColor = "#f4f4f4", this.sequenceNumberColor = "white", this.sectionBkgColor = "calculated", this.altSectionBkgColor = "white", this.sectionBkgColor2 = "calculated", this.excludeBkgColor = "#eeeeee", this.taskBorderColor = "calculated", this.taskBkgColor = "calculated", this.taskTextLightColor = "white", this.taskTextColor = "calculated", this.taskTextDarkColor = "calculated", this.taskTextOutsideColor = "calculated", this.taskTextClickableColor = "#003163", this.activeTaskBorderColor = "calculated", this.activeTaskBkgColor = "calculated", this.gridColor = "calculated", this.doneTaskBkgColor = "calculated", this.doneTaskBorderColor = "calculated", this.critBkgColor = "calculated", this.critBorderColor = "calculated", this.todayLineColor = "calculated", this.personBorder = this.primaryBorderColor, this.personBkg = this.mainBkg, this.labelColor = "black", this.errorBkgColor = "#552222", this.errorTextColor = "#552222";
  }
  updateColors() {
    this.secondBkg = k(this.contrast, 55), this.border2 = this.contrast, this.actorBorder = k(this.border1, 23), this.actorBkg = this.mainBkg, this.actorTextColor = this.text, this.actorLineColor = this.lineColor, this.signalColor = this.text, this.signalTextColor = this.text, this.labelBoxBkgColor = this.actorBkg, this.labelBoxBorderColor = this.actorBorder, this.labelTextColor = this.text, this.loopTextColor = this.text, this.noteBorderColor = "#999", this.noteBkgColor = "#666", this.noteTextColor = "#fff", this.cScale0 = this.cScale0 || "#555", this.cScale1 = this.cScale1 || "#F4F4F4", this.cScale2 = this.cScale2 || "#555", this.cScale3 = this.cScale3 || "#BBB", this.cScale4 = this.cScale4 || "#777", this.cScale5 = this.cScale5 || "#999", this.cScale6 = this.cScale6 || "#DDD", this.cScale7 = this.cScale7 || "#FFF", this.cScale8 = this.cScale8 || "#DDD", this.cScale9 = this.cScale9 || "#BBB", this.cScale10 = this.cScale10 || "#999", this.cScale11 = this.cScale11 || "#777";
    for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
      this["cScaleInv" + e] = this["cScaleInv" + e] || C(this["cScale" + e]);
    for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
      this.darkMode ? this["cScalePeer" + e] = this["cScalePeer" + e] || k(this["cScale" + e], 10) : this["cScalePeer" + e] = this["cScalePeer" + e] || B(this["cScale" + e], 10);
    this.scaleLabelColor = this.scaleLabelColor || (this.darkMode ? "black" : this.labelTextColor), this.cScaleLabel0 = this.cScaleLabel0 || this.cScale1, this.cScaleLabel2 = this.cScaleLabel2 || this.cScale1;
    for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
      this["cScaleLabel" + e] = this["cScaleLabel" + e] || this.scaleLabelColor;
    for (let e = 0; e < 5; e++)
      this["surface" + e] = this["surface" + e] || p(this.mainBkg, { l: -(5 + e * 5) }), this["surfacePeer" + e] = this["surfacePeer" + e] || p(this.mainBkg, { l: -(8 + e * 5) });
    this.nodeBkg = this.mainBkg, this.nodeBorder = this.border1, this.clusterBkg = this.secondBkg, this.clusterBorder = this.border2, this.defaultLinkColor = this.lineColor, this.titleColor = this.text, this.sectionBkgColor = k(this.contrast, 30), this.sectionBkgColor2 = k(this.contrast, 30), this.taskBorderColor = B(this.contrast, 10), this.taskBkgColor = this.contrast, this.taskTextColor = this.taskTextLightColor, this.taskTextDarkColor = this.text, this.taskTextOutsideColor = this.taskTextDarkColor, this.activeTaskBorderColor = this.taskBorderColor, this.activeTaskBkgColor = this.mainBkg, this.gridColor = k(this.border1, 30), this.doneTaskBkgColor = this.done, this.doneTaskBorderColor = this.lineColor, this.critBkgColor = this.critical, this.critBorderColor = B(this.critBkgColor, 10), this.todayLineColor = this.critBkgColor, this.transitionColor = this.transitionColor || "#000", this.transitionLabelColor = this.transitionLabelColor || this.textColor, this.stateLabelColor = this.stateLabelColor || this.stateBkg || this.primaryTextColor, this.stateBkg = this.stateBkg || this.mainBkg, this.labelBackgroundColor = this.labelBackgroundColor || this.stateBkg, this.compositeBackground = this.compositeBackground || this.background || this.tertiaryColor, this.altBackground = this.altBackground || "#f4f4f4", this.compositeTitleBackground = this.compositeTitleBackground || this.mainBkg, this.stateBorder = this.stateBorder || "#000", this.innerEndBackground = this.primaryBorderColor, this.specialStateColor = "#222", this.errorBkgColor = this.errorBkgColor || this.tertiaryColor, this.errorTextColor = this.errorTextColor || this.tertiaryTextColor, this.classText = this.primaryTextColor, this.fillType0 = this.primaryColor, this.fillType1 = this.secondaryColor, this.fillType2 = p(this.primaryColor, { h: 64 }), this.fillType3 = p(this.secondaryColor, { h: 64 }), this.fillType4 = p(this.primaryColor, { h: -64 }), this.fillType5 = p(this.secondaryColor, { h: -64 }), this.fillType6 = p(this.primaryColor, { h: 128 }), this.fillType7 = p(this.secondaryColor, { h: 128 });
    for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
      this["pie" + e] = this["cScale" + e];
    this.pie12 = this.pie0, this.pieTitleTextSize = this.pieTitleTextSize || "25px", this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor, this.pieSectionTextSize = this.pieSectionTextSize || "17px", this.pieSectionTextColor = this.pieSectionTextColor || this.textColor, this.pieLegendTextSize = this.pieLegendTextSize || "17px", this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor, this.pieStrokeColor = this.pieStrokeColor || "black", this.pieStrokeWidth = this.pieStrokeWidth || "2px", this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || "2px", this.pieOuterStrokeColor = this.pieOuterStrokeColor || "black", this.pieOpacity = this.pieOpacity || "0.7", this.requirementBackground = this.requirementBackground || this.primaryColor, this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor, this.requirementBorderSize = this.requirementBorderSize || "1", this.requirementTextColor = this.requirementTextColor || this.primaryTextColor, this.relationColor = this.relationColor || this.lineColor, this.relationLabelBackground = this.relationLabelBackground || this.edgeLabelBackground, this.relationLabelColor = this.relationLabelColor || this.actorTextColor, this.git0 = B(this.pie1, 25) || this.primaryColor, this.git1 = this.pie2 || this.secondaryColor, this.git2 = this.pie3 || this.tertiaryColor, this.git3 = this.pie4 || p(this.primaryColor, { h: -30 }), this.git4 = this.pie5 || p(this.primaryColor, { h: -60 }), this.git5 = this.pie6 || p(this.primaryColor, { h: -90 }), this.git6 = this.pie7 || p(this.primaryColor, { h: 60 }), this.git7 = this.pie8 || p(this.primaryColor, { h: 120 }), this.gitInv0 = this.gitInv0 || C(this.git0), this.gitInv1 = this.gitInv1 || C(this.git1), this.gitInv2 = this.gitInv2 || C(this.git2), this.gitInv3 = this.gitInv3 || C(this.git3), this.gitInv4 = this.gitInv4 || C(this.git4), this.gitInv5 = this.gitInv5 || C(this.git5), this.gitInv6 = this.gitInv6 || C(this.git6), this.gitInv7 = this.gitInv7 || C(this.git7), this.branchLabelColor = this.branchLabelColor || this.labelTextColor, this.gitBranchLabel0 = this.branchLabelColor, this.gitBranchLabel1 = "white", this.gitBranchLabel2 = this.branchLabelColor, this.gitBranchLabel3 = "white", this.gitBranchLabel4 = this.branchLabelColor, this.gitBranchLabel5 = this.branchLabelColor, this.gitBranchLabel6 = this.branchLabelColor, this.gitBranchLabel7 = this.branchLabelColor, this.tagLabelColor = this.tagLabelColor || this.primaryTextColor, this.tagLabelBackground = this.tagLabelBackground || this.primaryColor, this.tagLabelBorder = this.tagBorder || this.primaryBorderColor, this.tagLabelFontSize = this.tagLabelFontSize || "10px", this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor, this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor, this.commitLabelFontSize = this.commitLabelFontSize || "10px", this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || gr, this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || mr;
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
const mp = (t) => {
  const e = new gp();
  return e.calculate(t), e;
}, At = {
  base: {
    getThemeVariables: lp
  },
  dark: {
    getThemeVariables: hp
  },
  default: {
    getThemeVariables: fp
  },
  forest: {
    getThemeVariables: pp
  },
  neutral: {
    getThemeVariables: mp
  }
}, Rt = {
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
  themeVariables: At.default.getThemeVariables(),
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
Rt.class && (Rt.class.arrowMarkerAbsolute = Rt.arrowMarkerAbsolute);
Rt.gitGraph && (Rt.gitGraph.arrowMarkerAbsolute = Rt.arrowMarkerAbsolute);
const Ea = (t, e = "") => Object.keys(t).reduce((i, r) => Array.isArray(t[r]) ? i : typeof t[r] == "object" && t[r] !== null ? [...i, e + r, ...Ea(t[r], "")] : [...i, e + r], []), _p = Ea(Rt, ""), yp = Rt;
/*! js-yaml 4.1.0 https://github.com/nodeca/js-yaml @license MIT */
function Fa(t) {
  return typeof t > "u" || t === null;
}
function Cp(t) {
  return typeof t == "object" && t !== null;
}
function bp(t) {
  return Array.isArray(t) ? t : Fa(t) ? [] : [t];
}
function xp(t, e) {
  var i, r, n, o;
  if (e)
    for (o = Object.keys(e), i = 0, r = o.length; i < r; i += 1)
      n = o[i], t[n] = e[n];
  return t;
}
function Tp(t, e) {
  var i = "", r;
  for (r = 0; r < e; r += 1)
    i += t;
  return i;
}
function vp(t) {
  return t === 0 && Number.NEGATIVE_INFINITY === 1 / t;
}
var Sp = Fa, kp = Cp, wp = bp, Bp = Tp, Lp = vp, Ap = xp, Z = {
  isNothing: Sp,
  isObject: kp,
  toArray: wp,
  repeat: Bp,
  isNegativeZero: Lp,
  extend: Ap
};
function Ma(t, e) {
  var i = "", r = t.reason || "(unknown reason)";
  return t.mark ? (t.mark.name && (i += 'in "' + t.mark.name + '" '), i += "(" + (t.mark.line + 1) + ":" + (t.mark.column + 1) + ")", !e && t.mark.snippet && (i += `

` + t.mark.snippet), r + " " + i) : r;
}
function Ke(t, e) {
  Error.call(this), this.name = "YAMLException", this.reason = t, this.mark = e, this.message = Ma(this, !1), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack || "";
}
Ke.prototype = Object.create(Error.prototype);
Ke.prototype.constructor = Ke;
Ke.prototype.toString = function(e) {
  return this.name + ": " + Ma(this, e);
};
var Lt = Ke;
function Vr(t, e, i, r, n) {
  var o = "", s = "", a = Math.floor(n / 2) - 1;
  return r - e > a && (o = " ... ", e = r - a + o.length), i - r > a && (s = " ...", i = r + a - s.length), {
    str: o + t.slice(e, i).replace(/\t/g, "→") + s,
    pos: r - e + o.length
    // relative position
  };
}
function Xr(t, e) {
  return Z.repeat(" ", e - t.length) + t;
}
function Ep(t, e) {
  if (e = Object.create(e || null), !t.buffer)
    return null;
  e.maxLength || (e.maxLength = 79), typeof e.indent != "number" && (e.indent = 1), typeof e.linesBefore != "number" && (e.linesBefore = 3), typeof e.linesAfter != "number" && (e.linesAfter = 2);
  for (var i = /\r?\n|\r|\0/g, r = [0], n = [], o, s = -1; o = i.exec(t.buffer); )
    n.push(o.index), r.push(o.index + o[0].length), t.position <= o.index && s < 0 && (s = r.length - 2);
  s < 0 && (s = r.length - 1);
  var a = "", l, c, h = Math.min(t.line + e.linesAfter, n.length).toString().length, u = e.maxLength - (e.indent + h + 3);
  for (l = 1; l <= e.linesBefore && !(s - l < 0); l++)
    c = Vr(
      t.buffer,
      r[s - l],
      n[s - l],
      t.position - (r[s] - r[s - l]),
      u
    ), a = Z.repeat(" ", e.indent) + Xr((t.line - l + 1).toString(), h) + " | " + c.str + `
` + a;
  for (c = Vr(t.buffer, r[s], n[s], t.position, u), a += Z.repeat(" ", e.indent) + Xr((t.line + 1).toString(), h) + " | " + c.str + `
`, a += Z.repeat("-", e.indent + h + 3 + c.pos) + `^
`, l = 1; l <= e.linesAfter && !(s + l >= n.length); l++)
    c = Vr(
      t.buffer,
      r[s + l],
      n[s + l],
      t.position - (r[s] - r[s + l]),
      u
    ), a += Z.repeat(" ", e.indent) + Xr((t.line + l + 1).toString(), h) + " | " + c.str + `
`;
  return a.replace(/\n$/, "");
}
var Fp = Ep, Mp = [
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
], Op = [
  "scalar",
  "sequence",
  "mapping"
];
function $p(t) {
  var e = {};
  return t !== null && Object.keys(t).forEach(function(i) {
    t[i].forEach(function(r) {
      e[String(r)] = i;
    });
  }), e;
}
function Ip(t, e) {
  if (e = e || {}, Object.keys(e).forEach(function(i) {
    if (Mp.indexOf(i) === -1)
      throw new Lt('Unknown option "' + i + '" is met in definition of "' + t + '" YAML type.');
  }), this.options = e, this.tag = t, this.kind = e.kind || null, this.resolve = e.resolve || function() {
    return !0;
  }, this.construct = e.construct || function(i) {
    return i;
  }, this.instanceOf = e.instanceOf || null, this.predicate = e.predicate || null, this.represent = e.represent || null, this.representName = e.representName || null, this.defaultStyle = e.defaultStyle || null, this.multi = e.multi || !1, this.styleAliases = $p(e.styleAliases || null), Op.indexOf(this.kind) === -1)
    throw new Lt('Unknown kind "' + this.kind + '" is specified for "' + t + '" YAML type.');
}
var K = Ip;
function es(t, e) {
  var i = [];
  return t[e].forEach(function(r) {
    var n = i.length;
    i.forEach(function(o, s) {
      o.tag === r.tag && o.kind === r.kind && o.multi === r.multi && (n = s);
    }), i[n] = r;
  }), i;
}
function Dp() {
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
function dn(t) {
  return this.extend(t);
}
dn.prototype.extend = function(e) {
  var i = [], r = [];
  if (e instanceof K)
    r.push(e);
  else if (Array.isArray(e))
    r = r.concat(e);
  else if (e && (Array.isArray(e.implicit) || Array.isArray(e.explicit)))
    e.implicit && (i = i.concat(e.implicit)), e.explicit && (r = r.concat(e.explicit));
  else
    throw new Lt("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
  i.forEach(function(o) {
    if (!(o instanceof K))
      throw new Lt("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    if (o.loadKind && o.loadKind !== "scalar")
      throw new Lt("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
    if (o.multi)
      throw new Lt("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
  }), r.forEach(function(o) {
    if (!(o instanceof K))
      throw new Lt("Specified list of YAML types (or a single Type object) contains a non-Type object.");
  });
  var n = Object.create(dn.prototype);
  return n.implicit = (this.implicit || []).concat(i), n.explicit = (this.explicit || []).concat(r), n.compiledImplicit = es(n, "implicit"), n.compiledExplicit = es(n, "explicit"), n.compiledTypeMap = Dp(n.compiledImplicit, n.compiledExplicit), n;
};
var Np = dn, Rp = new K("tag:yaml.org,2002:str", {
  kind: "scalar",
  construct: function(t) {
    return t !== null ? t : "";
  }
}), zp = new K("tag:yaml.org,2002:seq", {
  kind: "sequence",
  construct: function(t) {
    return t !== null ? t : [];
  }
}), Pp = new K("tag:yaml.org,2002:map", {
  kind: "mapping",
  construct: function(t) {
    return t !== null ? t : {};
  }
}), Oa = new Np({
  explicit: [
    Rp,
    zp,
    Pp
  ]
});
function Wp(t) {
  if (t === null)
    return !0;
  var e = t.length;
  return e === 1 && t === "~" || e === 4 && (t === "null" || t === "Null" || t === "NULL");
}
function Hp() {
  return null;
}
function qp(t) {
  return t === null;
}
var jp = new K("tag:yaml.org,2002:null", {
  kind: "scalar",
  resolve: Wp,
  construct: Hp,
  predicate: qp,
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
function Up(t) {
  if (t === null)
    return !1;
  var e = t.length;
  return e === 4 && (t === "true" || t === "True" || t === "TRUE") || e === 5 && (t === "false" || t === "False" || t === "FALSE");
}
function Gp(t) {
  return t === "true" || t === "True" || t === "TRUE";
}
function Yp(t) {
  return Object.prototype.toString.call(t) === "[object Boolean]";
}
var Vp = new K("tag:yaml.org,2002:bool", {
  kind: "scalar",
  resolve: Up,
  construct: Gp,
  predicate: Yp,
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
function Xp(t) {
  return 48 <= t && t <= 57 || 65 <= t && t <= 70 || 97 <= t && t <= 102;
}
function Kp(t) {
  return 48 <= t && t <= 55;
}
function Zp(t) {
  return 48 <= t && t <= 57;
}
function Jp(t) {
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
          if (!Xp(t.charCodeAt(i)))
            return !1;
          r = !0;
        }
      return r && n !== "_";
    }
    if (n === "o") {
      for (i++; i < e; i++)
        if (n = t[i], n !== "_") {
          if (!Kp(t.charCodeAt(i)))
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
      if (!Zp(t.charCodeAt(i)))
        return !1;
      r = !0;
    }
  return !(!r || n === "_");
}
function Qp(t) {
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
function tg(t) {
  return Object.prototype.toString.call(t) === "[object Number]" && t % 1 === 0 && !Z.isNegativeZero(t);
}
var eg = new K("tag:yaml.org,2002:int", {
  kind: "scalar",
  resolve: Jp,
  construct: Qp,
  predicate: tg,
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
}), ig = new RegExp(
  // 2.5e4, 2.5 and integers
  "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
);
function rg(t) {
  return !(t === null || !ig.test(t) || // Quick hack to not allow integers end with `_`
  // Probably should update regexp & check speed
  t[t.length - 1] === "_");
}
function ng(t) {
  var e, i;
  return e = t.replace(/_/g, "").toLowerCase(), i = e[0] === "-" ? -1 : 1, "+-".indexOf(e[0]) >= 0 && (e = e.slice(1)), e === ".inf" ? i === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : e === ".nan" ? NaN : i * parseFloat(e, 10);
}
var og = /^[-+]?[0-9]+e/;
function sg(t, e) {
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
  else if (Z.isNegativeZero(t))
    return "-0.0";
  return i = t.toString(10), og.test(i) ? i.replace("e", ".e") : i;
}
function ag(t) {
  return Object.prototype.toString.call(t) === "[object Number]" && (t % 1 !== 0 || Z.isNegativeZero(t));
}
var lg = new K("tag:yaml.org,2002:float", {
  kind: "scalar",
  resolve: rg,
  construct: ng,
  predicate: ag,
  represent: sg,
  defaultStyle: "lowercase"
}), cg = Oa.extend({
  implicit: [
    jp,
    Vp,
    eg,
    lg
  ]
}), hg = cg, $a = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
), Ia = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
);
function ug(t) {
  return t === null ? !1 : $a.exec(t) !== null || Ia.exec(t) !== null;
}
function fg(t) {
  var e, i, r, n, o, s, a, l = 0, c = null, h, u, g;
  if (e = $a.exec(t), e === null && (e = Ia.exec(t)), e === null)
    throw new Error("Date resolve error");
  if (i = +e[1], r = +e[2] - 1, n = +e[3], !e[4])
    return new Date(Date.UTC(i, r, n));
  if (o = +e[4], s = +e[5], a = +e[6], e[7]) {
    for (l = e[7].slice(0, 3); l.length < 3; )
      l += "0";
    l = +l;
  }
  return e[9] && (h = +e[10], u = +(e[11] || 0), c = (h * 60 + u) * 6e4, e[9] === "-" && (c = -c)), g = new Date(Date.UTC(i, r, n, o, s, a, l)), c && g.setTime(g.getTime() - c), g;
}
function dg(t) {
  return t.toISOString();
}
var pg = new K("tag:yaml.org,2002:timestamp", {
  kind: "scalar",
  resolve: ug,
  construct: fg,
  instanceOf: Date,
  represent: dg
});
function gg(t) {
  return t === "<<" || t === null;
}
var mg = new K("tag:yaml.org,2002:merge", {
  kind: "scalar",
  resolve: gg
}), Wn = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
function _g(t) {
  if (t === null)
    return !1;
  var e, i, r = 0, n = t.length, o = Wn;
  for (i = 0; i < n; i++)
    if (e = o.indexOf(t.charAt(i)), !(e > 64)) {
      if (e < 0)
        return !1;
      r += 6;
    }
  return r % 8 === 0;
}
function yg(t) {
  var e, i, r = t.replace(/[\r\n=]/g, ""), n = r.length, o = Wn, s = 0, a = [];
  for (e = 0; e < n; e++)
    e % 4 === 0 && e && (a.push(s >> 16 & 255), a.push(s >> 8 & 255), a.push(s & 255)), s = s << 6 | o.indexOf(r.charAt(e));
  return i = n % 4 * 6, i === 0 ? (a.push(s >> 16 & 255), a.push(s >> 8 & 255), a.push(s & 255)) : i === 18 ? (a.push(s >> 10 & 255), a.push(s >> 2 & 255)) : i === 12 && a.push(s >> 4 & 255), new Uint8Array(a);
}
function Cg(t) {
  var e = "", i = 0, r, n, o = t.length, s = Wn;
  for (r = 0; r < o; r++)
    r % 3 === 0 && r && (e += s[i >> 18 & 63], e += s[i >> 12 & 63], e += s[i >> 6 & 63], e += s[i & 63]), i = (i << 8) + t[r];
  return n = o % 3, n === 0 ? (e += s[i >> 18 & 63], e += s[i >> 12 & 63], e += s[i >> 6 & 63], e += s[i & 63]) : n === 2 ? (e += s[i >> 10 & 63], e += s[i >> 4 & 63], e += s[i << 2 & 63], e += s[64]) : n === 1 && (e += s[i >> 2 & 63], e += s[i << 4 & 63], e += s[64], e += s[64]), e;
}
function bg(t) {
  return Object.prototype.toString.call(t) === "[object Uint8Array]";
}
var xg = new K("tag:yaml.org,2002:binary", {
  kind: "scalar",
  resolve: _g,
  construct: yg,
  predicate: bg,
  represent: Cg
}), Tg = Object.prototype.hasOwnProperty, vg = Object.prototype.toString;
function Sg(t) {
  if (t === null)
    return !0;
  var e = [], i, r, n, o, s, a = t;
  for (i = 0, r = a.length; i < r; i += 1) {
    if (n = a[i], s = !1, vg.call(n) !== "[object Object]")
      return !1;
    for (o in n)
      if (Tg.call(n, o))
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
function kg(t) {
  return t !== null ? t : [];
}
var wg = new K("tag:yaml.org,2002:omap", {
  kind: "sequence",
  resolve: Sg,
  construct: kg
}), Bg = Object.prototype.toString;
function Lg(t) {
  if (t === null)
    return !0;
  var e, i, r, n, o, s = t;
  for (o = new Array(s.length), e = 0, i = s.length; e < i; e += 1) {
    if (r = s[e], Bg.call(r) !== "[object Object]" || (n = Object.keys(r), n.length !== 1))
      return !1;
    o[e] = [n[0], r[n[0]]];
  }
  return !0;
}
function Ag(t) {
  if (t === null)
    return [];
  var e, i, r, n, o, s = t;
  for (o = new Array(s.length), e = 0, i = s.length; e < i; e += 1)
    r = s[e], n = Object.keys(r), o[e] = [n[0], r[n[0]]];
  return o;
}
var Eg = new K("tag:yaml.org,2002:pairs", {
  kind: "sequence",
  resolve: Lg,
  construct: Ag
}), Fg = Object.prototype.hasOwnProperty;
function Mg(t) {
  if (t === null)
    return !0;
  var e, i = t;
  for (e in i)
    if (Fg.call(i, e) && i[e] !== null)
      return !1;
  return !0;
}
function Og(t) {
  return t !== null ? t : {};
}
var $g = new K("tag:yaml.org,2002:set", {
  kind: "mapping",
  resolve: Mg,
  construct: Og
}), Ig = hg.extend({
  implicit: [
    pg,
    mg
  ],
  explicit: [
    xg,
    wg,
    Eg,
    $g
  ]
}), Wt = Object.prototype.hasOwnProperty, Ki = 1, Da = 2, Na = 3, Zi = 4, Kr = 1, Dg = 2, is = 3, Ng = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, Rg = /[\x85\u2028\u2029]/, zg = /[,\[\]\{\}]/, Ra = /^(?:!|!!|![a-z\-]+!)$/i, za = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
function rs(t) {
  return Object.prototype.toString.call(t);
}
function Tt(t) {
  return t === 10 || t === 13;
}
function Jt(t) {
  return t === 9 || t === 32;
}
function it(t) {
  return t === 9 || t === 32 || t === 10 || t === 13;
}
function _e(t) {
  return t === 44 || t === 91 || t === 93 || t === 123 || t === 125;
}
function Pg(t) {
  var e;
  return 48 <= t && t <= 57 ? t - 48 : (e = t | 32, 97 <= e && e <= 102 ? e - 97 + 10 : -1);
}
function Wg(t) {
  return t === 120 ? 2 : t === 117 ? 4 : t === 85 ? 8 : 0;
}
function Hg(t) {
  return 48 <= t && t <= 57 ? t - 48 : -1;
}
function ns(t) {
  return t === 48 ? "\0" : t === 97 ? "\x07" : t === 98 ? "\b" : t === 116 || t === 9 ? "	" : t === 110 ? `
` : t === 118 ? "\v" : t === 102 ? "\f" : t === 114 ? "\r" : t === 101 ? "\x1B" : t === 32 ? " " : t === 34 ? '"' : t === 47 ? "/" : t === 92 ? "\\" : t === 78 ? "" : t === 95 ? " " : t === 76 ? "\u2028" : t === 80 ? "\u2029" : "";
}
function qg(t) {
  return t <= 65535 ? String.fromCharCode(t) : String.fromCharCode(
    (t - 65536 >> 10) + 55296,
    (t - 65536 & 1023) + 56320
  );
}
var Pa = new Array(256), Wa = new Array(256);
for (var fe = 0; fe < 256; fe++)
  Pa[fe] = ns(fe) ? 1 : 0, Wa[fe] = ns(fe);
function jg(t, e) {
  this.input = t, this.filename = e.filename || null, this.schema = e.schema || Ig, this.onWarning = e.onWarning || null, this.legacy = e.legacy || !1, this.json = e.json || !1, this.listener = e.listener || null, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = t.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.firstTabInLine = -1, this.documents = [];
}
function Ha(t, e) {
  var i = {
    name: t.filename,
    buffer: t.input.slice(0, -1),
    // omit trailing \0
    position: t.position,
    line: t.line,
    column: t.position - t.lineStart
  };
  return i.snippet = Fp(i), new Lt(e, i);
}
function S(t, e) {
  throw Ha(t, e);
}
function Ji(t, e) {
  t.onWarning && t.onWarning.call(null, Ha(t, e));
}
var os = {
  YAML: function(e, i, r) {
    var n, o, s;
    e.version !== null && S(e, "duplication of %YAML directive"), r.length !== 1 && S(e, "YAML directive accepts exactly one argument"), n = /^([0-9]+)\.([0-9]+)$/.exec(r[0]), n === null && S(e, "ill-formed argument of the YAML directive"), o = parseInt(n[1], 10), s = parseInt(n[2], 10), o !== 1 && S(e, "unacceptable YAML version of the document"), e.version = r[0], e.checkLineBreaks = s < 2, s !== 1 && s !== 2 && Ji(e, "unsupported YAML version of the document");
  },
  TAG: function(e, i, r) {
    var n, o;
    r.length !== 2 && S(e, "TAG directive accepts exactly two arguments"), n = r[0], o = r[1], Ra.test(n) || S(e, "ill-formed tag handle (first argument) of the TAG directive"), Wt.call(e.tagMap, n) && S(e, 'there is a previously declared suffix for "' + n + '" tag handle'), za.test(o) || S(e, "ill-formed tag prefix (second argument) of the TAG directive");
    try {
      o = decodeURIComponent(o);
    } catch {
      S(e, "tag prefix is malformed: " + o);
    }
    e.tagMap[n] = o;
  }
};
function zt(t, e, i, r) {
  var n, o, s, a;
  if (e < i) {
    if (a = t.input.slice(e, i), r)
      for (n = 0, o = a.length; n < o; n += 1)
        s = a.charCodeAt(n), s === 9 || 32 <= s && s <= 1114111 || S(t, "expected valid JSON character");
    else
      Ng.test(a) && S(t, "the stream contains non-printable characters");
    t.result += a;
  }
}
function ss(t, e, i, r) {
  var n, o, s, a;
  for (Z.isObject(i) || S(t, "cannot merge mappings; the provided source object is unacceptable"), n = Object.keys(i), s = 0, a = n.length; s < a; s += 1)
    o = n[s], Wt.call(e, o) || (e[o] = i[o], r[o] = !0);
}
function ye(t, e, i, r, n, o, s, a, l) {
  var c, h;
  if (Array.isArray(n))
    for (n = Array.prototype.slice.call(n), c = 0, h = n.length; c < h; c += 1)
      Array.isArray(n[c]) && S(t, "nested arrays are not supported inside keys"), typeof n == "object" && rs(n[c]) === "[object Object]" && (n[c] = "[object Object]");
  if (typeof n == "object" && rs(n) === "[object Object]" && (n = "[object Object]"), n = String(n), e === null && (e = {}), r === "tag:yaml.org,2002:merge")
    if (Array.isArray(o))
      for (c = 0, h = o.length; c < h; c += 1)
        ss(t, e, o[c], i);
    else
      ss(t, e, o, i);
  else
    !t.json && !Wt.call(i, n) && Wt.call(e, n) && (t.line = s || t.line, t.lineStart = a || t.lineStart, t.position = l || t.position, S(t, "duplicated mapping key")), n === "__proto__" ? Object.defineProperty(e, n, {
      configurable: !0,
      enumerable: !0,
      writable: !0,
      value: o
    }) : e[n] = o, delete i[n];
  return e;
}
function Hn(t) {
  var e;
  e = t.input.charCodeAt(t.position), e === 10 ? t.position++ : e === 13 ? (t.position++, t.input.charCodeAt(t.position) === 10 && t.position++) : S(t, "a line break is expected"), t.line += 1, t.lineStart = t.position, t.firstTabInLine = -1;
}
function W(t, e, i) {
  for (var r = 0, n = t.input.charCodeAt(t.position); n !== 0; ) {
    for (; Jt(n); )
      n === 9 && t.firstTabInLine === -1 && (t.firstTabInLine = t.position), n = t.input.charCodeAt(++t.position);
    if (e && n === 35)
      do
        n = t.input.charCodeAt(++t.position);
      while (n !== 10 && n !== 13 && n !== 0);
    if (Tt(n))
      for (Hn(t), n = t.input.charCodeAt(t.position), r++, t.lineIndent = 0; n === 32; )
        t.lineIndent++, n = t.input.charCodeAt(++t.position);
    else
      break;
  }
  return i !== -1 && r !== 0 && t.lineIndent < i && Ji(t, "deficient indentation"), r;
}
function _r(t) {
  var e = t.position, i;
  return i = t.input.charCodeAt(e), !!((i === 45 || i === 46) && i === t.input.charCodeAt(e + 1) && i === t.input.charCodeAt(e + 2) && (e += 3, i = t.input.charCodeAt(e), i === 0 || it(i)));
}
function qn(t, e) {
  e === 1 ? t.result += " " : e > 1 && (t.result += Z.repeat(`
`, e - 1));
}
function Ug(t, e, i) {
  var r, n, o, s, a, l, c, h, u = t.kind, g = t.result, d;
  if (d = t.input.charCodeAt(t.position), it(d) || _e(d) || d === 35 || d === 38 || d === 42 || d === 33 || d === 124 || d === 62 || d === 39 || d === 34 || d === 37 || d === 64 || d === 96 || (d === 63 || d === 45) && (n = t.input.charCodeAt(t.position + 1), it(n) || i && _e(n)))
    return !1;
  for (t.kind = "scalar", t.result = "", o = s = t.position, a = !1; d !== 0; ) {
    if (d === 58) {
      if (n = t.input.charCodeAt(t.position + 1), it(n) || i && _e(n))
        break;
    } else if (d === 35) {
      if (r = t.input.charCodeAt(t.position - 1), it(r))
        break;
    } else {
      if (t.position === t.lineStart && _r(t) || i && _e(d))
        break;
      if (Tt(d))
        if (l = t.line, c = t.lineStart, h = t.lineIndent, W(t, !1, -1), t.lineIndent >= e) {
          a = !0, d = t.input.charCodeAt(t.position);
          continue;
        } else {
          t.position = s, t.line = l, t.lineStart = c, t.lineIndent = h;
          break;
        }
    }
    a && (zt(t, o, s, !1), qn(t, t.line - l), o = s = t.position, a = !1), Jt(d) || (s = t.position + 1), d = t.input.charCodeAt(++t.position);
  }
  return zt(t, o, s, !1), t.result ? !0 : (t.kind = u, t.result = g, !1);
}
function Gg(t, e) {
  var i, r, n;
  if (i = t.input.charCodeAt(t.position), i !== 39)
    return !1;
  for (t.kind = "scalar", t.result = "", t.position++, r = n = t.position; (i = t.input.charCodeAt(t.position)) !== 0; )
    if (i === 39)
      if (zt(t, r, t.position, !0), i = t.input.charCodeAt(++t.position), i === 39)
        r = t.position, t.position++, n = t.position;
      else
        return !0;
    else
      Tt(i) ? (zt(t, r, n, !0), qn(t, W(t, !1, e)), r = n = t.position) : t.position === t.lineStart && _r(t) ? S(t, "unexpected end of the document within a single quoted scalar") : (t.position++, n = t.position);
  S(t, "unexpected end of the stream within a single quoted scalar");
}
function Yg(t, e) {
  var i, r, n, o, s, a;
  if (a = t.input.charCodeAt(t.position), a !== 34)
    return !1;
  for (t.kind = "scalar", t.result = "", t.position++, i = r = t.position; (a = t.input.charCodeAt(t.position)) !== 0; ) {
    if (a === 34)
      return zt(t, i, t.position, !0), t.position++, !0;
    if (a === 92) {
      if (zt(t, i, t.position, !0), a = t.input.charCodeAt(++t.position), Tt(a))
        W(t, !1, e);
      else if (a < 256 && Pa[a])
        t.result += Wa[a], t.position++;
      else if ((s = Wg(a)) > 0) {
        for (n = s, o = 0; n > 0; n--)
          a = t.input.charCodeAt(++t.position), (s = Pg(a)) >= 0 ? o = (o << 4) + s : S(t, "expected hexadecimal character");
        t.result += qg(o), t.position++;
      } else
        S(t, "unknown escape sequence");
      i = r = t.position;
    } else
      Tt(a) ? (zt(t, i, r, !0), qn(t, W(t, !1, e)), i = r = t.position) : t.position === t.lineStart && _r(t) ? S(t, "unexpected end of the document within a double quoted scalar") : (t.position++, r = t.position);
  }
  S(t, "unexpected end of the stream within a double quoted scalar");
}
function Vg(t, e) {
  var i = !0, r, n, o, s = t.tag, a, l = t.anchor, c, h, u, g, d, _ = /* @__PURE__ */ Object.create(null), T, w, L, y;
  if (y = t.input.charCodeAt(t.position), y === 91)
    h = 93, d = !1, a = [];
  else if (y === 123)
    h = 125, d = !0, a = {};
  else
    return !1;
  for (t.anchor !== null && (t.anchorMap[t.anchor] = a), y = t.input.charCodeAt(++t.position); y !== 0; ) {
    if (W(t, !0, e), y = t.input.charCodeAt(t.position), y === h)
      return t.position++, t.tag = s, t.anchor = l, t.kind = d ? "mapping" : "sequence", t.result = a, !0;
    i ? y === 44 && S(t, "expected the node content, but found ','") : S(t, "missed comma between flow collection entries"), w = T = L = null, u = g = !1, y === 63 && (c = t.input.charCodeAt(t.position + 1), it(c) && (u = g = !0, t.position++, W(t, !0, e))), r = t.line, n = t.lineStart, o = t.position, ve(t, e, Ki, !1, !0), w = t.tag, T = t.result, W(t, !0, e), y = t.input.charCodeAt(t.position), (g || t.line === r) && y === 58 && (u = !0, y = t.input.charCodeAt(++t.position), W(t, !0, e), ve(t, e, Ki, !1, !0), L = t.result), d ? ye(t, a, _, w, T, L, r, n, o) : u ? a.push(ye(t, null, _, w, T, L, r, n, o)) : a.push(T), W(t, !0, e), y = t.input.charCodeAt(t.position), y === 44 ? (i = !0, y = t.input.charCodeAt(++t.position)) : i = !1;
  }
  S(t, "unexpected end of the stream within a flow collection");
}
function Xg(t, e) {
  var i, r, n = Kr, o = !1, s = !1, a = e, l = 0, c = !1, h, u;
  if (u = t.input.charCodeAt(t.position), u === 124)
    r = !1;
  else if (u === 62)
    r = !0;
  else
    return !1;
  for (t.kind = "scalar", t.result = ""; u !== 0; )
    if (u = t.input.charCodeAt(++t.position), u === 43 || u === 45)
      Kr === n ? n = u === 43 ? is : Dg : S(t, "repeat of a chomping mode identifier");
    else if ((h = Hg(u)) >= 0)
      h === 0 ? S(t, "bad explicit indentation width of a block scalar; it cannot be less than one") : s ? S(t, "repeat of an indentation width identifier") : (a = e + h - 1, s = !0);
    else
      break;
  if (Jt(u)) {
    do
      u = t.input.charCodeAt(++t.position);
    while (Jt(u));
    if (u === 35)
      do
        u = t.input.charCodeAt(++t.position);
      while (!Tt(u) && u !== 0);
  }
  for (; u !== 0; ) {
    for (Hn(t), t.lineIndent = 0, u = t.input.charCodeAt(t.position); (!s || t.lineIndent < a) && u === 32; )
      t.lineIndent++, u = t.input.charCodeAt(++t.position);
    if (!s && t.lineIndent > a && (a = t.lineIndent), Tt(u)) {
      l++;
      continue;
    }
    if (t.lineIndent < a) {
      n === is ? t.result += Z.repeat(`
`, o ? 1 + l : l) : n === Kr && o && (t.result += `
`);
      break;
    }
    for (r ? Jt(u) ? (c = !0, t.result += Z.repeat(`
`, o ? 1 + l : l)) : c ? (c = !1, t.result += Z.repeat(`
`, l + 1)) : l === 0 ? o && (t.result += " ") : t.result += Z.repeat(`
`, l) : t.result += Z.repeat(`
`, o ? 1 + l : l), o = !0, s = !0, l = 0, i = t.position; !Tt(u) && u !== 0; )
      u = t.input.charCodeAt(++t.position);
    zt(t, i, t.position, !1);
  }
  return !0;
}
function as(t, e) {
  var i, r = t.tag, n = t.anchor, o = [], s, a = !1, l;
  if (t.firstTabInLine !== -1)
    return !1;
  for (t.anchor !== null && (t.anchorMap[t.anchor] = o), l = t.input.charCodeAt(t.position); l !== 0 && (t.firstTabInLine !== -1 && (t.position = t.firstTabInLine, S(t, "tab characters must not be used in indentation")), !(l !== 45 || (s = t.input.charCodeAt(t.position + 1), !it(s)))); ) {
    if (a = !0, t.position++, W(t, !0, -1) && t.lineIndent <= e) {
      o.push(null), l = t.input.charCodeAt(t.position);
      continue;
    }
    if (i = t.line, ve(t, e, Na, !1, !0), o.push(t.result), W(t, !0, -1), l = t.input.charCodeAt(t.position), (t.line === i || t.lineIndent > e) && l !== 0)
      S(t, "bad indentation of a sequence entry");
    else if (t.lineIndent < e)
      break;
  }
  return a ? (t.tag = r, t.anchor = n, t.kind = "sequence", t.result = o, !0) : !1;
}
function Kg(t, e, i) {
  var r, n, o, s, a, l, c = t.tag, h = t.anchor, u = {}, g = /* @__PURE__ */ Object.create(null), d = null, _ = null, T = null, w = !1, L = !1, y;
  if (t.firstTabInLine !== -1)
    return !1;
  for (t.anchor !== null && (t.anchorMap[t.anchor] = u), y = t.input.charCodeAt(t.position); y !== 0; ) {
    if (!w && t.firstTabInLine !== -1 && (t.position = t.firstTabInLine, S(t, "tab characters must not be used in indentation")), r = t.input.charCodeAt(t.position + 1), o = t.line, (y === 63 || y === 58) && it(r))
      y === 63 ? (w && (ye(t, u, g, d, _, null, s, a, l), d = _ = T = null), L = !0, w = !0, n = !0) : w ? (w = !1, n = !0) : S(t, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), t.position += 1, y = r;
    else {
      if (s = t.line, a = t.lineStart, l = t.position, !ve(t, i, Da, !1, !0))
        break;
      if (t.line === o) {
        for (y = t.input.charCodeAt(t.position); Jt(y); )
          y = t.input.charCodeAt(++t.position);
        if (y === 58)
          y = t.input.charCodeAt(++t.position), it(y) || S(t, "a whitespace character is expected after the key-value separator within a block mapping"), w && (ye(t, u, g, d, _, null, s, a, l), d = _ = T = null), L = !0, w = !1, n = !1, d = t.tag, _ = t.result;
        else if (L)
          S(t, "can not read an implicit mapping pair; a colon is missed");
        else
          return t.tag = c, t.anchor = h, !0;
      } else if (L)
        S(t, "can not read a block mapping entry; a multiline key may not be an implicit key");
      else
        return t.tag = c, t.anchor = h, !0;
    }
    if ((t.line === o || t.lineIndent > e) && (w && (s = t.line, a = t.lineStart, l = t.position), ve(t, e, Zi, !0, n) && (w ? _ = t.result : T = t.result), w || (ye(t, u, g, d, _, T, s, a, l), d = _ = T = null), W(t, !0, -1), y = t.input.charCodeAt(t.position)), (t.line === o || t.lineIndent > e) && y !== 0)
      S(t, "bad indentation of a mapping entry");
    else if (t.lineIndent < e)
      break;
  }
  return w && ye(t, u, g, d, _, null, s, a, l), L && (t.tag = c, t.anchor = h, t.kind = "mapping", t.result = u), L;
}
function Zg(t) {
  var e, i = !1, r = !1, n, o, s;
  if (s = t.input.charCodeAt(t.position), s !== 33)
    return !1;
  if (t.tag !== null && S(t, "duplication of a tag property"), s = t.input.charCodeAt(++t.position), s === 60 ? (i = !0, s = t.input.charCodeAt(++t.position)) : s === 33 ? (r = !0, n = "!!", s = t.input.charCodeAt(++t.position)) : n = "!", e = t.position, i) {
    do
      s = t.input.charCodeAt(++t.position);
    while (s !== 0 && s !== 62);
    t.position < t.length ? (o = t.input.slice(e, t.position), s = t.input.charCodeAt(++t.position)) : S(t, "unexpected end of the stream within a verbatim tag");
  } else {
    for (; s !== 0 && !it(s); )
      s === 33 && (r ? S(t, "tag suffix cannot contain exclamation marks") : (n = t.input.slice(e - 1, t.position + 1), Ra.test(n) || S(t, "named tag handle cannot contain such characters"), r = !0, e = t.position + 1)), s = t.input.charCodeAt(++t.position);
    o = t.input.slice(e, t.position), zg.test(o) && S(t, "tag suffix cannot contain flow indicator characters");
  }
  o && !za.test(o) && S(t, "tag name cannot contain such characters: " + o);
  try {
    o = decodeURIComponent(o);
  } catch {
    S(t, "tag name is malformed: " + o);
  }
  return i ? t.tag = o : Wt.call(t.tagMap, n) ? t.tag = t.tagMap[n] + o : n === "!" ? t.tag = "!" + o : n === "!!" ? t.tag = "tag:yaml.org,2002:" + o : S(t, 'undeclared tag handle "' + n + '"'), !0;
}
function Jg(t) {
  var e, i;
  if (i = t.input.charCodeAt(t.position), i !== 38)
    return !1;
  for (t.anchor !== null && S(t, "duplication of an anchor property"), i = t.input.charCodeAt(++t.position), e = t.position; i !== 0 && !it(i) && !_e(i); )
    i = t.input.charCodeAt(++t.position);
  return t.position === e && S(t, "name of an anchor node must contain at least one character"), t.anchor = t.input.slice(e, t.position), !0;
}
function Qg(t) {
  var e, i, r;
  if (r = t.input.charCodeAt(t.position), r !== 42)
    return !1;
  for (r = t.input.charCodeAt(++t.position), e = t.position; r !== 0 && !it(r) && !_e(r); )
    r = t.input.charCodeAt(++t.position);
  return t.position === e && S(t, "name of an alias node must contain at least one character"), i = t.input.slice(e, t.position), Wt.call(t.anchorMap, i) || S(t, 'unidentified alias "' + i + '"'), t.result = t.anchorMap[i], W(t, !0, -1), !0;
}
function ve(t, e, i, r, n) {
  var o, s, a, l = 1, c = !1, h = !1, u, g, d, _, T, w;
  if (t.listener !== null && t.listener("open", t), t.tag = null, t.anchor = null, t.kind = null, t.result = null, o = s = a = Zi === i || Na === i, r && W(t, !0, -1) && (c = !0, t.lineIndent > e ? l = 1 : t.lineIndent === e ? l = 0 : t.lineIndent < e && (l = -1)), l === 1)
    for (; Zg(t) || Jg(t); )
      W(t, !0, -1) ? (c = !0, a = o, t.lineIndent > e ? l = 1 : t.lineIndent === e ? l = 0 : t.lineIndent < e && (l = -1)) : a = !1;
  if (a && (a = c || n), (l === 1 || Zi === i) && (Ki === i || Da === i ? T = e : T = e + 1, w = t.position - t.lineStart, l === 1 ? a && (as(t, w) || Kg(t, w, T)) || Vg(t, T) ? h = !0 : (s && Xg(t, T) || Gg(t, T) || Yg(t, T) ? h = !0 : Qg(t) ? (h = !0, (t.tag !== null || t.anchor !== null) && S(t, "alias node should not have any properties")) : Ug(t, T, Ki === i) && (h = !0, t.tag === null && (t.tag = "?")), t.anchor !== null && (t.anchorMap[t.anchor] = t.result)) : l === 0 && (h = a && as(t, w))), t.tag === null)
    t.anchor !== null && (t.anchorMap[t.anchor] = t.result);
  else if (t.tag === "?") {
    for (t.result !== null && t.kind !== "scalar" && S(t, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + t.kind + '"'), u = 0, g = t.implicitTypes.length; u < g; u += 1)
      if (_ = t.implicitTypes[u], _.resolve(t.result)) {
        t.result = _.construct(t.result), t.tag = _.tag, t.anchor !== null && (t.anchorMap[t.anchor] = t.result);
        break;
      }
  } else if (t.tag !== "!") {
    if (Wt.call(t.typeMap[t.kind || "fallback"], t.tag))
      _ = t.typeMap[t.kind || "fallback"][t.tag];
    else
      for (_ = null, d = t.typeMap.multi[t.kind || "fallback"], u = 0, g = d.length; u < g; u += 1)
        if (t.tag.slice(0, d[u].tag.length) === d[u].tag) {
          _ = d[u];
          break;
        }
    _ || S(t, "unknown tag !<" + t.tag + ">"), t.result !== null && _.kind !== t.kind && S(t, "unacceptable node kind for !<" + t.tag + '> tag; it should be "' + _.kind + '", not "' + t.kind + '"'), _.resolve(t.result, t.tag) ? (t.result = _.construct(t.result, t.tag), t.anchor !== null && (t.anchorMap[t.anchor] = t.result)) : S(t, "cannot resolve a node with !<" + t.tag + "> explicit tag");
  }
  return t.listener !== null && t.listener("close", t), t.tag !== null || t.anchor !== null || h;
}
function tm(t) {
  var e = t.position, i, r, n, o = !1, s;
  for (t.version = null, t.checkLineBreaks = t.legacy, t.tagMap = /* @__PURE__ */ Object.create(null), t.anchorMap = /* @__PURE__ */ Object.create(null); (s = t.input.charCodeAt(t.position)) !== 0 && (W(t, !0, -1), s = t.input.charCodeAt(t.position), !(t.lineIndent > 0 || s !== 37)); ) {
    for (o = !0, s = t.input.charCodeAt(++t.position), i = t.position; s !== 0 && !it(s); )
      s = t.input.charCodeAt(++t.position);
    for (r = t.input.slice(i, t.position), n = [], r.length < 1 && S(t, "directive name must not be less than one character in length"); s !== 0; ) {
      for (; Jt(s); )
        s = t.input.charCodeAt(++t.position);
      if (s === 35) {
        do
          s = t.input.charCodeAt(++t.position);
        while (s !== 0 && !Tt(s));
        break;
      }
      if (Tt(s))
        break;
      for (i = t.position; s !== 0 && !it(s); )
        s = t.input.charCodeAt(++t.position);
      n.push(t.input.slice(i, t.position));
    }
    s !== 0 && Hn(t), Wt.call(os, r) ? os[r](t, r, n) : Ji(t, 'unknown document directive "' + r + '"');
  }
  if (W(t, !0, -1), t.lineIndent === 0 && t.input.charCodeAt(t.position) === 45 && t.input.charCodeAt(t.position + 1) === 45 && t.input.charCodeAt(t.position + 2) === 45 ? (t.position += 3, W(t, !0, -1)) : o && S(t, "directives end mark is expected"), ve(t, t.lineIndent - 1, Zi, !1, !0), W(t, !0, -1), t.checkLineBreaks && Rg.test(t.input.slice(e, t.position)) && Ji(t, "non-ASCII line breaks are interpreted as content"), t.documents.push(t.result), t.position === t.lineStart && _r(t)) {
    t.input.charCodeAt(t.position) === 46 && (t.position += 3, W(t, !0, -1));
    return;
  }
  if (t.position < t.length - 1)
    S(t, "end of the stream or a document separator is expected");
  else
    return;
}
function qa(t, e) {
  t = String(t), e = e || {}, t.length !== 0 && (t.charCodeAt(t.length - 1) !== 10 && t.charCodeAt(t.length - 1) !== 13 && (t += `
`), t.charCodeAt(0) === 65279 && (t = t.slice(1)));
  var i = new jg(t, e), r = t.indexOf("\0");
  for (r !== -1 && (i.position = r, S(i, "null byte is not allowed in input")), i.input += "\0"; i.input.charCodeAt(i.position) === 32; )
    i.lineIndent += 1, i.position += 1;
  for (; i.position < i.length - 1; )
    tm(i);
  return i.documents;
}
function em(t, e, i) {
  e !== null && typeof e == "object" && typeof i > "u" && (i = e, e = null);
  var r = qa(t, i);
  if (typeof e != "function")
    return r;
  for (var n = 0, o = r.length; n < o; n += 1)
    e(r[n]);
}
function im(t, e) {
  var i = qa(t, e);
  if (i.length !== 0) {
    if (i.length === 1)
      return i[0];
    throw new Lt("expected a single document in the stream, but found more");
  }
}
var rm = em, nm = im, om = {
  loadAll: rm,
  load: nm
}, sm = Oa, am = om.load;
const ja = /^-{3}\s*[\n\r](.*?)[\n\r]-{3}\s*[\n\r]+/s;
function lm(t, e) {
  var r, n;
  const i = t.match(ja);
  if (i) {
    const o = am(i[1], {
      // To keep things simple, only allow strings, arrays, and plain objects.
      // https://www.yaml.org/spec/1.2/spec.html#id2802346
      schema: sm
    });
    return o != null && o.title && ((r = e.setDiagramTitle) == null || r.call(e, o.title)), o != null && o.displayMode && ((n = e.setDisplayMode) == null || n.call(e, o.displayMode)), t.slice(i[0].length);
  } else
    return t;
}
const pn = function(t, e, i) {
  const { depth: r, clobber: n } = Object.assign({ depth: 2, clobber: !1 }, i);
  return Array.isArray(e) && !Array.isArray(t) ? (e.forEach((o) => pn(t, o, i)), t) : Array.isArray(e) && Array.isArray(t) ? (e.forEach((o) => {
    t.includes(o) || t.push(o);
  }), t) : t === void 0 || r <= 0 ? t != null && typeof t == "object" && typeof e == "object" ? Object.assign(t, e) : e : (e !== void 0 && typeof t == "object" && typeof e == "object" && Object.keys(e).forEach((o) => {
    typeof e[o] == "object" && (t[o] === void 0 || typeof t[o] == "object") ? (t[o] === void 0 && (t[o] = Array.isArray(e[o]) ? [] : {}), t[o] = pn(t[o], e[o], { depth: r - 1, clobber: n })) : (n || typeof t[o] != "object" && typeof e[o] != "object") && (t[o] = e[o]);
  }), t);
}, X = pn, Ze = Object.freeze(yp);
let tt = X({}, Ze), Ua, Se = [], qe = X({}, Ze);
const yr = (t, e) => {
  let i = X({}, t), r = {};
  for (const n of e)
    Ya(n), r = X(r, n);
  if (i = X(i, r), r.theme && r.theme in At) {
    const n = X({}, Ua), o = X(
      n.themeVariables || {},
      r.themeVariables
    );
    i.theme && i.theme in At && (i.themeVariables = At[i.theme].getThemeVariables(o));
  }
  return qe = i, Ka(qe), qe;
}, cm = (t) => (tt = X({}, Ze), tt = X(tt, t), t.theme && At[t.theme] && (tt.themeVariables = At[t.theme].getThemeVariables(t.themeVariables)), yr(tt, Se), tt), hm = (t) => {
  Ua = X({}, t);
}, um = (t) => (tt = X(tt, t), yr(tt, Se), tt), Ga = () => X({}, tt), fm = (t) => (Ka(t), X(qe, t), Mt()), Mt = () => X({}, qe), Ya = (t) => {
  ["secure", ...tt.secure ?? []].forEach((e) => {
    t[e] !== void 0 && (x.debug(`Denied attempt to modify a secure key ${e}`, t[e]), delete t[e]);
  }), Object.keys(t).forEach((e) => {
    e.indexOf("__") === 0 && delete t[e];
  }), Object.keys(t).forEach((e) => {
    typeof t[e] == "string" && (t[e].includes("<") || t[e].includes(">") || t[e].includes("url(data:")) && delete t[e], typeof t[e] == "object" && Ya(t[e]);
  });
}, Va = (t) => {
  t.fontFamily && (t.themeVariables ? t.themeVariables.fontFamily || (t.themeVariables = { fontFamily: t.fontFamily }) : t.themeVariables = { fontFamily: t.fontFamily }), Se.push(t), yr(tt, Se);
}, Qi = (t = tt) => {
  Se = [], yr(t, Se);
};
var Xa = /* @__PURE__ */ ((t) => (t.LAZY_LOAD_DEPRECATED = "The configuration options lazyLoadedDiagrams and loadExternalDiagramsAtStartup are deprecated. Please use registerExternalDiagrams instead.", t))(Xa || {});
const ls = {}, dm = (t) => {
  ls[t] || (x.warn(Xa[t]), ls[t] = !0);
}, Ka = (t) => {
  t && (t.lazyLoadedDiagrams || t.loadExternalDiagramsAtStartup) && dm("LAZY_LOAD_DEPRECATED");
}, pm = function(t, e) {
  for (let i of e)
    t.attr(i[0], i[1]);
}, gm = function(t, e, i) {
  let r = /* @__PURE__ */ new Map();
  return i ? (r.set("width", "100%"), r.set("style", `max-width: ${e}px;`)) : (r.set("height", t), r.set("width", e)), r;
}, mm = function(t, e, i, r) {
  const n = gm(e, i, r);
  pm(t, n);
}, _m = function(t, e, i, r) {
  const n = e.node().getBBox(), o = n.width, s = n.height;
  x.info(`SVG bounds: ${o}x${s}`, n);
  let a = 0, l = 0;
  x.info(`Graph bounds: ${a}x${l}`, t), a = o + i * 2, l = s + i * 2, x.info(`Calculated bounds: ${a}x${l}`), mm(e, l, a, r);
  const c = `${n.x - i} ${n.y - i} ${n.width + 2 * i} ${n.height + 2 * i}`;
  e.attr("viewBox", c);
}, Oi = {}, ym = (t, e, i) => {
  let r = "";
  return t in Oi && Oi[t] ? r = Oi[t](i) : x.warn(`No theme found for ${t}`), ` & {
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
}, Cm = (t, e) => {
  Oi[t] = e;
}, bm = ym;
let jn = "", Cr = "", Un = "";
const Gn = (t) => Xe(t, Mt()), Za = function() {
  jn = "", Un = "", Cr = "";
}, Ja = function(t) {
  jn = Gn(t).replace(/^\s+/g, "");
}, Qa = function() {
  return jn || Cr;
}, tl = function(t) {
  Un = Gn(t).replace(/\n\s+/g, `
`);
}, el = function() {
  return Un;
}, il = function(t) {
  Cr = Gn(t);
}, rl = function() {
  return Cr;
}, xm = {
  getAccTitle: Qa,
  setAccTitle: Ja,
  getDiagramTitle: rl,
  setDiagramTitle: il,
  getAccDescription: el,
  setAccDescription: tl,
  clear: Za
}, Tm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  clear: Za,
  default: xm,
  getAccDescription: el,
  getAccTitle: Qa,
  getDiagramTitle: rl,
  setAccDescription: tl,
  setAccTitle: Ja,
  setDiagramTitle: il
}, Symbol.toStringTag, { value: "Module" }));
let Yt = {};
const nl = function(t, e, i, r) {
  x.debug("parseDirective is being called", e, i, r);
  try {
    if (e !== void 0)
      switch (e = e.trim(), i) {
        case "open_directive":
          Yt = {};
          break;
        case "type_directive":
          if (!Yt)
            throw new Error("currentDirective is undefined");
          Yt.type = e.toLowerCase();
          break;
        case "arg_directive":
          if (!Yt)
            throw new Error("currentDirective is undefined");
          Yt.args = JSON.parse(e);
          break;
        case "close_directive":
          vm(t, Yt, r), Yt = void 0;
          break;
      }
  } catch (n) {
    x.error(
      `Error while rendering sequenceDiagram directive: ${e} jison context: ${i}`
    ), x.error(n.message);
  }
}, vm = function(t, e, i) {
  switch (x.info(`Directive type=${e.type} with args:`, e.args), e.type) {
    case "init":
    case "initialize": {
      ["config"].forEach((r) => {
        e.args[r] !== void 0 && (i === "flowchart-v2" && (i = "flowchart"), e.args[i] = e.args[r], delete e.args[r]);
      }), x.info("sanitize in handleDirective", e.args), we(e.args), x.info("sanitize in handleDirective (done)", e.args), Va(e.args);
      break;
    }
    case "wrap":
    case "nowrap":
      t && t.setWrap && t.setWrap(e.type === "wrap");
      break;
    case "themeCss":
      x.warn("themeCss encountered");
      break;
    default:
      x.warn(
        `Unhandled directive: source: '%%{${e.type}: ${JSON.stringify(
          e.args ? e.args : {}
        )}}%%`,
        e
      );
      break;
  }
}, Sm = x, km = wn, ol = Mt, wm = (t) => Xe(t, ol()), Bm = _m, Lm = () => Tm, Am = (t, e, i, r) => nl(t, e, i, r), tr = {}, er = (t, e, i) => {
  if (tr[t])
    throw new Error(`Diagram ${t} already registered.`);
  tr[t] = e, i && ll(t, i), Cm(t, e.styles), e.injectUtils && e.injectUtils(
    Sm,
    km,
    ol,
    wm,
    Bm,
    Lm(),
    Am
  );
}, Yn = (t) => {
  if (t in tr)
    return tr[t];
  throw new Error(`Diagram ${t} not found.`);
};
class sl extends Error {
  constructor(e) {
    super(e), this.name = "UnknownDiagramError";
  }
}
const Em = /%{2}{\s*(?:(\w+)\s*:|(\w+))\s*(?:(\w+)|((?:(?!}%{2}).|\r?\n)*))?\s*(?:}%{2})?/gi, Fm = /\s*%%.*\n/gm, ke = {}, br = function(t, e) {
  t = t.replace(ja, "").replace(Em, "").replace(Fm, `
`);
  for (const [i, { detector: r }] of Object.entries(ke))
    if (r(t, e))
      return i;
  throw new sl(
    `No diagram type detected matching given configuration for text: ${t}`
  );
}, al = (...t) => {
  for (const { id: e, detector: i, loader: r } of t)
    ll(e, i, r);
}, Mm = async () => {
  x.debug("Loading registered diagrams");
  const e = (await Promise.allSettled(
    Object.entries(ke).map(async ([i, { detector: r, loader: n }]) => {
      if (n)
        try {
          Yn(i);
        } catch {
          try {
            const { diagram: s, id: a } = await n();
            er(a, s, r);
          } catch (s) {
            throw x.error(`Failed to load external diagram with key ${i}. Removing from detectors.`), delete ke[i], s;
          }
        }
    })
  )).filter((i) => i.status === "rejected");
  if (e.length > 0) {
    x.error(`Failed to load ${e.length} external diagrams`);
    for (const i of e)
      x.error(i);
    throw new Error(`Failed to load ${e.length} external diagrams`);
  }
}, ll = (t, e, i) => {
  ke[t] ? x.error(`Detector with key ${t} already exists`) : ke[t] = { detector: e, loader: i }, x.debug(`Detector with key ${t} added${i ? " with loader" : ""}`);
}, Om = (t) => ke[t].loader;
var $m = typeof global == "object" && global && global.Object === Object && global;
const cl = $m;
var Im = typeof self == "object" && self && self.Object === Object && self, Dm = cl || Im || Function("return this")();
const Ht = Dm;
var Nm = Ht.Symbol;
const ir = Nm;
var hl = Object.prototype, Rm = hl.hasOwnProperty, zm = hl.toString, De = ir ? ir.toStringTag : void 0;
function Pm(t) {
  var e = Rm.call(t, De), i = t[De];
  try {
    t[De] = void 0;
    var r = !0;
  } catch {
  }
  var n = zm.call(t);
  return r && (e ? t[De] = i : delete t[De]), n;
}
var Wm = Object.prototype, Hm = Wm.toString;
function qm(t) {
  return Hm.call(t);
}
var jm = "[object Null]", Um = "[object Undefined]", cs = ir ? ir.toStringTag : void 0;
function ri(t) {
  return t == null ? t === void 0 ? Um : jm : cs && cs in Object(t) ? Pm(t) : qm(t);
}
function ul(t) {
  var e = typeof t;
  return t != null && (e == "object" || e == "function");
}
var Gm = "[object AsyncFunction]", Ym = "[object Function]", Vm = "[object GeneratorFunction]", Xm = "[object Proxy]";
function fl(t) {
  if (!ul(t))
    return !1;
  var e = ri(t);
  return e == Ym || e == Vm || e == Gm || e == Xm;
}
var Km = Ht["__core-js_shared__"];
const Zr = Km;
var hs = function() {
  var t = /[^.]+$/.exec(Zr && Zr.keys && Zr.keys.IE_PROTO || "");
  return t ? "Symbol(src)_1." + t : "";
}();
function Zm(t) {
  return !!hs && hs in t;
}
var Jm = Function.prototype, Qm = Jm.toString;
function re(t) {
  if (t != null) {
    try {
      return Qm.call(t);
    } catch {
    }
    try {
      return t + "";
    } catch {
    }
  }
  return "";
}
var t0 = /[\\^$.*+?()[\]{}|]/g, e0 = /^\[object .+?Constructor\]$/, i0 = Function.prototype, r0 = Object.prototype, n0 = i0.toString, o0 = r0.hasOwnProperty, s0 = RegExp(
  "^" + n0.call(o0).replace(t0, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function a0(t) {
  if (!ul(t) || Zm(t))
    return !1;
  var e = fl(t) ? s0 : e0;
  return e.test(re(t));
}
function l0(t, e) {
  return t == null ? void 0 : t[e];
}
function Le(t, e) {
  var i = l0(t, e);
  return a0(i) ? i : void 0;
}
var c0 = Le(Object, "create");
const Je = c0;
function h0() {
  this.__data__ = Je ? Je(null) : {}, this.size = 0;
}
function u0(t) {
  var e = this.has(t) && delete this.__data__[t];
  return this.size -= e ? 1 : 0, e;
}
var f0 = "__lodash_hash_undefined__", d0 = Object.prototype, p0 = d0.hasOwnProperty;
function g0(t) {
  var e = this.__data__;
  if (Je) {
    var i = e[t];
    return i === f0 ? void 0 : i;
  }
  return p0.call(e, t) ? e[t] : void 0;
}
var m0 = Object.prototype, _0 = m0.hasOwnProperty;
function y0(t) {
  var e = this.__data__;
  return Je ? e[t] !== void 0 : _0.call(e, t);
}
var C0 = "__lodash_hash_undefined__";
function b0(t, e) {
  var i = this.__data__;
  return this.size += this.has(t) ? 0 : 1, i[t] = Je && e === void 0 ? C0 : e, this;
}
function ee(t) {
  var e = -1, i = t == null ? 0 : t.length;
  for (this.clear(); ++e < i; ) {
    var r = t[e];
    this.set(r[0], r[1]);
  }
}
ee.prototype.clear = h0;
ee.prototype.delete = u0;
ee.prototype.get = g0;
ee.prototype.has = y0;
ee.prototype.set = b0;
function x0() {
  this.__data__ = [], this.size = 0;
}
function T0(t, e) {
  return t === e || t !== t && e !== e;
}
function xr(t, e) {
  for (var i = t.length; i--; )
    if (T0(t[i][0], e))
      return i;
  return -1;
}
var v0 = Array.prototype, S0 = v0.splice;
function k0(t) {
  var e = this.__data__, i = xr(e, t);
  if (i < 0)
    return !1;
  var r = e.length - 1;
  return i == r ? e.pop() : S0.call(e, i, 1), --this.size, !0;
}
function w0(t) {
  var e = this.__data__, i = xr(e, t);
  return i < 0 ? void 0 : e[i][1];
}
function B0(t) {
  return xr(this.__data__, t) > -1;
}
function L0(t, e) {
  var i = this.__data__, r = xr(i, t);
  return r < 0 ? (++this.size, i.push([t, e])) : i[r][1] = e, this;
}
function Ae(t) {
  var e = -1, i = t == null ? 0 : t.length;
  for (this.clear(); ++e < i; ) {
    var r = t[e];
    this.set(r[0], r[1]);
  }
}
Ae.prototype.clear = x0;
Ae.prototype.delete = k0;
Ae.prototype.get = w0;
Ae.prototype.has = B0;
Ae.prototype.set = L0;
var A0 = Le(Ht, "Map");
const rr = A0;
function E0() {
  this.size = 0, this.__data__ = {
    hash: new ee(),
    map: new (rr || Ae)(),
    string: new ee()
  };
}
function F0(t) {
  var e = typeof t;
  return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? t !== "__proto__" : t === null;
}
function Tr(t, e) {
  var i = t.__data__;
  return F0(e) ? i[typeof e == "string" ? "string" : "hash"] : i.map;
}
function M0(t) {
  var e = Tr(this, t).delete(t);
  return this.size -= e ? 1 : 0, e;
}
function O0(t) {
  return Tr(this, t).get(t);
}
function $0(t) {
  return Tr(this, t).has(t);
}
function I0(t, e) {
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
ne.prototype.clear = E0;
ne.prototype.delete = M0;
ne.prototype.get = O0;
ne.prototype.has = $0;
ne.prototype.set = I0;
var D0 = "Expected a function";
function ni(t, e) {
  if (typeof t != "function" || e != null && typeof e != "function")
    throw new TypeError(D0);
  var i = function() {
    var r = arguments, n = e ? e.apply(this, r) : r[0], o = i.cache;
    if (o.has(n))
      return o.get(n);
    var s = t.apply(this, r);
    return i.cache = o.set(n, s) || o, s;
  };
  return i.cache = new (ni.Cache || ne)(), i;
}
ni.Cache = ne;
const N0 = {
  curveBasis: Kf,
  curveBasisClosed: Zf,
  curveBasisOpen: Jf,
  curveBumpX: Vf,
  curveBumpY: Xf,
  curveBundle: Qf,
  curveCardinalClosed: ed,
  curveCardinalOpen: id,
  curveCardinal: td,
  curveCatmullRomClosed: nd,
  curveCatmullRomOpen: od,
  curveCatmullRom: rd,
  curveLinear: Yf,
  curveLinearClosed: sd,
  curveMonotoneX: ad,
  curveMonotoneY: ld,
  curveNatural: cd,
  curveStep: hd,
  curveStepAfter: fd,
  curveStepBefore: ud
}, Jr = /%{2}{\s*(?:(\w+)\s*:|(\w+))\s*(?:(\w+)|((?:(?!}%{2}).|\r?\n)*))?\s*(?:}%{2})?/gi, R0 = /\s*(?:(\w+)(?=:):|(\w+))\s*(?:(\w+)|((?:(?!}%{2}).|\r?\n)*))?\s*(?:}%{2})?/gi, z0 = function(t, e) {
  const i = dl(t, /(?:init\b)|(?:initialize\b)/);
  let r = {};
  if (Array.isArray(i)) {
    const n = i.map((o) => o.args);
    we(n), r = X(r, [...n]);
  } else
    r = i.args;
  if (r) {
    let n = br(t, e);
    ["config"].forEach((o) => {
      r[o] !== void 0 && (n === "flowchart-v2" && (n = "flowchart"), r[n] = r[o], delete r[o]);
    });
  }
  return r;
}, dl = function(t, e = null) {
  try {
    const i = new RegExp(
      `[%]{2}(?![{]${R0.source})(?=[}][%]{2}).*
`,
      "ig"
    );
    t = t.trim().replace(i, "").replace(/'/gm, '"'), x.debug(
      `Detecting diagram directive${e !== null ? " type:" + e : ""} based on the text:${t}`
    );
    let r;
    const n = [];
    for (; (r = Jr.exec(t)) !== null; )
      if (r.index === Jr.lastIndex && Jr.lastIndex++, r && !e || e && r[1] && r[1].match(e) || e && r[2] && r[2].match(e)) {
        const o = r[1] ? r[1] : r[2], s = r[3] ? r[3].trim() : r[4] ? JSON.parse(r[4].trim()) : null;
        n.push({ type: o, args: s });
      }
    return n.length === 0 && n.push({ type: t, args: null }), n.length === 1 ? n[0] : n;
  } catch (i) {
    return x.error(
      `ERROR: ${i.message} - Unable to parse directive
      ${e !== null ? " type:" + e : ""} based on the text:${t}`
    ), { type: null, args: null };
  }
}, P0 = function(t, e) {
  for (const [i, r] of e.entries())
    if (r.match(t))
      return i;
  return -1;
};
function W0(t, e) {
  if (!t)
    return e;
  const i = `curve${t.charAt(0).toUpperCase() + t.slice(1)}`;
  return N0[i] || e;
}
function H0(t, e) {
  const i = t.trim();
  if (i)
    return e.securityLevel !== "loose" ? $s(i) : i;
}
const q0 = (t, ...e) => {
  const i = t.split("."), r = i.length - 1, n = i[r];
  let o = window;
  for (let s = 0; s < r; s++)
    if (o = o[i[s]], !o)
      return;
  o[n](...e);
};
function nr(t, e) {
  return t && e ? Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2)) : 0;
}
function j0(t) {
  let e, i = 0;
  t.forEach((o) => {
    i += nr(o, e), e = o;
  });
  let r = i / 2, n;
  return e = void 0, t.forEach((o) => {
    if (e && !n) {
      const s = nr(o, e);
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
function U0(t) {
  return t.length === 1 ? t[0] : j0(t);
}
const G0 = (t, e, i) => {
  let r;
  x.info(`our points ${JSON.stringify(e)}`), e[0] !== i && (e = e.reverse());
  let o = 25, s;
  r = void 0, e.forEach((h) => {
    if (r && !s) {
      const u = nr(h, r);
      if (u < o)
        o -= u;
      else {
        const g = o / u;
        g <= 0 && (s = r), g >= 1 && (s = { x: h.x, y: h.y }), g > 0 && g < 1 && (s = {
          x: (1 - g) * r.x + g * h.x,
          y: (1 - g) * r.y + g * h.y
        });
      }
    }
    r = h;
  });
  const a = t ? 10 : 5, l = Math.atan2(e[0].y - s.y, e[0].x - s.x), c = { x: 0, y: 0 };
  return c.x = Math.sin(l) * a + (e[0].x + s.x) / 2, c.y = -Math.cos(l) * a + (e[0].y + s.y) / 2, c;
};
function Y0(t, e, i) {
  let r = JSON.parse(JSON.stringify(i)), n;
  x.info("our points", r), e !== "start_left" && e !== "start_right" && (r = r.reverse()), r.forEach((u) => {
    n = u;
  });
  let s = 25 + t, a;
  n = void 0, r.forEach((u) => {
    if (n && !a) {
      const g = nr(u, n);
      if (g < s)
        s -= g;
      else {
        const d = s / g;
        d <= 0 && (a = n), d >= 1 && (a = { x: u.x, y: u.y }), d > 0 && d < 1 && (a = {
          x: (1 - d) * n.x + d * u.x,
          y: (1 - d) * n.y + d * u.y
        });
      }
    }
    n = u;
  });
  const l = 10 + t * 0.5, c = Math.atan2(r[0].y - a.y, r[0].x - a.x), h = { x: 0, y: 0 };
  return h.x = Math.sin(c) * l + (r[0].x + a.x) / 2, h.y = -Math.cos(c) * l + (r[0].y + a.y) / 2, e === "start_left" && (h.x = Math.sin(c + Math.PI) * l + (r[0].x + a.x) / 2, h.y = -Math.cos(c + Math.PI) * l + (r[0].y + a.y) / 2), e === "end_right" && (h.x = Math.sin(c - Math.PI) * l + (r[0].x + a.x) / 2 - 5, h.y = -Math.cos(c - Math.PI) * l + (r[0].y + a.y) / 2 - 5), e === "end_left" && (h.x = Math.sin(c) * l + (r[0].x + a.x) / 2 - 5, h.y = -Math.cos(c) * l + (r[0].y + a.y) / 2 - 5), h;
}
function V0(t) {
  let e = "", i = "";
  for (const r of t)
    r !== void 0 && (r.startsWith("color:") || r.startsWith("text-align:") ? i = i + r + ";" : e = e + r + ";");
  return { style: e, labelStyle: i };
}
let us = 0;
const X0 = () => (us++, "id-" + Math.random().toString(36).substr(2, 12) + "-" + us);
function K0(t) {
  let e = "";
  const i = "0123456789abcdef", r = i.length;
  for (let n = 0; n < t; n++)
    e += i.charAt(Math.floor(Math.random() * r));
  return e;
}
const Z0 = (t) => K0(t.length), J0 = function() {
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
}, Q0 = function(t, e) {
  const i = e.text.replace(Pn.lineBreakRegex, " "), [, r] = Xn(e.fontSize), n = t.append("text");
  n.attr("x", e.x), n.attr("y", e.y), n.style("text-anchor", e.anchor), n.style("font-family", e.fontFamily), n.style("font-size", r), n.style("font-weight", e.fontWeight), n.attr("fill", e.fill), e.class !== void 0 && n.attr("class", e.class);
  const o = n.append("tspan");
  return o.attr("x", e.x + e.textMargin * 2), o.attr("fill", e.fill), o.text(i), n;
}, t_ = ni(
  (t, e, i) => {
    if (!t || (i = Object.assign(
      { fontSize: 12, fontWeight: 400, fontFamily: "Arial", joinWith: "<br/>" },
      i
    ), Pn.lineBreakRegex.test(t)))
      return t;
    const r = t.split(" "), n = [];
    let o = "";
    return r.forEach((s, a) => {
      const l = or(`${s} `, i), c = or(o, i);
      if (l > e) {
        const { hyphenatedStrings: g, remainingWord: d } = e_(s, e, "-", i);
        n.push(o, ...g), o = d;
      } else
        c + l >= e ? (n.push(o), o = s) : o = [o, s].filter(Boolean).join(" ");
      a + 1 === r.length && n.push(o);
    }), n.filter((s) => s !== "").join(i.joinWith);
  },
  (t, e, i) => `${t}${e}${i.fontSize}${i.fontWeight}${i.fontFamily}${i.joinWith}`
), e_ = ni(
  (t, e, i = "-", r) => {
    r = Object.assign(
      { fontSize: 12, fontWeight: 400, fontFamily: "Arial", margin: 0 },
      r
    );
    const n = [...t], o = [];
    let s = "";
    return n.forEach((a, l) => {
      const c = `${s}${a}`;
      if (or(c, r) >= e) {
        const u = l + 1, g = n.length === u, d = `${c}${i}`;
        o.push(g ? c : d), s = "";
      } else
        s = c;
    }), { hyphenatedStrings: o, remainingWord: s };
  },
  (t, e, i = "-", r) => `${t}${e}${i}${r.fontSize}${r.fontWeight}${r.fontFamily}`
);
function i_(t, e) {
  return e = Object.assign(
    { fontSize: 12, fontWeight: 400, fontFamily: "Arial", margin: 15 },
    e
  ), Vn(t, e).height;
}
function or(t, e) {
  return e = Object.assign({ fontSize: 12, fontWeight: 400, fontFamily: "Arial" }, e), Vn(t, e).width;
}
const Vn = ni(
  (t, e) => {
    e = Object.assign({ fontSize: 12, fontWeight: 400, fontFamily: "Arial" }, e);
    const { fontSize: i, fontFamily: r, fontWeight: n } = e;
    if (!t)
      return { width: 0, height: 0 };
    const [, o] = Xn(i), s = ["sans-serif", r], a = t.split(Pn.lineBreakRegex), l = [], c = bt("body");
    if (!c.remove)
      return { width: 0, height: 0, lineHeight: 0 };
    const h = c.append("svg");
    for (const g of s) {
      let d = 0;
      const _ = { width: 0, height: 0, lineHeight: 0 };
      for (const T of a) {
        const w = J0();
        w.text = T;
        const L = Q0(h, w).style("font-size", o).style("font-weight", n).style("font-family", g), y = (L._groups || L)[0][0].getBBox();
        if (y.width === 0 && y.height === 0)
          throw new Error("svg element not in render tree");
        _.width = Math.round(Math.max(_.width, y.width)), d = Math.round(y.height), _.height += d, _.lineHeight = Math.round(Math.max(_.lineHeight, d));
      }
      l.push(_);
    }
    h.remove();
    const u = isNaN(l[1].height) || isNaN(l[1].width) || isNaN(l[1].lineHeight) || l[0].height > l[1].height && l[0].width > l[1].width && l[0].lineHeight > l[1].lineHeight ? 0 : 1;
    return l[u];
  },
  (t, e) => `${t}${e.fontSize}${e.fontWeight}${e.fontFamily}`
), r_ = class {
  constructor(e, i) {
    this.deterministic = e, this.seed = i, this.count = i ? i.length : 0;
  }
  next() {
    return this.deterministic ? this.count++ : Date.now();
  }
};
let vi;
const n_ = function(t) {
  return vi = vi || document.createElement("div"), t = escape(t).replace(/%26/g, "&").replace(/%23/g, "#").replace(/%3B/g, ";"), vi.innerHTML = t, unescape(vi.textContent);
}, we = (t) => {
  if (x.debug("directiveSanitizer called with", t), typeof t == "object" && (t.length ? t.forEach((e) => we(e)) : Object.keys(t).forEach((e) => {
    x.debug("Checking key", e), e.startsWith("__") && (x.debug("sanitize deleting __ option", e), delete t[e]), e.includes("proto") && (x.debug("sanitize deleting proto option", e), delete t[e]), e.includes("constr") && (x.debug("sanitize deleting constr option", e), delete t[e]), e.includes("themeCSS") && (x.debug("sanitizing themeCss option"), t[e] = $i(t[e])), e.includes("fontFamily") && (x.debug("sanitizing fontFamily option"), t[e] = $i(t[e])), e.includes("altFontFamily") && (x.debug("sanitizing altFontFamily option"), t[e] = $i(t[e])), _p.includes(e) ? typeof t[e] == "object" && (x.debug("sanitize deleting object", e), we(t[e])) : (x.debug("sanitize deleting option", e), delete t[e]);
  })), t.themeVariables) {
    const e = Object.keys(t.themeVariables);
    for (const i of e) {
      const r = t.themeVariables[i];
      r && r.match && !r.match(/^[\d "#%(),.;A-Za-z]+$/) && (t.themeVariables[i] = "");
    }
  }
  x.debug("After sanitization", t);
}, $i = (t) => {
  let e = 0, i = 0;
  for (const r of t) {
    if (e < i)
      return "{ /* ERROR: Unbalanced CSS */ }";
    r === "{" ? e++ : r === "}" && i++;
  }
  return e !== i ? "{ /* ERROR: Unbalanced CSS */ }" : t;
};
function pl(t) {
  return "str" in t;
}
function o_(t) {
  return t instanceof Error ? t.message : String(t);
}
const s_ = (t, e, i, r) => {
  if (!r)
    return;
  const n = t.node().getBBox();
  t.append("text").text(r).attr("x", n.x + n.width / 2).attr("y", -i).attr("class", e);
}, Xn = (t) => {
  if (typeof t == "number")
    return [t, t + "px"];
  const e = parseInt(t, 10);
  return Number.isNaN(e) ? [void 0, void 0] : t === String(e) ? [e, t + "px"] : [e, t];
}, Ii = {
  assignWithDepth: X,
  wrapLabel: t_,
  calculateTextHeight: i_,
  calculateTextWidth: or,
  calculateTextDimensions: Vn,
  detectInit: z0,
  detectDirective: dl,
  isSubstringInArray: P0,
  interpolateToCurve: W0,
  calcLabelPosition: U0,
  calcCardinalityPosition: G0,
  calcTerminalLabelPosition: Y0,
  formatUrl: H0,
  getStylesFromArray: V0,
  generateId: X0,
  random: Z0,
  runFunc: q0,
  entityDecode: n_,
  initIdGenerator: r_,
  directiveSanitizer: we,
  sanitizeCss: $i,
  insertTitle: s_,
  parseFontSize: Xn
};
var gl = "comm", ml = "rule", _l = "decl", a_ = "@import", l_ = "@keyframes", c_ = Math.abs, Kn = String.fromCharCode;
function yl(t) {
  return t.trim();
}
function gn(t, e, i) {
  return t.replace(e, i);
}
function h_(t, e) {
  return t.indexOf(e);
}
function Qe(t, e) {
  return t.charCodeAt(e) | 0;
}
function ti(t, e, i) {
  return t.slice(e, i);
}
function Nt(t) {
  return t.length;
}
function Cl(t) {
  return t.length;
}
function Si(t, e) {
  return e.push(t), t;
}
var vr = 1, Be = 1, bl = 0, ut = 0, P = 0, Ee = "";
function Zn(t, e, i, r, n, o, s) {
  return { value: t, root: e, parent: i, type: r, props: n, children: o, line: vr, column: Be, length: s, return: "" };
}
function u_() {
  return P;
}
function f_() {
  return P = ut > 0 ? Qe(Ee, --ut) : 0, Be--, P === 10 && (Be = 1, vr--), P;
}
function mt() {
  return P = ut < bl ? Qe(Ee, ut++) : 0, Be++, P === 10 && (Be = 1, vr++), P;
}
function Qt() {
  return Qe(Ee, ut);
}
function Di() {
  return ut;
}
function Sr(t, e) {
  return ti(Ee, t, e);
}
function mn(t) {
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
function d_(t) {
  return vr = Be = 1, bl = Nt(Ee = t), ut = 0, [];
}
function p_(t) {
  return Ee = "", t;
}
function Qr(t) {
  return yl(Sr(ut - 1, _n(t === 91 ? t + 2 : t === 40 ? t + 1 : t)));
}
function g_(t) {
  for (; (P = Qt()) && P < 33; )
    mt();
  return mn(t) > 2 || mn(P) > 3 ? "" : " ";
}
function m_(t, e) {
  for (; --e && mt() && !(P < 48 || P > 102 || P > 57 && P < 65 || P > 70 && P < 97); )
    ;
  return Sr(t, Di() + (e < 6 && Qt() == 32 && mt() == 32));
}
function _n(t) {
  for (; mt(); )
    switch (P) {
      case t:
        return ut;
      case 34:
      case 39:
        t !== 34 && t !== 39 && _n(P);
        break;
      case 40:
        t === 41 && _n(t);
        break;
      case 92:
        mt();
        break;
    }
  return ut;
}
function __(t, e) {
  for (; mt() && t + P !== 47 + 10; )
    if (t + P === 42 + 42 && Qt() === 47)
      break;
  return "/*" + Sr(e, ut - 1) + "*" + Kn(t === 47 ? t : mt());
}
function y_(t) {
  for (; !mn(Qt()); )
    mt();
  return Sr(t, ut);
}
function C_(t) {
  return p_(Ni("", null, null, null, [""], t = d_(t), 0, [0], t));
}
function Ni(t, e, i, r, n, o, s, a, l) {
  for (var c = 0, h = 0, u = s, g = 0, d = 0, _ = 0, T = 1, w = 1, L = 1, y = 0, F = "", N = n, H = o, Y = r, O = F; w; )
    switch (_ = y, y = mt()) {
      case 40:
        if (_ != 108 && Qe(O, u - 1) == 58) {
          h_(O += gn(Qr(y), "&", "&\f"), "&\f") != -1 && (L = -1);
          break;
        }
      case 34:
      case 39:
      case 91:
        O += Qr(y);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        O += g_(_);
        break;
      case 92:
        O += m_(Di() - 1, 7);
        continue;
      case 47:
        switch (Qt()) {
          case 42:
          case 47:
            Si(b_(__(mt(), Di()), e, i), l);
            break;
          default:
            O += "/";
        }
        break;
      case 123 * T:
        a[c++] = Nt(O) * L;
      case 125 * T:
      case 59:
      case 0:
        switch (y) {
          case 0:
          case 125:
            w = 0;
          case 59 + h:
            d > 0 && Nt(O) - u && Si(d > 32 ? ds(O + ";", r, i, u - 1) : ds(gn(O, " ", "") + ";", r, i, u - 2), l);
            break;
          case 59:
            O += ";";
          default:
            if (Si(Y = fs(O, e, i, c, h, n, a, F, N = [], H = [], u), o), y === 123)
              if (h === 0)
                Ni(O, e, Y, Y, N, o, u, a, H);
              else
                switch (g === 99 && Qe(O, 3) === 110 ? 100 : g) {
                  case 100:
                  case 109:
                  case 115:
                    Ni(t, Y, Y, r && Si(fs(t, Y, Y, 0, 0, n, a, F, n, N = [], u), H), n, H, u, a, r ? N : H);
                    break;
                  default:
                    Ni(O, Y, Y, Y, [""], H, 0, a, H);
                }
        }
        c = h = d = 0, T = L = 1, F = O = "", u = s;
        break;
      case 58:
        u = 1 + Nt(O), d = _;
      default:
        if (T < 1) {
          if (y == 123)
            --T;
          else if (y == 125 && T++ == 0 && f_() == 125)
            continue;
        }
        switch (O += Kn(y), y * T) {
          case 38:
            L = h > 0 ? 1 : (O += "\f", -1);
            break;
          case 44:
            a[c++] = (Nt(O) - 1) * L, L = 1;
            break;
          case 64:
            Qt() === 45 && (O += Qr(mt())), g = Qt(), h = u = Nt(F = O += y_(Di())), y++;
            break;
          case 45:
            _ === 45 && Nt(O) == 2 && (T = 0);
        }
    }
  return o;
}
function fs(t, e, i, r, n, o, s, a, l, c, h) {
  for (var u = n - 1, g = n === 0 ? o : [""], d = Cl(g), _ = 0, T = 0, w = 0; _ < r; ++_)
    for (var L = 0, y = ti(t, u + 1, u = c_(T = s[_])), F = t; L < d; ++L)
      (F = yl(T > 0 ? g[L] + " " + y : gn(y, /&\f/g, g[L]))) && (l[w++] = F);
  return Zn(t, e, i, n === 0 ? ml : a, l, c, h);
}
function b_(t, e, i) {
  return Zn(t, e, i, gl, Kn(u_()), ti(t, 2, -2), 0);
}
function ds(t, e, i, r) {
  return Zn(t, e, i, _l, ti(t, 0, r), ti(t, r + 1, -1), r);
}
function yn(t, e) {
  for (var i = "", r = Cl(t), n = 0; n < r; n++)
    i += e(t[n], n, t, e) || "";
  return i;
}
function x_(t, e, i, r) {
  switch (t.type) {
    case a_:
    case _l:
      return t.return = t.return || t.value;
    case gl:
      return "";
    case l_:
      return t.return = t.value + "{" + yn(t.children, r) + "}";
    case ml:
      t.value = t.props.join(",");
  }
  return Nt(i = yn(t.children, r)) ? t.return = t.value + "{" + i + "}" : "";
}
const ps = "10.2.0-rc.2", xl = "c4", T_ = (t) => t.match(/^\s*C4Context|C4Container|C4Component|C4Dynamic|C4Deployment/) !== null, v_ = async () => {
  const { diagram: t } = await import("./c4Diagram-c876f6db.js");
  return { id: xl, diagram: t };
}, S_ = {
  id: xl,
  detector: T_,
  loader: v_
}, k_ = S_, Tl = "flowchart", w_ = (t, e) => {
  var i, r;
  return ((i = e == null ? void 0 : e.flowchart) == null ? void 0 : i.defaultRenderer) === "dagre-wrapper" || ((r = e == null ? void 0 : e.flowchart) == null ? void 0 : r.defaultRenderer) === "elk" ? !1 : t.match(/^\s*graph/) !== null;
}, B_ = async () => {
  const { diagram: t } = await import("./flowDiagram-c2d82f80.js");
  return { id: Tl, diagram: t };
}, L_ = {
  id: Tl,
  detector: w_,
  loader: B_
}, A_ = L_, vl = "flowchart-v2", E_ = (t, e) => {
  var i, r, n;
  return ((i = e == null ? void 0 : e.flowchart) == null ? void 0 : i.defaultRenderer) === "dagre-d3" || ((r = e == null ? void 0 : e.flowchart) == null ? void 0 : r.defaultRenderer) === "elk" ? !1 : t.match(/^\s*graph/) !== null && ((n = e == null ? void 0 : e.flowchart) == null ? void 0 : n.defaultRenderer) === "dagre-wrapper" ? !0 : t.match(/^\s*flowchart/) !== null;
}, F_ = async () => {
  const { diagram: t } = await import("./flowDiagram-v2-f3e78a93.js");
  return { id: vl, diagram: t };
}, M_ = {
  id: vl,
  detector: E_,
  loader: F_
}, O_ = M_, Sl = "er", $_ = (t) => t.match(/^\s*erDiagram/) !== null, I_ = async () => {
  const { diagram: t } = await import("./erDiagram-9456d8b5.js");
  return { id: Sl, diagram: t };
}, D_ = {
  id: Sl,
  detector: $_,
  loader: I_
}, N_ = D_, kl = "gitGraph", R_ = (t) => t.match(/^\s*gitGraph/) !== null, z_ = async () => {
  const { diagram: t } = await import("./gitGraphDiagram-a4e07274.js");
  return { id: kl, diagram: t };
}, P_ = {
  id: kl,
  detector: R_,
  loader: z_
}, W_ = P_, wl = "gantt", H_ = (t) => t.match(/^\s*gantt/) !== null, q_ = async () => {
  const { diagram: t } = await import("./ganttDiagram-3879534c.js");
  return { id: wl, diagram: t };
}, j_ = {
  id: wl,
  detector: H_,
  loader: q_
}, U_ = j_, Bl = "info", G_ = (t) => t.match(/^\s*info/) !== null, Y_ = async () => {
  const { diagram: t } = await import("./infoDiagram-1ed922be.js");
  return { id: Bl, diagram: t };
}, V_ = {
  id: Bl,
  detector: G_,
  loader: Y_
}, X_ = V_, Ll = "pie", K_ = (t) => t.match(/^\s*pie/) !== null, Z_ = async () => {
  const { diagram: t } = await import("./pieDiagram-afafb3ad.js");
  return { id: Ll, diagram: t };
}, J_ = {
  id: Ll,
  detector: K_,
  loader: Z_
}, Q_ = J_, Al = "requirement", ty = (t) => t.match(/^\s*requirement(Diagram)?/) !== null, ey = async () => {
  const { diagram: t } = await import("./requirementDiagram-e95169f7.js");
  return { id: Al, diagram: t };
}, iy = {
  id: Al,
  detector: ty,
  loader: ey
}, ry = iy, El = "sequence", ny = (t) => t.match(/^\s*sequenceDiagram/) !== null, oy = async () => {
  const { diagram: t } = await import("./sequenceDiagram-81e990df.js");
  return { id: El, diagram: t };
}, sy = {
  id: El,
  detector: ny,
  loader: oy
}, ay = sy, Fl = "class", ly = (t, e) => {
  var i;
  return ((i = e == null ? void 0 : e.class) == null ? void 0 : i.defaultRenderer) === "dagre-wrapper" ? !1 : t.match(/^\s*classDiagram/) !== null;
}, cy = async () => {
  const { diagram: t } = await import("./classDiagram-4a10da53.js");
  return { id: Fl, diagram: t };
}, hy = {
  id: Fl,
  detector: ly,
  loader: cy
}, uy = hy, Ml = "classDiagram", fy = (t, e) => {
  var i;
  return t.match(/^\s*classDiagram/) !== null && ((i = e == null ? void 0 : e.class) == null ? void 0 : i.defaultRenderer) === "dagre-wrapper" ? !0 : t.match(/^\s*classDiagram-v2/) !== null;
}, dy = async () => {
  const { diagram: t } = await import("./classDiagram-v2-92b33047.js");
  return { id: Ml, diagram: t };
}, py = {
  id: Ml,
  detector: fy,
  loader: dy
}, gy = py, Ol = "state", my = (t, e) => {
  var i;
  return ((i = e == null ? void 0 : e.state) == null ? void 0 : i.defaultRenderer) === "dagre-wrapper" ? !1 : t.match(/^\s*stateDiagram/) !== null;
}, _y = async () => {
  const { diagram: t } = await import("./stateDiagram-13e4fffc.js");
  return { id: Ol, diagram: t };
}, yy = {
  id: Ol,
  detector: my,
  loader: _y
}, Cy = yy, $l = "stateDiagram", by = (t, e) => {
  var i, r;
  return !!(t.match(/^\s*stateDiagram-v2/) !== null || t.match(/^\s*stateDiagram/) && ((i = e == null ? void 0 : e.state) == null ? void 0 : i.defaultRenderer) === "dagre-wrapper" || t.match(/^\s*stateDiagram/) && ((r = e == null ? void 0 : e.state) == null ? void 0 : r.defaultRenderer) === "dagre-wrapper");
}, xy = async () => {
  const { diagram: t } = await import("./stateDiagram-v2-6caac43d.js");
  return { id: $l, diagram: t };
}, Ty = {
  id: $l,
  detector: by,
  loader: xy
}, vy = Ty, Il = "journey", Sy = (t) => t.match(/^\s*journey/) !== null, ky = async () => {
  const { diagram: t } = await import("./journeyDiagram-e1054eca.js");
  return { id: Il, diagram: t };
}, wy = {
  id: Il,
  detector: Sy,
  loader: ky
}, By = wy, Ly = () => "", Ay = Ly, Ey = function() {
}, Fy = (t, e, i) => {
  try {
    x.debug(`Renering svg for syntax error
`);
    const r = bt("#" + e), n = r.append("g");
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
    x.error("Error while rendering info diagram"), x.error(o_(r));
  }
}, Dl = {
  setConf: Ey,
  draw: Fy
}, My = {
  db: {
    clear: () => {
    }
  },
  styles: Ay,
  renderer: Dl,
  parser: {
    parser: { yy: {} },
    parse: () => {
    }
  },
  init: () => {
  }
}, Oy = My, Nl = "flowchart-elk", $y = (t, e) => {
  var i;
  return (
    // If diagram explicitly states flowchart-elk
    !!(t.match(/^\s*flowchart-elk/) || // If a flowchart/graph diagram has their default renderer set to elk
    t.match(/^\s*flowchart|graph/) && ((i = e == null ? void 0 : e.flowchart) == null ? void 0 : i.defaultRenderer) === "elk")
  );
}, Iy = async () => {
  const { diagram: t } = await import("./flowchart-elk-definition-5ff46b8e.js");
  return { id: Nl, diagram: t };
}, Dy = {
  id: Nl,
  detector: $y,
  loader: Iy
}, Ny = Dy, Rl = "timeline", Ry = (t) => t.match(/^\s*timeline/) !== null, zy = async () => {
  const { diagram: t } = await import("./timeline-definition-fb5ca19e.js");
  return { id: Rl, diagram: t };
}, Py = {
  id: Rl,
  detector: Ry,
  loader: zy
}, Wy = Py, zl = "mindmap", Hy = (t) => t.match(/^\s*mindmap/) !== null, qy = async () => {
  const { diagram: t } = await import("./mindmap-definition-f3cbfc46.js");
  return { id: zl, diagram: t };
}, jy = {
  id: zl,
  detector: Hy,
  loader: qy
}, Uy = jy;
let gs = !1;
const Jn = () => {
  gs || (gs = !0, er("error", Oy, (t) => t.toLowerCase().trim() === "error"), er(
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
  ), al(
    k_,
    gy,
    uy,
    N_,
    U_,
    X_,
    Q_,
    ry,
    ay,
    Ny,
    O_,
    A_,
    Uy,
    Wy,
    W_,
    vy,
    Cy,
    By
  ));
}, Gy = (t) => t.trimStart().replace(/^\s*%%(?!{)[^\n]+\n?/gm, "");
class Pl {
  constructor(e) {
    var o, s;
    this.text = e, this.type = "graph", this.text += `
`;
    const i = Mt();
    try {
      this.type = br(e, i);
    } catch (a) {
      this.type = "error", this.detectError = a;
    }
    const r = Yn(this.type);
    x.debug("Type " + this.type), this.db = r.db, (s = (o = this.db).clear) == null || s.call(o), this.renderer = r.renderer, this.parser = r.parser;
    const n = this.parser.parse.bind(this.parser);
    this.parser.parse = (a) => n(Gy(lm(a, this.db))), this.parser.parser.yy = this.db, r.init && (r.init(i), x.info("Initialized diagram " + this.type, i)), this.parse();
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
const Qn = async (t) => {
  const e = br(t, Mt());
  try {
    Yn(e);
  } catch {
    const r = Om(e);
    if (!r)
      throw new sl(`Diagram ${e} not found.`);
    const { id: n, diagram: o } = await r();
    er(n, o);
  }
  return new Pl(t);
};
let Cn = [];
const nx = (t) => {
  Cn.push(t);
}, Yy = () => {
  Cn.forEach((t) => {
    t();
  }), Cn = [];
};
var Vy = Object.prototype;
function Wl(t) {
  var e = t && t.constructor, i = typeof e == "function" && e.prototype || Vy;
  return t === i;
}
function Xy(t, e) {
  return function(i) {
    return t(e(i));
  };
}
var Ky = Xy(Object.keys, Object);
const Zy = Ky;
var Jy = Object.prototype, Qy = Jy.hasOwnProperty;
function tC(t) {
  if (!Wl(t))
    return Zy(t);
  var e = [];
  for (var i in Object(t))
    Qy.call(t, i) && i != "constructor" && e.push(i);
  return e;
}
var eC = Le(Ht, "DataView");
const bn = eC;
var iC = Le(Ht, "Promise");
const xn = iC;
var rC = Le(Ht, "Set");
const Tn = rC;
var nC = Le(Ht, "WeakMap");
const vn = nC;
var ms = "[object Map]", oC = "[object Object]", _s = "[object Promise]", ys = "[object Set]", Cs = "[object WeakMap]", bs = "[object DataView]", sC = re(bn), aC = re(rr), lC = re(xn), cC = re(Tn), hC = re(vn), Vt = ri;
(bn && Vt(new bn(new ArrayBuffer(1))) != bs || rr && Vt(new rr()) != ms || xn && Vt(xn.resolve()) != _s || Tn && Vt(new Tn()) != ys || vn && Vt(new vn()) != Cs) && (Vt = function(t) {
  var e = ri(t), i = e == oC ? t.constructor : void 0, r = i ? re(i) : "";
  if (r)
    switch (r) {
      case sC:
        return bs;
      case aC:
        return ms;
      case lC:
        return _s;
      case cC:
        return ys;
      case hC:
        return Cs;
    }
  return e;
});
const uC = Vt;
function to(t) {
  return t != null && typeof t == "object";
}
var fC = "[object Arguments]";
function xs(t) {
  return to(t) && ri(t) == fC;
}
var Hl = Object.prototype, dC = Hl.hasOwnProperty, pC = Hl.propertyIsEnumerable, gC = xs(function() {
  return arguments;
}()) ? xs : function(t) {
  return to(t) && dC.call(t, "callee") && !pC.call(t, "callee");
};
const mC = gC;
var _C = Array.isArray;
const yC = _C;
var CC = 9007199254740991;
function ql(t) {
  return typeof t == "number" && t > -1 && t % 1 == 0 && t <= CC;
}
function bC(t) {
  return t != null && ql(t.length) && !fl(t);
}
function xC() {
  return !1;
}
var jl = typeof exports == "object" && exports && !exports.nodeType && exports, Ts = jl && typeof module == "object" && module && !module.nodeType && module, TC = Ts && Ts.exports === jl, vs = TC ? Ht.Buffer : void 0, vC = vs ? vs.isBuffer : void 0, SC = vC || xC;
const kC = SC;
var wC = "[object Arguments]", BC = "[object Array]", LC = "[object Boolean]", AC = "[object Date]", EC = "[object Error]", FC = "[object Function]", MC = "[object Map]", OC = "[object Number]", $C = "[object Object]", IC = "[object RegExp]", DC = "[object Set]", NC = "[object String]", RC = "[object WeakMap]", zC = "[object ArrayBuffer]", PC = "[object DataView]", WC = "[object Float32Array]", HC = "[object Float64Array]", qC = "[object Int8Array]", jC = "[object Int16Array]", UC = "[object Int32Array]", GC = "[object Uint8Array]", YC = "[object Uint8ClampedArray]", VC = "[object Uint16Array]", XC = "[object Uint32Array]", I = {};
I[WC] = I[HC] = I[qC] = I[jC] = I[UC] = I[GC] = I[YC] = I[VC] = I[XC] = !0;
I[wC] = I[BC] = I[zC] = I[LC] = I[PC] = I[AC] = I[EC] = I[FC] = I[MC] = I[OC] = I[$C] = I[IC] = I[DC] = I[NC] = I[RC] = !1;
function KC(t) {
  return to(t) && ql(t.length) && !!I[ri(t)];
}
function ZC(t) {
  return function(e) {
    return t(e);
  };
}
var Ul = typeof exports == "object" && exports && !exports.nodeType && exports, je = Ul && typeof module == "object" && module && !module.nodeType && module, JC = je && je.exports === Ul, tn = JC && cl.process, QC = function() {
  try {
    var t = je && je.require && je.require("util").types;
    return t || tn && tn.binding && tn.binding("util");
  } catch {
  }
}();
const Ss = QC;
var ks = Ss && Ss.isTypedArray, tb = ks ? ZC(ks) : KC;
const eb = tb;
var ib = "[object Map]", rb = "[object Set]", nb = Object.prototype, ob = nb.hasOwnProperty;
function Ri(t) {
  if (t == null)
    return !0;
  if (bC(t) && (yC(t) || typeof t == "string" || typeof t.splice == "function" || kC(t) || eb(t) || mC(t)))
    return !t.length;
  var e = uC(t);
  if (e == ib || e == rb)
    return !t.size;
  if (Wl(t))
    return !tC(t).length;
  for (var i in t)
    if (ob.call(t, i))
      return !1;
  return !0;
}
const sb = "graphics-document document";
function ab(t, e) {
  t.attr("role", sb), Ri(e) || t.attr("aria-roledescription", e);
}
function lb(t, e, i, r) {
  if (t.insert !== void 0)
    if (e || i) {
      if (i) {
        const n = "chart-desc-" + r;
        t.attr("aria-describedby", n), t.insert("desc", ":first-child").attr("id", n).text(i);
      }
      if (e) {
        const n = "chart-title-" + r;
        t.attr("aria-labelledby", n), t.insert("title", ":first-child").attr("id", n).text(e);
      }
    } else
      return;
}
const Gl = [
  "graph",
  "flowchart",
  "flowchart-v2",
  "flowchart-elk",
  "stateDiagram",
  "stateDiagram-v2"
], cb = 5e4, hb = "graph TB;a[Maximum text size in diagram exceeded];style a fill:#faa", ub = "sandbox", fb = "loose", db = "http://www.w3.org/2000/svg", pb = "http://www.w3.org/1999/xlink", gb = "http://www.w3.org/1999/xhtml", mb = "100%", _b = "100%", yb = "border:0;margin:0;", Cb = "margin:0", bb = "allow-top-navigation-by-user-activation allow-popups", xb = 'The "iframe" tag is not supported by your browser.', Tb = ["foreignobject"], vb = ["dominant-baseline"];
async function Sb(t, e) {
  Jn();
  try {
    (await Qn(t)).parse();
  } catch (i) {
    if (e != null && e.suppressErrors)
      return !1;
    throw i;
  }
  return !0;
}
const kb = function(t) {
  let e = t;
  return e = e.replace(/style.*:\S*#.*;/g, function(i) {
    return i.substring(0, i.length - 1);
  }), e = e.replace(/classDef.*:\S*#.*;/g, function(i) {
    return i.substring(0, i.length - 1);
  }), e = e.replace(/#\w+;/g, function(i) {
    const r = i.substring(1, i.length - 1);
    return /^\+?\d+$/.test(r) ? "ﬂ°°" + r + "¶ß" : "ﬂ°" + r + "¶ß";
  }), e;
}, wb = function(t) {
  let e = t;
  return e = e.replace(/ﬂ°°/g, "&#"), e = e.replace(/ﬂ°/g, "&"), e = e.replace(/¶ß/g, ";"), e;
}, ws = (t, e, i = []) => `
.${t} ${e} { ${i.join(" !important; ")} !important; }`, Bb = (t, e, i = {}) => {
  var n;
  let r = "";
  if (t.themeCSS !== void 0 && (r += `
${t.themeCSS}`), t.fontFamily !== void 0 && (r += `
:root { --mermaid-font-family: ${t.fontFamily}}`), t.altFontFamily !== void 0 && (r += `
:root { --mermaid-alt-font-family: ${t.altFontFamily}}`), !Ri(i) && Gl.includes(e)) {
    const l = t.htmlLabels || ((n = t.flowchart) == null ? void 0 : n.htmlLabels) ? ["> *", "span"] : ["rect", "polygon", "ellipse", "circle", "path"];
    for (const c in i) {
      const h = i[c];
      Ri(h.styles) || l.forEach((u) => {
        r += ws(h.id, u, h.styles);
      }), Ri(h.textStyles) || (r += ws(h.id, "tspan", h.textStyles));
    }
  }
  return r;
}, Lb = (t, e, i, r) => {
  const n = Bb(t, e, i), o = bm(e, n, t.themeVariables);
  return yn(C_(`${r}{${o}}`), x_);
}, Ab = (t = "", e, i) => {
  let r = t;
  return !i && !e && (r = r.replace(/marker-end="url\(.*?#/g, 'marker-end="url(#')), r = wb(r), r = r.replace(/<br>/g, "<br/>"), r;
}, Eb = (t = "", e) => {
  const i = e ? e.viewBox.baseVal.height + "px" : _b, r = btoa('<body style="' + Cb + '">' + t + "</body>");
  return `<iframe style="width:${mb};height:${i};${yb}" src="data:text/html;base64,${r}" sandbox="${bb}">
  ${xb}
</iframe>`;
}, Bs = (t, e, i, r, n) => {
  const o = t.append("div");
  o.attr("id", i), r && o.attr("style", r);
  const s = o.append("svg").attr("id", e).attr("width", "100%").attr("xmlns", db);
  return n && s.attr("xmlns:xlink", n), s.append("g"), t;
};
function Ls(t, e) {
  return t.append("iframe").attr("id", e).attr("style", "width: 100%; height: 100%;").attr("sandbox", "");
}
const Fb = (t, e, i, r) => {
  var n, o, s;
  (n = t.getElementById(e)) == null || n.remove(), (o = t.getElementById(i)) == null || o.remove(), (s = t.getElementById(r)) == null || s.remove();
}, Mb = async function(t, e, i) {
  var si, ai, li, Fe;
  Jn(), Qi();
  const r = Ii.detectInit(e);
  r && (we(r), Va(r));
  const n = Mt();
  x.debug(n), e.length > ((n == null ? void 0 : n.maxTextSize) ?? cb) && (e = hb), e = e.replace(/\r\n?/g, `
`), e = e.replace(
    /<(\w+)([^>]*)>/g,
    (rt, z, ci) => "<" + z + ci.replace(/="([^"]*)"/g, "='$1'") + ">"
  );
  const o = "#" + t, s = "i" + t, a = "#" + s, l = "d" + t, c = "#" + l;
  let h = bt("body");
  const u = n.securityLevel === ub, g = n.securityLevel === fb, d = n.fontFamily;
  if (i !== void 0) {
    if (i && (i.innerHTML = ""), u) {
      const rt = Ls(bt(i), s);
      h = bt(rt.nodes()[0].contentDocument.body), h.node().style.margin = 0;
    } else
      h = bt(i);
    Bs(h, t, l, `font-family: ${d}`, pb);
  } else {
    if (Fb(document, t, l, s), u) {
      const rt = Ls(bt("body"), s);
      h = bt(rt.nodes()[0].contentDocument.body), h.node().style.margin = 0;
    } else
      h = bt("body");
    Bs(h, t, l);
  }
  e = kb(e);
  let _, T;
  try {
    _ = await Qn(e);
  } catch (rt) {
    _ = new Pl("error"), T = rt;
  }
  const w = h.select(c).node(), L = _.type, y = w.firstChild, F = y.firstChild, N = Gl.includes(L) ? _.renderer.getClasses(e, _) : {}, H = Lb(
    n,
    L,
    // @ts-ignore convert renderer to TS.
    N,
    o
  ), Y = document.createElement("style");
  Y.innerHTML = H, y.insertBefore(Y, F);
  try {
    await _.renderer.draw(e, t, ps, _);
  } catch (rt) {
    throw Dl.draw(e, t, ps), rt;
  }
  const O = h.select(`${c} svg`), kr = (ai = (si = _.db).getAccTitle) == null ? void 0 : ai.call(si), st = (Fe = (li = _.db).getAccDescription) == null ? void 0 : Fe.call(li);
  $b(L, O, kr, st), h.select(`[id="${t}"]`).selectAll("foreignobject > *").attr("xmlns", gb);
  let ft = h.select(c).node().innerHTML;
  if (x.debug("config.arrowMarkerAbsolute", n.arrowMarkerAbsolute), ft = Ab(ft, u, ka(n.arrowMarkerAbsolute)), u) {
    const rt = h.select(c + " svg").node();
    ft = Eb(ft, rt);
  } else
    g || (ft = Xi.sanitize(ft, {
      ADD_TAGS: Tb,
      ADD_ATTR: vb
    }));
  if (Yy(), T)
    throw T;
  const qt = bt(u ? a : c).node();
  return qt && "remove" in qt && qt.remove(), {
    svg: ft,
    bindFunctions: _.db.bindFunctions
  };
};
function Ob(t = {}) {
  var i;
  t != null && t.fontFamily && !((i = t.themeVariables) != null && i.fontFamily) && (t.themeVariables || (t.themeVariables = {}), t.themeVariables.fontFamily = t.fontFamily), hm(t), t != null && t.theme && t.theme in At ? t.themeVariables = At[t.theme].getThemeVariables(
    t.themeVariables
  ) : t && (t.themeVariables = At.default.getThemeVariables(t.themeVariables));
  const e = typeof t == "object" ? cm(t) : Ga();
  wn(e.logLevel), Jn();
}
function $b(t, e, i, r) {
  ab(e, t), lb(e, i, r, e.attr("id"));
}
const ie = Object.freeze({
  render: Mb,
  parse: Sb,
  parseDirective: nl,
  getDiagramFromText: Qn,
  initialize: Ob,
  getConfig: Mt,
  setConfig: fm,
  getSiteConfig: Ga,
  updateSiteConfig: um,
  reset: () => {
    Qi();
  },
  globalReset: () => {
    Qi(Ze);
  },
  defaultConfig: Ze
});
wn(Mt().logLevel);
Qi(Mt());
const Ib = (t, e, i) => {
  x.warn(t), pl(t) ? (i && i(t.str, t.hash), e.push({ ...t, message: t.str, error: t })) : (i && i(t), t instanceof Error && e.push({
    str: t.message,
    message: t.message,
    hash: t.name,
    error: t
  }));
}, Yl = async function(t = {
  querySelector: ".mermaid"
}) {
  try {
    await Db(t);
  } catch (e) {
    if (pl(e) && x.error(e.str), ct.parseError && ct.parseError(e), !t.suppressErrors)
      throw x.error("Use the suppressErrors option to suppress these errors"), e;
  }
}, Db = async function({ postRenderCallback: t, querySelector: e, nodes: i } = {
  querySelector: ".mermaid"
}) {
  const r = ie.getConfig();
  x.debug(`${t ? "" : "No "}Callback function found`);
  let n;
  if (i)
    n = i;
  else if (e)
    n = document.querySelectorAll(e);
  else
    throw new Error("Nodes and querySelector are both undefined");
  x.debug(`Found ${n.length} diagrams`), (r == null ? void 0 : r.startOnLoad) !== void 0 && (x.debug("Start On Load: " + (r == null ? void 0 : r.startOnLoad)), ie.updateSiteConfig({ startOnLoad: r == null ? void 0 : r.startOnLoad }));
  const o = new Ii.initIdGenerator(r.deterministicIds, r.deterministicIDSeed);
  let s;
  const a = [];
  for (const l of Array.from(n)) {
    x.info("Rendering diagram: " + l.id);
    /*! Check if previously processed */
    if (l.getAttribute("data-processed"))
      continue;
    l.setAttribute("data-processed", "true");
    const c = `mermaid-${o.next()}`;
    s = l.innerHTML, s = ac(Ii.entityDecode(s)).trim().replace(/<br\s*\/?>/gi, "<br/>");
    const h = Ii.detectInit(s);
    h && x.debug("Detected early reinit: ", h);
    try {
      const { svg: u, bindFunctions: g } = await Zl(c, s, l);
      l.innerHTML = u, t && await t(c), g && g(l);
    } catch (u) {
      Ib(u, a, ct.parseError);
    }
  }
  if (a.length > 0)
    throw a[0];
}, Vl = function(t) {
  ie.initialize(t);
}, Nb = async function(t, e, i) {
  x.warn("mermaid.init is deprecated. Please use run instead."), t && Vl(t);
  const r = { postRenderCallback: i, querySelector: ".mermaid" };
  typeof e == "string" ? r.querySelector = e : e && (e instanceof HTMLElement ? r.nodes = [e] : r.nodes = e), await Yl(r);
}, Rb = async (t, {
  lazyLoad: e = !0
} = {}) => {
  al(...t), e === !1 && await Mm();
}, Xl = function() {
  if (ct.startOnLoad) {
    const { startOnLoad: t } = ie.getConfig();
    t && ct.run().catch((e) => x.error("Mermaid failed to initialize", e));
  }
};
if (typeof document < "u") {
  /*!
   * Wait for document loaded before starting the execution
   */
  window.addEventListener("load", Xl, !1);
}
const zb = function(t) {
  ct.parseError = t;
}, sr = [];
let en = !1;
const Kl = async () => {
  if (!en) {
    for (en = !0; sr.length > 0; ) {
      const t = sr.shift();
      if (t)
        try {
          await t();
        } catch (e) {
          x.error("Error executing queue", e);
        }
    }
    en = !1;
  }
}, Pb = async (t, e) => new Promise((i, r) => {
  const n = () => new Promise((o, s) => {
    ie.parse(t, e).then(
      (a) => {
        o(a), i(a);
      },
      (a) => {
        var l;
        x.error("Error parsing", a), (l = ct.parseError) == null || l.call(ct, a), s(a), r(a);
      }
    );
  });
  sr.push(n), Kl().catch(r);
}), Zl = (t, e, i) => new Promise((r, n) => {
  const o = () => new Promise((s, a) => {
    ie.render(t, e, i).then(
      (l) => {
        s(l), r(l);
      },
      (l) => {
        var c;
        x.error("Error parsing", l), (c = ct.parseError) == null || c.call(ct, l), a(l), n(l);
      }
    );
  });
  sr.push(o), Kl().catch(n);
}), ct = {
  startOnLoad: !0,
  mermaidAPI: ie,
  parse: Pb,
  render: Zl,
  init: Nb,
  run: Yl,
  registerExternalDiagrams: Rb,
  initialize: Vl,
  parseError: void 0,
  contentLoaded: Xl,
  setParseErrorHandler: zb,
  detectType: br
};
export {
  Ys as $,
  Za as A,
  Kf as B,
  zd as C,
  Z0 as D,
  ol as E,
  Bm as F,
  En as G,
  Vs as H,
  ii as I,
  Tu as J,
  Fn as K,
  Dt as L,
  Ye as M,
  $o as N,
  Au as O,
  Zs as P,
  Hb as Q,
  et as R,
  $t as S,
  uc as T,
  G as U,
  Kb as V,
  ki as W,
  Xn as X,
  It as Y,
  nx as Z,
  ot as _,
  el as a,
  zc as a0,
  X0 as a1,
  to as a2,
  ri as a3,
  ir as a4,
  yC as a5,
  ul as a6,
  Le as a7,
  T0 as a8,
  bC as a9,
  Vb as aA,
  Xb as aB,
  Yb as aC,
  qb as aD,
  In as aE,
  jb as aF,
  Jb as aG,
  Zb as aH,
  Gb as aI,
  Ft as aJ,
  A as aK,
  ct as aL,
  mC as aa,
  kC as ab,
  eb as ac,
  tC as ad,
  Wl as ae,
  ni as af,
  Xy as ag,
  Ae as ah,
  rr as ai,
  ne as aj,
  Ht as ak,
  uC as al,
  Ss as am,
  ZC as an,
  ql as ao,
  Tn as ap,
  Ri as aq,
  Ze as ar,
  wb as as,
  Tm as at,
  nl as au,
  k as av,
  B as aw,
  Wo as ax,
  Po as ay,
  Ub as az,
  tl as b,
  Mt as c,
  Xe as d,
  $s as e,
  Pn as f,
  Qa as g,
  X as h,
  or as i,
  bt as j,
  mm as k,
  x as l,
  ie as m,
  i_ as n,
  Yf as o,
  V0 as p,
  ka as q,
  W0 as r,
  Ja as s,
  _m as t,
  fm as u,
  fl as v,
  t_ as w,
  Ii as x,
  il as y,
  rl as z
};
