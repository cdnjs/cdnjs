import { jsx as _jsx } from "react/jsx-runtime";
import { getYear, getISOLocalDate, getISOLocalMonth } from '@wojtekmaj/date-utils';
export default function NativeInput(_a) {
    var ariaLabel = _a.ariaLabel, disabled = _a.disabled, maxDate = _a.maxDate, minDate = _a.minDate, name = _a.name, onChange = _a.onChange, required = _a.required, value = _a.value, valueType = _a.valueType;
    var nativeInputType = (function () {
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
    var nativeValueParser = (function () {
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
