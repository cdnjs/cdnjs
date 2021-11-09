import * as React from 'react';
import { Column } from '../column';
import { PaginatorTemplate } from '../paginator';
import { VirtualScrollerProps } from '../virtualscroller/virtualscroller';

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

interface DataTablePageParams {
    first: number;
    rows: number;
    page: number;
    pageCount: number;
}

interface DataTableRowToggleParams {
    data: any[];
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

interface DataTableSortParams {
    sortField: string;
    sortOrder: DataTableSortOrderType;
    multiSortMeta: DataTableMultiSortMetaType;
}

interface DataTableFilterParams {
    filters: DataTableFilterMeta;
}

interface DataTableSelectionChangeParams {
    originalEvent: React.SyntheticEvent;
    value: any;
    [key: string]: any;
}

interface DataTableRowEventParams {
    originalEvent: React.SyntheticEvent;
    data: any;
}

interface DataTableRowClickEventParams extends Omit<DataTableRowEventParams, 'originalEvent'> {
    originalEvent: React.MouseEvent<HTMLElement>;
    index: number;
}

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

interface DataTableUnselectParams extends DataTableSelectParams { }

interface DataTableExportFunctionParams {
    data: any;
    field: string;
    rowData: any;
    column: Column
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
}

interface DataTableRowClassNameOptions {
    props: DataTableProps;
}

interface DataTableCellClassNameOptions {
    props: DataTableProps;
    rowData: any;
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

export interface DataTableProps {
    id?: string;
    value?: any[];
    header?: DataTableHeaderTemplateType;
    footer?: DataTableFooterTemplateType;
    style?: object;
    className?: string;
    tableStyle?: object;
    tableClassName?: string;
    paginator?: boolean;
    paginatorPosition?: DataTablePaginatorPositionType;
    alwaysShowPaginator?: boolean;
    paginatorClassName?: string;
    paginatorTemplate?: PaginatorTemplate;
    paginatorLeft?: React.ReactNode;
    paginatorRight?: React.ReactNode;
    paginatorDropdownAppendTo?: DataTableAppendToType;
    pageLinkSize?: number;
    rowsPerPageOptions?: number[];
    currentPageReportTemplate?: string;
    first?: number;
    rows?: number;
    totalRecords?: number;
    lazy?: boolean;
    sortField?: string;
    sortOrder?: DataTableSortOrderType;
    multiSortMeta?: DataTableMultiSortMetaType;
    sortMode?: DataTableSortModeType;
    defaultSortOrder?: DataTableSortOrderType;
    removableSort?: boolean;
    emptyMessage?: DataTableEmptyMessageType;
    selectionMode?: DataTableSelectionModeType;
    dragSelection?: boolean;
    cellSelection?: boolean;
    selection?: any | any[];
    contextMenuSelection?: object;
    compareSelectionBy?: DataTableCompareSelectionByType;
    dataKey?: string;
    metaKeySelection?: boolean;
    selectOnEdit?: boolean;
    headerColumnGroup?: React.ReactNode;
    footerColumnGroup?: React.ReactNode;
    expandedRows?: any[] | DataTableExpandedRows;
    resizableColumns?: boolean;
    columnResizeMode?: DataTableColumnResizeModeType;
    reorderableColumns?: boolean;
    filters?: DataTableFilterMeta;
    globalFilter?: DataTableGlobalFilterType;
    filterDelay?: number;
    filterLocale?: string;
    scrollable?: boolean;
    scrollHeight?: string;
    scrollDirection?: DataTableScrollDirectionType;
    virtualScrollerOptions?: VirtualScrollerProps;
    frozenWidth?: string;
    frozenValue?: any[];
    csvSeparator?: string;
    exportFilename?: string;
    rowGroupMode?: string;
    autoLayout?: boolean;
    loading?: boolean;
    loadingIcon?: string;
    tabIndex?: number;
    stateKey?: string;
    stateStorage?: DataTableStateStorageType;
    groupRowsBy?: string;
    editMode?: string;
    editingRows?: any[] | DataTableEditingRows;
    expandableRowGroups?: boolean;
    rowHover?: boolean;
    showGridlines?: boolean;
    stripedRows?: boolean;
    size?: DataTableSizeType;
    responsiveLayout?: DataTableResponsiveLayoutType;
    breakpoint?: string;
    filterDisplay?: DataTableFilterDisplayType;
    expandedRowIcon?: string;
    collapsedRowIcon?: string;
    globalFilterFields?: string[];
    rowGroupHeaderTemplate?: DataTableRowGroupHeaderTemplateType;
    rowGroupFooterTemplate?: DataTableRowGroupFooterTemplateType
    onRowEditComplete?(e: DataTableRowEditCompleteParams): void;
    showSelectionElement?(data: any, options: DataTableShowSelectionElementOptions): boolean | undefined | null;
    showRowReorderElement?(data: any, options: DataTableShowRowReorderElementOptions): boolean | undefined | null;
    onSelectionChange?(e: DataTableSelectionChangeParams): void;
    onContextMenuSelectionChange?(e: DataTableSelectionChangeParams): void;
    rowExpansionTemplate?(data: any, options: DataTableRowExpansionTemplate): React.ReactNode;
    onRowToggle?(e: DataTableRowToggleParams): void;
    rowClassName?(data: any, options: DataTableRowClassNameOptions): object | string;
    cellClassName?(value: any, options: DataTableCellClassNameOptions): object | string;
    onColumnResizeEnd?(e: DataTableColumnResizeEndParams): void;
    onColumnResizerClick?(e: DataTableColumnResizerClickParams): void;
    onColumnResizerDoubleClick?(e: DataTableColumnResizerClickParams): void;
    onSort?(e: DataTableSortParams): void;
    onPage?(e: DataTablePageParams): void;
    onFilter?(e: DataTableFilterParams): void;
    onAllRowsSelect?(e: DataTableSelectParams): void;
    onAllRowsUnselect?(e: DataTableUnselectParams): void;
    onRowClick?(e: DataTableRowClickEventParams): void;
    onRowDoubleClick?(e: DataTableRowClickEventParams): void;
    onRowSelect?(e: DataTableSelectParams): void;
    onRowUnselect?(e: DataTableUnselectParams): void;
    onRowExpand?(e: DataTableRowEventParams): void;
    onRowCollapse?(e: DataTableRowEventParams): void;
    onCellClick?(e: DataTableCellClickEventParams): void;
    onCellSelect?(e: DataTableSelectParams): void;
    onCellUnselect?(e: DataTableUnselectParams): void;
    onContextMenu?(e: DataTableRowEventParams): void;
    onColReorder?(e: DataTableColReorderParams): void;
    onRowReorder?(e: DataTableRowReorderParams): void;
    onValueChange?(value: any[]): void;
    rowEditValidator?(data: any, options: DataTableRowEditValidatorOptions): boolean;
    onRowEditInit?(e: DataTableRowEditParams): void;
    onRowEditSave?(e: DataTableRowEditSaveParams): void;
    onRowEditCancel?(e: DataTableRowEditParams): void;
    onRowEditChange?(e: DataTableRowEditParams): void;
    exportFunction?(e: DataTableExportFunctionParams): any;
    customSaveState?(state: object): void;
    customRestoreState?(): object;
    onStateSave?(state: object): void;
    onStateRestore?(state: object): void;
}

export declare class DataTable extends React.Component<DataTableProps, any> {
    public reset(): void;
    public exportCSV(options?: { selectionOnly: boolean }): void;
    public filter<T>(value: T, field: string, mode: DataTableFilterMatchModeType, index?: number): void;
    public resetColumnOrder(): void;
    public closeEditingCell(): void;
}
