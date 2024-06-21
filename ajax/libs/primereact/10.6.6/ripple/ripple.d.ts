/**
 *
 * Ripple component adds ripple effect to the host element.
 *
 * [Live Demo](https://www.primereact.org/ripple)
 *
 * @module ripple
 *
 */
import * as React from 'react';
import { PassThroughOptions } from '../passthrough';
import { PassThroughType } from '../utils';

export declare type RipplePassThroughType<T> = PassThroughType<T, RipplePassThroughMethodOptions>;

/**
 * Custom passthrough(pt) option method.
 */
export interface RipplePassThroughMethodOptions {
    props: RippleProps;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link RippleProps.pt}
 */
export interface RipplePassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: RipplePassThroughType<React.HTMLAttributes<HTMLDivElement>>;
}

/**
 * Defines valid properties in Ripple component.
 * @group Properties
 */
export interface RippleProps {
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
    /**
     * When enabled, it removes component related styles in the core.
     * @defaultValue false
     */
    unstyled?: boolean;
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {RipplePassThroughOptions}
     */
    pt?: RipplePassThroughOptions;
    /**
     * Used to configure passthrough(pt) options of the component.
     * @type {PassThroughOptions}
     */
    ptOptions?: PassThroughOptions;
}

/**
 * **PrimeReact - Ripple**
 *
 * _Ripple component adds ripple effect to the host element._
 *
 * [Live Demo](https://www.primereact.org/ripple/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class Ripple extends React.Component<RippleProps, any> {}
