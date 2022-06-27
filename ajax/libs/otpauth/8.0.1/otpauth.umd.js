/*! otpauth v8.0.1 | (c) Héctor Molinero Fernández <hector@molinero.dev> | MIT | https://github.com/hectorm/otpauth */
/*! jssha v3.2.0 | (c) Brian Turek <brian.turek@gmail.com> | BSD-3-Clause | https://github.com/Caligatio/jsSHA */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.OTPAuth = {}));
})(this, (function (exports) { 'use strict';

  /**
   * Converts an integer to an ArrayBuffer.
   * @param {number} num Integer.
   * @returns {ArrayBuffer} ArrayBuffer.
   */
  const uintToBuf = num => {
    const buf = new ArrayBuffer(8);
    const arr = new Uint8Array(buf);
    let acc = num;

    for (let i = 7; i >= 0; i--) {
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
  const t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

  function n(t, n, e, r) {
    let i, s, o;
    const h = n || [0],
          u = (e = e || 0) >>> 3,
          w = -1 === r ? 3 : 0;

    for (i = 0; i < t.length; i += 1) o = i + u, s = o >>> 2, h.length <= s && h.push(0), h[s] |= t[i] << 8 * (w + r * (o % 4));

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
            let i, s, o, h;
            if (0 != t.length % 2) throw new Error("String of HEX type must be in byte increments");
            const u = n || [0],
                  w = (e = e || 0) >>> 3,
                  c = -1 === r ? 3 : 0;

            for (i = 0; i < t.length; i += 2) {
              if (s = parseInt(t.substr(i, 2), 16), isNaN(s)) throw new Error("String of HEX type contains invalid characters");

              for (h = (i >>> 1) + w, o = h >>> 2; u.length <= o;) u.push(0);

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
            let s,
                o,
                h,
                u,
                w,
                c,
                f,
                a,
                l = 0;
            const A = e || [0],
                  E = (r = r || 0) >>> 3;
            if ("UTF8" === n) for (f = -1 === i ? 3 : 0, h = 0; h < t.length; h += 1) for (s = t.charCodeAt(h), o = [], 128 > s ? o.push(s) : 2048 > s ? (o.push(192 | s >>> 6), o.push(128 | 63 & s)) : 55296 > s || 57344 <= s ? o.push(224 | s >>> 12, 128 | s >>> 6 & 63, 128 | 63 & s) : (h += 1, s = 65536 + ((1023 & s) << 10 | 1023 & t.charCodeAt(h)), o.push(240 | s >>> 18, 128 | s >>> 12 & 63, 128 | s >>> 6 & 63, 128 | 63 & s)), u = 0; u < o.length; u += 1) {
              for (c = l + E, w = c >>> 2; A.length <= w;) A.push(0);

              A[w] |= o[u] << 8 * (f + i * (c % 4)), l += 1;
            } else for (f = -1 === i ? 2 : 0, a = "UTF16LE" === n && 1 !== i || "UTF16LE" !== n && 1 === i, h = 0; h < t.length; h += 1) {
              for (s = t.charCodeAt(h), !0 === a && (u = 255 & s, s = u << 8 | s >>> 8), c = l + E, w = c >>> 2; A.length <= w;) A.push(0);

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
            let s,
                o,
                h,
                u,
                w,
                c,
                f,
                a = 0;
            const l = e || [0],
                  A = (r = r || 0) >>> 3,
                  E = -1 === i ? 3 : 0,
                  H = n.indexOf("=");
            if (-1 === n.search(/^[a-zA-Z0-9=+/]+$/)) throw new Error("Invalid character in base-64 string");
            if (n = n.replace(/=/g, ""), -1 !== H && H < n.length) throw new Error("Invalid '=' found in base-64 string");

            for (o = 0; o < n.length; o += 4) {
              for (w = n.substr(o, 4), u = 0, h = 0; h < w.length; h += 1) s = t.indexOf(w.charAt(h)), u |= s << 18 - 6 * h;

              for (h = 0; h < w.length - 1; h += 1) {
                for (f = a + A, c = f >>> 2; l.length <= c;) l.push(0);

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
            let i, s, o, h;
            const u = n || [0],
                  w = (e = e || 0) >>> 3,
                  c = -1 === r ? 3 : 0;

            for (s = 0; s < t.length; s += 1) i = t.charCodeAt(s), h = s + w, o = h >>> 2, u.length <= o && u.push(0), u[o] |= i << 8 * (c + r * (h % 4));

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
            let i,
                s,
                o = "";
            const h = n / 8,
                  u = -1 === e ? 3 : 0;

            for (i = 0; i < h; i += 1) s = t[i >>> 2] >>> 8 * (u + e * (i % 4)), o += "0123456789abcdef".charAt(s >>> 4 & 15) + "0123456789abcdef".charAt(15 & s);

            return r.outputUpper ? o.toUpperCase() : o;
          }(t, e, r, i);
        };

      case "B64":
        return function (n) {
          return function (n, e, r, i) {
            let s,
                o,
                h,
                u,
                w,
                c = "";
            const f = e / 8,
                  a = -1 === r ? 3 : 0;

            for (s = 0; s < f; s += 3) for (u = s + 1 < f ? n[s + 1 >>> 2] : 0, w = s + 2 < f ? n[s + 2 >>> 2] : 0, h = (n[s >>> 2] >>> 8 * (a + r * (s % 4)) & 255) << 16 | (u >>> 8 * (a + r * ((s + 1) % 4)) & 255) << 8 | w >>> 8 * (a + r * ((s + 2) % 4)) & 255, o = 0; o < 4; o += 1) c += 8 * s + 6 * o <= e ? t.charAt(h >>> 6 * (3 - o) & 63) : i.b64Pad;

            return c;
          }(n, e, r, i);
        };

      case "BYTES":
        return function (t) {
          return function (t, n, e) {
            let r,
                i,
                s = "";
            const o = n / 8,
                  h = -1 === e ? 3 : 0;

            for (r = 0; r < o; r += 1) i = t[r >>> 2] >>> 8 * (h + e * (r % 4)) & 255, s += String.fromCharCode(i);

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
            let r;
            const i = n / 8,
                  s = new ArrayBuffer(i),
                  o = new Uint8Array(s),
                  h = -1 === e ? 3 : 0;

            for (r = 0; r < i; r += 1) o[r] = t[r >>> 2] >>> 8 * (h + e * (r % 4)) & 255;

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
            let r;
            const i = n / 8,
                  s = -1 === e ? 3 : 0,
                  o = new Uint8Array(i);

            for (r = 0; r < i; r += 1) o[r] = t[r >>> 2] >>> 8 * (s + e * (r % 4)) & 255;

            return o;
          }(t, e, r);
        };

      default:
        throw new Error("format must be HEX, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY");
    }
  }

  const i = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298],
        s = [3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428],
        o = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225],
        h = "Chosen SHA variant is not supported";

  function u(t, n) {
    let e, r;
    const i = t.binLen >>> 3,
          s = n.binLen >>> 3,
          o = i << 3,
          h = 4 - i << 3;

    if (i % 4 != 0) {
      for (e = 0; e < s; e += 4) r = i + e >>> 2, t.value[r] |= n.value[e >>> 2] << o, t.value.push(0), t.value[r + 1] |= n.value[e >>> 2] >>> h;

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
    const n = {
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
    const s = t + " must include a value and format";

    if (!n) {
      if (!i) throw new Error(s);
      return i;
    }

    if (void 0 === n.value || !n.format) throw new Error(s);
    return e(n.format, n.encoding || "UTF8", r)(n.value);
  }

  class f {
    constructor(t, n, e) {
      const r = e || {};
      if (this.t = n, this.i = r.encoding || "UTF8", this.numRounds = r.numRounds || 1, isNaN(this.numRounds) || this.numRounds !== parseInt(this.numRounds, 10) || 1 > this.numRounds) throw new Error("numRounds must a integer >= 1");
      this.s = t, this.o = [], this.h = 0, this.u = !1, this.l = 0, this.A = !1, this.H = [], this.S = [];
    }

    update(t) {
      let n,
          e = 0;
      const r = this.p >>> 5,
            i = this.m(t, this.o, this.h),
            s = i.binLen,
            o = i.value,
            h = s >>> 5;

      for (n = 0; n < h; n += r) e + this.p <= s && (this.C = this.R(o.slice(n, n + r), this.C), e += this.p);

      this.l += e, this.o = o.slice(e >>> 5), this.h = s % this.p, this.u = !0;
    }

    getHash(t, n) {
      let e,
          i,
          s = this.U;
      const o = w(n);

      if (this.v) {
        if (-1 === o.outputLen) throw new Error("Output length must be specified in options");
        s = o.outputLen;
      }

      const h = r(t, s, this.K, o);
      if (this.A && this.T) return h(this.T(o));

      for (i = this.F(this.o.slice(), this.h, this.l, this.g(this.C), s), e = 1; e < this.numRounds; e += 1) this.v && s % 32 != 0 && (i[i.length - 1] &= 16777215 >>> 24 - s % 32), i = this.F(i, s, 0, this.B(this.s), s);

      return h(i);
    }

    setHMACKey(t, n, r) {
      if (!this.L) throw new Error("Variant does not support HMAC");
      if (this.u) throw new Error("Cannot set MAC key after calling update");
      const i = e(n, (r || {}).encoding || "UTF8", this.K);
      this.M(i(t));
    }

    M(t) {
      const n = this.p >>> 3,
            e = n / 4 - 1;
      let r;
      if (1 !== this.numRounds) throw new Error("Cannot set numRounds with MAC");
      if (this.A) throw new Error("MAC key already set");

      for (n < t.binLen / 8 && (t.value = this.F(t.value, t.binLen, 0, this.B(this.s), this.U)); t.value.length <= e;) t.value.push(0);

      for (r = 0; r <= e; r += 1) this.H[r] = 909522486 ^ t.value[r], this.S[r] = 1549556828 ^ t.value[r];

      this.C = this.R(this.H, this.C), this.l = this.p, this.A = !0;
    }

    getHMAC(t, n) {
      const e = w(n);
      return r(t, this.U, this.K, e)(this.k());
    }

    k() {
      let t;
      if (!this.A) throw new Error("Cannot call getHMAC without first setting MAC key");
      const n = this.F(this.o.slice(), this.h, this.l, this.g(this.C), this.U);
      return t = this.R(this.S, this.B(this.s)), t = this.F(n, this.U, this.p, t, this.U), t;
    }

  }

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
    const e = (65535 & t) + (65535 & n);
    return (65535 & (t >>> 16) + (n >>> 16) + (e >>> 16)) << 16 | 65535 & e;
  }

  function d(t, n, e, r) {
    const i = (65535 & t) + (65535 & n) + (65535 & e) + (65535 & r);
    return (65535 & (t >>> 16) + (n >>> 16) + (e >>> 16) + (r >>> 16) + (i >>> 16)) << 16 | 65535 & i;
  }

  function m(t, n, e, r, i) {
    const s = (65535 & t) + (65535 & n) + (65535 & e) + (65535 & r) + (65535 & i);
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
    let e, r, i, s, o, h, u;
    const w = [];

    for (e = n[0], r = n[1], i = n[2], s = n[3], o = n[4], u = 0; u < 80; u += 1) w[u] = u < 16 ? t[u] : a(w[u - 3] ^ w[u - 8] ^ w[u - 14] ^ w[u - 16], 1), h = u < 20 ? m(a(e, 5), H(r, i, s), o, 1518500249, w[u]) : u < 40 ? m(a(e, 5), E(r, i, s), o, 1859775393, w[u]) : u < 60 ? m(a(e, 5), S(r, i, s), o, 2400959708, w[u]) : m(a(e, 5), E(r, i, s), o, 3395469782, w[u]), o = s, s = i, i = a(r, 30), r = e, e = h;

    return n[0] = p(e, n[0]), n[1] = p(r, n[1]), n[2] = p(i, n[2]), n[3] = p(s, n[3]), n[4] = p(o, n[4]), n;
  }

  function v(t, n, e, r) {
    let i;
    const s = 15 + (n + 65 >>> 9 << 4),
          o = n + e;

    for (; t.length <= s;) t.push(0);

    for (t[n >>> 5] |= 128 << 24 - n % 32, t[s] = 4294967295 & o, t[s - 1] = o / 4294967296 | 0, i = 0; i < t.length; i += 16) r = U(t.slice(i, i + 16), r);

    return r;
  }

  class K extends f {
    constructor(t, n, r) {
      if ("SHA-1" !== t) throw new Error(h);
      super(t, n, r);
      const i = r || {};
      this.L = !0, this.T = this.k, this.K = -1, this.m = e(this.t, this.i, this.K), this.R = U, this.g = function (t) {
        return t.slice();
      }, this.B = R, this.F = v, this.C = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], this.p = 512, this.U = 160, this.v = !1, i.hmacKey && this.M(c("hmacKey", i.hmacKey, this.K));
    }

  }

  function T(t) {
    let n;
    return n = "SHA-224" == t ? s.slice() : o.slice(), n;
  }

  function F(t, n) {
    let e, r, s, o, h, u, w, c, f, a, E;
    const R = [];

    for (e = n[0], r = n[1], s = n[2], o = n[3], h = n[4], u = n[5], w = n[6], c = n[7], E = 0; E < 64; E += 1) R[E] = E < 16 ? t[E] : d(l(U = R[E - 2], 17) ^ l(U, 19) ^ A(U, 10), R[E - 7], C(R[E - 15]), R[E - 16]), f = m(c, y(h), H(h, u, w), i[E], R[E]), a = p(b(e), S(e, r, s)), c = w, w = u, u = h, h = p(o, f), o = s, s = r, r = e, e = p(f, a);

    var U;
    return n[0] = p(e, n[0]), n[1] = p(r, n[1]), n[2] = p(s, n[2]), n[3] = p(o, n[3]), n[4] = p(h, n[4]), n[5] = p(u, n[5]), n[6] = p(w, n[6]), n[7] = p(c, n[7]), n;
  }

  class g extends f {
    constructor(t, n, r) {
      if ("SHA-224" !== t && "SHA-256" !== t) throw new Error(h);
      super(t, n, r);
      const i = r || {};
      this.T = this.k, this.L = !0, this.K = -1, this.m = e(this.t, this.i, this.K), this.R = F, this.g = function (t) {
        return t.slice();
      }, this.B = T, this.F = function (n, e, r, i) {
        return function (t, n, e, r, i) {
          let s, o;
          const h = 15 + (n + 65 >>> 9 << 4),
                u = n + e;

          for (; t.length <= h;) t.push(0);

          for (t[n >>> 5] |= 128 << 24 - n % 32, t[h] = 4294967295 & u, t[h - 1] = u / 4294967296 | 0, s = 0; s < t.length; s += 16) r = F(t.slice(s, s + 16), r);

          return o = "SHA-224" === i ? [r[0], r[1], r[2], r[3], r[4], r[5], r[6]] : r, o;
        }(n, e, r, i, t);
      }, this.C = T(t), this.p = 512, this.U = "SHA-224" === t ? 224 : 256, this.v = !1, i.hmacKey && this.M(c("hmacKey", i.hmacKey, this.K));
    }

  }

  class B {
    constructor(t, n) {
      this.Y = t, this.N = n;
    }

  }

  function L(t, n) {
    let e;
    return n > 32 ? (e = 64 - n, new B(t.N << n | t.Y >>> e, t.Y << n | t.N >>> e)) : 0 !== n ? (e = 32 - n, new B(t.Y << n | t.N >>> e, t.N << n | t.Y >>> e)) : t;
  }

  function M(t, n) {
    let e;
    return n < 32 ? (e = 32 - n, new B(t.Y >>> n | t.N << e, t.N >>> n | t.Y << e)) : (e = 64 - n, new B(t.N >>> n | t.Y << e, t.Y >>> n | t.N << e));
  }

  function k(t, n) {
    return new B(t.Y >>> n, t.N >>> n | t.Y << 32 - n);
  }

  function Y(t, n, e) {
    return new B(t.Y & n.Y ^ t.Y & e.Y ^ n.Y & e.Y, t.N & n.N ^ t.N & e.N ^ n.N & e.N);
  }

  function N(t) {
    const n = M(t, 28),
          e = M(t, 34),
          r = M(t, 39);
    return new B(n.Y ^ e.Y ^ r.Y, n.N ^ e.N ^ r.N);
  }

  function I(t, n) {
    let e, r;
    e = (65535 & t.N) + (65535 & n.N), r = (t.N >>> 16) + (n.N >>> 16) + (e >>> 16);
    const i = (65535 & r) << 16 | 65535 & e;
    e = (65535 & t.Y) + (65535 & n.Y) + (r >>> 16), r = (t.Y >>> 16) + (n.Y >>> 16) + (e >>> 16);
    return new B((65535 & r) << 16 | 65535 & e, i);
  }

  function X(t, n, e, r) {
    let i, s;
    i = (65535 & t.N) + (65535 & n.N) + (65535 & e.N) + (65535 & r.N), s = (t.N >>> 16) + (n.N >>> 16) + (e.N >>> 16) + (r.N >>> 16) + (i >>> 16);
    const o = (65535 & s) << 16 | 65535 & i;
    i = (65535 & t.Y) + (65535 & n.Y) + (65535 & e.Y) + (65535 & r.Y) + (s >>> 16), s = (t.Y >>> 16) + (n.Y >>> 16) + (e.Y >>> 16) + (r.Y >>> 16) + (i >>> 16);
    return new B((65535 & s) << 16 | 65535 & i, o);
  }

  function z(t, n, e, r, i) {
    let s, o;
    s = (65535 & t.N) + (65535 & n.N) + (65535 & e.N) + (65535 & r.N) + (65535 & i.N), o = (t.N >>> 16) + (n.N >>> 16) + (e.N >>> 16) + (r.N >>> 16) + (i.N >>> 16) + (s >>> 16);
    const h = (65535 & o) << 16 | 65535 & s;
    s = (65535 & t.Y) + (65535 & n.Y) + (65535 & e.Y) + (65535 & r.Y) + (65535 & i.Y) + (o >>> 16), o = (t.Y >>> 16) + (n.Y >>> 16) + (e.Y >>> 16) + (r.Y >>> 16) + (i.Y >>> 16) + (s >>> 16);
    return new B((65535 & o) << 16 | 65535 & s, h);
  }

  function x(t, n) {
    return new B(t.Y ^ n.Y, t.N ^ n.N);
  }

  function _(t) {
    const n = M(t, 19),
          e = M(t, 61),
          r = k(t, 6);
    return new B(n.Y ^ e.Y ^ r.Y, n.N ^ e.N ^ r.N);
  }

  function O(t) {
    const n = M(t, 1),
          e = M(t, 8),
          r = k(t, 7);
    return new B(n.Y ^ e.Y ^ r.Y, n.N ^ e.N ^ r.N);
  }

  function P(t) {
    const n = M(t, 14),
          e = M(t, 18),
          r = M(t, 41);
    return new B(n.Y ^ e.Y ^ r.Y, n.N ^ e.N ^ r.N);
  }

  const V = [new B(i[0], 3609767458), new B(i[1], 602891725), new B(i[2], 3964484399), new B(i[3], 2173295548), new B(i[4], 4081628472), new B(i[5], 3053834265), new B(i[6], 2937671579), new B(i[7], 3664609560), new B(i[8], 2734883394), new B(i[9], 1164996542), new B(i[10], 1323610764), new B(i[11], 3590304994), new B(i[12], 4068182383), new B(i[13], 991336113), new B(i[14], 633803317), new B(i[15], 3479774868), new B(i[16], 2666613458), new B(i[17], 944711139), new B(i[18], 2341262773), new B(i[19], 2007800933), new B(i[20], 1495990901), new B(i[21], 1856431235), new B(i[22], 3175218132), new B(i[23], 2198950837), new B(i[24], 3999719339), new B(i[25], 766784016), new B(i[26], 2566594879), new B(i[27], 3203337956), new B(i[28], 1034457026), new B(i[29], 2466948901), new B(i[30], 3758326383), new B(i[31], 168717936), new B(i[32], 1188179964), new B(i[33], 1546045734), new B(i[34], 1522805485), new B(i[35], 2643833823), new B(i[36], 2343527390), new B(i[37], 1014477480), new B(i[38], 1206759142), new B(i[39], 344077627), new B(i[40], 1290863460), new B(i[41], 3158454273), new B(i[42], 3505952657), new B(i[43], 106217008), new B(i[44], 3606008344), new B(i[45], 1432725776), new B(i[46], 1467031594), new B(i[47], 851169720), new B(i[48], 3100823752), new B(i[49], 1363258195), new B(i[50], 3750685593), new B(i[51], 3785050280), new B(i[52], 3318307427), new B(i[53], 3812723403), new B(i[54], 2003034995), new B(i[55], 3602036899), new B(i[56], 1575990012), new B(i[57], 1125592928), new B(i[58], 2716904306), new B(i[59], 442776044), new B(i[60], 593698344), new B(i[61], 3733110249), new B(i[62], 2999351573), new B(i[63], 3815920427), new B(3391569614, 3928383900), new B(3515267271, 566280711), new B(3940187606, 3454069534), new B(4118630271, 4000239992), new B(116418474, 1914138554), new B(174292421, 2731055270), new B(289380356, 3203993006), new B(460393269, 320620315), new B(685471733, 587496836), new B(852142971, 1086792851), new B(1017036298, 365543100), new B(1126000580, 2618297676), new B(1288033470, 3409855158), new B(1501505948, 4234509866), new B(1607167915, 987167468), new B(1816402316, 1246189591)];

  function Z(t) {
    return "SHA-384" === t ? [new B(3418070365, s[0]), new B(1654270250, s[1]), new B(2438529370, s[2]), new B(355462360, s[3]), new B(1731405415, s[4]), new B(41048885895, s[5]), new B(3675008525, s[6]), new B(1203062813, s[7])] : [new B(o[0], 4089235720), new B(o[1], 2227873595), new B(o[2], 4271175723), new B(o[3], 1595750129), new B(o[4], 2917565137), new B(o[5], 725511199), new B(o[6], 4215389547), new B(o[7], 327033209)];
  }

  function j(t, n) {
    let e, r, i, s, o, h, u, w, c, f, a, l;
    const A = [];

    for (e = n[0], r = n[1], i = n[2], s = n[3], o = n[4], h = n[5], u = n[6], w = n[7], a = 0; a < 80; a += 1) a < 16 ? (l = 2 * a, A[a] = new B(t[l], t[l + 1])) : A[a] = X(_(A[a - 2]), A[a - 7], O(A[a - 15]), A[a - 16]), c = z(w, P(o), (H = h, S = u, new B((E = o).Y & H.Y ^ ~E.Y & S.Y, E.N & H.N ^ ~E.N & S.N)), V[a], A[a]), f = I(N(e), Y(e, r, i)), w = u, u = h, h = o, o = I(s, c), s = i, i = r, r = e, e = I(c, f);

    var E, H, S;
    return n[0] = I(e, n[0]), n[1] = I(r, n[1]), n[2] = I(i, n[2]), n[3] = I(s, n[3]), n[4] = I(o, n[4]), n[5] = I(h, n[5]), n[6] = I(u, n[6]), n[7] = I(w, n[7]), n;
  }

  class q extends f {
    constructor(t, n, r) {
      if ("SHA-384" !== t && "SHA-512" !== t) throw new Error(h);
      super(t, n, r);
      const i = r || {};
      this.T = this.k, this.L = !0, this.K = -1, this.m = e(this.t, this.i, this.K), this.R = j, this.g = function (t) {
        return t.slice();
      }, this.B = Z, this.F = function (n, e, r, i) {
        return function (t, n, e, r, i) {
          let s, o;
          const h = 31 + (n + 129 >>> 10 << 5),
                u = n + e;

          for (; t.length <= h;) t.push(0);

          for (t[n >>> 5] |= 128 << 24 - n % 32, t[h] = 4294967295 & u, t[h - 1] = u / 4294967296 | 0, s = 0; s < t.length; s += 32) r = j(t.slice(s, s + 32), r);

          return o = "SHA-384" === i ? [(r = r)[0].Y, r[0].N, r[1].Y, r[1].N, r[2].Y, r[2].N, r[3].Y, r[3].N, r[4].Y, r[4].N, r[5].Y, r[5].N] : [r[0].Y, r[0].N, r[1].Y, r[1].N, r[2].Y, r[2].N, r[3].Y, r[3].N, r[4].Y, r[4].N, r[5].Y, r[5].N, r[6].Y, r[6].N, r[7].Y, r[7].N], o;
        }(n, e, r, i, t);
      }, this.C = Z(t), this.p = 1024, this.U = "SHA-384" === t ? 384 : 512, this.v = !1, i.hmacKey && this.M(c("hmacKey", i.hmacKey, this.K));
    }

  }

  const D = [new B(0, 1), new B(0, 32898), new B(2147483648, 32906), new B(2147483648, 2147516416), new B(0, 32907), new B(0, 2147483649), new B(2147483648, 2147516545), new B(2147483648, 32777), new B(0, 138), new B(0, 136), new B(0, 2147516425), new B(0, 2147483658), new B(0, 2147516555), new B(2147483648, 139), new B(2147483648, 32905), new B(2147483648, 32771), new B(2147483648, 32770), new B(2147483648, 128), new B(0, 32778), new B(2147483648, 2147483658), new B(2147483648, 2147516545), new B(2147483648, 32896), new B(0, 2147483649), new B(2147483648, 2147516424)],
        G = [[0, 36, 3, 41, 18], [1, 44, 10, 45, 2], [62, 6, 43, 15, 61], [28, 55, 25, 21, 56], [27, 20, 39, 8, 14]];

  function J(t) {
    let n;
    const e = [];

    for (n = 0; n < 5; n += 1) e[n] = [new B(0, 0), new B(0, 0), new B(0, 0), new B(0, 0), new B(0, 0)];

    return e;
  }

  function Q(t) {
    let n;
    const e = [];

    for (n = 0; n < 5; n += 1) e[n] = t[n].slice();

    return e;
  }

  function W(t, n) {
    let e, r, i, s;
    const o = [],
          h = [];
    if (null !== t) for (r = 0; r < t.length; r += 2) n[(r >>> 1) % 5][(r >>> 1) / 5 | 0] = x(n[(r >>> 1) % 5][(r >>> 1) / 5 | 0], new B(t[r + 1], t[r]));

    for (e = 0; e < 24; e += 1) {
      for (s = J(), r = 0; r < 5; r += 1) o[r] = (u = n[r][0], w = n[r][1], c = n[r][2], f = n[r][3], a = n[r][4], new B(u.Y ^ w.Y ^ c.Y ^ f.Y ^ a.Y, u.N ^ w.N ^ c.N ^ f.N ^ a.N));

      for (r = 0; r < 5; r += 1) h[r] = x(o[(r + 4) % 5], L(o[(r + 1) % 5], 1));

      for (r = 0; r < 5; r += 1) for (i = 0; i < 5; i += 1) n[r][i] = x(n[r][i], h[r]);

      for (r = 0; r < 5; r += 1) for (i = 0; i < 5; i += 1) s[i][(2 * r + 3 * i) % 5] = L(n[r][i], G[r][i]);

      for (r = 0; r < 5; r += 1) for (i = 0; i < 5; i += 1) n[r][i] = x(s[r][i], new B(~s[(r + 1) % 5][i].Y & s[(r + 2) % 5][i].Y, ~s[(r + 1) % 5][i].N & s[(r + 2) % 5][i].N));

      n[0][0] = x(n[0][0], D[e]);
    }

    var u, w, c, f, a;
    return n;
  }

  function $(t) {
    let n,
        e,
        r = 0;
    const i = [0, 0],
          s = [4294967295 & t, t / 4294967296 & 2097151];

    for (n = 6; n >= 0; n--) e = s[n >> 2] >>> 8 * n & 255, 0 === e && 0 === r || (i[r + 1 >> 2] |= e << 8 * (r + 1), r += 1);

    return r = 0 !== r ? r : 1, i[0] |= r, {
      value: r + 1 > 4 ? i : [i[0]],
      binLen: 8 + 8 * r
    };
  }

  function tt(t) {
    return u($(t.binLen), t);
  }

  function nt(t, n) {
    let e,
        r = $(n);
    r = u(r, t);
    const i = n >>> 2,
          s = (i - r.value.length % i) % i;

    for (e = 0; e < s; e++) r.value.push(0);

    return r.value;
  }

  class et extends f {
    constructor(t, n, r) {
      let i = 6,
          s = 0;
      super(t, n, r);
      const o = r || {};

      if (1 !== this.numRounds) {
        if (o.kmacKey || o.hmacKey) throw new Error("Cannot set numRounds with MAC");
        if ("CSHAKE128" === this.s || "CSHAKE256" === this.s) throw new Error("Cannot set numRounds for CSHAKE variants");
      }

      switch (this.K = 1, this.m = e(this.t, this.i, this.K), this.R = W, this.g = Q, this.B = J, this.C = J(), this.v = !1, t) {
        case "SHA3-224":
          this.p = s = 1152, this.U = 224, this.L = !0, this.T = this.k;
          break;

        case "SHA3-256":
          this.p = s = 1088, this.U = 256, this.L = !0, this.T = this.k;
          break;

        case "SHA3-384":
          this.p = s = 832, this.U = 384, this.L = !0, this.T = this.k;
          break;

        case "SHA3-512":
          this.p = s = 576, this.U = 512, this.L = !0, this.T = this.k;
          break;

        case "SHAKE128":
          i = 31, this.p = s = 1344, this.U = -1, this.v = !0, this.L = !1, this.T = null;
          break;

        case "SHAKE256":
          i = 31, this.p = s = 1088, this.U = -1, this.v = !0, this.L = !1, this.T = null;
          break;

        case "KMAC128":
          i = 4, this.p = s = 1344, this.I(r), this.U = -1, this.v = !0, this.L = !1, this.T = this.X;
          break;

        case "KMAC256":
          i = 4, this.p = s = 1088, this.I(r), this.U = -1, this.v = !0, this.L = !1, this.T = this.X;
          break;

        case "CSHAKE128":
          this.p = s = 1344, i = this._(r), this.U = -1, this.v = !0, this.L = !1, this.T = null;
          break;

        case "CSHAKE256":
          this.p = s = 1088, i = this._(r), this.U = -1, this.v = !0, this.L = !1, this.T = null;
          break;

        default:
          throw new Error(h);
      }

      this.F = function (t, n, e, r, o) {
        return function (t, n, e, r, i, s, o) {
          let h,
              u,
              w = 0;
          const c = [],
                f = i >>> 5,
                a = n >>> 5;

          for (h = 0; h < a && n >= i; h += f) r = W(t.slice(h, h + f), r), n -= i;

          for (t = t.slice(h), n %= i; t.length < f;) t.push(0);

          for (h = n >>> 3, t[h >> 2] ^= s << h % 4 * 8, t[f - 1] ^= 2147483648, r = W(t, r); 32 * c.length < o && (u = r[w % 5][w / 5 | 0], c.push(u.N), !(32 * c.length >= o));) c.push(u.Y), w += 1, 0 == 64 * w % i && (W(null, r), w = 0);

          return c;
        }(t, n, 0, r, s, i, o);
      }, o.hmacKey && this.M(c("hmacKey", o.hmacKey, this.K));
    }

    _(t, n) {
      const e = function (t) {
        const n = t || {};
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
      const r = u(tt(e.funcName), tt(e.customization));

      if (0 !== e.customization.binLen || 0 !== e.funcName.binLen) {
        const t = nt(r, this.p >>> 3);

        for (let n = 0; n < t.length; n += this.p >>> 5) this.C = this.R(t.slice(n, n + (this.p >>> 5)), this.C), this.l += this.p;

        return 4;
      }

      return 31;
    }

    I(t) {
      const n = function (t) {
        const n = t || {};
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

      const e = nt(tt(n.kmacKey), this.p >>> 3);

      for (let t = 0; t < e.length; t += this.p >>> 5) this.C = this.R(e.slice(t, t + (this.p >>> 5)), this.C), this.l += this.p;

      this.A = !0;
    }

    X(t) {
      const n = u({
        value: this.o.slice(),
        binLen: this.h
      }, function (t) {
        let n,
            e,
            r = 0;
        const i = [0, 0],
              s = [4294967295 & t, t / 4294967296 & 2097151];

        for (n = 6; n >= 0; n--) e = s[n >> 2] >>> 8 * n & 255, 0 === e && 0 === r || (i[r >> 2] |= e << 8 * r, r += 1);

        return r = 0 !== r ? r : 1, i[r >> 2] |= r << 8 * r, {
          value: r + 1 > 4 ? i : [i[0]],
          binLen: 8 + 8 * r
        };
      }(t.outputLen));
      return this.F(n.value, n.binLen, this.l, this.g(this.C), t.outputLen);
    }

  }

  class jsSHA {
    constructor(t, n, e) {
      if ("SHA-1" == t) this.O = new K(t, n, e);else if ("SHA-224" == t || "SHA-256" == t) this.O = new g(t, n, e);else if ("SHA-384" == t || "SHA-512" == t) this.O = new q(t, n, e);else {
        if ("SHA3-224" != t && "SHA3-256" != t && "SHA3-384" != t && "SHA3-512" != t && "SHAKE128" != t && "SHAKE256" != t && "CSHAKE128" != t && "CSHAKE256" != t && "KMAC128" != t && "KMAC256" != t) throw new Error(h);
        this.O = new et(t, n, e);
      }
    }

    update(t) {
      this.O.update(t);
    }

    getHash(t, n) {
      return this.O.getHash(t, n);
    }

    setHMACKey(t, n, e) {
      this.O.setHMACKey(t, n, e);
    }

    getHMAC(t, n) {
      return this.O.getHMAC(t, n);
    }

  }

  /**
   * "globalThis" ponyfill.
   * @see [A horrifying globalThis polyfill in universal JavaScript](https://mathiasbynens.be/notes/globalthis)
   * @type {Object.<string, *>}
   */
  const globalScope = (() => {
    // @ts-ignore
    if (typeof globalThis === "object") return globalThis;else {
      Object.defineProperty(Object.prototype, "__GLOBALTHIS__", {
        get() {
          return this;
        },

        configurable: true
      });

      try {
        // @ts-ignore
        // eslint-disable-next-line no-undef
        if (typeof __GLOBALTHIS__ !== "undefined") return __GLOBALTHIS__;
      } finally {
        // @ts-ignore
        delete Object.prototype.__GLOBALTHIS__;
      }
    } // Still unable to determine "globalThis", fall back to a naive method.

    if (typeof self !== "undefined") return self;else if (typeof window !== "undefined") return window;else if (typeof global !== "undefined") return global;
    return undefined;
  })();

  /**
   * Detect if running in Node.js.
   * @type {boolean}
   */

  const isNode = Object.prototype.toString.call(globalScope.process) === "[object process]";

  /**
   * Dynamically import Node.js modules ("eval" is used to prevent bundlers from including the module).
   * @see [webpack/webpack#8826](https://github.com/webpack/webpack/issues/8826)
   * @param {string} name Module name.
   * @returns {*} Module.
   */

  const nodeRequire = isNode ? eval("require") : () => {};

  const NodeCrypto$2 = isNode ? nodeRequire("crypto") : undefined;
  /**
   * OpenSSL to jsSHA algorithms.
   * @type {Object.<string, string>}
   */

  const OPENSSL_TO_JSSHA_ALGO = {
    SHA1: "SHA-1",
    SHA224: "SHA-224",
    SHA256: "SHA-256",
    SHA384: "SHA-384",
    SHA512: "SHA-512",
    "SHA3-224": "SHA3-224",
    "SHA3-256": "SHA3-256",
    "SHA3-384": "SHA3-384",
    "SHA3-512": "SHA3-512"
  };
  /**
   * Calculates an HMAC digest.
   * In Node.js, the command "openssl list -digest-algorithms" displays the available digest algorithms.
   * @param {string} algorithm Algorithm.
   * @param {ArrayBuffer} key Key.
   * @param {ArrayBuffer} message Message.
   * @returns {ArrayBuffer} Digest.
   */

  const hmacDigest = (algorithm, key, message) => {
    if (isNode) {
      const hmac = NodeCrypto$2.createHmac(algorithm, globalScope.Buffer.from(key));
      hmac.update(globalScope.Buffer.from(message));
      return hmac.digest().buffer;
    } else {
      const variant = OPENSSL_TO_JSSHA_ALGO[algorithm.toUpperCase()];

      if (typeof variant === "undefined") {
        throw new TypeError("Unknown hash function");
      } // @ts-ignore


      const hmac = new jsSHA(variant, "ARRAYBUFFER");
      hmac.setHMACKey(key, "ARRAYBUFFER");
      hmac.update(message);
      return hmac.getHMAC("ARRAYBUFFER");
    }
  };

  /**
   * Pads a number with leading zeros.
   * @param {number|string} num Number.
   * @param {number} digits Digits.
   * @returns {string} Padded number.
   */
  const pad = (num, digits) => {
    let prefix = "";
    let repeat = digits - String(num).length;

    while (repeat-- > 0) prefix += "0";

    return `${prefix}${num}`;
  };

  /**
   * RFC 4648 base32 alphabet without pad.
   * @type {string}
   */
  const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  /**
   * Converts a base32 string to an ArrayBuffer (RFC 4648).
   * @see [LinusU/base32-decode](https://github.com/LinusU/base32-decode)
   * @param {string} str Base32 string.
   * @returns {ArrayBuffer} ArrayBuffer.
   */

  const base32ToBuf = str => {
    // Canonicalize to all upper case and remove padding if it exists.
    let end = str.length;

    while (str[end - 1] === "=") --end;

    const cstr = (end < str.length ? str.substring(0, end) : str).toUpperCase();
    const buf = new ArrayBuffer(cstr.length * 5 / 8 | 0);
    const arr = new Uint8Array(buf);
    let bits = 0;
    let value = 0;
    let index = 0;

    for (let i = 0; i < cstr.length; i++) {
      const idx = ALPHABET.indexOf(cstr[i]);
      if (idx === -1) throw new TypeError(`Invalid character found: ${cstr[i]}`);
      value = value << 5 | idx;
      bits += 5;

      if (bits >= 8) {
        bits -= 8;
        arr[index++] = value >>> bits;
      }
    }

    return buf;
  };
  /**
   * Converts an ArrayBuffer to a base32 string (RFC 4648).
   * @see [LinusU/base32-encode](https://github.com/LinusU/base32-encode)
   * @param {ArrayBuffer} buf ArrayBuffer.
   * @returns {string} Base32 string.
   */


  const base32FromBuf = buf => {
    const arr = new Uint8Array(buf);
    let bits = 0;
    let value = 0;
    let str = "";

    for (let i = 0; i < arr.length; i++) {
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
   * Converts a hexadecimal string to an ArrayBuffer.
   * @param {string} str Hexadecimal string.
   * @returns {ArrayBuffer} ArrayBuffer.
   */
  const hexToBuf = str => {
    const buf = new ArrayBuffer(str.length / 2);
    const arr = new Uint8Array(buf);

    for (let i = 0; i < str.length; i += 2) {
      arr[i / 2] = parseInt(str.substr(i, 2), 16);
    }

    return buf;
  };
  /**
   * Converts an ArrayBuffer to a hexadecimal string.
   * @param {ArrayBuffer} buf ArrayBuffer.
   * @returns {string} Hexadecimal string.
   */


  const hexFromBuf = buf => {
    const arr = new Uint8Array(buf);
    let str = "";

    for (let i = 0; i < arr.length; i++) {
      const hex = arr[i].toString(16);
      if (hex.length === 1) str += "0";
      str += hex;
    }

    return str.toUpperCase();
  };

  /**
   * Converts a Latin-1 string to an ArrayBuffer.
   * @param {string} str Latin-1 string.
   * @returns {ArrayBuffer} ArrayBuffer.
   */
  const latin1ToBuf = str => {
    const buf = new ArrayBuffer(str.length);
    const arr = new Uint8Array(buf);

    for (let i = 0; i < str.length; i++) {
      arr[i] = str.charCodeAt(i) & 0xff;
    }

    return buf;
  };
  /**
   * Converts an ArrayBuffer to a Latin-1 string.
   * @param {ArrayBuffer} buf ArrayBuffer.
   * @returns {string} Latin-1 string.
   */


  const latin1FromBuf = buf => {
    const arr = new Uint8Array(buf);
    let str = "";

    for (let i = 0; i < arr.length; i++) {
      str += String.fromCharCode(arr[i]);
    }

    return str;
  };

  /**
   * TextEncoder instance.
   * @type {TextEncoder|null}
   */

  const ENCODER = globalScope.TextEncoder ? new globalScope.TextEncoder("utf-8") : null;
  /**
   * TextDecoder instance.
   * @type {TextDecoder|null}
   */

  const DECODER = globalScope.TextDecoder ? new globalScope.TextDecoder("utf-8") : null;
  /**
   * Converts an UTF-8 string to an ArrayBuffer.
   * @param {string} str String.
   * @returns {ArrayBuffer} ArrayBuffer.
   */

  const utf8ToBuf = str => {
    if (!ENCODER) {
      throw new Error("Encoding API not available");
    }

    return ENCODER.encode(str).buffer;
  };
  /**
   * Converts an ArrayBuffer to an UTF-8 string.
   * @param {ArrayBuffer} buf ArrayBuffer.
   * @returns {string} String.
   */


  const utf8FromBuf = buf => {
    if (!DECODER) {
      throw new Error("Encoding API not available");
    }

    return DECODER.decode(buf);
  };

  const NodeCrypto$1 = isNode ? nodeRequire("crypto") : undefined;
  /**
   * Returns random bytes.
   * @param {number} size Size.
   * @returns {ArrayBuffer} Random bytes.
   */

  const randomBytes = size => {
    if (isNode) {
      return NodeCrypto$1.randomBytes(size).buffer;
    } else {
      if (!globalScope.crypto || !globalScope.crypto.getRandomValues) {
        throw new Error("Cryptography API not available");
      }

      return globalScope.crypto.getRandomValues(new Uint8Array(size)).buffer;
    }
  };

  /**
   * OTP secret key.
   */

  class Secret {
    /**
     * Creates a secret key object.
     * @param {Object} [config] Configuration options.
     * @param {ArrayBuffer} [config.buffer=randomBytes] Secret key.
     * @param {number} [config.size=20] Number of random bytes to generate, ignored if 'buffer' is provided.
     */
    constructor() {
      let {
        buffer,
        size = 20
      } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      /**
       * Secret key.
       * @type {ArrayBuffer}
       */
      this.buffer = typeof buffer === "undefined" ? randomBytes(size) : buffer;
    }
    /**
     * Converts a Latin-1 string to a Secret object.
     * @param {string} str Latin-1 string.
     * @returns {Secret} Secret object.
     */


    static fromLatin1(str) {
      return new Secret({
        buffer: latin1ToBuf(str)
      });
    }
    /**
     * Converts an UTF-8 string to a Secret object.
     * @param {string} str UTF-8 string.
     * @returns {Secret} Secret object.
     */


    static fromUTF8(str) {
      return new Secret({
        buffer: utf8ToBuf(str)
      });
    }
    /**
     * Converts a base32 string to a Secret object.
     * @param {string} str Base32 string.
     * @returns {Secret} Secret object.
     */


    static fromBase32(str) {
      return new Secret({
        buffer: base32ToBuf(str)
      });
    }
    /**
     * Converts a hexadecimal string to a Secret object.
     * @param {string} str Hexadecimal string.
     * @returns {Secret} Secret object.
     */


    static fromHex(str) {
      return new Secret({
        buffer: hexToBuf(str)
      });
    }
    /**
     * Latin-1 string representation of secret key.
     * @type {string}
     */


    get latin1() {
      Object.defineProperty(this, "latin1", {
        enumerable: true,
        value: latin1FromBuf(this.buffer)
      });
      return this.latin1;
    }
    /**
     * UTF-8 string representation of secret key.
     * @type {string}
     */


    get utf8() {
      Object.defineProperty(this, "utf8", {
        enumerable: true,
        value: utf8FromBuf(this.buffer)
      });
      return this.utf8;
    }
    /**
     * Base32 string representation of secret key.
     * @type {string}
     */


    get base32() {
      Object.defineProperty(this, "base32", {
        enumerable: true,
        value: base32FromBuf(this.buffer)
      });
      return this.base32;
    }
    /**
     * Hexadecimal string representation of secret key.
     * @type {string}
     */


    get hex() {
      Object.defineProperty(this, "hex", {
        enumerable: true,
        value: hexFromBuf(this.buffer)
      });
      return this.hex;
    }

  }

  const NodeCrypto = isNode ? nodeRequire("crypto") : undefined;
  /**
   * Returns true if a is equal to b, without leaking timing information that would allow an attacker to guess one of the values.
   * @param {string} a String a.
   * @param {string} b String b.
   * @returns {boolean} Equality result.
   */

  const timingSafeEqual = (a, b) => {
    if (isNode) {
      return NodeCrypto.timingSafeEqual(globalScope.Buffer.from(a), globalScope.Buffer.from(b));
    } else {
      if (a.length !== b.length) {
        throw new TypeError("Input strings must have the same length");
      }

      let i = -1;
      let out = 0;

      while (++i < a.length) {
        out |= a.charCodeAt(i) ^ b.charCodeAt(i);
      }

      return out === 0;
    }
  };

  /**
   * HOTP: An HMAC-based One-time Password Algorithm.
   * @see [RFC 4226](https://tools.ietf.org/html/rfc4226)
   */

  class HOTP {
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
    static get defaults() {
      return {
        issuer: "",
        label: "OTPAuth",
        algorithm: "SHA1",
        digits: 6,
        counter: 0,
        window: 1
      };
    }
    /**
     * Creates an HOTP object.
     * @param {Object} [config] Configuration options.
     * @param {string} [config.issuer=''] Account provider.
     * @param {string} [config.label='OTPAuth'] Account label.
     * @param {Secret|string} [config.secret=Secret] Secret key.
     * @param {string} [config.algorithm='SHA1'] HMAC hashing algorithm.
     * @param {number} [config.digits=6] Token length.
     * @param {number} [config.counter=0] Initial counter value.
     */


    constructor() {
      let {
        issuer = HOTP.defaults.issuer,
        label = HOTP.defaults.label,
        secret = new Secret(),
        algorithm = HOTP.defaults.algorithm,
        digits = HOTP.defaults.digits,
        counter = HOTP.defaults.counter
      } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

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

      this.secret = typeof secret === "string" ? Secret.fromBase32(secret) : secret;
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


    static generate(_ref) {
      let {
        secret,
        algorithm = HOTP.defaults.algorithm,
        digits = HOTP.defaults.digits,
        counter = HOTP.defaults.counter
      } = _ref;
      const digest = new Uint8Array(hmacDigest(algorithm, secret.buffer, uintToBuf(counter)));
      const offset = digest[digest.byteLength - 1] & 15;
      const otp = ((digest[offset] & 127) << 24 | (digest[offset + 1] & 255) << 16 | (digest[offset + 2] & 255) << 8 | digest[offset + 3] & 255) % 10 ** digits;
      return pad(otp, digits);
    }
    /**
     * Generates an HOTP token.
     * @param {Object} [config] Configuration options.
     * @param {number} [config.counter=this.counter++] Counter value.
     * @returns {string} Token.
     */


    generate() {
      let {
        counter = this.counter++
      } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return HOTP.generate({
        secret: this.secret,
        algorithm: this.algorithm,
        digits: this.digits,
        counter
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


    static validate(_ref2) {
      let {
        token,
        secret,
        algorithm,
        digits,
        counter = HOTP.defaults.counter,
        window = HOTP.defaults.window
      } = _ref2;
      // Return early if the token length does not match the digit number.
      if (token.length !== digits) return null;
      let delta = null;

      for (let i = counter - window; i <= counter + window; ++i) {
        const generatedToken = HOTP.generate({
          secret,
          algorithm,
          digits,
          counter: i
        });

        if (timingSafeEqual(token, generatedToken)) {
          delta = i - counter;
        }
      }

      return delta;
    }
    /**
     * Validates an HOTP token.
     * @param {Object} config Configuration options.
     * @param {string} config.token Token value.
     * @param {number} [config.counter=this.counter] Counter value.
     * @param {number} [config.window=1] Window of counter values to test.
     * @returns {number|null} Token delta, or null if the token is not found.
     */


    validate(_ref3) {
      let {
        token,
        counter = this.counter,
        window
      } = _ref3;
      return HOTP.validate({
        token,
        secret: this.secret,
        algorithm: this.algorithm,
        digits: this.digits,
        counter,
        window
      });
    }
    /**
     * Returns a Google Authenticator key URI.
     * @returns {string} URI.
     */


    toString() {
      const e = encodeURIComponent;
      return "otpauth://hotp/" + `${this.issuer.length > 0 ? `${e(this.issuer)}:${e(this.label)}?issuer=${e(this.issuer)}&` : `${e(this.label)}?`}` + `secret=${e(this.secret.base32)}&` + `algorithm=${e(this.algorithm)}&` + `digits=${e(this.digits)}&` + `counter=${e(this.counter)}`;
    }

  }

  /**
   * TOTP: Time-Based One-Time Password Algorithm.
   * @see [RFC 6238](https://tools.ietf.org/html/rfc6238)
   */

  class TOTP {
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
    static get defaults() {
      return {
        issuer: "",
        label: "OTPAuth",
        algorithm: "SHA1",
        digits: 6,
        period: 30,
        window: 1
      };
    }
    /**
     * Creates a TOTP object.
     * @param {Object} [config] Configuration options.
     * @param {string} [config.issuer=''] Account provider.
     * @param {string} [config.label='OTPAuth'] Account label.
     * @param {Secret|string} [config.secret=Secret] Secret key.
     * @param {string} [config.algorithm='SHA1'] HMAC hashing algorithm.
     * @param {number} [config.digits=6] Token length.
     * @param {number} [config.period=30] Token time-step duration.
     */


    constructor() {
      let {
        issuer = TOTP.defaults.issuer,
        label = TOTP.defaults.label,
        secret = new Secret(),
        algorithm = TOTP.defaults.algorithm,
        digits = TOTP.defaults.digits,
        period = TOTP.defaults.period
      } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

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

      this.secret = typeof secret === "string" ? Secret.fromBase32(secret) : secret;
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


    static generate(_ref) {
      let {
        secret,
        algorithm,
        digits,
        period = TOTP.defaults.period,
        timestamp = Date.now()
      } = _ref;
      return HOTP.generate({
        secret,
        algorithm,
        digits,
        counter: Math.floor(timestamp / 1000 / period)
      });
    }
    /**
     * Generates a TOTP token.
     * @param {Object} [config] Configuration options.
     * @param {number} [config.timestamp=Date.now] Timestamp value in milliseconds.
     * @returns {string} Token.
     */


    generate() {
      let {
        timestamp = Date.now()
      } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return TOTP.generate({
        secret: this.secret,
        algorithm: this.algorithm,
        digits: this.digits,
        period: this.period,
        timestamp
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


    static validate(_ref2) {
      let {
        token,
        secret,
        algorithm,
        digits,
        period = TOTP.defaults.period,
        timestamp = Date.now(),
        window
      } = _ref2;
      return HOTP.validate({
        token,
        secret,
        algorithm,
        digits,
        counter: Math.floor(timestamp / 1000 / period),
        window
      });
    }
    /**
     * Validates a TOTP token.
     * @param {Object} config Configuration options.
     * @param {string} config.token Token value.
     * @param {number} [config.timestamp=Date.now] Timestamp value in milliseconds.
     * @param {number} [config.window=1] Window of counter values to test.
     * @returns {number|null} Token delta, or null if the token is not found.
     */


    validate(_ref3) {
      let {
        token,
        timestamp,
        window
      } = _ref3;
      return TOTP.validate({
        token,
        secret: this.secret,
        algorithm: this.algorithm,
        digits: this.digits,
        period: this.period,
        timestamp,
        window
      });
    }
    /**
     * Returns a Google Authenticator key URI.
     * @returns {string} URI.
     */


    toString() {
      const e = encodeURIComponent;
      return "otpauth://totp/" + `${this.issuer.length > 0 ? `${e(this.issuer)}:${e(this.label)}?issuer=${e(this.issuer)}&` : `${e(this.label)}?`}` + `secret=${e(this.secret.base32)}&` + `algorithm=${e(this.algorithm)}&` + `digits=${e(this.digits)}&` + `period=${e(this.period)}`;
    }

  }

  /**
   * Key URI regex (otpauth://TYPE/[ISSUER:]LABEL?PARAMETERS).
   * @type {RegExp}
   */

  const OTPURI_REGEX = /^otpauth:\/\/([ht]otp)\/(.+)\?([A-Z0-9.~_-]+=[^?&]*(?:&[A-Z0-9.~_-]+=[^?&]*)*)$/i;
  /**
   * RFC 4648 base32 alphabet with pad.
   * @type {RegExp}
   */

  const SECRET_REGEX = /^[2-7A-Z]+=*$/i;
  /**
   * Regex for supported algorithms.
   * @type {RegExp}
   */

  const ALGORITHM_REGEX = /^SHA(?:1|224|256|384|512|3-224|3-256|3-384|3-512)$/i;
  /**
   * Integer regex.
   * @type {RegExp}
   */

  const INTEGER_REGEX = /^[+-]?\d+$/;
  /**
   * Positive integer regex.
   * @type {RegExp}
   */

  const POSITIVE_INTEGER_REGEX = /^\+?[1-9]\d*$/;
  /**
   * HOTP/TOTP object/string conversion.
   * @see [Key URI Format](https://github.com/google/google-authenticator/wiki/Key-Uri-Format)
   */

  class URI {
    /**
     * Parses a Google Authenticator key URI and returns an HOTP/TOTP object.
     * @param {string} uri Google Authenticator Key URI.
     * @returns {HOTP|TOTP} HOTP/TOTP object.
     */
    static parse(uri) {
      let uriGroups;

      try {
        uriGroups = uri.match(OTPURI_REGEX);
      } catch (error) {
        /* Handled below */
      }

      if (!Array.isArray(uriGroups)) {
        throw new URIError("Invalid URI format");
      } // Extract URI groups.


      const uriType = uriGroups[1].toLowerCase();
      const uriLabel = uriGroups[2].split(/(?::|%3A) *(.+)/i, 2).map(decodeURIComponent);
      /** @type {Object.<string, string>} */

      const uriParams = uriGroups[3].split("&").reduce((acc, cur) => {
        const pairArr = cur.split(/=(.*)/, 2).map(decodeURIComponent);
        const pairKey = pairArr[0].toLowerCase();
        const pairVal = pairArr[1];
        /** @type {Object.<string, string>} */

        const pairAcc = acc;
        pairAcc[pairKey] = pairVal;
        return pairAcc;
      }, {}); // 'OTP' will be instantiated with 'config' argument.

      let OTP;
      const config = {};

      if (uriType === "hotp") {
        OTP = HOTP; // Counter: required

        if (typeof uriParams.counter !== "undefined" && INTEGER_REGEX.test(uriParams.counter)) {
          config.counter = parseInt(uriParams.counter, 10);
        } else {
          throw new TypeError("Missing or invalid 'counter' parameter");
        }
      } else if (uriType === "totp") {
        OTP = TOTP; // Period: optional

        if (typeof uriParams.period !== "undefined") {
          if (POSITIVE_INTEGER_REGEX.test(uriParams.period)) {
            config.period = parseInt(uriParams.period, 10);
          } else {
            throw new TypeError("Invalid 'period' parameter");
          }
        }
      } else {
        throw new TypeError("Unknown OTP type");
      } // Label: required
      // Issuer: optional


      if (uriLabel.length === 2) {
        config.label = uriLabel[1];
        config.issuer = uriLabel[0];
      } else {
        config.label = uriLabel[0];

        if (typeof uriParams.issuer !== "undefined") {
          config.issuer = uriParams.issuer;
        }
      } // Secret: required


      if (typeof uriParams.secret !== "undefined" && SECRET_REGEX.test(uriParams.secret)) {
        config.secret = uriParams.secret;
      } else {
        throw new TypeError("Missing or invalid 'secret' parameter");
      } // Algorithm: optional


      if (typeof uriParams.algorithm !== "undefined") {
        if (ALGORITHM_REGEX.test(uriParams.algorithm)) {
          config.algorithm = uriParams.algorithm;
        } else {
          throw new TypeError("Invalid 'algorithm' parameter");
        }
      } // Digits: optional


      if (typeof uriParams.digits !== "undefined") {
        if (POSITIVE_INTEGER_REGEX.test(uriParams.digits)) {
          config.digits = parseInt(uriParams.digits, 10);
        } else {
          throw new TypeError("Invalid 'digits' parameter");
        }
      }

      return new OTP(config);
    }
    /**
     * Converts an HOTP/TOTP object to a Google Authenticator key URI.
     * @param {HOTP|TOTP} otp HOTP/TOTP object.
     * @returns {string} Google Authenticator Key URI.
     */


    static stringify(otp) {
      if (otp instanceof HOTP || otp instanceof TOTP) {
        return otp.toString();
      }

      throw new TypeError("Invalid 'HOTP/TOTP' object");
    }

  }

  /**
   * Library version.
   * @type {string}
   */
  const version = "8.0.1";

  exports.HOTP = HOTP;
  exports.Secret = Secret;
  exports.TOTP = TOTP;
  exports.URI = URI;
  exports.version = version;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
