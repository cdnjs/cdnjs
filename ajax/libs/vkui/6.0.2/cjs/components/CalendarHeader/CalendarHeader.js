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
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _icons = require("@vkontakte/icons");
const _vkjs = require("@vkontakte/vkjs");
const _calendar = require("../../lib/calendar");
const _date = require("../../lib/date");
const _AdaptivityProvider = require("../AdaptivityProvider/AdaptivityProvider");
const _ConfigProviderContext = require("../ConfigProvider/ConfigProviderContext");
const _CustomSelect = require("../CustomSelect/CustomSelect");
const _RootComponent = require("../RootComponent/RootComponent");
const _Tappable = require("../Tappable/Tappable");
const _Paragraph = require("../Typography/Paragraph/Paragraph");
const _VisuallyHidden = require("../VisuallyHidden/VisuallyHidden");
const CalendarHeader = (_param)=>{
    var { viewDate, onChange, prevMonthHidden = false, nextMonthHidden = false, disablePickers = false, onNextMonth, onPrevMonth, prevMonthProps = {}, nextMonthProps = {}, prevMonthLabel = 'Предыдущий месяц', nextMonthLabel = 'Следующий месяц', changeMonthLabel = 'Изменить месяц', changeYearLabel = 'Изменить год', prevMonthIcon = /*#__PURE__*/ _react.createElement(_icons.Icon20ChevronLeftOutline, {
        className: "vkuiCalendarHeader__nav-icon--accent",
        width: 30,
        height: 30
    }), nextMonthIcon = /*#__PURE__*/ _react.createElement(_icons.Icon20ChevronRightOutline, {
        className: "vkuiCalendarHeader__nav-icon--accent",
        width: 30,
        height: 30
    }) } = _param, restProps = _object_without_properties._(_param, [
        "viewDate",
        "onChange",
        "prevMonthHidden",
        "nextMonthHidden",
        "disablePickers",
        "onNextMonth",
        "onPrevMonth",
        "prevMonthProps",
        "nextMonthProps",
        "prevMonthLabel",
        "nextMonthLabel",
        "changeMonthLabel",
        "changeYearLabel",
        "prevMonthIcon",
        "nextMonthIcon"
    ]);
    const { locale } = (0, _ConfigProviderContext.useConfigProvider)();
    const onMonthsChange = _react.useCallback((event)=>onChange((0, _date.setMonth)(viewDate, Number(event.target.value))), [
        onChange,
        viewDate
    ]);
    const onYearChange = _react.useCallback((event)=>onChange((0, _date.setYear)(viewDate, Number(event.target.value))), [
        onChange,
        viewDate
    ]);
    const months = _react.useMemo(()=>(0, _calendar.getMonths)(locale).map(({ value, label })=>({
                value,
                label: /*#__PURE__*/ _react.createElement("span", {
                    className: "vkuiCalendarHeader__month"
                }, label)
            })), [
        locale
    ]);
    const currentYear = viewDate.getFullYear();
    const years = _react.useMemo(()=>(0, _calendar.getYears)(currentYear, 100), [
        currentYear
    ]);
    const formatter = new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'long'
    });
    const { className: prevMonthClassName } = prevMonthProps, restPrevMonthProps = _object_without_properties._(prevMonthProps, [
        "className"
    ]);
    const { className: nextMonthClassName } = nextMonthProps, restNextMonthProps = _object_without_properties._(nextMonthProps, [
        "className"
    ]);
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread._({
        baseClassName: "vkuiCalendarHeader"
    }, restProps), !prevMonthHidden && /*#__PURE__*/ _react.createElement(_AdaptivityProvider.AdaptivityProvider, {
        sizeX: "regular"
    }, /*#__PURE__*/ _react.createElement(_Tappable.Tappable, _object_spread._({
        className: (0, _vkjs.classNames)("vkuiCalendarHeader__nav-icon", "vkuiCalendarHeader__nav-icon-prev", prevMonthClassName),
        onClick: onPrevMonth
    }, restPrevMonthProps), /*#__PURE__*/ _react.createElement(_VisuallyHidden.VisuallyHidden, null, prevMonthLabel, ", ", formatter.format((0, _date.subMonths)(viewDate, 1))), prevMonthIcon)), disablePickers ? /*#__PURE__*/ _react.createElement(_Paragraph.Paragraph, {
        className: (0, _vkjs.classNames)("vkuiCalendarHeader__pickers", 'vkuiInternalCalendarHeader__pickers'),
        weight: "2"
    }, /*#__PURE__*/ _react.createElement("span", {
        className: "vkuiCalendarHeader__month"
    }, new Intl.DateTimeFormat(locale, {
        month: 'long'
    }).format(viewDate)), " ", new Intl.DateTimeFormat(locale, {
        year: 'numeric'
    }).format(viewDate)) : /*#__PURE__*/ _react.createElement(_AdaptivityProvider.AdaptivityProvider, {
        sizeY: "compact"
    }, /*#__PURE__*/ _react.createElement("div", {
        className: (0, _vkjs.classNames)("vkuiCalendarHeader__pickers", 'vkuiInternalCalendarHeader__pickers')
    }, /*#__PURE__*/ _react.createElement(_CustomSelect.CustomSelect, {
        className: (0, _vkjs.classNames)("vkuiCalendarHeader__picker", 'vkuiInternalCalendarHeader__picker'),
        value: viewDate.getMonth(),
        options: months,
        dropdownOffsetDistance: 4,
        dropdownAutoWidth: true,
        icon: /*#__PURE__*/ _react.createElement(_icons.Icon12Dropdown, null),
        onChange: onMonthsChange,
        forceDropdownPortal: false,
        selectType: "accent",
        "aria-label": changeMonthLabel
    }), /*#__PURE__*/ _react.createElement(_CustomSelect.CustomSelect, {
        className: (0, _vkjs.classNames)("vkuiCalendarHeader__picker", 'vkuiInternalCalendarHeader__picker'),
        value: viewDate.getFullYear(),
        options: years,
        dropdownOffsetDistance: 4,
        dropdownAutoWidth: true,
        icon: /*#__PURE__*/ _react.createElement(_icons.Icon12Dropdown, null),
        onChange: onYearChange,
        forceDropdownPortal: false,
        selectType: "accent",
        "aria-label": changeYearLabel
    }))), !nextMonthHidden && /*#__PURE__*/ _react.createElement(_AdaptivityProvider.AdaptivityProvider, {
        sizeX: "regular"
    }, /*#__PURE__*/ _react.createElement(_Tappable.Tappable, _object_spread._({
        className: (0, _vkjs.classNames)("vkuiCalendarHeader__nav-icon", "vkuiCalendarHeader__nav-icon-next", nextMonthClassName),
        onClick: onNextMonth
    }, restNextMonthProps), /*#__PURE__*/ _react.createElement(_VisuallyHidden.VisuallyHidden, null, nextMonthLabel, ", ", formatter.format((0, _date.addMonths)(viewDate, 1))), nextMonthIcon)));
};

//# sourceMappingURL=CalendarHeader.js.map