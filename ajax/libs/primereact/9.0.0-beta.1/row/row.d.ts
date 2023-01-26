/**
 *
 * Row component is a helper component used to create grouping structures in DataTable.
 *
 * [Live Demo](https://www.primefaces.org/primereact/datatable/)
 *
 * @module row
 *
 */
import * as React from 'react';

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
}

/**
 * **PrimeReact - Row**
 *
 * _Row component is a helper component used to create grouping structures in DataTable._
 *
 * [Live Demo](https://www.primefaces.org/primereact/datatable/)
 * --- ---
 * ![PrimeReact](https://www.primefaces.org/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class Row extends React.Component<RowProps, any> {}
