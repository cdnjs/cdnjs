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
import { CheckboxPassThroughType } from '../checkbox/checkbox';
import { ComponentHooks } from '../componentbase/componentbase';
import { PassThroughOptions } from '../passthrough';
import { TooltipPassThroughOptions } from '../tooltip/tooltip';
import { TooltipOptions } from '../tooltip/tooltipoptions';
import { IconType, PassThroughType } from '../utils';

export declare type ToggleButtonPassThroughType<T> = PassThroughType<T, ToggleButtonPassThroughMethodOptions>;

/**
 * Custom passthrough(pt) option method.
 */
export interface ToggleButtonPassThroughMethodOptions {
    props: ToggleButtonProps;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link ToggleButtonProps.pt}
 */
export interface ToggleButtonPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: ToggleButtonPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the icon's DOM element.
     */
    icon?: ToggleButtonPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the label's DOM element.
     */
    label?: ToggleButtonPassThroughType<React.HTMLAttributes<HTMLSpanElement>>;
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
    /**
     * Uses to pass attributes to the input's DOM element.
     */
    input?: ToggleButtonPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Used to pass attributes to the box's DOM element.
     */
    box?: CheckboxPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
}
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
export interface ToggleButtonProps extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'onChange' | 'ref' | 'pt'> {
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
     * When present, it specifies that the component should have invalid state style.
     * @defaultValue false
     */
    invalid?: boolean | undefined;
    /**
     * When present, it specifies that the element should be disabled.
     * @defaultValue false
     */
    disabled?: boolean | undefined;
    /**
     * When present, it specifies that an input field is read-only.
     * @default false
     */
    readonly?: boolean | undefined;
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
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {ToggleButtonPassThroughOptions}
     */
    pt?: ToggleButtonPassThroughOptions;
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
