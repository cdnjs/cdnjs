"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DayInput;
const jsx_runtime_1 = require("react/jsx-runtime");
const date_utils_1 = require("@wojtekmaj/date-utils");
const Input_js_1 = __importDefault(require("./Input.js"));
const utils_js_1 = require("../shared/utils.js");
function DayInput({ maxDate, minDate, month, year, ...otherProps }) {
    const currentMonthMaxDays = (() => {
        if (!month) {
            return 31;
        }
        return (0, date_utils_1.getDaysInMonth)(new Date(Number(year), Number(month) - 1, 1));
    })();
    function isSameMonth(date) {
        return year === (0, date_utils_1.getYear)(date).toString() && month === (0, date_utils_1.getMonthHuman)(date).toString();
    }
    const maxDay = (0, utils_js_1.safeMin)(currentMonthMaxDays, maxDate && isSameMonth(maxDate) && (0, date_utils_1.getDate)(maxDate));
    const minDay = (0, utils_js_1.safeMax)(1, minDate && isSameMonth(minDate) && (0, date_utils_1.getDate)(minDate));
    return (0, jsx_runtime_1.jsx)(Input_js_1.default, { max: maxDay, min: minDay, name: "day", ...otherProps });
}
