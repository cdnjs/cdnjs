import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import * as React from 'react';
import { setHours, setMinutes } from '../../lib/date';
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
    return /*#__PURE__*/ React.createElement("div", {
        className: "vkuiCalendarTime"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "vkuiCalendarTime__picker"
    }, /*#__PURE__*/ React.createElement(AdaptivityProvider, {
        sizeY: "compact"
    }, /*#__PURE__*/ React.createElement(CustomSelect, {
        value: value.getHours(),
        options: localHours,
        onChange: onHoursChange,
        forceDropdownPortal: false,
        "aria-label": changeHoursLabel
    }))), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiCalendarTime__divider"
    }, ":"), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiCalendarTime__picker"
    }, /*#__PURE__*/ React.createElement(AdaptivityProvider, {
        sizeY: "compact"
    }, /*#__PURE__*/ React.createElement(CustomSelect, {
        value: value.getMinutes(),
        options: localMinutes,
        onChange: onMinutesChange,
        forceDropdownPortal: false,
        "aria-label": changeMinutesLabel
    }))), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiCalendarTime__button"
    }, /*#__PURE__*/ React.createElement(AdaptivityProvider, {
        sizeY: "compact"
    }, /*#__PURE__*/ React.createElement(Button, {
        mode: "secondary",
        onClick: onClose,
        size: "l"
    }, doneButtonText))));
};

//# sourceMappingURL=CalendarTime.js.map