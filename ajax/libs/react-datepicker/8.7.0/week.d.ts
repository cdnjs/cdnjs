import React, { Component } from "react";
import Day from "./day";
import WeekNumber from "./week_number";
interface DayProps extends React.ComponentPropsWithoutRef<typeof Day> {
}
interface WeekNumberProps extends React.ComponentPropsWithoutRef<typeof WeekNumber> {
}
interface WeekProps extends Omit<DayProps, "ariaLabelPrefixWhenEnabled" | "ariaLabelPrefixWhenDisabled" | "day" | "onClick" | "onMouseEnter">, Omit<WeekNumberProps, "weekNumber" | "date" | "onClick"> {
    day: Date;
    chooseDayAriaLabelPrefix?: DayProps["ariaLabelPrefixWhenEnabled"];
    disabledDayAriaLabelPrefix?: DayProps["ariaLabelPrefixWhenDisabled"];
    onDayClick?: (day: Date, event: React.MouseEvent<HTMLDivElement>) => void;
    onDayMouseEnter?: (day: Date) => void;
    shouldCloseOnSelect?: boolean;
    setOpen?: (open: boolean) => void;
    formatWeekNumber?: (date: Date) => number;
    onWeekSelect?: (day: Date, weekNumber: number, event: React.MouseEvent<HTMLDivElement>) => void;
    weekClassName?: (date: Date) => string;
}
export default class Week extends Component<WeekProps> {
    static get defaultProps(): {
        shouldCloseOnSelect: boolean;
    };
    isDisabled: (day: Date) => boolean;
    handleDayClick: (day: Date, event: React.MouseEvent<HTMLDivElement>) => void;
    handleDayMouseEnter: (day: Date) => void;
    handleWeekClick: (day: Date, weekNumber: number, event: React.MouseEvent<HTMLDivElement>) => void;
    formatWeekNumber: (date: Date) => number;
    isWeekDisabled: () => boolean;
    renderDays: () => React.JSX.Element[];
    startOfWeek: () => Date;
    isKeyboardSelected: () => boolean;
    render(): React.ReactElement;
}
export {};
