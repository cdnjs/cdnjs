import React, { Component } from "react";
import { type DateFilterOptions, type DateNumberType, type Locale, type HolidaysMap } from "./date_utils";
interface DayProps extends Pick<DateFilterOptions, "minDate" | "maxDate" | "excludeDates" | "excludeDateIntervals" | "includeDateIntervals" | "includeDates" | "filterDate"> {
    ariaLabelPrefixWhenEnabled?: string;
    ariaLabelPrefixWhenDisabled?: string;
    disabledKeyboardNavigation?: boolean;
    day: Date;
    dayClassName?: (date: Date) => string;
    highlightDates?: Map<string, string[]>;
    holidays?: HolidaysMap;
    inline?: boolean;
    shouldFocusDayInline?: boolean;
    month: number;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
    handleOnKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
    usePointerEvent?: boolean;
    preSelection?: Date | null;
    selected?: Date | null;
    selectingDate?: Date;
    selectsEnd?: boolean;
    selectsStart?: boolean;
    selectsRange?: boolean;
    showWeekPicker?: boolean;
    showWeekNumber?: boolean;
    selectsDisabledDaysInRange?: boolean;
    selectsMultiple?: boolean;
    selectedDates?: Date[];
    startDate?: Date | null;
    endDate?: Date | null;
    renderDayContents?: (day: number, date: Date) => React.ReactNode;
    containerRef?: React.RefObject<HTMLDivElement | null>;
    calendarStartDay?: DateNumberType;
    locale?: Locale;
    monthShowsDuplicateDaysEnd?: boolean;
    monthShowsDuplicateDaysStart?: boolean;
}
/**
 * `Day` is a React component that represents a single day in a date picker.
 * It handles the rendering and interaction of a day.
 *
 * @prop ariaLabelPrefixWhenEnabled - Aria label prefix when the day is enabled.
 * @prop ariaLabelPrefixWhenDisabled - Aria label prefix when the day is disabled.
 * @prop disabledKeyboardNavigation - Whether keyboard navigation is disabled.
 * @prop day - The day to be displayed.
 * @prop dayClassName - Function to customize the CSS class of the day.
 * @prop endDate - The end date in a range.
 * @prop highlightDates - Map of dates to be highlighted.
 * @prop holidays - Map of holiday dates.
 * @prop inline - Whether the date picker is inline.
 * @prop shouldFocusDayInline - Whether the day should be focused when date picker is inline.
 * @prop month - The month the day belongs to.
 * @prop onClick - Click event handler.
 * @prop onMouseEnter - Mouse enter event handler.
 * @prop handleOnKeyDown - Key down event handler.
 * @prop usePointerEvent - Whether to use pointer events.
 * @prop preSelection - The date that is currently selected.
 * @prop selected - The selected date.
 * @prop selectingDate - The date currently being selected.
 * @prop selectsEnd - Whether the day can be the end date in a range.
 * @prop selectsStart - Whether the day can be the start date in a range.
 * @prop selectsRange - Whether the day can be in a range.
 * @prop showWeekPicker - Whether to show week picker.
 * @prop showWeekNumber - Whether to show week numbers.
 * @prop selectsDisabledDaysInRange - Whether to select disabled days in a range.
 * @prop selectsMultiple - Whether to allow multiple date selection.
 * @prop selectedDates - Array of selected dates.
 * @prop startDate - The start date in a range.
 * @prop renderDayContents - Function to customize the rendering of the day's contents.
 * @prop containerRef - Ref for the container.
 * @prop excludeDates - Array of dates to be excluded.
 * @prop calendarStartDay - The start day of the week.
 * @prop locale - The locale object.
 * @prop monthShowsDuplicateDaysEnd - Whether to show duplicate days at the end of the month.
 * @prop monthShowsDuplicateDaysStart - Whether to show duplicate days at the start of the month.
 * @prop includeDates - Array of dates to be included.
 * @prop includeDateIntervals - Array of date intervals to be included.
 * @prop minDate - The minimum date that can be selected.
 * @prop maxDate - The maximum date that can be selected.
 *
 * @example
 * ```tsx
 * import React from 'react';
 * import Day from './day';
 *
 * function MyComponent() {
 *   const handleDayClick = (event) => {
 *     console.log('Day clicked', event);
 *   };
 *
 *   const handleDayMouseEnter = (event) => {
 *     console.log('Mouse entered day', event);
 *   };
 *
 *   const renderDayContents = (date) => {
 *     return <div>{date.getDate()}</div>;
 *   };
 *
 *   return (
 *     <Day
 *       day={new Date()}
 *       onClick={handleDayClick}
 *       onMouseEnter={handleDayMouseEnter}
 *       renderDayContents={renderDayContents}
 *     />
 *   );
 * }
 *
 * export default MyComponent;
 * ```
 */
export default class Day extends Component<DayProps> {
    componentDidMount(): void;
    componentDidUpdate(): void;
    dayEl: React.RefObject<HTMLDivElement | null>;
    handleClick: DayProps["onClick"];
    handleMouseEnter: DayProps["onMouseEnter"];
    handleOnKeyDown: React.KeyboardEventHandler<HTMLDivElement>;
    isSameDay: (other: Date | null | undefined) => boolean;
    isKeyboardSelected: () => boolean | undefined;
    isDisabled: (day?: Date) => boolean;
    isExcluded: () => boolean;
    isStartOfWeek: () => boolean;
    isSameWeek: (other?: Date | null) => boolean | undefined;
    isSameDayOrWeek: (other?: Date | null) => boolean | undefined;
    getHighLightedClass: () => false | string[] | undefined;
    getHolidaysClass: () => (string | undefined)[];
    isInRange: () => boolean;
    isInSelectingRange: () => boolean;
    isSelectingRangeStart: () => boolean;
    isSelectingRangeEnd: () => boolean;
    isRangeStart: () => boolean;
    isRangeEnd: () => boolean;
    isWeekend: () => boolean;
    isAfterMonth: () => boolean;
    isBeforeMonth: () => boolean;
    isCurrentDay: () => boolean;
    isSelected: () => boolean | undefined;
    getClassNames: (date: Date) => string;
    getAriaLabel: () => string;
    getTitle: () => string;
    getTabIndex: () => 0 | -1;
    handleFocusDay: () => void;
    private shouldFocusDay;
    private isDayActiveElement;
    private isDuplicateDay;
    renderDayContents: () => React.ReactNode;
    render: () => React.JSX.Element;
}
export {};
