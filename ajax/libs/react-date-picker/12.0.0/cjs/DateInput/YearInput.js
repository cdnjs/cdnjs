"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = YearInput;
const jsx_runtime_1 = require("react/jsx-runtime");
const date_utils_1 = require("@wojtekmaj/date-utils");
const Input_js_1 = __importDefault(require("./Input.js"));
const utils_js_1 = require("../shared/utils.js");
function YearInput({ maxDate, minDate, placeholder = '----', valueType, ...otherProps }) {
    const maxYear = (0, utils_js_1.safeMin)(275760, maxDate && (0, date_utils_1.getYear)(maxDate));
    const minYear = (0, utils_js_1.safeMax)(1, minDate && (0, date_utils_1.getYear)(minDate));
    const yearStep = (() => {
        if (valueType === 'century') {
            return 10;
        }
        return 1;
    })();
    return ((0, jsx_runtime_1.jsx)(Input_js_1.default, { max: maxYear, min: minYear, name: "year", placeholder: placeholder, step: yearStep, ...otherProps }));
}
