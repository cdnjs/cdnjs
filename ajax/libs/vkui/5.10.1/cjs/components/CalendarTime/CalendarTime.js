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
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _adaptivity = require("../../lib/adaptivity");
var _date = require("../../lib/date");
var _AdaptivityProvider = require("../AdaptivityProvider/AdaptivityProvider");
var _Button = require("../Button/Button");
var _CustomSelect = require("../CustomSelect/CustomSelect");
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
var CalendarTime = function(param) {
    var value = param.value, _param_doneButtonText = param.doneButtonText, doneButtonText = _param_doneButtonText === void 0 ? "Готово" : _param_doneButtonText, onChange = param.onChange, onClose = param.onClose, _param_changeHoursAriaLabel = param.changeHoursAriaLabel, changeHoursAriaLabel = _param_changeHoursAriaLabel === void 0 ? "Изменить час" : _param_changeHoursAriaLabel, _param_changeMinutesAriaLabel = param.changeMinutesAriaLabel, changeMinutesAriaLabel = _param_changeMinutesAriaLabel === void 0 ? "Изменить минуту" : _param_changeMinutesAriaLabel, isDayDisabled = param.isDayDisabled;
    var localHours = isDayDisabled ? hours.map(function(hour) {
        return _object_spread_props._(_object_spread._({}, hour), {
            disabled: isDayDisabled((0, _date.setHours)(value, hour.value), true)
        });
    }) : hours;
    var localMinutes = isDayDisabled ? minutes.map(function(minute) {
        return _object_spread_props._(_object_spread._({}, minute), {
            disabled: isDayDisabled((0, _date.setMinutes)(value, minute.value), true)
        });
    }) : minutes;
    var onHoursChange = _react.useCallback(function(event) {
        return onChange === null || onChange === void 0 ? void 0 : onChange((0, _date.setHours)(value, Number(event.target.value)));
    }, [
        onChange,
        value
    ]);
    var onMinutesChange = _react.useCallback(function(event) {
        return onChange === null || onChange === void 0 ? void 0 : onChange((0, _date.setMinutes)(value, Number(event.target.value)));
    }, [
        onChange,
        value
    ]);
    return /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiCalendarTime"
    }, /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiCalendarTime__picker"
    }, /*#__PURE__*/ _react.createElement(_AdaptivityProvider.AdaptivityProvider, {
        sizeY: _adaptivity.SizeType.COMPACT
    }, /*#__PURE__*/ _react.createElement(_CustomSelect.CustomSelect, {
        value: value.getHours(),
        options: localHours,
        onChange: onHoursChange,
        forceDropdownPortal: false,
        "aria-label": changeHoursAriaLabel
    }))), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiCalendarTime__divider"
    }, ":"), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiCalendarTime__picker"
    }, /*#__PURE__*/ _react.createElement(_AdaptivityProvider.AdaptivityProvider, {
        sizeY: _adaptivity.SizeType.COMPACT
    }, /*#__PURE__*/ _react.createElement(_CustomSelect.CustomSelect, {
        value: value.getMinutes(),
        options: localMinutes,
        onChange: onMinutesChange,
        forceDropdownPortal: false,
        "aria-label": changeMinutesAriaLabel
    }))), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiCalendarTime__button"
    }, /*#__PURE__*/ _react.createElement(_AdaptivityProvider.AdaptivityProvider, {
        sizeY: _adaptivity.SizeType.COMPACT
    }, /*#__PURE__*/ _react.createElement(_Button.Button, {
        mode: "secondary",
        onClick: onClose,
        size: "l",
        "aria-label": doneButtonText
    }, doneButtonText))));
};

//# sourceMappingURL=CalendarTime.js.map