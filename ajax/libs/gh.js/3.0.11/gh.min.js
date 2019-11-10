"use strict";

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}var _createClass = function () {
  function e(e, t) {
    for (var r = 0; r < t.length; r++) {
      var n = t[r];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
    }
  }return function (t, r, n) {
    return r && e(t.prototype, r), n && e(t, n), t;
  };
}(),
    _typeof = "function" == typeof Symbol && "symbol" == _typeof2(Symbol.iterator) ? function (e) {
  return typeof e === "undefined" ? "undefined" : _typeof2(e);
} : function (e) {
  return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof2(e);
};!function (e) {
  if ("object" === ("undefined" == typeof exports ? "undefined" : _typeof(exports)) && "undefined" != typeof module) module.exports = e();else if ("function" == typeof define && define.amd) define([], e);else {
    var t;t = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, t.GitHub = e();
  }
}(function () {
  var e;return function t(e, r, n) {
    function i(s, a) {
      if (!r[s]) {
        if (!e[s]) {
          var u = "function" == typeof require && require;if (!a && u) return u(s, !0);if (o) return o(s, !0);var f = new Error("Cannot find module '" + s + "'");throw f.code = "MODULE_NOT_FOUND", f;
        }var h = r[s] = { exports: {} };e[s][0].call(h.exports, function (t) {
          var r = e[s][1][t];return i(r ? r : t);
        }, h, h.exports, t, e, r, n);
      }return r[s].exports;
    }for (var o = "function" == typeof require && require, s = 0; s < n.length; s++) {
      i(n[s]);
    }return i;
  }({ 1: [function (e, t, r) {
      function n() {
        for (var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", t = 0, r = e.length; r > t; ++t) {
          u[t] = e[t], f[e.charCodeAt(t)] = t;
        }f["-".charCodeAt(0)] = 62, f["_".charCodeAt(0)] = 63;
      }function i(e) {
        var t,
            r,
            n,
            i,
            o,
            s,
            a = e.length;if (a % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");o = "=" === e[a - 2] ? 2 : "=" === e[a - 1] ? 1 : 0, s = new h(3 * a / 4 - o), n = o > 0 ? a - 4 : a;var u = 0;for (t = 0, r = 0; n > t; t += 4, r += 3) {
          i = f[e.charCodeAt(t)] << 18 | f[e.charCodeAt(t + 1)] << 12 | f[e.charCodeAt(t + 2)] << 6 | f[e.charCodeAt(t + 3)], s[u++] = i >> 16 & 255, s[u++] = i >> 8 & 255, s[u++] = 255 & i;
        }return 2 === o ? (i = f[e.charCodeAt(t)] << 2 | f[e.charCodeAt(t + 1)] >> 4, s[u++] = 255 & i) : 1 === o && (i = f[e.charCodeAt(t)] << 10 | f[e.charCodeAt(t + 1)] << 4 | f[e.charCodeAt(t + 2)] >> 2, s[u++] = i >> 8 & 255, s[u++] = 255 & i), s;
      }function o(e) {
        return u[e >> 18 & 63] + u[e >> 12 & 63] + u[e >> 6 & 63] + u[63 & e];
      }function s(e, t, r) {
        for (var n, i = [], s = t; r > s; s += 3) {
          n = (e[s] << 16) + (e[s + 1] << 8) + e[s + 2], i.push(o(n));
        }return i.join("");
      }function a(e) {
        for (var t, r = e.length, n = r % 3, i = "", o = [], a = 16383, f = 0, h = r - n; h > f; f += a) {
          o.push(s(e, f, f + a > h ? h : f + a));
        }return 1 === n ? (t = e[r - 1], i += u[t >> 2], i += u[t << 4 & 63], i += "==") : 2 === n && (t = (e[r - 2] << 8) + e[r - 1], i += u[t >> 10], i += u[t >> 4 & 63], i += u[t << 2 & 63], i += "="), o.push(i), o.join("");
      }r.toByteArray = i, r.fromByteArray = a;var u = [],
          f = [],
          h = "undefined" != typeof Uint8Array ? Uint8Array : Array;n();
    }, {}], 2: [function () {}, {}], 3: [function (e, t, r) {
      (function (t) {
        function n() {
          try {
            var e = new Uint8Array(1);return e.foo = function () {
              return 42;
            }, 42 === e.foo() && "function" == typeof e.subarray && 0 === e.subarray(1, 1).byteLength;
          } catch (t) {
            return !1;
          }
        }function i() {
          return o.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
        }function o(e) {
          return this instanceof o ? (o.TYPED_ARRAY_SUPPORT || (this.length = 0, this.parent = void 0), "number" == typeof e ? s(this, e) : "string" == typeof e ? a(this, e, arguments.length > 1 ? arguments[1] : "utf8") : u(this, e)) : arguments.length > 1 ? new o(e, arguments[1]) : new o(e);
        }function s(e, t) {
          if (e = g(e, 0 > t ? 0 : 0 | y(t)), !o.TYPED_ARRAY_SUPPORT) for (var r = 0; t > r; r++) {
            e[r] = 0;
          }return e;
        }function a(e, t, r) {
          ("string" != typeof r || "" === r) && (r = "utf8");var n = 0 | m(t, r);return e = g(e, n), e.write(t, r), e;
        }function u(e, t) {
          if (o.isBuffer(t)) return f(e, t);if ($(t)) return h(e, t);if (null == t) throw new TypeError("must start with number, buffer, array or string");if ("undefined" != typeof ArrayBuffer) {
            if (t.buffer instanceof ArrayBuffer) return c(e, t);if (t instanceof ArrayBuffer) return l(e, t);
          }return t.length ? p(e, t) : d(e, t);
        }function f(e, t) {
          var r = 0 | y(t.length);return e = g(e, r), t.copy(e, 0, 0, r), e;
        }function h(e, t) {
          var r = 0 | y(t.length);e = g(e, r);for (var n = 0; r > n; n += 1) {
            e[n] = 255 & t[n];
          }return e;
        }function c(e, t) {
          var r = 0 | y(t.length);e = g(e, r);for (var n = 0; r > n; n += 1) {
            e[n] = 255 & t[n];
          }return e;
        }function l(e, t) {
          return t.byteLength, o.TYPED_ARRAY_SUPPORT ? (e = new Uint8Array(t), e.__proto__ = o.prototype) : e = c(e, new Uint8Array(t)), e;
        }function p(e, t) {
          var r = 0 | y(t.length);e = g(e, r);for (var n = 0; r > n; n += 1) {
            e[n] = 255 & t[n];
          }return e;
        }function d(e, t) {
          var r,
              n = 0;"Buffer" === t.type && $(t.data) && (r = t.data, n = 0 | y(r.length)), e = g(e, n);for (var i = 0; n > i; i += 1) {
            e[i] = 255 & r[i];
          }return e;
        }function g(e, t) {
          o.TYPED_ARRAY_SUPPORT ? (e = new Uint8Array(t), e.__proto__ = o.prototype) : e.length = t;var r = 0 !== t && t <= o.poolSize >>> 1;return r && (e.parent = J), e;
        }function y(e) {
          if (e >= i()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + i().toString(16) + " bytes");return 0 | e;
        }function v(e, t) {
          if (!(this instanceof v)) return new v(e, t);var r = new o(e, t);return delete r.parent, r;
        }function m(e, t) {
          "string" != typeof e && (e = "" + e);var r = e.length;if (0 === r) return 0;for (var n = !1;;) {
            switch (t) {case "ascii":case "binary":case "raw":case "raws":
                return r;case "utf8":case "utf-8":
                return F(e).length;case "ucs2":case "ucs-2":case "utf16le":case "utf-16le":
                return 2 * r;case "hex":
                return r >>> 1;case "base64":
                return G(e).length;default:
                if (n) return F(e).length;t = ("" + t).toLowerCase(), n = !0;}
          }
        }function b(e, t, r) {
          var n = !1;if (t = 0 | t, r = void 0 === r || r === 1 / 0 ? this.length : 0 | r, e || (e = "utf8"), 0 > t && (t = 0), r > this.length && (r = this.length), t >= r) return "";for (;;) {
            switch (e) {case "hex":
                return L(this, t, r);case "utf8":case "utf-8":
                return C(this, t, r);case "ascii":
                return k(this, t, r);case "binary":
                return O(this, t, r);case "base64":
                return A(this, t, r);case "ucs2":case "ucs-2":case "utf16le":case "utf-16le":
                return j(this, t, r);default:
                if (n) throw new TypeError("Unknown encoding: " + e);e = (e + "").toLowerCase(), n = !0;}
          }
        }function w(e, t, r, n) {
          r = Number(r) || 0;var i = e.length - r;n ? (n = Number(n), n > i && (n = i)) : n = i;var o = t.length;if (o % 2 !== 0) throw new Error("Invalid hex string");n > o / 2 && (n = o / 2);for (var s = 0; n > s; s++) {
            var a = parseInt(t.substr(2 * s, 2), 16);if (isNaN(a)) throw new Error("Invalid hex string");e[r + s] = a;
          }return s;
        }function _(e, t, r, n) {
          return X(F(t, e.length - r), e, r, n);
        }function R(e, t, r, n) {
          return X(W(t), e, r, n);
        }function E(e, t, r, n) {
          return R(e, t, r, n);
        }function S(e, t, r, n) {
          return X(G(t), e, r, n);
        }function x(e, t, r, n) {
          return X(z(t, e.length - r), e, r, n);
        }function A(e, t, r) {
          return K.fromByteArray(0 === t && r === e.length ? e : e.slice(t, r));
        }function C(e, t, r) {
          r = Math.min(e.length, r);for (var n = [], i = t; r > i;) {
            var o = e[i],
                s = null,
                a = o > 239 ? 4 : o > 223 ? 3 : o > 191 ? 2 : 1;if (r >= i + a) {
              var u, f, h, c;switch (a) {case 1:
                  128 > o && (s = o);break;case 2:
                  u = e[i + 1], 128 === (192 & u) && (c = (31 & o) << 6 | 63 & u, c > 127 && (s = c));break;case 3:
                  u = e[i + 1], f = e[i + 2], 128 === (192 & u) && 128 === (192 & f) && (c = (15 & o) << 12 | (63 & u) << 6 | 63 & f, c > 2047 && (55296 > c || c > 57343) && (s = c));break;case 4:
                  u = e[i + 1], f = e[i + 2], h = e[i + 3], 128 === (192 & u) && 128 === (192 & f) && 128 === (192 & h) && (c = (15 & o) << 18 | (63 & u) << 12 | (63 & f) << 6 | 63 & h, c > 65535 && 1114112 > c && (s = c));}
            }null === s ? (s = 65533, a = 1) : s > 65535 && (s -= 65536, n.push(s >>> 10 & 1023 | 55296), s = 56320 | 1023 & s), n.push(s), i += a;
          }return T(n);
        }function T(e) {
          var t = e.length;if (Z >= t) return String.fromCharCode.apply(String, e);for (var r = "", n = 0; t > n;) {
            r += String.fromCharCode.apply(String, e.slice(n, n += Z));
          }return r;
        }function k(e, t, r) {
          var n = "";r = Math.min(e.length, r);for (var i = t; r > i; i++) {
            n += String.fromCharCode(127 & e[i]);
          }return n;
        }function O(e, t, r) {
          var n = "";r = Math.min(e.length, r);for (var i = t; r > i; i++) {
            n += String.fromCharCode(e[i]);
          }return n;
        }function L(e, t, r) {
          var n = e.length;(!t || 0 > t) && (t = 0), (!r || 0 > r || r > n) && (r = n);for (var i = "", o = t; r > o; o++) {
            i += H(e[o]);
          }return i;
        }function j(e, t, r) {
          for (var n = e.slice(t, r), i = "", o = 0; o < n.length; o += 2) {
            i += String.fromCharCode(n[o] + 256 * n[o + 1]);
          }return i;
        }function M(e, t, r) {
          if (e % 1 !== 0 || 0 > e) throw new RangeError("offset is not uint");if (e + t > r) throw new RangeError("Trying to access beyond buffer length");
        }function P(e, t, r, n, i, s) {
          if (!o.isBuffer(e)) throw new TypeError("buffer must be a Buffer instance");if (t > i || s > t) throw new RangeError("value is out of bounds");if (r + n > e.length) throw new RangeError("index out of range");
        }function B(e, t, r, n) {
          0 > t && (t = 65535 + t + 1);for (var i = 0, o = Math.min(e.length - r, 2); o > i; i++) {
            e[r + i] = (t & 255 << 8 * (n ? i : 1 - i)) >>> 8 * (n ? i : 1 - i);
          }
        }function U(e, t, r, n) {
          0 > t && (t = 4294967295 + t + 1);for (var i = 0, o = Math.min(e.length - r, 4); o > i; i++) {
            e[r + i] = t >>> 8 * (n ? i : 3 - i) & 255;
          }
        }function q(e, t, r, n) {
          if (r + n > e.length) throw new RangeError("index out of range");if (0 > r) throw new RangeError("index out of range");
        }function I(e, t, r, n, i) {
          return i || q(e, t, r, 4, 3.4028234663852886e38, -3.4028234663852886e38), V.write(e, t, r, n, 23, 4), r + 4;
        }function D(e, t, r, n, i) {
          return i || q(e, t, r, 8, 1.7976931348623157e308, -1.7976931348623157e308), V.write(e, t, r, n, 52, 8), r + 8;
        }function N(e) {
          if (e = Y(e).replace(Q, ""), e.length < 2) return "";for (; e.length % 4 !== 0;) {
            e += "=";
          }return e;
        }function Y(e) {
          return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "");
        }function H(e) {
          return 16 > e ? "0" + e.toString(16) : e.toString(16);
        }function F(e, t) {
          t = t || 1 / 0;for (var r, n = e.length, i = null, o = [], s = 0; n > s; s++) {
            if (r = e.charCodeAt(s), r > 55295 && 57344 > r) {
              if (!i) {
                if (r > 56319) {
                  (t -= 3) > -1 && o.push(239, 191, 189);continue;
                }if (s + 1 === n) {
                  (t -= 3) > -1 && o.push(239, 191, 189);continue;
                }i = r;continue;
              }if (56320 > r) {
                (t -= 3) > -1 && o.push(239, 191, 189), i = r;continue;
              }r = (i - 55296 << 10 | r - 56320) + 65536;
            } else i && (t -= 3) > -1 && o.push(239, 191, 189);if (i = null, 128 > r) {
              if ((t -= 1) < 0) break;o.push(r);
            } else if (2048 > r) {
              if ((t -= 2) < 0) break;o.push(r >> 6 | 192, 63 & r | 128);
            } else if (65536 > r) {
              if ((t -= 3) < 0) break;o.push(r >> 12 | 224, r >> 6 & 63 | 128, 63 & r | 128);
            } else {
              if (!(1114112 > r)) throw new Error("Invalid code point");if ((t -= 4) < 0) break;o.push(r >> 18 | 240, r >> 12 & 63 | 128, r >> 6 & 63 | 128, 63 & r | 128);
            }
          }return o;
        }function W(e) {
          for (var t = [], r = 0; r < e.length; r++) {
            t.push(255 & e.charCodeAt(r));
          }return t;
        }function z(e, t) {
          for (var r, n, i, o = [], s = 0; s < e.length && !((t -= 2) < 0); s++) {
            r = e.charCodeAt(s), n = r >> 8, i = r % 256, o.push(i), o.push(n);
          }return o;
        }function G(e) {
          return K.toByteArray(N(e));
        }function X(e, t, r, n) {
          for (var i = 0; n > i && !(i + r >= t.length || i >= e.length); i++) {
            t[i + r] = e[i];
          }return i;
        }var K = e("base64-js"),
            V = e("ieee754"),
            $ = e("isarray");r.Buffer = o, r.SlowBuffer = v, r.INSPECT_MAX_BYTES = 50, o.poolSize = 8192;var J = {};o.TYPED_ARRAY_SUPPORT = void 0 !== t.TYPED_ARRAY_SUPPORT ? t.TYPED_ARRAY_SUPPORT : n(), o._augment = function (e) {
          return e.__proto__ = o.prototype, e;
        }, o.TYPED_ARRAY_SUPPORT ? (o.prototype.__proto__ = Uint8Array.prototype, o.__proto__ = Uint8Array, "undefined" != typeof Symbol && Symbol.species && o[Symbol.species] === o && Object.defineProperty(o, Symbol.species, { value: null, configurable: !0 })) : (o.prototype.length = void 0, o.prototype.parent = void 0), o.isBuffer = function (e) {
          return !(null == e || !e._isBuffer);
        }, o.compare = function (e, t) {
          if (!o.isBuffer(e) || !o.isBuffer(t)) throw new TypeError("Arguments must be Buffers");if (e === t) return 0;for (var r = e.length, n = t.length, i = 0, s = Math.min(r, n); s > i; ++i) {
            if (e[i] !== t[i]) {
              r = e[i], n = t[i];break;
            }
          }return n > r ? -1 : r > n ? 1 : 0;
        }, o.isEncoding = function (e) {
          switch (String(e).toLowerCase()) {case "hex":case "utf8":case "utf-8":case "ascii":case "binary":case "base64":case "raw":case "ucs2":case "ucs-2":case "utf16le":case "utf-16le":
              return !0;default:
              return !1;}
        }, o.concat = function (e, t) {
          if (!$(e)) throw new TypeError("list argument must be an Array of Buffers.");if (0 === e.length) return new o(0);var r;if (void 0 === t) for (t = 0, r = 0; r < e.length; r++) {
            t += e[r].length;
          }var n = new o(t),
              i = 0;for (r = 0; r < e.length; r++) {
            var s = e[r];s.copy(n, i), i += s.length;
          }return n;
        }, o.byteLength = m, o.prototype._isBuffer = !0, o.prototype.toString = function () {
          var e = 0 | this.length;return 0 === e ? "" : 0 === arguments.length ? C(this, 0, e) : b.apply(this, arguments);
        }, o.prototype.equals = function (e) {
          if (!o.isBuffer(e)) throw new TypeError("Argument must be a Buffer");return this === e ? !0 : 0 === o.compare(this, e);
        }, o.prototype.inspect = function () {
          var e = "",
              t = r.INSPECT_MAX_BYTES;return this.length > 0 && (e = this.toString("hex", 0, t).match(/.{2}/g).join(" "), this.length > t && (e += " ... ")), "<Buffer " + e + ">";
        }, o.prototype.compare = function (e) {
          if (!o.isBuffer(e)) throw new TypeError("Argument must be a Buffer");return o.compare(this, e);
        }, o.prototype.indexOf = function (e, t) {
          function r(e, t, r) {
            for (var n = -1, i = 0; r + i < e.length; i++) {
              if (e[r + i] === t[-1 === n ? 0 : i - n]) {
                if (-1 === n && (n = i), i - n + 1 === t.length) return r + n;
              } else n = -1;
            }return -1;
          }if (t > 2147483647 ? t = 2147483647 : -2147483648 > t && (t = -2147483648), t >>= 0, 0 === this.length) return -1;if (t >= this.length) return -1;if (0 > t && (t = Math.max(this.length + t, 0)), "string" == typeof e) return 0 === e.length ? -1 : String.prototype.indexOf.call(this, e, t);if (o.isBuffer(e)) return r(this, e, t);if ("number" == typeof e) return o.TYPED_ARRAY_SUPPORT && "function" === Uint8Array.prototype.indexOf ? Uint8Array.prototype.indexOf.call(this, e, t) : r(this, [e], t);throw new TypeError("val must be string, number or Buffer");
        }, o.prototype.write = function (e, t, r, n) {
          if (void 0 === t) n = "utf8", r = this.length, t = 0;else if (void 0 === r && "string" == typeof t) n = t, r = this.length, t = 0;else if (isFinite(t)) t = 0 | t, isFinite(r) ? (r = 0 | r, void 0 === n && (n = "utf8")) : (n = r, r = void 0);else {
            var i = n;n = t, t = 0 | r, r = i;
          }var o = this.length - t;if ((void 0 === r || r > o) && (r = o), e.length > 0 && (0 > r || 0 > t) || t > this.length) throw new RangeError("attempt to write outside buffer bounds");n || (n = "utf8");for (var s = !1;;) {
            switch (n) {case "hex":
                return w(this, e, t, r);case "utf8":case "utf-8":
                return _(this, e, t, r);case "ascii":
                return R(this, e, t, r);case "binary":
                return E(this, e, t, r);case "base64":
                return S(this, e, t, r);case "ucs2":case "ucs-2":case "utf16le":case "utf-16le":
                return x(this, e, t, r);default:
                if (s) throw new TypeError("Unknown encoding: " + n);n = ("" + n).toLowerCase(), s = !0;}
          }
        }, o.prototype.toJSON = function () {
          return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) };
        };var Z = 4096;o.prototype.slice = function (e, t) {
          var r = this.length;e = ~~e, t = void 0 === t ? r : ~~t, 0 > e ? (e += r, 0 > e && (e = 0)) : e > r && (e = r), 0 > t ? (t += r, 0 > t && (t = 0)) : t > r && (t = r), e > t && (t = e);var n;if (o.TYPED_ARRAY_SUPPORT) n = this.subarray(e, t), n.__proto__ = o.prototype;else {
            var i = t - e;n = new o(i, void 0);for (var s = 0; i > s; s++) {
              n[s] = this[s + e];
            }
          }return n.length && (n.parent = this.parent || this), n;
        }, o.prototype.readUIntLE = function (e, t, r) {
          e = 0 | e, t = 0 | t, r || M(e, t, this.length);for (var n = this[e], i = 1, o = 0; ++o < t && (i *= 256);) {
            n += this[e + o] * i;
          }return n;
        }, o.prototype.readUIntBE = function (e, t, r) {
          e = 0 | e, t = 0 | t, r || M(e, t, this.length);for (var n = this[e + --t], i = 1; t > 0 && (i *= 256);) {
            n += this[e + --t] * i;
          }return n;
        }, o.prototype.readUInt8 = function (e, t) {
          return t || M(e, 1, this.length), this[e];
        }, o.prototype.readUInt16LE = function (e, t) {
          return t || M(e, 2, this.length), this[e] | this[e + 1] << 8;
        }, o.prototype.readUInt16BE = function (e, t) {
          return t || M(e, 2, this.length), this[e] << 8 | this[e + 1];
        }, o.prototype.readUInt32LE = function (e, t) {
          return t || M(e, 4, this.length), (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + 16777216 * this[e + 3];
        }, o.prototype.readUInt32BE = function (e, t) {
          return t || M(e, 4, this.length), 16777216 * this[e] + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]);
        }, o.prototype.readIntLE = function (e, t, r) {
          e = 0 | e, t = 0 | t, r || M(e, t, this.length);for (var n = this[e], i = 1, o = 0; ++o < t && (i *= 256);) {
            n += this[e + o] * i;
          }return i *= 128, n >= i && (n -= Math.pow(2, 8 * t)), n;
        }, o.prototype.readIntBE = function (e, t, r) {
          e = 0 | e, t = 0 | t, r || M(e, t, this.length);for (var n = t, i = 1, o = this[e + --n]; n > 0 && (i *= 256);) {
            o += this[e + --n] * i;
          }return i *= 128, o >= i && (o -= Math.pow(2, 8 * t)), o;
        }, o.prototype.readInt8 = function (e, t) {
          return t || M(e, 1, this.length), 128 & this[e] ? -1 * (255 - this[e] + 1) : this[e];
        }, o.prototype.readInt16LE = function (e, t) {
          t || M(e, 2, this.length);var r = this[e] | this[e + 1] << 8;return 32768 & r ? 4294901760 | r : r;
        }, o.prototype.readInt16BE = function (e, t) {
          t || M(e, 2, this.length);var r = this[e + 1] | this[e] << 8;return 32768 & r ? 4294901760 | r : r;
        }, o.prototype.readInt32LE = function (e, t) {
          return t || M(e, 4, this.length), this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24;
        }, o.prototype.readInt32BE = function (e, t) {
          return t || M(e, 4, this.length), this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3];
        }, o.prototype.readFloatLE = function (e, t) {
          return t || M(e, 4, this.length), V.read(this, e, !0, 23, 4);
        }, o.prototype.readFloatBE = function (e, t) {
          return t || M(e, 4, this.length), V.read(this, e, !1, 23, 4);
        }, o.prototype.readDoubleLE = function (e, t) {
          return t || M(e, 8, this.length), V.read(this, e, !0, 52, 8);
        }, o.prototype.readDoubleBE = function (e, t) {
          return t || M(e, 8, this.length), V.read(this, e, !1, 52, 8);
        }, o.prototype.writeUIntLE = function (e, t, r, n) {
          e = +e, t = 0 | t, r = 0 | r, n || P(this, e, t, r, Math.pow(2, 8 * r), 0);var i = 1,
              o = 0;for (this[t] = 255 & e; ++o < r && (i *= 256);) {
            this[t + o] = e / i & 255;
          }return t + r;
        }, o.prototype.writeUIntBE = function (e, t, r, n) {
          e = +e, t = 0 | t, r = 0 | r, n || P(this, e, t, r, Math.pow(2, 8 * r), 0);var i = r - 1,
              o = 1;for (this[t + i] = 255 & e; --i >= 0 && (o *= 256);) {
            this[t + i] = e / o & 255;
          }return t + r;
        }, o.prototype.writeUInt8 = function (e, t, r) {
          return e = +e, t = 0 | t, r || P(this, e, t, 1, 255, 0), o.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), this[t] = 255 & e, t + 1;
        }, o.prototype.writeUInt16LE = function (e, t, r) {
          return e = +e, t = 0 | t, r || P(this, e, t, 2, 65535, 0), o.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8) : B(this, e, t, !0), t + 2;
        }, o.prototype.writeUInt16BE = function (e, t, r) {
          return e = +e, t = 0 | t, r || P(this, e, t, 2, 65535, 0), o.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8, this[t + 1] = 255 & e) : B(this, e, t, !1), t + 2;
        }, o.prototype.writeUInt32LE = function (e, t, r) {
          return e = +e, t = 0 | t, r || P(this, e, t, 4, 4294967295, 0), o.TYPED_ARRAY_SUPPORT ? (this[t + 3] = e >>> 24, this[t + 2] = e >>> 16, this[t + 1] = e >>> 8, this[t] = 255 & e) : U(this, e, t, !0), t + 4;
        }, o.prototype.writeUInt32BE = function (e, t, r) {
          return e = +e, t = 0 | t, r || P(this, e, t, 4, 4294967295, 0), o.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e) : U(this, e, t, !1), t + 4;
        }, o.prototype.writeIntLE = function (e, t, r, n) {
          if (e = +e, t = 0 | t, !n) {
            var i = Math.pow(2, 8 * r - 1);P(this, e, t, r, i - 1, -i);
          }var o = 0,
              s = 1,
              a = 0 > e ? 1 : 0;for (this[t] = 255 & e; ++o < r && (s *= 256);) {
            this[t + o] = (e / s >> 0) - a & 255;
          }return t + r;
        }, o.prototype.writeIntBE = function (e, t, r, n) {
          if (e = +e, t = 0 | t, !n) {
            var i = Math.pow(2, 8 * r - 1);P(this, e, t, r, i - 1, -i);
          }var o = r - 1,
              s = 1,
              a = 0 > e ? 1 : 0;for (this[t + o] = 255 & e; --o >= 0 && (s *= 256);) {
            this[t + o] = (e / s >> 0) - a & 255;
          }return t + r;
        }, o.prototype.writeInt8 = function (e, t, r) {
          return e = +e, t = 0 | t, r || P(this, e, t, 1, 127, -128), o.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), 0 > e && (e = 255 + e + 1), this[t] = 255 & e, t + 1;
        }, o.prototype.writeInt16LE = function (e, t, r) {
          return e = +e, t = 0 | t, r || P(this, e, t, 2, 32767, -32768), o.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8) : B(this, e, t, !0), t + 2;
        }, o.prototype.writeInt16BE = function (e, t, r) {
          return e = +e, t = 0 | t, r || P(this, e, t, 2, 32767, -32768), o.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8, this[t + 1] = 255 & e) : B(this, e, t, !1), t + 2;
        }, o.prototype.writeInt32LE = function (e, t, r) {
          return e = +e, t = 0 | t, r || P(this, e, t, 4, 2147483647, -2147483648), o.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8, this[t + 2] = e >>> 16, this[t + 3] = e >>> 24) : U(this, e, t, !0), t + 4;
        }, o.prototype.writeInt32BE = function (e, t, r) {
          return e = +e, t = 0 | t, r || P(this, e, t, 4, 2147483647, -2147483648), 0 > e && (e = 4294967295 + e + 1), o.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e) : U(this, e, t, !1), t + 4;
        }, o.prototype.writeFloatLE = function (e, t, r) {
          return I(this, e, t, !0, r);
        }, o.prototype.writeFloatBE = function (e, t, r) {
          return I(this, e, t, !1, r);
        }, o.prototype.writeDoubleLE = function (e, t, r) {
          return D(this, e, t, !0, r);
        }, o.prototype.writeDoubleBE = function (e, t, r) {
          return D(this, e, t, !1, r);
        }, o.prototype.copy = function (e, t, r, n) {
          if (r || (r = 0), n || 0 === n || (n = this.length), t >= e.length && (t = e.length), t || (t = 0), n > 0 && r > n && (n = r), n === r) return 0;if (0 === e.length || 0 === this.length) return 0;if (0 > t) throw new RangeError("targetStart out of bounds");if (0 > r || r >= this.length) throw new RangeError("sourceStart out of bounds");if (0 > n) throw new RangeError("sourceEnd out of bounds");n > this.length && (n = this.length), e.length - t < n - r && (n = e.length - t + r);var i,
              s = n - r;if (this === e && t > r && n > t) for (i = s - 1; i >= 0; i--) {
            e[i + t] = this[i + r];
          } else if (1e3 > s || !o.TYPED_ARRAY_SUPPORT) for (i = 0; s > i; i++) {
            e[i + t] = this[i + r];
          } else Uint8Array.prototype.set.call(e, this.subarray(r, r + s), t);return s;
        }, o.prototype.fill = function (e, t, r) {
          if (e || (e = 0), t || (t = 0), r || (r = this.length), t > r) throw new RangeError("end < start");if (r !== t && 0 !== this.length) {
            if (0 > t || t >= this.length) throw new RangeError("start out of bounds");if (0 > r || r > this.length) throw new RangeError("end out of bounds");var n;if ("number" == typeof e) for (n = t; r > n; n++) {
              this[n] = e;
            } else {
              var i = F(e.toString()),
                  o = i.length;for (n = t; r > n; n++) {
                this[n] = i[n % o];
              }
            }return this;
          }
        };var Q = /[^+\/0-9A-Za-z-_]/g;
      }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    }, { "base64-js": 1, ieee754: 9, isarray: 4 }], 4: [function (e, t) {
      var r = {}.toString;t.exports = Array.isArray || function (e) {
        return "[object Array]" == r.call(e);
      };
    }, {}], 5: [function (e, t) {
      t.exports = { 100: "Continue", 101: "Switching Protocols", 102: "Processing", 200: "OK", 201: "Created", 202: "Accepted", 203: "Non-Authoritative Information", 204: "No Content", 205: "Reset Content", 206: "Partial Content", 207: "Multi-Status", 208: "Already Reported", 226: "IM Used", 300: "Multiple Choices", 301: "Moved Permanently", 302: "Found", 303: "See Other", 304: "Not Modified", 305: "Use Proxy", 307: "Temporary Redirect", 308: "Permanent Redirect", 400: "Bad Request", 401: "Unauthorized", 402: "Payment Required", 403: "Forbidden", 404: "Not Found", 405: "Method Not Allowed", 406: "Not Acceptable", 407: "Proxy Authentication Required", 408: "Request Timeout", 409: "Conflict", 410: "Gone", 411: "Length Required", 412: "Precondition Failed", 413: "Payload Too Large", 414: "URI Too Long", 415: "Unsupported Media Type", 416: "Range Not Satisfiable", 417: "Expectation Failed", 418: "I'm a teapot", 421: "Misdirected Request", 422: "Unprocessable Entity", 423: "Locked", 424: "Failed Dependency", 425: "Unordered Collection", 426: "Upgrade Required", 428: "Precondition Required", 429: "Too Many Requests", 431: "Request Header Fields Too Large", 500: "Internal Server Error", 501: "Not Implemented", 502: "Bad Gateway", 503: "Service Unavailable", 504: "Gateway Timeout", 505: "HTTP Version Not Supported", 506: "Variant Also Negotiates", 507: "Insufficient Storage", 508: "Loop Detected", 509: "Bandwidth Limit Exceeded", 510: "Not Extended", 511: "Network Authentication Required" };
    }, {}], 6: [function (e, t, r) {
      (function (e) {
        function t(e) {
          return Array.isArray ? Array.isArray(e) : "[object Array]" === y(e);
        }function n(e) {
          return "boolean" == typeof e;
        }function i(e) {
          return null === e;
        }function o(e) {
          return null == e;
        }function s(e) {
          return "number" == typeof e;
        }function a(e) {
          return "string" == typeof e;
        }function u(e) {
          return "symbol" === ("undefined" == typeof e ? "undefined" : _typeof(e));
        }function f(e) {
          return void 0 === e;
        }function h(e) {
          return "[object RegExp]" === y(e);
        }function c(e) {
          return "object" === ("undefined" == typeof e ? "undefined" : _typeof(e)) && null !== e;
        }function l(e) {
          return "[object Date]" === y(e);
        }function p(e) {
          return "[object Error]" === y(e) || e instanceof Error;
        }function d(e) {
          return "function" == typeof e;
        }function g(e) {
          return null === e || "boolean" == typeof e || "number" == typeof e || "string" == typeof e || "symbol" === ("undefined" == typeof e ? "undefined" : _typeof(e)) || "undefined" == typeof e;
        }function y(e) {
          return Object.prototype.toString.call(e);
        }r.isArray = t, r.isBoolean = n, r.isNull = i, r.isNullOrUndefined = o, r.isNumber = s, r.isString = a, r.isSymbol = u, r.isUndefined = f, r.isRegExp = h, r.isObject = c, r.isDate = l, r.isError = p, r.isFunction = d, r.isPrimitive = g, r.isBuffer = e.isBuffer;
      }).call(this, { isBuffer: e("../../is-buffer/index.js") });
    }, { "../../is-buffer/index.js": 11 }], 7: [function (e, t) {
      function r() {
        this._events = this._events || {}, this._maxListeners = this._maxListeners || void 0;
      }function n(e) {
        return "function" == typeof e;
      }function i(e) {
        return "number" == typeof e;
      }function o(e) {
        return "object" === ("undefined" == typeof e ? "undefined" : _typeof(e)) && null !== e;
      }function s(e) {
        return void 0 === e;
      }t.exports = r, r.EventEmitter = r, r.prototype._events = void 0, r.prototype._maxListeners = void 0, r.defaultMaxListeners = 10, r.prototype.setMaxListeners = function (e) {
        if (!i(e) || 0 > e || isNaN(e)) throw TypeError("n must be a positive number");return this._maxListeners = e, this;
      }, r.prototype.emit = function (e) {
        var t, r, i, a, u, f;if (this._events || (this._events = {}), "error" === e && (!this._events.error || o(this._events.error) && !this._events.error.length)) {
          if (t = arguments[1], t instanceof Error) throw t;throw TypeError('Uncaught, unspecified "error" event.');
        }if (r = this._events[e], s(r)) return !1;if (n(r)) switch (arguments.length) {case 1:
            r.call(this);break;case 2:
            r.call(this, arguments[1]);break;case 3:
            r.call(this, arguments[1], arguments[2]);break;default:
            a = Array.prototype.slice.call(arguments, 1), r.apply(this, a);} else if (o(r)) for (a = Array.prototype.slice.call(arguments, 1), f = r.slice(), i = f.length, u = 0; i > u; u++) {
          f[u].apply(this, a);
        }return !0;
      }, r.prototype.addListener = function (e, t) {
        var i;if (!n(t)) throw TypeError("listener must be a function");return this._events || (this._events = {}), this._events.newListener && this.emit("newListener", e, n(t.listener) ? t.listener : t), this._events[e] ? o(this._events[e]) ? this._events[e].push(t) : this._events[e] = [this._events[e], t] : this._events[e] = t, o(this._events[e]) && !this._events[e].warned && (i = s(this._maxListeners) ? r.defaultMaxListeners : this._maxListeners, i && i > 0 && this._events[e].length > i && (this._events[e].warned = !0, console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[e].length), "function" == typeof console.trace && console.trace())), this;
      }, r.prototype.on = r.prototype.addListener, r.prototype.once = function (e, t) {
        function r() {
          this.removeListener(e, r), i || (i = !0, t.apply(this, arguments));
        }if (!n(t)) throw TypeError("listener must be a function");var i = !1;return r.listener = t, this.on(e, r), this;
      }, r.prototype.removeListener = function (e, t) {
        var r, i, s, a;if (!n(t)) throw TypeError("listener must be a function");if (!this._events || !this._events[e]) return this;if (r = this._events[e], s = r.length, i = -1, r === t || n(r.listener) && r.listener === t) delete this._events[e], this._events.removeListener && this.emit("removeListener", e, t);else if (o(r)) {
          for (a = s; a-- > 0;) {
            if (r[a] === t || r[a].listener && r[a].listener === t) {
              i = a;break;
            }
          }if (0 > i) return this;1 === r.length ? (r.length = 0, delete this._events[e]) : r.splice(i, 1), this._events.removeListener && this.emit("removeListener", e, t);
        }return this;
      }, r.prototype.removeAllListeners = function (e) {
        var t, r;if (!this._events) return this;if (!this._events.removeListener) return 0 === arguments.length ? this._events = {} : this._events[e] && delete this._events[e], this;if (0 === arguments.length) {
          for (t in this._events) {
            "removeListener" !== t && this.removeAllListeners(t);
          }return this.removeAllListeners("removeListener"), this._events = {}, this;
        }if (r = this._events[e], n(r)) this.removeListener(e, r);else if (r) for (; r.length;) {
          this.removeListener(e, r[r.length - 1]);
        }return delete this._events[e], this;
      }, r.prototype.listeners = function (e) {
        var t;return t = this._events && this._events[e] ? n(this._events[e]) ? [this._events[e]] : this._events[e].slice() : [];
      }, r.prototype.listenerCount = function (e) {
        if (this._events) {
          var t = this._events[e];if (n(t)) return 1;if (t) return t.length;
        }return 0;
      }, r.listenerCount = function (e, t) {
        return e.listenerCount(t);
      };
    }, {}], 8: [function (e, t) {
      var r = e("http"),
          n = t.exports;for (var i in r) {
        r.hasOwnProperty(i) && (n[i] = r[i]);
      }n.request = function (e, t) {
        return e || (e = {}), e.scheme = "https", e.protocol = "https:", r.request.call(this, e, t);
      };
    }, { http: 30 }], 9: [function (e, t, r) {
      r.read = function (e, t, r, n, i) {
        var o,
            s,
            a = 8 * i - n - 1,
            u = (1 << a) - 1,
            f = u >> 1,
            h = -7,
            c = r ? i - 1 : 0,
            l = r ? -1 : 1,
            p = e[t + c];for (c += l, o = p & (1 << -h) - 1, p >>= -h, h += a; h > 0; o = 256 * o + e[t + c], c += l, h -= 8) {}for (s = o & (1 << -h) - 1, o >>= -h, h += n; h > 0; s = 256 * s + e[t + c], c += l, h -= 8) {}if (0 === o) o = 1 - f;else {
          if (o === u) return s ? 0 / 0 : (p ? -1 : 1) * (1 / 0);s += Math.pow(2, n), o -= f;
        }return (p ? -1 : 1) * s * Math.pow(2, o - n);
      }, r.write = function (e, t, r, n, i, o) {
        var s,
            a,
            u,
            f = 8 * o - i - 1,
            h = (1 << f) - 1,
            c = h >> 1,
            l = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
            p = n ? 0 : o - 1,
            d = n ? 1 : -1,
            g = 0 > t || 0 === t && 0 > 1 / t ? 1 : 0;for (t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (a = isNaN(t) ? 1 : 0, s = h) : (s = Math.floor(Math.log(t) / Math.LN2), t * (u = Math.pow(2, -s)) < 1 && (s--, u *= 2), t += s + c >= 1 ? l / u : l * Math.pow(2, 1 - c), t * u >= 2 && (s++, u /= 2), s + c >= h ? (a = 0, s = h) : s + c >= 1 ? (a = (t * u - 1) * Math.pow(2, i), s += c) : (a = t * Math.pow(2, c - 1) * Math.pow(2, i), s = 0)); i >= 8; e[r + p] = 255 & a, p += d, a /= 256, i -= 8) {}for (s = s << i | a, f += i; f > 0; e[r + p] = 255 & s, p += d, s /= 256, f -= 8) {}e[r + p - d] |= 128 * g;
      };
    }, {}], 10: [function (e, t) {
      t.exports = "function" == typeof Object.create ? function (e, t) {
        e.super_ = t, e.prototype = Object.create(t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } });
      } : function (e, t) {
        e.super_ = t;var r = function r() {};r.prototype = t.prototype, e.prototype = new r(), e.prototype.constructor = e;
      };
    }, {}], 11: [function (e, t) {
      t.exports = function (e) {
        return !(null == e || !(e._isBuffer || e.constructor && "function" == typeof e.constructor.isBuffer && e.constructor.isBuffer(e)));
      };
    }, {}], 12: [function (e, t) {
      (function (e) {
        function r(t) {
          for (var r = new Array(arguments.length - 1), n = 0; n < r.length;) {
            r[n++] = arguments[n];
          }e.nextTick(function () {
            t.apply(null, r);
          });
        }t.exports = !e.version || 0 === e.version.indexOf("v0.") || 0 === e.version.indexOf("v1.") && 0 !== e.version.indexOf("v1.8.") ? r : e.nextTick;
      }).call(this, e("_process"));
    }, { _process: 13 }], 13: [function (e, t) {
      function r() {
        f = !1, s.length ? u = s.concat(u) : h = -1, u.length && n();
      }function n() {
        if (!f) {
          var e = setTimeout(r);f = !0;for (var t = u.length; t;) {
            for (s = u, u = []; ++h < t;) {
              s && s[h].run();
            }h = -1, t = u.length;
          }s = null, f = !1, clearTimeout(e);
        }
      }function i(e, t) {
        this.fun = e, this.array = t;
      }function o() {}var s,
          a = t.exports = {},
          u = [],
          f = !1,
          h = -1;a.nextTick = function (e) {
        var t = new Array(arguments.length - 1);if (arguments.length > 1) for (var r = 1; r < arguments.length; r++) {
          t[r - 1] = arguments[r];
        }u.push(new i(e, t)), 1 !== u.length || f || setTimeout(n, 0);
      }, i.prototype.run = function () {
        this.fun.apply(null, this.array);
      }, a.title = "browser", a.browser = !0, a.env = {}, a.argv = [], a.version = "", a.versions = {}, a.on = o, a.addListener = o, a.once = o, a.off = o, a.removeListener = o, a.removeAllListeners = o, a.emit = o, a.binding = function () {
        throw new Error("process.binding is not supported");
      }, a.cwd = function () {
        return "/";
      }, a.chdir = function () {
        throw new Error("process.chdir is not supported");
      }, a.umask = function () {
        return 0;
      };
    }, {}], 14: [function (t, r, n) {
      (function (t) {
        !function (i) {
          function o(e) {
            throw new RangeError(P[e]);
          }function s(e, t) {
            for (var r = e.length, n = []; r--;) {
              n[r] = t(e[r]);
            }return n;
          }function a(e, t) {
            var r = e.split("@"),
                n = "";r.length > 1 && (n = r[0] + "@", e = r[1]), e = e.replace(M, ".");var i = e.split("."),
                o = s(i, t).join(".");return n + o;
          }function u(e) {
            for (var t, r, n = [], i = 0, o = e.length; o > i;) {
              t = e.charCodeAt(i++), t >= 55296 && 56319 >= t && o > i ? (r = e.charCodeAt(i++), 56320 == (64512 & r) ? n.push(((1023 & t) << 10) + (1023 & r) + 65536) : (n.push(t), i--)) : n.push(t);
            }return n;
          }function f(e) {
            return s(e, function (e) {
              var t = "";return e > 65535 && (e -= 65536, t += q(e >>> 10 & 1023 | 55296), e = 56320 | 1023 & e), t += q(e);
            }).join("");
          }function h(e) {
            return 10 > e - 48 ? e - 22 : 26 > e - 65 ? e - 65 : 26 > e - 97 ? e - 97 : E;
          }function c(e, t) {
            return e + 22 + 75 * (26 > e) - ((0 != t) << 5);
          }function l(e, t, r) {
            var n = 0;for (e = r ? U(e / C) : e >> 1, e += U(e / t); e > B * x >> 1; n += E) {
              e = U(e / B);
            }return U(n + (B + 1) * e / (e + A));
          }function p(e) {
            var t,
                r,
                n,
                i,
                s,
                a,
                u,
                c,
                p,
                d,
                g = [],
                y = e.length,
                v = 0,
                m = k,
                b = T;for (r = e.lastIndexOf(O), 0 > r && (r = 0), n = 0; r > n; ++n) {
              e.charCodeAt(n) >= 128 && o("not-basic"), g.push(e.charCodeAt(n));
            }for (i = r > 0 ? r + 1 : 0; y > i;) {
              for (s = v, a = 1, u = E; i >= y && o("invalid-input"), c = h(e.charCodeAt(i++)), (c >= E || c > U((R - v) / a)) && o("overflow"), v += c * a, p = b >= u ? S : u >= b + x ? x : u - b, !(p > c); u += E) {
                d = E - p, a > U(R / d) && o("overflow"), a *= d;
              }t = g.length + 1, b = l(v - s, t, 0 == s), U(v / t) > R - m && o("overflow"), m += U(v / t), v %= t, g.splice(v++, 0, m);
            }return f(g);
          }function d(e) {
            var t,
                r,
                n,
                i,
                s,
                a,
                f,
                h,
                p,
                d,
                g,
                y,
                v,
                m,
                b,
                w = [];for (e = u(e), y = e.length, t = k, r = 0, s = T, a = 0; y > a; ++a) {
              g = e[a], 128 > g && w.push(q(g));
            }for (n = i = w.length, i && w.push(O); y > n;) {
              for (f = R, a = 0; y > a; ++a) {
                g = e[a], g >= t && f > g && (f = g);
              }for (v = n + 1, f - t > U((R - r) / v) && o("overflow"), r += (f - t) * v, t = f, a = 0; y > a; ++a) {
                if (g = e[a], t > g && ++r > R && o("overflow"), g == t) {
                  for (h = r, p = E; d = s >= p ? S : p >= s + x ? x : p - s, !(d > h); p += E) {
                    b = h - d, m = E - d, w.push(q(c(d + b % m, 0))), h = U(b / m);
                  }w.push(q(c(h, 0))), s = l(r, v, n == i), r = 0, ++n;
                }
              }++r, ++t;
            }return w.join("");
          }function g(e) {
            return a(e, function (e) {
              return L.test(e) ? p(e.slice(4).toLowerCase()) : e;
            });
          }function y(e) {
            return a(e, function (e) {
              return j.test(e) ? "xn--" + d(e) : e;
            });
          }var v = "object" == ("undefined" == typeof n ? "undefined" : _typeof(n)) && n && !n.nodeType && n,
              m = "object" == ("undefined" == typeof r ? "undefined" : _typeof(r)) && r && !r.nodeType && r,
              b = "object" == ("undefined" == typeof t ? "undefined" : _typeof(t)) && t;(b.global === b || b.window === b || b.self === b) && (i = b);var w,
              _,
              R = 2147483647,
              E = 36,
              S = 1,
              x = 26,
              A = 38,
              C = 700,
              T = 72,
              k = 128,
              O = "-",
              L = /^xn--/,
              j = /[^\x20-\x7E]/,
              M = /[\x2E\u3002\uFF0E\uFF61]/g,
              P = { overflow: "Overflow: input needs wider integers to process", "not-basic": "Illegal input >= 0x80 (not a basic code point)", "invalid-input": "Invalid input" },
              B = E - S,
              U = Math.floor,
              q = String.fromCharCode;if (w = { version: "1.4.1", ucs2: { decode: u, encode: f }, decode: p, encode: d, toASCII: y, toUnicode: g }, "function" == typeof e && "object" == _typeof(e.amd) && e.amd) e("punycode", function () {
            return w;
          });else if (v && m) {
            if (r.exports == v) m.exports = w;else for (_ in w) {
              w.hasOwnProperty(_) && (v[_] = w[_]);
            }
          } else i.punycode = w;
        }(this);
      }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    }, {}], 15: [function (e, t) {
      function r(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }t.exports = function (e, t, i, o) {
        t = t || "&", i = i || "=";var s = {};if ("string" != typeof e || 0 === e.length) return s;var a = /\+/g;e = e.split(t);var u = 1e3;o && "number" == typeof o.maxKeys && (u = o.maxKeys);var f = e.length;u > 0 && f > u && (f = u);for (var h = 0; f > h; ++h) {
          var c,
              l,
              p,
              d,
              g = e[h].replace(a, "%20"),
              y = g.indexOf(i);y >= 0 ? (c = g.substr(0, y), l = g.substr(y + 1)) : (c = g, l = ""), p = decodeURIComponent(c), d = decodeURIComponent(l), r(s, p) ? n(s[p]) ? s[p].push(d) : s[p] = [s[p], d] : s[p] = d;
        }return s;
      };var n = Array.isArray || function (e) {
        return "[object Array]" === Object.prototype.toString.call(e);
      };
    }, {}], 16: [function (e, t) {
      function r(e, t) {
        if (e.map) return e.map(t);for (var r = [], n = 0; n < e.length; n++) {
          r.push(t(e[n], n));
        }return r;
      }var n = function n(e) {
        switch ("undefined" == typeof e ? "undefined" : _typeof(e)) {case "string":
            return e;case "boolean":
            return e ? "true" : "false";case "number":
            return isFinite(e) ? e : "";default:
            return "";}
      };t.exports = function (e, t, s, a) {
        return t = t || "&", s = s || "=", null === e && (e = void 0), "object" === ("undefined" == typeof e ? "undefined" : _typeof(e)) ? r(o(e), function (o) {
          var a = encodeURIComponent(n(o)) + s;return i(e[o]) ? r(e[o], function (e) {
            return a + encodeURIComponent(n(e));
          }).join(t) : a + encodeURIComponent(n(e[o]));
        }).join(t) : a ? encodeURIComponent(n(a)) + s + encodeURIComponent(n(e)) : "";
      };var i = Array.isArray || function (e) {
        return "[object Array]" === Object.prototype.toString.call(e);
      },
          o = Object.keys || function (e) {
        var t = [];for (var r in e) {
          Object.prototype.hasOwnProperty.call(e, r) && t.push(r);
        }return t;
      };
    }, {}], 17: [function (e, t, r) {
      r.decode = r.parse = e("./decode"), r.encode = r.stringify = e("./encode");
    }, { "./decode": 15, "./encode": 16 }], 18: [function (e, t) {
      t.exports = e("./lib/_stream_duplex.js");
    }, { "./lib/_stream_duplex.js": 19 }], 19: [function (e, t) {
      function r(e) {
        return this instanceof r ? (u.call(this, e), f.call(this, e), e && e.readable === !1 && (this.readable = !1), e && e.writable === !1 && (this.writable = !1), this.allowHalfOpen = !0, e && e.allowHalfOpen === !1 && (this.allowHalfOpen = !1), void this.once("end", n)) : new r(e);
      }function n() {
        this.allowHalfOpen || this._writableState.ended || s(i, this);
      }function i(e) {
        e.end();
      }var o = Object.keys || function (e) {
        var t = [];for (var r in e) {
          t.push(r);
        }return t;
      };t.exports = r;var s = e("process-nextick-args"),
          a = e("core-util-is");a.inherits = e("inherits");var u = e("./_stream_readable"),
          f = e("./_stream_writable");a.inherits(r, u);for (var h = o(f.prototype), c = 0; c < h.length; c++) {
        var l = h[c];r.prototype[l] || (r.prototype[l] = f.prototype[l]);
      }
    }, { "./_stream_readable": 21, "./_stream_writable": 23, "core-util-is": 6, inherits: 10, "process-nextick-args": 12 }], 20: [function (e, t) {
      function r(e) {
        return this instanceof r ? void n.call(this, e) : new r(e);
      }t.exports = r;var n = e("./_stream_transform"),
          i = e("core-util-is");i.inherits = e("inherits"), i.inherits(r, n), r.prototype._transform = function (e, t, r) {
        r(null, e);
      };
    }, { "./_stream_transform": 22, "core-util-is": 6, inherits: 10 }], 21: [function (e, t) {
      (function (r) {
        function n(t, r) {
          P = P || e("./_stream_duplex"), t = t || {}, this.objectMode = !!t.objectMode, r instanceof P && (this.objectMode = this.objectMode || !!t.readableObjectMode);var n = t.highWaterMark,
              i = this.objectMode ? 16 : 16384;this.highWaterMark = n || 0 === n ? n : i, this.highWaterMark = ~~this.highWaterMark, this.buffer = [], this.length = 0, this.pipes = null, this.pipesCount = 0, this.flowing = null, this.ended = !1, this.endEmitted = !1, this.reading = !1, this.sync = !0, this.needReadable = !1, this.emittedReadable = !1, this.readableListening = !1, this.resumeScheduled = !1, this.defaultEncoding = t.defaultEncoding || "utf8", this.ranOut = !1, this.awaitDrain = 0, this.readingMore = !1, this.decoder = null, this.encoding = null, t.encoding && (M || (M = e("string_decoder/").StringDecoder), this.decoder = new M(t.encoding), this.encoding = t.encoding);
        }function i(t) {
          return P = P || e("./_stream_duplex"), this instanceof i ? (this._readableState = new n(t, this), this.readable = !0, t && "function" == typeof t.read && (this._read = t.read), void T.call(this)) : new i(t);
        }function o(e, t, r, n, i) {
          var o = f(t, r);if (o) e.emit("error", o);else if (null === r) t.reading = !1, h(e, t);else if (t.objectMode || r && r.length > 0) {
            if (t.ended && !i) {
              var a = new Error("stream.push() after EOF");e.emit("error", a);
            } else if (t.endEmitted && i) {
              var a = new Error("stream.unshift() after end event");e.emit("error", a);
            } else {
              var u;!t.decoder || i || n || (r = t.decoder.write(r), u = !t.objectMode && 0 === r.length), i || (t.reading = !1), u || (t.flowing && 0 === t.length && !t.sync ? (e.emit("data", r), e.read(0)) : (t.length += t.objectMode ? 1 : r.length, i ? t.buffer.unshift(r) : t.buffer.push(r), t.needReadable && c(e))), p(e, t);
            }
          } else i || (t.reading = !1);return s(t);
        }function s(e) {
          return !e.ended && (e.needReadable || e.length < e.highWaterMark || 0 === e.length);
        }function a(e) {
          return e >= B ? e = B : (e--, e |= e >>> 1, e |= e >>> 2, e |= e >>> 4, e |= e >>> 8, e |= e >>> 16, e++), e;
        }function u(e, t) {
          return 0 === t.length && t.ended ? 0 : t.objectMode ? 0 === e ? 0 : 1 : null === e || isNaN(e) ? t.flowing && t.buffer.length ? t.buffer[0].length : t.length : 0 >= e ? 0 : (e > t.highWaterMark && (t.highWaterMark = a(e)), e > t.length ? t.ended ? t.length : (t.needReadable = !0, 0) : e);
        }function f(e, t) {
          var r = null;return C.isBuffer(t) || "string" == typeof t || null === t || void 0 === t || e.objectMode || (r = new TypeError("Invalid non-string/buffer chunk")), r;
        }function h(e, t) {
          if (!t.ended) {
            if (t.decoder) {
              var r = t.decoder.end();r && r.length && (t.buffer.push(r), t.length += t.objectMode ? 1 : r.length);
            }t.ended = !0, c(e);
          }
        }function c(e) {
          var t = e._readableState;t.needReadable = !1, t.emittedReadable || (j("emitReadable", t.flowing), t.emittedReadable = !0, t.sync ? x(l, e) : l(e));
        }function l(e) {
          j("emit readable"), e.emit("readable"), b(e);
        }function p(e, t) {
          t.readingMore || (t.readingMore = !0, x(d, e, t));
        }function d(e, t) {
          for (var r = t.length; !t.reading && !t.flowing && !t.ended && t.length < t.highWaterMark && (j("maybeReadMore read 0"), e.read(0), r !== t.length);) {
            r = t.length;
          }t.readingMore = !1;
        }function g(e) {
          return function () {
            var t = e._readableState;j("pipeOnDrain", t.awaitDrain), t.awaitDrain && t.awaitDrain--, 0 === t.awaitDrain && k(e, "data") && (t.flowing = !0, b(e));
          };
        }function y(e) {
          j("readable nexttick read 0"), e.read(0);
        }function v(e, t) {
          t.resumeScheduled || (t.resumeScheduled = !0, x(m, e, t));
        }function m(e, t) {
          t.reading || (j("resume read 0"), e.read(0)), t.resumeScheduled = !1, e.emit("resume"), b(e), t.flowing && !t.reading && e.read(0);
        }function b(e) {
          var t = e._readableState;if (j("flow", t.flowing), t.flowing) do {
            var r = e.read();
          } while (null !== r && t.flowing);
        }function w(e, t) {
          var r,
              n = t.buffer,
              i = t.length,
              o = !!t.decoder,
              s = !!t.objectMode;if (0 === n.length) return null;if (0 === i) r = null;else if (s) r = n.shift();else if (!e || e >= i) r = o ? n.join("") : 1 === n.length ? n[0] : C.concat(n, i), n.length = 0;else if (e < n[0].length) {
            var a = n[0];r = a.slice(0, e), n[0] = a.slice(e);
          } else if (e === n[0].length) r = n.shift();else {
            r = o ? "" : new C(e);for (var u = 0, f = 0, h = n.length; h > f && e > u; f++) {
              var a = n[0],
                  c = Math.min(e - u, a.length);o ? r += a.slice(0, c) : a.copy(r, u, 0, c), c < a.length ? n[0] = a.slice(c) : n.shift(), u += c;
            }
          }return r;
        }function _(e) {
          var t = e._readableState;if (t.length > 0) throw new Error("endReadable called on non-empty stream");t.endEmitted || (t.ended = !0, x(R, t, e));
        }function R(e, t) {
          e.endEmitted || 0 !== e.length || (e.endEmitted = !0, t.readable = !1, t.emit("end"));
        }function E(e, t) {
          for (var r = 0, n = e.length; n > r; r++) {
            t(e[r], r);
          }
        }function S(e, t) {
          for (var r = 0, n = e.length; n > r; r++) {
            if (e[r] === t) return r;
          }return -1;
        }t.exports = i;var x = e("process-nextick-args"),
            A = e("isarray"),
            C = e("buffer").Buffer;i.ReadableState = n;var T,
            k = (e("events"), function (e, t) {
          return e.listeners(t).length;
        });!function () {
          try {
            T = e("stream");
          } catch (t) {} finally {
            T || (T = e("events").EventEmitter);
          }
        }();var C = e("buffer").Buffer,
            O = e("core-util-is");O.inherits = e("inherits");var L = e("util"),
            j = void 0;j = L && L.debuglog ? L.debuglog("stream") : function () {};var M;O.inherits(i, T);var P, P;i.prototype.push = function (e, t) {
          var r = this._readableState;return r.objectMode || "string" != typeof e || (t = t || r.defaultEncoding, t !== r.encoding && (e = new C(e, t), t = "")), o(this, r, e, t, !1);
        }, i.prototype.unshift = function (e) {
          var t = this._readableState;return o(this, t, e, "", !0);
        }, i.prototype.isPaused = function () {
          return this._readableState.flowing === !1;
        }, i.prototype.setEncoding = function (t) {
          return M || (M = e("string_decoder/").StringDecoder), this._readableState.decoder = new M(t), this._readableState.encoding = t, this;
        };var B = 8388608;i.prototype.read = function (e) {
          j("read", e);var t = this._readableState,
              r = e;if (("number" != typeof e || e > 0) && (t.emittedReadable = !1), 0 === e && t.needReadable && (t.length >= t.highWaterMark || t.ended)) return j("read: emitReadable", t.length, t.ended), 0 === t.length && t.ended ? _(this) : c(this), null;if (e = u(e, t), 0 === e && t.ended) return 0 === t.length && _(this), null;var n = t.needReadable;j("need readable", n), (0 === t.length || t.length - e < t.highWaterMark) && (n = !0, j("length less than watermark", n)), (t.ended || t.reading) && (n = !1, j("reading or ended", n)), n && (j("do read"), t.reading = !0, t.sync = !0, 0 === t.length && (t.needReadable = !0), this._read(t.highWaterMark), t.sync = !1), n && !t.reading && (e = u(r, t));var i;return i = e > 0 ? w(e, t) : null, null === i && (t.needReadable = !0, e = 0), t.length -= e, 0 !== t.length || t.ended || (t.needReadable = !0), r !== e && t.ended && 0 === t.length && _(this), null !== i && this.emit("data", i), i;
        }, i.prototype._read = function () {
          this.emit("error", new Error("not implemented"));
        }, i.prototype.pipe = function (e, t) {
          function n(e) {
            j("onunpipe"), e === c && o();
          }function i() {
            j("onend"), e.end();
          }function o() {
            j("cleanup"), e.removeListener("close", u), e.removeListener("finish", f), e.removeListener("drain", y), e.removeListener("error", a), e.removeListener("unpipe", n), c.removeListener("end", i), c.removeListener("end", o), c.removeListener("data", s), v = !0, !l.awaitDrain || e._writableState && !e._writableState.needDrain || y();
          }function s(t) {
            j("ondata");var r = e.write(t);!1 === r && (1 !== l.pipesCount || l.pipes[0] !== e || 1 !== c.listenerCount("data") || v || (j("false write response, pause", c._readableState.awaitDrain), c._readableState.awaitDrain++), c.pause());
          }function a(t) {
            j("onerror", t), h(), e.removeListener("error", a), 0 === k(e, "error") && e.emit("error", t);
          }function u() {
            e.removeListener("finish", f), h();
          }function f() {
            j("onfinish"), e.removeListener("close", u), h();
          }function h() {
            j("unpipe"), c.unpipe(e);
          }var c = this,
              l = this._readableState;switch (l.pipesCount) {case 0:
              l.pipes = e;break;case 1:
              l.pipes = [l.pipes, e];break;default:
              l.pipes.push(e);}l.pipesCount += 1, j("pipe count=%d opts=%j", l.pipesCount, t);var p = (!t || t.end !== !1) && e !== r.stdout && e !== r.stderr,
              d = p ? i : o;l.endEmitted ? x(d) : c.once("end", d), e.on("unpipe", n);var y = g(c);e.on("drain", y);var v = !1;return c.on("data", s), e._events && e._events.error ? A(e._events.error) ? e._events.error.unshift(a) : e._events.error = [a, e._events.error] : e.on("error", a), e.once("close", u), e.once("finish", f), e.emit("pipe", c), l.flowing || (j("pipe resume"), c.resume()), e;
        }, i.prototype.unpipe = function (e) {
          var t = this._readableState;if (0 === t.pipesCount) return this;if (1 === t.pipesCount) return e && e !== t.pipes ? this : (e || (e = t.pipes), t.pipes = null, t.pipesCount = 0, t.flowing = !1, e && e.emit("unpipe", this), this);if (!e) {
            var r = t.pipes,
                n = t.pipesCount;t.pipes = null, t.pipesCount = 0, t.flowing = !1;for (var i = 0; n > i; i++) {
              r[i].emit("unpipe", this);
            }return this;
          }var o = S(t.pipes, e);return -1 === o ? this : (t.pipes.splice(o, 1), t.pipesCount -= 1, 1 === t.pipesCount && (t.pipes = t.pipes[0]), e.emit("unpipe", this), this);
        }, i.prototype.on = function (e, t) {
          var r = T.prototype.on.call(this, e, t);if ("data" === e && !1 !== this._readableState.flowing && this.resume(), "readable" === e && !this._readableState.endEmitted) {
            var n = this._readableState;n.readableListening || (n.readableListening = !0, n.emittedReadable = !1, n.needReadable = !0, n.reading ? n.length && c(this, n) : x(y, this));
          }return r;
        }, i.prototype.addListener = i.prototype.on, i.prototype.resume = function () {
          var e = this._readableState;return e.flowing || (j("resume"), e.flowing = !0, v(this, e)), this;
        }, i.prototype.pause = function () {
          return j("call pause flowing=%j", this._readableState.flowing), !1 !== this._readableState.flowing && (j("pause"), this._readableState.flowing = !1, this.emit("pause")), this;
        }, i.prototype.wrap = function (e) {
          var t = this._readableState,
              r = !1,
              n = this;e.on("end", function () {
            if (j("wrapped end"), t.decoder && !t.ended) {
              var e = t.decoder.end();e && e.length && n.push(e);
            }n.push(null);
          }), e.on("data", function (i) {
            if (j("wrapped data"), t.decoder && (i = t.decoder.write(i)), (!t.objectMode || null !== i && void 0 !== i) && (t.objectMode || i && i.length)) {
              var o = n.push(i);o || (r = !0, e.pause());
            }
          });for (var i in e) {
            void 0 === this[i] && "function" == typeof e[i] && (this[i] = function (t) {
              return function () {
                return e[t].apply(e, arguments);
              };
            }(i));
          }var o = ["error", "close", "destroy", "pause", "resume"];return E(o, function (t) {
            e.on(t, n.emit.bind(n, t));
          }), n._read = function (t) {
            j("wrapped _read", t), r && (r = !1, e.resume());
          }, n;
        }, i._fromList = w;
      }).call(this, e("_process"));
    }, { "./_stream_duplex": 19, _process: 13, buffer: 3, "core-util-is": 6, events: 7, inherits: 10, isarray: 24, "process-nextick-args": 12, "string_decoder/": 34, util: 2 }], 22: [function (e, t) {
      function r(e) {
        this.afterTransform = function (t, r) {
          return n(e, t, r);
        }, this.needTransform = !1, this.transforming = !1, this.writecb = null, this.writechunk = null, this.writeencoding = null;
      }function n(e, t, r) {
        var n = e._transformState;n.transforming = !1;var i = n.writecb;if (!i) return e.emit("error", new Error("no writecb in Transform class"));n.writechunk = null, n.writecb = null, null !== r && void 0 !== r && e.push(r), i(t);var o = e._readableState;o.reading = !1, (o.needReadable || o.length < o.highWaterMark) && e._read(o.highWaterMark);
      }function i(e) {
        if (!(this instanceof i)) return new i(e);s.call(this, e), this._transformState = new r(this);var t = this;this._readableState.needReadable = !0, this._readableState.sync = !1, e && ("function" == typeof e.transform && (this._transform = e.transform), "function" == typeof e.flush && (this._flush = e.flush)), this.once("prefinish", function () {
          "function" == typeof this._flush ? this._flush(function (e) {
            o(t, e);
          }) : o(t);
        });
      }function o(e, t) {
        if (t) return e.emit("error", t);var r = e._writableState,
            n = e._transformState;if (r.length) throw new Error("calling transform done when ws.length != 0");if (n.transforming) throw new Error("calling transform done when still transforming");return e.push(null);
      }t.exports = i;var s = e("./_stream_duplex"),
          a = e("core-util-is");a.inherits = e("inherits"), a.inherits(i, s), i.prototype.push = function (e, t) {
        return this._transformState.needTransform = !1, s.prototype.push.call(this, e, t);
      }, i.prototype._transform = function () {
        throw new Error("not implemented");
      }, i.prototype._write = function (e, t, r) {
        var n = this._transformState;if (n.writecb = r, n.writechunk = e, n.writeencoding = t, !n.transforming) {
          var i = this._readableState;(n.needTransform || i.needReadable || i.length < i.highWaterMark) && this._read(i.highWaterMark);
        }
      }, i.prototype._read = function () {
        var e = this._transformState;null !== e.writechunk && e.writecb && !e.transforming ? (e.transforming = !0, this._transform(e.writechunk, e.writeencoding, e.afterTransform)) : e.needTransform = !0;
      };
    }, { "./_stream_duplex": 19, "core-util-is": 6, inherits: 10 }], 23: [function (e, t) {
      (function (r) {
        function n() {}function i(e, t, r) {
          this.chunk = e, this.encoding = t, this.callback = r, this.next = null;
        }function o(t, r) {
          k = k || e("./_stream_duplex"), t = t || {}, this.objectMode = !!t.objectMode, r instanceof k && (this.objectMode = this.objectMode || !!t.writableObjectMode);var n = t.highWaterMark,
              i = this.objectMode ? 16 : 16384;this.highWaterMark = n || 0 === n ? n : i, this.highWaterMark = ~~this.highWaterMark, this.needDrain = !1, this.ending = !1, this.ended = !1, this.finished = !1;var o = t.decodeStrings === !1;this.decodeStrings = !o, this.defaultEncoding = t.defaultEncoding || "utf8", this.length = 0, this.writing = !1, this.corked = 0, this.sync = !0, this.bufferProcessing = !1, this.onwrite = function (e) {
            d(r, e);
          }, this.writecb = null, this.writelen = 0, this.bufferedRequest = null, this.lastBufferedRequest = null, this.pendingcb = 0, this.prefinished = !1, this.errorEmitted = !1, this.bufferedRequestCount = 0, this.corkedRequestsFree = new R(this), this.corkedRequestsFree.next = new R(this);
        }function s(t) {
          return k = k || e("./_stream_duplex"), this instanceof s || this instanceof k ? (this._writableState = new o(t, this), this.writable = !0, t && ("function" == typeof t.write && (this._write = t.write), "function" == typeof t.writev && (this._writev = t.writev)), void C.call(this)) : new s(t);
        }function a(e, t) {
          var r = new Error("write after end");e.emit("error", r), E(t, r);
        }function u(e, t, r, n) {
          var i = !0;if (!x.isBuffer(r) && "string" != typeof r && null !== r && void 0 !== r && !t.objectMode) {
            var o = new TypeError("Invalid non-string/buffer chunk");e.emit("error", o), E(n, o), i = !1;
          }return i;
        }function f(e, t, r) {
          return e.objectMode || e.decodeStrings === !1 || "string" != typeof t || (t = new x(t, r)), t;
        }function h(e, t, r, n, o) {
          r = f(t, r, n), x.isBuffer(r) && (n = "buffer");var s = t.objectMode ? 1 : r.length;t.length += s;var a = t.length < t.highWaterMark;if (a || (t.needDrain = !0), t.writing || t.corked) {
            var u = t.lastBufferedRequest;t.lastBufferedRequest = new i(r, n, o), u ? u.next = t.lastBufferedRequest : t.bufferedRequest = t.lastBufferedRequest, t.bufferedRequestCount += 1;
          } else c(e, t, !1, s, r, n, o);return a;
        }function c(e, t, r, n, i, o, s) {
          t.writelen = n, t.writecb = s, t.writing = !0, t.sync = !0, r ? e._writev(i, t.onwrite) : e._write(i, o, t.onwrite), t.sync = !1;
        }function l(e, t, r, n, i) {
          --t.pendingcb, r ? E(i, n) : i(n), e._writableState.errorEmitted = !0, e.emit("error", n);
        }function p(e) {
          e.writing = !1, e.writecb = null, e.length -= e.writelen, e.writelen = 0;
        }function d(e, t) {
          var r = e._writableState,
              n = r.sync,
              i = r.writecb;if (p(r), t) l(e, r, n, t, i);else {
            var o = m(r);o || r.corked || r.bufferProcessing || !r.bufferedRequest || v(e, r), n ? S(g, e, r, o, i) : g(e, r, o, i);
          }
        }function g(e, t, r, n) {
          r || y(e, t), t.pendingcb--, n(), w(e, t);
        }function y(e, t) {
          0 === t.length && t.needDrain && (t.needDrain = !1, e.emit("drain"));
        }function v(e, t) {
          t.bufferProcessing = !0;var r = t.bufferedRequest;if (e._writev && r && r.next) {
            var n = t.bufferedRequestCount,
                i = new Array(n),
                o = t.corkedRequestsFree;o.entry = r;for (var s = 0; r;) {
              i[s] = r, r = r.next, s += 1;
            }c(e, t, !0, t.length, i, "", o.finish), t.pendingcb++, t.lastBufferedRequest = null, t.corkedRequestsFree = o.next, o.next = null;
          } else {
            for (; r;) {
              var a = r.chunk,
                  u = r.encoding,
                  f = r.callback,
                  h = t.objectMode ? 1 : a.length;if (c(e, t, !1, h, a, u, f), r = r.next, t.writing) break;
            }null === r && (t.lastBufferedRequest = null);
          }t.bufferedRequestCount = 0, t.bufferedRequest = r, t.bufferProcessing = !1;
        }function m(e) {
          return e.ending && 0 === e.length && null === e.bufferedRequest && !e.finished && !e.writing;
        }function b(e, t) {
          t.prefinished || (t.prefinished = !0, e.emit("prefinish"));
        }function w(e, t) {
          var r = m(t);return r && (0 === t.pendingcb ? (b(e, t), t.finished = !0, e.emit("finish")) : b(e, t)), r;
        }function _(e, t, r) {
          t.ending = !0, w(e, t), r && (t.finished ? E(r) : e.once("finish", r)), t.ended = !0, e.writable = !1;
        }function R(e) {
          var t = this;this.next = null, this.entry = null, this.finish = function (r) {
            var n = t.entry;for (t.entry = null; n;) {
              var i = n.callback;e.pendingcb--, i(r), n = n.next;
            }e.corkedRequestsFree ? e.corkedRequestsFree.next = t : e.corkedRequestsFree = t;
          };
        }t.exports = s;var E = e("process-nextick-args"),
            S = !r.browser && ["v0.10", "v0.9."].indexOf(r.version.slice(0, 5)) > -1 ? setImmediate : E,
            x = e("buffer").Buffer;s.WritableState = o;var A = e("core-util-is");A.inherits = e("inherits");var C,
            T = { deprecate: e("util-deprecate") };!function () {
          try {
            C = e("stream");
          } catch (t) {} finally {
            C || (C = e("events").EventEmitter);
          }
        }();var x = e("buffer").Buffer;A.inherits(s, C);var k;o.prototype.getBuffer = function () {
          for (var e = this.bufferedRequest, t = []; e;) {
            t.push(e), e = e.next;
          }return t;
        }, function () {
          try {
            Object.defineProperty(o.prototype, "buffer", { get: T.deprecate(function () {
                return this.getBuffer();
              }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.") });
          } catch (e) {}
        }();var k;s.prototype.pipe = function () {
          this.emit("error", new Error("Cannot pipe. Not readable."));
        }, s.prototype.write = function (e, t, r) {
          var i = this._writableState,
              o = !1;return "function" == typeof t && (r = t, t = null), x.isBuffer(e) ? t = "buffer" : t || (t = i.defaultEncoding), "function" != typeof r && (r = n), i.ended ? a(this, r) : u(this, i, e, r) && (i.pendingcb++, o = h(this, i, e, t, r)), o;
        }, s.prototype.cork = function () {
          var e = this._writableState;e.corked++;
        }, s.prototype.uncork = function () {
          var e = this._writableState;e.corked && (e.corked--, e.writing || e.corked || e.finished || e.bufferProcessing || !e.bufferedRequest || v(this, e));
        }, s.prototype.setDefaultEncoding = function (e) {
          if ("string" == typeof e && (e = e.toLowerCase()), !(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((e + "").toLowerCase()) > -1)) throw new TypeError("Unknown encoding: " + e);this._writableState.defaultEncoding = e;
        }, s.prototype._write = function (e, t, r) {
          r(new Error("not implemented"));
        }, s.prototype._writev = null, s.prototype.end = function (e, t, r) {
          var n = this._writableState;"function" == typeof e ? (r = e, e = null, t = null) : "function" == typeof t && (r = t, t = null), null !== e && void 0 !== e && this.write(e, t), n.corked && (n.corked = 1, this.uncork()), n.ending || n.finished || _(this, n, r);
        };
      }).call(this, e("_process"));
    }, { "./_stream_duplex": 19, _process: 13, buffer: 3, "core-util-is": 6, events: 7, inherits: 10, "process-nextick-args": 12, "util-deprecate": 38 }], 24: [function (e, t, r) {
      arguments[4][4][0].apply(r, arguments);
    }, { dup: 4 }], 25: [function (e, t) {
      t.exports = e("./lib/_stream_passthrough.js");
    }, { "./lib/_stream_passthrough.js": 20 }], 26: [function (e, t, r) {
      var n = function () {
        try {
          return e("stream");
        } catch (t) {}
      }();r = t.exports = e("./lib/_stream_readable.js"), r.Stream = n || r, r.Readable = r, r.Writable = e("./lib/_stream_writable.js"), r.Duplex = e("./lib/_stream_duplex.js"), r.Transform = e("./lib/_stream_transform.js"), r.PassThrough = e("./lib/_stream_passthrough.js");
    }, { "./lib/_stream_duplex.js": 19, "./lib/_stream_passthrough.js": 20, "./lib/_stream_readable.js": 21, "./lib/_stream_transform.js": 22, "./lib/_stream_writable.js": 23 }], 27: [function (e, t) {
      t.exports = e("./lib/_stream_transform.js");
    }, { "./lib/_stream_transform.js": 22 }], 28: [function (e, t) {
      t.exports = e("./lib/_stream_writable.js");
    }, { "./lib/_stream_writable.js": 23 }], 29: [function (e, t) {
      function r() {
        n.call(this);
      }t.exports = r;var n = e("events").EventEmitter,
          i = e("inherits");i(r, n), r.Readable = e("readable-stream/readable.js"), r.Writable = e("readable-stream/writable.js"), r.Duplex = e("readable-stream/duplex.js"), r.Transform = e("readable-stream/transform.js"), r.PassThrough = e("readable-stream/passthrough.js"), r.Stream = r, r.prototype.pipe = function (e, t) {
        function r(t) {
          e.writable && !1 === e.write(t) && f.pause && f.pause();
        }function i() {
          f.readable && f.resume && f.resume();
        }function o() {
          h || (h = !0, e.end());
        }function s() {
          h || (h = !0, "function" == typeof e.destroy && e.destroy());
        }function a(e) {
          if (u(), 0 === n.listenerCount(this, "error")) throw e;
        }function u() {
          f.removeListener("data", r), e.removeListener("drain", i), f.removeListener("end", o), f.removeListener("close", s), f.removeListener("error", a), e.removeListener("error", a), f.removeListener("end", u), f.removeListener("close", u), e.removeListener("close", u);
        }var f = this;f.on("data", r), e.on("drain", i), e._isStdio || t && t.end === !1 || (f.on("end", o), f.on("close", s));var h = !1;return f.on("error", a), e.on("error", a), f.on("end", u), f.on("close", u), e.on("close", u), e.emit("pipe", f), e;
      };
    }, { events: 7, inherits: 10, "readable-stream/duplex.js": 18, "readable-stream/passthrough.js": 25, "readable-stream/readable.js": 26, "readable-stream/transform.js": 27, "readable-stream/writable.js": 28 }], 30: [function (e, t, r) {
      (function (t) {
        var n = e("./lib/request"),
            i = e("xtend"),
            o = e("builtin-status-codes"),
            s = e("url"),
            a = r;a.request = function (e, r) {
          e = "string" == typeof e ? s.parse(e) : i(e);var o = -1 === t.location.protocol.search(/^https?:$/) ? "http:" : "",
              a = e.protocol || o,
              u = e.hostname || e.host,
              f = e.port,
              h = e.path || "/";u && -1 !== u.indexOf(":") && (u = "[" + u + "]"), e.url = (u ? a + "//" + u : "") + (f ? ":" + f : "") + h, e.method = (e.method || "GET").toUpperCase(), e.headers = e.headers || {};var c = new n(e);return r && c.on("response", r), c;
        }, a.get = function (e, t) {
          var r = a.request(e, t);return r.end(), r;
        }, a.Agent = function () {}, a.Agent.defaultMaxSockets = 4, a.STATUS_CODES = o, a.METHODS = ["CHECKOUT", "CONNECT", "COPY", "DELETE", "GET", "HEAD", "LOCK", "M-SEARCH", "MERGE", "MKACTIVITY", "MKCOL", "MOVE", "NOTIFY", "OPTIONS", "PATCH", "POST", "PROPFIND", "PROPPATCH", "PURGE", "PUT", "REPORT", "SEARCH", "SUBSCRIBE", "TRACE", "UNLOCK", "UNSUBSCRIBE"];
      }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    }, { "./lib/request": 32, "builtin-status-codes": 5, url: 36, xtend: 39 }], 31: [function (e, t, r) {
      (function (e) {
        function t(e) {
          try {
            return o.responseType = e, o.responseType === e;
          } catch (t) {}return !1;
        }function n(e) {
          return "function" == typeof e;
        }r.fetch = n(e.fetch) && n(e.ReadableByteStream), r.blobConstructor = !1;try {
          new Blob([new ArrayBuffer(1)]), r.blobConstructor = !0;
        } catch (i) {}var o = new e.XMLHttpRequest();o.open("GET", e.location.host ? "/" : "https://example.com");var s = "undefined" != typeof e.ArrayBuffer,
            a = s && n(e.ArrayBuffer.prototype.slice);r.arraybuffer = s && t("arraybuffer"), r.msstream = !r.fetch && a && t("ms-stream"), r.mozchunkedarraybuffer = !r.fetch && s && t("moz-chunked-arraybuffer"), r.overrideMimeType = n(o.overrideMimeType), r.vbArray = n(e.VBArray), o = null;
      }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    }, {}], 32: [function (e, t) {
      (function (r, n, i) {
        function o(e) {
          return a.fetch ? "fetch" : a.mozchunkedarraybuffer ? "moz-chunked-arraybuffer" : a.msstream ? "ms-stream" : a.arraybuffer && e ? "arraybuffer" : a.vbArray && e ? "text:vbarray" : "text";
        }function s(e) {
          try {
            var t = e.status;return null !== t && 0 !== t;
          } catch (r) {
            return !1;
          }
        }var a = e("./capability"),
            u = e("inherits"),
            f = e("./response"),
            h = e("stream"),
            c = e("to-arraybuffer"),
            l = f.IncomingMessage,
            p = f.readyStates,
            d = t.exports = function (e) {
          var t = this;h.Writable.call(t), t._opts = e, t._body = [], t._headers = {}, e.auth && t.setHeader("Authorization", "Basic " + new i(e.auth).toString("base64")), Object.keys(e.headers).forEach(function (r) {
            t.setHeader(r, e.headers[r]);
          });var r;if ("prefer-streaming" === e.mode) r = !1;else if ("allow-wrong-content-type" === e.mode) r = !a.overrideMimeType;else {
            if (e.mode && "default" !== e.mode && "prefer-fast" !== e.mode) throw new Error("Invalid value for opts.mode");r = !0;
          }t._mode = o(r), t.on("finish", function () {
            t._onFinish();
          });
        };u(d, h.Writable), d.prototype.setHeader = function (e, t) {
          var r = this,
              n = e.toLowerCase();-1 === g.indexOf(n) && (r._headers[n] = { name: e, value: t });
        }, d.prototype.getHeader = function (e) {
          var t = this;return t._headers[e.toLowerCase()].value;
        }, d.prototype.removeHeader = function (e) {
          var t = this;delete t._headers[e.toLowerCase()];
        }, d.prototype._onFinish = function () {
          var e = this;if (!e._destroyed) {
            var t,
                o = e._opts,
                s = e._headers;if (("POST" === o.method || "PUT" === o.method || "PATCH" === o.method) && (t = a.blobConstructor ? new n.Blob(e._body.map(function (e) {
              return c(e);
            }), { type: (s["content-type"] || {}).value || "" }) : i.concat(e._body).toString()), "fetch" === e._mode) {
              var u = Object.keys(s).map(function (e) {
                return [s[e].name, s[e].value];
              });n.fetch(e._opts.url, { method: e._opts.method, headers: u, body: t, mode: "cors", credentials: o.withCredentials ? "include" : "same-origin" }).then(function (t) {
                e._fetchResponse = t, e._connect();
              }, function (t) {
                e.emit("error", t);
              });
            } else {
              var f = e._xhr = new n.XMLHttpRequest();try {
                f.open(e._opts.method, e._opts.url, !0);
              } catch (h) {
                return void r.nextTick(function () {
                  e.emit("error", h);
                });
              }"responseType" in f && (f.responseType = e._mode.split(":")[0]), "withCredentials" in f && (f.withCredentials = !!o.withCredentials), "text" === e._mode && "overrideMimeType" in f && f.overrideMimeType("text/plain; charset=x-user-defined"), Object.keys(s).forEach(function (e) {
                f.setRequestHeader(s[e].name, s[e].value);
              }), e._response = null, f.onreadystatechange = function () {
                switch (f.readyState) {case p.LOADING:case p.DONE:
                    e._onXHRProgress();}
              }, "moz-chunked-arraybuffer" === e._mode && (f.onprogress = function () {
                e._onXHRProgress();
              }), f.onerror = function () {
                e._destroyed || e.emit("error", new Error("XHR error"));
              };try {
                f.send(t);
              } catch (h) {
                return void r.nextTick(function () {
                  e.emit("error", h);
                });
              }
            }
          }
        }, d.prototype._onXHRProgress = function () {
          var e = this;s(e._xhr) && !e._destroyed && (e._response || e._connect(), e._response._onXHRProgress());
        }, d.prototype._connect = function () {
          var e = this;e._destroyed || (e._response = new l(e._xhr, e._fetchResponse, e._mode), e.emit("response", e._response));
        }, d.prototype._write = function (e, t, r) {
          var n = this;n._body.push(e), r();
        }, d.prototype.abort = d.prototype.destroy = function () {
          var e = this;e._destroyed = !0, e._response && (e._response._destroyed = !0), e._xhr && e._xhr.abort();
        }, d.prototype.end = function (e, t, r) {
          var n = this;"function" == typeof e && (r = e, e = void 0), h.Writable.prototype.end.call(n, e, t, r);
        }, d.prototype.flushHeaders = function () {}, d.prototype.setTimeout = function () {}, d.prototype.setNoDelay = function () {}, d.prototype.setSocketKeepAlive = function () {};var g = ["accept-charset", "accept-encoding", "access-control-request-headers", "access-control-request-method", "connection", "content-length", "cookie", "cookie2", "date", "dnt", "expect", "host", "keep-alive", "origin", "referer", "te", "trailer", "transfer-encoding", "upgrade", "user-agent", "via"];
      }).call(this, e("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer);
    }, { "./capability": 31, "./response": 33, _process: 13, buffer: 3, inherits: 10, stream: 29, "to-arraybuffer": 35 }], 33: [function (e, t, r) {
      (function (t, n, i) {
        var o = e("./capability"),
            s = e("inherits"),
            a = e("stream"),
            u = r.readyStates = { UNSENT: 0, OPENED: 1, HEADERS_RECEIVED: 2, LOADING: 3, DONE: 4 },
            f = r.IncomingMessage = function (e, r, n) {
          var s = this;if (a.Readable.call(s), s._mode = n, s.headers = {}, s.rawHeaders = [], s.trailers = {}, s.rawTrailers = [], s.on("end", function () {
            t.nextTick(function () {
              s.emit("close");
            });
          }), "fetch" === n) {
            var u, f, h, c;!function () {
              var e = function t() {
                c.read().then(function (e) {
                  if (!s._destroyed) {
                    if (e.done) return void s.push(null);s.push(new i(e.value)), t();
                  }
                });
              };for (s._fetchResponse = r, s.statusCode = r.status, s.statusMessage = r.statusText, h = r.headers[Symbol.iterator](); u = (f = h.next()).value, !f.done;) {
                s.headers[u[0].toLowerCase()] = u[1], s.rawHeaders.push(u[0], u[1]);
              }c = r.body.getReader(), e();
            }();
          } else {
            s._xhr = e, s._pos = 0, s.statusCode = e.status, s.statusMessage = e.statusText;var l = e.getAllResponseHeaders().split(/\r?\n/);if (l.forEach(function (e) {
              var t = e.match(/^([^:]+):\s*(.*)/);if (t) {
                var r = t[1].toLowerCase();"set-cookie" === r ? (void 0 === s.headers[r] && (s.headers[r] = []), s.headers[r].push(t[2])) : void 0 !== s.headers[r] ? s.headers[r] += ", " + t[2] : s.headers[r] = t[2], s.rawHeaders.push(t[1], t[2]);
              }
            }), s._charset = "x-user-defined", !o.overrideMimeType) {
              var p = s.rawHeaders["mime-type"];if (p) {
                var d = p.match(/;\s*charset=([^;])(;|$)/);d && (s._charset = d[1].toLowerCase());
              }s._charset || (s._charset = "utf-8");
            }
          }
        };s(f, a.Readable), f.prototype._read = function () {}, f.prototype._onXHRProgress = function () {
          var e = this,
              t = e._xhr,
              r = null;switch (e._mode) {case "text:vbarray":
              if (t.readyState !== u.DONE) break;try {
                r = new n.VBArray(t.responseBody).toArray();
              } catch (o) {}if (null !== r) {
                e.push(new i(r));break;
              }case "text":
              try {
                r = t.responseText;
              } catch (o) {
                e._mode = "text:vbarray";break;
              }if (r.length > e._pos) {
                var s = r.substr(e._pos);if ("x-user-defined" === e._charset) {
                  for (var a = new i(s.length), f = 0; f < s.length; f++) {
                    a[f] = 255 & s.charCodeAt(f);
                  }e.push(a);
                } else e.push(s, e._charset);e._pos = r.length;
              }break;case "arraybuffer":
              if (t.readyState !== u.DONE) break;r = t.response, e.push(new i(new Uint8Array(r)));break;case "moz-chunked-arraybuffer":
              if (r = t.response, t.readyState !== u.LOADING || !r) break;e.push(new i(new Uint8Array(r)));break;case "ms-stream":
              if (r = t.response, t.readyState !== u.LOADING) break;var h = new n.MSStreamReader();h.onprogress = function () {
                h.result.byteLength > e._pos && (e.push(new i(new Uint8Array(h.result.slice(e._pos)))), e._pos = h.result.byteLength);
              }, h.onload = function () {
                e.push(null);
              }, h.readAsArrayBuffer(r);}e._xhr.readyState === u.DONE && "ms-stream" !== e._mode && e.push(null);
        };
      }).call(this, e("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer);
    }, { "./capability": 31, _process: 13, buffer: 3, inherits: 10, stream: 29 }], 34: [function (e, t, r) {
      function n(e) {
        if (e && !u(e)) throw new Error("Unknown encoding: " + e);
      }function i(e) {
        return e.toString(this.encoding);
      }function o(e) {
        this.charReceived = e.length % 2, this.charLength = this.charReceived ? 2 : 0;
      }function s(e) {
        this.charReceived = e.length % 3, this.charLength = this.charReceived ? 3 : 0;
      }var a = e("buffer").Buffer,
          u = a.isEncoding || function (e) {
        switch (e && e.toLowerCase()) {case "hex":case "utf8":case "utf-8":case "ascii":case "binary":case "base64":case "ucs2":case "ucs-2":case "utf16le":case "utf-16le":case "raw":
            return !0;default:
            return !1;}
      },
          f = r.StringDecoder = function (e) {
        switch (this.encoding = (e || "utf8").toLowerCase().replace(/[-_]/, ""), n(e), this.encoding) {case "utf8":
            this.surrogateSize = 3;break;case "ucs2":case "utf16le":
            this.surrogateSize = 2, this.detectIncompleteChar = o;break;case "base64":
            this.surrogateSize = 3, this.detectIncompleteChar = s;break;default:
            return void (this.write = i);}this.charBuffer = new a(6), this.charReceived = 0, this.charLength = 0;
      };f.prototype.write = function (e) {
        for (var t = ""; this.charLength;) {
          var r = e.length >= this.charLength - this.charReceived ? this.charLength - this.charReceived : e.length;if (e.copy(this.charBuffer, this.charReceived, 0, r), this.charReceived += r, this.charReceived < this.charLength) return "";e = e.slice(r, e.length), t = this.charBuffer.slice(0, this.charLength).toString(this.encoding);var n = t.charCodeAt(t.length - 1);if (!(n >= 55296 && 56319 >= n)) {
            if (this.charReceived = this.charLength = 0, 0 === e.length) return t;break;
          }this.charLength += this.surrogateSize, t = "";
        }this.detectIncompleteChar(e);var i = e.length;this.charLength && (e.copy(this.charBuffer, 0, e.length - this.charReceived, i), i -= this.charReceived), t += e.toString(this.encoding, 0, i);var i = t.length - 1,
            n = t.charCodeAt(i);if (n >= 55296 && 56319 >= n) {
          var o = this.surrogateSize;return this.charLength += o, this.charReceived += o, this.charBuffer.copy(this.charBuffer, o, 0, o), e.copy(this.charBuffer, 0, 0, o), t.substring(0, i);
        }return t;
      }, f.prototype.detectIncompleteChar = function (e) {
        for (var t = e.length >= 3 ? 3 : e.length; t > 0; t--) {
          var r = e[e.length - t];if (1 == t && r >> 5 == 6) {
            this.charLength = 2;break;
          }if (2 >= t && r >> 4 == 14) {
            this.charLength = 3;break;
          }if (3 >= t && r >> 3 == 30) {
            this.charLength = 4;break;
          }
        }this.charReceived = t;
      }, f.prototype.end = function (e) {
        var t = "";if (e && e.length && (t = this.write(e)), this.charReceived) {
          var r = this.charReceived,
              n = this.charBuffer,
              i = this.encoding;t += n.slice(0, r).toString(i);
        }return t;
      };
    }, { buffer: 3 }], 35: [function (e, t) {
      var r = e("buffer").Buffer;t.exports = function (e) {
        if (e instanceof Uint8Array) {
          if (0 === e.byteOffset && e.byteLength === e.buffer.byteLength) return e.buffer;if ("function" == typeof e.buffer.slice) return e.buffer.slice(e.byteOffset, e.byteOffset + e.byteLength);
        }if (r.isBuffer(e)) {
          for (var t = new Uint8Array(e.length), n = e.length, i = 0; n > i; i++) {
            t[i] = e[i];
          }return t.buffer;
        }throw new Error("Argument must be a Buffer");
      };
    }, { buffer: 3 }], 36: [function (e, t, r) {
      function n() {
        this.protocol = null, this.slashes = null, this.auth = null, this.host = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.query = null, this.pathname = null, this.path = null, this.href = null;
      }function i(e, t, r) {
        if (e && f.isObject(e) && e instanceof n) return e;var i = new n();return i.parse(e, t, r), i;
      }function o(e) {
        return f.isString(e) && (e = i(e)), e instanceof n ? e.format() : n.prototype.format.call(e);
      }function s(e, t) {
        return i(e, !1, !0).resolve(t);
      }function a(e, t) {
        return e ? i(e, !1, !0).resolveObject(t) : t;
      }var u = e("punycode"),
          f = e("./util");r.parse = i, r.resolve = s, r.resolveObject = a, r.format = o, r.Url = n;var h = /^([a-z0-9.+-]+:)/i,
          c = /:[0-9]*$/,
          l = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,
          p = ["<", ">", '"', "`", " ", "\r", "\n", "	"],
          d = ["{", "}", "|", "\\", "^", "`"].concat(p),
          g = ["'"].concat(d),
          y = ["%", "/", "?", ";", "#"].concat(g),
          v = ["/", "?", "#"],
          m = 255,
          b = /^[+a-z0-9A-Z_-]{0,63}$/,
          w = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
          _ = { javascript: !0, "javascript:": !0 },
          R = { javascript: !0, "javascript:": !0 },
          E = { http: !0, https: !0, ftp: !0, gopher: !0, file: !0, "http:": !0, "https:": !0, "ftp:": !0, "gopher:": !0, "file:": !0 },
          S = e("querystring");n.prototype.parse = function (e, t, r) {
        if (!f.isString(e)) throw new TypeError("Parameter 'url' must be a string, not " + ("undefined" == typeof e ? "undefined" : _typeof(e)));var n = e.indexOf("?"),
            i = -1 !== n && n < e.indexOf("#") ? "?" : "#",
            o = e.split(i),
            s = /\\/g;o[0] = o[0].replace(s, "/"), e = o.join(i);var a = e;if (a = a.trim(), !r && 1 === e.split("#").length) {
          var c = l.exec(a);if (c) return this.path = a, this.href = a, this.pathname = c[1], c[2] ? (this.search = c[2], this.query = t ? S.parse(this.search.substr(1)) : this.search.substr(1)) : t && (this.search = "", this.query = {}), this;
        }var p = h.exec(a);if (p) {
          p = p[0];var d = p.toLowerCase();this.protocol = d, a = a.substr(p.length);
        }if (r || p || a.match(/^\/\/[^@\/]+@[^@\/]+/)) {
          var x = "//" === a.substr(0, 2);!x || p && R[p] || (a = a.substr(2), this.slashes = !0);
        }if (!R[p] && (x || p && !E[p])) {
          for (var A = -1, C = 0; C < v.length; C++) {
            var T = a.indexOf(v[C]);-1 !== T && (-1 === A || A > T) && (A = T);
          }var k, O;O = -1 === A ? a.lastIndexOf("@") : a.lastIndexOf("@", A), -1 !== O && (k = a.slice(0, O), a = a.slice(O + 1), this.auth = decodeURIComponent(k)), A = -1;for (var C = 0; C < y.length; C++) {
            var T = a.indexOf(y[C]);-1 !== T && (-1 === A || A > T) && (A = T);
          }-1 === A && (A = a.length), this.host = a.slice(0, A), a = a.slice(A), this.parseHost(), this.hostname = this.hostname || "";var L = "[" === this.hostname[0] && "]" === this.hostname[this.hostname.length - 1];if (!L) for (var j = this.hostname.split(/\./), C = 0, M = j.length; M > C; C++) {
            var P = j[C];if (P && !P.match(b)) {
              for (var B = "", U = 0, q = P.length; q > U; U++) {
                B += P.charCodeAt(U) > 127 ? "x" : P[U];
              }if (!B.match(b)) {
                var I = j.slice(0, C),
                    D = j.slice(C + 1),
                    N = P.match(w);N && (I.push(N[1]), D.unshift(N[2])), D.length && (a = "/" + D.join(".") + a), this.hostname = I.join(".");break;
              }
            }
          }this.hostname = this.hostname.length > m ? "" : this.hostname.toLowerCase(), L || (this.hostname = u.toASCII(this.hostname));var Y = this.port ? ":" + this.port : "",
              H = this.hostname || "";this.host = H + Y, this.href += this.host, L && (this.hostname = this.hostname.substr(1, this.hostname.length - 2), "/" !== a[0] && (a = "/" + a));
        }if (!_[d]) for (var C = 0, M = g.length; M > C; C++) {
          var F = g[C];if (-1 !== a.indexOf(F)) {
            var W = encodeURIComponent(F);W === F && (W = escape(F)), a = a.split(F).join(W);
          }
        }var z = a.indexOf("#");-1 !== z && (this.hash = a.substr(z), a = a.slice(0, z));var G = a.indexOf("?");if (-1 !== G ? (this.search = a.substr(G), this.query = a.substr(G + 1), t && (this.query = S.parse(this.query)), a = a.slice(0, G)) : t && (this.search = "", this.query = {}), a && (this.pathname = a), E[d] && this.hostname && !this.pathname && (this.pathname = "/"), this.pathname || this.search) {
          var Y = this.pathname || "",
              X = this.search || "";this.path = Y + X;
        }return this.href = this.format(), this;
      }, n.prototype.format = function () {
        var e = this.auth || "";e && (e = encodeURIComponent(e), e = e.replace(/%3A/i, ":"), e += "@");var t = this.protocol || "",
            r = this.pathname || "",
            n = this.hash || "",
            i = !1,
            o = "";this.host ? i = e + this.host : this.hostname && (i = e + (-1 === this.hostname.indexOf(":") ? this.hostname : "[" + this.hostname + "]"), this.port && (i += ":" + this.port)), this.query && f.isObject(this.query) && Object.keys(this.query).length && (o = S.stringify(this.query));var s = this.search || o && "?" + o || "";return t && ":" !== t.substr(-1) && (t += ":"), this.slashes || (!t || E[t]) && i !== !1 ? (i = "//" + (i || ""), r && "/" !== r.charAt(0) && (r = "/" + r)) : i || (i = ""), n && "#" !== n.charAt(0) && (n = "#" + n), s && "?" !== s.charAt(0) && (s = "?" + s), r = r.replace(/[?#]/g, function (e) {
          return encodeURIComponent(e);
        }), s = s.replace("#", "%23"), t + i + r + s + n;
      }, n.prototype.resolve = function (e) {
        return this.resolveObject(i(e, !1, !0)).format();
      }, n.prototype.resolveObject = function (e) {
        if (f.isString(e)) {
          var t = new n();t.parse(e, !1, !0), e = t;
        }for (var r = new n(), i = Object.keys(this), o = 0; o < i.length; o++) {
          var s = i[o];r[s] = this[s];
        }if (r.hash = e.hash, "" === e.href) return r.href = r.format(), r;if (e.slashes && !e.protocol) {
          for (var a = Object.keys(e), u = 0; u < a.length; u++) {
            var h = a[u];"protocol" !== h && (r[h] = e[h]);
          }return E[r.protocol] && r.hostname && !r.pathname && (r.path = r.pathname = "/"), r.href = r.format(), r;
        }if (e.protocol && e.protocol !== r.protocol) {
          if (!E[e.protocol]) {
            for (var c = Object.keys(e), l = 0; l < c.length; l++) {
              var p = c[l];r[p] = e[p];
            }return r.href = r.format(), r;
          }if (r.protocol = e.protocol, e.host || R[e.protocol]) r.pathname = e.pathname;else {
            for (var d = (e.pathname || "").split("/"); d.length && !(e.host = d.shift());) {}e.host || (e.host = ""), e.hostname || (e.hostname = ""), "" !== d[0] && d.unshift(""), d.length < 2 && d.unshift(""), r.pathname = d.join("/");
          }if (r.search = e.search, r.query = e.query, r.host = e.host || "", r.auth = e.auth, r.hostname = e.hostname || e.host, r.port = e.port, r.pathname || r.search) {
            var g = r.pathname || "",
                y = r.search || "";r.path = g + y;
          }return r.slashes = r.slashes || e.slashes, r.href = r.format(), r;
        }var v = r.pathname && "/" === r.pathname.charAt(0),
            m = e.host || e.pathname && "/" === e.pathname.charAt(0),
            b = m || v || r.host && e.pathname,
            w = b,
            _ = r.pathname && r.pathname.split("/") || [],
            d = e.pathname && e.pathname.split("/") || [],
            S = r.protocol && !E[r.protocol];if (S && (r.hostname = "", r.port = null, r.host && ("" === _[0] ? _[0] = r.host : _.unshift(r.host)), r.host = "", e.protocol && (e.hostname = null, e.port = null, e.host && ("" === d[0] ? d[0] = e.host : d.unshift(e.host)), e.host = null), b = b && ("" === d[0] || "" === _[0])), m) r.host = e.host || "" === e.host ? e.host : r.host, r.hostname = e.hostname || "" === e.hostname ? e.hostname : r.hostname, r.search = e.search, r.query = e.query, _ = d;else if (d.length) _ || (_ = []), _.pop(), _ = _.concat(d), r.search = e.search, r.query = e.query;else if (!f.isNullOrUndefined(e.search)) {
          if (S) {
            r.hostname = r.host = _.shift();var x = r.host && r.host.indexOf("@") > 0 ? r.host.split("@") : !1;x && (r.auth = x.shift(), r.host = r.hostname = x.shift());
          }return r.search = e.search, r.query = e.query, f.isNull(r.pathname) && f.isNull(r.search) || (r.path = (r.pathname ? r.pathname : "") + (r.search ? r.search : "")), r.href = r.format(), r;
        }if (!_.length) return r.pathname = null, r.path = r.search ? "/" + r.search : null, r.href = r.format(), r;for (var A = _.slice(-1)[0], C = (r.host || e.host || _.length > 1) && ("." === A || ".." === A) || "" === A, T = 0, k = _.length; k >= 0; k--) {
          A = _[k], "." === A ? _.splice(k, 1) : ".." === A ? (_.splice(k, 1), T++) : T && (_.splice(k, 1), T--);
        }if (!b && !w) for (; T--; T) {
          _.unshift("..");
        }!b || "" === _[0] || _[0] && "/" === _[0].charAt(0) || _.unshift(""), C && "/" !== _.join("/").substr(-1) && _.push("");var O = "" === _[0] || _[0] && "/" === _[0].charAt(0);if (S) {
          r.hostname = r.host = O ? "" : _.length ? _.shift() : "";var x = r.host && r.host.indexOf("@") > 0 ? r.host.split("@") : !1;x && (r.auth = x.shift(), r.host = r.hostname = x.shift());
        }return b = b || r.host && _.length, b && !O && _.unshift(""), _.length ? r.pathname = _.join("/") : (r.pathname = null, r.path = null), f.isNull(r.pathname) && f.isNull(r.search) || (r.path = (r.pathname ? r.pathname : "") + (r.search ? r.search : "")), r.auth = e.auth || r.auth, r.slashes = r.slashes || e.slashes, r.href = r.format(), r;
      }, n.prototype.parseHost = function () {
        var e = this.host,
            t = c.exec(e);t && (t = t[0], ":" !== t && (this.port = t.substr(1)), e = e.substr(0, e.length - t.length)), e && (this.hostname = e);
      };
    }, { "./util": 37, punycode: 14, querystring: 17 }], 37: [function (e, t) {
      t.exports = { isString: function isString(e) {
          return "string" == typeof e;
        }, isObject: function isObject(e) {
          return "object" === ("undefined" == typeof e ? "undefined" : _typeof(e)) && null !== e;
        }, isNull: function isNull(e) {
          return null === e;
        }, isNullOrUndefined: function isNullOrUndefined(e) {
          return null == e;
        } };
    }, {}], 38: [function (e, t) {
      (function (e) {
        function r(e, t) {
          function r() {
            if (!i) {
              if (n("throwDeprecation")) throw new Error(t);n("traceDeprecation") ? console.trace(t) : console.warn(t), i = !0;
            }return e.apply(this, arguments);
          }if (n("noDeprecation")) return e;var i = !1;return r;
        }function n(t) {
          try {
            if (!e.localStorage) return !1;
          } catch (r) {
            return !1;
          }var n = e.localStorage[t];return null == n ? !1 : "true" === String(n).toLowerCase();
        }t.exports = r;
      }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    }, {}], 39: [function (e, t) {
      function r() {
        for (var e = {}, t = 0; t < arguments.length; t++) {
          var r = arguments[t];for (var i in r) {
            n.call(r, i) && (e[i] = r[i]);
          }
        }return e;
      }t.exports = r;var n = Object.prototype.hasOwnProperty;
    }, {}], 40: [function (e, t) {
      var r = e("ul"),
          n = e("jsonrequest"),
          i = e("querystring"),
          o = e("last-char");t.exports = function () {
        function e(t) {
          _classCallCheck(this, e), "string" == typeof t && (t = { token: t }), t = t || {}, this.host = t.host || "https://api.github.com/", this.token = t.token, this.user_agent = t.user_agent || "gh.js";
        }return _createClass(e, [{ key: "req", value: function value(e, t, s) {
            var a = this;if (e = this.host + e, "/" === o(e)) throw new Error("Do not add the trailing slash at the end of the string.");t = t || {}, t.opts = t.opts || {}, this.token && (t.opts.access_token = t.opts.access_token || this.token), "function" == typeof data && (s = data, data = void 0);var u = i.stringify(t.opts);u && (e += "?" + u);var f = { url: e, data: t.data, headers: { "User-agent": this.user_agent } };return t.method && (f.method = t.method), t.req_options && (f = r.deepMerge(f, t.req_options)), n(f, function (e, t, r) {
              a.checkResponse(e, t, r, s);
            });
          } }, { key: "checkResponse", value: function value(e, t, r, n) {
            return 204 === r.statusCode ? n(null, {}, r) : ("string" == typeof t && (t = JSON.parse(t)), e ? n(e, null, r) : 200 === r.statusCode ? n(null, t, r) : t.message ? n(t.message, null, r) : n(null, t, r));
          } }, { key: "get", value: function value(e, t, n) {
            var i = this,
                o = 1;if ("function" == typeof t && (n = t, t = {}), t = r.merge(t, { opts: {} }), t.all) {
              var s = function () {
                var r = [];t.opts.per_page = 100, delete t.all;var s = function a() {
                  return t.opts.page = o, i.req(e, t, function (e, i, s) {
                    return e ? n(e) : (r = r.concat(i), "function" == typeof t.all && t.all(e, i, o, s), i && i.length ? (++o, void a()) : n(null, r));
                  });
                };return { v: s() };
              }();if ("object" === ("undefined" == typeof s ? "undefined" : _typeof(s))) return s.v;
            }return this.req(e, t, n);
          } }]), e;
      }();
    }, { jsonrequest: 42, "last-char": 43, querystring: 17, ul: 46 }], 41: [function (e, t) {
      function r(e, t, r) {
        return "function" == typeof t ? t(e) : (r = "boolean" === n(r) ? { empty: r } : { empty: !1 }, r.empty ? e || t : n(e) === n(t) ? e : t);
      }var n = e("typpy");t.exports = r;
    }, { typpy: 45 }], 42: [function (e, t) {
      var r = e("tinyreq"),
          n = e("ul");t.exports = function (e, t, i) {
        return "string" == typeof e && (e = { url: e }), "function" == typeof t && (i = t, t = void 0), e.data = e.data || t, "object" === _typeof(e.data) && (e.data = JSON.stringify(e.data)), e = n.deepMerge(e, { headers: { "Content-Type": "application/json" } }), r(e, function (e, t, r) {
          if (e) return i(e, t, r);if (t) try {
            t = JSON.parse(t);
          } catch (n) {
            return i(n, t, r);
          }i(null, t, r);
        });
      };
    }, { tinyreq: 44, ul: 46 }], 43: [function (e, t) {
      function r(e) {
        if ("string" != typeof e) throw new TypeError("Expected a string.");return e.charAt(e.length - 1);
      }t.exports = r;
    }, {}], 44: [function (e, t) {
      (function (r) {
        var n = e("http"),
            i = e("https"),
            o = e("ul"),
            s = e("url"),
            a = e("querystring"),
            u = e("events"),
            f = u.EventEmitter;t.exports = function (e, t) {
          "string" == typeof e && (e = { url: e });var u = s.parse(e.url),
              h = o.clone(u),
              c = null,
              l = !1,
              p = "";e = o.deepMerge(e, h, { method: e.method ? e.method : e.data ? "POST" : "GET", headers: {} });var d = function d(e, r, n) {
            l || (l = !0, "function" == typeof t && t(e, r, n));
          };e.data && e.data.constructor === Object && (e.data = a.stringify(e.data)), "string" == typeof e.data && (e.headers["Content-Length"] = r.byteLength(e.data));var g = new f();return c = ("http:" === e.protocol ? n : i).request(e, function (e) {
            e.setEncoding("utf8"), p = "", "function" == typeof t && e.on("data", function (e) {
              p += e.toString();
            }), e.on("data", function (e) {
              g.emit("data", e);
            }).on("error", function (t) {
              g.emit("error", t), d(t, null, e);
            }).on("end", function () {
              g.emit("end"), d(null, p, e);
            });
          }).on("error", function (e) {
            d(e, null, null);
          }), e.data && c.write(e.data), c.end(), g;
        };
      }).call(this, e("buffer").Buffer);
    }, { buffer: 3, events: 7, http: 30, https: 8, querystring: 17, ul: 46, url: 36 }], 45: [function (e, t) {
      function r(e) {
        return "string" == typeof e ? "string" : null === e ? "null" : void 0 === e ? "undefined" : e.constructor.name.toLowerCase();
      }t.exports = r;
    }, {}], 46: [function (e, t) {
      (function (r) {
        function n() {}var i = e("typpy"),
            o = e("deffy");n.prototype.merge = function (e, t) {
          var r = {},
              n = null;t = o(t, {}), e = o(e, {});for (n in t) {
            r[n] = t[n];
          }for (n in e) {
            void 0 !== e[n] && (r[n] = e[n]);
          }return r;
        }, n.prototype.deepMerge = function () {
          for (var e, t, r = {}, n = [].splice.call(arguments, 0); n.length > 0;) {
            if (e = n.splice(-1)[0], "object" === i(e)) for (t in e) {
              e.hasOwnProperty(t) && ("object" === i(e[t]) ? r[t] = this.deepMerge(e[t], r[t] || {}) : void 0 !== e[t] && (r[t] = e[t]));
            }
          }return r;
        }, n.prototype.clone = function (e) {
          if (!e) return e;var t,
              r,
              n = this,
              i = [Number, String, Boolean];if (i.forEach(function (r) {
            e instanceof r && (t = r(e));
          }), "undefined" == typeof t) if (Array.isArray(e)) t = [], e.forEach(function (e, r) {
            t[r] = n.clone(e);
          });else if ("object" == ("undefined" == typeof e ? "undefined" : _typeof(e))) {
            if (e.prototype) t = e;else if (e instanceof Date) t = new Date(e);else {
              t = {};for (r in e) {
                t[r] = n.clone(e[r]);
              }
            }
          } else t = e;return t;
        }, n.prototype.HOME_DIR = r.env["win32" == r.platform ? "USERPROFILE" : "HOME"], n.prototype.home = function () {
          return this.HOME_DIR;
        }, t.exports = new n();
      }).call(this, e("_process"));
    }, { _process: 13, deffy: 41, typpy: 45 }] }, {}, [40])(40);
});