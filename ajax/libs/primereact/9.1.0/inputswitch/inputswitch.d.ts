/**
 *
 * InputSwitch is used to select a boolean value.
 *
 * [Live Demo](https://www.primereact.org/inputswitch/)
 *
 * @module inputswitch
 *
 */
import * as React from 'react';
import { TooltipOptions } from '../tooltip/tooltipoptions';
import { FormEvent } from '../ts-helpers';

/**
 * Custom change event.
 * @see {@link InputSwitchProps.onChange}
 * @extends {FormEvent}
 * @event
 */
interface InputSwitchChangeEvent extends FormEvent<boolean> {}

/**
 * Defines valid properties in InputMask component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group Properties
 */
export interface InputSwitchProps extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'onChange' | 'ref'> {
    /**
     * Unique identifier of the element.
     */
    id?: string | undefined;
    /**
     * Reference of the input element.
     */
    inputRef?: React.Ref<HTMLInputElement> | undefined;
    /**
     * Inline style of the element.
     */
    style?: React.CSSProperties | undefined;
    /**
     * Style class of the element.
     */
    className?: string | undefined;
    /**
     * Identifier of the input element.
     */
    inputId?: string | undefined;
    /**
     * Name of the input element.
     */
    name?: string | undefined;
    /**
     * Index of the element in tabbing order.
     */
    tabIndex?: number | undefined;
    /**
     * Specifies whether a inputswitch should be checked or not.
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
     * When present, it specifies that the component should be disabled.
     * @defaultValue false
     */
    disabled?: boolean | undefined;
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
     * Callback to invoke on value change.
     * @param {InputSwitchChangeEvent} event - Custom change event
     */
    onChange?(event: InputSwitchChangeEvent): void;
    /**
     * Callback to invoke when the element receives focus.
     * @param {React.FocusEvent<HTMLInputElement>} event - Browser event
     */
    onFocus?(event: React.FocusEvent<HTMLInputElement>): void;
    /**
     * Callback to invoke when the element loses focus.
     * @param {React.FocusEvent<HTMLInputElement>} event - Browser event
     */
    onBlur?(event: React.FocusEvent<HTMLInputElement>): void;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
}

/**
 * **PrimeReact - InputSwitch**
 *
 * _InputSwitch is used to select a boolean value._
 *
 * [Live Demo](https://www.primereact.org/inputswitch/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class InputSwitch extends React.Component<InputSwitchProps, any> {
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
