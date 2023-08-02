/**
 *
 * AutoComplete is an input component that provides real-time suggestions while being typed.
 *
 * [Live Demo](https://www.primereact.org/autocomplete/)
 *
 * @module autocomplete
 *
 */
import * as React from 'react';
import { CSSTransitionProps } from '../csstransition';
import { TooltipOptions } from '../tooltip/tooltipoptions';
import { FormEvent } from '../ts-helpers';
import { IconType, PassThroughType } from '../utils';
import { VirtualScroller, VirtualScrollerPassThroughOptions, VirtualScrollerProps } from '../virtualscroller';
import { ButtonPassThroughOptions } from '../button/button';
import { TooltipPassThroughOptions } from '../tooltip/tooltip';

export declare type AutoCompletePassThroughType<T> = PassThroughType<T, AutoCompletePassThroughMethodOptions>;

/**
 * Custom passthrough(pt) option method.
 */
export interface AutoCompletePassThroughMethodOptions {
    props: AutoCompleteProps;
    state: AutoCompleteState;
    context: AutoCompleteContext;
}

/**
 * Custom change event.
 * @see {@link AutoCompleteProps.onChange}
 * @extends {FormEvent}
 * @event
 */
interface AutoCompleteChangeEvent extends FormEvent {}

/**
 * Custom select event.
 * @see {@link AutoCompleteProps.onSelect}
 * @event
 */
interface AutoCompleteSelectEvent {
    /**
     * Browser event
     */
    originalEvent: React.SyntheticEvent;
    /**
     * Selected option value
     */
    value: any;
}

/**
 * Custom unselect event.
 * @see {@link AutoCompleteProps.onUnselect}
 * @extends {AutoCompleteSelectEvent}
 * @event
 */
interface AutoCompleteUnselectEvent extends AutoCompleteSelectEvent {}

/**
 * Custom click event.
 * @see {@link AutoCompleteProps.onDropdownClick}
 * @event
 */
interface AutoCompleteDropdownClickEvent {
    /**
     * Browser event
     */
    originalEvent: React.SyntheticEvent;
    /**
     * Current value of the input field
     */
    query: string;
}

/**
 * Custom complete method event.
 * @see {@link AutoCompleteProps.completeMethod}
 * @event
 */
interface AutoCompleteCompleteEvent {
    /**
     * Browser event
     */
    originalEvent: React.SyntheticEvent;
    /**
     * Value to search with
     */
    query: string;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link AutoCompleteProps.pt}
 */
export interface AutoCompletePassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: AutoCompletePassThroughType<React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    footer?: AutoCompletePassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the input's DOM element.
     */
    input?: AutoCompletePassThroughType<React.HTMLAttributes<HTMLInputElement>>;
    /**
     * Uses to pass attributes to the container's DOM element.
     */
    container?: AutoCompletePassThroughType<React.HTMLAttributes<HTMLUListElement>>;
    /**
     * Uses to pass attributes to the token's DOM element.
     */
    token?: AutoCompletePassThroughType<React.HTMLAttributes<HTMLLIElement>>;
    /**
     * Uses to pass attributes to the token label's DOM element.
     */
    tokenLabel?: AutoCompletePassThroughType<React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the remove token icon's DOM element.
     */
    removeTokenIcon?: AutoCompletePassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the input token's DOM element.
     */
    inputToken?: AutoCompletePassThroughType<React.HTMLAttributes<HTMLLIElement>>;
    /**
     * Uses to pass attributes to the loading icon's DOM element.
     */
    loadingIcon?: AutoCompletePassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the Button component.
     *  @see {@link ButtonPassThroughOptions}
     */
    dropdownButton?: ButtonPassThroughOptions;
    /**
     * Uses to pass attributes to the panel's DOM element.
     */
    panel?: AutoCompletePassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the VirtualScroller component.
     * @see {@link VirtualScrollerPassThroughOptions}
     */
    virtualScroller?: VirtualScrollerPassThroughOptions;
    /**
     * Uses to pass attributes to the list's DOM element.
     */
    list?: AutoCompletePassThroughType<React.HTMLAttributes<HTMLUListElement>>;
    /**
     * Uses to pass attributes to the item group's DOM element.
     */
    itemGroup?: AutoCompletePassThroughType<React.HTMLAttributes<HTMLLIElement>>;
    /**
     * Uses to pass attributes to the item's DOM element.
     */
    item?: AutoCompletePassThroughType<React.HTMLAttributes<HTMLLIElement>>;
    /**
     * Uses to pass attributes to the empty message's DOM element.
     */
    emptyMessage?: AutoCompletePassThroughType<React.HTMLAttributes<HTMLLIElement>>;
    /**
     * Uses to pass attributes tooltip's DOM element.
     * @type {TooltipPassThroughOptions}
     */
    tooltip?: TooltipPassThroughOptions;
}

