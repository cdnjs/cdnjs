import React, { Component } from "react";
import { type Locale } from "./date_utils";
import InputTime from "./input_time";
import Month from "./month";
import MonthDropdown from "./month_dropdown";
import MonthYearDropdown from "./month_year_dropdown";
import Time from "./time";
import Year from "./year";
import YearDropdown from "./year_dropdown";
import type { ClickOutsideHandler } from "./click_outside_wrapper";
import type { Day } from "date-fns";
interface YearDropdownProps extends React.ComponentPropsWithoutRef<typeof YearDropdown> {
}
interface MonthDropdownProps extends React.ComponentPropsWithoutRef<typeof MonthDropdown> {
}
interface MonthYearDropdownProps extends React.ComponentPropsWithoutRef<typeof MonthYearDropdown> {
}
interface YearProps extends React.ComponentPropsWithoutRef<typeof Year> {
}
interface MonthProps extends React.ComponentPropsWithoutRef<typeof Month> {
}
interface TimeProps extends React.ComponentPropsWithoutRef<typeof Time> {
}
interface InputTimeProps extends React.ComponentPropsWithoutRef<typeof InputTime> {
}
export interface ReactDatePickerCustomHeaderProps {
    date: CalendarState["date"];
    customHeaderCount: number;
    monthDate: Date;
    changeMonth: (month: number) => void;
    changeYear: (year: number) => void;
    decreaseMonth: VoidFunction;
    increaseMonth: VoidFunction;
    decreaseYear: VoidFunction;
    increaseYear: VoidFunction;
    prevMonthButtonDisabled: boolean;
    nextMonthButtonDisabled: boolean;
    prevYearButtonDisabled: boolean;
    nextYearButtonDisabled: boolean;
}
type CalendarProps = React.PropsWithChildren<Omit<YearDropdownProps, "date" | "onChange" | "year" | "minDate" | "maxDate"> & Omit<MonthDropdownProps, "month" | "onChange"> & Omit<MonthYearDropdownProps, "date" | "onChange" | "minDate" | "maxDate"> & Omit<YearProps, "onDayClick" | "selectingDate" | "clearSelectingDate" | "onYearMouseEnter" | "onYearMouseLeave" | "minDate" | "maxDate"> & Omit<MonthProps, "ariaLabelPrefix" | "onChange" | "day" | "onDayClick" | "handleOnKeyDown" | "handleOnMonthKeyDown" | "onDayMouseEnter" | "onMouseLeave" | "orderInDisplay" | "monthShowsDuplicateDaysEnd" | "monthShowsDuplicateDaysStart" | "minDate" | "maxDate"> & Omit<TimeProps, "onChange" | "format" | "intervals" | "monthRef"> & Omit<InputTimeProps, "date" | "timeString" | "onChange"> & {
    className?: string;
    container?: React.ElementType;
    showYearPicker?: boolean;
    showMonthYearPicker?: boolean;
    showQuarterYearPicker?: boolean;
    showTimeSelect?: boolean;
    showTimeInput?: boolean;
    showYearDropdown?: boolean;
    showMonthDropdown?: boolean;
    yearItemNumber?: number;
    useWeekdaysShort?: boolean;
    forceShowMonthNavigation?: boolean;
    showDisabledMonthNavigation?: boolean;
    formatWeekDay?: (date: string) => string;
    onDropdownFocus?: (event: React.FocusEvent<HTMLDivElement>) => void;
    calendarStartDay?: Day;
    weekDayClassName?: (date: Date) => string;
    onMonthChange?: (date: Date) => void;
    onYearChange?: (date: Date) => void;
    onDayMouseEnter?: (date: Date) => void;
    onMonthMouseLeave?: VoidFunction;
    weekLabel?: string;
    onClickOutside: ClickOutsideHandler;
    outsideClickIgnoreClass?: string;
    previousMonthButtonLabel?: React.ReactNode;
    previousYearButtonLabel?: string;
    previousMonthAriaLabel?: string;
    previousYearAriaLabel?: string;
    nextMonthButtonLabel?: React.ReactNode;
    nextYearButtonLabel?: string;
    nextMonthAriaLabel?: string;
    nextYearAriaLabel?: string;
    showPreviousMonths?: boolean;
    monthsShown?: number;
    monthSelectedIn?: number;
    onSelect: (day: Date, event?: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>, monthSelectedIn?: number) => void;
    renderCustomHeader?: (props: ReactDatePickerCustomHeaderProps) => React.ReactElement;
    onYearMouseEnter?: YearProps["onYearMouseEnter"];
    onYearMouseLeave?: YearProps["onYearMouseLeave"];
    monthAriaLabelPrefix?: MonthProps["ariaLabelPrefix"];
    handleOnDayKeyDown?: MonthProps["handleOnKeyDown"];
    handleOnKeyDown?: (event: React.KeyboardEvent<HTMLDivElement> | React.KeyboardEvent<HTMLLIElement> | React.KeyboardEvent<HTMLButtonElement>) => void;
    onTimeChange?: TimeProps["onChange"] | InputTimeProps["onChange"];
    timeFormat?: TimeProps["format"];
    timeIntervals?: TimeProps["intervals"];
} & (({
    showMonthYearDropdown: true;
} & Pick<MonthYearDropdownProps, "maxDate" | "minDate">) | ({
    showMonthYearDropdown?: never;
} & Pick<YearDropdownProps, "maxDate" | "minDate"> & Pick<YearProps, "maxDate" | "minDate"> & Pick<MonthProps, "maxDate" | "minDate">))>;
interface CalendarState extends Pick<YearProps, "selectingDate">, Pick<MonthProps, "selectingDate"> {
    date: Required<YearProps>["date"];
    monthContainer: TimeProps["monthRef"];
    isRenderAriaLiveMessage: boolean;
}
export default class Calendar extends Component<CalendarProps, CalendarState> {
    static get defaultProps(): {
        monthsShown: number;
        forceShowMonthNavigation: boolean;
        timeCaption: string;
        previousYearButtonLabel: string;
        nextYearButtonLabel: string;
        previousMonthButtonLabel: string;
        nextMonthButtonLabel: string;
        yearItemNumber: number;
    };
    constructor(props: CalendarProps);
    componentDidMount(): void;
    componentDidUpdate(prevProps: CalendarProps): void;
    containerRef: React.RefObject<HTMLDivElement | null>;
    monthContainer: CalendarState["monthContainer"];
    assignMonthContainer: void | undefined;
    handleClickOutside: (event: MouseEvent) => void;
    setClickOutsideRef: () => HTMLDivElement | null;
    handleDropdownFocus: (event: React.FocusEvent<HTMLDivElement>) => void;
    getDateInView: () => Date;
    increaseMonth: () => void;
    decreaseMonth: () => void;
    handleDayClick: (day: Date, event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>, monthSelectedIn?: number) => void;
    handleDayMouseEnter: (day: Date) => void;
    handleMonthMouseLeave: () => void;
    handleYearMouseEnter: (event: React.MouseEvent<HTMLDivElement>, year: number) => void;
    handleYearMouseLeave: (event: React.MouseEvent<HTMLDivElement>, year: number) => void;
    handleYearChange: (date: Date) => void;
    getEnabledPreSelectionDateForMonth: (date: Date) => Date | null;
    handleMonthChange: (date: Date) => void;
    handleCustomMonthChange: (date: Date) => void;
    handleMonthYearChange: (date: Date) => void;
    changeYear: (year: number) => void;
    changeMonth: (month: number) => void;
    changeMonthYear: (monthYear: Date) => void;
    header: (date?: Date) => React.ReactElement[];
    formatWeekday: (day: Date, locale?: Locale) => string;
    decreaseYear: () => void;
    clearSelectingDate: () => void;
    renderPreviousButton: () => React.ReactElement | void;
    increaseYear: () => void;
    renderNextButton: () => React.ReactElement | void;
    renderCurrentMonth: (date?: Date) => React.ReactElement;
    renderYearDropdown: (overrideHide?: boolean) => React.ReactElement | undefined;
    renderMonthDropdown: (overrideHide?: boolean) => React.ReactElement | undefined;
    renderMonthYearDropdown: (overrideHide?: boolean) => React.ReactElement | undefined;
    handleTodayButtonClick: (event: React.MouseEvent<HTMLDivElement>) => void;
    renderTodayButton: () => React.ReactElement | undefined;
    renderDefaultHeader: ({ monthDate, i }: {
        monthDate: Date;
        i: number;
    }) => React.JSX.Element;
    renderCustomHeader: (headerArgs: {
        monthDate: Date;
        i: number;
    }) => React.JSX.Element | null;
    renderYearHeader: ({ monthDate, }: {
        monthDate: Date;
    }) => React.ReactElement;
    renderHeader: ({ monthDate, i, }: {
        monthDate: Date;
        i?: number;
    }) => React.ReactElement | null;
    renderMonths: () => React.ReactElement[] | undefined;
    renderYears: () => React.ReactElement | undefined;
    renderTimeSection: () => React.ReactElement | undefined;
    renderInputTimeSection: () => React.ReactElement | undefined;
    renderAriaLiveRegion: () => React.ReactElement;
    renderChildren: () => React.ReactElement | undefined;
    render(): React.ReactElement;
}
export {};
