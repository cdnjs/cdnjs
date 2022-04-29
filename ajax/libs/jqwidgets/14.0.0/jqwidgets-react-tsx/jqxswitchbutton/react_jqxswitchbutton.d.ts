import * as React from 'react';
declare class JqxSwitchButton extends React.PureComponent<ISwitchButtonProps, IState> {
    protected static getDerivedStateFromProps(props: ISwitchButtonProps, state: IState): null | IState;
    private _jqx;
    private _id;
    private _componentSelector;
    constructor(props: ISwitchButtonProps);
    componentDidMount(): void;
    componentDidUpdate(): void;
    render(): React.ReactNode;
    setOptions(options: ISwitchButtonProps): void;
    getOptions(option: string): any;
    check(): void;
    disable(): void;
    enable(): void;
    toggle(): void;
    uncheck(): void;
    val(value?: any): any;
    private _manageProps;
    private _wireEvents;
}
export default JqxSwitchButton;
export declare const jqx: any;
export declare const JQXLite: any;
interface IState {
    lastProps: object;
}
interface ISwitchButtonOptions {
    checked?: boolean;
    disabled?: boolean;
    height?: string | number;
    orientation?: 'horizontal' | 'vertical';
    onLabel?: string;
    offLabel?: string;
    thumbSize?: string;
    rtl?: boolean;
    width?: string | number;
}
export interface ISwitchButtonProps extends ISwitchButtonOptions {
    className?: string;
    style?: React.CSSProperties;
    onChecked?: (e?: Event) => void;
    onChange?: (e?: Event) => void;
    onUnchecked?: (e?: Event) => void;
}
