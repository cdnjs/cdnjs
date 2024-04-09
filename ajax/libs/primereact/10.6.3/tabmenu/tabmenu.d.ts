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
import { ComponentHooks } from '../componentbase/componentbase';
import { MenuItem } from '../menuitem';
import { PassThroughOptions } from '../passthrough';
import { PassThroughType } from '../utils/utils';

export declare type TabMenuPassThroughType<T> = PassThroughType<T, TabMenuThroughMethodOptions>;

/**
 * Custom passthrough(pt) option method.
 */
export interface TabMenuThroughMethodOptions {
    props: TabMenuProps;
    state: TabMenuState;
    context: TabMenuContext;
}

/**
 * Defines current options in TabMenu component.
 */
export interface TabMenuContext {
    /**
     * Current menuitem
     */
    item: any;
    /**
     * Index of the menuitem
     */
    index: number;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link TabMenuProps.pt}
 */
export interface TabMenuPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: TabMenuPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the list's DOM element.
     */
    menu?: TabMenuPassThroughType<React.HTMLAttributes<HTMLUListElement>>;
    /**
     * Uses to pass attributes to the list item's DOM element.
     */
    menuitem?: TabMenuPassThroughType<React.HTMLAttributes<HTMLLIElement>>;
    /**
     * Uses to pass attributes to the action's DOM element.
     */
    action?: TabMenuPassThroughType<React.HTMLAttributes<HTMLAnchorElement>>;
    /**
     * Uses to pass attributes to the icon's DOM element.
     */
    icon?: TabMenuPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the label's DOM element.
     */
    label?: TabMenuPassThroughType<React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the inkbar's DOM element.
     */
    inkbar?: TabMenuPassThroughType<React.HTMLAttributes<HTMLLIElement>>;
    /**
     * Used to manage all lifecycle hooks
     * @see {@link ComponentHooks}
     */
    hooks?: ComponentHooks;
}

/**
 * Defines current inline state in TabMenu component.
 */
export interface TabMenuState {
    /**
     * Current active index state as a number.
     * @defaulValue 0
     */
    activeIndex: number;
}

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
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {TabMenuPassThroughOptions}
     */
    pt?: TabMenuPassThroughOptions;
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
