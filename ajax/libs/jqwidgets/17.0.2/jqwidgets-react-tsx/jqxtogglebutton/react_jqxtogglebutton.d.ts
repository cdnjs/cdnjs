import * as React from 'react';
declare class JqxToggleButton extends React.PureComponent<IToggleButtonProps, IState> {
    protected static getDerivedStateFromProps(props: IToggleButtonProps, state: IState): null | IState;
    private _jqx;
    private _id;
    private _componentSelector;
    constructor(props: IToggleButtonProps);
    componentDidMount(): void;
    componentDidUpdate(): void;
    render(): React.ReactNode;
    setOptions(options: IToggleButtonProps): void;
    getOptions(option: string): any;
    check(): void;
    destroy(): void;
    focus(): void;
    renderWidget(): void;
    toggle(): void;
    unCheck(): void;
    val(value?: any): any;
    private _manageProps;
    private _wireEvents;
}
export default JqxToggleButton;
export declare const jqx: any;
export declare const JQXLite: any;
interface IState {
    lastProps: object;
}
interface IToggleButtonOptions {
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
export interface IToggleButtonProps extends IToggleButtonOptions {
    className?: string;
    style?: React.CSSProperties;
    onClick?: (e?: Event) => void;
}
