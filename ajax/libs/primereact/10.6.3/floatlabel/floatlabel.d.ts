/**
 *
 * FloatLabel appears on top of the input field when focused.
 *
 * [Live Demo](https://www.primereact.org/floatlabel/)
 *
 * @module floatlabel
 *
 */
import * as React from 'react';
import { ComponentHooks } from '../componentbase/componentbase';
import { PassThroughOptions } from '../passthrough';
import { PassThroughType } from '../utils/utils';

export declare type FloatLabelPassThroughType<T> = PassThroughType<T, FloatLabelPassThroughMethodOptions>;

/**
 * Custom passthrough(pt) option method.
 */
export interface FloatLabelPassThroughMethodOptions {
    /**
     * Defines valid properties.
     */
    props: FloatLabelProps;
    /**
     * Defines parent options.
     */
    parent: any;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link FloatLabelProps.pt}
 */
export interface FloatLabelPassThroughOptions {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: FloatLabelPassThroughType<React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Used to manage all lifecycle hooks.
     * @see {@link ComponentHooks}
     */
    hooks?: ComponentHooks;
}

/**
 * Defines valid properties in FloatLabel component.
 * @group Properties
 */
export interface FloatLabelProps {
    /**
     * Used to pass attributes to DOM elements inside the component.
     * @type {FloatLabelPassThroughOptions}
     */
    pt?: FloatLabelPassThroughOptions;
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
 * **PrimeReact - FloatLabel**
 *
 * _FloatLabel appears on top of the input field when focused._
 *
 * [Live Demo](https://www.primereact.org/inputtext/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 *
 */
export declare const FloatLabel: React.ForwardRefExoticComponent<FloatLabelProps & React.RefAttributes<HTMLSpanElement>>;
