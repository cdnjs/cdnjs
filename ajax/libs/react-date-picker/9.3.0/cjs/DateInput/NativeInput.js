"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var prop_types_1 = __importDefault(require("prop-types"));
var date_utils_1 = require("@wojtekmaj/date-utils");
var propTypes_1 = require("../shared/propTypes");
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
    return (react_1.default.createElement("input", { "aria-label": ariaLabel, disabled: disabled, hidden: true, max: maxDate ? nativeValueParser(maxDate) : undefined, min: minDate ? nativeValueParser(minDate) : undefined, name: name, onChange: onChange, onFocus: stopPropagation, required: required, style: {
            visibility: 'hidden',
            position: 'absolute',
            zIndex: '-999',
        }, type: nativeInputType, value: value ? nativeValueParser(value) : '' }));
}
exports.default = NativeInput;
NativeInput.propTypes = {
    ariaLabel: prop_types_1.default.string,
    disabled: prop_types_1.default.bool,
    maxDate: propTypes_1.isMaxDate,
    minDate: propTypes_1.isMinDate,
    name: prop_types_1.default.string,
    onChange: prop_types_1.default.func,
    required: prop_types_1.default.bool,
    value: prop_types_1.default.instanceOf(Date),
    valueType: propTypes_1.isValueType,
};
