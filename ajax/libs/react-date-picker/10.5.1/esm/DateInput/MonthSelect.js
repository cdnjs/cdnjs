var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React from 'react';
import clsx from 'clsx';
import { getYear, getMonthHuman } from '@wojtekmaj/date-utils';
import { formatMonth, formatShortMonth } from '../shared/dateFormatter.js';
import { safeMin, safeMax } from '../shared/utils.js';
export default function MonthSelect(_a) {
    var ariaLabel = _a.ariaLabel, autoFocus = _a.autoFocus, className = _a.className, disabled = _a.disabled, inputRef = _a.inputRef, locale = _a.locale, maxDate = _a.maxDate, minDate = _a.minDate, onChange = _a.onChange, onKeyDown = _a.onKeyDown, _b = _a.placeholder, placeholder = _b === void 0 ? '--' : _b, required = _a.required, short = _a.short, value = _a.value, year = _a.year;
    function isSameYear(date) {
        return date && year === getYear(date).toString();
    }
    var maxMonth = safeMin(12, maxDate && isSameYear(maxDate) && getMonthHuman(maxDate));
    var minMonth = safeMax(1, minDate && isSameYear(minDate) && getMonthHuman(minDate));
    var dates = __spreadArray([], Array(12), true).map(function (el, index) { return new Date(2019, index, 1); });
    var name = 'month';
    var formatter = short ? formatShortMonth : formatMonth;
    return (React.createElement("select", { "aria-label": ariaLabel, autoFocus: autoFocus, className: clsx("".concat(className, "__input"), "".concat(className, "__").concat(name)), "data-input": "true", "data-select": "true", disabled: disabled, name: name, onChange: onChange, onKeyDown: onKeyDown, ref: inputRef, required: required, value: value !== null ? value : '' },
        !value && React.createElement("option", { value: "" }, placeholder),
        dates.map(function (date) {
            var month = getMonthHuman(date);
            var disabled = month < minMonth || month > maxMonth;
            return (React.createElement("option", { key: month, disabled: disabled, value: month }, formatter(locale, date)));
        })));
}
