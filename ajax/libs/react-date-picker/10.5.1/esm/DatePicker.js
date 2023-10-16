'use client';
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import makeEventProps from 'make-event-props';
import clsx from 'clsx';
import Calendar from 'react-calendar';
import Fit from 'react-fit';
import DateInput from './DateInput.js';
import { isMaxDate, isMinDate, rangeOf } from './shared/propTypes.js';
var isBrowser = typeof document !== 'undefined';
var baseClassName = 'react-date-picker';
var outsideActionEvents = ['mousedown', 'focusin', 'touchstart'];
var allViews = ['century', 'decade', 'year', 'month'];
var iconProps = {
    xmlns: 'http://www.w3.org/2000/svg',
    width: 19,
    height: 19,
    viewBox: '0 0 19 19',
    stroke: 'black',
    strokeWidth: 2,
};
var CalendarIcon = (React.createElement("svg", __assign({}, iconProps, { className: "".concat(baseClassName, "__calendar-button__icon ").concat(baseClassName, "__button__icon") }),
    React.createElement("rect", { fill: "none", height: "15", width: "15", x: "2", y: "2" }),
    React.createElement("line", { x1: "6", x2: "6", y1: "0", y2: "4" }),
    React.createElement("line", { x1: "13", x2: "13", y1: "0", y2: "4" })));
var ClearIcon = (React.createElement("svg", __assign({}, iconProps, { className: "".concat(baseClassName, "__clear-button__icon ").concat(baseClassName, "__button__icon") }),
    React.createElement("line", { x1: "4", x2: "15", y1: "4", y2: "15" }),
    React.createElement("line", { x1: "15", x2: "4", y1: "4", y2: "15" })));
