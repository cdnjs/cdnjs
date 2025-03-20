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
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _useKeyboardInputTracker = require("../../hooks/useKeyboardInputTracker");
const _ConfigProviderContext = require("../ConfigProvider/ConfigProviderContext");
const _Tappable = require("../Tappable/Tappable");
const _VisuallyHidden = require("../VisuallyHidden/VisuallyHidden");
const CalendarDay = /*#__PURE__*/ _react.memo((_param)=>{
    var { day, today, selected, onChange, hidden, disabled, active, selectionStart, selectionEnd, focused, onEnter, onLeave, hinted, hintedSelectionStart, hintedSelectionEnd, sameMonth, size, className, children, renderDayContent } = _param, restProps = _object_without_properties._(_param, [
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
        "children",
        "renderDayContent"
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
    const content = _react.useMemo(()=>{
        if (renderDayContent) {
            return renderDayContent(day);
        }
        return /*#__PURE__*/ (0, _jsxruntime.jsxs)("div", {
            className: "vkuiCalendarDay__day-number",
            children: [
                /*#__PURE__*/ (0, _jsxruntime.jsx)(_VisuallyHidden.VisuallyHidden, {
                    children: children !== null && children !== void 0 ? children : label
                }),
                /*#__PURE__*/ (0, _jsxruntime.jsx)("span", {
                    "aria-hidden": true,
                    children: day.getDate()
                })
            ]
        });
    }, [
        renderDayContent,
        day,
        children,
        label
    ]);
    if (hidden) {
        return /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
            className: "vkuiCalendarDay__hidden"
        });
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_Tappable.Tappable, _object_spread_props._(_object_spread._({
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
    }, restProps), {
        children: /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
            className: (0, _vkjs.classNames)("vkuiCalendarDay__hinted", hinted && "vkuiCalendarDay__hinted--active", hintedSelectionStart && "vkuiCalendarDay__hinted--selection-start", hintedSelectionEnd && "vkuiCalendarDay__hinted--selection-end"),
            children: /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
                className: (0, _vkjs.classNames)("vkuiCalendarDay__inner", active && !disabled && "vkuiCalendarDay__inner--active"),
                children: content
            })
        })
    }));
});
CalendarDay.displayName = 'CalendarDay';

//# sourceMappingURL=CalendarDay.js.map