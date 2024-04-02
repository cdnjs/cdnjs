import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { ENABLE_KEYBOARD_INPUT_EVENT_NAME } from '../../hooks/useKeyboardInputTracker';
import { useConfigProvider } from '../ConfigProvider/ConfigProviderContext';
import { Tappable } from '../Tappable/Tappable';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
export const CalendarDay = /*#__PURE__*/ React.memo((_param)=>{
    var { day, today, selected, onChange, hidden, disabled, active, selectionStart, selectionEnd, focused, onEnter, onLeave, hinted, hintedSelectionStart, hintedSelectionEnd, sameMonth, size, className, children } = _param, restProps = _object_without_properties(_param, [
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
    if (hidden) {
        return /*#__PURE__*/ React.createElement("div", {
            className: "vkuiCalendarDay__hidden"
        });
    }
    return /*#__PURE__*/ React.createElement(Tappable, _object_spread({
        className: classNames("vkuiCalendarDay", size === 's' && "vkuiCalendarDay--size-s", today && "vkuiCalendarDay--today", selected && !disabled && "vkuiCalendarDay--selected", selectionStart && "vkuiCalendarDay--selection-start", selectionEnd && "vkuiCalendarDay--selection-end", disabled && "vkuiCalendarDay--disabled", !sameMonth && "vkuiCalendarDay--not-same-month", className),
        hoverMode: active ? '' : "vkuiCalendarDay--hover",
        hasActive: false,
        onClick: onClick,
        disabled: disabled,
        tabIndex: -1,
        getRootRef: ref,
        focusVisibleMode: active ? 'outside' : 'inside',
        onPointerEnter: handleEnter,
        onPointerLeave: handleLeave
    }, restProps), /*#__PURE__*/ React.createElement("div", {
        className: classNames("vkuiCalendarDay__hinted", hinted && "vkuiCalendarDay__hinted--active", hintedSelectionStart && "vkuiCalendarDay__hinted--selection-start", hintedSelectionEnd && "vkuiCalendarDay__hinted--selection-end")
    }, /*#__PURE__*/ React.createElement("div", {
        className: classNames("vkuiCalendarDay__inner", active && !disabled && "vkuiCalendarDay__inner--active")
    }, /*#__PURE__*/ React.createElement("div", {
        className: "vkuiCalendarDay__day-number"
    }, /*#__PURE__*/ React.createElement(VisuallyHidden, null, children !== null && children !== void 0 ? children : label), /*#__PURE__*/ React.createElement("span", {
        "aria-hidden": true
    }, day.getDate())))));
});
CalendarDay.displayName = 'CalendarDay';

//# sourceMappingURL=CalendarDay.js.map