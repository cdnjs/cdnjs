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
    var { day, today, selected, onChange, hidden, disabled, active, selectionStart, selectionEnd, focused, onEnter, onLeave, hinted, hintedSelectionStart, hintedSelectionEnd, sameMonth, size, className, children, renderDayContent } = _param, restProps = _object_without_properties(_param, [
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
    const { locale } = useConfigProvider();
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
            className: "CalendarDay__dayNumber--QgY3V",
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
            className: classNames("CalendarDay__hidden--5gOiD", size === 's' && "CalendarDay__sizeS--iVskd")
        });
    }
    return /*#__PURE__*/ _jsx(Tappable, _object_spread_props(_object_spread({
        className: classNames("CalendarDay__host--4aoMC", size === 's' && "CalendarDay__sizeS--iVskd", className),
        hoverMode: "CalendarDay__hostHovered--VkTyx",
        activeMode: "CalendarDay__hostActivated--GJzDM",
        hasActive: false,
        onClick: onClick,
        disabled: disabled,
        tabIndex: -1,
        getRootRef: ref,
        focusVisibleMode: active ? 'outside' : 'inside',
        onPointerEnter: handleEnter,
        onPointerLeave: handleLeave
    }, restProps), {
        children: /*#__PURE__*/ _jsx("div", {
            className: classNames("CalendarDay__content--nzbCl", size === 's' && "CalendarDay__sizeS--iVskd", today && "CalendarDay__today--Qda-9", selected && !disabled && "CalendarDay__selected--opYD5", selectionStart && "CalendarDay__selectionStart--2DhyU", selectionEnd && "CalendarDay__selectionEnd--IEl1m", disabled && "CalendarDay__disabled--qd1Xm", !sameMonth && "CalendarDay__notSameMonth--k81Ys"),
            children: /*#__PURE__*/ _jsx("div", {
                className: classNames("CalendarDay__hinted--irRVd", hinted && "CalendarDay__hintedActive--72pV7", hintedSelectionStart && "CalendarDay__hintedSelectionStart--oBGeQ", hintedSelectionEnd && "CalendarDay__hintedSelectionEnd--Rcb61"),
                children: /*#__PURE__*/ _jsx("div", {
                    className: classNames("CalendarDay__inner--tN4Yf", active && !disabled && "CalendarDay__innerActive--shTiW"),
                    children: content
                })
            })
        })
    }));
});
CalendarDay.displayName = 'CalendarDay';

//# sourceMappingURL=CalendarDay.js.map