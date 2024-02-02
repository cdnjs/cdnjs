"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DateRangeInput", {
    enumerable: true,
    get: function() {
        return DateRangeInput;
    }
});
var _define_property = require("@swc/helpers/_/_define_property");
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _icons = require("@vkontakte/icons");
var _vkjs = require("@vkontakte/vkjs");
var _useAdaptivity = require("../../hooks/useAdaptivity");
var _useDateInput = require("../../hooks/useDateInput");
var _useExternRef = require("../../hooks/useExternRef");
var _adaptivity = require("../../lib/adaptivity");
var _callMultiple = require("../../lib/callMultiple");
var _date = require("../../lib/date");
var _CalendarRange = require("../CalendarRange/CalendarRange");
var _FormField = require("../FormField/FormField");
var _IconButton = require("../IconButton/IconButton");
var _InputLike = require("../InputLike/InputLike");
var _InputLikeDivider = require("../InputLike/InputLikeDivider");
var _Popper = require("../Popper/Popper");
var _Text = require("../Typography/Text/Text");
var sizeYClassNames = _define_property._({
    none: "vkuiDateRangeInput--sizeY-none"
}, _adaptivity.SizeType.COMPACT, "vkuiDateRangeInput--sizeY-compact");
var elementsConfig = function(index) {
    var length = 2;
    var min = 1;
    var max = 0;
    switch(index){
        case 0:
        case 3:
            max = 31;
            break;
        case 1:
        case 4:
            max = 12;
            break;
        case 2:
        case 5:
            max = 2100;
            min = 1900;
            length = 4;
            break;
    }
    return {
        length: length,
        min: min,
        max: max
    };
};
var getInternalValue = function(value) {
    var newValue = [
        "",
        "",
        "",
        "",
        "",
        ""
    ];
    if (value === null || value === void 0 ? void 0 : value[0]) {
        newValue[0] = String(value[0].getDate()).padStart(2, "0");
        newValue[1] = String(value[0].getMonth() + 1).padStart(2, "0");
        newValue[2] = String(value[0].getFullYear()).padStart(4, "0");
    }
    if (value === null || value === void 0 ? void 0 : value[1]) {
        newValue[3] = String(value[1].getDate()).padStart(2, "0");
        newValue[4] = String(value[1].getMonth() + 1).padStart(2, "0");
        newValue[5] = String(value[1].getFullYear()).padStart(4, "0");
    }
    return newValue;
};
var DateRangeInput = function(_param) {
    var shouldDisableDate = _param.shouldDisableDate, disableFuture = _param.disableFuture, disablePast = _param.disablePast, value = _param.value, onChange = _param.onChange, _param_calendarPlacement = _param.calendarPlacement, calendarPlacement = _param_calendarPlacement === void 0 ? "bottom-start" : _param_calendarPlacement, style = _param.style, className = _param.className, _param_closeOnChange = _param.closeOnChange, closeOnChange = _param_closeOnChange === void 0 ? true : _param_closeOnChange, disablePickers = _param.disablePickers, getRootRef = _param.getRootRef, name = _param.name, autoFocus = _param.autoFocus, disabled = _param.disabled, onClick = _param.onClick, onFocus = _param.onFocus, prevMonthAriaLabel = _param.prevMonthAriaLabel, nextMonthAriaLabel = _param.nextMonthAriaLabel, changeDayAriaLabel = _param.changeDayAriaLabel, changeMonthAriaLabel = _param.changeMonthAriaLabel, changeYearAriaLabel = _param.changeYearAriaLabel, _param_changeStartDayAriaLabel = _param.changeStartDayAriaLabel, changeStartDayAriaLabel = _param_changeStartDayAriaLabel === void 0 ? "Изменить день начала" : _param_changeStartDayAriaLabel, _param_changeStartMonthAriaLabel = _param.changeStartMonthAriaLabel, changeStartMonthAriaLabel = _param_changeStartMonthAriaLabel === void 0 ? "Изменить месяц начала" : _param_changeStartMonthAriaLabel, _param_changeStartYearAriaLabel = _param.changeStartYearAriaLabel, changeStartYearAriaLabel = _param_changeStartYearAriaLabel === void 0 ? "Изменить год начала" : _param_changeStartYearAriaLabel, _param_changeEndDayAriaLabel = _param.changeEndDayAriaLabel, changeEndDayAriaLabel = _param_changeEndDayAriaLabel === void 0 ? "Изменить день окончания" : _param_changeEndDayAriaLabel, _param_changeEndMonthAriaLabel = _param.changeEndMonthAriaLabel, changeEndMonthAriaLabel = _param_changeEndMonthAriaLabel === void 0 ? "Изменить месяц окончания" : _param_changeEndMonthAriaLabel, _param_changeEndYearAriaLabel = _param.changeEndYearAriaLabel, changeEndYearAriaLabel = _param_changeEndYearAriaLabel === void 0 ? "Изменить год окончания" : _param_changeEndYearAriaLabel, _param_clearFieldAriaLabel = _param.clearFieldAriaLabel, clearFieldAriaLabel = _param_clearFieldAriaLabel === void 0 ? "Очистить поле" : _param_clearFieldAriaLabel, _param_showCalendarAriaLabel = _param.showCalendarAriaLabel, showCalendarAriaLabel = _param_showCalendarAriaLabel === void 0 ? "Показать календарь" : _param_showCalendarAriaLabel, prevMonthIcon = _param.prevMonthIcon, nextMonthIcon = _param.nextMonthIcon, _param_disableCalendar = _param.disableCalendar, disableCalendar = _param_disableCalendar === void 0 ? false : _param_disableCalendar, props = _object_without_properties._(_param, [
        "shouldDisableDate",
        "disableFuture",
        "disablePast",
        "value",
        "onChange",
        "calendarPlacement",
        "style",
        "className",
        "closeOnChange",
        "disablePickers",
        "getRootRef",
        "name",
        "autoFocus",
        "disabled",
        "onClick",
        "onFocus",
        "prevMonthAriaLabel",
        "nextMonthAriaLabel",
        "changeDayAriaLabel",
        "changeMonthAriaLabel",
        "changeYearAriaLabel",
        "changeStartDayAriaLabel",
        "changeStartMonthAriaLabel",
        "changeStartYearAriaLabel",
        "changeEndDayAriaLabel",
        "changeEndMonthAriaLabel",
        "changeEndYearAriaLabel",
        "clearFieldAriaLabel",
        "showCalendarAriaLabel",
        "prevMonthIcon",
        "nextMonthIcon",
        "disableCalendar"
    ]);
    var daysStartRef = _react.useRef(null);
    var monthsStartRef = _react.useRef(null);
    var yearsStartRef = _react.useRef(null);
    var daysEndRef = _react.useRef(null);
    var monthsEndRef = _react.useRef(null);
    var yearsEndRef = _react.useRef(null);
    var onInternalValueChange = _react.useCallback(function(internalValue) {
        var isStartValid = true;
        var isEndValid = true;
        for(var i = 0; i <= 2; i += 1){
            if (internalValue[i].length < elementsConfig(i).length) {
                isStartValid = false;
            }
        }
        for(var i1 = 3; i1 <= 5; i1 += 1){
            if (internalValue[i1].length < elementsConfig(i1).length) {
                isEndValid = false;
            }
        }
        var formattedStartValue = "".concat(internalValue[0], ".").concat(internalValue[1], ".").concat(internalValue[2]);
        var formattedEndValue = "".concat(internalValue[3], ".").concat(internalValue[4], ".").concat(internalValue[5]);
        var mask = "DD.MM.YYYY";
        if (!(0, _date.isMatch)(formattedStartValue, mask)) {
            isStartValid = false;
        }
        if (!(0, _date.isMatch)(formattedEndValue, mask)) {
            isEndValid = false;
        }
        if (!isStartValid && !isEndValid) {
            return;
        }
        var valueExists = Array.isArray(value);
        var now = new Date();
        var start = isStartValid ? (0, _date.parse)(formattedStartValue, mask, valueExists && (value === null || value === void 0 ? void 0 : value[0]) || now) : null;
        var end = isEndValid ? (0, _date.parse)(formattedEndValue, mask, valueExists && (value === null || value === void 0 ? void 0 : value[1]) || now) : null;
        if (start && end && (0, _date.isAfter)(end, start)) {
            onChange === null || onChange === void 0 ? void 0 : onChange([
                start,
                end
            ]);
        }
    }, [
        onChange,
        value
    ]);
    var refs = _react.useMemo(function() {
        return [
            daysStartRef,
            monthsStartRef,
            yearsStartRef,
            daysEndRef,
            monthsEndRef,
            yearsEndRef
        ];
    }, [
        daysStartRef,
        monthsStartRef,
        yearsStartRef,
        daysEndRef,
        monthsEndRef,
        yearsEndRef
    ]);
    var _useDateInput1 = (0, _useDateInput.useDateInput)({
        maxElement: 5,
        refs: refs,
        autoFocus: autoFocus,
        disabled: disabled,
        elementsConfig: elementsConfig,
        onChange: onChange,
        onInternalValueChange: onInternalValueChange,
        getInternalValue: getInternalValue,
        value: value
    }), rootRef = _useDateInput1.rootRef, calendarRef = _useDateInput1.calendarRef, open = _useDateInput1.open, openCalendar = _useDateInput1.openCalendar, closeCalendar = _useDateInput1.closeCalendar, internalValue = _useDateInput1.internalValue, handleKeyDown = _useDateInput1.handleKeyDown, setFocusedElement = _useDateInput1.setFocusedElement, handleFieldEnter = _useDateInput1.handleFieldEnter, clear = _useDateInput1.clear, removeFocusFromField = _useDateInput1.removeFocusFromField;
    var _useAdaptivity1 = (0, _useAdaptivity.useAdaptivity)(), _useAdaptivity_sizeY = _useAdaptivity1.sizeY, sizeY = _useAdaptivity_sizeY === void 0 ? "none" : _useAdaptivity_sizeY;
    var handleRootRef = (0, _useExternRef.useExternRef)(rootRef, getRootRef);
    var onCalendarChange = _react.useCallback(function(newValue) {
        onChange === null || onChange === void 0 ? void 0 : onChange(newValue);
        if (closeOnChange && (newValue === null || newValue === void 0 ? void 0 : newValue[1]) && newValue[1] !== (value === null || value === void 0 ? void 0 : value[1])) {
            removeFocusFromField();
        }
    }, [
        onChange,
        closeOnChange,
        value,
        removeFocusFromField
    ]);
    return /*#__PURE__*/ _react.createElement(_FormField.FormField, _object_spread._({
        style: style,
        className: (0, _vkjs.classNames)(sizeY !== _adaptivity.SizeType.REGULAR && sizeYClassNames[sizeY], className),
        getRootRef: handleRootRef,
        after: value ? /*#__PURE__*/ _react.createElement(_IconButton.IconButton, {
            hoverMode: "opacity",
            "aria-label": clearFieldAriaLabel,
            onClick: clear
        }, /*#__PURE__*/ _react.createElement(_icons.Icon16Clear, null)) : /*#__PURE__*/ _react.createElement(_IconButton.IconButton, {
            hoverMode: "opacity",
            "aria-label": showCalendarAriaLabel,
            onClick: openCalendar
        }, /*#__PURE__*/ _react.createElement(_icons.Icon20CalendarOutline, null)),
        disabled: disabled,
        onClick: (0, _callMultiple.callMultiple)(handleFieldEnter, onClick),
        onFocus: (0, _callMultiple.callMultiple)(handleFieldEnter, onFocus)
    }, props), /*#__PURE__*/ _react.createElement("input", {
        type: "hidden",
        name: name,
        value: value ? "".concat(value[0] ? (0, _date.format)(value[0], "DD.MM.YYYY") : "", " - ").concat(value[1] ? (0, _date.format)(value[1], "DD.MM.YYYY") : "") : ""
    }), /*#__PURE__*/ _react.createElement(_Text.Text, {
        className: "vkuiDateInput__input",
        onKeyDown: handleKeyDown
    }, /*#__PURE__*/ _react.createElement(_InputLike.InputLike, {
        length: 2,
        getRootRef: daysStartRef,
        index: 0,
        onElementSelect: setFocusedElement,
        value: internalValue[0],
        "aria-label": changeStartDayAriaLabel
    }), /*#__PURE__*/ _react.createElement(_InputLikeDivider.InputLikeDivider, null, "."), /*#__PURE__*/ _react.createElement(_InputLike.InputLike, {
        length: 2,
        getRootRef: monthsStartRef,
        index: 1,
        onElementSelect: setFocusedElement,
        value: internalValue[1],
        "aria-label": changeStartMonthAriaLabel
    }), /*#__PURE__*/ _react.createElement(_InputLikeDivider.InputLikeDivider, null, "."), /*#__PURE__*/ _react.createElement(_InputLike.InputLike, {
        length: 4,
        getRootRef: yearsStartRef,
        index: 2,
        onElementSelect: setFocusedElement,
        value: internalValue[2],
        "aria-label": changeStartYearAriaLabel
    }), /*#__PURE__*/ _react.createElement(_InputLikeDivider.InputLikeDivider, null, " — "), /*#__PURE__*/ _react.createElement(_InputLike.InputLike, {
        length: 2,
        getRootRef: daysEndRef,
        index: 3,
        onElementSelect: setFocusedElement,
        value: internalValue[3],
        "aria-label": changeEndDayAriaLabel
    }), /*#__PURE__*/ _react.createElement(_InputLikeDivider.InputLikeDivider, null, "."), /*#__PURE__*/ _react.createElement(_InputLike.InputLike, {
        length: 2,
        getRootRef: monthsEndRef,
        index: 4,
        onElementSelect: setFocusedElement,
        value: internalValue[4],
        "aria-label": changeEndMonthAriaLabel
    }), /*#__PURE__*/ _react.createElement(_InputLikeDivider.InputLikeDivider, null, "."), /*#__PURE__*/ _react.createElement(_InputLike.InputLike, {
        length: 4,
        getRootRef: yearsEndRef,
        index: 5,
        onElementSelect: setFocusedElement,
        value: internalValue[5],
        "aria-label": changeEndYearAriaLabel
    })), open && !disableCalendar && /*#__PURE__*/ _react.createElement(_Popper.Popper, {
        targetRef: rootRef,
        offsetDistance: 8,
        placement: calendarPlacement
    }, /*#__PURE__*/ _react.createElement(_CalendarRange.CalendarRange, {
        value: value,
        onChange: onCalendarChange,
        disablePast: disablePast,
        disableFuture: disableFuture,
        shouldDisableDate: shouldDisableDate,
        onClose: closeCalendar,
        getRootRef: calendarRef,
        disablePickers: disablePickers,
        prevMonthAriaLabel: prevMonthAriaLabel,
        nextMonthAriaLabel: nextMonthAriaLabel,
        changeMonthAriaLabel: changeMonthAriaLabel,
        changeYearAriaLabel: changeYearAriaLabel,
        changeDayAriaLabel: changeDayAriaLabel,
        prevMonthIcon: prevMonthIcon,
        nextMonthIcon: nextMonthIcon
    })));
};

//# sourceMappingURL=DateRangeInput.js.map