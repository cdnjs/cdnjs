/**
 *
 * Rating component is a star based selection input.
 *
 * [Live Demo](https://www.primereact.org/rating/)
 *
 * @module rating
 *
 */
import * as React from 'react';
import { TooltipOptions } from '../tooltip/tooltipoptions';
import { FormEvent } from '../ts-helpers';
import { IconType } from '../utils';

/**
 * Custom change event.
 * @see {@link RatingProps.onChange}
 * @extends {FormEvent}
 * @event
 */
interface RatingChangeEvent extends FormEvent<number> {}

/**
 * Defines valid properties in Rating component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group Properties
 */
export interface RatingProps extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'onChange' | 'ref'> {
    /**
     * Value of the rating.
     */
    value?: number | undefined;
    /**
     * When present, it specifies that the element should be disabled.
     * @defaultValue false
     */
    disabled?: boolean | undefined;
    /**
     * When present, it specifies that the input cannot be typed.
     * @defaultValue false
     */
    readOnly?: boolean | undefined;
    /**
     * Number of stars.
     * @defaultValue 5
     */
    stars?: number | undefined;
    /**
     * When specified a cancel icon is displayed to allow removing the value.
     * @defaultValue true
     */
    cancel?: boolean | undefined;
    /**
     * Content of the tooltip.
     */
    tooltip?: string | undefined;
    /**
     * Configuration of the tooltip, refer to the tooltip documentation for more information.
     */
    tooltipOptions?: TooltipOptions | undefined;
    /**
     * Callback to invoke on value change.
     * @param {RatingChangeEvent} event - Custom change event.
     */
    onChange?(event: RatingChangeEvent): void;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
    /**
     * ClassName of the on icon component.
     * @defaultValue pi pi-star-fill
     */
    onIcon?: IconType<RatingProps> | undefined;
    /**
     * ClassName of the off icon component.
     * @defaultValue pi pi-star
     */
    offIcon?: IconType<RatingProps>;
    /**
     * ClassName of the cancel icon component.
     * @defaultValue pi pi-ban
     */
    cancelIcon?: IconType<RatingProps>;
    /**
     * Properties of the cancel icon.
     */
    cancelIconProps?: React.HTMLAttributes<HTMLSpanElement>;
    /**
     * Properties of the on icon.
     */
    onIconProps?: React.HTMLAttributes<HTMLSpanElement>;
    /**
     * Properties of the off icon.
     */
    offIconProps?: React.HTMLAttributes<HTMLSpanElement>;
}

/**
 * **PrimeReact - Rating**
 *
 * _Rating component is a star based selection input._
 *
 * [Live Demo](https://www.primereact.org/rating/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class Rating extends React.Component<RatingProps, any> {
    /**
     * Used to get container element.
     * @return {HTMLDivElement} Container element
     */
    public getElement(): HTMLDivElement;
}
