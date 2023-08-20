/**
 *
 * ContextMenu displays an overlay menu on right click of its target. Note that components like DataTable has special integration with ContextMenu. Refer to documentation of the individual documentation of the components having a special integration.
 *
 * [Live Demo](https://www.primereact.org/contextmenu/)
 *
 * @module contextmenu
 *
 */
import * as React from 'react';
import { CSSTransitionProps } from '../csstransition';
import { MenuItem } from '../menuitem';
import { IconType, PassThroughType } from '../utils/utils';

export declare type ContextMenuPassThroughType<T> = PassThroughType<T, ContextMenuPassThroughMethodOptions>;

/**
 * Custom passthrough(pt) option method.
 */
export interface ContextMenuPassThroughMethodOptions {
    props: ContextMenuProps;
    state: ContextMenuState;
    context: ContextMenuContext;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link ContextMenuProps.pt}
 */
export interface ContextMenuPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: ContextMenuPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the list's DOM element.
     */
    menu?: ContextMenuPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the list item's DOM element.
     */
    menuitem?: ContextMenuPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the action's DOM element.
     */
    action?: ContextMenuPassThroughType<React.HTMLAttributes<HTMLAnchorElement>>;
    /**
     * Uses to pass attributes to the icon's DOM element.
     */
    icon?: ContextMenuPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the label's DOM element.
     */
    label?: ContextMenuPassThroughType<React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the submenu icon's DOM element.
     */
    submenuIcon?: ContextMenuPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the separator's DOM element.
     */
    separator?: ContextMenuPassThroughType<React.HTMLAttributes<HTMLLIElement>>;
}

/**
 * Defines current inline state in ContextMenu component.
 */
export interface ContextMenuState {
    /**
     * Current visible state as a boolean.
     * @defaultValue false
     */
    visible: boolean;
    /**
     * Current reshow state as a boolean.
     * @defaultValue false
     */
    reshow: boolean;
    /**
     * Current resetMenu state as a boolean.
     * @defaultValue false
     */
    resetMenu: boolean;
    /**
     * Current attributeSelector visible state as a string.
     */
    attributeSelector: boolean;
}

/**
 * Defines current options in ContextMenu component.
 */
export interface ContextMenuContext {
    /**
     * Current active state of menuitem as a boolean.
     * @defaultValue false
     */
    active: boolean;
}

/**
 * Defines valid properties in ContextMenu component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group Properties
 */
export interface ContextMenuProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    /**
     * An array of menuitems.
     */
    model?: MenuItem[] | undefined;
    /**
     * Attaches the menu to document instead of a particular item.
     * @defaultValue false
     */
    global?: boolean | undefined;
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
     * The breakpoint to define the maximum width boundary when responsiveness is enabled.
     */
    breakpoint?: string | undefined;
    /**
     * Maximum height of the options panel on responsive mode.
     * @defaultValue 400px
     */
    scrollHeight?: string | undefined;
    /**
     * DOM element instance where the overlay panel should be mounted. Valid values are any DOM Element and 'self'. The self value is used to render a component where it is located.
     * @defaultValue document.body
     */
    appendTo?: 'self' | HTMLElement | undefined | null;
    /**
     * The properties of CSSTransition can be customized, except for "nodeRef" and "in" properties.
     */
    transitionOptions?: CSSTransitionProps | undefined;
    /**
     * Icon of the submenu.
     */
    submenuIcon?: IconType<ContextMenuProps> | undefined;
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
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {ContextMenuPassThroughOptions}
     */
    pt?: ContextMenuPassThroughOptions;
}

/**
 * **PrimeReact - ContextMenu**
 *
 * _ContextMenu displays an overlay menu on right click of its target. Note that components like DataTable has special integration with ContextMenu. Refer to documentation of the individual documentation of the components having a special integration._
 *
 * [Live Demo](https://www.primereact.org/contextmenu/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class ContextMenu extends React.Component<ContextMenuProps, any> {
    /**
     * Displays the popup menu.
     * @param {React.SyntheticEvent} event - Browser event
     */
    public show(event: React.SyntheticEvent): void;
    /**
     * Hides the popup menu.
     * @param {React.SyntheticEvent} event - Browser event
     */
    public hide(event: React.SyntheticEvent): void;
    /**
     * Used to get container element.
     * @return {HTMLDivElement} Container element
     */
    public getElement(): HTMLDivElement;
}
