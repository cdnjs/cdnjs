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
import { CSSTransitionProps as ReactCSSTransitionProps } from 'react-transition-group/CSSTransition';
import { ComponentHooks } from '../componentbase/componentbase';
import { CSSTransitionProps } from '../csstransition';
import { PassThroughOptions } from '../passthrough';
import { IconType, PassThroughType } from '../utils';

export declare type SidebarPassThroughType<T> = PassThroughType<T, SidebarPassThroughMethodOptions>;
export declare type SidebarPassThroughTransitionType = ReactCSSTransitionProps | ((options: SidebarPassThroughMethodOptions) => ReactCSSTransitionProps) | undefined;

/**
 * Custom passthrough(pt) option method.
 */
export interface SidebarPassThroughMethodOptions {
    props: SidebarProps;
    state: SidebarState;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link SidebarProps.pt}
 */
export interface SidebarPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: SidebarPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the header's DOM element.
     */
    header?: SidebarPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the close button's DOM element.
     */
    closeButtonIcon?: SidebarPassThroughType<React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the close icon's DOM element.
     */
    closeIcon?: SidebarPassThroughType<React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the content's DOM element.
     */
    content?: SidebarPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the custom icons content's DOM element.
     */
    icons?: SidebarPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the mask's DOM element.
     */
    mask?: SidebarPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Used to manage all lifecycle hooks
     * @see {@link ComponentHooks}
     */
    hooks?: ComponentHooks;
    /**
     * Used to control React Transition API.
     */
    transition?: SidebarPassThroughTransitionType;
}

/**
 * Defines current inline state in Sidebar component.
 */
export interface SidebarState {
    /**
     * Current container visible state as a boolean.
     * @defaultValue false
     */
    containerVisible: boolean;
}

/**
 * Defines current content values and refs for headless development.
 * @see {@link SidebarProps.content}
 */
interface ContentProps {
    /**
     * Allows you to specify the close button of the sidebar.
     */
    closeIconRef: React.RefObject<HTMLButtonElement | HTMLElement>;
    /**
     * Callback for hiding the sidebar.
     * @param {React.SyntheticEvent} event - Used to get the event of the element.
     */
    hide(event: React.SyntheticEvent): void;
}

/**
 * Defines valid properties in Sidebar component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group Properties
 */
export interface SidebarProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref' | 'content'> {
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
     * Icon of the close button.
     */
    closeIcon?: IconType<SidebarProps> | undefined;
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
     * Custom template for the header.
     * @defaultValue true
     */
    header?: React.ReactNode | ((props: SidebarProps) => React.ReactNode);
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
    appendTo?: 'self' | HTMLElement | undefined | null | (() => HTMLElement);
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
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {SidebarPassThroughOptions}
     */
    pt?: SidebarPassThroughOptions;
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
     * Specifies a custom content for the sidebar. For more complex markup, use the "content" slot instead.
     * @param {ContentProps} props - The values of sidebar.
     * @return {React.ReactNode}
     */
    content?: React.ReactNode | ((props: ContentProps) => React.ReactNode);
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
