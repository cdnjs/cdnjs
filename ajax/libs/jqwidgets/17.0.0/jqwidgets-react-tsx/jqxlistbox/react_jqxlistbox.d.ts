import * as React from 'react';
declare class JqxListBox extends React.PureComponent<IListBoxProps, IState> {
    protected static getDerivedStateFromProps(props: IListBoxProps, state: IState): null | IState;
    private _jqx;
    private _id;
    private _componentSelector;
    constructor(props: IListBoxProps);
    componentDidMount(): void;
    componentDidUpdate(): void;
    render(): React.ReactNode;
    setOptions(options: IListBoxProps): void;
    getOptions(option: string): any;
    addItem(Item: any): boolean;
    beginUpdate(): void;
    clear(): void;
    clearSelection(): void;
    checkIndex(Index: number): void;
    checkItem(Item: any): void;
    checkAll(): void;
    clearFilter(): void;
    destroy(): void;
    disableItem(Item: any): void;
    disableAt(Index: number): void;
    enableItem(Item: any): void;
    enableAt(Index: number | string): void;
    ensureVisible(item: any): void;
    endUpdate(): void;
    focus(): void;
    getItems(): any[];
    getSelectedItems(): any[];
    getCheckedItems(): any[];
    getItem(Index: number): any;
    getItemByValue(Item: any): any;
    getSelectedItem(): any;
    getSelectedIndex(): number;
    insertAt(Item: any, Index: number | string): void;
    invalidate(): void;
    indeterminateItem(Item: any): void;
    indeterminateIndex(Index: number): void;
    loadFromSelect(selector: string): void;
    removeItem(Item: any): void;
    removeAt(Index: number | string): void;
    renderWidget(): void;
    refresh(): void;
    selectItem(Item: any): void;
    selectIndex(Index: number | string): void;
    updateItem(Item: any, Value: number | string): void;
    updateAt(item: any, index: number | string): void;
    unselectIndex(index: number | string): void;
    unselectItem(item: any): void;
    uncheckIndex(index: number | string): void;
    uncheckItem(item: any): void;
    uncheckAll(): void;
    val(value?: any): any;
    private _manageProps;
    private _wireEvents;
}
export default JqxListBox;
export declare const jqx: any;
export declare const JQXLite: any;
interface IState {
    lastProps: object;
}
export interface IListBoxDragStart {
    item?: object;
}
export interface IListBoxDragEnd {
    dragItem?: object;
    dropItem?: object;
}
export interface IListBoxRenderer {
    index?: number;
    label?: string | number;
    value?: string | number;
}
interface IListBoxOptions {
    autoHeight?: boolean;
    allowDrag?: boolean;
    allowDrop?: boolean;
    checkboxes?: boolean;
    disabled?: boolean;
    displayMember?: number | string;
    dropAction?: 'default' | 'copy' | 'none';
    dragStart?: (item: IListBoxDragStart['item']) => boolean;
    dragEnd?: (dragItem: IListBoxDragEnd['dragItem'], dropItem: IListBoxDragEnd['dropItem']) => boolean;
    enableHover?: boolean;
    enableSelection?: boolean;
    equalItemsWidth?: boolean;
    filterable?: boolean;
    filterHeight?: number;
    filterDelay?: number | string;
    filterPlaceHolder?: number | string;
    height?: string | number;
    hasThreeStates?: boolean;
    itemHeight?: number;
    incrementalSearch?: boolean;
    incrementalSearchDelay?: number | string;
    multiple?: boolean;
    multipleextended?: boolean;
    renderer?: (index: IListBoxRenderer['index'], label: IListBoxRenderer['label'], value: IListBoxRenderer['value']) => string;
    rendered?: () => any;
    rtl?: boolean;
    selectedIndex?: number | string;
    selectedIndexes?: any;
    source?: any[];
    scrollBarSize?: number;
    searchMode?: 'none' | 'contains' | 'containsignorecase' | 'equals' | 'equalsignorecase' | 'startswithignorecase' | 'startswith' | 'endswithignorecase' | 'endswith';
    theme?: string;
    valueMember?: number | string;
    width?: string | number;
}
export interface IListBoxProps extends IListBoxOptions {
    className?: string;
    style?: React.CSSProperties;
    onBindingComplete?: (e?: Event) => void;
    onChange?: (e?: Event) => void;
    onCheckChange?: (e?: Event) => void;
    onDragStart?: (e?: Event) => void;
    onDragEnd?: (e?: Event) => void;
    onSelect?: (e?: Event) => void;
    onUnselect?: (e?: Event) => void;
}
