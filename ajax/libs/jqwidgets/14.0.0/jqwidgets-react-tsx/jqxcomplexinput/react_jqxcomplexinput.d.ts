import * as React from 'react';
declare class JqxComplexInput extends React.PureComponent<IComplexInputProps, IState> {
    protected static getDerivedStateFromProps(props: IComplexInputProps, state: IState): null | IState;
    private _jqx;
    private _id;
    private _componentSelector;
    constructor(props: IComplexInputProps);
    componentDidMount(): void;
    componentDidUpdate(): void;
    render(): React.ReactNode;
    setOptions(options: IComplexInputProps): void;
    getOptions(option: string): any;
    destroy(): void;
    getDecimalNotation(part: string, decimalNotation: string): string;
    getReal(complexnumber?: number): number;
    getImaginary(complexnumber?: number): number;
    renderWidget(): void;
    refresh(): void;
    val(value?: any): any;
    private _manageProps;
    private _wireEvents;
}
export default JqxComplexInput;
export declare const jqx: any;
export declare const JQXLite: any;
interface IState {
    lastProps: object;
}
interface IComplexInputOptions {
    decimalNotation?: 'default' | 'exponential' | 'scientific' | 'engineering';
    disabled?: boolean;
    height?: string | number;
    placeHolder?: string;
    roundedCorners?: boolean;
    rtl?: boolean;
    spinButtons?: boolean;
    spinButtonsStep?: number;
    template?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
    theme?: string;
    value?: string;
    width?: string | number;
}
export interface IComplexInputProps extends IComplexInputOptions {
    className?: string;
    style?: React.CSSProperties;
    onChange?: (e?: Event) => void;
}
