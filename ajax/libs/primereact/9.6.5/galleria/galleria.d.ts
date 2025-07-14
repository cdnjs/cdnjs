/**
 *
 * Galleria is a content gallery component.
 *
 * [Live Demo](https://www.primereact.org/galleria)
 *
 * @module galleria
 *
 */
import * as React from 'react';
import { CSSTransitionProps } from '../csstransition';
import { IconType, PassThroughType } from '../utils/utils';

export declare type GalleriaPassThroughType<T> = PassThroughType<T, GalleriaThroughMethodOptions>;

/**
 * Custom passthrough(pt) option method.
 */
export interface GalleriaThroughMethodOptions {
    props: GalleriaProps;
    state: GalleriaState;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link GalleriaProps.pt}
 */
export interface GalleriaPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: GalleriaPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the close button's DOM element.
     */
    closeButton?: GalleriaPassThroughType<React.HTMLAttributes<HTMLButtonElement>>;
    /**
     * Uses to pass attributes to the close icon's DOM element.
     */
    closeIcon?: GalleriaPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the header's DOM element.
     */
    header?: GalleriaPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the content's DOM element.
     */
    content?: GalleriaPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the footer's DOM element.
     */
    footer?: GalleriaPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the item wrapper's DOM element.
     */
    itemWrapper?: GalleriaPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the item container's DOM element.
     */
    itemContainer?: GalleriaPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the previous item button's DOM element.
     */
    previousItemButton?: GalleriaPassThroughType<React.HTMLAttributes<HTMLButtonElement>>;
    /**
     * Uses to pass attributes to the previous item icon's DOM element.
     */
    previousItemIcon?: GalleriaPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the item's DOM element.
     */
    item?: GalleriaPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the next item button's DOM element.
     */
    nextItemButton?: GalleriaPassThroughType<React.HTMLAttributes<HTMLButtonElement>>;
    /**
     * Uses to pass attributes to the next item icon's DOM element.
     */
    nextItemIcon?: GalleriaPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the caption's DOM element.
     */
    caption?: GalleriaPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the indicators's DOM element.
     */
    indicators?: GalleriaPassThroughType<React.HTMLAttributes<HTMLUListElement>>;
    /**
     * Uses to pass attributes to the indicator's DOM element.
     */
    indicator?: GalleriaPassThroughType<React.HTMLAttributes<HTMLLIElement>>;
    /**
     * Uses to pass attributes to the thumbnail wrapper's DOM element.
     */
    thumbnailWrapper?: GalleriaPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the thumbnail container's DOM element.
     */
    thumbnailContainer?: GalleriaPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the previous thumbnail button's DOM element.
     */
    previousThumbnailButton?: GalleriaPassThroughType<React.HTMLAttributes<HTMLButtonElement>>;
    /**
     * Uses to pass attributes to the previous thumbnail icon's DOM element.
     */
    previousThumbnailIcon?: GalleriaPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the thumbnail items container's DOM element.
     */
    thumbnailItemsContainer?: GalleriaPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the thumbnail items' DOM element.
     */
    thumbnailItems?: GalleriaPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the thumbnail item's DOM element.
     */
    thumbnailItem?: GalleriaPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the thumbnail item content's DOM element.
     */
    thumbnailItemContent?: GalleriaPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the next thumbnail button's DOM element.
     */
    nextThumbnailButton?: GalleriaPassThroughType<React.HTMLAttributes<HTMLButtonElement>>;
    /**
     * Uses to pass attributes to the next thumbnail icon's DOM element.
     */
    nextThumbnailIcon?: GalleriaPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the mask's DOM element.
     */
    mask?: GalleriaPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
}

/**
 * Defines current inline state in Galleria component.
 */
export interface GalleriaState {
    /**
     * Current visible state as a boolean.
     * @default false
     */
    visible: number;
    /**
     * Number of items per page as a number.
     */
    numVisible: number;
    /**
     * Current slide show active state.
     * @default false
     */
    slideShowActive: number;
    /**
     * Current active item index as a number.
     */
    activeIndex: number;
}

/**
 * Custom galleria responsive options
 */
interface GalleriaResponsiveOptions {
    /**
     * Breakpoint for this responsive option.
     */
    breakpoint: string;
    /**
     * Number of visible items.
     */
    numVisible: number;
}

/**
 * Custom complete method event.
 * @see {@link GalleriaProps.onItemChange}
 * @event
 */
interface GalleriaItemChangeEvent {
    /**
     * index of the new item.
     */
    index: number;
}

/**
 * Defines valid properties in Galleria component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group Properties
 */
