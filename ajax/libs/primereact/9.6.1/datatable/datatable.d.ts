/**
 *
 * DataTable displays data in tabular format.
 *
 * [Live Demo](https://www.primereact.org/datatable/)
 *
 * @module datatable
 *
 */
import * as React from 'react';
import { Column, ColumnProps } from '../column';
import { PaginatorPassThroughOptions, PaginatorTemplate } from '../paginator';
import { IconType, PassThroughType } from '../utils/utils';
import { VirtualScroller, VirtualScrollerPassThroughOptions, VirtualScrollerProps } from '../virtualscroller/virtualscroller';
import { TooltipPassThroughOptions } from '../tooltip/tooltip';

type DataTableHeaderTemplateType<TValue extends DataTableValueArray> = React.ReactNode | ((options: DataTableHeaderTemplateOptions<TValue>) => React.ReactNode);

type DataTableFooterTemplateType<TValue extends DataTableValueArray> = React.ReactNode | ((options: DataTableFooterTemplateOptions<TValue>) => React.ReactNode);

type DataTableRowGroupHeaderTemplateType<TValue extends DataTableValueArray> = React.ReactNode | ((data: any, options: DataTableRowGroupHeaderTemplateOptions<TValue>) => React.ReactNode);

type DataTableRowGroupFooterTemplateType<TValue extends DataTableValueArray> = React.ReactNode | ((data: any, options: DataTableRowGroupFooterTemplateOptions<TValue>) => React.ReactNode);

/**
 * Custom datatable header template options.
 */
interface DataTableHeaderTemplateOptions<TValue extends DataTableValueArray> {
    /**
     * The props of the datatable.
     */
    props: DataTableProps<TValue>;
}

interface DataTableFooterTemplateOptions<TValue extends DataTableValueArray> extends DataTableHeaderTemplateOptions<TValue> {}

/**
 * Custom datatable row group header template options.
 */
interface DataTableRowGroupHeaderTemplateOptions<TValue extends DataTableValueArray> {
    /**
     * index of the row group header template.
     */
    index: number;
    /**
     * The props of the datatable.
     */
    props: DataTableProps<TValue>;
    /**
     * Used to override the rendering of the content.
     */
    customRendering: boolean;
}

/**
 * Custom datatable row group footer template options.
 */
interface DataTableRowGroupFooterTemplateOptions<T extends DataTableValueArray> extends DataTableRowGroupHeaderTemplateOptions<T> {
    /**
     * Number of columns to span for grouping.
     */
    colSpan: number;
}

/**
 * Custom datatable sort meta
 */
interface DataTableSortMeta {
    /**
     * Column field to sort against.
     */
    field: string;
    /**
     * Sort order as integer.
     */
    order: 1 | 0 | -1 | null | undefined;
}

/**
 * Custom datatable filter metadata.
 */
interface DataTableFilterMetaData {
    /**
     * Value to filter against.
     */
    value: any;
    /**
     * Type of filter match.
     */
    matchMode: 'startsWith' | 'contains' | 'notContains' | 'endsWith' | 'equals' | 'notEquals' | 'in' | 'lt' | 'lte' | 'gt' | 'gte' | 'between' | 'dateIs' | 'dateIsNot' | 'dateBefore' | 'dateAfter' | 'custom' | undefined;
}

/**
 * Custom datatable operator filter metadata.
 */
interface DataTableOperatorFilterMetaData {
    /**
     * Operator to use for filtering.
     */
    operator: string;
    /**
     * Operator to use for filtering.
     */
    constraints: DataTableFilterMetaData[];
}

/**
 * Custom datatable filter meta.
 */
interface DataTableFilterMeta {
    /**
     * Extra options.
     */
    [key: string]: DataTableFilterMetaData | DataTableOperatorFilterMetaData;
}

/**
 * Custom datatable expanded rows.
 */
interface DataTableExpandedRows {
    [key: string]: boolean;
}

/**
 * Custom datatable editing rows.
 */
interface DataTableEditingRows {
    [key: string]: boolean;
}

/**
 * Custom row toggle event.
 * @see {@link DataTableProps.onRowToggle}
 * @event
 */
interface DataTableRowToggleEvent {
    /**
     * Expanded rows.
     */
    data: any[] | DataTableExpandedRows;
}

/**
 * Custom resize end event.
 * @see {@link DataTableProps.onColumnResizeEnd}
 * @event
 */
interface DataTableColumnResizeEndEvent {
    /**
     * DOM element of the resized column.
     */
    element: HTMLElement;
    /**
     * Properties of the resized column.
     */
    column: Column;
    /**
     * Change in column width.
     */
    delta: number;
}

/**
 * Custom column resizer click event.
 * @see {@link DataTableProps.onColumnResizerClick}, {@link DataTableProps.onColumnResizerDoubleClick}
 * @event
 */
interface DataTableColumnResizerClickEvent {
    /**
     * Browser event.
     */
    originalEvent: React.MouseEvent<HTMLElement>;
    /**
     * DOM element of the column.
     */
    element: HTMLElement;
    /**
     * Properties of the column.
     */
    column: Column;
}

/**
 * Custom pagination event
 * @see {@link DataTableProps.onPage}
 * @event
 */
interface DataTablePageEvent {
    /**
     * Index of the first row.
     */
    first: number;
    /**
     * Rows per page.
     */
    rows: number;
    /**
     * The page number of the datatable.
     */
    page?: number;
    /**
     * Total number of pages.
     */
    pageCount?: number;
    /**
     * Extra options.
     */
    [key: string]: any;
}

/**
 * Custom sort event.
 * @see {@link DataTableProps.onSort}
 * @event
 */
interface DataTableSortEvent {
    /**
     * Field to sort against.
     */
    sortField: string;
    /**
     * Sort order as integer.
     */
    sortOrder: 1 | 0 | -1 | null | undefined;
    /**
     * MultiSort metadata.
     */
    multiSortMeta: DataTableSortMeta[] | null | undefined;
    /**
     * Extra options.
     */
    [key: string]: any;
}

/**
 * Custom filter event.
 * @see {@link DataTableProps.onFilter}
 * @event
 */
