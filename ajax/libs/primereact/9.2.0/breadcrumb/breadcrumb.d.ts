/**
 *
 * Breadcrumb provides contextual information about page hierarchy.
 *
 * [Live Demo](https://www.primereact.org/breadcrumb/)
 *
 * @module breadcrumb
 *
 */
import * as React from 'react';
import { MenuItem } from '../menuitem';

/**
 * Defines valid properties in BreadCrumb component. In addition to these, all properties of HTMLElement can be used in this component.
 * @group Properties
 */
export interface BreadCrumbProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>, 'ref'> {
    /**
     * An array of menuitems.
     */
    model?: MenuItem[] | undefined;
    /**
     * MenuItem configuration for the home icon.
     */
    home?: MenuItem | undefined;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
}

/**
 * **PrimeReact - BreadCrumb**
 *
 * _Breadcrumb provides contextual information about page hierarchy._
 *
 * [Live Demo](https://www.primereact.org/breadcrumb/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class BreadCrumb extends React.Component<BreadCrumbProps, any> {
    /**
     * Used to get container element.
     * @return {HTMLElement} Container element
     */
    public getElement(): HTMLElement;
}
