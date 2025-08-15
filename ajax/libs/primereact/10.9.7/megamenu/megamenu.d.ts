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
import { ComponentHooks } from '../componentbase/componentbase';
import { MenuItem } from '../menuitem';
import { PassThroughOptions } from '../passthrough';
import { IconType, PassThroughType } from '../utils/utils';

export declare type MegaMenuPassThroughType<T> = PassThroughType<T, MegaMenuPassThroughMethodOptions>;

/**
 * Custom passthrough(pt) option method.
 */
export interface MegaMenuPassThroughMethodOptions {
    props: MegaMenuProps;
    state: MegaMenuState;
    context: MegaMenuContext;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link MegaMenuProps.pt}
 */
export interface MegaMenuPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: MegaMenuPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the list's DOM element.
     */
    menu?: MegaMenuPassThroughType<React.HTMLAttributes<HTMLUListElement>>;
    /**
     * Uses to pass attributes to the menu button's DOM element.
     */
    menuButton?: MegaMenuPassThroughType<React.HTMLAttributes<HTMLAnchorElement>>;
    /**
     * Uses to pass attributes to the menu icon's DOM element.
     */
    menuButtonIcon?: MegaMenuPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the list item's DOM element.
     */
    menuitem?: MegaMenuPassThroughType<React.HTMLAttributes<HTMLLIElement>>;
    /**
     * Uses to pass attributes to the header action's DOM element.
     */
    headerAction?: MegaMenuPassThroughType<React.HTMLAttributes<HTMLAnchorElement>>;
    /**
     * Uses to pass attributes to the action's DOM element.
     */
    action?: MegaMenuPassThroughType<React.HTMLAttributes<HTMLAnchorElement>>;
    /**
     * Uses to pass attributes to the icon's DOM element.
     */
    icon?: MegaMenuPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the label's DOM element.
     */
    label?: MegaMenuPassThroughType<React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the submenu icon's DOM element.
     */
    submenuIcon?: MegaMenuPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the panel's DOM element.
     */
    panel?: MegaMenuPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the grid's DOM element.
     */
    grid?: MegaMenuPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the column's DOM element.
     */
    column?: MegaMenuPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the submenu's DOM element.
     */
    submenu?: MegaMenuPassThroughType<React.HTMLAttributes<HTMLUListElement>>;
    /**
     * Uses to pass attributes to the submenu items's DOM element.
     */
    submenuItem?: MegaMenuPassThroughType<React.HTMLAttributes<HTMLLIElement>>;
    /**
     * Uses to pass attributes to the submenu header's DOM element.
     */
    submenuHeader?: MegaMenuPassThroughType<React.HTMLAttributes<HTMLLIElement>>;
    /**
     * Uses to pass attributes to the separator's DOM element.
     */
    separator?: MegaMenuPassThroughType<React.HTMLAttributes<HTMLLIElement>>;
    /**
     * Uses to pass attributes to the start of the component.
     */
    start?: MegaMenuPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the end of the component.
     */
    end?: MegaMenuPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Used to manage all lifecycle hooks
     * @see {@link ComponentHooks}
     */
    hooks?: ComponentHooks;
}

/**
 * Defines focused item info
 */
export interface MegaMenuFocusedItemInfo {
    /**
     * Active item index
     */
    index: number;
    /**
     * Active item level
     */
    level: number;
    /**
     * Parent key info
     */
    parentKey: string;
}

/**
 * Defines current inline state in MegaMenu component.
 */
export interface MegaMenuState {
    /**
     * Current mobileActive state as a boolean.
     * @defaultValue false
     */
    mobileActive: boolean;
    /**
     * Current attributeSelector visible state as a string.
     */
    attributeSelector: boolean;
    /**
     * Active item path.
     * @type {MenuItem}
     */
    activeItem: MenuItem;
}

/**
 * Defines current options in MegaMenu component.
 */
export interface MegaMenuContext {
    /**
     * Current active state of menuitem as a boolean.
     * @defaultValue false
     */
    active: boolean;
}

/**
 * Defines valid properties in MegaMenu component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group Properties
 */
export interface MegaMenuProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref' | 'pt'> {
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
     * Icon of the submenu.
     */
    submenuIcon?: IconType<MegaMenuProps> | undefined;
    /**
     * Icon to display in the horizontal menu.
     */
    menuIcon?: IconType<MegaMenuProps> | undefined;
    /**
     * Index of the element in tabbing order.
     */
    tabIndex?: number | undefined;
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
     * The template of trailing element
     */
    end?: React.ReactNode | ((props: MegaMenuProps) => React.ReactNode);
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {MegaMenuPassThroughOptions}
     */
    pt?: MegaMenuPassThroughOptions;
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
     * @return {HTMLDivElement | null} Container element
     */
    public getElement(): HTMLDivElement | null;
}
