'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { setHours, setMinutes } from "date-fns";
import { AdaptivityProvider } from "../AdaptivityProvider/AdaptivityProvider.js";
import { Button } from "../Button/Button.js";
import { CustomSelect } from "../CustomSelect/CustomSelect.js";
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
export const CalendarTime = ({ value, doneButtonText = 'Готово', onChange, onClose, changeHoursLabel, changeMinutesLabel, isDayDisabled })=>{
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
    const onHoursChange = React.useCallback((newValue)=>onChange === null || onChange === void 0 ? void 0 : onChange(setHours(value, Number(newValue))), [
        onChange,
        value
    ]);
    const onMinutesChange = React.useCallback((newValue)=>onChange === null || onChange === void 0 ? void 0 : onChange(setMinutes(value, Number(newValue))), [
        onChange,
        value
    ]);
    return /*#__PURE__*/ _jsxs("div", {
        className: "CalendarTime__host--r5Gx-",
        children: [
            /*#__PURE__*/ _jsx("div", {
                className: "CalendarTime__picker--0iLGd",
                children: /*#__PURE__*/ _jsx(AdaptivityProvider, {
                    sizeY: "compact",
                    children: /*#__PURE__*/ _jsx(CustomSelect, {
                        value: value.getHours(),
                        options: localHours,
                        onChange: onHoursChange,
                        forceDropdownPortal: false,
                        "aria-label": changeHoursLabel
                    })
                })
            }),
            /*#__PURE__*/ _jsx("div", {
                className: "CalendarTime__divider--3mrNV",
                children: ":"
            }),
            /*#__PURE__*/ _jsx("div", {
                className: "CalendarTime__picker--0iLGd",
                children: /*#__PURE__*/ _jsx(AdaptivityProvider, {
                    sizeY: "compact",
                    children: /*#__PURE__*/ _jsx(CustomSelect, {
                        value: value.getMinutes(),
                        options: localMinutes,
                        onChange: onMinutesChange,
                        forceDropdownPortal: false,
                        "aria-label": changeMinutesLabel
                    })
                })
            }),
            /*#__PURE__*/ _jsx("div", {
                className: "CalendarTime__button--uvf3x",
                children: /*#__PURE__*/ _jsx(AdaptivityProvider, {
                    sizeY: "compact",
                    children: /*#__PURE__*/ _jsx(Button, {
                        mode: "secondary",
                        onClick: onClose,
                        size: "l",
                        children: doneButtonText
                    })
                })
            })
        ]
    });
};

//# sourceMappingURL=CalendarTime.js.map