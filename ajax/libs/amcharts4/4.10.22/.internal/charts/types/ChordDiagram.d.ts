/**
 * Chord diagram module.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { FlowDiagram, FlowDiagramDataItem, IFlowDiagramAdapters, IFlowDiagramDataFields, IFlowDiagramEvents, IFlowDiagramProperties } from "./FlowDiagram";
import { Percent } from "../../core/utils/Percent";
import { DictionaryTemplate } from "../../core/utils/Dictionary";
import { Container } from "../../core/Container";
import { ChordNode } from "../elements/ChordNode";
import { ChordLink } from "../elements/ChordLink";
import * as $iter from "../../core/utils/Iterator";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[ChordDiagram]].
 *
 * @see {@link DataItem}
 */
export declare class ChordDiagramDataItem extends FlowDiagramDataItem {
    /**
     * Defines a type of [[Component]] this data item is used for.
     */
    _component: ChordDiagram;
    /**
     * An a link element, connecting two nodes.
     */
    _link: ChordLink;
    /**
     * An origin node.
     */
    fromNode: ChordNode;
    /**
     * A destination node.
     */
    toNode: ChordNode;
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
 * Defines data fields for [[ChordDiagram]].
 */
export interface IChordDiagramDataFields extends IFlowDiagramDataFields {
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
 * Defines properties for [[ChordDiagram]]
 */
export interface IChordDiagramProperties extends IFlowDiagramProperties {
    /**
     * Radius of the Chord. Absolute or relative.
     */
    radius?: number | Percent;
    /**
     * Inner radius of the Chord nodes. Absolute or relative. Negative value means that the inner radius will be calculated from the radius, not from the center.
     */
    innerRadius?: number | Percent;
    /**
     * An angle radar face starts on. (degrees)
     *
     * @default -90
     */
    startAngle?: number;
    /**
     * An angle radar face ends on. (degrees)
     *
     * @default 270
     */
    endAngle?: number;
    /**
     * If you set this to true, all the lines will be of the same width.
     *
     * @default false
     */
    nonRibbon?: boolean;
}
/**
 * Defines events for [[ChordDiagram]].
 */
export interface IChordDiagramEvents extends IFlowDiagramEvents {
}
/**
 * Defines adapters for [[ChordDiagram]].
 *
 * @see {@link Adapter}
 */
export interface IChordDiagramAdapters extends IFlowDiagramAdapters, IChordDiagramProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Creates a Chord Diagram chart.
 *
 * @see {@link IChordDiagramEvents} for a list of available Events
 * @see {@link IChordDiagramAdapters} for a list of available Adapters
 * @see {@link https://www.amcharts.com/docs/v4/chart-types/chord-diagram/} for documentation
 * @important
 */
export declare class ChordDiagram extends FlowDiagram {
    /**
     * Defines a type for the DataItem.
     */
    _dataItem: ChordDiagramDataItem;
    /**
     * Defines available data fields.
     */
    _dataFields: IChordDiagramDataFields;
    /**
     * Defines available properties.
     */
    _properties: IChordDiagramProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IChordDiagramAdapters;
    /**
     * Defines available events.
     */
    _events: IChordDiagramEvents;
    /**
     * A list of chart's Chord nodes.
     *
     * @param {DictionaryTemplate<string, ChordNode>}
     */
    nodes: DictionaryTemplate<string, ChordNode>;
    /**
     * An a link element, connecting two nodes.
     */
    _link: ChordLink;
    /**
     * Sorted nodes iterator.
     *
     * @ignore
     */
    protected _sorted: $iter.Iterator<[string, ChordNode]>;
    /**
     * [valueAngle description]
     *
     * @ignore Exclude from docs
     * @todo Description
     */
    valueAngle: number;
    /**
     * A container for chord elemens.
     */
    chordContainer: Container;
    /**
     */
    _node: ChordNode;
    /**
     * Constructor
     */
    constructor();
    /**
     * Redraws the chart.
     *
     * @ignore Exclude from docs
     */
    validate(): void;
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
     * Starting angle of the Radar face. (degrees)
     *
     * Normally, a circular radar face begins (the radial axis is drawn) at the
     * top center. (at -90 degrees)
     *
     * You can use `startAngle` to change this setting.
     *
     * E.g. setting this to 0 will make the radial axis start horizontally to
     * the right, as opposed to vertical.
     *
     * For a perfect circle the absolute sum of `startAngle` and `endAngle`
     * needs to be 360.
     *
     * However, it's **not** necessary to do so. You can set those to lesser
     * numbers, to create semi-circles.
     *
     * E.g. `startAngle = -90` with `endAngle = 0` will create a radar face that
     * looks like a quarter of a circle.
     *
     * @default -90
     * @param value  Start angle (degrees)
     */
    /**
    * @return Start angle (degrees)
    */
    startAngle: number;
    /**
     * Starting angle of the Radar face. (degrees)
     *
     * Normally, a circular radar face ends (the radial axis is drawn) exactly
     * where it has started, forming a full 360 circle. (at 270 degrees)
     *
     * You can use `endAngle` to end the circle somewhere else.
     *
     * E.g. setting this to 180 will make the radar face end at horizontal line
     * to the left off the center.
     *
     * For a perfect circle the absolute sum of `startAngle` and `endAngle`
     * needs to be 360.
     *
     * However, it's **not** necessary to do so. You can set those to lesser
     * numbers, to create semi-circles.
     *
     * E.g. `startAngle = -90` with `endAngle = 0` will create a radar face that
     * looks like a quarter of a circle.
     *
     * @default -90
     * @param value  End angle (degrees)
     */
    /**
    * @return End angle (degrees)
    */
    endAngle: number;
    /**
     * Outer radius of the Radar face.
     *
     * This can either be in absolute pixel value, or relative [[Percent]].
     *
     * @param value  Outer radius
     */
    /**
    * @return Outer radius
    */
    radius: number | Percent;
    /**
     * Inner radius of the Chord nodes.
     *
     * This can either be in absolute pixel value, or relative [[Percent]].
     *
     * @param value  Outer radius
     */
    /**
    * @return Inner radius
    */
    innerRadius: number | Percent;
    /**
     *
     * If you set this to true, all the lines will be of the same width. This is done by making middleLine of a ChordLink visible.
     *
     * @param value
     */
    /**
    * @return Non-ribbon
    */
    nonRibbon: boolean;
    /**
     * @ignore
     */
    createNode(): this["_node"];
    /**
     * @ignore
     */
    createLink(): this["_link"];
}
