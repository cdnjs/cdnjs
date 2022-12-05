import * as React from 'react';
import { Column, ColumnFilterMatchModeType } from '../column';
import { PaginatorTemplate } from '../paginator';
import { VirtualScroller, VirtualScrollerProps } from '../virtualscroller/virtualscroller';

type DataTableHeaderTemplateType = React.ReactNode | ((options: DataTableHeaderTemplateOptions) => React.ReactNode);

type DataTableFooterTemplateType = React.ReactNode | ((options: DataTableFooterTemplateOptions) => React.ReactNode);

type DataTableRowGroupHeaderTemplateType = React.ReactNode | ((data: any, options: DataTableRowGroupHeaderTemplateOptions) => React.ReactNode);

type DataTableRowGroupFooterTemplateType = React.ReactNode | ((data: any, options: DataTableRowGroupFooterTemplateOptions) => React.ReactNode);

type DataTablePaginatorPositionType = 'top' | 'bottom' | 'both';

type DataTableSortModeType = 'single' | 'multiple';

type DataTableSortOrderType = 1 | 0 | -1 | undefined | null;

type DataTableEmptyMessageType = React.ReactNode | ((frozen: boolean) => React.ReactNode);

type DataTableSelectionModeType = 'single' | 'multiple' | 'checkbox' | 'radiobutton';

type DataTableColumnResizeModeType = 'fit' | 'expand';

type DataTableFilterMatchModeType = 'startsWith' | 'contains' | 'notContains' | 'endsWith' | 'equals' | 'notEquals' | 'in' | 'lt' | 'lte' | 'gt' | 'gte' | 'between' | 'dateIs' | 'dateIsNot' | 'dateBefore' | 'dateAfter' | 'custom';

type DataTableGlobalFilterType = string | undefined | null;

type DataTableMultiSortMetaType = DataTableSortMeta[] | undefined | null;

type DataTableCompareSelectionByType = 'deepEquals' | 'equals';

type DataTableStateStorageType = 'session' | 'local' | 'custom';

type DataTableAppendToType = 'self' | HTMLElement | undefined | null;

type DataTableSelectType = 'row' | 'cell' | 'checkbox' | 'radio' | 'all';

type DataTableResponsiveLayoutType = 'scroll' | 'stack';

type DataTableFilterDisplayType = 'menu' | 'row';

type DataTableSizeType = 'small' | 'normal' | 'large';

type DataTableScrollDirectionType = 'vertical' | 'horizontal' | 'both';

interface DataTableHeaderTemplateOptions {
    props: DataTableProps;
}

interface DataTableFooterTemplateOptions extends DataTableHeaderTemplateOptions {}

interface DataTableRowGroupHeaderTemplateOptions {
    index: number;
    props: DataTableProps;
    customRendering: boolean;
}

interface DataTableRowGroupFooterTemplateOptions extends DataTableRowGroupHeaderTemplateOptions {
    colSpan: number;
}

interface DataTableSortMeta {
    field: string;
    order: DataTableSortOrderType;
}

interface DataTableFilterMetaData {
    value: any;
    matchMode: DataTableFilterMatchModeType;
}

interface DataTableOperatorFilterMetaData {
    operator: string;
    constraints: DataTableFilterMetaData[];
}

interface DataTableFilterMeta {
    [key: string]: DataTableFilterMetaData | DataTableOperatorFilterMetaData;
}

interface DataTableExpandedRows {
    [key: string]: boolean;
}

interface DataTableEditingRows {
    [key: string]: boolean;
}

interface DataTableRowToggleParams {
    data: any[] | DataTableExpandedRows;
}

interface DataTableColumnResizeEndParams {
    element: HTMLElement;
    column: Column;
    delta: number;
}

interface DataTableColumnResizerClickParams {
    originalEvent: React.MouseEvent<HTMLElement>;
    element: HTMLElement;
    column: Column;
}

interface DataTablePageParams {
    first: number;
    rows: number;
    page?: number;
    pageCount?: number;
}

interface DataTableSortParams {
    sortField: string;
    sortOrder: DataTableSortOrderType;
    multiSortMeta: DataTableMultiSortMetaType;
}

interface DataTableFilterParams {
    filters: DataTableFilterMeta;
}

interface DataTablePFSEvent extends DataTablePageParams, DataTableSortParams, DataTableFilterParams {
    [key: string]: any;
}

interface DataTableDataSelectableParams {
    data: any;
    index: number;
}

interface DataTableSelectionChangeParams {
    originalEvent: React.SyntheticEvent;
    value: any;
    type?: string;
    [key: string]: any;
}

interface DataTableSelectAllChangeParams {
    originalEvent: React.SyntheticEvent;
    checked: boolean;
}

