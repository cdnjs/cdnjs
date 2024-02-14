/**
 *
 * PickList is used to reorder items between different lists.
 *
 * [Live Demo](https://www.primereact.org/picklist/)
 *
 * @module picklist
 *
 */
import * as React from 'react';
import { ButtonPassThroughOptions } from '../button/button';
import { ComponentHooks } from '../componentbase/componentbase';
import { PassThroughOptions } from '../passthrough';
import { IconType, PassThroughType } from '../utils/utils';

export declare type PickListPassThroughType<T> = PassThroughType<T, PickListPassThroughMethodOptions>;

/**
 * Custom passthrough(pt) option method.
 */
export interface PickListPassThroughMethodOptions {
    props: PickListProps;
    state: PickListState;
    context: PickListContext;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link PickListProps.pt}
 */
export interface PickListPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: PickListPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the source controls' DOM element.
     */
    controls?: PickListPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the Button component.
     */
    moveUpButton?: ButtonPassThroughOptions;
    /**
     * Uses to pass attributes to the Button component.
     */
    moveTopButton?: ButtonPassThroughOptions;
    /**
     * Uses to pass attributes to the Button component.
     */
    moveDownButton?: ButtonPassThroughOptions;
    /**
     * Uses to pass attributes to the Button component.
     */
    moveBottomButton?: ButtonPassThroughOptions;
    /**
     * Uses to pass attributes to the source wrapper's DOM element.
     */
    listWrapper?: PickListPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the source header's DOM element.
     */
    header?: PickListPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the buttons' DOM element.
     */
    buttons?: PickListPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the Button component.
     */
    moveToTargetButton?: ButtonPassThroughOptions;
    /**
     * Uses to pass attributes to the Button component.
     */
    moveAllToTargetButton?: ButtonPassThroughOptions;
    /**
     * Uses to pass attributes to the Button component.
     */
    moveToSourceButton?: ButtonPassThroughOptions;
    /**
     * Uses to pass attributes to the Button component.
     */
    moveAllToSourceButton?: ButtonPassThroughOptions;
    /**
     * Uses to pass attributes to the buttons' DOM element.
     */
    filterIcon?: PickListPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the buttons' DOM element.
     */
    filter?: PickListPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the buttons' DOM element.
     */
    filterInput?: PickListPassThroughType<React.HTMLAttributes<HTMLInputElement>>;
    /**
     * Uses to pass attributes to the buttons' DOM element.
     */
    filterContainer?: PickListPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the buttons' DOM element.
     */
    item?: PickListPassThroughType<React.HTMLAttributes<HTMLLIElement>>;
    /**
     * Uses to pass attributes to the buttons' DOM element.
     */
    list?: PickListPassThroughType<React.HTMLAttributes<HTMLUListElement>>;
    /**
     * Used to manage all lifecycle hooks
     * @see {@link ComponentHooks}
     */
    hooks?: ComponentHooks;
}

export interface PickListState {
    /**
     * Current source selection state as a [].
     */
    sourceSelection: [];
    /**
     * Current target selection state as a [].
     */
    targetSelection: [];
    /**
     * Current source filter state as a string.
     */
    sourceFilterValue: string;
    /**
     * Current source target filter state as a string.
     */
    targetFilterValue: string;
    /**
     * Current attribute selector state as a any.
     */
    attributeSelector: any;
}

/**
 * Defines current options in PickList component.
 */
export interface PickListContext {
    /**
     * Current selection state of the item as a boolean.
     */
    selected: boolean;
}

/**
 * Custom picklist event.
 * @see {@link PickListProps.onMoveToSource},
 *  {@link PickListProps.onMoveAllToSource},
 *  {@link PickListProps.onMoveToTarget},
 *  {@link PickListProps.onMoveAllToTarget},
 *  {@link PickListProps.onSourceSelectionChange},
 *  {@link PickListProps.onTargetSelectionChange}
 *  {@link PickListProps.onSourceFilterChange},
 *  {@link PickListProps.onTargetFilterChange},
 * @event
 */
interface PickListEvent {
    /**
     * Browser event.
     */
    originalEvent: React.SyntheticEvent;
    /**
     * Moved items
     */
    value: any;
}

/**
 * Custom picklist event.
 * @see {@link PickListProps.onChange}
 * @event
 */
interface PickListChangeEvent {
    /**
     * Browser event.
     */
    originalEvent: React.SyntheticEvent;
    /**
     * Source list
     */
    source: any;
    /**
     * Target list
     */
    target: any;
}

/**
 * Custom filter template options.
 */
