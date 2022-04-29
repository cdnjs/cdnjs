import * as React from 'react';
declare class JqxMaskedInput extends React.PureComponent<IMaskedInputProps, IState> {
    protected static getDerivedStateFromProps(props: IMaskedInputProps, state: IState): null | IState;
    private _jqx;
    private _id;
    private _componentSelector;
    constructor(props: IMaskedInputProps);
    componentDidMount(): void;
    componentDidUpdate(): void;
    render(): React.ReactNode;
    setOptions(options: IMaskedInputProps): void;
    getOptions(option: string): any;
    clear(): void;
    destroy(): void;
    focus(): void;
    val(value?: any): any;
    private _manageProps;
    private _wireEvents;
}
export default JqxMaskedInput;
export declare const jqx: any;
export declare const JQXLite: any;
interface IState {
    lastProps: object;
}
interface IMaskedInputOptions {
    disabled?: boolean;
    height?: string | number;
    mask?: string;
    promptChar?: number | string;
    readOnly?: boolean;
    rtl?: boolean;
    theme?: string;
    textAlign?: 'left' | 'right';
    value?: number | string;
    width?: string | number;
}
export interface IMaskedInputProps extends IMaskedInputOptions {
    className?: string;
    style?: React.CSSProperties;
    onChange?: (e?: Event) => void;
    onValueChanged?: (e?: Event) => void;
}