interface DataTableRowEventParams {
    originalEvent: React.SyntheticEvent;
    data: any;
}

interface DataTableRowMouseEventParams extends Omit<DataTableRowEventParams, 'originalEvent'> {
    originalEvent: React.MouseEvent<HTMLElement>;
    index: number;
}

interface DataTableRowClickEventParams extends DataTableRowMouseEventParams {}

interface DataTableCellClickEventParams {
    originalEvent: React.MouseEvent<HTMLElement>;
    value: any;
    field: string;
    rowData: any;
    rowIndex: number;
    cellIndex: number;
    selected: boolean;
}

interface DataTableRowEditParams extends DataTableRowEventParams {
    index: number;
}

interface DataTableRowEditSaveParams extends DataTableRowEditParams {
    valid: boolean;
}

interface DataTableRowEditCompleteParams extends DataTableRowEventParams {
    newData: any;
    field: string;
    index: number;
}

interface DataTableSelectParams {
    originalEvent: React.SyntheticEvent;
    data: any;
    type: DataTableSelectType;
}

interface DataTableUnselectParams extends DataTableSelectParams {}

interface DataTableExportFunctionParams {
    data: any;
    field: string;
    rowData: any;
    column: Column;
}

interface DataTableColReorderParams {
    originalEvent: React.DragEvent<HTMLElement>;
    dragIndex: number;
    dropIndex: number;
    columns: React.ReactElement;
}

interface DataTableRowReorderParams {
    originalEvent: React.DragEvent<HTMLElement>;
    value: any;
    dragIndex: number;
    dropIndex: number;
}

interface DataTableRowExpansionTemplate {
    index: number;
    customRendering: boolean;
}

interface DataTableRowClassNameOptions {
    props: DataTableProps;
}

interface DataTableCellClassNameOptions {
    props: DataTableProps;
    rowData: any;
    column: Column;
}

interface DataTableShowSelectionElementOptions {
    rowIndex: number;
    props: DataTableProps;
}

interface DataTableShowRowReorderElementOptions {
    rowIndex: number;
    props: DataTableProps;
}

interface DataTableRowEditValidatorOptions {
    props: DataTableProps;
}

