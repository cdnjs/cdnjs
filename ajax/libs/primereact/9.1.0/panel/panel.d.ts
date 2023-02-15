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
import { CSSTransitionProps } from '../csstransition';
import { IconType } from '../utils';

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
 * Defines valid properties in Panel component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group Properties
 */
export interface PanelProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    /**
     * Custom header template of the panel.
     */
    header?: React.ReactNode | undefined;
    /**
     * Header template of the panel to customize more.
     * @param {PanelHeaderTemplateOptions} options - Options to customize the header template.
     */
    headerTemplate?: React.ReactNode | ((options: PanelHeaderTemplateOptions) => React.ReactNode);
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
     * @defaultValue pi pi-plus
     */
    expandIcon?: IconType<PanelProps> | undefined;
    /**
     * Icon of a collapsed tab.
     * @defaultValue pi pi-minus
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
     * @return {HTMLDivElement} Container element
     */
    public getElement(): HTMLDivElement;
    /**
     * Used to get content of the panel.
     * @return {HTMLDivElement} Content element
     */
    public getContent(): HTMLDivElement;
}
