import * as React from 'react';
declare class JqxResponsivePanel extends React.PureComponent<IResponsivePanelProps, IState> {
    protected static getDerivedStateFromProps(props: IResponsivePanelProps, state: IState): null | IState;
    private _jqx;
    private _id;
    private _componentSelector;
    constructor(props: IResponsivePanelProps);
    componentDidMount(): void;
    componentDidUpdate(): void;
    render(): React.ReactNode;
    setOptions(options: IResponsivePanelProps): void;
    getOptions(option: string): any;
    close(): void;
    destroy(): void;
    isCollapsed(): boolean;
    isOpened(): boolean;
    open(): void;
    refresh(): void;
    renderWidget(): void;
    private _manageProps;
    private _wireEvents;
}
export default JqxResponsivePanel;
export declare const jqx: any;
export declare const JQXLite: any;
interface IState {
    lastProps: object;
}
interface IResponsivePanelOptions {
    animationDirection?: 'left' | 'right' | 'top' | 'bottom';
    animationHideDelay?: number | string;
    animationShowDelay?: number | string;
    animationType?: 'fade' | 'slide' | 'none';
    autoClose?: boolean;
    collapseBreakpoint?: number;
    collapseWidth?: number;
    height?: string | number;
    initContent?: () => void;
    theme?: string;
    toggleButton?: string | any;
    toggleButtonSize?: number | string;
    width?: string | number;
}
export interface IResponsivePanelProps extends IResponsivePanelOptions {
    className?: string;
    style?: React.CSSProperties;
    onClose?: (e?: Event) => void;
    onCollapse?: (e?: Event) => void;
    onExpand?: (e?: Event) => void;
    onOpen?: (e?: Event) => void;
}
