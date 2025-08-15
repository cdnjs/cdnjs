/**
 *
 * VirtualScroller is a performant approach to handle huge data efficiently.
 *
 * [Live Demo](https://www.primereact.org/virtualscroller/)
 *
 * @module virtualscroller
 *
 */

import * as React from 'react';
import { ComponentHooks } from '../componentbase/componentbase';
import { PassThroughOptions } from '../passthrough';
import { IconType, PassThroughType } from '../utils/utils';

export declare type VirtualScrollerPassThroughType<T> = PassThroughType<T, VirtualScrollerPassThroughMethodOptions>;

/**
 * Custom passthrough(pt) option method.
 */
export interface VirtualScrollerPassThroughMethodOptions {
    props: VirtualScrollerProps;
    state: VirtualScrollerState;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link VirtualScrollerProps.pt}
 */
export interface VirtualScrollerPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: VirtualScrollerPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the content's DOM element.
     */
    content?: VirtualScrollerPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the loader's DOM element.
     */
    loader?: VirtualScrollerPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the loading icon's DOM element.
     */
    loadingIcon?: VirtualScrollerPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the spacer's DOM element.
     */
    spacer?: VirtualScrollerPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Used to manage all lifecycle hooks
     * @see {@link ComponentHooks}
     */
    hooks?: ComponentHooks;
}

/**
 * Defines current inline state in VirtualScroller component.
 */
export interface VirtualScrollerState {
    /**
     * First index of the new data range to be loaded as a number.
     */
    first: number;
    /**
     * Last index of the new data range to be loaded as a number.
     */
    last: number;
    /**
     * Index of the first item as a number.
     */
    page: number;
    /**
     * Visible item count in the viewport as a number.
     */
    numItemsInViewport: number;
    /**
     * Additional elements to add to the DOM outside of the view as a number.
     */
    numToleratedItems: number;
    /**
     * Current loading state as a boolean.
     * @defaultValue false
     */
    loading: number;
    /**
     * Loadable items array.
     */
    loaderArr: any[];
}

/**
 * Custom virtual scroller options type.
 */
interface VirtualScrollerOptionsType {
    /**
     * Left position of scroll.
     */
    left: number;
    /**
     * Top position of scroll
     */
    top: number;
    /**
     * Behavior of scroll, valid values are 'auto' and 'smooth'
     */
    behavior: 'auto' | 'smooth';
}

/**
 * Viewport rendered range.
 */
interface VirtualScrollerViewportRenderedRange {
    /**
     * The first number of the current viewport.
     */
    first: number;
    /**
     * The last number of the current viewport.
     */
    last: number;
}

/**
 * Virtual scroller rendered range.
 */
interface VirtualScrollerRenderedRange {
    /**
     * First index of the new data range to be rendered.
     */
    first: number;
    /**
     * Last index of the new data range to be rendered.
     */
    last: number;
    /**
     * Viewport of the rendered range.
     */
    viewport: VirtualScrollerViewportRenderedRange;
}

/**
 * Custom virtual scroller state.
 */
interface VirtualScrollerState {
    /**
     * Number of rows to be rendered.
     */
    rows: number;
    /**
     * Number of columns to be rendered.
     */
    cols: number;
}

/**
 * Custom template options.
 */
interface VirtualScrollerTemplateOptions {
    /**
     * Index of the item.
     */
    index: number;
    /**
     * Total numbers of items.
     */
    count: number;
    /**
     * Whether this is the first item.
     */
    first: boolean;
    /**
     * Whether this is the last item.
     */
    last: boolean;
    /**
     * Whether the index is even.
     */
    even: boolean;
    /**
     * Whether the index is odd.
     */
    odd: boolean;
    /**
     * The props of the virtual scroller.
     */
    props: VirtualScrollerProps;
}

/**
 * Custom template options.
 * @extends VirtualScrollerTemplateOptions
 */
interface VirtualScrollerLoadingTemplateOptions extends VirtualScrollerTemplateOptions {
    /**
     * Total number of columns in a row in 'both' orientation mode in view.
     */
    numCols: number;
    /**
     * Extra options.
     */
    [key: string]: any;
}

/**
 * Custom loader icon template props.
 */
interface VirtualScrollerLoaderIconTemplateOptions {
    /**
     * Style class of the loader icon.
     */
    className: string;
    /**
     * The JSX element that represents the loader icon.
     */
    element: JSX.Element;
    /**
     * The props of the VirtualScroller component.
     */
    props: VirtualScrollerProps;
}

/**
 * Custom content template options.
 */
