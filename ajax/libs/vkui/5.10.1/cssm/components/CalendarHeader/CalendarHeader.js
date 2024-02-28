import * as React from 'react';
import { Icon12Dropdown, Icon20ChevronLeftOutline, Icon20ChevronRightOutline } from '@vkontakte/icons';
import { classNames } from '@vkontakte/vkjs';
import { SizeType } from '../../lib/adaptivity';
import { getMonths, getYears } from '../../lib/calendar';
import { addMonths, setMonth, setYear, subMonths } from '../../lib/date';
import { AdaptivityProvider } from '../AdaptivityProvider/AdaptivityProvider';
import { useConfigProvider } from '../ConfigProvider/ConfigProviderContext';
import { CustomSelect } from '../CustomSelect/CustomSelect';
import { RootComponent } from '../RootComponent/RootComponent';
import { Tappable } from '../Tappable/Tappable';
import { Paragraph } from '../Typography/Paragraph/Paragraph';
import styles from './CalendarHeader.module.css';
export const CalendarHeader = ({ viewDate, onChange, prevMonth = true, nextMonth = true, disablePickers = false, onNextMonth, onPrevMonth, prevMonthProps = {}, nextMonthProps = {}, prevMonthAriaLabel = 'Предыдущий месяц', nextMonthAriaLabel = 'Следующий месяц', changeMonthAriaLabel = 'Изменить месяц', changeYearAriaLabel = 'Изменить год', prevMonthIcon = /*#__PURE__*/ React.createElement(Icon20ChevronLeftOutline, {
    className: styles['CalendarHeader__nav-icon--accent'],
    width: 30,
    height: 30
}), nextMonthIcon = /*#__PURE__*/ React.createElement(Icon20ChevronRightOutline, {
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
                label: /*#__PURE__*/ React.createElement("span", {
                    className: styles['CalendarHeader__month']
                }, label)
            })), [
        locale
    ]);
    const currentYear = viewDate.getFullYear();
    const years = React.useMemo(()=>getYears(currentYear, 100), [
        currentYear
    ]);
    const formatter = new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'long'
    });
    const { className: prevMonthClassName, ...restPrevMonthProps } = prevMonthProps;
    const { className: nextMonthClassName, ...restNextMonthProps } = nextMonthProps;
    return /*#__PURE__*/ React.createElement(RootComponent, {
        baseClassName: styles['CalendarHeader'],
        ...restProps
    }, prevMonth && /*#__PURE__*/ React.createElement(AdaptivityProvider, {
        sizeX: SizeType.REGULAR
    }, /*#__PURE__*/ React.createElement(Tappable, {
        className: classNames(styles['CalendarHeader__nav-icon'], styles['CalendarHeader__nav-icon-prev'], prevMonthClassName),
        onClick: onPrevMonth,
        "aria-label": `${prevMonthAriaLabel}, ${formatter.format(subMonths(viewDate, 1))}`,
        ...restPrevMonthProps
    }, prevMonthIcon)), disablePickers ? /*#__PURE__*/ React.createElement(Paragraph, {
        className: classNames(styles['CalendarHeader__pickers'], 'vkuiInternalCalendarHeader__pickers'),
        weight: "2"
    }, /*#__PURE__*/ React.createElement("span", {
        className: styles['CalendarHeader__month']
    }, new Intl.DateTimeFormat(locale, {
        month: 'long'
    }).format(viewDate)), "\xa0", new Intl.DateTimeFormat(locale, {
        year: 'numeric'
    }).format(viewDate)) : /*#__PURE__*/ React.createElement(AdaptivityProvider, {
        sizeY: SizeType.COMPACT
    }, /*#__PURE__*/ React.createElement("div", {
        className: classNames(styles['CalendarHeader__pickers'], 'vkuiInternalCalendarHeader__pickers')
    }, /*#__PURE__*/ React.createElement(CustomSelect, {
        className: classNames(styles['CalendarHeader__picker'], 'vkuiInternalCalendarHeader__picker'),
        value: viewDate.getMonth(),
        options: months,
        dropdownOffsetDistance: 4,
        fixDropdownWidth: false,
        icon: /*#__PURE__*/ React.createElement(Icon12Dropdown, null),
        onChange: onMonthsChange,
        forceDropdownPortal: false,
        selectType: "accent",
        "aria-label": changeMonthAriaLabel
    }), /*#__PURE__*/ React.createElement(CustomSelect, {
        className: classNames(styles['CalendarHeader__picker'], 'vkuiInternalCalendarHeader__picker'),
        value: viewDate.getFullYear(),
        options: years,
        dropdownOffsetDistance: 4,
        fixDropdownWidth: false,
        icon: /*#__PURE__*/ React.createElement(Icon12Dropdown, null),
        onChange: onYearChange,
        forceDropdownPortal: false,
        selectType: "accent",
        "aria-label": changeYearAriaLabel
    }))), nextMonth && /*#__PURE__*/ React.createElement(AdaptivityProvider, {
        sizeX: SizeType.REGULAR
    }, /*#__PURE__*/ React.createElement(Tappable, {
        className: classNames(styles['CalendarHeader__nav-icon'], styles['CalendarHeader__nav-icon-next'], nextMonthClassName),
        onClick: onNextMonth,
        "aria-label": `${nextMonthAriaLabel}, ${formatter.format(addMonths(viewDate, 1))}`,
        ...restNextMonthProps
    }, nextMonthIcon)));
};

//# sourceMappingURL=CalendarHeader.js.map