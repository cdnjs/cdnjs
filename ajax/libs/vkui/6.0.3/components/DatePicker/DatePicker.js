import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { leadingZero } from '@vkontakte/vkjs';
import { range } from '../../helpers/range';
import { useAdaptivityHasPointer } from '../../hooks/useAdaptivityHasPointer';
import { CustomSelect } from '../CustomSelect/CustomSelect';
import { Input } from '../Input/Input';
import { RootComponent } from '../RootComponent/RootComponent';
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
    return `${year}-${leadingZero(month)}-${leadingZero(day)}`;
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
    }, dayPlaceholder, monthPlaceholder, yearPlaceholder, popupDirection, defaultValue, monthNames, day = 0, month = 0, year = 0, onDateChange, disabled } = _param, restProps = _object_without_properties(_param, [
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
    const dayOptions = range(1, getMonthMaxDay(month, year)).map((value)=>({
            label: String(value),
            value
        }));
    const monthOptions = (monthNames || DefaultMonths).map((name, index)=>({
            label: name,
            value: index + 1
        }));
    const yearOptions = range(max.year, min.year).map((value)=>({
            label: String(value),
            value: value
        }));
    return /*#__PURE__*/ React.createElement(RootComponent, _object_spread({
        baseClassName: "vkuiDatePicker"
    }, restProps), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiDatePicker__container"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "vkuiDatePicker__day"
    }, /*#__PURE__*/ React.createElement(CustomSelect, {
        name: "day",
        value: day,
        options: dayOptions,
        placeholder: dayPlaceholder,
        popupDirection: popupDirection,
        onChange: onSelectChange,
        disabled: disabled
    })), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiDatePicker__month"
    }, /*#__PURE__*/ React.createElement(CustomSelect, {
        className: "vkuiDatePicker__monthSelect",
        name: "month",
        value: month,
        options: monthOptions,
        placeholder: monthPlaceholder,
        popupDirection: popupDirection,
        onChange: onSelectChange,
        disabled: disabled
    })), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiDatePicker__year"
    }, /*#__PURE__*/ React.createElement(CustomSelect, {
        name: "year",
        value: year,
        options: yearOptions,
        placeholder: yearPlaceholder,
        popupDirection: popupDirection,
        onChange: onSelectChange,
        disabled: disabled
    }))), /*#__PURE__*/ React.createElement("input", {
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
    }, monthNames, popupDirection, dayPlaceholder, monthPlaceholder, yearPlaceholder, defaultValue, day, month, year, onDateChange } = _param, restProps = _object_without_properties(_param, [
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
    const onStringChange = React.useCallback((e)=>{
        onDateChange === null || onDateChange === void 0 ? void 0 : onDateChange(parseInputDate(e.currentTarget.value));
    }, [
        onDateChange
    ]);
    const inputProps = restProps;
    return /*#__PURE__*/ React.createElement(Input, _object_spread(_object_spread_props(_object_spread({}, inputProps), {
        type: "date",
        onChange: onStringChange,
        min: convertToInputFormat(min),
        max: convertToInputFormat(max)
    }), defProps));
};
/**
 * @see https://vkcom.github.io/VKUI/#/DatePicker
 */ export const DatePicker = (_param)=>{
    var { defaultValue } = _param, props = _object_without_properties(_param, [
        "defaultValue"
    ]);
    const hasPointer = useAdaptivityHasPointer();
    const [value, setValue] = React.useState(()=>({
            day: (defaultValue === null || defaultValue === void 0 ? void 0 : defaultValue.day) || 0,
            month: (defaultValue === null || defaultValue === void 0 ? void 0 : defaultValue.month) || 0,
            year: (defaultValue === null || defaultValue === void 0 ? void 0 : defaultValue.year) || 0
        }));
    const onDateChange = React.useCallback((update)=>{
        setValue(update);
        props.onDateChange && props.onDateChange(_object_spread({}, update));
    }, [
        props
    ]);
    const Cmp = hasPointer ? DatePickerCustom : DatePickerNative;
    return /*#__PURE__*/ React.createElement(Cmp, _object_spread_props(_object_spread({}, props, value), {
        onDateChange: onDateChange
    }));
};

//# sourceMappingURL=DatePicker.js.map