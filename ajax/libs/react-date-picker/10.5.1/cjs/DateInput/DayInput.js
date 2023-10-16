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
var react_1 = __importDefault(require("react"));
var date_utils_1 = require("@wojtekmaj/date-utils");
var Input_js_1 = __importDefault(require("./Input.js"));
var utils_js_1 = require("../shared/utils.js");
function DayInput(_a) {
    var maxDate = _a.maxDate, minDate = _a.minDate, month = _a.month, year = _a.year, otherProps = __rest(_a, ["maxDate", "minDate", "month", "year"]);
    var currentMonthMaxDays = (function () {
        if (!month) {
            return 31;
        }
        return (0, date_utils_1.getDaysInMonth)(new Date(Number(year), Number(month) - 1, 1));
    })();
    function isSameMonth(date) {
        return year === (0, date_utils_1.getYear)(date).toString() && month === (0, date_utils_1.getMonthHuman)(date).toString();
    }
    var maxDay = (0, utils_js_1.safeMin)(currentMonthMaxDays, maxDate && isSameMonth(maxDate) && (0, date_utils_1.getDate)(maxDate));
    var minDay = (0, utils_js_1.safeMax)(1, minDate && isSameMonth(minDate) && (0, date_utils_1.getDate)(minDate));
    return react_1.default.createElement(Input_js_1.default, __assign({ max: maxDay, min: minDay, name: "day" }, otherProps));
}
exports.default = DayInput;
