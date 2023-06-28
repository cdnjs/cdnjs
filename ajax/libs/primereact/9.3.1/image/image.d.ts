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
import { IconType } from '../utils/utils';

/**
 * Defines valid properties in Image component. In addition to these, all properties of HTMLSpanElement can be used in this component.
 * @group Properties
 */
export interface ImageProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, 'ref'> {
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
     * Changing the default icon when the image is hovered in preview mode.
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
