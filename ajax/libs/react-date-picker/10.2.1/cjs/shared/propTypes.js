"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rangeOf = exports.isRef = exports.isMaxDate = exports.isMinDate = exports.isValueType = void 0;
var prop_types_1 = __importDefault(require("prop-types"));
var allViews = ['century', 'decade', 'year', 'month'];
var allValueTypes = __spreadArray(__spreadArray([], allViews.slice(1), true), ['day'], false);
exports.isValueType = prop_types_1.default.oneOf(allValueTypes);
var isMinDate = function isMinDate(props, propName, componentName) {
    var _a = props, _b = propName, minDate = _a[_b];
    if (!minDate) {
        return null;
    }
    if (!(minDate instanceof Date)) {
        return new Error("Invalid prop `".concat(propName, "` of type `").concat(typeof minDate, "` supplied to `").concat(componentName, "`, expected instance of `Date`."));
    }
    var maxDate = props.maxDate;
    if (maxDate && minDate > maxDate) {
        return new Error("Invalid prop `".concat(propName, "` of type `").concat(typeof minDate, "` supplied to `").concat(componentName, "`, minDate cannot be larger than maxDate."));
    }
    return null;
};
exports.isMinDate = isMinDate;
var isMaxDate = function isMaxDate(props, propName, componentName) {
    var _a = props, _b = propName, maxDate = _a[_b];
    if (!maxDate) {
        return null;
    }
    if (!(maxDate instanceof Date)) {
        return new Error("Invalid prop `".concat(propName, "` of type `").concat(typeof maxDate, "` supplied to `").concat(componentName, "`, expected instance of `Date`."));
    }
    var minDate = props.minDate;
    if (minDate && maxDate < minDate) {
        return new Error("Invalid prop `".concat(propName, "` of type `").concat(typeof maxDate, "` supplied to `").concat(componentName, "`, maxDate cannot be smaller than minDate."));
    }
    return null;
};
exports.isMaxDate = isMaxDate;
exports.isRef = prop_types_1.default.oneOfType([
    prop_types_1.default.func,
    prop_types_1.default.exact({
        current: prop_types_1.default.any,
    }),
]);
var rangeOf = function (type) {
    return prop_types_1.default.arrayOf(type);
};
exports.rangeOf = rangeOf;
