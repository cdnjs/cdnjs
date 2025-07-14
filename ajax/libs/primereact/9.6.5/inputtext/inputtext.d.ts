/**
 *
 * InputText is an extension to standard input element with theming and keyfiltering.
 *
 * [Live Demo](https://www.primereact.org/inputtext/)
 *
 * @module inputtext
 *
 */
import * as React from 'react';
import { KeyFilterType } from '../keyfilter';
import { TooltipOptions } from '../tooltip/tooltipoptions';
import { PassThroughType } from '../utils/utils';
import { TooltipPassThroughOptions } from '../tooltip/tooltip';

export declare type InputTextPassThroughType<T> = PassThroughType<T, InputTextPassThroughMethodOptions>;

/**
 * Custom passthrough(pt) option method.
 */
export interface InputTextPassThroughMethodOptions {
    props: InputTextProps;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link InputTextProps.pt}
 */
export interface InputTextPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: InputTextPassThroughType<React.HTMLAttributes<HTMLInputElement>>;
    /**
     * Uses to pass attributes to the Tooltip component.
     * @see {@link TooltipPassThroughOptions}
     */
    tooltip?: TooltipPassThroughOptions;
}

/**
 * Defines valid properties in InputText component. In addition to these, all properties of HTMLInputElement can be used in this component.
 * @group Properties
 */
export interface InputTextProps extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'onInput' | 'ref' | 'value'> {
    /**
     * Format definition of the keys to block.
     */
    keyfilter?: KeyFilterType;
    /**
     * Content of the tooltip.
     */
    tooltip?: string | undefined;
    /**
     * Configuration of the tooltip, refer to the tooltip documentation for more information.
     * @type {TooltipOptions}
     */
    tooltipOptions?: TooltipOptions | undefined;
    /**
     * When enabled, instead of blocking keys, input is validated internally to test against the regular expression.
     * @defaultValue false
     */
    validateOnly?: boolean | undefined;
    /**
     * The value of component
     */
    value?: string | undefined;
    /**
     * Callback to invoke while typing value on input
     * @param {React.FormEvent<HTMLInputElement>} event - Browser event
     * @param {boolean} validatePattern - Whether to validate the value
     */
    onInput?(event: React.FormEvent<HTMLInputElement>, validatePattern: boolean): void;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {InputTextPassThroughOptions}
     */
    pt?: InputTextPassThroughOptions;
}

/**
 * **PrimeReact - InputText**
 *
 * _InputText is an extension to standard input element with theming and keyfiltering._
 *
 * [Live Demo](https://www.primereact.org/inputtext/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare const InputText: React.ForwardRefExoticComponent<InputTextProps & React.RefAttributes<HTMLInputElement>>;