export interface DataTableProps extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'size' | 'onContextMenu' | 'ref'> {
    id?: string;
    value?: any[];
    alwaysShowPaginator?: boolean;
    autoLayout?: boolean;
    breakpoint?: string;
    cellSelection?: boolean;
    className?: string;
    collapsedRowIcon?: string;
    columnResizeMode?: DataTableColumnResizeModeType;
    compareSelectionBy?: DataTableCompareSelectionByType;
    contextMenuSelection?: object;
    csvSeparator?: string;
    currentPageReportTemplate?: string;
    dataKey?: string;
    defaultSortOrder?: DataTableSortOrderType;
    dragSelection?: boolean;
    editMode?: string;
    editingRows?: any[] | DataTableEditingRows;
    emptyMessage?: DataTableEmptyMessageType;
    expandableRowGroups?: boolean;
    expandedRowIcon?: string;
    expandedRows?: any[] | DataTableExpandedRows;
    exportFilename?: string;
    filterDelay?: number;
    filterDisplay?: DataTableFilterDisplayType;
    filterLocale?: string;
    filters?: DataTableFilterMeta;
    first?: number;
    footer?: DataTableFooterTemplateType;
    footerColumnGroup?: React.ReactNode;
    frozenValue?: any[];
    frozenWidth?: string;
    globalFilter?: DataTableGlobalFilterType;
    globalFilterFields?: string[];
    globalFilterMatchMode?: ColumnFilterMatchModeType;
    groupRowsBy?: string;
    header?: DataTableHeaderTemplateType;
    headerColumnGroup?: React.ReactNode;
    lazy?: boolean;
    loading?: boolean;
    loadingIcon?: string;
    metaKeySelection?: boolean;
    multiSortMeta?: DataTableMultiSortMetaType;
    pageLinkSize?: number;
    paginator?: boolean;
    paginatorClassName?: string;
    paginatorDropdownAppendTo?: DataTableAppendToType;
    paginatorLeft?: React.ReactNode;
    paginatorPosition?: DataTablePaginatorPositionType;
    paginatorRight?: React.ReactNode;
    paginatorTemplate?: PaginatorTemplate;
    removableSort?: boolean;
    reorderableColumns?: boolean;
    reorderableRows?: boolean;
    resizableColumns?: boolean;
    responsiveLayout?: DataTableResponsiveLayoutType;
    rowGroupFooterTemplate?: DataTableRowGroupFooterTemplateType;
    rowGroupHeaderTemplate?: DataTableRowGroupHeaderTemplateType;
    rowGroupMode?: string;
    rowHover?: boolean;
    rows?: number;
    rowsPerPageOptions?: number[];
    scrollDirection?: DataTableScrollDirectionType;
    scrollHeight?: string;
    scrollable?: boolean;
    selectAll?: boolean;
    selectOnEdit?: boolean;
    selection?: any | any[];
    selectionAutoFocus?: boolean;
    selectionAriaLabel?: string;
    selectionMode?: DataTableSelectionModeType;
    selectionPageOnly?: boolean;
    showGridlines?: boolean;
    showSelectAll?: boolean;
    size?: DataTableSizeType;
    sortField?: string;
    sortMode?: DataTableSortModeType;
    sortOrder?: DataTableSortOrderType;
    stateKey?: string;
    stateStorage?: DataTableStateStorageType;
    stripedRows?: boolean;
    style?: React.CSSProperties;
    tabIndex?: number;
    tableClassName?: string;
    tableStyle?: React.CSSProperties;
    totalRecords?: number;
    virtualScrollerOptions?: VirtualScrollerProps;
    cellClassName?(value: any, options: DataTableCellClassNameOptions): object | string;
    customRestoreState?(): object;
    customSaveState?(state: object): void;
    exportFunction?(e: DataTableExportFunctionParams): any;
    isDataSelectable?(e: DataTableDataSelectableParams): boolean | undefined | null;
    onAllRowsSelect?(e: DataTableSelectParams): void;
    onAllRowsUnselect?(e: DataTableUnselectParams): void;
    onCellClick?(e: DataTableCellClickEventParams): void;
    onCellSelect?(e: DataTableSelectParams): void;
    onCellUnselect?(e: DataTableUnselectParams): void;
    onColReorder?(e: DataTableColReorderParams): void;
    onColumnResizeEnd?(e: DataTableColumnResizeEndParams): void;
    onColumnResizerClick?(e: DataTableColumnResizerClickParams): void;
    onColumnResizerDoubleClick?(e: DataTableColumnResizerClickParams): void;
    onContextMenu?(e: DataTableRowEventParams): void;
    onContextMenuSelectionChange?(e: DataTableSelectionChangeParams): void;
    onFilter?(e: DataTablePFSEvent): void;
    onPage?(e: DataTablePFSEvent): void;
    onRowClick?(e: DataTableRowClickEventParams): void;
    onRowCollapse?(e: DataTableRowEventParams): void;
    onRowDoubleClick?(e: DataTableRowClickEventParams): void;
    onRowEditCancel?(e: DataTableRowEditParams): void;
    onRowEditChange?(e: DataTableRowEditParams): void;
    onRowEditComplete?(e: DataTableRowEditCompleteParams): void;
    onRowEditInit?(e: DataTableRowEditParams): void;
    onRowEditSave?(e: DataTableRowEditSaveParams): void;
    onRowExpand?(e: DataTableRowEventParams): void;
    onRowMouseEnter?(e: DataTableRowMouseEventParams): void;
    onRowMouseLeave?(e: DataTableRowMouseEventParams): void;
    onRowReorder?(e: DataTableRowReorderParams): void;
    onRowSelect?(e: DataTableSelectParams): void;
    onRowToggle?(e: DataTableRowToggleParams): void;
    onRowUnselect?(e: DataTableUnselectParams): void;
    onSelectAllChange?(e: DataTableSelectAllChangeParams): void;
    onSelectionChange?(e: DataTableSelectionChangeParams): void;
    onSort?(e: DataTablePFSEvent): void;
    onStateRestore?(state: object): void;
    onStateSave?(state: object): void;
    onValueChange?(value: any[]): void;
    rowClassName?(data: any, options: DataTableRowClassNameOptions): object | string;
    rowEditValidator?(data: any, options: DataTableRowEditValidatorOptions): boolean;
    rowExpansionTemplate?(data: any, options: DataTableRowExpansionTemplate): React.ReactNode;
    showRowReorderElement?(data: any, options: DataTableShowRowReorderElementOptions): boolean | undefined | null;
    showSelectionElement?(data: any, options: DataTableShowSelectionElementOptions): boolean | undefined | null;
    children?: React.ReactNode;
}

export declare class DataTable extends React.Component<DataTableProps, any> {
    public clearState(): void;
    public closeEditingCell(): void;
    public exportCSV(options?: { selectionOnly: boolean }): void;
    public filter<T>(value: T, field: string, mode: DataTableFilterMatchModeType, index?: number): void;
    public reset(): void;
    public resetColumnOrder(): void;
    public resetScroll(): void;
    public restoreColumnWidths(): void;
    public restoreState(): void;
    public restoreTableState(state: any): void;
    public saveState(): void;
    public getElement(): HTMLDivElement;
    public getTable(): HTMLTableElement;
    public getVirtualScroller(): VirtualScroller;
}
