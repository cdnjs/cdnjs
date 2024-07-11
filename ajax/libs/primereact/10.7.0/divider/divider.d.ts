/**
 *
 * Divider is used to separate contents.
 *
 * [Live Demo](https://www.primereact.org/divider/)
 *
 * @module divider
 *
 */
import * as React from 'react';
import { ComponentHooks } from '../componentbase/componentbase';
import { PassThroughOptions } from '../passthrough';
import { PassThroughType } from '../utils';

export declare type DividerPassThroughType<T> = PassThroughType<T, DividerPassThroughMethodOptions>;

/**
 * Custom passthrough(pt) option method.
 */
export interface DividerPassThroughMethodOptions {
    props: DividerProps;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link DividerProps.pt}
 */
export interface DividerPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: DividerPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the content's DOM element.
     */
    content?: DividerPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Used to manage all lifecycle hooks
     * @see {@link ComponentHooks}
     */
    hooks?: ComponentHooks;
}

/**
 * Defines valid properties in Divider component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group Properties
 */
export interface DividerProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    /**
     * Alignment of the content, options are "left", "center", "right" for horizontal layout and "top", "center", "bottom" for vertical.
     */
    align?: 'center' | 'left' | 'right' | 'bottom' | 'top' | undefined;
    /**
     * Specifies the orientation, valid values are "horizontal" and "vertical".
     * @defaultValue horizontal
     */
    layout?: 'vertical' | 'horizontal' | undefined;
    /**
     * Border style type, default is "solid" and other options are "dashed" and "dotted".
     * @defaultValue solid
     */
    type?: 'solid' | 'dashed' | 'dotted' | undefined;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {DividerPassThroughOptions}
     */
    pt?: DividerPassThroughOptions;
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
 * **PrimeReact - Divider**
 *
 * _Divider is used to separate contents._
 *
 * [Live Demo](https://www.primereact.org/divider/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class Divider extends React.Component<DividerProps, any> {
    /**
     * Used to get container element.
     * @return {HTMLDivElement} Container element
     */
    public getElement(): HTMLDivElement;
}
