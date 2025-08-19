import React, { Component } from "react";
import { type Locale, type TimeFilterOptions } from "./date_utils";
interface TimeProps extends Pick<TimeFilterOptions, "minTime" | "maxTime" | "excludeTimes" | "includeTimes" | "filterTime"> {
    format?: string;
    intervals?: number;
    selected?: Date | null;
    openToDate?: Date;
    onChange?: (time: Date) => void;
    timeClassName?: (time: Date) => string;
    todayButton?: React.ReactNode;
    monthRef?: HTMLDivElement;
    timeCaption?: string;
    injectTimes?: Date[];
    handleOnKeyDown?: React.KeyboardEventHandler<HTMLLIElement>;
    locale?: Locale;
    showTimeSelectOnly?: boolean;
    showTimeCaption?: boolean;
}
interface TimeState {
    height: number | null;
}
export default class Time extends Component<TimeProps, TimeState> {
    static get defaultProps(): {
        intervals: number;
        todayButton: null;
        timeCaption: string;
        showTimeCaption: boolean;
    };
    static calcCenterPosition: (listHeight: number, centerLiRef: HTMLLIElement) => number;
    private resizeObserver?;
    state: TimeState;
    componentDidMount(): void;
    componentWillUnmount(): void;
    private header?;
    private list?;
    private centerLi?;
    private observeDatePickerHeightChanges;
    private updateContainerHeight;
    scrollToTheSelectedTime: () => void;
    handleClick: (time: Date) => void;
    isSelectedTime: (time: Date) => boolean | null | undefined;
    isDisabledTime: (time: Date) => boolean | undefined;
    liClasses: (time: Date) => string;
    handleOnKeyDown: (event: React.KeyboardEvent<HTMLLIElement>, time: Date) => void;
    renderTimes: () => React.ReactElement[];
    renderTimeCaption: () => React.ReactElement;
    render(): React.JSX.Element;
}
export {};
