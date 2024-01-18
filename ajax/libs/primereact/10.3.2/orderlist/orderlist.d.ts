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
import { ButtonPassThroughOptions } from '../button/button';
import { ComponentHooks } from '../componentbase/componentbase';
import { PassThroughOptions } from '../passthrough';
import { IconType, PassThroughType } from '../utils/utils';

export declare type OrderListPassThroughType<T> = PassThroughType<T, OrderListPassThroughMethodOptions>;

/**
 * Custom passthrough(pt) option method.
 */
export interface OrderListPassThroughMethodOptions {
    props: OrderListProps;
    state: OrderListState;
    context: OrderListContext;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link OrderListProps.pt}
 */
export interface OrderListPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: OrderListPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the controls' DOM element.
     */
    controls?: OrderListPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the Button component.
     */
    moveUpButton?: ButtonPassThroughOptions;
    /**
     * Uses to pass attributes to the Button component.
     */
    moveTopButton?: ButtonPassThroughOptions;
    /**
     * Uses to pass attributes to the Button component.
     */
    moveDownButton?: ButtonPassThroughOptions;
    /**
     * Uses to pass attributes to the Button component.
     */
    moveBottomButton?: ButtonPassThroughOptions;
    /**
     * Uses to pass attributes to the container's DOM element.
     */
    container?: OrderListPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the header's DOM element.
     */
    header?: OrderListPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the list's DOM element.
     */
    list?: OrderListPassThroughType<React.HTMLAttributes<HTMLUListElement>>;
    /**
     * Uses to pass attributes to the item's DOM element.
     */
    item?: OrderListPassThroughType<React.HTMLAttributes<HTMLLIElement>>;
    /**
     * Uses to pass attributes to the item's DOM element.
     */
    droppoint?: OrderListPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the item's DOM element.
     */
    icon?: OrderListPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the item's DOM element.
     */
    filterInput?: OrderListPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the item's DOM element.
     */
    filterIcon?: OrderListPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the item's DOM element.
     */
    filter?: OrderListPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the item's DOM element.
     */
    filterContainer?: OrderListPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Used to manage all lifecycle hooks
     * @see {@link ComponentHooks}
     */
    hooks?: ComponentHooks;
}

/**
 * Defines current inline state in OrderList component.
 */
export interface OrderListState {
    /**
     * Current selection state as a boolean.
     */
    selection: [];
    /**
     * Current filter value as a string.s
     */
    filterValue: string;
    /**
     * Current attribute selector state as a string.
     */
    attributeSelector: string;
}

/**
 * Defines current options in OrderList component.
 */
export interface OrderListContext {
    /**
     * Current selection state of the item as a boolean.
     */
    selected: boolean;
}

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
export interface OrderListProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'onChange' | 'ref' | 'pt'> {
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
     * Used to define a string that labels the component.
     */
    ariaLabel?: string | undefined;
    /**
     * Establishes relationships between the component and label(s) where its value should be one or more element IDs.
     */
    ariaLabelledBy?: string | undefined;
    /**
     * Callback to invoke when menu receives focus.
     * @param {React.SyntheticEvent} event - Browser event.
     */
    onFocus?(event: React.SyntheticEvent): void;
    /**
     * Callback to invoke when menu loses focus.
     * @param {React.SyntheticEvent} event - Browser event.
     */
    onBlur?(event: React.SyntheticEvent): void;
    /**
     * Name of the field that uniquely identifies the a record in the data.
     */
    dataKey: string;
    /**
     * The breakpoint to define the maximum width boundary when responsiveness is enabled.
     * @defaultValue '960px'.
     */
    breakpoint?: string | undefined;
    /**
     * Icon of the move up icon.
     */
    moveUpIcon?: IconType<OrderListProps> | undefined;
    /**
     * Icon of the move top icon.
     */
    moveTopIcon?: IconType<OrderListProps> | undefined;
    /**
     * Icon of the move down icon.
     */
    moveDownIcon?: IconType<OrderListProps> | undefined;
    /**
     * Icon of the move bottom icon.
     */
    moveBottomIcon?: IconType<OrderListProps> | undefined;
    /**
     * Icon of the filter.
     */
    filterIcon?: IconType<OrderListProps> | undefined;
    /**
     * When filtering is enabled, filterBy decides which field or fields (comma separated) to search against.
     * @defaultValue label
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
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {OrderListPassThroughOptions}
     */
    pt?: OrderListPassThroughOptions;
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
