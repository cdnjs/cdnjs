import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["day", "today", "selected", "onChange", "hidden", "disabled", "active", "selectionStart", "selectionEnd", "focused", "onEnter", "onLeave", "hinted", "hintedSelectionStart", "hintedSelectionEnd", "sameMonth", "size"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { classNames } from "../../lib/classNames";
import { Tappable } from "../Tappable/Tappable";
import { ENABLE_KEYBOARD_INPUT_EVENT_NAME } from "../../hooks/useKeyboardInputTracker";
import { LocaleProviderContext } from "../LocaleProviderContext/LocaleProviderContext";
import "./CalendarDay.css";
export var CalendarDay = /*#__PURE__*/React.memo(function (_ref) {
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
    props = _objectWithoutProperties(_ref, _excluded);
  var locale = React.useContext(LocaleProviderContext);
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
      ref.current.dispatchEvent(new Event(ENABLE_KEYBOARD_INPUT_EVENT_NAME, {
        bubbles: true
      }));
      ref.current.focus();
    }
  }, [focused]);
  if (hidden) {
    return createScopedElement("div", {
      vkuiClass: "CalendarDay__hidden"
    });
  }
  return createScopedElement(Tappable, _extends({
    vkuiClass: classNames("CalendarDay", "CalendarDay--size-".concat(size), today && "CalendarDay--today", selected && !disabled && "CalendarDay--selected", active && !disabled && "CalendarDay--active", selectionStart && "CalendarDay--selection-start", selectionEnd && "CalendarDay--selection-end", disabled && "CalendarDay--disabled", !sameMonth && "CalendarDay--not-same-month"),
    hoverMode: active ? "CalendarDay--active-hover" : "CalendarDay--hover",
    hasActive: false,
    onClick: onClick,
    disabled: disabled,
    "aria-label": new Intl.DateTimeFormat(locale, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    }).format(day),
    tabIndex: -1,
    getRootRef: ref,
    focusVisibleMode: active ? "outside" : "inside",
    onEnter: handleEnter,
    onLeave: handleLeave
  }, props), createScopedElement("div", {
    vkuiClass: classNames("CalendarDay__hinted", hinted && "CalendarDay__hinted--active", hintedSelectionStart && "CalendarDay__hinted--selection-start", hintedSelectionEnd && "CalendarDay__hinted--selection-end")
  }, createScopedElement("div", {
    vkuiClass: classNames("CalendarDay__inner", active && !disabled && "CalendarDay__inner--active")
  }, createScopedElement("div", {
    vkuiClass: "CalendarDay__day-number"
  }, day.getDate()))));
});
CalendarDay.displayName = "CalendarDay";
//# sourceMappingURL=CalendarDay.js.map