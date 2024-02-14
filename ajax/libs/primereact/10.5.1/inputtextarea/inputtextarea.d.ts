/**
 *
 * Inputtextarea add styling and autoResize functionality to standard textarea element.
 *
 * [Live Demo](https://www.primereact.org/inputtextarea/)
 *
 * @module inputtextarea
 *
 */
import * as React from 'react';
import { ComponentHooks } from '../componentbase/componentbase';
import { KeyFilterType } from '../keyfilter';
import { PassThroughOptions } from '../passthrough';
import { TooltipPassThroughOptions } from '../tooltip/tooltip';
import { TooltipOptions } from '../tooltip/tooltipoptions';
import { PassThroughType } from '../utils/utils';

export declare type InputTextareaPassThroughType<T> = PassThroughType<T, InputTextareaPassThroughMethodOptions>;

/**
 * Custom passthrough(pt) option method.
 */
export interface InputTextareaPassThroughMethodOptions {
    props: InputTextareaProps;
    context: InputTextareaContext;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link InputTextareaProps.pt}
 */
export interface InputTextareaPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: InputTextareaPassThroughType<React.HTMLAttributes<HTMLTextAreaElement>>;
    /**
     * Uses to pass attributes tooltip's DOM element.
     * @type {TooltipPassThroughOptions}
     */
    tooltip?: TooltipPassThroughOptions;
    /**
     * Used to manage all lifecycle hooks
     * @see {@link ComponentHooks}
     */
    hooks?: ComponentHooks;
}

/**
 * Defines current options in Textarea component.
 */
export interface InputTextareaContext {
    /**
     * Current disabled state of the component as a boolean.
     * @defaultValue false
     */
    disabled: boolean;
}

/**
 * Defines valid properties in InputTextarea component. In addition to these, all properties of HTMLTextAreaElement can be used in this component.
 * @group Properties
 */
export interface InputTextareaProps extends Omit<React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>, 'ref' | 'value' | 'pt'> {
    /**
     * When present, height of textarea changes as being typed.
     * @defaultValue false
     */
    autoResize?: boolean | undefined;
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
     * The value of component
     */
    value?: string | undefined;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {InputTextareaPassThroughOptions}
     */
    pt?: InputTextareaPassThroughOptions;
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
 * **PrimeReact - InputTextarea**
 *
 * _Inputtextarea add styling and autoResize functionality to standard textarea element._
 *
 * [Live Demo](https://www.primereact.org/inputtextarea/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare const InputTextarea: React.ForwardRefExoticComponent<InputTextareaProps & React.RefAttributes<HTMLTextAreaElement>>;
