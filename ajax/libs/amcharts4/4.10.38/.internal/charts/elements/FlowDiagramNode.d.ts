/**
 * FlowDiagramNode module
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Container, IContainerProperties, IContainerAdapters, IContainerEvents } from "../../core/Container";
import { Sprite, AMEvent, ISpriteEvents } from "../../core/Sprite";
import { FlowDiagram, FlowDiagramDataItem } from "../types/FlowDiagram";
import { List } from "../../core/utils/List";
import { Color } from "../../core/utils/Color";
import * as $iter from "../../core/utils/Iterator";
import { LegendSettings, LegendDataItem } from "../Legend";
import { Animation } from "../../core/utils/Animation";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[FlowDiagramNode]].
 */
export interface IFlowDiagramNodeProperties extends IContainerProperties {
    /**
     * Name of the node.
     */
    name?: string;
    /**
     * Sum of all incomming+outgoing link values
     */
    total?: number;
    /**
     * Sum of all incoming link values
     */
    totalIncoming?: number;
    /**
     * Sum of all outgoing link values
     */
    totalOutgoing?: number;
    /**
     * Node's color.
     */
    color?: Color;
}
/**
 * Defines events for [[FlowDiagramNode]].
 */
export interface IFlowDiagramNodeEvents extends IContainerEvents {
}
/**
 * Defines adapters for [[FlowDiagramNode]].
 *
 * @see {@link Adapter}
 */
export interface IFlowDiagramNodeAdapters extends IContainerAdapters, IFlowDiagramNodeProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Creates a node in a Flow Diagram.
 *
 * A Flow node is a block with a value, which represents its size on the
 * diagram.
 *
 * Nodes are connected via [[FlowLink]] elements.
 *
 * @see {@link IFlowDiagramNodeEvents} for a list of available events
 * @see {@link IFlowDiagramNodeAdapters} for a list of available Adapters
 * @important
 */
export declare class FlowDiagramNode extends Container {
    /**
     * total ajusted taken in mind chart.minNodeSize
     */
    adjustedTotal: number;
    /**
     * Defines available properties.
     */
    _properties: IFlowDiagramNodeProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IFlowDiagramNodeAdapters;
    /**
     * Defines available events.
     */
    _events: IFlowDiagramNodeEvents;
    /**
     * A list of data items of the items coming in from another node, one level
     * up.
     *
     * These are what ingoing links are build out of.
     */
    protected _incomingDataItems: List<this["_dataItem"]>;
    /**
     * A list of data items of the items going out of the node.
     *
     * These are what outgoing links are build out of.
     */
    protected _outgoingDataItems: List<this["_dataItem"]>;
    /**
     * Sorted list of incoming items.
     */
    protected _incomingSorted: $iter.Iterator<this["_dataItem"]>;
    /**
     * Sorted list of outgoing items.
     */
    protected _outgoingSorted: $iter.Iterator<this["_dataItem"]>;
    /**
     * A chart instance this node is added to.
     */
    chart: FlowDiagram;
    /**
     * Defines the type of the [[FlowDiagramDataItem]] used in the class.
     */
    _dataItem: FlowDiagramDataItem;
    /**
     * Settings for the appearance of the related legend items.
     */
    legendSettings: LegendSettings;
    /**
     * A reference to the legend data item related to this node.
     */
    protected _legendDataItem: LegendDataItem;
    /**
     * Constructor
     */
    constructor();
    /**
     * @ignore
     */
    handleHit(event: AMEvent<Sprite, ISpriteEvents>["hit"]): void;
    /**
     * Shows hidden node.
     *
     * @param duration  Duration of reveal animation (ms)
     * @return Animation
     */
    show(duration?: number): Animation;
    /**
     * Hides node.
     *
     * @param duration  Duration of hiding animation (ms)
     * @return Animation
     */
    hide(duration?: number): Animation;
    /**
     * Marks node as invalid, for redrawal in the next update cycle.
     *
     * @ignore Exclude from docs
     */
    validate(): void;
    /**
     * Invalidates all links, attached to this node.
     *
     * @ignore Exclude from docs
     */
    invalidateLinks(): void;
    /**
     * List of incoming items (links).
     *
     * @readonly
     * @return Incoming items
     */
    readonly incomingDataItems: List<this["_dataItem"]>;
    /**
     * List of outgoing items (links).
     *
     * @readonly
     * @return Outgoing items
     */
    readonly outgoingDataItems: List<FlowDiagramDataItem>;
    /**
     * A name of the node.
     *
     * @param value  Name
     */
    /**
    * @return Name
    */
    name: string;
    /**
     * Sum of all incoming+outgoing link values
     *
     * @param value  Value
     */
    /**
    * @return Value
    */
    total: number;
    /**
     * Sum of all incomming link values.
     *
     * @param value  Value
     */
    /**
    * @return Value
    */
    totalIncoming: number;
    /**
     * Sum of all outgoing link values.
     *
     * @param value  Value
     */
    /**
    * @return Value
    */
    totalOutgoing: number;
    /**
     * Node's color.
     *
     * @param value  Color
     */
    /**
    * @return Color
    */
    color: Color;
    /**
     * Creates elements in related legend container, that mimics the look of this
     * Series.
     *
     * @ignore Exclude from docs
     * @param marker  Legend item container
     */
    createLegendMarker(marker: Container): void;
    /**
     * Legend data item that corresponds to this series.
     *
     * @param value  Data item
     */
    /**
    * @return Data item
    */
    legendDataItem: LegendDataItem;
}