interface DataTableFilterEvent {
    /**
     * Collection of active filters.
     */
    filters: DataTableFilterMeta;
    /**
     * Extra options.
     */
    [key: string]: any;
}

/**
 * Custom state event containing page, filter and sort states.
 * @see {@link DataTableProps.onFilter}
 * @see {@link DataTableProps.onSort}
 * @see {@link DataTableProps.onPage}
 * @event
 */
interface DataTableStateEvent extends DataTablePageEvent, DataTableFilterEvent, DataTableSortEvent {
    /**
     * Extra options.
     */
    [key: string]: any;
}

/**
 * Custom data selectable event.
 * @see {@link DataTableProps.isDataSelectable}
 * @event
 */
interface DataTableDataSelectableEvent {
    /**
     * Original data of the row.
     */
    data: DataTableValue;
    /**
     * Index of the row.
     */
    index: number;
}

/**
 * Custom selection change event for context menu.
 * @see {@link DataTableProps.onContextMenuSelectionChange}
 * @event
 */
interface DataTableContextMenuSelectionChangeEvent<TValue extends DataTableValueArray> {
    /**
     * Browser event.
     */
    originalEvent: React.SyntheticEvent;
    /**
     * Selection object.
     */
    value: DataTableSelection<TValue>;
}

/**
 * Custom selection change event.
 * @see {@link DataTableProps.onSelectionChange}
 * @event
 */
interface DataTableSelectionChangeEvent<TValue extends DataTableValueArray> {
    /**
     * Browser event.
     */
    originalEvent: React.SyntheticEvent;
    /**
     * Selection object.
     */
    value: DataTableSelection<TValue>;
    /**
     * Type of the selection.
     */
    type?: string;
    /**
     * Extra options.
     */
    [key: string]: any;
}

/**
 * Custom select all change event.
 * @see {@link DataTableProps.onSelectAllChange}
 */
interface DataTableSelectAllChangeEvent {
    /**
     * Browser event.
     */
    originalEvent: React.SyntheticEvent;
    /**
     * Whether all data is selected.
     */
    checked: boolean;
}

/**
 * Custom context menu event.
 * @see {@link DataTableProps.onContextMenu}, {@link DataTableProps.onRowCollapse}, {@link DataTableProps.onRowExpand}
 * @event
 */
interface DataTableRowEvent {
    /**
     * Original event instance.
     */
    originalEvent: React.SyntheticEvent;
    /**
     * Original rows data.
     */
    data: DataTableValue;
}

/**
 * Custom row mouse event.
 * @see {@link DataTableProps.onRowMouseEnter}, {@link DataTableProps.onRowMouseLeave}
 * @extends DataTableRowEvent
 */
interface DataTableRowMouseEvent extends Omit<DataTableRowEvent, 'originalEvent'> {
    /**
     * Browser event.
     */
    originalEvent: React.MouseEvent<HTMLElement>;
    /**
     * Clicked row data index
     */
    index: number;
}

/**
 * Custom row click event.
 * @see {@link DataTableProps.onRowClick}, {@link DataTableProps.onRowDoubleClick}
 * @extends DataTableRowMouseEvent
 * @event
 */
interface DataTableRowClickEvent extends DataTableRowMouseEvent {}

/**
 * Custom cell click event.
 * @see {@link DataTableProps.onCellClick}
 */
interface DataTableCellClickEvent<TValue extends DataTableValueArray> {
    /**
     * Browser event.
     */
    originalEvent: React.MouseEvent<HTMLElement>;
    /**
     * Value of the cell.
     */
    value: any;
    /**
     * Column field.
     */
    field: string;
    /**
     * Data of the row.
     */
    rowData: DataTableRowData<TValue>;
    /**
     * Index of the row.
     */
    rowIndex: number;
    /**
     * Index of the cell.
     */
    cellIndex: number;
    /**
     * Whether the cell is selected or not.
     */
    selected: boolean;
}

/**
 * Custom row edit event.
 * @see {@link DataTableProps.onRowEditInit}, {@link DataTableProps.onRowEditChange}, {@link DataTableProps.onRowEditCancel}
 * @extends DataTableRowEvent
 * @event
 */
interface DataTableRowEditEvent extends DataTableRowEvent {
    /**
     * Index of the row.
     */
    index: number;
}

/**
 * Custom row edit save event.
 * @see {@link DataTableProps.onRowEditSave}
 * @extends DataTableRowEditEvent
 */
interface DataTableRowEditSaveEvent extends DataTableRowEditEvent {
    /**
     * Whether the row is valid or not.
     */
    valid: boolean;
}

/**
 * Custom row edit complete event.
 * @see {@link DataTableProps.onRowEditComplete}
 * @extends DataTableRowEvent
 * @event
 */
interface DataTableRowEditCompleteEvent extends DataTableRowEvent {
    /**
     * Editing rows data.
     */
    newData: DataTableValue;
    /**
     * Column field.
     */
    field: string;
    /**
     * Current editing row data index.
     */
    index: number;
}

/**
 * Custom select event.
 * @see {@link DataTableProps.onAllRowsSelect}, {@link DataTableProps.onRowSelect}
 * @event
 */
interface DataTableSelectEvent {
    /**
     * Browser event.
     */
    originalEvent: React.SyntheticEvent;
    /**
     * Selected rows data.
     */
    data: any;
    /**
     * Type of the selection, valid value is "all".
     */
    type: 'row' | 'cell' | 'checkbox' | 'radio' | 'all' | undefined;
}

/**
 * Custom unselect event.
 * @see {@link DataTableProps.onAllRowsUnselect}, {@link DataTableProps.onRowUnselect}
 * @extends DataTableSelectEvent
 * @event
 */
interface DataTableUnselectEvent extends DataTableSelectEvent {}

/**
 * Custom export function event.
 * @see {@link DataTableProps.exportFunction}
 * @event
 */
interface DataTableExportFunctionEvent<TValue extends DataTableValueArray> {
    /**
     * Field data.
     */
    data: DataTableRowDataArray<TValue>;
    /**
     * Column field.
     */
    field: string;
    /**
     * Data of the row.
     */
    rowData: DataTableRowData<TValue>;
    /**
     * Column.
     */
    column: Column;
}

