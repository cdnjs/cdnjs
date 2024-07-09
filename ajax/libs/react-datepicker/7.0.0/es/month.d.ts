import React, { Component } from "react";
import { KeyType } from "./date_utils";
import Week from "./week";
interface WeekProps extends React.ComponentPropsWithoutRef<typeof Week> {
}
interface MonthProps extends Omit<WeekProps, "ariaLabelPrefix" | "chooseDayAriaLabelPrefix" | "day" | "disabledDayAriaLabelPrefix" | "month" | "onDayClick" | "onDayMouseEnter" | "preSelection" | "selected" | "showWeekNumber"> {
    monthClassName?: (date: Date) => string;
    onDayClick?: (date: Date, event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>, orderInDisplay?: number) => void;
    onDayMouseEnter?: (date: Date) => void;
    onMouseLeave?: VoidFunction;
    setPreSelection?: (date?: Date | null) => void;
    renderMonthContent?: (m: number, shortMonthText: string, fullMonthText: string, day: Date) => React.ReactNode;
    renderQuarterContent?: (q: number, shortQuarter: string) => React.ReactNode;
    handleOnMonthKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
    ariaLabelPrefix?: string;
    day: Date;
    orderInDisplay?: number;
    fixedHeight?: boolean;
    peekNextMonth?: boolean;
    preSelection?: Date | null;
    selected?: Date | null;
    showWeekNumbers?: WeekProps["showWeekNumber"];
    showMonthYearPicker?: boolean;
    showFullMonthYearPicker?: boolean;
    showTwoColumnMonthYearPicker?: boolean;
    showFourColumnMonthYearPicker?: boolean;
    showQuarterYearPicker?: boolean;
    weekAriaLabelPrefix?: WeekProps["ariaLabelPrefix"];
    chooseDayAriaLabelPrefix?: WeekProps["chooseDayAriaLabelPrefix"];
    disabledDayAriaLabelPrefix?: WeekProps["disabledDayAriaLabelPrefix"];
}
/**
 * `Month` is a React component that represents a month in a calendar.
 * It accepts a `MonthProps` object as props which provides various configurations and event handlers.
 *
 * @prop dayClassName - Function to determine the class name for a day.
 * @prop monthClassName - Function to determine the class name for a month.
 * @prop filterDate - Function to filter dates.
 * @prop formatWeekNumber - Function to format the week number.
 * @prop onDayClick - Function to handle day click events.
 * @prop onDayMouseEnter - Function to handle mouse enter events on a day.
 * @prop onMouseLeave - Function to handle mouse leave events.
 * @prop onWeekSelect - Function to handle week selection.
 * @prop setPreSelection - Function to set pre-selection.
 * @prop setOpen - Function to set open state.
 * @prop renderDayContents - Function to render day contents.
 * @prop renderMonthContent - Function to render month content.
 * @prop renderQuarterContent - Function to render quarter content.
 * @prop handleOnKeyDown - Function to handle key down events.
 * @prop handleOnMonthKeyDown - Function to handle key down events on a month.
 * @prop ariaLabelPrefix - Aria label prefix.
 * @prop chooseDayAriaLabelPrefix - Aria label prefix for choosing a day.
 * @prop disabledDayAriaLabelPrefix - Aria label prefix for disabled day.
 * @prop disabledKeyboardNavigation - Flag to disable keyboard navigation.
 * @prop day - The day.
 * @prop endDate - The end date.
 * @prop orderInDisplay - The order in display.
 * @prop excludeDates - Dates to exclude.
 * @prop excludeDateIntervals - Date intervals to exclude.
 * @prop fixedHeight - Flag to set fixed height.
 * @prop highlightDates - Dates to highlight.
 * @prop holidays - Holidays.
 * @prop includeDates - Dates to include.
 * @prop includeDateIntervals - Date intervals to include.
 * @prop inline - Flag to set inline.
 * @prop shouldFocusDayInline - Flag to set focus on day inline.
 * @prop locale - The locale.
 * @prop maxDate - The maximum date.
 * @prop minDate - The minimum date.
 * @prop usePointerEvent - Flag to use pointer event.
 * @prop peekNextMonth - Flag to peek next month.
 * @prop preSelection - The pre-selection.
 * @prop selected - The selected date.
 * @prop selectingDate - The selecting date.
 * @prop calendarStartDay - The calendar start day.
 * @prop selectsEnd - Flag to select end.
 * @prop selectsStart - Flag to select start.
 * @prop selectsRange - Flag to select range.
 * @prop selectsDisabledDaysInRange - Flag to select disabled days in range.
 * @prop selectsMultiple - Flag to select multiple.
 * @prop selectedDates - The selected dates.
 * @prop showWeekNumbers - Flag to show week numbers.
 * @prop startDate - The start date.
 * @prop shouldCloseOnSelect - Flag to close on select.
 * @prop showMonthYearPicker - Flag to show month year picker.
 * @prop showFullMonthYearPicker - Flag to show full month year picker.
 * @prop showTwoColumnMonthYearPicker - Flag to show two column month year picker.
 * @prop showFourColumnMonthYearPicker - Flag to show four column month year picker.
 * @prop showQuarterYearPicker - Flag to show quarter year picker.
 * @prop showWeekPicker - Flag to show week picker.
 * @prop isInputFocused - Flag to set input focus.
 * @prop weekAriaLabelPrefix - Aria label prefix for week.
 * @prop containerRef - The container reference.
 * @prop monthShowsDuplicateDaysEnd - Flag to show duplicate days at the end of the month.
 * @prop monthShowsDuplicateDaysStart - Flag to show duplicate days at the start of the month.
 *
 * @example
 * ```tsx
 * function App() {
 *  const handleDayClick = (date) => {
 *     console.log('Day clicked: ', date);
 *   };
 *
 *   const handleDayMouseEnter = (date) => {
 *     console.log('Mouse entered on day: ', date);
 *   };
 *
 *   return (
 *     <div>
 *       <Month
 *         day={new Date()}
 *         endDate={new Date()}
 *         onDayClick={handleDayClick}
 *         onDayMouseEnter={handleDayMouseEnter}
 *         disabledKeyboardNavigation={false}
 *         showWeekNumbers={true}
 *         showMonthYearPicker={false}
 *       />
 *     </div>
 *   );
 * }
 * ```
 */
