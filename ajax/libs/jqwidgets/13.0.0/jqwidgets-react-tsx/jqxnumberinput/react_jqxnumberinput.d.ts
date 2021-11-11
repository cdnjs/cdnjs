import * as React from 'react';
declare class JqxNumberInput extends React.PureComponent<INumberInputProps, IState> {
    protected static getDerivedStateFromProps(props: INumberInputProps, state: IState): null | IState;
    private _jqx;
    private _id;
    private _componentSelector;
    constructor(props: INumberInputProps);
    componentDidMount(): void;
    componentDidUpdate(): void;
    render(): React.ReactNode;
    setOptions(options: INumberInputProps): void;
    getOptions(option: string): any;
    clear(): void;
    destroy(): void;
    focus(): void;
    getDecimal(): number;
    setDecimal(index: number | string): void;
    val(value?: any): any;
    private _manageProps;
    private _wireEvents;
}
export default JqxNumberInput;
export declare const jqx: any;
export declare const JQXLite: any;
interface IState {
    lastProps: object;
}
interface INumberInputOptions {
    allowNull?: boolean;
    decimal?: number | string;
    disabled?: boolean;
    decimalDigits?: number | string;
    decimalSeparator?: number | string;
    digits?: number | string;
    groupSeparator?: string;
    groupSize?: number | string;
    height?: string | number;
    inputMode?: 'advanced' | 'simple';
    min?: number | string;
    max?: number | string;
    negativeSymbol?: string;
    placeHolder?: number | string;
    promptChar?: '_' | '?' | ';' | '#';
    rtl?: boolean;
    readOnly?: boolean;
    spinMode?: 'advanced' | 'simple';
    spinButtons?: boolean;
    spinButtonsWidth?: number;
    spinButtonsStep?: number | string;
    symbol?: string;
    symbolPosition?: 'left' | 'right';
    textAlign?: 'left' | 'right' | 'center';
    template?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
    theme?: string;
    value?: number | string;
    width?: string | number;
}
export interface INumberInputProps extends INumberInputOptions {
    className?: string;
    style?: React.CSSProperties;
    onChange?: (e?: Event) => void;
    onTextchanged?: (e?: Event) => void;
    onValueChanged?: (e?: Event) => void;
}
