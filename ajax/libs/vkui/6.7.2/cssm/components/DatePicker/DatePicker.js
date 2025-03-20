import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { leadingZero } from '@vkontakte/vkjs';
import { clamp } from '../../helpers/math';
import { range } from '../../helpers/range';
import { useAdaptivityHasPointer } from '../../hooks/useAdaptivityHasPointer';
import { useCustomEnsuredControl } from '../../hooks/useEnsuredControl';
import { useNativeFormResetListener } from '../../hooks/useNativeFormResetListener';
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
    return `${year}-${leadingZero(month)}-${leadingZero(day)}`;
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
const DatePickerCustom = ({ name, min = {
    day: 0,
    month: 0,
    year: 0
}, max = {
    day: 31,
    month: 12,
    year: 2100
}, dayPlaceholder, monthPlaceholder, yearPlaceholder, popupDirection, value, monthNames, onDateChange, disabled, defaultValue = DEFAULT_EMPTY_DATE, ...restProps })=>{
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = useCustomEnsuredControl({
        value,
        defaultValue
    });
    const hiddenInput = React.useRef(null);
    const onSelectChange = (e)=>{
        const nextDate = {
            day: internalValue.day,
            month: internalValue.month,
            year: internalValue.year
        };
        nextDate[e.target.name] = Number(e.target.value);
        nextDate.day = nextDate.day ? clamp(nextDate.day, 1, getMonthMaxDay(nextDate.month, nextDate.year)) : nextDate.day;
        setInternalValue(nextDate);
        onDateChange?.(nextDate);
    };
    const dayOptions = range(1, getMonthMaxDay(internalValue.month, internalValue.year)).map((value)=>({
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
    useNativeFormResetListener(hiddenInput, ()=>{
        if (!isControlled) {
            setInternalValue(defaultValue);
        }
    });
    return /*#__PURE__*/ _jsxs(RootComponent, {
        baseClassName: styles['DatePicker'],
        ...restProps,
        children: [
            /*#__PURE__*/ _jsxs("div", {
                className: styles['DatePicker__container'],
                children: [
                    /*#__PURE__*/ _jsx("div", {
                        className: styles['DatePicker__day'],
                        children: /*#__PURE__*/ _jsx(CustomSelect, {
                            name: "day",
                            value: internalValue.day,
                            options: dayOptions,
                            placeholder: dayPlaceholder,
                            popupDirection: popupDirection,
                            onChange: onSelectChange,
                            disabled: disabled
                        })
                    }),
                    /*#__PURE__*/ _jsx("div", {
                        className: styles['DatePicker__month'],
                        children: /*#__PURE__*/ _jsx(CustomSelect, {
                            className: styles['DatePicker__monthSelect'],
                            name: "month",
                            value: internalValue.month,
                            options: monthOptions,
                            placeholder: monthPlaceholder,
                            popupDirection: popupDirection,
                            onChange: onSelectChange,
                            disabled: disabled
                        })
                    }),
                    /*#__PURE__*/ _jsx("div", {
                        className: styles['DatePicker__year'],
                        children: /*#__PURE__*/ _jsx(CustomSelect, {
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
            /*#__PURE__*/ _jsx("input", {
                type: "hidden",
                name: name,
                ref: hiddenInput,
                value: convertToInputFormat(internalValue)
            })
        ]
    });
};
const DatePickerNative = ({ min = {
    day: 0,
    month: 0,
    year: 0
}, max = {
    day: 31,
    month: 12,
    year: 2100
}, monthNames, popupDirection, dayPlaceholder, monthPlaceholder, yearPlaceholder, value, defaultValue = DEFAULT_EMPTY_DATE, onDateChange, ...restProps })=>{
    const onStringChange = React.useCallback((e)=>{
        onDateChange?.(parseInputDate(e.currentTarget.value));
    }, [
        onDateChange
    ]);
    const inputProps = restProps;
    const valueProps = value ? {
        value: convertToInputFormat(value)
    } : {
        defaultValue: convertToInputFormat(defaultValue)
    };
    return /*#__PURE__*/ _jsx(Input, {
        ...inputProps,
        ...valueProps,
        type: "date",
        onChange: onStringChange,
        min: convertToInputFormat(min),
        max: convertToInputFormat(max)
    });
};
/**
 * @see https://vkcom.github.io/VKUI/#/DatePicker
 *
 * @deprecated 6.2.0
 *
 * Компонент устарел и будет удален в v7. Используйте вместо него компоненты
 * [Input](https://vkcom.github.io/VKUI/#/Input) и
 * [Select](https://vkcom.github.io/VKUI/#/Select).
 */ export const DatePicker = ({ onDateChange, ...props })=>{
    const hasPointer = useAdaptivityHasPointer();
    const onChange = (update)=>{
        onDateChange && onDateChange({
            ...update
        });
    };
    const Cmp = hasPointer ? DatePickerCustom : DatePickerNative;
    return /*#__PURE__*/ _jsx(Cmp, {
        ...props,
        onDateChange: onChange
    });
};

//# sourceMappingURL=DatePicker.js.map