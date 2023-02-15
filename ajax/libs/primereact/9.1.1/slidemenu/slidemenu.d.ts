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
import { CSSTransitionProps } from '../csstransition';
import { MenuItem } from '../menuitem';

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
    appendTo?: 'self' | HTMLElement | undefined | null;
    /**
     * Whether to automatically manage layering.
     * @defaultValue true
     */
    autoZIndex?: boolean | undefined;
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
     * The properties of CSSTransition can be customized, except for "nodeRef" and "in" properties.
     */
    transitionOptions?: CSSTransitionProps | undefined;
    /**
     * Height of the scrollable area, a scrollbar appears if a menu height is longer than this value.
     * @defaultValue 175
     */
    viewportHeight?: number | undefined;
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
