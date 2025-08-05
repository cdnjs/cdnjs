"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DatePicker;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_dom_1 = require("react-dom");
const clsx_1 = __importDefault(require("clsx"));
const make_event_props_1 = __importDefault(require("make-event-props"));
const react_calendar_1 = __importDefault(require("react-calendar"));
const react_fit_1 = __importDefault(require("react-fit"));
const DateInput_js_1 = __importDefault(require("./DateInput.js"));
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
const CalendarIcon = ((0, jsx_runtime_1.jsxs)("svg", { ...iconProps, "aria-hidden": "true", className: `${baseClassName}__calendar-button__icon ${baseClassName}__button__icon`, children: [(0, jsx_runtime_1.jsx)("rect", { fill: "none", height: "15", width: "15", x: "2", y: "2" }), (0, jsx_runtime_1.jsx)("line", { x1: "6", x2: "6", y1: "0", y2: "4" }), (0, jsx_runtime_1.jsx)("line", { x1: "13", x2: "13", y1: "0", y2: "4" })] }));
const ClearIcon = ((0, jsx_runtime_1.jsxs)("svg", { ...iconProps, "aria-hidden": "true", className: `${baseClassName}__clear-button__icon ${baseClassName}__button__icon`, children: [(0, jsx_runtime_1.jsx)("line", { x1: "4", x2: "15", y1: "4", y2: "15" }), (0, jsx_runtime_1.jsx)("line", { x1: "15", x2: "4", y1: "4", y2: "15" })] }));
function DatePicker(props) {
    const { autoFocus, calendarAriaLabel, calendarIcon = CalendarIcon, className, clearAriaLabel, clearIcon = ClearIcon, closeCalendar: shouldCloseCalendarOnSelect = true, 'data-testid': dataTestid, dayAriaLabel, dayPlaceholder, disableCalendar, disabled, format, id, isOpen: isOpenProps = null, locale, maxDate, maxDetail = 'month', minDate, monthAriaLabel, monthPlaceholder, name = 'date', nativeInputAriaLabel, onCalendarClose, onCalendarOpen, onChange: onChangeProps, onFocus: onFocusProps, onInvalidChange, openCalendarOnFocus = true, required, returnValue = 'start', shouldCloseCalendar, shouldOpenCalendar, showLeadingZeros, value, yearAriaLabel, yearPlaceholder, ...otherProps } = props;
    const [isOpen, setIsOpen] = (0, react_1.useState)(isOpenProps);
    const wrapper = (0, react_1.useRef)(null);
    const calendarWrapper = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
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
    const closeCalendar = (0, react_1.useCallback)(({ reason }) => {
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
    const onKeyDown = (0, react_1.useCallback)((event) => {
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
    const onOutsideAction = (0, react_1.useCallback)((event) => {
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
    const handleOutsideActionListeners = (0, react_1.useCallback)((shouldListen = isOpen) => {
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
    (0, react_1.useEffect)(() => {
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
        return ((0, jsx_runtime_1.jsxs)("div", { className: `${baseClassName}__wrapper`, children: [(0, jsx_runtime_1.jsx)(DateInput_js_1.default, { ...ariaLabelProps, ...placeholderProps, autoFocus: autoFocus, className: `${baseClassName}__inputGroup`, disabled: disabled, format: format, isCalendarOpen: isOpen, locale: locale, maxDate: maxDate, maxDetail: maxDetail, minDate: minDate, name: name, onChange: onChange, onInvalidChange: onInvalidChange, required: required, returnValue: returnValue, showLeadingZeros: showLeadingZeros, value: valueFrom }), clearIcon !== null && ((0, jsx_runtime_1.jsx)("button", { "aria-label": clearAriaLabel, className: `${baseClassName}__clear-button ${baseClassName}__button`, disabled: disabled, onClick: clear, onFocus: stopPropagation, type: "button", children: typeof clearIcon === 'function' ? (0, react_1.createElement)(clearIcon) : clearIcon })), calendarIcon !== null && !disableCalendar && ((0, jsx_runtime_1.jsx)("button", { "aria-expanded": isOpen || false, "aria-label": calendarAriaLabel, className: `${baseClassName}__calendar-button ${baseClassName}__button`, disabled: disabled, onClick: toggleCalendar, onFocus: stopPropagation, type: "button", children: typeof calendarIcon === 'function' ? (0, react_1.createElement)(calendarIcon) : calendarIcon }))] }));
    }
    function renderCalendar() {
        if (isOpen === null || disableCalendar) {
            return null;
        }
        const { calendarProps, portalContainer, value } = props;
        const className = `${baseClassName}__calendar`;
        const classNames = (0, clsx_1.default)(className, `${className}--${isOpen ? 'open' : 'closed'}`);
        const calendar = ((0, jsx_runtime_1.jsx)(react_calendar_1.default, { locale: locale, maxDate: maxDate, maxDetail: maxDetail, minDate: minDate, onChange: (value) => onChange(value), value: value, ...calendarProps }));
        return portalContainer ? ((0, react_dom_1.createPortal)((0, jsx_runtime_1.jsx)("div", { ref: calendarWrapper, className: classNames, children: calendar }), portalContainer)) : ((0, jsx_runtime_1.jsx)(react_fit_1.default, { children: (0, jsx_runtime_1.jsx)("div", { ref: (ref) => {
                    if (ref && !isOpen) {
                        ref.removeAttribute('style');
                    }
                }, className: classNames, children: calendar }) }));
    }
    const eventProps = (0, react_1.useMemo)(() => (0, make_event_props_1.default)(otherProps), 
    // biome-ignore lint/correctness/useExhaustiveDependencies: FIXME
    [otherProps]);
    return (
    // biome-ignore lint/a11y/noStaticElementInteractions: False positive caused by non interactive wrapper listening for bubbling events
    (0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)(baseClassName, `${baseClassName}--${isOpen ? 'open' : 'closed'}`, `${baseClassName}--${disabled ? 'disabled' : 'enabled'}`, className), "data-testid": dataTestid, id: id, ...eventProps, onFocus: onFocus, ref: wrapper, children: [renderInputs(), renderCalendar()] }));
}
