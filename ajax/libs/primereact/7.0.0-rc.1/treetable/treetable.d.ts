import * as React from 'react';
import { ColumnProps } from '../column';
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

type TreeTableSelectionKeys = string | TreeTableSelectionKeysType | undefined | null;

type TreeTableFilterModeType = 'lenient' | 'strict';

type TreeTableAppendToType = 'self' | HTMLElement | undefined | null;

interface TreeTableSelectionKeysType {
    [key: string]: boolean;
}

type TreeTableExpandedKeysType = {
    [key: string]: boolean;
}

interface TreeTableSortMeta {
    sortField: string;
    sortOrder: TreeTableSortOrderType;
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
    value: TreeTableSelectionKeysType
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

export interface TreeTableProps {
    id?: string;
    value?: TreeNode[];
    header?: React.ReactNode;
    footer?: React.ReactNode;
    style?: object;
    className?: string;
    tableStyle?: object;
    tableClassName?: string;
    expandedKeys?: TreeTableExpandedKeysType;
    paginator?: boolean;
    paginatorPosition?: TreeTablePaginatorPositionType;
    alwaysShowPaginator?: boolean;
    paginatorClassName?: string;
    paginatorTemplate?: PaginatorTemplate;
    paginatorLeft?: React.ReactNode;
    paginatorRight?: React.ReactNode;
    pageLinkSize?: number;
    paginatorDropdownAppendTo?: TreeTableAppendToType;
    rowsPerPageOptions?: number[];
    currentPageReportTemplate?: string;
    first?: number;
    rows?: number;
    totalRecords?: number;
    lazy?: boolean;
    sortField?: string;
    sortOrder?: TreeTableSortOrderType;
    multiSortMeta?: TreeTableMultiSortMetaType;
    sortMode?: TreeTableSortModeType;
    defaultSortOrder?: TreeTableSortOrderType;
    removableSort?: boolean;
    selectionMode?: TreeTableSelectionModeType;
    selectionKeys?: TreeTableSelectionKeys;
    contextMenuSelectionKey?: string;
    metaKeySelection?: boolean;
    selectOnEdit?: boolean;
    propagateSelectionUp?: boolean;
    propagateSelectionDown?: boolean;
    autoLayout?: boolean;
    loading?: boolean;
    loadingIcon?: string;
    tabIndex?: number;
    scrollable?: boolean;
    scrollHeight?: string;
    reorderableColumns?: boolean;
    headerColumnGroup?: React.ReactElement;
    footerColumnGroup?: React.ReactElement;
    frozenHeaderColumnGroup?: React.ReactElement;
    frozenFooterColumnGroup?: React.ReactElement;
    frozenWidth?: string;
    resizableColumns?: boolean;
    columnResizeMode?: TreeTableColumnResizeModeType;
    emptyMessage?: string;
    filters?: TreeTableFilterMeta;
    globalFilter?: TreeTableGlobalFilterType;
    filterMode?: TreeTableFilterModeType;
    filterDelay?: number;
    filterLocale?: string;
    showGridlines?: boolean;
    stripedRows?: boolean;
    rowClassName?(data: TreeNode): object;
    onFilter?(filters: TreeTableFilterMeta[]): void;
    onExpand?(e: TreeTableEventParams): void;
    onCollapse?(e: TreeTableEventParams): void;
    onToggle?(e: TreeTableToggleParams): void;
    onPage?(e: TreeTablePageParams): void;
    onSort?(e: TreeTableSortParams): void;
    onSelect?(e: TreeTableEventParams): void;
    onUnselect?(e: TreeTableEventParams): void;
    onRowClick?(e: TreeTableEventParams): void;
    onSelectionChange?(e: TreeTableSelectionParams): void;
    onContextMenuSelectionChange?(e: TreeTableSelectionParams): void;
    onColumnResizeEnd?(e: TreeTableColumnResizeEndParams): void;
    onColReorder?(e: TreeTableColReorderParams): void;
    onContextMenu?(e: TreeTableEventParams): void;
}

export declare class TreeTable extends React.Component<TreeTableProps, any> {
    public filter<T>(value: T, field: string, mode: TreeTableFilterMatchModeType): void;
}
