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
            this.setState({ customRawValue: event.target.value });
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
                onChange: this.onNumeralChange.bind(this) }), _react2.default.createElement(_react4.default, { placeholder: 'Custom delimiter / blocks', options: { blocks: [4, 3, 3], numericOnly: true, delimiter: '-' },
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
        if (charCode === 8 && Util.isDelimiter(pps.result.slice(-1), pps.delimiter, pps.delimiters)) {
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
            event.target.rawValue = Util.stripDelimiters(pps.result, pps.delimiter, pps.delimiters);
        }

        event.target.value = pps.result;

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

        if (!pps.numeral && pps.backspace && !Util.isDelimiter(value.slice(-1), pps.delimiter, pps.delimiters)) {
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
        value = Util.stripDelimiters(value, pps.delimiter, pps.delimiters);

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
        pps.result = Util.getFormattedValue(value, pps.blocks, pps.blocksLength, pps.delimiter, pps.delimiters);

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
        target.numeralDecimalScale = opts.numeralDecimalScale >= 0 ? opts.numeralDecimalScale : 2;
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
        target.delimiters = opts.delimiters || [];

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
        maestro: [4, 4, 4, 4],
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

        // starts with 50/56-58/6304/67; 16 digits
        maestro: /^(?:5[0678]\d{0,2}|6304|67\d{0,2})\d{0,12}/,

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
        } else if (re.maestro.test(value)) {
            return {
                type: 'maestro',
                blocks: blocks.maestro
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
                    sub0 = sub.slice(0, 1),
                    rest = value.slice(length);

                switch (owner.datePattern[index]) {
                    case 'd':
                        if (sub === '00') {
                            sub = '01';
                        } else if (parseInt(sub0, 10) > 3) {
                            sub = '0' + sub0;
                        } else if (parseInt(sub, 10) > 31) {
                            sub = '31';
                        }

                        break;

                    case 'm':
                        if (sub === '00') {
                            sub = '01';
                        } else if (parseInt(sub0, 10) > 1) {
                            sub = '0' + sub0;
                        } else if (parseInt(sub, 10) > 12) {
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
    owner.numeralDecimalScale = numeralDecimalScale >= 0 ? numeralDecimalScale : 2;
    owner.numeralThousandsGroupStyle = numeralThousandsGroupStyle || NumeralFormatter.groupStyle.thousand;
    owner.delimiter = delimiter || delimiter === '' ? delimiter : ',';
    owner.delimiterRE = delimiter ? new RegExp('\\' + delimiter, 'g') : '';
};

NumeralFormatter.groupStyle = {
    thousand: 'thousand',
    lakh: 'lakh',
    wan: 'wan'
};

NumeralFormatter.prototype = {
    getRawValue: function getRawValue(value) {
        return value.replace(this.delimiterRE, '').replace(this.numeralDecimalMark, '.');
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

        // replace the first minus sign reserved placeholder
        .replace(/^\-/, 'N')

        // strip the non numeric letters except the minus sign and decimal placeholder
        .replace(/[^\dMN]/g, '')

        // replace the minus sign (if present)
        .replace('N', '-')

        // replace decimal mark
        .replace('M', owner.numeralDecimalMark)

        // strip any leading zeros
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

        return partInteger.toString() + (owner.numeralDecimalScale > 0 ? partDecimal.toString() : '');
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

    owner.delimiter = delimiter || delimiter === '' ? delimiter : ' ';
    owner.delimiterRE = delimiter ? new RegExp('\\' + delimiter, 'g') : '';

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

    isDelimiter: function isDelimiter(letter, delimiter, delimiters) {
        // single delimiter
        if (delimiters.length === 0) {
            return letter === delimiter;
        }

        // multiple delimiters
        return delimiters.some(function (current) {
            if (letter === current) {
                return true;
            }
        });
    },

    stripDelimiters: function stripDelimiters(value, delimiter, delimiters) {
        // single delimiter
        if (delimiters.length === 0) {
            var delimiterRE = delimiter ? new RegExp('\\' + delimiter, 'g') : '';

            return value.replace(delimiterRE, '');
        }

        // multiple delimiters
        delimiters.forEach(function (current) {
            value = value.replace(new RegExp('\\' + current, 'g'), '');
        });

        return value;
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

    getFormattedValue: function getFormattedValue(value, blocks, blocksLength, delimiter, delimiters) {
        var result = '',
            multipleDelimiters = delimiters.length > 0,
            currentDelimiter;

        blocks.forEach(function (length, index) {
            if (value.length > 0) {
                var sub = value.slice(0, length),
                    rest = value.slice(length);

                result += sub;

                currentDelimiter = multipleDelimiters ? delimiters[index] || currentDelimiter : delimiter;

                if (sub.length === length && index < blocksLength - 1) {
                    result += currentDelimiter;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkaXN0L2FkZG9ucy9jbGVhdmUtcGhvbmUuYXUuanMiLCJsb2NhbC9hcHAtZXM2LmpzIiwicmVhY3QuanMiLCJzcmMvQ2xlYXZlLnJlYWN0LmpzIiwic3JjL2NvbW1vbi9EZWZhdWx0UHJvcGVydGllcy5qcyIsInNyYy9zaG9ydGN1dHMvQ3JlZGl0Q2FyZERldGVjdG9yLmpzIiwic3JjL3Nob3J0Y3V0cy9EYXRlRm9ybWF0dGVyLmpzIiwic3JjL3Nob3J0Y3V0cy9OdW1lcmFsRm9ybWF0dGVyLmpzIiwic3JjL3Nob3J0Y3V0cy9QaG9uZUZvcm1hdHRlci5qcyIsInNyYy91dGlscy9VdGlsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxDQUFDLFlBQVUsQUFBQztXQUFBLEFBQVMsRUFBVCxBQUFXLEdBQVgsQUFBYSxHQUFFLEFBQUM7UUFBSSxJQUFFLEVBQUEsQUFBRSxNQUFSLEFBQU0sQUFBUTtRQUFLLElBQW5CLEFBQXFCLEVBQUUsRUFBQSxBQUFFLE1BQUYsQUFBTyxLQUFHLENBQUMsRUFBWCxBQUFhLGNBQVksRUFBQSxBQUFFLFdBQVcsU0FBTyxFQUE3QyxBQUF5QixBQUFvQixBQUFFLElBQUksS0FBSSxJQUFKLEFBQVEsR0FBRSxFQUFBLEFBQUUsV0FBUyxJQUFFLEVBQXZCLEFBQVUsQUFBYSxBQUFFLFdBQVU7UUFBQSxBQUFFLFVBQVEsS0FBQSxBQUFLLE1BQWYsQUFBbUIsSUFBRSxJQUFFLEVBQUEsQUFBRSxLQUFHLEVBQUwsQUFBSyxBQUFFLEtBQUcsRUFBQSxBQUFFLEtBQW5DLEFBQXNDLEtBQUcsRUFBQSxBQUFFLEtBQTlFLEFBQW1DLEFBQThDO0FBQUU7WUFBQSxBQUFTLEVBQVQsQUFBVyxHQUFYLEFBQWEsR0FBRSxBQUFDO2FBQUEsQUFBUyxJQUFHLEFBQUUsSUFBQSxBQUFFLFlBQVUsRUFBWixBQUFj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UUFBVixBQUFrQixPQUFPLEFBQ3BDO2dCQUFJLE1BQUEsQUFBTSxTQUFWLEFBQW1CLEdBQUcsQUFDbEI7b0JBQUksTUFBTSxNQUFBLEFBQU0sTUFBTixBQUFZLEdBQXRCLEFBQVUsQUFBZTtvQkFDckIsT0FBTyxNQUFBLEFBQU0sTUFEakIsQUFDVyxBQUFZLEFBRXZCOzswQkFBQSxBQUFVLEFBRVY7O21DQUFtQixxQkFBc0IsV0FBQSxBQUFXLFVBQWpDLEFBQTJDLG1CQUE5RCxBQUFrRixBQUVsRjs7b0JBQUksSUFBQSxBQUFJLFdBQUosQUFBZSxVQUFVLFFBQVEsZUFBckMsQUFBb0QsR0FBRyxBQUNuRDs4QkFBQSxBQUFVLEFBQ2I7QUFHRDs7O3dCQUFBLEFBQVEsQUFDWDtBQUNKO0FBaEJELEFBa0JBOztlQUFBLEFBQU8sQUFDVjtBQWhGTCxBQUFXO0FBQUEsQUFDUDs7QUFrRkosSUFBSSxRQUFBLEFBQU8sK0NBQVAsQUFBTyxhQUFQLEFBQWtCLFlBQVksUUFBTyxPQUFQLEFBQWMsYUFBaEQsQUFBNEQsVUFBVSxBQUNsRTtXQUFBLEFBQU8sVUFBVSxVQUFqQixBQUEyQixBQUM5QiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIoZnVuY3Rpb24oKXtmdW5jdGlvbiB0KHQsbil7dmFyIGU9dC5zcGxpdChcIi5cIikscj1xO2VbMF1pbiByfHwhci5leGVjU2NyaXB0fHxyLmV4ZWNTY3JpcHQoXCJ2YXIgXCIrZVswXSk7Zm9yKHZhciBpO2UubGVuZ3RoJiYoaT1lLnNoaWZ0KCkpOyllLmxlbmd0aHx8dm9pZCAwPT09bj9yPXJbaV0/cltpXTpyW2ldPXt9OnJbaV09bn1mdW5jdGlvbiBuKHQsbil7ZnVuY3Rpb24gZSgpe31lLnByb3RvdHlwZT1uLnByb3RvdHlwZSx0Lk09bi5wcm90b3R5cGUsdC5wcm90b3R5cGU9bmV3IGUsdC5wcm90b3R5cGUuY29uc3RydWN0b3I9dCx0Lk49ZnVuY3Rpb24odCxlLHIpe2Zvcih2YXIgaT1BcnJheShhcmd1bWVudHMubGVuZ3RoLTIpLGE9MjthPGFyZ3VtZW50cy5sZW5ndGg7YSsrKWlbYS0yXT1hcmd1bWVudHNbYV07cmV0dXJuIG4ucHJvdG90eXBlW2VdLmFwcGx5KHQsaSl9fWZ1bmN0aW9uIGUodCxuKXtudWxsIT10JiZ0aGlzLmEuYXBwbHkodGhpcyxhcmd1bWVudHMpfWZ1bmN0aW9uIHIodCl7dC5iPVwiXCJ9ZnVuY3Rpb24gaSh0LG4pe3Quc29ydChufHxhKX1mdW5jdGlvbiBhKHQsbil7cmV0dXJuIHQ+bj8xOm4+dD8tMTowfWZ1bmN0aW9uIGwodCl7dmFyIG4sZT1bXSxyPTA7Zm9yKG4gaW4gdCllW3IrK109dFtuXTtyZXR1cm4gZX1mdW5jdGlvbiB1KHQsbil7dGhpcy5iPXQsdGhpcy5hPXt9O2Zvcih2YXIgZT0wO2U8bi5sZW5ndGg7ZSsrKXt2YXIgcj1uW2VdO3RoaXMuYVtyLmJdPXJ9fWZ1bmN0aW9uIG8odCl7cmV0dXJuIHQ9bCh0LmEpLGkodCxmdW5jdGlvbih0LG4pe3JldHVybiB0LmItbi5ifSksdH1mdW5jdGlvbiBzKHQsbil7c3dpdGNoKHRoaXMuYj10LHRoaXMuZz0hIW4uRyx0aGlzLmE9bi5jLHRoaXMuaj1uLnR5cGUsdGhpcy5oPSExLHRoaXMuYSl7Y2FzZSBrOmNhc2UgSjpjYXNlIEs6Y2FzZSBMOmNhc2UgTzpjYXNlIFk6Y2FzZSBUOnRoaXMuaD0hMH10aGlzLmY9bi5kZWZhdWx0VmFsdWV9ZnVuY3Rpb24gZigpe3RoaXMuYT17fSx0aGlzLmY9dGhpcy5pKCkuYSx0aGlzLmI9dGhpcy5nPW51bGx9ZnVuY3Rpb24gYyh0LG4pe2Zvcih2YXIgZT1vKHQuaSgpKSxyPTA7cjxlLmxlbmd0aDtyKyspe3ZhciBpPWVbcl0sYT1pLmI7aWYobnVsbCE9bi5hW2FdKXt0LmImJmRlbGV0ZSB0LmJbaS5iXTt2YXIgbD0xMT09aS5hfHwxMD09aS5hO2lmKGkuZylmb3IodmFyIGk9cChuLGEpfHxbXSx1PTA7dTxpLmxlbmd0aDt1Kyspe3ZhciBzPXQsZj1hLGg9bD9pW3VdLmNsb25lKCk6aVt1XTtzLmFbZl18fChzLmFbZl09W10pLHMuYVtmXS5wdXNoKGgpLHMuYiYmZGVsZXRlIHMuYltmXX1lbHNlIGk9cChuLGEpLGw/KGw9cCh0LGEpKT9jKGwsaSk6Yih0LGEsaS5jbG9uZSgpKTpiKHQsYSxpKX19fWZ1bmN0aW9uIHAodCxuKXt2YXIgZT10LmFbbl07aWYobnVsbD09ZSlyZXR1cm4gbnVsbDtpZih0Lmcpe2lmKCEobiBpbiB0LmIpKXt2YXIgcj10LmcsaT10LmZbbl07aWYobnVsbCE9ZSlpZihpLmcpe2Zvcih2YXIgYT1bXSxsPTA7bDxlLmxlbmd0aDtsKyspYVtsXT1yLmIoaSxlW2xdKTtlPWF9ZWxzZSBlPXIuYihpLGUpO3JldHVybiB0LmJbbl09ZX1yZXR1cm4gdC5iW25dfXJldHVybiBlfWZ1bmN0aW9uIGgodCxuLGUpe3ZhciByPXAodCxuKTtyZXR1cm4gdC5mW25dLmc/cltlfHwwXTpyfWZ1bmN0aW9uIGcodCxuKXt2YXIgZTtpZihudWxsIT10LmFbbl0pZT1oKHQsbix2b2lkIDApO2Vsc2UgdDp7aWYoZT10LmZbbl0sdm9pZCAwPT09ZS5mKXt2YXIgcj1lLmo7aWYocj09PUJvb2xlYW4pZS5mPSExO2Vsc2UgaWYocj09PU51bWJlcillLmY9MDtlbHNle2lmKHIhPT1TdHJpbmcpe2U9bmV3IHI7YnJlYWsgdH1lLmY9ZS5oP1wiMFwiOlwiXCJ9fWU9ZS5mfXJldHVybiBlfWZ1bmN0aW9uIG0odCxuKXtyZXR1cm4gdC5mW25dLmc/bnVsbCE9dC5hW25dP3QuYVtuXS5sZW5ndGg6MDpudWxsIT10LmFbbl0/MTowfWZ1bmN0aW9uIGIodCxuLGUpe3QuYVtuXT1lLHQuYiYmKHQuYltuXT1lKX1mdW5jdGlvbiBkKHQsbil7dmFyIGUscj1bXTtmb3IoZSBpbiBuKTAhPWUmJnIucHVzaChuZXcgcyhlLG5bZV0pKTtyZXR1cm4gbmV3IHUodCxyKX0vKlxuXG4gUHJvdG9jb2wgQnVmZmVyIDIgQ29weXJpZ2h0IDIwMDggR29vZ2xlIEluYy5cbiBBbGwgb3RoZXIgY29kZSBjb3B5cmlnaHQgaXRzIHJlc3BlY3RpdmUgb3duZXJzLlxuIENvcHlyaWdodCAoQykgMjAxMCBUaGUgTGlicGhvbmVudW1iZXIgQXV0aG9yc1xuXG4gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cbmZ1bmN0aW9uIHkoKXtmLmNhbGwodGhpcyl9ZnVuY3Rpb24gdigpe2YuY2FsbCh0aGlzKX1mdW5jdGlvbiBfKCl7Zi5jYWxsKHRoaXMpfWZ1bmN0aW9uIFMoKXt9ZnVuY3Rpb24gJCgpe31mdW5jdGlvbiB3KCl7fS8qXG5cbiBDb3B5cmlnaHQgKEMpIDIwMTAgVGhlIExpYnBob25lbnVtYmVyIEF1dGhvcnMuXG5cbiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG4gVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuZnVuY3Rpb24geCgpe3RoaXMuYT17fX1mdW5jdGlvbiBBKHQsbil7aWYobnVsbD09bilyZXR1cm4gbnVsbDtuPW4udG9VcHBlckNhc2UoKTt2YXIgZT10LmFbbl07aWYobnVsbD09ZSl7aWYoZT10dFtuXSxudWxsPT1lKXJldHVybiBudWxsO2U9KG5ldyB3KS5hKF8uaSgpLGUpLHQuYVtuXT1lfXJldHVybiBlfWZ1bmN0aW9uIE4odCl7cmV0dXJuIHQ9V1t0XSxudWxsPT10P1wiWlpcIjp0WzBdfWZ1bmN0aW9uIGoodCl7dGhpcy5IPVJlZ0V4cChcIuKAiFwiKSx0aGlzLkI9XCJcIix0aGlzLm09bmV3IGUsdGhpcy52PVwiXCIsdGhpcy5oPW5ldyBlLHRoaXMudT1uZXcgZSx0aGlzLmo9ITAsdGhpcy53PXRoaXMubz10aGlzLkQ9ITEsdGhpcy5GPXguYigpLHRoaXMucz0wLHRoaXMuYj1uZXcgZSx0aGlzLkE9ITEsdGhpcy5sPVwiXCIsdGhpcy5hPW5ldyBlLHRoaXMuZj1bXSx0aGlzLkM9dCx0aGlzLko9dGhpcy5nPUModGhpcyx0aGlzLkMpfWZ1bmN0aW9uIEModCxuKXt2YXIgZTtpZihudWxsIT1uJiZpc05hTihuKSYmbi50b1VwcGVyQ2FzZSgpaW4gdHQpe2lmKGU9QSh0LkYsbiksbnVsbD09ZSl0aHJvd1wiSW52YWxpZCByZWdpb24gY29kZTogXCIrbjtlPWcoZSwxMCl9ZWxzZSBlPTA7cmV0dXJuIGU9QSh0LkYsTihlKSksbnVsbCE9ZT9lOmF0fWZ1bmN0aW9uIEUodCl7Zm9yKHZhciBuPXQuZi5sZW5ndGgsZT0wO24+ZTsrK2Upe3ZhciBpPXQuZltlXSxhPWcoaSwxKTtpZih0LnY9PWEpcmV0dXJuITE7dmFyIGw7bD10O3ZhciB1PWksbz1nKHUsMSk7aWYoLTEhPW8uaW5kZXhPZihcInxcIikpbD0hMTtlbHNle289by5yZXBsYWNlKGx0LFwiXFxcXGRcIiksbz1vLnJlcGxhY2UodXQsXCJcXFxcZFwiKSxyKGwubSk7dmFyIHM7cz1sO3ZhciB1PWcodSwyKSxmPVwiOTk5OTk5OTk5OTk5OTk5XCIubWF0Y2gobylbMF07Zi5sZW5ndGg8cy5hLmIubGVuZ3RoP3M9XCJcIjoocz1mLnJlcGxhY2UobmV3IFJlZ0V4cChvLFwiZ1wiKSx1KSxzPXMucmVwbGFjZShSZWdFeHAoXCI5XCIsXCJnXCIpLFwi4oCIXCIpKSwwPHMubGVuZ3RoPyhsLm0uYShzKSxsPSEwKTpsPSExfWlmKGwpcmV0dXJuIHQudj1hLHQuQT1zdC50ZXN0KGgoaSw0KSksdC5zPTAsITB9cmV0dXJuIHQuaj0hMX1mdW5jdGlvbiBSKHQsbil7Zm9yKHZhciBlPVtdLHI9bi5sZW5ndGgtMyxpPXQuZi5sZW5ndGgsYT0wO2k+YTsrK2Epe3ZhciBsPXQuZlthXTswPT1tKGwsMyk/ZS5wdXNoKHQuZlthXSk6KGw9aChsLDMsTWF0aC5taW4ocixtKGwsMyktMSkpLDA9PW4uc2VhcmNoKGwpJiZlLnB1c2godC5mW2FdKSl9dC5mPWV9ZnVuY3Rpb24gRih0LG4pe3QuaC5hKG4pO3ZhciBlPW47aWYocnQudGVzdChlKXx8MT09dC5oLmIubGVuZ3RoJiZldC50ZXN0KGUpKXt2YXIgaSxlPW47XCIrXCI9PWU/KGk9ZSx0LnUuYShlKSk6KGk9bnRbZV0sdC51LmEoaSksdC5hLmEoaSkpLG49aX1lbHNlIHQuaj0hMSx0LkQ9ITA7aWYoIXQuail7aWYoIXQuRClpZihIKHQpKXtpZihQKHQpKXJldHVybiBCKHQpfWVsc2UgaWYoMDx0LmwubGVuZ3RoJiYoZT10LmEudG9TdHJpbmcoKSxyKHQuYSksdC5hLmEodC5sKSx0LmEuYShlKSxlPXQuYi50b1N0cmluZygpLGk9ZS5sYXN0SW5kZXhPZih0LmwpLHIodC5iKSx0LmIuYShlLnN1YnN0cmluZygwLGkpKSksdC5sIT1HKHQpKXJldHVybiB0LmIuYShcIiBcIiksQih0KTtyZXR1cm4gdC5oLnRvU3RyaW5nKCl9c3dpdGNoKHQudS5iLmxlbmd0aCl7Y2FzZSAwOmNhc2UgMTpjYXNlIDI6cmV0dXJuIHQuaC50b1N0cmluZygpO2Nhc2UgMzppZighSCh0KSlyZXR1cm4gdC5sPUcodCksVSh0KTt0Lnc9ITA7ZGVmYXVsdDpyZXR1cm4gdC53PyhQKHQpJiYodC53PSExKSx0LmIudG9TdHJpbmcoKSt0LmEudG9TdHJpbmcoKSk6MDx0LmYubGVuZ3RoPyhlPVYodCxuKSxpPUkodCksMDxpLmxlbmd0aD9pOihSKHQsdC5hLnRvU3RyaW5nKCkpLEUodCk/TSh0KTp0Lmo/RCh0LGUpOnQuaC50b1N0cmluZygpKSk6VSh0KX19ZnVuY3Rpb24gQih0KXtyZXR1cm4gdC5qPSEwLHQudz0hMSx0LmY9W10sdC5zPTAscih0Lm0pLHQudj1cIlwiLFUodCl9ZnVuY3Rpb24gSSh0KXtmb3IodmFyIG49dC5hLnRvU3RyaW5nKCksZT10LmYubGVuZ3RoLHI9MDtlPnI7KytyKXt2YXIgaT10LmZbcl0sYT1nKGksMSk7aWYobmV3IFJlZ0V4cChcIl4oPzpcIithK1wiKSRcIikudGVzdChuKSlyZXR1cm4gdC5BPXN0LnRlc3QoaChpLDQpKSxuPW4ucmVwbGFjZShuZXcgUmVnRXhwKGEsXCJnXCIpLGgoaSwyKSksRCh0LG4pfXJldHVyblwiXCJ9ZnVuY3Rpb24gRCh0LG4pe3ZhciBlPXQuYi5iLmxlbmd0aDtyZXR1cm4gdC5BJiZlPjAmJlwiIFwiIT10LmIudG9TdHJpbmcoKS5jaGFyQXQoZS0xKT90LmIrXCIgXCIrbjp0LmIrbn1mdW5jdGlvbiBVKHQpe3ZhciBuPXQuYS50b1N0cmluZygpO2lmKDM8PW4ubGVuZ3RoKXtmb3IodmFyIGU9dC5vJiYwPG0odC5nLDIwKT9wKHQuZywyMCl8fFtdOnAodC5nLDE5KXx8W10scj1lLmxlbmd0aCxpPTA7cj5pOysraSl7dmFyIGEsbD1lW2ldOyhhPW51bGw9PXQuZy5hWzEyXXx8dC5vfHxoKGwsNikpfHwoYT1nKGwsNCksYT0wPT1hLmxlbmd0aHx8aXQudGVzdChhKSksYSYmb3QudGVzdChnKGwsMikpJiZ0LmYucHVzaChsKX1yZXR1cm4gUih0LG4pLG49SSh0KSwwPG4ubGVuZ3RoP246RSh0KT9NKHQpOnQuaC50b1N0cmluZygpfXJldHVybiBEKHQsbil9ZnVuY3Rpb24gTSh0KXt2YXIgbj10LmEudG9TdHJpbmcoKSxlPW4ubGVuZ3RoO2lmKGU+MCl7Zm9yKHZhciByPVwiXCIsaT0wO2U+aTtpKyspcj1WKHQsbi5jaGFyQXQoaSkpO3JldHVybiB0Lmo/RCh0LHIpOnQuaC50b1N0cmluZygpfXJldHVybiB0LmIudG9TdHJpbmcoKX1mdW5jdGlvbiBHKHQpe3ZhciBuLGU9dC5hLnRvU3RyaW5nKCksaT0wO3JldHVybiAxIT1oKHQuZywxMCk/bj0hMToobj10LmEudG9TdHJpbmcoKSxuPVwiMVwiPT1uLmNoYXJBdCgwKSYmXCIwXCIhPW4uY2hhckF0KDEpJiZcIjFcIiE9bi5jaGFyQXQoMSkpLG4/KGk9MSx0LmIuYShcIjFcIikuYShcIiBcIiksdC5vPSEwKTpudWxsIT10LmcuYVsxNV0mJihuPW5ldyBSZWdFeHAoXCJeKD86XCIraCh0LmcsMTUpK1wiKVwiKSxuPWUubWF0Y2gobiksbnVsbCE9biYmbnVsbCE9blswXSYmMDxuWzBdLmxlbmd0aCYmKHQubz0hMCxpPW5bMF0ubGVuZ3RoLHQuYi5hKGUuc3Vic3RyaW5nKDAsaSkpKSkscih0LmEpLHQuYS5hKGUuc3Vic3RyaW5nKGkpKSxlLnN1YnN0cmluZygwLGkpfWZ1bmN0aW9uIEgodCl7dmFyIG49dC51LnRvU3RyaW5nKCksZT1uZXcgUmVnRXhwKFwiXig/OlxcXFwrfFwiK2godC5nLDExKStcIilcIiksZT1uLm1hdGNoKGUpO3JldHVybiBudWxsIT1lJiZudWxsIT1lWzBdJiYwPGVbMF0ubGVuZ3RoPyh0Lm89ITAsZT1lWzBdLmxlbmd0aCxyKHQuYSksdC5hLmEobi5zdWJzdHJpbmcoZSkpLHIodC5iKSx0LmIuYShuLnN1YnN0cmluZygwLGUpKSxcIitcIiE9bi5jaGFyQXQoMCkmJnQuYi5hKFwiIFwiKSwhMCk6ITF9ZnVuY3Rpb24gUCh0KXtpZigwPT10LmEuYi5sZW5ndGgpcmV0dXJuITE7dmFyIG4saT1uZXcgZTt0OntpZihuPXQuYS50b1N0cmluZygpLDAhPW4ubGVuZ3RoJiZcIjBcIiE9bi5jaGFyQXQoMCkpZm9yKHZhciBhLGw9bi5sZW5ndGgsdT0xOzM+PXUmJmw+PXU7Kyt1KWlmKGE9cGFyc2VJbnQobi5zdWJzdHJpbmcoMCx1KSwxMCksYSBpbiBXKXtpLmEobi5zdWJzdHJpbmcodSkpLG49YTticmVhayB0fW49MH1yZXR1cm4gMD09bj8hMToocih0LmEpLHQuYS5hKGkudG9TdHJpbmcoKSksaT1OKG4pLFwiMDAxXCI9PWk/dC5nPUEodC5GLFwiXCIrbik6aSE9dC5DJiYodC5nPUModCxpKSksdC5iLmEoXCJcIituKS5hKFwiIFwiKSx0Lmw9XCJcIiwhMCl9ZnVuY3Rpb24gVih0LG4pe3ZhciBlPXQubS50b1N0cmluZygpO2lmKDA8PWUuc3Vic3RyaW5nKHQucykuc2VhcmNoKHQuSCkpe3ZhciBpPWUuc2VhcmNoKHQuSCksZT1lLnJlcGxhY2UodC5ILG4pO3JldHVybiByKHQubSksdC5tLmEoZSksdC5zPWksZS5zdWJzdHJpbmcoMCx0LnMrMSl9cmV0dXJuIDE9PXQuZi5sZW5ndGgmJih0Lmo9ITEpLHQudj1cIlwiLHQuaC50b1N0cmluZygpfXZhciBxPXRoaXM7ZS5wcm90b3R5cGUuYj1cIlwiLGUucHJvdG90eXBlLnNldD1mdW5jdGlvbih0KXt0aGlzLmI9XCJcIit0fSxlLnByb3RvdHlwZS5hPWZ1bmN0aW9uKHQsbixlKXtpZih0aGlzLmIrPVN0cmluZyh0KSxudWxsIT1uKWZvcih2YXIgcj0xO3I8YXJndW1lbnRzLmxlbmd0aDtyKyspdGhpcy5iKz1hcmd1bWVudHNbcl07cmV0dXJuIHRoaXN9LGUucHJvdG90eXBlLnRvU3RyaW5nPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuYn07dmFyIFQ9MSxZPTIsaz0zLEo9NCxLPTYsTD0xNixPPTE4O2YucHJvdG90eXBlLnNldD1mdW5jdGlvbih0LG4pe2IodGhpcyx0LmIsbil9LGYucHJvdG90eXBlLmNsb25lPWZ1bmN0aW9uKCl7dmFyIHQ9bmV3IHRoaXMuY29uc3RydWN0b3I7cmV0dXJuIHQhPXRoaXMmJih0LmE9e30sdC5iJiYodC5iPXt9KSxjKHQsdGhpcykpLHR9O3ZhciBaO24oeSxmKTt2YXIgejtuKHYsZik7dmFyIFg7bihfLGYpLHkucHJvdG90eXBlLmk9ZnVuY3Rpb24oKXtyZXR1cm4gWnx8KFo9ZCh5LHswOntuYW1lOlwiTnVtYmVyRm9ybWF0XCIsSTpcImkxOG4ucGhvbmVudW1iZXJzLk51bWJlckZvcm1hdFwifSwxOntuYW1lOlwicGF0dGVyblwiLHJlcXVpcmVkOiEwLGM6OSx0eXBlOlN0cmluZ30sMjp7bmFtZTpcImZvcm1hdFwiLHJlcXVpcmVkOiEwLGM6OSx0eXBlOlN0cmluZ30sMzp7bmFtZTpcImxlYWRpbmdfZGlnaXRzX3BhdHRlcm5cIixHOiEwLGM6OSx0eXBlOlN0cmluZ30sNDp7bmFtZTpcIm5hdGlvbmFsX3ByZWZpeF9mb3JtYXR0aW5nX3J1bGVcIixjOjksdHlwZTpTdHJpbmd9LDY6e25hbWU6XCJuYXRpb25hbF9wcmVmaXhfb3B0aW9uYWxfd2hlbl9mb3JtYXR0aW5nXCIsYzo4LHR5cGU6Qm9vbGVhbn0sNTp7bmFtZTpcImRvbWVzdGljX2NhcnJpZXJfY29kZV9mb3JtYXR0aW5nX3J1bGVcIixjOjksdHlwZTpTdHJpbmd9fSkpLFp9LHkuY3Rvcj15LHkuY3Rvci5pPXkucHJvdG90eXBlLmksdi5wcm90b3R5cGUuaT1mdW5jdGlvbigpe3JldHVybiB6fHwoej1kKHYsezA6e25hbWU6XCJQaG9uZU51bWJlckRlc2NcIixJOlwiaTE4bi5waG9uZW51bWJlcnMuUGhvbmVOdW1iZXJEZXNjXCJ9LDI6e25hbWU6XCJuYXRpb25hbF9udW1iZXJfcGF0dGVyblwiLGM6OSx0eXBlOlN0cmluZ30sMzp7bmFtZTpcInBvc3NpYmxlX251bWJlcl9wYXR0ZXJuXCIsYzo5LHR5cGU6U3RyaW5nfSw2OntuYW1lOlwiZXhhbXBsZV9udW1iZXJcIixjOjksdHlwZTpTdHJpbmd9LDc6e25hbWU6XCJuYXRpb25hbF9udW1iZXJfbWF0Y2hlcl9kYXRhXCIsYzoxMix0eXBlOlN0cmluZ30sODp7bmFtZTpcInBvc3NpYmxlX251bWJlcl9tYXRjaGVyX2RhdGFcIixjOjEyLHR5cGU6U3RyaW5nfX0pKSx6fSx2LmN0b3I9dix2LmN0b3IuaT12LnByb3RvdHlwZS5pLF8ucHJvdG90eXBlLmk9ZnVuY3Rpb24oKXtyZXR1cm4gWHx8KFg9ZChfLHswOntuYW1lOlwiUGhvbmVNZXRhZGF0YVwiLEk6XCJpMThuLnBob25lbnVtYmVycy5QaG9uZU1ldGFkYXRhXCJ9LDE6e25hbWU6XCJnZW5lcmFsX2Rlc2NcIixjOjExLHR5cGU6dn0sMjp7bmFtZTpcImZpeGVkX2xpbmVcIixjOjExLHR5cGU6dn0sMzp7bmFtZTpcIm1vYmlsZVwiLGM6MTEsdHlwZTp2fSw0OntuYW1lOlwidG9sbF9mcmVlXCIsYzoxMSx0eXBlOnZ9LDU6e25hbWU6XCJwcmVtaXVtX3JhdGVcIixjOjExLHR5cGU6dn0sNjp7bmFtZTpcInNoYXJlZF9jb3N0XCIsYzoxMSx0eXBlOnZ9LDc6e25hbWU6XCJwZXJzb25hbF9udW1iZXJcIixjOjExLHR5cGU6dn0sODp7bmFtZTpcInZvaXBcIixjOjExLHR5cGU6dn0sMjE6e25hbWU6XCJwYWdlclwiLGM6MTEsdHlwZTp2fSwyNTp7bmFtZTpcInVhblwiLGM6MTEsdHlwZTp2fSwyNzp7bmFtZTpcImVtZXJnZW5jeVwiLGM6MTEsdHlwZTp2fSwyODp7bmFtZTpcInZvaWNlbWFpbFwiLGM6MTEsdHlwZTp2fSwyNDp7bmFtZTpcIm5vX2ludGVybmF0aW9uYWxfZGlhbGxpbmdcIixjOjExLHR5cGU6dn0sOTp7bmFtZTpcImlkXCIscmVxdWlyZWQ6ITAsYzo5LHR5cGU6U3RyaW5nfSwxMDp7bmFtZTpcImNvdW50cnlfY29kZVwiLGM6NSx0eXBlOk51bWJlcn0sMTE6e25hbWU6XCJpbnRlcm5hdGlvbmFsX3ByZWZpeFwiLGM6OSx0eXBlOlN0cmluZ30sMTc6e25hbWU6XCJwcmVmZXJyZWRfaW50ZXJuYXRpb25hbF9wcmVmaXhcIixjOjksdHlwZTpTdHJpbmd9LDEyOntuYW1lOlwibmF0aW9uYWxfcHJlZml4XCIsYzo5LHR5cGU6U3RyaW5nfSwxMzp7bmFtZTpcInByZWZlcnJlZF9leHRuX3ByZWZpeFwiLGM6OSx0eXBlOlN0cmluZ30sMTU6e25hbWU6XCJuYXRpb25hbF9wcmVmaXhfZm9yX3BhcnNpbmdcIixjOjksdHlwZTpTdHJpbmd9LDE2OntuYW1lOlwibmF0aW9uYWxfcHJlZml4X3RyYW5zZm9ybV9ydWxlXCIsYzo5LHR5cGU6U3RyaW5nfSwxODp7bmFtZTpcInNhbWVfbW9iaWxlX2FuZF9maXhlZF9saW5lX3BhdHRlcm5cIixjOjgsZGVmYXVsdFZhbHVlOiExLHR5cGU6Qm9vbGVhbn0sMTk6e25hbWU6XCJudW1iZXJfZm9ybWF0XCIsRzohMCxjOjExLHR5cGU6eX0sMjA6e25hbWU6XCJpbnRsX251bWJlcl9mb3JtYXRcIixHOiEwLGM6MTEsdHlwZTp5fSwyMjp7bmFtZTpcIm1haW5fY291bnRyeV9mb3JfY29kZVwiLGM6OCxkZWZhdWx0VmFsdWU6ITEsdHlwZTpCb29sZWFufSwyMzp7bmFtZTpcImxlYWRpbmdfZGlnaXRzXCIsYzo5LHR5cGU6U3RyaW5nfSwyNjp7bmFtZTpcImxlYWRpbmdfemVyb19wb3NzaWJsZVwiLGM6OCxkZWZhdWx0VmFsdWU6ITEsdHlwZTpCb29sZWFufX0pKSxYfSxfLmN0b3I9XyxfLmN0b3IuaT1fLnByb3RvdHlwZS5pLFMucHJvdG90eXBlLmE9ZnVuY3Rpb24odCl7dGhyb3cgbmV3IHQuYixFcnJvcihcIlVuaW1wbGVtZW50ZWRcIil9LFMucHJvdG90eXBlLmI9ZnVuY3Rpb24odCxuKXtpZigxMT09dC5hfHwxMD09dC5hKXJldHVybiBuIGluc3RhbmNlb2YgZj9uOnRoaXMuYSh0LmoucHJvdG90eXBlLmkoKSxuKTtpZigxND09dC5hKXtpZihcInN0cmluZ1wiPT10eXBlb2YgbiYmUS50ZXN0KG4pKXt2YXIgZT1OdW1iZXIobik7aWYoZT4wKXJldHVybiBlfXJldHVybiBufWlmKCF0LmgpcmV0dXJuIG47aWYoZT10LmosZT09PVN0cmluZyl7aWYoXCJudW1iZXJcIj09dHlwZW9mIG4pcmV0dXJuIFN0cmluZyhuKX1lbHNlIGlmKGU9PT1OdW1iZXImJlwic3RyaW5nXCI9PXR5cGVvZiBuJiYoXCJJbmZpbml0eVwiPT09bnx8XCItSW5maW5pdHlcIj09PW58fFwiTmFOXCI9PT1ufHxRLnRlc3QobikpKXJldHVybiBOdW1iZXIobik7cmV0dXJuIG59O3ZhciBRPS9eLT9bMC05XSskLztuKCQsUyksJC5wcm90b3R5cGUuYT1mdW5jdGlvbih0LG4pe3ZhciBlPW5ldyB0LmI7cmV0dXJuIGUuZz10aGlzLGUuYT1uLGUuYj17fSxlfSxuKHcsJCksdy5wcm90b3R5cGUuYj1mdW5jdGlvbih0LG4pe3JldHVybiA4PT10LmE/ISFuOlMucHJvdG90eXBlLmIuYXBwbHkodGhpcyxhcmd1bWVudHMpfSx3LnByb3RvdHlwZS5hPWZ1bmN0aW9uKHQsbil7cmV0dXJuIHcuTS5hLmNhbGwodGhpcyx0LG4pfTsvKlxuXG4gQ29weXJpZ2h0IChDKSAyMDEwIFRoZSBMaWJwaG9uZW51bWJlciBBdXRob3JzXG5cbiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG4gVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xudmFyIFc9ezYxOltcIkFVXCIsXCJDQ1wiLFwiQ1hcIl19LHR0PXtBVTpbbnVsbCxbbnVsbCxudWxsLFwiWzEtNTc4XVxcXFxkezUsOX1cIixcIlxcXFxkezYsMTB9XCJdLFtudWxsLG51bGwsXCJbMjM3XVxcXFxkezh9fDgoPzpbNi04XVxcXFxkezN9fDkoPzpbMDItOV1cXFxcZHsyfXwxKD86WzAtNTctOV1cXFxcZHw2WzAxMzUtOV0pKSlcXFxcZHs0fVwiLFwiXFxcXGR7OCw5fVwiLG51bGwsbnVsbCxcIjIxMjM0NTY3OFwiXSxbbnVsbCxudWxsLFwiMTQoPzo1XFxcXGR8NzEpXFxcXGR7NX18NCg/OlswLTNdXFxcXGR8NFs0Ny05XXw1WzAtMjUtOV18Nls2LTldfDdbMDItOV18OFsxNDctOV18OVswMTctOV0pXFxcXGR7Nn1cIixcIlxcXFxkezl9XCIsbnVsbCxudWxsLFwiNDEyMzQ1Njc4XCJdLFtudWxsLG51bGwsXCIxODAoPzowXFxcXGR7M318MilcXFxcZHszfVwiLFwiXFxcXGR7NywxMH1cIixudWxsLG51bGwsXCIxODAwMTIzNDU2XCJdLFtudWxsLG51bGwsXCIxOSg/OjBbMDEyNl1cXFxcZHxbNjc5XSlcXFxcZHs1fVwiLFwiXFxcXGR7OCwxMH1cIixudWxsLG51bGwsXCIxOTAwMTIzNDU2XCJdLFtudWxsLG51bGwsXCIxMyg/OjAwXFxcXGR7M318NDVbMC00XXxcXFxcZClcXFxcZHszfVwiLFwiXFxcXGR7NiwxMH1cIixudWxsLG51bGwsXCIxMzAwMTIzNDU2XCJdLFtudWxsLG51bGwsXCI1MDBcXFxcZHs2fVwiLFwiXFxcXGR7OX1cIixudWxsLG51bGwsXCI1MDAxMjM0NTZcIl0sW251bGwsbnVsbCxcIjU1MFxcXFxkezZ9XCIsXCJcXFxcZHs5fVwiLG51bGwsbnVsbCxcIjU1MDEyMzQ1NlwiXSxcIkFVXCIsNjEsXCIoPzoxNCg/OjFbMTRdfDM0fDRbMTddfFs1Nl02fDdbNDddfDg4KSk/MDAxWzE0LTY4OV1cIixcIjBcIixudWxsLG51bGwsXCIwXCIsbnVsbCxcIjAwMTFcIixudWxsLFtbbnVsbCxcIihbMjM3OF0pKFxcXFxkezR9KShcXFxcZHs0fSlcIixcIiQxICQyICQzXCIsW1wiWzIzNzhdXCJdLFwiKDAkMSlcIl0sW251bGwsXCIoXFxcXGR7M30pKFxcXFxkezN9KShcXFxcZHszfSlcIixcIiQxICQyICQzXCIsW1wiWzQ1XXwxNFwiXSxcIjAkMVwiXSxbbnVsbCxcIigxNikoXFxcXGR7M30pKFxcXFxkezIsNH0pXCIsXCIkMSAkMiAkM1wiLFtcIjE2XCJdLFwiMCQxXCJdLFtudWxsLFwiKDFbMzg5XVxcXFxkezJ9KShcXFxcZHszfSkoXFxcXGR7M30pXCIsXCIkMSAkMiAkM1wiLFtcIjEoPzpbMzhdMHw5MClcIixcIjEoPzpbMzhdMDB8OTApXCJdLFwiJDFcIl0sW251bGwsXCIoMTgwKSgyXFxcXGR7M30pXCIsXCIkMSAkMlwiLFtcIjE4MFwiLFwiMTgwMlwiXSxcIiQxXCJdLFtudWxsLFwiKDE5XFxcXGQpKFxcXFxkezN9KVwiLFwiJDEgJDJcIixbXCIxOVsxM11cIl0sXCIkMVwiXSxbbnVsbCxcIigxOVxcXFxkezJ9KShcXFxcZHs0fSlcIixcIiQxICQyXCIsW1wiMTlbNjc5XVwiXSxcIiQxXCJdLFtudWxsLFwiKDEzKShcXFxcZHsyfSkoXFxcXGR7Mn0pXCIsXCIkMSAkMiAkM1wiLFtcIjEzWzEtOV1cIl0sXCIkMVwiXV0sbnVsbCxbbnVsbCxudWxsLFwiMTZcXFxcZHszLDd9XCIsXCJcXFxcZHs1LDl9XCIsbnVsbCxudWxsLFwiMTYxMjM0NVwiXSwxLG51bGwsW251bGwsbnVsbCxcIjEoPzozKD86MDBcXFxcZHszfXw0NVswLTRdfFxcXFxkKVxcXFxkezN9fDgwKD86MFxcXFxkezZ9fDJcXFxcZHszfSkpXCIsXCJcXFxcZHs2LDEwfVwiLG51bGwsbnVsbCxcIjEzMDAxMjM0NTZcIl0sW251bGwsbnVsbCxcIk5BXCIsXCJOQVwiXSxudWxsLG51bGwsW251bGwsbnVsbCxcIk5BXCIsXCJOQVwiXV19O3guYj1mdW5jdGlvbigpe3JldHVybiB4LmE/eC5hOnguYT1uZXcgeH07dmFyIG50PXswOlwiMFwiLDE6XCIxXCIsMjpcIjJcIiwzOlwiM1wiLDQ6XCI0XCIsNTpcIjVcIiw2OlwiNlwiLDc6XCI3XCIsODpcIjhcIiw5OlwiOVwiLFwi77yQXCI6XCIwXCIsXCLvvJFcIjpcIjFcIixcIu+8klwiOlwiMlwiLFwi77yTXCI6XCIzXCIsXCLvvJRcIjpcIjRcIixcIu+8lVwiOlwiNVwiLFwi77yWXCI6XCI2XCIsXCLvvJdcIjpcIjdcIixcIu+8mFwiOlwiOFwiLFwi77yZXCI6XCI5XCIsXCLZoFwiOlwiMFwiLFwi2aFcIjpcIjFcIixcItmiXCI6XCIyXCIsXCLZo1wiOlwiM1wiLFwi2aRcIjpcIjRcIixcItmlXCI6XCI1XCIsXCLZplwiOlwiNlwiLFwi2adcIjpcIjdcIixcItmoXCI6XCI4XCIsXCLZqVwiOlwiOVwiLFwi27BcIjpcIjBcIixcItuxXCI6XCIxXCIsXCLbslwiOlwiMlwiLFwi27NcIjpcIjNcIixcItu0XCI6XCI0XCIsXCLbtVwiOlwiNVwiLFwi27ZcIjpcIjZcIixcItu3XCI6XCI3XCIsXCLbuFwiOlwiOFwiLFwi27lcIjpcIjlcIn0sZXQ9UmVnRXhwKFwiWyvvvItdK1wiKSxydD1SZWdFeHAoXCIoWzAtOe+8kC3vvJnZoC3ZqduwLdu5XSlcIiksaXQ9L15cXCg/XFwkMVxcKT8kLyxhdD1uZXcgXztiKGF0LDExLFwiTkFcIik7dmFyIGx0PS9cXFsoW15cXFtcXF1dKSpcXF0vZyx1dD0vXFxkKD89W14sfV1bXix9XSkvZyxvdD1SZWdFeHAoXCJeWy144oCQLeKAleKIkuODvO+8jS3vvI8gwqDCreKAi+KBoOOAgCgp77yI77yJ77y777y9LlxcXFxbXFxcXF0vfuKBk+KIvO+9nl0qKFxcXFwkXFxcXGRbLXjigJAt4oCV4oiS44O877yNLe+8jyDCoMKt4oCL4oGg44CAKCnvvIjvvInvvLvvvL0uXFxcXFtcXFxcXS9+4oGT4oi8772eXSopKyRcIiksc3Q9L1stIF0vO2oucHJvdG90eXBlLks9ZnVuY3Rpb24oKXt0aGlzLkI9XCJcIixyKHRoaXMuaCkscih0aGlzLnUpLHIodGhpcy5tKSx0aGlzLnM9MCx0aGlzLnY9XCJcIixyKHRoaXMuYiksdGhpcy5sPVwiXCIscih0aGlzLmEpLHRoaXMuaj0hMCx0aGlzLnc9dGhpcy5vPXRoaXMuRD0hMSx0aGlzLmY9W10sdGhpcy5BPSExLHRoaXMuZyE9dGhpcy5KJiYodGhpcy5nPUModGhpcyx0aGlzLkMpKX0sai5wcm90b3R5cGUuTD1mdW5jdGlvbih0KXtyZXR1cm4gdGhpcy5CPUYodGhpcyx0KX0sdChcIkNsZWF2ZS5Bc1lvdVR5cGVGb3JtYXR0ZXJcIixqKSx0KFwiQ2xlYXZlLkFzWW91VHlwZUZvcm1hdHRlci5wcm90b3R5cGUuaW5wdXREaWdpdFwiLGoucHJvdG90eXBlLkwpLHQoXCJDbGVhdmUuQXNZb3VUeXBlRm9ybWF0dGVyLnByb3RvdHlwZS5jbGVhclwiLGoucHJvdG90eXBlLkspfSkuY2FsbCh3aW5kb3cpOyIsIi8vdmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbi8vdmFyIFJlYWN0RE9NID0gcmVxdWlyZSgncmVhY3QtZG9tJyk7XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcblxuaW1wb3J0IENsZWF2ZSBmcm9tICcuLi8uLi9jbGVhdmUuanMvcmVhY3QnO1xuaW1wb3J0IENsZWF2ZVBob25lIGZyb20gJy4uLy4uL2NsZWF2ZS5qcy9kaXN0L2FkZG9ucy9jbGVhdmUtcGhvbmUuYXUnO1xuXG5jbGFzcyBNeUNvbXBvbmVudCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMsIGNvbnRleHQpIHtcbiAgICAgICAgc3VwZXIocHJvcHMsIGNvbnRleHQpO1xuXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBjcmVkaXRDYXJkVHlwZTogICAgICcnLFxuICAgICAgICAgICAgY3JlZGl0Q2FyZFJhd1ZhbHVlOiAnJyxcbiAgICAgICAgICAgIHBob25lUmF3VmFsdWU6ICAgICAgJycsXG4gICAgICAgICAgICBkYXRlUmF3VmFsdWU6ICAgICAgICcnLFxuICAgICAgICAgICAgbnVtZXJhbFJhd1ZhbHVlOiAgICAnJyxcbiAgICAgICAgICAgIGN1c3RvbVJhd1ZhbHVlOiAgICAgJydcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBvbkNyZWRpdENhcmRDaGFuZ2UoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y3JlZGl0Q2FyZFJhd1ZhbHVlOiBldmVudC50YXJnZXQucmF3VmFsdWV9KTtcbiAgICB9XG5cbiAgICBvblBob25lQ2hhbmdlKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3Bob25lUmF3VmFsdWU6IGV2ZW50LnRhcmdldC5yYXdWYWx1ZX0pO1xuICAgIH1cblxuICAgIG9uRGF0ZUNoYW5nZShldmVudCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtkYXRlUmF3VmFsdWU6IGV2ZW50LnRhcmdldC5yYXdWYWx1ZX0pO1xuICAgIH1cblxuICAgIG9uTnVtZXJhbENoYW5nZShldmVudCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtudW1lcmFsUmF3VmFsdWU6IGV2ZW50LnRhcmdldC5yYXdWYWx1ZX0pO1xuICAgIH1cblxuICAgIG9uQ3VzdG9tQ2hhbmdlKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2N1c3RvbVJhd1ZhbHVlOiBldmVudC50YXJnZXQudmFsdWV9KTtcbiAgICB9XG5cbiAgICBvbkNyZWRpdENhcmRUeXBlQ2hhbmdlZCh0eXBlKXtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y3JlZGl0Q2FyZFR5cGU6IHR5cGV9KTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxDbGVhdmUgcGxhY2Vob2xkZXI9XCJFbnRlciBjcmVkaXQgY2FyZCBudW1iZXJcIiBvcHRpb25zPXt7Y3JlZGl0Q2FyZDogdHJ1ZSwgb25DcmVkaXRDYXJkVHlwZUNoYW5nZWQ6dGhpcy5vbkNyZWRpdENhcmRUeXBlQ2hhbmdlZC5iaW5kKHRoaXMpfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uQ3JlZGl0Q2FyZENoYW5nZS5iaW5kKHRoaXMpfS8+XG5cbiAgICAgICAgICAgICAgICA8Q2xlYXZlIHBsYWNlaG9sZGVyPVwiRW50ZXIgcGhvbmUgbnVtYmVyXCIgb3B0aW9ucz17e3Bob25lOiB0cnVlLCBwaG9uZVJlZ2lvbkNvZGU6ICdBVSd9fVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25QaG9uZUNoYW5nZS5iaW5kKHRoaXMpfS8+XG5cbiAgICAgICAgICAgICAgICA8Q2xlYXZlIHBsYWNlaG9sZGVyPVwiRW50ZXIgZGF0ZVwiIG9wdGlvbnM9e3tkYXRlOiB0cnVlLCBkYXRlUGF0dGVybjogWydZJywgJ20nLCAnZCddfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uRGF0ZUNoYW5nZS5iaW5kKHRoaXMpfS8+XG5cbiAgICAgICAgICAgICAgICA8Q2xlYXZlIGNsYXNzTmFtZT1cImlucHV0LW51bWVyYWxcIiBwbGFjZWhvbGRlcj1cIkVudGVyIG51bWVyYWxcIiBvcHRpb25zPXt7bnVtZXJhbDogdHJ1ZSwgZGVsaW1pdGVyOiAnJywgbnVtZXJhbERlY2ltYWxNYXJrOiAnLCcsIG51bWVyYWxUaG91c2FuZHNHcm91cFN0eWxlOiAndGhvdXNhbmQnfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uTnVtZXJhbENoYW5nZS5iaW5kKHRoaXMpfS8+XG5cbiAgICAgICAgICAgICAgICA8Q2xlYXZlIHBsYWNlaG9sZGVyPVwiQ3VzdG9tIGRlbGltaXRlciAvIGJsb2Nrc1wiIG9wdGlvbnM9e3tibG9ja3M6IFs0LDMsM10sIG51bWVyaWNPbmx5OiB0cnVlLCBkZWxpbWl0ZXI6ICctJ319XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkN1c3RvbUNoYW5nZS5iaW5kKHRoaXMpfS8+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJhdy12YWx1ZXNcIj5cbiAgICAgICAgICAgICAgICAgICAgPHA+Y3JlZGl0IGNhcmQ6IHt0aGlzLnN0YXRlLmNyZWRpdENhcmRSYXdWYWx1ZX08L3A+XG4gICAgICAgICAgICAgICAgICAgIDxwPmNyZWRpdCBjYXJkIHR5cGU6IHt0aGlzLnN0YXRlLmNyZWRpdENhcmRUeXBlfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPHA+cGhvbmU6IHt0aGlzLnN0YXRlLnBob25lUmF3VmFsdWV9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8cD5kYXRlOiB7dGhpcy5zdGF0ZS5kYXRlUmF3VmFsdWV9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8cD5udW1lcmFsOiB7dGhpcy5zdGF0ZS5udW1lcmFsUmF3VmFsdWV9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8cD5jdXN0b206IHt0aGlzLnN0YXRlLmN1c3RvbVJhd1ZhbHVlfTwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuUmVhY3RET00ucmVuZGVyKDxNeUNvbXBvbmVudC8+LCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGVudCcpKTtcbiIsImltcG9ydCBDbGVhdmUgZnJvbSAnLi9zcmMvQ2xlYXZlLnJlYWN0JztcblxuZXhwb3J0IGRlZmF1bHQgQ2xlYXZlO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgTnVtZXJhbEZvcm1hdHRlciA9IHJlcXVpcmUoJy4vc2hvcnRjdXRzL051bWVyYWxGb3JtYXR0ZXInKTtcbnZhciBEYXRlRm9ybWF0dGVyID0gcmVxdWlyZSgnLi9zaG9ydGN1dHMvRGF0ZUZvcm1hdHRlcicpO1xudmFyIFBob25lRm9ybWF0dGVyID0gcmVxdWlyZSgnLi9zaG9ydGN1dHMvUGhvbmVGb3JtYXR0ZXInKTtcbnZhciBDcmVkaXRDYXJkRGV0ZWN0b3IgPSByZXF1aXJlKCcuL3Nob3J0Y3V0cy9DcmVkaXRDYXJkRGV0ZWN0b3InKTtcbnZhciBVdGlsID0gcmVxdWlyZSgnLi91dGlscy9VdGlsJyk7XG52YXIgRGVmYXVsdFByb3BlcnRpZXMgPSByZXF1aXJlKCcuL2NvbW1vbi9EZWZhdWx0UHJvcGVydGllcycpO1xuXG52YXIgQ2xlYXZlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH0sXG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzOiBmdW5jdGlvbiAobmV4dFByb3BzKSB7XG4gICAgICAgIHZhciBvd25lciA9IHRoaXMsXG4gICAgICAgICAgICBwaG9uZVJlZ2lvbkNvZGUgPSBuZXh0UHJvcHMub3B0aW9ucy5waG9uZVJlZ2lvbkNvZGUsXG4gICAgICAgICAgICBuZXdWYWx1ZSA9IG5leHRQcm9wcy52YWx1ZTtcblxuICAgICAgICBpZiAobmV3VmFsdWUpIHtcbiAgICAgICAgICAgIG93bmVyLm9uSW5wdXQobmV3VmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdXBkYXRlIHBob25lIHJlZ2lvbiBjb2RlXG4gICAgICAgIGlmIChwaG9uZVJlZ2lvbkNvZGUgJiYgcGhvbmVSZWdpb25Db2RlICE9PSBvd25lci5wcm9wZXJ0aWVzLnBob25lUmVnaW9uQ29kZSkge1xuICAgICAgICAgICAgb3duZXIucHJvcGVydGllcy5waG9uZVJlZ2lvbkNvZGUgPSBwaG9uZVJlZ2lvbkNvZGU7XG4gICAgICAgICAgICBvd25lci5pbml0UGhvbmVGb3JtYXR0ZXIoKTtcbiAgICAgICAgICAgIG93bmVyLm9uSW5wdXQob3duZXIucHJvcGVydGllcy5yZXN1bHQpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgb3duZXIgPSB0aGlzLFxuICAgICAgICAgICAgeyB2YWx1ZSwgb3B0aW9ucywgb25LZXlEb3duLCBvbkNoYW5nZSwgLi4ub3RoZXIgfSA9IG93bmVyLnByb3BzO1xuXG4gICAgICAgIG93bmVyLnJlZ2lzdGVyZWRFdmVudHMgPSB7XG4gICAgICAgICAgICBvbkNoYW5nZTogIG9uQ2hhbmdlIHx8IFV0aWwubm9vcCxcbiAgICAgICAgICAgIG9uS2V5RG93bjogb25LZXlEb3duIHx8IFV0aWwubm9vcFxuICAgICAgICB9O1xuXG4gICAgICAgIG9wdGlvbnMuaW5pdFZhbHVlID0gdmFsdWU7XG5cbiAgICAgICAgb3duZXIucHJvcGVydGllcyA9IERlZmF1bHRQcm9wZXJ0aWVzLmFzc2lnbih7fSwgb3B0aW9ucyk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG90aGVyOiBvdGhlcixcbiAgICAgICAgICAgIHZhbHVlOiBvd25lci5wcm9wZXJ0aWVzLnJlc3VsdFxuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBvd25lciA9IHRoaXMsXG4gICAgICAgICAgICBwcHMgPSBvd25lci5wcm9wZXJ0aWVzO1xuXG4gICAgICAgIC8vIHNvIG5vIG5lZWQgZm9yIHRoaXMgbGliIGF0IGFsbFxuICAgICAgICBpZiAoIXBwcy5udW1lcmFsICYmICFwcHMucGhvbmUgJiYgIXBwcy5jcmVkaXRDYXJkICYmICFwcHMuZGF0ZSAmJiAocHBzLmJsb2Nrc0xlbmd0aCA9PT0gMCAmJiAhcHBzLnByZWZpeCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHBwcy5tYXhMZW5ndGggPSBVdGlsLmdldE1heExlbmd0aChwcHMuYmxvY2tzKTtcblxuICAgICAgICBvd25lci5pbml0UGhvbmVGb3JtYXR0ZXIoKTtcbiAgICAgICAgb3duZXIuaW5pdERhdGVGb3JtYXR0ZXIoKTtcbiAgICAgICAgb3duZXIuaW5pdE51bWVyYWxGb3JtYXR0ZXIoKTtcblxuICAgICAgICBvd25lci5vbklucHV0KHBwcy5pbml0VmFsdWUpO1xuICAgIH0sXG5cbiAgICBpbml0TnVtZXJhbEZvcm1hdHRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgb3duZXIgPSB0aGlzLFxuICAgICAgICAgICAgcHBzID0gb3duZXIucHJvcGVydGllcztcblxuICAgICAgICBpZiAoIXBwcy5udW1lcmFsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBwcHMubnVtZXJhbEZvcm1hdHRlciA9IG5ldyBOdW1lcmFsRm9ybWF0dGVyKFxuICAgICAgICAgICAgcHBzLm51bWVyYWxEZWNpbWFsTWFyayxcbiAgICAgICAgICAgIHBwcy5udW1lcmFsRGVjaW1hbFNjYWxlLFxuICAgICAgICAgICAgcHBzLm51bWVyYWxUaG91c2FuZHNHcm91cFN0eWxlLFxuICAgICAgICAgICAgcHBzLmRlbGltaXRlclxuICAgICAgICApO1xuICAgIH0sXG5cbiAgICBpbml0RGF0ZUZvcm1hdHRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgb3duZXIgPSB0aGlzLFxuICAgICAgICAgICAgcHBzID0gb3duZXIucHJvcGVydGllcztcblxuICAgICAgICBpZiAoIXBwcy5kYXRlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBwcHMuZGF0ZUZvcm1hdHRlciA9IG5ldyBEYXRlRm9ybWF0dGVyKHBwcy5kYXRlUGF0dGVybik7XG4gICAgICAgIHBwcy5ibG9ja3MgPSBwcHMuZGF0ZUZvcm1hdHRlci5nZXRCbG9ja3MoKTtcbiAgICAgICAgcHBzLmJsb2Nrc0xlbmd0aCA9IHBwcy5ibG9ja3MubGVuZ3RoO1xuICAgICAgICBwcHMubWF4TGVuZ3RoID0gVXRpbC5nZXRNYXhMZW5ndGgocHBzLmJsb2Nrcyk7XG4gICAgfSxcblxuICAgIGluaXRQaG9uZUZvcm1hdHRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgb3duZXIgPSB0aGlzLFxuICAgICAgICAgICAgcHBzID0gb3duZXIucHJvcGVydGllcztcblxuICAgICAgICBpZiAoIXBwcy5waG9uZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ2xlYXZlLkFzWW91VHlwZUZvcm1hdHRlciBzaG91bGQgYmUgcHJvdmlkZWQgYnlcbiAgICAgICAgLy8gZXh0ZXJuYWwgZ29vZ2xlIGNsb3N1cmUgbGliXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBwcHMucGhvbmVGb3JtYXR0ZXIgPSBuZXcgUGhvbmVGb3JtYXR0ZXIoXG4gICAgICAgICAgICAgICAgbmV3IHdpbmRvdy5DbGVhdmUuQXNZb3VUeXBlRm9ybWF0dGVyKHBwcy5waG9uZVJlZ2lvbkNvZGUpLFxuICAgICAgICAgICAgICAgIHBwcy5kZWxpbWl0ZXJcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BsZWFzZSBpbmNsdWRlIHBob25lLXR5cGUtZm9ybWF0dGVyLntjb3VudHJ5fS5qcyBsaWInKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBvbktleURvd246IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICB2YXIgb3duZXIgPSB0aGlzLFxuICAgICAgICAgICAgcHBzID0gb3duZXIucHJvcGVydGllcyxcbiAgICAgICAgICAgIGNoYXJDb2RlID0gZXZlbnQud2hpY2ggfHwgZXZlbnQua2V5Q29kZTtcblxuICAgICAgICAvLyBoaXQgYmFja3NwYWNlIHdoZW4gbGFzdCBjaGFyYWN0ZXIgaXMgZGVsaW1pdGVyXG4gICAgICAgIGlmIChjaGFyQ29kZSA9PT0gOCAmJiBVdGlsLmlzRGVsaW1pdGVyKHBwcy5yZXN1bHQuc2xpY2UoLTEpLCBwcHMuZGVsaW1pdGVyLCBwcHMuZGVsaW1pdGVycykpIHtcbiAgICAgICAgICAgIHBwcy5iYWNrc3BhY2UgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcHBzLmJhY2tzcGFjZSA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgb3duZXIucmVnaXN0ZXJlZEV2ZW50cy5vbktleURvd24oZXZlbnQpO1xuICAgIH0sXG5cbiAgICBvbkNoYW5nZTogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIHZhciBvd25lciA9IHRoaXMsIHBwcyA9IG93bmVyLnByb3BlcnRpZXM7XG5cbiAgICAgICAgb3duZXIub25JbnB1dChldmVudC50YXJnZXQudmFsdWUpO1xuXG4gICAgICAgIGlmIChwcHMubnVtZXJhbCkge1xuICAgICAgICAgICAgZXZlbnQudGFyZ2V0LnJhd1ZhbHVlID0gcHBzLm51bWVyYWxGb3JtYXR0ZXIuZ2V0UmF3VmFsdWUocHBzLnJlc3VsdCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBldmVudC50YXJnZXQucmF3VmFsdWUgPSBVdGlsLnN0cmlwRGVsaW1pdGVycyhwcHMucmVzdWx0LCBwcHMuZGVsaW1pdGVyLCBwcHMuZGVsaW1pdGVycyk7XG4gICAgICAgIH1cblxuICAgICAgICBldmVudC50YXJnZXQudmFsdWUgPSBwcHMucmVzdWx0O1xuXG4gICAgICAgIG93bmVyLnJlZ2lzdGVyZWRFdmVudHMub25DaGFuZ2UoZXZlbnQpO1xuICAgIH0sXG5cbiAgICBvbklucHV0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgdmFyIG93bmVyID0gdGhpcywgcHBzID0gb3duZXIucHJvcGVydGllcyxcbiAgICAgICAgICAgIHByZXYgPSBwcHMucmVzdWx0O1xuXG4gICAgICAgIC8vIGNhc2UgMTogZGVsZXRlIG9uZSBtb3JlIGNoYXJhY3RlciBcIjRcIlxuICAgICAgICAvLyAxMjM0KnwgLT4gaGl0IGJhY2tzcGFjZSAtPiAxMjN8XG4gICAgICAgIC8vIGNhc2UgMjogbGFzdCBjaGFyYWN0ZXIgaXMgbm90IGRlbGltaXRlciB3aGljaCBpczpcbiAgICAgICAgLy8gMTJ8MzQqIC0+IGhpdCBiYWNrc3BhY2UgLT4gMXwzNCpcblxuICAgICAgICBpZiAoIXBwcy5udW1lcmFsICYmIHBwcy5iYWNrc3BhY2UgJiYgIVV0aWwuaXNEZWxpbWl0ZXIodmFsdWUuc2xpY2UoLTEpLCBwcHMuZGVsaW1pdGVyLCBwcHMuZGVsaW1pdGVycykpIHtcbiAgICAgICAgICAgIHZhbHVlID0gVXRpbC5oZWFkU3RyKHZhbHVlLCB2YWx1ZS5sZW5ndGggLSAxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHBob25lIGZvcm1hdHRlclxuICAgICAgICBpZiAocHBzLnBob25lKSB7XG4gICAgICAgICAgICBwcHMucmVzdWx0ID0gcHBzLnBob25lRm9ybWF0dGVyLmZvcm1hdCh2YWx1ZSk7XG4gICAgICAgICAgICBvd25lci51cGRhdGVWYWx1ZVN0YXRlKCk7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG51bWVyYWwgZm9ybWF0dGVyXG4gICAgICAgIGlmIChwcHMubnVtZXJhbCkge1xuICAgICAgICAgICAgcHBzLnJlc3VsdCA9IHBwcy5wcmVmaXggKyBwcHMubnVtZXJhbEZvcm1hdHRlci5mb3JtYXQodmFsdWUpO1xuICAgICAgICAgICAgb3duZXIudXBkYXRlVmFsdWVTdGF0ZSgpO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBkYXRlXG4gICAgICAgIGlmIChwcHMuZGF0ZSkge1xuICAgICAgICAgICAgdmFsdWUgPSBwcHMuZGF0ZUZvcm1hdHRlci5nZXRWYWxpZGF0ZWREYXRlKHZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHN0cmlwIGRlbGltaXRlcnNcbiAgICAgICAgdmFsdWUgPSBVdGlsLnN0cmlwRGVsaW1pdGVycyh2YWx1ZSwgcHBzLmRlbGltaXRlciwgcHBzLmRlbGltaXRlcnMpO1xuXG4gICAgICAgIC8vIHN0cmlwIHByZWZpeFxuICAgICAgICB2YWx1ZSA9IFV0aWwuZ2V0UHJlZml4U3RyaXBwZWRWYWx1ZSh2YWx1ZSwgcHBzLnByZWZpeExlbmd0aCk7XG5cbiAgICAgICAgLy8gc3RyaXAgbm9uLW51bWVyaWMgY2hhcmFjdGVyc1xuICAgICAgICB2YWx1ZSA9IHBwcy5udW1lcmljT25seSA/IFV0aWwuc3RyaXAodmFsdWUsIC9bXlxcZF0vZykgOiB2YWx1ZTtcblxuICAgICAgICAvLyBjb252ZXJ0IGNhc2VcbiAgICAgICAgdmFsdWUgPSBwcHMudXBwZXJjYXNlID8gdmFsdWUudG9VcHBlckNhc2UoKSA6IHZhbHVlO1xuICAgICAgICB2YWx1ZSA9IHBwcy5sb3dlcmNhc2UgPyB2YWx1ZS50b0xvd2VyQ2FzZSgpIDogdmFsdWU7XG5cbiAgICAgICAgLy8gcHJlZml4XG4gICAgICAgIGlmIChwcHMucHJlZml4KSB7XG4gICAgICAgICAgICB2YWx1ZSA9IHBwcy5wcmVmaXggKyB2YWx1ZTtcblxuICAgICAgICAgICAgLy8gbm8gYmxvY2tzIHNwZWNpZmllZCwgbm8gbmVlZCB0byBkbyBmb3JtYXR0aW5nXG4gICAgICAgICAgICBpZiAocHBzLmJsb2Nrc0xlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHBwcy5yZXN1bHQgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICBvd25lci51cGRhdGVWYWx1ZVN0YXRlKCk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyB1cGRhdGUgY3JlZGl0IGNhcmQgcHJvcHNcbiAgICAgICAgaWYgKHBwcy5jcmVkaXRDYXJkKSB7XG4gICAgICAgICAgICBvd25lci51cGRhdGVDcmVkaXRDYXJkUHJvcHNCeVZhbHVlKHZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHN0cmlwIG92ZXIgbGVuZ3RoIGNoYXJhY3RlcnNcbiAgICAgICAgdmFsdWUgPSBVdGlsLmhlYWRTdHIodmFsdWUsIHBwcy5tYXhMZW5ndGgpO1xuXG4gICAgICAgIC8vIGFwcGx5IGJsb2Nrc1xuICAgICAgICBwcHMucmVzdWx0ID0gVXRpbC5nZXRGb3JtYXR0ZWRWYWx1ZSh2YWx1ZSwgcHBzLmJsb2NrcywgcHBzLmJsb2Nrc0xlbmd0aCwgcHBzLmRlbGltaXRlciwgcHBzLmRlbGltaXRlcnMpO1xuXG4gICAgICAgIC8vIG5vdGhpbmcgY2hhbmdlZFxuICAgICAgICAvLyBwcmV2ZW50IHVwZGF0ZSB2YWx1ZSB0byBhdm9pZCBjYXJldCBwb3NpdGlvbiBjaGFuZ2VcbiAgICAgICAgaWYgKHByZXYgPT09IHBwcy5yZXN1bHQgJiYgcHJldiAhPT0gcHBzLnByZWZpeCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgb3duZXIudXBkYXRlVmFsdWVTdGF0ZSgpO1xuICAgIH0sXG5cbiAgICB1cGRhdGVDcmVkaXRDYXJkUHJvcHNCeVZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgdmFyIG93bmVyID0gdGhpcywgcHBzID0gb3duZXIucHJvcGVydGllcyxcbiAgICAgICAgICAgIGNyZWRpdENhcmRJbmZvO1xuXG4gICAgICAgIC8vIEF0IGxlYXN0IG9uZSBvZiB0aGUgZmlyc3QgNCBjaGFyYWN0ZXJzIGhhcyBjaGFuZ2VkXG4gICAgICAgIGlmIChVdGlsLmhlYWRTdHIocHBzLnJlc3VsdCwgNCkgPT09IFV0aWwuaGVhZFN0cih2YWx1ZSwgNCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNyZWRpdENhcmRJbmZvID0gQ3JlZGl0Q2FyZERldGVjdG9yLmdldEluZm8odmFsdWUsIHBwcy5jcmVkaXRDYXJkU3RyaWN0TW9kZSk7XG5cbiAgICAgICAgcHBzLmJsb2NrcyA9IGNyZWRpdENhcmRJbmZvLmJsb2NrcztcbiAgICAgICAgcHBzLmJsb2Nrc0xlbmd0aCA9IHBwcy5ibG9ja3MubGVuZ3RoO1xuICAgICAgICBwcHMubWF4TGVuZ3RoID0gVXRpbC5nZXRNYXhMZW5ndGgocHBzLmJsb2Nrcyk7XG5cbiAgICAgICAgLy8gY3JlZGl0IGNhcmQgdHlwZSBjaGFuZ2VkXG4gICAgICAgIGlmIChwcHMuY3JlZGl0Q2FyZFR5cGUgIT09IGNyZWRpdENhcmRJbmZvLnR5cGUpIHtcbiAgICAgICAgICAgIHBwcy5jcmVkaXRDYXJkVHlwZSA9IGNyZWRpdENhcmRJbmZvLnR5cGU7XG5cbiAgICAgICAgICAgIHBwcy5vbkNyZWRpdENhcmRUeXBlQ2hhbmdlZC5jYWxsKG93bmVyLCBwcHMuY3JlZGl0Q2FyZFR5cGUpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHVwZGF0ZVZhbHVlU3RhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dmFsdWU6IHRoaXMucHJvcGVydGllcy5yZXN1bHR9KTtcbiAgICB9LFxuXG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBvd25lciA9IHRoaXM7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHsuLi5vd25lci5zdGF0ZS5vdGhlcn1cbiAgICAgICAgICAgICAgICAgICB2YWx1ZT17b3duZXIuc3RhdGUudmFsdWV9XG4gICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXtvd25lci5vbktleURvd259XG4gICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e293bmVyLm9uQ2hhbmdlfS8+XG4gICAgICAgICk7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gd2luZG93LkNsZWF2ZSA9IENsZWF2ZTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBQcm9wcyBBc3NpZ25tZW50XG4gKlxuICogU2VwYXJhdGUgdGhpcywgc28gcmVhY3QgbW9kdWxlIGNhbiBzaGFyZSB0aGUgdXNhZ2VcbiAqL1xudmFyIERlZmF1bHRQcm9wZXJ0aWVzID0ge1xuICAgIC8vIE1heWJlIGNoYW5nZSB0byBvYmplY3QtYXNzaWduXG4gICAgLy8gZm9yIG5vdyBqdXN0IGtlZXAgaXQgYXMgc2ltcGxlXG4gICAgYXNzaWduOiBmdW5jdGlvbiAodGFyZ2V0LCBvcHRzKSB7XG4gICAgICAgIHRhcmdldCA9IHRhcmdldCB8fCB7fTtcbiAgICAgICAgb3B0cyA9IG9wdHMgfHwge307XG5cbiAgICAgICAgLy8gY3JlZGl0IGNhcmRcbiAgICAgICAgdGFyZ2V0LmNyZWRpdENhcmQgPSAhIW9wdHMuY3JlZGl0Q2FyZDtcbiAgICAgICAgdGFyZ2V0LmNyZWRpdENhcmRTdHJpY3RNb2RlID0gISFvcHRzLmNyZWRpdENhcmRTdHJpY3RNb2RlO1xuICAgICAgICB0YXJnZXQuY3JlZGl0Q2FyZFR5cGUgPSAnJztcbiAgICAgICAgdGFyZ2V0Lm9uQ3JlZGl0Q2FyZFR5cGVDaGFuZ2VkID0gb3B0cy5vbkNyZWRpdENhcmRUeXBlQ2hhbmdlZCB8fCAoZnVuY3Rpb24gKCkge30pO1xuXG4gICAgICAgIC8vIHBob25lXG4gICAgICAgIHRhcmdldC5waG9uZSA9ICEhb3B0cy5waG9uZTtcbiAgICAgICAgdGFyZ2V0LnBob25lUmVnaW9uQ29kZSA9IG9wdHMucGhvbmVSZWdpb25Db2RlIHx8ICdBVSc7XG4gICAgICAgIHRhcmdldC5waG9uZUZvcm1hdHRlciA9IHt9O1xuXG4gICAgICAgIC8vIGRhdGVcbiAgICAgICAgdGFyZ2V0LmRhdGUgPSAhIW9wdHMuZGF0ZTtcbiAgICAgICAgdGFyZ2V0LmRhdGVQYXR0ZXJuID0gb3B0cy5kYXRlUGF0dGVybiB8fCBbJ2QnLCAnbScsICdZJ107XG4gICAgICAgIHRhcmdldC5kYXRlRm9ybWF0dGVyID0ge307XG5cbiAgICAgICAgLy8gbnVtZXJhbFxuICAgICAgICB0YXJnZXQubnVtZXJhbCA9ICEhb3B0cy5udW1lcmFsO1xuICAgICAgICB0YXJnZXQubnVtZXJhbERlY2ltYWxTY2FsZSA9IG9wdHMubnVtZXJhbERlY2ltYWxTY2FsZSA+PSAwID8gb3B0cy5udW1lcmFsRGVjaW1hbFNjYWxlIDogMjtcbiAgICAgICAgdGFyZ2V0Lm51bWVyYWxEZWNpbWFsTWFyayA9IG9wdHMubnVtZXJhbERlY2ltYWxNYXJrIHx8ICcuJztcbiAgICAgICAgdGFyZ2V0Lm51bWVyYWxUaG91c2FuZHNHcm91cFN0eWxlID0gb3B0cy5udW1lcmFsVGhvdXNhbmRzR3JvdXBTdHlsZSB8fCAndGhvdXNhbmQnO1xuXG4gICAgICAgIC8vIG90aGVyc1xuICAgICAgICB0YXJnZXQubnVtZXJpY09ubHkgPSB0YXJnZXQuY3JlZGl0Q2FyZCB8fCB0YXJnZXQuZGF0ZSB8fCAhIW9wdHMubnVtZXJpY09ubHk7XG5cbiAgICAgICAgdGFyZ2V0LnVwcGVyY2FzZSA9ICEhb3B0cy51cHBlcmNhc2U7XG4gICAgICAgIHRhcmdldC5sb3dlcmNhc2UgPSAhIW9wdHMubG93ZXJjYXNlO1xuXG4gICAgICAgIHRhcmdldC5wcmVmaXggPSAodGFyZ2V0LmNyZWRpdENhcmQgfHwgdGFyZ2V0LnBob25lIHx8IHRhcmdldC5kYXRlKSA/ICcnIDogKG9wdHMucHJlZml4IHx8ICcnKTtcbiAgICAgICAgdGFyZ2V0LnByZWZpeExlbmd0aCA9IHRhcmdldC5wcmVmaXgubGVuZ3RoO1xuXG4gICAgICAgIHRhcmdldC5pbml0VmFsdWUgPSBvcHRzLmluaXRWYWx1ZSB8fCAnJztcblxuICAgICAgICB0YXJnZXQuZGVsaW1pdGVyID1cbiAgICAgICAgICAgIChvcHRzLmRlbGltaXRlciB8fCBvcHRzLmRlbGltaXRlciA9PT0gJycpID8gb3B0cy5kZWxpbWl0ZXIgOlxuICAgICAgICAgICAgICAgIChvcHRzLmRhdGUgPyAnLycgOlxuICAgICAgICAgICAgICAgICAgICAob3B0cy5udW1lcmFsID8gJywnIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIChvcHRzLnBob25lID8gJyAnIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnICcpKSk7XG4gICAgICAgIHRhcmdldC5kZWxpbWl0ZXJzID0gb3B0cy5kZWxpbWl0ZXJzIHx8IFtdO1xuXG4gICAgICAgIHRhcmdldC5ibG9ja3MgPSBvcHRzLmJsb2NrcyB8fCBbXTtcbiAgICAgICAgdGFyZ2V0LmJsb2Nrc0xlbmd0aCA9IHRhcmdldC5ibG9ja3MubGVuZ3RoO1xuXG4gICAgICAgIHRhcmdldC5tYXhMZW5ndGggPSAwO1xuXG4gICAgICAgIHRhcmdldC5iYWNrc3BhY2UgPSBmYWxzZTtcbiAgICAgICAgdGFyZ2V0LnJlc3VsdCA9ICcnO1xuXG4gICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfVxufTtcblxuaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBEZWZhdWx0UHJvcGVydGllcztcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIENyZWRpdENhcmREZXRlY3RvciA9IHtcbiAgICBibG9ja3M6IHtcbiAgICAgICAgdWF0cDogICAgICAgICAgWzQsIDUsIDZdLFxuICAgICAgICBhbWV4OiAgICAgICAgICBbNCwgNiwgNV0sXG4gICAgICAgIGRpbmVyczogICAgICAgIFs0LCA2LCA0XSxcbiAgICAgICAgZGlzY292ZXI6ICAgICAgWzQsIDQsIDQsIDRdLFxuICAgICAgICBtYXN0ZXJjYXJkOiAgICBbNCwgNCwgNCwgNF0sXG4gICAgICAgIGRhbmtvcnQ6ICAgICAgIFs0LCA0LCA0LCA0XSxcbiAgICAgICAgaW5zdGFwYXltZW50OiAgWzQsIDQsIDQsIDRdLFxuICAgICAgICBqY2I6ICAgICAgICAgICBbNCwgNCwgNCwgNF0sXG4gICAgICAgIG1hZXN0cm86ICAgICAgIFs0LCA0LCA0LCA0XSxcbiAgICAgICAgdmlzYTogICAgICAgICAgWzQsIDQsIDQsIDRdLFxuICAgICAgICBnZW5lcmFsTG9vc2U6ICBbNCwgNCwgNCwgNF0sXG4gICAgICAgIGdlbmVyYWxTdHJpY3Q6IFs0LCA0LCA0LCA3XVxuICAgIH0sXG5cbiAgICByZToge1xuICAgICAgICAvLyBzdGFydHMgd2l0aCAxOyAxNSBkaWdpdHMsIG5vdCBzdGFydHMgd2l0aCAxODAwIChqY2IgY2FyZClcbiAgICAgICAgdWF0cDogL14oPyExODAwKTFcXGR7MCwxNH0vLFxuXG4gICAgICAgIC8vIHN0YXJ0cyB3aXRoIDM0LzM3OyAxNSBkaWdpdHNcbiAgICAgICAgYW1leDogL14zWzQ3XVxcZHswLDEzfS8sXG5cbiAgICAgICAgLy8gc3RhcnRzIHdpdGggNjAxMS82NS82NDQtNjQ5OyAxNiBkaWdpdHNcbiAgICAgICAgZGlzY292ZXI6IC9eKD86NjAxMXw2NVxcZHswLDJ9fDY0WzQtOV1cXGQ/KVxcZHswLDEyfS8sXG5cbiAgICAgICAgLy8gc3RhcnRzIHdpdGggMzAwLTMwNS8zMDkgb3IgMzYvMzgvMzk7IDE0IGRpZ2l0c1xuICAgICAgICBkaW5lcnM6IC9eMyg/OjAoWzAtNV18OSl8WzY4OV1cXGQ/KVxcZHswLDExfS8sXG5cbiAgICAgICAgLy8gc3RhcnRzIHdpdGggNTEtNTUvMjItMjc7IDE2IGRpZ2l0c1xuICAgICAgICBtYXN0ZXJjYXJkOiAvXig1WzEtNV18MlsyLTddKVxcZHswLDE0fS8sXG5cbiAgICAgICAgLy8gc3RhcnRzIHdpdGggNTAxOS80MTc1LzQ1NzE7IDE2IGRpZ2l0c1xuICAgICAgICBkYW5rb3J0OiAvXig1MDE5fDQxNzV8NDU3MSlcXGR7MCwxMn0vLFxuXG4gICAgICAgIC8vIHN0YXJ0cyB3aXRoIDYzNy02Mzk7IDE2IGRpZ2l0c1xuICAgICAgICBpbnN0YXBheW1lbnQ6IC9eNjNbNy05XVxcZHswLDEzfS8sXG5cbiAgICAgICAgLy8gc3RhcnRzIHdpdGggMjEzMS8xODAwLzM1OyAxNiBkaWdpdHNcbiAgICAgICAgamNiOiAvXig/OjIxMzF8MTgwMHwzNVxcZHswLDJ9KVxcZHswLDEyfS8sXG5cbiAgICAgICAgLy8gc3RhcnRzIHdpdGggNTAvNTYtNTgvNjMwNC82NzsgMTYgZGlnaXRzXG4gICAgICAgIG1hZXN0cm86IC9eKD86NVswNjc4XVxcZHswLDJ9fDYzMDR8NjdcXGR7MCwyfSlcXGR7MCwxMn0vLFxuXG4gICAgICAgIC8vIHN0YXJ0cyB3aXRoIDQ7IDE2IGRpZ2l0c1xuICAgICAgICB2aXNhOiAvXjRcXGR7MCwxNX0vXG4gICAgfSxcblxuICAgIGdldEluZm86IGZ1bmN0aW9uICh2YWx1ZSwgc3RyaWN0TW9kZSkge1xuICAgICAgICB2YXIgYmxvY2tzID0gQ3JlZGl0Q2FyZERldGVjdG9yLmJsb2NrcyxcbiAgICAgICAgICAgIHJlID0gQ3JlZGl0Q2FyZERldGVjdG9yLnJlO1xuXG4gICAgICAgIC8vIEluIHRoZW9yeSwgdmlzYSBjcmVkaXQgY2FyZCBjYW4gaGF2ZSB1cCB0byAxOSBkaWdpdHMgbnVtYmVyLlxuICAgICAgICAvLyBTZXQgc3RyaWN0TW9kZSB0byB0cnVlIHdpbGwgcmVtb3ZlIHRoZSAxNiBtYXgtbGVuZ3RoIHJlc3RyYWluLFxuICAgICAgICAvLyBob3dldmVyLCBJIG5ldmVyIGZvdW5kIGFueSB3ZWJzaXRlIHZhbGlkYXRlIGNhcmQgbnVtYmVyIGxpa2VcbiAgICAgICAgLy8gdGhpcywgaGVuY2UgcHJvYmFibHkgeW91IGRvbid0IG5lZWQgdG8gZW5hYmxlIHRoaXMgb3B0aW9uLlxuICAgICAgICBzdHJpY3RNb2RlID0gISFzdHJpY3RNb2RlO1xuXG4gICAgICAgIGlmIChyZS5hbWV4LnRlc3QodmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHR5cGU6ICAgJ2FtZXgnLFxuICAgICAgICAgICAgICAgIGJsb2NrczogYmxvY2tzLmFtZXhcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSBpZiAocmUudWF0cC50ZXN0KHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0eXBlOiAgICd1YXRwJyxcbiAgICAgICAgICAgICAgICBibG9ja3M6IGJsb2Nrcy51YXRwXG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2UgaWYgKHJlLmRpbmVycy50ZXN0KHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0eXBlOiAgICdkaW5lcnMnLFxuICAgICAgICAgICAgICAgIGJsb2NrczogYmxvY2tzLmRpbmVyc1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIGlmIChyZS5kaXNjb3Zlci50ZXN0KHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0eXBlOiAgICdkaXNjb3ZlcicsXG4gICAgICAgICAgICAgICAgYmxvY2tzOiBibG9ja3MuZGlzY292ZXJcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSBpZiAocmUubWFzdGVyY2FyZC50ZXN0KHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0eXBlOiAgICdtYXN0ZXJjYXJkJyxcbiAgICAgICAgICAgICAgICBibG9ja3M6IGJsb2Nrcy5tYXN0ZXJjYXJkXG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2UgaWYgKHJlLmRhbmtvcnQudGVzdCh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdHlwZTogICAnZGFua29ydCcsXG4gICAgICAgICAgICAgICAgYmxvY2tzOiBibG9ja3MuZGFua29ydFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIGlmIChyZS5pbnN0YXBheW1lbnQudGVzdCh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdHlwZTogICAnaW5zdGFwYXltZW50JyxcbiAgICAgICAgICAgICAgICBibG9ja3M6IGJsb2Nrcy5pbnN0YXBheW1lbnRcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSBpZiAocmUuamNiLnRlc3QodmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHR5cGU6ICAgJ2pjYicsXG4gICAgICAgICAgICAgICAgYmxvY2tzOiBibG9ja3MuamNiXG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2UgaWYgKHJlLm1hZXN0cm8udGVzdCh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdHlwZTogICAnbWFlc3RybycsXG4gICAgICAgICAgICAgICAgYmxvY2tzOiBibG9ja3MubWFlc3Ryb1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIGlmIChyZS52aXNhLnRlc3QodmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHR5cGU6ICAgJ3Zpc2EnLFxuICAgICAgICAgICAgICAgIGJsb2NrczogYmxvY2tzLnZpc2FcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSBpZiAoc3RyaWN0TW9kZSkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0eXBlOiAgICd1bmtub3duJyxcbiAgICAgICAgICAgICAgICBibG9ja3M6IGJsb2Nrcy5nZW5lcmFsU3RyaWN0XG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0eXBlOiAgICd1bmtub3duJyxcbiAgICAgICAgICAgICAgICBibG9ja3M6IGJsb2Nrcy5nZW5lcmFsTG9vc2VcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5pZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IENyZWRpdENhcmREZXRlY3Rvcjtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIERhdGVGb3JtYXR0ZXIgPSBmdW5jdGlvbiAoZGF0ZVBhdHRlcm4pIHtcbiAgICB2YXIgb3duZXIgPSB0aGlzO1xuXG4gICAgb3duZXIuYmxvY2tzID0gW107XG4gICAgb3duZXIuZGF0ZVBhdHRlcm4gPSBkYXRlUGF0dGVybjtcbiAgICBvd25lci5pbml0QmxvY2tzKCk7XG59O1xuXG5EYXRlRm9ybWF0dGVyLnByb3RvdHlwZSA9IHtcbiAgICBpbml0QmxvY2tzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBvd25lciA9IHRoaXM7XG4gICAgICAgIG93bmVyLmRhdGVQYXR0ZXJuLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICBpZiAodmFsdWUgPT09ICdZJykge1xuICAgICAgICAgICAgICAgIG93bmVyLmJsb2Nrcy5wdXNoKDQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBvd25lci5ibG9ja3MucHVzaCgyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIGdldEJsb2NrczogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ibG9ja3M7XG4gICAgfSxcblxuICAgIGdldFZhbGlkYXRlZERhdGU6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICB2YXIgb3duZXIgPSB0aGlzLCByZXN1bHQgPSAnJztcblxuICAgICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL1teXFxkXS9nLCAnJyk7XG5cbiAgICAgICAgb3duZXIuYmxvY2tzLmZvckVhY2goZnVuY3Rpb24gKGxlbmd0aCwgaW5kZXgpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgdmFyIHN1YiA9IHZhbHVlLnNsaWNlKDAsIGxlbmd0aCksXG4gICAgICAgICAgICAgICAgICAgIHN1YjAgPSBzdWIuc2xpY2UoMCwgMSksXG4gICAgICAgICAgICAgICAgICAgIHJlc3QgPSB2YWx1ZS5zbGljZShsZW5ndGgpO1xuXG4gICAgICAgICAgICAgICAgc3dpdGNoIChvd25lci5kYXRlUGF0dGVybltpbmRleF0pIHtcbiAgICAgICAgICAgICAgICBjYXNlICdkJzpcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN1YiA9PT0gJzAwJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3ViID0gJzAxJztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwYXJzZUludChzdWIwLCAxMCkgPiAzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWIgPSAnMCcgKyBzdWIwO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBhcnNlSW50KHN1YiwgMTApID4gMzEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YiA9ICczMSc7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ20nOlxuICAgICAgICAgICAgICAgICAgICBpZiAoc3ViID09PSAnMDAnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWIgPSAnMDEnO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBhcnNlSW50KHN1YjAsIDEwKSA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YiA9ICcwJyArIHN1YjA7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocGFyc2VJbnQoc3ViLCAxMCkgPiAxMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3ViID0gJzEyJztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJlc3VsdCArPSBzdWI7XG5cbiAgICAgICAgICAgICAgICAvLyB1cGRhdGUgcmVtYWluaW5nIHN0cmluZ1xuICAgICAgICAgICAgICAgIHZhbHVlID0gcmVzdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG59O1xuXG5pZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IERhdGVGb3JtYXR0ZXI7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBOdW1lcmFsRm9ybWF0dGVyID0gZnVuY3Rpb24gKG51bWVyYWxEZWNpbWFsTWFyayxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bWVyYWxEZWNpbWFsU2NhbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudW1lcmFsVGhvdXNhbmRzR3JvdXBTdHlsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGltaXRlcikge1xuICAgIHZhciBvd25lciA9IHRoaXM7XG5cbiAgICBvd25lci5udW1lcmFsRGVjaW1hbE1hcmsgPSBudW1lcmFsRGVjaW1hbE1hcmsgfHwgJy4nO1xuICAgIG93bmVyLm51bWVyYWxEZWNpbWFsU2NhbGUgPSBudW1lcmFsRGVjaW1hbFNjYWxlID49IDAgPyBudW1lcmFsRGVjaW1hbFNjYWxlIDogMjtcbiAgICBvd25lci5udW1lcmFsVGhvdXNhbmRzR3JvdXBTdHlsZSA9IG51bWVyYWxUaG91c2FuZHNHcm91cFN0eWxlIHx8IE51bWVyYWxGb3JtYXR0ZXIuZ3JvdXBTdHlsZS50aG91c2FuZDtcbiAgICBvd25lci5kZWxpbWl0ZXIgPSAoZGVsaW1pdGVyIHx8IGRlbGltaXRlciA9PT0gJycpID8gZGVsaW1pdGVyIDogJywnO1xuICAgIG93bmVyLmRlbGltaXRlclJFID0gZGVsaW1pdGVyID8gbmV3IFJlZ0V4cCgnXFxcXCcgKyBkZWxpbWl0ZXIsICdnJykgOiAnJztcbn07XG5cbk51bWVyYWxGb3JtYXR0ZXIuZ3JvdXBTdHlsZSA9IHtcbiAgICB0aG91c2FuZDogJ3Rob3VzYW5kJyxcbiAgICBsYWtoOiAgICAgJ2xha2gnLFxuICAgIHdhbjogICAgICAnd2FuJ1xufTtcblxuTnVtZXJhbEZvcm1hdHRlci5wcm90b3R5cGUgPSB7XG4gICAgZ2V0UmF3VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdmFsdWUucmVwbGFjZSh0aGlzLmRlbGltaXRlclJFLCAnJykucmVwbGFjZSh0aGlzLm51bWVyYWxEZWNpbWFsTWFyaywgJy4nKTtcbiAgICB9LFxuXG4gICAgZm9ybWF0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgdmFyIG93bmVyID0gdGhpcywgcGFydHMsIHBhcnRJbnRlZ2VyLCBwYXJ0RGVjaW1hbCA9ICcnO1xuXG4gICAgICAgIC8vIHN0cmlwIGFscGhhYmV0IGxldHRlcnNcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9bQS1aYS16XS9nLCAnJylcbiAgICAgICAgICAgIC8vIHJlcGxhY2UgdGhlIGZpcnN0IGRlY2ltYWwgbWFyayB3aXRoIHJlc2VydmVkIHBsYWNlaG9sZGVyXG4gICAgICAgICAgICAucmVwbGFjZShvd25lci5udW1lcmFsRGVjaW1hbE1hcmssICdNJylcblxuICAgICAgICAgICAgLy8gcmVwbGFjZSB0aGUgZmlyc3QgbWludXMgc2lnbiByZXNlcnZlZCBwbGFjZWhvbGRlclxuICAgICAgICAgICAgLnJlcGxhY2UoL15cXC0vLCAnTicpXG5cbiAgICAgICAgICAgIC8vIHN0cmlwIHRoZSBub24gbnVtZXJpYyBsZXR0ZXJzIGV4Y2VwdCB0aGUgbWludXMgc2lnbiBhbmQgZGVjaW1hbCBwbGFjZWhvbGRlclxuICAgICAgICAgICAgLnJlcGxhY2UoL1teXFxkTU5dL2csICcnKVxuXG4gICAgICAgICAgICAvLyByZXBsYWNlIHRoZSBtaW51cyBzaWduIChpZiBwcmVzZW50KVxuICAgICAgICAgICAgLnJlcGxhY2UoJ04nLCAnLScpXG5cbiAgICAgICAgICAgIC8vIHJlcGxhY2UgZGVjaW1hbCBtYXJrXG4gICAgICAgICAgICAucmVwbGFjZSgnTScsIG93bmVyLm51bWVyYWxEZWNpbWFsTWFyaylcblxuICAgICAgICAgICAgLy8gc3RyaXAgYW55IGxlYWRpbmcgemVyb3NcbiAgICAgICAgICAgIC5yZXBsYWNlKC9eKC0pPzArKD89XFxkKS8sICckMScpO1xuXG4gICAgICAgIHBhcnRJbnRlZ2VyID0gdmFsdWU7XG5cbiAgICAgICAgaWYgKHZhbHVlLmluZGV4T2Yob3duZXIubnVtZXJhbERlY2ltYWxNYXJrKSA+PSAwKSB7XG4gICAgICAgICAgICBwYXJ0cyA9IHZhbHVlLnNwbGl0KG93bmVyLm51bWVyYWxEZWNpbWFsTWFyayk7XG4gICAgICAgICAgICBwYXJ0SW50ZWdlciA9IHBhcnRzWzBdO1xuICAgICAgICAgICAgcGFydERlY2ltYWwgPSBvd25lci5udW1lcmFsRGVjaW1hbE1hcmsgKyBwYXJ0c1sxXS5zbGljZSgwLCBvd25lci5udW1lcmFsRGVjaW1hbFNjYWxlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXRjaCAob3duZXIubnVtZXJhbFRob3VzYW5kc0dyb3VwU3R5bGUpIHtcbiAgICAgICAgY2FzZSBOdW1lcmFsRm9ybWF0dGVyLmdyb3VwU3R5bGUubGFraDpcbiAgICAgICAgICAgIHBhcnRJbnRlZ2VyID0gcGFydEludGVnZXIucmVwbGFjZSgvKFxcZCkoPz0oXFxkXFxkKStcXGQkKS9nLCAnJDEnICsgb3duZXIuZGVsaW1pdGVyKTtcblxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBOdW1lcmFsRm9ybWF0dGVyLmdyb3VwU3R5bGUud2FuOlxuICAgICAgICAgICAgcGFydEludGVnZXIgPSBwYXJ0SW50ZWdlci5yZXBsYWNlKC8oXFxkKSg/PShcXGR7NH0pKyQpL2csICckMScgKyBvd25lci5kZWxpbWl0ZXIpO1xuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcGFydEludGVnZXIgPSBwYXJ0SW50ZWdlci5yZXBsYWNlKC8oXFxkKSg/PShcXGR7M30pKyQpL2csICckMScgKyBvd25lci5kZWxpbWl0ZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHBhcnRJbnRlZ2VyLnRvU3RyaW5nKCkgKyAob3duZXIubnVtZXJhbERlY2ltYWxTY2FsZSA+IDAgPyBwYXJ0RGVjaW1hbC50b1N0cmluZygpIDogJycpO1xuICAgIH1cbn07XG5cbmlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gTnVtZXJhbEZvcm1hdHRlcjtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIFBob25lRm9ybWF0dGVyID0gZnVuY3Rpb24gKGZvcm1hdHRlciwgZGVsaW1pdGVyKSB7XG4gICAgdmFyIG93bmVyID0gdGhpcztcblxuICAgIG93bmVyLmRlbGltaXRlciA9IChkZWxpbWl0ZXIgfHwgZGVsaW1pdGVyID09PSAnJykgPyBkZWxpbWl0ZXIgOiAnICc7XG4gICAgb3duZXIuZGVsaW1pdGVyUkUgPSBkZWxpbWl0ZXIgPyBuZXcgUmVnRXhwKCdcXFxcJyArIGRlbGltaXRlciwgJ2cnKSA6ICcnO1xuXG4gICAgb3duZXIuZm9ybWF0dGVyID0gZm9ybWF0dGVyO1xufTtcblxuUGhvbmVGb3JtYXR0ZXIucHJvdG90eXBlID0ge1xuICAgIHNldEZvcm1hdHRlcjogZnVuY3Rpb24gKGZvcm1hdHRlcikge1xuICAgICAgICB0aGlzLmZvcm1hdHRlciA9IGZvcm1hdHRlcjtcbiAgICB9LFxuXG4gICAgZm9ybWF0OiBmdW5jdGlvbiAocGhvbmVOdW1iZXIpIHtcbiAgICAgICAgdmFyIG93bmVyID0gdGhpcztcblxuICAgICAgICBvd25lci5mb3JtYXR0ZXIuY2xlYXIoKTtcblxuICAgICAgICAvLyBvbmx5IGtlZXAgbnVtYmVyIGFuZCArXG4gICAgICAgIHBob25lTnVtYmVyID0gcGhvbmVOdW1iZXIucmVwbGFjZSgvW15cXGQrXS9nLCAnJyk7XG5cbiAgICAgICAgLy8gc3RyaXAgZGVsaW1pdGVyXG4gICAgICAgIHBob25lTnVtYmVyID0gcGhvbmVOdW1iZXIucmVwbGFjZShvd25lci5kZWxpbWl0ZXJSRSwgJycpO1xuXG4gICAgICAgIHZhciByZXN1bHQgPSAnJywgY3VycmVudCwgdmFsaWRhdGVkID0gZmFsc2U7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGlNYXggPSBwaG9uZU51bWJlci5sZW5ndGg7IGkgPCBpTWF4OyBpKyspIHtcbiAgICAgICAgICAgIGN1cnJlbnQgPSBvd25lci5mb3JtYXR0ZXIuaW5wdXREaWdpdChwaG9uZU51bWJlci5jaGFyQXQoaSkpO1xuXG4gICAgICAgICAgICAvLyBoYXMgKCktIG9yIHNwYWNlIGluc2lkZVxuICAgICAgICAgICAgaWYgKC9bXFxzKCktXS9nLnRlc3QoY3VycmVudCkpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBjdXJyZW50O1xuXG4gICAgICAgICAgICAgICAgdmFsaWRhdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKCF2YWxpZGF0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gY3VycmVudDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gZWxzZTogb3ZlciBsZW5ndGggaW5wdXRcbiAgICAgICAgICAgICAgICAvLyBpdCB0dXJucyB0byBpbnZhbGlkIG51bWJlciBhZ2FpblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gc3RyaXAgKClcbiAgICAgICAgLy8gZS5nLiBVUzogNzE2MTIzNDU2NyByZXR1cm5zICg3MTYpIDEyMy00NTY3XG4gICAgICAgIHJlc3VsdCA9IHJlc3VsdC5yZXBsYWNlKC9bKCldL2csICcnKTtcbiAgICAgICAgLy8gcmVwbGFjZSBsaWJyYXJ5IGRlbGltaXRlciB3aXRoIHVzZXIgY3VzdG9taXplZCBkZWxpbWl0ZXJcbiAgICAgICAgcmVzdWx0ID0gcmVzdWx0LnJlcGxhY2UoL1tcXHMtXS9nLCBvd25lci5kZWxpbWl0ZXIpO1xuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxufTtcblxuaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBQaG9uZUZvcm1hdHRlcjtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIFV0aWwgPSB7XG4gICAgbm9vcDogZnVuY3Rpb24gKCkge1xuICAgIH0sXG5cbiAgICBzdHJpcDogZnVuY3Rpb24gKHZhbHVlLCByZSkge1xuICAgICAgICByZXR1cm4gdmFsdWUucmVwbGFjZShyZSwgJycpO1xuICAgIH0sXG5cbiAgICBpc0RlbGltaXRlcjogZnVuY3Rpb24gKGxldHRlciwgZGVsaW1pdGVyLCBkZWxpbWl0ZXJzKSB7XG4gICAgICAgIC8vIHNpbmdsZSBkZWxpbWl0ZXJcbiAgICAgICAgaWYgKGRlbGltaXRlcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gbGV0dGVyID09PSBkZWxpbWl0ZXI7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBtdWx0aXBsZSBkZWxpbWl0ZXJzXG4gICAgICAgIHJldHVybiBkZWxpbWl0ZXJzLnNvbWUoZnVuY3Rpb24gKGN1cnJlbnQpIHtcbiAgICAgICAgICAgIGlmIChsZXR0ZXIgPT09IGN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIHN0cmlwRGVsaW1pdGVyczogZnVuY3Rpb24gKHZhbHVlLCBkZWxpbWl0ZXIsIGRlbGltaXRlcnMpIHtcbiAgICAgICAgLy8gc2luZ2xlIGRlbGltaXRlclxuICAgICAgICBpZiAoZGVsaW1pdGVycy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHZhciBkZWxpbWl0ZXJSRSA9IGRlbGltaXRlciA/IG5ldyBSZWdFeHAoJ1xcXFwnICsgZGVsaW1pdGVyLCAnZycpIDogJyc7XG5cbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS5yZXBsYWNlKGRlbGltaXRlclJFLCAnJyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBtdWx0aXBsZSBkZWxpbWl0ZXJzXG4gICAgICAgIGRlbGltaXRlcnMuZm9yRWFjaChmdW5jdGlvbiAoY3VycmVudCkge1xuICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKG5ldyBSZWdFeHAoJ1xcXFwnICsgY3VycmVudCwgJ2cnKSwgJycpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfSxcblxuICAgIGhlYWRTdHI6IGZ1bmN0aW9uIChzdHIsIGxlbmd0aCkge1xuICAgICAgICByZXR1cm4gc3RyLnNsaWNlKDAsIGxlbmd0aCk7XG4gICAgfSxcblxuICAgIGdldE1heExlbmd0aDogZnVuY3Rpb24gKGJsb2Nrcykge1xuICAgICAgICByZXR1cm4gYmxvY2tzLnJlZHVjZShmdW5jdGlvbiAocHJldmlvdXMsIGN1cnJlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBwcmV2aW91cyArIGN1cnJlbnQ7XG4gICAgICAgIH0sIDApO1xuICAgIH0sXG5cbiAgICAvLyBzdHJpcCB2YWx1ZSBieSBwcmVmaXggbGVuZ3RoXG4gICAgLy8gZm9yIHByZWZpeDogUFJFXG4gICAgLy8gKFBSRTEyMywgMykgLT4gMTIzXG4gICAgLy8gKFBSMTIzLCAzKSAtPiAyMyB0aGlzIGhhcHBlbnMgd2hlbiB1c2VyIGhpdHMgYmFja3NwYWNlIGluIGZyb250IG9mIFwiUFJFXCJcbiAgICBnZXRQcmVmaXhTdHJpcHBlZFZhbHVlOiBmdW5jdGlvbiAodmFsdWUsIHByZWZpeExlbmd0aCkge1xuICAgICAgICByZXR1cm4gdmFsdWUuc2xpY2UocHJlZml4TGVuZ3RoKTtcbiAgICB9LFxuXG4gICAgZ2V0Rm9ybWF0dGVkVmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSwgYmxvY2tzLCBibG9ja3NMZW5ndGgsIGRlbGltaXRlciwgZGVsaW1pdGVycykge1xuICAgICAgICB2YXIgcmVzdWx0ID0gJycsXG4gICAgICAgICAgICBtdWx0aXBsZURlbGltaXRlcnMgPSBkZWxpbWl0ZXJzLmxlbmd0aCA+IDAsXG4gICAgICAgICAgICBjdXJyZW50RGVsaW1pdGVyO1xuXG4gICAgICAgIGJsb2Nrcy5mb3JFYWNoKGZ1bmN0aW9uIChsZW5ndGgsIGluZGV4KSB7XG4gICAgICAgICAgICBpZiAodmFsdWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHZhciBzdWIgPSB2YWx1ZS5zbGljZSgwLCBsZW5ndGgpLFxuICAgICAgICAgICAgICAgICAgICByZXN0ID0gdmFsdWUuc2xpY2UobGVuZ3RoKTtcblxuICAgICAgICAgICAgICAgIHJlc3VsdCArPSBzdWI7XG5cbiAgICAgICAgICAgICAgICBjdXJyZW50RGVsaW1pdGVyID0gbXVsdGlwbGVEZWxpbWl0ZXJzID8gKGRlbGltaXRlcnNbaW5kZXhdIHx8IGN1cnJlbnREZWxpbWl0ZXIpIDogZGVsaW1pdGVyO1xuXG4gICAgICAgICAgICAgICAgaWYgKHN1Yi5sZW5ndGggPT09IGxlbmd0aCAmJiBpbmRleCA8IGJsb2Nrc0xlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IGN1cnJlbnREZWxpbWl0ZXI7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gdXBkYXRlIHJlbWFpbmluZyBzdHJpbmdcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHJlc3Q7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxufTtcblxuaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBVdGlsO1xufVxuIl19