export interface GalleriaProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref' | 'pt'> {
    /**
     * An array of objects to display.
     */
    value?: any[] | undefined;
    /**
     * Index of the first item.
     * @defaultValue 0
     */
    activeIndex?: number | undefined;
    /**
     * Whether to display the component on fullscreen.
     * @defaultValue false
     */
    fullScreen?: boolean | undefined;
    /**
     * Function that gets an item in the value and returns the content for preview item.
     * @param {*} item - Current item.
     */
    item?(item: any): React.ReactNode | undefined;
    /**
     * Function that gets an item in the value and returns the content for thumbnail item.
     * @param {*} item - Current thumbnail item.
     */
    thumbnail?(item: any): React.ReactNode | undefined;
    /**
     * Function that gets an item in the value and returns the content for indicator item.
     * @param {number} index - Index of the indicator.
     */
    indicator?(index: number): React.ReactNode | undefined;
    /**
     * Icon to display in the galleria close button.
     */
    closeIcon?: IconType<GalleriaProps> | undefined;
    /**
     * Custom header template.
     */
    header?: React.ReactNode | undefined;
    /**
     * Custom footer template.
     */
    footer?: React.ReactNode | undefined;
    /**
     * Number of items per page.
     * @defaultValue 3
     */
    numVisible?: number | undefined;
    /**
     * An array of options for responsive design.
     */
    responsiveOptions?: GalleriaResponsiveOptions[] | undefined;
    /**
     * Whether to display navigation buttons in item container.
     * @defaultValue false
     */
    showItemNavigators?: boolean | undefined;
    /**
     * Whether to display navigation buttons in thumbnail container.
     * @defaultValue true
     */
    showThumbnailNavigators?: boolean | undefined;
    /**
     * Whether to display navigation buttons on item container's hover.
     * @defaultValue false
     */
    showItemNavigatorsOnHover?: boolean | undefined;
    /**
     * When enabled, item is changed on indicator item's hover.
     * @defaultValue false
     */
    changeItemOnIndicatorHover?: boolean | undefined;
    /**
     * Defines if scrolling would be infinite.
     * @defaultValue false
     */
    circular?: boolean | undefined;
    /**
     * Items are displayed with a slideshow in autoPlay mode.
     * @defaultValue false
     */
    autoPlay?: boolean | undefined;
    /**
     * Time in milliseconds to scroll items.
     * @defaultValue 4000
     */
    transitionInterval?: number | undefined;
    /**
     * Function that gets an item in the value and returns the content for caption item.
     * @param {*} item - Browser event.
     */
    caption?(item: any): React.ReactNode | undefined;
    /**
     * Whether to display thumbnail container.
     * @defaultValue true
     */
    showThumbnails?: boolean | undefined;
    /**
     * Icon to show in the next item button.
     */
    itemNextIcon?: IconType<GalleriaProps> | undefined;
    /**
     * Icon to show in the previous item button.
     */
    itemPrevIcon?: IconType<GalleriaProps> | undefined;
    /**
     * Icon to show in the next thumbnail button.
     */
    nextThumbnailIcon?: IconType<GalleriaProps> | undefined;
    /**
     * Icon to show in the previous thumbnail button.
     */
    prevThumbnailIcon?: IconType<GalleriaProps> | undefined;
    /**
     * Position of thumbnails. Valid values are "bottom", "top", "left" and "right".
     * @defaultValue bottom
     */
    thumbnailsPosition?: 'top' | 'bottom' | 'left' | 'right' | undefined;
    /**
     * Whether to display indicator container.
     * @defaultValue false
     */
    showIndicators?: boolean | undefined;
    /**
     * When enabled, indicator container is displayed on item container.
     * @defaultValue false
     */
    showIndicatorsOnItem?: boolean | undefined;
    /**
     * Position of indicators. Valid values are "bottom", "top", "left" and "right".
     * @defaultValue bottom
     */
    indicatorsPosition?: 'top' | 'bottom' | 'left' | 'right' | undefined;
    /**
     * Base zIndex value to use in layering.
     * @defaultValue 0
     */
    baseZIndex?: number | undefined;
    /**
     * The properties of CSSTransition can be customized, except for "nodeRef" and "in" properties.
     */
    transitionOptions?: CSSTransitionProps | undefined;
    /**
     * Callback to invoke after changing item.
     * @param {GalleriaItemChangeEvent} event - Custom change item.
     */
    onItemChange?(event: GalleriaItemChangeEvent): void;
    /**
     * Callback to invoke when modal becomes visible.
     */
    onShow?(): void;
    /**
     * Callback to invoke when modal becomes hidden.
     */
    onHide?(): void;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {GalleriaPassThroughOptions}
     */
    pt?: GalleriaPassThroughOptions;
}

/**
 * **PrimeReact - Galleria**
 *
 * _Galleria is a content gallery component._
 *
 * [Live Demo](https://www.primereact.org/galleria/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class Galleria extends React.Component<GalleriaProps, any> {
    /**
     * Used to show the overlay.
     */
    public show(): void;
    /**
     * Used to hide the overlay.
     */
    public hide(): void;
    /**
     * Whether auto-play feature is currently active.
     */
    public isAutoPlayActive(): boolean;
    /**
     * Used to start the slideshow.
     */
    public startSlideShow(): void;
    /**
     * Used to stop the slideshow.
     */
    public stopSlideShow(): void;
    /**
     * Used to get container element.
     * @return {HTMLDivElement} Container element
     */
    public getElement(): HTMLDivElement;
}
