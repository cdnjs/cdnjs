/**
 *
 * MultiSelect is used to select multiple items from a collection.
 *
 * [Live Demo](https://www.primereact.org/multiselect/)
 *
 * @module multiselect
 *
 */
import * as React from 'react';
import { CSSTransitionProps as ReactCSSTransitionProps } from 'react-transition-group/CSSTransition';
import { CheckboxPassThroughOptions } from '../checkbox/checkbox';
import { ComponentHooks } from '../componentbase/componentbase';
import { CSSTransitionProps } from '../csstransition';
import { PassThroughOptions } from '../passthrough';
import { SelectItemOptionsType } from '../selectitem/selectitem';
import { TooltipPassThroughOptions } from '../tooltip/tooltip';
import { TooltipOptions } from '../tooltip/tooltipoptions';
import { IconType, PassThroughType } from '../utils';
import { VirtualScrollerPassThroughOptions, VirtualScrollerProps } from '../virtualscroller';

export declare type MultiSelectPassThroughType<T> = PassThroughType<T, MultiSelectPassThroughMethodOptions>;
export declare type MultiSelectPassThroughTransitionType = ReactCSSTransitionProps | ((options: MultiSelectPassThroughMethodOptions) => ReactCSSTransitionProps) | undefined;

/**
 * Custom passthrough(pt) option method.
 */
export interface MultiSelectPassThroughMethodOptions {
    props: MultiSelectProps;
    state: MultiSelectState;
    context: MultiSelectContext;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link MultiSelectProps.pt}
 */
export interface MultiSelectPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: MultiSelectPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the input's DOM element.
     */
    input?: MultiSelectPassThroughType<React.HTMLAttributes<HTMLInputElement>>;
    /**
     * Uses to pass attributes to the label container's DOM element.
     */
    labelContainer?: MultiSelectPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the label's DOM element.
     */
    label?: MultiSelectPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the token's DOM element.
     */
    token?: MultiSelectPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the token label's DOM element.
     */
    tokenLabel?: MultiSelectPassThroughType<React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the remove token icon's DOM element.
     */
    removeTokenIcon?: MultiSelectPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the trigger's DOM element.
     */
    trigger?: MultiSelectPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the trigger icon's DOM element.
     */
    triggerIcon?: MultiSelectPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the clear icon's DOM element.
     */
    clearIcon?: MultiSelectPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the dropdown icon's DOM element.
     */
    dropdownIcon?: MultiSelectPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the panel's DOM element.
     */
    panel?: MultiSelectPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the header's DOM element.
     */
    header?: MultiSelectPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the header checkbox's DOM element.
     */
    headerCheckbox?: CheckboxPassThroughOptions;
    /**
     * Uses to pass attributes to the header checkbox's container DOM element.
     */
    headerCheckboxContainer?: MultiSelectPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the header checkbox icon's DOM element.
     */
    headerCheckboxIcon?: MultiSelectPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the header checkbox's DOM element.
     */
    headerSelectAllLabel?: MultiSelectPassThroughType<React.HTMLAttributes<HTMLLabelElement>>;
    /**
     * Uses to pass attributes to the filter container's DOM element.
     */
    filterContainer?: MultiSelectPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the filter input's DOM element.
     */
    filterInput?: MultiSelectPassThroughType<React.HTMLAttributes<HTMLInputElement>>;
    /**
     * Uses to pass attributes to the filter icon's DOM element.
     */
    filterIcon?: MultiSelectPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the close button's DOM element.
     */
    closeButton?: MultiSelectPassThroughType<React.HTMLAttributes<HTMLButtonElement>>;
    /**
     * Uses to pass attributes to the close icon's DOM element.
     */
    closeIcon?: MultiSelectPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the wrapper's DOM element.
     */
    wrapper?: MultiSelectPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the VirtualScroller component.
     * @see {@link VirtualScrollerPassThroughOptions}
     */
    virtualScroller?: VirtualScrollerPassThroughOptions;
    /**
     * Uses to pass attributes to the list's DOM element.
     */
    list?: MultiSelectPassThroughType<React.HTMLAttributes<HTMLUListElement>>;
    /**
     * Uses to pass attributes to the item group's DOM element.
     */
    itemGroup?: MultiSelectPassThroughType<React.HTMLAttributes<HTMLLIElement>>;
    /**
     * Uses to pass attributes to the item's DOM element.
     */
    item?: MultiSelectPassThroughType<React.HTMLAttributes<HTMLLIElement>>;
    /**
     * Uses to pass attributes to the checkbox container's DOM element.
     */
    checkboxContainer?: MultiSelectPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the checkbox's DOM element.
     */
    checkbox?: MultiSelectPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the checkbox icon's DOM element.
     */
    checkboxIcon?: MultiSelectPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the emptyMessage's DOM element.
     */
    emptyMessage?: MultiSelectPassThroughType<React.HTMLAttributes<HTMLLIElement>>;
    /**
     * Uses to pass attributes to the hidden input wrapper's DOM element.
     */
    hiddenInputWrapper?: MultiSelectPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes tooltip's DOM element.
     * @type {TooltipPassThroughOptions}
     */
    tooltip?: TooltipPassThroughOptions;
    /**
     * Used to manage all lifecycle hooks
     * @see {@link ComponentHooks}
     */
    hooks?: ComponentHooks;
    /**
     * Used to control React Transition API.
     */
    transition?: MultiSelectPassThroughTransitionType;
}

