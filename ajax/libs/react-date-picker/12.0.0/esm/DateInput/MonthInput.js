import { jsx as _jsx } from "react/jsx-runtime";
import { getMonthHuman, getYear } from '@wojtekmaj/date-utils';
import Input from './Input.js';
import { safeMax, safeMin } from '../shared/utils.js';
export default function MonthInput({ maxDate, minDate, year, ...otherProps }) {
    function isSameYear(date) {
        return date && year === getYear(date).toString();
    }
    const maxMonth = safeMin(12, maxDate && isSameYear(maxDate) && getMonthHuman(maxDate));
    const minMonth = safeMax(1, minDate && isSameYear(minDate) && getMonthHuman(minDate));
    return _jsx(Input, { max: maxMonth, min: minMonth, name: "month", ...otherProps });
}
