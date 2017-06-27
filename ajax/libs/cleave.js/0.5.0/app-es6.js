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

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

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

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
} //var React = require('react');
//var ReactDOM = require('react-dom');

var MyComponent = function (_React$Component) {
    _inherits(MyComponent, _React$Component);

    function MyComponent(props, context) {
        _classCallCheck(this, MyComponent);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MyComponent).call(this, props, context));

        _this.state = {
            creditCardType: '',
            creditCardRawValue: '',
            phoneRawValue: '',
            dateRawValue: '',
            numeralRawValue: '',
            customRawValue: ''
        };
        return _this;
    }

    _createClass(MyComponent, [{
        key: 'onCreditCardChange',
        value: function onCreditCardChange(event) {
            this.setState({ creditCardRawValue: event.target.rawValue });
        }
    }, {
        key: 'onPhoneChange',
        value: function onPhoneChange(event) {
            this.setState({ phoneRawValue: event.target.rawValue });
        }
    }, {
        key: 'onDateChange',
        value: function onDateChange(event) {
            this.setState({ dateRawValue: event.target.rawValue });
        }
    }, {
        key: 'onNumeralChange',
        value: function onNumeralChange(event) {
            this.setState({ numeralRawValue: event.target.rawValue });
        }
    }, {
        key: 'onCustomChange',
        value: function onCustomChange(event) {
            this.setState({ customRawValue: event.target.rawValue });
        }
    }, {
        key: 'onCreditCardTypeChanged',
        value: function onCreditCardTypeChanged(type) {
            this.setState({ creditCardType: type });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement('div', null, _react2.default.createElement(_react4.default, { placeholder: 'Enter credit card number', options: { creditCard: true, onCreditCardTypeChanged: this.onCreditCardTypeChanged.bind(this) },
                onChange: this.onCreditCardChange.bind(this) }), _react2.default.createElement(_react4.default, { placeholder: 'Enter phone number', options: { phone: true, phoneRegionCode: 'AU' },
                onChange: this.onPhoneChange.bind(this) }), _react2.default.createElement(_react4.default, { placeholder: 'Enter date', options: { date: true, datePattern: ['Y', 'm', 'd'] },
                onChange: this.onDateChange.bind(this) }), _react2.default.createElement(_react4.default, { className: 'input-numeral', placeholder: 'Enter numeral', options: { numeral: true, delimiter: '', numeralDecimalMark: ',', numeralThousandsGroupStyle: 'thousand' },
                onChange: this.onNumeralChange.bind(this) }), _react2.default.createElement(_react4.default, { placeholder: 'Custom delimiter / blocks', options: { blocks: [4, 3, 3], numericOnly: true },
                onChange: this.onCustomChange.bind(this) }), _react2.default.createElement('div', { className: 'raw-values' }, _react2.default.createElement('p', null, 'credit card: ', this.state.creditCardRawValue), _react2.default.createElement('p', null, 'credit card type: ', this.state.creditCardType), _react2.default.createElement('p', null, 'phone: ', this.state.phoneRawValue), _react2.default.createElement('p', null, 'date: ', this.state.dateRawValue), _react2.default.createElement('p', null, 'numeral: ', this.state.numeralRawValue), _react2.default.createElement('p', null, 'custom: ', this.state.customRawValue)));
        }
    }]);

    return MyComponent;
}(_react2.default.Component);

