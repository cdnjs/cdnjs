"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DateInput", {
    enumerable: true,
    get: function() {
        return DateInput;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _icons = require("@vkontakte/icons");
const _vkjs = require("@vkontakte/vkjs");
const _useAdaptivity = require("../../hooks/useAdaptivity");
const _useDateInput = require("../../hooks/useDateInput");
const _useExternRef = require("../../hooks/useExternRef");
const _callMultiple = require("../../lib/callMultiple");
const _date = require("../../lib/date");
const _Calendar = require("../Calendar/Calendar");
const _FormField = require("../FormField/FormField");
const _IconButton = require("../IconButton/IconButton");
const _InputLike = require("../InputLike/InputLike");
const _InputLikeDivider = require("../InputLike/InputLikeDivider");
const _Popper = require("../Popper/Popper");
const _Text = require("../Typography/Text/Text");
const sizeYClassNames = {
    none: "vkuiDateInput--sizeY-none",
    ['compact']: "vkuiDateInput--sizeY-compact"
};
const elementsConfig = (index)=>{
    let length = 2;
    let min = 1;
    let max = 0;
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
        length,
        min,
        max
    };
};
const getInternalValue = (value)=>{
    const newValue = [
        '',
        '',
        '',
        '',
        ''
    ];
    if (value) {
        newValue[0] = String(value.getDate()).padStart(2, '0');
        newValue[1] = String(value.getMonth() + 1).padStart(2, '0');
        newValue[2] = String(value.getFullYear()).padStart(4, '0');
        newValue[3] = String(value.getHours()).padStart(2, '0');
        newValue[4] = String(value.getMinutes()).padStart(2, '0');
    }
    return newValue;
};
const DateInput = (_param)=>{
    var { enableTime, shouldDisableDate, disableFuture, disablePast, minDateTime, maxDateTime, value, onChange, calendarPlacement = 'bottom-start', style, className, doneButtonText, closeOnChange = true, disablePickers, getRootRef, name, autoFocus, disabled, onClick, onFocus, prevMonthLabel = 'Предыдущий месяц', nextMonthLabel = 'Следующий месяц', showNeighboringMonth, size, changeMonthLabel = 'Изменить месяц', changeYearLabel = 'Изменить год', changeDayLabel = 'Изменить день', changeHoursLabel = 'Изменить час', changeMinutesLabel = 'Изменить минуту', clearFieldLabel = 'Очистить поле', showCalendarLabel = 'Показать календарь', viewDate, onHeaderChange, onNextMonth, onPrevMonth, prevMonthIcon, nextMonthIcon, disableCalendar = false } = _param, props = _object_without_properties._(_param, [
        "enableTime",
        "shouldDisableDate",
        "disableFuture",
        "disablePast",
        "minDateTime",
        "maxDateTime",
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
        "prevMonthLabel",
        "nextMonthLabel",
        "showNeighboringMonth",
        "size",
        "changeMonthLabel",
        "changeYearLabel",
        "changeDayLabel",
        "changeHoursLabel",
        "changeMinutesLabel",
        "clearFieldLabel",
        "showCalendarLabel",
        "viewDate",
        "onHeaderChange",
        "onNextMonth",
        "onPrevMonth",
        "prevMonthIcon",
        "nextMonthIcon",
        "disableCalendar"
    ]);
    const daysRef = _react.useRef(null);
    const monthsRef = _react.useRef(null);
    const yearsRef = _react.useRef(null);
    const hoursRef = _react.useRef(null);
    const minutesRef = _react.useRef(null);
    const maxElement = enableTime ? 4 : 2;
    const onInternalValueChange = _react.useCallback((internalValue)=>{
        for(let i = 0; i <= maxElement; i += 1){
            if (internalValue[i].length < elementsConfig(i).length) {
                return;
            }
        }
        let formattedValue = `${internalValue[0]}.${internalValue[1]}.${internalValue[2]}`;
        let mask = 'DD.MM.YYYY';
        if (enableTime) {
            formattedValue += ` ${internalValue[3]}:${internalValue[4]}`;
            mask += ' HH:mm';
        }
        if ((0, _date.isMatch)(formattedValue, mask)) {
            onChange === null || onChange === void 0 ? void 0 : onChange((0, _date.parse)(formattedValue, mask, value !== null && value !== void 0 ? value : new Date()));
        }
    }, [
        enableTime,
        maxElement,
        onChange,
        value
    ]);
    const refs = _react.useMemo(()=>[
            daysRef,
            monthsRef,
            yearsRef,
            hoursRef,
            minutesRef
        ], [
        daysRef,
        monthsRef,
        yearsRef,
        hoursRef,
        minutesRef
    ]);
    const { rootRef, calendarRef, open, openCalendar, internalValue, handleKeyDown, setFocusedElement, handleFieldEnter, clear, removeFocusFromField } = (0, _useDateInput.useDateInput)({
        maxElement,
        refs,
        autoFocus,
        disabled,
        elementsConfig,
        onChange,
        onInternalValueChange,
        getInternalValue,
        value
    });
    const { sizeY = 'none' } = (0, _useAdaptivity.useAdaptivity)();
    const handleRootRef = (0, _useExternRef.useExternRef)(rootRef, getRootRef);
    const onCalendarChange = _react.useCallback((value)=>{
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
    return /*#__PURE__*/ _react.createElement(_FormField.FormField, _object_spread._({
        style: style,
        className: (0, _vkjs.classNames)(sizeY !== 'regular' && sizeYClassNames[sizeY], className),
        getRootRef: handleRootRef,
        after: value ? /*#__PURE__*/ _react.createElement(_IconButton.IconButton, {
            hoverMode: "opacity",
            label: clearFieldLabel,
            onClick: clear
        }, /*#__PURE__*/ _react.createElement(_icons.Icon16Clear, null)) : /*#__PURE__*/ _react.createElement(_IconButton.IconButton, {
            hoverMode: "opacity",
            label: showCalendarLabel,
            onClick: openCalendar
        }, /*#__PURE__*/ _react.createElement(_icons.Icon20CalendarOutline, null)),
        disabled: disabled,
        onClick: (0, _callMultiple.callMultiple)(handleFieldEnter, onClick),
        onFocus: (0, _callMultiple.callMultiple)(handleFieldEnter, onFocus)
    }, props), /*#__PURE__*/ _react.createElement("input", {
        type: "hidden",
        name: name,
        value: value ? (0, _date.format)(value, enableTime ? 'DD.MM.YYYYTHH:mm' : 'DD.MM.YYYY') : ''
    }), /*#__PURE__*/ _react.createElement(_Text.Text, {
        className: "vkuiDateInput__input",
        onKeyDown: handleKeyDown
    }, /*#__PURE__*/ _react.createElement(_InputLike.InputLike, {
        length: 2,
        getRootRef: daysRef,
        index: 0,
        onElementSelect: setFocusedElement,
        value: internalValue[0],
        label: changeDayLabel
    }), /*#__PURE__*/ _react.createElement(_InputLikeDivider.InputLikeDivider, null, "."), /*#__PURE__*/ _react.createElement(_InputLike.InputLike, {
        length: 2,
        getRootRef: monthsRef,
        index: 1,
        onElementSelect: setFocusedElement,
        value: internalValue[1],
        label: changeMonthLabel
    }), /*#__PURE__*/ _react.createElement(_InputLikeDivider.InputLikeDivider, null, "."), /*#__PURE__*/ _react.createElement(_InputLike.InputLike, {
        length: 4,
        getRootRef: yearsRef,
        index: 2,
        onElementSelect: setFocusedElement,
        value: internalValue[2],
        label: changeYearLabel
    }), enableTime && /*#__PURE__*/ _react.createElement(_react.Fragment, null, /*#__PURE__*/ _react.createElement(_InputLikeDivider.InputLikeDivider, {
        className: "vkuiDateInput__input--time-divider"
    }, ' '), /*#__PURE__*/ _react.createElement(_InputLike.InputLike, {
        length: 2,
        getRootRef: hoursRef,
        index: 3,
        onElementSelect: setFocusedElement,
        value: internalValue[3],
        label: changeHoursLabel
    }), /*#__PURE__*/ _react.createElement(_InputLikeDivider.InputLikeDivider, null, ":"), /*#__PURE__*/ _react.createElement(_InputLike.InputLike, {
        length: 2,
        getRootRef: minutesRef,
        index: 4,
        onElementSelect: setFocusedElement,
        value: internalValue[4],
        label: changeMinutesLabel
    }))), open && !disableCalendar && /*#__PURE__*/ _react.createElement(_Popper.Popper, {
        targetRef: rootRef,
        offsetByMainAxis: 8,
        placement: calendarPlacement,
        autoUpdateOnTargetResize: true
    }, /*#__PURE__*/ _react.createElement(_Calendar.Calendar, {
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
        changeHoursLabel: changeHoursLabel,
        changeMinutesLabel: changeMinutesLabel,
        prevMonthLabel: prevMonthLabel,
        nextMonthLabel: nextMonthLabel,
        changeMonthLabel: changeMonthLabel,
        changeYearLabel: changeYearLabel,
        changeDayLabel: changeDayLabel,
        showNeighboringMonth: showNeighboringMonth,
        size: size,
        viewDate: viewDate,
        onHeaderChange: onHeaderChange,
        onNextMonth: onNextMonth,
        onPrevMonth: onPrevMonth,
        prevMonthIcon: prevMonthIcon,
        nextMonthIcon: nextMonthIcon,
        minDateTime: minDateTime,
        maxDateTime: maxDateTime
    })));
};

//# sourceMappingURL=DateInput.js.map