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
import { KeyFilterType } from '../keyfilter';
import { TooltipOptions } from '../tooltip/tooltipoptions';

/**
 * Defines valid properties in InputTextarea component. In addition to these, all properties of HTMLTextAreaElement can be used in this component.
 * @group Properties
 */
export interface InputTextareaProps extends Omit<React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>, 'ref' | 'value'> {
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
