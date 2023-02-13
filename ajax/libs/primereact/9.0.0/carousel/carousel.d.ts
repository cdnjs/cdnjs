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
     * Used to get container element.
     * @return {HTMLDivElement} Container element
     */
    public getElement(): HTMLDivElement;
}
