'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createElement, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import makeEventProps from 'make-event-props';
import Calendar from 'react-calendar';
import Fit from 'react-fit';
import DateInput from './DateInput.js';
const baseClassName = 'react-date-picker';
const outsideActionEvents = ['mousedown', 'focusin', 'touchstart'];
const iconProps = {
    xmlns: 'http://www.w3.org/2000/svg',
    width: 19,
    height: 19,
    viewBox: '0 0 19 19',
    stroke: 'black',
    strokeWidth: 2,
};
const CalendarIcon = (_jsxs("svg", { ...iconProps, "aria-hidden": "true", className: `${baseClassName}__calendar-button__icon ${baseClassName}__button__icon`, children: [_jsx("rect", { fill: "none", height: "15", width: "15", x: "2", y: "2" }), _jsx("line", { x1: "6", x2: "6", y1: "0", y2: "4" }), _jsx("line", { x1: "13", x2: "13", y1: "0", y2: "4" })] }));
const ClearIcon = (_jsxs("svg", { ...iconProps, "aria-hidden": "true", className: `${baseClassName}__clear-button__icon ${baseClassName}__button__icon`, children: [_jsx("line", { x1: "4", x2: "15", y1: "4", y2: "15" }), _jsx("line", { x1: "15", x2: "4", y1: "4", y2: "15" })] }));
export default function DatePicker(props) {
    const { autoFocus, calendarAriaLabel, calendarIcon = CalendarIcon, className, clearAriaLabel, clearIcon = ClearIcon, closeCalendar: shouldCloseCalendarOnSelect = true, 'data-testid': dataTestid, dayAriaLabel, dayPlaceholder, disableCalendar, disabled, format, id, isOpen: isOpenProps = null, locale, maxDate, maxDetail = 'month', minDate, monthAriaLabel, monthPlaceholder, name = 'date', nativeInputAriaLabel, onCalendarClose, onCalendarOpen, onChange: onChangeProps, onFocus: onFocusProps, onInvalidChange, openCalendarOnFocus = true, required, returnValue = 'start', shouldCloseCalendar, shouldOpenCalendar, showLeadingZeros, value, yearAriaLabel, yearPlaceholder, ...otherProps } = props;
    const [isOpen, setIsOpen] = useState(isOpenProps);
    const wrapper = useRef(null);
    const calendarWrapper = useRef(null);
    useEffect(() => {
        setIsOpen(isOpenProps);
    }, [isOpenProps]);
    function openCalendar({ reason }) {
        if (shouldOpenCalendar) {
            if (!shouldOpenCalendar({ reason })) {
                return;
            }
        }
        setIsOpen(true);
        if (onCalendarOpen) {
            onCalendarOpen();
        }
    }
    const closeCalendar = useCallback(({ reason }) => {
        if (shouldCloseCalendar) {
            if (!shouldCloseCalendar({ reason })) {
                return;
            }
        }
        setIsOpen(false);
        if (onCalendarClose) {
            onCalendarClose();
        }
    }, [onCalendarClose, shouldCloseCalendar]);
    function toggleCalendar() {
        if (isOpen) {
            closeCalendar({ reason: 'buttonClick' });
        }
        else {
            openCalendar({ reason: 'buttonClick' });
        }
    }
    function onChange(value, shouldCloseCalendar = shouldCloseCalendarOnSelect) {
        if (shouldCloseCalendar) {
            closeCalendar({ reason: 'select' });
        }
        if (onChangeProps) {
            onChangeProps(value);
        }
    }
    function onFocus(event) {
        if (onFocusProps) {
            onFocusProps(event);
        }
        if (
        // Internet Explorer still fires onFocus on disabled elements
        disabled ||
            isOpen ||
            !openCalendarOnFocus ||
            event.target.dataset.select === 'true') {
            return;
        }
        openCalendar({ reason: 'focus' });
    }
    const onKeyDown = useCallback((event) => {
        if (event.key === 'Escape') {
            closeCalendar({ reason: 'escape' });
        }
    }, [closeCalendar]);
    function clear() {
        onChange(null);
    }
    function stopPropagation(event) {
        event.stopPropagation();
    }
    const onOutsideAction = useCallback((event) => {
        const { current: wrapperEl } = wrapper;
        const { current: calendarWrapperEl } = calendarWrapper;
        // Try event.composedPath first to handle clicks inside a Shadow DOM.
        const target = ('composedPath' in event ? event.composedPath()[0] : event.target);
        if (target &&
            wrapperEl &&
            !wrapperEl.contains(target) &&
            (!calendarWrapperEl || !calendarWrapperEl.contains(target))) {
            closeCalendar({ reason: 'outsideAction' });
        }
    }, [closeCalendar]);
    const handleOutsideActionListeners = useCallback((shouldListen = isOpen) => {
        for (const event of outsideActionEvents) {
            if (shouldListen) {
                document.addEventListener(event, onOutsideAction);
            }
            else {
                document.removeEventListener(event, onOutsideAction);
            }
        }
        if (shouldListen) {
            document.addEventListener('keydown', onKeyDown);
        }
        else {
            document.removeEventListener('keydown', onKeyDown);
        }
    }, [isOpen, onOutsideAction, onKeyDown]);
    useEffect(() => {
        handleOutsideActionListeners();
        return () => {
            handleOutsideActionListeners(false);
        };
    }, [handleOutsideActionListeners]);
    function renderInputs() {
        const [valueFrom] = Array.isArray(value) ? value : [value];
        const ariaLabelProps = {
            dayAriaLabel,
            monthAriaLabel,
            nativeInputAriaLabel,
            yearAriaLabel,
        };
        const placeholderProps = {
            dayPlaceholder,
            monthPlaceholder,
            yearPlaceholder,
        };
        return (_jsxs("div", { className: `${baseClassName}__wrapper`, children: [_jsx(DateInput, { ...ariaLabelProps, ...placeholderProps, autoFocus: autoFocus, className: `${baseClassName}__inputGroup`, disabled: disabled, format: format, isCalendarOpen: isOpen, locale: locale, maxDate: maxDate, maxDetail: maxDetail, minDate: minDate, name: name, onChange: onChange, onInvalidChange: onInvalidChange, required: required, returnValue: returnValue, showLeadingZeros: showLeadingZeros, value: valueFrom }), clearIcon !== null && (_jsx("button", { "aria-label": clearAriaLabel, className: `${baseClassName}__clear-button ${baseClassName}__button`, disabled: disabled, onClick: clear, onFocus: stopPropagation, type: "button", children: typeof clearIcon === 'function' ? createElement(clearIcon) : clearIcon })), calendarIcon !== null && !disableCalendar && (_jsx("button", { "aria-expanded": isOpen || false, "aria-label": calendarAriaLabel, className: `${baseClassName}__calendar-button ${baseClassName}__button`, disabled: disabled, onClick: toggleCalendar, onFocus: stopPropagation, type: "button", children: typeof calendarIcon === 'function' ? createElement(calendarIcon) : calendarIcon }))] }));
    }
    function renderCalendar() {
        if (isOpen === null || disableCalendar) {
            return null;
        }
        const { calendarProps, portalContainer, value } = props;
        const className = `${baseClassName}__calendar`;
        const classNames = clsx(className, `${className}--${isOpen ? 'open' : 'closed'}`);
        const calendar = (_jsx(Calendar, { locale: locale, maxDate: maxDate, maxDetail: maxDetail, minDate: minDate, onChange: (value) => onChange(value), value: value, ...calendarProps }));
        return portalContainer ? (createPortal(_jsx("div", { ref: calendarWrapper, className: classNames, children: calendar }), portalContainer)) : (_jsx(Fit, { children: _jsx("div", { ref: (ref) => {
                    if (ref && !isOpen) {
                        ref.removeAttribute('style');
                    }
                }, className: classNames, children: calendar }) }));
    }
    const eventProps = useMemo(() => makeEventProps(otherProps), 
    // biome-ignore lint/correctness/useExhaustiveDependencies: FIXME
    [otherProps]);
    return (
    // biome-ignore lint/a11y/noStaticElementInteractions: False positive caused by non interactive wrapper listening for bubbling events
    _jsxs("div", { className: clsx(baseClassName, `${baseClassName}--${isOpen ? 'open' : 'closed'}`, `${baseClassName}--${disabled ? 'disabled' : 'enabled'}`, className), "data-testid": dataTestid, id: id, ...eventProps, onFocus: onFocus, ref: wrapper, children: [renderInputs(), renderCalendar()] }));
}
