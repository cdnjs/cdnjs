/**
 * Crunch - Arbitrary-precision integer arithmetic library
 * Copyright (C) 2014 Nenad Vukicevic crunch.secureroom.net/license
 */

/**
 * @module Crunch
 * Radix: 28 bits
 * Endianness: Big
 *
 * @param {boolean} rawIn   - expect 28-bit arrays
 * @param {boolean} rawOut  - return 28-bit arrays
 */
function Crunch (rawIn, rawOut) {

  "use strict";

  /**
   * BEGIN CONSTANTS
   * zeroes, primes and ptests for Miller-Rabin primality
   */

  // sieve of Eratosthenes for first 1900 primes
  var primes = (function(n) {
    var arr  = new Array(Math.ceil((n - 2) / 32)),
        maxi = (n - 3) / 2,
        p    = [2];

    for (var q = 3, i, index, bit; q < n; q += 2) {
      i     = (q - 3) / 2;
      index = i >> 5;
      bit   = i & 31;

      if ((arr[index] & (1 << bit)) == 0) {
        // q is prime
        p.push(q);
        i += q;

        for (var d = q; i < maxi; i += d) {
          index = i >> 5;
          bit   = i & 31;

          arr[index] |= (1 << bit);
        }
      }
    }

    return p;

  })(16382);

  var zeroes = (function (n) {
    for (var z = []; z.push(0) < n;){}
    return z;
  })(50000);

  var ptests = primes.slice(0, 10).map(function (v) {
    return [v];
  });
  /* END CONSTANTS */

  function cut (x) {
    while (x[0] === 0 && x.length > 1) {
      x.shift();
    }

    return x;
  }

  function cmp (x, y) {
    var xl = x.length,
        yl = y.length, i; //zero front pad problem

    if (x.negative && !y.negative || xl < yl) {
      return -1;
    } else if (!x.negative && y.negative || xl > yl) {
      return 1;
    }

    for (i = 0; i < xl; i++) {
      if (x[i] < y[i]) return -1;
      if (x[i] > y[i]) return 1;
    }

    return 0;
  }

  /**
   * Most significant bit, base 28, position from left
   */
  function msb (x) {
    if (x !== 0) {
      for (var i = 134217728, z = 0; i > x; z++) {
        i /= 2;
      }

      return z;
    }
  }

  /**
   * Least significant bit, base 28, position from right
   */
  function lsb (x) {
    if (x !== 0) {
      for (var z = 0; !(x & 1); z++) {
        x /= 2;
      }

      return z;
    }
  }

  function add (x, y) {
    var n = x.length,
        t = y.length,
        i = Math.max(n, t),
        c = 0,
        z = zeroes.slice(0, i);

    if (n < t) {
      x = zeroes.slice(0, t-n).concat(x);
    } else if (n > t) {
      y = zeroes.slice(0, n-t).concat(y);
    }

    for (i -= 1; i >= 0; i--) {
      z[i] = x[i] + y[i] + c;

      if (z[i] > 268435455) {
        c = 1;
        z[i] -= 268435456;
      } else {
        c = 0;
      }
    }

    if (c === 1) {
      z.unshift(c);
    }

    return z;
  }

  function sub (x, y, internal) {
    var n = x.length,
        t = y.length,
        i = Math.max(n, t),
        c = 0,
        z = zeroes.slice(0, i);

    if (n < t) {
      x = zeroes.slice(0, t-n).concat(x);
    } else if (n > t) {
      y = zeroes.slice(0, n-t).concat(y);
    }

    for (i -= 1; i >= 0; i--) {
      z[i] = x[i] - y[i] - c;

      if (z[i] < 0) {
        c = 1;
        z[i] += 268435456;
      } else {
        c = 0;
      }
    }

    if (c === 1 && !internal) {
      z = sub(zeroes.slice(0, z.length), z, true);
      z.negative = true;
    }

    return z;
  }

  /**
   * Signed Addition
   */
  function sad (x, y) {
    var z;

    if (x.negative) {
      if (y.negative) {
        z = add(x, y);
        z.negative = true;
      } else {
        z = cut(sub(y, x, false));
      }
    } else {
      z = y.negative ? cut(sub(x, y, false)) : add(x, y);
    }

    return z;
  }

  /**
   * Signed Subtraction
   */
  function ssb (x, y) {
    var z;

    if (x.negative) {
      if (y.negative) {
        z = cut(sub(y, x, false));
      } else {
        z = add(x, y);
        z.negative = true;
      }
    } else {
      z = y.negative ? add(x, y) : cut(sub(x, y, false));
    }

    return z;
  }

  /**
   * Multiplication - HAC 14.12
   */
  function mul (x, y) {
    var yl, yh, c,
        n = x.length,
        i = y.length,
        z = zeroes.slice(0, n+i);

    while (i--) {
      c = 0;

      yl = y[i] & 16383;
      yh = y[i] >> 14;

      for (var j = n-1, xl, xh, t1, t2; j >= 0; j--) {
        xl = x[j] & 16383;
        xh = x[j] >> 14;

        t1 = yh*xl + xh*yl;
        t2 = yl*xl + ((t1 & 16383) << 14) + z[j+i+1] + c;

        z[j+i+1] = t2 & 268435455;
        c = yh*xh + (t1 >> 14) + (t2 >> 28);
      }

      z[i] = c;
    }

    if (z[0] === 0) {
      z.shift();
    }

    z.negative = (x.negative ^ y.negative) ? true : false;

    return z;
  }

  /**
   *  Karatsuba Multiplication, works faster when numbers gets bigger
   */
  function mulk (x, y) {
    var z, lx, ly, negx, negy, b;

    if (x.length > y.length) {
      z = x; x = y; y = z;
    }
    lx = x.length;
    ly = y.length;
    negx = x.negative,
    negy = y.negative;
    x.negative = false;
    y.negative = false;

    if (lx <= 100) {
      z = mul(x, y);
    } else if (ly / lx >= 2) {
      b = (ly + 1) >> 1;
      z = sad(
        lsh(mulk(x, y.slice(0, ly-b)), b * 28),
        mulk(x, y.slice(ly-b, ly))
      );
    } else {
      b = (ly + 1) >> 1;
      var
          x0 = x.slice(lx-b, lx),
          x1 = x.slice(0, lx-b),
          y0 = y.slice(ly-b, ly),
          y1 = y.slice(0, ly-b),
          z0 = mulk(x0, y0),
          z2 = mulk(x1, y1),
          z1 = ssb(sad(z0, z2), mulk(ssb(x1, x0), ssb(y1, y0)));
      z2 = lsh(z2, b * 2 * 28);
      z1 = lsh(z1, b * 28);

      z = sad(sad(z2, z1), z0);
    }

    z.negative = (negx ^ negy) ? true : false;
    x.negative = negx;
    y.negative = negy;

    return z;
  }

  /**
   * Squaring - HAC 14.16
   */
  function sqr (x) {
    var l1, h1, t1, t2, c,
        i = x.length,
        z = zeroes.slice(0, 2*i);

    while (i--) {
      l1 = x[i] & 16383;
      h1 = x[i] >> 14;

      t1 = 2*h1*l1;
      t2 = l1*l1 + ((t1 & 16383) << 14) + z[2*i+1];

      z[2*i+1] = t2 & 268435455;
      c = h1*h1 + (t1 >> 14) + (t2 >> 28);

      for (var j = i-1, l2, h2; j >= 0; j--) {
        l2 = (2 * x[j]) & 16383;
        h2 = x[j] >> 13;

        t1 = h2*l1 + h1*l2;
        t2 = l2*l1 + ((t1 & 16383) << 14) + z[j+i+1] + c;
        z[j+i+1] = t2 & 268435455;
        c = h2*h1 + (t1 >> 14) + (t2 >> 28);
      }

      z[i] = c;
    }

    if (z[0] === 0) {
      z.shift();
    }

    return z;
  }

  function rsh (x, s) {
    var ss = s % 28,
        ls = Math.floor(s/28),
        l  = x.length - ls,
        z  = x.slice(0,l);

    if (ss) {
      while (--l) {
        z[l] = ((z[l] >> ss) | (z[l-1] << (28-ss))) & 268435455;
      }

      z[l] = z[l] >> ss;

      if (z[0] === 0) {
        z.shift();
      }
    }

    z.negative = x.negative;

    return z;
  }

  function lsh (x, s) {
    var ss = s % 28,
        ls = Math.floor(s/28),
        l  = x.length,
        z  = [],
        t  = 0;

    if (ss) {
      while (l--) {
        z[l] = ((x[l] << ss) + t) & 268435455;
        t    = x[l] >>> (28 - ss);
      }

      if (t !== 0) {
        z.unshift(t);
      }

      z.negative = x.negative;

    } else {
      z = x;
    }

    return (ls) ? z.concat(zeroes.slice(0, ls)) : z;
  }

  /**
   * Division - HAC 14.20
   */
  function div (x, y, internal) {
    var u, v, xt, yt, d, q, k, i, z,
        s = msb(y[0]) - 1;

    if (s > 0) {
      u = lsh(x, s);
      v = lsh(y, s);
    } else {
      u = x.slice();
      v = y.slice();
    }

    d  = u.length - v.length;
    q  = [0];
    k  = v.concat(zeroes.slice(0, d));
    yt = v[0]*268435456 + v[1];

    // only cmp as last resort
    while (u[0] > k[0] || (u[0] === k[0] && cmp(u, k) > -1)) {
      q[0]++;
      u = sub(u, k, false);
    }

    for (i = 1; i <= d; i++) {
      q[i] = u[i-1] === v[0] ? 268435455 : ~~((u[i-1]*268435456 + u[i])/v[0]);

      xt = u[i-1]*72057594037927936 + u[i]*268435456 + u[i+1];

      while (q[i]*yt > xt) { //condition check can fail due to precision problem at 28-bit
        q[i]--;
      }

      k = mul(v, [q[i]]).concat(zeroes.slice(0, d-i)); //concat after multiply, save cycles
      u = sub(u, k, false);

      if (u.negative) {
        u = sub(v.concat(zeroes.slice(0, d-i)), u, false);
        q[i]--;
      }
    }

    if (internal) {
      z = (s > 0) ? rsh(cut(u), s) : cut(u);
    } else {
      z = cut(q);
      z.negative = (x.negative ^ y.negative) ? true : false;
    }

    return z;
  }

  function mod (x, y) {
    //For negative x, cmp doesn't work and result of div is negative
    //so take result away from the modulus to get the correct result
    if (x.negative) {
      return sub(y, div(x, y, true));
    }

    switch (cmp(x, y)) {
      case -1:
        return x;
      case 0:
        return [0];
      default:
        return div(x, y, true);
    }
  }

  /**
   * Greatest Common Divisor - HAC 14.61 - Binary Extended GCD, used to calc inverse, x <= modulo, y <= exponent
   */
  function gcd (x, y) {
    var g = Math.min(lsb(x[x.length-1]), lsb(y[y.length-1])),
        u = rsh(x, g),
        v = rsh(y, g),
        a = [1], b = [0], c = [0], d = [1], s;

    while (u.length !== 1 || u[0] !== 0) {
      s = lsb(u[u.length-1]);
      u = rsh(u, s);
      while (s--) {
        if ((a[a.length-1]&1) === 0 && (b[b.length-1]&1) === 0) {
          a = rsh(a, 1);
          b = rsh(b, 1);
        } else {
          a = rsh(sad(a, y), 1);
          b = rsh(ssb(b, x), 1);
        }
      }

      s = lsb(v[v.length-1]);
      v = rsh(v, s);
      while (s--) {
        if ((c[c.length-1]&1) === 0 && (d[d.length-1]&1) === 0) {
          c = rsh(c, 1);
          d = rsh(d, 1);
        } else {
          c = rsh(sad(c, y), 1);
          d = rsh(ssb(d, x), 1);
        }
      }

      if (cmp(u, v) >= 0) {
        u = sub(u, v, false);
        a = ssb(a, c);
        b = ssb(b, d);
      } else {
        v = sub(v, u, false);
        c = ssb(c, a);
        d = ssb(d, b);
      }
    }

    if (v.length === 1 && v[0] === 1) {
      return d;
    }
  }

  /**
   * Inverse 1/x mod y
   */
  function inv (x, y) {
    var z = gcd(y, x);
    return (typeof z !== "undefined" && z.negative) ? sub(y, z, false) : z;
  }

  /**
   * Barret Modular Reduction - HAC 14.42
   */
  function bmr (x, m, mu) {
    var q1, q2, q3, r1, r2, z, s, k = m.length;

    if (cmp(x, m) < 0) {
      return x;
    }

    if (typeof mu === "undefined") {
      mu = div([1].concat(zeroes.slice(0, 2*k)), m, false);
    }

    q1 = x.slice(0, x.length-(k-1));
    q2 = mul(q1, mu);
    q3 = q2.slice(0, q2.length-(k+1));

    s  = x.length-(k+1);
    r1 = (s > 0) ? x.slice(s) : x.slice();

    r2 = mul(q3, m);
    s  = r2.length-(k+1);

    if (s > 0) {
      r2 = r2.slice(s);
    }

    z = cut(sub(r1, r2, false));

    if (z.negative) {
      z = cut(sub([1].concat(zeroes.slice(0, k+1)), z, false));
    }

    while (cmp(z, m) >= 0) {
      z = cut(sub(z, m, false));
    }

    return z;
  }

  /**
   * Modular Exponentiation - HAC 14.76 Right-to-left binary exp
   */
  function exp (x, e, n) {
    var c = 268435456,
        r = [1],
        u = div(r.concat(zeroes.slice(0, 2*n.length)), n, false);

    for (var i = e.length-1; i >= 0; i--) {
      if (i === 0) {
        c = 1 << (27 - msb(e[0]));
      }

      for (var j = 1; j < c; j *= 2) {
        if (e[i] & j) {
          r = bmr(mul(r, x), n, u);
        }
        x = bmr(sqr(x), n, u);
      }
    }

    return bmr(mul(r, x), n, u);
  }

  /**
   * Garner's algorithm, modular exponentiation - HAC 14.71
   */
  function gar (x, p, q, d, u, dp1, dq1) {
    var vp, vq, t;

    if (typeof dp1 === "undefined") {
      dp1 = mod(d, dec(p));
      dq1 = mod(d, dec(q));
    }

    vp = exp(mod(x, p), dp1, p);
    vq = exp(mod(x, q), dq1, q);

    if (cmp(vq, vp) < 0) {
      t = cut(sub(vp, vq, false));
      t = cut(bmr(mul(t, u), q, undefined));
      t = cut(sub(q, t, false));
    } else {
      t = cut(sub(vq, vp, false));
      t = cut(bmr(mul(t, u), q, undefined)); //bmr instead of mod, div can fail because of precision
    }

    return cut(add(vp, mul(t, p)));
  }

  /**
   * Simple Mod - When n < 2^14
   */
  function mds (x, n) {
    for (var i = 0, z = 0, l = x.length; i < l; i++) {
      z = ((x[i] >> 14) + (z << 14)) % n;
      z = ((x[i] & 16383) + (z << 14)) % n;
    }

    return z;
  }

  function dec (x) {
    var z;

    if (x[x.length-1] > 0) {
      z = x.slice();
      z[z.length-1] -= 1;
      z.negative = x.negative;
    } else {
      z = sub(x, [1], false);
    }

    return z;
  }

  /**
   * Miller-Rabin Primality Test
   */
  function mrb (x, iterations) {
    var m = dec(x),
        s = lsb(m[x.length-1]),
        r = rsh(x, s);

    for (var i = 0, j, t, y; i < iterations; i++) {
      y = exp(ptests[i], r, x);

      if ( (y.length > 1 || y[0] !== 1) && cmp(y, m) !== 0 ) {
        j = 1;
        t = true;

        while (t && s > j++) {
          y = mod(sqr(y), x);

          if (y.length === 1 && y[0] === 1) {
            return false;
          }

          t = cmp(y, m) !== 0;
        }

        if (t) {
          return false;
        }
      }
    }

    return true;
  }

  function tpr (x) {
    if (x.length === 1 && x[0] < 16384 && primes.indexOf(x[0]) >= 0) {
      return true;
    }

    for (var i = 1, l = primes.length; i < l; i++) {
      if (mds(x, primes[i]) === 0) {
        return false;
      }
    }

    return mrb(x, 3);
  }

  /**
   * Quick add integer n to arbitrary precision integer x avoiding overflow
   */
  function qad (x, n) {
    var l = x.length - 1;

    if (x[l] + n < 268435456) {
      x[l] += n;
    } else {
      x = add(x, [n]);
    }

    return x;
  }

  function npr (x) {
    x = qad(x, 1 + x[x.length-1] % 2);

    while (!tpr(x)) {
      x = qad(x, 2);
    }

    return x;
  }

  function fct (n) {
    var z = [1],
        a = [1];

    while (a[0]++ < n) {
      z = mul(z, a);
    }

    return z;
  }

  /**
   * Convert byte array to 28 bit array
   */
  function ci (a) {
    var x = [0,0,0,0,0,0].slice((a.length-1)%7),
        z = [];

    if (a[0] < 0) {
      a[0] *= -1;
      z.negative = true;
    } else {
      z.negative = false;
    }

    x = x.concat(a);

    for (var i = 0; i < x.length; i += 7) {
      z.push((x[i]*1048576 + x[i+1]*4096 + x[i+2]*16 + (x[i+3]>>4)), ((x[i+3]&15)*16777216 + x[i+4]*65536 + x[i+5]*256 + x[i+6]));
    }

    return cut(z);
  }

  /**
   * Convert 28 bit array to byte array
   */
  function co (a) {
    if (typeof a !== "undefined") {
      var x = [0].slice((a.length-1)%2).concat(a),
          z = [];

      for (var u, v, i = 0; i < x.length;) {
        u = x[i++];
        v = x[i++];

        z.push((u >> 20), (u >> 12 & 255), (u >> 4 & 255), ((u << 4 | v >> 24) & 255), (v >> 16 & 255), (v >> 8 & 255), (v & 255));
      }

      z = cut(z);

      if (a.negative) {
        z[0] *= -1;
      }

      return z;
    }
  }

  function stringify (x) {
    var a = [],
        b = [10],
        z = [0],
        i = 0, q;

    do {
      q      = x;
      x      = div(q, b);
      a[i++] = sub(q, mul(b, x)).pop();
    } while (cmp(x, z));

    return a.reverse().join("");
  }

  function parse (s) {
    var x = s.split(""),
        p = [1],
        a = [0],
        b = [10],
        n = false;

    if (x[0] === "-") {
      n = true;
      x.shift();
    }

    while (x.length) {
      a = add(a, mul(p, [x.pop()]));
      p = mul(p, b);
    }

    a.negative = n;

    return a;
  }

  function transformIn (a) {
    return rawIn ? a : Array.prototype.slice.call(a).map(function (v) { return ci(v.slice()) });
  }

  function transformOut (x) {
    return rawOut ? x : co(x);
  }

  return {
    /**
     * Return zero array length n
     *
     * @method zero
     * @param {Number} n
     * @return {Array} 0 length n
     */
    zero: function (n) {
      return zeroes.slice(0, n);
    },

    /**
     * Signed Addition - Safe for signed MPI
     *
     * @method add
     * @param {Array} x
     * @param {Array} y
     * @return {Array} x + y
     */
    add: function (x, y) {
      return transformOut(
        sad.apply(null, transformIn(arguments))
      );
    },

    /**
     * Signed Subtraction - Safe for signed MPI
     *
     * @method sub
     * @param {Array} x
     * @param {Array} y
     * @return {Array} x - y
     */
    sub: function (x, y) {
      return transformOut(
        ssb.apply(null, transformIn(arguments))
      );
    },

    /**
     * Multiplication
     *
     * @method mul
     * @param {Array} x
     * @param {Array} y
     * @return {Array} x * y
     */
    mul: function (x, y) {
      return transformOut(
        mul.apply(null, transformIn(arguments))
      );
    },

    /**
     * Multiplication, with karatsuba method
     *
     * @method mulk
     * @param {Array} x
     * @param {Array} y
     * @return {Array} x * y
     */
    mulk: function (x, y) {
      return transformOut(
        mulk.apply(null, transformIn(arguments))
      );
    },

    /**
     * Squaring
     *
     * @method sqr
     * @param {Array} x
     * @return {Array} x * x
     */
    sqr: function (x) {
      return transformOut(
        sqr.apply(null, transformIn(arguments))
      );
    },

    /**
     * Modular Exponentiation
     *
     * @method exp
     * @param {Array} x
     * @param {Array} e
     * @param {Array} n
     * @return {Array} x^e % n
     */
    exp: function (x, e, n) {
      return transformOut(
        exp.apply(null, transformIn(arguments))
      );
    },

    /**
     * Division
     *
     * @method div
     * @param {Array} x
     * @param {Array} y
     * @return {Array} x / y || undefined
     */
    div: function (x, y) {
      if (y.length !== 1 || y[0] !== 0) {
        return transformOut(
          div.apply(null, transformIn(arguments))
        );
      }
    },

    /**
     * Modulus
     *
     * @method mod
     * @param {Array} x
     * @param {Array} y
     * @return {Array} x % y
     */
    mod: function (x, y) {
      return transformOut(
        mod.apply(null, transformIn(arguments))
      );
    },

    /**
     * Barret Modular Reduction
     *
     * @method bmr
     * @param {Array} x
     * @param {Array} y
     * @param {Array} [mu]
     * @return {Array} x % y
     */
    bmr: function (x, y, mu) {
      return transformOut(
        bmr.apply(null, transformIn(arguments))
      );
    },

    /**
     * Garner's Algorithm
     *
     * @method gar
     * @param {Array} x
     * @param {Array} p
     * @param {Array} q
     * @param {Array} d
     * @param {Array} u
     * @param {Array} [dp1]
     * @param {Array} [dq1]
     * @return {Array} x^d % pq
     */
    gar: function (x, p, q, d, u, dp1, dq1) {
      return transformOut(
        gar.apply(null, transformIn(arguments))
      );
    },

    /**
     * Mod Inverse
     *
     * @method inv
     * @param {Array} x
     * @param {Array} y
     * @return {Array} 1/x % y || undefined
     */
    inv: function (x, y) {
      return transformOut(
        inv.apply(null, transformIn(arguments))
      );
    },

    /**
     * Remove leading zeroes
     *
     * @method cut
     * @param {Array} x
     * @return {Array} x without leading zeroes
     */
    cut: function (x) {
      return transformOut(
        cut.apply(null, transformIn(arguments))
      );
    },


    /**
     * Factorial - for n < 268435456
     *
     * @method factorial
     * @param {Number} n
     * @return {Array} n!
     */
    factorial: function (n) {
      return transformOut(
        fct.apply(null, [n%268435456])
      );
    },

    /**
     * Bitwise AND, OR, XOR
     * Undefined if x and y different lengths
     *
     * @method OP
     * @param {Array} x
     * @param {Array} y
     * @return {Array} x OP y
     */
    and: function (x, y) {
      if (x.length === y.length) {
        for (var i = 0, z = []; i < x.length; i++) { z[i] = x[i] & y[i] }
        return z;
      }
    },

    or: function (x, y) {
      if (x.length === y.length) {
        for (var i = 0, z = []; i < x.length; i++) { z[i] = x[i] | y[i] }
        return z;
      }
    },

    xor: function (x, y) {
      if (x.length === y.length) {
        for (var i = 0, z = []; i < x.length; i++) { z[i] = x[i] ^ y[i] }
        return z;
      }
    },

    /**
     * Bitwise NOT
     *
     * @method not
     * @param {Array} x
     * @return {Array} NOT x
     */
    not: function (x) {
      for (var i = 0, z = [], m = rawIn ? 268435455 : 255; i < x.length; i++) { z[i] = ~x[i] & m }
      return z;
    },

    /**
     * Left Shift
     *
     * @method leftShift
     * @param {Array} x
     * @param {Integer} s
     * @return {Array} x << s
     */
    leftShift: function (x, s) {
      return transformOut(lsh(transformIn([x]).pop(), s));
    },

    /**
     * Zero-fill Right Shift
     *
     * @method rightShift
     * @param {Array} x
     * @param {Integer} s
     * @return {Array} x >>> s
     */
    rightShift: function (x, s) {
      return transformOut(rsh(transformIn([x]).pop(), s));
    },

    /**
     * Decrement
     *
     * @method decrement
     * @param {Array} x
     * @return {Array} x - 1
     */
    decrement: function (x) {
      return transformOut(
        dec.apply(null, transformIn(arguments))
      );
    },

    /**
     * Compare values of two MPIs - Not safe for signed or leading zero MPI
     *
     * @method compare
     * @param {Array} x
     * @param {Array} y
     * @return {Number} 1: x > y
     *                  0: x = y
     *                 -1: x < y
     */
    compare: function (x, y) {
      return cmp(x, y);
    },

    /**
     * Find Next Prime
     *
     * @method nextPrime
     * @param {Array} x
     * @return {Array} 1st prime > x
     */
    nextPrime: function (x) {
      return transformOut(
        npr.apply(null, transformIn(arguments))
      );
    },

    /**
     * Primality Test
     * Sieve then Miller-Rabin
     *
     * @method testPrime
     * @param {Array} x
     * @return {boolean} is prime
     */
    testPrime: function (x) {
      return (x[x.length-1] % 2 === 0) ? false : tpr.apply(null, transformIn(arguments));
    },

    /**
     * Array base conversion
     *
     * @method transform
     * @param {Array} x
     * @param {boolean} toRaw
     * @return {Array}  toRaw: 8 => 28-bit array
     *                 !toRaw: 28 => 8-bit array
     */
    transform: function (x, toRaw) {
      return toRaw ? ci(x) : co(x);
    },

    /**
     * Integer to String conversion
     *
     * @method stringify
     * @param {Array} x
     * @return {String} base 10 number as string
     */
    stringify: function (x) {
      return stringify(ci(x));
    },

    /**
     * String to Integer conversion
     *
     * @method parse
     * @param {String} s
     * @return {Array} x
     */
    parse: function (s) {
      return co(parse(s));
    }
  }
}

/**
 * @example WebWorker invocation
 * Request: { "func": "add",
 *            "args": [[123], [7]] }
 * Respnse: [130]
 *
 * @example Node include
 * var crunch = require("number-crunch");
 */
if (typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope) {
  var crunch = Crunch(false, false);

  self.onmessage = function (e) {
    self.postMessage(crunch[e.data.func].apply(crunch, e.data.args));
  }
} else if (typeof module !== "undefined" && module.exports) {
  module.exports = Crunch(false, false);
}
