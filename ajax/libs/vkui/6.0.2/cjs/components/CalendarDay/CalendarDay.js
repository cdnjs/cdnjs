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
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _useKeyboardInputTracker = require("../../hooks/useKeyboardInputTracker");
const _ConfigProviderContext = require("../ConfigProvider/ConfigProviderContext");
const _Tappable = require("../Tappable/Tappable");
const _VisuallyHidden = require("../VisuallyHidden/VisuallyHidden");
const CalendarDay = /*#__PURE__*/ _react.memo((_param)=>{
    var { day, today, selected, onChange, hidden, disabled, active, selectionStart, selectionEnd, focused, onEnter, onLeave, hinted, hintedSelectionStart, hintedSelectionEnd, sameMonth, size, className, children } = _param, restProps = _object_without_properties._(_param, [
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
        "className",
        "children"
    ]);
    const { locale } = (0, _ConfigProviderContext.useConfigProvider)();
    const ref = _react.useRef(null);
    const onClick = _react.useCallback(()=>onChange(day), [
        day,
        onChange
    ]);
    const handleEnter = _react.useCallback(()=>onEnter === null || onEnter === void 0 ? void 0 : onEnter(day), [
        day,
        onEnter
    ]);
    const handleLeave = _react.useCallback(()=>onLeave === null || onLeave === void 0 ? void 0 : onLeave(day), [
        day,
        onLeave
    ]);
    const label = new Intl.DateTimeFormat(locale, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(day);
    _react.useEffect(()=>{
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
        className: (0, _vkjs.classNames)("vkuiCalendarDay", size === 's' && "vkuiCalendarDay--size-s", today && "vkuiCalendarDay--today", selected && !disabled && "vkuiCalendarDay--selected", selectionStart && "vkuiCalendarDay--selection-start", selectionEnd && "vkuiCalendarDay--selection-end", disabled && "vkuiCalendarDay--disabled", !sameMonth && "vkuiCalendarDay--not-same-month", className),
        hoverMode: active ? '' : "vkuiCalendarDay--hover",
        hasActive: false,
        onClick: onClick,
        disabled: disabled,
        tabIndex: -1,
        getRootRef: ref,
        focusVisibleMode: active ? 'outside' : 'inside',
        onPointerEnter: handleEnter,
        onPointerLeave: handleLeave
    }, restProps), /*#__PURE__*/ _react.createElement("div", {
        className: (0, _vkjs.classNames)("vkuiCalendarDay__hinted", hinted && "vkuiCalendarDay__hinted--active", hintedSelectionStart && "vkuiCalendarDay__hinted--selection-start", hintedSelectionEnd && "vkuiCalendarDay__hinted--selection-end")
    }, /*#__PURE__*/ _react.createElement("div", {
        className: (0, _vkjs.classNames)("vkuiCalendarDay__inner", active && !disabled && "vkuiCalendarDay__inner--active")
    }, /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiCalendarDay__day-number"
    }, /*#__PURE__*/ _react.createElement(_VisuallyHidden.VisuallyHidden, null, children !== null && children !== void 0 ? children : label), /*#__PURE__*/ _react.createElement("span", {
        "aria-hidden": true
    }, day.getDate())))));
});
CalendarDay.displayName = 'CalendarDay';

//# sourceMappingURL=CalendarDay.js.map