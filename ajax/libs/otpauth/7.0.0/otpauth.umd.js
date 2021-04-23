/*! otpauth v7.0.0 | (c) Héctor Molinero Fernández <hector@molinero.dev> | MIT | https://github.com/hectorm/otpauth */
/*! jssha v3.2.0 | (c) Brian Turek <brian.turek@gmail.com> | BSD-3-Clause | https://github.com/Caligatio/jsSHA */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.OTPAuth = {}));
}(this, (function (exports) { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  /**
   * Converts an integer to an ArrayBuffer.
   * @param {number} num Integer.
   * @returns {ArrayBuffer} ArrayBuffer.
   */
  var uintToBuf = function uintToBuf(num) {
    var buf = new ArrayBuffer(8);
    var arr = new Uint8Array(buf);
    var acc = num;

    for (var i = 7; i >= 0; i--) {
      if (acc === 0) break;
      arr[i] = acc & 255;
      acc -= arr[i];
      acc /= 256;
    }

    return buf;
  };

  /**
   * A JavaScript implementation of the SHA family of hashes - defined in FIPS PUB 180-4, FIPS PUB 202,
   * and SP 800-185 - as well as the corresponding HMAC implementation as defined in FIPS PUB 198-1.
   *
   * Copyright 2008-2020 Brian Turek, 1998-2009 Paul Johnston & Contributors
   * Distributed under the BSD License
   * See http://caligatio.github.com/jsSHA/ for more information
   */
  var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

  function n(t, n, e, r) {
    var i, s, o;
    var h = n || [0],
        u = (e = e || 0) >>> 3,
        w = -1 === r ? 3 : 0;

    for (i = 0; i < t.length; i += 1) {
      o = i + u, s = o >>> 2, h.length <= s && h.push(0), h[s] |= t[i] << 8 * (w + r * (o % 4));
    }

    return {
      value: h,
      binLen: 8 * t.length + e
    };
  }

  function e(e, r, i) {
    switch (r) {
      case "UTF8":
      case "UTF16BE":
      case "UTF16LE":
        break;

      default:
        throw new Error("encoding must be UTF8, UTF16BE, or UTF16LE");
    }

    switch (e) {
      case "HEX":
        return function (t, n, e) {
          return function (t, n, e, r) {
            var i, s, o, h;
            if (0 != t.length % 2) throw new Error("String of HEX type must be in byte increments");
            var u = n || [0],
                w = (e = e || 0) >>> 3,
                c = -1 === r ? 3 : 0;

            for (i = 0; i < t.length; i += 2) {
              if (s = parseInt(t.substr(i, 2), 16), isNaN(s)) throw new Error("String of HEX type contains invalid characters");

              for (h = (i >>> 1) + w, o = h >>> 2; u.length <= o;) {
                u.push(0);
              }

              u[o] |= s << 8 * (c + r * (h % 4));
            }

            return {
              value: u,
              binLen: 4 * t.length + e
            };
          }(t, n, e, i);
        };

      case "TEXT":
        return function (t, n, e) {
          return function (t, n, e, r, i) {
            var s,
                o,
                h,
                u,
                w,
                c,
                f,
                a,
                l = 0;
            var A = e || [0],
                E = (r = r || 0) >>> 3;
            if ("UTF8" === n) for (f = -1 === i ? 3 : 0, h = 0; h < t.length; h += 1) {
              for (s = t.charCodeAt(h), o = [], 128 > s ? o.push(s) : 2048 > s ? (o.push(192 | s >>> 6), o.push(128 | 63 & s)) : 55296 > s || 57344 <= s ? o.push(224 | s >>> 12, 128 | s >>> 6 & 63, 128 | 63 & s) : (h += 1, s = 65536 + ((1023 & s) << 10 | 1023 & t.charCodeAt(h)), o.push(240 | s >>> 18, 128 | s >>> 12 & 63, 128 | s >>> 6 & 63, 128 | 63 & s)), u = 0; u < o.length; u += 1) {
                for (c = l + E, w = c >>> 2; A.length <= w;) {
                  A.push(0);
                }

                A[w] |= o[u] << 8 * (f + i * (c % 4)), l += 1;
              }
            } else for (f = -1 === i ? 2 : 0, a = "UTF16LE" === n && 1 !== i || "UTF16LE" !== n && 1 === i, h = 0; h < t.length; h += 1) {
              for (s = t.charCodeAt(h), !0 === a && (u = 255 & s, s = u << 8 | s >>> 8), c = l + E, w = c >>> 2; A.length <= w;) {
                A.push(0);
              }

              A[w] |= s << 8 * (f + i * (c % 4)), l += 2;
            }
            return {
              value: A,
              binLen: 8 * l + r
            };
          }(t, r, n, e, i);
        };

      case "B64":
        return function (n, e, r) {
          return function (n, e, r, i) {
            var s,
                o,
                h,
                u,
                w,
                c,
                f,
                a = 0;
            var l = e || [0],
                A = (r = r || 0) >>> 3,
                E = -1 === i ? 3 : 0,
                H = n.indexOf("=");
            if (-1 === n.search(/^[a-zA-Z0-9=+/]+$/)) throw new Error("Invalid character in base-64 string");
            if (n = n.replace(/=/g, ""), -1 !== H && H < n.length) throw new Error("Invalid '=' found in base-64 string");

            for (o = 0; o < n.length; o += 4) {
              for (w = n.substr(o, 4), u = 0, h = 0; h < w.length; h += 1) {
                s = t.indexOf(w.charAt(h)), u |= s << 18 - 6 * h;
              }

              for (h = 0; h < w.length - 1; h += 1) {
                for (f = a + A, c = f >>> 2; l.length <= c;) {
                  l.push(0);
                }

                l[c] |= (u >>> 16 - 8 * h & 255) << 8 * (E + i * (f % 4)), a += 1;
              }
            }

            return {
              value: l,
              binLen: 8 * a + r
            };
          }(n, e, r, i);
        };

      case "BYTES":
        return function (t, n, e) {
          return function (t, n, e, r) {
            var i, s, o, h;
            var u = n || [0],
                w = (e = e || 0) >>> 3,
                c = -1 === r ? 3 : 0;

            for (s = 0; s < t.length; s += 1) {
              i = t.charCodeAt(s), h = s + w, o = h >>> 2, u.length <= o && u.push(0), u[o] |= i << 8 * (c + r * (h % 4));
            }

            return {
              value: u,
              binLen: 8 * t.length + e
            };
          }(t, n, e, i);
        };

      case "ARRAYBUFFER":
        try {
          new ArrayBuffer(0);
        } catch (t) {
          throw new Error("ARRAYBUFFER not supported by this environment");
        }

        return function (t, e, r) {
          return function (t, e, r, i) {
            return n(new Uint8Array(t), e, r, i);
          }(t, e, r, i);
        };

      case "UINT8ARRAY":
        try {
          new Uint8Array(0);
        } catch (t) {
          throw new Error("UINT8ARRAY not supported by this environment");
        }

        return function (t, e, r) {
          return n(t, e, r, i);
        };

      default:
        throw new Error("format must be HEX, TEXT, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY");
    }
  }

  function r(n, e, r, i) {
    switch (n) {
      case "HEX":
        return function (t) {
          return function (t, n, e, r) {
            var i,
                s,
                o = "";
            var h = n / 8,
                u = -1 === e ? 3 : 0;

            for (i = 0; i < h; i += 1) {
              s = t[i >>> 2] >>> 8 * (u + e * (i % 4)), o += "0123456789abcdef".charAt(s >>> 4 & 15) + "0123456789abcdef".charAt(15 & s);
            }

            return r.outputUpper ? o.toUpperCase() : o;
          }(t, e, r, i);
        };

      case "B64":
        return function (n) {
          return function (n, e, r, i) {
            var s,
                o,
                h,
                u,
                w,
                c = "";
            var f = e / 8,
                a = -1 === r ? 3 : 0;

            for (s = 0; s < f; s += 3) {
              for (u = s + 1 < f ? n[s + 1 >>> 2] : 0, w = s + 2 < f ? n[s + 2 >>> 2] : 0, h = (n[s >>> 2] >>> 8 * (a + r * (s % 4)) & 255) << 16 | (u >>> 8 * (a + r * ((s + 1) % 4)) & 255) << 8 | w >>> 8 * (a + r * ((s + 2) % 4)) & 255, o = 0; o < 4; o += 1) {
                c += 8 * s + 6 * o <= e ? t.charAt(h >>> 6 * (3 - o) & 63) : i.b64Pad;
              }
            }

            return c;
          }(n, e, r, i);
        };

      case "BYTES":
        return function (t) {
          return function (t, n, e) {
            var r,
                i,
                s = "";
            var o = n / 8,
                h = -1 === e ? 3 : 0;

            for (r = 0; r < o; r += 1) {
              i = t[r >>> 2] >>> 8 * (h + e * (r % 4)) & 255, s += String.fromCharCode(i);
            }

            return s;
          }(t, e, r);
        };

      case "ARRAYBUFFER":
        try {
          new ArrayBuffer(0);
        } catch (t) {
          throw new Error("ARRAYBUFFER not supported by this environment");
        }

        return function (t) {
          return function (t, n, e) {
            var r;
            var i = n / 8,
                s = new ArrayBuffer(i),
                o = new Uint8Array(s),
                h = -1 === e ? 3 : 0;

            for (r = 0; r < i; r += 1) {
              o[r] = t[r >>> 2] >>> 8 * (h + e * (r % 4)) & 255;
            }

            return s;
          }(t, e, r);
        };

      case "UINT8ARRAY":
        try {
          new Uint8Array(0);
        } catch (t) {
          throw new Error("UINT8ARRAY not supported by this environment");
        }

        return function (t) {
          return function (t, n, e) {
            var r;
            var i = n / 8,
                s = -1 === e ? 3 : 0,
                o = new Uint8Array(i);

            for (r = 0; r < i; r += 1) {
              o[r] = t[r >>> 2] >>> 8 * (s + e * (r % 4)) & 255;
            }

            return o;
          }(t, e, r);
        };

      default:
        throw new Error("format must be HEX, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY");
    }
  }

  var i = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298],
      s = [3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428],
      o = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225],
      h = "Chosen SHA variant is not supported";

  function u(t, n) {
    var e, r;
    var i = t.binLen >>> 3,
        s = n.binLen >>> 3,
        o = i << 3,
        h = 4 - i << 3;

    if (i % 4 != 0) {
      for (e = 0; e < s; e += 4) {
        r = i + e >>> 2, t.value[r] |= n.value[e >>> 2] << o, t.value.push(0), t.value[r + 1] |= n.value[e >>> 2] >>> h;
      }

      return (t.value.length << 2) - 4 >= s + i && t.value.pop(), {
        value: t.value,
        binLen: t.binLen + n.binLen
      };
    }

    return {
      value: t.value.concat(n.value),
      binLen: t.binLen + n.binLen
    };
  }

  function w(t) {
    var n = {
      outputUpper: !1,
      b64Pad: "=",
      outputLen: -1
    },
        e = t || {},
        r = "Output length must be a multiple of 8";

    if (n.outputUpper = e.outputUpper || !1, e.b64Pad && (n.b64Pad = e.b64Pad), e.outputLen) {
      if (e.outputLen % 8 != 0) throw new Error(r);
      n.outputLen = e.outputLen;
    } else if (e.shakeLen) {
      if (e.shakeLen % 8 != 0) throw new Error(r);
      n.outputLen = e.shakeLen;
    }

    if ("boolean" != typeof n.outputUpper) throw new Error("Invalid outputUpper formatting option");
    if ("string" != typeof n.b64Pad) throw new Error("Invalid b64Pad formatting option");
    return n;
  }

  function c(t, n, r, i) {
    var s = t + " must include a value and format";

    if (!n) {
      if (!i) throw new Error(s);
      return i;
    }

    if (void 0 === n.value || !n.format) throw new Error(s);
    return e(n.format, n.encoding || "UTF8", r)(n.value);
  }

  var f = /*#__PURE__*/function () {
    function f(t, n, e) {
      _classCallCheck(this, f);

      var r = e || {};
      if (this.t = n, this.i = r.encoding || "UTF8", this.numRounds = r.numRounds || 1, isNaN(this.numRounds) || this.numRounds !== parseInt(this.numRounds, 10) || 1 > this.numRounds) throw new Error("numRounds must a integer >= 1");
      this.s = t, this.o = [], this.h = 0, this.u = !1, this.l = 0, this.A = !1, this.H = [], this.S = [];
    }

    _createClass(f, [{
      key: "update",
      value: function update(t) {
        var n,
            e = 0;
        var r = this.p >>> 5,
            i = this.m(t, this.o, this.h),
            s = i.binLen,
            o = i.value,
            h = s >>> 5;

        for (n = 0; n < h; n += r) {
          e + this.p <= s && (this.C = this.R(o.slice(n, n + r), this.C), e += this.p);
        }

        this.l += e, this.o = o.slice(e >>> 5), this.h = s % this.p, this.u = !0;
      }
    }, {
      key: "getHash",
      value: function getHash(t, n) {
        var e,
            i,
            s = this.U;
        var o = w(n);

        if (this.v) {
          if (-1 === o.outputLen) throw new Error("Output length must be specified in options");
          s = o.outputLen;
        }

        var h = r(t, s, this.K, o);
        if (this.A && this.T) return h(this.T(o));

        for (i = this.F(this.o.slice(), this.h, this.l, this.g(this.C), s), e = 1; e < this.numRounds; e += 1) {
          this.v && s % 32 != 0 && (i[i.length - 1] &= 16777215 >>> 24 - s % 32), i = this.F(i, s, 0, this.B(this.s), s);
        }

        return h(i);
      }
    }, {
      key: "setHMACKey",
      value: function setHMACKey(t, n, r) {
        if (!this.L) throw new Error("Variant does not support HMAC");
        if (this.u) throw new Error("Cannot set MAC key after calling update");
        var i = e(n, (r || {}).encoding || "UTF8", this.K);
        this.M(i(t));
      }
    }, {
      key: "M",
      value: function M(t) {
        var n = this.p >>> 3,
            e = n / 4 - 1;
        var r;
        if (1 !== this.numRounds) throw new Error("Cannot set numRounds with MAC");
        if (this.A) throw new Error("MAC key already set");

        for (n < t.binLen / 8 && (t.value = this.F(t.value, t.binLen, 0, this.B(this.s), this.U)); t.value.length <= e;) {
          t.value.push(0);
        }

        for (r = 0; r <= e; r += 1) {
          this.H[r] = 909522486 ^ t.value[r], this.S[r] = 1549556828 ^ t.value[r];
        }

        this.C = this.R(this.H, this.C), this.l = this.p, this.A = !0;
      }
    }, {
      key: "getHMAC",
      value: function getHMAC(t, n) {
        var e = w(n);
        return r(t, this.U, this.K, e)(this.k());
      }
    }, {
      key: "k",
      value: function k() {
        var t;
        if (!this.A) throw new Error("Cannot call getHMAC without first setting MAC key");
        var n = this.F(this.o.slice(), this.h, this.l, this.g(this.C), this.U);
        return t = this.R(this.S, this.B(this.s)), t = this.F(n, this.U, this.p, t, this.U), t;
      }
    }]);

    return f;
  }();

  function a(t, n) {
    return t << n | t >>> 32 - n;
  }

  function l(t, n) {
    return t >>> n | t << 32 - n;
  }

  function A(t, n) {
    return t >>> n;
  }

  function E(t, n, e) {
    return t ^ n ^ e;
  }

  function H(t, n, e) {
    return t & n ^ ~t & e;
  }

  function S(t, n, e) {
    return t & n ^ t & e ^ n & e;
  }

  function b(t) {
    return l(t, 2) ^ l(t, 13) ^ l(t, 22);
  }

  function p(t, n) {
    var e = (65535 & t) + (65535 & n);
    return (65535 & (t >>> 16) + (n >>> 16) + (e >>> 16)) << 16 | 65535 & e;
  }

  function d(t, n, e, r) {
    var i = (65535 & t) + (65535 & n) + (65535 & e) + (65535 & r);
    return (65535 & (t >>> 16) + (n >>> 16) + (e >>> 16) + (r >>> 16) + (i >>> 16)) << 16 | 65535 & i;
  }

  function m(t, n, e, r, i) {
    var s = (65535 & t) + (65535 & n) + (65535 & e) + (65535 & r) + (65535 & i);
    return (65535 & (t >>> 16) + (n >>> 16) + (e >>> 16) + (r >>> 16) + (i >>> 16) + (s >>> 16)) << 16 | 65535 & s;
  }

  function C(t) {
    return l(t, 7) ^ l(t, 18) ^ A(t, 3);
  }

  function y(t) {
    return l(t, 6) ^ l(t, 11) ^ l(t, 25);
  }

  function R(t) {
    return [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
  }

  function U(t, n) {
    var e, r, i, s, o, h, u;
    var w = [];

    for (e = n[0], r = n[1], i = n[2], s = n[3], o = n[4], u = 0; u < 80; u += 1) {
      w[u] = u < 16 ? t[u] : a(w[u - 3] ^ w[u - 8] ^ w[u - 14] ^ w[u - 16], 1), h = u < 20 ? m(a(e, 5), H(r, i, s), o, 1518500249, w[u]) : u < 40 ? m(a(e, 5), E(r, i, s), o, 1859775393, w[u]) : u < 60 ? m(a(e, 5), S(r, i, s), o, 2400959708, w[u]) : m(a(e, 5), E(r, i, s), o, 3395469782, w[u]), o = s, s = i, i = a(r, 30), r = e, e = h;
    }

    return n[0] = p(e, n[0]), n[1] = p(r, n[1]), n[2] = p(i, n[2]), n[3] = p(s, n[3]), n[4] = p(o, n[4]), n;
  }

  function v(t, n, e, r) {
    var i;
    var s = 15 + (n + 65 >>> 9 << 4),
        o = n + e;

    for (; t.length <= s;) {
      t.push(0);
    }

    for (t[n >>> 5] |= 128 << 24 - n % 32, t[s] = 4294967295 & o, t[s - 1] = o / 4294967296 | 0, i = 0; i < t.length; i += 16) {
      r = U(t.slice(i, i + 16), r);
    }

    return r;
  }

  var K = /*#__PURE__*/function (_f) {
    _inherits(K, _f);

    var _super = _createSuper(K);

    function K(t, n, r) {
      var _this;

      _classCallCheck(this, K);

      if ("SHA-1" !== t) throw new Error(h);
      _this = _super.call(this, t, n, r);
      var i = r || {};
      _this.L = !0, _this.T = _this.k, _this.K = -1, _this.m = e(_this.t, _this.i, _this.K), _this.R = U, _this.g = function (t) {
        return t.slice();
      }, _this.B = R, _this.F = v, _this.C = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], _this.p = 512, _this.U = 160, _this.v = !1, i.hmacKey && _this.M(c("hmacKey", i.hmacKey, _this.K));
      return _this;
    }

    return K;
  }(f);

  function T(t) {
    var n;
    return n = "SHA-224" == t ? s.slice() : o.slice(), n;
  }

  function F(t, n) {
    var e, r, s, o, h, u, w, c, f, a, E;
    var R = [];

    for (e = n[0], r = n[1], s = n[2], o = n[3], h = n[4], u = n[5], w = n[6], c = n[7], E = 0; E < 64; E += 1) {
      R[E] = E < 16 ? t[E] : d(l(U = R[E - 2], 17) ^ l(U, 19) ^ A(U, 10), R[E - 7], C(R[E - 15]), R[E - 16]), f = m(c, y(h), H(h, u, w), i[E], R[E]), a = p(b(e), S(e, r, s)), c = w, w = u, u = h, h = p(o, f), o = s, s = r, r = e, e = p(f, a);
    }

    var U;
    return n[0] = p(e, n[0]), n[1] = p(r, n[1]), n[2] = p(s, n[2]), n[3] = p(o, n[3]), n[4] = p(h, n[4]), n[5] = p(u, n[5]), n[6] = p(w, n[6]), n[7] = p(c, n[7]), n;
  }

  var g = /*#__PURE__*/function (_f2) {
    _inherits(g, _f2);

    var _super2 = _createSuper(g);

    function g(t, n, r) {
      var _this2;

      _classCallCheck(this, g);

      if ("SHA-224" !== t && "SHA-256" !== t) throw new Error(h);
      _this2 = _super2.call(this, t, n, r);
      var i = r || {};
      _this2.T = _this2.k, _this2.L = !0, _this2.K = -1, _this2.m = e(_this2.t, _this2.i, _this2.K), _this2.R = F, _this2.g = function (t) {
        return t.slice();
      }, _this2.B = T, _this2.F = function (n, e, r, i) {
        return function (t, n, e, r, i) {
          var s, o;
          var h = 15 + (n + 65 >>> 9 << 4),
              u = n + e;

          for (; t.length <= h;) {
            t.push(0);
          }

          for (t[n >>> 5] |= 128 << 24 - n % 32, t[h] = 4294967295 & u, t[h - 1] = u / 4294967296 | 0, s = 0; s < t.length; s += 16) {
            r = F(t.slice(s, s + 16), r);
          }

          return o = "SHA-224" === i ? [r[0], r[1], r[2], r[3], r[4], r[5], r[6]] : r, o;
        }(n, e, r, i, t);
      }, _this2.C = T(t), _this2.p = 512, _this2.U = "SHA-224" === t ? 224 : 256, _this2.v = !1, i.hmacKey && _this2.M(c("hmacKey", i.hmacKey, _this2.K));
      return _this2;
    }

    return g;
  }(f);

  var B = function B(t, n) {
    _classCallCheck(this, B);

    this.Y = t, this.N = n;
  };

  function L(t, n) {
    var e;
    return n > 32 ? (e = 64 - n, new B(t.N << n | t.Y >>> e, t.Y << n | t.N >>> e)) : 0 !== n ? (e = 32 - n, new B(t.Y << n | t.N >>> e, t.N << n | t.Y >>> e)) : t;
  }

  function M(t, n) {
    var e;
    return n < 32 ? (e = 32 - n, new B(t.Y >>> n | t.N << e, t.N >>> n | t.Y << e)) : (e = 64 - n, new B(t.N >>> n | t.Y << e, t.Y >>> n | t.N << e));
  }

  function k(t, n) {
    return new B(t.Y >>> n, t.N >>> n | t.Y << 32 - n);
  }

  function Y(t, n, e) {
    return new B(t.Y & n.Y ^ t.Y & e.Y ^ n.Y & e.Y, t.N & n.N ^ t.N & e.N ^ n.N & e.N);
  }

  function N(t) {
    var n = M(t, 28),
        e = M(t, 34),
        r = M(t, 39);
    return new B(n.Y ^ e.Y ^ r.Y, n.N ^ e.N ^ r.N);
  }

  function I(t, n) {
    var e, r;
    e = (65535 & t.N) + (65535 & n.N), r = (t.N >>> 16) + (n.N >>> 16) + (e >>> 16);
    var i = (65535 & r) << 16 | 65535 & e;
    e = (65535 & t.Y) + (65535 & n.Y) + (r >>> 16), r = (t.Y >>> 16) + (n.Y >>> 16) + (e >>> 16);
    return new B((65535 & r) << 16 | 65535 & e, i);
  }

  function X(t, n, e, r) {
    var i, s;
    i = (65535 & t.N) + (65535 & n.N) + (65535 & e.N) + (65535 & r.N), s = (t.N >>> 16) + (n.N >>> 16) + (e.N >>> 16) + (r.N >>> 16) + (i >>> 16);
    var o = (65535 & s) << 16 | 65535 & i;
    i = (65535 & t.Y) + (65535 & n.Y) + (65535 & e.Y) + (65535 & r.Y) + (s >>> 16), s = (t.Y >>> 16) + (n.Y >>> 16) + (e.Y >>> 16) + (r.Y >>> 16) + (i >>> 16);
    return new B((65535 & s) << 16 | 65535 & i, o);
  }

  function z(t, n, e, r, i) {
    var s, o;
    s = (65535 & t.N) + (65535 & n.N) + (65535 & e.N) + (65535 & r.N) + (65535 & i.N), o = (t.N >>> 16) + (n.N >>> 16) + (e.N >>> 16) + (r.N >>> 16) + (i.N >>> 16) + (s >>> 16);
    var h = (65535 & o) << 16 | 65535 & s;
    s = (65535 & t.Y) + (65535 & n.Y) + (65535 & e.Y) + (65535 & r.Y) + (65535 & i.Y) + (o >>> 16), o = (t.Y >>> 16) + (n.Y >>> 16) + (e.Y >>> 16) + (r.Y >>> 16) + (i.Y >>> 16) + (s >>> 16);
    return new B((65535 & o) << 16 | 65535 & s, h);
  }

  function x(t, n) {
    return new B(t.Y ^ n.Y, t.N ^ n.N);
  }

  function _(t) {
    var n = M(t, 19),
        e = M(t, 61),
        r = k(t, 6);
    return new B(n.Y ^ e.Y ^ r.Y, n.N ^ e.N ^ r.N);
  }

  function O(t) {
    var n = M(t, 1),
        e = M(t, 8),
        r = k(t, 7);
    return new B(n.Y ^ e.Y ^ r.Y, n.N ^ e.N ^ r.N);
  }

  function P(t) {
    var n = M(t, 14),
        e = M(t, 18),
        r = M(t, 41);
    return new B(n.Y ^ e.Y ^ r.Y, n.N ^ e.N ^ r.N);
  }

  var V = [new B(i[0], 3609767458), new B(i[1], 602891725), new B(i[2], 3964484399), new B(i[3], 2173295548), new B(i[4], 4081628472), new B(i[5], 3053834265), new B(i[6], 2937671579), new B(i[7], 3664609560), new B(i[8], 2734883394), new B(i[9], 1164996542), new B(i[10], 1323610764), new B(i[11], 3590304994), new B(i[12], 4068182383), new B(i[13], 991336113), new B(i[14], 633803317), new B(i[15], 3479774868), new B(i[16], 2666613458), new B(i[17], 944711139), new B(i[18], 2341262773), new B(i[19], 2007800933), new B(i[20], 1495990901), new B(i[21], 1856431235), new B(i[22], 3175218132), new B(i[23], 2198950837), new B(i[24], 3999719339), new B(i[25], 766784016), new B(i[26], 2566594879), new B(i[27], 3203337956), new B(i[28], 1034457026), new B(i[29], 2466948901), new B(i[30], 3758326383), new B(i[31], 168717936), new B(i[32], 1188179964), new B(i[33], 1546045734), new B(i[34], 1522805485), new B(i[35], 2643833823), new B(i[36], 2343527390), new B(i[37], 1014477480), new B(i[38], 1206759142), new B(i[39], 344077627), new B(i[40], 1290863460), new B(i[41], 3158454273), new B(i[42], 3505952657), new B(i[43], 106217008), new B(i[44], 3606008344), new B(i[45], 1432725776), new B(i[46], 1467031594), new B(i[47], 851169720), new B(i[48], 3100823752), new B(i[49], 1363258195), new B(i[50], 3750685593), new B(i[51], 3785050280), new B(i[52], 3318307427), new B(i[53], 3812723403), new B(i[54], 2003034995), new B(i[55], 3602036899), new B(i[56], 1575990012), new B(i[57], 1125592928), new B(i[58], 2716904306), new B(i[59], 442776044), new B(i[60], 593698344), new B(i[61], 3733110249), new B(i[62], 2999351573), new B(i[63], 3815920427), new B(3391569614, 3928383900), new B(3515267271, 566280711), new B(3940187606, 3454069534), new B(4118630271, 4000239992), new B(116418474, 1914138554), new B(174292421, 2731055270), new B(289380356, 3203993006), new B(460393269, 320620315), new B(685471733, 587496836), new B(852142971, 1086792851), new B(1017036298, 365543100), new B(1126000580, 2618297676), new B(1288033470, 3409855158), new B(1501505948, 4234509866), new B(1607167915, 987167468), new B(1816402316, 1246189591)];

  function Z(t) {
    return "SHA-384" === t ? [new B(3418070365, s[0]), new B(1654270250, s[1]), new B(2438529370, s[2]), new B(355462360, s[3]), new B(1731405415, s[4]), new B(41048885895, s[5]), new B(3675008525, s[6]), new B(1203062813, s[7])] : [new B(o[0], 4089235720), new B(o[1], 2227873595), new B(o[2], 4271175723), new B(o[3], 1595750129), new B(o[4], 2917565137), new B(o[5], 725511199), new B(o[6], 4215389547), new B(o[7], 327033209)];
  }

  function j(t, n) {
    var e, r, i, s, o, h, u, w, c, f, a, l;
    var A = [];

    for (e = n[0], r = n[1], i = n[2], s = n[3], o = n[4], h = n[5], u = n[6], w = n[7], a = 0; a < 80; a += 1) {
      a < 16 ? (l = 2 * a, A[a] = new B(t[l], t[l + 1])) : A[a] = X(_(A[a - 2]), A[a - 7], O(A[a - 15]), A[a - 16]), c = z(w, P(o), (H = h, S = u, new B((E = o).Y & H.Y ^ ~E.Y & S.Y, E.N & H.N ^ ~E.N & S.N)), V[a], A[a]), f = I(N(e), Y(e, r, i)), w = u, u = h, h = o, o = I(s, c), s = i, i = r, r = e, e = I(c, f);
    }

    var E, H, S;
    return n[0] = I(e, n[0]), n[1] = I(r, n[1]), n[2] = I(i, n[2]), n[3] = I(s, n[3]), n[4] = I(o, n[4]), n[5] = I(h, n[5]), n[6] = I(u, n[6]), n[7] = I(w, n[7]), n;
  }

  var q = /*#__PURE__*/function (_f3) {
    _inherits(q, _f3);

    var _super3 = _createSuper(q);

    function q(t, n, r) {
      var _this3;

      _classCallCheck(this, q);

      if ("SHA-384" !== t && "SHA-512" !== t) throw new Error(h);
      _this3 = _super3.call(this, t, n, r);
      var i = r || {};
      _this3.T = _this3.k, _this3.L = !0, _this3.K = -1, _this3.m = e(_this3.t, _this3.i, _this3.K), _this3.R = j, _this3.g = function (t) {
        return t.slice();
      }, _this3.B = Z, _this3.F = function (n, e, r, i) {
        return function (t, n, e, r, i) {
          var s, o;
          var h = 31 + (n + 129 >>> 10 << 5),
              u = n + e;

          for (; t.length <= h;) {
            t.push(0);
          }

          for (t[n >>> 5] |= 128 << 24 - n % 32, t[h] = 4294967295 & u, t[h - 1] = u / 4294967296 | 0, s = 0; s < t.length; s += 32) {
            r = j(t.slice(s, s + 32), r);
          }

          return o = "SHA-384" === i ? [(r = r)[0].Y, r[0].N, r[1].Y, r[1].N, r[2].Y, r[2].N, r[3].Y, r[3].N, r[4].Y, r[4].N, r[5].Y, r[5].N] : [r[0].Y, r[0].N, r[1].Y, r[1].N, r[2].Y, r[2].N, r[3].Y, r[3].N, r[4].Y, r[4].N, r[5].Y, r[5].N, r[6].Y, r[6].N, r[7].Y, r[7].N], o;
        }(n, e, r, i, t);
      }, _this3.C = Z(t), _this3.p = 1024, _this3.U = "SHA-384" === t ? 384 : 512, _this3.v = !1, i.hmacKey && _this3.M(c("hmacKey", i.hmacKey, _this3.K));
      return _this3;
    }

    return q;
  }(f);

  var D = [new B(0, 1), new B(0, 32898), new B(2147483648, 32906), new B(2147483648, 2147516416), new B(0, 32907), new B(0, 2147483649), new B(2147483648, 2147516545), new B(2147483648, 32777), new B(0, 138), new B(0, 136), new B(0, 2147516425), new B(0, 2147483658), new B(0, 2147516555), new B(2147483648, 139), new B(2147483648, 32905), new B(2147483648, 32771), new B(2147483648, 32770), new B(2147483648, 128), new B(0, 32778), new B(2147483648, 2147483658), new B(2147483648, 2147516545), new B(2147483648, 32896), new B(0, 2147483649), new B(2147483648, 2147516424)],
      G = [[0, 36, 3, 41, 18], [1, 44, 10, 45, 2], [62, 6, 43, 15, 61], [28, 55, 25, 21, 56], [27, 20, 39, 8, 14]];

  function J(t) {
    var n;
    var e = [];

    for (n = 0; n < 5; n += 1) {
      e[n] = [new B(0, 0), new B(0, 0), new B(0, 0), new B(0, 0), new B(0, 0)];
    }

    return e;
  }

  function Q(t) {
    var n;
    var e = [];

    for (n = 0; n < 5; n += 1) {
      e[n] = t[n].slice();
    }

    return e;
  }

  function W(t, n) {
    var e, r, i, s;
    var o = [],
        h = [];
    if (null !== t) for (r = 0; r < t.length; r += 2) {
      n[(r >>> 1) % 5][(r >>> 1) / 5 | 0] = x(n[(r >>> 1) % 5][(r >>> 1) / 5 | 0], new B(t[r + 1], t[r]));
    }

    for (e = 0; e < 24; e += 1) {
      for (s = J(), r = 0; r < 5; r += 1) {
        o[r] = (u = n[r][0], w = n[r][1], c = n[r][2], f = n[r][3], a = n[r][4], new B(u.Y ^ w.Y ^ c.Y ^ f.Y ^ a.Y, u.N ^ w.N ^ c.N ^ f.N ^ a.N));
      }

      for (r = 0; r < 5; r += 1) {
        h[r] = x(o[(r + 4) % 5], L(o[(r + 1) % 5], 1));
      }

      for (r = 0; r < 5; r += 1) {
        for (i = 0; i < 5; i += 1) {
          n[r][i] = x(n[r][i], h[r]);
        }
      }

      for (r = 0; r < 5; r += 1) {
        for (i = 0; i < 5; i += 1) {
          s[i][(2 * r + 3 * i) % 5] = L(n[r][i], G[r][i]);
        }
      }

      for (r = 0; r < 5; r += 1) {
        for (i = 0; i < 5; i += 1) {
          n[r][i] = x(s[r][i], new B(~s[(r + 1) % 5][i].Y & s[(r + 2) % 5][i].Y, ~s[(r + 1) % 5][i].N & s[(r + 2) % 5][i].N));
        }
      }

      n[0][0] = x(n[0][0], D[e]);
    }

    var u, w, c, f, a;
    return n;
  }

  function $(t) {
    var n,
        e,
        r = 0;
    var i = [0, 0],
        s = [4294967295 & t, t / 4294967296 & 2097151];

    for (n = 6; n >= 0; n--) {
      e = s[n >> 2] >>> 8 * n & 255, 0 === e && 0 === r || (i[r + 1 >> 2] |= e << 8 * (r + 1), r += 1);
    }

    return r = 0 !== r ? r : 1, i[0] |= r, {
      value: r + 1 > 4 ? i : [i[0]],
      binLen: 8 + 8 * r
    };
  }

  function tt(t) {
    return u($(t.binLen), t);
  }

  function nt(t, n) {
    var e,
        r = $(n);
    r = u(r, t);
    var i = n >>> 2,
        s = (i - r.value.length % i) % i;

    for (e = 0; e < s; e++) {
      r.value.push(0);
    }

    return r.value;
  }

  var et = /*#__PURE__*/function (_f4) {
    _inherits(et, _f4);

    var _super4 = _createSuper(et);

    function et(t, n, r) {
      var _this4;

      _classCallCheck(this, et);

      var i = 6,
          s = 0;
      _this4 = _super4.call(this, t, n, r);
      var o = r || {};

      if (1 !== _this4.numRounds) {
        if (o.kmacKey || o.hmacKey) throw new Error("Cannot set numRounds with MAC");
        if ("CSHAKE128" === _this4.s || "CSHAKE256" === _this4.s) throw new Error("Cannot set numRounds for CSHAKE variants");
      }

      switch (_this4.K = 1, _this4.m = e(_this4.t, _this4.i, _this4.K), _this4.R = W, _this4.g = Q, _this4.B = J, _this4.C = J(), _this4.v = !1, t) {
        case "SHA3-224":
          _this4.p = s = 1152, _this4.U = 224, _this4.L = !0, _this4.T = _this4.k;
          break;

        case "SHA3-256":
          _this4.p = s = 1088, _this4.U = 256, _this4.L = !0, _this4.T = _this4.k;
          break;

        case "SHA3-384":
          _this4.p = s = 832, _this4.U = 384, _this4.L = !0, _this4.T = _this4.k;
          break;

        case "SHA3-512":
          _this4.p = s = 576, _this4.U = 512, _this4.L = !0, _this4.T = _this4.k;
          break;

        case "SHAKE128":
          i = 31, _this4.p = s = 1344, _this4.U = -1, _this4.v = !0, _this4.L = !1, _this4.T = null;
          break;

        case "SHAKE256":
          i = 31, _this4.p = s = 1088, _this4.U = -1, _this4.v = !0, _this4.L = !1, _this4.T = null;
          break;

        case "KMAC128":
          i = 4, _this4.p = s = 1344, _this4.I(r), _this4.U = -1, _this4.v = !0, _this4.L = !1, _this4.T = _this4.X;
          break;

        case "KMAC256":
          i = 4, _this4.p = s = 1088, _this4.I(r), _this4.U = -1, _this4.v = !0, _this4.L = !1, _this4.T = _this4.X;
          break;

        case "CSHAKE128":
          _this4.p = s = 1344, i = _this4._(r), _this4.U = -1, _this4.v = !0, _this4.L = !1, _this4.T = null;
          break;

        case "CSHAKE256":
          _this4.p = s = 1088, i = _this4._(r), _this4.U = -1, _this4.v = !0, _this4.L = !1, _this4.T = null;
          break;

        default:
          throw new Error(h);
      }

      _this4.F = function (t, n, e, r, o) {
        return function (t, n, e, r, i, s, o) {
          var h,
              u,
              w = 0;
          var c = [],
              f = i >>> 5,
              a = n >>> 5;

          for (h = 0; h < a && n >= i; h += f) {
            r = W(t.slice(h, h + f), r), n -= i;
          }

          for (t = t.slice(h), n %= i; t.length < f;) {
            t.push(0);
          }

          for (h = n >>> 3, t[h >> 2] ^= s << h % 4 * 8, t[f - 1] ^= 2147483648, r = W(t, r); 32 * c.length < o && (u = r[w % 5][w / 5 | 0], c.push(u.N), !(32 * c.length >= o));) {
            c.push(u.Y), w += 1, 0 == 64 * w % i && (W(null, r), w = 0);
          }

          return c;
        }(t, n, 0, r, s, i, o);
      }, o.hmacKey && _this4.M(c("hmacKey", o.hmacKey, _this4.K));
      return _this4;
    }

    _createClass(et, [{
      key: "_",
      value: function _(t, n) {
        var e = function (t) {
          var n = t || {};
          return {
            funcName: c("funcName", n.funcName, 1, {
              value: [],
              binLen: 0
            }),
            customization: c("Customization", n.customization, 1, {
              value: [],
              binLen: 0
            })
          };
        }(t || {});

        n && (e.funcName = n);
        var r = u(tt(e.funcName), tt(e.customization));

        if (0 !== e.customization.binLen || 0 !== e.funcName.binLen) {
          var _t = nt(r, this.p >>> 3);

          for (var _n = 0; _n < _t.length; _n += this.p >>> 5) {
            this.C = this.R(_t.slice(_n, _n + (this.p >>> 5)), this.C), this.l += this.p;
          }

          return 4;
        }

        return 31;
      }
    }, {
      key: "I",
      value: function I(t) {
        var n = function (t) {
          var n = t || {};
          return {
            kmacKey: c("kmacKey", n.kmacKey, 1),
            funcName: {
              value: [1128353099],
              binLen: 32
            },
            customization: c("Customization", n.customization, 1, {
              value: [],
              binLen: 0
            })
          };
        }(t || {});

        this._(t, n.funcName);

        var e = nt(tt(n.kmacKey), this.p >>> 3);

        for (var _t2 = 0; _t2 < e.length; _t2 += this.p >>> 5) {
          this.C = this.R(e.slice(_t2, _t2 + (this.p >>> 5)), this.C), this.l += this.p;
        }

        this.A = !0;
      }
    }, {
      key: "X",
      value: function X(t) {
        var n = u({
          value: this.o.slice(),
          binLen: this.h
        }, function (t) {
          var n,
              e,
              r = 0;
          var i = [0, 0],
              s = [4294967295 & t, t / 4294967296 & 2097151];

          for (n = 6; n >= 0; n--) {
            e = s[n >> 2] >>> 8 * n & 255, 0 === e && 0 === r || (i[r >> 2] |= e << 8 * r, r += 1);
          }

          return r = 0 !== r ? r : 1, i[r >> 2] |= r << 8 * r, {
            value: r + 1 > 4 ? i : [i[0]],
            binLen: 8 + 8 * r
          };
        }(t.outputLen));
        return this.F(n.value, n.binLen, this.l, this.g(this.C), t.outputLen);
      }
    }]);

    return et;
  }(f);

  var _default = /*#__PURE__*/function () {
    function _default(t, n, e) {
      _classCallCheck(this, _default);

      if ("SHA-1" == t) this.O = new K(t, n, e);else if ("SHA-224" == t || "SHA-256" == t) this.O = new g(t, n, e);else if ("SHA-384" == t || "SHA-512" == t) this.O = new q(t, n, e);else {
        if ("SHA3-224" != t && "SHA3-256" != t && "SHA3-384" != t && "SHA3-512" != t && "SHAKE128" != t && "SHAKE256" != t && "CSHAKE128" != t && "CSHAKE256" != t && "KMAC128" != t && "KMAC256" != t) throw new Error(h);
        this.O = new et(t, n, e);
      }
    }

    _createClass(_default, [{
      key: "update",
      value: function update(t) {
        this.O.update(t);
      }
    }, {
      key: "getHash",
      value: function getHash(t, n) {
        return this.O.getHash(t, n);
      }
    }, {
      key: "setHMACKey",
      value: function setHMACKey(t, n, e) {
        this.O.setHMACKey(t, n, e);
      }
    }, {
      key: "getHMAC",
      value: function getHMAC(t, n) {
        return this.O.getHMAC(t, n);
      }
    }]);

    return _default;
  }();

  /**
   * "globalThis" ponyfill.
   * {@link https://mathiasbynens.be/notes/globalthis|A horrifying globalThis polyfill in universal JavaScript}
   * @type {Object.<string, *>}
  */
  var magicalGlobalThis = function () {
    /* eslint-disable no-extend-native, no-undef, no-restricted-globals */
    var magic;

    if ((typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) === 'object') {
      magic = globalThis;
    } else {
      Object.defineProperty(Object.prototype, '__OTPAUTH_GLOBALTHIS__', {
        get: function get() {
          return this;
        },
        configurable: true
      });

      try {
        // @ts-ignore
        magic = __OTPAUTH_GLOBALTHIS__;
      } finally {
        // @ts-ignore
        delete Object.prototype.__OTPAUTH_GLOBALTHIS__;
      }
    }

    if (typeof magic === 'undefined') {
      // Still unable to determine "globalThis", fall back to a naive method.
      if (typeof self !== 'undefined') {
        magic = self;
      } else if (typeof window !== 'undefined') {
        magic = window;
      } else if (typeof global !== 'undefined') {
        magic = global;
      }
    }

    return magic;
    /* eslint-enable */
  }();

  /**
   * Detect if running in Node.js.
   * @type {boolean}
   */

  var isNode = Object.prototype.toString.call(magicalGlobalThis.process) === '[object process]';

  /**
   * Dynamically import Node.js modules ("eval" is used to prevent bundlers from including the module).
   * {@link https://github.com/webpack/webpack/issues/8826|webpack/webpack#8826}
   * @param {string} name Module name.
   * @returns {*} Module.
   */

  var nodeRequire = isNode // eslint-disable-next-line no-eval
  ? eval('require') : function () {};

  var NodeBuffer$1 = isNode ? magicalGlobalThis.Buffer : undefined;
  var NodeCrypto$2 = isNode ? nodeRequire('crypto') : undefined;
  /**
   * OpenSSL to jsSHA algorithms.
   * @type {Object.<string, string>}
   */

  var OPENSSL_TO_JSSHA_ALGO = {
    'SHA1': 'SHA-1',
    'SHA224': 'SHA-224',
    'SHA256': 'SHA-256',
    'SHA384': 'SHA-384',
    'SHA512': 'SHA-512',
    'SHA3-224': 'SHA3-224',
    'SHA3-256': 'SHA3-256',
    'SHA3-384': 'SHA3-384',
    'SHA3-512': 'SHA3-512'
  };
  /**
   * Calculates an HMAC digest.
   * In Node.js, the command "openssl list -digest-algorithms" displays the available digest algorithms.
   * @param {string} algorithm Algorithm.
   * @param {ArrayBuffer} key Key.
   * @param {ArrayBuffer} message Message.
   * @returns {ArrayBuffer} Digest.
   */

  var hmacDigest = function hmacDigest(algorithm, key, message) {
    if (isNode) {
      var hmac = NodeCrypto$2.createHmac(algorithm, NodeBuffer$1.from(key));
      hmac.update(NodeBuffer$1.from(message));
      return hmac.digest().buffer;
    } else {
      var variant = OPENSSL_TO_JSSHA_ALGO[algorithm.toUpperCase()];

      if (typeof variant === 'undefined') {
        throw new TypeError('Unknown hash function');
      } // @ts-ignore
      // eslint-disable-next-line @babel/new-cap


      var _hmac = new _default(variant, 'ARRAYBUFFER');

      _hmac.setHMACKey(key, 'ARRAYBUFFER');

      _hmac.update(message);

      return _hmac.getHMAC('ARRAYBUFFER');
    }
  };

  /**
   * Pads a number with leading zeros.
   * @param {number|string} num Number.
   * @param {number} digits Digits.
   * @returns {string} Padded number.
   */
  var pad = function pad(num, digits) {
    var prefix = '';
    var repeat = digits - String(num).length;

    while (repeat-- > 0) {
      prefix += '0';
    }

    return "".concat(prefix).concat(num);
  };

  /**
   * RFC 4648 base32 alphabet without pad.
   * @type {string}
   */
  var ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  /**
   * Converts a base32 string to an ArrayBuffer (RFC 4648).
   * {@link https://github.com/LinusU/base32-decode|LinusU/base32-decode}
   * @param {string} str Base32 string.
   * @returns {ArrayBuffer} ArrayBuffer.
   */

  var base32ToBuf = function base32ToBuf(str) {
    // Canonicalize to all upper case and remove padding if it exists.
    var cstr = str.toUpperCase().replace(/=+$/, '');
    var buf = new ArrayBuffer(cstr.length * 5 / 8 | 0);
    var arr = new Uint8Array(buf);
    var bits = 0;
    var value = 0;
    var index = 0;

    for (var i = 0; i < cstr.length; i++) {
      var idx = ALPHABET.indexOf(cstr[i]);
      if (idx === -1) throw new TypeError("Invalid character found: ".concat(cstr[i]));
      value = value << 5 | idx;
      bits += 5;

      if (bits >= 8) {
        arr[index++] = value >>> bits - 8 & 255;
        bits -= 8;
      }
    }

    return buf;
  };
  /**
   * Converts an ArrayBuffer to a base32 string (RFC 4648).
   * {@link https://github.com/LinusU/base32-encode|LinusU/base32-encode}
   * @param {ArrayBuffer} buf ArrayBuffer.
   * @returns {string} Base32 string.
   */

  var base32FromBuf = function base32FromBuf(buf) {
    var arr = new Uint8Array(buf);
    var bits = 0;
    var value = 0;
    var str = '';

    for (var i = 0; i < arr.length; i++) {
      value = value << 8 | arr[i];
      bits += 8;

      while (bits >= 5) {
        str += ALPHABET[value >>> bits - 5 & 31];
        bits -= 5;
      }
    }

    if (bits > 0) {
      str += ALPHABET[value << 5 - bits & 31];
    }

    return str;
  };

  /**
   * Converts an ArrayBuffer to a hexadecimal string.
   * @param {ArrayBuffer} buf ArrayBuffer.
   * @returns {string} Hexadecimal string.
   */
  var hexFromBuf = function hexFromBuf(buf) {
    var arr = new Uint8Array(buf);
    var str = '';

    for (var i = 0; i < arr.length; i++) {
      var hex = arr[i].toString(16);
      if (hex.length === 1) str += '0';
      str += hex;
    }

    return str.toUpperCase();
  };
  /**
   * Converts a hexadecimal string to an ArrayBuffer.
   * @param {string} str Hexadecimal string.
   * @returns {ArrayBuffer} ArrayBuffer.
   */

  var hexToBuf = function hexToBuf(str) {
    var buf = new ArrayBuffer(str.length / 2);
    var arr = new Uint8Array(buf);

    for (var i = 0; i < str.length; i += 2) {
      arr[i / 2] = parseInt(str.substr(i, 2), 16);
    }

    return buf;
  };

  /**
   * Converts a Latin-1 string to an ArrayBuffer.
   * @param {string} str Latin-1 string.
   * @returns {ArrayBuffer} ArrayBuffer.
   */
  var latin1ToBuf = function latin1ToBuf(str) {
    var buf = new ArrayBuffer(str.length);
    var arr = new Uint8Array(buf);

    for (var i = 0; i < str.length; i++) {
      arr[i] = str.charCodeAt(i) & 0xFF;
    }

    return buf;
  };
  /**
   * Converts an ArrayBuffer to a Latin-1 string.
   * @param {ArrayBuffer} buf ArrayBuffer.
   * @returns {string} Latin-1 string.
   */

  var latin1FromBuf = function latin1FromBuf(buf) {
    var arr = new Uint8Array(buf);
    var str = '';

    for (var i = 0; i < arr.length; i++) {
      str += String.fromCharCode(arr[i]);
    }

    return str;
  };

  /**
   * TextEncoder instance.
   * @type {TextEncoder|null}
   */

  var ENCODER = magicalGlobalThis.TextEncoder ? new magicalGlobalThis.TextEncoder('utf-8') : null;
  /**
   * TextDecoder instance.
   * @type {TextDecoder|null}
   */

  var DECODER = magicalGlobalThis.TextDecoder ? new magicalGlobalThis.TextDecoder('utf-8') : null;
  /**
   * Converts an UTF-8 string to an ArrayBuffer.
   * @param {string} str String.
   * @returns {ArrayBuffer} ArrayBuffer.
   */

  var utf8ToBuf = function utf8ToBuf(str) {
    if (!ENCODER) {
      throw new Error('Encoding API not available');
    }

    return ENCODER.encode(str).buffer;
  };
  /**
   * Converts an ArrayBuffer to an UTF-8 string.
   * @param {ArrayBuffer} buf ArrayBuffer.
   * @returns {string} String.
   */

  var utf8FromBuf = function utf8FromBuf(buf) {
    if (!DECODER) {
      throw new Error('Encoding API not available');
    }

    return DECODER.decode(buf);
  };

  var NodeCrypto$1 = isNode ? nodeRequire('crypto') : undefined;
  var BrowserCrypto = !isNode ? magicalGlobalThis.crypto || magicalGlobalThis.msCrypto : undefined;
  /**
   * Returns random bytes.
   * @param {number} size Size.
   * @returns {ArrayBuffer} Random bytes.
   */

  var randomBytes = function randomBytes(size) {
    if (isNode) {
      return NodeCrypto$1.randomBytes(size).buffer;
    } else {
      if (!BrowserCrypto || !BrowserCrypto.getRandomValues) {
        throw new Error('Cryptography API not available');
      }

      return BrowserCrypto.getRandomValues(new Uint8Array(size)).buffer;
    }
  };

  var Secret = /*#__PURE__*/function () {
    /**
     * Secret key object.
     * @constructor
     * @param {Object} [config] Configuration options.
     * @param {ArrayBuffer} [config.buffer=randomBytes] Secret key.
     * @param {number} [config.size=20] Number of random bytes to generate, ignored if 'buffer' is provided.
     */
    function Secret() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          buffer = _ref.buffer,
          _ref$size = _ref.size,
          size = _ref$size === void 0 ? 20 : _ref$size;

      _classCallCheck(this, Secret);

      /**
       * Secret key.
       * @type {ArrayBuffer}
       */
      this.buffer = typeof buffer === 'undefined' ? randomBytes(size) : buffer;
    }
    /**
     * Converts a Latin-1 string to a Secret object.
     * @param {string} str Latin-1 string.
     * @returns {Secret} Secret object.
     */


    _createClass(Secret, [{
      key: "latin1",
      get:
      /**
       * Latin-1 string representation of secret key.
       * @type {string}
       */
      function get() {
        Object.defineProperty(this, 'latin1', {
          enumerable: true,
          value: latin1FromBuf(this.buffer)
        });
        return this.latin1;
      }
      /**
       * UTF-8 string representation of secret key.
       * @type {string}
       */

    }, {
      key: "utf8",
      get: function get() {
        Object.defineProperty(this, 'utf8', {
          enumerable: true,
          value: utf8FromBuf(this.buffer)
        });
        return this.utf8;
      }
      /**
       * Base32 string representation of secret key.
       * @type {string}
       */

    }, {
      key: "base32",
      get: function get() {
        Object.defineProperty(this, 'base32', {
          enumerable: true,
          value: base32FromBuf(this.buffer)
        });
        return this.base32;
      }
      /**
       * Hexadecimal string representation of secret key.
       * @type {string}
       */

    }, {
      key: "hex",
      get: function get() {
        Object.defineProperty(this, 'hex', {
          enumerable: true,
          value: hexFromBuf(this.buffer)
        });
        return this.hex;
      }
    }], [{
      key: "fromLatin1",
      value: function fromLatin1(str) {
        return new Secret({
          buffer: latin1ToBuf(str)
        });
      }
      /**
       * Converts an UTF-8 string to a Secret object.
       * @param {string} str UTF-8 string.
       * @returns {Secret} Secret object.
       */

    }, {
      key: "fromUTF8",
      value: function fromUTF8(str) {
        return new Secret({
          buffer: utf8ToBuf(str)
        });
      }
      /**
       * Converts a base32 string to a Secret object.
       * @param {string} str Base32 string.
       * @returns {Secret} Secret object.
       */

    }, {
      key: "fromBase32",
      value: function fromBase32(str) {
        return new Secret({
          buffer: base32ToBuf(str)
        });
      }
      /**
       * Converts a hexadecimal string to a Secret object.
       * @param {string} str Hexadecimal string.
       * @returns {Secret} Secret object.
       */

    }, {
      key: "fromHex",
      value: function fromHex(str) {
        return new Secret({
          buffer: hexToBuf(str)
        });
      }
    }]);

    return Secret;
  }();

  var NodeBuffer = isNode ? magicalGlobalThis.Buffer : undefined;
  var NodeCrypto = isNode ? nodeRequire('crypto') : undefined;
  /**
   * Returns true if a is equal to b, without leaking timing information that would allow an attacker to guess one of the values.
   * @param {string} a String a.
   * @param {string} b String b.
   * @returns {boolean} Equality result.
   */

  var timingSafeEqual = function timingSafeEqual(a, b) {
    if (isNode) {
      return NodeCrypto.timingSafeEqual(NodeBuffer.from(a), NodeBuffer.from(b));
    } else {
      if (a.length !== b.length) {
        throw new TypeError('Input strings must have the same length');
      }

      var i = -1;
      var out = 0;

      while (++i < a.length) {
        out |= a.charCodeAt(i) ^ b.charCodeAt(i);
      }

      return out === 0;
    }
  };

  var HOTP = /*#__PURE__*/function () {
    /**
     * HOTP: An HMAC-based One-time Password Algorithm.
     * {@link https://tools.ietf.org/html/rfc4226|RFC 4226}
     * @constructor
     * @param {Object} [config] Configuration options.
     * @param {string} [config.issuer=''] Account provider.
     * @param {string} [config.label='OTPAuth'] Account label.
     * @param {Secret|string} [config.secret=Secret] Secret key.
     * @param {string} [config.algorithm='SHA1'] HMAC hashing algorithm.
     * @param {number} [config.digits=6] Token length.
     * @param {number} [config.counter=0] Initial counter value.
     */
    function HOTP() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$issuer = _ref.issuer,
          issuer = _ref$issuer === void 0 ? HOTP.defaults.issuer : _ref$issuer,
          _ref$label = _ref.label,
          label = _ref$label === void 0 ? HOTP.defaults.label : _ref$label,
          _ref$secret = _ref.secret,
          secret = _ref$secret === void 0 ? new Secret() : _ref$secret,
          _ref$algorithm = _ref.algorithm,
          algorithm = _ref$algorithm === void 0 ? HOTP.defaults.algorithm : _ref$algorithm,
          _ref$digits = _ref.digits,
          digits = _ref$digits === void 0 ? HOTP.defaults.digits : _ref$digits,
          _ref$counter = _ref.counter,
          counter = _ref$counter === void 0 ? HOTP.defaults.counter : _ref$counter;

      _classCallCheck(this, HOTP);

      /**
       * Account provider.
       * @type {string}
       */
      this.issuer = issuer;
      /**
       * Account label.
       * @type {string}
       */

      this.label = label;
      /**
       * Secret key.
       * @type {Secret}
       */

      this.secret = typeof secret === 'string' ? Secret.fromBase32(secret) : secret;
      /**
       * HMAC hashing algorithm.
       * @type {string}
       */

      this.algorithm = algorithm.toUpperCase();
      /**
       * Token length.
       * @type {number}
       */

      this.digits = digits;
      /**
       * Initial counter value.
       * @type {number}
       */

      this.counter = counter;
    }
    /**
     * Generates an HOTP token.
     * @param {Object} config Configuration options.
     * @param {Secret} config.secret Secret key.
     * @param {string} [config.algorithm='SHA1'] HMAC hashing algorithm.
     * @param {number} [config.digits=6] Token length.
     * @param {number} [config.counter=0] Counter value.
     * @returns {string} Token.
     */


    _createClass(HOTP, [{
      key: "generate",
      value:
      /**
       * Generates an HOTP token.
       * @param {Object} [config] Configuration options.
       * @param {number} [config.counter=this.counter++] Counter value.
       * @returns {string} Token.
       */
      function generate() {
        var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref2$counter = _ref2.counter,
            counter = _ref2$counter === void 0 ? this.counter++ : _ref2$counter;

        return HOTP.generate({
          secret: this.secret,
          algorithm: this.algorithm,
          digits: this.digits,
          counter: counter
        });
      }
      /**
       * Validates an HOTP token.
       * @param {Object} config Configuration options.
       * @param {string} config.token Token value.
       * @param {Secret} config.secret Secret key.
       * @param {string} [config.algorithm='SHA1'] HMAC hashing algorithm.
       * @param {number} config.digits Token length.
       * @param {number} [config.counter=0] Counter value.
       * @param {number} [config.window=1] Window of counter values to test.
       * @returns {number|null} Token delta, or null if the token is not found.
       */

    }, {
      key: "validate",
      value:
      /**
       * Validates an HOTP token.
       * @param {Object} config Configuration options.
       * @param {string} config.token Token value.
       * @param {number} [config.counter=this.counter] Counter value.
       * @param {number} [config.window=1] Window of counter values to test.
       * @returns {number|null} Token delta, or null if the token is not found.
       */
      function validate(_ref3) {
        var token = _ref3.token,
            _ref3$counter = _ref3.counter,
            counter = _ref3$counter === void 0 ? this.counter : _ref3$counter,
            window = _ref3.window;
        return HOTP.validate({
          token: token,
          secret: this.secret,
          algorithm: this.algorithm,
          digits: this.digits,
          counter: counter,
          window: window
        });
      }
      /**
       * Returns a Google Authenticator key URI.
       * @returns {string} URI.
       */

    }, {
      key: "toString",
      value: function toString() {
        var e = encodeURIComponent;
        return 'otpauth://hotp/' + "".concat(this.issuer.length > 0 ? "".concat(e(this.issuer), ":").concat(e(this.label), "?issuer=").concat(e(this.issuer), "&") : "".concat(e(this.label), "?")) + "secret=".concat(e(this.secret.base32), "&") + "algorithm=".concat(e(this.algorithm), "&") + "digits=".concat(e(this.digits), "&") + "counter=".concat(e(this.counter));
      }
    }], [{
      key: "defaults",
      get:
      /**
       * Default configuration.
       * @type {{
       *   issuer: string,
       *   label: string,
       *   algorithm: string,
       *   digits: number,
       *   counter: number
       *   window: number
       * }}
       */
      function get() {
        return {
          issuer: '',
          label: 'OTPAuth',
          algorithm: 'SHA1',
          digits: 6,
          counter: 0,
          window: 1
        };
      }
    }, {
      key: "generate",
      value: function generate(_ref4) {
        var secret = _ref4.secret,
            _ref4$algorithm = _ref4.algorithm,
            algorithm = _ref4$algorithm === void 0 ? HOTP.defaults.algorithm : _ref4$algorithm,
            _ref4$digits = _ref4.digits,
            digits = _ref4$digits === void 0 ? HOTP.defaults.digits : _ref4$digits,
            _ref4$counter = _ref4.counter,
            counter = _ref4$counter === void 0 ? HOTP.defaults.counter : _ref4$counter;
        var digest = new Uint8Array(hmacDigest(algorithm, secret.buffer, uintToBuf(counter)));
        var offset = digest[digest.byteLength - 1] & 15;
        var otp = ((digest[offset] & 127) << 24 | (digest[offset + 1] & 255) << 16 | (digest[offset + 2] & 255) << 8 | digest[offset + 3] & 255) % Math.pow(10, digits);
        return pad(otp, digits);
      }
    }, {
      key: "validate",
      value: function validate(_ref5) {
        var token = _ref5.token,
            secret = _ref5.secret,
            algorithm = _ref5.algorithm,
            digits = _ref5.digits,
            _ref5$counter = _ref5.counter,
            counter = _ref5$counter === void 0 ? HOTP.defaults.counter : _ref5$counter,
            _ref5$window = _ref5.window,
            window = _ref5$window === void 0 ? HOTP.defaults.window : _ref5$window;
        // Return early if the token length does not match the digit number.
        if (token.length !== digits) return null;
        var delta = null;

        for (var i = counter - window; i <= counter + window; ++i) {
          var generatedToken = HOTP.generate({
            secret: secret,
            algorithm: algorithm,
            digits: digits,
            counter: i
          });

          if (timingSafeEqual(token, generatedToken)) {
            delta = i - counter;
          }
        }

        return delta;
      }
    }]);

    return HOTP;
  }();

  var TOTP = /*#__PURE__*/function () {
    /**
     * TOTP: Time-Based One-Time Password Algorithm.
     * {@link https://tools.ietf.org/html/rfc6238|RFC 6238}
     * @constructor
     * @param {Object} [config] Configuration options.
     * @param {string} [config.issuer=''] Account provider.
     * @param {string} [config.label='OTPAuth'] Account label.
     * @param {Secret|string} [config.secret=Secret] Secret key.
     * @param {string} [config.algorithm='SHA1'] HMAC hashing algorithm.
     * @param {number} [config.digits=6] Token length.
     * @param {number} [config.period=30] Token time-step duration.
     */
    function TOTP() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$issuer = _ref.issuer,
          issuer = _ref$issuer === void 0 ? TOTP.defaults.issuer : _ref$issuer,
          _ref$label = _ref.label,
          label = _ref$label === void 0 ? TOTP.defaults.label : _ref$label,
          _ref$secret = _ref.secret,
          secret = _ref$secret === void 0 ? new Secret() : _ref$secret,
          _ref$algorithm = _ref.algorithm,
          algorithm = _ref$algorithm === void 0 ? TOTP.defaults.algorithm : _ref$algorithm,
          _ref$digits = _ref.digits,
          digits = _ref$digits === void 0 ? TOTP.defaults.digits : _ref$digits,
          _ref$period = _ref.period,
          period = _ref$period === void 0 ? TOTP.defaults.period : _ref$period;

      _classCallCheck(this, TOTP);

      /**
       * Account provider.
       * @type {string}
       */
      this.issuer = issuer;
      /**
       * Account label.
       * @type {string}
       */

      this.label = label;
      /**
       * Secret key.
       * @type {Secret}
       */

      this.secret = typeof secret === 'string' ? Secret.fromBase32(secret) : secret;
      /**
       * HMAC hashing algorithm.
       * @type {string}
       */

      this.algorithm = algorithm.toUpperCase();
      /**
       * Token length.
       * @type {number}
       */

      this.digits = digits;
      /**
       * Token time-step duration.
       * @type {number}
       */

      this.period = period;
    }
    /**
     * Generates a TOTP token.
     * @param {Object} config Configuration options.
     * @param {Secret} config.secret Secret key.
     * @param {string} [config.algorithm='SHA1'] HMAC hashing algorithm.
     * @param {number} [config.digits=6] Token length.
     * @param {number} [config.period=30] Token time-step duration.
     * @param {number} [config.timestamp=Date.now] Timestamp value in milliseconds.
     * @returns {string} Token.
     */


    _createClass(TOTP, [{
      key: "generate",
      value:
      /**
       * Generates a TOTP token.
       * @param {Object} [config] Configuration options.
       * @param {number} [config.timestamp=Date.now] Timestamp value in milliseconds.
       * @returns {string} Token.
       */
      function generate() {
        var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref2$timestamp = _ref2.timestamp,
            timestamp = _ref2$timestamp === void 0 ? Date.now() : _ref2$timestamp;

        return TOTP.generate({
          secret: this.secret,
          algorithm: this.algorithm,
          digits: this.digits,
          period: this.period,
          timestamp: timestamp
        });
      }
      /**
       * Validates a TOTP token.
       * @param {Object} config Configuration options.
       * @param {string} config.token Token value.
       * @param {Secret} config.secret Secret key.
       * @param {string} [config.algorithm='SHA1'] HMAC hashing algorithm.
       * @param {number} config.digits Token length.
       * @param {number} [config.period=30] Token time-step duration.
       * @param {number} [config.timestamp=Date.now] Timestamp value in milliseconds.
       * @param {number} [config.window=1] Window of counter values to test.
       * @returns {number|null} Token delta, or null if the token is not found.
       */

    }, {
      key: "validate",
      value:
      /**
       * Validates a TOTP token.
       * @param {Object} config Configuration options.
       * @param {string} config.token Token value.
       * @param {number} [config.timestamp=Date.now] Timestamp value in milliseconds.
       * @param {number} [config.window=1] Window of counter values to test.
       * @returns {number|null} Token delta, or null if the token is not found.
       */
      function validate(_ref3) {
        var token = _ref3.token,
            timestamp = _ref3.timestamp,
            window = _ref3.window;
        return TOTP.validate({
          token: token,
          secret: this.secret,
          algorithm: this.algorithm,
          digits: this.digits,
          period: this.period,
          timestamp: timestamp,
          window: window
        });
      }
      /**
       * Returns a Google Authenticator key URI.
       * @returns {string} URI.
       */

    }, {
      key: "toString",
      value: function toString() {
        var e = encodeURIComponent;
        return 'otpauth://totp/' + "".concat(this.issuer.length > 0 ? "".concat(e(this.issuer), ":").concat(e(this.label), "?issuer=").concat(e(this.issuer), "&") : "".concat(e(this.label), "?")) + "secret=".concat(e(this.secret.base32), "&") + "algorithm=".concat(e(this.algorithm), "&") + "digits=".concat(e(this.digits), "&") + "period=".concat(e(this.period));
      }
    }], [{
      key: "defaults",
      get:
      /**
       * Default configuration.
       * @type {{
       *   issuer: string,
       *   label: string,
       *   algorithm: string,
       *   digits: number,
       *   period: number
       *   window: number
       * }}
       */
      function get() {
        return {
          issuer: '',
          label: 'OTPAuth',
          algorithm: 'SHA1',
          digits: 6,
          period: 30,
          window: 1
        };
      }
    }, {
      key: "generate",
      value: function generate(_ref4) {
        var secret = _ref4.secret,
            algorithm = _ref4.algorithm,
            digits = _ref4.digits,
            _ref4$period = _ref4.period,
            period = _ref4$period === void 0 ? TOTP.defaults.period : _ref4$period,
            _ref4$timestamp = _ref4.timestamp,
            timestamp = _ref4$timestamp === void 0 ? Date.now() : _ref4$timestamp;
        return HOTP.generate({
          secret: secret,
          algorithm: algorithm,
          digits: digits,
          counter: Math.floor(timestamp / 1000 / period)
        });
      }
    }, {
      key: "validate",
      value: function validate(_ref5) {
        var token = _ref5.token,
            secret = _ref5.secret,
            algorithm = _ref5.algorithm,
            digits = _ref5.digits,
            _ref5$period = _ref5.period,
            period = _ref5$period === void 0 ? TOTP.defaults.period : _ref5$period,
            _ref5$timestamp = _ref5.timestamp,
            timestamp = _ref5$timestamp === void 0 ? Date.now() : _ref5$timestamp,
            window = _ref5.window;
        return HOTP.validate({
          token: token,
          secret: secret,
          algorithm: algorithm,
          digits: digits,
          counter: Math.floor(timestamp / 1000 / period),
          window: window
        });
      }
    }]);

    return TOTP;
  }();

  /**
   * Key URI regex (otpauth://TYPE/[ISSUER:]LABEL?PARAMETERS).
   * @type {RegExp}
   */

  var OTPURI_REGEX = /^otpauth:\/\/([ht]otp)\/(.+)\?((?:&?[A-Z0-9.~_-]+=[^&]*)+)$/i;
  /**
   * RFC 4648 base32 alphabet with pad.
   * @type {RegExp}
   */

  var SECRET_REGEX = /^[2-7A-Z]+=*$/i;
  /**
   * Regex for supported algorithms.
   * @type {RegExp}
   */

  var ALGORITHM_REGEX = /^SHA(?:1|224|256|384|512|3-224|3-256|3-384|3-512)$/i;
  /**
   * Integer regex.
   * @type {RegExp}
   */

  var INTEGER_REGEX = /^[+-]?\d+$/;
  /**
   * Positive integer regex.
   * @type {RegExp}
   */

  var POSITIVE_INTEGER_REGEX = /^\+?[1-9]\d*$/;
  /**
   * HOTP/TOTP object/string conversion.
   * {@link https://github.com/google/google-authenticator/wiki/Key-Uri-Format|Key URI Format}
   */

  var URI = /*#__PURE__*/function () {
    function URI() {
      _classCallCheck(this, URI);
    }

    _createClass(URI, null, [{
      key: "parse",
      value:
      /**
       * Parses a Google Authenticator key URI and returns an HOTP/TOTP object.
       * @param {string} uri Google Authenticator Key URI.
       * @returns {HOTP|TOTP} HOTP/TOTP object.
       */
      function parse(uri) {
        var uriGroups;

        try {
          uriGroups = uri.match(OTPURI_REGEX);
        } catch (error) {
          /* Handled below */
        }

        if (!Array.isArray(uriGroups)) {
          throw new URIError('Invalid URI format');
        } // Extract URI groups.


        var uriType = uriGroups[1].toLowerCase();
        var uriLabel = uriGroups[2].split(/:(.+)/, 2).map(decodeURIComponent);
        /** @type {Object.<string, string>} */

        var uriParams = uriGroups[3].split('&').reduce(function (acc, cur) {
          var pairArr = cur.split(/=(.*)/, 2).map(decodeURIComponent);
          var pairKey = pairArr[0].toLowerCase();
          var pairVal = pairArr[1];
          /** @type {Object.<string, string>} */

          var pairAcc = acc;
          pairAcc[pairKey] = pairVal;
          return pairAcc;
        }, {}); // 'OTP' will be instantiated with 'config' argument.

        var OTP;
        var config = {};

        if (uriType === 'hotp') {
          OTP = HOTP; // Counter: required

          if (typeof uriParams.counter !== 'undefined' && INTEGER_REGEX.test(uriParams.counter)) {
            config.counter = parseInt(uriParams.counter, 10);
          } else {
            throw new TypeError('Missing or invalid \'counter\' parameter');
          }
        } else if (uriType === 'totp') {
          OTP = TOTP; // Period: optional

          if (typeof uriParams.period !== 'undefined') {
            if (POSITIVE_INTEGER_REGEX.test(uriParams.period)) {
              config.period = parseInt(uriParams.period, 10);
            } else {
              throw new TypeError('Invalid \'period\' parameter');
            }
          }
        } else {
          throw new TypeError('Unknown OTP type');
        } // Label: required
        // Issuer: optional


        if (uriLabel.length === 2) {
          config.label = uriLabel[1];

          if (typeof uriParams.issuer === 'undefined') {
            config.issuer = uriLabel[0];
          } else if (uriParams.issuer === uriLabel[0]) {
            config.issuer = uriParams.issuer;
          } else {
            throw new TypeError('Invalid \'issuer\' parameter');
          }
        } else {
          config.label = uriLabel[0];

          if (typeof uriParams.issuer !== 'undefined') {
            config.issuer = uriParams.issuer;
          }
        } // Secret: required


        if (typeof uriParams.secret !== 'undefined' && SECRET_REGEX.test(uriParams.secret)) {
          config.secret = uriParams.secret;
        } else {
          throw new TypeError('Missing or invalid \'secret\' parameter');
        } // Algorithm: optional


        if (typeof uriParams.algorithm !== 'undefined') {
          if (ALGORITHM_REGEX.test(uriParams.algorithm)) {
            config.algorithm = uriParams.algorithm;
          } else {
            throw new TypeError('Invalid \'algorithm\' parameter');
          }
        } // Digits: optional


        if (typeof uriParams.digits !== 'undefined') {
          if (POSITIVE_INTEGER_REGEX.test(uriParams.digits)) {
            config.digits = parseInt(uriParams.digits, 10);
          } else {
            throw new TypeError('Invalid \'digits\' parameter');
          }
        }

        return new OTP(config);
      }
      /**
       * Converts an HOTP/TOTP object to a Google Authenticator key URI.
       * @param {HOTP|TOTP} otp HOTP/TOTP object.
       * @returns {string} Google Authenticator Key URI.
       */

    }, {
      key: "stringify",
      value: function stringify(otp) {
        if (otp instanceof HOTP || otp instanceof TOTP) {
          return otp.toString();
        }

        throw new TypeError('Invalid \'HOTP/TOTP\' object');
      }
    }]);

    return URI;
  }();

  /**
   * Library version.
   * @type {string}
   */
  var version = '7.0.0';

  exports.HOTP = HOTP;
  exports.Secret = Secret;
  exports.TOTP = TOTP;
  exports.URI = URI;
  exports.version = version;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
