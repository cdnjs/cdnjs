import * as React from 'react';
declare class JqxButton extends React.PureComponent<IButtonProps, IState> {
    protected static getDerivedStateFromProps(props: IButtonProps, state: IState): null | IState;
    private _jqx;
    private _id;
    private _componentSelector;
    constructor(props: IButtonProps);
    componentDidMount(): void;
    componentDidUpdate(): void;
    render(): React.ReactNode;
    setOptions(options: IButtonProps): void;
    getOptions(option: string): any;
    destroy(): void;
    focus(): void;
    renderWidget(): void;
    val(value?: any): any;
    private _manageProps;
    private _wireEvents;
}
export default JqxButton;
export declare const jqx: any;
export declare const JQXLite: any;
interface IState {
    lastProps: object;
}
interface IButtonOptions {
    disabled?: boolean;
    height?: number | string;
    imgSrc?: string;
    imgWidth?: number | string;
    imgHeight?: number | string;
    imgPosition?: 'left' | 'center' | 'right' | 'top' | 'bottom' | 'topLeft' | 'bottomLeft' | 'topRight' | 'bottomRight';
    roundedCorners?: 'top' | 'bottom' | 'all' | 'left' | 'right' | 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
    rtl?: boolean;
    enableDefault?: boolean;
    cursor?: boolean;
    textPosition?: 'left' | 'center' | 'right' | 'top' | 'bottom' | 'topLeft' | 'bottomLeft' | 'topRight' | 'bottomRight';
    textImageRelation?: 'imageBeforeText' | 'imageAboveText' | 'textAboveImage' | 'textBeforeImage' | 'overlay';
    theme?: string;
    template?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'inverse' | 'info' | 'link';
    width?: number | string;
    value?: string;
}
export interface IButtonProps extends IButtonOptions {
    className?: string;
    style?: React.CSSProperties;
    onClick?: (e?: Event) => void;
}
