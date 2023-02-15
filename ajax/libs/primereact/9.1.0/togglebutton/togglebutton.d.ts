/**
 *
 * ToggleButton is used to select a boolean value using a button.
 *
 * [Live Demo](https://www.primereact.org/togglebutton/)
 *
 * @module togglebutton
 *
 */
import * as React from 'react';
import { TooltipOptions } from '../tooltip/tooltipoptions';
import { IconType } from '../utils';

/**
 * Custom toggle button change target options
 */
interface ToggleButtonChangeTargetOptions {
    /**
     * The name of the element.
     */
    name: string;
    /**
     * Unique identifier of the element.
     */
    id: string;
    /**
     * Collapsed state as a boolean.
     */
    value: boolean;
}

/**
 * Custom change event.
 * @see {@link ToggleButtonProps.onChange}
 * @event
 */
interface ToggleButtonChangeEvent {
    /**
     * Browser event
     */
    originalEvent: React.SyntheticEvent;
    /**
     * Value as the checked state.
     */
    value: boolean;
    /**
     * Stops the event from propagating.
     */
    stopPropagation(): void;
    /**
     * Prevents the default action of the event.
     */
    preventDefault(): void;
    /**
     * Target element.
     */
    target: ToggleButtonChangeTargetOptions;
}

/**
 * Defines valid properties in ToggleButton component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group Properties
 */
export interface ToggleButtonProps extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'onChange' | 'ref'> {
    /**
     * Specifies the on/off state of the button.
     * @defaultValue false
     */
    checked?: boolean | undefined;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
    /**
     * Position of the icon, valid values are "left" and "right".
     * @defaultValue left
     */
    iconPos?: 'left' | 'right' | undefined;
    /**
     * Icon for the off state.
     */
    offIcon?: IconType<ToggleButtonProps> | undefined;
    /**
     * Label for the off state.
     * @defaultValue no
     */
    offLabel?: string | undefined;
    /**
     * Icon for the on state.
     */
    onIcon?: IconType<ToggleButtonProps> | undefined;
    /**
     * Label for the on state.
     * @defaultValue yes
     */
    onLabel?: string | undefined;
    /**
     * Content of the tooltip.
     */
    tooltip?: string | undefined;
    /**
     * Configuration of the tooltip, refer to the tooltip documentation for more information.
     */
    tooltipOptions?: TooltipOptions | undefined;
    /**
     * Callback to invoke when autocomplete loses focus.
     * @param {React.FocusEvent<HTMLElement>} event - Browser event.
     */
    onBlur?(event: React.FocusEvent<HTMLElement>): void;
    /**
     * Callback to invoke on value change.
     * @param {ToggleButtonChangeEvent} event - Browser event.
     */
    onChange?(event: ToggleButtonChangeEvent): void;
    /**
     * Callback to invoke when autocomplete gets focus.
     * @param {React.FocusEvent<HTMLElement>} event - Browser event.
     */
    onFocus?(event: React.FocusEvent<HTMLElement>): void;
}

/**
 * **PrimeReact - ToggleButton**
 *
 * _ToggleButton is used to select a boolean value using a button._
 *
 * [Live Demo](https://www.primereact.org/togglebutton/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class ToggleButton extends React.Component<ToggleButtonProps, any> {
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
