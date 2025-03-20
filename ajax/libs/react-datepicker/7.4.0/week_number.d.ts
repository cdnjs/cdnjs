import React, { Component } from "react";
interface WeekNumberProps {
    weekNumber: number;
    date: Date;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    ariaLabelPrefix?: string;
    selected?: Date | null;
    preSelection?: Date | null;
    showWeekPicker?: boolean;
    showWeekNumber?: boolean;
    disabledKeyboardNavigation?: boolean;
    inline?: boolean;
    shouldFocusDayInline?: boolean;
    handleOnKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
    containerRef?: React.RefObject<HTMLDivElement>;
    isInputFocused?: boolean;
}
export default class WeekNumber extends Component<WeekNumberProps> {
    static get defaultProps(): {
        ariaLabelPrefix: string;
    };
    componentDidMount(): void;
    componentDidUpdate(prevProps: WeekNumberProps): void;
    weekNumberEl: React.RefObject<HTMLDivElement>;
    handleClick: (event: React.MouseEvent<HTMLDivElement>) => void;
    handleOnKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
    isKeyboardSelected: () => boolean;
    getTabIndex: () => number;
    handleFocusWeekNumber: (prevProps?: Partial<WeekNumberProps>) => void;
    render(): JSX.Element;
}
export {};
