/**
 * Line series module.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { XYSeries, XYSeriesDataItem, IXYSeriesProperties, IXYSeriesDataFields, IXYSeriesAdapters, IXYSeriesEvents } from "./XYSeries";
import { Container } from "../../core/Container";
import { ListTemplate } from "../../core/utils/List";
import { IPoint } from "../../core/defs/IPoint";
import { LineSeriesSegment } from "./LineSeriesSegment";
import { AxisDataItem } from "../axes/Axis";
import * as $iter from "../../core/utils/Iterator";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[LineSeries]].
 *
 * @see {@link DataItem}
 */
export declare class LineSeriesDataItem extends XYSeriesDataItem {
    /**
     * Defines a type of [[Component]] this data item is used for.
     */
    _component: LineSeries;
    /**
     * Point of line series data item
     */
    point: IPoint;
    /**
     * A reference to a segment object, used for getting proper colors for tooltips
     */
    segment: LineSeriesSegment;
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
 * Defines data fields for [[LineSeries]].
 */
export interface ILineSeriesDataFields extends IXYSeriesDataFields {
}
/**
 * Defines properties for [[LineSeries]].
 */
export interface ILineSeriesProperties extends IXYSeriesProperties {
    /**
     * Horizontal tension setting of the line (0-1).
     *
     * Used for smoothed lines.
     *
     * @default 1
     */
    tensionX?: number;
    /**
     * Vertical tension setting of the line (0-1).
     *
     * Used for smoothed lines.
     *
     * @default 1
     */
    tensionY?: number;
    /**
     * Connect the lines over empty data points?
     *
     * @default true
     */
    connect?: boolean;
    /**
     * If `connect = false` and distance between two data points is bigger
     * than `baseInterval * autoGapCount`, a line will break automatically.
     *
     * @default 1.1
     */
    autoGapCount?: number;
    /**
     * Smoothing algorythm to use for the line.
     *
     * @since 4.10.0
     */
    smoothing: "bezier" | "monotoneX" | "monotoneY";
}
/**
 * Defines events for [[LineSeries]].
 */
export interface ILineSeriesEvents extends IXYSeriesEvents {
}
/**
 * Defines adapters for [[LineSeries]].
 *
 * @see {@link Adapter}
 */
export interface ILineSeriesAdapters extends IXYSeriesAdapters, ILineSeriesProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Defines [[Series]] for a line graph.
 *
 * @see {@link ILineSeriesEvents} for a list of available Events
 * @see {@link ILineSeriesAdapters} for a list of available Adapters
 * @todo Example
 * @important
 */
export declare class LineSeries extends XYSeries {
    /**
     * Defines the type of data fields used for the series.
     */
    _dataFields: ILineSeriesDataFields;
    /**
     * Defines available properties.
     */
    _properties: ILineSeriesProperties;
    /**
     * Defines available adapters.
     */
    _adapter: ILineSeriesAdapters;
    /**
     * Defines available events.
     */
    _events: ILineSeriesEvents;
    /**
     * Defines the type of data item.
     */
    _dataItem: LineSeriesDataItem;
    /**
     * A list of line series segments.
     *
     * Segments are used in two cases:
     *
     * * When we want to change the appearance of a part of the line series;
     * * When we have an axis range.
     */
    segments: ListTemplate<this["_segment"]>;
    /**
     * Defines type for segment.
     */
    _segment: LineSeriesSegment;
    /**
     * A container for segment elements.
     *
     * @ignore Exclude from docs
     */
    segmentsContainer: Container;
    /**
     * Minimum distance in pixels between two adjacent points.
     *
     * If the distance is less than this setting, a point is skipped.
     *
     * This allows acceptable performance with huge amounts of data points.
     *
     * @default 0.5
     */
    minDistance: number;
    /**
     * Iterator for segments.
     */
    protected _segmentsIterator: $iter.ListIterator<this["_segment"]>;
    protected _adjustedStartIndex: number;
    /**
     * Constructor
     */
    constructor();
    /**
     * Sets defaults that instantiate some objects that rely on parent, so they
     * cannot be set in constructor.
     */
    protected applyInternalDefaults(): void;
    /**
     * @ignore
     */
    protected createSegment(): this["_segment"];
    /**
     * Returns a new/empty DataItem of the type appropriate for this object.
     *
     * @see {@link DataItem}
     * @return Data Item
     */
    protected createDataItem(): this["_dataItem"];
    /**
     * Inits data item's working values.
     *
     * @param dataItem  Data item
     * @param index     Data item's index
     */
    protected setInitialWorkingValues(dataItem: this["_dataItem"]): void;
    /**
     * Updates corresponding legend data item with current values.
     *
     * @ignore Exclude from docs
     * @param dataItem  Data item
     */
    updateLegendValue(dataItem?: this["_dataItem"], notRange?: boolean): void;
    /**
     * (Re)validates the whole series, effectively causing it to redraw.
     *
     * @ignore Exclude from docs
     */
    validate(): void;
    /**
     * [sliceData description]
     *
     * @todo Description
     */
    protected sliceData(): void;
    /**
     * @ignore
     */
    protected findAdjustedIndex(adjustedIndex: number, properties: string[]): number;
    /**
     * Wraps openSegment call with iterative solution to prevent stack overflow
     *
     * @param openIndex  Index
     * @param axisRange  Range
     */
    protected openSegmentWrapper(openIndex: number, axisRange?: AxisDataItem): void;
    protected getSegment(): LineSeriesSegment;
    /**
     * [openSegment description]
     *
     * @todo Description
     * @param openIndex  [description]
     * @param axisRange  [description]
     */
    protected openSegment(openIndex: number, axisRange?: AxisDataItem): {
        "index": number;
        "axisRange": AxisDataItem;
    };
    /**
     * [addPoints description]
     *
     * @todo Description
     * @param points    [description]
     * @param dataItem  [description]
     * @param xField    [description]
     * @param yField    [description]
     * @param backwards [description]
     */
    protected addPoints(points: IPoint[], dataItem: this["_dataItem"], xField: string, yField: string, backwards?: boolean): void;
    /**
     * [closeSegment description]
     *
     * @todo Description
     * @param segment    [description]
     * @param points     [description]
     * @param openIndex  [description]
     * @param closeIndex [description]
     * @param axisRange  [description]
     */
    protected closeSegment(segment: LineSeriesSegment, points: IPoint[], openIndex: number, closeIndex: number, axisRange?: AxisDataItem, add?: boolean): {
        "index": number;
        "axisRange": AxisDataItem;
    };
    /**
     * Draws the line segment.
     *
     * @param segment     Segment
     * @param points      Segment points
     * @param closePoints Segment close points
     */
    protected drawSegment(segment: LineSeriesSegment, points: IPoint[], closePoints: IPoint[]): void;
    /**
     * Segement will get its colors from `this.dataItem`, as thats how
     * `getPropertyValue()` method works.
     *
     * We pass `lineSeriesDataItem.properties` as item here each time when a flag
     * `hasProperties` is set to `true` on data item (this means it can contain
     * some properties set).
     *
     * @param itemProperties  Item properties
     * @param segment         Segment
     * @return Properties changed?
     */
    protected updateSegmentProperties(itemProperties: {
        [index: string]: any;
    }, segment: LineSeriesSegment, checkOnly?: boolean): boolean;
    /**
     * Connect the lines over empty data points?
     *
     * If set to `true` the line will connect two adjacent data points by a
     * straight line. Even if there are data points with missing values
     * in-between.
     *
     * If you set this to `false`, the line will break when there are missing
     * values.
     *
     * @see {@link https://www.amcharts.com/docs/v4/chart-types/xy-chart/#Line_series_with_gaps} for more information about this feature
     * @default true
     * @param value  Connect?
     */
    /**
    * @return Connect?
    */
    connect: boolean;
    /**
     * Horizontal tension setting of the line (0-1).
     *
     * Can be used to create smoothed lines. It works like this:
     *
     * Accepted values are in the range between 0 and 1. The biggest value (1)
     * will mean that the "tension" is very high, so the line is maximally
     * attracted to the points it connects, hence the straight line.
     *
     * Using smaller numbers will "relax" the tension, creating some curving.
     *
     * The smaller the tension setting, the more relaxed the line and the more
     * wide the curve.
     *
     * This setting is for horizontal tension, meaning the curve will bend in
     * such way that it never goes below or above connecting points. To enable
     * vertical bending as well, use `tensionY`.
     *
     * IMPORTANT: line smoothing works best when data items are placed at regular
     * intervals. For setups where data items are spaced erratically, enabling
     * smoothing might result in awkwardly looking lines.
     *
     * @default 1
     * @param value  Horizontal tension (0-1)
     */
    /**
    * @return Horizontal tension (0-1)
    */
    tensionX: number;
    /**
     * Can be used to create smoothed lines. It works like this:
     *
     * Accepted values are in the range between 0 and 1. The biggest value (1)
     * will mean that the "tension" is very high, so the line is maximally
     * attracted to the points it connects, hence the straight line.
     *
     * Using smaller numbers will "relax" the tension, creating some curving.
     *
     * The smaller the tension setting, the more relaxed the line and the more
     * wide the curve.
     *
     * This setting is for vertical tension, meaning the curve might bend in
     * such way that it will go below or above connected points.
     *
     * Combine this setting with `tensionX` to create beautifully looking
     * smoothed line series.
     *
     * @default 1
     * @param value  Vertical tension (0-1)
     */
    /**
    * @return Vertical tension (0-1)
    */
    tensionY: number;
    /**
     * Creates elements in related legend container, that mimics the look of this
     * Series.
     *
     * @ignore Exclude from docs
     * @param marker  Legend item container
     */
    createLegendMarker(marker: Container): void;
    /**
     * @ignore
     */
    disposeData(): void;
    /**
     * If `connect = false` and distance between two data points is bigger
     * than `baseInterval * autoGapCount`, a line will break automatically.
     *
     * @since 4.2.4
     * @param  value  Gap count
     */
    /**
    * @return Gap count
    */
    autoGapCount: number;
    /**
     * Smoothing algorithm to be used for lines.
     *
     * Available options: `"bezier"` (default), `"monotoneX"`, and `"monotoneY"`.
     *
     * Monotone options are best suited for data with irregular intervals. Use `"monotoneX"` for
     * horizontal lines, and `"monotoneY"` vertical ones.
     *
     * NOTE: Both "monotone" algorithms will ignore `tensionX` and `tensionY` settings.
     *
     * @since 4.10.0
     * @param  value  Smoothing algorithm
     */
    /**
    * @return Smoothing algorithm
    */
    smoothing: "bezier" | "monotoneX" | "monotoneY";
}
