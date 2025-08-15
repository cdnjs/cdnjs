/**
 *
 * ProgressBar is a process status indicator.
 *
 * [Live Demo](https://www.primereact.org/progressbar)
 *
 * @module progressbar
 *
 */
import * as React from 'react';
import { ComponentHooks } from '../componentbase/componentbase';
import { PassThroughOptions } from '../passthrough';
import { PassThroughType } from '../utils/utils';

export declare type ProgressBarPassThroughType<T> = PassThroughType<T, ProgressBarPassThroughMethodOptions>;

/**
 * Custom passthrough(pt) option method.
 */
export interface ProgressBarPassThroughMethodOptions {
    props: ProgressBarProps;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link ProgressBarProps.pt}
 */
export interface ProgressBarPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: ProgressBarPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the container's DOM element.
     */
    container?: ProgressBarPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the value's DOM element.
     */
    value?: ProgressBarPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the label's DOM element.
     */
    label?: ProgressBarPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Used to manage all lifecycle hooks
     * @see {@link ComponentHooks}
     */
    hooks?: ComponentHooks;
}

/**
 * Defines valid properties in ProgressBar component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group Properties
 */
export interface ProgressBarProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    /**
     * Current value of the progress.
     */
    value?: string | number | null | undefined;
    /**
     * Show or hide progress bar value.
     * @defaultValue true
     */
    showValue?: boolean | undefined;
    /**
     * Unit sign appended to the value.
     * @defaultValue %
     */
    unit?: string | undefined;
    /**
     * Defines the mode of the progress, valid values are "determinate" and "indeterminate".
     * @defaultValue determinate
     */
    mode?: 'determinate' | 'indeterminate' | undefined;
    /**
     * Color for the background of the progress.
     */
    color?: string | undefined;
    /**
     * Custom display value template
     */
    displayValueTemplate?(value: string | number | undefined | null | undefined): React.ReactNode;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {ProgressBarPassThroughOptions}
     */
    pt?: ProgressBarPassThroughOptions;
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
 * **PrimeReact - ProgressBar**
 *
 * _ProgressBar is a process status indicator._
 *
 * [Live Demo](https://www.primereact.org/progressbar/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class ProgressBar extends React.Component<ProgressBarProps, any> {
    /**
     * Used to get container element.
     * @return {HTMLDivElement | null} Container element
     */
    public getElement(): HTMLDivElement | null;
}
