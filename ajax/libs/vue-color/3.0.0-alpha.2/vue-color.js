import { computed as R, defineComponent as D, useTemplateRef as ve, openBlock as w, createElementBlock as C, normalizeClass as o, normalizeStyle as B, createElementVNode as d, useCssModule as He, ref as ae, watch as xe, createVNode as F, unref as x, toDisplayString as U, createCommentVNode as I, useCssVars as Le, isRef as ne, createBlock as he, withDirectives as X, vShow as Y, withKeys as z, Fragment as j, renderList as q, withCtx as Te } from "vue";
function le(e) {
  "@babel/helpers - typeof";
  return le = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(a) {
    return typeof a;
  } : function(a) {
    return a && typeof Symbol == "function" && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a;
  }, le(e);
}
var Be = /^\s+/, De = /\s+$/;
function g(e, a) {
  if (e = e || "", a = a || {}, e instanceof g)
    return e;
  if (!(this instanceof g))
    return new g(e, a);
  var t = Pe(e);
  this._originalInput = e, this._r = t.r, this._g = t.g, this._b = t.b, this._a = t.a, this._roundA = Math.round(100 * this._a) / 100, this._format = a.format || t.format, this._gradientType = a.gradientType, this._r < 1 && (this._r = Math.round(this._r)), this._g < 1 && (this._g = Math.round(this._g)), this._b < 1 && (this._b = Math.round(this._b)), this._ok = t.ok;
}
g.prototype = {
  isDark: function() {
    return this.getBrightness() < 128;
  },
  isLight: function() {
    return !this.isDark();
  },
  isValid: function() {
    return this._ok;
  },
  getOriginalInput: function() {
    return this._originalInput;
  },
  getFormat: function() {
    return this._format;
  },
  getAlpha: function() {
    return this._a;
  },
  getBrightness: function() {
    var a = this.toRgb();
    return (a.r * 299 + a.g * 587 + a.b * 114) / 1e3;
  },
  getLuminance: function() {
    var a = this.toRgb(), t, n, l, r, i, c;
    return t = a.r / 255, n = a.g / 255, l = a.b / 255, t <= 0.03928 ? r = t / 12.92 : r = Math.pow((t + 0.055) / 1.055, 2.4), n <= 0.03928 ? i = n / 12.92 : i = Math.pow((n + 0.055) / 1.055, 2.4), l <= 0.03928 ? c = l / 12.92 : c = Math.pow((l + 0.055) / 1.055, 2.4), 0.2126 * r + 0.7152 * i + 0.0722 * c;
  },
  setAlpha: function(a) {
    return this._a = Fe(a), this._roundA = Math.round(100 * this._a) / 100, this;
  },
  toHsv: function() {
    var a = Ce(this._r, this._g, this._b);
    return {
      h: a.h * 360,
      s: a.s,
      v: a.v,
      a: this._a
    };
  },
  toHsvString: function() {
    var a = Ce(this._r, this._g, this._b), t = Math.round(a.h * 360), n = Math.round(a.s * 100), l = Math.round(a.v * 100);
    return this._a == 1 ? "hsv(" + t + ", " + n + "%, " + l + "%)" : "hsva(" + t + ", " + n + "%, " + l + "%, " + this._roundA + ")";
  },
  toHsl: function() {
    var a = we(this._r, this._g, this._b);
    return {
      h: a.h * 360,
      s: a.s,
      l: a.l,
      a: this._a
    };
  },
  toHslString: function() {
    var a = we(this._r, this._g, this._b), t = Math.round(a.h * 360), n = Math.round(a.s * 100), l = Math.round(a.l * 100);
    return this._a == 1 ? "hsl(" + t + ", " + n + "%, " + l + "%)" : "hsla(" + t + ", " + n + "%, " + l + "%, " + this._roundA + ")";
  },
  toHex: function(a) {
    return $e(this._r, this._g, this._b, a);
  },
  toHexString: function(a) {
    return "#" + this.toHex(a);
  },
  toHex8: function(a) {
    return Ve(this._r, this._g, this._b, this._a, a);
  },
  toHex8String: function(a) {
    return "#" + this.toHex8(a);
  },
  toRgb: function() {
    return {
      r: Math.round(this._r),
      g: Math.round(this._g),
      b: Math.round(this._b),
      a: this._a
    };
  },
  toRgbString: function() {
    return this._a == 1 ? "rgb(" + Math.round(this._r) + ", " + Math.round(this._g) + ", " + Math.round(this._b) + ")" : "rgba(" + Math.round(this._r) + ", " + Math.round(this._g) + ", " + Math.round(this._b) + ", " + this._roundA + ")";
  },
  toPercentageRgb: function() {
    return {
      r: Math.round(T(this._r, 255) * 100) + "%",
      g: Math.round(T(this._g, 255) * 100) + "%",
      b: Math.round(T(this._b, 255) * 100) + "%",
      a: this._a
    };
  },
  toPercentageRgbString: function() {
    return this._a == 1 ? "rgb(" + Math.round(T(this._r, 255) * 100) + "%, " + Math.round(T(this._g, 255) * 100) + "%, " + Math.round(T(this._b, 255) * 100) + "%)" : "rgba(" + Math.round(T(this._r, 255) * 100) + "%, " + Math.round(T(this._g, 255) * 100) + "%, " + Math.round(T(this._b, 255) * 100) + "%, " + this._roundA + ")";
  },
  toName: function() {
    return this._a === 0 ? "transparent" : this._a < 1 ? !1 : Je[$e(this._r, this._g, this._b, !0)] || !1;
  },
  toFilter: function(a) {
    var t = "#" + ke(this._r, this._g, this._b, this._a), n = t, l = this._gradientType ? "GradientType = 1, " : "";
    if (a) {
      var r = g(a);
      n = "#" + ke(r._r, r._g, r._b, r._a);
    }
    return "progid:DXImageTransform.Microsoft.gradient(" + l + "startColorstr=" + t + ",endColorstr=" + n + ")";
  },
  toString: function(a) {
    var t = !!a;
    a = a || this._format;
    var n = !1, l = this._a < 1 && this._a >= 0, r = !t && l && (a === "hex" || a === "hex6" || a === "hex3" || a === "hex4" || a === "hex8" || a === "name");
    return r ? a === "name" && this._a === 0 ? this.toName() : this.toRgbString() : (a === "rgb" && (n = this.toRgbString()), a === "prgb" && (n = this.toPercentageRgbString()), (a === "hex" || a === "hex6") && (n = this.toHexString()), a === "hex3" && (n = this.toHexString(!0)), a === "hex4" && (n = this.toHex8String(!0)), a === "hex8" && (n = this.toHex8String()), a === "name" && (n = this.toName()), a === "hsl" && (n = this.toHslString()), a === "hsv" && (n = this.toHsvString()), n || this.toHexString());
  },
  clone: function() {
    return g(this.toString());
  },
  _applyModification: function(a, t) {
    var n = a.apply(null, [this].concat([].slice.call(t)));
    return this._r = n._r, this._g = n._g, this._b = n._b, this.setAlpha(n._a), this;
  },
  lighten: function() {
    return this._applyModification(Ke, arguments);
  },
  brighten: function() {
    return this._applyModification(Oe, arguments);
  },
  darken: function() {
    return this._applyModification(Ue, arguments);
  },
  desaturate: function() {
    return this._applyModification(Ne, arguments);
  },
  saturate: function() {
    return this._applyModification(We, arguments);
  },
  greyscale: function() {
    return this._applyModification(Ge, arguments);
  },
  spin: function() {
    return this._applyModification(je, arguments);
  },
  _applyCombination: function(a, t) {
    return a.apply(null, [this].concat([].slice.call(t)));
  },
  analogous: function() {
    return this._applyCombination(qe, arguments);
  },
  complement: function() {
    return this._applyCombination(Xe, arguments);
  },
  monochromatic: function() {
    return this._applyCombination(Ze, arguments);
  },
  splitcomplement: function() {
    return this._applyCombination(Ye, arguments);
  },
  // Disabled until https://github.com/bgrins/TinyColor/issues/254
  // polyad: function (number) {
  //   return this._applyCombination(polyad, [number]);
  // },
  triad: function() {
    return this._applyCombination(Me, [3]);
  },
  tetrad: function() {
    return this._applyCombination(Me, [4]);
  }
};
g.fromRatio = function(e, a) {
  if (le(e) == "object") {
    var t = {};
    for (var n in e)
      e.hasOwnProperty(n) && (n === "a" ? t[n] = e[n] : t[n] = te(e[n]));
    e = t;
  }
  return g(e, a);
};
function Pe(e) {
  var a = {
    r: 0,
    g: 0,
    b: 0
  }, t = 1, n = null, l = null, r = null, i = !1, c = !1;
  return typeof e == "string" && (e = at(e)), le(e) == "object" && (O(e.r) && O(e.g) && O(e.b) ? (a = Ee(e.r, e.g, e.b), i = !0, c = String(e.r).substr(-1) === "%" ? "prgb" : "rgb") : O(e.h) && O(e.s) && O(e.v) ? (n = te(e.s), l = te(e.v), a = ze(e.h, n, l), i = !0, c = "hsv") : O(e.h) && O(e.s) && O(e.l) && (n = te(e.s), r = te(e.l), a = Ie(e.h, n, r), i = !0, c = "hsl"), e.hasOwnProperty("a") && (t = e.a)), t = Fe(t), {
    ok: i,
    format: e.format || c,
    r: Math.min(255, Math.max(a.r, 0)),
    g: Math.min(255, Math.max(a.g, 0)),
    b: Math.min(255, Math.max(a.b, 0)),
    a: t
  };
}
function Ee(e, a, t) {
  return {
    r: T(e, 255) * 255,
    g: T(a, 255) * 255,
    b: T(t, 255) * 255
  };
}
function we(e, a, t) {
  e = T(e, 255), a = T(a, 255), t = T(t, 255);
  var n = Math.max(e, a, t), l = Math.min(e, a, t), r, i, c = (n + l) / 2;
  if (n == l)
    r = i = 0;
  else {
    var f = n - l;
    switch (i = c > 0.5 ? f / (2 - n - l) : f / (n + l), n) {
      case e:
        r = (a - t) / f + (a < t ? 6 : 0);
        break;
      case a:
        r = (t - e) / f + 2;
        break;
      case t:
        r = (e - a) / f + 4;
        break;
    }
    r /= 6;
  }
  return {
    h: r,
    s: i,
    l: c
  };
}
function Ie(e, a, t) {
  var n, l, r;
  e = T(e, 360), a = T(a, 100), t = T(t, 100);
  function i(p, u, _) {
    return _ < 0 && (_ += 1), _ > 1 && (_ -= 1), _ < 1 / 6 ? p + (u - p) * 6 * _ : _ < 1 / 2 ? u : _ < 2 / 3 ? p + (u - p) * (2 / 3 - _) * 6 : p;
  }
  if (a === 0)
    n = l = r = t;
  else {
    var c = t < 0.5 ? t * (1 + a) : t + a - t * a, f = 2 * t - c;
    n = i(f, c, e + 1 / 3), l = i(f, c, e), r = i(f, c, e - 1 / 3);
  }
  return {
    r: n * 255,
    g: l * 255,
    b: r * 255
  };
}
function Ce(e, a, t) {
  e = T(e, 255), a = T(a, 255), t = T(t, 255);
  var n = Math.max(e, a, t), l = Math.min(e, a, t), r, i, c = n, f = n - l;
  if (i = n === 0 ? 0 : f / n, n == l)
    r = 0;
  else {
    switch (n) {
      case e:
        r = (a - t) / f + (a < t ? 6 : 0);
        break;
      case a:
        r = (t - e) / f + 2;
        break;
      case t:
        r = (e - a) / f + 4;
        break;
    }
    r /= 6;
  }
  return {
    h: r,
    s: i,
    v: c
  };
}
function ze(e, a, t) {
  e = T(e, 360) * 6, a = T(a, 100), t = T(t, 100);
  var n = Math.floor(e), l = e - n, r = t * (1 - a), i = t * (1 - l * a), c = t * (1 - (1 - l) * a), f = n % 6, p = [t, i, r, r, c, t][f], u = [c, t, t, i, r, r][f], _ = [r, r, c, t, t, i][f];
  return {
    r: p * 255,
    g: u * 255,
    b: _ * 255
  };
}
function $e(e, a, t, n) {
  var l = [W(Math.round(e).toString(16)), W(Math.round(a).toString(16)), W(Math.round(t).toString(16))];
  return n && l[0].charAt(0) == l[0].charAt(1) && l[1].charAt(0) == l[1].charAt(1) && l[2].charAt(0) == l[2].charAt(1) ? l[0].charAt(0) + l[1].charAt(0) + l[2].charAt(0) : l.join("");
}
function Ve(e, a, t, n, l) {
  var r = [W(Math.round(e).toString(16)), W(Math.round(a).toString(16)), W(Math.round(t).toString(16)), W(Se(n))];
  return l && r[0].charAt(0) == r[0].charAt(1) && r[1].charAt(0) == r[1].charAt(1) && r[2].charAt(0) == r[2].charAt(1) && r[3].charAt(0) == r[3].charAt(1) ? r[0].charAt(0) + r[1].charAt(0) + r[2].charAt(0) + r[3].charAt(0) : r.join("");
}
function ke(e, a, t, n) {
  var l = [W(Se(n)), W(Math.round(e).toString(16)), W(Math.round(a).toString(16)), W(Math.round(t).toString(16))];
  return l.join("");
}
g.equals = function(e, a) {
  return !e || !a ? !1 : g(e).toRgbString() == g(a).toRgbString();
};
g.random = function() {
  return g.fromRatio({
    r: Math.random(),
    g: Math.random(),
    b: Math.random()
  });
};
function Ne(e, a) {
  a = a === 0 ? 0 : a || 10;
  var t = g(e).toHsl();
  return t.s -= a / 100, t.s = oe(t.s), g(t);
}
function We(e, a) {
  a = a === 0 ? 0 : a || 10;
  var t = g(e).toHsl();
  return t.s += a / 100, t.s = oe(t.s), g(t);
}
function Ge(e) {
  return g(e).desaturate(100);
}
function Ke(e, a) {
  a = a === 0 ? 0 : a || 10;
  var t = g(e).toHsl();
  return t.l += a / 100, t.l = oe(t.l), g(t);
}
function Oe(e, a) {
  a = a === 0 ? 0 : a || 10;
  var t = g(e).toRgb();
  return t.r = Math.max(0, Math.min(255, t.r - Math.round(255 * -(a / 100)))), t.g = Math.max(0, Math.min(255, t.g - Math.round(255 * -(a / 100)))), t.b = Math.max(0, Math.min(255, t.b - Math.round(255 * -(a / 100)))), g(t);
}
function Ue(e, a) {
  a = a === 0 ? 0 : a || 10;
  var t = g(e).toHsl();
  return t.l -= a / 100, t.l = oe(t.l), g(t);
}
function je(e, a) {
  var t = g(e).toHsl(), n = (t.h + a) % 360;
  return t.h = n < 0 ? 360 + n : n, g(t);
}
function Xe(e) {
  var a = g(e).toHsl();
  return a.h = (a.h + 180) % 360, g(a);
}
function Me(e, a) {
  if (isNaN(a) || a <= 0)
    throw new Error("Argument to polyad must be a positive number");
  for (var t = g(e).toHsl(), n = [g(e)], l = 360 / a, r = 1; r < a; r++)
    n.push(g({
      h: (t.h + r * l) % 360,
      s: t.s,
      l: t.l
    }));
  return n;
}
function Ye(e) {
  var a = g(e).toHsl(), t = a.h;
  return [g(e), g({
    h: (t + 72) % 360,
    s: a.s,
    l: a.l
  }), g({
    h: (t + 216) % 360,
    s: a.s,
    l: a.l
  })];
}
function qe(e, a, t) {
  a = a || 6, t = t || 30;
  var n = g(e).toHsl(), l = 360 / t, r = [g(e)];
  for (n.h = (n.h - (l * a >> 1) + 720) % 360; --a; )
    n.h = (n.h + l) % 360, r.push(g(n));
  return r;
}
function Ze(e, a) {
  a = a || 6;
  for (var t = g(e).toHsv(), n = t.h, l = t.s, r = t.v, i = [], c = 1 / a; a--; )
    i.push(g({
      h: n,
      s: l,
      v: r
    })), r = (r + c) % 1;
  return i;
}
g.mix = function(e, a, t) {
  t = t === 0 ? 0 : t || 50;
  var n = g(e).toRgb(), l = g(a).toRgb(), r = t / 100, i = {
    r: (l.r - n.r) * r + n.r,
    g: (l.g - n.g) * r + n.g,
    b: (l.b - n.b) * r + n.b,
    a: (l.a - n.a) * r + n.a
  };
  return g(i);
};
g.readability = function(e, a) {
  var t = g(e), n = g(a);
  return (Math.max(t.getLuminance(), n.getLuminance()) + 0.05) / (Math.min(t.getLuminance(), n.getLuminance()) + 0.05);
};
g.isReadable = function(e, a, t) {
  var n = g.readability(e, a), l, r;
  switch (r = !1, l = nt(t), l.level + l.size) {
    case "AAsmall":
    case "AAAlarge":
      r = n >= 4.5;
      break;
    case "AAlarge":
      r = n >= 3;
      break;
    case "AAAsmall":
      r = n >= 7;
      break;
  }
  return r;
};
g.mostReadable = function(e, a, t) {
  var n = null, l = 0, r, i, c, f;
  t = t || {}, i = t.includeFallbackColors, c = t.level, f = t.size;
  for (var p = 0; p < a.length; p++)
    r = g.readability(e, a[p]), r > l && (l = r, n = g(a[p]));
  return g.isReadable(e, n, {
    level: c,
    size: f
  }) || !i ? n : (t.includeFallbackColors = !1, g.mostReadable(e, ["#fff", "#000"], t));
};
var pe = g.names = {
  aliceblue: "f0f8ff",
  antiquewhite: "faebd7",
  aqua: "0ff",
  aquamarine: "7fffd4",
  azure: "f0ffff",
  beige: "f5f5dc",
  bisque: "ffe4c4",
  black: "000",
  blanchedalmond: "ffebcd",
  blue: "00f",
  blueviolet: "8a2be2",
  brown: "a52a2a",
  burlywood: "deb887",
  burntsienna: "ea7e5d",
  cadetblue: "5f9ea0",
  chartreuse: "7fff00",
  chocolate: "d2691e",
  coral: "ff7f50",
  cornflowerblue: "6495ed",
  cornsilk: "fff8dc",
  crimson: "dc143c",
  cyan: "0ff",
  darkblue: "00008b",
  darkcyan: "008b8b",
  darkgoldenrod: "b8860b",
  darkgray: "a9a9a9",
  darkgreen: "006400",
  darkgrey: "a9a9a9",
  darkkhaki: "bdb76b",
  darkmagenta: "8b008b",
  darkolivegreen: "556b2f",
  darkorange: "ff8c00",
  darkorchid: "9932cc",
  darkred: "8b0000",
  darksalmon: "e9967a",
  darkseagreen: "8fbc8f",
  darkslateblue: "483d8b",
  darkslategray: "2f4f4f",
  darkslategrey: "2f4f4f",
  darkturquoise: "00ced1",
  darkviolet: "9400d3",
  deeppink: "ff1493",
  deepskyblue: "00bfff",
  dimgray: "696969",
  dimgrey: "696969",
  dodgerblue: "1e90ff",
  firebrick: "b22222",
  floralwhite: "fffaf0",
  forestgreen: "228b22",
  fuchsia: "f0f",
  gainsboro: "dcdcdc",
  ghostwhite: "f8f8ff",
  gold: "ffd700",
  goldenrod: "daa520",
  gray: "808080",
  green: "008000",
  greenyellow: "adff2f",
  grey: "808080",
  honeydew: "f0fff0",
  hotpink: "ff69b4",
  indianred: "cd5c5c",
  indigo: "4b0082",
  ivory: "fffff0",
  khaki: "f0e68c",
  lavender: "e6e6fa",
  lavenderblush: "fff0f5",
  lawngreen: "7cfc00",
  lemonchiffon: "fffacd",
  lightblue: "add8e6",
  lightcoral: "f08080",
  lightcyan: "e0ffff",
  lightgoldenrodyellow: "fafad2",
  lightgray: "d3d3d3",
  lightgreen: "90ee90",
  lightgrey: "d3d3d3",
  lightpink: "ffb6c1",
  lightsalmon: "ffa07a",
  lightseagreen: "20b2aa",
  lightskyblue: "87cefa",
  lightslategray: "789",
  lightslategrey: "789",
  lightsteelblue: "b0c4de",
  lightyellow: "ffffe0",
  lime: "0f0",
  limegreen: "32cd32",
  linen: "faf0e6",
  magenta: "f0f",
  maroon: "800000",
  mediumaquamarine: "66cdaa",
  mediumblue: "0000cd",
  mediumorchid: "ba55d3",
  mediumpurple: "9370db",
  mediumseagreen: "3cb371",
  mediumslateblue: "7b68ee",
  mediumspringgreen: "00fa9a",
  mediumturquoise: "48d1cc",
  mediumvioletred: "c71585",
  midnightblue: "191970",
  mintcream: "f5fffa",
  mistyrose: "ffe4e1",
  moccasin: "ffe4b5",
  navajowhite: "ffdead",
  navy: "000080",
  oldlace: "fdf5e6",
  olive: "808000",
  olivedrab: "6b8e23",
  orange: "ffa500",
  orangered: "ff4500",
  orchid: "da70d6",
  palegoldenrod: "eee8aa",
  palegreen: "98fb98",
  paleturquoise: "afeeee",
  palevioletred: "db7093",
  papayawhip: "ffefd5",
  peachpuff: "ffdab9",
  peru: "cd853f",
  pink: "ffc0cb",
  plum: "dda0dd",
  powderblue: "b0e0e6",
  purple: "800080",
  rebeccapurple: "663399",
  red: "f00",
  rosybrown: "bc8f8f",
  royalblue: "4169e1",
  saddlebrown: "8b4513",
  salmon: "fa8072",
  sandybrown: "f4a460",
  seagreen: "2e8b57",
  seashell: "fff5ee",
  sienna: "a0522d",
  silver: "c0c0c0",
  skyblue: "87ceeb",
  slateblue: "6a5acd",
  slategray: "708090",
  slategrey: "708090",
  snow: "fffafa",
  springgreen: "00ff7f",
  steelblue: "4682b4",
  tan: "d2b48c",
  teal: "008080",
  thistle: "d8bfd8",
  tomato: "ff6347",
  turquoise: "40e0d0",
  violet: "ee82ee",
  wheat: "f5deb3",
  white: "fff",
  whitesmoke: "f5f5f5",
  yellow: "ff0",
  yellowgreen: "9acd32"
}, Je = g.hexNames = Qe(pe);
function Qe(e) {
  var a = {};
  for (var t in e)
    e.hasOwnProperty(t) && (a[e[t]] = t);
  return a;
}
function Fe(e) {
  return e = parseFloat(e), (isNaN(e) || e < 0 || e > 1) && (e = 1), e;
}
function T(e, a) {
  et(e) && (e = "100%");
  var t = tt(e);
  return e = Math.min(a, Math.max(0, parseFloat(e))), t && (e = parseInt(e * a, 10) / 100), Math.abs(e - a) < 1e-6 ? 1 : e % a / parseFloat(a);
}
function oe(e) {
  return Math.min(1, Math.max(0, e));
}
function E(e) {
  return parseInt(e, 16);
}
function et(e) {
  return typeof e == "string" && e.indexOf(".") != -1 && parseFloat(e) === 1;
}
function tt(e) {
  return typeof e == "string" && e.indexOf("%") != -1;
}
function W(e) {
  return e.length == 1 ? "0" + e : "" + e;
}
function te(e) {
  return e <= 1 && (e = e * 100 + "%"), e;
}
function Se(e) {
  return Math.round(parseFloat(e) * 255).toString(16);
}
function Ae(e) {
  return E(e) / 255;
}
var N = function() {
  var e = "[-\\+]?\\d+%?", a = "[-\\+]?\\d*\\.\\d+%?", t = "(?:" + a + ")|(?:" + e + ")", n = "[\\s|\\(]+(" + t + ")[,|\\s]+(" + t + ")[,|\\s]+(" + t + ")\\s*\\)?", l = "[\\s|\\(]+(" + t + ")[,|\\s]+(" + t + ")[,|\\s]+(" + t + ")[,|\\s]+(" + t + ")\\s*\\)?";
  return {
    CSS_UNIT: new RegExp(t),
    rgb: new RegExp("rgb" + n),
    rgba: new RegExp("rgba" + l),
    hsl: new RegExp("hsl" + n),
    hsla: new RegExp("hsla" + l),
    hsv: new RegExp("hsv" + n),
    hsva: new RegExp("hsva" + l),
    hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
    hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
  };
}();
function O(e) {
  return !!N.CSS_UNIT.exec(e);
}
function at(e) {
  e = e.replace(Be, "").replace(De, "").toLowerCase();
  var a = !1;
  if (pe[e])
    e = pe[e], a = !0;
  else if (e == "transparent")
    return {
      r: 0,
      g: 0,
      b: 0,
      a: 0,
      format: "name"
    };
  var t;
  return (t = N.rgb.exec(e)) ? {
    r: t[1],
    g: t[2],
    b: t[3]
  } : (t = N.rgba.exec(e)) ? {
    r: t[1],
    g: t[2],
    b: t[3],
    a: t[4]
  } : (t = N.hsl.exec(e)) ? {
    h: t[1],
    s: t[2],
    l: t[3]
  } : (t = N.hsla.exec(e)) ? {
    h: t[1],
    s: t[2],
    l: t[3],
    a: t[4]
  } : (t = N.hsv.exec(e)) ? {
    h: t[1],
    s: t[2],
    v: t[3]
  } : (t = N.hsva.exec(e)) ? {
    h: t[1],
    s: t[2],
    v: t[3],
    a: t[4]
  } : (t = N.hex8.exec(e)) ? {
    r: E(t[1]),
    g: E(t[2]),
    b: E(t[3]),
    a: Ae(t[4]),
    format: a ? "name" : "hex8"
  } : (t = N.hex6.exec(e)) ? {
    r: E(t[1]),
    g: E(t[2]),
    b: E(t[3]),
    format: a ? "name" : "hex"
  } : (t = N.hex4.exec(e)) ? {
    r: E(t[1] + "" + t[1]),
    g: E(t[2] + "" + t[2]),
    b: E(t[3] + "" + t[3]),
    a: Ae(t[4] + "" + t[4]),
    format: a ? "name" : "hex8"
  } : (t = N.hex3.exec(e)) ? {
    r: E(t[1] + "" + t[1]),
    g: E(t[2] + "" + t[2]),
    b: E(t[3] + "" + t[3]),
    format: a ? "name" : "hex"
  } : !1;
}
function nt(e) {
  var a, t;
  return e = e || {
    level: "AA",
    size: "small"
  }, a = (e.level || "AA").toUpperCase(), t = (e.size || "small").toLowerCase(), a !== "AA" && a !== "AAA" && (a = "AA"), t !== "small" && t !== "large" && (t = "small"), {
    level: a,
    size: t
  };
}
const lt = (e, a, t = !1) => {
  if (t)
    switch (a) {
      case "rgb":
        return e.toRgb();
      case "prgb":
        return e.toPercentageRgb();
      case "hsl":
        return e.toHsl();
      case "hsv":
        return e.toHsv();
      default:
        return null;
    }
  else {
    let n = e.toString(a);
    try {
      n = JSON.parse(n);
    } catch {
    }
    return n;
  }
}, G = ["update:tinyColor", "update:modelValue"];
function K(e, a) {
  let t, n;
  const l = R({
    get: () => {
      const i = e.modelValue ?? e.tinyColor, c = g(i);
      return typeof n > "u" && (n = c.getFormat()), typeof t > "u" && typeof e.modelValue == "object" && (t = !0), c;
    },
    set: (i) => {
      r(i);
    }
  }), r = (i) => {
    const c = g(i);
    e.tinyColor && a("update:tinyColor", c.clone()), e.modelValue && a("update:modelValue", lt(c, n, t));
  };
  return {
    colorRef: l,
    updateColor: r
  };
}
const ge = (e) => {
  const a = { x: 0, y: 0 };
  return e instanceof MouseEvent && (a.x = e.pageX, a.y = e.pageY), e instanceof TouchEvent && (a.x = e.touches ? e.touches[0].pageX : e.changedTouches ? e.changedTouches[0].pageX : 0, a.y = e.touches ? e.touches[0].pageY : e.changedTouches ? e.changedTouches[0].pageY : 0), a;
}, rt = () => {
  const e = window.scrollX || window.pageXOffset || document.documentElement.scrollLeft || 0, a = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
  return { x: e, y: a };
}, ye = (e) => {
  const { x: a, y: t } = rt(), n = e.getBoundingClientRect();
  return {
    x: n.left + a,
    y: n.top + t
  };
}, se = (e) => e.code === "ArrowUp" || e.keyCode === 38 ? "up" : e.code === "ArrowDown" || e.keyCode === 40 ? "down" : e.code === "ArrowLeft" || e.keyCode === 37 ? "left" : e.code === "ArrowRight" || e.keyCode === 39 ? "right" : null;
function ot(e) {
  const a = e.toString();
  return a.indexOf(".") !== -1 ? a.split(".")[1].length : 0;
}
function be(e, a, t) {
  return Math.min(Math.max(e, a), t);
}
const _e = (e, a = 20) => {
  let t, n, l;
  return (...r) => {
    t ? (clearTimeout(n), n = setTimeout(() => {
      Date.now() - l >= a && (e(...r), l = Date.now());
    }, Math.max(a - (Date.now() - l), 0))) : (e(...r), l = Date.now(), t = !0);
  };
}, st = ["aria-valuetext"], it = /* @__PURE__ */ D({
  __name: "SaturationSlider",
  props: {
    hue: {},
    tinyColor: {},
    modelValue: {}
  },
  emits: ["change"].concat(G),
  setup(e, { emit: a }) {
    const t = a, n = e, { colorRef: l, updateColor: r } = K(n, t), i = R(() => l.value.toHsv()), c = R(() => `hsl(${n.hue ?? i.value.h}, 100%, 50%)`), f = R(() => -(i.value.v * 100) + 1 + 100 + "%"), p = R(() => i.value.s * 100 + "%"), u = ve("container");
    function _(v, L = !1) {
      L || v.preventDefault();
      var h = u.value;
      if (!h)
        return;
      const s = h.clientWidth, b = h.clientHeight, { x: A, y: ce } = ye(h), { x: de, y: fe } = ge(v), Q = be(de - A, 0, s), ee = be(fe - ce, 0, b), V = Q / s, Z = be(-(ee / b) + 1, 0, 1);
      $({
        h: i.value.h,
        s: V,
        v: Z,
        a: i.value.a
      });
    }
    function $(v) {
      r(g(v));
    }
    const m = _e(_, 20);
    function S() {
      window.addEventListener("mousemove", m), window.addEventListener("mouseup", m), window.addEventListener("mouseup", k);
    }
    function k() {
      y();
    }
    function y() {
      window.removeEventListener("mousemove", m), window.removeEventListener("mouseup", m), window.removeEventListener("mouseup", k);
    }
    function M(v) {
      switch (v.preventDefault(), se(v)) {
        case "left": {
          const h = i.value.s - 0.01;
          $({
            ...i.value,
            s: h >= 0 ? h : 0
          });
          break;
        }
        case "right": {
          const h = i.value.s + 0.01;
          $({
            ...i.value,
            s: h > 1 ? 1 : h
          });
          break;
        }
        case "up": {
          const h = i.value.v + 0.01;
          $({
            ...i.value,
            v: h > 1 ? 1 : h
          });
          break;
        }
        case "down": {
          const h = i.value.v - 0.01;
          $({
            ...i.value,
            v: h < 0 ? 0 : h
          });
          break;
        }
      }
    }
    return (v, L) => (w(), C("div", {
      class: o(["vc-saturation", v.$style.bg]),
      style: B({ background: c.value }),
      ref: "container",
      onMousedown: S,
      onTouchmove: _,
      onTouchstart: _,
      role: "application",
      "aria-label": "Saturation and brightness picker"
    }, [
      d("div", {
        class: o([v.$style.bg, v.$style.white])
      }, null, 2),
      d("div", {
        class: o([v.$style.bg, v.$style.black])
      }, null, 2),
      d("div", {
        class: o(v.$style.pointer),
        style: B({ top: f.value, left: p.value }),
        role: "slider",
        tabindex: "0",
        "aria-valuemin": "0",
        "aria-valuemax": "1",
        "aria-label": "press arrow to change saturation or brightness",
        "aria-valuenow": "?",
        "aria-valuetext": `saturation: ${i.value.s.toFixed(0)}%, brightness: ${i.value.v.toFixed(0)}%`,
        onKeydown: M
      }, [
        d("div", {
          class: o(["vc-saturation-circle", v.$style.circle])
        }, null, 2)
      ], 46, st)
    ], 38));
  }
}), ut = "_bg_uo00c_2", ct = "_white_uo00c_11", dt = "_black_uo00c_14", ft = "_pointer_uo00c_18", ht = "_circle_uo00c_23", bt = {
  bg: ut,
  white: ct,
  black: dt,
  pointer: ft,
  circle: ht
}, P = (e, a) => {
  const t = e.__vccOpts || e;
  for (const [n, l] of a)
    t[n] = l;
  return t;
}, pt = {
  $style: bt
}, me = /* @__PURE__ */ P(it, [["__cssModules", pt]]), vt = ["aria-valuenow"], gt = /* @__PURE__ */ D({
  __name: "HueSlider",
  props: {
    direction: { default: "horizontal" },
    hue: { default: 0 }
  },
  emits: ["change"],
  setup(e, { emit: a }) {
    const t = He(), n = e, l = a, r = ae(), i = ve("container"), c = R(() => n.hue);
    xe(c, (v, L) => {
      v !== 0 && v - L > 0 && (r.value = "right"), v !== 0 && v - L < 0 && (r.value = "left");
    });
    const f = R(() => ({
      [t.horizontal]: n.direction === "horizontal",
      [t.vertical]: n.direction === "vertical"
    })), p = R(() => n.direction === "vertical" ? c.value === 0 && r.value === "right" ? 0 : -(c.value * 100 / 360) + 100 + "%" : 0), u = R(() => n.direction === "vertical" ? 0 : c.value === 0 && r.value === "right" ? "100%" : c.value * 100 / 360 + "%");
    function _(v, L) {
      L || v.preventDefault();
      const h = i.value;
      if (!h)
        return;
      const s = h.clientWidth, b = h.clientHeight, { x: A, y: ce } = ye(h), { x: de, y: fe } = ge(v), Q = de - A, ee = fe - ce;
      let V, Z;
      n.direction === "vertical" ? (ee < 0 ? V = 360 : ee > b ? V = 0 : (Z = -(ee * 100 / b) + 100, V = 360 * Z / 100), c.value !== V && $(V)) : (Q < 0 ? V = 0 : Q > s ? V = 360 : (Z = Q * 100 / s, V = 360 * Z / 100), c.value !== V && $(V));
    }
    function $(v) {
      l("change", v, v - c.value);
    }
    const m = _e(_);
    function S(v) {
      _(v, !0), window.addEventListener("mousemove", m), window.addEventListener("mouseup", k);
    }
    function k() {
      y();
    }
    function y() {
      window.removeEventListener("mousemove", m), window.removeEventListener("mouseup", k);
    }
    function M(v) {
      v.preventDefault();
      const L = se(v), h = n.direction, s = c.value;
      let b;
      switch (L) {
        case "left": {
          if (h !== "horizontal")
            return;
          b = s - 1 < 0 ? 0 : Math.floor(s - 1);
          break;
        }
        case "right": {
          if (h !== "horizontal")
            return;
          b = s + 1 > 360 ? 360 : Math.ceil(s + 1);
          break;
        }
        case "down": {
          if (h !== "vertical")
            return;
          b = s - 1 < 0 ? 0 : Math.floor(s - 1);
          break;
        }
        case "up": {
          if (h !== "vertical")
            return;
          b = s + 1 > 360 ? 360 : Math.ceil(s + 1);
          break;
        }
      }
      typeof b < "u" && $(b);
    }
    return (v, L) => (w(), C("div", {
      class: o(["vc-hue", f.value, v.$style.wrap])
    }, [
      d("div", {
        class: o(v.$style.container),
        ref: "container",
        onMousedown: S,
        onTouchmove: _,
        onTouchstart: _,
        onKeydown: M,
        role: "slider",
        "aria-valuenow": c.value,
        "aria-valuemin": "0",
        "aria-valuemax": "360",
        "aria-label": "Hue",
        tabindex: "0"
      }, [
        d("div", {
          class: o(v.$style.pointer),
          style: B({ top: p.value, left: u.value }),
          role: "presentation"
        }, [
          d("div", {
            class: o(["vc-hue-picker", v.$style.picker])
          }, null, 2)
        ], 6)
      ], 42, vt)
    ], 2));
  }
}), yt = "_wrap_eyjgx_2", _t = "_horizontal_eyjgx_10", mt = "_vertical_eyjgx_13", wt = "_container_eyjgx_16", Ct = "_pointer_eyjgx_22", $t = "_picker_eyjgx_26", kt = {
  wrap: yt,
  horizontal: _t,
  vertical: mt,
  container: wt,
  pointer: Ct,
  picker: $t
}, Mt = {
  $style: kt
}, ie = /* @__PURE__ */ P(gt, [["__cssModules", Mt]]), At = /* @__PURE__ */ D({
  __name: "CheckerboardBG",
  props: {
    size: { default: 8 },
    white: { default: "#fff" },
    grey: { default: "#e6e6e6" }
  },
  setup(e) {
    const a = e;
    function t(r, i, c) {
      if (typeof document > "u")
        return null;
      var f = document.createElement("canvas");
      f.width = f.height = c * 2;
      var p = f.getContext("2d");
      return p ? (p.fillStyle = r, p.fillRect(0, 0, f.width, f.height), p.fillStyle = i, p.fillRect(0, 0, c, c), p.translate(c, c), p.fillRect(0, 0, c, c), f.toDataURL()) : null;
    }
    function n(r, i, c) {
      return t(r, i, c);
    }
    const l = R(() => `url(${n(a.white, a.grey, a.size)})`);
    return (r, i) => (w(), C("div", {
      class: o([r.$style.checkerboard, "vc-checkerboard"]),
      style: B({ backgroundImage: l.value })
    }, null, 6));
  }
}), Ft = "_checkerboard_zoio7_2", St = {
  checkerboard: Ft
}, Rt = {
  $style: St
}, re = /* @__PURE__ */ P(At, [["__cssModules", Rt]]), Ht = ["aria-valuenow"], xt = /* @__PURE__ */ D({
  __name: "AlphaSlider",
  props: {
    tinyColor: {},
    modelValue: {}
  },
  emits: G,
  setup(e, { emit: a }) {
    const t = e, n = a, { colorRef: l, updateColor: r } = K(t, n), i = R(() => {
      const k = l.value.toRgb(), y = [k.r, k.g, k.b].join(",");
      return "linear-gradient(to right, rgba(" + y + ", 0) 0%, rgba(" + y + ", 1) 100%)";
    }), c = R(() => l.value.getAlpha()), f = ve("container");
    function p(k, y = !1) {
      y || k.preventDefault();
      const M = f.value;
      if (!M)
        return;
      const v = M.clientWidth, { x: L } = ye(M), { x: h } = ge(k), s = h - L;
      let b;
      s < 0 ? b = 0 : s > v ? b = 1 : b = Math.round(s * 100 / v) / 100, c.value !== b && (l.value.setAlpha(b), r(l.value));
    }
    const u = _e(p);
    function _(k) {
      p(k, !0), window.addEventListener("mousemove", u), window.addEventListener("mouseup", $);
    }
    function $() {
      m();
    }
    function m() {
      window.removeEventListener("mousemove", u), window.removeEventListener("mouseup", $);
    }
    function S(k) {
      k.preventDefault();
      const y = se(k), M = c.value;
      let v;
      switch (y) {
        case "left": {
          v = M - 0.1 < 0 ? 0 : M - 0.1;
          break;
        }
        case "right": {
          v = M + 0.1 > 1 ? 1 : M + 0.1;
          break;
        }
      }
      typeof v < "u" && (l.value.setAlpha(v), r(l.value));
    }
    return (k, y) => (w(), C("div", {
      class: o(k.$style.container)
    }, [
      d("div", {
        class: o(k.$style.checkerboard)
      }, [
        F(re)
      ], 2),
      d("div", {
        class: o(["vc-alpha-gradient", k.$style.gradient]),
        style: B({ background: i.value })
      }, null, 6),
      d("div", {
        class: o(k.$style.container),
        ref: "container",
        onMousedown: _,
        onTouchmove: p,
        onTouchstart: p,
        role: "slider",
        "aria-label": "Transparency",
        "aria-valuemax": "1",
        "aria-valuemin": "0",
        "aria-valuenow": c.value.toFixed(1),
        tabindex: "0",
        onKeydown: S
      }, [
        d("div", {
          class: o(k.$style.pointer),
          style: B({ left: c.value * 100 + "%" })
        }, [
          d("div", {
            class: o(["vc-alpha-picker", k.$style.picker])
          }, null, 2)
        ], 6)
      ], 42, Ht)
    ], 2));
  }
}), Lt = "_container_1gpil_2", Tt = "_checkerboard_1gpil_9", Bt = "_gradient_1gpil_17", Dt = "_pointer_1gpil_31", Pt = "_picker_1gpil_35", Et = {
  container: Lt,
  checkerboard: Tt,
  gradient: Bt,
  pointer: Dt,
  picker: Pt
}, It = {
  $style: Et
}, Re = /* @__PURE__ */ P(xt, [["__cssModules", It]]), zt = ["value", "aria-label"], Vt = {
  key: 0,
  class: "vc-input-desc",
  "aria-hidden": "true"
}, Nt = /* @__PURE__ */ D({
  __name: "EditableInput",
  props: {
    value: {},
    label: {},
    desc: {},
    max: {},
    min: {},
    step: { default: 1 },
    a11y: {}
  },
  emits: ["change"],
  setup(e, { emit: a }) {
    var p;
    const t = e, n = a, l = ((p = t.a11y) == null ? void 0 : p.label) ?? t.label, r = `input__label__${l}__${Math.random().toString().slice(2, 5)}`;
    function i(u) {
      if (t.max && +u > t.max) {
        n("change", t.max);
        return;
      }
      if (t.min && +u < t.min) {
        n("change", t.min);
        return;
      }
      n("change", u);
    }
    function c(u) {
      var _;
      i((_ = u.target) == null ? void 0 : _.value);
    }
    function f(u) {
      let _ = Number(t.value);
      if (!isNaN(_)) {
        let $ = t.step;
        const m = ot($), S = se(u);
        S === "up" && (i((_ + $).toFixed(m)), u.preventDefault()), S === "down" && (i((_ - $).toFixed(m)), u.preventDefault());
      }
    }
    return (u, _) => (w(), C("div", {
      class: o(["vc-editable-input", u.$style.wrapper])
    }, [
      d("input", {
        class: o(["vc-input-input", u.$style.input]),
        value: t.value,
        onKeydown: f,
        onInput: c,
        "aria-label": x(l),
        id: r
      }, null, 42, zt),
      d("label", {
        for: r,
        class: o(["vc-input-label", u.$style.label]),
        "aria-hidden": "true"
      }, U(t.label), 3),
      u.desc ? (w(), C("span", Vt, U(u.desc), 1)) : I("", !0)
    ], 2));
  }
}), Wt = "_wrapper_1pdfv_2", Gt = "_input_1pdfv_5", Kt = "_label_1pdfv_10", Ot = {
  wrapper: Wt,
  input: Gt,
  label: Kt
}, Ut = {
  $style: Ot
}, H = /* @__PURE__ */ P(Nt, [["__cssModules", Ut]]), ue = (e, a) => {
  const t = ae(void 0), n = R(() => {
    const { h: r } = e.value.toHsl();
    return r !== 0 ? r : typeof t.value < "u" ? t.value : 0;
  });
  return {
    /** use for Editable Input to change the hue value */
    hueRef: t,
    /** use for the change event of <Hue /> Component */
    setHue: (r, i) => {
      t.value = r, a(e.value.spin(i));
    },
    /**
     * Use for hue value of all color components.
     * This hue value handles the case when the hue value is lost when converting to tinycolor instance
     */
    retainedHueRef: n
  };
}, jt = ["aria-label"], Xt = {
  style: { width: "24px", height: "24px" },
  viewBox: "0 0 24 24"
}, Yt = /* @__PURE__ */ D({
  __name: "ChromePicker",
  props: {
    disableAlpha: { type: Boolean },
    disableFields: { type: Boolean },
    tinyColor: {},
    modelValue: {}
  },
  emits: ["change"].concat(G),
  setup(e, { emit: a }) {
    Le((s) => ({
      "45fa920c": _.value
    }));
    const t = e, n = a, { colorRef: l, updateColor: r } = K(t, n), { hueRef: i, setHue: c, retainedHueRef: f } = ue(l, r), p = ae(0);
    let u = ae(!1);
    const _ = R(() => {
      const s = l.value.toRgb();
      return "rgba(" + [s.r, s.g, s.b, l.value.getAlpha()].join(",") + ")";
    }), $ = R(() => {
      const { h: s, s: b, l: A } = l.value.toHsl();
      return {
        h: s.toFixed(),
        s: `${(b * 100).toFixed()}%`,
        l: `${(A * 100).toFixed()}%`
      };
    }), m = R(() => l.value.toRgb()), S = R(() => l.value.getAlpha()), k = (s, b) => {
      if (!b)
        return;
      const A = g(b, { format: s });
      A.isValid() && (s === "hex" && A.setAlpha(1), r(A));
    }, y = (s, b) => {
      if (!b || isNaN(Number(b)))
        return;
      const A = { [s]: b };
      r(g({
        ...m.value,
        a: S.value,
        ...A
      }));
    }, M = (s, b) => {
      if (!b)
        return;
      const A = { [s]: b };
      (s === "s" || s === "l") && (A[s] = +b.replace("%", "") / 100), s === "h" && (i.value = +b), r(g({
        ...l.value.toHsl(),
        a: S.value,
        ...A
      }));
    }, v = () => {
      if (p.value === 2) {
        p.value = 0;
        return;
      }
      p.value++;
    }, L = () => {
      u.value = !0;
    }, h = () => {
      u.value = !1;
    };
    return (s, b) => (w(), C("div", {
      role: "application",
      "aria-label": "Chrome Color Picker",
      class: o([s.$style.wrapper, s.disableAlpha ? s.$style.disableAlpha : ""])
    }, [
      d("div", {
        class: o(s.$style.saturation)
      }, [
        F(me, {
          tinyColor: x(l),
          "onUpdate:tinyColor": b[0] || (b[0] = (A) => ne(l) ? l.value = A : null),
          hue: x(f)
        }, null, 8, ["tinyColor", "hue"])
      ], 2),
      d("div", {
        class: o(s.$style.body)
      }, [
        d("div", {
          class: o(s.$style.controls)
        }, [
          d("div", {
            class: o(s.$style.colorWrap)
          }, [
            d("div", {
              role: "presentation",
              "aria-live": "polite",
              "aria-label": `Current color is ${x(l).toRgbString()}`,
              class: o(s.$style.activeColor)
            }, null, 10, jt),
            t.disableAlpha ? I("", !0) : (w(), he(re, { key: 0 }))
          ], 2),
          d("div", {
            class: o(s.$style.sliders)
          }, [
            d("div", {
              class: o(s.$style.hueWrap)
            }, [
              F(ie, {
                hue: x(f),
                onChange: x(c)
              }, null, 8, ["hue", "onChange"])
            ], 2),
            t.disableAlpha ? I("", !0) : (w(), C("div", {
              key: 0,
              class: o(s.$style.alphaWrap)
            }, [
              F(Re, {
                tinyColor: x(l),
                "onUpdate:tinyColor": b[1] || (b[1] = (A) => ne(l) ? l.value = A : null)
              }, null, 8, ["tinyColor"])
            ], 2))
          ], 2)
        ], 2),
        s.disableFields ? I("", !0) : (w(), C("div", {
          key: 0,
          class: o(s.$style.fieldsWrap),
          "data-testid": "fields"
        }, [
          X(d("div", {
            class: o(s.$style.fields)
          }, [
            d("div", {
              class: o(s.$style.field)
            }, [
              F(H, {
                label: "r",
                value: m.value.r,
                onChange: b[2] || (b[2] = (A) => y("r", A)),
                a11y: { label: "Red" }
              }, null, 8, ["value"])
            ], 2),
            d("div", {
              class: o(s.$style.field)
            }, [
              F(H, {
                label: "g",
                value: m.value.g,
                onChange: b[3] || (b[3] = (A) => y("g", A)),
                a11y: { label: "Green" }
              }, null, 8, ["value"])
            ], 2),
            d("div", {
              class: o(s.$style.field)
            }, [
              F(H, {
                label: "b",
                value: m.value.b,
                onChange: b[4] || (b[4] = (A) => y("b", A)),
                a11y: { label: "Blue" }
              }, null, 8, ["value"])
            ], 2),
            s.disableAlpha ? I("", !0) : (w(), C("div", {
              key: 0,
              class: o(s.$style.field)
            }, [
              F(H, {
                label: "a",
                value: S.value,
                step: 0.01,
                max: 1,
                onChange: b[5] || (b[5] = (A) => y("a", A)),
                a11y: { label: "Transparency" }
              }, null, 8, ["value"])
            ], 2))
          ], 2), [
            [Y, p.value === 0]
          ]),
          X(d("div", {
            class: o(s.$style.fields)
          }, [
            d("div", {
              class: o(s.$style.field)
            }, [
              S.value === 1 ? (w(), he(H, {
                key: 0,
                label: "hex",
                value: x(l).toHexString(),
                onChange: b[6] || (b[6] = (A) => k("hex", A)),
                a11y: { label: "Hex" }
              }, null, 8, ["value"])) : I("", !0),
              S.value !== 1 ? (w(), he(H, {
                key: 1,
                label: "hex",
                value: x(l).toHex8String(),
                onChange: b[7] || (b[7] = (A) => k("hex8", A)),
                a11y: { label: "Hex with transparency" }
              }, null, 8, ["value"])) : I("", !0)
            ], 2)
          ], 2), [
            [Y, p.value === 1]
          ]),
          X(d("div", {
            class: o(s.$style.fields)
          }, [
            d("div", {
              class: o(s.$style.field)
            }, [
              F(H, {
                label: "h",
                value: x(f).toFixed(),
                onChange: b[8] || (b[8] = (A) => M("h", A)),
                a11y: { label: "Hue" }
              }, null, 8, ["value"])
            ], 2),
            d("div", {
              class: o(s.$style.field)
            }, [
              F(H, {
                label: "s",
                value: $.value.s,
                onChange: b[9] || (b[9] = (A) => M("s", A)),
                a11y: { label: "Saturation" }
              }, null, 8, ["value"])
            ], 2),
            d("div", {
              class: o(s.$style.field)
            }, [
              F(H, {
                label: "l",
                value: $.value.l,
                onChange: b[10] || (b[10] = (A) => M("l", A)),
                a11y: { label: "Lightness" }
              }, null, 8, ["value"])
            ], 2),
            s.disableAlpha ? I("", !0) : (w(), C("div", {
              key: 0,
              class: o(s.$style.field)
            }, [
              F(H, {
                label: "a",
                value: S.value,
                step: 0.01,
                max: 1,
                onChange: b[11] || (b[11] = (A) => M("a", A)),
                a11y: { label: "Transparency" }
              }, null, 8, ["value"])
            ], 2))
          ], 2), [
            [Y, p.value === 2]
          ]),
          d("div", {
            class: o(s.$style.toggleBtn),
            onClick: v,
            onKeydown: [
              z(v, ["enter"]),
              z(v, ["space"])
            ],
            onMouseover: L,
            onMouseenter: L,
            onMouseout: h,
            onFocus: L,
            onBlur: h,
            role: "button",
            "aria-label": "Change color format",
            tabindex: "0"
          }, [
            d("div", {
              class: o(s.$style.toggleIcon),
              role: "presentation"
            }, [
              (w(), C("svg", Xt, b[12] || (b[12] = [
                d("path", {
                  fill: "#333",
                  d: "M12,18.17L8.83,15L7.42,16.41L12,21L16.59,16.41L15.17,15M12,5.83L15.17,9L16.58,7.59L12,3L7.41,7.59L8.83,9L12,5.83Z"
                }, null, -1)
              ])))
            ], 2),
            X(d("div", {
              class: o(s.$style.toggleIconHighlight),
              role: "presentation"
            }, null, 2), [
              [Y, x(u)]
            ])
          ], 34)
        ], 2))
      ], 2)
    ], 2));
  }
}), qt = "_wrapper_1kzz9_2", Zt = "_controls_1kzz9_11", Jt = "_colorWrap_1kzz9_14", Qt = "_activeColor_1kzz9_18", ea = "_sliders_1kzz9_33", ta = "_fieldsWrap_1kzz9_36", aa = "_fields_1kzz9_36", na = "_field_1kzz9_36", la = "_toggleBtn_1kzz9_49", ra = "_toggleIcon_1kzz9_54", oa = "_toggleIconHighlight_1kzz9_61", sa = "_hueWrap_1kzz9_70", ia = "_alphaWrap_1kzz9_75", ua = "_body_1kzz9_93", ca = "_saturation_1kzz9_97", da = "_disableAlpha_1kzz9_129", fa = {
  wrapper: qt,
  controls: Zt,
  colorWrap: Jt,
  activeColor: Qt,
  sliders: ea,
  fieldsWrap: ta,
  fields: aa,
  field: na,
  toggleBtn: la,
  toggleIcon: ra,
  toggleIconHighlight: oa,
  hueWrap: sa,
  alphaWrap: ia,
  body: ua,
  saturation: ca,
  disableAlpha: da
}, ha = {
  $style: fa
}, Zl = /* @__PURE__ */ P(Yt, [["__cssModules", ha]]), ba = ["onClick", "aria-label", "aria-selected", "onKeydown"], pa = [
  "#4D4D4D",
  "#999999",
  "#FFFFFF",
  "#F44E3B",
  "#FE9200",
  "#FCDC00",
  "#DBDF00",
  "#A4DD00",
  "#68CCCA",
  "#73D8FF",
  "#AEA1FF",
  "#FDA1FF",
  "#333333",
  "#808080",
  "#CCCCCC",
  "#D33115",
  "#E27300",
  "#FCC400",
  "#B0BC00",
  "#68BC00",
  "#16A5A5",
  "#009CE0",
  "#7B64FF",
  "#FA28FF",
  "#000000",
  "#666666",
  "#B3B3B3",
  "#9F0500",
  "#C45100",
  "#FB9E00",
  "#808900",
  "#194D33",
  "#0C797D",
  "#0062B1",
  "#653294",
  "#AB149E"
], va = /* @__PURE__ */ D({
  __name: "CompactPicker",
  props: {
    palette: { default: () => pa },
    tinyColor: {},
    modelValue: {}
  },
  emits: ["change"].concat(G),
  setup(e, { emit: a }) {
    const t = e, n = a, { colorRef: l, updateColor: r } = K(t, n), i = R(() => l.value.toHexString().toUpperCase()), c = (f) => {
      r(f);
    };
    return (f, p) => (w(), C("div", {
      class: o(f.$style.wrap),
      role: "application",
      "aria-label": "Compact color picker",
      tabindex: "0"
    }, [
      d("ul", {
        class: o(f.$style.colors),
        role: "listbox",
        "aria-label": "Pick a color"
      }, [
        (w(!0), C(j, null, q(t.palette, (u) => (w(), C("li", {
          key: u,
          class: o({ [f.$style.colorItemWhite]: u === "#FFFFFF", [f.$style.colorItem]: !0 }),
          style: B({ background: u }),
          onClick: (_) => c(u),
          role: "option",
          "aria-label": "color:" + u,
          "aria-selected": u.toUpperCase() === i.value,
          onKeydown: z((_) => c(u), ["space"]),
          tabindex: "0"
        }, [
          X(d("div", {
            class: o(f.$style.dot)
          }, null, 2), [
            [Y, u.toUpperCase() === i.value]
          ])
        ], 46, ba))), 128))
      ], 2)
    ], 2));
  }
}), ga = "_wrap_138d7_2", ya = "_colors_138d7_11", _a = "_colorItem_138d7_16", ma = "_colorItemWhite_138d7_26", wa = "_dot_138d7_29", Ca = {
  wrap: ga,
  colors: ya,
  colorItem: _a,
  colorItemWhite: ma,
  dot: wa
}, $a = {
  $style: Ca
}, Jl = /* @__PURE__ */ P(va, [["__cssModules", $a]]), ka = ["onClick", "aria-label", "aria-selected", "onKeydown"], Ma = [
  "#FFFFFF",
  "#F2F2F2",
  "#E6E6E6",
  "#D9D9D9",
  "#CCCCCC",
  "#BFBFBF",
  "#B3B3B3",
  "#A6A6A6",
  "#999999",
  "#8C8C8C",
  "#808080",
  "#737373",
  "#666666",
  "#595959",
  "#4D4D4D",
  "#404040",
  "#333333",
  "#262626",
  "#0D0D0D",
  "#000000"
], Aa = /* @__PURE__ */ D({
  __name: "GrayscalePicker",
  props: {
    palette: { default: () => Ma },
    tinyColor: {},
    modelValue: {}
  },
  emits: ["change"].concat(G),
  setup(e, { emit: a }) {
    const t = e, n = a, { colorRef: l, updateColor: r } = K(t, n), i = R(() => l.value.toHexString().toUpperCase()), c = (f) => {
      r(f);
    };
    return (f, p) => (w(), C("div", {
      role: "application",
      "aria-label": "Grayscale color picker",
      class: o(f.$style.wrap)
    }, [
      d("ul", {
        class: o(f.$style.colors),
        role: "listbox",
        "aria-label": "Select a grayscale color",
        tabindex: "0"
      }, [
        (w(!0), C(j, null, q(f.palette, (u) => (w(), C("li", {
          key: u,
          class: o({ [f.$style.colorItemWhite]: u === "#FFFFFF", [f.$style.colorItem]: !0 }),
          style: B({ background: u }),
          onClick: (_) => c(u),
          role: "option",
          "aria-label": "color:" + u,
          "aria-selected": u.toUpperCase() === i.value,
          onKeydown: z((_) => c(u), ["space"]),
          tabindex: "0"
        }, [
          X(d("div", {
            class: o(f.$style.dot)
          }, null, 2), [
            [Y, u.toUpperCase() === i.value]
          ])
        ], 46, ka))), 128))
      ], 2)
    ], 2));
  }
}), Fa = "_wrap_138d7_2", Sa = "_colors_138d7_11", Ra = "_colorItem_138d7_16", Ha = "_colorItemWhite_138d7_26", xa = "_dot_138d7_29", La = {
  wrap: Fa,
  colors: Sa,
  colorItem: Ra,
  colorItemWhite: Ha,
  dot: xa
}, Ta = {
  $style: La
}, Ql = /* @__PURE__ */ P(Aa, [["__cssModules", Ta]]), Ba = /* @__PURE__ */ D({
  __name: "MaterialPicker",
  props: {
    tinyColor: {},
    modelValue: {}
  },
  emits: G,
  setup(e, { emit: a }) {
    const t = e, n = a, { colorRef: l, updateColor: r } = K(t, n), i = R(() => l.value.toRgb());
    function c(p) {
      g(p).isValid() && r(p);
    }
    function f(p, u) {
      r({
        ...i.value,
        [p]: u
      });
    }
    return (p, u) => (w(), C("div", {
      role: "application",
      "aria-label": "Material color inputs",
      class: o(p.$style.wrap)
    }, [
      F(H, {
        class: o(p.$style.hex),
        label: "hex",
        value: x(l).toHexString(),
        style: B({ borderColor: x(l).toHexString() }),
        onChange: c,
        a11y: { label: "Hex" }
      }, null, 8, ["class", "value", "style"]),
      d("div", {
        class: o(p.$style.rgb)
      }, [
        d("div", {
          class: o(p.$style.color)
        }, [
          F(H, {
            label: "r",
            value: i.value.r,
            onChange: u[0] || (u[0] = (_) => f("r", _)),
            a11y: { label: "Red" }
          }, null, 8, ["value"])
        ], 2),
        d("div", {
          class: o(p.$style.color)
        }, [
          F(H, {
            label: "g",
            value: i.value.g,
            onChange: u[1] || (u[1] = (_) => f("g", _)),
            a11y: { label: "Green" }
          }, null, 8, ["value"])
        ], 2),
        d("div", {
          class: o(p.$style.color)
        }, [
          F(H, {
            label: "b",
            value: i.value.b,
            onChange: u[2] || (u[2] = (_) => f("b", _)),
            a11y: { label: "Blue" }
          }, null, 8, ["value"])
        ], 2)
      ], 2)
    ], 2));
  }
}), Da = "_wrap_n0n3l_2", Pa = "_hex_n0n3l_29", Ea = "_rgb_n0n3l_33", Ia = "_color_n0n3l_38", za = {
  wrap: Da,
  hex: Pa,
  rgb: Ea,
  color: Ia
}, Va = {
  $style: za
}, er = /* @__PURE__ */ P(Ba, [["__cssModules", Va]]), Na = ["aria-label"], Wa = ["aria-label"], Ga = ["aria-label"], Ka = ["aria-label"], Oa = /* @__PURE__ */ D({
  __name: "PhotoshopPicker",
  props: {
    title: { default: "Color picker" },
    disableFields: { type: Boolean, default: !1 },
    hasResetButton: { type: Boolean, default: !1 },
    okLabel: { default: "OK" },
    cancelLabel: { default: "Cancel" },
    resetLabel: { default: "Reset" },
    newLabel: { default: "new" },
    currentLabel: { default: "current" },
    currentColor: { default: "#fff" },
    tinyColor: {},
    modelValue: {}
  },
  emits: G.concat(["ok", "cancel", "reset"]),
  setup(e, { emit: a }) {
    const t = e, n = a, { colorRef: l, updateColor: r } = K(t, n), { hueRef: i, setHue: c, retainedHueRef: f } = ue(l, r), p = ae(t.currentColor), u = R(() => l.value.toHsv()), _ = R(() => {
      const h = l.value.toHexString();
      return h && h.replace("#", "");
    }), $ = R(() => l.value.toRgb()), m = () => {
      r(p.value);
    }, S = (h) => {
      if (!h)
        return;
      const s = g(h);
      s.isValid() && (s.setAlpha(1), r(s));
    }, k = (h, s) => {
      if (!s || isNaN(Number(s)))
        return;
      const b = { [h]: s };
      r(g({
        ...$.value,
        ...b
      }));
    }, y = (h, s) => {
      if (!s || isNaN(Number(s)))
        return;
      const b = { [h]: Number(s) };
      h === "h" && (i.value = +s), r(g({
        ...u.value,
        ...b
      }));
    }, M = () => {
      n("ok");
    }, v = () => {
      n("cancel");
    }, L = () => {
      n("reset");
    };
    return (h, s) => (w(), C("div", {
      role: "application",
      "aria-label": "PhotoShop color picker",
      class: o([h.$style.wrap, h.disableFields ? h.$style.disableFields : ""])
    }, [
      d("div", {
        class: o(h.$style.title),
        "aria-hidden": "true"
      }, U(h.title), 3),
      d("div", {
        class: o(h.$style.body)
      }, [
        d("div", {
          class: o(h.$style.saturation)
        }, [
          F(me, {
            tinyColor: x(l),
            "onUpdate:tinyColor": s[0] || (s[0] = (b) => ne(l) ? l.value = b : null),
            hue: x(f)
          }, null, 8, ["tinyColor", "hue"])
        ], 2),
        d("div", {
          class: o(h.$style.hue)
        }, [
          F(ie, {
            direction: "vertical",
            hue: x(f),
            onChange: x(c)
          }, {
            default: Te(() => [
              d("div", {
                class: o(h.$style.huePointer)
              }, [
                d("i", {
                  class: o(h.$style.huePointerLeft)
                }, null, 2),
                d("i", {
                  class: o(h.$style.huePointerRight)
                }, null, 2)
              ], 2)
            ]),
            _: 1
          }, 8, ["hue", "onChange"])
        ], 2),
        d("div", {
          class: o([[h.$style.controls], h.disableFields ? h.$style.controlsDisableFields : ""])
        }, [
          d("div", {
            class: o(h.$style.preview)
          }, [
            d("div", {
              class: o(h.$style.previewLabel),
              "aria-hidden": "true"
            }, U(h.newLabel), 3),
            d("div", {
              class: o(h.$style.previewSwatches)
            }, [
              d("div", {
                class: o(h.$style.previewColor),
                "aria-label": `New color is #${_.value}`,
                style: B({ background: `#${_.value}` })
              }, null, 14, Na),
              d("div", {
                class: o(h.$style.previewColor),
                style: B({ background: p.value }),
                onClick: m,
                role: "button",
                "aria-label": `Current color is ${p.value}`,
                onKeydown: z(m, ["space"]),
                tabindex: "0"
              }, null, 46, Wa)
            ], 2),
            d("div", {
              class: o(h.$style.previewLabel),
              "aria-hidden": "true"
            }, U(h.currentLabel), 3)
          ], 2),
          h.disableFields ? I("", !0) : (w(), C("div", {
            key: 0,
            class: o(h.$style.actions)
          }, [
            d("div", {
              class: o(h.$style.actionBtn),
              role: "button",
              "aria-label": "Click to apply new color",
              onClick: M,
              onKeydown: z(m, ["space"]),
              tabindex: "0"
            }, U(h.okLabel), 35),
            d("div", {
              class: o(h.$style.actionBtn),
              role: "button",
              "aria-label": h.cancelLabel,
              onClick: v,
              onKeydown: z(m, ["space"]),
              tabindex: "0"
            }, U(h.cancelLabel), 43, Ga),
            d("div", {
              class: o(h.$style.fields)
            }, [
              F(H, {
                label: "h",
                desc: "°",
                value: u.value.h.toFixed(),
                onChange: s[1] || (s[1] = (b) => y("h", b)),
                a11y: { label: "Hue" }
              }, null, 8, ["value"]),
              F(H, {
                label: "s",
                desc: "%",
                value: (u.value.s * 100).toFixed(),
                min: 0,
                max: 100,
                onChange: s[2] || (s[2] = (b) => y("s", b)),
                a11y: { label: "Saturation" }
              }, null, 8, ["value"]),
              F(H, {
                label: "v",
                desc: "%",
                value: (u.value.v * 100).toFixed(),
                min: 0,
                max: 100,
                onChange: s[3] || (s[3] = (b) => y("v", b)),
                a11y: { label: "Value" }
              }, null, 8, ["value"]),
              d("div", {
                class: o(h.$style.fieldsDivider)
              }, null, 2),
              F(H, {
                label: "r",
                value: $.value.r,
                onChange: s[4] || (s[4] = (b) => k("r", b)),
                a11y: { label: "Red" }
              }, null, 8, ["value"]),
              F(H, {
                label: "g",
                value: $.value.g,
                onChange: s[5] || (s[5] = (b) => k("g", b)),
                a11y: { label: "Green" }
              }, null, 8, ["value"]),
              F(H, {
                label: "b",
                value: $.value.b,
                onChange: s[6] || (s[6] = (b) => k("b", b)),
                a11y: { label: "Blue" }
              }, null, 8, ["value"]),
              d("div", {
                class: o(h.$style.fieldsDivider)
              }, null, 2),
              F(H, {
                label: "#",
                class: o(h.$style.hex),
                value: _.value,
                onChange: S,
                a11y: { label: "Hex" }
              }, null, 8, ["class", "value"])
            ], 2),
            h.hasResetButton ? (w(), C("div", {
              key: 0,
              class: o(h.$style.actionBtn),
              onClick: L,
              role: "button",
              "aria-label": h.resetLabel,
              onKeydown: z(L, ["space"]),
              tabindex: "0"
            }, U(h.resetLabel), 43, Ka)) : I("", !0)
          ], 2))
        ], 2)
      ], 2)
    ], 2));
  }
}), Ua = "_wrap_gkiob_2", ja = "_disableFields_gkiob_10", Xa = "_title_gkiob_13", Ya = "_body_gkiob_24", qa = "_saturation_gkiob_28", Za = "_hue_gkiob_40", Ja = "_huePointer_gkiob_48", Qa = "_huePointerLeft_gkiob_51", en = "_huePointerRight_gkiob_52", tn = "_controls_gkiob_80", an = "_controlsDisableFields_gkiob_85", nn = "_actions_gkiob_89", ln = "_actionBtn_gkiob_93", rn = "_preview_gkiob_106", on = "_previewSwatches_gkiob_109", sn = "_previewColor_gkiob_115", un = "_previewLabel_gkiob_119", cn = "_fields_gkiob_125", dn = "_fieldsDivider_gkiob_159", fn = "_hex_gkiob_163", hn = {
  wrap: Ua,
  disableFields: ja,
  title: Xa,
  body: Ya,
  saturation: qa,
  hue: Za,
  huePointer: Ja,
  huePointerLeft: Qa,
  huePointerRight: en,
  controls: tn,
  controlsDisableFields: an,
  actions: nn,
  actionBtn: ln,
  preview: rn,
  previewSwatches: on,
  previewColor: sn,
  previewLabel: un,
  fields: cn,
  fieldsDivider: dn,
  hex: fn
}, bn = {
  $style: hn
}, tr = /* @__PURE__ */ P(Oa, [["__cssModules", bn]]), pn = ["aria-label"], vn = ["onClick", "aria-label", "aria-selected", "onKeydown"], gn = ["onClick", "aria-selected", "onKeydown"], yn = [
  "#D0021B",
  "#F5A623",
  "#F8E71C",
  "#8B572A",
  "#7ED321",
  "#417505",
  "#BD10E0",
  "#9013FE",
  "#4A90E2",
  "#50E3C2",
  "#B8E986",
  "#000000",
  "#4A4A4A",
  "#9B9B9B",
  "#FFFFFF",
  "rgba(0,0,0,0)"
], _n = /* @__PURE__ */ D({
  __name: "SketchPicker",
  props: {
    presetColors: { default: () => yn },
    disableAlpha: { type: Boolean, default: !1 },
    disableFields: { type: Boolean, default: !1 },
    tinyColor: {},
    modelValue: {}
  },
  emits: ["change"].concat(G),
  setup(e, { emit: a }) {
    const t = e, n = a, { colorRef: l, updateColor: r } = K(t, n), { setHue: i, retainedHueRef: c } = ue(l, r), f = R(() => l.value.getAlpha()), p = R(() => {
      let y;
      return f.value < 1 ? y = l.value.toHex8String() : y = l.value.toHexString(), y.replace("#", "");
    }), u = R(() => l.value.toRgb()), _ = (y) => {
      if (!y)
        return;
      const M = g(y);
      M.isValid() && r(M);
    }, $ = (y, M) => {
      if (!M || isNaN(Number(M)))
        return;
      const v = { [y]: M };
      r(g({
        ...u.value,
        ...v
      }));
    }, m = (y) => {
      !y || isNaN(Number(y)) || r(l.value.setAlpha(y));
    }, S = (y) => {
      r(y);
    }, k = (y) => g(y).getAlpha() === 0;
    return (y, M) => (w(), C("div", {
      role: "application",
      "aria-label": "Sketch color picker",
      class: o([y.$style.wrap, y.disableAlpha ? y.$style.disableAlpha : ""])
    }, [
      d("div", {
        class: o(y.$style.saturation)
      }, [
        F(me, {
          hue: x(c),
          tinyColor: x(l),
          "onUpdate:tinyColor": M[0] || (M[0] = (v) => ne(l) ? l.value = v : null)
        }, null, 8, ["hue", "tinyColor"])
      ], 2),
      d("div", {
        class: o(y.$style.controls)
      }, [
        d("div", {
          class: o(y.$style.sliders)
        }, [
          d("div", {
            class: o(y.$style.hue)
          }, [
            F(ie, {
              hue: x(c),
              onChange: x(i)
            }, null, 8, ["hue", "onChange"])
          ], 2),
          y.disableAlpha ? I("", !0) : (w(), C("div", {
            key: 0,
            class: o(y.$style.alpha)
          }, [
            F(Re, {
              tinyColor: x(l),
              "onUpdate:tinyColor": M[1] || (M[1] = (v) => ne(l) ? l.value = v : null)
            }, null, 8, ["tinyColor"])
          ], 2))
        ], 2),
        d("div", {
          class: o(y.$style.color)
        }, [
          d("div", {
            "aria-label": `Current color is ${x(l).toRgbString()}`,
            class: o(y.$style.activeColor),
            style: B({ background: x(l).toRgbString() })
          }, null, 14, pn),
          F(re)
        ], 2)
      ], 2),
      y.disableFields ? I("", !0) : (w(), C("div", {
        key: 0,
        class: o(y.$style.field)
      }, [
        d("div", {
          class: o(y.$style.fieldDouble)
        }, [
          F(H, {
            label: "hex",
            value: p.value,
            onChange: _,
            a11y: { label: "Hex" }
          }, null, 8, ["value"])
        ], 2),
        d("div", {
          class: o(y.$style.fieldSingle)
        }, [
          F(H, {
            label: "r",
            value: u.value.r,
            onChange: M[2] || (M[2] = (v) => $("r", v)),
            a11y: { label: "Red" }
          }, null, 8, ["value"])
        ], 2),
        d("div", {
          class: o(y.$style.fieldSingle)
        }, [
          F(H, {
            label: "g",
            value: u.value.g,
            onChange: M[3] || (M[3] = (v) => $("g", v)),
            a11y: { label: "Green" }
          }, null, 8, ["value"])
        ], 2),
        d("div", {
          class: o(y.$style.fieldSingle)
        }, [
          F(H, {
            label: "b",
            value: u.value.b,
            onChange: M[4] || (M[4] = (v) => $("b", v)),
            a11y: { label: "Blue" }
          }, null, 8, ["value"])
        ], 2),
        y.disableAlpha ? I("", !0) : (w(), C("div", {
          key: 0,
          class: o(y.$style.fieldSingle)
        }, [
          F(H, {
            label: "a",
            value: f.value,
            step: 0.01,
            max: 1,
            onChange: m,
            a11y: { label: "Transparency" }
          }, null, 8, ["value"])
        ], 2))
      ], 2)),
      d("div", {
        class: o(y.$style.presets),
        role: "listbox",
        "aria-label": "A color preset, pick one to set as current color"
      }, [
        (w(!0), C(j, null, q(t.presetColors, (v) => (w(), C(j, null, [
          k(v) ? (w(), C("div", {
            key: v,
            class: o(y.$style.presetColor),
            onClick: (L) => S(v),
            "aria-label": "Color: transparency",
            "aria-selected": f.value === 0,
            role: "option",
            tabindex: "0",
            onKeydown: z((L) => S(v), ["space"])
          }, [
            F(re)
          ], 42, gn)) : (w(), C("div", {
            class: o(y.$style.presetColor),
            key: v + "-color",
            style: B({ background: v }),
            onClick: (L) => S(v),
            "aria-label": "Color:" + v,
            "aria-selected": `#${p.value.toLowerCase()}` === v.toLowerCase(),
            role: "option",
            tabindex: "0",
            onKeydown: z((L) => S(v), ["space"])
          }, null, 46, vn))
        ], 64))), 256))
      ], 2)
    ], 2));
  }
}), mn = "_wrap_ngtud_2", wn = "_saturation_ngtud_12", Cn = "_controls_ngtud_19", $n = "_sliders_ngtud_23", kn = "_hue_ngtud_33", Mn = "_alpha_ngtud_38", An = "_color_ngtud_45", Fn = "_activeColor_ngtud_54", Sn = "_field_ngtud_69", Rn = "_fieldSingle_ngtud_91", Hn = "_fieldDouble_ngtud_96", xn = "_presets_ngtud_100", Ln = "_presetColor_ngtud_108", Tn = "_disableAlpha_ngtud_126", Bn = {
  wrap: mn,
  saturation: wn,
  controls: Cn,
  sliders: $n,
  "vc-hue": "_vc-hue_ngtud_28",
  "vc-alpha-gradient": "_vc-alpha-gradient_ngtud_29",
  hue: kn,
  alpha: Mn,
  color: An,
  activeColor: Fn,
  field: Sn,
  fieldSingle: Rn,
  fieldDouble: Hn,
  presets: xn,
  presetColor: Ln,
  disableAlpha: Tn
}, Dn = {
  $style: Bn
}, ar = /* @__PURE__ */ P(_n, [["__cssModules", Dn]]), Pn = ["onClick", "aria-label", "onKeydown", "aria-selected"], J = 0.5, En = [
  { s: J, l: 0.8 },
  { s: J, l: 0.65 },
  { s: J, l: 0.5 },
  { s: J, l: 0.35 },
  { s: J, l: 0.2 }
], In = /* @__PURE__ */ D({
  __name: "SliderPicker",
  props: {
    tinyColor: {},
    modelValue: {},
    swatches: { default: () => En }
  },
  emits: G,
  setup(e, { emit: a }) {
    const t = e, n = a, { colorRef: l, updateColor: r } = K(t, n), { setHue: i, retainedHueRef: c } = ue(l, r), f = R(() => l.value.toHsl()), p = R(() => l.value.toHexString()), u = R(() => t.swatches.map((S) => typeof S == "string" ? {
      s: J,
      l: Number(S)
    } : S)), _ = (m) => f.value.l === 1 && m.l === 1 || f.value.l === 0 && m.l === 0 ? !0 : Math.abs(f.value.l - m.l) < 0.01 && Math.abs(f.value.s - m.s) < 0.01, $ = (m) => {
      r({
        h: f.value.h,
        s: m.s,
        l: m.l
      });
    };
    return (m, S) => (w(), C("div", {
      role: "application",
      "aria-label": "Slider color picker",
      class: o(m.$style.wrap)
    }, [
      d("div", {
        class: o(m.$style.hue)
      }, [
        F(ie, {
          hue: x(c),
          onChange: x(i)
        }, null, 8, ["hue", "onChange"])
      ], 2),
      d("div", {
        class: o(m.$style.swatches),
        role: "listbox",
        "aria-label": "Color segments in different shades of one color",
        tabindex: "0"
      }, [
        (w(!0), C(j, null, q(u.value, (k, y) => (w(), C("div", {
          class: o(m.$style.swatch),
          key: y,
          "data-index": "index",
          onClick: (M) => $(k),
          "aria-label": "Color:" + p.value,
          role: "option",
          onKeydown: z((M) => $(k), ["space"]),
          "aria-selected": _(k),
          tabindex: "0"
        }, [
          d("div", {
            class: o({
              [m.$style.swatchPicker]: !0,
              [m.$style.swatchPickerActive]: _(k),
              [m.$style.swatchPickerWhite]: k.l === 1
            }),
            style: B({ background: "hsl(" + f.value.h + ", " + k.s * 100 + "%, " + k.l * 100 + "%)" })
          }, null, 6)
        ], 42, Pn))), 128))
      ], 2)
    ], 2));
  }
}), zn = "_wrap_1el2h_2", Vn = "_hue_1el2h_6", Nn = "_swatches_1el2h_18", Wn = "_swatch_1el2h_18", Gn = "_swatchPicker_1el2h_30", Kn = "_swatchPickerActive_1el2h_43", On = "_swatchPickerWhite_1el2h_47", Un = {
  wrap: zn,
  hue: Vn,
  swatches: Nn,
  swatch: Wn,
  swatchPicker: Gn,
  swatchPickerActive: Kn,
  swatchPickerWhite: On
}, jn = {
  $style: Un
}, nr = /* @__PURE__ */ P(In, [["__cssModules", jn]]);
var Xn = { 50: "#ffebee", 100: "#ffcdd2", 200: "#ef9a9a", 300: "#e57373", 400: "#ef5350", 500: "#f44336", 600: "#e53935", 700: "#d32f2f", 800: "#c62828", 900: "#b71c1c", a100: "#ff8a80", a200: "#ff5252", a400: "#ff1744", a700: "#d50000" }, Yn = { 50: "#fce4ec", 100: "#f8bbd0", 200: "#f48fb1", 300: "#f06292", 400: "#ec407a", 500: "#e91e63", 600: "#d81b60", 700: "#c2185b", 800: "#ad1457", 900: "#880e4f", a100: "#ff80ab", a200: "#ff4081", a400: "#f50057", a700: "#c51162" }, qn = { 50: "#f3e5f5", 100: "#e1bee7", 200: "#ce93d8", 300: "#ba68c8", 400: "#ab47bc", 500: "#9c27b0", 600: "#8e24aa", 700: "#7b1fa2", 800: "#6a1b9a", 900: "#4a148c", a100: "#ea80fc", a200: "#e040fb", a400: "#d500f9", a700: "#aa00ff" }, Zn = { 50: "#ede7f6", 100: "#d1c4e9", 200: "#b39ddb", 300: "#9575cd", 400: "#7e57c2", 500: "#673ab7", 600: "#5e35b1", 700: "#512da8", 800: "#4527a0", 900: "#311b92", a100: "#b388ff", a200: "#7c4dff", a400: "#651fff", a700: "#6200ea" }, Jn = { 50: "#e8eaf6", 100: "#c5cae9", 200: "#9fa8da", 300: "#7986cb", 400: "#5c6bc0", 500: "#3f51b5", 600: "#3949ab", 700: "#303f9f", 800: "#283593", 900: "#1a237e", a100: "#8c9eff", a200: "#536dfe", a400: "#3d5afe", a700: "#304ffe" }, Qn = { 50: "#e3f2fd", 100: "#bbdefb", 200: "#90caf9", 300: "#64b5f6", 400: "#42a5f5", 500: "#2196f3", 600: "#1e88e5", 700: "#1976d2", 800: "#1565c0", 900: "#0d47a1", a100: "#82b1ff", a200: "#448aff", a400: "#2979ff", a700: "#2962ff" }, el = { 50: "#e1f5fe", 100: "#b3e5fc", 200: "#81d4fa", 300: "#4fc3f7", 400: "#29b6f6", 500: "#03a9f4", 600: "#039be5", 700: "#0288d1", 800: "#0277bd", 900: "#01579b", a100: "#80d8ff", a200: "#40c4ff", a400: "#00b0ff", a700: "#0091ea" }, tl = { 50: "#e0f7fa", 100: "#b2ebf2", 200: "#80deea", 300: "#4dd0e1", 400: "#26c6da", 500: "#00bcd4", 600: "#00acc1", 700: "#0097a7", 800: "#00838f", 900: "#006064", a100: "#84ffff", a200: "#18ffff", a400: "#00e5ff", a700: "#00b8d4" }, al = { 50: "#e0f2f1", 100: "#b2dfdb", 200: "#80cbc4", 300: "#4db6ac", 400: "#26a69a", 500: "#009688", 600: "#00897b", 700: "#00796b", 800: "#00695c", 900: "#004d40", a100: "#a7ffeb", a200: "#64ffda", a400: "#1de9b6", a700: "#00bfa5" }, nl = { 50: "#e8f5e9", 100: "#c8e6c9", 200: "#a5d6a7", 300: "#81c784", 400: "#66bb6a", 500: "#4caf50", 600: "#43a047", 700: "#388e3c", 800: "#2e7d32", 900: "#1b5e20", a100: "#b9f6ca", a200: "#69f0ae", a400: "#00e676", a700: "#00c853" }, ll = { 50: "#f1f8e9", 100: "#dcedc8", 200: "#c5e1a5", 300: "#aed581", 400: "#9ccc65", 500: "#8bc34a", 600: "#7cb342", 700: "#689f38", 800: "#558b2f", 900: "#33691e", a100: "#ccff90", a200: "#b2ff59", a400: "#76ff03", a700: "#64dd17" }, rl = { 50: "#f9fbe7", 100: "#f0f4c3", 200: "#e6ee9c", 300: "#dce775", 400: "#d4e157", 500: "#cddc39", 600: "#c0ca33", 700: "#afb42b", 800: "#9e9d24", 900: "#827717", a100: "#f4ff81", a200: "#eeff41", a400: "#c6ff00", a700: "#aeea00" }, ol = { 50: "#fffde7", 100: "#fff9c4", 200: "#fff59d", 300: "#fff176", 400: "#ffee58", 500: "#ffeb3b", 600: "#fdd835", 700: "#fbc02d", 800: "#f9a825", 900: "#f57f17", a100: "#ffff8d", a200: "#ffff00", a400: "#ffea00", a700: "#ffd600" }, sl = { 50: "#fff8e1", 100: "#ffecb3", 200: "#ffe082", 300: "#ffd54f", 400: "#ffca28", 500: "#ffc107", 600: "#ffb300", 700: "#ffa000", 800: "#ff8f00", 900: "#ff6f00", a100: "#ffe57f", a200: "#ffd740", a400: "#ffc400", a700: "#ffab00" }, il = { 50: "#fff3e0", 100: "#ffe0b2", 200: "#ffcc80", 300: "#ffb74d", 400: "#ffa726", 500: "#ff9800", 600: "#fb8c00", 700: "#f57c00", 800: "#ef6c00", 900: "#e65100", a100: "#ffd180", a200: "#ffab40", a400: "#ff9100", a700: "#ff6d00" }, ul = { 50: "#fbe9e7", 100: "#ffccbc", 200: "#ffab91", 300: "#ff8a65", 400: "#ff7043", 500: "#ff5722", 600: "#f4511e", 700: "#e64a19", 800: "#d84315", 900: "#bf360c", a100: "#ff9e80", a200: "#ff6e40", a400: "#ff3d00", a700: "#dd2c00" }, cl = { 50: "#efebe9", 100: "#d7ccc8", 200: "#bcaaa4", 300: "#a1887f", 400: "#8d6e63", 500: "#795548", 600: "#6d4c41", 700: "#5d4037", 800: "#4e342e", 900: "#3e2723" }, dl = { 50: "#fafafa", 100: "#f5f5f5", 200: "#eeeeee", 300: "#e0e0e0", 400: "#bdbdbd", 500: "#9e9e9e", 600: "#757575", 700: "#616161", 800: "#424242", 900: "#212121" }, fl = { 50: "#eceff1", 100: "#cfd8dc", 200: "#b0bec5", 300: "#90a4ae", 400: "#78909c", 500: "#607d8b", 600: "#546e7a", 700: "#455a64", 800: "#37474f", 900: "#263238" }, hl = { primary: "rgba(0, 0, 0, 0.87)", secondary: "rgba(0, 0, 0, 0.54)", disabled: "rgba(0, 0, 0, 0.38)", dividers: "rgba(0, 0, 0, 0.12)" }, bl = { primary: "rgba(255, 255, 255, 1)", secondary: "rgba(255, 255, 255, 0.7)", disabled: "rgba(255, 255, 255, 0.5)", dividers: "rgba(255, 255, 255, 0.12)" }, pl = { active: "rgba(0, 0, 0, 0.54)", inactive: "rgba(0, 0, 0, 0.38)" }, vl = { active: "rgba(255, 255, 255, 1)", inactive: "rgba(255, 255, 255, 0.5)" }, gl = "#ffffff", yl = "#000000";
const _l = {
  red: Xn,
  pink: Yn,
  purple: qn,
  deepPurple: Zn,
  indigo: Jn,
  blue: Qn,
  lightBlue: el,
  cyan: tl,
  teal: al,
  green: nl,
  lightGreen: ll,
  lime: rl,
  yellow: ol,
  amber: sl,
  orange: il,
  deepOrange: ul,
  brown: cl,
  grey: dl,
  blueGrey: fl,
  darkText: hl,
  lightText: bl,
  darkIcons: pl,
  lightIcons: vl,
  white: gl,
  black: yl
}, ml = ["data-pick"], wl = ["data-color", "onClick", "aria-label", "aria-selected", "onKeydown"], Cl = {
  style: { width: "24px", height: "24px" },
  viewBox: "0 0 24 24"
}, $l = [
  "red",
  "pink",
  "purple",
  "deepPurple",
  "indigo",
  "blue",
  "lightBlue",
  "cyan",
  "teal",
  "green",
  "lightGreen",
  "lime",
  "yellow",
  "amber",
  "orange",
  "deepOrange",
  "brown",
  "blueGrey",
  "black"
], kl = ["900", "700", "500", "300", "100"], Ml = /* @__PURE__ */ (() => {
  const e = [];
  return $l.forEach((a) => {
    let t = [];
    a.toLowerCase() === "black" || a.toLowerCase() === "white" ? t = t.concat(["#000000", "#FFFFFF"]) : kl.forEach((n) => {
      const l = _l[a][n];
      t.push(l.toUpperCase());
    }), e.push(t);
  }), e;
})(), Al = /* @__PURE__ */ D({
  __name: "SwatchesPicker",
  props: {
    tinyColor: {},
    modelValue: {},
    palette: { default: () => Ml }
  },
  emits: G,
  setup(e, { emit: a }) {
    const t = e, n = a, { colorRef: l, updateColor: r } = K(t, n), i = R(() => l.value.toHexString()), c = (p) => p.toLowerCase() === i.value.toLowerCase(), f = (p) => {
      r(p);
    };
    return (p, u) => (w(), C("div", {
      role: "application",
      "aria-label": "Swatches color picker",
      class: o(p.$style.wrap),
      "data-pick": i.value
    }, [
      d("div", {
        class: o(p.$style.box),
        role: "listbox",
        "aria-label": "Pick a color",
        tabindex: "0"
      }, [
        (w(!0), C(j, null, q(p.palette, (_, $) => (w(), C("div", {
          class: o(p.$style.colorGroup),
          key: $
        }, [
          (w(!0), C(j, null, q(_, (m) => (w(), C("div", {
            class: o([p.$style.color, { [p.$style.colorWhite]: m === "#FFFFFF" }]),
            key: m,
            "data-color": m,
            style: B({ background: m }),
            onClick: (S) => f(m),
            role: "option",
            "aria-label": "Color:" + m,
            "aria-selected": c(m),
            onKeydown: z((S) => f(m), ["space"]),
            tabindex: "0"
          }, [
            X(d("div", {
              class: o(p.$style.pick)
            }, [
              (w(), C("svg", Cl, u[0] || (u[0] = [
                d("path", { d: "M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" }, null, -1)
              ])))
            ], 2), [
              [Y, c(m)]
            ])
          ], 46, wl))), 128))
        ], 2))), 128))
      ], 2)
    ], 10, ml));
  }
}), Fl = "_wrap_1464v_2", Sl = "_box_1464v_9", Rl = "_colorGroup_1464v_13", Hl = "_color_1464v_13", xl = "_colorWhite_1464v_33", Ll = "_pick_1464v_36", Tl = {
  wrap: Fl,
  box: Sl,
  colorGroup: Rl,
  color: Hl,
  colorWhite: xl,
  pick: Ll
}, Bl = {
  $style: Tl
}, lr = /* @__PURE__ */ P(Al, [["__cssModules", Bl]]), Dl = ["onClick", "aria-label", "aria-selected", "onKeydown"], Pl = [
  "#FF6900",
  "#FCB900",
  "#7BDCB5",
  "#00D084",
  "#8ED1FC",
  "#0693E3",
  "#ABB8C3",
  "#EB144C",
  "#F78DA7",
  "#9900EF"
], El = /* @__PURE__ */ D({
  __name: "TwitterPicker",
  props: {
    tinyColor: {},
    modelValue: {},
    width: { default: 276 },
    presetColors: { default: () => Pl },
    triangle: { default: "top-left" }
  },
  emits: G,
  setup(e, { emit: a }) {
    const t = e, n = a, { colorRef: l, updateColor: r } = K(t, n), i = R(() => l.value.toHexString()), c = (u) => u.toLowerCase() === i.value.toLowerCase(), f = (u) => {
      r(u);
    }, p = (u) => {
      const _ = g(`${u}`);
      _.isValid() && r(_);
    };
    return (u, _) => (w(), C("div", {
      class: o([u.$style.wrap, {
        hideTriangle: t.triangle === "hide",
        topLeftTriangle: t.triangle === "top-left",
        topRightTriangle: t.triangle === "top-right"
      }]),
      style: B({
        width: typeof t.width == "number" ? `${t.width}px` : t.width
      }),
      role: "application",
      "aria-label": "Twitter color picker"
    }, [
      d("div", {
        class: o(u.$style.triangleShadow)
      }, null, 2),
      d("div", {
        class: o(u.$style.triangle)
      }, null, 2),
      d("div", {
        class: o(u.$style.body),
        role: "listbox",
        tabindex: "0",
        "aria-label": "Select a color"
      }, [
        (w(!0), C(j, null, q(u.presetColors, ($, m) => (w(), C("span", {
          key: m,
          class: o(u.$style.swatch),
          style: B({
            background: $,
            boxShadow: `0 0 4px ${c($) ? $ : "transparent"}`
          }),
          onClick: (S) => f($),
          role: "option",
          "aria-label": "color:" + $,
          "aria-selected": c($),
          onKeydown: z((S) => f($), ["space"]),
          tabindex: "0"
        }, null, 46, Dl))), 128)),
        d("div", {
          class: o(u.$style.hash),
          "aria-hidden": "true"
        }, "#", 2),
        F(H, {
          value: i.value.replace("#", ""),
          onChange: p,
          a11y: { label: "Hex" }
        }, null, 8, ["value"]),
        d("div", {
          class: o(u.$style.clear)
        }, null, 2)
      ], 2)
    ], 6));
  }
}), Il = "_wrap_1govw_2", zl = "_triangle_1govw_10", Vl = "_triangleShadow_1govw_19", Nl = "_body_1govw_28", Wl = "_hash_1govw_55", Gl = "_swatch_1govw_67", Kl = "_clear_1govw_78", Ol = "_hideTriangle_1govw_82", Ul = "_topLeftTriangle_1govw_90", jl = "_topRightTriangle_1govw_100", Xl = {
  wrap: Il,
  triangle: zl,
  triangleShadow: Vl,
  body: Nl,
  hash: Wl,
  swatch: Gl,
  clear: Kl,
  hideTriangle: Ol,
  topLeftTriangle: Ul,
  topRightTriangle: jl
}, Yl = {
  $style: Xl
}, rr = /* @__PURE__ */ P(El, [["__cssModules", Yl]]);
export {
  Re as AlphaSlider,
  Zl as ChromePicker,
  Jl as CompactPicker,
  Ql as GrayscalePicker,
  ie as HueSlider,
  er as MaterialPicker,
  tr as PhotoshopPicker,
  ar as SketchPicker,
  nr as SliderPicker,
  lr as SwatchesPicker,
  rr as TwitterPicker
};
