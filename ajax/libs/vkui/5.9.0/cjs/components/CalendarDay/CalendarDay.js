"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CalendarDay", {
    enumerable: true,
    get: function() {
        return CalendarDay;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useKeyboardInputTracker = require("../../hooks/useKeyboardInputTracker");
var _ConfigProviderContext = require("../ConfigProvider/ConfigProviderContext");
var _Tappable = require("../Tappable/Tappable");
var CalendarDay = /*#__PURE__*/ _react.memo(function(_param) {
    var day = _param.day, today = _param.today, selected = _param.selected, onChange = _param.onChange, hidden = _param.hidden, disabled = _param.disabled, active = _param.active, selectionStart = _param.selectionStart, selectionEnd = _param.selectionEnd, focused = _param.focused, onEnter = _param.onEnter, onLeave = _param.onLeave, hinted = _param.hinted, hintedSelectionStart = _param.hintedSelectionStart, hintedSelectionEnd = _param.hintedSelectionEnd, sameMonth = _param.sameMonth, size = _param.size, className = _param.className, props = _object_without_properties._(_param, [
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
    var locale = (0, _ConfigProviderContext.useConfigProvider)().locale;
    var ref = _react.useRef(null);
    var onClick = _react.useCallback(function() {
        return onChange(day);
    }, [
        day,
        onChange
    ]);
    var handleEnter = _react.useCallback(function() {
        return onEnter === null || onEnter === void 0 ? void 0 : onEnter(day);
    }, [
        day,
        onEnter
    ]);
    var handleLeave = _react.useCallback(function() {
        return onLeave === null || onLeave === void 0 ? void 0 : onLeave(day);
    }, [
        day,
        onLeave
    ]);
    _react.useEffect(function() {
        if (focused && ref.current) {
            ref.current.dispatchEvent(new Event(_useKeyboardInputTracker.ENABLE_KEYBOARD_INPUT_EVENT_NAME, {
                bubbles: true
            }));
            ref.current.focus();
        }
    }, [
        focused
    ]);
    if (hidden) {
        return /*#__PURE__*/ _react.createElement("div", {
            className: "vkuiCalendarDay__hidden"
        });
    }
    return /*#__PURE__*/ _react.createElement(_Tappable.Tappable, _object_spread._({
        className: (0, _vkjs.classNames)("vkuiCalendarDay", size === "s" && "vkuiCalendarDay--size-s", today && "vkuiCalendarDay--today", selected && !disabled && "vkuiCalendarDay--selected", selectionStart && "vkuiCalendarDay--selection-start", selectionEnd && "vkuiCalendarDay--selection-end", disabled && "vkuiCalendarDay--disabled", !sameMonth && "vkuiCalendarDay--not-same-month", className),
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
    }, props), /*#__PURE__*/ _react.createElement("div", {
        className: (0, _vkjs.classNames)("vkuiCalendarDay__hinted", hinted && "vkuiCalendarDay__hinted--active", hintedSelectionStart && "vkuiCalendarDay__hinted--selection-start", hintedSelectionEnd && "vkuiCalendarDay__hinted--selection-end")
    }, /*#__PURE__*/ _react.createElement("div", {
        className: (0, _vkjs.classNames)("vkuiCalendarDay__inner", active && !disabled && "vkuiCalendarDay__inner--active")
    }, /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiCalendarDay__day-number"
    }, day.getDate()))));
});
CalendarDay.displayName = "CalendarDay";

//# sourceMappingURL=CalendarDay.js.map