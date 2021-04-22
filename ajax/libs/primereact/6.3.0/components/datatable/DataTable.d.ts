import * as React from 'react';
import { Column } from '../column/Column';
import { Paginator } from '../paginator/Paginator';

declare namespace DataTable {

    type PaginatorPositionType = 'top' | 'bottom' | 'both';

    type SortModeType = 'single' | 'multiple';

    type SortOrderType = 1 | 0 | -1 | undefined | null;

    type EmptyMessageType = React.ReactNode | ((frozen: boolean) => React.ReactNode);

    type SelectionModeType = 'single' | 'multiple' | 'checkbox' | 'radiobutton';

    type ColumnResizeModeType = 'fit' | 'expand';

    type FilterMatchModeType = 'startsWith' | 'contains' | 'endsWith' | 'equals' | 'notEquals' | 'in' | 'lt' | 'lte' | 'gt' | 'gte' | 'custom';

    type GlobalFilterType = string | undefined | null;

    type MultiSortMetaType = SortMeta[] | undefined | null;

    type CompareSelectionByType = 'deepEquals' | 'equals';

    type StateStorageType = 'session' | 'local' | 'custom';

    interface SortMeta {
        field: string;
        order: SortOrderType;
    }

    interface FilterMetaData {
        value: any;
        matchMode: FilterMatchModeType;
    }

    interface FilterMeta {
        [key: string]: FilterMetaData;
    }

    interface ExpandedRows {
        [key: string]: boolean;
    }

    interface EditingRows {
        [key: string]: boolean;
    }

    interface ShowElementParams {
        data: any;
    }

    interface EventParams {
        originalEvent: React.SyntheticEvent;
        value: any;
    }

    interface PageParams {
        first: number;
        rows: number;
    }

    interface RowToggleParams {
        data: any[];
    }

    interface ColumnResizeEndParams {
        element: HTMLElement;
        column: Column.ColumnProps;
        delta: number;
    }

    interface SortParams {
        sortField: string;
        sortOrder: SortOrderType;
        multiSortMeta: MultiSortMetaType;
    }

    interface FilterParams {
        filters: FilterMeta;
    }

    interface RowEventParams extends EventParams {
        index: number;
    }

    interface RowClickEventParams extends Omit<RowEventParams, 'originalEvent'> {
        originalEvent: React.MouseEvent<HTMLElement>;
    }

    interface CellClickEventParams {
        originalEvent: React.MouseEvent<HTMLElement>;
        value: any;
        field: string;
        rowData: any;
        rowIndex: number;
        cellIndex: number;
        selected: boolean;
    }

    interface RowEditSaveParams extends RowEventParams {
        valid: boolean;
    }

    interface SelectParams {
        originalEvent: React.SyntheticEvent;
        data: any;
        type: string;
    }

    interface UnselectParams extends SelectParams { }

    interface ExportFunctionParams {
        data: any;
        field: string;
    }

    interface ColReorderParams {
        originalEvent: React.DragEvent<HTMLElement>;
        dragIndex: number;
        dropIndex: number;
        columns: React.ReactElement;
    }

    interface RowReorderParams {
        originalEvent: React.DragEvent<HTMLElement>;
        value: any;
        dragIndex: number;
        dropIndex: number;
    }

