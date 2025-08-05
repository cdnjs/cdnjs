import { jsx as _jsx } from "react/jsx-runtime";
import { getYear } from '@wojtekmaj/date-utils';
import Input from './Input.js';
import { safeMax, safeMin } from '../shared/utils.js';
export default function YearInput({ maxDate, minDate, placeholder = '----', valueType, ...otherProps }) {
    const maxYear = safeMin(275760, maxDate && getYear(maxDate));
    const minYear = safeMax(1, minDate && getYear(minDate));
    const yearStep = (() => {
        if (valueType === 'century') {
            return 10;
        }
        return 1;
    })();
    return (_jsx(Input, { max: maxYear, min: minYear, name: "year", placeholder: placeholder, step: yearStep, ...otherProps }));
}
