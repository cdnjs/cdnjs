/**
 *
 * TabMenu is a navigation/command component that displays items as tab headers.
 *
 * [Live Demo](https://www.primereact.org/tabmenu/)
 *
 * @module tabmenu
 *
 */
import * as React from 'react';
import { MenuItem } from '../menuitem';

/**
 * Custom tab change event.
 * @see {@link TabMenuProps.onTabChange}
 * @event
 */
interface TabMenuTabChangeEvent {
    /**
     * Browser event
     */
    originalEvent: React.SyntheticEvent;
    /**
     * Selected menuitem
     */
    value: MenuItem;
    /**
     * Index of the selected tab
     */
    index: number;
}

/**
 * Defines valid properties in TabMenu component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group Properties
 */
export interface TabMenuProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    /**
     * An array of menuitems.
     */
    model?: MenuItem[] | undefined;
    /**
     * Active index of menuitem.
     * @defaultValue 0
     */
    activeIndex?: number | undefined;
    /**
     * Callback to invoke when active tab changes.
     * @param {TabMenuTabChangeEvent} event - Custom tab change event.
     */
    onTabChange?(event: TabMenuTabChangeEvent): void;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
}

/**
 * **PrimeReact - TabMenu**
 *
 * _TabMenu is a navigation/command component that displays items as tab headers._
 *
 * [Live Demo](https://www.primereact.org/tabmenu/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class TabMenu extends React.Component<TabMenuProps, any> {
    /**
     * Used to get container element.
     * @return {HTMLDivElement} Container element
     */
    public getElement(): HTMLDivElement;
}
