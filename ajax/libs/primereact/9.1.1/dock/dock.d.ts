/**
 *
 * Dock is a navigation component consisting of menuitems.
 *
 * [Live Demo](https://www.primereact.org/dock/)
 *
 * @module dock
 *
 */
import * as React from 'react';
import { MenuItem } from '../menuitem';

/**
 * Custom header template
 * @see {@link DockProps.header}
 */
interface DockHeaderTemplateOptions {
    /**
     * All component props
     */
    props: DockProps;
}

/**
 * Custom footer template
 * @see {@link DockProps.footer}
 * @extends {DockHeaderTemplateOptions}
 */
interface DockFooterTemplateOptions extends DockHeaderTemplateOptions {}

/**
 * Defines valid properties in Dock component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group Properties
 */
export interface DockProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    /**
     * MenuModel instance to define the action items.
     */
    model?: MenuItem[] | undefined;
    /**
     * Position of element. Valid values are 'bottom', 'top', 'left' and 'right'.
     * @defaultValue bottom
     */
    position?: 'top' | 'bottom' | 'left' | 'right' | undefined;
    /**
     * Whether to allow scale animation.
     */
    magnification?: boolean | undefined;
    /**
     * Template of header element.
     */
    header?: React.ReactNode | ((options: DockHeaderTemplateOptions) => React.ReactNode);
    /**
     * Template of footer element.
     */
    footer?: React.ReactNode | ((options: DockFooterTemplateOptions) => React.ReactNode);
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
}

/**
 * **PrimeReact - Dock**
 *
 * _Dock is a navigation component consisting of menuitems._
 *
 * [Live Demo](https://www.primereact.org/dock/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class Dock extends React.Component<DockProps, any> {
    /**
     * Used to get container element.
     * @return {HTMLDivElement} Container element
     */
    public getElement(): HTMLDivElement;
}
