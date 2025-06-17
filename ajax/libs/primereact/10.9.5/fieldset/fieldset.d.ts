/**
 *
 * Fieldset is an input component that provides real-time suggestions when being typed.
 *
 * [Live Demo](https://www.primereact.org/fieldset/)
 *
 * @module fieldset
 *
 */
import * as React from 'react';
import { CSSTransitionProps as ReactCSSTransitionProps } from 'react-transition-group/CSSTransition';
import { ComponentHooks } from '../componentbase/componentbase';
import { CSSTransitionProps } from '../csstransition';
import { PassThroughOptions } from '../passthrough';
import { IconType, PassThroughType } from '../utils/utils';

export declare type FieldsetPassThroughType<T> = PassThroughType<T, FieldsetPassThroughMethodOptions>;
export declare type FieldsetPassThroughTransitionType = ReactCSSTransitionProps | ((options: FieldsetPassThroughMethodOptions) => ReactCSSTransitionProps) | undefined;

/**
 * Custom passthrough(pt) option method.
 */
export interface FieldsetPassThroughMethodOptions {
    props: FieldsetProps;
    state: FieldsetState;
}

/**
 * Custom toggle event.
 * @see {@link FieldsetEmits.toggle}
 */
export interface FieldsetToggleEvent {
    /**
     * Browser event.
     */
    originalEvent: React.MouseEvent<HTMLElement>;
    /**
     * Collapsed state as a boolean
     */
    value: boolean;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link FieldsetProps.pt}
 */
export interface FieldsetPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: FieldsetPassThroughType<React.HTMLAttributes<HTMLFieldSetElement>>;
    /**
     * Uses to pass attributes to the legend's DOM element.
     */
    legend?: FieldsetPassThroughType<React.HTMLAttributes<HTMLLegendElement>>;
    /**
     * Uses to pass attributes to the toggler's DOM element.
     */
    toggler?: FieldsetPassThroughType<React.HTMLAttributes<HTMLAnchorElement>>;
    /**
     * Uses to pass attributes to the toggler icon's DOM element.
     */
    togglerIcon?: FieldsetPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the legend title's DOM element.
     */
    legendTitle?: FieldsetPassThroughType<React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the toggleable content's DOM element.
     */
    toggleableContent?: FieldsetPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the content's DOM element.
     */
    content?: FieldsetPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Used to manage all lifecycle hooks
     * @see {@link ComponentHooks}
     */
    hooks?: ComponentHooks;
    /**
     * Used to control React Transition API.
     */
    transition?: FieldsetPassThroughTransitionType;
}

/**
 * Defines current inline state in Fieldset component.
 */
export interface FieldsetState {
    /**
     * Current collapsed state as a boolean.
     * @defaultValue false
     */
    collapse: boolean;
}

/**
 * Custom toggle event.
 * @see {@link FieldsetProps.onToggle}
 * @event
 */
interface FieldsetToggleEvent {
    /**
     * Browser mouse event.
     */
    originalEvent: React.MouseEvent<HTMLElement>;
    /**
     * Collapsed state as a boolean.
     */
    value: boolean;
}

/**
 * Defines valid properties in Fieldset component. In addition to these, all properties of HTMLFieldSetElement can be used in this component.
 * @group Properties
 */
export interface FieldsetProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLFieldSetElement>, HTMLFieldSetElement>, 'ref'> {
    /**
     * Header text of the fieldset.
     */
    legend?: React.ReactNode | undefined;
    /**
     * When specified, content can toggled by clicking the legend.
     * @defaultValue false
     */
    toggleable?: boolean | undefined;
    /**
     * Defines the default visibility state of the content.
     * @defaultValue false
     */
    collapsed?: boolean | undefined;
    /**
     * Icon of an expanded tab.
     */
    collapseIcon?: IconType<FieldsetProps> | undefined;
    /**
     * The properties of CSSTransition can be customized, except for "nodeRef" and "in" properties.
     * @type {CSSTransitionProps}
     */
    transitionOptions?: CSSTransitionProps | undefined;
    /**
     * Icon of an collapsed tab.
     */
    expandIcon?: IconType<FieldsetProps> | undefined;
    /**
     * Callback to invoke when a tab gets expanded.
     * @param {React.MouseEvent<HTMLElement>} event - Browser event.
     */
    onExpand?(event: React.MouseEvent<HTMLElement>): void;
    /**
     * Callback to invoke when an active tab is collapsed by clicking on the header.
     * @param {React.MouseEvent<HTMLElement>} event - Browser event.
     */
    onCollapse?(event: React.MouseEvent<HTMLElement>): void;
    /**
     * Callback to invoke when a tab gets expanded.
     * @param {FieldsetToggleEvent} event - Custom toggle event.
     */
    onToggle?(event: FieldsetToggleEvent): void;
    /**
     * Callback to invoke when fieldset is clicked.
     * @param {React.MouseEvent<HTMLElement>} event - Browser event.
     */
    onClick?(event: React.MouseEvent<HTMLElement>): void;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {FieldsetPassThroughOptions}
     */
    pt?: FieldsetPassThroughOptions;
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
 * **PrimeReact - Fieldset**
 *
 * _Fieldset is an input component that provides real-time suggestions when being typed._
 *
 * [Live Demo](https://www.primereact.org/fieldset/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class Fieldset extends React.Component<FieldsetProps, any> {
    /**
     * Used to get container element.
     * @return {HTMLFieldSetElement | null} Container element
     */
    public getElement(): HTMLFieldSetElement | null;
    /**
     * Used to get the content element of the fieldset.
     * @return {HTMLDivElement | null} Content element
     */
    public getContent(): HTMLDivElement | null;
}
