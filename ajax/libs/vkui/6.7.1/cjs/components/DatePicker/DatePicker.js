"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DatePicker", {
    enumerable: true,
    get: function() {
        return DatePicker;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _math = require("../../helpers/math");
const _range = require("../../helpers/range");
const _useAdaptivityHasPointer = require("../../hooks/useAdaptivityHasPointer");
const _useEnsuredControl = require("../../hooks/useEnsuredControl");
const _useNativeFormResetListener = require("../../hooks/useNativeFormResetListener");
const _CustomSelect = require("../CustomSelect/CustomSelect");
const _Input = require("../Input/Input");
const _RootComponent = require("../RootComponent/RootComponent");
const DefaultMonths = [
    'Января',
    'Февраля',
    'Марта',
    'Апреля',
    'Мая',
    'Июня',
    'Июля',
    'Августа',
    'Сентября',
    'Октября',
    'Ноября',
    'Декабря'
];
const DEFAULT_EMPTY_DATE = {
    day: 0,
    month: 0,
    year: 0
};
// Переводим state к формату гг-мм-дд
function convertToInputFormat(value) {
    if (!value) {
        return undefined;
    }
    const { day = 0, month = 0, year = 0 } = value;
    return `${year}-${(0, _vkjs.leadingZero)(month)}-${(0, _vkjs.leadingZero)(day)}`;
}
// Переводим дату формата гг-мм-дд к объекту
function parseInputDate(date) {
    if (date.length === 0) {
        return DEFAULT_EMPTY_DATE;
    }
    const splited = date.split('-');
    return {
        day: Number(splited[2]),
        month: Number(splited[1]),
        year: Number(splited[0])
    };
}
function getMonthMaxDay(month, year) {
    return month ? new Date(year || 2016, month, 0).getDate() : 31;
}
const DatePickerCustom = (_param)=>{
    var { name, min = {
        day: 0,
        month: 0,
        year: 0
    }, max = {
        day: 31,
        month: 12,
        year: 2100
    }, dayPlaceholder, monthPlaceholder, yearPlaceholder, popupDirection, value, monthNames, onDateChange, disabled, defaultValue = DEFAULT_EMPTY_DATE } = _param, restProps = _object_without_properties._(_param, [
        "name",
        "min",
        "max",
        "dayPlaceholder",
        "monthPlaceholder",
        "yearPlaceholder",
        "popupDirection",
        "value",
        "monthNames",
        "onDateChange",
        "disabled",
        "defaultValue"
    ]);
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = (0, _useEnsuredControl.useCustomEnsuredControl)({
        value,
        defaultValue
    });
    const hiddenInput = _react.useRef(null);
    const onSelectChange = (e)=>{
        const nextDate = {
            day: internalValue.day,
            month: internalValue.month,
            year: internalValue.year
        };
        nextDate[e.target.name] = Number(e.target.value);
        nextDate.day = nextDate.day ? (0, _math.clamp)(nextDate.day, 1, getMonthMaxDay(nextDate.month, nextDate.year)) : nextDate.day;
        setInternalValue(nextDate);
        onDateChange === null || onDateChange === void 0 ? void 0 : onDateChange(nextDate);
    };
    const dayOptions = (0, _range.range)(1, getMonthMaxDay(internalValue.month, internalValue.year)).map((value)=>({
            label: String(value),
            value
        }));
    const monthOptions = (monthNames || DefaultMonths).map((name, index)=>({
            label: name,
            value: index + 1
        }));
    const yearOptions = (0, _range.range)(max.year, min.year).map((value)=>({
            label: String(value),
            value: value
        }));
    (0, _useNativeFormResetListener.useNativeFormResetListener)(hiddenInput, ()=>{
        if (!isControlled) {
            setInternalValue(defaultValue);
        }
    });
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({
        baseClassName: "vkuiDatePicker"
    }, restProps), {
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsxs)("div", {
                className: "vkuiDatePicker__container",
                children: [
                    /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
                        className: "vkuiDatePicker__day",
                        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_CustomSelect.CustomSelect, {
                            name: "day",
                            value: internalValue.day,
                            options: dayOptions,
                            placeholder: dayPlaceholder,
                            popupDirection: popupDirection,
                            onChange: onSelectChange,
                            disabled: disabled
                        })
                    }),
                    /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
                        className: "vkuiDatePicker__month",
                        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_CustomSelect.CustomSelect, {
                            className: "vkuiDatePicker__monthSelect",
                            name: "month",
                            value: internalValue.month,
                            options: monthOptions,
                            placeholder: monthPlaceholder,
                            popupDirection: popupDirection,
                            onChange: onSelectChange,
                            disabled: disabled
                        })
                    }),
                    /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
                        className: "vkuiDatePicker__year",
                        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_CustomSelect.CustomSelect, {
                            name: "year",
                            value: internalValue.year,
                            options: yearOptions,
                            placeholder: yearPlaceholder,
                            popupDirection: popupDirection,
                            onChange: onSelectChange,
                            disabled: disabled
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)("input", {
                type: "hidden",
                name: name,
                ref: hiddenInput,
                value: convertToInputFormat(internalValue)
            })
        ]
    }));
};
const DatePickerNative = (_param)=>{
    var { min = {
        day: 0,
        month: 0,
        year: 0
    }, max = {
        day: 31,
        month: 12,
        year: 2100
    }, monthNames, popupDirection, dayPlaceholder, monthPlaceholder, yearPlaceholder, value, defaultValue = DEFAULT_EMPTY_DATE, onDateChange } = _param, restProps = _object_without_properties._(_param, [
        "min",
        "max",
        "monthNames",
        "popupDirection",
        "dayPlaceholder",
        "monthPlaceholder",
        "yearPlaceholder",
        "value",
        "defaultValue",
        "onDateChange"
    ]);
    const onStringChange = _react.useCallback((e)=>{
        onDateChange === null || onDateChange === void 0 ? void 0 : onDateChange(parseInputDate(e.currentTarget.value));
    }, [
        onDateChange
    ]);
    const inputProps = restProps;
    const valueProps = value ? {
        value: convertToInputFormat(value)
    } : {
        defaultValue: convertToInputFormat(defaultValue)
    };
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_Input.Input, _object_spread_props._(_object_spread._({}, inputProps, valueProps), {
        type: "date",
        onChange: onStringChange,
        min: convertToInputFormat(min),
        max: convertToInputFormat(max)
    }));
};
const DatePicker = (_param)=>{
    var { onDateChange } = _param, props = _object_without_properties._(_param, [
        "onDateChange"
    ]);
    const hasPointer = (0, _useAdaptivityHasPointer.useAdaptivityHasPointer)();
    const onChange = (update)=>{
        onDateChange && onDateChange(_object_spread._({}, update));
    };
    const Cmp = hasPointer ? DatePickerCustom : DatePickerNative;
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(Cmp, _object_spread_props._(_object_spread._({}, props), {
        onDateChange: onChange
    }));
};

//# sourceMappingURL=DatePicker.js.map