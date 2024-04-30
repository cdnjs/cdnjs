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
import { ComponentHooks } from '../componentbase/componentbase';
import { PassThroughOptions } from '../passthrough';
import { PassThroughType } from '../utils/utils';

export declare type ProgressSpinnerPassThroughType<T> = PassThroughType<T, ProgressSpinnerPassThroughMethodOptions>;

/**
 * Custom passthrough(pt) option method.
 */
export interface ProgressSpinnerPassThroughMethodOptions {
    props: ProgressSpinnerProps;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link ProgressSpinnerProps.pt}
 */
export interface ProgressSpinnerPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: ProgressSpinnerPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the spinner's DOM element.
     */
    spinner?: ProgressSpinnerPassThroughType<React.HTMLAttributes<SVGSVGElement>>;
    /**
     * Uses to pass attributes to the circle's DOM element.
     */
    circle?: ProgressSpinnerPassThroughType<React.HTMLAttributes<SVGCircleElement>>;
    /**
     * Used to manage all lifecycle hooks
     * @see {@link ComponentHooks}
     */
    hooks?: ComponentHooks;
}

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
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {ProgressSpinnerPassThroughOptions}
     */
    pt?: ProgressSpinnerPassThroughOptions;
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
