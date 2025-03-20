/**
 *
 * Row component is a helper component used to create grouping structures in DataTable.
 *
 * [Live Demo](https://www.primereact.org/datatable/)
 *
 * @module row
 *
 */
import * as React from 'react';
import { ColumnGroupPassThroughOptions } from '../columngroup/columngroup';
import { ComponentHooks } from '../componentbase/componentbase';
import { PassThroughOptions } from '../passthrough';
import { PassThroughType } from '../utils/utils';

export declare type RowPassThroughType<T> = PassThroughType<T, RowPassThroughMethodOptions>;

/**
 * Custom passthrough(pt) option method.
 */
export interface RowPassThroughMethodOptions {
    props: RowProps;
    parent: ColumnGroupPassThroughOptions;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link RowProps.pt}
 */
export interface RowPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: RowPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Used to manage all lifecycle hooks
     * @see {@link ComponentHooks}
     */
    hooks?: ComponentHooks;
}

/**
 * Defines valid properties in Row component.
 * @group Properties
 */
export interface RowProps {
    /**
     * Inline style of the element.
     */
    style?: React.CSSProperties | undefined;
    /**
     * Style class of the row.
     */
    className?: string | undefined;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {RowPassThroughOptions}
     */
    pt?: RowPassThroughOptions;
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
 * **PrimeReact - Row**
 *
 * _Row component is a helper component used to create grouping structures in DataTable._
 *
 * [Live Demo](https://www.primereact.org/datatable/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class Row extends React.Component<RowProps, any> {}
