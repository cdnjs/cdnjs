/**
 *
 * TreeSelect is a form component to choose from hierarchical data.
 *
 * [Live Demo](https://www.primereact.org/treeselect/)
 *
 * @module treeselect
 *
 */
import * as React from 'react';
import { CSSTransitionProps as ReactCSSTransitionProps } from 'react-transition-group/CSSTransition';
import { ComponentHooks } from '../componentbase/componentbase';
import { CSSTransitionProps } from '../csstransition';
import { PassThroughOptions } from '../passthrough';
import { TooltipPassThroughOptions } from '../tooltip/tooltip';
import { TooltipOptions } from '../tooltip/tooltipoptions';
import { TreeNodeTemplateOptions, TreePassThroughOptions, TreeTogglerTemplateOptions } from '../tree/tree';
import { TreeNode } from '../treenode';
import { FormEvent } from '../ts-helpers';
import { IconType, PassThroughType } from '../utils/utils';

export declare type TreeSelectPassThroughType<T> = PassThroughType<T, TreeSelectPassThroughMethodOptions>;
export declare type TreeSelectPassThroughTransitionType = ReactCSSTransitionProps | ((options: TreeSelectPassThroughMethodOptions) => ReactCSSTransitionProps) | undefined;

/**
 * Custom passthrough(pt) option method.
 */
export interface TreeSelectPassThroughMethodOptions {
    props: TreeSelectProps;
    state: TreeSelectState;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link TreeSelectProps.pt}
 */
export interface TreeSelectPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: TreeSelectPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the label container's DOM element.
     */
    labelContainer?: TreeSelectPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the label's DOM element.
     */
    label?: TreeSelectPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the token's DOM element.
     */
    token?: TreeSelectPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the token label's DOM element.
     */
    tokenLabel?: TreeSelectPassThroughType<React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the trigger's DOM element.
     */
    trigger?: TreeSelectPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the trigger icon's DOM element.
     */
    triggerIcon?: TreeSelectPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the panel's DOM element.
     */
    panel?: TreeSelectPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the wrapper's DOM element.
     */
    wrapper?: TreeSelectPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the trigger's DOM element.
     * @see {@link TreePassThroughOptionType}
     */
    tree?: TreePassThroughOptions;
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
     * Uses to pass attributes to the empty message's DOM element.
     */
    emptyMessage?: TreeSelectPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the hidden input wrapper's DOM element.
     */
    hiddenInputWrapper?: TreeSelectPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the hidden input's DOM element.
     */
    hiddenInput?: TreeSelectPassThroughType<React.HTMLAttributes<HTMLInputElement>>;
    /**
     * Uses to pass attributes to the filter container's DOM element.
     */
    filterContainer?: TreeSelectPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * uses to pass attributes to the filter's DOM element.
     */
    filter?: TreeSelectPassThroughType<React.HTMLAttributes<HTMLInputElement>>;
    /**
     * uses to pass attributes to the filter icon's DOM element.
     */
    filterIcon?: TreeSelectPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * uses to pass attributes to the close icon's DOM element.
     */
    closeIcon?: TreeSelectPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * uses to pass attributes to the header's DOM element.
     */
    header?: TreeSelectPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * uses to pass attributes to the close button's DOM element.
     */
    closeButton?: TreeSelectPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLButtonElement>>;
    /**
     * uses to pass attributes to the clear icon's DOM element.
     */
    clearIcon?: TreeSelectPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Used to manage all lifecycle hooks
     * @see {@link ComponentHooks}
     */
    hooks?: ComponentHooks;
    /**
     * Used to control React Transition API.
     */
    transition?: TreeSelectPassThroughTransitionType;
    /**
     * Uses to pass attributes to the Tooltip component.
     * @see {@link TooltipPassThroughOptions}
     */
    tooltip?: TooltipPassThroughOptions;
}

/**
 * Defines current inline state in TreeSelect component.
 */
export interface TreeSelectState {
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
     * Current expanded keys state.
     */
    expandedKeys: TreeSelectExpandedKeysType;
    /**
     * Current selected keys state.
     */
    filterValue: string;
}

/**
 * Custom panel header template options.
 */
interface TreeSelectPanelHeaderTemplateOptions {
    /**
     * Style class of the panel.
     */
    className: string;
    /**
     * The JSX element that represents the filter of the panel.
     */
    filterElement: JSX.Element;
    /**
     * The JSX element that represents the close of the panel.
     */
    closeElement: JSX.Element;
    /**
     * Style class of the panel close element.
     */
    closeElementClassName: string;
    /**
     * Style class of the panel close icon.
     */
    closeIconClassName: string;
    /**
     * Callback to invoke when the close button is clicked.
     */
    onCloseClick(): void;
    /**
     * The JSX element that represents the panel.
     */
    element: JSX.Element;
    /**
     * The props of the TreeSelect component.
     */
    props: TreeSelectProps;
}

/**
 * Custom change event.
 * @see {@link TreeSelectProps.onChange}
 * @extends {FormEvent}
 * @event
 */
interface TreeSelectChangeEvent extends FormEvent<string | TreeSelectSelectionKeysType | TreeSelectSelectionKeysType[]> {}