    interface DataTableProps {
        id?: string;
        value?: any[];
        header?: React.ReactNode;
        footer?: React.ReactNode;
        style?: object;
        className?: string;
        tableStyle?: object;
        tableClassName?: string;
        paginator?: boolean;
        paginatorPosition?: PaginatorPositionType;
        alwaysShowPaginator?: boolean;
        paginatorClassName?: string;
        paginatorTemplate?: Paginator.PaginatorTemplate;
        paginatorLeft?: React.ReactNode;
        paginatorRight?: React.ReactNode;
        paginatorDropdownAppendTo?: HTMLElement | string;
        pageLinkSize?: number;
        rowsPerPageOptions?: number[];
        currentPageReportTemplate?: string;
        first?: number;
        rows?: number;
        totalRecords?: number;
        lazy?: boolean;
        sortField?: string;
        sortOrder?: SortOrderType;
        multiSortMeta?: MultiSortMetaType;
        sortMode?: SortModeType;
        defaultSortOrder?: SortOrderType;
        removableSort?: boolean;
        emptyMessage?: EmptyMessageType;
        selectionMode?: SelectionModeType;
        dragSelection?: boolean;
        cellSelection?: boolean;
        selection?: any | any[];
        contextMenuSelection?: object;
        compareSelectionBy?: CompareSelectionByType;
        dataKey?: string;
        metaKeySelection?: boolean;
        selectOnEdit?: boolean;
        headerColumnGroup?: React.ReactNode;
        footerColumnGroup?: React.ReactNode;
        frozenHeaderColumnGroup?: React.ReactNode;
        frozenFooterColumnGroup?: React.ReactNode;
        expandedRows?: any[] | ExpandedRows;
        resizableColumns?: boolean;
        columnResizeMode?: ColumnResizeModeType;
        reorderableColumns?: boolean;
        filters?: FilterMeta;
        globalFilter?: GlobalFilterType;
        filterDelay?: number;
        filterLocale?: string;
        scrollable?: boolean;
        scrollHeight?: string;
        virtualScroll?: boolean;
        virtualScrollDelay?: number;
        virtualRowHeight?: number;
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
        stateStorage?: StateStorageType;
        groupField?: string;
        editMode?: string;
        editingRows?: any[] | EditingRows;
        expandableRowGroups?: boolean;
        rowHover?: boolean;
        showSelectionElement?(e: ShowElementParams): boolean | undefined | null;
        showReorderElement?(e: ShowElementParams): boolean | undefined | null;
        onSelectionChange?(e: EventParams): void;
        onContextMenuSelectionChange?(e: EventParams): void;
        rowExpansionTemplate?(data: any): React.ReactNode;
        onRowToggle?(e: RowToggleParams): void;
        rowClassName?(data: any): object;
        rowGroupHeaderTemplate?(data: any, index: number): React.ReactNode;
        rowGroupFooterTemplate?(data: any, index: number): React.ReactNode;
        onColumnResizeEnd?(e: ColumnResizeEndParams): void;
        onSort?(e: SortParams): void;
        onPage?(e: PageParams): void;
        onFilter?(e: FilterParams): void;
        onVirtualScroll?(e: PageParams): void;
        onRowClick?(e: RowClickEventParams): void;
        onRowDoubleClick?(e: RowClickEventParams): void;
        onRowSelect?(e: SelectParams): void;
        onRowUnselect?(e: UnselectParams): void;
        onRowExpand?(e: EventParams): void;
        onRowCollapse?(e: EventParams): void;
        onCellClick?(e: CellClickEventParams): void;
        onCellSelect?(e: SelectParams): void;
        onCellUnselect?(e: UnselectParams): void;
        onContextMenu?(e: EventParams): void;
        onColReorder?(e: ColReorderParams): void;
        onRowReorder?(e: RowReorderParams): void;
        onValueChange?(value: any[]): void;
        rowEditorValidator?(data: any): boolean;
        onRowEditInit?(e: RowEventParams): void;
        onRowEditSave?(e: RowEditSaveParams): void;
        onRowEditCancel?(e: RowEventParams): void;
        onRowEditChange?(e: RowEventParams): void;
        exportFunction?(e: ExportFunctionParams): any;
        customSaveState?(state: object): void;
        customRestoreState?(): object;
        onStateSave?(state: object): void;
        onStateRestore?(state: object): void;
    }
}

export declare class DataTable extends React.Component<DataTable.DataTableProps, any> {
    public reset(): void;
    public exportCSV(options: { selectionOnly: boolean }): void;
    public filter<T>(value: T, field: string, mode: DataTable.FilterMatchModeType): void;
    public resetColumnOrder(): void;
    public closeEditingCell(): void;
}
