/**
 *
 * Displays a single image with preview and tranformation options.
 *
 * [Live Demo](https://www.primereact.org/image/)
 *
 * @module image
 *
 */
import * as React from 'react';
import { CSSTransitionProps as ReactCSSTransitionProps } from 'react-transition-group/CSSTransition';
import { ComponentHooks } from '../componentbase/componentbase';
import { PassThroughOptions } from '../passthrough';
import { IconType, PassThroughType } from '../utils/utils';

export declare type ImagePassThroughType<T> = PassThroughType<T, ImagePassThroughMethodOptions>;
export declare type ImagePassThroughTransitionType = ReactCSSTransitionProps | ((options: ImagePassThroughMethodOptions) => ReactCSSTransitionProps) | undefined;

/**
 * Custom passthrough(pt) option method.
 */
export interface ImagePassThroughMethodOptions {
    props: ImageProps;
    state: ImageState;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link ImageProps.pt}
 */
export interface ImagePassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: ImagePassThroughType<React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the image's DOM element.
     */
    image?: ImagePassThroughType<React.ImgHTMLAttributes<HTMLImageElement>>;
    /**
     * Uses to pass attributes to the button's DOM element.
     */
    button?: ImagePassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the icon's DOM element.
     */
    icon?: ImagePassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement | SVGSVGElement>>;
    /**
     * Uses to pass attributes to the mask's DOM element.
     */
    mask?: ImagePassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the toolbar's DOM element.
     */
    toolbar?: ImagePassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the download button's DOM element.
     */
    downloadButton?: ImagePassThroughType<React.HTMLAttributes<HTMLButtonElement>>;
    /**
     * Uses to pass attributes to the download icon's DOM element.
     */
    downloadIcon?: ImagePassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement | SVGSVGElement>>;
    /**
     * Uses to pass attributes to the rotate right button's DOM element.
     */
    rotateRightButton?: ImagePassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the rotate right icon's DOM element.
     */
    rotateRightIcon?: ImagePassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement | SVGSVGElement>>;
    /**
     * Uses to pass attributes to the rotate left button's DOM element.
     */
    rotateLeftButton?: ImagePassThroughType<React.HTMLAttributes<HTMLButtonElement>>;
    /**
     * Uses to pass attributes to the rotate left icon's DOM element.
     */
    rotateLeftIcon?: ImagePassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement | SVGSVGElement>>;
    /**
     * Uses to pass attributes to the zoom out button's DOM element.
     */
    zoomOutButton?: ImagePassThroughType<React.HTMLAttributes<HTMLButtonElement>>;
    /**
     * Uses to pass attributes to the zoom out icon's DOM element.
     */
    zoomOutIcon?: ImagePassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement | SVGSVGElement>>;
    /**
     * Uses to pass attributes to the zoom in button's DOM element.
     */
    zoomInButton?: ImagePassThroughType<React.HTMLAttributes<HTMLButtonElement>>;
    /**
     * Uses to pass attributes to the zoom in icon's DOM element.
     */
    zoomInIcon?: ImagePassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement | SVGSVGElement>>;
    /**
     * Uses to pass attributes to the close button's DOM element.
     */
    closeButton?: ImagePassThroughType<React.HTMLAttributes<HTMLButtonElement>>;
    /**
     * Uses to pass attributes to the close icon's DOM element.
     */
    closeIcon?: ImagePassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement | SVGSVGElement>>;
    /**
     * Uses to pass attributes to the preview container's DOM element.
     */
    previewContainer?: ImagePassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the preview's DOM element.
     */
    preview?: ImagePassThroughType<React.ImgHTMLAttributes<HTMLImageElement>>;
    /**
     * Used to manage all lifecycle hooks
     * @see {@link ComponentHooks}
     */
    hooks?: ComponentHooks;
    /**
     * Used to control React Transition API.
     */
    transition?: ImagePassThroughTransitionType;
}

/**
 * Defines current inline state in Image component.
 */