/**
 * Defines current inline state in MultiSelect component.
 */
export interface MultiSelectState {
    /**
     * Current focused state as a boolean.
     * @defaultValue false
     */
    focused: boolean;
    /**
     * Current filter state as a string.
     */
    filterState: string;
    /**
     * Current overlay visible state as a boolean.
     * @defaultValue false
     */
    overlayVisible: boolean;
}

/**
 * Defines current options in MultiSelect component.
 */
export interface MultiSelectContext {
    /**
     * Current selection state of the item as a boolean.
     * @defaultValue false
     */
    selected: boolean;
}

/**
 * Custom checkbox change event
 * @see {@link MultiSelectPanelHeaderTemplateEvent.onChange}
 * @event
 */
interface MultiSelectHeaderCheckboxChangeEvent {
    originalEvent: React.FormEvent<HTMLInputElement>;
    checked: boolean;
}

/**
 * Custom multiselect panel header template event.
 */
interface MultiSelectPanelHeaderTemplateEvent {
    /**
     * The class name for the header element.
     */
    className: string;
    /**
     * The checkbox element for selecting items.
     */
    checkboxElement: HTMLElement;
    /**
     * Whether the checkbox is checked.
     */
    checked: boolean;
    /**
     * Callback function when the checkbox state is changed.
     * @param {MultiSelectHeaderCheckboxChangeEvent} event - Custom checkbox change event
     */
    onChange(event: MultiSelectHeaderCheckboxChangeEvent): void;
    /**
     * The element for filtering the items.
     */
    filterElement: JSX.Element;
    /**
     * The close element.
     */
    closeElement: JSX.Element;
    /**
     * The classname for the close element.
     */
    closeElementClassName: string;
    /**
     * The classname for the close icon element.
     */
    closeIconClassName: string;
    /**
     * Callback function when the close button is clicked.
     * @param {React.MouseEvent<HTMLElement>} event - Current param
     */
    onCloseClick(event: React.MouseEvent<HTMLElement>): void;
    /**
     * The default element created by the component.
     */
    element: JSX.Element;
    /**
     * The props of Multiselect component
     */
    props: MultiSelectProps;
}

/**
 * Custom multiselect change target options
 */
interface MultiSelectChangeTargetOptions {
    /**
     * The name of the element.
     */
    name: string;
    /**
     * Unique identifier of the element.
     */
    id: string;
    /**
     * The value of the element.
     */
    value: any;
}

/**
 * Custom change event.
 * @see {@link MultiSelectProps.onChange}
 * @event
 */
interface MultiSelectChangeEvent {
    /**
     * Browser event
     */
    originalEvent: React.SyntheticEvent;
    /**
     * Current selected values
     */
    value: any;
    /**
     * Selected option
     */
    selectedOption?: any;
    /**
     * Stops the event from propagating.
     */
    stopPropagation(): void;
    /**
     * Prevents the default action of the event.
     */
    preventDefault(): void;
    /**
     * Additional information about the event.
     */
    target: MultiSelectChangeTargetOptions;
}

