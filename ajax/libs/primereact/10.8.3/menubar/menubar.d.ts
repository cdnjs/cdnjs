/**
 *
 * Manubar is an input component that provides real-time suggestions when being typed.
 *
 * [Live Demo](https://www.primereact.org/menubar/)
 *
 * @module menubar
 *
 */
import * as React from 'react';
import { MenuItem } from '../menuitem';
import { IconType, PassThroughType } from '../utils/utils';
import { ComponentHooks } from '../componentbase/componentbase';
import { PassThroughOptions } from '../passthrough';

export declare type MenubarPassThroughType<T> = PassThroughType<T, MenubarPassThroughMethodOptions>;

/**
 * Custom passthrough(pt) option method.
 */
export interface MenubarPassThroughMethodOptions {
    props: MenubarProps;
    state: MenubarState;
    context: MenubarContext;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link MenubarProps.pt}
 */
export interface MenubarPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: MenubarPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the list's DOM element.
     */
    menu?: MenubarPassThroughType<React.HTMLAttributes<HTMLUListElement>>;
    /**
     * Uses to pass attributes to the list item's DOM element.
     */
    menuitem?: MenubarPassThroughType<React.HTMLAttributes<HTMLLIElement>>;
    /**
     * Uses to pass attributes to the content's DOM element.
     */
    content?: MenubarPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the action's DOM element.
     */
    action?: MenubarPassThroughType<React.HTMLAttributes<HTMLAnchorElement>>;
    /**
     * Uses to pass attributes to the icon's DOM element.
     */
    icon?: MenubarPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the label's DOM element.
     */
    label?: MenubarPassThroughType<React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the submenu's DOM element.
     */
    submenu?: MenubarPassThroughType<React.HTMLAttributes<HTMLUListElement>>;
    /**
     * Uses to pass attributes to the submenu icon's DOM element.
     */
    submenuIcon?: MenubarPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the separator's DOM element.
     */
    separator?: MenubarPassThroughType<React.HTMLAttributes<HTMLElement>>;
    /**
     * Uses to pass attributes to the mobile popup menu button's DOM element.
     */
    button?: MenubarPassThroughType<React.HTMLAttributes<HTMLElement>>;
    /**
     * Uses to pass attributes to the mobile popup menu button icon's DOM element.
     */
    popupIcon?: MenubarPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the start of the component.
     */
    start?: MenubarPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the end of the component.
     */
    end?: MenubarPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Used to manage all lifecycle hooks
     * @see {@link ComponentHooks}
     */
    hooks?: ComponentHooks;
}

/**
 * Defines current inline state in Menubar component.
 */
export interface MenubarState {
    /**
     * Current mobile menu active state as a boolean.
     * @defaultValue false
     */
    mobileActive: boolean;
}

/**
 * Defines current options in Menubar component.
 */
export interface MenubarContext {
    /**
     * Current active state of menuitem as a boolean.
     * @defaultValue false
     */
    active: boolean;
}

/**
 * Defines valid properties in Menubar component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group Properties
 */
export interface MenubarProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    /**
     * An array of menuitems.
     */
    model?: MenuItem[] | undefined;
    /**
     * The template of starting element.
     */
    start?: React.ReactNode | ((props: MenubarProps) => React.ReactNode);
    /**
     * Icon of the submenu.
     */
    submenuIcon?: IconType<MenubarProps> | undefined;
    /**
     * Icon of the menu.
     */
    menuIcon?: IconType<MenubarProps> | undefined;
    /**
     * Used to define a string that labels the component.
     */
    ariaLabel?: string | undefined;
    /**
     * Establishes relationships between the component and label(s) where its value should be one or more element IDs.
     */
    ariaLabelledBy?: string | undefined;

    /**
     * Callback to invoke when menu receives focus.
     * @param {React.SyntheticEvent} event - Browser event.
     */
    onFocus?(event: React.SyntheticEvent): void;

    /**
     * Callback to invoke when menu loses focus.
     * @param {React.SyntheticEvent} event - Browser event.
     */
    onBlur?(event: React.SyntheticEvent): void;

    /**
     * The template of trailing element.
     */
    end?: React.ReactNode | ((props: MenubarProps) => React.ReactNode);
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {MenubarPassThroughOptions}
     */
    pt?: MenubarPassThroughOptions;
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
 * **PrimeReact - Menubar**
 *
 * _Manubar is an input component that provides real-time suggestions when being typed._
 *
 * [Live Demo](https://www.primereact.org/menubar/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class Menubar extends React.Component<MenubarProps, any> {
    /**
     * Used to get container element.
     * @return {HTMLDivElement} Container element
     */
    public getElement(): HTMLDivElement;

    /**
     * Used to get root menu element.
     * @return {HTMLElement} Root menu element
     */
    public getRootMenu(): HTMLElement;

    /**
     * Used to get menu button element.
     * @return {HTMLElement} Menu button element
     */
    public getMenuButton(): HTMLElement;
}
