"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CalendarHeader", {
    enumerable: true,
    get: function() {
        return CalendarHeader;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _icons = require("@vkontakte/icons");
var _vkjs = require("@vkontakte/vkjs");
var _adaptivity = require("../../lib/adaptivity");
var _calendar = require("../../lib/calendar");
var _date = require("../../lib/date");
var _AdaptivityProvider = require("../AdaptivityProvider/AdaptivityProvider");
var _ConfigProviderContext = require("../ConfigProvider/ConfigProviderContext");
var _CustomSelect = require("../CustomSelect/CustomSelect");
var _RootComponent = require("../RootComponent/RootComponent");
var _Tappable = require("../Tappable/Tappable");
var _Paragraph = require("../Typography/Paragraph/Paragraph");
var CalendarHeader = function(_param) {
    var viewDate = _param.viewDate, onChange = _param.onChange, _param_prevMonth = _param.prevMonth, prevMonth = _param_prevMonth === void 0 ? true : _param_prevMonth, _param_nextMonth = _param.nextMonth, nextMonth = _param_nextMonth === void 0 ? true : _param_nextMonth, _param_disablePickers = _param.disablePickers, disablePickers = _param_disablePickers === void 0 ? false : _param_disablePickers, onNextMonth = _param.onNextMonth, onPrevMonth = _param.onPrevMonth, _param_prevMonthProps = _param.prevMonthProps, prevMonthProps = _param_prevMonthProps === void 0 ? {} : _param_prevMonthProps, _param_nextMonthProps = _param.nextMonthProps, nextMonthProps = _param_nextMonthProps === void 0 ? {} : _param_nextMonthProps, _param_prevMonthAriaLabel = _param.prevMonthAriaLabel, prevMonthAriaLabel = _param_prevMonthAriaLabel === void 0 ? "Предыдущий месяц" : _param_prevMonthAriaLabel, _param_nextMonthAriaLabel = _param.nextMonthAriaLabel, nextMonthAriaLabel = _param_nextMonthAriaLabel === void 0 ? "Следующий месяц" : _param_nextMonthAriaLabel, _param_changeMonthAriaLabel = _param.changeMonthAriaLabel, changeMonthAriaLabel = _param_changeMonthAriaLabel === void 0 ? "Изменить месяц" : _param_changeMonthAriaLabel, _param_changeYearAriaLabel = _param.changeYearAriaLabel, changeYearAriaLabel = _param_changeYearAriaLabel === void 0 ? "Изменить год" : _param_changeYearAriaLabel, _param_prevMonthIcon = _param.prevMonthIcon, prevMonthIcon = _param_prevMonthIcon === void 0 ? /*#__PURE__*/ _react.createElement(_icons.Icon20ChevronLeftOutline, {
        className: "vkuiCalendarHeader__nav-icon--accent",
        width: 30,
        height: 30
    }) : _param_prevMonthIcon, _param_nextMonthIcon = _param.nextMonthIcon, nextMonthIcon = _param_nextMonthIcon === void 0 ? /*#__PURE__*/ _react.createElement(_icons.Icon20ChevronRightOutline, {
        className: "vkuiCalendarHeader__nav-icon--accent",
        width: 30,
        height: 30
    }) : _param_nextMonthIcon, restProps = _object_without_properties._(_param, [
        "viewDate",
        "onChange",
        "prevMonth",
        "nextMonth",
        "disablePickers",
        "onNextMonth",
        "onPrevMonth",
        "prevMonthProps",
        "nextMonthProps",
        "prevMonthAriaLabel",
        "nextMonthAriaLabel",
        "changeMonthAriaLabel",
        "changeYearAriaLabel",
        "prevMonthIcon",
        "nextMonthIcon"
    ]);
    var locale = (0, _ConfigProviderContext.useConfigProvider)().locale;
    var onMonthsChange = _react.useCallback(function(event) {
        return onChange((0, _date.setMonth)(viewDate, Number(event.target.value)));
    }, [
        onChange,
        viewDate
    ]);
    var onYearChange = _react.useCallback(function(event) {
        return onChange((0, _date.setYear)(viewDate, Number(event.target.value)));
    }, [
        onChange,
        viewDate
    ]);
    var months = _react.useMemo(function() {
        return (0, _calendar.getMonths)(locale).map(function(param) {
            var value = param.value, label = param.label;
            return {
                value: value,
                label: /*#__PURE__*/ _react.createElement("span", {
                    className: "vkuiCalendarHeader__month"
                }, label)
            };
        });
    }, [
        locale
    ]);
    var currentYear = viewDate.getFullYear();
    var years = _react.useMemo(function() {
        return (0, _calendar.getYears)(currentYear, 100);
    }, [
        currentYear
    ]);
    var formatter = new Intl.DateTimeFormat(locale, {
        year: "numeric",
        month: "long"
    });
    var prevMonthClassName = prevMonthProps.className, restPrevMonthProps = _object_without_properties._(prevMonthProps, [
        "className"
    ]);
    var nextMonthClassName = nextMonthProps.className, restNextMonthProps = _object_without_properties._(nextMonthProps, [
        "className"
    ]);
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread._({
        baseClassName: "vkuiCalendarHeader"
    }, restProps), prevMonth && /*#__PURE__*/ _react.createElement(_AdaptivityProvider.AdaptivityProvider, {
        sizeX: _adaptivity.SizeType.REGULAR
    }, /*#__PURE__*/ _react.createElement(_Tappable.Tappable, _object_spread._({
        className: (0, _vkjs.classNames)("vkuiCalendarHeader__nav-icon", "vkuiCalendarHeader__nav-icon-prev", prevMonthClassName),
        onClick: onPrevMonth,
        "aria-label": "".concat(prevMonthAriaLabel, ", ").concat(formatter.format((0, _date.subMonths)(viewDate, 1)))
    }, restPrevMonthProps), prevMonthIcon)), disablePickers ? /*#__PURE__*/ _react.createElement(_Paragraph.Paragraph, {
        className: (0, _vkjs.classNames)("vkuiCalendarHeader__pickers", "vkuiInternalCalendarHeader__pickers"),
        weight: "2"
    }, /*#__PURE__*/ _react.createElement("span", {
        className: "vkuiCalendarHeader__month"
    }, new Intl.DateTimeFormat(locale, {
        month: "long"
    }).format(viewDate)), "\xa0", new Intl.DateTimeFormat(locale, {
        year: "numeric"
    }).format(viewDate)) : /*#__PURE__*/ _react.createElement(_AdaptivityProvider.AdaptivityProvider, {
        sizeY: _adaptivity.SizeType.COMPACT
    }, /*#__PURE__*/ _react.createElement("div", {
        className: (0, _vkjs.classNames)("vkuiCalendarHeader__pickers", "vkuiInternalCalendarHeader__pickers")
    }, /*#__PURE__*/ _react.createElement(_CustomSelect.CustomSelect, {
        className: (0, _vkjs.classNames)("vkuiCalendarHeader__picker", "vkuiInternalCalendarHeader__picker"),
        value: viewDate.getMonth(),
        options: months,
        dropdownOffsetDistance: 4,
        fixDropdownWidth: false,
        icon: /*#__PURE__*/ _react.createElement(_icons.Icon12Dropdown, null),
        onChange: onMonthsChange,
        forceDropdownPortal: false,
        selectType: "accent",
        "aria-label": changeMonthAriaLabel
    }), /*#__PURE__*/ _react.createElement(_CustomSelect.CustomSelect, {
        className: (0, _vkjs.classNames)("vkuiCalendarHeader__picker", "vkuiInternalCalendarHeader__picker"),
        value: viewDate.getFullYear(),
        options: years,
        dropdownOffsetDistance: 4,
        fixDropdownWidth: false,
        icon: /*#__PURE__*/ _react.createElement(_icons.Icon12Dropdown, null),
        onChange: onYearChange,
        forceDropdownPortal: false,
        selectType: "accent",
        "aria-label": changeYearAriaLabel
    }))), nextMonth && /*#__PURE__*/ _react.createElement(_AdaptivityProvider.AdaptivityProvider, {
        sizeX: _adaptivity.SizeType.REGULAR
    }, /*#__PURE__*/ _react.createElement(_Tappable.Tappable, _object_spread._({
        className: (0, _vkjs.classNames)("vkuiCalendarHeader__nav-icon", "vkuiCalendarHeader__nav-icon-next", nextMonthClassName),
        onClick: onNextMonth,
        "aria-label": "".concat(nextMonthAriaLabel, ", ").concat(formatter.format((0, _date.addMonths)(viewDate, 1)))
    }, restNextMonthProps), nextMonthIcon)));
};

//# sourceMappingURL=CalendarHeader.js.map