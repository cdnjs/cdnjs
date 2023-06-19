/**
 *
 * OrderList is used to sort a collection.
 *
 * [Live Demo](https://www.primereact.org/orderlist/)
 *
 * @module orderlist
 *
 */
import * as React from 'react';

/**
 * Custom change event.
 * @see {@link OrderListProps.onChange}
 * @event
 */
interface OrderListChangeEvent {
    /**
     * Browser event
     */
    originalEvent: React.SyntheticEvent;
    /**
     * Reordered list
     */
    value: any;
}

/**
 * Custom filter options.
 */
interface OrderListFilterOptions {
    /**
     * Browser keyboard event for the filter orderlist element.
     */
    filter?: (event?: KeyboardEvent) => void;
    /**
     * Used to reset the filter.
     */
    reset?: () => void;
}

/**
 * Defines valid properties in OrderList component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group Properties
 */
export interface OrderListProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'onChange' | 'ref'> {
    /**
     * An array of objects to reorder.
     */
    value?: any[] | undefined;
    /**
     * Text for the caption.
     */
    header?: React.ReactNode | undefined;
    /**
     * Inline style of the list element.
     */
    listStyle?: React.CSSProperties | undefined;
    /**
     * Whether to enable dragdrop based reordering.
     * @defaultValue false
     */
    dragdrop?: boolean | undefined;
    /**
     * Name of the field that uniquely identifies the a record in the data.
     */
    dataKey?: string | undefined;
    /**
     * The breakpoint to define the maximum width boundary when responsiveness is enabled.
     * @defaultValue '960px'.
     */
    breakpoint?: string | undefined;
    /**
     * When specified, displays an input field to filter the items on keyup.
     * @defaultValue false
     */
    filter?: boolean | undefined;
    /**
     * When filtering is enabled, filterBy decides which field or fields (comma separated) to search against.
     * @defaultValue label
     */
    filterBy?: string | undefined;
    /**
     * Defines how the items are filtered, valid values are "contains" (default), "startsWith", "endsWith", "equals" and "notEquals".
     * @defaultValue contains
     */
    filterMatchMode?: string | undefined;
    /**
     * Placeholder text to show when filter input is empty.
     */
    filterPlaceholder?: string | undefined;
    /**
     * Locale to use in filtering. The default locale is the host environment's current locale.
     * @defaultValue undefined
     */
    filterLocale?: string | undefined;
    /**
     * Custom template of filter element.
     */
    filterTemplate?: React.ReactNode | ((options: OrderListFilterOptions) => React.ReactNode);
    /**
     * Callback to invoke to when a mouse button is pressed.
     * @param {OrderListChangeEvent} event - Browser event.
     */
    onChange?(event: OrderListChangeEvent): void;
    /**
     * The template of each item
     * @param {*} item - Current item
     */
    itemTemplate?(item: any): React.ReactNode;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
}

/**
 * **PrimeReact - OrderList**
 *
 * _OrderList is used to sort a collection._
 *
 * [Live Demo](https://www.primereact.org/orderlist/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class OrderList extends React.Component<OrderListProps, any> {
    /**
     * Used to get container element.
     * @return {HTMLDivElement} Container element
     */
    public getElement(): HTMLDivElement;
}
