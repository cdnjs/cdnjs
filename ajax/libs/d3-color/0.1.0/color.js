if (typeof Map === "undefined") {
  Map = function() { this.clear(); };
  Map.prototype = {
    set: function(k, v) { this._[k] = v; return this; },
    get: function(k) { return this._[k]; },
    has: function(k) { return k in this._; },
    delete: function(k) { return k in this._ && delete this._[k]; },
    clear: function() { this._ = Object.create(null); },
    get size() { var n = 0; for (var k in this._) ++n; return n; },
    forEach: function(c) { for (var k in this._) c(this._[k], k, this); }
  };
}

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  factory((global.color = {}));
}(this, function (exports) { 'use strict';

  function Color() {}

  Color.prototype = {
    toString: function() {
      return this.rgb() + "";
    }
  };

  function Rgb(r, g, b) {
    this.r = Math.max(0, Math.min(255, Math.round(r)));
    this.g = Math.max(0, Math.min(255, Math.round(g)));
    this.b = Math.max(0, Math.min(255, Math.round(b)));
  }

  var _prototype = Rgb.prototype = new Color;

  var darker = .7;

  _prototype.darker = function(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Rgb(this.r * k, this.g * k, this.b * k);
  };

  var brighter = 1 / darker;

  _prototype.brighter = function(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Rgb(this.r * k, this.g * k, this.b * k);
  };

  _prototype.rgb = function() {
    return this;
  };

  function format(r, g, b) {
    if (isNaN(r)) r = 0;
    if (isNaN(g)) g = 0;
    if (isNaN(b)) b = 0;
    return "#"
        + (r < 16 ? "0" + r.toString(16) : r.toString(16))
        + (g < 16 ? "0" + g.toString(16) : g.toString(16))
        + (b < 16 ? "0" + b.toString(16) : b.toString(16));
  }

  _prototype.toString = function() {
    return format(this.r, this.g, this.b);
  };

  var rgb = function(r, g, b) {
    if (arguments.length === 1) {
      if (!(r instanceof Color)) r = color(r);
      r = r.rgb();
      b = r.b;
      g = r.g;
      r = r.r;
    }
    return new Rgb(r, g, b);
  }

  var named = (new Map)
    .set("aliceblue", 0xf0f8ff)
    .set("antiquewhite", 0xfaebd7)
    .set("aqua", 0x00ffff)
    .set("aquamarine", 0x7fffd4)
    .set("azure", 0xf0ffff)
    .set("beige", 0xf5f5dc)
    .set("bisque", 0xffe4c4)
    .set("black", 0x000000)
    .set("blanchedalmond", 0xffebcd)
    .set("blue", 0x0000ff)
    .set("blueviolet", 0x8a2be2)
    .set("brown", 0xa52a2a)
    .set("burlywood", 0xdeb887)
    .set("cadetblue", 0x5f9ea0)
    .set("chartreuse", 0x7fff00)
    .set("chocolate", 0xd2691e)
    .set("coral", 0xff7f50)
    .set("cornflowerblue", 0x6495ed)
    .set("cornsilk", 0xfff8dc)
    .set("crimson", 0xdc143c)
    .set("cyan", 0x00ffff)
    .set("darkblue", 0x00008b)
    .set("darkcyan", 0x008b8b)
    .set("darkgoldenrod", 0xb8860b)
    .set("darkgray", 0xa9a9a9)
    .set("darkgreen", 0x006400)
    .set("darkgrey", 0xa9a9a9)
    .set("darkkhaki", 0xbdb76b)
    .set("darkmagenta", 0x8b008b)
    .set("darkolivegreen", 0x556b2f)
    .set("darkorange", 0xff8c00)
    .set("darkorchid", 0x9932cc)
    .set("darkred", 0x8b0000)
    .set("darksalmon", 0xe9967a)
    .set("darkseagreen", 0x8fbc8f)
    .set("darkslateblue", 0x483d8b)
    .set("darkslategray", 0x2f4f4f)
    .set("darkslategrey", 0x2f4f4f)
    .set("darkturquoise", 0x00ced1)
    .set("darkviolet", 0x9400d3)
    .set("deeppink", 0xff1493)
    .set("deepskyblue", 0x00bfff)
    .set("dimgray", 0x696969)
    .set("dimgrey", 0x696969)
    .set("dodgerblue", 0x1e90ff)
    .set("firebrick", 0xb22222)
    .set("floralwhite", 0xfffaf0)
    .set("forestgreen", 0x228b22)
    .set("fuchsia", 0xff00ff)
    .set("gainsboro", 0xdcdcdc)
    .set("ghostwhite", 0xf8f8ff)
    .set("gold", 0xffd700)
    .set("goldenrod", 0xdaa520)
    .set("gray", 0x808080)
    .set("green", 0x008000)
    .set("greenyellow", 0xadff2f)
    .set("grey", 0x808080)
    .set("honeydew", 0xf0fff0)
    .set("hotpink", 0xff69b4)
    .set("indianred", 0xcd5c5c)
    .set("indigo", 0x4b0082)
    .set("ivory", 0xfffff0)
    .set("khaki", 0xf0e68c)
    .set("lavender", 0xe6e6fa)
    .set("lavenderblush", 0xfff0f5)
    .set("lawngreen", 0x7cfc00)
    .set("lemonchiffon", 0xfffacd)
    .set("lightblue", 0xadd8e6)
    .set("lightcoral", 0xf08080)
    .set("lightcyan", 0xe0ffff)
    .set("lightgoldenrodyellow", 0xfafad2)
    .set("lightgray", 0xd3d3d3)
    .set("lightgreen", 0x90ee90)
    .set("lightgrey", 0xd3d3d3)
    .set("lightpink", 0xffb6c1)
    .set("lightsalmon", 0xffa07a)
    .set("lightseagreen", 0x20b2aa)
    .set("lightskyblue", 0x87cefa)
    .set("lightslategray", 0x778899)
    .set("lightslategrey", 0x778899)
    .set("lightsteelblue", 0xb0c4de)
    .set("lightyellow", 0xffffe0)
    .set("lime", 0x00ff00)
    .set("limegreen", 0x32cd32)
    .set("linen", 0xfaf0e6)
    .set("magenta", 0xff00ff)
    .set("maroon", 0x800000)
    .set("mediumaquamarine", 0x66cdaa)
    .set("mediumblue", 0x0000cd)
    .set("mediumorchid", 0xba55d3)
    .set("mediumpurple", 0x9370db)
    .set("mediumseagreen", 0x3cb371)
    .set("mediumslateblue", 0x7b68ee)
    .set("mediumspringgreen", 0x00fa9a)
    .set("mediumturquoise", 0x48d1cc)
    .set("mediumvioletred", 0xc71585)
    .set("midnightblue", 0x191970)
    .set("mintcream", 0xf5fffa)
    .set("mistyrose", 0xffe4e1)
    .set("moccasin", 0xffe4b5)
    .set("navajowhite", 0xffdead)
    .set("navy", 0x000080)
    .set("oldlace", 0xfdf5e6)
    .set("olive", 0x808000)
    .set("olivedrab", 0x6b8e23)
    .set("orange", 0xffa500)
    .set("orangered", 0xff4500)
    .set("orchid", 0xda70d6)
    .set("palegoldenrod", 0xeee8aa)
    .set("palegreen", 0x98fb98)
    .set("paleturquoise", 0xafeeee)
    .set("palevioletred", 0xdb7093)
    .set("papayawhip", 0xffefd5)
    .set("peachpuff", 0xffdab9)
    .set("peru", 0xcd853f)
    .set("pink", 0xffc0cb)
    .set("plum", 0xdda0dd)
    .set("powderblue", 0xb0e0e6)
    .set("purple", 0x800080)
    .set("rebeccapurple", 0x663399)
    .set("red", 0xff0000)
    .set("rosybrown", 0xbc8f8f)
    .set("royalblue", 0x4169e1)
    .set("saddlebrown", 0x8b4513)
    .set("salmon", 0xfa8072)
    .set("sandybrown", 0xf4a460)
    .set("seagreen", 0x2e8b57)
    .set("seashell", 0xfff5ee)
    .set("sienna", 0xa0522d)
    .set("silver", 0xc0c0c0)
    .set("skyblue", 0x87ceeb)
    .set("slateblue", 0x6a5acd)
    .set("slategray", 0x708090)
    .set("slategrey", 0x708090)
    .set("snow", 0xfffafa)
    .set("springgreen", 0x00ff7f)
    .set("steelblue", 0x4682b4)
    .set("tan", 0xd2b48c)
    .set("teal", 0x008080)
    .set("thistle", 0xd8bfd8)
    .set("tomato", 0xff6347)
    .set("turquoise", 0x40e0d0)
    .set("violet", 0xee82ee)
    .set("wheat", 0xf5deb3)
    .set("white", 0xffffff)
    .set("whitesmoke", 0xf5f5f5)
    .set("yellow", 0xffff00)
    .set("yellowgreen", 0x9acd32);

  function rgbn(n) {
    return rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff);
  }

  function Hsl(h, s, l) {
    this.h = +h;
    this.s = Math.max(0, Math.min(1, +s));
    this.l = Math.max(0, Math.min(1, +l));
  }

  var __prototype = Hsl.prototype = new Color;

  __prototype.brighter = function(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Hsl(this.h, this.s, this.l * k);
  };

  __prototype.darker = function(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Hsl(this.h, this.s, this.l * k);
  };


  /* From FvD 13.37, CSS Color Module Level 3 */
  function hsl2rgb(h, m1, m2) {
    return (h < 60 ? m1 + (m2 - m1) * h / 60
        : h < 180 ? m2
        : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60
        : m1) * 255;
  }

  __prototype.rgb = function() {
    var h = this.h % 360 + (this.h < 0) * 360,
        s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
        l = this.l,
        m2 = l <= .5 ? l * (1 + s) : l + s - l * s,
        m1 = 2 * l - m2;
    return new Rgb(
      hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
      hsl2rgb(h, m1, m2),
      hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2)
    );
  };

  var hsl = function(h, s, l) {
    if (arguments.length === 1) {
      if (h instanceof Hsl) {
        l = h.l;
        s = h.s;
        h = h.h;
      } else {
        if (!(h instanceof Color)) h = color(h);
        if (h instanceof Hsl) return h;
        h = h.rgb();
        var r = h.r / 255,
            g = h.g / 255,
            b = h.b / 255,
            min = Math.min(r, g, b),
            max = Math.max(r, g, b),
            range = max - min;
        l = (max + min) / 2;
        if (range) {
          s = l < .5 ? range / (max + min) : range / (2 - max - min);
          if (r === max) h = (g - b) / range + (g < b) * 6;
          else if (g === max) h = (b - r) / range + 2;
          else h = (r - g) / range + 4;
          h *= 60;
        } else {
          h = NaN;
          s = l > 0 && l < 1 ? 0 : h;
        }
      }
    }
    return new Hsl(h, s, l);
  }

  var color = function(format) {
    var m;
    format = (format + "").trim().toLowerCase();
    return (m = /^#([0-9a-f]{3})$/.exec(format)) ? (m = parseInt(m[1], 16), rgb((m >> 8 & 0xf) | (m >> 4 & 0x0f0), (m >> 4 & 0xf) | (m & 0xf0), ((m & 0xf) << 4) | (m & 0xf))) // #f00
        : (m = /^#([0-9a-f]{6})$/.exec(format)) ? rgbn(parseInt(m[1], 16)) // #ff0000
        : (m = /^rgb\(\s*([-+]?\d+)\s*,\s*([-+]?\d+)\s*,\s*([-+]?\d+)\s*\)$/.exec(format)) ? rgb(m[1], m[2], m[3]) // rgb(255,0,0)
        : (m = /^rgb\(\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*\)$/.exec(format)) ? rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100) // rgb(100%,0%,0%)
        : (m = /^hsl\(\s*([-+]?\d+(?:\.\d+)?)\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*\)$/.exec(format)) ? hsl(m[1], m[2] / 100, m[3] / 100) // hsl(120,50%,50%)
        : named.has(format) ? rgbn(named.get(format))
        : rgb(NaN, NaN, NaN);
  }


  // Done lazily to avoid circular dependency between Color, Rgb and Hsl.
  color.prototype = Color.prototype;
  rgb.prototype = Rgb.prototype;
  hsl.prototype = Hsl.prototype;

  function Lab(l, a, b) {
    this.l = +l;
    this.a = +a;
    this.b = +b;
  }

  var ___prototype = Lab.prototype = new Color;

  var Kn = 18;

  ___prototype.brighter = function(k) {
    return new Lab(this.l + Kn * (k == null ? 1 : k), this.a, this.b);
  };

  ___prototype.darker = function(k) {
    return new Lab(this.l - Kn * (k == null ? 1 : k), this.a, this.b);
  };

  function xyz2rgb(x) {
    return 255 * (x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);
  }

  var Xn = 0.950470, // D65 standard referent
      Yn = 1,
      Zn = 1.088830,
      t0 = 4 / 29,
      t1 = 6 / 29,
      t2 = 3 * t1 * t1,
      t3 = t1 * t1 * t1;

  function lab2xyz(t) {
    return t > t1 ? t * t * t : t2 * (t - t0);
  }

  ___prototype.rgb = function() {
    var y = (this.l + 16) / 116,
        x = isNaN(this.a) ? y : y + this.a / 500,
        z = isNaN(this.b) ? y : y - this.b / 200;
    y = Yn * lab2xyz(y);
    x = Xn * lab2xyz(x);
    z = Zn * lab2xyz(z);
    return new Rgb(
      xyz2rgb( 3.2404542 * x - 1.5371385 * y - 0.4985314 * z), // D65 -> sRGB
      xyz2rgb(-0.9692660 * x + 1.8760108 * y + 0.0415560 * z),
      xyz2rgb( 0.0556434 * x - 0.2040259 * y + 1.0572252 * z)
    );
  };

  function xyz2lab(t) {
    return t > t3 ? Math.pow(t, 1 / 3) : t / t2 + t0;
  }

  function rgb2xyz(x) {
    return (x /= 255) <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
  }

  var deg2rad = Math.PI / 180;

  function Hcl(h, c, l) {
    this.h = +h;
    this.c = +c;
    this.l = +l;
  }

  var ____prototype = Hcl.prototype = new Color;

  ____prototype.brighter = function(k) {
    return new Hcl(this.h, this.c, this.l + Kn * (k == null ? 1 : k));
  };

  ____prototype.darker = function(k) {
    return new Hcl(this.h, this.c, this.l - Kn * (k == null ? 1 : k));
  };

  ____prototype.rgb = function() {
    return lab(this).rgb();
  };

  var lab = function(l, a, b) {
    if (arguments.length === 1) {
      if (l instanceof Lab) {
        b = l.b;
        a = l.a;
        l = l.l;
      } else if (l instanceof Hcl) {
        var h = l.h * deg2rad;
        b = Math.sin(h) * l.c;
        a = Math.cos(h) * l.c;
        l = l.l;
      } else {
        if (!(l instanceof Rgb)) l = rgb(l);
        var r = rgb2xyz(l.r),
            g = rgb2xyz(l.g),
            b = rgb2xyz(l.b),
            x = xyz2lab((0.4124564 * r + 0.3575761 * g + 0.1804375 * b) / Xn),
            y = xyz2lab((0.2126729 * r + 0.7151522 * g + 0.0721750 * b) / Yn),
            z = xyz2lab((0.0193339 * r + 0.1191920 * g + 0.9503041 * b) / Zn);
        b = 200 * (y - z);
        a = 500 * (x - y);
        l = 116 * y - 16;
      }
    }
    return new Lab(l, a, b);
  }

  lab.prototype = Lab.prototype;

  var rad2deg = 180 / Math.PI;

  var hcl = function(h, c, l) {
    if (arguments.length === 1) {
      if (h instanceof Hcl) {
        l = h.l;
        c = h.c;
        h = h.h;
      } else {
        if (!(h instanceof Lab)) h = lab(h);
        l = h.l;
        c = Math.sqrt(h.a * h.a + h.b * h.b);
        h = Math.atan2(h.b, h.a) * rad2deg;
        if (h < 0) h += 360;
      }
    }
    return new Hcl(h, c, l);
  }

  hcl.prototype = Hcl.prototype;

  function Cubehelix(h, s, l) {
    this.h = +h;
    this.s = +s;
    this.l = +l;
  }

  var prototype = Cubehelix.prototype = new Color;

  prototype.brighter = function(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Cubehelix(this.h, this.s, this.l * k);
  };

  prototype.darker = function(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Cubehelix(this.h, this.s, this.l * k);
  };

  var gamma = 1, // Default gamma. TODO Customize.
      A = -0.14861,
      B = +1.78277,
      C = -0.29227,
      D = -0.90649,
      E = +1.97294,
      ED = E * D,
      EB = E * B,
      BC_DA = B * C - D * A;

  var cubehelix = function(h, s, l) {
    if (arguments.length === 1) {
      if (h instanceof Cubehelix) {
        l = h.l;
        s = h.s;
        h = h.h;
      } else {
        if (!(h instanceof Rgb)) h = rgb(h);
        var r = h.r / 255, g = h.g / 255, b = h.b / 255;
        l = (BC_DA * b + ED * r - EB * g) / (BC_DA + ED - EB);
        var bl = b - l, k = (E * (g - l) - C * bl) / D, lgamma = Math.pow(l, gamma);
        s = Math.sqrt(k * k + bl * bl) / (E * lgamma * (1 - lgamma)); // NaN if lgamma=0 or lgamma=1
        h = s ? Math.atan2(k, bl) * rad2deg - 120 : NaN;
        if (h < 0) h += 360;
      }
    }
    return new Cubehelix(h, s, l);
  }

  prototype.rgb = function() {
    var h = isNaN(this.h) ? 0 : (this.h + 120) * deg2rad,
        l = Math.pow(this.l, gamma),
        a = isNaN(this.s) ? 0 : this.s * l * (1 - l),
        cosh = Math.cos(h),
        sinh = Math.sin(h);
    return new Rgb(
      255 * (l + a * (A * cosh + B * sinh)),
      255 * (l + a * (C * cosh + D * sinh)),
      255 * (l + a * (E * cosh))
    );
  };

  cubehelix.prototype = Cubehelix.prototype;

  var interpolateCubehelixLong = function(a, b) {
    a = cubehelix(a);
    b = cubehelix(b);
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
  }

  var deltaHue = function(h, h0) {
    var delta = (h - h0) % 360;
    return delta + (delta > 180 ? -360 : delta < -180 ? 360 : 0);
  }

  var interpolateCubehelix = function(a, b) {
    a = cubehelix(a);
    b = cubehelix(b);
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
  }

  var interpolateHclLong = function(a, b) {
    a = hcl(a);
    b = hcl(b);
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
  }

  var interpolateHcl = function(a, b) {
    a = hcl(a);
    b = hcl(b);
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
  }

  var interpolateLab = function(a, b) {
    a = lab(a);
    b = lab(b);
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
  }

  var interpolateHslLong = function(a, b) {
    a = hsl(a);
    b = hsl(b);
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
  }

  var interpolateHsl = function(a, b) {
    a = hsl(a);
    b = hsl(b);
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
  }

  var interpolateRgb = function(a, b) {
    a = rgb(a);
    b = rgb(b);
    var ar = a.r,
        ag = a.g,
        ab = a.b,
        br = b.r - ar,
        bg = b.g - ag,
        bb = b.b - ab;
    return function(t) {
      return format(Math.round(ar + br * t), Math.round(ag + bg * t), Math.round(ab + bb * t));
    };
  }

  exports.color = color;
  exports.rgb = rgb;
  exports.hsl = hsl;
  exports.lab = lab;
  exports.hcl = hcl;
  exports.cubehelix = cubehelix;
  exports.interpolateRgb = interpolateRgb;
  exports.interpolateHsl = interpolateHsl;
  exports.interpolateHslLong = interpolateHslLong;
  exports.interpolateLab = interpolateLab;
  exports.interpolateHcl = interpolateHcl;
  exports.interpolateHclLong = interpolateHclLong;
  exports.interpolateCubehelix = interpolateCubehelix;
  exports.interpolateCubehelixLong = interpolateCubehelixLong;

}));