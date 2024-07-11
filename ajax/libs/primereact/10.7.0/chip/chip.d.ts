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
import { ComponentHooks } from '../componentbase/componentbase';
import { PassThroughOptions } from '../passthrough';
import { IconType, PassThroughType, TemplateType } from '../utils';

export declare type ChipPassThroughType<T> = PassThroughType<T, ChipPassThroughMethodOptions>;

/**
 * Custom passthrough(pt) option method.
 */
export interface ChipPassThroughMethodOptions {
    props: ChipProps;
    state: ChipState;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link ChipProps.pt}
 */
export interface ChipPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: ChipPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the image's DOM element.
     */
    image?: ChipPassThroughType<React.ImgHTMLAttributes<HTMLImageElement>>;
    /**
     * Uses to pass attributes to the icon's DOM element.
     */
    icon?: ChipPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the label' DOM element.
     */
    label?: ChipPassThroughType<React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the removeIcon's DOM element.
     */
    removeIcon?: ChipPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Used to manage all lifecycle hooks
     * @see {@link ComponentHooks}
     */
    hooks?: ComponentHooks;
}

/**
 * Defines current inline state in Chip component.
 */
export interface ChipState {
    /**
     * Current visible state as a boolean.
     * @defaultValue true
     */
    visible: boolean;
}

/**
 * Custom remove event
 * @event
 */
interface ChipRemoveEvent {
    /**
     * Browser event
     */
    originalEvent: React.SyntheticEvent;
    /**
     * Removed item value
     */
    value: string;
}

/**
 * Defines valid properties in Chip component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group Properties
 */
export interface ChipProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    /**
     * Defines the text to display.
     */
    label?: string;
    /**
     * Defines the icon to display.
     */
    icon?: IconType<ChipProps> | undefined;
    /**
     * Defines the image to display.
     */
    image?: string | undefined;
    /**
     * Whether to display a remove icon.
     * @defaultValue false
     */
    removable?: boolean | undefined;
    /**
     * Icon of the remove element.
     */
    removeIcon?: IconType<ChipProps> | undefined;
    /**
     * Template of an item.
     */
    template?: TemplateType<ChipProps> | undefined;
    /**
     * It specifies an alternate text for an image, if the image cannot be displayed.
     */
    imageAlt?: string | undefined;
    /**
     * This event is triggered if an error occurs while loading an image file.
     * @param {React.SyntheticEvent}  event - Browser event.
     */
    onImageError?(event: React.SyntheticEvent): void;
    /**
     * Callback to invoke when a chip is removed.
     * * @param {ChipRemoveEvent} event - Custom remove event
     */
    onRemove?(event: ChipRemoveEvent): void;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {ChipPassThroughOptions}
     */
    pt?: ChipPassThroughOptions;
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
