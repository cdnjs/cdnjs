/**
 *
 * PanelMenu is a hybrid of accordion-tree components.
 *
 * [Live Demo](https://www.primefaces.org/primereact/panelmenu/)
 *
 * @module panelmenu
 *
 */
import * as React from 'react';
import { MenuItem } from '../menuitem';
import { CSSTransitionProps } from '../csstransition';

/**
 * Defines valid properties in PanelMenu component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group Properties
 */
export interface PanelMenuProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    /**
     * An array of menuitems.
     */
    model?: MenuItem[] | undefined;
    /**
     * Whether multiple tabs can be activated at the same time or not.
     * @defaultValue false
     */
    multiple?: boolean | undefined;
    /**
     * The properties of CSSTransition can be customized, except for "nodeRef" and "in" properties.
     */
    transitionOptions?: CSSTransitionProps | undefined;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
}

/**
 * **PrimeReact - PanelMenu**
 *
 * _PanelMenu is a hybrid of accordion-tree components._
 *
 * [Live Demo](https://www.primefaces.org/primereact/panelmenu/)
 * --- ---
 * ![PrimeReact](https://www.primefaces.org/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class PanelMenu extends React.Component<PanelMenuProps, any> {
    /**
     * Used to get container element.
     * @return {HTMLDivElement} Container element
     */
    public getElement(): HTMLDivElement;
}
