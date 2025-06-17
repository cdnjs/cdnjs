/**
 *
 * ListBox is used to select one or more values from a list of items.
 *
 * [Live Demo](https://www.primereact.org/listbox/)
 *
 * @module listbox
 *
 */
import * as React from 'react';
import { ComponentHooks } from '../componentbase/componentbase';
import { InputTextPassThroughOptions } from '../inputtext/inputtext';
import { PassThroughOptions } from '../passthrough';
import { SelectItemOptionsType } from '../selectitem/selectitem';
import { TooltipPassThroughOptions } from '../tooltip/tooltip';
import { TooltipOptions } from '../tooltip/tooltipoptions';
import { IconType, PassThroughType } from '../utils/utils';
import { VirtualScroller, VirtualScrollerPassThroughOptions, VirtualScrollerProps } from '../virtualscroller';

export declare type ListBoxPassThroughType<T> = PassThroughType<T, ListBoxPassThroughMethodOptions>;

/**
 * Custom passthrough(pt) option method.
 */
export interface ListBoxPassThroughMethodOptions {
    props: ListBoxProps;
    state: ListBoxState;
    context: ListBoxContext;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link ListboxProps.pt}
 */
export interface ListboxPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: ListBoxPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the header's DOM element.
     */
    header?: ListBoxPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the filter container's DOM element.
     */
    filterContainer?: ListBoxPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the filter input's DOM element.
     */
    filterInput?: InputTextPassThroughOptions;
    /**
     * Uses to pass attributes to the filter icon's DOM element.
     */
    filterIcon?: ListBoxPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the wrapper's DOM element.
     */
    wrapper?: ListBoxPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the VirtualScroller component.
     * @see {@link VirtualScrollerPassThroughOptions}
     */
    virtualScroller?: VirtualScrollerPassThroughOptions;
    /**
     * Uses to pass attributes to the list's DOM element.
     */
    list?: ListBoxPassThroughType<React.HTMLAttributes<HTMLUListElement>>;
    /**
     * Uses to pass attributes to the item group's DOM element.
     */
    itemGroup?: ListBoxPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the item's DOM element.
     */
    item?: ListBoxPassThroughType<React.HTMLAttributes<HTMLLIElement>>;
    /**
     * Uses to pass attributes to the emptyMessage's DOM element.
     */
    emptyMessage?: ListBoxPassThroughType<React.HTMLAttributes<HTMLLIElement>>;
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
}

/**
 * Defines current inline state in ListBox component.
 */
export interface ListBoxState {
    /**
     * Current filter value state as a string.
     */
    filterValue: string;
}

/**
 * Defines current options in ListBox component.
 */
