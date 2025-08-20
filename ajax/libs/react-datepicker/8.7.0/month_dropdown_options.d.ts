import React, { Component } from "react";
interface MonthDropdownOptionsProps {
    onCancel: VoidFunction;
    onChange: (month: number) => void;
    month: number;
    monthNames: string[];
}
export default class MonthDropdownOptions extends Component<MonthDropdownOptionsProps> {
    monthOptionButtonsRef: Record<number, HTMLDivElement | null>;
    isSelectedMonth: (i: number) => boolean;
    handleOptionKeyDown: (i: number, e: React.KeyboardEvent) => void;
    renderOptions: () => React.ReactElement[];
    onChange: (month: number) => void;
    handleClickOutside: () => void;
    render(): React.ReactElement;
}
export {};
