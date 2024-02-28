import { _ as _define_property } from "@swc/helpers/_/_define_property";
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { Icon16Clear, Icon20CalendarOutline } from "@vkontakte/icons";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import { useDateInput } from "../../hooks/useDateInput";
import { useExternRef } from "../../hooks/useExternRef";
import { SizeType } from "../../lib/adaptivity";
import { callMultiple } from "../../lib/callMultiple";
import { format, isMatch, parse } from "../../lib/date";
import { Calendar } from "../Calendar/Calendar";
import { FormField } from "../FormField/FormField";
import { IconButton } from "../IconButton/IconButton";
import { InputLike } from "../InputLike/InputLike";
import { InputLikeDivider } from "../InputLike/InputLikeDivider";
import { Popper } from "../Popper/Popper";
import { Text } from "../Typography/Text/Text";
var sizeYClassNames = _define_property({
    none: "vkuiDateInput--sizeY-none"
}, SizeType.COMPACT, "vkuiDateInput--sizeY-compact");
var elementsConfig = function(index) {
    var length = 2;
    var min = 1;
    var max = 0;
    switch(index){
        case 0:
            max = 31;
            break;
        case 1:
            max = 12;
            break;
        case 2:
            max = 2100;
            min = 1900;
            length = 4;
            break;
        case 3:
            max = 23;
            break;
        case 4:
            max = 59;
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
        ""
    ];
    if (value) {
        newValue[0] = String(value.getDate()).padStart(2, "0");
        newValue[1] = String(value.getMonth() + 1).padStart(2, "0");
        newValue[2] = String(value.getFullYear()).padStart(4, "0");
        newValue[3] = String(value.getHours()).padStart(2, "0");
        newValue[4] = String(value.getMinutes()).padStart(2, "0");
    }
    return newValue;
};
/**
 * @see https://vkcom.github.io/VKUI/#/DateInput
 */ export var DateInput = function(_param) {
    var enableTime = _param.enableTime, shouldDisableDate = _param.shouldDisableDate, disableFuture = _param.disableFuture, disablePast = _param.disablePast, value = _param.value, onChange = _param.onChange, _param_calendarPlacement = _param.calendarPlacement, calendarPlacement = _param_calendarPlacement === void 0 ? "bottom-start" : _param_calendarPlacement, style = _param.style, className = _param.className, doneButtonText = _param.doneButtonText, _param_closeOnChange = _param.closeOnChange, closeOnChange = _param_closeOnChange === void 0 ? true : _param_closeOnChange, disablePickers = _param.disablePickers, getRootRef = _param.getRootRef, name = _param.name, autoFocus = _param.autoFocus, disabled = _param.disabled, onClick = _param.onClick, onFocus = _param.onFocus, prevMonthAriaLabel = _param.prevMonthAriaLabel, nextMonthAriaLabel = _param.nextMonthAriaLabel, showNeighboringMonth = _param.showNeighboringMonth, size = _param.size, _param_changeMonthAriaLabel = _param.changeMonthAriaLabel, changeMonthAriaLabel = _param_changeMonthAriaLabel === void 0 ? "Изменить месяц" : _param_changeMonthAriaLabel, _param_changeYearAriaLabel = _param.changeYearAriaLabel, changeYearAriaLabel = _param_changeYearAriaLabel === void 0 ? "Изменить год" : _param_changeYearAriaLabel, _param_changeDayAriaLabel = _param.changeDayAriaLabel, changeDayAriaLabel = _param_changeDayAriaLabel === void 0 ? "Изменить день" : _param_changeDayAriaLabel, _param_changeHoursAriaLabel = _param.changeHoursAriaLabel, changeHoursAriaLabel = _param_changeHoursAriaLabel === void 0 ? "Изменить час" : _param_changeHoursAriaLabel, _param_changeMinutesAriaLabel = _param.changeMinutesAriaLabel, changeMinutesAriaLabel = _param_changeMinutesAriaLabel === void 0 ? "Изменить минуту" : _param_changeMinutesAriaLabel, _param_clearFieldAriaLabel = _param.clearFieldAriaLabel, clearFieldAriaLabel = _param_clearFieldAriaLabel === void 0 ? "Очистить поле" : _param_clearFieldAriaLabel, _param_showCalendarAriaLabel = _param.showCalendarAriaLabel, showCalendarAriaLabel = _param_showCalendarAriaLabel === void 0 ? "Показать календарь" : _param_showCalendarAriaLabel, viewDate = _param.viewDate, onHeaderChange = _param.onHeaderChange, onNextMonth = _param.onNextMonth, onPrevMonth = _param.onPrevMonth, prevMonthIcon = _param.prevMonthIcon, nextMonthIcon = _param.nextMonthIcon, _param_disableCalendar = _param.disableCalendar, disableCalendar = _param_disableCalendar === void 0 ? false : _param_disableCalendar, props = _object_without_properties(_param, [
        "enableTime",
        "shouldDisableDate",
        "disableFuture",
        "disablePast",
        "value",
        "onChange",
        "calendarPlacement",
        "style",
        "className",
        "doneButtonText",
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
        "showNeighboringMonth",
        "size",
        "changeMonthAriaLabel",
        "changeYearAriaLabel",
        "changeDayAriaLabel",
        "changeHoursAriaLabel",
        "changeMinutesAriaLabel",
        "clearFieldAriaLabel",
        "showCalendarAriaLabel",
        "viewDate",
        "onHeaderChange",
        "onNextMonth",
        "onPrevMonth",
        "prevMonthIcon",
        "nextMonthIcon",
        "disableCalendar"
    ]);
    var daysRef = React.useRef(null);
    var monthsRef = React.useRef(null);
    var yearsRef = React.useRef(null);
    var hoursRef = React.useRef(null);
    var minutesRef = React.useRef(null);
    var maxElement = enableTime ? 4 : 2;
    var onInternalValueChange = React.useCallback(function(internalValue) {
        for(var i = 0; i <= maxElement; i += 1){
            if (internalValue[i].length < elementsConfig(i).length) {
                return;
            }
        }
        var formattedValue = "".concat(internalValue[0], ".").concat(internalValue[1], ".").concat(internalValue[2]);
        var mask = "DD.MM.YYYY";
        if (enableTime) {
            formattedValue += " ".concat(internalValue[3], ":").concat(internalValue[4]);
            mask += " HH:mm";
        }
        if (isMatch(formattedValue, mask)) {
            onChange === null || onChange === void 0 ? void 0 : onChange(parse(formattedValue, mask, value !== null && value !== void 0 ? value : new Date()));
        }
    }, [
        enableTime,
        maxElement,
        onChange,
        value
    ]);
    var refs = React.useMemo(function() {
        return [
            daysRef,
            monthsRef,
            yearsRef,
            hoursRef,
            minutesRef
        ];
    }, [
        daysRef,
        monthsRef,
        yearsRef,
        hoursRef,
        minutesRef
    ]);
    var _useDateInput = useDateInput({
        maxElement: maxElement,
        refs: refs,
        autoFocus: autoFocus,
        disabled: disabled,
        elementsConfig: elementsConfig,
        onChange: onChange,
        onInternalValueChange: onInternalValueChange,
        getInternalValue: getInternalValue,
        value: value
    }), rootRef = _useDateInput.rootRef, calendarRef = _useDateInput.calendarRef, open = _useDateInput.open, openCalendar = _useDateInput.openCalendar, internalValue = _useDateInput.internalValue, handleKeyDown = _useDateInput.handleKeyDown, setFocusedElement = _useDateInput.setFocusedElement, handleFieldEnter = _useDateInput.handleFieldEnter, clear = _useDateInput.clear, removeFocusFromField = _useDateInput.removeFocusFromField;
    var _useAdaptivity = useAdaptivity(), _useAdaptivity_sizeY = _useAdaptivity.sizeY, sizeY = _useAdaptivity_sizeY === void 0 ? "none" : _useAdaptivity_sizeY;
    var handleRootRef = useExternRef(rootRef, getRootRef);
    var onCalendarChange = React.useCallback(function(value) {
        onChange === null || onChange === void 0 ? void 0 : onChange(value);
        if (closeOnChange && !enableTime) {
            removeFocusFromField();
        }
    }, [
        onChange,
        removeFocusFromField,
        closeOnChange,
        enableTime
    ]);
    return /*#__PURE__*/ React.createElement(FormField, _object_spread({
        style: style,
        className: classNames(sizeY !== SizeType.REGULAR && sizeYClassNames[sizeY], className),
        getRootRef: handleRootRef,
        after: value ? /*#__PURE__*/ React.createElement(IconButton, {
            hoverMode: "opacity",
            "aria-label": clearFieldAriaLabel,
            onClick: clear
        }, /*#__PURE__*/ React.createElement(Icon16Clear, null)) : /*#__PURE__*/ React.createElement(IconButton, {
            hoverMode: "opacity",
            "aria-label": showCalendarAriaLabel,
            onClick: openCalendar
        }, /*#__PURE__*/ React.createElement(Icon20CalendarOutline, null)),
        disabled: disabled,
        onClick: callMultiple(handleFieldEnter, onClick),
        onFocus: callMultiple(handleFieldEnter, onFocus)
    }, props), /*#__PURE__*/ React.createElement("input", {
        type: "hidden",
        name: name,
        value: value ? format(value, enableTime ? "DD.MM.YYYYTHH:mm" : "DD.MM.YYYY") : ""
    }), /*#__PURE__*/ React.createElement(Text, {
        className: "vkuiDateInput__input",
        onKeyDown: handleKeyDown
    }, /*#__PURE__*/ React.createElement(InputLike, {
        length: 2,
        getRootRef: daysRef,
        index: 0,
        onElementSelect: setFocusedElement,
        value: internalValue[0],
        "aria-label": changeDayAriaLabel
    }), /*#__PURE__*/ React.createElement(InputLikeDivider, null, "."), /*#__PURE__*/ React.createElement(InputLike, {
        length: 2,
        getRootRef: monthsRef,
        index: 1,
        onElementSelect: setFocusedElement,
        value: internalValue[1],
        "aria-label": changeMonthAriaLabel
    }), /*#__PURE__*/ React.createElement(InputLikeDivider, null, "."), /*#__PURE__*/ React.createElement(InputLike, {
        length: 4,
        getRootRef: yearsRef,
        index: 2,
        onElementSelect: setFocusedElement,
        value: internalValue[2],
        "aria-label": changeYearAriaLabel
    }), enableTime && /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(InputLikeDivider, {
        className: "vkuiDateInput__input--time-divider"
    }, " "), /*#__PURE__*/ React.createElement(InputLike, {
        length: 2,
        getRootRef: hoursRef,
        index: 3,
        onElementSelect: setFocusedElement,
        value: internalValue[3],
        "aria-label": changeHoursAriaLabel
    }), /*#__PURE__*/ React.createElement(InputLikeDivider, null, ":"), /*#__PURE__*/ React.createElement(InputLike, {
        length: 2,
        getRootRef: minutesRef,
        index: 4,
        onElementSelect: setFocusedElement,
        value: internalValue[4],
        "aria-label": changeMinutesAriaLabel
    }))), open && !disableCalendar && /*#__PURE__*/ React.createElement(Popper, {
        targetRef: rootRef,
        offsetDistance: 8,
        placement: calendarPlacement,
        autoUpdateOnTargetResize: true
    }, /*#__PURE__*/ React.createElement(Calendar, {
        value: value,
        onChange: onCalendarChange,
        enableTime: enableTime,
        disablePast: disablePast,
        disableFuture: disableFuture,
        shouldDisableDate: shouldDisableDate,
        onClose: removeFocusFromField,
        getRootRef: calendarRef,
        doneButtonText: doneButtonText,
        disablePickers: disablePickers,
        changeHoursAriaLabel: changeHoursAriaLabel,
        changeMinutesAriaLabel: changeMinutesAriaLabel,
        prevMonthAriaLabel: prevMonthAriaLabel,
        nextMonthAriaLabel: nextMonthAriaLabel,
        changeMonthAriaLabel: changeMonthAriaLabel,
        changeYearAriaLabel: changeYearAriaLabel,
        changeDayAriaLabel: changeDayAriaLabel,
        showNeighboringMonth: showNeighboringMonth,
        size: size,
        viewDate: viewDate,
        onHeaderChange: onHeaderChange,
        onNextMonth: onNextMonth,
        onPrevMonth: onPrevMonth,
        prevMonthIcon: prevMonthIcon,
        nextMonthIcon: nextMonthIcon
    })));
};

//# sourceMappingURL=DateInput.js.map