(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.ColorHash = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * BKDR Hash (modified version)
 *
 * @param {String} str string to hash
 * @returns {Number}
 */
var BKDRHash = function(str) {
    var seed = 131;
    var seed2 = 137;
    var hash = 0;
    // make hash more sensitive for short string like 'a', 'b', 'c'
    str += 'x';
    // Note: Number.MAX_SAFE_INTEGER equals 9007199254740991
    var MAX_SAFE_INTEGER = parseInt(9007199254740991 / seed2);
    for(var i = 0; i < str.length; i++) {
        if(hash > MAX_SAFE_INTEGER) {
            hash = parseInt(hash / seed2);
        }
        hash = hash * seed + str.charCodeAt(i);
    }
    return hash;
};

module.exports = BKDRHash;

},{}],2:[function(require,module,exports){
var BKDRHash = require('./bkdr-hash');

/**
 * Convert RGB Array to HEX
 *
 * @param {Array} RGBArray - [R, G, B]
 * @returns {String} 6 digits hex starting with #
 */
var RGB2HEX = function(RGBArray) {
    var hex = '#';
    RGBArray.forEach(function(value) {
        if (value < 16) {
            hex += 0;
        }
        hex += value.toString(16);
    });
    return hex;
};

/**
 * Convert HSL to RGB
 *
 * @see {@link http://zh.wikipedia.org/wiki/HSL和HSV色彩空间} for further information.
 * @param {Number} H Hue ∈ [0, 360)
 * @param {Number} S Saturation ∈ [0, 1]
 * @param {Number} L Lightness ∈ [0, 1]
 * @returns {Array} R, G, B ∈ [0, 255]
 */
var HSL2RGB = function(H, S, L) {
    H /= 360;

    var q = L < 0.5 ? L * (1 + S) : L + S - L * S;
    var p = 2 * L - q;

    return [H + 1/3, H, H - 1/3].map(function(color) {
        if(color < 0) {
            color++;
        }
        if(color > 1) {
            color--;
        }
        if(color < 1/6) {
            color = p + (q - p) * 6 * color;
        } else if(color < 0.5) {
            color = q;
        } else if(color < 2/3) {
            color = p + (q - p) * 6 * (2/3 - color);
        } else {
            color = p;
        }
        return Math.round(color * 255);
    });
};

function isArray(o) {
    return Object.prototype.toString.call(o) === '[object Array]';
}

/**
 * Color Hash Class
 *
 * @class
 */
var ColorHash = function(options) {
    options = options || {};

    var LS = [options.lightness, options.saturation].map(function(param) {
        param = param || [0.35, 0.5, 0.65]; // note that 3 is a prime
        return isArray(param) ? param.concat() : [param];
    });

    this.L = LS[0];
    this.S = LS[1];

    if (typeof options.hue === 'number') {
        options.hue = {min: options.hue, max: options.hue};
    }
    if (typeof options.hue === 'object' && !isArray(options.hue)) {
        options.hue = [options.hue];
    }
    if (typeof options.hue === 'undefined') {
        options.hue = [];
    }
    this.hueRanges = options.hue.map(function (range) {
        return {
            min: typeof range.min === 'undefined' ? 0 : range.min,
            max: typeof range.max === 'undefined' ? 360: range.max
        };
    });

    this.hash = options.hash || BKDRHash;
};

/**
 * Returns the hash in [h, s, l].
 * Note that H ∈ [0, 360); S ∈ [0, 1]; L ∈ [0, 1];
 *
 * @param {String} str string to hash
 * @returns {Array} [h, s, l]
 */
ColorHash.prototype.hsl = function(str) {
    var H, S, L;
    var hash = this.hash(str);

    if (this.hueRanges.length) {
        var range = this.hueRanges[hash % this.hueRanges.length];
        var hueResolution = 727; // note that 727 is a prime
        H = ((hash / this.hueRanges.length) % hueResolution) * (range.max - range.min) / hueResolution + range.min;
    } else {
        H = hash % 359; // note that 359 is a prime
    }
    hash = parseInt(hash / 360);
    S = this.S[hash % this.S.length];
    hash = parseInt(hash / this.S.length);
    L = this.L[hash % this.L.length];

    return [H, S, L];
};

/**
 * Returns the hash in [r, g, b].
 * Note that R, G, B ∈ [0, 255]
 *
 * @param {String} str string to hash
 * @returns {Array} [r, g, b]
 */
ColorHash.prototype.rgb = function(str) {
    var hsl = this.hsl(str);
    return HSL2RGB.apply(this, hsl);
};

/**
 * Returns the hash in hex
 *
 * @param {String} str string to hash
 * @returns {String} hex with #
 */
ColorHash.prototype.hex = function(str) {
    var rgb = this.rgb(str);
    return RGB2HEX(rgb);
};

module.exports = ColorHash;

},{"./bkdr-hash":1}]},{},[2])(2)
});