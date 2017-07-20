/*
Copyright 2014, modulex-color@1.0.2
MIT Licensed
build time: Thu, 16 Oct 2014 04:11:23 GMT
*/
modulex.add("color", [], function(require, exports, module) {

/*
combined modules:
color
*/
var color;
color = function (exports) {
  /**
   * Color For KISSY.
   * @ignore
   * @author yiminghe@gmail.com
   */
  var rgbaRe = /\s*rgba?\s*\(\s*([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\s*(?:,\s*([\d\.]+))?\)\s*/, hexRe = /\s*#([0-9a-fA-F][0-9a-fA-F]?)([0-9a-fA-F][0-9a-fA-F]?)([0-9a-fA-F][0-9a-fA-F]?)\s*/;
  exports = Color;
  function mix(r, s) {
    for (var p in s) {
      r[p] = s[p];
    }
  }
  function each(arr, fn) {
    for (var i = 0, l = arr.length; i < l; i++) {
      if (fn(arr[i]) === false) {
        break;
      }
    }
  }
  function Color(arr) {
    mix(this, arr);
  }
  /**
   * Color for KISSY to normalize HSL, HSV, RGB and HEX.
   * @class KISSY.Color
   */
  Color.prototype = {
    constructor: Color,
    getR: function () {
      return Math.round(this.r);
    },
    getG: function () {
      return Math.round(this.g);
    },
    getB: function () {
      return Math.round(this.b);
    },
    getA: function () {
      return this.a;
    },
    /**
     * To hsl string format
     * @return {String}
     */
    toHSL: function () {
      var hsl = this.getHSL();
      return 'hsl(' + Math.round(hsl.h || 0) + ', ' + percentage(hsl.s) + ', ' + percentage(hsl.l) + ')';
    },
    /**
     * To hsla string format
     * @return {String}
     */
    toHSLA: function () {
      var hsl = this.getHSL();
      return 'hsla(' + Math.round(hsl.h || 0) + ', ' + percentage(hsl.s) + ', ' + percentage(hsl.l) + ', ' + this.getA() + ')';
    },
    /**
     * To rgb string format
     * @return {String}
     */
    toRGB: function () {
      var self = this;
      return 'rgb(' + self.getR() + ', ' + self.getG() + ', ' + self.getB() + ')';
    },
    /**
     * To rgba string format
     * @return {String}
     */
    toRGBA: function () {
      var self = this;
      return 'rgba(' + self.getR() + ', ' + self.getG() + ', ' + self.getB() + ', ' + self.getA() + ')';
    },
    /**
     * To hex string format
     * @return {String}
     */
    toHex: function () {
      var self = this;
      return '#' + padding2(Number(self.getR()).toString(16)) + padding2(Number(self.getG()).toString(16)) + padding2(Number(self.getB()).toString(16));
    },
    /**
     * Return the color in the rgba format.
     * @return {String}
     */
    toString: function () {
      return this.toRGBA();
    },
    /**
     * Return the color in the hsl format.
     * @return {Object}
     */
    getHSL: function () {
      var self = this, r = self.getR() / 255, g = self.getG() / 255, b = self.getB() / 255, max = Math.max(r, g, b), min = Math.min(r, g, b), delta = max - min, h, s = 0, l = 0.5 * (max + min);
      // min==max means achromatic (hue is undefined)
      if (min !== max) {
        s = l < 0.5 ? delta / (max + min) : delta / (2 - max - min);
        if (r === max) {
          h = 60 * (g - b) / delta;
        } else if (g === max) {
          h = 120 + 60 * (b - r) / delta;
        } else {
          h = 240 + 60 * (r - g) / delta;
        }
        h = (h + 360) % 360;
      }
      return {
        h: h,
        s: s,
        l: l
      };
    },
    /**
     * Return the color in the hsv format.
     * @return {Object}
     */
    getHSV: function () {
      return rgb2hsv({
        r: this.getR(),
        g: this.getG(),
        b: this.getB()
      });
    },
    /**
     * Set value by hsv
     * @param cfg
     * @param cfg.h
     * @param cfg.s
     * @param cfg.v
     */
    setHSV: function (cfg) {
      var self = this, current;
      if (!('h' in cfg && 's' in cfg && 'v' in cfg)) {
        current = self.getHSV();
        each([
          'h',
          's',
          'v'
        ], function (x) {
          if (x in cfg) {
            current[x] = cfg[x];
          }
        });
        cfg = current;
      }
      self.set(hsv2rgb(cfg));
    },
    /**
     * Set value by hsl
     * @param cfg
     * @param cfg.h
     * @param cfg.s
     * @param cfg.l
     */
    setHSL: function (cfg) {
      var self = this, current;
      if (!('h' in cfg && 's' in cfg && 'l' in cfg)) {
        current = self.getHSL();
        each([
          'h',
          's',
          'l'
        ], function (x) {
          if (x in cfg) {
            current[x] = cfg[x];
          }
        });
        cfg = current;
      }
      self.set(hsl2rgb(cfg));
    }
  };
  mix(Color, {
    version: '1.0.2',
    /**
     * Construct color object from String.
     * @static
     * @param {String} str string format color( '#rrggbb'  '#rgb' or 'rgb(r,g,b)'  'rgba(r,g,b,a)' )
     */
    parse: function (str) {
      var values, r, g, b, a = 1;
      if ((str.length === 4 || str.length === 7) && str.substr(0, 1) === '#') {
        values = str.match(hexRe);
        if (values) {
          r = parseHex(values[1]);
          g = parseHex(values[2]);
          b = parseHex(values[3]);
          if (str.length === 4) {
            r = paddingHex(r);
            g = paddingHex(g);
            b = paddingHex(b);
          }
        }
      } else {
        values = str.match(rgbaRe);
        if (values) {
          r = parseInt(values[1], 10);
          g = parseInt(values[2], 10);
          b = parseInt(values[3], 10);
          a = parseFloat(values[4]) || 1;
        }
      }
      return typeof r === 'undefined' ? undefined : new Color({
        r: r,
        g: g,
        b: b,
        a: a
      });
    },
    /**
     * Construct color object from hsl.
     * @static
     * @param {Object} cfg
     * @param {Number} cfg.h Hue
     * @param {Number} cfg.s Saturation
     * @param {Number} cfg.l lightness
     * @param {Number} cfg.a alpha
     */
    fromHSL: function (cfg) {
      var rgb = hsl2rgb(cfg);
      rgb.a = cfg.a;
      return new Color(rgb);
    },
    /**
     * Construct color object from hsv.
     * @static
     * @param {Object} cfg
     * @param {Number} cfg.h Hue
     * @param {Number} cfg.s Saturation
     * @param {Number} cfg.v value
     * @param {Number} cfg.a alpha
     */
    fromHSV: function (cfg) {
      var rgb = hsv2rgb(cfg);
      rgb.a = cfg.a;
      return new Color(rgb);
    }
  });
  // #---------------------------- private start
  function to255(v) {
    return v * 255;
  }
  function hsv2rgb(cfg) {
    var h = Math.min(Math.round(cfg.h), 359), s = Math.max(0, Math.min(1, cfg.s)), v = Math.max(0, Math.min(1, cfg.v)), r, g, b, i = Math.floor(h / 60 % 6), f = h / 60 - i, p = v * (1 - s), q = v * (1 - f * s), t = v * (1 - (1 - f) * s);
    switch (i) {
    case 0:
      r = v;
      g = t;
      b = p;
      break;
    case 1:
      r = q;
      g = v;
      b = p;
      break;
    case 2:
      r = p;
      g = v;
      b = t;
      break;
    case 3:
      r = p;
      g = q;
      b = v;
      break;
    case 4:
      r = t;
      g = p;
      b = v;
      break;
    case 5:
      r = v;
      g = p;
      b = q;
      break;
    }
    return {
      r: constrain255(to255(r)),
      g: constrain255(to255(g)),
      b: constrain255(to255(b))
    };
  }
  function rgb2hsv(cfg) {
    var r = cfg.r / 255, g = cfg.g / 255, b = cfg.b / 255;
    var h, s, min = Math.min(Math.min(r, g), b), max = Math.max(Math.max(r, g), b), delta = max - min, hsv;
    switch (max) {
    case min:
      h = 0;
      break;
    case r:
      h = 60 * (g - b) / delta;
      if (g < b) {
        h += 360;
      }
      break;
    case g:
      h = 60 * (b - r) / delta + 120;
      break;
    case b:
      h = 60 * (r - g) / delta + 240;
      break;
    }
    s = max === 0 ? 0 : 1 - min / max;
    hsv = {
      h: Math.round(h),
      s: s,
      v: max
    };
    return hsv;
  }
  function hsl2rgb(cfg) {
    var h = Math.min(Math.round(cfg.h), 359), s = Math.max(0, Math.min(1, cfg.s)), l = Math.max(0, Math.min(1, cfg.l)), C, X, m, rgb = [], abs = Math.abs, floor = Math.floor;
    if (s === 0 || h == null) {
      // achromatic
      rgb = [
        l,
        l,
        l
      ];
    } else {
      // http://en.wikipedia.org/wiki/HSL_and_HSV#From_HSL
      // C is the chroma
      // X is the second largest component
      // m is the lightness adjustment
      h /= 60;
      C = s * (1 - abs(2 * l - 1));
      X = C * (1 - abs(h - 2 * floor(h / 2) - 1));
      m = l - C / 2;
      switch (floor(h)) {
      case 0:
        rgb = [
          C,
          X,
          0
        ];
        break;
      case 1:
        rgb = [
          X,
          C,
          0
        ];
        break;
      case 2:
        rgb = [
          0,
          C,
          X
        ];
        break;
      case 3:
        rgb = [
          0,
          X,
          C
        ];
        break;
      case 4:
        rgb = [
          X,
          0,
          C
        ];
        break;
      case 5:
        rgb = [
          C,
          0,
          X
        ];
        break;
      }
      rgb = [
        rgb[0] + m,
        rgb[1] + m,
        rgb[2] + m
      ];
    }
    each(rgb, function (v, index) {
      rgb[index] = to255(v);
    });
    return {
      r: rgb[0],
      g: rgb[1],
      b: rgb[2]
    };
  }
  function parseHex(v) {
    return parseInt(v, 16);
  }
  function paddingHex(v) {
    return v + v * 16;
  }
  function padding2(v) {
    if (v.length !== 2) {
      v = '0' + v;
    }
    return v;
  }
  function percentage(v) {
    return Math.round(v * 100) + '%';
  }
  function constrain255(v) {
    return Math.max(0, Math.min(v, 255));
  }
  return exports;
}();
module.exports = color;
});