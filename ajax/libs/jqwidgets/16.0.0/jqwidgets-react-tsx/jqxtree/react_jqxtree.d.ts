import * as React from 'react';
declare class JqxTree extends React.PureComponent<ITreeProps, IState> {
    protected static getDerivedStateFromProps(props: ITreeProps, state: IState): null | IState;
    private _jqx;
    private _id;
    private _componentSelector;
    constructor(props: ITreeProps);
    componentDidMount(): void;
    componentDidUpdate(): void;
    render(): React.ReactNode;
    setOptions(options: ITreeProps): void;
    getOptions(option: string): any;
    addBefore(item: any, id: string): void;
    addAfter(item: any, id: string): void;
    addTo(item: any, id: string | null): void;
    clear(): void;
    checkAll(): void;
    checkItem(item: any, checked: boolean): void;
    collapseAll(): void;
    collapseItem(item: any): void;
    destroy(): void;
    disableItem(item: any): void;
    ensureVisible(item: object): void;
    enableItem(item: any): void;
    enableAll(): void;
    expandAll(): void;
    expandItem(item: any): void;
    focus(): void;
    getCheckedItems(): ITreeItem[];
    getUncheckedItems(): ITreeItem[];
    getItems(): ITreeItem[];
    getItem(element: any): ITreeItem;
    getSelectedItem(): ITreeItem;
    getPrevItem(item: any): ITreeItem;
    getNextItem(item: any): ITreeItem;
    hitTest(left: number, top: number): any;
    removeItem(item: any): void;
    renderWidget(): void;
    refresh(): void;
    selectItem(item: any): void;
    uncheckAll(): void;
    uncheckItem(item: any): void;
    updateItem(item: any, newItem: any): void;
    val(value?: any): any;
    private _manageProps;
    private _wireEvents;
}
export default JqxTree;
export declare const jqx: any;
export declare const JQXLite: any;
interface IState {
    lastProps: object;
}
export interface ITreeDragStart {
    item?: object;
}
export interface ITreeDragEnd {
    dragItem?: any;
    dropItem?: any;
    args?: any;
    dropPosition?: any;
    tree?: any;
}
export interface ITreeItem {
    label?: string;
    value?: string;
    disabled?: boolean;
    checked?: boolean;
    element?: any;
    parentElement?: any;
    isExpanded?: boolean;
    selected?: boolean;
}
interface ITreeOptions {
    animationShowDuration?: number;
    animationHideDuration?: number;
    allowDrag?: boolean;
    allowDrop?: boolean;
    checkboxes?: boolean;
    dragStart?: (item: ITreeDragStart['item']) => boolean;
    dragEnd?: (dragItem?: ITreeDragEnd['dragItem'], dropItem?: ITreeDragEnd['dropItem'], args?: ITreeDragEnd['args'], dropPosition?: ITreeDragEnd['dropPosition'], tree?: ITreeDragEnd['tree']) => boolean;
    disabled?: boolean;
    easing?: string;
    enableHover?: boolean;
    height?: number | string;
    hasThreeStates?: boolean;
    incrementalSearch?: boolean;
    keyboardNavigation?: boolean;
    rtl?: boolean;
    source?: any;
    toggleIndicatorSize?: number;
    toggleMode?: 'click' | 'dblclick';
    theme?: string;
    width?: string | number;
}
export interface ITreeProps extends ITreeOptions {
    className?: string;
    style?: React.CSSProperties;
    onAdded?: (e?: Event) => void;
    onCheckChange?: (e?: Event) => void;
    onCollapse?: (e?: Event) => void;
    onDragStart?: (e?: Event) => void;
    onDragEnd?: (e?: Event) => void;
    onExpand?: (e?: Event) => void;
    onItemClick?: (e?: Event) => void;
    onRemoved?: (e?: Event) => void;
    onSelect?: (e?: Event) => void;
}
