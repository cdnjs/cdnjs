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
     * Adds a download button to the preview control menu.
     * @default false
     */
    downloadable?: boolean | undefined;
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
     * Specifies the path to the image.
     */
    src?: string | undefined;
    /**
     * Changing the default icon when the image is hovered in preview mode.
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
