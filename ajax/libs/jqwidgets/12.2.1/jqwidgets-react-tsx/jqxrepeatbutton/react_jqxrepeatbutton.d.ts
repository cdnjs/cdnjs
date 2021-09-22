import * as React from 'react';
declare class JqxRepeatButton extends React.PureComponent<IRepeatButtonProps, IState> {
    protected static getDerivedStateFromProps(props: IRepeatButtonProps, state: IState): null | IState;
    private _jqx;
    private _id;
    private _componentSelector;
    constructor(props: IRepeatButtonProps);
    componentDidMount(): void;
    componentDidUpdate(): void;
    render(): React.ReactNode;
    setOptions(options: IRepeatButtonProps): void;
    getOptions(option: string): any;
    destroy(): void;
    focus(): void;
    renderWidget(): void;
    val(value?: any): any;
    private _manageProps;
    private _wireEvents;
}
export default JqxRepeatButton;
export declare const jqx: any;
export declare const JQXLite: any;
interface IState {
    lastProps: object;
}
interface IRepeatButtonOptions {
    delay?: number;
    disabled?: boolean;
    height?: number | string;
    imgSrc?: string;
    imgWidth?: number | string;
    imgHeight?: number | string;
    imgPosition?: 'left' | 'center' | 'right' | 'top' | 'bottom' | 'topLeft' | 'bottomLeft' | 'topRight' | 'bottomRight';
    roundedCorners?: 'top' | 'bottom' | 'all' | 'left' | 'right' | 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
    rtl?: boolean;
    textPosition?: 'left' | 'center' | 'right' | 'top' | 'bottom' | 'topLeft' | 'bottomLeft' | 'topRight' | 'bottomRight';
    textImageRelation?: 'imageBeforeText' | 'imageAboveText' | 'textAboveImage' | 'textBeforeImage' | 'overlay';
    theme?: string;
    template?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'inverse' | 'info' | 'link';
    toggled?: boolean;
    width?: string | number;
    value?: string;
}
export interface IRepeatButtonProps extends IRepeatButtonOptions {
    className?: string;
    style?: React.CSSProperties;
    onClick?: (e?: Event) => void;
}
