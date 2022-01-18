"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = __importDefault(require("./globals"));
const utils = {
    linspace: function (lo, hi, n) {
        const step = (hi - lo) / (n - 1);
        return Array.from({ length: n }, (val, i) => lo + step * i);
    },
    logspace: function (lo, hi, n) {
        return this.linspace(lo, hi, n).map((x) => Math.pow(10, x));
    },
    isValidNumber: function (v) {
        return typeof v === 'number' && !isNaN(v);
    },
    space: function (chart, range, n) {
        const lo = range[0];
        const hi = range[1];
        if (chart.options.xAxis.type === 'log') {
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
    color: function (data, index) {
        return data.color || globals_1.default.COLORS[index].hex();
    }
};
exports.default = utils;
//# sourceMappingURL=utils.js.map