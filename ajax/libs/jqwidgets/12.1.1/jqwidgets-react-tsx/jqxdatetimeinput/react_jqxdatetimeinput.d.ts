import * as React from 'react';
declare class JqxDateTimeInput extends React.PureComponent<IDateTimeInputProps, IState> {
    protected static getDerivedStateFromProps(props: IDateTimeInputProps, state: IState): null | IState;
    private _jqx;
    private _id;
    private _componentSelector;
    constructor(props: IDateTimeInputProps);
    componentDidMount(): void;
    componentDidUpdate(): void;
    render(): React.ReactNode;
    setOptions(options: IDateTimeInputProps): void;
    getOptions(option: string): any;
    close(): void;
    destroy(): void;
    focus(): void;
    getRange(): any;
    getText(): string;
    getDate(): any;
    getMaxDate(): any;
    getMinDate(): any;
    open(): void;
    setRange(date: any, date2: any): void;
    setMinDate(date: any): void;
    setMaxDate(date: any): void;
    setDate(date: any): void;
    val(value?: any): any;
    private _manageProps;
    private _wireEvents;
}
export default JqxDateTimeInput;
export declare const jqx: any;
export declare const JQXLite: any;
interface IState {
    lastProps: object;
}
interface IDateTimeInputOptions {
    animationType?: 'fade' | 'slide' | 'none';
    allowNullDate?: boolean;
    allowKeyboardDelete?: boolean;
    clearString?: string;
    culture?: string;
    closeDelay?: number;
    closeCalendarAfterSelection?: boolean;
    dropDownHorizontalAlignment?: 'left' | 'right';
    dropDownVerticalAlignment?: 'top' | 'bottom';
    disabled?: boolean;
    enableBrowserBoundsDetection?: boolean;
    enableAbsoluteSelection?: boolean;
    editMode?: string;
    firstDayOfWeek?: number;
    formatString?: string;
    height?: string | number;
    min?: Date;
    max?: Date;
    openDelay?: number;
    placeHolder?: string;
    popupZIndex?: number;
    rtl?: boolean;
    readonly?: boolean;
    showFooter?: boolean;
    selectionMode?: 'none' | 'default' | 'range';
    showWeekNumbers?: boolean;
    showTimeButton?: boolean;
    showCalendarButton?: boolean;
    showDeleteButton?: boolean;
    theme?: string;
    template?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
    textAlign?: 'left' | 'right' | 'center';
    todayString?: string;
    value?: Date | null;
    width?: string | number;
    yearCutoff?: number;
}
export interface IDateTimeInputProps extends IDateTimeInputOptions {
    className?: string;
    style?: React.CSSProperties;
    onChange?: (e?: Event) => void;
    onClose?: (e?: Event) => void;
    onOpen?: (e?: Event) => void;
    onTextchanged?: (e?: Event) => void;
    onValueChanged?: (e?: Event) => void;
}
