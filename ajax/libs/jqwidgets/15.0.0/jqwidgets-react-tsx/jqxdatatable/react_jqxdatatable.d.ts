import * as React from 'react';
declare class JqxDataTable extends React.PureComponent<IDataTableProps, IState> {
    protected static getDerivedStateFromProps(props: IDataTableProps, state: IState): null | IState;
    private _jqx;
    private _id;
    private _componentSelector;
    constructor(props: IDataTableProps);
    componentDidMount(): void;
    componentDidUpdate(): void;
    render(): React.ReactNode;
    setOptions(options: IDataTableProps): void;
    getOptions(option: string): any;
    addRow(rowIndex: number, rowData: any, rowPosition: any): void;
    addFilter(dataField: string, filerGroup: any): void;
    applyFilters(): void;
    beginUpdate(): void;
    beginRowEdit(rowIndex: number): void;
    beginCellEdit(rowIndex: number, dataField: string): void;
    clearSelection(): void;
    clearFilters(): void;
    clear(): void;
    destroy(): void;
    deleteRow(rowIndex: number): void;
    endUpdate(): void;
    ensureRowVisible(rowIndex: number): void;
    endRowEdit(rowIndex: number, cancelChanges: boolean): void;
    endCellEdit(rowIndex: number, dataField: string): void;
    exportData(exportDataType: any): any;
    focus(): void;
    getColumnProperty(dataField: string, propertyName: string): any;
    goToPage(pageIndex: number): void;
    goToPrevPage(): void;
    goToNextPage(): void;
    getSelection(): any[];
    getRows(): any[];
    getView(): any[];
    getCellValue(rowIndex: number, dataField: string): any;
    hideColumn(dataField: string): void;
    hideDetails(rowIndex: boolean): void;
    isBindingCompleted(): boolean;
    lockRow(rowIndex: number): void;
    refresh(): void;
    renderWidget(): void;
    removeFilter(dataField: string): void;
    scrollOffset(top: number, left: number): void;
    setColumnProperty(dataField: string, propertyName: string, propertyValue: any): void;
    showColumn(dataField: string): void;
    selectRow(rowIndex: number): void;
    showDetails(rowIndex: number): void;
    setCellValue(rowIndex: number, dataField: string, value: any): void;
    sortBy(dataField: string, sortOrder: any): void;
    updating(): boolean;
    updateBoundData(): void;
    unselectRow(rowIndex: number): void;
    updateRow(rowIndex: number, rowData: any): void;
    unlockRow(rowIndex: number): void;
    private _manageProps;
    private _wireEvents;
}
export default JqxDataTable;
export declare const jqx: any;
export declare const JQXLite: any;
interface IState {
    lastProps: object;
}
export interface IDataTableColumns {
    text?: string;
    dataField?: string;
    displayField?: string;
    sortable?: boolean;
    filterable?: boolean;
    hidden?: boolean;
    columnGroup?: string;
    autoCellHeight?: boolean;
    renderer?: (text: string, align?: string, height?: string | number) => string;
    rendered?: (element: any, align?: string, height?: string | number) => boolean;
    cellsRenderer?: (row: number, column?: any, value?: any, rowData?: any) => string;
    columnType?: string;
    validation?: (cell: number, value?: any) => any;
    initEditor?: (row: number, cellValue?: any, editor?: any, cellText?: string, width?: string | number, height?: string | number) => void;
    createEditor?: (row: number, cellValue?: any, editor?: any, cellText?: string, width?: string | number, height?: string | number) => void;
    getEditorValue?: (row: number, cellValue?: any, editor?: any) => void;
    cellsFormat?: string;
    aggregates?: any[];
    aggregatesRenderer?: (aggregates?: any, column?: any, element?: any) => string;
    align?: 'left' | 'right' | 'center';
    cellsAlign?: 'left' | 'right' | 'center';
    width?: number | string;
    minWidth?: number | string;
    maxWidth?: number | string;
    resizable?: boolean;
    draggable?: boolean;
    editable?: boolean;
    className?: string;
    cellClassName?: any;
    pinned?: boolean;
}
export interface IDataTableColumnGroups {
    text?: string;
    parentGroup?: string;
    align?: string;
    name?: string;
}
export interface IDataTableGroupsRenderer {
    value?: string;
    rowdata?: object;
    level?: number;
}
export interface IDataTableInitRowDetails {
    id?: number;
    row?: number;
    element?: object;
    rowinfo?: object;
}
export interface IDataTableRenderToolbar {
    toolbar?: object;
}
export interface IDataTableRenderStatusBar {
    statusbar?: object;
}
export interface IDataTableEditSettings {
    saveOnPageChange?: boolean;
    saveOnBlur?: boolean;
    saveOnSelectionChange?: boolean;
    cancelOnEsc?: boolean;
    saveOnEnter?: boolean;
    editSingleCell?: boolean;
    editOnDoubleClick?: boolean;
    editOnF2?: boolean;
}
export interface IDataTableExportSettings {
    columnsHeader?: boolean;
    hiddenColumns?: boolean;
    serverURL?: any;
    characterSet?: any;
    recordsInView?: boolean;
    fileName?: string;
}
interface IDataTableOptions {
    altRows?: boolean;
    autoRowHeight?: boolean;
    aggregatesHeight?: number;
    autoShowLoadElement?: boolean;
    columnsHeight?: number;
    columns?: IDataTableColumns[];
    columnGroups?: IDataTableColumnGroups[];
    columnsResize?: boolean;
    columnsReorder?: boolean;
    disabled?: boolean;
    editable?: boolean;
    editSettings?: IDataTableEditSettings;
    exportSettings?: IDataTableExportSettings;
    enableHover?: boolean;
    enableBrowserSelection?: boolean;
    filterable?: boolean;
    filterHeight?: number;
    filterMode?: 'default' | 'simple' | 'advanced';
    groups?: any[];
    groupsRenderer?: (value?: IDataTableGroupsRenderer['value'], rowData?: IDataTableGroupsRenderer['rowdata'], level?: IDataTableGroupsRenderer['level']) => string;
    height?: number | string;
    initRowDetails?: (id?: IDataTableInitRowDetails['id'], row?: IDataTableInitRowDetails['row'], element?: IDataTableInitRowDetails['element'], rowInfo?: IDataTableInitRowDetails['rowinfo']) => void;
    incrementalSearch?: boolean;
    localization?: any;
    pagerHeight?: number;
    pageSize?: number;
    pageSizeOptions?: Array<string | number>;
    pageable?: boolean;
    pagerPosition?: 'top' | 'bottom' | 'both';
    pagerMode?: 'default' | 'advanced';
    pagerButtonsCount?: number;
    pagerRenderer?: () => any;
    ready?: () => void;
    rowDetails?: boolean;
    renderToolbar?: (toolbar?: IDataTableRenderToolbar['toolbar']) => void;
    renderStatusBar?: (statusbar?: IDataTableRenderStatusBar['statusbar']) => void;
    rendering?: () => void;
    rendered?: () => void;
    rtl?: boolean;
    source?: any;
    sortable?: boolean;
    showAggregates?: boolean;
    showToolbar?: boolean;
    showStatusbar?: boolean;
    enableSanitizeAll?: boolean;
    statusBarHeight?: number;
    scrollBarSize?: number | string;
    selectionMode?: 'multipleRows' | 'singleRow' | 'custom' | 'none';
    serverProcessing?: boolean;
    showHeader?: boolean;
    theme?: string;
    toolbarHeight?: number;
    width?: string | number;
}
export interface IDataTableProps extends IDataTableOptions {
    className?: string;
    style?: React.CSSProperties;
    onBindingComplete?: (e?: Event) => void;
    onCellBeginEdit?: (e?: Event) => void;
    onCellEndEdit?: (e?: Event) => void;
    onCellValueChanged?: (e?: Event) => void;
    onColumnResized?: (e?: Event) => void;
    onColumnReordered?: (e?: Event) => void;
    onSort?: (e?: Event) => void;
    onFilter?: (e?: Event) => void;
    onPageChanged?: (e?: Event) => void;
    onPageSizeChanged?: (e?: Event) => void;
    onRowClick?: (e?: Event) => void;
    onRowDoubleClick?: (e?: Event) => void;
    onRowSelect?: (e?: Event) => void;
    onRowUnselect?: (e?: Event) => void;
    onRowBeginEdit?: (e?: Event) => void;
    onRowEndEdit?: (e?: Event) => void;
    onRowExpand?: (e?: Event) => void;
    onRowCollapse?: (e?: Event) => void;
}
