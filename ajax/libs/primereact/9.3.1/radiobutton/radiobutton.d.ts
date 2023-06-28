/**
 *
 * RadioButton is an extension to standard radio button element with theming.
 *
 * [Live Demo](https://www.primereact.org/radiobutton/)
 *
 * @module radiobutton
 *
 */
import * as React from 'react';
import { TooltipOptions } from '../tooltip/tooltipoptions';
import { FormEvent } from '../ts-helpers';

/**
 * Custom change event.
 * @see {@link RadioButtonProps.onChange}
 * @extends {FormEvent}
 * @event
 */
interface RadioButtonChangeEvent extends FormEvent {}

/**
 * Defines valid properties in RadioButton component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group Properties
 */
export interface RadioButtonProps extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'onChange' | 'ref'> {
    /**
     * Reference of the input element.
     */
    inputRef?: React.Ref<HTMLInputElement> | undefined;
    /**
     * Unique identifier of the inner native radiobutton.
     */
    inputId?: string | undefined;
    /**
     * Name of the checkbox element.
     */
    name?: string | undefined;
    /**
     * Value of the checkbox.
     */
    value?: any | undefined;
    /**
     * Specifies whether a checkbox should be checked or not.
     * @defaultValue false
     */
    checked?: boolean | undefined;
    /**
     * When present, it specifies that the element value cannot be altered.
     * @defaultValue false
     */
    disabled?: boolean | undefined;
    /**
     * When present, it specifies that an input field must be filled out before submitting the form.
     * @defaultValue false
     */
    required?: boolean | undefined;
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
     * @param {RadioButtonChangeEvent} event - Custom change event.
     */
    onChange?(event: RadioButtonChangeEvent): void;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
}

/**
 * **PrimeReact - RadioButton**
 *
 * _RadioButton is an extension to standard radio button element with theming._
 *
 * [Live Demo](https://www.primereact.org/radiobutton/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class RadioButton extends React.Component<RadioButtonProps, any> {
    /**
     * Used to focus the component.
     */
    public focus(): void;
    /**
     * Used to select a button
     * @param {React.SyntheticEvent} event - Browser event
     */
    public select(event?: React.SyntheticEvent): void;
    /**
     * Used to get container element.
     * @return {HTMLDivElement} Container element
     */
    public getElement(): HTMLDivElement;
    /**
     * Used to get input element.
     * @return {HTMLInputElement} Input element
     */
    public getInput(): HTMLInputElement;
}
