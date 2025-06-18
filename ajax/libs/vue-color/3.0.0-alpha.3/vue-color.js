import { computed as $, defineComponent as T, ref as ee, useTemplateRef as ge, openBlock as g, createElementBlock as _, normalizeStyle as E, createElementVNode as u, mergeModels as De, useModel as Te, watch as $e, normalizeClass as G, renderSlot as Ve, createVNode as x, unref as L, toDisplayString as Y, createCommentVNode as D, isRef as ne, createBlock as ie, withDirectives as W, vShow as Z, withKeys as I, Fragment as q, renderList as J, withCtx as Pe, useCssVars as Ie, useAttrs as Ne, mergeProps as Oe } from "vue";
function se(e) {
  "@babel/helpers - typeof";
  return se = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(a) {
    return typeof a;
  } : function(a) {
    return a && typeof Symbol == "function" && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a;
  }, se(e);
}
var Ue = /^\s+/, Ke = /\s+$/;
function f(e, a) {
  if (e = e || "", a = a || {}, e instanceof f)
    return e;
  if (!(this instanceof f))
    return new f(e, a);
  var t = Ge(e);
  this._originalInput = e, this._r = t.r, this._g = t.g, this._b = t.b, this._a = t.a, this._roundA = Math.round(100 * this._a) / 100, this._format = a.format || t.format, this._gradientType = a.gradientType, this._r < 1 && (this._r = Math.round(this._r)), this._g < 1 && (this._g = Math.round(this._g)), this._b < 1 && (this._b = Math.round(this._b)), this._ok = t.ok;
}
f.prototype = {
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
    var a = this.toRgb(), t, r, n, l, i, o;
    return t = a.r / 255, r = a.g / 255, n = a.b / 255, t <= 0.03928 ? l = t / 12.92 : l = Math.pow((t + 0.055) / 1.055, 2.4), r <= 0.03928 ? i = r / 12.92 : i = Math.pow((r + 0.055) / 1.055, 2.4), n <= 0.03928 ? o = n / 12.92 : o = Math.pow((n + 0.055) / 1.055, 2.4), 0.2126 * l + 0.7152 * i + 0.0722 * o;
  },
  setAlpha: function(a) {
    return this._a = Re(a), this._roundA = Math.round(100 * this._a) / 100, this;
  },
  toHsv: function() {
    var a = xe(this._r, this._g, this._b);
    return {
      h: a.h * 360,
      s: a.s,
      v: a.v,
      a: this._a
    };
  },
  toHsvString: function() {
    var a = xe(this._r, this._g, this._b), t = Math.round(a.h * 360), r = Math.round(a.s * 100), n = Math.round(a.v * 100);
    return this._a == 1 ? "hsv(" + t + ", " + r + "%, " + n + "%)" : "hsva(" + t + ", " + r + "%, " + n + "%, " + this._roundA + ")";
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
    var a = we(this._r, this._g, this._b), t = Math.round(a.h * 360), r = Math.round(a.s * 100), n = Math.round(a.l * 100);
    return this._a == 1 ? "hsl(" + t + ", " + r + "%, " + n + "%)" : "hsla(" + t + ", " + r + "%, " + n + "%, " + this._roundA + ")";
  },
  toHex: function(a) {
    return Ae(this._r, this._g, this._b, a);
  },
  toHexString: function(a) {
    return "#" + this.toHex(a);
  },
  toHex8: function(a) {
    return Ye(this._r, this._g, this._b, this._a, a);
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
      r: Math.round(B(this._r, 255) * 100) + "%",
      g: Math.round(B(this._g, 255) * 100) + "%",
      b: Math.round(B(this._b, 255) * 100) + "%",
      a: this._a
    };
  },
  toPercentageRgbString: function() {
    return this._a == 1 ? "rgb(" + Math.round(B(this._r, 255) * 100) + "%, " + Math.round(B(this._g, 255) * 100) + "%, " + Math.round(B(this._b, 255) * 100) + "%)" : "rgba(" + Math.round(B(this._r, 255) * 100) + "%, " + Math.round(B(this._g, 255) * 100) + "%, " + Math.round(B(this._b, 255) * 100) + "%, " + this._roundA + ")";
  },
  toName: function() {
    return this._a === 0 ? "transparent" : this._a < 1 ? !1 : ot[Ae(this._r, this._g, this._b, !0)] || !1;
  },
  toFilter: function(a) {
    var t = "#" + Fe(this._r, this._g, this._b, this._a), r = t, n = this._gradientType ? "GradientType = 1, " : "";
    if (a) {
      var l = f(a);
      r = "#" + Fe(l._r, l._g, l._b, l._a);
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
    return f(this.toString());
  },
  _applyModification: function(a, t) {
    var r = a.apply(null, [this].concat([].slice.call(t)));
    return this._r = r._r, this._g = r._g, this._b = r._b, this.setAlpha(r._a), this;
  },
  lighten: function() {
    return this._applyModification(Je, arguments);
  },
  brighten: function() {
    return this._applyModification(Qe, arguments);
  },
  darken: function() {
    return this._applyModification(et, arguments);
  },
  desaturate: function() {
    return this._applyModification(qe, arguments);
  },
  saturate: function() {
    return this._applyModification(We, arguments);
  },
  greyscale: function() {
    return this._applyModification(Ze, arguments);
  },
  spin: function() {
    return this._applyModification(tt, arguments);
  },
  _applyCombination: function(a, t) {
    return a.apply(null, [this].concat([].slice.call(t)));
  },
  analogous: function() {
    return this._applyCombination(rt, arguments);
  },
  complement: function() {
    return this._applyCombination(at, arguments);
  },
  monochromatic: function() {
    return this._applyCombination(lt, arguments);
  },
  splitcomplement: function() {
    return this._applyCombination(nt, arguments);
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
f.fromRatio = function(e, a) {
  if (se(e) == "object") {
    var t = {};
    for (var r in e)
      e.hasOwnProperty(r) && (r === "a" ? t[r] = e[r] : t[r] = ae(e[r]));
    e = t;
  }
  return f(e, a);
};
function Ge(e) {
  var a = {
    r: 0,
    g: 0,
    b: 0
  }, t = 1, r = null, n = null, l = null, i = !1, o = !1;
  return typeof e == "string" && (e = ct(e)), se(e) == "object" && (X(e.r) && X(e.g) && X(e.b) ? (a = ze(e.r, e.g, e.b), i = !0, o = String(e.r).substr(-1) === "%" ? "prgb" : "rgb") : X(e.h) && X(e.s) && X(e.v) ? (r = ae(e.s), n = ae(e.v), a = je(e.h, r, n), i = !0, o = "hsv") : X(e.h) && X(e.s) && X(e.l) && (r = ae(e.s), l = ae(e.l), a = Xe(e.h, r, l), i = !0, o = "hsl"), e.hasOwnProperty("a") && (t = e.a)), t = Re(t), {
    ok: i,
    format: e.format || o,
    r: Math.min(255, Math.max(a.r, 0)),
    g: Math.min(255, Math.max(a.g, 0)),
    b: Math.min(255, Math.max(a.b, 0)),
    a: t
  };
}
function ze(e, a, t) {
  return {
    r: B(e, 255) * 255,
    g: B(a, 255) * 255,
    b: B(t, 255) * 255
  };
}
function we(e, a, t) {
  e = B(e, 255), a = B(a, 255), t = B(t, 255);
  var r = Math.max(e, a, t), n = Math.min(e, a, t), l, i, o = (r + n) / 2;
  if (r == n)
    l = i = 0;
  else {
    var d = r - n;
    switch (i = o > 0.5 ? d / (2 - r - n) : d / (r + n), r) {
      case e:
        l = (a - t) / d + (a < t ? 6 : 0);
        break;
      case a:
        l = (t - e) / d + 2;
        break;
      case t:
        l = (e - a) / d + 4;
        break;
    }
    l /= 6;
  }
  return {
    h: l,
    s: i,
    l: o
  };
}
function Xe(e, a, t) {
  var r, n, l;
  e = B(e, 360), a = B(a, 100), t = B(t, 100);
  function i(s, h, v) {
    return v < 0 && (v += 1), v > 1 && (v -= 1), v < 1 / 6 ? s + (h - s) * 6 * v : v < 1 / 2 ? h : v < 2 / 3 ? s + (h - s) * (2 / 3 - v) * 6 : s;
  }
  if (a === 0)
    r = n = l = t;
  else {
    var o = t < 0.5 ? t * (1 + a) : t + a - t * a, d = 2 * t - o;
    r = i(d, o, e + 1 / 3), n = i(d, o, e), l = i(d, o, e - 1 / 3);
  }
  return {
    r: r * 255,
    g: n * 255,
    b: l * 255
  };
}
function xe(e, a, t) {
  e = B(e, 255), a = B(a, 255), t = B(t, 255);
  var r = Math.max(e, a, t), n = Math.min(e, a, t), l, i, o = r, d = r - n;
  if (i = r === 0 ? 0 : d / r, r == n)
    l = 0;
  else {
    switch (r) {
      case e:
        l = (a - t) / d + (a < t ? 6 : 0);
        break;
      case a:
        l = (t - e) / d + 2;
        break;
      case t:
        l = (e - a) / d + 4;
        break;
    }
    l /= 6;
  }
  return {
    h: l,
    s: i,
    v: o
  };
}
function je(e, a, t) {
  e = B(e, 360) * 6, a = B(a, 100), t = B(t, 100);
  var r = Math.floor(e), n = e - r, l = t * (1 - a), i = t * (1 - n * a), o = t * (1 - (1 - n) * a), d = r % 6, s = [t, i, l, l, o, t][d], h = [o, t, t, i, l, l][d], v = [l, l, o, t, t, i][d];
  return {
    r: s * 255,
    g: h * 255,
    b: v * 255
  };
}
function Ae(e, a, t, r) {
  var n = [O(Math.round(e).toString(16)), O(Math.round(a).toString(16)), O(Math.round(t).toString(16))];
  return r && n[0].charAt(0) == n[0].charAt(1) && n[1].charAt(0) == n[1].charAt(1) && n[2].charAt(0) == n[2].charAt(1) ? n[0].charAt(0) + n[1].charAt(0) + n[2].charAt(0) : n.join("");
}
function Ye(e, a, t, r, n) {
  var l = [O(Math.round(e).toString(16)), O(Math.round(a).toString(16)), O(Math.round(t).toString(16)), O(He(r))];
  return n && l[0].charAt(0) == l[0].charAt(1) && l[1].charAt(0) == l[1].charAt(1) && l[2].charAt(0) == l[2].charAt(1) && l[3].charAt(0) == l[3].charAt(1) ? l[0].charAt(0) + l[1].charAt(0) + l[2].charAt(0) + l[3].charAt(0) : l.join("");
}
function Fe(e, a, t, r) {
  var n = [O(He(r)), O(Math.round(e).toString(16)), O(Math.round(a).toString(16)), O(Math.round(t).toString(16))];
  return n.join("");
}
f.equals = function(e, a) {
  return !e || !a ? !1 : f(e).toRgbString() == f(a).toRgbString();
};
f.random = function() {
  return f.fromRatio({
    r: Math.random(),
    g: Math.random(),
    b: Math.random()
  });
};
function qe(e, a) {
  a = a === 0 ? 0 : a || 10;
  var t = f(e).toHsl();
  return t.s -= a / 100, t.s = ce(t.s), f(t);
}
function We(e, a) {
  a = a === 0 ? 0 : a || 10;
  var t = f(e).toHsl();
  return t.s += a / 100, t.s = ce(t.s), f(t);
}
function Ze(e) {
  return f(e).desaturate(100);
}
function Je(e, a) {
  a = a === 0 ? 0 : a || 10;
  var t = f(e).toHsl();
  return t.l += a / 100, t.l = ce(t.l), f(t);
}
function Qe(e, a) {
  a = a === 0 ? 0 : a || 10;
  var t = f(e).toRgb();
  return t.r = Math.max(0, Math.min(255, t.r - Math.round(255 * -(a / 100)))), t.g = Math.max(0, Math.min(255, t.g - Math.round(255 * -(a / 100)))), t.b = Math.max(0, Math.min(255, t.b - Math.round(255 * -(a / 100)))), f(t);
}
function et(e, a) {
  a = a === 0 ? 0 : a || 10;
  var t = f(e).toHsl();
  return t.l -= a / 100, t.l = ce(t.l), f(t);
}
function tt(e, a) {
  var t = f(e).toHsl(), r = (t.h + a) % 360;
  return t.h = r < 0 ? 360 + r : r, f(t);
}
function at(e) {
  var a = f(e).toHsl();
  return a.h = (a.h + 180) % 360, f(a);
}
function Me(e, a) {
  if (isNaN(a) || a <= 0)
    throw new Error("Argument to polyad must be a positive number");
  for (var t = f(e).toHsl(), r = [f(e)], n = 360 / a, l = 1; l < a; l++)
    r.push(f({
      h: (t.h + l * n) % 360,
      s: t.s,
      l: t.l
    }));
  return r;
}
function nt(e) {
  var a = f(e).toHsl(), t = a.h;
  return [f(e), f({
    h: (t + 72) % 360,
    s: a.s,
    l: a.l
  }), f({
    h: (t + 216) % 360,
    s: a.s,
    l: a.l
  })];
}
function rt(e, a, t) {
  a = a || 6, t = t || 30;
  var r = f(e).toHsl(), n = 360 / t, l = [f(e)];
  for (r.h = (r.h - (n * a >> 1) + 720) % 360; --a; )
    r.h = (r.h + n) % 360, l.push(f(r));
  return l;
}
function lt(e, a) {
  a = a || 6;
  for (var t = f(e).toHsv(), r = t.h, n = t.s, l = t.v, i = [], o = 1 / a; a--; )
    i.push(f({
      h: r,
      s: n,
      v: l
    })), l = (l + o) % 1;
  return i;
}
f.mix = function(e, a, t) {
  t = t === 0 ? 0 : t || 50;
  var r = f(e).toRgb(), n = f(a).toRgb(), l = t / 100, i = {
    r: (n.r - r.r) * l + r.r,
    g: (n.g - r.g) * l + r.g,
    b: (n.b - r.b) * l + r.b,
    a: (n.a - r.a) * l + r.a
  };
  return f(i);
};
f.readability = function(e, a) {
  var t = f(e), r = f(a);
  return (Math.max(t.getLuminance(), r.getLuminance()) + 0.05) / (Math.min(t.getLuminance(), r.getLuminance()) + 0.05);
};
f.isReadable = function(e, a, t) {
  var r = f.readability(e, a), n, l;
  switch (l = !1, n = dt(t), n.level + n.size) {
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
f.mostReadable = function(e, a, t) {
  var r = null, n = 0, l, i, o, d;
  t = t || {}, i = t.includeFallbackColors, o = t.level, d = t.size;
  for (var s = 0; s < a.length; s++)
    l = f.readability(e, a[s]), l > n && (n = l, r = f(a[s]));
  return f.isReadable(e, r, {
    level: o,
    size: d
  }) || !i ? r : (t.includeFallbackColors = !1, f.mostReadable(e, ["#fff", "#000"], t));
};
var pe = f.names = {
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
}, ot = f.hexNames = it(pe);
function it(e) {
  var a = {};
  for (var t in e)
    e.hasOwnProperty(t) && (a[e[t]] = t);
  return a;
}
function Re(e) {
  return e = parseFloat(e), (isNaN(e) || e < 0 || e > 1) && (e = 1), e;
}
function B(e, a) {
  st(e) && (e = "100%");
  var t = ut(e);
  return e = Math.min(a, Math.max(0, parseFloat(e))), t && (e = parseInt(e * a, 10) / 100), Math.abs(e - a) < 1e-6 ? 1 : e % a / parseFloat(a);
}
function ce(e) {
  return Math.min(1, Math.max(0, e));
}
function P(e) {
  return parseInt(e, 16);
}
function st(e) {
  return typeof e == "string" && e.indexOf(".") != -1 && parseFloat(e) === 1;
}
function ut(e) {
  return typeof e == "string" && e.indexOf("%") != -1;
}
function O(e) {
  return e.length == 1 ? "0" + e : "" + e;
}
function ae(e) {
  return e <= 1 && (e = e * 100 + "%"), e;
}
function He(e) {
  return Math.round(parseFloat(e) * 255).toString(16);
}
function Se(e) {
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
function X(e) {
  return !!N.CSS_UNIT.exec(e);
}
function ct(e) {
  e = e.replace(Ue, "").replace(Ke, "").toLowerCase();
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
    r: P(t[1]),
    g: P(t[2]),
    b: P(t[3]),
    a: Se(t[4]),
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
    a: Se(t[4] + "" + t[4]),
    format: a ? "name" : "hex8"
  } : (t = N.hex3.exec(e)) ? {
    r: P(t[1] + "" + t[1]),
    g: P(t[2] + "" + t[2]),
    b: P(t[3] + "" + t[3]),
    format: a ? "name" : "hex"
  } : !1;
}
function dt(e) {
  var a, t;
  return e = e || {
    level: "AA",
    size: "small"
  }, a = (e.level || "AA").toUpperCase(), t = (e.size || "small").toLowerCase(), a !== "AA" && a !== "AAA" && (a = "AA"), t !== "small" && t !== "large" && (t = "small"), {
    level: a,
    size: t
  };
}
const ft = (e, a, t = !1) => {
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
    let r = e.toString(a);
    try {
      r = JSON.parse(r);
    } catch {
    }
    return r;
  }
}, U = ["update:tinyColor", "update:modelValue"];
function K(e, a) {
  let t, r;
  const n = $({
    get: () => {
      const i = e.tinyColor ?? e.modelValue, o = f(i);
      return typeof r > "u" && (r = o.getFormat()), typeof t > "u" && typeof e.modelValue == "object" && (t = !0), o;
    },
    set: (i) => {
      l(i);
    }
  }), l = (i) => {
    const o = f(i);
    Object.prototype.hasOwnProperty.call(e, "tinyColor") && a("update:tinyColor", o), Object.prototype.hasOwnProperty.call(e, "modelValue") && a("update:modelValue", ft(o, r, t));
  };
  return n;
}
const me = (e) => {
  const a = { x: 0, y: 0 };
  return e instanceof MouseEvent && (a.x = e.pageX, a.y = e.pageY), e instanceof TouchEvent && (a.x = e.touches ? e.touches[0].pageX : e.changedTouches ? e.changedTouches[0].pageX : 0, a.y = e.touches ? e.touches[0].pageY : e.changedTouches ? e.changedTouches[0].pageY : 0), a;
}, ht = () => {
  const e = window.scrollX || window.pageXOffset || document.documentElement.scrollLeft || 0, a = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
  return { x: e, y: a };
}, _e = (e) => {
  const { x: a, y: t } = ht(), r = e.getBoundingClientRect();
  return {
    x: r.left + a,
    y: r.top + t
  };
}, de = (e) => e.code === "ArrowUp" || e.keyCode === 38 ? "up" : e.code === "ArrowDown" || e.keyCode === 40 ? "down" : e.code === "ArrowLeft" || e.keyCode === 37 ? "left" : e.code === "ArrowRight" || e.keyCode === 39 ? "right" : null;
function vt(e) {
  const a = e.toString();
  return a.indexOf(".") !== -1 ? a.split(".")[1].length : 0;
}
function be(e, a, t) {
  return Math.min(Math.max(e, a), t);
}
const ye = (e, a = 20) => {
  let t, r, n;
  return (...l) => {
    t ? (clearTimeout(r), r = setTimeout(() => {
      Date.now() - n >= a && (e(...l), n = Date.now());
    }, Math.max(a - (Date.now() - n), 0))) : (e(...l), n = Date.now(), t = !0);
  };
}, bt = ["aria-valuetext"], pt = /* @__PURE__ */ T({
  __name: "SaturationSlider",
  props: {
    hue: {},
    tinyColor: {},
    modelValue: {}
  },
  emits: ["change"].concat(U),
  setup(e, { emit: a }) {
    const t = a, r = e, n = ee(0), l = K(r, t), i = $(() => l.value.toHsv()), o = $(() => r.hue ?? i.value.h), d = $(() => `hsl(${o.value}, 100%, 50%)`), s = $(() => -(i.value.v * 100) + 1 + 100 + "%"), h = $(() => i.value.v <= 0.01 ? n.value * 100 + "%" : i.value.s * 100 + "%"), v = ge("container");
    function y(m, w = !1) {
      w || m.preventDefault();
      var R = v.value;
      if (!R)
        return;
      const j = R.clientWidth, z = R.clientHeight, { x: F, y: p } = _e(R), { x: A, y: oe } = me(m), te = be(A - F, 0, j), Be = be(oe - p, 0, z), ke = te / j, Ee = be(1 - Be / z, 0, 1);
      n.value = ke;
      let he = Math.round(ke * 100), ve = Math.round(Ee * 100);
      he === 1 && (he = 0.01), ve === 1 && (ve = 0.01), M({
        h: o.value,
        s: he,
        v: ve,
        a: i.value.a
      });
    }
    function M(m) {
      l.value = m;
    }
    const c = ye(y, 20);
    function C() {
      window.addEventListener("mousemove", c), window.addEventListener("mouseup", c), window.addEventListener("mouseup", b);
    }
    function b() {
      S();
    }
    function S() {
      window.removeEventListener("mousemove", c), window.removeEventListener("mouseup", c), window.removeEventListener("mouseup", b);
    }
    function k(m) {
      switch (m.preventDefault(), de(m)) {
        case "left": {
          const R = i.value.s - 0.01;
          M({
            ...i.value,
            s: R >= 0 ? R : 0
          });
          break;
        }
        case "right": {
          const R = i.value.s + 0.01;
          M({
            ...i.value,
            s: R > 1 ? 1 : R
          });
          break;
        }
        case "up": {
          const R = i.value.v + 0.01;
          M({
            ...i.value,
            v: R > 1 ? 1 : R
          });
          break;
        }
        case "down": {
          const R = i.value.v - 0.01;
          M({
            ...i.value,
            v: R < 0 ? 0 : R
          });
          break;
        }
      }
    }
    return (m, w) => (g(), _("div", {
      class: "vc-saturation-slider bg",
      style: E({ background: d.value }),
      ref: "container",
      onMousedown: C,
      onTouchmove: y,
      onTouchstart: y,
      role: "application",
      "aria-label": "Saturation and brightness picker"
    }, [
      w[1] || (w[1] = u("div", { class: "bg white" }, null, -1)),
      w[2] || (w[2] = u("div", { class: "bg black" }, null, -1)),
      u("div", {
        class: "picker-wrap",
        style: E({ top: s.value, left: h.value }),
        role: "slider",
        tabindex: "0",
        "aria-valuemin": "0",
        "aria-valuemax": "1",
        "aria-label": "press arrow to change saturation or brightness",
        "aria-valuenow": "?",
        "aria-valuetext": `saturation: ${i.value.s.toFixed(0)}%, brightness: ${i.value.v.toFixed(0)}%`,
        onKeydown: k
      }, w[0] || (w[0] = [
        u("div", { class: "picker" }, null, -1)
      ]), 44, bt)
    ], 36));
  }
}), V = (e, a) => {
  const t = e.__vccOpts || e;
  for (const [r, n] of a)
    t[r] = n;
  return t;
}, Ce = /* @__PURE__ */ V(pt, [["__scopeId", "data-v-1d84bd11"]]), gt = { class: "vc-hue-slider" }, mt = ["aria-valuenow"], _t = /* @__PURE__ */ T({
  __name: "HueSlider",
  props: /* @__PURE__ */ De({
    direction: { default: "horizontal" }
  }, {
    modelValue: {
      default: 0
    },
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(e) {
    const a = e, t = Te(e, "modelValue"), r = ee(), n = ge("container");
    $e(t, (c, C) => {
      c !== 0 && c - C > 0 && (r.value = "right"), c !== 0 && c - C < 0 && (r.value = "left");
    });
    const l = $(() => a.direction === "vertical" ? t.value === 0 && r.value === "right" ? 0 : -(t.value * 100 / 360) + 100 + "%" : 0), i = $(() => a.direction === "vertical" ? 0 : t.value === 0 && r.value === "right" ? "100%" : t.value * 100 / 360 + "%");
    function o(c, C) {
      C || c.preventDefault();
      const b = n.value;
      if (!b)
        return;
      const S = b.clientWidth, k = b.clientHeight, { x: m, y: w } = _e(b), { x: R, y: j } = me(c), z = R - m, F = j - w;
      let p, A;
      a.direction === "vertical" ? (F < 0 ? p = 360 : F > k ? p = 0 : (A = -(F * 100 / k) + 100, p = Math.round(360 * A / 100)), t.value !== p && d(p)) : (z < 0 ? p = 0 : z > S ? p = 360 : (A = z * 100 / S, p = Math.round(360 * A / 100)), t.value !== p && d(p));
    }
    function d(c) {
      t.value = c;
    }
    const s = ye(o);
    function h(c) {
      o(c, !0), window.addEventListener("mousemove", s), window.addEventListener("mouseup", v);
    }
    function v() {
      y();
    }
    function y() {
      window.removeEventListener("mousemove", s), window.removeEventListener("mouseup", v);
    }
    function M(c) {
      c.preventDefault();
      const C = de(c), b = a.direction, S = t.value;
      let k;
      switch (C) {
        case "left": {
          if (b !== "horizontal")
            return;
          k = S - 1 < 0 ? 0 : Math.floor(S - 1);
          break;
        }
        case "right": {
          if (b !== "horizontal")
            return;
          k = S + 1 > 360 ? 360 : Math.ceil(S + 1);
          break;
        }
        case "down": {
          if (b !== "vertical")
            return;
          k = S - 1 < 0 ? 0 : Math.floor(S - 1);
          break;
        }
        case "up": {
          if (b !== "vertical")
            return;
          k = S + 1 > 360 ? 360 : Math.ceil(S + 1);
          break;
        }
      }
      typeof k < "u" && d(k);
    }
    return (c, C) => (g(), _("div", gt, [
      u("div", {
        class: G({
          container: !0,
          horizontal: a.direction === "horizontal",
          vertical: a.direction === "vertical"
        }),
        ref: "container",
        onMousedown: h,
        onTouchmove: o,
        onTouchstart: o,
        onKeydown: M,
        role: "slider",
        "aria-valuenow": t.value,
        "aria-valuemin": "0",
        "aria-valuemax": "360",
        "aria-label": "Hue",
        tabindex: "0"
      }, [
        u("div", {
          class: "picker-wrap",
          style: E({ top: l.value, left: i.value }),
          role: "presentation"
        }, [
          Ve(c.$slots, "default", {}, () => [
            C[0] || (C[0] = u("div", { class: "picker" }, null, -1))
          ], !0)
        ], 4)
      ], 42, mt)
    ]));
  }
}), re = /* @__PURE__ */ V(_t, [["__scopeId", "data-v-3b66385c"]]), yt = /* @__PURE__ */ T({
  __name: "CheckerboardBG",
  props: {
    size: { default: 8 },
    white: { default: "#fff" },
    grey: { default: "#e6e6e6" }
  },
  setup(e) {
    const a = e;
    function t(l, i, o) {
      if (typeof document > "u")
        return null;
      var d = document.createElement("canvas");
      d.width = d.height = o * 2;
      var s = d.getContext("2d");
      return s ? (s.fillStyle = l, s.fillRect(0, 0, d.width, d.height), s.fillStyle = i, s.fillRect(0, 0, o, o), s.translate(o, o), s.fillRect(0, 0, o, o), d.toDataURL()) : null;
    }
    function r(l, i, o) {
      return t(l, i, o);
    }
    const n = $(() => `url(${r(a.white, a.grey, a.size)})`);
    return (l, i) => (g(), _("div", {
      class: "vc-checkerboard",
      style: E({ backgroundImage: n.value })
    }, null, 4));
  }
}), ue = /* @__PURE__ */ V(yt, [["__scopeId", "data-v-fdde4c9e"]]), Ct = { class: "vc-alpha-slider" }, kt = { class: "checkerboard" }, wt = ["aria-valuenow"], xt = /* @__PURE__ */ T({
  __name: "AlphaSlider",
  props: {
    tinyColor: {},
    modelValue: {}
  },
  emits: U,
  setup(e, { emit: a }) {
    const n = K(e, a), l = $(() => {
      const c = n.value.toRgb(), C = [c.r, c.g, c.b].join(",");
      return "linear-gradient(to right, rgba(" + C + ", 0) 0%, rgba(" + C + ", 1) 100%)";
    }), i = $(() => n.value.getAlpha()), o = ge("container");
    function d(c, C = !1) {
      C || c.preventDefault();
      const b = o.value;
      if (!b)
        return;
      const S = b.clientWidth, { x: k } = _e(b), { x: m } = me(c), w = m - k;
      let R;
      w < 0 ? R = 0 : w > S ? R = 1 : R = Math.round(w * 100 / S) / 100, i.value !== R && (n.value = n.value.setAlpha(R).clone());
    }
    const s = ye(d);
    function h(c) {
      d(c, !0), window.addEventListener("mousemove", s), window.addEventListener("mouseup", v);
    }
    function v() {
      y();
    }
    function y() {
      window.removeEventListener("mousemove", s), window.removeEventListener("mouseup", v);
    }
    function M(c) {
      c.preventDefault();
      const C = de(c), b = i.value;
      let S;
      switch (C) {
        case "left": {
          S = b - 0.1 < 0 ? 0 : b - 0.1;
          break;
        }
        case "right": {
          S = b + 0.1 > 1 ? 1 : b + 0.1;
          break;
        }
      }
      typeof S < "u" && (n.value = n.value.setAlpha(S).clone());
    }
    return (c, C) => (g(), _("div", Ct, [
      u("div", kt, [
        x(ue)
      ]),
      u("div", {
        class: "gradient",
        style: E({ background: l.value })
      }, null, 4),
      u("div", {
        class: "slider",
        ref: "container",
        onMousedown: h,
        onTouchmove: d,
        onTouchstart: d,
        role: "slider",
        "aria-label": "Transparency",
        "aria-valuemax": "1",
        "aria-valuemin": "0",
        "aria-valuenow": i.value.toFixed(1),
        tabindex: "0",
        onKeydown: M
      }, [
        u("div", {
          class: "picker-wrap",
          style: E({ left: i.value * 100 + "%" })
        }, C[0] || (C[0] = [
          u("div", { class: "picker" }, null, -1)
        ]), 4)
      ], 40, wt)
    ]));
  }
}), Le = /* @__PURE__ */ V(xt, [["__scopeId", "data-v-f68b9fee"]]), At = { class: "vc-editable-input" }, Ft = ["value", "aria-label"], Mt = {
  key: 0,
  class: "vc-input-desc",
  "aria-hidden": "true"
}, St = /* @__PURE__ */ T({
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
    var s;
    const t = e, r = a, n = ((s = t.a11y) == null ? void 0 : s.label) ?? t.label, l = `input__label__${n}__${Math.random().toString().slice(2, 5)}`;
    function i(h) {
      if (t.max && +h > t.max) {
        r("change", t.max);
        return;
      }
      if (t.min && +h < t.min) {
        r("change", t.min);
        return;
      }
      r("change", h);
    }
    function o(h) {
      var v;
      i((v = h.target) == null ? void 0 : v.value);
    }
    function d(h) {
      let v = Number(t.value);
      if (!isNaN(v)) {
        let y = t.step;
        const M = vt(y), c = de(h);
        c === "up" && (i((v + y).toFixed(M)), h.preventDefault()), c === "down" && (i((v - y).toFixed(M)), h.preventDefault());
      }
    }
    return (h, v) => (g(), _("div", At, [
      u("input", {
        class: "vc-input-input",
        value: t.value,
        onKeydown: d,
        onInput: o,
        "aria-label": L(n),
        id: l
      }, null, 40, Ft),
      u("label", {
        for: l,
        class: "vc-input-label",
        "aria-hidden": "true"
      }, Y(t.label), 1),
      h.desc ? (g(), _("span", Mt, Y(h.desc), 1)) : D("", !0)
    ]));
  }
}), H = /* @__PURE__ */ V(St, [["__scopeId", "data-v-8d017502"]]);
function $t() {
  const e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return e.charAt(Math.floor(Math.random() * e.length)) + e.charAt(Math.floor(Math.random() * e.length));
}
const fe = (e) => {
  const a = ee(0), t = `__from__vc__hue__${$t()}`;
  return $e(e, (n) => {
    if (n[t])
      return;
    const l = n.toHsl().h;
    l === 0 && a.value !== 0 || (a.value = l);
  }, { immediate: !0 }), { hueRef: a, updateHueRef: (n) => {
    const l = f({
      ...e.value.toHsl(),
      h: n
    });
    l[t] = !0, e.value = l, a.value = n;
  } };
}, le = (e) => f(e).isValid(), Rt = (e) => f(e).getAlpha() === 0, Ht = { class: "saturation" }, Lt = { class: "body" }, Bt = { class: "controls" }, Et = { class: "color-wrap" }, Dt = ["aria-label"], Tt = { class: "sliders" }, Vt = { class: "hue-wrap" }, Pt = {
  key: 0,
  class: "alpha-wrap"
}, It = {
  key: 0,
  class: "fieldsWrap",
  "data-testid": "fields"
}, Nt = {
  key: 0,
  class: "fields"
}, Ot = { class: "field" }, Ut = { class: "field" }, Kt = { class: "field" }, Gt = {
  key: 0,
  class: "field"
}, zt = {
  key: 1,
  class: "fields"
}, Xt = { class: "field" }, jt = {
  key: 2,
  class: "fields"
}, Yt = { class: "field" }, qt = { class: "field" }, Wt = { class: "field" }, Zt = {
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
}, ta = /* @__PURE__ */ T({
  __name: "ChromePicker",
  props: {
    disableAlpha: { type: Boolean },
    disableFields: { type: Boolean },
    formats: { default: () => ["rgb", "hex", "hsl"] },
    tinyColor: {},
    modelValue: {}
  },
  emits: ["change"].concat(U),
  setup(e, { emit: a }) {
    const t = e, n = K(t, a), { hueRef: l, updateHueRef: i } = fe(n), o = ee(0);
    let d = ee(!1);
    const s = $(() => {
      const F = n.value.toRgb();
      return "rgba(" + [F.r, F.g, F.b, n.value.getAlpha()].join(",") + ")";
    }), h = $(() => {
      const { h: F, s: p, l: A } = n.value.toHsl();
      return {
        h: F.toFixed(),
        s: `${(p * 100).toFixed()}%`,
        l: `${(A * 100).toFixed()}%`
      };
    }), v = $(() => n.value.toRgb()), y = $(() => n.value.getAlpha()), M = /* @__PURE__ */ new Set(["hex", "hsl", "rgb"]), c = $(() => {
      const F = /* @__PURE__ */ new Set(), p = [], A = t.formats;
      for (const oe of A)
        if (M.has(oe)) {
          const te = oe;
          F.has(te) || (F.add(te), p.push(te));
        }
      return p;
    }), C = $(() => {
      const { disableFields: F, formats: p } = t;
      return !(F === !0 || !Array.isArray(p) || c.value.length === 0);
    }), b = (F) => c.value.includes(F), S = (F) => c.value.indexOf(F), k = (F) => {
      F && le(F) && (n.value = F);
    }, m = (F, p) => {
      if (!p || isNaN(Number(p)))
        return;
      const A = { [F]: p };
      n.value = {
        ...v.value,
        a: y.value,
        ...A
      };
    }, w = (F, p) => {
      if (!p)
        return;
      const A = { [F]: +p };
      (F === "s" || F === "l") && (A[F] = +p.replace("%", "") / 100), n.value = {
        ...n.value.toHsl(),
        a: y.value,
        ...A
      };
    }, R = () => {
      if (o.value === c.value.length - 1) {
        o.value = 0;
        return;
      }
      o.value++;
    }, j = () => {
      d.value = !0;
    }, z = () => {
      d.value = !1;
    };
    return (F, p) => (g(), _("div", {
      role: "application",
      "aria-label": "Chrome Color Picker",
      class: G(["vc-chrome-picker", F.disableAlpha ? "alpha-disabled" : ""])
    }, [
      u("div", Ht, [
        x(Ce, {
          tinyColor: L(n),
          "onUpdate:tinyColor": p[0] || (p[0] = (A) => ne(n) ? n.value = A : null),
          hue: L(l)
        }, null, 8, ["tinyColor", "hue"])
      ]),
      u("div", Lt, [
        u("div", Bt, [
          u("div", Et, [
            u("div", {
              class: "active-color",
              style: E({ backgroundColor: s.value }),
              role: "presentation",
              "aria-live": "polite",
              "aria-label": `Current color is ${s.value}`
            }, null, 12, Dt),
            t.disableAlpha ? D("", !0) : (g(), ie(ue, { key: 0 }))
          ]),
          u("div", Tt, [
            u("div", Vt, [
              x(re, {
                modelValue: L(l),
                "onUpdate:modelValue": L(i)
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ]),
            t.disableAlpha ? D("", !0) : (g(), _("div", Pt, [
              x(Le, {
                tinyColor: L(n),
                "onUpdate:tinyColor": p[1] || (p[1] = (A) => ne(n) ? n.value = A : null)
              }, null, 8, ["tinyColor"])
            ]))
          ])
        ]),
        C.value ? (g(), _("div", It, [
          b("rgb") ? W((g(), _("div", Nt, [
            u("div", Ot, [
              x(H, {
                label: "r",
                value: v.value.r,
                onChange: p[2] || (p[2] = (A) => m("r", A)),
                a11y: { label: "Red" }
              }, null, 8, ["value"])
            ]),
            u("div", Ut, [
              x(H, {
                label: "g",
                value: v.value.g,
                onChange: p[3] || (p[3] = (A) => m("g", A)),
                a11y: { label: "Green" }
              }, null, 8, ["value"])
            ]),
            u("div", Kt, [
              x(H, {
                label: "b",
                value: v.value.b,
                onChange: p[4] || (p[4] = (A) => m("b", A)),
                a11y: { label: "Blue" }
              }, null, 8, ["value"])
            ]),
            F.disableAlpha ? D("", !0) : (g(), _("div", Gt, [
              x(H, {
                label: "a",
                value: y.value,
                step: 0.01,
                max: 1,
                onChange: p[5] || (p[5] = (A) => m("a", A)),
                a11y: { label: "Transparency" }
              }, null, 8, ["value"])
            ]))
          ], 512)), [
            [Z, o.value === S("rgb")]
          ]) : D("", !0),
          b("hex") ? W((g(), _("div", zt, [
            u("div", Xt, [
              y.value === 1 ? (g(), ie(H, {
                key: 0,
                label: "hex",
                value: L(n).toHexString(),
                onChange: k,
                a11y: { label: "Hex" }
              }, null, 8, ["value"])) : D("", !0),
              y.value !== 1 ? (g(), ie(H, {
                key: 1,
                label: "hex",
                value: L(n).toHex8String(),
                onChange: k,
                a11y: { label: "Hex with transparency" }
              }, null, 8, ["value"])) : D("", !0)
            ])
          ], 512)), [
            [Z, o.value === S("hex")]
          ]) : D("", !0),
          b("hsl") ? W((g(), _("div", jt, [
            u("div", Yt, [
              x(H, {
                label: "h",
                value: L(l).toFixed(),
                onChange: p[6] || (p[6] = (A) => w("h", A)),
                a11y: { label: "Hue" }
              }, null, 8, ["value"])
            ]),
            u("div", qt, [
              x(H, {
                label: "s",
                value: h.value.s,
                onChange: p[7] || (p[7] = (A) => w("s", A)),
                a11y: { label: "Saturation" }
              }, null, 8, ["value"])
            ]),
            u("div", Wt, [
              x(H, {
                label: "l",
                value: h.value.l,
                onChange: p[8] || (p[8] = (A) => w("l", A)),
                a11y: { label: "Lightness" }
              }, null, 8, ["value"])
            ]),
            F.disableAlpha ? D("", !0) : (g(), _("div", Zt, [
              x(H, {
                label: "a",
                value: y.value,
                step: 0.01,
                max: 1,
                onChange: p[9] || (p[9] = (A) => w("a", A)),
                a11y: { label: "Transparency" }
              }, null, 8, ["value"])
            ]))
          ], 512)), [
            [Z, o.value === S("hsl")]
          ]) : D("", !0),
          c.value.length > 1 ? (g(), _("div", {
            key: 3,
            class: "toggle-btn",
            onClick: R,
            onKeydown: [
              I(R, ["enter"]),
              I(R, ["space"])
            ],
            onMouseover: j,
            onMouseenter: j,
            onMouseout: z,
            onFocus: j,
            onBlur: z,
            role: "button",
            "aria-label": "Change color format",
            tabindex: "0"
          }, [
            u("div", Jt, [
              (g(), _("svg", Qt, p[10] || (p[10] = [
                u("path", {
                  fill: "#333",
                  d: "M12,18.17L8.83,15L7.42,16.41L12,21L16.59,16.41L15.17,15M12,5.83L15.17,9L16.58,7.59L12,3L7.41,7.59L8.83,9L12,5.83Z"
                }, null, -1)
              ])))
            ]),
            W(u("div", ea, null, 512), [
              [Z, L(d)]
            ])
          ], 32)) : D("", !0)
        ])) : D("", !0)
      ])
    ], 2));
  }
}), jn = /* @__PURE__ */ V(ta, [["__scopeId", "data-v-91126d98"]]), aa = {
  class: "vc-compact-picker",
  role: "application",
  "aria-label": "Compact color picker",
  tabindex: "0"
}, na = {
  class: "colors",
  role: "listbox",
  "aria-label": "Pick a color"
}, ra = ["onClick", "aria-label", "aria-selected", "title", "onKeydown"], la = { class: "dot" }, oa = [
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
], ia = /* @__PURE__ */ T({
  __name: "CompactPicker",
  props: {
    palette: { default: () => oa },
    tinyColor: {},
    modelValue: {}
  },
  emits: ["change"].concat(U),
  setup(e, { emit: a }) {
    const t = e, n = K(t, a), l = $(() => n.value.toHexString().toUpperCase()), i = (o) => {
      n.value = o;
    };
    return (o, d) => (g(), _("div", aa, [
      u("ul", na, [
        (g(!0), _(q, null, J(t.palette, (s) => (g(), _("li", {
          key: s,
          class: G({ "color-item_white": s === "#FFFFFF", "color-item": !0 }),
          style: E({ background: s }),
          onClick: (h) => i(s),
          role: "option",
          "aria-label": "color:" + s,
          "aria-selected": s.toUpperCase() === l.value,
          title: s,
          onKeydown: I((h) => i(s), ["space"]),
          tabindex: "0"
        }, [
          W(u("div", la, null, 512), [
            [Z, s.toUpperCase() === l.value]
          ])
        ], 46, ra))), 128))
      ])
    ]));
  }
}), Yn = /* @__PURE__ */ V(ia, [["__scopeId", "data-v-fc853a8b"]]), sa = {
  role: "application",
  "aria-label": "Grayscale color picker",
  class: "vc-grayscale-picker"
}, ua = {
  class: "colors",
  role: "listbox",
  "aria-label": "Select a grayscale color",
  tabindex: "0"
}, ca = ["onClick", "aria-label", "aria-selected", "title", "onKeydown"], da = { class: "dot" }, fa = [
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
], ha = /* @__PURE__ */ T({
  __name: "GrayscalePicker",
  props: {
    palette: { default: () => fa },
    tinyColor: {},
    modelValue: {}
  },
  emits: ["change"].concat(U),
  setup(e, { emit: a }) {
    const n = K(e, a), l = $(() => n.value.toHexString().toUpperCase()), i = (o) => {
      n.value = o;
    };
    return (o, d) => (g(), _("div", sa, [
      u("ul", ua, [
        (g(!0), _(q, null, J(o.palette, (s) => (g(), _("li", {
          key: s,
          class: G({ "color-item_white": s === "#FFFFFF", "color-item": !0 }),
          style: E({ background: s }),
          onClick: (h) => i(s),
          role: "option",
          "aria-label": "color:" + s,
          "aria-selected": s.toUpperCase() === l.value,
          title: s,
          onKeydown: I((h) => i(s), ["space"]),
          tabindex: "0"
        }, [
          W(u("div", da, null, 512), [
            [Z, s.toUpperCase() === l.value]
          ])
        ], 46, ca))), 128))
      ])
    ]));
  }
}), qn = /* @__PURE__ */ V(ha, [["__scopeId", "data-v-820cfd7b"]]), va = {
  role: "application",
  "aria-label": "Material color inputs",
  class: "vc-material-picker"
}, ba = { class: "rgb" }, pa = { class: "color" }, ga = { class: "color" }, ma = { class: "color" }, _a = /* @__PURE__ */ T({
  __name: "MaterialPicker",
  props: {
    tinyColor: {},
    modelValue: {}
  },
  emits: U,
  setup(e, { emit: a }) {
    const n = K(e, a), l = $(() => n.value.toRgb());
    function i(d) {
      le(d) && (n.value = d);
    }
    function o(d, s) {
      n.value = {
        ...l.value,
        [d]: s
      };
    }
    return (d, s) => (g(), _("div", va, [
      x(H, {
        class: "hex",
        label: "hex",
        value: L(n).toHexString(),
        style: E({ borderColor: L(n).toHexString() }),
        onChange: i,
        a11y: { label: "Hex" }
      }, null, 8, ["value", "style"]),
      u("div", ba, [
        u("div", pa, [
          x(H, {
            label: "r",
            value: l.value.r,
            onChange: s[0] || (s[0] = (h) => o("r", h)),
            a11y: { label: "Red" }
          }, null, 8, ["value"])
        ]),
        u("div", ga, [
          x(H, {
            label: "g",
            value: l.value.g,
            onChange: s[1] || (s[1] = (h) => o("g", h)),
            a11y: { label: "Green" }
          }, null, 8, ["value"])
        ]),
        u("div", ma, [
          x(H, {
            label: "b",
            value: l.value.b,
            onChange: s[2] || (s[2] = (h) => o("b", h)),
            a11y: { label: "Blue" }
          }, null, 8, ["value"])
        ])
      ])
    ]));
  }
}), Wn = /* @__PURE__ */ V(_a, [["__scopeId", "data-v-ff0c745b"]]), ya = {
  class: "title",
  "aria-hidden": "true"
}, Ca = { class: "body" }, ka = { class: "saturation" }, wa = { class: "hue" }, xa = { class: "preview" }, Aa = {
  class: "preview-label",
  "aria-hidden": "true"
}, Fa = { class: "preview-swatches" }, Ma = ["aria-label"], Sa = ["aria-label"], $a = {
  class: "preview-label",
  "aria-hidden": "true"
}, Ra = {
  key: 0,
  class: "actions"
}, Ha = ["aria-label"], La = { class: "fields" }, Ba = ["aria-label"], Ea = /* @__PURE__ */ T({
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
  emits: U.concat(["ok", "cancel", "reset"]),
  setup(e, { emit: a }) {
    const t = e, r = a, n = K(t, r), { hueRef: l, updateHueRef: i } = fe(n), o = ee(t.currentColor), d = $(() => n.value.toHsv()), s = $(() => {
      const k = n.value.toHexString();
      return k && k.replace("#", "");
    }), h = $(() => n.value.toRgb()), v = () => {
      n.value = o.value;
    }, y = (k) => {
      k && le(k) && (n.value = k);
    }, M = (k, m) => {
      if (!m || isNaN(Number(m)))
        return;
      const w = { [k]: m };
      n.value = {
        ...h.value,
        ...w
      };
    }, c = (k, m) => {
      if (!m || isNaN(Number(m)))
        return;
      const w = { [k]: Number(m) };
      n.value = {
        ...d.value,
        ...w
      };
    }, C = () => {
      r("ok");
    }, b = () => {
      r("cancel");
    }, S = () => {
      r("reset");
    };
    return (k, m) => (g(), _("div", {
      role: "application",
      "aria-label": "PhotoShop color picker",
      class: G(["vc-photoshop-picker", k.disableFields ? "fields_disabled" : ""])
    }, [
      u("div", ya, Y(k.title), 1),
      u("div", Ca, [
        u("div", ka, [
          x(Ce, {
            tinyColor: L(n),
            "onUpdate:tinyColor": m[0] || (m[0] = (w) => ne(n) ? n.value = w : null),
            hue: L(l)
          }, null, 8, ["tinyColor", "hue"])
        ]),
        u("div", wa, [
          x(re, {
            direction: "vertical",
            modelValue: L(l),
            "onUpdate:modelValue": L(i)
          }, {
            default: Pe(() => m[7] || (m[7] = [
              u("div", { class: "hue-picker" }, [
                u("i", { class: "hue-picker-left" }),
                u("i", { class: "hue-picker-right" })
              ], -1)
            ])),
            _: 1
          }, 8, ["modelValue", "onUpdate:modelValue"])
        ]),
        u("div", {
          class: G(["controls", k.disableFields ? "controls_fields_disabled" : ""])
        }, [
          u("div", xa, [
            u("div", Aa, Y(k.newLabel), 1),
            u("div", Fa, [
              u("div", {
                class: "preview-color",
                "aria-label": `New color is #${s.value}`,
                style: E({ background: `#${s.value}` })
              }, null, 12, Ma),
              u("div", {
                class: "preview-color",
                style: E({ background: o.value }),
                onClick: v,
                role: "button",
                "aria-label": `Current color is ${o.value}`,
                onKeydown: I(v, ["space"]),
                tabindex: "0"
              }, null, 44, Sa)
            ]),
            u("div", $a, Y(k.currentLabel), 1)
          ]),
          k.disableFields ? D("", !0) : (g(), _("div", Ra, [
            u("div", {
              class: "action-btn",
              role: "button",
              "aria-label": "Click to apply new color",
              onClick: C,
              onKeydown: I(v, ["space"]),
              tabindex: "0"
            }, Y(k.okLabel), 33),
            u("div", {
              class: "action-btn",
              role: "button",
              "aria-label": k.cancelLabel,
              onClick: b,
              onKeydown: I(v, ["space"]),
              tabindex: "0"
            }, Y(k.cancelLabel), 41, Ha),
            u("div", La, [
              x(H, {
                label: "h",
                desc: "°",
                value: d.value.h.toFixed(),
                onChange: m[1] || (m[1] = (w) => c("h", w)),
                a11y: { label: "Hue" }
              }, null, 8, ["value"]),
              x(H, {
                label: "s",
                desc: "%",
                value: (d.value.s * 100).toFixed(),
                min: 0,
                max: 100,
                onChange: m[2] || (m[2] = (w) => c("s", w)),
                a11y: { label: "Saturation" }
              }, null, 8, ["value"]),
              x(H, {
                label: "v",
                desc: "%",
                value: (d.value.v * 100).toFixed(),
                min: 0,
                max: 100,
                onChange: m[3] || (m[3] = (w) => c("v", w)),
                a11y: { label: "Value" }
              }, null, 8, ["value"]),
              m[8] || (m[8] = u("div", { class: "fields-divider" }, null, -1)),
              x(H, {
                label: "r",
                value: h.value.r,
                onChange: m[4] || (m[4] = (w) => M("r", w)),
                a11y: { label: "Red" }
              }, null, 8, ["value"]),
              x(H, {
                label: "g",
                value: h.value.g,
                onChange: m[5] || (m[5] = (w) => M("g", w)),
                a11y: { label: "Green" }
              }, null, 8, ["value"]),
              x(H, {
                label: "b",
                value: h.value.b,
                onChange: m[6] || (m[6] = (w) => M("b", w)),
                a11y: { label: "Blue" }
              }, null, 8, ["value"]),
              m[9] || (m[9] = u("div", { class: "fields-divider" }, null, -1)),
              x(H, {
                label: "#",
                class: "hex",
                value: s.value,
                onChange: y,
                a11y: { label: "Hex" }
              }, null, 8, ["value"])
            ]),
            k.hasResetButton ? (g(), _("div", {
              key: 0,
              class: "action-btn",
              onClick: S,
              role: "button",
              "aria-label": k.resetLabel,
              onKeydown: I(S, ["space"]),
              tabindex: "0"
            }, Y(k.resetLabel), 41, Ba)) : D("", !0)
          ]))
        ], 2)
      ])
    ], 2));
  }
}), Zn = /* @__PURE__ */ V(Ea, [["__scopeId", "data-v-deacf994"]]), Da = { class: "saturation" }, Ta = { class: "controls" }, Va = { class: "sliders" }, Pa = { class: "hue" }, Ia = {
  key: 0,
  class: "alpha"
}, Na = { class: "color" }, Oa = ["aria-label"], Ua = {
  key: 0,
  class: "field"
}, Ka = { class: "field_double" }, Ga = { class: "field_single" }, za = { class: "field_single" }, Xa = { class: "field_single" }, ja = {
  key: 0,
  class: "field_single"
}, Ya = {
  class: "presets",
  role: "listbox",
  "aria-label": "A color preset, pick one to set as current color"
}, qa = ["onClick", "title", "aria-label", "aria-selected", "onKeydown"], Wa = ["onClick", "aria-selected", "title", "onKeydown"], Za = [
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
], Ja = /* @__PURE__ */ T({
  __name: "SketchPicker",
  props: {
    presetColors: { default: () => Za },
    disableAlpha: { type: Boolean, default: !1 },
    disableFields: { type: Boolean, default: !1 },
    tinyColor: {},
    modelValue: {}
  },
  emits: ["change"].concat(U),
  setup(e, { emit: a }) {
    const t = e, n = K(t, a), { hueRef: l, updateHueRef: i } = fe(n), o = $(() => n.value.getAlpha()), d = $(() => {
      let c;
      return o.value < 1 ? c = n.value.toHex8String() : c = n.value.toHexString(), c.replace("#", "");
    }), s = $(() => n.value.toRgb()), h = (c) => {
      c && le(c) && (n.value = c);
    }, v = (c, C) => {
      if (!C || isNaN(Number(C)))
        return;
      const b = { [c]: C };
      n.value = {
        ...s.value,
        ...b
      };
    }, y = (c) => {
      !c || isNaN(Number(c)) || (n.value = n.value.setAlpha(c).clone());
    }, M = (c) => {
      n.value = c;
    };
    return (c, C) => (g(), _("div", {
      role: "application",
      "aria-label": "Sketch color picker",
      class: G(["vc-sketch-picker", c.disableAlpha ? "alpha-disabled" : ""])
    }, [
      u("div", Da, [
        x(Ce, {
          hue: L(l),
          tinyColor: L(n),
          "onUpdate:tinyColor": C[0] || (C[0] = (b) => ne(n) ? n.value = b : null)
        }, null, 8, ["hue", "tinyColor"])
      ]),
      u("div", Ta, [
        u("div", Va, [
          u("div", Pa, [
            x(re, {
              modelValue: L(l),
              "onUpdate:modelValue": L(i)
            }, null, 8, ["modelValue", "onUpdate:modelValue"])
          ]),
          c.disableAlpha ? D("", !0) : (g(), _("div", Ia, [
            x(Le, {
              tinyColor: L(n),
              "onUpdate:tinyColor": C[1] || (C[1] = (b) => ne(n) ? n.value = b : null)
            }, null, 8, ["tinyColor"])
          ]))
        ]),
        u("div", Na, [
          u("div", {
            "aria-label": `Current color is ${L(n).toRgbString()}`,
            class: "active-color",
            style: E({ background: L(n).toRgbString() })
          }, null, 12, Oa),
          x(ue)
        ])
      ]),
      c.disableFields ? D("", !0) : (g(), _("div", Ua, [
        u("div", Ka, [
          x(H, {
            label: "hex",
            value: d.value,
            onChange: h,
            a11y: { label: "Hex" }
          }, null, 8, ["value"])
        ]),
        u("div", Ga, [
          x(H, {
            label: "r",
            value: s.value.r,
            onChange: C[2] || (C[2] = (b) => v("r", b)),
            a11y: { label: "Red" }
          }, null, 8, ["value"])
        ]),
        u("div", za, [
          x(H, {
            label: "g",
            value: s.value.g,
            onChange: C[3] || (C[3] = (b) => v("g", b)),
            a11y: { label: "Green" }
          }, null, 8, ["value"])
        ]),
        u("div", Xa, [
          x(H, {
            label: "b",
            value: s.value.b,
            onChange: C[4] || (C[4] = (b) => v("b", b)),
            a11y: { label: "Blue" }
          }, null, 8, ["value"])
        ]),
        c.disableAlpha ? D("", !0) : (g(), _("div", ja, [
          x(H, {
            label: "a",
            value: o.value,
            step: 0.01,
            max: 1,
            onChange: y,
            a11y: { label: "Transparency" }
          }, null, 8, ["value"])
        ]))
      ])),
      u("div", Ya, [
        (g(!0), _(q, null, J(t.presetColors, (b) => (g(), _(q, null, [
          L(Rt)(b) ? (g(), _("div", {
            key: b,
            class: "preset-color",
            onClick: (S) => M(b),
            "aria-label": "Color: transparency",
            "aria-selected": o.value === 0,
            role: "option",
            tabindex: "0",
            title: b,
            onKeydown: I((S) => M(b), ["space"])
          }, [
            x(ue)
          ], 40, Wa)) : (g(), _("div", {
            class: "preset-color",
            key: b + "-color",
            style: E({ background: b }),
            onClick: (S) => M(b),
            title: b,
            "aria-label": "Color:" + b,
            "aria-selected": `#${d.value.toLowerCase()}` === b.toLowerCase(),
            role: "option",
            tabindex: "0",
            onKeydown: I((S) => M(b), ["space"])
          }, null, 44, qa))
        ], 64))), 256))
      ])
    ], 2));
  }
}), Jn = /* @__PURE__ */ V(Ja, [["__scopeId", "data-v-5787d49f"]]), Qa = {
  role: "application",
  "aria-label": "Slider color picker",
  class: "vc-slider-picker"
}, en = { class: "hue" }, tn = {
  class: "swatches",
  role: "listbox",
  "aria-label": "Color segments in different shades of one color",
  tabindex: "0"
}, an = ["onClick", "aria-label", "title", "onKeydown", "aria-selected"], Q = 0.5, nn = [
  { s: Q, l: 0.8 },
  { s: Q, l: 0.65 },
  { s: Q, l: 0.5 },
  { s: Q, l: 0.35 },
  { s: Q, l: 0.2 }
], rn = /* @__PURE__ */ T({
  __name: "SliderPicker",
  props: {
    tinyColor: {},
    modelValue: {},
    swatches: { default: () => nn }
  },
  emits: U,
  setup(e, { emit: a }) {
    const t = e, n = K(t, a), { hueRef: l, updateHueRef: i } = fe(n), o = $(() => n.value.toHsl()), d = $(() => n.value.toHexString()), s = $(() => t.swatches.map((M) => typeof M == "string" ? {
      s: Q,
      l: Number(M)
    } : M)), h = (y) => o.value.l === 1 && y.l === 1 || o.value.l === 0 && y.l === 0 ? !0 : Math.abs(o.value.l - y.l) < 0.01 && Math.abs(o.value.s - y.s) < 0.01, v = (y) => {
      n.value = {
        h: o.value.h,
        s: y.s,
        l: y.l
      };
    };
    return (y, M) => (g(), _("div", Qa, [
      u("div", en, [
        x(re, {
          modelValue: L(l),
          "onUpdate:modelValue": L(i)
        }, null, 8, ["modelValue", "onUpdate:modelValue"])
      ]),
      u("div", tn, [
        (g(!0), _(q, null, J(s.value, (c, C) => (g(), _("div", {
          class: "swatch",
          key: C,
          "data-index": "index",
          onClick: (b) => v(c),
          role: "option",
          "aria-label": "Color:" + d.value,
          title: d.value,
          onKeydown: I((b) => v(c), ["space"]),
          "aria-selected": h(c),
          tabindex: "0"
        }, [
          u("div", {
            class: G({
              picker: !0,
              picker_active: h(c),
              picker_white: c.l === 1
            }),
            style: E({ background: "hsl(" + o.value.h + ", " + c.s * 100 + "%, " + c.l * 100 + "%)" })
          }, null, 6)
        ], 40, an))), 128))
      ])
    ]));
  }
}), Qn = /* @__PURE__ */ V(rn, [["__scopeId", "data-v-bfef2f82"]]);
var ln = { 50: "#ffebee", 100: "#ffcdd2", 200: "#ef9a9a", 300: "#e57373", 400: "#ef5350", 500: "#f44336", 600: "#e53935", 700: "#d32f2f", 800: "#c62828", 900: "#b71c1c", a100: "#ff8a80", a200: "#ff5252", a400: "#ff1744", a700: "#d50000" }, on = { 50: "#fce4ec", 100: "#f8bbd0", 200: "#f48fb1", 300: "#f06292", 400: "#ec407a", 500: "#e91e63", 600: "#d81b60", 700: "#c2185b", 800: "#ad1457", 900: "#880e4f", a100: "#ff80ab", a200: "#ff4081", a400: "#f50057", a700: "#c51162" }, sn = { 50: "#f3e5f5", 100: "#e1bee7", 200: "#ce93d8", 300: "#ba68c8", 400: "#ab47bc", 500: "#9c27b0", 600: "#8e24aa", 700: "#7b1fa2", 800: "#6a1b9a", 900: "#4a148c", a100: "#ea80fc", a200: "#e040fb", a400: "#d500f9", a700: "#aa00ff" }, un = { 50: "#ede7f6", 100: "#d1c4e9", 200: "#b39ddb", 300: "#9575cd", 400: "#7e57c2", 500: "#673ab7", 600: "#5e35b1", 700: "#512da8", 800: "#4527a0", 900: "#311b92", a100: "#b388ff", a200: "#7c4dff", a400: "#651fff", a700: "#6200ea" }, cn = { 50: "#e8eaf6", 100: "#c5cae9", 200: "#9fa8da", 300: "#7986cb", 400: "#5c6bc0", 500: "#3f51b5", 600: "#3949ab", 700: "#303f9f", 800: "#283593", 900: "#1a237e", a100: "#8c9eff", a200: "#536dfe", a400: "#3d5afe", a700: "#304ffe" }, dn = { 50: "#e3f2fd", 100: "#bbdefb", 200: "#90caf9", 300: "#64b5f6", 400: "#42a5f5", 500: "#2196f3", 600: "#1e88e5", 700: "#1976d2", 800: "#1565c0", 900: "#0d47a1", a100: "#82b1ff", a200: "#448aff", a400: "#2979ff", a700: "#2962ff" }, fn = { 50: "#e1f5fe", 100: "#b3e5fc", 200: "#81d4fa", 300: "#4fc3f7", 400: "#29b6f6", 500: "#03a9f4", 600: "#039be5", 700: "#0288d1", 800: "#0277bd", 900: "#01579b", a100: "#80d8ff", a200: "#40c4ff", a400: "#00b0ff", a700: "#0091ea" }, hn = { 50: "#e0f7fa", 100: "#b2ebf2", 200: "#80deea", 300: "#4dd0e1", 400: "#26c6da", 500: "#00bcd4", 600: "#00acc1", 700: "#0097a7", 800: "#00838f", 900: "#006064", a100: "#84ffff", a200: "#18ffff", a400: "#00e5ff", a700: "#00b8d4" }, vn = { 50: "#e0f2f1", 100: "#b2dfdb", 200: "#80cbc4", 300: "#4db6ac", 400: "#26a69a", 500: "#009688", 600: "#00897b", 700: "#00796b", 800: "#00695c", 900: "#004d40", a100: "#a7ffeb", a200: "#64ffda", a400: "#1de9b6", a700: "#00bfa5" }, bn = { 50: "#e8f5e9", 100: "#c8e6c9", 200: "#a5d6a7", 300: "#81c784", 400: "#66bb6a", 500: "#4caf50", 600: "#43a047", 700: "#388e3c", 800: "#2e7d32", 900: "#1b5e20", a100: "#b9f6ca", a200: "#69f0ae", a400: "#00e676", a700: "#00c853" }, pn = { 50: "#f1f8e9", 100: "#dcedc8", 200: "#c5e1a5", 300: "#aed581", 400: "#9ccc65", 500: "#8bc34a", 600: "#7cb342", 700: "#689f38", 800: "#558b2f", 900: "#33691e", a100: "#ccff90", a200: "#b2ff59", a400: "#76ff03", a700: "#64dd17" }, gn = { 50: "#f9fbe7", 100: "#f0f4c3", 200: "#e6ee9c", 300: "#dce775", 400: "#d4e157", 500: "#cddc39", 600: "#c0ca33", 700: "#afb42b", 800: "#9e9d24", 900: "#827717", a100: "#f4ff81", a200: "#eeff41", a400: "#c6ff00", a700: "#aeea00" }, mn = { 50: "#fffde7", 100: "#fff9c4", 200: "#fff59d", 300: "#fff176", 400: "#ffee58", 500: "#ffeb3b", 600: "#fdd835", 700: "#fbc02d", 800: "#f9a825", 900: "#f57f17", a100: "#ffff8d", a200: "#ffff00", a400: "#ffea00", a700: "#ffd600" }, _n = { 50: "#fff8e1", 100: "#ffecb3", 200: "#ffe082", 300: "#ffd54f", 400: "#ffca28", 500: "#ffc107", 600: "#ffb300", 700: "#ffa000", 800: "#ff8f00", 900: "#ff6f00", a100: "#ffe57f", a200: "#ffd740", a400: "#ffc400", a700: "#ffab00" }, yn = { 50: "#fff3e0", 100: "#ffe0b2", 200: "#ffcc80", 300: "#ffb74d", 400: "#ffa726", 500: "#ff9800", 600: "#fb8c00", 700: "#f57c00", 800: "#ef6c00", 900: "#e65100", a100: "#ffd180", a200: "#ffab40", a400: "#ff9100", a700: "#ff6d00" }, Cn = { 50: "#fbe9e7", 100: "#ffccbc", 200: "#ffab91", 300: "#ff8a65", 400: "#ff7043", 500: "#ff5722", 600: "#f4511e", 700: "#e64a19", 800: "#d84315", 900: "#bf360c", a100: "#ff9e80", a200: "#ff6e40", a400: "#ff3d00", a700: "#dd2c00" }, kn = { 50: "#efebe9", 100: "#d7ccc8", 200: "#bcaaa4", 300: "#a1887f", 400: "#8d6e63", 500: "#795548", 600: "#6d4c41", 700: "#5d4037", 800: "#4e342e", 900: "#3e2723" }, wn = { 50: "#fafafa", 100: "#f5f5f5", 200: "#eeeeee", 300: "#e0e0e0", 400: "#bdbdbd", 500: "#9e9e9e", 600: "#757575", 700: "#616161", 800: "#424242", 900: "#212121" }, xn = { 50: "#eceff1", 100: "#cfd8dc", 200: "#b0bec5", 300: "#90a4ae", 400: "#78909c", 500: "#607d8b", 600: "#546e7a", 700: "#455a64", 800: "#37474f", 900: "#263238" }, An = { primary: "rgba(0, 0, 0, 0.87)", secondary: "rgba(0, 0, 0, 0.54)", disabled: "rgba(0, 0, 0, 0.38)", dividers: "rgba(0, 0, 0, 0.12)" }, Fn = { primary: "rgba(255, 255, 255, 1)", secondary: "rgba(255, 255, 255, 0.7)", disabled: "rgba(255, 255, 255, 0.5)", dividers: "rgba(255, 255, 255, 0.12)" }, Mn = { active: "rgba(0, 0, 0, 0.54)", inactive: "rgba(0, 0, 0, 0.38)" }, Sn = { active: "rgba(255, 255, 255, 1)", inactive: "rgba(255, 255, 255, 0.5)" }, $n = "#ffffff", Rn = "#000000";
const Hn = {
  red: ln,
  pink: on,
  purple: sn,
  deepPurple: un,
  indigo: cn,
  blue: dn,
  lightBlue: fn,
  cyan: hn,
  teal: vn,
  green: bn,
  lightGreen: pn,
  lime: gn,
  yellow: mn,
  amber: _n,
  orange: yn,
  deepOrange: Cn,
  brown: kn,
  grey: wn,
  blueGrey: xn,
  darkText: An,
  lightText: Fn,
  darkIcons: Mn,
  lightIcons: Sn,
  white: $n,
  black: Rn
}, Ln = ["data-pick"], Bn = {
  class: "box",
  role: "listbox",
  "aria-label": "Pick a color",
  tabindex: "0"
}, En = ["data-color", "onClick", "aria-label", "aria-selected", "title", "onKeydown"], Dn = { class: "picker" }, Tn = {
  style: { width: "24px", height: "24px" },
  viewBox: "0 0 24 24"
}, Vn = [
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
], Pn = ["900", "700", "500", "300", "100"], In = /* @__PURE__ */ (() => {
  const e = [];
  return Vn.forEach((a) => {
    let t = [];
    a.toLowerCase() === "black" || a.toLowerCase() === "white" ? t = t.concat(["#000000", "#FFFFFF"]) : Pn.forEach((r) => {
      const n = Hn[a][r];
      t.push(n.toUpperCase());
    }), e.push(t);
  }), e;
})(), Nn = /* @__PURE__ */ T({
  __name: "SwatchesPicker",
  props: {
    tinyColor: {},
    modelValue: {},
    palette: { default: () => In }
  },
  emits: U,
  setup(e, { emit: a }) {
    const n = K(e, a), l = $(() => n.value.toHexString()), i = (d) => d.toLowerCase() === l.value.toLowerCase(), o = (d) => {
      n.value = d;
    };
    return (d, s) => (g(), _("div", {
      role: "application",
      "aria-label": "Swatches color picker",
      class: "vc-swatches-picker",
      "data-pick": l.value
    }, [
      u("div", Bn, [
        (g(!0), _(q, null, J(d.palette, (h, v) => (g(), _("div", {
          class: "colorGroup",
          key: v
        }, [
          (g(!0), _(q, null, J(h, (y) => (g(), _("div", {
            class: G(["color", { color_white: y === "#FFFFFF" }]),
            key: y,
            "data-color": y,
            style: E({ background: y }),
            onClick: (M) => o(y),
            role: "option",
            "aria-label": "Color:" + y,
            "aria-selected": i(y),
            title: y,
            onKeydown: I((M) => o(y), ["space"]),
            tabindex: "0"
          }, [
            W(u("div", Dn, [
              (g(), _("svg", Tn, s[0] || (s[0] = [
                u("path", { d: "M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" }, null, -1)
              ])))
            ], 512), [
              [Z, i(y)]
            ])
          ], 46, En))), 128))
        ]))), 128))
      ])
    ], 8, Ln));
  }
}), er = /* @__PURE__ */ V(Nn, [["__scopeId", "data-v-b183e282"]]), On = {
  class: "body",
  role: "listbox",
  tabindex: "0",
  "aria-label": "Select a color"
}, Un = ["onClick", "aria-label", "title", "aria-selected", "onKeydown"], Kn = [
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
], Gn = /* @__PURE__ */ T({
  __name: "TwitterPicker",
  props: {
    tinyColor: {},
    modelValue: {},
    width: { default: 276 },
    presetColors: { default: () => Kn },
    triangle: { default: "top-left" }
  },
  emits: U,
  setup(e, { emit: a }) {
    const t = e, n = K(t, a), l = $(() => n.value.toHexString()), i = (s) => s.toLowerCase() === l.value.toLowerCase(), o = (s) => {
      n.value = s;
    }, d = (s) => {
      le(s) && (n.value = s);
    };
    return (s, h) => (g(), _("div", {
      class: G(["vc-twitter-picker", {
        tri_hide: t.triangle === "hide",
        tri_top_left: t.triangle === "top-left",
        tri_top_right: t.triangle === "top-right"
      }]),
      style: E({
        width: typeof t.width == "number" ? `${t.width}px` : t.width
      }),
      role: "application",
      "aria-label": "Twitter color picker"
    }, [
      h[2] || (h[2] = u("div", { class: "triangle_shadow" }, null, -1)),
      h[3] || (h[3] = u("div", { class: "triangle" }, null, -1)),
      u("div", On, [
        (g(!0), _(q, null, J(s.presetColors, (v, y) => (g(), _("span", {
          key: y,
          class: "swatch",
          style: E({
            background: v,
            boxShadow: `0 0 4px ${i(v) ? v : "transparent"}`
          }),
          onClick: (M) => o(v),
          role: "option",
          "aria-label": "color:" + v,
          title: v,
          "aria-selected": i(v),
          onKeydown: I((M) => o(v), ["space"]),
          tabindex: "0"
        }, null, 44, Un))), 128)),
        h[0] || (h[0] = u("div", {
          class: "hash",
          "aria-hidden": "true"
        }, "#", -1)),
        x(H, {
          value: l.value.replace("#", ""),
          onChange: d,
          a11y: { label: "Hex" }
        }, null, 8, ["value"]),
        h[1] || (h[1] = u("div", { class: "clear" }, null, -1))
      ])
    ], 6));
  }
}), tr = /* @__PURE__ */ V(Gn, [["__scopeId", "data-v-b479e6eb"]]), zn = /* @__PURE__ */ T({
  __name: "HueSlider",
  setup(e) {
    Ie((r) => ({
      "2528e268": t.value
    }));
    const a = Ne(), t = $(() => `hsl(${a.modelValue ?? 0}, 100%, 50%)`);
    return (r, n) => (g(), ie(re, Oe(r.$attrs, {
      class: ["vc-hue-wrap", r.$attrs.class]
    }), null, 16, ["class"]));
  }
}), ar = /* @__PURE__ */ V(zn, [["__scopeId", "data-v-df5ea521"]]);
export {
  Le as AlphaSlider,
  jn as ChromePicker,
  Yn as CompactPicker,
  qn as GrayscalePicker,
  ar as HueSlider,
  Wn as MaterialPicker,
  Zn as PhotoshopPicker,
  Jn as SketchPicker,
  Qn as SliderPicker,
  er as SwatchesPicker,
  tr as TwitterPicker
};
