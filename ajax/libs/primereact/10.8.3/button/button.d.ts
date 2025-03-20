/**
 *
 * Button is an extension to standard button element with icons and theming.
 *
 * [Live Demo](https://www.primereact.org/button/)
 *
 * @module button
 *
 */
import * as React from 'react';
import { ComponentHooks } from '../componentbase/componentbase';
import { PassThroughOptions } from '../passthrough';
import { TooltipPassThroughOptions } from '../tooltip/tooltip';
import { TooltipOptions } from '../tooltip/tooltipoptions';
import { IconType, PassThroughType } from '../utils';

export declare type ButtonPassThroughType<T> = PassThroughType<T, ButtonPassThroughMethodOptions>;

/**
 * Custom passthrough(pt) option method.
 */
export interface ButtonPassThroughMethodOptions {
    props: ButtonProps;
    context: ButtonContext;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link ButtonProps.pt}
 */
export interface ButtonPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: ButtonPassThroughType<React.HTMLAttributes<HTMLButtonElement>>;
    /**
     * Uses to pass attributes to the loading icon's DOM element.
     */
    loadingIcon?: ButtonPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement | SVGSVGElement>>;
    /**
     * Uses to pass attributes to the icon's DOM element.
     */
    icon?: ButtonPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement | SVGSVGElement>>;
    /**
     * Uses to pass attributes to the label's DOM element.
     */
    label?: ButtonPassThroughType<React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the badge's DOM element.
     */
    badge?: ButtonPassThroughType<React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the Tooltip component.
     * @see {@link TooltipPassThroughOptions}
     */
    tooltip?: TooltipPassThroughOptions;
    /**
     * Used to manage all lifecycle hooks
     * @see {@link ComponentHooks}
     */
    hooks?: ComponentHooks;
}

/**
 * Defines current options in Button component.
 */
export interface ButtonContext {
    /**
     * Current disabled state of the element as a boolean.
     * @defaultValue false
     */
    disabled: boolean;
}

/**
 * Defines valid properties in Button component. In addition to these, all properties of HTMLButtonElement can be used in this component.
 * @group Properties
 */
export interface ButtonProps extends Omit<React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, 'disabled' | 'ref'> {
    /**
     * Value of the badge.
     */
    badge?: string | undefined;
    /**
     * Style class of the badge.
     */
    badgeClassName?: string | undefined;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
    /**
     * When present, it specifies that the element should be disabled.
     * @defaultValue false
     */
    disabled?: boolean | undefined;
    /**
     * Name of the icon or JSX.Element for icon.
     */
    icon?: IconType<ButtonProps> | undefined;
    /**
     * Add a textual class to the button without a background initially.
     * @defaultValue false
     */
    text?: boolean | undefined;
    /**
     * Add a circular border radius to the button.
     * @defaultValue false
     */
    rounded?: boolean | undefined;
    /**
     * Add a shadow to indicate elevation.
     * @defaultValue false
     */
    raised?: boolean | undefined;
    /**
     * Add a border class without a background initially.
     * @defaultValue false
     */
    outlined?: boolean | undefined;
    /**
     * Add a link style to the button.
     * @defaultValue false
     */
    link?: boolean | undefined;
    /**
     * Defines the style of the button, valid values are "secondary", "success", "info", "warning", "danger", "help", "contrast".
     */
    severity?: 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'help' | 'contrast' | undefined;
    /**
     * Defines the size of the button, valid values are "small" and "large".
     */
    size?: 'small' | 'large' | undefined;
    /**
     * Position of the icon, valid values are "left", "right", "top" and "bottom".
     * @defaultValue left
     */
    iconPos?: 'top' | 'bottom' | 'left' | 'right' | undefined;
    /**
     * Text of the button.
     */
    label?: string | undefined;
    /**
     * Display loading icon of the button
     * @defaultValue false
     */
    loading?: boolean | undefined;
    /**
     * Name of the loading icon or JSX.Element for loading icon.
     */
    loadingIcon?: IconType<ButtonProps> | undefined;
    /**
     * Add a plain textual class to the button without a background initially.
     * @defaultValue false
     */
    plain?: boolean | undefined;
    /**
     * Content of the tooltip.
     */
    tooltip?: string | undefined;
    /**
     * Configuration of the tooltip, refer to the tooltip documentation for more information.
     */
    tooltipOptions?: TooltipOptions | undefined;
    /**
     * When present, it specifies that the element should be visible.
     * @defaultValue true
     */
    visible?: boolean | undefined;
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {ButtonPassThroughOptions}
     */
    pt?: ButtonPassThroughOptions;
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
 * **PrimeReact - Button**
 *
 * _Button is an extension to standard button element with icons and theming._
 *
 * [Live Demo](https://www.primereact.org/button/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class Button extends React.Component<ButtonProps, any> {}
