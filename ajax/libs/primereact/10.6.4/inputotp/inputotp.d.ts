/**
 *
 * InputOtp is an extension to standard input element with theming and keyfiltering.
 *
 * [Live Demo](https://www.primereact.org/inputotp/)
 *
 * @module inputotp
 *
 */
import * as React from 'react';
import { ComponentHooks } from '../componentbase/componentbase';
import { KeyFilterType } from '../keyfilter';
import { PassThroughOptions } from '../passthrough';
import { TooltipPassThroughOptions } from '../tooltip/tooltip';
import { TooltipOptions } from '../tooltip/tooltipoptions';
import { PassThroughType, TemplateType } from '../utils/utils';

export declare type InputOtpPassThroughType<T> = PassThroughType<T, InputOtpPassThroughMethodOptions>;

/**
 * Custom passthrough(pt) option method.
 */
export interface InputOtpPassThroughMethodOptions {
    props: InputOtpProps;
    context: InputOtpContext;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link InputOtpProps.pt}
 */
export interface InputOtpPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: InputOtpPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the Tooltip component.
     * @see {@link TooltipPassThroughOptions}
     */
    input?: InputOtpPassThroughType<React.HTMLAttributes<HTMLInputElement>>;
    /**
     * Used to manage all lifecycle hooks
     * @see {@link ComponentHooks}
     */
    hooks?: ComponentHooks;
}

/**
 * Defines current options in InputOtp component.
 */
export interface InputOtpContext {
    /**
     * Current disabled state of the component as a boolean.
     * @defaultValue false
     */
    disabled: boolean;
}

/**
 * Custom change event
 * @see {@link InputOtpProps.onChange}
 * @event
 */
interface InputOtpChangeEvent {
    /**
     * Browser event
     */
    originalEvent: React.SyntheticEvent;
    /**
     * New value
     */
    value?: string | number | null;
}

/**
 * Defines valid properties in InputOtp component. In addition to these, all properties of HTMLInputElement can be used in this component.
 * @group Properties
 */
export interface InputOtpProps extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'onInput' | 'ref' | 'value' | 'size' | 'onChange'> {
    /**
     * Specifies the value of the component.
     * @defaultValue null
     */
    value?: string | number | null;
    /**
     * When present, it specifies that the component should have invalid state style.
     * @defaultValue false
     */
    invalid?: boolean | undefined;
    /**
     * When present, it specifies that the component should be disabled.
     * @defaultValue false
     */
    disabled?: boolean | undefined;
    /**
     * When present, it specifies that an input field is read-only.
     * @defaultValue false
     */
    readonly?: boolean | undefined;
    /**
     * Specifies the input variant of the component.
     * @defaultValue outlined
     */
    variant?: 'outlined' | 'filled' | undefined;
    /**
     * Index of the element in tabbing order.
     */
    tabindex?: number | undefined;
    /**
     * Number of characters to initiate.
     * @defaultValue 4
     */
    length?: number | undefined;
    /**
     * Mask pattern.
     * @defaultValue false
     */
    mask?: boolean | undefined;
    /**
     * When present, it specifies that an input field is integer-only.
     * @defaultValue false
     */
    integerOnly?: boolean | undefined;
    /**
     * Template of an item.
     */
    inputTemplate?: TemplateType<InputOtpProps> | undefined;
    /**
     * Callback to invoke while typing value on input
     * @param {React.FormEvent<HTMLInputElement>} event - Browser event
     */
    onInput?(event: React.FormEvent<HTMLInputElement>): void;
    /**
     * Callback to invoke when autocomplete gets focus.
     * @param {React.FocusEvent<HTMLInputElement>} event - Browser event.
     */
    onFocus?(event: React.FocusEvent<HTMLInputElement>): void;
    /**
     * Callback to invoke when autocomplete loses focus.
     * @param {React.FocusEvent<HTMLInputElement>} event - Browser event.
     */
    onBlur?(event: React.FocusEvent<HTMLInputElement>): void;
    /**
     * Callback to invoke on value change.
     * @param {InputOtpChangeEvent} event - Custom change event
     */
    onChange?(event: InputOtpChangeEvent): void;
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {InputOtpPassThroughOptions}
     */
    pt?: InputOtpPassThroughOptions;
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
 * **PrimeReact - InputOtp**
 *
 * _InputOtp is an extension to standard input element with theming and keyfiltering._
 *
 * [Live Demo](https://www.primereact.org/inputotp/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare const InputOtp: React.ForwardRefExoticComponent<InputOtpProps & React.RefAttributes<HTMLInputElement>>;
