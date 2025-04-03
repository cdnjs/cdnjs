/**
 *
 * Toolbar is a grouping component for buttons and other content.
 *
 * [Live Demo](https://www.primereact.org/toolbar/)
 *
 * @module toolbar
 *
 */
import * as React from 'react';
import { ComponentHooks } from '../componentbase/componentbase';
import { PassThroughOptions } from '../passthrough';
import { PassThroughType } from '../utils';

export declare type ToolbarPassThroughType<T> = PassThroughType<T, ToolbarPassThroughMethodOptions>;

/**
 * Custom passthrough(pt) option method.
 */
export interface ToolbarPassThroughMethodOptions {
    props: ToolbarProps;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link ToolbarProps.pt}
 */
export interface ToolbarPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: ToolbarPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the start's DOM element.
     */
    start?: ToolbarPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the center's DOM element.
     */
    center?: ToolbarPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the right's DOM element.
     */
    end?: ToolbarPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Used to manage all lifecycle hooks
     * @see {@link ComponentHooks}
     */
    hooks?: ComponentHooks;
}

/**
 * Defines valid properties in Toolbar component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group Properties
 */
export interface ToolbarProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    /**
     * The template of left section.
     * @deprecated use start instead
     */
    left?: React.ReactNode | ((props: ToolbarProps) => React.ReactNode);
    /**
     * The template of right section.
     * @deprecated use end instead
     */
    right?: React.ReactNode | ((props: ToolbarProps) => React.ReactNode);
    /**
     * The template of start section.
     */
    start?: React.ReactNode | ((props: ToolbarProps) => React.ReactNode);
    /**
     * The template of center section.
     */
    center?: React.ReactNode | ((props: ToolbarProps) => React.ReactNode);
    /**
     * The template of end section.
     */
    end?: React.ReactNode | ((props: ToolbarProps) => React.ReactNode);
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {ToolbarPassThroughOptions}
     */
    pt?: ToolbarPassThroughOptions;
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
 * **PrimeReact - Toolbar**
 *
 * _Toolbar is a grouping component for buttons and other content._
 *
 * [Live Demo](https://www.primereact.org/toolbar/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class Toolbar extends React.Component<ToolbarProps, any> {
    /**
     * Used to get container element.
     * @return {HTMLDivElement} Container element
     */
    public getElement(): HTMLDivElement;
}
