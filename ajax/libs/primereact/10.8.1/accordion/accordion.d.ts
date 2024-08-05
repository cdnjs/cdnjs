/**
 *
 * Accordion groups a collection of contents in tabs.
 *
 * [Live Demo](https://www.primereact.org/accordion/)
 *
 * Helper Components:
 *
 * - {@link AccordionTab}
 *
 * @module accordion
 *
 */
import * as React from 'react';
import { CSSTransitionProps as ReactCSSTransitionProps } from 'react-transition-group/CSSTransition';
import { ComponentHooks } from '../componentbase/componentbase';
import { CSSTransitionProps } from '../csstransition';
import { PassThroughOptions } from '../passthrough';
import { IconType, PassThroughType } from '../utils';

export declare type AccordionPassThroughType<T> = PassThroughType<T, AccordionPassThroughMethodOptions>;
export declare type AccordionTabPassThroughType<T> = PassThroughType<T, AccordionTabPassThroughMethodOptions>;
export declare type AccordionPassThroughTransitionType = ReactCSSTransitionProps | ((options: AccordionPassThroughMethodOptions) => ReactCSSTransitionProps) | undefined;

/**
 * Custom passthrough(pt) option method.
 */
export interface AccordionTabPassThroughMethodOptions {
    props: AccordionTabProps;
    parent: AccordionPassThroughMethodOptions;
    context: AccordionContext;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link AccordionTabProps.pt}
 */
export interface AccordionTabPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: AccordionTabPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the header's DOM element.
     */
    header?: AccordionTabPassThroughType<React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the headeraction's DOM element.
     */
    headerAction?: AccordionTabPassThroughType<React.HTMLAttributes<HTMLAnchorElement>>;
    /**
     * Uses to pass attributes to the headericon's DOM element.
     */
    headerIcon?: AccordionTabPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the headertitle's DOM element.
     */
    headerTitle?: AccordionTabPassThroughType<React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the toggleablecontent's DOM element.
     */
    toggleableContent?: AccordionTabPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the content's DOM element.
     */
    content?: AccordionTabPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Used to manage all lifecycle hooks
     * @see {@link ComponentHooks}
     */
    hooks?: ComponentHooks;
    /**
     * Used to control React Transition API.
     */
    transition?: AccordionPassThroughTransitionType;
}

/**
 * Defines current inline context in Accordion component.
 */
export interface AccordionContext {
    /**
     * Opened tab index.
     */
    index: number;
    /**
     * Total number of tabs
     */
    count: number;
    /**
     * Is this the first tab?
     * @defaultValue false
     */
    first: boolean;
    /**
     * Is this the last tab?
     * @defaultValue false
     */
    last: boolean;
    /**
     * Is this tab currently selected.
     * @defaultValue false
     */
    selected: boolean;
    /**
     * Is this tab currently disabled.
     * @defaultValue false
     */
    disabled: boolean;
}

/**
 * Defines valid properties in AccordionTab component.
 * @group Properties
 */
