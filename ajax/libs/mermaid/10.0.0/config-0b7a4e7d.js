var fs = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Vc(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
function gs(t) {
  throw new Error('Could not dynamically require "' + t + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var Xr = {}, ms = {
  get exports() {
    return Xr;
  },
  set exports(t) {
    Xr = t;
  }
};
(function(t, i) {
  (function(o, s) {
    t.exports = s();
  })(fs, function() {
    var o;
    function s() {
      return o.apply(null, arguments);
    }
    function l(e) {
      return e instanceof Array || Object.prototype.toString.call(e) === "[object Array]";
    }
    function c(e) {
      return e != null && Object.prototype.toString.call(e) === "[object Object]";
    }
    function u(e, r) {
      return Object.prototype.hasOwnProperty.call(e, r);
    }
    function g(e) {
      if (Object.getOwnPropertyNames)
        return Object.getOwnPropertyNames(e).length === 0;
      for (var r in e)
        if (u(e, r))
          return;
      return 1;
    }
    function m(e) {
      return e === void 0;
    }
    function y(e) {
      return typeof e == "number" || Object.prototype.toString.call(e) === "[object Number]";
    }
    function C(e) {
      return e instanceof Date || Object.prototype.toString.call(e) === "[object Date]";
    }
    function L(e, r) {
      for (var n = [], a = e.length, h = 0; h < a; ++h)
        n.push(r(e[h], h));
      return n;
    }
    function M(e, r) {
      for (var n in r)
        u(r, n) && (e[n] = r[n]);
      return u(r, "toString") && (e.toString = r.toString), u(r, "valueOf") && (e.valueOf = r.valueOf), e;
    }
    function F(e, r, n, a) {
      return ko(e, r, n, a, !0).utc();
    }
    function D(e) {
      return e._pf == null && (e._pf = { empty: !1, unusedTokens: [], unusedInput: [], overflow: -2, charsLeftOver: 0, nullInput: !1, invalidEra: null, invalidMonth: null, invalidFormat: !1, userInvalidated: !1, iso: !1, parsedDateParts: [], era: null, meridiem: null, rfc2822: !1, weekdayMismatch: !1 }), e._pf;
    }
    function X(e) {
      if (e._isValid == null) {
        var r = D(e), n = Oe.call(r.parsedDateParts, function(a) {
          return a != null;
        }), n = !isNaN(e._d.getTime()) && r.overflow < 0 && !r.empty && !r.invalidEra && !r.invalidMonth && !r.invalidWeekday && !r.weekdayMismatch && !r.nullInput && !r.invalidFormat && !r.userInvalidated && (!r.meridiem || r.meridiem && n);
        if (e._strict && (n = n && r.charsLeftOver === 0 && r.unusedTokens.length === 0 && r.bigHour === void 0), Object.isFrozen != null && Object.isFrozen(e))
          return n;
        e._isValid = n;
      }
      return e._isValid;
    }
    function ut(e) {
      var r = F(NaN);
      return e != null ? M(D(r), e) : D(r).userInvalidated = !0, r;
    }
    var Oe = Array.prototype.some || function(e) {
      for (var r = Object(this), n = r.length >>> 0, a = 0; a < n; a++)
        if (a in r && e.call(this, r[a], a, r))
          return !0;
      return !1;
    }, St = s.momentProperties = [], Tt = !1;
    function ot(e, r) {
      var n, a, h, f = St.length;
      if (m(r._isAMomentObject) || (e._isAMomentObject = r._isAMomentObject), m(r._i) || (e._i = r._i), m(r._f) || (e._f = r._f), m(r._l) || (e._l = r._l), m(r._strict) || (e._strict = r._strict), m(r._tzm) || (e._tzm = r._tzm), m(r._isUTC) || (e._isUTC = r._isUTC), m(r._offset) || (e._offset = r._offset), m(r._pf) || (e._pf = D(r)), m(r._locale) || (e._locale = r._locale), 0 < f)
        for (n = 0; n < f; n++)
          m(h = r[a = St[n]]) || (e[a] = h);
      return e;
    }
    function Rt(e) {
      ot(this, e), this._d = new Date(e._d != null ? e._d.getTime() : NaN), this.isValid() || (this._d = new Date(NaN)), Tt === !1 && (Tt = !0, s.updateOffset(this), Tt = !1);
    }
    function ft(e) {
      return e instanceof Rt || e != null && e._isAMomentObject != null;
    }
    function Ve(e) {
      s.suppressDeprecationWarnings === !1 && typeof console < "u" && console.warn && console.warn("Deprecation warning: " + e);
    }
    function vt(e, r) {
      var n = !0;
      return M(function() {
        if (s.deprecationHandler != null && s.deprecationHandler(null, e), n) {
          for (var a, h, f = [], _ = arguments.length, b = 0; b < _; b++) {
            if (a = "", typeof arguments[b] == "object") {
              for (h in a += `
[` + b + "] ", arguments[0])
                u(arguments[0], h) && (a += h + ": " + arguments[0][h] + ", ");
              a = a.slice(0, -2);
            } else
              a = arguments[b];
            f.push(a);
          }
          Ve(e + `
Arguments: ` + Array.prototype.slice.call(f).join("") + `
` + new Error().stack), n = !1;
        }
        return r.apply(this, arguments);
      }, r);
    }
    var Ei = {};
    function Ai(e, r) {
      s.deprecationHandler != null && s.deprecationHandler(e, r), Ei[e] || (Ve(r), Ei[e] = !0);
    }
    function It(e) {
      return typeof Function < "u" && e instanceof Function || Object.prototype.toString.call(e) === "[object Function]";
    }
    function je(e, r) {
      var n, a = M({}, e);
      for (n in r)
        u(r, n) && (c(e[n]) && c(r[n]) ? (a[n] = {}, M(a[n], e[n]), M(a[n], r[n])) : r[n] != null ? a[n] = r[n] : delete a[n]);
      for (n in e)
        u(e, n) && !u(r, n) && c(e[n]) && (a[n] = M({}, a[n]));
      return a;
    }
    function wt(e) {
      e != null && this.set(e);
    }
    s.suppressDeprecationWarnings = !1, s.deprecationHandler = null;
    var di = Object.keys || function(e) {
      var r, n = [];
      for (r in e)
        u(e, r) && n.push(r);
      return n;
    };
    function Bt(e, r, n) {
      var a = "" + Math.abs(e);
      return (0 <= e ? n ? "+" : "" : "-") + Math.pow(10, Math.max(0, r - a.length)).toString().substr(1) + a;
    }
    var Ee = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g, Xe = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, fi = {}, fe = {};
    function O(e, r, n, a) {
      var h = typeof a == "string" ? function() {
        return this[a]();
      } : a;
      e && (fe[e] = h), r && (fe[r[0]] = function() {
        return Bt(h.apply(this, arguments), r[1], r[2]);
      }), n && (fe[n] = function() {
        return this.localeData().ordinal(h.apply(this, arguments), e);
      });
    }
    function ge(e, r) {
      return e.isValid() ? (r = it(r, e.localeData()), fi[r] = fi[r] || function(n) {
        for (var a, h = n.match(Ee), f = 0, _ = h.length; f < _; f++)
          fe[h[f]] ? h[f] = fe[h[f]] : h[f] = (a = h[f]).match(/\[[\s\S]/) ? a.replace(/^\[|\]$/g, "") : a.replace(/\\/g, "");
        return function(b) {
          for (var v = "", S = 0; S < _; S++)
            v += It(h[S]) ? h[S].call(b, n) : h[S];
          return v;
        };
      }(r), fi[r](e)) : e.localeData().invalidDate();
    }
    function it(e, r) {
      var n = 5;
      function a(h) {
        return r.longDateFormat(h) || h;
      }
      for (Xe.lastIndex = 0; 0 <= n && Xe.test(e); )
        e = e.replace(Xe, a), Xe.lastIndex = 0, --n;
      return e;
    }
    var me = {};
    function H(e, r) {
      var n = e.toLowerCase();
      me[n] = me[n + "s"] = me[r] = e;
    }
    function _t(e) {
      return typeof e == "string" ? me[e] || me[e.toLowerCase()] : void 0;
    }
    function K(e) {
      var r, n, a = {};
      for (n in e)
        u(e, n) && (r = _t(n)) && (a[r] = e[n]);
      return a;
    }
    var pe = {};
    function nt(e, r) {
      pe[e] = r;
    }
    function Ae(e) {
      return e % 4 == 0 && e % 100 != 0 || e % 400 == 0;
    }
    function gt(e) {
      return e < 0 ? Math.ceil(e) || 0 : Math.floor(e);
    }
    function W(r) {
      var r = +r, n = 0;
      return n = r != 0 && isFinite(r) ? gt(r) : n;
    }
    function Et(e, r) {
      return function(n) {
        return n != null ? (Ze(this, e, n), s.updateOffset(this, r), this) : Yt(this, e);
      };
    }
    function Yt(e, r) {
      return e.isValid() ? e._d["get" + (e._isUTC ? "UTC" : "") + r]() : NaN;
    }
    function Ze(e, r, n) {
      e.isValid() && !isNaN(n) && (r === "FullYear" && Ae(e.year()) && e.month() === 1 && e.date() === 29 ? (n = W(n), e._d["set" + (e._isUTC ? "UTC" : "") + r](n, e.month(), Je(n, e.month()))) : e._d["set" + (e._isUTC ? "UTC" : "") + r](n));
    }
    var k = /\d/, R = /\d\d/, zt = /\d{3}/, ze = /\d{4}/, we = /[+-]?\d{6}/, G = /\d\d?/, Ht = /\d\d\d\d?/, ie = /\d\d\d\d\d\d?/, re = /\d{1,3}/, Be = /\d{1,4}/, ve = /[+-]?\d{1,6}/, ye = /\d+/, _e = /[+-]?\d+/, Ne = /Z|[+-]\d\d:?\d\d/gi, Ut = /Z|[+-]\d\d(?::?\d\d)?/gi, mt = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i;
    function B(e, r, n) {
      Re[e] = It(r) ? r : function(a, h) {
        return a && n ? n : r;
      };
    }
    function Ni(e, r) {
      return u(Re, e) ? Re[e](r._strict, r._locale) : new RegExp(pt(e.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(n, a, h, f, _) {
        return a || h || f || _;
      })));
    }
    function pt(e) {
      return e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
    }
    var Re = {}, Ke = {};
    function $(e, r) {
      var n, a, h = r;
      for (typeof e == "string" && (e = [e]), y(r) && (h = function(f, _) {
        _[r] = W(f);
      }), a = e.length, n = 0; n < a; n++)
        Ke[e[n]] = h;
    }
    function Qt(e, r) {
      $(e, function(n, a, h, f) {
        h._w = h._w || {}, r(n, h._w, h, f);
      });
    }
    var V, Q = 0, At = 1, Lt = 2, rt = 3, ht = 4, qt = 5, oe = 6, st = 7, Ce = 8;
    function Je(e, r) {
      if (isNaN(e) || isNaN(r))
        return NaN;
      var n = (r % (n = 12) + n) % n;
      return e += (r - n) / 12, n == 1 ? Ae(e) ? 29 : 28 : 31 - n % 7 % 2;
    }
    V = Array.prototype.indexOf || function(e) {
      for (var r = 0; r < this.length; ++r)
        if (this[r] === e)
          return r;
      return -1;
    }, O("M", ["MM", 2], "Mo", function() {
      return this.month() + 1;
    }), O("MMM", 0, 0, function(e) {
      return this.localeData().monthsShort(this, e);
    }), O("MMMM", 0, 0, function(e) {
      return this.localeData().months(this, e);
    }), H("month", "M"), nt("month", 8), B("M", G), B("MM", G, R), B("MMM", function(e, r) {
      return r.monthsShortRegex(e);
    }), B("MMMM", function(e, r) {
      return r.monthsRegex(e);
    }), $(["M", "MM"], function(e, r) {
      r[At] = W(e) - 1;
    }), $(["MMM", "MMMM"], function(e, r, n, a) {
      a = n._locale.monthsParse(e, a, n._strict), a != null ? r[At] = a : D(n).invalidMonth = e;
    });
    var be = "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), Qe = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), gi = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/, Ri = mt, Tr = mt;
    function Ie(e, r) {
      var n;
      if (e.isValid()) {
        if (typeof r == "string") {
          if (/^\d+$/.test(r))
            r = W(r);
          else if (!y(r = e.localeData().monthsParse(r)))
            return;
        }
        n = Math.min(e.date(), Je(e.year(), r)), e._d["set" + (e._isUTC ? "UTC" : "") + "Month"](r, n);
      }
    }
    function ti(e) {
      return e != null ? (Ie(this, e), s.updateOffset(this, !0), this) : Yt(this, "Month");
    }
    function Ii() {
      function e(_, b) {
        return b.length - _.length;
      }
      for (var r, n = [], a = [], h = [], f = 0; f < 12; f++)
        r = F([2e3, f]), n.push(this.monthsShort(r, "")), a.push(this.months(r, "")), h.push(this.months(r, "")), h.push(this.monthsShort(r, ""));
      for (n.sort(e), a.sort(e), h.sort(e), f = 0; f < 12; f++)
        n[f] = pt(n[f]), a[f] = pt(a[f]);
      for (f = 0; f < 24; f++)
        h[f] = pt(h[f]);
      this._monthsRegex = new RegExp("^(" + h.join("|") + ")", "i"), this._monthsShortRegex = this._monthsRegex, this._monthsStrictRegex = new RegExp("^(" + a.join("|") + ")", "i"), this._monthsShortStrictRegex = new RegExp("^(" + n.join("|") + ")", "i");
    }
    function Ct(e) {
      return Ae(e) ? 366 : 365;
    }
    O("Y", 0, 0, function() {
      var e = this.year();
      return e <= 9999 ? Bt(e, 4) : "+" + e;
    }), O(0, ["YY", 2], 0, function() {
      return this.year() % 100;
    }), O(0, ["YYYY", 4], 0, "year"), O(0, ["YYYYY", 5], 0, "year"), O(0, ["YYYYYY", 6, !0], 0, "year"), H("year", "y"), nt("year", 1), B("Y", _e), B("YY", G, R), B("YYYY", Be, ze), B("YYYYY", ve, we), B("YYYYYY", ve, we), $(["YYYYY", "YYYYYY"], Q), $("YYYY", function(e, r) {
      r[Q] = e.length === 2 ? s.parseTwoDigitYear(e) : W(e);
    }), $("YY", function(e, r) {
      r[Q] = s.parseTwoDigitYear(e);
    }), $("Y", function(e, r) {
      r[Q] = parseInt(e, 10);
    }), s.parseTwoDigitYear = function(e) {
      return W(e) + (68 < W(e) ? 1900 : 2e3);
    };
    var Gi = Et("FullYear", !0);
    function mi(e, r, n, a, h, f, _) {
      var b;
      return e < 100 && 0 <= e ? (b = new Date(e + 400, r, n, a, h, f, _), isFinite(b.getFullYear()) && b.setFullYear(e)) : b = new Date(e, r, n, a, h, f, _), b;
    }
    function ke(e) {
      var r;
      return e < 100 && 0 <= e ? ((r = Array.prototype.slice.call(arguments))[0] = e + 400, r = new Date(Date.UTC.apply(null, r)), isFinite(r.getUTCFullYear()) && r.setUTCFullYear(e)) : r = new Date(Date.UTC.apply(null, arguments)), r;
    }
    function Ye(e, r, n) {
      return n = 7 + r - n, n - (7 + ke(e, 0, n).getUTCDay() - r) % 7 - 1;
    }
    function Yi(e, _, b, a, h) {
      var f, _ = 1 + 7 * (_ - 1) + (7 + b - a) % 7 + Ye(e, a, h), b = _ <= 0 ? Ct(f = e - 1) + _ : _ > Ct(e) ? (f = e + 1, _ - Ct(e)) : (f = e, _);
      return { year: f, dayOfYear: b };
    }
    function $t(e, r, n) {
      var a, h, f = Ye(e.year(), r, n), f = Math.floor((e.dayOfYear() - f - 1) / 7) + 1;
      return f < 1 ? a = f + ct(h = e.year() - 1, r, n) : f > ct(e.year(), r, n) ? (a = f - ct(e.year(), r, n), h = e.year() + 1) : (h = e.year(), a = f), { week: a, year: h };
    }
    function ct(e, h, n) {
      var a = Ye(e, h, n), h = Ye(e + 1, h, n);
      return (Ct(e) - a + h) / 7;
    }
    O("w", ["ww", 2], "wo", "week"), O("W", ["WW", 2], "Wo", "isoWeek"), H("week", "w"), H("isoWeek", "W"), nt("week", 5), nt("isoWeek", 5), B("w", G), B("ww", G, R), B("W", G), B("WW", G, R), Qt(["w", "ww", "W", "WW"], function(e, r, n, a) {
      r[a.substr(0, 1)] = W(e);
    });
    function ei(e, r) {
      return e.slice(r, 7).concat(e.slice(0, r));
    }
    O("d", 0, "do", "day"), O("dd", 0, 0, function(e) {
      return this.localeData().weekdaysMin(this, e);
    }), O("ddd", 0, 0, function(e) {
      return this.localeData().weekdaysShort(this, e);
    }), O("dddd", 0, 0, function(e) {
      return this.localeData().weekdays(this, e);
    }), O("e", 0, 0, "weekday"), O("E", 0, 0, "isoWeekday"), H("day", "d"), H("weekday", "e"), H("isoWeekday", "E"), nt("day", 11), nt("weekday", 11), nt("isoWeekday", 11), B("d", G), B("e", G), B("E", G), B("dd", function(e, r) {
      return r.weekdaysMinRegex(e);
    }), B("ddd", function(e, r) {
      return r.weekdaysShortRegex(e);
    }), B("dddd", function(e, r) {
      return r.weekdaysRegex(e);
    }), Qt(["dd", "ddd", "dddd"], function(e, r, n, a) {
      a = n._locale.weekdaysParse(e, a, n._strict), a != null ? r.d = a : D(n).invalidWeekday = e;
    }), Qt(["d", "e", "E"], function(e, r, n, a) {
      r[a] = W(e);
    });
    var xe = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), pi = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), Pe = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), vr = mt, E = mt, d = mt;
    function x() {
      function e(S, I) {
        return I.length - S.length;
      }
      for (var r, n, a, h = [], f = [], _ = [], b = [], v = 0; v < 7; v++)
        a = F([2e3, 1]).day(v), r = pt(this.weekdaysMin(a, "")), n = pt(this.weekdaysShort(a, "")), a = pt(this.weekdays(a, "")), h.push(r), f.push(n), _.push(a), b.push(r), b.push(n), b.push(a);
      h.sort(e), f.sort(e), _.sort(e), b.sort(e), this._weekdaysRegex = new RegExp("^(" + b.join("|") + ")", "i"), this._weekdaysShortRegex = this._weekdaysRegex, this._weekdaysMinRegex = this._weekdaysRegex, this._weekdaysStrictRegex = new RegExp("^(" + _.join("|") + ")", "i"), this._weekdaysShortStrictRegex = new RegExp("^(" + f.join("|") + ")", "i"), this._weekdaysMinStrictRegex = new RegExp("^(" + h.join("|") + ")", "i");
    }
    function T() {
      return this.hours() % 12 || 12;
    }
    function U(e, r) {
      O(e, 0, 0, function() {
        return this.localeData().meridiem(this.hours(), this.minutes(), r);
      });
    }
    function dt(e, r) {
      return r._meridiemParse;
    }
    O("H", ["HH", 2], 0, "hour"), O("h", ["hh", 2], 0, T), O("k", ["kk", 2], 0, function() {
      return this.hours() || 24;
    }), O("hmm", 0, 0, function() {
      return "" + T.apply(this) + Bt(this.minutes(), 2);
    }), O("hmmss", 0, 0, function() {
      return "" + T.apply(this) + Bt(this.minutes(), 2) + Bt(this.seconds(), 2);
    }), O("Hmm", 0, 0, function() {
      return "" + this.hours() + Bt(this.minutes(), 2);
    }), O("Hmmss", 0, 0, function() {
      return "" + this.hours() + Bt(this.minutes(), 2) + Bt(this.seconds(), 2);
    }), U("a", !0), U("A", !1), H("hour", "h"), nt("hour", 13), B("a", dt), B("A", dt), B("H", G), B("h", G), B("k", G), B("HH", G, R), B("hh", G, R), B("kk", G, R), B("hmm", Ht), B("hmmss", ie), B("Hmm", Ht), B("Hmmss", ie), $(["H", "HH"], rt), $(["k", "kk"], function(e, r, n) {
      e = W(e), r[rt] = e === 24 ? 0 : e;
    }), $(["a", "A"], function(e, r, n) {
      n._isPm = n._locale.isPM(e), n._meridiem = e;
    }), $(["h", "hh"], function(e, r, n) {
      r[rt] = W(e), D(n).bigHour = !0;
    }), $("hmm", function(e, r, n) {
      var a = e.length - 2;
      r[rt] = W(e.substr(0, a)), r[ht] = W(e.substr(a)), D(n).bigHour = !0;
    }), $("hmmss", function(e, r, n) {
      var a = e.length - 4, h = e.length - 2;
      r[rt] = W(e.substr(0, a)), r[ht] = W(e.substr(a, 2)), r[qt] = W(e.substr(h)), D(n).bigHour = !0;
    }), $("Hmm", function(e, r, n) {
      var a = e.length - 2;
      r[rt] = W(e.substr(0, a)), r[ht] = W(e.substr(a));
    }), $("Hmmss", function(e, r, n) {
      var a = e.length - 4, h = e.length - 2;
      r[rt] = W(e.substr(0, a)), r[ht] = W(e.substr(a, 2)), r[qt] = W(e.substr(h));
    }), mt = Et("Hours", !0);
    var et, at = { calendar: { sameDay: "[Today at] LT", nextDay: "[Tomorrow at] LT", nextWeek: "dddd [at] LT", lastDay: "[Yesterday at] LT", lastWeek: "[Last] dddd [at] LT", sameElse: "L" }, longDateFormat: { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" }, invalidDate: "Invalid date", ordinal: "%d", dayOfMonthOrdinalParse: /\d{1,2}/, relativeTime: { future: "in %s", past: "%s ago", s: "a few seconds", ss: "%d seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", w: "a week", ww: "%d weeks", M: "a month", MM: "%d months", y: "a year", yy: "%d years" }, months: be, monthsShort: Qe, week: { dow: 0, doy: 6 }, weekdays: xe, weekdaysMin: Pe, weekdaysShort: pi, meridiemParse: /[ap]\.?m?\.?/i }, j = {}, J = {};
    function ii(e) {
      return e && e.toLowerCase().replace("_", "-");
    }
    function Pi(e) {
      for (var r, n, a, h, f = 0; f < e.length; ) {
        for (r = (h = ii(e[f]).split("-")).length, n = (n = ii(e[f + 1])) ? n.split("-") : null; 0 < r; ) {
          if (a = yi(h.slice(0, r).join("-")))
            return a;
          if (n && n.length >= r && function(_, b) {
            for (var v = Math.min(_.length, b.length), S = 0; S < v; S += 1)
              if (_[S] !== b[S])
                return S;
            return v;
          }(h, n) >= r - 1)
            break;
          r--;
        }
        f++;
      }
      return et;
    }
    function yi(e) {
      var r;
      if (j[e] === void 0 && t && t.exports && e.match("^[^/\\\\]*$") != null)
        try {
          r = et._abbr, gs("./locale/" + e), Se(r);
        } catch {
          j[e] = null;
        }
      return j[e];
    }
    function Se(e, r) {
      return e && ((r = m(r) ? ne(e) : wr(e, r)) ? et = r : typeof console < "u" && console.warn && console.warn("Locale " + e + " not found. Did you forget to load it?")), et._abbr;
    }
    function wr(e, r) {
      if (r === null)
        return delete j[e], null;
      var n, a = at;
      if (r.abbr = e, j[e] != null)
        Ai("defineLocaleOverride", "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."), a = j[e]._config;
      else if (r.parentLocale != null)
        if (j[r.parentLocale] != null)
          a = j[r.parentLocale]._config;
        else {
          if ((n = yi(r.parentLocale)) == null)
            return J[r.parentLocale] || (J[r.parentLocale] = []), J[r.parentLocale].push({ name: e, config: r }), null;
          a = n._config;
        }
      return j[e] = new wt(je(a, r)), J[e] && J[e].forEach(function(h) {
        wr(h.name, h.config);
      }), Se(e), j[e];
    }
    function ne(e) {
      var r;
      if (!(e = e && e._locale && e._locale._abbr ? e._locale._abbr : e))
        return et;
      if (!l(e)) {
        if (r = yi(e))
          return r;
        e = [e];
      }
      return Pi(e);
    }
    function Br(e) {
      var r = e._a;
      return r && D(e).overflow === -2 && (r = r[At] < 0 || 11 < r[At] ? At : r[Lt] < 1 || r[Lt] > Je(r[Q], r[At]) ? Lt : r[rt] < 0 || 24 < r[rt] || r[rt] === 24 && (r[ht] !== 0 || r[qt] !== 0 || r[oe] !== 0) ? rt : r[ht] < 0 || 59 < r[ht] ? ht : r[qt] < 0 || 59 < r[qt] ? qt : r[oe] < 0 || 999 < r[oe] ? oe : -1, D(e)._overflowDayOfYear && (r < Q || Lt < r) && (r = Lt), D(e)._overflowWeeks && r === -1 && (r = st), D(e)._overflowWeekday && r === -1 && (r = Ce), D(e).overflow = r), e;
    }
    var Kn = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, Jn = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, Qn = /Z|[+-]\d\d(?::?\d\d)?/, Wi = [["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/], ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/], ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/], ["GGGG-[W]WW", /\d{4}-W\d\d/, !1], ["YYYY-DDD", /\d{4}-\d{3}/], ["YYYY-MM", /\d{4}-\d\d/, !1], ["YYYYYYMMDD", /[+-]\d{10}/], ["YYYYMMDD", /\d{8}/], ["GGGG[W]WWE", /\d{4}W\d{3}/], ["GGGG[W]WW", /\d{4}W\d{2}/, !1], ["YYYYDDD", /\d{7}/], ["YYYYMM", /\d{6}/, !1], ["YYYY", /\d{4}/, !1]], Lr = [["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/], ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/], ["HH:mm:ss", /\d\d:\d\d:\d\d/], ["HH:mm", /\d\d:\d\d/], ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/], ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/], ["HHmmss", /\d\d\d\d\d\d/], ["HHmm", /\d\d\d\d/], ["HH", /\d\d/]], ts = /^\/?Date\((-?\d+)/i, es = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/, is = { UT: 0, GMT: 0, EDT: -240, EST: -300, CDT: -300, CST: -360, MDT: -360, MST: -420, PDT: -420, PST: -480 };
    function _o(e) {
      var r, n, a, h, f, _, v = e._i, b = Kn.exec(v) || Jn.exec(v), v = Wi.length, S = Lr.length;
      if (b) {
        for (D(e).iso = !0, r = 0, n = v; r < n; r++)
          if (Wi[r][1].exec(b[1])) {
            h = Wi[r][0], a = Wi[r][2] !== !1;
            break;
          }
        if (h == null)
          e._isValid = !1;
        else {
          if (b[3]) {
            for (r = 0, n = S; r < n; r++)
              if (Lr[r][1].exec(b[3])) {
                f = (b[2] || " ") + Lr[r][0];
                break;
              }
            if (f == null)
              return void (e._isValid = !1);
          }
          if (a || f == null) {
            if (b[4]) {
              if (!Qn.exec(b[4]))
                return void (e._isValid = !1);
              _ = "Z";
            }
            e._f = h + (f || "") + (_ || ""), Fr(e);
          } else
            e._isValid = !1;
        }
      } else
        e._isValid = !1;
    }
    function rs(e, r, n, a, h, f) {
      return e = [function(_) {
        _ = parseInt(_, 10);
        {
          if (_ <= 49)
            return 2e3 + _;
          if (_ <= 999)
            return 1900 + _;
        }
        return _;
      }(e), Qe.indexOf(r), parseInt(n, 10), parseInt(a, 10), parseInt(h, 10)], f && e.push(parseInt(f, 10)), e;
    }
    function Co(e) {
      var r, n, a, h, f = es.exec(e._i.replace(/\([^()]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, ""));
      f ? (r = rs(f[4], f[3], f[2], f[5], f[6], f[7]), n = f[1], a = r, h = e, n && pi.indexOf(n) !== new Date(a[0], a[1], a[2]).getDay() ? (D(h).weekdayMismatch = !0, h._isValid = !1) : (e._a = r, e._tzm = (n = f[8], a = f[9], h = f[10], n ? is[n] : a ? 0 : 60 * (((n = parseInt(h, 10)) - (a = n % 100)) / 100) + a), e._d = ke.apply(null, e._a), e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), D(e).rfc2822 = !0)) : e._isValid = !1;
    }
    function ri(e, r, n) {
      return e ?? r ?? n;
    }
    function Mr(e) {
      var r, n, a, h, f, _, b, v, S, I, A, tt = [];
      if (!e._d) {
        for (a = e, h = new Date(s.now()), n = a._useUTC ? [h.getUTCFullYear(), h.getUTCMonth(), h.getUTCDate()] : [h.getFullYear(), h.getMonth(), h.getDate()], e._w && e._a[Lt] == null && e._a[At] == null && ((h = (a = e)._w).GG != null || h.W != null || h.E != null ? (v = 1, S = 4, f = ri(h.GG, a._a[Q], $t(Z(), 1, 4).year), _ = ri(h.W, 1), ((b = ri(h.E, 1)) < 1 || 7 < b) && (I = !0)) : (v = a._locale._week.dow, S = a._locale._week.doy, A = $t(Z(), v, S), f = ri(h.gg, a._a[Q], A.year), _ = ri(h.w, A.week), h.d != null ? ((b = h.d) < 0 || 6 < b) && (I = !0) : h.e != null ? (b = h.e + v, (h.e < 0 || 6 < h.e) && (I = !0)) : b = v), _ < 1 || _ > ct(f, v, S) ? D(a)._overflowWeeks = !0 : I != null ? D(a)._overflowWeekday = !0 : (A = Yi(f, _, b, v, S), a._a[Q] = A.year, a._dayOfYear = A.dayOfYear)), e._dayOfYear != null && (h = ri(e._a[Q], n[Q]), (e._dayOfYear > Ct(h) || e._dayOfYear === 0) && (D(e)._overflowDayOfYear = !0), I = ke(h, 0, e._dayOfYear), e._a[At] = I.getUTCMonth(), e._a[Lt] = I.getUTCDate()), r = 0; r < 3 && e._a[r] == null; ++r)
          e._a[r] = tt[r] = n[r];
        for (; r < 7; r++)
          e._a[r] = tt[r] = e._a[r] == null ? r === 2 ? 1 : 0 : e._a[r];
        e._a[rt] === 24 && e._a[ht] === 0 && e._a[qt] === 0 && e._a[oe] === 0 && (e._nextDay = !0, e._a[rt] = 0), e._d = (e._useUTC ? ke : mi).apply(null, tt), f = e._useUTC ? e._d.getUTCDay() : e._d.getDay(), e._tzm != null && e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), e._nextDay && (e._a[rt] = 24), e._w && e._w.d !== void 0 && e._w.d !== f && (D(e).weekdayMismatch = !0);
      }
    }
    function Fr(e) {
      if (e._f === s.ISO_8601)
        _o(e);
      else if (e._f === s.RFC_2822)
        Co(e);
      else {
        e._a = [], D(e).empty = !0;
        for (var r, n, a, h, f, _ = "" + e._i, b = _.length, v = 0, S = it(e._f, e._locale).match(Ee) || [], I = S.length, A = 0; A < I; A++)
          n = S[A], (r = (_.match(Ni(n, e)) || [])[0]) && (0 < (a = _.substr(0, _.indexOf(r))).length && D(e).unusedInput.push(a), _ = _.slice(_.indexOf(r) + r.length), v += r.length), fe[n] ? (r ? D(e).empty = !1 : D(e).unusedTokens.push(n), a = n, f = e, (h = r) != null && u(Ke, a) && Ke[a](h, f._a, f, a)) : e._strict && !r && D(e).unusedTokens.push(n);
        D(e).charsLeftOver = b - v, 0 < _.length && D(e).unusedInput.push(_), e._a[rt] <= 12 && D(e).bigHour === !0 && 0 < e._a[rt] && (D(e).bigHour = void 0), D(e).parsedDateParts = e._a.slice(0), D(e).meridiem = e._meridiem, e._a[rt] = function(tt, lt, Vt) {
          return Vt == null ? lt : tt.meridiemHour != null ? tt.meridiemHour(lt, Vt) : tt.isPM != null ? ((tt = tt.isPM(Vt)) && lt < 12 && (lt += 12), lt = tt || lt !== 12 ? lt : 0) : lt;
        }(e._locale, e._a[rt], e._meridiem), (b = D(e).era) !== null && (e._a[Q] = e._locale.erasConvertYear(b, e._a[Q])), Mr(e), Br(e);
      }
    }
    function bo(e) {
      var r, n, a, h = e._i, f = e._f;
      return e._locale = e._locale || ne(e._l), h === null || f === void 0 && h === "" ? ut({ nullInput: !0 }) : (typeof h == "string" && (e._i = h = e._locale.preparse(h)), ft(h) ? new Rt(Br(h)) : (C(h) ? e._d = h : l(f) ? function(_) {
        var b, v, S, I, A, tt, lt = !1, Vt = _._f.length;
        if (Vt === 0)
          return D(_).invalidFormat = !0, _._d = new Date(NaN);
        for (I = 0; I < Vt; I++)
          A = 0, tt = !1, b = ot({}, _), _._useUTC != null && (b._useUTC = _._useUTC), b._f = _._f[I], Fr(b), X(b) && (tt = !0), A = (A += D(b).charsLeftOver) + 10 * D(b).unusedTokens.length, D(b).score = A, lt ? A < S && (S = A, v = b) : (S == null || A < S || tt) && (S = A, v = b, tt && (lt = !0));
        M(_, v || b);
      }(e) : f ? Fr(e) : m(f = (h = e)._i) ? h._d = new Date(s.now()) : C(f) ? h._d = new Date(f.valueOf()) : typeof f == "string" ? (n = h, (r = ts.exec(n._i)) !== null ? n._d = new Date(+r[1]) : (_o(n), n._isValid === !1 && (delete n._isValid, Co(n), n._isValid === !1 && (delete n._isValid, n._strict ? n._isValid = !1 : s.createFromInputFallback(n))))) : l(f) ? (h._a = L(f.slice(0), function(_) {
        return parseInt(_, 10);
      }), Mr(h)) : c(f) ? (r = h)._d || (a = (n = K(r._i)).day === void 0 ? n.date : n.day, r._a = L([n.year, n.month, a, n.hour, n.minute, n.second, n.millisecond], function(_) {
        return _ && parseInt(_, 10);
      }), Mr(r)) : y(f) ? h._d = new Date(f) : s.createFromInputFallback(h), X(e) || (e._d = null), e));
    }
    function ko(e, r, n, a, h) {
      var f = {};
      return r !== !0 && r !== !1 || (a = r, r = void 0), n !== !0 && n !== !1 || (a = n, n = void 0), (c(e) && g(e) || l(e) && e.length === 0) && (e = void 0), f._isAMomentObject = !0, f._useUTC = f._isUTC = h, f._l = n, f._i = e, f._f = r, f._strict = a, (h = new Rt(Br(bo(h = f))))._nextDay && (h.add(1, "d"), h._nextDay = void 0), h;
    }
    function Z(e, r, n, a) {
      return ko(e, r, n, a, !1);
    }
    s.createFromInputFallback = vt("value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.", function(e) {
      e._d = new Date(e._i + (e._useUTC ? " UTC" : ""));
    }), s.ISO_8601 = function() {
    }, s.RFC_2822 = function() {
    }, Ht = vt("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/", function() {
      var e = Z.apply(null, arguments);
      return this.isValid() && e.isValid() ? e < this ? this : e : ut();
    }), ie = vt("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/", function() {
      var e = Z.apply(null, arguments);
      return this.isValid() && e.isValid() ? this < e ? this : e : ut();
    });
    function xo(e, r) {
      var n, a;
      if (!(r = r.length === 1 && l(r[0]) ? r[0] : r).length)
        return Z();
      for (n = r[0], a = 1; a < r.length; ++a)
        r[a].isValid() && !r[a][e](n) || (n = r[a]);
      return n;
    }
    var _i = ["year", "quarter", "month", "week", "day", "hour", "minute", "second", "millisecond"];
    function zi(r) {
      var r = K(r), n = r.year || 0, a = r.quarter || 0, h = r.month || 0, f = r.week || r.isoWeek || 0, _ = r.day || 0, b = r.hour || 0, v = r.minute || 0, S = r.second || 0, I = r.millisecond || 0;
      this._isValid = function(A) {
        var tt, lt, Vt = !1, Wr = _i.length;
        for (tt in A)
          if (u(A, tt) && (V.call(_i, tt) === -1 || A[tt] != null && isNaN(A[tt])))
            return !1;
        for (lt = 0; lt < Wr; ++lt)
          if (A[_i[lt]]) {
            if (Vt)
              return !1;
            parseFloat(A[_i[lt]]) !== W(A[_i[lt]]) && (Vt = !0);
          }
        return !0;
      }(r), this._milliseconds = +I + 1e3 * S + 6e4 * v + 1e3 * b * 60 * 60, this._days = +_ + 7 * f, this._months = +h + 3 * a + 12 * n, this._data = {}, this._locale = ne(), this._bubble();
    }
    function Hi(e) {
      return e instanceof zi;
    }
    function Dr(e) {
      return e < 0 ? -1 * Math.round(-1 * e) : Math.round(e);
    }
    function So(e, r) {
      O(e, 0, 0, function() {
        var n = this.utcOffset(), a = "+";
        return n < 0 && (n = -n, a = "-"), a + Bt(~~(n / 60), 2) + r + Bt(~~n % 60, 2);
      });
    }
    So("Z", ":"), So("ZZ", ""), B("Z", Ut), B("ZZ", Ut), $(["Z", "ZZ"], function(e, r, n) {
      n._useUTC = !0, n._tzm = Or(Ut, e);
    });
    var os = /([\+\-]|\d\d)/gi;
    function Or(e, n) {
      var n = (n || "").match(e);
      return n === null ? null : (n = 60 * (e = ((n[n.length - 1] || []) + "").match(os) || ["-", 0, 0])[1] + W(e[2])) === 0 ? 0 : e[0] === "+" ? n : -n;
    }
    function Er(e, r) {
      var n;
      return r._isUTC ? (r = r.clone(), n = (ft(e) || C(e) ? e : Z(e)).valueOf() - r.valueOf(), r._d.setTime(r._d.valueOf() + n), s.updateOffset(r, !1), r) : Z(e).local();
    }
    function Ar(e) {
      return -Math.round(e._d.getTimezoneOffset());
    }
    function To() {
      return !!this.isValid() && this._isUTC && this._offset === 0;
    }
    s.updateOffset = function() {
    };
    var ns = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/, ss = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
    function Gt(e, r) {
      var n, a = e, h = null;
      return Hi(e) ? a = { ms: e._milliseconds, d: e._days, M: e._months } : y(e) || !isNaN(+e) ? (a = {}, r ? a[r] = +e : a.milliseconds = +e) : (h = ns.exec(e)) ? (n = h[1] === "-" ? -1 : 1, a = { y: 0, d: W(h[Lt]) * n, h: W(h[rt]) * n, m: W(h[ht]) * n, s: W(h[qt]) * n, ms: W(Dr(1e3 * h[oe])) * n }) : (h = ss.exec(e)) ? (n = h[1] === "-" ? -1 : 1, a = { y: We(h[2], n), M: We(h[3], n), w: We(h[4], n), d: We(h[5], n), h: We(h[6], n), m: We(h[7], n), s: We(h[8], n) }) : a == null ? a = {} : typeof a == "object" && ("from" in a || "to" in a) && (r = function(f, _) {
        var b;
        return !f.isValid() || !_.isValid() ? { milliseconds: 0, months: 0 } : (_ = Er(_, f), f.isBefore(_) ? b = vo(f, _) : ((b = vo(_, f)).milliseconds = -b.milliseconds, b.months = -b.months), b);
      }(Z(a.from), Z(a.to)), (a = {}).ms = r.milliseconds, a.M = r.months), h = new zi(a), Hi(e) && u(e, "_locale") && (h._locale = e._locale), Hi(e) && u(e, "_isValid") && (h._isValid = e._isValid), h;
    }
    function We(e, r) {
      return e = e && parseFloat(e.replace(",", ".")), (isNaN(e) ? 0 : e) * r;
    }
    function vo(e, r) {
      var n = {};
      return n.months = r.month() - e.month() + 12 * (r.year() - e.year()), e.clone().add(n.months, "M").isAfter(r) && --n.months, n.milliseconds = +r - +e.clone().add(n.months, "M"), n;
    }
    function wo(e, r) {
      return function(n, a) {
        var h;
        return a === null || isNaN(+a) || (Ai(r, "moment()." + r + "(period, number) is deprecated. Please use moment()." + r + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."), h = n, n = a, a = h), Bo(this, Gt(n, a), e), this;
      };
    }
    function Bo(e, _, n, a) {
      var h = _._milliseconds, f = Dr(_._days), _ = Dr(_._months);
      e.isValid() && (a = a == null || a, _ && Ie(e, Yt(e, "Month") + _ * n), f && Ze(e, "Date", Yt(e, "Date") + f * n), h && e._d.setTime(e._d.valueOf() + h * n), a && s.updateOffset(e, f || _));
    }
    Gt.fn = zi.prototype, Gt.invalid = function() {
      return Gt(NaN);
    }, be = wo(1, "add"), xe = wo(-1, "subtract");
    function Lo(e) {
      return typeof e == "string" || e instanceof String;
    }
    function as(e) {
      return ft(e) || C(e) || Lo(e) || y(e) || function(r) {
        var n = l(r), a = !1;
        return n && (a = r.filter(function(h) {
          return !y(h) && Lo(r);
        }).length === 0), n && a;
      }(e) || function(r) {
        var n, a, h = c(r) && !g(r), f = !1, _ = ["years", "year", "y", "months", "month", "M", "days", "day", "d", "dates", "date", "D", "hours", "hour", "h", "minutes", "minute", "m", "seconds", "second", "s", "milliseconds", "millisecond", "ms"], b = _.length;
        for (n = 0; n < b; n += 1)
          a = _[n], f = f || u(r, a);
        return h && f;
      }(e) || e == null;
    }
    function Ui(e, h) {
      if (e.date() < h.date())
        return -Ui(h, e);
      var n = 12 * (h.year() - e.year()) + (h.month() - e.month()), a = e.clone().add(n, "months"), h = h - a < 0 ? (h - a) / (a - e.clone().add(n - 1, "months")) : (h - a) / (e.clone().add(1 + n, "months") - a);
      return -(n + h) || 0;
    }
    function Mo(e) {
      return e === void 0 ? this._locale._abbr : ((e = ne(e)) != null && (this._locale = e), this);
    }
    s.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ", s.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]", Pe = vt("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function(e) {
      return e === void 0 ? this.localeData() : this.locale(e);
    });
    function Fo() {
      return this._locale;
    }
    var Do = 126227808e5;
    function oi(e, r) {
      return (e % r + r) % r;
    }
    function Oo(e, r, n) {
      return e < 100 && 0 <= e ? new Date(e + 400, r, n) - Do : new Date(e, r, n).valueOf();
    }
    function Eo(e, r, n) {
      return e < 100 && 0 <= e ? Date.UTC(e + 400, r, n) - Do : Date.UTC(e, r, n);
    }
    function Nr(e, r) {
      return r.erasAbbrRegex(e);
    }
    function Rr() {
      for (var e = [], r = [], n = [], a = [], h = this.eras(), f = 0, _ = h.length; f < _; ++f)
        r.push(pt(h[f].name)), e.push(pt(h[f].abbr)), n.push(pt(h[f].narrow)), a.push(pt(h[f].name)), a.push(pt(h[f].abbr)), a.push(pt(h[f].narrow));
      this._erasRegex = new RegExp("^(" + a.join("|") + ")", "i"), this._erasNameRegex = new RegExp("^(" + r.join("|") + ")", "i"), this._erasAbbrRegex = new RegExp("^(" + e.join("|") + ")", "i"), this._erasNarrowRegex = new RegExp("^(" + n.join("|") + ")", "i");
    }
    function qi(e, r) {
      O(0, [e, e.length], 0, r);
    }
    function Ao(e, r, n, a, h) {
      var f;
      return e == null ? $t(this, a, h).year : (f = ct(e, a, h), function(_, b, v, S, I) {
        return _ = Yi(_, b, v, S, I), b = ke(_.year, 0, _.dayOfYear), this.year(b.getUTCFullYear()), this.month(b.getUTCMonth()), this.date(b.getUTCDate()), this;
      }.call(this, e, r = f < r ? f : r, n, a, h));
    }
    O("N", 0, 0, "eraAbbr"), O("NN", 0, 0, "eraAbbr"), O("NNN", 0, 0, "eraAbbr"), O("NNNN", 0, 0, "eraName"), O("NNNNN", 0, 0, "eraNarrow"), O("y", ["y", 1], "yo", "eraYear"), O("y", ["yy", 2], 0, "eraYear"), O("y", ["yyy", 3], 0, "eraYear"), O("y", ["yyyy", 4], 0, "eraYear"), B("N", Nr), B("NN", Nr), B("NNN", Nr), B("NNNN", function(e, r) {
      return r.erasNameRegex(e);
    }), B("NNNNN", function(e, r) {
      return r.erasNarrowRegex(e);
    }), $(["N", "NN", "NNN", "NNNN", "NNNNN"], function(e, r, n, a) {
      a = n._locale.erasParse(e, a, n._strict), a ? D(n).era = a : D(n).invalidEra = e;
    }), B("y", ye), B("yy", ye), B("yyy", ye), B("yyyy", ye), B("yo", function(e, r) {
      return r._eraYearOrdinalRegex || ye;
    }), $(["y", "yy", "yyy", "yyyy"], Q), $(["yo"], function(e, r, n, a) {
      var h;
      n._locale._eraYearOrdinalRegex && (h = e.match(n._locale._eraYearOrdinalRegex)), n._locale.eraYearOrdinalParse ? r[Q] = n._locale.eraYearOrdinalParse(e, h) : r[Q] = parseInt(e, 10);
    }), O(0, ["gg", 2], 0, function() {
      return this.weekYear() % 100;
    }), O(0, ["GG", 2], 0, function() {
      return this.isoWeekYear() % 100;
    }), qi("gggg", "weekYear"), qi("ggggg", "weekYear"), qi("GGGG", "isoWeekYear"), qi("GGGGG", "isoWeekYear"), H("weekYear", "gg"), H("isoWeekYear", "GG"), nt("weekYear", 1), nt("isoWeekYear", 1), B("G", _e), B("g", _e), B("GG", G, R), B("gg", G, R), B("GGGG", Be, ze), B("gggg", Be, ze), B("GGGGG", ve, we), B("ggggg", ve, we), Qt(["gggg", "ggggg", "GGGG", "GGGGG"], function(e, r, n, a) {
      r[a.substr(0, 2)] = W(e);
    }), Qt(["gg", "GG"], function(e, r, n, a) {
      r[a] = s.parseTwoDigitYear(e);
    }), O("Q", 0, "Qo", "quarter"), H("quarter", "Q"), nt("quarter", 7), B("Q", k), $("Q", function(e, r) {
      r[At] = 3 * (W(e) - 1);
    }), O("D", ["DD", 2], "Do", "date"), H("date", "D"), nt("date", 9), B("D", G), B("DD", G, R), B("Do", function(e, r) {
      return e ? r._dayOfMonthOrdinalParse || r._ordinalParse : r._dayOfMonthOrdinalParseLenient;
    }), $(["D", "DD"], Lt), $("Do", function(e, r) {
      r[Lt] = W(e.match(G)[0]);
    }), Be = Et("Date", !0), O("DDD", ["DDDD", 3], "DDDo", "dayOfYear"), H("dayOfYear", "DDD"), nt("dayOfYear", 4), B("DDD", re), B("DDDD", zt), $(["DDD", "DDDD"], function(e, r, n) {
      n._dayOfYear = W(e);
    }), O("m", ["mm", 2], 0, "minute"), H("minute", "m"), nt("minute", 14), B("m", G), B("mm", G, R), $(["m", "mm"], ht);
    var Te, ze = Et("Minutes", !1), ve = (O("s", ["ss", 2], 0, "second"), H("second", "s"), nt("second", 15), B("s", G), B("ss", G, R), $(["s", "ss"], qt), Et("Seconds", !1));
    for (O("S", 0, 0, function() {
      return ~~(this.millisecond() / 100);
    }), O(0, ["SS", 2], 0, function() {
      return ~~(this.millisecond() / 10);
    }), O(0, ["SSS", 3], 0, "millisecond"), O(0, ["SSSS", 4], 0, function() {
      return 10 * this.millisecond();
    }), O(0, ["SSSSS", 5], 0, function() {
      return 100 * this.millisecond();
    }), O(0, ["SSSSSS", 6], 0, function() {
      return 1e3 * this.millisecond();
    }), O(0, ["SSSSSSS", 7], 0, function() {
      return 1e4 * this.millisecond();
    }), O(0, ["SSSSSSSS", 8], 0, function() {
      return 1e5 * this.millisecond();
    }), O(0, ["SSSSSSSSS", 9], 0, function() {
      return 1e6 * this.millisecond();
    }), H("millisecond", "ms"), nt("millisecond", 16), B("S", re, k), B("SS", re, R), B("SSS", re, zt), Te = "SSSS"; Te.length <= 9; Te += "S")
      B(Te, ye);
    function ls(e, r) {
      r[oe] = W(1e3 * ("0." + e));
    }
    for (Te = "S"; Te.length <= 9; Te += "S")
      $(Te, ls);
    we = Et("Milliseconds", !1), O("z", 0, 0, "zoneAbbr"), O("zz", 0, 0, "zoneName"), k = Rt.prototype;
    function No(e) {
      return e;
    }
    k.add = be, k.calendar = function(n, h) {
      arguments.length === 1 && (arguments[0] ? as(arguments[0]) ? (n = arguments[0], h = void 0) : function(f) {
        for (var _ = c(f) && !g(f), b = !1, v = ["sameDay", "nextDay", "lastDay", "nextWeek", "lastWeek", "sameElse"], S = 0; S < v.length; S += 1)
          b = b || u(f, v[S]);
        return _ && b;
      }(arguments[0]) && (h = arguments[0], n = void 0) : h = n = void 0);
      var n = n || Z(), a = Er(n, this).startOf("day"), a = s.calendarFormat(this, a) || "sameElse", h = h && (It(h[a]) ? h[a].call(this, n) : h[a]);
      return this.format(h || this.localeData().calendar(a, this, Z(n)));
    }, k.clone = function() {
      return new Rt(this);
    }, k.diff = function(e, r, n) {
      var a, h, f;
      if (!this.isValid())
        return NaN;
      if (!(a = Er(e, this)).isValid())
        return NaN;
      switch (h = 6e4 * (a.utcOffset() - this.utcOffset()), r = _t(r)) {
        case "year":
          f = Ui(this, a) / 12;
          break;
        case "month":
          f = Ui(this, a);
          break;
        case "quarter":
          f = Ui(this, a) / 3;
          break;
        case "second":
          f = (this - a) / 1e3;
          break;
        case "minute":
          f = (this - a) / 6e4;
          break;
        case "hour":
          f = (this - a) / 36e5;
          break;
        case "day":
          f = (this - a - h) / 864e5;
          break;
        case "week":
          f = (this - a - h) / 6048e5;
          break;
        default:
          f = this - a;
      }
      return n ? f : gt(f);
    }, k.endOf = function(e) {
      var r, n;
      if ((e = _t(e)) === void 0 || e === "millisecond" || !this.isValid())
        return this;
      switch (n = this._isUTC ? Eo : Oo, e) {
        case "year":
          r = n(this.year() + 1, 0, 1) - 1;
          break;
        case "quarter":
          r = n(this.year(), this.month() - this.month() % 3 + 3, 1) - 1;
          break;
        case "month":
          r = n(this.year(), this.month() + 1, 1) - 1;
          break;
        case "week":
          r = n(this.year(), this.month(), this.date() - this.weekday() + 7) - 1;
          break;
        case "isoWeek":
          r = n(this.year(), this.month(), this.date() - (this.isoWeekday() - 1) + 7) - 1;
          break;
        case "day":
        case "date":
          r = n(this.year(), this.month(), this.date() + 1) - 1;
          break;
        case "hour":
          r = this._d.valueOf(), r += 36e5 - oi(r + (this._isUTC ? 0 : 6e4 * this.utcOffset()), 36e5) - 1;
          break;
        case "minute":
          r = this._d.valueOf(), r += 6e4 - oi(r, 6e4) - 1;
          break;
        case "second":
          r = this._d.valueOf(), r += 1e3 - oi(r, 1e3) - 1;
          break;
      }
      return this._d.setTime(r), s.updateOffset(this, !0), this;
    }, k.format = function(e) {
      return e = e || (this.isUtc() ? s.defaultFormatUtc : s.defaultFormat), e = ge(this, e), this.localeData().postformat(e);
    }, k.from = function(e, r) {
      return this.isValid() && (ft(e) && e.isValid() || Z(e).isValid()) ? Gt({ to: this, from: e }).locale(this.locale()).humanize(!r) : this.localeData().invalidDate();
    }, k.fromNow = function(e) {
      return this.from(Z(), e);
    }, k.to = function(e, r) {
      return this.isValid() && (ft(e) && e.isValid() || Z(e).isValid()) ? Gt({ from: this, to: e }).locale(this.locale()).humanize(!r) : this.localeData().invalidDate();
    }, k.toNow = function(e) {
      return this.to(Z(), e);
    }, k.get = function(e) {
      return It(this[e = _t(e)]) ? this[e]() : this;
    }, k.invalidAt = function() {
      return D(this).overflow;
    }, k.isAfter = function(e, r) {
      return e = ft(e) ? e : Z(e), !(!this.isValid() || !e.isValid()) && ((r = _t(r) || "millisecond") === "millisecond" ? this.valueOf() > e.valueOf() : e.valueOf() < this.clone().startOf(r).valueOf());
    }, k.isBefore = function(e, r) {
      return e = ft(e) ? e : Z(e), !(!this.isValid() || !e.isValid()) && ((r = _t(r) || "millisecond") === "millisecond" ? this.valueOf() < e.valueOf() : this.clone().endOf(r).valueOf() < e.valueOf());
    }, k.isBetween = function(e, r, n, a) {
      return e = ft(e) ? e : Z(e), r = ft(r) ? r : Z(r), !!(this.isValid() && e.isValid() && r.isValid()) && ((a = a || "()")[0] === "(" ? this.isAfter(e, n) : !this.isBefore(e, n)) && (a[1] === ")" ? this.isBefore(r, n) : !this.isAfter(r, n));
    }, k.isSame = function(n, r) {
      var n = ft(n) ? n : Z(n);
      return !(!this.isValid() || !n.isValid()) && ((r = _t(r) || "millisecond") === "millisecond" ? this.valueOf() === n.valueOf() : (n = n.valueOf(), this.clone().startOf(r).valueOf() <= n && n <= this.clone().endOf(r).valueOf()));
    }, k.isSameOrAfter = function(e, r) {
      return this.isSame(e, r) || this.isAfter(e, r);
    }, k.isSameOrBefore = function(e, r) {
      return this.isSame(e, r) || this.isBefore(e, r);
    }, k.isValid = function() {
      return X(this);
    }, k.lang = Pe, k.locale = Mo, k.localeData = Fo, k.max = ie, k.min = Ht, k.parsingFlags = function() {
      return M({}, D(this));
    }, k.set = function(e, r) {
      if (typeof e == "object")
        for (var n = function(f) {
          var _, b = [];
          for (_ in f)
            u(f, _) && b.push({ unit: _, priority: pe[_] });
          return b.sort(function(v, S) {
            return v.priority - S.priority;
          }), b;
        }(e = K(e)), a = n.length, h = 0; h < a; h++)
          this[n[h].unit](e[n[h].unit]);
      else if (It(this[e = _t(e)]))
        return this[e](r);
      return this;
    }, k.startOf = function(e) {
      var r, n;
      if ((e = _t(e)) === void 0 || e === "millisecond" || !this.isValid())
        return this;
      switch (n = this._isUTC ? Eo : Oo, e) {
        case "year":
          r = n(this.year(), 0, 1);
          break;
        case "quarter":
          r = n(this.year(), this.month() - this.month() % 3, 1);
          break;
        case "month":
          r = n(this.year(), this.month(), 1);
          break;
        case "week":
          r = n(this.year(), this.month(), this.date() - this.weekday());
          break;
        case "isoWeek":
          r = n(this.year(), this.month(), this.date() - (this.isoWeekday() - 1));
          break;
        case "day":
        case "date":
          r = n(this.year(), this.month(), this.date());
          break;
        case "hour":
          r = this._d.valueOf(), r -= oi(r + (this._isUTC ? 0 : 6e4 * this.utcOffset()), 36e5);
          break;
        case "minute":
          r = this._d.valueOf(), r -= oi(r, 6e4);
          break;
        case "second":
          r = this._d.valueOf(), r -= oi(r, 1e3);
          break;
      }
      return this._d.setTime(r), s.updateOffset(this, !0), this;
    }, k.subtract = xe, k.toArray = function() {
      var e = this;
      return [e.year(), e.month(), e.date(), e.hour(), e.minute(), e.second(), e.millisecond()];
    }, k.toObject = function() {
      var e = this;
      return { years: e.year(), months: e.month(), date: e.date(), hours: e.hours(), minutes: e.minutes(), seconds: e.seconds(), milliseconds: e.milliseconds() };
    }, k.toDate = function() {
      return new Date(this.valueOf());
    }, k.toISOString = function(e) {
      if (!this.isValid())
        return null;
      var r = (e = e !== !0) ? this.clone().utc() : this;
      return r.year() < 0 || 9999 < r.year() ? ge(r, e ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ") : It(Date.prototype.toISOString) ? e ? this.toDate().toISOString() : new Date(this.valueOf() + 60 * this.utcOffset() * 1e3).toISOString().replace("Z", ge(r, "Z")) : ge(r, e ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ");
    }, k.inspect = function() {
      if (!this.isValid())
        return "moment.invalid(/* " + this._i + " */)";
      var e, r = "moment", n = "";
      return this.isLocal() || (r = this.utcOffset() === 0 ? "moment.utc" : "moment.parseZone", n = "Z"), r = "[" + r + '("]', e = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY", this.format(r + e + "-MM-DD[T]HH:mm:ss.SSS" + (n + '[")]'));
    }, typeof Symbol < "u" && Symbol.for != null && (k[Symbol.for("nodejs.util.inspect.custom")] = function() {
      return "Moment<" + this.format() + ">";
    }), k.toJSON = function() {
      return this.isValid() ? this.toISOString() : null;
    }, k.toString = function() {
      return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
    }, k.unix = function() {
      return Math.floor(this.valueOf() / 1e3);
    }, k.valueOf = function() {
      return this._d.valueOf() - 6e4 * (this._offset || 0);
    }, k.creationData = function() {
      return { input: this._i, format: this._f, locale: this._locale, isUTC: this._isUTC, strict: this._strict };
    }, k.eraName = function() {
      for (var e, r = this.localeData().eras(), n = 0, a = r.length; n < a; ++n)
        if (e = this.clone().startOf("day").valueOf(), r[n].since <= e && e <= r[n].until || r[n].until <= e && e <= r[n].since)
          return r[n].name;
      return "";
    }, k.eraNarrow = function() {
      for (var e, r = this.localeData().eras(), n = 0, a = r.length; n < a; ++n)
        if (e = this.clone().startOf("day").valueOf(), r[n].since <= e && e <= r[n].until || r[n].until <= e && e <= r[n].since)
          return r[n].narrow;
      return "";
    }, k.eraAbbr = function() {
      for (var e, r = this.localeData().eras(), n = 0, a = r.length; n < a; ++n)
        if (e = this.clone().startOf("day").valueOf(), r[n].since <= e && e <= r[n].until || r[n].until <= e && e <= r[n].since)
          return r[n].abbr;
      return "";
    }, k.eraYear = function() {
      for (var e, r, n = this.localeData().eras(), a = 0, h = n.length; a < h; ++a)
        if (e = n[a].since <= n[a].until ? 1 : -1, r = this.clone().startOf("day").valueOf(), n[a].since <= r && r <= n[a].until || n[a].until <= r && r <= n[a].since)
          return (this.year() - s(n[a].since).year()) * e + n[a].offset;
      return this.year();
    }, k.year = Gi, k.isLeapYear = function() {
      return Ae(this.year());
    }, k.weekYear = function(e) {
      return Ao.call(this, e, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy);
    }, k.isoWeekYear = function(e) {
      return Ao.call(this, e, this.isoWeek(), this.isoWeekday(), 1, 4);
    }, k.quarter = k.quarters = function(e) {
      return e == null ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (e - 1) + this.month() % 3);
    }, k.month = ti, k.daysInMonth = function() {
      return Je(this.year(), this.month());
    }, k.week = k.weeks = function(e) {
      var r = this.localeData().week(this);
      return e == null ? r : this.add(7 * (e - r), "d");
    }, k.isoWeek = k.isoWeeks = function(e) {
      var r = $t(this, 1, 4).week;
      return e == null ? r : this.add(7 * (e - r), "d");
    }, k.weeksInYear = function() {
      var e = this.localeData()._week;
      return ct(this.year(), e.dow, e.doy);
    }, k.weeksInWeekYear = function() {
      var e = this.localeData()._week;
      return ct(this.weekYear(), e.dow, e.doy);
    }, k.isoWeeksInYear = function() {
      return ct(this.year(), 1, 4);
    }, k.isoWeeksInISOWeekYear = function() {
      return ct(this.isoWeekYear(), 1, 4);
    }, k.date = Be, k.day = k.days = function(e) {
      if (!this.isValid())
        return e != null ? this : NaN;
      var r, n, a = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
      return e != null ? (r = e, n = this.localeData(), e = typeof r != "string" ? r : isNaN(r) ? typeof (r = n.weekdaysParse(r)) == "number" ? r : null : parseInt(r, 10), this.add(e - a, "d")) : a;
    }, k.weekday = function(e) {
      if (!this.isValid())
        return e != null ? this : NaN;
      var r = (this.day() + 7 - this.localeData()._week.dow) % 7;
      return e == null ? r : this.add(e - r, "d");
    }, k.isoWeekday = function(e) {
      return this.isValid() ? e != null ? (r = e, n = this.localeData(), n = typeof r == "string" ? n.weekdaysParse(r) % 7 || 7 : isNaN(r) ? null : r, this.day(this.day() % 7 ? n : n - 7)) : this.day() || 7 : e != null ? this : NaN;
      var r, n;
    }, k.dayOfYear = function(e) {
      var r = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;
      return e == null ? r : this.add(e - r, "d");
    }, k.hour = k.hours = mt, k.minute = k.minutes = ze, k.second = k.seconds = ve, k.millisecond = k.milliseconds = we, k.utcOffset = function(e, r, n) {
      var a, h = this._offset || 0;
      if (!this.isValid())
        return e != null ? this : NaN;
      if (e == null)
        return this._isUTC ? h : Ar(this);
      if (typeof e == "string") {
        if ((e = Or(Ut, e)) === null)
          return this;
      } else
        Math.abs(e) < 16 && !n && (e *= 60);
      return !this._isUTC && r && (a = Ar(this)), this._offset = e, this._isUTC = !0, a != null && this.add(a, "m"), h !== e && (!r || this._changeInProgress ? Bo(this, Gt(e - h, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, s.updateOffset(this, !0), this._changeInProgress = null)), this;
    }, k.utc = function(e) {
      return this.utcOffset(0, e);
    }, k.local = function(e) {
      return this._isUTC && (this.utcOffset(0, e), this._isUTC = !1, e && this.subtract(Ar(this), "m")), this;
    }, k.parseZone = function() {
      var e;
      return this._tzm != null ? this.utcOffset(this._tzm, !1, !0) : typeof this._i == "string" && ((e = Or(Ne, this._i)) != null ? this.utcOffset(e) : this.utcOffset(0, !0)), this;
    }, k.hasAlignedHourOffset = function(e) {
      return !!this.isValid() && (e = e ? Z(e).utcOffset() : 0, (this.utcOffset() - e) % 60 == 0);
    }, k.isDST = function() {
      return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
    }, k.isLocal = function() {
      return !!this.isValid() && !this._isUTC;
    }, k.isUtcOffset = function() {
      return !!this.isValid() && this._isUTC;
    }, k.isUtc = To, k.isUTC = To, k.zoneAbbr = function() {
      return this._isUTC ? "UTC" : "";
    }, k.zoneName = function() {
      return this._isUTC ? "Coordinated Universal Time" : "";
    }, k.dates = vt("dates accessor is deprecated. Use date instead.", Be), k.months = vt("months accessor is deprecated. Use month instead", ti), k.years = vt("years accessor is deprecated. Use year instead", Gi), k.zone = vt("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/", function(e, r) {
      return e != null ? (this.utcOffset(e = typeof e != "string" ? -e : e, r), this) : -this.utcOffset();
    }), k.isDSTShifted = vt("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information", function() {
      if (!m(this._isDSTShifted))
        return this._isDSTShifted;
      var e, r = {};
      return ot(r, this), (r = bo(r))._a ? (e = (r._isUTC ? F : Z)(r._a), this._isDSTShifted = this.isValid() && 0 < function(n, a, h) {
        for (var f = Math.min(n.length, a.length), _ = Math.abs(n.length - a.length), b = 0, v = 0; v < f; v++)
          (h && n[v] !== a[v] || !h && W(n[v]) !== W(a[v])) && b++;
        return b + _;
      }(r._a, e.toArray())) : this._isDSTShifted = !1, this._isDSTShifted;
    }), R = wt.prototype;
    function $i(e, r, n, f) {
      var h = ne(), f = F().set(f, r);
      return h[n](f, e);
    }
    function Ro(e, r, n) {
      if (y(e) && (r = e, e = void 0), e = e || "", r != null)
        return $i(e, r, n, "month");
      for (var a = [], h = 0; h < 12; h++)
        a[h] = $i(e, h, n, "month");
      return a;
    }
    function Ir(e, r, n, a) {
      r = (typeof e == "boolean" ? y(r) && (n = r, r = void 0) : (r = e, e = !1, y(n = r) && (n = r, r = void 0)), r || "");
      var h, f = ne(), _ = e ? f._week.dow : 0, b = [];
      if (n != null)
        return $i(r, (n + _) % 7, a, "day");
      for (h = 0; h < 7; h++)
        b[h] = $i(r, (h + _) % 7, a, "day");
      return b;
    }
    R.calendar = function(e, r, n) {
      return It(e = this._calendar[e] || this._calendar.sameElse) ? e.call(r, n) : e;
    }, R.longDateFormat = function(e) {
      var r = this._longDateFormat[e], n = this._longDateFormat[e.toUpperCase()];
      return r || !n ? r : (this._longDateFormat[e] = n.match(Ee).map(function(a) {
        return a === "MMMM" || a === "MM" || a === "DD" || a === "dddd" ? a.slice(1) : a;
      }).join(""), this._longDateFormat[e]);
    }, R.invalidDate = function() {
      return this._invalidDate;
    }, R.ordinal = function(e) {
      return this._ordinal.replace("%d", e);
    }, R.preparse = No, R.postformat = No, R.relativeTime = function(e, r, n, a) {
      var h = this._relativeTime[n];
      return It(h) ? h(e, r, n, a) : h.replace(/%d/i, e);
    }, R.pastFuture = function(e, r) {
      return It(e = this._relativeTime[0 < e ? "future" : "past"]) ? e(r) : e.replace(/%s/i, r);
    }, R.set = function(e) {
      var r, n;
      for (n in e)
        u(e, n) && (It(r = e[n]) ? this[n] = r : this["_" + n] = r);
      this._config = e, this._dayOfMonthOrdinalParseLenient = new RegExp((this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source);
    }, R.eras = function(e, r) {
      for (var n, a = this._eras || ne("en")._eras, h = 0, f = a.length; h < f; ++h) {
        switch (typeof a[h].since) {
          case "string":
            n = s(a[h].since).startOf("day"), a[h].since = n.valueOf();
            break;
        }
        switch (typeof a[h].until) {
          case "undefined":
            a[h].until = 1 / 0;
            break;
          case "string":
            n = s(a[h].until).startOf("day").valueOf(), a[h].until = n.valueOf();
            break;
        }
      }
      return a;
    }, R.erasParse = function(e, r, n) {
      var a, h, f, _, b, v = this.eras();
      for (e = e.toUpperCase(), a = 0, h = v.length; a < h; ++a)
        if (f = v[a].name.toUpperCase(), _ = v[a].abbr.toUpperCase(), b = v[a].narrow.toUpperCase(), n)
          switch (r) {
            case "N":
            case "NN":
            case "NNN":
              if (_ === e)
                return v[a];
              break;
            case "NNNN":
              if (f === e)
                return v[a];
              break;
            case "NNNNN":
              if (b === e)
                return v[a];
              break;
          }
        else if (0 <= [f, _, b].indexOf(e))
          return v[a];
    }, R.erasConvertYear = function(e, r) {
      var n = e.since <= e.until ? 1 : -1;
      return r === void 0 ? s(e.since).year() : s(e.since).year() + (r - e.offset) * n;
    }, R.erasAbbrRegex = function(e) {
      return u(this, "_erasAbbrRegex") || Rr.call(this), e ? this._erasAbbrRegex : this._erasRegex;
    }, R.erasNameRegex = function(e) {
      return u(this, "_erasNameRegex") || Rr.call(this), e ? this._erasNameRegex : this._erasRegex;
    }, R.erasNarrowRegex = function(e) {
      return u(this, "_erasNarrowRegex") || Rr.call(this), e ? this._erasNarrowRegex : this._erasRegex;
    }, R.months = function(e, r) {
      return e ? (l(this._months) ? this._months : this._months[(this._months.isFormat || gi).test(r) ? "format" : "standalone"])[e.month()] : l(this._months) ? this._months : this._months.standalone;
    }, R.monthsShort = function(e, r) {
      return e ? (l(this._monthsShort) ? this._monthsShort : this._monthsShort[gi.test(r) ? "format" : "standalone"])[e.month()] : l(this._monthsShort) ? this._monthsShort : this._monthsShort.standalone;
    }, R.monthsParse = function(e, r, n) {
      var a, h;
      if (this._monthsParseExact)
        return function(A, _, b) {
          var v, S, I, A = A.toLocaleLowerCase();
          if (!this._monthsParse)
            for (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = [], v = 0; v < 12; ++v)
              I = F([2e3, v]), this._shortMonthsParse[v] = this.monthsShort(I, "").toLocaleLowerCase(), this._longMonthsParse[v] = this.months(I, "").toLocaleLowerCase();
          return b ? _ === "MMM" ? (S = V.call(this._shortMonthsParse, A)) !== -1 ? S : null : (S = V.call(this._longMonthsParse, A)) !== -1 ? S : null : _ === "MMM" ? (S = V.call(this._shortMonthsParse, A)) !== -1 || (S = V.call(this._longMonthsParse, A)) !== -1 ? S : null : (S = V.call(this._longMonthsParse, A)) !== -1 || (S = V.call(this._shortMonthsParse, A)) !== -1 ? S : null;
        }.call(this, e, r, n);
      for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), a = 0; a < 12; a++)
        if (h = F([2e3, a]), n && !this._longMonthsParse[a] && (this._longMonthsParse[a] = new RegExp("^" + this.months(h, "").replace(".", "") + "$", "i"), this._shortMonthsParse[a] = new RegExp("^" + this.monthsShort(h, "").replace(".", "") + "$", "i")), n || this._monthsParse[a] || (h = "^" + this.months(h, "") + "|^" + this.monthsShort(h, ""), this._monthsParse[a] = new RegExp(h.replace(".", ""), "i")), n && r === "MMMM" && this._longMonthsParse[a].test(e) || n && r === "MMM" && this._shortMonthsParse[a].test(e) || !n && this._monthsParse[a].test(e))
          return a;
    }, R.monthsRegex = function(e) {
      return this._monthsParseExact ? (u(this, "_monthsRegex") || Ii.call(this), e ? this._monthsStrictRegex : this._monthsRegex) : (u(this, "_monthsRegex") || (this._monthsRegex = Tr), this._monthsStrictRegex && e ? this._monthsStrictRegex : this._monthsRegex);
    }, R.monthsShortRegex = function(e) {
      return this._monthsParseExact ? (u(this, "_monthsRegex") || Ii.call(this), e ? this._monthsShortStrictRegex : this._monthsShortRegex) : (u(this, "_monthsShortRegex") || (this._monthsShortRegex = Ri), this._monthsShortStrictRegex && e ? this._monthsShortStrictRegex : this._monthsShortRegex);
    }, R.week = function(e) {
      return $t(e, this._week.dow, this._week.doy).week;
    }, R.firstDayOfYear = function() {
      return this._week.doy;
    }, R.firstDayOfWeek = function() {
      return this._week.dow;
    }, R.weekdays = function(e, r) {
      return r = l(this._weekdays) ? this._weekdays : this._weekdays[e && e !== !0 && this._weekdays.isFormat.test(r) ? "format" : "standalone"], e === !0 ? ei(r, this._week.dow) : e ? r[e.day()] : r;
    }, R.weekdaysMin = function(e) {
      return e === !0 ? ei(this._weekdaysMin, this._week.dow) : e ? this._weekdaysMin[e.day()] : this._weekdaysMin;
    }, R.weekdaysShort = function(e) {
      return e === !0 ? ei(this._weekdaysShort, this._week.dow) : e ? this._weekdaysShort[e.day()] : this._weekdaysShort;
    }, R.weekdaysParse = function(e, r, n) {
      var a, h;
      if (this._weekdaysParseExact)
        return function(A, _, b) {
          var v, S, I, A = A.toLocaleLowerCase();
          if (!this._weekdaysParse)
            for (this._weekdaysParse = [], this._shortWeekdaysParse = [], this._minWeekdaysParse = [], v = 0; v < 7; ++v)
              I = F([2e3, 1]).day(v), this._minWeekdaysParse[v] = this.weekdaysMin(I, "").toLocaleLowerCase(), this._shortWeekdaysParse[v] = this.weekdaysShort(I, "").toLocaleLowerCase(), this._weekdaysParse[v] = this.weekdays(I, "").toLocaleLowerCase();
          return b ? _ === "dddd" ? (S = V.call(this._weekdaysParse, A)) !== -1 ? S : null : _ === "ddd" ? (S = V.call(this._shortWeekdaysParse, A)) !== -1 ? S : null : (S = V.call(this._minWeekdaysParse, A)) !== -1 ? S : null : _ === "dddd" ? (S = V.call(this._weekdaysParse, A)) !== -1 || (S = V.call(this._shortWeekdaysParse, A)) !== -1 || (S = V.call(this._minWeekdaysParse, A)) !== -1 ? S : null : _ === "ddd" ? (S = V.call(this._shortWeekdaysParse, A)) !== -1 || (S = V.call(this._weekdaysParse, A)) !== -1 || (S = V.call(this._minWeekdaysParse, A)) !== -1 ? S : null : (S = V.call(this._minWeekdaysParse, A)) !== -1 || (S = V.call(this._weekdaysParse, A)) !== -1 || (S = V.call(this._shortWeekdaysParse, A)) !== -1 ? S : null;
        }.call(this, e, r, n);
      for (this._weekdaysParse || (this._weekdaysParse = [], this._minWeekdaysParse = [], this._shortWeekdaysParse = [], this._fullWeekdaysParse = []), a = 0; a < 7; a++)
        if (h = F([2e3, 1]).day(a), n && !this._fullWeekdaysParse[a] && (this._fullWeekdaysParse[a] = new RegExp("^" + this.weekdays(h, "").replace(".", "\\.?") + "$", "i"), this._shortWeekdaysParse[a] = new RegExp("^" + this.weekdaysShort(h, "").replace(".", "\\.?") + "$", "i"), this._minWeekdaysParse[a] = new RegExp("^" + this.weekdaysMin(h, "").replace(".", "\\.?") + "$", "i")), this._weekdaysParse[a] || (h = "^" + this.weekdays(h, "") + "|^" + this.weekdaysShort(h, "") + "|^" + this.weekdaysMin(h, ""), this._weekdaysParse[a] = new RegExp(h.replace(".", ""), "i")), n && r === "dddd" && this._fullWeekdaysParse[a].test(e) || n && r === "ddd" && this._shortWeekdaysParse[a].test(e) || n && r === "dd" && this._minWeekdaysParse[a].test(e) || !n && this._weekdaysParse[a].test(e))
          return a;
    }, R.weekdaysRegex = function(e) {
      return this._weekdaysParseExact ? (u(this, "_weekdaysRegex") || x.call(this), e ? this._weekdaysStrictRegex : this._weekdaysRegex) : (u(this, "_weekdaysRegex") || (this._weekdaysRegex = vr), this._weekdaysStrictRegex && e ? this._weekdaysStrictRegex : this._weekdaysRegex);
    }, R.weekdaysShortRegex = function(e) {
      return this._weekdaysParseExact ? (u(this, "_weekdaysRegex") || x.call(this), e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex) : (u(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = E), this._weekdaysShortStrictRegex && e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex);
    }, R.weekdaysMinRegex = function(e) {
      return this._weekdaysParseExact ? (u(this, "_weekdaysRegex") || x.call(this), e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex) : (u(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = d), this._weekdaysMinStrictRegex && e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex);
    }, R.isPM = function(e) {
      return (e + "").toLowerCase().charAt(0) === "p";
    }, R.meridiem = function(e, r, n) {
      return 11 < e ? n ? "pm" : "PM" : n ? "am" : "AM";
    }, Se("en", { eras: [{ since: "0001-01-01", until: 1 / 0, offset: 1, name: "Anno Domini", narrow: "AD", abbr: "AD" }, { since: "0000-12-31", until: -1 / 0, offset: 1, name: "Before Christ", narrow: "BC", abbr: "BC" }], dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/, ordinal: function(e) {
      var r = e % 10;
      return e + (W(e % 100 / 10) === 1 ? "th" : r == 1 ? "st" : r == 2 ? "nd" : r == 3 ? "rd" : "th");
    } }), s.lang = vt("moment.lang is deprecated. Use moment.locale instead.", Se), s.langData = vt("moment.langData is deprecated. Use moment.localeData instead.", ne);
    var se = Math.abs;
    function Io(e, r, n, a) {
      return r = Gt(r, n), e._milliseconds += a * r._milliseconds, e._days += a * r._days, e._months += a * r._months, e._bubble();
    }
    function Yo(e) {
      return e < 0 ? Math.floor(e) : Math.ceil(e);
    }
    function Po(e) {
      return 4800 * e / 146097;
    }
    function Yr(e) {
      return 146097 * e / 4800;
    }
    function ae(e) {
      return function() {
        return this.as(e);
      };
    }
    re = ae("ms"), zt = ae("s"), be = ae("m"), ie = ae("h"), Ht = ae("d"), xe = ae("w"), mt = ae("M"), ze = ae("Q"), ve = ae("y");
    function He(e) {
      return function() {
        return this.isValid() ? this._data[e] : NaN;
      };
    }
    var we = He("milliseconds"), Be = He("seconds"), Gi = He("minutes"), R = He("hours"), hs = He("days"), cs = He("months"), us = He("years"), le = Math.round, ni = { ss: 44, s: 45, m: 45, h: 22, d: 26, w: null, M: 11 };
    function ds(e, r, n, a) {
      var S = Gt(e).abs(), I = le(S.as("s")), h = le(S.as("m")), f = le(S.as("h")), _ = le(S.as("d")), b = le(S.as("M")), v = le(S.as("w")), S = le(S.as("y")), I = (I <= n.ss ? ["s", I] : I < n.s && ["ss", I]) || h <= 1 && ["m"] || h < n.m && ["mm", h] || f <= 1 && ["h"] || f < n.h && ["hh", f] || _ <= 1 && ["d"] || _ < n.d && ["dd", _];
      return (I = (I = n.w != null ? I || v <= 1 && ["w"] || v < n.w && ["ww", v] : I) || b <= 1 && ["M"] || b < n.M && ["MM", b] || S <= 1 && ["y"] || ["yy", S])[2] = r, I[3] = 0 < +e, I[4] = a, function(A, tt, lt, Vt, Wr) {
        return Wr.relativeTime(tt || 1, !!lt, A, Vt);
      }.apply(null, I);
    }
    var Pr = Math.abs;
    function si(e) {
      return (0 < e) - (e < 0) || +e;
    }
    function Vi() {
      if (!this.isValid())
        return this.localeData().invalidDate();
      var e, r, n, a, h, f, _, b = Pr(this._milliseconds) / 1e3, v = Pr(this._days), S = Pr(this._months), I = this.asSeconds();
      return I ? (e = gt(b / 60), r = gt(e / 60), b %= 60, e %= 60, n = gt(S / 12), S %= 12, a = b ? b.toFixed(3).replace(/\.?0+$/, "") : "", h = si(this._months) !== si(I) ? "-" : "", f = si(this._days) !== si(I) ? "-" : "", _ = si(this._milliseconds) !== si(I) ? "-" : "", (I < 0 ? "-" : "") + "P" + (n ? h + n + "Y" : "") + (S ? h + S + "M" : "") + (v ? f + v + "D" : "") + (r || e || b ? "T" : "") + (r ? _ + r + "H" : "") + (e ? _ + e + "M" : "") + (b ? _ + a + "S" : "")) : "P0D";
    }
    var q = zi.prototype;
    return q.isValid = function() {
      return this._isValid;
    }, q.abs = function() {
      var e = this._data;
      return this._milliseconds = se(this._milliseconds), this._days = se(this._days), this._months = se(this._months), e.milliseconds = se(e.milliseconds), e.seconds = se(e.seconds), e.minutes = se(e.minutes), e.hours = se(e.hours), e.months = se(e.months), e.years = se(e.years), this;
    }, q.add = function(e, r) {
      return Io(this, e, r, 1);
    }, q.subtract = function(e, r) {
      return Io(this, e, r, -1);
    }, q.as = function(e) {
      if (!this.isValid())
        return NaN;
      var r, n, a = this._milliseconds;
      if ((e = _t(e)) === "month" || e === "quarter" || e === "year")
        switch (r = this._days + a / 864e5, n = this._months + Po(r), e) {
          case "month":
            return n;
          case "quarter":
            return n / 3;
          case "year":
            return n / 12;
        }
      else
        switch (r = this._days + Math.round(Yr(this._months)), e) {
          case "week":
            return r / 7 + a / 6048e5;
          case "day":
            return r + a / 864e5;
          case "hour":
            return 24 * r + a / 36e5;
          case "minute":
            return 1440 * r + a / 6e4;
          case "second":
            return 86400 * r + a / 1e3;
          case "millisecond":
            return Math.floor(864e5 * r) + a;
          default:
            throw new Error("Unknown unit " + e);
        }
    }, q.asMilliseconds = re, q.asSeconds = zt, q.asMinutes = be, q.asHours = ie, q.asDays = Ht, q.asWeeks = xe, q.asMonths = mt, q.asQuarters = ze, q.asYears = ve, q.valueOf = function() {
      return this.isValid() ? this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * W(this._months / 12) : NaN;
    }, q._bubble = function() {
      var e = this._milliseconds, r = this._days, n = this._months, a = this._data;
      return 0 <= e && 0 <= r && 0 <= n || e <= 0 && r <= 0 && n <= 0 || (e += 864e5 * Yo(Yr(n) + r), n = r = 0), a.milliseconds = e % 1e3, e = gt(e / 1e3), a.seconds = e % 60, e = gt(e / 60), a.minutes = e % 60, e = gt(e / 60), a.hours = e % 24, r += gt(e / 24), n += e = gt(Po(r)), r -= Yo(Yr(e)), e = gt(n / 12), n %= 12, a.days = r, a.months = n, a.years = e, this;
    }, q.clone = function() {
      return Gt(this);
    }, q.get = function(e) {
      return e = _t(e), this.isValid() ? this[e + "s"]() : NaN;
    }, q.milliseconds = we, q.seconds = Be, q.minutes = Gi, q.hours = R, q.days = hs, q.weeks = function() {
      return gt(this.days() / 7);
    }, q.months = cs, q.years = us, q.humanize = function(e, r) {
      if (!this.isValid())
        return this.localeData().invalidDate();
      var n = !1, a = ni;
      return typeof e == "object" && (r = e, e = !1), typeof e == "boolean" && (n = e), typeof r == "object" && (a = Object.assign({}, ni, r), r.s != null && r.ss == null && (a.ss = r.s - 1)), e = this.localeData(), r = ds(this, !n, a, e), n && (r = e.pastFuture(+this, r)), e.postformat(r);
    }, q.toISOString = Vi, q.toString = Vi, q.toJSON = Vi, q.locale = Mo, q.localeData = Fo, q.toIsoString = vt("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", Vi), q.lang = Pe, O("X", 0, 0, "unix"), O("x", 0, 0, "valueOf"), B("x", _e), B("X", /[+-]?\d+(\.\d{1,3})?/), $("X", function(e, r, n) {
      n._d = new Date(1e3 * parseFloat(e));
    }), $("x", function(e, r, n) {
      n._d = new Date(W(e));
    }), s.version = "2.29.4", o = Z, s.fn = k, s.min = function() {
      return xo("isBefore", [].slice.call(arguments, 0));
    }, s.max = function() {
      return xo("isAfter", [].slice.call(arguments, 0));
    }, s.now = function() {
      return Date.now ? Date.now() : +new Date();
    }, s.utc = F, s.unix = function(e) {
      return Z(1e3 * e);
    }, s.months = function(e, r) {
      return Ro(e, r, "months");
    }, s.isDate = C, s.locale = Se, s.invalid = ut, s.duration = Gt, s.isMoment = ft, s.weekdays = function(e, r, n) {
      return Ir(e, r, n, "weekdays");
    }, s.parseZone = function() {
      return Z.apply(null, arguments).parseZone();
    }, s.localeData = ne, s.isDuration = Hi, s.monthsShort = function(e, r) {
      return Ro(e, r, "monthsShort");
    }, s.weekdaysMin = function(e, r, n) {
      return Ir(e, r, n, "weekdaysMin");
    }, s.defineLocale = wr, s.updateLocale = function(e, r) {
      var n, a;
      return r != null ? (a = at, j[e] != null && j[e].parentLocale != null ? j[e].set(je(j[e]._config, r)) : (r = je(a = (n = yi(e)) != null ? n._config : a, r), n == null && (r.abbr = e), (a = new wt(r)).parentLocale = j[e], j[e] = a), Se(e)) : j[e] != null && (j[e].parentLocale != null ? (j[e] = j[e].parentLocale, e === Se() && Se(e)) : j[e] != null && delete j[e]), j[e];
    }, s.locales = function() {
      return di(j);
    }, s.weekdaysShort = function(e, r, n) {
      return Ir(e, r, n, "weekdaysShort");
    }, s.normalizeUnits = _t, s.relativeTimeRounding = function(e) {
      return e === void 0 ? le : typeof e == "function" && (le = e, !0);
    }, s.relativeTimeThreshold = function(e, r) {
      return ni[e] !== void 0 && (r === void 0 ? ni[e] : (ni[e] = r, e === "s" && (ni.ss = r - 1), !0));
    }, s.calendarFormat = function(e, r) {
      return (e = e.diff(r, "days", !0)) < -6 ? "sameElse" : e < -1 ? "lastWeek" : e < 0 ? "lastDay" : e < 1 ? "sameDay" : e < 2 ? "nextDay" : e < 7 ? "nextWeek" : "sameElse";
    }, s.prototype = k, s.HTML5_FMT = { DATETIME_LOCAL: "YYYY-MM-DDTHH:mm", DATETIME_LOCAL_SECONDS: "YYYY-MM-DDTHH:mm:ss", DATETIME_LOCAL_MS: "YYYY-MM-DDTHH:mm:ss.SSS", DATE: "YYYY-MM-DD", TIME: "HH:mm", TIME_SECONDS: "HH:mm:ss", TIME_MS: "HH:mm:ss.SSS", WEEK: "GGGG-[W]WW", MONTH: "YYYY-MM" }, s;
  });
})(ms);
const ps = Xr, he = {
  trace: 0,
  debug: 1,
  info: 2,
  warn: 3,
  error: 4,
  fatal: 5
}, Mt = {
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
}, jc = function(t = "fatal") {
  let i = he.fatal;
  typeof t == "string" ? (t = t.toLowerCase(), t in he && (i = he[t])) : typeof t == "number" && (i = t), Mt.trace = () => {
  }, Mt.debug = () => {
  }, Mt.info = () => {
  }, Mt.warn = () => {
  }, Mt.error = () => {
  }, Mt.fatal = () => {
  }, i <= he.fatal && (Mt.fatal = console.error ? console.error.bind(console, Pt("FATAL"), "color: orange") : console.log.bind(console, "\x1B[35m", Pt("FATAL"))), i <= he.error && (Mt.error = console.error ? console.error.bind(console, Pt("ERROR"), "color: orange") : console.log.bind(console, "\x1B[31m", Pt("ERROR"))), i <= he.warn && (Mt.warn = console.warn ? console.warn.bind(console, Pt("WARN"), "color: orange") : console.log.bind(console, "\x1B[33m", Pt("WARN"))), i <= he.info && (Mt.info = console.info ? console.info.bind(console, Pt("INFO"), "color: lightblue") : console.log.bind(console, "\x1B[34m", Pt("INFO"))), i <= he.debug && (Mt.debug = console.debug ? console.debug.bind(console, Pt("DEBUG"), "color: lightgreen") : console.log.bind(console, "\x1B[32m", Pt("DEBUG"))), i <= he.trace && (Mt.trace = console.debug ? console.debug.bind(console, Pt("TRACE"), "color: lightgreen") : console.log.bind(console, "\x1B[32m", Pt("TRACE")));
}, Pt = (t) => `%c${ps().format("ss.SSS")} : ${t} : `;
var ys = { value: () => {
} };
function dn() {
  for (var t = 0, i = arguments.length, o = {}, s; t < i; ++t) {
    if (!(s = arguments[t] + "") || s in o || /[\s.]/.test(s))
      throw new Error("illegal type: " + s);
    o[s] = [];
  }
  return new er(o);
}
function er(t) {
  this._ = t;
}
function _s(t, i) {
  return t.trim().split(/^|\s+/).map(function(o) {
    var s = "", l = o.indexOf(".");
    if (l >= 0 && (s = o.slice(l + 1), o = o.slice(0, l)), o && !i.hasOwnProperty(o))
      throw new Error("unknown type: " + o);
    return { type: o, name: s };
  });
}
er.prototype = dn.prototype = {
  constructor: er,
  on: function(t, i) {
    var o = this._, s = _s(t + "", o), l, c = -1, u = s.length;
    if (arguments.length < 2) {
      for (; ++c < u; )
        if ((l = (t = s[c]).type) && (l = Cs(o[l], t.name)))
          return l;
      return;
    }
    if (i != null && typeof i != "function")
      throw new Error("invalid callback: " + i);
    for (; ++c < u; )
      if (l = (t = s[c]).type)
        o[l] = Wo(o[l], t.name, i);
      else if (i == null)
        for (l in o)
          o[l] = Wo(o[l], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, i = this._;
    for (var o in i)
      t[o] = i[o].slice();
    return new er(t);
  },
  call: function(t, i) {
    if ((l = arguments.length - 2) > 0)
      for (var o = new Array(l), s = 0, l, c; s < l; ++s)
        o[s] = arguments[s + 2];
    if (!this._.hasOwnProperty(t))
      throw new Error("unknown type: " + t);
    for (c = this._[t], s = 0, l = c.length; s < l; ++s)
      c[s].value.apply(i, o);
  },
  apply: function(t, i, o) {
    if (!this._.hasOwnProperty(t))
      throw new Error("unknown type: " + t);
    for (var s = this._[t], l = 0, c = s.length; l < c; ++l)
      s[l].value.apply(i, o);
  }
};
function Cs(t, i) {
  for (var o = 0, s = t.length, l; o < s; ++o)
    if ((l = t[o]).name === i)
      return l.value;
}
function Wo(t, i, o) {
  for (var s = 0, l = t.length; s < l; ++s)
    if (t[s].name === i) {
      t[s] = ys, t = t.slice(0, s).concat(t.slice(s + 1));
      break;
    }
  return o != null && t.push({ name: i, value: o }), t;
}
var Zr = "http://www.w3.org/1999/xhtml";
const zo = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Zr,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function pr(t) {
  var i = t += "", o = i.indexOf(":");
  return o >= 0 && (i = t.slice(0, o)) !== "xmlns" && (t = t.slice(o + 1)), zo.hasOwnProperty(i) ? { space: zo[i], local: t } : t;
}
function bs(t) {
  return function() {
    var i = this.ownerDocument, o = this.namespaceURI;
    return o === Zr && i.documentElement.namespaceURI === Zr ? i.createElement(t) : i.createElementNS(o, t);
  };
}
function ks(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function fn(t) {
  var i = pr(t);
  return (i.local ? ks : bs)(i);
}
function xs() {
}
function ho(t) {
  return t == null ? xs : function() {
    return this.querySelector(t);
  };
}
function Ss(t) {
  typeof t != "function" && (t = ho(t));
  for (var i = this._groups, o = i.length, s = new Array(o), l = 0; l < o; ++l)
    for (var c = i[l], u = c.length, g = s[l] = new Array(u), m, y, C = 0; C < u; ++C)
      (m = c[C]) && (y = t.call(m, m.__data__, C, c)) && ("__data__" in m && (y.__data__ = m.__data__), g[C] = y);
  return new Nt(s, this._parents);
}
function Ts(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function vs() {
  return [];
}
function gn(t) {
  return t == null ? vs : function() {
    return this.querySelectorAll(t);
  };
}
function ws(t) {
  return function() {
    return Ts(t.apply(this, arguments));
  };
}
function Bs(t) {
  typeof t == "function" ? t = ws(t) : t = gn(t);
  for (var i = this._groups, o = i.length, s = [], l = [], c = 0; c < o; ++c)
    for (var u = i[c], g = u.length, m, y = 0; y < g; ++y)
      (m = u[y]) && (s.push(t.call(m, m.__data__, y, u)), l.push(m));
  return new Nt(s, l);
}
function mn(t) {
  return function() {
    return this.matches(t);
  };
}
function pn(t) {
  return function(i) {
    return i.matches(t);
  };
}
var Ls = Array.prototype.find;
function Ms(t) {
  return function() {
    return Ls.call(this.children, t);
  };
}
function Fs() {
  return this.firstElementChild;
}
function Ds(t) {
  return this.select(t == null ? Fs : Ms(typeof t == "function" ? t : pn(t)));
}
var Os = Array.prototype.filter;
function Es() {
  return Array.from(this.children);
}
function As(t) {
  return function() {
    return Os.call(this.children, t);
  };
}
function Ns(t) {
  return this.selectAll(t == null ? Es : As(typeof t == "function" ? t : pn(t)));
}
function Rs(t) {
  typeof t != "function" && (t = mn(t));
  for (var i = this._groups, o = i.length, s = new Array(o), l = 0; l < o; ++l)
    for (var c = i[l], u = c.length, g = s[l] = [], m, y = 0; y < u; ++y)
      (m = c[y]) && t.call(m, m.__data__, y, c) && g.push(m);
  return new Nt(s, this._parents);
}
function yn(t) {
  return new Array(t.length);
}
function Is() {
  return new Nt(this._enter || this._groups.map(yn), this._parents);
}
function hr(t, i) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = i;
}
hr.prototype = {
  constructor: hr,
  appendChild: function(t) {
    return this._parent.insertBefore(t, this._next);
  },
  insertBefore: function(t, i) {
    return this._parent.insertBefore(t, i);
  },
  querySelector: function(t) {
    return this._parent.querySelector(t);
  },
  querySelectorAll: function(t) {
    return this._parent.querySelectorAll(t);
  }
};
function Ys(t) {
  return function() {
    return t;
  };
}
function Ps(t, i, o, s, l, c) {
  for (var u = 0, g, m = i.length, y = c.length; u < y; ++u)
    (g = i[u]) ? (g.__data__ = c[u], s[u] = g) : o[u] = new hr(t, c[u]);
  for (; u < m; ++u)
    (g = i[u]) && (l[u] = g);
}
function Ws(t, i, o, s, l, c, u) {
  var g, m, y = /* @__PURE__ */ new Map(), C = i.length, L = c.length, M = new Array(C), F;
  for (g = 0; g < C; ++g)
    (m = i[g]) && (M[g] = F = u.call(m, m.__data__, g, i) + "", y.has(F) ? l[g] = m : y.set(F, m));
  for (g = 0; g < L; ++g)
    F = u.call(t, c[g], g, c) + "", (m = y.get(F)) ? (s[g] = m, m.__data__ = c[g], y.delete(F)) : o[g] = new hr(t, c[g]);
  for (g = 0; g < C; ++g)
    (m = i[g]) && y.get(M[g]) === m && (l[g] = m);
}
function zs(t) {
  return t.__data__;
}
function Hs(t, i) {
  if (!arguments.length)
    return Array.from(this, zs);
  var o = i ? Ws : Ps, s = this._parents, l = this._groups;
  typeof t != "function" && (t = Ys(t));
  for (var c = l.length, u = new Array(c), g = new Array(c), m = new Array(c), y = 0; y < c; ++y) {
    var C = s[y], L = l[y], M = L.length, F = Us(t.call(C, C && C.__data__, y, s)), D = F.length, X = g[y] = new Array(D), ut = u[y] = new Array(D), Oe = m[y] = new Array(M);
    o(C, L, X, ut, Oe, F, i);
    for (var St = 0, Tt = 0, ot, Rt; St < D; ++St)
      if (ot = X[St]) {
        for (St >= Tt && (Tt = St + 1); !(Rt = ut[Tt]) && ++Tt < D; )
          ;
        ot._next = Rt || null;
      }
  }
  return u = new Nt(u, s), u._enter = g, u._exit = m, u;
}
function Us(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function qs() {
  return new Nt(this._exit || this._groups.map(yn), this._parents);
}
function $s(t, i, o) {
  var s = this.enter(), l = this, c = this.exit();
  return typeof t == "function" ? (s = t(s), s && (s = s.selection())) : s = s.append(t + ""), i != null && (l = i(l), l && (l = l.selection())), o == null ? c.remove() : o(c), s && l ? s.merge(l).order() : l;
}
function Gs(t) {
  for (var i = t.selection ? t.selection() : t, o = this._groups, s = i._groups, l = o.length, c = s.length, u = Math.min(l, c), g = new Array(l), m = 0; m < u; ++m)
    for (var y = o[m], C = s[m], L = y.length, M = g[m] = new Array(L), F, D = 0; D < L; ++D)
      (F = y[D] || C[D]) && (M[D] = F);
  for (; m < l; ++m)
    g[m] = o[m];
  return new Nt(g, this._parents);
}
function Vs() {
  for (var t = this._groups, i = -1, o = t.length; ++i < o; )
    for (var s = t[i], l = s.length - 1, c = s[l], u; --l >= 0; )
      (u = s[l]) && (c && u.compareDocumentPosition(c) ^ 4 && c.parentNode.insertBefore(u, c), c = u);
  return this;
}
function js(t) {
  t || (t = Xs);
  function i(L, M) {
    return L && M ? t(L.__data__, M.__data__) : !L - !M;
  }
  for (var o = this._groups, s = o.length, l = new Array(s), c = 0; c < s; ++c) {
    for (var u = o[c], g = u.length, m = l[c] = new Array(g), y, C = 0; C < g; ++C)
      (y = u[C]) && (m[C] = y);
    m.sort(i);
  }
  return new Nt(l, this._parents).order();
}
function Xs(t, i) {
  return t < i ? -1 : t > i ? 1 : t >= i ? 0 : NaN;
}
function Zs() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function Ks() {
  return Array.from(this);
}
function Js() {
  for (var t = this._groups, i = 0, o = t.length; i < o; ++i)
    for (var s = t[i], l = 0, c = s.length; l < c; ++l) {
      var u = s[l];
      if (u)
        return u;
    }
  return null;
}
function Qs() {
  let t = 0;
  for (const i of this)
    ++t;
  return t;
}
function ta() {
  return !this.node();
}
function ea(t) {
  for (var i = this._groups, o = 0, s = i.length; o < s; ++o)
    for (var l = i[o], c = 0, u = l.length, g; c < u; ++c)
      (g = l[c]) && t.call(g, g.__data__, c, l);
  return this;
}
function ia(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function ra(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function oa(t, i) {
  return function() {
    this.setAttribute(t, i);
  };
}
function na(t, i) {
  return function() {
    this.setAttributeNS(t.space, t.local, i);
  };
}
function sa(t, i) {
  return function() {
    var o = i.apply(this, arguments);
    o == null ? this.removeAttribute(t) : this.setAttribute(t, o);
  };
}
function aa(t, i) {
  return function() {
    var o = i.apply(this, arguments);
    o == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, o);
  };
}
function la(t, i) {
  var o = pr(t);
  if (arguments.length < 2) {
    var s = this.node();
    return o.local ? s.getAttributeNS(o.space, o.local) : s.getAttribute(o);
  }
  return this.each((i == null ? o.local ? ra : ia : typeof i == "function" ? o.local ? aa : sa : o.local ? na : oa)(o, i));
}
function _n(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function ha(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function ca(t, i, o) {
  return function() {
    this.style.setProperty(t, i, o);
  };
}
function ua(t, i, o) {
  return function() {
    var s = i.apply(this, arguments);
    s == null ? this.style.removeProperty(t) : this.style.setProperty(t, s, o);
  };
}
function da(t, i, o) {
  return arguments.length > 1 ? this.each((i == null ? ha : typeof i == "function" ? ua : ca)(t, i, o ?? "")) : hi(this.node(), t);
}
function hi(t, i) {
  return t.style.getPropertyValue(i) || _n(t).getComputedStyle(t, null).getPropertyValue(i);
}
function fa(t) {
  return function() {
    delete this[t];
  };
}
function ga(t, i) {
  return function() {
    this[t] = i;
  };
}
function ma(t, i) {
  return function() {
    var o = i.apply(this, arguments);
    o == null ? delete this[t] : this[t] = o;
  };
}
function pa(t, i) {
  return arguments.length > 1 ? this.each((i == null ? fa : typeof i == "function" ? ma : ga)(t, i)) : this.node()[t];
}
function Cn(t) {
  return t.trim().split(/^|\s+/);
}
function co(t) {
  return t.classList || new bn(t);
}
function bn(t) {
  this._node = t, this._names = Cn(t.getAttribute("class") || "");
}
bn.prototype = {
  add: function(t) {
    var i = this._names.indexOf(t);
    i < 0 && (this._names.push(t), this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function(t) {
    var i = this._names.indexOf(t);
    i >= 0 && (this._names.splice(i, 1), this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function(t) {
    return this._names.indexOf(t) >= 0;
  }
};
function kn(t, i) {
  for (var o = co(t), s = -1, l = i.length; ++s < l; )
    o.add(i[s]);
}
function xn(t, i) {
  for (var o = co(t), s = -1, l = i.length; ++s < l; )
    o.remove(i[s]);
}
function ya(t) {
  return function() {
    kn(this, t);
  };
}
function _a(t) {
  return function() {
    xn(this, t);
  };
}
function Ca(t, i) {
  return function() {
    (i.apply(this, arguments) ? kn : xn)(this, t);
  };
}
function ba(t, i) {
  var o = Cn(t + "");
  if (arguments.length < 2) {
    for (var s = co(this.node()), l = -1, c = o.length; ++l < c; )
      if (!s.contains(o[l]))
        return !1;
    return !0;
  }
  return this.each((typeof i == "function" ? Ca : i ? ya : _a)(o, i));
}
function ka() {
  this.textContent = "";
}
function xa(t) {
  return function() {
    this.textContent = t;
  };
}
function Sa(t) {
  return function() {
    var i = t.apply(this, arguments);
    this.textContent = i ?? "";
  };
}
function Ta(t) {
  return arguments.length ? this.each(t == null ? ka : (typeof t == "function" ? Sa : xa)(t)) : this.node().textContent;
}
function va() {
  this.innerHTML = "";
}
function wa(t) {
  return function() {
    this.innerHTML = t;
  };
}
function Ba(t) {
  return function() {
    var i = t.apply(this, arguments);
    this.innerHTML = i ?? "";
  };
}
function La(t) {
  return arguments.length ? this.each(t == null ? va : (typeof t == "function" ? Ba : wa)(t)) : this.node().innerHTML;
}
function Ma() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Fa() {
  return this.each(Ma);
}
function Da() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Oa() {
  return this.each(Da);
}
function Ea(t) {
  var i = typeof t == "function" ? t : fn(t);
  return this.select(function() {
    return this.appendChild(i.apply(this, arguments));
  });
}
function Aa() {
  return null;
}
function Na(t, i) {
  var o = typeof t == "function" ? t : fn(t), s = i == null ? Aa : typeof i == "function" ? i : ho(i);
  return this.select(function() {
    return this.insertBefore(o.apply(this, arguments), s.apply(this, arguments) || null);
  });
}
function Ra() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function Ia() {
  return this.each(Ra);
}
function Ya() {
  var t = this.cloneNode(!1), i = this.parentNode;
  return i ? i.insertBefore(t, this.nextSibling) : t;
}
function Pa() {
  var t = this.cloneNode(!0), i = this.parentNode;
  return i ? i.insertBefore(t, this.nextSibling) : t;
}
function Wa(t) {
  return this.select(t ? Pa : Ya);
}
function za(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function Ha(t) {
  return function(i) {
    t.call(this, i, this.__data__);
  };
}
function Ua(t) {
  return t.trim().split(/^|\s+/).map(function(i) {
    var o = "", s = i.indexOf(".");
    return s >= 0 && (o = i.slice(s + 1), i = i.slice(0, s)), { type: i, name: o };
  });
}
function qa(t) {
  return function() {
    var i = this.__on;
    if (i) {
      for (var o = 0, s = -1, l = i.length, c; o < l; ++o)
        c = i[o], (!t.type || c.type === t.type) && c.name === t.name ? this.removeEventListener(c.type, c.listener, c.options) : i[++s] = c;
      ++s ? i.length = s : delete this.__on;
    }
  };
}
function $a(t, i, o) {
  return function() {
    var s = this.__on, l, c = Ha(i);
    if (s) {
      for (var u = 0, g = s.length; u < g; ++u)
        if ((l = s[u]).type === t.type && l.name === t.name) {
          this.removeEventListener(l.type, l.listener, l.options), this.addEventListener(l.type, l.listener = c, l.options = o), l.value = i;
          return;
        }
    }
    this.addEventListener(t.type, c, o), l = { type: t.type, name: t.name, value: i, listener: c, options: o }, s ? s.push(l) : this.__on = [l];
  };
}
function Ga(t, i, o) {
  var s = Ua(t + ""), l, c = s.length, u;
  if (arguments.length < 2) {
    var g = this.node().__on;
    if (g) {
      for (var m = 0, y = g.length, C; m < y; ++m)
        for (l = 0, C = g[m]; l < c; ++l)
          if ((u = s[l]).type === C.type && u.name === C.name)
            return C.value;
    }
    return;
  }
  for (g = i ? $a : qa, l = 0; l < c; ++l)
    this.each(g(s[l], i, o));
  return this;
}
function Sn(t, i, o) {
  var s = _n(t), l = s.CustomEvent;
  typeof l == "function" ? l = new l(i, o) : (l = s.document.createEvent("Event"), o ? (l.initEvent(i, o.bubbles, o.cancelable), l.detail = o.detail) : l.initEvent(i, !1, !1)), t.dispatchEvent(l);
}
function Va(t, i) {
  return function() {
    return Sn(this, t, i);
  };
}
function ja(t, i) {
  return function() {
    return Sn(this, t, i.apply(this, arguments));
  };
}
function Xa(t, i) {
  return this.each((typeof i == "function" ? ja : Va)(t, i));
}
function* Za() {
  for (var t = this._groups, i = 0, o = t.length; i < o; ++i)
    for (var s = t[i], l = 0, c = s.length, u; l < c; ++l)
      (u = s[l]) && (yield u);
}
var Tn = [null];
function Nt(t, i) {
  this._groups = t, this._parents = i;
}
function Di() {
  return new Nt([[document.documentElement]], Tn);
}
function Ka() {
  return this;
}
Nt.prototype = Di.prototype = {
  constructor: Nt,
  select: Ss,
  selectAll: Bs,
  selectChild: Ds,
  selectChildren: Ns,
  filter: Rs,
  data: Hs,
  enter: Is,
  exit: qs,
  join: $s,
  merge: Gs,
  selection: Ka,
  order: Vs,
  sort: js,
  call: Zs,
  nodes: Ks,
  node: Js,
  size: Qs,
  empty: ta,
  each: ea,
  attr: la,
  style: da,
  property: pa,
  classed: ba,
  text: Ta,
  html: La,
  raise: Fa,
  lower: Oa,
  append: Ea,
  insert: Na,
  remove: Ia,
  clone: Wa,
  datum: za,
  on: Ga,
  dispatch: Xa,
  [Symbol.iterator]: Za
};
function Xc(t) {
  return typeof t == "string" ? new Nt([[document.querySelector(t)]], [document.documentElement]) : new Nt([[t]], Tn);
}
function uo(t, i, o) {
  t.prototype = i.prototype = o, o.constructor = t;
}
function vn(t, i) {
  var o = Object.create(t.prototype);
  for (var s in i)
    o[s] = i[s];
  return o;
}
function Oi() {
}
var Bi = 0.7, cr = 1 / Bi, ai = "\\s*([+-]?\\d+)\\s*", Li = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", te = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", Ja = /^#([0-9a-f]{3,8})$/, Qa = new RegExp(`^rgb\\(${ai},${ai},${ai}\\)$`), tl = new RegExp(`^rgb\\(${te},${te},${te}\\)$`), el = new RegExp(`^rgba\\(${ai},${ai},${ai},${Li}\\)$`), il = new RegExp(`^rgba\\(${te},${te},${te},${Li}\\)$`), rl = new RegExp(`^hsl\\(${Li},${te},${te}\\)$`), ol = new RegExp(`^hsla\\(${Li},${te},${te},${Li}\\)$`), Ho = {
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
uo(Oi, Mi, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Uo,
  // Deprecated! Use color.formatHex.
  formatHex: Uo,
  formatHex8: nl,
  formatHsl: sl,
  formatRgb: qo,
  toString: qo
});
function Uo() {
  return this.rgb().formatHex();
}
function nl() {
  return this.rgb().formatHex8();
}
function sl() {
  return wn(this).formatHsl();
}
function qo() {
  return this.rgb().formatRgb();
}
function Mi(t) {
  var i, o;
  return t = (t + "").trim().toLowerCase(), (i = Ja.exec(t)) ? (o = i[1].length, i = parseInt(i[1], 16), o === 6 ? $o(i) : o === 3 ? new Ot(i >> 8 & 15 | i >> 4 & 240, i >> 4 & 15 | i & 240, (i & 15) << 4 | i & 15, 1) : o === 8 ? ji(i >> 24 & 255, i >> 16 & 255, i >> 8 & 255, (i & 255) / 255) : o === 4 ? ji(i >> 12 & 15 | i >> 8 & 240, i >> 8 & 15 | i >> 4 & 240, i >> 4 & 15 | i & 240, ((i & 15) << 4 | i & 15) / 255) : null) : (i = Qa.exec(t)) ? new Ot(i[1], i[2], i[3], 1) : (i = tl.exec(t)) ? new Ot(i[1] * 255 / 100, i[2] * 255 / 100, i[3] * 255 / 100, 1) : (i = el.exec(t)) ? ji(i[1], i[2], i[3], i[4]) : (i = il.exec(t)) ? ji(i[1] * 255 / 100, i[2] * 255 / 100, i[3] * 255 / 100, i[4]) : (i = rl.exec(t)) ? jo(i[1], i[2] / 100, i[3] / 100, 1) : (i = ol.exec(t)) ? jo(i[1], i[2] / 100, i[3] / 100, i[4]) : Ho.hasOwnProperty(t) ? $o(Ho[t]) : t === "transparent" ? new Ot(NaN, NaN, NaN, 0) : null;
}
function $o(t) {
  return new Ot(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function ji(t, i, o, s) {
  return s <= 0 && (t = i = o = NaN), new Ot(t, i, o, s);
}
function al(t) {
  return t instanceof Oi || (t = Mi(t)), t ? (t = t.rgb(), new Ot(t.r, t.g, t.b, t.opacity)) : new Ot();
}
function Kr(t, i, o, s) {
  return arguments.length === 1 ? al(t) : new Ot(t, i, o, s ?? 1);
}
function Ot(t, i, o, s) {
  this.r = +t, this.g = +i, this.b = +o, this.opacity = +s;
}
uo(Ot, Kr, vn(Oi, {
  brighter(t) {
    return t = t == null ? cr : Math.pow(cr, t), new Ot(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Bi : Math.pow(Bi, t), new Ot(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Ot($e(this.r), $e(this.g), $e(this.b), ur(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Go,
  // Deprecated! Use color.formatHex.
  formatHex: Go,
  formatHex8: ll,
  formatRgb: Vo,
  toString: Vo
}));
function Go() {
  return `#${qe(this.r)}${qe(this.g)}${qe(this.b)}`;
}
function ll() {
  return `#${qe(this.r)}${qe(this.g)}${qe(this.b)}${qe((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Vo() {
  const t = ur(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${$e(this.r)}, ${$e(this.g)}, ${$e(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function ur(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function $e(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function qe(t) {
  return t = $e(t), (t < 16 ? "0" : "") + t.toString(16);
}
function jo(t, i, o, s) {
  return s <= 0 ? t = i = o = NaN : o <= 0 || o >= 1 ? t = i = NaN : i <= 0 && (t = NaN), new Zt(t, i, o, s);
}
function wn(t) {
  if (t instanceof Zt)
    return new Zt(t.h, t.s, t.l, t.opacity);
  if (t instanceof Oi || (t = Mi(t)), !t)
    return new Zt();
  if (t instanceof Zt)
    return t;
  t = t.rgb();
  var i = t.r / 255, o = t.g / 255, s = t.b / 255, l = Math.min(i, o, s), c = Math.max(i, o, s), u = NaN, g = c - l, m = (c + l) / 2;
  return g ? (i === c ? u = (o - s) / g + (o < s) * 6 : o === c ? u = (s - i) / g + 2 : u = (i - o) / g + 4, g /= m < 0.5 ? c + l : 2 - c - l, u *= 60) : g = m > 0 && m < 1 ? 0 : u, new Zt(u, g, m, t.opacity);
}
function hl(t, i, o, s) {
  return arguments.length === 1 ? wn(t) : new Zt(t, i, o, s ?? 1);
}
function Zt(t, i, o, s) {
  this.h = +t, this.s = +i, this.l = +o, this.opacity = +s;
}
uo(Zt, hl, vn(Oi, {
  brighter(t) {
    return t = t == null ? cr : Math.pow(cr, t), new Zt(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Bi : Math.pow(Bi, t), new Zt(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, i = isNaN(t) || isNaN(this.s) ? 0 : this.s, o = this.l, s = o + (o < 0.5 ? o : 1 - o) * i, l = 2 * o - s;
    return new Ot(
      zr(t >= 240 ? t - 240 : t + 120, l, s),
      zr(t, l, s),
      zr(t < 120 ? t + 240 : t - 120, l, s),
      this.opacity
    );
  },
  clamp() {
    return new Zt(Xo(this.h), Xi(this.s), Xi(this.l), ur(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = ur(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${Xo(this.h)}, ${Xi(this.s) * 100}%, ${Xi(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function Xo(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function Xi(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function zr(t, i, o) {
  return (t < 60 ? i + (o - i) * t / 60 : t < 180 ? o : t < 240 ? i + (o - i) * (240 - t) / 60 : i) * 255;
}
const fo = (t) => () => t;
function Bn(t, i) {
  return function(o) {
    return t + o * i;
  };
}
function cl(t, i, o) {
  return t = Math.pow(t, o), i = Math.pow(i, o) - t, o = 1 / o, function(s) {
    return Math.pow(t + s * i, o);
  };
}
function Zc(t, i) {
  var o = i - t;
  return o ? Bn(t, o > 180 || o < -180 ? o - 360 * Math.round(o / 360) : o) : fo(isNaN(t) ? i : t);
}
function ul(t) {
  return (t = +t) == 1 ? Ln : function(i, o) {
    return o - i ? cl(i, o, t) : fo(isNaN(i) ? o : i);
  };
}
function Ln(t, i) {
  var o = i - t;
  return o ? Bn(t, o) : fo(isNaN(t) ? i : t);
}
const Zo = function t(i) {
  var o = ul(i);
  function s(l, c) {
    var u = o((l = Kr(l)).r, (c = Kr(c)).r), g = o(l.g, c.g), m = o(l.b, c.b), y = Ln(l.opacity, c.opacity);
    return function(C) {
      return l.r = u(C), l.g = g(C), l.b = m(C), l.opacity = y(C), l + "";
    };
  }
  return s.gamma = t, s;
}(1);
function Me(t, i) {
  return t = +t, i = +i, function(o) {
    return t * (1 - o) + i * o;
  };
}
var Jr = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Hr = new RegExp(Jr.source, "g");
function dl(t) {
  return function() {
    return t;
  };
}
function fl(t) {
  return function(i) {
    return t(i) + "";
  };
}
function gl(t, i) {
  var o = Jr.lastIndex = Hr.lastIndex = 0, s, l, c, u = -1, g = [], m = [];
  for (t = t + "", i = i + ""; (s = Jr.exec(t)) && (l = Hr.exec(i)); )
    (c = l.index) > o && (c = i.slice(o, c), g[u] ? g[u] += c : g[++u] = c), (s = s[0]) === (l = l[0]) ? g[u] ? g[u] += l : g[++u] = l : (g[++u] = null, m.push({ i: u, x: Me(s, l) })), o = Hr.lastIndex;
  return o < i.length && (c = i.slice(o), g[u] ? g[u] += c : g[++u] = c), g.length < 2 ? m[0] ? fl(m[0].x) : dl(i) : (i = m.length, function(y) {
    for (var C = 0, L; C < i; ++C)
      g[(L = m[C]).i] = L.x(y);
    return g.join("");
  });
}
var Ko = 180 / Math.PI, Qr = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function Mn(t, i, o, s, l, c) {
  var u, g, m;
  return (u = Math.sqrt(t * t + i * i)) && (t /= u, i /= u), (m = t * o + i * s) && (o -= t * m, s -= i * m), (g = Math.sqrt(o * o + s * s)) && (o /= g, s /= g, m /= g), t * s < i * o && (t = -t, i = -i, m = -m, u = -u), {
    translateX: l,
    translateY: c,
    rotate: Math.atan2(i, t) * Ko,
    skewX: Math.atan(m) * Ko,
    scaleX: u,
    scaleY: g
  };
}
var Zi;
function ml(t) {
  const i = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return i.isIdentity ? Qr : Mn(i.a, i.b, i.c, i.d, i.e, i.f);
}
function pl(t) {
  return t == null || (Zi || (Zi = document.createElementNS("http://www.w3.org/2000/svg", "g")), Zi.setAttribute("transform", t), !(t = Zi.transform.baseVal.consolidate())) ? Qr : (t = t.matrix, Mn(t.a, t.b, t.c, t.d, t.e, t.f));
}
function Fn(t, i, o, s) {
  function l(y) {
    return y.length ? y.pop() + " " : "";
  }
  function c(y, C, L, M, F, D) {
    if (y !== L || C !== M) {
      var X = F.push("translate(", null, i, null, o);
      D.push({ i: X - 4, x: Me(y, L) }, { i: X - 2, x: Me(C, M) });
    } else
      (L || M) && F.push("translate(" + L + i + M + o);
  }
  function u(y, C, L, M) {
    y !== C ? (y - C > 180 ? C += 360 : C - y > 180 && (y += 360), M.push({ i: L.push(l(L) + "rotate(", null, s) - 2, x: Me(y, C) })) : C && L.push(l(L) + "rotate(" + C + s);
  }
  function g(y, C, L, M) {
    y !== C ? M.push({ i: L.push(l(L) + "skewX(", null, s) - 2, x: Me(y, C) }) : C && L.push(l(L) + "skewX(" + C + s);
  }
  function m(y, C, L, M, F, D) {
    if (y !== L || C !== M) {
      var X = F.push(l(F) + "scale(", null, ",", null, ")");
      D.push({ i: X - 4, x: Me(y, L) }, { i: X - 2, x: Me(C, M) });
    } else
      (L !== 1 || M !== 1) && F.push(l(F) + "scale(" + L + "," + M + ")");
  }
  return function(y, C) {
    var L = [], M = [];
    return y = t(y), C = t(C), c(y.translateX, y.translateY, C.translateX, C.translateY, L, M), u(y.rotate, C.rotate, L, M), g(y.skewX, C.skewX, L, M), m(y.scaleX, y.scaleY, C.scaleX, C.scaleY, L, M), y = C = null, function(F) {
      for (var D = -1, X = M.length, ut; ++D < X; )
        L[(ut = M[D]).i] = ut.x(F);
      return L.join("");
    };
  };
}
var yl = Fn(ml, "px, ", "px)", "deg)"), _l = Fn(pl, ", ", ")", ")"), ci = 0, ki = 0, Ci = 0, Dn = 1e3, dr, xi, fr = 0, Ge = 0, yr = 0, Fi = typeof performance == "object" && performance.now ? performance : Date, On = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function go() {
  return Ge || (On(Cl), Ge = Fi.now() + yr);
}
function Cl() {
  Ge = 0;
}
function gr() {
  this._call = this._time = this._next = null;
}
gr.prototype = En.prototype = {
  constructor: gr,
  restart: function(t, i, o) {
    if (typeof t != "function")
      throw new TypeError("callback is not a function");
    o = (o == null ? go() : +o) + (i == null ? 0 : +i), !this._next && xi !== this && (xi ? xi._next = this : dr = this, xi = this), this._call = t, this._time = o, to();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, to());
  }
};
function En(t, i, o) {
  var s = new gr();
  return s.restart(t, i, o), s;
}
function bl() {
  go(), ++ci;
  for (var t = dr, i; t; )
    (i = Ge - t._time) >= 0 && t._call.call(void 0, i), t = t._next;
  --ci;
}
function Jo() {
  Ge = (fr = Fi.now()) + yr, ci = ki = 0;
  try {
    bl();
  } finally {
    ci = 0, xl(), Ge = 0;
  }
}
function kl() {
  var t = Fi.now(), i = t - fr;
  i > Dn && (yr -= i, fr = t);
}
function xl() {
  for (var t, i = dr, o, s = 1 / 0; i; )
    i._call ? (s > i._time && (s = i._time), t = i, i = i._next) : (o = i._next, i._next = null, i = t ? t._next = o : dr = o);
  xi = t, to(s);
}
function to(t) {
  if (!ci) {
    ki && (ki = clearTimeout(ki));
    var i = t - Ge;
    i > 24 ? (t < 1 / 0 && (ki = setTimeout(Jo, t - Fi.now() - yr)), Ci && (Ci = clearInterval(Ci))) : (Ci || (fr = Fi.now(), Ci = setInterval(kl, Dn)), ci = 1, On(Jo));
  }
}
function Qo(t, i, o) {
  var s = new gr();
  return i = i == null ? 0 : +i, s.restart((l) => {
    s.stop(), t(l + i);
  }, i, o), s;
}
var Sl = dn("start", "end", "cancel", "interrupt"), Tl = [], An = 0, tn = 1, eo = 2, ir = 3, en = 4, io = 5, rr = 6;
function _r(t, i, o, s, l, c) {
  var u = t.__transition;
  if (!u)
    t.__transition = {};
  else if (o in u)
    return;
  vl(t, o, {
    name: i,
    index: s,
    // For context during callback.
    group: l,
    // For context during callback.
    on: Sl,
    tween: Tl,
    time: c.time,
    delay: c.delay,
    duration: c.duration,
    ease: c.ease,
    timer: null,
    state: An
  });
}
function mo(t, i) {
  var o = Jt(t, i);
  if (o.state > An)
    throw new Error("too late; already scheduled");
  return o;
}
function ee(t, i) {
  var o = Jt(t, i);
  if (o.state > ir)
    throw new Error("too late; already running");
  return o;
}
function Jt(t, i) {
  var o = t.__transition;
  if (!o || !(o = o[i]))
    throw new Error("transition not found");
  return o;
}
function vl(t, i, o) {
  var s = t.__transition, l;
  s[i] = o, o.timer = En(c, 0, o.time);
  function c(y) {
    o.state = tn, o.timer.restart(u, o.delay, o.time), o.delay <= y && u(y - o.delay);
  }
  function u(y) {
    var C, L, M, F;
    if (o.state !== tn)
      return m();
    for (C in s)
      if (F = s[C], F.name === o.name) {
        if (F.state === ir)
          return Qo(u);
        F.state === en ? (F.state = rr, F.timer.stop(), F.on.call("interrupt", t, t.__data__, F.index, F.group), delete s[C]) : +C < i && (F.state = rr, F.timer.stop(), F.on.call("cancel", t, t.__data__, F.index, F.group), delete s[C]);
      }
    if (Qo(function() {
      o.state === ir && (o.state = en, o.timer.restart(g, o.delay, o.time), g(y));
    }), o.state = eo, o.on.call("start", t, t.__data__, o.index, o.group), o.state === eo) {
      for (o.state = ir, l = new Array(M = o.tween.length), C = 0, L = -1; C < M; ++C)
        (F = o.tween[C].value.call(t, t.__data__, o.index, o.group)) && (l[++L] = F);
      l.length = L + 1;
    }
  }
  function g(y) {
    for (var C = y < o.duration ? o.ease.call(null, y / o.duration) : (o.timer.restart(m), o.state = io, 1), L = -1, M = l.length; ++L < M; )
      l[L].call(t, C);
    o.state === io && (o.on.call("end", t, t.__data__, o.index, o.group), m());
  }
  function m() {
    o.state = rr, o.timer.stop(), delete s[i];
    for (var y in s)
      return;
    delete t.__transition;
  }
}
function wl(t, i) {
  var o = t.__transition, s, l, c = !0, u;
  if (o) {
    i = i == null ? null : i + "";
    for (u in o) {
      if ((s = o[u]).name !== i) {
        c = !1;
        continue;
      }
      l = s.state > eo && s.state < io, s.state = rr, s.timer.stop(), s.on.call(l ? "interrupt" : "cancel", t, t.__data__, s.index, s.group), delete o[u];
    }
    c && delete t.__transition;
  }
}
function Bl(t) {
  return this.each(function() {
    wl(this, t);
  });
}
function Ll(t, i) {
  var o, s;
  return function() {
    var l = ee(this, t), c = l.tween;
    if (c !== o) {
      s = o = c;
      for (var u = 0, g = s.length; u < g; ++u)
        if (s[u].name === i) {
          s = s.slice(), s.splice(u, 1);
          break;
        }
    }
    l.tween = s;
  };
}
function Ml(t, i, o) {
  var s, l;
  if (typeof o != "function")
    throw new Error();
  return function() {
    var c = ee(this, t), u = c.tween;
    if (u !== s) {
      l = (s = u).slice();
      for (var g = { name: i, value: o }, m = 0, y = l.length; m < y; ++m)
        if (l[m].name === i) {
          l[m] = g;
          break;
        }
      m === y && l.push(g);
    }
    c.tween = l;
  };
}
function Fl(t, i) {
  var o = this._id;
  if (t += "", arguments.length < 2) {
    for (var s = Jt(this.node(), o).tween, l = 0, c = s.length, u; l < c; ++l)
      if ((u = s[l]).name === t)
        return u.value;
    return null;
  }
  return this.each((i == null ? Ll : Ml)(o, t, i));
}
function po(t, i, o) {
  var s = t._id;
  return t.each(function() {
    var l = ee(this, s);
    (l.value || (l.value = {}))[i] = o.apply(this, arguments);
  }), function(l) {
    return Jt(l, s).value[i];
  };
}
function Nn(t, i) {
  var o;
  return (typeof i == "number" ? Me : i instanceof Mi ? Zo : (o = Mi(i)) ? (i = o, Zo) : gl)(t, i);
}
function Dl(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Ol(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function El(t, i, o) {
  var s, l = o + "", c;
  return function() {
    var u = this.getAttribute(t);
    return u === l ? null : u === s ? c : c = i(s = u, o);
  };
}
function Al(t, i, o) {
  var s, l = o + "", c;
  return function() {
    var u = this.getAttributeNS(t.space, t.local);
    return u === l ? null : u === s ? c : c = i(s = u, o);
  };
}
function Nl(t, i, o) {
  var s, l, c;
  return function() {
    var u, g = o(this), m;
    return g == null ? void this.removeAttribute(t) : (u = this.getAttribute(t), m = g + "", u === m ? null : u === s && m === l ? c : (l = m, c = i(s = u, g)));
  };
}
function Rl(t, i, o) {
  var s, l, c;
  return function() {
    var u, g = o(this), m;
    return g == null ? void this.removeAttributeNS(t.space, t.local) : (u = this.getAttributeNS(t.space, t.local), m = g + "", u === m ? null : u === s && m === l ? c : (l = m, c = i(s = u, g)));
  };
}
function Il(t, i) {
  var o = pr(t), s = o === "transform" ? _l : Nn;
  return this.attrTween(t, typeof i == "function" ? (o.local ? Rl : Nl)(o, s, po(this, "attr." + t, i)) : i == null ? (o.local ? Ol : Dl)(o) : (o.local ? Al : El)(o, s, i));
}
function Yl(t, i) {
  return function(o) {
    this.setAttribute(t, i.call(this, o));
  };
}
function Pl(t, i) {
  return function(o) {
    this.setAttributeNS(t.space, t.local, i.call(this, o));
  };
}
function Wl(t, i) {
  var o, s;
  function l() {
    var c = i.apply(this, arguments);
    return c !== s && (o = (s = c) && Pl(t, c)), o;
  }
  return l._value = i, l;
}
function zl(t, i) {
  var o, s;
  function l() {
    var c = i.apply(this, arguments);
    return c !== s && (o = (s = c) && Yl(t, c)), o;
  }
  return l._value = i, l;
}
function Hl(t, i) {
  var o = "attr." + t;
  if (arguments.length < 2)
    return (o = this.tween(o)) && o._value;
  if (i == null)
    return this.tween(o, null);
  if (typeof i != "function")
    throw new Error();
  var s = pr(t);
  return this.tween(o, (s.local ? Wl : zl)(s, i));
}
function Ul(t, i) {
  return function() {
    mo(this, t).delay = +i.apply(this, arguments);
  };
}
function ql(t, i) {
  return i = +i, function() {
    mo(this, t).delay = i;
  };
}
function $l(t) {
  var i = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Ul : ql)(i, t)) : Jt(this.node(), i).delay;
}
function Gl(t, i) {
  return function() {
    ee(this, t).duration = +i.apply(this, arguments);
  };
}
function Vl(t, i) {
  return i = +i, function() {
    ee(this, t).duration = i;
  };
}
function jl(t) {
  var i = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Gl : Vl)(i, t)) : Jt(this.node(), i).duration;
}
function Xl(t, i) {
  if (typeof i != "function")
    throw new Error();
  return function() {
    ee(this, t).ease = i;
  };
}
function Zl(t) {
  var i = this._id;
  return arguments.length ? this.each(Xl(i, t)) : Jt(this.node(), i).ease;
}
function Kl(t, i) {
  return function() {
    var o = i.apply(this, arguments);
    if (typeof o != "function")
      throw new Error();
    ee(this, t).ease = o;
  };
}
function Jl(t) {
  if (typeof t != "function")
    throw new Error();
  return this.each(Kl(this._id, t));
}
function Ql(t) {
  typeof t != "function" && (t = mn(t));
  for (var i = this._groups, o = i.length, s = new Array(o), l = 0; l < o; ++l)
    for (var c = i[l], u = c.length, g = s[l] = [], m, y = 0; y < u; ++y)
      (m = c[y]) && t.call(m, m.__data__, y, c) && g.push(m);
  return new ue(s, this._parents, this._name, this._id);
}
function th(t) {
  if (t._id !== this._id)
    throw new Error();
  for (var i = this._groups, o = t._groups, s = i.length, l = o.length, c = Math.min(s, l), u = new Array(s), g = 0; g < c; ++g)
    for (var m = i[g], y = o[g], C = m.length, L = u[g] = new Array(C), M, F = 0; F < C; ++F)
      (M = m[F] || y[F]) && (L[F] = M);
  for (; g < s; ++g)
    u[g] = i[g];
  return new ue(u, this._parents, this._name, this._id);
}
function eh(t) {
  return (t + "").trim().split(/^|\s+/).every(function(i) {
    var o = i.indexOf(".");
    return o >= 0 && (i = i.slice(0, o)), !i || i === "start";
  });
}
function ih(t, i, o) {
  var s, l, c = eh(i) ? mo : ee;
  return function() {
    var u = c(this, t), g = u.on;
    g !== s && (l = (s = g).copy()).on(i, o), u.on = l;
  };
}
function rh(t, i) {
  var o = this._id;
  return arguments.length < 2 ? Jt(this.node(), o).on.on(t) : this.each(ih(o, t, i));
}
function oh(t) {
  return function() {
    var i = this.parentNode;
    for (var o in this.__transition)
      if (+o !== t)
        return;
    i && i.removeChild(this);
  };
}
function nh() {
  return this.on("end.remove", oh(this._id));
}
function sh(t) {
  var i = this._name, o = this._id;
  typeof t != "function" && (t = ho(t));
  for (var s = this._groups, l = s.length, c = new Array(l), u = 0; u < l; ++u)
    for (var g = s[u], m = g.length, y = c[u] = new Array(m), C, L, M = 0; M < m; ++M)
      (C = g[M]) && (L = t.call(C, C.__data__, M, g)) && ("__data__" in C && (L.__data__ = C.__data__), y[M] = L, _r(y[M], i, o, M, y, Jt(C, o)));
  return new ue(c, this._parents, i, o);
}
function ah(t) {
  var i = this._name, o = this._id;
  typeof t != "function" && (t = gn(t));
  for (var s = this._groups, l = s.length, c = [], u = [], g = 0; g < l; ++g)
    for (var m = s[g], y = m.length, C, L = 0; L < y; ++L)
      if (C = m[L]) {
        for (var M = t.call(C, C.__data__, L, m), F, D = Jt(C, o), X = 0, ut = M.length; X < ut; ++X)
          (F = M[X]) && _r(F, i, o, X, M, D);
        c.push(M), u.push(C);
      }
  return new ue(c, u, i, o);
}
var lh = Di.prototype.constructor;
function hh() {
  return new lh(this._groups, this._parents);
}
function ch(t, i) {
  var o, s, l;
  return function() {
    var c = hi(this, t), u = (this.style.removeProperty(t), hi(this, t));
    return c === u ? null : c === o && u === s ? l : l = i(o = c, s = u);
  };
}
function Rn(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function uh(t, i, o) {
  var s, l = o + "", c;
  return function() {
    var u = hi(this, t);
    return u === l ? null : u === s ? c : c = i(s = u, o);
  };
}
function dh(t, i, o) {
  var s, l, c;
  return function() {
    var u = hi(this, t), g = o(this), m = g + "";
    return g == null && (m = g = (this.style.removeProperty(t), hi(this, t))), u === m ? null : u === s && m === l ? c : (l = m, c = i(s = u, g));
  };
}
function fh(t, i) {
  var o, s, l, c = "style." + i, u = "end." + c, g;
  return function() {
    var m = ee(this, t), y = m.on, C = m.value[c] == null ? g || (g = Rn(i)) : void 0;
    (y !== o || l !== C) && (s = (o = y).copy()).on(u, l = C), m.on = s;
  };
}
function gh(t, i, o) {
  var s = (t += "") == "transform" ? yl : Nn;
  return i == null ? this.styleTween(t, ch(t, s)).on("end.style." + t, Rn(t)) : typeof i == "function" ? this.styleTween(t, dh(t, s, po(this, "style." + t, i))).each(fh(this._id, t)) : this.styleTween(t, uh(t, s, i), o).on("end.style." + t, null);
}
function mh(t, i, o) {
  return function(s) {
    this.style.setProperty(t, i.call(this, s), o);
  };
}
function ph(t, i, o) {
  var s, l;
  function c() {
    var u = i.apply(this, arguments);
    return u !== l && (s = (l = u) && mh(t, u, o)), s;
  }
  return c._value = i, c;
}
function yh(t, i, o) {
  var s = "style." + (t += "");
  if (arguments.length < 2)
    return (s = this.tween(s)) && s._value;
  if (i == null)
    return this.tween(s, null);
  if (typeof i != "function")
    throw new Error();
  return this.tween(s, ph(t, i, o ?? ""));
}
function _h(t) {
  return function() {
    this.textContent = t;
  };
}
function Ch(t) {
  return function() {
    var i = t(this);
    this.textContent = i ?? "";
  };
}
function bh(t) {
  return this.tween("text", typeof t == "function" ? Ch(po(this, "text", t)) : _h(t == null ? "" : t + ""));
}
function kh(t) {
  return function(i) {
    this.textContent = t.call(this, i);
  };
}
function xh(t) {
  var i, o;
  function s() {
    var l = t.apply(this, arguments);
    return l !== o && (i = (o = l) && kh(l)), i;
  }
  return s._value = t, s;
}
function Sh(t) {
  var i = "text";
  if (arguments.length < 1)
    return (i = this.tween(i)) && i._value;
  if (t == null)
    return this.tween(i, null);
  if (typeof t != "function")
    throw new Error();
  return this.tween(i, xh(t));
}
function Th() {
  for (var t = this._name, i = this._id, o = In(), s = this._groups, l = s.length, c = 0; c < l; ++c)
    for (var u = s[c], g = u.length, m, y = 0; y < g; ++y)
      if (m = u[y]) {
        var C = Jt(m, i);
        _r(m, t, o, y, u, {
          time: C.time + C.delay + C.duration,
          delay: 0,
          duration: C.duration,
          ease: C.ease
        });
      }
  return new ue(s, this._parents, t, o);
}
function vh() {
  var t, i, o = this, s = o._id, l = o.size();
  return new Promise(function(c, u) {
    var g = { value: u }, m = { value: function() {
      --l === 0 && c();
    } };
    o.each(function() {
      var y = ee(this, s), C = y.on;
      C !== t && (i = (t = C).copy(), i._.cancel.push(g), i._.interrupt.push(g), i._.end.push(m)), y.on = i;
    }), l === 0 && c();
  });
}
var wh = 0;
function ue(t, i, o, s) {
  this._groups = t, this._parents = i, this._name = o, this._id = s;
}
function In() {
  return ++wh;
}
var ce = Di.prototype;
ue.prototype = {
  constructor: ue,
  select: sh,
  selectAll: ah,
  selectChild: ce.selectChild,
  selectChildren: ce.selectChildren,
  filter: Ql,
  merge: th,
  selection: hh,
  transition: Th,
  call: ce.call,
  nodes: ce.nodes,
  node: ce.node,
  size: ce.size,
  empty: ce.empty,
  each: ce.each,
  on: rh,
  attr: Il,
  attrTween: Hl,
  style: gh,
  styleTween: yh,
  text: bh,
  textTween: Sh,
  remove: nh,
  tween: Fl,
  delay: $l,
  duration: jl,
  ease: Zl,
  easeVarying: Jl,
  end: vh,
  [Symbol.iterator]: ce[Symbol.iterator]
};
function Bh(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var Lh = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: Bh
};
function Mh(t, i) {
  for (var o; !(o = t.__transition) || !(o = o[i]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${i} not found`);
  return o;
}
function Fh(t) {
  var i, o;
  t instanceof ue ? (i = t._id, t = t._name) : (i = In(), (o = Lh).time = go(), t = t == null ? null : t + "");
  for (var s = this._groups, l = s.length, c = 0; c < l; ++c)
    for (var u = s[c], g = u.length, m, y = 0; y < g; ++y)
      (m = u[y]) && _r(m, t, i, y, u, o || Mh(m, i));
  return new ue(s, this._parents, t, i);
}
Di.prototype.interrupt = Bl;
Di.prototype.transition = Fh;
function Si(t, i, o) {
  this.k = t, this.x = i, this.y = o;
}
Si.prototype = {
  constructor: Si,
  scale: function(t) {
    return t === 1 ? this : new Si(this.k * t, this.x, this.y);
  },
  translate: function(t, i) {
    return t === 0 & i === 0 ? this : new Si(this.k, this.x + this.k * t, this.y + this.k * i);
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
Si.prototype;
/*! @license DOMPurify 2.4.3 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/2.4.3/LICENSE */
function Fe(t) {
  return Fe = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(i) {
    return typeof i;
  } : function(i) {
    return i && typeof Symbol == "function" && i.constructor === Symbol && i !== Symbol.prototype ? "symbol" : typeof i;
  }, Fe(t);
}
function ro(t, i) {
  return ro = Object.setPrototypeOf || function(s, l) {
    return s.__proto__ = l, s;
  }, ro(t, i);
}
function Dh() {
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
function or(t, i, o) {
  return Dh() ? or = Reflect.construct : or = function(l, c, u) {
    var g = [null];
    g.push.apply(g, c);
    var m = Function.bind.apply(l, g), y = new m();
    return u && ro(y, u.prototype), y;
  }, or.apply(null, arguments);
}
function Xt(t) {
  return Oh(t) || Eh(t) || Ah(t) || Nh();
}
function Oh(t) {
  if (Array.isArray(t))
    return oo(t);
}
function Eh(t) {
  if (typeof Symbol < "u" && t[Symbol.iterator] != null || t["@@iterator"] != null)
    return Array.from(t);
}
function Ah(t, i) {
  if (t) {
    if (typeof t == "string")
      return oo(t, i);
    var o = Object.prototype.toString.call(t).slice(8, -1);
    if (o === "Object" && t.constructor && (o = t.constructor.name), o === "Map" || o === "Set")
      return Array.from(t);
    if (o === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o))
      return oo(t, i);
  }
}
function oo(t, i) {
  (i == null || i > t.length) && (i = t.length);
  for (var o = 0, s = new Array(i); o < i; o++)
    s[o] = t[o];
  return s;
}
function Nh() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
var Rh = Object.hasOwnProperty, rn = Object.setPrototypeOf, Ih = Object.isFrozen, Yh = Object.getPrototypeOf, Ph = Object.getOwnPropertyDescriptor, xt = Object.freeze, Kt = Object.seal, Wh = Object.create, Yn = typeof Reflect < "u" && Reflect, mr = Yn.apply, no = Yn.construct;
mr || (mr = function(i, o, s) {
  return i.apply(o, s);
});
xt || (xt = function(i) {
  return i;
});
Kt || (Kt = function(i) {
  return i;
});
no || (no = function(i, o) {
  return or(i, Xt(o));
});
var zh = Wt(Array.prototype.forEach), on = Wt(Array.prototype.pop), bi = Wt(Array.prototype.push), nr = Wt(String.prototype.toLowerCase), Ur = Wt(String.prototype.toString), Hh = Wt(String.prototype.match), jt = Wt(String.prototype.replace), Uh = Wt(String.prototype.indexOf), qh = Wt(String.prototype.trim), bt = Wt(RegExp.prototype.test), qr = $h(TypeError);
function Wt(t) {
  return function(i) {
    for (var o = arguments.length, s = new Array(o > 1 ? o - 1 : 0), l = 1; l < o; l++)
      s[l - 1] = arguments[l];
    return mr(t, i, s);
  };
}
function $h(t) {
  return function() {
    for (var i = arguments.length, o = new Array(i), s = 0; s < i; s++)
      o[s] = arguments[s];
    return no(t, o);
  };
}
function z(t, i, o) {
  o = o || nr, rn && rn(t, null);
  for (var s = i.length; s--; ) {
    var l = i[s];
    if (typeof l == "string") {
      var c = o(l);
      c !== l && (Ih(i) || (i[s] = c), l = c);
    }
    t[l] = !0;
  }
  return t;
}
function Ue(t) {
  var i = Wh(null), o;
  for (o in t)
    mr(Rh, t, [o]) === !0 && (i[o] = t[o]);
  return i;
}
function Ki(t, i) {
  for (; t !== null; ) {
    var o = Ph(t, i);
    if (o) {
      if (o.get)
        return Wt(o.get);
      if (typeof o.value == "function")
        return Wt(o.value);
    }
    t = Yh(t);
  }
  function s(l) {
    return console.warn("fallback value for", l), null;
  }
  return s;
}
var nn = xt(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "section", "select", "shadow", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), $r = xt(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), Gr = xt(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), Gh = xt(["animate", "color-profile", "cursor", "discard", "fedropshadow", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), Vr = xt(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover"]), Vh = xt(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), sn = xt(["#text"]), an = xt(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "pattern", "placeholder", "playsinline", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "xmlns", "slot"]), jr = xt(["accent-height", "accumulate", "additive", "alignment-baseline", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), ln = xt(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), Ji = xt(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), jh = Kt(/\{\{[\w\W]*|[\w\W]*\}\}/gm), Xh = Kt(/<%[\w\W]*|[\w\W]*%>/gm), Zh = Kt(/\${[\w\W]*}/gm), Kh = Kt(/^data-[\-\w.\u00B7-\uFFFF]/), Jh = Kt(/^aria-[\-\w]+$/), Qh = Kt(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
), tc = Kt(/^(?:\w+script|data):/i), ec = Kt(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
), ic = Kt(/^html$/i), rc = function() {
  return typeof window > "u" ? null : window;
}, oc = function(i, o) {
  if (Fe(i) !== "object" || typeof i.createPolicy != "function")
    return null;
  var s = null, l = "data-tt-policy-suffix";
  o.currentScript && o.currentScript.hasAttribute(l) && (s = o.currentScript.getAttribute(l));
  var c = "dompurify" + (s ? "#" + s : "");
  try {
    return i.createPolicy(c, {
      createHTML: function(g) {
        return g;
      },
      createScriptURL: function(g) {
        return g;
      }
    });
  } catch {
    return console.warn("TrustedTypes policy " + c + " could not be created."), null;
  }
};
function Pn() {
  var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : rc(), i = function(d) {
    return Pn(d);
  };
  if (i.version = "2.4.3", i.removed = [], !t || !t.document || t.document.nodeType !== 9)
    return i.isSupported = !1, i;
  var o = t.document, s = t.document, l = t.DocumentFragment, c = t.HTMLTemplateElement, u = t.Node, g = t.Element, m = t.NodeFilter, y = t.NamedNodeMap, C = y === void 0 ? t.NamedNodeMap || t.MozNamedAttrMap : y, L = t.HTMLFormElement, M = t.DOMParser, F = t.trustedTypes, D = g.prototype, X = Ki(D, "cloneNode"), ut = Ki(D, "nextSibling"), Oe = Ki(D, "childNodes"), St = Ki(D, "parentNode");
  if (typeof c == "function") {
    var Tt = s.createElement("template");
    Tt.content && Tt.content.ownerDocument && (s = Tt.content.ownerDocument);
  }
  var ot = oc(F, o), Rt = ot ? ot.createHTML("") : "", ft = s, Ve = ft.implementation, vt = ft.createNodeIterator, Ei = ft.createDocumentFragment, Ai = ft.getElementsByTagName, It = o.importNode, je = {};
  try {
    je = Ue(s).documentMode ? s.documentMode : {};
  } catch {
  }
  var wt = {};
  i.isSupported = typeof St == "function" && Ve && typeof Ve.createHTMLDocument < "u" && je !== 9;
  var di = jh, Bt = Xh, Ee = Zh, Xe = Kh, fi = Jh, fe = tc, O = ec, ge = Qh, it = null, me = z({}, [].concat(Xt(nn), Xt($r), Xt(Gr), Xt(Vr), Xt(sn))), H = null, _t = z({}, [].concat(Xt(an), Xt(jr), Xt(ln), Xt(Ji))), K = Object.seal(Object.create(null, {
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
  })), pe = null, nt = null, Ae = !0, gt = !0, W = !1, Et = !1, Yt = !1, Ze = !1, k = !1, zt = !1, G = !1, Ht = !1, ie = !0, re = !1, ye = "user-content-", _e = !0, Ne = !1, Ut = {}, mt = null, B = z({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]), Ni = null, pt = z({}, ["audio", "video", "img", "source", "image", "track"]), Re = null, Ke = z({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), $ = "http://www.w3.org/1998/Math/MathML", Qt = "http://www.w3.org/2000/svg", V = "http://www.w3.org/1999/xhtml", Q = V, At = !1, Lt = null, rt = z({}, [$, Qt, V], Ur), ht, qt = ["application/xhtml+xml", "text/html"], oe = "text/html", st, Ce = null, Je = s.createElement("form"), be = function(d) {
    return d instanceof RegExp || d instanceof Function;
  }, Qe = function(d) {
    Ce && Ce === d || ((!d || Fe(d) !== "object") && (d = {}), d = Ue(d), ht = // eslint-disable-next-line unicorn/prefer-includes
    qt.indexOf(d.PARSER_MEDIA_TYPE) === -1 ? ht = oe : ht = d.PARSER_MEDIA_TYPE, st = ht === "application/xhtml+xml" ? Ur : nr, it = "ALLOWED_TAGS" in d ? z({}, d.ALLOWED_TAGS, st) : me, H = "ALLOWED_ATTR" in d ? z({}, d.ALLOWED_ATTR, st) : _t, Lt = "ALLOWED_NAMESPACES" in d ? z({}, d.ALLOWED_NAMESPACES, Ur) : rt, Re = "ADD_URI_SAFE_ATTR" in d ? z(
      Ue(Ke),
      // eslint-disable-line indent
      d.ADD_URI_SAFE_ATTR,
      // eslint-disable-line indent
      st
      // eslint-disable-line indent
    ) : Ke, Ni = "ADD_DATA_URI_TAGS" in d ? z(
      Ue(pt),
      // eslint-disable-line indent
      d.ADD_DATA_URI_TAGS,
      // eslint-disable-line indent
      st
      // eslint-disable-line indent
    ) : pt, mt = "FORBID_CONTENTS" in d ? z({}, d.FORBID_CONTENTS, st) : B, pe = "FORBID_TAGS" in d ? z({}, d.FORBID_TAGS, st) : {}, nt = "FORBID_ATTR" in d ? z({}, d.FORBID_ATTR, st) : {}, Ut = "USE_PROFILES" in d ? d.USE_PROFILES : !1, Ae = d.ALLOW_ARIA_ATTR !== !1, gt = d.ALLOW_DATA_ATTR !== !1, W = d.ALLOW_UNKNOWN_PROTOCOLS || !1, Et = d.SAFE_FOR_TEMPLATES || !1, Yt = d.WHOLE_DOCUMENT || !1, zt = d.RETURN_DOM || !1, G = d.RETURN_DOM_FRAGMENT || !1, Ht = d.RETURN_TRUSTED_TYPE || !1, k = d.FORCE_BODY || !1, ie = d.SANITIZE_DOM !== !1, re = d.SANITIZE_NAMED_PROPS || !1, _e = d.KEEP_CONTENT !== !1, Ne = d.IN_PLACE || !1, ge = d.ALLOWED_URI_REGEXP || ge, Q = d.NAMESPACE || V, d.CUSTOM_ELEMENT_HANDLING && be(d.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (K.tagNameCheck = d.CUSTOM_ELEMENT_HANDLING.tagNameCheck), d.CUSTOM_ELEMENT_HANDLING && be(d.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (K.attributeNameCheck = d.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), d.CUSTOM_ELEMENT_HANDLING && typeof d.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements == "boolean" && (K.allowCustomizedBuiltInElements = d.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), Et && (gt = !1), G && (zt = !0), Ut && (it = z({}, Xt(sn)), H = [], Ut.html === !0 && (z(it, nn), z(H, an)), Ut.svg === !0 && (z(it, $r), z(H, jr), z(H, Ji)), Ut.svgFilters === !0 && (z(it, Gr), z(H, jr), z(H, Ji)), Ut.mathMl === !0 && (z(it, Vr), z(H, ln), z(H, Ji))), d.ADD_TAGS && (it === me && (it = Ue(it)), z(it, d.ADD_TAGS, st)), d.ADD_ATTR && (H === _t && (H = Ue(H)), z(H, d.ADD_ATTR, st)), d.ADD_URI_SAFE_ATTR && z(Re, d.ADD_URI_SAFE_ATTR, st), d.FORBID_CONTENTS && (mt === B && (mt = Ue(mt)), z(mt, d.FORBID_CONTENTS, st)), _e && (it["#text"] = !0), Yt && z(it, ["html", "head", "body"]), it.table && (z(it, ["tbody"]), delete pe.tbody), xt && xt(d), Ce = d);
  }, gi = z({}, ["mi", "mo", "mn", "ms", "mtext"]), Ri = z({}, ["foreignobject", "desc", "title", "annotation-xml"]), Tr = z({}, ["title", "style", "font", "a", "script"]), Ie = z({}, $r);
  z(Ie, Gr), z(Ie, Gh);
  var ti = z({}, Vr);
  z(ti, Vh);
  var Ii = function(d) {
    var x = St(d);
    (!x || !x.tagName) && (x = {
      namespaceURI: Q,
      tagName: "template"
    });
    var T = nr(d.tagName), U = nr(x.tagName);
    return Lt[d.namespaceURI] ? d.namespaceURI === Qt ? x.namespaceURI === V ? T === "svg" : x.namespaceURI === $ ? T === "svg" && (U === "annotation-xml" || gi[U]) : Boolean(Ie[T]) : d.namespaceURI === $ ? x.namespaceURI === V ? T === "math" : x.namespaceURI === Qt ? T === "math" && Ri[U] : Boolean(ti[T]) : d.namespaceURI === V ? x.namespaceURI === Qt && !Ri[U] || x.namespaceURI === $ && !gi[U] ? !1 : !ti[T] && (Tr[T] || !Ie[T]) : !!(ht === "application/xhtml+xml" && Lt[d.namespaceURI]) : !1;
  }, Ct = function(d) {
    bi(i.removed, {
      element: d
    });
    try {
      d.parentNode.removeChild(d);
    } catch {
      try {
        d.outerHTML = Rt;
      } catch {
        d.remove();
      }
    }
  }, mi = function(d, x) {
    try {
      bi(i.removed, {
        attribute: x.getAttributeNode(d),
        from: x
      });
    } catch {
      bi(i.removed, {
        attribute: null,
        from: x
      });
    }
    if (x.removeAttribute(d), d === "is" && !H[d])
      if (zt || G)
        try {
          Ct(x);
        } catch {
        }
      else
        try {
          x.setAttribute(d, "");
        } catch {
        }
  }, ke = function(d) {
    var x, T;
    if (k)
      d = "<remove></remove>" + d;
    else {
      var U = Hh(d, /^[\r\n\t ]+/);
      T = U && U[0];
    }
    ht === "application/xhtml+xml" && Q === V && (d = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + d + "</body></html>");
    var dt = ot ? ot.createHTML(d) : d;
    if (Q === V)
      try {
        x = new M().parseFromString(dt, ht);
      } catch {
      }
    if (!x || !x.documentElement) {
      x = Ve.createDocument(Q, "template", null);
      try {
        x.documentElement.innerHTML = At ? Rt : dt;
      } catch {
      }
    }
    var et = x.body || x.documentElement;
    return d && T && et.insertBefore(s.createTextNode(T), et.childNodes[0] || null), Q === V ? Ai.call(x, Yt ? "html" : "body")[0] : Yt ? x.documentElement : et;
  }, Ye = function(d) {
    return vt.call(
      d.ownerDocument || d,
      d,
      // eslint-disable-next-line no-bitwise
      m.SHOW_ELEMENT | m.SHOW_COMMENT | m.SHOW_TEXT,
      null,
      !1
    );
  }, Yi = function(d) {
    return d instanceof L && (typeof d.nodeName != "string" || typeof d.textContent != "string" || typeof d.removeChild != "function" || !(d.attributes instanceof C) || typeof d.removeAttribute != "function" || typeof d.setAttribute != "function" || typeof d.namespaceURI != "string" || typeof d.insertBefore != "function" || typeof d.hasChildNodes != "function");
  }, $t = function(d) {
    return Fe(u) === "object" ? d instanceof u : d && Fe(d) === "object" && typeof d.nodeType == "number" && typeof d.nodeName == "string";
  }, ct = function(d, x, T) {
    wt[d] && zh(wt[d], function(U) {
      U.call(i, x, T, Ce);
    });
  }, ei = function(d) {
    var x;
    if (ct("beforeSanitizeElements", d, null), Yi(d) || bt(/[\u0080-\uFFFF]/, d.nodeName))
      return Ct(d), !0;
    var T = st(d.nodeName);
    if (ct("uponSanitizeElement", d, {
      tagName: T,
      allowedTags: it
    }), d.hasChildNodes() && !$t(d.firstElementChild) && (!$t(d.content) || !$t(d.content.firstElementChild)) && bt(/<[/\w]/g, d.innerHTML) && bt(/<[/\w]/g, d.textContent) || T === "select" && bt(/<template/i, d.innerHTML))
      return Ct(d), !0;
    if (!it[T] || pe[T]) {
      if (!pe[T] && pi(T) && (K.tagNameCheck instanceof RegExp && bt(K.tagNameCheck, T) || K.tagNameCheck instanceof Function && K.tagNameCheck(T)))
        return !1;
      if (_e && !mt[T]) {
        var U = St(d) || d.parentNode, dt = Oe(d) || d.childNodes;
        if (dt && U)
          for (var et = dt.length, at = et - 1; at >= 0; --at)
            U.insertBefore(X(dt[at], !0), ut(d));
      }
      return Ct(d), !0;
    }
    return d instanceof g && !Ii(d) || (T === "noscript" || T === "noembed") && bt(/<\/no(script|embed)/i, d.innerHTML) ? (Ct(d), !0) : (Et && d.nodeType === 3 && (x = d.textContent, x = jt(x, di, " "), x = jt(x, Bt, " "), x = jt(x, Ee, " "), d.textContent !== x && (bi(i.removed, {
      element: d.cloneNode()
    }), d.textContent = x)), ct("afterSanitizeElements", d, null), !1);
  }, xe = function(d, x, T) {
    if (ie && (x === "id" || x === "name") && (T in s || T in Je))
      return !1;
    if (!(gt && !nt[x] && bt(Xe, x))) {
      if (!(Ae && bt(fi, x))) {
        if (!H[x] || nt[x]) {
          if (
            // First condition does a very basic check if a) it's basically a valid custom element tagname AND
            // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
            // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
            !(pi(d) && (K.tagNameCheck instanceof RegExp && bt(K.tagNameCheck, d) || K.tagNameCheck instanceof Function && K.tagNameCheck(d)) && (K.attributeNameCheck instanceof RegExp && bt(K.attributeNameCheck, x) || K.attributeNameCheck instanceof Function && K.attributeNameCheck(x)) || // Alternative, second condition checks if it's an `is`-attribute, AND
            // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
            x === "is" && K.allowCustomizedBuiltInElements && (K.tagNameCheck instanceof RegExp && bt(K.tagNameCheck, T) || K.tagNameCheck instanceof Function && K.tagNameCheck(T)))
          )
            return !1;
        } else if (!Re[x]) {
          if (!bt(ge, jt(T, O, ""))) {
            if (!((x === "src" || x === "xlink:href" || x === "href") && d !== "script" && Uh(T, "data:") === 0 && Ni[d])) {
              if (!(W && !bt(fe, jt(T, O, "")))) {
                if (T)
                  return !1;
              }
            }
          }
        }
      }
    }
    return !0;
  }, pi = function(d) {
    return d.indexOf("-") > 0;
  }, Pe = function(d) {
    var x, T, U, dt;
    ct("beforeSanitizeAttributes", d, null);
    var et = d.attributes;
    if (et) {
      var at = {
        attrName: "",
        attrValue: "",
        keepAttr: !0,
        allowedAttributes: H
      };
      for (dt = et.length; dt--; ) {
        x = et[dt];
        var j = x, J = j.name, ii = j.namespaceURI;
        if (T = J === "value" ? x.value : qh(x.value), U = st(J), at.attrName = U, at.attrValue = T, at.keepAttr = !0, at.forceKeepAttr = void 0, ct("uponSanitizeAttribute", d, at), T = at.attrValue, !at.forceKeepAttr && (mi(J, d), !!at.keepAttr)) {
          if (bt(/\/>/i, T)) {
            mi(J, d);
            continue;
          }
          Et && (T = jt(T, di, " "), T = jt(T, Bt, " "), T = jt(T, Ee, " "));
          var Pi = st(d.nodeName);
          if (xe(Pi, U, T)) {
            if (re && (U === "id" || U === "name") && (mi(J, d), T = ye + T), ot && Fe(F) === "object" && typeof F.getAttributeType == "function" && !ii)
              switch (F.getAttributeType(Pi, U)) {
                case "TrustedHTML":
                  T = ot.createHTML(T);
                  break;
                case "TrustedScriptURL":
                  T = ot.createScriptURL(T);
                  break;
              }
            try {
              ii ? d.setAttributeNS(ii, J, T) : d.setAttribute(J, T), on(i.removed);
            } catch {
            }
          }
        }
      }
      ct("afterSanitizeAttributes", d, null);
    }
  }, vr = function E(d) {
    var x, T = Ye(d);
    for (ct("beforeSanitizeShadowDOM", d, null); x = T.nextNode(); )
      ct("uponSanitizeShadowNode", x, null), !ei(x) && (x.content instanceof l && E(x.content), Pe(x));
    ct("afterSanitizeShadowDOM", d, null);
  };
  return i.sanitize = function(E) {
    var d = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, x, T, U, dt, et;
    if (At = !E, At && (E = "<!-->"), typeof E != "string" && !$t(E)) {
      if (typeof E.toString != "function")
        throw qr("toString is not a function");
      if (E = E.toString(), typeof E != "string")
        throw qr("dirty is not a string, aborting");
    }
    if (!i.isSupported) {
      if (Fe(t.toStaticHTML) === "object" || typeof t.toStaticHTML == "function") {
        if (typeof E == "string")
          return t.toStaticHTML(E);
        if ($t(E))
          return t.toStaticHTML(E.outerHTML);
      }
      return E;
    }
    if (Ze || Qe(d), i.removed = [], typeof E == "string" && (Ne = !1), Ne) {
      if (E.nodeName) {
        var at = st(E.nodeName);
        if (!it[at] || pe[at])
          throw qr("root node is forbidden and cannot be sanitized in-place");
      }
    } else if (E instanceof u)
      x = ke("<!---->"), T = x.ownerDocument.importNode(E, !0), T.nodeType === 1 && T.nodeName === "BODY" || T.nodeName === "HTML" ? x = T : x.appendChild(T);
    else {
      if (!zt && !Et && !Yt && // eslint-disable-next-line unicorn/prefer-includes
      E.indexOf("<") === -1)
        return ot && Ht ? ot.createHTML(E) : E;
      if (x = ke(E), !x)
        return zt ? null : Ht ? Rt : "";
    }
    x && k && Ct(x.firstChild);
    for (var j = Ye(Ne ? E : x); U = j.nextNode(); )
      U.nodeType === 3 && U === dt || ei(U) || (U.content instanceof l && vr(U.content), Pe(U), dt = U);
    if (dt = null, Ne)
      return E;
    if (zt) {
      if (G)
        for (et = Ei.call(x.ownerDocument); x.firstChild; )
          et.appendChild(x.firstChild);
      else
        et = x;
      return H.shadowroot && (et = It.call(o, et, !0)), et;
    }
    var J = Yt ? x.outerHTML : x.innerHTML;
    return Yt && it["!doctype"] && x.ownerDocument && x.ownerDocument.doctype && x.ownerDocument.doctype.name && bt(ic, x.ownerDocument.doctype.name) && (J = "<!DOCTYPE " + x.ownerDocument.doctype.name + `>
` + J), Et && (J = jt(J, di, " "), J = jt(J, Bt, " "), J = jt(J, Ee, " ")), ot && Ht ? ot.createHTML(J) : J;
  }, i.setConfig = function(E) {
    Qe(E), Ze = !0;
  }, i.clearConfig = function() {
    Ce = null, Ze = !1;
  }, i.isValidAttribute = function(E, d, x) {
    Ce || Qe({});
    var T = st(E), U = st(d);
    return xe(T, U, x);
  }, i.addHook = function(E, d) {
    typeof d == "function" && (wt[E] = wt[E] || [], bi(wt[E], d));
  }, i.removeHook = function(E) {
    if (wt[E])
      return on(wt[E]);
  }, i.removeHooks = function(E) {
    wt[E] && (wt[E] = []);
  }, i.removeAllHooks = function() {
    wt = {};
  }, i;
}
var so = Pn();
const nc = (t) => t ? zn(t).replace(/\\n/g, "#br#").split("#br#") : [""], Wn = (t) => so.sanitize(t), hn = (t, i) => {
  var o;
  if (((o = i.flowchart) == null ? void 0 : o.htmlLabels) !== !1) {
    const s = i.securityLevel;
    s === "antiscript" || s === "strict" ? t = Wn(t) : s !== "loose" && (t = zn(t), t = t.replace(/</g, "&lt;").replace(/>/g, "&gt;"), t = t.replace(/=/g, "&equals;"), t = hc(t));
  }
  return t;
}, ao = (t, i) => t && (i.dompurifyConfig ? t = so.sanitize(hn(t, i), i.dompurifyConfig).toString() : t = so.sanitize(hn(t, i), {
  FORBID_TAGS: ["style"]
}).toString(), t), sc = (t, i) => typeof t == "string" ? ao(t, i) : t.flat().map((o) => ao(o, i)), Cr = /<br\s*\/?>/gi, ac = (t) => Cr.test(t), lc = (t) => t.split(Cr), hc = (t) => t.replace(/#br#/g, "<br/>"), zn = (t) => t.replace(Cr, "#br#"), cc = (t) => {
  let i = "";
  return t && (i = window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.search, i = i.replaceAll(/\(/g, "\\("), i = i.replaceAll(/\)/g, "\\)")), i;
}, uc = (t) => !(t === !1 || ["false", "null", "0"].includes(String(t).trim().toLowerCase())), dc = function(t) {
  let i = t;
  if (t.split("~").length - 1 >= 2) {
    let o = i;
    do
      i = o, o = i.replace(/~([^\s,:;]+)~/, "<$1>");
    while (o != i);
    return dc(o);
  } else
    return i;
}, Kc = {
  getRows: nc,
  sanitizeText: ao,
  sanitizeTextOrArray: sc,
  hasBreaks: ac,
  splitBreaks: lc,
  lineBreakRegex: Cr,
  removeScript: Wn,
  getUrl: cc,
  evaluate: uc
}, sr = {
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
    const i = t / 255;
    return t > 0.03928 ? Math.pow((i + 0.055) / 1.055, 2.4) : i / 12.92;
  },
  //SOURCE: https://gist.github.com/mjackson/5311256
  hue2rgb: (t, i, o) => (o < 0 && (o += 1), o > 1 && (o -= 1), o < 1 / 6 ? t + (i - t) * 6 * o : o < 1 / 2 ? i : o < 2 / 3 ? t + (i - t) * (2 / 3 - o) * 6 : t),
  hsl2rgb: ({ h: t, s: i, l: o }, s) => {
    if (!i)
      return o * 2.55;
    t /= 360, i /= 100, o /= 100;
    const l = o < 0.5 ? o * (1 + i) : o + i - o * i, c = 2 * o - l;
    switch (s) {
      case "r":
        return sr.hue2rgb(c, l, t + 1 / 3) * 255;
      case "g":
        return sr.hue2rgb(c, l, t) * 255;
      case "b":
        return sr.hue2rgb(c, l, t - 1 / 3) * 255;
    }
  },
  rgb2hsl: ({ r: t, g: i, b: o }, s) => {
    t /= 255, i /= 255, o /= 255;
    const l = Math.max(t, i, o), c = Math.min(t, i, o), u = (l + c) / 2;
    if (s === "l")
      return u * 100;
    if (l === c)
      return 0;
    const g = l - c, m = u > 0.5 ? g / (2 - l - c) : g / (l + c);
    if (s === "s")
      return m * 100;
    switch (l) {
      case t:
        return ((i - o) / g + (i < o ? 6 : 0)) * 60;
      case i:
        return ((o - t) / g + 2) * 60;
      case o:
        return ((t - i) / g + 4) * 60;
      default:
        return -1;
    }
  }
}, fc = sr, gc = {
  /* API */
  clamp: (t, i, o) => i > o ? Math.min(i, Math.max(o, t)) : Math.min(o, Math.max(i, t)),
  round: (t) => Math.round(t * 1e10) / 1e10
}, mc = gc, pc = {
  /* API */
  dec2hex: (t) => {
    const i = Math.round(t).toString(16);
    return i.length > 1 ? i : `0${i}`;
  }
}, yc = pc, _c = {
  channel: fc,
  lang: mc,
  unit: yc
}, P = _c, Le = {};
for (let t = 0; t <= 255; t++)
  Le[t] = P.unit.dec2hex(t);
const yt = {
  ALL: 0,
  RGB: 1,
  HSL: 2
};
class Cc {
  constructor() {
    this.type = yt.ALL;
  }
  /* API */
  get() {
    return this.type;
  }
  set(i) {
    if (this.type && this.type !== i)
      throw new Error("Cannot change both RGB and HSL channels at the same time");
    this.type = i;
  }
  reset() {
    this.type = yt.ALL;
  }
  is(i) {
    return this.type === i;
  }
}
const bc = Cc;
class kc {
  /* CONSTRUCTOR */
  constructor(i, o) {
    this.color = o, this.changed = !1, this.data = i, this.type = new bc();
  }
  /* API */
  set(i, o) {
    return this.color = o, this.changed = !1, this.data = i, this.type.type = yt.ALL, this;
  }
  /* HELPERS */
  _ensureHSL() {
    const i = this.data, { h: o, s, l } = i;
    o === void 0 && (i.h = P.channel.rgb2hsl(i, "h")), s === void 0 && (i.s = P.channel.rgb2hsl(i, "s")), l === void 0 && (i.l = P.channel.rgb2hsl(i, "l"));
  }
  _ensureRGB() {
    const i = this.data, { r: o, g: s, b: l } = i;
    o === void 0 && (i.r = P.channel.hsl2rgb(i, "r")), s === void 0 && (i.g = P.channel.hsl2rgb(i, "g")), l === void 0 && (i.b = P.channel.hsl2rgb(i, "b"));
  }
  /* GETTERS */
  get r() {
    const i = this.data, o = i.r;
    return !this.type.is(yt.HSL) && o !== void 0 ? o : (this._ensureHSL(), P.channel.hsl2rgb(i, "r"));
  }
  get g() {
    const i = this.data, o = i.g;
    return !this.type.is(yt.HSL) && o !== void 0 ? o : (this._ensureHSL(), P.channel.hsl2rgb(i, "g"));
  }
  get b() {
    const i = this.data, o = i.b;
    return !this.type.is(yt.HSL) && o !== void 0 ? o : (this._ensureHSL(), P.channel.hsl2rgb(i, "b"));
  }
  get h() {
    const i = this.data, o = i.h;
    return !this.type.is(yt.RGB) && o !== void 0 ? o : (this._ensureRGB(), P.channel.rgb2hsl(i, "h"));
  }
  get s() {
    const i = this.data, o = i.s;
    return !this.type.is(yt.RGB) && o !== void 0 ? o : (this._ensureRGB(), P.channel.rgb2hsl(i, "s"));
  }
  get l() {
    const i = this.data, o = i.l;
    return !this.type.is(yt.RGB) && o !== void 0 ? o : (this._ensureRGB(), P.channel.rgb2hsl(i, "l"));
  }
  get a() {
    return this.data.a;
  }
  /* SETTERS */
  set r(i) {
    this.type.set(yt.RGB), this.changed = !0, this.data.r = i;
  }
  set g(i) {
    this.type.set(yt.RGB), this.changed = !0, this.data.g = i;
  }
  set b(i) {
    this.type.set(yt.RGB), this.changed = !0, this.data.b = i;
  }
  set h(i) {
    this.type.set(yt.HSL), this.changed = !0, this.data.h = i;
  }
  set s(i) {
    this.type.set(yt.HSL), this.changed = !0, this.data.s = i;
  }
  set l(i) {
    this.type.set(yt.HSL), this.changed = !0, this.data.l = i;
  }
  set a(i) {
    this.changed = !0, this.data.a = i;
  }
}
const xc = kc, Sc = new xc({ r: 0, g: 0, b: 0, a: 0 }, "transparent"), br = Sc, Hn = {
  /* VARIABLES */
  re: /^#((?:[a-f0-9]{2}){2,4}|[a-f0-9]{3})$/i,
  /* API */
  parse: (t) => {
    if (t.charCodeAt(0) !== 35)
      return;
    const i = t.match(Hn.re);
    if (!i)
      return;
    const o = i[1], s = parseInt(o, 16), l = o.length, c = l % 4 === 0, u = l > 4, g = u ? 1 : 17, m = u ? 8 : 4, y = c ? 0 : -1, C = u ? 255 : 15;
    return br.set({
      r: (s >> m * (y + 3) & C) * g,
      g: (s >> m * (y + 2) & C) * g,
      b: (s >> m * (y + 1) & C) * g,
      a: c ? (s & C) * g / 255 : 1
    }, t);
  },
  stringify: (t) => {
    const { r: i, g: o, b: s, a: l } = t;
    return l < 1 ? `#${Le[Math.round(i)]}${Le[Math.round(o)]}${Le[Math.round(s)]}${Le[Math.round(l * 255)]}` : `#${Le[Math.round(i)]}${Le[Math.round(o)]}${Le[Math.round(s)]}`;
  }
}, Ti = Hn, ar = {
  /* VARIABLES */
  re: /^hsla?\(\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e-?\d+)?(?:deg|grad|rad|turn)?)\s*?(?:,|\s)\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e-?\d+)?%)\s*?(?:,|\s)\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e-?\d+)?%)(?:\s*?(?:,|\/)\s*?\+?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e-?\d+)?(%)?))?\s*?\)$/i,
  hueRe: /^(.+?)(deg|grad|rad|turn)$/i,
  /* HELPERS */
  _hue2deg: (t) => {
    const i = t.match(ar.hueRe);
    if (i) {
      const [, o, s] = i;
      switch (s) {
        case "grad":
          return P.channel.clamp.h(parseFloat(o) * 0.9);
        case "rad":
          return P.channel.clamp.h(parseFloat(o) * 180 / Math.PI);
        case "turn":
          return P.channel.clamp.h(parseFloat(o) * 360);
      }
    }
    return P.channel.clamp.h(parseFloat(t));
  },
  /* API */
  parse: (t) => {
    const i = t.charCodeAt(0);
    if (i !== 104 && i !== 72)
      return;
    const o = t.match(ar.re);
    if (!o)
      return;
    const [, s, l, c, u, g] = o;
    return br.set({
      h: ar._hue2deg(s),
      s: P.channel.clamp.s(parseFloat(l)),
      l: P.channel.clamp.l(parseFloat(c)),
      a: u ? P.channel.clamp.a(g ? parseFloat(u) / 100 : parseFloat(u)) : 1
    }, t);
  },
  stringify: (t) => {
    const { h: i, s: o, l: s, a: l } = t;
    return l < 1 ? `hsla(${P.lang.round(i)}, ${P.lang.round(o)}%, ${P.lang.round(s)}%, ${l})` : `hsl(${P.lang.round(i)}, ${P.lang.round(o)}%, ${P.lang.round(s)}%)`;
  }
}, Qi = ar, lr = {
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
    const i = lr.colors[t];
    if (i)
      return Ti.parse(i);
  },
  stringify: (t) => {
    const i = Ti.stringify(t);
    for (const o in lr.colors)
      if (lr.colors[o] === i)
        return o;
  }
}, cn = lr, Un = {
  /* VARIABLES */
  re: /^rgba?\(\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e\d+)?(%?))\s*?(?:,|\s)\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e\d+)?(%?))\s*?(?:,|\s)\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e\d+)?(%?))(?:\s*?(?:,|\/)\s*?\+?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e\d+)?(%?)))?\s*?\)$/i,
  /* API */
  parse: (t) => {
    const i = t.charCodeAt(0);
    if (i !== 114 && i !== 82)
      return;
    const o = t.match(Un.re);
    if (!o)
      return;
    const [, s, l, c, u, g, m, y, C] = o;
    return br.set({
      r: P.channel.clamp.r(l ? parseFloat(s) * 2.55 : parseFloat(s)),
      g: P.channel.clamp.g(u ? parseFloat(c) * 2.55 : parseFloat(c)),
      b: P.channel.clamp.b(m ? parseFloat(g) * 2.55 : parseFloat(g)),
      a: y ? P.channel.clamp.a(C ? parseFloat(y) / 100 : parseFloat(y)) : 1
    }, t);
  },
  stringify: (t) => {
    const { r: i, g: o, b: s, a: l } = t;
    return l < 1 ? `rgba(${P.lang.round(i)}, ${P.lang.round(o)}, ${P.lang.round(s)}, ${P.lang.round(l)})` : `rgb(${P.lang.round(i)}, ${P.lang.round(o)}, ${P.lang.round(s)})`;
  }
}, tr = Un, Tc = {
  /* VARIABLES */
  format: {
    keyword: cn,
    hex: Ti,
    rgb: tr,
    rgba: tr,
    hsl: Qi,
    hsla: Qi
  },
  /* API */
  parse: (t) => {
    if (typeof t != "string")
      return t;
    const i = Ti.parse(t) || tr.parse(t) || Qi.parse(t) || cn.parse(t);
    if (i)
      return i;
    throw new Error(`Unsupported color format: "${t}"`);
  },
  stringify: (t) => !t.changed && t.color ? t.color : t.type.is(yt.HSL) || t.data.r === void 0 ? Qi.stringify(t) : t.a < 1 || !Number.isInteger(t.r) || !Number.isInteger(t.g) || !Number.isInteger(t.b) ? tr.stringify(t) : Ti.stringify(t)
}, de = Tc, vc = (t, i) => {
  const o = de.parse(t);
  for (const s in i)
    o[s] = P.channel.clamp[s](i[s]);
  return de.stringify(o);
}, qn = vc, wc = (t, i, o = 0, s = 1) => {
  if (typeof t != "number")
    return qn(t, { a: i });
  const l = br.set({
    r: P.channel.clamp.r(t),
    g: P.channel.clamp.g(i),
    b: P.channel.clamp.b(o),
    a: P.channel.clamp.a(s)
  });
  return de.stringify(l);
}, vi = wc, Bc = (t, i, o) => {
  const s = de.parse(t), l = s[i], c = P.channel.clamp[i](l + o);
  return l !== c && (s[i] = c), de.stringify(s);
}, $n = Bc, Lc = (t, i) => $n(t, "l", i), N = Lc, Mc = (t, i) => $n(t, "l", -i), Y = Mc, Fc = (t, i) => {
  const o = de.parse(t), s = {};
  for (const l in i)
    i[l] && (s[l] = o[l] + i[l]);
  return qn(t, s);
}, p = Fc, Dc = (t, i, o = 50) => {
  const { r: s, g: l, b: c, a: u } = de.parse(t), { r: g, g: m, b: y, a: C } = de.parse(i), L = o / 100, M = L * 2 - 1, F = u - C, X = ((M * F === -1 ? M : (M + F) / (1 + M * F)) + 1) / 2, ut = 1 - X, Oe = s * X + g * ut, St = l * X + m * ut, Tt = c * X + y * ut, ot = u * L + C * (1 - L);
  return vi(Oe, St, Tt, ot);
}, Oc = Dc, Ec = (t, i = 100) => {
  const o = de.parse(t);
  return o.r = 255 - o.r, o.g = 255 - o.g, o.b = 255 - o.b, Oc(o, t, i);
}, w = Ec, kt = (t, i) => i ? p(t, { s: -40, l: 10 }) : p(t, { s: -40, l: -10 }), kr = "#ffffff", xr = "#f2f2f2";
let Ac = class {
  constructor() {
    this.background = "#f4f4f4", this.primaryColor = "#fff4dd", this.noteBkgColor = "#fff5ad", this.noteTextColor = "#333", this.THEME_COLOR_LIMIT = 12, this.fontFamily = '"trebuchet ms", verdana, arial, sans-serif', this.fontSize = "16px";
  }
  updateColors() {
    if (this.primaryTextColor = this.primaryTextColor || (this.darkMode ? "#eee" : "#333"), this.secondaryColor = this.secondaryColor || p(this.primaryColor, { h: -120 }), this.tertiaryColor = this.tertiaryColor || p(this.primaryColor, { h: 180, l: 5 }), this.primaryBorderColor = this.primaryBorderColor || kt(this.primaryColor, this.darkMode), this.secondaryBorderColor = this.secondaryBorderColor || kt(this.secondaryColor, this.darkMode), this.tertiaryBorderColor = this.tertiaryBorderColor || kt(this.tertiaryColor, this.darkMode), this.noteBorderColor = this.noteBorderColor || kt(this.noteBkgColor, this.darkMode), this.noteBkgColor = this.noteBkgColor || "#fff5ad", this.noteTextColor = this.noteTextColor || "#333", this.secondaryTextColor = this.secondaryTextColor || w(this.secondaryColor), this.tertiaryTextColor = this.tertiaryTextColor || w(this.tertiaryColor), this.lineColor = this.lineColor || w(this.background), this.textColor = this.textColor || this.primaryTextColor, this.nodeBkg = this.nodeBkg || this.primaryColor, this.mainBkg = this.mainBkg || this.primaryColor, this.nodeBorder = this.nodeBorder || this.primaryBorderColor, this.clusterBkg = this.clusterBkg || this.tertiaryColor, this.clusterBorder = this.clusterBorder || this.tertiaryBorderColor, this.defaultLinkColor = this.defaultLinkColor || this.lineColor, this.titleColor = this.titleColor || this.tertiaryTextColor, this.edgeLabelBackground = this.edgeLabelBackground || (this.darkMode ? Y(this.secondaryColor, 30) : this.secondaryColor), this.nodeTextColor = this.nodeTextColor || this.primaryTextColor, this.actorBorder = this.actorBorder || this.primaryBorderColor, this.actorBkg = this.actorBkg || this.mainBkg, this.actorTextColor = this.actorTextColor || this.primaryTextColor, this.actorLineColor = this.actorLineColor || "grey", this.labelBoxBkgColor = this.labelBoxBkgColor || this.actorBkg, this.signalColor = this.signalColor || this.textColor, this.signalTextColor = this.signalTextColor || this.textColor, this.labelBoxBorderColor = this.labelBoxBorderColor || this.actorBorder, this.labelTextColor = this.labelTextColor || this.actorTextColor, this.loopTextColor = this.loopTextColor || this.actorTextColor, this.activationBorderColor = this.activationBorderColor || Y(this.secondaryColor, 10), this.activationBkgColor = this.activationBkgColor || this.secondaryColor, this.sequenceNumberColor = this.sequenceNumberColor || w(this.lineColor), this.sectionBkgColor = this.sectionBkgColor || this.tertiaryColor, this.altSectionBkgColor = this.altSectionBkgColor || "white", this.sectionBkgColor = this.sectionBkgColor || this.secondaryColor, this.sectionBkgColor2 = this.sectionBkgColor2 || this.primaryColor, this.excludeBkgColor = this.excludeBkgColor || "#eeeeee", this.taskBorderColor = this.taskBorderColor || this.primaryBorderColor, this.taskBkgColor = this.taskBkgColor || this.primaryColor, this.activeTaskBorderColor = this.activeTaskBorderColor || this.primaryColor, this.activeTaskBkgColor = this.activeTaskBkgColor || N(this.primaryColor, 23), this.gridColor = this.gridColor || "lightgrey", this.doneTaskBkgColor = this.doneTaskBkgColor || "lightgrey", this.doneTaskBorderColor = this.doneTaskBorderColor || "grey", this.critBorderColor = this.critBorderColor || "#ff8888", this.critBkgColor = this.critBkgColor || "red", this.todayLineColor = this.todayLineColor || "red", this.taskTextColor = this.taskTextColor || this.textColor, this.taskTextOutsideColor = this.taskTextOutsideColor || this.textColor, this.taskTextLightColor = this.taskTextLightColor || this.textColor, this.taskTextColor = this.taskTextColor || this.primaryTextColor, this.taskTextDarkColor = this.taskTextDarkColor || this.textColor, this.taskTextClickableColor = this.taskTextClickableColor || "#003163", this.personBorder = this.personBorder || this.primaryBorderColor, this.personBkg = this.personBkg || this.mainBkg, this.transitionColor = this.transitionColor || this.lineColor, this.transitionLabelColor = this.transitionLabelColor || this.textColor, this.stateLabelColor = this.stateLabelColor || this.stateBkg || this.primaryTextColor, this.stateBkg = this.stateBkg || this.mainBkg, this.labelBackgroundColor = this.labelBackgroundColor || this.stateBkg, this.compositeBackground = this.compositeBackground || this.background || this.tertiaryColor, this.altBackground = this.altBackground || this.tertiaryColor, this.compositeTitleBackground = this.compositeTitleBackground || this.mainBkg, this.compositeBorder = this.compositeBorder || this.nodeBorder, this.innerEndBackground = this.nodeBorder, this.errorBkgColor = this.errorBkgColor || this.tertiaryColor, this.errorTextColor = this.errorTextColor || this.tertiaryTextColor, this.transitionColor = this.transitionColor || this.lineColor, this.specialStateColor = this.lineColor, this.cScale0 = this.cScale0 || this.primaryColor, this.cScale1 = this.cScale1 || this.secondaryColor, this.cScale2 = this.cScale2 || this.tertiaryColor, this.cScale3 = this.cScale3 || p(this.primaryColor, { h: 30 }), this.cScale4 = this.cScale4 || p(this.primaryColor, { h: 60 }), this.cScale5 = this.cScale5 || p(this.primaryColor, { h: 90 }), this.cScale6 = this.cScale6 || p(this.primaryColor, { h: 120 }), this.cScale7 = this.cScale7 || p(this.primaryColor, { h: 150 }), this.cScale8 = this.cScale8 || p(this.primaryColor, { h: 210, l: 150 }), this.cScale9 = this.cScale9 || p(this.primaryColor, { h: 270 }), this.cScale10 = this.cScale10 || p(this.primaryColor, { h: 300 }), this.cScale11 = this.cScale11 || p(this.primaryColor, { h: 330 }), this.darkMode)
      for (let o = 0; o < this.THEME_COLOR_LIMIT; o++)
        this["cScale" + o] = Y(this["cScale" + o], 75);
    else
      for (let o = 0; o < this.THEME_COLOR_LIMIT; o++)
        this["cScale" + o] = Y(this["cScale" + o], 25);
    for (let o = 0; o < this.THEME_COLOR_LIMIT; o++)
      this["cScaleInv" + o] = this["cScaleInv" + o] || w(this["cScale" + o]);
    for (let o = 0; o < this.THEME_COLOR_LIMIT; o++)
      this.darkMode ? this["cScalePeer" + o] = this["cScalePeer" + o] || N(this["cScale" + o], 10) : this["cScalePeer" + o] = this["cScalePeer" + o] || Y(this["cScale" + o], 10);
    this.scaleLabelColor = this.scaleLabelColor || this.labelTextColor;
    for (let o = 0; o < this.THEME_COLOR_LIMIT; o++)
      this["cScaleLabel" + o] = this["cScaleLabel" + o] || this.scaleLabelColor;
    const i = this.darkMode ? -4 : -1;
    for (let o = 0; o < 5; o++)
      this["surface" + o] = this["surface" + o] || p(this.mainBkg, { h: 180, s: -15, l: i * (5 + o * 3) }), this["surfacePeer" + o] = this["surfacePeer" + o] || p(this.mainBkg, { h: 180, s: -15, l: i * (8 + o * 3) });
    this.classText = this.classText || this.textColor, this.fillType0 = this.fillType0 || this.primaryColor, this.fillType1 = this.fillType1 || this.secondaryColor, this.fillType2 = this.fillType2 || p(this.primaryColor, { h: 64 }), this.fillType3 = this.fillType3 || p(this.secondaryColor, { h: 64 }), this.fillType4 = this.fillType4 || p(this.primaryColor, { h: -64 }), this.fillType5 = this.fillType5 || p(this.secondaryColor, { h: -64 }), this.fillType6 = this.fillType6 || p(this.primaryColor, { h: 128 }), this.fillType7 = this.fillType7 || p(this.secondaryColor, { h: 128 }), this.pie1 = this.pie1 || this.primaryColor, this.pie2 = this.pie2 || this.secondaryColor, this.pie3 = this.pie3 || this.tertiaryColor, this.pie4 = this.pie4 || p(this.primaryColor, { l: -10 }), this.pie5 = this.pie5 || p(this.secondaryColor, { l: -10 }), this.pie6 = this.pie6 || p(this.tertiaryColor, { l: -10 }), this.pie7 = this.pie7 || p(this.primaryColor, { h: 60, l: -10 }), this.pie8 = this.pie8 || p(this.primaryColor, { h: -60, l: -10 }), this.pie9 = this.pie9 || p(this.primaryColor, { h: 120, l: 0 }), this.pie10 = this.pie10 || p(this.primaryColor, { h: 60, l: -20 }), this.pie11 = this.pie11 || p(this.primaryColor, { h: -60, l: -20 }), this.pie12 = this.pie12 || p(this.primaryColor, { h: 120, l: -10 }), this.pieTitleTextSize = this.pieTitleTextSize || "25px", this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor, this.pieSectionTextSize = this.pieSectionTextSize || "17px", this.pieSectionTextColor = this.pieSectionTextColor || this.textColor, this.pieLegendTextSize = this.pieLegendTextSize || "17px", this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor, this.pieStrokeColor = this.pieStrokeColor || "black", this.pieStrokeWidth = this.pieStrokeWidth || "2px", this.pieOpacity = this.pieOpacity || "0.7", this.requirementBackground = this.requirementBackground || this.primaryColor, this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor, this.requirementBorderSize = this.requirementBorderSize || this.primaryBorderColor, this.requirementTextColor = this.requirementTextColor || this.primaryTextColor, this.relationColor = this.relationColor || this.lineColor, this.relationLabelBackground = this.relationLabelBackground || (this.darkMode ? Y(this.secondaryColor, 30) : this.secondaryColor), this.relationLabelColor = this.relationLabelColor || this.actorTextColor, this.git0 = this.git0 || this.primaryColor, this.git1 = this.git1 || this.secondaryColor, this.git2 = this.git2 || this.tertiaryColor, this.git3 = this.git3 || p(this.primaryColor, { h: -30 }), this.git4 = this.git4 || p(this.primaryColor, { h: -60 }), this.git5 = this.git5 || p(this.primaryColor, { h: -90 }), this.git6 = this.git6 || p(this.primaryColor, { h: 60 }), this.git7 = this.git7 || p(this.primaryColor, { h: 120 }), this.darkMode ? (this.git0 = N(this.git0, 25), this.git1 = N(this.git1, 25), this.git2 = N(this.git2, 25), this.git3 = N(this.git3, 25), this.git4 = N(this.git4, 25), this.git5 = N(this.git5, 25), this.git6 = N(this.git6, 25), this.git7 = N(this.git7, 25)) : (this.git0 = Y(this.git0, 25), this.git1 = Y(this.git1, 25), this.git2 = Y(this.git2, 25), this.git3 = Y(this.git3, 25), this.git4 = Y(this.git4, 25), this.git5 = Y(this.git5, 25), this.git6 = Y(this.git6, 25), this.git7 = Y(this.git7, 25)), this.gitInv0 = this.gitInv0 || w(this.git0), this.gitInv1 = this.gitInv1 || w(this.git1), this.gitInv2 = this.gitInv2 || w(this.git2), this.gitInv3 = this.gitInv3 || w(this.git3), this.gitInv4 = this.gitInv4 || w(this.git4), this.gitInv5 = this.gitInv5 || w(this.git5), this.gitInv6 = this.gitInv6 || w(this.git6), this.gitInv7 = this.gitInv7 || w(this.git7), this.branchLabelColor = this.branchLabelColor || (this.darkMode ? "black" : this.labelTextColor), this.gitBranchLabel0 = this.gitBranchLabel0 || this.branchLabelColor, this.gitBranchLabel1 = this.gitBranchLabel1 || this.branchLabelColor, this.gitBranchLabel2 = this.gitBranchLabel2 || this.branchLabelColor, this.gitBranchLabel3 = this.gitBranchLabel3 || this.branchLabelColor, this.gitBranchLabel4 = this.gitBranchLabel4 || this.branchLabelColor, this.gitBranchLabel5 = this.gitBranchLabel5 || this.branchLabelColor, this.gitBranchLabel6 = this.gitBranchLabel6 || this.branchLabelColor, this.gitBranchLabel7 = this.gitBranchLabel7 || this.branchLabelColor, this.tagLabelColor = this.tagLabelColor || this.primaryTextColor, this.tagLabelBackground = this.tagLabelBackground || this.primaryColor, this.tagLabelBorder = this.tagBorder || this.primaryBorderColor, this.tagLabelFontSize = this.tagLabelFontSize || "10px", this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor, this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor, this.commitLabelFontSize = this.commitLabelFontSize || "10px", this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || kr, this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || xr;
  }
  calculate(i) {
    if (typeof i != "object") {
      this.updateColors();
      return;
    }
    const o = Object.keys(i);
    o.forEach((s) => {
      this[s] = i[s];
    }), this.updateColors(), o.forEach((s) => {
      this[s] = i[s];
    });
  }
};
const Nc = (t) => {
  const i = new Ac();
  return i.calculate(t), i;
};
let Rc = class {
  constructor() {
    this.background = "#333", this.primaryColor = "#1f2020", this.secondaryColor = N(this.primaryColor, 16), this.tertiaryColor = p(this.primaryColor, { h: -160 }), this.primaryBorderColor = w(this.background), this.secondaryBorderColor = kt(this.secondaryColor, this.darkMode), this.tertiaryBorderColor = kt(this.tertiaryColor, this.darkMode), this.primaryTextColor = w(this.primaryColor), this.secondaryTextColor = w(this.secondaryColor), this.tertiaryTextColor = w(this.tertiaryColor), this.lineColor = w(this.background), this.textColor = w(this.background), this.mainBkg = "#1f2020", this.secondBkg = "calculated", this.mainContrastColor = "lightgrey", this.darkTextColor = N(w("#323D47"), 10), this.lineColor = "calculated", this.border1 = "#81B1DB", this.border2 = vi(255, 255, 255, 0.25), this.arrowheadColor = "calculated", this.fontFamily = '"trebuchet ms", verdana, arial, sans-serif', this.fontSize = "16px", this.labelBackground = "#181818", this.textColor = "#ccc", this.THEME_COLOR_LIMIT = 12, this.nodeBkg = "calculated", this.nodeBorder = "calculated", this.clusterBkg = "calculated", this.clusterBorder = "calculated", this.defaultLinkColor = "calculated", this.titleColor = "#F9FFFE", this.edgeLabelBackground = "calculated", this.actorBorder = "calculated", this.actorBkg = "calculated", this.actorTextColor = "calculated", this.actorLineColor = "calculated", this.signalColor = "calculated", this.signalTextColor = "calculated", this.labelBoxBkgColor = "calculated", this.labelBoxBorderColor = "calculated", this.labelTextColor = "calculated", this.loopTextColor = "calculated", this.noteBorderColor = "calculated", this.noteBkgColor = "#fff5ad", this.noteTextColor = "calculated", this.activationBorderColor = "calculated", this.activationBkgColor = "calculated", this.sequenceNumberColor = "black", this.sectionBkgColor = Y("#EAE8D9", 30), this.altSectionBkgColor = "calculated", this.sectionBkgColor2 = "#EAE8D9", this.taskBorderColor = vi(255, 255, 255, 70), this.taskBkgColor = "calculated", this.taskTextColor = "calculated", this.taskTextLightColor = "calculated", this.taskTextOutsideColor = "calculated", this.taskTextClickableColor = "#003163", this.activeTaskBorderColor = vi(255, 255, 255, 50), this.activeTaskBkgColor = "#81B1DB", this.gridColor = "calculated", this.doneTaskBkgColor = "calculated", this.doneTaskBorderColor = "grey", this.critBorderColor = "#E83737", this.critBkgColor = "#E83737", this.taskTextDarkColor = "calculated", this.todayLineColor = "#DB5757", this.personBorder = "calculated", this.personBkg = "calculated", this.labelColor = "calculated", this.errorBkgColor = "#a44141", this.errorTextColor = "#ddd";
  }
  updateColors() {
    this.secondBkg = N(this.mainBkg, 16), this.lineColor = this.mainContrastColor, this.arrowheadColor = this.mainContrastColor, this.nodeBkg = this.mainBkg, this.nodeBorder = this.border1, this.clusterBkg = this.secondBkg, this.clusterBorder = this.border2, this.defaultLinkColor = this.lineColor, this.edgeLabelBackground = N(this.labelBackground, 25), this.actorBorder = this.border1, this.actorBkg = this.mainBkg, this.actorTextColor = this.mainContrastColor, this.actorLineColor = this.mainContrastColor, this.signalColor = this.mainContrastColor, this.signalTextColor = this.mainContrastColor, this.labelBoxBkgColor = this.actorBkg, this.labelBoxBorderColor = this.actorBorder, this.labelTextColor = this.mainContrastColor, this.loopTextColor = this.mainContrastColor, this.noteBorderColor = this.secondaryBorderColor, this.noteBkgColor = this.secondBkg, this.noteTextColor = this.secondaryTextColor, this.activationBorderColor = this.border1, this.activationBkgColor = this.secondBkg, this.altSectionBkgColor = this.background, this.taskBkgColor = N(this.mainBkg, 23), this.taskTextColor = this.darkTextColor, this.taskTextLightColor = this.mainContrastColor, this.taskTextOutsideColor = this.taskTextLightColor, this.gridColor = this.mainContrastColor, this.doneTaskBkgColor = this.mainContrastColor, this.taskTextDarkColor = this.darkTextColor, this.transitionColor = this.transitionColor || this.lineColor, this.transitionLabelColor = this.transitionLabelColor || this.textColor, this.stateLabelColor = this.stateLabelColor || this.stateBkg || this.primaryTextColor, this.stateBkg = this.stateBkg || this.mainBkg, this.labelBackgroundColor = this.labelBackgroundColor || this.stateBkg, this.compositeBackground = this.compositeBackground || this.background || this.tertiaryColor, this.altBackground = this.altBackground || "#555", this.compositeTitleBackground = this.compositeTitleBackground || this.mainBkg, this.compositeBorder = this.compositeBorder || this.nodeBorder, this.innerEndBackground = this.primaryBorderColor, this.specialStateColor = "#f4f4f4", this.errorBkgColor = this.errorBkgColor || this.tertiaryColor, this.errorTextColor = this.errorTextColor || this.tertiaryTextColor, this.fillType0 = this.primaryColor, this.fillType1 = this.secondaryColor, this.fillType2 = p(this.primaryColor, { h: 64 }), this.fillType3 = p(this.secondaryColor, { h: 64 }), this.fillType4 = p(this.primaryColor, { h: -64 }), this.fillType5 = p(this.secondaryColor, { h: -64 }), this.fillType6 = p(this.primaryColor, { h: 128 }), this.fillType7 = p(this.secondaryColor, { h: 128 }), this.cScale1 = this.cScale1 || "#0b0000", this.cScale2 = this.cScale2 || "#4d1037", this.cScale3 = this.cScale3 || "#3f5258", this.cScale4 = this.cScale4 || "#4f2f1b", this.cScale5 = this.cScale5 || "#6e0a0a", this.cScale6 = this.cScale6 || "#3b0048", this.cScale7 = this.cScale7 || "#995a01", this.cScale8 = this.cScale8 || "#154706", this.cScale9 = this.cScale9 || "#161722", this.cScale10 = this.cScale10 || "#00296f", this.cScale11 = this.cScale11 || "#01629c", this.cScale12 = this.cScale12 || "#010029", this.cScale0 = this.cScale0 || this.primaryColor, this.cScale1 = this.cScale1 || this.secondaryColor, this.cScale2 = this.cScale2 || this.tertiaryColor, this.cScale3 = this.cScale3 || p(this.primaryColor, { h: 30 }), this.cScale4 = this.cScale4 || p(this.primaryColor, { h: 60 }), this.cScale5 = this.cScale5 || p(this.primaryColor, { h: 90 }), this.cScale6 = this.cScale6 || p(this.primaryColor, { h: 120 }), this.cScale7 = this.cScale7 || p(this.primaryColor, { h: 150 }), this.cScale8 = this.cScale8 || p(this.primaryColor, { h: 210 }), this.cScale9 = this.cScale9 || p(this.primaryColor, { h: 270 }), this.cScale10 = this.cScale10 || p(this.primaryColor, { h: 300 }), this.cScale11 = this.cScale11 || p(this.primaryColor, { h: 330 });
    for (let i = 0; i < this.THEME_COLOR_LIMIT; i++)
      this["cScaleInv" + i] = this["cScaleInv" + i] || w(this["cScale" + i]);
    for (let i = 0; i < this.THEME_COLOR_LIMIT; i++)
      this["cScalePeer" + i] = this["cScalePeer" + i] || N(this["cScale" + i], 10);
    for (let i = 0; i < 5; i++)
      this["surface" + i] = this["surface" + i] || p(this.mainBkg, { h: 30, s: -30, l: -(-10 + i * 4) }), this["surfacePeer" + i] = this["surfacePeer" + i] || p(this.mainBkg, { h: 30, s: -30, l: -(-7 + i * 4) });
    this.scaleLabelColor = this.scaleLabelColor || (this.darkMode ? "black" : this.labelTextColor);
    for (let i = 0; i < this.THEME_COLOR_LIMIT; i++)
      this["cScaleLabel" + i] = this["cScaleLabel" + i] || this.scaleLabelColor;
    for (let i = 0; i < this.THEME_COLOR_LIMIT; i++)
      this["pie" + i] = this["cScale" + i];
    this.pieTitleTextSize = this.pieTitleTextSize || "25px", this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor, this.pieSectionTextSize = this.pieSectionTextSize || "17px", this.pieSectionTextColor = this.pieSectionTextColor || this.textColor, this.pieLegendTextSize = this.pieLegendTextSize || "17px", this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor, this.pieStrokeColor = this.pieStrokeColor || "black", this.pieStrokeWidth = this.pieStrokeWidth || "2px", this.pieOpacity = this.pieOpacity || "0.7", this.classText = this.primaryTextColor, this.requirementBackground = this.requirementBackground || this.primaryColor, this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor, this.requirementBorderSize = this.requirementBorderSize || this.primaryBorderColor, this.requirementTextColor = this.requirementTextColor || this.primaryTextColor, this.relationColor = this.relationColor || this.lineColor, this.relationLabelBackground = this.relationLabelBackground || (this.darkMode ? Y(this.secondaryColor, 30) : this.secondaryColor), this.relationLabelColor = this.relationLabelColor || this.actorTextColor, this.git0 = N(this.secondaryColor, 20), this.git1 = N(this.pie2 || this.secondaryColor, 20), this.git2 = N(this.pie3 || this.tertiaryColor, 20), this.git3 = N(this.pie4 || p(this.primaryColor, { h: -30 }), 20), this.git4 = N(this.pie5 || p(this.primaryColor, { h: -60 }), 20), this.git5 = N(this.pie6 || p(this.primaryColor, { h: -90 }), 10), this.git6 = N(this.pie7 || p(this.primaryColor, { h: 60 }), 10), this.git7 = N(this.pie8 || p(this.primaryColor, { h: 120 }), 20), this.gitInv0 = this.gitInv0 || w(this.git0), this.gitInv1 = this.gitInv1 || w(this.git1), this.gitInv2 = this.gitInv2 || w(this.git2), this.gitInv3 = this.gitInv3 || w(this.git3), this.gitInv4 = this.gitInv4 || w(this.git4), this.gitInv5 = this.gitInv5 || w(this.git5), this.gitInv6 = this.gitInv6 || w(this.git6), this.gitInv7 = this.gitInv7 || w(this.git7), this.tagLabelColor = this.tagLabelColor || this.primaryTextColor, this.tagLabelBackground = this.tagLabelBackground || this.primaryColor, this.tagLabelBorder = this.tagBorder || this.primaryBorderColor, this.tagLabelFontSize = this.tagLabelFontSize || "10px", this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor, this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor, this.commitLabelFontSize = this.commitLabelFontSize || "10px", this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || N(this.background, 12), this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || N(this.background, 2);
  }
  calculate(i) {
    if (typeof i != "object") {
      this.updateColors();
      return;
    }
    const o = Object.keys(i);
    o.forEach((s) => {
      this[s] = i[s];
    }), this.updateColors(), o.forEach((s) => {
      this[s] = i[s];
    });
  }
};
const Ic = (t) => {
  const i = new Rc();
  return i.calculate(t), i;
};
let Yc = class {
  constructor() {
    this.background = "#f4f4f4", this.primaryColor = "#ECECFF", this.secondaryColor = p(this.primaryColor, { h: 120 }), this.secondaryColor = "#ffffde", this.tertiaryColor = p(this.primaryColor, { h: -160 }), this.primaryBorderColor = kt(this.primaryColor, this.darkMode), this.secondaryBorderColor = kt(this.secondaryColor, this.darkMode), this.tertiaryBorderColor = kt(this.tertiaryColor, this.darkMode), this.primaryTextColor = w(this.primaryColor), this.secondaryTextColor = w(this.secondaryColor), this.tertiaryTextColor = w(this.tertiaryColor), this.lineColor = w(this.background), this.textColor = w(this.background), this.background = "white", this.mainBkg = "#ECECFF", this.secondBkg = "#ffffde", this.lineColor = "#333333", this.border1 = "#9370DB", this.border2 = "#aaaa33", this.arrowheadColor = "#333333", this.fontFamily = '"trebuchet ms", verdana, arial, sans-serif', this.fontSize = "16px", this.labelBackground = "#e8e8e8", this.textColor = "#333", this.THEME_COLOR_LIMIT = 12, this.nodeBkg = "calculated", this.nodeBorder = "calculated", this.clusterBkg = "calculated", this.clusterBorder = "calculated", this.defaultLinkColor = "calculated", this.titleColor = "calculated", this.edgeLabelBackground = "calculated", this.actorBorder = "calculated", this.actorBkg = "calculated", this.actorTextColor = "black", this.actorLineColor = "grey", this.signalColor = "calculated", this.signalTextColor = "calculated", this.labelBoxBkgColor = "calculated", this.labelBoxBorderColor = "calculated", this.labelTextColor = "calculated", this.loopTextColor = "calculated", this.noteBorderColor = "calculated", this.noteBkgColor = "#fff5ad", this.noteTextColor = "calculated", this.activationBorderColor = "#666", this.activationBkgColor = "#f4f4f4", this.sequenceNumberColor = "white", this.sectionBkgColor = "calculated", this.altSectionBkgColor = "calculated", this.sectionBkgColor2 = "calculated", this.excludeBkgColor = "#eeeeee", this.taskBorderColor = "calculated", this.taskBkgColor = "calculated", this.taskTextLightColor = "calculated", this.taskTextColor = this.taskTextLightColor, this.taskTextDarkColor = "calculated", this.taskTextOutsideColor = this.taskTextDarkColor, this.taskTextClickableColor = "calculated", this.activeTaskBorderColor = "calculated", this.activeTaskBkgColor = "calculated", this.gridColor = "calculated", this.doneTaskBkgColor = "calculated", this.doneTaskBorderColor = "calculated", this.critBorderColor = "calculated", this.critBkgColor = "calculated", this.todayLineColor = "calculated", this.sectionBkgColor = vi(102, 102, 255, 0.49), this.altSectionBkgColor = "white", this.sectionBkgColor2 = "#fff400", this.taskBorderColor = "#534fbc", this.taskBkgColor = "#8a90dd", this.taskTextLightColor = "white", this.taskTextColor = "calculated", this.taskTextDarkColor = "black", this.taskTextOutsideColor = "calculated", this.taskTextClickableColor = "#003163", this.activeTaskBorderColor = "#534fbc", this.activeTaskBkgColor = "#bfc7ff", this.gridColor = "lightgrey", this.doneTaskBkgColor = "lightgrey", this.doneTaskBorderColor = "grey", this.critBorderColor = "#ff8888", this.critBkgColor = "red", this.todayLineColor = "red", this.personBorder = "calculated", this.personBkg = "calculated", this.labelColor = "black", this.errorBkgColor = "#552222", this.errorTextColor = "#552222", this.updateColors();
  }
  updateColors() {
    this.cScale0 = this.cScale0 || this.primaryColor, this.cScale1 = this.cScale1 || this.secondaryColor, this.cScale2 = this.cScale2 || this.tertiaryColor, this.cScale3 = this.cScale3 || p(this.primaryColor, { h: 30 }), this.cScale4 = this.cScale4 || p(this.primaryColor, { h: 60 }), this.cScale5 = this.cScale5 || p(this.primaryColor, { h: 90 }), this.cScale6 = this.cScale6 || p(this.primaryColor, { h: 120 }), this.cScale7 = this.cScale7 || p(this.primaryColor, { h: 150 }), this.cScale8 = this.cScale8 || p(this.primaryColor, { h: 210 }), this.cScale9 = this.cScale9 || p(this.primaryColor, { h: 270 }), this.cScale10 = this.cScale10 || p(this.primaryColor, { h: 300 }), this.cScale11 = this.cScale11 || p(this.primaryColor, { h: 330 }), this["cScalePeer" + 1] = this["cScalePeer" + 1] || Y(this.secondaryColor, 45), this["cScalePeer" + 2] = this["cScalePeer" + 2] || Y(this.tertiaryColor, 40);
    for (let i = 0; i < this.THEME_COLOR_LIMIT; i++)
      this["cScale" + i] = Y(this["cScale" + i], 10), this["cScalePeer" + i] = this["cScalePeer" + i] || Y(this["cScale" + i], 25);
    for (let i = 0; i < this.THEME_COLOR_LIMIT; i++)
      this["cScaleInv" + i] = this["cScaleInv" + i] || p(this["cScale" + i], { h: 180 });
    for (let i = 0; i < 5; i++)
      this["surface" + i] = this["surface" + i] || p(this.mainBkg, { h: 30, l: -(5 + i * 5) }), this["surfacePeer" + i] = this["surfacePeer" + i] || p(this.mainBkg, { h: 30, l: -(7 + i * 5) });
    if (this.scaleLabelColor = this.scaleLabelColor !== "calculated" && this.scaleLabelColor ? this.scaleLabelColor : this.labelTextColor, this.labelTextColor !== "calculated") {
      this.cScaleLabel0 = this.cScaleLabel0 || w(this.labelTextColor), this.cScaleLabel3 = this.cScaleLabel3 || w(this.labelTextColor);
      for (let i = 0; i < this.THEME_COLOR_LIMIT; i++)
        this["cScaleLabel" + i] = this["cScaleLabel" + i] || this.labelTextColor;
    }
    this.nodeBkg = this.mainBkg, this.nodeBorder = this.border1, this.clusterBkg = this.secondBkg, this.clusterBorder = this.border2, this.defaultLinkColor = this.lineColor, this.titleColor = this.textColor, this.edgeLabelBackground = this.labelBackground, this.actorBorder = N(this.border1, 23), this.actorBkg = this.mainBkg, this.labelBoxBkgColor = this.actorBkg, this.signalColor = this.textColor, this.signalTextColor = this.textColor, this.labelBoxBorderColor = this.actorBorder, this.labelTextColor = this.actorTextColor, this.loopTextColor = this.actorTextColor, this.noteBorderColor = this.border2, this.noteTextColor = this.actorTextColor, this.taskTextColor = this.taskTextLightColor, this.taskTextOutsideColor = this.taskTextDarkColor, this.transitionColor = this.transitionColor || this.lineColor, this.transitionLabelColor = this.transitionLabelColor || this.textColor, this.stateLabelColor = this.stateLabelColor || this.stateBkg || this.primaryTextColor, this.stateBkg = this.stateBkg || this.mainBkg, this.labelBackgroundColor = this.labelBackgroundColor || this.stateBkg, this.compositeBackground = this.compositeBackground || this.background || this.tertiaryColor, this.altBackground = this.altBackground || "#f0f0f0", this.compositeTitleBackground = this.compositeTitleBackground || this.mainBkg, this.compositeBorder = this.compositeBorder || this.nodeBorder, this.innerEndBackground = this.nodeBorder, this.specialStateColor = this.lineColor, this.errorBkgColor = this.errorBkgColor || this.tertiaryColor, this.errorTextColor = this.errorTextColor || this.tertiaryTextColor, this.transitionColor = this.transitionColor || this.lineColor, this.classText = this.primaryTextColor, this.fillType0 = this.primaryColor, this.fillType1 = this.secondaryColor, this.fillType2 = p(this.primaryColor, { h: 64 }), this.fillType3 = p(this.secondaryColor, { h: 64 }), this.fillType4 = p(this.primaryColor, { h: -64 }), this.fillType5 = p(this.secondaryColor, { h: -64 }), this.fillType6 = p(this.primaryColor, { h: 128 }), this.fillType7 = p(this.secondaryColor, { h: 128 }), this.pie1 = this.pie1 || this.primaryColor, this.pie2 = this.pie2 || this.secondaryColor, this.pie3 = this.pie3 || p(this.tertiaryColor, { l: -40 }), this.pie4 = this.pie4 || p(this.primaryColor, { l: -10 }), this.pie5 = this.pie5 || p(this.secondaryColor, { l: -30 }), this.pie6 = this.pie6 || p(this.tertiaryColor, { l: -20 }), this.pie7 = this.pie7 || p(this.primaryColor, { h: 60, l: -20 }), this.pie8 = this.pie8 || p(this.primaryColor, { h: -60, l: -40 }), this.pie9 = this.pie9 || p(this.primaryColor, { h: 120, l: -40 }), this.pie10 = this.pie10 || p(this.primaryColor, { h: 60, l: -40 }), this.pie11 = this.pie11 || p(this.primaryColor, { h: -90, l: -40 }), this.pie12 = this.pie12 || p(this.primaryColor, { h: 120, l: -30 }), this.pieTitleTextSize = this.pieTitleTextSize || "25px", this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor, this.pieSectionTextSize = this.pieSectionTextSize || "17px", this.pieSectionTextColor = this.pieSectionTextColor || this.textColor, this.pieLegendTextSize = this.pieLegendTextSize || "17px", this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor, this.pieStrokeColor = this.pieStrokeColor || "black", this.pieStrokeWidth = this.pieStrokeWidth || "2px", this.pieOpacity = this.pieOpacity || "0.7", this.requirementBackground = this.requirementBackground || this.primaryColor, this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor, this.requirementBorderSize = this.requirementBorderSize || this.primaryBorderColor, this.requirementTextColor = this.requirementTextColor || this.primaryTextColor, this.relationColor = this.relationColor || this.lineColor, this.relationLabelBackground = this.relationLabelBackground || this.labelBackground, this.relationLabelColor = this.relationLabelColor || this.actorTextColor, this.git0 = this.git0 || this.primaryColor, this.git1 = this.git1 || this.secondaryColor, this.git2 = this.git2 || this.tertiaryColor, this.git3 = this.git3 || p(this.primaryColor, { h: -30 }), this.git4 = this.git4 || p(this.primaryColor, { h: -60 }), this.git5 = this.git5 || p(this.primaryColor, { h: -90 }), this.git6 = this.git6 || p(this.primaryColor, { h: 60 }), this.git7 = this.git7 || p(this.primaryColor, { h: 120 }), this.darkMode ? (this.git0 = N(this.git0, 25), this.git1 = N(this.git1, 25), this.git2 = N(this.git2, 25), this.git3 = N(this.git3, 25), this.git4 = N(this.git4, 25), this.git5 = N(this.git5, 25), this.git6 = N(this.git6, 25), this.git7 = N(this.git7, 25)) : (this.git0 = Y(this.git0, 25), this.git1 = Y(this.git1, 25), this.git2 = Y(this.git2, 25), this.git3 = Y(this.git3, 25), this.git4 = Y(this.git4, 25), this.git5 = Y(this.git5, 25), this.git6 = Y(this.git6, 25), this.git7 = Y(this.git7, 25)), this.gitInv0 = this.gitInv0 || Y(w(this.git0), 25), this.gitInv1 = this.gitInv1 || w(this.git1), this.gitInv2 = this.gitInv2 || w(this.git2), this.gitInv3 = this.gitInv3 || w(this.git3), this.gitInv4 = this.gitInv4 || w(this.git4), this.gitInv5 = this.gitInv5 || w(this.git5), this.gitInv6 = this.gitInv6 || w(this.git6), this.gitInv7 = this.gitInv7 || w(this.git7), this.gitBranchLabel0 = this.gitBranchLabel0 || w(this.labelTextColor), this.gitBranchLabel1 = this.gitBranchLabel1 || this.labelTextColor, this.gitBranchLabel2 = this.gitBranchLabel2 || this.labelTextColor, this.gitBranchLabel3 = this.gitBranchLabel3 || w(this.labelTextColor), this.gitBranchLabel4 = this.gitBranchLabel4 || this.labelTextColor, this.gitBranchLabel5 = this.gitBranchLabel5 || this.labelTextColor, this.gitBranchLabel6 = this.gitBranchLabel6 || this.labelTextColor, this.gitBranchLabel7 = this.gitBranchLabel7 || this.labelTextColor, this.tagLabelColor = this.tagLabelColor || this.primaryTextColor, this.tagLabelBackground = this.tagLabelBackground || this.primaryColor, this.tagLabelBorder = this.tagBorder || this.primaryBorderColor, this.tagLabelFontSize = this.tagLabelFontSize || "10px", this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor, this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor, this.commitLabelFontSize = this.commitLabelFontSize || "10px", this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || kr, this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || xr;
  }
  calculate(i) {
    if (typeof i != "object") {
      this.updateColors();
      return;
    }
    const o = Object.keys(i);
    o.forEach((s) => {
      this[s] = i[s];
    }), this.updateColors(), o.forEach((s) => {
      this[s] = i[s];
    });
  }
};
const Pc = (t) => {
  const i = new Yc();
  return i.calculate(t), i;
};
let Wc = class {
  constructor() {
    this.background = "#f4f4f4", this.primaryColor = "#cde498", this.secondaryColor = "#cdffb2", this.background = "white", this.mainBkg = "#cde498", this.secondBkg = "#cdffb2", this.lineColor = "green", this.border1 = "#13540c", this.border2 = "#6eaa49", this.arrowheadColor = "green", this.fontFamily = '"trebuchet ms", verdana, arial, sans-serif', this.fontSize = "16px", this.tertiaryColor = N("#cde498", 10), this.primaryBorderColor = kt(this.primaryColor, this.darkMode), this.secondaryBorderColor = kt(this.secondaryColor, this.darkMode), this.tertiaryBorderColor = kt(this.tertiaryColor, this.darkMode), this.primaryTextColor = w(this.primaryColor), this.secondaryTextColor = w(this.secondaryColor), this.tertiaryTextColor = w(this.primaryColor), this.lineColor = w(this.background), this.textColor = w(this.background), this.THEME_COLOR_LIMIT = 12, this.nodeBkg = "calculated", this.nodeBorder = "calculated", this.clusterBkg = "calculated", this.clusterBorder = "calculated", this.defaultLinkColor = "calculated", this.titleColor = "#333", this.edgeLabelBackground = "#e8e8e8", this.actorBorder = "calculated", this.actorBkg = "calculated", this.actorTextColor = "black", this.actorLineColor = "grey", this.signalColor = "#333", this.signalTextColor = "#333", this.labelBoxBkgColor = "calculated", this.labelBoxBorderColor = "#326932", this.labelTextColor = "calculated", this.loopTextColor = "calculated", this.noteBorderColor = "calculated", this.noteBkgColor = "#fff5ad", this.noteTextColor = "calculated", this.activationBorderColor = "#666", this.activationBkgColor = "#f4f4f4", this.sequenceNumberColor = "white", this.sectionBkgColor = "#6eaa49", this.altSectionBkgColor = "white", this.sectionBkgColor2 = "#6eaa49", this.excludeBkgColor = "#eeeeee", this.taskBorderColor = "calculated", this.taskBkgColor = "#487e3a", this.taskTextLightColor = "white", this.taskTextColor = "calculated", this.taskTextDarkColor = "black", this.taskTextOutsideColor = "calculated", this.taskTextClickableColor = "#003163", this.activeTaskBorderColor = "calculated", this.activeTaskBkgColor = "calculated", this.gridColor = "lightgrey", this.doneTaskBkgColor = "lightgrey", this.doneTaskBorderColor = "grey", this.critBorderColor = "#ff8888", this.critBkgColor = "red", this.todayLineColor = "red", this.personBorder = "calculated", this.personBkg = "calculated", this.labelColor = "black", this.errorBkgColor = "#552222", this.errorTextColor = "#552222";
  }
  updateColors() {
    this.cScale0 = this.cScale0 || this.primaryColor, this.cScale1 = this.cScale1 || this.secondaryColor, this.cScale2 = this.cScale2 || this.tertiaryColor, this.cScale3 = this.cScale3 || p(this.primaryColor, { h: 30 }), this.cScale4 = this.cScale4 || p(this.primaryColor, { h: 60 }), this.cScale5 = this.cScale5 || p(this.primaryColor, { h: 90 }), this.cScale6 = this.cScale6 || p(this.primaryColor, { h: 120 }), this.cScale7 = this.cScale7 || p(this.primaryColor, { h: 150 }), this.cScale8 = this.cScale8 || p(this.primaryColor, { h: 210 }), this.cScale9 = this.cScale9 || p(this.primaryColor, { h: 270 }), this.cScale10 = this.cScale10 || p(this.primaryColor, { h: 300 }), this.cScale11 = this.cScale11 || p(this.primaryColor, { h: 330 }), this["cScalePeer" + 1] = this["cScalePeer" + 1] || Y(this.secondaryColor, 45), this["cScalePeer" + 2] = this["cScalePeer" + 2] || Y(this.tertiaryColor, 40);
    for (let i = 0; i < this.THEME_COLOR_LIMIT; i++)
      this["cScale" + i] = Y(this["cScale" + i], 10), this["cScalePeer" + i] = this["cScalePeer" + i] || Y(this["cScale" + i], 25);
    for (let i = 0; i < this.THEME_COLOR_LIMIT; i++)
      this["cScaleInv" + i] = this["cScaleInv" + i] || p(this["cScale" + i], { h: 180 });
    this.scaleLabelColor = this.scaleLabelColor !== "calculated" && this.scaleLabelColor ? this.scaleLabelColor : this.labelTextColor;
    for (let i = 0; i < this.THEME_COLOR_LIMIT; i++)
      this["cScaleLabel" + i] = this["cScaleLabel" + i] || this.scaleLabelColor;
    for (let i = 0; i < 5; i++)
      this["surface" + i] = this["surface" + i] || p(this.mainBkg, { h: 30, s: -30, l: -(5 + i * 5) }), this["surfacePeer" + i] = this["surfacePeer" + i] || p(this.mainBkg, { h: 30, s: -30, l: -(8 + i * 5) });
    this.nodeBkg = this.mainBkg, this.nodeBorder = this.border1, this.clusterBkg = this.secondBkg, this.clusterBorder = this.border2, this.defaultLinkColor = this.lineColor, this.actorBorder = Y(this.mainBkg, 20), this.actorBkg = this.mainBkg, this.labelBoxBkgColor = this.actorBkg, this.labelTextColor = this.actorTextColor, this.loopTextColor = this.actorTextColor, this.noteBorderColor = this.border2, this.noteTextColor = this.actorTextColor, this.taskBorderColor = this.border1, this.taskTextColor = this.taskTextLightColor, this.taskTextOutsideColor = this.taskTextDarkColor, this.activeTaskBorderColor = this.taskBorderColor, this.activeTaskBkgColor = this.mainBkg, this.transitionColor = this.transitionColor || this.lineColor, this.transitionLabelColor = this.transitionLabelColor || this.textColor, this.stateLabelColor = this.stateLabelColor || this.stateBkg || this.primaryTextColor, this.stateBkg = this.stateBkg || this.mainBkg, this.labelBackgroundColor = this.labelBackgroundColor || this.stateBkg, this.compositeBackground = this.compositeBackground || this.background || this.tertiaryColor, this.altBackground = this.altBackground || "#f0f0f0", this.compositeTitleBackground = this.compositeTitleBackground || this.mainBkg, this.compositeBorder = this.compositeBorder || this.nodeBorder, this.innerEndBackground = this.primaryBorderColor, this.specialStateColor = this.lineColor, this.errorBkgColor = this.errorBkgColor || this.tertiaryColor, this.errorTextColor = this.errorTextColor || this.tertiaryTextColor, this.transitionColor = this.transitionColor || this.lineColor, this.classText = this.primaryTextColor, this.fillType0 = this.primaryColor, this.fillType1 = this.secondaryColor, this.fillType2 = p(this.primaryColor, { h: 64 }), this.fillType3 = p(this.secondaryColor, { h: 64 }), this.fillType4 = p(this.primaryColor, { h: -64 }), this.fillType5 = p(this.secondaryColor, { h: -64 }), this.fillType6 = p(this.primaryColor, { h: 128 }), this.fillType7 = p(this.secondaryColor, { h: 128 }), this.pie1 = this.pie1 || this.primaryColor, this.pie2 = this.pie2 || this.secondaryColor, this.pie3 = this.pie3 || this.tertiaryColor, this.pie4 = this.pie4 || p(this.primaryColor, { l: -30 }), this.pie5 = this.pie5 || p(this.secondaryColor, { l: -30 }), this.pie6 = this.pie6 || p(this.tertiaryColor, { h: 40, l: -40 }), this.pie7 = this.pie7 || p(this.primaryColor, { h: 60, l: -10 }), this.pie8 = this.pie8 || p(this.primaryColor, { h: -60, l: -10 }), this.pie9 = this.pie9 || p(this.primaryColor, { h: 120, l: 0 }), this.pie10 = this.pie10 || p(this.primaryColor, { h: 60, l: -50 }), this.pie11 = this.pie11 || p(this.primaryColor, { h: -60, l: -50 }), this.pie12 = this.pie12 || p(this.primaryColor, { h: 120, l: -50 }), this.pieTitleTextSize = this.pieTitleTextSize || "25px", this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor, this.pieSectionTextSize = this.pieSectionTextSize || "17px", this.pieSectionTextColor = this.pieSectionTextColor || this.textColor, this.pieLegendTextSize = this.pieLegendTextSize || "17px", this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor, this.pieStrokeColor = this.pieStrokeColor || "black", this.pieStrokeWidth = this.pieStrokeWidth || "2px", this.pieOpacity = this.pieOpacity || "0.7", this.requirementBackground = this.requirementBackground || this.primaryColor, this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor, this.requirementBorderSize = this.requirementBorderSize || this.primaryBorderColor, this.requirementTextColor = this.requirementTextColor || this.primaryTextColor, this.relationColor = this.relationColor || this.lineColor, this.relationLabelBackground = this.relationLabelBackground || this.edgeLabelBackground, this.relationLabelColor = this.relationLabelColor || this.actorTextColor, this.git0 = this.git0 || this.primaryColor, this.git1 = this.git1 || this.secondaryColor, this.git2 = this.git2 || this.tertiaryColor, this.git3 = this.git3 || p(this.primaryColor, { h: -30 }), this.git4 = this.git4 || p(this.primaryColor, { h: -60 }), this.git5 = this.git5 || p(this.primaryColor, { h: -90 }), this.git6 = this.git6 || p(this.primaryColor, { h: 60 }), this.git7 = this.git7 || p(this.primaryColor, { h: 120 }), this.darkMode ? (this.git0 = N(this.git0, 25), this.git1 = N(this.git1, 25), this.git2 = N(this.git2, 25), this.git3 = N(this.git3, 25), this.git4 = N(this.git4, 25), this.git5 = N(this.git5, 25), this.git6 = N(this.git6, 25), this.git7 = N(this.git7, 25)) : (this.git0 = Y(this.git0, 25), this.git1 = Y(this.git1, 25), this.git2 = Y(this.git2, 25), this.git3 = Y(this.git3, 25), this.git4 = Y(this.git4, 25), this.git5 = Y(this.git5, 25), this.git6 = Y(this.git6, 25), this.git7 = Y(this.git7, 25)), this.gitInv0 = this.gitInv0 || w(this.git0), this.gitInv1 = this.gitInv1 || w(this.git1), this.gitInv2 = this.gitInv2 || w(this.git2), this.gitInv3 = this.gitInv3 || w(this.git3), this.gitInv4 = this.gitInv4 || w(this.git4), this.gitInv5 = this.gitInv5 || w(this.git5), this.gitInv6 = this.gitInv6 || w(this.git6), this.gitInv7 = this.gitInv7 || w(this.git7), this.tagLabelColor = this.tagLabelColor || this.primaryTextColor, this.tagLabelBackground = this.tagLabelBackground || this.primaryColor, this.tagLabelBorder = this.tagBorder || this.primaryBorderColor, this.tagLabelFontSize = this.tagLabelFontSize || "10px", this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor, this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor, this.commitLabelFontSize = this.commitLabelFontSize || "10px", this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || kr, this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || xr;
  }
  calculate(i) {
    if (typeof i != "object") {
      this.updateColors();
      return;
    }
    const o = Object.keys(i);
    o.forEach((s) => {
      this[s] = i[s];
    }), this.updateColors(), o.forEach((s) => {
      this[s] = i[s];
    });
  }
};
const zc = (t) => {
  const i = new Wc();
  return i.calculate(t), i;
};
class Hc {
  constructor() {
    this.primaryColor = "#eee", this.contrast = "#707070", this.secondaryColor = N(this.contrast, 55), this.background = "#ffffff", this.tertiaryColor = p(this.primaryColor, { h: -160 }), this.primaryBorderColor = kt(this.primaryColor, this.darkMode), this.secondaryBorderColor = kt(this.secondaryColor, this.darkMode), this.tertiaryBorderColor = kt(this.tertiaryColor, this.darkMode), this.primaryTextColor = w(this.primaryColor), this.secondaryTextColor = w(this.secondaryColor), this.tertiaryTextColor = w(this.tertiaryColor), this.lineColor = w(this.background), this.textColor = w(this.background), this.mainBkg = "#eee", this.secondBkg = "calculated", this.lineColor = "#666", this.border1 = "#999", this.border2 = "calculated", this.note = "#ffa", this.text = "#333", this.critical = "#d42", this.done = "#bbb", this.arrowheadColor = "#333333", this.fontFamily = '"trebuchet ms", verdana, arial, sans-serif', this.fontSize = "16px", this.THEME_COLOR_LIMIT = 12, this.nodeBkg = "calculated", this.nodeBorder = "calculated", this.clusterBkg = "calculated", this.clusterBorder = "calculated", this.defaultLinkColor = "calculated", this.titleColor = "calculated", this.edgeLabelBackground = "white", this.actorBorder = "calculated", this.actorBkg = "calculated", this.actorTextColor = "calculated", this.actorLineColor = "calculated", this.signalColor = "calculated", this.signalTextColor = "calculated", this.labelBoxBkgColor = "calculated", this.labelBoxBorderColor = "calculated", this.labelTextColor = "calculated", this.loopTextColor = "calculated", this.noteBorderColor = "calculated", this.noteBkgColor = "calculated", this.noteTextColor = "calculated", this.activationBorderColor = "#666", this.activationBkgColor = "#f4f4f4", this.sequenceNumberColor = "white", this.sectionBkgColor = "calculated", this.altSectionBkgColor = "white", this.sectionBkgColor2 = "calculated", this.excludeBkgColor = "#eeeeee", this.taskBorderColor = "calculated", this.taskBkgColor = "calculated", this.taskTextLightColor = "white", this.taskTextColor = "calculated", this.taskTextDarkColor = "calculated", this.taskTextOutsideColor = "calculated", this.taskTextClickableColor = "#003163", this.activeTaskBorderColor = "calculated", this.activeTaskBkgColor = "calculated", this.gridColor = "calculated", this.doneTaskBkgColor = "calculated", this.doneTaskBorderColor = "calculated", this.critBkgColor = "calculated", this.critBorderColor = "calculated", this.todayLineColor = "calculated", this.personBorder = "calculated", this.personBkg = "calculated", this.labelColor = "black", this.errorBkgColor = "#552222", this.errorTextColor = "#552222";
  }
  updateColors() {
    this.secondBkg = N(this.contrast, 55), this.border2 = this.contrast, this.cScale0 = this.cScale0 || "#555", this.cScale1 = this.cScale1 || "#F4F4F4", this.cScale2 = this.cScale2 || "#555", this.cScale3 = this.cScale3 || "#BBB", this.cScale4 = this.cScale4 || "#777", this.cScale5 = this.cScale5 || "#999", this.cScale6 = this.cScale6 || "#DDD", this.cScale7 = this.cScale7 || "#FFF", this.cScale8 = this.cScale8 || "#DDD", this.cScale9 = this.cScale9 || "#BBB", this.cScale10 = this.cScale10 || "#999", this.cScale11 = this.cScale11 || "#777";
    for (let i = 0; i < this.THEME_COLOR_LIMIT; i++)
      this["cScaleInv" + i] = this["cScaleInv" + i] || w(this["cScale" + i]);
    for (let i = 0; i < this.THEME_COLOR_LIMIT; i++)
      this.darkMode ? this["cScalePeer" + i] = this["cScalePeer" + i] || N(this["cScale" + i], 10) : this["cScalePeer" + i] = this["cScalePeer" + i] || Y(this["cScale" + i], 10);
    this.scaleLabelColor = this.scaleLabelColor || (this.darkMode ? "black" : this.labelTextColor), this.cScaleLabel0 = this.cScaleLabel0 || this.cScale1, this.cScaleLabel2 = this.cScaleLabel2 || this.cScale1;
    for (let i = 0; i < this.THEME_COLOR_LIMIT; i++)
      this["cScaleLabel" + i] = this["cScaleLabel" + i] || this.scaleLabelColor;
    for (let i = 0; i < 5; i++)
      this["surface" + i] = this["surface" + i] || p(this.mainBkg, { l: -(5 + i * 5) }), this["surfacePeer" + i] = this["surfacePeer" + i] || p(this.mainBkg, { l: -(8 + i * 5) });
    this.nodeBkg = this.mainBkg, this.nodeBorder = this.border1, this.clusterBkg = this.secondBkg, this.clusterBorder = this.border2, this.defaultLinkColor = this.lineColor, this.titleColor = this.text, this.actorBorder = N(this.border1, 23), this.actorBkg = this.mainBkg, this.actorTextColor = this.text, this.actorLineColor = this.lineColor, this.signalColor = this.text, this.signalTextColor = this.text, this.labelBoxBkgColor = this.actorBkg, this.labelBoxBorderColor = this.actorBorder, this.labelTextColor = this.text, this.loopTextColor = this.text, this.noteBorderColor = "#999", this.noteBkgColor = "#666", this.noteTextColor = "#fff", this.sectionBkgColor = N(this.contrast, 30), this.sectionBkgColor2 = N(this.contrast, 30), this.taskBorderColor = Y(this.contrast, 10), this.taskBkgColor = this.contrast, this.taskTextColor = this.taskTextLightColor, this.taskTextDarkColor = this.text, this.taskTextOutsideColor = this.taskTextDarkColor, this.activeTaskBorderColor = this.taskBorderColor, this.activeTaskBkgColor = this.mainBkg, this.gridColor = N(this.border1, 30), this.doneTaskBkgColor = this.done, this.doneTaskBorderColor = this.lineColor, this.critBkgColor = this.critical, this.critBorderColor = Y(this.critBkgColor, 10), this.todayLineColor = this.critBkgColor, this.transitionColor = this.transitionColor || "#000", this.transitionLabelColor = this.transitionLabelColor || this.textColor, this.stateLabelColor = this.stateLabelColor || this.stateBkg || this.primaryTextColor, this.stateBkg = this.stateBkg || this.mainBkg, this.labelBackgroundColor = this.labelBackgroundColor || this.stateBkg, this.compositeBackground = this.compositeBackground || this.background || this.tertiaryColor, this.altBackground = this.altBackground || "#f4f4f4", this.compositeTitleBackground = this.compositeTitleBackground || this.mainBkg, this.stateBorder = this.stateBorder || "#000", this.innerEndBackground = this.primaryBorderColor, this.specialStateColor = "#222", this.errorBkgColor = this.errorBkgColor || this.tertiaryColor, this.errorTextColor = this.errorTextColor || this.tertiaryTextColor, this.classText = this.primaryTextColor, this.fillType0 = this.primaryColor, this.fillType1 = this.secondaryColor, this.fillType2 = p(this.primaryColor, { h: 64 }), this.fillType3 = p(this.secondaryColor, { h: 64 }), this.fillType4 = p(this.primaryColor, { h: -64 }), this.fillType5 = p(this.secondaryColor, { h: -64 }), this.fillType6 = p(this.primaryColor, { h: 128 }), this.fillType7 = p(this.secondaryColor, { h: 128 });
    for (let i = 0; i < this.THEME_COLOR_LIMIT; i++)
      this["pie" + i] = this["cScale" + i];
    this.pie12 = this.pie0, this.pieTitleTextSize = this.pieTitleTextSize || "25px", this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor, this.pieSectionTextSize = this.pieSectionTextSize || "17px", this.pieSectionTextColor = this.pieSectionTextColor || this.textColor, this.pieLegendTextSize = this.pieLegendTextSize || "17px", this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor, this.pieStrokeColor = this.pieStrokeColor || "black", this.pieStrokeWidth = this.pieStrokeWidth || "2px", this.pieOpacity = this.pieOpacity || "0.7", this.requirementBackground = this.requirementBackground || this.primaryColor, this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor, this.requirementBorderSize = this.requirementBorderSize || this.primaryBorderColor, this.requirementTextColor = this.requirementTextColor || this.primaryTextColor, this.relationColor = this.relationColor || this.lineColor, this.relationLabelBackground = this.relationLabelBackground || this.edgeLabelBackground, this.relationLabelColor = this.relationLabelColor || this.actorTextColor, this.git0 = Y(this.pie1, 25) || this.primaryColor, this.git1 = this.pie2 || this.secondaryColor, this.git2 = this.pie3 || this.tertiaryColor, this.git3 = this.pie4 || p(this.primaryColor, { h: -30 }), this.git4 = this.pie5 || p(this.primaryColor, { h: -60 }), this.git5 = this.pie6 || p(this.primaryColor, { h: -90 }), this.git6 = this.pie7 || p(this.primaryColor, { h: 60 }), this.git7 = this.pie8 || p(this.primaryColor, { h: 120 }), this.gitInv0 = this.gitInv0 || w(this.git0), this.gitInv1 = this.gitInv1 || w(this.git1), this.gitInv2 = this.gitInv2 || w(this.git2), this.gitInv3 = this.gitInv3 || w(this.git3), this.gitInv4 = this.gitInv4 || w(this.git4), this.gitInv5 = this.gitInv5 || w(this.git5), this.gitInv6 = this.gitInv6 || w(this.git6), this.gitInv7 = this.gitInv7 || w(this.git7), this.branchLabelColor = this.branchLabelColor || this.labelTextColor, this.gitBranchLabel0 = this.branchLabelColor, this.gitBranchLabel1 = "white", this.gitBranchLabel2 = this.branchLabelColor, this.gitBranchLabel3 = "white", this.gitBranchLabel4 = this.branchLabelColor, this.gitBranchLabel5 = this.branchLabelColor, this.gitBranchLabel6 = this.branchLabelColor, this.gitBranchLabel7 = this.branchLabelColor, this.tagLabelColor = this.tagLabelColor || this.primaryTextColor, this.tagLabelBackground = this.tagLabelBackground || this.primaryColor, this.tagLabelBorder = this.tagBorder || this.primaryBorderColor, this.tagLabelFontSize = this.tagLabelFontSize || "10px", this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor, this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor, this.commitLabelFontSize = this.commitLabelFontSize || "10px", this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || kr, this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || xr;
  }
  calculate(i) {
    if (typeof i != "object") {
      this.updateColors();
      return;
    }
    const o = Object.keys(i);
    o.forEach((s) => {
      this[s] = i[s];
    }), this.updateColors(), o.forEach((s) => {
      this[s] = i[s];
    });
  }
}
const Uc = (t) => {
  const i = new Hc();
  return i.calculate(t), i;
}, li = {
  base: {
    getThemeVariables: Nc
  },
  dark: {
    getThemeVariables: Ic
  },
  default: {
    getThemeVariables: Pc
  },
  forest: {
    getThemeVariables: zc
  },
  neutral: {
    getThemeVariables: Uc
  }
}, De = {
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
  themeVariables: li.default.getThemeVariables(),
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
    defaultRenderer: "dagre-wrapper"
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
    useMaxWidth: !0
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
De.class && (De.class.arrowMarkerAbsolute = De.arrowMarkerAbsolute);
De.gitGraph && (De.gitGraph.arrowMarkerAbsolute = De.arrowMarkerAbsolute);
const Gn = (t, i = "") => Object.keys(t).reduce((o, s) => Array.isArray(t[s]) ? o : typeof t[s] == "object" && t[s] !== null ? [...o, i + s, ...Gn(t[s], "")] : [...o, i + s], []), iu = Gn(De, ""), qc = De, lo = function(t, i, o) {
  const { depth: s, clobber: l } = Object.assign({ depth: 2, clobber: !1 }, o);
  return Array.isArray(i) && !Array.isArray(t) ? (i.forEach((c) => lo(t, c, o)), t) : Array.isArray(i) && Array.isArray(t) ? (i.forEach((c) => {
    t.includes(c) || t.push(c);
  }), t) : t === void 0 || s <= 0 ? t != null && typeof t == "object" && typeof i == "object" ? Object.assign(t, i) : i : (i !== void 0 && typeof t == "object" && typeof i == "object" && Object.keys(i).forEach((c) => {
    typeof i[c] == "object" && (t[c] === void 0 || typeof t[c] == "object") ? (t[c] === void 0 && (t[c] = Array.isArray(i[c]) ? [] : {}), t[c] = lo(t[c], i[c], { depth: s - 1, clobber: l })) : (l || typeof t[c] != "object" && typeof i[c] != "object") && (t[c] = i[c]);
  }), t);
}, Dt = lo, yo = Object.freeze(qc);
let Ft = Dt({}, yo), Vn, ui = [], wi = Dt({}, yo);
const Sr = (t, i) => {
  let o = Dt({}, t), s = {};
  for (const l of i)
    jn(l), s = Dt(s, l);
  if (o = Dt(o, s), s.theme && s.theme in li) {
    const l = Dt({}, Vn), c = Dt(
      l.themeVariables || {},
      s.themeVariables
    );
    o.theme && o.theme in li && (o.themeVariables = li[o.theme].getThemeVariables(c));
  }
  return wi = o, Zn(wi), wi;
}, ru = (t) => (Ft = Dt({}, yo), Ft = Dt(Ft, t), t.theme && li[t.theme] && (Ft.themeVariables = li[t.theme].getThemeVariables(t.themeVariables)), Sr(Ft, ui), Ft), ou = (t) => {
  Vn = Dt({}, t);
}, nu = (t) => (Ft = Dt(Ft, t), Sr(Ft, ui), Ft), su = () => Dt({}, Ft), au = (t) => (Zn(t), Dt(wi, t), $c()), $c = () => Dt({}, wi), jn = (t) => {
  ["secure", ...Ft.secure ?? []].forEach((i) => {
    t[i] !== void 0 && (Mt.debug(`Denied attempt to modify a secure key ${i}`, t[i]), delete t[i]);
  }), Object.keys(t).forEach((i) => {
    i.indexOf("__") === 0 && delete t[i];
  }), Object.keys(t).forEach((i) => {
    typeof t[i] == "string" && (t[i].includes("<") || t[i].includes(">") || t[i].includes("url(data:")) && delete t[i], typeof t[i] == "object" && jn(t[i]);
  });
}, lu = (t) => {
  t.fontFamily && (t.themeVariables ? t.themeVariables.fontFamily || (t.themeVariables = { fontFamily: t.fontFamily }) : t.themeVariables = { fontFamily: t.fontFamily }), ui.push(t), Sr(Ft, ui);
}, hu = (t = Ft) => {
  ui = [], Sr(t, ui);
};
var Xn = /* @__PURE__ */ ((t) => (t.LAZY_LOAD_DEPRECATED = "The configuration options lazyLoadedDiagrams and loadExternalDiagramsAtStartup are deprecated. Please use registerExternalDiagrams instead.", t))(Xn || {});
const un = {}, Gc = (t) => {
  un[t] || (Mt.warn(Xn[t]), un[t] = !0);
}, Zn = (t) => {
  t && (t.lazyLoadedDiagrams || t.loadExternalDiagramsAtStartup) && Gc("LAZY_LOAD_DEPRECATED");
};
export {
  Me as A,
  Mi as B,
  Oi as C,
  Zo as D,
  gl as E,
  Ln as F,
  Zc as G,
  ps as H,
  N as I,
  Y as J,
  de as K,
  Vc as L,
  fs as M,
  gs as N,
  Ot as R,
  Nt as S,
  P as _,
  lu as a,
  ao as b,
  Dt as c,
  iu as d,
  Kc as e,
  Xc as f,
  $c as g,
  au as h,
  su as i,
  yo as j,
  uc as k,
  Mt as l,
  ou as m,
  ru as n,
  Tn as o,
  so as p,
  Ts as q,
  hu as r,
  jc as s,
  li as t,
  nu as u,
  dc as v,
  uo as w,
  vn as x,
  al as y,
  fo as z
};
//# sourceMappingURL=config-0b7a4e7d.js.map
