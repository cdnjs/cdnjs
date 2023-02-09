import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["viewDate", "value", "weekStartsOn", "onDayChange", "isDaySelected", "isDayActive", "isDaySelectionEnd", "isDaySelectionStart", "onDayEnter", "onDayLeave", "isDayHinted", "isHintedDaySelectionStart", "isHintedDaySelectionEnd", "isDayFocused", "isDayDisabled", "size", "showNeighboringMonth", "dayProps", "className", "listenDayChangesForUpdate"];
import * as React from 'react';
import { isSameDay, isSameMonth } from '../../lib/date';
import { CalendarDay } from '../CalendarDay/CalendarDay';
import { getDaysNames, getWeeks } from '../../lib/calendar';
import { useConfigProvider } from '../ConfigProvider/ConfigProviderContext';
import { classNames } from '@vkontakte/vkjs';
import { Footnote } from '../Typography/Footnote/Footnote';
import { useTodayDate } from '../../hooks/useTodayDate';
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
    dayProps = _ref.dayProps,
    className = _ref.className,
    _ref$listenDayChanges = _ref.listenDayChangesForUpdate,
    listenDayChangesForUpdate = _ref$listenDayChanges === void 0 ? false : _ref$listenDayChanges,
    props = _objectWithoutProperties(_ref, _excluded);
  var _useConfigProvider = useConfigProvider(),
    locale = _useConfigProvider.locale;
  var ref = React.useRef(null);
  var now = useTodayDate(listenDayChangesForUpdate);
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
  return /*#__PURE__*/React.createElement("div", _extends({}, props, {
    className: classNames("vkuiCalendarDays", className),
    ref: ref
  }), /*#__PURE__*/React.createElement("div", {
    className: classNames("vkuiCalendarDays__row", size && styles["CalendarDays__row--size-".concat(size)])
  }, daysNames.map(function (dayName) {
    return /*#__PURE__*/React.createElement(Footnote, {
      key: dayName,
      className: "vkuiCalendarDays__weekday"
    }, dayName);
  })), weeks.map(function (week, i) {
    return /*#__PURE__*/React.createElement("div", {
      className: classNames("vkuiCalendarDays__row", size && styles["CalendarDays__row--size-".concat(size)]),
      key: i
    }, week.map(function (day, i) {
      var sameMonth = isSameMonth(day, viewDate);
      return /*#__PURE__*/React.createElement(CalendarDay, _extends({
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
      }, dayProps));
    }));
  }));
};
var styles = {
  "CalendarDays__row--size-s": "vkuiCalendarDays__row--size-s",
  "CalendarDays__row--size-m": "vkuiCalendarDays__row--size-m"
};
//# sourceMappingURL=CalendarDays.js.map