interface PickListFilterTemplateOptions {
    /**
     * Style class of the filter.
     */
    className: string;
    /**
     * Props of the filter input.
     */
    inputProps: PickListFilterInputProps;
    /**
     * Style class of the filter icon.
     */
    iconClassName: string;
    /**
     * The JSX element that represents the picklist filter.
     */
    element: React.ReactNode;
    /**
     * The props of the PickList component.
     */
    props: PickListProps;
}

/**
 * Custom filter input props.
 */
interface PickListFilterInputProps {
    /**
     * Style class of the filter input.
     */
    className: string;
    /**
     * Filter change callback.
     * @param {React.SyntheticEvent} event - Browser event.
     */
    onChange(event: React.SyntheticEvent): void;
    /**
     * Callback function to be invoked when the keydown event.
     * @param {React.SyntheticEvent} event - Browser event.
     */
    onKeyDown(event: React.SyntheticEvent): void;
}

/**
 * Defines valid properties in PickList component.
 * @group Properties
 */
export interface PickListProps {
    /**
     * Unique identifier of the element.
     */
    id?: string | undefined;
    /**
     * An array of objects for the source list.
     */
    source?: any[] | undefined;
    /**
     * An array of objects for the target list.
     */
    target?: any[] | undefined;
    /**
     * Template for the source list caption.
     */
    sourceHeader?: React.ReactNode | undefined;
    /**
     * Template for the target list caption.
     */
    targetHeader?: React.ReactNode | undefined;
    /**
     * Inline style of the element.
     */
    style?: React.CSSProperties | undefined;
    /**
     * Style class of the element.
     */
    className?: string | undefined;
    /**
     * Callback to invoke when menu receives focus.
     * @param {React.SyntheticEvent} event - Browser event.
     */
    onFocus?(event: React.SyntheticEvent): void;
    /**
     * Callback to invoke when menu loses focus.
     * @param {React.SyntheticEvent} event - Browser event.
     */
    onBlur?(event: React.SyntheticEvent): void;
    /**
     * Inline style of the source list element.
     */
    sourceStyle?: React.CSSProperties | undefined;
    /**
     * Inline style of the target list element.
     */
    targetStyle?: React.CSSProperties | undefined;
    /**
     * Selected item in the source list.
     */
    sourceSelection?: any | undefined;
    /**
     * Selected items in the target list.
     */
    targetSelection?: any | undefined;
    /**
     * Whether to show buttons of source list.
     * @defaultValue true
     */
    showSourceControls?: boolean | undefined;
    /**
     * Whether to show buttons of target list.
     * @defaultValue true
     */
    showTargetControls?: boolean | undefined;
    /**
     * Defines how multiple items can be selected, when true metaKey needs to be pressed to select or unselect an item and when set to false selection of each item can be toggled individually. On touch enabled devices, metaKeySelection is turned off automatically.
     * @defaultValue true
     */
    metaKeySelection?: boolean | undefined;
    /**
     * When specified, displays an input field to filter the items on keyup.
     * @defaultValue false
     */
    filter?: boolean | undefined;
    /**
     * Icon of the target list filter.
     */
    targetFilterIcon?: IconType<PickListProps> | undefined;
    /**
     * Icon of the source list filter.
     */
    sourceFilterIcon?: IconType<PickListProps> | undefined;
    /**
     * Icon for moving all items to the source list.
     */
    moveAllToSourceIcon?: IconType<PickListProps> | undefined;
    /**
     * Icon for moving an item to the source list.
     */
    moveToSourceIcon?: IconType<PickListProps> | undefined;
    /**
     * Icon for moving all items to the target list.
     */
    moveAllToTargetIcon?: IconType<PickListProps> | undefined;
    /**
     * Icon for moving an item to the target list.
     */
    moveToTargetIcon?: IconType<PickListProps> | undefined;
    /**
     * Icon of the move up icon.
     */
    moveUpIcon?: IconType<PickListProps> | undefined;
    /**
     * Icon of the move top icon.
     */
    moveTopIcon?: IconType<PickListProps> | undefined;
    /**
     * Icon of the move down icon.
     */
    moveDownIcon?: IconType<PickListProps> | undefined;
    /**
     * Icon of the move bottom icon.
     */
    moveBottomIcon?: IconType<PickListProps> | undefined;
    /**
     * When specified displays an input field to filter the items on keyup and decides which field to search (Accepts multiple fields with a comma).
     */
    filterBy?: string | undefined;
    /**
     * 	Defines how the items are filtered, valid values are "contains" (default) "startsWith", "endsWith", "equals", "notEquals", "in", "lt", "lte", "gt" and "gte".
     * @defaultValue contains
     */
    filterMatchMode?: string | undefined;
    /**
     * Locale to use in filtering. The default locale is the host environment's current locale.
     * @defaultValue undefined
     */
    filterLocale?: string | undefined;
    /**
     * Filter value in the target list.
     */
    sourceFilterValue?: string | undefined;
    /**
     * Filter value in the source list.
     */
    targetFilterValue?: string | undefined;
    /**
     * Whether to show filter input for source list when filterBy is enabled.
     * @defaultValue true
     */
    showSourceFilter?: boolean | undefined;
    /**
     * Whether to show filter input for target list when filterBy is enabled.
     * @defaultValue true
     */
    showTargetFilter?: boolean | undefined;
    /**
     * Placeholder text on source filter input.
     */
    sourceFilterPlaceholder?: string | undefined;
    /**
     * Placeholder text on target filter input.
     */
    targetFilterPlaceholder?: string | undefined;
    /**
     * Template for the source filter content.
     */
    sourceFilterTemplate?: React.ReactNode | ((options: PickListFilterTemplateOptions) => React.ReactNode) | undefined;
    /**
     * Placeholder text on target filter input.
     */
    targetFilterTemplate?: React.ReactNode | ((options: PickListFilterTemplateOptions) => React.ReactNode) | undefined;
    /**
     * Index of the element in tabbing order.
     */
    tabIndex?: number | undefined;
    /**
     * Name of the field that uniquely identifies the a record in the data.
     */
    dataKey: string;
    /**
     * The breakpoint to define the maximum width boundary when responsiveness is enabled.
     * @defaultValue '960px'.
     */
    breakpoint?: string | undefined;
    /**
     * Template that gets the options for both source and target items and returns the content for it. Useful if you want the same template for both lists else use the custom sourceItemTemplate or targetItemTemplate properties.
     */
    itemTemplate?: React.ReactNode | ((item: any) => React.ReactNode) | undefined;
    /**
     * Template that gets the options for the source items and returns the content for it.
     */
    sourceItemTemplate?: React.ReactNode | ((item: any) => React.ReactNode) | undefined;
    /**
     * Template that gets the options for the target items and returns the content for it.
     */
    targetItemTemplate?: React.ReactNode | ((item: any) => React.ReactNode) | undefined;
    /**
     * Callback to invoke when items are moved from source to target.
     * @param {PickListChangeEvent} event - Custom change event.
     */
    onChange?(event: PickListChangeEvent): void;
    /**
     * Callback to invoke when items are moved from target to source.
     * @param {PickListEvent} event - Custom picklist event.
     */
    onMoveToSource?(event: PickListEvent): void;
    /**
     * Callback to invoke when all items are moved from target to source.
     * @param {PickListEvent} event - Custom picklist event.
     */
    onMoveAllToSource?(event: PickListEvent): void;
    /**
     * Callback to invoke when items are moved from source to target.
     * @param {PickListEvent} event - Custom picklist event.
     */
    onMoveToTarget?(event: PickListEvent): void;
    /**
     * Callback to invoke when all items are moved from source to target.
     * @param {PickListEvent} event - Custom picklist event.
     */
    onMoveAllToTarget?(event: PickListEvent): void;
    /**
     * Callback to invoke when items are selected within source list.
     * @param {PickListEvent} event - Custom picklist event.
     */
    onSourceSelectionChange?(event: PickListEvent): void;
    /**
     * Callback to invoke when items are selected within target list.
     * @param {PickListEvent} event - Custom picklist event.
     */
    onTargetSelectionChange?(event: PickListEvent): void;
    /**
     * Callback to invoke when items are filtered within source list.
     * @param {PickListEvent} event - Custom picklist event.
     */
    onSourceFilterChange?(event: PickListEvent): void;
    /**
     * Callback to invoke when items are filtered within target list.
     * @param {PickListEvent} event - Custom picklist event.
     */
    onTargetFilterChange?(event: PickListEvent): void;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {PickListPassThroughOptions}
     */
    pt?: PickListPassThroughOptions;
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
 * **PrimeReact - PickList**
 *
 * _PickList is used to reorder items between different lists._
 *
 * [Live Demo](https://www.primereact.org/picklist/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class PickList extends React.Component<PickListProps, any> {
    /**
     * Used to get container element.
     * @return {HTMLDivElement} Container element
     */
    public getElement(): HTMLDivElement;
}
