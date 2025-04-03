/**
 *
 * Tree is used to display hierarchical data.
 *
 * [Live Demo](https://www.primereact.org/tree/)
 *
 * @module tree
 *
 */
import * as React from 'react';
import { ComponentHooks } from '../componentbase/componentbase';
import { PassThroughOptions } from '../passthrough';
import { TreeNode } from '../treenode';
import { IconType, PassThroughType } from '../utils/utils';

export declare type TreePassThroughType<T> = PassThroughType<T, TreePassThroughMethodOptions>;

/**
 * Custom passthrough(pt) option method.
 */
export interface TreePassThroughMethodOptions {
    props: TreeProps;
    state: TreeState;
    context: TreeContext;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link TreeProps.pt}
 */
export interface TreePassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: TreePassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the loading overlay's DOM element.
     */
    loadingOverlay?: TreePassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the loading icon's DOM element.
     */
    loadingIcon?: TreePassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the filter container's DOM element.
     */
    filterContainer?: TreePassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the input's DOM element.
     */
    input?: TreePassThroughType<React.HTMLAttributes<HTMLInputElement>>;
    /**
     * Uses to pass attributes to the search icon's DOM element.
     */
    searchIcon?: TreePassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the container's DOM element.
     */
    container?: TreePassThroughType<React.HTMLAttributes<HTMLUListElement>>;
    /**
     * Uses to pass attributes to the node's DOM element.
     */
    node?: TreePassThroughType<React.HTMLAttributes<HTMLLIElement>>;
    /**
     * Uses to pass attributes to the content's DOM element.
     */
    content?: TreePassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the toggler's DOM element.
     */
    toggler?: TreePassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the toggler icon's DOM element.
     */
    togglerIcon?: TreePassThroughType<React.HTMLAttributes<HTMLButtonElement>>;
    /**
     * Uses to pass attributes to the node checkbox's DOM element.
     */
    nodeCheckbox?: TreePassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the checkbox icon's DOM element.
     */
    checkboxIcon?: TreePassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the node icon's DOM element.
     */
    nodeIcon?: TreePassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the label's DOM element.
     */
    label?: TreePassThroughType<React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the subgroup's DOM element.
     */
    subgroup?: TreePassThroughType<React.HTMLAttributes<HTMLUListElement>>;
    /**
     * Uses to pass attributes to the header's DOM element.
     */
    header?: TreePassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the header's DOM element.
     */
    footer?: TreePassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the header's DOM element.
     */
    droppoint?: TreePassThroughType<React.HTMLAttributes<HTMLLIElement>>;
    /**
     * Used to manage all lifecycle hooks
     * @see {@link ComponentHooks}
     */
    hooks?: ComponentHooks;
}

/**
 * Defines current inline state in Tree component.
 */
export interface TreeState {
    /**
     * Current expanded keys state.
     */
    expandedKeys: TreeExpandedKeysType;
    /**
     * Current filter value state as a string.
     */
    filterValue: string;
}

/**
 * Defines current options in Tree component.
 */
export interface TreeContext {
    /**
     * Current expanded state of the node as a boolean.
     * @defaultValue false
     */
    expanded: boolean;
    /**
     * Current selected state of the node as a boolean.
     * @defaultValue false
     */
    selected: boolean;
    /**
     * Current checked state of the node as a boolean.
     * @defaultValue false
     */
    checked: boolean;
    /**
     * Whether the node is a leaf node.
     * @defaultValue false
     */
    leaf: boolean;
}

/**
 * Custom tree header template options
 */
interface TreeHeaderTemplateOptions {
    /**
     * Style class of the filter container element.
     */
    filterContainerClassName: string;
    /**
     * Style class of the filter icon element.
     */
    filterIconClasssName: string;
    /**
     * The options for the filter input element.
     */
    filterInput: TreeFilterInputOptions;
    /**
     * The JSX element of the filter input.
     */
    filterElement: JSX.Element;
    /**
     * The JSX element of the tree header.
     */
    element: JSX.Element;
    /**
     * The props of the tree header component.
     */
    props: TreeProps;
}

/**
 * Custom tree filter input options
 */
interface TreeFilterInputOptions {
    /**
     * Style class of the tree filter input element.
     */
    className: string;
    /**
     * Callback function to be invoked when the keydown event.
     * @param {React.KeyboardEvent<HTMLInputElement>} event - Browser event.
     */
    onKeyDown(event: React.KeyboardEvent<HTMLInputElement>): void;
    /**
     * Callback function to be invoked when the change event.
     * @param {React.KeyboardEvent<HTMLInputElement>} event - Browser event.
     */
    onChange(event: React.KeyboardEvent<HTMLInputElement>): void;
}

