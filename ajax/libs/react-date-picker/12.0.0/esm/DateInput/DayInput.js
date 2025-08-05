import { jsx as _jsx } from "react/jsx-runtime";
import { getDate, getDaysInMonth, getMonthHuman, getYear } from '@wojtekmaj/date-utils';
import Input from './Input.js';
import { safeMax, safeMin } from '../shared/utils.js';
export default function DayInput({ maxDate, minDate, month, year, ...otherProps }) {
    const currentMonthMaxDays = (() => {
        if (!month) {
            return 31;
        }
        return getDaysInMonth(new Date(Number(year), Number(month) - 1, 1));
    })();
    function isSameMonth(date) {
        return year === getYear(date).toString() && month === getMonthHuman(date).toString();
    }
    const maxDay = safeMin(currentMonthMaxDays, maxDate && isSameMonth(maxDate) && getDate(maxDate));
    const minDay = safeMax(1, minDate && isSameMonth(minDate) && getDate(minDate));
    return _jsx(Input, { max: maxDay, min: minDay, name: "day", ...otherProps });
}
