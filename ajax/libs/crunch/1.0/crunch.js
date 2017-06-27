/* 
  Crunch - Multi-precision Integer Arithmetic Library 
  Copyright (C) 2014 Nenad Vukicevic

  crunch.secureroom.net/license
*/

/**
 * @module Crunch
 * Radix: 28 bits
 * Endianness: Big 
 * 
 * @param {boolean} rawIn   - expect 28-bit arrays
 * @param {boolean} rawOut  - return 28-bit arrays
 */
function Crunch(rawIn, rawOut) {

  /**
   * Generate first n primes array
   */
  function nprimes(n) {
    for (var j, b, p = [2], l = 1, i = 3; l < n; i += 2) {
      for (j = 0; j < l; j++)
        if (!(b = (i % p[j] !== 0)))
          break;

      if (b)
        l = p.push(i);
    }

    return p;
  }

  /**
   * Generate n-length zero filled array
   */
  function nzeroes(n) {
    for (var z = []; z.push(0) < n;);
    return z;
  }

  /** 
   * Predefined constants for performance: zeroes for zero-filled arrays, 
   * primes for simple mod primality, ptests for Miller-Rabin primality
   */
  const zeroes = nzeroes(500);
  const primes = nprimes(1899);
  const ptests = primes.slice(0, 10).map(function(v){return [v]});

  /**
   * Remove leading zeroes
   */
  function cut(x) {
    while (x[0] === 0 && x.length > 1)
      x.shift();

    return x;
  }

  /**
   * Compare two MPIs
   */
  function cmp(x, y) {
    var xl = x.length,
        yl = y.length, i; //zero front pad problem

    if ((x.negative && !y.negative) || xl < yl) {
      return -1;
    } else if ((!x.negative && y.negative) || xl > yl) {
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
  function msb(x) {
    if (x !== 0) {
      for (var i = 134217728, l = 0; i > x; l++)
        i /= 2;

      return l;
    }
  }

  /**
   * Least significant bit, base 28, position from right
   */
  function lsb(x) {
    if (x !== 0) {
      for (var l = 0; !(x & 1); l++)
        x /= 2;

      return l;
    }
  }

  /**
   * Addition
   */
  function add(x, y) {
    var n = x.length,
        t = y.length,
        i = Math.max(n, t),
        c = 0,
        w = zeroes.slice(0, i);

    if (n < t) {
      x = zeroes.slice(0, t-n).concat(x);
    } else if (n > t) {
      y = zeroes.slice(0, n-t).concat(y);
    }

    for (i -= 1; i >= 0; i--) {
      w[i] = x[i] + y[i] + c;

      if (w[i] > 268435455) {
        c = 1;
        w[i] -= 268435456;
      } else {
        c = 0;
      }
    }

    if (c === 1)
      w.unshift(c);

    return w;
  }

  /**
   * Subtraction
   */
  function sub(x, y, internal) {
    var n = x.length,
        t = y.length,
        i = Math.max(n, t),
        c = 0,
        w = zeroes.slice(0, i);

    if (n < t) {
      x = zeroes.slice(0, t-n).concat(x);
    } else if (n > t) {
      y = zeroes.slice(0, n-t).concat(y);
    }

    for (i -= 1; i >= 0; i--) {
      w[i] = x[i] - y[i] - c;

      if ( w[i] < 0 ) {
        c = 1;
        w[i] += 268435456;
      } else {
        c = 0;
      }
    }

    if (c === 1 && typeof internal === "undefined") {
      w = sub(zeroes.slice(0, w.length), w, true);
      w.negative = true;
    }

    return w;
  }

  /**
   * Signed Addition
   */
  function sad(x, y) {
    var z;

    if (x.negative) {
      if (y.negative) {
        z = add(x, y);
        z.negative = true;
      } else {
        z = cut(sub(y, x));
      }
    } else {
      z = y.negative ? cut(sub(x, y)) : add(x, y);
    }

    return z;
  }

  /**
   * Signed Subtraction
   */
  function ssb(x, y) {
    var z;

    if (x.negative) {
      if (y.negative) {
        z = cut(sub(y, x));
      } else {
        z = add(x, y);
        z.negative = true;
      }
    } else {
      z = y.negative ? add(x, y) : cut(sub(x,y));
    }

    return z;
  }

  /**
   * Multiplication - HAC 14.12
   */
  function mul(x, y) {
    var yl, yh, xl, xh, t1, t2, c, j,
        n = x.length,
        i = y.length,
        w = zeroes.slice(0, n+i);

    while (i--) {
      c = 0;

      yl = y[i] & 16383;
      yh = y[i] >> 14;

      for (j = n-1; j>=0; j--) {
        xl = x[j] & 16383;
        xh = x[j] >> 14;

        t1 = yh*xl + xh*yl;
        t2 = yl*xl + ((t1 & 16383) << 14) + w[j+i+1] + c;

        w[j+i+1] = t2 & 268435455;
        c = yh*xh + (t1 >> 14) + (t2 >> 28);
      }

      w[i] = c;
    }

    if (w[0] === 0)
      w.shift();

    w.negative = (x.negative ^ y.negative) ? true : false;

    return w;
  }

  /**
   * Squaring - HAC 14.16
   */
  function sqr(x) {
    var l1, l2, h1, h2, t1, t2, j, c,
        i = x.length,
        w = zeroes.slice(0, 2*i);

    while (i--) {
      l1 = x[i] & 16383;
      h1 = x[i] >> 14;

      t1 = 2*h1*l1;
      t2 = l1*l1 + ((t1 & 16383) << 14) + w[2*i+1];

      w[2*i+1] = t2 & 268435455;
      c = h1*h1 + (t1 >> 14) + (t2 >> 28);

      for (j = i-1; j>=0; j--) {
        l2 = (2 * x[j]) & 16383;
        h2 = x[j] >> 13;

        t1 = h2*l1 + h1*l2;
        t2 = l2*l1 + ((t1 & 16383) << 14) + w[j+i+1] + c;
        w[j+i+1] = t2 & 268435455;
        c = h2*h1 + (t1 >> 14) + (t2 >> 28);
      }

      w[i] = c;
    }

    if (w[0] === 0)
      w.shift();
    
    return w;
  }

  /**
   * Right Shift
   */
  function rsh(x, s) {
    var ss = s % 28,
        ls = Math.floor(s/28),
        l  = x.length - ls,
        w  = x.slice(0,l);

    if (ss) {
      while (--l) 
        w[l] = ((w[l] >> ss) | (w[l-1] << (28-ss))) & 268435455;

      w[l] = (w[l] >> ss);

      if (w[0] === 0)
        w.shift();
    }

    w.negative = x.negative;

    return w;
  }

  /**
   * Left Shift
   */
  function lsh(x, s) {
    var ss = s % 28,
        ls = Math.floor(s/28),
        l  = x.length,
        w  = [],
        t  = 0;

    if (ss) {
      while (l--) {
        w[l] = ((x[l] << ss) + t) & 268435455;
        t    = x[l] >>> (28-ss);
      }

      if (t !== 0)
        w.unshift(t);
    }

    w.negative = x.negative;

    return (ls) ? w.concat(zeroes.slice(0, ls)) : w;
  }

  /**
   * Division - HAC 14.20
   */
  function div(x, y, internal) {
    var u, v, xt, yt, d, q, k, i,
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
      u = sub(u, k);
    }

    for (i = 1; i <= d; i++) {
      q[i] = (u[i-1] === v[0]) ? 268435455 : ~~((u[i-1]*268435456 + u[i])/v[0]);

      xt = u[i-1]*72057594037927936 + u[i]*268435456 + u[i+1];

      while (q[i]*yt > xt) //condition check can fail due to precision problem at 28-bit radix
        q[i]--;

      k = mul(v, [q[i]]).concat(zeroes.slice(0, d-i)); //concat after multiply, save cycles
      u = sub(u, k);

      if (u.negative) {
        u = sub(v.concat(zeroes.slice(0, d-i)), u);
        q[i]--;
      }
    }

    if (internal) {
      v = (s > 0) ? rsh(cut(u), s) : cut(u);
    } else {
      v = cut(q);
      v.negative = (x.negative ^ y.negative) ? true : false;
    }

    return v;
  }

  function mod(x, y) {
    switch(cmp(x, y)) {
    case -1:
      return x;
    case 0:
      return [0];
    default:
      return div(x, y, true);
    }
  }

  /**
   * Greatest Common Divisor - HAC 14.61 - Binary Extended GCD
   */
  function gcd(x, y) {
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
        u = sub(u, v);
        a = ssb(a, c);
        b = ssb(b, d);
      } else {
        v = sub(v, u);
        c = ssb(c, a);
        d = ssb(d, b);
      }
    }

    if (v.length === 1 && v[0] === 1)
      return d;
  }

  /**
   * Inverse 1/y mod x
   */
  function inv(x, y) {
    var z = gcd(y, x); //flip input arguments

    while (z.negative) {
      z = sub(y, z);
    }

    return z;
  }

  /**
   * Barret Modular Reduction - HAC 14.42
   */
  function bmr(x, m, mu) {
    var q1, q2, q3, r1, r2, r, s, k = m.length;

    if (cmp(x, m) < 0) 
      return x; 

    if (typeof mu === "undefined")
      mu = div([1].concat(zeroes.slice(0, 2*k)), m);

    q1 = x.slice(0, x.length-(k-1));
    q2 = mul(q1, mu);
    q3 = q2.slice(0, q2.length-(k+1));

    s  = x.length-(k+1);
    r1 = (s > 0) ? x.slice(s) : x.slice();

    r2 = mul(q3, m);
    s  = r2.length-(k+1);
    
    if (s > 0)
      r2 = r2.slice(s);

    r = cut(sub(r1, r2));

    if (r.negative)
      r = cut(sub([1].concat(zeroes.slice(0, k+1)), r));

    while (cmp(r, m) >= 0)
      r = cut(sub(r, m));

    return r;
  }

  /**
   * Modular Exponentiation - HAC 14.76 Right-to-left binary exp
   */
  function exp(x, e, n) {
    var c, i, j, r = [1],
        u = div(r.concat(zeroes.slice(0, 2*n.length)), n);

    for (c = 268435456, i = e.length-1; i >= 0; i--) {
      if (i === 0)
        c = 1 << (27 - msb(e[0]));

      for (j = 1; j < c; j *= 2) {
        if (e[i] & j)
          r = bmr(mul(r, x), n, u);
        x = bmr(sqr(x), n, u);
      }
    }

    return bmr(mul(r, x), n, u);
  }

  /**
   * Garner's algorithm, modular exponentiation - HAC 14.71
   */
  function gar(x, p, q, d, u, dp1, dq1) {
    var vp, vq, t;

    if (typeof dp1 === "undefined") {
      dp1 = mod(d, dec(p));
      dq1 = mod(d, dec(q));
    }

    vp = exp(mod(x, p), dp1, p);
    vq = exp(mod(x, q), dq1, q);

    if (cmp(vq, vp) < 0) {
      t = cut(sub(vp, vq));
      t = cut(bmr(mul(t, u), q));
      t = cut(sub(q, t));
    } else {
      t = cut(sub(vq, vp));
      t = cut(bmr(mul(t, u), q)); //bmr instead of mod, div fails too frequently because precision issue
    }

    return cut(add(vp, mul(t, p)));
  }

  /**
   * Simple Mod - When n < 2^14
   */
  function mds(x, n) {
    for (var i = 0, c = 0, l = x.length; i < l; i++) {
      c = ((x[i] >> 14) + (c << 14)) % n;
      c = ((x[i] & 16383) + (c << 14)) % n;
    }

    return c;
  }

  /**
   * XOR
   */
  function xor(x, y) {
    if (x.length === y.length) {
      for (var z = [], i = 0; i < x.length; i++)
        z[i] = x[i] ^ y[i];
    
      return z;
    }
  }

  /**
   * Decrement by 1
   */
  function dec(x) {
    var z;

    if (x[x.length-1] > 0) {
      z = x.slice();
      z[z.length-1] -= 1;
      z.negative = x.negative;
    } else {
      z = sub(x, [1]);
    }

    return z;
  }

  /**
   * Miller-Rabin Primality Test
   */
  function mrb(n, iterations) {
    var m = dec(n),
        s = lsb(m[n.length-1]),
        r = rsh(n, s),
        y, t, j, i;

    for (i = 0; i < iterations; i++) {
      y = exp(ptests[i], r, n);

      if ( (y.length > 1 || y[0] !== 1) && cmp(y,m) !== 0 ) {
        j = 1;
        t = true;
        
        while (t && s > j++) {
          y = mod(sqr(y), n);
          if (y.length === 1 && y[0] === 1) 
            return false;

          t = (cmp(y, m) !== 0);
        }

        if (t)
          return false;
      }
    }

    return true;
  }

  /**
   * Test prime
   */
  function tpr(n) {
    if (n.length === 1 && n[0] < 16384 && primes.indexOf(n[0]) >= 0)
      return true;

    for (var i = 1, k = primes.length; i < k; i++)
      if (mds(n, primes[i]) === 0)
        return false;

    return mrb(n, 3);
  }

  /**
   * Find next prime
   */
  function npr(n) {
    var l = n.length - 1;

    n[l] |= 1;

    while (!tpr(n))
      n[l] = (n[l]+2) % 268435456; //backwards on boundary

    return n;
  }

  /**
   * Toggle sign
   */  
  function tgl(a) {
    a[0] *= -1;
    return a;
  }

  /**
   * Convert byte array to 28 bit array
   */
  function ci(a) {
    var p, o = [],
        i = [0,0,0,0,0,0].slice((a.length-1)%7);

    if (a[0] < 0) {
      i = i.concat(tgl(a));
      o.negative = true;
    } else {
      i = i.concat(a);
      o.negative = false;
    }

    for (p = 0; p < i.length; p += 7)
      o.push((i[p]*1048576 + i[p+1]*4096 + i[p+2]*16 + (i[p+3]>>4)), ((i[p+3]&15)*16777216 + i[p+4]*65536 + i[p+5]*256 + i[p+6]));
    
    return cut(o);
  }

  /**
   * Convert 28 bit array to byte array
   */
  function co(a) {
    var c, d, i, o = [],
        b = [0].slice((a.length-1)%2).concat(a);

    for (i = 0; i < b.length;) {
      c = b[i++]; 
      d = b[i++];

      o.push((c >> 20), (c >> 12 & 255), (c >> 4 & 255), ((c << 4 | d >> 24) & 255), (d >> 16 & 255), (d >> 8 & 255), (d & 255));
    }

    return a.negative ? tgl(cut(o)) : cut(o);
  }

  function transformIn(args) {
    return (rawIn) ? args : Array.prototype.slice.call(args).map(function(v) { return ci(v) });
  }

  function transformOut(val) {
    return (rawOut) ? val : co(val);
  }

  return {
    /**
     * Return zero array length n 
     *
     * @method zero
     * @param {integer} n
     * @return {array} 0 length n
     */
    zero: function(n) {
      return zeroes.slice(0, n);
    },

    /**
     * Signed Addition - Safe for signed MPI
     *
     * @method add
     * @param {array} x
     * @param {array} y
     * @return {array} x + y
     */
    add: function(x, y) {
      return transformOut(
        sad.apply(null, transformIn(arguments))
      );
    },

    /**
     * Signed Subtraction - Safe for signed MPI
     *
     * @method sub
     * @param {array} x
     * @param {array} y
     * @return {array} x - y
     */
    sub: function(x, y) {
      return transformOut(
        ssb.apply(null, transformIn(arguments))
      );
    },

    /**
     * Multiplication
     *
     * @method mul
     * @param {array} x
     * @param {array} y
     * @return {array} x * y
     */
    mul: function(x, y) {
      return transformOut(
        mul.apply(null, transformIn(arguments))
      );
    },

    /**
     * Squaring
     *
     * @method sqr
     * @param {array} x
     * @return {array} x * x
     */
    sqr: function(x) {
      return transformOut(
        sqr.apply(null, transformIn(arguments))
      );
    },

    /**
     * Modular Exponentiation
     *
     * @method exp
     * @param {array} x
     * @param {array} e
     * @param {array} n
     * @return {array} x^e % n
     */
    exp: function(x, e, n) {
      return transformOut(
        exp.apply(null, transformIn(arguments))
      );
    },

    /**
     * Division
     *
     * @method div
     * @param {array} x
     * @param {array} y
     * @return {array} x / y
     */
    div: function(x, y) {
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
     * @param {array} x
     * @param {array} y
     * @return {array} x % y
     */
    mod: function(x, y) {
      return transformOut(
        mod.apply(null, transformIn(arguments))
      );
    },

    /**
     * Barret Modular Reduction
     *
     * @method bmr
     * @param {array} x
     * @param {array} y
     * @param {array} [mu]
     * @return {array} x % y
     */
    bmr: function(x, y, mu) {
      return transformOut(
        bmr.apply(null, transformIn(arguments))
      );
    },

    /**
     * Garner's Algorithm
     *
     * @method gar
     * @param {array} x
     * @param {array} p
     * @param {array} q
     * @param {array} d
     * @param {array} u
     * @param {array} [dp1]
     * @param {array} [dq1]
     * @return {array} x^d % pq
     */
    gar: function(x, p, q, d, u, dp1, dq1) {
      return transformOut(
        gar.apply(null, transformIn(arguments))
      );
    },

    /**
     * Mod Inverse
     *
     * @method inv
     * @param {array} x
     * @param {array} y
     * @return {array} 1/y % x
     */
    inv: function(x, y) {
      return transformOut(
        inv.apply(null, transformIn(arguments))
      );
    },

    /**
     * Remove leading zeroes
     *
     * @method cut
     * @param {Array} x
     * @return {Array} new array without leading zeroes
     */
    cut: function(x) {
      return transformOut(
        cut.apply(null, transformIn(arguments))
      );
    },

    /**
     * Exclusive-Or
     *
     * @method xor
     * @param {array} x
     * @param {array} y
     * @return {array} x xor y
     */
    xor: function(x, y) {
      return xor(x, y);
    },

    /**
     * Decrement
     *
     * @method decrement
     * @param {array} x
     * @return {array} x - 1
     */
    decrement: function(x) {
      return transformOut(
        dec.apply(null, transformIn(arguments))
      );
    },

    /**
     * Compare values of two MPIs - Not safe for signed or leading zero MPI
     *
     * @method compare
     * @param {array} x
     * @param {array} y
     * @return {integer} 1: x > y
     *                   0: x = y 
     *                  -1: x < y
     */
    compare: function(x, y) {
      return cmp(x, y);
    },

    /**
     * Find Next Prime
     *
     * @method nextPrime
     * @param {array} n
     * @return {array} 1st prime > n
     */
    nextPrime: function(x) {
      return transformOut(
        npr.apply(null, transformIn(arguments))
      );
    },

    /**
     * Primality Test
     * Sieve then Miller-Rabin
     *
     * @method testPrime
     * @param {array} n
     * @return {boolean} is prime
     */
    testPrime: function(x) {
      return (x[x.length-1] % 2 === 0) ? false : tpr.apply(null, transformIn(arguments));
    },

    /**
     * Array base conversion
     *
     * @method transfirn
     * @param {array} x
     * @param {boolean} toRaw
     * @return {array}  toRaw: 8 => 28-bit array
     *                 !toRaw: 28 => 8-bit array
     */
    transform: function(x, toRaw) {
      return (toRaw) ? ci(x) : co(x);
    }
  }
}

/**
 * Crunch is runnable within a web worker.
 * Invoked by messaging.
 *
 * @example
 * 
 * Request: { "func": "add",
 *            "args": [[123], [7]] }
 *
 * Respnse: [130]
 */
if (typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope) {
  var crunch = Crunch();

  self.onmessage = function(e) {
    self.postMessage(crunch[e.data.func].apply(crunch, e.data.args));
  }
}