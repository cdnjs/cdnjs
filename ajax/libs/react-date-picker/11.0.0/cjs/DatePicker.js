"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_dom_1 = require("react-dom");
var make_event_props_1 = __importDefault(require("make-event-props"));
var clsx_1 = __importDefault(require("clsx"));
var react_calendar_1 = __importDefault(require("react-calendar"));
var react_fit_1 = __importDefault(require("react-fit"));
var DateInput_js_1 = __importDefault(require("./DateInput.js"));
var baseClassName = 'react-date-picker';
var outsideActionEvents = ['mousedown', 'focusin', 'touchstart'];
var iconProps = {
    xmlns: 'http://www.w3.org/2000/svg',
    width: 19,
    height: 19,
    viewBox: '0 0 19 19',
    stroke: 'black',
    strokeWidth: 2,
};
var CalendarIcon = ((0, jsx_runtime_1.jsxs)("svg", __assign({}, iconProps, { className: "".concat(baseClassName, "__calendar-button__icon ").concat(baseClassName, "__button__icon"), children: [(0, jsx_runtime_1.jsx)("rect", { fill: "none", height: "15", width: "15", x: "2", y: "2" }), (0, jsx_runtime_1.jsx)("line", { x1: "6", x2: "6", y1: "0", y2: "4" }), (0, jsx_runtime_1.jsx)("line", { x1: "13", x2: "13", y1: "0", y2: "4" })] })));
var ClearIcon = ((0, jsx_runtime_1.jsxs)("svg", __assign({}, iconProps, { className: "".concat(baseClassName, "__clear-button__icon ").concat(baseClassName, "__button__icon"), children: [(0, jsx_runtime_1.jsx)("line", { x1: "4", x2: "15", y1: "4", y2: "15" }), (0, jsx_runtime_1.jsx)("line", { x1: "15", x2: "4", y1: "4", y2: "15" })] })));
function DatePicker(props) {
    var autoFocus = props.autoFocus, calendarAriaLabel = props.calendarAriaLabel, _a = props.calendarIcon, calendarIcon = _a === void 0 ? CalendarIcon : _a, className = props.className, clearAriaLabel = props.clearAriaLabel, _b = props.clearIcon, clearIcon = _b === void 0 ? ClearIcon : _b, _c = props.closeCalendar, shouldCloseCalendarOnSelect = _c === void 0 ? true : _c, dataTestid = props["data-testid"], dayAriaLabel = props.dayAriaLabel, dayPlaceholder = props.dayPlaceholder, disableCalendar = props.disableCalendar, disabled = props.disabled, format = props.format, id = props.id, _d = props.isOpen, isOpenProps = _d === void 0 ? null : _d, locale = props.locale, maxDate = props.maxDate, _e = props.maxDetail, maxDetail = _e === void 0 ? 'month' : _e, minDate = props.minDate, monthAriaLabel = props.monthAriaLabel, monthPlaceholder = props.monthPlaceholder, _f = props.name, name = _f === void 0 ? 'date' : _f, nativeInputAriaLabel = props.nativeInputAriaLabel, onCalendarClose = props.onCalendarClose, onCalendarOpen = props.onCalendarOpen, onChangeProps = props.onChange, onFocusProps = props.onFocus, onInvalidChange = props.onInvalidChange, _g = props.openCalendarOnFocus, openCalendarOnFocus = _g === void 0 ? true : _g, required = props.required, _h = props.returnValue, returnValue = _h === void 0 ? 'start' : _h, shouldCloseCalendar = props.shouldCloseCalendar, shouldOpenCalendar = props.shouldOpenCalendar, showLeadingZeros = props.showLeadingZeros, value = props.value, yearAriaLabel = props.yearAriaLabel, yearPlaceholder = props.yearPlaceholder, otherProps = __rest(props, ["autoFocus", "calendarAriaLabel", "calendarIcon", "className", "clearAriaLabel", "clearIcon", "closeCalendar", 'data-testid', "dayAriaLabel", "dayPlaceholder", "disableCalendar", "disabled", "format", "id", "isOpen", "locale", "maxDate", "maxDetail", "minDate", "monthAriaLabel", "monthPlaceholder", "name", "nativeInputAriaLabel", "onCalendarClose", "onCalendarOpen", "onChange", "onFocus", "onInvalidChange", "openCalendarOnFocus", "required", "returnValue", "shouldCloseCalendar", "shouldOpenCalendar", "showLeadingZeros", "value", "yearAriaLabel", "yearPlaceholder"]);
    var _j = (0, react_1.useState)(isOpenProps), isOpen = _j[0], setIsOpen = _j[1];
    var wrapper = (0, react_1.useRef)(null);
    var calendarWrapper = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(function () {
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
    var closeCalendar = (0, react_1.useCallback)(function (_a) {
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
    var onKeyDown = (0, react_1.useCallback)(function (event) {
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
    var onOutsideAction = (0, react_1.useCallback)(function (event) {
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
    var handleOutsideActionListeners = (0, react_1.useCallback)(function (shouldListen) {
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
    (0, react_1.useEffect)(function () {
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
        return ((0, jsx_runtime_1.jsxs)("div", { className: "".concat(baseClassName, "__wrapper"), children: [(0, jsx_runtime_1.jsx)(DateInput_js_1.default, __assign({}, ariaLabelProps, placeholderProps, { 
                    // eslint-disable-next-line jsx-a11y/no-autofocus
                    autoFocus: autoFocus, className: "".concat(baseClassName, "__inputGroup"), disabled: disabled, format: format, isCalendarOpen: isOpen, locale: locale, maxDate: maxDate, maxDetail: maxDetail, minDate: minDate, name: name, onChange: onChange, onInvalidChange: onInvalidChange, required: required, returnValue: returnValue, showLeadingZeros: showLeadingZeros, value: valueFrom })), clearIcon !== null && ((0, jsx_runtime_1.jsx)("button", { "aria-label": clearAriaLabel, className: "".concat(baseClassName, "__clear-button ").concat(baseClassName, "__button"), disabled: disabled, onClick: clear, onFocus: stopPropagation, type: "button", children: typeof clearIcon === 'function' ? (0, react_1.createElement)(clearIcon) : clearIcon })), calendarIcon !== null && !disableCalendar && ((0, jsx_runtime_1.jsx)("button", { "aria-expanded": isOpen || false, "aria-label": calendarAriaLabel, className: "".concat(baseClassName, "__calendar-button ").concat(baseClassName, "__button"), disabled: disabled, onClick: toggleCalendar, onFocus: stopPropagation, type: "button", children: typeof calendarIcon === 'function' ? (0, react_1.createElement)(calendarIcon) : calendarIcon }))] }));
    }
    function renderCalendar() {
        if (isOpen === null || disableCalendar) {
            return null;
        }
        var calendarProps = props.calendarProps, portalContainer = props.portalContainer, value = props.value;
        var className = "".concat(baseClassName, "__calendar");
        var classNames = (0, clsx_1.default)(className, "".concat(className, "--").concat(isOpen ? 'open' : 'closed'));
        var calendar = ((0, jsx_runtime_1.jsx)(react_calendar_1.default, __assign({ locale: locale, maxDate: maxDate, maxDetail: maxDetail, minDate: minDate, onChange: function (value) { return onChange(value); }, value: value }, calendarProps)));
        return portalContainer ? ((0, react_dom_1.createPortal)((0, jsx_runtime_1.jsx)("div", { ref: calendarWrapper, className: classNames, children: calendar }), portalContainer)) : ((0, jsx_runtime_1.jsx)(react_fit_1.default, { children: (0, jsx_runtime_1.jsx)("div", { ref: function (ref) {
                    if (ref && !isOpen) {
                        ref.removeAttribute('style');
                    }
                }, className: classNames, children: calendar }) }));
    }
    var eventProps = (0, react_1.useMemo)(function () { return (0, make_event_props_1.default)(otherProps); }, [otherProps]);
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: (0, clsx_1.default)(baseClassName, "".concat(baseClassName, "--").concat(isOpen ? 'open' : 'closed'), "".concat(baseClassName, "--").concat(disabled ? 'disabled' : 'enabled'), className), "data-testid": dataTestid, id: id }, eventProps, { onFocus: onFocus, ref: wrapper, children: [renderInputs(), renderCalendar()] })));
}
exports.default = DatePicker;
