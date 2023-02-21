var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
function commonjsRequire(path) {
  throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var moment_minExports = {};
var moment_min = {
  get exports() {
    return moment_minExports;
  },
  set exports(v) {
    moment_minExports = v;
  }
};
(function(module, exports) {
  !function(e, t) {
    module.exports = t();
  }(commonjsGlobal, function() {
    var H;
    function f() {
      return H.apply(null, arguments);
    }
    function a(e2) {
      return e2 instanceof Array || "[object Array]" === Object.prototype.toString.call(e2);
    }
    function F(e2) {
      return null != e2 && "[object Object]" === Object.prototype.toString.call(e2);
    }
    function c(e2, t2) {
      return Object.prototype.hasOwnProperty.call(e2, t2);
    }
    function L(e2) {
      if (Object.getOwnPropertyNames)
        return 0 === Object.getOwnPropertyNames(e2).length;
      for (var t2 in e2)
        if (c(e2, t2))
          return;
      return 1;
    }
    function o(e2) {
      return void 0 === e2;
    }
    function u(e2) {
      return "number" == typeof e2 || "[object Number]" === Object.prototype.toString.call(e2);
    }
    function V(e2) {
      return e2 instanceof Date || "[object Date]" === Object.prototype.toString.call(e2);
    }
    function G(e2, t2) {
      for (var n2 = [], s2 = e2.length, i2 = 0; i2 < s2; ++i2)
        n2.push(t2(e2[i2], i2));
      return n2;
    }
    function E(e2, t2) {
      for (var n2 in t2)
        c(t2, n2) && (e2[n2] = t2[n2]);
      return c(t2, "toString") && (e2.toString = t2.toString), c(t2, "valueOf") && (e2.valueOf = t2.valueOf), e2;
    }
    function l(e2, t2, n2, s2) {
      return Pt(e2, t2, n2, s2, true).utc();
    }
    function m(e2) {
      return null == e2._pf && (e2._pf = { empty: false, unusedTokens: [], unusedInput: [], overflow: -2, charsLeftOver: 0, nullInput: false, invalidEra: null, invalidMonth: null, invalidFormat: false, userInvalidated: false, iso: false, parsedDateParts: [], era: null, meridiem: null, rfc2822: false, weekdayMismatch: false }), e2._pf;
    }
    function A(e2) {
      if (null == e2._isValid) {
        var t2 = m(e2), n2 = j.call(t2.parsedDateParts, function(e3) {
          return null != e3;
        }), n2 = !isNaN(e2._d.getTime()) && t2.overflow < 0 && !t2.empty && !t2.invalidEra && !t2.invalidMonth && !t2.invalidWeekday && !t2.weekdayMismatch && !t2.nullInput && !t2.invalidFormat && !t2.userInvalidated && (!t2.meridiem || t2.meridiem && n2);
        if (e2._strict && (n2 = n2 && 0 === t2.charsLeftOver && 0 === t2.unusedTokens.length && void 0 === t2.bigHour), null != Object.isFrozen && Object.isFrozen(e2))
          return n2;
        e2._isValid = n2;
      }
      return e2._isValid;
    }
    function I(e2) {
      var t2 = l(NaN);
      return null != e2 ? E(m(t2), e2) : m(t2).userInvalidated = true, t2;
    }
    var j = Array.prototype.some || function(e2) {
      for (var t2 = Object(this), n2 = t2.length >>> 0, s2 = 0; s2 < n2; s2++)
        if (s2 in t2 && e2.call(this, t2[s2], s2, t2))
          return true;
      return false;
    }, Z = f.momentProperties = [], z = false;
    function $(e2, t2) {
      var n2, s2, i2, r2 = Z.length;
      if (o(t2._isAMomentObject) || (e2._isAMomentObject = t2._isAMomentObject), o(t2._i) || (e2._i = t2._i), o(t2._f) || (e2._f = t2._f), o(t2._l) || (e2._l = t2._l), o(t2._strict) || (e2._strict = t2._strict), o(t2._tzm) || (e2._tzm = t2._tzm), o(t2._isUTC) || (e2._isUTC = t2._isUTC), o(t2._offset) || (e2._offset = t2._offset), o(t2._pf) || (e2._pf = m(t2)), o(t2._locale) || (e2._locale = t2._locale), 0 < r2)
        for (n2 = 0; n2 < r2; n2++)
          o(i2 = t2[s2 = Z[n2]]) || (e2[s2] = i2);
      return e2;
    }
    function q(e2) {
      $(this, e2), this._d = new Date(null != e2._d ? e2._d.getTime() : NaN), this.isValid() || (this._d = new Date(NaN)), false === z && (z = true, f.updateOffset(this), z = false);
    }
    function h(e2) {
      return e2 instanceof q || null != e2 && null != e2._isAMomentObject;
    }
    function B(e2) {
      false === f.suppressDeprecationWarnings && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + e2);
    }
    function e(r2, a2) {
      var o2 = true;
      return E(function() {
        if (null != f.deprecationHandler && f.deprecationHandler(null, r2), o2) {
          for (var e2, t2, n2 = [], s2 = arguments.length, i2 = 0; i2 < s2; i2++) {
            if (e2 = "", "object" == typeof arguments[i2]) {
              for (t2 in e2 += "\n[" + i2 + "] ", arguments[0])
                c(arguments[0], t2) && (e2 += t2 + ": " + arguments[0][t2] + ", ");
              e2 = e2.slice(0, -2);
            } else
              e2 = arguments[i2];
            n2.push(e2);
          }
          B(r2 + "\nArguments: " + Array.prototype.slice.call(n2).join("") + "\n" + new Error().stack), o2 = false;
        }
        return a2.apply(this, arguments);
      }, a2);
    }
    var J = {};
    function Q(e2, t2) {
      null != f.deprecationHandler && f.deprecationHandler(e2, t2), J[e2] || (B(t2), J[e2] = true);
    }
    function d(e2) {
      return "undefined" != typeof Function && e2 instanceof Function || "[object Function]" === Object.prototype.toString.call(e2);
    }
    function X(e2, t2) {
      var n2, s2 = E({}, e2);
      for (n2 in t2)
        c(t2, n2) && (F(e2[n2]) && F(t2[n2]) ? (s2[n2] = {}, E(s2[n2], e2[n2]), E(s2[n2], t2[n2])) : null != t2[n2] ? s2[n2] = t2[n2] : delete s2[n2]);
      for (n2 in e2)
        c(e2, n2) && !c(t2, n2) && F(e2[n2]) && (s2[n2] = E({}, s2[n2]));
      return s2;
    }
    function K(e2) {
      null != e2 && this.set(e2);
    }
    f.suppressDeprecationWarnings = false, f.deprecationHandler = null;
    var ee = Object.keys || function(e2) {
      var t2, n2 = [];
      for (t2 in e2)
        c(e2, t2) && n2.push(t2);
      return n2;
    };
    function r(e2, t2, n2) {
      var s2 = "" + Math.abs(e2);
      return (0 <= e2 ? n2 ? "+" : "" : "-") + Math.pow(10, Math.max(0, t2 - s2.length)).toString().substr(1) + s2;
    }
    var te = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g, ne = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, se = {}, ie = {};
    function s(e2, t2, n2, s2) {
      var i2 = "string" == typeof s2 ? function() {
        return this[s2]();
      } : s2;
      e2 && (ie[e2] = i2), t2 && (ie[t2[0]] = function() {
        return r(i2.apply(this, arguments), t2[1], t2[2]);
      }), n2 && (ie[n2] = function() {
        return this.localeData().ordinal(i2.apply(this, arguments), e2);
      });
    }
    function re(e2, t2) {
      return e2.isValid() ? (t2 = ae(t2, e2.localeData()), se[t2] = se[t2] || function(s2) {
        for (var e3, i2 = s2.match(te), t3 = 0, r2 = i2.length; t3 < r2; t3++)
          ie[i2[t3]] ? i2[t3] = ie[i2[t3]] : i2[t3] = (e3 = i2[t3]).match(/\[[\s\S]/) ? e3.replace(/^\[|\]$/g, "") : e3.replace(/\\/g, "");
        return function(e4) {
          for (var t4 = "", n2 = 0; n2 < r2; n2++)
            t4 += d(i2[n2]) ? i2[n2].call(e4, s2) : i2[n2];
          return t4;
        };
      }(t2), se[t2](e2)) : e2.localeData().invalidDate();
    }
    function ae(e2, t2) {
      var n2 = 5;
      function s2(e3) {
        return t2.longDateFormat(e3) || e3;
      }
      for (ne.lastIndex = 0; 0 <= n2 && ne.test(e2); )
        e2 = e2.replace(ne, s2), ne.lastIndex = 0, --n2;
      return e2;
    }
    var oe = {};
    function t(e2, t2) {
      var n2 = e2.toLowerCase();
      oe[n2] = oe[n2 + "s"] = oe[t2] = e2;
    }
    function _2(e2) {
      return "string" == typeof e2 ? oe[e2] || oe[e2.toLowerCase()] : void 0;
    }
    function ue(e2) {
      var t2, n2, s2 = {};
      for (n2 in e2)
        c(e2, n2) && (t2 = _2(n2)) && (s2[t2] = e2[n2]);
      return s2;
    }
    var le = {};
    function n(e2, t2) {
      le[e2] = t2;
    }
    function he(e2) {
      return e2 % 4 == 0 && e2 % 100 != 0 || e2 % 400 == 0;
    }
    function y(e2) {
      return e2 < 0 ? Math.ceil(e2) || 0 : Math.floor(e2);
    }
    function g(e2) {
      var e2 = +e2, t2 = 0;
      return t2 = 0 != e2 && isFinite(e2) ? y(e2) : t2;
    }
    function de(t2, n2) {
      return function(e2) {
        return null != e2 ? (fe(this, t2, e2), f.updateOffset(this, n2), this) : ce(this, t2);
      };
    }
    function ce(e2, t2) {
      return e2.isValid() ? e2._d["get" + (e2._isUTC ? "UTC" : "") + t2]() : NaN;
    }
    function fe(e2, t2, n2) {
      e2.isValid() && !isNaN(n2) && ("FullYear" === t2 && he(e2.year()) && 1 === e2.month() && 29 === e2.date() ? (n2 = g(n2), e2._d["set" + (e2._isUTC ? "UTC" : "") + t2](n2, e2.month(), We(n2, e2.month()))) : e2._d["set" + (e2._isUTC ? "UTC" : "") + t2](n2));
    }
    var i = /\d/, w = /\d\d/, me = /\d{3}/, _e = /\d{4}/, ye = /[+-]?\d{6}/, p = /\d\d?/, ge = /\d\d\d\d?/, we = /\d\d\d\d\d\d?/, pe = /\d{1,3}/, ke = /\d{1,4}/, ve = /[+-]?\d{1,6}/, Me = /\d+/, De = /[+-]?\d+/, Se = /Z|[+-]\d\d:?\d\d/gi, Ye = /Z|[+-]\d\d(?::?\d\d)?/gi, k = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i;
    function v(e2, n2, s2) {
      be[e2] = d(n2) ? n2 : function(e3, t2) {
        return e3 && s2 ? s2 : n2;
      };
    }
    function Oe(e2, t2) {
      return c(be, e2) ? be[e2](t2._strict, t2._locale) : new RegExp(M(e2.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(e3, t3, n2, s2, i2) {
        return t3 || n2 || s2 || i2;
      })));
    }
    function M(e2) {
      return e2.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
    }
    var be = {}, xe = {};
    function D(e2, n2) {
      var t2, s2, i2 = n2;
      for ("string" == typeof e2 && (e2 = [e2]), u(n2) && (i2 = function(e3, t3) {
        t3[n2] = g(e3);
      }), s2 = e2.length, t2 = 0; t2 < s2; t2++)
        xe[e2[t2]] = i2;
    }
    function Te(e2, i2) {
      D(e2, function(e3, t2, n2, s2) {
        n2._w = n2._w || {}, i2(e3, n2._w, n2, s2);
      });
    }
    var S, Y = 0, O = 1, b = 2, x = 3, T = 4, N = 5, Ne = 6, Pe = 7, Re = 8;
    function We(e2, t2) {
      if (isNaN(e2) || isNaN(t2))
        return NaN;
      var n2 = (t2 % (n2 = 12) + n2) % n2;
      return e2 += (t2 - n2) / 12, 1 == n2 ? he(e2) ? 29 : 28 : 31 - n2 % 7 % 2;
    }
    S = Array.prototype.indexOf || function(e2) {
      for (var t2 = 0; t2 < this.length; ++t2)
        if (this[t2] === e2)
          return t2;
      return -1;
    }, s("M", ["MM", 2], "Mo", function() {
      return this.month() + 1;
    }), s("MMM", 0, 0, function(e2) {
      return this.localeData().monthsShort(this, e2);
    }), s("MMMM", 0, 0, function(e2) {
      return this.localeData().months(this, e2);
    }), t("month", "M"), n("month", 8), v("M", p), v("MM", p, w), v("MMM", function(e2, t2) {
      return t2.monthsShortRegex(e2);
    }), v("MMMM", function(e2, t2) {
      return t2.monthsRegex(e2);
    }), D(["M", "MM"], function(e2, t2) {
      t2[O] = g(e2) - 1;
    }), D(["MMM", "MMMM"], function(e2, t2, n2, s2) {
      s2 = n2._locale.monthsParse(e2, s2, n2._strict);
      null != s2 ? t2[O] = s2 : m(n2).invalidMonth = e2;
    });
    var Ce = "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), Ue = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), He = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/, Fe = k, Le = k;
    function Ve(e2, t2) {
      var n2;
      if (e2.isValid()) {
        if ("string" == typeof t2) {
          if (/^\d+$/.test(t2))
            t2 = g(t2);
          else if (!u(t2 = e2.localeData().monthsParse(t2)))
            return;
        }
        n2 = Math.min(e2.date(), We(e2.year(), t2)), e2._d["set" + (e2._isUTC ? "UTC" : "") + "Month"](t2, n2);
      }
    }
    function Ge(e2) {
      return null != e2 ? (Ve(this, e2), f.updateOffset(this, true), this) : ce(this, "Month");
    }
    function Ee() {
      function e2(e3, t3) {
        return t3.length - e3.length;
      }
      for (var t2, n2 = [], s2 = [], i2 = [], r2 = 0; r2 < 12; r2++)
        t2 = l([2e3, r2]), n2.push(this.monthsShort(t2, "")), s2.push(this.months(t2, "")), i2.push(this.months(t2, "")), i2.push(this.monthsShort(t2, ""));
      for (n2.sort(e2), s2.sort(e2), i2.sort(e2), r2 = 0; r2 < 12; r2++)
        n2[r2] = M(n2[r2]), s2[r2] = M(s2[r2]);
      for (r2 = 0; r2 < 24; r2++)
        i2[r2] = M(i2[r2]);
      this._monthsRegex = new RegExp("^(" + i2.join("|") + ")", "i"), this._monthsShortRegex = this._monthsRegex, this._monthsStrictRegex = new RegExp("^(" + s2.join("|") + ")", "i"), this._monthsShortStrictRegex = new RegExp("^(" + n2.join("|") + ")", "i");
    }
    function Ae(e2) {
      return he(e2) ? 366 : 365;
    }
    s("Y", 0, 0, function() {
      var e2 = this.year();
      return e2 <= 9999 ? r(e2, 4) : "+" + e2;
    }), s(0, ["YY", 2], 0, function() {
      return this.year() % 100;
    }), s(0, ["YYYY", 4], 0, "year"), s(0, ["YYYYY", 5], 0, "year"), s(0, ["YYYYYY", 6, true], 0, "year"), t("year", "y"), n("year", 1), v("Y", De), v("YY", p, w), v("YYYY", ke, _e), v("YYYYY", ve, ye), v("YYYYYY", ve, ye), D(["YYYYY", "YYYYYY"], Y), D("YYYY", function(e2, t2) {
      t2[Y] = 2 === e2.length ? f.parseTwoDigitYear(e2) : g(e2);
    }), D("YY", function(e2, t2) {
      t2[Y] = f.parseTwoDigitYear(e2);
    }), D("Y", function(e2, t2) {
      t2[Y] = parseInt(e2, 10);
    }), f.parseTwoDigitYear = function(e2) {
      return g(e2) + (68 < g(e2) ? 1900 : 2e3);
    };
    var Ie = de("FullYear", true);
    function je(e2, t2, n2, s2, i2, r2, a2) {
      var o2;
      return e2 < 100 && 0 <= e2 ? (o2 = new Date(e2 + 400, t2, n2, s2, i2, r2, a2), isFinite(o2.getFullYear()) && o2.setFullYear(e2)) : o2 = new Date(e2, t2, n2, s2, i2, r2, a2), o2;
    }
    function Ze(e2) {
      var t2;
      return e2 < 100 && 0 <= e2 ? ((t2 = Array.prototype.slice.call(arguments))[0] = e2 + 400, t2 = new Date(Date.UTC.apply(null, t2)), isFinite(t2.getUTCFullYear()) && t2.setUTCFullYear(e2)) : t2 = new Date(Date.UTC.apply(null, arguments)), t2;
    }
    function ze(e2, t2, n2) {
      n2 = 7 + t2 - n2;
      return n2 - (7 + Ze(e2, 0, n2).getUTCDay() - t2) % 7 - 1;
    }
    function $e(e2, t2, n2, s2, i2) {
      var r2, t2 = 1 + 7 * (t2 - 1) + (7 + n2 - s2) % 7 + ze(e2, s2, i2), n2 = t2 <= 0 ? Ae(r2 = e2 - 1) + t2 : t2 > Ae(e2) ? (r2 = e2 + 1, t2 - Ae(e2)) : (r2 = e2, t2);
      return { year: r2, dayOfYear: n2 };
    }
    function qe(e2, t2, n2) {
      var s2, i2, r2 = ze(e2.year(), t2, n2), r2 = Math.floor((e2.dayOfYear() - r2 - 1) / 7) + 1;
      return r2 < 1 ? s2 = r2 + P(i2 = e2.year() - 1, t2, n2) : r2 > P(e2.year(), t2, n2) ? (s2 = r2 - P(e2.year(), t2, n2), i2 = e2.year() + 1) : (i2 = e2.year(), s2 = r2), { week: s2, year: i2 };
    }
    function P(e2, t2, n2) {
      var s2 = ze(e2, t2, n2), t2 = ze(e2 + 1, t2, n2);
      return (Ae(e2) - s2 + t2) / 7;
    }
    s("w", ["ww", 2], "wo", "week"), s("W", ["WW", 2], "Wo", "isoWeek"), t("week", "w"), t("isoWeek", "W"), n("week", 5), n("isoWeek", 5), v("w", p), v("ww", p, w), v("W", p), v("WW", p, w), Te(["w", "ww", "W", "WW"], function(e2, t2, n2, s2) {
      t2[s2.substr(0, 1)] = g(e2);
    });
    function Be(e2, t2) {
      return e2.slice(t2, 7).concat(e2.slice(0, t2));
    }
    s("d", 0, "do", "day"), s("dd", 0, 0, function(e2) {
      return this.localeData().weekdaysMin(this, e2);
    }), s("ddd", 0, 0, function(e2) {
      return this.localeData().weekdaysShort(this, e2);
    }), s("dddd", 0, 0, function(e2) {
      return this.localeData().weekdays(this, e2);
    }), s("e", 0, 0, "weekday"), s("E", 0, 0, "isoWeekday"), t("day", "d"), t("weekday", "e"), t("isoWeekday", "E"), n("day", 11), n("weekday", 11), n("isoWeekday", 11), v("d", p), v("e", p), v("E", p), v("dd", function(e2, t2) {
      return t2.weekdaysMinRegex(e2);
    }), v("ddd", function(e2, t2) {
      return t2.weekdaysShortRegex(e2);
    }), v("dddd", function(e2, t2) {
      return t2.weekdaysRegex(e2);
    }), Te(["dd", "ddd", "dddd"], function(e2, t2, n2, s2) {
      s2 = n2._locale.weekdaysParse(e2, s2, n2._strict);
      null != s2 ? t2.d = s2 : m(n2).invalidWeekday = e2;
    }), Te(["d", "e", "E"], function(e2, t2, n2, s2) {
      t2[s2] = g(e2);
    });
    var Je = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), Qe = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), Xe = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), Ke = k, et = k, tt = k;
    function nt() {
      function e2(e3, t3) {
        return t3.length - e3.length;
      }
      for (var t2, n2, s2, i2 = [], r2 = [], a2 = [], o2 = [], u2 = 0; u2 < 7; u2++)
        s2 = l([2e3, 1]).day(u2), t2 = M(this.weekdaysMin(s2, "")), n2 = M(this.weekdaysShort(s2, "")), s2 = M(this.weekdays(s2, "")), i2.push(t2), r2.push(n2), a2.push(s2), o2.push(t2), o2.push(n2), o2.push(s2);
      i2.sort(e2), r2.sort(e2), a2.sort(e2), o2.sort(e2), this._weekdaysRegex = new RegExp("^(" + o2.join("|") + ")", "i"), this._weekdaysShortRegex = this._weekdaysRegex, this._weekdaysMinRegex = this._weekdaysRegex, this._weekdaysStrictRegex = new RegExp("^(" + a2.join("|") + ")", "i"), this._weekdaysShortStrictRegex = new RegExp("^(" + r2.join("|") + ")", "i"), this._weekdaysMinStrictRegex = new RegExp("^(" + i2.join("|") + ")", "i");
    }
    function st() {
      return this.hours() % 12 || 12;
    }
    function it(e2, t2) {
      s(e2, 0, 0, function() {
        return this.localeData().meridiem(this.hours(), this.minutes(), t2);
      });
    }
    function rt(e2, t2) {
      return t2._meridiemParse;
    }
    s("H", ["HH", 2], 0, "hour"), s("h", ["hh", 2], 0, st), s("k", ["kk", 2], 0, function() {
      return this.hours() || 24;
    }), s("hmm", 0, 0, function() {
      return "" + st.apply(this) + r(this.minutes(), 2);
    }), s("hmmss", 0, 0, function() {
      return "" + st.apply(this) + r(this.minutes(), 2) + r(this.seconds(), 2);
    }), s("Hmm", 0, 0, function() {
      return "" + this.hours() + r(this.minutes(), 2);
    }), s("Hmmss", 0, 0, function() {
      return "" + this.hours() + r(this.minutes(), 2) + r(this.seconds(), 2);
    }), it("a", true), it("A", false), t("hour", "h"), n("hour", 13), v("a", rt), v("A", rt), v("H", p), v("h", p), v("k", p), v("HH", p, w), v("hh", p, w), v("kk", p, w), v("hmm", ge), v("hmmss", we), v("Hmm", ge), v("Hmmss", we), D(["H", "HH"], x), D(["k", "kk"], function(e2, t2, n2) {
      e2 = g(e2);
      t2[x] = 24 === e2 ? 0 : e2;
    }), D(["a", "A"], function(e2, t2, n2) {
      n2._isPm = n2._locale.isPM(e2), n2._meridiem = e2;
    }), D(["h", "hh"], function(e2, t2, n2) {
      t2[x] = g(e2), m(n2).bigHour = true;
    }), D("hmm", function(e2, t2, n2) {
      var s2 = e2.length - 2;
      t2[x] = g(e2.substr(0, s2)), t2[T] = g(e2.substr(s2)), m(n2).bigHour = true;
    }), D("hmmss", function(e2, t2, n2) {
      var s2 = e2.length - 4, i2 = e2.length - 2;
      t2[x] = g(e2.substr(0, s2)), t2[T] = g(e2.substr(s2, 2)), t2[N] = g(e2.substr(i2)), m(n2).bigHour = true;
    }), D("Hmm", function(e2, t2, n2) {
      var s2 = e2.length - 2;
      t2[x] = g(e2.substr(0, s2)), t2[T] = g(e2.substr(s2));
    }), D("Hmmss", function(e2, t2, n2) {
      var s2 = e2.length - 4, i2 = e2.length - 2;
      t2[x] = g(e2.substr(0, s2)), t2[T] = g(e2.substr(s2, 2)), t2[N] = g(e2.substr(i2));
    });
    k = de("Hours", true);
    var at, ot = { calendar: { sameDay: "[Today at] LT", nextDay: "[Tomorrow at] LT", nextWeek: "dddd [at] LT", lastDay: "[Yesterday at] LT", lastWeek: "[Last] dddd [at] LT", sameElse: "L" }, longDateFormat: { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" }, invalidDate: "Invalid date", ordinal: "%d", dayOfMonthOrdinalParse: /\d{1,2}/, relativeTime: { future: "in %s", past: "%s ago", s: "a few seconds", ss: "%d seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", w: "a week", ww: "%d weeks", M: "a month", MM: "%d months", y: "a year", yy: "%d years" }, months: Ce, monthsShort: Ue, week: { dow: 0, doy: 6 }, weekdays: Je, weekdaysMin: Xe, weekdaysShort: Qe, meridiemParse: /[ap]\.?m?\.?/i }, R = {}, ut = {};
    function lt(e2) {
      return e2 && e2.toLowerCase().replace("_", "-");
    }
    function ht(e2) {
      for (var t2, n2, s2, i2, r2 = 0; r2 < e2.length; ) {
        for (t2 = (i2 = lt(e2[r2]).split("-")).length, n2 = (n2 = lt(e2[r2 + 1])) ? n2.split("-") : null; 0 < t2; ) {
          if (s2 = dt(i2.slice(0, t2).join("-")))
            return s2;
          if (n2 && n2.length >= t2 && function(e3, t3) {
            for (var n3 = Math.min(e3.length, t3.length), s3 = 0; s3 < n3; s3 += 1)
              if (e3[s3] !== t3[s3])
                return s3;
            return n3;
          }(i2, n2) >= t2 - 1)
            break;
          t2--;
        }
        r2++;
      }
      return at;
    }
    function dt(t2) {
      var e2;
      if (void 0 === R[t2] && true && module && module.exports && null != t2.match("^[^/\\\\]*$"))
        try {
          e2 = at._abbr, commonjsRequire("./locale/" + t2), ct(e2);
        } catch (e3) {
          R[t2] = null;
        }
      return R[t2];
    }
    function ct(e2, t2) {
      return e2 && ((t2 = o(t2) ? mt(e2) : ft(e2, t2)) ? at = t2 : "undefined" != typeof console && console.warn && console.warn("Locale " + e2 + " not found. Did you forget to load it?")), at._abbr;
    }
    function ft(e2, t2) {
      if (null === t2)
        return delete R[e2], null;
      var n2, s2 = ot;
      if (t2.abbr = e2, null != R[e2])
        Q("defineLocaleOverride", "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."), s2 = R[e2]._config;
      else if (null != t2.parentLocale)
        if (null != R[t2.parentLocale])
          s2 = R[t2.parentLocale]._config;
        else {
          if (null == (n2 = dt(t2.parentLocale)))
            return ut[t2.parentLocale] || (ut[t2.parentLocale] = []), ut[t2.parentLocale].push({ name: e2, config: t2 }), null;
          s2 = n2._config;
        }
      return R[e2] = new K(X(s2, t2)), ut[e2] && ut[e2].forEach(function(e3) {
        ft(e3.name, e3.config);
      }), ct(e2), R[e2];
    }
    function mt(e2) {
      var t2;
      if (!(e2 = e2 && e2._locale && e2._locale._abbr ? e2._locale._abbr : e2))
        return at;
      if (!a(e2)) {
        if (t2 = dt(e2))
          return t2;
        e2 = [e2];
      }
      return ht(e2);
    }
    function _t(e2) {
      var t2 = e2._a;
      return t2 && -2 === m(e2).overflow && (t2 = t2[O] < 0 || 11 < t2[O] ? O : t2[b] < 1 || t2[b] > We(t2[Y], t2[O]) ? b : t2[x] < 0 || 24 < t2[x] || 24 === t2[x] && (0 !== t2[T] || 0 !== t2[N] || 0 !== t2[Ne]) ? x : t2[T] < 0 || 59 < t2[T] ? T : t2[N] < 0 || 59 < t2[N] ? N : t2[Ne] < 0 || 999 < t2[Ne] ? Ne : -1, m(e2)._overflowDayOfYear && (t2 < Y || b < t2) && (t2 = b), m(e2)._overflowWeeks && -1 === t2 && (t2 = Pe), m(e2)._overflowWeekday && -1 === t2 && (t2 = Re), m(e2).overflow = t2), e2;
    }
    var yt = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, gt = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, wt = /Z|[+-]\d\d(?::?\d\d)?/, pt = [["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/], ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/], ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/], ["GGGG-[W]WW", /\d{4}-W\d\d/, false], ["YYYY-DDD", /\d{4}-\d{3}/], ["YYYY-MM", /\d{4}-\d\d/, false], ["YYYYYYMMDD", /[+-]\d{10}/], ["YYYYMMDD", /\d{8}/], ["GGGG[W]WWE", /\d{4}W\d{3}/], ["GGGG[W]WW", /\d{4}W\d{2}/, false], ["YYYYDDD", /\d{7}/], ["YYYYMM", /\d{6}/, false], ["YYYY", /\d{4}/, false]], kt = [["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/], ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/], ["HH:mm:ss", /\d\d:\d\d:\d\d/], ["HH:mm", /\d\d:\d\d/], ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/], ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/], ["HHmmss", /\d\d\d\d\d\d/], ["HHmm", /\d\d\d\d/], ["HH", /\d\d/]], vt = /^\/?Date\((-?\d+)/i, Mt = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/, Dt = { UT: 0, GMT: 0, EDT: -240, EST: -300, CDT: -300, CST: -360, MDT: -360, MST: -420, PDT: -420, PST: -480 };
    function St(e2) {
      var t2, n2, s2, i2, r2, a2, o2 = e2._i, u2 = yt.exec(o2) || gt.exec(o2), o2 = pt.length, l2 = kt.length;
      if (u2) {
        for (m(e2).iso = true, t2 = 0, n2 = o2; t2 < n2; t2++)
          if (pt[t2][1].exec(u2[1])) {
            i2 = pt[t2][0], s2 = false !== pt[t2][2];
            break;
          }
        if (null == i2)
          e2._isValid = false;
        else {
          if (u2[3]) {
            for (t2 = 0, n2 = l2; t2 < n2; t2++)
              if (kt[t2][1].exec(u2[3])) {
                r2 = (u2[2] || " ") + kt[t2][0];
                break;
              }
            if (null == r2)
              return void (e2._isValid = false);
          }
          if (s2 || null == r2) {
            if (u2[4]) {
              if (!wt.exec(u2[4]))
                return void (e2._isValid = false);
              a2 = "Z";
            }
            e2._f = i2 + (r2 || "") + (a2 || ""), Tt(e2);
          } else
            e2._isValid = false;
        }
      } else
        e2._isValid = false;
    }
    function Yt(e2, t2, n2, s2, i2, r2) {
      e2 = [function(e3) {
        e3 = parseInt(e3, 10);
        {
          if (e3 <= 49)
            return 2e3 + e3;
          if (e3 <= 999)
            return 1900 + e3;
        }
        return e3;
      }(e2), Ue.indexOf(t2), parseInt(n2, 10), parseInt(s2, 10), parseInt(i2, 10)];
      return r2 && e2.push(parseInt(r2, 10)), e2;
    }
    function Ot(e2) {
      var t2, n2, s2, i2, r2 = Mt.exec(e2._i.replace(/\([^()]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, ""));
      r2 ? (t2 = Yt(r2[4], r2[3], r2[2], r2[5], r2[6], r2[7]), n2 = r2[1], s2 = t2, i2 = e2, n2 && Qe.indexOf(n2) !== new Date(s2[0], s2[1], s2[2]).getDay() ? (m(i2).weekdayMismatch = true, i2._isValid = false) : (e2._a = t2, e2._tzm = (n2 = r2[8], s2 = r2[9], i2 = r2[10], n2 ? Dt[n2] : s2 ? 0 : 60 * (((n2 = parseInt(i2, 10)) - (s2 = n2 % 100)) / 100) + s2), e2._d = Ze.apply(null, e2._a), e2._d.setUTCMinutes(e2._d.getUTCMinutes() - e2._tzm), m(e2).rfc2822 = true)) : e2._isValid = false;
    }
    function bt(e2, t2, n2) {
      return null != e2 ? e2 : null != t2 ? t2 : n2;
    }
    function xt(e2) {
      var t2, n2, s2, i2, r2, a2, o2, u2, l2, h2, d2, c2 = [];
      if (!e2._d) {
        for (s2 = e2, i2 = new Date(f.now()), n2 = s2._useUTC ? [i2.getUTCFullYear(), i2.getUTCMonth(), i2.getUTCDate()] : [i2.getFullYear(), i2.getMonth(), i2.getDate()], e2._w && null == e2._a[b] && null == e2._a[O] && (null != (i2 = (s2 = e2)._w).GG || null != i2.W || null != i2.E ? (u2 = 1, l2 = 4, r2 = bt(i2.GG, s2._a[Y], qe(W(), 1, 4).year), a2 = bt(i2.W, 1), ((o2 = bt(i2.E, 1)) < 1 || 7 < o2) && (h2 = true)) : (u2 = s2._locale._week.dow, l2 = s2._locale._week.doy, d2 = qe(W(), u2, l2), r2 = bt(i2.gg, s2._a[Y], d2.year), a2 = bt(i2.w, d2.week), null != i2.d ? ((o2 = i2.d) < 0 || 6 < o2) && (h2 = true) : null != i2.e ? (o2 = i2.e + u2, (i2.e < 0 || 6 < i2.e) && (h2 = true)) : o2 = u2), a2 < 1 || a2 > P(r2, u2, l2) ? m(s2)._overflowWeeks = true : null != h2 ? m(s2)._overflowWeekday = true : (d2 = $e(r2, a2, o2, u2, l2), s2._a[Y] = d2.year, s2._dayOfYear = d2.dayOfYear)), null != e2._dayOfYear && (i2 = bt(e2._a[Y], n2[Y]), (e2._dayOfYear > Ae(i2) || 0 === e2._dayOfYear) && (m(e2)._overflowDayOfYear = true), h2 = Ze(i2, 0, e2._dayOfYear), e2._a[O] = h2.getUTCMonth(), e2._a[b] = h2.getUTCDate()), t2 = 0; t2 < 3 && null == e2._a[t2]; ++t2)
          e2._a[t2] = c2[t2] = n2[t2];
        for (; t2 < 7; t2++)
          e2._a[t2] = c2[t2] = null == e2._a[t2] ? 2 === t2 ? 1 : 0 : e2._a[t2];
        24 === e2._a[x] && 0 === e2._a[T] && 0 === e2._a[N] && 0 === e2._a[Ne] && (e2._nextDay = true, e2._a[x] = 0), e2._d = (e2._useUTC ? Ze : je).apply(null, c2), r2 = e2._useUTC ? e2._d.getUTCDay() : e2._d.getDay(), null != e2._tzm && e2._d.setUTCMinutes(e2._d.getUTCMinutes() - e2._tzm), e2._nextDay && (e2._a[x] = 24), e2._w && void 0 !== e2._w.d && e2._w.d !== r2 && (m(e2).weekdayMismatch = true);
      }
    }
    function Tt(e2) {
      if (e2._f === f.ISO_8601)
        St(e2);
      else if (e2._f === f.RFC_2822)
        Ot(e2);
      else {
        e2._a = [], m(e2).empty = true;
        for (var t2, n2, s2, i2, r2, a2 = "" + e2._i, o2 = a2.length, u2 = 0, l2 = ae(e2._f, e2._locale).match(te) || [], h2 = l2.length, d2 = 0; d2 < h2; d2++)
          n2 = l2[d2], (t2 = (a2.match(Oe(n2, e2)) || [])[0]) && (0 < (s2 = a2.substr(0, a2.indexOf(t2))).length && m(e2).unusedInput.push(s2), a2 = a2.slice(a2.indexOf(t2) + t2.length), u2 += t2.length), ie[n2] ? (t2 ? m(e2).empty = false : m(e2).unusedTokens.push(n2), s2 = n2, r2 = e2, null != (i2 = t2) && c(xe, s2) && xe[s2](i2, r2._a, r2, s2)) : e2._strict && !t2 && m(e2).unusedTokens.push(n2);
        m(e2).charsLeftOver = o2 - u2, 0 < a2.length && m(e2).unusedInput.push(a2), e2._a[x] <= 12 && true === m(e2).bigHour && 0 < e2._a[x] && (m(e2).bigHour = void 0), m(e2).parsedDateParts = e2._a.slice(0), m(e2).meridiem = e2._meridiem, e2._a[x] = function(e3, t3, n3) {
          if (null == n3)
            return t3;
          return null != e3.meridiemHour ? e3.meridiemHour(t3, n3) : null != e3.isPM ? ((e3 = e3.isPM(n3)) && t3 < 12 && (t3 += 12), t3 = e3 || 12 !== t3 ? t3 : 0) : t3;
        }(e2._locale, e2._a[x], e2._meridiem), null !== (o2 = m(e2).era) && (e2._a[Y] = e2._locale.erasConvertYear(o2, e2._a[Y])), xt(e2), _t(e2);
      }
    }
    function Nt(e2) {
      var t2, n2, s2, i2 = e2._i, r2 = e2._f;
      if (e2._locale = e2._locale || mt(e2._l), null === i2 || void 0 === r2 && "" === i2)
        return I({ nullInput: true });
      if ("string" == typeof i2 && (e2._i = i2 = e2._locale.preparse(i2)), h(i2))
        return new q(_t(i2));
      if (V(i2))
        e2._d = i2;
      else if (a(r2))
        !function(e3) {
          var t3, n3, s3, i3, r3, a2, o2 = false, u2 = e3._f.length;
          if (0 === u2)
            return m(e3).invalidFormat = true, e3._d = new Date(NaN);
          for (i3 = 0; i3 < u2; i3++)
            r3 = 0, a2 = false, t3 = $({}, e3), null != e3._useUTC && (t3._useUTC = e3._useUTC), t3._f = e3._f[i3], Tt(t3), A(t3) && (a2 = true), r3 = (r3 += m(t3).charsLeftOver) + 10 * m(t3).unusedTokens.length, m(t3).score = r3, o2 ? r3 < s3 && (s3 = r3, n3 = t3) : (null == s3 || r3 < s3 || a2) && (s3 = r3, n3 = t3, a2 && (o2 = true));
          E(e3, n3 || t3);
        }(e2);
      else if (r2)
        Tt(e2);
      else if (o(r2 = (i2 = e2)._i))
        i2._d = new Date(f.now());
      else
        V(r2) ? i2._d = new Date(r2.valueOf()) : "string" == typeof r2 ? (n2 = i2, null !== (t2 = vt.exec(n2._i)) ? n2._d = new Date(+t2[1]) : (St(n2), false === n2._isValid && (delete n2._isValid, Ot(n2), false === n2._isValid && (delete n2._isValid, n2._strict ? n2._isValid = false : f.createFromInputFallback(n2))))) : a(r2) ? (i2._a = G(r2.slice(0), function(e3) {
          return parseInt(e3, 10);
        }), xt(i2)) : F(r2) ? (t2 = i2)._d || (s2 = void 0 === (n2 = ue(t2._i)).day ? n2.date : n2.day, t2._a = G([n2.year, n2.month, s2, n2.hour, n2.minute, n2.second, n2.millisecond], function(e3) {
          return e3 && parseInt(e3, 10);
        }), xt(t2)) : u(r2) ? i2._d = new Date(r2) : f.createFromInputFallback(i2);
      return A(e2) || (e2._d = null), e2;
    }
    function Pt(e2, t2, n2, s2, i2) {
      var r2 = {};
      return true !== t2 && false !== t2 || (s2 = t2, t2 = void 0), true !== n2 && false !== n2 || (s2 = n2, n2 = void 0), (F(e2) && L(e2) || a(e2) && 0 === e2.length) && (e2 = void 0), r2._isAMomentObject = true, r2._useUTC = r2._isUTC = i2, r2._l = n2, r2._i = e2, r2._f = t2, r2._strict = s2, (i2 = new q(_t(Nt(i2 = r2))))._nextDay && (i2.add(1, "d"), i2._nextDay = void 0), i2;
    }
    function W(e2, t2, n2, s2) {
      return Pt(e2, t2, n2, s2, false);
    }
    f.createFromInputFallback = e("value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.", function(e2) {
      e2._d = new Date(e2._i + (e2._useUTC ? " UTC" : ""));
    }), f.ISO_8601 = function() {
    }, f.RFC_2822 = function() {
    };
    ge = e("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/", function() {
      var e2 = W.apply(null, arguments);
      return this.isValid() && e2.isValid() ? e2 < this ? this : e2 : I();
    }), we = e("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/", function() {
      var e2 = W.apply(null, arguments);
      return this.isValid() && e2.isValid() ? this < e2 ? this : e2 : I();
    });
    function Rt(e2, t2) {
      var n2, s2;
      if (!(t2 = 1 === t2.length && a(t2[0]) ? t2[0] : t2).length)
        return W();
      for (n2 = t2[0], s2 = 1; s2 < t2.length; ++s2)
        t2[s2].isValid() && !t2[s2][e2](n2) || (n2 = t2[s2]);
      return n2;
    }
    var Wt = ["year", "quarter", "month", "week", "day", "hour", "minute", "second", "millisecond"];
    function Ct(e2) {
      var e2 = ue(e2), t2 = e2.year || 0, n2 = e2.quarter || 0, s2 = e2.month || 0, i2 = e2.week || e2.isoWeek || 0, r2 = e2.day || 0, a2 = e2.hour || 0, o2 = e2.minute || 0, u2 = e2.second || 0, l2 = e2.millisecond || 0;
      this._isValid = function(e3) {
        var t3, n3, s3 = false, i3 = Wt.length;
        for (t3 in e3)
          if (c(e3, t3) && (-1 === S.call(Wt, t3) || null != e3[t3] && isNaN(e3[t3])))
            return false;
        for (n3 = 0; n3 < i3; ++n3)
          if (e3[Wt[n3]]) {
            if (s3)
              return false;
            parseFloat(e3[Wt[n3]]) !== g(e3[Wt[n3]]) && (s3 = true);
          }
        return true;
      }(e2), this._milliseconds = +l2 + 1e3 * u2 + 6e4 * o2 + 1e3 * a2 * 60 * 60, this._days = +r2 + 7 * i2, this._months = +s2 + 3 * n2 + 12 * t2, this._data = {}, this._locale = mt(), this._bubble();
    }
    function Ut(e2) {
      return e2 instanceof Ct;
    }
    function Ht(e2) {
      return e2 < 0 ? -1 * Math.round(-1 * e2) : Math.round(e2);
    }
    function Ft(e2, n2) {
      s(e2, 0, 0, function() {
        var e3 = this.utcOffset(), t2 = "+";
        return e3 < 0 && (e3 = -e3, t2 = "-"), t2 + r(~~(e3 / 60), 2) + n2 + r(~~e3 % 60, 2);
      });
    }
    Ft("Z", ":"), Ft("ZZ", ""), v("Z", Ye), v("ZZ", Ye), D(["Z", "ZZ"], function(e2, t2, n2) {
      n2._useUTC = true, n2._tzm = Vt(Ye, e2);
    });
    var Lt = /([\+\-]|\d\d)/gi;
    function Vt(e2, t2) {
      var t2 = (t2 || "").match(e2);
      return null === t2 ? null : 0 === (t2 = 60 * (e2 = ((t2[t2.length - 1] || []) + "").match(Lt) || ["-", 0, 0])[1] + g(e2[2])) ? 0 : "+" === e2[0] ? t2 : -t2;
    }
    function Gt(e2, t2) {
      var n2;
      return t2._isUTC ? (t2 = t2.clone(), n2 = (h(e2) || V(e2) ? e2 : W(e2)).valueOf() - t2.valueOf(), t2._d.setTime(t2._d.valueOf() + n2), f.updateOffset(t2, false), t2) : W(e2).local();
    }
    function Et(e2) {
      return -Math.round(e2._d.getTimezoneOffset());
    }
    function At() {
      return !!this.isValid() && (this._isUTC && 0 === this._offset);
    }
    f.updateOffset = function() {
    };
    var It = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/, jt = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
    function C(e2, t2) {
      var n2, s2 = e2, i2 = null;
      return Ut(e2) ? s2 = { ms: e2._milliseconds, d: e2._days, M: e2._months } : u(e2) || !isNaN(+e2) ? (s2 = {}, t2 ? s2[t2] = +e2 : s2.milliseconds = +e2) : (i2 = It.exec(e2)) ? (n2 = "-" === i2[1] ? -1 : 1, s2 = { y: 0, d: g(i2[b]) * n2, h: g(i2[x]) * n2, m: g(i2[T]) * n2, s: g(i2[N]) * n2, ms: g(Ht(1e3 * i2[Ne])) * n2 }) : (i2 = jt.exec(e2)) ? (n2 = "-" === i2[1] ? -1 : 1, s2 = { y: Zt(i2[2], n2), M: Zt(i2[3], n2), w: Zt(i2[4], n2), d: Zt(i2[5], n2), h: Zt(i2[6], n2), m: Zt(i2[7], n2), s: Zt(i2[8], n2) }) : null == s2 ? s2 = {} : "object" == typeof s2 && ("from" in s2 || "to" in s2) && (t2 = function(e3, t3) {
        var n3;
        if (!e3.isValid() || !t3.isValid())
          return { milliseconds: 0, months: 0 };
        t3 = Gt(t3, e3), e3.isBefore(t3) ? n3 = zt(e3, t3) : ((n3 = zt(t3, e3)).milliseconds = -n3.milliseconds, n3.months = -n3.months);
        return n3;
      }(W(s2.from), W(s2.to)), (s2 = {}).ms = t2.milliseconds, s2.M = t2.months), i2 = new Ct(s2), Ut(e2) && c(e2, "_locale") && (i2._locale = e2._locale), Ut(e2) && c(e2, "_isValid") && (i2._isValid = e2._isValid), i2;
    }
    function Zt(e2, t2) {
      e2 = e2 && parseFloat(e2.replace(",", "."));
      return (isNaN(e2) ? 0 : e2) * t2;
    }
    function zt(e2, t2) {
      var n2 = {};
      return n2.months = t2.month() - e2.month() + 12 * (t2.year() - e2.year()), e2.clone().add(n2.months, "M").isAfter(t2) && --n2.months, n2.milliseconds = +t2 - +e2.clone().add(n2.months, "M"), n2;
    }
    function $t(s2, i2) {
      return function(e2, t2) {
        var n2;
        return null === t2 || isNaN(+t2) || (Q(i2, "moment()." + i2 + "(period, number) is deprecated. Please use moment()." + i2 + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."), n2 = e2, e2 = t2, t2 = n2), qt(this, C(e2, t2), s2), this;
      };
    }
    function qt(e2, t2, n2, s2) {
      var i2 = t2._milliseconds, r2 = Ht(t2._days), t2 = Ht(t2._months);
      e2.isValid() && (s2 = null == s2 || s2, t2 && Ve(e2, ce(e2, "Month") + t2 * n2), r2 && fe(e2, "Date", ce(e2, "Date") + r2 * n2), i2 && e2._d.setTime(e2._d.valueOf() + i2 * n2), s2 && f.updateOffset(e2, r2 || t2));
    }
    C.fn = Ct.prototype, C.invalid = function() {
      return C(NaN);
    };
    Ce = $t(1, "add"), Je = $t(-1, "subtract");
    function Bt(e2) {
      return "string" == typeof e2 || e2 instanceof String;
    }
    function Jt(e2) {
      return h(e2) || V(e2) || Bt(e2) || u(e2) || function(t2) {
        var e3 = a(t2), n2 = false;
        e3 && (n2 = 0 === t2.filter(function(e4) {
          return !u(e4) && Bt(t2);
        }).length);
        return e3 && n2;
      }(e2) || function(e3) {
        var t2, n2, s2 = F(e3) && !L(e3), i2 = false, r2 = ["years", "year", "y", "months", "month", "M", "days", "day", "d", "dates", "date", "D", "hours", "hour", "h", "minutes", "minute", "m", "seconds", "second", "s", "milliseconds", "millisecond", "ms"], a2 = r2.length;
        for (t2 = 0; t2 < a2; t2 += 1)
          n2 = r2[t2], i2 = i2 || c(e3, n2);
        return s2 && i2;
      }(e2) || null == e2;
    }
    function Qt(e2, t2) {
      if (e2.date() < t2.date())
        return -Qt(t2, e2);
      var n2 = 12 * (t2.year() - e2.year()) + (t2.month() - e2.month()), s2 = e2.clone().add(n2, "months"), t2 = t2 - s2 < 0 ? (t2 - s2) / (s2 - e2.clone().add(n2 - 1, "months")) : (t2 - s2) / (e2.clone().add(1 + n2, "months") - s2);
      return -(n2 + t2) || 0;
    }
    function Xt(e2) {
      return void 0 === e2 ? this._locale._abbr : (null != (e2 = mt(e2)) && (this._locale = e2), this);
    }
    f.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ", f.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
    Xe = e("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function(e2) {
      return void 0 === e2 ? this.localeData() : this.locale(e2);
    });
    function Kt() {
      return this._locale;
    }
    var en = 126227808e5;
    function tn(e2, t2) {
      return (e2 % t2 + t2) % t2;
    }
    function nn(e2, t2, n2) {
      return e2 < 100 && 0 <= e2 ? new Date(e2 + 400, t2, n2) - en : new Date(e2, t2, n2).valueOf();
    }
    function sn(e2, t2, n2) {
      return e2 < 100 && 0 <= e2 ? Date.UTC(e2 + 400, t2, n2) - en : Date.UTC(e2, t2, n2);
    }
    function rn(e2, t2) {
      return t2.erasAbbrRegex(e2);
    }
    function an() {
      for (var e2 = [], t2 = [], n2 = [], s2 = [], i2 = this.eras(), r2 = 0, a2 = i2.length; r2 < a2; ++r2)
        t2.push(M(i2[r2].name)), e2.push(M(i2[r2].abbr)), n2.push(M(i2[r2].narrow)), s2.push(M(i2[r2].name)), s2.push(M(i2[r2].abbr)), s2.push(M(i2[r2].narrow));
      this._erasRegex = new RegExp("^(" + s2.join("|") + ")", "i"), this._erasNameRegex = new RegExp("^(" + t2.join("|") + ")", "i"), this._erasAbbrRegex = new RegExp("^(" + e2.join("|") + ")", "i"), this._erasNarrowRegex = new RegExp("^(" + n2.join("|") + ")", "i");
    }
    function on(e2, t2) {
      s(0, [e2, e2.length], 0, t2);
    }
    function un(e2, t2, n2, s2, i2) {
      var r2;
      return null == e2 ? qe(this, s2, i2).year : (r2 = P(e2, s2, i2), function(e3, t3, n3, s3, i3) {
        e3 = $e(e3, t3, n3, s3, i3), t3 = Ze(e3.year, 0, e3.dayOfYear);
        return this.year(t3.getUTCFullYear()), this.month(t3.getUTCMonth()), this.date(t3.getUTCDate()), this;
      }.call(this, e2, t2 = r2 < t2 ? r2 : t2, n2, s2, i2));
    }
    s("N", 0, 0, "eraAbbr"), s("NN", 0, 0, "eraAbbr"), s("NNN", 0, 0, "eraAbbr"), s("NNNN", 0, 0, "eraName"), s("NNNNN", 0, 0, "eraNarrow"), s("y", ["y", 1], "yo", "eraYear"), s("y", ["yy", 2], 0, "eraYear"), s("y", ["yyy", 3], 0, "eraYear"), s("y", ["yyyy", 4], 0, "eraYear"), v("N", rn), v("NN", rn), v("NNN", rn), v("NNNN", function(e2, t2) {
      return t2.erasNameRegex(e2);
    }), v("NNNNN", function(e2, t2) {
      return t2.erasNarrowRegex(e2);
    }), D(["N", "NN", "NNN", "NNNN", "NNNNN"], function(e2, t2, n2, s2) {
      s2 = n2._locale.erasParse(e2, s2, n2._strict);
      s2 ? m(n2).era = s2 : m(n2).invalidEra = e2;
    }), v("y", Me), v("yy", Me), v("yyy", Me), v("yyyy", Me), v("yo", function(e2, t2) {
      return t2._eraYearOrdinalRegex || Me;
    }), D(["y", "yy", "yyy", "yyyy"], Y), D(["yo"], function(e2, t2, n2, s2) {
      var i2;
      n2._locale._eraYearOrdinalRegex && (i2 = e2.match(n2._locale._eraYearOrdinalRegex)), n2._locale.eraYearOrdinalParse ? t2[Y] = n2._locale.eraYearOrdinalParse(e2, i2) : t2[Y] = parseInt(e2, 10);
    }), s(0, ["gg", 2], 0, function() {
      return this.weekYear() % 100;
    }), s(0, ["GG", 2], 0, function() {
      return this.isoWeekYear() % 100;
    }), on("gggg", "weekYear"), on("ggggg", "weekYear"), on("GGGG", "isoWeekYear"), on("GGGGG", "isoWeekYear"), t("weekYear", "gg"), t("isoWeekYear", "GG"), n("weekYear", 1), n("isoWeekYear", 1), v("G", De), v("g", De), v("GG", p, w), v("gg", p, w), v("GGGG", ke, _e), v("gggg", ke, _e), v("GGGGG", ve, ye), v("ggggg", ve, ye), Te(["gggg", "ggggg", "GGGG", "GGGGG"], function(e2, t2, n2, s2) {
      t2[s2.substr(0, 2)] = g(e2);
    }), Te(["gg", "GG"], function(e2, t2, n2, s2) {
      t2[s2] = f.parseTwoDigitYear(e2);
    }), s("Q", 0, "Qo", "quarter"), t("quarter", "Q"), n("quarter", 7), v("Q", i), D("Q", function(e2, t2) {
      t2[O] = 3 * (g(e2) - 1);
    }), s("D", ["DD", 2], "Do", "date"), t("date", "D"), n("date", 9), v("D", p), v("DD", p, w), v("Do", function(e2, t2) {
      return e2 ? t2._dayOfMonthOrdinalParse || t2._ordinalParse : t2._dayOfMonthOrdinalParseLenient;
    }), D(["D", "DD"], b), D("Do", function(e2, t2) {
      t2[b] = g(e2.match(p)[0]);
    });
    ke = de("Date", true);
    s("DDD", ["DDDD", 3], "DDDo", "dayOfYear"), t("dayOfYear", "DDD"), n("dayOfYear", 4), v("DDD", pe), v("DDDD", me), D(["DDD", "DDDD"], function(e2, t2, n2) {
      n2._dayOfYear = g(e2);
    }), s("m", ["mm", 2], 0, "minute"), t("minute", "m"), n("minute", 14), v("m", p), v("mm", p, w), D(["m", "mm"], T);
    var ln, _e = de("Minutes", false), ve = (s("s", ["ss", 2], 0, "second"), t("second", "s"), n("second", 15), v("s", p), v("ss", p, w), D(["s", "ss"], N), de("Seconds", false));
    for (s("S", 0, 0, function() {
      return ~~(this.millisecond() / 100);
    }), s(0, ["SS", 2], 0, function() {
      return ~~(this.millisecond() / 10);
    }), s(0, ["SSS", 3], 0, "millisecond"), s(0, ["SSSS", 4], 0, function() {
      return 10 * this.millisecond();
    }), s(0, ["SSSSS", 5], 0, function() {
      return 100 * this.millisecond();
    }), s(0, ["SSSSSS", 6], 0, function() {
      return 1e3 * this.millisecond();
    }), s(0, ["SSSSSSS", 7], 0, function() {
      return 1e4 * this.millisecond();
    }), s(0, ["SSSSSSSS", 8], 0, function() {
      return 1e5 * this.millisecond();
    }), s(0, ["SSSSSSSSS", 9], 0, function() {
      return 1e6 * this.millisecond();
    }), t("millisecond", "ms"), n("millisecond", 16), v("S", pe, i), v("SS", pe, w), v("SSS", pe, me), ln = "SSSS"; ln.length <= 9; ln += "S")
      v(ln, Me);
    function hn(e2, t2) {
      t2[Ne] = g(1e3 * ("0." + e2));
    }
    for (ln = "S"; ln.length <= 9; ln += "S")
      D(ln, hn);
    ye = de("Milliseconds", false), s("z", 0, 0, "zoneAbbr"), s("zz", 0, 0, "zoneName");
    i = q.prototype;
    function dn(e2) {
      return e2;
    }
    i.add = Ce, i.calendar = function(e2, t2) {
      1 === arguments.length && (arguments[0] ? Jt(arguments[0]) ? (e2 = arguments[0], t2 = void 0) : function(e3) {
        for (var t3 = F(e3) && !L(e3), n3 = false, s2 = ["sameDay", "nextDay", "lastDay", "nextWeek", "lastWeek", "sameElse"], i2 = 0; i2 < s2.length; i2 += 1)
          n3 = n3 || c(e3, s2[i2]);
        return t3 && n3;
      }(arguments[0]) && (t2 = arguments[0], e2 = void 0) : t2 = e2 = void 0);
      var e2 = e2 || W(), n2 = Gt(e2, this).startOf("day"), n2 = f.calendarFormat(this, n2) || "sameElse", t2 = t2 && (d(t2[n2]) ? t2[n2].call(this, e2) : t2[n2]);
      return this.format(t2 || this.localeData().calendar(n2, this, W(e2)));
    }, i.clone = function() {
      return new q(this);
    }, i.diff = function(e2, t2, n2) {
      var s2, i2, r2;
      if (!this.isValid())
        return NaN;
      if (!(s2 = Gt(e2, this)).isValid())
        return NaN;
      switch (i2 = 6e4 * (s2.utcOffset() - this.utcOffset()), t2 = _2(t2)) {
        case "year":
          r2 = Qt(this, s2) / 12;
          break;
        case "month":
          r2 = Qt(this, s2);
          break;
        case "quarter":
          r2 = Qt(this, s2) / 3;
          break;
        case "second":
          r2 = (this - s2) / 1e3;
          break;
        case "minute":
          r2 = (this - s2) / 6e4;
          break;
        case "hour":
          r2 = (this - s2) / 36e5;
          break;
        case "day":
          r2 = (this - s2 - i2) / 864e5;
          break;
        case "week":
          r2 = (this - s2 - i2) / 6048e5;
          break;
        default:
          r2 = this - s2;
      }
      return n2 ? r2 : y(r2);
    }, i.endOf = function(e2) {
      var t2, n2;
      if (void 0 === (e2 = _2(e2)) || "millisecond" === e2 || !this.isValid())
        return this;
      switch (n2 = this._isUTC ? sn : nn, e2) {
        case "year":
          t2 = n2(this.year() + 1, 0, 1) - 1;
          break;
        case "quarter":
          t2 = n2(this.year(), this.month() - this.month() % 3 + 3, 1) - 1;
          break;
        case "month":
          t2 = n2(this.year(), this.month() + 1, 1) - 1;
          break;
        case "week":
          t2 = n2(this.year(), this.month(), this.date() - this.weekday() + 7) - 1;
          break;
        case "isoWeek":
          t2 = n2(this.year(), this.month(), this.date() - (this.isoWeekday() - 1) + 7) - 1;
          break;
        case "day":
        case "date":
          t2 = n2(this.year(), this.month(), this.date() + 1) - 1;
          break;
        case "hour":
          t2 = this._d.valueOf(), t2 += 36e5 - tn(t2 + (this._isUTC ? 0 : 6e4 * this.utcOffset()), 36e5) - 1;
          break;
        case "minute":
          t2 = this._d.valueOf(), t2 += 6e4 - tn(t2, 6e4) - 1;
          break;
        case "second":
          t2 = this._d.valueOf(), t2 += 1e3 - tn(t2, 1e3) - 1;
          break;
      }
      return this._d.setTime(t2), f.updateOffset(this, true), this;
    }, i.format = function(e2) {
      return e2 = e2 || (this.isUtc() ? f.defaultFormatUtc : f.defaultFormat), e2 = re(this, e2), this.localeData().postformat(e2);
    }, i.from = function(e2, t2) {
      return this.isValid() && (h(e2) && e2.isValid() || W(e2).isValid()) ? C({ to: this, from: e2 }).locale(this.locale()).humanize(!t2) : this.localeData().invalidDate();
    }, i.fromNow = function(e2) {
      return this.from(W(), e2);
    }, i.to = function(e2, t2) {
      return this.isValid() && (h(e2) && e2.isValid() || W(e2).isValid()) ? C({ from: this, to: e2 }).locale(this.locale()).humanize(!t2) : this.localeData().invalidDate();
    }, i.toNow = function(e2) {
      return this.to(W(), e2);
    }, i.get = function(e2) {
      return d(this[e2 = _2(e2)]) ? this[e2]() : this;
    }, i.invalidAt = function() {
      return m(this).overflow;
    }, i.isAfter = function(e2, t2) {
      return e2 = h(e2) ? e2 : W(e2), !(!this.isValid() || !e2.isValid()) && ("millisecond" === (t2 = _2(t2) || "millisecond") ? this.valueOf() > e2.valueOf() : e2.valueOf() < this.clone().startOf(t2).valueOf());
    }, i.isBefore = function(e2, t2) {
      return e2 = h(e2) ? e2 : W(e2), !(!this.isValid() || !e2.isValid()) && ("millisecond" === (t2 = _2(t2) || "millisecond") ? this.valueOf() < e2.valueOf() : this.clone().endOf(t2).valueOf() < e2.valueOf());
    }, i.isBetween = function(e2, t2, n2, s2) {
      return e2 = h(e2) ? e2 : W(e2), t2 = h(t2) ? t2 : W(t2), !!(this.isValid() && e2.isValid() && t2.isValid()) && (("(" === (s2 = s2 || "()")[0] ? this.isAfter(e2, n2) : !this.isBefore(e2, n2)) && (")" === s2[1] ? this.isBefore(t2, n2) : !this.isAfter(t2, n2)));
    }, i.isSame = function(e2, t2) {
      var e2 = h(e2) ? e2 : W(e2);
      return !(!this.isValid() || !e2.isValid()) && ("millisecond" === (t2 = _2(t2) || "millisecond") ? this.valueOf() === e2.valueOf() : (e2 = e2.valueOf(), this.clone().startOf(t2).valueOf() <= e2 && e2 <= this.clone().endOf(t2).valueOf()));
    }, i.isSameOrAfter = function(e2, t2) {
      return this.isSame(e2, t2) || this.isAfter(e2, t2);
    }, i.isSameOrBefore = function(e2, t2) {
      return this.isSame(e2, t2) || this.isBefore(e2, t2);
    }, i.isValid = function() {
      return A(this);
    }, i.lang = Xe, i.locale = Xt, i.localeData = Kt, i.max = we, i.min = ge, i.parsingFlags = function() {
      return E({}, m(this));
    }, i.set = function(e2, t2) {
      if ("object" == typeof e2)
        for (var n2 = function(e3) {
          var t3, n3 = [];
          for (t3 in e3)
            c(e3, t3) && n3.push({ unit: t3, priority: le[t3] });
          return n3.sort(function(e4, t4) {
            return e4.priority - t4.priority;
          }), n3;
        }(e2 = ue(e2)), s2 = n2.length, i2 = 0; i2 < s2; i2++)
          this[n2[i2].unit](e2[n2[i2].unit]);
      else if (d(this[e2 = _2(e2)]))
        return this[e2](t2);
      return this;
    }, i.startOf = function(e2) {
      var t2, n2;
      if (void 0 === (e2 = _2(e2)) || "millisecond" === e2 || !this.isValid())
        return this;
      switch (n2 = this._isUTC ? sn : nn, e2) {
        case "year":
          t2 = n2(this.year(), 0, 1);
          break;
        case "quarter":
          t2 = n2(this.year(), this.month() - this.month() % 3, 1);
          break;
        case "month":
          t2 = n2(this.year(), this.month(), 1);
          break;
        case "week":
          t2 = n2(this.year(), this.month(), this.date() - this.weekday());
          break;
        case "isoWeek":
          t2 = n2(this.year(), this.month(), this.date() - (this.isoWeekday() - 1));
          break;
        case "day":
        case "date":
          t2 = n2(this.year(), this.month(), this.date());
          break;
        case "hour":
          t2 = this._d.valueOf(), t2 -= tn(t2 + (this._isUTC ? 0 : 6e4 * this.utcOffset()), 36e5);
          break;
        case "minute":
          t2 = this._d.valueOf(), t2 -= tn(t2, 6e4);
          break;
        case "second":
          t2 = this._d.valueOf(), t2 -= tn(t2, 1e3);
          break;
      }
      return this._d.setTime(t2), f.updateOffset(this, true), this;
    }, i.subtract = Je, i.toArray = function() {
      var e2 = this;
      return [e2.year(), e2.month(), e2.date(), e2.hour(), e2.minute(), e2.second(), e2.millisecond()];
    }, i.toObject = function() {
      var e2 = this;
      return { years: e2.year(), months: e2.month(), date: e2.date(), hours: e2.hours(), minutes: e2.minutes(), seconds: e2.seconds(), milliseconds: e2.milliseconds() };
    }, i.toDate = function() {
      return new Date(this.valueOf());
    }, i.toISOString = function(e2) {
      if (!this.isValid())
        return null;
      var t2 = (e2 = true !== e2) ? this.clone().utc() : this;
      return t2.year() < 0 || 9999 < t2.year() ? re(t2, e2 ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ") : d(Date.prototype.toISOString) ? e2 ? this.toDate().toISOString() : new Date(this.valueOf() + 60 * this.utcOffset() * 1e3).toISOString().replace("Z", re(t2, "Z")) : re(t2, e2 ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ");
    }, i.inspect = function() {
      if (!this.isValid())
        return "moment.invalid(/* " + this._i + " */)";
      var e2, t2 = "moment", n2 = "";
      return this.isLocal() || (t2 = 0 === this.utcOffset() ? "moment.utc" : "moment.parseZone", n2 = "Z"), t2 = "[" + t2 + '("]', e2 = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY", this.format(t2 + e2 + "-MM-DD[T]HH:mm:ss.SSS" + (n2 + '[")]'));
    }, "undefined" != typeof Symbol && null != Symbol.for && (i[Symbol.for("nodejs.util.inspect.custom")] = function() {
      return "Moment<" + this.format() + ">";
    }), i.toJSON = function() {
      return this.isValid() ? this.toISOString() : null;
    }, i.toString = function() {
      return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
    }, i.unix = function() {
      return Math.floor(this.valueOf() / 1e3);
    }, i.valueOf = function() {
      return this._d.valueOf() - 6e4 * (this._offset || 0);
    }, i.creationData = function() {
      return { input: this._i, format: this._f, locale: this._locale, isUTC: this._isUTC, strict: this._strict };
    }, i.eraName = function() {
      for (var e2, t2 = this.localeData().eras(), n2 = 0, s2 = t2.length; n2 < s2; ++n2) {
        if (e2 = this.clone().startOf("day").valueOf(), t2[n2].since <= e2 && e2 <= t2[n2].until)
          return t2[n2].name;
        if (t2[n2].until <= e2 && e2 <= t2[n2].since)
          return t2[n2].name;
      }
      return "";
    }, i.eraNarrow = function() {
      for (var e2, t2 = this.localeData().eras(), n2 = 0, s2 = t2.length; n2 < s2; ++n2) {
        if (e2 = this.clone().startOf("day").valueOf(), t2[n2].since <= e2 && e2 <= t2[n2].until)
          return t2[n2].narrow;
        if (t2[n2].until <= e2 && e2 <= t2[n2].since)
          return t2[n2].narrow;
      }
      return "";
    }, i.eraAbbr = function() {
      for (var e2, t2 = this.localeData().eras(), n2 = 0, s2 = t2.length; n2 < s2; ++n2) {
        if (e2 = this.clone().startOf("day").valueOf(), t2[n2].since <= e2 && e2 <= t2[n2].until)
          return t2[n2].abbr;
        if (t2[n2].until <= e2 && e2 <= t2[n2].since)
          return t2[n2].abbr;
      }
      return "";
    }, i.eraYear = function() {
      for (var e2, t2, n2 = this.localeData().eras(), s2 = 0, i2 = n2.length; s2 < i2; ++s2)
        if (e2 = n2[s2].since <= n2[s2].until ? 1 : -1, t2 = this.clone().startOf("day").valueOf(), n2[s2].since <= t2 && t2 <= n2[s2].until || n2[s2].until <= t2 && t2 <= n2[s2].since)
          return (this.year() - f(n2[s2].since).year()) * e2 + n2[s2].offset;
      return this.year();
    }, i.year = Ie, i.isLeapYear = function() {
      return he(this.year());
    }, i.weekYear = function(e2) {
      return un.call(this, e2, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy);
    }, i.isoWeekYear = function(e2) {
      return un.call(this, e2, this.isoWeek(), this.isoWeekday(), 1, 4);
    }, i.quarter = i.quarters = function(e2) {
      return null == e2 ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (e2 - 1) + this.month() % 3);
    }, i.month = Ge, i.daysInMonth = function() {
      return We(this.year(), this.month());
    }, i.week = i.weeks = function(e2) {
      var t2 = this.localeData().week(this);
      return null == e2 ? t2 : this.add(7 * (e2 - t2), "d");
    }, i.isoWeek = i.isoWeeks = function(e2) {
      var t2 = qe(this, 1, 4).week;
      return null == e2 ? t2 : this.add(7 * (e2 - t2), "d");
    }, i.weeksInYear = function() {
      var e2 = this.localeData()._week;
      return P(this.year(), e2.dow, e2.doy);
    }, i.weeksInWeekYear = function() {
      var e2 = this.localeData()._week;
      return P(this.weekYear(), e2.dow, e2.doy);
    }, i.isoWeeksInYear = function() {
      return P(this.year(), 1, 4);
    }, i.isoWeeksInISOWeekYear = function() {
      return P(this.isoWeekYear(), 1, 4);
    }, i.date = ke, i.day = i.days = function(e2) {
      if (!this.isValid())
        return null != e2 ? this : NaN;
      var t2, n2, s2 = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
      return null != e2 ? (t2 = e2, n2 = this.localeData(), e2 = "string" != typeof t2 ? t2 : isNaN(t2) ? "number" == typeof (t2 = n2.weekdaysParse(t2)) ? t2 : null : parseInt(t2, 10), this.add(e2 - s2, "d")) : s2;
    }, i.weekday = function(e2) {
      if (!this.isValid())
        return null != e2 ? this : NaN;
      var t2 = (this.day() + 7 - this.localeData()._week.dow) % 7;
      return null == e2 ? t2 : this.add(e2 - t2, "d");
    }, i.isoWeekday = function(e2) {
      return this.isValid() ? null != e2 ? (t2 = e2, n2 = this.localeData(), n2 = "string" == typeof t2 ? n2.weekdaysParse(t2) % 7 || 7 : isNaN(t2) ? null : t2, this.day(this.day() % 7 ? n2 : n2 - 7)) : this.day() || 7 : null != e2 ? this : NaN;
      var t2, n2;
    }, i.dayOfYear = function(e2) {
      var t2 = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;
      return null == e2 ? t2 : this.add(e2 - t2, "d");
    }, i.hour = i.hours = k, i.minute = i.minutes = _e, i.second = i.seconds = ve, i.millisecond = i.milliseconds = ye, i.utcOffset = function(e2, t2, n2) {
      var s2, i2 = this._offset || 0;
      if (!this.isValid())
        return null != e2 ? this : NaN;
      if (null == e2)
        return this._isUTC ? i2 : Et(this);
      if ("string" == typeof e2) {
        if (null === (e2 = Vt(Ye, e2)))
          return this;
      } else
        Math.abs(e2) < 16 && !n2 && (e2 *= 60);
      return !this._isUTC && t2 && (s2 = Et(this)), this._offset = e2, this._isUTC = true, null != s2 && this.add(s2, "m"), i2 !== e2 && (!t2 || this._changeInProgress ? qt(this, C(e2 - i2, "m"), 1, false) : this._changeInProgress || (this._changeInProgress = true, f.updateOffset(this, true), this._changeInProgress = null)), this;
    }, i.utc = function(e2) {
      return this.utcOffset(0, e2);
    }, i.local = function(e2) {
      return this._isUTC && (this.utcOffset(0, e2), this._isUTC = false, e2 && this.subtract(Et(this), "m")), this;
    }, i.parseZone = function() {
      var e2;
      return null != this._tzm ? this.utcOffset(this._tzm, false, true) : "string" == typeof this._i && (null != (e2 = Vt(Se, this._i)) ? this.utcOffset(e2) : this.utcOffset(0, true)), this;
    }, i.hasAlignedHourOffset = function(e2) {
      return !!this.isValid() && (e2 = e2 ? W(e2).utcOffset() : 0, (this.utcOffset() - e2) % 60 == 0);
    }, i.isDST = function() {
      return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
    }, i.isLocal = function() {
      return !!this.isValid() && !this._isUTC;
    }, i.isUtcOffset = function() {
      return !!this.isValid() && this._isUTC;
    }, i.isUtc = At, i.isUTC = At, i.zoneAbbr = function() {
      return this._isUTC ? "UTC" : "";
    }, i.zoneName = function() {
      return this._isUTC ? "Coordinated Universal Time" : "";
    }, i.dates = e("dates accessor is deprecated. Use date instead.", ke), i.months = e("months accessor is deprecated. Use month instead", Ge), i.years = e("years accessor is deprecated. Use year instead", Ie), i.zone = e("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/", function(e2, t2) {
      return null != e2 ? (this.utcOffset(e2 = "string" != typeof e2 ? -e2 : e2, t2), this) : -this.utcOffset();
    }), i.isDSTShifted = e("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information", function() {
      if (!o(this._isDSTShifted))
        return this._isDSTShifted;
      var e2, t2 = {};
      return $(t2, this), (t2 = Nt(t2))._a ? (e2 = (t2._isUTC ? l : W)(t2._a), this._isDSTShifted = this.isValid() && 0 < function(e3, t3, n2) {
        for (var s2 = Math.min(e3.length, t3.length), i2 = Math.abs(e3.length - t3.length), r2 = 0, a2 = 0; a2 < s2; a2++)
          (n2 && e3[a2] !== t3[a2] || !n2 && g(e3[a2]) !== g(t3[a2])) && r2++;
        return r2 + i2;
      }(t2._a, e2.toArray())) : this._isDSTShifted = false, this._isDSTShifted;
    });
    w = K.prototype;
    function cn(e2, t2, n2, s2) {
      var i2 = mt(), s2 = l().set(s2, t2);
      return i2[n2](s2, e2);
    }
    function fn(e2, t2, n2) {
      if (u(e2) && (t2 = e2, e2 = void 0), e2 = e2 || "", null != t2)
        return cn(e2, t2, n2, "month");
      for (var s2 = [], i2 = 0; i2 < 12; i2++)
        s2[i2] = cn(e2, i2, n2, "month");
      return s2;
    }
    function mn(e2, t2, n2, s2) {
      t2 = ("boolean" == typeof e2 ? u(t2) && (n2 = t2, t2 = void 0) : (t2 = e2, e2 = false, u(n2 = t2) && (n2 = t2, t2 = void 0)), t2 || "");
      var i2, r2 = mt(), a2 = e2 ? r2._week.dow : 0, o2 = [];
      if (null != n2)
        return cn(t2, (n2 + a2) % 7, s2, "day");
      for (i2 = 0; i2 < 7; i2++)
        o2[i2] = cn(t2, (i2 + a2) % 7, s2, "day");
      return o2;
    }
    w.calendar = function(e2, t2, n2) {
      return d(e2 = this._calendar[e2] || this._calendar.sameElse) ? e2.call(t2, n2) : e2;
    }, w.longDateFormat = function(e2) {
      var t2 = this._longDateFormat[e2], n2 = this._longDateFormat[e2.toUpperCase()];
      return t2 || !n2 ? t2 : (this._longDateFormat[e2] = n2.match(te).map(function(e3) {
        return "MMMM" === e3 || "MM" === e3 || "DD" === e3 || "dddd" === e3 ? e3.slice(1) : e3;
      }).join(""), this._longDateFormat[e2]);
    }, w.invalidDate = function() {
      return this._invalidDate;
    }, w.ordinal = function(e2) {
      return this._ordinal.replace("%d", e2);
    }, w.preparse = dn, w.postformat = dn, w.relativeTime = function(e2, t2, n2, s2) {
      var i2 = this._relativeTime[n2];
      return d(i2) ? i2(e2, t2, n2, s2) : i2.replace(/%d/i, e2);
    }, w.pastFuture = function(e2, t2) {
      return d(e2 = this._relativeTime[0 < e2 ? "future" : "past"]) ? e2(t2) : e2.replace(/%s/i, t2);
    }, w.set = function(e2) {
      var t2, n2;
      for (n2 in e2)
        c(e2, n2) && (d(t2 = e2[n2]) ? this[n2] = t2 : this["_" + n2] = t2);
      this._config = e2, this._dayOfMonthOrdinalParseLenient = new RegExp((this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source);
    }, w.eras = function(e2, t2) {
      for (var n2, s2 = this._eras || mt("en")._eras, i2 = 0, r2 = s2.length; i2 < r2; ++i2) {
        switch (typeof s2[i2].since) {
          case "string":
            n2 = f(s2[i2].since).startOf("day"), s2[i2].since = n2.valueOf();
            break;
        }
        switch (typeof s2[i2].until) {
          case "undefined":
            s2[i2].until = 1 / 0;
            break;
          case "string":
            n2 = f(s2[i2].until).startOf("day").valueOf(), s2[i2].until = n2.valueOf();
            break;
        }
      }
      return s2;
    }, w.erasParse = function(e2, t2, n2) {
      var s2, i2, r2, a2, o2, u2 = this.eras();
      for (e2 = e2.toUpperCase(), s2 = 0, i2 = u2.length; s2 < i2; ++s2)
        if (r2 = u2[s2].name.toUpperCase(), a2 = u2[s2].abbr.toUpperCase(), o2 = u2[s2].narrow.toUpperCase(), n2)
          switch (t2) {
            case "N":
            case "NN":
            case "NNN":
              if (a2 === e2)
                return u2[s2];
              break;
            case "NNNN":
              if (r2 === e2)
                return u2[s2];
              break;
            case "NNNNN":
              if (o2 === e2)
                return u2[s2];
              break;
          }
        else if (0 <= [r2, a2, o2].indexOf(e2))
          return u2[s2];
    }, w.erasConvertYear = function(e2, t2) {
      var n2 = e2.since <= e2.until ? 1 : -1;
      return void 0 === t2 ? f(e2.since).year() : f(e2.since).year() + (t2 - e2.offset) * n2;
    }, w.erasAbbrRegex = function(e2) {
      return c(this, "_erasAbbrRegex") || an.call(this), e2 ? this._erasAbbrRegex : this._erasRegex;
    }, w.erasNameRegex = function(e2) {
      return c(this, "_erasNameRegex") || an.call(this), e2 ? this._erasNameRegex : this._erasRegex;
    }, w.erasNarrowRegex = function(e2) {
      return c(this, "_erasNarrowRegex") || an.call(this), e2 ? this._erasNarrowRegex : this._erasRegex;
    }, w.months = function(e2, t2) {
      return e2 ? (a(this._months) ? this._months : this._months[(this._months.isFormat || He).test(t2) ? "format" : "standalone"])[e2.month()] : a(this._months) ? this._months : this._months.standalone;
    }, w.monthsShort = function(e2, t2) {
      return e2 ? (a(this._monthsShort) ? this._monthsShort : this._monthsShort[He.test(t2) ? "format" : "standalone"])[e2.month()] : a(this._monthsShort) ? this._monthsShort : this._monthsShort.standalone;
    }, w.monthsParse = function(e2, t2, n2) {
      var s2, i2;
      if (this._monthsParseExact)
        return function(e3, t3, n3) {
          var s3, i3, r2, e3 = e3.toLocaleLowerCase();
          if (!this._monthsParse)
            for (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = [], s3 = 0; s3 < 12; ++s3)
              r2 = l([2e3, s3]), this._shortMonthsParse[s3] = this.monthsShort(r2, "").toLocaleLowerCase(), this._longMonthsParse[s3] = this.months(r2, "").toLocaleLowerCase();
          return n3 ? "MMM" === t3 ? -1 !== (i3 = S.call(this._shortMonthsParse, e3)) ? i3 : null : -1 !== (i3 = S.call(this._longMonthsParse, e3)) ? i3 : null : "MMM" === t3 ? -1 !== (i3 = S.call(this._shortMonthsParse, e3)) || -1 !== (i3 = S.call(this._longMonthsParse, e3)) ? i3 : null : -1 !== (i3 = S.call(this._longMonthsParse, e3)) || -1 !== (i3 = S.call(this._shortMonthsParse, e3)) ? i3 : null;
        }.call(this, e2, t2, n2);
      for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), s2 = 0; s2 < 12; s2++) {
        if (i2 = l([2e3, s2]), n2 && !this._longMonthsParse[s2] && (this._longMonthsParse[s2] = new RegExp("^" + this.months(i2, "").replace(".", "") + "$", "i"), this._shortMonthsParse[s2] = new RegExp("^" + this.monthsShort(i2, "").replace(".", "") + "$", "i")), n2 || this._monthsParse[s2] || (i2 = "^" + this.months(i2, "") + "|^" + this.monthsShort(i2, ""), this._monthsParse[s2] = new RegExp(i2.replace(".", ""), "i")), n2 && "MMMM" === t2 && this._longMonthsParse[s2].test(e2))
          return s2;
        if (n2 && "MMM" === t2 && this._shortMonthsParse[s2].test(e2))
          return s2;
        if (!n2 && this._monthsParse[s2].test(e2))
          return s2;
      }
    }, w.monthsRegex = function(e2) {
      return this._monthsParseExact ? (c(this, "_monthsRegex") || Ee.call(this), e2 ? this._monthsStrictRegex : this._monthsRegex) : (c(this, "_monthsRegex") || (this._monthsRegex = Le), this._monthsStrictRegex && e2 ? this._monthsStrictRegex : this._monthsRegex);
    }, w.monthsShortRegex = function(e2) {
      return this._monthsParseExact ? (c(this, "_monthsRegex") || Ee.call(this), e2 ? this._monthsShortStrictRegex : this._monthsShortRegex) : (c(this, "_monthsShortRegex") || (this._monthsShortRegex = Fe), this._monthsShortStrictRegex && e2 ? this._monthsShortStrictRegex : this._monthsShortRegex);
    }, w.week = function(e2) {
      return qe(e2, this._week.dow, this._week.doy).week;
    }, w.firstDayOfYear = function() {
      return this._week.doy;
    }, w.firstDayOfWeek = function() {
      return this._week.dow;
    }, w.weekdays = function(e2, t2) {
      return t2 = a(this._weekdays) ? this._weekdays : this._weekdays[e2 && true !== e2 && this._weekdays.isFormat.test(t2) ? "format" : "standalone"], true === e2 ? Be(t2, this._week.dow) : e2 ? t2[e2.day()] : t2;
    }, w.weekdaysMin = function(e2) {
      return true === e2 ? Be(this._weekdaysMin, this._week.dow) : e2 ? this._weekdaysMin[e2.day()] : this._weekdaysMin;
    }, w.weekdaysShort = function(e2) {
      return true === e2 ? Be(this._weekdaysShort, this._week.dow) : e2 ? this._weekdaysShort[e2.day()] : this._weekdaysShort;
    }, w.weekdaysParse = function(e2, t2, n2) {
      var s2, i2;
      if (this._weekdaysParseExact)
        return function(e3, t3, n3) {
          var s3, i3, r2, e3 = e3.toLocaleLowerCase();
          if (!this._weekdaysParse)
            for (this._weekdaysParse = [], this._shortWeekdaysParse = [], this._minWeekdaysParse = [], s3 = 0; s3 < 7; ++s3)
              r2 = l([2e3, 1]).day(s3), this._minWeekdaysParse[s3] = this.weekdaysMin(r2, "").toLocaleLowerCase(), this._shortWeekdaysParse[s3] = this.weekdaysShort(r2, "").toLocaleLowerCase(), this._weekdaysParse[s3] = this.weekdays(r2, "").toLocaleLowerCase();
          return n3 ? "dddd" === t3 ? -1 !== (i3 = S.call(this._weekdaysParse, e3)) ? i3 : null : "ddd" === t3 ? -1 !== (i3 = S.call(this._shortWeekdaysParse, e3)) ? i3 : null : -1 !== (i3 = S.call(this._minWeekdaysParse, e3)) ? i3 : null : "dddd" === t3 ? -1 !== (i3 = S.call(this._weekdaysParse, e3)) || -1 !== (i3 = S.call(this._shortWeekdaysParse, e3)) || -1 !== (i3 = S.call(this._minWeekdaysParse, e3)) ? i3 : null : "ddd" === t3 ? -1 !== (i3 = S.call(this._shortWeekdaysParse, e3)) || -1 !== (i3 = S.call(this._weekdaysParse, e3)) || -1 !== (i3 = S.call(this._minWeekdaysParse, e3)) ? i3 : null : -1 !== (i3 = S.call(this._minWeekdaysParse, e3)) || -1 !== (i3 = S.call(this._weekdaysParse, e3)) || -1 !== (i3 = S.call(this._shortWeekdaysParse, e3)) ? i3 : null;
        }.call(this, e2, t2, n2);
      for (this._weekdaysParse || (this._weekdaysParse = [], this._minWeekdaysParse = [], this._shortWeekdaysParse = [], this._fullWeekdaysParse = []), s2 = 0; s2 < 7; s2++) {
        if (i2 = l([2e3, 1]).day(s2), n2 && !this._fullWeekdaysParse[s2] && (this._fullWeekdaysParse[s2] = new RegExp("^" + this.weekdays(i2, "").replace(".", "\\.?") + "$", "i"), this._shortWeekdaysParse[s2] = new RegExp("^" + this.weekdaysShort(i2, "").replace(".", "\\.?") + "$", "i"), this._minWeekdaysParse[s2] = new RegExp("^" + this.weekdaysMin(i2, "").replace(".", "\\.?") + "$", "i")), this._weekdaysParse[s2] || (i2 = "^" + this.weekdays(i2, "") + "|^" + this.weekdaysShort(i2, "") + "|^" + this.weekdaysMin(i2, ""), this._weekdaysParse[s2] = new RegExp(i2.replace(".", ""), "i")), n2 && "dddd" === t2 && this._fullWeekdaysParse[s2].test(e2))
          return s2;
        if (n2 && "ddd" === t2 && this._shortWeekdaysParse[s2].test(e2))
          return s2;
        if (n2 && "dd" === t2 && this._minWeekdaysParse[s2].test(e2))
          return s2;
        if (!n2 && this._weekdaysParse[s2].test(e2))
          return s2;
      }
    }, w.weekdaysRegex = function(e2) {
      return this._weekdaysParseExact ? (c(this, "_weekdaysRegex") || nt.call(this), e2 ? this._weekdaysStrictRegex : this._weekdaysRegex) : (c(this, "_weekdaysRegex") || (this._weekdaysRegex = Ke), this._weekdaysStrictRegex && e2 ? this._weekdaysStrictRegex : this._weekdaysRegex);
    }, w.weekdaysShortRegex = function(e2) {
      return this._weekdaysParseExact ? (c(this, "_weekdaysRegex") || nt.call(this), e2 ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex) : (c(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = et), this._weekdaysShortStrictRegex && e2 ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex);
    }, w.weekdaysMinRegex = function(e2) {
      return this._weekdaysParseExact ? (c(this, "_weekdaysRegex") || nt.call(this), e2 ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex) : (c(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = tt), this._weekdaysMinStrictRegex && e2 ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex);
    }, w.isPM = function(e2) {
      return "p" === (e2 + "").toLowerCase().charAt(0);
    }, w.meridiem = function(e2, t2, n2) {
      return 11 < e2 ? n2 ? "pm" : "PM" : n2 ? "am" : "AM";
    }, ct("en", { eras: [{ since: "0001-01-01", until: 1 / 0, offset: 1, name: "Anno Domini", narrow: "AD", abbr: "AD" }, { since: "0000-12-31", until: -1 / 0, offset: 1, name: "Before Christ", narrow: "BC", abbr: "BC" }], dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/, ordinal: function(e2) {
      var t2 = e2 % 10;
      return e2 + (1 === g(e2 % 100 / 10) ? "th" : 1 == t2 ? "st" : 2 == t2 ? "nd" : 3 == t2 ? "rd" : "th");
    } }), f.lang = e("moment.lang is deprecated. Use moment.locale instead.", ct), f.langData = e("moment.langData is deprecated. Use moment.localeData instead.", mt);
    var _n = Math.abs;
    function yn(e2, t2, n2, s2) {
      t2 = C(t2, n2);
      return e2._milliseconds += s2 * t2._milliseconds, e2._days += s2 * t2._days, e2._months += s2 * t2._months, e2._bubble();
    }
    function gn(e2) {
      return e2 < 0 ? Math.floor(e2) : Math.ceil(e2);
    }
    function wn(e2) {
      return 4800 * e2 / 146097;
    }
    function pn(e2) {
      return 146097 * e2 / 4800;
    }
    function kn(e2) {
      return function() {
        return this.as(e2);
      };
    }
    pe = kn("ms"), me = kn("s"), Ce = kn("m"), we = kn("h"), ge = kn("d"), Je = kn("w"), k = kn("M"), _e = kn("Q"), ve = kn("y");
    function vn(e2) {
      return function() {
        return this.isValid() ? this._data[e2] : NaN;
      };
    }
    var ye = vn("milliseconds"), ke = vn("seconds"), Ie = vn("minutes"), w = vn("hours"), Mn = vn("days"), Dn = vn("months"), Sn = vn("years");
    var Yn = Math.round, On = { ss: 44, s: 45, m: 45, h: 22, d: 26, w: null, M: 11 };
    function bn(e2, t2, n2, s2) {
      var i2 = C(e2).abs(), r2 = Yn(i2.as("s")), a2 = Yn(i2.as("m")), o2 = Yn(i2.as("h")), u2 = Yn(i2.as("d")), l2 = Yn(i2.as("M")), h2 = Yn(i2.as("w")), i2 = Yn(i2.as("y")), r2 = (r2 <= n2.ss ? ["s", r2] : r2 < n2.s && ["ss", r2]) || a2 <= 1 && ["m"] || a2 < n2.m && ["mm", a2] || o2 <= 1 && ["h"] || o2 < n2.h && ["hh", o2] || u2 <= 1 && ["d"] || u2 < n2.d && ["dd", u2];
      return (r2 = (r2 = null != n2.w ? r2 || h2 <= 1 && ["w"] || h2 < n2.w && ["ww", h2] : r2) || l2 <= 1 && ["M"] || l2 < n2.M && ["MM", l2] || i2 <= 1 && ["y"] || ["yy", i2])[2] = t2, r2[3] = 0 < +e2, r2[4] = s2, function(e3, t3, n3, s3, i3) {
        return i3.relativeTime(t3 || 1, !!n3, e3, s3);
      }.apply(null, r2);
    }
    var xn = Math.abs;
    function Tn(e2) {
      return (0 < e2) - (e2 < 0) || +e2;
    }
    function Nn() {
      if (!this.isValid())
        return this.localeData().invalidDate();
      var e2, t2, n2, s2, i2, r2, a2, o2 = xn(this._milliseconds) / 1e3, u2 = xn(this._days), l2 = xn(this._months), h2 = this.asSeconds();
      return h2 ? (e2 = y(o2 / 60), t2 = y(e2 / 60), o2 %= 60, e2 %= 60, n2 = y(l2 / 12), l2 %= 12, s2 = o2 ? o2.toFixed(3).replace(/\.?0+$/, "") : "", i2 = Tn(this._months) !== Tn(h2) ? "-" : "", r2 = Tn(this._days) !== Tn(h2) ? "-" : "", a2 = Tn(this._milliseconds) !== Tn(h2) ? "-" : "", (h2 < 0 ? "-" : "") + "P" + (n2 ? i2 + n2 + "Y" : "") + (l2 ? i2 + l2 + "M" : "") + (u2 ? r2 + u2 + "D" : "") + (t2 || e2 || o2 ? "T" : "") + (t2 ? a2 + t2 + "H" : "") + (e2 ? a2 + e2 + "M" : "") + (o2 ? a2 + s2 + "S" : "")) : "P0D";
    }
    var U = Ct.prototype;
    return U.isValid = function() {
      return this._isValid;
    }, U.abs = function() {
      var e2 = this._data;
      return this._milliseconds = _n(this._milliseconds), this._days = _n(this._days), this._months = _n(this._months), e2.milliseconds = _n(e2.milliseconds), e2.seconds = _n(e2.seconds), e2.minutes = _n(e2.minutes), e2.hours = _n(e2.hours), e2.months = _n(e2.months), e2.years = _n(e2.years), this;
    }, U.add = function(e2, t2) {
      return yn(this, e2, t2, 1);
    }, U.subtract = function(e2, t2) {
      return yn(this, e2, t2, -1);
    }, U.as = function(e2) {
      if (!this.isValid())
        return NaN;
      var t2, n2, s2 = this._milliseconds;
      if ("month" === (e2 = _2(e2)) || "quarter" === e2 || "year" === e2)
        switch (t2 = this._days + s2 / 864e5, n2 = this._months + wn(t2), e2) {
          case "month":
            return n2;
          case "quarter":
            return n2 / 3;
          case "year":
            return n2 / 12;
        }
      else
        switch (t2 = this._days + Math.round(pn(this._months)), e2) {
          case "week":
            return t2 / 7 + s2 / 6048e5;
          case "day":
            return t2 + s2 / 864e5;
          case "hour":
            return 24 * t2 + s2 / 36e5;
          case "minute":
            return 1440 * t2 + s2 / 6e4;
          case "second":
            return 86400 * t2 + s2 / 1e3;
          case "millisecond":
            return Math.floor(864e5 * t2) + s2;
          default:
            throw new Error("Unknown unit " + e2);
        }
    }, U.asMilliseconds = pe, U.asSeconds = me, U.asMinutes = Ce, U.asHours = we, U.asDays = ge, U.asWeeks = Je, U.asMonths = k, U.asQuarters = _e, U.asYears = ve, U.valueOf = function() {
      return this.isValid() ? this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * g(this._months / 12) : NaN;
    }, U._bubble = function() {
      var e2 = this._milliseconds, t2 = this._days, n2 = this._months, s2 = this._data;
      return 0 <= e2 && 0 <= t2 && 0 <= n2 || e2 <= 0 && t2 <= 0 && n2 <= 0 || (e2 += 864e5 * gn(pn(n2) + t2), n2 = t2 = 0), s2.milliseconds = e2 % 1e3, e2 = y(e2 / 1e3), s2.seconds = e2 % 60, e2 = y(e2 / 60), s2.minutes = e2 % 60, e2 = y(e2 / 60), s2.hours = e2 % 24, t2 += y(e2 / 24), n2 += e2 = y(wn(t2)), t2 -= gn(pn(e2)), e2 = y(n2 / 12), n2 %= 12, s2.days = t2, s2.months = n2, s2.years = e2, this;
    }, U.clone = function() {
      return C(this);
    }, U.get = function(e2) {
      return e2 = _2(e2), this.isValid() ? this[e2 + "s"]() : NaN;
    }, U.milliseconds = ye, U.seconds = ke, U.minutes = Ie, U.hours = w, U.days = Mn, U.weeks = function() {
      return y(this.days() / 7);
    }, U.months = Dn, U.years = Sn, U.humanize = function(e2, t2) {
      if (!this.isValid())
        return this.localeData().invalidDate();
      var n2 = false, s2 = On;
      return "object" == typeof e2 && (t2 = e2, e2 = false), "boolean" == typeof e2 && (n2 = e2), "object" == typeof t2 && (s2 = Object.assign({}, On, t2), null != t2.s && null == t2.ss && (s2.ss = t2.s - 1)), e2 = this.localeData(), t2 = bn(this, !n2, s2, e2), n2 && (t2 = e2.pastFuture(+this, t2)), e2.postformat(t2);
    }, U.toISOString = Nn, U.toString = Nn, U.toJSON = Nn, U.locale = Xt, U.localeData = Kt, U.toIsoString = e("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", Nn), U.lang = Xe, s("X", 0, 0, "unix"), s("x", 0, 0, "valueOf"), v("x", De), v("X", /[+-]?\d+(\.\d{1,3})?/), D("X", function(e2, t2, n2) {
      n2._d = new Date(1e3 * parseFloat(e2));
    }), D("x", function(e2, t2, n2) {
      n2._d = new Date(g(e2));
    }), f.version = "2.29.4", H = W, f.fn = i, f.min = function() {
      return Rt("isBefore", [].slice.call(arguments, 0));
    }, f.max = function() {
      return Rt("isAfter", [].slice.call(arguments, 0));
    }, f.now = function() {
      return Date.now ? Date.now() : +new Date();
    }, f.utc = l, f.unix = function(e2) {
      return W(1e3 * e2);
    }, f.months = function(e2, t2) {
      return fn(e2, t2, "months");
    }, f.isDate = V, f.locale = ct, f.invalid = I, f.duration = C, f.isMoment = h, f.weekdays = function(e2, t2, n2) {
      return mn(e2, t2, n2, "weekdays");
    }, f.parseZone = function() {
      return W.apply(null, arguments).parseZone();
    }, f.localeData = mt, f.isDuration = Ut, f.monthsShort = function(e2, t2) {
      return fn(e2, t2, "monthsShort");
    }, f.weekdaysMin = function(e2, t2, n2) {
      return mn(e2, t2, n2, "weekdaysMin");
    }, f.defineLocale = ft, f.updateLocale = function(e2, t2) {
      var n2, s2;
      return null != t2 ? (s2 = ot, null != R[e2] && null != R[e2].parentLocale ? R[e2].set(X(R[e2]._config, t2)) : (t2 = X(s2 = null != (n2 = dt(e2)) ? n2._config : s2, t2), null == n2 && (t2.abbr = e2), (s2 = new K(t2)).parentLocale = R[e2], R[e2] = s2), ct(e2)) : null != R[e2] && (null != R[e2].parentLocale ? (R[e2] = R[e2].parentLocale, e2 === ct() && ct(e2)) : null != R[e2] && delete R[e2]), R[e2];
    }, f.locales = function() {
      return ee(R);
    }, f.weekdaysShort = function(e2, t2, n2) {
      return mn(e2, t2, n2, "weekdaysShort");
    }, f.normalizeUnits = _2, f.relativeTimeRounding = function(e2) {
      return void 0 === e2 ? Yn : "function" == typeof e2 && (Yn = e2, true);
    }, f.relativeTimeThreshold = function(e2, t2) {
      return void 0 !== On[e2] && (void 0 === t2 ? On[e2] : (On[e2] = t2, "s" === e2 && (On.ss = t2 - 1), true));
    }, f.calendarFormat = function(e2, t2) {
      return (e2 = e2.diff(t2, "days", true)) < -6 ? "sameElse" : e2 < -1 ? "lastWeek" : e2 < 0 ? "lastDay" : e2 < 1 ? "sameDay" : e2 < 2 ? "nextDay" : e2 < 7 ? "nextWeek" : "sameElse";
    }, f.prototype = i, f.HTML5_FMT = { DATETIME_LOCAL: "YYYY-MM-DDTHH:mm", DATETIME_LOCAL_SECONDS: "YYYY-MM-DDTHH:mm:ss", DATETIME_LOCAL_MS: "YYYY-MM-DDTHH:mm:ss.SSS", DATE: "YYYY-MM-DD", TIME: "HH:mm", TIME_SECONDS: "HH:mm:ss", TIME_MS: "HH:mm:ss.SSS", WEEK: "GGGG-[W]WW", MONTH: "YYYY-MM" }, f;
  });
})(moment_min);
const moment = moment_minExports;
const LEVELS = {
  trace: 0,
  debug: 1,
  info: 2,
  warn: 3,
  error: 4,
  fatal: 5
};
const log = {
  trace: (..._args) => {
  },
  debug: (..._args) => {
  },
  info: (..._args) => {
  },
  warn: (..._args) => {
  },
  error: (..._args) => {
  },
  fatal: (..._args) => {
  }
};
const setLogLevel = function(level = "fatal") {
  let numericLevel = LEVELS.fatal;
  if (typeof level === "string") {
    level = level.toLowerCase();
    if (level in LEVELS) {
      numericLevel = LEVELS[level];
    }
  } else if (typeof level === "number") {
    numericLevel = level;
  }
  log.trace = () => {
  };
  log.debug = () => {
  };
  log.info = () => {
  };
  log.warn = () => {
  };
  log.error = () => {
  };
  log.fatal = () => {
  };
  if (numericLevel <= LEVELS.fatal) {
    log.fatal = console.error ? console.error.bind(console, format("FATAL"), "color: orange") : console.log.bind(console, "\x1B[35m", format("FATAL"));
  }
  if (numericLevel <= LEVELS.error) {
    log.error = console.error ? console.error.bind(console, format("ERROR"), "color: orange") : console.log.bind(console, "\x1B[31m", format("ERROR"));
  }
  if (numericLevel <= LEVELS.warn) {
    log.warn = console.warn ? console.warn.bind(console, format("WARN"), "color: orange") : console.log.bind(console, `\x1B[33m`, format("WARN"));
  }
  if (numericLevel <= LEVELS.info) {
    log.info = console.info ? console.info.bind(console, format("INFO"), "color: lightblue") : console.log.bind(console, "\x1B[34m", format("INFO"));
  }
  if (numericLevel <= LEVELS.debug) {
    log.debug = console.debug ? console.debug.bind(console, format("DEBUG"), "color: lightgreen") : console.log.bind(console, "\x1B[32m", format("DEBUG"));
  }
  if (numericLevel <= LEVELS.trace) {
    log.trace = console.debug ? console.debug.bind(console, format("TRACE"), "color: lightgreen") : console.log.bind(console, "\x1B[32m", format("TRACE"));
  }
};
const format = (level) => {
  const time = moment().format("ss.SSS");
  return `%c${time} : ${level} : `;
};
var noop = { value: () => {
} };
function dispatch() {
  for (var i = 0, n = arguments.length, _2 = {}, t; i < n; ++i) {
    if (!(t = arguments[i] + "") || t in _2 || /[\s.]/.test(t))
      throw new Error("illegal type: " + t);
    _2[t] = [];
  }
  return new Dispatch(_2);
}
function Dispatch(_2) {
  this._ = _2;
}
function parseTypenames$1(typenames, types) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name = "", i = t.indexOf(".");
    if (i >= 0)
      name = t.slice(i + 1), t = t.slice(0, i);
    if (t && !types.hasOwnProperty(t))
      throw new Error("unknown type: " + t);
    return { type: t, name };
  });
}
Dispatch.prototype = dispatch.prototype = {
  constructor: Dispatch,
  on: function(typename, callback) {
    var _2 = this._, T = parseTypenames$1(typename + "", _2), t, i = -1, n = T.length;
    if (arguments.length < 2) {
      while (++i < n)
        if ((t = (typename = T[i]).type) && (t = get$1(_2[t], typename.name)))
          return t;
      return;
    }
    if (callback != null && typeof callback !== "function")
      throw new Error("invalid callback: " + callback);
    while (++i < n) {
      if (t = (typename = T[i]).type)
        _2[t] = set$1(_2[t], typename.name, callback);
      else if (callback == null)
        for (t in _2)
          _2[t] = set$1(_2[t], typename.name, null);
    }
    return this;
  },
  copy: function() {
    var copy = {}, _2 = this._;
    for (var t in _2)
      copy[t] = _2[t].slice();
    return new Dispatch(copy);
  },
  call: function(type, that) {
    if ((n = arguments.length - 2) > 0)
      for (var args = new Array(n), i = 0, n, t; i < n; ++i)
        args[i] = arguments[i + 2];
    if (!this._.hasOwnProperty(type))
      throw new Error("unknown type: " + type);
    for (t = this._[type], i = 0, n = t.length; i < n; ++i)
      t[i].value.apply(that, args);
  },
  apply: function(type, that, args) {
    if (!this._.hasOwnProperty(type))
      throw new Error("unknown type: " + type);
    for (var t = this._[type], i = 0, n = t.length; i < n; ++i)
      t[i].value.apply(that, args);
  }
};
function get$1(type, name) {
  for (var i = 0, n = type.length, c; i < n; ++i) {
    if ((c = type[i]).name === name) {
      return c.value;
    }
  }
}
function set$1(type, name, callback) {
  for (var i = 0, n = type.length; i < n; ++i) {
    if (type[i].name === name) {
      type[i] = noop, type = type.slice(0, i).concat(type.slice(i + 1));
      break;
    }
  }
  if (callback != null)
    type.push({ name, value: callback });
  return type;
}
var xhtml = "http://www.w3.org/1999/xhtml";
const namespaces = {
  svg: "http://www.w3.org/2000/svg",
  xhtml,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function namespace(name) {
  var prefix = name += "", i = prefix.indexOf(":");
  if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns")
    name = name.slice(i + 1);
  return namespaces.hasOwnProperty(prefix) ? { space: namespaces[prefix], local: name } : name;
}
function creatorInherit(name) {
  return function() {
    var document2 = this.ownerDocument, uri = this.namespaceURI;
    return uri === xhtml && document2.documentElement.namespaceURI === xhtml ? document2.createElement(name) : document2.createElementNS(uri, name);
  };
}
function creatorFixed(fullname) {
  return function() {
    return this.ownerDocument.createElementNS(fullname.space, fullname.local);
  };
}
function creator(name) {
  var fullname = namespace(name);
  return (fullname.local ? creatorFixed : creatorInherit)(fullname);
}
function none() {
}
function selector(selector2) {
  return selector2 == null ? none : function() {
    return this.querySelector(selector2);
  };
}
function selection_select(select2) {
  if (typeof select2 !== "function")
    select2 = selector(select2);
  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select2.call(node, node.__data__, i, group))) {
        if ("__data__" in node)
          subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
      }
    }
  }
  return new Selection$1(subgroups, this._parents);
}
function array(x) {
  return x == null ? [] : Array.isArray(x) ? x : Array.from(x);
}
function empty() {
  return [];
}
function selectorAll(selector2) {
  return selector2 == null ? empty : function() {
    return this.querySelectorAll(selector2);
  };
}
function arrayAll(select2) {
  return function() {
    return array(select2.apply(this, arguments));
  };
}
function selection_selectAll(select2) {
  if (typeof select2 === "function")
    select2 = arrayAll(select2);
  else
    select2 = selectorAll(select2);
  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        subgroups.push(select2.call(node, node.__data__, i, group));
        parents.push(node);
      }
    }
  }
  return new Selection$1(subgroups, parents);
}
function matcher(selector2) {
  return function() {
    return this.matches(selector2);
  };
}
function childMatcher(selector2) {
  return function(node) {
    return node.matches(selector2);
  };
}
var find = Array.prototype.find;
function childFind(match) {
  return function() {
    return find.call(this.children, match);
  };
}
function childFirst() {
  return this.firstElementChild;
}
function selection_selectChild(match) {
  return this.select(match == null ? childFirst : childFind(typeof match === "function" ? match : childMatcher(match)));
}
var filter = Array.prototype.filter;
function children() {
  return Array.from(this.children);
}
function childrenFilter(match) {
  return function() {
    return filter.call(this.children, match);
  };
}
function selection_selectChildren(match) {
  return this.selectAll(match == null ? children : childrenFilter(typeof match === "function" ? match : childMatcher(match)));
}
function selection_filter(match) {
  if (typeof match !== "function")
    match = matcher(match);
  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }
  return new Selection$1(subgroups, this._parents);
}
function sparse(update) {
  return new Array(update.length);
}
function selection_enter() {
  return new Selection$1(this._enter || this._groups.map(sparse), this._parents);
}
function EnterNode(parent, datum2) {
  this.ownerDocument = parent.ownerDocument;
  this.namespaceURI = parent.namespaceURI;
  this._next = null;
  this._parent = parent;
  this.__data__ = datum2;
}
EnterNode.prototype = {
  constructor: EnterNode,
  appendChild: function(child) {
    return this._parent.insertBefore(child, this._next);
  },
  insertBefore: function(child, next) {
    return this._parent.insertBefore(child, next);
  },
  querySelector: function(selector2) {
    return this._parent.querySelector(selector2);
  },
  querySelectorAll: function(selector2) {
    return this._parent.querySelectorAll(selector2);
  }
};
function constant$1(x) {
  return function() {
    return x;
  };
}
function bindIndex(parent, group, enter, update, exit, data) {
  var i = 0, node, groupLength = group.length, dataLength = data.length;
  for (; i < dataLength; ++i) {
    if (node = group[i]) {
      node.__data__ = data[i];
      update[i] = node;
    } else {
      enter[i] = new EnterNode(parent, data[i]);
    }
  }
  for (; i < groupLength; ++i) {
    if (node = group[i]) {
      exit[i] = node;
    }
  }
}
function bindKey(parent, group, enter, update, exit, data, key) {
  var i, node, nodeByKeyValue = /* @__PURE__ */ new Map(), groupLength = group.length, dataLength = data.length, keyValues = new Array(groupLength), keyValue;
  for (i = 0; i < groupLength; ++i) {
    if (node = group[i]) {
      keyValues[i] = keyValue = key.call(node, node.__data__, i, group) + "";
      if (nodeByKeyValue.has(keyValue)) {
        exit[i] = node;
      } else {
        nodeByKeyValue.set(keyValue, node);
      }
    }
  }
  for (i = 0; i < dataLength; ++i) {
    keyValue = key.call(parent, data[i], i, data) + "";
    if (node = nodeByKeyValue.get(keyValue)) {
      update[i] = node;
      node.__data__ = data[i];
      nodeByKeyValue.delete(keyValue);
    } else {
      enter[i] = new EnterNode(parent, data[i]);
    }
  }
  for (i = 0; i < groupLength; ++i) {
    if ((node = group[i]) && nodeByKeyValue.get(keyValues[i]) === node) {
      exit[i] = node;
    }
  }
}
function datum(node) {
  return node.__data__;
}
function selection_data(value, key) {
  if (!arguments.length)
    return Array.from(this, datum);
  var bind = key ? bindKey : bindIndex, parents = this._parents, groups = this._groups;
  if (typeof value !== "function")
    value = constant$1(value);
  for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
    var parent = parents[j], group = groups[j], groupLength = group.length, data = arraylike(value.call(parent, parent && parent.__data__, j, parents)), dataLength = data.length, enterGroup = enter[j] = new Array(dataLength), updateGroup = update[j] = new Array(dataLength), exitGroup = exit[j] = new Array(groupLength);
    bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);
    for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
      if (previous = enterGroup[i0]) {
        if (i0 >= i1)
          i1 = i0 + 1;
        while (!(next = updateGroup[i1]) && ++i1 < dataLength)
          ;
        previous._next = next || null;
      }
    }
  }
  update = new Selection$1(update, parents);
  update._enter = enter;
  update._exit = exit;
  return update;
}
function arraylike(data) {
  return typeof data === "object" && "length" in data ? data : Array.from(data);
}
function selection_exit() {
  return new Selection$1(this._exit || this._groups.map(sparse), this._parents);
}
function selection_join(onenter, onupdate, onexit) {
  var enter = this.enter(), update = this, exit = this.exit();
  if (typeof onenter === "function") {
    enter = onenter(enter);
    if (enter)
      enter = enter.selection();
  } else {
    enter = enter.append(onenter + "");
  }
  if (onupdate != null) {
    update = onupdate(update);
    if (update)
      update = update.selection();
  }
  if (onexit == null)
    exit.remove();
  else
    onexit(exit);
  return enter && update ? enter.merge(update).order() : update;
}
function selection_merge(context) {
  var selection2 = context.selection ? context.selection() : context;
  for (var groups0 = this._groups, groups1 = selection2._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }
  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }
  return new Selection$1(merges, this._parents);
}
function selection_order() {
  for (var groups = this._groups, j = -1, m = groups.length; ++j < m; ) {
    for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0; ) {
      if (node = group[i]) {
        if (next && node.compareDocumentPosition(next) ^ 4)
          next.parentNode.insertBefore(node, next);
        next = node;
      }
    }
  }
  return this;
}
function selection_sort(compare) {
  if (!compare)
    compare = ascending;
  function compareNode(a, b) {
    return a && b ? compare(a.__data__, b.__data__) : !a - !b;
  }
  for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        sortgroup[i] = node;
      }
    }
    sortgroup.sort(compareNode);
  }
  return new Selection$1(sortgroups, this._parents).order();
}
function ascending(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}
function selection_call() {
  var callback = arguments[0];
  arguments[0] = this;
  callback.apply(null, arguments);
  return this;
}
function selection_nodes() {
  return Array.from(this);
}
function selection_node() {
  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
      var node = group[i];
      if (node)
        return node;
    }
  }
  return null;
}
function selection_size() {
  let size = 0;
  for (const node of this)
    ++size;
  return size;
}
function selection_empty() {
  return !this.node();
}
function selection_each(callback) {
  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      if (node = group[i])
        callback.call(node, node.__data__, i, group);
    }
  }
  return this;
}
function attrRemove$1(name) {
  return function() {
    this.removeAttribute(name);
  };
}
function attrRemoveNS$1(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}
function attrConstant$1(name, value) {
  return function() {
    this.setAttribute(name, value);
  };
}
function attrConstantNS$1(fullname, value) {
  return function() {
    this.setAttributeNS(fullname.space, fullname.local, value);
  };
}
function attrFunction$1(name, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null)
      this.removeAttribute(name);
    else
      this.setAttribute(name, v);
  };
}
function attrFunctionNS$1(fullname, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null)
      this.removeAttributeNS(fullname.space, fullname.local);
    else
      this.setAttributeNS(fullname.space, fullname.local, v);
  };
}
function selection_attr(name, value) {
  var fullname = namespace(name);
  if (arguments.length < 2) {
    var node = this.node();
    return fullname.local ? node.getAttributeNS(fullname.space, fullname.local) : node.getAttribute(fullname);
  }
  return this.each((value == null ? fullname.local ? attrRemoveNS$1 : attrRemove$1 : typeof value === "function" ? fullname.local ? attrFunctionNS$1 : attrFunction$1 : fullname.local ? attrConstantNS$1 : attrConstant$1)(fullname, value));
}
function defaultView(node) {
  return node.ownerDocument && node.ownerDocument.defaultView || node.document && node || node.defaultView;
}
function styleRemove$1(name) {
  return function() {
    this.style.removeProperty(name);
  };
}
function styleConstant$1(name, value, priority) {
  return function() {
    this.style.setProperty(name, value, priority);
  };
}
function styleFunction$1(name, value, priority) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null)
      this.style.removeProperty(name);
    else
      this.style.setProperty(name, v, priority);
  };
}
function selection_style(name, value, priority) {
  return arguments.length > 1 ? this.each((value == null ? styleRemove$1 : typeof value === "function" ? styleFunction$1 : styleConstant$1)(name, value, priority == null ? "" : priority)) : styleValue(this.node(), name);
}
function styleValue(node, name) {
  return node.style.getPropertyValue(name) || defaultView(node).getComputedStyle(node, null).getPropertyValue(name);
}
function propertyRemove(name) {
  return function() {
    delete this[name];
  };
}
function propertyConstant(name, value) {
  return function() {
    this[name] = value;
  };
}
function propertyFunction(name, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null)
      delete this[name];
    else
      this[name] = v;
  };
}
function selection_property(name, value) {
  return arguments.length > 1 ? this.each((value == null ? propertyRemove : typeof value === "function" ? propertyFunction : propertyConstant)(name, value)) : this.node()[name];
}
function classArray(string) {
  return string.trim().split(/^|\s+/);
}
function classList(node) {
  return node.classList || new ClassList(node);
}
function ClassList(node) {
  this._node = node;
  this._names = classArray(node.getAttribute("class") || "");
}
ClassList.prototype = {
  add: function(name) {
    var i = this._names.indexOf(name);
    if (i < 0) {
      this._names.push(name);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  remove: function(name) {
    var i = this._names.indexOf(name);
    if (i >= 0) {
      this._names.splice(i, 1);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  contains: function(name) {
    return this._names.indexOf(name) >= 0;
  }
};
function classedAdd(node, names) {
  var list = classList(node), i = -1, n = names.length;
  while (++i < n)
    list.add(names[i]);
}
function classedRemove(node, names) {
  var list = classList(node), i = -1, n = names.length;
  while (++i < n)
    list.remove(names[i]);
}
function classedTrue(names) {
  return function() {
    classedAdd(this, names);
  };
}
function classedFalse(names) {
  return function() {
    classedRemove(this, names);
  };
}
function classedFunction(names, value) {
  return function() {
    (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
  };
}
function selection_classed(name, value) {
  var names = classArray(name + "");
  if (arguments.length < 2) {
    var list = classList(this.node()), i = -1, n = names.length;
    while (++i < n)
      if (!list.contains(names[i]))
        return false;
    return true;
  }
  return this.each((typeof value === "function" ? classedFunction : value ? classedTrue : classedFalse)(names, value));
}
function textRemove() {
  this.textContent = "";
}
function textConstant$1(value) {
  return function() {
    this.textContent = value;
  };
}
function textFunction$1(value) {
  return function() {
    var v = value.apply(this, arguments);
    this.textContent = v == null ? "" : v;
  };
}
function selection_text(value) {
  return arguments.length ? this.each(value == null ? textRemove : (typeof value === "function" ? textFunction$1 : textConstant$1)(value)) : this.node().textContent;
}
function htmlRemove() {
  this.innerHTML = "";
}
function htmlConstant(value) {
  return function() {
    this.innerHTML = value;
  };
}
function htmlFunction(value) {
  return function() {
    var v = value.apply(this, arguments);
    this.innerHTML = v == null ? "" : v;
  };
}
function selection_html(value) {
  return arguments.length ? this.each(value == null ? htmlRemove : (typeof value === "function" ? htmlFunction : htmlConstant)(value)) : this.node().innerHTML;
}
function raise() {
  if (this.nextSibling)
    this.parentNode.appendChild(this);
}
function selection_raise() {
  return this.each(raise);
}
function lower() {
  if (this.previousSibling)
    this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function selection_lower() {
  return this.each(lower);
}
function selection_append(name) {
  var create2 = typeof name === "function" ? name : creator(name);
  return this.select(function() {
    return this.appendChild(create2.apply(this, arguments));
  });
}
function constantNull() {
  return null;
}
function selection_insert(name, before) {
  var create2 = typeof name === "function" ? name : creator(name), select2 = before == null ? constantNull : typeof before === "function" ? before : selector(before);
  return this.select(function() {
    return this.insertBefore(create2.apply(this, arguments), select2.apply(this, arguments) || null);
  });
}
function remove() {
  var parent = this.parentNode;
  if (parent)
    parent.removeChild(this);
}
function selection_remove() {
  return this.each(remove);
}
function selection_cloneShallow() {
  var clone2 = this.cloneNode(false), parent = this.parentNode;
  return parent ? parent.insertBefore(clone2, this.nextSibling) : clone2;
}
function selection_cloneDeep() {
  var clone2 = this.cloneNode(true), parent = this.parentNode;
  return parent ? parent.insertBefore(clone2, this.nextSibling) : clone2;
}
function selection_clone(deep) {
  return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
}
function selection_datum(value) {
  return arguments.length ? this.property("__data__", value) : this.node().__data__;
}
function contextListener(listener) {
  return function(event) {
    listener.call(this, event, this.__data__);
  };
}
function parseTypenames(typenames) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name = "", i = t.indexOf(".");
    if (i >= 0)
      name = t.slice(i + 1), t = t.slice(0, i);
    return { type: t, name };
  });
}
function onRemove(typename) {
  return function() {
    var on = this.__on;
    if (!on)
      return;
    for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
      if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.options);
      } else {
        on[++i] = o;
      }
    }
    if (++i)
      on.length = i;
    else
      delete this.__on;
  };
}
function onAdd(typename, value, options) {
  return function() {
    var on = this.__on, o, listener = contextListener(value);
    if (on)
      for (var j = 0, m = on.length; j < m; ++j) {
        if ((o = on[j]).type === typename.type && o.name === typename.name) {
          this.removeEventListener(o.type, o.listener, o.options);
          this.addEventListener(o.type, o.listener = listener, o.options = options);
          o.value = value;
          return;
        }
      }
    this.addEventListener(typename.type, listener, options);
    o = { type: typename.type, name: typename.name, value, listener, options };
    if (!on)
      this.__on = [o];
    else
      on.push(o);
  };
}
function selection_on(typename, value, options) {
  var typenames = parseTypenames(typename + ""), i, n = typenames.length, t;
  if (arguments.length < 2) {
    var on = this.node().__on;
    if (on)
      for (var j = 0, m = on.length, o; j < m; ++j) {
        for (i = 0, o = on[j]; i < n; ++i) {
          if ((t = typenames[i]).type === o.type && t.name === o.name) {
            return o.value;
          }
        }
      }
    return;
  }
  on = value ? onAdd : onRemove;
  for (i = 0; i < n; ++i)
    this.each(on(typenames[i], value, options));
  return this;
}
function dispatchEvent(node, type, params) {
  var window2 = defaultView(node), event = window2.CustomEvent;
  if (typeof event === "function") {
    event = new event(type, params);
  } else {
    event = window2.document.createEvent("Event");
    if (params)
      event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;
    else
      event.initEvent(type, false, false);
  }
  node.dispatchEvent(event);
}
function dispatchConstant(type, params) {
  return function() {
    return dispatchEvent(this, type, params);
  };
}
function dispatchFunction(type, params) {
  return function() {
    return dispatchEvent(this, type, params.apply(this, arguments));
  };
}
function selection_dispatch(type, params) {
  return this.each((typeof params === "function" ? dispatchFunction : dispatchConstant)(type, params));
}
function* selection_iterator() {
  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      if (node = group[i])
        yield node;
    }
  }
}
var root = [null];
function Selection$1(groups, parents) {
  this._groups = groups;
  this._parents = parents;
}
function selection() {
  return new Selection$1([[document.documentElement]], root);
}
function selection_selection() {
  return this;
}
Selection$1.prototype = selection.prototype = {
  constructor: Selection$1,
  select: selection_select,
  selectAll: selection_selectAll,
  selectChild: selection_selectChild,
  selectChildren: selection_selectChildren,
  filter: selection_filter,
  data: selection_data,
  enter: selection_enter,
  exit: selection_exit,
  join: selection_join,
  merge: selection_merge,
  selection: selection_selection,
  order: selection_order,
  sort: selection_sort,
  call: selection_call,
  nodes: selection_nodes,
  node: selection_node,
  size: selection_size,
  empty: selection_empty,
  each: selection_each,
  attr: selection_attr,
  style: selection_style,
  property: selection_property,
  classed: selection_classed,
  text: selection_text,
  html: selection_html,
  raise: selection_raise,
  lower: selection_lower,
  append: selection_append,
  insert: selection_insert,
  remove: selection_remove,
  clone: selection_clone,
  datum: selection_datum,
  on: selection_on,
  dispatch: selection_dispatch,
  [Symbol.iterator]: selection_iterator
};
function select(selector2) {
  return typeof selector2 === "string" ? new Selection$1([[document.querySelector(selector2)]], [document.documentElement]) : new Selection$1([[selector2]], root);
}
function define(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
}
function extend(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition)
    prototype[key] = definition[key];
  return prototype;
}
function Color$2() {
}
var darker = 0.7;
var brighter = 1 / darker;
var reI = "\\s*([+-]?\\d+)\\s*", reN = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", reP = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", reHex = /^#([0-9a-f]{3,8})$/, reRgbInteger = new RegExp(`^rgb\\(${reI},${reI},${reI}\\)$`), reRgbPercent = new RegExp(`^rgb\\(${reP},${reP},${reP}\\)$`), reRgbaInteger = new RegExp(`^rgba\\(${reI},${reI},${reI},${reN}\\)$`), reRgbaPercent = new RegExp(`^rgba\\(${reP},${reP},${reP},${reN}\\)$`), reHslPercent = new RegExp(`^hsl\\(${reN},${reP},${reP}\\)$`), reHslaPercent = new RegExp(`^hsla\\(${reN},${reP},${reP},${reN}\\)$`);
var named = {
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
define(Color$2, color, {
  copy(channels2) {
    return Object.assign(new this.constructor(), this, channels2);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: color_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: color_formatHex,
  formatHex8: color_formatHex8,
  formatHsl: color_formatHsl,
  formatRgb: color_formatRgb,
  toString: color_formatRgb
});
function color_formatHex() {
  return this.rgb().formatHex();
}
function color_formatHex8() {
  return this.rgb().formatHex8();
}
function color_formatHsl() {
  return hslConvert(this).formatHsl();
}
function color_formatRgb() {
  return this.rgb().formatRgb();
}
function color(format2) {
  var m, l;
  format2 = (format2 + "").trim().toLowerCase();
  return (m = reHex.exec(format2)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) : l === 3 ? new Rgb(m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, (m & 15) << 4 | m & 15, 1) : l === 8 ? rgba$2(m >> 24 & 255, m >> 16 & 255, m >> 8 & 255, (m & 255) / 255) : l === 4 ? rgba$2(m >> 12 & 15 | m >> 8 & 240, m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, ((m & 15) << 4 | m & 15) / 255) : null) : (m = reRgbInteger.exec(format2)) ? new Rgb(m[1], m[2], m[3], 1) : (m = reRgbPercent.exec(format2)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) : (m = reRgbaInteger.exec(format2)) ? rgba$2(m[1], m[2], m[3], m[4]) : (m = reRgbaPercent.exec(format2)) ? rgba$2(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) : (m = reHslPercent.exec(format2)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) : (m = reHslaPercent.exec(format2)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) : named.hasOwnProperty(format2) ? rgbn(named[format2]) : format2 === "transparent" ? new Rgb(NaN, NaN, NaN, 0) : null;
}
function rgbn(n) {
  return new Rgb(n >> 16 & 255, n >> 8 & 255, n & 255, 1);
}
function rgba$2(r, g, b, a) {
  if (a <= 0)
    r = g = b = NaN;
  return new Rgb(r, g, b, a);
}
function rgbConvert(o) {
  if (!(o instanceof Color$2))
    o = color(o);
  if (!o)
    return new Rgb();
  o = o.rgb();
  return new Rgb(o.r, o.g, o.b, o.opacity);
}
function rgb(r, g, b, opacity) {
  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
}
function Rgb(r, g, b, opacity) {
  this.r = +r;
  this.g = +g;
  this.b = +b;
  this.opacity = +opacity;
}
define(Rgb, rgb, extend(Color$2, {
  brighter(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  darker(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Rgb(clampi(this.r), clampi(this.g), clampi(this.b), clampa(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && (-0.5 <= this.g && this.g < 255.5) && (-0.5 <= this.b && this.b < 255.5) && (0 <= this.opacity && this.opacity <= 1);
  },
  hex: rgb_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: rgb_formatHex,
  formatHex8: rgb_formatHex8,
  formatRgb: rgb_formatRgb,
  toString: rgb_formatRgb
}));
function rgb_formatHex() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}`;
}
function rgb_formatHex8() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}${hex((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function rgb_formatRgb() {
  const a = clampa(this.opacity);
  return `${a === 1 ? "rgb(" : "rgba("}${clampi(this.r)}, ${clampi(this.g)}, ${clampi(this.b)}${a === 1 ? ")" : `, ${a})`}`;
}
function clampa(opacity) {
  return isNaN(opacity) ? 1 : Math.max(0, Math.min(1, opacity));
}
function clampi(value) {
  return Math.max(0, Math.min(255, Math.round(value) || 0));
}
function hex(value) {
  value = clampi(value);
  return (value < 16 ? "0" : "") + value.toString(16);
}
function hsla(h, s, l, a) {
  if (a <= 0)
    h = s = l = NaN;
  else if (l <= 0 || l >= 1)
    h = s = NaN;
  else if (s <= 0)
    h = NaN;
  return new Hsl(h, s, l, a);
}
function hslConvert(o) {
  if (o instanceof Hsl)
    return new Hsl(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Color$2))
    o = color(o);
  if (!o)
    return new Hsl();
  if (o instanceof Hsl)
    return o;
  o = o.rgb();
  var r = o.r / 255, g = o.g / 255, b = o.b / 255, min = Math.min(r, g, b), max = Math.max(r, g, b), h = NaN, s = max - min, l = (max + min) / 2;
  if (s) {
    if (r === max)
      h = (g - b) / s + (g < b) * 6;
    else if (g === max)
      h = (b - r) / s + 2;
    else
      h = (r - g) / s + 4;
    s /= l < 0.5 ? max + min : 2 - max - min;
    h *= 60;
  } else {
    s = l > 0 && l < 1 ? 0 : h;
  }
  return new Hsl(h, s, l, o.opacity);
}
function hsl(h, s, l, opacity) {
  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
}
function Hsl(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}
define(Hsl, hsl, extend(Color$2, {
  brighter(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  darker(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  rgb() {
    var h = this.h % 360 + (this.h < 0) * 360, s = isNaN(h) || isNaN(this.s) ? 0 : this.s, l = this.l, m2 = l + (l < 0.5 ? l : 1 - l) * s, m1 = 2 * l - m2;
    return new Rgb(
      hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
      hsl2rgb(h, m1, m2),
      hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
      this.opacity
    );
  },
  clamp() {
    return new Hsl(clamph(this.h), clampt(this.s), clampt(this.l), clampa(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && (0 <= this.l && this.l <= 1) && (0 <= this.opacity && this.opacity <= 1);
  },
  formatHsl() {
    const a = clampa(this.opacity);
    return `${a === 1 ? "hsl(" : "hsla("}${clamph(this.h)}, ${clampt(this.s) * 100}%, ${clampt(this.l) * 100}%${a === 1 ? ")" : `, ${a})`}`;
  }
}));
function clamph(value) {
  value = (value || 0) % 360;
  return value < 0 ? value + 360 : value;
}
function clampt(value) {
  return Math.max(0, Math.min(1, value || 0));
}
function hsl2rgb(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
}
const constant = (x) => () => x;
function linear(a, d) {
  return function(t) {
    return a + t * d;
  };
}
function exponential(a, b, y) {
  return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
    return Math.pow(a + t * b, y);
  };
}
function hue(a, b) {
  var d = b - a;
  return d ? linear(a, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : constant(isNaN(a) ? b : a);
}
function gamma(y) {
  return (y = +y) === 1 ? nogamma : function(a, b) {
    return b - a ? exponential(a, b, y) : constant(isNaN(a) ? b : a);
  };
}
function nogamma(a, b) {
  var d = b - a;
  return d ? linear(a, d) : constant(isNaN(a) ? b : a);
}
const interpolateRgb = function rgbGamma(y) {
  var color2 = gamma(y);
  function rgb$1(start2, end) {
    var r = color2((start2 = rgb(start2)).r, (end = rgb(end)).r), g = color2(start2.g, end.g), b = color2(start2.b, end.b), opacity = nogamma(start2.opacity, end.opacity);
    return function(t) {
      start2.r = r(t);
      start2.g = g(t);
      start2.b = b(t);
      start2.opacity = opacity(t);
      return start2 + "";
    };
  }
  rgb$1.gamma = rgbGamma;
  return rgb$1;
}(1);
function interpolateNumber(a, b) {
  return a = +a, b = +b, function(t) {
    return a * (1 - t) + b * t;
  };
}
var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, reB = new RegExp(reA.source, "g");
function zero(b) {
  return function() {
    return b;
  };
}
function one(b) {
  return function(t) {
    return b(t) + "";
  };
}
function interpolateString(a, b) {
  var bi = reA.lastIndex = reB.lastIndex = 0, am, bm, bs, i = -1, s = [], q = [];
  a = a + "", b = b + "";
  while ((am = reA.exec(a)) && (bm = reB.exec(b))) {
    if ((bs = bm.index) > bi) {
      bs = b.slice(bi, bs);
      if (s[i])
        s[i] += bs;
      else
        s[++i] = bs;
    }
    if ((am = am[0]) === (bm = bm[0])) {
      if (s[i])
        s[i] += bm;
      else
        s[++i] = bm;
    } else {
      s[++i] = null;
      q.push({ i, x: interpolateNumber(am, bm) });
    }
    bi = reB.lastIndex;
  }
  if (bi < b.length) {
    bs = b.slice(bi);
    if (s[i])
      s[i] += bs;
    else
      s[++i] = bs;
  }
  return s.length < 2 ? q[0] ? one(q[0].x) : zero(b) : (b = q.length, function(t) {
    for (var i2 = 0, o; i2 < b; ++i2)
      s[(o = q[i2]).i] = o.x(t);
    return s.join("");
  });
}
var degrees = 180 / Math.PI;
var identity = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function decompose(a, b, c, d, e, f) {
  var scaleX, scaleY, skewX;
  if (scaleX = Math.sqrt(a * a + b * b))
    a /= scaleX, b /= scaleX;
  if (skewX = a * c + b * d)
    c -= a * skewX, d -= b * skewX;
  if (scaleY = Math.sqrt(c * c + d * d))
    c /= scaleY, d /= scaleY, skewX /= scaleY;
  if (a * d < b * c)
    a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
  return {
    translateX: e,
    translateY: f,
    rotate: Math.atan2(b, a) * degrees,
    skewX: Math.atan(skewX) * degrees,
    scaleX,
    scaleY
  };
}
var svgNode;
function parseCss(value) {
  const m = new (typeof DOMMatrix === "function" ? DOMMatrix : WebKitCSSMatrix)(value + "");
  return m.isIdentity ? identity : decompose(m.a, m.b, m.c, m.d, m.e, m.f);
}
function parseSvg(value) {
  if (value == null)
    return identity;
  if (!svgNode)
    svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
  svgNode.setAttribute("transform", value);
  if (!(value = svgNode.transform.baseVal.consolidate()))
    return identity;
  value = value.matrix;
  return decompose(value.a, value.b, value.c, value.d, value.e, value.f);
}
function interpolateTransform(parse, pxComma, pxParen, degParen) {
  function pop(s) {
    return s.length ? s.pop() + " " : "";
  }
  function translate(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push("translate(", null, pxComma, null, pxParen);
      q.push({ i: i - 4, x: interpolateNumber(xa, xb) }, { i: i - 2, x: interpolateNumber(ya, yb) });
    } else if (xb || yb) {
      s.push("translate(" + xb + pxComma + yb + pxParen);
    }
  }
  function rotate(a, b, s, q) {
    if (a !== b) {
      if (a - b > 180)
        b += 360;
      else if (b - a > 180)
        a += 360;
      q.push({ i: s.push(pop(s) + "rotate(", null, degParen) - 2, x: interpolateNumber(a, b) });
    } else if (b) {
      s.push(pop(s) + "rotate(" + b + degParen);
    }
  }
  function skewX(a, b, s, q) {
    if (a !== b) {
      q.push({ i: s.push(pop(s) + "skewX(", null, degParen) - 2, x: interpolateNumber(a, b) });
    } else if (b) {
      s.push(pop(s) + "skewX(" + b + degParen);
    }
  }
  function scale(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push(pop(s) + "scale(", null, ",", null, ")");
      q.push({ i: i - 4, x: interpolateNumber(xa, xb) }, { i: i - 2, x: interpolateNumber(ya, yb) });
    } else if (xb !== 1 || yb !== 1) {
      s.push(pop(s) + "scale(" + xb + "," + yb + ")");
    }
  }
  return function(a, b) {
    var s = [], q = [];
    a = parse(a), b = parse(b);
    translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
    rotate(a.rotate, b.rotate, s, q);
    skewX(a.skewX, b.skewX, s, q);
    scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
    a = b = null;
    return function(t) {
      var i = -1, n = q.length, o;
      while (++i < n)
        s[(o = q[i]).i] = o.x(t);
      return s.join("");
    };
  };
}
var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
var interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");
var frame = 0, timeout$1 = 0, interval = 0, pokeDelay = 1e3, taskHead, taskTail, clockLast = 0, clockNow = 0, clockSkew = 0, clock = typeof performance === "object" && performance.now ? performance : Date, setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f) {
  setTimeout(f, 17);
};
function now() {
  return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
}
function clearNow() {
  clockNow = 0;
}
function Timer() {
  this._call = this._time = this._next = null;
}
Timer.prototype = timer.prototype = {
  constructor: Timer,
  restart: function(callback, delay, time) {
    if (typeof callback !== "function")
      throw new TypeError("callback is not a function");
    time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
    if (!this._next && taskTail !== this) {
      if (taskTail)
        taskTail._next = this;
      else
        taskHead = this;
      taskTail = this;
    }
    this._call = callback;
    this._time = time;
    sleep();
  },
  stop: function() {
    if (this._call) {
      this._call = null;
      this._time = Infinity;
      sleep();
    }
  }
};
function timer(callback, delay, time) {
  var t = new Timer();
  t.restart(callback, delay, time);
  return t;
}
function timerFlush() {
  now();
  ++frame;
  var t = taskHead, e;
  while (t) {
    if ((e = clockNow - t._time) >= 0)
      t._call.call(void 0, e);
    t = t._next;
  }
  --frame;
}
function wake() {
  clockNow = (clockLast = clock.now()) + clockSkew;
  frame = timeout$1 = 0;
  try {
    timerFlush();
  } finally {
    frame = 0;
    nap();
    clockNow = 0;
  }
}
function poke() {
  var now2 = clock.now(), delay = now2 - clockLast;
  if (delay > pokeDelay)
    clockSkew -= delay, clockLast = now2;
}
function nap() {
  var t0, t1 = taskHead, t2, time = Infinity;
  while (t1) {
    if (t1._call) {
      if (time > t1._time)
        time = t1._time;
      t0 = t1, t1 = t1._next;
    } else {
      t2 = t1._next, t1._next = null;
      t1 = t0 ? t0._next = t2 : taskHead = t2;
    }
  }
  taskTail = t0;
  sleep(time);
}
function sleep(time) {
  if (frame)
    return;
  if (timeout$1)
    timeout$1 = clearTimeout(timeout$1);
  var delay = time - clockNow;
  if (delay > 24) {
    if (time < Infinity)
      timeout$1 = setTimeout(wake, time - clock.now() - clockSkew);
    if (interval)
      interval = clearInterval(interval);
  } else {
    if (!interval)
      clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
    frame = 1, setFrame(wake);
  }
}
function timeout(callback, delay, time) {
  var t = new Timer();
  delay = delay == null ? 0 : +delay;
  t.restart((elapsed) => {
    t.stop();
    callback(elapsed + delay);
  }, delay, time);
  return t;
}
var emptyOn = dispatch("start", "end", "cancel", "interrupt");
var emptyTween = [];
var CREATED = 0;
var SCHEDULED = 1;
var STARTING = 2;
var STARTED = 3;
var RUNNING = 4;
var ENDING = 5;
var ENDED = 6;
function schedule(node, name, id2, index, group, timing) {
  var schedules = node.__transition;
  if (!schedules)
    node.__transition = {};
  else if (id2 in schedules)
    return;
  create$1(node, id2, {
    name,
    index,
    // For context during callback.
    group,
    // For context during callback.
    on: emptyOn,
    tween: emptyTween,
    time: timing.time,
    delay: timing.delay,
    duration: timing.duration,
    ease: timing.ease,
    timer: null,
    state: CREATED
  });
}
function init(node, id2) {
  var schedule2 = get(node, id2);
  if (schedule2.state > CREATED)
    throw new Error("too late; already scheduled");
  return schedule2;
}
function set(node, id2) {
  var schedule2 = get(node, id2);
  if (schedule2.state > STARTED)
    throw new Error("too late; already running");
  return schedule2;
}
function get(node, id2) {
  var schedule2 = node.__transition;
  if (!schedule2 || !(schedule2 = schedule2[id2]))
    throw new Error("transition not found");
  return schedule2;
}
function create$1(node, id2, self2) {
  var schedules = node.__transition, tween;
  schedules[id2] = self2;
  self2.timer = timer(schedule2, 0, self2.time);
  function schedule2(elapsed) {
    self2.state = SCHEDULED;
    self2.timer.restart(start2, self2.delay, self2.time);
    if (self2.delay <= elapsed)
      start2(elapsed - self2.delay);
  }
  function start2(elapsed) {
    var i, j, n, o;
    if (self2.state !== SCHEDULED)
      return stop();
    for (i in schedules) {
      o = schedules[i];
      if (o.name !== self2.name)
        continue;
      if (o.state === STARTED)
        return timeout(start2);
      if (o.state === RUNNING) {
        o.state = ENDED;
        o.timer.stop();
        o.on.call("interrupt", node, node.__data__, o.index, o.group);
        delete schedules[i];
      } else if (+i < id2) {
        o.state = ENDED;
        o.timer.stop();
        o.on.call("cancel", node, node.__data__, o.index, o.group);
        delete schedules[i];
      }
    }
    timeout(function() {
      if (self2.state === STARTED) {
        self2.state = RUNNING;
        self2.timer.restart(tick, self2.delay, self2.time);
        tick(elapsed);
      }
    });
    self2.state = STARTING;
    self2.on.call("start", node, node.__data__, self2.index, self2.group);
    if (self2.state !== STARTING)
      return;
    self2.state = STARTED;
    tween = new Array(n = self2.tween.length);
    for (i = 0, j = -1; i < n; ++i) {
      if (o = self2.tween[i].value.call(node, node.__data__, self2.index, self2.group)) {
        tween[++j] = o;
      }
    }
    tween.length = j + 1;
  }
  function tick(elapsed) {
    var t = elapsed < self2.duration ? self2.ease.call(null, elapsed / self2.duration) : (self2.timer.restart(stop), self2.state = ENDING, 1), i = -1, n = tween.length;
    while (++i < n) {
      tween[i].call(node, t);
    }
    if (self2.state === ENDING) {
      self2.on.call("end", node, node.__data__, self2.index, self2.group);
      stop();
    }
  }
  function stop() {
    self2.state = ENDED;
    self2.timer.stop();
    delete schedules[id2];
    for (var i in schedules)
      return;
    delete node.__transition;
  }
}
function interrupt(node, name) {
  var schedules = node.__transition, schedule2, active, empty2 = true, i;
  if (!schedules)
    return;
  name = name == null ? null : name + "";
  for (i in schedules) {
    if ((schedule2 = schedules[i]).name !== name) {
      empty2 = false;
      continue;
    }
    active = schedule2.state > STARTING && schedule2.state < ENDING;
    schedule2.state = ENDED;
    schedule2.timer.stop();
    schedule2.on.call(active ? "interrupt" : "cancel", node, node.__data__, schedule2.index, schedule2.group);
    delete schedules[i];
  }
  if (empty2)
    delete node.__transition;
}
function selection_interrupt(name) {
  return this.each(function() {
    interrupt(this, name);
  });
}
function tweenRemove(id2, name) {
  var tween0, tween1;
  return function() {
    var schedule2 = set(this, id2), tween = schedule2.tween;
    if (tween !== tween0) {
      tween1 = tween0 = tween;
      for (var i = 0, n = tween1.length; i < n; ++i) {
        if (tween1[i].name === name) {
          tween1 = tween1.slice();
          tween1.splice(i, 1);
          break;
        }
      }
    }
    schedule2.tween = tween1;
  };
}
function tweenFunction(id2, name, value) {
  var tween0, tween1;
  if (typeof value !== "function")
    throw new Error();
  return function() {
    var schedule2 = set(this, id2), tween = schedule2.tween;
    if (tween !== tween0) {
      tween1 = (tween0 = tween).slice();
      for (var t = { name, value }, i = 0, n = tween1.length; i < n; ++i) {
        if (tween1[i].name === name) {
          tween1[i] = t;
          break;
        }
      }
      if (i === n)
        tween1.push(t);
    }
    schedule2.tween = tween1;
  };
}
function transition_tween(name, value) {
  var id2 = this._id;
  name += "";
  if (arguments.length < 2) {
    var tween = get(this.node(), id2).tween;
    for (var i = 0, n = tween.length, t; i < n; ++i) {
      if ((t = tween[i]).name === name) {
        return t.value;
      }
    }
    return null;
  }
  return this.each((value == null ? tweenRemove : tweenFunction)(id2, name, value));
}
function tweenValue(transition, name, value) {
  var id2 = transition._id;
  transition.each(function() {
    var schedule2 = set(this, id2);
    (schedule2.value || (schedule2.value = {}))[name] = value.apply(this, arguments);
  });
  return function(node) {
    return get(node, id2).value[name];
  };
}
function interpolate(a, b) {
  var c;
  return (typeof b === "number" ? interpolateNumber : b instanceof color ? interpolateRgb : (c = color(b)) ? (b = c, interpolateRgb) : interpolateString)(a, b);
}
function attrRemove(name) {
  return function() {
    this.removeAttribute(name);
  };
}
function attrRemoveNS(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}
function attrConstant(name, interpolate2, value1) {
  var string00, string1 = value1 + "", interpolate0;
  return function() {
    var string0 = this.getAttribute(name);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate2(string00 = string0, value1);
  };
}
function attrConstantNS(fullname, interpolate2, value1) {
  var string00, string1 = value1 + "", interpolate0;
  return function() {
    var string0 = this.getAttributeNS(fullname.space, fullname.local);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate2(string00 = string0, value1);
  };
}
function attrFunction(name, interpolate2, value) {
  var string00, string10, interpolate0;
  return function() {
    var string0, value1 = value(this), string1;
    if (value1 == null)
      return void this.removeAttribute(name);
    string0 = this.getAttribute(name);
    string1 = value1 + "";
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate2(string00 = string0, value1));
  };
}
function attrFunctionNS(fullname, interpolate2, value) {
  var string00, string10, interpolate0;
  return function() {
    var string0, value1 = value(this), string1;
    if (value1 == null)
      return void this.removeAttributeNS(fullname.space, fullname.local);
    string0 = this.getAttributeNS(fullname.space, fullname.local);
    string1 = value1 + "";
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate2(string00 = string0, value1));
  };
}
function transition_attr(name, value) {
  var fullname = namespace(name), i = fullname === "transform" ? interpolateTransformSvg : interpolate;
  return this.attrTween(name, typeof value === "function" ? (fullname.local ? attrFunctionNS : attrFunction)(fullname, i, tweenValue(this, "attr." + name, value)) : value == null ? (fullname.local ? attrRemoveNS : attrRemove)(fullname) : (fullname.local ? attrConstantNS : attrConstant)(fullname, i, value));
}
function attrInterpolate(name, i) {
  return function(t) {
    this.setAttribute(name, i.call(this, t));
  };
}
function attrInterpolateNS(fullname, i) {
  return function(t) {
    this.setAttributeNS(fullname.space, fullname.local, i.call(this, t));
  };
}
function attrTweenNS(fullname, value) {
  var t0, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0)
      t0 = (i0 = i) && attrInterpolateNS(fullname, i);
    return t0;
  }
  tween._value = value;
  return tween;
}
function attrTween(name, value) {
  var t0, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0)
      t0 = (i0 = i) && attrInterpolate(name, i);
    return t0;
  }
  tween._value = value;
  return tween;
}
function transition_attrTween(name, value) {
  var key = "attr." + name;
  if (arguments.length < 2)
    return (key = this.tween(key)) && key._value;
  if (value == null)
    return this.tween(key, null);
  if (typeof value !== "function")
    throw new Error();
  var fullname = namespace(name);
  return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value));
}
function delayFunction(id2, value) {
  return function() {
    init(this, id2).delay = +value.apply(this, arguments);
  };
}
function delayConstant(id2, value) {
  return value = +value, function() {
    init(this, id2).delay = value;
  };
}
function transition_delay(value) {
  var id2 = this._id;
  return arguments.length ? this.each((typeof value === "function" ? delayFunction : delayConstant)(id2, value)) : get(this.node(), id2).delay;
}
function durationFunction(id2, value) {
  return function() {
    set(this, id2).duration = +value.apply(this, arguments);
  };
}
function durationConstant(id2, value) {
  return value = +value, function() {
    set(this, id2).duration = value;
  };
}
function transition_duration(value) {
  var id2 = this._id;
  return arguments.length ? this.each((typeof value === "function" ? durationFunction : durationConstant)(id2, value)) : get(this.node(), id2).duration;
}
function easeConstant(id2, value) {
  if (typeof value !== "function")
    throw new Error();
  return function() {
    set(this, id2).ease = value;
  };
}
function transition_ease(value) {
  var id2 = this._id;
  return arguments.length ? this.each(easeConstant(id2, value)) : get(this.node(), id2).ease;
}
function easeVarying(id2, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (typeof v !== "function")
      throw new Error();
    set(this, id2).ease = v;
  };
}
function transition_easeVarying(value) {
  if (typeof value !== "function")
    throw new Error();
  return this.each(easeVarying(this._id, value));
}
function transition_filter(match) {
  if (typeof match !== "function")
    match = matcher(match);
  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }
  return new Transition(subgroups, this._parents, this._name, this._id);
}
function transition_merge(transition) {
  if (transition._id !== this._id)
    throw new Error();
  for (var groups0 = this._groups, groups1 = transition._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }
  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }
  return new Transition(merges, this._parents, this._name, this._id);
}
function start(name) {
  return (name + "").trim().split(/^|\s+/).every(function(t) {
    var i = t.indexOf(".");
    if (i >= 0)
      t = t.slice(0, i);
    return !t || t === "start";
  });
}
function onFunction(id2, name, listener) {
  var on0, on1, sit = start(name) ? init : set;
  return function() {
    var schedule2 = sit(this, id2), on = schedule2.on;
    if (on !== on0)
      (on1 = (on0 = on).copy()).on(name, listener);
    schedule2.on = on1;
  };
}
function transition_on(name, listener) {
  var id2 = this._id;
  return arguments.length < 2 ? get(this.node(), id2).on.on(name) : this.each(onFunction(id2, name, listener));
}
function removeFunction(id2) {
  return function() {
    var parent = this.parentNode;
    for (var i in this.__transition)
      if (+i !== id2)
        return;
    if (parent)
      parent.removeChild(this);
  };
}
function transition_remove() {
  return this.on("end.remove", removeFunction(this._id));
}
function transition_select(select2) {
  var name = this._name, id2 = this._id;
  if (typeof select2 !== "function")
    select2 = selector(select2);
  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select2.call(node, node.__data__, i, group))) {
        if ("__data__" in node)
          subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
        schedule(subgroup[i], name, id2, i, subgroup, get(node, id2));
      }
    }
  }
  return new Transition(subgroups, this._parents, name, id2);
}
function transition_selectAll(select2) {
  var name = this._name, id2 = this._id;
  if (typeof select2 !== "function")
    select2 = selectorAll(select2);
  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        for (var children2 = select2.call(node, node.__data__, i, group), child, inherit2 = get(node, id2), k = 0, l = children2.length; k < l; ++k) {
          if (child = children2[k]) {
            schedule(child, name, id2, k, children2, inherit2);
          }
        }
        subgroups.push(children2);
        parents.push(node);
      }
    }
  }
  return new Transition(subgroups, parents, name, id2);
}
var Selection = selection.prototype.constructor;
function transition_selection() {
  return new Selection(this._groups, this._parents);
}
function styleNull(name, interpolate2) {
  var string00, string10, interpolate0;
  return function() {
    var string0 = styleValue(this, name), string1 = (this.style.removeProperty(name), styleValue(this, name));
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : interpolate0 = interpolate2(string00 = string0, string10 = string1);
  };
}
function styleRemove(name) {
  return function() {
    this.style.removeProperty(name);
  };
}
function styleConstant(name, interpolate2, value1) {
  var string00, string1 = value1 + "", interpolate0;
  return function() {
    var string0 = styleValue(this, name);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate2(string00 = string0, value1);
  };
}
function styleFunction(name, interpolate2, value) {
  var string00, string10, interpolate0;
  return function() {
    var string0 = styleValue(this, name), value1 = value(this), string1 = value1 + "";
    if (value1 == null)
      string1 = value1 = (this.style.removeProperty(name), styleValue(this, name));
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate2(string00 = string0, value1));
  };
}
function styleMaybeRemove(id2, name) {
  var on0, on1, listener0, key = "style." + name, event = "end." + key, remove2;
  return function() {
    var schedule2 = set(this, id2), on = schedule2.on, listener = schedule2.value[key] == null ? remove2 || (remove2 = styleRemove(name)) : void 0;
    if (on !== on0 || listener0 !== listener)
      (on1 = (on0 = on).copy()).on(event, listener0 = listener);
    schedule2.on = on1;
  };
}
function transition_style(name, value, priority) {
  var i = (name += "") === "transform" ? interpolateTransformCss : interpolate;
  return value == null ? this.styleTween(name, styleNull(name, i)).on("end.style." + name, styleRemove(name)) : typeof value === "function" ? this.styleTween(name, styleFunction(name, i, tweenValue(this, "style." + name, value))).each(styleMaybeRemove(this._id, name)) : this.styleTween(name, styleConstant(name, i, value), priority).on("end.style." + name, null);
}
function styleInterpolate(name, i, priority) {
  return function(t) {
    this.style.setProperty(name, i.call(this, t), priority);
  };
}
function styleTween(name, value, priority) {
  var t, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0)
      t = (i0 = i) && styleInterpolate(name, i, priority);
    return t;
  }
  tween._value = value;
  return tween;
}
function transition_styleTween(name, value, priority) {
  var key = "style." + (name += "");
  if (arguments.length < 2)
    return (key = this.tween(key)) && key._value;
  if (value == null)
    return this.tween(key, null);
  if (typeof value !== "function")
    throw new Error();
  return this.tween(key, styleTween(name, value, priority == null ? "" : priority));
}
function textConstant(value) {
  return function() {
    this.textContent = value;
  };
}
function textFunction(value) {
  return function() {
    var value1 = value(this);
    this.textContent = value1 == null ? "" : value1;
  };
}
function transition_text(value) {
  return this.tween("text", typeof value === "function" ? textFunction(tweenValue(this, "text", value)) : textConstant(value == null ? "" : value + ""));
}
function textInterpolate(i) {
  return function(t) {
    this.textContent = i.call(this, t);
  };
}
function textTween(value) {
  var t0, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0)
      t0 = (i0 = i) && textInterpolate(i);
    return t0;
  }
  tween._value = value;
  return tween;
}
function transition_textTween(value) {
  var key = "text";
  if (arguments.length < 1)
    return (key = this.tween(key)) && key._value;
  if (value == null)
    return this.tween(key, null);
  if (typeof value !== "function")
    throw new Error();
  return this.tween(key, textTween(value));
}
function transition_transition() {
  var name = this._name, id0 = this._id, id1 = newId();
  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        var inherit2 = get(node, id0);
        schedule(node, name, id1, i, group, {
          time: inherit2.time + inherit2.delay + inherit2.duration,
          delay: 0,
          duration: inherit2.duration,
          ease: inherit2.ease
        });
      }
    }
  }
  return new Transition(groups, this._parents, name, id1);
}
function transition_end() {
  var on0, on1, that = this, id2 = that._id, size = that.size();
  return new Promise(function(resolve, reject) {
    var cancel = { value: reject }, end = { value: function() {
      if (--size === 0)
        resolve();
    } };
    that.each(function() {
      var schedule2 = set(this, id2), on = schedule2.on;
      if (on !== on0) {
        on1 = (on0 = on).copy();
        on1._.cancel.push(cancel);
        on1._.interrupt.push(cancel);
        on1._.end.push(end);
      }
      schedule2.on = on1;
    });
    if (size === 0)
      resolve();
  });
}
var id = 0;
function Transition(groups, parents, name, id2) {
  this._groups = groups;
  this._parents = parents;
  this._name = name;
  this._id = id2;
}
function newId() {
  return ++id;
}
var selection_prototype = selection.prototype;
Transition.prototype = {
  constructor: Transition,
  select: transition_select,
  selectAll: transition_selectAll,
  selectChild: selection_prototype.selectChild,
  selectChildren: selection_prototype.selectChildren,
  filter: transition_filter,
  merge: transition_merge,
  selection: transition_selection,
  transition: transition_transition,
  call: selection_prototype.call,
  nodes: selection_prototype.nodes,
  node: selection_prototype.node,
  size: selection_prototype.size,
  empty: selection_prototype.empty,
  each: selection_prototype.each,
  on: transition_on,
  attr: transition_attr,
  attrTween: transition_attrTween,
  style: transition_style,
  styleTween: transition_styleTween,
  text: transition_text,
  textTween: transition_textTween,
  remove: transition_remove,
  tween: transition_tween,
  delay: transition_delay,
  duration: transition_duration,
  ease: transition_ease,
  easeVarying: transition_easeVarying,
  end: transition_end,
  [Symbol.iterator]: selection_prototype[Symbol.iterator]
};
function cubicInOut(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var defaultTiming = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: cubicInOut
};
function inherit(node, id2) {
  var timing;
  while (!(timing = node.__transition) || !(timing = timing[id2])) {
    if (!(node = node.parentNode)) {
      throw new Error(`transition ${id2} not found`);
    }
  }
  return timing;
}
function selection_transition(name) {
  var id2, timing;
  if (name instanceof Transition) {
    id2 = name._id, name = name._name;
  } else {
    id2 = newId(), (timing = defaultTiming).time = now(), name = name == null ? null : name + "";
  }
  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        schedule(node, name, id2, i, group, timing || inherit(node, id2));
      }
    }
  }
  return new Transition(groups, this._parents, name, id2);
}
selection.prototype.interrupt = selection_interrupt;
selection.prototype.transition = selection_transition;
function Transform(k, x, y) {
  this.k = k;
  this.x = x;
  this.y = y;
}
Transform.prototype = {
  constructor: Transform,
  scale: function(k) {
    return k === 1 ? this : new Transform(this.k * k, this.x, this.y);
  },
  translate: function(x, y) {
    return x === 0 & y === 0 ? this : new Transform(this.k, this.x + this.k * x, this.y + this.k * y);
  },
  apply: function(point) {
    return [point[0] * this.k + this.x, point[1] * this.k + this.y];
  },
  applyX: function(x) {
    return x * this.k + this.x;
  },
  applyY: function(y) {
    return y * this.k + this.y;
  },
  invert: function(location) {
    return [(location[0] - this.x) / this.k, (location[1] - this.y) / this.k];
  },
  invertX: function(x) {
    return (x - this.x) / this.k;
  },
  invertY: function(y) {
    return (y - this.y) / this.k;
  },
  rescaleX: function(x) {
    return x.copy().domain(x.range().map(this.invertX, this).map(x.invert, x));
  },
  rescaleY: function(y) {
    return y.copy().domain(y.range().map(this.invertY, this).map(y.invert, y));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};
Transform.prototype;
/*! @license DOMPurify 2.4.3 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/2.4.3/LICENSE */
function _typeof(obj) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof(obj);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf(o, p);
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct2(Parent2, args2, Class2) {
      var a = [null];
      a.push.apply(a, args2);
      var Constructor = Function.bind.apply(Parent2, a);
      var instance = new Constructor();
      if (Class2)
        _setPrototypeOf(instance, Class2.prototype);
      return instance;
    };
  }
  return _construct.apply(null, arguments);
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray(arr);
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
var hasOwnProperty = Object.hasOwnProperty, setPrototypeOf = Object.setPrototypeOf, isFrozen = Object.isFrozen, getPrototypeOf = Object.getPrototypeOf, getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var freeze = Object.freeze, seal = Object.seal, create = Object.create;
var _ref = typeof Reflect !== "undefined" && Reflect, apply = _ref.apply, construct = _ref.construct;
if (!apply) {
  apply = function apply2(fun, thisValue, args) {
    return fun.apply(thisValue, args);
  };
}
if (!freeze) {
  freeze = function freeze2(x) {
    return x;
  };
}
if (!seal) {
  seal = function seal2(x) {
    return x;
  };
}
if (!construct) {
  construct = function construct2(Func, args) {
    return _construct(Func, _toConsumableArray(args));
  };
}
var arrayForEach = unapply(Array.prototype.forEach);
var arrayPop = unapply(Array.prototype.pop);
var arrayPush = unapply(Array.prototype.push);
var stringToLowerCase = unapply(String.prototype.toLowerCase);
var stringToString = unapply(String.prototype.toString);
var stringMatch = unapply(String.prototype.match);
var stringReplace = unapply(String.prototype.replace);
var stringIndexOf = unapply(String.prototype.indexOf);
var stringTrim = unapply(String.prototype.trim);
var regExpTest = unapply(RegExp.prototype.test);
var typeErrorCreate = unconstruct(TypeError);
function unapply(func) {
  return function(thisArg) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    return apply(func, thisArg, args);
  };
}
function unconstruct(func) {
  return function() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    return construct(func, args);
  };
}
function addToSet(set2, array2, transformCaseFunc) {
  transformCaseFunc = transformCaseFunc ? transformCaseFunc : stringToLowerCase;
  if (setPrototypeOf) {
    setPrototypeOf(set2, null);
  }
  var l = array2.length;
  while (l--) {
    var element = array2[l];
    if (typeof element === "string") {
      var lcElement = transformCaseFunc(element);
      if (lcElement !== element) {
        if (!isFrozen(array2)) {
          array2[l] = lcElement;
        }
        element = lcElement;
      }
    }
    set2[element] = true;
  }
  return set2;
}
function clone(object) {
  var newObject = create(null);
  var property;
  for (property in object) {
    if (apply(hasOwnProperty, object, [property]) === true) {
      newObject[property] = object[property];
    }
  }
  return newObject;
}
function lookupGetter(object, prop) {
  while (object !== null) {
    var desc = getOwnPropertyDescriptor(object, prop);
    if (desc) {
      if (desc.get) {
        return unapply(desc.get);
      }
      if (typeof desc.value === "function") {
        return unapply(desc.value);
      }
    }
    object = getPrototypeOf(object);
  }
  function fallbackValue(element) {
    console.warn("fallback value for", element);
    return null;
  }
  return fallbackValue;
}
var html$1 = freeze(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "section", "select", "shadow", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]);
var svg$1 = freeze(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]);
var svgFilters = freeze(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]);
var svgDisallowed = freeze(["animate", "color-profile", "cursor", "discard", "fedropshadow", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]);
var mathMl$1 = freeze(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover"]);
var mathMlDisallowed = freeze(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]);
var text = freeze(["#text"]);
var html = freeze(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "pattern", "placeholder", "playsinline", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "xmlns", "slot"]);
var svg = freeze(["accent-height", "accumulate", "additive", "alignment-baseline", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]);
var mathMl = freeze(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]);
var xml = freeze(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]);
var MUSTACHE_EXPR = seal(/\{\{[\w\W]*|[\w\W]*\}\}/gm);
var ERB_EXPR = seal(/<%[\w\W]*|[\w\W]*%>/gm);
var TMPLIT_EXPR = seal(/\${[\w\W]*}/gm);
var DATA_ATTR = seal(/^data-[\-\w.\u00B7-\uFFFF]/);
var ARIA_ATTR = seal(/^aria-[\-\w]+$/);
var IS_ALLOWED_URI = seal(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
);
var IS_SCRIPT_OR_DATA = seal(/^(?:\w+script|data):/i);
var ATTR_WHITESPACE = seal(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
);
var DOCTYPE_NAME = seal(/^html$/i);
var getGlobal = function getGlobal2() {
  return typeof window === "undefined" ? null : window;
};
var _createTrustedTypesPolicy = function _createTrustedTypesPolicy2(trustedTypes, document2) {
  if (_typeof(trustedTypes) !== "object" || typeof trustedTypes.createPolicy !== "function") {
    return null;
  }
  var suffix = null;
  var ATTR_NAME = "data-tt-policy-suffix";
  if (document2.currentScript && document2.currentScript.hasAttribute(ATTR_NAME)) {
    suffix = document2.currentScript.getAttribute(ATTR_NAME);
  }
  var policyName = "dompurify" + (suffix ? "#" + suffix : "");
  try {
    return trustedTypes.createPolicy(policyName, {
      createHTML: function createHTML(html2) {
        return html2;
      },
      createScriptURL: function createScriptURL(scriptUrl) {
        return scriptUrl;
      }
    });
  } catch (_2) {
    console.warn("TrustedTypes policy " + policyName + " could not be created.");
    return null;
  }
};
function createDOMPurify() {
  var window2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : getGlobal();
  var DOMPurify = function DOMPurify2(root2) {
    return createDOMPurify(root2);
  };
  DOMPurify.version = "2.4.3";
  DOMPurify.removed = [];
  if (!window2 || !window2.document || window2.document.nodeType !== 9) {
    DOMPurify.isSupported = false;
    return DOMPurify;
  }
  var originalDocument = window2.document;
  var document2 = window2.document;
  var DocumentFragment = window2.DocumentFragment, HTMLTemplateElement = window2.HTMLTemplateElement, Node = window2.Node, Element = window2.Element, NodeFilter = window2.NodeFilter, _window$NamedNodeMap = window2.NamedNodeMap, NamedNodeMap = _window$NamedNodeMap === void 0 ? window2.NamedNodeMap || window2.MozNamedAttrMap : _window$NamedNodeMap, HTMLFormElement = window2.HTMLFormElement, DOMParser = window2.DOMParser, trustedTypes = window2.trustedTypes;
  var ElementPrototype = Element.prototype;
  var cloneNode = lookupGetter(ElementPrototype, "cloneNode");
  var getNextSibling = lookupGetter(ElementPrototype, "nextSibling");
  var getChildNodes = lookupGetter(ElementPrototype, "childNodes");
  var getParentNode = lookupGetter(ElementPrototype, "parentNode");
  if (typeof HTMLTemplateElement === "function") {
    var template = document2.createElement("template");
    if (template.content && template.content.ownerDocument) {
      document2 = template.content.ownerDocument;
    }
  }
  var trustedTypesPolicy = _createTrustedTypesPolicy(trustedTypes, originalDocument);
  var emptyHTML = trustedTypesPolicy ? trustedTypesPolicy.createHTML("") : "";
  var _document = document2, implementation = _document.implementation, createNodeIterator = _document.createNodeIterator, createDocumentFragment = _document.createDocumentFragment, getElementsByTagName = _document.getElementsByTagName;
  var importNode = originalDocument.importNode;
  var documentMode = {};
  try {
    documentMode = clone(document2).documentMode ? document2.documentMode : {};
  } catch (_2) {
  }
  var hooks = {};
  DOMPurify.isSupported = typeof getParentNode === "function" && implementation && typeof implementation.createHTMLDocument !== "undefined" && documentMode !== 9;
  var MUSTACHE_EXPR$1 = MUSTACHE_EXPR, ERB_EXPR$1 = ERB_EXPR, TMPLIT_EXPR$1 = TMPLIT_EXPR, DATA_ATTR$1 = DATA_ATTR, ARIA_ATTR$1 = ARIA_ATTR, IS_SCRIPT_OR_DATA$1 = IS_SCRIPT_OR_DATA, ATTR_WHITESPACE$1 = ATTR_WHITESPACE;
  var IS_ALLOWED_URI$1 = IS_ALLOWED_URI;
  var ALLOWED_TAGS = null;
  var DEFAULT_ALLOWED_TAGS = addToSet({}, [].concat(_toConsumableArray(html$1), _toConsumableArray(svg$1), _toConsumableArray(svgFilters), _toConsumableArray(mathMl$1), _toConsumableArray(text)));
  var ALLOWED_ATTR = null;
  var DEFAULT_ALLOWED_ATTR = addToSet({}, [].concat(_toConsumableArray(html), _toConsumableArray(svg), _toConsumableArray(mathMl), _toConsumableArray(xml)));
  var CUSTOM_ELEMENT_HANDLING = Object.seal(Object.create(null, {
    tagNameCheck: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: null
    },
    attributeNameCheck: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: null
    },
    allowCustomizedBuiltInElements: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: false
    }
  }));
  var FORBID_TAGS = null;
  var FORBID_ATTR = null;
  var ALLOW_ARIA_ATTR = true;
  var ALLOW_DATA_ATTR = true;
  var ALLOW_UNKNOWN_PROTOCOLS = false;
  var SAFE_FOR_TEMPLATES = false;
  var WHOLE_DOCUMENT = false;
  var SET_CONFIG = false;
  var FORCE_BODY = false;
  var RETURN_DOM = false;
  var RETURN_DOM_FRAGMENT = false;
  var RETURN_TRUSTED_TYPE = false;
  var SANITIZE_DOM = true;
  var SANITIZE_NAMED_PROPS = false;
  var SANITIZE_NAMED_PROPS_PREFIX = "user-content-";
  var KEEP_CONTENT = true;
  var IN_PLACE = false;
  var USE_PROFILES = {};
  var FORBID_CONTENTS = null;
  var DEFAULT_FORBID_CONTENTS = addToSet({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
  var DATA_URI_TAGS = null;
  var DEFAULT_DATA_URI_TAGS = addToSet({}, ["audio", "video", "img", "source", "image", "track"]);
  var URI_SAFE_ATTRIBUTES = null;
  var DEFAULT_URI_SAFE_ATTRIBUTES = addToSet({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]);
  var MATHML_NAMESPACE = "http://www.w3.org/1998/Math/MathML";
  var SVG_NAMESPACE = "http://www.w3.org/2000/svg";
  var HTML_NAMESPACE = "http://www.w3.org/1999/xhtml";
  var NAMESPACE = HTML_NAMESPACE;
  var IS_EMPTY_INPUT = false;
  var ALLOWED_NAMESPACES = null;
  var DEFAULT_ALLOWED_NAMESPACES = addToSet({}, [MATHML_NAMESPACE, SVG_NAMESPACE, HTML_NAMESPACE], stringToString);
  var PARSER_MEDIA_TYPE;
  var SUPPORTED_PARSER_MEDIA_TYPES = ["application/xhtml+xml", "text/html"];
  var DEFAULT_PARSER_MEDIA_TYPE = "text/html";
  var transformCaseFunc;
  var CONFIG = null;
  var formElement = document2.createElement("form");
  var isRegexOrFunction = function isRegexOrFunction2(testValue) {
    return testValue instanceof RegExp || testValue instanceof Function;
  };
  var _parseConfig = function _parseConfig2(cfg) {
    if (CONFIG && CONFIG === cfg) {
      return;
    }
    if (!cfg || _typeof(cfg) !== "object") {
      cfg = {};
    }
    cfg = clone(cfg);
    PARSER_MEDIA_TYPE = // eslint-disable-next-line unicorn/prefer-includes
    SUPPORTED_PARSER_MEDIA_TYPES.indexOf(cfg.PARSER_MEDIA_TYPE) === -1 ? PARSER_MEDIA_TYPE = DEFAULT_PARSER_MEDIA_TYPE : PARSER_MEDIA_TYPE = cfg.PARSER_MEDIA_TYPE;
    transformCaseFunc = PARSER_MEDIA_TYPE === "application/xhtml+xml" ? stringToString : stringToLowerCase;
    ALLOWED_TAGS = "ALLOWED_TAGS" in cfg ? addToSet({}, cfg.ALLOWED_TAGS, transformCaseFunc) : DEFAULT_ALLOWED_TAGS;
    ALLOWED_ATTR = "ALLOWED_ATTR" in cfg ? addToSet({}, cfg.ALLOWED_ATTR, transformCaseFunc) : DEFAULT_ALLOWED_ATTR;
    ALLOWED_NAMESPACES = "ALLOWED_NAMESPACES" in cfg ? addToSet({}, cfg.ALLOWED_NAMESPACES, stringToString) : DEFAULT_ALLOWED_NAMESPACES;
    URI_SAFE_ATTRIBUTES = "ADD_URI_SAFE_ATTR" in cfg ? addToSet(
      clone(DEFAULT_URI_SAFE_ATTRIBUTES),
      // eslint-disable-line indent
      cfg.ADD_URI_SAFE_ATTR,
      // eslint-disable-line indent
      transformCaseFunc
      // eslint-disable-line indent
    ) : DEFAULT_URI_SAFE_ATTRIBUTES;
    DATA_URI_TAGS = "ADD_DATA_URI_TAGS" in cfg ? addToSet(
      clone(DEFAULT_DATA_URI_TAGS),
      // eslint-disable-line indent
      cfg.ADD_DATA_URI_TAGS,
      // eslint-disable-line indent
      transformCaseFunc
      // eslint-disable-line indent
    ) : DEFAULT_DATA_URI_TAGS;
    FORBID_CONTENTS = "FORBID_CONTENTS" in cfg ? addToSet({}, cfg.FORBID_CONTENTS, transformCaseFunc) : DEFAULT_FORBID_CONTENTS;
    FORBID_TAGS = "FORBID_TAGS" in cfg ? addToSet({}, cfg.FORBID_TAGS, transformCaseFunc) : {};
    FORBID_ATTR = "FORBID_ATTR" in cfg ? addToSet({}, cfg.FORBID_ATTR, transformCaseFunc) : {};
    USE_PROFILES = "USE_PROFILES" in cfg ? cfg.USE_PROFILES : false;
    ALLOW_ARIA_ATTR = cfg.ALLOW_ARIA_ATTR !== false;
    ALLOW_DATA_ATTR = cfg.ALLOW_DATA_ATTR !== false;
    ALLOW_UNKNOWN_PROTOCOLS = cfg.ALLOW_UNKNOWN_PROTOCOLS || false;
    SAFE_FOR_TEMPLATES = cfg.SAFE_FOR_TEMPLATES || false;
    WHOLE_DOCUMENT = cfg.WHOLE_DOCUMENT || false;
    RETURN_DOM = cfg.RETURN_DOM || false;
    RETURN_DOM_FRAGMENT = cfg.RETURN_DOM_FRAGMENT || false;
    RETURN_TRUSTED_TYPE = cfg.RETURN_TRUSTED_TYPE || false;
    FORCE_BODY = cfg.FORCE_BODY || false;
    SANITIZE_DOM = cfg.SANITIZE_DOM !== false;
    SANITIZE_NAMED_PROPS = cfg.SANITIZE_NAMED_PROPS || false;
    KEEP_CONTENT = cfg.KEEP_CONTENT !== false;
    IN_PLACE = cfg.IN_PLACE || false;
    IS_ALLOWED_URI$1 = cfg.ALLOWED_URI_REGEXP || IS_ALLOWED_URI$1;
    NAMESPACE = cfg.NAMESPACE || HTML_NAMESPACE;
    if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck)) {
      CUSTOM_ELEMENT_HANDLING.tagNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck;
    }
    if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)) {
      CUSTOM_ELEMENT_HANDLING.attributeNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck;
    }
    if (cfg.CUSTOM_ELEMENT_HANDLING && typeof cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements === "boolean") {
      CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements = cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements;
    }
    if (SAFE_FOR_TEMPLATES) {
      ALLOW_DATA_ATTR = false;
    }
    if (RETURN_DOM_FRAGMENT) {
      RETURN_DOM = true;
    }
    if (USE_PROFILES) {
      ALLOWED_TAGS = addToSet({}, _toConsumableArray(text));
      ALLOWED_ATTR = [];
      if (USE_PROFILES.html === true) {
        addToSet(ALLOWED_TAGS, html$1);
        addToSet(ALLOWED_ATTR, html);
      }
      if (USE_PROFILES.svg === true) {
        addToSet(ALLOWED_TAGS, svg$1);
        addToSet(ALLOWED_ATTR, svg);
        addToSet(ALLOWED_ATTR, xml);
      }
      if (USE_PROFILES.svgFilters === true) {
        addToSet(ALLOWED_TAGS, svgFilters);
        addToSet(ALLOWED_ATTR, svg);
        addToSet(ALLOWED_ATTR, xml);
      }
      if (USE_PROFILES.mathMl === true) {
        addToSet(ALLOWED_TAGS, mathMl$1);
        addToSet(ALLOWED_ATTR, mathMl);
        addToSet(ALLOWED_ATTR, xml);
      }
    }
    if (cfg.ADD_TAGS) {
      if (ALLOWED_TAGS === DEFAULT_ALLOWED_TAGS) {
        ALLOWED_TAGS = clone(ALLOWED_TAGS);
      }
      addToSet(ALLOWED_TAGS, cfg.ADD_TAGS, transformCaseFunc);
    }
    if (cfg.ADD_ATTR) {
      if (ALLOWED_ATTR === DEFAULT_ALLOWED_ATTR) {
        ALLOWED_ATTR = clone(ALLOWED_ATTR);
      }
      addToSet(ALLOWED_ATTR, cfg.ADD_ATTR, transformCaseFunc);
    }
    if (cfg.ADD_URI_SAFE_ATTR) {
      addToSet(URI_SAFE_ATTRIBUTES, cfg.ADD_URI_SAFE_ATTR, transformCaseFunc);
    }
    if (cfg.FORBID_CONTENTS) {
      if (FORBID_CONTENTS === DEFAULT_FORBID_CONTENTS) {
        FORBID_CONTENTS = clone(FORBID_CONTENTS);
      }
      addToSet(FORBID_CONTENTS, cfg.FORBID_CONTENTS, transformCaseFunc);
    }
    if (KEEP_CONTENT) {
      ALLOWED_TAGS["#text"] = true;
    }
    if (WHOLE_DOCUMENT) {
      addToSet(ALLOWED_TAGS, ["html", "head", "body"]);
    }
    if (ALLOWED_TAGS.table) {
      addToSet(ALLOWED_TAGS, ["tbody"]);
      delete FORBID_TAGS.tbody;
    }
    if (freeze) {
      freeze(cfg);
    }
    CONFIG = cfg;
  };
  var MATHML_TEXT_INTEGRATION_POINTS = addToSet({}, ["mi", "mo", "mn", "ms", "mtext"]);
  var HTML_INTEGRATION_POINTS = addToSet({}, ["foreignobject", "desc", "title", "annotation-xml"]);
  var COMMON_SVG_AND_HTML_ELEMENTS = addToSet({}, ["title", "style", "font", "a", "script"]);
  var ALL_SVG_TAGS = addToSet({}, svg$1);
  addToSet(ALL_SVG_TAGS, svgFilters);
  addToSet(ALL_SVG_TAGS, svgDisallowed);
  var ALL_MATHML_TAGS = addToSet({}, mathMl$1);
  addToSet(ALL_MATHML_TAGS, mathMlDisallowed);
  var _checkValidNamespace = function _checkValidNamespace2(element) {
    var parent = getParentNode(element);
    if (!parent || !parent.tagName) {
      parent = {
        namespaceURI: NAMESPACE,
        tagName: "template"
      };
    }
    var tagName = stringToLowerCase(element.tagName);
    var parentTagName = stringToLowerCase(parent.tagName);
    if (!ALLOWED_NAMESPACES[element.namespaceURI]) {
      return false;
    }
    if (element.namespaceURI === SVG_NAMESPACE) {
      if (parent.namespaceURI === HTML_NAMESPACE) {
        return tagName === "svg";
      }
      if (parent.namespaceURI === MATHML_NAMESPACE) {
        return tagName === "svg" && (parentTagName === "annotation-xml" || MATHML_TEXT_INTEGRATION_POINTS[parentTagName]);
      }
      return Boolean(ALL_SVG_TAGS[tagName]);
    }
    if (element.namespaceURI === MATHML_NAMESPACE) {
      if (parent.namespaceURI === HTML_NAMESPACE) {
        return tagName === "math";
      }
      if (parent.namespaceURI === SVG_NAMESPACE) {
        return tagName === "math" && HTML_INTEGRATION_POINTS[parentTagName];
      }
      return Boolean(ALL_MATHML_TAGS[tagName]);
    }
    if (element.namespaceURI === HTML_NAMESPACE) {
      if (parent.namespaceURI === SVG_NAMESPACE && !HTML_INTEGRATION_POINTS[parentTagName]) {
        return false;
      }
      if (parent.namespaceURI === MATHML_NAMESPACE && !MATHML_TEXT_INTEGRATION_POINTS[parentTagName]) {
        return false;
      }
      return !ALL_MATHML_TAGS[tagName] && (COMMON_SVG_AND_HTML_ELEMENTS[tagName] || !ALL_SVG_TAGS[tagName]);
    }
    if (PARSER_MEDIA_TYPE === "application/xhtml+xml" && ALLOWED_NAMESPACES[element.namespaceURI]) {
      return true;
    }
    return false;
  };
  var _forceRemove = function _forceRemove2(node) {
    arrayPush(DOMPurify.removed, {
      element: node
    });
    try {
      node.parentNode.removeChild(node);
    } catch (_2) {
      try {
        node.outerHTML = emptyHTML;
      } catch (_3) {
        node.remove();
      }
    }
  };
  var _removeAttribute = function _removeAttribute2(name, node) {
    try {
      arrayPush(DOMPurify.removed, {
        attribute: node.getAttributeNode(name),
        from: node
      });
    } catch (_2) {
      arrayPush(DOMPurify.removed, {
        attribute: null,
        from: node
      });
    }
    node.removeAttribute(name);
    if (name === "is" && !ALLOWED_ATTR[name]) {
      if (RETURN_DOM || RETURN_DOM_FRAGMENT) {
        try {
          _forceRemove(node);
        } catch (_2) {
        }
      } else {
        try {
          node.setAttribute(name, "");
        } catch (_2) {
        }
      }
    }
  };
  var _initDocument = function _initDocument2(dirty) {
    var doc;
    var leadingWhitespace;
    if (FORCE_BODY) {
      dirty = "<remove></remove>" + dirty;
    } else {
      var matches = stringMatch(dirty, /^[\r\n\t ]+/);
      leadingWhitespace = matches && matches[0];
    }
    if (PARSER_MEDIA_TYPE === "application/xhtml+xml" && NAMESPACE === HTML_NAMESPACE) {
      dirty = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + dirty + "</body></html>";
    }
    var dirtyPayload = trustedTypesPolicy ? trustedTypesPolicy.createHTML(dirty) : dirty;
    if (NAMESPACE === HTML_NAMESPACE) {
      try {
        doc = new DOMParser().parseFromString(dirtyPayload, PARSER_MEDIA_TYPE);
      } catch (_2) {
      }
    }
    if (!doc || !doc.documentElement) {
      doc = implementation.createDocument(NAMESPACE, "template", null);
      try {
        doc.documentElement.innerHTML = IS_EMPTY_INPUT ? emptyHTML : dirtyPayload;
      } catch (_2) {
      }
    }
    var body = doc.body || doc.documentElement;
    if (dirty && leadingWhitespace) {
      body.insertBefore(document2.createTextNode(leadingWhitespace), body.childNodes[0] || null);
    }
    if (NAMESPACE === HTML_NAMESPACE) {
      return getElementsByTagName.call(doc, WHOLE_DOCUMENT ? "html" : "body")[0];
    }
    return WHOLE_DOCUMENT ? doc.documentElement : body;
  };
  var _createIterator = function _createIterator2(root2) {
    return createNodeIterator.call(
      root2.ownerDocument || root2,
      root2,
      // eslint-disable-next-line no-bitwise
      NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_TEXT,
      null,
      false
    );
  };
  var _isClobbered = function _isClobbered2(elm) {
    return elm instanceof HTMLFormElement && (typeof elm.nodeName !== "string" || typeof elm.textContent !== "string" || typeof elm.removeChild !== "function" || !(elm.attributes instanceof NamedNodeMap) || typeof elm.removeAttribute !== "function" || typeof elm.setAttribute !== "function" || typeof elm.namespaceURI !== "string" || typeof elm.insertBefore !== "function" || typeof elm.hasChildNodes !== "function");
  };
  var _isNode = function _isNode2(object) {
    return _typeof(Node) === "object" ? object instanceof Node : object && _typeof(object) === "object" && typeof object.nodeType === "number" && typeof object.nodeName === "string";
  };
  var _executeHook = function _executeHook2(entryPoint, currentNode, data) {
    if (!hooks[entryPoint]) {
      return;
    }
    arrayForEach(hooks[entryPoint], function(hook) {
      hook.call(DOMPurify, currentNode, data, CONFIG);
    });
  };
  var _sanitizeElements = function _sanitizeElements2(currentNode) {
    var content;
    _executeHook("beforeSanitizeElements", currentNode, null);
    if (_isClobbered(currentNode)) {
      _forceRemove(currentNode);
      return true;
    }
    if (regExpTest(/[\u0080-\uFFFF]/, currentNode.nodeName)) {
      _forceRemove(currentNode);
      return true;
    }
    var tagName = transformCaseFunc(currentNode.nodeName);
    _executeHook("uponSanitizeElement", currentNode, {
      tagName,
      allowedTags: ALLOWED_TAGS
    });
    if (currentNode.hasChildNodes() && !_isNode(currentNode.firstElementChild) && (!_isNode(currentNode.content) || !_isNode(currentNode.content.firstElementChild)) && regExpTest(/<[/\w]/g, currentNode.innerHTML) && regExpTest(/<[/\w]/g, currentNode.textContent)) {
      _forceRemove(currentNode);
      return true;
    }
    if (tagName === "select" && regExpTest(/<template/i, currentNode.innerHTML)) {
      _forceRemove(currentNode);
      return true;
    }
    if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
      if (!FORBID_TAGS[tagName] && _basicCustomElementTest(tagName)) {
        if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, tagName))
          return false;
        if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(tagName))
          return false;
      }
      if (KEEP_CONTENT && !FORBID_CONTENTS[tagName]) {
        var parentNode = getParentNode(currentNode) || currentNode.parentNode;
        var childNodes = getChildNodes(currentNode) || currentNode.childNodes;
        if (childNodes && parentNode) {
          var childCount = childNodes.length;
          for (var i = childCount - 1; i >= 0; --i) {
            parentNode.insertBefore(cloneNode(childNodes[i], true), getNextSibling(currentNode));
          }
        }
      }
      _forceRemove(currentNode);
      return true;
    }
    if (currentNode instanceof Element && !_checkValidNamespace(currentNode)) {
      _forceRemove(currentNode);
      return true;
    }
    if ((tagName === "noscript" || tagName === "noembed") && regExpTest(/<\/no(script|embed)/i, currentNode.innerHTML)) {
      _forceRemove(currentNode);
      return true;
    }
    if (SAFE_FOR_TEMPLATES && currentNode.nodeType === 3) {
      content = currentNode.textContent;
      content = stringReplace(content, MUSTACHE_EXPR$1, " ");
      content = stringReplace(content, ERB_EXPR$1, " ");
      content = stringReplace(content, TMPLIT_EXPR$1, " ");
      if (currentNode.textContent !== content) {
        arrayPush(DOMPurify.removed, {
          element: currentNode.cloneNode()
        });
        currentNode.textContent = content;
      }
    }
    _executeHook("afterSanitizeElements", currentNode, null);
    return false;
  };
  var _isValidAttribute = function _isValidAttribute2(lcTag, lcName, value) {
    if (SANITIZE_DOM && (lcName === "id" || lcName === "name") && (value in document2 || value in formElement)) {
      return false;
    }
    if (ALLOW_DATA_ATTR && !FORBID_ATTR[lcName] && regExpTest(DATA_ATTR$1, lcName))
      ;
    else if (ALLOW_ARIA_ATTR && regExpTest(ARIA_ATTR$1, lcName))
      ;
    else if (!ALLOWED_ATTR[lcName] || FORBID_ATTR[lcName]) {
      if (
        // First condition does a very basic check if a) it's basically a valid custom element tagname AND
        // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
        // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
        _basicCustomElementTest(lcTag) && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, lcTag) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(lcTag)) && (CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.attributeNameCheck, lcName) || CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.attributeNameCheck(lcName)) || // Alternative, second condition checks if it's an `is`-attribute, AND
        // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
        lcName === "is" && CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, value) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(value))
      )
        ;
      else {
        return false;
      }
    } else if (URI_SAFE_ATTRIBUTES[lcName])
      ;
    else if (regExpTest(IS_ALLOWED_URI$1, stringReplace(value, ATTR_WHITESPACE$1, "")))
      ;
    else if ((lcName === "src" || lcName === "xlink:href" || lcName === "href") && lcTag !== "script" && stringIndexOf(value, "data:") === 0 && DATA_URI_TAGS[lcTag])
      ;
    else if (ALLOW_UNKNOWN_PROTOCOLS && !regExpTest(IS_SCRIPT_OR_DATA$1, stringReplace(value, ATTR_WHITESPACE$1, "")))
      ;
    else if (!value)
      ;
    else {
      return false;
    }
    return true;
  };
  var _basicCustomElementTest = function _basicCustomElementTest2(tagName) {
    return tagName.indexOf("-") > 0;
  };
  var _sanitizeAttributes = function _sanitizeAttributes2(currentNode) {
    var attr;
    var value;
    var lcName;
    var l;
    _executeHook("beforeSanitizeAttributes", currentNode, null);
    var attributes = currentNode.attributes;
    if (!attributes) {
      return;
    }
    var hookEvent = {
      attrName: "",
      attrValue: "",
      keepAttr: true,
      allowedAttributes: ALLOWED_ATTR
    };
    l = attributes.length;
    while (l--) {
      attr = attributes[l];
      var _attr = attr, name = _attr.name, namespaceURI = _attr.namespaceURI;
      value = name === "value" ? attr.value : stringTrim(attr.value);
      lcName = transformCaseFunc(name);
      hookEvent.attrName = lcName;
      hookEvent.attrValue = value;
      hookEvent.keepAttr = true;
      hookEvent.forceKeepAttr = void 0;
      _executeHook("uponSanitizeAttribute", currentNode, hookEvent);
      value = hookEvent.attrValue;
      if (hookEvent.forceKeepAttr) {
        continue;
      }
      _removeAttribute(name, currentNode);
      if (!hookEvent.keepAttr) {
        continue;
      }
      if (regExpTest(/\/>/i, value)) {
        _removeAttribute(name, currentNode);
        continue;
      }
      if (SAFE_FOR_TEMPLATES) {
        value = stringReplace(value, MUSTACHE_EXPR$1, " ");
        value = stringReplace(value, ERB_EXPR$1, " ");
        value = stringReplace(value, TMPLIT_EXPR$1, " ");
      }
      var lcTag = transformCaseFunc(currentNode.nodeName);
      if (!_isValidAttribute(lcTag, lcName, value)) {
        continue;
      }
      if (SANITIZE_NAMED_PROPS && (lcName === "id" || lcName === "name")) {
        _removeAttribute(name, currentNode);
        value = SANITIZE_NAMED_PROPS_PREFIX + value;
      }
      if (trustedTypesPolicy && _typeof(trustedTypes) === "object" && typeof trustedTypes.getAttributeType === "function") {
        if (namespaceURI)
          ;
        else {
          switch (trustedTypes.getAttributeType(lcTag, lcName)) {
            case "TrustedHTML":
              value = trustedTypesPolicy.createHTML(value);
              break;
            case "TrustedScriptURL":
              value = trustedTypesPolicy.createScriptURL(value);
              break;
          }
        }
      }
      try {
        if (namespaceURI) {
          currentNode.setAttributeNS(namespaceURI, name, value);
        } else {
          currentNode.setAttribute(name, value);
        }
        arrayPop(DOMPurify.removed);
      } catch (_2) {
      }
    }
    _executeHook("afterSanitizeAttributes", currentNode, null);
  };
  var _sanitizeShadowDOM = function _sanitizeShadowDOM2(fragment) {
    var shadowNode;
    var shadowIterator = _createIterator(fragment);
    _executeHook("beforeSanitizeShadowDOM", fragment, null);
    while (shadowNode = shadowIterator.nextNode()) {
      _executeHook("uponSanitizeShadowNode", shadowNode, null);
      if (_sanitizeElements(shadowNode)) {
        continue;
      }
      if (shadowNode.content instanceof DocumentFragment) {
        _sanitizeShadowDOM2(shadowNode.content);
      }
      _sanitizeAttributes(shadowNode);
    }
    _executeHook("afterSanitizeShadowDOM", fragment, null);
  };
  DOMPurify.sanitize = function(dirty) {
    var cfg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var body;
    var importedNode;
    var currentNode;
    var oldNode;
    var returnNode;
    IS_EMPTY_INPUT = !dirty;
    if (IS_EMPTY_INPUT) {
      dirty = "<!-->";
    }
    if (typeof dirty !== "string" && !_isNode(dirty)) {
      if (typeof dirty.toString !== "function") {
        throw typeErrorCreate("toString is not a function");
      } else {
        dirty = dirty.toString();
        if (typeof dirty !== "string") {
          throw typeErrorCreate("dirty is not a string, aborting");
        }
      }
    }
    if (!DOMPurify.isSupported) {
      if (_typeof(window2.toStaticHTML) === "object" || typeof window2.toStaticHTML === "function") {
        if (typeof dirty === "string") {
          return window2.toStaticHTML(dirty);
        }
        if (_isNode(dirty)) {
          return window2.toStaticHTML(dirty.outerHTML);
        }
      }
      return dirty;
    }
    if (!SET_CONFIG) {
      _parseConfig(cfg);
    }
    DOMPurify.removed = [];
    if (typeof dirty === "string") {
      IN_PLACE = false;
    }
    if (IN_PLACE) {
      if (dirty.nodeName) {
        var tagName = transformCaseFunc(dirty.nodeName);
        if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
          throw typeErrorCreate("root node is forbidden and cannot be sanitized in-place");
        }
      }
    } else if (dirty instanceof Node) {
      body = _initDocument("<!---->");
      importedNode = body.ownerDocument.importNode(dirty, true);
      if (importedNode.nodeType === 1 && importedNode.nodeName === "BODY") {
        body = importedNode;
      } else if (importedNode.nodeName === "HTML") {
        body = importedNode;
      } else {
        body.appendChild(importedNode);
      }
    } else {
      if (!RETURN_DOM && !SAFE_FOR_TEMPLATES && !WHOLE_DOCUMENT && // eslint-disable-next-line unicorn/prefer-includes
      dirty.indexOf("<") === -1) {
        return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(dirty) : dirty;
      }
      body = _initDocument(dirty);
      if (!body) {
        return RETURN_DOM ? null : RETURN_TRUSTED_TYPE ? emptyHTML : "";
      }
    }
    if (body && FORCE_BODY) {
      _forceRemove(body.firstChild);
    }
    var nodeIterator = _createIterator(IN_PLACE ? dirty : body);
    while (currentNode = nodeIterator.nextNode()) {
      if (currentNode.nodeType === 3 && currentNode === oldNode) {
        continue;
      }
      if (_sanitizeElements(currentNode)) {
        continue;
      }
      if (currentNode.content instanceof DocumentFragment) {
        _sanitizeShadowDOM(currentNode.content);
      }
      _sanitizeAttributes(currentNode);
      oldNode = currentNode;
    }
    oldNode = null;
    if (IN_PLACE) {
      return dirty;
    }
    if (RETURN_DOM) {
      if (RETURN_DOM_FRAGMENT) {
        returnNode = createDocumentFragment.call(body.ownerDocument);
        while (body.firstChild) {
          returnNode.appendChild(body.firstChild);
        }
      } else {
        returnNode = body;
      }
      if (ALLOWED_ATTR.shadowroot) {
        returnNode = importNode.call(originalDocument, returnNode, true);
      }
      return returnNode;
    }
    var serializedHTML = WHOLE_DOCUMENT ? body.outerHTML : body.innerHTML;
    if (WHOLE_DOCUMENT && ALLOWED_TAGS["!doctype"] && body.ownerDocument && body.ownerDocument.doctype && body.ownerDocument.doctype.name && regExpTest(DOCTYPE_NAME, body.ownerDocument.doctype.name)) {
      serializedHTML = "<!DOCTYPE " + body.ownerDocument.doctype.name + ">\n" + serializedHTML;
    }
    if (SAFE_FOR_TEMPLATES) {
      serializedHTML = stringReplace(serializedHTML, MUSTACHE_EXPR$1, " ");
      serializedHTML = stringReplace(serializedHTML, ERB_EXPR$1, " ");
      serializedHTML = stringReplace(serializedHTML, TMPLIT_EXPR$1, " ");
    }
    return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(serializedHTML) : serializedHTML;
  };
  DOMPurify.setConfig = function(cfg) {
    _parseConfig(cfg);
    SET_CONFIG = true;
  };
  DOMPurify.clearConfig = function() {
    CONFIG = null;
    SET_CONFIG = false;
  };
  DOMPurify.isValidAttribute = function(tag, attr, value) {
    if (!CONFIG) {
      _parseConfig({});
    }
    var lcTag = transformCaseFunc(tag);
    var lcName = transformCaseFunc(attr);
    return _isValidAttribute(lcTag, lcName, value);
  };
  DOMPurify.addHook = function(entryPoint, hookFunction) {
    if (typeof hookFunction !== "function") {
      return;
    }
    hooks[entryPoint] = hooks[entryPoint] || [];
    arrayPush(hooks[entryPoint], hookFunction);
  };
  DOMPurify.removeHook = function(entryPoint) {
    if (hooks[entryPoint]) {
      return arrayPop(hooks[entryPoint]);
    }
  };
  DOMPurify.removeHooks = function(entryPoint) {
    if (hooks[entryPoint]) {
      hooks[entryPoint] = [];
    }
  };
  DOMPurify.removeAllHooks = function() {
    hooks = {};
  };
  return DOMPurify;
}
var purify = createDOMPurify();
const getRows = (s) => {
  if (!s) {
    return [""];
  }
  const str = breakToPlaceholder(s).replace(/\\n/g, "#br#");
  return str.split("#br#");
};
const removeScript = (txt) => {
  return purify.sanitize(txt);
};
const sanitizeMore = (text2, config2) => {
  var _a;
  if (((_a = config2.flowchart) == null ? void 0 : _a.htmlLabels) !== false) {
    const level = config2.securityLevel;
    if (level === "antiscript" || level === "strict") {
      text2 = removeScript(text2);
    } else if (level !== "loose") {
      text2 = breakToPlaceholder(text2);
      text2 = text2.replace(/</g, "&lt;").replace(/>/g, "&gt;");
      text2 = text2.replace(/=/g, "&equals;");
      text2 = placeholderToBreak(text2);
    }
  }
  return text2;
};
const sanitizeText = (text2, config2) => {
  if (!text2) {
    return text2;
  }
  if (config2.dompurifyConfig) {
    text2 = purify.sanitize(sanitizeMore(text2, config2), config2.dompurifyConfig).toString();
  } else {
    text2 = purify.sanitize(sanitizeMore(text2, config2), {
      FORBID_TAGS: ["style"]
    }).toString();
  }
  return text2;
};
const sanitizeTextOrArray = (a, config2) => {
  if (typeof a === "string") {
    return sanitizeText(a, config2);
  }
  return a.flat().map((x) => sanitizeText(x, config2));
};
const lineBreakRegex = /<br\s*\/?>/gi;
const hasBreaks = (text2) => {
  return lineBreakRegex.test(text2);
};
const splitBreaks = (text2) => {
  return text2.split(lineBreakRegex);
};
const placeholderToBreak = (s) => {
  return s.replace(/#br#/g, "<br/>");
};
const breakToPlaceholder = (s) => {
  return s.replace(lineBreakRegex, "#br#");
};
const getUrl = (useAbsolute) => {
  let url = "";
  if (useAbsolute) {
    url = window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.search;
    url = url.replaceAll(/\(/g, "\\(");
    url = url.replaceAll(/\)/g, "\\)");
  }
  return url;
};
const evaluate = (val) => val === false || ["false", "null", "0"].includes(String(val).trim().toLowerCase()) ? false : true;
const parseGenericTypes = function(text2) {
  let cleanedText = text2;
  if (text2.split("~").length - 1 >= 2) {
    let newCleanedText = cleanedText;
    do {
      cleanedText = newCleanedText;
      newCleanedText = cleanedText.replace(/~([^\s,:;]+)~/, "<$1>");
    } while (newCleanedText != cleanedText);
    return parseGenericTypes(newCleanedText);
  } else {
    return cleanedText;
  }
};
const common = {
  getRows,
  sanitizeText,
  sanitizeTextOrArray,
  hasBreaks,
  splitBreaks,
  lineBreakRegex,
  removeScript,
  getUrl,
  evaluate
};
const Channel = {
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
    r: (r) => r >= 255 ? 255 : r < 0 ? 0 : r,
    g: (g) => g >= 255 ? 255 : g < 0 ? 0 : g,
    b: (b) => b >= 255 ? 255 : b < 0 ? 0 : b,
    h: (h) => h % 360,
    s: (s) => s >= 100 ? 100 : s < 0 ? 0 : s,
    l: (l) => l >= 100 ? 100 : l < 0 ? 0 : l,
    a: (a) => a >= 1 ? 1 : a < 0 ? 0 : a
  },
  /* CONVERSION */
  //SOURCE: https://planetcalc.com/7779
  toLinear: (c) => {
    const n = c / 255;
    return c > 0.03928 ? Math.pow((n + 0.055) / 1.055, 2.4) : n / 12.92;
  },
  //SOURCE: https://gist.github.com/mjackson/5311256
  hue2rgb: (p, q, t) => {
    if (t < 0)
      t += 1;
    if (t > 1)
      t -= 1;
    if (t < 1 / 6)
      return p + (q - p) * 6 * t;
    if (t < 1 / 2)
      return q;
    if (t < 2 / 3)
      return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  },
  hsl2rgb: ({ h, s, l }, channel2) => {
    if (!s)
      return l * 2.55;
    h /= 360;
    s /= 100;
    l /= 100;
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    switch (channel2) {
      case "r":
        return Channel.hue2rgb(p, q, h + 1 / 3) * 255;
      case "g":
        return Channel.hue2rgb(p, q, h) * 255;
      case "b":
        return Channel.hue2rgb(p, q, h - 1 / 3) * 255;
    }
  },
  rgb2hsl: ({ r, g, b }, channel2) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const l = (max + min) / 2;
    if (channel2 === "l")
      return l * 100;
    if (max === min)
      return 0;
    const d = max - min;
    const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (channel2 === "s")
      return s * 100;
    switch (max) {
      case r:
        return ((g - b) / d + (g < b ? 6 : 0)) * 60;
      case g:
        return ((b - r) / d + 2) * 60;
      case b:
        return ((r - g) / d + 4) * 60;
      default:
        return -1;
    }
  }
};
const channel = Channel;
const Lang = {
  /* API */
  clamp: (number, lower2, upper) => {
    if (lower2 > upper)
      return Math.min(lower2, Math.max(upper, number));
    return Math.min(upper, Math.max(lower2, number));
  },
  round: (number) => {
    return Math.round(number * 1e10) / 1e10;
  }
};
const lang = Lang;
const Unit = {
  /* API */
  dec2hex: (dec) => {
    const hex2 = Math.round(dec).toString(16);
    return hex2.length > 1 ? hex2 : `0${hex2}`;
  }
};
const unit = Unit;
const Utils = {
  channel,
  lang,
  unit
};
const _ = Utils;
const DEC2HEX = {};
for (let i = 0; i <= 255; i++)
  DEC2HEX[i] = _.unit.dec2hex(i);
const TYPE = {
  ALL: 0,
  RGB: 1,
  HSL: 2
};
class Type {
  constructor() {
    this.type = TYPE.ALL;
  }
  /* API */
  get() {
    return this.type;
  }
  set(type) {
    if (this.type && this.type !== type)
      throw new Error("Cannot change both RGB and HSL channels at the same time");
    this.type = type;
  }
  reset() {
    this.type = TYPE.ALL;
  }
  is(type) {
    return this.type === type;
  }
}
const Type$1 = Type;
class Channels {
  /* CONSTRUCTOR */
  constructor(data, color2) {
    this.color = color2;
    this.changed = false;
    this.data = data;
    this.type = new Type$1();
  }
  /* API */
  set(data, color2) {
    this.color = color2;
    this.changed = false;
    this.data = data;
    this.type.type = TYPE.ALL;
    return this;
  }
  /* HELPERS */
  _ensureHSL() {
    const data = this.data;
    const { h, s, l } = data;
    if (h === void 0)
      data.h = _.channel.rgb2hsl(data, "h");
    if (s === void 0)
      data.s = _.channel.rgb2hsl(data, "s");
    if (l === void 0)
      data.l = _.channel.rgb2hsl(data, "l");
  }
  _ensureRGB() {
    const data = this.data;
    const { r, g, b } = data;
    if (r === void 0)
      data.r = _.channel.hsl2rgb(data, "r");
    if (g === void 0)
      data.g = _.channel.hsl2rgb(data, "g");
    if (b === void 0)
      data.b = _.channel.hsl2rgb(data, "b");
  }
  /* GETTERS */
  get r() {
    const data = this.data;
    const r = data.r;
    if (!this.type.is(TYPE.HSL) && r !== void 0)
      return r;
    this._ensureHSL();
    return _.channel.hsl2rgb(data, "r");
  }
  get g() {
    const data = this.data;
    const g = data.g;
    if (!this.type.is(TYPE.HSL) && g !== void 0)
      return g;
    this._ensureHSL();
    return _.channel.hsl2rgb(data, "g");
  }
  get b() {
    const data = this.data;
    const b = data.b;
    if (!this.type.is(TYPE.HSL) && b !== void 0)
      return b;
    this._ensureHSL();
    return _.channel.hsl2rgb(data, "b");
  }
  get h() {
    const data = this.data;
    const h = data.h;
    if (!this.type.is(TYPE.RGB) && h !== void 0)
      return h;
    this._ensureRGB();
    return _.channel.rgb2hsl(data, "h");
  }
  get s() {
    const data = this.data;
    const s = data.s;
    if (!this.type.is(TYPE.RGB) && s !== void 0)
      return s;
    this._ensureRGB();
    return _.channel.rgb2hsl(data, "s");
  }
  get l() {
    const data = this.data;
    const l = data.l;
    if (!this.type.is(TYPE.RGB) && l !== void 0)
      return l;
    this._ensureRGB();
    return _.channel.rgb2hsl(data, "l");
  }
  get a() {
    return this.data.a;
  }
  /* SETTERS */
  set r(r) {
    this.type.set(TYPE.RGB);
    this.changed = true;
    this.data.r = r;
  }
  set g(g) {
    this.type.set(TYPE.RGB);
    this.changed = true;
    this.data.g = g;
  }
  set b(b) {
    this.type.set(TYPE.RGB);
    this.changed = true;
    this.data.b = b;
  }
  set h(h) {
    this.type.set(TYPE.HSL);
    this.changed = true;
    this.data.h = h;
  }
  set s(s) {
    this.type.set(TYPE.HSL);
    this.changed = true;
    this.data.s = s;
  }
  set l(l) {
    this.type.set(TYPE.HSL);
    this.changed = true;
    this.data.l = l;
  }
  set a(a) {
    this.changed = true;
    this.data.a = a;
  }
}
const Channels$1 = Channels;
const channels = new Channels$1({ r: 0, g: 0, b: 0, a: 0 }, "transparent");
const ChannelsReusable = channels;
const Hex = {
  /* VARIABLES */
  re: /^#((?:[a-f0-9]{2}){2,4}|[a-f0-9]{3})$/i,
  /* API */
  parse: (color2) => {
    if (color2.charCodeAt(0) !== 35)
      return;
    const match = color2.match(Hex.re);
    if (!match)
      return;
    const hex2 = match[1];
    const dec = parseInt(hex2, 16);
    const length = hex2.length;
    const hasAlpha = length % 4 === 0;
    const isFullLength = length > 4;
    const multiplier = isFullLength ? 1 : 17;
    const bits = isFullLength ? 8 : 4;
    const bitsOffset = hasAlpha ? 0 : -1;
    const mask = isFullLength ? 255 : 15;
    return ChannelsReusable.set({
      r: (dec >> bits * (bitsOffset + 3) & mask) * multiplier,
      g: (dec >> bits * (bitsOffset + 2) & mask) * multiplier,
      b: (dec >> bits * (bitsOffset + 1) & mask) * multiplier,
      a: hasAlpha ? (dec & mask) * multiplier / 255 : 1
    }, color2);
  },
  stringify: (channels2) => {
    const { r, g, b, a } = channels2;
    if (a < 1) {
      return `#${DEC2HEX[Math.round(r)]}${DEC2HEX[Math.round(g)]}${DEC2HEX[Math.round(b)]}${DEC2HEX[Math.round(a * 255)]}`;
    } else {
      return `#${DEC2HEX[Math.round(r)]}${DEC2HEX[Math.round(g)]}${DEC2HEX[Math.round(b)]}`;
    }
  }
};
const Hex$1 = Hex;
const HSL = {
  /* VARIABLES */
  re: /^hsla?\(\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e-?\d+)?(?:deg|grad|rad|turn)?)\s*?(?:,|\s)\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e-?\d+)?%)\s*?(?:,|\s)\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e-?\d+)?%)(?:\s*?(?:,|\/)\s*?\+?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e-?\d+)?(%)?))?\s*?\)$/i,
  hueRe: /^(.+?)(deg|grad|rad|turn)$/i,
  /* HELPERS */
  _hue2deg: (hue2) => {
    const match = hue2.match(HSL.hueRe);
    if (match) {
      const [, number, unit2] = match;
      switch (unit2) {
        case "grad":
          return _.channel.clamp.h(parseFloat(number) * 0.9);
        case "rad":
          return _.channel.clamp.h(parseFloat(number) * 180 / Math.PI);
        case "turn":
          return _.channel.clamp.h(parseFloat(number) * 360);
      }
    }
    return _.channel.clamp.h(parseFloat(hue2));
  },
  /* API */
  parse: (color2) => {
    const charCode = color2.charCodeAt(0);
    if (charCode !== 104 && charCode !== 72)
      return;
    const match = color2.match(HSL.re);
    if (!match)
      return;
    const [, h, s, l, a, isAlphaPercentage] = match;
    return ChannelsReusable.set({
      h: HSL._hue2deg(h),
      s: _.channel.clamp.s(parseFloat(s)),
      l: _.channel.clamp.l(parseFloat(l)),
      a: a ? _.channel.clamp.a(isAlphaPercentage ? parseFloat(a) / 100 : parseFloat(a)) : 1
    }, color2);
  },
  stringify: (channels2) => {
    const { h, s, l, a } = channels2;
    if (a < 1) {
      return `hsla(${_.lang.round(h)}, ${_.lang.round(s)}%, ${_.lang.round(l)}%, ${a})`;
    } else {
      return `hsl(${_.lang.round(h)}, ${_.lang.round(s)}%, ${_.lang.round(l)}%)`;
    }
  }
};
const HSL$1 = HSL;
const Keyword = {
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
  parse: (color2) => {
    color2 = color2.toLowerCase();
    const hex2 = Keyword.colors[color2];
    if (!hex2)
      return;
    return Hex$1.parse(hex2);
  },
  stringify: (channels2) => {
    const hex2 = Hex$1.stringify(channels2);
    for (const name in Keyword.colors) {
      if (Keyword.colors[name] === hex2)
        return name;
    }
    return;
  }
};
const Keyword$1 = Keyword;
const RGB = {
  /* VARIABLES */
  re: /^rgba?\(\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e\d+)?(%?))\s*?(?:,|\s)\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e\d+)?(%?))\s*?(?:,|\s)\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e\d+)?(%?))(?:\s*?(?:,|\/)\s*?\+?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e\d+)?(%?)))?\s*?\)$/i,
  /* API */
  parse: (color2) => {
    const charCode = color2.charCodeAt(0);
    if (charCode !== 114 && charCode !== 82)
      return;
    const match = color2.match(RGB.re);
    if (!match)
      return;
    const [, r, isRedPercentage, g, isGreenPercentage, b, isBluePercentage, a, isAlphaPercentage] = match;
    return ChannelsReusable.set({
      r: _.channel.clamp.r(isRedPercentage ? parseFloat(r) * 2.55 : parseFloat(r)),
      g: _.channel.clamp.g(isGreenPercentage ? parseFloat(g) * 2.55 : parseFloat(g)),
      b: _.channel.clamp.b(isBluePercentage ? parseFloat(b) * 2.55 : parseFloat(b)),
      a: a ? _.channel.clamp.a(isAlphaPercentage ? parseFloat(a) / 100 : parseFloat(a)) : 1
    }, color2);
  },
  stringify: (channels2) => {
    const { r, g, b, a } = channels2;
    if (a < 1) {
      return `rgba(${_.lang.round(r)}, ${_.lang.round(g)}, ${_.lang.round(b)}, ${_.lang.round(a)})`;
    } else {
      return `rgb(${_.lang.round(r)}, ${_.lang.round(g)}, ${_.lang.round(b)})`;
    }
  }
};
const RGB$1 = RGB;
const Color = {
  /* VARIABLES */
  format: {
    keyword: Keyword$1,
    hex: Hex$1,
    rgb: RGB$1,
    rgba: RGB$1,
    hsl: HSL$1,
    hsla: HSL$1
  },
  /* API */
  parse: (color2) => {
    if (typeof color2 !== "string")
      return color2;
    const channels2 = Hex$1.parse(color2) || RGB$1.parse(color2) || HSL$1.parse(color2) || Keyword$1.parse(color2);
    if (channels2)
      return channels2;
    throw new Error(`Unsupported color format: "${color2}"`);
  },
  stringify: (channels2) => {
    if (!channels2.changed && channels2.color)
      return channels2.color;
    if (channels2.type.is(TYPE.HSL) || channels2.data.r === void 0) {
      return HSL$1.stringify(channels2);
    } else if (channels2.a < 1 || !Number.isInteger(channels2.r) || !Number.isInteger(channels2.g) || !Number.isInteger(channels2.b)) {
      return RGB$1.stringify(channels2);
    } else {
      return Hex$1.stringify(channels2);
    }
  }
};
const Color$1 = Color;
const change = (color2, channels2) => {
  const ch = Color$1.parse(color2);
  for (const c in channels2) {
    ch[c] = _.channel.clamp[c](channels2[c]);
  }
  return Color$1.stringify(ch);
};
const change$1 = change;
const rgba = (r, g, b = 0, a = 1) => {
  if (typeof r !== "number")
    return change$1(r, { a: g });
  const channels2 = ChannelsReusable.set({
    r: _.channel.clamp.r(r),
    g: _.channel.clamp.g(g),
    b: _.channel.clamp.b(b),
    a: _.channel.clamp.a(a)
  });
  return Color$1.stringify(channels2);
};
const rgba$1 = rgba;
const adjustChannel = (color2, channel2, amount) => {
  const channels2 = Color$1.parse(color2);
  const amountCurrent = channels2[channel2];
  const amountNext = _.channel.clamp[channel2](amountCurrent + amount);
  if (amountCurrent !== amountNext)
    channels2[channel2] = amountNext;
  return Color$1.stringify(channels2);
};
const adjustChannel$1 = adjustChannel;
const lighten = (color2, amount) => {
  return adjustChannel$1(color2, "l", amount);
};
const lighten$1 = lighten;
const darken = (color2, amount) => {
  return adjustChannel$1(color2, "l", -amount);
};
const darken$1 = darken;
const adjust = (color2, channels2) => {
  const ch = Color$1.parse(color2);
  const changes = {};
  for (const c in channels2) {
    if (!channels2[c])
      continue;
    changes[c] = ch[c] + channels2[c];
  }
  return change$1(color2, changes);
};
const adjust$1 = adjust;
const mix = (color1, color2, weight = 50) => {
  const { r: r1, g: g1, b: b1, a: a1 } = Color$1.parse(color1);
  const { r: r2, g: g2, b: b2, a: a2 } = Color$1.parse(color2);
  const weightScale = weight / 100;
  const weightNormalized = weightScale * 2 - 1;
  const alphaDelta = a1 - a2;
  const weight1combined = weightNormalized * alphaDelta === -1 ? weightNormalized : (weightNormalized + alphaDelta) / (1 + weightNormalized * alphaDelta);
  const weight1 = (weight1combined + 1) / 2;
  const weight2 = 1 - weight1;
  const r = r1 * weight1 + r2 * weight2;
  const g = g1 * weight1 + g2 * weight2;
  const b = b1 * weight1 + b2 * weight2;
  const a = a1 * weightScale + a2 * (1 - weightScale);
  return rgba$1(r, g, b, a);
};
const mix$1 = mix;
const invert = (color2, weight = 100) => {
  const inverse = Color$1.parse(color2);
  inverse.r = 255 - inverse.r;
  inverse.g = 255 - inverse.g;
  inverse.b = 255 - inverse.b;
  return mix$1(inverse, color2, weight);
};
const invert$1 = invert;
const mkBorder = (col, darkMode) => darkMode ? adjust$1(col, { s: -40, l: 10 }) : adjust$1(col, { s: -40, l: -10 });
const oldAttributeBackgroundColorOdd = "#ffffff";
const oldAttributeBackgroundColorEven = "#f2f2f2";
let Theme$4 = class Theme {
  constructor() {
    this.background = "#f4f4f4";
    this.primaryColor = "#fff4dd";
    this.noteBkgColor = "#fff5ad";
    this.noteTextColor = "#333";
    this.THEME_COLOR_LIMIT = 12;
    this.fontFamily = '"trebuchet ms", verdana, arial, sans-serif';
    this.fontSize = "16px";
  }
  updateColors() {
    this.primaryTextColor = this.primaryTextColor || (this.darkMode ? "#eee" : "#333");
    this.secondaryColor = this.secondaryColor || adjust$1(this.primaryColor, { h: -120 });
    this.tertiaryColor = this.tertiaryColor || adjust$1(this.primaryColor, { h: 180, l: 5 });
    this.primaryBorderColor = this.primaryBorderColor || mkBorder(this.primaryColor, this.darkMode);
    this.secondaryBorderColor = this.secondaryBorderColor || mkBorder(this.secondaryColor, this.darkMode);
    this.tertiaryBorderColor = this.tertiaryBorderColor || mkBorder(this.tertiaryColor, this.darkMode);
    this.noteBorderColor = this.noteBorderColor || mkBorder(this.noteBkgColor, this.darkMode);
    this.noteBkgColor = this.noteBkgColor || "#fff5ad";
    this.noteTextColor = this.noteTextColor || "#333";
    this.secondaryTextColor = this.secondaryTextColor || invert$1(this.secondaryColor);
    this.tertiaryTextColor = this.tertiaryTextColor || invert$1(this.tertiaryColor);
    this.lineColor = this.lineColor || invert$1(this.background);
    this.textColor = this.textColor || this.primaryTextColor;
    this.nodeBkg = this.nodeBkg || this.primaryColor;
    this.mainBkg = this.mainBkg || this.primaryColor;
    this.nodeBorder = this.nodeBorder || this.primaryBorderColor;
    this.clusterBkg = this.clusterBkg || this.tertiaryColor;
    this.clusterBorder = this.clusterBorder || this.tertiaryBorderColor;
    this.defaultLinkColor = this.defaultLinkColor || this.lineColor;
    this.titleColor = this.titleColor || this.tertiaryTextColor;
    this.edgeLabelBackground = this.edgeLabelBackground || (this.darkMode ? darken$1(this.secondaryColor, 30) : this.secondaryColor);
    this.nodeTextColor = this.nodeTextColor || this.primaryTextColor;
    this.actorBorder = this.actorBorder || this.primaryBorderColor;
    this.actorBkg = this.actorBkg || this.mainBkg;
    this.actorTextColor = this.actorTextColor || this.primaryTextColor;
    this.actorLineColor = this.actorLineColor || "grey";
    this.labelBoxBkgColor = this.labelBoxBkgColor || this.actorBkg;
    this.signalColor = this.signalColor || this.textColor;
    this.signalTextColor = this.signalTextColor || this.textColor;
    this.labelBoxBorderColor = this.labelBoxBorderColor || this.actorBorder;
    this.labelTextColor = this.labelTextColor || this.actorTextColor;
    this.loopTextColor = this.loopTextColor || this.actorTextColor;
    this.activationBorderColor = this.activationBorderColor || darken$1(this.secondaryColor, 10);
    this.activationBkgColor = this.activationBkgColor || this.secondaryColor;
    this.sequenceNumberColor = this.sequenceNumberColor || invert$1(this.lineColor);
    this.sectionBkgColor = this.sectionBkgColor || this.tertiaryColor;
    this.altSectionBkgColor = this.altSectionBkgColor || "white";
    this.sectionBkgColor = this.sectionBkgColor || this.secondaryColor;
    this.sectionBkgColor2 = this.sectionBkgColor2 || this.primaryColor;
    this.excludeBkgColor = this.excludeBkgColor || "#eeeeee";
    this.taskBorderColor = this.taskBorderColor || this.primaryBorderColor;
    this.taskBkgColor = this.taskBkgColor || this.primaryColor;
    this.activeTaskBorderColor = this.activeTaskBorderColor || this.primaryColor;
    this.activeTaskBkgColor = this.activeTaskBkgColor || lighten$1(this.primaryColor, 23);
    this.gridColor = this.gridColor || "lightgrey";
    this.doneTaskBkgColor = this.doneTaskBkgColor || "lightgrey";
    this.doneTaskBorderColor = this.doneTaskBorderColor || "grey";
    this.critBorderColor = this.critBorderColor || "#ff8888";
    this.critBkgColor = this.critBkgColor || "red";
    this.todayLineColor = this.todayLineColor || "red";
    this.taskTextColor = this.taskTextColor || this.textColor;
    this.taskTextOutsideColor = this.taskTextOutsideColor || this.textColor;
    this.taskTextLightColor = this.taskTextLightColor || this.textColor;
    this.taskTextColor = this.taskTextColor || this.primaryTextColor;
    this.taskTextDarkColor = this.taskTextDarkColor || this.textColor;
    this.taskTextClickableColor = this.taskTextClickableColor || "#003163";
    this.personBorder = this.personBorder || this.primaryBorderColor;
    this.personBkg = this.personBkg || this.mainBkg;
    this.transitionColor = this.transitionColor || this.lineColor;
    this.transitionLabelColor = this.transitionLabelColor || this.textColor;
    this.stateLabelColor = this.stateLabelColor || this.stateBkg || this.primaryTextColor;
    this.stateBkg = this.stateBkg || this.mainBkg;
    this.labelBackgroundColor = this.labelBackgroundColor || this.stateBkg;
    this.compositeBackground = this.compositeBackground || this.background || this.tertiaryColor;
    this.altBackground = this.altBackground || this.tertiaryColor;
    this.compositeTitleBackground = this.compositeTitleBackground || this.mainBkg;
    this.compositeBorder = this.compositeBorder || this.nodeBorder;
    this.innerEndBackground = this.nodeBorder;
    this.errorBkgColor = this.errorBkgColor || this.tertiaryColor;
    this.errorTextColor = this.errorTextColor || this.tertiaryTextColor;
    this.transitionColor = this.transitionColor || this.lineColor;
    this.specialStateColor = this.lineColor;
    this.cScale0 = this.cScale0 || this.primaryColor;
    this.cScale1 = this.cScale1 || this.secondaryColor;
    this.cScale2 = this.cScale2 || this.tertiaryColor;
    this.cScale3 = this.cScale3 || adjust$1(this.primaryColor, { h: 30 });
    this.cScale4 = this.cScale4 || adjust$1(this.primaryColor, { h: 60 });
    this.cScale5 = this.cScale5 || adjust$1(this.primaryColor, { h: 90 });
    this.cScale6 = this.cScale6 || adjust$1(this.primaryColor, { h: 120 });
    this.cScale7 = this.cScale7 || adjust$1(this.primaryColor, { h: 150 });
    this.cScale8 = this.cScale8 || adjust$1(this.primaryColor, { h: 210, l: 150 });
    this.cScale9 = this.cScale9 || adjust$1(this.primaryColor, { h: 270 });
    this.cScale10 = this.cScale10 || adjust$1(this.primaryColor, { h: 300 });
    this.cScale11 = this.cScale11 || adjust$1(this.primaryColor, { h: 330 });
    if (this.darkMode) {
      for (let i = 0; i < this.THEME_COLOR_LIMIT; i++) {
        this["cScale" + i] = darken$1(this["cScale" + i], 75);
      }
    } else {
      for (let i = 0; i < this.THEME_COLOR_LIMIT; i++) {
        this["cScale" + i] = darken$1(this["cScale" + i], 25);
      }
    }
    for (let i = 0; i < this.THEME_COLOR_LIMIT; i++) {
      this["cScaleInv" + i] = this["cScaleInv" + i] || invert$1(this["cScale" + i]);
    }
    for (let i = 0; i < this.THEME_COLOR_LIMIT; i++) {
      if (this.darkMode) {
        this["cScalePeer" + i] = this["cScalePeer" + i] || lighten$1(this["cScale" + i], 10);
      } else {
        this["cScalePeer" + i] = this["cScalePeer" + i] || darken$1(this["cScale" + i], 10);
      }
    }
    this.scaleLabelColor = this.scaleLabelColor || this.labelTextColor;
    for (let i = 0; i < this.THEME_COLOR_LIMIT; i++) {
      this["cScaleLabel" + i] = this["cScaleLabel" + i] || this.scaleLabelColor;
    }
    const multiplier = this.darkMode ? -4 : -1;
    for (let i = 0; i < 5; i++) {
      this["surface" + i] = this["surface" + i] || adjust$1(this.mainBkg, { h: 180, s: -15, l: multiplier * (5 + i * 3) });
      this["surfacePeer" + i] = this["surfacePeer" + i] || adjust$1(this.mainBkg, { h: 180, s: -15, l: multiplier * (8 + i * 3) });
    }
    this.classText = this.classText || this.textColor;
    this.fillType0 = this.fillType0 || this.primaryColor;
    this.fillType1 = this.fillType1 || this.secondaryColor;
    this.fillType2 = this.fillType2 || adjust$1(this.primaryColor, { h: 64 });
    this.fillType3 = this.fillType3 || adjust$1(this.secondaryColor, { h: 64 });
    this.fillType4 = this.fillType4 || adjust$1(this.primaryColor, { h: -64 });
    this.fillType5 = this.fillType5 || adjust$1(this.secondaryColor, { h: -64 });
    this.fillType6 = this.fillType6 || adjust$1(this.primaryColor, { h: 128 });
    this.fillType7 = this.fillType7 || adjust$1(this.secondaryColor, { h: 128 });
    this.pie1 = this.pie1 || this.primaryColor;
    this.pie2 = this.pie2 || this.secondaryColor;
    this.pie3 = this.pie3 || this.tertiaryColor;
    this.pie4 = this.pie4 || adjust$1(this.primaryColor, { l: -10 });
    this.pie5 = this.pie5 || adjust$1(this.secondaryColor, { l: -10 });
    this.pie6 = this.pie6 || adjust$1(this.tertiaryColor, { l: -10 });
    this.pie7 = this.pie7 || adjust$1(this.primaryColor, { h: 60, l: -10 });
    this.pie8 = this.pie8 || adjust$1(this.primaryColor, { h: -60, l: -10 });
    this.pie9 = this.pie9 || adjust$1(this.primaryColor, { h: 120, l: 0 });
    this.pie10 = this.pie10 || adjust$1(this.primaryColor, { h: 60, l: -20 });
    this.pie11 = this.pie11 || adjust$1(this.primaryColor, { h: -60, l: -20 });
    this.pie12 = this.pie12 || adjust$1(this.primaryColor, { h: 120, l: -10 });
    this.pieTitleTextSize = this.pieTitleTextSize || "25px";
    this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor;
    this.pieSectionTextSize = this.pieSectionTextSize || "17px";
    this.pieSectionTextColor = this.pieSectionTextColor || this.textColor;
    this.pieLegendTextSize = this.pieLegendTextSize || "17px";
    this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor;
    this.pieStrokeColor = this.pieStrokeColor || "black";
    this.pieStrokeWidth = this.pieStrokeWidth || "2px";
    this.pieOpacity = this.pieOpacity || "0.7";
    this.requirementBackground = this.requirementBackground || this.primaryColor;
    this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor;
    this.requirementBorderSize = this.requirementBorderSize || this.primaryBorderColor;
    this.requirementTextColor = this.requirementTextColor || this.primaryTextColor;
    this.relationColor = this.relationColor || this.lineColor;
    this.relationLabelBackground = this.relationLabelBackground || (this.darkMode ? darken$1(this.secondaryColor, 30) : this.secondaryColor);
    this.relationLabelColor = this.relationLabelColor || this.actorTextColor;
    this.git0 = this.git0 || this.primaryColor;
    this.git1 = this.git1 || this.secondaryColor;
    this.git2 = this.git2 || this.tertiaryColor;
    this.git3 = this.git3 || adjust$1(this.primaryColor, { h: -30 });
    this.git4 = this.git4 || adjust$1(this.primaryColor, { h: -60 });
    this.git5 = this.git5 || adjust$1(this.primaryColor, { h: -90 });
    this.git6 = this.git6 || adjust$1(this.primaryColor, { h: 60 });
    this.git7 = this.git7 || adjust$1(this.primaryColor, { h: 120 });
    if (this.darkMode) {
      this.git0 = lighten$1(this.git0, 25);
      this.git1 = lighten$1(this.git1, 25);
      this.git2 = lighten$1(this.git2, 25);
      this.git3 = lighten$1(this.git3, 25);
      this.git4 = lighten$1(this.git4, 25);
      this.git5 = lighten$1(this.git5, 25);
      this.git6 = lighten$1(this.git6, 25);
      this.git7 = lighten$1(this.git7, 25);
    } else {
      this.git0 = darken$1(this.git0, 25);
      this.git1 = darken$1(this.git1, 25);
      this.git2 = darken$1(this.git2, 25);
      this.git3 = darken$1(this.git3, 25);
      this.git4 = darken$1(this.git4, 25);
      this.git5 = darken$1(this.git5, 25);
      this.git6 = darken$1(this.git6, 25);
      this.git7 = darken$1(this.git7, 25);
    }
    this.gitInv0 = this.gitInv0 || invert$1(this.git0);
    this.gitInv1 = this.gitInv1 || invert$1(this.git1);
    this.gitInv2 = this.gitInv2 || invert$1(this.git2);
    this.gitInv3 = this.gitInv3 || invert$1(this.git3);
    this.gitInv4 = this.gitInv4 || invert$1(this.git4);
    this.gitInv5 = this.gitInv5 || invert$1(this.git5);
    this.gitInv6 = this.gitInv6 || invert$1(this.git6);
    this.gitInv7 = this.gitInv7 || invert$1(this.git7);
    this.branchLabelColor = this.branchLabelColor || (this.darkMode ? "black" : this.labelTextColor);
    this.gitBranchLabel0 = this.gitBranchLabel0 || this.branchLabelColor;
    this.gitBranchLabel1 = this.gitBranchLabel1 || this.branchLabelColor;
    this.gitBranchLabel2 = this.gitBranchLabel2 || this.branchLabelColor;
    this.gitBranchLabel3 = this.gitBranchLabel3 || this.branchLabelColor;
    this.gitBranchLabel4 = this.gitBranchLabel4 || this.branchLabelColor;
    this.gitBranchLabel5 = this.gitBranchLabel5 || this.branchLabelColor;
    this.gitBranchLabel6 = this.gitBranchLabel6 || this.branchLabelColor;
    this.gitBranchLabel7 = this.gitBranchLabel7 || this.branchLabelColor;
    this.tagLabelColor = this.tagLabelColor || this.primaryTextColor;
    this.tagLabelBackground = this.tagLabelBackground || this.primaryColor;
    this.tagLabelBorder = this.tagBorder || this.primaryBorderColor;
    this.tagLabelFontSize = this.tagLabelFontSize || "10px";
    this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor;
    this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor;
    this.commitLabelFontSize = this.commitLabelFontSize || "10px";
    this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || oldAttributeBackgroundColorOdd;
    this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || oldAttributeBackgroundColorEven;
  }
  calculate(overrides) {
    if (typeof overrides !== "object") {
      this.updateColors();
      return;
    }
    const keys = Object.keys(overrides);
    keys.forEach((k) => {
      this[k] = overrides[k];
    });
    this.updateColors();
    keys.forEach((k) => {
      this[k] = overrides[k];
    });
  }
};
const getThemeVariables$4 = (userOverrides) => {
  const theme2 = new Theme$4();
  theme2.calculate(userOverrides);
  return theme2;
};
let Theme$3 = class Theme2 {
  constructor() {
    this.background = "#333";
    this.primaryColor = "#1f2020";
    this.secondaryColor = lighten$1(this.primaryColor, 16);
    this.tertiaryColor = adjust$1(this.primaryColor, { h: -160 });
    this.primaryBorderColor = invert$1(this.background);
    this.secondaryBorderColor = mkBorder(this.secondaryColor, this.darkMode);
    this.tertiaryBorderColor = mkBorder(this.tertiaryColor, this.darkMode);
    this.primaryTextColor = invert$1(this.primaryColor);
    this.secondaryTextColor = invert$1(this.secondaryColor);
    this.tertiaryTextColor = invert$1(this.tertiaryColor);
    this.lineColor = invert$1(this.background);
    this.textColor = invert$1(this.background);
    this.mainBkg = "#1f2020";
    this.secondBkg = "calculated";
    this.mainContrastColor = "lightgrey";
    this.darkTextColor = lighten$1(invert$1("#323D47"), 10);
    this.lineColor = "calculated";
    this.border1 = "#81B1DB";
    this.border2 = rgba$1(255, 255, 255, 0.25);
    this.arrowheadColor = "calculated";
    this.fontFamily = '"trebuchet ms", verdana, arial, sans-serif';
    this.fontSize = "16px";
    this.labelBackground = "#181818";
    this.textColor = "#ccc";
    this.THEME_COLOR_LIMIT = 12;
    this.nodeBkg = "calculated";
    this.nodeBorder = "calculated";
    this.clusterBkg = "calculated";
    this.clusterBorder = "calculated";
    this.defaultLinkColor = "calculated";
    this.titleColor = "#F9FFFE";
    this.edgeLabelBackground = "calculated";
    this.actorBorder = "calculated";
    this.actorBkg = "calculated";
    this.actorTextColor = "calculated";
    this.actorLineColor = "calculated";
    this.signalColor = "calculated";
    this.signalTextColor = "calculated";
    this.labelBoxBkgColor = "calculated";
    this.labelBoxBorderColor = "calculated";
    this.labelTextColor = "calculated";
    this.loopTextColor = "calculated";
    this.noteBorderColor = "calculated";
    this.noteBkgColor = "#fff5ad";
    this.noteTextColor = "calculated";
    this.activationBorderColor = "calculated";
    this.activationBkgColor = "calculated";
    this.sequenceNumberColor = "black";
    this.sectionBkgColor = darken$1("#EAE8D9", 30);
    this.altSectionBkgColor = "calculated";
    this.sectionBkgColor2 = "#EAE8D9";
    this.taskBorderColor = rgba$1(255, 255, 255, 70);
    this.taskBkgColor = "calculated";
    this.taskTextColor = "calculated";
    this.taskTextLightColor = "calculated";
    this.taskTextOutsideColor = "calculated";
    this.taskTextClickableColor = "#003163";
    this.activeTaskBorderColor = rgba$1(255, 255, 255, 50);
    this.activeTaskBkgColor = "#81B1DB";
    this.gridColor = "calculated";
    this.doneTaskBkgColor = "calculated";
    this.doneTaskBorderColor = "grey";
    this.critBorderColor = "#E83737";
    this.critBkgColor = "#E83737";
    this.taskTextDarkColor = "calculated";
    this.todayLineColor = "#DB5757";
    this.personBorder = "calculated";
    this.personBkg = "calculated";
    this.labelColor = "calculated";
    this.errorBkgColor = "#a44141";
    this.errorTextColor = "#ddd";
  }
  updateColors() {
    this.secondBkg = lighten$1(this.mainBkg, 16);
    this.lineColor = this.mainContrastColor;
    this.arrowheadColor = this.mainContrastColor;
    this.nodeBkg = this.mainBkg;
    this.nodeBorder = this.border1;
    this.clusterBkg = this.secondBkg;
    this.clusterBorder = this.border2;
    this.defaultLinkColor = this.lineColor;
    this.edgeLabelBackground = lighten$1(this.labelBackground, 25);
    this.actorBorder = this.border1;
    this.actorBkg = this.mainBkg;
    this.actorTextColor = this.mainContrastColor;
    this.actorLineColor = this.mainContrastColor;
    this.signalColor = this.mainContrastColor;
    this.signalTextColor = this.mainContrastColor;
    this.labelBoxBkgColor = this.actorBkg;
    this.labelBoxBorderColor = this.actorBorder;
    this.labelTextColor = this.mainContrastColor;
    this.loopTextColor = this.mainContrastColor;
    this.noteBorderColor = this.secondaryBorderColor;
    this.noteBkgColor = this.secondBkg;
    this.noteTextColor = this.secondaryTextColor;
    this.activationBorderColor = this.border1;
    this.activationBkgColor = this.secondBkg;
    this.altSectionBkgColor = this.background;
    this.taskBkgColor = lighten$1(this.mainBkg, 23);
    this.taskTextColor = this.darkTextColor;
    this.taskTextLightColor = this.mainContrastColor;
    this.taskTextOutsideColor = this.taskTextLightColor;
    this.gridColor = this.mainContrastColor;
    this.doneTaskBkgColor = this.mainContrastColor;
    this.taskTextDarkColor = this.darkTextColor;
    this.transitionColor = this.transitionColor || this.lineColor;
    this.transitionLabelColor = this.transitionLabelColor || this.textColor;
    this.stateLabelColor = this.stateLabelColor || this.stateBkg || this.primaryTextColor;
    this.stateBkg = this.stateBkg || this.mainBkg;
    this.labelBackgroundColor = this.labelBackgroundColor || this.stateBkg;
    this.compositeBackground = this.compositeBackground || this.background || this.tertiaryColor;
    this.altBackground = this.altBackground || "#555";
    this.compositeTitleBackground = this.compositeTitleBackground || this.mainBkg;
    this.compositeBorder = this.compositeBorder || this.nodeBorder;
    this.innerEndBackground = this.primaryBorderColor;
    this.specialStateColor = "#f4f4f4";
    this.errorBkgColor = this.errorBkgColor || this.tertiaryColor;
    this.errorTextColor = this.errorTextColor || this.tertiaryTextColor;
    this.fillType0 = this.primaryColor;
    this.fillType1 = this.secondaryColor;
    this.fillType2 = adjust$1(this.primaryColor, { h: 64 });
    this.fillType3 = adjust$1(this.secondaryColor, { h: 64 });
    this.fillType4 = adjust$1(this.primaryColor, { h: -64 });
    this.fillType5 = adjust$1(this.secondaryColor, { h: -64 });
    this.fillType6 = adjust$1(this.primaryColor, { h: 128 });
    this.fillType7 = adjust$1(this.secondaryColor, { h: 128 });
    this.cScale1 = this.cScale1 || "#0b0000";
    this.cScale2 = this.cScale2 || "#4d1037";
    this.cScale3 = this.cScale3 || "#3f5258";
    this.cScale4 = this.cScale4 || "#4f2f1b";
    this.cScale5 = this.cScale5 || "#6e0a0a";
    this.cScale6 = this.cScale6 || "#3b0048";
    this.cScale7 = this.cScale7 || "#995a01";
    this.cScale8 = this.cScale8 || "#154706";
    this.cScale9 = this.cScale9 || "#161722";
    this.cScale10 = this.cScale10 || "#00296f";
    this.cScale11 = this.cScale11 || "#01629c";
    this.cScale12 = this.cScale12 || "#010029";
    this.cScale0 = this.cScale0 || this.primaryColor;
    this.cScale1 = this.cScale1 || this.secondaryColor;
    this.cScale2 = this.cScale2 || this.tertiaryColor;
    this.cScale3 = this.cScale3 || adjust$1(this.primaryColor, { h: 30 });
    this.cScale4 = this.cScale4 || adjust$1(this.primaryColor, { h: 60 });
    this.cScale5 = this.cScale5 || adjust$1(this.primaryColor, { h: 90 });
    this.cScale6 = this.cScale6 || adjust$1(this.primaryColor, { h: 120 });
    this.cScale7 = this.cScale7 || adjust$1(this.primaryColor, { h: 150 });
    this.cScale8 = this.cScale8 || adjust$1(this.primaryColor, { h: 210 });
    this.cScale9 = this.cScale9 || adjust$1(this.primaryColor, { h: 270 });
    this.cScale10 = this.cScale10 || adjust$1(this.primaryColor, { h: 300 });
    this.cScale11 = this.cScale11 || adjust$1(this.primaryColor, { h: 330 });
    for (let i = 0; i < this.THEME_COLOR_LIMIT; i++) {
      this["cScaleInv" + i] = this["cScaleInv" + i] || invert$1(this["cScale" + i]);
    }
    for (let i = 0; i < this.THEME_COLOR_LIMIT; i++) {
      this["cScalePeer" + i] = this["cScalePeer" + i] || lighten$1(this["cScale" + i], 10);
    }
    for (let i = 0; i < 5; i++) {
      this["surface" + i] = this["surface" + i] || adjust$1(this.mainBkg, { h: 30, s: -30, l: -(-10 + i * 4) });
      this["surfacePeer" + i] = this["surfacePeer" + i] || adjust$1(this.mainBkg, { h: 30, s: -30, l: -(-7 + i * 4) });
    }
    this.scaleLabelColor = this.scaleLabelColor || (this.darkMode ? "black" : this.labelTextColor);
    for (let i = 0; i < this.THEME_COLOR_LIMIT; i++) {
      this["cScaleLabel" + i] = this["cScaleLabel" + i] || this.scaleLabelColor;
    }
    for (let i = 0; i < this.THEME_COLOR_LIMIT; i++) {
      this["pie" + i] = this["cScale" + i];
    }
    this.pieTitleTextSize = this.pieTitleTextSize || "25px";
    this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor;
    this.pieSectionTextSize = this.pieSectionTextSize || "17px";
    this.pieSectionTextColor = this.pieSectionTextColor || this.textColor;
    this.pieLegendTextSize = this.pieLegendTextSize || "17px";
    this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor;
    this.pieStrokeColor = this.pieStrokeColor || "black";
    this.pieStrokeWidth = this.pieStrokeWidth || "2px";
    this.pieOpacity = this.pieOpacity || "0.7";
    this.classText = this.primaryTextColor;
    this.requirementBackground = this.requirementBackground || this.primaryColor;
    this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor;
    this.requirementBorderSize = this.requirementBorderSize || this.primaryBorderColor;
    this.requirementTextColor = this.requirementTextColor || this.primaryTextColor;
    this.relationColor = this.relationColor || this.lineColor;
    this.relationLabelBackground = this.relationLabelBackground || (this.darkMode ? darken$1(this.secondaryColor, 30) : this.secondaryColor);
    this.relationLabelColor = this.relationLabelColor || this.actorTextColor;
    this.git0 = lighten$1(this.secondaryColor, 20);
    this.git1 = lighten$1(this.pie2 || this.secondaryColor, 20);
    this.git2 = lighten$1(this.pie3 || this.tertiaryColor, 20);
    this.git3 = lighten$1(this.pie4 || adjust$1(this.primaryColor, { h: -30 }), 20);
    this.git4 = lighten$1(this.pie5 || adjust$1(this.primaryColor, { h: -60 }), 20);
    this.git5 = lighten$1(this.pie6 || adjust$1(this.primaryColor, { h: -90 }), 10);
    this.git6 = lighten$1(this.pie7 || adjust$1(this.primaryColor, { h: 60 }), 10);
    this.git7 = lighten$1(this.pie8 || adjust$1(this.primaryColor, { h: 120 }), 20);
    this.gitInv0 = this.gitInv0 || invert$1(this.git0);
    this.gitInv1 = this.gitInv1 || invert$1(this.git1);
    this.gitInv2 = this.gitInv2 || invert$1(this.git2);
    this.gitInv3 = this.gitInv3 || invert$1(this.git3);
    this.gitInv4 = this.gitInv4 || invert$1(this.git4);
    this.gitInv5 = this.gitInv5 || invert$1(this.git5);
    this.gitInv6 = this.gitInv6 || invert$1(this.git6);
    this.gitInv7 = this.gitInv7 || invert$1(this.git7);
    this.tagLabelColor = this.tagLabelColor || this.primaryTextColor;
    this.tagLabelBackground = this.tagLabelBackground || this.primaryColor;
    this.tagLabelBorder = this.tagBorder || this.primaryBorderColor;
    this.tagLabelFontSize = this.tagLabelFontSize || "10px";
    this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor;
    this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor;
    this.commitLabelFontSize = this.commitLabelFontSize || "10px";
    this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || lighten$1(this.background, 12);
    this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || lighten$1(this.background, 2);
  }
  calculate(overrides) {
    if (typeof overrides !== "object") {
      this.updateColors();
      return;
    }
    const keys = Object.keys(overrides);
    keys.forEach((k) => {
      this[k] = overrides[k];
    });
    this.updateColors();
    keys.forEach((k) => {
      this[k] = overrides[k];
    });
  }
};
const getThemeVariables$3 = (userOverrides) => {
  const theme2 = new Theme$3();
  theme2.calculate(userOverrides);
  return theme2;
};
let Theme$2 = class Theme3 {
  constructor() {
    this.background = "#f4f4f4";
    this.primaryColor = "#ECECFF";
    this.secondaryColor = adjust$1(this.primaryColor, { h: 120 });
    this.secondaryColor = "#ffffde";
    this.tertiaryColor = adjust$1(this.primaryColor, { h: -160 });
    this.primaryBorderColor = mkBorder(this.primaryColor, this.darkMode);
    this.secondaryBorderColor = mkBorder(this.secondaryColor, this.darkMode);
    this.tertiaryBorderColor = mkBorder(this.tertiaryColor, this.darkMode);
    this.primaryTextColor = invert$1(this.primaryColor);
    this.secondaryTextColor = invert$1(this.secondaryColor);
    this.tertiaryTextColor = invert$1(this.tertiaryColor);
    this.lineColor = invert$1(this.background);
    this.textColor = invert$1(this.background);
    this.background = "white";
    this.mainBkg = "#ECECFF";
    this.secondBkg = "#ffffde";
    this.lineColor = "#333333";
    this.border1 = "#9370DB";
    this.border2 = "#aaaa33";
    this.arrowheadColor = "#333333";
    this.fontFamily = '"trebuchet ms", verdana, arial, sans-serif';
    this.fontSize = "16px";
    this.labelBackground = "#e8e8e8";
    this.textColor = "#333";
    this.THEME_COLOR_LIMIT = 12;
    this.nodeBkg = "calculated";
    this.nodeBorder = "calculated";
    this.clusterBkg = "calculated";
    this.clusterBorder = "calculated";
    this.defaultLinkColor = "calculated";
    this.titleColor = "calculated";
    this.edgeLabelBackground = "calculated";
    this.actorBorder = "calculated";
    this.actorBkg = "calculated";
    this.actorTextColor = "black";
    this.actorLineColor = "grey";
    this.signalColor = "calculated";
    this.signalTextColor = "calculated";
    this.labelBoxBkgColor = "calculated";
    this.labelBoxBorderColor = "calculated";
    this.labelTextColor = "calculated";
    this.loopTextColor = "calculated";
    this.noteBorderColor = "calculated";
    this.noteBkgColor = "#fff5ad";
    this.noteTextColor = "calculated";
    this.activationBorderColor = "#666";
    this.activationBkgColor = "#f4f4f4";
    this.sequenceNumberColor = "white";
    this.sectionBkgColor = "calculated";
    this.altSectionBkgColor = "calculated";
    this.sectionBkgColor2 = "calculated";
    this.excludeBkgColor = "#eeeeee";
    this.taskBorderColor = "calculated";
    this.taskBkgColor = "calculated";
    this.taskTextLightColor = "calculated";
    this.taskTextColor = this.taskTextLightColor;
    this.taskTextDarkColor = "calculated";
    this.taskTextOutsideColor = this.taskTextDarkColor;
    this.taskTextClickableColor = "calculated";
    this.activeTaskBorderColor = "calculated";
    this.activeTaskBkgColor = "calculated";
    this.gridColor = "calculated";
    this.doneTaskBkgColor = "calculated";
    this.doneTaskBorderColor = "calculated";
    this.critBorderColor = "calculated";
    this.critBkgColor = "calculated";
    this.todayLineColor = "calculated";
    this.sectionBkgColor = rgba$1(102, 102, 255, 0.49);
    this.altSectionBkgColor = "white";
    this.sectionBkgColor2 = "#fff400";
    this.taskBorderColor = "#534fbc";
    this.taskBkgColor = "#8a90dd";
    this.taskTextLightColor = "white";
    this.taskTextColor = "calculated";
    this.taskTextDarkColor = "black";
    this.taskTextOutsideColor = "calculated";
    this.taskTextClickableColor = "#003163";
    this.activeTaskBorderColor = "#534fbc";
    this.activeTaskBkgColor = "#bfc7ff";
    this.gridColor = "lightgrey";
    this.doneTaskBkgColor = "lightgrey";
    this.doneTaskBorderColor = "grey";
    this.critBorderColor = "#ff8888";
    this.critBkgColor = "red";
    this.todayLineColor = "red";
    this.personBorder = "calculated";
    this.personBkg = "calculated";
    this.labelColor = "black";
    this.errorBkgColor = "#552222";
    this.errorTextColor = "#552222";
    this.updateColors();
  }
  updateColors() {
    this.cScale0 = this.cScale0 || this.primaryColor;
    this.cScale1 = this.cScale1 || this.secondaryColor;
    this.cScale2 = this.cScale2 || this.tertiaryColor;
    this.cScale3 = this.cScale3 || adjust$1(this.primaryColor, { h: 30 });
    this.cScale4 = this.cScale4 || adjust$1(this.primaryColor, { h: 60 });
    this.cScale5 = this.cScale5 || adjust$1(this.primaryColor, { h: 90 });
    this.cScale6 = this.cScale6 || adjust$1(this.primaryColor, { h: 120 });
    this.cScale7 = this.cScale7 || adjust$1(this.primaryColor, { h: 150 });
    this.cScale8 = this.cScale8 || adjust$1(this.primaryColor, { h: 210 });
    this.cScale9 = this.cScale9 || adjust$1(this.primaryColor, { h: 270 });
    this.cScale10 = this.cScale10 || adjust$1(this.primaryColor, { h: 300 });
    this.cScale11 = this.cScale11 || adjust$1(this.primaryColor, { h: 330 });
    this["cScalePeer" + 1] = this["cScalePeer" + 1] || darken$1(this.secondaryColor, 45);
    this["cScalePeer" + 2] = this["cScalePeer" + 2] || darken$1(this.tertiaryColor, 40);
    for (let i = 0; i < this.THEME_COLOR_LIMIT; i++) {
      this["cScale" + i] = darken$1(this["cScale" + i], 10);
      this["cScalePeer" + i] = this["cScalePeer" + i] || darken$1(this["cScale" + i], 25);
    }
    for (let i = 0; i < this.THEME_COLOR_LIMIT; i++) {
      this["cScaleInv" + i] = this["cScaleInv" + i] || adjust$1(this["cScale" + i], { h: 180 });
    }
    for (let i = 0; i < 5; i++) {
      this["surface" + i] = this["surface" + i] || adjust$1(this.mainBkg, { h: 30, l: -(5 + i * 5) });
      this["surfacePeer" + i] = this["surfacePeer" + i] || adjust$1(this.mainBkg, { h: 30, l: -(7 + i * 5) });
    }
    this.scaleLabelColor = this.scaleLabelColor !== "calculated" && this.scaleLabelColor ? this.scaleLabelColor : this.labelTextColor;
    if (this.labelTextColor !== "calculated") {
      this.cScaleLabel0 = this.cScaleLabel0 || invert$1(this.labelTextColor);
      this.cScaleLabel3 = this.cScaleLabel3 || invert$1(this.labelTextColor);
      for (let i = 0; i < this.THEME_COLOR_LIMIT; i++) {
        this["cScaleLabel" + i] = this["cScaleLabel" + i] || this.labelTextColor;
      }
    }
    this.nodeBkg = this.mainBkg;
    this.nodeBorder = this.border1;
    this.clusterBkg = this.secondBkg;
    this.clusterBorder = this.border2;
    this.defaultLinkColor = this.lineColor;
    this.titleColor = this.textColor;
    this.edgeLabelBackground = this.labelBackground;
    this.actorBorder = lighten$1(this.border1, 23);
    this.actorBkg = this.mainBkg;
    this.labelBoxBkgColor = this.actorBkg;
    this.signalColor = this.textColor;
    this.signalTextColor = this.textColor;
    this.labelBoxBorderColor = this.actorBorder;
    this.labelTextColor = this.actorTextColor;
    this.loopTextColor = this.actorTextColor;
    this.noteBorderColor = this.border2;
    this.noteTextColor = this.actorTextColor;
    this.taskTextColor = this.taskTextLightColor;
    this.taskTextOutsideColor = this.taskTextDarkColor;
    this.transitionColor = this.transitionColor || this.lineColor;
    this.transitionLabelColor = this.transitionLabelColor || this.textColor;
    this.stateLabelColor = this.stateLabelColor || this.stateBkg || this.primaryTextColor;
    this.stateBkg = this.stateBkg || this.mainBkg;
    this.labelBackgroundColor = this.labelBackgroundColor || this.stateBkg;
    this.compositeBackground = this.compositeBackground || this.background || this.tertiaryColor;
    this.altBackground = this.altBackground || "#f0f0f0";
    this.compositeTitleBackground = this.compositeTitleBackground || this.mainBkg;
    this.compositeBorder = this.compositeBorder || this.nodeBorder;
    this.innerEndBackground = this.nodeBorder;
    this.specialStateColor = this.lineColor;
    this.errorBkgColor = this.errorBkgColor || this.tertiaryColor;
    this.errorTextColor = this.errorTextColor || this.tertiaryTextColor;
    this.transitionColor = this.transitionColor || this.lineColor;
    this.classText = this.primaryTextColor;
    this.fillType0 = this.primaryColor;
    this.fillType1 = this.secondaryColor;
    this.fillType2 = adjust$1(this.primaryColor, { h: 64 });
    this.fillType3 = adjust$1(this.secondaryColor, { h: 64 });
    this.fillType4 = adjust$1(this.primaryColor, { h: -64 });
    this.fillType5 = adjust$1(this.secondaryColor, { h: -64 });
    this.fillType6 = adjust$1(this.primaryColor, { h: 128 });
    this.fillType7 = adjust$1(this.secondaryColor, { h: 128 });
    this.pie1 = this.pie1 || this.primaryColor;
    this.pie2 = this.pie2 || this.secondaryColor;
    this.pie3 = this.pie3 || adjust$1(this.tertiaryColor, { l: -40 });
    this.pie4 = this.pie4 || adjust$1(this.primaryColor, { l: -10 });
    this.pie5 = this.pie5 || adjust$1(this.secondaryColor, { l: -30 });
    this.pie6 = this.pie6 || adjust$1(this.tertiaryColor, { l: -20 });
    this.pie7 = this.pie7 || adjust$1(this.primaryColor, { h: 60, l: -20 });
    this.pie8 = this.pie8 || adjust$1(this.primaryColor, { h: -60, l: -40 });
    this.pie9 = this.pie9 || adjust$1(this.primaryColor, { h: 120, l: -40 });
    this.pie10 = this.pie10 || adjust$1(this.primaryColor, { h: 60, l: -40 });
    this.pie11 = this.pie11 || adjust$1(this.primaryColor, { h: -90, l: -40 });
    this.pie12 = this.pie12 || adjust$1(this.primaryColor, { h: 120, l: -30 });
    this.pieTitleTextSize = this.pieTitleTextSize || "25px";
    this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor;
    this.pieSectionTextSize = this.pieSectionTextSize || "17px";
    this.pieSectionTextColor = this.pieSectionTextColor || this.textColor;
    this.pieLegendTextSize = this.pieLegendTextSize || "17px";
    this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor;
    this.pieStrokeColor = this.pieStrokeColor || "black";
    this.pieStrokeWidth = this.pieStrokeWidth || "2px";
    this.pieOpacity = this.pieOpacity || "0.7";
    this.requirementBackground = this.requirementBackground || this.primaryColor;
    this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor;
    this.requirementBorderSize = this.requirementBorderSize || this.primaryBorderColor;
    this.requirementTextColor = this.requirementTextColor || this.primaryTextColor;
    this.relationColor = this.relationColor || this.lineColor;
    this.relationLabelBackground = this.relationLabelBackground || this.labelBackground;
    this.relationLabelColor = this.relationLabelColor || this.actorTextColor;
    this.git0 = this.git0 || this.primaryColor;
    this.git1 = this.git1 || this.secondaryColor;
    this.git2 = this.git2 || this.tertiaryColor;
    this.git3 = this.git3 || adjust$1(this.primaryColor, { h: -30 });
    this.git4 = this.git4 || adjust$1(this.primaryColor, { h: -60 });
    this.git5 = this.git5 || adjust$1(this.primaryColor, { h: -90 });
    this.git6 = this.git6 || adjust$1(this.primaryColor, { h: 60 });
    this.git7 = this.git7 || adjust$1(this.primaryColor, { h: 120 });
    if (this.darkMode) {
      this.git0 = lighten$1(this.git0, 25);
      this.git1 = lighten$1(this.git1, 25);
      this.git2 = lighten$1(this.git2, 25);
      this.git3 = lighten$1(this.git3, 25);
      this.git4 = lighten$1(this.git4, 25);
      this.git5 = lighten$1(this.git5, 25);
      this.git6 = lighten$1(this.git6, 25);
      this.git7 = lighten$1(this.git7, 25);
    } else {
      this.git0 = darken$1(this.git0, 25);
      this.git1 = darken$1(this.git1, 25);
      this.git2 = darken$1(this.git2, 25);
      this.git3 = darken$1(this.git3, 25);
      this.git4 = darken$1(this.git4, 25);
      this.git5 = darken$1(this.git5, 25);
      this.git6 = darken$1(this.git6, 25);
      this.git7 = darken$1(this.git7, 25);
    }
    this.gitInv0 = this.gitInv0 || darken$1(invert$1(this.git0), 25);
    this.gitInv1 = this.gitInv1 || invert$1(this.git1);
    this.gitInv2 = this.gitInv2 || invert$1(this.git2);
    this.gitInv3 = this.gitInv3 || invert$1(this.git3);
    this.gitInv4 = this.gitInv4 || invert$1(this.git4);
    this.gitInv5 = this.gitInv5 || invert$1(this.git5);
    this.gitInv6 = this.gitInv6 || invert$1(this.git6);
    this.gitInv7 = this.gitInv7 || invert$1(this.git7);
    this.gitBranchLabel0 = this.gitBranchLabel0 || invert$1(this.labelTextColor);
    this.gitBranchLabel1 = this.gitBranchLabel1 || this.labelTextColor;
    this.gitBranchLabel2 = this.gitBranchLabel2 || this.labelTextColor;
    this.gitBranchLabel3 = this.gitBranchLabel3 || invert$1(this.labelTextColor);
    this.gitBranchLabel4 = this.gitBranchLabel4 || this.labelTextColor;
    this.gitBranchLabel5 = this.gitBranchLabel5 || this.labelTextColor;
    this.gitBranchLabel6 = this.gitBranchLabel6 || this.labelTextColor;
    this.gitBranchLabel7 = this.gitBranchLabel7 || this.labelTextColor;
    this.tagLabelColor = this.tagLabelColor || this.primaryTextColor;
    this.tagLabelBackground = this.tagLabelBackground || this.primaryColor;
    this.tagLabelBorder = this.tagBorder || this.primaryBorderColor;
    this.tagLabelFontSize = this.tagLabelFontSize || "10px";
    this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor;
    this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor;
    this.commitLabelFontSize = this.commitLabelFontSize || "10px";
    this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || oldAttributeBackgroundColorOdd;
    this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || oldAttributeBackgroundColorEven;
  }
  calculate(overrides) {
    if (typeof overrides !== "object") {
      this.updateColors();
      return;
    }
    const keys = Object.keys(overrides);
    keys.forEach((k) => {
      this[k] = overrides[k];
    });
    this.updateColors();
    keys.forEach((k) => {
      this[k] = overrides[k];
    });
  }
};
const getThemeVariables$2 = (userOverrides) => {
  const theme2 = new Theme$2();
  theme2.calculate(userOverrides);
  return theme2;
};
let Theme$1 = class Theme4 {
  constructor() {
    this.background = "#f4f4f4";
    this.primaryColor = "#cde498";
    this.secondaryColor = "#cdffb2";
    this.background = "white";
    this.mainBkg = "#cde498";
    this.secondBkg = "#cdffb2";
    this.lineColor = "green";
    this.border1 = "#13540c";
    this.border2 = "#6eaa49";
    this.arrowheadColor = "green";
    this.fontFamily = '"trebuchet ms", verdana, arial, sans-serif';
    this.fontSize = "16px";
    this.tertiaryColor = lighten$1("#cde498", 10);
    this.primaryBorderColor = mkBorder(this.primaryColor, this.darkMode);
    this.secondaryBorderColor = mkBorder(this.secondaryColor, this.darkMode);
    this.tertiaryBorderColor = mkBorder(this.tertiaryColor, this.darkMode);
    this.primaryTextColor = invert$1(this.primaryColor);
    this.secondaryTextColor = invert$1(this.secondaryColor);
    this.tertiaryTextColor = invert$1(this.primaryColor);
    this.lineColor = invert$1(this.background);
    this.textColor = invert$1(this.background);
    this.THEME_COLOR_LIMIT = 12;
    this.nodeBkg = "calculated";
    this.nodeBorder = "calculated";
    this.clusterBkg = "calculated";
    this.clusterBorder = "calculated";
    this.defaultLinkColor = "calculated";
    this.titleColor = "#333";
    this.edgeLabelBackground = "#e8e8e8";
    this.actorBorder = "calculated";
    this.actorBkg = "calculated";
    this.actorTextColor = "black";
    this.actorLineColor = "grey";
    this.signalColor = "#333";
    this.signalTextColor = "#333";
    this.labelBoxBkgColor = "calculated";
    this.labelBoxBorderColor = "#326932";
    this.labelTextColor = "calculated";
    this.loopTextColor = "calculated";
    this.noteBorderColor = "calculated";
    this.noteBkgColor = "#fff5ad";
    this.noteTextColor = "calculated";
    this.activationBorderColor = "#666";
    this.activationBkgColor = "#f4f4f4";
    this.sequenceNumberColor = "white";
    this.sectionBkgColor = "#6eaa49";
    this.altSectionBkgColor = "white";
    this.sectionBkgColor2 = "#6eaa49";
    this.excludeBkgColor = "#eeeeee";
    this.taskBorderColor = "calculated";
    this.taskBkgColor = "#487e3a";
    this.taskTextLightColor = "white";
    this.taskTextColor = "calculated";
    this.taskTextDarkColor = "black";
    this.taskTextOutsideColor = "calculated";
    this.taskTextClickableColor = "#003163";
    this.activeTaskBorderColor = "calculated";
    this.activeTaskBkgColor = "calculated";
    this.gridColor = "lightgrey";
    this.doneTaskBkgColor = "lightgrey";
    this.doneTaskBorderColor = "grey";
    this.critBorderColor = "#ff8888";
    this.critBkgColor = "red";
    this.todayLineColor = "red";
    this.personBorder = "calculated";
    this.personBkg = "calculated";
    this.labelColor = "black";
    this.errorBkgColor = "#552222";
    this.errorTextColor = "#552222";
  }
  updateColors() {
    this.cScale0 = this.cScale0 || this.primaryColor;
    this.cScale1 = this.cScale1 || this.secondaryColor;
    this.cScale2 = this.cScale2 || this.tertiaryColor;
    this.cScale3 = this.cScale3 || adjust$1(this.primaryColor, { h: 30 });
    this.cScale4 = this.cScale4 || adjust$1(this.primaryColor, { h: 60 });
    this.cScale5 = this.cScale5 || adjust$1(this.primaryColor, { h: 90 });
    this.cScale6 = this.cScale6 || adjust$1(this.primaryColor, { h: 120 });
    this.cScale7 = this.cScale7 || adjust$1(this.primaryColor, { h: 150 });
    this.cScale8 = this.cScale8 || adjust$1(this.primaryColor, { h: 210 });
    this.cScale9 = this.cScale9 || adjust$1(this.primaryColor, { h: 270 });
    this.cScale10 = this.cScale10 || adjust$1(this.primaryColor, { h: 300 });
    this.cScale11 = this.cScale11 || adjust$1(this.primaryColor, { h: 330 });
    this["cScalePeer" + 1] = this["cScalePeer" + 1] || darken$1(this.secondaryColor, 45);
    this["cScalePeer" + 2] = this["cScalePeer" + 2] || darken$1(this.tertiaryColor, 40);
    for (let i = 0; i < this.THEME_COLOR_LIMIT; i++) {
      this["cScale" + i] = darken$1(this["cScale" + i], 10);
      this["cScalePeer" + i] = this["cScalePeer" + i] || darken$1(this["cScale" + i], 25);
    }
    for (let i = 0; i < this.THEME_COLOR_LIMIT; i++) {
      this["cScaleInv" + i] = this["cScaleInv" + i] || adjust$1(this["cScale" + i], { h: 180 });
    }
    this.scaleLabelColor = this.scaleLabelColor !== "calculated" && this.scaleLabelColor ? this.scaleLabelColor : this.labelTextColor;
    for (let i = 0; i < this.THEME_COLOR_LIMIT; i++) {
      this["cScaleLabel" + i] = this["cScaleLabel" + i] || this.scaleLabelColor;
    }
    for (let i = 0; i < 5; i++) {
      this["surface" + i] = this["surface" + i] || adjust$1(this.mainBkg, { h: 30, s: -30, l: -(5 + i * 5) });
      this["surfacePeer" + i] = this["surfacePeer" + i] || adjust$1(this.mainBkg, { h: 30, s: -30, l: -(8 + i * 5) });
    }
    this.nodeBkg = this.mainBkg;
    this.nodeBorder = this.border1;
    this.clusterBkg = this.secondBkg;
    this.clusterBorder = this.border2;
    this.defaultLinkColor = this.lineColor;
    this.actorBorder = darken$1(this.mainBkg, 20);
    this.actorBkg = this.mainBkg;
    this.labelBoxBkgColor = this.actorBkg;
    this.labelTextColor = this.actorTextColor;
    this.loopTextColor = this.actorTextColor;
    this.noteBorderColor = this.border2;
    this.noteTextColor = this.actorTextColor;
    this.taskBorderColor = this.border1;
    this.taskTextColor = this.taskTextLightColor;
    this.taskTextOutsideColor = this.taskTextDarkColor;
    this.activeTaskBorderColor = this.taskBorderColor;
    this.activeTaskBkgColor = this.mainBkg;
    this.transitionColor = this.transitionColor || this.lineColor;
    this.transitionLabelColor = this.transitionLabelColor || this.textColor;
    this.stateLabelColor = this.stateLabelColor || this.stateBkg || this.primaryTextColor;
    this.stateBkg = this.stateBkg || this.mainBkg;
    this.labelBackgroundColor = this.labelBackgroundColor || this.stateBkg;
    this.compositeBackground = this.compositeBackground || this.background || this.tertiaryColor;
    this.altBackground = this.altBackground || "#f0f0f0";
    this.compositeTitleBackground = this.compositeTitleBackground || this.mainBkg;
    this.compositeBorder = this.compositeBorder || this.nodeBorder;
    this.innerEndBackground = this.primaryBorderColor;
    this.specialStateColor = this.lineColor;
    this.errorBkgColor = this.errorBkgColor || this.tertiaryColor;
    this.errorTextColor = this.errorTextColor || this.tertiaryTextColor;
    this.transitionColor = this.transitionColor || this.lineColor;
    this.classText = this.primaryTextColor;
    this.fillType0 = this.primaryColor;
    this.fillType1 = this.secondaryColor;
    this.fillType2 = adjust$1(this.primaryColor, { h: 64 });
    this.fillType3 = adjust$1(this.secondaryColor, { h: 64 });
    this.fillType4 = adjust$1(this.primaryColor, { h: -64 });
    this.fillType5 = adjust$1(this.secondaryColor, { h: -64 });
    this.fillType6 = adjust$1(this.primaryColor, { h: 128 });
    this.fillType7 = adjust$1(this.secondaryColor, { h: 128 });
    this.pie1 = this.pie1 || this.primaryColor;
    this.pie2 = this.pie2 || this.secondaryColor;
    this.pie3 = this.pie3 || this.tertiaryColor;
    this.pie4 = this.pie4 || adjust$1(this.primaryColor, { l: -30 });
    this.pie5 = this.pie5 || adjust$1(this.secondaryColor, { l: -30 });
    this.pie6 = this.pie6 || adjust$1(this.tertiaryColor, { h: 40, l: -40 });
    this.pie7 = this.pie7 || adjust$1(this.primaryColor, { h: 60, l: -10 });
    this.pie8 = this.pie8 || adjust$1(this.primaryColor, { h: -60, l: -10 });
    this.pie9 = this.pie9 || adjust$1(this.primaryColor, { h: 120, l: 0 });
    this.pie10 = this.pie10 || adjust$1(this.primaryColor, { h: 60, l: -50 });
    this.pie11 = this.pie11 || adjust$1(this.primaryColor, { h: -60, l: -50 });
    this.pie12 = this.pie12 || adjust$1(this.primaryColor, { h: 120, l: -50 });
    this.pieTitleTextSize = this.pieTitleTextSize || "25px";
    this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor;
    this.pieSectionTextSize = this.pieSectionTextSize || "17px";
    this.pieSectionTextColor = this.pieSectionTextColor || this.textColor;
    this.pieLegendTextSize = this.pieLegendTextSize || "17px";
    this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor;
    this.pieStrokeColor = this.pieStrokeColor || "black";
    this.pieStrokeWidth = this.pieStrokeWidth || "2px";
    this.pieOpacity = this.pieOpacity || "0.7";
    this.requirementBackground = this.requirementBackground || this.primaryColor;
    this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor;
    this.requirementBorderSize = this.requirementBorderSize || this.primaryBorderColor;
    this.requirementTextColor = this.requirementTextColor || this.primaryTextColor;
    this.relationColor = this.relationColor || this.lineColor;
    this.relationLabelBackground = this.relationLabelBackground || this.edgeLabelBackground;
    this.relationLabelColor = this.relationLabelColor || this.actorTextColor;
    this.git0 = this.git0 || this.primaryColor;
    this.git1 = this.git1 || this.secondaryColor;
    this.git2 = this.git2 || this.tertiaryColor;
    this.git3 = this.git3 || adjust$1(this.primaryColor, { h: -30 });
    this.git4 = this.git4 || adjust$1(this.primaryColor, { h: -60 });
    this.git5 = this.git5 || adjust$1(this.primaryColor, { h: -90 });
    this.git6 = this.git6 || adjust$1(this.primaryColor, { h: 60 });
    this.git7 = this.git7 || adjust$1(this.primaryColor, { h: 120 });
    if (this.darkMode) {
      this.git0 = lighten$1(this.git0, 25);
      this.git1 = lighten$1(this.git1, 25);
      this.git2 = lighten$1(this.git2, 25);
      this.git3 = lighten$1(this.git3, 25);
      this.git4 = lighten$1(this.git4, 25);
      this.git5 = lighten$1(this.git5, 25);
      this.git6 = lighten$1(this.git6, 25);
      this.git7 = lighten$1(this.git7, 25);
    } else {
      this.git0 = darken$1(this.git0, 25);
      this.git1 = darken$1(this.git1, 25);
      this.git2 = darken$1(this.git2, 25);
      this.git3 = darken$1(this.git3, 25);
      this.git4 = darken$1(this.git4, 25);
      this.git5 = darken$1(this.git5, 25);
      this.git6 = darken$1(this.git6, 25);
      this.git7 = darken$1(this.git7, 25);
    }
    this.gitInv0 = this.gitInv0 || invert$1(this.git0);
    this.gitInv1 = this.gitInv1 || invert$1(this.git1);
    this.gitInv2 = this.gitInv2 || invert$1(this.git2);
    this.gitInv3 = this.gitInv3 || invert$1(this.git3);
    this.gitInv4 = this.gitInv4 || invert$1(this.git4);
    this.gitInv5 = this.gitInv5 || invert$1(this.git5);
    this.gitInv6 = this.gitInv6 || invert$1(this.git6);
    this.gitInv7 = this.gitInv7 || invert$1(this.git7);
    this.tagLabelColor = this.tagLabelColor || this.primaryTextColor;
    this.tagLabelBackground = this.tagLabelBackground || this.primaryColor;
    this.tagLabelBorder = this.tagBorder || this.primaryBorderColor;
    this.tagLabelFontSize = this.tagLabelFontSize || "10px";
    this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor;
    this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor;
    this.commitLabelFontSize = this.commitLabelFontSize || "10px";
    this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || oldAttributeBackgroundColorOdd;
    this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || oldAttributeBackgroundColorEven;
  }
  calculate(overrides) {
    if (typeof overrides !== "object") {
      this.updateColors();
      return;
    }
    const keys = Object.keys(overrides);
    keys.forEach((k) => {
      this[k] = overrides[k];
    });
    this.updateColors();
    keys.forEach((k) => {
      this[k] = overrides[k];
    });
  }
};
const getThemeVariables$1 = (userOverrides) => {
  const theme2 = new Theme$1();
  theme2.calculate(userOverrides);
  return theme2;
};
class Theme5 {
  constructor() {
    this.primaryColor = "#eee";
    this.contrast = "#707070";
    this.secondaryColor = lighten$1(this.contrast, 55);
    this.background = "#ffffff";
    this.tertiaryColor = adjust$1(this.primaryColor, { h: -160 });
    this.primaryBorderColor = mkBorder(this.primaryColor, this.darkMode);
    this.secondaryBorderColor = mkBorder(this.secondaryColor, this.darkMode);
    this.tertiaryBorderColor = mkBorder(this.tertiaryColor, this.darkMode);
    this.primaryTextColor = invert$1(this.primaryColor);
    this.secondaryTextColor = invert$1(this.secondaryColor);
    this.tertiaryTextColor = invert$1(this.tertiaryColor);
    this.lineColor = invert$1(this.background);
    this.textColor = invert$1(this.background);
    this.mainBkg = "#eee";
    this.secondBkg = "calculated";
    this.lineColor = "#666";
    this.border1 = "#999";
    this.border2 = "calculated";
    this.note = "#ffa";
    this.text = "#333";
    this.critical = "#d42";
    this.done = "#bbb";
    this.arrowheadColor = "#333333";
    this.fontFamily = '"trebuchet ms", verdana, arial, sans-serif';
    this.fontSize = "16px";
    this.THEME_COLOR_LIMIT = 12;
    this.nodeBkg = "calculated";
    this.nodeBorder = "calculated";
    this.clusterBkg = "calculated";
    this.clusterBorder = "calculated";
    this.defaultLinkColor = "calculated";
    this.titleColor = "calculated";
    this.edgeLabelBackground = "white";
    this.actorBorder = "calculated";
    this.actorBkg = "calculated";
    this.actorTextColor = "calculated";
    this.actorLineColor = "calculated";
    this.signalColor = "calculated";
    this.signalTextColor = "calculated";
    this.labelBoxBkgColor = "calculated";
    this.labelBoxBorderColor = "calculated";
    this.labelTextColor = "calculated";
    this.loopTextColor = "calculated";
    this.noteBorderColor = "calculated";
    this.noteBkgColor = "calculated";
    this.noteTextColor = "calculated";
    this.activationBorderColor = "#666";
    this.activationBkgColor = "#f4f4f4";
    this.sequenceNumberColor = "white";
    this.sectionBkgColor = "calculated";
    this.altSectionBkgColor = "white";
    this.sectionBkgColor2 = "calculated";
    this.excludeBkgColor = "#eeeeee";
    this.taskBorderColor = "calculated";
    this.taskBkgColor = "calculated";
    this.taskTextLightColor = "white";
    this.taskTextColor = "calculated";
    this.taskTextDarkColor = "calculated";
    this.taskTextOutsideColor = "calculated";
    this.taskTextClickableColor = "#003163";
    this.activeTaskBorderColor = "calculated";
    this.activeTaskBkgColor = "calculated";
    this.gridColor = "calculated";
    this.doneTaskBkgColor = "calculated";
    this.doneTaskBorderColor = "calculated";
    this.critBkgColor = "calculated";
    this.critBorderColor = "calculated";
    this.todayLineColor = "calculated";
    this.personBorder = "calculated";
    this.personBkg = "calculated";
    this.labelColor = "black";
    this.errorBkgColor = "#552222";
    this.errorTextColor = "#552222";
  }
  updateColors() {
    this.secondBkg = lighten$1(this.contrast, 55);
    this.border2 = this.contrast;
    this.cScale0 = this.cScale0 || "#555";
    this.cScale1 = this.cScale1 || "#F4F4F4";
    this.cScale2 = this.cScale2 || "#555";
    this.cScale3 = this.cScale3 || "#BBB";
    this.cScale4 = this.cScale4 || "#777";
    this.cScale5 = this.cScale5 || "#999";
    this.cScale6 = this.cScale6 || "#DDD";
    this.cScale7 = this.cScale7 || "#FFF";
    this.cScale8 = this.cScale8 || "#DDD";
    this.cScale9 = this.cScale9 || "#BBB";
    this.cScale10 = this.cScale10 || "#999";
    this.cScale11 = this.cScale11 || "#777";
    for (let i = 0; i < this.THEME_COLOR_LIMIT; i++) {
      this["cScaleInv" + i] = this["cScaleInv" + i] || invert$1(this["cScale" + i]);
    }
    for (let i = 0; i < this.THEME_COLOR_LIMIT; i++) {
      if (this.darkMode) {
        this["cScalePeer" + i] = this["cScalePeer" + i] || lighten$1(this["cScale" + i], 10);
      } else {
        this["cScalePeer" + i] = this["cScalePeer" + i] || darken$1(this["cScale" + i], 10);
      }
    }
    this.scaleLabelColor = this.scaleLabelColor || (this.darkMode ? "black" : this.labelTextColor);
    this["cScaleLabel0"] = this["cScaleLabel0"] || this.cScale1;
    this["cScaleLabel2"] = this["cScaleLabel2"] || this.cScale1;
    for (let i = 0; i < this.THEME_COLOR_LIMIT; i++) {
      this["cScaleLabel" + i] = this["cScaleLabel" + i] || this.scaleLabelColor;
    }
    for (let i = 0; i < 5; i++) {
      this["surface" + i] = this["surface" + i] || adjust$1(this.mainBkg, { l: -(5 + i * 5) });
      this["surfacePeer" + i] = this["surfacePeer" + i] || adjust$1(this.mainBkg, { l: -(8 + i * 5) });
    }
    this.nodeBkg = this.mainBkg;
    this.nodeBorder = this.border1;
    this.clusterBkg = this.secondBkg;
    this.clusterBorder = this.border2;
    this.defaultLinkColor = this.lineColor;
    this.titleColor = this.text;
    this.actorBorder = lighten$1(this.border1, 23);
    this.actorBkg = this.mainBkg;
    this.actorTextColor = this.text;
    this.actorLineColor = this.lineColor;
    this.signalColor = this.text;
    this.signalTextColor = this.text;
    this.labelBoxBkgColor = this.actorBkg;
    this.labelBoxBorderColor = this.actorBorder;
    this.labelTextColor = this.text;
    this.loopTextColor = this.text;
    this.noteBorderColor = "#999";
    this.noteBkgColor = "#666";
    this.noteTextColor = "#fff";
    this.sectionBkgColor = lighten$1(this.contrast, 30);
    this.sectionBkgColor2 = lighten$1(this.contrast, 30);
    this.taskBorderColor = darken$1(this.contrast, 10);
    this.taskBkgColor = this.contrast;
    this.taskTextColor = this.taskTextLightColor;
    this.taskTextDarkColor = this.text;
    this.taskTextOutsideColor = this.taskTextDarkColor;
    this.activeTaskBorderColor = this.taskBorderColor;
    this.activeTaskBkgColor = this.mainBkg;
    this.gridColor = lighten$1(this.border1, 30);
    this.doneTaskBkgColor = this.done;
    this.doneTaskBorderColor = this.lineColor;
    this.critBkgColor = this.critical;
    this.critBorderColor = darken$1(this.critBkgColor, 10);
    this.todayLineColor = this.critBkgColor;
    this.transitionColor = this.transitionColor || "#000";
    this.transitionLabelColor = this.transitionLabelColor || this.textColor;
    this.stateLabelColor = this.stateLabelColor || this.stateBkg || this.primaryTextColor;
    this.stateBkg = this.stateBkg || this.mainBkg;
    this.labelBackgroundColor = this.labelBackgroundColor || this.stateBkg;
    this.compositeBackground = this.compositeBackground || this.background || this.tertiaryColor;
    this.altBackground = this.altBackground || "#f4f4f4";
    this.compositeTitleBackground = this.compositeTitleBackground || this.mainBkg;
    this.stateBorder = this.stateBorder || "#000";
    this.innerEndBackground = this.primaryBorderColor;
    this.specialStateColor = "#222";
    this.errorBkgColor = this.errorBkgColor || this.tertiaryColor;
    this.errorTextColor = this.errorTextColor || this.tertiaryTextColor;
    this.classText = this.primaryTextColor;
    this.fillType0 = this.primaryColor;
    this.fillType1 = this.secondaryColor;
    this.fillType2 = adjust$1(this.primaryColor, { h: 64 });
    this.fillType3 = adjust$1(this.secondaryColor, { h: 64 });
    this.fillType4 = adjust$1(this.primaryColor, { h: -64 });
    this.fillType5 = adjust$1(this.secondaryColor, { h: -64 });
    this.fillType6 = adjust$1(this.primaryColor, { h: 128 });
    this.fillType7 = adjust$1(this.secondaryColor, { h: 128 });
    for (let i = 0; i < this.THEME_COLOR_LIMIT; i++) {
      this["pie" + i] = this["cScale" + i];
    }
    this.pie12 = this.pie0;
    this.pieTitleTextSize = this.pieTitleTextSize || "25px";
    this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor;
    this.pieSectionTextSize = this.pieSectionTextSize || "17px";
    this.pieSectionTextColor = this.pieSectionTextColor || this.textColor;
    this.pieLegendTextSize = this.pieLegendTextSize || "17px";
    this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor;
    this.pieStrokeColor = this.pieStrokeColor || "black";
    this.pieStrokeWidth = this.pieStrokeWidth || "2px";
    this.pieOpacity = this.pieOpacity || "0.7";
    this.requirementBackground = this.requirementBackground || this.primaryColor;
    this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor;
    this.requirementBorderSize = this.requirementBorderSize || this.primaryBorderColor;
    this.requirementTextColor = this.requirementTextColor || this.primaryTextColor;
    this.relationColor = this.relationColor || this.lineColor;
    this.relationLabelBackground = this.relationLabelBackground || this.edgeLabelBackground;
    this.relationLabelColor = this.relationLabelColor || this.actorTextColor;
    this.git0 = darken$1(this.pie1, 25) || this.primaryColor;
    this.git1 = this.pie2 || this.secondaryColor;
    this.git2 = this.pie3 || this.tertiaryColor;
    this.git3 = this.pie4 || adjust$1(this.primaryColor, { h: -30 });
    this.git4 = this.pie5 || adjust$1(this.primaryColor, { h: -60 });
    this.git5 = this.pie6 || adjust$1(this.primaryColor, { h: -90 });
    this.git6 = this.pie7 || adjust$1(this.primaryColor, { h: 60 });
    this.git7 = this.pie8 || adjust$1(this.primaryColor, { h: 120 });
    this.gitInv0 = this.gitInv0 || invert$1(this.git0);
    this.gitInv1 = this.gitInv1 || invert$1(this.git1);
    this.gitInv2 = this.gitInv2 || invert$1(this.git2);
    this.gitInv3 = this.gitInv3 || invert$1(this.git3);
    this.gitInv4 = this.gitInv4 || invert$1(this.git4);
    this.gitInv5 = this.gitInv5 || invert$1(this.git5);
    this.gitInv6 = this.gitInv6 || invert$1(this.git6);
    this.gitInv7 = this.gitInv7 || invert$1(this.git7);
    this.branchLabelColor = this.branchLabelColor || this.labelTextColor;
    this.gitBranchLabel0 = this.branchLabelColor;
    this.gitBranchLabel1 = "white";
    this.gitBranchLabel2 = this.branchLabelColor;
    this.gitBranchLabel3 = "white";
    this.gitBranchLabel4 = this.branchLabelColor;
    this.gitBranchLabel5 = this.branchLabelColor;
    this.gitBranchLabel6 = this.branchLabelColor;
    this.gitBranchLabel7 = this.branchLabelColor;
    this.tagLabelColor = this.tagLabelColor || this.primaryTextColor;
    this.tagLabelBackground = this.tagLabelBackground || this.primaryColor;
    this.tagLabelBorder = this.tagBorder || this.primaryBorderColor;
    this.tagLabelFontSize = this.tagLabelFontSize || "10px";
    this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor;
    this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor;
    this.commitLabelFontSize = this.commitLabelFontSize || "10px";
    this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || oldAttributeBackgroundColorOdd;
    this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || oldAttributeBackgroundColorEven;
  }
  calculate(overrides) {
    if (typeof overrides !== "object") {
      this.updateColors();
      return;
    }
    const keys = Object.keys(overrides);
    keys.forEach((k) => {
      this[k] = overrides[k];
    });
    this.updateColors();
    keys.forEach((k) => {
      this[k] = overrides[k];
    });
  }
}
const getThemeVariables = (userOverrides) => {
  const theme2 = new Theme5();
  theme2.calculate(userOverrides);
  return theme2;
};
const theme = {
  base: {
    getThemeVariables: getThemeVariables$4
  },
  dark: {
    getThemeVariables: getThemeVariables$3
  },
  default: {
    getThemeVariables: getThemeVariables$2
  },
  forest: {
    getThemeVariables: getThemeVariables$1
  },
  neutral: {
    getThemeVariables
  }
};
const config = {
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
  themeVariables: theme["default"].getThemeVariables(),
  themeCSS: void 0,
  /* **maxTextSize** - The maximum allowed size of the users text diagram */
  maxTextSize: 5e4,
  darkMode: false,
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
  startOnLoad: true,
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
  arrowMarkerAbsolute: false,
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
  deterministicIds: false,
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
    htmlLabels: true,
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
    useMaxWidth: true,
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
    hideUnusedParticipants: false,
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
    mirrorActors: true,
    /**
     * | Parameter  | Description                                                             | Type    | Required | Values      |
     * | ---------- | ----------------------------------------------------------------------- | ------- | -------- | ----------- |
     * | forceMenus | forces actor popup menus to always be visible (to support E2E testing). | Boolean | Required | True, False |
     *
     * **Notes:**
     *
     * Default value: false.
     */
    forceMenus: false,
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
    useMaxWidth: true,
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
    rightAngles: false,
    /**
     * | Parameter           | Description                     | Type    | Required | Values      |
     * | ------------------- | ------------------------------- | ------- | -------- | ----------- |
     * | showSequenceNumbers | This will show the node numbers | boolean | Required | true, false |
     *
     * **Notes:** Default value: false
     */
    showSequenceNumbers: false,
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
    wrap: false,
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
    useMaxWidth: true,
    /**
     * | Parameter | Description | Type    | Required | Values      |
     * | --------- | ----------- | ------- | -------- | ----------- |
     * | topAxis   | See notes   | Boolean | 4        | True, False |
     *
     * **Notes:** when this flag is set date labels will be added to the top of the chart
     *
     * **Default value false**.
     */
    topAxis: false,
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
    useMaxWidth: true,
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
    rightAngles: false,
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
    useMaxWidth: true,
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
    rightAngles: false,
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
    disableMulticolor: false
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
    arrowMarkerAbsolute: false,
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
    useMaxWidth: true,
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
    useMaxWidth: true,
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
    useMaxWidth: true
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
    useMaxWidth: true
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
    useMaxWidth: true,
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
    showCommitLabel: true,
    showBranches: true,
    rotateCommitLabel: true
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
    useMaxWidth: true,
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
    wrap: true,
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
    useMaxWidth: true,
    padding: 10,
    maxNodeWidth: 200
  },
  fontSize: 16
};
if (config.class) {
  config.class.arrowMarkerAbsolute = config.arrowMarkerAbsolute;
}
if (config.gitGraph) {
  config.gitGraph.arrowMarkerAbsolute = config.arrowMarkerAbsolute;
}
const keyify = (obj, prefix = "") => Object.keys(obj).reduce((res, el) => {
  if (Array.isArray(obj[el])) {
    return res;
  } else if (typeof obj[el] === "object" && obj[el] !== null) {
    return [...res, prefix + el, ...keyify(obj[el], "")];
  }
  return [...res, prefix + el];
}, []);
const configKeys = keyify(config, "");
const config$1 = config;
const assignWithDepth = function(dst, src, config2) {
  const { depth, clobber } = Object.assign({ depth: 2, clobber: false }, config2);
  if (Array.isArray(src) && !Array.isArray(dst)) {
    src.forEach((s) => assignWithDepth(dst, s, config2));
    return dst;
  } else if (Array.isArray(src) && Array.isArray(dst)) {
    src.forEach((s) => {
      if (!dst.includes(s)) {
        dst.push(s);
      }
    });
    return dst;
  }
  if (dst === void 0 || depth <= 0) {
    if (dst !== void 0 && dst !== null && typeof dst === "object" && typeof src === "object") {
      return Object.assign(dst, src);
    } else {
      return src;
    }
  }
  if (src !== void 0 && typeof dst === "object" && typeof src === "object") {
    Object.keys(src).forEach((key) => {
      if (typeof src[key] === "object" && (dst[key] === void 0 || typeof dst[key] === "object")) {
        if (dst[key] === void 0) {
          dst[key] = Array.isArray(src[key]) ? [] : {};
        }
        dst[key] = assignWithDepth(dst[key], src[key], { depth: depth - 1, clobber });
      } else if (clobber || typeof dst[key] !== "object" && typeof src[key] !== "object") {
        dst[key] = src[key];
      }
    });
  }
  return dst;
};
const assignWithDepth$1 = assignWithDepth;
const defaultConfig = Object.freeze(config$1);
let siteConfig = assignWithDepth$1({}, defaultConfig);
let configFromInitialize;
let directives = [];
let currentConfig = assignWithDepth$1({}, defaultConfig);
const updateCurrentConfig = (siteCfg, _directives) => {
  let cfg = assignWithDepth$1({}, siteCfg);
  let sumOfDirectives = {};
  for (const d of _directives) {
    sanitize(d);
    sumOfDirectives = assignWithDepth$1(sumOfDirectives, d);
  }
  cfg = assignWithDepth$1(cfg, sumOfDirectives);
  if (sumOfDirectives.theme && sumOfDirectives.theme in theme) {
    const tmpConfigFromInitialize = assignWithDepth$1({}, configFromInitialize);
    const themeVariables = assignWithDepth$1(
      tmpConfigFromInitialize.themeVariables || {},
      sumOfDirectives.themeVariables
    );
    if (cfg.theme && cfg.theme in theme) {
      cfg.themeVariables = theme[cfg.theme].getThemeVariables(themeVariables);
    }
  }
  currentConfig = cfg;
  checkConfig(currentConfig);
  return currentConfig;
};
const setSiteConfig = (conf) => {
  siteConfig = assignWithDepth$1({}, defaultConfig);
  siteConfig = assignWithDepth$1(siteConfig, conf);
  if (conf.theme && theme[conf.theme]) {
    siteConfig.themeVariables = theme[conf.theme].getThemeVariables(conf.themeVariables);
  }
  updateCurrentConfig(siteConfig, directives);
  return siteConfig;
};
const saveConfigFromInitialize = (conf) => {
  configFromInitialize = assignWithDepth$1({}, conf);
};
const updateSiteConfig = (conf) => {
  siteConfig = assignWithDepth$1(siteConfig, conf);
  updateCurrentConfig(siteConfig, directives);
  return siteConfig;
};
const getSiteConfig = () => {
  return assignWithDepth$1({}, siteConfig);
};
const setConfig = (conf) => {
  checkConfig(conf);
  assignWithDepth$1(currentConfig, conf);
  return getConfig();
};
const getConfig = () => {
  return assignWithDepth$1({}, currentConfig);
};
const sanitize = (options) => {
  ["secure", ...siteConfig.secure ?? []].forEach((key) => {
    if (options[key] !== void 0) {
      log.debug(`Denied attempt to modify a secure key ${key}`, options[key]);
      delete options[key];
    }
  });
  Object.keys(options).forEach((key) => {
    if (key.indexOf("__") === 0) {
      delete options[key];
    }
  });
  Object.keys(options).forEach((key) => {
    if (typeof options[key] === "string" && (options[key].includes("<") || options[key].includes(">") || options[key].includes("url(data:"))) {
      delete options[key];
    }
    if (typeof options[key] === "object") {
      sanitize(options[key]);
    }
  });
};
const addDirective = (directive) => {
  if (directive.fontFamily) {
    if (!directive.themeVariables) {
      directive.themeVariables = { fontFamily: directive.fontFamily };
    } else {
      if (!directive.themeVariables.fontFamily) {
        directive.themeVariables = { fontFamily: directive.fontFamily };
      }
    }
  }
  directives.push(directive);
  updateCurrentConfig(siteConfig, directives);
};
const reset = (config2 = siteConfig) => {
  directives = [];
  updateCurrentConfig(config2, directives);
};
var ConfigWarning = /* @__PURE__ */ ((ConfigWarning2) => {
  ConfigWarning2["LAZY_LOAD_DEPRECATED"] = "The configuration options lazyLoadedDiagrams and loadExternalDiagramsAtStartup are deprecated. Please use registerExternalDiagrams instead.";
  return ConfigWarning2;
})(ConfigWarning || {});
const issuedWarnings = {};
const issueWarning = (warning) => {
  if (issuedWarnings[warning]) {
    return;
  }
  log.warn(ConfigWarning[warning]);
  issuedWarnings[warning] = true;
};
const checkConfig = (config2) => {
  if (!config2) {
    return;
  }
  if (config2.lazyLoadedDiagrams || config2.loadExternalDiagramsAtStartup) {
    issueWarning("LAZY_LOAD_DEPRECATED");
  }
};
export {
  interpolateNumber as A,
  color as B,
  Color$2 as C,
  interpolateRgb as D,
  interpolateString as E,
  nogamma as F,
  hue as G,
  moment as H,
  lighten$1 as I,
  darken$1 as J,
  Color$1 as K,
  getDefaultExportFromCjs as L,
  commonjsGlobal as M,
  commonjsRequire as N,
  Rgb as R,
  Selection$1 as S,
  _,
  addDirective as a,
  sanitizeText as b,
  assignWithDepth$1 as c,
  configKeys as d,
  common as e,
  select as f,
  getConfig as g,
  setConfig as h,
  getSiteConfig as i,
  defaultConfig as j,
  evaluate as k,
  log as l,
  saveConfigFromInitialize as m,
  setSiteConfig as n,
  root as o,
  purify as p,
  array as q,
  reset as r,
  setLogLevel as s,
  theme as t,
  updateSiteConfig as u,
  parseGenericTypes as v,
  define as w,
  extend as x,
  rgbConvert as y,
  constant as z
};
//# sourceMappingURL=config-69acf485.js.map
