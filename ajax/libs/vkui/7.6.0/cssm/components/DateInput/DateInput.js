'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Icon16Clear, Icon20CalendarOutline } from "@vkontakte/icons";
import { classNames } from "@vkontakte/vkjs";
import { startOfDay, startOfMinute } from "date-fns";
import { useAdaptivity } from "../../hooks/useAdaptivity.js";
import { useDateInput } from "../../hooks/useDateInput.js";
import { useExternRef } from "../../hooks/useExternRef.js";
import { dateFormatter, dateTimeFormatter, isMatch, parse } from "../../lib/date.js";
import { useIsomorphicLayoutEffect } from "../../lib/useIsomorphicLayoutEffect.js";
import { Calendar } from "../Calendar/Calendar.js";
import { useConfigProvider } from "../ConfigProvider/ConfigProviderContext.js";
import { FocusTrap } from "../FocusTrap/FocusTrap.js";
import { FormField } from "../FormField/FormField.js";
import { IconButton } from "../IconButton/IconButton.js";
import { InputLikeDivider } from "../InputLike/InputLikeDivider.js";
import { NumberInputLike } from "../NumberInputLike/NumberInputLike.js";
import { Popper } from "../Popper/Popper.js";
import { Text } from "../Typography/Text/Text.js";
import { VisuallyHidden } from "../VisuallyHidden/VisuallyHidden.js";
import { useDateInputValue } from "./hooks.js";
import "../InputLike/InputLike.module.css"; // Reorder css
import styles from "./DateInput.module.css";
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
            max = 31;
            break;
        case 1:
            max = 12;
            break;
        case 2:
            max = 2100;
            min = 1900;
            length = 4;
            break;
        case 3:
            max = 23;
            break;
        case 4:
            max = 59;
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
        ''
    ];
    if (value) {
        newValue[0] = String(value.getDate()).padStart(2, '0');
        newValue[1] = String(value.getMonth() + 1).padStart(2, '0');
        newValue[2] = String(value.getFullYear()).padStart(4, '0');
        newValue[3] = String(value.getHours()).padStart(2, '0');
        newValue[4] = String(value.getMinutes()).padStart(2, '0');
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
 * @see https://vkui.io/components/date-input
 */ export const DateInput = ({ enableTime, shouldDisableDate, disableFuture, disablePast, minDateTime, maxDateTime, 'value': valueProp, defaultValue, onChange, 'calendarPlacement': calendarPlacementProp = 'bottom-start', style, className, doneButtonText, DoneButton, closeOnChange = true, disablePickers, getRootRef, name, autoFocus, disabled, accessible, calendarLabel = 'Календарь', prevMonthLabel = 'Предыдущий месяц', nextMonthLabel = 'Следующий месяц', changeDayLabel = 'День', changeMonthLabel = 'Месяц', changeYearLabel = 'Год', changeHoursLabel = 'Час', changeMinutesLabel = 'Минута', clearFieldLabel = 'Очистить поле', showCalendarLabel = 'Показать календарь', showNeighboringMonth, size, viewDate, onHeaderChange, onNextMonth, onPrevMonth, prevMonthIcon, nextMonthIcon, renderDayContent, onCalendarOpenChanged, calendarTestsProps, dayFieldTestId, monthFieldTestId, yearFieldTestId, hourFieldTestId, minuteFieldTestId, showCalendarButtonTestId, clearButtonTestId, id, onApply, renderCustomValue, timezone, restoreFocus, disableFocusTrap, readOnly, 'disableCalendar': disableCalendarProp = false, 'aria-label': ariaLabel = '', ...props })=>{
    const daysRef = React.useRef(null);
    const monthsRef = React.useRef(null);
    const yearsRef = React.useRef(null);
    const hoursRef = React.useRef(null);
    const minutesRef = React.useRef(null);
    const disableCalendar = readOnly ? true : disableCalendarProp;
    const { value, updateValue, setInternalValue, getLastUpdatedValue, clearValue } = useDateInputValue({
        value: valueProp,
        defaultValue,
        onChange,
        timezone
    });
    const maxElement = enableTime ? 4 : 2;
    const onInternalValueChange = React.useCallback((internalValue)=>{
        for(let i = 0; i <= maxElement; i += 1){
            if (internalValue[i].length < elementsConfig(i).length) {
                return;
            }
        }
        let formattedValue = `${internalValue[0]}.${internalValue[1]}.${internalValue[2]}`;
        let mask = 'dd.MM.yyyy';
        if (enableTime) {
            formattedValue += ` ${internalValue[3]}:${internalValue[4]}`;
            mask += ' HH:mm';
        }
        if (isMatch(formattedValue, mask)) {
            const now = new Date();
            updateValue(parse(formattedValue, mask, value ?? (enableTime ? startOfMinute(now) : startOfDay(now))));
        }
    }, [
        enableTime,
        maxElement,
        updateValue,
        value
    ]);
    const refs = React.useMemo(()=>[
            daysRef,
            monthsRef,
            yearsRef,
            hoursRef,
            minutesRef
        ], [
        daysRef,
        monthsRef,
        yearsRef,
        hoursRef,
        minutesRef
    ]);
    const { rootRef, calendarRef, open, internalValue, handleKeyDown, setFocusedElement, handleFieldEnter, clear, removeFocusFromField, closeCalendar, toggleCalendar, openCalendar, handleRestoreFocus } = useDateInput({
        maxElement,
        refs,
        autoFocus,
        disabled: disabled || readOnly,
        elementsConfig,
        onClear: clearValue,
        onInternalValueChange,
        getInternalValue,
        value,
        onCalendarOpenChanged,
        accessible
    });
    const { sizeY = 'none' } = useAdaptivity();
    const handleRootRef = useExternRef(rootRef, getRootRef);
    useIsomorphicLayoutEffect(function resetValueOnCloseCalendar() {
        if (!open) {
            setInternalValue(getLastUpdatedValue());
        }
    }, [
        open,
        getLastUpdatedValue
    ]);
    const onCalendarChange = React.useCallback((value)=>{
        if (!value) {
            return;
        }
        if (enableTime) {
            setInternalValue(value);
            return;
        }
        updateValue(value);
        if (closeOnChange) {
            removeFocusFromField();
        }
    }, [
        enableTime,
        updateValue,
        closeOnChange,
        setInternalValue,
        removeFocusFromField
    ]);
    const onDoneButtonClick = React.useCallback(()=>{
        if (!value) {
            return;
        }
        const newValue = updateValue(value);
        onApply?.(newValue);
        removeFocusFromField();
    }, [
        onApply,
        removeFocusFromField,
        updateValue,
        value
    ]);
    const customValue = React.useMemo(()=>!open && renderCustomValue?.(value || undefined), [
        open,
        renderCustomValue,
        value
    ]);
    // при переключении месяцев высота календаря может меняться,
    // чтобы календарь не прыгал при переключении месяцев каждый раз на
    // лучшую позицию мы запоминаем последнюю удачную, чтобы календарь оставался
    // на ней, пока помещается.
    const [calendarPlacement, setCalendarPlacement] = React.useState(calendarPlacementProp);
    const { locale } = useConfigProvider();
    const currentDateLabel = value ? new Intl.DateTimeFormat(locale, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(value) : null;
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
        after: /*#__PURE__*/ _jsxs(React.Fragment, {
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
                className: styles.wrapper,
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
                        tabIndex: readOnly ? 0 : -1,
                        name: name,
                        value: value ? enableTime ? dateTimeFormatter.format(value) : dateFormatter.format(value) : '',
                        onFocus: handleFieldEnter
                    }),
                    /*#__PURE__*/ _jsxs(Text, {
                        className: classNames(styles.input, customValue && styles.hidden),
                        // Инцидент: в PR https://github.com/VKCOM/VKUI/pull/6649 стабильно ломается порядок стилей
                        // из-за чего `.Typography--normalize` перебивает стили.
                        normalize: false,
                        Component: "span",
                        onClick: showCalendarOnInputAreaClick,
                        children: [
                            /*#__PURE__*/ _jsx(NumberInputLike, {
                                value: internalValue[0],
                                minValue: 1,
                                maxValue: 31,
                                length: 2,
                                getRootRef: daysRef,
                                index: 0,
                                onKeyDown: handleKeyDown,
                                onElementSelect: setFocusedElement,
                                label: changeDayLabel,
                                readOnly: readOnly,
                                "data-testid": dayFieldTestId
                            }),
                            /*#__PURE__*/ _jsx(InputLikeDivider, {
                                children: "."
                            }),
                            /*#__PURE__*/ _jsx(NumberInputLike, {
                                value: internalValue[1],
                                minValue: 1,
                                maxValue: 12,
                                length: 2,
                                getRootRef: monthsRef,
                                index: 1,
                                onElementSelect: setFocusedElement,
                                onKeyDown: handleKeyDown,
                                readOnly: readOnly,
                                label: changeMonthLabel,
                                "data-testid": monthFieldTestId
                            }),
                            /*#__PURE__*/ _jsx(InputLikeDivider, {
                                children: "."
                            }),
                            /*#__PURE__*/ _jsx(NumberInputLike, {
                                value: internalValue[2],
                                minValue: 1,
                                maxValue: 275750,
                                length: 4,
                                getRootRef: yearsRef,
                                index: 2,
                                onElementSelect: setFocusedElement,
                                readOnly: readOnly,
                                label: changeYearLabel,
                                onKeyDown: handleKeyDown,
                                "data-testid": yearFieldTestId
                            }),
                            enableTime && /*#__PURE__*/ _jsxs(React.Fragment, {
                                children: [
                                    /*#__PURE__*/ _jsx(InputLikeDivider, {
                                        className: styles.inputTimeDivider,
                                        children: " "
                                    }),
                                    /*#__PURE__*/ _jsx(NumberInputLike, {
                                        value: internalValue[3],
                                        minValue: 1,
                                        maxValue: 24,
                                        length: 2,
                                        getRootRef: hoursRef,
                                        index: 3,
                                        onElementSelect: setFocusedElement,
                                        readOnly: readOnly,
                                        label: changeHoursLabel,
                                        onKeyDown: handleKeyDown,
                                        "data-testid": hourFieldTestId
                                    }),
                                    /*#__PURE__*/ _jsx(InputLikeDivider, {
                                        children: ":"
                                    }),
                                    /*#__PURE__*/ _jsx(NumberInputLike, {
                                        value: internalValue[4],
                                        minValue: 1,
                                        maxValue: 59,
                                        length: 2,
                                        getRootRef: minutesRef,
                                        index: 4,
                                        onElementSelect: setFocusedElement,
                                        readOnly: readOnly,
                                        label: changeMinutesLabel,
                                        onKeyDown: handleKeyDown,
                                        "data-testid": minuteFieldTestId
                                    })
                                ]
                            })
                        ]
                    }),
                    customValue && /*#__PURE__*/ _jsx(Text, {
                        className: styles.customValue,
                        "aria-hidden": true,
                        normalize: false,
                        children: customValue
                    })
                ]
            }),
            open && !disableCalendar && /*#__PURE__*/ _jsx(Popper, {
                targetRef: rootRef,
                offsetByMainAxis: 8,
                placement: calendarPlacement,
                onPlacementChange: setCalendarPlacement,
                autoUpdateOnTargetResize: true,
                children: /*#__PURE__*/ _jsx(FocusTrap, {
                    onClose: closeCalendar,
                    disabled: disableFocusTrap ?? !accessible,
                    restoreFocus: restoreFocus ?? (Boolean(accessible) && handleRestoreFocus),
                    captureEscapeKeyboardEvent: false,
                    mutationObserverOptions: CALENDAR_MUTATION_OBSERVER_OPTIONS,
                    children: /*#__PURE__*/ _jsx(Calendar, {
                        "aria-label": calendarLabel,
                        role: "dialog",
                        value: value,
                        onChange: onCalendarChange,
                        enableTime: enableTime,
                        disablePast: disablePast,
                        disableFuture: disableFuture,
                        shouldDisableDate: shouldDisableDate,
                        onDoneButtonClick: onDoneButtonClick,
                        getRootRef: calendarRef,
                        doneButtonText: doneButtonText,
                        DoneButton: DoneButton,
                        disablePickers: disablePickers,
                        changeHoursLabel: changeHoursLabel,
                        changeMinutesLabel: changeMinutesLabel,
                        prevMonthLabel: prevMonthLabel,
                        nextMonthLabel: nextMonthLabel,
                        changeMonthLabel: changeMonthLabel,
                        changeYearLabel: changeYearLabel,
                        showNeighboringMonth: showNeighboringMonth,
                        renderDayContent: renderDayContent,
                        size: size,
                        viewDate: viewDate,
                        onHeaderChange: onHeaderChange,
                        onNextMonth: onNextMonth,
                        onPrevMonth: onPrevMonth,
                        prevMonthIcon: prevMonthIcon,
                        nextMonthIcon: nextMonthIcon,
                        minDateTime: minDateTime,
                        maxDateTime: maxDateTime,
                        ...calendarTestsProps
                    })
                })
            })
        ]
    });
};

//# sourceMappingURL=DateInput.js.map