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
export interface OrganizationChartProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    /**
     * An array of nested TreeNodes.
     */
    value?: OrganizationChartNodeData[] | undefined;
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
     * @param {OrganizationChartNodeData | OrganizationChartNodeData[] | null | undefined} node - A node instance.
     */
    selectionChange?(node: OrganizationChartNodeData | OrganizationChartNodeData[] | null | undefined): void;
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
     * @return {HTMLDivElement} Container element
     */
    public getElement(): HTMLDivElement;
}
