"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CalendarTime = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var React = _interopRequireWildcard(require("react"));

var _dateFns = require("date-fns");

var _CustomSelect = _interopRequireDefault(require("../CustomSelect/CustomSelect"));

var _Button = _interopRequireDefault(require("../Button/Button"));

var _withAdaptivity = require("../../hoc/withAdaptivity");

var hours = [];

for (var i = 0; i < 24; i += 1) {
  hours.push({
    value: i,
    label: String(i).padStart(2, "0")
  });
}

var minutes = [];

for (var _i = 0; _i < 60; _i += 1) {
  minutes.push({
    value: _i,
    label: String(_i).padStart(2, "0")
  });
}

var CalendarTime = function CalendarTime(_ref) {
  var value = _ref.value,
      _ref$doneButtonText = _ref.doneButtonText,
      doneButtonText = _ref$doneButtonText === void 0 ? "Готово" : _ref$doneButtonText,
      onChange = _ref.onChange,
      onClose = _ref.onClose,
      _ref$changeHoursAriaL = _ref.changeHoursAriaLabel,
      changeHoursAriaLabel = _ref$changeHoursAriaL === void 0 ? "Изменить час" : _ref$changeHoursAriaL,
      _ref$changeMinutesAri = _ref.changeMinutesAriaLabel,
      changeMinutesAriaLabel = _ref$changeMinutesAri === void 0 ? "Изменить минуту" : _ref$changeMinutesAri;
  var onHoursChange = React.useCallback(function (event) {
    return onChange === null || onChange === void 0 ? void 0 : onChange((0, _dateFns.setHours)(value, Number(event.target.value)));
  }, [onChange, value]);
  var onMinutesChange = React.useCallback(function (event) {
    return onChange === null || onChange === void 0 ? void 0 : onChange((0, _dateFns.setMinutes)(value, Number(event.target.value)));
  }, [onChange, value]);
  return (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "CalendarTime"
  }, (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "CalendarTime__picker"
  }, (0, _jsxRuntime.createScopedElement)(_CustomSelect.default, {
    value: value.getHours(),
    options: hours,
    onChange: onHoursChange,
    forceDropdownPortal: false,
    sizeY: _withAdaptivity.SizeType.COMPACT,
    "aria-label": changeHoursAriaLabel
  })), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "CalendarTime__divider"
  }, ":"), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "CalendarTime__picker"
  }, (0, _jsxRuntime.createScopedElement)(_CustomSelect.default, {
    value: value.getMinutes(),
    options: minutes,
    onChange: onMinutesChange,
    forceDropdownPortal: false,
    sizeY: _withAdaptivity.SizeType.COMPACT,
    "aria-label": changeMinutesAriaLabel
  })), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "CalendarTime__button"
  }, (0, _jsxRuntime.createScopedElement)(_Button.default, {
    sizeY: _withAdaptivity.SizeType.COMPACT,
    mode: "secondary",
    onClick: onClose,
    size: "l",
    "aria-label": doneButtonText
  }, doneButtonText)));
};

exports.CalendarTime = CalendarTime;
//# sourceMappingURL=CalendarTime.js.map