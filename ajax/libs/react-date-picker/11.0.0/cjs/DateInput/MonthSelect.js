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
var jsx_runtime_1 = require("react/jsx-runtime");
var clsx_1 = __importDefault(require("clsx"));
var date_utils_1 = require("@wojtekmaj/date-utils");
var dateFormatter_js_1 = require("../shared/dateFormatter.js");
var utils_js_1 = require("../shared/utils.js");
function MonthSelect(_a) {
    var ariaLabel = _a.ariaLabel, autoFocus = _a.autoFocus, className = _a.className, disabled = _a.disabled, inputRef = _a.inputRef, locale = _a.locale, maxDate = _a.maxDate, minDate = _a.minDate, onChange = _a.onChange, onKeyDown = _a.onKeyDown, _b = _a.placeholder, placeholder = _b === void 0 ? '--' : _b, required = _a.required, short = _a.short, value = _a.value, year = _a.year;
    function isSameYear(date) {
        return date && year === (0, date_utils_1.getYear)(date).toString();
    }
    var maxMonth = (0, utils_js_1.safeMin)(12, maxDate && isSameYear(maxDate) && (0, date_utils_1.getMonthHuman)(maxDate));
    var minMonth = (0, utils_js_1.safeMax)(1, minDate && isSameYear(minDate) && (0, date_utils_1.getMonthHuman)(minDate));
    var dates = __spreadArray([], Array(12), true).map(function (el, index) { return new Date(2019, index, 1); });
    var name = 'month';
    var formatter = short ? dateFormatter_js_1.formatShortMonth : dateFormatter_js_1.formatMonth;
    return ((0, jsx_runtime_1.jsxs)("select", { "aria-label": ariaLabel, autoFocus: autoFocus, className: (0, clsx_1.default)("".concat(className, "__input"), "".concat(className, "__").concat(name)), "data-input": "true", "data-select": "true", disabled: disabled, name: name, onChange: onChange, onKeyDown: onKeyDown, 
        // Assertion is needed for React 18 compatibility
        ref: inputRef, required: required, value: value !== null ? value : '', children: [!value && (0, jsx_runtime_1.jsx)("option", { value: "", children: placeholder }), dates.map(function (date) {
                var month = (0, date_utils_1.getMonthHuman)(date);
                var disabled = month < minMonth || month > maxMonth;
                return ((0, jsx_runtime_1.jsx)("option", { disabled: disabled, value: month, children: formatter(locale, date) }, month));
            })] }));
}
exports.default = MonthSelect;
