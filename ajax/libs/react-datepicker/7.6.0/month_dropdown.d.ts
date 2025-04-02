import React, { Component } from "react";
import { type Locale } from "./date_utils";
import MonthDropdownOptions from "./month_dropdown_options";
interface MonthDropdownOptionsProps extends React.ComponentPropsWithoutRef<typeof MonthDropdownOptions> {
}
interface MonthDropdownProps extends Omit<MonthDropdownOptionsProps, "monthNames" | "onChange" | "onCancel"> {
    dropdownMode: "scroll" | "select";
    locale?: Locale;
    onChange: (month: number) => void;
    useShortMonthInDropdown?: boolean;
}
interface MonthDropdownState {
    dropdownVisible: boolean;
}
export default class MonthDropdown extends Component<MonthDropdownProps, MonthDropdownState> {
    state: MonthDropdownState;
    renderSelectOptions: (monthNames: string[]) => React.ReactElement[];
    renderSelectMode: (monthNames: string[]) => React.ReactElement;
    renderReadView: (visible: boolean, monthNames: string[]) => React.ReactElement;
    renderDropdown: (monthNames: string[]) => React.ReactElement;
    renderScrollMode: (monthNames: string[]) => React.ReactElement[];
    onChange: (month: number) => void;
    toggleDropdown: () => void;
    render(): React.ReactElement;
}
export {};
