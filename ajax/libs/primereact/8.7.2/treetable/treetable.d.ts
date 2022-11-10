import * as React from 'react';
import { ColumnFilterMatchModeType, ColumnProps } from '../column';
import { PaginatorTemplate } from '../paginator';
import TreeNode from '../treenode';

type TreeTablePaginatorPositionType = 'top' | 'bottom' | 'both';

type TreeTableSortModeType = 'single' | 'multiple';

type TreeTableSortOrderType = 1 | 0 | -1 | undefined | null;

type TreeTableMultiSortMetaType = TreeTableSortMeta[] | undefined | null;

type TreeTableSelectionModeType = 'single' | 'multiple' | 'checkbox';

type TreeTableColumnResizeModeType = 'fit' | 'expand';

type TreeTableFilterMatchModeType = 'startsWith' | 'contains' | 'endsWith' | 'equals' | 'notEquals' | 'in' | 'lt' | 'lte' | 'gt' | 'gte' | 'custom';

type TreeTableGlobalFilterType = string | undefined | null;

type TreeTableSelectionKeys = string | TreeTableSelectionKeysType | TreeTableSelectionKeysType[] | undefined | null;

type TreeTableSelectionKeyType = boolean | TreeTableCheckboxSelectionKeyType;

type TreeTableFilterModeType = 'lenient' | 'strict';

type TreeTableAppendToType = 'self' | HTMLElement | undefined | null;

interface TreeTableSelectionKeysType {
    [key: string]: TreeTableSelectionKeyType;
}

interface TreeTableCheckboxSelectionKeyType {
    checked?: boolean;
    partialChecked?: boolean;
}

type TreeTableExpandedKeysType = {
    [key: string]: boolean;
};

interface TreeTableSortMeta {
    field: string;
    order: TreeTableSortOrderType;
}

interface TreeTableFilterMetaData {
    value: any;
    matchMode: TreeTableFilterMatchModeType;
}

interface TreeTableFilterMeta {
    [key: string]: TreeTableFilterMetaData;
}

interface TreeTableEventParams {
    originalEvent: React.SyntheticEvent;
    node: TreeNode;
}

interface TreeTableToggleParams {
    originalEvent: React.SyntheticEvent;
    value: TreeTableExpandedKeysType;
}

interface TreeTablePageParams {
    first: number;
    rows: number;
    page: number;
    pageCount: number;
}

interface TreeTableSortParams {
    sortField: string;
    sortOrder: TreeTableSortOrderType;
    multiSortMeta: TreeTableMultiSortMetaType;
}

interface TreeTableSelectionParams {
    originalEvent: React.SyntheticEvent;
    value: TreeTableSelectionKeysType;
}

interface TreeTableColumnResizeEndParams {
    element: HTMLElement;
    column: ColumnProps;
    delta: number;
}

interface TreeTableColReorderParams {
    originalEvent: React.DragEvent<HTMLElement>;
    dragIndex: number;
    dropIndex: number;
    columns: React.ReactElement;
}

export interface TreeTableProps extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'onContextMenu' | 'onSelect' | 'ref' | 'value'> {
    alwaysShowPaginator?: boolean;
    autoLayout?: boolean;
    children?: React.ReactNode;
    className?: string;
    columnResizeMode?: TreeTableColumnResizeModeType;
    contextMenuSelectionKey?: string;
    currentPageReportTemplate?: string;
    defaultSortOrder?: TreeTableSortOrderType;
    emptyMessage?: string;
    expandedKeys?: TreeTableExpandedKeysType;
    filterDelay?: number;
    filterLocale?: string;
    filterMode?: TreeTableFilterModeType;
    filters?: TreeTableFilterMeta;
    first?: number;
    footer?: React.ReactNode;
    footerColumnGroup?: React.ReactElement;
    frozenFooterColumnGroup?: React.ReactElement;
    frozenHeaderColumnGroup?: React.ReactElement;
    frozenWidth?: string;
    globalFilter?: TreeTableGlobalFilterType;
    globalFilterMatchMode?: ColumnFilterMatchModeType;
    header?: React.ReactNode;
    headerColumnGroup?: React.ReactElement;
    id?: string;
    lazy?: boolean;
    loading?: boolean;
    loadingIcon?: string;
    metaKeySelection?: boolean;
    multiSortMeta?: TreeTableMultiSortMetaType;
    pageLinkSize?: number;
    paginator?: boolean;
    paginatorClassName?: string;
    paginatorDropdownAppendTo?: TreeTableAppendToType;
    paginatorLeft?: React.ReactNode;
    paginatorPosition?: TreeTablePaginatorPositionType;
    paginatorRight?: React.ReactNode;
    paginatorTemplate?: PaginatorTemplate;
    propagateSelectionDown?: boolean;
    propagateSelectionUp?: boolean;
    removableSort?: boolean;
    reorderableColumns?: boolean;
    resizableColumns?: boolean;
    rowHover?: boolean;
    rows?: number;
    rowsPerPageOptions?: number[];
    scrollHeight?: string;
    scrollable?: boolean;
    selectOnEdit?: boolean;
    selectionKeys?: TreeTableSelectionKeys;
    selectionMode?: TreeTableSelectionModeType;
    showGridlines?: boolean;
    sortField?: string;
    sortMode?: TreeTableSortModeType;
    sortOrder?: TreeTableSortOrderType;
    stripedRows?: boolean;
    style?: React.CSSProperties;
    tabIndex?: number;
    tableClassName?: string;
    tableStyle?: React.CSSProperties;
    totalRecords?: number;
    value?: TreeNode[];
    onColReorder?(e: TreeTableColReorderParams): void;
    onCollapse?(e: TreeTableEventParams): void;
    onColumnResizeEnd?(e: TreeTableColumnResizeEndParams): void;
    onContextMenu?(e: TreeTableEventParams): void;
    onContextMenuSelectionChange?(e: TreeTableSelectionParams): void;
    onExpand?(e: TreeTableEventParams): void;
    onFilter?(filters: TreeTableFilterMeta[]): void;
    onPage?(e: TreeTablePageParams): void;
    onRowClick?(e: TreeTableEventParams): void;
    onSelect?(e: TreeTableEventParams): void;
    onSelectionChange?(e: TreeTableSelectionParams): void;
    onSort?(e: TreeTableSortParams): void;
    onToggle?(e: TreeTableToggleParams): void;
    onUnselect?(e: TreeTableEventParams): void;
    rowClassName?(data: TreeNode): object;
}

export declare class TreeTable extends React.Component<TreeTableProps, any> {
    public filter<T>(value: T, field: string, mode: TreeTableFilterMatchModeType): void;
    public getElement(): HTMLDivElement;
}
