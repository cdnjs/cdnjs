/**
 *
 * DataScroller displays data with on demand loading using scroll.
 *
 * [Live Demo](https://www.primereact.org/datascroller/)
 *
 * @module datascroller
 *
 */
import * as React from 'react';
import { ComponentHooks } from '../componentbase/componentbase';
import { PassThroughOptions } from '../passthrough';
import { PassThroughType } from '../utils';

export declare type DataScrollerPassThroughType<T> = PassThroughType<T, DataScrollerPassThroughMethodOptions>;

/**
 * Custom passthrough(pt) option method.
 */
export interface DataScrollerPassThroughMethodOptions {
    props: DataScrollerProps;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link DataScrollerProps.pt}
 */
export interface DataScrollerPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: DataScrollerPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the header's DOM element.
     */
    header?: DataScrollerPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the footer's DOM element.
     */
    footer?: DataScrollerPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the item's DOM element.
     */
    item?: DataScrollerPassThroughType<React.HTMLAttributes<HTMLLIElement>>;
    /**
     * Uses to pass attributes to the emptyMessage's DOM element.
     */
    emptyMessage?: DataScrollerPassThroughType<React.HTMLAttributes<HTMLLIElement>>;
    /**
     * Uses to pass attributes to the list's DOM element.
     */
    list?: DataScrollerPassThroughType<React.HTMLAttributes<HTMLUListElement>>;
    /**
     * Uses to pass attributes to the list's DOM element.
     */
    content?: DataScrollerPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Used to manage all lifecycle hooks
     * @see {@link ComponentHooks}
     */
    hooks?: ComponentHooks;
}

/**
 * Custom lazy event.
 * @see {@link DataScrollerProps.onLazyLoad}
 * @event
 */
interface DataScrollerLazyLoadEvents {
    /**
     * First row offset
     */
    first: number;
    /**
     * Number of rows per page
     */
    rows: number;
}

/**
 * Defines valid properties in DataScroller component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group Properties
 */
export interface DataScrollerProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref' | 'pt'> {
    /**
     * Number of buffer size.
     * @defaultValue 0.9
     */
    buffer?: number | undefined;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
    /**
     * Text to display when there is no data.
     * @defaultValue No records found
     */
    emptyMessage?: React.ReactNode | ((props: DataScrollerProps) => React.ReactNode);
    /**
     * Label of footer.
     */
    footer?: React.ReactNode | undefined;
    /**
     * Label of header.
     */
    header?: React.ReactNode | undefined;
    /**
     * Defines if the event target to listen the scroll event is the element itself.
     * @defaultValue false
     */
    inline?: boolean | undefined;
    /**
     * Defines if data is loaded and interacted with in lazy manner.
     * @defaultValue false
     */
    lazy?: boolean | undefined;
    /**
     * Determines whether data is loaded by a target element.
     */
    loader?: boolean | undefined;
    /**
     * Number of rows to fetch in a load event.
     */
    rows?: number | undefined;
    /**
     * Max height of the content area in inline mode.
     */
    scrollHeight?: string | undefined;
    /**
     * An array of objects to display.
     */
    value?: any[] | undefined;
    /**
     * Function that gets an item in the value and returns the content for it.
     * @param {*} item - Current item
     */
    itemTemplate?(item: any): React.ReactNode | undefined;
    /**
     * Callback to invoke in lazy mode to load new data.
     * @param {DataScrollerLazyLoadEvents} event - Custom lazy event
     */
    onLazyLoad?(event: DataScrollerLazyLoadEvents): void;
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {DataScrollerPassThroughOptions}
     */
    pt?: DataScrollerPassThroughOptions;
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
 * **PrimeReact - DataScroller**
 *
 * _DataScroller displays data with on demand loading using scroll._
 *
 * [Live Demo](https://www.primereact.org/datascroller/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class DataScroller extends React.Component<DataScrollerProps, any> {
    /**
     * Used to load data manually
     */
    public load(): void;
    /**
     * Used to get container element.
     * @return {HTMLDivElement | null} Container element
     */
    public getElement(): HTMLDivElement | null;
}
