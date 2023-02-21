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
import { CSSTransitionProps } from '../csstransition';
import { MenuItem } from '../menuitem';

/**
 * Defines valid properties in TieredMenu component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group Properties
 */
export interface TieredMenuProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
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
    appendTo?: 'self' | HTMLElement | null | undefined;
    /**
     * The properties of CSSTransition can be customized, except for "nodeRef" and "in" properties.
     * @type {CSSTransitionProps}
     */
    transitionOptions?: CSSTransitionProps | undefined;
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
