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
import { ComponentHooks } from '../componentbase/componentbase';
import { MenuItem } from '../menuitem';
import { PassThroughOptions } from '../passthrough';
import { IconType, PassThroughType } from '../utils/utils';

export declare type BreadCrumbPassThroughType<T> = PassThroughType<T, BreadCrumbPassThroughMethodOptions>;

/**
 * Custom passthrough(pt) option method.
 */
export interface BreadCrumbPassThroughMethodOptions {
    props: BreadCrumbProps;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link BreadCrumbProps.pt}
 */
export interface BreadCrumbPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: BreadCrumbPassThroughType<React.HTMLAttributes<HTMLElement>>;
    /**
     * Uses to pass attributes to the list's DOM element.
     */
    menu?: BreadCrumbPassThroughType<React.HTMLAttributes<HTMLUListElement>>;
    /**
     * Uses to pass attributes to the list item's DOM element.
     */
    menuitem?: BreadCrumbPassThroughType<React.HTMLAttributes<HTMLLIElement>>;
    /**
     * Uses to pass attributes to the action's DOM element.
     */
    action?: BreadCrumbPassThroughType<React.HTMLAttributes<HTMLAnchorElement>>;
    /**
     * Uses to pass attributes to the icon's DOM element.
     */
    icon?: BreadCrumbPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the label's DOM element.
     */
    label?: BreadCrumbPassThroughType<React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the separator's DOM element.
     */
    separator?: BreadCrumbPassThroughType<React.HTMLAttributes<HTMLLIElement>>;
    /**
     * Uses to pass attributes to the separator icon's DOM element.
     */
    separatorIcon?: BreadCrumbPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Used to manage all lifecycle hooks
     * @see {@link ComponentHooks}
     */
    hooks?: ComponentHooks;
}
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
     * Icon of the separator.
     */
    separatorIcon?: IconType<BreadCrumbProps> | undefined;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {BreadCrumbPassThroughOptions}
     */
    pt?: BreadCrumbPassThroughOptions;
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
     * @return {HTMLElement | null} Container element
     */
    public getElement(): HTMLElement | null;
}
