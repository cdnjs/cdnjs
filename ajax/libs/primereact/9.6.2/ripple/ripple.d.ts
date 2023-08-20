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
