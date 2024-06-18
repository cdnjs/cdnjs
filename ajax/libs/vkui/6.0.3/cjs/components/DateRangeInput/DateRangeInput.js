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
const _CalendarRange = require("../CalendarRange/CalendarRange");
const _FormField = require("../FormField/FormField");
const _IconButton = require("../IconButton/IconButton");
const _InputLike = require("../InputLike/InputLike");
const _InputLikeDivider = require("../InputLike/InputLikeDivider");
const _Popper = require("../Popper/Popper");
const _Text = require("../Typography/Text/Text");
const _VisuallyHidden = require("../VisuallyHidden/VisuallyHidden");
const sizeYClassNames = {
    none: "vkuiDateRangeInput--sizeY-none",
    ['compact']: "vkuiDateRangeInput--sizeY-compact"
};
const elementsConfig = (index)=>{
    let length = 2;
    let min = 1;
    let max = 0;
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
        '',
        ''
    ];
    if (value === null || value === void 0 ? void 0 : value[0]) {
        newValue[0] = String(value[0].getDate()).padStart(2, '0');
        newValue[1] = String(value[0].getMonth() + 1).padStart(2, '0');
        newValue[2] = String(value[0].getFullYear()).padStart(4, '0');
    }
    if (value === null || value === void 0 ? void 0 : value[1]) {
        newValue[3] = String(value[1].getDate()).padStart(2, '0');
        newValue[4] = String(value[1].getMonth() + 1).padStart(2, '0');
        newValue[5] = String(value[1].getFullYear()).padStart(4, '0');
    }
    return newValue;
};
const DateRangeInput = (_param)=>{
    var { shouldDisableDate, disableFuture, disablePast, value, onChange, calendarPlacement = 'bottom-start', style, className, closeOnChange = true, disablePickers, getRootRef, name, autoFocus, disabled, onClick, onFocus, prevMonthLabel = 'Предыдущий месяц', nextMonthLabel = 'Следующий месяц', changeDayLabel = 'Изменить день', changeMonthLabel = 'Изменить месяц', changeYearLabel = 'Изменить год', changeStartDayLabel = 'Изменить день начала', changeStartMonthLabel = 'Изменить месяц начала', changeStartYearLabel = 'Изменить год начала', changeEndDayLabel = 'Изменить день окончания', changeEndMonthLabel = 'Изменить месяц окончания', changeEndYearLabel = 'Изменить год окончания', clearFieldLabel = 'Очистить поле', showCalendarLabel = 'Показать календарь', prevMonthIcon, nextMonthIcon, disableCalendar = false } = _param, props = _object_without_properties._(_param, [
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
        "prevMonthLabel",
        "nextMonthLabel",
        "changeDayLabel",
        "changeMonthLabel",
        "changeYearLabel",
        "changeStartDayLabel",
        "changeStartMonthLabel",
        "changeStartYearLabel",
        "changeEndDayLabel",
        "changeEndMonthLabel",
        "changeEndYearLabel",
        "clearFieldLabel",
        "showCalendarLabel",
        "prevMonthIcon",
        "nextMonthIcon",
        "disableCalendar"
    ]);
    const daysStartRef = _react.useRef(null);
    const monthsStartRef = _react.useRef(null);
    const yearsStartRef = _react.useRef(null);
    const daysEndRef = _react.useRef(null);
    const monthsEndRef = _react.useRef(null);
    const yearsEndRef = _react.useRef(null);
    const onInternalValueChange = _react.useCallback((internalValue)=>{
        let isStartValid = true;
        let isEndValid = true;
        for(let i = 0; i <= 2; i += 1){
            if (internalValue[i].length < elementsConfig(i).length) {
                isStartValid = false;
            }
        }
        for(let i = 3; i <= 5; i += 1){
            if (internalValue[i].length < elementsConfig(i).length) {
                isEndValid = false;
            }
        }
        const formattedStartValue = `${internalValue[0]}.${internalValue[1]}.${internalValue[2]}`;
        const formattedEndValue = `${internalValue[3]}.${internalValue[4]}.${internalValue[5]}`;
        const mask = 'DD.MM.YYYY';
        if (!(0, _date.isMatch)(formattedStartValue, mask)) {
            isStartValid = false;
        }
        if (!(0, _date.isMatch)(formattedEndValue, mask)) {
            isEndValid = false;
        }
        if (!isStartValid && !isEndValid) {
            return;
        }
        const valueExists = Array.isArray(value);
        const now = new Date();
        const start = isStartValid ? (0, _date.parse)(formattedStartValue, mask, valueExists && (value === null || value === void 0 ? void 0 : value[0]) || now) : null;
        const end = isEndValid ? (0, _date.parse)(formattedEndValue, mask, valueExists && (value === null || value === void 0 ? void 0 : value[1]) || now) : null;
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
    const refs = _react.useMemo(()=>[
            daysStartRef,
            monthsStartRef,
            yearsStartRef,
            daysEndRef,
            monthsEndRef,
            yearsEndRef
        ], [
        daysStartRef,
        monthsStartRef,
        yearsStartRef,
        daysEndRef,
        monthsEndRef,
        yearsEndRef
    ]);
    const { rootRef, calendarRef, open, openCalendar, closeCalendar, internalValue, handleKeyDown, setFocusedElement, handleFieldEnter, clear, removeFocusFromField } = (0, _useDateInput.useDateInput)({
        maxElement: 5,
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
    const onCalendarChange = _react.useCallback((newValue)=>{
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
        className: (0, _vkjs.classNames)(sizeY !== 'regular' && sizeYClassNames[sizeY], className),
        getRootRef: handleRootRef,
        after: value ? /*#__PURE__*/ _react.createElement(_IconButton.IconButton, {
            hoverMode: "opacity",
            onClick: clear
        }, /*#__PURE__*/ _react.createElement(_VisuallyHidden.VisuallyHidden, null, clearFieldLabel), /*#__PURE__*/ _react.createElement(_icons.Icon16Clear, null)) : /*#__PURE__*/ _react.createElement(_IconButton.IconButton, {
            hoverMode: "opacity",
            onClick: openCalendar
        }, /*#__PURE__*/ _react.createElement(_VisuallyHidden.VisuallyHidden, null, showCalendarLabel), /*#__PURE__*/ _react.createElement(_icons.Icon20CalendarOutline, null)),
        disabled: disabled,
        onClick: (0, _callMultiple.callMultiple)(handleFieldEnter, onClick),
        onFocus: (0, _callMultiple.callMultiple)(handleFieldEnter, onFocus)
    }, props), /*#__PURE__*/ _react.createElement("input", {
        type: "hidden",
        name: name,
        value: value ? `${value[0] ? (0, _date.format)(value[0], 'DD.MM.YYYY') : ''} - ${value[1] ? (0, _date.format)(value[1], 'DD.MM.YYYY') : ''}` : ''
    }), /*#__PURE__*/ _react.createElement(_Text.Text, {
        className: "vkuiDateInput__input",
        onKeyDown: handleKeyDown
    }, /*#__PURE__*/ _react.createElement(_InputLike.InputLike, {
        length: 2,
        getRootRef: daysStartRef,
        index: 0,
        onElementSelect: setFocusedElement,
        value: internalValue[0],
        label: changeStartDayLabel
    }), /*#__PURE__*/ _react.createElement(_InputLikeDivider.InputLikeDivider, null, "."), /*#__PURE__*/ _react.createElement(_InputLike.InputLike, {
        length: 2,
        getRootRef: monthsStartRef,
        index: 1,
        onElementSelect: setFocusedElement,
        value: internalValue[1],
        label: changeStartMonthLabel
    }), /*#__PURE__*/ _react.createElement(_InputLikeDivider.InputLikeDivider, null, "."), /*#__PURE__*/ _react.createElement(_InputLike.InputLike, {
        length: 4,
        getRootRef: yearsStartRef,
        index: 2,
        onElementSelect: setFocusedElement,
        value: internalValue[2],
        label: changeStartYearLabel
    }), /*#__PURE__*/ _react.createElement(_InputLikeDivider.InputLikeDivider, null, ' — '), /*#__PURE__*/ _react.createElement(_InputLike.InputLike, {
        length: 2,
        getRootRef: daysEndRef,
        index: 3,
        onElementSelect: setFocusedElement,
        value: internalValue[3],
        label: changeEndDayLabel
    }), /*#__PURE__*/ _react.createElement(_InputLikeDivider.InputLikeDivider, null, "."), /*#__PURE__*/ _react.createElement(_InputLike.InputLike, {
        length: 2,
        getRootRef: monthsEndRef,
        index: 4,
        onElementSelect: setFocusedElement,
        value: internalValue[4],
        label: changeEndMonthLabel
    }), /*#__PURE__*/ _react.createElement(_InputLikeDivider.InputLikeDivider, null, "."), /*#__PURE__*/ _react.createElement(_InputLike.InputLike, {
        length: 4,
        getRootRef: yearsEndRef,
        index: 5,
        onElementSelect: setFocusedElement,
        value: internalValue[5],
        label: changeEndYearLabel
    })), open && !disableCalendar && /*#__PURE__*/ _react.createElement(_Popper.Popper, {
        targetRef: rootRef,
        offsetByMainAxis: 8,
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
        prevMonthLabel: prevMonthLabel,
        nextMonthLabel: nextMonthLabel,
        changeMonthLabel: changeMonthLabel,
        changeYearLabel: changeYearLabel,
        changeDayLabel: changeDayLabel,
        prevMonthIcon: prevMonthIcon,
        nextMonthIcon: nextMonthIcon
    })));
};

//# sourceMappingURL=DateRangeInput.js.map