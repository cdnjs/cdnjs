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
import { CSSTransitionProps } from '../csstransition';

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
     * The properties of CSSTransition can be customized, except for "nodeRef" and "in" properties.
     * @type {CSSTransitionProps}
     */
    transitionOptions?: CSSTransitionProps | undefined;
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
     * @return {HTMLFieldSetElement} Container element
     */
    public getElement(): HTMLFieldSetElement;
    /**
     * Used to get the content element of the fieldset.
     * @return {HTMLDivElement} Content element
     */
    public getContent(): HTMLDivElement;
}
