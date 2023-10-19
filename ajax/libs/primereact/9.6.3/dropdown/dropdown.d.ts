/**
 *
 * Dropdown also known as Select, is used to choose an item from a collection of options.
 *
 * [Live Demo](https://www.primereact.org/dropdown/)
 *
 * @module dropdown
 *
 */
import * as React from 'react';
import { CSSTransitionProps } from '../csstransition';
import { SelectItemOptionsType } from '../selectitem/selectitem';
import { TooltipPassThroughOptions } from '../tooltip/tooltip';
import { TooltipOptions } from '../tooltip/tooltipoptions';
import { FormEvent } from '../ts-helpers';
import { IconType, PassThroughType } from '../utils';
import { VirtualScroller, VirtualScrollerPassThroughOptions, VirtualScrollerProps } from '../virtualscroller';

export declare type DropdownPassThroughType<T> = PassThroughType<T, DropdownPassThroughMethodOptions>;

/**
 * Custom passthrough(pt) option method.
 */
export interface DropdownPassThroughMethodOptions {
    props: DropdownProps;
    state: DropdownState;
    context: DropdownContext;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link DropdownProps.pt}
 */
export interface DropdownPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: DropdownPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the input's DOM element.
     */
    input?: DropdownPassThroughType<React.HTMLAttributes<HTMLInputElement>>;
    /**
     * Uses to pass attributes to the clear icon's DOM element.
     */
    clearIcon?: DropdownPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the trigger' DOM element.
     */
    trigger?: DropdownPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the panel's DOM element.
     */
    panel?: DropdownPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the footer's DOM element.
     */
    footer?: DropdownPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the header's DOM element.
     */
    header?: DropdownPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the filter container's DOM element.
     */
    filterContainer?: DropdownPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the filter input's DOM element.
     */
    filterInput?: DropdownPassThroughType<React.HTMLAttributes<HTMLInputElement>>;
    /**
     * Uses to pass attributes to the filter icon's DOM element.
     */
    filterIcon?: DropdownPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the wrapper's DOM element.
     */
    wrapper?: DropdownPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the VirtualScroller component.
     * @see {@link VirtualScrollerPassThroughOptions}
     */
    virtualScroller?: VirtualScrollerPassThroughOptions;
    /**
     * Uses to pass attributes to the list's DOM element.
     */
    list?: DropdownPassThroughType<React.HTMLAttributes<HTMLUListElement>>;
    /**
     * Uses to pass attributes to the item group's DOM element.
     */
    itemGroup?: DropdownPassThroughType<React.HTMLAttributes<HTMLLIElement>>;
    /**
     * Uses to pass attributes to the item's DOM element.
     */
    item?: DropdownPassThroughType<React.HTMLAttributes<HTMLLIElement>>;
    /**
     * Uses to pass attributes to the empty message's DOM element.
     */
    emptyMessage?: DropdownPassThroughType<React.HTMLAttributes<HTMLLIElement>>;
    /**
     * Uses to pass attributes to the select's DOM element.
     */
    select?: DropdownPassThroughType<React.HTMLAttributes<HTMLSelectElement>>;
    /**
     * Uses to pass attributes to the option's DOM element.
     */
    option?: DropdownPassThroughType<React.HTMLAttributes<HTMLOptionElement>>;
    /**
     * Uses to pass attributes tooltip's DOM element.
     * @type {TooltipPassThroughOptions}
     */
    tooltip?: TooltipPassThroughOptions;
    /**
     * Uses to pass attributes to the hidden selected message's DOM element.
     */
    hiddenSelectedMessage?: DropdownPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
}

/**
 * Defines current inline state in Dropdown component.
 */
export interface DropdownState {
    /**
     * Current focused state as a boolean.
     * @defaultValue false
     */
    focused: boolean;
    /**
     * Current filter state as a string.
     */
    filter: string;
    /**
     * Current overlay visible state as a boolean.
     * @defaultValue false
     */
    overlayVisible: boolean;
}

/**
 * Defines current options in Dropdown component.
 */
export interface DropdownContext {
    /**
     * Current selection state of the item as a boolean.
     * @defaultValue false
     */
    selected: boolean;
    /**
     * Current focus state of the item as a boolean.
     * @defaultValue false
     */
    focused: boolean;
    /**
     * Current disabled state of the item as a boolean.
     * @defaultValue false
     */
    disabled: boolean;
}

/**
 * Custom change event.
 * @see {@link DropdownProps.onChange}
 * @extends {FormEvent}
 * @event
 */
interface DropdownChangeEvent extends FormEvent {}

/**
 * Custom filter event
 * @see {@link DropdownProps.onFilter}
 * @event
 */
