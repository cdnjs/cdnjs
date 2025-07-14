/**
 *
 * Badge represents people using icons, labels and images.
 *
 * [Live Demo](https://www.primereact.org/badge)
 *
 * @module badge
 *
 */
import * as React from 'react';
import { PassThroughType } from '../utils/utils';

export declare type BadgePassThroughType<T> = PassThroughType<T, BadgePassThroughMethodOptions>;

/**
 * Custom passthrough(pt) option method.
 */
export interface BadgePassThroughMethodOptions {
    props: BadgeProps;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link BadgeProps.pt}
 */
export interface BadgePassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: BadgePassThroughType<React.HTMLAttributes<HTMLSpanElement>>;
}

/**
 * Defines valid properties in Badge component. In addition to these, all properties of HTMLSpanElement can be used in this component.
 * @group Properties
 */
export interface BadgeProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, 'ref'> {
    /**
     * Value to display inside the badge.
     *
     */
    value?: any | null | undefined;
    /**
     * Severity type of the badge.
     * @defaultValue null
     */
    severity?: 'success' | 'info' | 'warning' | 'danger' | null | undefined;
    /**
     * Size of the badge, valid options are "large" and "xlarge".
     * @defaultValue null
     */
    size?: 'normal' | 'large' | 'xlarge' | null | undefined;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {BadgePassThroughOptions}
     */
    pt?: BadgePassThroughOptions;
}

/**
 * **PrimeReact - Badge**
 *
 * _Badge represents people using icons, labels and images._
 *
 * [Live Demo](https://www.primereact.org/badge/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class Badge extends React.Component<BadgeProps, any> {
    /**
     * Used to get container element.
     * @return {HTMLSpanElement} Container element
     */
    public getElement(): HTMLSpanElement;
}
