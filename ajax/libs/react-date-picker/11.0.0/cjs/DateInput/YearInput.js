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
function YearInput(_a) {
    var maxDate = _a.maxDate, minDate = _a.minDate, _b = _a.placeholder, placeholder = _b === void 0 ? '----' : _b, valueType = _a.valueType, otherProps = __rest(_a, ["maxDate", "minDate", "placeholder", "valueType"]);
    var maxYear = (0, utils_js_1.safeMin)(275760, maxDate && (0, date_utils_1.getYear)(maxDate));
    var minYear = (0, utils_js_1.safeMax)(1, minDate && (0, date_utils_1.getYear)(minDate));
    var yearStep = (function () {
        if (valueType === 'century') {
            return 10;
        }
        return 1;
    })();
    return ((0, jsx_runtime_1.jsx)(Input_js_1.default, __assign({ max: maxYear, min: minYear, name: "year", placeholder: placeholder, step: yearStep }, otherProps)));
}
exports.default = YearInput;
