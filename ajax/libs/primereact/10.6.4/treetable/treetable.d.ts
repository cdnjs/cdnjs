/**
 *
 * TreeTable is used to display hierarchical data in tabular format.
 *
 * [Live Demo](https://www.primereact.org/treetable/)
 *
 * @module treetable
 *
 */
import * as React from 'react';
import { CSSProperties } from 'react';
import { ColumnProps } from '../column';
import { ComponentHooks } from '../componentbase/componentbase';
import { InputTextPassThroughOptions } from '../inputtext/inputtext';
import { PaginatorPassThroughOptions, PaginatorTemplate } from '../paginator';
import { PassThroughOptions } from '../passthrough';
import { TreeNode } from '../treenode';
import { IconType, PassThroughType } from '../utils/utils';

export declare type TreeTablePassThroughType<T> = PassThroughType<T, TreeTablePassThroughMethodOptions>;

/**
 * Custom passthrough(pt) option method.
 */
export interface TreeTablePassThroughMethodOptions {
    props: TreeTableProps;
    state: TreeTableState;
    context: TreeTableContext;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link TreeTableProps.pt}
 */
export interface TreeTablePassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: TreeTablePassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the loading wrapper's DOM element.
     */
    loadingWrapper?: TreeTablePassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the loading overlay's DOM element.
     */
    loadingOverlay?: TreeTablePassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the loading icon's DOM element.
     */
    loadingIcon?: TreeTablePassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the header's DOM element.
     */
    header?: TreeTablePassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the Paginator component.
     * @see {@link PaginatorPassThroughOptions}
     */
    paginator?: PaginatorPassThroughOptions;
    /**
     * Uses to pass attributes to the wrapper's DOM element.
     */
    wrapper?: TreeTablePassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the table's DOM element.
     */
    table?: TreeTablePassThroughType<React.HTMLAttributes<HTMLTableElement>>;
    /**
     * Uses to pass attributes to the thead's DOM element.
     */
    thead?: TreeTablePassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the header row's DOM element.
     */
    headerRow?: TreeTablePassThroughType<React.HTMLAttributes<HTMLTableRowElement>>;
    /**
     * Uses to pass attributes to the header cell's DOM element.
     */
    headerCell?: TreeTablePassThroughType<React.HTMLAttributes<HTMLTableCellElement>>;
    /**
     * Uses to pass attributes to the tbody's DOM element.
     */
    tbody?: TreeTablePassThroughType<React.HTMLAttributes<HTMLTableSectionElement>>;
    /**
     * Uses to pass attributes to the empty message's DOM element.
     */
    emptyMessage?: TreeTablePassThroughType<React.HTMLAttributes<HTMLTableRowElement>>;
    /**
     * Uses to pass attributes to the empty message cell's DOM element.
     */
    emptyMessageCell?: TreeTablePassThroughType<React.HTMLAttributes<HTMLTableCellElement>>;
    /**
     * Uses to pass attributes to the body cell's DOM element.
     */
    bodyCell?: TreeTablePassThroughType<React.HTMLAttributes<HTMLTableCellElement>>;
    /**
     * Uses to pass attributes to the tfoot's DOM element.
     */
    tfoot?: TreeTablePassThroughType<React.HTMLAttributes<HTMLTableSectionElement>>;
    /**
     * Uses to pass attributes to the footer row's DOM element.
     */
    footerRow?: TreeTablePassThroughType<React.HTMLAttributes<HTMLTableRowElement>>;
    /**
     * Uses to pass attributes to the footer's DOM element.
     */
    footer?: TreeTablePassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the resize helper's DOM element.
     */
    resizeHelper?: TreeTablePassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the row toggler's DOM element.
     */
    rowToggler?: TreeTablePassThroughType<React.HTMLAttributes<HTMLButtonElement>>;
    /**
     * Uses to pass attributes to the row toggler icon's DOM element.
     */
    rowTogglerIcon?: TreeTablePassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the column resizer's DOM element.
     */
    columnResizer?: TreeTablePassThroughType<React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the sort badge's DOM element.
     */
    sortBadge?: TreeTablePassThroughType<React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the header title's DOM element.
     */
    headerTitle?: TreeTablePassThroughType<React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the checkbox wrapper's DOM element.
     */
    checkboxWrapper?: TreeTablePassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the checkbox's DOM element.
     */
    checkbox?: TreeTablePassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the checkbox icon's DOM element.
     */
    checkboxIcon?: TreeTablePassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the resize helper's DOM element.
     * @see {@link InputTextPassThroughOptions}
     */
    filterInput?: InputTextPassThroughOptions;
    /**
     * Uses to pass attributes to the sort icon label's DOM element.
     */
    sortIcon?: TreeTablePassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the scrollable wrapper's DOM element.
     */
    scrollableWrapper?: TreeTablePassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the scrollable's DOM element.
     */
    scrollable?: TreeTablePassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the scrollable header's DOM element.
     */
    scrollableHeader?: TreeTablePassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the scrollable header box's DOM element.
     */
    scrollableHeaderBox?: TreeTablePassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the scrollable header table's DOM element.
     */
    scrollableHeaderTable?: TreeTablePassThroughType<React.HTMLAttributes<HTMLTableElement>>;
    /**
     * Uses to pass attributes to the scrollable body's DOM element.
     */
    scrollableBody?: TreeTablePassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the scrollable body box's DOM element.
     */
    scrollableBodyBox?: TreeTablePassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the scrollable body table's DOM element.
     */
    scrollableBodyTable?: TreeTablePassThroughType<React.HTMLAttributes<HTMLTableElement>>;
    /**
     * Uses to pass attributes to the scrollable footer's DOM element.
     */
    scrollableFooter?: TreeTablePassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the scrollable footer box's DOM element.
     */
    scrollableFooterBox?: TreeTablePassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the scrollable footer table's DOM element.
     */
    scrollableFooterTable?: TreeTablePassThroughType<React.HTMLAttributes<HTMLTableElement>>;
    /**
     * Uses to pass attributes to the editor key helper's DOM element.
     */
    editorKeyHelper?: TreeTablePassThroughType<React.HTMLAttributes<HTMLAnchorElement>>;
    /**
     * Uses to pass attributes to the editor key helper label's DOM element.
     */
    editorKeyHelperLabel?: TreeTablePassThroughType<React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the hidden input wrapper's DOM element.
     */
    hiddenInputWrapper?: TreeTablePassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the hidden input's DOM element.
     */
    hiddenInput?: TreeTablePassThroughType<React.HTMLAttributes<HTMLInputElement>>;
    /**
     * Used to manage all lifecycle hooks
     * @see {@link ComponentHooks}
     */
    hooks?: ComponentHooks;
}