/**
 * Custom treeselect selection keys type
 */
interface TreeSelectSelectionKeysType {
    /**
     * Extra options.
     */
    [key: string]: boolean | TreeSelectCheckboxSelectionKeyType;
}

/**
 * Custom checkbox selection key type
 */
interface TreeSelectCheckboxSelectionKeyType {
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
 * Custom change event.
 * @see {@link TreeSelectProps.onNodeCollapse},{@link TreeSelectProps.onNodeExpand},{@link TreeSelectProps.onNodeSelect},{@link TreeSelectProps.onNodeUnselect}
 * @event
 */
interface TreeSelectEventNodeEvent {
    /**
     * Browser event
     */
    originalEvent: React.SyntheticEvent;
    /**
     * Unselected node instance.
     */
    node: TreeNode;
}

/**
 * Custom expanded keys type.
 */
interface TreeSelectExpandedKeysType {
    /**
     * Extra options.
     */
    [key: string]: boolean;
}

/**
 * Custom toggle event.
 * @see {@link TreeSelectProps.onToggle}
 * @event
 */
interface TreeSelectExpandedEvent {
    /**
     * Browser event
     */
    originalEvent: React.SyntheticEvent;
    /**
     * Toggled node instance
     */
    value: TreeSelectExpandedKeysType;
}

/**
 * Custom filter change event.
 * @see {@link TreeSelectProps.onFilterValueChange}
 * @event
 */
interface TreeSelectFilterValueChangeEvent {
    /**
     * Browser event
     */
    originalEvent: React.FormEvent<HTMLInputElement>;
    /**
     * The filtered value
     */
    value: string;
}

/**
 * Custom filter template options.
 */
interface TreeSelectFilterTemplateOptions {
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
    filterIcon?: IconType<TreeSelect> | string;
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
    filterOptions?: TreeSelectFilterOptions;
    /**
     * The placeholder of the filter element.
     */
    filterPlaceholder?: string;
    /**
     * Custom filter template.
     */
    filterTemplate?: React.ReactNode | ((options: TreeSelectFilterTemplateOptions) => React.ReactNode);
}

/**
 * Custom filter options.
 */
interface TreeSelectFilterOptions {
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
 * Defines valid properties in TreeSelect component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group Properties
 */
export interface TreeSelectProps extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'onChange' | 'value' | 'ref' | 'pt'> {
    /**
     * DOM element instance where the overlay panel should be mounted. Valid values are any DOM Element and 'self'. The self value is used to render a component where it is located.
     * @defaultValue document.body
     */
    appendTo?: 'self' | HTMLElement | undefined | null | (() => HTMLElement);
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
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
    /**
     * Icon of the dropdown.
     */
    clearIcon?: IconType<TreeSelectProps> | undefined;
    /**
     * Icon of the close button.
     */
    closeIcon?: IconType<TreeSelectProps> | undefined;
    /**
     * When present, it specifies that the component should be disabled.
     * @defaultValue false
     */
    disabled?: boolean | undefined;
    /**
     * Defines how the selected items are displayed, valid values are "comma" and "chip".
     * @defaultValue comma
     */
    display?: 'comma' | 'chip' | undefined;
    /**
     * Icon of the dropdown.
     */
    dropdownIcon?: IconType<TreeSelectProps> | undefined;
    /**
     * Text to display when there is no data.
     * @defaultValue No available options
     */
    emptyMessage?: React.ReactNode | ((props: TreeSelectProps) => React.ReactNode) | undefined;
    /**
     * An array of keys to represent the state of the treeselect expansion state in controlled mode.
     */
    expandedKeys?: TreeSelectExpandedKeysType | undefined;
    /**
     * When specified, displays an input field to filter the items.
     * @defaultValue false
     */
    filter?: boolean | undefined;
    /**
     * When filtering is enabled, filterBy decides which field or fields (comma separated) to search against.
     * @defaultValue label
     */
    filterBy?: string | undefined;
    /**
     * Delay in milliseconds before filtering the data.
     * @defaultValue 300
     */
    filterDelay?: number | undefined;
    /**
     * Icon of the filter.
     */
    filterIcon?: IconType<TreeSelectProps> | undefined;
    /**
     * When the panel is opened, it specifies that the filter input should focus automatically.
     * @defaultValue true
     */
    filterInputAutoFocus?: boolean | undefined;
    /**
     * Locale to use in filtering. The default locale is the host environment's current locale.
     * @defaultValue undefined
     */
    filterLocale?: string | undefined;
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
     * Custom template for the filter element.
     */
    filterTemplate?: React.ReactNode | ((options: TreeSelectFilterTemplateOptions) => React.ReactNode);
    /**
     * When filtering is enabled, the value of input field. To control the value externally, use with onFilterValueChange.
     */
    filterValue?: string | undefined;
    /**
     * Identifier of the input element.
     */
    inputId?: string | undefined;
    /**
     * Reference of the input element.
     */
    inputRef?: React.Ref<HTMLInputElement> | undefined;
    /**
     * Defines how multiple items can be selected, when true metaKey needs to be pressed to select or unselect an item and when set to false selection of each item can be toggled individually. On touch enabled devices, metaKeySelection is turned off automatically.
     * @defaultValue true
     */
    metaKeySelection?: boolean | undefined;
    /**
     * Name of the input element.
     */
    name?: string | undefined;
    /**
     * Template of internally used tree component node element.
     * @defaultValue false
     */
    nodeTemplate?: React.ReactNode | ((node: TreeNode, options: TreeNodeTemplateOptions) => React.ReactNode);
    /**
     * An array of options to display.
     */
    options?: TreeNode[] | undefined;
    /**
     * Style class of the overlay panel element.
     */
    panelClassName?: string | undefined;
    /**
     * The template of footer.
     */
    panelFooterTemplate?: React.ReactNode | ((props: TreeSelectProps) => React.ReactNode);
    /**
     * The template of header.
     */
    panelHeaderTemplate?: React.ReactNode | ((options: TreeSelectPanelHeaderTemplateOptions) => React.ReactNode);
    /**
     * Inline style of the overlay panel element.
     */
    panelStyle?: React.CSSProperties | undefined;
    /**
     * Hint text for the input field.
     */
    placeholder?: string | undefined;
    /**
     * Specifies the input variant of the component.
     * @defaultValue outlined
     */
    variant?: 'outlined' | 'filled' | undefined;
    /**
     * When present, it specifies that the component should have invalid state style.
     * @defaultValue false
     */
    invalid?: boolean | undefined;
    /**
     * Clears the filter value when hiding the dropdown.
     * @defaultValue false
     */
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {TreeSelectPassThroughOptions}
     */
    pt?: TreeSelectPassThroughOptions;
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
     * Resets the filter when the overlay is hidden.
     */
    resetFilterOnHide?: boolean | undefined;
    /**
     * Maximum height of the options panel.
     * @defaultValue 400px
     */
    scrollHeight?: string | undefined;
    /**
     * When enabled, a clear icon is displayed to clear the value.
     * @defaultValue false
     */
    showClear?: boolean | undefined;
    /**
     * Defines the selection mode, valid values "single", "multiple", and "checkbox".
     */
    selectionMode?: 'single' | 'multiple' | 'checkbox' | undefined;
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
     * Template of toggler element.
     */
    togglerTemplate?: React.ReactNode | ((node: TreeNode, options: TreeTogglerTemplateOptions) => React.ReactNode);
    /**
     * A single or an object of keys to control the selection state.
     */
    value?: string | TreeSelectSelectionKeysType | TreeSelectSelectionKeysType[] | undefined | null;
    /**
     * The template of selected values.
     */
    valueTemplate?: React.ReactNode | ((selectedNodes: TreeNode | TreeNode[], props: TreeSelectProps) => React.ReactNode);
    /**
     * Callback to invoke when selection changes.
     * @param {TreeSelectChangeEvent} event - Custom change event.
     */
    onChange?(event: TreeSelectChangeEvent): void;
    /**
     * Callback to invoke when filter value changes.
     * @param {TreeSelectFilterValueChangeEvent} event - Custom filter change event.
     */
    onFilterValueChange?(event: TreeSelectFilterValueChangeEvent): void;
    /**
     * Used to hide the overlay.
     */
    onHide?(): void;
    /**
     * Callback to invoke when a node is collapsed.
     * @param {TreeSelectEventNodeEvent} event - Custom change event.
     */
    onNodeCollapse?(event: TreeSelectEventNodeEvent): void;
    /**
     * Callback to invoke when a node is expanded.
     * @param {TreeSelectEventNodeEvent} event - Custom change event.
     */
    onNodeExpand?(event: TreeSelectEventNodeEvent): void;
    /**
     * Callback to invoke when a node is selected.
     * @param {TreeSelectEventNodeEvent} event - Custom change event.
     */
    onNodeSelect?(event: TreeSelectEventNodeEvent): void;
    /**
     * Callback to invoke when a node is unselected.
     * @param {TreeSelectEventNodeEvent} event - Custom change event.
     */
    onNodeUnselect?(event: TreeSelectEventNodeEvent): void;
    /**
     * Used to show the overlay.
     */
    onShow?(): void;
    /**
     * Callback to invoke when a node is toggled.
     * @param {TreeSelectExpandedEvent} event - Custom toggle event.
     */
    onToggle?(event: TreeSelectExpandedEvent): void;
}

/**
 * **PrimeReact - TreeSelect**
 *
 * _TreeSelect is a form component to choose from hierarchical data._
 *
 * [Live Demo](https://www.primereact.org/treeselect/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class TreeSelect extends React.Component<TreeSelectProps, any> {
    /**
     * Used to focus the component.
     */
    public focus(): void;
    /**
     * Clear the currently selected value.
     */
    public clear(): void;
    /**
     * Show the dropdown overlay panel.
     */
    public show(): void;
    /**
     * Hide the dropdown overlay panel.
     */
    public hide(): void;
    /**
     * Used to get container element.
     * @return {HTMLDivElement} Container element
     */
    public getElement(): HTMLDivElement;
}
