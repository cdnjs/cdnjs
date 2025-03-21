/**
 *
 * InputIcon displays an icon.
 *
 * [Live Demo](https://www.primereact.org/iconfield/)
 *
 * @module inputicon
 *
 */
import * as React from 'react';
import { ComponentHooks } from '../componentbase/componentbase';
import { PassThroughOptions } from '../passthrough';
import { PassThroughType } from '../utils/utils';

export declare type InputIconPassThroughType<T> = PassThroughType<T, InputIconPassThroughMethodOptions>;

/**
 * Custom passthrough(pt) option method.
 */
export interface InputIconPassThroughMethodOptions {
    props: InputIconProps;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link InputIconProps.pt}
 */
export interface InputIconPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: InputIconPassThroughType<React.HTMLAttributes<HTMLInputElement>>;
    /**
     * Used to manage all lifecycle hooks
     * @see {@link ComponentHooks}
     */
    hooks?: ComponentHooks;
}

/**
 * Defines valid properties in InputIcon component. In addition to these, all properties of HTMLInputElement can be used in this component.
 * @group Properties
 */
export interface InputIconProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {InputIconPassThroughOptions}
     */
    pt?: InputIconPassThroughOptions;
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
 * **PrimeReact - InputIcon**
 *
 * _InputIcon is an extension to standard input element with theming and keyfiltering._
 *
 * [Live Demo](https://www.primereact.org/inputtext/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare const InputIcon: React.ForwardRefExoticComponent<InputIconProps & React.RefAttributes<HTMLInputElement>>;
