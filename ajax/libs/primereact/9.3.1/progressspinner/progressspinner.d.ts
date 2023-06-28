/**
 *
 * ProgressSpinner is a process status indicator.
 *
 * [Live Demo](https://www.primereact.org/progressspinner)
 *
 * @module progressspinner
 *
 */
import * as React from 'react';

/**
 * Defines valid properties in ProgressSpinner component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group Properties
 */
export interface ProgressSpinnerProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    /**
     * Width of the circle stroke.
     * @defaultValue 2
     */
    strokeWidth?: string | undefined;
    /**
     * 	Color for the background of the circle.
     */
    fill?: string | undefined;
    /**
     * Duration of the rotate animation.
     * @defaultValue 2s
     */
    animationDuration?: string | undefined;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
}

/**
 * **PrimeReact - ProgressSpinner**
 *
 * _ProgressSpinner is a process status indicator._
 *
 * [Live Demo](https://www.primereact.org/progressspinner/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class ProgressSpinner extends React.Component<ProgressSpinnerProps, any> {
    /**
     * Used to get container element.
     * @return {HTMLDivElement} Container element
     */
    public getElement(): HTMLDivElement;
}
