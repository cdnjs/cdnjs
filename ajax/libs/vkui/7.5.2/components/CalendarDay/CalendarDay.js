'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useFocusVisible } from "../../hooks/useFocusVisible.js";
import { useFocusVisibleClassName } from "../../hooks/useFocusVisibleClassName.js";
import { mergeCalls } from "../../lib/mergeCalls.js";
import { defineComponentDisplayNames } from "../../lib/react/defineComponentDisplayNames.js";
import { useConfigProvider } from "../ConfigProvider/ConfigProviderContext.js";
import { Tappable } from "../Tappable/Tappable.js";
import { VisuallyHidden } from "../VisuallyHidden/VisuallyHidden.js";
// eslint-disable-next-line react/display-name -- используется defineComponentDisplayNames
export const CalendarDay = /*#__PURE__*/ React.memo((_param)=>{
    var { day, today, selected, onChange, hidden, disabled, active, selectionStart, selectionEnd, focused, onEnter, onLeave, onFocus, onBlur, hinted, hintedSelectionStart, hintedSelectionEnd, sameMonth, size, children, renderDayContent, testId, role, 'aria-colindex': colIndex } = _param, restProps = _object_without_properties(_param, [
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
        "onFocus",
        "onBlur",
        "hinted",
        "hintedSelectionStart",
        "hintedSelectionEnd",
        "sameMonth",
        "size",
        "children",
        "renderDayContent",
        "testId",
        "role",
        'aria-colindex'
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
    const handleFocus = React.useCallback(()=>onFocus === null || onFocus === void 0 ? void 0 : onFocus(day), [
        day,
        onFocus
    ]);
    const focusVisibleMode = active ? 'outside' : 'inside';
    const _useFocusVisible = useFocusVisible(), { focusVisible } = _useFocusVisible, focusEvents = _object_without_properties(_useFocusVisible, [
        "focusVisible"
    ]);
    const focusVisibleClassNames = useFocusVisibleClassName({
        focusVisible,
        mode: focusVisibleMode
    });
    const focusHandlers = mergeCalls(focusEvents, {
        onFocus: handleFocus,
        onBlur
    });
    const label = new Intl.DateTimeFormat(locale, {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    }).format(day);
    React.useEffect(()=>{
        if (focused && ref.current) {
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
            role: role,
            "aria-colindex": colIndex,
            className: classNames("vkuiCalendarDay__hidden", size === 's' && "vkuiCalendarDay__sizeS")
        });
    }
    return /*#__PURE__*/ _jsx(Tappable, _object_spread_props(_object_spread({
        baseClassName: classNames("vkuiCalendarDay__host", size === 's' && "vkuiCalendarDay__sizeS", direction === 'rtl' && "vkuiCalendarDay__rtl", focusVisibleClassNames),
        role: role,
        "aria-colindex": colIndex,
        hoverMode: "vkuiCalendarDay__hostHovered",
        activeMode: "vkuiCalendarDay__hostActivated",
        hasActive: false,
        onClick: onClick,
        disabled: disabled,
        getRootRef: ref,
        onPointerEnter: handleEnter,
        onPointerLeave: handleLeave,
        "data-testid": typeof testId === 'string' ? testId : testId === null || testId === void 0 ? void 0 : testId(day)
    }, restProps, focusHandlers), {
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
if (process.env.NODE_ENV !== 'production') {
    defineComponentDisplayNames(CalendarDay, 'CalendarDay');
}

//# sourceMappingURL=CalendarDay.js.map