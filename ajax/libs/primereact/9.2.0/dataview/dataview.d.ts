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
import { PaginatorTemplate } from '../paginator';

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
    paginatorDropdownAppendTo?: 'self' | HTMLElement | undefined | null;
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
    loadingIcon?: string | undefined;
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
     * Function that gets the option along with the layout mdoe and returns the content.
     * @param {*} item - Current item.
     * @param {'list' | 'grid' | (string & Record<string, unknown>)} layout - Current layout.
     */
    itemTemplate?(item: any, layout: 'list' | 'grid' | (string & Record<string, unknown>)): React.ReactNode;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
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
     * @return {HTMLDivElement} Container element
     */
    public getElement(): HTMLDivElement;
}
