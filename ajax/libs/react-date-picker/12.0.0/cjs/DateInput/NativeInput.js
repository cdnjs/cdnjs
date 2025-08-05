"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NativeInput;
const jsx_runtime_1 = require("react/jsx-runtime");
const date_utils_1 = require("@wojtekmaj/date-utils");
function NativeInput({ ariaLabel, disabled, maxDate, minDate, name, onChange, required, value, valueType, }) {
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
                return date_utils_1.getYear;
            case 'month':
                return date_utils_1.getISOLocalMonth;
            case 'day':
                return date_utils_1.getISOLocalDate;
            default:
                throw new Error('Invalid valueType');
        }
    })();
    function stopPropagation(event) {
        event.stopPropagation();
    }
    return ((0, jsx_runtime_1.jsx)("input", { "aria-label": ariaLabel, disabled: disabled, hidden: true, max: maxDate ? nativeValueParser(maxDate) : undefined, min: minDate ? nativeValueParser(minDate) : undefined, name: name, onChange: onChange, onFocus: stopPropagation, required: required, style: {
            visibility: 'hidden',
            position: 'absolute',
            zIndex: '-999',
        }, type: nativeInputType, value: value ? nativeValueParser(value) : '' }));
}
