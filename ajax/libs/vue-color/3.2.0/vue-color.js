import { computed as S, defineComponent as D, ref as X, onUnmounted as _e, createElementBlock as _, openBlock as g, normalizeStyle as V, createElementVNode as u, watch as Ee, normalizeClass as G, renderSlot as Te, createVNode as x, createCommentVNode as B, unref as H, toDisplayString as j, isRef as ae, createBlock as se, withDirectives as Z, vShow as J, withKeys as I, Fragment as q, renderList as Q, withCtx as Pe, useCssVars as Ie, mergeProps as Ne } from "vue";
function ue(e) {
  "@babel/helpers - typeof";
  return ue = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(a) {
    return typeof a;
  } : function(a) {
    return a && typeof Symbol == "function" && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a;
  }, ue(e);
}
var Ue = /^\s+/, Oe = /\s+$/;
function h(e, a) {
  if (e = e || "", a = a || {}, e instanceof h)
    return e;
  if (!(this instanceof h))
    return new h(e, a);
  var t = Ke(e);
  this._originalInput = e, this._r = t.r, this._g = t.g, this._b = t.b, this._a = t.a, this._roundA = Math.round(100 * this._a) / 100, this._format = a.format || t.format, this._gradientType = a.gradientType, this._r < 1 && (this._r = Math.round(this._r)), this._g < 1 && (this._g = Math.round(this._g)), this._b < 1 && (this._b = Math.round(this._b)), this._ok = t.ok;
}
h.prototype = {
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
    var a = this.toRgb(), t, r, n, l, s, o;
    return t = a.r / 255, r = a.g / 255, n = a.b / 255, t <= 0.03928 ? l = t / 12.92 : l = Math.pow((t + 0.055) / 1.055, 2.4), r <= 0.03928 ? s = r / 12.92 : s = Math.pow((r + 0.055) / 1.055, 2.4), n <= 0.03928 ? o = n / 12.92 : o = Math.pow((n + 0.055) / 1.055, 2.4), 0.2126 * l + 0.7152 * s + 0.0722 * o;
  },
  setAlpha: function(a) {
    return this._a = Be(a), this._roundA = Math.round(100 * this._a) / 100, this;
  },
  toHsv: function() {
    var a = Me(this._r, this._g, this._b);
    return {
      h: a.h * 360,
      s: a.s,
      v: a.v,
      a: this._a
    };
  },
  toHsvString: function() {
    var a = Me(this._r, this._g, this._b), t = Math.round(a.h * 360), r = Math.round(a.s * 100), n = Math.round(a.v * 100);
    return this._a == 1 ? "hsv(" + t + ", " + r + "%, " + n + "%)" : "hsva(" + t + ", " + r + "%, " + n + "%, " + this._roundA + ")";
  },
  toHsl: function() {
    var a = Fe(this._r, this._g, this._b);
    return {
      h: a.h * 360,
      s: a.s,
      l: a.l,
      a: this._a
    };
  },
  toHslString: function() {
    var a = Fe(this._r, this._g, this._b), t = Math.round(a.h * 360), r = Math.round(a.s * 100), n = Math.round(a.l * 100);
    return this._a == 1 ? "hsl(" + t + ", " + r + "%, " + n + "%)" : "hsla(" + t + ", " + r + "%, " + n + "%, " + this._roundA + ")";
  },
  toHex: function(a) {
    return Se(this._r, this._g, this._b, a);
  },
  toHexString: function(a) {
    return "#" + this.toHex(a);
  },
  toHex8: function(a) {
    return Xe(this._r, this._g, this._b, this._a, a);
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
    return this._a === 0 ? "transparent" : this._a < 1 ? !1 : lt[Se(this._r, this._g, this._b, !0)] || !1;
  },
  toFilter: function(a) {
    var t = "#" + $e(this._r, this._g, this._b, this._a), r = t, n = this._gradientType ? "GradientType = 1, " : "";
    if (a) {
      var l = h(a);
      r = "#" + $e(l._r, l._g, l._b, l._a);
    }
    return "progid:DXImageTransform.Microsoft.gradient(" + n + "startColorstr=" + t + ",endColorstr=" + r + ")";
  },
  toString: function(a) {
    var t = !!a;
    a = a || this._format;
    var r = !1, n = this._a < 1 && this._a >= 0, l = !t && n && (a === "hex" || a === "hex6" || a === "hex3" || a === "hex4" || a === "hex8" || a === "name");
    return l ? a === "name" && this._a === 0 ? this.toName() : this.toRgbString() : (a === "rgb" && (r = this.toRgbString()), a === "prgb" && (r = this.toPercentageRgbString()), (a === "hex" || a === "hex6") && (r = this.toHexString()), a === "hex3" && (r = this.toHexString(!0)), a === "hex4" && (r = this.toHex8String(!0)), a === "hex8" && (r = this.toHex8String()), a === "name" && (r = this.toName()), a === "hsl" && (r = this.toHslString()), a === "hsv" && (r = this.toHsvString()), r || this.toHexString());
  },
  clone: function() {
    return h(this.toString());
  },
  _applyModification: function(a, t) {
    var r = a.apply(null, [this].concat([].slice.call(t)));
    return this._r = r._r, this._g = r._g, this._b = r._b, this.setAlpha(r._a), this;
  },
  lighten: function() {
    return this._applyModification(Ze, arguments);
  },
  brighten: function() {
    return this._applyModification(Je, arguments);
  },
  darken: function() {
    return this._applyModification(Qe, arguments);
  },
  desaturate: function() {
    return this._applyModification(Ye, arguments);
  },
  saturate: function() {
    return this._applyModification(je, arguments);
  },
  greyscale: function() {
    return this._applyModification(qe, arguments);
  },
  spin: function() {
    return this._applyModification(et, arguments);
  },
  _applyCombination: function(a, t) {
    return a.apply(null, [this].concat([].slice.call(t)));
  },
  analogous: function() {
    return this._applyCombination(nt, arguments);
  },
  complement: function() {
    return this._applyCombination(tt, arguments);
  },
  monochromatic: function() {
    return this._applyCombination(rt, arguments);
  },
  splitcomplement: function() {
    return this._applyCombination(at, arguments);
  },
  // Disabled until https://github.com/bgrins/TinyColor/issues/254
  // polyad: function (number) {
  //   return this._applyCombination(polyad, [number]);
  // },
  triad: function() {
    return this._applyCombination(Re, [3]);
  },
  tetrad: function() {
    return this._applyCombination(Re, [4]);
  }
};
h.fromRatio = function(e, a) {
  if (ue(e) == "object") {
    var t = {};
    for (var r in e)
      e.hasOwnProperty(r) && (r === "a" ? t[r] = e[r] : t[r] = re(e[r]));
    e = t;
  }
  return h(e, a);
};
function Ke(e) {
  var a = {
    r: 0,
    g: 0,
    b: 0
  }, t = 1, r = null, n = null, l = null, s = !1, o = !1;
  return typeof e == "string" && (e = ut(e)), ue(e) == "object" && (W(e.r) && W(e.g) && W(e.b) ? (a = Ge(e.r, e.g, e.b), s = !0, o = String(e.r).substr(-1) === "%" ? "prgb" : "rgb") : W(e.h) && W(e.s) && W(e.v) ? (r = re(e.s), n = re(e.v), a = We(e.h, r, n), s = !0, o = "hsv") : W(e.h) && W(e.s) && W(e.l) && (r = re(e.s), l = re(e.l), a = ze(e.h, r, l), s = !0, o = "hsl"), e.hasOwnProperty("a") && (t = e.a)), t = Be(t), {
    ok: s,
    format: e.format || o,
    r: Math.min(255, Math.max(a.r, 0)),
    g: Math.min(255, Math.max(a.g, 0)),
    b: Math.min(255, Math.max(a.b, 0)),
    a: t
  };
}
function Ge(e, a, t) {
  return {
    r: L(e, 255) * 255,
    g: L(a, 255) * 255,
    b: L(t, 255) * 255
  };
}
function Fe(e, a, t) {
  e = L(e, 255), a = L(a, 255), t = L(t, 255);
  var r = Math.max(e, a, t), n = Math.min(e, a, t), l, s, o = (r + n) / 2;
  if (r == n)
    l = s = 0;
  else {
    var c = r - n;
    switch (s = o > 0.5 ? c / (2 - r - n) : c / (r + n), r) {
      case e:
        l = (a - t) / c + (a < t ? 6 : 0);
        break;
      case a:
        l = (t - e) / c + 2;
        break;
      case t:
        l = (e - a) / c + 4;
        break;
    }
    l /= 6;
  }
  return {
    h: l,
    s,
    l: o
  };
}
function ze(e, a, t) {
  var r, n, l;
  e = L(e, 360), a = L(a, 100), t = L(t, 100);
  function s(i, v, b) {
    return b < 0 && (b += 1), b > 1 && (b -= 1), b < 1 / 6 ? i + (v - i) * 6 * b : b < 1 / 2 ? v : b < 2 / 3 ? i + (v - i) * (2 / 3 - b) * 6 : i;
  }
  if (a === 0)
    r = n = l = t;
  else {
    var o = t < 0.5 ? t * (1 + a) : t + a - t * a, c = 2 * t - o;
    r = s(c, o, e + 1 / 3), n = s(c, o, e), l = s(c, o, e - 1 / 3);
  }
  return {
    r: r * 255,
    g: n * 255,
    b: l * 255
  };
}
function Me(e, a, t) {
  e = L(e, 255), a = L(a, 255), t = L(t, 255);
  var r = Math.max(e, a, t), n = Math.min(e, a, t), l, s, o = r, c = r - n;
  if (s = r === 0 ? 0 : c / r, r == n)
    l = 0;
  else {
    switch (r) {
      case e:
        l = (a - t) / c + (a < t ? 6 : 0);
        break;
      case a:
        l = (t - e) / c + 2;
        break;
      case t:
        l = (e - a) / c + 4;
        break;
    }
    l /= 6;
  }
  return {
    h: l,
    s,
    v: o
  };
}
function We(e, a, t) {
  e = L(e, 360) * 6, a = L(a, 100), t = L(t, 100);
  var r = Math.floor(e), n = e - r, l = t * (1 - a), s = t * (1 - n * a), o = t * (1 - (1 - n) * a), c = r % 6, i = [t, s, l, l, o, t][c], v = [o, t, t, s, l, l][c], b = [l, l, o, t, t, s][c];
  return {
    r: i * 255,
    g: v * 255,
    b: b * 255
  };
}
function Se(e, a, t, r) {
  var n = [U(Math.round(e).toString(16)), U(Math.round(a).toString(16)), U(Math.round(t).toString(16))];
  return r && n[0].charAt(0) == n[0].charAt(1) && n[1].charAt(0) == n[1].charAt(1) && n[2].charAt(0) == n[2].charAt(1) ? n[0].charAt(0) + n[1].charAt(0) + n[2].charAt(0) : n.join("");
}
function Xe(e, a, t, r, n) {
  var l = [U(Math.round(e).toString(16)), U(Math.round(a).toString(16)), U(Math.round(t).toString(16)), U(Ve(r))];
  return n && l[0].charAt(0) == l[0].charAt(1) && l[1].charAt(0) == l[1].charAt(1) && l[2].charAt(0) == l[2].charAt(1) && l[3].charAt(0) == l[3].charAt(1) ? l[0].charAt(0) + l[1].charAt(0) + l[2].charAt(0) + l[3].charAt(0) : l.join("");
}
function $e(e, a, t, r) {
  var n = [U(Ve(r)), U(Math.round(e).toString(16)), U(Math.round(a).toString(16)), U(Math.round(t).toString(16))];
  return n.join("");
}
h.equals = function(e, a) {
  return !e || !a ? !1 : h(e).toRgbString() == h(a).toRgbString();
};
h.random = function() {
  return h.fromRatio({
    r: Math.random(),
    g: Math.random(),
    b: Math.random()
  });
};
function Ye(e, a) {
  a = a === 0 ? 0 : a || 10;
  var t = h(e).toHsl();
  return t.s -= a / 100, t.s = de(t.s), h(t);
}
function je(e, a) {
  a = a === 0 ? 0 : a || 10;
  var t = h(e).toHsl();
  return t.s += a / 100, t.s = de(t.s), h(t);
}
function qe(e) {
  return h(e).desaturate(100);
}
function Ze(e, a) {
  a = a === 0 ? 0 : a || 10;
  var t = h(e).toHsl();
  return t.l += a / 100, t.l = de(t.l), h(t);
}
function Je(e, a) {
  a = a === 0 ? 0 : a || 10;
  var t = h(e).toRgb();
  return t.r = Math.max(0, Math.min(255, t.r - Math.round(255 * -(a / 100)))), t.g = Math.max(0, Math.min(255, t.g - Math.round(255 * -(a / 100)))), t.b = Math.max(0, Math.min(255, t.b - Math.round(255 * -(a / 100)))), h(t);
}
function Qe(e, a) {
  a = a === 0 ? 0 : a || 10;
  var t = h(e).toHsl();
  return t.l -= a / 100, t.l = de(t.l), h(t);
}
function et(e, a) {
  var t = h(e).toHsl(), r = (t.h + a) % 360;
  return t.h = r < 0 ? 360 + r : r, h(t);
}
function tt(e) {
  var a = h(e).toHsl();
  return a.h = (a.h + 180) % 360, h(a);
}
function Re(e, a) {
  if (isNaN(a) || a <= 0)
    throw new Error("Argument to polyad must be a positive number");
  for (var t = h(e).toHsl(), r = [h(e)], n = 360 / a, l = 1; l < a; l++)
    r.push(h({
      h: (t.h + l * n) % 360,
      s: t.s,
      l: t.l
    }));
  return r;
}
function at(e) {
  var a = h(e).toHsl(), t = a.h;
  return [h(e), h({
    h: (t + 72) % 360,
    s: a.s,
    l: a.l
  }), h({
    h: (t + 216) % 360,
    s: a.s,
    l: a.l
  })];
}
function nt(e, a, t) {
  a = a || 6, t = t || 30;
  var r = h(e).toHsl(), n = 360 / t, l = [h(e)];
  for (r.h = (r.h - (n * a >> 1) + 720) % 360; --a; )
    r.h = (r.h + n) % 360, l.push(h(r));
  return l;
}
function rt(e, a) {
  a = a || 6;
  for (var t = h(e).toHsv(), r = t.h, n = t.s, l = t.v, s = [], o = 1 / a; a--; )
    s.push(h({
      h: r,
      s: n,
      v: l
    })), l = (l + o) % 1;
  return s;
}
h.mix = function(e, a, t) {
  t = t === 0 ? 0 : t || 50;
  var r = h(e).toRgb(), n = h(a).toRgb(), l = t / 100, s = {
    r: (n.r - r.r) * l + r.r,
    g: (n.g - r.g) * l + r.g,
    b: (n.b - r.b) * l + r.b,
    a: (n.a - r.a) * l + r.a
  };
  return h(s);
};
h.readability = function(e, a) {
  var t = h(e), r = h(a);
  return (Math.max(t.getLuminance(), r.getLuminance()) + 0.05) / (Math.min(t.getLuminance(), r.getLuminance()) + 0.05);
};
h.isReadable = function(e, a, t) {
  var r = h.readability(e, a), n, l;
  switch (l = !1, n = ct(t), n.level + n.size) {
    case "AAsmall":
    case "AAAlarge":
      l = r >= 4.5;
      break;
    case "AAlarge":
      l = r >= 3;
      break;
    case "AAAsmall":
      l = r >= 7;
      break;
  }
  return l;
};
h.mostReadable = function(e, a, t) {
  var r = null, n = 0, l, s, o, c;
  t = t || {}, s = t.includeFallbackColors, o = t.level, c = t.size;
  for (var i = 0; i < a.length; i++)
    l = h.readability(e, a[i]), l > n && (n = l, r = h(a[i]));
  return h.isReadable(e, r, {
    level: o,
    size: c
  }) || !s ? r : (t.includeFallbackColors = !1, h.mostReadable(e, ["#fff", "#000"], t));
};
var me = h.names = {
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
}, lt = h.hexNames = ot(me);
function ot(e) {
  var a = {};
  for (var t in e)
    e.hasOwnProperty(t) && (a[e[t]] = t);
  return a;
}
function Be(e) {
  return e = parseFloat(e), (isNaN(e) || e < 0 || e > 1) && (e = 1), e;
}
function L(e, a) {
  it(e) && (e = "100%");
  var t = st(e);
  return e = Math.min(a, Math.max(0, parseFloat(e))), t && (e = parseInt(e * a, 10) / 100), Math.abs(e - a) < 1e-6 ? 1 : e % a / parseFloat(a);
}
function de(e) {
  return Math.min(1, Math.max(0, e));
}
function P(e) {
  return parseInt(e, 16);
}
function it(e) {
  return typeof e == "string" && e.indexOf(".") != -1 && parseFloat(e) === 1;
}
function st(e) {
  return typeof e == "string" && e.indexOf("%") != -1;
}
function U(e) {
  return e.length == 1 ? "0" + e : "" + e;
}
function re(e) {
  return e <= 1 && (e = e * 100 + "%"), e;
}
function Ve(e) {
  return Math.round(parseFloat(e) * 255).toString(16);
}
function He(e) {
  return P(e) / 255;
}
var N = function() {
  var e = "[-\\+]?\\d+%?", a = "[-\\+]?\\d*\\.\\d+%?", t = "(?:" + a + ")|(?:" + e + ")", r = "[\\s|\\(]+(" + t + ")[,|\\s]+(" + t + ")[,|\\s]+(" + t + ")\\s*\\)?", n = "[\\s|\\(]+(" + t + ")[,|\\s]+(" + t + ")[,|\\s]+(" + t + ")[,|\\s]+(" + t + ")\\s*\\)?";
  return {
    CSS_UNIT: new RegExp(t),
    rgb: new RegExp("rgb" + r),
    rgba: new RegExp("rgba" + n),
    hsl: new RegExp("hsl" + r),
    hsla: new RegExp("hsla" + n),
    hsv: new RegExp("hsv" + r),
    hsva: new RegExp("hsva" + n),
    hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
    hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
  };
}();
function W(e) {
  return !!N.CSS_UNIT.exec(e);
}
function ut(e) {
  e = e.replace(Ue, "").replace(Oe, "").toLowerCase();
  var a = !1;
  if (me[e])
    e = me[e], a = !0;
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
    r: P(t[1]),
    g: P(t[2]),
    b: P(t[3]),
    a: He(t[4]),
    format: a ? "name" : "hex8"
  } : (t = N.hex6.exec(e)) ? {
    r: P(t[1]),
    g: P(t[2]),
    b: P(t[3]),
    format: a ? "name" : "hex"
  } : (t = N.hex4.exec(e)) ? {
    r: P(t[1] + "" + t[1]),
    g: P(t[2] + "" + t[2]),
    b: P(t[3] + "" + t[3]),
    a: He(t[4] + "" + t[4]),
    format: a ? "name" : "hex8"
  } : (t = N.hex3.exec(e)) ? {
    r: P(t[1] + "" + t[1]),
    g: P(t[2] + "" + t[2]),
    b: P(t[3] + "" + t[3]),
    format: a ? "name" : "hex"
  } : !1;
}
function ct(e) {
  var a, t;
  return e = e || {
    level: "AA",
    size: "small"
  }, a = (e.level || "AA").toUpperCase(), t = (e.size || "small").toLowerCase(), a !== "AA" && a !== "AAA" && (a = "AA"), t !== "small" && t !== "large" && (t = "small"), {
    level: a,
    size: t
  };
}
const Le = (e, a, t = !1) => {
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
    let r = a;
    a === "hex" && e.getAlpha() < 1 && (r = "hex8");
    let n = e.toString(r);
    try {
      n = JSON.parse(n);
    } catch {
    }
    return n;
  }
}, pe = (e, a) => !!(Object.prototype.hasOwnProperty.call(e, a) && typeof e[a] < "u"), ie = (e) => typeof e > "u", O = ["update:tinyColor", "update:modelValue", "input"];
function K(e, a, t) {
  let r, n;
  const l = S({
    get: () => {
      const { modelValue: o, tinyColor: c, value: i } = e, v = c ?? o ?? i;
      return ie(n) && (ie(i) || (n = h(i).getFormat()), ie(o) || (n = h(o).getFormat())), ie(r) && (typeof i == "object" && !(i instanceof h) && (r = !0), typeof o == "object" && (r = !0)), h(v);
    },
    set: (o) => {
      s(o);
    }
  }), s = (o) => {
    const c = h(o);
    if (pe(e, "tinyColor") && a("update:tinyColor", c), pe(e, "modelValue")) {
      const i = Le(c, n, r);
      a("update:modelValue", i);
    }
    if (pe(e, "value")) {
      const i = Le(c, n, r);
      a("input", i);
    }
  };
  return l;
}
const ye = (e) => {
  var t, r, n, l;
  const a = { x: 0, y: 0 };
  return e instanceof MouseEvent && (a.x = e.pageX, a.y = e.pageY), typeof TouchEvent < "u" && e instanceof TouchEvent && (a.x = (t = e.touches) != null && t[0] ? e.touches[0].pageX : (r = e.changedTouches) != null && r[0] ? e.changedTouches[0].pageX : 0, a.y = (n = e.touches) != null && n[0] ? e.touches[0].pageY : (l = e.changedTouches) != null && l[0] ? e.changedTouches[0].pageY : 0), a;
}, dt = () => {
  const e = window.scrollX || window.pageXOffset || document.documentElement.scrollLeft || 0, a = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
  return { x: e, y: a };
}, we = (e) => {
  const { x: a, y: t } = dt(), r = e.getBoundingClientRect();
  return {
    x: r.left + a,
    y: r.top + t
  };
}, fe = (e) => e.code === "ArrowUp" || e.keyCode === 38 ? "up" : e.code === "ArrowDown" || e.keyCode === 40 ? "down" : e.code === "ArrowLeft" || e.keyCode === 37 ? "left" : e.code === "ArrowRight" || e.keyCode === 39 ? "right" : null;
function ft(e) {
  const a = e.toString();
  return a.indexOf(".") !== -1 ? a.split(".")[1].length : 0;
}
function ge(e, a, t) {
  return Math.min(Math.max(e, a), t);
}
const Ce = (e, a = 20) => {
  let t, r, n;
  return (...l) => {
    t ? (clearTimeout(r), r = setTimeout(() => {
      Date.now() - n >= a && (e(...l), n = Date.now());
    }, Math.max(a - (Date.now() - n), 0))) : (e(...l), n = Date.now(), t = !0);
  };
}, ht = ["aria-valuetext"], vt = /* @__PURE__ */ D({
  __name: "SaturationSlider",
  props: {
    hue: {},
    tinyColor: {},
    modelValue: {},
    value: {}
  },
  emits: ["change"].concat(O),
  setup(e, { emit: a }) {
    const t = a, r = e, n = X(0), l = K(r, t), s = S(() => l.value.toHsv()), o = S(() => r.hue ?? s.value.h), c = S(() => `hsl(${o.value}, 100%, 50%)`), i = S(() => -(s.value.v * 100) + 1 + 100 + "%"), v = S(() => s.value.v <= 0.01 ? n.value * 100 + "%" : s.value.s * 100 + "%"), b = X(null);
    function y(p) {
      const m = b.value;
      if (!m)
        return;
      const E = m.clientWidth, Y = m.clientHeight, { x: ee, y: M } = we(m), { x: w, y: C } = ye(p), z = ge(w - ee, 0, E), ne = ge(C - M, 0, Y), Ae = z / E, De = ge(1 - ne / Y, 0, 1);
      n.value = Ae;
      let ve = Math.round(Ae * 100), be = Math.round(De * 100);
      ve === 1 && (ve = 0.01), be === 1 && (be = 0.01), A({
        h: o.value,
        s: ve,
        v: be,
        a: s.value.a
      });
    }
    function A(p) {
      l.value = p;
    }
    const d = Ce(y, 20);
    function F(p) {
      p.type.startsWith("mouse") ? (window.addEventListener("mousemove", d), window.addEventListener("mouseup", d), window.addEventListener("mouseup", f)) : p.type.startsWith("touch") && (window.addEventListener("touchmove", d), window.addEventListener("touchend", d), window.addEventListener("touchend", f));
    }
    function f() {
      $();
    }
    function $() {
      window.removeEventListener("mousemove", d), window.removeEventListener("mouseup", d), window.removeEventListener("mouseup", f), window.removeEventListener("touchmove", d), window.removeEventListener("touchend", d), window.removeEventListener("touchend", f);
    }
    function k(p) {
      switch (p.preventDefault(), fe(p)) {
        case "left": {
          const E = s.value.s - 0.01;
          A({
            ...s.value,
            s: E >= 0 ? E : 0
          });
          break;
        }
        case "right": {
          const E = s.value.s + 0.01;
          A({
            ...s.value,
            s: E > 1 ? 1 : E
          });
          break;
        }
        case "up": {
          const E = s.value.v + 0.01;
          A({
            ...s.value,
            v: E > 1 ? 1 : E
          });
          break;
        }
        case "down": {
          const E = s.value.v - 0.01;
          A({
            ...s.value,
            v: E < 0 ? 0 : E
          });
          break;
        }
      }
    }
    return _e(() => {
      $();
    }), (p, m) => (g(), _("div", {
      class: "vc-saturation-slider bg",
      style: V({ background: c.value }),
      ref_key: "containerRef",
      ref: b,
      onMousedown: F,
      onTouchstart: F,
      role: "application",
      "aria-label": "Saturation and brightness picker"
    }, [
      m[1] || (m[1] = u("div", { class: "bg white" }, null, -1)),
      m[2] || (m[2] = u("div", { class: "bg black" }, null, -1)),
      u("div", {
        class: "picker-wrap",
        style: V({ top: i.value, left: v.value }),
        role: "slider",
        tabindex: "0",
        "aria-valuemin": "0",
        "aria-valuemax": "1",
        "aria-label": "press arrow to change saturation or brightness",
        "aria-valuenow": "?",
        "aria-valuetext": `saturation: ${s.value.s.toFixed(0)}%, brightness: ${s.value.v.toFixed(0)}%`,
        onKeydown: k
      }, m[0] || (m[0] = [
        u("div", { class: "picker" }, null, -1)
      ]), 44, ht)
    ], 36));
  }
}), T = (e, a) => {
  const t = e.__vccOpts || e;
  for (const [r, n] of a)
    t[r] = n;
  return t;
}, ke = /* @__PURE__ */ T(vt, [["__scopeId", "data-v-cf852467"]]), bt = { class: "vc-hue-slider" }, pt = ["aria-valuenow"], gt = /* @__PURE__ */ D({
  __name: "HueSlider",
  props: {
    direction: { default: "horizontal" },
    modelValue: { default: 0 }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: a }) {
    const t = e, r = a, n = S(() => {
      const f = Number(t.modelValue);
      return Number.isNaN(f) ? 0 : f;
    }), l = X(), s = X(null);
    Ee(n, (f, $) => {
      f !== 0 && f - $ > 0 && (l.value = "right"), f !== 0 && f - $ < 0 && (l.value = "left");
    });
    const o = S(() => t.direction === "vertical" ? n.value === 0 && l.value === "right" ? 0 : -(n.value * 100 / 360) + 100 + "%" : 0), c = S(() => t.direction === "vertical" ? 0 : n.value === 0 && l.value === "right" ? "100%" : n.value * 100 / 360 + "%");
    function i(f) {
      const $ = s.value;
      if (!$)
        return;
      const k = $.clientWidth, p = $.clientHeight, { x: m, y: E } = we($), { x: Y, y: ee } = ye(f), M = Y - m, w = ee - E;
      let C, z;
      t.direction === "vertical" ? (w < 0 ? C = 360 : w > p ? C = 0 : (z = -(w * 100 / p) + 100, C = Math.round(360 * z / 100)), n.value !== C && v(C)) : (M < 0 ? C = 0 : M > k ? C = 360 : (z = M * 100 / k, C = Math.round(360 * z / 100)), n.value !== C && v(C));
    }
    function v(f) {
      r("update:modelValue", f);
    }
    const b = Ce(i);
    function y(f) {
      i(f), f.type.startsWith("mouse") ? (window.addEventListener("mousemove", b), window.addEventListener("mouseup", A)) : (window.addEventListener("touchmove", b), window.addEventListener("touchend", A));
    }
    function A() {
      d();
    }
    function d() {
      window.removeEventListener("mousemove", b), window.removeEventListener("mouseup", A), window.removeEventListener("touchmove", b), window.removeEventListener("touchend", A);
    }
    function F(f) {
      f.preventDefault();
      const $ = fe(f), k = t.direction, p = n.value;
      let m;
      switch ($) {
        case "left": {
          if (k !== "horizontal")
            return;
          m = p - 1 < 0 ? 0 : Math.floor(p - 1);
          break;
        }
        case "right": {
          if (k !== "horizontal")
            return;
          m = p + 1 > 360 ? 360 : Math.ceil(p + 1);
          break;
        }
        case "down": {
          if (k !== "vertical")
            return;
          m = p - 1 < 0 ? 0 : Math.floor(p - 1);
          break;
        }
        case "up": {
          if (k !== "vertical")
            return;
          m = p + 1 > 360 ? 360 : Math.ceil(p + 1);
          break;
        }
      }
      typeof m < "u" && v(m);
    }
    return _e(() => {
      d();
    }), (f, $) => (g(), _("div", bt, [
      u("div", {
        class: G({
          container: !0,
          horizontal: t.direction === "horizontal",
          vertical: t.direction === "vertical"
        }),
        ref_key: "containerRef",
        ref: s,
        onMousedown: y,
        onTouchstart: y,
        onKeydown: F,
        role: "slider",
        "aria-valuenow": n.value,
        "aria-valuemin": "0",
        "aria-valuemax": "360",
        "aria-label": "Hue",
        tabindex: "0"
      }, [
        u("div", {
          class: "picker-wrap",
          style: V({ top: o.value, left: c.value }),
          role: "presentation"
        }, [
          Te(f.$slots, "default", {}, () => [
            $[0] || ($[0] = u("div", { class: "picker" }, null, -1))
          ], !0)
        ], 4)
      ], 42, pt)
    ]));
  }
}), le = /* @__PURE__ */ T(gt, [["__scopeId", "data-v-02c88ac4"]]), mt = /* @__PURE__ */ D({
  __name: "CheckerboardBG",
  props: {
    size: { default: 8 },
    white: { default: "#fff" },
    grey: { default: "#e6e6e6" }
  },
  setup(e) {
    const a = e;
    function t(l, s, o) {
      if (typeof document > "u")
        return null;
      var c = document.createElement("canvas");
      c.width = c.height = o * 2;
      var i = c.getContext("2d");
      return i ? (i.fillStyle = l, i.fillRect(0, 0, c.width, c.height), i.fillStyle = s, i.fillRect(0, 0, o, o), i.translate(o, o), i.fillRect(0, 0, o, o), c.toDataURL()) : null;
    }
    function r(l, s, o) {
      return t(l, s, o);
    }
    const n = S(() => `url(${r(a.white, a.grey, a.size)})`);
    return (l, s) => (g(), _("div", {
      class: "vc-checkerboard",
      style: V({ backgroundImage: n.value })
    }, null, 4));
  }
}), ce = /* @__PURE__ */ T(mt, [["__scopeId", "data-v-37d61ccd"]]), _t = { class: "vc-alpha-slider" }, yt = { class: "checkerboard" }, wt = ["aria-valuenow"], Ct = /* @__PURE__ */ D({
  __name: "AlphaSlider",
  props: {
    tinyColor: {},
    modelValue: {},
    value: {}
  },
  emits: O,
  setup(e, { emit: a }) {
    const n = K(e, a), l = S(() => {
      const d = n.value.toRgb(), F = [d.r, d.g, d.b].join(",");
      return "linear-gradient(to right, rgba(" + F + ", 0) 0%, rgba(" + F + ", 1) 100%)";
    }), s = S(() => n.value.getAlpha()), o = X(null);
    function c(d) {
      const F = o.value;
      if (!F)
        return;
      const f = F.clientWidth, { x: $ } = we(F), { x: k } = ye(d), p = k - $;
      let m;
      p < 0 ? m = 0 : p > f ? m = 1 : m = Math.round(p * 100 / f) / 100, s.value !== m && (n.value = n.value.setAlpha(m).clone());
    }
    const i = Ce(c);
    function v(d) {
      c(d), d.type.startsWith("mouse") ? (window.addEventListener("mousemove", i), window.addEventListener("mouseup", b)) : (window.addEventListener("touchmove", i), window.addEventListener("touchend", b));
    }
    function b() {
      y();
    }
    function y() {
      window.removeEventListener("mousemove", i), window.removeEventListener("mouseup", b), window.removeEventListener("touchmove", i), window.removeEventListener("touchend", b);
    }
    function A(d) {
      d.preventDefault();
      const F = fe(d), f = s.value;
      let $;
      switch (F) {
        case "left": {
          $ = f - 0.1 < 0 ? 0 : f - 0.1;
          break;
        }
        case "right": {
          $ = f + 0.1 > 1 ? 1 : f + 0.1;
          break;
        }
      }
      typeof $ < "u" && (n.value = n.value.setAlpha($).clone());
    }
    return _e(() => {
      y();
    }), (d, F) => (g(), _("div", _t, [
      u("div", yt, [
        x(ce)
      ]),
      u("div", {
        class: "gradient",
        style: V({ background: l.value })
      }, null, 4),
      u("div", {
        class: "slider",
        ref_key: "containerRef",
        ref: o,
        onMousedown: v,
        onTouchstart: v,
        role: "slider",
        "aria-label": "Transparency",
        "aria-valuemax": "1",
        "aria-valuemin": "0",
        "aria-valuenow": s.value.toFixed(1),
        tabindex: "0",
        onKeydown: A
      }, [
        u("div", {
          class: "picker-wrap",
          style: V({ left: s.value * 100 + "%" })
        }, F[0] || (F[0] = [
          u("div", { class: "picker" }, null, -1)
        ]), 4)
      ], 40, wt)
    ]));
  }
}), xe = /* @__PURE__ */ T(Ct, [["__scopeId", "data-v-7528096e"]]), kt = { class: "vc-editable-input" }, xt = ["value", "aria-label"], At = {
  key: 0,
  class: "vc-input-desc",
  "aria-hidden": "true"
}, Ft = /* @__PURE__ */ D({
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
    var i;
    const t = e, r = a, n = ((i = t.a11y) == null ? void 0 : i.label) ?? t.label, l = `input__label__${n}__${Math.random().toString().slice(2, 5)}`;
    function s(v) {
      if (t.max && +v > t.max) {
        r("change", t.max);
        return;
      }
      if (t.min && +v < t.min) {
        r("change", t.min);
        return;
      }
      r("change", v);
    }
    function o(v) {
      var b;
      s((b = v.target) == null ? void 0 : b.value);
    }
    function c(v) {
      let b = Number(t.value);
      if (!isNaN(b)) {
        let y = t.step;
        const A = ft(y), d = fe(v);
        d === "up" && (s((b + y).toFixed(A)), v.preventDefault()), d === "down" && (s((b - y).toFixed(A)), v.preventDefault());
      }
    }
    return (v, b) => (g(), _("div", kt, [
      u("input", {
        class: "vc-input-input",
        value: t.value,
        onKeydown: c,
        onInput: o,
        "aria-label": H(n),
        id: l
      }, null, 40, xt),
      u("label", {
        for: l,
        class: "vc-input-label",
        "aria-hidden": "true"
      }, j(t.label), 1),
      v.desc ? (g(), _("span", At, j(v.desc), 1)) : B("", !0)
    ]));
  }
}), R = /* @__PURE__ */ T(Ft, [["__scopeId", "data-v-8d017502"]]);
function Mt() {
  const e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return e.charAt(Math.floor(Math.random() * e.length)) + e.charAt(Math.floor(Math.random() * e.length));
}
const he = (e) => {
  const a = X(0), t = `__from__vc__hue__${Mt()}`;
  return Ee(e, (n) => {
    if (n[t])
      return;
    const l = n.toHsl().h;
    l === 0 && a.value !== 0 || (a.value = l);
  }, { immediate: !0 }), { hueRef: a, updateHueRef: (n) => {
    const l = h({
      ...e.value.toHsl(),
      h: n
    });
    l[t] = !0, e.value = l, a.value = n;
  } };
}, oe = (e) => h(e).isValid(), St = (e) => h(e).getAlpha() === 0, $t = { class: "saturation" }, Rt = { class: "body" }, Ht = { class: "controls" }, Lt = { class: "color-wrap" }, Et = ["aria-label"], Bt = { class: "sliders" }, Vt = { class: "hue-wrap" }, Dt = {
  key: 0,
  class: "alpha-wrap"
}, Tt = {
  key: 0,
  class: "fieldsWrap",
  "data-testid": "fields"
}, Pt = {
  key: 0,
  class: "fields"
}, It = { class: "field" }, Nt = { class: "field" }, Ut = { class: "field" }, Ot = {
  key: 0,
  class: "field"
}, Kt = {
  key: 1,
  class: "fields"
}, Gt = { class: "field" }, zt = {
  key: 2,
  class: "fields"
}, Wt = { class: "field" }, Xt = { class: "field" }, Yt = { class: "field" }, jt = {
  key: 0,
  class: "field"
}, qt = {
  class: "toggle-icon",
  role: "presentation"
}, Zt = {
  style: { width: "24px", height: "24px" },
  viewBox: "0 0 24 24"
}, Jt = {
  class: "toggle-icon_highlighted",
  role: "presentation"
}, Qt = /* @__PURE__ */ D({
  __name: "ChromePicker",
  props: {
    disableAlpha: { type: Boolean },
    disableFields: { type: Boolean },
    formats: { default: () => ["rgb", "hex", "hsl"] },
    tinyColor: {},
    modelValue: {},
    value: {}
  },
  emits: O,
  setup(e, { emit: a }) {
    const t = e, n = K(t, a), { hueRef: l, updateHueRef: s } = he(n), o = X(0);
    let c = X(!1);
    const i = S(() => {
      const M = n.value.toRgb();
      return "rgba(" + [M.r, M.g, M.b, n.value.getAlpha()].join(",") + ")";
    }), v = S(() => {
      const { h: M, s: w, l: C } = n.value.toHsl();
      return {
        h: M.toFixed(),
        s: `${(w * 100).toFixed()}%`,
        l: `${(C * 100).toFixed()}%`
      };
    }), b = S(() => n.value.toRgb()), y = S(() => Number(n.value.getAlpha().toFixed(2))), A = /* @__PURE__ */ new Set(["hex", "hsl", "rgb"]), d = S(() => {
      const M = /* @__PURE__ */ new Set(), w = [], C = t.formats;
      for (const z of C)
        if (A.has(z)) {
          const ne = z;
          M.has(ne) || (M.add(ne), w.push(ne));
        }
      return w;
    }), F = S(() => {
      const { disableFields: M, formats: w } = t;
      return !(M === !0 || !Array.isArray(w) || d.value.length === 0);
    }), f = (M) => d.value.includes(M), $ = (M) => d.value.indexOf(M), k = (M) => {
      M && oe(M) && (n.value = M);
    }, p = (M, w) => {
      if (!w || isNaN(Number(w)))
        return;
      const C = { [M]: w };
      n.value = {
        ...b.value,
        a: y.value,
        ...C
      };
    }, m = (M, w) => {
      if (!w)
        return;
      const C = { [M]: +w };
      (M === "s" || M === "l") && (C[M] = +w.replace("%", "") / 100), n.value = {
        ...n.value.toHsl(),
        a: y.value,
        ...C
      };
    }, E = () => {
      if (o.value === d.value.length - 1) {
        o.value = 0;
        return;
      }
      o.value++;
    }, Y = () => {
      c.value = !0;
    }, ee = () => {
      c.value = !1;
    };
    return (M, w) => (g(), _("div", {
      role: "application",
      "aria-label": "Chrome Color Picker",
      class: G(["vc-chrome-picker", M.disableAlpha ? "alpha-disabled" : ""])
    }, [
      u("div", $t, [
        x(ke, {
          tinyColor: H(n),
          "onUpdate:tinyColor": w[0] || (w[0] = (C) => ae(n) ? n.value = C : null),
          hue: H(l)
        }, null, 8, ["tinyColor", "hue"])
      ]),
      u("div", Rt, [
        u("div", Ht, [
          u("div", Lt, [
            u("div", {
              class: "active-color",
              style: V({ backgroundColor: i.value }),
              role: "presentation",
              "aria-live": "polite",
              "aria-label": `Current color is ${i.value}`
            }, null, 12, Et),
            t.disableAlpha ? B("", !0) : (g(), se(ce, { key: 0 }))
          ]),
          u("div", Bt, [
            u("div", Vt, [
              x(le, {
                modelValue: H(l),
                "onUpdate:modelValue": H(s)
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ]),
            t.disableAlpha ? B("", !0) : (g(), _("div", Dt, [
              x(xe, {
                tinyColor: H(n),
                "onUpdate:tinyColor": w[1] || (w[1] = (C) => ae(n) ? n.value = C : null)
              }, null, 8, ["tinyColor"])
            ]))
          ])
        ]),
        F.value ? (g(), _("div", Tt, [
          f("rgb") ? Z((g(), _("div", Pt, [
            u("div", It, [
              x(R, {
                label: "r",
                value: b.value.r,
                onChange: w[2] || (w[2] = (C) => p("r", C)),
                a11y: { label: "Red" }
              }, null, 8, ["value"])
            ]),
            u("div", Nt, [
              x(R, {
                label: "g",
                value: b.value.g,
                onChange: w[3] || (w[3] = (C) => p("g", C)),
                a11y: { label: "Green" }
              }, null, 8, ["value"])
            ]),
            u("div", Ut, [
              x(R, {
                label: "b",
                value: b.value.b,
                onChange: w[4] || (w[4] = (C) => p("b", C)),
                a11y: { label: "Blue" }
              }, null, 8, ["value"])
            ]),
            M.disableAlpha ? B("", !0) : (g(), _("div", Ot, [
              x(R, {
                label: "a",
                value: y.value,
                step: 0.01,
                max: 1,
                onChange: w[5] || (w[5] = (C) => p("a", C)),
                a11y: { label: "Transparency" }
              }, null, 8, ["value"])
            ]))
          ], 512)), [
            [J, o.value === $("rgb")]
          ]) : B("", !0),
          f("hex") ? Z((g(), _("div", Kt, [
            u("div", Gt, [
              y.value === 1 ? (g(), se(R, {
                key: 0,
                label: "hex",
                value: H(n).toHexString(),
                onChange: k,
                a11y: { label: "Hex" }
              }, null, 8, ["value"])) : B("", !0),
              y.value !== 1 ? (g(), se(R, {
                key: 1,
                label: "hex",
                value: H(n).toHex8String(),
                onChange: k,
                a11y: { label: "Hex with transparency" }
              }, null, 8, ["value"])) : B("", !0)
            ])
          ], 512)), [
            [J, o.value === $("hex")]
          ]) : B("", !0),
          f("hsl") ? Z((g(), _("div", zt, [
            u("div", Wt, [
              x(R, {
                label: "h",
                value: H(l).toFixed(),
                onChange: w[6] || (w[6] = (C) => m("h", C)),
                a11y: { label: "Hue" }
              }, null, 8, ["value"])
            ]),
            u("div", Xt, [
              x(R, {
                label: "s",
                value: v.value.s,
                onChange: w[7] || (w[7] = (C) => m("s", C)),
                a11y: { label: "Saturation" }
              }, null, 8, ["value"])
            ]),
            u("div", Yt, [
              x(R, {
                label: "l",
                value: v.value.l,
                onChange: w[8] || (w[8] = (C) => m("l", C)),
                a11y: { label: "Lightness" }
              }, null, 8, ["value"])
            ]),
            M.disableAlpha ? B("", !0) : (g(), _("div", jt, [
              x(R, {
                label: "a",
                value: y.value,
                step: 0.01,
                max: 1,
                onChange: w[9] || (w[9] = (C) => m("a", C)),
                a11y: { label: "Transparency" }
              }, null, 8, ["value"])
            ]))
          ], 512)), [
            [J, o.value === $("hsl")]
          ]) : B("", !0),
          d.value.length > 1 ? (g(), _("div", {
            key: 3,
            class: "toggle-btn",
            onClick: E,
            onKeydown: [
              I(E, ["enter"]),
              I(E, ["space"])
            ],
            onMouseover: Y,
            onMouseenter: Y,
            onMouseout: ee,
            onFocus: Y,
            onBlur: ee,
            role: "button",
            "aria-label": "Change color format",
            tabindex: "0"
          }, [
            u("div", qt, [
              (g(), _("svg", Zt, w[10] || (w[10] = [
                u("path", {
                  fill: "currentColor",
                  d: "M12,18.17L8.83,15L7.42,16.41L12,21L16.59,16.41L15.17,15M12,5.83L15.17,9L16.58,7.59L12,3L7.41,7.59L8.83,9L12,5.83Z"
                }, null, -1)
              ])))
            ]),
            Z(u("div", Jt, null, 512), [
              [J, H(c)]
            ])
          ], 32)) : B("", !0)
        ])) : B("", !0)
      ])
    ], 2));
  }
}), Wn = /* @__PURE__ */ T(Qt, [["__scopeId", "data-v-abf90852"]]), ea = {
  class: "vc-compact-picker",
  role: "application",
  "aria-label": "Compact color picker",
  tabindex: "0"
}, ta = {
  class: "colors",
  role: "listbox",
  "aria-label": "Pick a color"
}, aa = ["onClick", "aria-label", "aria-selected", "title", "onKeydown"], na = { class: "dot" }, ra = [
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
], la = /* @__PURE__ */ D({
  __name: "CompactPicker",
  props: {
    palette: { default: () => ra },
    tinyColor: {},
    modelValue: {},
    value: {}
  },
  emits: ["change"].concat(O),
  setup(e, { emit: a }) {
    const t = e, n = K(t, a), l = S(() => n.value.toHexString().toUpperCase()), s = (o) => {
      n.value = o;
    };
    return (o, c) => (g(), _("div", ea, [
      u("ul", ta, [
        (g(!0), _(q, null, Q(t.palette, (i) => (g(), _("li", {
          key: i,
          class: G({ "color-item_white": i === "#FFFFFF", "color-item": !0 }),
          style: V({ background: i }),
          onClick: (v) => s(i),
          role: "option",
          "aria-label": "color:" + i,
          "aria-selected": i.toUpperCase() === l.value,
          title: i,
          onKeydown: I((v) => s(i), ["space"]),
          tabindex: "0"
        }, [
          Z(u("div", na, null, 512), [
            [J, i.toUpperCase() === l.value]
          ])
        ], 46, aa))), 128))
      ])
    ]));
  }
}), Xn = /* @__PURE__ */ T(la, [["__scopeId", "data-v-17eda10a"]]), oa = {
  role: "application",
  "aria-label": "Grayscale color picker",
  class: "vc-grayscale-picker"
}, ia = {
  class: "colors",
  role: "listbox",
  "aria-label": "Select a grayscale color",
  tabindex: "0"
}, sa = ["onClick", "aria-label", "aria-selected", "title", "onKeydown"], ua = { class: "dot" }, ca = [
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
], da = /* @__PURE__ */ D({
  __name: "GrayscalePicker",
  props: {
    palette: { default: () => ca },
    tinyColor: {},
    modelValue: {},
    value: {}
  },
  emits: ["change"].concat(O),
  setup(e, { emit: a }) {
    const n = K(e, a), l = S(() => n.value.toHexString().toUpperCase()), s = (o) => {
      n.value = o;
    };
    return (o, c) => (g(), _("div", oa, [
      u("ul", ia, [
        (g(!0), _(q, null, Q(o.palette, (i) => (g(), _("li", {
          key: i,
          class: G({ "color-item_white": i === "#FFFFFF", "color-item": !0 }),
          style: V({ background: i }),
          onClick: (v) => s(i),
          role: "option",
          "aria-label": "color:" + i,
          "aria-selected": i.toUpperCase() === l.value,
          title: i,
          onKeydown: I((v) => s(i), ["space"]),
          tabindex: "0"
        }, [
          Z(u("div", ua, null, 512), [
            [J, i.toUpperCase() === l.value]
          ])
        ], 46, sa))), 128))
      ])
    ]));
  }
}), Yn = /* @__PURE__ */ T(da, [["__scopeId", "data-v-85f108e1"]]), fa = {
  role: "application",
  "aria-label": "Material color inputs",
  class: "vc-material-picker"
}, ha = { class: "rgb" }, va = { class: "color" }, ba = { class: "color" }, pa = { class: "color" }, ga = /* @__PURE__ */ D({
  __name: "MaterialPicker",
  props: {
    tinyColor: {},
    modelValue: {},
    value: {}
  },
  emits: O,
  setup(e, { emit: a }) {
    const n = K(e, a), l = S(() => n.value.toRgb());
    function s(c) {
      oe(c) && (n.value = c);
    }
    function o(c, i) {
      n.value = {
        ...l.value,
        [c]: i
      };
    }
    return (c, i) => (g(), _("div", fa, [
      x(R, {
        class: "hex",
        label: "hex",
        value: H(n).toHexString(),
        style: V({ borderColor: H(n).toHexString() }),
        onChange: s,
        a11y: { label: "Hex" }
      }, null, 8, ["value", "style"]),
      u("div", ha, [
        u("div", va, [
          x(R, {
            label: "r",
            value: l.value.r,
            onChange: i[0] || (i[0] = (v) => o("r", v)),
            a11y: { label: "Red" }
          }, null, 8, ["value"])
        ]),
        u("div", ba, [
          x(R, {
            label: "g",
            value: l.value.g,
            onChange: i[1] || (i[1] = (v) => o("g", v)),
            a11y: { label: "Green" }
          }, null, 8, ["value"])
        ]),
        u("div", pa, [
          x(R, {
            label: "b",
            value: l.value.b,
            onChange: i[2] || (i[2] = (v) => o("b", v)),
            a11y: { label: "Blue" }
          }, null, 8, ["value"])
        ])
      ])
    ]));
  }
}), jn = /* @__PURE__ */ T(ga, [["__scopeId", "data-v-4e39f856"]]), ma = {
  class: "title",
  "aria-hidden": "true"
}, _a = { class: "body" }, ya = { class: "saturation" }, wa = { class: "hue" }, Ca = { class: "preview" }, ka = {
  class: "preview-label",
  "aria-hidden": "true"
}, xa = { class: "preview-swatches" }, Aa = ["aria-label"], Fa = ["aria-label"], Ma = {
  class: "preview-label",
  "aria-hidden": "true"
}, Sa = {
  key: 0,
  class: "actions"
}, $a = ["aria-label"], Ra = { class: "fields" }, Ha = ["aria-label"], La = /* @__PURE__ */ D({
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
  emits: O.concat(["ok", "cancel", "reset"]),
  setup(e, { emit: a }) {
    const t = e, r = a, n = K(t, r), { hueRef: l, updateHueRef: s } = he(n), o = X(t.currentColor), c = S(() => n.value.toHsv()), i = S(() => {
      const k = n.value.toHexString();
      return k && k.replace("#", "");
    }), v = S(() => n.value.toRgb()), b = () => {
      n.value = o.value;
    }, y = (k) => {
      k && oe(k) && (n.value = k);
    }, A = (k, p) => {
      if (!p || isNaN(Number(p)))
        return;
      const m = { [k]: p };
      n.value = {
        ...v.value,
        ...m
      };
    }, d = (k, p) => {
      if (!p || isNaN(Number(p)))
        return;
      const m = { [k]: Number(p) };
      n.value = {
        ...c.value,
        ...m
      };
    }, F = () => {
      r("ok");
    }, f = () => {
      r("cancel");
    }, $ = () => {
      r("reset");
    };
    return (k, p) => (g(), _("div", {
      role: "application",
      "aria-label": "PhotoShop color picker",
      class: G(["vc-photoshop-picker", k.disableFields ? "fields_disabled" : ""])
    }, [
      u("div", ma, j(k.title), 1),
      u("div", _a, [
        u("div", ya, [
          x(ke, {
            tinyColor: H(n),
            "onUpdate:tinyColor": p[0] || (p[0] = (m) => ae(n) ? n.value = m : null),
            hue: H(l)
          }, null, 8, ["tinyColor", "hue"])
        ]),
        u("div", wa, [
          x(le, {
            direction: "vertical",
            modelValue: H(l),
            "onUpdate:modelValue": H(s)
          }, {
            default: Pe(() => p[7] || (p[7] = [
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
          class: G(["controls", k.disableFields ? "controls_fields_disabled" : ""])
        }, [
          u("div", Ca, [
            u("div", ka, j(k.newLabel), 1),
            u("div", xa, [
              u("div", {
                class: "preview-color",
                "aria-label": `New color is #${i.value}`,
                style: V({ background: `#${i.value}` })
              }, null, 12, Aa),
              u("div", {
                class: "preview-color",
                style: V({ background: o.value }),
                onClick: b,
                role: "button",
                "aria-label": `Current color is ${o.value}`,
                onKeydown: I(b, ["space"]),
                tabindex: "0"
              }, null, 44, Fa)
            ]),
            u("div", Ma, j(k.currentLabel), 1)
          ]),
          k.disableFields ? B("", !0) : (g(), _("div", Sa, [
            u("div", {
              class: "action-btn",
              role: "button",
              "aria-label": "Click to apply new color",
              onClick: F,
              onKeydown: I(b, ["space"]),
              tabindex: "0"
            }, j(k.okLabel), 33),
            u("div", {
              class: "action-btn",
              role: "button",
              "aria-label": k.cancelLabel,
              onClick: f,
              onKeydown: I(b, ["space"]),
              tabindex: "0"
            }, j(k.cancelLabel), 41, $a),
            u("div", Ra, [
              x(R, {
                label: "h",
                desc: "°",
                value: c.value.h.toFixed(),
                onChange: p[1] || (p[1] = (m) => d("h", m)),
                a11y: { label: "Hue" }
              }, null, 8, ["value"]),
              x(R, {
                label: "s",
                desc: "%",
                value: (c.value.s * 100).toFixed(),
                min: 0,
                max: 100,
                onChange: p[2] || (p[2] = (m) => d("s", m)),
                a11y: { label: "Saturation" }
              }, null, 8, ["value"]),
              x(R, {
                label: "v",
                desc: "%",
                value: (c.value.v * 100).toFixed(),
                min: 0,
                max: 100,
                onChange: p[3] || (p[3] = (m) => d("v", m)),
                a11y: { label: "Value" }
              }, null, 8, ["value"]),
              p[8] || (p[8] = u("div", { class: "fields-divider" }, null, -1)),
              x(R, {
                label: "r",
                value: v.value.r,
                onChange: p[4] || (p[4] = (m) => A("r", m)),
                a11y: { label: "Red" }
              }, null, 8, ["value"]),
              x(R, {
                label: "g",
                value: v.value.g,
                onChange: p[5] || (p[5] = (m) => A("g", m)),
                a11y: { label: "Green" }
              }, null, 8, ["value"]),
              x(R, {
                label: "b",
                value: v.value.b,
                onChange: p[6] || (p[6] = (m) => A("b", m)),
                a11y: { label: "Blue" }
              }, null, 8, ["value"]),
              p[9] || (p[9] = u("div", { class: "fields-divider" }, null, -1)),
              x(R, {
                label: "#",
                class: "hex",
                value: i.value,
                onChange: y,
                a11y: { label: "Hex" }
              }, null, 8, ["value"])
            ]),
            k.hasResetButton ? (g(), _("div", {
              key: 0,
              class: "action-btn",
              onClick: $,
              role: "button",
              "aria-label": k.resetLabel,
              onKeydown: I($, ["space"]),
              tabindex: "0"
            }, j(k.resetLabel), 41, Ha)) : B("", !0)
          ]))
        ], 2)
      ])
    ], 2));
  }
}), qn = /* @__PURE__ */ T(La, [["__scopeId", "data-v-bc374c28"]]), Ea = { class: "saturation" }, Ba = { class: "controls" }, Va = { class: "sliders" }, Da = { class: "hue" }, Ta = {
  key: 0,
  class: "alpha"
}, Pa = { class: "color" }, Ia = ["aria-label"], Na = {
  key: 0,
  class: "field"
}, Ua = { class: "field_double" }, Oa = { class: "field_single" }, Ka = { class: "field_single" }, Ga = { class: "field_single" }, za = {
  key: 0,
  class: "field_single"
}, Wa = {
  class: "presets",
  role: "listbox",
  "aria-label": "A color preset, pick one to set as current color"
}, Xa = ["onClick", "title", "aria-label", "aria-selected", "onKeydown"], Ya = ["onClick", "aria-selected", "title", "onKeydown"], ja = [
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
], qa = /* @__PURE__ */ D({
  __name: "SketchPicker",
  props: {
    presetColors: { default: () => ja },
    disableAlpha: { type: Boolean, default: !1 },
    disableFields: { type: Boolean, default: !1 },
    tinyColor: {},
    modelValue: {},
    value: {}
  },
  emits: ["change"].concat(O),
  setup(e, { emit: a }) {
    const t = e, n = K(t, a), { hueRef: l, updateHueRef: s } = he(n), o = S(() => Number(n.value.getAlpha().toFixed(2))), c = S(() => {
      let d;
      return o.value < 1 ? d = n.value.toHex8String() : d = n.value.toHexString(), d.replace("#", "");
    }), i = S(() => n.value.toRgb()), v = (d) => {
      d && oe(d) && (n.value = d);
    }, b = (d, F) => {
      if (!F || isNaN(Number(F)))
        return;
      const f = { [d]: F };
      n.value = {
        ...i.value,
        ...f
      };
    }, y = (d) => {
      !d || isNaN(Number(d)) || (n.value = n.value.setAlpha(d).clone());
    }, A = (d) => {
      n.value = d;
    };
    return (d, F) => (g(), _("div", {
      role: "application",
      "aria-label": "Sketch color picker",
      class: G(["vc-sketch-picker", d.disableAlpha ? "alpha-disabled" : ""])
    }, [
      u("div", Ea, [
        x(ke, {
          hue: H(l),
          tinyColor: H(n),
          "onUpdate:tinyColor": F[0] || (F[0] = (f) => ae(n) ? n.value = f : null)
        }, null, 8, ["hue", "tinyColor"])
      ]),
      u("div", Ba, [
        u("div", Va, [
          u("div", Da, [
            x(le, {
              modelValue: H(l),
              "onUpdate:modelValue": H(s)
            }, null, 8, ["modelValue", "onUpdate:modelValue"])
          ]),
          d.disableAlpha ? B("", !0) : (g(), _("div", Ta, [
            x(xe, {
              tinyColor: H(n),
              "onUpdate:tinyColor": F[1] || (F[1] = (f) => ae(n) ? n.value = f : null)
            }, null, 8, ["tinyColor"])
          ]))
        ]),
        u("div", Pa, [
          u("div", {
            "aria-label": `Current color is ${H(n).toRgbString()}`,
            class: "active-color",
            style: V({ background: H(n).toRgbString() })
          }, null, 12, Ia),
          x(ce)
        ])
      ]),
      d.disableFields ? B("", !0) : (g(), _("div", Na, [
        u("div", Ua, [
          x(R, {
            label: "hex",
            value: c.value,
            onChange: v,
            a11y: { label: "Hex" }
          }, null, 8, ["value"])
        ]),
        u("div", Oa, [
          x(R, {
            label: "r",
            value: i.value.r,
            onChange: F[2] || (F[2] = (f) => b("r", f)),
            a11y: { label: "Red" }
          }, null, 8, ["value"])
        ]),
        u("div", Ka, [
          x(R, {
            label: "g",
            value: i.value.g,
            onChange: F[3] || (F[3] = (f) => b("g", f)),
            a11y: { label: "Green" }
          }, null, 8, ["value"])
        ]),
        u("div", Ga, [
          x(R, {
            label: "b",
            value: i.value.b,
            onChange: F[4] || (F[4] = (f) => b("b", f)),
            a11y: { label: "Blue" }
          }, null, 8, ["value"])
        ]),
        d.disableAlpha ? B("", !0) : (g(), _("div", za, [
          x(R, {
            label: "a",
            value: o.value,
            step: 0.01,
            max: 1,
            onChange: y,
            a11y: { label: "Transparency" }
          }, null, 8, ["value"])
        ]))
      ])),
      u("div", Wa, [
        (g(!0), _(q, null, Q(t.presetColors, (f) => (g(), _(q, null, [
          H(St)(f) ? (g(), _("div", {
            key: f,
            class: "preset-color",
            onClick: ($) => A(f),
            "aria-label": "Color: transparency",
            "aria-selected": o.value === 0,
            role: "option",
            tabindex: "0",
            title: f,
            onKeydown: I(($) => A(f), ["space"])
          }, [
            x(ce)
          ], 40, Ya)) : (g(), _("div", {
            class: "preset-color",
            key: f + "-color",
            style: V({ background: f }),
            onClick: ($) => A(f),
            title: f,
            "aria-label": "Color:" + f,
            "aria-selected": `#${c.value.toLowerCase()}` === f.toLowerCase(),
            role: "option",
            tabindex: "0",
            onKeydown: I(($) => A(f), ["space"])
          }, null, 44, Xa))
        ], 64))), 256))
      ])
    ], 2));
  }
}), Zn = /* @__PURE__ */ T(qa, [["__scopeId", "data-v-4a59b29b"]]), Za = {
  role: "application",
  "aria-label": "Slider color picker",
  class: "vc-slider-picker"
}, Ja = { class: "hue" }, Qa = {
  key: 0,
  class: "alpha"
}, en = {
  key: 1,
  class: "swatches",
  role: "listbox",
  "aria-label": "Color segments in different shades of one color",
  tabindex: "0"
}, tn = ["onClick", "aria-label", "title", "onKeydown", "aria-selected"], te = 0.5, an = [
  { s: te, l: 0.8 },
  { s: te, l: 0.65 },
  { s: te, l: 0.5 },
  { s: te, l: 0.35 },
  { s: te, l: 0.2 }
], nn = /* @__PURE__ */ D({
  __name: "SliderPicker",
  props: {
    swatches: { default: () => an },
    alpha: { type: Boolean },
    tinyColor: {},
    modelValue: {},
    value: {}
  },
  emits: O,
  setup(e, { emit: a }) {
    const t = e, n = K(t, a), { hueRef: l, updateHueRef: s } = he(n), o = S(() => n.value.toHsl()), c = S(() => n.value.toHexString()), i = S(() => t.swatches.map((A) => typeof A == "string" ? {
      s: te,
      l: Number(A)
    } : A)), v = (y) => o.value.l === 1 && y.l === 1 || o.value.l === 0 && y.l === 0 ? !0 : Math.abs(o.value.l - y.l) < 0.01 && Math.abs(o.value.s - y.s) < 0.01, b = (y) => {
      n.value = {
        h: o.value.h,
        s: y.s,
        l: y.l
      };
    };
    return (y, A) => (g(), _("div", Za, [
      u("div", Ja, [
        x(le, {
          modelValue: H(l),
          "onUpdate:modelValue": H(s)
        }, null, 8, ["modelValue", "onUpdate:modelValue"])
      ]),
      t.alpha ? (g(), _("div", Qa, [
        x(xe, {
          tinyColor: H(n),
          "onUpdate:tinyColor": A[0] || (A[0] = (d) => ae(n) ? n.value = d : null)
        }, null, 8, ["tinyColor"])
      ])) : B("", !0),
      i.value.length > 0 ? (g(), _("div", en, [
        (g(!0), _(q, null, Q(i.value, (d, F) => (g(), _("div", {
          class: "swatch",
          key: F,
          "data-index": "index",
          onClick: (f) => b(d),
          role: "option",
          "aria-label": "Color:" + c.value,
          title: c.value,
          onKeydown: I((f) => b(d), ["space"]),
          "aria-selected": v(d),
          tabindex: "0"
        }, [
          u("div", {
            class: G({
              picker: !0,
              picker_active: v(d),
              picker_white: d.l === 1
            }),
            style: V({ background: "hsl(" + o.value.h + ", " + d.s * 100 + "%, " + d.l * 100 + "%)" })
          }, null, 6)
        ], 40, tn))), 128))
      ])) : B("", !0)
    ]));
  }
}), Jn = /* @__PURE__ */ T(nn, [["__scopeId", "data-v-675d6988"]]);
var rn = { 50: "#ffebee", 100: "#ffcdd2", 200: "#ef9a9a", 300: "#e57373", 400: "#ef5350", 500: "#f44336", 600: "#e53935", 700: "#d32f2f", 800: "#c62828", 900: "#b71c1c", a100: "#ff8a80", a200: "#ff5252", a400: "#ff1744", a700: "#d50000" }, ln = { 50: "#fce4ec", 100: "#f8bbd0", 200: "#f48fb1", 300: "#f06292", 400: "#ec407a", 500: "#e91e63", 600: "#d81b60", 700: "#c2185b", 800: "#ad1457", 900: "#880e4f", a100: "#ff80ab", a200: "#ff4081", a400: "#f50057", a700: "#c51162" }, on = { 50: "#f3e5f5", 100: "#e1bee7", 200: "#ce93d8", 300: "#ba68c8", 400: "#ab47bc", 500: "#9c27b0", 600: "#8e24aa", 700: "#7b1fa2", 800: "#6a1b9a", 900: "#4a148c", a100: "#ea80fc", a200: "#e040fb", a400: "#d500f9", a700: "#aa00ff" }, sn = { 50: "#ede7f6", 100: "#d1c4e9", 200: "#b39ddb", 300: "#9575cd", 400: "#7e57c2", 500: "#673ab7", 600: "#5e35b1", 700: "#512da8", 800: "#4527a0", 900: "#311b92", a100: "#b388ff", a200: "#7c4dff", a400: "#651fff", a700: "#6200ea" }, un = { 50: "#e8eaf6", 100: "#c5cae9", 200: "#9fa8da", 300: "#7986cb", 400: "#5c6bc0", 500: "#3f51b5", 600: "#3949ab", 700: "#303f9f", 800: "#283593", 900: "#1a237e", a100: "#8c9eff", a200: "#536dfe", a400: "#3d5afe", a700: "#304ffe" }, cn = { 50: "#e3f2fd", 100: "#bbdefb", 200: "#90caf9", 300: "#64b5f6", 400: "#42a5f5", 500: "#2196f3", 600: "#1e88e5", 700: "#1976d2", 800: "#1565c0", 900: "#0d47a1", a100: "#82b1ff", a200: "#448aff", a400: "#2979ff", a700: "#2962ff" }, dn = { 50: "#e1f5fe", 100: "#b3e5fc", 200: "#81d4fa", 300: "#4fc3f7", 400: "#29b6f6", 500: "#03a9f4", 600: "#039be5", 700: "#0288d1", 800: "#0277bd", 900: "#01579b", a100: "#80d8ff", a200: "#40c4ff", a400: "#00b0ff", a700: "#0091ea" }, fn = { 50: "#e0f7fa", 100: "#b2ebf2", 200: "#80deea", 300: "#4dd0e1", 400: "#26c6da", 500: "#00bcd4", 600: "#00acc1", 700: "#0097a7", 800: "#00838f", 900: "#006064", a100: "#84ffff", a200: "#18ffff", a400: "#00e5ff", a700: "#00b8d4" }, hn = { 50: "#e0f2f1", 100: "#b2dfdb", 200: "#80cbc4", 300: "#4db6ac", 400: "#26a69a", 500: "#009688", 600: "#00897b", 700: "#00796b", 800: "#00695c", 900: "#004d40", a100: "#a7ffeb", a200: "#64ffda", a400: "#1de9b6", a700: "#00bfa5" }, vn = { 50: "#e8f5e9", 100: "#c8e6c9", 200: "#a5d6a7", 300: "#81c784", 400: "#66bb6a", 500: "#4caf50", 600: "#43a047", 700: "#388e3c", 800: "#2e7d32", 900: "#1b5e20", a100: "#b9f6ca", a200: "#69f0ae", a400: "#00e676", a700: "#00c853" }, bn = { 50: "#f1f8e9", 100: "#dcedc8", 200: "#c5e1a5", 300: "#aed581", 400: "#9ccc65", 500: "#8bc34a", 600: "#7cb342", 700: "#689f38", 800: "#558b2f", 900: "#33691e", a100: "#ccff90", a200: "#b2ff59", a400: "#76ff03", a700: "#64dd17" }, pn = { 50: "#f9fbe7", 100: "#f0f4c3", 200: "#e6ee9c", 300: "#dce775", 400: "#d4e157", 500: "#cddc39", 600: "#c0ca33", 700: "#afb42b", 800: "#9e9d24", 900: "#827717", a100: "#f4ff81", a200: "#eeff41", a400: "#c6ff00", a700: "#aeea00" }, gn = { 50: "#fffde7", 100: "#fff9c4", 200: "#fff59d", 300: "#fff176", 400: "#ffee58", 500: "#ffeb3b", 600: "#fdd835", 700: "#fbc02d", 800: "#f9a825", 900: "#f57f17", a100: "#ffff8d", a200: "#ffff00", a400: "#ffea00", a700: "#ffd600" }, mn = { 50: "#fff8e1", 100: "#ffecb3", 200: "#ffe082", 300: "#ffd54f", 400: "#ffca28", 500: "#ffc107", 600: "#ffb300", 700: "#ffa000", 800: "#ff8f00", 900: "#ff6f00", a100: "#ffe57f", a200: "#ffd740", a400: "#ffc400", a700: "#ffab00" }, _n = { 50: "#fff3e0", 100: "#ffe0b2", 200: "#ffcc80", 300: "#ffb74d", 400: "#ffa726", 500: "#ff9800", 600: "#fb8c00", 700: "#f57c00", 800: "#ef6c00", 900: "#e65100", a100: "#ffd180", a200: "#ffab40", a400: "#ff9100", a700: "#ff6d00" }, yn = { 50: "#fbe9e7", 100: "#ffccbc", 200: "#ffab91", 300: "#ff8a65", 400: "#ff7043", 500: "#ff5722", 600: "#f4511e", 700: "#e64a19", 800: "#d84315", 900: "#bf360c", a100: "#ff9e80", a200: "#ff6e40", a400: "#ff3d00", a700: "#dd2c00" }, wn = { 50: "#efebe9", 100: "#d7ccc8", 200: "#bcaaa4", 300: "#a1887f", 400: "#8d6e63", 500: "#795548", 600: "#6d4c41", 700: "#5d4037", 800: "#4e342e", 900: "#3e2723" }, Cn = { 50: "#fafafa", 100: "#f5f5f5", 200: "#eeeeee", 300: "#e0e0e0", 400: "#bdbdbd", 500: "#9e9e9e", 600: "#757575", 700: "#616161", 800: "#424242", 900: "#212121" }, kn = { 50: "#eceff1", 100: "#cfd8dc", 200: "#b0bec5", 300: "#90a4ae", 400: "#78909c", 500: "#607d8b", 600: "#546e7a", 700: "#455a64", 800: "#37474f", 900: "#263238" }, xn = { primary: "rgba(0, 0, 0, 0.87)", secondary: "rgba(0, 0, 0, 0.54)", disabled: "rgba(0, 0, 0, 0.38)", dividers: "rgba(0, 0, 0, 0.12)" }, An = { primary: "rgba(255, 255, 255, 1)", secondary: "rgba(255, 255, 255, 0.7)", disabled: "rgba(255, 255, 255, 0.5)", dividers: "rgba(255, 255, 255, 0.12)" }, Fn = { active: "rgba(0, 0, 0, 0.54)", inactive: "rgba(0, 0, 0, 0.38)" }, Mn = { active: "rgba(255, 255, 255, 1)", inactive: "rgba(255, 255, 255, 0.5)" }, Sn = "#ffffff", $n = "#000000";
const Rn = {
  red: rn,
  pink: ln,
  purple: on,
  deepPurple: sn,
  indigo: un,
  blue: cn,
  lightBlue: dn,
  cyan: fn,
  teal: hn,
  green: vn,
  lightGreen: bn,
  lime: pn,
  yellow: gn,
  amber: mn,
  orange: _n,
  deepOrange: yn,
  brown: wn,
  grey: Cn,
  blueGrey: kn,
  darkText: xn,
  lightText: An,
  darkIcons: Fn,
  lightIcons: Mn,
  white: Sn,
  black: $n
}, Hn = ["data-pick"], Ln = {
  class: "box",
  role: "listbox",
  "aria-label": "Pick a color",
  tabindex: "0"
}, En = ["data-color", "onClick", "aria-label", "aria-selected", "title", "onKeydown"], Bn = { class: "picker" }, Vn = {
  style: { width: "24px", height: "24px" },
  viewBox: "0 0 24 24"
}, Dn = [
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
], Tn = ["900", "700", "500", "300", "100"], Pn = /* @__PURE__ */ (() => {
  const e = [];
  return Dn.forEach((a) => {
    let t = [];
    a.toLowerCase() === "black" || a.toLowerCase() === "white" ? t = t.concat(["#000000", "#FFFFFF"]) : Tn.forEach((r) => {
      const n = Rn[a][r];
      t.push(n.toUpperCase());
    }), e.push(t);
  }), e;
})(), In = /* @__PURE__ */ D({
  __name: "SwatchesPicker",
  props: {
    palette: { default: () => Pn },
    tinyColor: {},
    modelValue: {},
    value: {}
  },
  emits: O,
  setup(e, { emit: a }) {
    const n = K(e, a), l = S(() => n.value.toHexString()), s = (c) => c.toLowerCase() === l.value.toLowerCase(), o = (c) => {
      n.value = c;
    };
    return (c, i) => (g(), _("div", {
      role: "application",
      "aria-label": "Swatches color picker",
      class: "vc-swatches-picker",
      "data-pick": l.value
    }, [
      u("div", Ln, [
        (g(!0), _(q, null, Q(c.palette, (v, b) => (g(), _("div", {
          class: "colorGroup",
          key: b
        }, [
          (g(!0), _(q, null, Q(v, (y) => (g(), _("div", {
            class: G(["color", { color_white: y === "#FFFFFF" }]),
            key: y,
            "data-color": y,
            style: V({ background: y }),
            onClick: (A) => o(y),
            role: "option",
            "aria-label": "Color:" + y,
            "aria-selected": s(y),
            title: y,
            onKeydown: I((A) => o(y), ["space"]),
            tabindex: "0"
          }, [
            Z(u("div", Bn, [
              (g(), _("svg", Vn, i[0] || (i[0] = [
                u("path", { d: "M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" }, null, -1)
              ])))
            ], 512), [
              [J, s(y)]
            ])
          ], 46, En))), 128))
        ]))), 128))
      ])
    ], 8, Hn));
  }
}), Qn = /* @__PURE__ */ T(In, [["__scopeId", "data-v-3427cb2a"]]), Nn = {
  class: "body",
  role: "listbox",
  tabindex: "0",
  "aria-label": "Select a color"
}, Un = ["onClick", "aria-label", "title", "aria-selected", "onKeydown"], On = [
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
], Kn = /* @__PURE__ */ D({
  __name: "TwitterPicker",
  props: {
    width: { default: 276 },
    presetColors: { default: () => On },
    triangle: { default: "top-left" },
    tinyColor: {},
    modelValue: {},
    value: {}
  },
  emits: O,
  setup(e, { emit: a }) {
    const t = e, n = K(t, a), l = S(() => n.value.toHexString()), s = (i) => i.toLowerCase() === l.value.toLowerCase(), o = (i) => {
      n.value = i;
    }, c = (i) => {
      oe(i) && (n.value = i);
    };
    return (i, v) => (g(), _("div", {
      class: G(["vc-twitter-picker", {
        tri_hide: t.triangle === "hide",
        tri_top_left: t.triangle === "top-left",
        tri_top_right: t.triangle === "top-right"
      }]),
      style: V({
        width: typeof t.width == "number" ? `${t.width}px` : t.width
      }),
      role: "application",
      "aria-label": "Twitter color picker"
    }, [
      v[2] || (v[2] = u("div", { class: "triangle_shadow" }, null, -1)),
      v[3] || (v[3] = u("div", { class: "triangle" }, null, -1)),
      u("div", Nn, [
        (g(!0), _(q, null, Q(i.presetColors, (b, y) => (g(), _("span", {
          key: y,
          class: "swatch",
          style: V({
            background: b,
            boxShadow: `0 0 4px ${s(b) ? b : "transparent"}`
          }),
          onClick: (A) => o(b),
          role: "option",
          "aria-label": "color:" + b,
          title: b,
          "aria-selected": s(b),
          onKeydown: I((A) => o(b), ["space"]),
          tabindex: "0"
        }, null, 44, Un))), 128)),
        v[0] || (v[0] = u("div", {
          class: "hash",
          "aria-hidden": "true"
        }, "#", -1)),
        x(R, {
          value: l.value.replace("#", ""),
          onChange: c,
          a11y: { label: "Hex" }
        }, null, 8, ["value"]),
        v[1] || (v[1] = u("div", { class: "clear" }, null, -1))
      ])
    ], 6));
  }
}), er = /* @__PURE__ */ T(Kn, [["__scopeId", "data-v-4652e193"]]), Gn = /* @__PURE__ */ D({
  __name: "HueSlider",
  props: {
    modelValue: {},
    value: {}
  },
  emits: ["input", "update:modelValue"],
  setup(e, { emit: a }) {
    Ie((o) => ({
      "612877b1": s.value
    }));
    const t = a, r = e, n = S(() => r.modelValue ?? r.value ?? 0), l = (o) => {
      t("input", o), t("update:modelValue", o);
    }, s = S(() => `hsl(${n.value}, 100%, 50%)`);
    return (o, c) => (g(), se(le, Ne({ class: "vc-hue-wrap" }, o.$attrs, {
      modelValue: n.value,
      "onUpdate:modelValue": l
    }), null, 16, ["modelValue"]));
  }
}), tr = /* @__PURE__ */ T(Gn, [["__scopeId", "data-v-e8f2ce6c"]]);
export {
  xe as AlphaSlider,
  Wn as ChromePicker,
  Xn as CompactPicker,
  Yn as GrayscalePicker,
  tr as HueSlider,
  jn as MaterialPicker,
  qn as PhotoshopPicker,
  Zn as SketchPicker,
  Jn as SliderPicker,
  Qn as SwatchesPicker,
  er as TwitterPicker,
  h as tinycolor
};
