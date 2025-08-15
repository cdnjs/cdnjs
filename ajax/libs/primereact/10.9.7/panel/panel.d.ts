/**
 *
 * Panel is a grouping component providing with content toggle feature.
 *
 * [Live Demo](https://www.primereact.org/panel/)
 *
 * @module panel
 *
 */
import * as React from 'react';
import { CSSTransitionProps as ReactCSSTransitionProps } from 'react-transition-group/CSSTransition';
import { ComponentHooks } from '../componentbase/componentbase';
import { CSSTransitionProps } from '../csstransition';
import { PassThroughOptions } from '../passthrough';
import { IconType, PassThroughType } from '../utils';

export declare type PanelPassThroughType<T> = PassThroughType<T, PanelPassThroughMethodOptions>;
export declare type PanelPassThroughTransitionType = ReactCSSTransitionProps | ((options: PanelPassThroughMethodOptions) => ReactCSSTransitionProps) | undefined;

/**
 * Custom panel header template options.
 */
interface PanelHeaderTemplateOptions {
    /**
     * Style class of the panel.
     */
    className: string;
    /**
     * Style class of the panel title.
     */
    titleClassName: string;
    /**
     * Style class of the panel icons.
     */
    iconsClassName: string;
    /**
     * Style class of the panel toggler.
     */
    togglerClassName: string;
    /**
     * Style class of the panel toggler icon.
     */
    togglerIconClassName: string;
    /**
     * Callback to invoke when the toggler button is clicked.
     * @param {React.MouseEvent<HTMLElement>} event Browser event.
     */
    onTogglerClick(event: React.MouseEvent<HTMLElement>): void;
    /**
     * The JSX element that represents the title of the panel.
     */
    titleElement: JSX.Element;
    /**
     * The JSX element that represents the icons of the panel.
     */
    iconsElement: JSX.Element;
    /**
     * The JSX element that represents the toggler of the panel.
     */
    togglerElement: JSX.Element;
    /**
     * The JSX element that represents the panel.
     */
    element: JSX.Element;
    /**
     * The props of the Panel component.
     */
    props: PanelProps;
    /**
     * Whether the panel header is collapsed or not.
     */
    collapsed: boolean;
}
/**
 * Custom panel footer template options.
 */
interface PanelFooterTemplateOptions {
    /**
     * Style class of the panel.
     */
    className: string;
    /**
     * The JSX element that represents the panel.
     */
    element: JSX.Element;
    /**
     * The props of the Panel component.
     */
    props: PanelProps;
}

/**
 * Custom toggle event.
 * @see {@link PanelProps.onToggle}
 * @event
 */
interface PanelToggleEvent {
    /**
     * Browser event.
     */
    originalEvent: React.MouseEvent<HTMLElement>;
    /**
     * Collapsed state as a boolean.
     */
    value: boolean;
}

/**
 * Custom passthrough(pt) option method.
 */
export interface PanelPassThroughMethodOptions {
    props: PanelProps;
    state: PanelState;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link PanelProps.pt}
 */
export interface PanelPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: PanelPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the header's DOM element.
     */
    header?: PanelPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the title's DOM element.
     */
    title?: PanelPassThroughType<React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the icons' DOM element.
     */
    icons?: PanelPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the toggler's DOM element.
     */
    toggler?: PanelPassThroughType<React.HTMLAttributes<HTMLButtonElement>>;
    /**
     * Uses to pass attributes to the togglericon's DOM element.
     */
    togglerIcon?: PanelPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the toggleablecontent's DOM element.
     */
    toggleableContent?: PanelPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the content's DOM element.
     */
    content?: PanelPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the footer's DOM element.
     */
    footer?: PanelPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Used to manage all lifecycle hooks
     * @see {@link ComponentHooks}
     */
    hooks?: ComponentHooks;
    /**
     * Used to control React Transition API.
     */
    transition?: PanelPassThroughTransitionType;
}

/**
 * Defines current inline state in Panel component.
 */
export interface PanelState {
    /**
     * Current id state.
     */
    id: string;
    /**
     * Current collapsed state as a boolean.
     * @defaultValue false
     */
    collapsed: boolean;
}

/**
 * Defines valid properties in Panel component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group Properties
 */
export interface PanelProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    /**
     * Custom header template of the panel.
     */
    header?: React.ReactNode | undefined;
    /**
     * Custom footer template of the panel.
     */
    footer?: React.ReactNode | undefined;
    /**
     * Header template of the panel to customize more.
     * @param {PanelHeaderTemplateOptions} options - Options to customize the header template.
     */
    headerTemplate?: React.ReactNode | ((options: PanelHeaderTemplateOptions) => React.ReactNode);
    /**
     * Footer template of the panel to customize more.
     * @param {PanelFooterTemplateOptions} options - Options to customize the footer template.
     */
    footerTemplate?: React.ReactNode | ((options: PanelFooterTemplateOptions) => React.ReactNode);
    /**
     * Defines if content of panel can be expanded and collapsed.
     * @defaultValue false
     */
    toggleable?: boolean | undefined;
    /**
     * Defines the initial state of panel content, supports one or two-way binding as well.
     * @defaultValue false
     */
    collapsed?: boolean | undefined;
    /**
     * Icon of a expanded tab.
     */
    expandIcon?: IconType<PanelProps> | undefined;
    /**
     * Icon of a collapsed tab.
     */
    collapseIcon?: IconType<PanelProps> | undefined;
    /**
     * Custom icons template for the header.
     */
    icons?: React.ReactNode | ((props: PanelProps) => React.ReactNode);
    /**
     * The properties of CSSTransition can be customized, except for "nodeRef" and "in" properties.
     * @type {CSSTransitionProps}
     */
    transitionOptions?: CSSTransitionProps | undefined;
    /**
     * Callback to invoke when a tab gets expanded.
     * @param {React.SyntheticEvent} event - Browser event.
     */
    onExpand?(event: React.SyntheticEvent): void;
    /**
     * Callback to invoke when an active tab is collapsed by clicking on the header.
     * @param {React.SyntheticEvent} event - Browser event.
     */
    onCollapse?(event: React.SyntheticEvent): void;
    /**
     * Callback to invoke when a tab gets expanded.
     * @param {PanelToggleEvent} event - Custom toggle event.
     */
    onToggle?(event: PanelToggleEvent): void;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {PanelPassThroughOptions}
     */
    pt?: PanelPassThroughOptions;
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
 * **PrimeReact - Panel**
 *
 * _Panel is a grouping component providing with content toggle feature._
 *
 * [Live Demo](https://www.primereact.org/panel/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class Panel extends React.Component<PanelProps, any> {
    /**
     * Used to get container element.
     * @return {HTMLDivElement | null} Container element
     */
    public getElement(): HTMLDivElement | null;
    /**
     * Used to get content of the panel.
     * @return {HTMLDivElement | null} Content element
     */
    public getContent(): HTMLDivElement | null;
    /**
     * Toggle the panel if toggleable.
     * @param {React.SyntheticEvent | undefined} event - Browser event.
     */
    public toggle(event: React.SyntheticEvent | undefined): void;
    /**
     * Expand the panel if toggleable.
     * @param {React.SyntheticEvent | undefined} event - Browser event.
     */
    public expand(event: React.SyntheticEvent | undefined): void;
    /**
     * Collapse the panel if toggleable.
     * @param {React.SyntheticEvent | undefined} event - Browser event.
     */
    public collapse(event: React.SyntheticEvent | undefined): void;
}
