import * as React from 'react';
declare class JqxKanban extends React.PureComponent<IKanbanProps, IState> {
    protected static getDerivedStateFromProps(props: IKanbanProps, state: IState): null | IState;
    private _jqx;
    private _id;
    private _componentSelector;
    constructor(props: IKanbanProps);
    componentDidMount(): void;
    componentDidUpdate(): void;
    render(): React.ReactNode;
    setOptions(options: IKanbanProps): void;
    getOptions(option: string): any;
    addItem(newItem: any): void;
    destroy(): void;
    getColumn(dataField: string): IKanbanColumns;
    getColumnItems(dataField: string): IKanbanSource[];
    getItems(): IKanbanSource;
    removeItem(itemId: string): void;
    updateItem(itemId: string, newContent: IKanbanUpdateItem): void;
    private _manageProps;
    private _wireEvents;
}
export default JqxKanban;
export declare const jqx: any;
export declare const JQXLite: any;
interface IState {
    lastProps: object;
}
export interface IKanbanColumns {
    text?: string;
    dataField?: string;
    maxItems?: number;
    collapsible?: boolean;
    collapseDirection?: 'left' | 'right';
    headerElement?: any;
    collapsedHeaderElement?: any;
    iconClassName?: string;
}
export interface IKanbanColumnRenderer {
    element?: any;
    collapsedElement?: any;
    column?: any;
}
export interface IKanbanItemRenderer {
    element?: any;
    item?: any;
    resource?: any;
}
export interface IKanbanSource {
    id?: number;
    status?: string;
    text?: string;
    content?: any;
    tags?: string;
    color?: string;
    resourceId?: any;
    className?: string;
}
export interface IKanbanUpdateItem {
    status?: string;
    text?: string;
    content?: any;
    tags?: string;
    color?: string;
    resourceId?: any;
    className?: string;
}
interface IKanbanOptions {
    columnRenderer?: (element?: IKanbanColumnRenderer['element'], collapsedElement?: IKanbanColumnRenderer['collapsedElement'], column?: IKanbanColumnRenderer['column']) => void;
    columns?: IKanbanColumns[];
    connectWith?: string;
    headerHeight?: number | string;
    headerWidth?: number;
    height?: string | number;
    itemRenderer?: (element?: IKanbanItemRenderer['element'], item?: IKanbanItemRenderer['item'], resource?: IKanbanItemRenderer['resource']) => void;
    ready?: () => void;
    rtl?: boolean;
    source?: any;
    resources?: any;
    template?: string;
    templateContent?: any;
    theme?: string;
    width?: string | number;
}
export interface IKanbanProps extends IKanbanOptions {
    className?: string;
    style?: React.CSSProperties;
    onColumnAttrClicked?: (e?: Event) => void;
    onColumnCollapsed?: (e?: Event) => void;
    onColumnExpanded?: (e?: Event) => void;
    onItemAttrClicked?: (e?: Event) => void;
    onItemMoved?: (e?: Event) => void;
}
