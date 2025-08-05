'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
import { getDate, getMonthHuman, getYear } from '@wojtekmaj/date-utils';
import DayInput from './DateInput/DayInput.js';
import MonthInput from './DateInput/MonthInput.js';
import MonthSelect from './DateInput/MonthSelect.js';
import NativeInput from './DateInput/NativeInput.js';
import YearInput from './DateInput/YearInput.js';
import Divider from './Divider.js';
import { getFormatter } from './shared/dateFormatter.js';
import { getBegin, getEnd } from './shared/dates.js';
import { between } from './shared/utils.js';
const getFormatterOptionsCache = {};
const defaultMinDate = new Date();
defaultMinDate.setFullYear(1, 0, 1);
defaultMinDate.setHours(0, 0, 0, 0);
const defaultMaxDate = new Date(8.64e15);
const allViews = ['century', 'decade', 'year', 'month'];
const allValueTypes = [...allViews.slice(1), 'day'];
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
    const index = allViews.indexOf(view);
    return allValueTypes[index];
}
function getValue(value, index) {
    const rawValue = Array.isArray(value) ? value[index] : value;
    if (!rawValue) {
        return null;
    }
    const valueDate = toDate(rawValue);
    if (Number.isNaN(valueDate.getTime())) {
        throw new Error(`Invalid date: ${value}`);
    }
    return valueDate;
}
function getDetailValue({ value, minDate, maxDate, maxDetail }, index) {
    const valuePiece = getValue(value, index);
    if (!valuePiece) {
        return null;
    }
    const valueType = getValueType(maxDetail);
    const detailValueFrom = (() => {
        switch (index) {
            case 0:
                return getBegin(valueType, valuePiece);
            case 1:
                return getEnd(valueType, valuePiece);
            default:
                throw new Error(`Invalid index value: ${index}`);
        }
    })();
    return between(detailValueFrom, minDate, maxDate);
}
const getDetailValueFrom = (args) => getDetailValue(args, 0);
const getDetailValueTo = (args) => getDetailValue(args, 1);
const getDetailValueArray = (args) => [getDetailValueFrom, getDetailValueTo].map((fn) => fn(args));
function isInternalInput(element) {
    return element.dataset.input === 'true';
}
function findInput(element, property) {
    let nextElement = element;
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
    const usedFunctions = [];
    const pattern = new RegExp(Object.keys(elementFunctions)
        .map((el) => `${el}+`)
        .join('|'), 'g');
    const matches = placeholder.match(pattern);
    return placeholder.split(pattern).reduce((arr, element, index) => {
        const divider = element && (
        // biome-ignore lint/suspicious/noArrayIndexKey: index is stable here
        _jsx(Divider, { children: element }, `separator_${index}`));
        arr.push(divider);
        const currentMatch = matches === null || matches === void 0 ? void 0 : matches[index];
        if (currentMatch) {
            const renderFunction = elementFunctions[currentMatch] ||
                elementFunctions[Object.keys(elementFunctions).find((elementFunction) => currentMatch.match(elementFunction))];
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
export default function DateInput({ autoFocus, className, dayAriaLabel, dayPlaceholder, disabled, format, isCalendarOpen: isCalendarOpenProps = null, locale, maxDate, maxDetail = 'month', minDate, monthAriaLabel, monthPlaceholder, name = 'date', nativeInputAriaLabel, onChange: onChangeProps, onInvalidChange, required, returnValue = 'start', showLeadingZeros, value: valueProps, yearAriaLabel, yearPlaceholder, }) {
    const [year, setYear] = useState(null);
    const [month, setMonth] = useState(null);
    const [day, setDay] = useState(null);
    const [value, setValue] = useState(null);
    const yearInput = useRef(null);
    const monthInput = useRef(null);
    const monthSelect = useRef(null);
    const dayInput = useRef(null);
    const [isCalendarOpen, setIsCalendarOpen] = useState(isCalendarOpenProps);
    const lastPressedKey = useRef(undefined);
    useEffect(() => {
        setIsCalendarOpen(isCalendarOpenProps);
    }, [isCalendarOpenProps]);
    // biome-ignore lint/correctness/useExhaustiveDependencies: useEffect intentionally triggered on props change
    useEffect(() => {
        const nextValue = getDetailValueFrom({
            value: valueProps,
            minDate,
            maxDate,
            maxDetail,
        });
        if (nextValue) {
            setYear(getYear(nextValue).toString());
            setMonth(getMonthHuman(nextValue).toString());
            setDay(getDate(nextValue).toString());
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
    const valueType = getValueType(maxDetail);
    const formatDate = (() => {
        const level = allViews.indexOf(maxDetail);
        const formatterOptions = getFormatterOptionsCache[level] ||
            (() => {
                const options = { year: 'numeric' };
                if (level >= 2) {
                    options.month = 'numeric';
                }
                if (level >= 3) {
                    options.day = 'numeric';
                }
                getFormatterOptionsCache[level] = options;
                return options;
            })();
        return getFormatter(formatterOptions);
    })();
    /**
     * Gets current value in a desired format.
     */
    function getProcessedValue(value) {
        const processFunction = (() => {
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
            value,
            minDate,
            maxDate,
            maxDetail,
        });
    }
    const placeholder = format ||
        (() => {
            const year = 2017;
            const monthIndex = 11;
            const day = 11;
            const date = new Date(year, monthIndex, day);
            const formattedDate = formatDate(locale, date);
            const datePieces = ['year', 'month', 'day'];
            const datePieceReplacements = ['y', 'M', 'd'];
            function formatDatePiece(name, dateToFormat) {
                const formatterOptions = getFormatterOptionsCache[name] ||
                    (() => {
                        const options = { [name]: 'numeric' };
                        getFormatterOptionsCache[name] = options;
                        return options;
                    })();
                return getFormatter(formatterOptions)(locale, dateToFormat).match(/\d{1,}/);
            }
            let placeholder = formattedDate;
            datePieces.forEach((datePiece, index) => {
                const match = formatDatePiece(datePiece, date);
                if (match) {
                    const formattedDatePiece = match[0];
                    const datePieceReplacement = datePieceReplacements[index];
                    placeholder = placeholder.replace(formattedDatePiece, datePieceReplacement);
                }
            });
            // See https://github.com/wojtekmaj/react-date-picker/issues/396
            placeholder = placeholder.replace('17', 'y');
            return placeholder;
        })();
    const divider = (() => {
        const dividers = placeholder.match(/[^0-9a-z]/i);
        return dividers ? dividers[0] : null;
    })();
    function onClick(event) {
        if (event.target === event.currentTarget) {
            // Wrapper was directly clicked
            const firstInput = event.target.children[1];
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
                const { target: input } = event;
                const property = event.key === 'ArrowLeft' ? 'previousElementSibling' : 'nextElementSibling';
                const nextInput = findInput(input, property);
                focus(nextInput);
                break;
            }
            default:
        }
    }
    function onKeyUp(event) {
        const { key, target: input } = event;
        const isLastPressedKey = lastPressedKey.current === key;
        if (!isLastPressedKey) {
            return;
        }
        const isNumberKey = !Number.isNaN(Number(key));
        if (!isNumberKey) {
            return;
        }
        const max = input.getAttribute('max');
        if (!max) {
            return;
        }
        const { value } = input;
        /**
         * Given 1, the smallest possible number the user could type by adding another digit is 10.
         * 10 would be a valid value given max = 12, so we won't jump to the next input.
         * However, given 2, smallers possible number would be 20, and thus keeping the focus in
         * this field doesn't make sense.
         */
        if (Number(value) * 10 > Number(max) || value.length >= max.length) {
            const property = 'nextElementSibling';
            const nextInput = findInput(input, property);
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
        const formElements = [
            dayInput.current,
            monthInput.current,
            monthSelect.current,
            yearInput.current,
        ].filter(filterBoolean);
        const values = {};
        for (const formElement of formElements) {
            values[formElement.name] =
                'valueAsNumber' in formElement ? formElement.valueAsNumber : Number(formElement.value);
        }
        const isEveryValueEmpty = formElements.every((formElement) => !formElement.value);
        if (isEveryValueEmpty) {
            onChangeProps(null, false);
            return;
        }
        const isEveryValueFilled = formElements.every((formElement) => formElement.value);
        const isEveryValueValid = formElements.every((formElement) => formElement.validity.valid);
        if (isEveryValueFilled && isEveryValueValid) {
            const year = Number(values.year || new Date().getFullYear());
            const monthIndex = Number(values.month || 1) - 1;
            const day = Number(values.day || 1);
            const proposedValue = new Date();
            proposedValue.setFullYear(year, monthIndex, day);
            proposedValue.setHours(0, 0, 0, 0);
            const processedValue = getProcessedValue(proposedValue);
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
        const { name, value } = event.target;
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
        const { value } = event.target;
        if (!onChangeProps) {
            return;
        }
        const processedValue = (() => {
            if (!value) {
                return null;
            }
            const [yearString, monthString, dayString] = value.split('-');
            const year = Number(yearString);
            const monthIndex = Number(monthString) - 1 || 0;
            const day = Number(dayString) || 1;
            const proposedValue = new Date();
            proposedValue.setFullYear(year, monthIndex, day);
            proposedValue.setHours(0, 0, 0, 0);
            return proposedValue;
        })();
        onChangeProps(processedValue, false);
    }
    const commonInputProps = {
        className,
        disabled,
        maxDate: maxDate || defaultMaxDate,
        minDate: minDate || defaultMinDate,
        onChange,
        onKeyDown,
        onKeyUp,
        // This is only for showing validity when editing
        required: Boolean(required || isCalendarOpen),
    };
    function renderDay(currentMatch, index) {
        if (currentMatch && currentMatch.length > 2) {
            throw new Error(`Unsupported token: ${currentMatch}`);
        }
        const showLeadingZerosFromFormat = currentMatch && currentMatch.length === 2;
        return (_jsx(DayInput, { ...commonInputProps, ariaLabel: dayAriaLabel, autoFocus: index === 0 && autoFocus, inputRef: dayInput, month: month, placeholder: dayPlaceholder, showLeadingZeros: showLeadingZerosFromFormat || showLeadingZeros, value: day, year: year }, "day"));
    }
    function renderMonth(currentMatch, index) {
        if (currentMatch && currentMatch.length > 4) {
            throw new Error(`Unsupported token: ${currentMatch}`);
        }
        if (currentMatch.length > 2) {
            return (_jsx(MonthSelect, { ...commonInputProps, ariaLabel: monthAriaLabel, autoFocus: index === 0 && autoFocus, inputRef: monthSelect, locale: locale, placeholder: monthPlaceholder, short: currentMatch.length === 3, value: month, year: year }, "month"));
        }
        const showLeadingZerosFromFormat = currentMatch && currentMatch.length === 2;
        return (_jsx(MonthInput, { ...commonInputProps, ariaLabel: monthAriaLabel, autoFocus: index === 0 && autoFocus, inputRef: monthInput, placeholder: monthPlaceholder, showLeadingZeros: showLeadingZerosFromFormat || showLeadingZeros, value: month, year: year }, "month"));
    }
    function renderYear(_currentMatch, index) {
        return (_jsx(YearInput, { ...commonInputProps, ariaLabel: yearAriaLabel, autoFocus: index === 0 && autoFocus, inputRef: yearInput, placeholder: yearPlaceholder, value: year, valueType: valueType }, "year"));
    }
    function renderCustomInputsInternal() {
        const elementFunctions = {
            d: renderDay,
            M: renderMonth,
            y: renderYear,
        };
        const allowMultipleInstances = typeof format !== 'undefined';
        return renderCustomInputs(placeholder, elementFunctions, allowMultipleInstances);
    }
    function renderNativeInput() {
        return (_jsx(NativeInput, { ariaLabel: nativeInputAriaLabel, disabled: disabled, maxDate: maxDate || defaultMaxDate, minDate: minDate || defaultMinDate, name: name, onChange: onChangeNative, required: required, value: value, valueType: valueType }, "date"));
    }
    return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: This interaction is designed for mouse users only
    // biome-ignore lint/a11y/noStaticElementInteractions: This interaction is designed for mouse users only
    _jsxs("div", { className: className, onClick: onClick, children: [renderNativeInput(), renderCustomInputsInternal()] }));
}
