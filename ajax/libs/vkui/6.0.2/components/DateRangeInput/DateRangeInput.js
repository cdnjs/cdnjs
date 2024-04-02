import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { Icon16Clear, Icon20CalendarOutline } from '@vkontakte/icons';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { useDateInput } from '../../hooks/useDateInput';
import { useExternRef } from '../../hooks/useExternRef';
import { callMultiple } from '../../lib/callMultiple';
import { format, isAfter, isMatch, parse } from '../../lib/date';
import { CalendarRange } from '../CalendarRange/CalendarRange';
import { FormField } from '../FormField/FormField';
import { IconButton } from '../IconButton/IconButton';
import { InputLike } from '../InputLike/InputLike';
import { InputLikeDivider } from '../InputLike/InputLikeDivider';
import { Popper } from '../Popper/Popper';
import { Text } from '../Typography/Text/Text';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
const sizeYClassNames = {
    none: "vkuiDateRangeInput--sizeY-none",
    ['compact']: "vkuiDateRangeInput--sizeY-compact"
};
const elementsConfig = (index)=>{
    let length = 2;
    let min = 1;
    let max = 0;
    switch(index){
        case 0:
        case 3:
            max = 31;
            break;
        case 1:
        case 4:
            max = 12;
            break;
        case 2:
        case 5:
            max = 2100;
            min = 1900;
            length = 4;
            break;
    }
    return {
        length,
        min,
        max
    };
};
const getInternalValue = (value)=>{
    const newValue = [
        '',
        '',
        '',
        '',
        '',
        ''
    ];
    if (value === null || value === void 0 ? void 0 : value[0]) {
        newValue[0] = String(value[0].getDate()).padStart(2, '0');
        newValue[1] = String(value[0].getMonth() + 1).padStart(2, '0');
        newValue[2] = String(value[0].getFullYear()).padStart(4, '0');
    }
    if (value === null || value === void 0 ? void 0 : value[1]) {
        newValue[3] = String(value[1].getDate()).padStart(2, '0');
        newValue[4] = String(value[1].getMonth() + 1).padStart(2, '0');
        newValue[5] = String(value[1].getFullYear()).padStart(4, '0');
    }
    return newValue;
};
/**
 * @see https://vkcom.github.io/VKUI/#/DateRangeInput
 */ export const DateRangeInput = (_param)=>{
    var { shouldDisableDate, disableFuture, disablePast, value, onChange, calendarPlacement = 'bottom-start', style, className, closeOnChange = true, disablePickers, getRootRef, name, autoFocus, disabled, onClick, onFocus, prevMonthLabel = 'Предыдущий месяц', nextMonthLabel = 'Следующий месяц', changeDayLabel = 'Изменить день', changeMonthLabel = 'Изменить месяц', changeYearLabel = 'Изменить год', changeStartDayLabel = 'Изменить день начала', changeStartMonthLabel = 'Изменить месяц начала', changeStartYearLabel = 'Изменить год начала', changeEndDayLabel = 'Изменить день окончания', changeEndMonthLabel = 'Изменить месяц окончания', changeEndYearLabel = 'Изменить год окончания', clearFieldLabel = 'Очистить поле', showCalendarLabel = 'Показать календарь', prevMonthIcon, nextMonthIcon, disableCalendar = false } = _param, props = _object_without_properties(_param, [
        "shouldDisableDate",
        "disableFuture",
        "disablePast",
        "value",
        "onChange",
        "calendarPlacement",
        "style",
        "className",
        "closeOnChange",
        "disablePickers",
        "getRootRef",
        "name",
        "autoFocus",
        "disabled",
        "onClick",
        "onFocus",
        "prevMonthLabel",
        "nextMonthLabel",
        "changeDayLabel",
        "changeMonthLabel",
        "changeYearLabel",
        "changeStartDayLabel",
        "changeStartMonthLabel",
        "changeStartYearLabel",
        "changeEndDayLabel",
        "changeEndMonthLabel",
        "changeEndYearLabel",
        "clearFieldLabel",
        "showCalendarLabel",
        "prevMonthIcon",
        "nextMonthIcon",
        "disableCalendar"
    ]);
    const daysStartRef = React.useRef(null);
    const monthsStartRef = React.useRef(null);
    const yearsStartRef = React.useRef(null);
    const daysEndRef = React.useRef(null);
    const monthsEndRef = React.useRef(null);
    const yearsEndRef = React.useRef(null);
    const onInternalValueChange = React.useCallback((internalValue)=>{
        let isStartValid = true;
        let isEndValid = true;
        for(let i = 0; i <= 2; i += 1){
            if (internalValue[i].length < elementsConfig(i).length) {
                isStartValid = false;
            }
        }
        for(let i = 3; i <= 5; i += 1){
            if (internalValue[i].length < elementsConfig(i).length) {
                isEndValid = false;
            }
        }
        const formattedStartValue = `${internalValue[0]}.${internalValue[1]}.${internalValue[2]}`;
        const formattedEndValue = `${internalValue[3]}.${internalValue[4]}.${internalValue[5]}`;
        const mask = 'DD.MM.YYYY';
        if (!isMatch(formattedStartValue, mask)) {
            isStartValid = false;
        }
        if (!isMatch(formattedEndValue, mask)) {
            isEndValid = false;
        }
        if (!isStartValid && !isEndValid) {
            return;
        }
        const valueExists = Array.isArray(value);
        const now = new Date();
        const start = isStartValid ? parse(formattedStartValue, mask, valueExists && (value === null || value === void 0 ? void 0 : value[0]) || now) : null;
        const end = isEndValid ? parse(formattedEndValue, mask, valueExists && (value === null || value === void 0 ? void 0 : value[1]) || now) : null;
        if (start && end && isAfter(end, start)) {
            onChange === null || onChange === void 0 ? void 0 : onChange([
                start,
                end
            ]);
        }
    }, [
        onChange,
        value
    ]);
    const refs = React.useMemo(()=>[
            daysStartRef,
            monthsStartRef,
            yearsStartRef,
            daysEndRef,
            monthsEndRef,
            yearsEndRef
        ], [
        daysStartRef,
        monthsStartRef,
        yearsStartRef,
        daysEndRef,
        monthsEndRef,
        yearsEndRef
    ]);
    const { rootRef, calendarRef, open, openCalendar, closeCalendar, internalValue, handleKeyDown, setFocusedElement, handleFieldEnter, clear, removeFocusFromField } = useDateInput({
        maxElement: 5,
        refs,
        autoFocus,
        disabled,
        elementsConfig,
        onChange,
        onInternalValueChange,
        getInternalValue,
        value
    });
    const { sizeY = 'none' } = useAdaptivity();
    const handleRootRef = useExternRef(rootRef, getRootRef);
    const onCalendarChange = React.useCallback((newValue)=>{
        onChange === null || onChange === void 0 ? void 0 : onChange(newValue);
        if (closeOnChange && (newValue === null || newValue === void 0 ? void 0 : newValue[1]) && newValue[1] !== (value === null || value === void 0 ? void 0 : value[1])) {
            removeFocusFromField();
        }
    }, [
        onChange,
        closeOnChange,
        value,
        removeFocusFromField
    ]);
    return /*#__PURE__*/ React.createElement(FormField, _object_spread({
        style: style,
        className: classNames(sizeY !== 'regular' && sizeYClassNames[sizeY], className),
        getRootRef: handleRootRef,
        after: value ? /*#__PURE__*/ React.createElement(IconButton, {
            hoverMode: "opacity",
            onClick: clear
        }, /*#__PURE__*/ React.createElement(VisuallyHidden, null, clearFieldLabel), /*#__PURE__*/ React.createElement(Icon16Clear, null)) : /*#__PURE__*/ React.createElement(IconButton, {
            hoverMode: "opacity",
            onClick: openCalendar
        }, /*#__PURE__*/ React.createElement(VisuallyHidden, null, showCalendarLabel), /*#__PURE__*/ React.createElement(Icon20CalendarOutline, null)),
        disabled: disabled,
        onClick: callMultiple(handleFieldEnter, onClick),
        onFocus: callMultiple(handleFieldEnter, onFocus)
    }, props), /*#__PURE__*/ React.createElement("input", {
        type: "hidden",
        name: name,
        value: value ? `${value[0] ? format(value[0], 'DD.MM.YYYY') : ''} - ${value[1] ? format(value[1], 'DD.MM.YYYY') : ''}` : ''
    }), /*#__PURE__*/ React.createElement(Text, {
        className: "vkuiDateInput__input",
        onKeyDown: handleKeyDown
    }, /*#__PURE__*/ React.createElement(InputLike, {
        length: 2,
        getRootRef: daysStartRef,
        index: 0,
        onElementSelect: setFocusedElement,
        value: internalValue[0],
        label: changeStartDayLabel
    }), /*#__PURE__*/ React.createElement(InputLikeDivider, null, "."), /*#__PURE__*/ React.createElement(InputLike, {
        length: 2,
        getRootRef: monthsStartRef,
        index: 1,
        onElementSelect: setFocusedElement,
        value: internalValue[1],
        label: changeStartMonthLabel
    }), /*#__PURE__*/ React.createElement(InputLikeDivider, null, "."), /*#__PURE__*/ React.createElement(InputLike, {
        length: 4,
        getRootRef: yearsStartRef,
        index: 2,
        onElementSelect: setFocusedElement,
        value: internalValue[2],
        label: changeStartYearLabel
    }), /*#__PURE__*/ React.createElement(InputLikeDivider, null, ' — '), /*#__PURE__*/ React.createElement(InputLike, {
        length: 2,
        getRootRef: daysEndRef,
        index: 3,
        onElementSelect: setFocusedElement,
        value: internalValue[3],
        label: changeEndDayLabel
    }), /*#__PURE__*/ React.createElement(InputLikeDivider, null, "."), /*#__PURE__*/ React.createElement(InputLike, {
        length: 2,
        getRootRef: monthsEndRef,
        index: 4,
        onElementSelect: setFocusedElement,
        value: internalValue[4],
        label: changeEndMonthLabel
    }), /*#__PURE__*/ React.createElement(InputLikeDivider, null, "."), /*#__PURE__*/ React.createElement(InputLike, {
        length: 4,
        getRootRef: yearsEndRef,
        index: 5,
        onElementSelect: setFocusedElement,
        value: internalValue[5],
        label: changeEndYearLabel
    })), open && !disableCalendar && /*#__PURE__*/ React.createElement(Popper, {
        targetRef: rootRef,
        offsetByMainAxis: 8,
        placement: calendarPlacement
    }, /*#__PURE__*/ React.createElement(CalendarRange, {
        value: value,
        onChange: onCalendarChange,
        disablePast: disablePast,
        disableFuture: disableFuture,
        shouldDisableDate: shouldDisableDate,
        onClose: closeCalendar,
        getRootRef: calendarRef,
        disablePickers: disablePickers,
        prevMonthLabel: prevMonthLabel,
        nextMonthLabel: nextMonthLabel,
        changeMonthLabel: changeMonthLabel,
        changeYearLabel: changeYearLabel,
        changeDayLabel: changeDayLabel,
        prevMonthIcon: prevMonthIcon,
        nextMonthIcon: nextMonthIcon
    })));
};

//# sourceMappingURL=DateRangeInput.js.map