/**
 * Defines current inline state in TreeTable component.
 */
export interface TreeTableState {
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
    multiSortMeta: TreeTableSortMeta[];
    /**
     * Current order of the columns.
     */
    columnOrder: string[];
    /**
     * Current filters object.
     */
    filters: TreeTableFilterMeta;
    /**
     * Current editing as a boolean.
     * @defaultValue false
     */
    editing: boolean;
}

/**
 * Defines current options in TreeTable component.
 */
export interface TreeTableContext {
    /**
     * Current index state of the item.
     */
    index: number;
    /**
     * Current frozen state of the row as a boolean.
     * @defaultValue false
     */
    frozen: boolean;
    /**
     * Current checked state of the column checkbox as a boolean.
     * @defaultValue false
     */
    checked: boolean;
    /**
     * Current partial checked state of the column checkbox as a boolean.
     * @defaultValue false
     */
    partialChecked: boolean;
    /**
     * Current selectable state of the row as a boolean.
     * @defaultValue false
     */
    selectable: boolean;
    /**
     * Current scrollable state of the row as a boolean.
     * @defaultValue false
     */
    scrollable: boolean;
    /**
     * Current showGridlines state of the row as a boolean.
     * @defaultValue false
     */
    showGridlines: boolean;
    /**x
     * Current selected state of the row as a boolean.
     * @defaultValue false
     */
    selected: boolean;
}

/**
 * Custom treetable toggler template options
 */
