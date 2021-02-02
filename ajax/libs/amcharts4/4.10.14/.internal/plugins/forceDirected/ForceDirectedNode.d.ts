/**
 * Module that defines everything related to building ForceDirectedNodes.
 *
 * It is a container which has ForceDirectedNode element which is a RoundedRectangle.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Container, IContainerProperties, IContainerAdapters, IContainerEvents } from "../../core/Container";
import { Circle } from "../../core/elements/Circle";
import { Label } from "../../core/elements/Label";
import { ForceDirectedSeriesDataItem } from "./ForceDirectedSeries";
import { ForceDirectedLink } from "./ForceDirectedLink";
import { Dictionary } from "../../core/utils/Dictionary";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[ForceDirectedNode]].
 */
export interface IForceDirectedNodeProperties extends IContainerProperties {
    /**
     * If set to `true` (default) toggling a node on will automatically expand
     * all nodes across the whole tree (all levels) of its descendants.
     *
     * Setting to `false` will only expand immediate children (one level).
     */
    expandAll?: boolean;
    /**
     * Padding of the nodes, in pixels.
     */
    paddingRadius?: number;
}
/**
 * Defines events for [[ForceDirectedNode]].
 */
export interface IForceDirectedNodeEvents extends IContainerEvents {
}
/**
 * Defines adapters for [[ForceDirectedNode]].
 *
 * @see {@link Adapter}
 */
export interface IForceDirectedNodeAdapters extends IContainerAdapters, IForceDirectedNodeProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Class used to creates [[ForceDirectedNode]] elements (circles).
 *
 * @see {@link IForceDirectedNodeEvents} for a list of available events
 * @see {@link IForceDirectedNodeAdapters} for a list of available Adapters
 * @since 4.3.8
 * @important
 */
export declare class ForceDirectedNode extends Container {
    /**
     * Defines available properties.
     */
    _properties: IForceDirectedNodeProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IForceDirectedNodeAdapters;
    /**
     * Defines available events.
     */
    _events: IForceDirectedNodeEvents;
    /**
     * A node's [[Circle]] element.
     */
    circle: Circle;
    /**
     * A [[Circle]] element for node's outline. This outline is used on nodes
     * that have children.
     */
    outerCircle: Circle;
    /**
     * Related data item.
     */
    _dataItem: ForceDirectedSeriesDataItem;
    /**
     * Node's [[Label]] element.
     */
    label: Label;
    /**
     * A list of other [[ForceDirectedNode]] elements this node is linked with
     * using `linkWith`.
     *
     * @since 4.4.8
     */
    linksWith: Dictionary<string, ForceDirectedLink>;
    /**
     * Constructor
     */
    constructor();
    /**
     * @ignore
     */
    protected updateLabelSize(): void;
    /**
     * Copies all parameters from another [[ForceDirectedNode]].
     *
     * @param source Source ForceDirectedNode
     */
    copyFrom(source: this): void;
    /**
     * Sets node as "active" (expanded).
     *
     * @ignore
     * @param  value  Active or not?
     */
    setActive(value: boolean): void;
    /**
     * @ignore
     * @todo description
     */
    protected updateSimulation(): void;
    /**
     * If set to `true` (default) toggling a node on will automatically expand
     * all nodes across the whole tree (all levels) of its descendants.
     *
     * Setting to `false` will only expand immediate children (one level).
     *
     * @default true
     * @since 4.4.8
     * @param  value  Expand all?
     */
    /**
    * @return Expand all?
    */
    expandAll: boolean;
    /**
     * Creates a new link between two nodes.
     *
     * Use this method to dynamically add links without requiring to revalidate
     * whole of the data.
     *
     * @since 4.4.8
     * @param   node      Target node
     * @param   strength  Link strength
     * @return            New link
     */
    linkWith(node: ForceDirectedNode, strength?: number): ForceDirectedLink;
    /**
     * Removes a link between two nodes.
     *
     * @since 4.4.8
     * @param  node  Target node
     */
    unlinkWith(node: ForceDirectedNode): void;
    /**
     * Padding of the nodes, in pixels.
     *
     * @since 4.6.7
     * @default 0
     * @param  value  padding radius
     */
    /**
    * @return Padding radius
    */
    paddingRadius: number;
}
