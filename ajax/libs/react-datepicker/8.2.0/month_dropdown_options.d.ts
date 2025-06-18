import React, { Component } from "react";
interface MonthDropdownOptionsProps {
    onCancel: VoidFunction;
    onChange: (month: number) => void;
    month: number;
    monthNames: string[];
}
export default class MonthDropdownOptions extends Component<MonthDropdownOptionsProps> {
    isSelectedMonth: (i: number) => boolean;
    renderOptions: () => React.ReactElement[];
    onChange: (month: number) => void;
    handleClickOutside: () => void;
    render(): React.ReactElement;
}
export {};
