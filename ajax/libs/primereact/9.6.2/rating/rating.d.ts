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
import { TooltipPassThroughOptions } from '../tooltip/tooltip';
import { TooltipOptions } from '../tooltip/tooltipoptions';
import { FormEvent } from '../ts-helpers';
import { IconType, PassThroughType } from '../utils';

export declare type RatingPassThroughType<T> = PassThroughType<T, RatingPassThroughMethodOptions>;

/**
 * Custom passthrough(pt) option method.
 */
export interface RatingPassThroughMethodOptions {
    props: RatingProps;
    context: RatingContext;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link RatingProps.pt}
 */
export interface RatingPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: RatingPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the cancel icon's DOM element.
     */
    cancelIcon?: RatingPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the item's DOM element.
     */
    item?: RatingPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the cancel item's DOM element.
     */
    cancelItem?: RatingPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the on icon's DOM element.
     */
    onIcon?: RatingPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the off icon's DOM element.
     */
    offIcon?: RatingPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes tooltip's DOM element.
     * @type {TooltipPassThroughOptions}
     */
    tooltip?: TooltipPassThroughOptions;
}

/**
 * Defines current options in Rating component.
 */
export interface RatingContext {
    /**
     * Current active state of the item as a boolean.
     * @defaultValue false
     */
    active: boolean;
}

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
     * Icon for the on state.
     */
    onIcon?: IconType<RatingProps> | undefined;
    /**
     * Icon for the off state.
     */
    offIcon?: IconType<RatingProps> | undefined;
    /**
     * Icon for the cancelable state.
     */
    cancelIcon?: IconType<RatingProps> | undefined;
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
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {RatingPassThroughOptions}
     */
    pt?: RatingPassThroughOptions;
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
