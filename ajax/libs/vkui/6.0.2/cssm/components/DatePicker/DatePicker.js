import * as React from 'react';
import { leadingZero } from '@vkontakte/vkjs';
import { range } from '../../helpers/range';
import { useAdaptivityHasPointer } from '../../hooks/useAdaptivityHasPointer';
import { CustomSelect } from '../CustomSelect/CustomSelect';
import { Input } from '../Input/Input';
import { RootComponent } from '../RootComponent/RootComponent';
import styles from './DatePicker.module.css';
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
const DatePickerCustom = ({ name, min = {
    day: 0,
    month: 0,
    year: 0
}, max = {
    day: 31,
    month: 12,
    year: 2100
}, dayPlaceholder, monthPlaceholder, yearPlaceholder, popupDirection, defaultValue, monthNames, day = 0, month = 0, year = 0, onDateChange, disabled, ...restProps })=>{
    const onSelectChange = (e)=>{
        onDateChange?.({
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
    return /*#__PURE__*/ React.createElement(RootComponent, {
        baseClassName: styles['DatePicker'],
        ...restProps
    }, /*#__PURE__*/ React.createElement("div", {
        className: styles['DatePicker__container']
    }, /*#__PURE__*/ React.createElement("div", {
        className: styles['DatePicker__day']
    }, /*#__PURE__*/ React.createElement(CustomSelect, {
        name: "day",
        value: day,
        options: dayOptions,
        placeholder: dayPlaceholder,
        popupDirection: popupDirection,
        onChange: onSelectChange,
        disabled: disabled
    })), /*#__PURE__*/ React.createElement("div", {
        className: styles['DatePicker__month']
    }, /*#__PURE__*/ React.createElement(CustomSelect, {
        className: styles['DatePicker__monthSelect'],
        name: "month",
        value: month,
        options: monthOptions,
        placeholder: monthPlaceholder,
        popupDirection: popupDirection,
        onChange: onSelectChange,
        disabled: disabled
    })), /*#__PURE__*/ React.createElement("div", {
        className: styles['DatePicker__year']
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
const DatePickerNative = ({ min = {
    day: 0,
    month: 0,
    year: 0
}, max = {
    day: 31,
    month: 12,
    year: 2100
}, monthNames, popupDirection, dayPlaceholder, monthPlaceholder, yearPlaceholder, defaultValue, day, month, year, onDateChange, ...restProps })=>{
    const defProps = day && month && year ? {
        defaultValue: convertToInputFormat({
            day,
            month,
            year
        })
    } : {};
    const onStringChange = React.useCallback((e)=>{
        onDateChange?.(parseInputDate(e.currentTarget.value));
    }, [
        onDateChange
    ]);
    const inputProps = restProps;
    return /*#__PURE__*/ React.createElement(Input, {
        ...inputProps,
        type: "date",
        onChange: onStringChange,
        min: convertToInputFormat(min),
        max: convertToInputFormat(max),
        ...defProps
    });
};
/**
 * @see https://vkcom.github.io/VKUI/#/DatePicker
 */ export const DatePicker = ({ defaultValue, ...props })=>{
    const hasPointer = useAdaptivityHasPointer();
    const [value, setValue] = React.useState(()=>({
            day: defaultValue?.day || 0,
            month: defaultValue?.month || 0,
            year: defaultValue?.year || 0
        }));
    const onDateChange = React.useCallback((update)=>{
        setValue(update);
        props.onDateChange && props.onDateChange({
            ...update
        });
    }, [
        props
    ]);
    const Cmp = hasPointer ? DatePickerCustom : DatePickerNative;
    return /*#__PURE__*/ React.createElement(Cmp, {
        ...props,
        ...value,
        onDateChange: onDateChange
    });
};

//# sourceMappingURL=DatePicker.js.map