/**
 *
 * SlideMenu displays submenus with a slide animation.
 *
 * [Live Demo](https://www.primereact.org/slidemenu/)
 *
 * @module slidemenu
 *
 */
import * as React from 'react';
import { CSSTransitionProps as ReactCSSTransitionProps } from 'react-transition-group/CSSTransition';
import { ComponentHooks } from '../componentbase/componentbase';
import { CSSTransitionProps } from '../csstransition';
import { MenuItem } from '../menuitem';
import { PassThroughOptions } from '../passthrough';
import { IconType, PassThroughType } from '../utils/utils';

export declare type SlideMenuPassThroughType<T> = PassThroughType<T, SlideMenuPassThroughMethodOptions>;
export declare type SlideMenuPassThroughTransitionType = ReactCSSTransitionProps | ((options: SlideMenuPassThroughMethodOptions) => ReactCSSTransitionProps) | undefined;

/**
 * Custom passthrough(pt) option method.
 */
export interface SlideMenuPassThroughMethodOptions {
    props: SlideMenuProps;
    state: SlideMenuState;
    context: SlideMenuContext;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link SlideMenuProps.pt}
 */
export interface SlideMenuPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: SlideMenuPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the wrapper's DOM element.
     */
    wrapper?: SlideMenuPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the content's DOM element.
     */
    content?: SlideMenuPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the list's DOM element.
     */
    menu?: SlideMenuPassThroughType<React.HTMLAttributes<HTMLUListElement>>;
    /**
     * Uses to pass attributes to the list item's DOM element.
     */
    menuitem?: SlideMenuPassThroughType<React.HTMLAttributes<HTMLLIElement>>;
    /**
     * Uses to pass attributes to the action's DOM element.
     */
    action?: SlideMenuPassThroughType<React.HTMLAttributes<HTMLAnchorElement>>;
    /**
     * Uses to pass attributes to the icon's DOM element.
     */
    icon?: SlideMenuPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the previous's DOM element.
     */
    previous?: SlideMenuPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the previous icon's DOM element.
     */
    previousIcon?: SlideMenuPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the previous label's DOM element.
     */
    previousLabel?: SlideMenuPassThroughType<React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the label's DOM element.
     */
    label?: SlideMenuPassThroughType<React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the submenu icon's DOM element.
     */
    submenuIcon?: SlideMenuPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the separator's DOM element.
     */
    separator?: SlideMenuPassThroughType<React.HTMLAttributes<HTMLLIElement>>;
    /**
     * Used to manage all lifecycle hooks
     * @see {@link ComponentHooks}
     */
    hooks?: ComponentHooks;
    /**
     * Used to control React Transition API.
     */
    transition?: SlideMenuPassThroughTransitionType;
}

/**
 * Defines current inline state in SlideMenu component.
 */
export interface SlideMenuState {
    /**
     * Current visible state as a boolean.
     * @defaultValue false
     */
    visible: boolean;
    /**
     * Current level state as a number.
     * @defaultValue 0
     */
    level: number;
}

/**
 * Defines current options in SlideMenu component.
 */
export interface SlideMenuContext {
    /**
     * Current active state of menuitem as a boolean.
     * @defaultValue false
     */
    active: boolean;
}

/**
 * Custom navigate event
 * @see {@link SlideMenuProps.onNavigate}
 * @event
 */
interface SlideMenuNavigateEvent {
    /**
     * Level of current displayed menu
     */
    level: number;
}

/**
 * Defines valid properties in SlideMenu component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group Properties
 */
export interface SlideMenuProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    /**
     * DOM element instance where the overlay panel should be mounted. Valid values are any DOM Element and 'self'. The self value is used to render a component where it is located.
     * @defaultValue document.body
     */
    appendTo?: 'self' | HTMLElement | undefined | null | (() => HTMLElement);
    /**
     * Whether to automatically manage layering.
     * @defaultValue true
     */
    autoZIndex?: boolean | undefined;
    /**
     * Defines the backward icon.
     */
    backIcon?: IconType<SlideMenuProps> | undefined;
    /**
     * Label of element to navigate back.
     * @defaultValue Back
     */
    backLabel?: string | undefined;
    /**
     * Base zIndex value to use in layering.
     * @defaultValue 0
     */
    baseZIndex?: number | undefined;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
    /**
     * Easing animation to use for sliding.
     * @defaultValue ease-out
     */
    easing?: string | undefined;
    /**
     * Duration of the sliding animation in milliseconds.
     * @defaultValue 250
     */
    effectDuration?: number | undefined;
    /**
     * Width of the submenus.
     * @defaultValue 190
     */
    menuWidth?: number | undefined;
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
     * Uses to pass attributes to DOM elements inside the component.
     * @type {SlideMenuPassThroughOptions}
     */
    pt?: SlideMenuPassThroughOptions;
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
     * Icon of the submenu.
     */
    submenuIcon?: IconType<SlideMenuProps> | undefined;
    /**
     * The properties of CSSTransition can be customized, except for "nodeRef" and "in" properties.
     */
    transitionOptions?: CSSTransitionProps | undefined;
    /**
     * Height of the scrollable area, a scrollbar appears if a menu height is longer than this value.
     * @defaultValue 175
     */
    viewportHeight?: number | undefined;
    /**
     * Specifies if pressing escape key should hide the SlideMenu Popup.
     * @defaultValue true
     */
    closeOnEscape?: boolean | undefined;
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
     * Callback to invoke when a menu is navigated to.
     * @param {SlideMenuNavigateEvent} event - Navigate event.
     */
    onNavigate?(event: SlideMenuNavigateEvent): void;
}

/**
 * **PrimeReact - SlideMenu**
 *
 * _SlideMenu displays submenus with a slide animation._
 *
 * [Live Demo](https://www.primereact.org/slidemenu/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class SlideMenu extends React.Component<SlideMenuProps, any> {
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
     * Toggles the visibility of the popup menu.
     * @param {React.SyntheticEvent} event - Browser event
     */
    public toggle(event: React.SyntheticEvent): void;
    /**
     * Navigates the slide menu to this specific level.
     * @param {number} level - Number of the menu to set
     */
    public setLevelState(level: number): void;
    /**
     * Navigates the slide menu forward.
     */
    public navigateForward(): void;
    /**
     * Navigates the slide menu backwards.
     */
    public navigateBack(): void;
    /**
     * Used to get container element.
     * @return {HTMLDivElement} Container element
     */
    public getElement(): HTMLDivElement;
}