/**
 * Custom column reorder event.
 * @see {@link DataTableProps.onColReorder}
 * @event
 */
interface DataTableColReorderEvent {
    /**
     * Browser event.
     */
    originalEvent: React.DragEvent<HTMLElement>;
    /**
     * Index of the dragged column.
     */
    dragIndex: number;
    /**
     * Index of the dropped column.
     */
    dropIndex: number;
    /**
     * Columns array after reorder.
     */
    columns: React.ReactElement;
}

/**
 * Custom column reorder event.
 * @see {@link DataTableProps.onRowReorder}
 * @event
 */
interface DataTableRowReorderEvent<TValue extends DataTableValueArray> {
    /**
     * Browser event.
     */
    originalEvent: React.DragEvent<HTMLElement>;
    /**
     * New value after reorder.
     */
    value: DataTableRowDataArray<TValue>;
    /**
     * Index of the dragged row.
     */
    dragIndex: number;
    /**
     * Index of the drop location.
     */
    dropIndex: number;
}

/**
 * Options for the row expansion template
 * @see {@link DataTableProps.rowExpansionTemplate}
 */
interface DataTableRowExpansionTemplate {
    /**
     * Index of the row.
     */
    index: number;
    /**
     * Used to override the rendering of the content.
     */
    customRendering: boolean;
}

/**
 * Custom row className options.
 * @see {@link DataTableProps.rowClassName}
 */
interface DataTableRowClassNameOptions<TValue extends DataTableValueArray> {
    /**
     * The props of the datatable.
     */
    props: DataTableProps<TValue>;
}

/**
 * Custom cell className options.
 * @see {@link DataTableProps.cellClassName}
 */
interface DataTableCellClassNameOptions<TValue extends DataTableValueArray> {
    /**
     * The props of the datatable.
     */
    props: DataTableProps<TValue>;
    /**
     * Column element of the datatable.
     */
    column: Column;
    /**
     * Column field.
     */
    field: string;
    /**
     * Whether the row is frozen or not.
     */
    frozenRow: boolean;
    /**
     * Index of the row.
     */
    rowIndex: number;
}

/**
 * Custom show selection element options.
 * @see {@link DataTableProps.showSelectionElement}
 */
interface DataTableShowSelectionElementOptions<TValue extends DataTableValueArray> {
    /**
     * Index of the row.
     */
    rowIndex: number;
    /**
     * The props of the datatable.
     */
    props: DataTableProps<TValue>;
}

/**
 * Custom show row reorder element options.
 * @see {@link DataTableProps.showRowReorderElement}
 */
interface DataTableShowRowReorderElementOptions<TValue extends DataTableValueArray> {
    /**
     * Index of the row element.
     */
    rowIndex: number;
    /**
     * The props of the datatable.
     */
    props: DataTableProps<TValue>;
}

/**
 * Custom row edit validator options.
 * @see {@link DataTableProps.rowEditValidator}
 */
interface DataTableRowEditValidatorOptions<TValue extends DataTableValueArray> {
    /**
     * The props of the datatable.
     */
    props: DataTableProps<TValue>;
}

/**
 * Custom value definition.
 * @extends Record<string, any>
 */
interface DataTableValue extends Record<string, any> {}

/**
 * Custom value array definition.
 * @extends Array<DataTableValue>
 */
interface DataTableValueArray extends Array<DataTableValue> {}

type DataTableRowData<TValueArray extends DataTableValueArray> = TValueArray extends Array<infer TValue> ? TValue : never;

type DataTableRowDataArray<TValue extends DataTableValueArray> = DataTableRowData<TValue>[];

type DataTableCellSelection<TValue extends DataTableValueArray> = {
    /**
     * Index of the cell.
     */
    cellIndex: number;
    /**
     * Column element of the datatable.
     */
    column: Column;
    /**
     * Column field.
     */
    field: string;
    /**
     * Properties of the column.
     */
    props: ColumnProps;
    /**
     * Data of the row.
     */
    rowData: DataTableRowData<TValue>;
    /**
     * Index of the row.
     */
    rowIndex: number;
    /**
     * Whether the row is selected or not.
     */
    selected: boolean;
    /**
     * Value of the cell.
     */
    value: TValue[number][keyof TValue[number]];
};

type DataTableSelection<TValue extends DataTableValueArray> = DataTableRowData<TValue> | DataTableRowDataArray<TValue> | DataTableCellSelection<TValue>;

export declare type DataTablePassThroughType<T> = PassThroughType<T, DataTablePassThroughMethodOptions<DataTableValueArray>>;

/**
 * Custom passthrough(pt) option method.
 */
export interface DataTablePassThroughMethodOptions<TValue extends DataTableValueArray> {
    props: DataTableProps<TValue>;
    state: DataTableState;
}

/**
 * Defines current inline state in DataTable component.
 */
export interface DataTableState {
    /**
     * Current index of first record as a number.
     */
    first: number;
    /**
     * Current number of rows to display in new page as a number.
     */
    rows: number;
    /**
     * Current sort field.
     */
    sortField: string | ((item: any) => string) | undefined;
    /**
     * Current order to sort the data by default.
     */
    sortOrder: number;
    /**
     * Current sortmeta objects to sort the data.
     */
    multiSortMeta: DataTableSortMeta[];
    /**
     * Current filters object.
     */
    filters: DataTableFilterMeta;
    /**
     * Current order of the columns.
     */
    columnOrder: string[];
    /**
     * Current group sortmeta objects to sort the data.
     */
    groupRowsSortMeta: DataTableSortMeta;
    /**
     * Current editing meta data.
     */
    editingMeta: object;
    /**
     * Current number of rows to display in new page as a number.
     */
    d_rows: number;
    /**
     * Current filters object.
     */
    d_filters: object;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link DataTableProps.pt}
 */
