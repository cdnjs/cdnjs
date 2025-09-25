'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef } from "react";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { Keys, pressedKey } from "../../lib/accessibility.js";
import { callMultiple } from "../../lib/callMultiple.js";
import { setHours, setMinutes } from "../../lib/date.js";
import { AdaptivityProvider } from "../AdaptivityProvider/AdaptivityProvider.js";
import { Button } from "../Button/Button.js";
import { CustomSelect } from "../CustomSelect/CustomSelect.js";
import styles from "./CalendarTime.module.css";
const selectFilterFn = ()=>true;
const hours = [];
for(let i = 0; i < 24; i += 1){
    hours.push({
        value: i,
        label: String(i).padStart(2, '0')
    });
}
const minutes = [];
for(let i = 0; i < 60; i += 1){
    minutes.push({
        value: i,
        label: String(i).padStart(2, '0')
    });
}
const validateValue = (value, validValues)=>{
    const numValue = Number(value);
    return !isNaN(numValue) && validValues.some((v)=>v.value === numValue);
};
export const CalendarTime = ({ value, onChange, onDoneButtonClick, changeHoursLabel, changeMinutesLabel, isDayDisabled, doneButtonText = 'Готово', doneButtonDisabled = false, doneButtonShow = true, minutesTestId, hoursTestId, doneButtonTestId, DoneButton })=>{
    const hoursInputRef = useRef(null);
    const minutesInputRef = useRef(null);
    const doneButtonRef = useRef(null);
    const localHours = isDayDisabled ? hours.map((hour)=>{
        return {
            ...hour,
            disabled: isDayDisabled(setHours(value, hour.value), true)
        };
    }) : hours;
    const localMinutes = isDayDisabled ? minutes.map((minute)=>{
        return {
            ...minute,
            disabled: isDayDisabled(setMinutes(value, minute.value), true)
        };
    }) : minutes;
    const onPickerValueChange = (e, validate, setter)=>{
        const numericValue = e.target.value.replace(/\D/g, '');
        e.target.value = numericValue;
        if (validate(numericValue)) {
            onChange?.(setter(value, Number(numericValue)));
        }
    };
    const onHoursInputChange = (e)=>{
        onPickerValueChange(e, (numValue)=>validateValue(numValue, localHours), setHours);
    };
    const onMinutesInputChange = (e)=>{
        onPickerValueChange(e, (numValue)=>validateValue(numValue, localMinutes), setMinutes);
    };
    const onHoursChange = React.useCallback((_, newValue)=>onChange?.(setHours(value, Number(newValue))), [
        onChange,
        value
    ]);
    const onMinutesChange = React.useCallback((_, newValue)=>onChange?.(setMinutes(value, Number(newValue))), [
        onChange,
        value
    ]);
    const onPickerKeyDown = (e)=>{
        const key = pressedKey(e);
        /* Мы хотим иметь возможность быстро, по Enter перемещаться между
     * селектами с часами и минутами, также как мы это делаем по нажатию на Tab */ if (key !== Keys.ENTER) {
            return;
        }
        const steps = [
            hoursInputRef,
            minutesInputRef,
            doneButtonRef
        ].filter((ref)=>Boolean(ref.current));
        const currentStepIndex = steps.findIndex((step)=>step.current === e.target);
        const nextStepIndex = currentStepIndex + 1;
        if (nextStepIndex >= steps.length) {
            return;
        }
        const nextStep = steps[nextStepIndex];
        if (nextStep.current) {
            e.preventDefault();
            nextStep.current?.focus();
        }
    };
    const stopPropogationOfEscapeKeyboardEventWhenSelectIsOpen = React.useCallback((event, isOpen)=>{
        if (isOpen && event.key === 'Escape') {
            event.stopPropagation();
        }
    }, []);
    const onSelectInputKeyDown = callMultiple(onPickerKeyDown, stopPropogationOfEscapeKeyboardEventWhenSelectIsOpen);
    const renderDoneButton = ()=>{
        const ButtonComponent = DoneButton ?? Button;
        return /*#__PURE__*/ _jsx(ButtonComponent, {
            mode: "secondary",
            onClick: onDoneButtonClick,
            size: "l",
            getRootRef: doneButtonRef,
            onKeyDown: onPickerKeyDown,
            disabled: doneButtonDisabled,
            "data-testid": doneButtonTestId,
            children: doneButtonText
        });
    };
    return /*#__PURE__*/ _jsxs("div", {
        className: classNames(styles.host, !doneButtonShow && styles.host__withoutDone),
        children: [
            /*#__PURE__*/ _jsx("div", {
                className: styles.picker,
                children: /*#__PURE__*/ _jsx(AdaptivityProvider, {
                    sizeY: "compact",
                    children: /*#__PURE__*/ _jsx(CustomSelect, {
                        value: value.getHours(),
                        options: localHours,
                        onChange: onHoursChange,
                        forceDropdownPortal: false,
                        searchable: true,
                        filterFn: selectFilterFn,
                        onInputChange: onHoursInputChange,
                        onInputKeyDown: onSelectInputKeyDown,
                        getSelectInputRef: hoursInputRef,
                        "aria-label": changeHoursLabel,
                        "data-testid": hoursTestId
                    })
                })
            }),
            /*#__PURE__*/ _jsx("div", {
                className: styles.divider,
                children: ":"
            }),
            /*#__PURE__*/ _jsx("div", {
                className: styles.picker,
                children: /*#__PURE__*/ _jsx(AdaptivityProvider, {
                    sizeY: "compact",
                    children: /*#__PURE__*/ _jsx(CustomSelect, {
                        value: value.getMinutes(),
                        options: localMinutes,
                        onChange: onMinutesChange,
                        forceDropdownPortal: false,
                        searchable: true,
                        filterFn: selectFilterFn,
                        onInputChange: onMinutesInputChange,
                        getSelectInputRef: minutesInputRef,
                        onInputKeyDown: onSelectInputKeyDown,
                        "aria-label": changeMinutesLabel,
                        "data-testid": minutesTestId
                    })
                })
            }),
            doneButtonShow && /*#__PURE__*/ _jsx("div", {
                className: styles.button,
                children: /*#__PURE__*/ _jsx(AdaptivityProvider, {
                    sizeY: "compact",
                    children: renderDoneButton()
                })
            })
        ]
    });
};

//# sourceMappingURL=CalendarTime.js.map