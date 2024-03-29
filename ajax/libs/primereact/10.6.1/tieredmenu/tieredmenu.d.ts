/**
 *
 * TieredMenu is an input component that provides real-time suggestions when being typed.
 *
 * [Live Demo](https://www.primereact.org/tieredmenu/)
 *
 * @module tieredmenu
 *
 */
import * as React from 'react';
import { CSSTransitionProps as ReactCSSTransitionProps } from 'react-transition-group/CSSTransition';
import { ComponentHooks } from '../componentbase/componentbase';
import { CSSTransitionProps } from '../csstransition';
import { MenuItem } from '../menuitem';
import { PassThroughOptions } from '../passthrough';
import { IconType, PassThroughType } from '../utils/utils';

export declare type TieredMenuPassThroughType<T> = PassThroughType<T, TieredMenuPassThroughMethodOptions>;
export declare type TieredMenuPassThroughTransitionType = ReactCSSTransitionProps | ((options: TieredMenuPassThroughMethodOptions) => ReactCSSTransitionProps) | undefined;

/**
 * Custom passthrough(pt) option method.
 */
export interface TieredMenuPassThroughMethodOptions {
    props: TieredMenuProps;
    state: TieredMenuState;
    context: TieredMenuContext;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link TieredMenuProps.pt}
 */
export interface TieredMenuPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: TieredMenuPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the menu's DOM element.
     */
    menu?: TieredMenuPassThroughType<React.HTMLAttributes<HTMLUListElement>>;
    /**
     * Uses to pass attributes to the submenu's DOM element.
     */
    submenu?: TieredMenuPassThroughType<React.HTMLAttributes<HTMLUListElement>>;
    /**
     * Uses to pass attributes to the list item's DOM element.
     */
    menuitem?: TieredMenuPassThroughType<React.HTMLAttributes<HTMLLIElement>>;
    /**
     * Uses to pass attributes to the action's DOM element.
     */
    action?: TieredMenuPassThroughType<React.HTMLAttributes<HTMLAnchorElement>>;
    /**
     * Uses to pass attributes to the icon's DOM element.
     */
    icon?: TieredMenuPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the label's DOM element.
     */
    label?: TieredMenuPassThroughType<React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the submenu icon's DOM element.
     */
    submenuIcon?: TieredMenuPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the separator's DOM element.
     */
    separator?: TieredMenuPassThroughType<React.HTMLAttributes<HTMLLIElement>>;
    /**
     * Used to manage all lifecycle hooks
     * @see {@link ComponentHooks}
     */
    hooks?: ComponentHooks;
    /**
     * Used to control React Transition API.
     */
    transition?: TieredMenuPassThroughTransitionType;
}

/**
 * Defines current inline state in TieredMenu component.
 */
export interface TieredMenuState {
    /**
     * Current attributeSelector visible state as a string.
     */
    attributeSelector: string;
    /**
     * Current visible state as a boolean.
     * @defaultValue true
     */
    visible: boolean;
}

/**
 * Defines current options in TieredMenu component.
 */
export interface TieredMenuContext {
    /**
     * Current active state of menuitem as a boolean.
     * @defaultValue false
     */
    active: boolean;
}

/**
 * Defines valid properties in TieredMenu component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group Properties
 */
export interface TieredMenuProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref' | 'pt'> {
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
     * Whether to automatically manage layering.
     * @defaultValue true
     */
    autoZIndex?: boolean | undefined;
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
     * Whether to automatically manage layering.
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
     * Icon of the submenu.
     */
    submenuIcon?: IconType<TieredMenuProps> | undefined;
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
     * @type {TieredMenuPassThroughOptions}
     */
    pt?: TieredMenuPassThroughOptions;
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
 * **PrimeReact - TieredMenu**
 *
 * _TieredMenu is an input component that provides real-time suggestions when being typed._
 *
 * [Live Demo](https://www.primereact.org/tieredmenu/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class TieredMenu extends React.Component<TieredMenuProps, any> {
    /**
     * Toggles the visibility of the popup menu.
     * @param {React.SyntheticEvent} event - Browser event.
     */
    public toggle(event: React.SyntheticEvent): void;
    /**
     * Used to get container element.
     * @return {HTMLDivElement} Container element
     */
    public getElement(): HTMLDivElement;
}