export interface DataTablePassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: DataTablePassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the loading overlay's DOM element.
     */
    loadingOverlay?: DataTablePassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the loading icon's DOM element.
     */
    loadingIcon?: DataTablePassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the header's DOM element.
     */
    header?: DataTablePassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the Paginator component.
     * @see {@link PaginatorPassThroughOptions}
     */
    paginator?: PaginatorPassThroughOptions;
    /**
     * Uses to pass attributes to the wrapper's DOM element.
     */
    wrapper?: DataTablePassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the VirtualScroller component.
     * @see {@link VirtualScrollerPassThroughOptions}
     */
    virtualScroller?: VirtualScrollerPassThroughOptions;
    /**
     * Uses to pass attributes to the table's DOM element.
     */
    table?: DataTablePassThroughType<React.HTMLAttributes<HTMLTableElement>>;
    /**
     * Uses to pass attributes to the virtual scroller spacer's DOM element.
     */
    virtualScrollerSpacer?: DataTablePassThroughType<React.HTMLAttributes<HTMLTableSectionElement>>;
    /**
     * Uses to pass attributes to the footer's DOM element.
     */
    footer?: DataTablePassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the thead's DOM element.
     */
    thead?: DataTablePassThroughType<React.HTMLAttributes<HTMLTableSectionElement>>;
    /**
     * Uses to pass attributes to the header row's DOM element.
     */
    headerRow?: DataTablePassThroughType<React.HTMLAttributes<HTMLTableRowElement>>;
    /**
     * Uses to pass attributes to the tbody's DOM element.
     */
    tbody?: DataTablePassThroughType<React.HTMLAttributes<HTMLTableSectionElement>>;
    /**
     * Uses to pass attributes to the rowgroup header's DOM element.
     */
    rowgroupHeader?: DataTablePassThroughType<React.HTMLAttributes<HTMLTableRowElement>>;
    /**
     * Uses to pass attributes to the rowgroup header name's DOM element.
     */
    rowgroupHeaderName?: DataTablePassThroughType<React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the row's DOM element.
     */
    row?: DataTablePassThroughType<React.HTMLAttributes<HTMLTableRowElement>>;
    /**
     * Uses to pass attributes to the row expansion's DOM element.
     */
    rowExpansion?: DataTablePassThroughType<React.HTMLAttributes<HTMLTableRowElement>>;
    /**
     * Uses to pass attributes to the rowgroup footer's DOM element.
     */
    rowgroupFooter?: DataTablePassThroughType<React.HTMLAttributes<HTMLTableRowElement>>;
    /**
     * Uses to pass attributes to the empty message's DOM element.
     */
    emptyMessage?: DataTablePassThroughType<React.HTMLAttributes<HTMLTableRowElement>>;
    /**
     * Uses to pass attributes to the tfoot's DOM element.
     */
    tfoot?: DataTablePassThroughType<React.HTMLAttributes<HTMLTableSectionElement>>;
    /**
     * Uses to pass attributes to the footerr ow's DOM element.
     */
    footerRow?: DataTablePassThroughType<React.HTMLAttributes<HTMLTableRowElement>>;
    /**
     * Uses to pass attributes to the footer cell's DOM element.
     */
    footerCell?: DataTablePassThroughType<React.HTMLAttributes<HTMLTableCellElement>>;
    /**
     * Uses to pass attributes to the resize helper's DOM element.
     */
    resizeHelper?: DataTablePassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the reorder indicator up's DOM element.
     */
    reorderIndicatorUp?: DataTablePassThroughType<React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the reorder indicator up icon's DOM element.
     */
    reorderIndicatorUpIcon?: DataTablePassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the reorder indicator down's DOM element.
     */
    reorderIndicatorDown?: DataTablePassThroughType<React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the reorder indicator down icon's DOM element.
     */
    reorderIndicatorDownIcon?: DataTablePassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes tooltip's DOM element.
     * @type {TooltipPassThroughOptions}
     */
    tooltip?: TooltipPassThroughOptions;
}

/**
 * Defines valid properties in DataTable component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group Properties
 */
