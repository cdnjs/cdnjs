"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Calendar = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _date = require("../../lib/date");
var _CalendarHeader = require("../CalendarHeader/CalendarHeader");
var _CalendarDays = require("../CalendarDays/CalendarDays");
var _CalendarTime = require("../CalendarTime/CalendarTime");
var _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");
var _calendar = require("../../lib/calendar");
var _useCalendar2 = require("../../hooks/useCalendar");
var _vkjs = require("@vkontakte/vkjs");
var _warnOnce = require("../../lib/warnOnce");
var _excluded = ["value", "onChange", "disablePast", "disableFuture", "shouldDisableDate", "onClose", "enableTime", "doneButtonText", "weekStartsOn", "getRootRef", "disablePickers", "changeHoursAriaLabel", "changeMinutesAriaLabel", "prevMonthAriaLabel", "nextMonthAriaLabel", "changeMonthAriaLabel", "changeYearAriaLabel", "showNeighboringMonth", "changeDayAriaLabel", "size", "viewDate", "onHeaderChange", "onNextMonth", "onPrevMonth", "prevMonthIcon", "nextMonthIcon", "prevMonthProps", "nextMonthProps", "dayProps", "className", "listenDayChangesForUpdate"];
var warn = (0, _warnOnce.warnOnce)('Calendar');

/**
 * @see https://vkcom.github.io/VKUI/#/Calendar
 */
