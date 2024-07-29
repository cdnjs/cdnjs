/**
 *
 * Menu is a navigation/command component that supports dynamic and static positioning.
 *
 * [Live Demo](https://www.primereact.org/menu/)
 *
 * @module menu
 *
 */
import * as React from 'react';
import { CSSTransitionProps as ReactCSSTransitionProps } from 'react-transition-group/CSSTransition';
import { ComponentHooks } from '../componentbase/componentbase';
import { CSSTransitionProps } from '../csstransition';
import { MenuItem } from '../menuitem';
import { PassThroughOptions } from '../passthrough';
import { PassThroughType } from '../utils/utils';

export declare type MenuPassThroughType<T> = PassThroughType<T, MenuPassThroughMethodOptions>;
export declare type MenuPassThroughTransitionType = ReactCSSTransitionProps | ((options: MenuPassThroughMethodOptions) => ReactCSSTransitionProps) | undefined;

/**
 * Custom passthrough(pt) option method.
 */
export interface MenuPassThroughMethodOptions {
    props: MenuProps;
    state: MenuState;
    context: MenuContext;
}

/**
 * Defines current options in Menu component.
 */
export interface MenuContext {
    /**
     * Current menuitem
     */
    item: MenuItem;
    /**
     * Index of the menuitem
     */
    index: number;
    /**
     * Id of the submenu header containing the menuitem
     */
    parentId: string | null;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link MenuProps.pt}
 */
export interface MenuPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: MenuPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the list's DOM element.
     */
    menu?: MenuPassThroughType<React.HTMLAttributes<HTMLUListElement>>;
    /**
     * Uses to pass attributes to the submenu header's DOM element.
     */
    submenuHeader?: MenuPassThroughType<React.HTMLAttributes<HTMLLIElement>>;
    /**
     * Uses to pass attributes to the list item's DOM element.
     */
    menuitem?: MenuPassThroughType<React.HTMLAttributes<HTMLLIElement>>;
    /**
     * Uses to pass attributes to the action's DOM element.
     */
    action?: MenuPassThroughType<React.HTMLAttributes<HTMLAnchorElement>>;
    /**
     * Uses to pass attributes to the icon's DOM element.
     */
    icon?: MenuPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the label's DOM element.
     */
    label?: MenuPassThroughType<React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the separator's DOM element.
     */
    separator?: MenuPassThroughType<React.HTMLAttributes<HTMLLIElement>>;
    /**
     * Used to manage all lifecycle hooks
     * @see {@link ComponentHooks}
     */
    hooks?: ComponentHooks;
    /**
     * Used to control React Transition API.
     */
    transition?: MenuPassThroughTransitionType;
}

/**
 * Defines current inline state in Menu component.
 */
export interface MenuState {
    /**
     * Current visible state as a boolean.
     * @defaultValue true
     */
    visible: boolean;
}

/**
 * Defines valid properties in Menu component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group Properties
 */
export interface MenuProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    /**
     * An array of menuitems.
     */
    model?: MenuItem[] | undefined;
    /**
     * Defines if menu would displayed as a popup.
     * @defaultValue false
     */
    popup?: boolean | undefined;
    /**
     * In popup mode determines how the overlay is aligned with its target. Values either 'left' or 'right'.
     * @defaultValue left
     */
    popupAlignment?: 'left' | 'right';
    /**
     * Whether to automatically manage layering.
     * @defaultValue true
     */
    autoZIndex?: boolean | undefined;
    /**
     * Base zIndex value to use in layering.
     * @defaultValue 0
     */
    baseZIndex?: number | undefined;
    /**
     * DOM element instance where the overlay panel should be mounted. Valid values are any DOM Element and 'self'. The self value is used to render a component where it is located.
     * @defaultValue document.body
     */
    appendTo?: 'self' | HTMLElement | undefined | null | (() => HTMLElement);
    /**
     * The properties of CSSTransition can be customized, except for "nodeRef" and "in" properties.
     * @type {CSSTransitionProps}
     */
    transitionOptions?: CSSTransitionProps | undefined;
    /**
     * Index of the element in tabbing order.
     */
    tabIndex?: number | undefined;
    /**
     * Callback to invoke when a popup menu is shown.
     * @param {React.SyntheticEvent} event - Browser event.
     */
    onShow?(event: React.SyntheticEvent): void;
    /**
     * Callback to invoke when a popup menu is hidden.
     * @param {React.SyntheticEvent} event - Browser event.
     */
    onHide?(event: React.SyntheticEvent): void;
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
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {MenuPassThroughOptions}
     */
    pt?: MenuPassThroughOptions;
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
    /**
     * Specifies if pressing escape key should hide the Menu Popup.
     * @defaultValue true
     */
    closeOnEscape?: boolean | undefined;
}

/**
 * **PrimeReact - Menu**
 *
 * _Menu is a navigation/command component that supports dynamic and static positioning._
 *
 * [Live Demo](https://www.primereact.org/menu/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class Menu extends React.Component<MenuProps, any> {
    /**
     * Toggles the visibility of the popup menu.
     * @param {React.SyntheticEvent} event - Browser event.
     */
    public toggle(event: React.SyntheticEvent): void;
    /**
     * Displays the popup menu.
     * @param {React.SyntheticEvent} event - Browser event.
     */
    public show(event: React.SyntheticEvent): void;
    /**
     * Hides the popup menu.
     * @param {React.SyntheticEvent} event - Browser event.
     */
    public hide(event: React.SyntheticEvent): void;
    /**
     * Used to get container element.
     * @return {HTMLDivElement} Container element
     */
    public getElement(): HTMLDivElement;
    /**
     * Used to get target element.
     * @return {EventTarget} Target element
     */
    public getTarget(): EventTarget | null;
}
