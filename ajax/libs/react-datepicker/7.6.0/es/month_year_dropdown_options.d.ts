import React, { Component } from "react";
import { type Locale } from "./date_utils";
interface MonthYearDropdownOptionsProps {
    minDate: Date;
    maxDate: Date;
    onCancel: VoidFunction;
    onChange: (monthYear: number) => void;
    scrollableMonthYearDropdown?: boolean;
    date: Date;
    dateFormat: string;
    locale?: Locale;
}
interface MonthYearDropdownOptionsState {
    monthYearsList: Date[];
}
export default class MonthYearDropdownOptions extends Component<MonthYearDropdownOptionsProps, MonthYearDropdownOptionsState> {
    constructor(props: MonthYearDropdownOptionsProps);
    renderOptions: () => React.ReactElement[];
    onChange: (monthYear: number) => void;
    handleClickOutside: () => void;
    render(): React.ReactElement;
}
export {};
