import * as React from 'react';
declare class JqxTimePicker extends React.PureComponent<ITimePickerProps, IState> {
    protected static getDerivedStateFromProps(props: ITimePickerProps, state: IState): null | IState;
    private _jqx;
    private _id;
    private _componentSelector;
    constructor(props: ITimePickerProps);
    componentDidMount(): void;
    componentDidUpdate(): void;
    render(): React.ReactNode;
    setOptions(options: ITimePickerProps): void;
    getOptions(option: string): any;
    setHours(hours: number): void;
    setMinutes(minutes: number): void;
    private _manageProps;
    private _wireEvents;
}
export default JqxTimePicker;
export declare const jqx: any;
export declare const JQXLite: any;
interface IState {
    lastProps: object;
}
interface ITimePickerOptions {
    autoSwitchToMinutes?: boolean;
    disabled?: boolean;
    footer?: boolean;
    footerTemplate?: string;
    format?: string;
    height?: number | string;
    minuteInterval?: number;
    name?: string;
    readonly?: boolean;
    selection?: 'hour' | 'minute';
    theme?: string;
    unfocusable?: boolean;
    value?: any;
    view?: 'landscape' | 'portrait';
    width?: number | string;
}
export interface ITimePickerProps extends ITimePickerOptions {
    className?: string;
    style?: React.CSSProperties;
    onChange?: (e?: Event) => void;
}
