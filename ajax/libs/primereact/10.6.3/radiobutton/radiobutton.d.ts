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
import { CheckboxPassThroughType } from '../checkbox/checkbox';
import { ComponentHooks } from '../componentbase/componentbase';
import { PassThroughOptions } from '../passthrough';
import { TooltipPassThroughOptions } from '../tooltip/tooltip';
import { TooltipOptions } from '../tooltip/tooltipoptions';
import { FormEvent } from '../ts-helpers';
import { PassThroughType } from '../utils/utils';

export declare type RadioButtonPassThroughType<T> = PassThroughType<T, RadioButtonPassThroughMethodOptions>;

/**
 * Custom passthrough(pt) option method.
 */
export interface RadioButtonPassThroughMethodOptions {
    props: RadioButtonProps;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link RadioButtonProps.pt}
 */
export interface RadioButtonPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: RadioButtonPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the icon's DOM element.
     */
    icon?: RadioButtonPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the input's DOM element.
     */
    input?: RadioButtonPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Used to pass attributes to the box's DOM element.
     */
    box?: CheckboxPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
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
export interface RadioButtonProps extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'onChange' | 'ref' | 'pt'> {
    /**
     * When present, it specifies that the component should automatically get focus on load.
     * @defaultValue false
     */
    autoFocus?: boolean | undefined;
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
     * Value of the radio.
     */
    value?: any | undefined;
    /**
     * Specifies whether a checkbox should be checked or not.
     * @defaultValue false
     */
    checked?: boolean | undefined;
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
     * Specifies the input variant of the component.
     * @defaultValue outlined
     */
    variant?: 'outlined' | 'filled' | undefined;
    /**
     * When present, it specifies that an input field is read-only.
     * @default false
     */
    readonly?: boolean | undefined;
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
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {RadioButtonPassThroughOptions}
     */
    pt?: RadioButtonPassThroughOptions;
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
