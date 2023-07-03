/**
 *
 * Columns can be grouped at header and footer sections by defining a ColumnGroup component.
 * It is a helper component for DataTable.
 *
 * [Live Demo](https://www.primereact.org/datatable/)
 *
 * @module columngroup
 *
 */
import * as React from 'react';
import { DataTablePassThroughOptions } from '../datatable/datatable';
import { PassThroughType } from '../utils/utils';

export declare type ColumnGroupPassThroughType<T> = PassThroughType<T, ColumnGroupPassThroughMethodOptions>;

/**
 * Custom passthrough(pt) option method.
 */
export interface ColumnGroupPassThroughMethodOptions {
    props: ColumnGroupProps;
    parent: DataTablePassThroughOptions;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link ColumnGroupProps.pt}
 */
export interface ColumnGroupPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: ColumnGroupPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
}

/**
 * Defines valid properties in ColumnGroup component.
 * @group Properties
 */
// tslint:disable-next-line:no-empty-interface
export interface ColumnGroupProps {
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {ColumnGroupPassThroughOptions}
     */
    pt?: ColumnGroupPassThroughOptions;
}

/**
 * **PrimeReact - ColumnGroup**
 *
 * _It is a helper component for DataTable._
 *
 * [Live Demo](https://www.primereact.org/columngroup/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class ColumnGroup extends React.Component<ColumnGroupProps, any> {}
