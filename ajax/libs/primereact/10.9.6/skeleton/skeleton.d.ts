/**
 *
 * Skeleton is a placeholder to display instead of the actual content.
 *
 * [Live Demo](https://www.primereact.org/skeleton/)
 *
 * @module skeleton
 *
 */
import * as React from 'react';
import { ComponentHooks } from '../componentbase/componentbase';
import { PassThroughOptions } from '../passthrough';
import { PassThroughType } from '../utils/utils';

export declare type SkeletonPassThroughType<T> = PassThroughType<T, SkeletonPassThroughMethodOptions>;

/**
 * Custom passthrough(pt) option method.
 */
export interface SkeletonPassThroughMethodOptions {
    props: SkeletonProps;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link SkeletonProps.pt}
 */
export interface SkeletonPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: SkeletonPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Used to manage all lifecycle hooks
     * @see {@link ComponentHooks}
     */
    hooks?: ComponentHooks;
}

/**
 * Defines valid properties in Skeleton component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group Properties
 */
export interface SkeletonProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    /**
     * It specifies an alternate text for an image, if the image cannot be displayed.
     * @defaultValue rectangle
     */
    shape?: 'rectangle' | 'circle' | undefined;
    /**
     * Size of the Circle or Square.
     */
    size?: string | undefined;
    /**
     * Width of the element.
     * @defaultValue 100%
     */
    width?: string | undefined;
    /**
     * Height of the element.
     * @defaultValue 1rem
     */
    height?: string | undefined;
    /**
     * Border radius of the element, defaults to value from theme.
     */
    borderRadius?: string | undefined;
    /**
     * Type of the animation, valid options are "wave" and "none".
     * @defaultValue wave
     */
    animation?: 'wave' | 'none' | undefined;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {SkeletonPassThroughOptions}
     */
    pt?: SkeletonPassThroughOptions;
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
 * **PrimeReact - Skeleton**
 *
 * _Skeleton is a placeholder to display instead of the actual content._
 *
 * [Live Demo](https://www.primereact.org/skeleton/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class Skeleton extends React.Component<SkeletonProps, any> {
    /**
     * Used to get container element.
     * @return {HTMLDivElement | null} Container element
     */
    public getElement(): HTMLDivElement | null;
}
