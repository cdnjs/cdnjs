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
import React from 'react';
import { getYear, getMonthHuman } from '@wojtekmaj/date-utils';
import Input from './Input.js';
import { safeMin, safeMax } from '../shared/utils.js';
export default function MonthInput(_a) {
    var maxDate = _a.maxDate, minDate = _a.minDate, year = _a.year, otherProps = __rest(_a, ["maxDate", "minDate", "year"]);
    function isSameYear(date) {
        return date && year === getYear(date).toString();
    }
    var maxMonth = safeMin(12, maxDate && isSameYear(maxDate) && getMonthHuman(maxDate));
    var minMonth = safeMax(1, minDate && isSameYear(minDate) && getMonthHuman(minDate));
    return React.createElement(Input, __assign({ max: maxMonth, min: minMonth, name: "month" }, otherProps));
}
