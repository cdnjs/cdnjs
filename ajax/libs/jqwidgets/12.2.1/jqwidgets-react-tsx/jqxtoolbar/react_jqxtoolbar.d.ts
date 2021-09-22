import * as React from 'react';
declare class JqxToolBar extends React.PureComponent<IToolBarProps, IState> {
    protected static getDerivedStateFromProps(props: IToolBarProps, state: IState): null | IState;
    private _jqx;
    private _id;
    private _componentSelector;
    constructor(props: IToolBarProps);
    componentDidMount(): void;
    componentDidUpdate(): void;
    render(): React.ReactNode;
    setOptions(options: IToolBarProps): void;
    getOptions(option: string): any;
    addTool(type: string, position: string, separator: boolean, menuToolIninitialization: (type?: string, tool?: any, menuToolIninitialization?: boolean) => void): void;
    disableTool(index: number, disable: boolean): void;
    destroy(): void;
    destroyTool(index: number): void;
    getTools(): IToolBarToolItem[];
    renderWidget(): void;
    refresh(): void;
    private _manageProps;
    private _wireEvents;
}
export default JqxToolBar;
export declare const jqx: any;
export declare const JQXLite: any;
interface IState {
    lastProps: object;
}
export interface IToolBarToolItem {
    type?: string;
    tool?: any;
    separatorAfterWidget?: boolean;
    minimizable?: boolean;
    minimized?: boolean;
    menuTool?: any;
    menuSeparator?: any;
}
interface IToolBarOptions {
    disabled?: boolean;
    height?: string | number;
    initTools?: (type?: string, index?: number, tool?: any, menuToolIninitialization?: boolean) => void;
    minimizeWidth?: number;
    minWidth?: number | string;
    maxWidth?: number | string;
    rtl?: boolean;
    tools?: string;
    theme?: string;
    width?: string | number;
}
export interface IToolBarProps extends IToolBarOptions {
    className?: string;
    style?: React.CSSProperties;
    onClose?: (e?: Event) => void;
    onOpen?: (e?: Event) => void;
}