/**
 * Defines current inline state in AutoComplete component.
 */
export interface AutoCompleteState {
    /**
     * Current id state as a string.
     */
    id: string;
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
     * Current search state as a boolean.
     * @defaultValue false
     */
    searching: boolean;
}

/**
 * Defines current options in AutoComplete component.
 */
export interface AutoCompleteContext {
    /**
     * Current selection state of the item as a boolean.
     * @defaultValue false
     */
    selected: boolean;
}

/**
 * Defines valid properties in AutoComplete component. In addition to these, all properties of HTMLSpanElement can be used in this component.
 * @group Properties
 */
export interface AutoCompleteProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, 'onChange' | 'onSelect' | 'ref'> {
    /**
     * Unique identifier of the element.
     */
    id?: string | undefined;
    /**
     * DOM element instance where the overlay panel should be mounted. Valid values are any DOM Element and "self". The "self" value is used to render a component where it is located.
     * @defaultValue document.body
     */
    appendTo?: 'self' | HTMLElement | undefined | null;
    /**
     * When present, it specifies that the component should automatically get focus on load.
     * @defaultValue false
     */
    autoFocus?: boolean | undefined;
    /**
     * When enabled, highlights the first item in the list by default.
     * @defaultValue false
     */
    autoHighlight?: boolean | undefined;
    /**
     * Style class of the component.
     */
    className?: string | undefined;
    /**
     * Delay between keystrokes to wait before sending a query.
     * @defaultValue 300
     */
    delay?: number | undefined;
    /**
     * When present, it specifies that the component should be disabled.
     * @defaultValue false
     */
    disabled?: boolean | undefined;
    /**
     * Displays a button next to the input field when enabled.
     * @defaultValue false
     */
    dropdown?: boolean | undefined;
    /**
     * ARIA label for the dropdown button. Defaults to placeholder then Locale "choose" label.
     * @defaultValue Choose
     */
    dropdownAriaLabel?: string | undefined;
    /**
     * Focus the input field when the dropdown button is clicked if enabled.
     * @defaultValue true
     */
    dropdownAutoFocus?: boolean | undefined;
    /**
     * Icon of the dropdown.
     */
    dropdownIcon?: IconType<AutoCompleteProps> | undefined;
    /**
     * Specifies the behavior dropdown button. Default "blank" mode sends an empty string and "current" mode sends the input value.
     * @defaultValue blank
     */
    dropdownMode?: 'blank' | 'current' | undefined;
    /**
     * Text to display when there is no data. Defaults to global value in i18n translation configuration.
     * @defaultValue No results found.
     */
    emptyMessage?: string | undefined;
    /**
     * Field of a suggested object to resolve and display.
     */
    field?: string | undefined;
    /**
     * When present, autocomplete clears the manual input if it does not match of the suggestions to force only accepting values from the suggestions.
     * @defaultValue false
     */
    forceSelection?: boolean | undefined;
    /**
     * Style class of the input field.
     */
    inputClassName?: string | undefined;
    /**
     * Identifier of the input element.
     */
    inputId?: string | undefined;
    /**
     * Reference of the input element.
     */
    inputRef?: React.Ref<HTMLInputElement> | undefined;
    /**
     * Inline style of the input field.
     */
    inputStyle?: React.CSSProperties | undefined;
    /**
     * Icon of the loader.
     */
    loadingIcon?: IconType<AutoCompleteProps> | undefined;
    /**
     * Template of a list item.
     */
    itemTemplate?: React.ReactNode | ((suggestion: any, index: number) => React.ReactNode);
    /**
     * Maximum number of characters to initiate a search.
     */
    maxLength?: number | undefined;
    /**
     * Minimum number of characters to initiate a search.
     * @defaultValue 1
     */
    minLength?: number | undefined;
    /**
     * Specifies if multiple values can be selected.
     * @defaultValue false
     */
    multiple?: boolean | undefined;
    /**
     * Number of maximum options that can be selected.
     */
    selectionLimit?: number | undefined;
    /**
     * Name of the input element.
     */
    name?: string | undefined;
    /**
     * Property name or getter function that refers to the children options of option group.
     */
    optionGroupChildren?: string | undefined;
    /**
     * Property name or getter function to use as the label of an option group.
     */
    optionGroupLabel?: string | undefined;
    /**
     * Template of an option group item.
     */
    optionGroupTemplate?: React.ReactNode | ((suggestion: any, index: number) => React.ReactNode);
    /**
     * Style class of the overlay panel element.
     */
    panelClassName?: string | undefined;
    /**
     * Template of the panel footer.
     */
    panelFooterTemplate?: React.ReactNode | ((props: AutoCompleteProps, hide: () => void) => React.ReactNode);
    /**
     * Inline style of the overlay panel element.
     */
    panelStyle?: React.CSSProperties | undefined;
    /**
     * Hint text for the input field.
     */
    placeholder?: string | undefined;
    /**
     * When present, it specifies that the input cannot be typed.
     * @defaultValue false
     */
    readOnly?: boolean | undefined;
    /**
     * Icon of the remove chip element in multiple mode.
     */
    removeTokenIcon?: IconType<AutoCompleteProps> | undefined;
    /**
     * Maximum height of the suggestions panel.
     * @defaultValue 200px
     */
    scrollHeight?: string | undefined;
    /**
     * Template of a selected item.
     */
    selectedItemTemplate?: React.ReactNode | ((value: any) => React.ReactNode);
    /**
     * Whether to show the empty message or not.
     * @defaultValue false
     */
    showEmptyMessage?: boolean | undefined;
    /**
     * Size of the input field.
     */
    size?: number | undefined;
    /**
     * Inline style of the component.
     */
    style?: React.CSSProperties | undefined;
    /**
     * An array of suggestions to display.
     */
    suggestions?: any[];
    /**
     * Index of the element in tabbing order.
     */
    tabIndex?: number | undefined;
    /**
     * Content of the tooltip.
     */
    tooltip?: string | undefined;
    /**
     * Configuration of the tooltip, refer to the tooltip documentation for more information.
     * @type {TooltipOptions}
     */
    tooltipOptions?: TooltipOptions | undefined;
    /**
     * The properties of CSSTransition can be customized, except for "nodeRef" and "in" properties.
     * @type {CSSTransitionProps}
     */
    transitionOptions?: CSSTransitionProps | undefined;
    /**
     * Type of the input element.
     */
    type?: string | undefined;
    /**
     * Value of the component.
     */
    value?: any;
    /**
     * Whether to use the virtualScroller feature. The properties of VirtualScroller component can be used like an object in it.
     * @type {VirtualScrollerProps}
     */
    virtualScrollerOptions?: VirtualScrollerProps | undefined;
    /**
     * Callback to invoke to search for suggestions.
     * @param {AutoCompleteCompleteEvent} event - Custom complete method event.
     */
    completeMethod?(event: AutoCompleteCompleteEvent): void;
    /**
     * Callback to invoke when autocomplete loses focus.
     * @param {React.FocusEvent<HTMLInputElement>} event - Browser event.
     */
    onBlur?(event: React.FocusEvent<HTMLInputElement>): void;
    /**
     * Callback to invoke when autocomplete value changes.
     * @param {AutoCompleteChangeEvent} event - Custom change event.
     */
    onChange?(event: AutoCompleteChangeEvent): void;
    /**
     * Callback to invoke when input is cleared by the user.
     * @param {React.SyntheticEvent} event - Browser event.
     */
    onClear?(event: React.SyntheticEvent): void;
    /**
     * Callback to invoke on click.
     * @param {React.MouseEvent<HTMLElement>} event - Browser event.
     */
    onClick?(event: React.MouseEvent<HTMLElement>): void;
    /**
     * Callback to invoke on right-click.
     * @param {React.MouseEvent<HTMLElement>} event - Browser event.
     */
    onContextMenu?(event: React.MouseEvent<HTMLElement>): void;
    /**
     * Callback to invoke on double click.
     * @param {React.MouseEvent<HTMLElement>} event - Browser event.
     */
    onDblClick?(event: React.MouseEvent<HTMLElement>): void;
    /**
     * Callback to invoke to when dropdown button is clicked.
     * @param {AutoCompleteDropdownClickEvent} event - Custom click event.
     */
    onDropdownClick?(event: AutoCompleteDropdownClickEvent): void;
    /**
     * Callback to invoke when autocomplete gets focus.
     * @param {React.FocusEvent<HTMLInputElement>} event - Browser event.
     */
    onFocus?(event: React.FocusEvent<HTMLInputElement>): void;
    /**
     * Callback to invoke when overlay panel becomes hidden.
     */
    onHide?(): void;
    /**
     * Callback to invoke to when a key is pressed.
     * @param {React.KeyboardEvent<HTMLInputElement>} event - Browser event.
     */
    onKeyPress?(event: React.KeyboardEvent<HTMLInputElement>): void;
    /**
     * Callback to invoke to when a key is released.
     * @param {React.KeyboardEvent<HTMLInputElement>} event - Browser event.
     */
    onKeyUp?(event: React.KeyboardEvent<HTMLInputElement>): void;
    /**
     * Callback to invoke to when a mouse button is pressed.
     * @param {React.MouseEvent<HTMLElement>} event - Browser event.
     */
    onMouseDown?(event: React.MouseEvent<HTMLElement>): void;
    /**
     * Callback to invoke when a suggestion is selected.
     * @param {AutoCompleteSelectEvent} event - Custom select event.
     */
    onSelect?(event: AutoCompleteSelectEvent): void;
    /**
     * Callback to invoke when overlay panel becomes visible.
     */
    onShow?(): void;
    /**
     * Callback to invoke when a selected value is removed.
     * @param {AutoCompleteUnselectEvent} event - Custom unselect event.
     */
    onUnselect?(event: AutoCompleteUnselectEvent): void;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {AutoCompletePassThroughOptions}
     */
    pt?: AutoCompletePassThroughOptions;
}

/**
 * **PrimeReact - AutoComplete**
 *
 * _AutoComplete is an input component that provides real-time suggestions while being typed._
 *
 * [Live Demo](https://www.primereact.org/autocomplete/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class AutoComplete extends React.Component<AutoCompleteProps, any> {
    /**
     * Used to show the overlay.
     */
    public show(): void;
    /**
     * Used to hide the overlay.
     */
    public hide(): void;
    /**
     * Used to focus the component.
     */
    public focus(): void;
    /**
     * Used to search new suggestions.
     * @param {React.SyntheticEvent} event - Browser event.
     * @param {string} query - Value to search with.
     * @param {string} [source] - Source type, valid values are 'dropdown' and 'input'
     */
    public search(event: React.SyntheticEvent, query: string, source?: 'dropdown' | 'input' | null | undefined): void;
    /**
     * Used to get container element.
     * @return {HTMLSpanElement} Container element
     */
    public getElement(): HTMLSpanElement;
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
     * Used to get the options of inline virtualScroller component.
     * @return {VirtualScroller} VirtualScroller component
     */
    public getVirtualScroller(): VirtualScroller;
}
