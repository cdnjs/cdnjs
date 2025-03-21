(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Vibrant"] = factory();
	else
		root["Vibrant"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 18);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.assignDeep = exports.mapValues = void 0;
function mapValues(o, mapper) {
    var result = {};
    for (var key in o) {
        if (o.hasOwnProperty(key)) {
            var v = o[key];
            result[key] = mapper(v);
        }
    }
    return result;
}
exports.mapValues = mapValues;
/**
 * Overwrite values or properties on objects and lists recursively.
 * A shallow copy will be created for each array value.
 */
function assignDeep(target) {
    var sources = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        sources[_i - 1] = arguments[_i];
    }
    sources.forEach(function (s) {
        if (!s)
            return;
        for (var key in s) {
            if (s.hasOwnProperty(key)) {
                var v = s[key];
                if (Array.isArray(v)) {
                    // Shallow copy
                    target[key] = v.slice(0);
                }
                else if (typeof v === 'object') {
                    if (!target[key])
                        target[key] = {};
                    assignDeep(target[key], v);
                }
                else {
                    target[key] = v;
                }
            }
        }
    });
    return target;
}
exports.assignDeep = assignDeep;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var options_1 = __webpack_require__(7);
var builder_1 = __importDefault(__webpack_require__(8));
var utils_1 = __webpack_require__(0);
var Vibrant = /** @class */ (function () {
    function Vibrant(_src, opts) {
        this._src = _src;
        this.opts = utils_1.assignDeep({}, Vibrant.DefaultOpts, opts);
    }
    Vibrant.use = function (pipeline) {
        this._pipeline = pipeline;
    };
    Vibrant.from = function (src) {
        return new builder_1.default(src);
    };
    Object.defineProperty(Vibrant.prototype, "result", {
        get: function () {
            return this._result;
        },
        enumerable: false,
        configurable: true
    });
    Vibrant.prototype._process = function (image, opts) {
        var quantizer = this.opts.quantizer;
        image.scaleDown(this.opts);
        var processOpts = options_1.buildProcessOptions(this.opts, opts);
        return Vibrant._pipeline.process(image.getImageData(), processOpts);
    };
    Vibrant.prototype.palette = function () {
        return this.swatches();
    };
    Vibrant.prototype.swatches = function () {
        throw new Error('Method deprecated. Use `Vibrant.result.palettes[name]` instead');
    };
    Vibrant.prototype.getPalette = function () {
        var _this = this;
        var arg0 = arguments[0];
        var arg1 = arguments[1];
        var name = typeof arg0 === 'string' ? arg0 : 'default';
        var cb = typeof arg0 === 'string' ? arg1 : arg0;
        var image = new this.opts.ImageClass();
        return image
            .load(this._src)
            .then(function (image) { return _this._process(image, { generators: [name] }); })
            .then(function (result) {
            _this._result = result;
            return result.palettes[name];
        })
            .then(function (res) {
            image.remove();
            if (cb) {
                cb(undefined, res);
            }
            return res;
        })
            .catch(function (err) {
            image.remove();
            if (cb) {
                cb(err);
            }
            return Promise.reject(err);
        });
    };
    Vibrant.prototype.getPalettes = function () {
        var _this = this;
        var arg0 = arguments[0];
        var arg1 = arguments[1];
        var names = Array.isArray(arg0) ? arg0 : ['*'];
        var cb = Array.isArray(arg0) ? arg1 : arg0;
        var image = new this.opts.ImageClass();
        return image
            .load(this._src)
            .then(function (image) {
            return _this._process(image, {
                generators: names
            });
        })
            .then(function (result) {
            _this._result = result;
            return result.palettes;
        })
            .then(function (res) {
            image.remove();
            if (cb) {
                cb(undefined, res);
            }
            return res;
        })
            .catch(function (err) {
            image.remove();
            if (cb) {
                cb(err);
            }
            return Promise.reject(err);
        });
    };
    Vibrant.DefaultOpts = {
        colorCount: 64,
        quality: 5,
        filters: []
    };
    return Vibrant;
}());
exports.default = Vibrant;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.applyFilters = exports.ImageBase = void 0;
var ImageBase = /** @class */ (function () {
    function ImageBase() {
    }
    ImageBase.prototype.scaleDown = function (opts) {
        var width = this.getWidth();
        var height = this.getHeight();
        var ratio = 1;
        if (opts.maxDimension > 0) {
            var maxSide = Math.max(width, height);
            if (maxSide > opts.maxDimension)
                ratio = opts.maxDimension / maxSide;
        }
        else {
            ratio = 1 / opts.quality;
        }
        if (ratio < 1)
            this.resize(width * ratio, height * ratio, ratio);
    };
    return ImageBase;
}());
exports.ImageBase = ImageBase;
function applyFilters(imageData, filters) {
    if (filters.length > 0) {
        var pixels = imageData.data;
        var n = pixels.length / 4;
        var offset = void 0;
        var r = void 0;
        var g = void 0;
        var b = void 0;
        var a = void 0;
        for (var i = 0; i < n; i++) {
            offset = i * 4;
            r = pixels[offset + 0];
            g = pixels[offset + 1];
            b = pixels[offset + 2];
            a = pixels[offset + 3];
            // Mark ignored color
            for (var j = 0; j < filters.length; j++) {
                if (!filters[j](r, g, b, a)) {
                    pixels[offset + 3] = 0;
                    break;
                }
            }
        }
    }
    return imageData;
}
exports.applyFilters = applyFilters;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Swatch = void 0;
var converter_1 = __webpack_require__(4);
var Swatch = /** @class */ (function () {
    function Swatch(rgb, population) {
        this._rgb = rgb;
        this._population = population;
    }
    Swatch.applyFilters = function (colors, filters) {
        return filters.length > 0
            ? colors.filter(function (_a) {
                var r = _a.r, g = _a.g, b = _a.b;
                for (var j = 0; j < filters.length; j++) {
                    if (!filters[j](r, g, b, 255))
                        return false;
                }
                return true;
            })
            : colors;
    };
    /**
     * Make a value copy of a swatch based on a previous one. Returns a new Swatch instance
     * @param {Swatch} swatch
     */
    Swatch.clone = function (swatch) {
        return new Swatch(swatch._rgb, swatch._population);
    };
    Object.defineProperty(Swatch.prototype, "r", {
        /**
         * The red value in the RGB value
         */
        get: function () {
            return this._rgb[0];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Swatch.prototype, "g", {
        /**
         * The green value in the RGB value
         */
        get: function () {
            return this._rgb[1];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Swatch.prototype, "b", {
        /**
         * The blue value in the RGB value
         */
        get: function () {
            return this._rgb[2];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Swatch.prototype, "rgb", {
        /**
         * The color value as a rgb value
         */
        get: function () {
            return this._rgb;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Swatch.prototype, "hsl", {
        /**
         * The color value as a hsl value
         */
        get: function () {
            if (!this._hsl) {
                var _a = this._rgb, r = _a[0], g = _a[1], b = _a[2];
                this._hsl = converter_1.rgbToHsl(r, g, b);
            }
            return this._hsl;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Swatch.prototype, "hex", {
        /**
         * The color value as a hex string
         */
        get: function () {
            if (!this._hex) {
                var _a = this._rgb, r = _a[0], g = _a[1], b = _a[2];
                this._hex = converter_1.rgbToHex(r, g, b);
            }
            return this._hex;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Swatch.prototype, "population", {
        get: function () {
            return this._population;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Get the JSON object for the swatch
     */
    Swatch.prototype.toJSON = function () {
        return {
            rgb: this.rgb,
            population: this.population
        };
    };
    /**
     * Get the color value as a rgb value
     * @deprecated Use property instead
     */
    // TODO: deprecate internally, use property instead
    Swatch.prototype.getRgb = function () {
        return this._rgb;
    };
    /**
     * Get the color value as a hsl value
     * @deprecated Use property instead
     */
    // TODO: deprecate internally, use property instead
    Swatch.prototype.getHsl = function () {
        return this.hsl;
    };
    /**
     * @deprecated Use property instead
     */
    // TODO: deprecate internally, use property instead
    Swatch.prototype.getPopulation = function () {
        return this._population;
    };
    /**
     * Get the color value as a hex string
     * @deprecated Use property instead
     */
    // TODO: deprecate internally, use property instead
    Swatch.prototype.getHex = function () {
        return this.hex;
    };
    Swatch.prototype.getYiq = function () {
        if (!this._yiq) {
            var rgb = this._rgb;
            this._yiq = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
        }
        return this._yiq;
    };
    Object.defineProperty(Swatch.prototype, "titleTextColor", {
        get: function () {
            if (this._titleTextColor) {
                this._titleTextColor = this.getYiq() < 200 ? '#fff' : '#000';
            }
            return this._titleTextColor;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Swatch.prototype, "bodyTextColor", {
        get: function () {
            if (this._bodyTextColor) {
                this._bodyTextColor = this.getYiq() < 150 ? '#fff' : '#000';
            }
            return this._bodyTextColor;
        },
        enumerable: false,
        configurable: true
    });
    Swatch.prototype.getTitleTextColor = function () {
        return this.titleTextColor;
    };
    Swatch.prototype.getBodyTextColor = function () {
        return this.bodyTextColor;
    };
    return Swatch;
}());
exports.Swatch = Swatch;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.getColorDiffStatus = exports.hexDiff = exports.rgbDiff = exports.deltaE94 = exports.rgbToCIELab = exports.xyzToCIELab = exports.rgbToXyz = exports.hslToRgb = exports.rgbToHsl = exports.rgbToHex = exports.hexToRgb = exports.DELTAE94_DIFF_STATUS = void 0;
exports.DELTAE94_DIFF_STATUS = {
    NA: 0,
    PERFECT: 1,
    CLOSE: 2,
    GOOD: 10,
    SIMILAR: 50
};
/**
 * Converts hex string to RGB
 * @param hex - The hex value you with to get the RGB value of
 * @returns an array in the order of `red, green, blue` numerical values
 */
function hexToRgb(hex) {
    var m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!m)
        throw new RangeError("'" + hex + "' is not a valid hex color");
    return [m[1], m[2], m[3]].map(function (s) { return parseInt(s, 16); });
}
exports.hexToRgb = hexToRgb;
/**
 * Given values for an RGB color convert to and return a valid HEX string
 * @param r - Red value in RGB
 * @param g - Green value in RGB
 * @param b - Blue value in RGB
 * @returns a valid hex string with pre-pending pound sign
 */
function rgbToHex(r, g, b) {
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1, 7);
}
exports.rgbToHex = rgbToHex;
/**
 * Given values for an RGB color convert to and return a valid HSL value
 * @param r - Red value in RGB
 * @param g - Green value in RGB
 * @param b - Blue value in RGB
 * @returns an array in the order of `hue, saturation, light` numerical values
 */
function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var h = 0;
    var s = 0;
    var l = (max + min) / 2;
    if (max !== min) {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }
    return [h, s, l];
}
exports.rgbToHsl = rgbToHsl;
function hslToRgb(h, s, l) {
    var r;
    var g;
    var b;
    function hue2rgb(p, q, t) {
        if (t < 0)
            t += 1;
        if (t > 1)
            t -= 1;
        if (t < 1 / 6)
            return p + (q - p) * 6 * t;
        if (t < 1 / 2)
            return q;
        if (t < 2 / 3)
            return p + (q - p) * (2 / 3 - t) * 6;
        return p;
    }
    if (s === 0) {
        r = g = b = l;
    }
    else {
        var q = l < 0.5 ? l * (1 + s) : l + s - (l * s);
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - (1 / 3));
    }
    return [
        r * 255,
        g * 255,
        b * 255
    ];
}
exports.hslToRgb = hslToRgb;
function rgbToXyz(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    r = r > 0.04045 ? Math.pow((r + 0.005) / 1.055, 2.4) : r / 12.92;
    g = g > 0.04045 ? Math.pow((g + 0.005) / 1.055, 2.4) : g / 12.92;
    b = b > 0.04045 ? Math.pow((b + 0.005) / 1.055, 2.4) : b / 12.92;
    r *= 100;
    g *= 100;
    b *= 100;
    var x = r * 0.4124 + g * 0.3576 + b * 0.1805;
    var y = r * 0.2126 + g * 0.7152 + b * 0.0722;
    var z = r * 0.0193 + g * 0.1192 + b * 0.9505;
    return [x, y, z];
}
exports.rgbToXyz = rgbToXyz;
function xyzToCIELab(x, y, z) {
    var REF_X = 95.047;
    var REF_Y = 100;
    var REF_Z = 108.883;
    x /= REF_X;
    y /= REF_Y;
    z /= REF_Z;
    x = x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
    y = y > 0.008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
    z = z > 0.008856 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;
    var L = 116 * y - 16;
    var a = 500 * (x - y);
    var b = 200 * (y - z);
    return [L, a, b];
}
exports.xyzToCIELab = xyzToCIELab;
function rgbToCIELab(r, g, b) {
    var _a = rgbToXyz(r, g, b), x = _a[0], y = _a[1], z = _a[2];
    return xyzToCIELab(x, y, z);
}
exports.rgbToCIELab = rgbToCIELab;
function deltaE94(lab1, lab2) {
    var WEIGHT_L = 1;
    var WEIGHT_C = 1;
    var WEIGHT_H = 1;
    var L1 = lab1[0], a1 = lab1[1], b1 = lab1[2];
    var L2 = lab2[0], a2 = lab2[1], b2 = lab2[2];
    var dL = L1 - L2;
    var da = a1 - a2;
    var db = b1 - b2;
    var xC1 = Math.sqrt(a1 * a1 + b1 * b1);
    var xC2 = Math.sqrt(a2 * a2 + b2 * b2);
    var xDL = L2 - L1;
    var xDC = xC2 - xC1;
    var xDE = Math.sqrt(dL * dL + da * da + db * db);
    var xDH = (Math.sqrt(xDE) > Math.sqrt(Math.abs(xDL)) + Math.sqrt(Math.abs(xDC)))
        ? Math.sqrt(xDE * xDE - xDL * xDL - xDC * xDC)
        : 0;
    var xSC = 1 + 0.045 * xC1;
    var xSH = 1 + 0.015 * xC1;
    xDL /= WEIGHT_L;
    xDC /= WEIGHT_C * xSC;
    xDH /= WEIGHT_H * xSH;
    return Math.sqrt(xDL * xDL + xDC * xDC + xDH * xDH);
}
exports.deltaE94 = deltaE94;
function rgbDiff(rgb1, rgb2) {
    var lab1 = rgbToCIELab.apply(undefined, rgb1);
    var lab2 = rgbToCIELab.apply(undefined, rgb2);
    return deltaE94(lab1, lab2);
}
exports.rgbDiff = rgbDiff;
function hexDiff(hex1, hex2) {
    var rgb1 = hexToRgb(hex1);
    var rgb2 = hexToRgb(hex2);
    return rgbDiff(rgb1, rgb2);
}
exports.hexDiff = hexDiff;
function getColorDiffStatus(d) {
    if (d < exports.DELTAE94_DIFF_STATUS.NA) {
        return 'N/A';
    }
    // Not perceptible by human eyes
    if (d <= exports.DELTAE94_DIFF_STATUS.PERFECT) {
        return 'Perfect';
    }
    // Perceptible through close observation
    if (d <= exports.DELTAE94_DIFF_STATUS.CLOSE) {
        return 'Close';
    }
    // Perceptible at a glance
    if (d <= exports.DELTAE94_DIFF_STATUS.GOOD) {
        return 'Good';
    }
    // Colors are more similar than opposite
    if (d < exports.DELTAE94_DIFF_STATUS.SIMILAR) {
        return 'Similar';
    }
    return 'Wrong';
}
exports.getColorDiffStatus = getColorDiffStatus;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var config_1 = __importDefault(__webpack_require__(6));
var image_browser_1 = __importDefault(__webpack_require__(9));
config_1.default.DefaultOpts.ImageClass = image_browser_1.default;
module.exports = config_1.default;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __importDefault(__webpack_require__(1));
core_1.default.DefaultOpts.quantizer = 'mmcq';
core_1.default.DefaultOpts.generators = ['default'];
core_1.default.DefaultOpts.filters = ['default'];
exports.default = core_1.default;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.buildProcessOptions = void 0;
var utils_1 = __webpack_require__(0);
function buildProcessOptions(opts, override) {
    var colorCount = opts.colorCount, quantizer = opts.quantizer, generators = opts.generators, filters = opts.filters;
    // Merge with common quantizer options
    var commonQuantizerOpts = { colorCount: colorCount };
    var q = typeof quantizer === 'string'
        ? { name: quantizer, options: {} }
        : quantizer;
    q.options = utils_1.assignDeep({}, commonQuantizerOpts, q.options);
    return utils_1.assignDeep({}, {
        quantizer: q,
        generators: generators,
        filters: filters
    }, override);
}
exports.buildProcessOptions = buildProcessOptions;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = __importDefault(__webpack_require__(1));
var utils_1 = __webpack_require__(0);
var Builder = /** @class */ (function () {
    function Builder(src, opts) {
        if (opts === void 0) { opts = {}; }
        this._src = src;
        this._opts = utils_1.assignDeep({}, _1.default.DefaultOpts, opts);
    }
    Builder.prototype.maxColorCount = function (n) {
        this._opts.colorCount = n;
        return this;
    };
    Builder.prototype.maxDimension = function (d) {
        this._opts.maxDimension = d;
        return this;
    };
    Builder.prototype.addFilter = function (name) {
        if (!this._opts.filters) {
            this._opts.filters = [name];
        }
        else {
            this._opts.filters.push(name);
        }
        return this;
    };
    Builder.prototype.removeFilter = function (name) {
        if (this._opts.filters) {
            var i = this._opts.filters.indexOf(name);
            if (i > 0)
                this._opts.filters.splice(i);
        }
        return this;
    };
    Builder.prototype.clearFilters = function () {
        this._opts.filters = [];
        return this;
    };
    Builder.prototype.quality = function (q) {
        this._opts.quality = q;
        return this;
    };
    Builder.prototype.useImageClass = function (imageClass) {
        this._opts.ImageClass = imageClass;
        return this;
    };
    Builder.prototype.useGenerator = function (generator, options) {
        if (!this._opts.generators)
            this._opts.generators = [];
        this._opts.generators.push(options ? { name: generator, options: options } : generator);
        return this;
    };
    Builder.prototype.useQuantizer = function (quantizer, options) {
        this._opts.quantizer = options ? { name: quantizer, options: options } : quantizer;
        return this;
    };
    Builder.prototype.build = function () {
        return new _1.default(this._src, this._opts);
    };
    Builder.prototype.getPalette = function (cb) {
        return this.build().getPalette(cb);
    };
    Builder.prototype.getSwatches = function (cb) {
        return this.build().getPalette(cb);
    };
    return Builder;
}());
exports.default = Builder;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var image_1 = __webpack_require__(2);
function isRelativeUrl(url) {
    var u = new URL(url, location.href);
    return u.protocol === location.protocol &&
        u.host === location.host &&
        u.port === location.port;
}
function isSameOrigin(a, b) {
    var ua = new URL(a);
    var ub = new URL(b);
    // https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy
    return (ua.protocol === ub.protocol &&
        ua.hostname === ub.hostname &&
        ua.port === ub.port);
}
var BrowserImage = /** @class */ (function (_super) {
    __extends(BrowserImage, _super);
    function BrowserImage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BrowserImage.prototype._initCanvas = function () {
        var img = this.image;
        var canvas = (this._canvas = document.createElement('canvas'));
        var context = (canvas.getContext('2d'));
        if (!context)
            throw new ReferenceError('Failed to create canvas context');
        this._context = context;
        canvas.className = '@vibrant/canvas';
        canvas.style.display = 'none';
        this._width = canvas.width = img.width;
        this._height = canvas.height = img.height;
        context.drawImage(img, 0, 0);
        document.body.appendChild(canvas);
    };
    BrowserImage.prototype.load = function (image) {
        var _this = this;
        var img;
        var src;
        if (typeof image === 'string') {
            img = document.createElement('img');
            src = image;
            if (!isRelativeUrl(src) && !isSameOrigin(window.location.href, src)) {
                img.crossOrigin = 'anonymous';
            }
            img.src = src;
        }
        else if (image instanceof HTMLImageElement) {
            img = image;
            src = image.src;
        }
        else {
            return Promise.reject(new Error("Cannot load buffer as an image in browser"));
        }
        this.image = img;
        return new Promise(function (resolve, reject) {
            var onImageLoad = function () {
                _this._initCanvas();
                resolve(_this);
            };
            if (img.complete) {
                // Already loaded
                onImageLoad();
            }
            else {
                img.onload = onImageLoad;
                img.onerror = function (e) { return reject(new Error("Fail to load image: " + src)); };
            }
        });
    };
    BrowserImage.prototype.clear = function () {
        this._context.clearRect(0, 0, this._width, this._height);
    };
    BrowserImage.prototype.update = function (imageData) {
        this._context.putImageData(imageData, 0, 0);
    };
    BrowserImage.prototype.getWidth = function () {
        return this._width;
    };
    BrowserImage.prototype.getHeight = function () {
        return this._height;
    };
    BrowserImage.prototype.resize = function (targetWidth, targetHeight, ratio) {
        var _a = this, canvas = _a._canvas, context = _a._context, img = _a.image;
        this._width = canvas.width = targetWidth;
        this._height = canvas.height = targetHeight;
        context.scale(ratio, ratio);
        context.drawImage(img, 0, 0);
    };
    BrowserImage.prototype.getPixelCount = function () {
        return this._width * this._height;
    };
    BrowserImage.prototype.getImageData = function () {
        return this._context.getImageData(0, 0, this._width, this._height);
    };
    BrowserImage.prototype.remove = function () {
        if (this._canvas && this._canvas.parentNode) {
            this._canvas.parentNode.removeChild(this._canvas);
        }
    };
    return BrowserImage;
}(image_1.ImageBase));
exports.default = BrowserImage;


/***/ }),
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Vibrant = __webpack_require__(5);
var client_1 = __webpack_require__(19);
var PipelineWorker = __webpack_require__(23);
Vibrant.use(new client_1.WorkerPipeline(PipelineWorker));
module.exports = Vibrant;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkerPipeline = void 0;
var worker_1 = __importDefault(__webpack_require__(20));
var color_1 = __webpack_require__(3);
var utils_1 = __webpack_require__(0);
/**
 * Client side (runs in UI thread)
 */
var WorkerPipeline = /** @class */ (function () {
    function WorkerPipeline(PipelineWorker) {
        this.PipelineWorker = PipelineWorker;
        this._manager = new worker_1.default();
        this._manager.register('pipeline', PipelineWorker);
    }
    WorkerPipeline.prototype._rehydrate = function (result) {
        var colors = result.colors, palettes = result.palettes;
        result.colors = colors.map(function (s) { return color_1.Swatch.clone(s); });
        result.palettes = utils_1.mapValues(palettes, function (p) { return utils_1.mapValues(p, function (c) { return c ? color_1.Swatch.clone(c) : null; }); });
        return result;
    };
    WorkerPipeline.prototype.process = function (imageData, opts) {
        var _this = this;
        return this._manager.invokeWorker('pipeline', [imageData, opts], [imageData.data.buffer])
            .then(function (result) { return _this._rehydrate(result); });
    };
    return WorkerPipeline;
}());
exports.WorkerPipeline = WorkerPipeline;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var pool_1 = __importDefault(__webpack_require__(21));
var WorkerManager = /** @class */ (function () {
    function WorkerManager() {
        this._pools = {};
    }
    WorkerManager.prototype.register = function (name, WorkerClass) {
        this._pools[name] = new pool_1.default(WorkerClass);
    };
    WorkerManager.prototype.hasWorker = function (name) {
        return !!this._pools[name];
    };
    WorkerManager.prototype.getWorker = function (name) {
        return this._pools[name];
    };
    WorkerManager.prototype.invokeWorker = function (name, args, transferList) {
        return this.hasWorker(name)
            ? this.getWorker(name).invoke(args, transferList)
            : Promise.reject("Worker '" + name + "' does not exist");
    };
    return WorkerManager;
}());
exports.default = WorkerManager;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = __webpack_require__(22);
// const WorkerClass: TaskWorkerClass = require('worker-loader?inline=true!./worker')
var MAX_WORKER_COUNT = 5;
var WorkerPool = /** @class */ (function () {
    function WorkerPool(WorkerClass) {
        this.WorkerClass = WorkerClass;
        this._taskId = 0;
        this._workers = [];
        this._queue = [];
        this._executing = {};
    }
    WorkerPool.prototype._findIdleWorker = function () {
        var worker;
        // if no idle worker && worker count < max count, make new one
        if (this._workers.length === 0 || this._workers.length < MAX_WORKER_COUNT) {
            worker = new this.WorkerClass();
            worker.id = this._workers.length;
            worker.idle = true;
            this._workers.push(worker);
            worker.onmessage = this._onMessage.bind(this, worker.id);
        }
        else {
            worker = this._workers.find(function (_a) {
                var idle = _a.idle;
                return idle;
            });
        }
        return worker;
    };
    WorkerPool.prototype._enqueue = function (payload, transferList) {
        var d = types_1.defer();
        // make task item
        var task = {
            id: this._taskId++,
            payload: payload,
            transferList: transferList,
            deferred: d
        };
        this._queue.push(task);
        // Try dequeue
        this._tryDequeue();
        return d.promise;
    };
    WorkerPool.prototype._tryDequeue = function () {
        // Called when a work has finished or from _enqueue
        // No pending task
        if (this._queue.length <= 0)
            return;
        // Find idle worker
        var worker = this._findIdleWorker();
        // No idle worker
        if (!worker)
            return;
        // Dequeue task
        var task = this._queue.shift();
        this._executing[task.id] = task;
        // Send payload
        var transfers = task.transferList;
        var deferred = task.deferred, transferList = task.transferList, request = __rest(task, ["deferred", "transferList"]);
        worker.postMessage(request, transfers);
        worker.idle = false;
    };
    WorkerPool.prototype._onMessage = function (workerId, event) {
        var data = event.data;
        if (!data)
            return;
        // Worker should send result along with payload id
        var id = data.id;
        // Task is looked up by id
        var task = this._executing[id];
        delete this._executing[id];
        // Resolve or reject deferred promise
        switch (data.type) {
            case 'return':
                task.deferred.resolve(data.payload);
                break;
            case 'error':
                task.deferred.reject(new Error(data.payload));
                break;
        }
        // Update worker status
        this._workers[workerId].idle = true;
        // Try dequeue next task
        this._tryDequeue();
    };
    WorkerPool.prototype.invoke = function (args, transferList) {
        return this._enqueue(args, transferList);
    };
    return WorkerPool;
}());
exports.default = WorkerPool;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.defer = exports.Defer = void 0;
var Defer = /** @class */ (function () {
    function Defer() {
        var _this = this;
        this.promise = new Promise(function (_resolve, _reject) {
            _this.resolve = _resolve;
            _this.reject = _reject;
        });
    }
    return Defer;
}());
exports.Defer = Defer;
function defer() {
    return new Defer();
}
exports.defer = defer;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = function() {
  return __webpack_require__(24)("/******/ (function(modules) { // webpackBootstrap\n/******/ \t// The module cache\n/******/ \tvar installedModules = {};\n/******/\n/******/ \t// The require function\n/******/ \tfunction __webpack_require__(moduleId) {\n/******/\n/******/ \t\t// Check if module is in cache\n/******/ \t\tif(installedModules[moduleId]) {\n/******/ \t\t\treturn installedModules[moduleId].exports;\n/******/ \t\t}\n/******/ \t\t// Create a new module (and put it into the cache)\n/******/ \t\tvar module = installedModules[moduleId] = {\n/******/ \t\t\ti: moduleId,\n/******/ \t\t\tl: false,\n/******/ \t\t\texports: {}\n/******/ \t\t};\n/******/\n/******/ \t\t// Execute the module function\n/******/ \t\tmodules[moduleId].call(module.exports, module, module.exports, __webpack_require__);\n/******/\n/******/ \t\t// Flag the module as loaded\n/******/ \t\tmodule.l = true;\n/******/\n/******/ \t\t// Return the exports of the module\n/******/ \t\treturn module.exports;\n/******/ \t}\n/******/\n/******/\n/******/ \t// expose the modules object (__webpack_modules__)\n/******/ \t__webpack_require__.m = modules;\n/******/\n/******/ \t// expose the module cache\n/******/ \t__webpack_require__.c = installedModules;\n/******/\n/******/ \t// define getter function for harmony exports\n/******/ \t__webpack_require__.d = function(exports, name, getter) {\n/******/ \t\tif(!__webpack_require__.o(exports, name)) {\n/******/ \t\t\tObject.defineProperty(exports, name, { enumerable: true, get: getter });\n/******/ \t\t}\n/******/ \t};\n/******/\n/******/ \t// define __esModule on exports\n/******/ \t__webpack_require__.r = function(exports) {\n/******/ \t\tif(typeof Symbol !== 'undefined' && Symbol.toStringTag) {\n/******/ \t\t\tObject.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });\n/******/ \t\t}\n/******/ \t\tObject.defineProperty(exports, '__esModule', { value: true });\n/******/ \t};\n/******/\n/******/ \t// create a fake namespace object\n/******/ \t// mode & 1: value is a module id, require it\n/******/ \t// mode & 2: merge all properties of value into the ns\n/******/ \t// mode & 4: return value when already ns object\n/******/ \t// mode & 8|1: behave like require\n/******/ \t__webpack_require__.t = function(value, mode) {\n/******/ \t\tif(mode & 1) value = __webpack_require__(value);\n/******/ \t\tif(mode & 8) return value;\n/******/ \t\tif((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;\n/******/ \t\tvar ns = Object.create(null);\n/******/ \t\t__webpack_require__.r(ns);\n/******/ \t\tObject.defineProperty(ns, 'default', { enumerable: true, value: value });\n/******/ \t\tif(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));\n/******/ \t\treturn ns;\n/******/ \t};\n/******/\n/******/ \t// getDefaultExport function for compatibility with non-harmony modules\n/******/ \t__webpack_require__.n = function(module) {\n/******/ \t\tvar getter = module && module.__esModule ?\n/******/ \t\t\tfunction getDefault() { return module['default']; } :\n/******/ \t\t\tfunction getModuleExports() { return module; };\n/******/ \t\t__webpack_require__.d(getter, 'a', getter);\n/******/ \t\treturn getter;\n/******/ \t};\n/******/\n/******/ \t// Object.prototype.hasOwnProperty.call\n/******/ \t__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };\n/******/\n/******/ \t// __webpack_public_path__\n/******/ \t__webpack_require__.p = \"\";\n/******/\n/******/\n/******/ \t// Load entry module and return exports\n/******/ \treturn __webpack_require__(__webpack_require__.s = 2);\n/******/ })\n/************************************************************************/\n/******/ ([\n/* 0 */\n/***/ (function(module, exports, __webpack_require__) {\n\n\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.Swatch = void 0;\nvar converter_1 = __webpack_require__(1);\nvar Swatch = /** @class */ (function () {\n    function Swatch(rgb, population) {\n        this._rgb = rgb;\n        this._population = population;\n    }\n    Swatch.applyFilters = function (colors, filters) {\n        return filters.length > 0\n            ? colors.filter(function (_a) {\n                var r = _a.r, g = _a.g, b = _a.b;\n                for (var j = 0; j < filters.length; j++) {\n                    if (!filters[j](r, g, b, 255))\n                        return false;\n                }\n                return true;\n            })\n            : colors;\n    };\n    /**\n     * Make a value copy of a swatch based on a previous one. Returns a new Swatch instance\n     * @param {Swatch} swatch\n     */\n    Swatch.clone = function (swatch) {\n        return new Swatch(swatch._rgb, swatch._population);\n    };\n    Object.defineProperty(Swatch.prototype, \"r\", {\n        /**\n         * The red value in the RGB value\n         */\n        get: function () {\n            return this._rgb[0];\n        },\n        enumerable: false,\n        configurable: true\n    });\n    Object.defineProperty(Swatch.prototype, \"g\", {\n        /**\n         * The green value in the RGB value\n         */\n        get: function () {\n            return this._rgb[1];\n        },\n        enumerable: false,\n        configurable: true\n    });\n    Object.defineProperty(Swatch.prototype, \"b\", {\n        /**\n         * The blue value in the RGB value\n         */\n        get: function () {\n            return this._rgb[2];\n        },\n        enumerable: false,\n        configurable: true\n    });\n    Object.defineProperty(Swatch.prototype, \"rgb\", {\n        /**\n         * The color value as a rgb value\n         */\n        get: function () {\n            return this._rgb;\n        },\n        enumerable: false,\n        configurable: true\n    });\n    Object.defineProperty(Swatch.prototype, \"hsl\", {\n        /**\n         * The color value as a hsl value\n         */\n        get: function () {\n            if (!this._hsl) {\n                var _a = this._rgb, r = _a[0], g = _a[1], b = _a[2];\n                this._hsl = converter_1.rgbToHsl(r, g, b);\n            }\n            return this._hsl;\n        },\n        enumerable: false,\n        configurable: true\n    });\n    Object.defineProperty(Swatch.prototype, \"hex\", {\n        /**\n         * The color value as a hex string\n         */\n        get: function () {\n            if (!this._hex) {\n                var _a = this._rgb, r = _a[0], g = _a[1], b = _a[2];\n                this._hex = converter_1.rgbToHex(r, g, b);\n            }\n            return this._hex;\n        },\n        enumerable: false,\n        configurable: true\n    });\n    Object.defineProperty(Swatch.prototype, \"population\", {\n        get: function () {\n            return this._population;\n        },\n        enumerable: false,\n        configurable: true\n    });\n    /**\n     * Get the JSON object for the swatch\n     */\n    Swatch.prototype.toJSON = function () {\n        return {\n            rgb: this.rgb,\n            population: this.population\n        };\n    };\n    /**\n     * Get the color value as a rgb value\n     * @deprecated Use property instead\n     */\n    // TODO: deprecate internally, use property instead\n    Swatch.prototype.getRgb = function () {\n        return this._rgb;\n    };\n    /**\n     * Get the color value as a hsl value\n     * @deprecated Use property instead\n     */\n    // TODO: deprecate internally, use property instead\n    Swatch.prototype.getHsl = function () {\n        return this.hsl;\n    };\n    /**\n     * @deprecated Use property instead\n     */\n    // TODO: deprecate internally, use property instead\n    Swatch.prototype.getPopulation = function () {\n        return this._population;\n    };\n    /**\n     * Get the color value as a hex string\n     * @deprecated Use property instead\n     */\n    // TODO: deprecate internally, use property instead\n    Swatch.prototype.getHex = function () {\n        return this.hex;\n    };\n    Swatch.prototype.getYiq = function () {\n        if (!this._yiq) {\n            var rgb = this._rgb;\n            this._yiq = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;\n        }\n        return this._yiq;\n    };\n    Object.defineProperty(Swatch.prototype, \"titleTextColor\", {\n        get: function () {\n            if (this._titleTextColor) {\n                this._titleTextColor = this.getYiq() < 200 ? '#fff' : '#000';\n            }\n            return this._titleTextColor;\n        },\n        enumerable: false,\n        configurable: true\n    });\n    Object.defineProperty(Swatch.prototype, \"bodyTextColor\", {\n        get: function () {\n            if (this._bodyTextColor) {\n                this._bodyTextColor = this.getYiq() < 150 ? '#fff' : '#000';\n            }\n            return this._bodyTextColor;\n        },\n        enumerable: false,\n        configurable: true\n    });\n    Swatch.prototype.getTitleTextColor = function () {\n        return this.titleTextColor;\n    };\n    Swatch.prototype.getBodyTextColor = function () {\n        return this.bodyTextColor;\n    };\n    return Swatch;\n}());\nexports.Swatch = Swatch;\n\n\n/***/ }),\n/* 1 */\n/***/ (function(module, exports, __webpack_require__) {\n\n\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.getColorDiffStatus = exports.hexDiff = exports.rgbDiff = exports.deltaE94 = exports.rgbToCIELab = exports.xyzToCIELab = exports.rgbToXyz = exports.hslToRgb = exports.rgbToHsl = exports.rgbToHex = exports.hexToRgb = exports.DELTAE94_DIFF_STATUS = void 0;\nexports.DELTAE94_DIFF_STATUS = {\n    NA: 0,\n    PERFECT: 1,\n    CLOSE: 2,\n    GOOD: 10,\n    SIMILAR: 50\n};\n/**\n * Converts hex string to RGB\n * @param hex - The hex value you with to get the RGB value of\n * @returns an array in the order of `red, green, blue` numerical values\n */\nfunction hexToRgb(hex) {\n    var m = /^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(hex);\n    if (!m)\n        throw new RangeError(\"'\" + hex + \"' is not a valid hex color\");\n    return [m[1], m[2], m[3]].map(function (s) { return parseInt(s, 16); });\n}\nexports.hexToRgb = hexToRgb;\n/**\n * Given values for an RGB color convert to and return a valid HEX string\n * @param r - Red value in RGB\n * @param g - Green value in RGB\n * @param b - Blue value in RGB\n * @returns a valid hex string with pre-pending pound sign\n */\nfunction rgbToHex(r, g, b) {\n    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1, 7);\n}\nexports.rgbToHex = rgbToHex;\n/**\n * Given values for an RGB color convert to and return a valid HSL value\n * @param r - Red value in RGB\n * @param g - Green value in RGB\n * @param b - Blue value in RGB\n * @returns an array in the order of `hue, saturation, light` numerical values\n */\nfunction rgbToHsl(r, g, b) {\n    r /= 255;\n    g /= 255;\n    b /= 255;\n    var max = Math.max(r, g, b);\n    var min = Math.min(r, g, b);\n    var h = 0;\n    var s = 0;\n    var l = (max + min) / 2;\n    if (max !== min) {\n        var d = max - min;\n        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);\n        switch (max) {\n            case r:\n                h = (g - b) / d + (g < b ? 6 : 0);\n                break;\n            case g:\n                h = (b - r) / d + 2;\n                break;\n            case b:\n                h = (r - g) / d + 4;\n                break;\n        }\n        h /= 6;\n    }\n    return [h, s, l];\n}\nexports.rgbToHsl = rgbToHsl;\nfunction hslToRgb(h, s, l) {\n    var r;\n    var g;\n    var b;\n    function hue2rgb(p, q, t) {\n        if (t < 0)\n            t += 1;\n        if (t > 1)\n            t -= 1;\n        if (t < 1 / 6)\n            return p + (q - p) * 6 * t;\n        if (t < 1 / 2)\n            return q;\n        if (t < 2 / 3)\n            return p + (q - p) * (2 / 3 - t) * 6;\n        return p;\n    }\n    if (s === 0) {\n        r = g = b = l;\n    }\n    else {\n        var q = l < 0.5 ? l * (1 + s) : l + s - (l * s);\n        var p = 2 * l - q;\n        r = hue2rgb(p, q, h + 1 / 3);\n        g = hue2rgb(p, q, h);\n        b = hue2rgb(p, q, h - (1 / 3));\n    }\n    return [\n        r * 255,\n        g * 255,\n        b * 255\n    ];\n}\nexports.hslToRgb = hslToRgb;\nfunction rgbToXyz(r, g, b) {\n    r /= 255;\n    g /= 255;\n    b /= 255;\n    r = r > 0.04045 ? Math.pow((r + 0.005) / 1.055, 2.4) : r / 12.92;\n    g = g > 0.04045 ? Math.pow((g + 0.005) / 1.055, 2.4) : g / 12.92;\n    b = b > 0.04045 ? Math.pow((b + 0.005) / 1.055, 2.4) : b / 12.92;\n    r *= 100;\n    g *= 100;\n    b *= 100;\n    var x = r * 0.4124 + g * 0.3576 + b * 0.1805;\n    var y = r * 0.2126 + g * 0.7152 + b * 0.0722;\n    var z = r * 0.0193 + g * 0.1192 + b * 0.9505;\n    return [x, y, z];\n}\nexports.rgbToXyz = rgbToXyz;\nfunction xyzToCIELab(x, y, z) {\n    var REF_X = 95.047;\n    var REF_Y = 100;\n    var REF_Z = 108.883;\n    x /= REF_X;\n    y /= REF_Y;\n    z /= REF_Z;\n    x = x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;\n    y = y > 0.008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;\n    z = z > 0.008856 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;\n    var L = 116 * y - 16;\n    var a = 500 * (x - y);\n    var b = 200 * (y - z);\n    return [L, a, b];\n}\nexports.xyzToCIELab = xyzToCIELab;\nfunction rgbToCIELab(r, g, b) {\n    var _a = rgbToXyz(r, g, b), x = _a[0], y = _a[1], z = _a[2];\n    return xyzToCIELab(x, y, z);\n}\nexports.rgbToCIELab = rgbToCIELab;\nfunction deltaE94(lab1, lab2) {\n    var WEIGHT_L = 1;\n    var WEIGHT_C = 1;\n    var WEIGHT_H = 1;\n    var L1 = lab1[0], a1 = lab1[1], b1 = lab1[2];\n    var L2 = lab2[0], a2 = lab2[1], b2 = lab2[2];\n    var dL = L1 - L2;\n    var da = a1 - a2;\n    var db = b1 - b2;\n    var xC1 = Math.sqrt(a1 * a1 + b1 * b1);\n    var xC2 = Math.sqrt(a2 * a2 + b2 * b2);\n    var xDL = L2 - L1;\n    var xDC = xC2 - xC1;\n    var xDE = Math.sqrt(dL * dL + da * da + db * db);\n    var xDH = (Math.sqrt(xDE) > Math.sqrt(Math.abs(xDL)) + Math.sqrt(Math.abs(xDC)))\n        ? Math.sqrt(xDE * xDE - xDL * xDL - xDC * xDC)\n        : 0;\n    var xSC = 1 + 0.045 * xC1;\n    var xSH = 1 + 0.015 * xC1;\n    xDL /= WEIGHT_L;\n    xDC /= WEIGHT_C * xSC;\n    xDH /= WEIGHT_H * xSH;\n    return Math.sqrt(xDL * xDL + xDC * xDC + xDH * xDH);\n}\nexports.deltaE94 = deltaE94;\nfunction rgbDiff(rgb1, rgb2) {\n    var lab1 = rgbToCIELab.apply(undefined, rgb1);\n    var lab2 = rgbToCIELab.apply(undefined, rgb2);\n    return deltaE94(lab1, lab2);\n}\nexports.rgbDiff = rgbDiff;\nfunction hexDiff(hex1, hex2) {\n    var rgb1 = hexToRgb(hex1);\n    var rgb2 = hexToRgb(hex2);\n    return rgbDiff(rgb1, rgb2);\n}\nexports.hexDiff = hexDiff;\nfunction getColorDiffStatus(d) {\n    if (d < exports.DELTAE94_DIFF_STATUS.NA) {\n        return 'N/A';\n    }\n    // Not perceptible by human eyes\n    if (d <= exports.DELTAE94_DIFF_STATUS.PERFECT) {\n        return 'Perfect';\n    }\n    // Perceptible through close observation\n    if (d <= exports.DELTAE94_DIFF_STATUS.CLOSE) {\n        return 'Close';\n    }\n    // Perceptible at a glance\n    if (d <= exports.DELTAE94_DIFF_STATUS.GOOD) {\n        return 'Good';\n    }\n    // Colors are more similar than opposite\n    if (d < exports.DELTAE94_DIFF_STATUS.SIMILAR) {\n        return 'Similar';\n    }\n    return 'Wrong';\n}\nexports.getColorDiffStatus = getColorDiffStatus;\n\n\n/***/ }),\n/* 2 */\n/***/ (function(module, exports, __webpack_require__) {\n\n\"use strict\";\n\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar host_1 = __importDefault(__webpack_require__(3));\nvar _1 = __importDefault(__webpack_require__(5));\nhost_1.default(self, _1.default);\n\n\n/***/ }),\n/* 3 */\n/***/ (function(module, exports, __webpack_require__) {\n\n\"use strict\";\n\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar worker_1 = __importDefault(__webpack_require__(4));\nfunction runPipelineInWorker(self, pipeline) {\n    worker_1.default(self, function (imageData, opts) {\n        return pipeline.process(imageData, opts);\n    });\n}\nexports.default = runPipelineInWorker;\n\n\n/***/ }),\n/* 4 */\n/***/ (function(module, exports, __webpack_require__) {\n\n\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", { value: true });\nfunction runInWorker(self, fn) {\n    self.onmessage = function (event) {\n        var data = event.data;\n        var id = data.id, payload = data.payload;\n        var response;\n        Promise.resolve(fn.apply(void 0, payload))\n            .then(function (ret) {\n            self.postMessage({\n                id: id,\n                type: 'return',\n                payload: ret\n            });\n        })\n            .catch(function (e) {\n            self.postMessage({\n                id: id,\n                type: 'error',\n                payload: e.message\n            });\n        });\n    };\n}\nexports.default = runInWorker;\n\n\n/***/ }),\n/* 5 */\n/***/ (function(module, exports, __webpack_require__) {\n\n\"use strict\";\n\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar quantizer_mmcq_1 = __importDefault(__webpack_require__(6));\nvar generator_default_1 = __importDefault(__webpack_require__(10));\nvar pipeline_1 = __webpack_require__(11);\nvar pipeline = new pipeline_1.BasicPipeline()\n    .filter.register('default', function (r, g, b, a) {\n    return a >= 125\n        && !(r > 250 && g > 250 && b > 250);\n})\n    .quantizer.register('mmcq', quantizer_mmcq_1.default)\n    .generator.register('default', generator_default_1.default);\nexports.default = pipeline;\n\n\n/***/ }),\n/* 6 */\n/***/ (function(module, exports, __webpack_require__) {\n\n\"use strict\";\n\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar color_1 = __webpack_require__(0);\nvar vbox_1 = __importDefault(__webpack_require__(7));\nvar pqueue_1 = __importDefault(__webpack_require__(9));\nvar fractByPopulations = 0.75;\nfunction _splitBoxes(pq, target) {\n    var lastSize = pq.size();\n    while (pq.size() < target) {\n        var vbox = pq.pop();\n        if (vbox && vbox.count() > 0) {\n            var _a = vbox.split(), vbox1 = _a[0], vbox2 = _a[1];\n            pq.push(vbox1);\n            if (vbox2 && vbox2.count() > 0)\n                pq.push(vbox2);\n            // No more new boxes, converged\n            if (pq.size() === lastSize) {\n                break;\n            }\n            else {\n                lastSize = pq.size();\n            }\n        }\n        else {\n            break;\n        }\n    }\n}\nvar MMCQ = function (pixels, opts) {\n    if (pixels.length === 0 || opts.colorCount < 2 || opts.colorCount > 256) {\n        throw new Error('Wrong MMCQ parameters');\n    }\n    var vbox = vbox_1.default.build(pixels);\n    var colorCount = vbox.histogram.colorCount;\n    var pq = new pqueue_1.default(function (a, b) { return a.count() - b.count(); });\n    pq.push(vbox);\n    // first set of colors, sorted by population\n    _splitBoxes(pq, fractByPopulations * opts.colorCount);\n    // Re-order\n    var pq2 = new pqueue_1.default(function (a, b) { return a.count() * a.volume() - b.count() * b.volume(); });\n    pq2.contents = pq.contents;\n    // next set - generate the median cuts using the (npix * vol) sorting.\n    _splitBoxes(pq2, opts.colorCount - pq2.size());\n    // calculate the actual colors\n    return generateSwatches(pq2);\n};\nfunction generateSwatches(pq) {\n    var swatches = [];\n    while (pq.size()) {\n        var v = pq.pop();\n        var color = v.avg();\n        var r = color[0], g = color[1], b = color[2];\n        swatches.push(new color_1.Swatch(color, v.count()));\n    }\n    return swatches;\n}\nexports.default = MMCQ;\n\n\n/***/ }),\n/* 7 */\n/***/ (function(module, exports, __webpack_require__) {\n\n\"use strict\";\n\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar histogram_1 = __importDefault(__webpack_require__(8));\nvar SIGBITS = 5;\nvar RSHIFT = 8 - SIGBITS;\nvar VBox = /** @class */ (function () {\n    function VBox(r1, r2, g1, g2, b1, b2, histogram) {\n        this.histogram = histogram;\n        this._volume = -1;\n        this._count = -1;\n        // NOTE: dimension will be mutated by split operation.\n        //       It must be specified explicitly, not from histogram\n        this.dimension = { r1: r1, r2: r2, g1: g1, g2: g2, b1: b1, b2: b2 };\n    }\n    VBox.build = function (pixels) {\n        var h = new histogram_1.default(pixels, { sigBits: SIGBITS });\n        var rmin = h.rmin, rmax = h.rmax, gmin = h.gmin, gmax = h.gmax, bmin = h.bmin, bmax = h.bmax;\n        return new VBox(rmin, rmax, gmin, gmax, bmin, bmax, h);\n    };\n    VBox.prototype.invalidate = function () {\n        this._volume = this._count = -1;\n        this._avg = null;\n    };\n    VBox.prototype.volume = function () {\n        if (this._volume < 0) {\n            var _a = this.dimension, r1 = _a.r1, r2 = _a.r2, g1 = _a.g1, g2 = _a.g2, b1 = _a.b1, b2 = _a.b2;\n            this._volume = (r2 - r1 + 1) * (g2 - g1 + 1) * (b2 - b1 + 1);\n        }\n        return this._volume;\n    };\n    VBox.prototype.count = function () {\n        if (this._count < 0) {\n            var _a = this.histogram, hist = _a.hist, getColorIndex = _a.getColorIndex;\n            var _b = this.dimension, r1 = _b.r1, r2 = _b.r2, g1 = _b.g1, g2 = _b.g2, b1 = _b.b1, b2 = _b.b2;\n            var c = 0;\n            for (var r = r1; r <= r2; r++) {\n                for (var g = g1; g <= g2; g++) {\n                    for (var b = b1; b <= b2; b++) {\n                        var index = getColorIndex(r, g, b);\n                        c += hist[index];\n                    }\n                }\n            }\n            this._count = c;\n        }\n        return this._count;\n    };\n    VBox.prototype.clone = function () {\n        var histogram = this.histogram;\n        var _a = this.dimension, r1 = _a.r1, r2 = _a.r2, g1 = _a.g1, g2 = _a.g2, b1 = _a.b1, b2 = _a.b2;\n        return new VBox(r1, r2, g1, g2, b1, b2, histogram);\n    };\n    VBox.prototype.avg = function () {\n        if (!this._avg) {\n            var _a = this.histogram, hist = _a.hist, getColorIndex = _a.getColorIndex;\n            var _b = this.dimension, r1 = _b.r1, r2 = _b.r2, g1 = _b.g1, g2 = _b.g2, b1 = _b.b1, b2 = _b.b2;\n            var ntot = 0;\n            var mult = 1 << (8 - SIGBITS);\n            var rsum = void 0;\n            var gsum = void 0;\n            var bsum = void 0;\n            rsum = gsum = bsum = 0;\n            for (var r = r1; r <= r2; r++) {\n                for (var g = g1; g <= g2; g++) {\n                    for (var b = b1; b <= b2; b++) {\n                        var index = getColorIndex(r, g, b);\n                        var h = hist[index];\n                        ntot += h;\n                        rsum += (h * (r + 0.5) * mult);\n                        gsum += (h * (g + 0.5) * mult);\n                        bsum += (h * (b + 0.5) * mult);\n                    }\n                }\n            }\n            if (ntot) {\n                this._avg = [\n                    ~~(rsum / ntot),\n                    ~~(gsum / ntot),\n                    ~~(bsum / ntot)\n                ];\n            }\n            else {\n                this._avg = [\n                    ~~(mult * (r1 + r2 + 1) / 2),\n                    ~~(mult * (g1 + g2 + 1) / 2),\n                    ~~(mult * (b1 + b2 + 1) / 2)\n                ];\n            }\n        }\n        return this._avg;\n    };\n    VBox.prototype.contains = function (rgb) {\n        var r = rgb[0], g = rgb[1], b = rgb[2];\n        var _a = this.dimension, r1 = _a.r1, r2 = _a.r2, g1 = _a.g1, g2 = _a.g2, b1 = _a.b1, b2 = _a.b2;\n        r >>= RSHIFT;\n        g >>= RSHIFT;\n        b >>= RSHIFT;\n        return r >= r1 && r <= r2\n            && g >= g1 && g <= g2\n            && b >= b1 && b <= b2;\n    };\n    VBox.prototype.split = function () {\n        var _a = this.histogram, hist = _a.hist, getColorIndex = _a.getColorIndex;\n        var _b = this.dimension, r1 = _b.r1, r2 = _b.r2, g1 = _b.g1, g2 = _b.g2, b1 = _b.b1, b2 = _b.b2;\n        var count = this.count();\n        if (!count)\n            return [];\n        if (count === 1)\n            return [this.clone()];\n        var rw = r2 - r1 + 1;\n        var gw = g2 - g1 + 1;\n        var bw = b2 - b1 + 1;\n        var maxw = Math.max(rw, gw, bw);\n        var accSum = null;\n        var sum;\n        var total;\n        sum = total = 0;\n        var maxd = null;\n        if (maxw === rw) {\n            maxd = 'r';\n            accSum = new Uint32Array(r2 + 1);\n            for (var r = r1; r <= r2; r++) {\n                sum = 0;\n                for (var g = g1; g <= g2; g++) {\n                    for (var b = b1; b <= b2; b++) {\n                        var index = getColorIndex(r, g, b);\n                        sum += hist[index];\n                    }\n                }\n                total += sum;\n                accSum[r] = total;\n            }\n        }\n        else if (maxw === gw) {\n            maxd = 'g';\n            accSum = new Uint32Array(g2 + 1);\n            for (var g = g1; g <= g2; g++) {\n                sum = 0;\n                for (var r = r1; r <= r2; r++) {\n                    for (var b = b1; b <= b2; b++) {\n                        var index = getColorIndex(r, g, b);\n                        sum += hist[index];\n                    }\n                }\n                total += sum;\n                accSum[g] = total;\n            }\n        }\n        else {\n            maxd = 'b';\n            accSum = new Uint32Array(b2 + 1);\n            for (var b = b1; b <= b2; b++) {\n                sum = 0;\n                for (var r = r1; r <= r2; r++) {\n                    for (var g = g1; g <= g2; g++) {\n                        var index = getColorIndex(r, g, b);\n                        sum += hist[index];\n                    }\n                }\n                total += sum;\n                accSum[b] = total;\n            }\n        }\n        var splitPoint = -1;\n        var reverseSum = new Uint32Array(accSum.length);\n        for (var i = 0; i < accSum.length; i++) {\n            var d = accSum[i];\n            if (splitPoint < 0 && d > total / 2)\n                splitPoint = i;\n            reverseSum[i] = total - d;\n        }\n        var vbox = this;\n        function doCut(d) {\n            var dim1 = d + '1';\n            var dim2 = d + '2';\n            var d1 = vbox.dimension[dim1];\n            var d2 = vbox.dimension[dim2];\n            var vbox1 = vbox.clone();\n            var vbox2 = vbox.clone();\n            var left = splitPoint - d1;\n            var right = d2 - splitPoint;\n            if (left <= right) {\n                d2 = Math.min(d2 - 1, ~~(splitPoint + right / 2));\n                d2 = Math.max(0, d2);\n            }\n            else {\n                d2 = Math.max(d1, ~~(splitPoint - 1 - left / 2));\n                d2 = Math.min(vbox.dimension[dim2], d2);\n            }\n            while (!accSum[d2])\n                d2++;\n            var c2 = reverseSum[d2];\n            while (!c2 && accSum[d2 - 1])\n                c2 = reverseSum[--d2];\n            vbox1.dimension[dim2] = d2;\n            vbox2.dimension[dim1] = d2 + 1;\n            return [vbox1, vbox2];\n        }\n        return doCut(maxd);\n    };\n    return VBox;\n}());\nexports.default = VBox;\n\n\n/***/ }),\n/* 8 */\n/***/ (function(module, exports, __webpack_require__) {\n\n\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar Histogram = /** @class */ (function () {\n    function Histogram(pixels, opts) {\n        this.pixels = pixels;\n        this.opts = opts;\n        var sigBits = opts.sigBits;\n        var getColorIndex = function (r, g, b) {\n            return (r << (2 * sigBits)) + (g << sigBits) + b;\n        };\n        this.getColorIndex = getColorIndex;\n        var rshift = 8 - sigBits;\n        var hn = 1 << (3 * sigBits);\n        var hist = new Uint32Array(hn);\n        var rmax;\n        var rmin;\n        var gmax;\n        var gmin;\n        var bmax;\n        var bmin;\n        var r;\n        var g;\n        var b;\n        var a;\n        rmax = gmax = bmax = 0;\n        rmin = gmin = bmin = Number.MAX_VALUE;\n        var n = pixels.length / 4;\n        var i = 0;\n        while (i < n) {\n            var offset = i * 4;\n            i++;\n            r = pixels[offset + 0];\n            g = pixels[offset + 1];\n            b = pixels[offset + 2];\n            a = pixels[offset + 3];\n            // Ignored pixels' alpha is marked as 0 in filtering stage\n            if (a === 0)\n                continue;\n            r = r >> rshift;\n            g = g >> rshift;\n            b = b >> rshift;\n            var index = getColorIndex(r, g, b);\n            hist[index] += 1;\n            if (r > rmax)\n                rmax = r;\n            if (r < rmin)\n                rmin = r;\n            if (g > gmax)\n                gmax = g;\n            if (g < gmin)\n                gmin = g;\n            if (b > bmax)\n                bmax = b;\n            if (b < bmin)\n                bmin = b;\n        }\n        this._colorCount = hist.reduce(function (total, c) { return c > 0 ? total + 1 : total; }, 0);\n        this.hist = hist;\n        this.rmax = rmax;\n        this.rmin = rmin;\n        this.gmax = gmax;\n        this.gmin = gmin;\n        this.bmax = bmax;\n        this.bmin = bmin;\n    }\n    Object.defineProperty(Histogram.prototype, \"colorCount\", {\n        get: function () { return this._colorCount; },\n        enumerable: false,\n        configurable: true\n    });\n    return Histogram;\n}());\nexports.default = Histogram;\n\n\n/***/ }),\n/* 9 */\n/***/ (function(module, exports, __webpack_require__) {\n\n\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar PQueue = /** @class */ (function () {\n    function PQueue(comparator) {\n        this._comparator = comparator;\n        this.contents = [];\n        this._sorted = false;\n    }\n    PQueue.prototype._sort = function () {\n        if (!this._sorted) {\n            this.contents.sort(this._comparator);\n            this._sorted = true;\n        }\n    };\n    PQueue.prototype.push = function (item) {\n        this.contents.push(item);\n        this._sorted = false;\n    };\n    PQueue.prototype.peek = function (index) {\n        this._sort();\n        index = typeof index === 'number' ? index : this.contents.length - 1;\n        return this.contents[index];\n    };\n    PQueue.prototype.pop = function () {\n        this._sort();\n        return this.contents.pop();\n    };\n    PQueue.prototype.size = function () {\n        return this.contents.length;\n    };\n    PQueue.prototype.map = function (mapper) {\n        this._sort();\n        return this.contents.map(mapper);\n    };\n    return PQueue;\n}());\nexports.default = PQueue;\n\n\n/***/ }),\n/* 10 */\n/***/ (function(module, exports, __webpack_require__) {\n\n\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar color_1 = __webpack_require__(0);\nvar converter_1 = __webpack_require__(1);\nvar DefaultOpts = {\n    targetDarkLuma: 0.26,\n    maxDarkLuma: 0.45,\n    minLightLuma: 0.55,\n    targetLightLuma: 0.74,\n    minNormalLuma: 0.3,\n    targetNormalLuma: 0.5,\n    maxNormalLuma: 0.7,\n    targetMutesSaturation: 0.3,\n    maxMutesSaturation: 0.4,\n    targetVibrantSaturation: 1.0,\n    minVibrantSaturation: 0.35,\n    weightSaturation: 3,\n    weightLuma: 6.5,\n    weightPopulation: 0.5\n};\nfunction _findMaxPopulation(swatches) {\n    var p = 0;\n    swatches.forEach(function (s) {\n        p = Math.max(p, s.population);\n    });\n    return p;\n}\nfunction _isAlreadySelected(palette, s) {\n    return palette.Vibrant === s\n        || palette.DarkVibrant === s\n        || palette.LightVibrant === s\n        || palette.Muted === s\n        || palette.DarkMuted === s\n        || palette.LightMuted === s;\n}\nfunction _createComparisonValue(saturation, targetSaturation, luma, targetLuma, population, maxPopulation, opts) {\n    function weightedMean() {\n        var values = [];\n        for (var _i = 0; _i < arguments.length; _i++) {\n            values[_i] = arguments[_i];\n        }\n        var sum = 0;\n        var weightSum = 0;\n        for (var i = 0; i < values.length; i += 2) {\n            var value = values[i];\n            var weight = values[i + 1];\n            sum += value * weight;\n            weightSum += weight;\n        }\n        return sum / weightSum;\n    }\n    function invertDiff(value, targetValue) {\n        return 1 - Math.abs(value - targetValue);\n    }\n    return weightedMean(invertDiff(saturation, targetSaturation), opts.weightSaturation, invertDiff(luma, targetLuma), opts.weightLuma, population / maxPopulation, opts.weightPopulation);\n}\nfunction _findColorVariation(palette, swatches, maxPopulation, targetLuma, minLuma, maxLuma, targetSaturation, minSaturation, maxSaturation, opts) {\n    var max = null;\n    var maxValue = 0;\n    swatches.forEach(function (swatch) {\n        var _a = swatch.hsl, s = _a[1], l = _a[2];\n        if (s >= minSaturation && s <= maxSaturation\n            && l >= minLuma && l <= maxLuma\n            && !_isAlreadySelected(palette, swatch)) {\n            var value = _createComparisonValue(s, targetSaturation, l, targetLuma, swatch.population, maxPopulation, opts);\n            if (max === null || value > maxValue) {\n                max = swatch;\n                maxValue = value;\n            }\n        }\n    });\n    return max;\n}\nfunction _generateVariationColors(swatches, maxPopulation, opts) {\n    var palette = {\n        Vibrant: null,\n        DarkVibrant: null,\n        LightVibrant: null,\n        Muted: null,\n        DarkMuted: null,\n        LightMuted: null\n    };\n    // mVibrantSwatch = findColor(TARGET_NORMAL_LUMA, MIN_NORMAL_LUMA, MAX_NORMAL_LUMA,\n    //     TARGET_VIBRANT_SATURATION, MIN_VIBRANT_SATURATION, 1f)\n    palette.Vibrant = _findColorVariation(palette, swatches, maxPopulation, opts.targetNormalLuma, opts.minNormalLuma, opts.maxNormalLuma, opts.targetVibrantSaturation, opts.minVibrantSaturation, 1, opts);\n    // mLightVibrantSwatch = findColor(TARGET_LIGHT_LUMA, MIN_LIGHT_LUMA, 1f,\n    //     TARGET_VIBRANT_SATURATION, MIN_VIBRANT_SATURATION, 1f)\n    palette.LightVibrant = _findColorVariation(palette, swatches, maxPopulation, opts.targetLightLuma, opts.minLightLuma, 1, opts.targetVibrantSaturation, opts.minVibrantSaturation, 1, opts);\n    // mDarkVibrantSwatch = findColor(TARGET_DARK_LUMA, 0f, MAX_DARK_LUMA,\n    //     TARGET_VIBRANT_SATURATION, MIN_VIBRANT_SATURATION, 1f)\n    palette.DarkVibrant = _findColorVariation(palette, swatches, maxPopulation, opts.targetDarkLuma, 0, opts.maxDarkLuma, opts.targetVibrantSaturation, opts.minVibrantSaturation, 1, opts);\n    // mMutedSwatch = findColor(TARGET_NORMAL_LUMA, MIN_NORMAL_LUMA, MAX_NORMAL_LUMA,\n    //     TARGET_MUTED_SATURATION, 0f, MAX_MUTED_SATURATION)\n    palette.Muted = _findColorVariation(palette, swatches, maxPopulation, opts.targetNormalLuma, opts.minNormalLuma, opts.maxNormalLuma, opts.targetMutesSaturation, 0, opts.maxMutesSaturation, opts);\n    // mLightMutedColor = findColor(TARGET_LIGHT_LUMA, MIN_LIGHT_LUMA, 1f,\n    //     TARGET_MUTED_SATURATION, 0f, MAX_MUTED_SATURATION)\n    palette.LightMuted = _findColorVariation(palette, swatches, maxPopulation, opts.targetLightLuma, opts.minLightLuma, 1, opts.targetMutesSaturation, 0, opts.maxMutesSaturation, opts);\n    // mDarkMutedSwatch = findColor(TARGET_DARK_LUMA, 0f, MAX_DARK_LUMA,\n    //     TARGET_MUTED_SATURATION, 0f, MAX_MUTED_SATURATION)\n    palette.DarkMuted = _findColorVariation(palette, swatches, maxPopulation, opts.targetDarkLuma, 0, opts.maxDarkLuma, opts.targetMutesSaturation, 0, opts.maxMutesSaturation, opts);\n    return palette;\n}\nfunction _generateEmptySwatches(palette, maxPopulation, opts) {\n    if (!palette.Vibrant && !palette.DarkVibrant && !palette.LightVibrant) {\n        if (!palette.DarkVibrant && palette.DarkMuted) {\n            var _a = palette.DarkMuted.hsl, h = _a[0], s = _a[1], l = _a[2];\n            l = opts.targetDarkLuma;\n            palette.DarkVibrant = new color_1.Swatch(converter_1.hslToRgb(h, s, l), 0);\n        }\n        if (!palette.LightVibrant && palette.LightMuted) {\n            var _b = palette.LightMuted.hsl, h = _b[0], s = _b[1], l = _b[2];\n            l = opts.targetDarkLuma;\n            palette.DarkVibrant = new color_1.Swatch(converter_1.hslToRgb(h, s, l), 0);\n        }\n    }\n    if (!palette.Vibrant && palette.DarkVibrant) {\n        var _c = palette.DarkVibrant.hsl, h = _c[0], s = _c[1], l = _c[2];\n        l = opts.targetNormalLuma;\n        palette.Vibrant = new color_1.Swatch(converter_1.hslToRgb(h, s, l), 0);\n    }\n    else if (!palette.Vibrant && palette.LightVibrant) {\n        var _d = palette.LightVibrant.hsl, h = _d[0], s = _d[1], l = _d[2];\n        l = opts.targetNormalLuma;\n        palette.Vibrant = new color_1.Swatch(converter_1.hslToRgb(h, s, l), 0);\n    }\n    if (!palette.DarkVibrant && palette.Vibrant) {\n        var _e = palette.Vibrant.hsl, h = _e[0], s = _e[1], l = _e[2];\n        l = opts.targetDarkLuma;\n        palette.DarkVibrant = new color_1.Swatch(converter_1.hslToRgb(h, s, l), 0);\n    }\n    if (!palette.LightVibrant && palette.Vibrant) {\n        var _f = palette.Vibrant.hsl, h = _f[0], s = _f[1], l = _f[2];\n        l = opts.targetLightLuma;\n        palette.LightVibrant = new color_1.Swatch(converter_1.hslToRgb(h, s, l), 0);\n    }\n    if (!palette.Muted && palette.Vibrant) {\n        var _g = palette.Vibrant.hsl, h = _g[0], s = _g[1], l = _g[2];\n        l = opts.targetMutesSaturation;\n        palette.Muted = new color_1.Swatch(converter_1.hslToRgb(h, s, l), 0);\n    }\n    if (!palette.DarkMuted && palette.DarkVibrant) {\n        var _h = palette.DarkVibrant.hsl, h = _h[0], s = _h[1], l = _h[2];\n        l = opts.targetMutesSaturation;\n        palette.DarkMuted = new color_1.Swatch(converter_1.hslToRgb(h, s, l), 0);\n    }\n    if (!palette.LightMuted && palette.LightVibrant) {\n        var _j = palette.LightVibrant.hsl, h = _j[0], s = _j[1], l = _j[2];\n        l = opts.targetMutesSaturation;\n        palette.LightMuted = new color_1.Swatch(converter_1.hslToRgb(h, s, l), 0);\n    }\n}\nvar DefaultGenerator = function (swatches, opts) {\n    opts = Object.assign({}, DefaultOpts, opts);\n    var maxPopulation = _findMaxPopulation(swatches);\n    var palette = _generateVariationColors(swatches, maxPopulation, opts);\n    _generateEmptySwatches(palette, maxPopulation, opts);\n    return palette;\n};\nexports.default = DefaultGenerator;\n\n\n/***/ }),\n/* 11 */\n/***/ (function(module, exports, __webpack_require__) {\n\n\"use strict\";\n\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.BasicPipeline = exports.Stage = void 0;\nvar image_1 = __webpack_require__(12);\nvar Stage = /** @class */ (function () {\n    function Stage(pipeline) {\n        this.pipeline = pipeline;\n        this._map = {};\n    }\n    Stage.prototype.names = function () {\n        return Object.keys(this._map);\n    };\n    Stage.prototype.has = function (name) {\n        return !!this._map[name];\n    };\n    Stage.prototype.get = function (name) {\n        return this._map[name];\n    };\n    Stage.prototype.register = function (name, stageFn) {\n        this._map[name] = stageFn;\n        return this.pipeline;\n    };\n    return Stage;\n}());\nexports.Stage = Stage;\nvar BasicPipeline = /** @class */ (function () {\n    function BasicPipeline() {\n        this.filter = new Stage(this);\n        this.quantizer = new Stage(this);\n        this.generator = new Stage(this);\n    }\n    BasicPipeline.prototype._buildProcessTasks = function (_a) {\n        var _this = this;\n        var filters = _a.filters, quantizer = _a.quantizer, generators = _a.generators;\n        // Support wildcard for generators\n        if (generators.length === 1 && generators[0] === '*') {\n            generators = this.generator.names();\n        }\n        return {\n            filters: filters.map(function (f) { return createTask(_this.filter, f); }),\n            quantizer: createTask(this.quantizer, quantizer),\n            generators: generators.map(function (g) { return createTask(_this.generator, g); })\n        };\n        function createTask(stage, o) {\n            var name;\n            var options;\n            if (typeof o === 'string') {\n                name = o;\n            }\n            else {\n                name = o.name;\n                options = o.options;\n            }\n            return {\n                name: name,\n                fn: stage.get(name),\n                options: options\n            };\n        }\n    };\n    BasicPipeline.prototype.process = function (imageData, opts) {\n        return __awaiter(this, void 0, void 0, function () {\n            var _a, filters, quantizer, generators, imageFilterData, colors, palettes;\n            return __generator(this, function (_b) {\n                switch (_b.label) {\n                    case 0:\n                        _a = this._buildProcessTasks(opts), filters = _a.filters, quantizer = _a.quantizer, generators = _a.generators;\n                        return [4 /*yield*/, this._filterColors(filters, imageData)];\n                    case 1:\n                        imageFilterData = _b.sent();\n                        return [4 /*yield*/, this._generateColors(quantizer, imageFilterData)];\n                    case 2:\n                        colors = _b.sent();\n                        return [4 /*yield*/, this._generatePalettes(generators, colors)];\n                    case 3:\n                        palettes = _b.sent();\n                        return [2 /*return*/, {\n                                colors: colors,\n                                palettes: palettes\n                            }];\n                }\n            });\n        });\n    };\n    BasicPipeline.prototype._filterColors = function (filters, imageData) {\n        return Promise.resolve(image_1.applyFilters(imageData, filters.map(function (_a) {\n            var fn = _a.fn;\n            return fn;\n        })));\n    };\n    BasicPipeline.prototype._generateColors = function (quantizer, imageData) {\n        return Promise.resolve(quantizer.fn(imageData.data, quantizer.options));\n    };\n    BasicPipeline.prototype._generatePalettes = function (generators, colors) {\n        return __awaiter(this, void 0, void 0, function () {\n            var promiseArr;\n            return __generator(this, function (_a) {\n                switch (_a.label) {\n                    case 0: return [4 /*yield*/, Promise.all(generators.map(function (_a) {\n                            var fn = _a.fn, options = _a.options;\n                            return Promise.resolve(fn(colors, options));\n                        }))\n                        // Map the values to the expected name\n                    ];\n                    case 1:\n                        promiseArr = _a.sent();\n                        // Map the values to the expected name\n                        return [2 /*return*/, Promise.resolve(promiseArr.reduce(function (promises, promiseVal, i) {\n                                promises[generators[i].name] = promiseVal;\n                                return promises;\n                            }, {}))];\n                }\n            });\n        });\n    };\n    return BasicPipeline;\n}());\nexports.BasicPipeline = BasicPipeline;\n\n\n/***/ }),\n/* 12 */\n/***/ (function(module, exports, __webpack_require__) {\n\n\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.applyFilters = exports.ImageBase = void 0;\nvar ImageBase = /** @class */ (function () {\n    function ImageBase() {\n    }\n    ImageBase.prototype.scaleDown = function (opts) {\n        var width = this.getWidth();\n        var height = this.getHeight();\n        var ratio = 1;\n        if (opts.maxDimension > 0) {\n            var maxSide = Math.max(width, height);\n            if (maxSide > opts.maxDimension)\n                ratio = opts.maxDimension / maxSide;\n        }\n        else {\n            ratio = 1 / opts.quality;\n        }\n        if (ratio < 1)\n            this.resize(width * ratio, height * ratio, ratio);\n    };\n    return ImageBase;\n}());\nexports.ImageBase = ImageBase;\nfunction applyFilters(imageData, filters) {\n    if (filters.length > 0) {\n        var pixels = imageData.data;\n        var n = pixels.length / 4;\n        var offset = void 0;\n        var r = void 0;\n        var g = void 0;\n        var b = void 0;\n        var a = void 0;\n        for (var i = 0; i < n; i++) {\n            offset = i * 4;\n            r = pixels[offset + 0];\n            g = pixels[offset + 1];\n            b = pixels[offset + 2];\n            a = pixels[offset + 3];\n            // Mark ignored color\n            for (var j = 0; j < filters.length; j++) {\n                if (!filters[j](r, g, b, a)) {\n                    pixels[offset + 3] = 0;\n                    break;\n                }\n            }\n        }\n    }\n    return imageData;\n}\nexports.applyFilters = applyFilters;\n\n\n/***/ })\n/******/ ]);\n//# sourceMappingURL=ce4e11e0869042e47f66.worker.js.map", __webpack_require__.p + "ce4e11e0869042e47f66.worker.js");
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// http://stackoverflow.com/questions/10343913/how-to-create-a-web-worker-from-a-string

var URL = window.URL || window.webkitURL;

module.exports = function (content, url) {
  try {
    try {
      var blob;

      try {
        // BlobBuilder = Deprecated, but widely implemented
        var BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;

        blob = new BlobBuilder();

        blob.append(content);

        blob = blob.getBlob();
      } catch (e) {
        // The proposed API
        blob = new Blob([content]);
      }

      return new Worker(URL.createObjectURL(blob));
    } catch (e) {
      return new Worker('data:application/javascript,' + encodeURIComponent(content));
    }
  } catch (e) {
    if (!url) {
      throw Error('Inline worker is not supported');
    }

    return new Worker(url);
  }
};

/***/ })
/******/ ]);
});
//# sourceMappingURL=vibrant.worker.js.map