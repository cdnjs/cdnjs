import * as React from 'react';
import { ColumnProps } from 'primereact/column';
import { PaginatorTemplate } from 'primereact/paginator';

declare module 'primereact/datatable' {

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

    type AppendToType = 'self' | HTMLElement | undefined | null;

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

    interface PageParams {
        first: number;
        rows: number;
    }

    interface RowToggleParams {
        data: any[];
    }

    interface ColumnResizeEndParams {
        element: HTMLElement;
        column: ColumnProps;
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

    interface SelectionChangeParams {
        originalEvent: React.SyntheticEvent;
        value: any;
        [key: string]: any;
    }

    interface RowEventParams {
        originalEvent: React.SyntheticEvent;
        data: any;
    }

    interface RowClickEventParams extends Omit<RowEventParams, 'originalEvent'> {
        originalEvent: React.MouseEvent<HTMLElement>;
        index: number;
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

    interface RowEditParams extends RowEventParams {
        index: number;
    }

    interface RowEditSaveParams extends RowEditParams {
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

    export interface DataTableProps {
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
        paginatorTemplate?: PaginatorTemplate;
        paginatorLeft?: React.ReactNode;
        paginatorRight?: React.ReactNode;
        paginatorDropdownAppendTo?: AppendToType;
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
        showSelectionElement?(data: any): boolean | undefined | null;
        showRowReorderElement?(data: any): boolean | undefined | null;
        onSelectionChange?(e: SelectionChangeParams): void;
        onContextMenuSelectionChange?(e: RowEventParams): void;
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
        onRowExpand?(e: RowEventParams): void;
        onRowCollapse?(e: RowEventParams): void;
        onCellClick?(e: CellClickEventParams): void;
        onCellSelect?(e: SelectParams): void;
        onCellUnselect?(e: UnselectParams): void;
        onContextMenu?(e: RowEventParams): void;
        onColReorder?(e: ColReorderParams): void;
        onRowReorder?(e: RowReorderParams): void;
        onValueChange?(value: any[]): void;
        rowEditorValidator?(data: any): boolean;
        onRowEditInit?(e: RowEditParams): void;
        onRowEditSave?(e: RowEditSaveParams): void;
        onRowEditCancel?(e: RowEditParams): void;
        onRowEditChange?(e: RowEditParams): void;
        exportFunction?(e: ExportFunctionParams): any;
        customSaveState?(state: object): void;
        customRestoreState?(): object;
        onStateSave?(state: object): void;
        onStateRestore?(state: object): void;
    }

    export class DataTable extends React.Component<DataTableProps, any> {
        public reset(): void;
        public exportCSV(options: { selectionOnly: boolean }): void;
        public filter<T>(value: T, field: string, mode: FilterMatchModeType): void;
        public resetColumnOrder(): void;
        public closeEditingCell(): void;
    }
}
