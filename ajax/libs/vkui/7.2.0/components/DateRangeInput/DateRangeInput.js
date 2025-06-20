'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Icon16Clear, Icon20CalendarOutline } from "@vkontakte/icons";
import { classNames } from "@vkontakte/vkjs";
import { isAfter } from "date-fns";
import { useAdaptivity } from "../../hooks/useAdaptivity.js";
import { useDateInput } from "../../hooks/useDateInput.js";
import { useCustomEnsuredControl } from "../../hooks/useEnsuredControl.js";
import { useExternRef } from "../../hooks/useExternRef.js";
import { callMultiple } from "../../lib/callMultiple.js";
import { format, isMatch, parse } from "../../lib/date.js";
import { CalendarRange } from "../CalendarRange/CalendarRange.js";
import { FormField } from "../FormField/FormField.js";
import { IconButton } from "../IconButton/IconButton.js";
import { InputLike } from "../InputLike/InputLike.js";
import { InputLikeDivider } from "../InputLike/InputLikeDivider.js";
import { Popper } from "../Popper/Popper.js";
import { Text } from "../Typography/Text/Text.js";
import { VisuallyHidden } from "../VisuallyHidden/VisuallyHidden.js";
const sizeYClassNames = {
    none: "vkuiDateRangeInput__sizeYNone",
    compact: "vkuiDateRangeInput__sizeYCompact"
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
    var { shouldDisableDate, disableFuture, disablePast, value: valueProp, defaultValue, onChange, calendarPlacement: calendarPlacementProp = 'bottom-start', style, className, closeOnChange = true, disablePickers, getRootRef, name, autoFocus, disabled, onClick, onFocus, prevMonthLabel = 'Предыдущий месяц', nextMonthLabel = 'Следующий месяц', changeDayLabel = 'Изменить день', changeMonthLabel = 'Изменить месяц', changeYearLabel = 'Изменить год', changeStartDayLabel = 'Изменить день начала', changeStartMonthLabel = 'Изменить месяц начала', changeStartYearLabel = 'Изменить год начала', changeEndDayLabel = 'Изменить день окончания', changeEndMonthLabel = 'Изменить месяц окончания', changeEndYearLabel = 'Изменить год окончания', clearFieldLabel = 'Очистить поле', showCalendarLabel = 'Показать календарь', prevMonthIcon, nextMonthIcon, disableCalendar = false, onCalendarOpenChanged, renderDayContent, calendarTestsProps, startDateTestsProps, endDateTestsProps, id } = _param, props = _object_without_properties(_param, [
        "shouldDisableDate",
        "disableFuture",
        "disablePast",
        "value",
        "defaultValue",
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
        "disableCalendar",
        "onCalendarOpenChanged",
        "renderDayContent",
        "calendarTestsProps",
        "startDateTestsProps",
        "endDateTestsProps",
        "id"
    ]);
    const daysStartRef = React.useRef(null);
    const monthsStartRef = React.useRef(null);
    const yearsStartRef = React.useRef(null);
    const daysEndRef = React.useRef(null);
    const monthsEndRef = React.useRef(null);
    const yearsEndRef = React.useRef(null);
    const [value, updateValue] = useCustomEnsuredControl({
        value: valueProp,
        defaultValue,
        onChange
    });
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
        const mask = 'dd.MM.yyyy';
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
            updateValue([
                start,
                end
            ]);
        }
    }, [
        updateValue,
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
        onChange: updateValue,
        onInternalValueChange,
        getInternalValue,
        value,
        onCalendarOpenChanged
    });
    const { sizeY = 'none' } = useAdaptivity();
    const handleRootRef = useExternRef(rootRef, getRootRef);
    const onCalendarChange = React.useCallback((newValue)=>{
        updateValue(newValue);
        if (closeOnChange && (newValue === null || newValue === void 0 ? void 0 : newValue[1]) && newValue[1] !== (value === null || value === void 0 ? void 0 : value[1])) {
            removeFocusFromField();
        }
    }, [
        updateValue,
        closeOnChange,
        value,
        removeFocusFromField
    ]);
    // при переключении месяцев высота календаря может меняться,
    // чтобы календарь не прыгал при переключении месяцев каждый раз на
    // лучшую позицию мы запоминаем последнюю удачную, чтобы календарь оставался
    // на ней, пока помещается.
    const [calendarPlacement, setCalendarPlacement] = React.useState(calendarPlacementProp);
    return /*#__PURE__*/ _jsxs(FormField, _object_spread_props(_object_spread({
        style: style,
        className: classNames(sizeY !== 'regular' && sizeYClassNames[sizeY], className),
        getRootRef: handleRootRef,
        after: value ? /*#__PURE__*/ _jsxs(IconButton, {
            hoverMode: "opacity",
            onClick: clear,
            children: [
                /*#__PURE__*/ _jsx(VisuallyHidden, {
                    children: clearFieldLabel
                }),
                /*#__PURE__*/ _jsx(Icon16Clear, {})
            ]
        }) : /*#__PURE__*/ _jsxs(IconButton, {
            hoverMode: "opacity",
            onClick: openCalendar,
            children: [
                /*#__PURE__*/ _jsx(VisuallyHidden, {
                    children: showCalendarLabel
                }),
                /*#__PURE__*/ _jsx(Icon20CalendarOutline, {})
            ]
        }),
        disabled: disabled,
        onClick: callMultiple(handleFieldEnter, onClick),
        onFocus: callMultiple(handleFieldEnter, onFocus)
    }, props), {
        children: [
            /*#__PURE__*/ _jsxs("div", {
                className: "vkuiDateInput__wrapper",
                children: [
                    /*#__PURE__*/ _jsx(VisuallyHidden, {
                        id: id,
                        Component: "input",
                        name: name,
                        value: value ? `${value[0] ? format(value[0], 'dd.MM.yyyy') : ''} - ${value[1] ? format(value[1], 'dd.MM.yyyy') : ''}` : ''
                    }),
                    /*#__PURE__*/ _jsxs(Text, {
                        className: "vkuiDateInput__input",
                        onKeyDown: handleKeyDown,
                        children: [
                            /*#__PURE__*/ _jsx(InputLike, {
                                length: 2,
                                getRootRef: daysStartRef,
                                index: 0,
                                onElementSelect: setFocusedElement,
                                value: internalValue[0],
                                label: changeStartDayLabel,
                                "data-testid": startDateTestsProps === null || startDateTestsProps === void 0 ? void 0 : startDateTestsProps.day
                            }),
                            /*#__PURE__*/ _jsx(InputLikeDivider, {
                                children: "."
                            }),
                            /*#__PURE__*/ _jsx(InputLike, {
                                length: 2,
                                getRootRef: monthsStartRef,
                                index: 1,
                                onElementSelect: setFocusedElement,
                                value: internalValue[1],
                                label: changeStartMonthLabel,
                                "data-testid": startDateTestsProps === null || startDateTestsProps === void 0 ? void 0 : startDateTestsProps.month
                            }),
                            /*#__PURE__*/ _jsx(InputLikeDivider, {
                                children: "."
                            }),
                            /*#__PURE__*/ _jsx(InputLike, {
                                length: 4,
                                getRootRef: yearsStartRef,
                                index: 2,
                                onElementSelect: setFocusedElement,
                                value: internalValue[2],
                                label: changeStartYearLabel,
                                "data-testid": startDateTestsProps === null || startDateTestsProps === void 0 ? void 0 : startDateTestsProps.year
                            }),
                            /*#__PURE__*/ _jsx(InputLikeDivider, {
                                children: ' — '
                            }),
                            /*#__PURE__*/ _jsx(InputLike, {
                                length: 2,
                                getRootRef: daysEndRef,
                                index: 3,
                                onElementSelect: setFocusedElement,
                                value: internalValue[3],
                                label: changeEndDayLabel,
                                "data-testid": endDateTestsProps === null || endDateTestsProps === void 0 ? void 0 : endDateTestsProps.day
                            }),
                            /*#__PURE__*/ _jsx(InputLikeDivider, {
                                children: "."
                            }),
                            /*#__PURE__*/ _jsx(InputLike, {
                                length: 2,
                                getRootRef: monthsEndRef,
                                index: 4,
                                onElementSelect: setFocusedElement,
                                value: internalValue[4],
                                label: changeEndMonthLabel,
                                "data-testid": endDateTestsProps === null || endDateTestsProps === void 0 ? void 0 : endDateTestsProps.month
                            }),
                            /*#__PURE__*/ _jsx(InputLikeDivider, {
                                children: "."
                            }),
                            /*#__PURE__*/ _jsx(InputLike, {
                                length: 4,
                                getRootRef: yearsEndRef,
                                index: 5,
                                onElementSelect: setFocusedElement,
                                value: internalValue[5],
                                label: changeEndYearLabel,
                                "data-testid": endDateTestsProps === null || endDateTestsProps === void 0 ? void 0 : endDateTestsProps.year
                            })
                        ]
                    })
                ]
            }),
            open && !disableCalendar && /*#__PURE__*/ _jsx(Popper, {
                targetRef: rootRef,
                offsetByMainAxis: 8,
                placement: calendarPlacement,
                onPlacementChange: setCalendarPlacement,
                children: /*#__PURE__*/ _jsx(CalendarRange, _object_spread({
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
                    nextMonthIcon: nextMonthIcon,
                    renderDayContent: renderDayContent
                }, calendarTestsProps))
            })
        ]
    }));
};

//# sourceMappingURL=DateRangeInput.js.map