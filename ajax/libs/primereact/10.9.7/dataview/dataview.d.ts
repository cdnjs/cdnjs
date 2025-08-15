/**
 *
 * DataView displays data in grid or list layout with pagination and sorting features.
 *
 * [Live Demo](https://www.primereact.org/dataview/)
 *
 * @module dataview
 *
 */
import * as React from 'react';
import { ComponentHooks } from '../componentbase/componentbase';
import { PaginatorPassThroughOptions, PaginatorTemplate } from '../paginator';
import { PassThroughOptions } from '../passthrough';
import { IconType, PassThroughType } from '../utils/utils';

export declare type DataViewPassThroughType<T> = PassThroughType<T, DataViewPassThroughMethodOptions>;
export declare type DataViewLayoutOptionsPassThroughType<T> = PassThroughType<T, DataViewLayoutOptionsPassThroughMethodOptions>;

/**
 * Custom passthrough(pt) option method.
 */
export interface DataViewPassThroughMethodOptions {
    props: DataViewProps;
    state: DataViewState;
}

/**
 * Custom passthrough(pt) option method.
 */
export interface DataViewLayoutOptionsPassThroughMethodOptions {
    props: DataViewLayoutOptionsProps;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link DataViewProps.pt}
 */
export interface DataViewPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: DataViewPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the header's DOM element.
     */
    header?: DataViewPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the Paginator component.
     * @see {@link PaginatorPassThroughOptions}
     */
    paginator?: PaginatorPassThroughOptions;
    /**
     * Uses to pass attributes to the content's DOM element.
     */
    content?: DataViewPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the empty message's DOM element.
     */
    emptyMessage?: DataViewPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the footer's DOM element.
     */
    footer?: DataViewPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the loading overlay's DOM element.
     */
    loadingOverlay?: DataViewPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the loading icon's DOM element.
     */
    loadingIcon?: DataViewPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the grid's DOM element.
     */
    grid?: DataViewPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Used to manage all lifecycle hooks
     * @see {@link ComponentHooks}
     */
    hooks?: ComponentHooks;
}

/**
 * Defines current inline state in DataView component.
 */
export interface DataViewState {
    /**
     * Current index of first record as a number.
     */
    first: number;
    /**
     * Current number of rows to display in new page as a number.
     */
    rows: number;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link DataViewLayoutOptionsProps.pt}
 */
export interface DataViewLayoutOptionsPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: DataViewLayoutOptionsPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the list button's DOM element.
     */
    listButton?: DataViewLayoutOptionsPassThroughType<React.HTMLAttributes<HTMLButtonElement>>;
    /**
     * Uses to pass attributes to the list icon's DOM element.
     */
    listIcon?: DataViewLayoutOptionsPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the grid button's DOM element.
     */
    gridButton?: DataViewLayoutOptionsPassThroughType<React.HTMLAttributes<HTMLButtonElement>>;
    /**
     * Uses to pass attributes to the grid icon's DOM element.
     */
    gridIcon?: DataViewLayoutOptionsPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
}

/**
 * Custom page event.
 * @see {@link DataViewProps.onPage}
 * @event
 */
