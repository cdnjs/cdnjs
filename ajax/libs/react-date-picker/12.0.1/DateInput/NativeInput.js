import { jsx as _jsx } from "react/jsx-runtime";
import { getISOLocalDate, getISOLocalMonth, getYear } from '@wojtekmaj/date-utils';
export default function NativeInput({ ariaLabel, disabled, maxDate, minDate, name, onChange, required, value, valueType, }) {
    const nativeInputType = (() => {
        switch (valueType) {
            case 'decade':
            case 'year':
                return 'number';
            case 'month':
                return 'month';
            case 'day':
                return 'date';
            default:
                throw new Error('Invalid valueType');
        }
    })();
    const nativeValueParser = (() => {
        switch (valueType) {
            case 'decade':
            case 'year':
                return getYear;
            case 'month':
                return getISOLocalMonth;
            case 'day':
                return getISOLocalDate;
            default:
                throw new Error('Invalid valueType');
        }
    })();
    function stopPropagation(event) {
        event.stopPropagation();
    }
    return (_jsx("input", { "aria-label": ariaLabel, disabled: disabled, hidden: true, max: maxDate ? nativeValueParser(maxDate) : undefined, min: minDate ? nativeValueParser(minDate) : undefined, name: name, onChange: onChange, onFocus: stopPropagation, required: required, style: {
            visibility: 'hidden',
            position: 'absolute',
            zIndex: '-999',
        }, type: nativeInputType, value: value ? nativeValueParser(value) : '' }));
}