_reactDom2.default.render(_react2.default.createElement(MyComponent, null), document.getElementById('content'));

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
            phoneRegionCode = nextProps.options.phoneRegionCode,
            newValue = nextProps.value;

        if (newValue) {
            owner.onInput(newValue);
        }

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
        var onKeyDown = _owner$props.onKeyDown;
        var onChange = _owner$props.onChange;

        var other = _objectWithoutProperties(_owner$props, ['value', 'options', 'onKeyDown', 'onChange']);

        owner.registeredEvents = {
            onChange: onChange || Util.noop,
            onKeyDown: onKeyDown || Util.noop
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
        if (!pps.numeral && !pps.phone && !pps.creditCard && !pps.date && pps.blocksLength === 0 && !pps.prefix) {
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

    onKeyDown: function onKeyDown(event) {
        var owner = this,
            pps = owner.properties,
            charCode = event.which || event.keyCode;

        // hit backspace when last character is delimiter
        if (charCode === 8 && pps.result.slice(-1) === pps.delimiter) {
            pps.backspace = true;
        } else {
            pps.backspace = false;
        }

        owner.registeredEvents.onKeyDown(event);
    },

    onChange: function onChange(event) {
        var owner = this,
            pps = owner.properties;

        owner.onInput(event.target.value);

        if (pps.numeral) {
            event.target.rawValue = pps.numeralFormatter.getRawValue(pps.result);
        } else {
            event.target.rawValue = Util.strip(pps.result, pps.delimiterRE);
        }

        owner.registeredEvents.onChange(event);
    },

    onInput: function onInput(value) {
        var owner = this,
            pps = owner.properties,
            prev = pps.result;

        // case 1: delete one more character "4"
        // 1234*| -> hit backspace -> 123|
        // case 2: last character is not delimiter which is:
        // 12|34* -> hit backspace -> 1|34*

        if (!pps.numeral && pps.backspace && value.slice(-1) !== pps.delimiter) {
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
            pps.result = pps.prefix + pps.numeralFormatter.format(value);
            owner.updateValueState();

            return;
        }

        // date
        if (pps.date) {
            value = pps.dateFormatter.getValidatedDate(value);
        }

        // strip delimiters
        value = Util.strip(value, pps.delimiterRE);

        // strip prefix
        value = Util.getPrefixStrippedValue(value, pps.prefixLength);

        // strip non-numeric characters
        value = pps.numericOnly ? Util.strip(value, /[^\d]/g) : value;

        // convert case
        value = pps.uppercase ? value.toUpperCase() : value;
        value = pps.lowercase ? value.toLowerCase() : value;

        // prefix
        if (pps.prefix) {
            value = pps.prefix + value;

            // no blocks specified, no need to do formatting
            if (pps.blocksLength === 0) {
                pps.result = value;
                owner.updateValueState();

                return;
            }
        }

        // update credit card props
        if (pps.creditCard) {
            owner.updateCreditCardPropsByValue(value);
        }

        // strip over length characters
        value = Util.headStr(value, pps.maxLength);

        // apply blocks
        pps.result = Util.getFormattedValue(value, pps.blocks, pps.blocksLength, pps.delimiter);

        // nothing changed
        // prevent update value to avoid caret position change
        if (prev === pps.result && prev !== pps.prefix) {
            return;
        }

        owner.updateValueState();
    },

    updateCreditCardPropsByValue: function updateCreditCardPropsByValue(value) {
        var owner = this,
            pps = owner.properties,
            creditCardInfo;

        // At least one of the first 4 characters has changed
        if (Util.headStr(pps.result, 4) === Util.headStr(value, 4)) {
            return;
        }

        creditCardInfo = CreditCardDetector.getInfo(value, pps.creditCardStrictMode);

        pps.blocks = creditCardInfo.blocks;
        pps.blocksLength = pps.blocks.length;
        pps.maxLength = Util.getMaxLength(pps.blocks);

        // credit card type changed
        if (pps.creditCardType !== creditCardInfo.type) {
            pps.creditCardType = creditCardInfo.type;

            pps.onCreditCardTypeChanged.call(owner, pps.creditCardType);
        }
    },

    updateValueState: function updateValueState() {
        this.setState({ value: this.properties.result });
    },

    render: function render() {
        var owner = this;

        return React.createElement('input', _extends({ type: 'text' }, owner.state.other, {
            value: owner.state.value,
            onKeyDown: owner.onKeyDown,
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
        target.numericOnly = target.creditCard || target.date || !!opts.numericOnly;

        target.uppercase = !!opts.uppercase;
        target.lowercase = !!opts.lowercase;

        target.prefix = target.creditCard || target.phone || target.date ? '' : opts.prefix || '';
        target.prefixLength = target.prefix.length;

        target.initValue = opts.initValue || '';

        target.delimiter = opts.delimiter || opts.delimiter === '' ? opts.delimiter : opts.date ? '/' : opts.numeral ? ',' : opts.phone ? ' ' : ' ';
        target.delimiterRE = new RegExp('\\' + (target.delimiter || ' '), 'g');

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
        discover: [4, 4, 4, 4],
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

        // starts with 6011/65/644-649; 16 digits
        discover: /^(?:6011|65\d{0,2}|64[4-9]\d?)\d{0,12}/,

        // starts with 300-305/309 or 36/38/39; 14 digits
        diners: /^3(?:0([0-5]|9)|[689]\d?)\d{0,11}/,

        // starts with 51-55/22-27; 16 digits
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
        } else if (re.discover.test(value)) {
            return {
                type: 'discover',
                blocks: blocks.discover
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
                        } else if (parseInt(sub, 10) === 0) {
                            //sub = '01';
                        }
                        break;
                    case 'm':
                        if (parseInt(sub, 10) > 12) {
                            sub = '12';
                        } else if (parseInt(sub, 10) === 0) {
                            //sub = '01';
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
    owner.delimiterRE = new RegExp('\\' + (delimiter || ','), 'g');
    owner.delimiter = delimiter === '' || delimiter ? delimiter : ',';
};

NumeralFormatter.groupStyle = {
    thousand: 'thousand',
    lakh: 'lakh',
    wan: 'wan'
};

NumeralFormatter.prototype = {
    getRawValue: function getRawValue(value) {
        var owner = this;

        // delimiter and decimal mark won't be the same
        // so here delimiter can be '.' but not for the numeralDecimalMark
        if (owner.delimiter === '.') {
            return value.replace(this.delimiterRE, '').replace(this.numeralDecimalMark, '.');
        }

        // here numeralDecimalMark can be '.' but not for the delimiter
        return value.replace(this.numeralDecimalMark, '.').replace(this.delimiterRE, '');
    },

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

    owner.delimiterRE = new RegExp('\\' + (delimiter || ' '), 'g');
    owner.delimiter = delimiter === '' || delimiter ? delimiter : ' ';

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

    // strip value by prefix length
    // for prefix: PRE
    // (PRE123, 3) -> 123
    // (PR123, 3) -> 23 this happens when user hits backspace in front of "PRE"
    getPrefixStrippedValue: function getPrefixStrippedValue(value, prefixLength) {
        return value.slice(prefixLength);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkaXN0L2FkZG9ucy9jbGVhdmUtcGhvbmUuYXUuanMiLCJsb2NhbC9hcHAtZXM2LmpzIiwicmVhY3QuanMiLCJzcmMvQ2xlYXZlLnJlYWN0LmpzIiwic3JjL2NvbW1vbi9EZWZhdWx0UHJvcGVydGllcy5qcyIsInNyYy9zaG9ydGN1dHMvQ3JlZGl0Q2FyZERldGVjdG9yLmpzIiwic3JjL3Nob3J0Y3V0cy9EYXRlRm9ybWF0dGVyLmpzIiwic3JjL3Nob3J0Y3V0cy9OdW1lcmFsRm9ybWF0dGVyLmpzIiwic3JjL3Nob3J0Y3V0cy9QaG9uZUZvcm1hdHRlci5qcyIsInNyYy91dGlscy9VdGlsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxDQUFDLFlBQVUsQUFBQztXQUFBLEFBQVMsRUFBVCxBQUFXLEdBQVgsQUFBYSxHQUFFLEFBQUM7UUFBSSxJQUFFLEVBQUEsQUFBRSxNQUFSLEFBQU0sQUFBUTtRQUFLLElBQW5CLEFBQXFCLEVBQUUsRUFBQSxBQUFFLE1BQUYsQUFBTyxLQUFHLENBQUMsRUFBWCxBQUFhLGNBQVksRUFBQSxBQUFFLFdBQVcsU0FBTyxFQUE3QyxBQUF5QixBQUFvQixBQUFFLElBQUksS0FBSSxJQUFKLEFBQVEsR0FBRSxFQUFBLEFBQUUsV0FBUyxJQUFFLEVBQXZCLEFBQVUsQUFBYSxBQUFFLFdBQVU7UUFBQSxBQUFFLFVBQVEsS0FBQSxBQUFLLE1BQWYsQUFBbUIsSUFBRSxJQUFFLEVBQUEsQUFBRSxLQUFHLEVBQUwsQUFBSyxBQUFFLEtBQUcsRUFBQSxBQUFFLEtBQW5DLEFBQXNDLEtBQUcsRUFBQSxBQUFFLEtBQTlFLEFBQW1DLEFBQThDO0FBQUU7WUFBQSxBQUFTLEVBQVQsQUFBVyxHQUFYLEFBQWEsR0FBRSxBQUFDO2FBQUEsQUFBUyxJQUFHLEFBQUUsSUFBQSxBQUFFLFlBQVUsRUFBWixBQUFj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Q0FBUCxBQUFPLGFBQVAsQUFBa0IsWUFBWSxRQUFPLE9BQVAsQUFBYyxhQUFoRCxBQUE0RCxVQUFVLEFBQ2xFO1dBQUEsQUFBTyxVQUFVLFVBQWpCLEFBQTJCLEFBQzlCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIihmdW5jdGlvbigpe2Z1bmN0aW9uIHQodCxuKXt2YXIgZT10LnNwbGl0KFwiLlwiKSxyPXE7ZVswXWluIHJ8fCFyLmV4ZWNTY3JpcHR8fHIuZXhlY1NjcmlwdChcInZhciBcIitlWzBdKTtmb3IodmFyIGk7ZS5sZW5ndGgmJihpPWUuc2hpZnQoKSk7KWUubGVuZ3RofHx2b2lkIDA9PT1uP3I9cltpXT9yW2ldOnJbaV09e306cltpXT1ufWZ1bmN0aW9uIG4odCxuKXtmdW5jdGlvbiBlKCl7fWUucHJvdG90eXBlPW4ucHJvdG90eXBlLHQuTT1uLnByb3RvdHlwZSx0LnByb3RvdHlwZT1uZXcgZSx0LnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj10LHQuTj1mdW5jdGlvbih0LGUscil7Zm9yKHZhciBpPUFycmF5KGFyZ3VtZW50cy5sZW5ndGgtMiksYT0yO2E8YXJndW1lbnRzLmxlbmd0aDthKyspaVthLTJdPWFyZ3VtZW50c1thXTtyZXR1cm4gbi5wcm90b3R5cGVbZV0uYXBwbHkodCxpKX19ZnVuY3Rpb24gZSh0LG4pe251bGwhPXQmJnRoaXMuYS5hcHBseSh0aGlzLGFyZ3VtZW50cyl9ZnVuY3Rpb24gcih0KXt0LmI9XCJcIn1mdW5jdGlvbiBpKHQsbil7dC5zb3J0KG58fGEpfWZ1bmN0aW9uIGEodCxuKXtyZXR1cm4gdD5uPzE6bj50Py0xOjB9ZnVuY3Rpb24gbCh0KXt2YXIgbixlPVtdLHI9MDtmb3IobiBpbiB0KWVbcisrXT10W25dO3JldHVybiBlfWZ1bmN0aW9uIHUodCxuKXt0aGlzLmI9dCx0aGlzLmE9e307Zm9yKHZhciBlPTA7ZTxuLmxlbmd0aDtlKyspe3ZhciByPW5bZV07dGhpcy5hW3IuYl09cn19ZnVuY3Rpb24gbyh0KXtyZXR1cm4gdD1sKHQuYSksaSh0LGZ1bmN0aW9uKHQsbil7cmV0dXJuIHQuYi1uLmJ9KSx0fWZ1bmN0aW9uIHModCxuKXtzd2l0Y2godGhpcy5iPXQsdGhpcy5nPSEhbi5HLHRoaXMuYT1uLmMsdGhpcy5qPW4udHlwZSx0aGlzLmg9ITEsdGhpcy5hKXtjYXNlIGs6Y2FzZSBKOmNhc2UgSzpjYXNlIEw6Y2FzZSBPOmNhc2UgWTpjYXNlIFQ6dGhpcy5oPSEwfXRoaXMuZj1uLmRlZmF1bHRWYWx1ZX1mdW5jdGlvbiBmKCl7dGhpcy5hPXt9LHRoaXMuZj10aGlzLmkoKS5hLHRoaXMuYj10aGlzLmc9bnVsbH1mdW5jdGlvbiBjKHQsbil7Zm9yKHZhciBlPW8odC5pKCkpLHI9MDtyPGUubGVuZ3RoO3IrKyl7dmFyIGk9ZVtyXSxhPWkuYjtpZihudWxsIT1uLmFbYV0pe3QuYiYmZGVsZXRlIHQuYltpLmJdO3ZhciBsPTExPT1pLmF8fDEwPT1pLmE7aWYoaS5nKWZvcih2YXIgaT1wKG4sYSl8fFtdLHU9MDt1PGkubGVuZ3RoO3UrKyl7dmFyIHM9dCxmPWEsaD1sP2lbdV0uY2xvbmUoKTppW3VdO3MuYVtmXXx8KHMuYVtmXT1bXSkscy5hW2ZdLnB1c2goaCkscy5iJiZkZWxldGUgcy5iW2ZdfWVsc2UgaT1wKG4sYSksbD8obD1wKHQsYSkpP2MobCxpKTpiKHQsYSxpLmNsb25lKCkpOmIodCxhLGkpfX19ZnVuY3Rpb24gcCh0LG4pe3ZhciBlPXQuYVtuXTtpZihudWxsPT1lKXJldHVybiBudWxsO2lmKHQuZyl7aWYoIShuIGluIHQuYikpe3ZhciByPXQuZyxpPXQuZltuXTtpZihudWxsIT1lKWlmKGkuZyl7Zm9yKHZhciBhPVtdLGw9MDtsPGUubGVuZ3RoO2wrKylhW2xdPXIuYihpLGVbbF0pO2U9YX1lbHNlIGU9ci5iKGksZSk7cmV0dXJuIHQuYltuXT1lfXJldHVybiB0LmJbbl19cmV0dXJuIGV9ZnVuY3Rpb24gaCh0LG4sZSl7dmFyIHI9cCh0LG4pO3JldHVybiB0LmZbbl0uZz9yW2V8fDBdOnJ9ZnVuY3Rpb24gZyh0LG4pe3ZhciBlO2lmKG51bGwhPXQuYVtuXSllPWgodCxuLHZvaWQgMCk7ZWxzZSB0OntpZihlPXQuZltuXSx2b2lkIDA9PT1lLmYpe3ZhciByPWUuajtpZihyPT09Qm9vbGVhbillLmY9ITE7ZWxzZSBpZihyPT09TnVtYmVyKWUuZj0wO2Vsc2V7aWYociE9PVN0cmluZyl7ZT1uZXcgcjticmVhayB0fWUuZj1lLmg/XCIwXCI6XCJcIn19ZT1lLmZ9cmV0dXJuIGV9ZnVuY3Rpb24gbSh0LG4pe3JldHVybiB0LmZbbl0uZz9udWxsIT10LmFbbl0/dC5hW25dLmxlbmd0aDowOm51bGwhPXQuYVtuXT8xOjB9ZnVuY3Rpb24gYih0LG4sZSl7dC5hW25dPWUsdC5iJiYodC5iW25dPWUpfWZ1bmN0aW9uIGQodCxuKXt2YXIgZSxyPVtdO2ZvcihlIGluIG4pMCE9ZSYmci5wdXNoKG5ldyBzKGUsbltlXSkpO3JldHVybiBuZXcgdSh0LHIpfS8qXG5cbiBQcm90b2NvbCBCdWZmZXIgMiBDb3B5cmlnaHQgMjAwOCBHb29nbGUgSW5jLlxuIEFsbCBvdGhlciBjb2RlIGNvcHlyaWdodCBpdHMgcmVzcGVjdGl2ZSBvd25lcnMuXG4gQ29weXJpZ2h0IChDKSAyMDEwIFRoZSBMaWJwaG9uZW51bWJlciBBdXRob3JzXG5cbiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG4gVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuZnVuY3Rpb24geSgpe2YuY2FsbCh0aGlzKX1mdW5jdGlvbiB2KCl7Zi5jYWxsKHRoaXMpfWZ1bmN0aW9uIF8oKXtmLmNhbGwodGhpcyl9ZnVuY3Rpb24gUygpe31mdW5jdGlvbiAkKCl7fWZ1bmN0aW9uIHcoKXt9LypcblxuIENvcHlyaWdodCAoQykgMjAxMCBUaGUgTGlicGhvbmVudW1iZXIgQXV0aG9ycy5cblxuIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4geW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cbiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5mdW5jdGlvbiB4KCl7dGhpcy5hPXt9fWZ1bmN0aW9uIEEodCxuKXtpZihudWxsPT1uKXJldHVybiBudWxsO249bi50b1VwcGVyQ2FzZSgpO3ZhciBlPXQuYVtuXTtpZihudWxsPT1lKXtpZihlPXR0W25dLG51bGw9PWUpcmV0dXJuIG51bGw7ZT0obmV3IHcpLmEoXy5pKCksZSksdC5hW25dPWV9cmV0dXJuIGV9ZnVuY3Rpb24gTih0KXtyZXR1cm4gdD1XW3RdLG51bGw9PXQ/XCJaWlwiOnRbMF19ZnVuY3Rpb24gaih0KXt0aGlzLkg9UmVnRXhwKFwi4oCIXCIpLHRoaXMuQj1cIlwiLHRoaXMubT1uZXcgZSx0aGlzLnY9XCJcIix0aGlzLmg9bmV3IGUsdGhpcy51PW5ldyBlLHRoaXMuaj0hMCx0aGlzLnc9dGhpcy5vPXRoaXMuRD0hMSx0aGlzLkY9eC5iKCksdGhpcy5zPTAsdGhpcy5iPW5ldyBlLHRoaXMuQT0hMSx0aGlzLmw9XCJcIix0aGlzLmE9bmV3IGUsdGhpcy5mPVtdLHRoaXMuQz10LHRoaXMuSj10aGlzLmc9Qyh0aGlzLHRoaXMuQyl9ZnVuY3Rpb24gQyh0LG4pe3ZhciBlO2lmKG51bGwhPW4mJmlzTmFOKG4pJiZuLnRvVXBwZXJDYXNlKClpbiB0dCl7aWYoZT1BKHQuRixuKSxudWxsPT1lKXRocm93XCJJbnZhbGlkIHJlZ2lvbiBjb2RlOiBcIituO2U9ZyhlLDEwKX1lbHNlIGU9MDtyZXR1cm4gZT1BKHQuRixOKGUpKSxudWxsIT1lP2U6YXR9ZnVuY3Rpb24gRSh0KXtmb3IodmFyIG49dC5mLmxlbmd0aCxlPTA7bj5lOysrZSl7dmFyIGk9dC5mW2VdLGE9ZyhpLDEpO2lmKHQudj09YSlyZXR1cm4hMTt2YXIgbDtsPXQ7dmFyIHU9aSxvPWcodSwxKTtpZigtMSE9by5pbmRleE9mKFwifFwiKSlsPSExO2Vsc2V7bz1vLnJlcGxhY2UobHQsXCJcXFxcZFwiKSxvPW8ucmVwbGFjZSh1dCxcIlxcXFxkXCIpLHIobC5tKTt2YXIgcztzPWw7dmFyIHU9Zyh1LDIpLGY9XCI5OTk5OTk5OTk5OTk5OTlcIi5tYXRjaChvKVswXTtmLmxlbmd0aDxzLmEuYi5sZW5ndGg/cz1cIlwiOihzPWYucmVwbGFjZShuZXcgUmVnRXhwKG8sXCJnXCIpLHUpLHM9cy5yZXBsYWNlKFJlZ0V4cChcIjlcIixcImdcIiksXCLigIhcIikpLDA8cy5sZW5ndGg/KGwubS5hKHMpLGw9ITApOmw9ITF9aWYobClyZXR1cm4gdC52PWEsdC5BPXN0LnRlc3QoaChpLDQpKSx0LnM9MCwhMH1yZXR1cm4gdC5qPSExfWZ1bmN0aW9uIFIodCxuKXtmb3IodmFyIGU9W10scj1uLmxlbmd0aC0zLGk9dC5mLmxlbmd0aCxhPTA7aT5hOysrYSl7dmFyIGw9dC5mW2FdOzA9PW0obCwzKT9lLnB1c2godC5mW2FdKToobD1oKGwsMyxNYXRoLm1pbihyLG0obCwzKS0xKSksMD09bi5zZWFyY2gobCkmJmUucHVzaCh0LmZbYV0pKX10LmY9ZX1mdW5jdGlvbiBGKHQsbil7dC5oLmEobik7dmFyIGU9bjtpZihydC50ZXN0KGUpfHwxPT10LmguYi5sZW5ndGgmJmV0LnRlc3QoZSkpe3ZhciBpLGU9bjtcIitcIj09ZT8oaT1lLHQudS5hKGUpKTooaT1udFtlXSx0LnUuYShpKSx0LmEuYShpKSksbj1pfWVsc2UgdC5qPSExLHQuRD0hMDtpZighdC5qKXtpZighdC5EKWlmKEgodCkpe2lmKFAodCkpcmV0dXJuIEIodCl9ZWxzZSBpZigwPHQubC5sZW5ndGgmJihlPXQuYS50b1N0cmluZygpLHIodC5hKSx0LmEuYSh0LmwpLHQuYS5hKGUpLGU9dC5iLnRvU3RyaW5nKCksaT1lLmxhc3RJbmRleE9mKHQubCkscih0LmIpLHQuYi5hKGUuc3Vic3RyaW5nKDAsaSkpKSx0LmwhPUcodCkpcmV0dXJuIHQuYi5hKFwiIFwiKSxCKHQpO3JldHVybiB0LmgudG9TdHJpbmcoKX1zd2l0Y2godC51LmIubGVuZ3RoKXtjYXNlIDA6Y2FzZSAxOmNhc2UgMjpyZXR1cm4gdC5oLnRvU3RyaW5nKCk7Y2FzZSAzOmlmKCFIKHQpKXJldHVybiB0Lmw9Ryh0KSxVKHQpO3Qudz0hMDtkZWZhdWx0OnJldHVybiB0Lnc/KFAodCkmJih0Lnc9ITEpLHQuYi50b1N0cmluZygpK3QuYS50b1N0cmluZygpKTowPHQuZi5sZW5ndGg/KGU9Vih0LG4pLGk9SSh0KSwwPGkubGVuZ3RoP2k6KFIodCx0LmEudG9TdHJpbmcoKSksRSh0KT9NKHQpOnQuaj9EKHQsZSk6dC5oLnRvU3RyaW5nKCkpKTpVKHQpfX1mdW5jdGlvbiBCKHQpe3JldHVybiB0Lmo9ITAsdC53PSExLHQuZj1bXSx0LnM9MCxyKHQubSksdC52PVwiXCIsVSh0KX1mdW5jdGlvbiBJKHQpe2Zvcih2YXIgbj10LmEudG9TdHJpbmcoKSxlPXQuZi5sZW5ndGgscj0wO2U+cjsrK3Ipe3ZhciBpPXQuZltyXSxhPWcoaSwxKTtpZihuZXcgUmVnRXhwKFwiXig/OlwiK2ErXCIpJFwiKS50ZXN0KG4pKXJldHVybiB0LkE9c3QudGVzdChoKGksNCkpLG49bi5yZXBsYWNlKG5ldyBSZWdFeHAoYSxcImdcIiksaChpLDIpKSxEKHQsbil9cmV0dXJuXCJcIn1mdW5jdGlvbiBEKHQsbil7dmFyIGU9dC5iLmIubGVuZ3RoO3JldHVybiB0LkEmJmU+MCYmXCIgXCIhPXQuYi50b1N0cmluZygpLmNoYXJBdChlLTEpP3QuYitcIiBcIituOnQuYitufWZ1bmN0aW9uIFUodCl7dmFyIG49dC5hLnRvU3RyaW5nKCk7aWYoMzw9bi5sZW5ndGgpe2Zvcih2YXIgZT10Lm8mJjA8bSh0LmcsMjApP3AodC5nLDIwKXx8W106cCh0LmcsMTkpfHxbXSxyPWUubGVuZ3RoLGk9MDtyPmk7KytpKXt2YXIgYSxsPWVbaV07KGE9bnVsbD09dC5nLmFbMTJdfHx0Lm98fGgobCw2KSl8fChhPWcobCw0KSxhPTA9PWEubGVuZ3RofHxpdC50ZXN0KGEpKSxhJiZvdC50ZXN0KGcobCwyKSkmJnQuZi5wdXNoKGwpfXJldHVybiBSKHQsbiksbj1JKHQpLDA8bi5sZW5ndGg/bjpFKHQpP00odCk6dC5oLnRvU3RyaW5nKCl9cmV0dXJuIEQodCxuKX1mdW5jdGlvbiBNKHQpe3ZhciBuPXQuYS50b1N0cmluZygpLGU9bi5sZW5ndGg7aWYoZT4wKXtmb3IodmFyIHI9XCJcIixpPTA7ZT5pO2krKylyPVYodCxuLmNoYXJBdChpKSk7cmV0dXJuIHQuaj9EKHQscik6dC5oLnRvU3RyaW5nKCl9cmV0dXJuIHQuYi50b1N0cmluZygpfWZ1bmN0aW9uIEcodCl7dmFyIG4sZT10LmEudG9TdHJpbmcoKSxpPTA7cmV0dXJuIDEhPWgodC5nLDEwKT9uPSExOihuPXQuYS50b1N0cmluZygpLG49XCIxXCI9PW4uY2hhckF0KDApJiZcIjBcIiE9bi5jaGFyQXQoMSkmJlwiMVwiIT1uLmNoYXJBdCgxKSksbj8oaT0xLHQuYi5hKFwiMVwiKS5hKFwiIFwiKSx0Lm89ITApOm51bGwhPXQuZy5hWzE1XSYmKG49bmV3IFJlZ0V4cChcIl4oPzpcIitoKHQuZywxNSkrXCIpXCIpLG49ZS5tYXRjaChuKSxudWxsIT1uJiZudWxsIT1uWzBdJiYwPG5bMF0ubGVuZ3RoJiYodC5vPSEwLGk9blswXS5sZW5ndGgsdC5iLmEoZS5zdWJzdHJpbmcoMCxpKSkpKSxyKHQuYSksdC5hLmEoZS5zdWJzdHJpbmcoaSkpLGUuc3Vic3RyaW5nKDAsaSl9ZnVuY3Rpb24gSCh0KXt2YXIgbj10LnUudG9TdHJpbmcoKSxlPW5ldyBSZWdFeHAoXCJeKD86XFxcXCt8XCIraCh0LmcsMTEpK1wiKVwiKSxlPW4ubWF0Y2goZSk7cmV0dXJuIG51bGwhPWUmJm51bGwhPWVbMF0mJjA8ZVswXS5sZW5ndGg/KHQubz0hMCxlPWVbMF0ubGVuZ3RoLHIodC5hKSx0LmEuYShuLnN1YnN0cmluZyhlKSkscih0LmIpLHQuYi5hKG4uc3Vic3RyaW5nKDAsZSkpLFwiK1wiIT1uLmNoYXJBdCgwKSYmdC5iLmEoXCIgXCIpLCEwKTohMX1mdW5jdGlvbiBQKHQpe2lmKDA9PXQuYS5iLmxlbmd0aClyZXR1cm4hMTt2YXIgbixpPW5ldyBlO3Q6e2lmKG49dC5hLnRvU3RyaW5nKCksMCE9bi5sZW5ndGgmJlwiMFwiIT1uLmNoYXJBdCgwKSlmb3IodmFyIGEsbD1uLmxlbmd0aCx1PTE7Mz49dSYmbD49dTsrK3UpaWYoYT1wYXJzZUludChuLnN1YnN0cmluZygwLHUpLDEwKSxhIGluIFcpe2kuYShuLnN1YnN0cmluZyh1KSksbj1hO2JyZWFrIHR9bj0wfXJldHVybiAwPT1uPyExOihyKHQuYSksdC5hLmEoaS50b1N0cmluZygpKSxpPU4obiksXCIwMDFcIj09aT90Lmc9QSh0LkYsXCJcIituKTppIT10LkMmJih0Lmc9Qyh0LGkpKSx0LmIuYShcIlwiK24pLmEoXCIgXCIpLHQubD1cIlwiLCEwKX1mdW5jdGlvbiBWKHQsbil7dmFyIGU9dC5tLnRvU3RyaW5nKCk7aWYoMDw9ZS5zdWJzdHJpbmcodC5zKS5zZWFyY2godC5IKSl7dmFyIGk9ZS5zZWFyY2godC5IKSxlPWUucmVwbGFjZSh0Lkgsbik7cmV0dXJuIHIodC5tKSx0Lm0uYShlKSx0LnM9aSxlLnN1YnN0cmluZygwLHQucysxKX1yZXR1cm4gMT09dC5mLmxlbmd0aCYmKHQuaj0hMSksdC52PVwiXCIsdC5oLnRvU3RyaW5nKCl9dmFyIHE9dGhpcztlLnByb3RvdHlwZS5iPVwiXCIsZS5wcm90b3R5cGUuc2V0PWZ1bmN0aW9uKHQpe3RoaXMuYj1cIlwiK3R9LGUucHJvdG90eXBlLmE9ZnVuY3Rpb24odCxuLGUpe2lmKHRoaXMuYis9U3RyaW5nKHQpLG51bGwhPW4pZm9yKHZhciByPTE7cjxhcmd1bWVudHMubGVuZ3RoO3IrKyl0aGlzLmIrPWFyZ3VtZW50c1tyXTtyZXR1cm4gdGhpc30sZS5wcm90b3R5cGUudG9TdHJpbmc9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5ifTt2YXIgVD0xLFk9MixrPTMsSj00LEs9NixMPTE2LE89MTg7Zi5wcm90b3R5cGUuc2V0PWZ1bmN0aW9uKHQsbil7Yih0aGlzLHQuYixuKX0sZi5wcm90b3R5cGUuY2xvbmU9ZnVuY3Rpb24oKXt2YXIgdD1uZXcgdGhpcy5jb25zdHJ1Y3RvcjtyZXR1cm4gdCE9dGhpcyYmKHQuYT17fSx0LmImJih0LmI9e30pLGModCx0aGlzKSksdH07dmFyIFo7bih5LGYpO3ZhciB6O24odixmKTt2YXIgWDtuKF8sZikseS5wcm90b3R5cGUuaT1mdW5jdGlvbigpe3JldHVybiBafHwoWj1kKHksezA6e25hbWU6XCJOdW1iZXJGb3JtYXRcIixJOlwiaTE4bi5waG9uZW51bWJlcnMuTnVtYmVyRm9ybWF0XCJ9LDE6e25hbWU6XCJwYXR0ZXJuXCIscmVxdWlyZWQ6ITAsYzo5LHR5cGU6U3RyaW5nfSwyOntuYW1lOlwiZm9ybWF0XCIscmVxdWlyZWQ6ITAsYzo5LHR5cGU6U3RyaW5nfSwzOntuYW1lOlwibGVhZGluZ19kaWdpdHNfcGF0dGVyblwiLEc6ITAsYzo5LHR5cGU6U3RyaW5nfSw0OntuYW1lOlwibmF0aW9uYWxfcHJlZml4X2Zvcm1hdHRpbmdfcnVsZVwiLGM6OSx0eXBlOlN0cmluZ30sNjp7bmFtZTpcIm5hdGlvbmFsX3ByZWZpeF9vcHRpb25hbF93aGVuX2Zvcm1hdHRpbmdcIixjOjgsdHlwZTpCb29sZWFufSw1OntuYW1lOlwiZG9tZXN0aWNfY2Fycmllcl9jb2RlX2Zvcm1hdHRpbmdfcnVsZVwiLGM6OSx0eXBlOlN0cmluZ319KSksWn0seS5jdG9yPXkseS5jdG9yLmk9eS5wcm90b3R5cGUuaSx2LnByb3RvdHlwZS5pPWZ1bmN0aW9uKCl7cmV0dXJuIHp8fCh6PWQodix7MDp7bmFtZTpcIlBob25lTnVtYmVyRGVzY1wiLEk6XCJpMThuLnBob25lbnVtYmVycy5QaG9uZU51bWJlckRlc2NcIn0sMjp7bmFtZTpcIm5hdGlvbmFsX251bWJlcl9wYXR0ZXJuXCIsYzo5LHR5cGU6U3RyaW5nfSwzOntuYW1lOlwicG9zc2libGVfbnVtYmVyX3BhdHRlcm5cIixjOjksdHlwZTpTdHJpbmd9LDY6e25hbWU6XCJleGFtcGxlX251bWJlclwiLGM6OSx0eXBlOlN0cmluZ30sNzp7bmFtZTpcIm5hdGlvbmFsX251bWJlcl9tYXRjaGVyX2RhdGFcIixjOjEyLHR5cGU6U3RyaW5nfSw4OntuYW1lOlwicG9zc2libGVfbnVtYmVyX21hdGNoZXJfZGF0YVwiLGM6MTIsdHlwZTpTdHJpbmd9fSkpLHp9LHYuY3Rvcj12LHYuY3Rvci5pPXYucHJvdG90eXBlLmksXy5wcm90b3R5cGUuaT1mdW5jdGlvbigpe3JldHVybiBYfHwoWD1kKF8sezA6e25hbWU6XCJQaG9uZU1ldGFkYXRhXCIsSTpcImkxOG4ucGhvbmVudW1iZXJzLlBob25lTWV0YWRhdGFcIn0sMTp7bmFtZTpcImdlbmVyYWxfZGVzY1wiLGM6MTEsdHlwZTp2fSwyOntuYW1lOlwiZml4ZWRfbGluZVwiLGM6MTEsdHlwZTp2fSwzOntuYW1lOlwibW9iaWxlXCIsYzoxMSx0eXBlOnZ9LDQ6e25hbWU6XCJ0b2xsX2ZyZWVcIixjOjExLHR5cGU6dn0sNTp7bmFtZTpcInByZW1pdW1fcmF0ZVwiLGM6MTEsdHlwZTp2fSw2OntuYW1lOlwic2hhcmVkX2Nvc3RcIixjOjExLHR5cGU6dn0sNzp7bmFtZTpcInBlcnNvbmFsX251bWJlclwiLGM6MTEsdHlwZTp2fSw4OntuYW1lOlwidm9pcFwiLGM6MTEsdHlwZTp2fSwyMTp7bmFtZTpcInBhZ2VyXCIsYzoxMSx0eXBlOnZ9LDI1OntuYW1lOlwidWFuXCIsYzoxMSx0eXBlOnZ9LDI3OntuYW1lOlwiZW1lcmdlbmN5XCIsYzoxMSx0eXBlOnZ9LDI4OntuYW1lOlwidm9pY2VtYWlsXCIsYzoxMSx0eXBlOnZ9LDI0OntuYW1lOlwibm9faW50ZXJuYXRpb25hbF9kaWFsbGluZ1wiLGM6MTEsdHlwZTp2fSw5OntuYW1lOlwiaWRcIixyZXF1aXJlZDohMCxjOjksdHlwZTpTdHJpbmd9LDEwOntuYW1lOlwiY291bnRyeV9jb2RlXCIsYzo1LHR5cGU6TnVtYmVyfSwxMTp7bmFtZTpcImludGVybmF0aW9uYWxfcHJlZml4XCIsYzo5LHR5cGU6U3RyaW5nfSwxNzp7bmFtZTpcInByZWZlcnJlZF9pbnRlcm5hdGlvbmFsX3ByZWZpeFwiLGM6OSx0eXBlOlN0cmluZ30sMTI6e25hbWU6XCJuYXRpb25hbF9wcmVmaXhcIixjOjksdHlwZTpTdHJpbmd9LDEzOntuYW1lOlwicHJlZmVycmVkX2V4dG5fcHJlZml4XCIsYzo5LHR5cGU6U3RyaW5nfSwxNTp7bmFtZTpcIm5hdGlvbmFsX3ByZWZpeF9mb3JfcGFyc2luZ1wiLGM6OSx0eXBlOlN0cmluZ30sMTY6e25hbWU6XCJuYXRpb25hbF9wcmVmaXhfdHJhbnNmb3JtX3J1bGVcIixjOjksdHlwZTpTdHJpbmd9LDE4OntuYW1lOlwic2FtZV9tb2JpbGVfYW5kX2ZpeGVkX2xpbmVfcGF0dGVyblwiLGM6OCxkZWZhdWx0VmFsdWU6ITEsdHlwZTpCb29sZWFufSwxOTp7bmFtZTpcIm51bWJlcl9mb3JtYXRcIixHOiEwLGM6MTEsdHlwZTp5fSwyMDp7bmFtZTpcImludGxfbnVtYmVyX2Zvcm1hdFwiLEc6ITAsYzoxMSx0eXBlOnl9LDIyOntuYW1lOlwibWFpbl9jb3VudHJ5X2Zvcl9jb2RlXCIsYzo4LGRlZmF1bHRWYWx1ZTohMSx0eXBlOkJvb2xlYW59LDIzOntuYW1lOlwibGVhZGluZ19kaWdpdHNcIixjOjksdHlwZTpTdHJpbmd9LDI2OntuYW1lOlwibGVhZGluZ196ZXJvX3Bvc3NpYmxlXCIsYzo4LGRlZmF1bHRWYWx1ZTohMSx0eXBlOkJvb2xlYW59fSkpLFh9LF8uY3Rvcj1fLF8uY3Rvci5pPV8ucHJvdG90eXBlLmksUy5wcm90b3R5cGUuYT1mdW5jdGlvbih0KXt0aHJvdyBuZXcgdC5iLEVycm9yKFwiVW5pbXBsZW1lbnRlZFwiKX0sUy5wcm90b3R5cGUuYj1mdW5jdGlvbih0LG4pe2lmKDExPT10LmF8fDEwPT10LmEpcmV0dXJuIG4gaW5zdGFuY2VvZiBmP246dGhpcy5hKHQuai5wcm90b3R5cGUuaSgpLG4pO2lmKDE0PT10LmEpe2lmKFwic3RyaW5nXCI9PXR5cGVvZiBuJiZRLnRlc3Qobikpe3ZhciBlPU51bWJlcihuKTtpZihlPjApcmV0dXJuIGV9cmV0dXJuIG59aWYoIXQuaClyZXR1cm4gbjtpZihlPXQuaixlPT09U3RyaW5nKXtpZihcIm51bWJlclwiPT10eXBlb2YgbilyZXR1cm4gU3RyaW5nKG4pfWVsc2UgaWYoZT09PU51bWJlciYmXCJzdHJpbmdcIj09dHlwZW9mIG4mJihcIkluZmluaXR5XCI9PT1ufHxcIi1JbmZpbml0eVwiPT09bnx8XCJOYU5cIj09PW58fFEudGVzdChuKSkpcmV0dXJuIE51bWJlcihuKTtyZXR1cm4gbn07dmFyIFE9L14tP1swLTldKyQvO24oJCxTKSwkLnByb3RvdHlwZS5hPWZ1bmN0aW9uKHQsbil7dmFyIGU9bmV3IHQuYjtyZXR1cm4gZS5nPXRoaXMsZS5hPW4sZS5iPXt9LGV9LG4odywkKSx3LnByb3RvdHlwZS5iPWZ1bmN0aW9uKHQsbil7cmV0dXJuIDg9PXQuYT8hIW46Uy5wcm90b3R5cGUuYi5hcHBseSh0aGlzLGFyZ3VtZW50cyl9LHcucHJvdG90eXBlLmE9ZnVuY3Rpb24odCxuKXtyZXR1cm4gdy5NLmEuY2FsbCh0aGlzLHQsbil9Oy8qXG5cbiBDb3B5cmlnaHQgKEMpIDIwMTAgVGhlIExpYnBob25lbnVtYmVyIEF1dGhvcnNcblxuIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4geW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cbiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiovXG52YXIgVz17NjE6W1wiQVVcIixcIkNDXCIsXCJDWFwiXX0sdHQ9e0FVOltudWxsLFtudWxsLG51bGwsXCJbMS01NzhdXFxcXGR7NSw5fVwiLFwiXFxcXGR7NiwxMH1cIl0sW251bGwsbnVsbCxcIlsyMzddXFxcXGR7OH18OCg/Ols2LThdXFxcXGR7M318OSg/OlswMi05XVxcXFxkezJ9fDEoPzpbMC01Ny05XVxcXFxkfDZbMDEzNS05XSkpKVxcXFxkezR9XCIsXCJcXFxcZHs4LDl9XCIsbnVsbCxudWxsLFwiMjEyMzQ1Njc4XCJdLFtudWxsLG51bGwsXCIxNCg/OjVcXFxcZHw3MSlcXFxcZHs1fXw0KD86WzAtM11cXFxcZHw0WzQ3LTldfDVbMC0yNS05XXw2WzYtOV18N1swMi05XXw4WzE0Ny05XXw5WzAxNy05XSlcXFxcZHs2fVwiLFwiXFxcXGR7OX1cIixudWxsLG51bGwsXCI0MTIzNDU2NzhcIl0sW251bGwsbnVsbCxcIjE4MCg/OjBcXFxcZHszfXwyKVxcXFxkezN9XCIsXCJcXFxcZHs3LDEwfVwiLG51bGwsbnVsbCxcIjE4MDAxMjM0NTZcIl0sW251bGwsbnVsbCxcIjE5KD86MFswMTI2XVxcXFxkfFs2NzldKVxcXFxkezV9XCIsXCJcXFxcZHs4LDEwfVwiLG51bGwsbnVsbCxcIjE5MDAxMjM0NTZcIl0sW251bGwsbnVsbCxcIjEzKD86MDBcXFxcZHszfXw0NVswLTRdfFxcXFxkKVxcXFxkezN9XCIsXCJcXFxcZHs2LDEwfVwiLG51bGwsbnVsbCxcIjEzMDAxMjM0NTZcIl0sW251bGwsbnVsbCxcIjUwMFxcXFxkezZ9XCIsXCJcXFxcZHs5fVwiLG51bGwsbnVsbCxcIjUwMDEyMzQ1NlwiXSxbbnVsbCxudWxsLFwiNTUwXFxcXGR7Nn1cIixcIlxcXFxkezl9XCIsbnVsbCxudWxsLFwiNTUwMTIzNDU2XCJdLFwiQVVcIiw2MSxcIig/OjE0KD86MVsxNF18MzR8NFsxN118WzU2XTZ8N1s0N118ODgpKT8wMDFbMTQtNjg5XVwiLFwiMFwiLG51bGwsbnVsbCxcIjBcIixudWxsLFwiMDAxMVwiLG51bGwsW1tudWxsLFwiKFsyMzc4XSkoXFxcXGR7NH0pKFxcXFxkezR9KVwiLFwiJDEgJDIgJDNcIixbXCJbMjM3OF1cIl0sXCIoMCQxKVwiXSxbbnVsbCxcIihcXFxcZHszfSkoXFxcXGR7M30pKFxcXFxkezN9KVwiLFwiJDEgJDIgJDNcIixbXCJbNDVdfDE0XCJdLFwiMCQxXCJdLFtudWxsLFwiKDE2KShcXFxcZHszfSkoXFxcXGR7Miw0fSlcIixcIiQxICQyICQzXCIsW1wiMTZcIl0sXCIwJDFcIl0sW251bGwsXCIoMVszODldXFxcXGR7Mn0pKFxcXFxkezN9KShcXFxcZHszfSlcIixcIiQxICQyICQzXCIsW1wiMSg/OlszOF0wfDkwKVwiLFwiMSg/OlszOF0wMHw5MClcIl0sXCIkMVwiXSxbbnVsbCxcIigxODApKDJcXFxcZHszfSlcIixcIiQxICQyXCIsW1wiMTgwXCIsXCIxODAyXCJdLFwiJDFcIl0sW251bGwsXCIoMTlcXFxcZCkoXFxcXGR7M30pXCIsXCIkMSAkMlwiLFtcIjE5WzEzXVwiXSxcIiQxXCJdLFtudWxsLFwiKDE5XFxcXGR7Mn0pKFxcXFxkezR9KVwiLFwiJDEgJDJcIixbXCIxOVs2NzldXCJdLFwiJDFcIl0sW251bGwsXCIoMTMpKFxcXFxkezJ9KShcXFxcZHsyfSlcIixcIiQxICQyICQzXCIsW1wiMTNbMS05XVwiXSxcIiQxXCJdXSxudWxsLFtudWxsLG51bGwsXCIxNlxcXFxkezMsN31cIixcIlxcXFxkezUsOX1cIixudWxsLG51bGwsXCIxNjEyMzQ1XCJdLDEsbnVsbCxbbnVsbCxudWxsLFwiMSg/OjMoPzowMFxcXFxkezN9fDQ1WzAtNF18XFxcXGQpXFxcXGR7M318ODAoPzowXFxcXGR7Nn18MlxcXFxkezN9KSlcIixcIlxcXFxkezYsMTB9XCIsbnVsbCxudWxsLFwiMTMwMDEyMzQ1NlwiXSxbbnVsbCxudWxsLFwiTkFcIixcIk5BXCJdLG51bGwsbnVsbCxbbnVsbCxudWxsLFwiTkFcIixcIk5BXCJdXX07eC5iPWZ1bmN0aW9uKCl7cmV0dXJuIHguYT94LmE6eC5hPW5ldyB4fTt2YXIgbnQ9ezA6XCIwXCIsMTpcIjFcIiwyOlwiMlwiLDM6XCIzXCIsNDpcIjRcIiw1OlwiNVwiLDY6XCI2XCIsNzpcIjdcIiw4OlwiOFwiLDk6XCI5XCIsXCLvvJBcIjpcIjBcIixcIu+8kVwiOlwiMVwiLFwi77ySXCI6XCIyXCIsXCLvvJNcIjpcIjNcIixcIu+8lFwiOlwiNFwiLFwi77yVXCI6XCI1XCIsXCLvvJZcIjpcIjZcIixcIu+8l1wiOlwiN1wiLFwi77yYXCI6XCI4XCIsXCLvvJlcIjpcIjlcIixcItmgXCI6XCIwXCIsXCLZoVwiOlwiMVwiLFwi2aJcIjpcIjJcIixcItmjXCI6XCIzXCIsXCLZpFwiOlwiNFwiLFwi2aVcIjpcIjVcIixcItmmXCI6XCI2XCIsXCLZp1wiOlwiN1wiLFwi2ahcIjpcIjhcIixcItmpXCI6XCI5XCIsXCLbsFwiOlwiMFwiLFwi27FcIjpcIjFcIixcItuyXCI6XCIyXCIsXCLbs1wiOlwiM1wiLFwi27RcIjpcIjRcIixcItu1XCI6XCI1XCIsXCLbtlwiOlwiNlwiLFwi27dcIjpcIjdcIixcItu4XCI6XCI4XCIsXCLbuVwiOlwiOVwifSxldD1SZWdFeHAoXCJbK++8i10rXCIpLHJ0PVJlZ0V4cChcIihbMC0577yQLe+8mdmgLdmp27At27ldKVwiKSxpdD0vXlxcKD9cXCQxXFwpPyQvLGF0PW5ldyBfO2IoYXQsMTEsXCJOQVwiKTt2YXIgbHQ9L1xcWyhbXlxcW1xcXV0pKlxcXS9nLHV0PS9cXGQoPz1bXix9XVteLH1dKS9nLG90PVJlZ0V4cChcIl5bLXjigJAt4oCV4oiS44O877yNLe+8jyDCoMKt4oCL4oGg44CAKCnvvIjvvInvvLvvvL0uXFxcXFtcXFxcXS9+4oGT4oi8772eXSooXFxcXCRcXFxcZFsteOKAkC3igJXiiJLjg7zvvI0t77yPIMKgwq3igIvigaDjgIAoKe+8iO+8ie+8u++8vS5cXFxcW1xcXFxdL37igZPiiLzvvZ5dKikrJFwiKSxzdD0vWy0gXS87ai5wcm90b3R5cGUuSz1mdW5jdGlvbigpe3RoaXMuQj1cIlwiLHIodGhpcy5oKSxyKHRoaXMudSkscih0aGlzLm0pLHRoaXMucz0wLHRoaXMudj1cIlwiLHIodGhpcy5iKSx0aGlzLmw9XCJcIixyKHRoaXMuYSksdGhpcy5qPSEwLHRoaXMudz10aGlzLm89dGhpcy5EPSExLHRoaXMuZj1bXSx0aGlzLkE9ITEsdGhpcy5nIT10aGlzLkomJih0aGlzLmc9Qyh0aGlzLHRoaXMuQykpfSxqLnByb3RvdHlwZS5MPWZ1bmN0aW9uKHQpe3JldHVybiB0aGlzLkI9Rih0aGlzLHQpfSx0KFwiQ2xlYXZlLkFzWW91VHlwZUZvcm1hdHRlclwiLGopLHQoXCJDbGVhdmUuQXNZb3VUeXBlRm9ybWF0dGVyLnByb3RvdHlwZS5pbnB1dERpZ2l0XCIsai5wcm90b3R5cGUuTCksdChcIkNsZWF2ZS5Bc1lvdVR5cGVGb3JtYXR0ZXIucHJvdG90eXBlLmNsZWFyXCIsai5wcm90b3R5cGUuSyl9KS5jYWxsKHdpbmRvdyk7IiwiLy92YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuLy92YXIgUmVhY3RET00gPSByZXF1aXJlKCdyZWFjdC1kb20nKTtcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuXG5pbXBvcnQgQ2xlYXZlIGZyb20gJy4uLy4uL2NsZWF2ZS5qcy9yZWFjdCc7XG5pbXBvcnQgQ2xlYXZlUGhvbmUgZnJvbSAnLi4vLi4vY2xlYXZlLmpzL2Rpc3QvYWRkb25zL2NsZWF2ZS1waG9uZS5hdSc7XG5cbmNsYXNzIE15Q29tcG9uZW50IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcywgY29udGV4dCkge1xuICAgICAgICBzdXBlcihwcm9wcywgY29udGV4dCk7XG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGNyZWRpdENhcmRUeXBlOiAgICAgJycsXG4gICAgICAgICAgICBjcmVkaXRDYXJkUmF3VmFsdWU6ICcnLFxuICAgICAgICAgICAgcGhvbmVSYXdWYWx1ZTogICAgICAnJyxcbiAgICAgICAgICAgIGRhdGVSYXdWYWx1ZTogICAgICAgJycsXG4gICAgICAgICAgICBudW1lcmFsUmF3VmFsdWU6ICAgICcnLFxuICAgICAgICAgICAgY3VzdG9tUmF3VmFsdWU6ICAgICAnJ1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIG9uQ3JlZGl0Q2FyZENoYW5nZShldmVudCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtjcmVkaXRDYXJkUmF3VmFsdWU6IGV2ZW50LnRhcmdldC5yYXdWYWx1ZX0pO1xuICAgIH1cblxuICAgIG9uUGhvbmVDaGFuZ2UoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7cGhvbmVSYXdWYWx1ZTogZXZlbnQudGFyZ2V0LnJhd1ZhbHVlfSk7XG4gICAgfVxuXG4gICAgb25EYXRlQ2hhbmdlKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2RhdGVSYXdWYWx1ZTogZXZlbnQudGFyZ2V0LnJhd1ZhbHVlfSk7XG4gICAgfVxuXG4gICAgb25OdW1lcmFsQ2hhbmdlKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe251bWVyYWxSYXdWYWx1ZTogZXZlbnQudGFyZ2V0LnJhd1ZhbHVlfSk7XG4gICAgfVxuXG4gICAgb25DdXN0b21DaGFuZ2UoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y3VzdG9tUmF3VmFsdWU6IGV2ZW50LnRhcmdldC5yYXdWYWx1ZX0pO1xuICAgIH1cblxuICAgIG9uQ3JlZGl0Q2FyZFR5cGVDaGFuZ2VkKHR5cGUpe1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtjcmVkaXRDYXJkVHlwZTogdHlwZX0pO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPENsZWF2ZSBwbGFjZWhvbGRlcj1cIkVudGVyIGNyZWRpdCBjYXJkIG51bWJlclwiIG9wdGlvbnM9e3tjcmVkaXRDYXJkOiB0cnVlLCBvbkNyZWRpdENhcmRUeXBlQ2hhbmdlZDp0aGlzLm9uQ3JlZGl0Q2FyZFR5cGVDaGFuZ2VkLmJpbmQodGhpcyl9fVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25DcmVkaXRDYXJkQ2hhbmdlLmJpbmQodGhpcyl9Lz5cblxuICAgICAgICAgICAgICAgIDxDbGVhdmUgcGxhY2Vob2xkZXI9XCJFbnRlciBwaG9uZSBudW1iZXJcIiBvcHRpb25zPXt7cGhvbmU6IHRydWUsIHBob25lUmVnaW9uQ29kZTogJ0FVJ319XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vblBob25lQ2hhbmdlLmJpbmQodGhpcyl9Lz5cblxuICAgICAgICAgICAgICAgIDxDbGVhdmUgcGxhY2Vob2xkZXI9XCJFbnRlciBkYXRlXCIgb3B0aW9ucz17e2RhdGU6IHRydWUsIGRhdGVQYXR0ZXJuOiBbJ1knLCAnbScsICdkJ119fVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25EYXRlQ2hhbmdlLmJpbmQodGhpcyl9Lz5cblxuICAgICAgICAgICAgICAgIDxDbGVhdmUgY2xhc3NOYW1lPVwiaW5wdXQtbnVtZXJhbFwiIHBsYWNlaG9sZGVyPVwiRW50ZXIgbnVtZXJhbFwiIG9wdGlvbnM9e3tudW1lcmFsOiB0cnVlLCBkZWxpbWl0ZXI6ICcnLCBudW1lcmFsRGVjaW1hbE1hcms6ICcsJywgbnVtZXJhbFRob3VzYW5kc0dyb3VwU3R5bGU6ICd0aG91c2FuZCd9fVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25OdW1lcmFsQ2hhbmdlLmJpbmQodGhpcyl9Lz5cblxuICAgICAgICAgICAgICAgIDxDbGVhdmUgcGxhY2Vob2xkZXI9XCJDdXN0b20gZGVsaW1pdGVyIC8gYmxvY2tzXCIgb3B0aW9ucz17e2Jsb2NrczogWzQsMywzXSwgbnVtZXJpY09ubHk6IHRydWV9fVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25DdXN0b21DaGFuZ2UuYmluZCh0aGlzKX0vPlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyYXctdmFsdWVzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxwPmNyZWRpdCBjYXJkOiB7dGhpcy5zdGF0ZS5jcmVkaXRDYXJkUmF3VmFsdWV9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8cD5jcmVkaXQgY2FyZCB0eXBlOiB7dGhpcy5zdGF0ZS5jcmVkaXRDYXJkVHlwZX08L3A+XG4gICAgICAgICAgICAgICAgICAgIDxwPnBob25lOiB7dGhpcy5zdGF0ZS5waG9uZVJhd1ZhbHVlfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPHA+ZGF0ZToge3RoaXMuc3RhdGUuZGF0ZVJhd1ZhbHVlfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPHA+bnVtZXJhbDoge3RoaXMuc3RhdGUubnVtZXJhbFJhd1ZhbHVlfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPHA+Y3VzdG9tOiB7dGhpcy5zdGF0ZS5jdXN0b21SYXdWYWx1ZX08L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblJlYWN0RE9NLnJlbmRlcig8TXlDb21wb25lbnQvPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRlbnQnKSk7XG4iLCJpbXBvcnQgQ2xlYXZlIGZyb20gJy4vc3JjL0NsZWF2ZS5yZWFjdCc7XG5cbmV4cG9ydCBkZWZhdWx0IENsZWF2ZTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIE51bWVyYWxGb3JtYXR0ZXIgPSByZXF1aXJlKCcuL3Nob3J0Y3V0cy9OdW1lcmFsRm9ybWF0dGVyJyk7XG52YXIgRGF0ZUZvcm1hdHRlciA9IHJlcXVpcmUoJy4vc2hvcnRjdXRzL0RhdGVGb3JtYXR0ZXInKTtcbnZhciBQaG9uZUZvcm1hdHRlciA9IHJlcXVpcmUoJy4vc2hvcnRjdXRzL1Bob25lRm9ybWF0dGVyJyk7XG52YXIgQ3JlZGl0Q2FyZERldGVjdG9yID0gcmVxdWlyZSgnLi9zaG9ydGN1dHMvQ3JlZGl0Q2FyZERldGVjdG9yJyk7XG52YXIgVXRpbCA9IHJlcXVpcmUoJy4vdXRpbHMvVXRpbCcpO1xudmFyIERlZmF1bHRQcm9wZXJ0aWVzID0gcmVxdWlyZSgnLi9jb21tb24vRGVmYXVsdFByb3BlcnRpZXMnKTtcblxudmFyIENsZWF2ZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICB9LFxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wczogZnVuY3Rpb24gKG5leHRQcm9wcykge1xuICAgICAgICB2YXIgb3duZXIgPSB0aGlzLFxuICAgICAgICAgICAgcGhvbmVSZWdpb25Db2RlID0gbmV4dFByb3BzLm9wdGlvbnMucGhvbmVSZWdpb25Db2RlLFxuICAgICAgICAgICAgbmV3VmFsdWUgPSBuZXh0UHJvcHMudmFsdWU7XG5cbiAgICAgICAgaWYgKG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICBvd25lci5vbklucHV0KG5ld1ZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHVwZGF0ZSBwaG9uZSByZWdpb24gY29kZVxuICAgICAgICBpZiAocGhvbmVSZWdpb25Db2RlICYmIHBob25lUmVnaW9uQ29kZSAhPT0gb3duZXIucHJvcGVydGllcy5waG9uZVJlZ2lvbkNvZGUpIHtcbiAgICAgICAgICAgIG93bmVyLnByb3BlcnRpZXMucGhvbmVSZWdpb25Db2RlID0gcGhvbmVSZWdpb25Db2RlO1xuICAgICAgICAgICAgb3duZXIuaW5pdFBob25lRm9ybWF0dGVyKCk7XG4gICAgICAgICAgICBvd25lci5vbklucHV0KG93bmVyLnByb3BlcnRpZXMucmVzdWx0KTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG93bmVyID0gdGhpcyxcbiAgICAgICAgICAgIHsgdmFsdWUsIG9wdGlvbnMsIG9uS2V5RG93biwgb25DaGFuZ2UsIC4uLm90aGVyIH0gPSBvd25lci5wcm9wcztcblxuICAgICAgICBvd25lci5yZWdpc3RlcmVkRXZlbnRzID0ge1xuICAgICAgICAgICAgb25DaGFuZ2U6ICBvbkNoYW5nZSB8fCBVdGlsLm5vb3AsXG4gICAgICAgICAgICBvbktleURvd246IG9uS2V5RG93biB8fCBVdGlsLm5vb3BcbiAgICAgICAgfTtcblxuICAgICAgICBvcHRpb25zLmluaXRWYWx1ZSA9IHZhbHVlO1xuXG4gICAgICAgIG93bmVyLnByb3BlcnRpZXMgPSBEZWZhdWx0UHJvcGVydGllcy5hc3NpZ24oe30sIG9wdGlvbnMpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBvdGhlcjogb3RoZXIsXG4gICAgICAgICAgICB2YWx1ZTogb3duZXIucHJvcGVydGllcy5yZXN1bHRcbiAgICAgICAgfTtcbiAgICB9LFxuXG4gICAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgb3duZXIgPSB0aGlzLFxuICAgICAgICAgICAgcHBzID0gb3duZXIucHJvcGVydGllcztcblxuICAgICAgICAvLyBzbyBubyBuZWVkIGZvciB0aGlzIGxpYiBhdCBhbGxcbiAgICAgICAgaWYgKCFwcHMubnVtZXJhbCAmJiAhcHBzLnBob25lICYmICFwcHMuY3JlZGl0Q2FyZCAmJiAhcHBzLmRhdGUgJiYgKHBwcy5ibG9ja3NMZW5ndGggPT09IDAgJiYgIXBwcy5wcmVmaXgpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBwcHMubWF4TGVuZ3RoID0gVXRpbC5nZXRNYXhMZW5ndGgocHBzLmJsb2Nrcyk7XG5cbiAgICAgICAgb3duZXIuaW5pdFBob25lRm9ybWF0dGVyKCk7XG4gICAgICAgIG93bmVyLmluaXREYXRlRm9ybWF0dGVyKCk7XG4gICAgICAgIG93bmVyLmluaXROdW1lcmFsRm9ybWF0dGVyKCk7XG5cbiAgICAgICAgb3duZXIub25JbnB1dChwcHMuaW5pdFZhbHVlKTtcbiAgICB9LFxuXG4gICAgaW5pdE51bWVyYWxGb3JtYXR0ZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG93bmVyID0gdGhpcyxcbiAgICAgICAgICAgIHBwcyA9IG93bmVyLnByb3BlcnRpZXM7XG5cbiAgICAgICAgaWYgKCFwcHMubnVtZXJhbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcHBzLm51bWVyYWxGb3JtYXR0ZXIgPSBuZXcgTnVtZXJhbEZvcm1hdHRlcihcbiAgICAgICAgICAgIHBwcy5udW1lcmFsRGVjaW1hbE1hcmssXG4gICAgICAgICAgICBwcHMubnVtZXJhbERlY2ltYWxTY2FsZSxcbiAgICAgICAgICAgIHBwcy5udW1lcmFsVGhvdXNhbmRzR3JvdXBTdHlsZSxcbiAgICAgICAgICAgIHBwcy5kZWxpbWl0ZXJcbiAgICAgICAgKTtcbiAgICB9LFxuXG4gICAgaW5pdERhdGVGb3JtYXR0ZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG93bmVyID0gdGhpcyxcbiAgICAgICAgICAgIHBwcyA9IG93bmVyLnByb3BlcnRpZXM7XG5cbiAgICAgICAgaWYgKCFwcHMuZGF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcHBzLmRhdGVGb3JtYXR0ZXIgPSBuZXcgRGF0ZUZvcm1hdHRlcihwcHMuZGF0ZVBhdHRlcm4pO1xuICAgICAgICBwcHMuYmxvY2tzID0gcHBzLmRhdGVGb3JtYXR0ZXIuZ2V0QmxvY2tzKCk7XG4gICAgICAgIHBwcy5ibG9ja3NMZW5ndGggPSBwcHMuYmxvY2tzLmxlbmd0aDtcbiAgICAgICAgcHBzLm1heExlbmd0aCA9IFV0aWwuZ2V0TWF4TGVuZ3RoKHBwcy5ibG9ja3MpO1xuICAgIH0sXG5cbiAgICBpbml0UGhvbmVGb3JtYXR0ZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG93bmVyID0gdGhpcyxcbiAgICAgICAgICAgIHBwcyA9IG93bmVyLnByb3BlcnRpZXM7XG5cbiAgICAgICAgaWYgKCFwcHMucGhvbmUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENsZWF2ZS5Bc1lvdVR5cGVGb3JtYXR0ZXIgc2hvdWxkIGJlIHByb3ZpZGVkIGJ5XG4gICAgICAgIC8vIGV4dGVybmFsIGdvb2dsZSBjbG9zdXJlIGxpYlxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcHBzLnBob25lRm9ybWF0dGVyID0gbmV3IFBob25lRm9ybWF0dGVyKFxuICAgICAgICAgICAgICAgIG5ldyB3aW5kb3cuQ2xlYXZlLkFzWW91VHlwZUZvcm1hdHRlcihwcHMucGhvbmVSZWdpb25Db2RlKSxcbiAgICAgICAgICAgICAgICBwcHMuZGVsaW1pdGVyXG4gICAgICAgICAgICApO1xuICAgICAgICB9IGNhdGNoIChleCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQbGVhc2UgaW5jbHVkZSBwaG9uZS10eXBlLWZvcm1hdHRlci57Y291bnRyeX0uanMgbGliJyk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgb25LZXlEb3duOiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgdmFyIG93bmVyID0gdGhpcyxcbiAgICAgICAgICAgIHBwcyA9IG93bmVyLnByb3BlcnRpZXMsXG4gICAgICAgICAgICBjaGFyQ29kZSA9IGV2ZW50LndoaWNoIHx8IGV2ZW50LmtleUNvZGU7XG5cbiAgICAgICAgLy8gaGl0IGJhY2tzcGFjZSB3aGVuIGxhc3QgY2hhcmFjdGVyIGlzIGRlbGltaXRlclxuICAgICAgICBpZiAoY2hhckNvZGUgPT09IDggJiYgcHBzLnJlc3VsdC5zbGljZSgtMSkgPT09IHBwcy5kZWxpbWl0ZXIpIHtcbiAgICAgICAgICAgIHBwcy5iYWNrc3BhY2UgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcHBzLmJhY2tzcGFjZSA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgb3duZXIucmVnaXN0ZXJlZEV2ZW50cy5vbktleURvd24oZXZlbnQpO1xuICAgIH0sXG5cbiAgICBvbkNoYW5nZTogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIHZhciBvd25lciA9IHRoaXMsIHBwcyA9IG93bmVyLnByb3BlcnRpZXM7XG5cbiAgICAgICAgb3duZXIub25JbnB1dChldmVudC50YXJnZXQudmFsdWUpO1xuXG5cbiAgICAgICAgaWYgKHBwcy5udW1lcmFsKSB7XG4gICAgICAgICAgICBldmVudC50YXJnZXQucmF3VmFsdWUgPSBwcHMubnVtZXJhbEZvcm1hdHRlci5nZXRSYXdWYWx1ZShwcHMucmVzdWx0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGV2ZW50LnRhcmdldC5yYXdWYWx1ZSA9IFV0aWwuc3RyaXAocHBzLnJlc3VsdCwgcHBzLmRlbGltaXRlclJFKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG93bmVyLnJlZ2lzdGVyZWRFdmVudHMub25DaGFuZ2UoZXZlbnQpO1xuICAgIH0sXG5cbiAgICBvbklucHV0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgdmFyIG93bmVyID0gdGhpcywgcHBzID0gb3duZXIucHJvcGVydGllcyxcbiAgICAgICAgICAgIHByZXYgPSBwcHMucmVzdWx0O1xuXG4gICAgICAgIC8vIGNhc2UgMTogZGVsZXRlIG9uZSBtb3JlIGNoYXJhY3RlciBcIjRcIlxuICAgICAgICAvLyAxMjM0KnwgLT4gaGl0IGJhY2tzcGFjZSAtPiAxMjN8XG4gICAgICAgIC8vIGNhc2UgMjogbGFzdCBjaGFyYWN0ZXIgaXMgbm90IGRlbGltaXRlciB3aGljaCBpczpcbiAgICAgICAgLy8gMTJ8MzQqIC0+IGhpdCBiYWNrc3BhY2UgLT4gMXwzNCpcblxuICAgICAgICBpZiAoIXBwcy5udW1lcmFsICYmIHBwcy5iYWNrc3BhY2UgJiYgdmFsdWUuc2xpY2UoLTEpICE9PSBwcHMuZGVsaW1pdGVyKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IFV0aWwuaGVhZFN0cih2YWx1ZSwgdmFsdWUubGVuZ3RoIC0gMSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBwaG9uZSBmb3JtYXR0ZXJcbiAgICAgICAgaWYgKHBwcy5waG9uZSkge1xuICAgICAgICAgICAgcHBzLnJlc3VsdCA9IHBwcy5waG9uZUZvcm1hdHRlci5mb3JtYXQodmFsdWUpO1xuICAgICAgICAgICAgb3duZXIudXBkYXRlVmFsdWVTdGF0ZSgpO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBudW1lcmFsIGZvcm1hdHRlclxuICAgICAgICBpZiAocHBzLm51bWVyYWwpIHtcbiAgICAgICAgICAgIHBwcy5yZXN1bHQgPSBwcHMucHJlZml4ICsgcHBzLm51bWVyYWxGb3JtYXR0ZXIuZm9ybWF0KHZhbHVlKTtcbiAgICAgICAgICAgIG93bmVyLnVwZGF0ZVZhbHVlU3RhdGUoKTtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZGF0ZVxuICAgICAgICBpZiAocHBzLmRhdGUpIHtcbiAgICAgICAgICAgIHZhbHVlID0gcHBzLmRhdGVGb3JtYXR0ZXIuZ2V0VmFsaWRhdGVkRGF0ZSh2YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBzdHJpcCBkZWxpbWl0ZXJzXG4gICAgICAgIHZhbHVlID0gVXRpbC5zdHJpcCh2YWx1ZSwgcHBzLmRlbGltaXRlclJFKTtcblxuICAgICAgICAvLyBzdHJpcCBwcmVmaXhcbiAgICAgICAgdmFsdWUgPSBVdGlsLmdldFByZWZpeFN0cmlwcGVkVmFsdWUodmFsdWUsIHBwcy5wcmVmaXhMZW5ndGgpO1xuXG4gICAgICAgIC8vIHN0cmlwIG5vbi1udW1lcmljIGNoYXJhY3RlcnNcbiAgICAgICAgdmFsdWUgPSBwcHMubnVtZXJpY09ubHkgPyBVdGlsLnN0cmlwKHZhbHVlLCAvW15cXGRdL2cpIDogdmFsdWU7XG5cbiAgICAgICAgLy8gY29udmVydCBjYXNlXG4gICAgICAgIHZhbHVlID0gcHBzLnVwcGVyY2FzZSA/IHZhbHVlLnRvVXBwZXJDYXNlKCkgOiB2YWx1ZTtcbiAgICAgICAgdmFsdWUgPSBwcHMubG93ZXJjYXNlID8gdmFsdWUudG9Mb3dlckNhc2UoKSA6IHZhbHVlO1xuXG4gICAgICAgIC8vIHByZWZpeFxuICAgICAgICBpZiAocHBzLnByZWZpeCkge1xuICAgICAgICAgICAgdmFsdWUgPSBwcHMucHJlZml4ICsgdmFsdWU7XG5cbiAgICAgICAgICAgIC8vIG5vIGJsb2NrcyBzcGVjaWZpZWQsIG5vIG5lZWQgdG8gZG8gZm9ybWF0dGluZ1xuICAgICAgICAgICAgaWYgKHBwcy5ibG9ja3NMZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICBwcHMucmVzdWx0ID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgb3duZXIudXBkYXRlVmFsdWVTdGF0ZSgpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gdXBkYXRlIGNyZWRpdCBjYXJkIHByb3BzXG4gICAgICAgIGlmIChwcHMuY3JlZGl0Q2FyZCkge1xuICAgICAgICAgICAgb3duZXIudXBkYXRlQ3JlZGl0Q2FyZFByb3BzQnlWYWx1ZSh2YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBzdHJpcCBvdmVyIGxlbmd0aCBjaGFyYWN0ZXJzXG4gICAgICAgIHZhbHVlID0gVXRpbC5oZWFkU3RyKHZhbHVlLCBwcHMubWF4TGVuZ3RoKTtcblxuICAgICAgICAvLyBhcHBseSBibG9ja3NcbiAgICAgICAgcHBzLnJlc3VsdCA9IFV0aWwuZ2V0Rm9ybWF0dGVkVmFsdWUodmFsdWUsIHBwcy5ibG9ja3MsIHBwcy5ibG9ja3NMZW5ndGgsIHBwcy5kZWxpbWl0ZXIpO1xuXG4gICAgICAgIC8vIG5vdGhpbmcgY2hhbmdlZFxuICAgICAgICAvLyBwcmV2ZW50IHVwZGF0ZSB2YWx1ZSB0byBhdm9pZCBjYXJldCBwb3NpdGlvbiBjaGFuZ2VcbiAgICAgICAgaWYgKHByZXYgPT09IHBwcy5yZXN1bHQgJiYgcHJldiAhPT0gcHBzLnByZWZpeCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgb3duZXIudXBkYXRlVmFsdWVTdGF0ZSgpO1xuICAgIH0sXG5cbiAgICB1cGRhdGVDcmVkaXRDYXJkUHJvcHNCeVZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgdmFyIG93bmVyID0gdGhpcywgcHBzID0gb3duZXIucHJvcGVydGllcyxcbiAgICAgICAgICAgIGNyZWRpdENhcmRJbmZvO1xuXG4gICAgICAgIC8vIEF0IGxlYXN0IG9uZSBvZiB0aGUgZmlyc3QgNCBjaGFyYWN0ZXJzIGhhcyBjaGFuZ2VkXG4gICAgICAgIGlmIChVdGlsLmhlYWRTdHIocHBzLnJlc3VsdCwgNCkgPT09IFV0aWwuaGVhZFN0cih2YWx1ZSwgNCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNyZWRpdENhcmRJbmZvID0gQ3JlZGl0Q2FyZERldGVjdG9yLmdldEluZm8odmFsdWUsIHBwcy5jcmVkaXRDYXJkU3RyaWN0TW9kZSk7XG5cbiAgICAgICAgcHBzLmJsb2NrcyA9IGNyZWRpdENhcmRJbmZvLmJsb2NrcztcbiAgICAgICAgcHBzLmJsb2Nrc0xlbmd0aCA9IHBwcy5ibG9ja3MubGVuZ3RoO1xuICAgICAgICBwcHMubWF4TGVuZ3RoID0gVXRpbC5nZXRNYXhMZW5ndGgocHBzLmJsb2Nrcyk7XG5cbiAgICAgICAgLy8gY3JlZGl0IGNhcmQgdHlwZSBjaGFuZ2VkXG4gICAgICAgIGlmIChwcHMuY3JlZGl0Q2FyZFR5cGUgIT09IGNyZWRpdENhcmRJbmZvLnR5cGUpIHtcbiAgICAgICAgICAgIHBwcy5jcmVkaXRDYXJkVHlwZSA9IGNyZWRpdENhcmRJbmZvLnR5cGU7XG5cbiAgICAgICAgICAgIHBwcy5vbkNyZWRpdENhcmRUeXBlQ2hhbmdlZC5jYWxsKG93bmVyLCBwcHMuY3JlZGl0Q2FyZFR5cGUpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHVwZGF0ZVZhbHVlU3RhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dmFsdWU6IHRoaXMucHJvcGVydGllcy5yZXN1bHR9KTtcbiAgICB9LFxuXG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBvd25lciA9IHRoaXM7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHsuLi5vd25lci5zdGF0ZS5vdGhlcn1cbiAgICAgICAgICAgICAgICAgICB2YWx1ZT17b3duZXIuc3RhdGUudmFsdWV9XG4gICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXtvd25lci5vbktleURvd259XG4gICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e293bmVyLm9uQ2hhbmdlfS8+XG4gICAgICAgICk7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gd2luZG93LkNsZWF2ZSA9IENsZWF2ZTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBQcm9wcyBBc3NpZ25tZW50XG4gKlxuICogU2VwYXJhdGUgdGhpcywgc28gcmVhY3QgbW9kdWxlIGNhbiBzaGFyZSB0aGUgdXNhZ2VcbiAqL1xudmFyIERlZmF1bHRQcm9wZXJ0aWVzID0ge1xuICAgIC8vIE1heWJlIGNoYW5nZSB0byBvYmplY3QtYXNzaWduXG4gICAgLy8gZm9yIG5vdyBqdXN0IGtlZXAgaXQgYXMgc2ltcGxlXG4gICAgYXNzaWduOiBmdW5jdGlvbiAodGFyZ2V0LCBvcHRzKSB7XG4gICAgICAgIHRhcmdldCA9IHRhcmdldCB8fCB7fTtcbiAgICAgICAgb3B0cyA9IG9wdHMgfHwge307XG5cbiAgICAgICAgLy8gY3JlZGl0IGNhcmRcbiAgICAgICAgdGFyZ2V0LmNyZWRpdENhcmQgPSAhIW9wdHMuY3JlZGl0Q2FyZDtcbiAgICAgICAgdGFyZ2V0LmNyZWRpdENhcmRTdHJpY3RNb2RlID0gISFvcHRzLmNyZWRpdENhcmRTdHJpY3RNb2RlO1xuICAgICAgICB0YXJnZXQuY3JlZGl0Q2FyZFR5cGUgPSAnJztcbiAgICAgICAgdGFyZ2V0Lm9uQ3JlZGl0Q2FyZFR5cGVDaGFuZ2VkID0gb3B0cy5vbkNyZWRpdENhcmRUeXBlQ2hhbmdlZCB8fCAoZnVuY3Rpb24gKCkge30pO1xuXG4gICAgICAgIC8vIHBob25lXG4gICAgICAgIHRhcmdldC5waG9uZSA9ICEhb3B0cy5waG9uZTtcbiAgICAgICAgdGFyZ2V0LnBob25lUmVnaW9uQ29kZSA9IG9wdHMucGhvbmVSZWdpb25Db2RlIHx8ICdBVSc7XG4gICAgICAgIHRhcmdldC5waG9uZUZvcm1hdHRlciA9IHt9O1xuXG4gICAgICAgIC8vIGRhdGVcbiAgICAgICAgdGFyZ2V0LmRhdGUgPSAhIW9wdHMuZGF0ZTtcbiAgICAgICAgdGFyZ2V0LmRhdGVQYXR0ZXJuID0gb3B0cy5kYXRlUGF0dGVybiB8fCBbJ2QnLCAnbScsICdZJ107XG4gICAgICAgIHRhcmdldC5kYXRlRm9ybWF0dGVyID0ge307XG5cbiAgICAgICAgLy8gbnVtZXJhbFxuICAgICAgICB0YXJnZXQubnVtZXJhbCA9ICEhb3B0cy5udW1lcmFsO1xuICAgICAgICB0YXJnZXQubnVtZXJhbERlY2ltYWxTY2FsZSA9IG9wdHMubnVtZXJhbERlY2ltYWxTY2FsZSB8fCAyO1xuICAgICAgICB0YXJnZXQubnVtZXJhbERlY2ltYWxNYXJrID0gb3B0cy5udW1lcmFsRGVjaW1hbE1hcmsgfHwgJy4nO1xuICAgICAgICB0YXJnZXQubnVtZXJhbFRob3VzYW5kc0dyb3VwU3R5bGUgPSBvcHRzLm51bWVyYWxUaG91c2FuZHNHcm91cFN0eWxlIHx8ICd0aG91c2FuZCc7XG5cbiAgICAgICAgLy8gb3RoZXJzXG4gICAgICAgIHRhcmdldC5udW1lcmljT25seSA9IHRhcmdldC5jcmVkaXRDYXJkIHx8IHRhcmdldC5kYXRlIHx8ICEhb3B0cy5udW1lcmljT25seTtcblxuICAgICAgICB0YXJnZXQudXBwZXJjYXNlID0gISFvcHRzLnVwcGVyY2FzZTtcbiAgICAgICAgdGFyZ2V0Lmxvd2VyY2FzZSA9ICEhb3B0cy5sb3dlcmNhc2U7XG5cbiAgICAgICAgdGFyZ2V0LnByZWZpeCA9ICh0YXJnZXQuY3JlZGl0Q2FyZCB8fCB0YXJnZXQucGhvbmUgfHwgdGFyZ2V0LmRhdGUpID8gJycgOiAob3B0cy5wcmVmaXggfHwgJycpO1xuICAgICAgICB0YXJnZXQucHJlZml4TGVuZ3RoID0gdGFyZ2V0LnByZWZpeC5sZW5ndGg7XG5cbiAgICAgICAgdGFyZ2V0LmluaXRWYWx1ZSA9IG9wdHMuaW5pdFZhbHVlIHx8ICcnO1xuXG4gICAgICAgIHRhcmdldC5kZWxpbWl0ZXIgPVxuICAgICAgICAgICAgKG9wdHMuZGVsaW1pdGVyIHx8IG9wdHMuZGVsaW1pdGVyID09PSAnJykgPyBvcHRzLmRlbGltaXRlciA6XG4gICAgICAgICAgICAgICAgKG9wdHMuZGF0ZSA/ICcvJyA6XG4gICAgICAgICAgICAgICAgICAgIChvcHRzLm51bWVyYWwgPyAnLCcgOlxuICAgICAgICAgICAgICAgICAgICAgICAgKG9wdHMucGhvbmUgPyAnICcgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcgJykpKTtcbiAgICAgICAgdGFyZ2V0LmRlbGltaXRlclJFID0gbmV3IFJlZ0V4cCgnXFxcXCcgKyAodGFyZ2V0LmRlbGltaXRlciB8fCAnICcpLCAnZycpO1xuXG4gICAgICAgIHRhcmdldC5ibG9ja3MgPSBvcHRzLmJsb2NrcyB8fCBbXTtcbiAgICAgICAgdGFyZ2V0LmJsb2Nrc0xlbmd0aCA9IHRhcmdldC5ibG9ja3MubGVuZ3RoO1xuXG4gICAgICAgIHRhcmdldC5tYXhMZW5ndGggPSAwO1xuXG4gICAgICAgIHRhcmdldC5iYWNrc3BhY2UgPSBmYWxzZTtcbiAgICAgICAgdGFyZ2V0LnJlc3VsdCA9ICcnO1xuXG4gICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfVxufTtcblxuaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBEZWZhdWx0UHJvcGVydGllcztcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIENyZWRpdENhcmREZXRlY3RvciA9IHtcbiAgICBibG9ja3M6IHtcbiAgICAgICAgdWF0cDogICAgICAgICAgWzQsIDUsIDZdLFxuICAgICAgICBhbWV4OiAgICAgICAgICBbNCwgNiwgNV0sXG4gICAgICAgIGRpbmVyczogICAgICAgIFs0LCA2LCA0XSxcbiAgICAgICAgZGlzY292ZXI6ICAgICAgWzQsIDQsIDQsIDRdLFxuICAgICAgICBtYXN0ZXJjYXJkOiAgICBbNCwgNCwgNCwgNF0sXG4gICAgICAgIGRhbmtvcnQ6ICAgICAgIFs0LCA0LCA0LCA0XSxcbiAgICAgICAgaW5zdGFwYXltZW50OiAgWzQsIDQsIDQsIDRdLFxuICAgICAgICBqY2I6ICAgICAgICAgICBbNCwgNCwgNCwgNF0sXG4gICAgICAgIHZpc2E6ICAgICAgICAgIFs0LCA0LCA0LCA0XSxcbiAgICAgICAgZ2VuZXJhbExvb3NlOiAgWzQsIDQsIDQsIDRdLFxuICAgICAgICBnZW5lcmFsU3RyaWN0OiBbNCwgNCwgNCwgN11cbiAgICB9LFxuXG4gICAgcmU6IHtcbiAgICAgICAgLy8gc3RhcnRzIHdpdGggMTsgMTUgZGlnaXRzLCBub3Qgc3RhcnRzIHdpdGggMTgwMCAoamNiIGNhcmQpXG4gICAgICAgIHVhdHA6IC9eKD8hMTgwMCkxXFxkezAsMTR9LyxcblxuICAgICAgICAvLyBzdGFydHMgd2l0aCAzNC8zNzsgMTUgZGlnaXRzXG4gICAgICAgIGFtZXg6IC9eM1s0N11cXGR7MCwxM30vLFxuXG4gICAgICAgIC8vIHN0YXJ0cyB3aXRoIDYwMTEvNjUvNjQ0LTY0OTsgMTYgZGlnaXRzXG4gICAgICAgIGRpc2NvdmVyOiAvXig/OjYwMTF8NjVcXGR7MCwyfXw2NFs0LTldXFxkPylcXGR7MCwxMn0vLFxuXG4gICAgICAgIC8vIHN0YXJ0cyB3aXRoIDMwMC0zMDUvMzA5IG9yIDM2LzM4LzM5OyAxNCBkaWdpdHNcbiAgICAgICAgZGluZXJzOiAvXjMoPzowKFswLTVdfDkpfFs2ODldXFxkPylcXGR7MCwxMX0vLFxuXG4gICAgICAgIC8vIHN0YXJ0cyB3aXRoIDUxLTU1LzIyLTI3OyAxNiBkaWdpdHNcbiAgICAgICAgbWFzdGVyY2FyZDogL14oNVsxLTVdfDJbMi03XSlcXGR7MCwxNH0vLFxuXG4gICAgICAgIC8vIHN0YXJ0cyB3aXRoIDUwMTkvNDE3NS80NTcxOyAxNiBkaWdpdHNcbiAgICAgICAgZGFua29ydDogL14oNTAxOXw0MTc1fDQ1NzEpXFxkezAsMTJ9LyxcblxuICAgICAgICAvLyBzdGFydHMgd2l0aCA2MzctNjM5OyAxNiBkaWdpdHNcbiAgICAgICAgaW5zdGFwYXltZW50OiAvXjYzWzctOV1cXGR7MCwxM30vLFxuXG4gICAgICAgIC8vIHN0YXJ0cyB3aXRoIDIxMzEvMTgwMC8zNTsgMTYgZGlnaXRzXG4gICAgICAgIGpjYjogL14oPzoyMTMxfDE4MDB8MzVcXGR7MCwyfSlcXGR7MCwxMn0vLFxuXG4gICAgICAgIC8vIHN0YXJ0cyB3aXRoIDQ7IDE2IGRpZ2l0c1xuICAgICAgICB2aXNhOiAvXjRcXGR7MCwxNX0vXG4gICAgfSxcblxuICAgIGdldEluZm86IGZ1bmN0aW9uICh2YWx1ZSwgc3RyaWN0TW9kZSkge1xuICAgICAgICB2YXIgYmxvY2tzID0gQ3JlZGl0Q2FyZERldGVjdG9yLmJsb2NrcyxcbiAgICAgICAgICAgIHJlID0gQ3JlZGl0Q2FyZERldGVjdG9yLnJlO1xuXG4gICAgICAgIC8vIEluIHRoZW9yeSwgdmlzYSBjcmVkaXQgY2FyZCBjYW4gaGF2ZSB1cCB0byAxOSBkaWdpdHMgbnVtYmVyLlxuICAgICAgICAvLyBTZXQgc3RyaWN0TW9kZSB0byB0cnVlIHdpbGwgcmVtb3ZlIHRoZSAxNiBtYXgtbGVuZ3RoIHJlc3RyYWluLFxuICAgICAgICAvLyBob3dldmVyLCBJIG5ldmVyIGZvdW5kIGFueSB3ZWJzaXRlIHZhbGlkYXRlIGNhcmQgbnVtYmVyIGxpa2VcbiAgICAgICAgLy8gdGhpcywgaGVuY2UgcHJvYmFibHkgeW91IGRvbid0IG5lZWQgdG8gZW5hYmxlIHRoaXMgb3B0aW9uLlxuICAgICAgICBzdHJpY3RNb2RlID0gISFzdHJpY3RNb2RlO1xuXG4gICAgICAgIGlmIChyZS5hbWV4LnRlc3QodmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHR5cGU6ICAgJ2FtZXgnLFxuICAgICAgICAgICAgICAgIGJsb2NrczogYmxvY2tzLmFtZXhcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSBpZiAocmUudWF0cC50ZXN0KHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0eXBlOiAgICd1YXRwJyxcbiAgICAgICAgICAgICAgICBibG9ja3M6IGJsb2Nrcy51YXRwXG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2UgaWYgKHJlLmRpbmVycy50ZXN0KHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0eXBlOiAgICdkaW5lcnMnLFxuICAgICAgICAgICAgICAgIGJsb2NrczogYmxvY2tzLmRpbmVyc1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIGlmIChyZS5kaXNjb3Zlci50ZXN0KHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0eXBlOiAgICdkaXNjb3ZlcicsXG4gICAgICAgICAgICAgICAgYmxvY2tzOiBibG9ja3MuZGlzY292ZXJcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSBpZiAocmUubWFzdGVyY2FyZC50ZXN0KHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0eXBlOiAgICdtYXN0ZXJjYXJkJyxcbiAgICAgICAgICAgICAgICBibG9ja3M6IGJsb2Nrcy5tYXN0ZXJjYXJkXG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2UgaWYgKHJlLmRhbmtvcnQudGVzdCh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdHlwZTogICAnZGFua29ydCcsXG4gICAgICAgICAgICAgICAgYmxvY2tzOiBibG9ja3MuZGFua29ydFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIGlmIChyZS5pbnN0YXBheW1lbnQudGVzdCh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdHlwZTogICAnaW5zdGFwYXltZW50JyxcbiAgICAgICAgICAgICAgICBibG9ja3M6IGJsb2Nrcy5pbnN0YXBheW1lbnRcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSBpZiAocmUuamNiLnRlc3QodmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHR5cGU6ICAgJ2pjYicsXG4gICAgICAgICAgICAgICAgYmxvY2tzOiBibG9ja3MuamNiXG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2UgaWYgKHJlLnZpc2EudGVzdCh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdHlwZTogICAndmlzYScsXG4gICAgICAgICAgICAgICAgYmxvY2tzOiBibG9ja3MudmlzYVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIGlmIChzdHJpY3RNb2RlKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHR5cGU6ICAgJ3Vua25vd24nLFxuICAgICAgICAgICAgICAgIGJsb2NrczogYmxvY2tzLmdlbmVyYWxTdHJpY3RcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHR5cGU6ICAgJ3Vua25vd24nLFxuICAgICAgICAgICAgICAgIGJsb2NrczogYmxvY2tzLmdlbmVyYWxMb29zZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbmlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gQ3JlZGl0Q2FyZERldGVjdG9yO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgRGF0ZUZvcm1hdHRlciA9IGZ1bmN0aW9uIChkYXRlUGF0dGVybikge1xuICAgIHZhciBvd25lciA9IHRoaXM7XG5cbiAgICBvd25lci5ibG9ja3MgPSBbXTtcbiAgICBvd25lci5kYXRlUGF0dGVybiA9IGRhdGVQYXR0ZXJuO1xuICAgIG93bmVyLmluaXRCbG9ja3MoKTtcbn07XG5cbkRhdGVGb3JtYXR0ZXIucHJvdG90eXBlID0ge1xuICAgIGluaXRCbG9ja3M6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG93bmVyID0gdGhpcztcbiAgICAgICAgb3duZXIuZGF0ZVBhdHRlcm4uZm9yRWFjaChmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gJ1knKSB7XG4gICAgICAgICAgICAgICAgb3duZXIuYmxvY2tzLnB1c2goNCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG93bmVyLmJsb2Nrcy5wdXNoKDIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgZ2V0QmxvY2tzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJsb2NrcztcbiAgICB9LFxuXG4gICAgZ2V0VmFsaWRhdGVkRGF0ZTogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHZhciBvd25lciA9IHRoaXMsIHJlc3VsdCA9ICcnO1xuXG4gICAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvW15cXGRdL2csICcnKTtcblxuICAgICAgICBvd25lci5ibG9ja3MuZm9yRWFjaChmdW5jdGlvbiAobGVuZ3RoLCBpbmRleCkge1xuICAgICAgICAgICAgaWYgKHZhbHVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICB2YXIgc3ViID0gdmFsdWUuc2xpY2UoMCwgbGVuZ3RoKSxcbiAgICAgICAgICAgICAgICAgICAgcmVzdCA9IHZhbHVlLnNsaWNlKGxlbmd0aCk7XG5cbiAgICAgICAgICAgICAgICBzd2l0Y2ggKG93bmVyLmRhdGVQYXR0ZXJuW2luZGV4XSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2QnOlxuICAgICAgICAgICAgICAgICAgICBpZiAocGFyc2VJbnQoc3ViLCAxMCkgPiAzMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3ViID0gJzMxJztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwYXJzZUludChzdWIsIDEwKSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9zdWIgPSAnMDEnO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ20nOlxuICAgICAgICAgICAgICAgICAgICBpZiAocGFyc2VJbnQoc3ViLCAxMCkgPiAxMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3ViID0gJzEyJztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwYXJzZUludChzdWIsIDEwKSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9zdWIgPSAnMDEnO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJlc3VsdCArPSBzdWI7XG5cbiAgICAgICAgICAgICAgICAvLyB1cGRhdGUgcmVtYWluaW5nIHN0cmluZ1xuICAgICAgICAgICAgICAgIHZhbHVlID0gcmVzdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG59O1xuXG5pZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IERhdGVGb3JtYXR0ZXI7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBOdW1lcmFsRm9ybWF0dGVyID0gZnVuY3Rpb24gKG51bWVyYWxEZWNpbWFsTWFyayxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bWVyYWxEZWNpbWFsU2NhbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudW1lcmFsVGhvdXNhbmRzR3JvdXBTdHlsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGltaXRlcikge1xuICAgIHZhciBvd25lciA9IHRoaXM7XG5cbiAgICBvd25lci5udW1lcmFsRGVjaW1hbE1hcmsgPSBudW1lcmFsRGVjaW1hbE1hcmsgfHwgJy4nO1xuICAgIG93bmVyLm51bWVyYWxEZWNpbWFsU2NhbGUgPSBudW1lcmFsRGVjaW1hbFNjYWxlIHx8IDI7XG4gICAgb3duZXIubnVtZXJhbFRob3VzYW5kc0dyb3VwU3R5bGUgPSBudW1lcmFsVGhvdXNhbmRzR3JvdXBTdHlsZSB8fCBOdW1lcmFsRm9ybWF0dGVyLmdyb3VwU3R5bGUudGhvdXNhbmQ7XG4gICAgb3duZXIuZGVsaW1pdGVyUkUgPSBuZXcgUmVnRXhwKCdcXFxcJyArIChkZWxpbWl0ZXIgfHwgJywnKSwgJ2cnKTtcbiAgICBvd25lci5kZWxpbWl0ZXIgPSAoZGVsaW1pdGVyID09PSAnJyB8fCBkZWxpbWl0ZXIpID8gZGVsaW1pdGVyIDogJywnO1xufTtcblxuTnVtZXJhbEZvcm1hdHRlci5ncm91cFN0eWxlID0ge1xuICAgIHRob3VzYW5kOiAndGhvdXNhbmQnLFxuICAgIGxha2g6ICAgICAnbGFraCcsXG4gICAgd2FuOiAgICAgICd3YW4nXG59O1xuXG5OdW1lcmFsRm9ybWF0dGVyLnByb3RvdHlwZSA9IHtcbiAgICBnZXRSYXdWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHZhciBvd25lciA9IHRoaXM7XG5cbiAgICAgICAgLy8gZGVsaW1pdGVyIGFuZCBkZWNpbWFsIG1hcmsgd29uJ3QgYmUgdGhlIHNhbWVcbiAgICAgICAgLy8gc28gaGVyZSBkZWxpbWl0ZXIgY2FuIGJlICcuJyBidXQgbm90IGZvciB0aGUgbnVtZXJhbERlY2ltYWxNYXJrXG4gICAgICAgIGlmIChvd25lci5kZWxpbWl0ZXIgPT09ICcuJykge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlLnJlcGxhY2UodGhpcy5kZWxpbWl0ZXJSRSwgJycpLnJlcGxhY2UodGhpcy5udW1lcmFsRGVjaW1hbE1hcmssICcuJyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBoZXJlIG51bWVyYWxEZWNpbWFsTWFyayBjYW4gYmUgJy4nIGJ1dCBub3QgZm9yIHRoZSBkZWxpbWl0ZXJcbiAgICAgICAgcmV0dXJuIHZhbHVlLnJlcGxhY2UodGhpcy5udW1lcmFsRGVjaW1hbE1hcmssICcuJykucmVwbGFjZSh0aGlzLmRlbGltaXRlclJFLCAnJyk7XG4gICAgfSxcblxuICAgIGZvcm1hdDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHZhciBvd25lciA9IHRoaXMsIHBhcnRzLCBwYXJ0SW50ZWdlciwgcGFydERlY2ltYWwgPSAnJztcblxuICAgICAgICAvLyBzdHJpcCBhbHBoYWJldCBsZXR0ZXJzXG4gICAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvW0EtWmEtel0vZywgJycpXG5cbiAgICAgICAgICAgIC8vIHJlcGxhY2UgdGhlIGZpcnN0IGRlY2ltYWwgbWFyayB3aXRoIHJlc2VydmVkIHBsYWNlaG9sZGVyXG4gICAgICAgICAgICAucmVwbGFjZShvd25lci5udW1lcmFsRGVjaW1hbE1hcmssICdNJylcblxuICAgICAgICAgICAgLy8gc3RyaXAgdGhlIG5vbiBudW1lcmljIGxldHRlcnMgZXhjZXB0IE1cbiAgICAgICAgICAgIC5yZXBsYWNlKC9bXlxcZE1dL2csICcnKVxuXG4gICAgICAgICAgICAvLyByZXBsYWNlIG1hcmtcbiAgICAgICAgICAgIC5yZXBsYWNlKCdNJywgb3duZXIubnVtZXJhbERlY2ltYWxNYXJrKVxuXG4gICAgICAgICAgICAvLyBzdHJpcCBsZWFkaW5nIDBcbiAgICAgICAgICAgIC5yZXBsYWNlKC9eKC0pPzArKD89XFxkKS8sICckMScpO1xuXG4gICAgICAgIHBhcnRJbnRlZ2VyID0gdmFsdWU7XG5cbiAgICAgICAgaWYgKHZhbHVlLmluZGV4T2Yob3duZXIubnVtZXJhbERlY2ltYWxNYXJrKSA+PSAwKSB7XG4gICAgICAgICAgICBwYXJ0cyA9IHZhbHVlLnNwbGl0KG93bmVyLm51bWVyYWxEZWNpbWFsTWFyayk7XG4gICAgICAgICAgICBwYXJ0SW50ZWdlciA9IHBhcnRzWzBdO1xuICAgICAgICAgICAgcGFydERlY2ltYWwgPSBvd25lci5udW1lcmFsRGVjaW1hbE1hcmsgKyBwYXJ0c1sxXS5zbGljZSgwLCBvd25lci5udW1lcmFsRGVjaW1hbFNjYWxlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXRjaCAob3duZXIubnVtZXJhbFRob3VzYW5kc0dyb3VwU3R5bGUpIHtcbiAgICAgICAgY2FzZSBOdW1lcmFsRm9ybWF0dGVyLmdyb3VwU3R5bGUubGFraDpcbiAgICAgICAgICAgIHBhcnRJbnRlZ2VyID0gcGFydEludGVnZXIucmVwbGFjZSgvKFxcZCkoPz0oXFxkXFxkKStcXGQkKS9nLCAnJDEnICsgb3duZXIuZGVsaW1pdGVyKTtcblxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBOdW1lcmFsRm9ybWF0dGVyLmdyb3VwU3R5bGUud2FuOlxuICAgICAgICAgICAgcGFydEludGVnZXIgPSBwYXJ0SW50ZWdlci5yZXBsYWNlKC8oXFxkKSg/PShcXGR7NH0pKyQpL2csICckMScgKyBvd25lci5kZWxpbWl0ZXIpO1xuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcGFydEludGVnZXIgPSBwYXJ0SW50ZWdlci5yZXBsYWNlKC8oXFxkKSg/PShcXGR7M30pKyQpL2csICckMScgKyBvd25lci5kZWxpbWl0ZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHBhcnRJbnRlZ2VyLnRvU3RyaW5nKCkgKyBwYXJ0RGVjaW1hbC50b1N0cmluZygpO1xuICAgIH1cbn07XG5cbmlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gTnVtZXJhbEZvcm1hdHRlcjtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIFBob25lRm9ybWF0dGVyID0gZnVuY3Rpb24gKGZvcm1hdHRlciwgZGVsaW1pdGVyKSB7XG4gICAgdmFyIG93bmVyID0gdGhpcztcblxuICAgIG93bmVyLmRlbGltaXRlclJFID0gbmV3IFJlZ0V4cCgnXFxcXCcgKyAoZGVsaW1pdGVyIHx8ICcgJyksICdnJyk7XG4gICAgb3duZXIuZGVsaW1pdGVyID0gKGRlbGltaXRlciA9PT0gJycgfHwgZGVsaW1pdGVyKSA/IGRlbGltaXRlciA6ICcgJztcblxuICAgIG93bmVyLmZvcm1hdHRlciA9IGZvcm1hdHRlcjtcbn07XG5cblBob25lRm9ybWF0dGVyLnByb3RvdHlwZSA9IHtcbiAgICBzZXRGb3JtYXR0ZXI6IGZ1bmN0aW9uIChmb3JtYXR0ZXIpIHtcbiAgICAgICAgdGhpcy5mb3JtYXR0ZXIgPSBmb3JtYXR0ZXI7XG4gICAgfSxcblxuICAgIGZvcm1hdDogZnVuY3Rpb24gKHBob25lTnVtYmVyKSB7XG4gICAgICAgIHZhciBvd25lciA9IHRoaXM7XG5cbiAgICAgICAgb3duZXIuZm9ybWF0dGVyLmNsZWFyKCk7XG5cbiAgICAgICAgLy8gb25seSBrZWVwIG51bWJlciBhbmQgK1xuICAgICAgICBwaG9uZU51bWJlciA9IHBob25lTnVtYmVyLnJlcGxhY2UoL1teXFxkK10vZywgJycpO1xuXG4gICAgICAgIC8vIHN0cmlwIGRlbGltaXRlclxuICAgICAgICBwaG9uZU51bWJlciA9IHBob25lTnVtYmVyLnJlcGxhY2Uob3duZXIuZGVsaW1pdGVyUkUsICcnKTtcblxuICAgICAgICB2YXIgcmVzdWx0ID0gJycsIGN1cnJlbnQsIHZhbGlkYXRlZCA9IGZhbHNlO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBpTWF4ID0gcGhvbmVOdW1iZXIubGVuZ3RoOyBpIDwgaU1heDsgaSsrKSB7XG4gICAgICAgICAgICBjdXJyZW50ID0gb3duZXIuZm9ybWF0dGVyLmlucHV0RGlnaXQocGhvbmVOdW1iZXIuY2hhckF0KGkpKTtcblxuICAgICAgICAgICAgLy8gaGFzICgpLSBvciBzcGFjZSBpbnNpZGVcbiAgICAgICAgICAgIGlmICgvW1xccygpLV0vZy50ZXN0KGN1cnJlbnQpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gY3VycmVudDtcblxuICAgICAgICAgICAgICAgIHZhbGlkYXRlZCA9IHRydWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICghdmFsaWRhdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGN1cnJlbnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGVsc2U6IG92ZXIgbGVuZ3RoIGlucHV0XG4gICAgICAgICAgICAgICAgLy8gaXQgdHVybnMgdG8gaW52YWxpZCBudW1iZXIgYWdhaW5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHN0cmlwICgpXG4gICAgICAgIC8vIGUuZy4gVVM6IDcxNjEyMzQ1NjcgcmV0dXJucyAoNzE2KSAxMjMtNDU2N1xuICAgICAgICByZXN1bHQgPSByZXN1bHQucmVwbGFjZSgvWygpXS9nLCAnJyk7XG4gICAgICAgIC8vIHJlcGxhY2UgbGlicmFyeSBkZWxpbWl0ZXIgd2l0aCB1c2VyIGN1c3RvbWl6ZWQgZGVsaW1pdGVyXG4gICAgICAgIHJlc3VsdCA9IHJlc3VsdC5yZXBsYWNlKC9bXFxzLV0vZywgb3duZXIuZGVsaW1pdGVyKTtcblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbn07XG5cbmlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gUGhvbmVGb3JtYXR0ZXI7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBVdGlsID0ge1xuICAgIG5vb3A6IGZ1bmN0aW9uICgpIHtcbiAgICB9LFxuXG4gICAgc3RyaXA6IGZ1bmN0aW9uICh2YWx1ZSwgcmUpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlLnJlcGxhY2UocmUsICcnKTtcbiAgICB9LFxuXG4gICAgaGVhZFN0cjogZnVuY3Rpb24gKHN0ciwgbGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBzdHIuc2xpY2UoMCwgbGVuZ3RoKTtcbiAgICB9LFxuXG4gICAgZ2V0TWF4TGVuZ3RoOiBmdW5jdGlvbiAoYmxvY2tzKSB7XG4gICAgICAgIHJldHVybiBibG9ja3MucmVkdWNlKGZ1bmN0aW9uIChwcmV2aW91cywgY3VycmVudCkge1xuICAgICAgICAgICAgcmV0dXJuIHByZXZpb3VzICsgY3VycmVudDtcbiAgICAgICAgfSwgMCk7XG4gICAgfSxcblxuICAgIC8vIHN0cmlwIHZhbHVlIGJ5IHByZWZpeCBsZW5ndGhcbiAgICAvLyBmb3IgcHJlZml4OiBQUkVcbiAgICAvLyAoUFJFMTIzLCAzKSAtPiAxMjNcbiAgICAvLyAoUFIxMjMsIDMpIC0+IDIzIHRoaXMgaGFwcGVucyB3aGVuIHVzZXIgaGl0cyBiYWNrc3BhY2UgaW4gZnJvbnQgb2YgXCJQUkVcIlxuICAgIGdldFByZWZpeFN0cmlwcGVkVmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSwgcHJlZml4TGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZS5zbGljZShwcmVmaXhMZW5ndGgpO1xuICAgIH0sXG5cbiAgICBnZXRGb3JtYXR0ZWRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlLCBibG9ja3MsIGJsb2Nrc0xlbmd0aCwgZGVsaW1pdGVyKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSAnJztcblxuICAgICAgICBibG9ja3MuZm9yRWFjaChmdW5jdGlvbiAobGVuZ3RoLCBpbmRleCkge1xuICAgICAgICAgICAgaWYgKHZhbHVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICB2YXIgc3ViID0gdmFsdWUuc2xpY2UoMCwgbGVuZ3RoKSxcbiAgICAgICAgICAgICAgICAgICAgcmVzdCA9IHZhbHVlLnNsaWNlKGxlbmd0aCk7XG5cbiAgICAgICAgICAgICAgICByZXN1bHQgKz0gc3ViO1xuXG4gICAgICAgICAgICAgICAgaWYgKHN1Yi5sZW5ndGggPT09IGxlbmd0aCAmJiBpbmRleCA8IGJsb2Nrc0xlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IGRlbGltaXRlcjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyB1cGRhdGUgcmVtYWluaW5nIHN0cmluZ1xuICAgICAgICAgICAgICAgIHZhbHVlID0gcmVzdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG59O1xuXG5pZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IFV0aWw7XG59XG4iXX0=
