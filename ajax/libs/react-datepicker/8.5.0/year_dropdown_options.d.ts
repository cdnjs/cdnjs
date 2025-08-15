import React, { Component } from "react";
interface YearDropdownOptionsProps {
    minDate?: Date;
    maxDate?: Date;
    onChange: (year: number) => void;
    onCancel: VoidFunction;
    scrollableYearDropdown?: boolean;
    year: number;
    yearDropdownItemNumber?: number;
}
interface YearDropdownOptionsState {
    yearsList: number[];
}
export default class YearDropdownOptions extends Component<YearDropdownOptionsProps, YearDropdownOptionsState> {
    constructor(props: YearDropdownOptionsProps);
    componentDidMount(): void;
    dropdownRef: React.RefObject<HTMLDivElement | null>;
    renderOptions: () => React.ReactElement[];
    onChange: (year: number) => void;
    handleClickOutside: () => void;
    shiftYears: (amount: number) => void;
    incrementYears: () => void;
    decrementYears: () => void;
    render(): React.JSX.Element;
}
export {};