export interface DataTableProps<TValue extends DataTableValueArray> extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'size' | 'onContextMenu' | 'ref' | 'value'> {
    /**
     * Unique identifier of the element.
     */
    id?: string | undefined;
    /**
     * An array of objects to display.
     */
    value?: TValue | undefined;
    /**
     * Whether to show it even there is only one page.
     * @defaultValue true
     */
    alwaysShowPaginator?: boolean | undefined;
    /**
     * The breakpoint to define the maximum width boundary when using stack responsive layout.
     * @defaultValue 960px
     */
    breakpoint?: string | undefined;
    /**
     * Icon to display in the checkbox.
     */
    checkIcon?: IconType<DataTableProps<TValue>> | undefined;
    /**
     * Whether to cell selection is enabled or not.
     * @defaultValue false
     */
    cellSelection?: boolean | undefined;
    /**
     * Style class of the component.
     */
    className?: string | undefined;
    /**
     * Icon of the row toggler to display the row as collapsed.
     */
    collapsedRowIcon?: IconType<DataTableProps<TValue>> | undefined;
    /**
     * Used to define the resize mode of the columns, valid values are "fit" and "expand".
     * @defaultValue fit
     */
    columnResizeMode?: 'fit' | 'expand' | undefined;
    /**
     * Algorithm to define if a row is selected, valid values are "equals" that compares by reference and "deepEquals" that compares all fields.
     * @defaultValue deepEquals
     */
    compareSelectionBy?: 'deepEquals' | 'equals' | undefined;
    /**
     * Selected row in single mode or an array of values in multiple mode.
     */
    contextMenuSelection?: object | undefined;
    /**
     * Character to use as the csv separator.
     * @defaultValue ,
     */
    csvSeparator?: string | undefined;
    /**
     * Template of the current page report element. Available placeholders are &#123;currentPage&#125;, &#123;totalPages&#125;, &#123;rows&#125;, &#123;first&#125;, &#123;last&#125; and &#123;totalRecords&#125;
     * @defaultValue (&#123;currentPage&#125; of &#123;totalPages&#125;)
     */
    currentPageReportTemplate?: string | undefined;
    /**
     * Name of the field that uniquely identifies a record in the data. Should be a unique business key to prevent re-rendering.
     * @defaultValue (&#123;currentPage&#125; of &#123;totalPages&#125;)
     */
    dataKey?: string | undefined;
    /**
     * Default sort order of an unsorted column.
     * @defaultValue (&#123;currentPage&#125; of &#123;totalPages&#125;)
     */
    defaultSortOrder?: 1 | 0 | -1 | null | undefined;
    /**
     * When enabled, a rectangle that can be dragged can be used to make a range selection.
     * @defaultValue false
     */
    dragSelection?: boolean | undefined;
    /**
     * Defines editing mode, options are "cell" and "row".
     * @defaultValue cell
     */
    editMode?: string | undefined;
    /**
     * A collection of rows to represent the current editing data in row edit mode.
     */
    editingRows?: DataTableValueArray | DataTableEditingRows | undefined;
    /**
     * Text to display when there is no data.
     */
    emptyMessage?: React.ReactNode | ((frozen: boolean) => React.ReactNode);
    /**
     * Makes row groups toggleable, default is false.
     * @defaultValue false
     */
    expandableRowGroups?: boolean | undefined;
    /**
     * Icon of the row toggler to display the row as expanded.
     */
    expandedRowIcon?: IconType<DataTableProps<TValue>> | undefined;
    /**
     * A collection of rows or a map object row data keys that are expanded.
     */
    expandedRows?: DataTableValueArray | DataTableExpandedRows | undefined;
    /**
     * Name of the exported file.
     * @defaultValue download
     */
    exportFilename?: string | undefined;
    /**
     * Delay in milliseconds before filtering the data.
     * @defaultValue 300
     */
    filterDelay?: number | undefined;
    /**
     * Layout of the filter elements, valid values are "row" and "menu".
     * @defaultValue menu
     */
    filterDisplay?: 'menu' | 'row' | undefined;
    /**
     * Locale to use in filtering. The default locale is the host environment's current locale.
     * @defaultValue undefined
     */
    filterLocale?: string | undefined;
    /**
     * Icon to display the current filtering status.
     */
    filterIcon?: IconType<DataTable<TValue>> | undefined;
    /**
     * Icon to display when the filter can be cleared.
     */
    filterClearIcon?: IconType<DataTable<TValue>> | undefined;
    /**
     * An array of FilterMetadata objects to provide external filters.
     */
    filters?: DataTableFilterMeta | undefined;
    /**
     * Index of the first row to be displayed.
     * @defaultValue 0
     */
    first?: number | undefined;
    /**
     * Custom footer content of the table.
     */
    footer?: DataTableFooterTemplateType<TValue>;
    /**
     * ColumnGroup component for footer.
     */
    footerColumnGroup?: React.ReactNode | undefined;
    /**
     * Items of the frozen part in scrollable DataTable.
     */
    frozenValue?: DataTableRowDataArray<TValue>;
    /**
     * Width of the frozen part in scrollable DataTable.
     */
    frozenWidth?: string | undefined;
    /**
     * Value of the global filter to use in filtering.
     */
    globalFilter?: string | null | undefined;
    /**
     * Define fields to be filtered globally.
     */
    globalFilterFields?: string[] | undefined;
    /**
     * Defines filterMatchMode; "startsWith", "contains", "endsWith", "equals", "notEquals", "in", "lt", "lte", "gt", "gte" and "custom".
     * @defaultValue contains
     */
    globalFilterMatchMode?: 'startsWith' | 'contains' | 'endsWith' | 'equals' | 'notEquals' | 'in' | 'lt' | 'lte' | 'gt' | 'gte' | 'custom' | undefined;
    /**
     * Used for either be grouped by a separate grouping row or using rowspan.
     */
    groupRowsBy?: string | undefined;
    /**
     * Custom header content of the table.
     */
    header?: DataTableHeaderTemplateType<TValue> | undefined;
    /**
     * ColumnGroup component for header.
     */
    headerColumnGroup?: React.ReactNode | undefined;
    /**
     * Defines if data is loaded and interacted with in lazy manner.
     * @defaultValue false
     */
    lazy?: boolean | undefined;
    /**
     * Displays a loader to indicate data load is in progress.
     * @defaultValue false
     */
    loading?: boolean | undefined;
    /**
     * The icon to show while indicating data load is in progress.
     */
    loadingIcon?: IconType<DataTableProps<TValue>> | undefined;
    /**
     * Defines whether metaKey is requred or not for the selection. When true metaKey needs to be pressed to select or unselect an item and when set to false selection of each item can be toggled individually. On touch enabled devices, metaKeySelection is turned off automatically.
     * @defaultValue true
     */
    metaKeySelection?: boolean | undefined;
    /**
     * An array of SortMeta objects to sort the data by default in multiple sort mode.
     */
    multiSortMeta?: DataTableSortMeta[] | null | undefined;
    /**
     * Number of page links to display.
     * @defaultValue 5
     */
    pageLinkSize?: number | undefined;
    /**
     * When specified as true, enables the pagination.
     * @defaultValue false
     */
    paginator?: boolean | undefined;
    /**
     * Style class of the paginator element.
     */
    paginatorClassName?: string | undefined;
    /**
     * DOM element instance where the overlay panel should be mounted. Valid values are any DOM Element and 'self'. The self value is used to render a component where it is located.
     * @defaultValue document.body
     */
    paginatorDropdownAppendTo?: 'self' | HTMLElement | null | undefined;
    /**
     * Content for the left side of the paginator.
     */
    paginatorLeft?: React.ReactNode | undefined;
    /**
     * Position of the paginator, options are "top","bottom" or "both".
     * @defaultValue bottom
     */
    paginatorPosition?: 'top' | 'bottom' | 'both' | undefined;
    /**
     * Content for the right side of the paginator.
     */
    paginatorRight?: React.ReactNode | undefined;
    /**
     * Template of the paginator. For details, refer to the template section of the paginator documentation for further options.
     * @defaultValue FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown
     */
    paginatorTemplate?: PaginatorTemplate | undefined;
    /**
     * When enabled, columns can have an un-sorted state.
     * @defaultValue false
     */
    removableSort?: boolean | undefined;
    /**
     * When enabled, columns can be reordered using drag and drop.
     * @defaultValue false
     */
    reorderableColumns?: boolean | undefined;
    /**
     * When enabled, rows can be reordered using drag and drop.
     * @defaultValue false
     */
    reorderableRows?: boolean | undefined;
    /**
     * Defines the reorder indicator down icon.
     */
    reorderIndicatorDownIcon?: IconType<DataTableProps<TValue>> | undefined;
    /**
     * Defines the reorder indicator up icon.
     */
    reorderIndicatorUpIcon?: IconType<DataTableProps<TValue>> | undefined;
    /**
     * When enabled, columns can be resized using drag and drop.
     * @defaultValue false
     */
    resizableColumns?: boolean | undefined;
    /**
     * Defines the responsive mode, valid options are "stack" and "scroll".
     * @defaultValue scroll
     * @deprecated since version 9.2.0
     */
    responsiveLayout?: 'scroll' | 'stack' | undefined;
    /**
     * Icon to display in the row editor cancel button.
     */
    rowEditorCancelIcon?: IconType<DataTableProps<TValue>> | undefined;
    /**
     * Icon to display in the row editor init button.
     */
    rowEditorInitIcon?: IconType<DataTableProps<TValue>> | undefined;
    /**
     * Icon to display in the row editor save button.
     */
    rowEditorSaveIcon?: IconType<DataTableProps<TValue>> | undefined;
    /**
     * Function to provide the content of row group footer.
     */
    rowGroupFooterTemplate?: DataTableRowGroupFooterTemplateType<TValue> | undefined;
    /**
     * Function to provide the content of row group header.
     */
    rowGroupHeaderTemplate?: DataTableRowGroupHeaderTemplateType<TValue> | undefined;
    /**
     * Defines the row grouping mode, valid values are "subheader" and "rowgroup".
     */
    rowGroupMode?: string | undefined;
    /**
     * When enabled, background of the rows change on hover.
     */
    rowHover?: boolean | undefined;
    /**
     * Number of rows to display per page.
     */
    rows?: number | undefined;
    /**
     * Array of integer values to display inside rows per page dropdown.
     */
    rowsPerPageOptions?: number[] | undefined;
    /**
     * Height of the scroll viewport.
     */
    scrollHeight?: string | undefined;
    /**
     * When specified, enables horizontal and/or vertical scrolling.
     * @defaultValue false
     */
    scrollable?: boolean | undefined;
    /**
     * When specified, selects all rows on page.
     * @defaultValue false
     */
    selectAll?: boolean | undefined;
    /**
     * Determines whether the cell editor will be opened when clicking to select any row on Selection and Cell Edit modes.
     * @defaultValue true
     */
    selectOnEdit?: boolean | undefined;
    /**
     * Selected row in single mode or an array of values in multiple mode.
     * @defaultValue true
     */
    selection?: DataTableSelection<TValue> | undefined;
    /**
     * When a selectable row is clicked on RadioButton and Checkbox selection, it automatically decides whether to focus on elements such as checkbox or radio.
     * @defaultValue true
     */
    selectionAutoFocus?: boolean | undefined;
    /**
     * A field property from the row to add Select &#123;field&#125; and Unselect &#123;field&#125; ARIA labels to checkbox/radio buttons.
     */
    selectionAriaLabel?: string | undefined;
    /**
     * Specifies the selection mode, valid values are "single", "multiple", "radiobutton" and "checkbox".
     */
    selectionMode?: 'single' | 'multiple' | 'checkbox' | 'radiobutton' | undefined;
    /**
     * When enabled with paginator and checkbox selection mode, the select all checkbox in the header will select all rows on the current page.
     * @defaultValue false
     */
    selectionPageOnly?: boolean | undefined;
    /**
     * Whether to show grid lines between cells.
     * @defaultValue false
     */
    showGridlines?: boolean | undefined;
    /**
     * Whether to show headers.
     * @defaultValue true
     */
    showHeaders?: boolean | undefined;
    /**
     * Whether to show the select all checkbox inside the datatable's header.
     */
    showSelectAll?: boolean | undefined;
    /**
     * Define to set alternative sizes. Valid values: "small", "normal" and "large".
     * @defaultValue normal
     */
    size?: 'small' | 'normal' | 'large' | undefined;
    /**
     * Property of a row data used for sorting, defaults to field.
     */
    sortField?: string | undefined;
    /**
     * Defines whether sorting works on single column or on multiple columns.
     * @defaultValue single
     */
    sortMode?: 'single' | 'multiple' | undefined;
    /**
     * Icon to display the current sorting status.
     */
    sortIcon?: IconType<DataTable<TValue>> | undefined;
    /**
     * Order to sort the data by default.
     */
    sortOrder?: 1 | 0 | -1 | null | undefined;
    /**
     * Unique identifier of a stateful table to use in state storage.
     */
    stateKey?: string | undefined;
    /**
     * Defines where a stateful table keeps its state, valid values are "session" for sessionStorage, "local" for localStorage and "custom".
     * @defaultValue session
     */
    stateStorage?: 'session' | 'local' | 'custom' | undefined;
    /**
     * Whether to displays rows with alternating colors.
     * @defaultValue false
     */
    stripedRows?: boolean | undefined;
    /**
     * Inline style of the component.
     */
    style?: React.CSSProperties | undefined;
    /**
     * Index of the element in tabbing order.
     */
    tabIndex?: number | undefined;
    /**
     * Style class of the table element.
     */
    tableClassName?: string | undefined;
    /**
     * Inline style of the table element.
     */
    tableStyle?: React.CSSProperties | undefined;
    /**
     * Number of total records, defaults to length of value when not defined.
     */
    totalRecords?: number | undefined;
    /**
     * Whether to use the virtualScroller feature. The properties of VirtualScroller component can be used like an object in it.
     *
     * Note: Currently only vertical orientation mode is supported.
     */
    virtualScrollerOptions?: VirtualScrollerProps | undefined;
    /**
     * Function that takes the cell data and returns an object in &#123;'styleclass' : condition&#125; format to define a classname for a particular now.
     * @param {*} value - Value of the cell.
     * @param {DataTableCellClassNameOptions<TValue>} options - ClassName options.
     * @return {object | string | undefined} A string or object to define a classname for a particular cell.
     */
    cellClassName?(value: any, options: DataTableCellClassNameOptions<TValue>): object | string | undefined;
    /**
     * A function to implement custom restoreState with stateStorage="custom". Need to return state object.
     * @return {object | undefined} Returns the state object.
     */
    customRestoreState?(): object | undefined;
    /**
     * A function to implement custom saveState with stateStorage="custom".
     * @param {object} state - The object to be stored.
     */
    customSaveState?(state: object): void;
    /**
     * A function to implement custom export. Need to return string value.
     * @param {DataTableExportFunctionEvent<TValue>} event - Custom export function event.
     */
    exportFunction?(event: DataTableExportFunctionEvent<TValue>): any;
    /**
     * Function that returns a boolean to decide whether the data should be selectable.
     * @param {DataTableDataSelectableEvent<TValue>} event - Custom data selectable event.
     */
    isDataSelectable?(event: DataTableDataSelectableEvent): boolean | undefined | null;
    /**
     * Callback to invoke when all rows are selected using the header checkbox.
     * @param {DataTableSelectEvent} event - Custom select event.
     */
    onAllRowsSelect?(event: DataTableSelectEvent): void;
    /**
     * Callback to invoke when all rows are unselected using the header checkbox.
     * @param {DataTableUnselectEvent} event - Custom unselect event.
     */
    onAllRowsUnselect?(event: DataTableUnselectEvent): void;
    /**
     * Callback to invoke on cell click.
     * @param {DataTableCellClickEvent<TValue>} event - Custom cell click event.
     */
    onCellClick?(event: DataTableCellClickEvent<TValue>): void;
    /**
     * Callback to invoke on cell select.
     * @param {DataTableCellClickEvent<TValue>} event - Custom select event.
     */
    onCellSelect?(event: DataTableCellClickEvent<TValue>): void;
    /**
     * Callback to invoke on cell unselect.
     * @param {DataTableCellClickEvent<TValue>} event - Custom unselect event.
     */
    onCellUnselect?(event: DataTableCellClickEvent<TValue>): void;
    /**
     * Callback to invoke when a column is reordered.
     * @param {DataTableColReorderEvent} event - Custom column reorder event.
     */
    onColReorder?(event: DataTableColReorderEvent): void;
    /**
     * Callback to invoke when a column is resized.
     * @param {DataTableColumnResizeEndEvent} event - Custom column resize end event.
     */
    onColumnResizeEnd?(event: DataTableColumnResizeEndEvent): void;
    /**
     * Callback to invoke when a resizer element is clicked.
     * @param {DataTableColumnResizerClickEvent} event - Custom column resizer click event.
     */
    onColumnResizerClick?(event: DataTableColumnResizerClickEvent): void;
    /**
     * Callback to invoke when a resizer element is double clicked.
     * @param {DataTableColumnResizerClickEvent} event - Custom column resizer double click event.
     */
    onColumnResizerDoubleClick?(event: DataTableColumnResizerClickEvent): void;
    /**
     * Callback to invoke when a context menu is clicked.
     * @param {DataTableRowEvent} event - Custom row event.
     */
    onContextMenu?(event: DataTableRowEvent): void;
    /**
     * Callback to invoke when a row selected with right click.
     * @param {DataTableRowEvent} event - Custom row event.
     */
    onContextMenuSelectionChange?(event: DataTableContextMenuSelectionChangeEvent<TValue>): void;
    /**
     * Callback to invoke on filtering.
     * @param {DataTableStateEvent} event - Custom state event.
     */
    onFilter?(event: DataTableStateEvent): void;
    /**
     * Callback to invoke on pagination.
     * @param {DataTableStateEvent} event - Custom state event.
     */
    onPage?(event: DataTableStateEvent): void;
    /**
     * Callback to invoke when a row is clicked.
     * @param {DataTableRowClickEvent} event - Custom row click event.
     */
    onRowClick?(event: DataTableRowClickEvent): void;
    /**
     * Callback to invoke when a row is collapsed.
     * @param {DataTableRowEvent} event - Custom row event.
     */
    onRowCollapse?(event: DataTableRowEvent): void;
    /**
     * Callback to invoke when a row is double clicked.
     * @param {DataTableRowClickEvent} event - Custom click event.
     */
    onRowDoubleClick?(event: DataTableRowClickEvent): void;
    /**
     * Callback to invoke when the cancel icon is clicked on row editing mode.
     * @param {DataTableRowEditEvent} event - Custom row edit event.
     */
    onRowEditCancel?(event: DataTableRowEditEvent): void;
    /**
     * Callback to invoke when the cancel icon is clicked on row editing mode.
     * @param {DataTableRowEditEvent} event - Custom row edit event.
     */
    onRowEditChange?(event: DataTableRowEditEvent): void;
    /**
     * Callback to invoke when row edit is completed.
     * @param {DataTableRowEditCompleteEvent} event - Custom row edit complete event.
     */
    onRowEditComplete?(event: DataTableRowEditCompleteEvent): void;
    /**
     * Callback to invoke when the editing icon is clicked on row editing mode.
     * @param {DataTableRowEditEvent} event - Custom row edit event.
     */
    onRowEditInit?(event: DataTableRowEditEvent): void;
    /**
     * Callback to invoke when the save icon is clicked on row editing mode.
     * @param {DataTableRowEditSaveEvent} event - Custom row edit save event.
     */
    onRowEditSave?(event: DataTableRowEditSaveEvent): void;
    /**
     * Callback to invoke when a row is expanded.
     * @param {DataTableRowEvent} event - Custom row event.
     */
    onRowExpand?(event: DataTableRowEvent): void;
    /**
     * Callback to invoke when a row is hovered with mouse.
     * @param {DataTableRowMouseEvent} event - Custom row mouse event.
     */
    onRowMouseEnter?(event: DataTableRowMouseEvent): void;
    /**
     * Callback to invoke when a row is navigated away from with mouse.
     * @param {DataTableRowMouseEvent} event - Custom row mouse event.
     */
    onRowMouseLeave?(event: DataTableRowMouseEvent): void;
    /**
     * Callback to update the new order.
     * @param {DataTableRowReorderEvent<TValue>} event - Custom row reorder event.
     */
    onRowReorder?(event: DataTableRowReorderEvent<TValue>): void;
    /**
     * Callback to invoke when a row is selected.
     * @param {DataTableSelectEvent} event - Custom select event.
     */
    onRowSelect?(event: DataTableSelectEvent): void;
    /**
     * Callback to invoke when a row is toggled or collapsed.
     * @param {DataTableRowToggleEvent} event - Custom row toggle event.
     */
    onRowToggle?(event: DataTableRowToggleEvent): void;
    /**
     * Callback to invoke when a row is unselected.
     * @param {DataTableUnselectEvent} event - Custom unselect event.
     */
    onRowUnselect?(event: DataTableUnselectEvent): void;
    /**
     * Callback to invoke when select all value changes.
     * @param {DataTableSelectAllChangeEvent} event - Custom select all change event.
     */
    onSelectAllChange?(event: DataTableSelectAllChangeEvent): void;
    /**
     * Callback to invoke when selection changes.
     * @param {DataTableSelectionChangeEvent<TValue>} event - Custom selection change event.
     */
    onSelectionChange?(event: DataTableSelectionChangeEvent<TValue>): void;
    /**
     * Callback to invoke on sort.
     * @param {DataTableStateEvent} event - Custom state event.
     */
    onSort?(event: DataTableStateEvent): void;
    /**
     * Callback to invoke table state is restored.
     * @param {object} state - Table state.
     */
    onStateRestore?(state: object): void;
    /**
     * Callback to invoke table state is saved.
     * @param {object} state - Table state.
     */
    onStateSave?(state: object): void;
    /**
     * Callback to invoke after filtering and sorting to pass the rendered value.
     * @param {DataTableRowDataArray<TValue>} value - Value displayed by the table.
     */
    onValueChange?(value: DataTableRowDataArray<TValue>): void;
    /**
     * Function that takes the row data and returns an object in &#123;'styleclass' : condition&#125; format to define a classname for a particular now.
     * @param {DataTableRowData<TValue>} data - Value displayed by the table.
     */
    rowClassName?(data: DataTableRowData<TValue>, options: DataTableRowClassNameOptions<TValue>): object | string | undefined;
    /**
     * Callback to invoke to validate the editing row when the save icon is clicked on row editing mode.
     * @param {DataTableRowData<TValue>} data - Editing row data.
     */
    rowEditValidator?(data: DataTableRowData<TValue>, options: DataTableRowEditValidatorOptions<TValue>): boolean | undefined;
    /**
     * Function that receives the row data as the parameter and returns the expanded row content. You can override the rendering of the content by setting options.customRendering = true.
     * @param {DataTableRowData<TValue>} data - Editing row data.
     * @param {DataTableRowExpansionTemplate} options - Options for the row expansion template.
     */
    rowExpansionTemplate?(data: DataTableRowData<TValue>, options: DataTableRowExpansionTemplate): React.ReactNode;
    /**
     * Function that returns a boolean by passing the row data to decide if the row reorder element should be displayed per row.
     * @param {DataTableRowData<TValue>} data - Editing row data.
     * @param {DataTableShowRowReorderElementOptions} options - Options for the row reorder element.
     */
    showRowReorderElement?(data: DataTableRowData<TValue>, options: DataTableShowRowReorderElementOptions<TValue>): boolean | undefined | null;
    /**
     * Function that returns a boolean by passing the row data to decide if the radio or checkbox should be displayed per row.
     * @param {DataTableRowData<TValue>} data - Editing row data.
     * @param {DataTableShowSelectionElementOptions} options - Options for the row reorder element.
     */
    showSelectionElement?(data: DataTableRowData<TValue>, options: DataTableShowSelectionElementOptions<TValue>): boolean | undefined | null;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {DataTablePassThroughOptions}
     */
    pt?: DataTablePassThroughOptions;
}

