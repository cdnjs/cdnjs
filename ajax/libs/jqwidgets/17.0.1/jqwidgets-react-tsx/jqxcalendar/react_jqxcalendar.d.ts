import * as React from 'react';
declare class JqxCalendar extends React.PureComponent<ICalendarProps, IState> {
    protected static getDerivedStateFromProps(props: ICalendarProps, state: IState): null | IState;
    private _jqx;
    private _id;
    private _componentSelector;
    constructor(props: ICalendarProps);
    componentDidMount(): void;
    componentDidUpdate(): void;
    render(): React.ReactNode;
    setOptions(options: ICalendarProps): void;
    getOptions(option: string): any;
    clear(): void;
    destroy(): void;
    focus(): void;
    addSpecialDate(date: any, specialDateClass: any, text: any): void;
    getMinDate(): any;
    getMaxDate(): any;
    getDate(): any;
    getRange(): any;
    navigateForward(months: number): void;
    navigateBackward(months: number): void;
    renderWidget(): void;
    refresh(): void;
    setMinDate(date: any): void;
    setMaxDate(date: any): void;
    setDate(date: any): void;
    setRange(date: any, date2: any): void;
    today(): void;
    val(value?: any): any;
    private _manageProps;
    private _wireEvents;
}
export default JqxCalendar;
export declare const jqx: any;
export declare const JQXLite: any;
interface IState {
    lastProps: object;
}
interface ICalendarOptions {
    backText?: string;
    columnHeaderHeight?: number;
    clearString?: string;
    culture?: string;
    dayNameFormat?: 'default' | 'shortest' | 'firstTwoLetters' | 'firstLetter' | 'full';
    disabled?: boolean;
    enableWeekend?: boolean;
    enableViews?: boolean;
    enableOtherMonthDays?: boolean;
    enableFastNavigation?: boolean;
    enableHover?: boolean;
    enableAutoNavigation?: boolean;
    enableTooltips?: boolean;
    forwardText?: string;
    firstDayOfWeek?: number;
    height?: string | number;
    min?: any;
    max?: any;
    navigationDelay?: number;
    rowHeaderWidth?: number | string;
    readOnly?: boolean;
    restrictedDates?: Date[];
    rtl?: boolean;
    stepMonths?: number;
    showWeekNumbers?: boolean;
    showDayNames?: boolean;
    showOtherMonthDays?: boolean;
    showFooter?: boolean;
    selectionMode?: 'none' | 'default' | 'range';
    specialDates?: any[];
    theme?: string;
    titleHeight?: number;
    titleFormat?: 'd' | 'dd' | 'ddd' | 'dddd' | 'h' | 'hh' | 'H' | 'HH' | 'm' | 'mm' | 'M' | 'MM' | 'MMM' | 'MMMM' | 's' | 'ss' | 't' | 'tt' | 'y' | 'yy' | 'yyy' | 'yyyy';
    todayString?: string;
    value?: Date;
    width?: string | number;
}
export interface ICalendarProps extends ICalendarOptions {
    className?: string;
    style?: React.CSSProperties;
    onBackButtonClick?: (e?: Event) => void;
    onChange?: (e?: Event) => void;
    onNextButtonClick?: (e?: Event) => void;
    onViewChange?: (e?: Event) => void;
}
