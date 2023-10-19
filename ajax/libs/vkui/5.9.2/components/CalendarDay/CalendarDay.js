import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { ENABLE_KEYBOARD_INPUT_EVENT_NAME } from "../../hooks/useKeyboardInputTracker";
import { useConfigProvider } from "../ConfigProvider/ConfigProviderContext";
import { Tappable } from "../Tappable/Tappable";
export var CalendarDay = /*#__PURE__*/ React.memo(function(_param) {
    var day = _param.day, today = _param.today, selected = _param.selected, onChange = _param.onChange, hidden = _param.hidden, disabled = _param.disabled, active = _param.active, selectionStart = _param.selectionStart, selectionEnd = _param.selectionEnd, focused = _param.focused, onEnter = _param.onEnter, onLeave = _param.onLeave, hinted = _param.hinted, hintedSelectionStart = _param.hintedSelectionStart, hintedSelectionEnd = _param.hintedSelectionEnd, sameMonth = _param.sameMonth, size = _param.size, className = _param.className, props = _object_without_properties(_param, [
        "day",
        "today",
        "selected",
        "onChange",
        "hidden",
        "disabled",
        "active",
        "selectionStart",
        "selectionEnd",
        "focused",
        "onEnter",
        "onLeave",
        "hinted",
        "hintedSelectionStart",
        "hintedSelectionEnd",
        "sameMonth",
        "size",
        "className"
    ]);
    var locale = useConfigProvider().locale;
    var ref = React.useRef(null);
    var onClick = React.useCallback(function() {
        return onChange(day);
    }, [
        day,
        onChange
    ]);
    var handleEnter = React.useCallback(function() {
        return onEnter === null || onEnter === void 0 ? void 0 : onEnter(day);
    }, [
        day,
        onEnter
    ]);
    var handleLeave = React.useCallback(function() {
        return onLeave === null || onLeave === void 0 ? void 0 : onLeave(day);
    }, [
        day,
        onLeave
    ]);
    React.useEffect(function() {
        if (focused && ref.current) {
            ref.current.dispatchEvent(new Event(ENABLE_KEYBOARD_INPUT_EVENT_NAME, {
                bubbles: true
            }));
            ref.current.focus();
        }
    }, [
        focused
    ]);
    if (hidden) {
        return /*#__PURE__*/ React.createElement("div", {
            className: "vkuiCalendarDay__hidden"
        });
    }
    return /*#__PURE__*/ React.createElement(Tappable, _object_spread({
        className: classNames("vkuiCalendarDay", size === "s" && "vkuiCalendarDay--size-s", today && "vkuiCalendarDay--today", selected && !disabled && "vkuiCalendarDay--selected", selectionStart && "vkuiCalendarDay--selection-start", selectionEnd && "vkuiCalendarDay--selection-end", disabled && "vkuiCalendarDay--disabled", !sameMonth && "vkuiCalendarDay--not-same-month", className),
        hoverMode: active ? "" : "vkuiCalendarDay--hover",
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
    }, props), /*#__PURE__*/ React.createElement("div", {
        className: classNames("vkuiCalendarDay__hinted", hinted && "vkuiCalendarDay__hinted--active", hintedSelectionStart && "vkuiCalendarDay__hinted--selection-start", hintedSelectionEnd && "vkuiCalendarDay__hinted--selection-end")
    }, /*#__PURE__*/ React.createElement("div", {
        className: classNames("vkuiCalendarDay__inner", active && !disabled && "vkuiCalendarDay__inner--active")
    }, /*#__PURE__*/ React.createElement("div", {
        className: "vkuiCalendarDay__day-number"
    }, day.getDate()))));
});
CalendarDay.displayName = "CalendarDay";

//# sourceMappingURL=CalendarDay.js.map