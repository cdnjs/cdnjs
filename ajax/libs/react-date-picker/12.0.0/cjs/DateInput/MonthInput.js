"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MonthInput;
const jsx_runtime_1 = require("react/jsx-runtime");
const date_utils_1 = require("@wojtekmaj/date-utils");
const Input_js_1 = __importDefault(require("./Input.js"));
const utils_js_1 = require("../shared/utils.js");
function MonthInput({ maxDate, minDate, year, ...otherProps }) {
    function isSameYear(date) {
        return date && year === (0, date_utils_1.getYear)(date).toString();
    }
    const maxMonth = (0, utils_js_1.safeMin)(12, maxDate && isSameYear(maxDate) && (0, date_utils_1.getMonthHuman)(maxDate));
    const minMonth = (0, utils_js_1.safeMax)(1, minDate && isSameYear(minDate) && (0, date_utils_1.getMonthHuman)(minDate));
    return (0, jsx_runtime_1.jsx)(Input_js_1.default, { max: maxMonth, min: minMonth, name: "month", ...otherProps });
}
