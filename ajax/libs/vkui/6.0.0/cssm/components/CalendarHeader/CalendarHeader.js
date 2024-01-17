import * as React from 'react';
import { Icon12Dropdown, Icon20ChevronLeftOutline, Icon20ChevronRightOutline } from '@vkontakte/icons';
import { classNames } from '@vkontakte/vkjs';
import { getMonths, getYears } from '../../lib/calendar';
import { addMonths, setMonth, setYear, subMonths } from '../../lib/date';
import { AdaptivityProvider } from '../AdaptivityProvider/AdaptivityProvider';
import { useConfigProvider } from '../ConfigProvider/ConfigProviderContext';
import { CustomSelect } from '../CustomSelect/CustomSelect';
import { RootComponent } from '../RootComponent/RootComponent';
import { Tappable } from '../Tappable/Tappable';
import { Paragraph } from '../Typography/Paragraph/Paragraph';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
import styles from './CalendarHeader.module.css';
export const CalendarHeader = ({ viewDate, onChange, prevMonthHidden = false, nextMonthHidden = false, disablePickers = false, onNextMonth, onPrevMonth, prevMonthProps = {}, nextMonthProps = {}, prevMonthLabel = 'Предыдущий месяц', nextMonthLabel = 'Следующий месяц', changeMonthLabel = 'Изменить месяц', changeYearLabel = 'Изменить год', prevMonthIcon = /*#__PURE__*/ React.createElement(Icon20ChevronLeftOutline, {
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
    }, !prevMonthHidden && /*#__PURE__*/ React.createElement(AdaptivityProvider, {
        sizeX: "regular"
    }, /*#__PURE__*/ React.createElement(Tappable, {
        className: classNames(styles['CalendarHeader__nav-icon'], styles['CalendarHeader__nav-icon-prev'], prevMonthClassName),
        onClick: onPrevMonth,
        ...restPrevMonthProps
    }, /*#__PURE__*/ React.createElement(VisuallyHidden, null, prevMonthLabel, ", ", formatter.format(subMonths(viewDate, 1))), prevMonthIcon)), disablePickers ? /*#__PURE__*/ React.createElement(Paragraph, {
        className: classNames(styles['CalendarHeader__pickers'], 'vkuiInternalCalendarHeader__pickers'),
        weight: "2"
    }, /*#__PURE__*/ React.createElement("span", {
        className: styles['CalendarHeader__month']
    }, new Intl.DateTimeFormat(locale, {
        month: 'long'
    }).format(viewDate)), " ", new Intl.DateTimeFormat(locale, {
        year: 'numeric'
    }).format(viewDate)) : /*#__PURE__*/ React.createElement(AdaptivityProvider, {
        sizeY: "compact"
    }, /*#__PURE__*/ React.createElement("div", {
        className: classNames(styles['CalendarHeader__pickers'], 'vkuiInternalCalendarHeader__pickers')
    }, /*#__PURE__*/ React.createElement(CustomSelect, {
        className: classNames(styles['CalendarHeader__picker'], 'vkuiInternalCalendarHeader__picker'),
        value: viewDate.getMonth(),
        options: months,
        dropdownOffsetDistance: 4,
        dropdownAutoWidth: true,
        icon: /*#__PURE__*/ React.createElement(Icon12Dropdown, null),
        onChange: onMonthsChange,
        forceDropdownPortal: false,
        selectType: "accent",
        "aria-label": changeMonthLabel
    }), /*#__PURE__*/ React.createElement(CustomSelect, {
        className: classNames(styles['CalendarHeader__picker'], 'vkuiInternalCalendarHeader__picker'),
        value: viewDate.getFullYear(),
        options: years,
        dropdownOffsetDistance: 4,
        dropdownAutoWidth: true,
        icon: /*#__PURE__*/ React.createElement(Icon12Dropdown, null),
        onChange: onYearChange,
        forceDropdownPortal: false,
        selectType: "accent",
        "aria-label": changeYearLabel
    }))), !nextMonthHidden && /*#__PURE__*/ React.createElement(AdaptivityProvider, {
        sizeX: "regular"
    }, /*#__PURE__*/ React.createElement(Tappable, {
        className: classNames(styles['CalendarHeader__nav-icon'], styles['CalendarHeader__nav-icon-next'], nextMonthClassName),
        onClick: onNextMonth,
        ...restNextMonthProps
    }, /*#__PURE__*/ React.createElement(VisuallyHidden, null, nextMonthLabel, ", ", formatter.format(addMonths(viewDate, 1))), nextMonthIcon)));
};

//# sourceMappingURL=CalendarHeader.js.map