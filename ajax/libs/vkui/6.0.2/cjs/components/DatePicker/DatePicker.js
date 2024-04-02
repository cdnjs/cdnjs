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
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _range = require("../../helpers/range");
const _useAdaptivityHasPointer = require("../../hooks/useAdaptivityHasPointer");
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
// Переводим state к формату гг-мм-дд
function convertToInputFormat({ day = 0, month = 0, year = 0 }) {
    return `${year}-${(0, _vkjs.leadingZero)(month)}-${(0, _vkjs.leadingZero)(day)}`;
}
// Переводим дату формата гг-мм-дд к объекту
function parseInputDate(date) {
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
    }, dayPlaceholder, monthPlaceholder, yearPlaceholder, popupDirection, defaultValue, monthNames, day = 0, month = 0, year = 0, onDateChange, disabled } = _param, restProps = _object_without_properties._(_param, [
        "name",
        "min",
        "max",
        "dayPlaceholder",
        "monthPlaceholder",
        "yearPlaceholder",
        "popupDirection",
        "defaultValue",
        "monthNames",
        "day",
        "month",
        "year",
        "onDateChange",
        "disabled"
    ]);
    const onSelectChange = (e)=>{
        onDateChange === null || onDateChange === void 0 ? void 0 : onDateChange({
            day,
            month,
            year,
            [e.target.name]: Number(e.target.value)
        });
    };
    const dayOptions = (0, _range.range)(1, getMonthMaxDay(month, year)).map((value)=>({
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
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread._({
        baseClassName: "vkuiDatePicker"
    }, restProps), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiDatePicker__container"
    }, /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiDatePicker__day"
    }, /*#__PURE__*/ _react.createElement(_CustomSelect.CustomSelect, {
        name: "day",
        value: day,
        options: dayOptions,
        placeholder: dayPlaceholder,
        popupDirection: popupDirection,
        onChange: onSelectChange,
        disabled: disabled
    })), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiDatePicker__month"
    }, /*#__PURE__*/ _react.createElement(_CustomSelect.CustomSelect, {
        className: "vkuiDatePicker__monthSelect",
        name: "month",
        value: month,
        options: monthOptions,
        placeholder: monthPlaceholder,
        popupDirection: popupDirection,
        onChange: onSelectChange,
        disabled: disabled
    })), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiDatePicker__year"
    }, /*#__PURE__*/ _react.createElement(_CustomSelect.CustomSelect, {
        name: "year",
        value: year,
        options: yearOptions,
        placeholder: yearPlaceholder,
        popupDirection: popupDirection,
        onChange: onSelectChange,
        disabled: disabled
    }))), /*#__PURE__*/ _react.createElement("input", {
        type: "hidden",
        name: name,
        value: convertToInputFormat({
            day,
            month,
            year
        })
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
    }, monthNames, popupDirection, dayPlaceholder, monthPlaceholder, yearPlaceholder, defaultValue, day, month, year, onDateChange } = _param, restProps = _object_without_properties._(_param, [
        "min",
        "max",
        "monthNames",
        "popupDirection",
        "dayPlaceholder",
        "monthPlaceholder",
        "yearPlaceholder",
        "defaultValue",
        "day",
        "month",
        "year",
        "onDateChange"
    ]);
    const defProps = day && month && year ? {
        defaultValue: convertToInputFormat({
            day,
            month,
            year
        })
    } : {};
    const onStringChange = _react.useCallback((e)=>{
        onDateChange === null || onDateChange === void 0 ? void 0 : onDateChange(parseInputDate(e.currentTarget.value));
    }, [
        onDateChange
    ]);
    const inputProps = restProps;
    return /*#__PURE__*/ _react.createElement(_Input.Input, _object_spread._(_object_spread_props._(_object_spread._({}, inputProps), {
        type: "date",
        onChange: onStringChange,
        min: convertToInputFormat(min),
        max: convertToInputFormat(max)
    }), defProps));
};
const DatePicker = (_param)=>{
    var { defaultValue } = _param, props = _object_without_properties._(_param, [
        "defaultValue"
    ]);
    const hasPointer = (0, _useAdaptivityHasPointer.useAdaptivityHasPointer)();
    const [value, setValue] = _react.useState(()=>({
            day: (defaultValue === null || defaultValue === void 0 ? void 0 : defaultValue.day) || 0,
            month: (defaultValue === null || defaultValue === void 0 ? void 0 : defaultValue.month) || 0,
            year: (defaultValue === null || defaultValue === void 0 ? void 0 : defaultValue.year) || 0
        }));
    const onDateChange = _react.useCallback((update)=>{
        setValue(update);
        props.onDateChange && props.onDateChange(_object_spread._({}, update));
    }, [
        props
    ]);
    const Cmp = hasPointer ? DatePickerCustom : DatePickerNative;
    return /*#__PURE__*/ _react.createElement(Cmp, _object_spread_props._(_object_spread._({}, props, value), {
        onDateChange: onDateChange
    }));
};

//# sourceMappingURL=DatePicker.js.map