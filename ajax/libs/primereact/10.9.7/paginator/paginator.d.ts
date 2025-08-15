/**
 *
 * Paginator is a generic widget to display content in paged format.
 *
 * [Live Demo](https://www.primereact.org/paginator/)
 *
 * @module paginator
 *
 */
import * as React from 'react';
import { CSSTransitionProps as ReactCSSTransitionProps } from 'react-transition-group/CSSTransition';
import { ComponentHooks } from '../componentbase/componentbase';
import { DropdownPassThroughOptions } from '../dropdown/dropdown';
import { InputNumberPassThroughOptions } from '../inputnumber/inputnumber';
import { PassThroughOptions } from '../passthrough';
import { IconType, PassThroughType } from '../utils/utils';

export declare type PaginatorPassThroughType<T> = PassThroughType<T, PaginatorPassThroughMethodOptions>;
export declare type PaginatorPassThroughTransitionType = ReactCSSTransitionProps | ((options: PaginatorPassThroughMethodOptions) => ReactCSSTransitionProps) | undefined;

/**
 * Custom passthrough(pt) option method.
 */
export interface PaginatorPassThroughMethodOptions {
    props: PaginatorProps;
    context: PaginatorContext;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link PaginatorProps.pt}
 */
export interface PaginatorPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: PaginatorPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the left's DOM element.
     */
    left?: PaginatorPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the first page button's DOM element.
     */
    firstPageButton?: PaginatorPassThroughType<React.HTMLAttributes<HTMLButtonElement>>;
    /**
     * Uses to pass attributes to the first page icon's DOM element.
     */
    firstPageIcon?: PaginatorPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the prev page button's DOM element.
     */
    prevPageButton?: PaginatorPassThroughType<React.HTMLAttributes<HTMLButtonElement>>;
    /**
     * Uses to pass attributes to the prev page icon's DOM element.
     */
    prevPageIcon?: PaginatorPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the next page button's DOM element.
     */
    nextPageButton?: PaginatorPassThroughType<React.HTMLAttributes<HTMLButtonElement>>;
    /**
     * Uses to pass attributes to the next page icon's DOM element.
     */
    nextPageIcon?: PaginatorPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the last page button's DOM element.
     */
    lastPageButton?: PaginatorPassThroughType<React.HTMLAttributes<HTMLButtonElement>>;
    /**
     * Uses to pass attributes to the last page icon's DOM element.
     */
    lastPageIcon?: PaginatorPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the pages's DOM element.
     */
    pages?: PaginatorPassThroughType<React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the page button's DOM element.
     */
    pageButton?: PaginatorPassThroughType<React.HTMLAttributes<HTMLButtonElement>>;
    /**
     * Uses to pass attributes to the current's DOM element.
     */
    current?: PaginatorPassThroughType<React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the Dropdown component.
     * @see {@link DropdownPassThroughOptions}
     */
    RPPDropdown?: DropdownPassThroughOptions;
    /**
     * Uses to pass attributes to the Dropdown component.
     * @see {@link InputNumberPassThroughOptions}
     */
    JTPInput?: InputNumberPassThroughOptions;
    /**
     * Uses to pass attributes to the end's DOM element.
     */
    end?: PaginatorPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Used to manage all lifecycle hooks
     * @see {@link ComponentHooks}
     */
    hooks?: ComponentHooks;
    /**
     * Used to control React Transition API.
     */
    transition?: PaginatorPassThroughTransitionType;
}

/**
 * Defines current options in Paginator component.
 */
export interface PaginatorContext {
    /**
     * Current active state as a boolean.
     * @defaultValue false
     */
    active: boolean;
    /**
     * Current disabled state of the button as a boolean.
     * @defaultValue false
     */
    disabled: boolean;
}

/**
 * Custom page change event.
 * @see {@link PaginatorProps.onPageChange}
 * @event
 */
interface PaginatorPageChangeEvent {
    /**
     * Index of first record
     */
    first: number;
    /**
     * Number of rows to display in new page
     */
    rows: number;
    /**
     * New page number
     */
    page: number;
    /**
     * Total number of pages
     */
    pageCount: number;
}

/**
 * Custom paginator first page link options
 */
