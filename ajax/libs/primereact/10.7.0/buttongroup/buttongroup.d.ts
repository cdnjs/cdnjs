/**
 *
 * A set of Buttons can be displayed together using the ButtonGroup component.
 *
 * [Live Demo](https://www.primereact.org/button/)
 *
 * @module buttongroup
 *
 */
import * as React from 'react';
import { ComponentHooks } from '../componentbase/componentbase';
import { PassThroughOptions } from '../passthrough';

export declare type ButtonGroupPassThroughOptionType = ButtonGroupPassThroughAttributes | ((options: ButtonGroupPassThroughMethodOptions) => ButtonGroupPassThroughAttributes | string) | string | null | undefined;

/**
 * Custom passthrough(pt) option method.
 */
export interface ButtonGroupPassThroughMethodOptions {
    /**
     * Defines valid properties.
     */
    props: ButtonGroupProps;
    /**
     * Defines passthrough(pt) options in global config.
     */
    global: object | undefined;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link ButtonGroupProps.pt}
 */
export interface ButtonGroupPassThroughOptions {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: ButtonGroupPassThroughOptionType;
    /**
     * Used to manage all lifecycle hooks.
     * @see {@link ComponentHooks}
     */
    hooks?: ComponentHooks;
}

/**
 * Custom passthrough attributes for each DOM elements
 */
export interface ButtonGroupPassThroughAttributes {
    [key: string]: any;
}

/**
 * Defines valid properties in ButtonGroup component.
 */
export interface ButtonGroupProps {
    /**
     * Used to pass attributes to DOM elements inside the component.
     * @type {ButtonGroupPassThroughOptions}
     */
    pt?: ButtonGroupPassThroughOptions;
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
 * **PrimeReact - ButtonGroup**
 *
 * _ButtonGroup appears on top of the input field when focused._
 *
 * [Live Demo](https://www.primereact.org/button/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 *
 */
export declare const ButtonGroup: React.ForwardRefExoticComponent<React.PropsWithChildren<ButtonGroupProps> & React.RefAttributes<HTMLDivElement>>;
