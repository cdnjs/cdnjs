/**
 * FlowDiagram module.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Chart, IChartProperties, IChartDataFields, IChartAdapters, IChartEvents, ChartDataItem } from "../Chart";
import { ListTemplate } from "../../core/utils/List";
import { DictionaryTemplate } from "../../core/utils/Dictionary";
import { Container } from "../../core/Container";
import { FlowDiagramNode } from "../elements/FlowDiagramNode";
import { FlowDiagramLink } from "../elements/FlowDiagramLink";
import { ColorSet } from "../../core/utils/ColorSet";
import { Color } from "../../core/utils/Color";
import * as $iter from "../../core/utils/Iterator";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[FlowDiagram]].
 *
 * @see {@link DataItem}
 */
export declare class FlowDiagramDataItem extends ChartDataItem {
    /**
     * Defines a type of [[Component]] this data item is used for.
     */
    _component: FlowDiagram;
    /**
     * An a link element, connecting two nodes.
     */
    _link: FlowDiagramLink;
    /**
     * An origin node.
     */
    fromNode: FlowDiagramNode;
    /**
     * A destination node.
     */
    toNode: FlowDiagramNode;
    /**
     * Constructor
     */
    constructor();
    /**
     * Source node's name.
     *
     * @param value  Name
     */
    /**
    * @return name
    */
    fromName: string;
    /**
     * Destination node's name.
     *
     * @param value  Name
     */
    /**
    * @return name
    */
    toName: string;
    /**
     * Node color
     *
     * @param value  Name
     */
    /**
    * @return color
    */
    color: Color;
    /**
     * Link's value.
     *
     * @param value  Value
     */
    /**
    * @return Value
    */
    value: number;
    /**
     * A visual element, representing link between the source and target nodes.
     *
     * Link's actual thickness will be determined by `value` of this link and
     * `value` of the source node.
     *
     * @readonly
     * @return Link element
     */
    readonly link: this["_link"];
}
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines data fields for [[FlowDiagram]].
 */
export interface IFlowDiagramDataFields extends IChartDataFields {
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
    /**
     * Visibility of a node
     */
    visible?: string;
}
/**
 * Defines properties for [[FlowDiagram]]
 */
export interface IFlowDiagramProperties extends IChartProperties {
    /**
     * Padding for node square in pixels.
     */
    nodePadding?: number;
    /**
     * Sort nodes by name or value or do not sort a
     */
    sortBy?: "none" | "name" | "value";
    /**
     * Sometimes nodes can get very small if their value is little. With this setting you
     * can set min size of a node (this is relative value from the total size of all nodes)
     */
    minNodeSize: number;
}
/**
 * Defines events for [[FlowDiagram]].
 */
export interface IFlowDiagramEvents extends IChartEvents {
}
/**
 * Defines adapters for [[FlowDiagram]].
 *
 * @see {@link Adapter}
 */
export interface IFlowDiagramAdapters extends IChartAdapters, IFlowDiagramProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Creates a Pie chart
 * @see {@link IFlowDiagramEvents} for a list of available Events
 * @see {@link IFlowDiagramAdapters} for a list of available Adapters
 * @important
 */
export declare class FlowDiagram extends Chart {
    /**
     * A Color Set to use when applying/generating colors for each subsequent
     * node.
     */
    colors: ColorSet;
    /**
     * Defines a type for the DataItem.
     */
    _dataItem: FlowDiagramDataItem;
    /**
     * Defines available data fields.
     */
    _dataFields: IFlowDiagramDataFields;
    /**
     * Defines available properties.
     */
    _properties: IFlowDiagramProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IFlowDiagramAdapters;
    /**
     * Defines available events.
     */
    _events: IFlowDiagramEvents;
    /**
     */
    _node: FlowDiagramNode;
    /**
     * A list of chart's FlowDiagram nodes.
     *
     * @param {DictionaryTemplate<string, this["_node"]>}
     */
    protected _nodes: DictionaryTemplate<string, this["_node"]>;
    /**
     */
    _link: FlowDiagramLink;
    /**
     * A list of FlowDiagram links connecting nodes.
     *
     * @param {ListTemplate<this["_link"]>}
     */
    protected _links: ListTemplate<this["_link"]>;
    /**
     * A container that holds all of the link elements.
     */
    linksContainer: Container;
    /**
     * A container that holds all of the node elements.
     */
    nodesContainer: Container;
    /**
     * Sorted nodes iterator.
     *
     * @ignore
     */
    protected _sorted: $iter.Iterator<[string, FlowDiagramNode]>;
    /**
     * Constructor
     */
    constructor();
    dispose(): void;
    /**
     * (Re)validates chart's data, effectively causing the chart to redraw.
     *
     * @ignore Exclude from docs
     */
    validateData(): void;
    /**
     * [handleDataItemWorkingValueChange description]
     *
     * @ignore Exclude from docs
     */
    handleDataItemWorkingValueChange(dataItem?: this["_dataItem"], name?: string): void;
    /**
     * Sorts nodes by either their values or names, based on `sortBy` setting.
     */
    protected sortNodes(): void;
    /**
     * Updates a cummulative value of the node.
     *
     * A node's value is determined by summing values of all of the incoming
     * links or all of the outgoing links, whichever results in bigger number.
     *
     * @param node  Node value
     */
    protected getNodeValue(node: FlowDiagramNode): void;
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
     * Padding for node square in pixels.
     *
     * Padding will add extra space around node's name label.
     *
     * @param value Padding (px)
     */
    /**
    * @return Padding (px)
    */
    nodePadding: number;
    /**
     * Sort nodes by "name" or "value" or do not sort at all. If not sorted, nodes will appear in the same order as they are in the data.
     * @default "none"
     * @param value  Node sorting
     */
    /**
    * @returns Node sorting
    */
    sortBy: "none" | "name" | "value";
    /**
     * Sometimes nodes can get very small if their value is little. With this setting you
     * can set min size of a node (this is relative value from the total size of all nodes)
     * @default 0.02
     * @param value  Node sorting
     */
    /**
    * @returns min node size
    */
    minNodeSize: number;
    /**
     * A list of chart's nodes.
     *
     * @param {DictionaryTemplate<string, this["_node"]>}
     */
    readonly nodes: DictionaryTemplate<string, this["_node"]>;
    /**
     * @ignore
     */
    createNode(): this["_node"];
    /**
     * A list of chart's links.
     *
     * @param {ListTemplate<this["_link"]>}
     */
    readonly links: ListTemplate<this["_link"]>;
    /**
     * @ignore
     */
    createLink(): this["_link"];
    /**
     * Setups the legend to use the chart's data.
     * @ignore
     */
    feedLegend(): void;
    /**
     * @ignore
     */
    disposeData(): void;
}
