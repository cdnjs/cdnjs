'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef } from "react";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { setHours, setMinutes } from "date-fns";
import { Keys, pressedKey } from "../../lib/accessibility.js";
import { AdaptivityProvider } from "../AdaptivityProvider/AdaptivityProvider.js";
import { Button } from "../Button/Button.js";
import { CustomSelect } from "../CustomSelect/CustomSelect.js";
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
        return _object_spread_props(_object_spread({}, hour), {
            disabled: isDayDisabled(setHours(value, hour.value), true)
        });
    }) : hours;
    const localMinutes = isDayDisabled ? minutes.map((minute)=>{
        return _object_spread_props(_object_spread({}, minute), {
            disabled: isDayDisabled(setMinutes(value, minute.value), true)
        });
    }) : minutes;
    const onPickerValueChange = (e, validate, setter)=>{
        const numericValue = e.target.value.replace(/\D/g, '');
        e.target.value = numericValue;
        if (validate(numericValue)) {
            onChange === null || onChange === void 0 ? void 0 : onChange(setter(value, Number(numericValue)));
        }
    };
    const onHoursInputChange = (e)=>{
        onPickerValueChange(e, (numValue)=>validateValue(numValue, localHours), setHours);
    };
    const onMinutesInputChange = (e)=>{
        onPickerValueChange(e, (numValue)=>validateValue(numValue, localMinutes), setMinutes);
    };
    const onHoursChange = React.useCallback((_, newValue)=>onChange === null || onChange === void 0 ? void 0 : onChange(setHours(value, Number(newValue))), [
        onChange,
        value
    ]);
    const onMinutesChange = React.useCallback((_, newValue)=>onChange === null || onChange === void 0 ? void 0 : onChange(setMinutes(value, Number(newValue))), [
        onChange,
        value
    ]);
    const onPickerKeyDown = (e)=>{
        const key = pressedKey(e);
        if (key === Keys.ENTER || key === Keys.TAB) {
            var _nextStep_current;
            const steps = [
                hoursInputRef,
                minutesInputRef,
                doneButtonRef
            ];
            const currentStepIndex = steps.findIndex((step)=>step.current === e.target);
            const diff = e.key === 'Tab' && e.shiftKey ? -1 : 1;
            const nextStepIndex = currentStepIndex + diff;
            if (nextStepIndex < 0 || nextStepIndex >= steps.length) {
                return;
            }
            e.preventDefault();
            const nextStep = steps[nextStepIndex];
            (_nextStep_current = nextStep.current) === null || _nextStep_current === void 0 ? void 0 : _nextStep_current.focus();
        }
    };
    const renderDoneButton = ()=>{
        const ButtonComponent = DoneButton !== null && DoneButton !== void 0 ? DoneButton : Button;
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
        className: classNames("vkuiCalendarTime__host", !doneButtonShow && "vkuiCalendarTime__host__withoutDone"),
        children: [
            /*#__PURE__*/ _jsx("div", {
                className: "vkuiCalendarTime__picker",
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
                        onInputKeyDown: onPickerKeyDown,
                        getSelectInputRef: hoursInputRef,
                        "aria-label": changeHoursLabel,
                        "data-testid": hoursTestId
                    })
                })
            }),
            /*#__PURE__*/ _jsx("div", {
                className: "vkuiCalendarTime__divider",
                children: ":"
            }),
            /*#__PURE__*/ _jsx("div", {
                className: "vkuiCalendarTime__picker",
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
                        onInputKeyDown: onPickerKeyDown,
                        "aria-label": changeMinutesLabel,
                        "data-testid": minutesTestId
                    })
                })
            }),
            doneButtonShow && /*#__PURE__*/ _jsx("div", {
                className: "vkuiCalendarTime__button",
                children: /*#__PURE__*/ _jsx(AdaptivityProvider, {
                    sizeY: "compact",
                    children: renderDoneButton()
                })
            })
        ]
    });
};

//# sourceMappingURL=CalendarTime.js.map