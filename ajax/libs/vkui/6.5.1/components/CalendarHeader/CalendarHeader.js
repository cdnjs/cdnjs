import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { Icon12Dropdown, Icon20ChevronLeftOutline, Icon20ChevronRightOutline } from '@vkontakte/icons';
import { classNames } from '@vkontakte/vkjs';
import { addMonths, setMonth, setYear, subMonths } from 'date-fns';
import { DEFAULT_MAX_YEAR, DEFAULT_MIN_YEAR, getMonths, getYears } from '../../lib/calendar';
import { AdaptivityProvider } from '../AdaptivityProvider/AdaptivityProvider';
import { useConfigProvider } from '../ConfigProvider/ConfigProviderContext';
import { CustomSelect } from '../CustomSelect/CustomSelect';
import { RootComponent } from '../RootComponent/RootComponent';
import { Tappable } from '../Tappable/Tappable';
import { Paragraph } from '../Typography/Paragraph/Paragraph';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
export const CalendarHeader = (_param)=>{
    var { viewDate, onChange, prevMonthHidden: prevMonthHiddenProp = false, nextMonthHidden: nextMonthHiddenProp = false, disablePickers = false, onNextMonth, onPrevMonth, prevMonthProps = {}, nextMonthProps = {}, prevMonthLabel = 'Предыдущий месяц', nextMonthLabel = 'Следующий месяц', changeMonthLabel = 'Изменить месяц', changeYearLabel = 'Изменить год', prevMonthIcon = /*#__PURE__*/ _jsx(Icon20ChevronLeftOutline, {
        className: "vkuiCalendarHeader__nav-icon--accent",
        width: 30,
        height: 30
    }), nextMonthIcon = /*#__PURE__*/ _jsx(Icon20ChevronRightOutline, {
        className: "vkuiCalendarHeader__nav-icon--accent",
        width: 30,
        height: 30
    }), isMonthDisabled, isYearDisabled } = _param, restProps = _object_without_properties(_param, [
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
    const { locale } = useConfigProvider();
    const onMonthsChange = React.useCallback((event)=>onChange(setMonth(viewDate, Number(event.target.value))), [
        onChange,
        viewDate
    ]);
    const onYearChange = React.useCallback((event)=>onChange(setYear(viewDate, Number(event.target.value))), [
        onChange,
        viewDate
    ]);
    const currentYear = viewDate.getFullYear();
    const currentMonth = viewDate.getMonth();
    const months = React.useMemo(()=>getMonths(locale).map(({ value, label })=>({
                value,
                label: /*#__PURE__*/ _jsx("span", {
                    className: "vkuiCalendarHeader__month",
                    children: label
                }),
                disabled: isMonthDisabled && isMonthDisabled(value)
            })), [
        locale,
        isMonthDisabled
    ]);
    const years = React.useMemo(()=>getYears(currentYear, 100).map((year)=>_object_spread_props(_object_spread({}, year), {
                disabled: isYearDisabled && isYearDisabled(year.value)
            })), [
        currentYear,
        isYearDisabled
    ]);
    const formatter = new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'long'
    });
    const { className: prevMonthClassName } = prevMonthProps, restPrevMonthProps = _object_without_properties(prevMonthProps, [
        "className"
    ]);
    const { className: nextMonthClassName } = nextMonthProps, restNextMonthProps = _object_without_properties(nextMonthProps, [
        "className"
    ]);
    let nextMonthHidden = nextMonthHiddenProp || currentMonth === 11 && currentYear === DEFAULT_MAX_YEAR;
    if (isMonthDisabled && !nextMonthHidden) {
        nextMonthHidden = isMonthDisabled(currentMonth === 11 ? 0 : currentMonth + 1, currentMonth === 11 ? Math.min(currentYear + 1, DEFAULT_MAX_YEAR) : currentYear);
    }
    let prevMonthHidden = prevMonthHiddenProp || currentMonth === 0 && currentYear === DEFAULT_MIN_YEAR;
    if (isMonthDisabled && !prevMonthHidden) {
        prevMonthHidden = isMonthDisabled(currentMonth === 0 ? 11 : currentMonth - 1, currentMonth === 0 ? Math.max(currentYear - 1, DEFAULT_MIN_YEAR) : currentYear);
    }
    return /*#__PURE__*/ _jsxs(RootComponent, _object_spread_props(_object_spread({
        baseClassName: "vkuiCalendarHeader"
    }, restProps), {
        children: [
            !prevMonthHidden && /*#__PURE__*/ _jsx(AdaptivityProvider, {
                sizeX: "regular",
                children: /*#__PURE__*/ _jsxs(Tappable, _object_spread_props(_object_spread({
                    className: classNames("vkuiCalendarHeader__nav-icon", "vkuiCalendarHeader__nav-icon-prev", prevMonthClassName),
                    onClick: onPrevMonth
                }, restPrevMonthProps), {
                    children: [
                        /*#__PURE__*/ _jsxs(VisuallyHidden, {
                            children: [
                                prevMonthLabel,
                                ", ",
                                formatter.format(subMonths(viewDate, 1))
                            ]
                        }),
                        prevMonthIcon
                    ]
                }))
            }),
            disablePickers ? /*#__PURE__*/ _jsxs(Paragraph, {
                className: classNames("vkuiCalendarHeader__pickers", 'vkuiInternalCalendarHeader__pickers'),
                weight: "2",
                children: [
                    /*#__PURE__*/ _jsx("span", {
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
            }) : /*#__PURE__*/ _jsx(AdaptivityProvider, {
                sizeY: "compact",
                children: /*#__PURE__*/ _jsxs("div", {
                    className: classNames("vkuiCalendarHeader__pickers", 'vkuiInternalCalendarHeader__pickers'),
                    children: [
                        /*#__PURE__*/ _jsx(CustomSelect, {
                            className: classNames("vkuiCalendarHeader__picker", 'vkuiInternalCalendarHeader__picker'),
                            value: currentMonth,
                            options: months,
                            dropdownOffsetDistance: 4,
                            dropdownAutoWidth: true,
                            icon: /*#__PURE__*/ _jsx(Icon12Dropdown, {}),
                            onChange: onMonthsChange,
                            forceDropdownPortal: false,
                            selectType: "accent",
                            "aria-label": changeMonthLabel
                        }),
                        /*#__PURE__*/ _jsx(CustomSelect, {
                            className: classNames("vkuiCalendarHeader__picker", 'vkuiInternalCalendarHeader__picker'),
                            value: currentYear,
                            options: years,
                            dropdownOffsetDistance: 4,
                            dropdownAutoWidth: true,
                            icon: /*#__PURE__*/ _jsx(Icon12Dropdown, {}),
                            onChange: onYearChange,
                            forceDropdownPortal: false,
                            selectType: "accent",
                            "aria-label": changeYearLabel
                        })
                    ]
                })
            }),
            !nextMonthHidden && /*#__PURE__*/ _jsx(AdaptivityProvider, {
                sizeX: "regular",
                children: /*#__PURE__*/ _jsxs(Tappable, _object_spread_props(_object_spread({
                    className: classNames("vkuiCalendarHeader__nav-icon", "vkuiCalendarHeader__nav-icon-next", nextMonthClassName),
                    onClick: onNextMonth
                }, restNextMonthProps), {
                    children: [
                        /*#__PURE__*/ _jsxs(VisuallyHidden, {
                            children: [
                                nextMonthLabel,
                                ", ",
                                formatter.format(addMonths(viewDate, 1))
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