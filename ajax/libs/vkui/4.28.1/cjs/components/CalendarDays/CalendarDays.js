"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CalendarDays = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _dateFns = require("date-fns");

var _CalendarDay = require("../CalendarDay/CalendarDay");

var _calendar = require("../../lib/calendar");

var _LocaleProviderContext = require("../LocaleProviderContext/LocaleProviderContext");

var _classNames = require("../../lib/classNames");

var _Caption = require("../Typography/Caption/Caption");

var _excluded = ["viewDate", "value", "weekStartsOn", "onDayChange", "isDaySelected", "isDayActive", "isDaySelectionEnd", "isDaySelectionStart", "onDayEnter", "onDayLeave", "isDayHinted", "isHintedDaySelectionStart", "isHintedDaySelectionEnd", "isDayFocused", "isDayDisabled", "size", "showNeighboringMonth"];

var CalendarDays = function CalendarDays(_ref) {
  var viewDate = _ref.viewDate,
      value = _ref.value,
      weekStartsOn = _ref.weekStartsOn,
      onDayChange = _ref.onDayChange,
      isDaySelected = _ref.isDaySelected,
      isDayActive = _ref.isDayActive,
      isDaySelectionEnd = _ref.isDaySelectionEnd,
      isDaySelectionStart = _ref.isDaySelectionStart,
      onDayEnter = _ref.onDayEnter,
      onDayLeave = _ref.onDayLeave,
      isDayHinted = _ref.isDayHinted,
      isHintedDaySelectionStart = _ref.isHintedDaySelectionStart,
      isHintedDaySelectionEnd = _ref.isHintedDaySelectionEnd,
      isDayFocused = _ref.isDayFocused,
      isDayDisabled = _ref.isDayDisabled,
      size = _ref.size,
      _ref$showNeighboringM = _ref.showNeighboringMonth,
      showNeighboringMonth = _ref$showNeighboringM === void 0 ? false : _ref$showNeighboringM,
      props = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var locale = React.useContext(_LocaleProviderContext.LocaleProviderContext);
  var ref = React.useRef(null);

  var _React$useState = React.useState(new Date()),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 1),
      now = _React$useState2[0];

  var weeks = React.useMemo(function () {
    return (0, _calendar.getWeeks)(viewDate, weekStartsOn);
  }, [weekStartsOn, viewDate]);
  var daysNames = React.useMemo(function () {
    return (0, _calendar.getDaysNames)(now, weekStartsOn, locale);
  }, [locale, now, weekStartsOn]);
  var handleDayChange = React.useCallback(function (date) {
    var _ref$current;

    onDayChange(date);
    (_ref$current = ref.current) === null || _ref$current === void 0 ? void 0 : _ref$current.focus();
  }, [onDayChange]);
  return (0, _jsxRuntime.createScopedElement)("div", (0, _extends2.default)({}, props, {
    vkuiClass: "CalendarDays",
    ref: ref
  }), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: (0, _classNames.classNames)("CalendarDays__row", "CalendarDays__row--size-".concat(size))
  }, daysNames.map(function (dayName) {
    return (0, _jsxRuntime.createScopedElement)(_Caption.Caption, {
      level: "1",
      weight: "regular",
      vkuiClass: "CalendarDays__weekday",
      key: dayName
    }, dayName);
  })), weeks.map(function (week, i) {
    return (0, _jsxRuntime.createScopedElement)("div", {
      vkuiClass: (0, _classNames.classNames)("CalendarDays__row", "CalendarDays__row--size-".concat(size)),
      key: i
    }, week.map(function (day, i) {
      var sameMonth = (0, _dateFns.isSameMonth)(day, viewDate);
      return (0, _jsxRuntime.createScopedElement)(_CalendarDay.CalendarDay, {
        key: day.toISOString(),
        day: day,
        today: (0, _dateFns.isSameDay)(day, now),
        active: isDayActive(day),
        onChange: handleDayChange,
        hidden: !showNeighboringMonth && !sameMonth,
        disabled: isDayDisabled(day),
        selectionStart: isDaySelectionStart(day, i),
        selectionEnd: isDaySelectionEnd(day, i),
        hintedSelectionStart: isHintedDaySelectionStart === null || isHintedDaySelectionStart === void 0 ? void 0 : isHintedDaySelectionStart(day, i),
        hintedSelectionEnd: isHintedDaySelectionEnd === null || isHintedDaySelectionEnd === void 0 ? void 0 : isHintedDaySelectionEnd(day, i),
        selected: isDaySelected === null || isDaySelected === void 0 ? void 0 : isDaySelected(day),
        focused: isDayFocused(day),
        onEnter: onDayEnter,
        onLeave: onDayLeave,
        hinted: isDayHinted === null || isDayHinted === void 0 ? void 0 : isDayHinted(day),
        sameMonth: sameMonth,
        size: size
      });
    }));
  }));
};

exports.CalendarDays = CalendarDays;
//# sourceMappingURL=CalendarDays.js.map