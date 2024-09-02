import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { setHours, setMinutes } from 'date-fns';
import { AdaptivityProvider } from '../AdaptivityProvider/AdaptivityProvider';
import { Button } from '../Button/Button';
import { CustomSelect } from '../CustomSelect/CustomSelect';
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
    const onHoursChange = React.useCallback((event)=>onChange === null || onChange === void 0 ? void 0 : onChange(setHours(value, Number(event.target.value))), [
        onChange,
        value
    ]);
    const onMinutesChange = React.useCallback((event)=>onChange === null || onChange === void 0 ? void 0 : onChange(setMinutes(value, Number(event.target.value))), [
        onChange,
        value
    ]);
    return /*#__PURE__*/ _jsxs("div", {
        className: "vkuiCalendarTime",
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
                        "aria-label": changeHoursLabel
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
                        "aria-label": changeMinutesLabel
                    })
                })
            }),
            /*#__PURE__*/ _jsx("div", {
                className: "vkuiCalendarTime__button",
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