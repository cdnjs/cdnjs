/**
 * Sankey diagram module.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { FlowDiagram, FlowDiagramDataItem, IFlowDiagramAdapters, IFlowDiagramDataFields, IFlowDiagramEvents, IFlowDiagramProperties } from "./FlowDiagram";
import { SankeyNode } from "../elements/SankeyNode";
import { SankeyLink } from "../elements/SankeyLink";
import { Animation } from "../../core/utils/Animation";
import { Orientation } from "../../core/defs/Orientation";
import * as $iter from "../../core/utils/Iterator";
import * as $type from "../../core/utils/Type";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[SankeyDiagram]].
 *
 * @see {@link DataItem}
 */
export declare class SankeyDiagramDataItem extends FlowDiagramDataItem {
    /**
     * Defines a type of [[Component]] this data item is used for.
     */
    _component: SankeyDiagram;
    /**
     * An a link element, connecting two nodes.
     */
    _link: SankeyLink;
    /**
     * An origin node.
     */
    fromNode: SankeyNode;
    /**
     * A destination node.
     */
    toNode: SankeyNode;
    /**
     * Constructor
     */
    constructor();
}
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines data fields for [[SankeyDiagram]].
 */
export interface ISankeyDiagramDataFields extends IFlowDiagramDataFields {
    /**
     * Name of the source node.
     */
    fromName?: string;
    /**
     * Name of the target node.
     */
    toName?: string;
    /**
     * Value of the link between two nodes.
     */
    value?: string;
    /**
     * Color of a from node
     */
    color?: string;
}
/**
 * Defines properties for [[SankeyDiagram]]
 */
export interface ISankeyDiagramProperties extends IFlowDiagramProperties {
    /**
     * Sort nodes by name or value or do not sort at all
     */
    nodeAlign?: "top" | "bottom" | "middle";
    /**
     * Orientation of the chart.
     */
    orientation?: Orientation;
}
/**
 * Defines events for [[SankeyDiagram]].
 */
export interface ISankeyDiagramEvents extends IFlowDiagramEvents {
}
/**
 * Defines adapters for [[SankeyDiagram]].
 *
 * @see {@link Adapter}
 */
export interface ISankeyDiagramAdapters extends IFlowDiagramAdapters, ISankeyDiagramProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Creates a Sankey Diagram chart.
 *
 * @see {@link ISankeyDiagramEvents} for a list of available Events
 * @see {@link ISankeyDiagramAdapters} for a list of available Adapters
 * @see {@link https://www.amcharts.com/docs/v4/chart-types/sankey-diagram/} for documentation
 * @important
 */
export declare class SankeyDiagram extends FlowDiagram {
    /**
     * Defines a type for the DataItem.
     */
    _dataItem: SankeyDiagramDataItem;
    /**
     * Defines available data fields.
     */
    _dataFields: ISankeyDiagramDataFields;
    /**
     * Defines available properties.
     */
    _properties: ISankeyDiagramProperties;
    /**
     * Defines available adapters.
     */
    _adapter: ISankeyDiagramAdapters;
    /**
     * Defines available events.
     */
    _events: ISankeyDiagramEvents;
    /**
     * An a link element, connecting two nodes.
     */
    _link: SankeyLink;
    /**
     * @todo Description
     */
    protected _levelSum: {
        [index: number]: number;
    };
    /**
     * @todo Description
     */
    protected _levelNodesCount: {
        [index: number]: number;
    };
    /**
     */
    _node: SankeyNode;
    /**
     * [maxSum description]
     *
     * @ignore Exclude from docs
     * @todo Description
     */
    maxSum: number;
    /**
     * level with max sum
     */
    protected _maxSumLevel: number;
    /**
     * [valueHeight description]
     *
     * @ignore Exclude from docs
     * @todo Description
     */
    protected _valueHeight: number;
    /**
     * A total number of levels, present on this chart.
     */
    protected _levelCount: number;
    /**
     * Sorted nodes iterator.
     *
     * @ignore
     */
    protected _sorted: $iter.Iterator<[string, this["_node"]]>;
    protected _heightAnimation: Animation;
    protected _level: number;
    protected _counter: number;
    /**
     * Constructor
     */
    constructor();
    /**
     * (Re)validates chart's data, effectively causing the chart to redraw.
     *
     * @ignore Exclude from docs
     */
    validateData(): void;
    /**
     * Returns node's highest level.
     *
     * @param node   Node
     * @param level  Current level
     * @return New level
     */
    protected getNodeLevel(node: this["_node"], level: number): number;
    /**
     * Checks if there's no loop in the ancestor chain.
     *
     * @param  node  Node
     */
    protected checkLoop(node: this["_node"]): void;
    /**
     * Calculates relation between pixel height and total value.
     *
     * In Sankey the actual thickness of links and height of nodes will depend
     * on their values.
     */
    protected calculateValueHeight(): void;
    /**
     * Redraws the chart.
     *
     * @ignore Exclude from docs
     */
    validate(): void;
    /**
     * Performs actual operations to reveal this element.
     *
     * @ignore Exclude from docs
     * @param duration Fade in duration (ms)
     * @return Fade in duration (ms)
     */
    protected showReal(duration?: number): $type.Optional<Animation>;
    /**
     * Changes the sort type of the nodes.
     *
     * This will actually reshuffle nodes using nice animation.
     */
    protected changeSorting(): void;
    /**
     * Sets defaults that instantiate some objects that rely on parent, so they
     * cannot be set in constructor.
     */
    protected applyInternalDefaults(): void;
    /**
     * Creates and returns a new data item.
     *
     * @return Data item
     */
    protected createDataItem(): this["_dataItem"];
    /**
     * How to align nodes. In case layout is vertical, top means left and bottom means right
     *
     * @param value  Node sorting
     */
    /**
    * @returns Returns nodeAlign value
    */
    nodeAlign: "top" | "middle" | "bottom";
    /**
     * Orientation of the chart: "horizontal" or "vertical";
     *
     * @param value Orientation
     */
    /**
    * @return Orientation
    */
    orientation: Orientation;
    /**
     * @ignore
     */
    createNode(): this["_node"];
    /**
     * @ignore
     */
    createLink(): this["_link"];
    /**
     * @ignore
     */
    /**
    * @ignore
    */
    valueHeight: number;
    /**
     * @ignore
     */
    disposeData(): void;
}
