import * as React from 'react';
declare class JqxPopover extends React.PureComponent<IPopoverProps, IState> {
    protected static getDerivedStateFromProps(props: IPopoverProps, state: IState): null | IState;
    private _jqx;
    private _id;
    private _componentSelector;
    constructor(props: IPopoverProps);
    componentDidMount(): void;
    componentDidUpdate(): void;
    render(): React.ReactNode;
    setOptions(options: IPopoverProps): void;
    getOptions(option: string): any;
    close(): void;
    destroy(): void;
    open(): void;
    private _manageProps;
    private _wireEvents;
}
export default JqxPopover;
export declare const jqx: any;
export declare const JQXLite: any;
interface IState {
    lastProps: object;
}
interface IPopoverOptions {
    arrowOffsetValue?: number;
    animationOpenDelay?: number | string;
    animationCloseDelay?: number | string;
    autoClose?: boolean;
    animationType?: 'none' | 'fade';
    height?: number | string;
    initContent?: () => void;
    isModal?: boolean;
    offset?: any;
    position?: 'top' | 'bottom' | 'left' | 'right';
    rtl?: boolean;
    selector?: string;
    showArrow?: boolean;
    showCloseButton?: boolean;
    width?: number | string;
    title?: string | number;
    theme?: string;
}
export interface IPopoverProps extends IPopoverOptions {
    className?: string;
    style?: React.CSSProperties;
    onClose?: (e?: Event) => void;
    onOpen?: (e?: Event) => void;
}