interface TreeTableTogglerTemplateOptions {
    /**
     * Callback to invoke on click.
     * @param {React.SyntheticEvent} event - Browser event.
     */
    onClick(event: React.SyntheticEvent): void;
    /**
     * Style class of the panels container.
     */
    containerClassName: string;
    /**
     * Icon classname.
     */
    iconClassName: string;
    /**
     * JSX element to be used as the template options.
     */
    element: Element;
    /**
     * The props of Tree component
     */
    props: TreeTableProps;
    /**
     * Whether the tree node is expanded or not.
     */
    expanded: boolean;
    /**
     * Button style for tree indentation
     */
    buttonStyle: CSSProperties;
}

/**
 * Custom selection keys type.
 */
interface TreeTableSelectionKeysType {
    /**
     * Extra options.
     */
    [key: string]: boolean | TreeTableCheckboxSelectionKeyType | undefined;
}

/**
 * Custom treetable checkbox selection type
 */
interface TreeTableCheckboxSelectionKeyType {
    /**
     * Whether the checkbox is checked or not.
     */
    checked?: boolean;
    /**
     * Whether the checkbox is partially checked or not.
     */
    partialChecked?: boolean;
}

/**
 * Custom expanded keys type.
 */
type TreeTableExpandedKeysType = {
    /**
     * Extra options.
     */
    [key: string]: boolean;
};

/**
 * Custom treetable sort meta.
 */
interface TreeTableSortMeta {
    /**
     * The field to sort against.
     */
    field: string;
    /**
     * Sort order as integer.
     */
    order: 1 | 0 | -1 | null | undefined;
}

/**
 * Custom treetable filter metadata.
 */
interface TreeTableFilterMetaData {
    /**
     * Value to filter against.
     */
    value: any;
    /**
     * Type of filter match.
     */
    matchMode: 'startsWith' | 'contains' | 'endsWith' | 'equals' | 'notEquals' | 'in' | 'notIn' | 'lt' | 'lte' | 'gt' | 'gte' | 'custom' | undefined;
}

/**
 * Custom treetable filter meta.
 */
interface TreeTableFilterMeta {
    /**
     * Extra options.
     */
    [key: string]: TreeTableFilterMetaData;
}

/**
 * Custom treetable event.
 * @see {@link TreeTableProps.onCollapse},{@link TreeTableProps.onContextMenu},{@link TreeTableProps.onExpand},{@link TreeTableProps.onRowClick},{@link TreeTableProps.onSelect},{@link TreeTableProps.onUnselect}
 * @event
 */
interface TreeTableEvent {
    /**
     * Browser event.
     */
    originalEvent: React.SyntheticEvent;
    /**
     * Expanded node instance.
     */
    node: TreeNode;
}

/**
 * Custom row mouse event.
 * @see {@link TreeTableProps.onRowMouseEnter}, {@link TreeTableProps.onRowMouseLeave}
 * @extends TreeTableEvent
 */
