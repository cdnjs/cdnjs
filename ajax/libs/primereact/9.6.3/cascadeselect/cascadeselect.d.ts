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
import { IconType, PassThroughType } from '../utils/utils';

export declare type CascadeSelectPassThroughType<T> = PassThroughType<T, CascadeSelectPassThroughMethodOptions>;

/**
 * Custom passthrough(pt) option method.
 */
export interface CascadeSelectPassThroughMethodOptions {
    props: CascadeSelectProps;
    state: CascadeSelectState;
}

/**
 * Defines current inline state in CascadeSelect component.
 */
export interface CascadeSelectState {
    /**
     * Current focused state as a boolean.
     * @defaultValue false
     */
    focused: boolean;
    /**
     * Current overlay visible state as a boolean.
     * @defaultValue false
     */
    overlayVisible: boolean;
    /**
     * Current overlay attributeSelector state as a string.
     */
    attributeSelector: string;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link CascadeSelectProps.pt}
 */
export interface CascadeSelectPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: CascadeSelectPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the input's DOM element.
     */
    input?: CascadeSelectPassThroughType<React.HTMLAttributes<HTMLInputElement>>;
    /**
     * Uses to pass attributes to the label's DOM element.
     */
    label?: CascadeSelectPassThroughType<React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the dropdown button's DOM element.
     */
    dropdownButton?: CascadeSelectPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the dropdown icon's DOM element.
     */
    dropdownIcon?: CascadeSelectPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the panel's DOM element.
     */
    panel?: CascadeSelectPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the wrapper's DOM element.
     */
    wrapper?: CascadeSelectPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the list's DOM element.
     */
    list?: CascadeSelectPassThroughType<React.HTMLAttributes<HTMLUListElement>>;
    /**
     * Uses to pass attributes to the item's DOM element.
     */
    item?: CascadeSelectPassThroughType<React.HTMLAttributes<HTMLLIElement>>;
    /**
     * Uses to pass attributes to the content's DOM element.
     */
    content?: CascadeSelectPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the optionGroup icon's DOM element.
     */
    optionGroupIcon?: CascadeSelectPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the text's DOM element.
     */
    text?: CascadeSelectPassThroughType<React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the hidden selected message's DOM element.
     */
    hiddenSelectedMessage?: CascadeSelectPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
}

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
     * When present, it specifies that the component should automatically get focus on load.
     * @defaultValue false
     */
    autoFocus?: boolean | undefined;
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
     * Icon of the option group.
     */
    optionGroupIcon?: IconType<CascadeSelectProps> | undefined;
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
     * Icon of the dropdown icon.
     */
    dropdownIcon?: IconType<CascadeSelectProps> | undefined;
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
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {CascadeSelectPassThroughOptions}
     */
    pt?: CascadeSelectPassThroughOptions;
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
