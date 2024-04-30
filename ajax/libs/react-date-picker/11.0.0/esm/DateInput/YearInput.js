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
import { jsx as _jsx } from "react/jsx-runtime";
import { getYear } from '@wojtekmaj/date-utils';
import Input from './Input.js';
import { safeMax, safeMin } from '../shared/utils.js';
export default function YearInput(_a) {
    var maxDate = _a.maxDate, minDate = _a.minDate, _b = _a.placeholder, placeholder = _b === void 0 ? '----' : _b, valueType = _a.valueType, otherProps = __rest(_a, ["maxDate", "minDate", "placeholder", "valueType"]);
    var maxYear = safeMin(275760, maxDate && getYear(maxDate));
    var minYear = safeMax(1, minDate && getYear(minDate));
    var yearStep = (function () {
        if (valueType === 'century') {
            return 10;
        }
        return 1;
    })();
    return (_jsx(Input, __assign({ max: maxYear, min: minYear, name: "year", placeholder: placeholder, step: yearStep }, otherProps)));
}
