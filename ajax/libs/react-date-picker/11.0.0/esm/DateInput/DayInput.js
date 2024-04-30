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
import { getYear, getMonthHuman, getDate, getDaysInMonth } from '@wojtekmaj/date-utils';
import Input from './Input.js';
import { safeMin, safeMax } from '../shared/utils.js';
export default function DayInput(_a) {
    var maxDate = _a.maxDate, minDate = _a.minDate, month = _a.month, year = _a.year, otherProps = __rest(_a, ["maxDate", "minDate", "month", "year"]);
    var currentMonthMaxDays = (function () {
        if (!month) {
            return 31;
        }
        return getDaysInMonth(new Date(Number(year), Number(month) - 1, 1));
    })();
    function isSameMonth(date) {
        return year === getYear(date).toString() && month === getMonthHuman(date).toString();
    }
    var maxDay = safeMin(currentMonthMaxDays, maxDate && isSameMonth(maxDate) && getDate(maxDate));
    var minDay = safeMax(1, minDate && isSameMonth(minDate) && getDate(minDate));
    return _jsx(Input, __assign({ max: maxDay, min: minDay, name: "day" }, otherProps));
}
