import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["className"],
  _excluded2 = ["className"];
import * as React from 'react';
import { setMonth, setYear, subMonths, addMonths } from '../../lib/date';
import { Icon20ChevronLeftOutline, Icon20ChevronRightOutline, Icon12Dropdown } from '@vkontakte/icons';
import { Tappable } from '../Tappable/Tappable';
import { classNames } from '@vkontakte/vkjs';
import { CustomSelect } from '../CustomSelect/CustomSelect';
import { SizeType } from '../../lib/adaptivity';
import { getMonths, getYears } from '../../lib/calendar';
import { useConfigProvider } from '../ConfigProvider/ConfigProviderContext';
import { Paragraph } from '../Typography/Paragraph/Paragraph';
import { AdaptivityProvider } from '../AdaptivityProvider/AdaptivityProvider';
import "./CalendarHeader.module.css";
export var CalendarHeader = function CalendarHeader(_ref) {
  var viewDate = _ref.viewDate,
    onChange = _ref.onChange,
    _ref$prevMonth = _ref.prevMonth,
    prevMonth = _ref$prevMonth === void 0 ? true : _ref$prevMonth,
    _ref$nextMonth = _ref.nextMonth,
    nextMonth = _ref$nextMonth === void 0 ? true : _ref$nextMonth,
    _ref$disablePickers = _ref.disablePickers,
    disablePickers = _ref$disablePickers === void 0 ? false : _ref$disablePickers,
    onNextMonth = _ref.onNextMonth,
    onPrevMonth = _ref.onPrevMonth,
    className = _ref.className,
    _ref$prevMonthProps = _ref.prevMonthProps,
    prevMonthProps = _ref$prevMonthProps === void 0 ? {} : _ref$prevMonthProps,
    _ref$nextMonthProps = _ref.nextMonthProps,
    nextMonthProps = _ref$nextMonthProps === void 0 ? {} : _ref$nextMonthProps,
    _ref$prevMonthAriaLab = _ref.prevMonthAriaLabel,
    prevMonthAriaLabel = _ref$prevMonthAriaLab === void 0 ? 'Предыдущий месяц' : _ref$prevMonthAriaLab,
    _ref$nextMonthAriaLab = _ref.nextMonthAriaLabel,
    nextMonthAriaLabel = _ref$nextMonthAriaLab === void 0 ? 'Следующий месяц' : _ref$nextMonthAriaLab,
    _ref$changeMonthAriaL = _ref.changeMonthAriaLabel,
    changeMonthAriaLabel = _ref$changeMonthAriaL === void 0 ? 'Изменить месяц' : _ref$changeMonthAriaL,
    _ref$changeYearAriaLa = _ref.changeYearAriaLabel,
    changeYearAriaLabel = _ref$changeYearAriaLa === void 0 ? 'Изменить год' : _ref$changeYearAriaLa,
    _ref$prevMonthIcon = _ref.prevMonthIcon,
    prevMonthIcon = _ref$prevMonthIcon === void 0 ? /*#__PURE__*/React.createElement(Icon20ChevronLeftOutline, {
      className: "vkuiCalendarHeader__nav-icon--accent",
      width: 30,
      height: 30
    }) : _ref$prevMonthIcon,
    _ref$nextMonthIcon = _ref.nextMonthIcon,
    nextMonthIcon = _ref$nextMonthIcon === void 0 ? /*#__PURE__*/React.createElement(Icon20ChevronRightOutline, {
      className: "vkuiCalendarHeader__nav-icon--accent",
      width: 30,
      height: 30
    }) : _ref$nextMonthIcon;
  var _useConfigProvider = useConfigProvider(),
    locale = _useConfigProvider.locale;
  var onMonthsChange = React.useCallback(function (event) {
    return onChange(setMonth(viewDate, Number(event.target.value)));
  }, [onChange, viewDate]);
  var onYearChange = React.useCallback(function (event) {
    return onChange(setYear(viewDate, Number(event.target.value)));
  }, [onChange, viewDate]);
  var months = React.useMemo(function () {
    return getMonths(locale).map(function (_ref2) {
      var value = _ref2.value,
        label = _ref2.label;
      return {
        value: value,
        label: /*#__PURE__*/React.createElement("span", {
          className: "vkuiCalendarHeader__month"
        }, label)
      };
    });
  }, [locale]);
  var currentYear = viewDate.getFullYear();
  var years = React.useMemo(function () {
    return getYears(currentYear, 100);
  }, [currentYear]);
  var formatter = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long'
  });
  var prevMonthClassName = prevMonthProps.className,
    restPrevMonthProps = _objectWithoutProperties(prevMonthProps, _excluded);
  var nextMonthClassName = nextMonthProps.className,
    restNextMonthProps = _objectWithoutProperties(nextMonthProps, _excluded2);
  return /*#__PURE__*/React.createElement("div", {
    className: classNames("vkuiCalendarHeader", className)
  }, prevMonth && /*#__PURE__*/React.createElement(AdaptivityProvider, {
    sizeX: SizeType.REGULAR
  }, /*#__PURE__*/React.createElement(Tappable, _extends({
    className: classNames("vkuiCalendarHeader__nav-icon", "vkuiCalendarHeader__nav-icon-prev", prevMonthClassName),
    onClick: onPrevMonth,
    "aria-label": "".concat(prevMonthAriaLabel, ", ").concat(formatter.format(subMonths(viewDate, 1)))
  }, restPrevMonthProps), prevMonthIcon)), disablePickers ? /*#__PURE__*/React.createElement(Paragraph, {
    className: "vkuiCalendarHeader__pickers",
    weight: "2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "vkuiCalendarHeader__month"
  }, new Intl.DateTimeFormat(locale, {
    month: 'long'
  }).format(viewDate)), "\xA0", new Intl.DateTimeFormat(locale, {
    year: 'numeric'
  }).format(viewDate)) : /*#__PURE__*/React.createElement(AdaptivityProvider, {
    sizeY: SizeType.COMPACT
  }, /*#__PURE__*/React.createElement("div", {
    className: "vkuiCalendarHeader__pickers"
  }, /*#__PURE__*/React.createElement(CustomSelect, {
    className: "vkuiCalendarHeader__picker",
    value: viewDate.getMonth(),
    options: months,
    dropdownOffsetDistance: 4,
    fixDropdownWidth: false,
    icon: /*#__PURE__*/React.createElement(Icon12Dropdown, null),
    onChange: onMonthsChange,
    forceDropdownPortal: false,
    selectType: "accent",
    "aria-label": changeMonthAriaLabel
  }), /*#__PURE__*/React.createElement(CustomSelect, {
    className: "vkuiCalendarHeader__picker",
    value: viewDate.getFullYear(),
    options: years,
    dropdownOffsetDistance: 4,
    fixDropdownWidth: false,
    icon: /*#__PURE__*/React.createElement(Icon12Dropdown, null),
    onChange: onYearChange,
    forceDropdownPortal: false,
    selectType: "accent",
    "aria-label": changeYearAriaLabel
  }))), nextMonth && /*#__PURE__*/React.createElement(AdaptivityProvider, {
    sizeX: SizeType.REGULAR
  }, /*#__PURE__*/React.createElement(Tappable, _extends({
    className: classNames("vkuiCalendarHeader__nav-icon", "vkuiCalendarHeader__nav-icon-next", nextMonthClassName),
    onClick: onNextMonth,
    "aria-label": "".concat(nextMonthAriaLabel, ", ").concat(formatter.format(addMonths(viewDate, 1)))
  }, restNextMonthProps), nextMonthIcon)));
};
//# sourceMappingURL=CalendarHeader.js.map