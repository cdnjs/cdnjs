(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

(function () {
  function t(t, n) {
    var e = t.split("."),
        r = q;e[0] in r || !r.execScript || r.execScript("var " + e[0]);for (var i; e.length && (i = e.shift());) {
      e.length || void 0 === n ? r = r[i] ? r[i] : r[i] = {} : r[i] = n;
    }
  }function n(t, n) {
    function e() {}e.prototype = n.prototype, t.M = n.prototype, t.prototype = new e(), t.prototype.constructor = t, t.N = function (t, e, r) {
      for (var i = Array(arguments.length - 2), a = 2; a < arguments.length; a++) {
        i[a - 2] = arguments[a];
      }return n.prototype[e].apply(t, i);
    };
  }function e(t, n) {
    null != t && this.a.apply(this, arguments);
  }function r(t) {
    t.b = "";
  }function i(t, n) {
    t.sort(n || a);
  }function a(t, n) {
    return t > n ? 1 : n > t ? -1 : 0;
  }function l(t) {
    var n,
        e = [],
        r = 0;for (n in t) {
      e[r++] = t[n];
    }return e;
  }function u(t, n) {
    this.b = t, this.a = {};for (var e = 0; e < n.length; e++) {
      var r = n[e];this.a[r.b] = r;
    }
  }function o(t) {
    return t = l(t.a), i(t, function (t, n) {
      return t.b - n.b;
    }), t;
  }function s(t, n) {
    switch (this.b = t, this.g = !!n.G, this.a = n.c, this.j = n.type, this.h = !1, this.a) {case k:case J:case K:case L:case O:case Y:case T:
        this.h = !0;}this.f = n.defaultValue;
  }function f() {
    this.a = {}, this.f = this.i().a, this.b = this.g = null;
  }function c(t, n) {
    for (var e = o(t.i()), r = 0; r < e.length; r++) {
      var i = e[r],
          a = i.b;if (null != n.a[a]) {
        t.b && delete t.b[i.b];var l = 11 == i.a || 10 == i.a;if (i.g) for (var i = p(n, a) || [], u = 0; u < i.length; u++) {
          var s = t,
              f = a,
              h = l ? i[u].clone() : i[u];s.a[f] || (s.a[f] = []), s.a[f].push(h), s.b && delete s.b[f];
        } else i = p(n, a), l ? (l = p(t, a)) ? c(l, i) : b(t, a, i.clone()) : b(t, a, i);
      }
    }
  }function p(t, n) {
    var e = t.a[n];if (null == e) return null;if (t.g) {
      if (!(n in t.b)) {
        var r = t.g,
            i = t.f[n];if (null != e) if (i.g) {
          for (var a = [], l = 0; l < e.length; l++) {
            a[l] = r.b(i, e[l]);
          }e = a;
        } else e = r.b(i, e);return t.b[n] = e;
      }return t.b[n];
    }return e;
  }function h(t, n, e) {
    var r = p(t, n);return t.f[n].g ? r[e || 0] : r;
  }function g(t, n) {
    var e;if (null != t.a[n]) e = h(t, n, void 0);else t: {
      if (e = t.f[n], void 0 === e.f) {
        var r = e.j;if (r === Boolean) e.f = !1;else if (r === Number) e.f = 0;else {
          if (r !== String) {
            e = new r();break t;
          }e.f = e.h ? "0" : "";
        }
      }e = e.f;
    }return e;
  }function m(t, n) {
    return t.f[n].g ? null != t.a[n] ? t.a[n].length : 0 : null != t.a[n] ? 1 : 0;
  }function b(t, n, e) {
    t.a[n] = e, t.b && (t.b[n] = e);
  }function d(t, n) {
    var e,
        r = [];for (e in n) {
      0 != e && r.push(new s(e, n[e]));
    }return new u(t, r);
  } /*
    Protocol Buffer 2 Copyright 2008 Google Inc.
    All other code copyright its respective owners.
    Copyright (C) 2010 The Libphonenumber Authors
    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
    */
  function y() {
    f.call(this);
  }function v() {
    f.call(this);
  }function _() {
    f.call(this);
  }function S() {}function $() {}function w() {} /*
                                                 Copyright (C) 2010 The Libphonenumber Authors.
                                                 Licensed under the Apache License, Version 2.0 (the "License");
                                                 you may not use this file except in compliance with the License.
                                                 You may obtain a copy of the License at
                                                 http://www.apache.org/licenses/LICENSE-2.0
                                                 Unless required by applicable law or agreed to in writing, software
                                                 distributed under the License is distributed on an "AS IS" BASIS,
                                                 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                 See the License for the specific language governing permissions and
                                                 limitations under the License.
                                                 */
  function x() {
    this.a = {};
  }function A(t, n) {
    if (null == n) return null;n = n.toUpperCase();var e = t.a[n];if (null == e) {
      if (e = tt[n], null == e) return null;e = new w().a(_.i(), e), t.a[n] = e;
    }return e;
  }function N(t) {
    return t = W[t], null == t ? "ZZ" : t[0];
  }function j(t) {
    this.H = RegExp(" "), this.B = "", this.m = new e(), this.v = "", this.h = new e(), this.u = new e(), this.j = !0, this.w = this.o = this.D = !1, this.F = x.b(), this.s = 0, this.b = new e(), this.A = !1, this.l = "", this.a = new e(), this.f = [], this.C = t, this.J = this.g = C(this, this.C);
  }function C(t, n) {
    var e;if (null != n && isNaN(n) && n.toUpperCase() in tt) {
      if (e = A(t.F, n), null == e) throw "Invalid region code: " + n;e = g(e, 10);
    } else e = 0;return e = A(t.F, N(e)), null != e ? e : at;
  }function E(t) {
    for (var n = t.f.length, e = 0; n > e; ++e) {
      var i = t.f[e],
          a = g(i, 1);if (t.v == a) return !1;var l;l = t;var u = i,
          o = g(u, 1);if (-1 != o.indexOf("|")) l = !1;else {
        o = o.replace(lt, "\\d"), o = o.replace(ut, "\\d"), r(l.m);var s;s = l;var u = g(u, 2),
            f = "999999999999999".match(o)[0];f.length < s.a.b.length ? s = "" : (s = f.replace(new RegExp(o, "g"), u), s = s.replace(RegExp("9", "g"), " ")), 0 < s.length ? (l.m.a(s), l = !0) : l = !1;
      }if (l) return t.v = a, t.A = st.test(h(i, 4)), t.s = 0, !0;
    }return t.j = !1;
  }function R(t, n) {
    for (var e = [], r = n.length - 3, i = t.f.length, a = 0; i > a; ++a) {
      var l = t.f[a];0 == m(l, 3) ? e.push(t.f[a]) : (l = h(l, 3, Math.min(r, m(l, 3) - 1)), 0 == n.search(l) && e.push(t.f[a]));
    }t.f = e;
  }function F(t, n) {
    t.h.a(n);var e = n;if (rt.test(e) || 1 == t.h.b.length && et.test(e)) {
      var i,
          e = n;"+" == e ? (i = e, t.u.a(e)) : (i = nt[e], t.u.a(i), t.a.a(i)), n = i;
    } else t.j = !1, t.D = !0;if (!t.j) {
      if (!t.D) if (H(t)) {
        if (P(t)) return B(t);
      } else if (0 < t.l.length && (e = t.a.toString(), r(t.a), t.a.a(t.l), t.a.a(e), e = t.b.toString(), i = e.lastIndexOf(t.l), r(t.b), t.b.a(e.substring(0, i))), t.l != G(t)) return t.b.a(" "), B(t);return t.h.toString();
    }switch (t.u.b.length) {case 0:case 1:case 2:
        return t.h.toString();case 3:
        if (!H(t)) return t.l = G(t), U(t);t.w = !0;default:
        return t.w ? (P(t) && (t.w = !1), t.b.toString() + t.a.toString()) : 0 < t.f.length ? (e = V(t, n), i = I(t), 0 < i.length ? i : (R(t, t.a.toString()), E(t) ? M(t) : t.j ? D(t, e) : t.h.toString())) : U(t);}
  }function B(t) {
    return t.j = !0, t.w = !1, t.f = [], t.s = 0, r(t.m), t.v = "", U(t);
  }function I(t) {
    for (var n = t.a.toString(), e = t.f.length, r = 0; e > r; ++r) {
      var i = t.f[r],
          a = g(i, 1);if (new RegExp("^(?:" + a + ")$").test(n)) return t.A = st.test(h(i, 4)), n = n.replace(new RegExp(a, "g"), h(i, 2)), D(t, n);
    }return "";
  }function D(t, n) {
    var e = t.b.b.length;return t.A && e > 0 && " " != t.b.toString().charAt(e - 1) ? t.b + " " + n : t.b + n;
  }function U(t) {
    var n = t.a.toString();if (3 <= n.length) {
      for (var e = t.o && 0 < m(t.g, 20) ? p(t.g, 20) || [] : p(t.g, 19) || [], r = e.length, i = 0; r > i; ++i) {
        var a,
            l = e[i];(a = null == t.g.a[12] || t.o || h(l, 6)) || (a = g(l, 4), a = 0 == a.length || it.test(a)), a && ot.test(g(l, 2)) && t.f.push(l);
      }return R(t, n), n = I(t), 0 < n.length ? n : E(t) ? M(t) : t.h.toString();
    }return D(t, n);
  }function M(t) {
    var n = t.a.toString(),
        e = n.length;if (e > 0) {
      for (var r = "", i = 0; e > i; i++) {
        r = V(t, n.charAt(i));
      }return t.j ? D(t, r) : t.h.toString();
    }return t.b.toString();
  }function G(t) {
    var n,
        e = t.a.toString(),
        i = 0;return 1 != h(t.g, 10) ? n = !1 : (n = t.a.toString(), n = "1" == n.charAt(0) && "0" != n.charAt(1) && "1" != n.charAt(1)), n ? (i = 1, t.b.a("1").a(" "), t.o = !0) : null != t.g.a[15] && (n = new RegExp("^(?:" + h(t.g, 15) + ")"), n = e.match(n), null != n && null != n[0] && 0 < n[0].length && (t.o = !0, i = n[0].length, t.b.a(e.substring(0, i)))), r(t.a), t.a.a(e.substring(i)), e.substring(0, i);
  }function H(t) {
    var n = t.u.toString(),
        e = new RegExp("^(?:\\+|" + h(t.g, 11) + ")"),
        e = n.match(e);return null != e && null != e[0] && 0 < e[0].length ? (t.o = !0, e = e[0].length, r(t.a), t.a.a(n.substring(e)), r(t.b), t.b.a(n.substring(0, e)), "+" != n.charAt(0) && t.b.a(" "), !0) : !1;
  }function P(t) {
    if (0 == t.a.b.length) return !1;var n,
        i = new e();t: {
      if (n = t.a.toString(), 0 != n.length && "0" != n.charAt(0)) for (var a, l = n.length, u = 1; 3 >= u && l >= u; ++u) {
        if (a = parseInt(n.substring(0, u), 10), a in W) {
          i.a(n.substring(u)), n = a;break t;
        }
      }n = 0;
    }return 0 == n ? !1 : (r(t.a), t.a.a(i.toString()), i = N(n), "001" == i ? t.g = A(t.F, "" + n) : i != t.C && (t.g = C(t, i)), t.b.a("" + n).a(" "), t.l = "", !0);
  }function V(t, n) {
    var e = t.m.toString();if (0 <= e.substring(t.s).search(t.H)) {
      var i = e.search(t.H),
          e = e.replace(t.H, n);return r(t.m), t.m.a(e), t.s = i, e.substring(0, t.s + 1);
    }return 1 == t.f.length && (t.j = !1), t.v = "", t.h.toString();
  }var q = this;e.prototype.b = "", e.prototype.set = function (t) {
    this.b = "" + t;
  }, e.prototype.a = function (t, n, e) {
    if (this.b += String(t), null != n) for (var r = 1; r < arguments.length; r++) {
      this.b += arguments[r];
    }return this;
  }, e.prototype.toString = function () {
    return this.b;
  };var T = 1,
      Y = 2,
      k = 3,
      J = 4,
      K = 6,
      L = 16,
      O = 18;f.prototype.set = function (t, n) {
    b(this, t.b, n);
  }, f.prototype.clone = function () {
    var t = new this.constructor();return t != this && (t.a = {}, t.b && (t.b = {}), c(t, this)), t;
  };var Z;n(y, f);var z;n(v, f);var X;n(_, f), y.prototype.i = function () {
    return Z || (Z = d(y, { 0: { name: "NumberFormat", I: "i18n.phonenumbers.NumberFormat" }, 1: { name: "pattern", required: !0, c: 9, type: String }, 2: { name: "format", required: !0, c: 9, type: String }, 3: { name: "leading_digits_pattern", G: !0, c: 9, type: String }, 4: { name: "national_prefix_formatting_rule", c: 9, type: String }, 6: { name: "national_prefix_optional_when_formatting", c: 8, type: Boolean }, 5: { name: "domestic_carrier_code_formatting_rule", c: 9, type: String } })), Z;
  }, y.ctor = y, y.ctor.i = y.prototype.i, v.prototype.i = function () {
    return z || (z = d(v, { 0: { name: "PhoneNumberDesc", I: "i18n.phonenumbers.PhoneNumberDesc" }, 2: { name: "national_number_pattern", c: 9, type: String }, 3: { name: "possible_number_pattern", c: 9, type: String }, 6: { name: "example_number", c: 9, type: String }, 7: { name: "national_number_matcher_data", c: 12, type: String }, 8: { name: "possible_number_matcher_data", c: 12, type: String } })), z;
  }, v.ctor = v, v.ctor.i = v.prototype.i, _.prototype.i = function () {
    return X || (X = d(_, { 0: { name: "PhoneMetadata", I: "i18n.phonenumbers.PhoneMetadata" }, 1: { name: "general_desc", c: 11, type: v }, 2: { name: "fixed_line", c: 11, type: v }, 3: { name: "mobile", c: 11, type: v }, 4: { name: "toll_free", c: 11, type: v }, 5: { name: "premium_rate", c: 11, type: v }, 6: { name: "shared_cost", c: 11, type: v }, 7: { name: "personal_number", c: 11, type: v }, 8: { name: "voip", c: 11, type: v }, 21: { name: "pager", c: 11, type: v }, 25: { name: "uan", c: 11, type: v }, 27: { name: "emergency", c: 11, type: v }, 28: { name: "voicemail", c: 11, type: v }, 24: { name: "no_international_dialling", c: 11, type: v }, 9: { name: "id", required: !0, c: 9, type: String }, 10: { name: "country_code", c: 5, type: Number }, 11: { name: "international_prefix", c: 9, type: String }, 17: { name: "preferred_international_prefix", c: 9, type: String }, 12: { name: "national_prefix", c: 9, type: String }, 13: { name: "preferred_extn_prefix", c: 9, type: String }, 15: { name: "national_prefix_for_parsing", c: 9, type: String }, 16: { name: "national_prefix_transform_rule", c: 9, type: String }, 18: { name: "same_mobile_and_fixed_line_pattern", c: 8, defaultValue: !1, type: Boolean }, 19: { name: "number_format", G: !0, c: 11, type: y }, 20: { name: "intl_number_format", G: !0, c: 11, type: y }, 22: { name: "main_country_for_code", c: 8, defaultValue: !1, type: Boolean }, 23: { name: "leading_digits", c: 9, type: String }, 26: { name: "leading_zero_possible", c: 8, defaultValue: !1, type: Boolean } })), X;
  }, _.ctor = _, _.ctor.i = _.prototype.i, S.prototype.a = function (t) {
    throw new t.b(), Error("Unimplemented");
  }, S.prototype.b = function (t, n) {
    if (11 == t.a || 10 == t.a) return n instanceof f ? n : this.a(t.j.prototype.i(), n);if (14 == t.a) {
      if ("string" == typeof n && Q.test(n)) {
        var e = Number(n);if (e > 0) return e;
      }return n;
    }if (!t.h) return n;if (e = t.j, e === String) {
      if ("number" == typeof n) return String(n);
    } else if (e === Number && "string" == typeof n && ("Infinity" === n || "-Infinity" === n || "NaN" === n || Q.test(n))) return Number(n);return n;
  };var Q = /^-?[0-9]+$/;n($, S), $.prototype.a = function (t, n) {
    var e = new t.b();return e.g = this, e.a = n, e.b = {}, e;
  }, n(w, $), w.prototype.b = function (t, n) {
    return 8 == t.a ? !!n : S.prototype.b.apply(this, arguments);
  }, w.prototype.a = function (t, n) {
    return w.M.a.call(this, t, n);
  }; /*
     Copyright (C) 2010 The Libphonenumber Authors
     Licensed under the Apache License, Version 2.0 (the "License");
     you may not use this file except in compliance with the License.
     You may obtain a copy of the License at
     http://www.apache.org/licenses/LICENSE-2.0
     Unless required by applicable law or agreed to in writing, software
     distributed under the License is distributed on an "AS IS" BASIS,
     WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     See the License for the specific language governing permissions and
     limitations under the License.
     */
  var W = { 61: ["AU", "CC", "CX"] },
      tt = { AU: [null, [null, null, "[1-578]\\d{5,9}", "\\d{6,10}"], [null, null, "[237]\\d{8}|8(?:[6-8]\\d{3}|9(?:[02-9]\\d{2}|1(?:[0-57-9]\\d|6[0135-9])))\\d{4}", "\\d{8,9}", null, null, "212345678"], [null, null, "14(?:5\\d|71)\\d{5}|4(?:[0-3]\\d|4[47-9]|5[0-25-9]|6[6-9]|7[02-9]|8[147-9]|9[017-9])\\d{6}", "\\d{9}", null, null, "412345678"], [null, null, "180(?:0\\d{3}|2)\\d{3}", "\\d{7,10}", null, null, "1800123456"], [null, null, "19(?:0[0126]\\d|[679])\\d{5}", "\\d{8,10}", null, null, "1900123456"], [null, null, "13(?:00\\d{3}|45[0-4]|\\d)\\d{3}", "\\d{6,10}", null, null, "1300123456"], [null, null, "500\\d{6}", "\\d{9}", null, null, "500123456"], [null, null, "550\\d{6}", "\\d{9}", null, null, "550123456"], "AU", 61, "(?:14(?:1[14]|34|4[17]|[56]6|7[47]|88))?001[14-689]", "0", null, null, "0", null, "0011", null, [[null, "([2378])(\\d{4})(\\d{4})", "$1 $2 $3", ["[2378]"], "(0$1)"], [null, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[45]|14"], "0$1"], [null, "(16)(\\d{3})(\\d{2,4})", "$1 $2 $3", ["16"], "0$1"], [null, "(1[389]\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["1(?:[38]0|90)", "1(?:[38]00|90)"], "$1"], [null, "(180)(2\\d{3})", "$1 $2", ["180", "1802"], "$1"], [null, "(19\\d)(\\d{3})", "$1 $2", ["19[13]"], "$1"], [null, "(19\\d{2})(\\d{4})", "$1 $2", ["19[679]"], "$1"], [null, "(13)(\\d{2})(\\d{2})", "$1 $2 $3", ["13[1-9]"], "$1"]], null, [null, null, "16\\d{3,7}", "\\d{5,9}", null, null, "1612345"], 1, null, [null, null, "1(?:3(?:00\\d{3}|45[0-4]|\\d)\\d{3}|80(?:0\\d{6}|2\\d{3}))", "\\d{6,10}", null, null, "1300123456"], [null, null, "NA", "NA"], null, null, [null, null, "NA", "NA"]] };x.b = function () {
    return x.a ? x.a : x.a = new x();
  };var nt = { 0: "0", 1: "1", 2: "2", 3: "3", 4: "4", 5: "5", 6: "6", 7: "7", 8: "8", 9: "9", "０": "0", "１": "1", "２": "2", "３": "3", "４": "4", "５": "5", "６": "6", "７": "7", "８": "8", "９": "9", "٠": "0", "١": "1", "٢": "2", "٣": "3", "٤": "4", "٥": "5", "٦": "6", "٧": "7", "٨": "8", "٩": "9", "۰": "0", "۱": "1", "۲": "2", "۳": "3", "۴": "4", "۵": "5", "۶": "6", "۷": "7", "۸": "8", "۹": "9" },
      et = RegExp("[+＋]+"),
      rt = RegExp("([0-9０-９٠-٩۰-۹])"),
      it = /^\(?\$1\)?$/,
      at = new _();b(at, 11, "NA");var lt = /\[([^\[\]])*\]/g,
      ut = /\d(?=[^,}][^,}])/g,
      ot = RegExp("^[-x‐-―−ー－-／  ­​⁠　()（）［］.\\[\\]/~⁓∼～]*(\\$\\d[-x‐-―−ー－-／  ­​⁠　()（）［］.\\[\\]/~⁓∼～]*)+$"),
      st = /[- ]/;j.prototype.K = function () {
    this.B = "", r(this.h), r(this.u), r(this.m), this.s = 0, this.v = "", r(this.b), this.l = "", r(this.a), this.j = !0, this.w = this.o = this.D = !1, this.f = [], this.A = !1, this.g != this.J && (this.g = C(this, this.C));
  }, j.prototype.L = function (t) {
    return this.B = F(this, t);
  }, t("Cleave.AsYouTypeFormatter", j), t("Cleave.AsYouTypeFormatter.prototype.inputDigit", j.prototype.L), t("Cleave.AsYouTypeFormatter.prototype.clear", j.prototype.K);
}).call(window);

},{}],2:[function(require,module,exports){
(function (global){
'use strict';

var _react = typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null;

var _react2 = _interopRequireDefault(_react);

var _reactDom = typeof window !== "undefined" ? window['ReactDOM'] : typeof global !== "undefined" ? global['ReactDOM'] : null;

var _reactDom2 = _interopRequireDefault(_reactDom);

var _react3 = require('../../cleave.js/react');

var _react4 = _interopRequireDefault(_react3);

var _cleavePhone = require('../../cleave.js/dist/addons/cleave-phone.au');

var _cleavePhone2 = _interopRequireDefault(_cleavePhone);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

//var React = require('react');
//var ReactDOM = require('react-dom');

var YourComponent = _react2.default.createClass({
    displayName: 'YourComponent',

    getInitialState: function getInitialState() {
        return {
            creditCardType: '',
            numeralValue: '',
            phoneRegionCode: 'AU'
        };
    },

    onRegionChange: function onRegionChange(code) {
        this.setState({ phoneRegionCode: code });
    },

    onNumeralChange: function onNumeralChange(event) {
        this.setState({ numeralValue: event.target.rawValue });
    },

    onCreditCardTypeChanged: function onCreditCardTypeChanged(type) {
        this.setState({ creditCardType: type });
    },

    render: function render() {
        return _react2.default.createElement('div', null, _react2.default.createElement(_react4.default, { placeholder: 'credit card',
            options: { creditCard: true, onCreditCardTypeChanged: this.onCreditCardTypeChanged } }), _react2.default.createElement('div', null, this.state.creditCardType), _react2.default.createElement('button', { onClick: this.onRegionChange.bind(this, 'CN') }, 'CN'), _react2.default.createElement('button', { onClick: this.onRegionChange.bind(this, 'AU') }, 'AU'), _react2.default.createElement(_react4.default, { options: { phone: true, phoneRegionCode: this.state.phoneRegionCode } }), _react2.default.createElement(_react4.default, { options: { date: true } }), _react2.default.createElement(_react4.default, { className: 'input-numeral', value: '123//456', onChange: this.onNumeralChange,
            options: { numeral: true } }), _react2.default.createElement('div', null, this.state.numeralValue));
    }
});

_reactDom2.default.render(_react2.default.createElement(YourComponent, null), document.getElementById('content'));

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../../cleave.js/dist/addons/cleave-phone.au":1,"../../cleave.js/react":3}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Cleave = require('./src/Cleave.react');

var _Cleave2 = _interopRequireDefault(_Cleave);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = _Cleave2.default;

},{"./src/Cleave.react":4}],4:[function(require,module,exports){
(function (global){
'use strict';

var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }return target;
};

function _objectWithoutProperties(obj, keys) {
    var target = {};for (var i in obj) {
        if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
    }return target;
}

var React = typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null;

var NumeralFormatter = require('./shortcuts/NumeralFormatter');
var DateFormatter = require('./shortcuts/DateFormatter');
var PhoneFormatter = require('./shortcuts/PhoneFormatter');
var CreditCardDetector = require('./shortcuts/CreditCardDetector');
var Util = require('./utils/Util');
var DefaultProperties = require('./common/DefaultProperties');

var Cleave = React.createClass({
    displayName: 'Cleave',

    componentDidMount: function componentDidMount() {
        this.init();
    },

    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        var owner = this,
            phoneRegionCode = nextProps.options.phoneRegionCode;

        // update phone region code
        if (phoneRegionCode && phoneRegionCode !== owner.properties.phoneRegionCode) {
            owner.properties.phoneRegionCode = phoneRegionCode;
            owner.initPhoneFormatter();
            owner.onInput(owner.properties.result);
        }
    },

    getInitialState: function getInitialState() {
        var owner = this;
        var _owner$props = owner.props;
        var value = _owner$props.value;
        var options = _owner$props.options;
        var onKeydown = _owner$props.onKeydown;
        var onChange = _owner$props.onChange;

        var other = _objectWithoutProperties(_owner$props, ['value', 'options', 'onKeydown', 'onChange']);

        owner.registeredEvents = {
            onChange: onChange || Util.noop,
            onKeydown: onKeydown || Util.noop
        };

        options.initValue = value;

        owner.properties = DefaultProperties.assign({}, options);

        return {
            other: other,
            value: owner.properties.result
        };
    },

    init: function init() {
        var owner = this,
            pps = owner.properties;

        // so no need for this lib at all
        if (!pps.numeral && !pps.phone && !pps.creditCard && !pps.date && pps.blocks.length === 0) {
            return;
        }

        pps.maxLength = Util.getMaxLength(pps.blocks);

        owner.initPhoneFormatter();
        owner.initDateFormatter();
        owner.initNumeralFormatter();

        owner.onInput(pps.initValue);
    },

    initNumeralFormatter: function initNumeralFormatter() {
        var owner = this,
            pps = owner.properties;

        if (!pps.numeral) {
            return;
        }

        pps.numeralFormatter = new NumeralFormatter(pps.numeralDecimalMark, pps.numeralDecimalScale, pps.numeralThousandsGroupStyle, pps.delimiter);
    },

    initDateFormatter: function initDateFormatter() {
        var owner = this,
            pps = owner.properties;

        if (!pps.date) {
            return;
        }

        pps.dateFormatter = new DateFormatter(pps.datePattern);
        pps.blocks = pps.dateFormatter.getBlocks();
        pps.blocksLength = pps.blocks.length;
        pps.maxLength = Util.getMaxLength(pps.blocks);
    },

    initPhoneFormatter: function initPhoneFormatter() {
        var owner = this,
            pps = owner.properties;

        if (!pps.phone) {
            return;
        }

        // Cleave.AsYouTypeFormatter should be provided by
        // external google closure lib
        try {
            pps.phoneFormatter = new PhoneFormatter(new window.Cleave.AsYouTypeFormatter(pps.phoneRegionCode), pps.delimiter);
        } catch (ex) {
            throw new Error('Please include phone-type-formatter.{country}.js lib');
        }
    },

    onKeydown: function onKeydown(event) {
        var owner = this,
            pps = owner.properties,
            charCode = event.which || event.keyCode;

        // hit backspace when last character is delimiter
        if (charCode === 8 && pps.result.slice(-1) === pps.delimiter) {
            pps.backspace = true;
        } else {
            pps.backspace = false;
        }

        owner.registeredEvents.onKeydown(event);
    },

    onChange: function onChange(event) {
        var owner = this,
            pps = owner.properties;

        owner.onInput(event.target.value);

        event.target.rawValue = Util.strip(pps.result, pps.delimiterRE);

        owner.registeredEvents.onChange(event);
    },

    onInput: function onInput(value) {
        var owner = this,
            pps = owner.properties,
            prev = pps.result,
            creditCardInfo;

        // case 1: delete one more character "4"
        // 1234*| -> hit backspace -> 123|
        // case 2: last character is not delimiter which is:
        // 12|34* -> hit backspace -> 1|34*

        if (pps.backspace && value.slice(-1) !== pps.delimiter) {
            value = Util.headStr(value, value.length - 1);
        }

        // phone formatter
        if (pps.phone) {
            pps.result = pps.phoneFormatter.format(value);
            owner.updateValueState();

            return;
        }

        // numeral formatter
        if (pps.numeral) {
            pps.result = pps.numeralFormatter.format(value);
            owner.updateValueState();

            return;
        }

        // date
        if (pps.date) {
            value = pps.dateFormatter.getValidatedDate(value);
        }

        // strip delimiters
        value = Util.strip(value, pps.delimiterRE);

        // prefix
        value = Util.getPrefixAppliedValue(value, pps.prefix);

        // strip non-numeric characters
        if (pps.numericOnly) {
            value = Util.strip(value, /[^\d]/g);
        }

        // update credit card blocks
        // and at least one of first 4 characters has changed
        if (pps.creditCard && Util.headStr(pps.result, 4) !== Util.headStr(value, 4)) {
            creditCardInfo = CreditCardDetector.getInfo(value, pps.creditCardStrictMode);

            pps.blocks = creditCardInfo.blocks;
            pps.blocksLength = pps.blocks.length;
            pps.maxLength = Util.getMaxLength(pps.blocks);

            // credit card type changed
            if (pps.creditCardType !== creditCardInfo.type) {
                pps.creditCardType = creditCardInfo.type;

                pps.onCreditCardTypeChanged.call(owner, pps.creditCardType);
            }
        }

        // strip over length characters
        value = Util.headStr(value, pps.maxLength);

        // convert case
        value = pps.uppercase ? value.toUpperCase() : value;
        value = pps.lowercase ? value.toLowerCase() : value;

        // apply blocks
        pps.result = Util.getFormattedValue(value, pps.blocks, pps.blocksLength, pps.delimiter);

        // nothing changed
        // prevent update value to avoid caret position change
        if (prev === pps.result) {
            return;
        }

        owner.updateValueState();
    },

    updateValueState: function updateValueState() {
        this.setState({ value: this.properties.result });
    },

    render: function render() {
        var owner = this;

        return React.createElement('input', _extends({ type: 'text' }, owner.state.other, {
            value: owner.state.value,
            onKeydown: owner.onKeydown,
            onChange: owner.onChange }));
    }
});

module.exports = window.Cleave = Cleave;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./common/DefaultProperties":5,"./shortcuts/CreditCardDetector":6,"./shortcuts/DateFormatter":7,"./shortcuts/NumeralFormatter":8,"./shortcuts/PhoneFormatter":9,"./utils/Util":10}],5:[function(require,module,exports){
'use strict';

/**
 * Props Assignment
 *
 * Separate this, so react module can share the usage
 */

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

var DefaultProperties = {
    // Maybe change to object-assign
    // for now just keep it as simple
    assign: function assign(target, opts) {
        target = target || {};
        opts = opts || {};

        // credit card
        target.creditCard = !!opts.creditCard;
        target.creditCardStrictMode = !!opts.creditCardStrictMode;
        target.creditCardType = '';
        target.onCreditCardTypeChanged = opts.onCreditCardTypeChanged || function () {};

        // phone
        target.phone = !!opts.phone;
        target.phoneRegionCode = opts.phoneRegionCode || 'AU';
        target.phoneFormatter = {};

        // date
        target.date = !!opts.date;
        target.datePattern = opts.datePattern || ['d', 'm', 'Y'];
        target.dateFormatter = {};

        // numeral
        target.numeral = !!opts.numeral;
        target.numeralDecimalScale = opts.numeralDecimalScale || 2;
        target.numeralDecimalMark = opts.numeralDecimalMark || '.';
        target.numeralThousandsGroupStyle = opts.numeralThousandsGroupStyle || 'thousand';

        // others
        target.initValue = opts.initValue || '';

        target.numericOnly = target.creditCard || target.date || !!opts.numericOnly;

        target.uppercase = !!opts.uppercase;
        target.lowercase = !!opts.lowercase;

        target.prefix = target.creditCard || target.phone || target.date ? '' : opts.prefix || '';

        target.delimiter = opts.delimiter || (target.date ? '/' : target.numeral ? ',' : ' ');
        target.delimiterRE = new RegExp(target.delimiter, 'g');

        target.blocks = opts.blocks || [];
        target.blocksLength = target.blocks.length;

        target.maxLength = 0;

        target.backspace = false;
        target.result = '';

        return target;
    }
};

if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object' && _typeof(module.exports) === 'object') {
    module.exports = exports = DefaultProperties;
}

},{}],6:[function(require,module,exports){
'use strict';

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

var CreditCardDetector = {
    blocks: {
        uatp: [4, 5, 6],
        amex: [4, 6, 5],
        diners: [4, 6, 4],
        mastercard: [4, 4, 4, 4],
        dankort: [4, 4, 4, 4],
        instapayment: [4, 4, 4, 4],
        jcb: [4, 4, 4, 4],
        visa: [4, 4, 4, 4],
        generalLoose: [4, 4, 4, 4],
        generalStrict: [4, 4, 4, 7]
    },

    re: {
        // starts with 1; 15 digits, not starts with 1800 (jcb card)
        uatp: /^(?!1800)1\d{0,14}/,

        // starts with 34/37; 15 digits
        amex: /^3[47]\d{0,13}/,

        // starts with 300-305/309 or 36/38/39; 14 digits
        diners: /^3(?:0([0-5]|9)|[689]\d?)\d{0,11}/,

        // starts with 51-55 or 22-27; 16 digits
        mastercard: /^(5[1-5]|2[2-7])\d{0,14}/,

        // starts with 5019/4175/4571; 16 digits
        dankort: /^(5019|4175|4571)\d{0,12}/,

        // starts with 637-639; 16 digits
        instapayment: /^63[7-9]\d{0,13}/,

        // starts with 2131/1800/35; 16 digits
        jcb: /^(?:2131|1800|35\d{0,2})\d{0,12}/,

        // starts with 4; 16 digits
        visa: /^4\d{0,15}/
    },

    getInfo: function getInfo(value, strictMode) {
        var blocks = CreditCardDetector.blocks,
            re = CreditCardDetector.re;

        // In theory, visa credit card can have up to 19 digits number.
        // Set strictMode to true will remove the 16 max-length restrain,
        // however, I never found any website validate card number like
        // this, hence probably you don't need to enable this option.
        strictMode = !!strictMode;

        if (re.amex.test(value)) {
            return {
                type: 'amex',
                blocks: blocks.amex
            };
        } else if (re.uatp.test(value)) {
            return {
                type: 'uatp',
                blocks: blocks.uatp
            };
        } else if (re.diners.test(value)) {
            return {
                type: 'diners',
                blocks: blocks.diners
            };
        } else if (re.mastercard.test(value)) {
            return {
                type: 'mastercard',
                blocks: blocks.mastercard
            };
        } else if (re.dankort.test(value)) {
            return {
                type: 'dankort',
                blocks: blocks.dankort
            };
        } else if (re.instapayment.test(value)) {
            return {
                type: 'instapayment',
                blocks: blocks.instapayment
            };
        } else if (re.jcb.test(value)) {
            return {
                type: 'jcb',
                blocks: blocks.jcb
            };
        } else if (re.visa.test(value)) {
            return {
                type: 'visa',
                blocks: blocks.visa
            };
        } else if (strictMode) {
            return {
                type: 'unknown',
                blocks: blocks.generalStrict
            };
        } else {
            return {
                type: 'unknown',
                blocks: blocks.generalLoose
            };
        }
    }
};

if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object' && _typeof(module.exports) === 'object') {
    module.exports = exports = CreditCardDetector;
}

},{}],7:[function(require,module,exports){
'use strict';

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

var DateFormatter = function DateFormatter(datePattern) {
    var owner = this;

    owner.blocks = [];
    owner.datePattern = datePattern;
    owner.initBlocks();
};

DateFormatter.prototype = {
    initBlocks: function initBlocks() {
        var owner = this;
        owner.datePattern.forEach(function (value) {
            if (value === 'Y') {
                owner.blocks.push(4);
            } else {
                owner.blocks.push(2);
            }
        });
    },

    getBlocks: function getBlocks() {
        return this.blocks;
    },

    getValidatedDate: function getValidatedDate(value) {
        var owner = this,
            result = '';

        value = value.replace(/[^\d]/g, '');

        owner.blocks.forEach(function (length, index) {
            if (value.length > 0) {
                var sub = value.slice(0, length),
                    rest = value.slice(length);

                switch (owner.datePattern[index]) {
                    case 'd':
                        if (parseInt(sub, 10) > 31) {
                            sub = '31';
                        }
                        break;
                    case 'm':
                        if (parseInt(sub, 10) > 12) {
                            sub = '12';
                        }
                        break;
                }

                result += sub;

                // update remaining string
                value = rest;
            }
        });

        return result;
    }
};

if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object' && _typeof(module.exports) === 'object') {
    module.exports = exports = DateFormatter;
}

},{}],8:[function(require,module,exports){
'use strict';

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

var NumeralFormatter = function NumeralFormatter(numeralDecimalMark, numeralDecimalScale, numeralThousandsGroupStyle, delimiter) {
    var owner = this;

    owner.numeralDecimalMark = numeralDecimalMark || '.';
    owner.numeralDecimalScale = numeralDecimalScale || 2;
    owner.numeralThousandsGroupStyle = numeralThousandsGroupStyle || NumeralFormatter.groupStyle.thousand;
    owner.delimiter = delimiter || ',';
};

NumeralFormatter.groupStyle = {
    thousand: 'thousand',
    lakh: 'lakh',
    wan: 'wan'
};

NumeralFormatter.prototype = {
    format: function format(value) {
        var owner = this,
            parts,
            partInteger,
            partDecimal = '';

        // strip alphabet letters
        value = value.replace(/[A-Za-z]/g, '')

        // replace the first decimal mark with reserved placeholder
        .replace(owner.numeralDecimalMark, 'M')

        // strip the non numeric letters except M
        .replace(/[^\dM]/g, '')

        // replace mark
        .replace('M', owner.numeralDecimalMark)

        // strip leading 0
        .replace(/^(-)?0+(?=\d)/, '$1');

        partInteger = value;

        if (value.indexOf(owner.numeralDecimalMark) >= 0) {
            parts = value.split(owner.numeralDecimalMark);
            partInteger = parts[0];
            partDecimal = owner.numeralDecimalMark + parts[1].slice(0, owner.numeralDecimalScale);
        }

        switch (owner.numeralThousandsGroupStyle) {
            case NumeralFormatter.groupStyle.lakh:
                partInteger = partInteger.replace(/(\d)(?=(\d\d)+\d$)/g, '$1' + owner.delimiter);

                break;

            case NumeralFormatter.groupStyle.wan:
                partInteger = partInteger.replace(/(\d)(?=(\d{4})+$)/g, '$1' + owner.delimiter);

                break;

            default:
                partInteger = partInteger.replace(/(\d)(?=(\d{3})+$)/g, '$1' + owner.delimiter);
        }

        return partInteger.toString() + partDecimal.toString();
    }
};

if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object' && _typeof(module.exports) === 'object') {
    module.exports = exports = NumeralFormatter;
}

},{}],9:[function(require,module,exports){
'use strict';

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

var PhoneFormatter = function PhoneFormatter(formatter, delimiter) {
    var owner = this;

    owner.delimiter = delimiter || ' ';
    owner.delimiterRE = new RegExp(owner.delimiter, 'g');
    owner.formatter = formatter;
};

PhoneFormatter.prototype = {
    setFormatter: function setFormatter(formatter) {
        this.formatter = formatter;
    },

    format: function format(phoneNumber) {
        var owner = this;

        owner.formatter.clear();

        // only keep number and +
        phoneNumber = phoneNumber.replace(/[^\d+]/g, '');

        // strip delimiter
        phoneNumber = phoneNumber.replace(owner.delimiterRE, '');

        var result = '',
            current,
            validated = false;

        for (var i = 0, iMax = phoneNumber.length; i < iMax; i++) {
            current = owner.formatter.inputDigit(phoneNumber.charAt(i));

            // has ()- or space inside
            if (/[\s()-]/g.test(current)) {
                result = current;

                validated = true;
            } else {
                if (!validated) {
                    result = current;
                }
                // else: over length input
                // it turns to invalid number again
            }
        }

        // strip ()
        // e.g. US: 7161234567 returns (716) 123-4567
        result = result.replace(/[()]/g, '');
        // replace library delimiter with user customized delimiter
        result = result.replace(/[\s-]/g, owner.delimiter);

        return result;
    }
};

if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object' && _typeof(module.exports) === 'object') {
    module.exports = exports = PhoneFormatter;
}

},{}],10:[function(require,module,exports){
'use strict';

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

var Util = {
    noop: function noop() {},

    strip: function strip(value, re) {
        return value.replace(re, '');
    },

    headStr: function headStr(str, length) {
        return str.slice(0, length);
    },

    getMaxLength: function getMaxLength(blocks) {
        return blocks.reduce(function (previous, current) {
            return previous + current;
        }, 0);
    },

    getPrefixAppliedValue: function getPrefixAppliedValue(value, prefix) {
        var prefixLength = prefix.length,
            prefixLengthValue;

        if (prefixLength === 0) {
            return value;
        }

        prefixLengthValue = value.slice(0, prefixLength);

        if (prefixLengthValue.length < prefixLength) {
            value = prefix;
        } else if (prefixLengthValue !== prefix) {
            value = prefix + value.slice(prefixLength);
        }

        return value;
    },

    getFormattedValue: function getFormattedValue(value, blocks, blocksLength, delimiter) {
        var result = '';

        blocks.forEach(function (length, index) {
            if (value.length > 0) {
                var sub = value.slice(0, length),
                    rest = value.slice(length);

                result += sub;

                if (sub.length === length && index < blocksLength - 1) {
                    result += delimiter;
                }

                // update remaining string
                value = rest;
            }
        });

        return result;
    }
};

if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object' && _typeof(module.exports) === 'object') {
    module.exports = exports = Util;
}

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkaXN0L2FkZG9ucy9jbGVhdmUtcGhvbmUuYXUuanMiLCJsb2NhbC9hcHAuanMiLCJyZWFjdC5qcyIsInNyYy9DbGVhdmUucmVhY3QuanMiLCJzcmMvY29tbW9uL0RlZmF1bHRQcm9wZXJ0aWVzLmpzIiwic3JjL3Nob3J0Y3V0cy9DcmVkaXRDYXJkRGV0ZWN0b3IuanMiLCJzcmMvc2hvcnRjdXRzL0RhdGVGb3JtYXR0ZXIuanMiLCJzcmMvc2hvcnRjdXRzL051bWVyYWxGb3JtYXR0ZXIuanMiLCJzcmMvc2hvcnRjdXRzL1Bob25lRm9ybWF0dGVyLmpzIiwic3JjL3V0aWxzL1V0aWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLENBQUMsWUFBVSxBQUFDO1dBQUEsQUFBUyxFQUFULEFBQVcsR0FBWCxBQUFhLEdBQUUsQUFBQztRQUFJLElBQUUsRUFBQSxBQUFFLE1BQVIsQUFBTSxBQUFRO1FBQUssSUFBbkIsQUFBcUIsRUFBRSxFQUFBLEFBQUUsTUFBRixBQUFPLEtBQUcsQ0FBQyxFQUFYLEFBQWEsY0FBWSxFQUFBLEFBQUUsV0FBVyxTQUFPLEVBQTdDLEFBQXlCLEFBQW9CLEFBQUUsSUFBSSxLQUFJLElBQUosQUFBUSxHQUFFLEVBQUEsQUFBRSxXQUFTLElBQUUsRUFBdkIsQUFBVSxBQUFhLEFBQUUsV0FBVTtRQUFBLEFBQUUsVUFBUSxLQUFBLEFBQUssTUFBZixBQUFtQixJQUFFLElBQUUsRUFBQSxBQUFFLEtBQUcsRUFBTCxBQUFLLEFBQUUsS0FBRyxFQUFBLEFBQUUsS0FBbkMsQUFBc0MsS0FBRyxFQUFBLEFBQUUsS0FBOUUsQUFBbUMsQUFBOEM7QUFBRTtZQUFBLEFBQVMsRUFBVCxBQUFXLEdBQVgsQUFBYSxHQUFFLEFBQUM7YUFBQSxBQUFTLElBQUcsQUFBRSxJQUFBLEFBQUUsWUFBVSxFQUFaLEFBQWMsV0FB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QixBQUErQixjQUFjLEFBQ3pDO29CQUFBLEFBQVEsQUFDWDtBQUZELGVBRU8sSUFBSSxzQkFBSixBQUEwQixRQUFRLEFBQ3JDO29CQUFRLFNBQVMsTUFBQSxBQUFNLE1BQXZCLEFBQWlCLEFBQVksQUFDaEM7QUFFRDs7ZUFBQSxBQUFPLEFBQ1Y7QUFuQ00sQUFxQ1A7O3VCQUFtQiwyQkFBQSxBQUFVLE9BQVYsQUFBaUIsUUFBakIsQUFBeUIsY0FBekIsQUFBdUMsV0FBVyxBQUNqRTtZQUFJLFNBQUosQUFBYSxBQUViOztlQUFBLEFBQU8sUUFBUSxVQUFBLEFBQVUsUUFBVixBQUFrQixPQUFPLEFBQ3BDO2dCQUFJLE1BQUEsQUFBTSxTQUFWLEFBQW1CLEdBQUcsQUFDbEI7b0JBQUksTUFBTSxNQUFBLEFBQU0sTUFBTixBQUFZLEdBQXRCLEFBQVUsQUFBZTtvQkFDckIsT0FBTyxNQUFBLEFBQU0sTUFEakIsQUFDVyxBQUFZLEFBRXZCOzswQkFBQSxBQUFVLEFBRVY7O29CQUFJLElBQUEsQUFBSSxXQUFKLEFBQWUsVUFBVSxRQUFRLGVBQXJDLEFBQW9ELEdBQUcsQUFDbkQ7OEJBQUEsQUFBVSxBQUNiO0FBR0Q7Ozt3QkFBQSxBQUFRLEFBQ1g7QUFDSjtBQWRELEFBZ0JBOztlQUFBLEFBQU8sQUFDVjtBQXpETCxBQUFXO0FBQUEsQUFDUDs7QUEyREosSUFBSSxRQUFBLEFBQU8sK0NBQVAsQUFBTyxhQUFQLEFBQWtCLFlBQVksUUFBTyxPQUFQLEFBQWMsYUFBaEQsQUFBNEQsVUFBVSxBQUNsRTtXQUFBLEFBQU8sVUFBVSxVQUFqQixBQUEyQixBQUM5QiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIoZnVuY3Rpb24oKXtmdW5jdGlvbiB0KHQsbil7dmFyIGU9dC5zcGxpdChcIi5cIikscj1xO2VbMF1pbiByfHwhci5leGVjU2NyaXB0fHxyLmV4ZWNTY3JpcHQoXCJ2YXIgXCIrZVswXSk7Zm9yKHZhciBpO2UubGVuZ3RoJiYoaT1lLnNoaWZ0KCkpOyllLmxlbmd0aHx8dm9pZCAwPT09bj9yPXJbaV0/cltpXTpyW2ldPXt9OnJbaV09bn1mdW5jdGlvbiBuKHQsbil7ZnVuY3Rpb24gZSgpe31lLnByb3RvdHlwZT1uLnByb3RvdHlwZSx0Lk09bi5wcm90b3R5cGUsdC5wcm90b3R5cGU9bmV3IGUsdC5wcm90b3R5cGUuY29uc3RydWN0b3I9dCx0Lk49ZnVuY3Rpb24odCxlLHIpe2Zvcih2YXIgaT1BcnJheShhcmd1bWVudHMubGVuZ3RoLTIpLGE9MjthPGFyZ3VtZW50cy5sZW5ndGg7YSsrKWlbYS0yXT1hcmd1bWVudHNbYV07cmV0dXJuIG4ucHJvdG90eXBlW2VdLmFwcGx5KHQsaSl9fWZ1bmN0aW9uIGUodCxuKXtudWxsIT10JiZ0aGlzLmEuYXBwbHkodGhpcyxhcmd1bWVudHMpfWZ1bmN0aW9uIHIodCl7dC5iPVwiXCJ9ZnVuY3Rpb24gaSh0LG4pe3Quc29ydChufHxhKX1mdW5jdGlvbiBhKHQsbil7cmV0dXJuIHQ+bj8xOm4+dD8tMTowfWZ1bmN0aW9uIGwodCl7dmFyIG4sZT1bXSxyPTA7Zm9yKG4gaW4gdCllW3IrK109dFtuXTtyZXR1cm4gZX1mdW5jdGlvbiB1KHQsbil7dGhpcy5iPXQsdGhpcy5hPXt9O2Zvcih2YXIgZT0wO2U8bi5sZW5ndGg7ZSsrKXt2YXIgcj1uW2VdO3RoaXMuYVtyLmJdPXJ9fWZ1bmN0aW9uIG8odCl7cmV0dXJuIHQ9bCh0LmEpLGkodCxmdW5jdGlvbih0LG4pe3JldHVybiB0LmItbi5ifSksdH1mdW5jdGlvbiBzKHQsbil7c3dpdGNoKHRoaXMuYj10LHRoaXMuZz0hIW4uRyx0aGlzLmE9bi5jLHRoaXMuaj1uLnR5cGUsdGhpcy5oPSExLHRoaXMuYSl7Y2FzZSBrOmNhc2UgSjpjYXNlIEs6Y2FzZSBMOmNhc2UgTzpjYXNlIFk6Y2FzZSBUOnRoaXMuaD0hMH10aGlzLmY9bi5kZWZhdWx0VmFsdWV9ZnVuY3Rpb24gZigpe3RoaXMuYT17fSx0aGlzLmY9dGhpcy5pKCkuYSx0aGlzLmI9dGhpcy5nPW51bGx9ZnVuY3Rpb24gYyh0LG4pe2Zvcih2YXIgZT1vKHQuaSgpKSxyPTA7cjxlLmxlbmd0aDtyKyspe3ZhciBpPWVbcl0sYT1pLmI7aWYobnVsbCE9bi5hW2FdKXt0LmImJmRlbGV0ZSB0LmJbaS5iXTt2YXIgbD0xMT09aS5hfHwxMD09aS5hO2lmKGkuZylmb3IodmFyIGk9cChuLGEpfHxbXSx1PTA7dTxpLmxlbmd0aDt1Kyspe3ZhciBzPXQsZj1hLGg9bD9pW3VdLmNsb25lKCk6aVt1XTtzLmFbZl18fChzLmFbZl09W10pLHMuYVtmXS5wdXNoKGgpLHMuYiYmZGVsZXRlIHMuYltmXX1lbHNlIGk9cChuLGEpLGw/KGw9cCh0LGEpKT9jKGwsaSk6Yih0LGEsaS5jbG9uZSgpKTpiKHQsYSxpKX19fWZ1bmN0aW9uIHAodCxuKXt2YXIgZT10LmFbbl07aWYobnVsbD09ZSlyZXR1cm4gbnVsbDtpZih0Lmcpe2lmKCEobiBpbiB0LmIpKXt2YXIgcj10LmcsaT10LmZbbl07aWYobnVsbCE9ZSlpZihpLmcpe2Zvcih2YXIgYT1bXSxsPTA7bDxlLmxlbmd0aDtsKyspYVtsXT1yLmIoaSxlW2xdKTtlPWF9ZWxzZSBlPXIuYihpLGUpO3JldHVybiB0LmJbbl09ZX1yZXR1cm4gdC5iW25dfXJldHVybiBlfWZ1bmN0aW9uIGgodCxuLGUpe3ZhciByPXAodCxuKTtyZXR1cm4gdC5mW25dLmc/cltlfHwwXTpyfWZ1bmN0aW9uIGcodCxuKXt2YXIgZTtpZihudWxsIT10LmFbbl0pZT1oKHQsbix2b2lkIDApO2Vsc2UgdDp7aWYoZT10LmZbbl0sdm9pZCAwPT09ZS5mKXt2YXIgcj1lLmo7aWYocj09PUJvb2xlYW4pZS5mPSExO2Vsc2UgaWYocj09PU51bWJlcillLmY9MDtlbHNle2lmKHIhPT1TdHJpbmcpe2U9bmV3IHI7YnJlYWsgdH1lLmY9ZS5oP1wiMFwiOlwiXCJ9fWU9ZS5mfXJldHVybiBlfWZ1bmN0aW9uIG0odCxuKXtyZXR1cm4gdC5mW25dLmc/bnVsbCE9dC5hW25dP3QuYVtuXS5sZW5ndGg6MDpudWxsIT10LmFbbl0/MTowfWZ1bmN0aW9uIGIodCxuLGUpe3QuYVtuXT1lLHQuYiYmKHQuYltuXT1lKX1mdW5jdGlvbiBkKHQsbil7dmFyIGUscj1bXTtmb3IoZSBpbiBuKTAhPWUmJnIucHVzaChuZXcgcyhlLG5bZV0pKTtyZXR1cm4gbmV3IHUodCxyKX0vKlxuXG4gUHJvdG9jb2wgQnVmZmVyIDIgQ29weXJpZ2h0IDIwMDggR29vZ2xlIEluYy5cbiBBbGwgb3RoZXIgY29kZSBjb3B5cmlnaHQgaXRzIHJlc3BlY3RpdmUgb3duZXJzLlxuIENvcHlyaWdodCAoQykgMjAxMCBUaGUgTGlicGhvbmVudW1iZXIgQXV0aG9yc1xuXG4gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cbmZ1bmN0aW9uIHkoKXtmLmNhbGwodGhpcyl9ZnVuY3Rpb24gdigpe2YuY2FsbCh0aGlzKX1mdW5jdGlvbiBfKCl7Zi5jYWxsKHRoaXMpfWZ1bmN0aW9uIFMoKXt9ZnVuY3Rpb24gJCgpe31mdW5jdGlvbiB3KCl7fS8qXG5cbiBDb3B5cmlnaHQgKEMpIDIwMTAgVGhlIExpYnBob25lbnVtYmVyIEF1dGhvcnMuXG5cbiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG4gVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuZnVuY3Rpb24geCgpe3RoaXMuYT17fX1mdW5jdGlvbiBBKHQsbil7aWYobnVsbD09bilyZXR1cm4gbnVsbDtuPW4udG9VcHBlckNhc2UoKTt2YXIgZT10LmFbbl07aWYobnVsbD09ZSl7aWYoZT10dFtuXSxudWxsPT1lKXJldHVybiBudWxsO2U9KG5ldyB3KS5hKF8uaSgpLGUpLHQuYVtuXT1lfXJldHVybiBlfWZ1bmN0aW9uIE4odCl7cmV0dXJuIHQ9V1t0XSxudWxsPT10P1wiWlpcIjp0WzBdfWZ1bmN0aW9uIGoodCl7dGhpcy5IPVJlZ0V4cChcIuKAiFwiKSx0aGlzLkI9XCJcIix0aGlzLm09bmV3IGUsdGhpcy52PVwiXCIsdGhpcy5oPW5ldyBlLHRoaXMudT1uZXcgZSx0aGlzLmo9ITAsdGhpcy53PXRoaXMubz10aGlzLkQ9ITEsdGhpcy5GPXguYigpLHRoaXMucz0wLHRoaXMuYj1uZXcgZSx0aGlzLkE9ITEsdGhpcy5sPVwiXCIsdGhpcy5hPW5ldyBlLHRoaXMuZj1bXSx0aGlzLkM9dCx0aGlzLko9dGhpcy5nPUModGhpcyx0aGlzLkMpfWZ1bmN0aW9uIEModCxuKXt2YXIgZTtpZihudWxsIT1uJiZpc05hTihuKSYmbi50b1VwcGVyQ2FzZSgpaW4gdHQpe2lmKGU9QSh0LkYsbiksbnVsbD09ZSl0aHJvd1wiSW52YWxpZCByZWdpb24gY29kZTogXCIrbjtlPWcoZSwxMCl9ZWxzZSBlPTA7cmV0dXJuIGU9QSh0LkYsTihlKSksbnVsbCE9ZT9lOmF0fWZ1bmN0aW9uIEUodCl7Zm9yKHZhciBuPXQuZi5sZW5ndGgsZT0wO24+ZTsrK2Upe3ZhciBpPXQuZltlXSxhPWcoaSwxKTtpZih0LnY9PWEpcmV0dXJuITE7dmFyIGw7bD10O3ZhciB1PWksbz1nKHUsMSk7aWYoLTEhPW8uaW5kZXhPZihcInxcIikpbD0hMTtlbHNle289by5yZXBsYWNlKGx0LFwiXFxcXGRcIiksbz1vLnJlcGxhY2UodXQsXCJcXFxcZFwiKSxyKGwubSk7dmFyIHM7cz1sO3ZhciB1PWcodSwyKSxmPVwiOTk5OTk5OTk5OTk5OTk5XCIubWF0Y2gobylbMF07Zi5sZW5ndGg8cy5hLmIubGVuZ3RoP3M9XCJcIjoocz1mLnJlcGxhY2UobmV3IFJlZ0V4cChvLFwiZ1wiKSx1KSxzPXMucmVwbGFjZShSZWdFeHAoXCI5XCIsXCJnXCIpLFwi4oCIXCIpKSwwPHMubGVuZ3RoPyhsLm0uYShzKSxsPSEwKTpsPSExfWlmKGwpcmV0dXJuIHQudj1hLHQuQT1zdC50ZXN0KGgoaSw0KSksdC5zPTAsITB9cmV0dXJuIHQuaj0hMX1mdW5jdGlvbiBSKHQsbil7Zm9yKHZhciBlPVtdLHI9bi5sZW5ndGgtMyxpPXQuZi5sZW5ndGgsYT0wO2k+YTsrK2Epe3ZhciBsPXQuZlthXTswPT1tKGwsMyk/ZS5wdXNoKHQuZlthXSk6KGw9aChsLDMsTWF0aC5taW4ocixtKGwsMyktMSkpLDA9PW4uc2VhcmNoKGwpJiZlLnB1c2godC5mW2FdKSl9dC5mPWV9ZnVuY3Rpb24gRih0LG4pe3QuaC5hKG4pO3ZhciBlPW47aWYocnQudGVzdChlKXx8MT09dC5oLmIubGVuZ3RoJiZldC50ZXN0KGUpKXt2YXIgaSxlPW47XCIrXCI9PWU/KGk9ZSx0LnUuYShlKSk6KGk9bnRbZV0sdC51LmEoaSksdC5hLmEoaSkpLG49aX1lbHNlIHQuaj0hMSx0LkQ9ITA7aWYoIXQuail7aWYoIXQuRClpZihIKHQpKXtpZihQKHQpKXJldHVybiBCKHQpfWVsc2UgaWYoMDx0LmwubGVuZ3RoJiYoZT10LmEudG9TdHJpbmcoKSxyKHQuYSksdC5hLmEodC5sKSx0LmEuYShlKSxlPXQuYi50b1N0cmluZygpLGk9ZS5sYXN0SW5kZXhPZih0LmwpLHIodC5iKSx0LmIuYShlLnN1YnN0cmluZygwLGkpKSksdC5sIT1HKHQpKXJldHVybiB0LmIuYShcIiBcIiksQih0KTtyZXR1cm4gdC5oLnRvU3RyaW5nKCl9c3dpdGNoKHQudS5iLmxlbmd0aCl7Y2FzZSAwOmNhc2UgMTpjYXNlIDI6cmV0dXJuIHQuaC50b1N0cmluZygpO2Nhc2UgMzppZighSCh0KSlyZXR1cm4gdC5sPUcodCksVSh0KTt0Lnc9ITA7ZGVmYXVsdDpyZXR1cm4gdC53PyhQKHQpJiYodC53PSExKSx0LmIudG9TdHJpbmcoKSt0LmEudG9TdHJpbmcoKSk6MDx0LmYubGVuZ3RoPyhlPVYodCxuKSxpPUkodCksMDxpLmxlbmd0aD9pOihSKHQsdC5hLnRvU3RyaW5nKCkpLEUodCk/TSh0KTp0Lmo/RCh0LGUpOnQuaC50b1N0cmluZygpKSk6VSh0KX19ZnVuY3Rpb24gQih0KXtyZXR1cm4gdC5qPSEwLHQudz0hMSx0LmY9W10sdC5zPTAscih0Lm0pLHQudj1cIlwiLFUodCl9ZnVuY3Rpb24gSSh0KXtmb3IodmFyIG49dC5hLnRvU3RyaW5nKCksZT10LmYubGVuZ3RoLHI9MDtlPnI7KytyKXt2YXIgaT10LmZbcl0sYT1nKGksMSk7aWYobmV3IFJlZ0V4cChcIl4oPzpcIithK1wiKSRcIikudGVzdChuKSlyZXR1cm4gdC5BPXN0LnRlc3QoaChpLDQpKSxuPW4ucmVwbGFjZShuZXcgUmVnRXhwKGEsXCJnXCIpLGgoaSwyKSksRCh0LG4pfXJldHVyblwiXCJ9ZnVuY3Rpb24gRCh0LG4pe3ZhciBlPXQuYi5iLmxlbmd0aDtyZXR1cm4gdC5BJiZlPjAmJlwiIFwiIT10LmIudG9TdHJpbmcoKS5jaGFyQXQoZS0xKT90LmIrXCIgXCIrbjp0LmIrbn1mdW5jdGlvbiBVKHQpe3ZhciBuPXQuYS50b1N0cmluZygpO2lmKDM8PW4ubGVuZ3RoKXtmb3IodmFyIGU9dC5vJiYwPG0odC5nLDIwKT9wKHQuZywyMCl8fFtdOnAodC5nLDE5KXx8W10scj1lLmxlbmd0aCxpPTA7cj5pOysraSl7dmFyIGEsbD1lW2ldOyhhPW51bGw9PXQuZy5hWzEyXXx8dC5vfHxoKGwsNikpfHwoYT1nKGwsNCksYT0wPT1hLmxlbmd0aHx8aXQudGVzdChhKSksYSYmb3QudGVzdChnKGwsMikpJiZ0LmYucHVzaChsKX1yZXR1cm4gUih0LG4pLG49SSh0KSwwPG4ubGVuZ3RoP246RSh0KT9NKHQpOnQuaC50b1N0cmluZygpfXJldHVybiBEKHQsbil9ZnVuY3Rpb24gTSh0KXt2YXIgbj10LmEudG9TdHJpbmcoKSxlPW4ubGVuZ3RoO2lmKGU+MCl7Zm9yKHZhciByPVwiXCIsaT0wO2U+aTtpKyspcj1WKHQsbi5jaGFyQXQoaSkpO3JldHVybiB0Lmo/RCh0LHIpOnQuaC50b1N0cmluZygpfXJldHVybiB0LmIudG9TdHJpbmcoKX1mdW5jdGlvbiBHKHQpe3ZhciBuLGU9dC5hLnRvU3RyaW5nKCksaT0wO3JldHVybiAxIT1oKHQuZywxMCk/bj0hMToobj10LmEudG9TdHJpbmcoKSxuPVwiMVwiPT1uLmNoYXJBdCgwKSYmXCIwXCIhPW4uY2hhckF0KDEpJiZcIjFcIiE9bi5jaGFyQXQoMSkpLG4/KGk9MSx0LmIuYShcIjFcIikuYShcIiBcIiksdC5vPSEwKTpudWxsIT10LmcuYVsxNV0mJihuPW5ldyBSZWdFeHAoXCJeKD86XCIraCh0LmcsMTUpK1wiKVwiKSxuPWUubWF0Y2gobiksbnVsbCE9biYmbnVsbCE9blswXSYmMDxuWzBdLmxlbmd0aCYmKHQubz0hMCxpPW5bMF0ubGVuZ3RoLHQuYi5hKGUuc3Vic3RyaW5nKDAsaSkpKSkscih0LmEpLHQuYS5hKGUuc3Vic3RyaW5nKGkpKSxlLnN1YnN0cmluZygwLGkpfWZ1bmN0aW9uIEgodCl7dmFyIG49dC51LnRvU3RyaW5nKCksZT1uZXcgUmVnRXhwKFwiXig/OlxcXFwrfFwiK2godC5nLDExKStcIilcIiksZT1uLm1hdGNoKGUpO3JldHVybiBudWxsIT1lJiZudWxsIT1lWzBdJiYwPGVbMF0ubGVuZ3RoPyh0Lm89ITAsZT1lWzBdLmxlbmd0aCxyKHQuYSksdC5hLmEobi5zdWJzdHJpbmcoZSkpLHIodC5iKSx0LmIuYShuLnN1YnN0cmluZygwLGUpKSxcIitcIiE9bi5jaGFyQXQoMCkmJnQuYi5hKFwiIFwiKSwhMCk6ITF9ZnVuY3Rpb24gUCh0KXtpZigwPT10LmEuYi5sZW5ndGgpcmV0dXJuITE7dmFyIG4saT1uZXcgZTt0OntpZihuPXQuYS50b1N0cmluZygpLDAhPW4ubGVuZ3RoJiZcIjBcIiE9bi5jaGFyQXQoMCkpZm9yKHZhciBhLGw9bi5sZW5ndGgsdT0xOzM+PXUmJmw+PXU7Kyt1KWlmKGE9cGFyc2VJbnQobi5zdWJzdHJpbmcoMCx1KSwxMCksYSBpbiBXKXtpLmEobi5zdWJzdHJpbmcodSkpLG49YTticmVhayB0fW49MH1yZXR1cm4gMD09bj8hMToocih0LmEpLHQuYS5hKGkudG9TdHJpbmcoKSksaT1OKG4pLFwiMDAxXCI9PWk/dC5nPUEodC5GLFwiXCIrbik6aSE9dC5DJiYodC5nPUModCxpKSksdC5iLmEoXCJcIituKS5hKFwiIFwiKSx0Lmw9XCJcIiwhMCl9ZnVuY3Rpb24gVih0LG4pe3ZhciBlPXQubS50b1N0cmluZygpO2lmKDA8PWUuc3Vic3RyaW5nKHQucykuc2VhcmNoKHQuSCkpe3ZhciBpPWUuc2VhcmNoKHQuSCksZT1lLnJlcGxhY2UodC5ILG4pO3JldHVybiByKHQubSksdC5tLmEoZSksdC5zPWksZS5zdWJzdHJpbmcoMCx0LnMrMSl9cmV0dXJuIDE9PXQuZi5sZW5ndGgmJih0Lmo9ITEpLHQudj1cIlwiLHQuaC50b1N0cmluZygpfXZhciBxPXRoaXM7ZS5wcm90b3R5cGUuYj1cIlwiLGUucHJvdG90eXBlLnNldD1mdW5jdGlvbih0KXt0aGlzLmI9XCJcIit0fSxlLnByb3RvdHlwZS5hPWZ1bmN0aW9uKHQsbixlKXtpZih0aGlzLmIrPVN0cmluZyh0KSxudWxsIT1uKWZvcih2YXIgcj0xO3I8YXJndW1lbnRzLmxlbmd0aDtyKyspdGhpcy5iKz1hcmd1bWVudHNbcl07cmV0dXJuIHRoaXN9LGUucHJvdG90eXBlLnRvU3RyaW5nPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuYn07dmFyIFQ9MSxZPTIsaz0zLEo9NCxLPTYsTD0xNixPPTE4O2YucHJvdG90eXBlLnNldD1mdW5jdGlvbih0LG4pe2IodGhpcyx0LmIsbil9LGYucHJvdG90eXBlLmNsb25lPWZ1bmN0aW9uKCl7dmFyIHQ9bmV3IHRoaXMuY29uc3RydWN0b3I7cmV0dXJuIHQhPXRoaXMmJih0LmE9e30sdC5iJiYodC5iPXt9KSxjKHQsdGhpcykpLHR9O3ZhciBaO24oeSxmKTt2YXIgejtuKHYsZik7dmFyIFg7bihfLGYpLHkucHJvdG90eXBlLmk9ZnVuY3Rpb24oKXtyZXR1cm4gWnx8KFo9ZCh5LHswOntuYW1lOlwiTnVtYmVyRm9ybWF0XCIsSTpcImkxOG4ucGhvbmVudW1iZXJzLk51bWJlckZvcm1hdFwifSwxOntuYW1lOlwicGF0dGVyblwiLHJlcXVpcmVkOiEwLGM6OSx0eXBlOlN0cmluZ30sMjp7bmFtZTpcImZvcm1hdFwiLHJlcXVpcmVkOiEwLGM6OSx0eXBlOlN0cmluZ30sMzp7bmFtZTpcImxlYWRpbmdfZGlnaXRzX3BhdHRlcm5cIixHOiEwLGM6OSx0eXBlOlN0cmluZ30sNDp7bmFtZTpcIm5hdGlvbmFsX3ByZWZpeF9mb3JtYXR0aW5nX3J1bGVcIixjOjksdHlwZTpTdHJpbmd9LDY6e25hbWU6XCJuYXRpb25hbF9wcmVmaXhfb3B0aW9uYWxfd2hlbl9mb3JtYXR0aW5nXCIsYzo4LHR5cGU6Qm9vbGVhbn0sNTp7bmFtZTpcImRvbWVzdGljX2NhcnJpZXJfY29kZV9mb3JtYXR0aW5nX3J1bGVcIixjOjksdHlwZTpTdHJpbmd9fSkpLFp9LHkuY3Rvcj15LHkuY3Rvci5pPXkucHJvdG90eXBlLmksdi5wcm90b3R5cGUuaT1mdW5jdGlvbigpe3JldHVybiB6fHwoej1kKHYsezA6e25hbWU6XCJQaG9uZU51bWJlckRlc2NcIixJOlwiaTE4bi5waG9uZW51bWJlcnMuUGhvbmVOdW1iZXJEZXNjXCJ9LDI6e25hbWU6XCJuYXRpb25hbF9udW1iZXJfcGF0dGVyblwiLGM6OSx0eXBlOlN0cmluZ30sMzp7bmFtZTpcInBvc3NpYmxlX251bWJlcl9wYXR0ZXJuXCIsYzo5LHR5cGU6U3RyaW5nfSw2OntuYW1lOlwiZXhhbXBsZV9udW1iZXJcIixjOjksdHlwZTpTdHJpbmd9LDc6e25hbWU6XCJuYXRpb25hbF9udW1iZXJfbWF0Y2hlcl9kYXRhXCIsYzoxMix0eXBlOlN0cmluZ30sODp7bmFtZTpcInBvc3NpYmxlX251bWJlcl9tYXRjaGVyX2RhdGFcIixjOjEyLHR5cGU6U3RyaW5nfX0pKSx6fSx2LmN0b3I9dix2LmN0b3IuaT12LnByb3RvdHlwZS5pLF8ucHJvdG90eXBlLmk9ZnVuY3Rpb24oKXtyZXR1cm4gWHx8KFg9ZChfLHswOntuYW1lOlwiUGhvbmVNZXRhZGF0YVwiLEk6XCJpMThuLnBob25lbnVtYmVycy5QaG9uZU1ldGFkYXRhXCJ9LDE6e25hbWU6XCJnZW5lcmFsX2Rlc2NcIixjOjExLHR5cGU6dn0sMjp7bmFtZTpcImZpeGVkX2xpbmVcIixjOjExLHR5cGU6dn0sMzp7bmFtZTpcIm1vYmlsZVwiLGM6MTEsdHlwZTp2fSw0OntuYW1lOlwidG9sbF9mcmVlXCIsYzoxMSx0eXBlOnZ9LDU6e25hbWU6XCJwcmVtaXVtX3JhdGVcIixjOjExLHR5cGU6dn0sNjp7bmFtZTpcInNoYXJlZF9jb3N0XCIsYzoxMSx0eXBlOnZ9LDc6e25hbWU6XCJwZXJzb25hbF9udW1iZXJcIixjOjExLHR5cGU6dn0sODp7bmFtZTpcInZvaXBcIixjOjExLHR5cGU6dn0sMjE6e25hbWU6XCJwYWdlclwiLGM6MTEsdHlwZTp2fSwyNTp7bmFtZTpcInVhblwiLGM6MTEsdHlwZTp2fSwyNzp7bmFtZTpcImVtZXJnZW5jeVwiLGM6MTEsdHlwZTp2fSwyODp7bmFtZTpcInZvaWNlbWFpbFwiLGM6MTEsdHlwZTp2fSwyNDp7bmFtZTpcIm5vX2ludGVybmF0aW9uYWxfZGlhbGxpbmdcIixjOjExLHR5cGU6dn0sOTp7bmFtZTpcImlkXCIscmVxdWlyZWQ6ITAsYzo5LHR5cGU6U3RyaW5nfSwxMDp7bmFtZTpcImNvdW50cnlfY29kZVwiLGM6NSx0eXBlOk51bWJlcn0sMTE6e25hbWU6XCJpbnRlcm5hdGlvbmFsX3ByZWZpeFwiLGM6OSx0eXBlOlN0cmluZ30sMTc6e25hbWU6XCJwcmVmZXJyZWRfaW50ZXJuYXRpb25hbF9wcmVmaXhcIixjOjksdHlwZTpTdHJpbmd9LDEyOntuYW1lOlwibmF0aW9uYWxfcHJlZml4XCIsYzo5LHR5cGU6U3RyaW5nfSwxMzp7bmFtZTpcInByZWZlcnJlZF9leHRuX3ByZWZpeFwiLGM6OSx0eXBlOlN0cmluZ30sMTU6e25hbWU6XCJuYXRpb25hbF9wcmVmaXhfZm9yX3BhcnNpbmdcIixjOjksdHlwZTpTdHJpbmd9LDE2OntuYW1lOlwibmF0aW9uYWxfcHJlZml4X3RyYW5zZm9ybV9ydWxlXCIsYzo5LHR5cGU6U3RyaW5nfSwxODp7bmFtZTpcInNhbWVfbW9iaWxlX2FuZF9maXhlZF9saW5lX3BhdHRlcm5cIixjOjgsZGVmYXVsdFZhbHVlOiExLHR5cGU6Qm9vbGVhbn0sMTk6e25hbWU6XCJudW1iZXJfZm9ybWF0XCIsRzohMCxjOjExLHR5cGU6eX0sMjA6e25hbWU6XCJpbnRsX251bWJlcl9mb3JtYXRcIixHOiEwLGM6MTEsdHlwZTp5fSwyMjp7bmFtZTpcIm1haW5fY291bnRyeV9mb3JfY29kZVwiLGM6OCxkZWZhdWx0VmFsdWU6ITEsdHlwZTpCb29sZWFufSwyMzp7bmFtZTpcImxlYWRpbmdfZGlnaXRzXCIsYzo5LHR5cGU6U3RyaW5nfSwyNjp7bmFtZTpcImxlYWRpbmdfemVyb19wb3NzaWJsZVwiLGM6OCxkZWZhdWx0VmFsdWU6ITEsdHlwZTpCb29sZWFufX0pKSxYfSxfLmN0b3I9XyxfLmN0b3IuaT1fLnByb3RvdHlwZS5pLFMucHJvdG90eXBlLmE9ZnVuY3Rpb24odCl7dGhyb3cgbmV3IHQuYixFcnJvcihcIlVuaW1wbGVtZW50ZWRcIil9LFMucHJvdG90eXBlLmI9ZnVuY3Rpb24odCxuKXtpZigxMT09dC5hfHwxMD09dC5hKXJldHVybiBuIGluc3RhbmNlb2YgZj9uOnRoaXMuYSh0LmoucHJvdG90eXBlLmkoKSxuKTtpZigxND09dC5hKXtpZihcInN0cmluZ1wiPT10eXBlb2YgbiYmUS50ZXN0KG4pKXt2YXIgZT1OdW1iZXIobik7aWYoZT4wKXJldHVybiBlfXJldHVybiBufWlmKCF0LmgpcmV0dXJuIG47aWYoZT10LmosZT09PVN0cmluZyl7aWYoXCJudW1iZXJcIj09dHlwZW9mIG4pcmV0dXJuIFN0cmluZyhuKX1lbHNlIGlmKGU9PT1OdW1iZXImJlwic3RyaW5nXCI9PXR5cGVvZiBuJiYoXCJJbmZpbml0eVwiPT09bnx8XCItSW5maW5pdHlcIj09PW58fFwiTmFOXCI9PT1ufHxRLnRlc3QobikpKXJldHVybiBOdW1iZXIobik7cmV0dXJuIG59O3ZhciBRPS9eLT9bMC05XSskLztuKCQsUyksJC5wcm90b3R5cGUuYT1mdW5jdGlvbih0LG4pe3ZhciBlPW5ldyB0LmI7cmV0dXJuIGUuZz10aGlzLGUuYT1uLGUuYj17fSxlfSxuKHcsJCksdy5wcm90b3R5cGUuYj1mdW5jdGlvbih0LG4pe3JldHVybiA4PT10LmE/ISFuOlMucHJvdG90eXBlLmIuYXBwbHkodGhpcyxhcmd1bWVudHMpfSx3LnByb3RvdHlwZS5hPWZ1bmN0aW9uKHQsbil7cmV0dXJuIHcuTS5hLmNhbGwodGhpcyx0LG4pfTsvKlxuXG4gQ29weXJpZ2h0IChDKSAyMDEwIFRoZSBMaWJwaG9uZW51bWJlciBBdXRob3JzXG5cbiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG4gVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xudmFyIFc9ezYxOltcIkFVXCIsXCJDQ1wiLFwiQ1hcIl19LHR0PXtBVTpbbnVsbCxbbnVsbCxudWxsLFwiWzEtNTc4XVxcXFxkezUsOX1cIixcIlxcXFxkezYsMTB9XCJdLFtudWxsLG51bGwsXCJbMjM3XVxcXFxkezh9fDgoPzpbNi04XVxcXFxkezN9fDkoPzpbMDItOV1cXFxcZHsyfXwxKD86WzAtNTctOV1cXFxcZHw2WzAxMzUtOV0pKSlcXFxcZHs0fVwiLFwiXFxcXGR7OCw5fVwiLG51bGwsbnVsbCxcIjIxMjM0NTY3OFwiXSxbbnVsbCxudWxsLFwiMTQoPzo1XFxcXGR8NzEpXFxcXGR7NX18NCg/OlswLTNdXFxcXGR8NFs0Ny05XXw1WzAtMjUtOV18Nls2LTldfDdbMDItOV18OFsxNDctOV18OVswMTctOV0pXFxcXGR7Nn1cIixcIlxcXFxkezl9XCIsbnVsbCxudWxsLFwiNDEyMzQ1Njc4XCJdLFtudWxsLG51bGwsXCIxODAoPzowXFxcXGR7M318MilcXFxcZHszfVwiLFwiXFxcXGR7NywxMH1cIixudWxsLG51bGwsXCIxODAwMTIzNDU2XCJdLFtudWxsLG51bGwsXCIxOSg/OjBbMDEyNl1cXFxcZHxbNjc5XSlcXFxcZHs1fVwiLFwiXFxcXGR7OCwxMH1cIixudWxsLG51bGwsXCIxOTAwMTIzNDU2XCJdLFtudWxsLG51bGwsXCIxMyg/OjAwXFxcXGR7M318NDVbMC00XXxcXFxcZClcXFxcZHszfVwiLFwiXFxcXGR7NiwxMH1cIixudWxsLG51bGwsXCIxMzAwMTIzNDU2XCJdLFtudWxsLG51bGwsXCI1MDBcXFxcZHs2fVwiLFwiXFxcXGR7OX1cIixudWxsLG51bGwsXCI1MDAxMjM0NTZcIl0sW251bGwsbnVsbCxcIjU1MFxcXFxkezZ9XCIsXCJcXFxcZHs5fVwiLG51bGwsbnVsbCxcIjU1MDEyMzQ1NlwiXSxcIkFVXCIsNjEsXCIoPzoxNCg/OjFbMTRdfDM0fDRbMTddfFs1Nl02fDdbNDddfDg4KSk/MDAxWzE0LTY4OV1cIixcIjBcIixudWxsLG51bGwsXCIwXCIsbnVsbCxcIjAwMTFcIixudWxsLFtbbnVsbCxcIihbMjM3OF0pKFxcXFxkezR9KShcXFxcZHs0fSlcIixcIiQxICQyICQzXCIsW1wiWzIzNzhdXCJdLFwiKDAkMSlcIl0sW251bGwsXCIoXFxcXGR7M30pKFxcXFxkezN9KShcXFxcZHszfSlcIixcIiQxICQyICQzXCIsW1wiWzQ1XXwxNFwiXSxcIjAkMVwiXSxbbnVsbCxcIigxNikoXFxcXGR7M30pKFxcXFxkezIsNH0pXCIsXCIkMSAkMiAkM1wiLFtcIjE2XCJdLFwiMCQxXCJdLFtudWxsLFwiKDFbMzg5XVxcXFxkezJ9KShcXFxcZHszfSkoXFxcXGR7M30pXCIsXCIkMSAkMiAkM1wiLFtcIjEoPzpbMzhdMHw5MClcIixcIjEoPzpbMzhdMDB8OTApXCJdLFwiJDFcIl0sW251bGwsXCIoMTgwKSgyXFxcXGR7M30pXCIsXCIkMSAkMlwiLFtcIjE4MFwiLFwiMTgwMlwiXSxcIiQxXCJdLFtudWxsLFwiKDE5XFxcXGQpKFxcXFxkezN9KVwiLFwiJDEgJDJcIixbXCIxOVsxM11cIl0sXCIkMVwiXSxbbnVsbCxcIigxOVxcXFxkezJ9KShcXFxcZHs0fSlcIixcIiQxICQyXCIsW1wiMTlbNjc5XVwiXSxcIiQxXCJdLFtudWxsLFwiKDEzKShcXFxcZHsyfSkoXFxcXGR7Mn0pXCIsXCIkMSAkMiAkM1wiLFtcIjEzWzEtOV1cIl0sXCIkMVwiXV0sbnVsbCxbbnVsbCxudWxsLFwiMTZcXFxcZHszLDd9XCIsXCJcXFxcZHs1LDl9XCIsbnVsbCxudWxsLFwiMTYxMjM0NVwiXSwxLG51bGwsW251bGwsbnVsbCxcIjEoPzozKD86MDBcXFxcZHszfXw0NVswLTRdfFxcXFxkKVxcXFxkezN9fDgwKD86MFxcXFxkezZ9fDJcXFxcZHszfSkpXCIsXCJcXFxcZHs2LDEwfVwiLG51bGwsbnVsbCxcIjEzMDAxMjM0NTZcIl0sW251bGwsbnVsbCxcIk5BXCIsXCJOQVwiXSxudWxsLG51bGwsW251bGwsbnVsbCxcIk5BXCIsXCJOQVwiXV19O3guYj1mdW5jdGlvbigpe3JldHVybiB4LmE/eC5hOnguYT1uZXcgeH07dmFyIG50PXswOlwiMFwiLDE6XCIxXCIsMjpcIjJcIiwzOlwiM1wiLDQ6XCI0XCIsNTpcIjVcIiw2OlwiNlwiLDc6XCI3XCIsODpcIjhcIiw5OlwiOVwiLFwi77yQXCI6XCIwXCIsXCLvvJFcIjpcIjFcIixcIu+8klwiOlwiMlwiLFwi77yTXCI6XCIzXCIsXCLvvJRcIjpcIjRcIixcIu+8lVwiOlwiNVwiLFwi77yWXCI6XCI2XCIsXCLvvJdcIjpcIjdcIixcIu+8mFwiOlwiOFwiLFwi77yZXCI6XCI5XCIsXCLZoFwiOlwiMFwiLFwi2aFcIjpcIjFcIixcItmiXCI6XCIyXCIsXCLZo1wiOlwiM1wiLFwi2aRcIjpcIjRcIixcItmlXCI6XCI1XCIsXCLZplwiOlwiNlwiLFwi2adcIjpcIjdcIixcItmoXCI6XCI4XCIsXCLZqVwiOlwiOVwiLFwi27BcIjpcIjBcIixcItuxXCI6XCIxXCIsXCLbslwiOlwiMlwiLFwi27NcIjpcIjNcIixcItu0XCI6XCI0XCIsXCLbtVwiOlwiNVwiLFwi27ZcIjpcIjZcIixcItu3XCI6XCI3XCIsXCLbuFwiOlwiOFwiLFwi27lcIjpcIjlcIn0sZXQ9UmVnRXhwKFwiWyvvvItdK1wiKSxydD1SZWdFeHAoXCIoWzAtOe+8kC3vvJnZoC3ZqduwLdu5XSlcIiksaXQ9L15cXCg/XFwkMVxcKT8kLyxhdD1uZXcgXztiKGF0LDExLFwiTkFcIik7dmFyIGx0PS9cXFsoW15cXFtcXF1dKSpcXF0vZyx1dD0vXFxkKD89W14sfV1bXix9XSkvZyxvdD1SZWdFeHAoXCJeWy144oCQLeKAleKIkuODvO+8jS3vvI8gwqDCreKAi+KBoOOAgCgp77yI77yJ77y777y9LlxcXFxbXFxcXF0vfuKBk+KIvO+9nl0qKFxcXFwkXFxcXGRbLXjigJAt4oCV4oiS44O877yNLe+8jyDCoMKt4oCL4oGg44CAKCnvvIjvvInvvLvvvL0uXFxcXFtcXFxcXS9+4oGT4oi8772eXSopKyRcIiksc3Q9L1stIF0vO2oucHJvdG90eXBlLks9ZnVuY3Rpb24oKXt0aGlzLkI9XCJcIixyKHRoaXMuaCkscih0aGlzLnUpLHIodGhpcy5tKSx0aGlzLnM9MCx0aGlzLnY9XCJcIixyKHRoaXMuYiksdGhpcy5sPVwiXCIscih0aGlzLmEpLHRoaXMuaj0hMCx0aGlzLnc9dGhpcy5vPXRoaXMuRD0hMSx0aGlzLmY9W10sdGhpcy5BPSExLHRoaXMuZyE9dGhpcy5KJiYodGhpcy5nPUModGhpcyx0aGlzLkMpKX0sai5wcm90b3R5cGUuTD1mdW5jdGlvbih0KXtyZXR1cm4gdGhpcy5CPUYodGhpcyx0KX0sdChcIkNsZWF2ZS5Bc1lvdVR5cGVGb3JtYXR0ZXJcIixqKSx0KFwiQ2xlYXZlLkFzWW91VHlwZUZvcm1hdHRlci5wcm90b3R5cGUuaW5wdXREaWdpdFwiLGoucHJvdG90eXBlLkwpLHQoXCJDbGVhdmUuQXNZb3VUeXBlRm9ybWF0dGVyLnByb3RvdHlwZS5jbGVhclwiLGoucHJvdG90eXBlLkspfSkuY2FsbCh3aW5kb3cpOyIsIi8vdmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbi8vdmFyIFJlYWN0RE9NID0gcmVxdWlyZSgncmVhY3QtZG9tJyk7XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcblxuaW1wb3J0IENsZWF2ZSBmcm9tICcuLi8uLi9jbGVhdmUuanMvcmVhY3QnO1xuaW1wb3J0IENsZWF2ZVBob25lIGZyb20gJy4uLy4uL2NsZWF2ZS5qcy9kaXN0L2FkZG9ucy9jbGVhdmUtcGhvbmUuYXUnO1xuXG52YXIgWW91ckNvbXBvbmVudCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNyZWRpdENhcmRUeXBlOiAgJycsXG4gICAgICAgICAgICBudW1lcmFsVmFsdWU6ICAgICcnLFxuICAgICAgICAgICAgcGhvbmVSZWdpb25Db2RlOiAnQVUnXG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIG9uUmVnaW9uQ2hhbmdlOiBmdW5jdGlvbiAoY29kZSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtwaG9uZVJlZ2lvbkNvZGU6IGNvZGV9KTtcbiAgICB9LFxuXG4gICAgb25OdW1lcmFsQ2hhbmdlOiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7bnVtZXJhbFZhbHVlOiBldmVudC50YXJnZXQucmF3VmFsdWV9KTtcbiAgICB9LFxuXG4gICAgb25DcmVkaXRDYXJkVHlwZUNoYW5nZWQ6IGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2NyZWRpdENhcmRUeXBlOiB0eXBlfSk7XG4gICAgfSxcblxuICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8Q2xlYXZlIHBsYWNlaG9sZGVyPVwiY3JlZGl0IGNhcmRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucz17e2NyZWRpdENhcmQ6IHRydWUsIG9uQ3JlZGl0Q2FyZFR5cGVDaGFuZ2VkOnRoaXMub25DcmVkaXRDYXJkVHlwZUNoYW5nZWR9fS8+XG4gICAgICAgICAgICAgICAgPGRpdj57dGhpcy5zdGF0ZS5jcmVkaXRDYXJkVHlwZX08L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17dGhpcy5vblJlZ2lvbkNoYW5nZS5iaW5kKHRoaXMsICdDTicpfT5DTjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17dGhpcy5vblJlZ2lvbkNoYW5nZS5iaW5kKHRoaXMsICdBVScpfT5BVTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxDbGVhdmUgb3B0aW9ucz17e3Bob25lOiB0cnVlLCBwaG9uZVJlZ2lvbkNvZGU6IHRoaXMuc3RhdGUucGhvbmVSZWdpb25Db2RlfX0vPlxuICAgICAgICAgICAgICAgIDxDbGVhdmUgb3B0aW9ucz17e2RhdGU6IHRydWV9fS8+XG4gICAgICAgICAgICAgICAgPENsZWF2ZSBjbGFzc05hbWU9XCJpbnB1dC1udW1lcmFsXCIgdmFsdWU9XCIxMjMvLzQ1NlwiIG9uQ2hhbmdlPXt0aGlzLm9uTnVtZXJhbENoYW5nZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM9e3tudW1lcmFsOiB0cnVlfX0vPlxuICAgICAgICAgICAgICAgIDxkaXY+e3RoaXMuc3RhdGUubnVtZXJhbFZhbHVlfTwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufSk7XG5cblJlYWN0RE9NLnJlbmRlcihcbiAgICA8WW91ckNvbXBvbmVudCAvPixcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGVudCcpXG4pO1xuXG4iLCJpbXBvcnQgQ2xlYXZlIGZyb20gJy4vc3JjL0NsZWF2ZS5yZWFjdCc7XG5cbmV4cG9ydCBkZWZhdWx0IENsZWF2ZTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIE51bWVyYWxGb3JtYXR0ZXIgPSByZXF1aXJlKCcuL3Nob3J0Y3V0cy9OdW1lcmFsRm9ybWF0dGVyJyk7XG52YXIgRGF0ZUZvcm1hdHRlciA9IHJlcXVpcmUoJy4vc2hvcnRjdXRzL0RhdGVGb3JtYXR0ZXInKTtcbnZhciBQaG9uZUZvcm1hdHRlciA9IHJlcXVpcmUoJy4vc2hvcnRjdXRzL1Bob25lRm9ybWF0dGVyJyk7XG52YXIgQ3JlZGl0Q2FyZERldGVjdG9yID0gcmVxdWlyZSgnLi9zaG9ydGN1dHMvQ3JlZGl0Q2FyZERldGVjdG9yJyk7XG52YXIgVXRpbCA9IHJlcXVpcmUoJy4vdXRpbHMvVXRpbCcpO1xudmFyIERlZmF1bHRQcm9wZXJ0aWVzID0gcmVxdWlyZSgnLi9jb21tb24vRGVmYXVsdFByb3BlcnRpZXMnKTtcblxudmFyIENsZWF2ZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICB9LFxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wczogZnVuY3Rpb24gKG5leHRQcm9wcykge1xuICAgICAgICB2YXIgb3duZXIgPSB0aGlzLFxuICAgICAgICAgICAgcGhvbmVSZWdpb25Db2RlID0gbmV4dFByb3BzLm9wdGlvbnMucGhvbmVSZWdpb25Db2RlO1xuXG4gICAgICAgIC8vIHVwZGF0ZSBwaG9uZSByZWdpb24gY29kZVxuICAgICAgICBpZiAocGhvbmVSZWdpb25Db2RlICYmIHBob25lUmVnaW9uQ29kZSAhPT0gb3duZXIucHJvcGVydGllcy5waG9uZVJlZ2lvbkNvZGUpIHtcbiAgICAgICAgICAgIG93bmVyLnByb3BlcnRpZXMucGhvbmVSZWdpb25Db2RlID0gcGhvbmVSZWdpb25Db2RlO1xuICAgICAgICAgICAgb3duZXIuaW5pdFBob25lRm9ybWF0dGVyKCk7XG4gICAgICAgICAgICBvd25lci5vbklucHV0KG93bmVyLnByb3BlcnRpZXMucmVzdWx0KTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG93bmVyID0gdGhpcyxcbiAgICAgICAgICAgIHsgdmFsdWUsIG9wdGlvbnMsIG9uS2V5ZG93biwgb25DaGFuZ2UsIC4uLm90aGVyIH0gPSBvd25lci5wcm9wcztcblxuICAgICAgICBvd25lci5yZWdpc3RlcmVkRXZlbnRzID0ge1xuICAgICAgICAgICAgb25DaGFuZ2U6ICBvbkNoYW5nZSB8fCBVdGlsLm5vb3AsXG4gICAgICAgICAgICBvbktleWRvd246IG9uS2V5ZG93biB8fCBVdGlsLm5vb3BcbiAgICAgICAgfTtcblxuICAgICAgICBvcHRpb25zLmluaXRWYWx1ZSA9IHZhbHVlO1xuXG4gICAgICAgIG93bmVyLnByb3BlcnRpZXMgPSBEZWZhdWx0UHJvcGVydGllcy5hc3NpZ24oe30sIG9wdGlvbnMpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBvdGhlcjogb3RoZXIsXG4gICAgICAgICAgICB2YWx1ZTogb3duZXIucHJvcGVydGllcy5yZXN1bHRcbiAgICAgICAgfTtcbiAgICB9LFxuXG4gICAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgb3duZXIgPSB0aGlzLFxuICAgICAgICAgICAgcHBzID0gb3duZXIucHJvcGVydGllcztcblxuICAgICAgICAvLyBzbyBubyBuZWVkIGZvciB0aGlzIGxpYiBhdCBhbGxcbiAgICAgICAgaWYgKCFwcHMubnVtZXJhbCAmJiAhcHBzLnBob25lICYmICFwcHMuY3JlZGl0Q2FyZCAmJiAhcHBzLmRhdGUgJiYgcHBzLmJsb2Nrcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHBwcy5tYXhMZW5ndGggPSBVdGlsLmdldE1heExlbmd0aChwcHMuYmxvY2tzKTtcblxuICAgICAgICBvd25lci5pbml0UGhvbmVGb3JtYXR0ZXIoKTtcbiAgICAgICAgb3duZXIuaW5pdERhdGVGb3JtYXR0ZXIoKTtcbiAgICAgICAgb3duZXIuaW5pdE51bWVyYWxGb3JtYXR0ZXIoKTtcblxuICAgICAgICBvd25lci5vbklucHV0KHBwcy5pbml0VmFsdWUpO1xuICAgIH0sXG5cbiAgICBpbml0TnVtZXJhbEZvcm1hdHRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgb3duZXIgPSB0aGlzLFxuICAgICAgICAgICAgcHBzID0gb3duZXIucHJvcGVydGllcztcblxuICAgICAgICBpZiAoIXBwcy5udW1lcmFsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBwcHMubnVtZXJhbEZvcm1hdHRlciA9IG5ldyBOdW1lcmFsRm9ybWF0dGVyKFxuICAgICAgICAgICAgcHBzLm51bWVyYWxEZWNpbWFsTWFyayxcbiAgICAgICAgICAgIHBwcy5udW1lcmFsRGVjaW1hbFNjYWxlLFxuICAgICAgICAgICAgcHBzLm51bWVyYWxUaG91c2FuZHNHcm91cFN0eWxlLFxuICAgICAgICAgICAgcHBzLmRlbGltaXRlclxuICAgICAgICApO1xuICAgIH0sXG5cbiAgICBpbml0RGF0ZUZvcm1hdHRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgb3duZXIgPSB0aGlzLFxuICAgICAgICAgICAgcHBzID0gb3duZXIucHJvcGVydGllcztcblxuICAgICAgICBpZiAoIXBwcy5kYXRlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBwcHMuZGF0ZUZvcm1hdHRlciA9IG5ldyBEYXRlRm9ybWF0dGVyKHBwcy5kYXRlUGF0dGVybik7XG4gICAgICAgIHBwcy5ibG9ja3MgPSBwcHMuZGF0ZUZvcm1hdHRlci5nZXRCbG9ja3MoKTtcbiAgICAgICAgcHBzLmJsb2Nrc0xlbmd0aCA9IHBwcy5ibG9ja3MubGVuZ3RoO1xuICAgICAgICBwcHMubWF4TGVuZ3RoID0gVXRpbC5nZXRNYXhMZW5ndGgocHBzLmJsb2Nrcyk7XG4gICAgfSxcblxuICAgIGluaXRQaG9uZUZvcm1hdHRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgb3duZXIgPSB0aGlzLFxuICAgICAgICAgICAgcHBzID0gb3duZXIucHJvcGVydGllcztcblxuICAgICAgICBpZiAoIXBwcy5waG9uZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ2xlYXZlLkFzWW91VHlwZUZvcm1hdHRlciBzaG91bGQgYmUgcHJvdmlkZWQgYnlcbiAgICAgICAgLy8gZXh0ZXJuYWwgZ29vZ2xlIGNsb3N1cmUgbGliXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBwcHMucGhvbmVGb3JtYXR0ZXIgPSBuZXcgUGhvbmVGb3JtYXR0ZXIoXG4gICAgICAgICAgICAgICAgbmV3IHdpbmRvdy5DbGVhdmUuQXNZb3VUeXBlRm9ybWF0dGVyKHBwcy5waG9uZVJlZ2lvbkNvZGUpLFxuICAgICAgICAgICAgICAgIHBwcy5kZWxpbWl0ZXJcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BsZWFzZSBpbmNsdWRlIHBob25lLXR5cGUtZm9ybWF0dGVyLntjb3VudHJ5fS5qcyBsaWInKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBvbktleWRvd246IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICB2YXIgb3duZXIgPSB0aGlzLFxuICAgICAgICAgICAgcHBzID0gb3duZXIucHJvcGVydGllcyxcbiAgICAgICAgICAgIGNoYXJDb2RlID0gZXZlbnQud2hpY2ggfHwgZXZlbnQua2V5Q29kZTtcblxuICAgICAgICAvLyBoaXQgYmFja3NwYWNlIHdoZW4gbGFzdCBjaGFyYWN0ZXIgaXMgZGVsaW1pdGVyXG4gICAgICAgIGlmIChjaGFyQ29kZSA9PT0gOCAmJiBwcHMucmVzdWx0LnNsaWNlKC0xKSA9PT0gcHBzLmRlbGltaXRlcikge1xuICAgICAgICAgICAgcHBzLmJhY2tzcGFjZSA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwcHMuYmFja3NwYWNlID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBvd25lci5yZWdpc3RlcmVkRXZlbnRzLm9uS2V5ZG93bihldmVudCk7XG4gICAgfSxcblxuICAgIG9uQ2hhbmdlOiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgdmFyIG93bmVyID0gdGhpcywgcHBzID0gb3duZXIucHJvcGVydGllcztcblxuICAgICAgICBvd25lci5vbklucHV0KGV2ZW50LnRhcmdldC52YWx1ZSk7XG5cbiAgICAgICAgZXZlbnQudGFyZ2V0LnJhd1ZhbHVlID0gVXRpbC5zdHJpcChwcHMucmVzdWx0LCBwcHMuZGVsaW1pdGVyUkUpO1xuXG4gICAgICAgIG93bmVyLnJlZ2lzdGVyZWRFdmVudHMub25DaGFuZ2UoZXZlbnQpO1xuICAgIH0sXG5cbiAgICBvbklucHV0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgdmFyIG93bmVyID0gdGhpcywgcHBzID0gb3duZXIucHJvcGVydGllcyxcbiAgICAgICAgICAgIHByZXYgPSBwcHMucmVzdWx0LFxuICAgICAgICAgICAgY3JlZGl0Q2FyZEluZm87XG5cbiAgICAgICAgLy8gY2FzZSAxOiBkZWxldGUgb25lIG1vcmUgY2hhcmFjdGVyIFwiNFwiXG4gICAgICAgIC8vIDEyMzQqfCAtPiBoaXQgYmFja3NwYWNlIC0+IDEyM3xcbiAgICAgICAgLy8gY2FzZSAyOiBsYXN0IGNoYXJhY3RlciBpcyBub3QgZGVsaW1pdGVyIHdoaWNoIGlzOlxuICAgICAgICAvLyAxMnwzNCogLT4gaGl0IGJhY2tzcGFjZSAtPiAxfDM0KlxuXG4gICAgICAgIGlmIChwcHMuYmFja3NwYWNlICYmIHZhbHVlLnNsaWNlKC0xKSAhPT0gcHBzLmRlbGltaXRlcikge1xuICAgICAgICAgICAgdmFsdWUgPSBVdGlsLmhlYWRTdHIodmFsdWUsIHZhbHVlLmxlbmd0aCAtIDEpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcGhvbmUgZm9ybWF0dGVyXG4gICAgICAgIGlmIChwcHMucGhvbmUpIHtcbiAgICAgICAgICAgIHBwcy5yZXN1bHQgPSBwcHMucGhvbmVGb3JtYXR0ZXIuZm9ybWF0KHZhbHVlKTtcbiAgICAgICAgICAgIG93bmVyLnVwZGF0ZVZhbHVlU3RhdGUoKTtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbnVtZXJhbCBmb3JtYXR0ZXJcbiAgICAgICAgaWYgKHBwcy5udW1lcmFsKSB7XG4gICAgICAgICAgICBwcHMucmVzdWx0ID0gcHBzLm51bWVyYWxGb3JtYXR0ZXIuZm9ybWF0KHZhbHVlKTtcbiAgICAgICAgICAgIG93bmVyLnVwZGF0ZVZhbHVlU3RhdGUoKTtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZGF0ZVxuICAgICAgICBpZiAocHBzLmRhdGUpIHtcbiAgICAgICAgICAgIHZhbHVlID0gcHBzLmRhdGVGb3JtYXR0ZXIuZ2V0VmFsaWRhdGVkRGF0ZSh2YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBzdHJpcCBkZWxpbWl0ZXJzXG4gICAgICAgIHZhbHVlID0gVXRpbC5zdHJpcCh2YWx1ZSwgcHBzLmRlbGltaXRlclJFKTtcblxuICAgICAgICAvLyBwcmVmaXhcbiAgICAgICAgdmFsdWUgPSBVdGlsLmdldFByZWZpeEFwcGxpZWRWYWx1ZSh2YWx1ZSwgcHBzLnByZWZpeCk7XG5cbiAgICAgICAgLy8gc3RyaXAgbm9uLW51bWVyaWMgY2hhcmFjdGVyc1xuICAgICAgICBpZiAocHBzLm51bWVyaWNPbmx5KSB7XG4gICAgICAgICAgICB2YWx1ZSA9IFV0aWwuc3RyaXAodmFsdWUsIC9bXlxcZF0vZyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB1cGRhdGUgY3JlZGl0IGNhcmQgYmxvY2tzXG4gICAgICAgIC8vIGFuZCBhdCBsZWFzdCBvbmUgb2YgZmlyc3QgNCBjaGFyYWN0ZXJzIGhhcyBjaGFuZ2VkXG4gICAgICAgIGlmIChwcHMuY3JlZGl0Q2FyZCAmJiBVdGlsLmhlYWRTdHIocHBzLnJlc3VsdCwgNCkgIT09IFV0aWwuaGVhZFN0cih2YWx1ZSwgNCkpIHtcbiAgICAgICAgICAgIGNyZWRpdENhcmRJbmZvID0gQ3JlZGl0Q2FyZERldGVjdG9yLmdldEluZm8odmFsdWUsIHBwcy5jcmVkaXRDYXJkU3RyaWN0TW9kZSk7XG5cbiAgICAgICAgICAgIHBwcy5ibG9ja3MgPSBjcmVkaXRDYXJkSW5mby5ibG9ja3M7XG4gICAgICAgICAgICBwcHMuYmxvY2tzTGVuZ3RoID0gcHBzLmJsb2Nrcy5sZW5ndGg7XG4gICAgICAgICAgICBwcHMubWF4TGVuZ3RoID0gVXRpbC5nZXRNYXhMZW5ndGgocHBzLmJsb2Nrcyk7XG5cbiAgICAgICAgICAgIC8vIGNyZWRpdCBjYXJkIHR5cGUgY2hhbmdlZFxuICAgICAgICAgICAgaWYgKHBwcy5jcmVkaXRDYXJkVHlwZSAhPT0gY3JlZGl0Q2FyZEluZm8udHlwZSkge1xuICAgICAgICAgICAgICAgIHBwcy5jcmVkaXRDYXJkVHlwZSA9IGNyZWRpdENhcmRJbmZvLnR5cGU7XG5cbiAgICAgICAgICAgICAgICBwcHMub25DcmVkaXRDYXJkVHlwZUNoYW5nZWQuY2FsbChvd25lciwgcHBzLmNyZWRpdENhcmRUeXBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHN0cmlwIG92ZXIgbGVuZ3RoIGNoYXJhY3RlcnNcbiAgICAgICAgdmFsdWUgPSBVdGlsLmhlYWRTdHIodmFsdWUsIHBwcy5tYXhMZW5ndGgpO1xuXG4gICAgICAgIC8vIGNvbnZlcnQgY2FzZVxuICAgICAgICB2YWx1ZSA9IHBwcy51cHBlcmNhc2UgPyB2YWx1ZS50b1VwcGVyQ2FzZSgpIDogdmFsdWU7XG4gICAgICAgIHZhbHVlID0gcHBzLmxvd2VyY2FzZSA/IHZhbHVlLnRvTG93ZXJDYXNlKCkgOiB2YWx1ZTtcblxuICAgICAgICAvLyBhcHBseSBibG9ja3NcbiAgICAgICAgcHBzLnJlc3VsdCA9IFV0aWwuZ2V0Rm9ybWF0dGVkVmFsdWUodmFsdWUsIHBwcy5ibG9ja3MsIHBwcy5ibG9ja3NMZW5ndGgsIHBwcy5kZWxpbWl0ZXIpO1xuXG4gICAgICAgIC8vIG5vdGhpbmcgY2hhbmdlZFxuICAgICAgICAvLyBwcmV2ZW50IHVwZGF0ZSB2YWx1ZSB0byBhdm9pZCBjYXJldCBwb3NpdGlvbiBjaGFuZ2VcbiAgICAgICAgaWYgKHByZXYgPT09IHBwcy5yZXN1bHQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIG93bmVyLnVwZGF0ZVZhbHVlU3RhdGUoKTtcbiAgICB9LFxuXG4gICAgdXBkYXRlVmFsdWVTdGF0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTogdGhpcy5wcm9wZXJ0aWVzLnJlc3VsdH0pO1xuICAgIH0sXG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG93bmVyID0gdGhpcztcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgey4uLm93bmVyLnN0YXRlLm90aGVyfVxuICAgICAgICAgICAgICAgICAgIHZhbHVlPXtvd25lci5zdGF0ZS52YWx1ZX1cbiAgICAgICAgICAgICAgICAgICBvbktleWRvd249e293bmVyLm9uS2V5ZG93bn1cbiAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17b3duZXIub25DaGFuZ2V9Lz5cbiAgICAgICAgKTtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSB3aW5kb3cuQ2xlYXZlID0gQ2xlYXZlO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFByb3BzIEFzc2lnbm1lbnRcbiAqXG4gKiBTZXBhcmF0ZSB0aGlzLCBzbyByZWFjdCBtb2R1bGUgY2FuIHNoYXJlIHRoZSB1c2FnZVxuICovXG52YXIgRGVmYXVsdFByb3BlcnRpZXMgPSB7XG4gICAgLy8gTWF5YmUgY2hhbmdlIHRvIG9iamVjdC1hc3NpZ25cbiAgICAvLyBmb3Igbm93IGp1c3Qga2VlcCBpdCBhcyBzaW1wbGVcbiAgICBhc3NpZ246IGZ1bmN0aW9uICh0YXJnZXQsIG9wdHMpIHtcbiAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0IHx8IHt9O1xuICAgICAgICBvcHRzID0gb3B0cyB8fCB7fTtcblxuICAgICAgICAvLyBjcmVkaXQgY2FyZFxuICAgICAgICB0YXJnZXQuY3JlZGl0Q2FyZCA9ICEhb3B0cy5jcmVkaXRDYXJkO1xuICAgICAgICB0YXJnZXQuY3JlZGl0Q2FyZFN0cmljdE1vZGUgPSAhIW9wdHMuY3JlZGl0Q2FyZFN0cmljdE1vZGU7XG4gICAgICAgIHRhcmdldC5jcmVkaXRDYXJkVHlwZSA9ICcnO1xuICAgICAgICB0YXJnZXQub25DcmVkaXRDYXJkVHlwZUNoYW5nZWQgPSBvcHRzLm9uQ3JlZGl0Q2FyZFR5cGVDaGFuZ2VkIHx8IChmdW5jdGlvbiAoKSB7fSk7XG5cbiAgICAgICAgLy8gcGhvbmVcbiAgICAgICAgdGFyZ2V0LnBob25lID0gISFvcHRzLnBob25lO1xuICAgICAgICB0YXJnZXQucGhvbmVSZWdpb25Db2RlID0gb3B0cy5waG9uZVJlZ2lvbkNvZGUgfHwgJ0FVJztcbiAgICAgICAgdGFyZ2V0LnBob25lRm9ybWF0dGVyID0ge307XG5cbiAgICAgICAgLy8gZGF0ZVxuICAgICAgICB0YXJnZXQuZGF0ZSA9ICEhb3B0cy5kYXRlO1xuICAgICAgICB0YXJnZXQuZGF0ZVBhdHRlcm4gPSBvcHRzLmRhdGVQYXR0ZXJuIHx8IFsnZCcsICdtJywgJ1knXTtcbiAgICAgICAgdGFyZ2V0LmRhdGVGb3JtYXR0ZXIgPSB7fTtcblxuICAgICAgICAvLyBudW1lcmFsXG4gICAgICAgIHRhcmdldC5udW1lcmFsID0gISFvcHRzLm51bWVyYWw7XG4gICAgICAgIHRhcmdldC5udW1lcmFsRGVjaW1hbFNjYWxlID0gb3B0cy5udW1lcmFsRGVjaW1hbFNjYWxlIHx8IDI7XG4gICAgICAgIHRhcmdldC5udW1lcmFsRGVjaW1hbE1hcmsgPSBvcHRzLm51bWVyYWxEZWNpbWFsTWFyayB8fCAnLic7XG4gICAgICAgIHRhcmdldC5udW1lcmFsVGhvdXNhbmRzR3JvdXBTdHlsZSA9IG9wdHMubnVtZXJhbFRob3VzYW5kc0dyb3VwU3R5bGUgfHwgJ3Rob3VzYW5kJztcblxuICAgICAgICAvLyBvdGhlcnNcbiAgICAgICAgdGFyZ2V0LmluaXRWYWx1ZSA9IG9wdHMuaW5pdFZhbHVlIHx8ICcnO1xuXG4gICAgICAgIHRhcmdldC5udW1lcmljT25seSA9IHRhcmdldC5jcmVkaXRDYXJkIHx8IHRhcmdldC5kYXRlIHx8ICEhb3B0cy5udW1lcmljT25seTtcblxuICAgICAgICB0YXJnZXQudXBwZXJjYXNlID0gISFvcHRzLnVwcGVyY2FzZTtcbiAgICAgICAgdGFyZ2V0Lmxvd2VyY2FzZSA9ICEhb3B0cy5sb3dlcmNhc2U7XG5cbiAgICAgICAgdGFyZ2V0LnByZWZpeCA9ICh0YXJnZXQuY3JlZGl0Q2FyZCB8fCB0YXJnZXQucGhvbmUgfHwgdGFyZ2V0LmRhdGUpID8gJycgOiAob3B0cy5wcmVmaXggfHwgJycpO1xuXG4gICAgICAgIHRhcmdldC5kZWxpbWl0ZXIgPSBvcHRzLmRlbGltaXRlciB8fCAodGFyZ2V0LmRhdGUgPyAnLycgOiAodGFyZ2V0Lm51bWVyYWwgPyAnLCcgOiAnICcpKTtcbiAgICAgICAgdGFyZ2V0LmRlbGltaXRlclJFID0gbmV3IFJlZ0V4cCh0YXJnZXQuZGVsaW1pdGVyLCAnZycpO1xuXG4gICAgICAgIHRhcmdldC5ibG9ja3MgPSBvcHRzLmJsb2NrcyB8fCBbXTtcbiAgICAgICAgdGFyZ2V0LmJsb2Nrc0xlbmd0aCA9IHRhcmdldC5ibG9ja3MubGVuZ3RoO1xuXG4gICAgICAgIHRhcmdldC5tYXhMZW5ndGggPSAwO1xuXG4gICAgICAgIHRhcmdldC5iYWNrc3BhY2UgPSBmYWxzZTtcbiAgICAgICAgdGFyZ2V0LnJlc3VsdCA9ICcnO1xuXG4gICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfVxufTtcblxuaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBEZWZhdWx0UHJvcGVydGllcztcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIENyZWRpdENhcmREZXRlY3RvciA9IHtcbiAgICBibG9ja3M6IHtcbiAgICAgICAgdWF0cDogICAgICAgICAgWzQsIDUsIDZdLFxuICAgICAgICBhbWV4OiAgICAgICAgICBbNCwgNiwgNV0sXG4gICAgICAgIGRpbmVyczogICAgICAgIFs0LCA2LCA0XSxcbiAgICAgICAgbWFzdGVyY2FyZDogICAgWzQsIDQsIDQsIDRdLFxuICAgICAgICBkYW5rb3J0OiAgICAgICBbNCwgNCwgNCwgNF0sXG4gICAgICAgIGluc3RhcGF5bWVudDogIFs0LCA0LCA0LCA0XSxcbiAgICAgICAgamNiOiAgICAgICAgICAgWzQsIDQsIDQsIDRdLFxuICAgICAgICB2aXNhOiAgICAgICAgICBbNCwgNCwgNCwgNF0sXG4gICAgICAgIGdlbmVyYWxMb29zZTogIFs0LCA0LCA0LCA0XSxcbiAgICAgICAgZ2VuZXJhbFN0cmljdDogWzQsIDQsIDQsIDddXG4gICAgfSxcblxuICAgIHJlOiB7XG4gICAgICAgIC8vIHN0YXJ0cyB3aXRoIDE7IDE1IGRpZ2l0cywgbm90IHN0YXJ0cyB3aXRoIDE4MDAgKGpjYiBjYXJkKVxuICAgICAgICB1YXRwOiAvXig/ITE4MDApMVxcZHswLDE0fS8sXG5cbiAgICAgICAgLy8gc3RhcnRzIHdpdGggMzQvMzc7IDE1IGRpZ2l0c1xuICAgICAgICBhbWV4OiAvXjNbNDddXFxkezAsMTN9LyxcblxuICAgICAgICAvLyBzdGFydHMgd2l0aCAzMDAtMzA1LzMwOSBvciAzNi8zOC8zOTsgMTQgZGlnaXRzXG4gICAgICAgIGRpbmVyczogL14zKD86MChbMC01XXw5KXxbNjg5XVxcZD8pXFxkezAsMTF9LyxcblxuICAgICAgICAvLyBzdGFydHMgd2l0aCA1MS01NSBvciAyMi0yNzsgMTYgZGlnaXRzXG4gICAgICAgIG1hc3RlcmNhcmQ6IC9eKDVbMS01XXwyWzItN10pXFxkezAsMTR9LyxcblxuICAgICAgICAvLyBzdGFydHMgd2l0aCA1MDE5LzQxNzUvNDU3MTsgMTYgZGlnaXRzXG4gICAgICAgIGRhbmtvcnQ6IC9eKDUwMTl8NDE3NXw0NTcxKVxcZHswLDEyfS8sXG5cbiAgICAgICAgLy8gc3RhcnRzIHdpdGggNjM3LTYzOTsgMTYgZGlnaXRzXG4gICAgICAgIGluc3RhcGF5bWVudDogL142M1s3LTldXFxkezAsMTN9LyxcblxuICAgICAgICAvLyBzdGFydHMgd2l0aCAyMTMxLzE4MDAvMzU7IDE2IGRpZ2l0c1xuICAgICAgICBqY2I6IC9eKD86MjEzMXwxODAwfDM1XFxkezAsMn0pXFxkezAsMTJ9LyxcblxuICAgICAgICAvLyBzdGFydHMgd2l0aCA0OyAxNiBkaWdpdHNcbiAgICAgICAgdmlzYTogL140XFxkezAsMTV9L1xuICAgIH0sXG5cbiAgICBnZXRJbmZvOiBmdW5jdGlvbiAodmFsdWUsIHN0cmljdE1vZGUpIHtcbiAgICAgICAgdmFyIGJsb2NrcyA9IENyZWRpdENhcmREZXRlY3Rvci5ibG9ja3MsXG4gICAgICAgICAgICByZSA9IENyZWRpdENhcmREZXRlY3Rvci5yZTtcblxuICAgICAgICAvLyBJbiB0aGVvcnksIHZpc2EgY3JlZGl0IGNhcmQgY2FuIGhhdmUgdXAgdG8gMTkgZGlnaXRzIG51bWJlci5cbiAgICAgICAgLy8gU2V0IHN0cmljdE1vZGUgdG8gdHJ1ZSB3aWxsIHJlbW92ZSB0aGUgMTYgbWF4LWxlbmd0aCByZXN0cmFpbixcbiAgICAgICAgLy8gaG93ZXZlciwgSSBuZXZlciBmb3VuZCBhbnkgd2Vic2l0ZSB2YWxpZGF0ZSBjYXJkIG51bWJlciBsaWtlXG4gICAgICAgIC8vIHRoaXMsIGhlbmNlIHByb2JhYmx5IHlvdSBkb24ndCBuZWVkIHRvIGVuYWJsZSB0aGlzIG9wdGlvbi5cbiAgICAgICAgc3RyaWN0TW9kZSA9ICEhc3RyaWN0TW9kZTtcblxuICAgICAgICBpZiAocmUuYW1leC50ZXN0KHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0eXBlOiAgICdhbWV4JyxcbiAgICAgICAgICAgICAgICBibG9ja3M6IGJsb2Nrcy5hbWV4XG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2UgaWYgKHJlLnVhdHAudGVzdCh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdHlwZTogICAndWF0cCcsXG4gICAgICAgICAgICAgICAgYmxvY2tzOiBibG9ja3MudWF0cFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIGlmIChyZS5kaW5lcnMudGVzdCh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdHlwZTogICAnZGluZXJzJyxcbiAgICAgICAgICAgICAgICBibG9ja3M6IGJsb2Nrcy5kaW5lcnNcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSBpZiAocmUubWFzdGVyY2FyZC50ZXN0KHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0eXBlOiAgICdtYXN0ZXJjYXJkJyxcbiAgICAgICAgICAgICAgICBibG9ja3M6IGJsb2Nrcy5tYXN0ZXJjYXJkXG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2UgaWYgKHJlLmRhbmtvcnQudGVzdCh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdHlwZTogICAnZGFua29ydCcsXG4gICAgICAgICAgICAgICAgYmxvY2tzOiBibG9ja3MuZGFua29ydFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIGlmIChyZS5pbnN0YXBheW1lbnQudGVzdCh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdHlwZTogICAnaW5zdGFwYXltZW50JyxcbiAgICAgICAgICAgICAgICBibG9ja3M6IGJsb2Nrcy5pbnN0YXBheW1lbnRcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSBpZiAocmUuamNiLnRlc3QodmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHR5cGU6ICAgJ2pjYicsXG4gICAgICAgICAgICAgICAgYmxvY2tzOiBibG9ja3MuamNiXG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2UgaWYgKHJlLnZpc2EudGVzdCh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdHlwZTogICAndmlzYScsXG4gICAgICAgICAgICAgICAgYmxvY2tzOiBibG9ja3MudmlzYVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIGlmIChzdHJpY3RNb2RlKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHR5cGU6ICAgJ3Vua25vd24nLFxuICAgICAgICAgICAgICAgIGJsb2NrczogYmxvY2tzLmdlbmVyYWxTdHJpY3RcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHR5cGU6ICAgJ3Vua25vd24nLFxuICAgICAgICAgICAgICAgIGJsb2NrczogYmxvY2tzLmdlbmVyYWxMb29zZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbmlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gQ3JlZGl0Q2FyZERldGVjdG9yO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgRGF0ZUZvcm1hdHRlciA9IGZ1bmN0aW9uIChkYXRlUGF0dGVybikge1xuICAgIHZhciBvd25lciA9IHRoaXM7XG5cbiAgICBvd25lci5ibG9ja3MgPSBbXTtcbiAgICBvd25lci5kYXRlUGF0dGVybiA9IGRhdGVQYXR0ZXJuO1xuICAgIG93bmVyLmluaXRCbG9ja3MoKTtcbn07XG5cbkRhdGVGb3JtYXR0ZXIucHJvdG90eXBlID0ge1xuICAgIGluaXRCbG9ja3M6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG93bmVyID0gdGhpcztcbiAgICAgICAgb3duZXIuZGF0ZVBhdHRlcm4uZm9yRWFjaChmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gJ1knKSB7XG4gICAgICAgICAgICAgICAgb3duZXIuYmxvY2tzLnB1c2goNCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG93bmVyLmJsb2Nrcy5wdXNoKDIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgZ2V0QmxvY2tzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJsb2NrcztcbiAgICB9LFxuXG4gICAgZ2V0VmFsaWRhdGVkRGF0ZTogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHZhciBvd25lciA9IHRoaXMsIHJlc3VsdCA9ICcnO1xuXG4gICAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvW15cXGRdL2csICcnKTtcblxuICAgICAgICBvd25lci5ibG9ja3MuZm9yRWFjaChmdW5jdGlvbiAobGVuZ3RoLCBpbmRleCkge1xuICAgICAgICAgICAgaWYgKHZhbHVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICB2YXIgc3ViID0gdmFsdWUuc2xpY2UoMCwgbGVuZ3RoKSxcbiAgICAgICAgICAgICAgICAgICAgcmVzdCA9IHZhbHVlLnNsaWNlKGxlbmd0aCk7XG5cbiAgICAgICAgICAgICAgICBzd2l0Y2ggKG93bmVyLmRhdGVQYXR0ZXJuW2luZGV4XSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2QnOlxuICAgICAgICAgICAgICAgICAgICBpZiAocGFyc2VJbnQoc3ViLCAxMCkgPiAzMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3ViID0gJzMxJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdtJzpcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcnNlSW50KHN1YiwgMTApID4gMTIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YiA9ICcxMic7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmVzdWx0ICs9IHN1YjtcblxuICAgICAgICAgICAgICAgIC8vIHVwZGF0ZSByZW1haW5pbmcgc3RyaW5nXG4gICAgICAgICAgICAgICAgdmFsdWUgPSByZXN0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbn07XG5cbmlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gRGF0ZUZvcm1hdHRlcjtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIE51bWVyYWxGb3JtYXR0ZXIgPSBmdW5jdGlvbiAobnVtZXJhbERlY2ltYWxNYXJrLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVtZXJhbERlY2ltYWxTY2FsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bWVyYWxUaG91c2FuZHNHcm91cFN0eWxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsaW1pdGVyKSB7XG4gICAgdmFyIG93bmVyID0gdGhpcztcblxuICAgIG93bmVyLm51bWVyYWxEZWNpbWFsTWFyayA9IG51bWVyYWxEZWNpbWFsTWFyayB8fCAnLic7XG4gICAgb3duZXIubnVtZXJhbERlY2ltYWxTY2FsZSA9IG51bWVyYWxEZWNpbWFsU2NhbGUgfHwgMjtcbiAgICBvd25lci5udW1lcmFsVGhvdXNhbmRzR3JvdXBTdHlsZSA9IG51bWVyYWxUaG91c2FuZHNHcm91cFN0eWxlIHx8IE51bWVyYWxGb3JtYXR0ZXIuZ3JvdXBTdHlsZS50aG91c2FuZDtcbiAgICBvd25lci5kZWxpbWl0ZXIgPSBkZWxpbWl0ZXIgfHwgJywnO1xufTtcblxuTnVtZXJhbEZvcm1hdHRlci5ncm91cFN0eWxlID0ge1xuICAgIHRob3VzYW5kOiAndGhvdXNhbmQnLFxuICAgIGxha2g6ICAgICAnbGFraCcsXG4gICAgd2FuOiAgICAgICd3YW4nXG59O1xuXG5OdW1lcmFsRm9ybWF0dGVyLnByb3RvdHlwZSA9IHtcbiAgICBmb3JtYXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICB2YXIgb3duZXIgPSB0aGlzLCBwYXJ0cywgcGFydEludGVnZXIsIHBhcnREZWNpbWFsID0gJyc7XG5cbiAgICAgICAgLy8gc3RyaXAgYWxwaGFiZXQgbGV0dGVyc1xuICAgICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL1tBLVphLXpdL2csICcnKVxuXG4gICAgICAgICAgICAvLyByZXBsYWNlIHRoZSBmaXJzdCBkZWNpbWFsIG1hcmsgd2l0aCByZXNlcnZlZCBwbGFjZWhvbGRlclxuICAgICAgICAgICAgLnJlcGxhY2Uob3duZXIubnVtZXJhbERlY2ltYWxNYXJrLCAnTScpXG5cbiAgICAgICAgICAgIC8vIHN0cmlwIHRoZSBub24gbnVtZXJpYyBsZXR0ZXJzIGV4Y2VwdCBNXG4gICAgICAgICAgICAucmVwbGFjZSgvW15cXGRNXS9nLCAnJylcblxuICAgICAgICAgICAgLy8gcmVwbGFjZSBtYXJrXG4gICAgICAgICAgICAucmVwbGFjZSgnTScsIG93bmVyLm51bWVyYWxEZWNpbWFsTWFyaylcblxuICAgICAgICAgICAgLy8gc3RyaXAgbGVhZGluZyAwXG4gICAgICAgICAgICAucmVwbGFjZSgvXigtKT8wKyg/PVxcZCkvLCAnJDEnKTtcblxuICAgICAgICBwYXJ0SW50ZWdlciA9IHZhbHVlO1xuXG4gICAgICAgIGlmICh2YWx1ZS5pbmRleE9mKG93bmVyLm51bWVyYWxEZWNpbWFsTWFyaykgPj0gMCkge1xuICAgICAgICAgICAgcGFydHMgPSB2YWx1ZS5zcGxpdChvd25lci5udW1lcmFsRGVjaW1hbE1hcmspO1xuICAgICAgICAgICAgcGFydEludGVnZXIgPSBwYXJ0c1swXTtcbiAgICAgICAgICAgIHBhcnREZWNpbWFsID0gb3duZXIubnVtZXJhbERlY2ltYWxNYXJrICsgcGFydHNbMV0uc2xpY2UoMCwgb3duZXIubnVtZXJhbERlY2ltYWxTY2FsZSk7XG4gICAgICAgIH1cblxuICAgICAgICBzd2l0Y2ggKG93bmVyLm51bWVyYWxUaG91c2FuZHNHcm91cFN0eWxlKSB7XG4gICAgICAgIGNhc2UgTnVtZXJhbEZvcm1hdHRlci5ncm91cFN0eWxlLmxha2g6XG4gICAgICAgICAgICBwYXJ0SW50ZWdlciA9IHBhcnRJbnRlZ2VyLnJlcGxhY2UoLyhcXGQpKD89KFxcZFxcZCkrXFxkJCkvZywgJyQxJyArIG93bmVyLmRlbGltaXRlcik7XG5cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgTnVtZXJhbEZvcm1hdHRlci5ncm91cFN0eWxlLndhbjpcbiAgICAgICAgICAgIHBhcnRJbnRlZ2VyID0gcGFydEludGVnZXIucmVwbGFjZSgvKFxcZCkoPz0oXFxkezR9KSskKS9nLCAnJDEnICsgb3duZXIuZGVsaW1pdGVyKTtcblxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHBhcnRJbnRlZ2VyID0gcGFydEludGVnZXIucmVwbGFjZSgvKFxcZCkoPz0oXFxkezN9KSskKS9nLCAnJDEnICsgb3duZXIuZGVsaW1pdGVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwYXJ0SW50ZWdlci50b1N0cmluZygpICsgcGFydERlY2ltYWwudG9TdHJpbmcoKTtcbiAgICB9XG59O1xuXG5pZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IE51bWVyYWxGb3JtYXR0ZXI7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBQaG9uZUZvcm1hdHRlciA9IGZ1bmN0aW9uIChmb3JtYXR0ZXIsIGRlbGltaXRlcikge1xuICAgIHZhciBvd25lciA9IHRoaXM7XG5cbiAgICBvd25lci5kZWxpbWl0ZXIgPSBkZWxpbWl0ZXIgfHwgJyAnO1xuICAgIG93bmVyLmRlbGltaXRlclJFID0gbmV3IFJlZ0V4cChvd25lci5kZWxpbWl0ZXIsICdnJyk7XG4gICAgb3duZXIuZm9ybWF0dGVyID0gZm9ybWF0dGVyO1xufTtcblxuUGhvbmVGb3JtYXR0ZXIucHJvdG90eXBlID0ge1xuICAgIHNldEZvcm1hdHRlcjogZnVuY3Rpb24gKGZvcm1hdHRlcikge1xuICAgICAgICB0aGlzLmZvcm1hdHRlciA9IGZvcm1hdHRlcjtcbiAgICB9LFxuXG4gICAgZm9ybWF0OiBmdW5jdGlvbiAocGhvbmVOdW1iZXIpIHtcbiAgICAgICAgdmFyIG93bmVyID0gdGhpcztcblxuICAgICAgICBvd25lci5mb3JtYXR0ZXIuY2xlYXIoKTtcblxuICAgICAgICAvLyBvbmx5IGtlZXAgbnVtYmVyIGFuZCArXG4gICAgICAgIHBob25lTnVtYmVyID0gcGhvbmVOdW1iZXIucmVwbGFjZSgvW15cXGQrXS9nLCAnJyk7XG5cbiAgICAgICAgLy8gc3RyaXAgZGVsaW1pdGVyXG4gICAgICAgIHBob25lTnVtYmVyID0gcGhvbmVOdW1iZXIucmVwbGFjZShvd25lci5kZWxpbWl0ZXJSRSwgJycpO1xuXG4gICAgICAgIHZhciByZXN1bHQgPSAnJywgY3VycmVudCwgdmFsaWRhdGVkID0gZmFsc2U7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGlNYXggPSBwaG9uZU51bWJlci5sZW5ndGg7IGkgPCBpTWF4OyBpKyspIHtcbiAgICAgICAgICAgIGN1cnJlbnQgPSBvd25lci5mb3JtYXR0ZXIuaW5wdXREaWdpdChwaG9uZU51bWJlci5jaGFyQXQoaSkpO1xuXG4gICAgICAgICAgICAvLyBoYXMgKCktIG9yIHNwYWNlIGluc2lkZVxuICAgICAgICAgICAgaWYgKC9bXFxzKCktXS9nLnRlc3QoY3VycmVudCkpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBjdXJyZW50O1xuXG4gICAgICAgICAgICAgICAgdmFsaWRhdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKCF2YWxpZGF0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gY3VycmVudDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gZWxzZTogb3ZlciBsZW5ndGggaW5wdXRcbiAgICAgICAgICAgICAgICAvLyBpdCB0dXJucyB0byBpbnZhbGlkIG51bWJlciBhZ2FpblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gc3RyaXAgKClcbiAgICAgICAgLy8gZS5nLiBVUzogNzE2MTIzNDU2NyByZXR1cm5zICg3MTYpIDEyMy00NTY3XG4gICAgICAgIHJlc3VsdCA9IHJlc3VsdC5yZXBsYWNlKC9bKCldL2csICcnKTtcbiAgICAgICAgLy8gcmVwbGFjZSBsaWJyYXJ5IGRlbGltaXRlciB3aXRoIHVzZXIgY3VzdG9taXplZCBkZWxpbWl0ZXJcbiAgICAgICAgcmVzdWx0ID0gcmVzdWx0LnJlcGxhY2UoL1tcXHMtXS9nLCBvd25lci5kZWxpbWl0ZXIpO1xuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxufTtcblxuaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBQaG9uZUZvcm1hdHRlcjtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIFV0aWwgPSB7XG4gICAgbm9vcDogZnVuY3Rpb24gKCkge1xuICAgIH0sXG5cbiAgICBzdHJpcDogZnVuY3Rpb24gKHZhbHVlLCByZSkge1xuICAgICAgICByZXR1cm4gdmFsdWUucmVwbGFjZShyZSwgJycpO1xuICAgIH0sXG5cbiAgICBoZWFkU3RyOiBmdW5jdGlvbiAoc3RyLCBsZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIHN0ci5zbGljZSgwLCBsZW5ndGgpO1xuICAgIH0sXG5cbiAgICBnZXRNYXhMZW5ndGg6IGZ1bmN0aW9uIChibG9ja3MpIHtcbiAgICAgICAgcmV0dXJuIGJsb2Nrcy5yZWR1Y2UoZnVuY3Rpb24gKHByZXZpb3VzLCBjdXJyZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gcHJldmlvdXMgKyBjdXJyZW50O1xuICAgICAgICB9LCAwKTtcbiAgICB9LFxuXG4gICAgZ2V0UHJlZml4QXBwbGllZFZhbHVlOiBmdW5jdGlvbiAodmFsdWUsIHByZWZpeCkge1xuICAgICAgICB2YXIgcHJlZml4TGVuZ3RoID0gcHJlZml4Lmxlbmd0aCxcbiAgICAgICAgICAgIHByZWZpeExlbmd0aFZhbHVlO1xuXG4gICAgICAgIGlmIChwcmVmaXhMZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByZWZpeExlbmd0aFZhbHVlID0gdmFsdWUuc2xpY2UoMCwgcHJlZml4TGVuZ3RoKTtcblxuICAgICAgICBpZiAocHJlZml4TGVuZ3RoVmFsdWUubGVuZ3RoIDwgcHJlZml4TGVuZ3RoKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IHByZWZpeDtcbiAgICAgICAgfSBlbHNlIGlmIChwcmVmaXhMZW5ndGhWYWx1ZSAhPT0gcHJlZml4KSB7XG4gICAgICAgICAgICB2YWx1ZSA9IHByZWZpeCArIHZhbHVlLnNsaWNlKHByZWZpeExlbmd0aCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfSxcblxuICAgIGdldEZvcm1hdHRlZFZhbHVlOiBmdW5jdGlvbiAodmFsdWUsIGJsb2NrcywgYmxvY2tzTGVuZ3RoLCBkZWxpbWl0ZXIpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9ICcnO1xuXG4gICAgICAgIGJsb2Nrcy5mb3JFYWNoKGZ1bmN0aW9uIChsZW5ndGgsIGluZGV4KSB7XG4gICAgICAgICAgICBpZiAodmFsdWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHZhciBzdWIgPSB2YWx1ZS5zbGljZSgwLCBsZW5ndGgpLFxuICAgICAgICAgICAgICAgICAgICByZXN0ID0gdmFsdWUuc2xpY2UobGVuZ3RoKTtcblxuICAgICAgICAgICAgICAgIHJlc3VsdCArPSBzdWI7XG5cbiAgICAgICAgICAgICAgICBpZiAoc3ViLmxlbmd0aCA9PT0gbGVuZ3RoICYmIGluZGV4IDwgYmxvY2tzTGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gZGVsaW1pdGVyO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIHVwZGF0ZSByZW1haW5pbmcgc3RyaW5nXG4gICAgICAgICAgICAgICAgdmFsdWUgPSByZXN0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbn07XG5cbmlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gVXRpbDtcbn1cbiJdfQ==
