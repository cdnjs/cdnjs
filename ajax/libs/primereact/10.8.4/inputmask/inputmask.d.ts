/**
 *
 * InputMask component is used to enter input in a certain format such as numeric, date, currency, email and phone.
 *
 * [Live Demo](https://www.primereact.org/inputmask/)
 *
 * @module inputmask
 *
 */
import * as React from 'react';
import { InputText, InputTextPassThroughOptions, InputTextProps } from '../inputtext';
import { PassThroughOptions } from '../passthrough';
import { TooltipOptions } from '../tooltip/tooltipoptions';
import { FormEvent } from '../ts-helpers';

/**
 * Custom complete event
 * @see {@link InputMaskProps.onComplete}
 * @event
 */
interface InputMaskCompleteEvent {
    /**
     * Browser event
     */
    originalEvent: React.SyntheticEvent;
    /**
     * New value of the component
     */
    value: string | undefined | null;
}

/**
 * Custom change event.
 * @see {@link InputMaskProps.onChange}
 * @extends {FormEvent}
 * @event
 */
interface InputMaskChangeEvent extends FormEvent<string> {}

/**
 * Defines valid properties in InputMask component. In addition to these, all properties of {@link inputtext} can be used in this component.
 * @group Properties
 */
export interface InputMaskProps extends Omit<InputTextProps, 'onChange' | 'pt'> {
    /**
     * Mask pattern.
     */
    mask?: string | undefined;
    /**
     * Placeholder character in mask.
     * @defaultValue _
     */
    slotChar?: string | undefined;
    /**
     * Clears the incomplete value on blur.
     * @defaultValue true
     */
    autoClear?: boolean | undefined;
    /**
     * Defines if model sets the raw unmasked value to bound value or the formatted mask value.
     * @defaultValue false
     */
    unmask?: boolean | undefined;
    /**
     * When present, it specifies that the element value cannot be altered.
     * @defaultValue false
     */
    disabled?: boolean | undefined;
    /**
     * When present, it specifies that the component should have invalid state style.
     * @defaultValue false
     */
    invalid?: boolean | undefined;
    /**
     * Specifies the input variant of the component.
     * @defaultValue outlined
     */
    variant?: 'outlined' | 'filled' | undefined;
    /**
     * When present, it specifies that an input field is read-only.
     * @defaultValue false
     */
    readOnly?: boolean | undefined;
    /**
     * When present, it specifies that the element must be filled out before submitting the form.
     * @defaultValue false
     */
    required?: boolean | undefined;
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
     * Callback to invoke on when user completes the mask pattern.
     * @param {InputMaskCompleteEvent} event - Custom complete event
     */
    onComplete?(event: InputMaskCompleteEvent): void;
    /**
     * Callback to invoke on value change.
     * @param {InputMaskChangeEvent} event - Custom change event
     */
    onChange?(event: InputMaskChangeEvent): void;
    /**
     * Callback to invoke when input receives focus.
     * @param {React.FocusEvent<HTMLInputElement>} event - Browser event
     */
    onFocus?(event: React.FocusEvent<HTMLInputElement>): void;
    /**
     * Callback to invoke when input loses focus.
     * @param {React.FocusEvent<HTMLInputElement>} event - Browser event
     */
    onBlur?(event: React.FocusEvent<HTMLInputElement>): void;
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
 * **PrimeReact - InputMask**
 *
 * _InputMask component is used to enter input in a certain format such as numeric, date, currency, email and phone._
 *
 * [Live Demo](https://www.primereact.org/inputmask/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class InputMask extends React.Component<InputMaskProps, any> {
    /**
     * Used to focus the component.
     */
    public focus(): void;
    /**
     * Used to get container element.
     * @return {InputText} Container element
     */
    public getElement(): typeof InputText;
}
