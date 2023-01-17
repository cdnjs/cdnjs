import * as React from 'react';
import { setHours, setMinutes } from '../../lib/date';
import { CustomSelect } from '../CustomSelect/CustomSelect';
import { Button } from '../Button/Button';
import { SizeType } from '../../lib/adaptivity';
import { AdaptivityProvider } from '../AdaptivityProvider/AdaptivityProvider';
import "./CalendarTime.module.css";
var hours = [];
for (var i = 0; i < 24; i += 1) {
  hours.push({
    value: i,
    label: String(i).padStart(2, '0')
  });
}
var minutes = [];
for (var _i = 0; _i < 60; _i += 1) {
  minutes.push({
    value: _i,
    label: String(_i).padStart(2, '0')
  });
}
export var CalendarTime = function CalendarTime(_ref) {
  var value = _ref.value,
    _ref$doneButtonText = _ref.doneButtonText,
    doneButtonText = _ref$doneButtonText === void 0 ? 'Готово' : _ref$doneButtonText,
    onChange = _ref.onChange,
    onClose = _ref.onClose,
    _ref$changeHoursAriaL = _ref.changeHoursAriaLabel,
    changeHoursAriaLabel = _ref$changeHoursAriaL === void 0 ? 'Изменить час' : _ref$changeHoursAriaL,
    _ref$changeMinutesAri = _ref.changeMinutesAriaLabel,
    changeMinutesAriaLabel = _ref$changeMinutesAri === void 0 ? 'Изменить минуту' : _ref$changeMinutesAri;
  var onHoursChange = React.useCallback(function (event) {
    return onChange === null || onChange === void 0 ? void 0 : onChange(setHours(value, Number(event.target.value)));
  }, [onChange, value]);
  var onMinutesChange = React.useCallback(function (event) {
    return onChange === null || onChange === void 0 ? void 0 : onChange(setMinutes(value, Number(event.target.value)));
  }, [onChange, value]);
  return /*#__PURE__*/React.createElement("div", {
    className: "vkuiCalendarTime"
  }, /*#__PURE__*/React.createElement("div", {
    className: "vkuiCalendarTime__picker"
  }, /*#__PURE__*/React.createElement(AdaptivityProvider, {
    sizeY: SizeType.COMPACT
  }, /*#__PURE__*/React.createElement(CustomSelect, {
    value: value.getHours(),
    options: hours,
    onChange: onHoursChange,
    forceDropdownPortal: false,
    "aria-label": changeHoursAriaLabel
  }))), /*#__PURE__*/React.createElement("div", {
    className: "vkuiCalendarTime__divider"
  }, ":"), /*#__PURE__*/React.createElement("div", {
    className: "vkuiCalendarTime__picker"
  }, /*#__PURE__*/React.createElement(AdaptivityProvider, {
    sizeY: SizeType.COMPACT
  }, /*#__PURE__*/React.createElement(CustomSelect, {
    value: value.getMinutes(),
    options: minutes,
    onChange: onMinutesChange,
    forceDropdownPortal: false,
    "aria-label": changeMinutesAriaLabel
  }))), /*#__PURE__*/React.createElement("div", {
    className: "vkuiCalendarTime__button"
  }, /*#__PURE__*/React.createElement(AdaptivityProvider, {
    sizeY: SizeType.COMPACT
  }, /*#__PURE__*/React.createElement(Button, {
    mode: "secondary",
    onClick: onClose,
    size: "l",
    "aria-label": doneButtonText
  }, doneButtonText))));
};
//# sourceMappingURL=CalendarTime.js.map