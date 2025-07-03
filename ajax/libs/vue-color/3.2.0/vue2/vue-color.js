import { computed as b, defineComponent as F, ref as P, onUnmounted as te, watch as ke, useCssVars as Se } from "vue";
function K(n) {
  "@babel/helpers - typeof";
  return K = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(a) {
    return typeof a;
  } : function(a) {
    return a && typeof Symbol == "function" && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a;
  }, K(n);
}
var He = /^\s+/, Me = /\s+$/;
function c(n, a) {
  if (n = n || "", a = a || {}, n instanceof c)
    return n;
  if (!(this instanceof c))
    return new c(n, a);
  var e = Ee(n);
  this._originalInput = n, this._r = e.r, this._g = e.g, this._b = e.b, this._a = e.a, this._roundA = Math.round(100 * this._a) / 100, this._format = a.format || e.format, this._gradientType = a.gradientType, this._r < 1 && (this._r = Math.round(this._r)), this._g < 1 && (this._g = Math.round(this._g)), this._b < 1 && (this._b = Math.round(this._b)), this._ok = e.ok;
}
c.prototype = {
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
    var a = this.toRgb(), e, t, r, i, l, s;
    return e = a.r / 255, t = a.g / 255, r = a.b / 255, e <= 0.03928 ? i = e / 12.92 : i = Math.pow((e + 0.055) / 1.055, 2.4), t <= 0.03928 ? l = t / 12.92 : l = Math.pow((t + 0.055) / 1.055, 2.4), r <= 0.03928 ? s = r / 12.92 : s = Math.pow((r + 0.055) / 1.055, 2.4), 0.2126 * i + 0.7152 * l + 0.0722 * s;
  },
  setAlpha: function(a) {
    return this._a = xe(a), this._roundA = Math.round(100 * this._a) / 100, this;
  },
  toHsv: function() {
    var a = ue(this._r, this._g, this._b);
    return {
      h: a.h * 360,
      s: a.s,
      v: a.v,
      a: this._a
    };
  },
  toHsvString: function() {
    var a = ue(this._r, this._g, this._b), e = Math.round(a.h * 360), t = Math.round(a.s * 100), r = Math.round(a.v * 100);
    return this._a == 1 ? "hsv(" + e + ", " + t + "%, " + r + "%)" : "hsva(" + e + ", " + t + "%, " + r + "%, " + this._roundA + ")";
  },
  toHsl: function() {
    var a = ce(this._r, this._g, this._b);
    return {
      h: a.h * 360,
      s: a.s,
      l: a.l,
      a: this._a
    };
  },
  toHslString: function() {
    var a = ce(this._r, this._g, this._b), e = Math.round(a.h * 360), t = Math.round(a.s * 100), r = Math.round(a.l * 100);
    return this._a == 1 ? "hsl(" + e + ", " + t + "%, " + r + "%)" : "hsla(" + e + ", " + t + "%, " + r + "%, " + this._roundA + ")";
  },
  toHex: function(a) {
    return fe(this._r, this._g, this._b, a);
  },
  toHexString: function(a) {
    return "#" + this.toHex(a);
  },
  toHex8: function(a) {
    return De(this._r, this._g, this._b, this._a, a);
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
      r: Math.round(C(this._r, 255) * 100) + "%",
      g: Math.round(C(this._g, 255) * 100) + "%",
      b: Math.round(C(this._b, 255) * 100) + "%",
      a: this._a
    };
  },
  toPercentageRgbString: function() {
    return this._a == 1 ? "rgb(" + Math.round(C(this._r, 255) * 100) + "%, " + Math.round(C(this._g, 255) * 100) + "%, " + Math.round(C(this._b, 255) * 100) + "%)" : "rgba(" + Math.round(C(this._r, 255) * 100) + "%, " + Math.round(C(this._g, 255) * 100) + "%, " + Math.round(C(this._b, 255) * 100) + "%, " + this._roundA + ")";
  },
  toName: function() {
    return this._a === 0 ? "transparent" : this._a < 1 ? !1 : We[fe(this._r, this._g, this._b, !0)] || !1;
  },
  toFilter: function(a) {
    var e = "#" + de(this._r, this._g, this._b, this._a), t = e, r = this._gradientType ? "GradientType = 1, " : "";
    if (a) {
      var i = c(a);
      t = "#" + de(i._r, i._g, i._b, i._a);
    }
    return "progid:DXImageTransform.Microsoft.gradient(" + r + "startColorstr=" + e + ",endColorstr=" + t + ")";
  },
  toString: function(a) {
    var e = !!a;
    a = a || this._format;
    var t = !1, r = this._a < 1 && this._a >= 0, i = !e && r && (a === "hex" || a === "hex6" || a === "hex3" || a === "hex4" || a === "hex8" || a === "name");
    return i ? a === "name" && this._a === 0 ? this.toName() : this.toRgbString() : (a === "rgb" && (t = this.toRgbString()), a === "prgb" && (t = this.toPercentageRgbString()), (a === "hex" || a === "hex6") && (t = this.toHexString()), a === "hex3" && (t = this.toHexString(!0)), a === "hex4" && (t = this.toHex8String(!0)), a === "hex8" && (t = this.toHex8String()), a === "name" && (t = this.toName()), a === "hsl" && (t = this.toHslString()), a === "hsv" && (t = this.toHsvString()), t || this.toHexString());
  },
  clone: function() {
    return c(this.toString());
  },
  _applyModification: function(a, e) {
    var t = a.apply(null, [this].concat([].slice.call(e)));
    return this._r = t._r, this._g = t._g, this._b = t._b, this.setAlpha(t._a), this;
  },
  lighten: function() {
    return this._applyModification(Te, arguments);
  },
  brighten: function() {
    return this._applyModification(Ne, arguments);
  },
  darken: function() {
    return this._applyModification(Oe, arguments);
  },
  desaturate: function() {
    return this._applyModification(Pe, arguments);
  },
  saturate: function() {
    return this._applyModification(Ve, arguments);
  },
  greyscale: function() {
    return this._applyModification($e, arguments);
  },
  spin: function() {
    return this._applyModification(Ge, arguments);
  },
  _applyCombination: function(a, e) {
    return a.apply(null, [this].concat([].slice.call(e)));
  },
  analogous: function() {
    return this._applyCombination(qe, arguments);
  },
  complement: function() {
    return this._applyCombination(Ue, arguments);
  },
  monochromatic: function() {
    return this._applyCombination(Ke, arguments);
  },
  splitcomplement: function() {
    return this._applyCombination(ze, arguments);
  },
  // Disabled until https://github.com/bgrins/TinyColor/issues/254
  // polyad: function (number) {
  //   return this._applyCombination(polyad, [number]);
  // },
  triad: function() {
    return this._applyCombination(he, [3]);
  },
  tetrad: function() {
    return this._applyCombination(he, [4]);
  }
};
c.fromRatio = function(n, a) {
  if (K(n) == "object") {
    var e = {};
    for (var t in n)
      n.hasOwnProperty(t) && (t === "a" ? e[t] = n[t] : e[t] = N(n[t]));
    n = e;
  }
  return c(n, a);
};
function Ee(n) {
  var a = {
    r: 0,
    g: 0,
    b: 0
  }, e = 1, t = null, r = null, i = null, l = !1, s = !1;
  return typeof n == "string" && (n = Ze(n)), K(n) == "object" && (D(n.r) && D(n.g) && D(n.b) ? (a = Le(n.r, n.g, n.b), l = !0, s = String(n.r).substr(-1) === "%" ? "prgb" : "rgb") : D(n.h) && D(n.s) && D(n.v) ? (t = N(n.s), r = N(n.v), a = Ie(n.h, t, r), l = !0, s = "hsv") : D(n.h) && D(n.s) && D(n.l) && (t = N(n.s), i = N(n.l), a = Be(n.h, t, i), l = !0, s = "hsl"), n.hasOwnProperty("a") && (e = n.a)), e = xe(e), {
    ok: l,
    format: n.format || s,
    r: Math.min(255, Math.max(a.r, 0)),
    g: Math.min(255, Math.max(a.g, 0)),
    b: Math.min(255, Math.max(a.b, 0)),
    a: e
  };
}
function Le(n, a, e) {
  return {
    r: C(n, 255) * 255,
    g: C(a, 255) * 255,
    b: C(e, 255) * 255
  };
}
function ce(n, a, e) {
  n = C(n, 255), a = C(a, 255), e = C(e, 255);
  var t = Math.max(n, a, e), r = Math.min(n, a, e), i, l, s = (t + r) / 2;
  if (t == r)
    i = l = 0;
  else {
    var o = t - r;
    switch (l = s > 0.5 ? o / (2 - t - r) : o / (t + r), t) {
      case n:
        i = (a - e) / o + (a < e ? 6 : 0);
        break;
      case a:
        i = (e - n) / o + 2;
        break;
      case e:
        i = (n - a) / o + 4;
        break;
    }
    i /= 6;
  }
  return {
    h: i,
    s: l,
    l: s
  };
}
function Be(n, a, e) {
  var t, r, i;
  n = C(n, 360), a = C(a, 100), e = C(e, 100);
  function l(u, h, d) {
    return d < 0 && (d += 1), d > 1 && (d -= 1), d < 1 / 6 ? u + (h - u) * 6 * d : d < 1 / 2 ? h : d < 2 / 3 ? u + (h - u) * (2 / 3 - d) * 6 : u;
  }
  if (a === 0)
    t = r = i = e;
  else {
    var s = e < 0.5 ? e * (1 + a) : e + a - e * a, o = 2 * e - s;
    t = l(o, s, n + 1 / 3), r = l(o, s, n), i = l(o, s, n - 1 / 3);
  }
  return {
    r: t * 255,
    g: r * 255,
    b: i * 255
  };
}
function ue(n, a, e) {
  n = C(n, 255), a = C(a, 255), e = C(e, 255);
  var t = Math.max(n, a, e), r = Math.min(n, a, e), i, l, s = t, o = t - r;
  if (l = t === 0 ? 0 : o / t, t == r)
    i = 0;
  else {
    switch (t) {
      case n:
        i = (a - e) / o + (a < e ? 6 : 0);
        break;
      case a:
        i = (e - n) / o + 2;
        break;
      case e:
        i = (n - a) / o + 4;
        break;
    }
    i /= 6;
  }
  return {
    h: i,
    s: l,
    v: s
  };
}
function Ie(n, a, e) {
  n = C(n, 360) * 6, a = C(a, 100), e = C(e, 100);
  var t = Math.floor(n), r = n - t, i = e * (1 - a), l = e * (1 - r * a), s = e * (1 - (1 - r) * a), o = t % 6, u = [e, l, i, i, s, e][o], h = [s, e, e, l, i, i][o], d = [i, i, s, e, e, l][o];
  return {
    r: u * 255,
    g: h * 255,
    b: d * 255
  };
}
function fe(n, a, e, t) {
  var r = [E(Math.round(n).toString(16)), E(Math.round(a).toString(16)), E(Math.round(e).toString(16))];
  return t && r[0].charAt(0) == r[0].charAt(1) && r[1].charAt(0) == r[1].charAt(1) && r[2].charAt(0) == r[2].charAt(1) ? r[0].charAt(0) + r[1].charAt(0) + r[2].charAt(0) : r.join("");
}
function De(n, a, e, t, r) {
  var i = [E(Math.round(n).toString(16)), E(Math.round(a).toString(16)), E(Math.round(e).toString(16)), E(we(t))];
  return r && i[0].charAt(0) == i[0].charAt(1) && i[1].charAt(0) == i[1].charAt(1) && i[2].charAt(0) == i[2].charAt(1) && i[3].charAt(0) == i[3].charAt(1) ? i[0].charAt(0) + i[1].charAt(0) + i[2].charAt(0) + i[3].charAt(0) : i.join("");
}
function de(n, a, e, t) {
  var r = [E(we(t)), E(Math.round(n).toString(16)), E(Math.round(a).toString(16)), E(Math.round(e).toString(16))];
  return r.join("");
}
c.equals = function(n, a) {
  return !n || !a ? !1 : c(n).toRgbString() == c(a).toRgbString();
};
c.random = function() {
  return c.fromRatio({
    r: Math.random(),
    g: Math.random(),
    b: Math.random()
  });
};
function Pe(n, a) {
  a = a === 0 ? 0 : a || 10;
  var e = c(n).toHsl();
  return e.s -= a / 100, e.s = W(e.s), c(e);
}
function Ve(n, a) {
  a = a === 0 ? 0 : a || 10;
  var e = c(n).toHsl();
  return e.s += a / 100, e.s = W(e.s), c(e);
}
function $e(n) {
  return c(n).desaturate(100);
}
function Te(n, a) {
  a = a === 0 ? 0 : a || 10;
  var e = c(n).toHsl();
  return e.l += a / 100, e.l = W(e.l), c(e);
}
function Ne(n, a) {
  a = a === 0 ? 0 : a || 10;
  var e = c(n).toRgb();
  return e.r = Math.max(0, Math.min(255, e.r - Math.round(255 * -(a / 100)))), e.g = Math.max(0, Math.min(255, e.g - Math.round(255 * -(a / 100)))), e.b = Math.max(0, Math.min(255, e.b - Math.round(255 * -(a / 100)))), c(e);
}
function Oe(n, a) {
  a = a === 0 ? 0 : a || 10;
  var e = c(n).toHsl();
  return e.l -= a / 100, e.l = W(e.l), c(e);
}
function Ge(n, a) {
  var e = c(n).toHsl(), t = (e.h + a) % 360;
  return e.h = t < 0 ? 360 + t : t, c(e);
}
function Ue(n) {
  var a = c(n).toHsl();
  return a.h = (a.h + 180) % 360, c(a);
}
function he(n, a) {
  if (isNaN(a) || a <= 0)
    throw new Error("Argument to polyad must be a positive number");
  for (var e = c(n).toHsl(), t = [c(n)], r = 360 / a, i = 1; i < a; i++)
    t.push(c({
      h: (e.h + i * r) % 360,
      s: e.s,
      l: e.l
    }));
  return t;
}
function ze(n) {
  var a = c(n).toHsl(), e = a.h;
  return [c(n), c({
    h: (e + 72) % 360,
    s: a.s,
    l: a.l
  }), c({
    h: (e + 216) % 360,
    s: a.s,
    l: a.l
  })];
}
function qe(n, a, e) {
  a = a || 6, e = e || 30;
  var t = c(n).toHsl(), r = 360 / e, i = [c(n)];
  for (t.h = (t.h - (r * a >> 1) + 720) % 360; --a; )
    t.h = (t.h + r) % 360, i.push(c(t));
  return i;
}
function Ke(n, a) {
  a = a || 6;
  for (var e = c(n).toHsv(), t = e.h, r = e.s, i = e.v, l = [], s = 1 / a; a--; )
    l.push(c({
      h: t,
      s: r,
      v: i
    })), i = (i + s) % 1;
  return l;
}
c.mix = function(n, a, e) {
  e = e === 0 ? 0 : e || 50;
  var t = c(n).toRgb(), r = c(a).toRgb(), i = e / 100, l = {
    r: (r.r - t.r) * i + t.r,
    g: (r.g - t.g) * i + t.g,
    b: (r.b - t.b) * i + t.b,
    a: (r.a - t.a) * i + t.a
  };
  return c(l);
};
c.readability = function(n, a) {
  var e = c(n), t = c(a);
  return (Math.max(e.getLuminance(), t.getLuminance()) + 0.05) / (Math.min(e.getLuminance(), t.getLuminance()) + 0.05);
};
c.isReadable = function(n, a, e) {
  var t = c.readability(n, a), r, i;
  switch (i = !1, r = Je(e), r.level + r.size) {
    case "AAsmall":
    case "AAAlarge":
      i = t >= 4.5;
      break;
    case "AAlarge":
      i = t >= 3;
      break;
    case "AAAsmall":
      i = t >= 7;
      break;
  }
  return i;
};
c.mostReadable = function(n, a, e) {
  var t = null, r = 0, i, l, s, o;
  e = e || {}, l = e.includeFallbackColors, s = e.level, o = e.size;
  for (var u = 0; u < a.length; u++)
    i = c.readability(n, a[u]), i > r && (r = i, t = c(a[u]));
  return c.isReadable(n, t, {
    level: s,
    size: o
  }) || !l ? t : (e.includeFallbackColors = !1, c.mostReadable(n, ["#fff", "#000"], e));
};
var ee = c.names = {
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
}, We = c.hexNames = Xe(ee);
function Xe(n) {
  var a = {};
  for (var e in n)
    n.hasOwnProperty(e) && (a[n[e]] = e);
  return a;
}
function xe(n) {
  return n = parseFloat(n), (isNaN(n) || n < 0 || n > 1) && (n = 1), n;
}
function C(n, a) {
  je(n) && (n = "100%");
  var e = Ye(n);
  return n = Math.min(a, Math.max(0, parseFloat(n))), e && (n = parseInt(n * a, 10) / 100), Math.abs(n - a) < 1e-6 ? 1 : n % a / parseFloat(a);
}
function W(n) {
  return Math.min(1, Math.max(0, n));
}
function H(n) {
  return parseInt(n, 16);
}
function je(n) {
  return typeof n == "string" && n.indexOf(".") != -1 && parseFloat(n) === 1;
}
function Ye(n) {
  return typeof n == "string" && n.indexOf("%") != -1;
}
function E(n) {
  return n.length == 1 ? "0" + n : "" + n;
}
function N(n) {
  return n <= 1 && (n = n * 100 + "%"), n;
}
function we(n) {
  return Math.round(parseFloat(n) * 255).toString(16);
}
function pe(n) {
  return H(n) / 255;
}
var M = function() {
  var n = "[-\\+]?\\d+%?", a = "[-\\+]?\\d*\\.\\d+%?", e = "(?:" + a + ")|(?:" + n + ")", t = "[\\s|\\(]+(" + e + ")[,|\\s]+(" + e + ")[,|\\s]+(" + e + ")\\s*\\)?", r = "[\\s|\\(]+(" + e + ")[,|\\s]+(" + e + ")[,|\\s]+(" + e + ")[,|\\s]+(" + e + ")\\s*\\)?";
  return {
    CSS_UNIT: new RegExp(e),
    rgb: new RegExp("rgb" + t),
    rgba: new RegExp("rgba" + r),
    hsl: new RegExp("hsl" + t),
    hsla: new RegExp("hsla" + r),
    hsv: new RegExp("hsv" + t),
    hsva: new RegExp("hsva" + r),
    hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
    hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
  };
}();
function D(n) {
  return !!M.CSS_UNIT.exec(n);
}
function Ze(n) {
  n = n.replace(He, "").replace(Me, "").toLowerCase();
  var a = !1;
  if (ee[n])
    n = ee[n], a = !0;
  else if (n == "transparent")
    return {
      r: 0,
      g: 0,
      b: 0,
      a: 0,
      format: "name"
    };
  var e;
  return (e = M.rgb.exec(n)) ? {
    r: e[1],
    g: e[2],
    b: e[3]
  } : (e = M.rgba.exec(n)) ? {
    r: e[1],
    g: e[2],
    b: e[3],
    a: e[4]
  } : (e = M.hsl.exec(n)) ? {
    h: e[1],
    s: e[2],
    l: e[3]
  } : (e = M.hsla.exec(n)) ? {
    h: e[1],
    s: e[2],
    l: e[3],
    a: e[4]
  } : (e = M.hsv.exec(n)) ? {
    h: e[1],
    s: e[2],
    v: e[3]
  } : (e = M.hsva.exec(n)) ? {
    h: e[1],
    s: e[2],
    v: e[3],
    a: e[4]
  } : (e = M.hex8.exec(n)) ? {
    r: H(e[1]),
    g: H(e[2]),
    b: H(e[3]),
    a: pe(e[4]),
    format: a ? "name" : "hex8"
  } : (e = M.hex6.exec(n)) ? {
    r: H(e[1]),
    g: H(e[2]),
    b: H(e[3]),
    format: a ? "name" : "hex"
  } : (e = M.hex4.exec(n)) ? {
    r: H(e[1] + "" + e[1]),
    g: H(e[2] + "" + e[2]),
    b: H(e[3] + "" + e[3]),
    a: pe(e[4] + "" + e[4]),
    format: a ? "name" : "hex8"
  } : (e = M.hex3.exec(n)) ? {
    r: H(e[1] + "" + e[1]),
    g: H(e[2] + "" + e[2]),
    b: H(e[3] + "" + e[3]),
    format: a ? "name" : "hex"
  } : !1;
}
function Je(n) {
  var a, e;
  return n = n || {
    level: "AA",
    size: "small"
  }, a = (n.level || "AA").toUpperCase(), e = (n.size || "small").toLowerCase(), a !== "AA" && a !== "AAA" && (a = "AA"), e !== "small" && e !== "large" && (e = "small"), {
    level: a,
    size: e
  };
}
const ve = (n, a, e = !1) => {
  if (e)
    switch (a) {
      case "rgb":
        return n.toRgb();
      case "prgb":
        return n.toPercentageRgb();
      case "hsl":
        return n.toHsl();
      case "hsv":
        return n.toHsv();
      default:
        return null;
    }
  else {
    let t = a;
    a === "hex" && n.getAlpha() < 1 && (t = "hex8");
    let r = n.toString(t);
    try {
      r = JSON.parse(r);
    } catch {
    }
    return r;
  }
}, J = (n, a) => !!(Object.prototype.hasOwnProperty.call(n, a) && typeof n[a] < "u"), q = (n) => typeof n > "u", L = ["update:tinyColor", "update:modelValue", "input"];
function B(n, a, e) {
  let t, r;
  const i = b({
    get: () => {
      const { modelValue: s, tinyColor: o, value: u } = n, h = o ?? s ?? u;
      return q(r) && (q(u) || (r = c(u).getFormat()), q(s) || (r = c(s).getFormat())), q(t) && (typeof u == "object" && !(u instanceof c) && (t = !0), typeof s == "object" && (t = !0)), c(h);
    },
    set: (s) => {
      l(s);
    }
  }), l = (s) => {
    const o = c(s);
    if (J(n, "tinyColor") && a("update:tinyColor", o), J(n, "modelValue")) {
      const u = ve(o, r, t);
      a("update:modelValue", u);
    }
    if (J(n, "value")) {
      const u = ve(o, r, t);
      a("input", u);
    }
  };
  return i;
}
const ae = (n) => {
  var e, t, r, i;
  const a = { x: 0, y: 0 };
  return n instanceof MouseEvent && (a.x = n.pageX, a.y = n.pageY), typeof TouchEvent < "u" && n instanceof TouchEvent && (a.x = (e = n.touches) != null && e[0] ? n.touches[0].pageX : (t = n.changedTouches) != null && t[0] ? n.changedTouches[0].pageX : 0, a.y = (r = n.touches) != null && r[0] ? n.touches[0].pageY : (i = n.changedTouches) != null && i[0] ? n.changedTouches[0].pageY : 0), a;
}, Qe = () => {
  const n = window.scrollX || window.pageXOffset || document.documentElement.scrollLeft || 0, a = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
  return { x: n, y: a };
}, ne = (n) => {
  const { x: a, y: e } = Qe(), t = n.getBoundingClientRect();
  return {
    x: t.left + a,
    y: t.top + e
  };
}, X = (n) => n.code === "ArrowUp" || n.keyCode === 38 ? "up" : n.code === "ArrowDown" || n.keyCode === 40 ? "down" : n.code === "ArrowLeft" || n.keyCode === 37 ? "left" : n.code === "ArrowRight" || n.keyCode === 39 ? "right" : null;
function et(n) {
  const a = n.toString();
  return a.indexOf(".") !== -1 ? a.split(".")[1].length : 0;
}
function Q(n, a, e) {
  return Math.min(Math.max(n, a), e);
}
const re = (n, a = 20) => {
  let e, t, r;
  return (...i) => {
    e ? (clearTimeout(t), t = setTimeout(() => {
      Date.now() - r >= a && (n(...i), r = Date.now());
    }, Math.max(a - (Date.now() - r), 0))) : (n(...i), r = Date.now(), e = !0);
  };
}, tt = /* @__PURE__ */ F({
  __name: "SaturationSlider",
  props: {
    hue: null,
    tinyColor: null,
    modelValue: null,
    value: null
  },
  emits: ["change"].concat(L),
  setup(n, { emit: a }) {
    const e = n, t = P(0), r = B(e, a), i = b(() => r.value.toHsv()), l = b(() => e.hue ?? i.value.h), s = b(() => `hsl(${l.value}, 100%, 50%)`), o = b(() => -(i.value.v * 100) + 1 + 100 + "%"), u = b(() => i.value.v <= 0.01 ? t.value * 100 + "%" : i.value.s * 100 + "%"), h = P(null);
    function d(v) {
      const m = h.value;
      if (!m)
        return;
      const A = m.clientWidth, $ = m.clientHeight, { x: z, y: g } = ne(m), { x: w, y: x } = ae(v), I = Q(w - z, 0, A), T = Q(x - g, 0, $), oe = I / A, Fe = Q(1 - T / $, 0, 1);
      t.value = oe;
      let Y = Math.round(oe * 100), Z = Math.round(Fe * 100);
      Y === 1 && (Y = 0.01), Z === 1 && (Z = 0.01), _({
        h: l.value,
        s: Y,
        v: Z,
        a: i.value.a
      });
    }
    function _(v) {
      r.value = v;
    }
    const f = re(d, 20);
    function R(v) {
      v.type.startsWith("mouse") ? (window.addEventListener("mousemove", f), window.addEventListener("mouseup", f), window.addEventListener("mouseup", p)) : v.type.startsWith("touch") && (window.addEventListener("touchmove", f), window.addEventListener("touchend", f), window.addEventListener("touchend", p));
    }
    function p() {
      k();
    }
    function k() {
      window.removeEventListener("mousemove", f), window.removeEventListener("mouseup", f), window.removeEventListener("mouseup", p), window.removeEventListener("touchmove", f), window.removeEventListener("touchend", f), window.removeEventListener("touchend", p);
    }
    function y(v) {
      switch (v.preventDefault(), X(v)) {
        case "left": {
          const A = i.value.s - 0.01;
          _({
            ...i.value,
            s: A >= 0 ? A : 0
          });
          break;
        }
        case "right": {
          const A = i.value.s + 0.01;
          _({
            ...i.value,
            s: A > 1 ? 1 : A
          });
          break;
        }
        case "up": {
          const A = i.value.v + 0.01;
          _({
            ...i.value,
            v: A > 1 ? 1 : A
          });
          break;
        }
        case "down": {
          const A = i.value.v - 0.01;
          _({
            ...i.value,
            v: A < 0 ? 0 : A
          });
          break;
        }
      }
    }
    return te(() => {
      k();
    }), { __sfc: !0, emit: a, props: e, pointerLeftRef: t, tinyColorRef: r, hsv: i, hue: l, bgColor: s, pointerTop: o, pointerLeft: u, containerRef: h, handleChange: d, onChange: _, throttledHandleChange: f, handleMouseDown: R, handleMouseUp: p, unbindEventListeners: k, handleKeyDown: y };
  }
});
function S(n, a, e, t, r, i, l, s) {
  var o = typeof n == "function" ? n.options : n;
  return a && (o.render = a, o.staticRenderFns = e, o._compiled = !0), i && (o._scopeId = "data-v-" + i), {
    exports: n,
    options: o
  };
}
var at = function() {
  var a = this, e = a._self._c, t = a._self._setupProxy;
  return e("div", { ref: "containerRef", staticClass: "vc-saturation-slider bg", style: { background: t.bgColor }, attrs: { role: "application", "aria-label": "Saturation and brightness picker" }, on: { mousedown: t.handleMouseDown, touchstart: t.handleMouseDown } }, [e("div", { staticClass: "bg white" }), e("div", { staticClass: "bg black" }), e("div", { staticClass: "picker-wrap", style: { top: t.pointerTop, left: t.pointerLeft }, attrs: { role: "slider", tabindex: "0", "aria-valuemin": "0", "aria-valuemax": "1", "aria-label": "press arrow to change saturation or brightness", "aria-valuenow": "?", "aria-valuetext": `saturation: ${t.hsv.s.toFixed(0)}%, brightness: ${t.hsv.v.toFixed(0)}%` }, on: { keydown: t.handleKeyDown } }, [e("div", { staticClass: "picker" })])]);
}, nt = [], rt = /* @__PURE__ */ S(
  tt,
  at,
  nt,
  !1,
  null,
  "31d57162"
);
const ie = rt.exports, it = /* @__PURE__ */ F({
  __name: "HueSlider",
  props: {
    direction: { default: "horizontal" },
    modelValue: { default: 0 }
  },
  emits: ["update:modelValue"],
  setup(n, { emit: a }) {
    const e = n, t = b(() => {
      const p = Number(e.modelValue);
      return Number.isNaN(p) ? 0 : p;
    }), r = P(), i = P(null);
    ke(t, (p, k) => {
      p !== 0 && p - k > 0 && (r.value = "right"), p !== 0 && p - k < 0 && (r.value = "left");
    });
    const l = b(() => e.direction === "vertical" ? t.value === 0 && r.value === "right" ? 0 : -(t.value * 100 / 360) + 100 + "%" : 0), s = b(() => e.direction === "vertical" ? 0 : t.value === 0 && r.value === "right" ? "100%" : t.value * 100 / 360 + "%");
    function o(p) {
      const k = i.value;
      if (!k)
        return;
      const y = k.clientWidth, v = k.clientHeight, { x: m, y: A } = ne(k), { x: $, y: z } = ae(p), g = $ - m, w = z - A;
      let x, I;
      e.direction === "vertical" ? (w < 0 ? x = 360 : w > v ? x = 0 : (I = -(w * 100 / v) + 100, x = Math.round(360 * I / 100)), t.value !== x && u(x)) : (g < 0 ? x = 0 : g > y ? x = 360 : (I = g * 100 / y, x = Math.round(360 * I / 100)), t.value !== x && u(x));
    }
    function u(p) {
      a("update:modelValue", p);
    }
    const h = re(o);
    function d(p) {
      o(p), p.type.startsWith("mouse") ? (window.addEventListener("mousemove", h), window.addEventListener("mouseup", _)) : (window.addEventListener("touchmove", h), window.addEventListener("touchend", _));
    }
    function _() {
      f();
    }
    function f() {
      window.removeEventListener("mousemove", h), window.removeEventListener("mouseup", _), window.removeEventListener("touchmove", h), window.removeEventListener("touchend", _);
    }
    function R(p) {
      p.preventDefault();
      const k = X(p), y = e.direction, v = t.value;
      let m;
      switch (k) {
        case "left": {
          if (y !== "horizontal")
            return;
          m = v - 1 < 0 ? 0 : Math.floor(v - 1);
          break;
        }
        case "right": {
          if (y !== "horizontal")
            return;
          m = v + 1 > 360 ? 360 : Math.ceil(v + 1);
          break;
        }
        case "down": {
          if (y !== "vertical")
            return;
          m = v - 1 < 0 ? 0 : Math.floor(v - 1);
          break;
        }
        case "up": {
          if (y !== "vertical")
            return;
          m = v + 1 > 360 ? 360 : Math.ceil(v + 1);
          break;
        }
      }
      typeof m < "u" && u(m);
    }
    return te(() => {
      f();
    }), { __sfc: !0, props: e, emit: a, hue: t, pullDirection: r, containerRef: i, pointerTop: l, pointerLeft: s, handleChange: o, emitChange: u, throttledHandleChange: h, handleMouseDown: d, handleMouseUp: _, unbindEventListeners: f, handleKeyDown: R };
  }
});
var lt = function() {
  var a = this, e = a._self._c, t = a._self._setupProxy;
  return e("div", { staticClass: "vc-hue-slider" }, [e("div", { ref: "containerRef", class: {
    container: !0,
    horizontal: t.props.direction === "horizontal",
    vertical: t.props.direction === "vertical"
  }, attrs: { role: "slider", "aria-valuenow": t.hue, "aria-valuemin": "0", "aria-valuemax": "360", "aria-label": "Hue", tabindex: "0" }, on: { mousedown: t.handleMouseDown, touchstart: t.handleMouseDown, keydown: t.handleKeyDown } }, [e("div", { staticClass: "picker-wrap", style: { top: t.pointerTop, left: t.pointerLeft }, attrs: { role: "presentation" } }, [a._t("default", function() {
    return [e("div", { staticClass: "picker" })];
  })], 2)])]);
}, st = [], ot = /* @__PURE__ */ S(
  it,
  lt,
  st,
  !1,
  null,
  "342ba320"
);
const O = ot.exports, ct = /* @__PURE__ */ F({
  __name: "CheckerboardBG",
  props: {
    size: { default: 8 },
    white: { default: "#fff" },
    grey: { default: "#e6e6e6" }
  },
  setup(n) {
    const a = n;
    function e(i, l, s) {
      if (typeof document > "u")
        return null;
      var o = document.createElement("canvas");
      o.width = o.height = s * 2;
      var u = o.getContext("2d");
      return u ? (u.fillStyle = i, u.fillRect(0, 0, o.width, o.height), u.fillStyle = l, u.fillRect(0, 0, s, s), u.translate(s, s), u.fillRect(0, 0, s, s), o.toDataURL()) : null;
    }
    function t(i, l, s) {
      return e(i, l, s);
    }
    const r = b(() => `url(${t(a.white, a.grey, a.size)})`);
    return { __sfc: !0, props: a, renderCheckerboard: e, getCheckerboard: t, backgroundImage: r };
  }
});
var ut = function() {
  var a = this, e = a._self._c, t = a._self._setupProxy;
  return e("div", { staticClass: "vc-checkerboard", style: { backgroundImage: t.backgroundImage } });
}, ft = [], dt = /* @__PURE__ */ S(
  ct,
  ut,
  ft,
  !1,
  null,
  "9ab5bcdd"
);
const le = dt.exports, ht = /* @__PURE__ */ F({
  __name: "AlphaSlider",
  props: {
    tinyColor: null,
    modelValue: null,
    value: null
  },
  emits: L,
  setup(n, { emit: a }) {
    const e = n, t = B(e, a), r = b(() => {
      const f = t.value.toRgb(), R = [f.r, f.g, f.b].join(",");
      return "linear-gradient(to right, rgba(" + R + ", 0) 0%, rgba(" + R + ", 1) 100%)";
    }), i = b(() => t.value.getAlpha()), l = P(null);
    function s(f) {
      const R = l.value;
      if (!R)
        return;
      const p = R.clientWidth, { x: k } = ne(R), { x: y } = ae(f), v = y - k;
      let m;
      v < 0 ? m = 0 : v > p ? m = 1 : m = Math.round(v * 100 / p) / 100, i.value !== m && (t.value = t.value.setAlpha(m).clone());
    }
    const o = re(s);
    function u(f) {
      s(f), f.type.startsWith("mouse") ? (window.addEventListener("mousemove", o), window.addEventListener("mouseup", h)) : (window.addEventListener("touchmove", o), window.addEventListener("touchend", h));
    }
    function h() {
      d();
    }
    function d() {
      window.removeEventListener("mousemove", o), window.removeEventListener("mouseup", h), window.removeEventListener("touchmove", o), window.removeEventListener("touchend", h);
    }
    function _(f) {
      f.preventDefault();
      const R = X(f), p = i.value;
      let k;
      switch (R) {
        case "left": {
          k = p - 0.1 < 0 ? 0 : p - 0.1;
          break;
        }
        case "right": {
          k = p + 0.1 > 1 ? 1 : p + 0.1;
          break;
        }
      }
      typeof k < "u" && (t.value = t.value.setAlpha(k).clone());
    }
    return te(() => {
      d();
    }), { __sfc: !0, props: e, emit: a, colorRef: t, gradientColor: r, alpha: i, containerRef: l, handleChange: s, throttledHandleChange: o, handleMouseDown: u, handleMouseUp: h, unbindEventListeners: d, handleKeydown: _, Checkerboard: le };
  }
});
var pt = function() {
  var a = this, e = a._self._c, t = a._self._setupProxy;
  return e("div", { staticClass: "vc-alpha-slider" }, [e("div", { staticClass: "checkerboard" }, [e(t.Checkerboard)], 1), e("div", { staticClass: "gradient", style: { background: t.gradientColor } }), e("div", { ref: "containerRef", staticClass: "slider", attrs: { role: "slider", "aria-label": "Transparency", "aria-valuemax": "1", "aria-valuemin": "0", "aria-valuenow": t.alpha.toFixed(1), tabindex: "0" }, on: { mousedown: t.handleMouseDown, touchstart: t.handleMouseDown, keydown: t.handleKeydown } }, [e("div", { staticClass: "picker-wrap", style: { left: t.alpha * 100 + "%" } }, [e("div", { staticClass: "picker" })])])]);
}, vt = [], bt = /* @__PURE__ */ S(
  ht,
  pt,
  vt,
  !1,
  null,
  "bb3b30f3"
);
const se = bt.exports, gt = /* @__PURE__ */ F({
  __name: "EditableInput",
  props: {
    value: null,
    label: null,
    desc: null,
    max: null,
    min: null,
    step: { default: 1 },
    a11y: null
  },
  emits: ["change"],
  setup(n, { emit: a }) {
    var o;
    const e = n, t = ((o = e.a11y) == null ? void 0 : o.label) ?? e.label, r = `input__label__${t}__${Math.random().toString().slice(2, 5)}`;
    function i(u) {
      if (e.max && +u > e.max) {
        a("change", e.max);
        return;
      }
      if (e.min && +u < e.min) {
        a("change", e.min);
        return;
      }
      a("change", u);
    }
    function l(u) {
      var h;
      i((h = u.target) == null ? void 0 : h.value);
    }
    function s(u) {
      let h = Number(e.value);
      if (!isNaN(h)) {
        let d = e.step;
        const _ = et(d), f = X(u);
        f === "up" && (i((h + d).toFixed(_)), u.preventDefault()), f === "down" && (i((h - d).toFixed(_)), u.preventDefault());
      }
    }
    return { __sfc: !0, props: e, emit: a, ariaLabel: t, labelId: r, update: i, handleInput: l, handleKeyDown: s };
  }
});
var _t = function() {
  var a = this, e = a._self._c, t = a._self._setupProxy;
  return e("div", { staticClass: "vc-editable-input" }, [e("input", { staticClass: "vc-input-input", attrs: { "aria-label": t.ariaLabel, id: t.labelId }, domProps: { value: t.props.value }, on: { keydown: t.handleKeyDown, input: t.handleInput } }), e("label", { staticClass: "vc-input-label", attrs: { for: t.labelId, "aria-hidden": "true" } }, [a._v(a._s(t.props.label))]), a.desc ? e("span", { staticClass: "vc-input-desc", attrs: { "aria-hidden": "true" } }, [a._v(a._s(a.desc))]) : a._e()]);
}, mt = [], Ct = /* @__PURE__ */ S(
  gt,
  _t,
  mt,
  !1,
  null,
  "7ec4bfc2"
);
const G = Ct.exports;
function yt() {
  const n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return n.charAt(Math.floor(Math.random() * n.length)) + n.charAt(Math.floor(Math.random() * n.length));
}
const j = (n) => {
  const a = P(0), e = `__from__vc__hue__${yt()}`;
  return ke(n, (r) => {
    if (r[e])
      return;
    const i = r.toHsl().h;
    i === 0 && a.value !== 0 || (a.value = i);
  }, { immediate: !0 }), { hueRef: a, updateHueRef: (r) => {
    const i = c({
      ...n.value.toHsl(),
      h: r
    });
    i[e] = !0, n.value = i, a.value = r;
  } };
}, U = (n) => c(n).isValid(), kt = (n) => c(n).getAlpha() === 0, xt = /* @__PURE__ */ F({
  __name: "ChromePicker",
  props: {
    disableAlpha: { type: Boolean },
    disableFields: { type: Boolean },
    formats: { default: () => ["rgb", "hex", "hsl"] },
    tinyColor: null,
    modelValue: null,
    value: null
  },
  emits: L,
  setup(n, { emit: a }) {
    const e = n, t = B(e, a), { hueRef: r, updateHueRef: i } = j(t), l = P(0);
    let s = P(!1);
    const o = b(() => {
      const g = t.value.toRgb();
      return "rgba(" + [g.r, g.g, g.b, t.value.getAlpha()].join(",") + ")";
    }), u = b(() => {
      const { h: g, s: w, l: x } = t.value.toHsl();
      return {
        h: g.toFixed(),
        s: `${(w * 100).toFixed()}%`,
        l: `${(x * 100).toFixed()}%`
      };
    }), h = b(() => t.value.toRgb()), d = b(() => Number(t.value.getAlpha().toFixed(2))), _ = /* @__PURE__ */ new Set(["hex", "hsl", "rgb"]), f = b(() => {
      const g = /* @__PURE__ */ new Set(), w = [], x = e.formats;
      for (const I of x)
        if (_.has(I)) {
          const T = I;
          g.has(T) || (g.add(T), w.push(T));
        }
      return w;
    }), R = b(() => {
      const { disableFields: g, formats: w } = e;
      return !(g === !0 || !Array.isArray(w) || f.value.length === 0);
    });
    return { __sfc: !0, props: e, emit: a, tinyColorRef: t, hueRef: r, updateHueRef: i, fieldsIndex: l, highlight: s, activeColor: o, hsl: u, rgb: h, alpha: d, VALID_FORMATS: _, normalizedFormats: f, showFields: R, isSupportedFormat: (g) => f.value.includes(g), getFormatIndex: (g) => f.value.indexOf(g), inputChangeHex: (g) => {
      g && U(g) && (t.value = g);
    }, inputChangeRGBA: (g, w) => {
      if (!w || isNaN(Number(w)))
        return;
      const x = { [g]: w };
      t.value = {
        ...h.value,
        a: d.value,
        ...x
      };
    }, inputChangeHSLA: (g, w) => {
      if (!w)
        return;
      const x = { [g]: +w };
      (g === "s" || g === "l") && (x[g] = +w.replace("%", "") / 100), t.value = {
        ...t.value.toHsl(),
        a: d.value,
        ...x
      };
    }, toggleViews: () => {
      if (l.value === f.value.length - 1) {
        l.value = 0;
        return;
      }
      l.value++;
    }, showHighlight: () => {
      s.value = !0;
    }, hideHighlight: () => {
      s.value = !1;
    }, Saturation: ie, Hue: O, Alpha: se, EdIn: G, Checkerboard: le };
  }
});
var wt = function() {
  var a = this, e = a._self._c, t = a._self._setupProxy;
  return e("div", { class: ["vc-chrome-picker", a.disableAlpha ? "alpha-disabled" : ""], attrs: { role: "application", "aria-label": "Chrome Color Picker" } }, [e("div", { staticClass: "saturation" }, [e(t.Saturation, { attrs: { hue: t.hueRef }, model: { value: t.tinyColorRef, callback: function(r) {
    t.tinyColorRef = r;
  }, expression: "tinyColorRef" } })], 1), e("div", { staticClass: "body" }, [e("div", { staticClass: "controls" }, [e("div", { staticClass: "color-wrap" }, [e("div", { staticClass: "active-color", style: { backgroundColor: t.activeColor }, attrs: { role: "presentation", "aria-live": "polite", "aria-label": `Current color is ${t.activeColor}` } }), t.props.disableAlpha ? a._e() : e(t.Checkerboard)], 1), e("div", { staticClass: "sliders" }, [e("div", { staticClass: "hue-wrap" }, [e(t.Hue, { attrs: { modelValue: t.hueRef }, on: { "update:modelValue": t.updateHueRef } })], 1), t.props.disableAlpha ? a._e() : e("div", { staticClass: "alpha-wrap" }, [e(t.Alpha, { model: { value: t.tinyColorRef, callback: function(r) {
    t.tinyColorRef = r;
  }, expression: "tinyColorRef" } })], 1)])]), t.showFields ? e("div", { staticClass: "fieldsWrap", attrs: { "data-testid": "fields" } }, [t.isSupportedFormat("rgb") ? e("div", { directives: [{ name: "show", rawName: "v-show", value: t.fieldsIndex === t.getFormatIndex("rgb"), expression: "fieldsIndex === getFormatIndex('rgb')" }], staticClass: "fields" }, [e("div", { staticClass: "field" }, [e(t.EdIn, { attrs: { label: "r", value: t.rgb.r, a11y: { label: "Red" } }, on: { change: (r) => t.inputChangeRGBA("r", r) } })], 1), e("div", { staticClass: "field" }, [e(t.EdIn, { attrs: { label: "g", value: t.rgb.g, a11y: { label: "Green" } }, on: { change: (r) => t.inputChangeRGBA("g", r) } })], 1), e("div", { staticClass: "field" }, [e(t.EdIn, { attrs: { label: "b", value: t.rgb.b, a11y: { label: "Blue" } }, on: { change: (r) => t.inputChangeRGBA("b", r) } })], 1), a.disableAlpha ? a._e() : e("div", { staticClass: "field" }, [e(t.EdIn, { attrs: { label: "a", value: t.alpha, step: 0.01, max: 1, a11y: { label: "Transparency" } }, on: { change: (r) => t.inputChangeRGBA("a", r) } })], 1)]) : a._e(), t.isSupportedFormat("hex") ? e("div", { directives: [{ name: "show", rawName: "v-show", value: t.fieldsIndex === t.getFormatIndex("hex"), expression: "fieldsIndex === getFormatIndex('hex')" }], staticClass: "fields" }, [e("div", { staticClass: "field" }, [t.alpha === 1 ? e(t.EdIn, { attrs: { label: "hex", value: t.tinyColorRef.toHexString(), a11y: { label: "Hex" } }, on: { change: t.inputChangeHex } }) : a._e(), t.alpha !== 1 ? e(t.EdIn, { attrs: { label: "hex", value: t.tinyColorRef.toHex8String(), a11y: { label: "Hex with transparency" } }, on: { change: t.inputChangeHex } }) : a._e()], 1)]) : a._e(), t.isSupportedFormat("hsl") ? e("div", { directives: [{ name: "show", rawName: "v-show", value: t.fieldsIndex === t.getFormatIndex("hsl"), expression: "fieldsIndex === getFormatIndex('hsl')" }], staticClass: "fields" }, [e("div", { staticClass: "field" }, [e(t.EdIn, { attrs: { label: "h", value: t.hueRef.toFixed(), a11y: { label: "Hue" } }, on: { change: (r) => t.inputChangeHSLA("h", r) } })], 1), e("div", { staticClass: "field" }, [e(t.EdIn, { attrs: { label: "s", value: t.hsl.s, a11y: { label: "Saturation" } }, on: { change: (r) => t.inputChangeHSLA("s", r) } })], 1), e("div", { staticClass: "field" }, [e(t.EdIn, { attrs: { label: "l", value: t.hsl.l, a11y: { label: "Lightness" } }, on: { change: (r) => t.inputChangeHSLA("l", r) } })], 1), a.disableAlpha ? a._e() : e("div", { staticClass: "field" }, [e(t.EdIn, { attrs: { label: "a", value: t.alpha, step: 0.01, max: 1, a11y: { label: "Transparency" } }, on: { change: (r) => t.inputChangeHSLA("a", r) } })], 1)]) : a._e(), t.normalizedFormats.length > 1 ? e("div", { staticClass: "toggle-btn", attrs: { role: "button", "aria-label": "Change color format", tabindex: "0" }, on: { click: t.toggleViews, keydown: [function(r) {
    return !r.type.indexOf("key") && a._k(r.keyCode, "enter", 13, r.key, "Enter") ? null : t.toggleViews.apply(null, arguments);
  }, function(r) {
    return !r.type.indexOf("key") && a._k(r.keyCode, "space", 32, r.key, [" ", "Spacebar"]) ? null : t.toggleViews.apply(null, arguments);
  }], mouseover: t.showHighlight, mouseenter: t.showHighlight, mouseout: t.hideHighlight, focus: t.showHighlight, blur: t.hideHighlight } }, [e("div", { staticClass: "toggle-icon", attrs: { role: "presentation" } }, [e("svg", { staticStyle: { width: "24px", height: "24px" }, attrs: { viewBox: "0 0 24 24" } }, [e("path", { attrs: { fill: "currentColor", d: "M12,18.17L8.83,15L7.42,16.41L12,21L16.59,16.41L15.17,15M12,5.83L15.17,9L16.58,7.59L12,3L7.41,7.59L8.83,9L12,5.83Z" } })])]), e("div", { directives: [{ name: "show", rawName: "v-show", value: t.highlight, expression: "highlight" }], staticClass: "toggle-icon_highlighted", attrs: { role: "presentation" } })]) : a._e()]) : a._e()])]);
}, Rt = [], At = /* @__PURE__ */ S(
  xt,
  wt,
  Rt,
  !1,
  null,
  "65ca7748"
);
const Pa = At.exports, be = [
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
], Ft = /* @__PURE__ */ F({
  __name: "CompactPicker",
  props: {
    palette: { default: () => be },
    tinyColor: null,
    modelValue: null,
    value: null
  },
  emits: ["change"].concat(L),
  setup(n, { emit: a }) {
    const e = n, t = B(e, a), r = b(() => t.value.toHexString().toUpperCase());
    return { __sfc: !0, defaultColors: be, props: e, emit: a, tinyColorRef: t, pick: r, handlerClick: (l) => {
      t.value = l;
    } };
  }
});
var St = function() {
  var a = this, e = a._self._c, t = a._self._setupProxy;
  return e("div", { staticClass: "vc-compact-picker", attrs: { role: "application", "aria-label": "Compact color picker", tabindex: "0" } }, [e("ul", { staticClass: "colors", attrs: { role: "listbox", "aria-label": "Pick a color" } }, a._l(t.props.palette, function(r) {
    return e("li", { key: r, class: { "color-item_white": r === "#FFFFFF", "color-item": !0 }, style: { background: r }, attrs: { role: "option", "aria-label": "color:" + r, "aria-selected": r.toUpperCase() === t.pick, title: r, tabindex: "0" }, on: { click: function(i) {
      return t.handlerClick(r);
    }, keydown: function(i) {
      return !i.type.indexOf("key") && a._k(i.keyCode, "space", 32, i.key, [" ", "Spacebar"]) ? null : t.handlerClick(r);
    } } }, [e("div", { directives: [{ name: "show", rawName: "v-show", value: r.toUpperCase() === t.pick, expression: "c.toUpperCase() === pick" }], staticClass: "dot" })]);
  }), 0)]);
}, Ht = [], Mt = /* @__PURE__ */ S(
  Ft,
  St,
  Ht,
  !1,
  null,
  "ed15136d"
);
const Va = Mt.exports, ge = [
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
], Et = /* @__PURE__ */ F({
  __name: "GrayscalePicker",
  props: {
    palette: { default: () => ge },
    tinyColor: null,
    modelValue: null,
    value: null
  },
  emits: ["change"].concat(L),
  setup(n, { emit: a }) {
    const e = n, t = B(e, a), r = b(() => t.value.toHexString().toUpperCase());
    return { __sfc: !0, defaultColors: ge, props: e, emit: a, tinyColorRef: t, pick: r, handlerClick: (l) => {
      t.value = l;
    } };
  }
});
var Lt = function() {
  var a = this, e = a._self._c, t = a._self._setupProxy;
  return e("div", { staticClass: "vc-grayscale-picker", attrs: { role: "application", "aria-label": "Grayscale color picker" } }, [e("ul", { staticClass: "colors", attrs: { role: "listbox", "aria-label": "Select a grayscale color", tabindex: "0" } }, a._l(a.palette, function(r) {
    return e("li", { key: r, class: { "color-item_white": r === "#FFFFFF", "color-item": !0 }, style: { background: r }, attrs: { role: "option", "aria-label": "color:" + r, "aria-selected": r.toUpperCase() === t.pick, title: r, tabindex: "0" }, on: { click: function(i) {
      return t.handlerClick(r);
    }, keydown: function(i) {
      return !i.type.indexOf("key") && a._k(i.keyCode, "space", 32, i.key, [" ", "Spacebar"]) ? null : t.handlerClick(r);
    } } }, [e("div", { directives: [{ name: "show", rawName: "v-show", value: r.toUpperCase() === t.pick, expression: "c.toUpperCase() === pick" }], staticClass: "dot" })]);
  }), 0)]);
}, Bt = [], It = /* @__PURE__ */ S(
  Et,
  Lt,
  Bt,
  !1,
  null,
  "a951a5d3"
);
const $a = It.exports, Dt = /* @__PURE__ */ F({
  __name: "MaterialPicker",
  props: {
    tinyColor: null,
    modelValue: null,
    value: null
  },
  emits: L,
  setup(n, { emit: a }) {
    const e = n, t = B(e, a), r = b(() => t.value.toRgb());
    function i(s) {
      U(s) && (t.value = s);
    }
    function l(s, o) {
      t.value = {
        ...r.value,
        [s]: o
      };
    }
    return { __sfc: !0, props: e, emit: a, tinyColorRef: t, rgb: r, onHexChange: i, onChange: l, EdIn: G };
  }
});
var Pt = function() {
  var a = this, e = a._self._c, t = a._self._setupProxy;
  return e("div", { staticClass: "vc-material-picker", attrs: { role: "application", "aria-label": "Material color inputs" } }, [e(t.EdIn, { staticClass: "hex", style: { borderColor: t.tinyColorRef.toHexString() }, attrs: { label: "hex", value: t.tinyColorRef.toHexString(), a11y: { label: "Hex" } }, on: { change: t.onHexChange } }), e("div", { staticClass: "rgb" }, [e("div", { staticClass: "color" }, [e(t.EdIn, { attrs: { label: "r", value: t.rgb.r, a11y: { label: "Red" } }, on: { change: (r) => t.onChange("r", r) } })], 1), e("div", { staticClass: "color" }, [e(t.EdIn, { attrs: { label: "g", value: t.rgb.g, a11y: { label: "Green" } }, on: { change: (r) => t.onChange("g", r) } })], 1), e("div", { staticClass: "color" }, [e(t.EdIn, { attrs: { label: "b", value: t.rgb.b, a11y: { label: "Blue" } }, on: { change: (r) => t.onChange("b", r) } })], 1)])], 1);
}, Vt = [], $t = /* @__PURE__ */ S(
  Dt,
  Pt,
  Vt,
  !1,
  null,
  "04cb1aa3"
);
const Ta = $t.exports, Tt = /* @__PURE__ */ F({
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
    tinyColor: null,
    modelValue: null,
    value: null
  },
  emits: L.concat(["ok", "cancel", "reset"]),
  setup(n, { emit: a }) {
    const e = n, t = B(e, a), { hueRef: r, updateHueRef: i } = j(t), l = P(e.currentColor), s = b(() => t.value.toHsv()), o = b(() => {
      const y = t.value.toHexString();
      return y && y.replace("#", "");
    }), u = b(() => t.value.toRgb());
    return { __sfc: !0, props: e, emit: a, tinyColorRef: t, hueRef: r, updateHueRef: i, currentColorRef: l, hsv: s, hex: o, rgb: u, clickCurrentColor: () => {
      t.value = l.value;
    }, inputChangeHex: (y) => {
      y && U(y) && (t.value = y);
    }, inputChangeRGBA: (y, v) => {
      if (!v || isNaN(Number(v)))
        return;
      const m = { [y]: v };
      t.value = {
        ...u.value,
        ...m
      };
    }, inputChangeHSV: (y, v) => {
      if (!v || isNaN(Number(v)))
        return;
      const m = { [y]: Number(v) };
      t.value = {
        ...s.value,
        ...m
      };
    }, handleOK: () => {
      a("ok");
    }, handleCancel: () => {
      a("cancel");
    }, handleReset: () => {
      a("reset");
    }, EdIn: G, Saturation: ie, Hue: O };
  }
});
var Nt = function() {
  var a = this, e = a._self._c, t = a._self._setupProxy;
  return e("div", { class: ["vc-photoshop-picker", a.disableFields ? "fields_disabled" : ""], attrs: { role: "application", "aria-label": "PhotoShop color picker" } }, [e("div", { staticClass: "title", attrs: { "aria-hidden": "true" } }, [a._v(a._s(a.title))]), e("div", { staticClass: "body" }, [e("div", { staticClass: "saturation" }, [e(t.Saturation, { attrs: { hue: t.hueRef }, model: { value: t.tinyColorRef, callback: function(r) {
    t.tinyColorRef = r;
  }, expression: "tinyColorRef" } })], 1), e("div", { staticClass: "hue" }, [e(t.Hue, { attrs: { direction: "vertical", modelValue: t.hueRef }, on: { "update:modelValue": t.updateHueRef } }, [e("div", { staticClass: "hue-picker" }, [e("i", { staticClass: "hue-picker-left" }), e("i", { staticClass: "hue-picker-right" })])])], 1), e("div", { class: ["controls", a.disableFields ? "controls_fields_disabled" : ""] }, [e("div", { staticClass: "preview" }, [e("div", { staticClass: "preview-label", attrs: { "aria-hidden": "true" } }, [a._v(a._s(a.newLabel))]), e("div", { staticClass: "preview-swatches" }, [e("div", { staticClass: "preview-color", style: { background: `#${t.hex}` }, attrs: { "aria-label": `New color is #${t.hex}` } }), e("div", { staticClass: "preview-color", style: { background: t.currentColorRef }, attrs: { role: "button", "aria-label": `Current color is ${t.currentColorRef}`, tabindex: "0" }, on: { click: t.clickCurrentColor, keydown: function(r) {
    return !r.type.indexOf("key") && a._k(r.keyCode, "space", 32, r.key, [" ", "Spacebar"]) ? null : t.clickCurrentColor.apply(null, arguments);
  } } })]), e("div", { staticClass: "preview-label", attrs: { "aria-hidden": "true" } }, [a._v(a._s(a.currentLabel))])]), a.disableFields ? a._e() : e("div", { staticClass: "actions" }, [e("div", { staticClass: "action-btn", attrs: { role: "button", "aria-label": "Click to apply new color", tabindex: "0" }, on: { click: t.handleOK, keydown: function(r) {
    return !r.type.indexOf("key") && a._k(r.keyCode, "space", 32, r.key, [" ", "Spacebar"]) ? null : t.clickCurrentColor.apply(null, arguments);
  } } }, [a._v(a._s(a.okLabel))]), e("div", { staticClass: "action-btn", attrs: { role: "button", "aria-label": a.cancelLabel, tabindex: "0" }, on: { click: t.handleCancel, keydown: function(r) {
    return !r.type.indexOf("key") && a._k(r.keyCode, "space", 32, r.key, [" ", "Spacebar"]) ? null : t.clickCurrentColor.apply(null, arguments);
  } } }, [a._v(a._s(a.cancelLabel))]), e("div", { staticClass: "fields" }, [e(t.EdIn, { attrs: { label: "h", desc: "°", value: t.hsv.h.toFixed(), a11y: { label: "Hue" } }, on: { change: (r) => t.inputChangeHSV("h", r) } }), e(t.EdIn, { attrs: { label: "s", desc: "%", value: (t.hsv.s * 100).toFixed(), min: 0, max: 100, a11y: { label: "Saturation" } }, on: { change: (r) => t.inputChangeHSV("s", r) } }), e(t.EdIn, { attrs: { label: "v", desc: "%", value: (t.hsv.v * 100).toFixed(), min: 0, max: 100, a11y: { label: "Value" } }, on: { change: (r) => t.inputChangeHSV("v", r) } }), e("div", { staticClass: "fields-divider" }), e(t.EdIn, { attrs: { label: "r", value: t.rgb.r, a11y: { label: "Red" } }, on: { change: (r) => t.inputChangeRGBA("r", r) } }), e(t.EdIn, { attrs: { label: "g", value: t.rgb.g, a11y: { label: "Green" } }, on: { change: (r) => t.inputChangeRGBA("g", r) } }), e(t.EdIn, { attrs: { label: "b", value: t.rgb.b, a11y: { label: "Blue" } }, on: { change: (r) => t.inputChangeRGBA("b", r) } }), e("div", { staticClass: "fields-divider" }), e(t.EdIn, { staticClass: "hex", attrs: { label: "#", value: t.hex, a11y: { label: "Hex" } }, on: { change: t.inputChangeHex } })], 1), a.hasResetButton ? e("div", { staticClass: "action-btn", attrs: { role: "button", "aria-label": a.resetLabel, tabindex: "0" }, on: { click: t.handleReset, keydown: function(r) {
    return !r.type.indexOf("key") && a._k(r.keyCode, "space", 32, r.key, [" ", "Spacebar"]) ? null : t.handleReset.apply(null, arguments);
  } } }, [a._v(a._s(a.resetLabel))]) : a._e()])])])]);
}, Ot = [], Gt = /* @__PURE__ */ S(
  Tt,
  Nt,
  Ot,
  !1,
  null,
  "f7692808"
);
const Na = Gt.exports, _e = [
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
], Ut = /* @__PURE__ */ F({
  __name: "SketchPicker",
  props: {
    presetColors: { default: () => _e },
    disableAlpha: { type: Boolean, default: !1 },
    disableFields: { type: Boolean, default: !1 },
    tinyColor: null,
    modelValue: null,
    value: null
  },
  emits: ["change"].concat(L),
  setup(n, { emit: a }) {
    const e = n, t = B(e, a), { hueRef: r, updateHueRef: i } = j(t), l = b(() => Number(t.value.getAlpha().toFixed(2))), s = b(() => {
      let f;
      return l.value < 1 ? f = t.value.toHex8String() : f = t.value.toHexString(), f.replace("#", "");
    }), o = b(() => t.value.toRgb());
    return { __sfc: !0, presetColorsOfSketch: _e, props: e, emit: a, tinyColorRef: t, hueRef: r, updateHueRef: i, alpha: l, hex: s, rgb: o, inputChangeHex: (f) => {
      f && U(f) && (t.value = f);
    }, inputChangeRGBA: (f, R) => {
      if (!R || isNaN(Number(R)))
        return;
      const p = { [f]: R };
      t.value = {
        ...o.value,
        ...p
      };
    }, inputChangeAlpha: (f) => {
      !f || isNaN(Number(f)) || (t.value = t.value.setAlpha(f).clone());
    }, handlePreset: (f) => {
      t.value = f;
    }, EdIn: G, Saturation: ie, Hue: O, Alpha: se, Checkerboard: le, isTransparent: kt };
  }
});
var zt = function() {
  var a = this, e = a._self._c, t = a._self._setupProxy;
  return e("div", { class: ["vc-sketch-picker", a.disableAlpha ? "alpha-disabled" : ""], attrs: { role: "application", "aria-label": "Sketch color picker" } }, [e("div", { staticClass: "saturation" }, [e(t.Saturation, { attrs: { hue: t.hueRef }, model: { value: t.tinyColorRef, callback: function(r) {
    t.tinyColorRef = r;
  }, expression: "tinyColorRef" } })], 1), e("div", { staticClass: "controls" }, [e("div", { staticClass: "sliders" }, [e("div", { staticClass: "hue" }, [e(t.Hue, { attrs: { modelValue: t.hueRef }, on: { "update:modelValue": t.updateHueRef } })], 1), a.disableAlpha ? a._e() : e("div", { staticClass: "alpha" }, [e(t.Alpha, { model: { value: t.tinyColorRef, callback: function(r) {
    t.tinyColorRef = r;
  }, expression: "tinyColorRef" } })], 1)]), e("div", { staticClass: "color" }, [e("div", { staticClass: "active-color", style: { background: t.tinyColorRef.toRgbString() }, attrs: { "aria-label": `Current color is ${t.tinyColorRef.toRgbString()}` } }), e(t.Checkerboard)], 1)]), a.disableFields ? a._e() : e("div", { staticClass: "field" }, [e("div", { staticClass: "field_double" }, [e(t.EdIn, { attrs: { label: "hex", value: t.hex, a11y: { label: "Hex" } }, on: { change: t.inputChangeHex } })], 1), e("div", { staticClass: "field_single" }, [e(t.EdIn, { attrs: { label: "r", value: t.rgb.r, a11y: { label: "Red" } }, on: { change: (r) => t.inputChangeRGBA("r", r) } })], 1), e("div", { staticClass: "field_single" }, [e(t.EdIn, { attrs: { label: "g", value: t.rgb.g, a11y: { label: "Green" } }, on: { change: (r) => t.inputChangeRGBA("g", r) } })], 1), e("div", { staticClass: "field_single" }, [e(t.EdIn, { attrs: { label: "b", value: t.rgb.b, a11y: { label: "Blue" } }, on: { change: (r) => t.inputChangeRGBA("b", r) } })], 1), a.disableAlpha ? a._e() : e("div", { staticClass: "field_single" }, [e(t.EdIn, { attrs: { label: "a", value: t.alpha, step: 0.01, max: 1, a11y: { label: "Transparency" } }, on: { change: t.inputChangeAlpha } })], 1)]), e("div", { staticClass: "presets", attrs: { role: "listbox", "aria-label": "A color preset, pick one to set as current color" } }, [a._l(t.props.presetColors, function(r) {
    return [t.isTransparent(r) ? e("div", { key: r, staticClass: "preset-color", attrs: { "aria-label": "Color: transparency", "aria-selected": t.alpha === 0, role: "option", tabindex: "0", title: r }, on: { click: function(i) {
      return t.handlePreset(r);
    }, keydown: function(i) {
      return !i.type.indexOf("key") && a._k(i.keyCode, "space", 32, i.key, [" ", "Spacebar"]) ? null : t.handlePreset(r);
    } } }, [e(t.Checkerboard)], 1) : e("div", { key: r + "-color", staticClass: "preset-color", style: { background: r }, attrs: { title: r, "aria-label": "Color:" + r, "aria-selected": `#${t.hex.toLowerCase()}` === r.toLowerCase(), role: "option", tabindex: "0" }, on: { click: function(i) {
      return t.handlePreset(r);
    }, keydown: function(i) {
      return !i.type.indexOf("key") && a._k(i.keyCode, "space", 32, i.key, [" ", "Spacebar"]) ? null : t.handlePreset(r);
    } } })];
  })], 2)]);
}, qt = [], Kt = /* @__PURE__ */ S(
  Ut,
  zt,
  qt,
  !1,
  null,
  "7e035088"
);
const Oa = Kt.exports, V = 0.5, me = [
  { s: V, l: 0.8 },
  { s: V, l: 0.65 },
  { s: V, l: 0.5 },
  { s: V, l: 0.35 },
  { s: V, l: 0.2 }
], Wt = /* @__PURE__ */ F({
  __name: "SliderPicker",
  props: {
    swatches: { default: () => me },
    alpha: { type: Boolean },
    tinyColor: null,
    modelValue: null,
    value: null
  },
  emits: L,
  setup(n, { emit: a }) {
    const e = n, t = B(e, a), { hueRef: r, updateHueRef: i } = j(t), l = b(() => t.value.toHsl()), s = b(() => t.value.toHexString()), o = b(() => e.swatches.map((_) => typeof _ == "string" ? {
      s: V,
      l: Number(_)
    } : _));
    return { __sfc: !0, DEFAULT_SATURATION: V, defaultSwatches: me, props: e, emit: a, tinyColorRef: t, hueRef: r, updateHueRef: i, hsl: l, hex: s, normalizedSwatches: o, isActive: (d) => l.value.l === 1 && d.l === 1 || l.value.l === 0 && d.l === 0 ? !0 : Math.abs(l.value.l - d.l) < 0.01 && Math.abs(l.value.s - d.s) < 0.01, handleSwClick: (d) => {
      t.value = {
        h: l.value.h,
        s: d.s,
        l: d.l
      };
    }, Hue: O, AlphaSlider: se };
  }
});
var Xt = function() {
  var a = this, e = a._self._c, t = a._self._setupProxy;
  return e("div", { staticClass: "vc-slider-picker", attrs: { role: "application", "aria-label": "Slider color picker" } }, [e("div", { staticClass: "hue" }, [e(t.Hue, { attrs: { modelValue: t.hueRef }, on: { "update:modelValue": t.updateHueRef } })], 1), t.props.alpha ? e("div", { staticClass: "alpha" }, [e(t.AlphaSlider, { model: { value: t.tinyColorRef, callback: function(r) {
    t.tinyColorRef = r;
  }, expression: "tinyColorRef" } })], 1) : a._e(), t.normalizedSwatches.length > 0 ? e("div", { staticClass: "swatches", attrs: { role: "listbox", "aria-label": "Color segments in different shades of one color", tabindex: "0" } }, a._l(t.normalizedSwatches, function(r, i) {
    return e("div", { key: i, staticClass: "swatch", attrs: { "data-index": "index", role: "option", "aria-label": "Color:" + t.hex, title: t.hex, "aria-selected": t.isActive(r), tabindex: "0" }, on: { click: function(l) {
      return t.handleSwClick(r);
    }, keydown: function(l) {
      return !l.type.indexOf("key") && a._k(l.keyCode, "space", 32, l.key, [" ", "Spacebar"]) ? null : t.handleSwClick(r);
    } } }, [e("div", { class: {
      picker: !0,
      picker_active: t.isActive(r),
      picker_white: r.l === 1
    }, style: { background: "hsl(" + t.hsl.h + ", " + r.s * 100 + "%, " + r.l * 100 + "%)" } })]);
  }), 0) : a._e()]);
}, jt = [], Yt = /* @__PURE__ */ S(
  Wt,
  Xt,
  jt,
  !1,
  null,
  "6f04ef25"
);
const Ga = Yt.exports;
var Zt = { 50: "#ffebee", 100: "#ffcdd2", 200: "#ef9a9a", 300: "#e57373", 400: "#ef5350", 500: "#f44336", 600: "#e53935", 700: "#d32f2f", 800: "#c62828", 900: "#b71c1c", a100: "#ff8a80", a200: "#ff5252", a400: "#ff1744", a700: "#d50000" }, Jt = { 50: "#fce4ec", 100: "#f8bbd0", 200: "#f48fb1", 300: "#f06292", 400: "#ec407a", 500: "#e91e63", 600: "#d81b60", 700: "#c2185b", 800: "#ad1457", 900: "#880e4f", a100: "#ff80ab", a200: "#ff4081", a400: "#f50057", a700: "#c51162" }, Qt = { 50: "#f3e5f5", 100: "#e1bee7", 200: "#ce93d8", 300: "#ba68c8", 400: "#ab47bc", 500: "#9c27b0", 600: "#8e24aa", 700: "#7b1fa2", 800: "#6a1b9a", 900: "#4a148c", a100: "#ea80fc", a200: "#e040fb", a400: "#d500f9", a700: "#aa00ff" }, ea = { 50: "#ede7f6", 100: "#d1c4e9", 200: "#b39ddb", 300: "#9575cd", 400: "#7e57c2", 500: "#673ab7", 600: "#5e35b1", 700: "#512da8", 800: "#4527a0", 900: "#311b92", a100: "#b388ff", a200: "#7c4dff", a400: "#651fff", a700: "#6200ea" }, ta = { 50: "#e8eaf6", 100: "#c5cae9", 200: "#9fa8da", 300: "#7986cb", 400: "#5c6bc0", 500: "#3f51b5", 600: "#3949ab", 700: "#303f9f", 800: "#283593", 900: "#1a237e", a100: "#8c9eff", a200: "#536dfe", a400: "#3d5afe", a700: "#304ffe" }, aa = { 50: "#e3f2fd", 100: "#bbdefb", 200: "#90caf9", 300: "#64b5f6", 400: "#42a5f5", 500: "#2196f3", 600: "#1e88e5", 700: "#1976d2", 800: "#1565c0", 900: "#0d47a1", a100: "#82b1ff", a200: "#448aff", a400: "#2979ff", a700: "#2962ff" }, na = { 50: "#e1f5fe", 100: "#b3e5fc", 200: "#81d4fa", 300: "#4fc3f7", 400: "#29b6f6", 500: "#03a9f4", 600: "#039be5", 700: "#0288d1", 800: "#0277bd", 900: "#01579b", a100: "#80d8ff", a200: "#40c4ff", a400: "#00b0ff", a700: "#0091ea" }, ra = { 50: "#e0f7fa", 100: "#b2ebf2", 200: "#80deea", 300: "#4dd0e1", 400: "#26c6da", 500: "#00bcd4", 600: "#00acc1", 700: "#0097a7", 800: "#00838f", 900: "#006064", a100: "#84ffff", a200: "#18ffff", a400: "#00e5ff", a700: "#00b8d4" }, ia = { 50: "#e0f2f1", 100: "#b2dfdb", 200: "#80cbc4", 300: "#4db6ac", 400: "#26a69a", 500: "#009688", 600: "#00897b", 700: "#00796b", 800: "#00695c", 900: "#004d40", a100: "#a7ffeb", a200: "#64ffda", a400: "#1de9b6", a700: "#00bfa5" }, la = { 50: "#e8f5e9", 100: "#c8e6c9", 200: "#a5d6a7", 300: "#81c784", 400: "#66bb6a", 500: "#4caf50", 600: "#43a047", 700: "#388e3c", 800: "#2e7d32", 900: "#1b5e20", a100: "#b9f6ca", a200: "#69f0ae", a400: "#00e676", a700: "#00c853" }, sa = { 50: "#f1f8e9", 100: "#dcedc8", 200: "#c5e1a5", 300: "#aed581", 400: "#9ccc65", 500: "#8bc34a", 600: "#7cb342", 700: "#689f38", 800: "#558b2f", 900: "#33691e", a100: "#ccff90", a200: "#b2ff59", a400: "#76ff03", a700: "#64dd17" }, oa = { 50: "#f9fbe7", 100: "#f0f4c3", 200: "#e6ee9c", 300: "#dce775", 400: "#d4e157", 500: "#cddc39", 600: "#c0ca33", 700: "#afb42b", 800: "#9e9d24", 900: "#827717", a100: "#f4ff81", a200: "#eeff41", a400: "#c6ff00", a700: "#aeea00" }, ca = { 50: "#fffde7", 100: "#fff9c4", 200: "#fff59d", 300: "#fff176", 400: "#ffee58", 500: "#ffeb3b", 600: "#fdd835", 700: "#fbc02d", 800: "#f9a825", 900: "#f57f17", a100: "#ffff8d", a200: "#ffff00", a400: "#ffea00", a700: "#ffd600" }, ua = { 50: "#fff8e1", 100: "#ffecb3", 200: "#ffe082", 300: "#ffd54f", 400: "#ffca28", 500: "#ffc107", 600: "#ffb300", 700: "#ffa000", 800: "#ff8f00", 900: "#ff6f00", a100: "#ffe57f", a200: "#ffd740", a400: "#ffc400", a700: "#ffab00" }, fa = { 50: "#fff3e0", 100: "#ffe0b2", 200: "#ffcc80", 300: "#ffb74d", 400: "#ffa726", 500: "#ff9800", 600: "#fb8c00", 700: "#f57c00", 800: "#ef6c00", 900: "#e65100", a100: "#ffd180", a200: "#ffab40", a400: "#ff9100", a700: "#ff6d00" }, da = { 50: "#fbe9e7", 100: "#ffccbc", 200: "#ffab91", 300: "#ff8a65", 400: "#ff7043", 500: "#ff5722", 600: "#f4511e", 700: "#e64a19", 800: "#d84315", 900: "#bf360c", a100: "#ff9e80", a200: "#ff6e40", a400: "#ff3d00", a700: "#dd2c00" }, ha = { 50: "#efebe9", 100: "#d7ccc8", 200: "#bcaaa4", 300: "#a1887f", 400: "#8d6e63", 500: "#795548", 600: "#6d4c41", 700: "#5d4037", 800: "#4e342e", 900: "#3e2723" }, pa = { 50: "#fafafa", 100: "#f5f5f5", 200: "#eeeeee", 300: "#e0e0e0", 400: "#bdbdbd", 500: "#9e9e9e", 600: "#757575", 700: "#616161", 800: "#424242", 900: "#212121" }, va = { 50: "#eceff1", 100: "#cfd8dc", 200: "#b0bec5", 300: "#90a4ae", 400: "#78909c", 500: "#607d8b", 600: "#546e7a", 700: "#455a64", 800: "#37474f", 900: "#263238" }, ba = { primary: "rgba(0, 0, 0, 0.87)", secondary: "rgba(0, 0, 0, 0.54)", disabled: "rgba(0, 0, 0, 0.38)", dividers: "rgba(0, 0, 0, 0.12)" }, ga = { primary: "rgba(255, 255, 255, 1)", secondary: "rgba(255, 255, 255, 0.7)", disabled: "rgba(255, 255, 255, 0.5)", dividers: "rgba(255, 255, 255, 0.12)" }, _a = { active: "rgba(0, 0, 0, 0.54)", inactive: "rgba(0, 0, 0, 0.38)" }, ma = { active: "rgba(255, 255, 255, 1)", inactive: "rgba(255, 255, 255, 0.5)" }, Ca = "#ffffff", ya = "#000000";
const ka = {
  red: Zt,
  pink: Jt,
  purple: Qt,
  deepPurple: ea,
  indigo: ta,
  blue: aa,
  lightBlue: na,
  cyan: ra,
  teal: ia,
  green: la,
  lightGreen: sa,
  lime: oa,
  yellow: ca,
  amber: ua,
  orange: fa,
  deepOrange: da,
  brown: ha,
  grey: pa,
  blueGrey: va,
  darkText: ba,
  lightText: ga,
  darkIcons: _a,
  lightIcons: ma,
  white: Ca,
  black: ya
}, Re = [
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
], Ae = ["900", "700", "500", "300", "100"], Ce = /* @__PURE__ */ (() => {
  const n = [];
  return Re.forEach((a) => {
    let e = [];
    a.toLowerCase() === "black" || a.toLowerCase() === "white" ? e = e.concat(["#000000", "#FFFFFF"]) : Ae.forEach((t) => {
      const r = ka[a][t];
      e.push(r.toUpperCase());
    }), n.push(e);
  }), n;
})(), xa = /* @__PURE__ */ F({
  __name: "SwatchesPicker",
  props: {
    palette: { default: () => Ce },
    tinyColor: null,
    modelValue: null,
    value: null
  },
  emits: L,
  setup(n, { emit: a }) {
    const e = n, t = B(e, a), r = b(() => t.value.toHexString());
    return { __sfc: !0, colorMap: Re, intensity: Ae, defaultColors: Ce, props: e, emit: a, tinyColorRef: t, hex: r, equal: (s) => s.toLowerCase() === r.value.toLowerCase(), handlerClick: (s) => {
      t.value = s;
    } };
  }
});
var wa = function() {
  var a = this, e = a._self._c, t = a._self._setupProxy;
  return e("div", { staticClass: "vc-swatches-picker", attrs: { role: "application", "aria-label": "Swatches color picker", "data-pick": t.hex } }, [e("div", { staticClass: "box", attrs: { role: "listbox", "aria-label": "Pick a color", tabindex: "0" } }, a._l(a.palette, function(r, i) {
    return e("div", { key: i, staticClass: "colorGroup" }, a._l(r, function(l) {
      return e("div", { key: l, class: ["color", { color_white: l === "#FFFFFF" }], style: { background: l }, attrs: { "data-color": l, role: "option", "aria-label": "Color:" + l, "aria-selected": t.equal(l), title: l, tabindex: "0" }, on: { click: function(s) {
        return t.handlerClick(l);
      }, keydown: function(s) {
        return !s.type.indexOf("key") && a._k(s.keyCode, "space", 32, s.key, [" ", "Spacebar"]) ? null : t.handlerClick(l);
      } } }, [e("div", { directives: [{ name: "show", rawName: "v-show", value: t.equal(l), expression: "equal(c)" }], staticClass: "picker" }, [e("svg", { staticStyle: { width: "24px", height: "24px" }, attrs: { viewBox: "0 0 24 24" } }, [e("path", { attrs: { d: "M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" } })])])]);
    }), 0);
  }), 0)]);
}, Ra = [], Aa = /* @__PURE__ */ S(
  xa,
  wa,
  Ra,
  !1,
  null,
  "080ed8c6"
);
const Ua = Aa.exports, ye = [
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
], Fa = /* @__PURE__ */ F({
  __name: "TwitterPicker",
  props: {
    width: { default: 276 },
    presetColors: { default: () => ye },
    triangle: { default: "top-left" },
    tinyColor: null,
    modelValue: null,
    value: null
  },
  emits: L,
  setup(n, { emit: a }) {
    const e = n, t = B(e, a), r = b(() => t.value.toHexString());
    return { __sfc: !0, defaultColors: ye, props: e, emit: a, tinyColorRef: t, hex: r, equal: (o) => o.toLowerCase() === r.value.toLowerCase(), handlerClick: (o) => {
      t.value = o;
    }, inputChange: (o) => {
      U(o) && (t.value = o);
    }, EdIn: G };
  }
});
var Sa = function() {
  var a = this, e = a._self._c, t = a._self._setupProxy;
  return e("div", { class: ["vc-twitter-picker", {
    tri_hide: t.props.triangle === "hide",
    tri_top_left: t.props.triangle === "top-left",
    tri_top_right: t.props.triangle === "top-right"
  }], style: {
    width: typeof t.props.width == "number" ? `${t.props.width}px` : t.props.width
  }, attrs: { role: "application", "aria-label": "Twitter color picker" } }, [e("div", { staticClass: "triangle_shadow" }), e("div", { staticClass: "triangle" }), e("div", { staticClass: "body", attrs: { role: "listbox", tabindex: "0", "aria-label": "Select a color" } }, [a._l(a.presetColors, function(r, i) {
    return e("span", { key: i, staticClass: "swatch", style: {
      background: r,
      boxShadow: `0 0 4px ${t.equal(r) ? r : "transparent"}`
    }, attrs: { role: "option", "aria-label": "color:" + r, title: r, "aria-selected": t.equal(r), tabindex: "0" }, on: { click: function(l) {
      return t.handlerClick(r);
    }, keydown: function(l) {
      return !l.type.indexOf("key") && a._k(l.keyCode, "space", 32, l.key, [" ", "Spacebar"]) ? null : t.handlerClick(r);
    } } });
  }), e("div", { staticClass: "hash", attrs: { "aria-hidden": "true" } }, [a._v("#")]), e(t.EdIn, { attrs: { value: t.hex.replace("#", ""), a11y: { label: "Hex" } }, on: { change: t.inputChange } }), e("div", { staticClass: "clear" })], 2)]);
}, Ha = [], Ma = /* @__PURE__ */ S(
  Fa,
  Sa,
  Ha,
  !1,
  null,
  "22d31a28"
);
const za = Ma.exports, Ea = /* @__PURE__ */ F({
  __name: "HueSlider",
  props: {
    modelValue: null,
    value: null
  },
  emits: ["input", "update:modelValue"],
  setup(n, { emit: a }) {
    const e = n;
    Se((l, s) => ({
      bcdaf86c: s.thumbColor
    }));
    const t = b(() => e.modelValue ?? e.value ?? 0), r = (l) => {
      a("input", l), a("update:modelValue", l);
    }, i = b(() => `hsl(${t.value}, 100%, 50%)`);
    return { __sfc: !0, emit: a, props: e, val: t, update: r, thumbColor: i, HueSlider: O };
  }
});
var La = function() {
  var a = this, e = a._self._c, t = a._self._setupProxy;
  return e(t.HueSlider, a._b({ staticClass: "vc-hue-wrap", attrs: { modelValue: t.val }, on: { "update:modelValue": t.update } }, "HueSlider", a.$attrs, !1));
}, Ba = [], Ia = /* @__PURE__ */ S(
  Ea,
  La,
  Ba,
  !1,
  null,
  "1dcad934"
);
const qa = Ia.exports;
export {
  se as AlphaSlider,
  Pa as ChromePicker,
  Va as CompactPicker,
  $a as GrayscalePicker,
  qa as HueSlider,
  Ta as MaterialPicker,
  Na as PhotoshopPicker,
  Oa as SketchPicker,
  Ga as SliderPicker,
  Ua as SwatchesPicker,
  za as TwitterPicker,
  c as tinycolor
};
