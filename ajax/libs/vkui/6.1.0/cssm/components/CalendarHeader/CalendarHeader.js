import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { Icon12Dropdown, Icon20ChevronLeftOutline, Icon20ChevronRightOutline } from '@vkontakte/icons';
import { classNames } from '@vkontakte/vkjs';
import { DEFAULT_MAX_YEAR, DEFAULT_MIN_YEAR, getMonths, getYears } from '../../lib/calendar';
import { addMonths, setMonth, setYear, subMonths } from '../../lib/date';
import { AdaptivityProvider } from '../AdaptivityProvider/AdaptivityProvider';
import { useConfigProvider } from '../ConfigProvider/ConfigProviderContext';
import { CustomSelect } from '../CustomSelect/CustomSelect';
import { RootComponent } from '../RootComponent/RootComponent';
import { Tappable } from '../Tappable/Tappable';
import { Paragraph } from '../Typography/Paragraph/Paragraph';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
import styles from './CalendarHeader.module.css';
export const CalendarHeader = ({ viewDate, onChange, prevMonthHidden: prevMonthHiddenProp = false, nextMonthHidden: nextMonthHiddenProp = false, disablePickers = false, onNextMonth, onPrevMonth, prevMonthProps = {}, nextMonthProps = {}, prevMonthLabel = 'Предыдущий месяц', nextMonthLabel = 'Следующий месяц', changeMonthLabel = 'Изменить месяц', changeYearLabel = 'Изменить год', prevMonthIcon = /*#__PURE__*/ _jsx(Icon20ChevronLeftOutline, {
    className: styles['CalendarHeader__nav-icon--accent'],
    width: 30,
    height: 30
}), nextMonthIcon = /*#__PURE__*/ _jsx(Icon20ChevronRightOutline, {
    className: styles['CalendarHeader__nav-icon--accent'],
    width: 30,
    height: 30
}), ...restProps })=>{
    const { locale } = useConfigProvider();
    const onMonthsChange = React.useCallback((event)=>onChange(setMonth(viewDate, Number(event.target.value))), [
        onChange,
        viewDate
    ]);
    const onYearChange = React.useCallback((event)=>onChange(setYear(viewDate, Number(event.target.value))), [
        onChange,
        viewDate
    ]);
    const months = React.useMemo(()=>getMonths(locale).map(({ value, label })=>({
                value,
                label: /*#__PURE__*/ _jsx("span", {
                    className: styles['CalendarHeader__month'],
                    children: label
                })
            })), [
        locale
    ]);
    const currentYear = viewDate.getFullYear();
    const currentMonth = viewDate.getMonth();
    const years = React.useMemo(()=>getYears(currentYear, 100), [
        currentYear
    ]);
    const formatter = new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'long'
    });
    const { className: prevMonthClassName, ...restPrevMonthProps } = prevMonthProps;
    const { className: nextMonthClassName, ...restNextMonthProps } = nextMonthProps;
    const nextMonthHidden = nextMonthHiddenProp || currentMonth === 11 && currentYear === DEFAULT_MAX_YEAR;
    const prevMonthHidden = prevMonthHiddenProp || currentMonth === 0 && currentYear === DEFAULT_MIN_YEAR;
    return /*#__PURE__*/ _jsxs(RootComponent, {
        baseClassName: styles['CalendarHeader'],
        ...restProps,
        children: [
            !prevMonthHidden && /*#__PURE__*/ _jsx(AdaptivityProvider, {
                sizeX: "regular",
                children: /*#__PURE__*/ _jsxs(Tappable, {
                    className: classNames(styles['CalendarHeader__nav-icon'], styles['CalendarHeader__nav-icon-prev'], prevMonthClassName),
                    onClick: onPrevMonth,
                    ...restPrevMonthProps,
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
                })
            }),
            disablePickers ? /*#__PURE__*/ _jsxs(Paragraph, {
                className: classNames(styles['CalendarHeader__pickers'], 'vkuiInternalCalendarHeader__pickers'),
                weight: "2",
                children: [
                    /*#__PURE__*/ _jsx("span", {
                        className: styles['CalendarHeader__month'],
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
                    className: classNames(styles['CalendarHeader__pickers'], 'vkuiInternalCalendarHeader__pickers'),
                    children: [
                        /*#__PURE__*/ _jsx(CustomSelect, {
                            className: classNames(styles['CalendarHeader__picker'], 'vkuiInternalCalendarHeader__picker'),
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
                            className: classNames(styles['CalendarHeader__picker'], 'vkuiInternalCalendarHeader__picker'),
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
                children: /*#__PURE__*/ _jsxs(Tappable, {
                    className: classNames(styles['CalendarHeader__nav-icon'], styles['CalendarHeader__nav-icon-next'], nextMonthClassName),
                    onClick: onNextMonth,
                    ...restNextMonthProps,
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
                })
            })
        ]
    });
};

//# sourceMappingURL=CalendarHeader.js.map