interface PaginatorFirstPageLinkOptions {
    /**
     * Callback to invoke on click.
     * @param {React.SyntheticEvent} event - Browser event.v
     */
    onClick(event: React.SyntheticEvent): void;
    /**
     * Style class of the first page link.
     */
    className: string;
    /**
     * Icon classname of the first page link.
     */
    iconClassName: string;
    /**
     * Whether the link is disabled.
     */
    disabled: boolean;
    /**
     * JSX element to be used as the first page link.
     */
    element: JSX.Element;
    /**
     * The page number.
     */
    page: number;
    /**
     * The current page number.
     */
    currentPage: number;
    /**
     * The total number of pages.
     */
    totalPages: number;
    /**
     * The total number of records.
     */
    totalRecords: number;
    /**
     * The number of rows per page.
     */
    rows: number;
    /**
     * The props of Paginator component
     */
    props: PaginatorProps;
}

/**
 * Custom paginator prev page link options
 */
interface PaginatorPrevPageLinkOptions {
    /**
     * Callback to invoke on click.
     * @param {React.SyntheticEvent} event - Browser event.
     */
    onClick(event: React.SyntheticEvent): void;
    /**
     * Style class of the prev page link.
     */
    className: string;
    /**
     * Icon classname of the prev page link.
     */
    iconClassName: string;
    /**
     * Whether the link is disabled.
     */
    disabled: boolean;
    /**
     * JSX element to be used as the prev page link.
     */
    element: JSX.Element;
    /**
     * The page number.
     */
    page: number;
    /**
     * The current page number.
     */
    currentPage: number;
    /**
     * The total number of pages.
     */
    totalPages: number;
    /**
     * The total number of records.
     */
    totalRecords: number;
    /**
     * The number of rows per page.
     */
    rows: number;
    /**
     * The props of Paginator component
     */
    props: PaginatorProps;
}

/**
 * Custom paginator view options
 */
interface PaginatorViewOptions {
    /**
     * Starting page number for the paginator view.
     */
    startPage: number;
    /**
     * Ending page number for the paginator view.
     */
    endPage: number;
}

/**
 * Custom paginator page links options
 */
interface PaginatorPageLinksOptions {
    /**
     * Callback to invoke on click.
     * @param {React.SyntheticEvent} event - Browser event.
     */
    onClick(event: React.SyntheticEvent): void;
    /**
     * Style class of the page links.
     */
    className: string;
    /**
     * Paginator view options.
     */
    view: PaginatorViewOptions;
    /**
     * The page number.
     */
    page: number;
    /**
     * The current page number.
     */
    currentPage: number;
    /**
     * The total number of pages.
     */
    totalPages: number;
    /**
     * The total number of records.
     */
    totalRecords: number;
    /**
     * The number of rows per page.
     */
    rows: number;
    /**
     * JSX element to be used as the page links.
     */
    element: JSX.Element;
    /**
     * The props of Paginator component
     */
    props: PaginatorProps;
}

/**
 * Custom paginator next page link options
 */
interface PaginatorNextPageLinkOptions {
    /**
     * Callback to invoke on click.
     * @param {React.SyntheticEvent} event - Browser event.
     */
    onClick(event: React.SyntheticEvent): void;
    /**
     * Style class of the next page link.
     */
    className: string;
    /**
     * Icon classname of the next page link.
     */
    iconClassName: string;
    /**
     * Whether the link is disabled.
     */
    disabled: boolean;
    /**
     * JSX element to be used as the next page link.
     */
    element: JSX.Element;
    /**
     * The page number.
     */
    page: number;
    /**
     * The current page number.
     */
    currentPage: number;
    /**
     * The total number of pages.
     */
    totalPages: number;
    /**
     * The total number of records.
     */
    totalRecords: number;
    /**
     * The number of rows per page.
     */
    rows: number;
    /**
     * The props of Paginator component
     */
    props: PaginatorProps;
}

/**
 * Custom paginator last page link options
 */
