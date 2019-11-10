(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["chromatism"] = factory();
	else
		root["chromatism"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 35);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  ILLUMINANTS: {
    // From ASTM E308-01
    A: { X: 1.09850 * 100, Y: 1.00000 * 100, Z: 0.35585 * 100 },

    // From Wyszecki & Stiles, p. 769
    B: { X: 0.99072 * 100, Y: 1.00000 * 100, Z: 0.85223 * 100 },

    // From ASTM E308-01
    C: { X: 0.98074 * 100, Y: 1.00000 * 100, Z: 1.18232 * 100 },

    // From ASTM E308-01
    D50: { X: 0.96422 * 100, Y: 1.00000 * 100, Z: 0.82521 * 100 },

    // From ASTM E308-01
    D55: { X: 0.95682 * 100, Y: 1.00000 * 100, Z: 0.92149 * 100 },

    // From ASTM E308-01
    D65: { X: 0.95047 * 100, Y: 1.00000 * 100, Z: 1.08883 * 100 },

    // From ASTM E308-01
    D75: { X: 0.94972 * 100, Y: 1.00000 * 100, Z: 1.22638 * 100 },

    // From ASTM E308-01
    E: { X: 1.00000 * 100, Y: 1.00000 * 100, Z: 1.00000 * 100 },

    // From ASTM E308-01
    F2: { X: 0.99186 * 100, Y: 1.00000 * 100, Z: 0.67393 * 100 },

    // From ASTM E308-01
    F7: { X: 0.95041 * 100, Y: 1.00000 * 100, Z: 1.08747 * 100 },

    // From ASTM E308-01
    F11: { X: 1.00962 * 100, Y: 1.00000 * 100, Z: 0.64350 * 100 }
  }
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function contains(obj, test) {
  var arr = Object.keys(obj);
  return arr.every(function (val) {
    return test.indexOf(val) !== -1;
  });
}

module.exports = {
  'hex': {
    test: function test(colour) {
      return typeof colour === 'string' && colour.slice(0, 1) === '#';
    },
    convert: __webpack_require__(8)
  },
  'rgb': {
    test: function test(colour) {
      return contains(colour, ['r', 'g', 'b']);
    },
    convert: __webpack_require__(12)
  },
  'cssrgb': {
    test: function test(colour) {
      return typeof colour === 'string' && colour.slice(0, 4) === 'rgb(';
    },
    convert: __webpack_require__(7)
  },
  'hsl': {
    test: function test(colour) {
      return contains(colour, ['h', 's', 'l']);
    },
    convert: __webpack_require__(9)
  },
  'csshsl': {
    test: function test(colour) {
      return typeof colour === 'string' && colour.slice(0, 4) === 'hsl(';
    },
    convert: __webpack_require__(6)
  },
  'hsv': {
    test: function test(colour) {
      return contains(colour, ['h', 's', 'v']);
    },
    convert: __webpack_require__(10)
  },
  'cmyk': {
    test: function test(colour) {
      return contains(colour, ['c', 'm', 'y', 'k']);
    },
    convert: __webpack_require__(5)
  },
  'yiq': {
    test: function test(colour) {
      return contains(colour, ['y', 'i', 'q']);
    },
    convert: __webpack_require__(14)
  },
  'XYZ': {
    test: function test(colour) {
      return contains(colour, ['X', 'Y', 'Z']);
    },
    convert: __webpack_require__(13)
  },
  'xyY': {
    test: function test(colour) {
      return contains(colour, ['x', 'y', 'Y']);
    },
    convert: __webpack_require__(15)
  },
  'lms': {
    test: function test(colour) {
      return contains(colour, ['rho', 'gamma', 'beta']);
    },
    convert: __webpack_require__(11)
  },
  'cielab': {
    test: function test(colour) {
      return contains(colour, ['L', 'a', 'b']);
    },
    convert: __webpack_require__(4)
  }

};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var constants = __webpack_require__(0);
var conversions = __webpack_require__(1);
var api = __webpack_require__(38);

var helpers = {
  getIlluminant: function getIlluminant(ref) {
    return constants.ILLUMINANTS[ref];
  },
  matrixMultiply: function matrixMultiply(a, b) {
    if (a[0].length != b.length) {
      throw "error: incompatible sizes";
    }

    var result = [];
    for (var i = 0; i < a.length; i++) {
      result[i] = [];
      for (var j = 0; j < b[0].length; j++) {
        var sum = 0;
        for (var k = 0; k < a[0].length; k++) {
          sum += a[i][k] * b[k][j];
        }
        result[i][j] = sum;
      }
    }
    return result;
  },
  cbrt: function cbrt(x) {
    if (!Math.cbrt) {
      var y = Math.pow(Math.abs(x), 1 / 3);
      return x < 0 ? -y : y;
    } else {
      return Math.cbrt(x);
    }
  },
  toRad: function toRad(angle) {
    return angle * (Math.PI / 180);
  },
  toDeg: function toDeg(angle) {
    return angle * (180 / Math.PI);
  },
  negMod: function negMod(n, m) {
    return (n % m + m) % m;
  },
  slopeMod: function (_slopeMod) {
    function slopeMod(_x, _x2) {
      return _slopeMod.apply(this, arguments);
    }

    slopeMod.toString = function () {
      return _slopeMod.toString();
    };

    return slopeMod;
  }(function (n, m) {
    if (n > m * 2) {
      return slopeMod(n - m * 2, m);
    } else if (n > m) {
      return m * 2 - n;
    } else if (n < 0) {
      return slopeMod(n + m * 2, m);
    } else {
      return n;
    }
  }),
  bounded: function bounded(val, range) {
    if (val < range[0]) {
      val = range[0];
    } else if (val > range[1]) {
      val = range[1];
    }
    return val;
  },
  boundedRgb: function boundedRgb(rgb) {
    var _this = this;

    var bounded = function bounded(val) {
      return _this.bounded(val, [0, 255]);
    };
    return {
      r: bounded(rgb.r),
      g: bounded(rgb.g),
      b: bounded(rgb.b)
    };
  },
  determineMode: function determineMode(colour) {
    for (model in conversions) {
      if (!conversions.hasOwnProperty(model)) continue;
      if (conversions[model].test(colour)) return model;
    }
    return null;
  },
  ready: function ready(_ref, colour) {
    var conversions = _ref.conversions,
        operations = _ref.operations,
        helpers = _ref.helpers;

    var out = {};

    switch (Object.prototype.toString.call(colour)) {

      case "[object Object]":
      case "[object String]":
        out['colour'] = colour;
        for (model in conversions) {
          if (!conversions.hasOwnProperty(model)) continue;
          (function (model) {
            Object.defineProperty(out, model, {
              get: function get() {
                var from = helpers.determineMode(colour);
                return operations.convert({ conversions: conversions, operations: operations, helpers: helpers }, model, colour);
              },
              enumerable: true
            });
          })(model);
        }

        out = Object.assign(out, api({ conversions: conversions, operations: operations, helpers: helpers }, constants, out));

        return out;

      case "[object Array]":
        out['colours'] = colour;
        for (model in conversions) {
          if (!conversions.hasOwnProperty(model)) continue;
          (function (model) {
            Object.defineProperty(out, model, {
              get: function get() {
                colour.map(function (colourItem) {
                  operations.convert({ conversions: conversions, operations: operations, helpers: helpers }, model, colourItem);
                });
              },
              enumerable: true
            });
          })(model);
        }
        return out;

      default:
        return null;

    }
  }
};

module.exports = helpers;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  adapt: __webpack_require__(16),
  adjacent: __webpack_require__(17),
  complementary: __webpack_require__(18),
  contrast: __webpack_require__(19),
  contrastRatio: __webpack_require__(20),
  convert: __webpack_require__(21),
  difference: __webpack_require__(22),
  fade: __webpack_require__(23),
  greyscale: __webpack_require__(24),
  hue: __webpack_require__(25),
  invert: __webpack_require__(26),
  invertLightness: __webpack_require__(27),
  mid: __webpack_require__(28),
  multiply: __webpack_require__(29),
  saturation: __webpack_require__(30),
  sepia: __webpack_require__(31),
  shade: __webpack_require__(32),
  tetrad: __webpack_require__(33),
  triad: __webpack_require__(34)
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function fromCieLab(_ref, to, value) {
  var conversions = _ref.conversions,
      operations = _ref.operations,
      helpers = _ref.helpers;

  switch (to) {

    case "XYZ":
      var epsilon = 0.008856;
      var kappa = 903.3;
      var white = helpers.getIlluminant('D65');

      var Fy = (value.L + 16) / 116;
      var Fx = value.a / 500 + Fy;
      var Fz = Fy - value.b / 200;

      var toR = function toR(f) {
        return Math.pow(f, 3) > epsilon ? Math.pow(f, 3) : (116 * f - 16) / kappa;
      };
      var Xr = toR(Fx),
          Zr = toR(Fz);
      var Yr = value.L > kappa * epsilon ? Math.pow(Fy, 3) : value.L / kappa;

      return {
        X: Xr * white.X,
        Y: Yr * white.Y,
        Z: Zr * white.Z
      };

    default:
      var XYZ = operations.convert({ conversions: conversions, operations: operations, helpers: helpers }, "XYZ", value);
      return operations.convert({ conversions: conversions, operations: operations, helpers: helpers }, to, XYZ);

  }
}

module.exports = fromCieLab;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function fromCmyk(_ref, to, value) {
  var conversions = _ref.conversions,
      operations = _ref.operations,
      helpers = _ref.helpers;

  switch (to) {

    case "rgb":
      var r = 255 * (1 - value.c) * (1 - value.k);
      var g = 255 * (1 - value.m) * (1 - value.k);
      var b = 255 * (1 - value.y) * (1 - value.k);
      return { r: r, g: g, b: b };

    case "cssrgb":
      var r = 255 * (1 - value.c) * (1 - value.k);
      var g = 255 * (1 - value.m) * (1 - value.k);
      var b = 255 * (1 - value.y) * (1 - value.k);
      return "rgb(" + Math.round(r) + "," + Math.round(g) + "," + Math.round(b) + ")";

    default:
      var rgb = operations.convert({ conversions: conversions, operations: operations, helpers: helpers }, "rgb", value);
      return operations.convert({ conversions: conversions, operations: operations, helpers: helpers }, to, rgb);
  }
}

module.exports = fromCmyk;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function fromCssHsl(_ref, to, value) {
  var conversions = _ref.conversions,
      operations = _ref.operations,
      helpers = _ref.helpers;

  value = value.replace(/(hsl\(|\)|%|[\s]*)/g, '').split(",");
  for (var i = 0; i < value.length; i++) {
    value[i] = parseInt(value[i]);
  }
  switch (to) {

    case "hsl":
      return {
        h: value[0],
        s: value[1],
        l: value[2]
      };

    /* This colour mode is just an expression of HSL */
    default:
      return operations.convert({ conversions: conversions, operations: operations, helpers: helpers }, to, {
        h: value[0],
        s: value[1],
        l: value[2]
      });

  }
}

module.exports = fromCssHsl;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function fromCssRgb(_ref, to, value) {
  var conversions = _ref.conversions,
      operations = _ref.operations,
      helpers = _ref.helpers;

  value = value.replace(/((rgb\(|\))|[\s]*)/g, '').split(",");
  for (var i = 0; i < value.length; i++) {
    value[i] = parseInt(value[i]);
  }
  switch (to) {

    case "rgb":
      return {
        r: value[0],
        g: value[1],
        b: value[2]
      };

    /* This colour mode is just an expression of RGB */
    default:
      return operations.convert({ conversions: conversions, operations: operations, helpers: helpers }, to, {
        r: value[0],
        g: value[1],
        b: value[2]
      });

  }
}

module.exports = fromCssRgb;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function fromHex(_ref, to, value) {
  var conversions = _ref.conversions,
      operations = _ref.operations,
      helpers = _ref.helpers;

  value = value.replace('#', '').match(/.{2}/g);
  for (var i = 0; i < value.length; i++) {
    value[i] = parseInt(value[i], 16);
  }
  switch (to) {

    case "rgb":
      return {
        r: value[0],
        g: value[1],
        b: value[2]
      };

    /* This colour mode is just an expression of RGB */
    default:
      return operations.convert({ conversions: conversions, operations: operations, helpers: helpers }, to, {
        r: value[0],
        g: value[1],
        b: value[2]
      });

  }
}

module.exports = fromHex;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function fromHsl(_ref, to, value) {
  var conversions = _ref.conversions,
      operations = _ref.operations,
      helpers = _ref.helpers;

  switch (to) {

    case "rgb":
      if (value.s == 0) {
        var grey = value.l / 100 * 255;
        return {
          r: grey,
          g: grey,
          b: grey
        };
      } else {
        var tempOne, tempTwo, tempHue;
        if (value.l >= 50) {
          tempOne = value.l / 100 + value.s / 100 - value.l / 100 * (value.s / 100);
        } else {
          tempOne = value.l / 100 * (1 + value.s / 100);
        }
        tempTwo = 2 * (value.l / 100) - tempOne;
        tempHue = value.h / 360;
        var tempR = (tempHue + 0.333) % 1;
        var tempG = tempHue;
        var tempB = helpers.negMod(tempHue - 0.333, 1);
        var r, g, b;
        if (6 * tempR < 1) {
          r = tempTwo + (tempOne - tempTwo) * 6 * tempR;
        } else if (2 * tempR < 1) {
          r = tempOne;
        } else if (3 * tempR < 2) {
          r = tempTwo + (tempOne - tempTwo) * ((0.666 - tempR) * 6);
        } else {
          r = tempTwo;
        }
        if (6 * tempG < 1) {
          g = tempTwo + (tempOne - tempTwo) * 6 * tempG;
        } else if (2 * tempG < 1) {
          g = tempOne;
        } else if (3 * tempG < 2) {
          g = tempTwo + (tempOne - tempTwo) * ((0.666 - tempG) * 6);
        } else {
          g = tempTwo;
        }
        if (6 * tempB < 1) {
          b = tempTwo + (tempOne - tempTwo) * 6 * tempB;
        } else if (2 * tempB < 1) {
          b = tempOne;
        } else if (3 * tempB < 2) {
          b = tempTwo + (tempOne - tempTwo) * ((0.666 - tempB) * 6);
        } else {
          b = tempTwo;
        }
        if (r < 0) r = 0;
        if (g < 0) g = 0;
        if (b < 0) b = 0;
        return {
          r: r * 255,
          g: g * 255,
          b: b * 255
        };
      }

    case "csshsl":
      return "hsl(" + Math.round(value.h) + "," + Math.round(value.s) + "%," + Math.round(value.l) + "%)";

    case "hsv":
      value.s = value.s / 100;
      value.l = value.l / 100;
      var i = value.s * (value.l < .5 ? value.l : 1 - value.l);

      var h = value.h;
      var s = 2 * i / (value.l + i);
      var v = value.l + i;

      return { h: h, s: s * 100, v: v * 100 };

    default:
      var rgb = operations.convert({ conversions: conversions, operations: operations, helpers: helpers }, "rgb", value);
      return operations.convert({ conversions: conversions, operations: operations, helpers: helpers }, to, rgb);

  }
}

module.exports = fromHsl;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function fromHsv(_ref, to, value) {
  var conversions = _ref.conversions,
      operations = _ref.operations,
      helpers = _ref.helpers;

  switch (to) {

    case "rgb":
      var r, g, b;
      value.h = value.h / 360;
      value.s = value.s / 100;
      value.v = value.v / 100;

      var hsix = value.h * 6;
      if (hsix == 6) hsix = 0;
      var i = Math.round(hsix);
      var var_1 = value.v * (1 - value.s);
      var var_2 = value.v * (1 - value.s * (hsix - i));
      var var_3 = value.v * (1 - value.s * (1 - (hsix - i)));

      var r2, g2, b2;

      if (i == 0) {
        r2 = value.v;
        g2 = var_3;
        b2 = var_1;
      } else if (i == 1) {
        r2 = var_2;
        g2 = value.v;
        b2 = var_1;
      } else if (i == 2) {
        r2 = var_1;
        g2 = value.v;
        b2 = var_3;
      } else if (i == 3) {
        r2 = var_1;
        g2 = var_2;
        b2 = value.v;
      } else if (i == 4) {
        r2 = var_3;
        g2 = var_1;
        b2 = value.v;
      } else {
        r2 = value.v;
        g2 = var_1;
        b2 = var_2;
      }

      r = r2 * 255;
      g = g2 * 255;
      b = b2 * 255;

      return { r: r, g: g, b: b };

    case "hsl":
      value.h = value.h / 360;
      value.s = value.s / 100;
      value.v = value.v / 100;
      var h = value.h;
      var s;
      if ((2 - value.s) * value.v < 1) {
        s = value.s * value.v / ((2 - value.s) * value.v);
      } else {
        s = value.s * value.v / (2 - (2 - value.s) * value.v);
      }
      var l = (2 - value.s) * value.v / 2;
      return { h: h * 360, s: s * 100, l: l * 100 };

    default:
      var rgb = operations.convert({ conversions: conversions, operations: operations, helpers: helpers }, "rgb", value);
      return operations.convert({ conversions: conversions, operations: operations, helpers: helpers }, to, rgb);

  }
}

module.exports = fromHsv;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function fromLms(_ref, to, value) {
  var conversions = _ref.conversions,
      operations = _ref.operations,
      helpers = _ref.helpers;

  switch (to) {

    case "XYZ":
      var valueArray = [value.rho, value.gamma, value.beta];

      // Inverse Bradford Transformation
      var Mbi = [[0.9869929, -0.1470543, 0.1599627], [0.4323053, 0.5183603, 0.0492912], [-0.0085287, 0.0400428, 0.9684867]];

      var resultArray = Mbi.map(function (m) {
        return valueArray.reduce(function (acc, v, key) {
          return m[key] * v + acc;
        }, 0);
      });

      return {
        X: resultArray[0] * 100,
        Y: resultArray[1] * 100,
        Z: resultArray[2] * 100
      };

    default:
      var XYZ = operations.convert({ conversions: conversions, operations: operations, helpers: helpers }, "XYZ", value);
      return operations.convert({ conversions: conversions, operations: operations, helpers: helpers }, to, XYZ);

  }
}

module.exports = fromLms;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function fromRgb(_ref, to, value) {
  var conversions = _ref.conversions,
      operations = _ref.operations,
      helpers = _ref.helpers;

  switch (to) {

    case "hex":
      var r = Math.round(value['r']).toString(16);
      if (r.length == 1) r = "0" + r;
      var g = Math.round(value['g']).toString(16);
      if (g.length == 1) g = "0" + g;
      var b = Math.round(value['b']).toString(16);
      if (b.length == 1) b = "0" + b;
      return "#" + r + g + b;
      break;

    case "cssrgb":
      return "rgb(" + Math.round(value['r']) + "," + Math.round(value['g']) + "," + Math.round(value['b']) + ")";
      break;

    case "hsl":
      var r = value['r'] / 255;
      var g = value['g'] / 255;
      var b = value['b'] / 255;
      var rgbOrdered = [r, g, b].sort();
      var l = (rgbOrdered[0] + rgbOrdered[2]) / 2 * 100;
      var s, h;
      if (rgbOrdered[0] == rgbOrdered[2]) {
        s = 0;
        h = 0;
      } else {
        if (l >= 50) {
          s = (rgbOrdered[2] - rgbOrdered[0]) / (2.0 - rgbOrdered[2] - rgbOrdered[0]) * 100;
        } else {
          s = (rgbOrdered[2] - rgbOrdered[0]) / (rgbOrdered[2] + rgbOrdered[0]) * 100;
        }
        if (rgbOrdered[2] == r) {
          h = (g - b) / (rgbOrdered[2] - rgbOrdered[0]) * 60;
        } else if (rgbOrdered[2] == g) {
          h = (2 + (b - r) / (rgbOrdered[2] - rgbOrdered[0])) * 60;
        } else {
          h = (4 + (r - g) / (rgbOrdered[2] - rgbOrdered[0])) * 60;
        }
        if (h < 0) {
          h += 360;
        } else if (h > 360) {
          h = h % 360;
        }
      };
      return {
        h: h,
        s: s,
        l: l
      };
      break;

    case "csshsl":
      var hsl = operations.convert({ conversions: conversions, helpers: helpers }, "hsl", value);
      return "hsl(" + Math.round(hsl.h) + "," + Math.round(hsl.s) + "%," + Math.round(hsl.l) + "%)";
      break;

    case "cmyk":
      var tempR = value['r'] / 255;
      var tempG = value['g'] / 255;
      var tempB = value['b'] / 255;
      var k = 1 - Math.max(tempR, tempG, tempB);
      if (k != 1) {
        var c = (1 - tempR - k) / (1 - k);
        var m = (1 - tempG - k) / (1 - k);
        var y = (1 - tempB - k) / (1 - k);
      } else {
        var c = 0;
        var m = 0;
        var y = 0;
      }
      return { c: c, m: m, y: y, k: k };
      break;

    case "hsv":
      var r = value.r / 255;
      var g = value.g / 255;
      var b = value.b / 255;

      var min = Math.min(r, g, b);
      var max = Math.max(r, g, b);
      var maxDelta = max - min;

      var v = max;
      var h, s;

      if (maxDelta == 0) {
        h = 0;
        s = 0;
      } else {
        s = maxDelta / max;

        var rDelta = ((max - r) / 6 + maxDelta / 2) / maxDelta;
        var gDelta = ((max - g) / 6 + maxDelta / 2) / maxDelta;
        var bDelta = ((max - b) / 6 + maxDelta / 2) / maxDelta;

        if (r == max) h = bDelta - gDelta;else if (g == max) h = 1 / 3 + rDelta - bDelta;else if (b == max) h = 2 / 3 + gDelta - rDelta;

        if (h < 0) h += 1;
        if (h > 1) h -= 1;
      }
      return { h: h * 360, s: s * 100, v: v * 100 };
      break;

    case "yiq":
      var y = 0.299 * (value.r / 255) + 0.587 * (value.g / 255) + 0.114 * (value.b / 255);
      var i = 0.596 * (value.r / 255) + -0.274 * (value.g / 255) + -0.322 * (value.b / 255);
      var q = 0.211 * (value.r / 255) + -0.523 * (value.g / 255) + 0.312 * (value.b / 255);
      /* YIQ is not a transformation of RGB, so it's pretty lossy */
      i = helpers.bounded(i, [-0.5957, 0.5957]);
      q = helpers.bounded(q, [-0.5226, 0.5226]);
      return { y: y, i: i, q: q };
      break;

    /**
     * XYZ, used for XYZ dependants below as well
     */
    case "XYZ":
      var normalized = [value.r, value.g, value.b].map(function (v) {
        return v / 255;
      });

      var linear = normalized.map(function (V) {
        if (V <= 0.04045) return V / 12.92;
        return Math.pow((V + 0.055) / 1.055, 2.4);
      });

      // Observer is 2°
      // Whitepoint is D65
      // sRGB standard stuff eh!
      // [ Shamelessly stolen off Wikipedia ]
      var M = [[0.4124, 0.3576, 0.1805], [0.2126, 0.7152, 0.0722], [0.0193, 0.1192, 0.9505]];

      var _M$map$map = M.map(function (m) {
        return linear.reduce(function (acc, v, key) {
          return m[key] * v + acc;
        }, 0);
      }).map(function (o) {
        return o * 100;
      }),
          _M$map$map2 = _slicedToArray(_M$map$map, 3),
          X = _M$map$map2[0],
          Y = _M$map$map2[1],
          Z = _M$map$map2[2];

      return { X: X, Y: Y, Z: Z };
      break;

    /**
     * XYZ dependants
     */
    case "lms":
    case "cielab":
    case "xyY":
      var XYZ = operations.convert({ conversions: conversions, operations: operations, helpers: helpers }, "XYZ", value);
      return operations.convert({ conversions: conversions, operations: operations, helpers: helpers }, to, XYZ);
      break;
  }
}

module.exports = fromRgb;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function fromXYZ(_ref, to, value) {
  var conversions = _ref.conversions,
      operations = _ref.operations,
      helpers = _ref.helpers;

  switch (to) {

    case "rgb":
      var normalized = [value.X, value.Y, value.Z].map(function (v) {
        return v / 100;
      });

      // Observer is 2°
      // Whitepoint is D65
      // sRGB standard stuff eh!
      // [ Shamelessly stolen off Wikipedia ]
      var M = [[3.2406, -1.5372, -0.4986], [-0.9689, 1.8758, 0.0415], [0.0557, -0.2040, 1.0570]];

      var linear = M.map(function (m) {
        return normalized.reduce(function (acc, v, key) {
          return m[key] * v + acc;
        }, 0);
      });

      var _linear$map$map = linear.map(function (C) {
        if (C <= 0.0031308) return C * 12.92;
        return 1.055 * Math.pow(C, 1 / 2.4) - 0.055;
      }).map(function (o) {
        return o * 255;
      }),
          _linear$map$map2 = _slicedToArray(_linear$map$map, 3),
          r = _linear$map$map2[0],
          g = _linear$map$map2[1],
          b = _linear$map$map2[2];

      return helpers.boundedRgb({ r: r, g: g, b: b });

    case "lms":
      var valueArray = [value.X, value.Y, value.Z].map(function (x) {
        return x / 100;
      });

      // Bradford Transformation
      var Mb = [[0.8951000, 0.2664000, -0.1614000], [-0.7502000, 1.7135000, 0.0367000], [0.0389000, -0.0685000, 1.0296000]];

      var resultArray = Mb.map(function (m) {
        return valueArray.reduce(function (acc, v, key) {
          return m[key] * v + acc;
        }, 0);
      });

      return {
        rho: resultArray[0],
        gamma: resultArray[1],
        beta: resultArray[2]
      };

    case "cielab":
      var epsilon = 0.008856;
      var kappa = 903.3;
      var white = helpers.getIlluminant('D65');

      var Xr = value.X / white.X;
      var Yr = value.Y / white.Y;
      var Zr = value.Z / white.Z;

      var toF = function toF(x) {
        return x > epsilon ? helpers.cbrt(x) : (kappa * x + 16) / 116;
      };
      var Fx = toF(Xr),
          Fy = toF(Yr),
          Fz = toF(Zr);

      return {
        L: 116 * Fy - 16,
        a: 500 * (Fx - Fy),
        b: 200 * (Fy - Fz)
      };

    case "xyY":
      var x = value.X / (value.X + value.Y + value.Z);
      var y = value.Y / (value.X + value.Y + value.Z);

      return {
        x: x,
        y: y,
        Y: value.Y
      };

    default:
      var rgb = helpers.boundedRgb(operations.convert({ conversions: conversions, operations: operations, helpers: helpers }, "rgb", value));
      return operations.convert({ conversions: conversions, operations: operations, helpers: helpers }, to, rgb);

  }
}

module.exports = fromXYZ;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function fromYiq(_ref, to, value) {
  var conversions = _ref.conversions,
      operations = _ref.operations,
      helpers = _ref.helpers;

  /* YIQ is not a transformation of RGB, so it's pretty lossy */
  value.i = helpers.bounded(value.i, [-0.5957, 0.5957]);
  value.q = helpers.bounded(value.q, [-0.5226, 0.5226]);

  switch (to) {

    case "rgb":
      var r = 255 * (value.y + 0.956 * value.i + 0.621 * value.q);
      var g = 255 * (value.y + -0.272 * value.i + -0.647 * value.q);
      var b = 255 * (value.y + -1.106 * value.i + -1.703 * value.q);
      r = helpers.bounded(r, [0, 255]);
      g = helpers.bounded(g, [0, 255]);
      b = helpers.bounded(b, [0, 255]);
      return { r: r, g: g, b: b };

    default:
      var rgb = operations.convert({ conversions: conversions, operations: operations, helpers: helpers }, "rgb", value);
      return operations.convert({ conversions: conversions, operations: operations, helpers: helpers }, to, rgb);

  }
}

module.exports = fromYiq;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function fromxyY(_ref, to, value) {
  var conversions = _ref.conversions,
      operations = _ref.operations,
      helpers = _ref.helpers;

  switch (to) {
    /**
     * xyY is really just XYZ without tristimulus values.
     * Instead, the chroma. coords. are used in conjuction with the luminance from XYZ
     */
    case "XYZ":
      var X = value.Y / value.y * value.x;
      var Z = value.Y / value.y * (1 - value.x - value.y);

      return {
        X: X,
        Y: value.Y,
        Z: Z
      };

    default:
      var XYZ = operations.convert({ conversions: conversions, operations: operations, helpers: helpers }, "XYZ", value);
      return operations.convert({ conversions: conversions, operations: operations, helpers: helpers }, to, XYZ);

  }
}

module.exports = fromxyY;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function adapt(_dep, colourRef, illuminantDRef, illuminantSRef) {
  var colour = _dep.operations.convert(_dep, "XYZ", colourRef);
  var illuminantD = _dep.operations.convert(_dep, "lms", illuminantDRef);
  if (illuminantSRef) {
    var illuminantS = _dep.operations.convert(_dep, "lms", illuminantSRef);
  } else {
    var illuminantS = _dep.operations.convert(_dep, "lms", _dep.helpers.getIlluminant("D65"));
  }

  // Bradford Transformation
  var Mb = [[0.8951000, 0.2664000, -0.1614000], [-0.7502000, 1.7135000, 0.0367000], [0.0389000, -0.0685000, 1.0296000]];

  // Inverse Bradford Transformation
  var Mbi = [[0.9869929, -0.1470543, 0.1599627], [0.4323053, 0.5183603, 0.0492912], [-0.0085287, 0.0400428, 0.9684867]];

  // Illuminant Ratio Matrix
  var Mir = [[illuminantD.rho / illuminantS.rho, 0, 0], [0, illuminantD.gamma / illuminantS.gamma, 0], [0, 0, illuminantD.beta / illuminantS.beta]];

  // Illuminant ratio matrix, pre-inversion
  var MbiMir = _dep.helpers.matrixMultiply(Mbi, Mir);

  // Illuminant ratio matrix
  var M = _dep.helpers.matrixMultiply(MbiMir, Mb);

  var valueArray = [[colour.X], [colour.Y], [colour.Z]];
  var resultArray = _dep.helpers.matrixMultiply(M, valueArray);

  var result = {
    X: resultArray[0][0],
    Y: resultArray[1][0],
    Z: resultArray[2][0]
  };

  return _dep.helpers.ready(_dep, result);
}

module.exports = adapt;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function adjacent(_dep, deg, amount, colourRef) {
  var colour = _dep.operations.convert(_dep, "hsl", colourRef);
  var colours = [{ h: colour.h, s: colour.s, l: colour.l }];

  for (var i = 0; i < amount - 1; i++) {
    colour.h = _dep.helpers.negMod(colour.h + deg, 360);
    colours.push({ h: colour.h, s: colour.s, l: colour.l });
  }

  return _dep.helpers.ready(_dep, colours);
}

module.exports = adjacent;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function complementary(_dep, colourRef) {
  var colour = _dep.operations.convert(_dep, "hsl", colourRef);

  colour.h = (colour.h + 180) % 360;

  return _dep.helpers.ready(_dep, colour);
}

module.exports = complementary;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function contrast(_dep, shift, colourRef) {
  var colour = _dep.operations.convert(_dep, "rgb", colourRef);

  colour.r = ((colour.r / 255.0 - 0.5) * shift + 0.5) * 255.0;
  if (colour.r < 0) {
    colour.r = 0;
  } else if (colour.r > 255) {
    colour.r = 255;
  }

  colour.g = ((colour.g / 255.0 - 0.5) * shift + 0.5) * 255.0;
  if (colour.g < 0) {
    colour.g = 0;
  } else if (colour.g > 255) {
    colour.g = 255;
  }

  colour.b = ((colour.b / 255.0 - 0.5) * shift + 0.5) * 255.0;
  if (colour.b < 0) {
    colour.b = 0;
  } else if (colour.b > 255) {
    colour.b = 255;
  }

  return _dep.helpers.ready(_dep, colour);
}

module.exports = contrast;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function contrastRatio(_dep, colourRef) {
  var colour = _dep.operations.convert(_dep, "rgb", colourRef);

  var yiq = (colour.r * 299 + colour.g * 587 + colour.b * 114) / 1000;
  if (yiq >= 128) {
    colour = { r: 0, g: 0, b: 0 };
  } else {
    colour = { r: 255, g: 255, b: 255 };
  }

  return _dep.helpers.ready(_dep, colour);
}

module.exports = contrastRatio;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function convert(_dep, to, value) {
  if (Object.keys(_dep.conversions).indexOf(to) > -1) {
    if (value.colour) value = value.colour;else if (value.colours) value = value.colours;
    var from = _dep.helpers.determineMode(value);
    if (from != to) {
      return _dep.conversions[from].convert(_dep, to, value);
    } else {
      return value;
    }
  } else {
    return _dep.helpers.ready(_dep, to);
  }
}

module.exports = convert;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function difference(_dep, colourRefOne, colourRefTwo, l, c) {
  l = l || 1;
  c = c || 1;

  var Lab1 = _dep.operations.convert(_dep, "cielab", colourRefOne);
  var Lab2 = _dep.operations.convert(_dep, "cielab", colourRefTwo);

  var C1 = Math.sqrt(Math.pow(Lab1.a, 2) + Math.pow(Lab1.b, 2));
  var C2 = Math.sqrt(Math.pow(Lab2.a, 2) + Math.pow(Lab2.b, 2));
  var dC = C1 - C2;

  var dL = Lab1.L - Lab2.L;
  var da = Lab1.a - Lab2.a;
  var db = Lab1.b - Lab2.b;

  var dH = Math.sqrt(Math.pow(da, 2) + Math.pow(db, 2) - Math.pow(dC, 2));

  var SL = Lab1.L < 16 ? 0.511 : 0.040975 * Lab1.L / (1.01765 * Lab1.L);
  var SC = 0.0638 * C1 / (1.0131 * C1);

  var H = Math.atan2(Lab1.b, Lab1.a);
  var H1 = H >= 0 ? H : H + 360;

  var T = 164 <= H1 && H1 <= 345 ? 0.56 + Math.abs(0.2 * Math.cos(_dep.helpers.toRad(H1 + 168))) : 0.36 + Math.abs(0.4 * Math.cos(_dep.helpers.toRad(H1 + 35)));
  var F = Math.pow(C1, 4) / (Math.pow(C1, 4) + 1900);

  var SH = SC * (F * T + 1 - F);

  var EqPrt1 = Math.pow(dL / (l * SL), 2);
  var EqPrt2 = Math.pow(dC / (c * SC), 2);
  var EqPrt3 = Math.pow(dH / SH, 2);

  return Math.sqrt(EqPrt1 + EqPrt1 + EqPrt1);
}

module.exports = difference;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function fade(_dep, amount, fromRef, toRef) {
  var fromColour = _dep.operations.convert(_dep, "rgb", fromRef);
  var toColour = _dep.operations.convert(_dep, "rgb", toRef);

  var colours = [fromColour];
  amount = amount - 1;

  var rDiff = (toColour.r - fromColour.r) / amount;
  var gDiff = (toColour.g - fromColour.g) / amount;
  var bDiff = (toColour.b - fromColour.b) / amount;
  var colour = { r: fromColour.r, g: fromColour.g, b: fromColour.b };

  for (var i = 0; i < amount - 1; i++) {
    colour.r = _dep.helpers.slopeMod(colour.r + rDiff, 255);
    colour.g = _dep.helpers.slopeMod(colour.g + gDiff, 255);
    colour.b = _dep.helpers.slopeMod(colour.b + bDiff, 255);
    colours.push({ r: colour.r, g: colour.g, b: colour.b });
  }

  colours.push(toColour);

  return _dep.helpers.ready(_dep, colours);
}

module.exports = fade;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function greyscale(_dep, colourRef) {
  var colour = _dep.operations.convert(_dep, "rgb", colourRef);

  var grey = (colour.r + colour.g + colour.b) / 3;
  colour = { r: grey, g: grey, b: grey };

  return _dep.helpers.ready(_dep, colour);
}

module.exports = greyscale;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function hue(_dep, shift, colourRef) {
  var colour = _dep.operations.convert(_dep, "hsl", colourRef);

  colour.h = _dep.helpers.negMod(colour.h + shift, 360);

  return _dep.helpers.ready(_dep, colour);
}

module.exports = hue;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function invert(_dep, colourRef) {
  var colour = _dep.operations.convert(_dep, "rgb", colourRef);

  colour.r = _dep.helpers.negMod(255 - colour.r, 255);
  colour.g = _dep.helpers.negMod(255 - colour.g, 255);
  colour.b = _dep.helpers.negMod(255 - colour.b, 255);

  return _dep.helpers.ready(_dep, colour);
}

module.exports = invert;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function invertLightness(_dep, colourRef) {
  var colour = _dep.operations.convert(_dep, "hsl", colourRef);

  colour.l = 100 - colour.l;

  return _dep.helpers.ready(_dep, colour);
}

module.exports = invertLightness;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function mid(_dep, colourOneRef, colourTwoRef) {
  var colourOne = _dep.operations.convert(_dep, "hsl", colourOneRef);
  var colourTwo = _dep.operations.convert(_dep, "hsl", colourTwoRef);

  var midHue = (colourOne.h + colourTwo.h) / 2;
  var midSat = (colourOne.s + colourTwo.s) / 2;
  var midLight = (colourOne.l + colourTwo.l) / 2;
  var colour = { h: midHue, s: midSat, l: midLight };

  return _dep.helpers.ready(_dep, colour);
}

module.exports = mid;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function multiply(_dep, colourRefOne, colourRefTwo) {
  var c1 = _dep.operations.convert(_dep, "hsl", colourRefOne);
  var c2 = _dep.operations.convert(_dep, "hsl", colourRefTwo);

  var colour = { h: c1.h, s: c1.s, l: 100 * (c1.l / 100 * (c2.l / 100)) };
  colour.l = colour.l > 100 ? 100 : colour.l;
  colour.l = colour.l < 0 ? 0 : colour.l;

  return _dep.helpers.ready(_dep, colour);
}

module.exports = multiply;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function saturation(_dep, shift, colourRef) {
  var colour = _dep.operations.convert(_dep, "hsl", colourRef);

  colour.s = colour.s + shift;
  if (colour.s < 0) {
    colour.s = 0;
  } else if (colour.s > 100) {
    colour.s = 100;
  }

  return _dep.helpers.ready(_dep, colour);
}

module.exports = saturation;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function sepia(_dep, colourRef) {
  var colour = _dep.operations.convert(_dep, "rgb", colourRef);

  var newcolour = {};
  newcolour.r = colour.r * 0.393 + colour.g * 0.769 + colour.b * 0.189;
  newcolour.g = colour.r * 0.349 + colour.g * 0.686 + colour.b * 0.168;
  newcolour.b = colour.r * 0.272 + colour.g * 0.534 + colour.b * 0.131;

  return _dep.helpers.ready(_dep, newcolour);
}

module.exports = sepia;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function shade(_dep, shift, colourRef) {
  var colour = _dep.operations.convert(_dep, "hsl", colourRef);

  colour.l = colour.l + shift;
  if (colour.l < 0) {
    colour.l = 0;
  } else if (colour.l > 100) {
    colour.l = 100;
  }

  return _dep.helpers.ready(_dep, colour);
}

module.exports = shade;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function tetrad(_dep, colourRef) {
  var colour = _dep.operations.convert(_dep, "hsl", colourRef);

  var colours = [{ h: colour.h, s: colour.s, l: colour.l }];
  for (var i = 0; i < 3; i++) {
    colour.h = (colour.h + 90) % 360;
    colours.push({ h: colour.h, s: colour.s, l: colour.l });
  }

  return _dep.helpers.ready(_dep, colours);
}

module.exports = tetrad;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function triad(_dep, colourRef) {
  var colour = _dep.operations.convert(_dep, "hsl", colourRef);

  var colours = [{ h: colour.h, s: colour.s, l: colour.l }];
  for (var i = 0; i < 2; i++) {
    colour.h = (colour.h + 120) % 360;
    colours.push({ h: colour.h, s: colour.s, l: colour.l });
  }

  return _dep.helpers.ready(_dep, colours);
}

module.exports = triad;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Require dependencies
var dependencies = {
  conversions: __webpack_require__(1),
  operations: __webpack_require__(3),
  helpers: __webpack_require__(2) };
var constants = __webpack_require__(0);
var api = __webpack_require__(38);

module.exports = api(dependencies, constants);

/***/ }),
/* 36 */,
/* 37 */,
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var api = function api(dependencies, constants, chain) {
  // Apply colour functions to API object
  var out = Object.keys(dependencies.operations).reduce(function (acc, key) {
    var operation = dependencies.operations[key];
    acc[key] = function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var clone = args.slice(0).map(function (v) {
        if ((typeof v === 'undefined' ? 'undefined' : _typeof(v)) === 'object') return Object.assign({}, v);
        return v;
      });
      return operation.apply(undefined, [dependencies].concat(_toConsumableArray(clone), [chain ? chain.colour : undefined]));
    };
    return acc;
  }, {});

  // Apply constants to API object if not chained
  if (!chain) out = Object.assign(out, constants);

  return out;
};

module.exports = api;

/***/ })
/******/ ]);
});