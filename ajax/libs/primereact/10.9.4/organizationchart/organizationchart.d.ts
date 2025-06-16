/**
 *
 * OrganizationChart visualizes hierarchical organization data.
 *
 * [Live Demo](https://www.primereact.org/organizationchart/)
 *
 * @module organizationchart
 *
 */
import * as React from 'react';
import { ComponentHooks } from '../componentbase/componentbase';
import { PassThroughOptions } from '../passthrough';
import { IconType, PassThroughType } from '../utils/utils';

export declare type OrganizationChartPassThroughType<T> = PassThroughType<T, OrganizationChartPassThroughMethodOptions>;

/**
 * Custom passthrough(pt) option method.
 */
export interface OrganizationChartPassThroughMethodOptions {
    props: OrganizationChartProps;
    state: OrganizationChartState;
    context: OrganizationChartContext;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link OrganizationChartProps.pt}
 */
export interface OrganizationChartPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: OrganizationChartPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the table's DOM element.
     */
    table?: OrganizationChartPassThroughType<React.HTMLAttributes<HTMLTableCellElement>>;
    /**
     * Uses to pass attributes to the row's DOM element.
     */
    row?: OrganizationChartPassThroughType<React.HTMLAttributes<HTMLTableRowElement>>;
    /**
     * Uses to pass attributes to the cell's DOM element.
     */
    cell?: OrganizationChartPassThroughType<React.HTMLAttributes<HTMLTableCellElement>>;
    /**
     * Uses to pass attributes to the node's DOM element.
     */
    node?: OrganizationChartPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the nodeToggler's DOM element.
     */
    nodeToggler?: OrganizationChartPassThroughType<React.HTMLAttributes<HTMLAnchorElement>>;
    /**
     * Uses to pass attributes to the nodeTogglerIcon's DOM element.
     */
    nodeTogglerIcon?: OrganizationChartPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the lines's DOM element.
     */
    lines?: OrganizationChartPassThroughType<React.HTMLAttributes<HTMLTableRowElement>>;
    /**
     * Uses to pass attributes to the lineLeft's DOM element.
     */
    lineLeft?: OrganizationChartPassThroughType<React.HTMLAttributes<HTMLTableCellElement>>;
    /**
     * Uses to pass attributes to the lineRight's DOM element.
     */
    lineRight?: OrganizationChartPassThroughType<React.HTMLAttributes<HTMLTableCellElement>>;
    /**
     * Uses to pass attributes to the lineCell's DOM element.
     */
    lineCell?: OrganizationChartPassThroughType<React.HTMLAttributes<HTMLTableCellElement>>;
    /**
     * Uses to pass attributes to the lineDown's DOM element.
     */
    lineDown?: OrganizationChartPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the nodes's DOM element.
     */
    nodes?: OrganizationChartPassThroughType<React.HTMLAttributes<HTMLTableRowElement>>;
    /**
     * Uses to pass attributes to the nodeCell's DOM element.
     */
    nodeCell?: OrganizationChartPassThroughType<React.HTMLAttributes<HTMLTableCellElement>>;
    /**
     * Used to manage all lifecycle hooks
     * @see {@link ComponentHooks}
     */
    hooks?: ComponentHooks;
}

/**
 * Defines current inline state in OrganizationChart component.
 */
export interface OrganizationChartState {
    /**
     * Current focus expanded of the node as a boolean.
     */
    expanded: boolean;
}

/**
 * Defines current options in OrganizationChart component.
 */
export interface OrganizationChartContext {
    /**
     * Current selection state of the node as a boolean.
     */
    selected: boolean;
}

/**
 * Custom node select event.
 * @see {@link OrganizationChartProps.onNodeSelect}
 * @event
 */
interface OrganizationChartNodeSelectEvent {
    /**
     * Browser event.
     */
    originalEvent: React.SyntheticEvent;
    /**
     * Selected node instance.
     */
    node: OrganizationChartNodeData | null | undefined;
}

/**
 * Custom node unselect event.
 * @see {@link OrganizationChartProps.onNodeUnselect}
 * @event
 */
interface OrganizationChartNodeUnselectEvent {
    /**
     * Browser event.
     */
    originalEvent: React.SyntheticEvent;
    /**
     * Unselected node instance.
     */
    node: OrganizationChartNodeData | null | undefined;
}

/**
 * Custom selection change event.
 * @see {@link OrganizationChartProps.onSelectionChange}
 * @event
 */
interface OrganizationChartSelectionChangeEvent {
    /**
     * Browser event.
     */
    originalEvent: React.SyntheticEvent;
    /**
     * Selected node(s).
     */
    data: OrganizationChartNodeData | OrganizationChartNodeData[] | null | undefined;
}

/**
 * Custom organizationchart node data.
 */
interface OrganizationChartNodeData {
    /**
     * Style class of the node.
     */
    className?: string;
    /**
     * Visibility of node.
     */
    expanded?: boolean;
    /**
     * The child elements of the component.
     * @readonly
     */
    children?: OrganizationChartNodeData[];
    /**
     * Whether the node is selectable when selection mode is enabled.
     */
    selectable?: boolean;
    /**
     * Label of node.
     */
    label?: string;
}

/**
 * Defines valid properties in OrganizationChart component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group Properties
 */
export interface OrganizationChartProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref' | 'pt'> {
    /**
     * An array of nested TreeNodes.
     */
    value?: OrganizationChartNodeData[] | undefined;
    /**
     * Toggle icon of an expanded and collapsed node.
     */
    togglerIcon?: IconType<OrganizationChartProps> | undefined;
    /**
     * Defines the selection mode, valid values "single" and "multiple".
     */
    selectionMode?: 'single' | 'multiple' | undefined;
    /**
     * A single treenode instance or an array to refer to the selections.
     */
    selection?: OrganizationChartNodeData | OrganizationChartNodeData[] | null | undefined;
    /**
     * Template function that gets a node as a parameter and returns a content.
     * @param {OrganizationChartNodeData} node - A node instance.
     */
    nodeTemplate?(node: OrganizationChartNodeData): React.ReactNode;
    /**
     * Callback to invoke when node selection changes.
     * @param {OrganizationChartSelectionChangeEvent} event - Custom selection changed event.
     */
    onSelectionChange?(event: OrganizationChartSelectionChangeEvent): void;
    /**
     * Callback to invoke when a node is selected.
     * @param {OrganizationChartNodeSelectEvent} event - Custom node select event.
     */
    onNodeSelect?(event: OrganizationChartNodeSelectEvent): void;
    /**
     * Callback to invoke when a node is unselected.
     * @param {OrganizationChartNodeUnselectEvent} event - Custom node unselect event.
     */
    onNodeUnselect?(event: OrganizationChartNodeUnselectEvent): void;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {OrganizationChartPassThroughOptions}
     */
    pt?: OrganizationChartPassThroughOptions;
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
 * **PrimeReact - OrganizationChart**
 *
 * _OrganizationChart visualizes hierarchical organization data._
 *
 * [Live Demo](https://www.primereact.org/organizationchart/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class OrganizationChart extends React.Component<OrganizationChartProps, any> {
    /**
     * Used to get container element.
     * @return {HTMLDivElement | null} Container element
     */
    public getElement(): HTMLDivElement | null;
}
