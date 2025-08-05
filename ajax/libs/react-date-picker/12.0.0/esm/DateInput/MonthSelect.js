import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getMonthHuman, getYear } from '@wojtekmaj/date-utils';
import clsx from 'clsx';
import { formatMonth, formatShortMonth } from '../shared/dateFormatter.js';
import { safeMax, safeMin } from '../shared/utils.js';
export default function MonthSelect({ ariaLabel, autoFocus, className, disabled, inputRef, locale, maxDate, minDate, onChange, onKeyDown, placeholder = '--', required, short, value, year, }) {
    function isSameYear(date) {
        return date && year === getYear(date).toString();
    }
    const maxMonth = safeMin(12, maxDate && isSameYear(maxDate) && getMonthHuman(maxDate));
    const minMonth = safeMax(1, minDate && isSameYear(minDate) && getMonthHuman(minDate));
    const dates = [...Array(12)].map((_el, index) => new Date(2019, index, 1));
    const name = 'month';
    const formatter = short ? formatShortMonth : formatMonth;
    return (_jsxs("select", { "aria-label": ariaLabel, 
        // biome-ignore lint/a11y/noAutofocus: This is up to developers' decision
        autoFocus: autoFocus, className: clsx(`${className}__input`, `${className}__${name}`), "data-input": "true", "data-select": "true", disabled: disabled, name: name, onChange: onChange, onKeyDown: onKeyDown, 
        // Assertion is needed for React 18 compatibility
        ref: inputRef, required: required, value: value !== null ? value : '', children: [!value && _jsx("option", { value: "", children: placeholder }), dates.map((date) => {
                const month = getMonthHuman(date);
                const disabled = month < minMonth || month > maxMonth;
                return (_jsx("option", { disabled: disabled, value: month, children: formatter(locale, date) }, month));
            })] }));
}