/**
 * **PrimeReact - DataTable<TValue**
 *
 * _DataTable displays data in tabular format._
 *
 * [Live Demo](https://www.primereact.org/datatable/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class DataTable<TValue extends DataTableValueArray> extends React.Component<DataTableProps<TValue>, any> {
    /**
     * Clears the table state.
     */
    public clearState(): void;
    /**
     * Closes the current editing cell when incell editing is enabled.
     */
    public closeEditingCell(): void;
    /**
     * Exports the data to CSV format.
     * @param {object} options - Options to export
     */
    public exportCSV(options?: { selectionOnly: boolean }): void;
    /**
     * Filters the data.
     * @param {T} value - The filter value
     * @param {string} field - The filter field
     * @param {'startsWith' | 'contains' | 'notContains' | 'endsWith' | 'equals' | 'notEquals' | 'in' | 'lt' | 'lte' | 'gt' | 'gte' | 'between' | 'dateIs' | 'dateIsNot' | 'dateBefore' | 'dateAfter' | 'custom'} mode - Filter match mode
     * @param  {number} index - Index of the filter
     */
    public filter<T>(
        /**
         * The filter value.
         */
        value: T,
        /**
         * The filter field.
         */
        field: string,
        /**
         * Filter match mode.
         */
        mode: 'startsWith' | 'contains' | 'notContains' | 'endsWith' | 'equals' | 'notEquals' | 'in' | 'lt' | 'lte' | 'gt' | 'gte' | 'between' | 'dateIs' | 'dateIsNot' | 'dateBefore' | 'dateAfter' | 'custom',
        /**
         * Index of the filter.
         */
        index?: number
    ): void;
    /**
     * Resets sort, filter, paginator and columnorder state.
     */
    public reset(): void;
    /**
     * Resets column order when reorderableColumns is enabled.
     */
    public resetColumnOrder(): void;
    /**
     * Resets scroll position.
     */
    public resetScroll(): void;
    /**
     * Restores the column widths.
     */
    public restoreColumnWidths(): void;
    /**
     * Restores the table state.
     */
    public restoreState(): void;
    /**
     * Stored states can be loaded at any time using this method if there is a stateStorage property.
     * @param {*} state - The state to restore
     */
    public restoreTableState(state: any): void;
    /**
     * Saves the state.
     */
    public saveState(): void;
    /**
     * Used to get container element.
     * @return {HTMLDivElement} Container element
     */
    public getElement(): HTMLDivElement;
    /**
     * Used to get container element.
     * @return {HTMLDivElement} Container element
     */
    public getTable(): HTMLTableElement;
    /**
     * Used to get the virtual scroller.
     */
    public getVirtualScroller(): VirtualScroller;
}
