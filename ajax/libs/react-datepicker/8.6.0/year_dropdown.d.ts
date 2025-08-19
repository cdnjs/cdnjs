import React, { Component } from "react";
import YearDropdownOptions from "./year_dropdown_options";
interface YearDropdownOptionsProps extends React.ComponentPropsWithoutRef<typeof YearDropdownOptions> {
}
interface YearDropdownProps extends Omit<YearDropdownOptionsProps, "onChange" | "onCancel"> {
    adjustDateOnChange?: boolean;
    dropdownMode: "scroll" | "select";
    onChange: (year: number) => void;
    date: Date;
    onSelect?: (date: Date, event?: React.MouseEvent<HTMLButtonElement>) => void;
    setOpen?: (open: boolean) => void;
}
interface YearDropdownState {
    dropdownVisible: boolean;
}
export default class YearDropdown extends Component<YearDropdownProps, YearDropdownState> {
    state: YearDropdownState;
    renderSelectOptions: () => React.ReactElement[];
    onSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    renderSelectMode: () => React.ReactElement;
    renderReadView: (visible: boolean) => React.ReactElement;
    renderDropdown: () => React.ReactElement;
    renderScrollMode: () => React.ReactElement[];
    onChange: (year: number) => void;
    toggleDropdown: (event?: React.MouseEvent<HTMLButtonElement>) => void;
    handleYearChange: (date: Date, event?: React.MouseEvent<HTMLButtonElement>) => void;
    onSelect: (date: Date, event?: React.MouseEvent<HTMLButtonElement>) => void;
    setOpen: () => void;
    render(): React.ReactElement;
}
export {};