interface AccordionTabProps {
    /**
     * Style class of the tab header and content.
     */
    className?: string | undefined;
    /**
     * Style class of the tab content.
     */
    contentClassName?: string | undefined;
    /**
     * Inline style of the tab content.
     */
    contentStyle?: React.CSSProperties | undefined;
    /**
     * Whether the tab is disabled.
     * @defaultValue false
     */
    disabled?: boolean | undefined;
    /**
     * Used to define the header of the tab.
     */
    header?: React.ReactNode | ((props: AccordionTabProps) => React.ReactNode) | undefined;
    /**
     * Style class of the tab header.
     */
    headerClassName?: string | undefined;
    /**
     * Inline style of the tab header.
     */
    headerStyle?: React.CSSProperties | undefined;
    /**
     * Custom header template of the tab.
     */
    headerTemplate?: React.ReactNode | ((props: AccordionTabProps) => React.ReactNode);
    /**
     * Inline style of the tab header and content.
     */
    style?: React.CSSProperties | undefined;
    /**
     * Index of the element in tabbing order.
     * @defaultValue 0
     */
    tabIndex?: number | undefined;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {AccordionTabPassThroughOptions}
     */
    pt?: AccordionTabPassThroughOptions;
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
 * AccordionTab is a helper component for Accordion.
 * @group Component
 */
export declare class AccordionTab extends React.Component<AccordionTabProps, any> {}

/**
 * Custom tab open event.
 * @see {@link AccordionProps.onTabOpen}
 * @event
 */
export interface AccordionTabOpenEvent {
    /**
     * Browser mouse event.
     */
    originalEvent: React.MouseEvent<HTMLElement>;
    /**
     * Opened tab index.
     */
    index: number;
}

/**
 * Custom tab close event.
 * @see {@link AccordionProps.onTabClose}
 * @extends {AccordionTabOpenEvent}
 * @event
 */
export interface AccordionTabCloseEvent extends AccordionTabOpenEvent {}

/**
 * Custom tab change event.
 * @see {@link AccordionProps.onTabChange}
 * @event
 */
export interface AccordionTabChangeEvent {
    /**
     * Browser mouse event.
     */
    originalEvent: React.MouseEvent<HTMLElement>;
    /**
     * Opened tab index.
     */
    index: number | number[];
}

/**
 * Custom passthrough(pt) option method.
 */
export interface AccordionPassThroughMethodOptions {
    props: AccordionProps;
    state: AccordionState;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link AccordionProps.pt}
 */
export interface AccordionPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: AccordionPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to accordion tabs.
     */
    accordiontab?: AccordionTabPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
}

/**
 * Defines current inline state in Accordion component.
 */
export interface AccordionState {
    /**
     * Current id state as a string
     */
    id: string;
    /**
     * Current active index state.
     */
    activeIndex: number | number[];
}

/**
 * Defines valid properties in Accordion component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group Properties
 */
export interface AccordionProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    /**
     * Active index or indexes of the element. Use an array of numbers for multiple indexes.
     * The {@link multiple} prop must be set to true in order to specify multiple indexes.
     */
    activeIndex?: number | number[] | null | undefined;
    /**
     * When enabled, multiple tabs can be activated at the same time.
     * @defaultValue false
     */
    multiple?: boolean | undefined;
    /**
     * Icon of a collapsed tab.
     */
    expandIcon?: IconType<AccordionProps> | undefined;
    /**
     * Icon of an expanded tab.
     */
    collapseIcon?: IconType<AccordionProps> | undefined;
    /**
     * The properties of CSSTransition can be customized, except for "nodeRef" and "in" properties.
     * @type {CSSTransitionProps}
     */
    transitionOptions?: CSSTransitionProps | undefined;
    /**
     * Callback to invoke when a tab gets expanded.
     * @param {AccordionTabOpenEvent} event - Custom tab open event.
     */
    onTabOpen?(event: AccordionTabOpenEvent): void;
    /**
     * Callback to invoke when an active tab is collapsed by clicking on the header.
     * @param {AccordionTabCloseEvent} event - Custom tab close event.
     */
    onTabClose?(event: AccordionTabCloseEvent): void;
    /**
     * Callback to invoke when state of the accordion changes.
     * @param {AccordionTabChangeEvent} event - Custom tab close event.
     */
    onTabChange?(event: AccordionTabChangeEvent): void;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {AccordionPassThroughOptions}
     */
    pt?: AccordionPassThroughOptions;
    /**
     * Used to configure passthrough(pt) options of the component.
     * @type {PassThroughOptions}
     */
    ptOptions?: PassThroughOptions;
}

/**
 * **PrimeReact - Accordion**
 *
 * _Accordion groups a collection of contents in tabs._
 *
 * [Live Demo](https://www.primereact.org/accordion/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
// tslint:disable-next-line:max-classes-per-file
export declare class Accordion extends React.Component<AccordionProps, any> {
    /**
     * Used to get container element.
     * @return {HTMLDivElement} Container element
     */
    public getElement(): HTMLDivElement;
}
