"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = __importDefault(require("./globals"));
const utils = {
    linspace: function (lo, hi, n) {
        const step = (hi - lo) / (n - 1);
        return Array.from({ length: n }, (_, i) => lo + step * i);
    },
    logspace: function (lo, hi, n) {
        return this.linspace(lo, hi, n).map((x) => Math.pow(10, x));
    },
    isValidNumber: function (v) {
        return typeof v === 'number' && !isNaN(v);
    },
    space: function (axis, range, n) {
        const lo = range[0];
        const hi = range[1];
        if (axis.type === 'log') {
            return this.logspace(Math.log10(lo), Math.log10(hi), n);
        }
        // default is linear
        return this.linspace(lo, hi, n);
    },
    getterSetter: function (config, option) {
        const me = this;
        this[option] = function (value) {
            if (!arguments.length) {
                return config[option];
            }
            config[option] = value;
            return me;
        };
    },
    sgn: function (v) {
        if (v < 0) {
            return -1;
        }
        if (v > 0) {
            return 1;
        }
        return 0;
    },
    clamp: function (v, vMin, vMax) {
        if (v < vMin)
            return vMin;
        if (v > vMax)
            return vMax;
        return v;
    },
    color: function (data, index) {
        const indexModLenColor = index % globals_1.default.COLORS.length;
        return data.color || globals_1.default.COLORS[indexModLenColor].hex();
    },
    /**
     * Infinity is a value that is close to Infinity but not Infinity, it can fit in a JS number.
     */
    infinity: function () {
        return 9007199254740991;
    }
};
exports.default = utils;
//# sourceMappingURL=utils.js.map