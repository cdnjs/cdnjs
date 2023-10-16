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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var react_1 = __importStar(require("react"));
var react_dom_1 = require("react-dom");
var prop_types_1 = __importDefault(require("prop-types"));
var make_event_props_1 = __importDefault(require("make-event-props"));
var clsx_1 = __importDefault(require("clsx"));
var react_calendar_1 = __importDefault(require("react-calendar"));
var react_fit_1 = __importDefault(require("react-fit"));
var DateInput_js_1 = __importDefault(require("./DateInput.js"));
var propTypes_js_1 = require("./shared/propTypes.js");
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
var CalendarIcon = (react_1.default.createElement("svg", __assign({}, iconProps, { className: "".concat(baseClassName, "__calendar-button__icon ").concat(baseClassName, "__button__icon") }),
    react_1.default.createElement("rect", { fill: "none", height: "15", width: "15", x: "2", y: "2" }),
    react_1.default.createElement("line", { x1: "6", x2: "6", y1: "0", y2: "4" }),
    react_1.default.createElement("line", { x1: "13", x2: "13", y1: "0", y2: "4" })));
var ClearIcon = (react_1.default.createElement("svg", __assign({}, iconProps, { className: "".concat(baseClassName, "__clear-button__icon ").concat(baseClassName, "__button__icon") }),
    react_1.default.createElement("line", { x1: "4", x2: "15", y1: "4", y2: "15" }),
    react_1.default.createElement("line", { x1: "15", x2: "4", y1: "4", y2: "15" })));
var DatePicker = function DatePicker(props) {
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
        return (react_1.default.createElement("div", { className: "".concat(baseClassName, "__wrapper") },
            react_1.default.createElement(DateInput_js_1.default, __assign({}, ariaLabelProps, placeholderProps, { 
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus: autoFocus, className: "".concat(baseClassName, "__inputGroup"), disabled: disabled, format: format, isCalendarOpen: isOpen, locale: locale, maxDate: maxDate, maxDetail: maxDetail, minDate: minDate, name: name, onChange: onChange, onInvalidChange: onInvalidChange, required: required, returnValue: returnValue, showLeadingZeros: showLeadingZeros, value: valueFrom })),
            clearIcon !== null && (react_1.default.createElement("button", { "aria-label": clearAriaLabel, className: "".concat(baseClassName, "__clear-button ").concat(baseClassName, "__button"), disabled: disabled, onClick: clear, onFocus: stopPropagation, type: "button" }, typeof clearIcon === 'function' ? react_1.default.createElement(clearIcon) : clearIcon)),
            calendarIcon !== null && !disableCalendar && (react_1.default.createElement("button", { "aria-label": calendarAriaLabel, className: "".concat(baseClassName, "__calendar-button ").concat(baseClassName, "__button"), disabled: disabled, onClick: toggleCalendar, onFocus: stopPropagation, type: "button" }, typeof calendarIcon === 'function' ? react_1.default.createElement(calendarIcon) : calendarIcon))));
    }
    function renderCalendar() {
        if (isOpen === null || disableCalendar) {
            return null;
        }
        var calendarClassName = props.calendarClassName, datePickerClassName = props.className, // Unused, here to exclude it from calendarProps
        onChangeProps = props.onChange, // Unused, here to exclude it from calendarProps
        portalContainer = props.portalContainer, value = props.value, calendarProps = __rest(props, ["calendarClassName", "className", "onChange", "portalContainer", "value"]);
        var className = "".concat(baseClassName, "__calendar");
        var classNames = (0, clsx_1.default)(className, "".concat(className, "--").concat(isOpen ? 'open' : 'closed'));
        var calendar = (react_1.default.createElement(react_calendar_1.default, __assign({ className: calendarClassName, onChange: function (value) { return onChange(value); }, value: value }, calendarProps)));
        return portalContainer ? ((0, react_dom_1.createPortal)(react_1.default.createElement("div", { ref: calendarWrapper, className: classNames }, calendar), portalContainer)) : (react_1.default.createElement(react_fit_1.default, null,
            react_1.default.createElement("div", { ref: function (ref) {
                    if (ref && !isOpen) {
                        ref.removeAttribute('style');
                    }
                }, className: classNames }, calendar)));
    }
    var eventProps = (0, react_1.useMemo)(function () { return (0, make_event_props_1.default)(otherProps); }, [otherProps]);
    return (react_1.default.createElement("div", __assign({ className: (0, clsx_1.default)(baseClassName, "".concat(baseClassName, "--").concat(isOpen ? 'open' : 'closed'), "".concat(baseClassName, "--").concat(disabled ? 'disabled' : 'enabled'), className), "data-testid": dataTestid, id: id }, eventProps, { onFocus: onFocus, ref: wrapper }),
        renderInputs(),
        renderCalendar()));
};
var isValue = prop_types_1.default.oneOfType([prop_types_1.default.string, prop_types_1.default.instanceOf(Date)]);
var isValueOrValueArray = prop_types_1.default.oneOfType([isValue, (0, propTypes_js_1.rangeOf)(isValue)]);
DatePicker.propTypes = {
    autoFocus: prop_types_1.default.bool,
    calendarAriaLabel: prop_types_1.default.string,
    calendarClassName: prop_types_1.default.oneOfType([prop_types_1.default.string, prop_types_1.default.arrayOf(prop_types_1.default.string)]),
    calendarIcon: prop_types_1.default.oneOfType([prop_types_1.default.node, prop_types_1.default.func]),
    className: prop_types_1.default.oneOfType([prop_types_1.default.string, prop_types_1.default.arrayOf(prop_types_1.default.string)]),
    clearAriaLabel: prop_types_1.default.string,
    clearIcon: prop_types_1.default.oneOfType([prop_types_1.default.node, prop_types_1.default.func]),
    closeCalendar: prop_types_1.default.bool,
    'data-testid': prop_types_1.default.string,
    dayAriaLabel: prop_types_1.default.string,
    dayPlaceholder: prop_types_1.default.string,
    disableCalendar: prop_types_1.default.bool,
    disabled: prop_types_1.default.bool,
    format: prop_types_1.default.string,
    id: prop_types_1.default.string,
    isOpen: prop_types_1.default.bool,
    locale: prop_types_1.default.string,
    maxDate: propTypes_js_1.isMaxDate,
    maxDetail: prop_types_1.default.oneOf(allViews),
    minDate: propTypes_js_1.isMinDate,
    monthAriaLabel: prop_types_1.default.string,
    monthPlaceholder: prop_types_1.default.string,
    name: prop_types_1.default.string,
    nativeInputAriaLabel: prop_types_1.default.string,
    onCalendarClose: prop_types_1.default.func,
    onCalendarOpen: prop_types_1.default.func,
    onChange: prop_types_1.default.func,
    onFocus: prop_types_1.default.func,
    openCalendarOnFocus: prop_types_1.default.bool,
    required: prop_types_1.default.bool,
    returnValue: prop_types_1.default.oneOf(['start', 'end', 'range']),
    showLeadingZeros: prop_types_1.default.bool,
    value: isValueOrValueArray,
    yearAriaLabel: prop_types_1.default.string,
    yearPlaceholder: prop_types_1.default.string,
};
if (isBrowser) {
    DatePicker.propTypes.portalContainer = prop_types_1.default.instanceOf(HTMLElement);
}
exports.default = DatePicker;
