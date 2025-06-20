'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { ENABLE_KEYBOARD_INPUT_EVENT_NAME } from "../../hooks/useKeyboardInputTracker.js";
import { useConfigProvider } from "../ConfigProvider/ConfigProviderContext.js";
import { Tappable } from "../Tappable/Tappable.js";
import { VisuallyHidden } from "../VisuallyHidden/VisuallyHidden.js";
export const CalendarDay = /*#__PURE__*/ React.memo((_param)=>{
    var { day, today, selected, onChange, hidden, disabled, active, selectionStart, selectionEnd, focused, onEnter, onLeave, hinted, hintedSelectionStart, hintedSelectionEnd, sameMonth, size, children, renderDayContent, testId } = _param, restProps = _object_without_properties(_param, [
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
        "children",
        "renderDayContent",
        "testId"
    ]);
    const { locale, direction } = useConfigProvider();
    const ref = React.useRef(null);
    const onClick = React.useCallback(()=>onChange(day), [
        day,
        onChange
    ]);
    const handleEnter = React.useCallback(()=>onEnter === null || onEnter === void 0 ? void 0 : onEnter(day), [
        day,
        onEnter
    ]);
    const handleLeave = React.useCallback(()=>onLeave === null || onLeave === void 0 ? void 0 : onLeave(day), [
        day,
        onLeave
    ]);
    const label = new Intl.DateTimeFormat(locale, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(day);
    React.useEffect(()=>{
        if (focused && ref.current) {
            ref.current.dispatchEvent(new Event(ENABLE_KEYBOARD_INPUT_EVENT_NAME, {
                bubbles: true
            }));
            ref.current.focus();
        }
    }, [
        focused
    ]);
    const content = React.useMemo(()=>{
        if (renderDayContent) {
            return renderDayContent(day);
        }
        return /*#__PURE__*/ _jsxs("div", {
            className: "vkuiCalendarDay__dayNumber",
            children: [
                /*#__PURE__*/ _jsx(VisuallyHidden, {
                    children: children !== null && children !== void 0 ? children : label
                }),
                /*#__PURE__*/ _jsx("span", {
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
        return /*#__PURE__*/ _jsx("div", {
            className: classNames("vkuiCalendarDay__hidden", size === 's' && "vkuiCalendarDay__sizeS")
        });
    }
    return /*#__PURE__*/ _jsx(Tappable, _object_spread_props(_object_spread({
        baseClassName: classNames("vkuiCalendarDay__host", size === 's' && "vkuiCalendarDay__sizeS", direction === 'rtl' && "vkuiCalendarDay__rtl"),
        hoverMode: "vkuiCalendarDay__hostHovered",
        activeMode: "vkuiCalendarDay__hostActivated",
        hasActive: false,
        onClick: onClick,
        disabled: disabled,
        tabIndex: -1,
        getRootRef: ref,
        focusVisibleMode: active ? 'outside' : 'inside',
        onPointerEnter: handleEnter,
        onPointerLeave: handleLeave,
        "data-testid": typeof testId === 'string' ? testId : testId === null || testId === void 0 ? void 0 : testId(day)
    }, restProps), {
        children: /*#__PURE__*/ _jsx("div", {
            className: classNames("vkuiCalendarDay__content", size === 's' && "vkuiCalendarDay__sizeS", today && "vkuiCalendarDay__today", selected && !disabled && "vkuiCalendarDay__selected", selectionStart && "vkuiCalendarDay__selectionStart", selectionEnd && "vkuiCalendarDay__selectionEnd", disabled && "vkuiCalendarDay__disabled", !sameMonth && "vkuiCalendarDay__notSameMonth"),
            children: /*#__PURE__*/ _jsx("div", {
                className: classNames("vkuiCalendarDay__hinted", hinted && "vkuiCalendarDay__hintedActive", hintedSelectionStart && "vkuiCalendarDay__hintedSelectionStart", hintedSelectionEnd && "vkuiCalendarDay__hintedSelectionEnd"),
                children: /*#__PURE__*/ _jsx("div", {
                    className: classNames("vkuiCalendarDay__inner", active && !disabled && "vkuiCalendarDay__innerActive"),
                    children: content
                })
            })
        })
    }));
});
CalendarDay.displayName = 'CalendarDay';

//# sourceMappingURL=CalendarDay.js.map