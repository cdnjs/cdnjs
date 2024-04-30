"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var date_utils_1 = require("@wojtekmaj/date-utils");
var Input_js_1 = __importDefault(require("./Input.js"));
var utils_js_1 = require("../shared/utils.js");
function MonthInput(_a) {
    var maxDate = _a.maxDate, minDate = _a.minDate, year = _a.year, otherProps = __rest(_a, ["maxDate", "minDate", "year"]);
    function isSameYear(date) {
        return date && year === (0, date_utils_1.getYear)(date).toString();
    }
    var maxMonth = (0, utils_js_1.safeMin)(12, maxDate && isSameYear(maxDate) && (0, date_utils_1.getMonthHuman)(maxDate));
    var minMonth = (0, utils_js_1.safeMax)(1, minDate && isSameYear(minDate) && (0, date_utils_1.getMonthHuman)(minDate));
    return (0, jsx_runtime_1.jsx)(Input_js_1.default, __assign({ max: maxMonth, min: minMonth, name: "month" }, otherProps));
}
exports.default = MonthInput;
