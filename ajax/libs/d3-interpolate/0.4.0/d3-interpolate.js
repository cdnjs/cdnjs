(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-color')) :
  typeof define === 'function' && define.amd ? define('d3-interpolate', ['exports', 'd3-color'], factory) :
  factory((global.d3_interpolate = {}),global.d3_color);
}(this, function (exports,d3Color) { 'use strict';

  function rgb(a, b) {
    a = d3Color.rgb(a);
    b = d3Color.rgb(b);
    var ar = a.r,
        ag = a.g,
        ab = a.b,
        br = b.r - ar,
        bg = b.g - ag,
        bb = b.b - ab;
    return function(t) {
      a.r = ar + br * t;
      a.g = ag + bg * t;
      a.b = ab + bb * t;
      return a + "";
    };
  };

  // TODO sparse arrays?
  function array(a, b) {
    var x = [],
        c = [],
        na = a ? a.length : 0,
        nb = b ? b.length : 0,
        n0 = Math.min(na, nb),
        i;

    for (i = 0; i < n0; ++i) x.push(value(a[i], b[i]));
    for (; i < na; ++i) c[i] = a[i];
    for (; i < nb; ++i) c[i] = b[i];

    return function(t) {
      for (i = 0; i < n0; ++i) c[i] = x[i](t);
      return c;
    };
  };

  function number(a, b) {
    return a = +a, b -= a, function(t) {
      return a + b * t;
    };
  };

  function object(a, b) {
    var i = {},
        c = {},
        k;

    if (a === null || typeof a !== "object") a = {};
    if (b === null || typeof b !== "object") b = {};

    for (k in a) {
      if (k in b) {
        i[k] = value(a[k], b[k]);
      } else {
        c[k] = a[k];
      }
    }

    for (k in b) {
      if (!(k in a)) {
        c[k] = b[k];
      }
    }

    return function(t) {
      for (k in i) c[k] = i[k](t);
      return c;
    };
  };

  var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
  var reB = new RegExp(reA.source, "g");
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

  function string(a, b) {
    var bi = reA.lastIndex = reB.lastIndex = 0, // scan index for next number in b
        am, // current match in a
        bm, // current match in b
        bs, // string preceding current number in b, if any
        i = -1, // index in s
        s = [], // string constants and placeholders
        q = []; // number interpolators

    // Coerce inputs to strings.
    a = a + "", b = b + "";

    // Interpolate pairs of numbers in a & b.
    while ((am = reA.exec(a))
        && (bm = reB.exec(b))) {
      if ((bs = bm.index) > bi) { // a string precedes the next number in b
        bs = b.slice(bi, bs);
        if (s[i]) s[i] += bs; // coalesce with previous string
        else s[++i] = bs;
      }
      if ((am = am[0]) === (bm = bm[0])) { // numbers in a & b match
        if (s[i]) s[i] += bm; // coalesce with previous string
        else s[++i] = bm;
      } else { // interpolate non-matching numbers
        s[++i] = null;
        q.push({i: i, x: number(am, bm)});
      }
      bi = reB.lastIndex;
    }

    // Add remains of b.
    if (bi < b.length) {
      bs = b.slice(bi);
      if (s[i]) s[i] += bs; // coalesce with previous string
      else s[++i] = bs;
    }

    // Special optimization for only a single match.
    // Otherwise, interpolate each of the numbers and rejoin the string.
    return s.length < 2 ? (q[0]
        ? one(q[0].x)
        : zero(b))
        : (b = q.length, function(t) {
            for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);
            return s.join("");
          });
  };

  var values = [
    function(a, b) {
      var t = typeof b, c;
      return (t === "string" ? ((c = d3Color.color(b)) ? (b = c, rgb) : string)
          : b instanceof d3Color.color ? rgb
          : Array.isArray(b) ? array
          : t === "object" && isNaN(b) ? object
          : number)(a, b);
    }
  ];

  function value(a, b) {
    var i = values.length, f;
    while (--i >= 0 && !(f = values[i](a, b)));
    return f;
  };

  function round(a, b) {
    return a = +a, b -= a, function(t) {
      return Math.round(a + b * t);
    };
  };

  var rad2deg = 180 / Math.PI;
  var identity = {a: 1, b: 0, c: 0, d: 1, e: 0, f: 0};
  var g;
  // Compute x-scale and normalize the first row.
  // Compute shear and make second row orthogonal to first.
  // Compute y-scale and normalize the second row.
  // Finally, compute the rotation.
  function Transform(string) {
    if (!g) g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    if (string) g.setAttribute("transform", string), t = g.transform.baseVal.consolidate();

    var t,
        m = t ? t.matrix : identity,
        r0 = [m.a, m.b],
        r1 = [m.c, m.d],
        kx = normalize(r0),
        kz = dot(r0, r1),
        ky = normalize(combine(r1, r0, -kz)) || 0;

    if (r0[0] * r1[1] < r1[0] * r0[1]) {
      r0[0] *= -1;
      r0[1] *= -1;
      kx *= -1;
      kz *= -1;
    }

    this.rotate = (kx ? Math.atan2(r0[1], r0[0]) : Math.atan2(-r1[0], r1[1])) * rad2deg;
    this.translate = [m.e, m.f];
    this.scale = [kx, ky];
    this.skew = ky ? Math.atan2(kz, ky) * rad2deg : 0;
  }

  function dot(a, b) {
    return a[0] * b[0] + a[1] * b[1];
  }

  function normalize(a) {
    var k = Math.sqrt(dot(a, a));
    if (k) a[0] /= k, a[1] /= k;
    return k;
  }

  function combine(a, b, k) {
    a[0] += k * b[0];
    a[1] += k * b[1];
    return a;
  }

  function pop(s) {
    return s.length ? s.pop() + "," : "";
  }

  function translate(ta, tb, s, q) {
    if (ta[0] !== tb[0] || ta[1] !== tb[1]) {
      var i = s.push("translate(", null, ",", null, ")");
      q.push({i: i - 4, x: number(ta[0], tb[0])}, {i: i - 2, x: number(ta[1], tb[1])});
    } else if (tb[0] || tb[1]) {
      s.push("translate(" + tb + ")");
    }
  }

  function rotate(ra, rb, s, q) {
    if (ra !== rb) {
      if (ra - rb > 180) rb += 360; else if (rb - ra > 180) ra += 360; // shortest path
      q.push({i: s.push(pop(s) + "rotate(", null, ")") - 2, x: number(ra, rb)});
    } else if (rb) {
      s.push(pop(s) + "rotate(" + rb + ")");
    }
  }

  function skew(wa, wb, s, q) {
    if (wa !== wb) {
      q.push({i: s.push(pop(s) + "skewX(", null, ")") - 2, x: number(wa, wb)});
    } else if (wb) {
      s.push(pop(s) + "skewX(" + wb + ")");
    }
  }

  function scale(ka, kb, s, q) {
    if (ka[0] !== kb[0] || ka[1] !== kb[1]) {
      var i = s.push(pop(s) + "scale(", null, ",", null, ")");
      q.push({i: i - 4, x: number(ka[0], kb[0])}, {i: i - 2, x: number(ka[1], kb[1])});
    } else if (kb[0] !== 1 || kb[1] !== 1) {
      s.push(pop(s) + "scale(" + kb + ")");
    }
  }

  function transform(a, b) {
    var s = [], // string constants and placeholders
        q = []; // number interpolators
    a = new Transform(a), b = new Transform(b);
    translate(a.translate, b.translate, s, q);
    rotate(a.rotate, b.rotate, s, q);
    skew(a.skew, b.skew, s, q);
    scale(a.scale, b.scale, s, q);
    a = b = null; // gc
    return function(t) {
      var i = -1, n = q.length, o;
      while (++i < n) s[(o = q[i]).i] = o.x(t);
      return s.join("");
    };
  };

  var rho = Math.SQRT2;
  var rho2 = 2;
  var rho4 = 4;
  var epsilon2 = 1e-12;
  function cosh(x) {
    return ((x = Math.exp(x)) + 1 / x) / 2;
  }

  function sinh(x) {
    return ((x = Math.exp(x)) - 1 / x) / 2;
  }

  function tanh(x) {
    return ((x = Math.exp(2 * x)) - 1) / (x + 1);
  }

  // p0 = [ux0, uy0, w0]
  // p1 = [ux1, uy1, w1]
  function zoom(p0, p1) {
    var ux0 = p0[0], uy0 = p0[1], w0 = p0[2],
        ux1 = p1[0], uy1 = p1[1], w1 = p1[2],
        dx = ux1 - ux0,
        dy = uy1 - uy0,
        d2 = dx * dx + dy * dy,
        i,
        S;

    // Special case for u0 ≅ u1.
    if (d2 < epsilon2) {
      S = Math.log(w1 / w0) / rho;
      i = function(t) {
        return [
          ux0 + t * dx,
          uy0 + t * dy,
          w0 * Math.exp(rho * t * S)
        ];
      }
    }

    // General case.
    else {
      var d1 = Math.sqrt(d2),
          b0 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1),
          b1 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1),
          r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0),
          r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
      S = (r1 - r0) / rho;
      i = function(t) {
        var s = t * S,
            coshr0 = cosh(r0),
            u = w0 / (rho2 * d1) * (coshr0 * tanh(rho * s + r0) - sinh(r0));
        return [
          ux0 + u * dx,
          uy0 + u * dy,
          w0 * coshr0 / cosh(rho * s + r0)
        ];
      }
    }

    i.duration = S * 1000;

    return i;
  };

  function deltaHue(h1, h0) {
    var delta = h1 - h0;
    return delta > 180 || delta < -180
        ? delta - 360 * Math.round(delta / 360)
        : delta;
  };

  function hsl(a, b) {
    a = d3Color.hsl(a);
    b = d3Color.hsl(b);
    var ah = isNaN(a.h) ? b.h : a.h,
        as = isNaN(a.s) ? b.s : a.s,
        al = a.l,
        bh = isNaN(b.h) ? 0 : deltaHue(b.h, ah),
        bs = isNaN(b.s) ? 0 : b.s - as,
        bl = b.l - al;
    return function(t) {
      a.h = ah + bh * t;
      a.s = as + bs * t;
      a.l = al + bl * t;
      return a + "";
    };
  };

  function hslLong(a, b) {
    a = d3Color.hsl(a);
    b = d3Color.hsl(b);
    var ah = isNaN(a.h) ? b.h : a.h,
        as = isNaN(a.s) ? b.s : a.s,
        al = a.l,
        bh = isNaN(b.h) ? 0 : b.h - ah,
        bs = isNaN(b.s) ? 0 : b.s - as,
        bl = b.l - al;
    return function(t) {
      a.h = ah + bh * t;
      a.s = as + bs * t;
      a.l = al + bl * t;
      return a + "";
    };
  };

  function lab(a, b) {
    a = d3Color.lab(a);
    b = d3Color.lab(b);
    var al = a.l,
        aa = a.a,
        ab = a.b,
        bl = b.l - al,
        ba = b.a - aa,
        bb = b.b - ab;
    return function(t) {
      a.l = al + bl * t;
      a.a = aa + ba * t;
      a.b = ab + bb * t;
      return a + "";
    };
  };

  function hcl(a, b) {
    a = d3Color.hcl(a);
    b = d3Color.hcl(b);
    var ah = isNaN(a.h) ? b.h : a.h,
        ac = isNaN(a.c) ? b.c : a.c,
        al = a.l,
        bh = isNaN(b.h) ? 0 : deltaHue(b.h, ah),
        bc = isNaN(b.c) ? 0 : b.c - ac,
        bl = b.l - al;
    return function(t) {
      a.h = ah + bh * t;
      a.c = ac + bc * t;
      a.l = al + bl * t;
      return a + "";
    };
  };

  function hclLong(a, b) {
    a = d3Color.hcl(a);
    b = d3Color.hcl(b);
    var ah = isNaN(a.h) ? b.h : a.h,
        ac = isNaN(a.c) ? b.c : a.c,
        al = a.l,
        bh = isNaN(b.h) ? 0 : b.h - ah,
        bc = isNaN(b.c) ? 0 : b.c - ac,
        bl = b.l - al;
    return function(t) {
      a.h = ah + bh * t;
      a.c = ac + bc * t;
      a.l = al + bl * t;
      return a + "";
    };
  };

  function cubehelix(a, b, gamma) {
    if (arguments.length < 3) gamma = 1;
    a = d3Color.cubehelix(a);
    b = d3Color.cubehelix(b);
    var ah = isNaN(a.h) ? b.h : a.h,
        as = isNaN(a.s) ? b.s : a.s,
        al = a.l,
        bh = isNaN(b.h) ? 0 : deltaHue(b.h, ah),
        bs = isNaN(b.s) ? 0 : b.s - as,
        bl = b.l - al;
    return function(t) {
      a.h = ah + bh * t;
      a.s = as + bs * t;
      a.l = al + bl * Math.pow(t, gamma);
      return a + "";
    };
  };

  function cubehelixLong(a, b, gamma) {
    if (arguments.length < 3) gamma = 1;
    a = d3Color.cubehelix(a);
    b = d3Color.cubehelix(b);
    var ah = isNaN(a.h) ? b.h : a.h,
        as = isNaN(a.s) ? b.s : a.s,
        al = a.l,
        bh = isNaN(b.h) ? 0 : b.h - ah,
        bs = isNaN(b.s) ? 0 : b.s - as,
        bl = b.l - al;
    return function(t) {
      a.h = ah + bh * t;
      a.s = as + bs * t;
      a.l = al + bl * Math.pow(t, gamma);
      return a + "";
    };
  };

  var slice = Array.prototype.slice;

  function bindN(type, args) {
    args = slice.call(args);
    args[0] = null;
    args.unshift(null);
    return function(a, b) {
      args[0] = a;
      args[1] = b;
      return type.apply(null, args);
    };
  }

  function bind(type) {
    return arguments.length === 1 ? type : bindN(type, arguments);
  };

  var version = "0.4.0";

  exports.version = version;
  exports.interpolate = value;
  exports.interpolators = values;
  exports.interpolateArray = array;
  exports.interpolateNumber = number;
  exports.interpolateObject = object;
  exports.interpolateRound = round;
  exports.interpolateString = string;
  exports.interpolateTransform = transform;
  exports.interpolateZoom = zoom;
  exports.interpolateRgb = rgb;
  exports.interpolateHsl = hsl;
  exports.interpolateHslLong = hslLong;
  exports.interpolateLab = lab;
  exports.interpolateHcl = hcl;
  exports.interpolateHclLong = hclLong;
  exports.interpolateCubehelix = cubehelix;
  exports.interpolateCubehelixLong = cubehelixLong;
  exports.interpolateBind = bind;

}));