interface PaginatorLastPageLinkOptions {
    /**
     * Callback to invoke on click.
     * @param {React.SyntheticEvent} event - Browser event.
     */
    onClick(event: React.SyntheticEvent): void;
    /**
     * Style class of the last page link.
     */
    className: string;
    /**
     * Icon classname of the last page link.
     */
    iconClassName: string;
    /**
     * Whether the link is disabled.
     */
    disabled: boolean;
    /**
     * JSX element to be used as the last page link.
     */
    element: JSX.Element;
    /**
     * The page number.
     */
    page: number;
    /**
     * The current page number.
     */
    currentPage: number;
    /**
     * The total number of pages.
     */
    totalPages: number;
    /**
     * The total number of records.
     */
    totalRecords: number;
    /**
     * The number of rows per page.
     */
    rows: number;
    /**
     * The props of Paginator component
     */
    props: PaginatorProps;
}

/**
 * Custom paginator change target options
 */
interface PaginatorChangeTargetOptions {
    /**
     * The name attribute of the target options.
     */
    name: string;
    /**
     * The id attribute of the target options.
     */
    id: string;
    /**
     * The value attribute of the target options.
     */
    value: string | undefined | null;
}

/**
 * Custom change event.
 * @see {@link PaginatorRowsPerPageDropdownOptions.onChange}
 * @event
 */
interface PaginatorChangeEvent {
    /**
     * Browser event.
     */
    originalEvent: React.SyntheticEvent;
    /**
     * New value of the element.
     */
    value: string | undefined | null;
    /**
     * Stops the event from propagating.
     */
    stopPropagation(): void;
    /**
     * Prevents the default action of the event.
     */
    preventDefault(): void;
    /**
     * Target options.
     */
    target: PaginatorChangeTargetOptions;
}

/**
 * Custom rows per page dropdown options
 */
interface PaginatorRowsPerPageDropdownOptions {
    /**
     * New value of the element.
     */
    value: any;
    /**
     * The options available in the rows per page dropdown.
     */
    options: any[];
    /**
     * Paginator options change callback
     * @param {PaginatorChangeEvent} event - Custom change event.
     */
    onChange(event: PaginatorChangeEvent): void;
    /**
     * DOM element instance where the overlay panel should be mounted. Valid values are any DOM Element and "self". The "self" value is used to render a component where it is located.
     */
    appendTo?: 'self' | HTMLElement | undefined | null | (() => HTMLElement);
    /**
     * The current page number.
     */
    currentPage: number;
    /**
     * The total number of pages.
     */
    totalPages: number;
    /**
     * The total number of records.
     */
    totalRecords: number;
    /**
     * JSX element to be used as the rows per page dropdown.
     */
    element: JSX.Element;
    /**
     * The props of Paginator component.
     */
    props: PaginatorProps;
    /**
     * Whether the dropdown is disabled.
     */
    disabled: boolean;
}

/**
 * Custom paginator current page report options
 */
interface PaginatorCurrentPageReportOptions {
    /**
     * The current page number.
     */
    currentPage: number;
    /**
     * The total number of pages.
     */
    totalPages: number;
    /**
     * The first number of the current page.
     */
    first: number;
    /**
     * The last number of the current page.
     */
    last: number;
    /**
     * The number of rows per page.
     */
    rows: number;
    /**
     * The total number of records.
     */
    totalRecords: number;
    /**
     * Style class of the element.
     */
    className: string;
    /**
     * JSX element to be used as the current page report element.
     */
    element: JSX.Element;
    /**
     * The props of Paginator component.
     */
    props: PaginatorProps;
}

/**
 * Custom paginator jump to page input options
 */
interface PaginatorJumpToPageInputOptions {
    /**
     * The current value.
     */
    value: number;
    /**
     * Callback to invoke when the input value changes.
     * @param {number} first - Custom change event.
     * @param {number} rows - Custom change event.
     */
    onChange(first: number, rows: number): void;
    /**
     * Whether the input is disabled.
     */
    disabled: boolean;
    /**
     * Style class of the element.
     */
    className: string;
    /**
     * JSX element to be used as the jump to page input element.
     */
    element: JSX.Element;
    /**
     * The props of Paginator component.
     */
    props: PaginatorProps;
}

/**
 * Custom paginator template options
 */
