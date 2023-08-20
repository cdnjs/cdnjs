/**
 *
 * Avatar represents people using icons, labels and images.
 *
 * [Live Demo](https://www.primereact.org/avatar)
 *
 * @module avatar
 *
 */
import * as React from 'react';
import { IconType, PassThroughType } from '../utils';

export declare type AvatarPassThroughType<T> = PassThroughType<T, AvatarPassThroughMethodOptions>;
/**
 * Custom passthrough(pt) option method.
 */
export interface AvatarPassThroughMethodOptions {
    props: AvatarProps;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link AvatarProps.pt}
 */
export interface AvatarPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: AvatarPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the label's DOM element.
     */
    label?: AvatarPassThroughType<React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the icon's DOM element.
     */
    icon?: AvatarPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the image's DOM element.
     */
    image?: AvatarPassThroughType<React.ImgHTMLAttributes<HTMLImageElement>>;
}

/**
 * Defines valid properties in Avatar component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group Properties
 */
export interface AvatarProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    /**
     * Defines the icon to display.
     */
    icon?: IconType<AvatarProps> | undefined;
    /**
     * Defines the image to display.
     */
    image?: string | undefined;
    /**
     * It specifies an alternate text for an image, if the image cannot be displayed.
     * @defaultValue avatar
     */
    imageAlt?: string | undefined;
    /**
     * Defines a fallback image or URL if the main image fails to load. If "default" will fallback to label then icon.
     * @defaultValue default
     */
    imageFallback?: 'default' | string | undefined;
    /**
     * Defines the text to display.
     */
    label?: string | undefined;
    /**
     * Shape of the element.
     * @defaultValue square
     */
    shape?: 'square' | 'circle' | undefined;
    /**
     * Size of the element.
     * @defaultValue normal
     */
    size?: 'normal' | 'large' | 'xlarge' | undefined;
    /**
     * Template of the content.
     */
    template?: React.ReactNode | ((props: AvatarProps) => React.ReactNode);
    /**
     * This event is triggered if an error occurs while loading an image file.
     * @param {React.SyntheticEvent}  event - Browser event.
     */
    onImageError?(event: React.SyntheticEvent): void;
    /**
     * Callback to invoke on click.
     * @param {React.MouseEvent<HTMLElement>} event - Browser event.
     */
    onClick?(event: React.MouseEvent<HTMLElement>): void;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {AvatarPassThroughOptions}
     */
    pt?: AvatarPassThroughOptions;
}

/**
 * **PrimeReact - Avatar**
 *
 * _Avatar represents people using icons, labels and images._
 *
 * [Live Demo](https://www.primereact.org/avatar/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class Avatar extends React.Component<AvatarProps, any> {
    /**
     * Used to get container element.
     * @return {HTMLDivElement} Container element
     */
    public getElement(): HTMLDivElement;
}
