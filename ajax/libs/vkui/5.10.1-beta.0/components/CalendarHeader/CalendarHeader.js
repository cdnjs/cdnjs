import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { Icon12Dropdown, Icon20ChevronLeftOutline, Icon20ChevronRightOutline } from "@vkontakte/icons";
import { classNames } from "@vkontakte/vkjs";
import { SizeType } from "../../lib/adaptivity";
import { getMonths, getYears } from "../../lib/calendar";
import { addMonths, setMonth, setYear, subMonths } from "../../lib/date";
import { AdaptivityProvider } from "../AdaptivityProvider/AdaptivityProvider";
import { useConfigProvider } from "../ConfigProvider/ConfigProviderContext";
import { CustomSelect } from "../CustomSelect/CustomSelect";
import { RootComponent } from "../RootComponent/RootComponent";
import { Tappable } from "../Tappable/Tappable";
import { Paragraph } from "../Typography/Paragraph/Paragraph";
export var CalendarHeader = function(_param) {
    var viewDate = _param.viewDate, onChange = _param.onChange, _param_prevMonth = _param.prevMonth, prevMonth = _param_prevMonth === void 0 ? true : _param_prevMonth, _param_nextMonth = _param.nextMonth, nextMonth = _param_nextMonth === void 0 ? true : _param_nextMonth, _param_disablePickers = _param.disablePickers, disablePickers = _param_disablePickers === void 0 ? false : _param_disablePickers, onNextMonth = _param.onNextMonth, onPrevMonth = _param.onPrevMonth, _param_prevMonthProps = _param.prevMonthProps, prevMonthProps = _param_prevMonthProps === void 0 ? {} : _param_prevMonthProps, _param_nextMonthProps = _param.nextMonthProps, nextMonthProps = _param_nextMonthProps === void 0 ? {} : _param_nextMonthProps, _param_prevMonthAriaLabel = _param.prevMonthAriaLabel, prevMonthAriaLabel = _param_prevMonthAriaLabel === void 0 ? "Предыдущий месяц" : _param_prevMonthAriaLabel, _param_nextMonthAriaLabel = _param.nextMonthAriaLabel, nextMonthAriaLabel = _param_nextMonthAriaLabel === void 0 ? "Следующий месяц" : _param_nextMonthAriaLabel, _param_changeMonthAriaLabel = _param.changeMonthAriaLabel, changeMonthAriaLabel = _param_changeMonthAriaLabel === void 0 ? "Изменить месяц" : _param_changeMonthAriaLabel, _param_changeYearAriaLabel = _param.changeYearAriaLabel, changeYearAriaLabel = _param_changeYearAriaLabel === void 0 ? "Изменить год" : _param_changeYearAriaLabel, _param_prevMonthIcon = _param.prevMonthIcon, prevMonthIcon = _param_prevMonthIcon === void 0 ? /*#__PURE__*/ React.createElement(Icon20ChevronLeftOutline, {
        className: "vkuiCalendarHeader__nav-icon--accent",
        width: 30,
        height: 30
    }) : _param_prevMonthIcon, _param_nextMonthIcon = _param.nextMonthIcon, nextMonthIcon = _param_nextMonthIcon === void 0 ? /*#__PURE__*/ React.createElement(Icon20ChevronRightOutline, {
        className: "vkuiCalendarHeader__nav-icon--accent",
        width: 30,
        height: 30
    }) : _param_nextMonthIcon, restProps = _object_without_properties(_param, [
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
    var locale = useConfigProvider().locale;
    var onMonthsChange = React.useCallback(function(event) {
        return onChange(setMonth(viewDate, Number(event.target.value)));
    }, [
        onChange,
        viewDate
    ]);
    var onYearChange = React.useCallback(function(event) {
        return onChange(setYear(viewDate, Number(event.target.value)));
    }, [
        onChange,
        viewDate
    ]);
    var months = React.useMemo(function() {
        return getMonths(locale).map(function(param) {
            var value = param.value, label = param.label;
            return {
                value: value,
                label: /*#__PURE__*/ React.createElement("span", {
                    className: "vkuiCalendarHeader__month"
                }, label)
            };
        });
    }, [
        locale
    ]);
    var currentYear = viewDate.getFullYear();
    var years = React.useMemo(function() {
        return getYears(currentYear, 100);
    }, [
        currentYear
    ]);
    var formatter = new Intl.DateTimeFormat(locale, {
        year: "numeric",
        month: "long"
    });
    var prevMonthClassName = prevMonthProps.className, restPrevMonthProps = _object_without_properties(prevMonthProps, [
        "className"
    ]);
    var nextMonthClassName = nextMonthProps.className, restNextMonthProps = _object_without_properties(nextMonthProps, [
        "className"
    ]);
    return /*#__PURE__*/ React.createElement(RootComponent, _object_spread({
        baseClassName: "vkuiCalendarHeader"
    }, restProps), prevMonth && /*#__PURE__*/ React.createElement(AdaptivityProvider, {
        sizeX: SizeType.REGULAR
    }, /*#__PURE__*/ React.createElement(Tappable, _object_spread({
        className: classNames("vkuiCalendarHeader__nav-icon", "vkuiCalendarHeader__nav-icon-prev", prevMonthClassName),
        onClick: onPrevMonth,
        "aria-label": "".concat(prevMonthAriaLabel, ", ").concat(formatter.format(subMonths(viewDate, 1)))
    }, restPrevMonthProps), prevMonthIcon)), disablePickers ? /*#__PURE__*/ React.createElement(Paragraph, {
        className: classNames("vkuiCalendarHeader__pickers", "vkuiInternalCalendarHeader__pickers"),
        weight: "2"
    }, /*#__PURE__*/ React.createElement("span", {
        className: "vkuiCalendarHeader__month"
    }, new Intl.DateTimeFormat(locale, {
        month: "long"
    }).format(viewDate)), "\xa0", new Intl.DateTimeFormat(locale, {
        year: "numeric"
    }).format(viewDate)) : /*#__PURE__*/ React.createElement(AdaptivityProvider, {
        sizeY: SizeType.COMPACT
    }, /*#__PURE__*/ React.createElement("div", {
        className: classNames("vkuiCalendarHeader__pickers", "vkuiInternalCalendarHeader__pickers")
    }, /*#__PURE__*/ React.createElement(CustomSelect, {
        className: classNames("vkuiCalendarHeader__picker", "vkuiInternalCalendarHeader__picker"),
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
        className: classNames("vkuiCalendarHeader__picker", "vkuiInternalCalendarHeader__picker"),
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
    }, /*#__PURE__*/ React.createElement(Tappable, _object_spread({
        className: classNames("vkuiCalendarHeader__nav-icon", "vkuiCalendarHeader__nav-icon-next", nextMonthClassName),
        onClick: onNextMonth,
        "aria-label": "".concat(nextMonthAriaLabel, ", ").concat(formatter.format(addMonths(viewDate, 1)))
    }, restNextMonthProps), nextMonthIcon)));
};

//# sourceMappingURL=CalendarHeader.js.map