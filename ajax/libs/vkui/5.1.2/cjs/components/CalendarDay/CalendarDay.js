"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CalendarDay = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _Tappable = require("../Tappable/Tappable");
var _useKeyboardInputTracker = require("../../hooks/useKeyboardInputTracker");
var _ConfigProviderContext = require("../ConfigProvider/ConfigProviderContext");
var _excluded = ["day", "today", "selected", "onChange", "hidden", "disabled", "active", "selectionStart", "selectionEnd", "focused", "onEnter", "onLeave", "hinted", "hintedSelectionStart", "hintedSelectionEnd", "sameMonth", "size", "className"];
var CalendarDay = /*#__PURE__*/React.memo(function (_ref) {
  var day = _ref.day,
    today = _ref.today,
    selected = _ref.selected,
    onChange = _ref.onChange,
    hidden = _ref.hidden,
    disabled = _ref.disabled,
    active = _ref.active,
    selectionStart = _ref.selectionStart,
    selectionEnd = _ref.selectionEnd,
    focused = _ref.focused,
    onEnter = _ref.onEnter,
    onLeave = _ref.onLeave,
    hinted = _ref.hinted,
    hintedSelectionStart = _ref.hintedSelectionStart,
    hintedSelectionEnd = _ref.hintedSelectionEnd,
    sameMonth = _ref.sameMonth,
    size = _ref.size,
    className = _ref.className,
    props = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var _useConfigProvider = (0, _ConfigProviderContext.useConfigProvider)(),
    locale = _useConfigProvider.locale;
  var ref = React.useRef(null);
  var onClick = React.useCallback(function () {
    return onChange(day);
  }, [day, onChange]);
  var handleEnter = React.useCallback(function () {
    return onEnter === null || onEnter === void 0 ? void 0 : onEnter(day);
  }, [day, onEnter]);
  var handleLeave = React.useCallback(function () {
    return onLeave === null || onLeave === void 0 ? void 0 : onLeave(day);
  }, [day, onLeave]);
  React.useEffect(function () {
    if (focused && ref.current) {
      ref.current.dispatchEvent(new Event(_useKeyboardInputTracker.ENABLE_KEYBOARD_INPUT_EVENT_NAME, {
        bubbles: true
      }));
      ref.current.focus();
    }
  }, [focused]);
  if (hidden) {
    return /*#__PURE__*/React.createElement("div", {
      className: "vkuiCalendarDay__hidden"
    });
  }
  return /*#__PURE__*/React.createElement(_Tappable.Tappable, (0, _extends2.default)({
    className: (0, _vkjs.classNames)("vkuiCalendarDay", size && styles["CalendarDay--size-".concat(size)], today && "vkuiCalendarDay--today", selected && !disabled && "vkuiCalendarDay--selected", active && !disabled && "vkuiCalendarDay--active", selectionStart && "vkuiCalendarDay--selection-start", selectionEnd && "vkuiCalendarDay--selection-end", disabled && "vkuiCalendarDay--disabled", !sameMonth && "vkuiCalendarDay--not-same-month", className),
    hoverMode: active ? "vkuiCalendarDay--active-hover" : "vkuiCalendarDay--hover",
    hasActive: false,
    onClick: onClick,
    disabled: disabled,
    "aria-label": new Intl.DateTimeFormat(locale, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(day),
    tabIndex: -1,
    getRootRef: ref,
    focusVisibleMode: active ? 'outside' : 'inside',
    onEnter: handleEnter,
    onLeave: handleLeave
  }, props), /*#__PURE__*/React.createElement("div", {
    className: (0, _vkjs.classNames)("vkuiCalendarDay__hinted", hinted && "vkuiCalendarDay__hinted--active", hintedSelectionStart && "vkuiCalendarDay__hinted--selection-start", hintedSelectionEnd && "vkuiCalendarDay__hinted--selection-end")
  }, /*#__PURE__*/React.createElement("div", {
    className: (0, _vkjs.classNames)("vkuiCalendarDay__inner", active && !disabled && "vkuiCalendarDay__inner--active")
  }, /*#__PURE__*/React.createElement("div", {
    className: "vkuiCalendarDay__day-number"
  }, day.getDate()))));
});
exports.CalendarDay = CalendarDay;
CalendarDay.displayName = 'CalendarDay';
var styles = {
  "CalendarDay--size-s": "vkuiCalendarDay--size-s",
  "CalendarDay--size-m": "vkuiCalendarDay--size-m"
};
//# sourceMappingURL=CalendarDay.js.map