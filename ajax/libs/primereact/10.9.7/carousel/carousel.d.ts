/**
 *
 * Carousel is a content slider featuring various customization options.
 *
 * [Live Demo](https://www.primereact.org/carousel)
 *
 * @module carousel
 *
 */
import * as React from 'react';
import { ComponentHooks } from '../componentbase/componentbase';
import { PassThroughOptions } from '../passthrough';
import { IconType, PassThroughType } from '../utils/utils';

export declare type CarouselPassThroughType<T> = PassThroughType<T, CarouselPassThroughMethodOptions>;

/**
 * Custom passthrough(pt) option method.
 */
export interface CarouselPassThroughMethodOptions {
    props: CarouselProps;
    state: CarouselState;
    context: CarouselContext;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link CarouselProps.pt}
 */
export interface CarouselPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: CarouselPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the header's DOM element.
     */
    header?: CarouselPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the content's DOM element.
     */
    content?: CarouselPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the container's DOM element.
     */
    container?: CarouselPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the previous button's DOM element.
     */
    previousButton?: CarouselPassThroughType<React.HTMLAttributes<HTMLButtonElement>>;
    /**
     * Uses to pass attributes to the previous button icon's DOM element.
     */
    previousButtonIcon?: CarouselPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the items content's DOM element.
     */
    itemsContent?: CarouselPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the items container's DOM element.
     */
    itemsContainer?: CarouselPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the item cloned's DOM element.
     */
    itemCloned?: CarouselPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the item's DOM element.
     */
    item?: CarouselPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the next button's DOM element.
     */
    nextButton?: CarouselPassThroughType<React.HTMLAttributes<HTMLButtonElement>>;
    /**
     * Uses to pass attributes to the next button icon's DOM element.
     */
    nextButtonIcon?: CarouselPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the indicators's DOM element.
     */
    indicators?: CarouselPassThroughType<React.HTMLAttributes<HTMLUListElement>>;
    /**
     * Uses to pass attributes to the indicator's DOM element.
     */
    indicator?: CarouselPassThroughType<React.HTMLAttributes<HTMLLIElement>>;
    /**
     * Uses to pass attributes to the indicator button's DOM element.
     */
    indicatorButton?: CarouselPassThroughType<React.HTMLAttributes<HTMLButtonElement>>;
    /**
     * Uses to pass attributes to the footer's DOM element.
     */
    footer?: CarouselPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Used to manage all lifecycle hooks
     * @see {@link ComponentHooks}
     */
    hooks?: ComponentHooks;
}

/**
 * Defines current inline state in Carousel component.
 */
export interface CarouselState {
    /**
     * Number of items per page as a number.
     * @defaultValue 1
     */
    numVisible: number;
    /**
     * Number of items to scroll as a number.
     * @defaultValue 1
     */
    numScroll: number;
    /**
     * Index of the first item.
     * @defaultValue 0
     */
    page: number;
    /**
     * Total shifted items' count as a number.
     * @defaultValue 0
     */
    totalShiftedItems: number;
}

/**
 * Defines current inline options in Carousel component.
 */
export interface CarouselContext {
    /**
     * Current active state of the indicator as a boolean.
     * @defaultValue false
     */
    active: boolean;
}

/**
 * Custom responsive option
 * @see {@link CarouselProps.responsiveOptions}
 */
interface CarouselResponsiveOption {
    /**
     * The breakpoint to define the maximum width boundary.
     */
    breakpoint: string;
    /**
     * Number of items per page.
     */
    numVisible: number;
    /**
     * Number of items to scroll.
     */
    numScroll: number;
}

/**
 * Custom complete method event.
 * @see {@link CarouselProps.onPageChange}
 * @event
 */
interface CarouselPageChangeEvent {
    /**
     * Value of the new page.
     */
    page: number;
}

/**
 * Defines valid properties in Carousel component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group Properties
 */
export interface CarouselProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    /**
     * An array of objects to display.
     */
    value?: any[];
    /**
     * Index of the first item.
     */
    page?: number | undefined;
    /**
     * Label of header.
     */
    header?: React.ReactNode | undefined;
    /**
     * Label of footer.
     */
    footer?: React.ReactNode | undefined;
    /**
     * Function that gets an item in the value and returns the content for it.
     * @param {*} item - Current item
     */
    itemTemplate?(item: any): React.ReactNode | undefined;
    /**
     * Defines if scrolling would be infinite.
     * @defaultValue false
     */
    circular?: boolean | undefined;
    /**
     * Whether to display indicator container.
     * @defaultValue true
     */
    showIndicators?: boolean | undefined;
    /**
     * Whether to display navigation buttons in container.
     * @defaultValue true
     */
    showNavigators?: boolean | undefined;
    /**
     * Time in milliseconds to scroll items automatically.
     */
    autoplayInterval?: number | undefined;
    /**
     * Number of items per page.
     * @defaultValue 1
     */
    numVisible?: number | undefined;
    /**
     * Number of items to scroll.
     * @defaultValue 1
     */
    numScroll?: number | undefined;
    /**
     * Icon for the previous button by orientation.
     */
    prevIcon?: IconType<CarouselProps> | undefined;
    /**
     * Icon for the next button by orientation.
     */
    nextIcon?: IconType<CarouselProps> | undefined;
    /**
     * An array of options for responsive design.
     * @type {CarouselResponsiveOption}
     */
    responsiveOptions?: CarouselResponsiveOption[] | undefined;
    /**
     * Specifies the layout of the component, valid values are "horizontal" and "vertical".
     * @defaultValue horizontal
     */
    orientation?: 'vertical' | 'horizontal' | undefined;
    /**
     * Height of the viewport in vertical layout.
     * @defaultValue 300px
     */
    verticalViewPortHeight?: string | undefined;
    /**
     * Style class of main content.
     */
    contentClassName?: string | undefined;
    /**
     * Style class of the viewport container.
     */
    containerClassName?: string | undefined;
    /**
     * Style class of the paginator items.
     */
    indicatorsContentClassName?: string | undefined;
    /**
     * Callback to invoke after scroll.
     * @param {CarouselPageChangeEvent} event - Custom change event.
     */
    onPageChange?(event: CarouselPageChangeEvent): void;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {CarouselPassThroughOptions}
     */
    pt?: CarouselPassThroughOptions;
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
 * **PrimeReact - Carousel**
 *
 * _Carousel is a content slider featuring various customization options._
 *
 * [Live Demo](https://www.primereact.org/carousel/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class Carousel extends React.Component<CarouselProps, any> {
    /**
     * Used to start the autoplay if it is currently stopped.
     */
    public startAutoplay(): void;
    /**
     * Used to stop the autoplay if it is currently started.
     */
    public stopAutoplay(): void;
    /**
     * Used to get container element.
     * @return {HTMLDivElement | null} Container element
     */
    public getElement(): HTMLDivElement | null;
}
