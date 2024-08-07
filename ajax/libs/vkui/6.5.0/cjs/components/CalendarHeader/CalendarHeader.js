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
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _icons = require("@vkontakte/icons");
const _vkjs = require("@vkontakte/vkjs");
const _datefns = require("date-fns");
const _calendar = require("../../lib/calendar");
const _AdaptivityProvider = require("../AdaptivityProvider/AdaptivityProvider");
const _ConfigProviderContext = require("../ConfigProvider/ConfigProviderContext");
const _CustomSelect = require("../CustomSelect/CustomSelect");
const _RootComponent = require("../RootComponent/RootComponent");
const _Tappable = require("../Tappable/Tappable");
const _Paragraph = require("../Typography/Paragraph/Paragraph");
const _VisuallyHidden = require("../VisuallyHidden/VisuallyHidden");
const CalendarHeader = (_param)=>{
    var { viewDate, onChange, prevMonthHidden: prevMonthHiddenProp = false, nextMonthHidden: nextMonthHiddenProp = false, disablePickers = false, onNextMonth, onPrevMonth, prevMonthProps = {}, nextMonthProps = {}, prevMonthLabel = 'Предыдущий месяц', nextMonthLabel = 'Следующий месяц', changeMonthLabel = 'Изменить месяц', changeYearLabel = 'Изменить год', prevMonthIcon = /*#__PURE__*/ (0, _jsxruntime.jsx)(_icons.Icon20ChevronLeftOutline, {
        className: "vkuiCalendarHeader__nav-icon--accent",
        width: 30,
        height: 30
    }), nextMonthIcon = /*#__PURE__*/ (0, _jsxruntime.jsx)(_icons.Icon20ChevronRightOutline, {
        className: "vkuiCalendarHeader__nav-icon--accent",
        width: 30,
        height: 30
    }), isMonthDisabled, isYearDisabled } = _param, restProps = _object_without_properties._(_param, [
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
        "nextMonthIcon",
        "isMonthDisabled",
        "isYearDisabled"
    ]);
    const { locale } = (0, _ConfigProviderContext.useConfigProvider)();
    const onMonthsChange = _react.useCallback((event)=>onChange((0, _datefns.setMonth)(viewDate, Number(event.target.value))), [
        onChange,
        viewDate
    ]);
    const onYearChange = _react.useCallback((event)=>onChange((0, _datefns.setYear)(viewDate, Number(event.target.value))), [
        onChange,
        viewDate
    ]);
    const currentYear = viewDate.getFullYear();
    const currentMonth = viewDate.getMonth();
    const months = _react.useMemo(()=>(0, _calendar.getMonths)(locale).map(({ value, label })=>({
                value,
                label: /*#__PURE__*/ (0, _jsxruntime.jsx)("span", {
                    className: "vkuiCalendarHeader__month",
                    children: label
                }),
                disabled: isMonthDisabled && isMonthDisabled(value)
            })), [
        locale,
        isMonthDisabled
    ]);
    const years = _react.useMemo(()=>(0, _calendar.getYears)(currentYear, 100).map((year)=>_object_spread_props._(_object_spread._({}, year), {
                disabled: isYearDisabled && isYearDisabled(year.value)
            })), [
        currentYear,
        isYearDisabled
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
    let nextMonthHidden = nextMonthHiddenProp || currentMonth === 11 && currentYear === _calendar.DEFAULT_MAX_YEAR;
    if (isMonthDisabled && !nextMonthHidden) {
        nextMonthHidden = isMonthDisabled(currentMonth === 11 ? 0 : currentMonth + 1, currentMonth === 11 ? Math.min(currentYear + 1, _calendar.DEFAULT_MAX_YEAR) : currentYear);
    }
    let prevMonthHidden = prevMonthHiddenProp || currentMonth === 0 && currentYear === _calendar.DEFAULT_MIN_YEAR;
    if (isMonthDisabled && !prevMonthHidden) {
        prevMonthHidden = isMonthDisabled(currentMonth === 0 ? 11 : currentMonth - 1, currentMonth === 0 ? Math.max(currentYear - 1, _calendar.DEFAULT_MIN_YEAR) : currentYear);
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({
        baseClassName: "vkuiCalendarHeader"
    }, restProps), {
        children: [
            !prevMonthHidden && /*#__PURE__*/ (0, _jsxruntime.jsx)(_AdaptivityProvider.AdaptivityProvider, {
                sizeX: "regular",
                children: /*#__PURE__*/ (0, _jsxruntime.jsxs)(_Tappable.Tappable, _object_spread_props._(_object_spread._({
                    className: (0, _vkjs.classNames)("vkuiCalendarHeader__nav-icon", "vkuiCalendarHeader__nav-icon-prev", prevMonthClassName),
                    onClick: onPrevMonth
                }, restPrevMonthProps), {
                    children: [
                        /*#__PURE__*/ (0, _jsxruntime.jsxs)(_VisuallyHidden.VisuallyHidden, {
                            children: [
                                prevMonthLabel,
                                ", ",
                                formatter.format((0, _datefns.subMonths)(viewDate, 1))
                            ]
                        }),
                        prevMonthIcon
                    ]
                }))
            }),
            disablePickers ? /*#__PURE__*/ (0, _jsxruntime.jsxs)(_Paragraph.Paragraph, {
                className: (0, _vkjs.classNames)("vkuiCalendarHeader__pickers", 'vkuiInternalCalendarHeader__pickers'),
                weight: "2",
                children: [
                    /*#__PURE__*/ (0, _jsxruntime.jsx)("span", {
                        className: "vkuiCalendarHeader__month",
                        children: new Intl.DateTimeFormat(locale, {
                            month: 'long'
                        }).format(viewDate)
                    }),
                    " ",
                    new Intl.DateTimeFormat(locale, {
                        year: 'numeric'
                    }).format(viewDate)
                ]
            }) : /*#__PURE__*/ (0, _jsxruntime.jsx)(_AdaptivityProvider.AdaptivityProvider, {
                sizeY: "compact",
                children: /*#__PURE__*/ (0, _jsxruntime.jsxs)("div", {
                    className: (0, _vkjs.classNames)("vkuiCalendarHeader__pickers", 'vkuiInternalCalendarHeader__pickers'),
                    children: [
                        /*#__PURE__*/ (0, _jsxruntime.jsx)(_CustomSelect.CustomSelect, {
                            className: (0, _vkjs.classNames)("vkuiCalendarHeader__picker", 'vkuiInternalCalendarHeader__picker'),
                            value: currentMonth,
                            options: months,
                            dropdownOffsetDistance: 4,
                            dropdownAutoWidth: true,
                            icon: /*#__PURE__*/ (0, _jsxruntime.jsx)(_icons.Icon12Dropdown, {}),
                            onChange: onMonthsChange,
                            forceDropdownPortal: false,
                            selectType: "accent",
                            "aria-label": changeMonthLabel
                        }),
                        /*#__PURE__*/ (0, _jsxruntime.jsx)(_CustomSelect.CustomSelect, {
                            className: (0, _vkjs.classNames)("vkuiCalendarHeader__picker", 'vkuiInternalCalendarHeader__picker'),
                            value: currentYear,
                            options: years,
                            dropdownOffsetDistance: 4,
                            dropdownAutoWidth: true,
                            icon: /*#__PURE__*/ (0, _jsxruntime.jsx)(_icons.Icon12Dropdown, {}),
                            onChange: onYearChange,
                            forceDropdownPortal: false,
                            selectType: "accent",
                            "aria-label": changeYearLabel
                        })
                    ]
                })
            }),
            !nextMonthHidden && /*#__PURE__*/ (0, _jsxruntime.jsx)(_AdaptivityProvider.AdaptivityProvider, {
                sizeX: "regular",
                children: /*#__PURE__*/ (0, _jsxruntime.jsxs)(_Tappable.Tappable, _object_spread_props._(_object_spread._({
                    className: (0, _vkjs.classNames)("vkuiCalendarHeader__nav-icon", "vkuiCalendarHeader__nav-icon-next", nextMonthClassName),
                    onClick: onNextMonth
                }, restNextMonthProps), {
                    children: [
                        /*#__PURE__*/ (0, _jsxruntime.jsxs)(_VisuallyHidden.VisuallyHidden, {
                            children: [
                                nextMonthLabel,
                                ", ",
                                formatter.format((0, _datefns.addMonths)(viewDate, 1))
                            ]
                        }),
                        nextMonthIcon
                    ]
                }))
            })
        ]
    }));
};

//# sourceMappingURL=CalendarHeader.js.map