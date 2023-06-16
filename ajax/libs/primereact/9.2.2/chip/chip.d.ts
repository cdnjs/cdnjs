/**
 *
 * Chip represents people using icons, labels and images.
 *
 * [Live Demo](https://www.primereact.org/chip)
 *
 * @module chip
 *
 */
import * as React from 'react';
import { IconType, TemplateType } from '../utils';

/**
 * Defines valid properties in Chip component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group Properties
 */
export interface ChipProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    /**
     * Defines the text to display.
     *
     */
    label?: string;
    /**
     * Defines the icon to display.
     *
     */
    icon?: IconType<ChipProps> | undefined;
    /**
     * Defines the image to display.
     *
     */
    image?: string | undefined;
    /**
     * Whether to display a remove icon.
     * @defaultValue false
     */
    removable?: boolean | undefined;
    /**
     * Icon of the remove element.
     * @defaultValue pi pi-times-circle
     */
    removeIcon?: string | undefined;
    /**
     * Template of an item.
     *
     */
    template?: TemplateType<ChipProps> | undefined;
    /**
     * It specifies an alternate text for an image, if the image cannot be displayed.
     *
     */
    imageAlt?: string | undefined;
    /**
     * This event is triggered if an error occurs while loading an image file.
     * @param {React.SyntheticEvent}  event - Browser event.
     */
    onImageError?(event: React.SyntheticEvent): void;
    /**
     * Callback to invoke when a chip is removed.
     * @param {React.MouseEvent}  event - Browser event.
     */
    onRemove?(event: React.MouseEvent<HTMLElement>): void;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
}

/**
 * **PrimeReact - Chip**
 *
 * _Chip represents people using icons, labels and images._
 *
 * [Live Demo](https://www.primereact.org/chip/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class Chip extends React.Component<ChipProps, any> {
    /**
     * Used to get container element.
     * @return {HTMLDivElement} Container element
     */
    public getElement(): HTMLDivElement;
}
