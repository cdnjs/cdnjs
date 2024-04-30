"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var date_utils_1 = require("@wojtekmaj/date-utils");
function NativeInput(_a) {
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
exports.default = NativeInput;
