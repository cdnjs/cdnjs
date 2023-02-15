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
     * @return {HTMLDivElement} Container element
     */
    public getElement(): HTMLDivElement;
}