interface VirtualScrollerContentTemplateOptions {
    /**
     * Style class of the wrapper element.
     */
    className: string;
    /**
     * Ref of wrapper element.
     */
    contentRef: any;
    /**
     * Ref of spacer element.
     */
    spacerRef: any;
    /**
     * Ref of sticky element in content.
     */
    stickyRef: any;
    /**
     * Loaded data.
     */
    items: any[] | any[][] | undefined | null;
    /**
     * Information of any item.
     * @param {number} index - Index of the template item.
     */
    getItemOptions(index: number): VirtualScrollerTemplateOptions;
    /**
     * Items of wrapper element.
     */
    children: any;
    /**
     * Default wrapper element.
     */
    element: JSX.Element;
    /**
     * Props of VirtualScroller component.
     */
    props: VirtualScrollerProps;
    /**
     * Whether the data is loaded.
     */
    loading: boolean;
    /**
     * Information of any item during the loading.
     * @param {number} index - Index of the item.
     * @param {object} ext - The extra options to pass to the content.
     */
    getLoaderOptions(index: number, ext?: object): VirtualScrollerLoadingTemplateOptions;
    /**
     * Template of loading item.
     */
    loadingTemplate: React.ReactNode | ((options: VirtualScrollerLoadingTemplateOptions) => React.ReactNode);
    /**
     * The height/width of item according to orientation.
     */
    itemSize: number | number[];
    /**
     * Rows of the virtual scroller.
     */
    rows: any[];
    /**
     * Columns of the virtual scroller.
     */
    columns: any[];
    /**
     * Whether the orientation is vertical.
     */
    vertical: boolean;
    /**
     * Whether the orientation is horizontal.
     */
    horizontal: boolean;
    /**
     * Whether the orientation is both.
     */
    both: boolean;
}

/**
 * Custom change event.
 * @see {@link VirtualScrollerProps.onScrollIndexChange}
 * @event
 */
interface VirtualScrollerChangeEvent {
    /**
     * First index of the new data range to be loaded.
     */
    first: number | VirtualScrollerState;
    /**
     * Last index of the new data range to be loaded.
     */
    last: number | VirtualScrollerState;
}

/**
 * Custom lazy load event.
 * @see {@link VirtualScrollerProps.onLazyLoad}
 * @extends {VirtualScrollerChangeEvent}
 * @event
 */
interface VirtualScrollerLazyEvent extends VirtualScrollerChangeEvent {}

/**
 * Defines valid properties in VirtualScroller component.
 * @group Properties
 */