/**
 * Custom remove event when chip is removed.
 * @event
 */
interface MultiSelectRemoveEvent {
    /**
     * Browser event
     */
    originalEvent: React.SyntheticEvent;
    /**
     * Removed item value
     */
    value: any;
}

/**
 * Custom filter event.
 * @see {@link MultiSelectProps.onFilter}
 * @event
 */
interface MultiSelectFilterEvent {
    /**
     * Browser event.
     */
    originalEvent: React.SyntheticEvent;
    /**
     * Filter value.
     */
    filter: string;
}

/**
 * Custom select event.
 * @see {@link MultiSelectProps.onSelectAll}
 * @event
 */
interface MultiSelectAllEvent {
    /**
     * Browser event.
     */
    originalEvent: React.SyntheticEvent;
    /**
     * Whether all data is selected.
     */
    checked: boolean;
}

/**
 * Multiselect filter options
 */
interface MultiSelectFilterOptions {
    /**
     * Used to filter options
     * @param {KeyboardEvent} event - Browser event
     */
    filter?: (event?: KeyboardEvent) => void;
    /**
     * Used to reset the filtered options
     */
    reset?: () => void;
}

/**
 * Custom filter template options.
 */
interface MultiSelectTemplateOptions {
    /**
     * Style class of the filter.
     */
    className: string;
    /**
     * The filter element.
     */
    element: HTMLDivElement;
    /**
     * Style class of the filter icon.
     */
    filterIconClassName: string;
    /**
     * The filter input options.
     */
    filterOptions?: MultiSelectFilterOptions;
    /**
     * The props of multiselect header.
     */
    props?: any;
}

/**
 * Defines valid properties in MultiSelect component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group Properties
 */
