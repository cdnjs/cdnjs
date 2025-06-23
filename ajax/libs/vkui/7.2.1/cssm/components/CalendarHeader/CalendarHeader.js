'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Icon12Dropdown, Icon20ChevronLeftOutline, Icon20ChevronRightOutline } from "@vkontakte/icons";
import { classNames } from "@vkontakte/vkjs";
import { addMonths, setMonth, setYear, subMonths } from "date-fns";
import { DEFAULT_MAX_YEAR, DEFAULT_MIN_YEAR, getMonths, getYears } from "../../lib/calendar.js";
import { AdaptivityProvider } from "../AdaptivityProvider/AdaptivityProvider.js";
import { useConfigProvider } from "../ConfigProvider/ConfigProviderContext.js";
import { CustomSelect } from "../CustomSelect/CustomSelect.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
import { Tappable } from "../Tappable/Tappable.js";
import { Paragraph } from "../Typography/Paragraph/Paragraph.js";
import { VisuallyHidden } from "../VisuallyHidden/VisuallyHidden.js";
import styles from "./CalendarHeader.module.css";
export const CalendarHeader = ({ viewDate, onChange, prevMonthHidden: prevMonthHiddenProp = false, nextMonthHidden: nextMonthHiddenProp = false, disablePickers = false, onNextMonth, onPrevMonth, prevMonthProps = {}, nextMonthProps = {}, prevMonthLabel = 'Предыдущий месяц', nextMonthLabel = 'Следующий месяц', changeMonthLabel = 'Изменить месяц', changeYearLabel = 'Изменить год', prevMonthIcon = /*#__PURE__*/ _jsx(Icon20ChevronLeftOutline, {
    className: styles.navIconAccent,
    width: 30,
    height: 30
}), nextMonthIcon = /*#__PURE__*/ _jsx(Icon20ChevronRightOutline, {
    className: styles.navIconAccent,
    width: 30,
    height: 30
}), isMonthDisabled, isYearDisabled, monthDropdownTestId, yearDropdownTestId, prevMonthButtonTestId, nextMonthButtonTestId, ...restProps })=>{
    const { locale, direction } = useConfigProvider();
    const onMonthsChange = React.useCallback((_, newValue)=>onChange(setMonth(viewDate, Number(newValue))), [
        onChange,
        viewDate
    ]);
    const onYearChange = React.useCallback((_, newValue)=>onChange(setYear(viewDate, Number(newValue))), [
        onChange,
        viewDate
    ]);
    const currentYear = viewDate.getFullYear();
    const currentMonth = viewDate.getMonth();
    const months = React.useMemo(()=>getMonths(locale).map(({ value, label })=>({
                value,
                label: /*#__PURE__*/ _jsx("span", {
                    className: styles.month,
                    children: label
                }),
                disabled: isMonthDisabled && isMonthDisabled(value)
            })), [
        locale,
        isMonthDisabled
    ]);
    const years = React.useMemo(()=>getYears(currentYear, 100).map((year)=>({
                ...year,
                disabled: isYearDisabled && isYearDisabled(year.value)
            })), [
        currentYear,
        isYearDisabled
    ]);
    const formatter = new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'long'
    });
    const { className: prevMonthClassName, ...restPrevMonthProps } = prevMonthProps;
    const { className: nextMonthClassName, ...restNextMonthProps } = nextMonthProps;
    let nextMonthHidden = nextMonthHiddenProp || currentMonth === 11 && currentYear === DEFAULT_MAX_YEAR;
    if (isMonthDisabled && !nextMonthHidden) {
        nextMonthHidden = isMonthDisabled(currentMonth === 11 ? 0 : currentMonth + 1, currentMonth === 11 ? Math.min(currentYear + 1, DEFAULT_MAX_YEAR) : currentYear);
    }
    let prevMonthHidden = prevMonthHiddenProp || currentMonth === 0 && currentYear === DEFAULT_MIN_YEAR;
    if (isMonthDisabled && !prevMonthHidden) {
        prevMonthHidden = isMonthDisabled(currentMonth === 0 ? 11 : currentMonth - 1, currentMonth === 0 ? Math.max(currentYear - 1, DEFAULT_MIN_YEAR) : currentYear);
    }
    return /*#__PURE__*/ _jsxs(RootComponent, {
        baseClassName: styles.host,
        ...restProps,
        children: [
            !prevMonthHidden && /*#__PURE__*/ _jsx(AdaptivityProvider, {
                sizeX: "regular",
                children: /*#__PURE__*/ _jsxs(Tappable, {
                    baseClassName: classNames(styles.navIcon, styles.navIconPrev, prevMonthClassName),
                    onClick: onPrevMonth,
                    "data-testid": prevMonthButtonTestId,
                    ...restPrevMonthProps,
                    children: [
                        /*#__PURE__*/ _jsxs(VisuallyHidden, {
                            children: [
                                prevMonthLabel,
                                ", ",
                                formatter.format(subMonths(viewDate, 1))
                            ]
                        }),
                        direction === 'ltr' ? prevMonthIcon : nextMonthIcon
                    ]
                })
            }),
            disablePickers ? /*#__PURE__*/ _jsxs(Paragraph, {
                className: classNames(styles.pickers, 'vkuiInternalCalendarHeader__pickers'),
                weight: "2",
                children: [
                    /*#__PURE__*/ _jsx("span", {
                        className: styles.month,
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
                    className: classNames(styles.pickers, 'vkuiInternalCalendarHeader__pickers'),
                    children: [
                        /*#__PURE__*/ _jsx(CustomSelect, {
                            className: classNames(styles.picker, 'vkuiInternalCalendarHeader__picker'),
                            value: currentMonth,
                            options: months,
                            dropdownOffsetDistance: 4,
                            dropdownAutoWidth: true,
                            icon: /*#__PURE__*/ _jsx(Icon12Dropdown, {}),
                            onChange: onMonthsChange,
                            forceDropdownPortal: false,
                            selectType: "accent",
                            "aria-label": changeMonthLabel,
                            "data-testid": typeof monthDropdownTestId === 'string' ? monthDropdownTestId : monthDropdownTestId?.(currentMonth)
                        }),
                        /*#__PURE__*/ _jsx(CustomSelect, {
                            className: classNames(styles.picker, 'vkuiInternalCalendarHeader__picker'),
                            value: currentYear,
                            options: years,
                            dropdownOffsetDistance: 4,
                            dropdownAutoWidth: true,
                            icon: /*#__PURE__*/ _jsx(Icon12Dropdown, {}),
                            onChange: onYearChange,
                            forceDropdownPortal: false,
                            selectType: "accent",
                            "aria-label": changeYearLabel,
                            "data-testid": yearDropdownTestId
                        })
                    ]
                })
            }),
            !nextMonthHidden && /*#__PURE__*/ _jsx(AdaptivityProvider, {
                sizeX: "regular",
                children: /*#__PURE__*/ _jsxs(Tappable, {
                    baseClassName: classNames(styles.navIcon, styles.navIconNext, nextMonthClassName),
                    onClick: onNextMonth,
                    "data-testid": nextMonthButtonTestId,
                    ...restNextMonthProps,
                    children: [
                        /*#__PURE__*/ _jsxs(VisuallyHidden, {
                            children: [
                                nextMonthLabel,
                                ", ",
                                formatter.format(addMonths(viewDate, 1))
                            ]
                        }),
                        direction === 'ltr' ? nextMonthIcon : prevMonthIcon
                    ]
                })
            })
        ]
    });
};

//# sourceMappingURL=CalendarHeader.js.map