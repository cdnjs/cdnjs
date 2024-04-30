"use strict";
'use client';
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var date_utils_1 = require("@wojtekmaj/date-utils");
var Divider_js_1 = __importDefault(require("./Divider.js"));
var DayInput_js_1 = __importDefault(require("./DateInput/DayInput.js"));
var MonthInput_js_1 = __importDefault(require("./DateInput/MonthInput.js"));
var MonthSelect_js_1 = __importDefault(require("./DateInput/MonthSelect.js"));
var YearInput_js_1 = __importDefault(require("./DateInput/YearInput.js"));
var NativeInput_js_1 = __importDefault(require("./DateInput/NativeInput.js"));
var dateFormatter_js_1 = require("./shared/dateFormatter.js");
var dates_js_1 = require("./shared/dates.js");
var utils_js_1 = require("./shared/utils.js");
var getFormatterOptionsCache = {};
var defaultMinDate = new Date();
defaultMinDate.setFullYear(1, 0, 1);
defaultMinDate.setHours(0, 0, 0, 0);
var defaultMaxDate = new Date(8.64e15);
var allViews = ['century', 'decade', 'year', 'month'];
var allValueTypes = __spreadArray(__spreadArray([], allViews.slice(1), true), ['day'], false);
function toDate(value) {
    if (value instanceof Date) {
        return value;
    }
    return new Date(value);
}
/**
 * Returns value type that can be returned with currently applied settings.
 */
