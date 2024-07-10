import React, { Component } from "react";
import { type DateFilterOptions } from "./date_utils";
interface YearProps extends Pick<DateFilterOptions, "minDate" | "maxDate" | "excludeDates" | "includeDates" | "filterDate"> {
    clearSelectingDate?: VoidFunction;
    date?: Date;
    disabledKeyboardNavigation?: boolean;
    endDate?: Date;
    onDayClick?: (date: Date, event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => void;
    preSelection?: Date | null;
    setPreSelection?: (date?: Date | null) => void;
    selected?: Date | null;
    inline?: boolean;
    usePointerEvent?: boolean;
    onYearMouseEnter: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, year: number) => void;
    onYearMouseLeave: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, year: number) => void;
    selectingDate?: Date;
    renderYearContent?: (year: number) => React.ReactNode;
    selectsEnd?: boolean;
    selectsStart?: boolean;
    selectsRange?: boolean;
    startDate?: Date;
    yearItemNumber?: number;
    handleOnKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
    yearClassName?: (date: Date) => string;
}
/**
 * `Year` is a component that represents a year in a date picker.
 *
 * @class
 * @param {YearProps} props - The properties that define the `Year` component.
 * @property {VoidFunction} [props.clearSelectingDate] - Function to clear the selected date.
 * @property {Date} [props.date] - The currently selected date.
 * @property {boolean} [props.disabledKeyboardNavigation] - If true, keyboard navigation is disabled.
 * @property {Date} [props.endDate] - The end date in a range selection.
 * @property {(date: Date) => void} props.onDayClick - Function to handle day click events.
 * @property {Date} props.preSelection - The date that is currently in focus.
 * @property {(date: Date) => void} props.setPreSelection - Function to set the pre-selected date.
 * @property {{ [key: string]: any }} props.selected - The selected date(s).
 * @property {boolean} props.inline - If true, the date picker is displayed inline.
 * @property {Date} props.maxDate - The maximum selectable date.
 * @property {Date} props.minDate - The minimum selectable date.
 * @property {boolean} props.usePointerEvent - If true, pointer events are used instead of mouse events.
 * @property {(date: Date) => void} props.onYearMouseEnter - Function to handle mouse enter events on a year.
 * @property {(date: Date) => void} props.onYearMouseLeave - Function to handle mouse leave events on a year.
 */
export default class Year extends Component<YearProps> {
    constructor(props: YearProps);
    YEAR_REFS: React.RefObject<HTMLDivElement>[];
    isDisabled: (date: Date) => boolean;
    isExcluded: (date: Date) => boolean;
    selectingDate: () => Date | null | undefined;
    updateFocusOnPaginate: (refIndex: number) => void;
    handleYearClick: (day: Date, event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => void;
    handleYearNavigation: (newYear: number, newDate: Date) => void;
    isSameDay: (y: Date, other: Date) => boolean;
    isCurrentYear: (y: number) => boolean;
    isRangeStart: (y: number) => boolean | undefined;
    isRangeEnd: (y: number) => boolean | undefined;
    isInRange: (y: number) => boolean;
    isInSelectingRange: (y: number) => boolean;
    isSelectingRangeStart: (y: number) => boolean;
    isSelectingRangeEnd: (y: number) => boolean;
    isKeyboardSelected: (y: number) => boolean | undefined;
    onYearClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent> | React.KeyboardEvent<HTMLDivElement>, y: number) => void;
    onYearKeyDown: (event: React.KeyboardEvent<HTMLDivElement>, y: number) => void;
    getYearClassNames: (y: number) => string;
    getYearTabIndex: (y: number) => "-1" | "0";
    getYearContainerClassNames: () => string;
    getYearContent: (y: number) => React.ReactNode;
    render(): React.JSX.Element | null;
}
export {};
