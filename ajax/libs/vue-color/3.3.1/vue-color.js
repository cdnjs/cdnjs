import { computed as C, defineComponent as D, ref as O, onUnmounted as De, createElementBlock as y, openBlock as b, normalizeStyle as E, createElementVNode as u, createCommentVNode as V, renderSlot as we, normalizeClass as X, useCssVars as de, watch as pe, createBlock as T, withCtx as j, createVNode as w, unref as M, toDisplayString as J, isRef as q, withDirectives as ee, vShow as te, withKeys as G, Fragment as Q, renderList as ae, mergeProps as Oe } from "vue";
function ve(e) {
  "@babel/helpers - typeof";
  return ve = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ve(e);
}
var Ke = /^\s+/, ze = /\s+$/;
function g(e, t) {
  if (e = e || "", t = t || {}, e instanceof g)
    return e;
  if (!(this instanceof g))
    return new g(e, t);
  var a = je(e);
  this._originalInput = e, this._r = a.r, this._g = a.g, this._b = a.b, this._a = a.a, this._roundA = Math.round(100 * this._a) / 100, this._format = t.format || a.format, this._gradientType = t.gradientType, this._r < 1 && (this._r = Math.round(this._r)), this._g < 1 && (this._g = Math.round(this._g)), this._b < 1 && (this._b = Math.round(this._b)), this._ok = a.ok;
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
    var t = this.toRgb();
    return (t.r * 299 + t.g * 587 + t.b * 114) / 1e3;
  },
  getLuminance: function() {
    var t = this.toRgb(), a, r, l, n, i, o;
    return a = t.r / 255, r = t.g / 255, l = t.b / 255, a <= 0.03928 ? n = a / 12.92 : n = Math.pow((a + 0.055) / 1.055, 2.4), r <= 0.03928 ? i = r / 12.92 : i = Math.pow((r + 0.055) / 1.055, 2.4), l <= 0.03928 ? o = l / 12.92 : o = Math.pow((l + 0.055) / 1.055, 2.4), 0.2126 * n + 0.7152 * i + 0.0722 * o;
  },
  setAlpha: function(t) {
    return this._a = Ne(t), this._roundA = Math.round(100 * this._a) / 100, this;
  },
  toHsv: function() {
    var t = Re(this._r, this._g, this._b);
    return {
      h: t.h * 360,
      s: t.s,
      v: t.v,
      a: this._a
    };
  },
  toHsvString: function() {
    var t = Re(this._r, this._g, this._b), a = Math.round(t.h * 360), r = Math.round(t.s * 100), l = Math.round(t.v * 100);
    return this._a == 1 ? "hsv(" + a + ", " + r + "%, " + l + "%)" : "hsva(" + a + ", " + r + "%, " + l + "%, " + this._roundA + ")";
  },
  toHsl: function() {
    var t = Me(this._r, this._g, this._b);
    return {
      h: t.h * 360,
      s: t.s,
      l: t.l,
      a: this._a
    };
  },
  toHslString: function() {
    var t = Me(this._r, this._g, this._b), a = Math.round(t.h * 360), r = Math.round(t.s * 100), l = Math.round(t.l * 100);
    return this._a == 1 ? "hsl(" + a + ", " + r + "%, " + l + "%)" : "hsla(" + a + ", " + r + "%, " + l + "%, " + this._roundA + ")";
  },
  toHex: function(t) {
    return Ve(this._r, this._g, this._b, t);
  },
  toHexString: function(t) {
    return "#" + this.toHex(t);
  },
  toHex8: function(t) {
    return qe(this._r, this._g, this._b, this._a, t);
  },
  toHex8String: function(t) {
    return "#" + this.toHex8(t);
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
      r: Math.round(L(this._r, 255) * 100) + "%",
      g: Math.round(L(this._g, 255) * 100) + "%",
      b: Math.round(L(this._b, 255) * 100) + "%",
      a: this._a
    };
  },
  toPercentageRgbString: function() {
    return this._a == 1 ? "rgb(" + Math.round(L(this._r, 255) * 100) + "%, " + Math.round(L(this._g, 255) * 100) + "%, " + Math.round(L(this._b, 255) * 100) + "%)" : "rgba(" + Math.round(L(this._r, 255) * 100) + "%, " + Math.round(L(this._g, 255) * 100) + "%, " + Math.round(L(this._b, 255) * 100) + "%, " + this._roundA + ")";
  },
  toName: function() {
    return this._a === 0 ? "transparent" : this._a < 1 ? !1 : it[Ve(this._r, this._g, this._b, !0)] || !1;
  },
  toFilter: function(t) {
    var a = "#" + He(this._r, this._g, this._b, this._a), r = a, l = this._gradientType ? "GradientType = 1, " : "";
    if (t) {
      var n = g(t);
      r = "#" + He(n._r, n._g, n._b, n._a);
    }
    return "progid:DXImageTransform.Microsoft.gradient(" + l + "startColorstr=" + a + ",endColorstr=" + r + ")";
  },
  toString: function(t) {
    var a = !!t;
    t = t || this._format;
    var r = !1, l = this._a < 1 && this._a >= 0, n = !a && l && (t === "hex" || t === "hex6" || t === "hex3" || t === "hex4" || t === "hex8" || t === "name");
    return n ? t === "name" && this._a === 0 ? this.toName() : this.toRgbString() : (t === "rgb" && (r = this.toRgbString()), t === "prgb" && (r = this.toPercentageRgbString()), (t === "hex" || t === "hex6") && (r = this.toHexString()), t === "hex3" && (r = this.toHexString(!0)), t === "hex4" && (r = this.toHex8String(!0)), t === "hex8" && (r = this.toHex8String()), t === "name" && (r = this.toName()), t === "hsl" && (r = this.toHslString()), t === "hsv" && (r = this.toHsvString()), r || this.toHexString());
  },
  clone: function() {
    return g(this.toString());
  },
  _applyModification: function(t, a) {
    var r = t.apply(null, [this].concat([].slice.call(a)));
    return this._r = r._r, this._g = r._g, this._b = r._b, this.setAlpha(r._a), this;
  },
  lighten: function() {
    return this._applyModification(et, arguments);
  },
  brighten: function() {
    return this._applyModification(tt, arguments);
  },
  darken: function() {
    return this._applyModification(at, arguments);
  },
  desaturate: function() {
    return this._applyModification(Ze, arguments);
  },
  saturate: function() {
    return this._applyModification(Je, arguments);
  },
  greyscale: function() {
    return this._applyModification(Qe, arguments);
  },
  spin: function() {
    return this._applyModification(lt, arguments);
  },
  _applyCombination: function(t, a) {
    return t.apply(null, [this].concat([].slice.call(a)));
  },
  analogous: function() {
    return this._applyCombination(ot, arguments);
  },
  complement: function() {
    return this._applyCombination(nt, arguments);
  },
  monochromatic: function() {
    return this._applyCombination(st, arguments);
  },
  splitcomplement: function() {
    return this._applyCombination(rt, arguments);
  },
  // Disabled until https://github.com/bgrins/TinyColor/issues/254
  // polyad: function (number) {
  //   return this._applyCombination(polyad, [number]);
  // },
  triad: function() {
    return this._applyCombination(Be, [3]);
  },
  tetrad: function() {
    return this._applyCombination(Be, [4]);
  }
};
g.fromRatio = function(e, t) {
  if (ve(e) == "object") {
    var a = {};
    for (var r in e)
      e.hasOwnProperty(r) && (r === "a" ? a[r] = e[r] : a[r] = ue(e[r]));
    e = a;
  }
  return g(e, t);
};
function je(e) {
  var t = {
    r: 0,
    g: 0,
    b: 0
  }, a = 1, r = null, l = null, n = null, i = !1, o = !1;
  return typeof e == "string" && (e = ft(e)), ve(e) == "object" && (Y(e.r) && Y(e.g) && Y(e.b) ? (t = Xe(e.r, e.g, e.b), i = !0, o = String(e.r).substr(-1) === "%" ? "prgb" : "rgb") : Y(e.h) && Y(e.s) && Y(e.v) ? (r = ue(e.s), l = ue(e.v), t = We(e.h, r, l), i = !0, o = "hsv") : Y(e.h) && Y(e.s) && Y(e.l) && (r = ue(e.s), n = ue(e.l), t = Ye(e.h, r, n), i = !0, o = "hsl"), e.hasOwnProperty("a") && (a = e.a)), a = Ne(a), {
    ok: i,
    format: e.format || o,
    r: Math.min(255, Math.max(t.r, 0)),
    g: Math.min(255, Math.max(t.g, 0)),
    b: Math.min(255, Math.max(t.b, 0)),
    a
  };
}
function Xe(e, t, a) {
  return {
    r: L(e, 255) * 255,
    g: L(t, 255) * 255,
    b: L(a, 255) * 255
  };
}
function Me(e, t, a) {
  e = L(e, 255), t = L(t, 255), a = L(a, 255);
  var r = Math.max(e, t, a), l = Math.min(e, t, a), n, i, o = (r + l) / 2;
  if (r == l)
    n = i = 0;
  else {
    var f = r - l;
    switch (i = o > 0.5 ? f / (2 - r - l) : f / (r + l), r) {
      case e:
        n = (t - a) / f + (t < a ? 6 : 0);
        break;
      case t:
        n = (a - e) / f + 2;
        break;
      case a:
        n = (e - t) / f + 4;
        break;
    }
    n /= 6;
  }
  return {
    h: n,
    s: i,
    l: o
  };
}
function Ye(e, t, a) {
  var r, l, n;
  e = L(e, 360), t = L(t, 100), a = L(a, 100);
  function i(s, c, p) {
    return p < 0 && (p += 1), p > 1 && (p -= 1), p < 1 / 6 ? s + (c - s) * 6 * p : p < 1 / 2 ? c : p < 2 / 3 ? s + (c - s) * (2 / 3 - p) * 6 : s;
  }
  if (t === 0)
    r = l = n = a;
  else {
    var o = a < 0.5 ? a * (1 + t) : a + t - a * t, f = 2 * a - o;
    r = i(f, o, e + 1 / 3), l = i(f, o, e), n = i(f, o, e - 1 / 3);
  }
  return {
    r: r * 255,
    g: l * 255,
    b: n * 255
  };
}
function Re(e, t, a) {
  e = L(e, 255), t = L(t, 255), a = L(a, 255);
  var r = Math.max(e, t, a), l = Math.min(e, t, a), n, i, o = r, f = r - l;
  if (i = r === 0 ? 0 : f / r, r == l)
    n = 0;
  else {
    switch (r) {
      case e:
        n = (t - a) / f + (t < a ? 6 : 0);
        break;
      case t:
        n = (a - e) / f + 2;
        break;
      case a:
        n = (e - t) / f + 4;
        break;
    }
    n /= 6;
  }
  return {
    h: n,
    s: i,
    v: o
  };
}
function We(e, t, a) {
  e = L(e, 360) * 6, t = L(t, 100), a = L(a, 100);
  var r = Math.floor(e), l = e - r, n = a * (1 - t), i = a * (1 - l * t), o = a * (1 - (1 - l) * t), f = r % 6, s = [a, i, n, n, o, a][f], c = [o, a, a, i, n, n][f], p = [n, n, o, a, a, i][f];
  return {
    r: s * 255,
    g: c * 255,
    b: p * 255
  };
}
function Ve(e, t, a, r) {
  var l = [z(Math.round(e).toString(16)), z(Math.round(t).toString(16)), z(Math.round(a).toString(16))];
  return r && l[0].charAt(0) == l[0].charAt(1) && l[1].charAt(0) == l[1].charAt(1) && l[2].charAt(0) == l[2].charAt(1) ? l[0].charAt(0) + l[1].charAt(0) + l[2].charAt(0) : l.join("");
}
function qe(e, t, a, r, l) {
  var n = [z(Math.round(e).toString(16)), z(Math.round(t).toString(16)), z(Math.round(a).toString(16)), z(Te(r))];
  return l && n[0].charAt(0) == n[0].charAt(1) && n[1].charAt(0) == n[1].charAt(1) && n[2].charAt(0) == n[2].charAt(1) && n[3].charAt(0) == n[3].charAt(1) ? n[0].charAt(0) + n[1].charAt(0) + n[2].charAt(0) + n[3].charAt(0) : n.join("");
}
function He(e, t, a, r) {
  var l = [z(Te(r)), z(Math.round(e).toString(16)), z(Math.round(t).toString(16)), z(Math.round(a).toString(16))];
  return l.join("");
}
g.equals = function(e, t) {
  return !e || !t ? !1 : g(e).toRgbString() == g(t).toRgbString();
};
g.random = function() {
  return g.fromRatio({
    r: Math.random(),
    g: Math.random(),
    b: Math.random()
  });
};
function Ze(e, t) {
  t = t === 0 ? 0 : t || 10;
  var a = g(e).toHsl();
  return a.s -= t / 100, a.s = ge(a.s), g(a);
}
function Je(e, t) {
  t = t === 0 ? 0 : t || 10;
  var a = g(e).toHsl();
  return a.s += t / 100, a.s = ge(a.s), g(a);
}
function Qe(e) {
  return g(e).desaturate(100);
}
function et(e, t) {
  t = t === 0 ? 0 : t || 10;
  var a = g(e).toHsl();
  return a.l += t / 100, a.l = ge(a.l), g(a);
}
function tt(e, t) {
  t = t === 0 ? 0 : t || 10;
  var a = g(e).toRgb();
  return a.r = Math.max(0, Math.min(255, a.r - Math.round(255 * -(t / 100)))), a.g = Math.max(0, Math.min(255, a.g - Math.round(255 * -(t / 100)))), a.b = Math.max(0, Math.min(255, a.b - Math.round(255 * -(t / 100)))), g(a);
}
function at(e, t) {
  t = t === 0 ? 0 : t || 10;
  var a = g(e).toHsl();
  return a.l -= t / 100, a.l = ge(a.l), g(a);
}
function lt(e, t) {
  var a = g(e).toHsl(), r = (a.h + t) % 360;
  return a.h = r < 0 ? 360 + r : r, g(a);
}
function nt(e) {
  var t = g(e).toHsl();
  return t.h = (t.h + 180) % 360, g(t);
}
function Be(e, t) {
  if (isNaN(t) || t <= 0)
    throw new Error("Argument to polyad must be a positive number");
  for (var a = g(e).toHsl(), r = [g(e)], l = 360 / t, n = 1; n < t; n++)
    r.push(g({
      h: (a.h + n * l) % 360,
      s: a.s,
      l: a.l
    }));
  return r;
}
function rt(e) {
  var t = g(e).toHsl(), a = t.h;
  return [g(e), g({
    h: (a + 72) % 360,
    s: t.s,
    l: t.l
  }), g({
    h: (a + 216) % 360,
    s: t.s,
    l: t.l
  })];
}
function ot(e, t, a) {
  t = t || 6, a = a || 30;
  var r = g(e).toHsl(), l = 360 / a, n = [g(e)];
  for (r.h = (r.h - (l * t >> 1) + 720) % 360; --t; )
    r.h = (r.h + l) % 360, n.push(g(r));
  return n;
}
function st(e, t) {
  t = t || 6;
  for (var a = g(e).toHsv(), r = a.h, l = a.s, n = a.v, i = [], o = 1 / t; t--; )
    i.push(g({
      h: r,
      s: l,
      v: n
    })), n = (n + o) % 1;
  return i;
}
g.mix = function(e, t, a) {
  a = a === 0 ? 0 : a || 50;
  var r = g(e).toRgb(), l = g(t).toRgb(), n = a / 100, i = {
    r: (l.r - r.r) * n + r.r,
    g: (l.g - r.g) * n + r.g,
    b: (l.b - r.b) * n + r.b,
    a: (l.a - r.a) * n + r.a
  };
  return g(i);
};
g.readability = function(e, t) {
  var a = g(e), r = g(t);
  return (Math.max(a.getLuminance(), r.getLuminance()) + 0.05) / (Math.min(a.getLuminance(), r.getLuminance()) + 0.05);
};
g.isReadable = function(e, t, a) {
  var r = g.readability(e, t), l, n;
  switch (n = !1, l = ht(a), l.level + l.size) {
    case "AAsmall":
    case "AAAlarge":
      n = r >= 4.5;
      break;
    case "AAlarge":
      n = r >= 3;
      break;
    case "AAAsmall":
      n = r >= 7;
      break;
  }
  return n;
};
g.mostReadable = function(e, t, a) {
  var r = null, l = 0, n, i, o, f;
  a = a || {}, i = a.includeFallbackColors, o = a.level, f = a.size;
  for (var s = 0; s < t.length; s++)
    n = g.readability(e, t[s]), n > l && (l = n, r = g(t[s]));
  return g.isReadable(e, r, {
    level: o,
    size: f
  }) || !i ? r : (a.includeFallbackColors = !1, g.mostReadable(e, ["#fff", "#000"], a));
};
var xe = g.names = {
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
}, it = g.hexNames = ut(xe);
function ut(e) {
  var t = {};
  for (var a in e)
    e.hasOwnProperty(a) && (t[e[a]] = a);
  return t;
}
function Ne(e) {
  return e = parseFloat(e), (isNaN(e) || e < 0 || e > 1) && (e = 1), e;
}
function L(e, t) {
  dt(e) && (e = "100%");
  var a = ct(e);
  return e = Math.min(t, Math.max(0, parseFloat(e))), a && (e = parseInt(e * t, 10) / 100), Math.abs(e - t) < 1e-6 ? 1 : e % t / parseFloat(t);
}
function ge(e) {
  return Math.min(1, Math.max(0, e));
}
function P(e) {
  return parseInt(e, 16);
}
function dt(e) {
  return typeof e == "string" && e.indexOf(".") != -1 && parseFloat(e) === 1;
}
function ct(e) {
  return typeof e == "string" && e.indexOf("%") != -1;
}
function z(e) {
  return e.length == 1 ? "0" + e : "" + e;
}
function ue(e) {
  return e <= 1 && (e = e * 100 + "%"), e;
}
function Te(e) {
  return Math.round(parseFloat(e) * 255).toString(16);
}
function Le(e) {
  return P(e) / 255;
}
var K = function() {
  var e = "[-\\+]?\\d+%?", t = "[-\\+]?\\d*\\.\\d+%?", a = "(?:" + t + ")|(?:" + e + ")", r = "[\\s|\\(]+(" + a + ")[,|\\s]+(" + a + ")[,|\\s]+(" + a + ")\\s*\\)?", l = "[\\s|\\(]+(" + a + ")[,|\\s]+(" + a + ")[,|\\s]+(" + a + ")[,|\\s]+(" + a + ")\\s*\\)?";
  return {
    CSS_UNIT: new RegExp(a),
    rgb: new RegExp("rgb" + r),
    rgba: new RegExp("rgba" + l),
    hsl: new RegExp("hsl" + r),
    hsla: new RegExp("hsla" + l),
    hsv: new RegExp("hsv" + r),
    hsva: new RegExp("hsva" + l),
    hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
    hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
  };
}();
function Y(e) {
  return !!K.CSS_UNIT.exec(e);
}
function ft(e) {
  e = e.replace(Ke, "").replace(ze, "").toLowerCase();
  var t = !1;
  if (xe[e])
    e = xe[e], t = !0;
  else if (e == "transparent")
    return {
      r: 0,
      g: 0,
      b: 0,
      a: 0,
      format: "name"
    };
  var a;
  return (a = K.rgb.exec(e)) ? {
    r: a[1],
    g: a[2],
    b: a[3]
  } : (a = K.rgba.exec(e)) ? {
    r: a[1],
    g: a[2],
    b: a[3],
    a: a[4]
  } : (a = K.hsl.exec(e)) ? {
    h: a[1],
    s: a[2],
    l: a[3]
  } : (a = K.hsla.exec(e)) ? {
    h: a[1],
    s: a[2],
    l: a[3],
    a: a[4]
  } : (a = K.hsv.exec(e)) ? {
    h: a[1],
    s: a[2],
    v: a[3]
  } : (a = K.hsva.exec(e)) ? {
    h: a[1],
    s: a[2],
    v: a[3],
    a: a[4]
  } : (a = K.hex8.exec(e)) ? {
    r: P(a[1]),
    g: P(a[2]),
    b: P(a[3]),
    a: Le(a[4]),
    format: t ? "name" : "hex8"
  } : (a = K.hex6.exec(e)) ? {
    r: P(a[1]),
    g: P(a[2]),
    b: P(a[3]),
    format: t ? "name" : "hex"
  } : (a = K.hex4.exec(e)) ? {
    r: P(a[1] + "" + a[1]),
    g: P(a[2] + "" + a[2]),
    b: P(a[3] + "" + a[3]),
    a: Le(a[4] + "" + a[4]),
    format: t ? "name" : "hex8"
  } : (a = K.hex3.exec(e)) ? {
    r: P(a[1] + "" + a[1]),
    g: P(a[2] + "" + a[2]),
    b: P(a[3] + "" + a[3]),
    format: t ? "name" : "hex"
  } : !1;
}
function ht(e) {
  var t, a;
  return e = e || {
    level: "AA",
    size: "small"
  }, t = (e.level || "AA").toUpperCase(), a = (e.size || "small").toLowerCase(), t !== "AA" && t !== "AAA" && (t = "AA"), a !== "small" && a !== "large" && (a = "small"), {
    level: t,
    size: a
  };
}
const Ee = (e, t, a = !1) => {
  if (a)
    switch (t) {
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
    let r = t;
    t === "hex" && e.getAlpha() < 1 && (r = "hex8");
    let l = e.toString(r);
    try {
      l = JSON.parse(l);
    } catch {
    }
    return l;
  }
}, ye = (e, t) => !!(Object.prototype.hasOwnProperty.call(e, t) && typeof e[t] < "u"), he = (e) => typeof e > "u", I = ["update:tinyColor", "update:modelValue", "input"];
function U(e, t, a) {
  let r, l;
  const n = C({
    get: () => {
      const { modelValue: o, tinyColor: f, value: s } = e, c = f ?? o ?? s;
      return he(l) && (he(s) || (l = g(s).getFormat()), he(o) || (l = g(o).getFormat())), he(r) && (typeof s == "object" && !(s instanceof g) && (r = !0), typeof o == "object" && (r = !0)), g(c);
    },
    set: (o) => {
      i(o);
    }
  }), i = (o) => {
    const f = g(o);
    if (ye(e, "tinyColor") && t("update:tinyColor", f), ye(e, "modelValue")) {
      const s = Ee(f, l, r);
      t("update:modelValue", s);
    }
    if (ye(e, "value")) {
      const s = Ee(f, l, r);
      t("input", s);
    }
  };
  return n;
}
const Ie = (e) => {
  const t = { x: 0, y: 0 };
  return e instanceof MouseEvent && (t.x = e.pageX, t.y = e.pageY), typeof TouchEvent < "u" && e instanceof TouchEvent && (t.x = e.touches?.[0] ? e.touches[0].pageX : e.changedTouches?.[0] ? e.changedTouches[0].pageX : 0, t.y = e.touches?.[0] ? e.touches[0].pageY : e.changedTouches?.[0] ? e.changedTouches[0].pageY : 0), t;
}, vt = () => {
  const e = window.scrollX || window.pageXOffset || document.documentElement.scrollLeft || 0, t = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
  return { x: e, y: t };
}, Ue = (e) => {
  const { x: t, y: a } = vt(), r = e.getBoundingClientRect();
  return {
    x: r.left + t,
    y: r.top + a
  };
}, Fe = (e) => e.code === "ArrowUp" || e.keyCode === 38 ? "up" : e.code === "ArrowDown" || e.keyCode === 40 ? "down" : e.code === "ArrowLeft" || e.keyCode === 37 ? "left" : e.code === "ArrowRight" || e.keyCode === 39 ? "right" : null;
function bt(e) {
  const t = e.toString();
  return t.indexOf(".") !== -1 ? t.split(".")[1].length : 0;
}
function Ce(e, t, a) {
  return Math.min(Math.max(e, t), a);
}
const Pe = (e, t = 20) => {
  let a, r, l;
  return (...n) => {
    a ? (clearTimeout(r), r = setTimeout(() => {
      Date.now() - l >= t && (e(...n), l = Date.now());
    }, Math.max(t - (Date.now() - l), 0))) : (e(...n), l = Date.now(), a = !0);
  };
}, pt = ["aria-valuetext"], gt = /* @__PURE__ */ D({
  __name: "SaturationSlider",
  props: {
    hue: {},
    tinyColor: {},
    modelValue: {},
    value: {}
  },
  emits: ["change"].concat(I),
  setup(e, { emit: t }) {
    const a = t, r = e, l = O(0), n = U(r, a), i = C(() => n.value.toHsv()), o = C(() => r.hue ?? i.value.h), f = C(() => `hsl(${o.value}, 100%, 50%)`), s = C(() => -(i.value.v * 100) + 1 + 100 + "%"), c = C(() => i.value.v <= 0.01 ? l.value * 100 + "%" : i.value.s * 100 + "%"), p = O(null);
    function _(h) {
      const v = p.value;
      if (!v)
        return;
      const B = v.clientWidth, Z = v.clientHeight, { x: ne, y: R } = Ue(v), { x: $, y: F } = Ie(h), fe = Ce($ - ne, 0, B), ie = Ce(F - R, 0, Z), Ae = fe / B, Ge = Ce(1 - ie / Z, 0, 1);
      l.value = Ae;
      let me = Math.round(Ae * 100), _e = Math.round(Ge * 100);
      me === 1 && (me = 0.01), _e === 1 && (_e = 0.01), m({
        h: o.value,
        s: me,
        v: _e,
        a: i.value.a
      });
    }
    function m(h) {
      n.value = h;
    }
    const d = Pe(_, 20);
    function A(h) {
      h.preventDefault(), h.type.startsWith("mouse") ? (window.addEventListener("mousemove", d), window.addEventListener("mouseup", d), window.addEventListener("mouseup", k)) : h.type.startsWith("touch") && (window.addEventListener("touchmove", d), window.addEventListener("touchend", d), window.addEventListener("touchend", k));
    }
    function k() {
      H();
    }
    function H() {
      window.removeEventListener("mousemove", d), window.removeEventListener("mouseup", d), window.removeEventListener("mouseup", k), window.removeEventListener("touchmove", d), window.removeEventListener("touchend", d), window.removeEventListener("touchend", k);
    }
    function x(h) {
      switch (h.preventDefault(), Fe(h)) {
        case "left": {
          const B = i.value.s - 0.01;
          m({
            ...i.value,
            s: B >= 0 ? B : 0
          });
          break;
        }
        case "right": {
          const B = i.value.s + 0.01;
          m({
            ...i.value,
            s: B > 1 ? 1 : B
          });
          break;
        }
        case "up": {
          const B = i.value.v + 0.01;
          m({
            ...i.value,
            v: B > 1 ? 1 : B
          });
          break;
        }
        case "down": {
          const B = i.value.v - 0.01;
          m({
            ...i.value,
            v: B < 0 ? 0 : B
          });
          break;
        }
      }
    }
    return De(() => {
      H();
    }), (h, v) => (b(), y("div", {
      class: "vc-saturation-slider bg",
      style: E({ background: f.value }),
      ref_key: "containerRef",
      ref: p,
      onMousedown: A,
      onTouchstart: A,
      role: "application",
      "aria-label": "Saturation and brightness picker"
    }, [
      v[1] || (v[1] = u("div", { class: "bg white" }, null, -1)),
      v[2] || (v[2] = u("div", { class: "bg black" }, null, -1)),
      u("div", {
        class: "picker-wrap",
        style: E({ top: s.value, left: c.value }),
        role: "slider",
        tabindex: "0",
        "aria-valuemin": "0",
        "aria-valuemax": "1",
        "aria-label": "press arrow to change saturation or brightness",
        "aria-valuenow": "?",
        "aria-valuetext": `saturation: ${i.value.s.toFixed(0)}%, brightness: ${i.value.v.toFixed(0)}%`,
        onKeydown: x
      }, v[0] || (v[0] = [
        u("div", { class: "picker" }, null, -1)
      ]), 44, pt)
    ], 36));
  }
}), N = (e, t) => {
  const a = e.__vccOpts || e;
  for (const [r, l] of t)
    a[r] = l;
  return a;
}, Se = /* @__PURE__ */ N(gt, [["__scopeId", "data-v-2d73e50b"]]), $e = (e) => typeof e < "u", mt = { class: "vc-base-slider" }, _t = {
  key: 0,
  class: "background"
}, yt = ["aria-label", "aria-valuemax", "aria-valuenow"], Ct = /* @__PURE__ */ D({
  __name: "BaseSlider",
  props: {
    direction: { default: "horizontal" },
    modelValue: { default: 0 },
    value: { default: 0 },
    max: { default: 100 },
    step: {},
    ariaLabel: { default: "slider" }
  },
  emits: ["input", "update:modelValue"],
  setup(e, { emit: t }) {
    const a = e, r = t, l = C(() => a.modelValue ?? a.value), n = C(() => {
      let d = l.value / a.max;
      return a.direction === "vertical" && (d = 1 - d), 100 * d + "%";
    }), i = O(null);
    function o(d) {
      $e(d) && (r("input", d), r("update:modelValue", d));
    }
    function f(d) {
      const { direction: A, max: k } = a, H = i.value;
      if (!H)
        return;
      const x = H.clientWidth, h = H.clientHeight, { x: v, y: B } = Ue(H), { x: Z, y: ne } = Ie(d), R = Z - v, $ = ne - B;
      let F;
      A === "vertical" ? $ < 0 ? F = k : $ > h ? F = 0 : F = (1 - $ / h) * k : R < 0 ? F = 0 : R > x ? F = k : F = R / x * k, o(F);
    }
    const s = Pe(f);
    function c(d) {
      f(d), d.type.startsWith("mouse") ? (window.addEventListener("mousemove", s), window.addEventListener("mouseup", p)) : (window.addEventListener("touchmove", s), window.addEventListener("touchend", p));
    }
    function p() {
      _();
    }
    function _() {
      window.removeEventListener("mousemove", s), window.removeEventListener("mouseup", p), window.removeEventListener("touchmove", s), window.removeEventListener("touchend", p);
    }
    function m(d) {
      d.preventDefault();
      const { direction: A, max: k } = a, H = Fe(d), x = a.step ?? k / 100, h = l.value;
      let v;
      switch (H) {
        case "left": {
          if (A !== "horizontal")
            return;
          v = h - x < 0 ? 0 : h - x;
          break;
        }
        case "right": {
          if (A !== "horizontal")
            return;
          v = h + x > k ? k : h + x;
          break;
        }
        case "down": {
          if (A !== "vertical")
            return;
          v = h - x < 0 ? 0 : h - x;
          break;
        }
        case "up": {
          if (A !== "vertical")
            return;
          v = h + x > k ? k : h + x;
          break;
        }
      }
      o(v);
    }
    return De(() => {
      _();
    }), (d, A) => (b(), y("div", mt, [
      d.$slots.background ? (b(), y("div", _t, [
        we(d.$slots, "background", {}, void 0, !0)
      ])) : V("", !0),
      u("div", {
        class: X({
          slider: !0,
          horizontal: d.direction === "horizontal",
          vertical: d.direction === "vertical"
        }),
        ref_key: "containerRef",
        ref: i,
        onMousedown: c,
        onTouchstart: c,
        role: "slider",
        "aria-label": d.ariaLabel,
        "aria-valuemax": d.max,
        "aria-valuemin": "0",
        "aria-valuenow": l.value.toFixed(1),
        tabindex: "0",
        onKeydown: m
      }, [
        u("div", {
          class: "picker-wrap",
          style: E({
            left: d.direction === "horizontal" ? n.value : 0,
            top: d.direction === "vertical" ? n.value : 0
          }),
          role: "presentation"
        }, [
          we(d.$slots, "picker", {}, () => [
            A[0] || (A[0] = u("div", { class: "picker" }, null, -1))
          ], !0)
        ], 4)
      ], 42, yt)
    ]));
  }
}), W = /* @__PURE__ */ N(Ct, [["__scopeId", "data-v-b6b65dfc"]]), kt = /* @__PURE__ */ D({
  __name: "HueSlider",
  props: {
    direction: { default: "horizontal" },
    modelValue: { default: 0 }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    de((c) => ({
      "2f44f39d": l.value
    }));
    const a = e, r = t, l = C(() => `linear-gradient(to ${a.direction === "horizontal" ? "right" : "top"}, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)`), n = C(() => {
      const c = Number(a.modelValue);
      return Number.isNaN(c) ? 0 : c;
    }), i = O();
    pe(n, (c, p) => {
      c !== 0 && c - p > 0 && (i.value = "right"), c !== 0 && c - p < 0 && (i.value = "left");
    });
    const o = C(() => a.direction === "vertical" ? n.value === 0 && i.value === "right" ? 0 : n.value : a.direction === "horizontal" ? n.value === 0 && i.value === "right" ? 360 : n.value : 0);
    function f(c) {
      s(Math.round(c));
    }
    function s(c) {
      r("update:modelValue", c);
    }
    return (c, p) => (b(), T(W, {
      class: "vc-hue-slider",
      max: 360,
      step: 1,
      modelValue: o.value,
      direction: c.direction,
      "onUpdate:modelValue": f,
      "aria-label": "Hue"
    }, {
      background: j(() => p[0] || (p[0] = [
        u("div", { class: "gradient" }, null, -1)
      ])),
      picker: j(() => [
        we(c.$slots, "default", {}, void 0, !0)
      ]),
      _: 3
    }, 8, ["modelValue", "direction"]));
  }
}), le = /* @__PURE__ */ N(kt, [["__scopeId", "data-v-5367c985"]]), wt = /* @__PURE__ */ D({
  __name: "CheckerboardBG",
  props: {
    size: { default: 8 },
    white: { default: "#fff" },
    grey: { default: "#e6e6e6" }
  },
  setup(e) {
    const t = e;
    function a(n, i, o) {
      if (typeof document > "u")
        return null;
      var f = document.createElement("canvas");
      f.width = f.height = o * 2;
      var s = f.getContext("2d");
      return s ? (s.fillStyle = n, s.fillRect(0, 0, f.width, f.height), s.fillStyle = i, s.fillRect(0, 0, o, o), s.translate(o, o), s.fillRect(0, 0, o, o), f.toDataURL()) : null;
    }
    function r(n, i, o) {
      return a(n, i, o);
    }
    const l = C(() => `url(${r(t.white, t.grey, t.size)})`);
    return (n, i) => (b(), y("div", {
      class: "vc-checkerboard",
      style: E({ backgroundImage: l.value })
    }, null, 4));
  }
}), be = /* @__PURE__ */ N(wt, [["__scopeId", "data-v-37d61ccd"]]), xt = /* @__PURE__ */ D({
  __name: "AlphaSlider",
  props: {
    tinyColor: {},
    modelValue: {},
    value: {}
  },
  emits: I,
  setup(e, { emit: t }) {
    const l = U(e, t), n = C(() => {
      const f = l.value.toRgb(), s = [f.r, f.g, f.b].join(",");
      return "linear-gradient(to right, rgba(" + s + ", 0) 0%, rgba(" + s + ", 1) 100%)";
    }), i = C(() => l.value.getAlpha());
    function o(f) {
      l.value = l.value.setAlpha(f).clone();
    }
    return (f, s) => (b(), T(W, {
      class: "vc-alpha-slider",
      modelValue: i.value,
      max: 1,
      "aria-label": "Transparency",
      "onUpdate:modelValue": o
    }, {
      background: j(() => [
        w(be),
        u("div", {
          class: "gradient",
          style: E({ background: n.value })
        }, null, 4)
      ]),
      _: 1
    }, 8, ["modelValue"]));
  }
}), oe = /* @__PURE__ */ N(xt, [["__scopeId", "data-v-07dd346b"]]), $t = { class: "vc-editable-input" }, Ft = ["value", "aria-label"], St = {
  key: 0,
  class: "vc-input-desc",
  "aria-hidden": "true"
}, At = /* @__PURE__ */ D({
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
  setup(e, { emit: t }) {
    const a = e, r = t, l = a.a11y?.label ?? a.label, n = `input__label__${l}__${Math.random().toString().slice(2, 5)}`;
    function i(s) {
      const { min: c, max: p } = a;
      if ($e(p) && +s > p) {
        r("change", p);
        return;
      }
      if ($e(c) && +s < c) {
        r("change", c);
        return;
      }
      r("change", s);
    }
    function o(s) {
      i(s.target?.value);
    }
    function f(s) {
      let c = Number(a.value);
      if (!isNaN(c)) {
        let p = a.step;
        const _ = bt(p), m = Fe(s);
        m === "up" && (i((c + p).toFixed(_)), s.preventDefault()), m === "down" && (i((c - p).toFixed(_)), s.preventDefault());
      }
    }
    return (s, c) => (b(), y("div", $t, [
      u("input", {
        class: "vc-input-input",
        value: a.value,
        onKeydown: f,
        onInput: o,
        "aria-label": M(l),
        id: n
      }, null, 40, Ft),
      u("label", {
        for: n,
        class: "vc-input-label",
        "aria-hidden": "true"
      }, J(a.label), 1),
      s.desc ? (b(), y("span", St, J(s.desc), 1)) : V("", !0)
    ]));
  }
}), S = /* @__PURE__ */ N(At, [["__scopeId", "data-v-4a4df1fd"]]);
function Mt() {
  const e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return e.charAt(Math.floor(Math.random() * e.length)) + e.charAt(Math.floor(Math.random() * e.length));
}
const se = (e) => {
  const t = O(0), a = `__from__vc__hue__${Mt()}`;
  return pe(e, (l) => {
    if (l[a])
      return;
    const n = l.toHsl().h;
    n === 0 && t.value !== 0 || (t.value = n);
  }, { immediate: !0 }), { hueRef: t, updateHueRef: (l) => {
    const n = g({
      ...e.value.toHsl(),
      h: l
    });
    n[a] = !0, e.value = n, t.value = l;
  } };
}, ce = (e) => g(e).isValid(), Rt = (e) => g(e).getAlpha() === 0, Vt = { class: "saturation" }, Ht = { class: "body" }, Bt = { class: "controls" }, Lt = { class: "color-wrap" }, Et = ["aria-label"], Dt = { class: "sliders" }, Nt = { class: "hue-wrap" }, Tt = {
  key: 0,
  class: "alpha-wrap"
}, It = {
  key: 0,
  class: "fieldsWrap",
  "data-testid": "fields"
}, Ut = {
  key: 0,
  class: "fields"
}, Pt = { class: "field" }, Gt = { class: "field" }, Ot = { class: "field" }, Kt = {
  key: 0,
  class: "field"
}, zt = {
  key: 1,
  class: "fields"
}, jt = { class: "field" }, Xt = {
  key: 2,
  class: "fields"
}, Yt = { class: "field" }, Wt = { class: "field" }, qt = { class: "field" }, Zt = {
  key: 0,
  class: "field"
}, Jt = {
  class: "toggle-icon",
  role: "presentation"
}, Qt = {
  style: { width: "24px", height: "24px" },
  viewBox: "0 0 24 24"
}, ea = {
  class: "toggle-icon_highlighted",
  role: "presentation"
}, ta = /* @__PURE__ */ D({
  __name: "ChromePicker",
  props: {
    disableAlpha: { type: Boolean },
    disableFields: { type: Boolean },
    formats: { default: () => ["rgb", "hex", "hsl"] },
    tinyColor: {},
    modelValue: {},
    value: {}
  },
  emits: I,
  setup(e, { emit: t }) {
    const a = e, l = U(a, t), { hueRef: n, updateHueRef: i } = se(l), o = O(0);
    let f = O(!1);
    const s = C(() => {
      const R = l.value.toRgb();
      return "rgba(" + [R.r, R.g, R.b, l.value.getAlpha()].join(",") + ")";
    }), c = C(() => {
      const { h: R, s: $, l: F } = l.value.toHsl();
      return {
        h: R.toFixed(),
        s: `${($ * 100).toFixed()}%`,
        l: `${(F * 100).toFixed()}%`
      };
    }), p = C(() => l.value.toRgb()), _ = C(() => Number(l.value.getAlpha().toFixed(2))), m = /* @__PURE__ */ new Set(["hex", "hsl", "rgb"]), d = C(() => {
      const R = /* @__PURE__ */ new Set(), $ = [], F = a.formats;
      for (const fe of F)
        if (m.has(fe)) {
          const ie = fe;
          R.has(ie) || (R.add(ie), $.push(ie));
        }
      return $;
    }), A = C(() => {
      const { disableFields: R, formats: $ } = a;
      return !(R === !0 || !Array.isArray($) || d.value.length === 0);
    }), k = (R) => d.value.includes(R), H = (R) => d.value.indexOf(R), x = (R) => {
      R && ce(R) && (l.value = R);
    }, h = (R, $) => {
      if (!$ || isNaN(Number($)))
        return;
      const F = { [R]: $ };
      l.value = {
        ...p.value,
        a: _.value,
        ...F
      };
    }, v = (R, $) => {
      if (!$)
        return;
      const F = { [R]: +$ };
      (R === "s" || R === "l") && (F[R] = +$.replace("%", "") / 100), l.value = {
        ...l.value.toHsl(),
        a: _.value,
        ...F
      };
    }, B = () => {
      if (o.value === d.value.length - 1) {
        o.value = 0;
        return;
      }
      o.value++;
    }, Z = () => {
      f.value = !0;
    }, ne = () => {
      f.value = !1;
    };
    return (R, $) => (b(), y("div", {
      role: "application",
      "aria-label": "Chrome Color Picker",
      class: X(["vc-chrome-picker", R.disableAlpha ? "alpha-disabled" : ""])
    }, [
      u("div", Vt, [
        w(Se, {
          tinyColor: M(l),
          "onUpdate:tinyColor": $[0] || ($[0] = (F) => q(l) ? l.value = F : null),
          hue: M(n)
        }, null, 8, ["tinyColor", "hue"])
      ]),
      u("div", Ht, [
        u("div", Bt, [
          u("div", Lt, [
            u("div", {
              class: "active-color",
              style: E({ backgroundColor: s.value }),
              role: "presentation",
              "aria-live": "polite",
              "aria-label": `Current color is ${s.value}`
            }, null, 12, Et),
            a.disableAlpha ? V("", !0) : (b(), T(be, { key: 0 }))
          ]),
          u("div", Dt, [
            u("div", Nt, [
              w(le, {
                modelValue: M(n),
                "onUpdate:modelValue": M(i)
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ]),
            a.disableAlpha ? V("", !0) : (b(), y("div", Tt, [
              w(oe, {
                tinyColor: M(l),
                "onUpdate:tinyColor": $[1] || ($[1] = (F) => q(l) ? l.value = F : null)
              }, null, 8, ["tinyColor"])
            ]))
          ])
        ]),
        A.value ? (b(), y("div", It, [
          k("rgb") ? ee((b(), y("div", Ut, [
            u("div", Pt, [
              w(S, {
                label: "r",
                value: p.value.r,
                onChange: $[2] || ($[2] = (F) => h("r", F)),
                a11y: { label: "Red" }
              }, null, 8, ["value"])
            ]),
            u("div", Gt, [
              w(S, {
                label: "g",
                value: p.value.g,
                onChange: $[3] || ($[3] = (F) => h("g", F)),
                a11y: { label: "Green" }
              }, null, 8, ["value"])
            ]),
            u("div", Ot, [
              w(S, {
                label: "b",
                value: p.value.b,
                onChange: $[4] || ($[4] = (F) => h("b", F)),
                a11y: { label: "Blue" }
              }, null, 8, ["value"])
            ]),
            R.disableAlpha ? V("", !0) : (b(), y("div", Kt, [
              w(S, {
                label: "a",
                value: _.value,
                step: 0.01,
                max: 1,
                onChange: $[5] || ($[5] = (F) => h("a", F)),
                a11y: { label: "Transparency" }
              }, null, 8, ["value"])
            ]))
          ], 512)), [
            [te, o.value === H("rgb")]
          ]) : V("", !0),
          k("hex") ? ee((b(), y("div", zt, [
            u("div", jt, [
              _.value === 1 ? (b(), T(S, {
                key: 0,
                label: "hex",
                value: M(l).toHexString(),
                onChange: x,
                a11y: { label: "Hex" }
              }, null, 8, ["value"])) : V("", !0),
              _.value !== 1 ? (b(), T(S, {
                key: 1,
                label: "hex",
                value: M(l).toHex8String(),
                onChange: x,
                a11y: { label: "Hex with transparency" }
              }, null, 8, ["value"])) : V("", !0)
            ])
          ], 512)), [
            [te, o.value === H("hex")]
          ]) : V("", !0),
          k("hsl") ? ee((b(), y("div", Xt, [
            u("div", Yt, [
              w(S, {
                label: "h",
                value: M(n).toFixed(),
                onChange: $[6] || ($[6] = (F) => v("h", F)),
                a11y: { label: "Hue" }
              }, null, 8, ["value"])
            ]),
            u("div", Wt, [
              w(S, {
                label: "s",
                value: c.value.s,
                onChange: $[7] || ($[7] = (F) => v("s", F)),
                a11y: { label: "Saturation" }
              }, null, 8, ["value"])
            ]),
            u("div", qt, [
              w(S, {
                label: "l",
                value: c.value.l,
                onChange: $[8] || ($[8] = (F) => v("l", F)),
                a11y: { label: "Lightness" }
              }, null, 8, ["value"])
            ]),
            R.disableAlpha ? V("", !0) : (b(), y("div", Zt, [
              w(S, {
                label: "a",
                value: _.value,
                step: 0.01,
                max: 1,
                onChange: $[9] || ($[9] = (F) => v("a", F)),
                a11y: { label: "Transparency" }
              }, null, 8, ["value"])
            ]))
          ], 512)), [
            [te, o.value === H("hsl")]
          ]) : V("", !0),
          d.value.length > 1 ? (b(), y("div", {
            key: 3,
            class: "toggle-btn",
            onClick: B,
            onKeydown: [
              G(B, ["enter"]),
              G(B, ["space"])
            ],
            onMouseover: Z,
            onMouseenter: Z,
            onMouseout: ne,
            onFocus: Z,
            onBlur: ne,
            role: "button",
            "aria-label": "Change color format",
            tabindex: "0"
          }, [
            u("div", Jt, [
              (b(), y("svg", Qt, $[10] || ($[10] = [
                u("path", {
                  fill: "currentColor",
                  d: "M12,18.17L8.83,15L7.42,16.41L12,21L16.59,16.41L15.17,15M12,5.83L15.17,9L16.58,7.59L12,3L7.41,7.59L8.83,9L12,5.83Z"
                }, null, -1)
              ])))
            ]),
            ee(u("div", ea, null, 512), [
              [te, M(f)]
            ])
          ], 32)) : V("", !0)
        ])) : V("", !0)
      ])
    ], 2));
  }
}), pn = /* @__PURE__ */ N(ta, [["__scopeId", "data-v-abf90852"]]), aa = {
  class: "vc-compact-picker",
  role: "application",
  "aria-label": "Compact color picker",
  tabindex: "0"
}, la = {
  class: "colors",
  role: "listbox",
  "aria-label": "Pick a color"
}, na = ["onClick", "aria-label", "aria-selected", "title", "onKeydown"], ra = { class: "dot" }, oa = [
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
], sa = /* @__PURE__ */ D({
  __name: "CompactPicker",
  props: {
    palette: { default: () => oa },
    tinyColor: {},
    modelValue: {},
    value: {}
  },
  emits: ["change"].concat(I),
  setup(e, { emit: t }) {
    const a = e, l = U(a, t), n = C(() => l.value.toHexString().toUpperCase()), i = (o) => {
      l.value = o;
    };
    return (o, f) => (b(), y("div", aa, [
      u("ul", la, [
        (b(!0), y(Q, null, ae(a.palette, (s) => (b(), y("li", {
          key: s,
          class: X({ "color-item_white": s === "#FFFFFF", "color-item": !0 }),
          style: E({ background: s }),
          onClick: (c) => i(s),
          role: "option",
          "aria-label": "color:" + s,
          "aria-selected": s.toUpperCase() === n.value,
          title: s,
          onKeydown: G((c) => i(s), ["space"]),
          tabindex: "0"
        }, [
          ee(u("div", ra, null, 512), [
            [te, s.toUpperCase() === n.value]
          ])
        ], 46, na))), 128))
      ])
    ]));
  }
}), gn = /* @__PURE__ */ N(sa, [["__scopeId", "data-v-17eda10a"]]), ia = {
  role: "application",
  "aria-label": "Grayscale color picker",
  class: "vc-grayscale-picker"
}, ua = {
  class: "colors",
  role: "listbox",
  "aria-label": "Select a grayscale color",
  tabindex: "0"
}, da = ["onClick", "aria-label", "aria-selected", "title", "onKeydown"], ca = { class: "dot" }, fa = [
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
], ha = /* @__PURE__ */ D({
  __name: "GrayscalePicker",
  props: {
    palette: { default: () => fa },
    tinyColor: {},
    modelValue: {},
    value: {}
  },
  emits: ["change"].concat(I),
  setup(e, { emit: t }) {
    const l = U(e, t), n = C(() => l.value.toHexString().toUpperCase()), i = (o) => {
      l.value = o;
    };
    return (o, f) => (b(), y("div", ia, [
      u("ul", ua, [
        (b(!0), y(Q, null, ae(o.palette, (s) => (b(), y("li", {
          key: s,
          class: X({ "color-item_white": s === "#FFFFFF", "color-item": !0 }),
          style: E({ background: s }),
          onClick: (c) => i(s),
          role: "option",
          "aria-label": "color:" + s,
          "aria-selected": s.toUpperCase() === n.value,
          title: s,
          onKeydown: G((c) => i(s), ["space"]),
          tabindex: "0"
        }, [
          ee(u("div", ca, null, 512), [
            [te, s.toUpperCase() === n.value]
          ])
        ], 46, da))), 128))
      ])
    ]));
  }
}), mn = /* @__PURE__ */ N(ha, [["__scopeId", "data-v-85f108e1"]]), va = {
  role: "application",
  "aria-label": "Material color inputs",
  class: "vc-material-picker"
}, ba = { class: "rgb" }, pa = { class: "color" }, ga = { class: "color" }, ma = { class: "color" }, _a = /* @__PURE__ */ D({
  __name: "MaterialPicker",
  props: {
    tinyColor: {},
    modelValue: {},
    value: {}
  },
  emits: I,
  setup(e, { emit: t }) {
    const l = U(e, t), n = C(() => l.value.toRgb());
    function i(f) {
      ce(f) && (l.value = f);
    }
    function o(f, s) {
      l.value = {
        ...n.value,
        [f]: s
      };
    }
    return (f, s) => (b(), y("div", va, [
      w(S, {
        class: "hex",
        label: "hex",
        value: M(l).toHexString(),
        style: E({ borderColor: M(l).toHexString() }),
        onChange: i,
        a11y: { label: "Hex" }
      }, null, 8, ["value", "style"]),
      u("div", ba, [
        u("div", pa, [
          w(S, {
            label: "r",
            value: n.value.r,
            onChange: s[0] || (s[0] = (c) => o("r", c)),
            a11y: { label: "Red" }
          }, null, 8, ["value"])
        ]),
        u("div", ga, [
          w(S, {
            label: "g",
            value: n.value.g,
            onChange: s[1] || (s[1] = (c) => o("g", c)),
            a11y: { label: "Green" }
          }, null, 8, ["value"])
        ]),
        u("div", ma, [
          w(S, {
            label: "b",
            value: n.value.b,
            onChange: s[2] || (s[2] = (c) => o("b", c)),
            a11y: { label: "Blue" }
          }, null, 8, ["value"])
        ])
      ])
    ]));
  }
}), _n = /* @__PURE__ */ N(_a, [["__scopeId", "data-v-4e39f856"]]), ya = {
  class: "title",
  "aria-hidden": "true"
}, Ca = { class: "body" }, ka = { class: "saturation" }, wa = { class: "hue" }, xa = { class: "preview" }, $a = {
  class: "preview-label",
  "aria-hidden": "true"
}, Fa = { class: "preview-swatches" }, Sa = ["aria-label"], Aa = ["aria-label"], Ma = {
  class: "preview-label",
  "aria-hidden": "true"
}, Ra = {
  key: 0,
  class: "actions"
}, Va = ["aria-label"], Ha = { class: "fields" }, Ba = ["aria-label"], La = /* @__PURE__ */ D({
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
    modelValue: {},
    value: {}
  },
  emits: I.concat(["ok", "cancel", "reset"]),
  setup(e, { emit: t }) {
    const a = e, r = t, l = U(a, r), { hueRef: n, updateHueRef: i } = se(l), o = O(a.currentColor), f = C(() => l.value.toHsv()), s = C(() => {
      const x = l.value.toHexString();
      return x && x.replace("#", "");
    }), c = C(() => l.value.toRgb()), p = () => {
      l.value = o.value;
    }, _ = (x) => {
      x && ce(x) && (l.value = x);
    }, m = (x, h) => {
      if (!h || isNaN(Number(h)))
        return;
      const v = { [x]: h };
      l.value = {
        ...c.value,
        ...v
      };
    }, d = (x, h) => {
      if (!h || isNaN(Number(h)))
        return;
      const v = { [x]: Number(h) };
      l.value = {
        ...f.value,
        ...v
      };
    }, A = () => {
      r("ok");
    }, k = () => {
      r("cancel");
    }, H = () => {
      r("reset");
    };
    return (x, h) => (b(), y("div", {
      role: "application",
      "aria-label": "PhotoShop color picker",
      class: X(["vc-photoshop-picker", x.disableFields ? "fields_disabled" : ""])
    }, [
      u("div", ya, J(x.title), 1),
      u("div", Ca, [
        u("div", ka, [
          w(Se, {
            tinyColor: M(l),
            "onUpdate:tinyColor": h[0] || (h[0] = (v) => q(l) ? l.value = v : null),
            hue: M(n)
          }, null, 8, ["tinyColor", "hue"])
        ]),
        u("div", wa, [
          w(le, {
            direction: "vertical",
            modelValue: M(n),
            "onUpdate:modelValue": M(i)
          }, {
            default: j(() => h[7] || (h[7] = [
              u("div", { class: "hue-picker" }, [
                u("i", { class: "hue-picker-left" }),
                u("i", { class: "hue-picker-right" })
              ], -1)
            ])),
            _: 1,
            __: [7]
          }, 8, ["modelValue", "onUpdate:modelValue"])
        ]),
        u("div", {
          class: X(["controls", x.disableFields ? "controls_fields_disabled" : ""])
        }, [
          u("div", xa, [
            u("div", $a, J(x.newLabel), 1),
            u("div", Fa, [
              u("div", {
                class: "preview-color",
                "aria-label": `New color is #${s.value}`,
                style: E({ background: `#${s.value}` })
              }, null, 12, Sa),
              u("div", {
                class: "preview-color",
                style: E({ background: o.value }),
                onClick: p,
                role: "button",
                "aria-label": `Current color is ${o.value}`,
                onKeydown: G(p, ["space"]),
                tabindex: "0"
              }, null, 44, Aa)
            ]),
            u("div", Ma, J(x.currentLabel), 1)
          ]),
          x.disableFields ? V("", !0) : (b(), y("div", Ra, [
            u("div", {
              class: "action-btn",
              role: "button",
              "aria-label": "Click to apply new color",
              onClick: A,
              onKeydown: G(p, ["space"]),
              tabindex: "0"
            }, J(x.okLabel), 33),
            u("div", {
              class: "action-btn",
              role: "button",
              "aria-label": x.cancelLabel,
              onClick: k,
              onKeydown: G(p, ["space"]),
              tabindex: "0"
            }, J(x.cancelLabel), 41, Va),
            u("div", Ha, [
              w(S, {
                label: "h",
                desc: "°",
                value: f.value.h.toFixed(),
                onChange: h[1] || (h[1] = (v) => d("h", v)),
                a11y: { label: "Hue" }
              }, null, 8, ["value"]),
              w(S, {
                label: "s",
                desc: "%",
                value: (f.value.s * 100).toFixed(),
                min: 0,
                max: 100,
                onChange: h[2] || (h[2] = (v) => d("s", v)),
                a11y: { label: "Saturation" }
              }, null, 8, ["value"]),
              w(S, {
                label: "v",
                desc: "%",
                value: (f.value.v * 100).toFixed(),
                min: 0,
                max: 100,
                onChange: h[3] || (h[3] = (v) => d("v", v)),
                a11y: { label: "Value" }
              }, null, 8, ["value"]),
              h[8] || (h[8] = u("div", { class: "fields-divider" }, null, -1)),
              w(S, {
                label: "r",
                value: c.value.r,
                onChange: h[4] || (h[4] = (v) => m("r", v)),
                a11y: { label: "Red" }
              }, null, 8, ["value"]),
              w(S, {
                label: "g",
                value: c.value.g,
                onChange: h[5] || (h[5] = (v) => m("g", v)),
                a11y: { label: "Green" }
              }, null, 8, ["value"]),
              w(S, {
                label: "b",
                value: c.value.b,
                onChange: h[6] || (h[6] = (v) => m("b", v)),
                a11y: { label: "Blue" }
              }, null, 8, ["value"]),
              h[9] || (h[9] = u("div", { class: "fields-divider" }, null, -1)),
              w(S, {
                label: "#",
                class: "hex",
                value: s.value,
                onChange: _,
                a11y: { label: "Hex" }
              }, null, 8, ["value"])
            ]),
            x.hasResetButton ? (b(), y("div", {
              key: 0,
              class: "action-btn",
              onClick: H,
              role: "button",
              "aria-label": x.resetLabel,
              onKeydown: G(H, ["space"]),
              tabindex: "0"
            }, J(x.resetLabel), 41, Ba)) : V("", !0)
          ]))
        ], 2)
      ])
    ], 2));
  }
}), yn = /* @__PURE__ */ N(La, [["__scopeId", "data-v-fe6db8eb"]]), Ea = { class: "saturation" }, Da = { class: "controls" }, Na = { class: "sliders" }, Ta = { class: "hue" }, Ia = {
  key: 0,
  class: "alpha"
}, Ua = { class: "color" }, Pa = ["aria-label"], Ga = {
  key: 0,
  class: "field"
}, Oa = { class: "field_double" }, Ka = { class: "field_single" }, za = { class: "field_single" }, ja = { class: "field_single" }, Xa = {
  key: 0,
  class: "field_single"
}, Ya = {
  class: "presets",
  role: "listbox",
  "aria-label": "A color preset, pick one to set as current color"
}, Wa = ["onClick", "title", "aria-label", "aria-selected", "onKeydown"], qa = ["onClick", "aria-selected", "title", "onKeydown"], Za = [
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
], Ja = /* @__PURE__ */ D({
  __name: "SketchPicker",
  props: {
    presetColors: { default: () => Za },
    disableAlpha: { type: Boolean, default: !1 },
    disableFields: { type: Boolean, default: !1 },
    tinyColor: {},
    modelValue: {},
    value: {}
  },
  emits: ["change"].concat(I),
  setup(e, { emit: t }) {
    const a = e, l = U(a, t), { hueRef: n, updateHueRef: i } = se(l), o = C(() => Number(l.value.getAlpha().toFixed(2))), f = C(() => {
      let d;
      return o.value < 1 ? d = l.value.toHex8String() : d = l.value.toHexString(), d.replace("#", "");
    }), s = C(() => l.value.toRgb()), c = (d) => {
      d && ce(d) && (l.value = d);
    }, p = (d, A) => {
      if (!A || isNaN(Number(A)))
        return;
      const k = { [d]: A };
      l.value = {
        ...s.value,
        ...k
      };
    }, _ = (d) => {
      !d || isNaN(Number(d)) || (l.value = l.value.setAlpha(d).clone());
    }, m = (d) => {
      l.value = d;
    };
    return (d, A) => (b(), y("div", {
      role: "application",
      "aria-label": "Sketch color picker",
      class: X(["vc-sketch-picker", d.disableAlpha ? "alpha-disabled" : ""])
    }, [
      u("div", Ea, [
        w(Se, {
          hue: M(n),
          tinyColor: M(l),
          "onUpdate:tinyColor": A[0] || (A[0] = (k) => q(l) ? l.value = k : null)
        }, null, 8, ["hue", "tinyColor"])
      ]),
      u("div", Da, [
        u("div", Na, [
          u("div", Ta, [
            w(le, {
              modelValue: M(n),
              "onUpdate:modelValue": M(i)
            }, null, 8, ["modelValue", "onUpdate:modelValue"])
          ]),
          d.disableAlpha ? V("", !0) : (b(), y("div", Ia, [
            w(oe, {
              tinyColor: M(l),
              "onUpdate:tinyColor": A[1] || (A[1] = (k) => q(l) ? l.value = k : null)
            }, null, 8, ["tinyColor"])
          ]))
        ]),
        u("div", Ua, [
          u("div", {
            "aria-label": `Current color is ${M(l).toRgbString()}`,
            class: "active-color",
            style: E({ background: M(l).toRgbString() })
          }, null, 12, Pa),
          w(be)
        ])
      ]),
      d.disableFields ? V("", !0) : (b(), y("div", Ga, [
        u("div", Oa, [
          w(S, {
            label: "hex",
            value: f.value,
            onChange: c,
            a11y: { label: "Hex" }
          }, null, 8, ["value"])
        ]),
        u("div", Ka, [
          w(S, {
            label: "r",
            value: s.value.r,
            onChange: A[2] || (A[2] = (k) => p("r", k)),
            a11y: { label: "Red" }
          }, null, 8, ["value"])
        ]),
        u("div", za, [
          w(S, {
            label: "g",
            value: s.value.g,
            onChange: A[3] || (A[3] = (k) => p("g", k)),
            a11y: { label: "Green" }
          }, null, 8, ["value"])
        ]),
        u("div", ja, [
          w(S, {
            label: "b",
            value: s.value.b,
            onChange: A[4] || (A[4] = (k) => p("b", k)),
            a11y: { label: "Blue" }
          }, null, 8, ["value"])
        ]),
        d.disableAlpha ? V("", !0) : (b(), y("div", Xa, [
          w(S, {
            label: "a",
            value: o.value,
            step: 0.01,
            max: 1,
            onChange: _,
            a11y: { label: "Transparency" }
          }, null, 8, ["value"])
        ]))
      ])),
      u("div", Ya, [
        (b(!0), y(Q, null, ae(a.presetColors, (k) => (b(), y(Q, null, [
          M(Rt)(k) ? (b(), y("div", {
            key: k,
            class: "preset-color",
            onClick: (H) => m(k),
            "aria-label": "Color: transparency",
            "aria-selected": o.value === 0,
            role: "option",
            tabindex: "0",
            title: k,
            onKeydown: G((H) => m(k), ["space"])
          }, [
            w(be)
          ], 40, qa)) : (b(), y("div", {
            class: "preset-color",
            key: k + "-color",
            style: E({ background: k }),
            onClick: (H) => m(k),
            title: k,
            "aria-label": "Color:" + k,
            "aria-selected": `#${f.value.toLowerCase()}` === k.toLowerCase(),
            role: "option",
            tabindex: "0",
            onKeydown: G((H) => m(k), ["space"])
          }, null, 44, Wa))
        ], 64))), 256))
      ])
    ], 2));
  }
}), Cn = /* @__PURE__ */ N(Ja, [["__scopeId", "data-v-4a59b29b"]]), Qa = {
  role: "application",
  "aria-label": "Slider color picker",
  class: "vc-slider-picker"
}, el = { class: "hue" }, tl = {
  key: 0,
  class: "alpha"
}, al = {
  key: 1,
  class: "swatches",
  role: "listbox",
  "aria-label": "Color segments in different shades of one color",
  tabindex: "0"
}, ll = ["onClick", "aria-label", "title", "onKeydown", "aria-selected"], re = 0.5, nl = [
  { s: re, l: 0.8 },
  { s: re, l: 0.65 },
  { s: re, l: 0.5 },
  { s: re, l: 0.35 },
  { s: re, l: 0.2 }
], rl = /* @__PURE__ */ D({
  __name: "SliderPicker",
  props: {
    swatches: { default: () => nl },
    alpha: { type: Boolean },
    tinyColor: {},
    modelValue: {},
    value: {}
  },
  emits: I,
  setup(e, { emit: t }) {
    const a = e, l = U(a, t), { hueRef: n, updateHueRef: i } = se(l), o = C(() => l.value.toHsl()), f = C(() => l.value.toHexString()), s = C(() => a.swatches.map((m) => typeof m == "string" ? {
      s: re,
      l: Number(m)
    } : m)), c = (_) => o.value.l === 1 && _.l === 1 || o.value.l === 0 && _.l === 0 ? !0 : Math.abs(o.value.l - _.l) < 0.01 && Math.abs(o.value.s - _.s) < 0.01, p = (_) => {
      l.value = {
        h: o.value.h,
        s: _.s,
        l: _.l
      };
    };
    return (_, m) => (b(), y("div", Qa, [
      u("div", el, [
        w(le, {
          modelValue: M(n),
          "onUpdate:modelValue": M(i)
        }, null, 8, ["modelValue", "onUpdate:modelValue"])
      ]),
      a.alpha ? (b(), y("div", tl, [
        w(oe, {
          tinyColor: M(l),
          "onUpdate:tinyColor": m[0] || (m[0] = (d) => q(l) ? l.value = d : null)
        }, null, 8, ["tinyColor"])
      ])) : V("", !0),
      s.value.length > 0 ? (b(), y("div", al, [
        (b(!0), y(Q, null, ae(s.value, (d, A) => (b(), y("div", {
          class: "swatch",
          key: A,
          "data-index": "index",
          onClick: (k) => p(d),
          role: "option",
          "aria-label": "Color:" + f.value,
          title: f.value,
          onKeydown: G((k) => p(d), ["space"]),
          "aria-selected": c(d),
          tabindex: "0"
        }, [
          u("div", {
            class: X({
              picker: !0,
              picker_active: c(d),
              picker_white: d.l === 1
            }),
            style: E({ background: "hsl(" + o.value.h + ", " + d.s * 100 + "%, " + d.l * 100 + "%)" })
          }, null, 6)
        ], 40, ll))), 128))
      ])) : V("", !0)
    ]));
  }
}), kn = /* @__PURE__ */ N(rl, [["__scopeId", "data-v-675d6988"]]);
var ol = { 50: "#ffebee", 100: "#ffcdd2", 200: "#ef9a9a", 300: "#e57373", 400: "#ef5350", 500: "#f44336", 600: "#e53935", 700: "#d32f2f", 800: "#c62828", 900: "#b71c1c", a100: "#ff8a80", a200: "#ff5252", a400: "#ff1744", a700: "#d50000" }, sl = { 50: "#fce4ec", 100: "#f8bbd0", 200: "#f48fb1", 300: "#f06292", 400: "#ec407a", 500: "#e91e63", 600: "#d81b60", 700: "#c2185b", 800: "#ad1457", 900: "#880e4f", a100: "#ff80ab", a200: "#ff4081", a400: "#f50057", a700: "#c51162" }, il = { 50: "#f3e5f5", 100: "#e1bee7", 200: "#ce93d8", 300: "#ba68c8", 400: "#ab47bc", 500: "#9c27b0", 600: "#8e24aa", 700: "#7b1fa2", 800: "#6a1b9a", 900: "#4a148c", a100: "#ea80fc", a200: "#e040fb", a400: "#d500f9", a700: "#aa00ff" }, ul = { 50: "#ede7f6", 100: "#d1c4e9", 200: "#b39ddb", 300: "#9575cd", 400: "#7e57c2", 500: "#673ab7", 600: "#5e35b1", 700: "#512da8", 800: "#4527a0", 900: "#311b92", a100: "#b388ff", a200: "#7c4dff", a400: "#651fff", a700: "#6200ea" }, dl = { 50: "#e8eaf6", 100: "#c5cae9", 200: "#9fa8da", 300: "#7986cb", 400: "#5c6bc0", 500: "#3f51b5", 600: "#3949ab", 700: "#303f9f", 800: "#283593", 900: "#1a237e", a100: "#8c9eff", a200: "#536dfe", a400: "#3d5afe", a700: "#304ffe" }, cl = { 50: "#e3f2fd", 100: "#bbdefb", 200: "#90caf9", 300: "#64b5f6", 400: "#42a5f5", 500: "#2196f3", 600: "#1e88e5", 700: "#1976d2", 800: "#1565c0", 900: "#0d47a1", a100: "#82b1ff", a200: "#448aff", a400: "#2979ff", a700: "#2962ff" }, fl = { 50: "#e1f5fe", 100: "#b3e5fc", 200: "#81d4fa", 300: "#4fc3f7", 400: "#29b6f6", 500: "#03a9f4", 600: "#039be5", 700: "#0288d1", 800: "#0277bd", 900: "#01579b", a100: "#80d8ff", a200: "#40c4ff", a400: "#00b0ff", a700: "#0091ea" }, hl = { 50: "#e0f7fa", 100: "#b2ebf2", 200: "#80deea", 300: "#4dd0e1", 400: "#26c6da", 500: "#00bcd4", 600: "#00acc1", 700: "#0097a7", 800: "#00838f", 900: "#006064", a100: "#84ffff", a200: "#18ffff", a400: "#00e5ff", a700: "#00b8d4" }, vl = { 50: "#e0f2f1", 100: "#b2dfdb", 200: "#80cbc4", 300: "#4db6ac", 400: "#26a69a", 500: "#009688", 600: "#00897b", 700: "#00796b", 800: "#00695c", 900: "#004d40", a100: "#a7ffeb", a200: "#64ffda", a400: "#1de9b6", a700: "#00bfa5" }, bl = { 50: "#e8f5e9", 100: "#c8e6c9", 200: "#a5d6a7", 300: "#81c784", 400: "#66bb6a", 500: "#4caf50", 600: "#43a047", 700: "#388e3c", 800: "#2e7d32", 900: "#1b5e20", a100: "#b9f6ca", a200: "#69f0ae", a400: "#00e676", a700: "#00c853" }, pl = { 50: "#f1f8e9", 100: "#dcedc8", 200: "#c5e1a5", 300: "#aed581", 400: "#9ccc65", 500: "#8bc34a", 600: "#7cb342", 700: "#689f38", 800: "#558b2f", 900: "#33691e", a100: "#ccff90", a200: "#b2ff59", a400: "#76ff03", a700: "#64dd17" }, gl = { 50: "#f9fbe7", 100: "#f0f4c3", 200: "#e6ee9c", 300: "#dce775", 400: "#d4e157", 500: "#cddc39", 600: "#c0ca33", 700: "#afb42b", 800: "#9e9d24", 900: "#827717", a100: "#f4ff81", a200: "#eeff41", a400: "#c6ff00", a700: "#aeea00" }, ml = { 50: "#fffde7", 100: "#fff9c4", 200: "#fff59d", 300: "#fff176", 400: "#ffee58", 500: "#ffeb3b", 600: "#fdd835", 700: "#fbc02d", 800: "#f9a825", 900: "#f57f17", a100: "#ffff8d", a200: "#ffff00", a400: "#ffea00", a700: "#ffd600" }, _l = { 50: "#fff8e1", 100: "#ffecb3", 200: "#ffe082", 300: "#ffd54f", 400: "#ffca28", 500: "#ffc107", 600: "#ffb300", 700: "#ffa000", 800: "#ff8f00", 900: "#ff6f00", a100: "#ffe57f", a200: "#ffd740", a400: "#ffc400", a700: "#ffab00" }, yl = { 50: "#fff3e0", 100: "#ffe0b2", 200: "#ffcc80", 300: "#ffb74d", 400: "#ffa726", 500: "#ff9800", 600: "#fb8c00", 700: "#f57c00", 800: "#ef6c00", 900: "#e65100", a100: "#ffd180", a200: "#ffab40", a400: "#ff9100", a700: "#ff6d00" }, Cl = { 50: "#fbe9e7", 100: "#ffccbc", 200: "#ffab91", 300: "#ff8a65", 400: "#ff7043", 500: "#ff5722", 600: "#f4511e", 700: "#e64a19", 800: "#d84315", 900: "#bf360c", a100: "#ff9e80", a200: "#ff6e40", a400: "#ff3d00", a700: "#dd2c00" }, kl = { 50: "#efebe9", 100: "#d7ccc8", 200: "#bcaaa4", 300: "#a1887f", 400: "#8d6e63", 500: "#795548", 600: "#6d4c41", 700: "#5d4037", 800: "#4e342e", 900: "#3e2723" }, wl = { 50: "#fafafa", 100: "#f5f5f5", 200: "#eeeeee", 300: "#e0e0e0", 400: "#bdbdbd", 500: "#9e9e9e", 600: "#757575", 700: "#616161", 800: "#424242", 900: "#212121" }, xl = { 50: "#eceff1", 100: "#cfd8dc", 200: "#b0bec5", 300: "#90a4ae", 400: "#78909c", 500: "#607d8b", 600: "#546e7a", 700: "#455a64", 800: "#37474f", 900: "#263238" }, $l = { primary: "rgba(0, 0, 0, 0.87)", secondary: "rgba(0, 0, 0, 0.54)", disabled: "rgba(0, 0, 0, 0.38)", dividers: "rgba(0, 0, 0, 0.12)" }, Fl = { primary: "rgba(255, 255, 255, 1)", secondary: "rgba(255, 255, 255, 0.7)", disabled: "rgba(255, 255, 255, 0.5)", dividers: "rgba(255, 255, 255, 0.12)" }, Sl = { active: "rgba(0, 0, 0, 0.54)", inactive: "rgba(0, 0, 0, 0.38)" }, Al = { active: "rgba(255, 255, 255, 1)", inactive: "rgba(255, 255, 255, 0.5)" }, Ml = "#ffffff", Rl = "#000000";
const Vl = {
  red: ol,
  pink: sl,
  purple: il,
  deepPurple: ul,
  indigo: dl,
  blue: cl,
  lightBlue: fl,
  cyan: hl,
  teal: vl,
  green: bl,
  lightGreen: pl,
  lime: gl,
  yellow: ml,
  amber: _l,
  orange: yl,
  deepOrange: Cl,
  brown: kl,
  grey: wl,
  blueGrey: xl,
  darkText: $l,
  lightText: Fl,
  darkIcons: Sl,
  lightIcons: Al,
  white: Ml,
  black: Rl
}, Hl = ["data-pick"], Bl = {
  class: "box",
  role: "listbox",
  "aria-label": "Pick a color",
  tabindex: "0"
}, Ll = ["data-color", "onClick", "aria-label", "aria-selected", "title", "onKeydown"], El = { class: "picker" }, Dl = {
  style: { width: "24px", height: "24px" },
  viewBox: "0 0 24 24"
}, Nl = [
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
], Tl = ["900", "700", "500", "300", "100"], Il = /* @__PURE__ */ (() => {
  const e = [];
  return Nl.forEach((t) => {
    let a = [];
    t.toLowerCase() === "black" || t.toLowerCase() === "white" ? a = a.concat(["#000000", "#FFFFFF"]) : Tl.forEach((r) => {
      const l = Vl[t][r];
      a.push(l.toUpperCase());
    }), e.push(a);
  }), e;
})(), Ul = /* @__PURE__ */ D({
  __name: "SwatchesPicker",
  props: {
    palette: { default: () => Il },
    tinyColor: {},
    modelValue: {},
    value: {}
  },
  emits: I,
  setup(e, { emit: t }) {
    const l = U(e, t), n = C(() => l.value.toHexString()), i = (f) => f.toLowerCase() === n.value.toLowerCase(), o = (f) => {
      l.value = f;
    };
    return (f, s) => (b(), y("div", {
      role: "application",
      "aria-label": "Swatches color picker",
      class: "vc-swatches-picker",
      "data-pick": n.value
    }, [
      u("div", Bl, [
        (b(!0), y(Q, null, ae(f.palette, (c, p) => (b(), y("div", {
          class: "colorGroup",
          key: p
        }, [
          (b(!0), y(Q, null, ae(c, (_) => (b(), y("div", {
            class: X(["color", { color_white: _ === "#FFFFFF" }]),
            key: _,
            "data-color": _,
            style: E({ background: _ }),
            onClick: (m) => o(_),
            role: "option",
            "aria-label": "Color:" + _,
            "aria-selected": i(_),
            title: _,
            onKeydown: G((m) => o(_), ["space"]),
            tabindex: "0"
          }, [
            ee(u("div", El, [
              (b(), y("svg", Dl, s[0] || (s[0] = [
                u("path", { d: "M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" }, null, -1)
              ])))
            ], 512), [
              [te, i(_)]
            ])
          ], 46, Ll))), 128))
        ]))), 128))
      ])
    ], 8, Hl));
  }
}), wn = /* @__PURE__ */ N(Ul, [["__scopeId", "data-v-3427cb2a"]]), Pl = {
  class: "body",
  role: "listbox",
  tabindex: "0",
  "aria-label": "Select a color"
}, Gl = ["onClick", "aria-label", "title", "aria-selected", "onKeydown"], Ol = [
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
], Kl = /* @__PURE__ */ D({
  __name: "TwitterPicker",
  props: {
    width: { default: 276 },
    presetColors: { default: () => Ol },
    triangle: { default: "top-left" },
    tinyColor: {},
    modelValue: {},
    value: {}
  },
  emits: I,
  setup(e, { emit: t }) {
    const a = e, l = U(a, t), n = C(() => l.value.toHexString()), i = (s) => s.toLowerCase() === n.value.toLowerCase(), o = (s) => {
      l.value = s;
    }, f = (s) => {
      ce(s) && (l.value = s);
    };
    return (s, c) => (b(), y("div", {
      class: X(["vc-twitter-picker", {
        tri_hide: a.triangle === "hide",
        tri_top_left: a.triangle === "top-left",
        tri_top_right: a.triangle === "top-right"
      }]),
      style: E({
        width: typeof a.width == "number" ? `${a.width}px` : a.width
      }),
      role: "application",
      "aria-label": "Twitter color picker"
    }, [
      c[2] || (c[2] = u("div", { class: "triangle_shadow" }, null, -1)),
      c[3] || (c[3] = u("div", { class: "triangle" }, null, -1)),
      u("div", Pl, [
        (b(!0), y(Q, null, ae(s.presetColors, (p, _) => (b(), y("span", {
          key: _,
          class: "swatch",
          style: E({
            background: p,
            boxShadow: `0 0 4px ${i(p) ? p : "transparent"}`
          }),
          onClick: (m) => o(p),
          role: "option",
          "aria-label": "color:" + p,
          title: p,
          "aria-selected": i(p),
          onKeydown: G((m) => o(p), ["space"]),
          tabindex: "0"
        }, null, 44, Gl))), 128)),
        c[0] || (c[0] = u("div", {
          class: "hash",
          "aria-hidden": "true"
        }, "#", -1)),
        w(S, {
          value: n.value.replace("#", ""),
          onChange: f,
          a11y: { label: "Hex" }
        }, null, 8, ["value"]),
        c[1] || (c[1] = u("div", { class: "clear" }, null, -1))
      ])
    ], 6));
  }
}), xn = /* @__PURE__ */ N(Kl, [["__scopeId", "data-v-4652e193"]]), zl = /* @__PURE__ */ D({
  __name: "HueSlider",
  props: {
    modelValue: {},
    value: {}
  },
  emits: ["input", "update:modelValue"],
  setup(e, { emit: t }) {
    de((o) => ({
      "46ac36b6": i.value
    }));
    const a = t, r = e, l = C(() => r.modelValue ?? r.value ?? 0), n = (o) => {
      a("input", o), a("update:modelValue", o);
    }, i = C(() => `hsl(${l.value}, 100%, 50%)`);
    return (o, f) => (b(), T(le, Oe({ class: "vc-hue-wrap" }, o.$attrs, {
      modelValue: l.value,
      "onUpdate:modelValue": n
    }), null, 16, ["modelValue"]));
  }
}), $n = /* @__PURE__ */ N(zl, [["__scopeId", "data-v-b3ac1ab2"]]), jl = { class: "vc-hsl-sliders" }, Xl = { class: "slider-wrap h-slider" }, Yl = { class: "slider-wrap s-slider" }, Wl = { class: "slider-wrap l-slider" }, ql = {
  key: 0,
  class: "slider-wrap a-slider"
};
function Zl(e, t) {
  return `linear-gradient(to right,
    hsl(${e} 0% ${t}%),
    hsl(${e} 50% ${t}%),
    hsl(${e} 100% ${t}%)
  )`;
}
function Jl(e, t) {
  return `linear-gradient(to right,
    hsl(${e} ${t}% 0%),
    hsl(${e} ${t}% 10%),
    hsl(${e} ${t}% 20%),
    hsl(${e} ${t}% 30%),
    hsl(${e} ${t}% 40%),
    hsl(${e} ${t}% 50%),
    hsl(${e} ${t}% 60%),
    hsl(${e} ${t}% 70%),
    hsl(${e} ${t}% 80%),
    hsl(${e} ${t}% 90%),
    hsl(${e} ${t}% 100%)
  )`;
}
const Ql = /* @__PURE__ */ D({
  __name: "HSLSliders",
  props: {
    disableAlpha: { type: Boolean, default: !1 },
    disableFields: { type: Boolean, default: !1 },
    tinyColor: {},
    modelValue: {},
    value: {}
  },
  emits: I,
  setup(e, { emit: t }) {
    de((h) => ({
      "41b5b6d0": H.value,
      "05fbe691": x.value
    }));
    const l = U(e, t), { hueRef: n, updateHueRef: i } = se(l), o = C(() => l.value.toHsl()), f = C(() => l.value.getAlpha()), s = O(o.value.s * 100), c = O(o.value.l * 100);
    pe(o, () => {
      s.value = o.value.s * 100, c.value = o.value.l * 100;
    });
    const p = (h) => {
      h && i(Number(h));
    }, _ = (h) => {
      const v = Number(h);
      s.value = v, l.value = {
        ...o.value,
        s: v / 100
      };
    }, m = (h) => {
      const v = Number(h);
      c.value = v, l.value = {
        ...o.value,
        l: v / 100
      };
    }, d = (h) => {
      const v = Number(h);
      l.value = {
        ...o.value,
        a: v
      };
    }, A = C(
      () => Zl(n.value, c.value)
    ), k = C(
      () => Jl(n.value, s.value)
    ), H = C(() => `hsl(${n.value}, 100%, 50%)`), x = C(() => `hsl(${n.value}, ${s.value}%, ${c.value}%)`);
    return (h, v) => (b(), y("div", jl, [
      u("div", Xl, [
        v[1] || (v[1] = u("span", { class: "label" }, "H", -1)),
        w(le, {
          modelValue: M(n),
          "onUpdate:modelValue": M(i)
        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
        h.disableFields ? V("", !0) : (b(), T(S, {
          key: 0,
          value: Number(M(n)).toFixed(),
          onChange: p,
          a11y: { label: "hue" }
        }, null, 8, ["value"]))
      ]),
      u("div", Yl, [
        v[2] || (v[2] = u("span", { class: "label" }, "S", -1)),
        w(W, {
          "aria-label": "saturation",
          modelValue: s.value,
          "onUpdate:modelValue": _
        }, {
          background: j(() => [
            u("div", {
              class: "gradient",
              style: E({ background: A.value })
            }, null, 4)
          ]),
          _: 1
        }, 8, ["modelValue"]),
        h.disableFields ? V("", !0) : (b(), T(S, {
          key: 0,
          value: s.value.toFixed(),
          onChange: _,
          a11y: { label: "saturation" },
          min: 0,
          max: 100
        }, null, 8, ["value"]))
      ]),
      u("div", Wl, [
        v[3] || (v[3] = u("span", { class: "label" }, "L", -1)),
        w(W, {
          "aria-label": "lightness",
          modelValue: c.value,
          "onUpdate:modelValue": m
        }, {
          background: j(() => [
            u("div", {
              class: "gradient",
              style: E({ background: k.value })
            }, null, 4)
          ]),
          _: 1
        }, 8, ["modelValue"]),
        h.disableFields ? V("", !0) : (b(), T(S, {
          key: 0,
          value: c.value.toFixed(),
          onChange: m,
          a11y: { label: "lightness" },
          min: 0,
          max: 100
        }, null, 8, ["value"]))
      ]),
      h.disableAlpha ? V("", !0) : (b(), y("div", ql, [
        v[4] || (v[4] = u("span", { class: "label" }, "A", -1)),
        w(oe, {
          tinyColor: M(l),
          "onUpdate:tinyColor": v[0] || (v[0] = (B) => q(l) ? l.value = B : null)
        }, null, 8, ["tinyColor"]),
        h.disableFields ? V("", !0) : (b(), T(S, {
          key: 0,
          value: f.value.toFixed(2),
          onChange: d,
          a11y: { label: "alpha" },
          min: 0,
          max: 1,
          step: 0.01
        }, null, 8, ["value"]))
      ]))
    ]));
  }
}), Fn = /* @__PURE__ */ N(Ql, [["__scopeId", "data-v-2e071f54"]]), en = { class: "vc-hsv-sliders" }, tn = { class: "slider-wrap h-slider" }, an = { class: "slider-wrap s-slider" }, ln = { class: "slider-wrap b-slider" }, nn = {
  key: 0,
  class: "slider-wrap"
};
function rn(e, t) {
  const r = [];
  for (let l = 0; l <= 10; l++) {
    let n = l / 10;
    const i = { h: e, s: n, v: t / 100 }, o = g(i).toRgb();
    if (o) {
      const f = Math.round(o.r), s = Math.round(o.g), c = Math.round(o.b);
      r.push(`rgb(${f} ${s} ${c})`);
    }
  }
  return `linear-gradient(to right, ${r.join(", ")})`;
}
function on(e, t) {
  const r = [];
  for (let l = 0; l <= 10; l++) {
    let n = l / 10;
    const i = { h: e, s: t / 100, v: n }, o = g(i).toRgb();
    if (o) {
      const f = Math.round(o.r), s = Math.round(o.g), c = Math.round(o.b);
      r.push(`rgb(${f} ${s} ${c})`);
    }
  }
  return `linear-gradient(to right, ${r.join(", ")})`;
}
const sn = /* @__PURE__ */ D({
  __name: "HSVSliders",
  props: {
    disableAlpha: { type: Boolean, default: !1 },
    disableFields: { type: Boolean, default: !1 },
    tinyColor: {},
    modelValue: {},
    value: {}
  },
  emits: I,
  setup(e, { emit: t }) {
    de((h) => ({
      f666f450: H.value,
      "46b90cce": x.value
    }));
    const l = U(e, t), { hueRef: n, updateHueRef: i } = se(l), o = C(() => l.value.toHsv()), f = C(() => l.value.getAlpha()), s = O(o.value.s * 100), c = O(o.value.v * 100);
    pe(o, () => {
      s.value = o.value.s * 100, c.value = o.value.v * 100;
    });
    const p = C(() => rn(n.value, c.value)), _ = C(() => on(n.value, s.value)), m = (h) => {
      h && i(Number(h));
    }, d = (h) => {
      const v = Number(h);
      s.value = v, l.value = {
        ...o.value,
        s: v / 100
      };
    }, A = (h) => {
      const v = Number(h);
      c.value = v, l.value = {
        ...o.value,
        v: v / 100
      };
    }, k = (h) => {
      const v = Number(h);
      l.value = {
        ...o.value,
        a: v
      };
    }, H = C(() => `hsl(${n.value}, 100%, 50%)`), x = C(() => g({
      ...o.value,
      a: 1
    }).toHslString());
    return (h, v) => (b(), y("div", en, [
      u("div", tn, [
        v[1] || (v[1] = u("span", { class: "label" }, "H", -1)),
        w(le, {
          modelValue: M(n),
          "onUpdate:modelValue": M(i)
        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
        h.disableFields ? V("", !0) : (b(), T(S, {
          key: 0,
          value: Number(M(n)).toFixed(),
          onChange: m,
          a11y: { label: "hue" }
        }, null, 8, ["value"]))
      ]),
      u("div", an, [
        v[2] || (v[2] = u("span", { class: "label" }, "S", -1)),
        w(W, {
          "aria-label": "saturation",
          modelValue: s.value,
          "onUpdate:modelValue": d
        }, {
          background: j(() => [
            u("div", {
              class: "gradient",
              style: E({ background: p.value })
            }, null, 4)
          ]),
          _: 1
        }, 8, ["modelValue"]),
        h.disableFields ? V("", !0) : (b(), T(S, {
          key: 0,
          value: s.value.toFixed(),
          onChange: d,
          a11y: { label: "saturation" },
          min: 0,
          max: 100
        }, null, 8, ["value"]))
      ]),
      u("div", ln, [
        v[3] || (v[3] = u("span", { class: "label" }, "V", -1)),
        w(W, {
          "aria-label": "brightness",
          modelValue: c.value,
          "onUpdate:modelValue": A
        }, {
          background: j(() => [
            u("div", {
              class: "gradient",
              style: E({ background: _.value })
            }, null, 4)
          ]),
          _: 1
        }, 8, ["modelValue"]),
        h.disableFields ? V("", !0) : (b(), T(S, {
          key: 0,
          value: c.value.toFixed(),
          onChange: A,
          a11y: { label: "brightness" },
          min: 0,
          max: 100
        }, null, 8, ["value"]))
      ]),
      h.disableAlpha ? V("", !0) : (b(), y("div", nn, [
        v[4] || (v[4] = u("span", { class: "label" }, "A", -1)),
        w(oe, {
          tinyColor: M(l),
          "onUpdate:tinyColor": v[0] || (v[0] = (B) => q(l) ? l.value = B : null)
        }, null, 8, ["tinyColor"]),
        h.disableFields ? V("", !0) : (b(), T(S, {
          key: 0,
          value: f.value.toFixed(2),
          onChange: k,
          a11y: { label: "alpha" },
          min: 0,
          max: 1,
          step: 0.01
        }, null, 8, ["value"]))
      ]))
    ]));
  }
}), Sn = /* @__PURE__ */ N(sn, [["__scopeId", "data-v-d6cfe1d9"]]), un = { class: "vc-rgb-sliders" }, dn = { class: "slider-wrap" }, cn = { class: "slider-wrap" }, fn = { class: "slider-wrap" }, hn = {
  key: 0,
  class: "slider-wrap a-slider"
}, ke = (e, t) => {
  const r = [];
  for (let l = 1; l <= 255; l++) {
    const { r: n, g: i, b: o } = {
      ...t,
      [e]: l
    };
    r.push(`rgb(${n}, ${i}, ${o})`);
  }
  return `linear-gradient(to right, ${r.join(", ")})`;
}, vn = /* @__PURE__ */ D({
  __name: "RGBSliders",
  props: {
    disableAlpha: { type: Boolean, default: !1 },
    disableFields: { type: Boolean, default: !1 },
    tinyColor: {},
    modelValue: {},
    value: {}
  },
  emits: I,
  setup(e, { emit: t }) {
    de((_) => ({
      "5f730604": p.value
    }));
    const l = U(e, t), n = C(() => l.value.toRgb()), i = C(() => l.value.getAlpha()), o = C(() => ke("r", n.value)), f = C(() => ke("g", n.value)), s = C(() => ke("b", n.value)), c = (_, m) => {
      const d = Number(m);
      l.value = {
        ...n.value,
        [_]: d
      };
    }, p = C(() => `#${l.value.toHex()}`);
    return (_, m) => (b(), y("div", un, [
      u("div", dn, [
        m[8] || (m[8] = u("span", { class: "label" }, "R", -1)),
        w(W, {
          "aria-label": "red",
          modelValue: n.value.r,
          "onUpdate:modelValue": m[0] || (m[0] = (d) => c("r", d)),
          max: 255
        }, {
          background: j(() => [
            u("div", {
              class: "gradient",
              style: E({ background: o.value })
            }, null, 4)
          ]),
          _: 1
        }, 8, ["modelValue"]),
        _.disableFields ? V("", !0) : (b(), T(S, {
          key: 0,
          value: n.value.r,
          onChange: m[1] || (m[1] = (d) => c("r", d)),
          a11y: { label: "red" },
          min: 0,
          max: 255
        }, null, 8, ["value"]))
      ]),
      u("div", cn, [
        m[9] || (m[9] = u("span", { class: "label" }, "G", -1)),
        w(W, {
          "aria-label": "green",
          modelValue: n.value.g,
          "onUpdate:modelValue": m[2] || (m[2] = (d) => c("g", d)),
          max: 255
        }, {
          background: j(() => [
            u("div", {
              class: "gradient",
              style: E({ background: f.value })
            }, null, 4)
          ]),
          _: 1
        }, 8, ["modelValue"]),
        _.disableFields ? V("", !0) : (b(), T(S, {
          key: 0,
          value: n.value.g,
          onChange: m[3] || (m[3] = (d) => c("g", d)),
          a11y: { label: "green" },
          min: 0,
          max: 255
        }, null, 8, ["value"]))
      ]),
      u("div", fn, [
        m[10] || (m[10] = u("span", { class: "label" }, "B", -1)),
        w(W, {
          "aria-label": "blue",
          modelValue: n.value.b,
          "onUpdate:modelValue": m[4] || (m[4] = (d) => c("b", d)),
          max: 255
        }, {
          background: j(() => [
            u("div", {
              class: "gradient",
              style: E({ background: s.value })
            }, null, 4)
          ]),
          _: 1
        }, 8, ["modelValue"]),
        _.disableFields ? V("", !0) : (b(), T(S, {
          key: 0,
          value: n.value.b,
          onChange: m[5] || (m[5] = (d) => c("b", d)),
          a11y: { label: "blue" },
          min: 0,
          max: 255
        }, null, 8, ["value"]))
      ]),
      _.disableAlpha ? V("", !0) : (b(), y("div", hn, [
        m[11] || (m[11] = u("span", { class: "label" }, "A", -1)),
        w(oe, {
          tinyColor: M(l),
          "onUpdate:tinyColor": m[6] || (m[6] = (d) => q(l) ? l.value = d : null)
        }, null, 8, ["tinyColor"]),
        _.disableFields ? V("", !0) : (b(), T(S, {
          key: 0,
          value: i.value.toFixed(2),
          onChange: m[7] || (m[7] = (d) => c("a", d)),
          a11y: { label: "alpha" },
          min: 0,
          max: 1,
          step: 0.01
        }, null, 8, ["value"]))
      ]))
    ]));
  }
}), An = /* @__PURE__ */ N(vn, [["__scopeId", "data-v-98b3b212"]]);
export {
  oe as AlphaSlider,
  pn as ChromePicker,
  gn as CompactPicker,
  mn as GrayscalePicker,
  Fn as HSLSliders,
  Sn as HSVSliders,
  $n as HueSlider,
  _n as MaterialPicker,
  yn as PhotoshopPicker,
  An as RGBSliders,
  Cn as SketchPicker,
  kn as SliderPicker,
  wn as SwatchesPicker,
  xn as TwitterPicker,
  g as tinycolor
};