function getValueType(view) {
    var index = allViews.indexOf(view);
    return allValueTypes[index];
}
function getValue(value, index) {
    var rawValue = Array.isArray(value) ? value[index] : value;
    if (!rawValue) {
        return null;
    }
    var valueDate = toDate(rawValue);
    if (isNaN(valueDate.getTime())) {
        throw new Error("Invalid date: ".concat(value));
    }
    return valueDate;
}
function getDetailValue(_a, index) {
    var value = _a.value, minDate = _a.minDate, maxDate = _a.maxDate, maxDetail = _a.maxDetail;
    var valuePiece = getValue(value, index);
    if (!valuePiece) {
        return null;
    }
    var valueType = getValueType(maxDetail);
    var detailValueFrom = (function () {
        switch (index) {
            case 0:
                return (0, dates_js_1.getBegin)(valueType, valuePiece);
            case 1:
                return (0, dates_js_1.getEnd)(valueType, valuePiece);
            default:
                throw new Error("Invalid index value: ".concat(index));
        }
    })();
    return (0, utils_js_1.between)(detailValueFrom, minDate, maxDate);
}
var getDetailValueFrom = function (args) { return getDetailValue(args, 0); };
var getDetailValueTo = function (args) { return getDetailValue(args, 1); };
var getDetailValueArray = function (args) {
    return [getDetailValueFrom, getDetailValueTo].map(function (fn) { return fn(args); });
};
function isInternalInput(element) {
    return element.dataset.input === 'true';
}
function findInput(element, property) {
    var nextElement = element;
    do {
        nextElement = nextElement[property];
    } while (nextElement && !isInternalInput(nextElement));
    return nextElement;
}
function focus(element) {
    if (element) {
        element.focus();
    }
}
function renderCustomInputs(placeholder, elementFunctions, allowMultipleInstances) {
    var usedFunctions = [];
    var pattern = new RegExp(Object.keys(elementFunctions)
        .map(function (el) { return "".concat(el, "+"); })
        .join('|'), 'g');
    var matches = placeholder.match(pattern);
    return placeholder.split(pattern).reduce(function (arr, element, index) {
        var divider = element && (
        // eslint-disable-next-line react/no-array-index-key
        (0, jsx_runtime_1.jsx)(Divider_js_1.default, { children: element }, "separator_".concat(index)));
        arr.push(divider);
        var currentMatch = matches && matches[index];
        if (currentMatch) {
            var renderFunction = elementFunctions[currentMatch] ||
                elementFunctions[Object.keys(elementFunctions).find(function (elementFunction) {
                    return currentMatch.match(elementFunction);
                })];
            if (!renderFunction) {
                return arr;
            }
            if (!allowMultipleInstances && usedFunctions.includes(renderFunction)) {
                arr.push(currentMatch);
            }
            else {
                arr.push(renderFunction(currentMatch, index));
                usedFunctions.push(renderFunction);
            }
        }
        return arr;
    }, []);
}
function DateInput(_a) {
    var autoFocus = _a.autoFocus, className = _a.className, dayAriaLabel = _a.dayAriaLabel, dayPlaceholder = _a.dayPlaceholder, disabled = _a.disabled, format = _a.format, _b = _a.isCalendarOpen, isCalendarOpenProps = _b === void 0 ? null : _b, locale = _a.locale, maxDate = _a.maxDate, _c = _a.maxDetail, maxDetail = _c === void 0 ? 'month' : _c, minDate = _a.minDate, monthAriaLabel = _a.monthAriaLabel, monthPlaceholder = _a.monthPlaceholder, _d = _a.name, name = _d === void 0 ? 'date' : _d, nativeInputAriaLabel = _a.nativeInputAriaLabel, onChangeProps = _a.onChange, onInvalidChange = _a.onInvalidChange, required = _a.required, _e = _a.returnValue, returnValue = _e === void 0 ? 'start' : _e, showLeadingZeros = _a.showLeadingZeros, valueProps = _a.value, yearAriaLabel = _a.yearAriaLabel, yearPlaceholder = _a.yearPlaceholder;
    var _f = (0, react_1.useState)(null), year = _f[0], setYear = _f[1];
    var _g = (0, react_1.useState)(null), month = _g[0], setMonth = _g[1];
    var _h = (0, react_1.useState)(null), day = _h[0], setDay = _h[1];
    var _j = (0, react_1.useState)(null), value = _j[0], setValue = _j[1];
    var yearInput = (0, react_1.useRef)(null);
    var monthInput = (0, react_1.useRef)(null);
    var monthSelect = (0, react_1.useRef)(null);
    var dayInput = (0, react_1.useRef)(null);
    var _k = (0, react_1.useState)(isCalendarOpenProps), isCalendarOpen = _k[0], setIsCalendarOpen = _k[1];
    var lastPressedKey = (0, react_1.useRef)(undefined);
    (0, react_1.useEffect)(function () {
        setIsCalendarOpen(isCalendarOpenProps);
    }, [isCalendarOpenProps]);
    (0, react_1.useEffect)(function () {
        var nextValue = getDetailValueFrom({
            value: valueProps,
            minDate: minDate,
            maxDate: maxDate,
            maxDetail: maxDetail,
        });
        if (nextValue) {
            setYear((0, date_utils_1.getYear)(nextValue).toString());
            setMonth((0, date_utils_1.getMonthHuman)(nextValue).toString());
            setDay((0, date_utils_1.getDate)(nextValue).toString());
            setValue(nextValue);
        }
        else {
            setYear(null);
            setMonth(null);
            setDay(null);
            setValue(null);
        }
    }, [
        valueProps,
        minDate,
        maxDate,
        maxDetail,
        // Toggling calendar visibility resets values
        isCalendarOpen,
    ]);
    var valueType = getValueType(maxDetail);
    var formatDate = (function () {
        var level = allViews.indexOf(maxDetail);
        var formatterOptions = getFormatterOptionsCache[level] ||
            (function () {
                var options = { year: 'numeric' };
                if (level >= 2) {
                    options.month = 'numeric';
                }
                if (level >= 3) {
                    options.day = 'numeric';
                }
                getFormatterOptionsCache[level] = options;
                return options;
            })();
        return (0, dateFormatter_js_1.getFormatter)(formatterOptions);
    })();
    /**
     * Gets current value in a desired format.
     */
    function getProcessedValue(value) {
        var processFunction = (function () {
            switch (returnValue) {
                case 'start':
                    return getDetailValueFrom;
                case 'end':
                    return getDetailValueTo;
                case 'range':
                    return getDetailValueArray;
                default:
                    throw new Error('Invalid returnValue.');
            }
        })();
        return processFunction({
            value: value,
            minDate: minDate,
            maxDate: maxDate,
            maxDetail: maxDetail,
        });
    }
    var placeholder = format ||
        (function () {
            var year = 2017;
            var monthIndex = 11;
            var day = 11;
            var date = new Date(year, monthIndex, day);
            var formattedDate = formatDate(locale, date);
            var datePieces = ['year', 'month', 'day'];
            var datePieceReplacements = ['y', 'M', 'd'];
            function formatDatePiece(name, dateToFormat) {
                var formatterOptions = getFormatterOptionsCache[name] ||
                    (function () {
                        var _a;
                        var options = (_a = {}, _a[name] = 'numeric', _a);
                        getFormatterOptionsCache[name] = options;
                        return options;
                    })();
                return (0, dateFormatter_js_1.getFormatter)(formatterOptions)(locale, dateToFormat).match(/\d{1,}/);
            }
            var placeholder = formattedDate;
            datePieces.forEach(function (datePiece, index) {
                var match = formatDatePiece(datePiece, date);
                if (match) {
                    var formattedDatePiece = match[0];
                    var datePieceReplacement = datePieceReplacements[index];
                    placeholder = placeholder.replace(formattedDatePiece, datePieceReplacement);
                }
            });
            // See: https://github.com/wojtekmaj/react-date-picker/issues/396
            placeholder = placeholder.replace('17', 'y');
            return placeholder;
        })();
    var divider = (function () {
        var dividers = placeholder.match(/[^0-9a-z]/i);
        return dividers ? dividers[0] : null;
    })();
    function onClick(event) {
        if (event.target === event.currentTarget) {
            // Wrapper was directly clicked
            var firstInput = event.target.children[1];
            focus(firstInput);
        }
    }
    function onKeyDown(event) {
        lastPressedKey.current = event.key;
        switch (event.key) {
            case 'ArrowLeft':
            case 'ArrowRight':
            case divider: {
                event.preventDefault();
                var input = event.target;
                var property = event.key === 'ArrowLeft' ? 'previousElementSibling' : 'nextElementSibling';
                var nextInput = findInput(input, property);
                focus(nextInput);
                break;
            }
            default:
        }
    }
    function onKeyUp(event) {
        var key = event.key, input = event.target;
        var isLastPressedKey = lastPressedKey.current === key;
        if (!isLastPressedKey) {
            return;
        }
        var isNumberKey = !isNaN(Number(key));
        if (!isNumberKey) {
            return;
        }
        var max = input.getAttribute('max');
        if (!max) {
            return;
        }
        var value = input.value;
        /**
         * Given 1, the smallest possible number the user could type by adding another digit is 10.
         * 10 would be a valid value given max = 12, so we won't jump to the next input.
         * However, given 2, smallers possible number would be 20, and thus keeping the focus in
         * this field doesn't make sense.
         */
        if (Number(value) * 10 > Number(max) || value.length >= max.length) {
            var property = 'nextElementSibling';
            var nextInput = findInput(input, property);
            focus(nextInput);
        }
    }
    /**
     * Called after internal onChange. Checks input validity. If all fields are valid,
     * calls props.onChange.
     */
    function onChangeExternal() {
        if (!onChangeProps) {
            return;
        }
        function filterBoolean(value) {
            return Boolean(value);
        }
        var formElements = [
            dayInput.current,
            monthInput.current,
            monthSelect.current,
            yearInput.current,
        ].filter(filterBoolean);
        var values = {};
        formElements.forEach(function (formElement) {
            values[formElement.name] =
                'valueAsNumber' in formElement
                    ? formElement.valueAsNumber
                    : Number(formElement.value);
        });
        var isEveryValueEmpty = formElements.every(function (formElement) { return !formElement.value; });
        if (isEveryValueEmpty) {
            onChangeProps(null, false);
            return;
        }
        var isEveryValueFilled = formElements.every(function (formElement) { return formElement.value; });
        var isEveryValueValid = formElements.every(function (formElement) { return formElement.validity.valid; });
        if (isEveryValueFilled && isEveryValueValid) {
            var year_1 = Number(values.year || new Date().getFullYear());
            var monthIndex = Number(values.month || 1) - 1;
            var day_1 = Number(values.day || 1);
            var proposedValue = new Date();
            proposedValue.setFullYear(year_1, monthIndex, day_1);
            proposedValue.setHours(0, 0, 0, 0);
            var processedValue = getProcessedValue(proposedValue);
            onChangeProps(processedValue, false);
            return;
        }
        if (!onInvalidChange) {
            return;
        }
        onInvalidChange();
    }
    /**
     * Called when non-native date input is changed.
     */
    function onChange(event) {
        var _a = event.target, name = _a.name, value = _a.value;
        switch (name) {
            case 'year':
                setYear(value);
                break;
            case 'month':
                setMonth(value);
                break;
            case 'day':
                setDay(value);
                break;
        }
        onChangeExternal();
    }
    /**
     * Called when native date input is changed.
     */
    function onChangeNative(event) {
        var value = event.target.value;
        if (!onChangeProps) {
            return;
        }
        var processedValue = (function () {
            if (!value) {
                return null;
            }
            var _a = value.split('-'), yearString = _a[0], monthString = _a[1], dayString = _a[2];
            var year = Number(yearString);
            var monthIndex = Number(monthString) - 1 || 0;
            var day = Number(dayString) || 1;
            var proposedValue = new Date();
            proposedValue.setFullYear(year, monthIndex, day);
            proposedValue.setHours(0, 0, 0, 0);
            return proposedValue;
        })();
        onChangeProps(processedValue, false);
    }
    var commonInputProps = {
        className: className,
        disabled: disabled,
        maxDate: maxDate || defaultMaxDate,
        minDate: minDate || defaultMinDate,
        onChange: onChange,
        onKeyDown: onKeyDown,
        onKeyUp: onKeyUp,
        // This is only for showing validity when editing
        required: Boolean(required || isCalendarOpen),
    };
    function renderDay(currentMatch, index) {
        if (currentMatch && currentMatch.length > 2) {
            throw new Error("Unsupported token: ".concat(currentMatch));
        }
        var showLeadingZerosFromFormat = currentMatch && currentMatch.length === 2;
        return ((0, jsx_runtime_1.jsx)(DayInput_js_1.default, __assign({}, commonInputProps, { ariaLabel: dayAriaLabel, 
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus: index === 0 && autoFocus, inputRef: dayInput, month: month, placeholder: dayPlaceholder, showLeadingZeros: showLeadingZerosFromFormat || showLeadingZeros, value: day, year: year }), "day"));
    }
    function renderMonth(currentMatch, index) {
        if (currentMatch && currentMatch.length > 4) {
            throw new Error("Unsupported token: ".concat(currentMatch));
        }
        if (currentMatch.length > 2) {
            return ((0, jsx_runtime_1.jsx)(MonthSelect_js_1.default, __assign({}, commonInputProps, { ariaLabel: monthAriaLabel, 
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus: index === 0 && autoFocus, inputRef: monthSelect, locale: locale, placeholder: monthPlaceholder, short: currentMatch.length === 3, value: month, year: year }), "month"));
        }
        var showLeadingZerosFromFormat = currentMatch && currentMatch.length === 2;
        return ((0, jsx_runtime_1.jsx)(MonthInput_js_1.default, __assign({}, commonInputProps, { ariaLabel: monthAriaLabel, 
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus: index === 0 && autoFocus, inputRef: monthInput, placeholder: monthPlaceholder, showLeadingZeros: showLeadingZerosFromFormat || showLeadingZeros, value: month, year: year }), "month"));
    }
    function renderYear(currentMatch, index) {
        return ((0, jsx_runtime_1.jsx)(YearInput_js_1.default, __assign({}, commonInputProps, { ariaLabel: yearAriaLabel, 
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus: index === 0 && autoFocus, inputRef: yearInput, placeholder: yearPlaceholder, value: year, valueType: valueType }), "year"));
    }
    function renderCustomInputsInternal() {
        var elementFunctions = {
            d: renderDay,
            M: renderMonth,
            y: renderYear,
        };
        var allowMultipleInstances = typeof format !== 'undefined';
        return renderCustomInputs(placeholder, elementFunctions, allowMultipleInstances);
    }
    function renderNativeInput() {
        return ((0, jsx_runtime_1.jsx)(NativeInput_js_1.default, { ariaLabel: nativeInputAriaLabel, disabled: disabled, maxDate: maxDate || defaultMaxDate, minDate: minDate || defaultMinDate, name: name, onChange: onChangeNative, required: required, value: value, valueType: valueType }, "date"));
    }
    return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    (0, jsx_runtime_1.jsxs)("div", { className: className, onClick: onClick, children: [renderNativeInput(), renderCustomInputsInternal()] }));
}
exports.default = DateInput;