export default class Month extends Component<MonthProps> {
    MONTH_REFS: React.RefObject<HTMLDivElement>[];
    QUARTER_REFS: React.RefObject<HTMLDivElement>[];
    isDisabled: (day: Date) => boolean;
    isExcluded: (day: Date) => boolean;
    handleDayClick: (day: Date, event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => void;
    handleDayMouseEnter: (day: Date) => void;
    handleMouseLeave: () => void;
    isRangeStartMonth: (m: number) => boolean;
    isRangeStartQuarter: (q: number) => boolean;
    isRangeEndMonth: (m: number) => boolean;
    isRangeEndQuarter: (q: number) => boolean;
    isInSelectingRangeMonth: (m: number) => boolean;
    isSelectingMonthRangeStart: (m: number) => boolean;
    isSelectingMonthRangeEnd: (m: number) => boolean;
    isInSelectingRangeQuarter: (q: number) => boolean;
    isWeekInMonth: (startOfWeek: Date) => boolean;
    isCurrentMonth: (day: Date, m: number) => boolean;
    isCurrentQuarter: (day: Date, q: number) => boolean;
    isSelectedMonth: (day: Date, m: number, selected: Date) => boolean;
    isSelectedQuarter: (day: Date, q: number, selected: Date) => boolean;
    renderWeeks: () => React.JSX.Element[];
    onMonthClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent> | React.KeyboardEvent<HTMLDivElement>, m: number) => void;
    onMonthMouseEnter: (m: number) => void;
    handleMonthNavigation: (newMonth: number, newDate: Date) => void;
    handleKeyboardNavigation: (event: React.KeyboardEvent<HTMLDivElement>, eventKey: KeyType, month: number) => void;
    getVerticalOffset: (monthColumnsLayout: string) => number;
    onMonthKeyDown: (event: React.KeyboardEvent<HTMLDivElement>, month: number) => void;
    onQuarterClick: (event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>, q: number) => void;
    onQuarterMouseEnter: (q: number) => void;
    handleQuarterNavigation: (newQuarter: number, newDate: Date) => void;
    onQuarterKeyDown: (event: React.KeyboardEvent<HTMLDivElement>, quarter: number) => void;
    isMonthDisabledForLabelDate: (month: number) => {
        isDisabled: boolean;
        labelDate: Date;
    };
    isMonthDisabled: (month: number) => boolean;
    getMonthClassNames: (m: number) => string;
    getTabIndex: (m: number) => "-1" | "0";
    getQuarterTabIndex: (q: number) => "-1" | "0";
    getAriaLabel: (month: number) => string;
    getQuarterClassNames: (q: number) => string;
    getMonthContent: (m: number) => React.ReactNode;
    getQuarterContent: (q: number) => string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode>;
    renderMonths: () => React.JSX.Element[] | undefined;
    renderQuarters: () => React.JSX.Element;
    getClassNames: () => string;
    render(): React.JSX.Element;
}
export {};
