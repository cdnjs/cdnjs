/**
 *
 * Sidebar is a panel component displayed as an overlay.
 *
 * [Live Demo](https://www.primereact.org/sidebar/)
 *
 * @module sidebar
 *
 */
import * as React from 'react';
import { CSSTransitionProps } from '../csstransition';

/**
 * Defines valid properties in Sidebar component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group Properties
 */
export interface SidebarProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    /**
     * Inline style of the mask.
     */
    maskStyle?: React.CSSProperties | undefined;
    /**
     * Style class of the mask.
     */
    maskClassName?: string | undefined;
    /**
     * Specifies the visibility of the dialog.
     * @defaultValue false
     */
    visible?: boolean | undefined;
    /**
     * Specifies the position of the sidebar, valid values are "left" and "right".
     * @defaultValue left
     */
    position?: 'top' | 'bottom' | 'left' | 'right' | undefined;
    /**
     * Adds a close icon to the header to hide the dialog.
     * @defaultValue false
     */
    fullScreen?: boolean | undefined;
    /**
     * Whether to block scrolling of the document when sidebar is active.
     * @defaultValue false
     */
    blockScroll?: boolean | undefined;
    /**
     * Base zIndex value to use in layering.
     * @defaultValue 0
     */
    baseZIndex?: number | undefined;
    /**
     * Whether to dismiss sidebar on click of the mask.
     * @defaultValue true
     */
    dismissable?: boolean | undefined;
    /**
     * Whether to display a close icon inside the panel.
     * @defaultValue true
     */
    showCloseIcon?: boolean | undefined;
    /**
     * Aria label of the close icon.
     * @defaultValue close
     */
    ariaCloseLabel?: string | undefined;
    /**
     * Specifies if pressing escape key should hide the sidebar.
     * @defaultValue true
     */
    closeOnEscape?: boolean | undefined;
    /**
     * Custom icons template for the header.
     * @defaultValue true
     */
    icons?: React.ReactNode | ((props: SidebarProps) => React.ReactNode);
    /**
     * Whether to a modal layer behind the sidebar.
     * @defaultValue true
     */
    modal?: boolean | undefined;
    /**
     * DOM element instance where the overlay panel should be mounted. Valid values are any DOM Element and self. The self value is used to render a component where it is located.
     * @defaultValue document.body
     */
    appendTo?: 'self' | HTMLElement | null | undefined;
    /**
     * The properties of CSSTransition can be customized, except for "nodeRef" and "in" properties.
     * @type {CSSTransitionProps}
     */
    transitionOptions?: CSSTransitionProps | undefined;
    /**
     * Callback to invoke when sidebar gets shown.
     */
    onShow?(): void;
    /**
     * Callback to invoke when the actions used to close the sidebar are triggered. Exp; close icon, mask and esc key.
     */
    onHide(): void;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
}

/**
 * **PrimeReact - Sidebar**
 *
 * _Sidebar is a panel component displayed as an overlay._
 *
 * [Live Demo](https://www.primereact.org/sidebar/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class Sidebar extends React.Component<SidebarProps, any> {
    /**
     * Used to get container element.
     * @return {HTMLDivElement} Container element
     */
    public getElement(): HTMLDivElement;
    /**
     * Used to get mask element.
     * @return {HTMLElement} Mask element
     */
    public getMask(): HTMLElement;
    /**
     * Used to get close icon element.
     * @return {HTMLButtonElement} Close icon element
     */
    public getCloseIcon(): HTMLButtonElement;
}