export interface ImageState {
    /**
     * Mask visible state as a boolean.
     * @defaultValue false
     */
    maskVisible: boolean;
    /**
     * Preview visible state as a boolean.
     * @defaultValue false
     */
    previewVisible: boolean;
    /**
     * Rotate state as a number.
     * @defaultValue 0
     */
    rotate: number;
    /**
     * Scale state as a boolean.
     * @defaultValue 1
     */
    scale: number;
}
/**
 * Defines valid properties in Image component. In addition to these, all properties of HTMLSpanElement can be used in this component.
 * @group Properties
 */
export interface ImageProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, 'ref' | 'pt'> {
    /**
     * Specifies an alternate text for an area, if the image cannot be displayed.
     */
    alt?: string | undefined;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
    /**
     * Specifies if pressing escape key should hide the preview.
     * @defaultValue true
     */
    closeOnEscape?: boolean | undefined;
    /**
     * The crossorigin content attribute on media elements is a CORS settings attribute.
     */
    crossOrigin?: 'anonymous' | 'use-credentials' | '' | undefined;
    /**
     * Adds a download button to the preview control menu.
     * @default false
     */
    downloadable?: boolean | undefined;
    /**
     * Icon of the download button.
     */
    downloadIcon?: IconType<ImageProps> | undefined;
    /**
     * Specifies whether a browser should load an image immediately or to defer loading of off-screen images until for example the user scrolls near them.
     */
    loading?: 'eager' | 'lazy' | undefined;
    /**
     * Icon of the rotate right button.
     */
    rotateRightIcon?: IconType<ImageProps> | undefined;
    /**
     * Icon of the rotate left button.
     */
    rotateLeftIcon?: IconType<ImageProps> | undefined;
    /**
     *  HTTP header controls how much referrer information (sent with the Referer header) should be included with requests.
     */
    referrerPolicy?: React.HTMLAttributeReferrerPolicy | undefined;
    /**
     * Specifies an image as a client-side image map (an image map is an image with clickable areas)
     */
    useMap?: string | undefined;
    /**
     * Icon of the zoom out button.
     */
    zoomOutIcon?: IconType<ImageProps> | undefined;
    /**
     * Icon of the zoom in button.
     */
    zoomInIcon?: IconType<ImageProps> | undefined;
    /**
     * Icon of the close button.
     */
    closeIcon?: IconType<ImageProps> | undefined;
    /**
     * Height of the image element.
     */
    height?: string | undefined;
    /**
     * Style class of the image element.
     */
    imageClassName?: string | undefined;
    /**
     * Inline style of the image element.
     */
    imageStyle?: React.CSSProperties | undefined;
    /**
     * Controls the preview functionality.
     * @default false
     */
    preview?: boolean | undefined;
    /**
     * Changing the default icon when the image is hovered in preview mode.
     */
    indicatorIcon?: IconType<ImageProps> | undefined;
    /**
     * Specifies the path to the image.
     */
    src?: string | undefined;
    /**
     * Changing the default icon when the image is hovered in preview mode. Since v9, use `indicatorIcon` instead.
     * @deprecated Since v9, use `indicatorIcon` instead.
     */
    template?: any | undefined;
    /**
     * Width of the image element.
     */
    width?: string | undefined;
    /**
     * Zoomed image that may be different than "src" image.
     */
    zoomSrc?: string | undefined;
    /**
     * Triggered when the preview overlay is hidden.
     */
    onHide?(): void;
    /**
     * Triggered when the preview overlay is shown.
     */
    onShow?(): void;
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {ImagePassThroughOptions}
     */
    pt?: ImagePassThroughOptions;
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
 * **PrimeReact - Image**
 *
 * _Displays a single image with preview and tranformation options._
 *
 * [Live Demo](https://www.primereact.org/image/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class Image extends React.Component<ImageProps, any> {
    /**
     * Used to show the overlay.
     */
    public show(): void;
    /**
     * Used to hide the overlay.
     */
    public hide(): void;
    /**
     * Used to get container element.
     * @return {HTMLSpanElement} Container element
     */
    public getElement(): HTMLSpanElement;
    /**
     * Used to get image element
     * @return {HTMLImageElement} Image element
     */
    public getImage(): HTMLImageElement;
}
