import { computed as f, defineComponent as S, ref as E, onUnmounted as Fe, useCssVars as z, watch as J } from "vue";
function Z(n) {
  "@babel/helpers - typeof";
  return Z = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(a) {
    return typeof a;
  } : function(a) {
    return a && typeof Symbol == "function" && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a;
  }, Z(n);
}
var Le = /^\s+/, Pe = /\s+$/;
function c(n, a) {
  if (n = n || "", a = a || {}, n instanceof c)
    return n;
  if (!(this instanceof c))
    return new c(n, a);
  var t = De(n);
  this._originalInput = n, this._r = t.r, this._g = t.g, this._b = t.b, this._a = t.a, this._roundA = Math.round(100 * this._a) / 100, this._format = a.format || t.format, this._gradientType = a.gradientType, this._r < 1 && (this._r = Math.round(this._r)), this._g < 1 && (this._g = Math.round(this._g)), this._b < 1 && (this._b = Math.round(this._b)), this._ok = t.ok;
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
    var a = this.toRgb(), t, e, r, l, s, i;
    return t = a.r / 255, e = a.g / 255, r = a.b / 255, t <= 0.03928 ? l = t / 12.92 : l = Math.pow((t + 0.055) / 1.055, 2.4), e <= 0.03928 ? s = e / 12.92 : s = Math.pow((e + 0.055) / 1.055, 2.4), r <= 0.03928 ? i = r / 12.92 : i = Math.pow((r + 0.055) / 1.055, 2.4), 0.2126 * l + 0.7152 * s + 0.0722 * i;
  },
  setAlpha: function(a) {
    return this._a = Ae(a), this._roundA = Math.round(100 * this._a) / 100, this;
  },
  toHsv: function() {
    var a = de(this._r, this._g, this._b);
    return {
      h: a.h * 360,
      s: a.s,
      v: a.v,
      a: this._a
    };
  },
  toHsvString: function() {
    var a = de(this._r, this._g, this._b), t = Math.round(a.h * 360), e = Math.round(a.s * 100), r = Math.round(a.v * 100);
    return this._a == 1 ? "hsv(" + t + ", " + e + "%, " + r + "%)" : "hsva(" + t + ", " + e + "%, " + r + "%, " + this._roundA + ")";
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
    var a = ce(this._r, this._g, this._b), t = Math.round(a.h * 360), e = Math.round(a.s * 100), r = Math.round(a.l * 100);
    return this._a == 1 ? "hsl(" + t + ", " + e + "%, " + r + "%)" : "hsla(" + t + ", " + e + "%, " + r + "%, " + this._roundA + ")";
  },
  toHex: function(a) {
    return fe(this._r, this._g, this._b, a);
  },
  toHexString: function(a) {
    return "#" + this.toHex(a);
  },
  toHex8: function(a) {
    return Oe(this._r, this._g, this._b, this._a, a);
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
      r: Math.round(y(this._r, 255) * 100) + "%",
      g: Math.round(y(this._g, 255) * 100) + "%",
      b: Math.round(y(this._b, 255) * 100) + "%",
      a: this._a
    };
  },
  toPercentageRgbString: function() {
    return this._a == 1 ? "rgb(" + Math.round(y(this._r, 255) * 100) + "%, " + Math.round(y(this._g, 255) * 100) + "%, " + Math.round(y(this._b, 255) * 100) + "%)" : "rgba(" + Math.round(y(this._r, 255) * 100) + "%, " + Math.round(y(this._g, 255) * 100) + "%, " + Math.round(y(this._b, 255) * 100) + "%, " + this._roundA + ")";
  },
  toName: function() {
    return this._a === 0 ? "transparent" : this._a < 1 ? !1 : et[fe(this._r, this._g, this._b, !0)] || !1;
  },
  toFilter: function(a) {
    var t = "#" + he(this._r, this._g, this._b, this._a), e = t, r = this._gradientType ? "GradientType = 1, " : "";
    if (a) {
      var l = c(a);
      e = "#" + he(l._r, l._g, l._b, l._a);
    }
    return "progid:DXImageTransform.Microsoft.gradient(" + r + "startColorstr=" + t + ",endColorstr=" + e + ")";
  },
  toString: function(a) {
    var t = !!a;
    a = a || this._format;
    var e = !1, r = this._a < 1 && this._a >= 0, l = !t && r && (a === "hex" || a === "hex6" || a === "hex3" || a === "hex4" || a === "hex8" || a === "name");
    return l ? a === "name" && this._a === 0 ? this.toName() : this.toRgbString() : (a === "rgb" && (e = this.toRgbString()), a === "prgb" && (e = this.toPercentageRgbString()), (a === "hex" || a === "hex6") && (e = this.toHexString()), a === "hex3" && (e = this.toHexString(!0)), a === "hex4" && (e = this.toHex8String(!0)), a === "hex8" && (e = this.toHex8String()), a === "name" && (e = this.toName()), a === "hsl" && (e = this.toHslString()), a === "hsv" && (e = this.toHsvString()), e || this.toHexString());
  },
  clone: function() {
    return c(this.toString());
  },
  _applyModification: function(a, t) {
    var e = a.apply(null, [this].concat([].slice.call(t)));
    return this._r = e._r, this._g = e._g, this._b = e._b, this.setAlpha(e._a), this;
  },
  lighten: function() {
    return this._applyModification(je, arguments);
  },
  brighten: function() {
    return this._applyModification(Xe, arguments);
  },
  darken: function() {
    return this._applyModification(Ke, arguments);
  },
  desaturate: function() {
    return this._applyModification(Ue, arguments);
  },
  saturate: function() {
    return this._applyModification(ze, arguments);
  },
  greyscale: function() {
    return this._applyModification(qe, arguments);
  },
  spin: function() {
    return this._applyModification(Ye, arguments);
  },
  _applyCombination: function(a, t) {
    return a.apply(null, [this].concat([].slice.call(t)));
  },
  analogous: function() {
    return this._applyCombination(Je, arguments);
  },
  complement: function() {
    return this._applyCombination(We, arguments);
  },
  monochromatic: function() {
    return this._applyCombination(Qe, arguments);
  },
  splitcomplement: function() {
    return this._applyCombination(Ze, arguments);
  },
  // Disabled until https://github.com/bgrins/TinyColor/issues/254
  // polyad: function (number) {
  //   return this._applyCombination(polyad, [number]);
  // },
  triad: function() {
    return this._applyCombination(pe, [3]);
  },
  tetrad: function() {
    return this._applyCombination(pe, [4]);
  }
};
c.fromRatio = function(n, a) {
  if (Z(n) == "object") {
    var t = {};
    for (var e in n)
      n.hasOwnProperty(e) && (e === "a" ? t[e] = n[e] : t[e] = U(n[e]));
    n = t;
  }
  return c(n, a);
};
function De(n) {
  var a = {
    r: 0,
    g: 0,
    b: 0
  }, t = 1, e = null, r = null, l = null, s = !1, i = !1;
  return typeof n == "string" && (n = rt(n)), Z(n) == "object" && (I(n.r) && I(n.g) && I(n.b) ? (a = Ge(n.r, n.g, n.b), s = !0, i = String(n.r).substr(-1) === "%" ? "prgb" : "rgb") : I(n.h) && I(n.s) && I(n.v) ? (e = U(n.s), r = U(n.v), a = Te(n.h, e, r), s = !0, i = "hsv") : I(n.h) && I(n.s) && I(n.l) && (e = U(n.s), l = U(n.l), a = Ne(n.h, e, l), s = !0, i = "hsl"), n.hasOwnProperty("a") && (t = n.a)), t = Ae(t), {
    ok: s,
    format: n.format || i,
    r: Math.min(255, Math.max(a.r, 0)),
    g: Math.min(255, Math.max(a.g, 0)),
    b: Math.min(255, Math.max(a.b, 0)),
    a: t
  };
}
function Ge(n, a, t) {
  return {
    r: y(n, 255) * 255,
    g: y(a, 255) * 255,
    b: y(t, 255) * 255
  };
}
function ce(n, a, t) {
  n = y(n, 255), a = y(a, 255), t = y(t, 255);
  var e = Math.max(n, a, t), r = Math.min(n, a, t), l, s, i = (e + r) / 2;
  if (e == r)
    l = s = 0;
  else {
    var o = e - r;
    switch (s = i > 0.5 ? o / (2 - e - r) : o / (e + r), e) {
      case n:
        l = (a - t) / o + (a < t ? 6 : 0);
        break;
      case a:
        l = (t - n) / o + 2;
        break;
      case t:
        l = (n - a) / o + 4;
        break;
    }
    l /= 6;
  }
  return {
    h: l,
    s,
    l: i
  };
}
function Ne(n, a, t) {
  var e, r, l;
  n = y(n, 360), a = y(a, 100), t = y(t, 100);
  function s(u, p, b) {
    return b < 0 && (b += 1), b > 1 && (b -= 1), b < 1 / 6 ? u + (p - u) * 6 * b : b < 1 / 2 ? p : b < 2 / 3 ? u + (p - u) * (2 / 3 - b) * 6 : u;
  }
  if (a === 0)
    e = r = l = t;
  else {
    var i = t < 0.5 ? t * (1 + a) : t + a - t * a, o = 2 * t - i;
    e = s(o, i, n + 1 / 3), r = s(o, i, n), l = s(o, i, n - 1 / 3);
  }
  return {
    r: e * 255,
    g: r * 255,
    b: l * 255
  };
}
function de(n, a, t) {
  n = y(n, 255), a = y(a, 255), t = y(t, 255);
  var e = Math.max(n, a, t), r = Math.min(n, a, t), l, s, i = e, o = e - r;
  if (s = e === 0 ? 0 : o / e, e == r)
    l = 0;
  else {
    switch (e) {
      case n:
        l = (a - t) / o + (a < t ? 6 : 0);
        break;
      case a:
        l = (t - n) / o + 2;
        break;
      case t:
        l = (n - a) / o + 4;
        break;
    }
    l /= 6;
  }
  return {
    h: l,
    s,
    v: i
  };
}
function Te(n, a, t) {
  n = y(n, 360) * 6, a = y(a, 100), t = y(t, 100);
  var e = Math.floor(n), r = n - e, l = t * (1 - a), s = t * (1 - r * a), i = t * (1 - (1 - r) * a), o = e % 6, u = [t, s, l, l, i, t][o], p = [i, t, t, s, l, l][o], b = [l, l, i, t, t, s][o];
  return {
    r: u * 255,
    g: p * 255,
    b: b * 255
  };
}
function fe(n, a, t, e) {
  var r = [V(Math.round(n).toString(16)), V(Math.round(a).toString(16)), V(Math.round(t).toString(16))];
  return e && r[0].charAt(0) == r[0].charAt(1) && r[1].charAt(0) == r[1].charAt(1) && r[2].charAt(0) == r[2].charAt(1) ? r[0].charAt(0) + r[1].charAt(0) + r[2].charAt(0) : r.join("");
}
function Oe(n, a, t, e, r) {
  var l = [V(Math.round(n).toString(16)), V(Math.round(a).toString(16)), V(Math.round(t).toString(16)), V(He(e))];
  return r && l[0].charAt(0) == l[0].charAt(1) && l[1].charAt(0) == l[1].charAt(1) && l[2].charAt(0) == l[2].charAt(1) && l[3].charAt(0) == l[3].charAt(1) ? l[0].charAt(0) + l[1].charAt(0) + l[2].charAt(0) + l[3].charAt(0) : l.join("");
}
function he(n, a, t, e) {
  var r = [V(He(e)), V(Math.round(n).toString(16)), V(Math.round(a).toString(16)), V(Math.round(t).toString(16))];
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
function Ue(n, a) {
  a = a === 0 ? 0 : a || 10;
  var t = c(n).toHsl();
  return t.s -= a / 100, t.s = Q(t.s), c(t);
}
function ze(n, a) {
  a = a === 0 ? 0 : a || 10;
  var t = c(n).toHsl();
  return t.s += a / 100, t.s = Q(t.s), c(t);
}
function qe(n) {
  return c(n).desaturate(100);
}
function je(n, a) {
  a = a === 0 ? 0 : a || 10;
  var t = c(n).toHsl();
  return t.l += a / 100, t.l = Q(t.l), c(t);
}
function Xe(n, a) {
  a = a === 0 ? 0 : a || 10;
  var t = c(n).toRgb();
  return t.r = Math.max(0, Math.min(255, t.r - Math.round(255 * -(a / 100)))), t.g = Math.max(0, Math.min(255, t.g - Math.round(255 * -(a / 100)))), t.b = Math.max(0, Math.min(255, t.b - Math.round(255 * -(a / 100)))), c(t);
}
function Ke(n, a) {
  a = a === 0 ? 0 : a || 10;
  var t = c(n).toHsl();
  return t.l -= a / 100, t.l = Q(t.l), c(t);
}
function Ye(n, a) {
  var t = c(n).toHsl(), e = (t.h + a) % 360;
  return t.h = e < 0 ? 360 + e : e, c(t);
}
function We(n) {
  var a = c(n).toHsl();
  return a.h = (a.h + 180) % 360, c(a);
}
function pe(n, a) {
  if (isNaN(a) || a <= 0)
    throw new Error("Argument to polyad must be a positive number");
  for (var t = c(n).toHsl(), e = [c(n)], r = 360 / a, l = 1; l < a; l++)
    e.push(c({
      h: (t.h + l * r) % 360,
      s: t.s,
      l: t.l
    }));
  return e;
}
function Ze(n) {
  var a = c(n).toHsl(), t = a.h;
  return [c(n), c({
    h: (t + 72) % 360,
    s: a.s,
    l: a.l
  }), c({
    h: (t + 216) % 360,
    s: a.s,
    l: a.l
  })];
}
function Je(n, a, t) {
  a = a || 6, t = t || 30;
  var e = c(n).toHsl(), r = 360 / t, l = [c(n)];
  for (e.h = (e.h - (r * a >> 1) + 720) % 360; --a; )
    e.h = (e.h + r) % 360, l.push(c(e));
  return l;
}
function Qe(n, a) {
  a = a || 6;
  for (var t = c(n).toHsv(), e = t.h, r = t.s, l = t.v, s = [], i = 1 / a; a--; )
    s.push(c({
      h: e,
      s: r,
      v: l
    })), l = (l + i) % 1;
  return s;
}
c.mix = function(n, a, t) {
  t = t === 0 ? 0 : t || 50;
  var e = c(n).toRgb(), r = c(a).toRgb(), l = t / 100, s = {
    r: (r.r - e.r) * l + e.r,
    g: (r.g - e.g) * l + e.g,
    b: (r.b - e.b) * l + e.b,
    a: (r.a - e.a) * l + e.a
  };
  return c(s);
};
c.readability = function(n, a) {
  var t = c(n), e = c(a);
  return (Math.max(t.getLuminance(), e.getLuminance()) + 0.05) / (Math.min(t.getLuminance(), e.getLuminance()) + 0.05);
};
c.isReadable = function(n, a, t) {
  var e = c.readability(n, a), r, l;
  switch (l = !1, r = lt(t), r.level + r.size) {
    case "AAsmall":
    case "AAAlarge":
      l = e >= 4.5;
      break;
    case "AAlarge":
      l = e >= 3;
      break;
    case "AAAsmall":
      l = e >= 7;
      break;
  }
  return l;
};
c.mostReadable = function(n, a, t) {
  var e = null, r = 0, l, s, i, o;
  t = t || {}, s = t.includeFallbackColors, i = t.level, o = t.size;
  for (var u = 0; u < a.length; u++)
    l = c.readability(n, a[u]), l > r && (r = l, e = c(a[u]));
  return c.isReadable(n, e, {
    level: i,
    size: o
  }) || !s ? e : (t.includeFallbackColors = !1, c.mostReadable(n, ["#fff", "#000"], t));
};
var re = c.names = {
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
}, et = c.hexNames = tt(re);
function tt(n) {
  var a = {};
  for (var t in n)
    n.hasOwnProperty(t) && (a[n[t]] = t);
  return a;
}
function Ae(n) {
  return n = parseFloat(n), (isNaN(n) || n < 0 || n > 1) && (n = 1), n;
}
function y(n, a) {
  at(n) && (n = "100%");
  var t = nt(n);
  return n = Math.min(a, Math.max(0, parseFloat(n))), t && (n = parseInt(n * a, 10) / 100), Math.abs(n - a) < 1e-6 ? 1 : n % a / parseFloat(a);
}
function Q(n) {
  return Math.min(1, Math.max(0, n));
}
function M(n) {
  return parseInt(n, 16);
}
function at(n) {
  return typeof n == "string" && n.indexOf(".") != -1 && parseFloat(n) === 1;
}
function nt(n) {
  return typeof n == "string" && n.indexOf("%") != -1;
}
function V(n) {
  return n.length == 1 ? "0" + n : "" + n;
}
function U(n) {
  return n <= 1 && (n = n * 100 + "%"), n;
}
function He(n) {
  return Math.round(parseFloat(n) * 255).toString(16);
}
function be(n) {
  return M(n) / 255;
}
var B = function() {
  var n = "[-\\+]?\\d+%?", a = "[-\\+]?\\d*\\.\\d+%?", t = "(?:" + a + ")|(?:" + n + ")", e = "[\\s|\\(]+(" + t + ")[,|\\s]+(" + t + ")[,|\\s]+(" + t + ")\\s*\\)?", r = "[\\s|\\(]+(" + t + ")[,|\\s]+(" + t + ")[,|\\s]+(" + t + ")[,|\\s]+(" + t + ")\\s*\\)?";
  return {
    CSS_UNIT: new RegExp(t),
    rgb: new RegExp("rgb" + e),
    rgba: new RegExp("rgba" + r),
    hsl: new RegExp("hsl" + e),
    hsla: new RegExp("hsla" + r),
    hsv: new RegExp("hsv" + e),
    hsva: new RegExp("hsva" + r),
    hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
    hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
  };
}();
function I(n) {
  return !!B.CSS_UNIT.exec(n);
}
function rt(n) {
  n = n.replace(Le, "").replace(Pe, "").toLowerCase();
  var a = !1;
  if (re[n])
    n = re[n], a = !0;
  else if (n == "transparent")
    return {
      r: 0,
      g: 0,
      b: 0,
      a: 0,
      format: "name"
    };
  var t;
  return (t = B.rgb.exec(n)) ? {
    r: t[1],
    g: t[2],
    b: t[3]
  } : (t = B.rgba.exec(n)) ? {
    r: t[1],
    g: t[2],
    b: t[3],
    a: t[4]
  } : (t = B.hsl.exec(n)) ? {
    h: t[1],
    s: t[2],
    l: t[3]
  } : (t = B.hsla.exec(n)) ? {
    h: t[1],
    s: t[2],
    l: t[3],
    a: t[4]
  } : (t = B.hsv.exec(n)) ? {
    h: t[1],
    s: t[2],
    v: t[3]
  } : (t = B.hsva.exec(n)) ? {
    h: t[1],
    s: t[2],
    v: t[3],
    a: t[4]
  } : (t = B.hex8.exec(n)) ? {
    r: M(t[1]),
    g: M(t[2]),
    b: M(t[3]),
    a: be(t[4]),
    format: a ? "name" : "hex8"
  } : (t = B.hex6.exec(n)) ? {
    r: M(t[1]),
    g: M(t[2]),
    b: M(t[3]),
    format: a ? "name" : "hex"
  } : (t = B.hex4.exec(n)) ? {
    r: M(t[1] + "" + t[1]),
    g: M(t[2] + "" + t[2]),
    b: M(t[3] + "" + t[3]),
    a: be(t[4] + "" + t[4]),
    format: a ? "name" : "hex8"
  } : (t = B.hex3.exec(n)) ? {
    r: M(t[1] + "" + t[1]),
    g: M(t[2] + "" + t[2]),
    b: M(t[3] + "" + t[3]),
    format: a ? "name" : "hex"
  } : !1;
}
function lt(n) {
  var a, t;
  return n = n || {
    level: "AA",
    size: "small"
  }, a = (n.level || "AA").toUpperCase(), t = (n.size || "small").toLowerCase(), a !== "AA" && a !== "AAA" && (a = "AA"), t !== "small" && t !== "large" && (t = "small"), {
    level: a,
    size: t
  };
}
const ve = (n, a, t = !1) => {
  if (t)
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
    let e = a;
    a === "hex" && n.getAlpha() < 1 && (e = "hex8");
    let r = n.toString(e);
    try {
      r = JSON.parse(r);
    } catch {
    }
    return r;
  }
}, ae = (n, a) => !!(Object.prototype.hasOwnProperty.call(n, a) && typeof n[a] < "u"), Y = (n) => typeof n > "u", H = ["update:tinyColor", "update:modelValue", "input"];
function $(n, a, t) {
  let e, r;
  const l = f({
    get: () => {
      const { modelValue: i, tinyColor: o, value: u } = n, p = o ?? i ?? u;
      return Y(r) && (Y(u) || (r = c(u).getFormat()), Y(i) || (r = c(i).getFormat())), Y(e) && (typeof u == "object" && !(u instanceof c) && (e = !0), typeof i == "object" && (e = !0)), c(p);
    },
    set: (i) => {
      s(i);
    }
  }), s = (i) => {
    const o = c(i);
    if (ae(n, "tinyColor") && a("update:tinyColor", o), ae(n, "modelValue")) {
      const u = ve(o, r, e);
      a("update:modelValue", u);
    }
    if (ae(n, "value")) {
      const u = ve(o, r, e);
      a("input", u);
    }
  };
  return l;
}
const $e = (n) => {
  var t, e, r, l;
  const a = { x: 0, y: 0 };
  return n instanceof MouseEvent && (a.x = n.pageX, a.y = n.pageY), typeof TouchEvent < "u" && n instanceof TouchEvent && (a.x = (t = n.touches) != null && t[0] ? n.touches[0].pageX : (e = n.changedTouches) != null && e[0] ? n.changedTouches[0].pageX : 0, a.y = (r = n.touches) != null && r[0] ? n.touches[0].pageY : (l = n.changedTouches) != null && l[0] ? n.changedTouches[0].pageY : 0), a;
}, st = () => {
  const n = window.scrollX || window.pageXOffset || document.documentElement.scrollLeft || 0, a = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
  return { x: n, y: a };
}, Me = (n) => {
  const { x: a, y: t } = st(), e = n.getBoundingClientRect();
  return {
    x: e.left + a,
    y: e.top + t
  };
}, se = (n) => n.code === "ArrowUp" || n.keyCode === 38 ? "up" : n.code === "ArrowDown" || n.keyCode === 40 ? "down" : n.code === "ArrowLeft" || n.keyCode === 37 ? "left" : n.code === "ArrowRight" || n.keyCode === 39 ? "right" : null;
function it(n) {
  const a = n.toString();
  return a.indexOf(".") !== -1 ? a.split(".")[1].length : 0;
}
function ne(n, a, t) {
  return Math.min(Math.max(n, a), t);
}
const Ee = (n, a = 20) => {
  let t, e, r;
  return (...l) => {
    t ? (clearTimeout(e), e = setTimeout(() => {
      Date.now() - r >= a && (n(...l), r = Date.now());
    }, Math.max(a - (Date.now() - r), 0))) : (n(...l), r = Date.now(), t = !0);
  };
}, ot = /* @__PURE__ */ S({
  __name: "SaturationSlider",
  props: {
    hue: null,
    tinyColor: null,
    modelValue: null,
    value: null
  },
  emits: ["change"].concat(H),
  setup(n, { emit: a }) {
    const t = n, e = E(0), r = $(t, a), l = f(() => r.value.toHsv()), s = f(() => t.hue ?? l.value.h), i = f(() => `hsl(${s.value}, 100%, 50%)`), o = f(() => -(l.value.v * 100) + 1 + 100 + "%"), u = f(() => l.value.v <= 0.01 ? e.value * 100 + "%" : l.value.s * 100 + "%"), p = E(null);
    function b(h) {
      const v = p.value;
      if (!v)
        return;
      const F = v.clientWidth, T = v.clientHeight, { x: X, y: g } = Me(v), { x, y: w } = $e(h), K = ne(x - X, 0, F), O = ne(w - g, 0, T), ue = K / F, Ie = ne(1 - O / T, 0, 1);
      e.value = ue;
      let ee = Math.round(ue * 100), te = Math.round(Ie * 100);
      ee === 1 && (ee = 0.01), te === 1 && (te = 0.01), m({
        h: s.value,
        s: ee,
        v: te,
        a: l.value.a
      });
    }
    function m(h) {
      r.value = h;
    }
    const d = Ee(b, 20);
    function k(h) {
      h.preventDefault(), h.type.startsWith("mouse") ? (window.addEventListener("mousemove", d), window.addEventListener("mouseup", d), window.addEventListener("mouseup", C)) : h.type.startsWith("touch") && (window.addEventListener("touchmove", d), window.addEventListener("touchend", d), window.addEventListener("touchend", C));
    }
    function C() {
      A();
    }
    function A() {
      window.removeEventListener("mousemove", d), window.removeEventListener("mouseup", d), window.removeEventListener("mouseup", C), window.removeEventListener("touchmove", d), window.removeEventListener("touchend", d), window.removeEventListener("touchend", C);
    }
    function _(h) {
      switch (h.preventDefault(), se(h)) {
        case "left": {
          const F = l.value.s - 0.01;
          m({
            ...l.value,
            s: F >= 0 ? F : 0
          });
          break;
        }
        case "right": {
          const F = l.value.s + 0.01;
          m({
            ...l.value,
            s: F > 1 ? 1 : F
          });
          break;
        }
        case "up": {
          const F = l.value.v + 0.01;
          m({
            ...l.value,
            v: F > 1 ? 1 : F
          });
          break;
        }
        case "down": {
          const F = l.value.v - 0.01;
          m({
            ...l.value,
            v: F < 0 ? 0 : F
          });
          break;
        }
      }
    }
    return Fe(() => {
      A();
    }), { __sfc: !0, emit: a, props: t, pointerLeftRef: e, tinyColorRef: r, hsv: l, hue: s, bgColor: i, pointerTop: o, pointerLeft: u, containerRef: p, handleChange: b, onChange: m, throttledHandleChange: d, handleMouseDown: k, handleMouseUp: C, unbindEventListeners: A, handleKeyDown: _ };
  }
});
function R(n, a, t, e, r, l, s, i) {
  var o = typeof n == "function" ? n.options : n;
  return a && (o.render = a, o.staticRenderFns = t, o._compiled = !0), l && (o._scopeId = "data-v-" + l), {
    exports: n,
    options: o
  };
}
var ut = function() {
  var a = this, t = a._self._c, e = a._self._setupProxy;
  return t("div", { ref: "containerRef", staticClass: "vc-saturation-slider bg", style: { background: e.bgColor }, attrs: { role: "application", "aria-label": "Saturation and brightness picker" }, on: { mousedown: e.handleMouseDown, touchstart: e.handleMouseDown } }, [t("div", { staticClass: "bg white" }), t("div", { staticClass: "bg black" }), t("div", { staticClass: "picker-wrap", style: { top: e.pointerTop, left: e.pointerLeft }, attrs: { role: "slider", tabindex: "0", "aria-valuemin": "0", "aria-valuemax": "1", "aria-label": "press arrow to change saturation or brightness", "aria-valuenow": "?", "aria-valuetext": `saturation: ${e.hsv.s.toFixed(0)}%, brightness: ${e.hsv.v.toFixed(0)}%` }, on: { keydown: e.handleKeyDown } }, [t("div", { staticClass: "picker" })])]);
}, ct = [], dt = /* @__PURE__ */ R(
  ot,
  ut,
  ct,
  !1,
  null,
  "45ce5659"
);
const ie = dt.exports, le = (n) => typeof n < "u", ft = /* @__PURE__ */ S({
  __name: "BaseSlider",
  props: {
    direction: { default: "horizontal" },
    modelValue: { default: 0 },
    value: { default: 0 },
    max: { default: 100 },
    step: null,
    ariaLabel: { default: "slider" }
  },
  emits: ["input", "update:modelValue"],
  setup(n, { emit: a }) {
    const t = n, e = f(() => t.modelValue ?? t.value), r = f(() => {
      let d = e.value / t.max;
      return t.direction === "vertical" && (d = 1 - d), 100 * d + "%";
    }), l = E(null);
    function s(d) {
      le(d) && (a("input", d), a("update:modelValue", d));
    }
    function i(d) {
      const { direction: k, max: C } = t, A = l.value;
      if (!A)
        return;
      const _ = A.clientWidth, h = A.clientHeight, { x: v, y: F } = Me(A), { x: T, y: X } = $e(d), g = T - v, x = X - F;
      let w;
      k === "vertical" ? x < 0 ? w = C : x > h ? w = 0 : w = (1 - x / h) * C : g < 0 ? w = 0 : g > _ ? w = C : w = g / _ * C, s(w);
    }
    const o = Ee(i);
    function u(d) {
      i(d), d.type.startsWith("mouse") ? (window.addEventListener("mousemove", o), window.addEventListener("mouseup", p)) : (window.addEventListener("touchmove", o), window.addEventListener("touchend", p));
    }
    function p() {
      b();
    }
    function b() {
      window.removeEventListener("mousemove", o), window.removeEventListener("mouseup", p), window.removeEventListener("touchmove", o), window.removeEventListener("touchend", p);
    }
    function m(d) {
      d.preventDefault();
      const { direction: k, max: C } = t, A = se(d), _ = t.step ?? C / 100, h = e.value;
      let v;
      switch (A) {
        case "left": {
          if (k !== "horizontal")
            return;
          v = h - _ < 0 ? 0 : h - _;
          break;
        }
        case "right": {
          if (k !== "horizontal")
            return;
          v = h + _ > C ? C : h + _;
          break;
        }
        case "down": {
          if (k !== "vertical")
            return;
          v = h - _ < 0 ? 0 : h - _;
          break;
        }
        case "up": {
          if (k !== "vertical")
            return;
          v = h + _ > C ? C : h + _;
          break;
        }
      }
      s(v);
    }
    return Fe(() => {
      b();
    }), { __sfc: !0, props: t, emit: a, currentValue: e, positionPortion: r, containerRef: l, emitChange: s, handleChange: i, throttledHandleChange: o, handleMouseDown: u, handleMouseUp: p, unbindEventListeners: b, handleKeydown: m };
  }
});
var ht = function() {
  var a = this, t = a._self._c, e = a._self._setupProxy;
  return t("div", { staticClass: "vc-base-slider" }, [a.$slots.background ? t("div", { staticClass: "background" }, [a._t("background")], 2) : a._e(), t("div", { ref: "containerRef", class: {
    slider: !0,
    horizontal: a.direction === "horizontal",
    vertical: a.direction === "vertical"
  }, attrs: { role: "slider", "aria-label": a.ariaLabel, "aria-valuemax": a.max, "aria-valuemin": "0", "aria-valuenow": e.currentValue.toFixed(1), tabindex: "0" }, on: { mousedown: e.handleMouseDown, touchstart: e.handleMouseDown, keydown: e.handleKeydown } }, [t("div", { staticClass: "picker-wrap", style: {
    left: a.direction === "horizontal" ? e.positionPortion : 0,
    top: a.direction === "vertical" ? e.positionPortion : 0
  }, attrs: { role: "presentation" } }, [a._t("picker", function() {
    return [t("div", { staticClass: "picker" })];
  })], 2)])]);
}, pt = [], bt = /* @__PURE__ */ R(
  ft,
  ht,
  pt,
  !1,
  null,
  "67691495"
);
const q = bt.exports, vt = /* @__PURE__ */ S({
  __name: "HueSlider",
  props: {
    direction: { default: "horizontal" },
    modelValue: { default: 0 }
  },
  emits: ["update:modelValue"],
  setup(n, { emit: a }) {
    const t = n;
    z((u, p) => ({
      "42f361a1": p.gradientBg
    }));
    const e = f(() => `linear-gradient(to ${t.direction === "horizontal" ? "right" : "top"}, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)`), r = f(() => {
      const u = Number(t.modelValue);
      return Number.isNaN(u) ? 0 : u;
    }), l = E();
    J(r, (u, p) => {
      u !== 0 && u - p > 0 && (l.value = "right"), u !== 0 && u - p < 0 && (l.value = "left");
    });
    const s = f(() => t.direction === "vertical" ? r.value === 0 && l.value === "right" ? 0 : r.value : t.direction === "horizontal" ? r.value === 0 && l.value === "right" ? 360 : r.value : 0);
    function i(u) {
      o(Math.round(u));
    }
    function o(u) {
      a("update:modelValue", u);
    }
    return { __sfc: !0, props: t, emit: a, gradientBg: e, hue: r, pullDirection: l, sliderValue: s, handleChange: i, emitChange: o, BaseSlider: q };
  }
});
var gt = function() {
  var a = this, t = a._self._c, e = a._self._setupProxy;
  return t(e.BaseSlider, { staticClass: "vc-hue-slider", attrs: { max: 360, step: 1, modelValue: e.sliderValue, direction: a.direction, "aria-label": "Hue" }, on: { "update:modelValue": e.handleChange }, scopedSlots: a._u([{ key: "background", fn: function() {
    return [t("div", { staticClass: "gradient" })];
  }, proxy: !0 }, { key: "picker", fn: function() {
    return [a._t("default")];
  }, proxy: !0 }], null, !0) });
}, _t = [], mt = /* @__PURE__ */ R(
  vt,
  gt,
  _t,
  !1,
  null,
  "e997a65d"
);
const D = mt.exports, Ct = /* @__PURE__ */ S({
  __name: "CheckerboardBG",
  props: {
    size: { default: 8 },
    white: { default: "#fff" },
    grey: { default: "#e6e6e6" }
  },
  setup(n) {
    const a = n;
    function t(l, s, i) {
      if (typeof document > "u")
        return null;
      var o = document.createElement("canvas");
      o.width = o.height = i * 2;
      var u = o.getContext("2d");
      return u ? (u.fillStyle = l, u.fillRect(0, 0, o.width, o.height), u.fillStyle = s, u.fillRect(0, 0, i, i), u.translate(i, i), u.fillRect(0, 0, i, i), o.toDataURL()) : null;
    }
    function e(l, s, i) {
      return t(l, s, i);
    }
    const r = f(() => `url(${e(a.white, a.grey, a.size)})`);
    return { __sfc: !0, props: a, renderCheckerboard: t, getCheckerboard: e, backgroundImage: r };
  }
});
var yt = function() {
  var a = this, t = a._self._c, e = a._self._setupProxy;
  return t("div", { staticClass: "vc-checkerboard", style: { backgroundImage: e.backgroundImage } });
}, xt = [], kt = /* @__PURE__ */ R(
  Ct,
  yt,
  xt,
  !1,
  null,
  "9ab5bcdd"
);
const oe = kt.exports, wt = /* @__PURE__ */ S({
  __name: "AlphaSlider",
  props: {
    tinyColor: null,
    modelValue: null,
    value: null
  },
  emits: H,
  setup(n, { emit: a }) {
    const t = n, e = $(t, a), r = f(() => {
      const i = e.value.toRgb(), o = [i.r, i.g, i.b].join(",");
      return "linear-gradient(to right, rgba(" + o + ", 0) 0%, rgba(" + o + ", 1) 100%)";
    }), l = f(() => e.value.getAlpha());
    function s(i) {
      e.value = e.value.setAlpha(i).clone();
    }
    return { __sfc: !0, props: t, emit: a, colorRef: e, gradientColor: r, alpha: l, handleChange: s, Checkerboard: oe, BaseSlider: q };
  }
});
var St = function() {
  var a = this, t = a._self._c, e = a._self._setupProxy;
  return t(e.BaseSlider, { staticClass: "vc-alpha-slider", attrs: { modelValue: e.alpha, max: 1, "aria-label": "Transparency" }, on: { "update:modelValue": e.handleChange }, scopedSlots: a._u([{ key: "background", fn: function() {
    return [t(e.Checkerboard), t("div", { staticClass: "gradient", style: { background: e.gradientColor } })];
  }, proxy: !0 }]) });
}, Rt = [], Ft = /* @__PURE__ */ R(
  wt,
  St,
  Rt,
  !1,
  null,
  "2b852c76"
);
const G = Ft.exports, At = /* @__PURE__ */ S({
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
    const t = n, e = ((o = t.a11y) == null ? void 0 : o.label) ?? t.label, r = `input__label__${e}__${Math.random().toString().slice(2, 5)}`;
    function l(u) {
      const { min: p, max: b } = t;
      if (le(b) && +u > b) {
        a("change", b);
        return;
      }
      if (le(p) && +u < p) {
        a("change", p);
        return;
      }
      a("change", u);
    }
    function s(u) {
      var p;
      l((p = u.target) == null ? void 0 : p.value);
    }
    function i(u) {
      let p = Number(t.value);
      if (!isNaN(p)) {
        let b = t.step;
        const m = it(b), d = se(u);
        d === "up" && (l((p + b).toFixed(m)), u.preventDefault()), d === "down" && (l((p - b).toFixed(m)), u.preventDefault());
      }
    }
    return { __sfc: !0, props: t, emit: a, ariaLabel: e, labelId: r, update: l, handleInput: s, handleKeyDown: i };
  }
});
var Ht = function() {
  var a = this, t = a._self._c, e = a._self._setupProxy;
  return t("div", { staticClass: "vc-editable-input" }, [t("input", { staticClass: "vc-input-input", attrs: { "aria-label": e.ariaLabel, id: e.labelId }, domProps: { value: e.props.value }, on: { keydown: e.handleKeyDown, input: e.handleInput } }), t("label", { staticClass: "vc-input-label", attrs: { for: e.labelId, "aria-hidden": "true" } }, [a._v(a._s(e.props.label))]), a.desc ? t("span", { staticClass: "vc-input-desc", attrs: { "aria-hidden": "true" } }, [a._v(a._s(a.desc))]) : a._e()]);
}, $t = [], Mt = /* @__PURE__ */ R(
  At,
  Ht,
  $t,
  !1,
  null,
  "6f1420ca"
);
const L = Mt.exports;
function Et() {
  const n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return n.charAt(Math.floor(Math.random() * n.length)) + n.charAt(Math.floor(Math.random() * n.length));
}
const N = (n) => {
  const a = E(0), t = `__from__vc__hue__${Et()}`;
  return J(n, (r) => {
    if (r[t])
      return;
    const l = r.toHsl().h;
    l === 0 && a.value !== 0 || (a.value = l);
  }, { immediate: !0 }), { hueRef: a, updateHueRef: (r) => {
    const l = c({
      ...n.value.toHsl(),
      h: r
    });
    l[t] = !0, n.value = l, a.value = r;
  } };
}, j = (n) => c(n).isValid(), Bt = (n) => c(n).getAlpha() === 0, Vt = /* @__PURE__ */ S({
  __name: "ChromePicker",
  props: {
    disableAlpha: { type: Boolean },
    disableFields: { type: Boolean },
    formats: { default: () => ["rgb", "hex", "hsl"] },
    tinyColor: null,
    modelValue: null,
    value: null
  },
  emits: H,
  setup(n, { emit: a }) {
    const t = n, e = $(t, a), { hueRef: r, updateHueRef: l } = N(e), s = E(0);
    let i = E(!1);
    const o = f(() => {
      const g = e.value.toRgb();
      return "rgba(" + [g.r, g.g, g.b, e.value.getAlpha()].join(",") + ")";
    }), u = f(() => {
      const { h: g, s: x, l: w } = e.value.toHsl();
      return {
        h: g.toFixed(),
        s: `${(x * 100).toFixed()}%`,
        l: `${(w * 100).toFixed()}%`
      };
    }), p = f(() => e.value.toRgb()), b = f(() => Number(e.value.getAlpha().toFixed(2))), m = /* @__PURE__ */ new Set(["hex", "hsl", "rgb"]), d = f(() => {
      const g = /* @__PURE__ */ new Set(), x = [], w = t.formats;
      for (const K of w)
        if (m.has(K)) {
          const O = K;
          g.has(O) || (g.add(O), x.push(O));
        }
      return x;
    }), k = f(() => {
      const { disableFields: g, formats: x } = t;
      return !(g === !0 || !Array.isArray(x) || d.value.length === 0);
    });
    return { __sfc: !0, props: t, emit: a, tinyColorRef: e, hueRef: r, updateHueRef: l, fieldsIndex: s, highlight: i, activeColor: o, hsl: u, rgb: p, alpha: b, VALID_FORMATS: m, normalizedFormats: d, showFields: k, isSupportedFormat: (g) => d.value.includes(g), getFormatIndex: (g) => d.value.indexOf(g), inputChangeHex: (g) => {
      g && j(g) && (e.value = g);
    }, inputChangeRGBA: (g, x) => {
      if (!x || isNaN(Number(x)))
        return;
      const w = { [g]: x };
      e.value = {
        ...p.value,
        a: b.value,
        ...w
      };
    }, inputChangeHSLA: (g, x) => {
      if (!x)
        return;
      const w = { [g]: +x };
      (g === "s" || g === "l") && (w[g] = +x.replace("%", "") / 100), e.value = {
        ...e.value.toHsl(),
        a: b.value,
        ...w
      };
    }, toggleViews: () => {
      if (s.value === d.value.length - 1) {
        s.value = 0;
        return;
      }
      s.value++;
    }, showHighlight: () => {
      i.value = !0;
    }, hideHighlight: () => {
      i.value = !1;
    }, Saturation: ie, Hue: D, Alpha: G, EdIn: L, Checkerboard: oe };
  }
});
var It = function() {
  var a = this, t = a._self._c, e = a._self._setupProxy;
  return t("div", { class: ["vc-chrome-picker", a.disableAlpha ? "alpha-disabled" : ""], attrs: { role: "application", "aria-label": "Chrome Color Picker" } }, [t("div", { staticClass: "saturation" }, [t(e.Saturation, { attrs: { hue: e.hueRef }, model: { value: e.tinyColorRef, callback: function(r) {
    e.tinyColorRef = r;
  }, expression: "tinyColorRef" } })], 1), t("div", { staticClass: "body" }, [t("div", { staticClass: "controls" }, [t("div", { staticClass: "color-wrap" }, [t("div", { staticClass: "active-color", style: { backgroundColor: e.activeColor }, attrs: { role: "presentation", "aria-live": "polite", "aria-label": `Current color is ${e.activeColor}` } }), e.props.disableAlpha ? a._e() : t(e.Checkerboard)], 1), t("div", { staticClass: "sliders" }, [t("div", { staticClass: "hue-wrap" }, [t(e.Hue, { attrs: { modelValue: e.hueRef }, on: { "update:modelValue": e.updateHueRef } })], 1), e.props.disableAlpha ? a._e() : t("div", { staticClass: "alpha-wrap" }, [t(e.Alpha, { model: { value: e.tinyColorRef, callback: function(r) {
    e.tinyColorRef = r;
  }, expression: "tinyColorRef" } })], 1)])]), e.showFields ? t("div", { staticClass: "fieldsWrap", attrs: { "data-testid": "fields" } }, [e.isSupportedFormat("rgb") ? t("div", { directives: [{ name: "show", rawName: "v-show", value: e.fieldsIndex === e.getFormatIndex("rgb"), expression: "fieldsIndex === getFormatIndex('rgb')" }], staticClass: "fields" }, [t("div", { staticClass: "field" }, [t(e.EdIn, { attrs: { label: "r", value: e.rgb.r, a11y: { label: "Red" } }, on: { change: (r) => e.inputChangeRGBA("r", r) } })], 1), t("div", { staticClass: "field" }, [t(e.EdIn, { attrs: { label: "g", value: e.rgb.g, a11y: { label: "Green" } }, on: { change: (r) => e.inputChangeRGBA("g", r) } })], 1), t("div", { staticClass: "field" }, [t(e.EdIn, { attrs: { label: "b", value: e.rgb.b, a11y: { label: "Blue" } }, on: { change: (r) => e.inputChangeRGBA("b", r) } })], 1), a.disableAlpha ? a._e() : t("div", { staticClass: "field" }, [t(e.EdIn, { attrs: { label: "a", value: e.alpha, step: 0.01, max: 1, a11y: { label: "Transparency" } }, on: { change: (r) => e.inputChangeRGBA("a", r) } })], 1)]) : a._e(), e.isSupportedFormat("hex") ? t("div", { directives: [{ name: "show", rawName: "v-show", value: e.fieldsIndex === e.getFormatIndex("hex"), expression: "fieldsIndex === getFormatIndex('hex')" }], staticClass: "fields" }, [t("div", { staticClass: "field" }, [e.alpha === 1 ? t(e.EdIn, { attrs: { label: "hex", value: e.tinyColorRef.toHexString(), a11y: { label: "Hex" } }, on: { change: e.inputChangeHex } }) : a._e(), e.alpha !== 1 ? t(e.EdIn, { attrs: { label: "hex", value: e.tinyColorRef.toHex8String(), a11y: { label: "Hex with transparency" } }, on: { change: e.inputChangeHex } }) : a._e()], 1)]) : a._e(), e.isSupportedFormat("hsl") ? t("div", { directives: [{ name: "show", rawName: "v-show", value: e.fieldsIndex === e.getFormatIndex("hsl"), expression: "fieldsIndex === getFormatIndex('hsl')" }], staticClass: "fields" }, [t("div", { staticClass: "field" }, [t(e.EdIn, { attrs: { label: "h", value: e.hueRef.toFixed(), a11y: { label: "Hue" } }, on: { change: (r) => e.inputChangeHSLA("h", r) } })], 1), t("div", { staticClass: "field" }, [t(e.EdIn, { attrs: { label: "s", value: e.hsl.s, a11y: { label: "Saturation" } }, on: { change: (r) => e.inputChangeHSLA("s", r) } })], 1), t("div", { staticClass: "field" }, [t(e.EdIn, { attrs: { label: "l", value: e.hsl.l, a11y: { label: "Lightness" } }, on: { change: (r) => e.inputChangeHSLA("l", r) } })], 1), a.disableAlpha ? a._e() : t("div", { staticClass: "field" }, [t(e.EdIn, { attrs: { label: "a", value: e.alpha, step: 0.01, max: 1, a11y: { label: "Transparency" } }, on: { change: (r) => e.inputChangeHSLA("a", r) } })], 1)]) : a._e(), e.normalizedFormats.length > 1 ? t("div", { staticClass: "toggle-btn", attrs: { role: "button", "aria-label": "Change color format", tabindex: "0" }, on: { click: e.toggleViews, keydown: [function(r) {
    return !r.type.indexOf("key") && a._k(r.keyCode, "enter", 13, r.key, "Enter") ? null : e.toggleViews.apply(null, arguments);
  }, function(r) {
    return !r.type.indexOf("key") && a._k(r.keyCode, "space", 32, r.key, [" ", "Spacebar"]) ? null : e.toggleViews.apply(null, arguments);
  }], mouseover: e.showHighlight, mouseenter: e.showHighlight, mouseout: e.hideHighlight, focus: e.showHighlight, blur: e.hideHighlight } }, [t("div", { staticClass: "toggle-icon", attrs: { role: "presentation" } }, [t("svg", { staticStyle: { width: "24px", height: "24px" }, attrs: { viewBox: "0 0 24 24" } }, [t("path", { attrs: { fill: "currentColor", d: "M12,18.17L8.83,15L7.42,16.41L12,21L16.59,16.41L15.17,15M12,5.83L15.17,9L16.58,7.59L12,3L7.41,7.59L8.83,9L12,5.83Z" } })])]), t("div", { directives: [{ name: "show", rawName: "v-show", value: e.highlight, expression: "highlight" }], staticClass: "toggle-icon_highlighted", attrs: { role: "presentation" } })]) : a._e()]) : a._e()])]);
}, Lt = [], Pt = /* @__PURE__ */ R(
  Vt,
  It,
  Lt,
  !1,
  null,
  "65ca7748"
);
const ln = Pt.exports, ge = [
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
], Dt = /* @__PURE__ */ S({
  __name: "CompactPicker",
  props: {
    palette: { default: () => ge },
    tinyColor: null,
    modelValue: null,
    value: null
  },
  emits: ["change"].concat(H),
  setup(n, { emit: a }) {
    const t = n, e = $(t, a), r = f(() => e.value.toHexString().toUpperCase());
    return { __sfc: !0, defaultColors: ge, props: t, emit: a, tinyColorRef: e, pick: r, handlerClick: (s) => {
      e.value = s;
    } };
  }
});
var Gt = function() {
  var a = this, t = a._self._c, e = a._self._setupProxy;
  return t("div", { staticClass: "vc-compact-picker", attrs: { role: "application", "aria-label": "Compact color picker", tabindex: "0" } }, [t("ul", { staticClass: "colors", attrs: { role: "listbox", "aria-label": "Pick a color" } }, a._l(e.props.palette, function(r) {
    return t("li", { key: r, class: { "color-item_white": r === "#FFFFFF", "color-item": !0 }, style: { background: r }, attrs: { role: "option", "aria-label": "color:" + r, "aria-selected": r.toUpperCase() === e.pick, title: r, tabindex: "0" }, on: { click: function(l) {
      return e.handlerClick(r);
    }, keydown: function(l) {
      return !l.type.indexOf("key") && a._k(l.keyCode, "space", 32, l.key, [" ", "Spacebar"]) ? null : e.handlerClick(r);
    } } }, [t("div", { directives: [{ name: "show", rawName: "v-show", value: r.toUpperCase() === e.pick, expression: "c.toUpperCase() === pick" }], staticClass: "dot" })]);
  }), 0)]);
}, Nt = [], Tt = /* @__PURE__ */ R(
  Dt,
  Gt,
  Nt,
  !1,
  null,
  "ed15136d"
);
const sn = Tt.exports, _e = [
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
], Ot = /* @__PURE__ */ S({
  __name: "GrayscalePicker",
  props: {
    palette: { default: () => _e },
    tinyColor: null,
    modelValue: null,
    value: null
  },
  emits: ["change"].concat(H),
  setup(n, { emit: a }) {
    const t = n, e = $(t, a), r = f(() => e.value.toHexString().toUpperCase());
    return { __sfc: !0, defaultColors: _e, props: t, emit: a, tinyColorRef: e, pick: r, handlerClick: (s) => {
      e.value = s;
    } };
  }
});
var Ut = function() {
  var a = this, t = a._self._c, e = a._self._setupProxy;
  return t("div", { staticClass: "vc-grayscale-picker", attrs: { role: "application", "aria-label": "Grayscale color picker" } }, [t("ul", { staticClass: "colors", attrs: { role: "listbox", "aria-label": "Select a grayscale color", tabindex: "0" } }, a._l(a.palette, function(r) {
    return t("li", { key: r, class: { "color-item_white": r === "#FFFFFF", "color-item": !0 }, style: { background: r }, attrs: { role: "option", "aria-label": "color:" + r, "aria-selected": r.toUpperCase() === e.pick, title: r, tabindex: "0" }, on: { click: function(l) {
      return e.handlerClick(r);
    }, keydown: function(l) {
      return !l.type.indexOf("key") && a._k(l.keyCode, "space", 32, l.key, [" ", "Spacebar"]) ? null : e.handlerClick(r);
    } } }, [t("div", { directives: [{ name: "show", rawName: "v-show", value: r.toUpperCase() === e.pick, expression: "c.toUpperCase() === pick" }], staticClass: "dot" })]);
  }), 0)]);
}, zt = [], qt = /* @__PURE__ */ R(
  Ot,
  Ut,
  zt,
  !1,
  null,
  "a951a5d3"
);
const on = qt.exports, jt = /* @__PURE__ */ S({
  __name: "MaterialPicker",
  props: {
    tinyColor: null,
    modelValue: null,
    value: null
  },
  emits: H,
  setup(n, { emit: a }) {
    const t = n, e = $(t, a), r = f(() => e.value.toRgb());
    function l(i) {
      j(i) && (e.value = i);
    }
    function s(i, o) {
      e.value = {
        ...r.value,
        [i]: o
      };
    }
    return { __sfc: !0, props: t, emit: a, tinyColorRef: e, rgb: r, onHexChange: l, onChange: s, EdIn: L };
  }
});
var Xt = function() {
  var a = this, t = a._self._c, e = a._self._setupProxy;
  return t("div", { staticClass: "vc-material-picker", attrs: { role: "application", "aria-label": "Material color inputs" } }, [t(e.EdIn, { staticClass: "hex", style: { borderColor: e.tinyColorRef.toHexString() }, attrs: { label: "hex", value: e.tinyColorRef.toHexString(), a11y: { label: "Hex" } }, on: { change: e.onHexChange } }), t("div", { staticClass: "rgb" }, [t("div", { staticClass: "color" }, [t(e.EdIn, { attrs: { label: "r", value: e.rgb.r, a11y: { label: "Red" } }, on: { change: (r) => e.onChange("r", r) } })], 1), t("div", { staticClass: "color" }, [t(e.EdIn, { attrs: { label: "g", value: e.rgb.g, a11y: { label: "Green" } }, on: { change: (r) => e.onChange("g", r) } })], 1), t("div", { staticClass: "color" }, [t(e.EdIn, { attrs: { label: "b", value: e.rgb.b, a11y: { label: "Blue" } }, on: { change: (r) => e.onChange("b", r) } })], 1)])], 1);
}, Kt = [], Yt = /* @__PURE__ */ R(
  jt,
  Xt,
  Kt,
  !1,
  null,
  "04cb1aa3"
);
const un = Yt.exports, Wt = /* @__PURE__ */ S({
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
  emits: H.concat(["ok", "cancel", "reset"]),
  setup(n, { emit: a }) {
    const t = n, e = $(t, a), { hueRef: r, updateHueRef: l } = N(e), s = E(t.currentColor), i = f(() => e.value.toHsv()), o = f(() => {
      const _ = e.value.toHexString();
      return _ && _.replace("#", "");
    }), u = f(() => e.value.toRgb());
    return { __sfc: !0, props: t, emit: a, tinyColorRef: e, hueRef: r, updateHueRef: l, currentColorRef: s, hsv: i, hex: o, rgb: u, clickCurrentColor: () => {
      e.value = s.value;
    }, inputChangeHex: (_) => {
      _ && j(_) && (e.value = _);
    }, inputChangeRGBA: (_, h) => {
      if (!h || isNaN(Number(h)))
        return;
      const v = { [_]: h };
      e.value = {
        ...u.value,
        ...v
      };
    }, inputChangeHSV: (_, h) => {
      if (!h || isNaN(Number(h)))
        return;
      const v = { [_]: Number(h) };
      e.value = {
        ...i.value,
        ...v
      };
    }, handleOK: () => {
      a("ok");
    }, handleCancel: () => {
      a("cancel");
    }, handleReset: () => {
      a("reset");
    }, EdIn: L, Saturation: ie, Hue: D };
  }
});
var Zt = function() {
  var a = this, t = a._self._c, e = a._self._setupProxy;
  return t("div", { class: ["vc-photoshop-picker", a.disableFields ? "fields_disabled" : ""], attrs: { role: "application", "aria-label": "PhotoShop color picker" } }, [t("div", { staticClass: "title", attrs: { "aria-hidden": "true" } }, [a._v(a._s(a.title))]), t("div", { staticClass: "body" }, [t("div", { staticClass: "saturation" }, [t(e.Saturation, { attrs: { hue: e.hueRef }, model: { value: e.tinyColorRef, callback: function(r) {
    e.tinyColorRef = r;
  }, expression: "tinyColorRef" } })], 1), t("div", { staticClass: "hue" }, [t(e.Hue, { attrs: { direction: "vertical", modelValue: e.hueRef }, on: { "update:modelValue": e.updateHueRef } }, [t("div", { staticClass: "hue-picker" }, [t("i", { staticClass: "hue-picker-left" }), t("i", { staticClass: "hue-picker-right" })])])], 1), t("div", { class: ["controls", a.disableFields ? "controls_fields_disabled" : ""] }, [t("div", { staticClass: "preview" }, [t("div", { staticClass: "preview-label", attrs: { "aria-hidden": "true" } }, [a._v(a._s(a.newLabel))]), t("div", { staticClass: "preview-swatches" }, [t("div", { staticClass: "preview-color", style: { background: `#${e.hex}` }, attrs: { "aria-label": `New color is #${e.hex}` } }), t("div", { staticClass: "preview-color", style: { background: e.currentColorRef }, attrs: { role: "button", "aria-label": `Current color is ${e.currentColorRef}`, tabindex: "0" }, on: { click: e.clickCurrentColor, keydown: function(r) {
    return !r.type.indexOf("key") && a._k(r.keyCode, "space", 32, r.key, [" ", "Spacebar"]) ? null : e.clickCurrentColor.apply(null, arguments);
  } } })]), t("div", { staticClass: "preview-label", attrs: { "aria-hidden": "true" } }, [a._v(a._s(a.currentLabel))])]), a.disableFields ? a._e() : t("div", { staticClass: "actions" }, [t("div", { staticClass: "action-btn", attrs: { role: "button", "aria-label": "Click to apply new color", tabindex: "0" }, on: { click: e.handleOK, keydown: function(r) {
    return !r.type.indexOf("key") && a._k(r.keyCode, "space", 32, r.key, [" ", "Spacebar"]) ? null : e.clickCurrentColor.apply(null, arguments);
  } } }, [a._v(a._s(a.okLabel))]), t("div", { staticClass: "action-btn", attrs: { role: "button", "aria-label": a.cancelLabel, tabindex: "0" }, on: { click: e.handleCancel, keydown: function(r) {
    return !r.type.indexOf("key") && a._k(r.keyCode, "space", 32, r.key, [" ", "Spacebar"]) ? null : e.clickCurrentColor.apply(null, arguments);
  } } }, [a._v(a._s(a.cancelLabel))]), t("div", { staticClass: "fields" }, [t(e.EdIn, { attrs: { label: "h", desc: "°", value: e.hsv.h.toFixed(), a11y: { label: "Hue" } }, on: { change: (r) => e.inputChangeHSV("h", r) } }), t(e.EdIn, { attrs: { label: "s", desc: "%", value: (e.hsv.s * 100).toFixed(), min: 0, max: 100, a11y: { label: "Saturation" } }, on: { change: (r) => e.inputChangeHSV("s", r) } }), t(e.EdIn, { attrs: { label: "v", desc: "%", value: (e.hsv.v * 100).toFixed(), min: 0, max: 100, a11y: { label: "Value" } }, on: { change: (r) => e.inputChangeHSV("v", r) } }), t("div", { staticClass: "fields-divider" }), t(e.EdIn, { attrs: { label: "r", value: e.rgb.r, a11y: { label: "Red" } }, on: { change: (r) => e.inputChangeRGBA("r", r) } }), t(e.EdIn, { attrs: { label: "g", value: e.rgb.g, a11y: { label: "Green" } }, on: { change: (r) => e.inputChangeRGBA("g", r) } }), t(e.EdIn, { attrs: { label: "b", value: e.rgb.b, a11y: { label: "Blue" } }, on: { change: (r) => e.inputChangeRGBA("b", r) } }), t("div", { staticClass: "fields-divider" }), t(e.EdIn, { staticClass: "hex", attrs: { label: "#", value: e.hex, a11y: { label: "Hex" } }, on: { change: e.inputChangeHex } })], 1), a.hasResetButton ? t("div", { staticClass: "action-btn", attrs: { role: "button", "aria-label": a.resetLabel, tabindex: "0" }, on: { click: e.handleReset, keydown: function(r) {
    return !r.type.indexOf("key") && a._k(r.keyCode, "space", 32, r.key, [" ", "Spacebar"]) ? null : e.handleReset.apply(null, arguments);
  } } }, [a._v(a._s(a.resetLabel))]) : a._e()])])])]);
}, Jt = [], Qt = /* @__PURE__ */ R(
  Wt,
  Zt,
  Jt,
  !1,
  null,
  "4e9b7a7d"
);
const cn = Qt.exports, me = [
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
], ea = /* @__PURE__ */ S({
  __name: "SketchPicker",
  props: {
    presetColors: { default: () => me },
    disableAlpha: { type: Boolean, default: !1 },
    disableFields: { type: Boolean, default: !1 },
    tinyColor: null,
    modelValue: null,
    value: null
  },
  emits: ["change"].concat(H),
  setup(n, { emit: a }) {
    const t = n, e = $(t, a), { hueRef: r, updateHueRef: l } = N(e), s = f(() => Number(e.value.getAlpha().toFixed(2))), i = f(() => {
      let d;
      return s.value < 1 ? d = e.value.toHex8String() : d = e.value.toHexString(), d.replace("#", "");
    }), o = f(() => e.value.toRgb());
    return { __sfc: !0, presetColorsOfSketch: me, props: t, emit: a, tinyColorRef: e, hueRef: r, updateHueRef: l, alpha: s, hex: i, rgb: o, inputChangeHex: (d) => {
      d && j(d) && (e.value = d);
    }, inputChangeRGBA: (d, k) => {
      if (!k || isNaN(Number(k)))
        return;
      const C = { [d]: k };
      e.value = {
        ...o.value,
        ...C
      };
    }, inputChangeAlpha: (d) => {
      !d || isNaN(Number(d)) || (e.value = e.value.setAlpha(d).clone());
    }, handlePreset: (d) => {
      e.value = d;
    }, EdIn: L, Saturation: ie, Hue: D, Alpha: G, Checkerboard: oe, isTransparent: Bt };
  }
});
var ta = function() {
  var a = this, t = a._self._c, e = a._self._setupProxy;
  return t("div", { class: ["vc-sketch-picker", a.disableAlpha ? "alpha-disabled" : ""], attrs: { role: "application", "aria-label": "Sketch color picker" } }, [t("div", { staticClass: "saturation" }, [t(e.Saturation, { attrs: { hue: e.hueRef }, model: { value: e.tinyColorRef, callback: function(r) {
    e.tinyColorRef = r;
  }, expression: "tinyColorRef" } })], 1), t("div", { staticClass: "controls" }, [t("div", { staticClass: "sliders" }, [t("div", { staticClass: "hue" }, [t(e.Hue, { attrs: { modelValue: e.hueRef }, on: { "update:modelValue": e.updateHueRef } })], 1), a.disableAlpha ? a._e() : t("div", { staticClass: "alpha" }, [t(e.Alpha, { model: { value: e.tinyColorRef, callback: function(r) {
    e.tinyColorRef = r;
  }, expression: "tinyColorRef" } })], 1)]), t("div", { staticClass: "color" }, [t("div", { staticClass: "active-color", style: { background: e.tinyColorRef.toRgbString() }, attrs: { "aria-label": `Current color is ${e.tinyColorRef.toRgbString()}` } }), t(e.Checkerboard)], 1)]), a.disableFields ? a._e() : t("div", { staticClass: "field" }, [t("div", { staticClass: "field_double" }, [t(e.EdIn, { attrs: { label: "hex", value: e.hex, a11y: { label: "Hex" } }, on: { change: e.inputChangeHex } })], 1), t("div", { staticClass: "field_single" }, [t(e.EdIn, { attrs: { label: "r", value: e.rgb.r, a11y: { label: "Red" } }, on: { change: (r) => e.inputChangeRGBA("r", r) } })], 1), t("div", { staticClass: "field_single" }, [t(e.EdIn, { attrs: { label: "g", value: e.rgb.g, a11y: { label: "Green" } }, on: { change: (r) => e.inputChangeRGBA("g", r) } })], 1), t("div", { staticClass: "field_single" }, [t(e.EdIn, { attrs: { label: "b", value: e.rgb.b, a11y: { label: "Blue" } }, on: { change: (r) => e.inputChangeRGBA("b", r) } })], 1), a.disableAlpha ? a._e() : t("div", { staticClass: "field_single" }, [t(e.EdIn, { attrs: { label: "a", value: e.alpha, step: 0.01, max: 1, a11y: { label: "Transparency" } }, on: { change: e.inputChangeAlpha } })], 1)]), t("div", { staticClass: "presets", attrs: { role: "listbox", "aria-label": "A color preset, pick one to set as current color" } }, [a._l(e.props.presetColors, function(r) {
    return [e.isTransparent(r) ? t("div", { key: r, staticClass: "preset-color", attrs: { "aria-label": "Color: transparency", "aria-selected": e.alpha === 0, role: "option", tabindex: "0", title: r }, on: { click: function(l) {
      return e.handlePreset(r);
    }, keydown: function(l) {
      return !l.type.indexOf("key") && a._k(l.keyCode, "space", 32, l.key, [" ", "Spacebar"]) ? null : e.handlePreset(r);
    } } }, [t(e.Checkerboard)], 1) : t("div", { key: r + "-color", staticClass: "preset-color", style: { background: r }, attrs: { title: r, "aria-label": "Color:" + r, "aria-selected": `#${e.hex.toLowerCase()}` === r.toLowerCase(), role: "option", tabindex: "0" }, on: { click: function(l) {
      return e.handlePreset(r);
    }, keydown: function(l) {
      return !l.type.indexOf("key") && a._k(l.keyCode, "space", 32, l.key, [" ", "Spacebar"]) ? null : e.handlePreset(r);
    } } })];
  })], 2)]);
}, aa = [], na = /* @__PURE__ */ R(
  ea,
  ta,
  aa,
  !1,
  null,
  "7e035088"
);
const dn = na.exports, P = 0.5, Ce = [
  { s: P, l: 0.8 },
  { s: P, l: 0.65 },
  { s: P, l: 0.5 },
  { s: P, l: 0.35 },
  { s: P, l: 0.2 }
], ra = /* @__PURE__ */ S({
  __name: "SliderPicker",
  props: {
    swatches: { default: () => Ce },
    alpha: { type: Boolean },
    tinyColor: null,
    modelValue: null,
    value: null
  },
  emits: H,
  setup(n, { emit: a }) {
    const t = n, e = $(t, a), { hueRef: r, updateHueRef: l } = N(e), s = f(() => e.value.toHsl()), i = f(() => e.value.toHexString()), o = f(() => t.swatches.map((m) => typeof m == "string" ? {
      s: P,
      l: Number(m)
    } : m));
    return { __sfc: !0, DEFAULT_SATURATION: P, defaultSwatches: Ce, props: t, emit: a, tinyColorRef: e, hueRef: r, updateHueRef: l, hsl: s, hex: i, normalizedSwatches: o, isActive: (b) => s.value.l === 1 && b.l === 1 || s.value.l === 0 && b.l === 0 ? !0 : Math.abs(s.value.l - b.l) < 0.01 && Math.abs(s.value.s - b.s) < 0.01, handleSwClick: (b) => {
      e.value = {
        h: s.value.h,
        s: b.s,
        l: b.l
      };
    }, Hue: D, AlphaSlider: G };
  }
});
var la = function() {
  var a = this, t = a._self._c, e = a._self._setupProxy;
  return t("div", { staticClass: "vc-slider-picker", attrs: { role: "application", "aria-label": "Slider color picker" } }, [t("div", { staticClass: "hue" }, [t(e.Hue, { attrs: { modelValue: e.hueRef }, on: { "update:modelValue": e.updateHueRef } })], 1), e.props.alpha ? t("div", { staticClass: "alpha" }, [t(e.AlphaSlider, { model: { value: e.tinyColorRef, callback: function(r) {
    e.tinyColorRef = r;
  }, expression: "tinyColorRef" } })], 1) : a._e(), e.normalizedSwatches.length > 0 ? t("div", { staticClass: "swatches", attrs: { role: "listbox", "aria-label": "Color segments in different shades of one color", tabindex: "0" } }, a._l(e.normalizedSwatches, function(r, l) {
    return t("div", { key: l, staticClass: "swatch", attrs: { "data-index": "index", role: "option", "aria-label": "Color:" + e.hex, title: e.hex, "aria-selected": e.isActive(r), tabindex: "0" }, on: { click: function(s) {
      return e.handleSwClick(r);
    }, keydown: function(s) {
      return !s.type.indexOf("key") && a._k(s.keyCode, "space", 32, s.key, [" ", "Spacebar"]) ? null : e.handleSwClick(r);
    } } }, [t("div", { class: {
      picker: !0,
      picker_active: e.isActive(r),
      picker_white: r.l === 1
    }, style: { background: "hsl(" + e.hsl.h + ", " + r.s * 100 + "%, " + r.l * 100 + "%)" } })]);
  }), 0) : a._e()]);
}, sa = [], ia = /* @__PURE__ */ R(
  ra,
  la,
  sa,
  !1,
  null,
  "6f04ef25"
);
const fn = ia.exports;
var oa = { 50: "#ffebee", 100: "#ffcdd2", 200: "#ef9a9a", 300: "#e57373", 400: "#ef5350", 500: "#f44336", 600: "#e53935", 700: "#d32f2f", 800: "#c62828", 900: "#b71c1c", a100: "#ff8a80", a200: "#ff5252", a400: "#ff1744", a700: "#d50000" }, ua = { 50: "#fce4ec", 100: "#f8bbd0", 200: "#f48fb1", 300: "#f06292", 400: "#ec407a", 500: "#e91e63", 600: "#d81b60", 700: "#c2185b", 800: "#ad1457", 900: "#880e4f", a100: "#ff80ab", a200: "#ff4081", a400: "#f50057", a700: "#c51162" }, ca = { 50: "#f3e5f5", 100: "#e1bee7", 200: "#ce93d8", 300: "#ba68c8", 400: "#ab47bc", 500: "#9c27b0", 600: "#8e24aa", 700: "#7b1fa2", 800: "#6a1b9a", 900: "#4a148c", a100: "#ea80fc", a200: "#e040fb", a400: "#d500f9", a700: "#aa00ff" }, da = { 50: "#ede7f6", 100: "#d1c4e9", 200: "#b39ddb", 300: "#9575cd", 400: "#7e57c2", 500: "#673ab7", 600: "#5e35b1", 700: "#512da8", 800: "#4527a0", 900: "#311b92", a100: "#b388ff", a200: "#7c4dff", a400: "#651fff", a700: "#6200ea" }, fa = { 50: "#e8eaf6", 100: "#c5cae9", 200: "#9fa8da", 300: "#7986cb", 400: "#5c6bc0", 500: "#3f51b5", 600: "#3949ab", 700: "#303f9f", 800: "#283593", 900: "#1a237e", a100: "#8c9eff", a200: "#536dfe", a400: "#3d5afe", a700: "#304ffe" }, ha = { 50: "#e3f2fd", 100: "#bbdefb", 200: "#90caf9", 300: "#64b5f6", 400: "#42a5f5", 500: "#2196f3", 600: "#1e88e5", 700: "#1976d2", 800: "#1565c0", 900: "#0d47a1", a100: "#82b1ff", a200: "#448aff", a400: "#2979ff", a700: "#2962ff" }, pa = { 50: "#e1f5fe", 100: "#b3e5fc", 200: "#81d4fa", 300: "#4fc3f7", 400: "#29b6f6", 500: "#03a9f4", 600: "#039be5", 700: "#0288d1", 800: "#0277bd", 900: "#01579b", a100: "#80d8ff", a200: "#40c4ff", a400: "#00b0ff", a700: "#0091ea" }, ba = { 50: "#e0f7fa", 100: "#b2ebf2", 200: "#80deea", 300: "#4dd0e1", 400: "#26c6da", 500: "#00bcd4", 600: "#00acc1", 700: "#0097a7", 800: "#00838f", 900: "#006064", a100: "#84ffff", a200: "#18ffff", a400: "#00e5ff", a700: "#00b8d4" }, va = { 50: "#e0f2f1", 100: "#b2dfdb", 200: "#80cbc4", 300: "#4db6ac", 400: "#26a69a", 500: "#009688", 600: "#00897b", 700: "#00796b", 800: "#00695c", 900: "#004d40", a100: "#a7ffeb", a200: "#64ffda", a400: "#1de9b6", a700: "#00bfa5" }, ga = { 50: "#e8f5e9", 100: "#c8e6c9", 200: "#a5d6a7", 300: "#81c784", 400: "#66bb6a", 500: "#4caf50", 600: "#43a047", 700: "#388e3c", 800: "#2e7d32", 900: "#1b5e20", a100: "#b9f6ca", a200: "#69f0ae", a400: "#00e676", a700: "#00c853" }, _a = { 50: "#f1f8e9", 100: "#dcedc8", 200: "#c5e1a5", 300: "#aed581", 400: "#9ccc65", 500: "#8bc34a", 600: "#7cb342", 700: "#689f38", 800: "#558b2f", 900: "#33691e", a100: "#ccff90", a200: "#b2ff59", a400: "#76ff03", a700: "#64dd17" }, ma = { 50: "#f9fbe7", 100: "#f0f4c3", 200: "#e6ee9c", 300: "#dce775", 400: "#d4e157", 500: "#cddc39", 600: "#c0ca33", 700: "#afb42b", 800: "#9e9d24", 900: "#827717", a100: "#f4ff81", a200: "#eeff41", a400: "#c6ff00", a700: "#aeea00" }, Ca = { 50: "#fffde7", 100: "#fff9c4", 200: "#fff59d", 300: "#fff176", 400: "#ffee58", 500: "#ffeb3b", 600: "#fdd835", 700: "#fbc02d", 800: "#f9a825", 900: "#f57f17", a100: "#ffff8d", a200: "#ffff00", a400: "#ffea00", a700: "#ffd600" }, ya = { 50: "#fff8e1", 100: "#ffecb3", 200: "#ffe082", 300: "#ffd54f", 400: "#ffca28", 500: "#ffc107", 600: "#ffb300", 700: "#ffa000", 800: "#ff8f00", 900: "#ff6f00", a100: "#ffe57f", a200: "#ffd740", a400: "#ffc400", a700: "#ffab00" }, xa = { 50: "#fff3e0", 100: "#ffe0b2", 200: "#ffcc80", 300: "#ffb74d", 400: "#ffa726", 500: "#ff9800", 600: "#fb8c00", 700: "#f57c00", 800: "#ef6c00", 900: "#e65100", a100: "#ffd180", a200: "#ffab40", a400: "#ff9100", a700: "#ff6d00" }, ka = { 50: "#fbe9e7", 100: "#ffccbc", 200: "#ffab91", 300: "#ff8a65", 400: "#ff7043", 500: "#ff5722", 600: "#f4511e", 700: "#e64a19", 800: "#d84315", 900: "#bf360c", a100: "#ff9e80", a200: "#ff6e40", a400: "#ff3d00", a700: "#dd2c00" }, wa = { 50: "#efebe9", 100: "#d7ccc8", 200: "#bcaaa4", 300: "#a1887f", 400: "#8d6e63", 500: "#795548", 600: "#6d4c41", 700: "#5d4037", 800: "#4e342e", 900: "#3e2723" }, Sa = { 50: "#fafafa", 100: "#f5f5f5", 200: "#eeeeee", 300: "#e0e0e0", 400: "#bdbdbd", 500: "#9e9e9e", 600: "#757575", 700: "#616161", 800: "#424242", 900: "#212121" }, Ra = { 50: "#eceff1", 100: "#cfd8dc", 200: "#b0bec5", 300: "#90a4ae", 400: "#78909c", 500: "#607d8b", 600: "#546e7a", 700: "#455a64", 800: "#37474f", 900: "#263238" }, Fa = { primary: "rgba(0, 0, 0, 0.87)", secondary: "rgba(0, 0, 0, 0.54)", disabled: "rgba(0, 0, 0, 0.38)", dividers: "rgba(0, 0, 0, 0.12)" }, Aa = { primary: "rgba(255, 255, 255, 1)", secondary: "rgba(255, 255, 255, 0.7)", disabled: "rgba(255, 255, 255, 0.5)", dividers: "rgba(255, 255, 255, 0.12)" }, Ha = { active: "rgba(0, 0, 0, 0.54)", inactive: "rgba(0, 0, 0, 0.38)" }, $a = { active: "rgba(255, 255, 255, 1)", inactive: "rgba(255, 255, 255, 0.5)" }, Ma = "#ffffff", Ea = "#000000";
const Ba = {
  red: oa,
  pink: ua,
  purple: ca,
  deepPurple: da,
  indigo: fa,
  blue: ha,
  lightBlue: pa,
  cyan: ba,
  teal: va,
  green: ga,
  lightGreen: _a,
  lime: ma,
  yellow: Ca,
  amber: ya,
  orange: xa,
  deepOrange: ka,
  brown: wa,
  grey: Sa,
  blueGrey: Ra,
  darkText: Fa,
  lightText: Aa,
  darkIcons: Ha,
  lightIcons: $a,
  white: Ma,
  black: Ea
}, Be = [
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
], Ve = ["900", "700", "500", "300", "100"], ye = /* @__PURE__ */ (() => {
  const n = [];
  return Be.forEach((a) => {
    let t = [];
    a.toLowerCase() === "black" || a.toLowerCase() === "white" ? t = t.concat(["#000000", "#FFFFFF"]) : Ve.forEach((e) => {
      const r = Ba[a][e];
      t.push(r.toUpperCase());
    }), n.push(t);
  }), n;
})(), Va = /* @__PURE__ */ S({
  __name: "SwatchesPicker",
  props: {
    palette: { default: () => ye },
    tinyColor: null,
    modelValue: null,
    value: null
  },
  emits: H,
  setup(n, { emit: a }) {
    const t = n, e = $(t, a), r = f(() => e.value.toHexString());
    return { __sfc: !0, colorMap: Be, intensity: Ve, defaultColors: ye, props: t, emit: a, tinyColorRef: e, hex: r, equal: (i) => i.toLowerCase() === r.value.toLowerCase(), handlerClick: (i) => {
      e.value = i;
    } };
  }
});
var Ia = function() {
  var a = this, t = a._self._c, e = a._self._setupProxy;
  return t("div", { staticClass: "vc-swatches-picker", attrs: { role: "application", "aria-label": "Swatches color picker", "data-pick": e.hex } }, [t("div", { staticClass: "box", attrs: { role: "listbox", "aria-label": "Pick a color", tabindex: "0" } }, a._l(a.palette, function(r, l) {
    return t("div", { key: l, staticClass: "colorGroup" }, a._l(r, function(s) {
      return t("div", { key: s, class: ["color", { color_white: s === "#FFFFFF" }], style: { background: s }, attrs: { "data-color": s, role: "option", "aria-label": "Color:" + s, "aria-selected": e.equal(s), title: s, tabindex: "0" }, on: { click: function(i) {
        return e.handlerClick(s);
      }, keydown: function(i) {
        return !i.type.indexOf("key") && a._k(i.keyCode, "space", 32, i.key, [" ", "Spacebar"]) ? null : e.handlerClick(s);
      } } }, [t("div", { directives: [{ name: "show", rawName: "v-show", value: e.equal(s), expression: "equal(c)" }], staticClass: "picker" }, [t("svg", { staticStyle: { width: "24px", height: "24px" }, attrs: { viewBox: "0 0 24 24" } }, [t("path", { attrs: { d: "M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" } })])])]);
    }), 0);
  }), 0)]);
}, La = [], Pa = /* @__PURE__ */ R(
  Va,
  Ia,
  La,
  !1,
  null,
  "080ed8c6"
);
const hn = Pa.exports, xe = [
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
], Da = /* @__PURE__ */ S({
  __name: "TwitterPicker",
  props: {
    width: { default: 276 },
    presetColors: { default: () => xe },
    triangle: { default: "top-left" },
    tinyColor: null,
    modelValue: null,
    value: null
  },
  emits: H,
  setup(n, { emit: a }) {
    const t = n, e = $(t, a), r = f(() => e.value.toHexString());
    return { __sfc: !0, defaultColors: xe, props: t, emit: a, tinyColorRef: e, hex: r, equal: (o) => o.toLowerCase() === r.value.toLowerCase(), handlerClick: (o) => {
      e.value = o;
    }, inputChange: (o) => {
      j(o) && (e.value = o);
    }, EdIn: L };
  }
});
var Ga = function() {
  var a = this, t = a._self._c, e = a._self._setupProxy;
  return t("div", { class: ["vc-twitter-picker", {
    tri_hide: e.props.triangle === "hide",
    tri_top_left: e.props.triangle === "top-left",
    tri_top_right: e.props.triangle === "top-right"
  }], style: {
    width: typeof e.props.width == "number" ? `${e.props.width}px` : e.props.width
  }, attrs: { role: "application", "aria-label": "Twitter color picker" } }, [t("div", { staticClass: "triangle_shadow" }), t("div", { staticClass: "triangle" }), t("div", { staticClass: "body", attrs: { role: "listbox", tabindex: "0", "aria-label": "Select a color" } }, [a._l(a.presetColors, function(r, l) {
    return t("span", { key: l, staticClass: "swatch", style: {
      background: r,
      boxShadow: `0 0 4px ${e.equal(r) ? r : "transparent"}`
    }, attrs: { role: "option", "aria-label": "color:" + r, title: r, "aria-selected": e.equal(r), tabindex: "0" }, on: { click: function(s) {
      return e.handlerClick(r);
    }, keydown: function(s) {
      return !s.type.indexOf("key") && a._k(s.keyCode, "space", 32, s.key, [" ", "Spacebar"]) ? null : e.handlerClick(r);
    } } });
  }), t("div", { staticClass: "hash", attrs: { "aria-hidden": "true" } }, [a._v("#")]), t(e.EdIn, { attrs: { value: e.hex.replace("#", ""), a11y: { label: "Hex" } }, on: { change: e.inputChange } }), t("div", { staticClass: "clear" })], 2)]);
}, Na = [], Ta = /* @__PURE__ */ R(
  Da,
  Ga,
  Na,
  !1,
  null,
  "22d31a28"
);
const pn = Ta.exports, Oa = /* @__PURE__ */ S({
  __name: "HueSlider",
  props: {
    modelValue: null,
    value: null
  },
  emits: ["input", "update:modelValue"],
  setup(n, { emit: a }) {
    const t = n;
    z((s, i) => ({
      a25d4faa: i.thumbColor
    }));
    const e = f(() => t.modelValue ?? t.value ?? 0), r = (s) => {
      a("input", s), a("update:modelValue", s);
    }, l = f(() => `hsl(${e.value}, 100%, 50%)`);
    return { __sfc: !0, emit: a, props: t, val: e, update: r, thumbColor: l, HueSlider: D };
  }
});
var Ua = function() {
  var a = this, t = a._self._c, e = a._self._setupProxy;
  return t(e.HueSlider, a._b({ staticClass: "vc-hue-wrap", attrs: { modelValue: e.val }, on: { "update:modelValue": e.update } }, "HueSlider", a.$attrs, !1));
}, za = [], qa = /* @__PURE__ */ R(
  Oa,
  Ua,
  za,
  !1,
  null,
  "db06adab"
);
const bn = qa.exports;
function ke(n, a) {
  return `linear-gradient(to right,
    hsl(${n} 0% ${a}%),
    hsl(${n} 50% ${a}%),
    hsl(${n} 100% ${a}%)
  )`;
}
function we(n, a) {
  return `linear-gradient(to right,
    hsl(${n} ${a}% 0%),
    hsl(${n} ${a}% 10%),
    hsl(${n} ${a}% 20%),
    hsl(${n} ${a}% 30%),
    hsl(${n} ${a}% 40%),
    hsl(${n} ${a}% 50%),
    hsl(${n} ${a}% 60%),
    hsl(${n} ${a}% 70%),
    hsl(${n} ${a}% 80%),
    hsl(${n} ${a}% 90%),
    hsl(${n} ${a}% 100%)
  )`;
}
const ja = /* @__PURE__ */ S({
  __name: "HSLSliders",
  props: {
    disableAlpha: { type: Boolean, default: !1 },
    disableFields: { type: Boolean, default: !1 },
    tinyColor: null,
    modelValue: null,
    value: null
  },
  emits: H,
  setup(n, { emit: a }) {
    const t = n;
    z((h, v) => ({
      "39913e0a": v.thumbColorForH,
      a03fca6a: v.thumbColor
    }));
    const e = $(t, a), { hueRef: r, updateHueRef: l } = N(e), s = f(() => e.value.toHsl()), i = f(() => e.value.getAlpha()), o = E(s.value.s * 100), u = E(s.value.l * 100);
    J(s, () => {
      o.value = s.value.s * 100, u.value = s.value.l * 100;
    });
    const p = (h) => {
      h && l(Number(h));
    }, b = (h) => {
      const v = Number(h);
      o.value = v, e.value = {
        ...s.value,
        s: v / 100
      };
    }, m = (h) => {
      const v = Number(h);
      u.value = v, e.value = {
        ...s.value,
        l: v / 100
      };
    }, d = (h) => {
      const v = Number(h);
      e.value = {
        ...s.value,
        a: v
      };
    }, k = f(
      () => ke(r.value, u.value)
    ), C = f(
      () => we(r.value, o.value)
    ), A = f(() => `hsl(${r.value}, 100%, 50%)`), _ = f(() => `hsl(${r.value}, ${o.value}%, ${u.value}%)`);
    return { __sfc: !0, getSaturationGradient: ke, getLightnessGradient: we, props: t, emit: a, tinyColorRef: e, hueRef: r, updateHueRef: l, hsl: s, alpha: i, saturation: o, lightness: u, onHChange: p, onSChange: b, onLChange: m, onAlphaChange: d, saturationGradient: k, lightnessGradient: C, thumbColorForH: A, thumbColor: _, BaseSlider: q, HueSlider: D, AlphaSlider: G, EditableInput: L };
  }
});
var Xa = function() {
  var a = this, t = a._self._c, e = a._self._setupProxy;
  return t("div", { staticClass: "vc-hsl-sliders" }, [t("div", { staticClass: "slider-wrap h-slider" }, [t("span", { staticClass: "label" }, [a._v("H")]), t(e.HueSlider, { attrs: { modelValue: e.hueRef }, on: { "update:modelValue": e.updateHueRef } }), a.disableFields ? a._e() : t(e.EditableInput, { attrs: { value: Number(e.hueRef).toFixed(), a11y: { label: "hue" } }, on: { change: e.onHChange } })], 1), t("div", { staticClass: "slider-wrap s-slider" }, [t("span", { staticClass: "label" }, [a._v("S")]), t(e.BaseSlider, { attrs: { "aria-label": "saturation", modelValue: e.saturation }, on: { "update:modelValue": e.onSChange }, scopedSlots: a._u([{ key: "background", fn: function() {
    return [t("div", { staticClass: "gradient", style: { background: e.saturationGradient } })];
  }, proxy: !0 }]) }), a.disableFields ? a._e() : t(e.EditableInput, { attrs: { value: e.saturation.toFixed(), a11y: { label: "saturation" }, min: 0, max: 100 }, on: { change: e.onSChange } })], 1), t("div", { staticClass: "slider-wrap l-slider" }, [t("span", { staticClass: "label" }, [a._v("L")]), t(e.BaseSlider, { attrs: { "aria-label": "lightness", modelValue: e.lightness }, on: { "update:modelValue": e.onLChange }, scopedSlots: a._u([{ key: "background", fn: function() {
    return [t("div", { staticClass: "gradient", style: { background: e.lightnessGradient } })];
  }, proxy: !0 }]) }), a.disableFields ? a._e() : t(e.EditableInput, { attrs: { value: e.lightness.toFixed(), a11y: { label: "lightness" }, min: 0, max: 100 }, on: { change: e.onLChange } })], 1), a.disableAlpha ? a._e() : t("div", { staticClass: "slider-wrap a-slider" }, [t("span", { staticClass: "label" }, [a._v("A")]), t(e.AlphaSlider, { model: { value: e.tinyColorRef, callback: function(r) {
    e.tinyColorRef = r;
  }, expression: "tinyColorRef" } }), a.disableFields ? a._e() : t(e.EditableInput, { attrs: { value: e.alpha.toFixed(2), a11y: { label: "alpha" }, min: 0, max: 1, step: 0.01 }, on: { change: e.onAlphaChange } })], 1)]);
}, Ka = [], Ya = /* @__PURE__ */ R(
  ja,
  Xa,
  Ka,
  !1,
  null,
  "091ba351"
);
const vn = Ya.exports;
function Se(n, a) {
  const e = [];
  for (let r = 0; r <= 10; r++) {
    let l = r / 10;
    const s = { h: n, s: l, v: a / 100 }, i = c(s).toRgb();
    if (i) {
      const o = Math.round(i.r), u = Math.round(i.g), p = Math.round(i.b);
      e.push(`rgb(${o} ${u} ${p})`);
    }
  }
  return `linear-gradient(to right, ${e.join(", ")})`;
}
function Re(n, a) {
  const e = [];
  for (let r = 0; r <= 10; r++) {
    let l = r / 10;
    const s = { h: n, s: a / 100, v: l }, i = c(s).toRgb();
    if (i) {
      const o = Math.round(i.r), u = Math.round(i.g), p = Math.round(i.b);
      e.push(`rgb(${o} ${u} ${p})`);
    }
  }
  return `linear-gradient(to right, ${e.join(", ")})`;
}
const Wa = /* @__PURE__ */ S({
  __name: "HSVSliders",
  props: {
    disableAlpha: { type: Boolean, default: !1 },
    disableFields: { type: Boolean, default: !1 },
    tinyColor: null,
    modelValue: null,
    value: null
  },
  emits: H,
  setup(n, { emit: a }) {
    const t = n;
    z((h, v) => ({
      71707920: v.thumbColorForH,
      "30d75e3e": v.thumbColor
    }));
    const e = $(t, a), { hueRef: r, updateHueRef: l } = N(e), s = f(() => e.value.toHsv()), i = f(() => e.value.getAlpha()), o = E(s.value.s * 100), u = E(s.value.v * 100);
    J(s, () => {
      o.value = s.value.s * 100, u.value = s.value.v * 100;
    });
    const p = f(() => Se(r.value, u.value)), b = f(() => Re(r.value, o.value)), m = (h) => {
      h && l(Number(h));
    }, d = (h) => {
      const v = Number(h);
      o.value = v, e.value = {
        ...s.value,
        s: v / 100
      };
    }, k = (h) => {
      const v = Number(h);
      u.value = v, e.value = {
        ...s.value,
        v: v / 100
      };
    }, C = (h) => {
      const v = Number(h);
      e.value = {
        ...s.value,
        a: v
      };
    }, A = f(() => `hsl(${r.value}, 100%, 50%)`), _ = f(() => c({
      ...s.value,
      a: 1
    }).toHslString());
    return { __sfc: !0, getSaturationGradient: Se, getBrightnessGradient: Re, props: t, emit: a, tinyColorRef: e, hueRef: r, updateHueRef: l, hsv: s, alpha: i, saturation: o, brightness: u, saturationGradient: p, brightnessGradient: b, onHChange: m, onSChange: d, onBChange: k, onAlphaChange: C, thumbColorForH: A, thumbColor: _, BaseSlider: q, HueSlider: D, AlphaSlider: G, EditableInput: L };
  }
});
var Za = function() {
  var a = this, t = a._self._c, e = a._self._setupProxy;
  return t("div", { staticClass: "vc-hsv-sliders" }, [t("div", { staticClass: "slider-wrap h-slider" }, [t("span", { staticClass: "label" }, [a._v("H")]), t(e.HueSlider, { attrs: { modelValue: e.hueRef }, on: { "update:modelValue": e.updateHueRef } }), a.disableFields ? a._e() : t(e.EditableInput, { attrs: { value: Number(e.hueRef).toFixed(), a11y: { label: "hue" } }, on: { change: e.onHChange } })], 1), t("div", { staticClass: "slider-wrap s-slider" }, [t("span", { staticClass: "label" }, [a._v("S")]), t(e.BaseSlider, { attrs: { "aria-label": "saturation", modelValue: e.saturation }, on: { "update:modelValue": e.onSChange }, scopedSlots: a._u([{ key: "background", fn: function() {
    return [t("div", { staticClass: "gradient", style: { background: e.saturationGradient } })];
  }, proxy: !0 }]) }), a.disableFields ? a._e() : t(e.EditableInput, { attrs: { value: e.saturation.toFixed(), a11y: { label: "saturation" }, min: 0, max: 100 }, on: { change: e.onSChange } })], 1), t("div", { staticClass: "slider-wrap b-slider" }, [t("span", { staticClass: "label" }, [a._v("V")]), t(e.BaseSlider, { attrs: { "aria-label": "brightness", modelValue: e.brightness }, on: { "update:modelValue": e.onBChange }, scopedSlots: a._u([{ key: "background", fn: function() {
    return [t("div", { staticClass: "gradient", style: { background: e.brightnessGradient } })];
  }, proxy: !0 }]) }), a.disableFields ? a._e() : t(e.EditableInput, { attrs: { value: e.brightness.toFixed(), a11y: { label: "brightness" }, min: 0, max: 100 }, on: { change: e.onBChange } })], 1), a.disableAlpha ? a._e() : t("div", { staticClass: "slider-wrap" }, [t("span", { staticClass: "label" }, [a._v("A")]), t(e.AlphaSlider, { model: { value: e.tinyColorRef, callback: function(r) {
    e.tinyColorRef = r;
  }, expression: "tinyColorRef" } }), a.disableFields ? a._e() : t(e.EditableInput, { attrs: { value: e.alpha.toFixed(2), a11y: { label: "alpha" }, min: 0, max: 1, step: 0.01 }, on: { change: e.onAlphaChange } })], 1)]);
}, Ja = [], Qa = /* @__PURE__ */ R(
  Wa,
  Za,
  Ja,
  !1,
  null,
  "dec480d8"
);
const gn = Qa.exports, W = (n, a) => {
  const e = [];
  for (let r = 1; r <= 255; r++) {
    const { r: l, g: s, b: i } = {
      ...a,
      [n]: r
    };
    e.push(`rgb(${l}, ${s}, ${i})`);
  }
  return `linear-gradient(to right, ${e.join(", ")})`;
}, en = /* @__PURE__ */ S({
  __name: "RGBSliders",
  props: {
    disableAlpha: { type: Boolean, default: !1 },
    disableFields: { type: Boolean, default: !1 },
    tinyColor: null,
    modelValue: null,
    value: null
  },
  emits: H,
  setup(n, { emit: a }) {
    const t = n;
    z((b, m) => ({
      "726a8035": m.thumbColor
    }));
    const e = $(t, a), r = f(() => e.value.toRgb()), l = f(() => e.value.getAlpha()), s = f(() => W("r", r.value)), i = f(() => W("g", r.value)), o = f(() => W("b", r.value)), u = (b, m) => {
      const d = Number(m);
      e.value = {
        ...r.value,
        [b]: d
      };
    }, p = f(() => `#${e.value.toHex()}`);
    return { __sfc: !0, getGradient: W, props: t, emit: a, tinyColorRef: e, rgb: r, alpha: l, redSliderBG: s, greenSliderBG: i, blueSliderBG: o, onChange: u, thumbColor: p, BaseSlider: q, AlphaSlider: G, EditableInput: L };
  }
});
var tn = function() {
  var a = this, t = a._self._c, e = a._self._setupProxy;
  return t("div", { staticClass: "vc-rgb-sliders" }, [t("div", { staticClass: "slider-wrap" }, [t("span", { staticClass: "label" }, [a._v("R")]), t(e.BaseSlider, { attrs: { "aria-label": "red", modelValue: e.rgb.r, max: 255 }, on: { "update:modelValue": (r) => e.onChange("r", r) }, scopedSlots: a._u([{ key: "background", fn: function() {
    return [t("div", { staticClass: "gradient", style: { background: e.redSliderBG } })];
  }, proxy: !0 }]) }), a.disableFields ? a._e() : t(e.EditableInput, { attrs: { value: e.rgb.r, a11y: { label: "red" }, min: 0, max: 255 }, on: { change: (r) => e.onChange("r", r) } })], 1), t("div", { staticClass: "slider-wrap" }, [t("span", { staticClass: "label" }, [a._v("G")]), t(e.BaseSlider, { attrs: { "aria-label": "green", modelValue: e.rgb.g, max: 255 }, on: { "update:modelValue": (r) => e.onChange("g", r) }, scopedSlots: a._u([{ key: "background", fn: function() {
    return [t("div", { staticClass: "gradient", style: { background: e.greenSliderBG } })];
  }, proxy: !0 }]) }), a.disableFields ? a._e() : t(e.EditableInput, { attrs: { value: e.rgb.g, a11y: { label: "green" }, min: 0, max: 255 }, on: { change: (r) => e.onChange("g", r) } })], 1), t("div", { staticClass: "slider-wrap" }, [t("span", { staticClass: "label" }, [a._v("B")]), t(e.BaseSlider, { attrs: { "aria-label": "blue", modelValue: e.rgb.b, max: 255 }, on: { "update:modelValue": (r) => e.onChange("b", r) }, scopedSlots: a._u([{ key: "background", fn: function() {
    return [t("div", { staticClass: "gradient", style: { background: e.blueSliderBG } })];
  }, proxy: !0 }]) }), a.disableFields ? a._e() : t(e.EditableInput, { attrs: { value: e.rgb.b, a11y: { label: "blue" }, min: 0, max: 255 }, on: { change: (r) => e.onChange("b", r) } })], 1), a.disableAlpha ? a._e() : t("div", { staticClass: "slider-wrap a-slider" }, [t("span", { staticClass: "label" }, [a._v("A")]), t(e.AlphaSlider, { model: { value: e.tinyColorRef, callback: function(r) {
    e.tinyColorRef = r;
  }, expression: "tinyColorRef" } }), a.disableFields ? a._e() : t(e.EditableInput, { attrs: { value: e.alpha.toFixed(2), a11y: { label: "alpha" }, min: 0, max: 1, step: 0.01 }, on: { change: (r) => e.onChange("a", r) } })], 1)]);
}, an = [], nn = /* @__PURE__ */ R(
  en,
  tn,
  an,
  !1,
  null,
  "fd219a5b"
);
const _n = nn.exports;
export {
  G as AlphaSlider,
  ln as ChromePicker,
  sn as CompactPicker,
  on as GrayscalePicker,
  vn as HSLSliders,
  gn as HSVSliders,
  bn as HueSlider,
  un as MaterialPicker,
  cn as PhotoshopPicker,
  _n as RGBSliders,
  dn as SketchPicker,
  fn as SliderPicker,
  hn as SwatchesPicker,
  pn as TwitterPicker,
  c as tinycolor
};
