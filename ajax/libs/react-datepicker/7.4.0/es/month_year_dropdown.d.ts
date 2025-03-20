import React, { Component } from "react";
import { type Locale } from "./date_utils";
import MonthYearDropdownOptions from "./month_year_dropdown_options";
interface MonthYearDropdownOptionsProps extends React.ComponentPropsWithoutRef<typeof MonthYearDropdownOptions> {
}
interface MonthYearDropdownProps extends Omit<MonthYearDropdownOptionsProps, "onChange" | "onCancel"> {
    dropdownMode: "scroll" | "select";
    onChange: (monthYear: Date) => void;
    locale?: Locale;
}
interface MonthYearDropdownState {
    dropdownVisible: boolean;
}
export default class MonthYearDropdown extends Component<MonthYearDropdownProps, MonthYearDropdownState> {
    state: MonthYearDropdownState;
    renderSelectOptions: () => JSX.Element[];
    onSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    renderSelectMode: () => JSX.Element;
    renderReadView: (visible: boolean) => JSX.Element;
    renderDropdown: () => JSX.Element;
    renderScrollMode: () => JSX.Element[];
    onChange: (monthYearPoint: number) => void;
    toggleDropdown: () => void;
    render(): JSX.Element;
}
export {};
