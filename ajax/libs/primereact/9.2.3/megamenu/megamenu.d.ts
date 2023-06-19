/**
 *
 * MegaMenu is navigation component that displays submenus together.
 *
 * [Live Demo](https://www.primereact.org/megamenu/)
 *
 * @module megamenu
 *
 */
import * as React from 'react';
import { MenuItem } from '../menuitem';

/**
 * Defines valid properties in MegaMenu component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group Properties
 */
export interface MegaMenuProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    /**
     * An array of menuitems.
     */
    model?: MenuItem[] | undefined;
    /**
     * Defines the orientation, valid values are horizontal and vertical.
     * @defaultValue horizontal
     */
    orientation?: 'vertical' | 'horizontal' | undefined;
    /**
     * The template of starting element.
     */
    start?: React.ReactNode | ((props: MegaMenuProps) => React.ReactNode);
    /**
     * The breakpoint to define the maximum width boundary when responsiveness is enabled.
     */
    breakpoint?: string | undefined;
    /**
     * Maximum height of the options panel on responsive mode.
     * @defaultValue 400px
     */
    scrollHeight?: string | undefined;
    /**
     * The template of trailing element
     */
    end?: React.ReactNode | ((props: MegaMenuProps) => React.ReactNode);
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
}

/**
 * **PrimeReact - MegaMenu**
 *
 * _MegaMenu is navigation component that displays submenus together._
 *
 * [Live Demo](https://www.primereact.org/megamenu/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class MegaMenu extends React.Component<MegaMenuProps, any> {
    /**
     * Used to get container element.
     * @return {HTMLDivElement} Container element
     */
    public getElement(): HTMLDivElement;
}