/**
 * Custom tree node template options
 */
interface TreeNodeTemplateOptions {
    /**
     * Callback to invoke when the toggler button is clicked.
     * @param {React.SyntheticEvent} event - Browser event
     */
    onTogglerClick(event: React.SyntheticEvent): void;
    /**
     * Style class of the element.
     */
    className: string;
    /**
     * The JSX element that represents the tree node.
     */
    element: JSX.Element;
    /**
     * The props of the Tree component.
     */
    props: TreeProps;
    /**
     * Whether the tree node is expanded or not.
     */
    expanded: boolean;
}

/**
 * Custom tree toggler template options
 */
interface TreeTogglerTemplateOptions {
    /**
     * Callback to invoke on click.
     * @param {React.SyntheticEvent} event - Browser event.
     */
    onClick(event: React.SyntheticEvent): void;
    /**
     * Style class of the panels container.
     */
    containerClassName: string;
    /**
     * Icon classname.
     */
    iconClassName: string;
    /**
     * JSX element to be used as the template options.
     */
    element: JSX.Element;
    /**
     * The props of Tree component
     */
    props: TreeProps;
    /**
     * Whether the tree node is expanded or not.
     */
    expanded: boolean;
}

/**
 * Custom tree multiple selection keys
 */
interface TreeMultipleSelectionKeys {
    /**
     * Extra options.
     */
    [key: string]: boolean;
}

/**
 * Custom tree checkbox selection keys
 */
interface TreeCheckboxSelectionKeys {
    /**
     * Extra options.
     */
    [key: string]: TreeCheckboxSelectionKeyType;
}

/**
 * Custom tree checkbox selection type
 */
interface TreeCheckboxSelectionKeyType {
    /**
     * Whether the checkbox is checked or not.
     */
    checked?: boolean;
    /**
     * Whether the checkbox is partially checked or not.
     */
    partialChecked?: boolean;
}

/**
 * Custom tree expanded keys type
 */
interface TreeExpandedKeysType {
    /**
     * Extra options.
     */
    [key: string]: boolean;
}

/**
 * Custom tree event.
 * @see {@link TreeProps.onToggle}
 * @event
 */
interface TreeExpandedEvent {
    /**
     * Browser event.
     */
    originalEvent: React.SyntheticEvent;
    /**
     * Expanded node key.
     */
    value: TreeExpandedKeysType;
}

/**
 * Custom tree event.
 * @see {@link TreeProps.onSelectionChange},{@link TreeProps.onContextMenuSelectionChange}
 * @event
 */
interface TreeSelectionEvent {
    /**
     * Browser event.
     */
    originalEvent: React.SyntheticEvent;
    /**
     * Selected node key(s).
     */
    value: string | TreeMultipleSelectionKeys | TreeCheckboxSelectionKeys | null;
}

/**
 * Custom tree event.
 * @see {@link TreeProps.onSelect},{@link TreeProps.onUnselect},{@link TreeProps.onExpand},{@link TreeProps.onCollapse},{@link TreeProps.onContextMenu}
 * @event
 */
export interface TreeEventNodeEvent {
    /**
     * Browser event.
     */
    originalEvent: React.SyntheticEvent;
    /**
     * Unselected node instance.
     */
    node: TreeNode;
}

/**
 * Custom dragdrop event.
 * @see {@link TreeProps.onDragDrop}
 * @event
 */
interface TreeDragDropEvent {
    /**
     * Browser event.
     */
    originalEvent: React.SyntheticEvent;
    /**
     * New value after the dragdrop.
     */
    value: TreeNode[];
    /**
     * The node that is being dragged.
     */
    dragNode: TreeNode;
    /**
     * The node that is being dropped on.
     */
    dropNode: TreeNode;
    /**
     * The index of the drop.
     */
    dropIndex: number;
}

/**
 * Custom filter value change event.
 * @see {@link TreeProps.onFilterValueChange}
 * @event
 */
interface TreeFilterValueChangeEvent {
    /**
     * Browser event.
     */
    originalEvent: React.FormEvent<HTMLInputElement>;
    /**
     * The filtered value.
     */
    value: string;
}