var DatePicker = function DatePicker(props) {
    var autoFocus = props.autoFocus, calendarAriaLabel = props.calendarAriaLabel, _a = props.calendarIcon, calendarIcon = _a === void 0 ? CalendarIcon : _a, className = props.className, clearAriaLabel = props.clearAriaLabel, _b = props.clearIcon, clearIcon = _b === void 0 ? ClearIcon : _b, _c = props.closeCalendar, shouldCloseCalendarOnSelect = _c === void 0 ? true : _c, dataTestid = props["data-testid"], dayAriaLabel = props.dayAriaLabel, dayPlaceholder = props.dayPlaceholder, disableCalendar = props.disableCalendar, disabled = props.disabled, format = props.format, id = props.id, _d = props.isOpen, isOpenProps = _d === void 0 ? null : _d, locale = props.locale, maxDate = props.maxDate, _e = props.maxDetail, maxDetail = _e === void 0 ? 'month' : _e, minDate = props.minDate, monthAriaLabel = props.monthAriaLabel, monthPlaceholder = props.monthPlaceholder, _f = props.name, name = _f === void 0 ? 'date' : _f, nativeInputAriaLabel = props.nativeInputAriaLabel, onCalendarClose = props.onCalendarClose, onCalendarOpen = props.onCalendarOpen, onChangeProps = props.onChange, onFocusProps = props.onFocus, onInvalidChange = props.onInvalidChange, _g = props.openCalendarOnFocus, openCalendarOnFocus = _g === void 0 ? true : _g, required = props.required, _h = props.returnValue, returnValue = _h === void 0 ? 'start' : _h, shouldCloseCalendar = props.shouldCloseCalendar, shouldOpenCalendar = props.shouldOpenCalendar, showLeadingZeros = props.showLeadingZeros, value = props.value, yearAriaLabel = props.yearAriaLabel, yearPlaceholder = props.yearPlaceholder, otherProps = __rest(props, ["autoFocus", "calendarAriaLabel", "calendarIcon", "className", "clearAriaLabel", "clearIcon", "closeCalendar", 'data-testid', "dayAriaLabel", "dayPlaceholder", "disableCalendar", "disabled", "format", "id", "isOpen", "locale", "maxDate", "maxDetail", "minDate", "monthAriaLabel", "monthPlaceholder", "name", "nativeInputAriaLabel", "onCalendarClose", "onCalendarOpen", "onChange", "onFocus", "onInvalidChange", "openCalendarOnFocus", "required", "returnValue", "shouldCloseCalendar", "shouldOpenCalendar", "showLeadingZeros", "value", "yearAriaLabel", "yearPlaceholder"]);
    var _j = useState(isOpenProps), isOpen = _j[0], setIsOpen = _j[1];
    var wrapper = useRef(null);
    var calendarWrapper = useRef(null);
    useEffect(function () {
        setIsOpen(isOpenProps);
    }, [isOpenProps]);
    function openCalendar(_a) {
        var reason = _a.reason;
        if (shouldOpenCalendar) {
            if (!shouldOpenCalendar({ reason: reason })) {
                return;
            }
        }
        setIsOpen(true);
        if (onCalendarOpen) {
            onCalendarOpen();
        }
    }
    var closeCalendar = useCallback(function (_a) {
        var reason = _a.reason;
        if (shouldCloseCalendar) {
            if (!shouldCloseCalendar({ reason: reason })) {
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
    function onChange(value, shouldCloseCalendar) {
        if (shouldCloseCalendar === void 0) { shouldCloseCalendar = shouldCloseCalendarOnSelect; }
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
    var onKeyDown = useCallback(function (event) {
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
    var onOutsideAction = useCallback(function (event) {
        var wrapperEl = wrapper.current;
        var calendarWrapperEl = calendarWrapper.current;
        // Try event.composedPath first to handle clicks inside a Shadow DOM.
        var target = ('composedPath' in event ? event.composedPath()[0] : event.target);
        if (target &&
            wrapperEl &&
            !wrapperEl.contains(target) &&
            (!calendarWrapperEl || !calendarWrapperEl.contains(target))) {
            closeCalendar({ reason: 'outsideAction' });
        }
    }, [calendarWrapper, closeCalendar, wrapper]);
    var handleOutsideActionListeners = useCallback(function (shouldListen) {
        if (shouldListen === void 0) { shouldListen = isOpen; }
        outsideActionEvents.forEach(function (event) {
            if (shouldListen) {
                document.addEventListener(event, onOutsideAction);
            }
            else {
                document.removeEventListener(event, onOutsideAction);
            }
        });
        if (shouldListen) {
            document.addEventListener('keydown', onKeyDown);
        }
        else {
            document.removeEventListener('keydown', onKeyDown);
        }
    }, [isOpen, onOutsideAction, onKeyDown]);
    useEffect(function () {
        handleOutsideActionListeners();
        return function () {
            handleOutsideActionListeners(false);
        };
    }, [handleOutsideActionListeners]);
    function renderInputs() {
        var valueFrom = (Array.isArray(value) ? value : [value])[0];
        var ariaLabelProps = {
            dayAriaLabel: dayAriaLabel,
            monthAriaLabel: monthAriaLabel,
            nativeInputAriaLabel: nativeInputAriaLabel,
            yearAriaLabel: yearAriaLabel,
        };
        var placeholderProps = {
            dayPlaceholder: dayPlaceholder,
            monthPlaceholder: monthPlaceholder,
            yearPlaceholder: yearPlaceholder,
        };
        return (React.createElement("div", { className: "".concat(baseClassName, "__wrapper") },
            React.createElement(DateInput, __assign({}, ariaLabelProps, placeholderProps, { 
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus: autoFocus, className: "".concat(baseClassName, "__inputGroup"), disabled: disabled, format: format, isCalendarOpen: isOpen, locale: locale, maxDate: maxDate, maxDetail: maxDetail, minDate: minDate, name: name, onChange: onChange, onInvalidChange: onInvalidChange, required: required, returnValue: returnValue, showLeadingZeros: showLeadingZeros, value: valueFrom })),
            clearIcon !== null && (React.createElement("button", { "aria-label": clearAriaLabel, className: "".concat(baseClassName, "__clear-button ").concat(baseClassName, "__button"), disabled: disabled, onClick: clear, onFocus: stopPropagation, type: "button" }, typeof clearIcon === 'function' ? React.createElement(clearIcon) : clearIcon)),
            calendarIcon !== null && !disableCalendar && (React.createElement("button", { "aria-label": calendarAriaLabel, className: "".concat(baseClassName, "__calendar-button ").concat(baseClassName, "__button"), disabled: disabled, onClick: toggleCalendar, onFocus: stopPropagation, type: "button" }, typeof calendarIcon === 'function' ? React.createElement(calendarIcon) : calendarIcon))));
    }
    function renderCalendar() {
        if (isOpen === null || disableCalendar) {
            return null;
        }
        var calendarClassName = props.calendarClassName, datePickerClassName = props.className, // Unused, here to exclude it from calendarProps
        onChangeProps = props.onChange, // Unused, here to exclude it from calendarProps
        portalContainer = props.portalContainer, value = props.value, calendarProps = __rest(props, ["calendarClassName", "className", "onChange", "portalContainer", "value"]);
        var className = "".concat(baseClassName, "__calendar");
        var classNames = clsx(className, "".concat(className, "--").concat(isOpen ? 'open' : 'closed'));
        var calendar = (React.createElement(Calendar, __assign({ className: calendarClassName, onChange: function (value) { return onChange(value); }, value: value }, calendarProps)));
        return portalContainer ? (createPortal(React.createElement("div", { ref: calendarWrapper, className: classNames }, calendar), portalContainer)) : (React.createElement(Fit, null,
            React.createElement("div", { ref: function (ref) {
                    if (ref && !isOpen) {
                        ref.removeAttribute('style');
                    }
                }, className: classNames }, calendar)));
    }
    var eventProps = useMemo(function () { return makeEventProps(otherProps); }, [otherProps]);
    return (React.createElement("div", __assign({ className: clsx(baseClassName, "".concat(baseClassName, "--").concat(isOpen ? 'open' : 'closed'), "".concat(baseClassName, "--").concat(disabled ? 'disabled' : 'enabled'), className), "data-testid": dataTestid, id: id }, eventProps, { onFocus: onFocus, ref: wrapper }),
        renderInputs(),
        renderCalendar()));
};
var isValue = PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]);
var isValueOrValueArray = PropTypes.oneOfType([isValue, rangeOf(isValue)]);
DatePicker.propTypes = {
    autoFocus: PropTypes.bool,
    calendarAriaLabel: PropTypes.string,
    calendarClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    calendarIcon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    className: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    clearAriaLabel: PropTypes.string,
    clearIcon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    closeCalendar: PropTypes.bool,
    'data-testid': PropTypes.string,
    dayAriaLabel: PropTypes.string,
    dayPlaceholder: PropTypes.string,
    disableCalendar: PropTypes.bool,
    disabled: PropTypes.bool,
    format: PropTypes.string,
    id: PropTypes.string,
    isOpen: PropTypes.bool,
    locale: PropTypes.string,
    maxDate: isMaxDate,
    maxDetail: PropTypes.oneOf(allViews),
    minDate: isMinDate,
    monthAriaLabel: PropTypes.string,
    monthPlaceholder: PropTypes.string,
    name: PropTypes.string,
    nativeInputAriaLabel: PropTypes.string,
    onCalendarClose: PropTypes.func,
    onCalendarOpen: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    openCalendarOnFocus: PropTypes.bool,
    required: PropTypes.bool,
    returnValue: PropTypes.oneOf(['start', 'end', 'range']),
    showLeadingZeros: PropTypes.bool,
    value: isValueOrValueArray,
    yearAriaLabel: PropTypes.string,
    yearPlaceholder: PropTypes.string,
};
if (isBrowser) {
    DatePicker.propTypes.portalContainer = PropTypes.instanceOf(HTMLElement);
}
export default DatePicker;
