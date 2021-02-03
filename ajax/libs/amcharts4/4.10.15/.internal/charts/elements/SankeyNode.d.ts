/**
 * SankeyNode module
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { FlowDiagramNode, IFlowDiagramNodeAdapters, IFlowDiagramNodeEvents, IFlowDiagramNodeProperties } from "./FlowDiagramNode";
import { SankeyDiagram, SankeyDiagramDataItem } from "../types/SankeyDiagram";
import { LabelBullet } from "./LabelBullet";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[SankeyNode]].
 */
export interface ISankeyNodeProperties extends IFlowDiagramNodeProperties {
    /**
     * A level node is at. (0 - ...)
     */
    level?: number;
}
/**
 * Defines events for [[SankeyNode]].
 */
export interface ISankeyNodeEvents extends IFlowDiagramNodeEvents {
}
/**
 * Defines adapters for [[SankeyNode]].
 *
 * @see {@link Adapter}
 */
export interface ISankeyNodeAdapters extends IFlowDiagramNodeAdapters, ISankeyNodeProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Creates a node in a Sankey Diagram.
 *
 * A Sankey node is a block with a value, which represents its size on the
 * diagram.
 *
 * Nodes are connected via [[SankeyLink]] elements.
 *
 * @see {@link ISankeyNodeEvents} for a list of available events
 * @see {@link ISankeyNodeAdapters} for a list of available Adapters
 * @important
 */
export declare class SankeyNode extends FlowDiagramNode {
    /**
     * Defines available properties.
     */
    _properties: ISankeyNodeProperties;
    /**
     * Defines available adapters.
     */
    _adapter: ISankeyNodeAdapters;
    /**
     * Defines available events.
     */
    _events: ISankeyNodeEvents;
    /**
     * [nextInCoord description]
     *
     * @ignore Exclude from docs
     * @todo Description
     */
    nextInCoord: number;
    /**
     * [nextOutCoord description]
     *
     * @ignore Exclude from docs
     * @todo Description
     */
    nextOutCoord: number;
    /**
     * A chart instance this node is added to.
     */
    chart: SankeyDiagram;
    /**
     * Defines the type of the [[SankeyDiagramDataItem]] used in the class.
     */
    _dataItem: SankeyDiagramDataItem;
    /**
     * A label element which shows node's value.
     */
    valueLabel: LabelBullet;
    /**
     * A label element which shows node's name.
     */
    nameLabel: LabelBullet;
    /**
     * Constructor
     */
    constructor();
    /**
     * Invalidates all links, attached to this node.
     *
     * @ignore Exclude from docs
     */
    invalidateLinks(): void;
    /**
     * Positions the bullet so it is centered within the node element.
     *
     * @param bullet  Target bullet
     */
    protected positionBullet(bullet: LabelBullet): void;
    /**
     * A level node is displayed at. (0 - ...)
     *
     * Levels are measured from left to right.
     *
     * The nodes in the left-most column will have `level = 0`.
     *
     * Nodes in second column - `level = 1`, etc.
     *
     * @param value  Level
     */
    /**
    * @return Level
    */
    level: number;
    /**
     * Copies properties and labels from another [[SankeyNode]].
     *
     * @param source  Source node
     */
    copyFrom(source: this): void;
}