export interface VirtualScrollerProps {
    /**
     * Unique identifier of the element.
     */
    id?: string | undefined;
    /**
     * Inline style of the component.
     */
    style?: React.CSSProperties | undefined;
    /**
     * Style class of the component.
     */
    className?: string | undefined;
    /**
     * Index of the element in tabbing order.
     * @defaultValue 0
     */
    tabIndex?: number | undefined;
    /**
     * An array of objects to display.
     */
    items?: any[] | any[][] | undefined | null;
    /**
     * The height/width of item according to orientation.
     */
    itemSize?: number | number[] | undefined;
    /**
     * Height of the scroll viewport.
     */
    scrollHeight?: string | undefined;
    /**
     * Width of the scroll viewport.
     */
    scrollWidth?: string | undefined;
    /**
     * The orientation of scrollbar, valid values are 'vertical', 'horizontal' and 'both'.
     * @defaultValue 'vertical'
     */
    orientation?: 'vertical' | 'horizontal' | 'both' | undefined;
    /**
     * Used to specify how many items to load in each load method in lazy mode.
     * @defaultValue 0
     */
    step?: number | undefined;
    /**
     * Determines how many additional elements to add to the DOM outside of the view. According to the scrolls made up and down, extra items are added in a certain algorithm in the form of multiples of this number. Default value is half the number of items shown in the view.
     */
    numToleratedItems?: number | undefined;
    /**
     * Delay in scroll before new data is loaded.
     * @defaultValue 0
     */
    delay?: number | undefined;
    /**
     * Delay after window's resize finishes.
     * @defaultValue 10
     */
    resizeDelay?: number | undefined;
    /**
     * Used to append each loaded item to top without removing any items from the DOM. Using very large data may cause the browser to crash.
     * @defaultValue false
     */
    appendOnly?: boolean | undefined;
    /**
     * When enabled, positions the content as inline.
     * @defaultValue false
     */
    inline?: boolean | undefined;
    /**
     * Defines if data is loaded and interacted with in lazy manner.
     * @defaultValue false
     */
    lazy?: boolean | undefined;
    /**
     * If disabled, the VirtualScroller feature is eliminated and the content is displayed directly.
     * @defaultValue false
     */
    disabled?: boolean | undefined;
    /**
     * Used to implement a custom loader instead of using the loader feature in the VirtualScroller.
     * @defaultValue false
     */
    loaderDisabled?: boolean | undefined;
    /**
     * Columns of the virtual scroller for vertical option.
     */
    columns?: any | undefined;
    /**
     * Whether the data is loaded.
     * @defaultValue false
     */
    loading?: boolean | undefined;
    /**
     * Whether to dynamically change the height or width of scrollable container.
     * @defaultValue false
     */
    autoSize?: boolean | undefined;
    /**
     * Used to implement a custom spacer instead of using the spacer feature in the VirtualScroller.
     * @defaultValue true
     */
    showSpacer?: boolean | undefined;
    /**
     * Whether to show loader.
     * @defaultValue false
     */
    showLoader?: boolean | undefined;
    /**
     * The icon to show while indicating data load is in progress.
     */
    loadingIcon?: IconType<VirtualScrollerProps> | undefined;
    /**
     * The template of loader.
     */
    loadingTemplate?: React.ReactNode | ((options: VirtualScrollerLoadingTemplateOptions) => React.ReactNode);
    /**
     * The template of loader's icon.
     * @deprecated Since v9.2.3, use `loadingIcon` instead.
     */
    loaderIconTemplate?: React.ReactNode | ((options: VirtualScrollerLoaderIconTemplateOptions) => React.ReactNode);
    /**
     * The template of item.
     */
    itemTemplate?: React.ReactNode | ((item: any, options: VirtualScrollerTemplateOptions) => React.ReactNode);
    /**
     * The template of item's wrapper element.
     */
    contentTemplate?: React.ReactNode | ((options: VirtualScrollerContentTemplateOptions) => React.ReactNode);
    /**
     * Callback to invoke when scroll position changes.
     * @param {React.UIEvent<HTMLElement>} event - Browser event
     */
    onScroll?(event: React.UIEvent<HTMLElement>): void;
    /**
     * Callback to invoke when scroll position and item's range in view changes.
     * @param {VirtualScrollerChangeEvent} event - Custom change event
     */
    onScrollIndexChange?(event: VirtualScrollerChangeEvent): void;
    /**
     * Callback to invoke in lazy mode to load new data.
     * @param {VirtualScrollerLazyEvent} event - Custom lazy load event.
     */
    onLazyLoad?(event: VirtualScrollerLazyEvent): void;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {VirtualScrollerPassThroughOptions}
     */
    pt?: VirtualScrollerPassThroughOptions;
    /**
     * Used to configure passthrough(pt) options of the component.
     * @type {PassThroughOptions}
     */
    ptOptions?: PassThroughOptions;
}

/**
 * **PrimeReact - VirtualScroller**
 *
 * _VirtualScroller is a performant approach to handle huge data efficiently._
 *
 * [Live Demo](https://www.primereact.org/virtualscroller/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class VirtualScroller extends React.Component<VirtualScrollerProps, any> {
    /**
     * Returns the reference of virtualScroller's container.
     * @return {React.Ref<HTMLDivElement>} Ref Div element
     */
    public getElementRef(): React.Ref<HTMLDivElement>;
    /**
     * Scroll to move to a specific position.
     * @param {VirtualScrollerOptionsType} options - Custom virtual scroller options.
     */
    public scrollTo(options: VirtualScrollerOptionsType): void;
    /**
     * Scroll to move to a specific item.
     * @param {number | number[]} index - Index of item according to orientation mode.
     * @param {'auto' | 'smooth'} behavior - Behavior of scroll, valid values are 'auto' and 'smooth'
     */
    public scrollToIndex(index: number | number[], behavior?: 'auto' | 'smooth'): void;
    /**
     * It is used to move the specified index into the view. It is a method that will usually be needed when keyboard support is added to the virtualScroller component.
     * @param {number | number[]} index - Index of item according to orientation mode.
     * @param {'to-start' | 'to-end'} to - Defines the location of the item in view, valid values are 'to-start' and 'to-end'.
     * @param {'auto' | 'smooth'} behavior - Behavior of scroll, valid values are 'auto' and 'smooth'
     */
    public scrollInView(index: number | number[], to?: 'to-start' | 'to-end', behavior?: 'auto' | 'smooth'): void;
    /**
     * Returns the range of items added to the DOM.
     */
    public getRenderedRange(): VirtualScrollerRenderedRange;
}