interface PaginatorTemplateOptions {
    /**
     * The layout of the paginator.
     */
    layout?: string;
    /**
     * The first page link component.
     */
    FirstPageLink?: React.ReactNode | ((options: PaginatorFirstPageLinkOptions) => React.ReactNode);
    /**
     * The prev page link component.
     */
    PrevPageLink?: React.ReactNode | ((options: PaginatorPrevPageLinkOptions) => React.ReactNode);
    /**
     * The page links component.
     */
    PageLinks?: React.ReactNode | ((options: PaginatorPageLinksOptions) => React.ReactNode);
    /**
     * The next page link component.
     */
    NextPageLink?: React.ReactNode | ((options: PaginatorNextPageLinkOptions) => React.ReactNode);
    /**
     * The last page link component.
     */
    LastPageLink?: React.ReactNode | ((options: PaginatorLastPageLinkOptions) => React.ReactNode);
    /**
     * The rows per page dropdown component.
     */
    RowsPerPageDropdown?: React.ReactNode | ((options: PaginatorRowsPerPageDropdownOptions) => React.ReactNode);
    /**
     * The current page report component.
     */
    CurrentPageReport?: React.ReactNode | ((options: PaginatorCurrentPageReportOptions) => React.ReactNode);
    /**
     * The jump to page input component.
     */
    JumpToPageInput?: React.ReactNode | ((options: PaginatorJumpToPageInputOptions) => React.ReactNode);
}

/**
 * Custom template for the paginator.
 */
export type PaginatorTemplate = PaginatorTemplateOptions | string | undefined;

/**
 * Defines valid properties in Paginator component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group Properties
 */
export interface PaginatorProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref' | 'pt'> {
    /**
     * Number of total records.
     * @defaultValue 0
     */
    totalRecords?: number | undefined;
    /**
     * Data count to display per page.
     * @defaultValue 0
     */
    rows?: number | undefined;
    /**
     * Zero-relative number of the first row to be displayed.
     * @defaultValue 0
     */
    first?: number | undefined;
    /**
     * Number of page links to display.
     * @defaultValue 5
     */
    pageLinkSize?: number | undefined;
    /**
     * Array of integer values to display inside rows per page dropdown.
     */
    rowsPerPageOptions?: number[] | undefined;
    /**
     * Whether to show it even there is only one page.
     */
    alwaysShow?: boolean | undefined;
    /**
     * Custom template of the paginator.
     * @defaultValue FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown
     */
    template?: PaginatorTemplateOptions | string | undefined;
    /**
     * Content to inject into the left side of the paginator.
     */
    leftContent?: React.ReactNode | undefined;
    /**
     * Content to inject into the right side of the paginator.
     */
    rightContent?: React.ReactNode | undefined;
    /**
     * Icon of the first page link icon template.
     */
    firstPageLinkIcon?: IconType<PaginatorProps> | undefined;
    /**
     * Icon of the prev page link icon template.
     */
    prevPageLinkIcon?: IconType<PaginatorProps> | undefined;
    /**
     * Icon of the next page link icon template.
     */
    nextPageLinkIcon?: IconType<PaginatorProps> | undefined;
    /**
     * Icon of the last page link icon template.
     */
    lastPageLinkIcon?: IconType<PaginatorProps> | undefined;
    /**
     * Template of the current page report element. Available placeholders are &#123;currentPage&#125;, &#123;totalPages&#125;, &#123;rows&#125;, &#123;first&#125;, &#123;last&#125; and &#123;totalRecords&#125;
     * @defaultValue (&#123;currentPage&#125; of &#123;totalPages&#125;)
     */
    currentPageReportTemplate?: string | undefined;
    /**
     * DOM element instance where the overlay panel should be mounted. Valid values are any DOM Element and 'self'. The self value is used to render a component where it is located.
     * @defaultValue document.body
     */
    dropdownAppendTo?: 'self' | HTMLElement | undefined | null | (() => HTMLElement);
    /**
     * Callback to invoke when page changes, the event object contains information about the new state.
     * @param {PaginatorPageChangeEvent} event - Custom page change event.
     */
    onPageChange?(event: PaginatorPageChangeEvent): void;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {PaginatorPassThroughOptions}
     */
    pt?: PaginatorPassThroughOptions;
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
 * **PrimeReact - Paginator**
 *
 * _Paginator is a generic widget to display content in paged format._
 *
 * [Live Demo](https://www.primereact.org/paginator/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class Paginator extends React.Component<PaginatorProps, any> {
    /**
     * Used to get container element.
     * @return {HTMLDivElement | null} Container element
     */
    public getElement(): HTMLDivElement | null;
}
