import * as React from 'react';
declare class JqxWindow extends React.PureComponent<IWindowProps, IState> {
    protected static getDerivedStateFromProps(props: IWindowProps, state: IState): null | IState;
    private _jqx;
    private _id;
    private _componentSelector;
    constructor(props: IWindowProps);
    componentDidMount(): void;
    componentDidUpdate(): void;
    render(): React.ReactNode;
    setOptions(options: IWindowProps): void;
    getOptions(option: string): any;
    bringToFront(): void;
    close(): void;
    collapse(): void;
    closeAll(): void;
    disable(): void;
    destroy(): void;
    enable(): void;
    expand(): void;
    focus(): void;
    isOpen(): boolean;
    move(top: number, left: number): void;
    open(): void;
    hide(): void;
    resize(top: number, left: number): void;
    setTitle(title: string): void;
    setContent(content: string): void;
    private _manageProps;
    private _wireEvents;
}
export default JqxWindow;
export declare const jqx: any;
export declare const JQXLite: any;
interface IState {
    lastProps: object;
}
export interface IWindowDragArea {
    left?: number;
    top?: number;
    width?: number | string;
    height?: number | string;
}
interface IWindowOptions {
    autoOpen?: boolean;
    animationType?: 'none' | 'fade' | 'slide' | 'combined';
    collapsed?: boolean;
    collapseAnimationDuration?: number;
    content?: string;
    closeAnimationDuration?: number;
    closeButtonSize?: number;
    closeButtonAction?: 'hide' | 'close';
    cancelButton?: any;
    dragArea?: IWindowDragArea;
    draggable?: boolean;
    disabled?: boolean;
    height?: string | number;
    initContent?: () => void;
    isModal?: boolean;
    keyboardCloseKey?: number | string;
    keyboardNavigation?: boolean;
    minHeight?: string | number;
    maxHeight?: string | number;
    minWidth?: number | string;
    maxWidth?: number | string;
    modalOpacity?: number | string;
    modalZIndex?: number;
    modalBackgroundZIndex?: number;
    okButton?: any;
    position?: string | any;
    rtl?: boolean;
    resizable?: boolean;
    showAnimationDuration?: number;
    showCloseButton?: boolean;
    showCollapseButton?: boolean;
    theme?: string;
    title?: string;
    width?: string | number;
    zIndex?: number;
}
export interface IWindowProps extends IWindowOptions {
    className?: string;
    style?: React.CSSProperties;
    onClose?: (e?: Event) => void;
    onCollapse?: (e?: Event) => void;
    onExpand?: (e?: Event) => void;
    onMoving?: (e?: Event) => void;
    onMoved?: (e?: Event) => void;
    onOpen?: (e?: Event) => void;
    onResizing?: (e?: Event) => void;
    onResized?: (e?: Event) => void;
}
