
/*!
 * ColorMix JavaScript Library v2.0.0
 * http://color-mix.it
 *
 * Copyright 2013 @ Florent SCHILDKNECHT
 *
 * Date: 2014-03-29
 */
var ColorMix;

ColorMix = (function() {
  "use strict";
  var Color, ColorSpace, _gradient;
  _gradient = [
    {
      reference: 0,
      color: {
        red: 0,
        green: 0,
        blue: 0
      }
    }, {
      reference: 100,
      color: {
        red: 255,
        green: 255,
        blue: 255
      }
    }
  ];
  Color = function(R, G, B) {
    this.red = 0;
    this.green = 0;
    this.blue = 0;
    if (R !== void 0) {
      if (G !== void 0 && B !== void 0) {
        this.setRed(parseInt(R));
        this.setGreen(parseInt(G));
        this.setBlue(parseInt(B));
      } else if (typeof R === 'string') {
        this.fromHex(R);
      }
    }
    return this;
  };
  ColorSpace = (function() {
    return {
      RGB: function(R, G, B) {
        if (R === void 0 || G === void 0 || B === void 0) {
          throw 'Invalid parameter(s) provided for "ColorMix.ColorSpace.RGB()"';
        }
        return {
          'red': isNaN(parseInt(R)) ? 0 : parseInt(R),
          'green': isNaN(parseInt(G)) ? 0 : parseInt(G),
          'blue': isNaN(parseInt(B)) ? 0 : parseInt(B)
        };
      },
      XYZ: function(X, Y, Z) {
        if (X === void 0 || Y === void 0 || Z === void 0) {
          throw 'Invalid parameter(s) provided for "ColorMix.ColorSpace.XYZ()"';
        }
        return {
          'x': isNaN(parseFloat(X)) ? 0.0 : parseFloat(X),
          'y': isNaN(parseFloat(Y)) ? 0.0 : parseFloat(Y),
          'z': isNaN(parseFloat(Z)) ? 0.0 : parseFloat(Z)
        };
      },
      HSL: function(H, S, L) {
        if (H === void 0 || S === void 0 || L === void 0) {
          throw 'Invalid parameter(s) provided for "ColorMix.ColorSpace.HSL()"';
        }
        return {
          'hue': isNaN(parseInt(H)) ? 0.0 : parseInt(H),
          'sat': isNaN(parseInt(S)) ? 0.0 : parseInt(S),
          'lig': isNaN(parseInt(L)) ? 0.0 : parseInt(L)
        };
      },
      Lab: function(L, a, b) {
        if (L === void 0 || a === void 0 || b === void 0) {
          throw 'Invalid parameter(s) provided for "ColorMix.ColorSpace.Lab()"';
        }
        return {
          'L': isNaN(parseFloat(L)) ? 0.0 : parseFloat(L),
          'a': isNaN(parseFloat(a)) ? 0.0 : parseFloat(a),
          'b': isNaN(parseFloat(b)) ? 0.0 : parseFloat(b)
        };
      },
      RGBtoXYZ: function(R, G, B) {
        var RGB, blue, green, red;
        if (R !== void 0 && G !== void 0 && B !== void 0) {
          RGB = new this.RGB(R, G, B);
        } else if (R !== void 0 && typeof R === 'object' && R.red !== void 0 && R.green !== void 0 && R.blue !== void 0) {
          RGB = new this.RGB(R.red, R.green, R.blue);
        } else {
          throw 'Invalid parameter(s) provided for "ColorMix.ColorSpace.RGBtoXYZ()".';
        }
        red = parseFloat(RGB.red / 255);
        green = parseFloat(RGB.green / 255);
        blue = parseFloat(RGB.blue / 255);
        red = 100 * (red > 0.04045 ? Math.pow((red + 0.055) / 1.055, 2.4) : red /= 12.92);
        green = 100 * (green > 0.04045 ? Math.pow((green + 0.055) / 1.055, 2.4) : green /= 12.92);
        blue = 100 * (blue > 0.04045 ? Math.pow((blue + 0.055) / 1.055, 2.4) : blue /= 12.92);
        return new this.XYZ(red * 0.4124 + green * 0.3576 + blue * 0.1805, red * 0.2126 + green * 0.7152 + blue * 0.0722, red * 0.0193 + green * 0.1192 + blue * 0.9505);
      },
      XYZtoRGB: function(X, Y, Z) {
        var XYZ, blue, green, red, x, y, z;
        if (X !== void 0 && Y !== void 0 && Z !== void 0) {
          XYZ = new this.XYZ(X, Y, Z);
        } else if (X !== void 0 && typeof X === 'object' && X.x !== void 0 && X.y !== void 0 && X.z !== void 0) {
          XYZ = new this.XYZ(X.x, X.y, X.z);
        } else {
          throw 'Invalid parameter(s) provided for "ColorMix.ColorSpace.XYZtoRGB()".';
        }
        x = XYZ.x / 100;
        y = XYZ.y / 100;
        z = XYZ.z / 100;
        red = x * 3.2406 + y * -1.5372 + z * -0.4986;
        green = x * -0.9689 + y * 1.8758 + z * 0.0415;
        blue = x * 0.0557 + y * -0.2040 + z * 1.0570;
        red = 255 * (red > 0.0031308 ? 1.055 * (Math.pow(red, 1 / 2.4)) - 0.055 : red *= 12.92);
        green = 255 * (green > 0.0031308 ? 1.055 * (Math.pow(green, 1 / 2.4)) - 0.055 : green *= 12.92);
        blue = 255 * (blue > 0.0031308 ? 1.055 * (Math.pow(blue, 1 / 2.4)) - 0.055 : blue *= 12.92);
        return new this.RGB(Math.round(red), Math.round(green), Math.round(blue));
      },
      RGBtoHSL: function(R, G, B) {
        var H, L, RGB, S, blue, d, green, max, min, red, _ref;
        if (R !== void 0 && G !== void 0 && B !== void 0) {
          RGB = new this.RGB(R, G, B);
        } else if (R !== void 0 && typeof R === 'object' && R.red !== void 0 && R.green !== void 0 && R.blue !== void 0) {
          RGB = new this.RGB(R.red, R.green, R.blue);
        } else {
          throw 'Invalid parameter(s) provided for "ColorMix.ColorSpace.RGBtoXYZ()".';
        }
        red = RGB.red / 255;
        green = RGB.green / 255;
        blue = RGB.blue / 255;
        max = Math.max(red, green, blue);
        min = Math.min(red, green, blue);
        L = (max + min) / 2;
        if (max === min) {
          H = S = 0;
        } else {
          d = max - min;
          if (L > 0.5) {
            S = d / (2 - max - min);
          } else {
            S = d / (max + min);
          }
          switch (max) {
            case 'red':
              H = (green - blue) / d + ((_ref = green < blue) != null ? _ref : {
                6: 0
              });
              break;
            case 'green':
              H = (blue - red) / d + 2;
              break;
            case 'blue':
              H = (red - green) / d + 4;
              break;
          }
          H /= 6;
        }
        return new this.HSL(Math.floor(H * 360), Math.floor(S * 100), Math.floor(L * 100));
      },
      XYZtoLab: function(X, Y, Z) {
        var XYZ, x, y, z;
        if (X !== void 0 && Y !== void 0 && Z !== void 0) {
          XYZ = new this.XYZ(X, Y, Z);
        } else if (X !== void 0 && typeof X === 'object' && X.x !== void 0 && X.y !== void 0 && X.z !== void 0) {
          XYZ = new this.XYZ(X.x, X.y, X.z);
        } else {
          throw 'Invalid parameter(s) provided for "ColorMix.ColorSpace.XYZtoLab()".';
        }
        x = XYZ.x / 95.047;
        y = XYZ.y / 100.000;
        z = XYZ.z / 108.883;
        x = x > 0.008856 ? Math.pow(x, 1 / 3) : (7.787 * x) + 16 / 116;
        y = y > 0.008856 ? Math.pow(y, 1 / 3) : (7.787 * y) + 16 / 116;
        z = z > 0.008856 ? Math.pow(z, 1 / 3) : (7.787 * z) + 16 / 116;
        return new this.Lab((116 * y) - 16, 500 * (x - y), 200 * (y - z));
      },
      LabtoXYZ: function(L, a, b) {
        var Lab, X, Y, Z;
        if (L !== void 0 && a !== void 0 && b !== void 0) {
          Lab = new this.Lab(L, a, b);
        } else if (L !== void 0 && typeof L === 'object' && L.L !== void 0 && L.a !== void 0 && L.b !== void 0) {
          Lab = new this.Lab(L.L, L.a, L.b);
        } else {
          throw 'Invalid parameter(s) provided for "ColorMix.ColorSpace.LabtoXYZ()".';
        }
        Y = (Lab.L + 16) / 116;
        X = Lab.a / 500 + Y;
        Z = Y - Lab.b / 200;
        Y = Math.pow(Y, 3) > 0.008856 ? Math.pow(Y, 3) : (Y - 16 / 116) / 7.787;
        X = Math.pow(X, 3) > 0.008856 ? Math.pow(X, 3) : (X - 16 / 116) / 7.787;
        Z = Math.pow(Z, 3) > 0.008856 ? Math.pow(Z, 3) : (Z - 16 / 116) / 7.787;
        return new this.XYZ(X * 95.047, Y * 100.000, Z * 108.883);
      },
      RGBtoLab: function(R, G, B) {
        if (R === void 0 || G === void 0 || B === void 0) {
          throw 'Invalid parameter(s) provided for "ColorMix.ColorSpace.RGBtoLab()"';
        }
        return this.XYZtoLab(this.RGBtoXYZ(R, G, B));
      },
      LabtoRGB: function(L, a, b) {
        if (L === void 0 || a === void 0 || b === void 0) {
          throw 'Invalid parameter(s) provided for "ColorMix.ColorSpace.LabtoRGB()"';
        }
        return this.XYZtoRGB(this.LabtoXYZ(L, a, b));
      }
    };
  })();
  Color.prototype = {
    fromHex: function(hex) {
      var blue, green, red;
      hex = String(hex) || '';
      if (hex.length > 0) {
        if (hex[0] === '#') {
          hex = hex.slice(1);
        }
        if (hex.length === 3) {
          hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        red = parseInt(hex.slice(0, 2), 16);
        green = parseInt(hex.slice(2, 4), 16);
        blue = parseInt(hex.slice(4, 6), 16);
        this.setRed(isNaN(red) ? 0 : red);
        this.setGreen(isNaN(green) ? 0 : green);
        this.setBlue(isNaN(blue) ? 0 : blue);
      } else {
        this.setRed(0);
        this.setGreen(0);
        this.setBlue(0);
      }
      return this;
    },
    setRed: function(R) {
      if (R !== void 0) {
        this.red = Math.min(255, Math.max(0, parseInt(R)));
      }
      return this;
    },
    getRed: function() {
      return this.red;
    },
    setGreen: function(G) {
      if (G !== void 0) {
        this.green = Math.min(255, Math.max(0, parseInt(G)));
      }
      return this;
    },
    getGreen: function() {
      return this.green;
    },
    setBlue: function(B) {
      if (B !== void 0) {
        this.blue = Math.min(255, Math.max(0, parseInt(B)));
      }
      return this;
    },
    getBlue: function() {
      return this.blue;
    },
    toString: function(mode) {
      var HSL;
      switch (mode) {
        case 'rgb':
          return 'rgb(' + this.red + ', ' + this.green + ', ' + this.blue + ')';
        case 'rgba':
          return 'rgba(' + this.red + ', ' + this.green + ', ' + this.blue + ', 1)';
        case 'hsl':
          HSL = ColorMix.ColorSpace.RGBtoHSL(this.red, this.green, this.blue);
          return 'hsl(' + HSL.hue + ', ' + HSL.sat + '%, ' + HSL.lig + '%)';
        case 'hsla':
          HSL = ColorMix.ColorSpace.RGBtoHSL(this.red, this.green, this.blue);
          return 'hsla(' + HSL.hue + ', ' + HSL.sat + '%, ' + HSL.lig + '%, 1)';
        default:
          return '#' + ((1 << 24) + (this.red << 16) + (this.green << 8) + this.blue).toString(16).slice(1);
      }
    },
    useAsBackground: function(selector) {
      var DOMelts, elts, i;
      if (typeof selector === 'object' && selector !== null) {
        if (selector.css) {
          selector.css('background-color', 'rgb(' + this.red + ', ' + this.green + ', ' + this.blue + ')');
        }
      } else {
        selector = String(selector);
        if (selector.length > 0) {
          if (window.jQuery !== void 0) {
            window.jQuery(selector).css('background-color', 'rgb(' + this.red + ', ' + this.green + ', ' + this.blue + ')');
          } else {
            if (typeof selector === 'string') {
              switch (selector[0]) {
                case '#':
                  elts = document.getElementById(selector);
                  break;
                case '.':
                  if (document.getElementsByClassName) {
                    elts = document.getElementsByClassName(selector);
                  } else {
                    elts = [];
                    DOMelts = document.getElementsByTagName('*');
                    i = DOMelts.length;
                    while (i--) {
                      if (DOMelts[i].className === selector.slice(1)) {
                        elts.push(DOMelts[i])();
                      }
                    }
                  }
                  break;
                default:
                  elts = document.getElementsByTagName(selector);
                  break;
              }
            }
            i = elts.length;
            while (i--) {
              (elts[i].style['background-color'] = 'rgb(' + this.red + ', ' + this.green + ', ' + this.blue + ')')();
            }
          }
        }
      }
      return this;
    },
    useAsColor: function(selector) {
      var DOMelts, elts, i;
      if (typeof selector === 'object' && selector !== null) {
        if (selector.css) {
          selector.css('color', 'rgb(' + this.red + ', ' + this.green + ', ' + this.blue + ')');
        }
      } else {
        selector = String(selector);
        if (selector.length > 0) {
          if (window.jQuery !== void 0) {
            window.jQuery(selector).css('color', 'rgb(' + this.red + ', ' + this.green + ', ' + this.blue + ')');
          } else {
            if (typeof selector === 'string') {
              switch (selector[0]) {
                case '#':
                  elts = document.getElementById(selector);
                  break;
                case '.':
                  if (document.getElementsByClassName) {
                    elts = document.getElementsByClassName(selector);
                  } else {
                    elts = [];
                    DOMelts = document.getElementsByTagName('*');
                    i = DOMelts.length;
                    while (i--) {
                      if (DOMelts[i].className === selector.slice(1)) {
                        elts.push(DOMelts[i])();
                      }
                    }
                  }
                  break;
                default:
                  elts = document.getElementsByTagName(selector);
              }
            }
            i = elts.length;
            while (i--) {
              (elts[i].style['color'] = 'rgb(' + this.red + ', ' + this.green + ', ' + this.blue + ')')();
            }
          }
        }
      }
      return this;
    }
  };
  return {
    Color: Color,
    ColorSpace: ColorSpace,
    mix: function(colors, percents) {
      var L, Lab, P, RGB, a, b, i;
      if (colors === void 0 || Object.prototype.toString.call(colors) !== '[object Array]') {
        throw '"ColorMix.mix()" first parameter should be an array of ColorMix.Color objects';
      }
      if (percents === void 0) {
        percents = [];
        i = colors.length;
        while (i--) {
          percents[i] = 100 / colors.length;
        }
      } else if (Object.prototype.toString.call(percents) !== '[object Array]') {
        throw '"ColorMix.mix()" second parameter should be an array of percents. (nnumber values)';
      }
      if (colors.length !== percents.length) {
        throw '"ColorMix.mix()" parameters should be arrays of the same size !';
      }
      i = colors.length;
      L = 0;
      a = 0;
      b = 0;
      P = 0;
      while (i--) {
        if (!(colors[i] instanceof ColorMix.Color)) {
          throw '"ColorMix.mix()" color at index: ' + i + ' should be an instance of ColorMix.Color() object !';
        }
        P += percents[i];
        if (P > 100) {
          throw 'Invalid "ColorMix.mix()" second parameter: the sum of all the percents array items should be 100.';
        }
        Lab = ColorMix.ColorSpace.RGBtoLab(colors[i].getRed(), colors[i].getGreen(), colors[i].getBlue());
        L += Lab.L * percents[i] / 100;
        a += Lab.a * percents[i] / 100;
        b += Lab.b * percents[i] / 100;
      }
      if (P !== 100) {
        throw 'Invalid "ColorMix.mix()" second parameter: the sum of all the percents array items should be 100.';
      }
      RGB = ColorMix.ColorSpace.LabtoRGB(L, a, b);
      return new ColorMix.Color(RGB.red, RGB.green, RGB.blue);
    },
    setGradient: function(newGradient) {
      if (newGradient !== void 0 && Object.prototype.toString.call(newGradient) === '[object Array]') {
        _gradient = newGradient;
      }
      return this;
    },
    getGradient: function() {
      return _gradient;
    },
    blend: function(reference) {
      var C1, C2, l, next, previous, step;
      if (reference === void 0) {
        throw 'Missing "ColorMix.blend()" first parameter.';
      }
      reference = parseInt(reference);
      if (isNaN(reference)) {
        throw 'Invalid "ColorMix.blend()" first parameter: you should provide a number.';
      }
      l = _gradient.length;
      previous = _gradient[0];
      next = _gradient[l - 1];
      if (reference <= previous.reference) {
        return new ColorMix.Color(previous.color.red, previous.color.green, previous.color.blue);
      } else if (reference >= next.reference) {
        return new ColorMix.Color(next.color.red, next.color.green, next.color.blue);
      }
      while (l--) {
        step = _gradient[l];
        if (step.reference <= reference && step.reference > previous.reference) {
          previous = step;
        } else if (step.reference >= reference && step.reference < next.reference) {
          next = step;
        }
      }
      C1 = new ColorMix.Color(previous.color.red, previous.color.green, previous.color.blue);
      C2 = new ColorMix.Color(next.color.red, next.color.green, next.color.blue);
      previous.percent = Math.abs(100 / ((previous.reference - next.reference) / (reference - next.reference)));
      next.percent = 100 - previous.percent;
      return new ColorMix.mix([C1, C2], [previous.percent, next.percent]);
    }
  };
})();
