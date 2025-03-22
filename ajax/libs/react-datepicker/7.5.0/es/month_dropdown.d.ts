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
    renderSelectOptions: (monthNames: string[]) => JSX.Element[];
    renderSelectMode: (monthNames: string[]) => JSX.Element;
    renderReadView: (visible: boolean, monthNames: string[]) => JSX.Element;
    renderDropdown: (monthNames: string[]) => JSX.Element;
    renderScrollMode: (monthNames: string[]) => JSX.Element[];
    onChange: (month: number) => void;
    toggleDropdown: () => void;
    render(): JSX.Element;
}
export {};
