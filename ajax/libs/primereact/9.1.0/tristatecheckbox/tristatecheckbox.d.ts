/**
 *
 * TriStateCheckbox is used to select either "true", "false" or "null" as the value.
 *
 * [Live Demo](https://www.primereact.org/tristatecheckbox/)
 *
 * @module tristatecheckbox
 *
 */
import * as React from 'react';
import { TooltipOptions } from '../tooltip/tooltipoptions';
import { FormEvent } from '../ts-helpers';

/**
 * Custom change event.
 * @see {@link TriStateCheckboxProps.onChange}
 * @extends {FormEvent}
 * @event
 */
interface TriStateCheckboxChangeEvent extends FormEvent<boolean> {}

/**
 * Defines valid properties in TriStateCheckbox component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group Properties
 */
export interface TriStateCheckboxProps extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'onChange' | 'value' | 'ref'> {
    /**
     * Value of the TriStateCheckbox.
     */
    value?: boolean | undefined | null;
    /**
     * When present, it specifies that the element value cannot be altered.
     * @defaultValue false
     */
    disabled?: boolean | undefined;
    /**
     * When present, it specifies that the value cannot be changed.
     * @defaultValue false
     */
    readOnly?: boolean | undefined;
    /**
     * Content of the tooltip.
     */
    tooltip?: string | undefined;
    /**
     * Configuration of the tooltip, refer to the tooltip documentation for more information.
     */
    tooltipOptions?: TooltipOptions | undefined;
    /**
     * Callback to invoke on value change
     * @param {TriStateCheckboxChangeEvent} event - Browser event.
     */
    onChange?(event: TriStateCheckboxChangeEvent): void;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
}

/**
 * **PrimeReact - TriStateCheckbox**
 *
 * _TriStateCheckbox is used to select either "true", "false" or "null" as the value._
 *
 * [Live Demo](https://www.primereact.org/tristatecheckbox/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class TriStateCheckbox extends React.Component<TriStateCheckboxProps, any> {
    /**
     * Used to focus the component.
     */
    public focus(): void;
    /**
     * Used to get container element.
     * @return {HTMLDivElement} Container element
     */
    public getElement(): HTMLDivElement;
}
