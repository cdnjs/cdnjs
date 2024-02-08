import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { ENABLE_KEYBOARD_INPUT_EVENT_NAME } from '../../hooks/useKeyboardInputTracker';
import { useConfigProvider } from '../ConfigProvider/ConfigProviderContext';
import { Tappable } from '../Tappable/Tappable';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
import styles from './CalendarDay.module.css';
export const CalendarDay = /*#__PURE__*/ React.memo(({ day, today, selected, onChange, hidden, disabled, active, selectionStart, selectionEnd, focused, onEnter, onLeave, hinted, hintedSelectionStart, hintedSelectionEnd, sameMonth, size, className, children, ...restProps })=>{
    const { locale } = useConfigProvider();
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
    if (hidden) {
        return /*#__PURE__*/ React.createElement("div", {
            className: styles['CalendarDay__hidden']
        });
    }
    return /*#__PURE__*/ React.createElement(Tappable, {
        className: classNames(styles['CalendarDay'], size === 's' && styles['CalendarDay--size-s'], today && styles['CalendarDay--today'], selected && !disabled && styles['CalendarDay--selected'], selectionStart && styles['CalendarDay--selection-start'], selectionEnd && styles['CalendarDay--selection-end'], disabled && styles['CalendarDay--disabled'], !sameMonth && styles['CalendarDay--not-same-month'], className),
        hoverMode: active ? '' : styles['CalendarDay--hover'],
        hasActive: false,
        onClick: onClick,
        disabled: disabled,
        tabIndex: -1,
        getRootRef: ref,
        focusVisibleMode: active ? 'outside' : 'inside',
        onPointerEnter: handleEnter,
        onPointerLeave: handleLeave,
        ...restProps
    }, /*#__PURE__*/ React.createElement("div", {
        className: classNames(styles['CalendarDay__hinted'], hinted && styles['CalendarDay__hinted--active'], hintedSelectionStart && styles['CalendarDay__hinted--selection-start'], hintedSelectionEnd && styles['CalendarDay__hinted--selection-end'])
    }, /*#__PURE__*/ React.createElement("div", {
        className: classNames(styles['CalendarDay__inner'], active && !disabled && styles['CalendarDay__inner--active'])
    }, /*#__PURE__*/ React.createElement("div", {
        className: styles['CalendarDay__day-number']
    }, /*#__PURE__*/ React.createElement(VisuallyHidden, null, children ?? label), /*#__PURE__*/ React.createElement("span", {
        "aria-hidden": true
    }, day.getDate())))));
});
CalendarDay.displayName = 'CalendarDay';

//# sourceMappingURL=CalendarDay.js.map