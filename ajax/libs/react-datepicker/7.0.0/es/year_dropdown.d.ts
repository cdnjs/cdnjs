import React, { Component } from "react";
import YearDropdownOptions from "./year_dropdown_options";
interface YearDropdownOptionsProps extends React.ComponentPropsWithoutRef<typeof YearDropdownOptions> {
}
interface YearDropdownProps extends Omit<YearDropdownOptionsProps, "onChange" | "onCancel"> {
    adjustDateOnChange?: boolean;
    dropdownMode: "scroll" | "select";
    onChange: (year: number) => void;
    date: Date;
    onSelect?: (date: Date, event?: React.MouseEvent<HTMLDivElement>) => void;
    setOpen?: (open: boolean) => void;
}
interface YearDropdownState {
    dropdownVisible: boolean;
}
export default class YearDropdown extends Component<YearDropdownProps, YearDropdownState> {
    state: YearDropdownState;
    renderSelectOptions: () => JSX.Element[];
    onSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    renderSelectMode: () => JSX.Element;
    renderReadView: (visible: boolean) => JSX.Element;
    renderDropdown: () => JSX.Element;
    renderScrollMode: () => JSX.Element[];
    onChange: (year: number) => void;
    toggleDropdown: (event?: React.MouseEvent<HTMLDivElement>) => void;
    handleYearChange: (date: Date, event?: React.MouseEvent<HTMLDivElement>) => void;
    onSelect: (date: Date, event?: React.MouseEvent<HTMLDivElement>) => void;
    setOpen: () => void;
    render(): JSX.Element;
}
export {};
