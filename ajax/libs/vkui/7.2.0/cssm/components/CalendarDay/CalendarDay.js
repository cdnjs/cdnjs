'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { ENABLE_KEYBOARD_INPUT_EVENT_NAME } from "../../hooks/useKeyboardInputTracker.js";
import { useConfigProvider } from "../ConfigProvider/ConfigProviderContext.js";
import { Tappable } from "../Tappable/Tappable.js";
import { VisuallyHidden } from "../VisuallyHidden/VisuallyHidden.js";
import styles from "./CalendarDay.module.css";
export const CalendarDay = /*#__PURE__*/ React.memo(({ day, today, selected, onChange, hidden, disabled, active, selectionStart, selectionEnd, focused, onEnter, onLeave, hinted, hintedSelectionStart, hintedSelectionEnd, sameMonth, size, children, renderDayContent, testId, ...restProps })=>{
    const { locale, direction } = useConfigProvider();
    const ref = React.useRef(null);
    const onClick = React.useCallback(()=>onChange(day), [
        day,
        onChange
    ]);
    const handleEnter = React.useCallback(()=>onEnter?.(day), [
        day,
        onEnter
    ]);
    const handleLeave = React.useCallback(()=>onLeave?.(day), [
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
            className: styles.dayNumber,
            children: [
                /*#__PURE__*/ _jsx(VisuallyHidden, {
                    children: children ?? label
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
            className: classNames(styles.hidden, size === 's' && styles.sizeS)
        });
    }
    return /*#__PURE__*/ _jsx(Tappable, {
        baseClassName: classNames(styles.host, size === 's' && styles.sizeS, direction === 'rtl' && styles.rtl),
        hoverMode: styles.hostHovered,
        activeMode: styles.hostActivated,
        hasActive: false,
        onClick: onClick,
        disabled: disabled,
        tabIndex: -1,
        getRootRef: ref,
        focusVisibleMode: active ? 'outside' : 'inside',
        onPointerEnter: handleEnter,
        onPointerLeave: handleLeave,
        "data-testid": typeof testId === 'string' ? testId : testId?.(day),
        ...restProps,
        children: /*#__PURE__*/ _jsx("div", {
            className: classNames(styles.content, size === 's' && styles.sizeS, today && styles.today, selected && !disabled && styles.selected, selectionStart && styles.selectionStart, selectionEnd && styles.selectionEnd, disabled && styles.disabled, !sameMonth && styles.notSameMonth),
            children: /*#__PURE__*/ _jsx("div", {
                className: classNames(styles.hinted, hinted && styles.hintedActive, hintedSelectionStart && styles.hintedSelectionStart, hintedSelectionEnd && styles.hintedSelectionEnd),
                children: /*#__PURE__*/ _jsx("div", {
                    className: classNames(styles.inner, active && !disabled && styles.innerActive),
                    children: content
                })
            })
        })
    });
});
CalendarDay.displayName = 'CalendarDay';

//# sourceMappingURL=CalendarDay.js.map