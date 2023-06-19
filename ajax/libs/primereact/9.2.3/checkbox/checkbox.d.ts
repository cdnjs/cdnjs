/**
 *
 * Checkbox is an extension to standard checkbox element with skinning capabilities.
 *
 * [Live Demo](https://www.primereact.org/checkbox/)
 *
 * @module checkbox
 *
 */
import * as React from 'react';
import { TooltipOptions } from '../tooltip/tooltipoptions';
import { FormEvent } from '../ts-helpers';
import { IconType } from '../utils';

/**
 * Custom change event.
 * @see {@link CheckboxProps.onChange}
 * @extends {FormEvent}
 * @event
 */
interface CheckboxChangeEvent extends FormEvent {}

/**
 * Defines valid properties in Checkbox component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group Properties
 */
export interface CheckboxProps extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'onChange' | 'ref'> {
    /**
     * Unique identifier of the element.
     */
    id?: string | undefined;
    /**
     * Reference of the input element.
     */
    inputRef?: React.Ref<HTMLInputElement> | undefined;
    /**
     * Identifier of the input element.
     */
    inputId?: string | undefined;
    /**
     * Value of the component.
     */
    value?: any;
    /**
     * Name of the checkbox element .
     */
    name?: string | undefined;
    /**
     * Specifies whether a checkbox should be checked or not.
     * @defaultValue false
     */
    checked: boolean;
    /**
     * Value in checked state.
     * @defaultValue true
     */
    trueValue?: any;
    /**
     * Value in unchecked state.
     * @defaultValue false
     */
    falseValue?: any;
    /**
     * Inline style of the element.
     */
    style?: React.CSSProperties | undefined;
    /**
     * Style class of the element.
     */
    className?: string | undefined;
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
     * When present, it specifies that the value cannot be changed.
     * @defaultValue false
     */
    readOnly?: boolean | undefined;
    /**
     * Index of the element in tabbing order.
     * @defaultValue false
     */
    tabIndex?: number | undefined;
    /**
     * Icon class of the checkbox icon.
     * @defaultValue pi pi-check
     */
    icon?: IconType<CheckboxProps> | undefined;
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
     * Callback to invoke on value change
     * @param {CheckboxChangeEvent} event - Custom change event
     */
    onChange?(event: CheckboxChangeEvent): void;
    /**
     * Callback to invoke to when a mouse button is pressed.
     * @param {React.MouseEvent<HTMLElement>} event - Browser event
     */
    onMouseDown?(event: React.MouseEvent<HTMLElement>): void;
    /**
     * Callback to invoke on right-click.
     * @param {React.MouseEvent<HTMLElement>} event - Browser event
     */
    onContextMenu?(event: React.MouseEvent<HTMLElement>): void;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
}

/**
 * **PrimeReact - Checkbox**
 *
 * _Checkbox is an extension to standard checkbox element with skinning capabilities._
 *
 * [Live Demo](https://www.primereact.org/checkbox/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class Checkbox extends React.Component<CheckboxProps, any> {
    /**
     * Used to focus the component.
     */
    public focus(): void;
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