interface DropdownFilterEvent {
    /**
     * Browser event
     */
    originalEvent: React.SyntheticEvent;
    /**
     * Filter value
     */
    filter: string;
}

/**
 * Custom filter options
 * @see {@link DropdownProps.filterTemplate}
 * @deprecated Since v9.3.0
 */
interface DropdownFilterOptions {
    /**
     * Used to filter options
     * @param {React.KeyboardEvent<HTMLElement>} event - Browser event
     */
    filter?: (event?: React.KeyboardEvent<HTMLElement>) => void;
    /**
     * Used to reset the filtered options
     */
    reset?: () => void;
}

/**
 * Defines valid properties in Dropdown component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group Properties
 */
export interface DropdownProps extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'onChange' | 'ref'> {
    /**
     * DOM element instance where the overlay panel should be mounted. Valid values are any DOM Element and "self". The "self" value is used to render a component where it is located.
     * @defaultValue document.body
     */
    appendTo?: 'self' | HTMLElement | undefined | null;
    /**
     * Used to define a string that labels the component.
     */
    ariaLabel?: string | undefined;
    /**
     * Establishes relationships between the component and label(s) where its value should be one or more element IDs.
     */
    ariaLabelledBy?: string | undefined;
    /**
     * When present, it specifies that the component should automatically get focus on load.
     * @defaultValue false
     */
    autoFocus?: boolean | undefined;
    /**
     * Style class of the component.
     */
    className?: string | undefined;
    /**
     * Icon of the dropdown.
     */
    clearIcon?: IconType<DropdownProps> | undefined;
    /**
     * A property to uniquely match the value in options for better performance.
     */
    dataKey?: string | undefined;
    /**
     * When present, it specifies that the component should be disabled.
     * @defaultValue false
     */
    disabled?: boolean | undefined;
    /**
     * Icon of the dropdown.
     */
    dropdownIcon?: IconType<DropdownProps> | undefined;
    /**
     * When present, custom value instead of predefined options can be entered using the editable input field.
     * @defaultValue false
     */
    editable?: boolean | undefined;
    /**
     * Template to display when filtering does not return any results.
     * @defaultValue No available options
     */
    emptyFilterMessage?: React.ReactNode | ((props: DropdownProps) => React.ReactNode) | undefined;
    /**
     * Text to display when there are no options available.
     * @defaultValue No results found
     */
    emptyMessage?: React.ReactNode | ((props: DropdownProps) => React.ReactNode) | undefined;
    /**
     * When specified, displays an input field to filter the items on keyup.
     * @defaultValue false
     */
    filter?: boolean | undefined;
    /**
     * Icon of the filter to search.
     */
    filterIcon?: IconType<DropdownProps> | undefined;
    /**
     * When filtering is enabled, filterBy decides which field or fields (comma separated) to search against.
     * @defaultValue label
     */
    filterBy?: 'label' | string | undefined;
    /**
     * Icon of the filter to clear.
     */
    filterClearIcon?: IconType<DropdownProps> | undefined;
    /**
     * When the panel is opened, it specifies that the filter input should focus automatically.
     * @defaultValue true
     */
    filterInputAutoFocus?: boolean | undefined;
    /**
     * Locale to use in filtering. The default locale is the host environment's current locale.
     */
    filterLocale?: string | undefined;
    /**
     * Defines how the items are filtered.
     * @defaultValue contains
     */
    filterMatchMode?: 'contains' | 'startsWith' | 'endsWith' | 'equals' | 'notEquals' | undefined;
    /**
     * Placeholder text to show when filter input is empty.
     */
    filterPlaceholder?: string | undefined;
    /**
     * The template of filter element.
     * @deprecated Since v9.3.0
     */
    filterTemplate?: React.ReactNode | ((options: { filterOptions: DropdownFilterOptions }) => React.ReactNode) | undefined;
    /**
     * Reference of the focusable input element.
     */
    focusInputRef?: React.Ref<HTMLInputElement> | undefined;
    /**
     * Unique identifier of the element.
     */
    id?: string | undefined;
    /**
     * Identifier of the focusable input.
     */
    inputId?: string | undefined;
    /**
     * Reference of the input element.
     */
    inputRef?: React.Ref<HTMLSelectElement> | undefined;
    /**
     * The template of items.
     */
    itemTemplate?: React.ReactNode | ((option: any) => React.ReactNode) | undefined;
    /**
     * Maximum number of characters to be typed on an editable input.
     */
    maxLength?: number | undefined;
    /**
     * Name of the input element.
     */
    name?: string | undefined;
    /**
     * Property name or getter function to use as the disabled flag of an option, defaults to false when not defined.
     */
    optionDisabled?: string | ((option: any) => boolean) | undefined;
    /**
     * Property name or getter function that refers to the children options of option group.
     * @defaultValue items
     */
    optionGroupChildren?: string | undefined;
    /**
     * Property name or getter function to use as the label of an option group.
     */
    optionGroupLabel?: string | undefined;
    /**
     * Template of an option group item.
     */
    optionGroupTemplate?: React.ReactNode | ((option: any, index: number) => React.ReactNode) | undefined;
    /**
     * Name of the label field of an option when arbitrary objects are used as options instead of SelectItems.
     */
    optionLabel?: string | undefined;
    /**
     * Name of the value field of an option when arbitrary objects are used as options instead of SelectItems.
     */
    optionValue?: string | undefined;
    /**
     * An array of selectitems to display as the available options.
     * @type {SelectItemOptionsType}
     */
    options?: SelectItemOptionsType | undefined;
    /**
     * Style class of the overlay panel element.
     */
    panelClassName?: string | undefined;
    /**
     * Template of the panel footer.
     */
    panelFooterTemplate?: React.ReactNode | ((props: DropdownProps, hide: () => void) => React.ReactNode);
    /**
     * Inline style of the overlay panel element.
     */
    panelStyle?: React.CSSProperties | undefined;
    /**
     * Default text to display when no option is selected.
     */
    placeholder?: string | undefined;
    /**
     * When present, it specifies that an input field must be filled out before submitting the form.
     * @defaultValue false
     */
    required?: boolean | undefined;
    /**
     * Clears the filter value when hiding the dropdown.
     * @defaultValue false
     */
    resetFilterOnHide?: boolean | undefined;
    /**
     * Height of the viewport in pixels, a scrollbar is defined if height of list exceeds this value.
     * @defaultValue 200px
     */
    scrollHeight?: string | undefined;
    /**
     * When enabled, a clear icon is displayed to clear the value.
     * @defaultValue false
     */
    showClear?: boolean | undefined;
    /**
     * When enabled, a clear icon is displayed to clear the filtered value.
     * @defaultValue false
     */
    showFilterClear?: boolean | undefined;
    /**
     * When enabled, overlay panel will be visible with input focus.
     * @defaultValue false
     */
    showOnFocus?: boolean | undefined;
    /**
     * Inline style of the element.
     */
    style?: React.CSSProperties | undefined;
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
     * Value of the component.
     */
    value?: any;
    /**
     * The template of selected item.
     */
    valueTemplate?: React.ReactNode | ((option: any, props: DropdownProps) => React.ReactNode) | undefined;
    /**
     * Whether to use the virtualScroller feature. The properties of VirtualScroller component can be used like an object in it.
     * @type {VirtualScrollerProps}
     */
    virtualScrollerOptions?: VirtualScrollerProps | undefined;
    /**
     * Callback to invoke on value change
     * @param {DropdownChangeEvent} event - Custom change event
     */
    onChange?(event: DropdownChangeEvent): void;
    /**
     * Callback to invoke when the element receives focus.
     * @param {React.FocusEvent<HTMLInputElement>} event - Browser event
     */
    onFocus?(event: React.FocusEvent<HTMLInputElement>): void;
    /**
     * Callback to invoke when the element loses focus.
     * @param {React.FocusEvent<HTMLInputElement>} event - Browser event
     */
    onBlur?(event: React.FocusEvent<HTMLInputElement>): void;
    /**
     * Callback to invoke to when a mouse button is pressed.
     * @param {React.MouseEvent<HTMLElement>} event - Browser event
     */
    onMouseDown?(event: React.MouseEvent<HTMLElement>): void;
    /**
     * Callback to invoke on right-click.
     * @param {React.MouseEvent<HTMLElement>} event - Browser event
     */
    onContextMenu?(event: React.MouseEvent<HTMLElement>): void;
    /**
     * Callback to invoke when the overlay is shown.
     */
    onShow?(): void;
    /**
     * Callback to invoke when the overlay is hidden.
     */
    onHide?(): void;
    /**
     * Callback to invoke when the value is filtered.
     * @param {DropdownFilterEvent} event - Custom filter event
     */
    onFilter?(event: DropdownFilterEvent): void;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {DropdownPassThroughOptions}
     */
    pt?: DropdownPassThroughOptions;
}

/**
 * **PrimeReact - Dropdown**
 *
 * _Dropdown also known as Select, is used to choose an item from a collection of options._
 *
 * [Live Demo](https://www.primereact.org/dropdown/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class Dropdown extends React.Component<DropdownProps, any> {
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
     * Used to get focusable input element.
     * @return {HTMLInputElement} Input element
     */
    public getFocusInput(): HTMLInputElement;
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
