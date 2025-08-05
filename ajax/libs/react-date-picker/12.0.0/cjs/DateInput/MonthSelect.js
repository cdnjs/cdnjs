"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MonthSelect;
const jsx_runtime_1 = require("react/jsx-runtime");
const date_utils_1 = require("@wojtekmaj/date-utils");
const clsx_1 = __importDefault(require("clsx"));
const dateFormatter_js_1 = require("../shared/dateFormatter.js");
const utils_js_1 = require("../shared/utils.js");
function MonthSelect({ ariaLabel, autoFocus, className, disabled, inputRef, locale, maxDate, minDate, onChange, onKeyDown, placeholder = '--', required, short, value, year, }) {
    function isSameYear(date) {
        return date && year === (0, date_utils_1.getYear)(date).toString();
    }
    const maxMonth = (0, utils_js_1.safeMin)(12, maxDate && isSameYear(maxDate) && (0, date_utils_1.getMonthHuman)(maxDate));
    const minMonth = (0, utils_js_1.safeMax)(1, minDate && isSameYear(minDate) && (0, date_utils_1.getMonthHuman)(minDate));
    const dates = [...Array(12)].map((_el, index) => new Date(2019, index, 1));
    const name = 'month';
    const formatter = short ? dateFormatter_js_1.formatShortMonth : dateFormatter_js_1.formatMonth;
    return ((0, jsx_runtime_1.jsxs)("select", { "aria-label": ariaLabel, 
        // biome-ignore lint/a11y/noAutofocus: This is up to developers' decision
        autoFocus: autoFocus, className: (0, clsx_1.default)(`${className}__input`, `${className}__${name}`), "data-input": "true", "data-select": "true", disabled: disabled, name: name, onChange: onChange, onKeyDown: onKeyDown, 
        // Assertion is needed for React 18 compatibility
        ref: inputRef, required: required, value: value !== null ? value : '', children: [!value && (0, jsx_runtime_1.jsx)("option", { value: "", children: placeholder }), dates.map((date) => {
                const month = (0, date_utils_1.getMonthHuman)(date);
                const disabled = month < minMonth || month > maxMonth;
                return ((0, jsx_runtime_1.jsx)("option", { disabled: disabled, value: month, children: formatter(locale, date) }, month));
            })] }));
}
