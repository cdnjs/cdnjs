import * as React from 'react';
declare class JqxLayout extends React.PureComponent<ILayoutProps, IState> {
    protected static getDerivedStateFromProps(props: ILayoutProps, state: IState): null | IState;
    private _jqx;
    private _id;
    private _componentSelector;
    constructor(props: ILayoutProps);
    componentDidMount(): void;
    componentDidUpdate(): void;
    render(): React.ReactNode;
    setOptions(options: ILayoutProps): void;
    getOptions(option: string): any;
    destroy(): void;
    loadLayout(Layout: any): void;
    refresh(): void;
    renderWidget(): void;
    saveLayout(): any;
    private _manageProps;
    private _wireEvents;
}
export default JqxLayout;
export declare const jqx: any;
export declare const JQXLite: any;
interface IState {
    lastProps: object;
}
export interface ILayout {
    type?: 'layoutGroup' | 'tabbedGroup' | 'documentGroup' | 'autoHideGroup' | 'layoutPanel' | 'documentPanel';
    alignment?: 'left' | 'right' | 'top' | 'bottom';
    allowClose?: boolean;
    allowPin?: boolean;
    allowUnpin?: boolean;
    contentContainer?: string;
    height?: number | string;
    initContent?: () => void;
    minHeight?: number | string;
    minWidth?: number | string;
    orientation?: 'horizontal' | 'vertical';
    pinnedHeight?: number | string;
    pinnedWidth?: number | string;
    selected?: boolean;
    title?: number | string;
    unpinnedHeight?: number | string;
    unpinnedWidth?: number | string;
    width?: number | string;
    items?: ILayout[];
}
interface ILayoutOptions {
    contextMenu?: boolean;
    height?: string | number;
    layout?: ILayout[];
    minGroupHeight?: number | string;
    minGroupWidth?: number | string;
    resizable?: boolean;
    rtl?: boolean;
    theme?: string;
    width?: string | number;
}
export interface ILayoutProps extends ILayoutOptions {
    className?: string;
    style?: React.CSSProperties;
    onPin?: (e?: Event) => void;
    onResize?: (e?: Event) => void;
    onUnpin?: (e?: Event) => void;
}