export interface ListBoxContext {
    /**
     * Current selection state of the item as a boolean.
     * @defaultValue false
     */
    selected: boolean;
    /**
     * Current focused state of the item as a boolean.
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
 * Custom change target options.
 */
interface ListBoxChangeTargetOptions {
    /**
     * The name of the target.
     */
    name: string;
    /**
     * Unique identifier of the element.
     */
    id: string;
    /**
     * New value of the element.
     */
    value: any;
}

/**
 * Custom change event.
 * @see {@link ListBoxProps.onChange}
 * @event
 */
interface ListBoxChangeEvent {
    /**
     * Browser event.
     */
    originalEvent: React.SyntheticEvent;
    /**
     * Single value or an array of values depending on the selection mode
     */
    value: any;
    /**
     * Stops the event from propagating.
     */
    stopPropagation(): void;
    /**
     * Prevents the default action of the event.
     */
    preventDefault(): void;
    /**
     * Target element.
     */
    target: ListBoxChangeTargetOptions;
}

/**
 * Custom filter value change event.
 * @see {@link ListBoxProps.onFilterValueChange}
 * @event
 */
interface ListBoxFilterValueChangeEvent {
    /**
     * Browser event.
     */
    originalEvent: React.SyntheticEvent;
    /**
     * The filtered value
     */
    value: any;
}

/**
 * Custom filter template options.
 */
interface ListBoxFilterTemplateOptions {
    /**
     * Style class of the filter.
     */
    className: string;
    /**
     * Whether the option is disabled or not
     */
    disabled?: boolean;
    /**
     * The filter element.
     */
    element: HTMLDivElement;
    /**
     * The filter.
     */
    filter?: string;
    /**
     * Icon of the filter.
     */
    filterIcon?: IconType<ListBox> | string;
    /**
     * Style class of the filter icon.
     */
    filterIconClassName: string;
    /**
     * Browser change event for the filter input element.
     */
    filterInputChange?: React.ChangeEvent<HTMLInputElement>;
    /**
     * The props of the filter input element.
     */
    filterInputProps?: any;
    /**
     * The filter input options.
     */
    filterOptions?: ListBoxFilterOptions;
    /**
     * The placeholder of the filter element.
     */
    filterPlaceholder?: string;
    /**
     * Custom filter template.
     */
    filterTemplate?: React.ReactNode | ((options: ListBoxFilterTemplateOptions) => React.ReactNode);
}

/**
 * Custom filter options.
 */
interface ListBoxFilterOptions {
    /**
     * Used to filter options
     * @param { React.ChangeEvent<HTMLInputElement>} event - Browser event.
     */
    filter?: (event?: React.ChangeEvent<HTMLInputElement>) => void;
    /**
     * Used to reset the filtered options
     */
    reset?: () => void;
}

/**
 * Defines valid properties in ListBox component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group Properties
 */
export interface ListBoxProps extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'onChange' | 'ref' | 'pt'> {
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
     * A property to uniquely match the value in options for better performance.
     * @defaultValue false
     */
    dataKey?: string | undefined;
    /**
     * When specified, disables the component.
     * @defaultValue false
     */
    disabled?: boolean | undefined;
    /**
     * Text to display when there is no data.
     */
    emptyMessage?: React.ReactNode | ((props: ListBoxProps) => React.ReactNode);
    /**
     * Template to display when filtering does not return any results.
     */
    emptyFilterMessage?: React.ReactNode | ((props: ListBoxProps) => React.ReactNode);
    /**
     * When specified, displays a filter input at header.
     * @defaultValue false
     */
    filter?: boolean | undefined;
    /**
     * When filtering is enabled, filterBy decides which field or fields (comma separated) to search against.
     * @defaultValue label
     */
    filterBy?: string | undefined;
    /**
     * Props for the filter input, any prop is passed implicity to the filter input element.
     * @defaultValue undefined
     */
    filterInputProps?: any | undefined;
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
     * Custom template for the filter element.
     */
    filterTemplate?: React.ReactNode | ((options: ListBoxFilterTemplateOptions) => React.ReactNode);
    /**
     * When specified, filter displays with this value.
     */
    filterValue?: string | undefined;
    /**
     * Custom template for the items.
     */
    itemTemplate?: React.ReactNode | ((option: any) => React.ReactNode);
    /**
     * Inline style class of inner list element.
     */
    listClassName?: string | undefined;
    /**
     * Inline style of inner list element.
     */
    listStyle?: React.CSSProperties | undefined;
    /**
     * When present, it specifies that the component should have invalid state style.
     * @defaultValue false
     */
    invalid?: boolean | undefined;
    /**
     * Defines how multiple items can be selected, when true metaKey needs to be pressed to select or unselect an item and when set to false selection of each item can be toggled individually. On touch enabled devices, metaKeySelection is turned off automatically.
     * @defaultValue true
     */
    metaKeySelection?: boolean | undefined;
    /**
     * When specified, allows selecting multiple values.
     * @defaultValue false
     */
    multiple?: boolean | undefined;
    /**
     * Property name or getter function to use as the disabled flag of an option, defaults to false when not defined.
     */
    optionDisabled?: string | ((option: any) => boolean) | undefined;
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
     * Name of the value field of an option when arbitrary objects are used as options instead of SelectItems.
     */
    optionValue?: string | undefined;
    /**
     * An array of objects to display as the available options.
     */
    options?: SelectItemOptionsType | undefined;
    /**
     * Content of the tooltip.
     */
    tooltip?: string | undefined;
    /**
     * Configuration of the tooltip, refer to the tooltip documentation for more information.
     */
    tooltipOptions?: TooltipOptions | undefined;
    /**
     * Selected value to display.
     */
    value?: any | undefined;
    /**
     * Whether to use the virtualScroller feature. The properties of VirtualScroller component can be used like an object in it.
     * @type {VirtualScrollerProps}
     */
    virtualScrollerOptions?: VirtualScrollerProps | undefined;
    /**
     * Whether to focus on the first visible or selected element.
     * @defaultValue false
     */
    autoOptionFocus?: boolean | undefined;
    /**
     * When enabled, the focused option is selected.
     * @defaultValue false
     */
    selectOnFocus?: boolean | undefined;
    /**
     * When enabled, the focus is placed on the hovered option.
     * @defaultValue true
     */
    focusOnHover?: boolean | undefined;
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {ListboxPassThroughOptions}
     */
    pt?: ListboxPassThroughOptions;
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
     * Callback to invoke when value of listbox changes.
     * @param {ListBoxChangeEvent} event - Custom change event.
     */
    onChange?(event: ListBoxChangeEvent): void;
    /**
     * Callback to invoke when filter value changes.
     * @param {ListBoxFilterValueChangeEvent} event - Custom filter value change event.
     */
    onFilterValueChange?(event: ListBoxFilterValueChangeEvent): void;
}

/**
 * **PrimeReact - ListBox**
 *
 * _ListBox is used to select one or more values from a list of items._
 *
 * [Live Demo](https://www.primereact.org/listbox/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class ListBox extends React.Component<ListBoxProps, any> {
    /**
     * Used to focus the component.
     */
    public focus(): void;
    /**
     * Used to get container element.
     * @return {HTMLSpanElement | null} Container element
     */
    public getElement(): HTMLSpanElement | null;
    /**
     * Used to get the virtual scroller instance.
     * @return {VirtualScroller | null} Virtual Scroller instance
     */
    public getVirtualScroller(): VirtualScroller | null;
}
