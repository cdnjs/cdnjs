/**
 *
 * CascadeSelect is a form component to select a value from a nested structure of options.
 *
 * [Live Demo](https://www.primereact.org/cascadeselect/)
 *
 * @module cascadeselect
 *
 */
import * as React from 'react';
import { CSSTransitionProps } from '../csstransition';
import { SelectItemOptionsType } from '../selectitem/selectitem';

/**
 * Custom change event
 * @see {@link CascadeSelectProps.onChange}
 * @event
 */
interface CascadeSelectChangeEvent {
    /**
     * Browser event
     */
    originalEvent: React.SyntheticEvent;
    /**
     * New value
     */
    value: any;
}

/**
 * Custom group change event.
 * @see {@link CascadeSelectProps.onGroupChange}
 * @extends {CascadeSelectChangeEvent}
 * @event
 */
interface CascadeSelectGroupChangeEvent extends CascadeSelectChangeEvent {}

/**
 * Defines valid properties in CascadeSelect component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group Properties
 */
export interface CascadeSelectProps extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'onChange' | 'ref'> {
    /**
     * Unique identifier of the element.
     */
    id?: string | undefined;
    /**
     * Reference of the input element.
     */
    inputRef?: React.Ref<HTMLInputElement> | undefined;
    /**
     * Inline style of the component.
     */
    style?: React.CSSProperties | undefined;
    /**
     * Style class of the component.
     */
    className?: string | undefined;
    /**
     * Value of the component.
     */
    value?: any;
    /**
     * Name of the input element.
     */
    name?: string | undefined;
    /**
     * An array of selectitems to display as the available options.
     */
    options?: SelectItemOptionsType | undefined;
    /**
     * Property name or getter function to use as the label of an option.
     */
    optionLabel?: string | undefined;
    /**
     * Property name or getter function to use as the value of an option, defaults to the option itself when not defined.
     */
    optionValue?: string | undefined;
    /**
     * Property name or getter function to use as the label of an option group.
     */
    optionGroupLabel?: string | undefined;
    /**
     * Property name or getter function to retrieve the items of a group.
     */
    optionGroupChildren?: string[] | undefined;
    /**
     * Default text to display when no option is selected.
     */
    placeholder?: string | undefined;
    /**
     * The template of items.
     */
    itemTemplate?: React.ReactNode | ((option: any) => React.ReactNode) | undefined;
    /**
     * When present, it specifies that the component should be disabled.
     * @defaultValue false
     */
    disabled?: boolean | undefined;
    /**
     * A property to uniquely identify an option.
     */
    dataKey?: string | undefined;
    /**
     * The breakpoint to define the maximum width boundary when responsiveness is enabled.
     */
    breakpoint?: string | undefined;
    /**
     * Identifier of the underlying input element.
     */
    inputId?: string | undefined;
    /**
     * Index of the element in tabbing order.
     */
    tabIndex?: number | undefined;
    /**
     * Establishes relationships between the component and label(s) where its value should be one or more element IDs.
     */
    ariaLabelledBy?: string | undefined;
    /**
     * DOM element instance where the overlay panel should be mounted. Valid values are any DOM Element and "self". The "self" value is used to render a component where it is located.
     * @defaultValue document.body
     */
    appendTo?: 'self' | HTMLElement | undefined | null;
    /**
     * The properties of CSSTransition can be customized, except for "nodeRef" and "in" properties.
     * @type {CSSTransitionProps}
     */
    transitionOptions?: CSSTransitionProps | undefined;
    /**
     * Icon class of the dropdown icon.
     * @defaultValue pi pi-chevron-down
     */
    dropdownIcon?: string | undefined;
    /**
     * Maximum height of the options panel on responsive mode.
     * @defaultValue 400px
     */
    scrollHeight?: string | undefined;
    /**
     * Callback to invoke on value change
     * @param {CascadeSelectChangeEvent} event - Custom change event
     */
    onChange?(event: CascadeSelectChangeEvent): void;
    /**
     * Callback to invoke when a group changes.
     * @param {CascadeSelectGroupChangeEvent} event - Custom group change event
     */
    onGroupChange?(event: CascadeSelectGroupChangeEvent): void;
    /**
     * Callback to invoke before the overlay is shown.
     */
    onBeforeShow?(): void;
    /**
     * Callback to invoke before the overlay is hidden.
     */
    onBeforeHide?(): void;
    /**
     * Callback to invoke when the overlay is shown.
     */
    onShow?(): void;
    /**
     * Callback to invoke when the overlay is hidden.
     */
    onHide?(): void;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
}

/**
 * **PrimeReact - CascadeSelect**
 *
 * _CascadeSelect is a form component to select a value from a nested structure of options._
 *
 * [Live Demo](https://www.primereact.org/cascadeselect/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class CascadeSelect extends React.Component<CascadeSelectProps, any> {
    /**
     * Used to focus the component.
     */
    public focus(): void;
    /**
     * Used to get container element.
     * @return {HTMLDivElement} Container element
     */
    public getElement(): HTMLDivElement;
    /**
     * Used to get input element.
     * @return {HTMLInputElement} Input element
     */
    public getInput(): HTMLInputElement;
    /**
     * Used to get overlay element.
     * @return {HTMLElement} Overlay element
     */
    public getOverlay(): HTMLElement;
    /**
     * Used to get label element.
     * @return {HTMLSpanElement} Label element
     */
    public getLabel(): HTMLSpanElement;
}
