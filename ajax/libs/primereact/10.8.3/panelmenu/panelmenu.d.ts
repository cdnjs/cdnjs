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
import { CSSTransitionProps as ReactCSSTransitionProps } from 'react-transition-group/CSSTransition';
import { ComponentHooks } from '../componentbase/componentbase';
import { CSSTransitionProps } from '../csstransition';
import { MenuItem } from '../menuitem';
import { PassThroughOptions } from '../passthrough';
import { IconType, PassThroughType } from '../utils/utils';

export declare type PanelMenuPassThroughType<T> = PassThroughType<T, PanelMenuPassThroughMethodOptions>;
export declare type PanelMenuPassThroughTransitionType = ReactCSSTransitionProps | ((options: PanelMenuPassThroughMethodOptions) => ReactCSSTransitionProps) | undefined;

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
     * Uses to pass attributes to the header content's DOM element.
     */
    headerContent?: PanelMenuPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the expand icon's DOM element.
     */
    expandIcon?: PanelMenuPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the collapse icon's DOM element.
     */
    collapseIcon?: PanelMenuPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
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
    /**
     * Used to manage all lifecycle hooks
     * @see {@link ComponentHooks}
     */
    hooks?: ComponentHooks;
    /**
     * Used to control React Transition API.
     */
    transition?: PanelMenuPassThroughTransitionType;
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
 * Custom expanded keys metadata.
 * @see {@link PanelMenuProps.expandedKeys}
 */
export interface PanelMenuExpandedKeys {
    [key: string]: any;
}

interface PanelMenuHeaderItemClickEvent {
    originalEvent: React.MouseEvent<HTMLElement>;
    item: MenuItem;
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
     * A map of keys to represent the expansion state in controlled mode.
     * @type {PanelMenuExpandedKeys}
     */
    expandedKeys?: PanelMenuExpandedKeys;
    /**
     * Whether multiple tabs can be activated at the same time or not.
     * @defaultValue false
     */
    multiple?: boolean | undefined;
    /**
     * Icon used when a submenu is collapsed.
     */
    expandIcon?: IconType<PanelMenuProps> | undefined;
    /**
     * Icon used when a submenu is expanded.
     */
    collapseIcon?: IconType<PanelMenuProps> | undefined;
    /**
     * The properties of CSSTransition can be customized, except for "nodeRef" and "in" properties.
     */
    transitionOptions?: CSSTransitionProps | undefined;
    /**
     * Callback to invoke when a panel gets expanded.
     * @param {PanelMenuHeaderItemClickEvent} event - custom event.
     */
    onOpen?(event: PanelMenuHeaderItemClickEvent): void;
    /**
     * Callback to invoke when a panel gets collapsed.
     * @param {PanelMenuHeaderItemClickEvent} event - custom event.
     */
    onClose?(event: PanelMenuHeaderItemClickEvent): void;
    /**
     * Callback to when the expandedKeys changes.
     * @param {*} value - New value.
     */
    onExpandedKeysChange?(value: any): void;
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
