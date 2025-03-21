/**
 *
 * IconField wraps an input and an icon.
 *
 * [Live Demo](https://www.primereact.org/iconfield/)
 *
 * @module iconfield
 *
 */
import * as React from 'react';
import { ComponentHooks } from '../componentbase/componentbase';
import { PassThroughOptions } from '../passthrough';
import { PassThroughType } from '../utils/utils';

export declare type IconFieldPassThroughType<T> = PassThroughType<T, IconFieldPassThroughMethodOptions>;

/**
 * Custom passthrough(pt) option method.
 */
export interface IconFieldPassThroughMethodOptions {
    props: IconFieldProps;
    context: IconFieldContext;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link IconFieldProps.pt}
 */
export interface IconFieldPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: IconFieldPassThroughType<React.HTMLAttributes<HTMLInputElement>>;
    /**
     * Used to manage all lifecycle hooks
     * @see {@link ComponentHooks}
     */
    hooks?: ComponentHooks;
}

/**
 * Defines current options in IconField component.
 */
export interface IconFieldContext {
    /**
     * Position of the icon
     * @defaultValue right
     */
    iconPosition?: 'left' | 'right' | undefined;
}

/**
 * Defines valid properties in IconField component. In addition to these, all properties of HTMLInputElement can be used in this component.
 * @group Properties
 */
export interface IconFieldProps extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'iconPosition'> {
    /**
     * Position of the icon
     * @defaultValue right
     */
    iconPosition?: 'left' | 'right' | undefined;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {IconFieldPassThroughOptions}
     */
    pt?: IconFieldPassThroughOptions;
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
 * **PrimeReact - IconField**
 *
 * _IconField is an extension to standard input element with theming and keyfiltering._
 *
 * [Live Demo](https://www.primereact.org/inputtext/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare const IconField: React.ForwardRefExoticComponent<IconFieldProps & React.RefAttributes<HTMLInputElement>>;
