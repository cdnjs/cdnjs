/**
 *
 * PanelMenu is a hybrid of accordion-tree components.
 *
 * [Live Demo](https://www.primereact.org/panelmenu/)
 *
 * @module panelmenu
 *
 */
import * as React from 'react';
import { CSSTransitionProps } from '../csstransition';
import { MenuItem } from '../menuitem';
import { IconType, PassThroughType } from '../utils/utils';

export declare type PanelMenuPassThroughType<T> = PassThroughType<T, PanelMenuPassThroughMethodOptions>;

/**
 * Custom passthrough(pt) option method.
 */
export interface PanelMenuPassThroughMethodOptions {
    props: PanelMenuProps;
    state: PanelMenuState;
    context: PanelMenuContext;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link PanelMenuProps.pt}
 */
export interface PanelMenuPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: PanelMenuPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the panel's DOM element.
     */
    panel?: PanelMenuPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the header's DOM element.
     */
    header?: PanelMenuPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the header action's DOM element.
     */
    headerAction?: PanelMenuPassThroughType<React.HTMLAttributes<HTMLAnchorElement>>;
    /**
     * Uses to pass attributes to the submenuIcon's DOM element.
     */
    submenuIcon?: PanelMenuPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the header icon's DOM element.
     */
    headerIcon?: PanelMenuPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the header submenu icon's DOM element.
     */
    headerSubmenuIcon?: PanelMenuPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the header label's DOM element.
     */
    headerLabel?: PanelMenuPassThroughType<React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the toggleable content's DOM element.
     */
    toggleableContent?: PanelMenuPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the header toggleable content's DOM element.
     */
    headerToggleableContent?: PanelMenuPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the menu content's DOM element.
     */
    menuContent?: PanelMenuPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the list's DOM element.
     */
    menu?: PanelMenuPassThroughType<React.HTMLAttributes<HTMLUListElement>>;
    /**
     * Uses to pass attributes to the list item's DOM element.
     */
    menuitem?: PanelMenuPassThroughType<React.HTMLAttributes<HTMLLIElement>>;
    /**
     * Uses to pass attributes to the action's DOM element.
     */
    action?: PanelMenuPassThroughType<React.HTMLAttributes<HTMLAnchorElement>>;
    /**
     * Uses to pass attributes to the icon's DOM element.
     */
    icon?: PanelMenuPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the label's DOM element.
     */
    label?: PanelMenuPassThroughType<React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the separator's DOM element.
     */
    separator?: PanelMenuPassThroughType<React.HTMLAttributes<HTMLLIElement>>;
}

/**
 * Defines current inline state in PanelMenu component.
 */
export interface PanelMenuState {
    /**
     * Current id state as a string.
     */
    id: string;
    /**
     * Active item path.
     * @type {MenuItem}
     */
    activeItem: MenuItem[];
    /**
     * Whether the menu is visible or not.
     * @defaultValue false
     */
    animationDisabled: boolean;
}

/**
 * Defines current options in PanelMenu component.
 */
export interface PanelMenuContext {
    /**
     * Current active state of menuitem as a boolean.
     * @defaultValue false
     */
    active: boolean;
}

/**
 * Defines valid properties in PanelMenu component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group Properties
 */
export interface PanelMenuProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref' | 'pt'> {
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
     * Icon of the submenu.
     */
    submenuIcon?: IconType<PanelMenuProps> | undefined;
    /**
     * The properties of CSSTransition can be customized, except for "nodeRef" and "in" properties.
     */
    transitionOptions?: CSSTransitionProps | undefined;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {PanelMenuPassThroughOptions}
     */
    pt?: PanelMenuPassThroughOptions;
}

/**
 * **PrimeReact - PanelMenu**
 *
 * _PanelMenu is a hybrid of accordion-tree components._
 *
 * [Live Demo](https://www.primereact.org/panelmenu/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
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
