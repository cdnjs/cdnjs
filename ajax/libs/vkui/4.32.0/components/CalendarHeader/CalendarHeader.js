import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { setMonth, setYear, subMonths, addMonths } from "../../lib/date";
import { Icon20ChevronLeftOutline, Icon20ChevronRightOutline, Icon12Dropdown } from "@vkontakte/icons";
import Tappable from "../Tappable/Tappable";
import { classNames } from "../../lib/classNames";
import { SelectType } from "../Select/Select";
import { CustomSelect } from "../CustomSelect/CustomSelect";
import { SizeType } from "../../hoc/withAdaptivity";
import { getMonths, getYears } from "../../lib/calendar";
import { LocaleProviderContext } from "../LocaleProviderContext/LocaleProviderContext";
import { Paragraph } from "../Typography/Paragraph/Paragraph";
import { AdaptivityProvider } from "../AdaptivityProvider/AdaptivityProvider";
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
      _ref$prevMonthAriaLab = _ref.prevMonthAriaLabel,
      prevMonthAriaLabel = _ref$prevMonthAriaLab === void 0 ? "Предыдущий месяц" : _ref$prevMonthAriaLab,
      _ref$nextMonthAriaLab = _ref.nextMonthAriaLabel,
      nextMonthAriaLabel = _ref$nextMonthAriaLab === void 0 ? "Следующий месяц" : _ref$nextMonthAriaLab,
      _ref$changeMonthAriaL = _ref.changeMonthAriaLabel,
      changeMonthAriaLabel = _ref$changeMonthAriaL === void 0 ? "Изменить месяц" : _ref$changeMonthAriaL,
      _ref$changeYearAriaLa = _ref.changeYearAriaLabel,
      changeYearAriaLabel = _ref$changeYearAriaLa === void 0 ? "Изменить год" : _ref$changeYearAriaLa,
      _ref$prevMonthIcon = _ref.prevMonthIcon,
      prevMonthIcon = _ref$prevMonthIcon === void 0 ? createScopedElement(Icon20ChevronLeftOutline, {
    vkuiClass: "CalendarHeader__nav-icon--accent",
    width: 30,
    height: 30
  }) : _ref$prevMonthIcon,
      _ref$nextMonthIcon = _ref.nextMonthIcon,
      nextMonthIcon = _ref$nextMonthIcon === void 0 ? createScopedElement(Icon20ChevronRightOutline, {
    vkuiClass: "CalendarHeader__nav-icon--accent",
    width: 30,
    height: 30
  }) : _ref$nextMonthIcon;
  var locale = React.useContext(LocaleProviderContext);
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
        label: createScopedElement("span", {
          vkuiClass: "CalendarHeader__month"
        }, label)
      };
    });
  }, [locale]);
  var currentYear = viewDate.getFullYear();
  var years = React.useMemo(function () {
    return getYears(currentYear, 100);
  }, [currentYear]);
  var formatter = new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long"
  });
  return createScopedElement("div", {
    vkuiClass: "CalendarHeader",
    className: className
  }, prevMonth && createScopedElement(AdaptivityProvider, {
    sizeX: SizeType.REGULAR
  }, createScopedElement(Tappable, {
    vkuiClass: classNames("CalendarHeader__nav-icon", "CalendarHeader__nav-icon-prev"),
    onClick: onPrevMonth,
    "aria-label": "".concat(prevMonthAriaLabel, ", ").concat(formatter.format(subMonths(viewDate, 1)))
  }, prevMonthIcon)), disablePickers ? createScopedElement(Paragraph, {
    vkuiClass: "CalendarHeader__pickers",
    weight: "2"
  }, createScopedElement("span", {
    vkuiClass: "CalendarHeader__month"
  }, new Intl.DateTimeFormat(locale, {
    month: "long"
  }).format(viewDate)), "\xA0", new Intl.DateTimeFormat(locale, {
    year: "numeric"
  }).format(viewDate)) : createScopedElement("div", {
    vkuiClass: "CalendarHeader__pickers"
  }, createScopedElement(CustomSelect, {
    vkuiClass: "CalendarHeader__picker",
    value: viewDate.getMonth(),
    options: months,
    dropdownOffsetDistance: 4,
    fixDropdownWidth: false,
    sizeY: SizeType.COMPACT,
    icon: createScopedElement(Icon12Dropdown, null),
    onChange: onMonthsChange,
    forceDropdownPortal: false,
    selectType: SelectType.accent,
    "aria-label": changeMonthAriaLabel
  }), createScopedElement(CustomSelect, {
    vkuiClass: "CalendarHeader__picker",
    value: viewDate.getFullYear(),
    options: years,
    dropdownOffsetDistance: 4,
    fixDropdownWidth: false,
    sizeY: SizeType.COMPACT,
    icon: createScopedElement(Icon12Dropdown, null),
    onChange: onYearChange,
    forceDropdownPortal: false,
    selectType: SelectType.accent,
    "aria-label": changeYearAriaLabel
  })), nextMonth && createScopedElement(AdaptivityProvider, {
    sizeX: SizeType.REGULAR
  }, createScopedElement(Tappable, {
    vkuiClass: classNames("CalendarHeader__nav-icon", "CalendarHeader__nav-icon-next"),
    onClick: onNextMonth,
    "aria-label": "".concat(nextMonthAriaLabel, ", ").concat(formatter.format(addMonths(viewDate, 1)))
  }, nextMonthIcon)));
};
//# sourceMappingURL=CalendarHeader.js.map