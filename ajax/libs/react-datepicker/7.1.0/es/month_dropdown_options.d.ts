import { Component } from "react";
interface MonthDropdownOptionsProps {
    onCancel: VoidFunction;
    onChange: (month: number) => void;
    month: number;
    monthNames: string[];
}
export default class MonthDropdownOptions extends Component<MonthDropdownOptionsProps> {
    isSelectedMonth: (i: number) => boolean;
    renderOptions: () => JSX.Element[];
    onChange: (month: number) => void;
    handleClickOutside: () => void;
    render(): JSX.Element;
}
export {};