interface TreeTableRowMouseEvent extends Omit<TreeTableEvent, 'originalEvent'> {
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
 * Custom toggle event.
 * @see {@link TreeTableProps.onToggle}
 * @event
 */
interface TreeTableToggleEvent {
    /**
     * Browser event.
     */
    originalEvent: React.SyntheticEvent;
    /**
     * Collapsed state as a boolean.
     */
    value: TreeTableExpandedKeysType;
}

/**
 * Custom page event.
 * @see {@link TreeTableProps.onPage}
 * @event
 */
interface TreeTablePageEvent {
    /**
     * Index of the first row.
     */
    first: number;
    /**
     * Rows per page.
     */
    rows: number;
    /**
     * Value of the new page.
     */
    page: number;
    /**
     * Total number of pages.
     */
    pageCount: number;
}

/**
 * Custom sort event.
 * @see {@link TreeTableProps.onSort}
 * @event
 */
interface TreeTableSortEvent {
    /**
     * Field to sort against.
     */
    sortField: string;
    /**
     * Sort order as integer.
     */
    sortOrder: 1 | 0 | -1 | undefined | null;
    /**
     * MultiSort metadata.
     */
    multiSortMeta: TreeTableSortMeta[] | undefined | null;
}

/**
 * Custom selection event.
 * @see {@link TreeTableProps.onContextMenuSelectionChange},{@link TreeTableProps.onSelectionChange}
 * @event
 */
interface TreeTableSelectionEvent {
    /**
     * Browser event.
     */
    originalEvent: React.SyntheticEvent;
    /**
     * Selected node key.
     */
    value: TreeTableSelectionKeysType;
}

/**
 * Custom resize event.
 * @see {@link TreeTableProps.onColumnResizeEnd}
 * @event
 */
interface TreeTableColumnResizeEndEvent {
    /**
     * DOM element of the resized.
     */
    element: HTMLElement;
    /**
     * Properties of the resized column.
     */
    column: ColumnProps;
    /**
     * Change in column width.
     */
    delta: number;
}

/**
 * Custom column reorder event.
 * @see {@link TreeTableProps.onColReorder}
 * @event
 */
interface TreeTableColReorderEvent {
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
 * Defines valid properties in TreeTable component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group Properties
 */
export interface TreeTableProps extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'onContextMenu' | 'onSelect' | 'ref' | 'value'> {
    /**
     * Whether to show it even there is only one page.
     * @defaultValue true
     */
    alwaysShowPaginator?: boolean | undefined;
    /**
     * Icon of the checkbox when checked.
     */
    checkboxIcon?: IconType<TreeTableProps> | undefined;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {TreeTablePassThroughOptions}
     */
    pt?: TreeTablePassThroughOptions;
    /**
     * Used to configure passthrough(pt) options of the component.
     * @type {PassThroughOptions}
     */
    ptOptions?: PassThroughOptions;
    /**
     * When enabled, it removes component related styles in the core.
     * @defaultValue false
     */
    unstyled?: boolean;
    /**
     * Style class of the node.
     */
    className?: string | undefined;
    /**
     * Defines whether the overall table width should change on column resize, valid values are "fit" and "expand".
     * @defaultValue fit
     */
    columnResizeMode?: 'fit' | 'expand' | undefined;
    /**
     * A single key to control the selection with the context menu.
     */
    contextMenuSelectionKey?: string | undefined;
    /**
     * Template of the current page report element. Available placeholders are &#123;currentPage&#125;, &#123;totalPages&#125;, &#123;rows&#125;, &#123;first&#125;, &#123;last&#125; and &#123;totalRecords&#125;
     * @defaultValue (&#123;currentPage&#125; of &#123;totalPages&#125;)
     */
    currentPageReportTemplate?: string | undefined;
    /**
     * Default sort order of an unsorted column.
     * @defaultValue 1
     */
    defaultSortOrder?: 1 | 0 | -1 | undefined | null;
    /**
     * Text to display when there is no data.
     * @defaultValue No results found
     */
    emptyMessage?: string | React.ReactNode | ((props: TreeTableProps) => React.ReactNode) | undefined;
    /**
     * An array of keys to represent the state of the tree expansion state in controlled mode.
     */
    expandedKeys?: TreeTableExpandedKeysType | undefined;
    /**
     * Delay in milliseconds before filtering the data.
     * @defaultValue 300
     */
    filterDelay?: number | undefined;
    /**
     * Locale to use in filtering. The default locale is the host environment's current locale.
     * @defaultValue undefined
     */
    filterLocale?: string | undefined;
    /**
     * Mode for filtering valid values are lenient and strict. Default is lenient.
     * @defaultValue lenient
     */
    filterMode?: 'lenient' | 'strict' | undefined;
    /**
     * An array of FilterMetadata objects to provide external filters.
     */
    filters?: TreeTableFilterMeta;
    /**
     * Index of the first row to be displayed.
     * @defaultValue 0
     */
    first?: number | undefined;
    /**
     * Footer content of the table.
     */
    footer?: React.ReactNode | undefined;
    /**
     * ColumnCroup component for footer.
     */
    footerColumnGroup?: React.ReactElement | undefined;
    /**
     * ColumnCroup component for footer of frozen columns.
     */
    frozenFooterColumnGroup?: React.ReactElement | undefined;
    /**
     * ColumnCroup component for header of frozen columns.
     */
    frozenHeaderColumnGroup?: React.ReactElement | undefined;
    /**
     * Width of the frozen part in scrollable DataTable.
     */
    frozenWidth?: string | undefined;
    /**
     * Value of the global filter to use in filtering.
     */
    globalFilter?: string | undefined | null;
    /**
     * Defines filterMatchMode; "startsWith", "contains", "endsWith", "equals", "notEquals", "in", "notIn", "lt", "lte", "gt", "gte" and "custom".
     * @defaultValue contains
     */
    globalFilterMatchMode?: 'startsWith' | 'contains' | 'notContains' | 'endsWith' | 'equals' | 'notEquals' | 'in' | 'notIn' | 'lt' | 'lte' | 'gt' | 'gte' | 'between' | 'dateIs' | 'dateIsNot' | 'dateBefore' | 'dateAfter' | 'custom' | undefined;
    /**
     * Header content of the table.
     */
    header?: React.ReactNode | undefined;
    /**
     * ColumnCroup component for header.
     */
    headerColumnGroup?: React.ReactElement | undefined;
    /**
     * Unique identifier of the element.
     */
    id?: string | undefined;
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
    loadingIcon?: IconType<TreeTableProps> | undefined;
    /**
     * Defines whether metaKey is requred or not for the selection. When true metaKey needs to be pressed to select or unselect an item and when set to false selection of each item can be toggled individually. On touch enabled devices, metaKeySelection is turned off automatically.
     * @defaultValue true
     */
    metaKeySelection?: boolean | undefined;
    /**
     * An array of SortMeta objects to sort the data by default in multiple sort mode.
     */
    multiSortMeta?: TreeTableSortMeta[] | undefined | null;
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
    paginatorDropdownAppendTo?: 'self' | HTMLElement | undefined | null | (() => HTMLElement);
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
     * Whether checkbox selections propagate to descendant nodes.
     * @defaultValue true
     */
    propagateSelectionDown?: boolean | undefined;
    /**
     * Whether checkbox selections propagate to ancestor nodes.
     * @defaultValue true
     */
    propagateSelectionUp?: boolean | undefined;
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
     * Defines the reorder indicator down icon.
     */
    reorderIndicatorDownIcon?: IconType<TreeTableProps> | undefined;
    /**
     * Defines the reorder indicator up icon.
     */
    reorderIndicatorUpIcon?: IconType<TreeTableProps> | undefined;
    /**
     * When enabled, columns can be resized using drag and drop.
     * @defaultValue false
     */
    resizableColumns?: boolean | undefined;
    /**
     * When enabled, background of the rows change on hover.
     * @defaultValue false
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
     * Determines whether the cell editor will be opened when clicking to select any row on Selection and Cell Edit modes.
     * @defaultValue true
     */
    selectOnEdit?: boolean | undefined;
    /**
     * A single or an array of keys to control the selection state.
     */
    selectionKeys?: string | TreeTableSelectionKeysType | TreeTableSelectionKeysType[] | undefined | null;
    /**
     * Defines the selection mode, valid values "single", "multiple", and "checkbox".
     */
    selectionMode?: 'single' | 'multiple' | 'checkbox' | undefined;
    /**
     * Whether to show grid lines between cells.
     * @defaultValue false
     */
    showGridlines?: boolean | undefined;
    /**
     * Name of the field to sort data by default.
     */
    sortField?: string | undefined;
    /**
     * Icon to display the current sorting status.
     */
    sortIcon?: IconType<TreeTableProps> | undefined;
    /**
     * Defines whether sorting works on single column or on multiple columns.
     * @defaultValue single
     */
    sortMode?: 'single' | 'multiple' | undefined;
    /**
     * Order to sort the data by default.
     */
    sortOrder?: 1 | 0 | -1 | undefined | null;
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
     * Template of toggler element.
     */
    togglerTemplate?: React.ReactNode | ((node: TreeNode, options: TreeTableTogglerTemplateOptions) => React.ReactNode);
    /**
     *
     * Number of total records, defaults to length of value when not defined.
     */
    totalRecords?: number | undefined;
    /**
     * An array of treenodes to display.
     */
    value?: TreeNode[] | undefined;
    /**
     * Callback to invoke when a column is reordered.
     * @param {TreeTableColReorderEvent} event - Custom column reorder event.
     */
    onColReorder?(event: TreeTableColReorderEvent): void;
    /**
     * Callback to invoke when a node is collapsed.
     * @param {TreeTableEvent} event - Custom treetable event.
     */
    onCollapse?(event: TreeTableEvent): void;
    /**
     * Callback to invoke when a column is resized.
     * @param {TreeTableColumnResizeEndEvent} event - Custom resize event.
     */
    onColumnResizeEnd?(event: TreeTableColumnResizeEndEvent): void;
    /**
     * Callback to invoke when a context menu is clicked.
     * @param {TreeTableEvent} event - Custom treetable event.
     */
    onContextMenu?(event: TreeTableEvent): void;
    /**
     * Callback to invoke when selection changes with a context menu.
     * @param {TreeTableSelectionEvent} event - Custom selection event.
     */
    onContextMenuSelectionChange?(event: TreeTableSelectionEvent): void;
    /**
     * Callback to invoke when a node is expanded.
     * @param {TreeTableEvent} event - Custom treetable event.
     */
    onExpand?(event: TreeTableEvent): void;
    /**
     * Callback to invoke on filtering.
     * @param {TreeTableFilterMeta[]} filters - Custom treetable event.
     */
    onFilter?(filters: TreeTableFilterMeta[]): void;
    /**
     * Callback to invoke on pagination.
     * @param {TreeTablePageEvent} event - Custom page event.
     */
    onPage?(event: TreeTablePageEvent): void;
    /**
     * Callback to invoke when a row is clicked.
     * @param {TreeTableEvent} event - Custom treetable event.
     */
    onRowClick?(event: TreeTableEvent): void;
    /**
     * Callback to invoke when a row is hovered with mouse.
     * @param {TreeTableRowMouseEvent} event - Custom row mouse event.
     */
    onRowMouseEnter?(event: TreeTableRowMouseEvent): void;
    /**
     * Callback to invoke when a row is navigated away from with mouse.
     * @param {TreeTableRowMouseEvent} event - Custom row mouse event.
     */
    onRowMouseLeave?(event: TreeTableRowMouseEvent): void;
    /**
     * Callback to invoke when a node is selected.
     * @param {TreeTableEvent} event - Custom treetable event.
     */
    onSelect?(event: TreeTableEvent): void;
    /**
     * Callback to invoke when selection changes.
     * @param {TreeTableSelectionEvent} event - Custom selection event.
     */
    onSelectionChange?(event: TreeTableSelectionEvent): void;
    /**
     * Callback to invoke on sort.
     * @param {TreeTableSortEvent} event - Custom sort event.
     */
    onSort?(event: TreeTableSortEvent): void;
    /**
     * Callback to invoke when a node is toggled.
     * @param {TreeTableToggleEvent} event - Custom toggle event.
     */
    onToggle?(event: TreeTableToggleEvent): void;
    /**
     * Callback to invoke when a node is unselected.
     * @param {TreeTableEvent} event - Custom treetable event.
     */
    onUnselect?(event: TreeTableEvent): void;
    /**
     * Callback to invoke after filtering and sorting to pass the rendered value.
     * @param {TreeNode[] | undefined} value - Value displayed by the table.
     */
    onValueChange?(value: TreeNode[] | undefined): void;
    /**
     * Function that takes the row data and returns an object in &#123;'styleclass' : condition&#125; format to define a classname for a particular now.
     * @param {TreeNode} data - Value displayed by the treetable.
     */
    rowClassName?(data: TreeNode): object;
}

/**
 * **PrimeReact - TreeTable**
 *
 * _TreeTable is used to display hierarchical data in tabular format._
 *
 * [Live Demo](https://www.primereact.org/treetable/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class TreeTable extends React.Component<TreeTableProps, any> {
    /**
     * Filters the data.
     * @param {T} value - The filter value
     * @param {string} field - The filter field
     * @param {string} mode - Filter match mode.
     */
    public filter<T>(
        /**
         * The filter value
         */
        value: T,
        /**
         * The filter field
         */
        field: string,
        /**
         * Filter match mode.
         */
        mode: 'startsWith' | 'contains' | 'endsWith' | 'equals' | 'notEquals' | 'in' | 'notIn' | 'lt' | 'lte' | 'gt' | 'gte' | 'custom' | undefined
    ): void;
    /**
     * Used to get container element.
     * @return {HTMLDivElement} Container element
     */
    public getElement(): HTMLDivElement;
}
