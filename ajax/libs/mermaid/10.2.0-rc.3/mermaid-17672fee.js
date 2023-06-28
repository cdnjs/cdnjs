function lc(t) {
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
var Es = 60, Fs = Es * 60, Ms = Fs * 24, cc = Ms * 7, be = 1e3, zr = Es * be, So = Fs * be, hc = Ms * be, uc = cc * be, vn = "millisecond", de = "second", pe = "minute", ge = "hour", Ot = "day", ki = "week", dt = "month", Os = "quarter", $t = "year", me = "date", fc = "YYYY-MM-DDTHH:mm:ssZ", vo = "Invalid Date", dc = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, pc = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g;
const gc = {
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
}, mc = function(e) {
  var i = -e.utcOffset(), r = Math.abs(i), n = Math.floor(r / 60), o = r % 60;
  return (i <= 0 ? "+" : "-") + rn(n, 2, "0") + ":" + rn(o, 2, "0");
}, _c = function t(e, i) {
  if (e.date() < i.date())
    return -t(i, e);
  var r = (i.year() - e.year()) * 12 + (i.month() - e.month()), n = e.clone().add(r, dt), o = i - n < 0, s = e.clone().add(r + (o ? -1 : 1), dt);
  return +(-(r + (i - n) / (o ? n - s : s - n)) || 0);
}, yc = function(e) {
  return e < 0 ? Math.ceil(e) || 0 : Math.floor(e);
}, Cc = function(e) {
  var i = {
    M: dt,
    y: $t,
    w: ki,
    d: Ot,
    D: me,
    h: ge,
    m: pe,
    s: de,
    ms: vn,
    Q: Os
  };
  return i[e] || String(e || "").toLowerCase().replace(/s$/, "");
}, bc = function(e) {
  return e === void 0;
};
const xc = {
  s: rn,
  z: mc,
  m: _c,
  a: yc,
  p: Cc,
  u: bc
};
var Pe = "en", Xt = {};
Xt[Pe] = gc;
var kn = function(e) {
  return e instanceof ar;
}, zi = function t(e, i, r) {
  var n;
  if (!e)
    return Pe;
  if (typeof e == "string") {
    var o = e.toLowerCase();
    Xt[o] && (n = o), i && (Xt[o] = i, n = o);
    var s = e.split("-");
    if (!n && s.length > 1)
      return t(s[0]);
  } else {
    var a = e.name;
    Xt[a] = e, n = a;
  }
  return !r && n && (Pe = n), n || !r && Pe;
}, G = function(e, i) {
  if (kn(e))
    return e.clone();
  var r = typeof i == "object" ? i : {};
  return r.date = e, r.args = arguments, new ar(r);
}, Tc = function(e, i) {
  return G(e, {
    locale: i.$L,
    utc: i.$u,
    x: i.$x,
    $offset: i.$offset
    // todo: refactor; do not use this.$offset in you code
  });
}, $ = xc;
$.l = zi;
$.i = kn;
$.w = Tc;
var Sc = function(e) {
  var i = e.date, r = e.utc;
  if (i === null)
    return /* @__PURE__ */ new Date(NaN);
  if ($.u(i))
    return /* @__PURE__ */ new Date();
  if (i instanceof Date)
    return new Date(i);
  if (typeof i == "string" && !/Z$/i.test(i)) {
    var n = i.match(dc);
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
    this.$d = Sc(r), this.$x = r.x || {}, this.init();
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
    var o = this, s = $.u(n) ? !0 : n, a = $.p(r), l = function(A, C) {
      var B = $.w(o.$u ? Date.UTC(o.$y, C, A) : new Date(o.$y, C, A), o);
      return s ? B : B.endOf(Ot);
    }, c = function(A, C) {
      var B = [0, 0, 0, 0], D = [23, 59, 59, 999];
      return $.w(o.toDate()[A].apply(
        // eslint-disable-line prefer-spread
        o.toDate("s"),
        (s ? B : D).slice(C)
      ), o);
    }, h = this.$W, u = this.$M, g = this.$D, d = "set" + (this.$u ? "UTC" : "");
    switch (a) {
      case $t:
        return s ? l(1, 0) : l(31, 11);
      case dt:
        return s ? l(1, u) : l(0, u + 1);
      case ki: {
        var _ = this.$locale().weekStart || 0, T = (h < _ ? h + 7 : h) - _;
        return l(s ? g - T : g + (6 - T), u);
      }
      case Ot:
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
    var o, s = $.p(r), a = "set" + (this.$u ? "UTC" : ""), l = (o = {}, o[Ot] = a + "Date", o[me] = a + "Date", o[dt] = a + "Month", o[$t] = a + "FullYear", o[ge] = a + "Hours", o[pe] = a + "Minutes", o[de] = a + "Seconds", o[vn] = a + "Milliseconds", o)[s], c = s === Ot ? this.$D + (n - this.$W) : n;
    if (s === dt || s === $t) {
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
    if (a === dt)
      return this.set(dt, this.$M + r);
    if (a === $t)
      return this.set($t, this.$y + r);
    if (a === Ot)
      return l(1);
    if (a === ki)
      return l(7);
    var c = (s = {}, s[pe] = zr, s[ge] = So, s[de] = be, s)[a] || 1, h = this.$d.getTime() + r * c;
    return $.w(h, this);
  }, e.subtract = function(r, n) {
    return this.add(r * -1, n);
  }, e.format = function(r) {
    var n = this, o = this.$locale();
    if (!this.isValid())
      return o.invalidDate || vo;
    var s = r || fc, a = $.z(this), l = this.$H, c = this.$m, h = this.$M, u = o.weekdays, g = o.months, d = o.meridiem, _ = function(B, D, R, V) {
      return B && (B[D] || B(n, s)) || R[D].slice(0, V);
    }, T = function(B) {
      return $.s(l % 12 || 12, B, "0");
    }, w = d || function(C, B, D) {
      var R = C < 12 ? "AM" : "PM";
      return D ? R.toLowerCase() : R;
    }, A = {
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
    return s.replace(pc, function(C, B) {
      return B || A[C] || a.replace(":", "");
    });
  }, e.utcOffset = function() {
    return -Math.round(this.$d.getTimezoneOffset() / 15) * 15;
  }, e.diff = function(r, n, o) {
    var s, a = $.p(n), l = G(r), c = (l.utcOffset() - this.utcOffset()) * zr, h = this - l, u = $.m(this, l);
    return u = (s = {}, s[$t] = u / 12, s[dt] = u, s[Os] = u / 3, s[ki] = (h - c) / uc, s[Ot] = (h - c) / hc, s[ge] = h / So, s[pe] = h / zr, s[de] = h / be, s)[a] || h, o ? u : $.a(u);
  }, e.daysInMonth = function() {
    return this.endOf(dt).$D;
  }, e.$locale = function() {
    return Xt[this.$L];
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
}(), $s = ar.prototype;
G.prototype = $s;
[["$ms", vn], ["$s", de], ["$m", pe], ["$H", ge], ["$W", Ot], ["$M", dt], ["$y", $t], ["$D", me]].forEach(function(t) {
  $s[t[1]] = function(e) {
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
G.en = Xt[Pe];
G.Ls = Xt;
G.p = {};
const kt = {
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
  let e = kt.fatal;
  typeof t == "string" ? (t = t.toLowerCase(), t in kt && (e = kt[t])) : typeof t == "number" && (e = t), x.trace = () => {
  }, x.debug = () => {
  }, x.info = () => {
  }, x.warn = () => {
  }, x.error = () => {
  }, x.fatal = () => {
  }, e <= kt.fatal && (x.fatal = console.error ? console.error.bind(console, lt("FATAL"), "color: orange") : console.log.bind(console, "\x1B[35m", lt("FATAL"))), e <= kt.error && (x.error = console.error ? console.error.bind(console, lt("ERROR"), "color: orange") : console.log.bind(console, "\x1B[31m", lt("ERROR"))), e <= kt.warn && (x.warn = console.warn ? console.warn.bind(console, lt("WARN"), "color: orange") : console.log.bind(console, "\x1B[33m", lt("WARN"))), e <= kt.info && (x.info = console.info ? console.info.bind(console, lt("INFO"), "color: lightblue") : console.log.bind(console, "\x1B[34m", lt("INFO"))), e <= kt.debug && (x.debug = console.debug ? console.debug.bind(console, lt("DEBUG"), "color: lightgreen") : console.log.bind(console, "\x1B[32m", lt("DEBUG"))), e <= kt.trace && (x.trace = console.debug ? console.debug.bind(console, lt("TRACE"), "color: lightgreen") : console.log.bind(console, "\x1B[32m", lt("TRACE")));
}, lt = (t) => `%c${G().format("ss.SSS")} : ${t} : `;
var Bn = {};
Object.defineProperty(Bn, "__esModule", { value: !0 });
var Is = Bn.sanitizeUrl = void 0, vc = /^([^\w]*)(javascript|data|vbscript)/im, kc = /&#(\w+)(^\w|;)?/g, wc = /&(newline|tab);/gi, Bc = /[\u0000-\u001F\u007F-\u009F\u2000-\u200D\uFEFF]/gim, Lc = /^.+(:|&colon;)/gim, Ac = [".", "/"];
function Ec(t) {
  return Ac.indexOf(t[0]) > -1;
}
function Fc(t) {
  return t.replace(kc, function(e, i) {
    return String.fromCharCode(i);
  });
}
function Mc(t) {
  var e = Fc(t || "").replace(wc, "").replace(Bc, "").trim();
  if (!e)
    return "about:blank";
  if (Ec(e))
    return e;
  var i = e.match(Lc);
  if (!i)
    return e;
  var r = i[0];
  return vc.test(r) ? "about:blank" : e;
}
Is = Bn.sanitizeUrl = Mc;
var Oc = { value: () => {
} };
function Ds() {
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
function $c(t, e) {
  return t.trim().split(/^|\s+/).map(function(i) {
    var r = "", n = i.indexOf(".");
    if (n >= 0 && (r = i.slice(n + 1), i = i.slice(0, n)), i && !e.hasOwnProperty(i))
      throw new Error("unknown type: " + i);
    return { type: i, name: r };
  });
}
wi.prototype = Ds.prototype = {
  constructor: wi,
  on: function(t, e) {
    var i = this._, r = $c(t + "", i), n, o = -1, s = r.length;
    if (arguments.length < 2) {
      for (; ++o < s; )
        if ((n = (t = r[o]).type) && (n = Ic(i[n], t.name)))
          return n;
      return;
    }
    if (e != null && typeof e != "function")
      throw new Error("invalid callback: " + e);
    for (; ++o < s; )
      if (n = (t = r[o]).type)
        i[n] = ko(i[n], t.name, e);
      else if (e == null)
        for (n in i)
          i[n] = ko(i[n], t.name, null);
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
function Ic(t, e) {
  for (var i = 0, r = t.length, n; i < r; ++i)
    if ((n = t[i]).name === e)
      return n.value;
}
function ko(t, e, i) {
  for (var r = 0, n = t.length; r < n; ++r)
    if (t[r].name === e) {
      t[r] = Oc, t = t.slice(0, r).concat(t.slice(r + 1));
      break;
    }
  return i != null && t.push({ name: e, value: i }), t;
}
var nn = "http://www.w3.org/1999/xhtml";
const wo = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: nn,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function lr(t) {
  var e = t += "", i = e.indexOf(":");
  return i >= 0 && (e = t.slice(0, i)) !== "xmlns" && (t = t.slice(i + 1)), wo.hasOwnProperty(e) ? { space: wo[e], local: t } : t;
}
function Dc(t) {
  return function() {
    var e = this.ownerDocument, i = this.namespaceURI;
    return i === nn && e.documentElement.namespaceURI === nn ? e.createElement(t) : e.createElementNS(i, t);
  };
}
function Nc(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function Ns(t) {
  var e = lr(t);
  return (e.local ? Nc : Dc)(e);
}
function Rc() {
}
function Ln(t) {
  return t == null ? Rc : function() {
    return this.querySelector(t);
  };
}
function zc(t) {
  typeof t != "function" && (t = Ln(t));
  for (var e = this._groups, i = e.length, r = new Array(i), n = 0; n < i; ++n)
    for (var o = e[n], s = o.length, a = r[n] = new Array(s), l, c, h = 0; h < s; ++h)
      (l = o[h]) && (c = t.call(l, l.__data__, h, o)) && ("__data__" in l && (c.__data__ = l.__data__), a[h] = c);
  return new st(r, this._parents);
}
function Pc(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function Wc() {
  return [];
}
function Rs(t) {
  return t == null ? Wc : function() {
    return this.querySelectorAll(t);
  };
}
function Hc(t) {
  return function() {
    return Pc(t.apply(this, arguments));
  };
}
function qc(t) {
  typeof t == "function" ? t = Hc(t) : t = Rs(t);
  for (var e = this._groups, i = e.length, r = [], n = [], o = 0; o < i; ++o)
    for (var s = e[o], a = s.length, l, c = 0; c < a; ++c)
      (l = s[c]) && (r.push(t.call(l, l.__data__, c, s)), n.push(l));
  return new st(r, n);
}
function zs(t) {
  return function() {
    return this.matches(t);
  };
}
function Ps(t) {
  return function(e) {
    return e.matches(t);
  };
}
var jc = Array.prototype.find;
function Uc(t) {
  return function() {
    return jc.call(this.children, t);
  };
}
function Yc() {
  return this.firstElementChild;
}
function Gc(t) {
  return this.select(t == null ? Yc : Uc(typeof t == "function" ? t : Ps(t)));
}
var Vc = Array.prototype.filter;
function Xc() {
  return Array.from(this.children);
}
function Kc(t) {
  return function() {
    return Vc.call(this.children, t);
  };
}
function Zc(t) {
  return this.selectAll(t == null ? Xc : Kc(typeof t == "function" ? t : Ps(t)));
}
function Jc(t) {
  typeof t != "function" && (t = zs(t));
  for (var e = this._groups, i = e.length, r = new Array(i), n = 0; n < i; ++n)
    for (var o = e[n], s = o.length, a = r[n] = [], l, c = 0; c < s; ++c)
      (l = o[c]) && t.call(l, l.__data__, c, o) && a.push(l);
  return new st(r, this._parents);
}
function Ws(t) {
  return new Array(t.length);
}
function Qc() {
  return new st(this._enter || this._groups.map(Ws), this._parents);
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
function th(t) {
  return function() {
    return t;
  };
}
function eh(t, e, i, r, n, o) {
  for (var s = 0, a, l = e.length, c = o.length; s < c; ++s)
    (a = e[s]) ? (a.__data__ = o[s], r[s] = a) : i[s] = new Pi(t, o[s]);
  for (; s < l; ++s)
    (a = e[s]) && (n[s] = a);
}
function ih(t, e, i, r, n, o, s) {
  var a, l, c = /* @__PURE__ */ new Map(), h = e.length, u = o.length, g = new Array(h), d;
  for (a = 0; a < h; ++a)
    (l = e[a]) && (g[a] = d = s.call(l, l.__data__, a, e) + "", c.has(d) ? n[a] = l : c.set(d, l));
  for (a = 0; a < u; ++a)
    d = s.call(t, o[a], a, o) + "", (l = c.get(d)) ? (r[a] = l, l.__data__ = o[a], c.delete(d)) : i[a] = new Pi(t, o[a]);
  for (a = 0; a < h; ++a)
    (l = e[a]) && c.get(g[a]) === l && (n[a] = l);
}
function rh(t) {
  return t.__data__;
}
function nh(t, e) {
  if (!arguments.length)
    return Array.from(this, rh);
  var i = e ? ih : eh, r = this._parents, n = this._groups;
  typeof t != "function" && (t = th(t));
  for (var o = n.length, s = new Array(o), a = new Array(o), l = new Array(o), c = 0; c < o; ++c) {
    var h = r[c], u = n[c], g = u.length, d = oh(t.call(h, h && h.__data__, c, r)), _ = d.length, T = a[c] = new Array(_), w = s[c] = new Array(_), A = l[c] = new Array(g);
    i(h, u, T, w, A, d, e);
    for (var C = 0, B = 0, D, R; C < _; ++C)
      if (D = T[C]) {
        for (C >= B && (B = C + 1); !(R = w[B]) && ++B < _; )
          ;
        D._next = R || null;
      }
  }
  return s = new st(s, r), s._enter = a, s._exit = l, s;
}
function oh(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function sh() {
  return new st(this._exit || this._groups.map(Ws), this._parents);
}
function ah(t, e, i) {
  var r = this.enter(), n = this, o = this.exit();
  return typeof t == "function" ? (r = t(r), r && (r = r.selection())) : r = r.append(t + ""), e != null && (n = e(n), n && (n = n.selection())), i == null ? o.remove() : i(o), r && n ? r.merge(n).order() : n;
}
function lh(t) {
  for (var e = t.selection ? t.selection() : t, i = this._groups, r = e._groups, n = i.length, o = r.length, s = Math.min(n, o), a = new Array(n), l = 0; l < s; ++l)
    for (var c = i[l], h = r[l], u = c.length, g = a[l] = new Array(u), d, _ = 0; _ < u; ++_)
      (d = c[_] || h[_]) && (g[_] = d);
  for (; l < n; ++l)
    a[l] = i[l];
  return new st(a, this._parents);
}
function ch() {
  for (var t = this._groups, e = -1, i = t.length; ++e < i; )
    for (var r = t[e], n = r.length - 1, o = r[n], s; --n >= 0; )
      (s = r[n]) && (o && s.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(s, o), o = s);
  return this;
}
function hh(t) {
  t || (t = uh);
  function e(u, g) {
    return u && g ? t(u.__data__, g.__data__) : !u - !g;
  }
  for (var i = this._groups, r = i.length, n = new Array(r), o = 0; o < r; ++o) {
    for (var s = i[o], a = s.length, l = n[o] = new Array(a), c, h = 0; h < a; ++h)
      (c = s[h]) && (l[h] = c);
    l.sort(e);
  }
  return new st(n, this._parents).order();
}
function uh(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function fh() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function dh() {
  return Array.from(this);
}
function ph() {
  for (var t = this._groups, e = 0, i = t.length; e < i; ++e)
    for (var r = t[e], n = 0, o = r.length; n < o; ++n) {
      var s = r[n];
      if (s)
        return s;
    }
  return null;
}
function gh() {
  let t = 0;
  for (const e of this)
    ++t;
  return t;
}
function mh() {
  return !this.node();
}
function _h(t) {
  for (var e = this._groups, i = 0, r = e.length; i < r; ++i)
    for (var n = e[i], o = 0, s = n.length, a; o < s; ++o)
      (a = n[o]) && t.call(a, a.__data__, o, n);
  return this;
}
function yh(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Ch(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function bh(t, e) {
  return function() {
    this.setAttribute(t, e);
  };
}
function xh(t, e) {
  return function() {
    this.setAttributeNS(t.space, t.local, e);
  };
}
function Th(t, e) {
  return function() {
    var i = e.apply(this, arguments);
    i == null ? this.removeAttribute(t) : this.setAttribute(t, i);
  };
}
function Sh(t, e) {
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
  return this.each((e == null ? i.local ? Ch : yh : typeof e == "function" ? i.local ? Sh : Th : i.local ? xh : bh)(i, e));
}
function Hs(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function kh(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function wh(t, e, i) {
  return function() {
    this.style.setProperty(t, e, i);
  };
}
function Bh(t, e, i) {
  return function() {
    var r = e.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, i);
  };
}
function Lh(t, e, i) {
  return arguments.length > 1 ? this.each((e == null ? kh : typeof e == "function" ? Bh : wh)(t, e, i ?? "")) : xe(this.node(), t);
}
function xe(t, e) {
  return t.style.getPropertyValue(e) || Hs(t).getComputedStyle(t, null).getPropertyValue(e);
}
function Ah(t) {
  return function() {
    delete this[t];
  };
}
function Eh(t, e) {
  return function() {
    this[t] = e;
  };
}
function Fh(t, e) {
  return function() {
    var i = e.apply(this, arguments);
    i == null ? delete this[t] : this[t] = i;
  };
}
function Mh(t, e) {
  return arguments.length > 1 ? this.each((e == null ? Ah : typeof e == "function" ? Fh : Eh)(t, e)) : this.node()[t];
}
function qs(t) {
  return t.trim().split(/^|\s+/);
}
function An(t) {
  return t.classList || new js(t);
}
function js(t) {
  this._node = t, this._names = qs(t.getAttribute("class") || "");
}
js.prototype = {
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
function Us(t, e) {
  for (var i = An(t), r = -1, n = e.length; ++r < n; )
    i.add(e[r]);
}
function Ys(t, e) {
  for (var i = An(t), r = -1, n = e.length; ++r < n; )
    i.remove(e[r]);
}
function Oh(t) {
  return function() {
    Us(this, t);
  };
}
function $h(t) {
  return function() {
    Ys(this, t);
  };
}
function Ih(t, e) {
  return function() {
    (e.apply(this, arguments) ? Us : Ys)(this, t);
  };
}
function Dh(t, e) {
  var i = qs(t + "");
  if (arguments.length < 2) {
    for (var r = An(this.node()), n = -1, o = i.length; ++n < o; )
      if (!r.contains(i[n]))
        return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? Ih : e ? Oh : $h)(i, e));
}
function Nh() {
  this.textContent = "";
}
function Rh(t) {
  return function() {
    this.textContent = t;
  };
}
function zh(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.textContent = e ?? "";
  };
}
function Ph(t) {
  return arguments.length ? this.each(t == null ? Nh : (typeof t == "function" ? zh : Rh)(t)) : this.node().textContent;
}
function Wh() {
  this.innerHTML = "";
}
function Hh(t) {
  return function() {
    this.innerHTML = t;
  };
}
function qh(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function jh(t) {
  return arguments.length ? this.each(t == null ? Wh : (typeof t == "function" ? qh : Hh)(t)) : this.node().innerHTML;
}
function Uh() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Yh() {
  return this.each(Uh);
}
function Gh() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Vh() {
  return this.each(Gh);
}
function Xh(t) {
  var e = typeof t == "function" ? t : Ns(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function Kh() {
  return null;
}
function Zh(t, e) {
  var i = typeof t == "function" ? t : Ns(t), r = e == null ? Kh : typeof e == "function" ? e : Ln(e);
  return this.select(function() {
    return this.insertBefore(i.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function Jh() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function Qh() {
  return this.each(Jh);
}
function tu() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function eu() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function iu(t) {
  return this.select(t ? eu : tu);
}
function ru(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function nu(t) {
  return function(e) {
    t.call(this, e, this.__data__);
  };
}
function ou(t) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var i = "", r = e.indexOf(".");
    return r >= 0 && (i = e.slice(r + 1), e = e.slice(0, r)), { type: e, name: i };
  });
}
function su(t) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var i = 0, r = -1, n = e.length, o; i < n; ++i)
        o = e[i], (!t.type || o.type === t.type) && o.name === t.name ? this.removeEventListener(o.type, o.listener, o.options) : e[++r] = o;
      ++r ? e.length = r : delete this.__on;
    }
  };
}
function au(t, e, i) {
  return function() {
    var r = this.__on, n, o = nu(e);
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
function lu(t, e, i) {
  var r = ou(t + ""), n, o = r.length, s;
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
  for (a = e ? au : su, n = 0; n < o; ++n)
    this.each(a(r[n], e, i));
  return this;
}
function Gs(t, e, i) {
  var r = Hs(t), n = r.CustomEvent;
  typeof n == "function" ? n = new n(e, i) : (n = r.document.createEvent("Event"), i ? (n.initEvent(e, i.bubbles, i.cancelable), n.detail = i.detail) : n.initEvent(e, !1, !1)), t.dispatchEvent(n);
}
function cu(t, e) {
  return function() {
    return Gs(this, t, e);
  };
}
function hu(t, e) {
  return function() {
    return Gs(this, t, e.apply(this, arguments));
  };
}
function uu(t, e) {
  return this.each((typeof e == "function" ? hu : cu)(t, e));
}
function* fu() {
  for (var t = this._groups, e = 0, i = t.length; e < i; ++e)
    for (var r = t[e], n = 0, o = r.length, s; n < o; ++n)
      (s = r[n]) && (yield s);
}
var Vs = [null];
function st(t, e) {
  this._groups = t, this._parents = e;
}
function ei() {
  return new st([[document.documentElement]], Vs);
}
function du() {
  return this;
}
st.prototype = ei.prototype = {
  constructor: st,
  select: zc,
  selectAll: qc,
  selectChild: Gc,
  selectChildren: Zc,
  filter: Jc,
  data: nh,
  enter: Qc,
  exit: sh,
  join: ah,
  merge: lh,
  selection: du,
  order: ch,
  sort: hh,
  call: fh,
  nodes: dh,
  node: ph,
  size: gh,
  empty: mh,
  each: _h,
  attr: vh,
  style: Lh,
  property: Mh,
  classed: Dh,
  text: Ph,
  html: jh,
  raise: Yh,
  lower: Vh,
  append: Xh,
  insert: Zh,
  remove: Qh,
  clone: iu,
  datum: ru,
  on: lu,
  dispatch: uu,
  [Symbol.iterator]: fu
};
function Ct(t) {
  return typeof t == "string" ? new st([[document.querySelector(t)]], [document.documentElement]) : new st([[t]], Vs);
}
function En(t, e, i) {
  t.prototype = e.prototype = i, i.constructor = t;
}
function Xs(t, e) {
  var i = Object.create(t.prototype);
  for (var r in e)
    i[r] = e[r];
  return i;
}
function ii() {
}
var Ue = 0.7, Wi = 1 / Ue, Ce = "\\s*([+-]?\\d+)\\s*", Ye = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", bt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", pu = /^#([0-9a-f]{3,8})$/, gu = new RegExp(`^rgb\\(${Ce},${Ce},${Ce}\\)$`), mu = new RegExp(`^rgb\\(${bt},${bt},${bt}\\)$`), _u = new RegExp(`^rgba\\(${Ce},${Ce},${Ce},${Ye}\\)$`), yu = new RegExp(`^rgba\\(${bt},${bt},${bt},${Ye}\\)$`), Cu = new RegExp(`^hsl\\(${Ye},${bt},${bt}\\)$`), bu = new RegExp(`^hsla\\(${Ye},${bt},${bt},${Ye}\\)$`), Bo = {
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
En(ii, Ge, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Lo,
  // Deprecated! Use color.formatHex.
  formatHex: Lo,
  formatHex8: xu,
  formatHsl: Tu,
  formatRgb: Ao,
  toString: Ao
});
function Lo() {
  return this.rgb().formatHex();
}
function xu() {
  return this.rgb().formatHex8();
}
function Tu() {
  return Ks(this).formatHsl();
}
function Ao() {
  return this.rgb().formatRgb();
}
function Ge(t) {
  var e, i;
  return t = (t + "").trim().toLowerCase(), (e = pu.exec(t)) ? (i = e[1].length, e = parseInt(e[1], 16), i === 6 ? Eo(e) : i === 3 ? new it(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : i === 8 ? mi(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : i === 4 ? mi(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = gu.exec(t)) ? new it(e[1], e[2], e[3], 1) : (e = mu.exec(t)) ? new it(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = _u.exec(t)) ? mi(e[1], e[2], e[3], e[4]) : (e = yu.exec(t)) ? mi(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = Cu.exec(t)) ? Oo(e[1], e[2] / 100, e[3] / 100, 1) : (e = bu.exec(t)) ? Oo(e[1], e[2] / 100, e[3] / 100, e[4]) : Bo.hasOwnProperty(t) ? Eo(Bo[t]) : t === "transparent" ? new it(NaN, NaN, NaN, 0) : null;
}
function Eo(t) {
  return new it(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function mi(t, e, i, r) {
  return r <= 0 && (t = e = i = NaN), new it(t, e, i, r);
}
function Su(t) {
  return t instanceof ii || (t = Ge(t)), t ? (t = t.rgb(), new it(t.r, t.g, t.b, t.opacity)) : new it();
}
function on(t, e, i, r) {
  return arguments.length === 1 ? Su(t) : new it(t, e, i, r ?? 1);
}
function it(t, e, i, r) {
  this.r = +t, this.g = +e, this.b = +i, this.opacity = +r;
}
En(it, on, Xs(ii, {
  brighter(t) {
    return t = t == null ? Wi : Math.pow(Wi, t), new it(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Ue : Math.pow(Ue, t), new it(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new it(Kt(this.r), Kt(this.g), Kt(this.b), Hi(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Fo,
  // Deprecated! Use color.formatHex.
  formatHex: Fo,
  formatHex8: vu,
  formatRgb: Mo,
  toString: Mo
}));
function Fo() {
  return `#${Vt(this.r)}${Vt(this.g)}${Vt(this.b)}`;
}
function vu() {
  return `#${Vt(this.r)}${Vt(this.g)}${Vt(this.b)}${Vt((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Mo() {
  const t = Hi(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${Kt(this.r)}, ${Kt(this.g)}, ${Kt(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function Hi(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function Kt(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function Vt(t) {
  return t = Kt(t), (t < 16 ? "0" : "") + t.toString(16);
}
function Oo(t, e, i, r) {
  return r <= 0 ? t = e = i = NaN : i <= 0 || i >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new pt(t, e, i, r);
}
function Ks(t) {
  if (t instanceof pt)
    return new pt(t.h, t.s, t.l, t.opacity);
  if (t instanceof ii || (t = Ge(t)), !t)
    return new pt();
  if (t instanceof pt)
    return t;
  t = t.rgb();
  var e = t.r / 255, i = t.g / 255, r = t.b / 255, n = Math.min(e, i, r), o = Math.max(e, i, r), s = NaN, a = o - n, l = (o + n) / 2;
  return a ? (e === o ? s = (i - r) / a + (i < r) * 6 : i === o ? s = (r - e) / a + 2 : s = (e - i) / a + 4, a /= l < 0.5 ? o + n : 2 - o - n, s *= 60) : a = l > 0 && l < 1 ? 0 : s, new pt(s, a, l, t.opacity);
}
function ku(t, e, i, r) {
  return arguments.length === 1 ? Ks(t) : new pt(t, e, i, r ?? 1);
}
function pt(t, e, i, r) {
  this.h = +t, this.s = +e, this.l = +i, this.opacity = +r;
}
En(pt, ku, Xs(ii, {
  brighter(t) {
    return t = t == null ? Wi : Math.pow(Wi, t), new pt(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Ue : Math.pow(Ue, t), new pt(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, e = isNaN(t) || isNaN(this.s) ? 0 : this.s, i = this.l, r = i + (i < 0.5 ? i : 1 - i) * e, n = 2 * i - r;
    return new it(
      Pr(t >= 240 ? t - 240 : t + 120, n, r),
      Pr(t, n, r),
      Pr(t < 120 ? t + 240 : t - 120, n, r),
      this.opacity
    );
  },
  clamp() {
    return new pt($o(this.h), _i(this.s), _i(this.l), Hi(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = Hi(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${$o(this.h)}, ${_i(this.s) * 100}%, ${_i(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function $o(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function _i(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function Pr(t, e, i) {
  return (t < 60 ? e + (i - e) * t / 60 : t < 180 ? i : t < 240 ? e + (i - e) * (240 - t) / 60 : e) * 255;
}
const Fn = (t) => () => t;
function Zs(t, e) {
  return function(i) {
    return t + i * e;
  };
}
function wu(t, e, i) {
  return t = Math.pow(t, i), e = Math.pow(e, i) - t, i = 1 / i, function(r) {
    return Math.pow(t + r * e, i);
  };
}
function Ub(t, e) {
  var i = e - t;
  return i ? Zs(t, i > 180 || i < -180 ? i - 360 * Math.round(i / 360) : i) : Fn(isNaN(t) ? e : t);
}
function Bu(t) {
  return (t = +t) == 1 ? Js : function(e, i) {
    return i - e ? wu(e, i, t) : Fn(isNaN(e) ? i : e);
  };
}
function Js(t, e) {
  var i = e - t;
  return i ? Zs(t, i) : Fn(isNaN(t) ? e : t);
}
const Io = function t(e) {
  var i = Bu(e);
  function r(n, o) {
    var s = i((n = on(n)).r, (o = on(o)).r), a = i(n.g, o.g), l = i(n.b, o.b), c = Js(n.opacity, o.opacity);
    return function(h) {
      return n.r = s(h), n.g = a(h), n.b = l(h), n.opacity = c(h), n + "";
    };
  }
  return r.gamma = t, r;
}(1);
function It(t, e) {
  return t = +t, e = +e, function(i) {
    return t * (1 - i) + e * i;
  };
}
var sn = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Wr = new RegExp(sn.source, "g");
function Lu(t) {
  return function() {
    return t;
  };
}
function Au(t) {
  return function(e) {
    return t(e) + "";
  };
}
function Eu(t, e) {
  var i = sn.lastIndex = Wr.lastIndex = 0, r, n, o, s = -1, a = [], l = [];
  for (t = t + "", e = e + ""; (r = sn.exec(t)) && (n = Wr.exec(e)); )
    (o = n.index) > i && (o = e.slice(i, o), a[s] ? a[s] += o : a[++s] = o), (r = r[0]) === (n = n[0]) ? a[s] ? a[s] += n : a[++s] = n : (a[++s] = null, l.push({ i: s, x: It(r, n) })), i = Wr.lastIndex;
  return i < e.length && (o = e.slice(i), a[s] ? a[s] += o : a[++s] = o), a.length < 2 ? l[0] ? Au(l[0].x) : Lu(e) : (e = l.length, function(c) {
    for (var h = 0, u; h < e; ++h)
      a[(u = l[h]).i] = u.x(c);
    return a.join("");
  });
}
var Do = 180 / Math.PI, an = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function Qs(t, e, i, r, n, o) {
  var s, a, l;
  return (s = Math.sqrt(t * t + e * e)) && (t /= s, e /= s), (l = t * i + e * r) && (i -= t * l, r -= e * l), (a = Math.sqrt(i * i + r * r)) && (i /= a, r /= a, l /= a), t * r < e * i && (t = -t, e = -e, l = -l, s = -s), {
    translateX: n,
    translateY: o,
    rotate: Math.atan2(e, t) * Do,
    skewX: Math.atan(l) * Do,
    scaleX: s,
    scaleY: a
  };
}
var yi;
function Fu(t) {
  const e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return e.isIdentity ? an : Qs(e.a, e.b, e.c, e.d, e.e, e.f);
}
function Mu(t) {
  return t == null || (yi || (yi = document.createElementNS("http://www.w3.org/2000/svg", "g")), yi.setAttribute("transform", t), !(t = yi.transform.baseVal.consolidate())) ? an : (t = t.matrix, Qs(t.a, t.b, t.c, t.d, t.e, t.f));
}
function ta(t, e, i, r) {
  function n(c) {
    return c.length ? c.pop() + " " : "";
  }
  function o(c, h, u, g, d, _) {
    if (c !== u || h !== g) {
      var T = d.push("translate(", null, e, null, i);
      _.push({ i: T - 4, x: It(c, u) }, { i: T - 2, x: It(h, g) });
    } else
      (u || g) && d.push("translate(" + u + e + g + i);
  }
  function s(c, h, u, g) {
    c !== h ? (c - h > 180 ? h += 360 : h - c > 180 && (c += 360), g.push({ i: u.push(n(u) + "rotate(", null, r) - 2, x: It(c, h) })) : h && u.push(n(u) + "rotate(" + h + r);
  }
  function a(c, h, u, g) {
    c !== h ? g.push({ i: u.push(n(u) + "skewX(", null, r) - 2, x: It(c, h) }) : h && u.push(n(u) + "skewX(" + h + r);
  }
  function l(c, h, u, g, d, _) {
    if (c !== u || h !== g) {
      var T = d.push(n(d) + "scale(", null, ",", null, ")");
      _.push({ i: T - 4, x: It(c, u) }, { i: T - 2, x: It(h, g) });
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
var Ou = ta(Fu, "px, ", "px)", "deg)"), $u = ta(Mu, ", ", ")", ")"), Te = 0, Ne = 0, Oe = 0, ea = 1e3, qi, Re, ji = 0, Qt = 0, cr = 0, Ve = typeof performance == "object" && performance.now ? performance : Date, ia = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function Mn() {
  return Qt || (ia(Iu), Qt = Ve.now() + cr);
}
function Iu() {
  Qt = 0;
}
function Ui() {
  this._call = this._time = this._next = null;
}
Ui.prototype = ra.prototype = {
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
function ra(t, e, i) {
  var r = new Ui();
  return r.restart(t, e, i), r;
}
function Du() {
  Mn(), ++Te;
  for (var t = qi, e; t; )
    (e = Qt - t._time) >= 0 && t._call.call(void 0, e), t = t._next;
  --Te;
}
function No() {
  Qt = (ji = Ve.now()) + cr, Te = Ne = 0;
  try {
    Du();
  } finally {
    Te = 0, Ru(), Qt = 0;
  }
}
function Nu() {
  var t = Ve.now(), e = t - ji;
  e > ea && (cr -= e, ji = t);
}
function Ru() {
  for (var t, e = qi, i, r = 1 / 0; e; )
    e._call ? (r > e._time && (r = e._time), t = e, e = e._next) : (i = e._next, e._next = null, e = t ? t._next = i : qi = i);
  Re = t, ln(r);
}
function ln(t) {
  if (!Te) {
    Ne && (Ne = clearTimeout(Ne));
    var e = t - Qt;
    e > 24 ? (t < 1 / 0 && (Ne = setTimeout(No, t - Ve.now() - cr)), Oe && (Oe = clearInterval(Oe))) : (Oe || (ji = Ve.now(), Oe = setInterval(Nu, ea)), Te = 1, ia(No));
  }
}
function Ro(t, e, i) {
  var r = new Ui();
  return e = e == null ? 0 : +e, r.restart((n) => {
    r.stop(), t(n + e);
  }, e, i), r;
}
var zu = Ds("start", "end", "cancel", "interrupt"), Pu = [], na = 0, zo = 1, cn = 2, Bi = 3, Po = 4, hn = 5, Li = 6;
function hr(t, e, i, r, n, o) {
  var s = t.__transition;
  if (!s)
    t.__transition = {};
  else if (i in s)
    return;
  Wu(t, i, {
    name: e,
    index: r,
    // For context during callback.
    group: n,
    // For context during callback.
    on: zu,
    tween: Pu,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: na
  });
}
function On(t, e) {
  var i = _t(t, e);
  if (i.state > na)
    throw new Error("too late; already scheduled");
  return i;
}
function Tt(t, e) {
  var i = _t(t, e);
  if (i.state > Bi)
    throw new Error("too late; already running");
  return i;
}
function _t(t, e) {
  var i = t.__transition;
  if (!i || !(i = i[e]))
    throw new Error("transition not found");
  return i;
}
function Wu(t, e, i) {
  var r = t.__transition, n;
  r[e] = i, i.timer = ra(o, 0, i.time);
  function o(c) {
    i.state = zo, i.timer.restart(s, i.delay, i.time), i.delay <= c && s(c - i.delay);
  }
  function s(c) {
    var h, u, g, d;
    if (i.state !== zo)
      return l();
    for (h in r)
      if (d = r[h], d.name === i.name) {
        if (d.state === Bi)
          return Ro(s);
        d.state === Po ? (d.state = Li, d.timer.stop(), d.on.call("interrupt", t, t.__data__, d.index, d.group), delete r[h]) : +h < e && (d.state = Li, d.timer.stop(), d.on.call("cancel", t, t.__data__, d.index, d.group), delete r[h]);
      }
    if (Ro(function() {
      i.state === Bi && (i.state = Po, i.timer.restart(a, i.delay, i.time), a(c));
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
function Hu(t, e) {
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
function qu(t) {
  return this.each(function() {
    Hu(this, t);
  });
}
function ju(t, e) {
  var i, r;
  return function() {
    var n = Tt(this, t), o = n.tween;
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
function Uu(t, e, i) {
  var r, n;
  if (typeof i != "function")
    throw new Error();
  return function() {
    var o = Tt(this, t), s = o.tween;
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
function Yu(t, e) {
  var i = this._id;
  if (t += "", arguments.length < 2) {
    for (var r = _t(this.node(), i).tween, n = 0, o = r.length, s; n < o; ++n)
      if ((s = r[n]).name === t)
        return s.value;
    return null;
  }
  return this.each((e == null ? ju : Uu)(i, t, e));
}
function $n(t, e, i) {
  var r = t._id;
  return t.each(function() {
    var n = Tt(this, r);
    (n.value || (n.value = {}))[e] = i.apply(this, arguments);
  }), function(n) {
    return _t(n, r).value[e];
  };
}
function oa(t, e) {
  var i;
  return (typeof e == "number" ? It : e instanceof Ge ? Io : (i = Ge(e)) ? (e = i, Io) : Eu)(t, e);
}
function Gu(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Vu(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Xu(t, e, i) {
  var r, n = i + "", o;
  return function() {
    var s = this.getAttribute(t);
    return s === n ? null : s === r ? o : o = e(r = s, i);
  };
}
function Ku(t, e, i) {
  var r, n = i + "", o;
  return function() {
    var s = this.getAttributeNS(t.space, t.local);
    return s === n ? null : s === r ? o : o = e(r = s, i);
  };
}
function Zu(t, e, i) {
  var r, n, o;
  return function() {
    var s, a = i(this), l;
    return a == null ? void this.removeAttribute(t) : (s = this.getAttribute(t), l = a + "", s === l ? null : s === r && l === n ? o : (n = l, o = e(r = s, a)));
  };
}
function Ju(t, e, i) {
  var r, n, o;
  return function() {
    var s, a = i(this), l;
    return a == null ? void this.removeAttributeNS(t.space, t.local) : (s = this.getAttributeNS(t.space, t.local), l = a + "", s === l ? null : s === r && l === n ? o : (n = l, o = e(r = s, a)));
  };
}
function Qu(t, e) {
  var i = lr(t), r = i === "transform" ? $u : oa;
  return this.attrTween(t, typeof e == "function" ? (i.local ? Ju : Zu)(i, r, $n(this, "attr." + t, e)) : e == null ? (i.local ? Vu : Gu)(i) : (i.local ? Ku : Xu)(i, r, e));
}
function tf(t, e) {
  return function(i) {
    this.setAttribute(t, e.call(this, i));
  };
}
function ef(t, e) {
  return function(i) {
    this.setAttributeNS(t.space, t.local, e.call(this, i));
  };
}
function rf(t, e) {
  var i, r;
  function n() {
    var o = e.apply(this, arguments);
    return o !== r && (i = (r = o) && ef(t, o)), i;
  }
  return n._value = e, n;
}
function nf(t, e) {
  var i, r;
  function n() {
    var o = e.apply(this, arguments);
    return o !== r && (i = (r = o) && tf(t, o)), i;
  }
  return n._value = e, n;
}
function of(t, e) {
  var i = "attr." + t;
  if (arguments.length < 2)
    return (i = this.tween(i)) && i._value;
  if (e == null)
    return this.tween(i, null);
  if (typeof e != "function")
    throw new Error();
  var r = lr(t);
  return this.tween(i, (r.local ? rf : nf)(r, e));
}
function sf(t, e) {
  return function() {
    On(this, t).delay = +e.apply(this, arguments);
  };
}
function af(t, e) {
  return e = +e, function() {
    On(this, t).delay = e;
  };
}
function lf(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? sf : af)(e, t)) : _t(this.node(), e).delay;
}
function cf(t, e) {
  return function() {
    Tt(this, t).duration = +e.apply(this, arguments);
  };
}
function hf(t, e) {
  return e = +e, function() {
    Tt(this, t).duration = e;
  };
}
function uf(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? cf : hf)(e, t)) : _t(this.node(), e).duration;
}
function ff(t, e) {
  if (typeof e != "function")
    throw new Error();
  return function() {
    Tt(this, t).ease = e;
  };
}
function df(t) {
  var e = this._id;
  return arguments.length ? this.each(ff(e, t)) : _t(this.node(), e).ease;
}
function pf(t, e) {
  return function() {
    var i = e.apply(this, arguments);
    if (typeof i != "function")
      throw new Error();
    Tt(this, t).ease = i;
  };
}
function gf(t) {
  if (typeof t != "function")
    throw new Error();
  return this.each(pf(this._id, t));
}
function mf(t) {
  typeof t != "function" && (t = zs(t));
  for (var e = this._groups, i = e.length, r = new Array(i), n = 0; n < i; ++n)
    for (var o = e[n], s = o.length, a = r[n] = [], l, c = 0; c < s; ++c)
      (l = o[c]) && t.call(l, l.__data__, c, o) && a.push(l);
  return new At(r, this._parents, this._name, this._id);
}
function _f(t) {
  if (t._id !== this._id)
    throw new Error();
  for (var e = this._groups, i = t._groups, r = e.length, n = i.length, o = Math.min(r, n), s = new Array(r), a = 0; a < o; ++a)
    for (var l = e[a], c = i[a], h = l.length, u = s[a] = new Array(h), g, d = 0; d < h; ++d)
      (g = l[d] || c[d]) && (u[d] = g);
  for (; a < r; ++a)
    s[a] = e[a];
  return new At(s, this._parents, this._name, this._id);
}
function yf(t) {
  return (t + "").trim().split(/^|\s+/).every(function(e) {
    var i = e.indexOf(".");
    return i >= 0 && (e = e.slice(0, i)), !e || e === "start";
  });
}
function Cf(t, e, i) {
  var r, n, o = yf(e) ? On : Tt;
  return function() {
    var s = o(this, t), a = s.on;
    a !== r && (n = (r = a).copy()).on(e, i), s.on = n;
  };
}
function bf(t, e) {
  var i = this._id;
  return arguments.length < 2 ? _t(this.node(), i).on.on(t) : this.each(Cf(i, t, e));
}
function xf(t) {
  return function() {
    var e = this.parentNode;
    for (var i in this.__transition)
      if (+i !== t)
        return;
    e && e.removeChild(this);
  };
}
function Tf() {
  return this.on("end.remove", xf(this._id));
}
function Sf(t) {
  var e = this._name, i = this._id;
  typeof t != "function" && (t = Ln(t));
  for (var r = this._groups, n = r.length, o = new Array(n), s = 0; s < n; ++s)
    for (var a = r[s], l = a.length, c = o[s] = new Array(l), h, u, g = 0; g < l; ++g)
      (h = a[g]) && (u = t.call(h, h.__data__, g, a)) && ("__data__" in h && (u.__data__ = h.__data__), c[g] = u, hr(c[g], e, i, g, c, _t(h, i)));
  return new At(o, this._parents, e, i);
}
function vf(t) {
  var e = this._name, i = this._id;
  typeof t != "function" && (t = Rs(t));
  for (var r = this._groups, n = r.length, o = [], s = [], a = 0; a < n; ++a)
    for (var l = r[a], c = l.length, h, u = 0; u < c; ++u)
      if (h = l[u]) {
        for (var g = t.call(h, h.__data__, u, l), d, _ = _t(h, i), T = 0, w = g.length; T < w; ++T)
          (d = g[T]) && hr(d, e, i, T, g, _);
        o.push(g), s.push(h);
      }
  return new At(o, s, e, i);
}
var kf = ei.prototype.constructor;
function wf() {
  return new kf(this._groups, this._parents);
}
function Bf(t, e) {
  var i, r, n;
  return function() {
    var o = xe(this, t), s = (this.style.removeProperty(t), xe(this, t));
    return o === s ? null : o === i && s === r ? n : n = e(i = o, r = s);
  };
}
function sa(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Lf(t, e, i) {
  var r, n = i + "", o;
  return function() {
    var s = xe(this, t);
    return s === n ? null : s === r ? o : o = e(r = s, i);
  };
}
function Af(t, e, i) {
  var r, n, o;
  return function() {
    var s = xe(this, t), a = i(this), l = a + "";
    return a == null && (l = a = (this.style.removeProperty(t), xe(this, t))), s === l ? null : s === r && l === n ? o : (n = l, o = e(r = s, a));
  };
}
function Ef(t, e) {
  var i, r, n, o = "style." + e, s = "end." + o, a;
  return function() {
    var l = Tt(this, t), c = l.on, h = l.value[o] == null ? a || (a = sa(e)) : void 0;
    (c !== i || n !== h) && (r = (i = c).copy()).on(s, n = h), l.on = r;
  };
}
function Ff(t, e, i) {
  var r = (t += "") == "transform" ? Ou : oa;
  return e == null ? this.styleTween(t, Bf(t, r)).on("end.style." + t, sa(t)) : typeof e == "function" ? this.styleTween(t, Af(t, r, $n(this, "style." + t, e))).each(Ef(this._id, t)) : this.styleTween(t, Lf(t, r, e), i).on("end.style." + t, null);
}
function Mf(t, e, i) {
  return function(r) {
    this.style.setProperty(t, e.call(this, r), i);
  };
}
function Of(t, e, i) {
  var r, n;
  function o() {
    var s = e.apply(this, arguments);
    return s !== n && (r = (n = s) && Mf(t, s, i)), r;
  }
  return o._value = e, o;
}
function $f(t, e, i) {
  var r = "style." + (t += "");
  if (arguments.length < 2)
    return (r = this.tween(r)) && r._value;
  if (e == null)
    return this.tween(r, null);
  if (typeof e != "function")
    throw new Error();
  return this.tween(r, Of(t, e, i ?? ""));
}
function If(t) {
  return function() {
    this.textContent = t;
  };
}
function Df(t) {
  return function() {
    var e = t(this);
    this.textContent = e ?? "";
  };
}
function Nf(t) {
  return this.tween("text", typeof t == "function" ? Df($n(this, "text", t)) : If(t == null ? "" : t + ""));
}
function Rf(t) {
  return function(e) {
    this.textContent = t.call(this, e);
  };
}
function zf(t) {
  var e, i;
  function r() {
    var n = t.apply(this, arguments);
    return n !== i && (e = (i = n) && Rf(n)), e;
  }
  return r._value = t, r;
}
function Pf(t) {
  var e = "text";
  if (arguments.length < 1)
    return (e = this.tween(e)) && e._value;
  if (t == null)
    return this.tween(e, null);
  if (typeof t != "function")
    throw new Error();
  return this.tween(e, zf(t));
}
function Wf() {
  for (var t = this._name, e = this._id, i = aa(), r = this._groups, n = r.length, o = 0; o < n; ++o)
    for (var s = r[o], a = s.length, l, c = 0; c < a; ++c)
      if (l = s[c]) {
        var h = _t(l, e);
        hr(l, t, i, c, s, {
          time: h.time + h.delay + h.duration,
          delay: 0,
          duration: h.duration,
          ease: h.ease
        });
      }
  return new At(r, this._parents, t, i);
}
function Hf() {
  var t, e, i = this, r = i._id, n = i.size();
  return new Promise(function(o, s) {
    var a = { value: s }, l = { value: function() {
      --n === 0 && o();
    } };
    i.each(function() {
      var c = Tt(this, r), h = c.on;
      h !== t && (e = (t = h).copy(), e._.cancel.push(a), e._.interrupt.push(a), e._.end.push(l)), c.on = e;
    }), n === 0 && o();
  });
}
var qf = 0;
function At(t, e, i, r) {
  this._groups = t, this._parents = e, this._name = i, this._id = r;
}
function aa() {
  return ++qf;
}
var wt = ei.prototype;
At.prototype = {
  constructor: At,
  select: Sf,
  selectAll: vf,
  selectChild: wt.selectChild,
  selectChildren: wt.selectChildren,
  filter: mf,
  merge: _f,
  selection: wf,
  transition: Wf,
  call: wt.call,
  nodes: wt.nodes,
  node: wt.node,
  size: wt.size,
  empty: wt.empty,
  each: wt.each,
  on: bf,
  attr: Qu,
  attrTween: of,
  style: Ff,
  styleTween: $f,
  text: Nf,
  textTween: Pf,
  remove: Tf,
  tween: Yu,
  delay: lf,
  duration: uf,
  ease: df,
  easeVarying: gf,
  end: Hf,
  [Symbol.iterator]: wt[Symbol.iterator]
};
function jf(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var Uf = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: jf
};
function Yf(t, e) {
  for (var i; !(i = t.__transition) || !(i = i[e]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${e} not found`);
  return i;
}
function Gf(t) {
  var e, i;
  t instanceof At ? (e = t._id, t = t._name) : (e = aa(), (i = Uf).time = Mn(), t = t == null ? null : t + "");
  for (var r = this._groups, n = r.length, o = 0; o < n; ++o)
    for (var s = r[o], a = s.length, l, c = 0; c < a; ++c)
      (l = s[c]) && hr(l, t, e, c, s, i || Yf(l, e));
  return new At(r, this._parents, t, e);
}
ei.prototype.interrupt = qu;
ei.prototype.transition = Gf;
const Yb = Math.abs, Gb = Math.atan2, Vb = Math.cos, Xb = Math.max, Kb = Math.min, Zb = Math.sin, Jb = Math.sqrt, Wo = 1e-12, In = Math.PI, Ho = In / 2, Qb = 2 * In;
function tx(t) {
  return t > 1 ? 0 : t < -1 ? In : Math.acos(t);
}
function ex(t) {
  return t >= 1 ? Ho : t <= -1 ? -Ho : Math.asin(t);
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
function Vf(t) {
  return new la(t);
}
class ca {
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
function Xf(t) {
  return new ca(t, !0);
}
function Kf(t) {
  return new ca(t, !1);
}
function zt() {
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
function Zf(t) {
  return new ur(t);
}
function ha(t) {
  this._context = t;
}
ha.prototype = {
  areaStart: zt,
  areaEnd: zt,
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
function Jf(t) {
  return new ha(t);
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
function Qf(t) {
  return new ua(t);
}
function fa(t, e) {
  this._basis = new ur(t), this._beta = e;
}
fa.prototype = {
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
const td = function t(e) {
  function i(r) {
    return e === 1 ? new ur(r) : new fa(r, e);
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
const ed = function t(e) {
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
  areaStart: zt,
  areaEnd: zt,
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
const id = function t(e) {
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
        Gi(this, t, e);
        break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = e;
  }
};
const rd = function t(e) {
  function i(r) {
    return new Rn(r, e);
  }
  return i.tension = function(r) {
    return t(+r);
  }, i;
}(0);
function zn(t, e, i) {
  var r = t._x1, n = t._y1, o = t._x2, s = t._y2;
  if (t._l01_a > Wo) {
    var a = 2 * t._l01_2a + 3 * t._l01_a * t._l12_a + t._l12_2a, l = 3 * t._l01_a * (t._l01_a + t._l12_a);
    r = (r * a - t._x0 * t._l12_2a + t._x2 * t._l01_2a) / l, n = (n * a - t._y0 * t._l12_2a + t._y2 * t._l01_2a) / l;
  }
  if (t._l23_a > Wo) {
    var c = 2 * t._l23_2a + 3 * t._l23_a * t._l12_a + t._l12_2a, h = 3 * t._l23_a * (t._l23_a + t._l12_a);
    o = (o * c + t._x1 * t._l23_2a - e * t._l12_2a) / h, s = (s * c + t._y1 * t._l23_2a - i * t._l12_2a) / h;
  }
  t._context.bezierCurveTo(r, n, o, s, t._x2, t._y2);
}
function da(t, e) {
  this._context = t, this._alpha = e;
}
da.prototype = {
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
const nd = function t(e) {
  function i(r) {
    return e ? new da(r, e) : new Dn(r, 0);
  }
  return i.alpha = function(r) {
    return t(+r);
  }, i;
}(0.5);
function pa(t, e) {
  this._context = t, this._alpha = e;
}
pa.prototype = {
  areaStart: zt,
  areaEnd: zt,
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
const od = function t(e) {
  function i(r) {
    return e ? new pa(r, e) : new Nn(r, 0);
  }
  return i.alpha = function(r) {
    return t(+r);
  }, i;
}(0.5);
function ga(t, e) {
  this._context = t, this._alpha = e;
}
ga.prototype = {
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
const sd = function t(e) {
  function i(r) {
    return e ? new ga(r, e) : new Rn(r, 0);
  }
  return i.alpha = function(r) {
    return t(+r);
  }, i;
}(0.5);
function ma(t) {
  this._context = t;
}
ma.prototype = {
  areaStart: zt,
  areaEnd: zt,
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
function ad(t) {
  return new ma(t);
}
function qo(t) {
  return t < 0 ? -1 : 1;
}
function jo(t, e, i) {
  var r = t._x1 - t._x0, n = e - t._x1, o = (t._y1 - t._y0) / (r || n < 0 && -0), s = (i - t._y1) / (n || r < 0 && -0), a = (o * n + s * r) / (r + n);
  return (qo(o) + qo(s)) * Math.min(Math.abs(o), Math.abs(s), 0.5 * Math.abs(a)) || 0;
}
function Uo(t, e) {
  var i = t._x1 - t._x0;
  return i ? (3 * (t._y1 - t._y0) / i - e) / 2 : e;
}
function Hr(t, e, i) {
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
        Hr(this, this._t0, Uo(this, this._t0));
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
          this._point = 3, Hr(this, Uo(this, i = jo(this, t, e)), i);
          break;
        default:
          Hr(this, this._t0, i = jo(this, t, e));
          break;
      }
      this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = e, this._t0 = i;
    }
  }
};
function _a(t) {
  this._context = new ya(t);
}
(_a.prototype = Object.create(Vi.prototype)).point = function(t, e) {
  Vi.prototype.point.call(this, e, t);
};
function ya(t) {
  this._context = t;
}
ya.prototype = {
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
function ld(t) {
  return new Vi(t);
}
function cd(t) {
  return new _a(t);
}
function Ca(t) {
  this._context = t;
}
Ca.prototype = {
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
        for (var r = Yo(t), n = Yo(e), o = 0, s = 1; s < i; ++o, ++s)
          this._context.bezierCurveTo(r[0][o], n[0][o], r[1][o], n[1][o], t[s], e[s]);
    (this._line || this._line !== 0 && i === 1) && this._context.closePath(), this._line = 1 - this._line, this._x = this._y = null;
  },
  point: function(t, e) {
    this._x.push(+t), this._y.push(+e);
  }
};
function Yo(t) {
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
function hd(t) {
  return new Ca(t);
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
function ud(t) {
  return new fr(t, 0.5);
}
function fd(t) {
  return new fr(t, 0);
}
function dd(t) {
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
/*! @license DOMPurify 3.0.3 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.0.3/LICENSE */
const {
  entries: ba,
  setPrototypeOf: Go,
  isFrozen: pd,
  getPrototypeOf: gd,
  getOwnPropertyDescriptor: md
} = Object;
let {
  freeze: tt,
  seal: mt,
  create: _d
} = Object, {
  apply: un,
  construct: fn
} = typeof Reflect < "u" && Reflect;
un || (un = function(e, i, r) {
  return e.apply(i, r);
});
tt || (tt = function(e) {
  return e;
});
mt || (mt = function(e) {
  return e;
});
fn || (fn = function(e, i) {
  return new e(...i);
});
const yd = ht(Array.prototype.forEach), Vo = ht(Array.prototype.pop), $e = ht(Array.prototype.push), Ai = ht(String.prototype.toLowerCase), qr = ht(String.prototype.toString), Cd = ht(String.prototype.match), ft = ht(String.prototype.replace), bd = ht(String.prototype.indexOf), xd = ht(String.prototype.trim), ot = ht(RegExp.prototype.test), Ie = Td(TypeError);
function ht(t) {
  return function(e) {
    for (var i = arguments.length, r = new Array(i > 1 ? i - 1 : 0), n = 1; n < i; n++)
      r[n - 1] = arguments[n];
    return un(t, e, r);
  };
}
function Td(t) {
  return function() {
    for (var e = arguments.length, i = new Array(e), r = 0; r < e; r++)
      i[r] = arguments[r];
    return fn(t, i);
  };
}
function F(t, e, i) {
  var r;
  i = (r = i) !== null && r !== void 0 ? r : Ai, Go && Go(t, null);
  let n = e.length;
  for (; n--; ) {
    let o = e[n];
    if (typeof o == "string") {
      const s = i(o);
      s !== o && (pd(e) || (e[n] = s), o = s);
    }
    t[o] = !0;
  }
  return t;
}
function ue(t) {
  const e = _d(null);
  for (const [i, r] of ba(t))
    e[i] = r;
  return e;
}
function Ci(t, e) {
  for (; t !== null; ) {
    const r = md(t, e);
    if (r) {
      if (r.get)
        return ht(r.get);
      if (typeof r.value == "function")
        return ht(r.value);
    }
    t = gd(t);
  }
  function i(r) {
    return console.warn("fallback value for", r), null;
  }
  return i;
}
const Xo = tt(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "section", "select", "shadow", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), jr = tt(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), Ur = tt(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), Sd = tt(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), Yr = tt(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), vd = tt(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), Ko = tt(["#text"]), Zo = tt(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "pattern", "placeholder", "playsinline", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "xmlns", "slot"]), Gr = tt(["accent-height", "accumulate", "additive", "alignment-baseline", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), Jo = tt(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), bi = tt(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), kd = mt(/\{\{[\w\W]*|[\w\W]*\}\}/gm), wd = mt(/<%[\w\W]*|[\w\W]*%>/gm), Bd = mt(/\${[\w\W]*}/gm), Ld = mt(/^data-[\-\w.\u00B7-\uFFFF]/), Ad = mt(/^aria-[\-\w]+$/), xa = mt(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
), Ed = mt(/^(?:\w+script|data):/i), Fd = mt(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
), Ta = mt(/^html$/i);
var Qo = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  MUSTACHE_EXPR: kd,
  ERB_EXPR: wd,
  TMPLIT_EXPR: Bd,
  DATA_ATTR: Ld,
  ARIA_ATTR: Ad,
  IS_ALLOWED_URI: xa,
  IS_SCRIPT_OR_DATA: Ed,
  ATTR_WHITESPACE: Fd,
  DOCTYPE_NAME: Ta
});
const Md = () => typeof window > "u" ? null : window, Od = function(e, i) {
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
function Sa() {
  let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : Md();
  const e = (S) => Sa(S);
  if (e.version = "3.0.3", e.removed = [], !t || !t.document || t.document.nodeType !== 9)
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
    NodeFilter: c,
    NamedNodeMap: h = t.NamedNodeMap || t.MozNamedAttrMap,
    HTMLFormElement: u,
    DOMParser: g,
    trustedTypes: d
  } = t, _ = l.prototype, T = Ci(_, "cloneNode"), w = Ci(_, "nextSibling"), A = Ci(_, "childNodes"), C = Ci(_, "parentNode");
  if (typeof s == "function") {
    const S = n.createElement("template");
    S.content && S.content.ownerDocument && (n = S.content.ownerDocument);
  }
  let B, D = "";
  const {
    implementation: R,
    createNodeIterator: V,
    createDocumentFragment: O,
    getElementsByTagName: kr
  } = n, {
    importNode: wr
  } = i;
  let q = {};
  e.isSupported = typeof ba == "function" && typeof C == "function" && R && R.createHTMLDocument !== void 0;
  const {
    MUSTACHE_EXPR: oi,
    ERB_EXPR: Ht,
    TMPLIT_EXPR: ne,
    DATA_ATTR: si,
    ARIA_ATTR: ai,
    IS_SCRIPT_OR_DATA: li,
    ATTR_WHITESPACE: nt
  } = Qo;
  let {
    IS_ALLOWED_URI: ci
  } = Qo, P = null;
  const eo = F({}, [...Xo, ...jr, ...Ur, ...Yr, ...Ko]);
  let j = null;
  const io = F({}, [...Zo, ...Gr, ...Jo, ...bi]);
  let z = Object.seal(Object.create(null, {
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
  })), Fe = null, Br = null, ro = !0, Lr = !0, no = !1, oo = !0, oe = !1, qt = !1, Ar = !1, Er = !1, se = !1, hi = !1, ui = !1, so = !0, ao = !1;
  const Ql = "user-content-";
  let Fr = !0, Me = !1, ae = {}, le = null;
  const lo = F({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
  let co = null;
  const ho = F({}, ["audio", "video", "img", "source", "image", "track"]);
  let Mr = null;
  const uo = F({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), fi = "http://www.w3.org/1998/Math/MathML", di = "http://www.w3.org/2000/svg", St = "http://www.w3.org/1999/xhtml";
  let ce = St, Or = !1, $r = null;
  const tc = F({}, [fi, di, St], qr);
  let jt;
  const ec = ["application/xhtml+xml", "text/html"], ic = "text/html";
  let U, he = null;
  const rc = n.createElement("form"), fo = function(f) {
    return f instanceof RegExp || f instanceof Function;
  }, Ir = function(f) {
    if (!(he && he === f)) {
      if ((!f || typeof f != "object") && (f = {}), f = ue(f), jt = // eslint-disable-next-line unicorn/prefer-includes
      ec.indexOf(f.PARSER_MEDIA_TYPE) === -1 ? jt = ic : jt = f.PARSER_MEDIA_TYPE, U = jt === "application/xhtml+xml" ? qr : Ai, P = "ALLOWED_TAGS" in f ? F({}, f.ALLOWED_TAGS, U) : eo, j = "ALLOWED_ATTR" in f ? F({}, f.ALLOWED_ATTR, U) : io, $r = "ALLOWED_NAMESPACES" in f ? F({}, f.ALLOWED_NAMESPACES, qr) : tc, Mr = "ADD_URI_SAFE_ATTR" in f ? F(
        ue(uo),
        // eslint-disable-line indent
        f.ADD_URI_SAFE_ATTR,
        // eslint-disable-line indent
        U
        // eslint-disable-line indent
      ) : uo, co = "ADD_DATA_URI_TAGS" in f ? F(
        ue(ho),
        // eslint-disable-line indent
        f.ADD_DATA_URI_TAGS,
        // eslint-disable-line indent
        U
        // eslint-disable-line indent
      ) : ho, le = "FORBID_CONTENTS" in f ? F({}, f.FORBID_CONTENTS, U) : lo, Fe = "FORBID_TAGS" in f ? F({}, f.FORBID_TAGS, U) : {}, Br = "FORBID_ATTR" in f ? F({}, f.FORBID_ATTR, U) : {}, ae = "USE_PROFILES" in f ? f.USE_PROFILES : !1, ro = f.ALLOW_ARIA_ATTR !== !1, Lr = f.ALLOW_DATA_ATTR !== !1, no = f.ALLOW_UNKNOWN_PROTOCOLS || !1, oo = f.ALLOW_SELF_CLOSE_IN_ATTR !== !1, oe = f.SAFE_FOR_TEMPLATES || !1, qt = f.WHOLE_DOCUMENT || !1, se = f.RETURN_DOM || !1, hi = f.RETURN_DOM_FRAGMENT || !1, ui = f.RETURN_TRUSTED_TYPE || !1, Er = f.FORCE_BODY || !1, so = f.SANITIZE_DOM !== !1, ao = f.SANITIZE_NAMED_PROPS || !1, Fr = f.KEEP_CONTENT !== !1, Me = f.IN_PLACE || !1, ci = f.ALLOWED_URI_REGEXP || xa, ce = f.NAMESPACE || St, z = f.CUSTOM_ELEMENT_HANDLING || {}, f.CUSTOM_ELEMENT_HANDLING && fo(f.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (z.tagNameCheck = f.CUSTOM_ELEMENT_HANDLING.tagNameCheck), f.CUSTOM_ELEMENT_HANDLING && fo(f.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (z.attributeNameCheck = f.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), f.CUSTOM_ELEMENT_HANDLING && typeof f.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements == "boolean" && (z.allowCustomizedBuiltInElements = f.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), oe && (Lr = !1), hi && (se = !0), ae && (P = F({}, [...Ko]), j = [], ae.html === !0 && (F(P, Xo), F(j, Zo)), ae.svg === !0 && (F(P, jr), F(j, Gr), F(j, bi)), ae.svgFilters === !0 && (F(P, Ur), F(j, Gr), F(j, bi)), ae.mathMl === !0 && (F(P, Yr), F(j, Jo), F(j, bi))), f.ADD_TAGS && (P === eo && (P = ue(P)), F(P, f.ADD_TAGS, U)), f.ADD_ATTR && (j === io && (j = ue(j)), F(j, f.ADD_ATTR, U)), f.ADD_URI_SAFE_ATTR && F(Mr, f.ADD_URI_SAFE_ATTR, U), f.FORBID_CONTENTS && (le === lo && (le = ue(le)), F(le, f.FORBID_CONTENTS, U)), Fr && (P["#text"] = !0), qt && F(P, ["html", "head", "body"]), P.table && (F(P, ["tbody"]), delete Fe.tbody), f.TRUSTED_TYPES_POLICY) {
        if (typeof f.TRUSTED_TYPES_POLICY.createHTML != "function")
          throw Ie('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
        if (typeof f.TRUSTED_TYPES_POLICY.createScriptURL != "function")
          throw Ie('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
        B = f.TRUSTED_TYPES_POLICY, D = B.createHTML("");
      } else
        B === void 0 && (B = Od(d, r)), B !== null && typeof D == "string" && (D = B.createHTML(""));
      tt && tt(f), he = f;
    }
  }, po = F({}, ["mi", "mo", "mn", "ms", "mtext"]), go = F({}, ["foreignobject", "desc", "title", "annotation-xml"]), nc = F({}, ["title", "style", "font", "a", "script"]), pi = F({}, jr);
  F(pi, Ur), F(pi, Sd);
  const Dr = F({}, Yr);
  F(Dr, vd);
  const oc = function(f) {
    let m = C(f);
    (!m || !m.tagName) && (m = {
      namespaceURI: ce,
      tagName: "template"
    });
    const b = Ai(f.tagName), M = Ai(m.tagName);
    return $r[f.namespaceURI] ? f.namespaceURI === di ? m.namespaceURI === St ? b === "svg" : m.namespaceURI === fi ? b === "svg" && (M === "annotation-xml" || po[M]) : !!pi[b] : f.namespaceURI === fi ? m.namespaceURI === St ? b === "math" : m.namespaceURI === di ? b === "math" && go[M] : !!Dr[b] : f.namespaceURI === St ? m.namespaceURI === di && !go[M] || m.namespaceURI === fi && !po[M] ? !1 : !Dr[b] && (nc[b] || !pi[b]) : !!(jt === "application/xhtml+xml" && $r[f.namespaceURI]) : !1;
  }, Ut = function(f) {
    $e(e.removed, {
      element: f
    });
    try {
      f.parentNode.removeChild(f);
    } catch {
      f.remove();
    }
  }, Nr = function(f, m) {
    try {
      $e(e.removed, {
        attribute: m.getAttributeNode(f),
        from: m
      });
    } catch {
      $e(e.removed, {
        attribute: null,
        from: m
      });
    }
    if (m.removeAttribute(f), f === "is" && !j[f])
      if (se || hi)
        try {
          Ut(m);
        } catch {
        }
      else
        try {
          m.setAttribute(f, "");
        } catch {
        }
  }, mo = function(f) {
    let m, b;
    if (Er)
      f = "<remove></remove>" + f;
    else {
      const at = Cd(f, /^[\r\n\t ]+/);
      b = at && at[0];
    }
    jt === "application/xhtml+xml" && ce === St && (f = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + f + "</body></html>");
    const M = B ? B.createHTML(f) : f;
    if (ce === St)
      try {
        m = new g().parseFromString(M, jt);
      } catch {
      }
    if (!m || !m.documentElement) {
      m = R.createDocument(ce, "template", null);
      try {
        m.documentElement.innerHTML = Or ? D : M;
      } catch {
      }
    }
    const Y = m.body || m.documentElement;
    return f && b && Y.insertBefore(n.createTextNode(b), Y.childNodes[0] || null), ce === St ? kr.call(m, qt ? "html" : "body")[0] : qt ? m.documentElement : Y;
  }, _o = function(f) {
    return V.call(
      f.ownerDocument || f,
      f,
      // eslint-disable-next-line no-bitwise
      c.SHOW_ELEMENT | c.SHOW_COMMENT | c.SHOW_TEXT,
      null,
      !1
    );
  }, sc = function(f) {
    return f instanceof u && (typeof f.nodeName != "string" || typeof f.textContent != "string" || typeof f.removeChild != "function" || !(f.attributes instanceof h) || typeof f.removeAttribute != "function" || typeof f.setAttribute != "function" || typeof f.namespaceURI != "string" || typeof f.insertBefore != "function" || typeof f.hasChildNodes != "function");
  }, gi = function(f) {
    return typeof a == "object" ? f instanceof a : f && typeof f == "object" && typeof f.nodeType == "number" && typeof f.nodeName == "string";
  }, vt = function(f, m, b) {
    q[f] && yd(q[f], (M) => {
      M.call(e, m, b, he);
    });
  }, yo = function(f) {
    let m;
    if (vt("beforeSanitizeElements", f, null), sc(f))
      return Ut(f), !0;
    const b = U(f.nodeName);
    if (vt("uponSanitizeElement", f, {
      tagName: b,
      allowedTags: P
    }), f.hasChildNodes() && !gi(f.firstElementChild) && (!gi(f.content) || !gi(f.content.firstElementChild)) && ot(/<[/\w]/g, f.innerHTML) && ot(/<[/\w]/g, f.textContent))
      return Ut(f), !0;
    if (!P[b] || Fe[b]) {
      if (!Fe[b] && bo(b) && (z.tagNameCheck instanceof RegExp && ot(z.tagNameCheck, b) || z.tagNameCheck instanceof Function && z.tagNameCheck(b)))
        return !1;
      if (Fr && !le[b]) {
        const M = C(f) || f.parentNode, Y = A(f) || f.childNodes;
        if (Y && M) {
          const at = Y.length;
          for (let N = at - 1; N >= 0; --N)
            M.insertBefore(T(Y[N], !0), w(f));
        }
      }
      return Ut(f), !0;
    }
    return f instanceof l && !oc(f) || (b === "noscript" || b === "noembed") && ot(/<\/no(script|embed)/i, f.innerHTML) ? (Ut(f), !0) : (oe && f.nodeType === 3 && (m = f.textContent, m = ft(m, oi, " "), m = ft(m, Ht, " "), m = ft(m, ne, " "), f.textContent !== m && ($e(e.removed, {
      element: f.cloneNode()
    }), f.textContent = m)), vt("afterSanitizeElements", f, null), !1);
  }, Co = function(f, m, b) {
    if (so && (m === "id" || m === "name") && (b in n || b in rc))
      return !1;
    if (!(Lr && !Br[m] && ot(si, m))) {
      if (!(ro && ot(ai, m))) {
        if (!j[m] || Br[m]) {
          if (
            // First condition does a very basic check if a) it's basically a valid custom element tagname AND
            // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
            // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
            !(bo(f) && (z.tagNameCheck instanceof RegExp && ot(z.tagNameCheck, f) || z.tagNameCheck instanceof Function && z.tagNameCheck(f)) && (z.attributeNameCheck instanceof RegExp && ot(z.attributeNameCheck, m) || z.attributeNameCheck instanceof Function && z.attributeNameCheck(m)) || // Alternative, second condition checks if it's an `is`-attribute, AND
            // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
            m === "is" && z.allowCustomizedBuiltInElements && (z.tagNameCheck instanceof RegExp && ot(z.tagNameCheck, b) || z.tagNameCheck instanceof Function && z.tagNameCheck(b)))
          )
            return !1;
        } else if (!Mr[m]) {
          if (!ot(ci, ft(b, nt, ""))) {
            if (!((m === "src" || m === "xlink:href" || m === "href") && f !== "script" && bd(b, "data:") === 0 && co[f])) {
              if (!(no && !ot(li, ft(b, nt, "")))) {
                if (b)
                  return !1;
              }
            }
          }
        }
      }
    }
    return !0;
  }, bo = function(f) {
    return f.indexOf("-") > 0;
  }, xo = function(f) {
    let m, b, M, Y;
    vt("beforeSanitizeAttributes", f, null);
    const {
      attributes: at
    } = f;
    if (!at)
      return;
    const N = {
      attrName: "",
      attrValue: "",
      keepAttr: !0,
      allowedAttributes: j
    };
    for (Y = at.length; Y--; ) {
      m = at[Y];
      const {
        name: yt,
        namespaceURI: Rr
      } = m;
      if (b = yt === "value" ? m.value : xd(m.value), M = U(yt), N.attrName = M, N.attrValue = b, N.keepAttr = !0, N.forceKeepAttr = void 0, vt("uponSanitizeAttribute", f, N), b = N.attrValue, N.forceKeepAttr || (Nr(yt, f), !N.keepAttr))
        continue;
      if (!oo && ot(/\/>/i, b)) {
        Nr(yt, f);
        continue;
      }
      oe && (b = ft(b, oi, " "), b = ft(b, Ht, " "), b = ft(b, ne, " "));
      const To = U(f.nodeName);
      if (Co(To, M, b)) {
        if (ao && (M === "id" || M === "name") && (Nr(yt, f), b = Ql + b), B && typeof d == "object" && typeof d.getAttributeType == "function" && !Rr)
          switch (d.getAttributeType(To, M)) {
            case "TrustedHTML": {
              b = B.createHTML(b);
              break;
            }
            case "TrustedScriptURL": {
              b = B.createScriptURL(b);
              break;
            }
          }
        try {
          Rr ? f.setAttributeNS(Rr, yt, b) : f.setAttribute(yt, b), Vo(e.removed);
        } catch {
        }
      }
    }
    vt("afterSanitizeAttributes", f, null);
  }, ac = function S(f) {
    let m;
    const b = _o(f);
    for (vt("beforeSanitizeShadowDOM", f, null); m = b.nextNode(); )
      vt("uponSanitizeShadowNode", m, null), !yo(m) && (m.content instanceof o && S(m.content), xo(m));
    vt("afterSanitizeShadowDOM", f, null);
  };
  return e.sanitize = function(S) {
    let f = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, m, b, M, Y;
    if (Or = !S, Or && (S = "<!-->"), typeof S != "string" && !gi(S))
      if (typeof S.toString == "function") {
        if (S = S.toString(), typeof S != "string")
          throw Ie("dirty is not a string, aborting");
      } else
        throw Ie("toString is not a function");
    if (!e.isSupported)
      return S;
    if (Ar || Ir(f), e.removed = [], typeof S == "string" && (Me = !1), Me) {
      if (S.nodeName) {
        const yt = U(S.nodeName);
        if (!P[yt] || Fe[yt])
          throw Ie("root node is forbidden and cannot be sanitized in-place");
      }
    } else if (S instanceof a)
      m = mo("<!---->"), b = m.ownerDocument.importNode(S, !0), b.nodeType === 1 && b.nodeName === "BODY" || b.nodeName === "HTML" ? m = b : m.appendChild(b);
    else {
      if (!se && !oe && !qt && // eslint-disable-next-line unicorn/prefer-includes
      S.indexOf("<") === -1)
        return B && ui ? B.createHTML(S) : S;
      if (m = mo(S), !m)
        return se ? null : ui ? D : "";
    }
    m && Er && Ut(m.firstChild);
    const at = _o(Me ? S : m);
    for (; M = at.nextNode(); )
      yo(M) || (M.content instanceof o && ac(M.content), xo(M));
    if (Me)
      return S;
    if (se) {
      if (hi)
        for (Y = O.call(m.ownerDocument); m.firstChild; )
          Y.appendChild(m.firstChild);
      else
        Y = m;
      return (j.shadowroot || j.shadowrootmod) && (Y = wr.call(i, Y, !0)), Y;
    }
    let N = qt ? m.outerHTML : m.innerHTML;
    return qt && P["!doctype"] && m.ownerDocument && m.ownerDocument.doctype && m.ownerDocument.doctype.name && ot(Ta, m.ownerDocument.doctype.name) && (N = "<!DOCTYPE " + m.ownerDocument.doctype.name + `>
` + N), oe && (N = ft(N, oi, " "), N = ft(N, Ht, " "), N = ft(N, ne, " ")), B && ui ? B.createHTML(N) : N;
  }, e.setConfig = function(S) {
    Ir(S), Ar = !0;
  }, e.clearConfig = function() {
    he = null, Ar = !1;
  }, e.isValidAttribute = function(S, f, m) {
    he || Ir({});
    const b = U(S), M = U(f);
    return Co(b, M, m);
  }, e.addHook = function(S, f) {
    typeof f == "function" && (q[S] = q[S] || [], $e(q[S], f));
  }, e.removeHook = function(S) {
    if (q[S])
      return Vo(q[S]);
  }, e.removeHooks = function(S) {
    q[S] && (q[S] = []);
  }, e.removeAllHooks = function() {
    q = {};
  }, e;
}
var Xi = Sa();
const dr = /<br\s*\/?>/gi, $d = (t) => t ? ka(t).replace(/\\n/g, "#br#").split("#br#") : [""], va = (t) => Xi.sanitize(t), ts = (t, e) => {
  var i;
  if (((i = e.flowchart) == null ? void 0 : i.htmlLabels) !== !1) {
    const r = e.securityLevel;
    r === "antiscript" || r === "strict" ? t = va(t) : r !== "loose" && (t = ka(t), t = t.replace(/</g, "&lt;").replace(/>/g, "&gt;"), t = t.replace(/=/g, "&equals;"), t = Rd(t));
  }
  return t;
}, Xe = (t, e) => t && (e.dompurifyConfig ? t = Xi.sanitize(ts(t, e), e.dompurifyConfig).toString() : t = Xi.sanitize(ts(t, e), {
  FORBID_TAGS: ["style"]
}).toString(), t), Id = (t, e) => typeof t == "string" ? Xe(t, e) : t.flat().map((i) => Xe(i, e)), Dd = (t) => dr.test(t), Nd = (t) => t.split(dr), Rd = (t) => t.replace(/#br#/g, "<br/>"), ka = (t) => t.replace(dr, "#br#"), zd = (t) => {
  let e = "";
  return t && (e = window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.search, e = e.replaceAll(/\(/g, "\\("), e = e.replaceAll(/\)/g, "\\)")), e;
}, wa = (t) => !(t === !1 || ["false", "null", "0"].includes(String(t).trim().toLowerCase())), Pd = function(...t) {
  const e = t.filter((i) => !isNaN(i));
  return Math.max(...e);
}, Wd = function(...t) {
  const e = t.filter((i) => !isNaN(i));
  return Math.min(...e);
}, Hd = function(t) {
  let e = t;
  if (t.split("~").length - 1 >= 2) {
    let i = e;
    do
      e = i, i = e.replace(/~([^\s,:;]+)~/, "<$1>");
    while (i != e);
    return Hd(i);
  } else
    return e;
}, Pn = {
  getRows: $d,
  sanitizeText: Xe,
  sanitizeTextOrArray: Id,
  hasBreaks: Dd,
  splitBreaks: Nd,
  lineBreakRegex: dr,
  removeScript: va,
  getUrl: zd,
  evaluate: wa,
  getMax: Pd,
  getMin: Wd
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
}, qd = Ei, jd = {
  /* API */
  clamp: (t, e, i) => e > i ? Math.min(e, Math.max(i, t)) : Math.min(i, Math.max(e, t)),
  round: (t) => Math.round(t * 1e10) / 1e10
}, Ud = jd, Yd = {
  /* API */
  dec2hex: (t) => {
    const e = Math.round(t).toString(16);
    return e.length > 1 ? e : `0${e}`;
  }
}, Gd = Yd, Vd = {
  channel: qd,
  lang: Ud,
  unit: Gd
}, E = Vd, Mt = {};
for (let t = 0; t <= 255; t++)
  Mt[t] = E.unit.dec2hex(t);
const X = {
  ALL: 0,
  RGB: 1,
  HSL: 2
};
class Xd {
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
const Kd = Xd;
class Zd {
  /* CONSTRUCTOR */
  constructor(e, i) {
    this.color = i, this.changed = !1, this.data = e, this.type = new Kd();
  }
  /* API */
  set(e, i) {
    return this.color = i, this.changed = !1, this.data = e, this.type.type = X.ALL, this;
  }
  /* HELPERS */
  _ensureHSL() {
    const e = this.data, { h: i, s: r, l: n } = e;
    i === void 0 && (e.h = E.channel.rgb2hsl(e, "h")), r === void 0 && (e.s = E.channel.rgb2hsl(e, "s")), n === void 0 && (e.l = E.channel.rgb2hsl(e, "l"));
  }
  _ensureRGB() {
    const e = this.data, { r: i, g: r, b: n } = e;
    i === void 0 && (e.r = E.channel.hsl2rgb(e, "r")), r === void 0 && (e.g = E.channel.hsl2rgb(e, "g")), n === void 0 && (e.b = E.channel.hsl2rgb(e, "b"));
  }
  /* GETTERS */
  get r() {
    const e = this.data, i = e.r;
    return !this.type.is(X.HSL) && i !== void 0 ? i : (this._ensureHSL(), E.channel.hsl2rgb(e, "r"));
  }
  get g() {
    const e = this.data, i = e.g;
    return !this.type.is(X.HSL) && i !== void 0 ? i : (this._ensureHSL(), E.channel.hsl2rgb(e, "g"));
  }
  get b() {
    const e = this.data, i = e.b;
    return !this.type.is(X.HSL) && i !== void 0 ? i : (this._ensureHSL(), E.channel.hsl2rgb(e, "b"));
  }
  get h() {
    const e = this.data, i = e.h;
    return !this.type.is(X.RGB) && i !== void 0 ? i : (this._ensureRGB(), E.channel.rgb2hsl(e, "h"));
  }
  get s() {
    const e = this.data, i = e.s;
    return !this.type.is(X.RGB) && i !== void 0 ? i : (this._ensureRGB(), E.channel.rgb2hsl(e, "s"));
  }
  get l() {
    const e = this.data, i = e.l;
    return !this.type.is(X.RGB) && i !== void 0 ? i : (this._ensureRGB(), E.channel.rgb2hsl(e, "l"));
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
const Jd = Zd, Qd = new Jd({ r: 0, g: 0, b: 0, a: 0 }, "transparent"), pr = Qd, Ba = {
  /* VARIABLES */
  re: /^#((?:[a-f0-9]{2}){2,4}|[a-f0-9]{3})$/i,
  /* API */
  parse: (t) => {
    if (t.charCodeAt(0) !== 35)
      return;
    const e = t.match(Ba.re);
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
    return n < 1 ? `#${Mt[Math.round(e)]}${Mt[Math.round(i)]}${Mt[Math.round(r)]}${Mt[Math.round(n * 255)]}` : `#${Mt[Math.round(e)]}${Mt[Math.round(i)]}${Mt[Math.round(r)]}`;
  }
}, We = Ba, Fi = {
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
          return E.channel.clamp.h(parseFloat(i) * 0.9);
        case "rad":
          return E.channel.clamp.h(parseFloat(i) * 180 / Math.PI);
        case "turn":
          return E.channel.clamp.h(parseFloat(i) * 360);
      }
    }
    return E.channel.clamp.h(parseFloat(t));
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
      s: E.channel.clamp.s(parseFloat(n)),
      l: E.channel.clamp.l(parseFloat(o)),
      a: s ? E.channel.clamp.a(a ? parseFloat(s) / 100 : parseFloat(s)) : 1
    }, t);
  },
  stringify: (t) => {
    const { h: e, s: i, l: r, a: n } = t;
    return n < 1 ? `hsla(${E.lang.round(e)}, ${E.lang.round(i)}%, ${E.lang.round(r)}%, ${n})` : `hsl(${E.lang.round(e)}, ${E.lang.round(i)}%, ${E.lang.round(r)}%)`;
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
}, es = Mi, La = {
  /* VARIABLES */
  re: /^rgba?\(\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e\d+)?(%?))\s*?(?:,|\s)\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e\d+)?(%?))\s*?(?:,|\s)\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e\d+)?(%?))(?:\s*?(?:,|\/)\s*?\+?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e\d+)?(%?)))?\s*?\)$/i,
  /* API */
  parse: (t) => {
    const e = t.charCodeAt(0);
    if (e !== 114 && e !== 82)
      return;
    const i = t.match(La.re);
    if (!i)
      return;
    const [, r, n, o, s, a, l, c, h] = i;
    return pr.set({
      r: E.channel.clamp.r(n ? parseFloat(r) * 2.55 : parseFloat(r)),
      g: E.channel.clamp.g(s ? parseFloat(o) * 2.55 : parseFloat(o)),
      b: E.channel.clamp.b(l ? parseFloat(a) * 2.55 : parseFloat(a)),
      a: c ? E.channel.clamp.a(h ? parseFloat(c) / 100 : parseFloat(c)) : 1
    }, t);
  },
  stringify: (t) => {
    const { r: e, g: i, b: r, a: n } = t;
    return n < 1 ? `rgba(${E.lang.round(e)}, ${E.lang.round(i)}, ${E.lang.round(r)}, ${E.lang.round(n)})` : `rgb(${E.lang.round(e)}, ${E.lang.round(i)}, ${E.lang.round(r)})`;
  }
}, Ti = La, tp = {
  /* VARIABLES */
  format: {
    keyword: es,
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
    const e = We.parse(t) || Ti.parse(t) || xi.parse(t) || es.parse(t);
    if (e)
      return e;
    throw new Error(`Unsupported color format: "${t}"`);
  },
  stringify: (t) => !t.changed && t.color ? t.color : t.type.is(X.HSL) || t.data.r === void 0 ? xi.stringify(t) : t.a < 1 || !Number.isInteger(t.r) || !Number.isInteger(t.g) || !Number.isInteger(t.b) ? Ti.stringify(t) : We.stringify(t)
}, Et = tp, ep = (t, e) => {
  const i = Et.parse(t);
  for (const r in e)
    i[r] = E.channel.clamp[r](e[r]);
  return Et.stringify(i);
}, Aa = ep, ip = (t, e, i = 0, r = 1) => {
  if (typeof t != "number")
    return Aa(t, { a: e });
  const n = pr.set({
    r: E.channel.clamp.r(t),
    g: E.channel.clamp.g(e),
    b: E.channel.clamp.b(i),
    a: E.channel.clamp.a(r)
  });
  return Et.stringify(n);
}, He = ip, rp = (t, e, i) => {
  const r = Et.parse(t), n = r[e], o = E.channel.clamp[e](n + i);
  return n !== o && (r[e] = o), Et.stringify(r);
}, Ea = rp, np = (t, e) => Ea(t, "l", e), k = np, op = (t, e) => Ea(t, "l", -e), L = op, sp = (t, e) => {
  const i = Et.parse(t), r = {};
  for (const n in e)
    e[n] && (r[n] = i[n] + e[n]);
  return Aa(t, r);
}, p = sp, ap = (t, e, i = 50) => {
  const { r, g: n, b: o, a: s } = Et.parse(t), { r: a, g: l, b: c, a: h } = Et.parse(e), u = i / 100, g = u * 2 - 1, d = s - h, T = ((g * d === -1 ? g : (g + d) / (1 + g * d)) + 1) / 2, w = 1 - T, A = r * T + a * w, C = n * T + l * w, B = o * T + c * w, D = s * u + h * (1 - u);
  return He(A, C, B, D);
}, lp = ap, cp = (t, e = 100) => {
  const i = Et.parse(t);
  return i.r = 255 - i.r, i.g = 255 - i.g, i.b = 255 - i.b, lp(i, t, e);
}, y = cp, Q = (t, e) => e ? p(t, { s: -40, l: 10 }) : p(t, { s: -40, l: -10 }), gr = "#ffffff", mr = "#f2f2f2";
let hp = class {
  constructor() {
    this.background = "#f4f4f4", this.primaryColor = "#fff4dd", this.noteBkgColor = "#fff5ad", this.noteTextColor = "#333", this.THEME_COLOR_LIMIT = 12, this.fontFamily = '"trebuchet ms", verdana, arial, sans-serif', this.fontSize = "16px";
  }
  updateColors() {
    if (this.primaryTextColor = this.primaryTextColor || (this.darkMode ? "#eee" : "#333"), this.secondaryColor = this.secondaryColor || p(this.primaryColor, { h: -120 }), this.tertiaryColor = this.tertiaryColor || p(this.primaryColor, { h: 180, l: 5 }), this.primaryBorderColor = this.primaryBorderColor || Q(this.primaryColor, this.darkMode), this.secondaryBorderColor = this.secondaryBorderColor || Q(this.secondaryColor, this.darkMode), this.tertiaryBorderColor = this.tertiaryBorderColor || Q(this.tertiaryColor, this.darkMode), this.noteBorderColor = this.noteBorderColor || Q(this.noteBkgColor, this.darkMode), this.noteBkgColor = this.noteBkgColor || "#fff5ad", this.noteTextColor = this.noteTextColor || "#333", this.secondaryTextColor = this.secondaryTextColor || y(this.secondaryColor), this.tertiaryTextColor = this.tertiaryTextColor || y(this.tertiaryColor), this.lineColor = this.lineColor || y(this.background), this.arrowheadColor = this.arrowheadColor || y(this.background), this.textColor = this.textColor || this.primaryTextColor, this.border2 = this.border2 || this.tertiaryBorderColor, this.nodeBkg = this.nodeBkg || this.primaryColor, this.mainBkg = this.mainBkg || this.primaryColor, this.nodeBorder = this.nodeBorder || this.primaryBorderColor, this.clusterBkg = this.clusterBkg || this.tertiaryColor, this.clusterBorder = this.clusterBorder || this.tertiaryBorderColor, this.defaultLinkColor = this.defaultLinkColor || this.lineColor, this.titleColor = this.titleColor || this.tertiaryTextColor, this.edgeLabelBackground = this.edgeLabelBackground || (this.darkMode ? L(this.secondaryColor, 30) : this.secondaryColor), this.nodeTextColor = this.nodeTextColor || this.primaryTextColor, this.actorBorder = this.actorBorder || this.primaryBorderColor, this.actorBkg = this.actorBkg || this.mainBkg, this.actorTextColor = this.actorTextColor || this.primaryTextColor, this.actorLineColor = this.actorLineColor || "grey", this.labelBoxBkgColor = this.labelBoxBkgColor || this.actorBkg, this.signalColor = this.signalColor || this.textColor, this.signalTextColor = this.signalTextColor || this.textColor, this.labelBoxBorderColor = this.labelBoxBorderColor || this.actorBorder, this.labelTextColor = this.labelTextColor || this.actorTextColor, this.loopTextColor = this.loopTextColor || this.actorTextColor, this.activationBorderColor = this.activationBorderColor || L(this.secondaryColor, 10), this.activationBkgColor = this.activationBkgColor || this.secondaryColor, this.sequenceNumberColor = this.sequenceNumberColor || y(this.lineColor), this.sectionBkgColor = this.sectionBkgColor || this.tertiaryColor, this.altSectionBkgColor = this.altSectionBkgColor || "white", this.sectionBkgColor = this.sectionBkgColor || this.secondaryColor, this.sectionBkgColor2 = this.sectionBkgColor2 || this.primaryColor, this.excludeBkgColor = this.excludeBkgColor || "#eeeeee", this.taskBorderColor = this.taskBorderColor || this.primaryBorderColor, this.taskBkgColor = this.taskBkgColor || this.primaryColor, this.activeTaskBorderColor = this.activeTaskBorderColor || this.primaryColor, this.activeTaskBkgColor = this.activeTaskBkgColor || k(this.primaryColor, 23), this.gridColor = this.gridColor || "lightgrey", this.doneTaskBkgColor = this.doneTaskBkgColor || "lightgrey", this.doneTaskBorderColor = this.doneTaskBorderColor || "grey", this.critBorderColor = this.critBorderColor || "#ff8888", this.critBkgColor = this.critBkgColor || "red", this.todayLineColor = this.todayLineColor || "red", this.taskTextColor = this.taskTextColor || this.textColor, this.taskTextOutsideColor = this.taskTextOutsideColor || this.textColor, this.taskTextLightColor = this.taskTextLightColor || this.textColor, this.taskTextColor = this.taskTextColor || this.primaryTextColor, this.taskTextDarkColor = this.taskTextDarkColor || this.textColor, this.taskTextClickableColor = this.taskTextClickableColor || "#003163", this.personBorder = this.personBorder || this.primaryBorderColor, this.personBkg = this.personBkg || this.mainBkg, this.transitionColor = this.transitionColor || this.lineColor, this.transitionLabelColor = this.transitionLabelColor || this.textColor, this.stateLabelColor = this.stateLabelColor || this.stateBkg || this.primaryTextColor, this.stateBkg = this.stateBkg || this.mainBkg, this.labelBackgroundColor = this.labelBackgroundColor || this.stateBkg, this.compositeBackground = this.compositeBackground || this.background || this.tertiaryColor, this.altBackground = this.altBackground || this.tertiaryColor, this.compositeTitleBackground = this.compositeTitleBackground || this.mainBkg, this.compositeBorder = this.compositeBorder || this.nodeBorder, this.innerEndBackground = this.nodeBorder, this.errorBkgColor = this.errorBkgColor || this.tertiaryColor, this.errorTextColor = this.errorTextColor || this.tertiaryTextColor, this.transitionColor = this.transitionColor || this.lineColor, this.specialStateColor = this.lineColor, this.cScale0 = this.cScale0 || this.primaryColor, this.cScale1 = this.cScale1 || this.secondaryColor, this.cScale2 = this.cScale2 || this.tertiaryColor, this.cScale3 = this.cScale3 || p(this.primaryColor, { h: 30 }), this.cScale4 = this.cScale4 || p(this.primaryColor, { h: 60 }), this.cScale5 = this.cScale5 || p(this.primaryColor, { h: 90 }), this.cScale6 = this.cScale6 || p(this.primaryColor, { h: 120 }), this.cScale7 = this.cScale7 || p(this.primaryColor, { h: 150 }), this.cScale8 = this.cScale8 || p(this.primaryColor, { h: 210, l: 150 }), this.cScale9 = this.cScale9 || p(this.primaryColor, { h: 270 }), this.cScale10 = this.cScale10 || p(this.primaryColor, { h: 300 }), this.cScale11 = this.cScale11 || p(this.primaryColor, { h: 330 }), this.darkMode)
      for (let i = 0; i < this.THEME_COLOR_LIMIT; i++)
        this["cScale" + i] = L(this["cScale" + i], 75);
    else
      for (let i = 0; i < this.THEME_COLOR_LIMIT; i++)
        this["cScale" + i] = L(this["cScale" + i], 25);
    for (let i = 0; i < this.THEME_COLOR_LIMIT; i++)
      this["cScaleInv" + i] = this["cScaleInv" + i] || y(this["cScale" + i]);
    for (let i = 0; i < this.THEME_COLOR_LIMIT; i++)
      this.darkMode ? this["cScalePeer" + i] = this["cScalePeer" + i] || k(this["cScale" + i], 10) : this["cScalePeer" + i] = this["cScalePeer" + i] || L(this["cScale" + i], 10);
    this.scaleLabelColor = this.scaleLabelColor || this.labelTextColor;
    for (let i = 0; i < this.THEME_COLOR_LIMIT; i++)
      this["cScaleLabel" + i] = this["cScaleLabel" + i] || this.scaleLabelColor;
    const e = this.darkMode ? -4 : -1;
    for (let i = 0; i < 5; i++)
      this["surface" + i] = this["surface" + i] || p(this.mainBkg, { h: 180, s: -15, l: e * (5 + i * 3) }), this["surfacePeer" + i] = this["surfacePeer" + i] || p(this.mainBkg, { h: 180, s: -15, l: e * (8 + i * 3) });
    this.classText = this.classText || this.textColor, this.fillType0 = this.fillType0 || this.primaryColor, this.fillType1 = this.fillType1 || this.secondaryColor, this.fillType2 = this.fillType2 || p(this.primaryColor, { h: 64 }), this.fillType3 = this.fillType3 || p(this.secondaryColor, { h: 64 }), this.fillType4 = this.fillType4 || p(this.primaryColor, { h: -64 }), this.fillType5 = this.fillType5 || p(this.secondaryColor, { h: -64 }), this.fillType6 = this.fillType6 || p(this.primaryColor, { h: 128 }), this.fillType7 = this.fillType7 || p(this.secondaryColor, { h: 128 }), this.pie1 = this.pie1 || this.primaryColor, this.pie2 = this.pie2 || this.secondaryColor, this.pie3 = this.pie3 || this.tertiaryColor, this.pie4 = this.pie4 || p(this.primaryColor, { l: -10 }), this.pie5 = this.pie5 || p(this.secondaryColor, { l: -10 }), this.pie6 = this.pie6 || p(this.tertiaryColor, { l: -10 }), this.pie7 = this.pie7 || p(this.primaryColor, { h: 60, l: -10 }), this.pie8 = this.pie8 || p(this.primaryColor, { h: -60, l: -10 }), this.pie9 = this.pie9 || p(this.primaryColor, { h: 120, l: 0 }), this.pie10 = this.pie10 || p(this.primaryColor, { h: 60, l: -20 }), this.pie11 = this.pie11 || p(this.primaryColor, { h: -60, l: -20 }), this.pie12 = this.pie12 || p(this.primaryColor, { h: 120, l: -10 }), this.pieTitleTextSize = this.pieTitleTextSize || "25px", this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor, this.pieSectionTextSize = this.pieSectionTextSize || "17px", this.pieSectionTextColor = this.pieSectionTextColor || this.textColor, this.pieLegendTextSize = this.pieLegendTextSize || "17px", this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor, this.pieStrokeColor = this.pieStrokeColor || "black", this.pieStrokeWidth = this.pieStrokeWidth || "2px", this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || "2px", this.pieOuterStrokeColor = this.pieOuterStrokeColor || "black", this.pieOpacity = this.pieOpacity || "0.7", this.requirementBackground = this.requirementBackground || this.primaryColor, this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor, this.requirementBorderSize = this.requirementBorderSize || "1", this.requirementTextColor = this.requirementTextColor || this.primaryTextColor, this.relationColor = this.relationColor || this.lineColor, this.relationLabelBackground = this.relationLabelBackground || (this.darkMode ? L(this.secondaryColor, 30) : this.secondaryColor), this.relationLabelColor = this.relationLabelColor || this.actorTextColor, this.git0 = this.git0 || this.primaryColor, this.git1 = this.git1 || this.secondaryColor, this.git2 = this.git2 || this.tertiaryColor, this.git3 = this.git3 || p(this.primaryColor, { h: -30 }), this.git4 = this.git4 || p(this.primaryColor, { h: -60 }), this.git5 = this.git5 || p(this.primaryColor, { h: -90 }), this.git6 = this.git6 || p(this.primaryColor, { h: 60 }), this.git7 = this.git7 || p(this.primaryColor, { h: 120 }), this.darkMode ? (this.git0 = k(this.git0, 25), this.git1 = k(this.git1, 25), this.git2 = k(this.git2, 25), this.git3 = k(this.git3, 25), this.git4 = k(this.git4, 25), this.git5 = k(this.git5, 25), this.git6 = k(this.git6, 25), this.git7 = k(this.git7, 25)) : (this.git0 = L(this.git0, 25), this.git1 = L(this.git1, 25), this.git2 = L(this.git2, 25), this.git3 = L(this.git3, 25), this.git4 = L(this.git4, 25), this.git5 = L(this.git5, 25), this.git6 = L(this.git6, 25), this.git7 = L(this.git7, 25)), this.gitInv0 = this.gitInv0 || y(this.git0), this.gitInv1 = this.gitInv1 || y(this.git1), this.gitInv2 = this.gitInv2 || y(this.git2), this.gitInv3 = this.gitInv3 || y(this.git3), this.gitInv4 = this.gitInv4 || y(this.git4), this.gitInv5 = this.gitInv5 || y(this.git5), this.gitInv6 = this.gitInv6 || y(this.git6), this.gitInv7 = this.gitInv7 || y(this.git7), this.branchLabelColor = this.branchLabelColor || (this.darkMode ? "black" : this.labelTextColor), this.gitBranchLabel0 = this.gitBranchLabel0 || this.branchLabelColor, this.gitBranchLabel1 = this.gitBranchLabel1 || this.branchLabelColor, this.gitBranchLabel2 = this.gitBranchLabel2 || this.branchLabelColor, this.gitBranchLabel3 = this.gitBranchLabel3 || this.branchLabelColor, this.gitBranchLabel4 = this.gitBranchLabel4 || this.branchLabelColor, this.gitBranchLabel5 = this.gitBranchLabel5 || this.branchLabelColor, this.gitBranchLabel6 = this.gitBranchLabel6 || this.branchLabelColor, this.gitBranchLabel7 = this.gitBranchLabel7 || this.branchLabelColor, this.tagLabelColor = this.tagLabelColor || this.primaryTextColor, this.tagLabelBackground = this.tagLabelBackground || this.primaryColor, this.tagLabelBorder = this.tagBorder || this.primaryBorderColor, this.tagLabelFontSize = this.tagLabelFontSize || "10px", this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor, this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor, this.commitLabelFontSize = this.commitLabelFontSize || "10px", this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || gr, this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || mr;
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
  const e = new hp();
  return e.calculate(t), e;
};
let fp = class {
  constructor() {
    this.background = "#333", this.primaryColor = "#1f2020", this.secondaryColor = k(this.primaryColor, 16), this.tertiaryColor = p(this.primaryColor, { h: -160 }), this.primaryBorderColor = y(this.background), this.secondaryBorderColor = Q(this.secondaryColor, this.darkMode), this.tertiaryBorderColor = Q(this.tertiaryColor, this.darkMode), this.primaryTextColor = y(this.primaryColor), this.secondaryTextColor = y(this.secondaryColor), this.tertiaryTextColor = y(this.tertiaryColor), this.lineColor = y(this.background), this.textColor = y(this.background), this.mainBkg = "#1f2020", this.secondBkg = "calculated", this.mainContrastColor = "lightgrey", this.darkTextColor = k(y("#323D47"), 10), this.lineColor = "calculated", this.border1 = "#81B1DB", this.border2 = He(255, 255, 255, 0.25), this.arrowheadColor = "calculated", this.fontFamily = '"trebuchet ms", verdana, arial, sans-serif', this.fontSize = "16px", this.labelBackground = "#181818", this.textColor = "#ccc", this.THEME_COLOR_LIMIT = 12, this.nodeBkg = "calculated", this.nodeBorder = "calculated", this.clusterBkg = "calculated", this.clusterBorder = "calculated", this.defaultLinkColor = "calculated", this.titleColor = "#F9FFFE", this.edgeLabelBackground = "calculated", this.actorBorder = "calculated", this.actorBkg = "calculated", this.actorTextColor = "calculated", this.actorLineColor = "calculated", this.signalColor = "calculated", this.signalTextColor = "calculated", this.labelBoxBkgColor = "calculated", this.labelBoxBorderColor = "calculated", this.labelTextColor = "calculated", this.loopTextColor = "calculated", this.noteBorderColor = "calculated", this.noteBkgColor = "#fff5ad", this.noteTextColor = "calculated", this.activationBorderColor = "calculated", this.activationBkgColor = "calculated", this.sequenceNumberColor = "black", this.sectionBkgColor = L("#EAE8D9", 30), this.altSectionBkgColor = "calculated", this.sectionBkgColor2 = "#EAE8D9", this.excludeBkgColor = L(this.sectionBkgColor, 10), this.taskBorderColor = He(255, 255, 255, 70), this.taskBkgColor = "calculated", this.taskTextColor = "calculated", this.taskTextLightColor = "calculated", this.taskTextOutsideColor = "calculated", this.taskTextClickableColor = "#003163", this.activeTaskBorderColor = He(255, 255, 255, 50), this.activeTaskBkgColor = "#81B1DB", this.gridColor = "calculated", this.doneTaskBkgColor = "calculated", this.doneTaskBorderColor = "grey", this.critBorderColor = "#E83737", this.critBkgColor = "#E83737", this.taskTextDarkColor = "calculated", this.todayLineColor = "#DB5757", this.personBorder = this.primaryBorderColor, this.personBkg = this.mainBkg, this.labelColor = "calculated", this.errorBkgColor = "#a44141", this.errorTextColor = "#ddd";
  }
  updateColors() {
    this.secondBkg = k(this.mainBkg, 16), this.lineColor = this.mainContrastColor, this.arrowheadColor = this.mainContrastColor, this.nodeBkg = this.mainBkg, this.nodeBorder = this.border1, this.clusterBkg = this.secondBkg, this.clusterBorder = this.border2, this.defaultLinkColor = this.lineColor, this.edgeLabelBackground = k(this.labelBackground, 25), this.actorBorder = this.border1, this.actorBkg = this.mainBkg, this.actorTextColor = this.mainContrastColor, this.actorLineColor = this.mainContrastColor, this.signalColor = this.mainContrastColor, this.signalTextColor = this.mainContrastColor, this.labelBoxBkgColor = this.actorBkg, this.labelBoxBorderColor = this.actorBorder, this.labelTextColor = this.mainContrastColor, this.loopTextColor = this.mainContrastColor, this.noteBorderColor = this.secondaryBorderColor, this.noteBkgColor = this.secondBkg, this.noteTextColor = this.secondaryTextColor, this.activationBorderColor = this.border1, this.activationBkgColor = this.secondBkg, this.altSectionBkgColor = this.background, this.taskBkgColor = k(this.mainBkg, 23), this.taskTextColor = this.darkTextColor, this.taskTextLightColor = this.mainContrastColor, this.taskTextOutsideColor = this.taskTextLightColor, this.gridColor = this.mainContrastColor, this.doneTaskBkgColor = this.mainContrastColor, this.taskTextDarkColor = this.darkTextColor, this.transitionColor = this.transitionColor || this.lineColor, this.transitionLabelColor = this.transitionLabelColor || this.textColor, this.stateLabelColor = this.stateLabelColor || this.stateBkg || this.primaryTextColor, this.stateBkg = this.stateBkg || this.mainBkg, this.labelBackgroundColor = this.labelBackgroundColor || this.stateBkg, this.compositeBackground = this.compositeBackground || this.background || this.tertiaryColor, this.altBackground = this.altBackground || "#555", this.compositeTitleBackground = this.compositeTitleBackground || this.mainBkg, this.compositeBorder = this.compositeBorder || this.nodeBorder, this.innerEndBackground = this.primaryBorderColor, this.specialStateColor = "#f4f4f4", this.errorBkgColor = this.errorBkgColor || this.tertiaryColor, this.errorTextColor = this.errorTextColor || this.tertiaryTextColor, this.fillType0 = this.primaryColor, this.fillType1 = this.secondaryColor, this.fillType2 = p(this.primaryColor, { h: 64 }), this.fillType3 = p(this.secondaryColor, { h: 64 }), this.fillType4 = p(this.primaryColor, { h: -64 }), this.fillType5 = p(this.secondaryColor, { h: -64 }), this.fillType6 = p(this.primaryColor, { h: 128 }), this.fillType7 = p(this.secondaryColor, { h: 128 }), this.cScale1 = this.cScale1 || "#0b0000", this.cScale2 = this.cScale2 || "#4d1037", this.cScale3 = this.cScale3 || "#3f5258", this.cScale4 = this.cScale4 || "#4f2f1b", this.cScale5 = this.cScale5 || "#6e0a0a", this.cScale6 = this.cScale6 || "#3b0048", this.cScale7 = this.cScale7 || "#995a01", this.cScale8 = this.cScale8 || "#154706", this.cScale9 = this.cScale9 || "#161722", this.cScale10 = this.cScale10 || "#00296f", this.cScale11 = this.cScale11 || "#01629c", this.cScale12 = this.cScale12 || "#010029", this.cScale0 = this.cScale0 || this.primaryColor, this.cScale1 = this.cScale1 || this.secondaryColor, this.cScale2 = this.cScale2 || this.tertiaryColor, this.cScale3 = this.cScale3 || p(this.primaryColor, { h: 30 }), this.cScale4 = this.cScale4 || p(this.primaryColor, { h: 60 }), this.cScale5 = this.cScale5 || p(this.primaryColor, { h: 90 }), this.cScale6 = this.cScale6 || p(this.primaryColor, { h: 120 }), this.cScale7 = this.cScale7 || p(this.primaryColor, { h: 150 }), this.cScale8 = this.cScale8 || p(this.primaryColor, { h: 210 }), this.cScale9 = this.cScale9 || p(this.primaryColor, { h: 270 }), this.cScale10 = this.cScale10 || p(this.primaryColor, { h: 300 }), this.cScale11 = this.cScale11 || p(this.primaryColor, { h: 330 });
    for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
      this["cScaleInv" + e] = this["cScaleInv" + e] || y(this["cScale" + e]);
    for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
      this["cScalePeer" + e] = this["cScalePeer" + e] || k(this["cScale" + e], 10);
    for (let e = 0; e < 5; e++)
      this["surface" + e] = this["surface" + e] || p(this.mainBkg, { h: 30, s: -30, l: -(-10 + e * 4) }), this["surfacePeer" + e] = this["surfacePeer" + e] || p(this.mainBkg, { h: 30, s: -30, l: -(-7 + e * 4) });
    this.scaleLabelColor = this.scaleLabelColor || (this.darkMode ? "black" : this.labelTextColor);
    for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
      this["cScaleLabel" + e] = this["cScaleLabel" + e] || this.scaleLabelColor;
    for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
      this["pie" + e] = this["cScale" + e];
    this.pieTitleTextSize = this.pieTitleTextSize || "25px", this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor, this.pieSectionTextSize = this.pieSectionTextSize || "17px", this.pieSectionTextColor = this.pieSectionTextColor || this.textColor, this.pieLegendTextSize = this.pieLegendTextSize || "17px", this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor, this.pieStrokeColor = this.pieStrokeColor || "black", this.pieStrokeWidth = this.pieStrokeWidth || "2px", this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || "2px", this.pieOuterStrokeColor = this.pieOuterStrokeColor || "black", this.pieOpacity = this.pieOpacity || "0.7", this.classText = this.primaryTextColor, this.requirementBackground = this.requirementBackground || this.primaryColor, this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor, this.requirementBorderSize = this.requirementBorderSize || "1", this.requirementTextColor = this.requirementTextColor || this.primaryTextColor, this.relationColor = this.relationColor || this.lineColor, this.relationLabelBackground = this.relationLabelBackground || (this.darkMode ? L(this.secondaryColor, 30) : this.secondaryColor), this.relationLabelColor = this.relationLabelColor || this.actorTextColor, this.git0 = k(this.secondaryColor, 20), this.git1 = k(this.pie2 || this.secondaryColor, 20), this.git2 = k(this.pie3 || this.tertiaryColor, 20), this.git3 = k(this.pie4 || p(this.primaryColor, { h: -30 }), 20), this.git4 = k(this.pie5 || p(this.primaryColor, { h: -60 }), 20), this.git5 = k(this.pie6 || p(this.primaryColor, { h: -90 }), 10), this.git6 = k(this.pie7 || p(this.primaryColor, { h: 60 }), 10), this.git7 = k(this.pie8 || p(this.primaryColor, { h: 120 }), 20), this.gitInv0 = this.gitInv0 || y(this.git0), this.gitInv1 = this.gitInv1 || y(this.git1), this.gitInv2 = this.gitInv2 || y(this.git2), this.gitInv3 = this.gitInv3 || y(this.git3), this.gitInv4 = this.gitInv4 || y(this.git4), this.gitInv5 = this.gitInv5 || y(this.git5), this.gitInv6 = this.gitInv6 || y(this.git6), this.gitInv7 = this.gitInv7 || y(this.git7), this.gitBranchLabel0 = this.gitBranchLabel0 || y(this.labelTextColor), this.gitBranchLabel1 = this.gitBranchLabel1 || this.labelTextColor, this.gitBranchLabel2 = this.gitBranchLabel2 || this.labelTextColor, this.gitBranchLabel3 = this.gitBranchLabel3 || y(this.labelTextColor), this.gitBranchLabel4 = this.gitBranchLabel4 || this.labelTextColor, this.gitBranchLabel5 = this.gitBranchLabel5 || this.labelTextColor, this.gitBranchLabel6 = this.gitBranchLabel6 || this.labelTextColor, this.gitBranchLabel7 = this.gitBranchLabel7 || this.labelTextColor, this.tagLabelColor = this.tagLabelColor || this.primaryTextColor, this.tagLabelBackground = this.tagLabelBackground || this.primaryColor, this.tagLabelBorder = this.tagBorder || this.primaryBorderColor, this.tagLabelFontSize = this.tagLabelFontSize || "10px", this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor, this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor, this.commitLabelFontSize = this.commitLabelFontSize || "10px", this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || k(this.background, 12), this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || k(this.background, 2);
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
let pp = class {
  constructor() {
    this.background = "#f4f4f4", this.primaryColor = "#ECECFF", this.secondaryColor = p(this.primaryColor, { h: 120 }), this.secondaryColor = "#ffffde", this.tertiaryColor = p(this.primaryColor, { h: -160 }), this.primaryBorderColor = Q(this.primaryColor, this.darkMode), this.secondaryBorderColor = Q(this.secondaryColor, this.darkMode), this.tertiaryBorderColor = Q(this.tertiaryColor, this.darkMode), this.primaryTextColor = y(this.primaryColor), this.secondaryTextColor = y(this.secondaryColor), this.tertiaryTextColor = y(this.tertiaryColor), this.lineColor = y(this.background), this.textColor = y(this.background), this.background = "white", this.mainBkg = "#ECECFF", this.secondBkg = "#ffffde", this.lineColor = "#333333", this.border1 = "#9370DB", this.border2 = "#aaaa33", this.arrowheadColor = "#333333", this.fontFamily = '"trebuchet ms", verdana, arial, sans-serif', this.fontSize = "16px", this.labelBackground = "#e8e8e8", this.textColor = "#333", this.THEME_COLOR_LIMIT = 12, this.nodeBkg = "calculated", this.nodeBorder = "calculated", this.clusterBkg = "calculated", this.clusterBorder = "calculated", this.defaultLinkColor = "calculated", this.titleColor = "calculated", this.edgeLabelBackground = "calculated", this.actorBorder = "calculated", this.actorBkg = "calculated", this.actorTextColor = "black", this.actorLineColor = "grey", this.signalColor = "calculated", this.signalTextColor = "calculated", this.labelBoxBkgColor = "calculated", this.labelBoxBorderColor = "calculated", this.labelTextColor = "calculated", this.loopTextColor = "calculated", this.noteBorderColor = "calculated", this.noteBkgColor = "#fff5ad", this.noteTextColor = "calculated", this.activationBorderColor = "#666", this.activationBkgColor = "#f4f4f4", this.sequenceNumberColor = "white", this.sectionBkgColor = "calculated", this.altSectionBkgColor = "calculated", this.sectionBkgColor2 = "calculated", this.excludeBkgColor = "#eeeeee", this.taskBorderColor = "calculated", this.taskBkgColor = "calculated", this.taskTextLightColor = "calculated", this.taskTextColor = this.taskTextLightColor, this.taskTextDarkColor = "calculated", this.taskTextOutsideColor = this.taskTextDarkColor, this.taskTextClickableColor = "calculated", this.activeTaskBorderColor = "calculated", this.activeTaskBkgColor = "calculated", this.gridColor = "calculated", this.doneTaskBkgColor = "calculated", this.doneTaskBorderColor = "calculated", this.critBorderColor = "calculated", this.critBkgColor = "calculated", this.todayLineColor = "calculated", this.sectionBkgColor = He(102, 102, 255, 0.49), this.altSectionBkgColor = "white", this.sectionBkgColor2 = "#fff400", this.taskBorderColor = "#534fbc", this.taskBkgColor = "#8a90dd", this.taskTextLightColor = "white", this.taskTextColor = "calculated", this.taskTextDarkColor = "black", this.taskTextOutsideColor = "calculated", this.taskTextClickableColor = "#003163", this.activeTaskBorderColor = "#534fbc", this.activeTaskBkgColor = "#bfc7ff", this.gridColor = "lightgrey", this.doneTaskBkgColor = "lightgrey", this.doneTaskBorderColor = "grey", this.critBorderColor = "#ff8888", this.critBkgColor = "red", this.todayLineColor = "red", this.personBorder = this.primaryBorderColor, this.personBkg = this.mainBkg, this.labelColor = "black", this.errorBkgColor = "#552222", this.errorTextColor = "#552222", this.updateColors();
  }
  updateColors() {
    this.cScale0 = this.cScale0 || this.primaryColor, this.cScale1 = this.cScale1 || this.secondaryColor, this.cScale2 = this.cScale2 || this.tertiaryColor, this.cScale3 = this.cScale3 || p(this.primaryColor, { h: 30 }), this.cScale4 = this.cScale4 || p(this.primaryColor, { h: 60 }), this.cScale5 = this.cScale5 || p(this.primaryColor, { h: 90 }), this.cScale6 = this.cScale6 || p(this.primaryColor, { h: 120 }), this.cScale7 = this.cScale7 || p(this.primaryColor, { h: 150 }), this.cScale8 = this.cScale8 || p(this.primaryColor, { h: 210 }), this.cScale9 = this.cScale9 || p(this.primaryColor, { h: 270 }), this.cScale10 = this.cScale10 || p(this.primaryColor, { h: 300 }), this.cScale11 = this.cScale11 || p(this.primaryColor, { h: 330 }), this["cScalePeer1"] = this["cScalePeer1"] || L(this.secondaryColor, 45), this["cScalePeer2"] = this["cScalePeer2"] || L(this.tertiaryColor, 40);
    for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
      this["cScale" + e] = L(this["cScale" + e], 10), this["cScalePeer" + e] = this["cScalePeer" + e] || L(this["cScale" + e], 25);
    for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
      this["cScaleInv" + e] = this["cScaleInv" + e] || p(this["cScale" + e], { h: 180 });
    for (let e = 0; e < 5; e++)
      this["surface" + e] = this["surface" + e] || p(this.mainBkg, { h: 30, l: -(5 + e * 5) }), this["surfacePeer" + e] = this["surfacePeer" + e] || p(this.mainBkg, { h: 30, l: -(7 + e * 5) });
    if (this.scaleLabelColor = this.scaleLabelColor !== "calculated" && this.scaleLabelColor ? this.scaleLabelColor : this.labelTextColor, this.labelTextColor !== "calculated") {
      this.cScaleLabel0 = this.cScaleLabel0 || y(this.labelTextColor), this.cScaleLabel3 = this.cScaleLabel3 || y(this.labelTextColor);
      for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
        this["cScaleLabel" + e] = this["cScaleLabel" + e] || this.labelTextColor;
    }
    this.nodeBkg = this.mainBkg, this.nodeBorder = this.border1, this.clusterBkg = this.secondBkg, this.clusterBorder = this.border2, this.defaultLinkColor = this.lineColor, this.titleColor = this.textColor, this.edgeLabelBackground = this.labelBackground, this.actorBorder = k(this.border1, 23), this.actorBkg = this.mainBkg, this.labelBoxBkgColor = this.actorBkg, this.signalColor = this.textColor, this.signalTextColor = this.textColor, this.labelBoxBorderColor = this.actorBorder, this.labelTextColor = this.actorTextColor, this.loopTextColor = this.actorTextColor, this.noteBorderColor = this.border2, this.noteTextColor = this.actorTextColor, this.taskTextColor = this.taskTextLightColor, this.taskTextOutsideColor = this.taskTextDarkColor, this.transitionColor = this.transitionColor || this.lineColor, this.transitionLabelColor = this.transitionLabelColor || this.textColor, this.stateLabelColor = this.stateLabelColor || this.stateBkg || this.primaryTextColor, this.stateBkg = this.stateBkg || this.mainBkg, this.labelBackgroundColor = this.labelBackgroundColor || this.stateBkg, this.compositeBackground = this.compositeBackground || this.background || this.tertiaryColor, this.altBackground = this.altBackground || "#f0f0f0", this.compositeTitleBackground = this.compositeTitleBackground || this.mainBkg, this.compositeBorder = this.compositeBorder || this.nodeBorder, this.innerEndBackground = this.nodeBorder, this.specialStateColor = this.lineColor, this.errorBkgColor = this.errorBkgColor || this.tertiaryColor, this.errorTextColor = this.errorTextColor || this.tertiaryTextColor, this.transitionColor = this.transitionColor || this.lineColor, this.classText = this.primaryTextColor, this.fillType0 = this.primaryColor, this.fillType1 = this.secondaryColor, this.fillType2 = p(this.primaryColor, { h: 64 }), this.fillType3 = p(this.secondaryColor, { h: 64 }), this.fillType4 = p(this.primaryColor, { h: -64 }), this.fillType5 = p(this.secondaryColor, { h: -64 }), this.fillType6 = p(this.primaryColor, { h: 128 }), this.fillType7 = p(this.secondaryColor, { h: 128 }), this.pie1 = this.pie1 || this.primaryColor, this.pie2 = this.pie2 || this.secondaryColor, this.pie3 = this.pie3 || p(this.tertiaryColor, { l: -40 }), this.pie4 = this.pie4 || p(this.primaryColor, { l: -10 }), this.pie5 = this.pie5 || p(this.secondaryColor, { l: -30 }), this.pie6 = this.pie6 || p(this.tertiaryColor, { l: -20 }), this.pie7 = this.pie7 || p(this.primaryColor, { h: 60, l: -20 }), this.pie8 = this.pie8 || p(this.primaryColor, { h: -60, l: -40 }), this.pie9 = this.pie9 || p(this.primaryColor, { h: 120, l: -40 }), this.pie10 = this.pie10 || p(this.primaryColor, { h: 60, l: -40 }), this.pie11 = this.pie11 || p(this.primaryColor, { h: -90, l: -40 }), this.pie12 = this.pie12 || p(this.primaryColor, { h: 120, l: -30 }), this.pieTitleTextSize = this.pieTitleTextSize || "25px", this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor, this.pieSectionTextSize = this.pieSectionTextSize || "17px", this.pieSectionTextColor = this.pieSectionTextColor || this.textColor, this.pieLegendTextSize = this.pieLegendTextSize || "17px", this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor, this.pieStrokeColor = this.pieStrokeColor || "black", this.pieStrokeWidth = this.pieStrokeWidth || "2px", this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || "2px", this.pieOuterStrokeColor = this.pieOuterStrokeColor || "black", this.pieOpacity = this.pieOpacity || "0.7", this.requirementBackground = this.requirementBackground || this.primaryColor, this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor, this.requirementBorderSize = this.requirementBorderSize || "1", this.requirementTextColor = this.requirementTextColor || this.primaryTextColor, this.relationColor = this.relationColor || this.lineColor, this.relationLabelBackground = this.relationLabelBackground || this.labelBackground, this.relationLabelColor = this.relationLabelColor || this.actorTextColor, this.git0 = this.git0 || this.primaryColor, this.git1 = this.git1 || this.secondaryColor, this.git2 = this.git2 || this.tertiaryColor, this.git3 = this.git3 || p(this.primaryColor, { h: -30 }), this.git4 = this.git4 || p(this.primaryColor, { h: -60 }), this.git5 = this.git5 || p(this.primaryColor, { h: -90 }), this.git6 = this.git6 || p(this.primaryColor, { h: 60 }), this.git7 = this.git7 || p(this.primaryColor, { h: 120 }), this.darkMode ? (this.git0 = k(this.git0, 25), this.git1 = k(this.git1, 25), this.git2 = k(this.git2, 25), this.git3 = k(this.git3, 25), this.git4 = k(this.git4, 25), this.git5 = k(this.git5, 25), this.git6 = k(this.git6, 25), this.git7 = k(this.git7, 25)) : (this.git0 = L(this.git0, 25), this.git1 = L(this.git1, 25), this.git2 = L(this.git2, 25), this.git3 = L(this.git3, 25), this.git4 = L(this.git4, 25), this.git5 = L(this.git5, 25), this.git6 = L(this.git6, 25), this.git7 = L(this.git7, 25)), this.gitInv0 = this.gitInv0 || L(y(this.git0), 25), this.gitInv1 = this.gitInv1 || y(this.git1), this.gitInv2 = this.gitInv2 || y(this.git2), this.gitInv3 = this.gitInv3 || y(this.git3), this.gitInv4 = this.gitInv4 || y(this.git4), this.gitInv5 = this.gitInv5 || y(this.git5), this.gitInv6 = this.gitInv6 || y(this.git6), this.gitInv7 = this.gitInv7 || y(this.git7), this.gitBranchLabel0 = this.gitBranchLabel0 || y(this.labelTextColor), this.gitBranchLabel1 = this.gitBranchLabel1 || this.labelTextColor, this.gitBranchLabel2 = this.gitBranchLabel2 || this.labelTextColor, this.gitBranchLabel3 = this.gitBranchLabel3 || y(this.labelTextColor), this.gitBranchLabel4 = this.gitBranchLabel4 || this.labelTextColor, this.gitBranchLabel5 = this.gitBranchLabel5 || this.labelTextColor, this.gitBranchLabel6 = this.gitBranchLabel6 || this.labelTextColor, this.gitBranchLabel7 = this.gitBranchLabel7 || this.labelTextColor, this.tagLabelColor = this.tagLabelColor || this.primaryTextColor, this.tagLabelBackground = this.tagLabelBackground || this.primaryColor, this.tagLabelBorder = this.tagBorder || this.primaryBorderColor, this.tagLabelFontSize = this.tagLabelFontSize || "10px", this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor, this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor, this.commitLabelFontSize = this.commitLabelFontSize || "10px", this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || gr, this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || mr;
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
const gp = (t) => {
  const e = new pp();
  return e.calculate(t), e;
};
let mp = class {
  constructor() {
    this.background = "#f4f4f4", this.primaryColor = "#cde498", this.secondaryColor = "#cdffb2", this.background = "white", this.mainBkg = "#cde498", this.secondBkg = "#cdffb2", this.lineColor = "green", this.border1 = "#13540c", this.border2 = "#6eaa49", this.arrowheadColor = "green", this.fontFamily = '"trebuchet ms", verdana, arial, sans-serif', this.fontSize = "16px", this.tertiaryColor = k("#cde498", 10), this.primaryBorderColor = Q(this.primaryColor, this.darkMode), this.secondaryBorderColor = Q(this.secondaryColor, this.darkMode), this.tertiaryBorderColor = Q(this.tertiaryColor, this.darkMode), this.primaryTextColor = y(this.primaryColor), this.secondaryTextColor = y(this.secondaryColor), this.tertiaryTextColor = y(this.primaryColor), this.lineColor = y(this.background), this.textColor = y(this.background), this.THEME_COLOR_LIMIT = 12, this.nodeBkg = "calculated", this.nodeBorder = "calculated", this.clusterBkg = "calculated", this.clusterBorder = "calculated", this.defaultLinkColor = "calculated", this.titleColor = "#333", this.edgeLabelBackground = "#e8e8e8", this.actorBorder = "calculated", this.actorBkg = "calculated", this.actorTextColor = "black", this.actorLineColor = "grey", this.signalColor = "#333", this.signalTextColor = "#333", this.labelBoxBkgColor = "calculated", this.labelBoxBorderColor = "#326932", this.labelTextColor = "calculated", this.loopTextColor = "calculated", this.noteBorderColor = "calculated", this.noteBkgColor = "#fff5ad", this.noteTextColor = "calculated", this.activationBorderColor = "#666", this.activationBkgColor = "#f4f4f4", this.sequenceNumberColor = "white", this.sectionBkgColor = "#6eaa49", this.altSectionBkgColor = "white", this.sectionBkgColor2 = "#6eaa49", this.excludeBkgColor = "#eeeeee", this.taskBorderColor = "calculated", this.taskBkgColor = "#487e3a", this.taskTextLightColor = "white", this.taskTextColor = "calculated", this.taskTextDarkColor = "black", this.taskTextOutsideColor = "calculated", this.taskTextClickableColor = "#003163", this.activeTaskBorderColor = "calculated", this.activeTaskBkgColor = "calculated", this.gridColor = "lightgrey", this.doneTaskBkgColor = "lightgrey", this.doneTaskBorderColor = "grey", this.critBorderColor = "#ff8888", this.critBkgColor = "red", this.todayLineColor = "red", this.personBorder = this.primaryBorderColor, this.personBkg = this.mainBkg, this.labelColor = "black", this.errorBkgColor = "#552222", this.errorTextColor = "#552222";
  }
  updateColors() {
    this.actorBorder = L(this.mainBkg, 20), this.actorBkg = this.mainBkg, this.labelBoxBkgColor = this.actorBkg, this.labelTextColor = this.actorTextColor, this.loopTextColor = this.actorTextColor, this.noteBorderColor = this.border2, this.noteTextColor = this.actorTextColor, this.cScale0 = this.cScale0 || this.primaryColor, this.cScale1 = this.cScale1 || this.secondaryColor, this.cScale2 = this.cScale2 || this.tertiaryColor, this.cScale3 = this.cScale3 || p(this.primaryColor, { h: 30 }), this.cScale4 = this.cScale4 || p(this.primaryColor, { h: 60 }), this.cScale5 = this.cScale5 || p(this.primaryColor, { h: 90 }), this.cScale6 = this.cScale6 || p(this.primaryColor, { h: 120 }), this.cScale7 = this.cScale7 || p(this.primaryColor, { h: 150 }), this.cScale8 = this.cScale8 || p(this.primaryColor, { h: 210 }), this.cScale9 = this.cScale9 || p(this.primaryColor, { h: 270 }), this.cScale10 = this.cScale10 || p(this.primaryColor, { h: 300 }), this.cScale11 = this.cScale11 || p(this.primaryColor, { h: 330 }), this["cScalePeer1"] = this["cScalePeer1"] || L(this.secondaryColor, 45), this["cScalePeer2"] = this["cScalePeer2"] || L(this.tertiaryColor, 40);
    for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
      this["cScale" + e] = L(this["cScale" + e], 10), this["cScalePeer" + e] = this["cScalePeer" + e] || L(this["cScale" + e], 25);
    for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
      this["cScaleInv" + e] = this["cScaleInv" + e] || p(this["cScale" + e], { h: 180 });
    this.scaleLabelColor = this.scaleLabelColor !== "calculated" && this.scaleLabelColor ? this.scaleLabelColor : this.labelTextColor;
    for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
      this["cScaleLabel" + e] = this["cScaleLabel" + e] || this.scaleLabelColor;
    for (let e = 0; e < 5; e++)
      this["surface" + e] = this["surface" + e] || p(this.mainBkg, { h: 30, s: -30, l: -(5 + e * 5) }), this["surfacePeer" + e] = this["surfacePeer" + e] || p(this.mainBkg, { h: 30, s: -30, l: -(8 + e * 5) });
    this.nodeBkg = this.mainBkg, this.nodeBorder = this.border1, this.clusterBkg = this.secondBkg, this.clusterBorder = this.border2, this.defaultLinkColor = this.lineColor, this.taskBorderColor = this.border1, this.taskTextColor = this.taskTextLightColor, this.taskTextOutsideColor = this.taskTextDarkColor, this.activeTaskBorderColor = this.taskBorderColor, this.activeTaskBkgColor = this.mainBkg, this.transitionColor = this.transitionColor || this.lineColor, this.transitionLabelColor = this.transitionLabelColor || this.textColor, this.stateLabelColor = this.stateLabelColor || this.stateBkg || this.primaryTextColor, this.stateBkg = this.stateBkg || this.mainBkg, this.labelBackgroundColor = this.labelBackgroundColor || this.stateBkg, this.compositeBackground = this.compositeBackground || this.background || this.tertiaryColor, this.altBackground = this.altBackground || "#f0f0f0", this.compositeTitleBackground = this.compositeTitleBackground || this.mainBkg, this.compositeBorder = this.compositeBorder || this.nodeBorder, this.innerEndBackground = this.primaryBorderColor, this.specialStateColor = this.lineColor, this.errorBkgColor = this.errorBkgColor || this.tertiaryColor, this.errorTextColor = this.errorTextColor || this.tertiaryTextColor, this.transitionColor = this.transitionColor || this.lineColor, this.classText = this.primaryTextColor, this.fillType0 = this.primaryColor, this.fillType1 = this.secondaryColor, this.fillType2 = p(this.primaryColor, { h: 64 }), this.fillType3 = p(this.secondaryColor, { h: 64 }), this.fillType4 = p(this.primaryColor, { h: -64 }), this.fillType5 = p(this.secondaryColor, { h: -64 }), this.fillType6 = p(this.primaryColor, { h: 128 }), this.fillType7 = p(this.secondaryColor, { h: 128 }), this.pie1 = this.pie1 || this.primaryColor, this.pie2 = this.pie2 || this.secondaryColor, this.pie3 = this.pie3 || this.tertiaryColor, this.pie4 = this.pie4 || p(this.primaryColor, { l: -30 }), this.pie5 = this.pie5 || p(this.secondaryColor, { l: -30 }), this.pie6 = this.pie6 || p(this.tertiaryColor, { h: 40, l: -40 }), this.pie7 = this.pie7 || p(this.primaryColor, { h: 60, l: -10 }), this.pie8 = this.pie8 || p(this.primaryColor, { h: -60, l: -10 }), this.pie9 = this.pie9 || p(this.primaryColor, { h: 120, l: 0 }), this.pie10 = this.pie10 || p(this.primaryColor, { h: 60, l: -50 }), this.pie11 = this.pie11 || p(this.primaryColor, { h: -60, l: -50 }), this.pie12 = this.pie12 || p(this.primaryColor, { h: 120, l: -50 }), this.pieTitleTextSize = this.pieTitleTextSize || "25px", this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor, this.pieSectionTextSize = this.pieSectionTextSize || "17px", this.pieSectionTextColor = this.pieSectionTextColor || this.textColor, this.pieLegendTextSize = this.pieLegendTextSize || "17px", this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor, this.pieStrokeColor = this.pieStrokeColor || "black", this.pieStrokeWidth = this.pieStrokeWidth || "2px", this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || "2px", this.pieOuterStrokeColor = this.pieOuterStrokeColor || "black", this.pieOpacity = this.pieOpacity || "0.7", this.requirementBackground = this.requirementBackground || this.primaryColor, this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor, this.requirementBorderSize = this.requirementBorderSize || "1", this.requirementTextColor = this.requirementTextColor || this.primaryTextColor, this.relationColor = this.relationColor || this.lineColor, this.relationLabelBackground = this.relationLabelBackground || this.edgeLabelBackground, this.relationLabelColor = this.relationLabelColor || this.actorTextColor, this.git0 = this.git0 || this.primaryColor, this.git1 = this.git1 || this.secondaryColor, this.git2 = this.git2 || this.tertiaryColor, this.git3 = this.git3 || p(this.primaryColor, { h: -30 }), this.git4 = this.git4 || p(this.primaryColor, { h: -60 }), this.git5 = this.git5 || p(this.primaryColor, { h: -90 }), this.git6 = this.git6 || p(this.primaryColor, { h: 60 }), this.git7 = this.git7 || p(this.primaryColor, { h: 120 }), this.darkMode ? (this.git0 = k(this.git0, 25), this.git1 = k(this.git1, 25), this.git2 = k(this.git2, 25), this.git3 = k(this.git3, 25), this.git4 = k(this.git4, 25), this.git5 = k(this.git5, 25), this.git6 = k(this.git6, 25), this.git7 = k(this.git7, 25)) : (this.git0 = L(this.git0, 25), this.git1 = L(this.git1, 25), this.git2 = L(this.git2, 25), this.git3 = L(this.git3, 25), this.git4 = L(this.git4, 25), this.git5 = L(this.git5, 25), this.git6 = L(this.git6, 25), this.git7 = L(this.git7, 25)), this.gitInv0 = this.gitInv0 || y(this.git0), this.gitInv1 = this.gitInv1 || y(this.git1), this.gitInv2 = this.gitInv2 || y(this.git2), this.gitInv3 = this.gitInv3 || y(this.git3), this.gitInv4 = this.gitInv4 || y(this.git4), this.gitInv5 = this.gitInv5 || y(this.git5), this.gitInv6 = this.gitInv6 || y(this.git6), this.gitInv7 = this.gitInv7 || y(this.git7), this.gitBranchLabel0 = this.gitBranchLabel0 || y(this.labelTextColor), this.gitBranchLabel1 = this.gitBranchLabel1 || this.labelTextColor, this.gitBranchLabel2 = this.gitBranchLabel2 || this.labelTextColor, this.gitBranchLabel3 = this.gitBranchLabel3 || y(this.labelTextColor), this.gitBranchLabel4 = this.gitBranchLabel4 || this.labelTextColor, this.gitBranchLabel5 = this.gitBranchLabel5 || this.labelTextColor, this.gitBranchLabel6 = this.gitBranchLabel6 || this.labelTextColor, this.gitBranchLabel7 = this.gitBranchLabel7 || this.labelTextColor, this.tagLabelColor = this.tagLabelColor || this.primaryTextColor, this.tagLabelBackground = this.tagLabelBackground || this.primaryColor, this.tagLabelBorder = this.tagBorder || this.primaryBorderColor, this.tagLabelFontSize = this.tagLabelFontSize || "10px", this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor, this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor, this.commitLabelFontSize = this.commitLabelFontSize || "10px", this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || gr, this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || mr;
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
  const e = new mp();
  return e.calculate(t), e;
};
class yp {
  constructor() {
    this.primaryColor = "#eee", this.contrast = "#707070", this.secondaryColor = k(this.contrast, 55), this.background = "#ffffff", this.tertiaryColor = p(this.primaryColor, { h: -160 }), this.primaryBorderColor = Q(this.primaryColor, this.darkMode), this.secondaryBorderColor = Q(this.secondaryColor, this.darkMode), this.tertiaryBorderColor = Q(this.tertiaryColor, this.darkMode), this.primaryTextColor = y(this.primaryColor), this.secondaryTextColor = y(this.secondaryColor), this.tertiaryTextColor = y(this.tertiaryColor), this.lineColor = y(this.background), this.textColor = y(this.background), this.mainBkg = "#eee", this.secondBkg = "calculated", this.lineColor = "#666", this.border1 = "#999", this.border2 = "calculated", this.note = "#ffa", this.text = "#333", this.critical = "#d42", this.done = "#bbb", this.arrowheadColor = "#333333", this.fontFamily = '"trebuchet ms", verdana, arial, sans-serif', this.fontSize = "16px", this.THEME_COLOR_LIMIT = 12, this.nodeBkg = "calculated", this.nodeBorder = "calculated", this.clusterBkg = "calculated", this.clusterBorder = "calculated", this.defaultLinkColor = "calculated", this.titleColor = "calculated", this.edgeLabelBackground = "white", this.actorBorder = "calculated", this.actorBkg = "calculated", this.actorTextColor = "calculated", this.actorLineColor = "calculated", this.signalColor = "calculated", this.signalTextColor = "calculated", this.labelBoxBkgColor = "calculated", this.labelBoxBorderColor = "calculated", this.labelTextColor = "calculated", this.loopTextColor = "calculated", this.noteBorderColor = "calculated", this.noteBkgColor = "calculated", this.noteTextColor = "calculated", this.activationBorderColor = "#666", this.activationBkgColor = "#f4f4f4", this.sequenceNumberColor = "white", this.sectionBkgColor = "calculated", this.altSectionBkgColor = "white", this.sectionBkgColor2 = "calculated", this.excludeBkgColor = "#eeeeee", this.taskBorderColor = "calculated", this.taskBkgColor = "calculated", this.taskTextLightColor = "white", this.taskTextColor = "calculated", this.taskTextDarkColor = "calculated", this.taskTextOutsideColor = "calculated", this.taskTextClickableColor = "#003163", this.activeTaskBorderColor = "calculated", this.activeTaskBkgColor = "calculated", this.gridColor = "calculated", this.doneTaskBkgColor = "calculated", this.doneTaskBorderColor = "calculated", this.critBkgColor = "calculated", this.critBorderColor = "calculated", this.todayLineColor = "calculated", this.personBorder = this.primaryBorderColor, this.personBkg = this.mainBkg, this.labelColor = "black", this.errorBkgColor = "#552222", this.errorTextColor = "#552222";
  }
  updateColors() {
    this.secondBkg = k(this.contrast, 55), this.border2 = this.contrast, this.actorBorder = k(this.border1, 23), this.actorBkg = this.mainBkg, this.actorTextColor = this.text, this.actorLineColor = this.lineColor, this.signalColor = this.text, this.signalTextColor = this.text, this.labelBoxBkgColor = this.actorBkg, this.labelBoxBorderColor = this.actorBorder, this.labelTextColor = this.text, this.loopTextColor = this.text, this.noteBorderColor = "#999", this.noteBkgColor = "#666", this.noteTextColor = "#fff", this.cScale0 = this.cScale0 || "#555", this.cScale1 = this.cScale1 || "#F4F4F4", this.cScale2 = this.cScale2 || "#555", this.cScale3 = this.cScale3 || "#BBB", this.cScale4 = this.cScale4 || "#777", this.cScale5 = this.cScale5 || "#999", this.cScale6 = this.cScale6 || "#DDD", this.cScale7 = this.cScale7 || "#FFF", this.cScale8 = this.cScale8 || "#DDD", this.cScale9 = this.cScale9 || "#BBB", this.cScale10 = this.cScale10 || "#999", this.cScale11 = this.cScale11 || "#777";
    for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
      this["cScaleInv" + e] = this["cScaleInv" + e] || y(this["cScale" + e]);
    for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
      this.darkMode ? this["cScalePeer" + e] = this["cScalePeer" + e] || k(this["cScale" + e], 10) : this["cScalePeer" + e] = this["cScalePeer" + e] || L(this["cScale" + e], 10);
    this.scaleLabelColor = this.scaleLabelColor || (this.darkMode ? "black" : this.labelTextColor), this.cScaleLabel0 = this.cScaleLabel0 || this.cScale1, this.cScaleLabel2 = this.cScaleLabel2 || this.cScale1;
    for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
      this["cScaleLabel" + e] = this["cScaleLabel" + e] || this.scaleLabelColor;
    for (let e = 0; e < 5; e++)
      this["surface" + e] = this["surface" + e] || p(this.mainBkg, { l: -(5 + e * 5) }), this["surfacePeer" + e] = this["surfacePeer" + e] || p(this.mainBkg, { l: -(8 + e * 5) });
    this.nodeBkg = this.mainBkg, this.nodeBorder = this.border1, this.clusterBkg = this.secondBkg, this.clusterBorder = this.border2, this.defaultLinkColor = this.lineColor, this.titleColor = this.text, this.sectionBkgColor = k(this.contrast, 30), this.sectionBkgColor2 = k(this.contrast, 30), this.taskBorderColor = L(this.contrast, 10), this.taskBkgColor = this.contrast, this.taskTextColor = this.taskTextLightColor, this.taskTextDarkColor = this.text, this.taskTextOutsideColor = this.taskTextDarkColor, this.activeTaskBorderColor = this.taskBorderColor, this.activeTaskBkgColor = this.mainBkg, this.gridColor = k(this.border1, 30), this.doneTaskBkgColor = this.done, this.doneTaskBorderColor = this.lineColor, this.critBkgColor = this.critical, this.critBorderColor = L(this.critBkgColor, 10), this.todayLineColor = this.critBkgColor, this.transitionColor = this.transitionColor || "#000", this.transitionLabelColor = this.transitionLabelColor || this.textColor, this.stateLabelColor = this.stateLabelColor || this.stateBkg || this.primaryTextColor, this.stateBkg = this.stateBkg || this.mainBkg, this.labelBackgroundColor = this.labelBackgroundColor || this.stateBkg, this.compositeBackground = this.compositeBackground || this.background || this.tertiaryColor, this.altBackground = this.altBackground || "#f4f4f4", this.compositeTitleBackground = this.compositeTitleBackground || this.mainBkg, this.stateBorder = this.stateBorder || "#000", this.innerEndBackground = this.primaryBorderColor, this.specialStateColor = "#222", this.errorBkgColor = this.errorBkgColor || this.tertiaryColor, this.errorTextColor = this.errorTextColor || this.tertiaryTextColor, this.classText = this.primaryTextColor, this.fillType0 = this.primaryColor, this.fillType1 = this.secondaryColor, this.fillType2 = p(this.primaryColor, { h: 64 }), this.fillType3 = p(this.secondaryColor, { h: 64 }), this.fillType4 = p(this.primaryColor, { h: -64 }), this.fillType5 = p(this.secondaryColor, { h: -64 }), this.fillType6 = p(this.primaryColor, { h: 128 }), this.fillType7 = p(this.secondaryColor, { h: 128 });
    for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
      this["pie" + e] = this["cScale" + e];
    this.pie12 = this.pie0, this.pieTitleTextSize = this.pieTitleTextSize || "25px", this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor, this.pieSectionTextSize = this.pieSectionTextSize || "17px", this.pieSectionTextColor = this.pieSectionTextColor || this.textColor, this.pieLegendTextSize = this.pieLegendTextSize || "17px", this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor, this.pieStrokeColor = this.pieStrokeColor || "black", this.pieStrokeWidth = this.pieStrokeWidth || "2px", this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || "2px", this.pieOuterStrokeColor = this.pieOuterStrokeColor || "black", this.pieOpacity = this.pieOpacity || "0.7", this.requirementBackground = this.requirementBackground || this.primaryColor, this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor, this.requirementBorderSize = this.requirementBorderSize || "1", this.requirementTextColor = this.requirementTextColor || this.primaryTextColor, this.relationColor = this.relationColor || this.lineColor, this.relationLabelBackground = this.relationLabelBackground || this.edgeLabelBackground, this.relationLabelColor = this.relationLabelColor || this.actorTextColor, this.git0 = L(this.pie1, 25) || this.primaryColor, this.git1 = this.pie2 || this.secondaryColor, this.git2 = this.pie3 || this.tertiaryColor, this.git3 = this.pie4 || p(this.primaryColor, { h: -30 }), this.git4 = this.pie5 || p(this.primaryColor, { h: -60 }), this.git5 = this.pie6 || p(this.primaryColor, { h: -90 }), this.git6 = this.pie7 || p(this.primaryColor, { h: 60 }), this.git7 = this.pie8 || p(this.primaryColor, { h: 120 }), this.gitInv0 = this.gitInv0 || y(this.git0), this.gitInv1 = this.gitInv1 || y(this.git1), this.gitInv2 = this.gitInv2 || y(this.git2), this.gitInv3 = this.gitInv3 || y(this.git3), this.gitInv4 = this.gitInv4 || y(this.git4), this.gitInv5 = this.gitInv5 || y(this.git5), this.gitInv6 = this.gitInv6 || y(this.git6), this.gitInv7 = this.gitInv7 || y(this.git7), this.branchLabelColor = this.branchLabelColor || this.labelTextColor, this.gitBranchLabel0 = this.branchLabelColor, this.gitBranchLabel1 = "white", this.gitBranchLabel2 = this.branchLabelColor, this.gitBranchLabel3 = "white", this.gitBranchLabel4 = this.branchLabelColor, this.gitBranchLabel5 = this.branchLabelColor, this.gitBranchLabel6 = this.branchLabelColor, this.gitBranchLabel7 = this.branchLabelColor, this.tagLabelColor = this.tagLabelColor || this.primaryTextColor, this.tagLabelBackground = this.tagLabelBackground || this.primaryColor, this.tagLabelBorder = this.tagBorder || this.primaryBorderColor, this.tagLabelFontSize = this.tagLabelFontSize || "10px", this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor, this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor, this.commitLabelFontSize = this.commitLabelFontSize || "10px", this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || gr, this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || mr;
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
const Cp = (t) => {
  const e = new yp();
  return e.calculate(t), e;
}, Lt = {
  base: {
    getThemeVariables: up
  },
  dark: {
    getThemeVariables: dp
  },
  default: {
    getThemeVariables: gp
  },
  forest: {
    getThemeVariables: _p
  },
  neutral: {
    getThemeVariables: Cp
  }
}, Nt = {
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
  themeVariables: Lt.default.getThemeVariables(),
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
Nt.class && (Nt.class.arrowMarkerAbsolute = Nt.arrowMarkerAbsolute);
Nt.gitGraph && (Nt.gitGraph.arrowMarkerAbsolute = Nt.arrowMarkerAbsolute);
const Fa = (t, e = "") => Object.keys(t).reduce((i, r) => Array.isArray(t[r]) ? i : typeof t[r] == "object" && t[r] !== null ? [...i, e + r, ...Fa(t[r], "")] : [...i, e + r], []), bp = Fa(Nt, ""), xp = Nt;
/*! js-yaml 4.1.0 https://github.com/nodeca/js-yaml @license MIT */
function Ma(t) {
  return typeof t > "u" || t === null;
}
function Tp(t) {
  return typeof t == "object" && t !== null;
}
function Sp(t) {
  return Array.isArray(t) ? t : Ma(t) ? [] : [t];
}
function vp(t, e) {
  var i, r, n, o;
  if (e)
    for (o = Object.keys(e), i = 0, r = o.length; i < r; i += 1)
      n = o[i], t[n] = e[n];
  return t;
}
function kp(t, e) {
  var i = "", r;
  for (r = 0; r < e; r += 1)
    i += t;
  return i;
}
function wp(t) {
  return t === 0 && Number.NEGATIVE_INFINITY === 1 / t;
}
var Bp = Ma, Lp = Tp, Ap = Sp, Ep = kp, Fp = wp, Mp = vp, J = {
  isNothing: Bp,
  isObject: Lp,
  toArray: Ap,
  repeat: Ep,
  isNegativeZero: Fp,
  extend: Mp
};
function Oa(t, e) {
  var i = "", r = t.reason || "(unknown reason)";
  return t.mark ? (t.mark.name && (i += 'in "' + t.mark.name + '" '), i += "(" + (t.mark.line + 1) + ":" + (t.mark.column + 1) + ")", !e && t.mark.snippet && (i += `

` + t.mark.snippet), r + " " + i) : r;
}
function Ke(t, e) {
  Error.call(this), this.name = "YAMLException", this.reason = t, this.mark = e, this.message = Oa(this, !1), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack || "";
}
Ke.prototype = Object.create(Error.prototype);
Ke.prototype.constructor = Ke;
Ke.prototype.toString = function(e) {
  return this.name + ": " + Oa(this, e);
};
var Bt = Ke;
function Vr(t, e, i, r, n) {
  var o = "", s = "", a = Math.floor(n / 2) - 1;
  return r - e > a && (o = " ... ", e = r - a + o.length), i - r > a && (s = " ...", i = r + a - s.length), {
    str: o + t.slice(e, i).replace(/\t/g, "→") + s,
    pos: r - e + o.length
    // relative position
  };
}
function Xr(t, e) {
  return J.repeat(" ", e - t.length) + t;
}
function Op(t, e) {
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
    ), a = J.repeat(" ", e.indent) + Xr((t.line - l + 1).toString(), h) + " | " + c.str + `
` + a;
  for (c = Vr(t.buffer, r[s], n[s], t.position, u), a += J.repeat(" ", e.indent) + Xr((t.line + 1).toString(), h) + " | " + c.str + `
`, a += J.repeat("-", e.indent + h + 3 + c.pos) + `^
`, l = 1; l <= e.linesAfter && !(s + l >= n.length); l++)
    c = Vr(
      t.buffer,
      r[s + l],
      n[s + l],
      t.position - (r[s] - r[s + l]),
      u
    ), a += J.repeat(" ", e.indent) + Xr((t.line + l + 1).toString(), h) + " | " + c.str + `
`;
  return a.replace(/\n$/, "");
}
var $p = Op, Ip = [
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
], Dp = [
  "scalar",
  "sequence",
  "mapping"
];
function Np(t) {
  var e = {};
  return t !== null && Object.keys(t).forEach(function(i) {
    t[i].forEach(function(r) {
      e[String(r)] = i;
    });
  }), e;
}
function Rp(t, e) {
  if (e = e || {}, Object.keys(e).forEach(function(i) {
    if (Ip.indexOf(i) === -1)
      throw new Bt('Unknown option "' + i + '" is met in definition of "' + t + '" YAML type.');
  }), this.options = e, this.tag = t, this.kind = e.kind || null, this.resolve = e.resolve || function() {
    return !0;
  }, this.construct = e.construct || function(i) {
    return i;
  }, this.instanceOf = e.instanceOf || null, this.predicate = e.predicate || null, this.represent = e.represent || null, this.representName = e.representName || null, this.defaultStyle = e.defaultStyle || null, this.multi = e.multi || !1, this.styleAliases = Np(e.styleAliases || null), Dp.indexOf(this.kind) === -1)
    throw new Bt('Unknown kind "' + this.kind + '" is specified for "' + t + '" YAML type.');
}
var Z = Rp;
function is(t, e) {
  var i = [];
  return t[e].forEach(function(r) {
    var n = i.length;
    i.forEach(function(o, s) {
      o.tag === r.tag && o.kind === r.kind && o.multi === r.multi && (n = s);
    }), i[n] = r;
  }), i;
}
function zp() {
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
  if (e instanceof Z)
    r.push(e);
  else if (Array.isArray(e))
    r = r.concat(e);
  else if (e && (Array.isArray(e.implicit) || Array.isArray(e.explicit)))
    e.implicit && (i = i.concat(e.implicit)), e.explicit && (r = r.concat(e.explicit));
  else
    throw new Bt("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
  i.forEach(function(o) {
    if (!(o instanceof Z))
      throw new Bt("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    if (o.loadKind && o.loadKind !== "scalar")
      throw new Bt("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
    if (o.multi)
      throw new Bt("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
  }), r.forEach(function(o) {
    if (!(o instanceof Z))
      throw new Bt("Specified list of YAML types (or a single Type object) contains a non-Type object.");
  });
  var n = Object.create(dn.prototype);
  return n.implicit = (this.implicit || []).concat(i), n.explicit = (this.explicit || []).concat(r), n.compiledImplicit = is(n, "implicit"), n.compiledExplicit = is(n, "explicit"), n.compiledTypeMap = zp(n.compiledImplicit, n.compiledExplicit), n;
};
var Pp = dn, Wp = new Z("tag:yaml.org,2002:str", {
  kind: "scalar",
  construct: function(t) {
    return t !== null ? t : "";
  }
}), Hp = new Z("tag:yaml.org,2002:seq", {
  kind: "sequence",
  construct: function(t) {
    return t !== null ? t : [];
  }
}), qp = new Z("tag:yaml.org,2002:map", {
  kind: "mapping",
  construct: function(t) {
    return t !== null ? t : {};
  }
}), $a = new Pp({
  explicit: [
    Wp,
    Hp,
    qp
  ]
});
function jp(t) {
  if (t === null)
    return !0;
  var e = t.length;
  return e === 1 && t === "~" || e === 4 && (t === "null" || t === "Null" || t === "NULL");
}
function Up() {
  return null;
}
function Yp(t) {
  return t === null;
}
var Gp = new Z("tag:yaml.org,2002:null", {
  kind: "scalar",
  resolve: jp,
  construct: Up,
  predicate: Yp,
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
function Vp(t) {
  if (t === null)
    return !1;
  var e = t.length;
  return e === 4 && (t === "true" || t === "True" || t === "TRUE") || e === 5 && (t === "false" || t === "False" || t === "FALSE");
}
function Xp(t) {
  return t === "true" || t === "True" || t === "TRUE";
}
function Kp(t) {
  return Object.prototype.toString.call(t) === "[object Boolean]";
}
var Zp = new Z("tag:yaml.org,2002:bool", {
  kind: "scalar",
  resolve: Vp,
  construct: Xp,
  predicate: Kp,
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
function Jp(t) {
  return 48 <= t && t <= 57 || 65 <= t && t <= 70 || 97 <= t && t <= 102;
}
function Qp(t) {
  return 48 <= t && t <= 55;
}
function tg(t) {
  return 48 <= t && t <= 57;
}
function eg(t) {
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
          if (!Jp(t.charCodeAt(i)))
            return !1;
          r = !0;
        }
      return r && n !== "_";
    }
    if (n === "o") {
      for (i++; i < e; i++)
        if (n = t[i], n !== "_") {
          if (!Qp(t.charCodeAt(i)))
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
      if (!tg(t.charCodeAt(i)))
        return !1;
      r = !0;
    }
  return !(!r || n === "_");
}
function ig(t) {
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
function rg(t) {
  return Object.prototype.toString.call(t) === "[object Number]" && t % 1 === 0 && !J.isNegativeZero(t);
}
var ng = new Z("tag:yaml.org,2002:int", {
  kind: "scalar",
  resolve: eg,
  construct: ig,
  predicate: rg,
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
}), og = new RegExp(
  // 2.5e4, 2.5 and integers
  "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
);
function sg(t) {
  return !(t === null || !og.test(t) || // Quick hack to not allow integers end with `_`
  // Probably should update regexp & check speed
  t[t.length - 1] === "_");
}
function ag(t) {
  var e, i;
  return e = t.replace(/_/g, "").toLowerCase(), i = e[0] === "-" ? -1 : 1, "+-".indexOf(e[0]) >= 0 && (e = e.slice(1)), e === ".inf" ? i === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : e === ".nan" ? NaN : i * parseFloat(e, 10);
}
var lg = /^[-+]?[0-9]+e/;
function cg(t, e) {
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
  else if (J.isNegativeZero(t))
    return "-0.0";
  return i = t.toString(10), lg.test(i) ? i.replace("e", ".e") : i;
}
function hg(t) {
  return Object.prototype.toString.call(t) === "[object Number]" && (t % 1 !== 0 || J.isNegativeZero(t));
}
var ug = new Z("tag:yaml.org,2002:float", {
  kind: "scalar",
  resolve: sg,
  construct: ag,
  predicate: hg,
  represent: cg,
  defaultStyle: "lowercase"
}), fg = $a.extend({
  implicit: [
    Gp,
    Zp,
    ng,
    ug
  ]
}), dg = fg, Ia = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
), Da = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
);
function pg(t) {
  return t === null ? !1 : Ia.exec(t) !== null || Da.exec(t) !== null;
}
function gg(t) {
  var e, i, r, n, o, s, a, l = 0, c = null, h, u, g;
  if (e = Ia.exec(t), e === null && (e = Da.exec(t)), e === null)
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
function mg(t) {
  return t.toISOString();
}
var _g = new Z("tag:yaml.org,2002:timestamp", {
  kind: "scalar",
  resolve: pg,
  construct: gg,
  instanceOf: Date,
  represent: mg
});
function yg(t) {
  return t === "<<" || t === null;
}
var Cg = new Z("tag:yaml.org,2002:merge", {
  kind: "scalar",
  resolve: yg
}), Wn = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
function bg(t) {
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
function xg(t) {
  var e, i, r = t.replace(/[\r\n=]/g, ""), n = r.length, o = Wn, s = 0, a = [];
  for (e = 0; e < n; e++)
    e % 4 === 0 && e && (a.push(s >> 16 & 255), a.push(s >> 8 & 255), a.push(s & 255)), s = s << 6 | o.indexOf(r.charAt(e));
  return i = n % 4 * 6, i === 0 ? (a.push(s >> 16 & 255), a.push(s >> 8 & 255), a.push(s & 255)) : i === 18 ? (a.push(s >> 10 & 255), a.push(s >> 2 & 255)) : i === 12 && a.push(s >> 4 & 255), new Uint8Array(a);
}
function Tg(t) {
  var e = "", i = 0, r, n, o = t.length, s = Wn;
  for (r = 0; r < o; r++)
    r % 3 === 0 && r && (e += s[i >> 18 & 63], e += s[i >> 12 & 63], e += s[i >> 6 & 63], e += s[i & 63]), i = (i << 8) + t[r];
  return n = o % 3, n === 0 ? (e += s[i >> 18 & 63], e += s[i >> 12 & 63], e += s[i >> 6 & 63], e += s[i & 63]) : n === 2 ? (e += s[i >> 10 & 63], e += s[i >> 4 & 63], e += s[i << 2 & 63], e += s[64]) : n === 1 && (e += s[i >> 2 & 63], e += s[i << 4 & 63], e += s[64], e += s[64]), e;
}
function Sg(t) {
  return Object.prototype.toString.call(t) === "[object Uint8Array]";
}
var vg = new Z("tag:yaml.org,2002:binary", {
  kind: "scalar",
  resolve: bg,
  construct: xg,
  predicate: Sg,
  represent: Tg
}), kg = Object.prototype.hasOwnProperty, wg = Object.prototype.toString;
function Bg(t) {
  if (t === null)
    return !0;
  var e = [], i, r, n, o, s, a = t;
  for (i = 0, r = a.length; i < r; i += 1) {
    if (n = a[i], s = !1, wg.call(n) !== "[object Object]")
      return !1;
    for (o in n)
      if (kg.call(n, o))
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
function Lg(t) {
  return t !== null ? t : [];
}
var Ag = new Z("tag:yaml.org,2002:omap", {
  kind: "sequence",
  resolve: Bg,
  construct: Lg
}), Eg = Object.prototype.toString;
function Fg(t) {
  if (t === null)
    return !0;
  var e, i, r, n, o, s = t;
  for (o = new Array(s.length), e = 0, i = s.length; e < i; e += 1) {
    if (r = s[e], Eg.call(r) !== "[object Object]" || (n = Object.keys(r), n.length !== 1))
      return !1;
    o[e] = [n[0], r[n[0]]];
  }
  return !0;
}
function Mg(t) {
  if (t === null)
    return [];
  var e, i, r, n, o, s = t;
  for (o = new Array(s.length), e = 0, i = s.length; e < i; e += 1)
    r = s[e], n = Object.keys(r), o[e] = [n[0], r[n[0]]];
  return o;
}
var Og = new Z("tag:yaml.org,2002:pairs", {
  kind: "sequence",
  resolve: Fg,
  construct: Mg
}), $g = Object.prototype.hasOwnProperty;
function Ig(t) {
  if (t === null)
    return !0;
  var e, i = t;
  for (e in i)
    if ($g.call(i, e) && i[e] !== null)
      return !1;
  return !0;
}
function Dg(t) {
  return t !== null ? t : {};
}
var Ng = new Z("tag:yaml.org,2002:set", {
  kind: "mapping",
  resolve: Ig,
  construct: Dg
}), Rg = dg.extend({
  implicit: [
    _g,
    Cg
  ],
  explicit: [
    vg,
    Ag,
    Og,
    Ng
  ]
}), Pt = Object.prototype.hasOwnProperty, Ki = 1, Na = 2, Ra = 3, Zi = 4, Kr = 1, zg = 2, rs = 3, Pg = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, Wg = /[\x85\u2028\u2029]/, Hg = /[,\[\]\{\}]/, za = /^(?:!|!!|![a-z\-]+!)$/i, Pa = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
function ns(t) {
  return Object.prototype.toString.call(t);
}
function xt(t) {
  return t === 10 || t === 13;
}
function Zt(t) {
  return t === 9 || t === 32;
}
function rt(t) {
  return t === 9 || t === 32 || t === 10 || t === 13;
}
function _e(t) {
  return t === 44 || t === 91 || t === 93 || t === 123 || t === 125;
}
function qg(t) {
  var e;
  return 48 <= t && t <= 57 ? t - 48 : (e = t | 32, 97 <= e && e <= 102 ? e - 97 + 10 : -1);
}
function jg(t) {
  return t === 120 ? 2 : t === 117 ? 4 : t === 85 ? 8 : 0;
}
function Ug(t) {
  return 48 <= t && t <= 57 ? t - 48 : -1;
}
function os(t) {
  return t === 48 ? "\0" : t === 97 ? "\x07" : t === 98 ? "\b" : t === 116 || t === 9 ? "	" : t === 110 ? `
` : t === 118 ? "\v" : t === 102 ? "\f" : t === 114 ? "\r" : t === 101 ? "\x1B" : t === 32 ? " " : t === 34 ? '"' : t === 47 ? "/" : t === 92 ? "\\" : t === 78 ? "" : t === 95 ? " " : t === 76 ? "\u2028" : t === 80 ? "\u2029" : "";
}
function Yg(t) {
  return t <= 65535 ? String.fromCharCode(t) : String.fromCharCode(
    (t - 65536 >> 10) + 55296,
    (t - 65536 & 1023) + 56320
  );
}
var Wa = new Array(256), Ha = new Array(256);
for (var fe = 0; fe < 256; fe++)
  Wa[fe] = os(fe) ? 1 : 0, Ha[fe] = os(fe);
function Gg(t, e) {
  this.input = t, this.filename = e.filename || null, this.schema = e.schema || Rg, this.onWarning = e.onWarning || null, this.legacy = e.legacy || !1, this.json = e.json || !1, this.listener = e.listener || null, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = t.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.firstTabInLine = -1, this.documents = [];
}
function qa(t, e) {
  var i = {
    name: t.filename,
    buffer: t.input.slice(0, -1),
    // omit trailing \0
    position: t.position,
    line: t.line,
    column: t.position - t.lineStart
  };
  return i.snippet = $p(i), new Bt(e, i);
}
function v(t, e) {
  throw qa(t, e);
}
function Ji(t, e) {
  t.onWarning && t.onWarning.call(null, qa(t, e));
}
var ss = {
  YAML: function(e, i, r) {
    var n, o, s;
    e.version !== null && v(e, "duplication of %YAML directive"), r.length !== 1 && v(e, "YAML directive accepts exactly one argument"), n = /^([0-9]+)\.([0-9]+)$/.exec(r[0]), n === null && v(e, "ill-formed argument of the YAML directive"), o = parseInt(n[1], 10), s = parseInt(n[2], 10), o !== 1 && v(e, "unacceptable YAML version of the document"), e.version = r[0], e.checkLineBreaks = s < 2, s !== 1 && s !== 2 && Ji(e, "unsupported YAML version of the document");
  },
  TAG: function(e, i, r) {
    var n, o;
    r.length !== 2 && v(e, "TAG directive accepts exactly two arguments"), n = r[0], o = r[1], za.test(n) || v(e, "ill-formed tag handle (first argument) of the TAG directive"), Pt.call(e.tagMap, n) && v(e, 'there is a previously declared suffix for "' + n + '" tag handle'), Pa.test(o) || v(e, "ill-formed tag prefix (second argument) of the TAG directive");
    try {
      o = decodeURIComponent(o);
    } catch {
      v(e, "tag prefix is malformed: " + o);
    }
    e.tagMap[n] = o;
  }
};
function Rt(t, e, i, r) {
  var n, o, s, a;
  if (e < i) {
    if (a = t.input.slice(e, i), r)
      for (n = 0, o = a.length; n < o; n += 1)
        s = a.charCodeAt(n), s === 9 || 32 <= s && s <= 1114111 || v(t, "expected valid JSON character");
    else
      Pg.test(a) && v(t, "the stream contains non-printable characters");
    t.result += a;
  }
}
function as(t, e, i, r) {
  var n, o, s, a;
  for (J.isObject(i) || v(t, "cannot merge mappings; the provided source object is unacceptable"), n = Object.keys(i), s = 0, a = n.length; s < a; s += 1)
    o = n[s], Pt.call(e, o) || (e[o] = i[o], r[o] = !0);
}
function ye(t, e, i, r, n, o, s, a, l) {
  var c, h;
  if (Array.isArray(n))
    for (n = Array.prototype.slice.call(n), c = 0, h = n.length; c < h; c += 1)
      Array.isArray(n[c]) && v(t, "nested arrays are not supported inside keys"), typeof n == "object" && ns(n[c]) === "[object Object]" && (n[c] = "[object Object]");
  if (typeof n == "object" && ns(n) === "[object Object]" && (n = "[object Object]"), n = String(n), e === null && (e = {}), r === "tag:yaml.org,2002:merge")
    if (Array.isArray(o))
      for (c = 0, h = o.length; c < h; c += 1)
        as(t, e, o[c], i);
    else
      as(t, e, o, i);
  else
    !t.json && !Pt.call(i, n) && Pt.call(e, n) && (t.line = s || t.line, t.lineStart = a || t.lineStart, t.position = l || t.position, v(t, "duplicated mapping key")), n === "__proto__" ? Object.defineProperty(e, n, {
      configurable: !0,
      enumerable: !0,
      writable: !0,
      value: o
    }) : e[n] = o, delete i[n];
  return e;
}
function Hn(t) {
  var e;
  e = t.input.charCodeAt(t.position), e === 10 ? t.position++ : e === 13 ? (t.position++, t.input.charCodeAt(t.position) === 10 && t.position++) : v(t, "a line break is expected"), t.line += 1, t.lineStart = t.position, t.firstTabInLine = -1;
}
function H(t, e, i) {
  for (var r = 0, n = t.input.charCodeAt(t.position); n !== 0; ) {
    for (; Zt(n); )
      n === 9 && t.firstTabInLine === -1 && (t.firstTabInLine = t.position), n = t.input.charCodeAt(++t.position);
    if (e && n === 35)
      do
        n = t.input.charCodeAt(++t.position);
      while (n !== 10 && n !== 13 && n !== 0);
    if (xt(n))
      for (Hn(t), n = t.input.charCodeAt(t.position), r++, t.lineIndent = 0; n === 32; )
        t.lineIndent++, n = t.input.charCodeAt(++t.position);
    else
      break;
  }
  return i !== -1 && r !== 0 && t.lineIndent < i && Ji(t, "deficient indentation"), r;
}
function _r(t) {
  var e = t.position, i;
  return i = t.input.charCodeAt(e), !!((i === 45 || i === 46) && i === t.input.charCodeAt(e + 1) && i === t.input.charCodeAt(e + 2) && (e += 3, i = t.input.charCodeAt(e), i === 0 || rt(i)));
}
function qn(t, e) {
  e === 1 ? t.result += " " : e > 1 && (t.result += J.repeat(`
`, e - 1));
}
function Vg(t, e, i) {
  var r, n, o, s, a, l, c, h, u = t.kind, g = t.result, d;
  if (d = t.input.charCodeAt(t.position), rt(d) || _e(d) || d === 35 || d === 38 || d === 42 || d === 33 || d === 124 || d === 62 || d === 39 || d === 34 || d === 37 || d === 64 || d === 96 || (d === 63 || d === 45) && (n = t.input.charCodeAt(t.position + 1), rt(n) || i && _e(n)))
    return !1;
  for (t.kind = "scalar", t.result = "", o = s = t.position, a = !1; d !== 0; ) {
    if (d === 58) {
      if (n = t.input.charCodeAt(t.position + 1), rt(n) || i && _e(n))
        break;
    } else if (d === 35) {
      if (r = t.input.charCodeAt(t.position - 1), rt(r))
        break;
    } else {
      if (t.position === t.lineStart && _r(t) || i && _e(d))
        break;
      if (xt(d))
        if (l = t.line, c = t.lineStart, h = t.lineIndent, H(t, !1, -1), t.lineIndent >= e) {
          a = !0, d = t.input.charCodeAt(t.position);
          continue;
        } else {
          t.position = s, t.line = l, t.lineStart = c, t.lineIndent = h;
          break;
        }
    }
    a && (Rt(t, o, s, !1), qn(t, t.line - l), o = s = t.position, a = !1), Zt(d) || (s = t.position + 1), d = t.input.charCodeAt(++t.position);
  }
  return Rt(t, o, s, !1), t.result ? !0 : (t.kind = u, t.result = g, !1);
}
function Xg(t, e) {
  var i, r, n;
  if (i = t.input.charCodeAt(t.position), i !== 39)
    return !1;
  for (t.kind = "scalar", t.result = "", t.position++, r = n = t.position; (i = t.input.charCodeAt(t.position)) !== 0; )
    if (i === 39)
      if (Rt(t, r, t.position, !0), i = t.input.charCodeAt(++t.position), i === 39)
        r = t.position, t.position++, n = t.position;
      else
        return !0;
    else
      xt(i) ? (Rt(t, r, n, !0), qn(t, H(t, !1, e)), r = n = t.position) : t.position === t.lineStart && _r(t) ? v(t, "unexpected end of the document within a single quoted scalar") : (t.position++, n = t.position);
  v(t, "unexpected end of the stream within a single quoted scalar");
}
function Kg(t, e) {
  var i, r, n, o, s, a;
  if (a = t.input.charCodeAt(t.position), a !== 34)
    return !1;
  for (t.kind = "scalar", t.result = "", t.position++, i = r = t.position; (a = t.input.charCodeAt(t.position)) !== 0; ) {
    if (a === 34)
      return Rt(t, i, t.position, !0), t.position++, !0;
    if (a === 92) {
      if (Rt(t, i, t.position, !0), a = t.input.charCodeAt(++t.position), xt(a))
        H(t, !1, e);
      else if (a < 256 && Wa[a])
        t.result += Ha[a], t.position++;
      else if ((s = jg(a)) > 0) {
        for (n = s, o = 0; n > 0; n--)
          a = t.input.charCodeAt(++t.position), (s = qg(a)) >= 0 ? o = (o << 4) + s : v(t, "expected hexadecimal character");
        t.result += Yg(o), t.position++;
      } else
        v(t, "unknown escape sequence");
      i = r = t.position;
    } else
      xt(a) ? (Rt(t, i, r, !0), qn(t, H(t, !1, e)), i = r = t.position) : t.position === t.lineStart && _r(t) ? v(t, "unexpected end of the document within a double quoted scalar") : (t.position++, r = t.position);
  }
  v(t, "unexpected end of the stream within a double quoted scalar");
}
function Zg(t, e) {
  var i = !0, r, n, o, s = t.tag, a, l = t.anchor, c, h, u, g, d, _ = /* @__PURE__ */ Object.create(null), T, w, A, C;
  if (C = t.input.charCodeAt(t.position), C === 91)
    h = 93, d = !1, a = [];
  else if (C === 123)
    h = 125, d = !0, a = {};
  else
    return !1;
  for (t.anchor !== null && (t.anchorMap[t.anchor] = a), C = t.input.charCodeAt(++t.position); C !== 0; ) {
    if (H(t, !0, e), C = t.input.charCodeAt(t.position), C === h)
      return t.position++, t.tag = s, t.anchor = l, t.kind = d ? "mapping" : "sequence", t.result = a, !0;
    i ? C === 44 && v(t, "expected the node content, but found ','") : v(t, "missed comma between flow collection entries"), w = T = A = null, u = g = !1, C === 63 && (c = t.input.charCodeAt(t.position + 1), rt(c) && (u = g = !0, t.position++, H(t, !0, e))), r = t.line, n = t.lineStart, o = t.position, Se(t, e, Ki, !1, !0), w = t.tag, T = t.result, H(t, !0, e), C = t.input.charCodeAt(t.position), (g || t.line === r) && C === 58 && (u = !0, C = t.input.charCodeAt(++t.position), H(t, !0, e), Se(t, e, Ki, !1, !0), A = t.result), d ? ye(t, a, _, w, T, A, r, n, o) : u ? a.push(ye(t, null, _, w, T, A, r, n, o)) : a.push(T), H(t, !0, e), C = t.input.charCodeAt(t.position), C === 44 ? (i = !0, C = t.input.charCodeAt(++t.position)) : i = !1;
  }
  v(t, "unexpected end of the stream within a flow collection");
}
function Jg(t, e) {
  var i, r, n = Kr, o = !1, s = !1, a = e, l = 0, c = !1, h, u;
  if (u = t.input.charCodeAt(t.position), u === 124)
    r = !1;
  else if (u === 62)
    r = !0;
  else
    return !1;
  for (t.kind = "scalar", t.result = ""; u !== 0; )
    if (u = t.input.charCodeAt(++t.position), u === 43 || u === 45)
      Kr === n ? n = u === 43 ? rs : zg : v(t, "repeat of a chomping mode identifier");
    else if ((h = Ug(u)) >= 0)
      h === 0 ? v(t, "bad explicit indentation width of a block scalar; it cannot be less than one") : s ? v(t, "repeat of an indentation width identifier") : (a = e + h - 1, s = !0);
    else
      break;
  if (Zt(u)) {
    do
      u = t.input.charCodeAt(++t.position);
    while (Zt(u));
    if (u === 35)
      do
        u = t.input.charCodeAt(++t.position);
      while (!xt(u) && u !== 0);
  }
  for (; u !== 0; ) {
    for (Hn(t), t.lineIndent = 0, u = t.input.charCodeAt(t.position); (!s || t.lineIndent < a) && u === 32; )
      t.lineIndent++, u = t.input.charCodeAt(++t.position);
    if (!s && t.lineIndent > a && (a = t.lineIndent), xt(u)) {
      l++;
      continue;
    }
    if (t.lineIndent < a) {
      n === rs ? t.result += J.repeat(`
`, o ? 1 + l : l) : n === Kr && o && (t.result += `
`);
      break;
    }
    for (r ? Zt(u) ? (c = !0, t.result += J.repeat(`
`, o ? 1 + l : l)) : c ? (c = !1, t.result += J.repeat(`
`, l + 1)) : l === 0 ? o && (t.result += " ") : t.result += J.repeat(`
`, l) : t.result += J.repeat(`
`, o ? 1 + l : l), o = !0, s = !0, l = 0, i = t.position; !xt(u) && u !== 0; )
      u = t.input.charCodeAt(++t.position);
    Rt(t, i, t.position, !1);
  }
  return !0;
}
function ls(t, e) {
  var i, r = t.tag, n = t.anchor, o = [], s, a = !1, l;
  if (t.firstTabInLine !== -1)
    return !1;
  for (t.anchor !== null && (t.anchorMap[t.anchor] = o), l = t.input.charCodeAt(t.position); l !== 0 && (t.firstTabInLine !== -1 && (t.position = t.firstTabInLine, v(t, "tab characters must not be used in indentation")), !(l !== 45 || (s = t.input.charCodeAt(t.position + 1), !rt(s)))); ) {
    if (a = !0, t.position++, H(t, !0, -1) && t.lineIndent <= e) {
      o.push(null), l = t.input.charCodeAt(t.position);
      continue;
    }
    if (i = t.line, Se(t, e, Ra, !1, !0), o.push(t.result), H(t, !0, -1), l = t.input.charCodeAt(t.position), (t.line === i || t.lineIndent > e) && l !== 0)
      v(t, "bad indentation of a sequence entry");
    else if (t.lineIndent < e)
      break;
  }
  return a ? (t.tag = r, t.anchor = n, t.kind = "sequence", t.result = o, !0) : !1;
}
function Qg(t, e, i) {
  var r, n, o, s, a, l, c = t.tag, h = t.anchor, u = {}, g = /* @__PURE__ */ Object.create(null), d = null, _ = null, T = null, w = !1, A = !1, C;
  if (t.firstTabInLine !== -1)
    return !1;
  for (t.anchor !== null && (t.anchorMap[t.anchor] = u), C = t.input.charCodeAt(t.position); C !== 0; ) {
    if (!w && t.firstTabInLine !== -1 && (t.position = t.firstTabInLine, v(t, "tab characters must not be used in indentation")), r = t.input.charCodeAt(t.position + 1), o = t.line, (C === 63 || C === 58) && rt(r))
      C === 63 ? (w && (ye(t, u, g, d, _, null, s, a, l), d = _ = T = null), A = !0, w = !0, n = !0) : w ? (w = !1, n = !0) : v(t, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), t.position += 1, C = r;
    else {
      if (s = t.line, a = t.lineStart, l = t.position, !Se(t, i, Na, !1, !0))
        break;
      if (t.line === o) {
        for (C = t.input.charCodeAt(t.position); Zt(C); )
          C = t.input.charCodeAt(++t.position);
        if (C === 58)
          C = t.input.charCodeAt(++t.position), rt(C) || v(t, "a whitespace character is expected after the key-value separator within a block mapping"), w && (ye(t, u, g, d, _, null, s, a, l), d = _ = T = null), A = !0, w = !1, n = !1, d = t.tag, _ = t.result;
        else if (A)
          v(t, "can not read an implicit mapping pair; a colon is missed");
        else
          return t.tag = c, t.anchor = h, !0;
      } else if (A)
        v(t, "can not read a block mapping entry; a multiline key may not be an implicit key");
      else
        return t.tag = c, t.anchor = h, !0;
    }
    if ((t.line === o || t.lineIndent > e) && (w && (s = t.line, a = t.lineStart, l = t.position), Se(t, e, Zi, !0, n) && (w ? _ = t.result : T = t.result), w || (ye(t, u, g, d, _, T, s, a, l), d = _ = T = null), H(t, !0, -1), C = t.input.charCodeAt(t.position)), (t.line === o || t.lineIndent > e) && C !== 0)
      v(t, "bad indentation of a mapping entry");
    else if (t.lineIndent < e)
      break;
  }
  return w && ye(t, u, g, d, _, null, s, a, l), A && (t.tag = c, t.anchor = h, t.kind = "mapping", t.result = u), A;
}
function tm(t) {
  var e, i = !1, r = !1, n, o, s;
  if (s = t.input.charCodeAt(t.position), s !== 33)
    return !1;
  if (t.tag !== null && v(t, "duplication of a tag property"), s = t.input.charCodeAt(++t.position), s === 60 ? (i = !0, s = t.input.charCodeAt(++t.position)) : s === 33 ? (r = !0, n = "!!", s = t.input.charCodeAt(++t.position)) : n = "!", e = t.position, i) {
    do
      s = t.input.charCodeAt(++t.position);
    while (s !== 0 && s !== 62);
    t.position < t.length ? (o = t.input.slice(e, t.position), s = t.input.charCodeAt(++t.position)) : v(t, "unexpected end of the stream within a verbatim tag");
  } else {
    for (; s !== 0 && !rt(s); )
      s === 33 && (r ? v(t, "tag suffix cannot contain exclamation marks") : (n = t.input.slice(e - 1, t.position + 1), za.test(n) || v(t, "named tag handle cannot contain such characters"), r = !0, e = t.position + 1)), s = t.input.charCodeAt(++t.position);
    o = t.input.slice(e, t.position), Hg.test(o) && v(t, "tag suffix cannot contain flow indicator characters");
  }
  o && !Pa.test(o) && v(t, "tag name cannot contain such characters: " + o);
  try {
    o = decodeURIComponent(o);
  } catch {
    v(t, "tag name is malformed: " + o);
  }
  return i ? t.tag = o : Pt.call(t.tagMap, n) ? t.tag = t.tagMap[n] + o : n === "!" ? t.tag = "!" + o : n === "!!" ? t.tag = "tag:yaml.org,2002:" + o : v(t, 'undeclared tag handle "' + n + '"'), !0;
}
function em(t) {
  var e, i;
  if (i = t.input.charCodeAt(t.position), i !== 38)
    return !1;
  for (t.anchor !== null && v(t, "duplication of an anchor property"), i = t.input.charCodeAt(++t.position), e = t.position; i !== 0 && !rt(i) && !_e(i); )
    i = t.input.charCodeAt(++t.position);
  return t.position === e && v(t, "name of an anchor node must contain at least one character"), t.anchor = t.input.slice(e, t.position), !0;
}
function im(t) {
  var e, i, r;
  if (r = t.input.charCodeAt(t.position), r !== 42)
    return !1;
  for (r = t.input.charCodeAt(++t.position), e = t.position; r !== 0 && !rt(r) && !_e(r); )
    r = t.input.charCodeAt(++t.position);
  return t.position === e && v(t, "name of an alias node must contain at least one character"), i = t.input.slice(e, t.position), Pt.call(t.anchorMap, i) || v(t, 'unidentified alias "' + i + '"'), t.result = t.anchorMap[i], H(t, !0, -1), !0;
}
function Se(t, e, i, r, n) {
  var o, s, a, l = 1, c = !1, h = !1, u, g, d, _, T, w;
  if (t.listener !== null && t.listener("open", t), t.tag = null, t.anchor = null, t.kind = null, t.result = null, o = s = a = Zi === i || Ra === i, r && H(t, !0, -1) && (c = !0, t.lineIndent > e ? l = 1 : t.lineIndent === e ? l = 0 : t.lineIndent < e && (l = -1)), l === 1)
    for (; tm(t) || em(t); )
      H(t, !0, -1) ? (c = !0, a = o, t.lineIndent > e ? l = 1 : t.lineIndent === e ? l = 0 : t.lineIndent < e && (l = -1)) : a = !1;
  if (a && (a = c || n), (l === 1 || Zi === i) && (Ki === i || Na === i ? T = e : T = e + 1, w = t.position - t.lineStart, l === 1 ? a && (ls(t, w) || Qg(t, w, T)) || Zg(t, T) ? h = !0 : (s && Jg(t, T) || Xg(t, T) || Kg(t, T) ? h = !0 : im(t) ? (h = !0, (t.tag !== null || t.anchor !== null) && v(t, "alias node should not have any properties")) : Vg(t, T, Ki === i) && (h = !0, t.tag === null && (t.tag = "?")), t.anchor !== null && (t.anchorMap[t.anchor] = t.result)) : l === 0 && (h = a && ls(t, w))), t.tag === null)
    t.anchor !== null && (t.anchorMap[t.anchor] = t.result);
  else if (t.tag === "?") {
    for (t.result !== null && t.kind !== "scalar" && v(t, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + t.kind + '"'), u = 0, g = t.implicitTypes.length; u < g; u += 1)
      if (_ = t.implicitTypes[u], _.resolve(t.result)) {
        t.result = _.construct(t.result), t.tag = _.tag, t.anchor !== null && (t.anchorMap[t.anchor] = t.result);
        break;
      }
  } else if (t.tag !== "!") {
    if (Pt.call(t.typeMap[t.kind || "fallback"], t.tag))
      _ = t.typeMap[t.kind || "fallback"][t.tag];
    else
      for (_ = null, d = t.typeMap.multi[t.kind || "fallback"], u = 0, g = d.length; u < g; u += 1)
        if (t.tag.slice(0, d[u].tag.length) === d[u].tag) {
          _ = d[u];
          break;
        }
    _ || v(t, "unknown tag !<" + t.tag + ">"), t.result !== null && _.kind !== t.kind && v(t, "unacceptable node kind for !<" + t.tag + '> tag; it should be "' + _.kind + '", not "' + t.kind + '"'), _.resolve(t.result, t.tag) ? (t.result = _.construct(t.result, t.tag), t.anchor !== null && (t.anchorMap[t.anchor] = t.result)) : v(t, "cannot resolve a node with !<" + t.tag + "> explicit tag");
  }
  return t.listener !== null && t.listener("close", t), t.tag !== null || t.anchor !== null || h;
}
function rm(t) {
  var e = t.position, i, r, n, o = !1, s;
  for (t.version = null, t.checkLineBreaks = t.legacy, t.tagMap = /* @__PURE__ */ Object.create(null), t.anchorMap = /* @__PURE__ */ Object.create(null); (s = t.input.charCodeAt(t.position)) !== 0 && (H(t, !0, -1), s = t.input.charCodeAt(t.position), !(t.lineIndent > 0 || s !== 37)); ) {
    for (o = !0, s = t.input.charCodeAt(++t.position), i = t.position; s !== 0 && !rt(s); )
      s = t.input.charCodeAt(++t.position);
    for (r = t.input.slice(i, t.position), n = [], r.length < 1 && v(t, "directive name must not be less than one character in length"); s !== 0; ) {
      for (; Zt(s); )
        s = t.input.charCodeAt(++t.position);
      if (s === 35) {
        do
          s = t.input.charCodeAt(++t.position);
        while (s !== 0 && !xt(s));
        break;
      }
      if (xt(s))
        break;
      for (i = t.position; s !== 0 && !rt(s); )
        s = t.input.charCodeAt(++t.position);
      n.push(t.input.slice(i, t.position));
    }
    s !== 0 && Hn(t), Pt.call(ss, r) ? ss[r](t, r, n) : Ji(t, 'unknown document directive "' + r + '"');
  }
  if (H(t, !0, -1), t.lineIndent === 0 && t.input.charCodeAt(t.position) === 45 && t.input.charCodeAt(t.position + 1) === 45 && t.input.charCodeAt(t.position + 2) === 45 ? (t.position += 3, H(t, !0, -1)) : o && v(t, "directives end mark is expected"), Se(t, t.lineIndent - 1, Zi, !1, !0), H(t, !0, -1), t.checkLineBreaks && Wg.test(t.input.slice(e, t.position)) && Ji(t, "non-ASCII line breaks are interpreted as content"), t.documents.push(t.result), t.position === t.lineStart && _r(t)) {
    t.input.charCodeAt(t.position) === 46 && (t.position += 3, H(t, !0, -1));
    return;
  }
  if (t.position < t.length - 1)
    v(t, "end of the stream or a document separator is expected");
  else
    return;
}
function ja(t, e) {
  t = String(t), e = e || {}, t.length !== 0 && (t.charCodeAt(t.length - 1) !== 10 && t.charCodeAt(t.length - 1) !== 13 && (t += `
`), t.charCodeAt(0) === 65279 && (t = t.slice(1)));
  var i = new Gg(t, e), r = t.indexOf("\0");
  for (r !== -1 && (i.position = r, v(i, "null byte is not allowed in input")), i.input += "\0"; i.input.charCodeAt(i.position) === 32; )
    i.lineIndent += 1, i.position += 1;
  for (; i.position < i.length - 1; )
    rm(i);
  return i.documents;
}
function nm(t, e, i) {
  e !== null && typeof e == "object" && typeof i > "u" && (i = e, e = null);
  var r = ja(t, i);
  if (typeof e != "function")
    return r;
  for (var n = 0, o = r.length; n < o; n += 1)
    e(r[n]);
}
function om(t, e) {
  var i = ja(t, e);
  if (i.length !== 0) {
    if (i.length === 1)
      return i[0];
    throw new Bt("expected a single document in the stream, but found more");
  }
}
var sm = nm, am = om, lm = {
  loadAll: sm,
  load: am
}, cm = $a, hm = lm.load;
const Ua = /^-{3}\s*[\n\r](.*?)[\n\r]-{3}\s*[\n\r]+/s;
function um(t, e) {
  var r, n;
  const i = t.match(Ua);
  if (i) {
    const o = hm(i[1], {
      // To keep things simple, only allow strings, arrays, and plain objects.
      // https://www.yaml.org/spec/1.2/spec.html#id2802346
      schema: cm
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
}, K = pn, Ze = Object.freeze(xp);
let et = K({}, Ze), Ya, ve = [], qe = K({}, Ze);
const yr = (t, e) => {
  let i = K({}, t), r = {};
  for (const n of e)
    Va(n), r = K(r, n);
  if (i = K(i, r), r.theme && r.theme in Lt) {
    const n = K({}, Ya), o = K(
      n.themeVariables || {},
      r.themeVariables
    );
    i.theme && i.theme in Lt && (i.themeVariables = Lt[i.theme].getThemeVariables(o));
  }
  return qe = i, Za(qe), qe;
}, fm = (t) => (et = K({}, Ze), et = K(et, t), t.theme && Lt[t.theme] && (et.themeVariables = Lt[t.theme].getThemeVariables(t.themeVariables)), yr(et, ve), et), dm = (t) => {
  Ya = K({}, t);
}, pm = (t) => (et = K(et, t), yr(et, ve), et), Ga = () => K({}, et), gm = (t) => (Za(t), K(qe, t), Ft()), Ft = () => K({}, qe), Va = (t) => {
  ["secure", ...et.secure ?? []].forEach((e) => {
    t[e] !== void 0 && (x.debug(`Denied attempt to modify a secure key ${e}`, t[e]), delete t[e]);
  }), Object.keys(t).forEach((e) => {
    e.indexOf("__") === 0 && delete t[e];
  }), Object.keys(t).forEach((e) => {
    typeof t[e] == "string" && (t[e].includes("<") || t[e].includes(">") || t[e].includes("url(data:")) && delete t[e], typeof t[e] == "object" && Va(t[e]);
  });
}, Xa = (t) => {
  t.fontFamily && (t.themeVariables ? t.themeVariables.fontFamily || (t.themeVariables = { fontFamily: t.fontFamily }) : t.themeVariables = { fontFamily: t.fontFamily }), ve.push(t), yr(et, ve);
}, Qi = (t = et) => {
  ve = [], yr(t, ve);
};
var Ka = /* @__PURE__ */ ((t) => (t.LAZY_LOAD_DEPRECATED = "The configuration options lazyLoadedDiagrams and loadExternalDiagramsAtStartup are deprecated. Please use registerExternalDiagrams instead.", t))(Ka || {});
const cs = {}, mm = (t) => {
  cs[t] || (x.warn(Ka[t]), cs[t] = !0);
}, Za = (t) => {
  t && (t.lazyLoadedDiagrams || t.loadExternalDiagramsAtStartup) && mm("LAZY_LOAD_DEPRECATED");
}, _m = function(t, e) {
  for (let i of e)
    t.attr(i[0], i[1]);
}, ym = function(t, e, i) {
  let r = /* @__PURE__ */ new Map();
  return i ? (r.set("width", "100%"), r.set("style", `max-width: ${e}px;`)) : (r.set("height", t), r.set("width", e)), r;
}, Cm = function(t, e, i, r) {
  const n = ym(e, i, r);
  _m(t, n);
}, bm = function(t, e, i, r) {
  const n = e.node().getBBox(), o = n.width, s = n.height;
  x.info(`SVG bounds: ${o}x${s}`, n);
  let a = 0, l = 0;
  x.info(`Graph bounds: ${a}x${l}`, t), a = o + i * 2, l = s + i * 2, x.info(`Calculated bounds: ${a}x${l}`), Cm(e, l, a, r);
  const c = `${n.x - i} ${n.y - i} ${n.width + 2 * i} ${n.height + 2 * i}`;
  e.attr("viewBox", c);
}, Oi = {}, xm = (t, e, i) => {
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
}, Tm = (t, e) => {
  Oi[t] = e;
}, Sm = xm;
let jn = "", Cr = "", Un = "";
const Yn = (t) => Xe(t, Ft()), Ja = function() {
  jn = "", Un = "", Cr = "";
}, Qa = function(t) {
  jn = Yn(t).replace(/^\s+/g, "");
}, tl = function() {
  return jn || Cr;
}, el = function(t) {
  Un = Yn(t).replace(/\n\s+/g, `
`);
}, il = function() {
  return Un;
}, rl = function(t) {
  Cr = Yn(t);
}, nl = function() {
  return Cr;
}, vm = {
  getAccTitle: tl,
  setAccTitle: Qa,
  getDiagramTitle: nl,
  setDiagramTitle: rl,
  getAccDescription: il,
  setAccDescription: el,
  clear: Ja
}, km = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  clear: Ja,
  default: vm,
  getAccDescription: il,
  getAccTitle: tl,
  getDiagramTitle: nl,
  setAccDescription: el,
  setAccTitle: Qa,
  setDiagramTitle: rl
}, Symbol.toStringTag, { value: "Module" }));
let Yt = {};
const ol = function(t, e, i, r) {
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
          wm(t, Yt, r), Yt = void 0;
          break;
      }
  } catch (n) {
    x.error(
      `Error while rendering sequenceDiagram directive: ${e} jison context: ${i}`
    ), x.error(n.message);
  }
}, wm = function(t, e, i) {
  switch (x.info(`Directive type=${e.type} with args:`, e.args), e.type) {
    case "init":
    case "initialize": {
      ["config"].forEach((r) => {
        e.args[r] !== void 0 && (i === "flowchart-v2" && (i = "flowchart"), e.args[i] = e.args[r], delete e.args[r]);
      }), x.info("sanitize in handleDirective", e.args), we(e.args), x.info("sanitize in handleDirective (done)", e.args), Xa(e.args);
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
}, Bm = x, Lm = wn, sl = Ft, Am = (t) => Xe(t, sl()), Em = bm, Fm = () => km, Mm = (t, e, i, r) => ol(t, e, i, r), tr = {}, er = (t, e, i) => {
  if (tr[t])
    throw new Error(`Diagram ${t} already registered.`);
  tr[t] = e, i && cl(t, i), Tm(t, e.styles), e.injectUtils && e.injectUtils(
    Bm,
    Lm,
    sl,
    Am,
    Em,
    Fm(),
    Mm
  );
}, Gn = (t) => {
  if (t in tr)
    return tr[t];
  throw new Error(`Diagram ${t} not found.`);
};
class al extends Error {
  constructor(e) {
    super(e), this.name = "UnknownDiagramError";
  }
}
const Om = /%{2}{\s*(?:(\w+)\s*:|(\w+))\s*(?:(\w+)|((?:(?!}%{2}).|\r?\n)*))?\s*(?:}%{2})?/gi, $m = /\s*%%.*\n/gm, ke = {}, br = function(t, e) {
  t = t.replace(Ua, "").replace(Om, "").replace($m, `
`);
  for (const [i, { detector: r }] of Object.entries(ke))
    if (r(t, e))
      return i;
  throw new al(
    `No diagram type detected matching given configuration for text: ${t}`
  );
}, ll = (...t) => {
  for (const { id: e, detector: i, loader: r } of t)
    cl(e, i, r);
}, Im = async () => {
  x.debug("Loading registered diagrams");
  const e = (await Promise.allSettled(
    Object.entries(ke).map(async ([i, { detector: r, loader: n }]) => {
      if (n)
        try {
          Gn(i);
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
}, cl = (t, e, i) => {
  ke[t] ? x.error(`Detector with key ${t} already exists`) : ke[t] = { detector: e, loader: i }, x.debug(`Detector with key ${t} added${i ? " with loader" : ""}`);
}, Dm = (t) => ke[t].loader;
var Nm = typeof global == "object" && global && global.Object === Object && global;
const hl = Nm;
var Rm = typeof self == "object" && self && self.Object === Object && self, zm = hl || Rm || Function("return this")();
const Wt = zm;
var Pm = Wt.Symbol;
const ir = Pm;
var ul = Object.prototype, Wm = ul.hasOwnProperty, Hm = ul.toString, De = ir ? ir.toStringTag : void 0;
function qm(t) {
  var e = Wm.call(t, De), i = t[De];
  try {
    t[De] = void 0;
    var r = !0;
  } catch {
  }
  var n = Hm.call(t);
  return r && (e ? t[De] = i : delete t[De]), n;
}
var jm = Object.prototype, Um = jm.toString;
function Ym(t) {
  return Um.call(t);
}
var Gm = "[object Null]", Vm = "[object Undefined]", hs = ir ? ir.toStringTag : void 0;
function ri(t) {
  return t == null ? t === void 0 ? Vm : Gm : hs && hs in Object(t) ? qm(t) : Ym(t);
}
function fl(t) {
  var e = typeof t;
  return t != null && (e == "object" || e == "function");
}
var Xm = "[object AsyncFunction]", Km = "[object Function]", Zm = "[object GeneratorFunction]", Jm = "[object Proxy]";
function dl(t) {
  if (!fl(t))
    return !1;
  var e = ri(t);
  return e == Km || e == Zm || e == Xm || e == Jm;
}
var Qm = Wt["__core-js_shared__"];
const Zr = Qm;
var us = function() {
  var t = /[^.]+$/.exec(Zr && Zr.keys && Zr.keys.IE_PROTO || "");
  return t ? "Symbol(src)_1." + t : "";
}();
function t0(t) {
  return !!us && us in t;
}
var e0 = Function.prototype, i0 = e0.toString;
function ie(t) {
  if (t != null) {
    try {
      return i0.call(t);
    } catch {
    }
    try {
      return t + "";
    } catch {
    }
  }
  return "";
}
var r0 = /[\\^$.*+?()[\]{}|]/g, n0 = /^\[object .+?Constructor\]$/, o0 = Function.prototype, s0 = Object.prototype, a0 = o0.toString, l0 = s0.hasOwnProperty, c0 = RegExp(
  "^" + a0.call(l0).replace(r0, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function h0(t) {
  if (!fl(t) || t0(t))
    return !1;
  var e = dl(t) ? c0 : n0;
  return e.test(ie(t));
}
function u0(t, e) {
  return t == null ? void 0 : t[e];
}
function Le(t, e) {
  var i = u0(t, e);
  return h0(i) ? i : void 0;
}
var f0 = Le(Object, "create");
const Je = f0;
function d0() {
  this.__data__ = Je ? Je(null) : {}, this.size = 0;
}
function p0(t) {
  var e = this.has(t) && delete this.__data__[t];
  return this.size -= e ? 1 : 0, e;
}
var g0 = "__lodash_hash_undefined__", m0 = Object.prototype, _0 = m0.hasOwnProperty;
function y0(t) {
  var e = this.__data__;
  if (Je) {
    var i = e[t];
    return i === g0 ? void 0 : i;
  }
  return _0.call(e, t) ? e[t] : void 0;
}
var C0 = Object.prototype, b0 = C0.hasOwnProperty;
function x0(t) {
  var e = this.__data__;
  return Je ? e[t] !== void 0 : b0.call(e, t);
}
var T0 = "__lodash_hash_undefined__";
function S0(t, e) {
  var i = this.__data__;
  return this.size += this.has(t) ? 0 : 1, i[t] = Je && e === void 0 ? T0 : e, this;
}
function te(t) {
  var e = -1, i = t == null ? 0 : t.length;
  for (this.clear(); ++e < i; ) {
    var r = t[e];
    this.set(r[0], r[1]);
  }
}
te.prototype.clear = d0;
te.prototype.delete = p0;
te.prototype.get = y0;
te.prototype.has = x0;
te.prototype.set = S0;
function v0() {
  this.__data__ = [], this.size = 0;
}
function k0(t, e) {
  return t === e || t !== t && e !== e;
}
function xr(t, e) {
  for (var i = t.length; i--; )
    if (k0(t[i][0], e))
      return i;
  return -1;
}
var w0 = Array.prototype, B0 = w0.splice;
function L0(t) {
  var e = this.__data__, i = xr(e, t);
  if (i < 0)
    return !1;
  var r = e.length - 1;
  return i == r ? e.pop() : B0.call(e, i, 1), --this.size, !0;
}
function A0(t) {
  var e = this.__data__, i = xr(e, t);
  return i < 0 ? void 0 : e[i][1];
}
function E0(t) {
  return xr(this.__data__, t) > -1;
}
function F0(t, e) {
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
Ae.prototype.clear = v0;
Ae.prototype.delete = L0;
Ae.prototype.get = A0;
Ae.prototype.has = E0;
Ae.prototype.set = F0;
var M0 = Le(Wt, "Map");
const rr = M0;
function O0() {
  this.size = 0, this.__data__ = {
    hash: new te(),
    map: new (rr || Ae)(),
    string: new te()
  };
}
function $0(t) {
  var e = typeof t;
  return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? t !== "__proto__" : t === null;
}
function Tr(t, e) {
  var i = t.__data__;
  return $0(e) ? i[typeof e == "string" ? "string" : "hash"] : i.map;
}
function I0(t) {
  var e = Tr(this, t).delete(t);
  return this.size -= e ? 1 : 0, e;
}
function D0(t) {
  return Tr(this, t).get(t);
}
function N0(t) {
  return Tr(this, t).has(t);
}
function R0(t, e) {
  var i = Tr(this, t), r = i.size;
  return i.set(t, e), this.size += i.size == r ? 0 : 1, this;
}
function re(t) {
  var e = -1, i = t == null ? 0 : t.length;
  for (this.clear(); ++e < i; ) {
    var r = t[e];
    this.set(r[0], r[1]);
  }
}
re.prototype.clear = O0;
re.prototype.delete = I0;
re.prototype.get = D0;
re.prototype.has = N0;
re.prototype.set = R0;
var z0 = "Expected a function";
function ni(t, e) {
  if (typeof t != "function" || e != null && typeof e != "function")
    throw new TypeError(z0);
  var i = function() {
    var r = arguments, n = e ? e.apply(this, r) : r[0], o = i.cache;
    if (o.has(n))
      return o.get(n);
    var s = t.apply(this, r);
    return i.cache = o.set(n, s) || o, s;
  };
  return i.cache = new (ni.Cache || re)(), i;
}
ni.Cache = re;
const P0 = {
  curveBasis: Zf,
  curveBasisClosed: Jf,
  curveBasisOpen: Qf,
  curveBumpX: Xf,
  curveBumpY: Kf,
  curveBundle: td,
  curveCardinalClosed: id,
  curveCardinalOpen: rd,
  curveCardinal: ed,
  curveCatmullRomClosed: od,
  curveCatmullRomOpen: sd,
  curveCatmullRom: nd,
  curveLinear: Vf,
  curveLinearClosed: ad,
  curveMonotoneX: ld,
  curveMonotoneY: cd,
  curveNatural: hd,
  curveStep: ud,
  curveStepAfter: dd,
  curveStepBefore: fd
}, Jr = /%{2}{\s*(?:(\w+)\s*:|(\w+))\s*(?:(\w+)|((?:(?!}%{2}).|\r?\n)*))?\s*(?:}%{2})?/gi, W0 = /\s*(?:(\w+)(?=:):|(\w+))\s*(?:(\w+)|((?:(?!}%{2}).|\r?\n)*))?\s*(?:}%{2})?/gi, H0 = function(t, e) {
  const i = pl(t, /(?:init\b)|(?:initialize\b)/);
  let r = {};
  if (Array.isArray(i)) {
    const n = i.map((o) => o.args);
    we(n), r = K(r, [...n]);
  } else
    r = i.args;
  if (r) {
    let n = br(t, e);
    ["config"].forEach((o) => {
      r[o] !== void 0 && (n === "flowchart-v2" && (n = "flowchart"), r[n] = r[o], delete r[o]);
    });
  }
  return r;
}, pl = function(t, e = null) {
  try {
    const i = new RegExp(
      `[%]{2}(?![{]${W0.source})(?=[}][%]{2}).*
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
}, q0 = function(t, e) {
  for (const [i, r] of e.entries())
    if (r.match(t))
      return i;
  return -1;
};
function j0(t, e) {
  if (!t)
    return e;
  const i = `curve${t.charAt(0).toUpperCase() + t.slice(1)}`;
  return P0[i] || e;
}
function U0(t, e) {
  const i = t.trim();
  if (i)
    return e.securityLevel !== "loose" ? Is(i) : i;
}
const Y0 = (t, ...e) => {
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
function G0(t) {
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
function V0(t) {
  return t.length === 1 ? t[0] : G0(t);
}
const X0 = (t, e, i) => {
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
function K0(t, e, i) {
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
function Z0(t) {
  let e = "", i = "";
  for (const r of t)
    r !== void 0 && (r.startsWith("color:") || r.startsWith("text-align:") ? i = i + r + ";" : e = e + r + ";");
  return { style: e, labelStyle: i };
}
let fs = 0;
const J0 = () => (fs++, "id-" + Math.random().toString(36).substr(2, 12) + "-" + fs);
function Q0(t) {
  let e = "";
  const i = "0123456789abcdef", r = i.length;
  for (let n = 0; n < t; n++)
    e += i.charAt(Math.floor(Math.random() * r));
  return e;
}
const t_ = (t) => Q0(t.length), e_ = function() {
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
}, i_ = function(t, e) {
  const i = e.text.replace(Pn.lineBreakRegex, " "), [, r] = Xn(e.fontSize), n = t.append("text");
  n.attr("x", e.x), n.attr("y", e.y), n.style("text-anchor", e.anchor), n.style("font-family", e.fontFamily), n.style("font-size", r), n.style("font-weight", e.fontWeight), n.attr("fill", e.fill), e.class !== void 0 && n.attr("class", e.class);
  const o = n.append("tspan");
  return o.attr("x", e.x + e.textMargin * 2), o.attr("fill", e.fill), o.text(i), n;
}, r_ = ni(
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
        const { hyphenatedStrings: g, remainingWord: d } = n_(s, e, "-", i);
        n.push(o, ...g), o = d;
      } else
        c + l >= e ? (n.push(o), o = s) : o = [o, s].filter(Boolean).join(" ");
      a + 1 === r.length && n.push(o);
    }), n.filter((s) => s !== "").join(i.joinWith);
  },
  (t, e, i) => `${t}${e}${i.fontSize}${i.fontWeight}${i.fontFamily}${i.joinWith}`
), n_ = ni(
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
function o_(t, e) {
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
    const [, o] = Xn(i), s = ["sans-serif", r], a = t.split(Pn.lineBreakRegex), l = [], c = Ct("body");
    if (!c.remove)
      return { width: 0, height: 0, lineHeight: 0 };
    const h = c.append("svg");
    for (const g of s) {
      let d = 0;
      const _ = { width: 0, height: 0, lineHeight: 0 };
      for (const T of a) {
        const w = e_();
        w.text = T;
        const A = i_(h, w).style("font-size", o).style("font-weight", n).style("font-family", g), C = (A._groups || A)[0][0].getBBox();
        if (C.width === 0 && C.height === 0)
          throw new Error("svg element not in render tree");
        _.width = Math.round(Math.max(_.width, C.width)), d = Math.round(C.height), _.height += d, _.lineHeight = Math.round(Math.max(_.lineHeight, d));
      }
      l.push(_);
    }
    h.remove();
    const u = isNaN(l[1].height) || isNaN(l[1].width) || isNaN(l[1].lineHeight) || l[0].height > l[1].height && l[0].width > l[1].width && l[0].lineHeight > l[1].lineHeight ? 0 : 1;
    return l[u];
  },
  (t, e) => `${t}${e.fontSize}${e.fontWeight}${e.fontFamily}`
), s_ = class {
  constructor(e, i) {
    this.deterministic = e, this.seed = i, this.count = i ? i.length : 0;
  }
  next() {
    return this.deterministic ? this.count++ : Date.now();
  }
};
let Si;
const a_ = function(t) {
  return Si = Si || document.createElement("div"), t = escape(t).replace(/%26/g, "&").replace(/%23/g, "#").replace(/%3B/g, ";"), Si.innerHTML = t, unescape(Si.textContent);
}, we = (t) => {
  if (x.debug("directiveSanitizer called with", t), typeof t == "object" && (t.length ? t.forEach((e) => we(e)) : Object.keys(t).forEach((e) => {
    x.debug("Checking key", e), e.startsWith("__") && (x.debug("sanitize deleting __ option", e), delete t[e]), e.includes("proto") && (x.debug("sanitize deleting proto option", e), delete t[e]), e.includes("constr") && (x.debug("sanitize deleting constr option", e), delete t[e]), e.includes("themeCSS") && (x.debug("sanitizing themeCss option"), t[e] = $i(t[e])), e.includes("fontFamily") && (x.debug("sanitizing fontFamily option"), t[e] = $i(t[e])), e.includes("altFontFamily") && (x.debug("sanitizing altFontFamily option"), t[e] = $i(t[e])), bp.includes(e) ? typeof t[e] == "object" && (x.debug("sanitize deleting object", e), we(t[e])) : (x.debug("sanitize deleting option", e), delete t[e]);
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
function gl(t) {
  return "str" in t;
}
function l_(t) {
  return t instanceof Error ? t.message : String(t);
}
const c_ = (t, e, i, r) => {
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
  assignWithDepth: K,
  wrapLabel: r_,
  calculateTextHeight: o_,
  calculateTextWidth: or,
  calculateTextDimensions: Vn,
  detectInit: H0,
  detectDirective: pl,
  isSubstringInArray: q0,
  interpolateToCurve: j0,
  calcLabelPosition: V0,
  calcCardinalityPosition: X0,
  calcTerminalLabelPosition: K0,
  formatUrl: U0,
  getStylesFromArray: Z0,
  generateId: J0,
  random: t_,
  runFunc: Y0,
  entityDecode: a_,
  initIdGenerator: s_,
  directiveSanitizer: we,
  sanitizeCss: $i,
  insertTitle: c_,
  parseFontSize: Xn
};
var ml = "comm", _l = "rule", yl = "decl", h_ = "@import", u_ = "@keyframes", f_ = Math.abs, Kn = String.fromCharCode;
function Cl(t) {
  return t.trim();
}
function gn(t, e, i) {
  return t.replace(e, i);
}
function d_(t, e) {
  return t.indexOf(e);
}
function Qe(t, e) {
  return t.charCodeAt(e) | 0;
}
function ti(t, e, i) {
  return t.slice(e, i);
}
function Dt(t) {
  return t.length;
}
function bl(t) {
  return t.length;
}
function vi(t, e) {
  return e.push(t), t;
}
var Sr = 1, Be = 1, xl = 0, ut = 0, W = 0, Ee = "";
function Zn(t, e, i, r, n, o, s) {
  return { value: t, root: e, parent: i, type: r, props: n, children: o, line: Sr, column: Be, length: s, return: "" };
}
function p_() {
  return W;
}
function g_() {
  return W = ut > 0 ? Qe(Ee, --ut) : 0, Be--, W === 10 && (Be = 1, Sr--), W;
}
function gt() {
  return W = ut < xl ? Qe(Ee, ut++) : 0, Be++, W === 10 && (Be = 1, Sr++), W;
}
function Jt() {
  return Qe(Ee, ut);
}
function Di() {
  return ut;
}
function vr(t, e) {
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
function m_(t) {
  return Sr = Be = 1, xl = Dt(Ee = t), ut = 0, [];
}
function __(t) {
  return Ee = "", t;
}
function Qr(t) {
  return Cl(vr(ut - 1, _n(t === 91 ? t + 2 : t === 40 ? t + 1 : t)));
}
function y_(t) {
  for (; (W = Jt()) && W < 33; )
    gt();
  return mn(t) > 2 || mn(W) > 3 ? "" : " ";
}
function C_(t, e) {
  for (; --e && gt() && !(W < 48 || W > 102 || W > 57 && W < 65 || W > 70 && W < 97); )
    ;
  return vr(t, Di() + (e < 6 && Jt() == 32 && gt() == 32));
}
function _n(t) {
  for (; gt(); )
    switch (W) {
      case t:
        return ut;
      case 34:
      case 39:
        t !== 34 && t !== 39 && _n(W);
        break;
      case 40:
        t === 41 && _n(t);
        break;
      case 92:
        gt();
        break;
    }
  return ut;
}
function b_(t, e) {
  for (; gt() && t + W !== 47 + 10; )
    if (t + W === 42 + 42 && Jt() === 47)
      break;
  return "/*" + vr(e, ut - 1) + "*" + Kn(t === 47 ? t : gt());
}
function x_(t) {
  for (; !mn(Jt()); )
    gt();
  return vr(t, ut);
}
function T_(t) {
  return __(Ni("", null, null, null, [""], t = m_(t), 0, [0], t));
}
function Ni(t, e, i, r, n, o, s, a, l) {
  for (var c = 0, h = 0, u = s, g = 0, d = 0, _ = 0, T = 1, w = 1, A = 1, C = 0, B = "", D = n, R = o, V = r, O = B; w; )
    switch (_ = C, C = gt()) {
      case 40:
        if (_ != 108 && Qe(O, u - 1) == 58) {
          d_(O += gn(Qr(C), "&", "&\f"), "&\f") != -1 && (A = -1);
          break;
        }
      case 34:
      case 39:
      case 91:
        O += Qr(C);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        O += y_(_);
        break;
      case 92:
        O += C_(Di() - 1, 7);
        continue;
      case 47:
        switch (Jt()) {
          case 42:
          case 47:
            vi(S_(b_(gt(), Di()), e, i), l);
            break;
          default:
            O += "/";
        }
        break;
      case 123 * T:
        a[c++] = Dt(O) * A;
      case 125 * T:
      case 59:
      case 0:
        switch (C) {
          case 0:
          case 125:
            w = 0;
          case 59 + h:
            d > 0 && Dt(O) - u && vi(d > 32 ? ps(O + ";", r, i, u - 1) : ps(gn(O, " ", "") + ";", r, i, u - 2), l);
            break;
          case 59:
            O += ";";
          default:
            if (vi(V = ds(O, e, i, c, h, n, a, B, D = [], R = [], u), o), C === 123)
              if (h === 0)
                Ni(O, e, V, V, D, o, u, a, R);
              else
                switch (g === 99 && Qe(O, 3) === 110 ? 100 : g) {
                  case 100:
                  case 109:
                  case 115:
                    Ni(t, V, V, r && vi(ds(t, V, V, 0, 0, n, a, B, n, D = [], u), R), n, R, u, a, r ? D : R);
                    break;
                  default:
                    Ni(O, V, V, V, [""], R, 0, a, R);
                }
        }
        c = h = d = 0, T = A = 1, B = O = "", u = s;
        break;
      case 58:
        u = 1 + Dt(O), d = _;
      default:
        if (T < 1) {
          if (C == 123)
            --T;
          else if (C == 125 && T++ == 0 && g_() == 125)
            continue;
        }
        switch (O += Kn(C), C * T) {
          case 38:
            A = h > 0 ? 1 : (O += "\f", -1);
            break;
          case 44:
            a[c++] = (Dt(O) - 1) * A, A = 1;
            break;
          case 64:
            Jt() === 45 && (O += Qr(gt())), g = Jt(), h = u = Dt(B = O += x_(Di())), C++;
            break;
          case 45:
            _ === 45 && Dt(O) == 2 && (T = 0);
        }
    }
  return o;
}
function ds(t, e, i, r, n, o, s, a, l, c, h) {
  for (var u = n - 1, g = n === 0 ? o : [""], d = bl(g), _ = 0, T = 0, w = 0; _ < r; ++_)
    for (var A = 0, C = ti(t, u + 1, u = f_(T = s[_])), B = t; A < d; ++A)
      (B = Cl(T > 0 ? g[A] + " " + C : gn(C, /&\f/g, g[A]))) && (l[w++] = B);
  return Zn(t, e, i, n === 0 ? _l : a, l, c, h);
}
function S_(t, e, i) {
  return Zn(t, e, i, ml, Kn(p_()), ti(t, 2, -2), 0);
}
function ps(t, e, i, r) {
  return Zn(t, e, i, yl, ti(t, 0, r), ti(t, r + 1, -1), r);
}
function yn(t, e) {
  for (var i = "", r = bl(t), n = 0; n < r; n++)
    i += e(t[n], n, t, e) || "";
  return i;
}
function v_(t, e, i, r) {
  switch (t.type) {
    case h_:
    case yl:
      return t.return = t.return || t.value;
    case ml:
      return "";
    case u_:
      return t.return = t.value + "{" + yn(t.children, r) + "}";
    case _l:
      t.value = t.props.join(",");
  }
  return Dt(i = yn(t.children, r)) ? t.return = t.value + "{" + i + "}" : "";
}
const gs = "10.2.0-rc.3", Tl = "c4", k_ = (t) => t.match(/^\s*C4Context|C4Container|C4Component|C4Dynamic|C4Deployment/) !== null, w_ = async () => {
  const { diagram: t } = await import("./c4Diagram-e568b41d.js");
  return { id: Tl, diagram: t };
}, B_ = {
  id: Tl,
  detector: k_,
  loader: w_
}, L_ = B_, Sl = "flowchart", A_ = (t, e) => {
  var i, r;
  return ((i = e == null ? void 0 : e.flowchart) == null ? void 0 : i.defaultRenderer) === "dagre-wrapper" || ((r = e == null ? void 0 : e.flowchart) == null ? void 0 : r.defaultRenderer) === "elk" ? !1 : t.match(/^\s*graph/) !== null;
}, E_ = async () => {
  const { diagram: t } = await import("./flowDiagram-ad04da68.js");
  return { id: Sl, diagram: t };
}, F_ = {
  id: Sl,
  detector: A_,
  loader: E_
}, M_ = F_, vl = "flowchart-v2", O_ = (t, e) => {
  var i, r, n;
  return ((i = e == null ? void 0 : e.flowchart) == null ? void 0 : i.defaultRenderer) === "dagre-d3" || ((r = e == null ? void 0 : e.flowchart) == null ? void 0 : r.defaultRenderer) === "elk" ? !1 : t.match(/^\s*graph/) !== null && ((n = e == null ? void 0 : e.flowchart) == null ? void 0 : n.defaultRenderer) === "dagre-wrapper" ? !0 : t.match(/^\s*flowchart/) !== null;
}, $_ = async () => {
  const { diagram: t } = await import("./flowDiagram-v2-b9434384.js");
  return { id: vl, diagram: t };
}, I_ = {
  id: vl,
  detector: O_,
  loader: $_
}, D_ = I_, kl = "er", N_ = (t) => t.match(/^\s*erDiagram/) !== null, R_ = async () => {
  const { diagram: t } = await import("./erDiagram-3de52517.js");
  return { id: kl, diagram: t };
}, z_ = {
  id: kl,
  detector: N_,
  loader: R_
}, P_ = z_, wl = "gitGraph", W_ = (t) => t.match(/^\s*gitGraph/) !== null, H_ = async () => {
  const { diagram: t } = await import("./gitGraphDiagram-f3f3a472.js");
  return { id: wl, diagram: t };
}, q_ = {
  id: wl,
  detector: W_,
  loader: H_
}, j_ = q_, Bl = "gantt", U_ = (t) => t.match(/^\s*gantt/) !== null, Y_ = async () => {
  const { diagram: t } = await import("./ganttDiagram-4938cfd4.js");
  return { id: Bl, diagram: t };
}, G_ = {
  id: Bl,
  detector: U_,
  loader: Y_
}, V_ = G_, Ll = "info", X_ = (t) => t.match(/^\s*info/) !== null, K_ = async () => {
  const { diagram: t } = await import("./infoDiagram-1cb5f8c7.js");
  return { id: Ll, diagram: t };
}, Z_ = {
  id: Ll,
  detector: X_,
  loader: K_
}, J_ = Z_, Al = "pie", Q_ = (t) => t.match(/^\s*pie/) !== null, ty = async () => {
  const { diagram: t } = await import("./pieDiagram-d1a63084.js");
  return { id: Al, diagram: t };
}, ey = {
  id: Al,
  detector: Q_,
  loader: ty
}, iy = ey, El = "requirement", ry = (t) => t.match(/^\s*requirement(Diagram)?/) !== null, ny = async () => {
  const { diagram: t } = await import("./requirementDiagram-80140b7d.js");
  return { id: El, diagram: t };
}, oy = {
  id: El,
  detector: ry,
  loader: ny
}, sy = oy, Fl = "sequence", ay = (t) => t.match(/^\s*sequenceDiagram/) !== null, ly = async () => {
  const { diagram: t } = await import("./sequenceDiagram-3f591a21.js");
  return { id: Fl, diagram: t };
}, cy = {
  id: Fl,
  detector: ay,
  loader: ly
}, hy = cy, Ml = "class", uy = (t, e) => {
  var i;
  return ((i = e == null ? void 0 : e.class) == null ? void 0 : i.defaultRenderer) === "dagre-wrapper" ? !1 : t.match(/^\s*classDiagram/) !== null;
}, fy = async () => {
  const { diagram: t } = await import("./classDiagram-f1f1b369.js");
  return { id: Ml, diagram: t };
}, dy = {
  id: Ml,
  detector: uy,
  loader: fy
}, py = dy, Ol = "classDiagram", gy = (t, e) => {
  var i;
  return t.match(/^\s*classDiagram/) !== null && ((i = e == null ? void 0 : e.class) == null ? void 0 : i.defaultRenderer) === "dagre-wrapper" ? !0 : t.match(/^\s*classDiagram-v2/) !== null;
}, my = async () => {
  const { diagram: t } = await import("./classDiagram-v2-5de3b278.js");
  return { id: Ol, diagram: t };
}, _y = {
  id: Ol,
  detector: gy,
  loader: my
}, yy = _y, $l = "state", Cy = (t, e) => {
  var i;
  return ((i = e == null ? void 0 : e.state) == null ? void 0 : i.defaultRenderer) === "dagre-wrapper" ? !1 : t.match(/^\s*stateDiagram/) !== null;
}, by = async () => {
  const { diagram: t } = await import("./stateDiagram-c26f1369.js");
  return { id: $l, diagram: t };
}, xy = {
  id: $l,
  detector: Cy,
  loader: by
}, Ty = xy, Il = "stateDiagram", Sy = (t, e) => {
  var i, r;
  return !!(t.match(/^\s*stateDiagram-v2/) !== null || t.match(/^\s*stateDiagram/) && ((i = e == null ? void 0 : e.state) == null ? void 0 : i.defaultRenderer) === "dagre-wrapper" || t.match(/^\s*stateDiagram/) && ((r = e == null ? void 0 : e.state) == null ? void 0 : r.defaultRenderer) === "dagre-wrapper");
}, vy = async () => {
  const { diagram: t } = await import("./stateDiagram-v2-2c143c30.js");
  return { id: Il, diagram: t };
}, ky = {
  id: Il,
  detector: Sy,
  loader: vy
}, wy = ky, Dl = "journey", By = (t) => t.match(/^\s*journey/) !== null, Ly = async () => {
  const { diagram: t } = await import("./journeyDiagram-03417da9.js");
  return { id: Dl, diagram: t };
}, Ay = {
  id: Dl,
  detector: By,
  loader: Ly
}, Ey = Ay, Fy = () => "", My = Fy, Oy = function() {
}, $y = (t, e, i) => {
  try {
    x.debug(`Renering svg for syntax error
`);
    const r = Ct("#" + e), n = r.append("g");
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
    x.error("Error while rendering info diagram"), x.error(l_(r));
  }
}, Nl = {
  setConf: Oy,
  draw: $y
}, Iy = {
  db: {
    clear: () => {
    }
  },
  styles: My,
  renderer: Nl,
  parser: {
    parser: { yy: {} },
    parse: () => {
    }
  },
  init: () => {
  }
}, Dy = Iy, Rl = "flowchart-elk", Ny = (t, e) => {
  var i;
  return (
    // If diagram explicitly states flowchart-elk
    !!(t.match(/^\s*flowchart-elk/) || // If a flowchart/graph diagram has their default renderer set to elk
    t.match(/^\s*flowchart|graph/) && ((i = e == null ? void 0 : e.flowchart) == null ? void 0 : i.defaultRenderer) === "elk")
  );
}, Ry = async () => {
  const { diagram: t } = await import("./flowchart-elk-definition-7b721de6.js");
  return { id: Rl, diagram: t };
}, zy = {
  id: Rl,
  detector: Ny,
  loader: Ry
}, Py = zy, zl = "timeline", Wy = (t) => t.match(/^\s*timeline/) !== null, Hy = async () => {
  const { diagram: t } = await import("./timeline-definition-2d5231c9.js");
  return { id: zl, diagram: t };
}, qy = {
  id: zl,
  detector: Wy,
  loader: Hy
}, jy = qy, Pl = "mindmap", Uy = (t) => t.match(/^\s*mindmap/) !== null, Yy = async () => {
  const { diagram: t } = await import("./mindmap-definition-52fa8cdf.js");
  return { id: Pl, diagram: t };
}, Gy = {
  id: Pl,
  detector: Uy,
  loader: Yy
}, Vy = Gy;
let ms = !1;
const Jn = () => {
  ms || (ms = !0, er("error", Dy, (t) => t.toLowerCase().trim() === "error"), er(
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
  ), ll(
    L_,
    yy,
    py,
    P_,
    V_,
    J_,
    iy,
    sy,
    hy,
    Py,
    D_,
    M_,
    Vy,
    jy,
    j_,
    wy,
    Ty,
    Ey
  ));
}, Xy = (t) => t.trimStart().replace(/^\s*%%(?!{)[^\n]+\n?/gm, "");
class Wl {
  constructor(e) {
    var o, s;
    this.text = e, this.type = "graph", this.text += `
`;
    const i = Ft();
    try {
      this.type = br(e, i);
    } catch (a) {
      this.type = "error", this.detectError = a;
    }
    const r = Gn(this.type);
    x.debug("Type " + this.type), this.db = r.db, (s = (o = this.db).clear) == null || s.call(o), this.renderer = r.renderer, this.parser = r.parser;
    const n = this.parser.parse.bind(this.parser);
    this.parser.parse = (a) => n(Xy(um(a, this.db))), this.parser.parser.yy = this.db, r.init && (r.init(i), x.info("Initialized diagram " + this.type, i)), this.parse();
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
  const e = br(t, Ft());
  try {
    Gn(e);
  } catch {
    const r = Dm(e);
    if (!r)
      throw new al(`Diagram ${e} not found.`);
    const { id: n, diagram: o } = await r();
    er(n, o);
  }
  return new Wl(t);
};
let Cn = [];
const ax = (t) => {
  Cn.push(t);
}, Ky = () => {
  Cn.forEach((t) => {
    t();
  }), Cn = [];
};
var Zy = Object.prototype;
function Hl(t) {
  var e = t && t.constructor, i = typeof e == "function" && e.prototype || Zy;
  return t === i;
}
function Jy(t, e) {
  return function(i) {
    return t(e(i));
  };
}
var Qy = Jy(Object.keys, Object);
const tC = Qy;
var eC = Object.prototype, iC = eC.hasOwnProperty;
function rC(t) {
  if (!Hl(t))
    return tC(t);
  var e = [];
  for (var i in Object(t))
    iC.call(t, i) && i != "constructor" && e.push(i);
  return e;
}
var nC = Le(Wt, "DataView");
const bn = nC;
var oC = Le(Wt, "Promise");
const xn = oC;
var sC = Le(Wt, "Set");
const Tn = sC;
var aC = Le(Wt, "WeakMap");
const Sn = aC;
var _s = "[object Map]", lC = "[object Object]", ys = "[object Promise]", Cs = "[object Set]", bs = "[object WeakMap]", xs = "[object DataView]", cC = ie(bn), hC = ie(rr), uC = ie(xn), fC = ie(Tn), dC = ie(Sn), Gt = ri;
(bn && Gt(new bn(new ArrayBuffer(1))) != xs || rr && Gt(new rr()) != _s || xn && Gt(xn.resolve()) != ys || Tn && Gt(new Tn()) != Cs || Sn && Gt(new Sn()) != bs) && (Gt = function(t) {
  var e = ri(t), i = e == lC ? t.constructor : void 0, r = i ? ie(i) : "";
  if (r)
    switch (r) {
      case cC:
        return xs;
      case hC:
        return _s;
      case uC:
        return ys;
      case fC:
        return Cs;
      case dC:
        return bs;
    }
  return e;
});
const pC = Gt;
function to(t) {
  return t != null && typeof t == "object";
}
var gC = "[object Arguments]";
function Ts(t) {
  return to(t) && ri(t) == gC;
}
var ql = Object.prototype, mC = ql.hasOwnProperty, _C = ql.propertyIsEnumerable, yC = Ts(function() {
  return arguments;
}()) ? Ts : function(t) {
  return to(t) && mC.call(t, "callee") && !_C.call(t, "callee");
};
const CC = yC;
var bC = Array.isArray;
const xC = bC;
var TC = 9007199254740991;
function jl(t) {
  return typeof t == "number" && t > -1 && t % 1 == 0 && t <= TC;
}
function SC(t) {
  return t != null && jl(t.length) && !dl(t);
}
function vC() {
  return !1;
}
var Ul = typeof exports == "object" && exports && !exports.nodeType && exports, Ss = Ul && typeof module == "object" && module && !module.nodeType && module, kC = Ss && Ss.exports === Ul, vs = kC ? Wt.Buffer : void 0, wC = vs ? vs.isBuffer : void 0, BC = wC || vC;
const LC = BC;
var AC = "[object Arguments]", EC = "[object Array]", FC = "[object Boolean]", MC = "[object Date]", OC = "[object Error]", $C = "[object Function]", IC = "[object Map]", DC = "[object Number]", NC = "[object Object]", RC = "[object RegExp]", zC = "[object Set]", PC = "[object String]", WC = "[object WeakMap]", HC = "[object ArrayBuffer]", qC = "[object DataView]", jC = "[object Float32Array]", UC = "[object Float64Array]", YC = "[object Int8Array]", GC = "[object Int16Array]", VC = "[object Int32Array]", XC = "[object Uint8Array]", KC = "[object Uint8ClampedArray]", ZC = "[object Uint16Array]", JC = "[object Uint32Array]", I = {};
I[jC] = I[UC] = I[YC] = I[GC] = I[VC] = I[XC] = I[KC] = I[ZC] = I[JC] = !0;
I[AC] = I[EC] = I[HC] = I[FC] = I[qC] = I[MC] = I[OC] = I[$C] = I[IC] = I[DC] = I[NC] = I[RC] = I[zC] = I[PC] = I[WC] = !1;
function QC(t) {
  return to(t) && jl(t.length) && !!I[ri(t)];
}
function tb(t) {
  return function(e) {
    return t(e);
  };
}
var Yl = typeof exports == "object" && exports && !exports.nodeType && exports, je = Yl && typeof module == "object" && module && !module.nodeType && module, eb = je && je.exports === Yl, tn = eb && hl.process, ib = function() {
  try {
    var t = je && je.require && je.require("util").types;
    return t || tn && tn.binding && tn.binding("util");
  } catch {
  }
}();
const ks = ib;
var ws = ks && ks.isTypedArray, rb = ws ? tb(ws) : QC;
const nb = rb;
var ob = "[object Map]", sb = "[object Set]", ab = Object.prototype, lb = ab.hasOwnProperty;
function Ri(t) {
  if (t == null)
    return !0;
  if (SC(t) && (xC(t) || typeof t == "string" || typeof t.splice == "function" || LC(t) || nb(t) || CC(t)))
    return !t.length;
  var e = pC(t);
  if (e == ob || e == sb)
    return !t.size;
  if (Hl(t))
    return !rC(t).length;
  for (var i in t)
    if (lb.call(t, i))
      return !1;
  return !0;
}
const cb = "graphics-document document";
function hb(t, e) {
  t.attr("role", cb), Ri(e) || t.attr("aria-roledescription", e);
}
function ub(t, e, i, r) {
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
], fb = 5e4, db = "graph TB;a[Maximum text size in diagram exceeded];style a fill:#faa", pb = "sandbox", gb = "loose", mb = "http://www.w3.org/2000/svg", _b = "http://www.w3.org/1999/xlink", yb = "http://www.w3.org/1999/xhtml", Cb = "100%", bb = "100%", xb = "border:0;margin:0;", Tb = "margin:0", Sb = "allow-top-navigation-by-user-activation allow-popups", vb = 'The "iframe" tag is not supported by your browser.', kb = ["foreignobject"], wb = ["dominant-baseline"];
async function Bb(t, e) {
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
:root { --mermaid-alt-font-family: ${t.altFontFamily}}`), !Ri(i) && Gl.includes(e)) {
    const l = t.htmlLabels || ((n = t.flowchart) == null ? void 0 : n.htmlLabels) ? ["> *", "span"] : ["rect", "polygon", "ellipse", "circle", "path"];
    for (const c in i) {
      const h = i[c];
      Ri(h.styles) || l.forEach((u) => {
        r += Bs(h.id, u, h.styles);
      }), Ri(h.textStyles) || (r += Bs(h.id, "tspan", h.textStyles));
    }
  }
  return r;
}, Fb = (t, e, i, r) => {
  const n = Eb(t, e, i), o = Sm(e, n, t.themeVariables);
  return yn(T_(`${r}{${o}}`), v_);
}, Mb = (t = "", e, i) => {
  let r = t;
  return !i && !e && (r = r.replace(/marker-end="url\(.*?#/g, 'marker-end="url(#')), r = Ab(r), r = r.replace(/<br>/g, "<br/>"), r;
}, Ob = (t = "", e) => {
  const i = e ? e.viewBox.baseVal.height + "px" : bb, r = btoa('<body style="' + Tb + '">' + t + "</body>");
  return `<iframe style="width:${Cb};height:${i};${xb}" src="data:text/html;base64,${r}" sandbox="${Sb}">
  ${vb}
</iframe>`;
}, Ls = (t, e, i, r, n) => {
  const o = t.append("div");
  o.attr("id", i), r && o.attr("style", r);
  const s = o.append("svg").attr("id", e).attr("width", "100%").attr("xmlns", mb);
  return n && s.attr("xmlns:xlink", n), s.append("g"), t;
};
function As(t, e) {
  return t.append("iframe").attr("id", e).attr("style", "width: 100%; height: 100%;").attr("sandbox", "");
}
const $b = (t, e, i, r) => {
  var n, o, s;
  (n = t.getElementById(e)) == null || n.remove(), (o = t.getElementById(i)) == null || o.remove(), (s = t.getElementById(r)) == null || s.remove();
}, Ib = async function(t, e, i) {
  var ne, si, ai, li;
  Jn(), Qi();
  const r = Ii.detectInit(e);
  r && (we(r), Xa(r));
  const n = Ft();
  x.debug(n), e.length > ((n == null ? void 0 : n.maxTextSize) ?? fb) && (e = db), e = e.replace(/\r\n?/g, `
`), e = e.replace(
    /<(\w+)([^>]*)>/g,
    (nt, ci, P) => "<" + ci + P.replace(/="([^"]*)"/g, "='$1'") + ">"
  );
  const o = "#" + t, s = "i" + t, a = "#" + s, l = "d" + t, c = "#" + l;
  let h = Ct("body");
  const u = n.securityLevel === pb, g = n.securityLevel === gb, d = n.fontFamily;
  if (i !== void 0) {
    if (i && (i.innerHTML = ""), u) {
      const nt = As(Ct(i), s);
      h = Ct(nt.nodes()[0].contentDocument.body), h.node().style.margin = 0;
    } else
      h = Ct(i);
    Ls(h, t, l, `font-family: ${d}`, _b);
  } else {
    if ($b(document, t, l, s), u) {
      const nt = As(Ct("body"), s);
      h = Ct(nt.nodes()[0].contentDocument.body), h.node().style.margin = 0;
    } else
      h = Ct("body");
    Ls(h, t, l);
  }
  e = Lb(e);
  let _, T;
  try {
    _ = await Qn(e);
  } catch (nt) {
    _ = new Wl("error"), T = nt;
  }
  const w = h.select(c).node(), A = _.type, C = w.firstChild, B = C.firstChild, D = Gl.includes(A) ? _.renderer.getClasses(e, _) : {}, R = Fb(
    n,
    A,
    // @ts-ignore convert renderer to TS.
    D,
    o
  ), V = document.createElement("style");
  V.innerHTML = R, C.insertBefore(V, B);
  try {
    await _.renderer.draw(e, t, gs, _);
  } catch (nt) {
    throw Nl.draw(e, t, gs), nt;
  }
  const O = h.select(`${c} svg`), kr = (si = (ne = _.db).getAccTitle) == null ? void 0 : si.call(ne), wr = (li = (ai = _.db).getAccDescription) == null ? void 0 : li.call(ai);
  Nb(A, O, kr, wr), h.select(`[id="${t}"]`).selectAll("foreignobject > *").attr("xmlns", yb);
  let q = h.select(c).node().innerHTML;
  if (x.debug("config.arrowMarkerAbsolute", n.arrowMarkerAbsolute), q = Mb(q, u, wa(n.arrowMarkerAbsolute)), u) {
    const nt = h.select(c + " svg").node();
    q = Ob(q, nt);
  } else
    g || (q = Xi.sanitize(q, {
      ADD_TAGS: kb,
      ADD_ATTR: wb
    }));
  if (Ky(), T)
    throw T;
  const Ht = Ct(u ? a : c).node();
  return Ht && "remove" in Ht && Ht.remove(), {
    svg: q,
    bindFunctions: _.db.bindFunctions
  };
};
function Db(t = {}) {
  var i;
  t != null && t.fontFamily && !((i = t.themeVariables) != null && i.fontFamily) && (t.themeVariables || (t.themeVariables = {}), t.themeVariables.fontFamily = t.fontFamily), dm(t), t != null && t.theme && t.theme in Lt ? t.themeVariables = Lt[t.theme].getThemeVariables(
    t.themeVariables
  ) : t && (t.themeVariables = Lt.default.getThemeVariables(t.themeVariables));
  const e = typeof t == "object" ? fm(t) : Ga();
  wn(e.logLevel), Jn();
}
function Nb(t, e, i, r) {
  hb(e, t), ub(e, i, r, e.attr("id"));
}
const ee = Object.freeze({
  render: Ib,
  parse: Bb,
  parseDirective: ol,
  getDiagramFromText: Qn,
  initialize: Db,
  getConfig: Ft,
  setConfig: gm,
  getSiteConfig: Ga,
  updateSiteConfig: pm,
  reset: () => {
    Qi();
  },
  globalReset: () => {
    Qi(Ze);
  },
  defaultConfig: Ze
});
wn(Ft().logLevel);
Qi(Ft());
const Rb = (t, e, i) => {
  x.warn(t), gl(t) ? (i && i(t.str, t.hash), e.push({ ...t, message: t.str, error: t })) : (i && i(t), t instanceof Error && e.push({
    str: t.message,
    message: t.message,
    hash: t.name,
    error: t
  }));
}, Vl = async function(t = {
  querySelector: ".mermaid"
}) {
  try {
    await zb(t);
  } catch (e) {
    if (gl(e) && x.error(e.str), ct.parseError && ct.parseError(e), !t.suppressErrors)
      throw x.error("Use the suppressErrors option to suppress these errors"), e;
  }
}, zb = async function({ postRenderCallback: t, querySelector: e, nodes: i } = {
  querySelector: ".mermaid"
}) {
  const r = ee.getConfig();
  x.debug(`${t ? "" : "No "}Callback function found`);
  let n;
  if (i)
    n = i;
  else if (e)
    n = document.querySelectorAll(e);
  else
    throw new Error("Nodes and querySelector are both undefined");
  x.debug(`Found ${n.length} diagrams`), (r == null ? void 0 : r.startOnLoad) !== void 0 && (x.debug("Start On Load: " + (r == null ? void 0 : r.startOnLoad)), ee.updateSiteConfig({ startOnLoad: r == null ? void 0 : r.startOnLoad }));
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
    s = l.innerHTML, s = lc(Ii.entityDecode(s)).trim().replace(/<br\s*\/?>/gi, "<br/>");
    const h = Ii.detectInit(s);
    h && x.debug("Detected early reinit: ", h);
    try {
      const { svg: u, bindFunctions: g } = await Jl(c, s, l);
      l.innerHTML = u, t && await t(c), g && g(l);
    } catch (u) {
      Rb(u, a, ct.parseError);
    }
  }
  if (a.length > 0)
    throw a[0];
}, Xl = function(t) {
  ee.initialize(t);
}, Pb = async function(t, e, i) {
  x.warn("mermaid.init is deprecated. Please use run instead."), t && Xl(t);
  const r = { postRenderCallback: i, querySelector: ".mermaid" };
  typeof e == "string" ? r.querySelector = e : e && (e instanceof HTMLElement ? r.nodes = [e] : r.nodes = e), await Vl(r);
}, Wb = async (t, {
  lazyLoad: e = !0
} = {}) => {
  ll(...t), e === !1 && await Im();
}, Kl = function() {
  if (ct.startOnLoad) {
    const { startOnLoad: t } = ee.getConfig();
    t && ct.run().catch((e) => x.error("Mermaid failed to initialize", e));
  }
};
if (typeof document < "u") {
  /*!
   * Wait for document loaded before starting the execution
   */
  window.addEventListener("load", Kl, !1);
}
const Hb = function(t) {
  ct.parseError = t;
}, sr = [];
let en = !1;
const Zl = async () => {
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
}, qb = async (t, e) => new Promise((i, r) => {
  const n = () => new Promise((o, s) => {
    ee.parse(t, e).then(
      (a) => {
        o(a), i(a);
      },
      (a) => {
        var l;
        x.error("Error parsing", a), (l = ct.parseError) == null || l.call(ct, a), s(a), r(a);
      }
    );
  });
  sr.push(n), Zl().catch(r);
}), Jl = (t, e, i) => new Promise((r, n) => {
  const o = () => new Promise((s, a) => {
    ee.render(t, e, i).then(
      (l) => {
        s(l), r(l);
      },
      (l) => {
        var c;
        x.error("Error parsing", l), (c = ct.parseError) == null || c.call(ct, l), a(l), n(l);
      }
    );
  });
  sr.push(o), Zl().catch(n);
}), ct = {
  startOnLoad: !0,
  mermaidAPI: ee,
  parse: qb,
  render: Jl,
  init: Pb,
  run: Vl,
  registerExternalDiagrams: Wb,
  initialize: Xl,
  parseError: void 0,
  contentLoaded: Kl,
  setParseErrorHandler: Hb,
  detectType: br
};
export {
  Vs as $,
  Ja as A,
  Zf as B,
  Hd as C,
  t_ as D,
  sl as E,
  Em as F,
  En as G,
  Xs as H,
  ii as I,
  Su as J,
  Fn as K,
  It as L,
  Ge as M,
  Io as N,
  Eu as O,
  Js as P,
  Ub as Q,
  it as R,
  Ot as S,
  fc as T,
  G as U,
  Qb as V,
  ki as W,
  Xn as X,
  $t as Y,
  ax as Z,
  st as _,
  il as a,
  Pc as a0,
  J0 as a1,
  to as a2,
  ri as a3,
  ir as a4,
  xC as a5,
  fl as a6,
  Le as a7,
  k0 as a8,
  SC as a9,
  Zb as aA,
  Jb as aB,
  Kb as aC,
  Yb as aD,
  In as aE,
  Gb as aF,
  ex as aG,
  tx as aH,
  Xb as aI,
  lc as aJ,
  Et as aK,
  E as aL,
  ct as aM,
  CC as aa,
  LC as ab,
  nb as ac,
  rC as ad,
  Hl as ae,
  ni as af,
  Jy as ag,
  Ae as ah,
  rr as ai,
  re as aj,
  Wt as ak,
  pC as al,
  ks as am,
  tb as an,
  jl as ao,
  Tn as ap,
  Ri as aq,
  Ze as ar,
  Ab as as,
  km as at,
  ol as au,
  k as av,
  L as aw,
  Ho as ax,
  Wo as ay,
  Vb as az,
  el as b,
  Ft as c,
  Xe as d,
  Is as e,
  Pn as f,
  tl as g,
  K as h,
  or as i,
  Ct as j,
  Cm as k,
  x as l,
  ee as m,
  o_ as n,
  Vf as o,
  Z0 as p,
  wa as q,
  j0 as r,
  Qa as s,
  bm as t,
  gm as u,
  dl as v,
  r_ as w,
  Ii as x,
  rl as y,
  nl as z
};
