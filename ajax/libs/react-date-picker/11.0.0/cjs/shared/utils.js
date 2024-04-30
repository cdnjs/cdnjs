"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeMax = exports.safeMin = exports.between = void 0;
/**
 * Returns a value no smaller than min and no larger than max.
 *
 * @param {Date} value Value to return.
 * @param {Date} min Minimum return value.
 * @param {Date} max Maximum return value.
 * @returns {Date} Value between min and max.
 */
function between(value, min, max) {
    if (min && min > value) {
        return min;
    }
    if (max && max < value) {
        return max;
    }
    return value;
}
exports.between = between;
function isValidNumber(num) {
    return num !== null && num !== false && !Number.isNaN(Number(num));
}
function safeMin() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return Math.min.apply(Math, args.filter(isValidNumber));
}
exports.safeMin = safeMin;
function safeMax() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return Math.max.apply(Math, args.filter(isValidNumber));
}
exports.safeMax = safeMax;