var Calendar = function Calendar(_ref) {
  var value = _ref.value,
    onChange = _ref.onChange,
    disablePast = _ref.disablePast,
    disableFuture = _ref.disableFuture,
    shouldDisableDate = _ref.shouldDisableDate,
    onClose = _ref.onClose,
    _ref$enableTime = _ref.enableTime,
    enableTime = _ref$enableTime === void 0 ? false : _ref$enableTime,
    doneButtonText = _ref.doneButtonText,
    _ref$weekStartsOn = _ref.weekStartsOn,
    weekStartsOn = _ref$weekStartsOn === void 0 ? 1 : _ref$weekStartsOn,
    getRootRef = _ref.getRootRef,
    disablePickers = _ref.disablePickers,
    changeHoursAriaLabel = _ref.changeHoursAriaLabel,
    changeMinutesAriaLabel = _ref.changeMinutesAriaLabel,
    prevMonthAriaLabel = _ref.prevMonthAriaLabel,
    nextMonthAriaLabel = _ref.nextMonthAriaLabel,
    changeMonthAriaLabel = _ref.changeMonthAriaLabel,
    changeYearAriaLabel = _ref.changeYearAriaLabel,
    showNeighboringMonth = _ref.showNeighboringMonth,
    _ref$changeDayAriaLab = _ref.changeDayAriaLabel,
    changeDayAriaLabel = _ref$changeDayAriaLab === void 0 ? 'Изменить день' : _ref$changeDayAriaLab,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 'm' : _ref$size,
    externalViewDate = _ref.viewDate,
    onHeaderChange = _ref.onHeaderChange,
    onNextMonth = _ref.onNextMonth,
    onPrevMonth = _ref.onPrevMonth,
    prevMonthIcon = _ref.prevMonthIcon,
    nextMonthIcon = _ref.nextMonthIcon,
    prevMonthProps = _ref.prevMonthProps,
    nextMonthProps = _ref.nextMonthProps,
    dayProps = _ref.dayProps,
    className = _ref.className,
    listenDayChangesForUpdate = _ref.listenDayChangesForUpdate,
    props = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var _useCalendar = (0, _useCalendar2.useCalendar)({
      value: value,
      disableFuture: disableFuture,
      disablePast: disablePast,
      shouldDisableDate: shouldDisableDate,
      onHeaderChange: onHeaderChange,
      onNextMonth: onNextMonth,
      onPrevMonth: onPrevMonth
    }),
    viewDate = _useCalendar.viewDate,
    setViewDate = _useCalendar.setViewDate,
    setPrevMonth = _useCalendar.setPrevMonth,
    setNextMonth = _useCalendar.setNextMonth,
    focusedDay = _useCalendar.focusedDay,
    setFocusedDay = _useCalendar.setFocusedDay,
    isDayFocused = _useCalendar.isDayFocused,
    isDayDisabled = _useCalendar.isDayDisabled,
    resetSelectedDay = _useCalendar.resetSelectedDay;
  (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function () {
    if (value) {
      setViewDate(value);
    }
  }, [value]);
  if (process.env.NODE_ENV === 'development' && !disablePickers && size === 's') {
    warn("Нельзя включить селекты выбора месяца/года, если размер календаря 's'", 'error');
  }
  if (process.env.NODE_ENV === 'development' && enableTime && size === 's') {
    warn("Нельзя включить выбор времени, если размер календаря 's'", 'error');
  }
  var handleKeyDown = React.useCallback(function (event) {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
      event.preventDefault();
    }
    var newFocusedDay = (0, _calendar.navigateDate)(focusedDay !== null && focusedDay !== void 0 ? focusedDay : value, event.key);
    if (newFocusedDay && !(0, _date.isSameMonth)(newFocusedDay, viewDate)) {
      setViewDate(newFocusedDay);
    }
    setFocusedDay(newFocusedDay);
  }, [focusedDay, setFocusedDay, setViewDate, value, viewDate]);
  var onDayChange = React.useCallback(function (date) {
    onChange === null || onChange === void 0 ? void 0 : onChange((0, _calendar.setTimeEqual)(date, value));
  }, [value, onChange]);
  var isDayActive = React.useCallback(function (day) {
    return Boolean(value && (0, _date.isSameDay)(day, value));
  }, [value]);
  return /*#__PURE__*/React.createElement("div", (0, _extends2.default)({}, props, {
    ref: getRootRef,
    className: (0, _vkjs.classNames)("vkuiCalendar", styles["Calendar--size-".concat(size)], className)
  }), /*#__PURE__*/React.createElement(_CalendarHeader.CalendarHeader, {
    viewDate: externalViewDate || viewDate,
    onChange: setViewDate,
    onNextMonth: setNextMonth,
    onPrevMonth: setPrevMonth,
    disablePickers: disablePickers || size === 's',
    className: "vkuiCalendar__header",
    prevMonthAriaLabel: prevMonthAriaLabel,
    nextMonthAriaLabel: nextMonthAriaLabel,
    changeMonthAriaLabel: changeMonthAriaLabel,
    changeYearAriaLabel: changeYearAriaLabel,
    prevMonthIcon: prevMonthIcon,
    nextMonthIcon: nextMonthIcon,
    prevMonthProps: prevMonthProps,
    nextMonthProps: nextMonthProps
  }), /*#__PURE__*/React.createElement(_CalendarDays.CalendarDays, {
    viewDate: externalViewDate || viewDate,
    value: value,
    weekStartsOn: weekStartsOn,
    isDayFocused: isDayFocused,
    tabIndex: 0,
    "aria-label": changeDayAriaLabel,
    onKeyDown: handleKeyDown,
    onDayChange: onDayChange,
    isDayActive: isDayActive,
    isDaySelectionStart: _calendar.isFirstDay,
    isDaySelectionEnd: _calendar.isLastDay,
    isDayDisabled: isDayDisabled,
    onBlur: resetSelectedDay,
    showNeighboringMonth: showNeighboringMonth,
    size: size,
    dayProps: dayProps,
    listenDayChangesForUpdate: listenDayChangesForUpdate
  }), enableTime && value && size !== 's' && /*#__PURE__*/React.createElement("div", {
    className: "vkuiCalendar__time"
  }, /*#__PURE__*/React.createElement(_CalendarTime.CalendarTime, {
    value: value,
    onChange: onChange,
    onClose: onClose,
    doneButtonText: doneButtonText,
    changeHoursAriaLabel: changeHoursAriaLabel,
    changeMinutesAriaLabel: changeMinutesAriaLabel
  })));
};
exports.Calendar = Calendar;
var styles = {
  "Calendar--size-s": "vkuiCalendar--size-s",
  "Calendar--size-m": "vkuiCalendar--size-m"
};
//# sourceMappingURL=Calendar.js.map