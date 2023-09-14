import * as React from "react";
import { SizeType } from "../../lib/adaptivity";
import { setHours, setMinutes } from "../../lib/date";
import { AdaptivityProvider } from "../AdaptivityProvider/AdaptivityProvider";
import { Button } from "../Button/Button";
import { CustomSelect } from "../CustomSelect/CustomSelect";
var hours = [];
for(var i = 0; i < 24; i += 1){
    hours.push({
        value: i,
        label: String(i).padStart(2, "0")
    });
}
var minutes = [];
for(var i1 = 0; i1 < 60; i1 += 1){
    minutes.push({
        value: i1,
        label: String(i1).padStart(2, "0")
    });
}
export var CalendarTime = function(param) {
    var value = param.value, _param_doneButtonText = param.doneButtonText, doneButtonText = _param_doneButtonText === void 0 ? "Готово" : _param_doneButtonText, onChange = param.onChange, onClose = param.onClose, _param_changeHoursAriaLabel = param.changeHoursAriaLabel, changeHoursAriaLabel = _param_changeHoursAriaLabel === void 0 ? "Изменить час" : _param_changeHoursAriaLabel, _param_changeMinutesAriaLabel = param.changeMinutesAriaLabel, changeMinutesAriaLabel = _param_changeMinutesAriaLabel === void 0 ? "Изменить минуту" : _param_changeMinutesAriaLabel;
    var onHoursChange = React.useCallback(function(event) {
        var _onChange;
        return (_onChange = onChange) === null || _onChange === void 0 ? void 0 : _onChange(setHours(value, Number(event.target.value)));
    }, [
        onChange,
        value
    ]);
    var onMinutesChange = React.useCallback(function(event) {
        var _onChange;
        return (_onChange = onChange) === null || _onChange === void 0 ? void 0 : _onChange(setMinutes(value, Number(event.target.value)));
    }, [
        onChange,
        value
    ]);
    return /*#__PURE__*/ React.createElement("div", {
        className: "vkuiCalendarTime"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "vkuiCalendarTime__picker"
    }, /*#__PURE__*/ React.createElement(AdaptivityProvider, {
        sizeY: SizeType.COMPACT
    }, /*#__PURE__*/ React.createElement(CustomSelect, {
        value: value.getHours(),
        options: hours,
        onChange: onHoursChange,
        forceDropdownPortal: false,
        "aria-label": changeHoursAriaLabel
    }))), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiCalendarTime__divider"
    }, ":"), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiCalendarTime__picker"
    }, /*#__PURE__*/ React.createElement(AdaptivityProvider, {
        sizeY: SizeType.COMPACT
    }, /*#__PURE__*/ React.createElement(CustomSelect, {
        value: value.getMinutes(),
        options: minutes,
        onChange: onMinutesChange,
        forceDropdownPortal: false,
        "aria-label": changeMinutesAriaLabel
    }))), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiCalendarTime__button"
    }, /*#__PURE__*/ React.createElement(AdaptivityProvider, {
        sizeY: SizeType.COMPACT
    }, /*#__PURE__*/ React.createElement(Button, {
        mode: "secondary",
        onClick: onClose,
        size: "l",
        "aria-label": doneButtonText
    }, doneButtonText))));
};

//# sourceMappingURL=CalendarTime.js.map