import _extends from "@babel/runtime/helpers/extends";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["viewDate", "value", "weekStartsOn", "onDayChange", "isDaySelected", "isDayActive", "isDaySelectionEnd", "isDaySelectionStart", "onDayEnter", "onDayLeave", "isDayHinted", "isHintedDaySelectionStart", "isHintedDaySelectionEnd", "isDayFocused", "isDayDisabled", "size", "showNeighboringMonth"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { isSameDay, isSameMonth } from "date-fns";
import { CalendarDay } from "../CalendarDay/CalendarDay";
import { getDaysNames, getWeeks } from "../../lib/calendar";
import { LocaleProviderContext } from "../LocaleProviderContext/LocaleProviderContext";
import { classNames } from "../../lib/classNames";
import { Caption } from "../Typography/Caption/Caption";
import "./CalendarDays.css";
export var CalendarDays = function CalendarDays(_ref) {
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
      props = _objectWithoutProperties(_ref, _excluded);

  var locale = React.useContext(LocaleProviderContext);
  var ref = React.useRef(null);

  var _React$useState = React.useState(new Date()),
      _React$useState2 = _slicedToArray(_React$useState, 1),
      now = _React$useState2[0];

  var weeks = React.useMemo(function () {
    return getWeeks(viewDate, weekStartsOn);
  }, [weekStartsOn, viewDate]);
  var daysNames = React.useMemo(function () {
    return getDaysNames(now, weekStartsOn, locale);
  }, [locale, now, weekStartsOn]);
  var handleDayChange = React.useCallback(function (date) {
    var _ref$current;

    onDayChange(date);
    (_ref$current = ref.current) === null || _ref$current === void 0 ? void 0 : _ref$current.focus();
  }, [onDayChange]);
  return createScopedElement("div", _extends({}, props, {
    vkuiClass: "CalendarDays",
    ref: ref
  }), createScopedElement("div", {
    vkuiClass: classNames("CalendarDays__row", "CalendarDays__row--size-".concat(size))
  }, daysNames.map(function (dayName) {
    return createScopedElement(Caption, {
      level: "1",
      weight: "regular",
      vkuiClass: "CalendarDays__weekday",
      key: dayName
    }, dayName);
  })), weeks.map(function (week, i) {
    return createScopedElement("div", {
      vkuiClass: classNames("CalendarDays__row", "CalendarDays__row--size-".concat(size)),
      key: i
    }, week.map(function (day, i) {
      var sameMonth = isSameMonth(day, viewDate);
      return createScopedElement(CalendarDay, {
        key: day.toISOString(),
        day: day,
        today: isSameDay(day, now),
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
//# sourceMappingURL=CalendarDays.js.map