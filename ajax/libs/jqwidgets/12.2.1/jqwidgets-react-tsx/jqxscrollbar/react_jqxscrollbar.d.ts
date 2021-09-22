import * as React from 'react';
declare class JqxScrollBar extends React.PureComponent<IScrollBarProps, IState> {
    protected static getDerivedStateFromProps(props: IScrollBarProps, state: IState): null | IState;
    private _jqx;
    private _id;
    private _componentSelector;
    constructor(props: IScrollBarProps);
    componentDidMount(): void;
    componentDidUpdate(): void;
    render(): React.ReactNode;
    setOptions(options: IScrollBarProps): void;
    getOptions(option: string): any;
    destroy(): void;
    isScrolling(): boolean;
    setPosition(index: number): void;
    private _manageProps;
    private _wireEvents;
}
export default JqxScrollBar;
export declare const jqx: any;
export declare const JQXLite: any;
interface IState {
    lastProps: object;
}
interface IScrollBarOptions {
    disabled?: boolean;
    height?: string | number;
    largestep?: number;
    min?: number;
    max?: number;
    rtl?: boolean;
    step?: number;
    showButtons?: boolean;
    thumbMinSize?: number;
    theme?: string;
    vertical?: boolean;
    value?: number;
    width?: string | number;
}
export interface IScrollBarProps extends IScrollBarOptions {
    className?: string;
    style?: React.CSSProperties;
    onValueChanged?: (e?: Event) => void;
}
