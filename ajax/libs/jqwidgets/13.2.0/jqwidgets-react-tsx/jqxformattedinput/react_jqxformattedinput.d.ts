import * as React from 'react';
declare class JqxFormattedInput extends React.PureComponent<IFormattedInputProps, IState> {
    protected static getDerivedStateFromProps(props: IFormattedInputProps, state: IState): null | IState;
    private _jqx;
    private _id;
    private _componentSelector;
    constructor(props: IFormattedInputProps);
    componentDidMount(): void;
    componentDidUpdate(): void;
    render(): React.ReactNode;
    setOptions(options: IFormattedInputProps): void;
    getOptions(option: string): any;
    close(): void;
    destroy(): void;
    focus(): void;
    open(): void;
    renderWidget(): void;
    refresh(): void;
    selectAll(): void;
    selectFirst(): void;
    selectLast(): void;
    val(value?: any): any;
    private _manageProps;
    private _wireEvents;
}
export default JqxFormattedInput;
export declare const jqx: any;
export declare const JQXLite: any;
interface IState {
    lastProps: object;
}
interface IFormattedInputOptions {
    disabled?: boolean;
    decimalNotation?: 'default' | 'exponential';
    dropDown?: boolean;
    dropDownWidth?: number | string;
    height?: number | string;
    min?: number | string;
    max?: number | string;
    placeHolder?: string;
    popupZIndex?: number;
    roundedCorners?: boolean;
    rtl?: boolean;
    radix?: number | string;
    spinButtons?: boolean;
    spinButtonsStep?: number;
    template?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
    theme?: string;
    upperCase?: boolean;
    value?: number | string;
    width?: number | string;
}
export interface IFormattedInputProps extends IFormattedInputOptions {
    className?: string;
    style?: React.CSSProperties;
    onChange?: (e?: Event) => void;
    onClose?: (e?: Event) => void;
    onOpen?: (e?: Event) => void;
    onRadixChange?: (e?: Event) => void;
}