export interface MultiSelectProps extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'onChange' | 'ref' | 'pt'> {
    /**
     * DOM element instance where the overlay panel should be mounted. Valid values are any DOM Element and 'self'. The self value is used to render a component where it is located.
     * @defaultValue document.body
     */
    appendTo?: 'self' | HTMLElement | undefined | null | (() => HTMLElement);
    /**
     * Establishes relationships between the component and label(s) where its value should be one or more element IDs.
     */
    ariaLabelledBy?: string | undefined;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
    /**
     * Icon of the checkbox when checked.
     */
    checkboxIcon?: IconType<MultiSelectProps> | undefined;
    /**
     * Style class of the element.
     */
    className?: string | undefined;
    /**
     * Close icon of the multiselect panel header.
     */
    closeIcon?: IconType<MultiSelectProps> | undefined;
    /**
     * Clear icon of the multiselect input.
     */
    clearIcon?: IconType<MultiSelectProps> | undefined;
    /**
     * A property to uniquely match the value in options for better performance.
     */
    dataKey?: string | undefined;
    /**
     * When present, it specifies that the component should be disabled.
     * @defaultValue false
     */
    disabled?: boolean;
    /**
     * Used mode to display the selected item. Valid values are 'comma' and 'chip'.
     * @defaultValue comma
     */
    display?: 'comma' | 'chip' | undefined;
    /**
     * Icon class of the dropdown icon.
     */
    dropdownIcon?: IconType<MultiSelectProps> | undefined;
    /**
     * Template to display when filtering does not return any results.
     * @defaultValue No records found
     */
    emptyFilterMessage?: React.ReactNode | ((props: MultiSelectProps) => React.ReactNode);
    /**
     * Text to display when there are no options available. Defaults to global value in Locale configuration.
     */
    emptyMessage?: string;
    /**
     * When specified, displays an input field to filter the items on keyup.
     * @defaultValue true
     */
    filter?: boolean;
    /**
     * When filtering is enabled, filterBy decides which field or fields (comma separated) to search against.
     * @defaultValue label
     */
    filterBy?: string | undefined;
    /**
     * When the panel is opened, it specifies that the filter input should focus automatically.
     * @defaultValue true
     */
    filterInputAutoFocus?: boolean;
    /**
     * Icon of the filter icon.
     */
    filterIcon?: IconType<MultiSelect> | undefined;
    /**
     * Locale to use in filtering. The default locale is the host environment's current locale.
     * @defaultValue undefined
     */
    filterLocale?: string | undefined;
    /**
     * Defines how the items are filtered, valid values are "contains", (default) "startsWith", "endsWith", "equals" and "notEquals".
     * @defaultValue contains
     */
    filterMatchMode?: 'contains' | 'startsWith' | 'endsWith' | 'equals' | 'notEquals' | undefined;
    /**
     * Placeholder text to show when filter input is empty.
     */
    filterPlaceholder?: string | undefined;
    /**
     * The template of filter element.
     */
    filterTemplate?: React.ReactNode | ((options: MultiSelectTemplateOptions) => React.ReactNode);
    /**
     * Whether to display selected items in the label section or always display the placeholder as the default label.
     * @defaultValue false
     */
    fixedPlaceholder?: boolean;
    /**
     * Use flex layout for the items panel.
     * @defaultValue false
     */
    flex?: boolean;
    /**
     * Unique identifier of the element.
     */
    id?: string | undefined;
    /**
     * Render the items panel inline.
     * @defaultValue false
     */
    inline?: boolean;
    /**
     * Identifier of the focusable input.
     */
    inputId?: string | undefined;
    /**
     * Reference of the input element.
     */
    inputRef?: React.Ref<HTMLSelectElement>;
    /**
     * Style class of the items.
     */
    itemClassName?: string | undefined;
    /**
     * The icon displayed in the header when all checkboxes are checked.
     */
    itemCheckboxIcon?: IconType<MultiSelect> | undefined;
    /**
     * Function that gets the option and returns the content for it.
     */
    itemTemplate?: React.ReactNode | ((option: any) => React.ReactNode);
    /**
     * Displays a loader to indicate data load is in progress.
     * @defaultValue false
     */
    loading?: boolean;
    /**
     * The icon to show while indicating data load is in progress.
     */
    loadingIcon?: IconType<MultiSelectProps> | undefined;
    /**
     * Decides how many selected item labels to show at most.
     */
    maxSelectedLabels?: number | undefined;
    /**
     * Name of the input element.
     */
    name?: string | undefined;
    /**
     * Property name or getter function to use as the disabled flag of an option, defaults to false when not defined.
     */
    optionDisabled?: string | ((option: any) => boolean);
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
    optionGroupTemplate?: React.ReactNode | ((option: any, index: number) => React.ReactNode);
    /**
     * Name of the label field of an option when an arbitrary objects instead of SelectItems are used as options.
     */
    optionLabel?: string | undefined;
    /**
     * Property name or getter function to use as the value of an option, defaults to the option itself when not defined.
     */
    optionValue?: string | undefined;
    /**
     * An array of selectitems to display as the available options.
     */
    options?: SelectItemOptionsType | undefined;
    /**
     * Specifies the visibility of the overlay panel.
     * @defaultValue false
     */
    overlayVisible?: boolean;
    /**
     * Style class of the overlay panel element.
     */
    panelClassName?: string | undefined;
    /**
     * Template of the panel footer.
     */
    panelFooterTemplate?: React.ReactNode | ((props: MultiSelectProps, hide: () => void) => React.ReactNode);
    /**
     * Template of the panel header.
     */
    panelHeaderTemplate?: React.ReactNode | ((event: MultiSelectPanelHeaderTemplateEvent) => React.ReactNode);
    /**
     * Inline style of the overlay panel element.
     */
    panelStyle?: React.CSSProperties | undefined;
    /**
     * Label to display when there are no selections.
     */
    placeholder?: string | undefined;
    /**
     * When present, it specifies that the component should have invalid state style.
     * @defaultValue false
     */
    invalid?: boolean;
    /**
     * Specifies the input variant of the component.
     * @defaultValue outlined
     */
    variant?: 'outlined' | 'filled' | undefined;
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {MultiSelectPassThroughOptions}
     */
    pt?: MultiSelectPassThroughOptions;
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
    /**
     * Icon of the remove chip element.
     */
    removeIcon?: IconType<MultiSelectProps> | undefined;
    /**
     * Clears the filter value when hiding the dropdown.
     * @defaultValue false
     */
    resetFilterOnHide?: boolean;
    /**
     * Height of the viewport in pixels, a scrollbar is defined if height of list exceeds this value.
     * @defaultValue 200px
     */
    scrollHeight?: string | undefined;
    /**
     * Whether all data is selected.
     * @defaultValue false
     */
    selectAll?: boolean;
    /**
     * Function that gets an item in the value and returns the content for it.
     */
    selectedItemTemplate?: React.ReactNode | ((value: any) => React.ReactNode);
    /**
     * Label to display after exceeding max selected labels.
     * @defaultValue {0} items selected
     */
    selectedItemsLabel?: string | undefined;
    /**
     * Number of maximum options that can be selected.
     */
    selectionLimit?: number | undefined;
    /**
     * When enabled, a clear icon is displayed to clear the value.
     * @defaultValue false
     */
    showClear?: boolean;
    /**
     * Whether to show the select all checkbox inside the panel's header.
     * @defaultValue true
     */
    showSelectAll?: boolean;
    /**
     * Label to display if showSelectAll is true
     */
    selectAllLabel?: string;
    /**
     * Inline style of the element.
     */
    style?: React.CSSProperties | undefined;
    /**
     * Index of the element in tabbing order.
     */
    tabIndex?: number | undefined;
    /**
     * When enabled, the focused tab is activated.
     * @defaultValue false
     */
    selectOnFocus?: boolean;
    /**
     * When enabled, the focus is placed on the hovered option.
     * @defaultValue true
     */
    focusOnHover?: boolean;
    /**
     * Whether to focus on the first visible or selected element.
     * @defaultValue false
     */
    autoOptionFocus?: boolean;
    /**
     * Content of the tooltip.
     */
    tooltip?: string | undefined;
    /**
     * Configuration of the tooltip, refer to the tooltip documentation for more information.
     */
    tooltipOptions?: TooltipOptions | undefined;
    /**
     * The properties of CSSTransition can be customized, except for "nodeRef" and "in" properties.
     */
    transitionOptions?: CSSTransitionProps | undefined;
    /**
     * Whether the option should be used as the value for the select element.
     */
    useOptionAsValue?: boolean;
    /**
     * Value of the component.
     */
    value?: any | undefined;
    /**
     * Whether to use the virtualScroller feature. The properties of VirtualScroller component can be used like an object in it.
     */
    virtualScrollerOptions?: VirtualScrollerProps;
    /**
     * Callback to invoke when the element loses focus.
     * @param {React.FocusEvent<HTMLInputElement>} event - Browser event.
     */
    onBlur?(event: React.FocusEvent<HTMLInputElement>): void;
    /**
     * Callback to invoke when value changes.
     * @param {MultiSelectChangeEvent} event - Custom change event.
     */
    onChange?(event: MultiSelectChangeEvent): void;
    /**
     * Callback to invoke on filtering.
     * @param {MultiSelectFilterEvent} event - Custom filter event.
     */
    onFilter?(event: MultiSelectFilterEvent): void;
    /**
     * Callback to invoke when the element receives focus.
     * @param {React.FocusEvent<HTMLInputElement>} event - Browser event.
     */
    onFocus?(event: React.FocusEvent<HTMLInputElement>): void;
    /**
     * Callback to invoke when overlay panel becomes hidden.
     */
    onHide?(): void;
    /**
     * Callback to invoke when a chip is removed.
     * @param {MultiSelectRemoveEvent} event - Custom remove event
     */
    onRemove?(event: MultiSelectRemoveEvent): void;
    /**
     * Callback to invoke when all data is selected.
     * @param {MultiSelectAllEvent} event - Custom select event.
     */
    onSelectAll?(event: MultiSelectAllEvent): void;
    /**
     * Callback to invoke when overlay panel becomes visible.
     */
    onShow?(): void;
}

/**
 * **PrimeReact - MultiSelect**
 *
 * _MultiSelect is used to select multiple items from a collection._
 *
 * [Live Demo](https://www.primereact.org/multiselect/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class MultiSelect extends React.Component<MultiSelectProps, any> {
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
}
