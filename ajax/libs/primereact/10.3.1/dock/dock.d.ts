/**
 *
 * Dock is a navigation component consisting of menuitems.
 *
 * [Live Demo](https://www.primereact.org/dock/)
 *
 * @module dock
 *
 */
import * as React from 'react';
import { ComponentHooks } from '../componentbase/componentbase';
import { MenuItem } from '../menuitem';
import { PassThroughOptions } from '../passthrough';
import { PassThroughType } from '../utils/utils';

export declare type DockPassThroughType<T> = PassThroughType<T, DockPassThroughMethodOptions>;

/**
 * Custom passthrough(pt) option method.
 */
export interface DockPassThroughMethodOptions {
    props: DockProps;
    state: DockState;
    context: DockContext;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link DockProps.pt}
 */
export interface DockPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: DockPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the container's DOM element.
     */
    container?: DockPassThroughType<React.HTMLAttributes<HTMLDivElement>>;

    /**
     * Uses to pass attributes to the header's DOM element.
     */
    header?: DockPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the footer's DOM element.
     */
    footer?: DockPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the list's DOM element.
     */
    menu?: DockPassThroughType<React.HTMLAttributes<HTMLUListElement>>;
    /**
     * Uses to pass attributes to the list item's DOM element.
     */
    menuitem?: DockPassThroughType<React.HTMLAttributes<HTMLLIElement>>;
    /**
     * Uses to pass attributes to the action's DOM element.
     */
    action?: DockPassThroughType<React.HTMLAttributes<HTMLAnchorElement>>;
    /**
     * Uses to pass attributes to the icon's DOM element.
     */
    icon?: DockPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Used to manage all lifecycle hooks
     * @see {@link ComponentHooks}
     */
    hooks?: ComponentHooks;
}

/**
 * Defines current inline state in Dock component.
 */
export interface DockState {
    /**
     * Current index as a number.
     * @defaultvalue -3
     */
    currentIndex: number;
}

/**
 * Defines current options in Dock component.
 */
export interface DockContext {
    /**
     * Current index of the menuitem.
     */
    index: number;
    /**
     * Current menuitem
     */
    item: any;
}

/**
 * Custom header template
 * @see {@link DockProps.header}
 */
interface DockHeaderTemplateOptions {
    /**
     * All component props
     */
    props: DockProps;
}

/**
 * Custom footer template
 * @see {@link DockProps.footer}
 * @extends {DockHeaderTemplateOptions}
 */
interface DockFooterTemplateOptions extends DockHeaderTemplateOptions {}

/**
 * Defines valid properties in Dock component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group Properties
 */
export interface DockProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    /**
     * MenuModel instance to define the action items.
     */
    model?: MenuItem[] | undefined;
    /**
     * Position of element. Valid values are 'bottom', 'top', 'left' and 'right'.
     * @defaultValue bottom
     */
    position?: 'top' | 'bottom' | 'left' | 'right' | undefined;
    /**
     * Whether to allow scale animation.
     */
    magnification?: boolean | undefined;
    /**
     * Template of header element.
     */
    header?: React.ReactNode | ((options: DockHeaderTemplateOptions) => React.ReactNode);
    /**
     * Template of footer element.
     */
    footer?: React.ReactNode | ((options: DockFooterTemplateOptions) => React.ReactNode);
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {DockPassThroughOptions}
     */
    pt?: DockPassThroughOptions;
    /**
     * Used to configure passthrough(pt) options of the component.
     * @type {PassThroughOptions}
     */
    ptOptions?: PassThroughOptions;
    /**
     * Index of the element in tabbing order.
     */
    tabIndex?: number | undefined;
    /**
     * Callback to invoke when dock receives focus.
     * @param {React.SyntheticEvent} event - Browser event.
     */
    onFocus?(event: React.SyntheticEvent): void;
    /**
     * Callback to invoke when dock loses focus.
     * @param {React.SyntheticEvent} event - Browser event.
     */
    onBlur?(event: React.SyntheticEvent): void;
    /**
     * When enabled, it removes component related styles in the core.
     * @defaultValue false
     */
    unstyled?: boolean;
}

/**
 * **PrimeReact - Dock**
 *
 * _Dock is a navigation component consisting of menuitems._
 *
 * [Live Demo](https://www.primereact.org/dock/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class Dock extends React.Component<DockProps, any> {
    /**
     * Used to get container element.
     * @return {HTMLDivElement} Container element
     */
    public getElement(): HTMLDivElement;
}
