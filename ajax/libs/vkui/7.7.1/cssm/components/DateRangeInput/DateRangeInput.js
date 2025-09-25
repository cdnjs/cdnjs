'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { Icon16Clear, Icon20CalendarOutline } from "@vkontakte/icons";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity.js";
import { useDateInput } from "../../hooks/useDateInput.js";
import { useCustomEnsuredControl } from "../../hooks/useEnsuredControl.js";
import { useExternRef } from "../../hooks/useExternRef.js";
import { dateFormatter, isMatch, parse } from "../../lib/date.js";
import { CalendarRange } from "../CalendarRange/CalendarRange.js";
import { useConfigProvider } from "../ConfigProvider/ConfigProviderContext.js";
import { FocusTrap } from "../FocusTrap/FocusTrap.js";
import { FormField } from "../FormField/FormField.js";
import { IconButton } from "../IconButton/IconButton.js";
import { InputLikeDivider } from "../InputLike/InputLikeDivider.js";
import { NumberInputLike } from "../NumberInputLike/NumberInputLike.js";
import { Popper } from "../Popper/Popper.js";
import { Text } from "../Typography/Text/Text.js";
import { VisuallyHidden } from "../VisuallyHidden/VisuallyHidden.js";
import styles from "./DateRangeInput.module.css";
import dateInputStyles from "../DateInput/DateInput.module.css";
const sizeYClassNames = {
    none: styles.sizeYNone,
    compact: styles.sizeYCompact
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
    if (value?.[0]) {
        newValue[0] = String(value[0].getDate()).padStart(2, '0');
        newValue[1] = String(value[0].getMonth() + 1).padStart(2, '0');
        newValue[2] = String(value[0].getFullYear()).padStart(4, '0');
    }
    if (value?.[1]) {
        newValue[3] = String(value[1].getDate()).padStart(2, '0');
        newValue[4] = String(value[1].getMonth() + 1).padStart(2, '0');
        newValue[5] = String(value[1].getFullYear()).padStart(4, '0');
    }
    return newValue;
};
const CALENDAR_MUTATION_OBSERVER_OPTIONS = {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: [
        'tabindex'
    ]
};
/**
 * @see https://vkui.io/components/date-range-input
 */ export const DateRangeInput = ({ shouldDisableDate, disableFuture, disablePast, 'value': valueProp, defaultValue, onChange, 'calendarPlacement': calendarPlacementProp = 'bottom-start', style, className, closeOnChange = true, disablePickers, getRootRef, name, autoFocus, disabled, disableFocusTrap, restoreFocus, calendarLabel = 'Календарь', prevMonthLabel = 'Предыдущий месяц', nextMonthLabel = 'Следующий месяц', changeMonthLabel = 'Месяц', changeYearLabel = 'Год', changeStartDayLabel = 'День начала', changeStartMonthLabel = 'Месяц начала', changeStartYearLabel = 'Год начала', changeEndDayLabel = 'День окончания', changeEndMonthLabel = 'Месяц окончания', changeEndYearLabel = 'Год окончания', clearFieldLabel = 'Очистить поле', showCalendarLabel = 'Показать календарь', 'aria-label': ariaLabel = '', prevMonthIcon, nextMonthIcon, onCalendarOpenChanged, renderDayContent, calendarTestsProps, startDateTestsProps, endDateTestsProps, clearButtonTestId, showCalendarButtonTestId, id, accessible, readOnly, 'disableCalendar': disableCalendarProp = false, ...props })=>{
    const daysStartRef = React.useRef(null);
    const monthsStartRef = React.useRef(null);
    const yearsStartRef = React.useRef(null);
    const daysEndRef = React.useRef(null);
    const monthsEndRef = React.useRef(null);
    const yearsEndRef = React.useRef(null);
    const disableCalendar = readOnly ? true : disableCalendarProp;
    const _onChange = React.useCallback((newValue)=>onChange?.(newValue || undefined), [
        onChange
    ]);
    const [value, updateValue] = useCustomEnsuredControl({
        value: valueProp,
        defaultValue,
        onChange: _onChange
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
        const start = isStartValid ? parse(formattedStartValue, mask, valueExists && value?.[0] || now) : null;
        const end = isEndValid ? parse(formattedEndValue, mask, valueExists && value?.[1] || now) : null;
        if (start && end && end > start) {
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
    const onClear = React.useCallback(()=>updateValue(undefined), [
        updateValue
    ]);
    const { rootRef, calendarRef, open, openCalendar, closeCalendar, toggleCalendar, internalValue, handleKeyDown, setFocusedElement, handleFieldEnter, clear, removeFocusFromField } = useDateInput({
        maxElement: 5,
        refs,
        autoFocus,
        disabled: disabled || readOnly,
        elementsConfig,
        onClear,
        onInternalValueChange,
        getInternalValue,
        value,
        onCalendarOpenChanged,
        accessible
    });
    const { sizeY = 'none' } = useAdaptivity();
    const handleRootRef = useExternRef(rootRef, getRootRef);
    const onCalendarChange = React.useCallback((newValue)=>{
        updateValue(newValue);
        if (closeOnChange && newValue?.[1] && newValue[1] !== value?.[1]) {
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
    const { locale } = useConfigProvider();
    const currentDateLabel = React.useMemo(()=>{
        if (!value) {
            return null;
        }
        const [startDate, endDate] = value;
        if (!startDate || !endDate) {
            return null;
        }
        return [
            new Intl.DateTimeFormat(locale, {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }).format(startDate),
            new Intl.DateTimeFormat(locale, {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }).format(endDate)
        ].join(' - ');
    }, [
        locale,
        value
    ]);
    const currentDateLabelId = React.useId();
    const ariaLabelId = React.useId();
    const showCalendarOnInputAreaClick = React.useCallback(()=>{
        handleFieldEnter();
        if (accessible) {
            openCalendar();
        }
    }, [
        handleFieldEnter,
        openCalendar,
        accessible
    ]);
    return /*#__PURE__*/ _jsxs(FormField, {
        style: style,
        className: classNames(sizeY !== 'regular' && sizeYClassNames[sizeY], className),
        getRootRef: handleRootRef,
        role: "group",
        "aria-labelledby": `${ariaLabelId} ${currentDateLabelId}`,
        after: /*#__PURE__*/ _jsxs(_Fragment, {
            children: [
                !disableCalendar && (accessible || !accessible && !value) ? /*#__PURE__*/ _jsx(IconButton, {
                    hoverMode: "opacity",
                    label: showCalendarLabel,
                    onClick: toggleCalendar,
                    "data-testid": showCalendarButtonTestId,
                    children: /*#__PURE__*/ _jsx(Icon20CalendarOutline, {})
                }) : null,
                value && !readOnly ? /*#__PURE__*/ _jsx(IconButton, {
                    hoverMode: "opacity",
                    label: clearFieldLabel,
                    onClick: clear,
                    "data-testid": clearButtonTestId,
                    children: /*#__PURE__*/ _jsx(Icon16Clear, {})
                }) : null
            ]
        }),
        disabled: disabled,
        ...props,
        children: [
            /*#__PURE__*/ _jsxs("div", {
                className: dateInputStyles.wrapper,
                children: [
                    ariaLabel && /*#__PURE__*/ _jsx(VisuallyHidden, {
                        id: ariaLabelId,
                        children: ariaLabel
                    }),
                    currentDateLabel && /*#__PURE__*/ _jsx(VisuallyHidden, {
                        id: currentDateLabelId,
                        children: currentDateLabel
                    }),
                    /*#__PURE__*/ _jsx(VisuallyHidden, {
                        id: id,
                        Component: "input",
                        readOnly: true,
                        "aria-hidden": true,
                        name: name,
                        tabIndex: readOnly ? 0 : -1,
                        value: value ? `${value[0] ? dateFormatter.format(value[0]) : ''} - ${value[1] ? dateFormatter.format(value[1]) : ''}` : '',
                        onFocus: handleFieldEnter
                    }),
                    /*#__PURE__*/ _jsxs(Text, {
                        className: dateInputStyles.input,
                        onClick: showCalendarOnInputAreaClick,
                        normalize: false,
                        children: [
                            /*#__PURE__*/ _jsx(NumberInputLike, {
                                value: internalValue[0],
                                minValue: 1,
                                maxValue: 31,
                                onKeyDown: readOnly ? undefined : handleKeyDown,
                                length: 2,
                                getRootRef: daysStartRef,
                                index: 0,
                                readOnly: readOnly,
                                onElementSelect: setFocusedElement,
                                label: changeStartDayLabel,
                                "data-testid": startDateTestsProps?.day
                            }),
                            /*#__PURE__*/ _jsx(InputLikeDivider, {
                                children: "."
                            }),
                            /*#__PURE__*/ _jsx(NumberInputLike, {
                                value: internalValue[1],
                                minValue: 1,
                                maxValue: 12,
                                onKeyDown: handleKeyDown,
                                length: 2,
                                getRootRef: monthsStartRef,
                                index: 1,
                                onElementSelect: setFocusedElement,
                                readOnly: readOnly,
                                label: changeStartMonthLabel,
                                "data-testid": startDateTestsProps?.month
                            }),
                            /*#__PURE__*/ _jsx(InputLikeDivider, {
                                children: "."
                            }),
                            /*#__PURE__*/ _jsx(NumberInputLike, {
                                value: internalValue[2],
                                minValue: 1,
                                maxValue: 275750,
                                onKeyDown: handleKeyDown,
                                length: 4,
                                getRootRef: yearsStartRef,
                                index: 2,
                                onElementSelect: setFocusedElement,
                                readOnly: readOnly,
                                label: changeStartYearLabel,
                                "data-testid": startDateTestsProps?.year
                            }),
                            /*#__PURE__*/ _jsx(InputLikeDivider, {
                                children: ' — '
                            }),
                            /*#__PURE__*/ _jsx(NumberInputLike, {
                                value: internalValue[3],
                                minValue: 1,
                                maxValue: 31,
                                onKeyDown: handleKeyDown,
                                length: 2,
                                getRootRef: daysEndRef,
                                index: 3,
                                onElementSelect: setFocusedElement,
                                readOnly: readOnly,
                                label: changeEndDayLabel,
                                "data-testid": endDateTestsProps?.day
                            }),
                            /*#__PURE__*/ _jsx(InputLikeDivider, {
                                children: "."
                            }),
                            /*#__PURE__*/ _jsx(NumberInputLike, {
                                value: internalValue[4],
                                minValue: 1,
                                maxValue: 12,
                                onKeyDown: handleKeyDown,
                                length: 2,
                                getRootRef: monthsEndRef,
                                index: 4,
                                onElementSelect: setFocusedElement,
                                readOnly: readOnly,
                                label: changeEndMonthLabel,
                                "data-testid": endDateTestsProps?.month
                            }),
                            /*#__PURE__*/ _jsx(InputLikeDivider, {
                                children: "."
                            }),
                            /*#__PURE__*/ _jsx(NumberInputLike, {
                                value: internalValue[5],
                                minValue: 1,
                                maxValue: 275750,
                                onKeyDown: handleKeyDown,
                                length: 4,
                                getRootRef: yearsEndRef,
                                index: 5,
                                onElementSelect: setFocusedElement,
                                readOnly: readOnly,
                                label: changeEndYearLabel,
                                "data-testid": endDateTestsProps?.year
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
                children: /*#__PURE__*/ _jsx(FocusTrap, {
                    onClose: closeCalendar,
                    disabled: disableFocusTrap ?? !accessible,
                    restoreFocus: restoreFocus ?? Boolean(accessible),
                    captureEscapeKeyboardEvent: false,
                    mutationObserverOptions: CALENDAR_MUTATION_OBSERVER_OPTIONS,
                    children: /*#__PURE__*/ _jsx(CalendarRange, {
                        value: value,
                        role: "dialog",
                        onChange: onCalendarChange,
                        "aria-label": calendarLabel,
                        disablePast: disablePast,
                        disableFuture: disableFuture,
                        shouldDisableDate: shouldDisableDate,
                        getRootRef: calendarRef,
                        disablePickers: disablePickers,
                        prevMonthLabel: prevMonthLabel,
                        nextMonthLabel: nextMonthLabel,
                        changeMonthLabel: changeMonthLabel,
                        changeYearLabel: changeYearLabel,
                        prevMonthIcon: prevMonthIcon,
                        nextMonthIcon: nextMonthIcon,
                        renderDayContent: renderDayContent,
                        ...calendarTestsProps
                    })
                })
            })
        ]
    });
};

//# sourceMappingURL=DateRangeInput.js.map