"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CalendarTime", {
    enumerable: true,
    get: function() {
        return CalendarTime;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _date = require("../../lib/date");
const _AdaptivityProvider = require("../AdaptivityProvider/AdaptivityProvider");
const _Button = require("../Button/Button");
const _CustomSelect = require("../CustomSelect/CustomSelect");
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
const CalendarTime = ({ value, doneButtonText = 'Готово', onChange, onClose, changeHoursLabel, changeMinutesLabel, isDayDisabled })=>{
    const localHours = isDayDisabled ? hours.map((hour)=>{
        return _object_spread_props._(_object_spread._({}, hour), {
            disabled: isDayDisabled((0, _date.setHours)(value, hour.value), true)
        });
    }) : hours;
    const localMinutes = isDayDisabled ? minutes.map((minute)=>{
        return _object_spread_props._(_object_spread._({}, minute), {
            disabled: isDayDisabled((0, _date.setMinutes)(value, minute.value), true)
        });
    }) : minutes;
    const onHoursChange = _react.useCallback((event)=>onChange === null || onChange === void 0 ? void 0 : onChange((0, _date.setHours)(value, Number(event.target.value))), [
        onChange,
        value
    ]);
    const onMinutesChange = _react.useCallback((event)=>onChange === null || onChange === void 0 ? void 0 : onChange((0, _date.setMinutes)(value, Number(event.target.value))), [
        onChange,
        value
    ]);
    return /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiCalendarTime"
    }, /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiCalendarTime__picker"
    }, /*#__PURE__*/ _react.createElement(_AdaptivityProvider.AdaptivityProvider, {
        sizeY: "compact"
    }, /*#__PURE__*/ _react.createElement(_CustomSelect.CustomSelect, {
        value: value.getHours(),
        options: localHours,
        onChange: onHoursChange,
        forceDropdownPortal: false,
        "aria-label": changeHoursLabel
    }))), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiCalendarTime__divider"
    }, ":"), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiCalendarTime__picker"
    }, /*#__PURE__*/ _react.createElement(_AdaptivityProvider.AdaptivityProvider, {
        sizeY: "compact"
    }, /*#__PURE__*/ _react.createElement(_CustomSelect.CustomSelect, {
        value: value.getMinutes(),
        options: localMinutes,
        onChange: onMinutesChange,
        forceDropdownPortal: false,
        "aria-label": changeMinutesLabel
    }))), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiCalendarTime__button"
    }, /*#__PURE__*/ _react.createElement(_AdaptivityProvider.AdaptivityProvider, {
        sizeY: "compact"
    }, /*#__PURE__*/ _react.createElement(_Button.Button, {
        mode: "secondary",
        onClick: onClose,
        size: "l"
    }, doneButtonText))));
};

//# sourceMappingURL=CalendarTime.js.map