interface DataViewPageEvent {
    /**
     * Index of the first records on page.
     */
    first: number;
    /**
     * Number of records to display per page.
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
 * Custom data view layout options event.
 */
interface DataViewLayoutOptionsChangeEvent {
    /**
     * Browser event.
     */
    originalEvent: React.MouseEvent<HTMLButtonElement>;
    /**
     * New value.
     */
    value: 'list' | 'grid' | (string & Record<string, unknown>);
}

/**
 * Custom data view layout options props
 */
export interface DataViewLayoutOptionsProps {
    /**
     * Unique identifier of the element.
     */
    id?: string;
    /**
     * Orientation of the panels, valid values are "list" and "grid".
     */
    layout?: 'list' | 'grid' | (string & Record<string, unknown>);
    /**
     * Defines the display mode list icon.
     */
    listIcon?: IconType<DataViewProps> | undefined;
    /**
     * Defines the display mode grid icon.
     */
    gridIcon?: IconType<DataViewProps> | undefined;
    /**
     * Inline style of the element.
     */
    style?: React.CSSProperties;
    /**
     * Style class of the element.
     */
    className?: string;
    /**
     * Layout options change callback
     * @param {DataViewLayoutOptionsChangeEvent} event - Custom event.
     */
    onChange(event: DataViewLayoutOptionsChangeEvent): void;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
}

/**
 * Custom data view layout options
 * @extends {React.Component<DataViewLayoutOptionsProps, any>}
 */
export declare class DataViewLayoutOptions extends React.Component<DataViewLayoutOptionsProps, any> {}

/**
 * Defines valid properties in DataView component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group Properties
 */
export interface DataViewProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    /**
     * Header content of the component.
     */
    header?: React.ReactNode | undefined;
    /**
     * Footer content of the component.
     */
    footer?: React.ReactNode | undefined;
    /**
     * An array of objects to display.
     */
    value?: any[] | undefined;
    /**
     * Layout of the items, valid values are "list" and "grid".
     * @defaultValue list
     */
    layout?: 'list' | 'grid' | (string & Record<string, unknown>);
    /**
     * Name of the field that uniquely identifies a record in the data. Should be a unique business key to prevent re-rendering.
     */
    dataKey?: string | undefined;
    /**
     * Number of rows to display per page.
     */
    rows?: number | undefined;
    /**
     * Index of the first record to render.
     * @defaultValue 0
     */
    first?: number | undefined;
    /**
     * Number of total records, defaults to length of value when not defined.
     */
    totalRecords?: number | undefined;
    /**
     * When specified as true, enables the pagination.
     * @defaultValue false
     */
    paginator?: boolean | undefined;
    /**
     * Position of the paginator, options are "top","bottom" or "both".
     * @defaultValue bottom
     */
    paginatorPosition?: 'top' | 'bottom' | 'both' | undefined;
    /**
     * Whether to show it even there is only one page.
     * @defaultValue true
     */
    alwaysShowPaginator?: boolean | undefined;
    /**
     * Style class of the paginator element.
     */
    paginatorClassName?: string | undefined;
    /**
     * Template of the paginator. For details, refer to the template section of the paginator documentation for further options.
     * @defaultValue FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown
     */
    paginatorTemplate?: PaginatorTemplate | undefined;
    /**
     * Content for the left side of the paginator.
     */
    paginatorLeft?: React.ReactNode | undefined;
    /**
     * Content for the right side of the paginator.
     */
    paginatorRight?: React.ReactNode | undefined;
    /**
     * Number of page links to display.
     * @defaultValue 5
     */
    pageLinkSize?: number | undefined;
    /**
     * DOM element instance where the overlay panel should be mounted. Valid values are any DOM Element and 'self'. The self value is used to render a component where it is located.
     * @defaultValue document.body
     */
    paginatorDropdownAppendTo?: 'self' | HTMLElement | undefined | null | (() => HTMLElement);
    /**
     * Array of integer values to display inside rows per page dropdown.
     */
    rowsPerPageOptions?: number[] | undefined;
    /**
     * Template of the current page report element.
     * @defaultValue (&#123;currentPage&#125; of &#123;totalPages&#125;)
     */
    currentPageReportTemplate?: string | undefined;
    /**
     * Text to display when there is no data.
     * @defaultValue No records found.
     */
    emptyMessage?: string | undefined;
    /**
     * Name of the field to sort data by default.
     */
    sortField?: string | undefined;
    /**
     * Order to sort the data by default.
     */
    sortOrder?: 1 | 0 | -1 | undefined | null;
    /**
     * Defines if data is loaded and interacted with in lazy manner.
     * @defaultValue false
     */
    lazy?: boolean | undefined;
    /**
     * Display loading icon of the button.
     */
    loading?: boolean | undefined;
    /**
     * Name of the loading icon or JSX.Element for loading icon.
     */
    loadingIcon?: IconType<DataViewProps> | undefined;
    /**
     * Whether the grid structure in the container has gutter. Default value is false.
     * @defaultValue false
     */
    gutter?: boolean | undefined;
    /**
     * Callback to invoke on pagination.
     * @param {DataViewPageEvent} event - Custom page event.
     */
    onPage?(event: DataViewPageEvent): void;
    /**
     * Function that gets the option along with the layout mode and returns the content.
     * @param {*} item - Current item.
     * @param {'list' | 'grid' | (string & Record<string, unknown>)} layout - Current layout.
     */
    itemTemplate?(item: any, layout?: 'list' | 'grid' | (string & Record<string, unknown>)): React.ReactNode | undefined;
    /**
     * Function that gets the options along with the layout mode and returns the content.
     * @param {*} items - Array of items to be rendered.
     * @param {'list' | 'grid' | (string & Record<string, unknown>)} [layout] - Current layout mode.
     * @returns {React.ReactNode | React.ReactNode[] | undefined} The content to be rendered.
     */
    listTemplate?(items: any[], layout?: 'list' | 'grid' | (string & Record<string, unknown>)): React.ReactNode | React.ReactNode[] | undefined;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {DataViewPassThroughOptions}
     */
    pt?: DataViewPassThroughOptions;
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
}

/**
 * **PrimeReact - DataViewLayoutOptions**
 *
 * _DataView displays data in grid or list layout with pagination and sorting features._
 *
 * [Live Demo](https://www.primereact.org/dataview/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 *
 */
// tslint:disable-next-line:max-classes-per-file
export declare class DataView extends React.Component<DataViewProps, any> {
    /**
     * Used to get container element.
     * @return {HTMLDivElement | null} Container element
     */
    public getElement(): HTMLDivElement | null;
}