/**
 * Custom click event
 * @see {@link TreeProps.onNodeClick}
 */
interface TreeNodeClickEvent {
    /**
     * Browser event
     */
    originalEvent: React.SyntheticEvent;
    /**
     * The current node
     */
    node: TreeNode;
}

/**
 * Custom tree filter options
 */
interface TreeFilterOptions {
    /**
     * Used to filter options
     * @param {KeyboardEvent} event - Browser event.
     */
    filter?: (event?: KeyboardEvent) => void;
    /**
     * Used to reset the filtered options
     */
    reset?: () => void;
}

/**
 * Custom click event.
 * @see {@link TreeProps.onNodeDoubleClick}
 * @extends {TreeNodeClickEvent}
 * @event
 */
interface TreeNodeDoubleClickEvent extends TreeNodeClickEvent {}

/**
 * Defines valid properties in TreeProps component.
 * @group Properties
 */
export interface TreeProps {
    /**
     * Unique identifier of the element.
     */
    id?: string | undefined;
    /**
     * An array of treenodes.
     */
    value?: TreeNode[] | undefined;
    /**
     * When present, it specifies that the component should be disabled.
     * @defaultValue false
     */
    disabled?: boolean | undefined;
    /**
     * Defines the selection mode, valid values "single", "multiple", and "checkbox".
     */
    selectionMode?: 'single' | 'multiple' | 'checkbox' | undefined;
    /**
     * A single or an array of keys to control the selection state.
     */
    selectionKeys?: string | TreeMultipleSelectionKeys | TreeCheckboxSelectionKeys | null;
    /**
     * A single key to control the selection with the context menu.
     */
    contextMenuSelectionKey?: string | undefined;
    /**
     * An array of keys to represent the state of the tree expansion state in controlled mode.
     */
    expandedKeys?: TreeExpandedKeysType | undefined;
    /**
     * Inline style of the component.
     */
    style?: React.CSSProperties | undefined;
    /**
     * Style class of the component.
     */
    className?: string | undefined;
    /**
     * Inline style of the tree content.
     */
    contentStyle?: React.CSSProperties | undefined;
    /**
     * Style class of the tree content.
     */
    contentClassName?: string | undefined;
    /**
     * Defines how multiple items can be selected, when true metaKey needs to be pressed to select or unselect an item and when set to false selection of each item can be toggled individually. On touch enabled devices, metaKeySelection is turned off automatically.
     * @defaultValue true
     */
    metaKeySelection?: boolean | undefined;
    /**
     * Whether checkbox selections propagate to ancestor nodes.
     * @defaultValue true
     */
    propagateSelectionUp?: boolean | undefined;
    /**
     * 	Whether checkbox selections propagate to descendant nodes.
     * @defaultValue true
     */
    propagateSelectionDown?: boolean | undefined;
    /**
     * Whether to display loading indicator.
     * @defaultValue false
     */
    loading?: boolean | undefined;
    /**
     * Icon to display when tree is loading.
     */
    loadingIcon?: IconType<TreeProps> | undefined;
    /**
     * Icon to display in the checkbox.
     */
    checkboxIcon?: IconType<TreeProps> | undefined;
    /**
     * Icon of an expanded tab.
     */
    collapseIcon?: IconType<TreeProps> | undefined;
    /**
     * Icon of an collapsed tab.
     */
    expandIcon?: IconType<TreeProps> | undefined;
    /**
     * Unique key to enable dragdrop functionality.
     * @defaultValue false
     */
    dragdropScope?: string | undefined;
    /**
     * The template of header.
     */
    header?: React.ReactNode | ((options: TreeHeaderTemplateOptions) => React.ReactNode);
    /**
     * The template of header.
     */
    footer?: React.ReactNode | ((props: TreeProps) => React.ReactNode);
    /**
     * Template of filter element.
     */
    filterTemplate?: React.ReactNode | ((options: TreeFilterOptions) => React.ReactNode);
    /**
     * Whether to show the header or not.
     * @defaultValue true
     */
    showHeader?: boolean | undefined;
    /**
     * When specified, displays an input field to filter the items.
     * @defaultValue false
     */
    filter?: boolean | undefined;
    /**
     * Delay in milliseconds before filtering the data.
     * @defaultValue 300
     */
    filterDelay?: number | undefined;
    /**
     * Icon of the filter.
     */
    filterIcon?: IconType<TreeProps> | string;
    /**
     * When filtering is enabled, the value of input field. To control the value externally, use with onFilterValueChange.
     */
    filterValue?: string | undefined;
    /**
     * When filtering is enabled, filterBy decides which field or fields (comma separated) to search against.
     * @defaultValue label
     */
    filterBy?: string | undefined;
    /**
     * Mode for filtering valid values are "lenient" and "strict". Default is lenient.
     * @defaultValue lenient
     */
    filterMode?: 'lenient' | 'strict' | undefined;
    /**
     * Placeholder text to show when filter input is empty.
     */
    filterPlaceholder?: string | undefined;
    /**
     * Locale to use in filtering. The default locale is the host environment's current locale.
     * @defaultValue undefined
     */
    filterLocale?: string | undefined;
    /**
     * Template to display when filtering does not return any results.
     * @defaultValue No results found
     */
    emptyMessage?: React.ReactNode | ((props: TreeProps) => React.ReactNode) | undefined;
    /**
     * Defines a string value that labels an interactive element.
     */
    ariaLabel?: string | undefined;
    /**
     * Identifier of the underlying menu element.
     */
    ariaLabelledby?: string | undefined;
    /**
     * Template of toggler element.
     */
    togglerTemplate?: React.ReactNode | ((node: TreeNode, options: TreeTogglerTemplateOptions) => React.ReactNode);
    /**
     * Template of node element.
     * @defaultValue false
     */
    nodeTemplate?: React.ReactNode | ((node: TreeNode, options: TreeNodeTemplateOptions) => React.ReactNode);
    /**
     * Callback to invoke when selection changes.
     * @param {TreeSelectionEvent} event - Custom select event.
     */
    onSelectionChange?(event: TreeSelectionEvent): void;
    /**
     * Callback to invoke when selection changes with a context menu.
     * @param {TreeSelectionEvent} event - Custom select event.
     */
    onContextMenuSelectionChange?(event: TreeSelectionEvent): void;
    /**
     * Callback to invoke when a node is selected.
     * @param {TreeEventNodeEvent} event - Custom node event.
     */
    onSelect?(event: TreeEventNodeEvent): void;
    /**
     * Callback to invoke when a node is unselected.
     * @param {TreeEventNodeEvent} event - Custom node event.
     */
    onUnselect?(event: TreeEventNodeEvent): void;
    /**
     * Callback to invoke when a node is expanded.
     * @param {TreeEventNodeEvent} event - Custom node event.
     */
    onExpand?(event: TreeEventNodeEvent): void;
    /**
     * Callback to invoke when a node is collapsed.
     * @param {TreeEventNodeEvent} event - Custom node event.
     */
    onCollapse?(event: TreeEventNodeEvent): void;
    /**
     * Callback to invoke when a node is toggled.
     * @param {TreeExpandedEvent} event - Custom expand event.
     */
    onToggle?(event: TreeExpandedEvent): void;
    /**
     * Callback to invoke when a node is selected.
     * @param {TreeDragDropEvent} event - Custom dragdrop event.
     */
    onDragDrop?(event: TreeDragDropEvent): void;
    /**
     * Callback to invoke when a node is selected with a context menu.
     * @param {TreeEventNodeEvent} event - Custom node event.
     */
    onContextMenu?(event: TreeEventNodeEvent): void;
    /**
     * Callback to invoke when filter value changes.
     * @param {TreeFilterValueChangeEvent} event - Custom filter value change event.
     */
    onFilterValueChange?(event: TreeFilterValueChangeEvent): void;
    /**
     * Callback to invoke when the node is clicked.
     * @param {TreeNodeClickEvent} event - Custom click event.
     */
    onNodeClick?(event: TreeNodeClickEvent): void;
    /**
     * Callback to invoke when the node is double-clicked.
     * @param {TreeNodeDoubleClickEvent} event - Custom doubleclick event.
     */
    onNodeDoubleClick?(event: TreeNodeDoubleClickEvent): void;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {TreePassThroughOptions}
     */
    pt?: TreePassThroughOptions;
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
 * **PrimeReact - Tree**
 *
 * _Tree is used to display hierarchical data._
 *
 * [Live Demo](https://www.primereact.org/tree/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class Tree extends React.Component<TreeProps, any> {
    /**
     * Filters the data.
     * @param {T} value - The filter value
     */
    public filter<T>(value: T): void;
    /**
     * Used to get container element.
     * @return {HTMLDivElement} Container element
     */
    public getElement(): HTMLDivElement;
}
